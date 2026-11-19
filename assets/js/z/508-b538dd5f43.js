/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(508, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (TZW.tex[k])
return TZW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = tzwLite();
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
return (TZW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (TZW.mats[k])
return TZW.mats[k];
var own = name.slice(0, 2) === "b:", map = tzwPhotoTex(name, mpt || 2), m;
if (tzwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = tzwPhotoTex(name, mpt || 2, true);
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
return (TZW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return tzwM(k, function () {
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
return tzwCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return tzwCanvas("bamboo", 64, 256, function (x, W, H) {
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
tzwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return tzwCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return tzwCanvas("tuft", 128, 64, function (x, W, H) {
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
return tzwCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return tzwCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
tzwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return tzwCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = TZW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / TZW_CELL) + "," + Math.floor(z / TZW_CELL)];
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
p = dlnPerson("tzw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("tzw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || TZW.scG || TZW.G).add(p);
var P = { g: p, y: y, o: o };
TZW.people.push(P);
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
TZW.inst.push(m);
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
var a0 = pts[q - 1], b0 = pts[q], L0 = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), n0 = Math.max(1, Math.ceil(L0 / (tzwLite() ? 8 : 4)));
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
var lite = tzwLite(), leaf = tzwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
tzwInst(P, tzwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), tzwMat("pale"), list, { shadow: !lite });
tzwInst(P, tzwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), tzwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
tzwInst(P, tzwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), tzwMat("bark"), list, { shadow: !lite });
tzwInst(P, tzwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), tzwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
tzwInst(P, tzwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), tzwMat("darkbark"), list, { shadow: !lite });
tzwInst(P, tzwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), tzwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
tzwInst(P, tzwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), tzwMat("bark"), list, { shadow: !lite });
tzwInst(P, tzwGeo("pfronds", function () { var g = tzwFronds(lite ? 8 : 14, 5.6, 1.7, 0.55, 12, 1.0); g.translate(1.4, 0, 0); return g; }), tzwLam(0xFFFFFF, { ds: 1, map: tzwFrondTex("palm"), mapk: "palm", cut: 0.5, e: 0x1E2C14 }), list, {});
break;
}
case "mauritia": {
tzwInst(P, tzwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), tzwMat("darkbark"), list, {});
tzwInst(P, tzwGeo("mfronds", function () { return tzwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), tzwLam(0xFFFFFF, { ds: 1, map: tzwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
tzwInst(P, tzwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), tzwMat("darkbark"), list, {});
tzwInst(P, tzwGeo("ffronds", function () { return tzwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), tzwLam(0xFFFFFF, { ds: 1, map: tzwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
tzwInst(P, tzwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), tzwMat("darkbark"), list, {});
tzwInst(P, tzwGeo("cyf", function () { return tzwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), tzwLam(0xFFFFFF, { ds: 1, map: tzwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
tzwInst(P, tzwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), tzwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: tzwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
tzwInst(P, tzwGeo("bamL", function () { return tzwCards(3, 2.6, 2.2, 5.4); }), tzwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
tzwInst(P, tzwGeo("reed" + kind, function () { return tzwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), tzwLam(0xFFFFFF, { ds: 1, map: tzwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
tzwInst(P, tzwGeo("tuft", function () { return tzwCards(2, 1.6, 0.7, 0); }), tzwLam(o.col || 0xFFFFFF, { ds: 1, map: tzwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
tzwInst(P, tzwGeo("flw", function () { return tzwCards(2, 0.9, 0.7, 0); }), tzwLam(0xFFFFFF, { ds: 1, map: tzwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
tzwInst(P, tzwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), tzwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
tzwInst(P, tzwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || tzwMat("rock"), list, {});
break;
}
case "cactus": {
tzwInst(P, tzwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), tzwLam(0x4A7A3A), list, {});
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
function (kind, col) { return tzwM("skinM" + kind + (col || ""), function () { var t = tzwSkinTex(kind); t.repeat.set(2, 2); var m = tzwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = tzwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(tzwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = tzwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(tzwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
tzwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return tzwGeo(k, function () {
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
var t = tzwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), tzwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || tzwS("b:stucco", o.col || 0xF0E2C8, 3), trim = tzwLam(0xFAF6EE), sh = tzwLam(o.shut || 0x3A6A4A), glass = tzwShine(0x1A2228, 0.2, 0.3);
tzwBox(g, w, h, d, wall, 0, 0, 0);
tzwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
tzwBox(g, w + 0.12, 0.5, d + 0.12, tzwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(tzwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || tzwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
tzwBox(g, 1.3, 2.6, 0.12, tzwMat("oak"), wx, 0, d / 2 + 0.02);
tzwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = tzwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = tzwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!tzwLite())
[-1, 1].forEach(function (s) { tzwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
tzwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
tzwBox(g, 0.05, 0.9, 0.05, tzwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
tzwBox(g, 1.8, 0.05, 0.05, tzwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
tzwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
TZW.near = null;
if (TZW.scG) {
if (TZW.scG.parent)
TZW.scG.parent.remove(TZW.scG);
TZW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
TZW.scG = null;
TZW.solids = [];
TZW.sgrid = null;
TZW.floors = [];
TZW.spots = [];
TZW.talk = [];
TZW.people = [];
TZW.beasts = [];
TZW.fx = [];
TZW.water = [];
TZW.inst = [];
TZW.hgt = null;
TZW.scBuilt = null;
TZW.rooms = [];
TZW.doors = [];
TZW.lights = 0;
TZW.ticks = [];
TZW.far = [];
TZW.tripods = [];
TZW.handlers = [];
TZW.smoke = [];
TZW.live = null;
if (typeof tzbSceneDrop === "function")
try {
tzbSceneDrop();
}
catch (e) { }
},
function (k) {
if (TZW.scBuilt === k && TZW.scG)
return;
tzwSceneDrop();
var D = TZW_SCN[k], S = TZW_SC[k];
if (!D || !S || !TZW.G)
return;
TZW.sc = k;
TZW.scG = new THREE.Group();
TZW.scG.position.x = S.x;
TZW.G.add(TZW.scG);
TZW.hgt = D.h || function () { return 0; };
try {
D.build(TZW.scG);
}
catch (e) {
if (window.console)
console.warn("[tarzan] scene", k, e);
}
TZW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
TZW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = tzwAtPt(at);
if (!A)
return;
var v = tzwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
TZW.moving = true;
setTimeout(function () {
if (WLD.on !== TZW_KEY) {
v.style.opacity = "0";
TZW.moving = false;
return;
}
tzwScene(A.sc);
var S = TZW_SC[A.sc], y = A.y != null ? A.y : tzwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(TZW.base + S.x + A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(tzwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; TZW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(tzwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), tzwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; TZW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(tzwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), tzwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(tzwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), tzwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(tzwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), tzwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!tzwLite() && typeof THREE.PointLight === "function" && (TZW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
TZW.lights = (TZW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
TZW.fx.push(g);
return g;
},
function (seed, dress, o) {
o = o || {};
if (typeof dlnPerson !== "function")
return wPerson("tzw" + seed, { sex: o.sex });
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("tzw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (key, x, z, ry, o) {
var F = TZW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : tzwGround(x, z, o.feet != null ? o.feet : 500);
var g = F.voice ? tzwVoiceG() : tzwDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin, child: F.child });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || TZW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
TZW.people.push(P);
if (!o.mute)
tzwTalk(P, o.name || F.name, tzwPersona(F.persona), o.greet || F.greet, o.r || 3.4, o.fn);
return P;
},
function (seed, list, x0, z0, x1, z1, o) {
o = o || {};
var R = wRand(seed), out = [], lite = tzwLite(), n = lite ? Math.ceil(list.length * 0.6) : list.length;
for (var i = 0; i < n; i++) {
var L = list[i], x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), tries = 0;
while (o.ok && !o.ok(x, z) && tries++ < 12) {
x = x0 + R() * (x1 - x0);
z = z0 + R() * (z1 - z0);
}
var sex = L[1], g = tzwDressed(seed + "c" + i, L[2], { sex: sex, child: !!L[5], beard: sex === "m" && R() < 0.3 ? (R() < 0.5 ? "mustache" : "short") : null, hair: [0x141414, 0x3A2A1A, 0x6A4A2A, 0x8A7A6A, 0xB8A060][Math.floor(R() * 5)], skin: o.skin ? o.skin[Math.floor(R() * o.skin.length)] : null });
var y = o.y != null ? o.y : tzwGround(x, z, 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
(o.parent || TZW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander != null ? o.wander : 6, sp: o.sp || 0.7 } };
TZW.people.push(P);
tzwTalk(P, L[0], L[4] || o.persona || TZP.townfolk, L[3], 3.0);
out.push(P);
}
return out;
},
function (seed, name, sex, dress, x, z, ry, greet, o) {
o = o || {};
var g = tzwDressed(seed, dress, { sex: sex, child: !!o.child, beard: o.beard, hair: o.hair, skin: o.skin });
if (o.scale)
g.scale.set(o.scale[0], o.scale[1], o.scale[2]);
var y = o.y != null ? o.y : tzwGround(x, z, o.feet != null ? o.feet : 500);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
(o.parent || TZW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander || 0, sp: 0.6 } };
TZW.people.push(P);
if (name)
tzwTalk(P, name, o.persona || TZP.townfolk, greet || "Good day.", o.r || 3.0);
return P;
},
function (k) {
switch (k) {
case "plaster": return tzwS("plaster", 0xF0EAD8, 4);
case "render": return tzwS("b:stucco", 0xEAE2D0, 3);
case "ochre": return tzwS("b:stucco", 0xE8CC98, 3);
case "rose": return tzwS("b:stucco", 0xE8C0B0, 3);
case "grey": return tzwS("b:stucco", 0xC8C8C4, 3);
case "ashlar": return tzwS("b:ashlar", 0xE0D8C8, 2.4);
case "stone": return tzwS("stone", 0xC8C0B0, 2.4);
case "greystone": return tzwS("b:limestone", 0xA8A49C, 4);
case "darkstone": return tzwS("b:limestone", 0x6A6660, 4);
case "brick": return tzwS("brick", 0xB87A5E, 1.6);
case "slate": return tzwS("b:slate", 0x5A5E68, 2);
case "tile": return tzwS("b:terracotta", 0xA85A40, 1.6);
case "shingle": return tzwS("shingle", 0x7A5A44, 2);
case "thatch": return tzwThatchM();
case "oak": return tzwS("b:oak", 0x8A5E3A, 1.4);
case "darkoak": return tzwS("b:oak", 0x4A3020, 1.4);
case "floor": return tzwS("b:oak", 0xA87A50, 1.8);
case "planks": return tzwS("b:planks", 0x9A8060, 2);
case "deck": return tzwS("b:deck", 0xB8A07A, 2);
case "hull": return tzwS("b:planks", 0x4A3A2A, 2);
case "damask": return tzwS("b:damask", 0x8A6A4A, 1.2);
case "bluepaper": return tzwS("b:damask", 0x6A7A9A, 1.2);
case "greenpaper": return tzwS("b:damask", 0x6A8A6A, 1.2);
case "velvet": return tzwS("b:velvet", 0x6A1E22, 0.8);
case "leather": return tzwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return tzwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return tzwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "ceiling": return tzwLam(0xEDE6D6);
case "beams": return tzwS("b:oak", 0x5A3E26, 1.4);
case "brass": return tzwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "iron": return tzwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "copper": return tzwShine(0xC87A4A, 0.35, 0.85);
case "glass": return tzwM("glass", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8ECE8, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.42, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "pane": return tzwShine(0x26323A, 0.15, 0.3);
case "earth": return tzwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return tzwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "meadow": return tzwS("grass", 0xB8D098, 4, { vc: 1 });
case "paving": return tzwS("paving", 0xC8C0B0, 2.4);
case "cobble": return tzwS("b:cotto", 0x9A9088, 1.2);
case "setts": return tzwS("paving", 0x8A8478, 2.4);
case "gravel": return tzwS("sand", 0x9A8C72, 3);
case "sand": return tzwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "rock": return tzwS("b:strata", 0x8A847A, 6);
case "darkrock": return tzwS("b:strata", 0x5A5650, 7);
case "granite": return tzwS("b:limestone", 0x9A948C, 5);
case "moss": return tzwS("b:moss", 0x7A9A5A, 3);
case "bark": return tzwS("bark", 0x8A7A64, 2.5);
case "darkbark": return tzwS("bark", 0x5A4E40, 3);
case "birch": return tzwS("bark", 0xE8E4DA, 2);
case "slush": return tzwS("sand", 0xC4BCB0, 3);
case "snowroof": return tzwS("snow", 0xD4D8DE, 3);
case "snow": return tzwS("snow", 0xF4F6FA, 5, { vc: 1 });
case "snowwall": return tzwS("snow", 0xF0F4FA, 3);
case "ice": return tzwM("icem", function () { var m = tzwLite() ? new THREE.MeshLambertMaterial({ color: 0xD8EAF4, map: tzwPhotoTex("snow", 6) }) : new THREE.MeshPhongMaterial({ color: 0xD0E6F2, map: tzwPhotoTex("snow", 6), shininess: 70, specular: 0x8AA8C0, vertexColors: true }); m.userData.noPhoto = 1; return m; });
case "blueice": return tzwM("blueice", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8AC0DA, shininess: 110, specular: 0xE8F8FF, transparent: true, opacity: 0.92 }); m.userData.noPhoto = 1; return m; });
case "cloth": return tzwLam(0xE8DCC4, { ds: 1 });
case "sail": return tzwLam(0xE8E0CC, { ds: 1 });
case "rope": return tzwLam(0x8A7A5A);
case "gilt": return tzwS("b:brass", 0xF0C860, 0.7, { shine: 110 });
case "redvelvet": return tzwS("b:velvet", 0x9A1A20, 0.6);
case "greenmarble": return tzwS("b:marble", 0x3A6A50, 1.8, { shine: 70 });
case "redmarble": return tzwS("b:marble", 0x9A4A3A, 1.8, { shine: 70 });
case "onyx": return tzwS("b:marble", 0xE8D4A8, 1.4, { shine: 90 });
case "zinc": return tzwS("b:slate", 0x7A8290, 2);
case "patina": return tzwS("b:brass", 0x7AB098, 1.6, { shine: 30 });
case "cave": return tzwS("b:cave", 0x8A8478, 4);
case "wetstone": return tzwS("b:limestone", 0x5A5A58, 3, { shine: 60 });
case "pinkgranite": return tzwS("b:limestone", 0xC8988A, 4);
case "mirror": return tzwShine(0xE8ECF0, 0.04, 1.0);
case "blackcloth": return tzwLam(0x0E0C10);
case "canvas": return tzwLam(0xD8CCB0, { ds: 1 });
case "logs": return tzwS("bark", 0x8A7458, 1.6);
case "siding": return tzwS("siding", 0xF2F0EA, 2.4);
case "mud": return tzwS("b:stucco", 0xA8744A, 2.4);
case "clay": return tzwS("earth", 0x9A6A44, 3);
case "pot": return tzwS("b:terracotta", 0xA8643E, 0.8);
case "trail": return tzwS("earth", 0x8A6A48, 3);
case "jungleground": return tzwS("earth", 0xC8C0A8, 6, { vc: 1 });
case "shoreground": return tzwS("sand", 0xFFFFFF, 5, { vc: 1 });
case "mossbark": return tzwS("b:moss", 0x6A7A4A, 1.6);
}
return tzwS("earth", 0x8A7058, 5);
},
function () {
return tzwM("thatch", function () {
var t = tzwCanvas("thatch", 128, 128, function (c, W, H) { c.fillStyle = "#7A6640"; c.fillRect(0, 0, W, H); var R = wRand(41); for (var i = 0; i < 900; i++) {
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
var y = TZW_RY, h = o.h || 3.4, g = new THREE.Group();
g.position.set(cx, y, cz);
P.add(g);
g.userData.keep = 0;
var wall = tzwMat(o.wall || "plaster"), fl = tzwMat(o.floor || "floor");
tzwBox(g, w, 0.12, d, fl, 0, -0.12, 0);
tzwBox(g, w, 0.1, d, o.ceil ? tzwMat(o.ceil) : tzwMat("ceiling"), 0, h, 0);
[[0, -d / 2, w, 0.2], [0, d / 2, w, 0.2]].forEach(function (q, i) {
if (i === 1) {
var dw = 1.2;
tzwBox(g, (w - dw) / 2, h, 0.2, wall, -(w + dw) / 4, 0, q[1]);
tzwBox(g, (w - dw) / 2, h, 0.2, wall, (w + dw) / 4, 0, q[1]);
tzwBox(g, dw, h - 2.3, 0.2, wall, 0, 2.3, q[1]);
tzwBox(g, dw, 2.3, 0.08, tzwMat(o.door || "darkoak"), 0, 0, q[1] - 0.06);
tzwBox(g, 0.06, 0.06, 0.04, tzwMat("brass"), 0.42, 1.0, q[1] - 0.12);
}
else
tzwBox(g, q[2], h, 0.2, wall, q[0], 0, q[1]);
});
tzwBox(g, 0.2, h, d, wall, -w / 2, 0, 0);
tzwBox(g, 0.2, h, d, wall, w / 2, 0, 0);
if (!o.bare) {
var sk = tzwMat(o.trim || "oak");
[[0, -d / 2 + 0.11, w - 0.2, 0.04], [0, d / 2 - 0.11, w - 0.2, 0.04]].forEach(function (q) { tzwBox(g, q[2], 0.16, q[3], sk, q[0], 0, q[1]); });
[-w / 2 + 0.11, w / 2 - 0.11].forEach(function (x) { tzwBox(g, 0.04, 0.16, d - 0.2, sk, x, 0, 0); });
}
if (o.beams)
for (var b = -w / 2 + 1; b < w / 2; b += 1.6)
tzwBox(g, 0.18, 0.22, d - 0.2, tzwMat("beams"), b, h - 0.22, 0);
tzwSolid(cx, cz - d / 2, w, 0.3, y - 1, y + h + 1);
tzwSolid(cx - w / 2, cz, 0.3, d, y - 1, y + h + 1);
tzwSolid(cx + w / 2, cz, 0.3, d, y - 1, y + h + 1);
tzwSolid(cx - (w + 1.2) / 4, cz + d / 2, (w - 1.2) / 2, 0.3, y - 1, y + h + 1);
tzwSolid(cx + (w + 1.2) / 4, cz + d / 2, (w - 1.2) / 2, 0.3, y - 1, y + h + 1);
tzwFloor(cx, cz, w, d, y);
var R = { key: key, x0: cx - w / 2, x1: cx + w / 2, z0: cz - d / 2, z1: cz + d / 2, cx: cx, cz: cz, w: w, d: d, y: y, h: h, env: o.env || "indoor", name: o.name || key, g: g, out: null };
TZW.rooms.push(R);
if (o.light !== false && !tzwLite() && (TZW.lights || 0) < 5 && typeof THREE.PointLight === "function") {
var L = new THREE.PointLight(o.lightCol || 0xFFD8A0, o.lightI || 0.9, Math.max(w, d) * 1.4);
L.position.set(0, h - 0.6, 0);
g.add(L);
TZW.lights = (TZW.lights || 0) + 1;
}
return R;
},
function (R, name, ox, oz, ory) {
R.out = { x: ox, z: oz, ry: ory };
tzwSpot(ox, oz, 1.8, name, "go in", function () { tzwGo({ sc: TZW.sc, x: R.cx, z: R.z1 - 1.2, y: R.y, ry: 0 }, "🚪 <b>" + tzEsc(R.name) + ".</b>"); if (typeof tzbNote === "function")
tzbNote("in:" + R.key); });
tzwSpot(R.cx, R.z1 - 0.6, 1.4, "The door", "go out", function () { tzwGo({ sc: TZW.sc, x: ox, z: oz, ry: ory != null ? ory : Math.PI }, null); if (typeof tzbNote === "function")
tzbNote("out:" + R.key); }, R.y);
TZW.doors.push(R);
return R;
},
function (fromKey, toKey, lx, lz, name, verb) {
var A = TZW.rooms.filter(function (r) { return r.key === fromKey; })[0], B = TZW.rooms.filter(function (r) { return r.key === toKey; })[0];
if (!A || !B)
return;
var x = A.cx + lx, z = A.cz + lz;
B.out = { x: x, z: z, ry: Math.PI, inner: fromKey };
tzwSpot(x, z, 1.5, name, verb || "go through", function () { tzwGo({ sc: TZW.sc, x: B.cx, z: B.z1 - 1.2, y: B.y, ry: 0 }, "🚪 <b>" + tzEsc(B.name) + ".</b>"); if (typeof tzbNote === "function")
tzbNote("in:" + B.key); }, A.y);
tzwSpot(B.cx, B.z1 - 0.6, 1.4, "Back to " + A.name, "go", function () { tzwGo({ sc: TZW.sc, x: x, z: z + 1.2, y: A.y, ry: 0 }, null); if (typeof tzbNote === "function")
tzbNote("out:" + B.key); }, B.y);
TZW.doors.push(B);
return B;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wd = tzwMat(o.mat || "oak");
tzwBox(g, w, 0.06, d, o.cloth ? tzwLam(o.cloth) : wd, 0, h - 0.06, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { tzwBox(g, 0.07, h - 0.06, 0.07, wd, q[0] * (w / 2 - 0.08), 0, q[1] * (d / 2 - 0.08)); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = tzwMat(o.mat || "oak");
tzwBox(g, 0.46, 0.05, 0.44, o.seat ? tzwMat(o.seat) : wd, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { tzwBox(g, 0.04, 0.44, 0.04, wd, q[0] * 0.2, 0, q[1] * 0.19); });
tzwBox(g, 0.46, 0.5, 0.04, wd, 0, 0.49, -0.2);
if (o.arm)
[-1, 1].forEach(function (s) { tzwBox(g, 0.05, 0.22, 0.42, wd, s * 0.24, 0.5, 0); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = tzwMat(o.mat || "oak");
tzwBox(g, 1.1, 0.4, 2.0, wd, 0, 0, 0);
tzwBox(g, 1.04, 0.18, 1.94, tzwLam(o.cover || 0xE8E0CC), 0, 0.4, 0);
tzwBox(g, 0.8, 0.12, 0.36, tzwLam(0xF4F0E8), 0, 0.58, -0.7);
tzwBox(g, 1.1, 0.9, 0.06, wd, 0, 0, -1.0);
if (o.posts)
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { tzwBox(g, 0.07, 1.9, 0.07, wd, q[0] * 0.52, 0, q[1] * 0.97); });
return g;
},
function (P, x, z, w, h, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = tzwMat(o.mat || "darkoak"), R = wRand(Math.round(x * 7 + z * 13 + w));
tzwBox(g, w, h, 0.06, wd, 0, 0, -0.16);
[-w / 2, w / 2].forEach(function (s) { tzwBox(g, 0.05, h, 0.36, wd, s, 0, 0); });
var rows = Math.floor(h / 0.42);
for (var r = 0; r <= rows; r++) {
var y = 0.05 + r * (h - 0.1) / rows;
tzwBox(g, w, 0.04, 0.36, wd, 0, y, 0);
if (r === rows)
break;
if (o.jars) {
for (var j = -w / 2 + 0.12; j < w / 2 - 0.1; j += 0.18) {
var jm = new THREE.Mesh(tzwGeo("jar", function () { return new THREE.CylinderGeometry(0.05, 0.055, 0.18, 10); }), R() < 0.5 ? tzwMat("glass") : tzwLam([0x6A8A6A, 0x8A6A3A, 0xC8C0A0][Math.floor(R() * 3)]));
jm.position.set(j, y + 0.13, 0);
g.add(jm);
}
continue;
}
var bx = -w / 2 + 0.06;
while (bx < w / 2 - 0.08) {
var bw = 0.03 + R() * 0.05, bh = 0.22 + R() * 0.12;
tzwBox(g, bw, bh, 0.24, tzwLam([0x6A2A1A, 0x2A3A5A, 0x3A4A2A, 0x5A4020, 0x7A6A4A, 0x2A2A2A][Math.floor(R() * 6)]), bx + bw / 2, y + 0.04, 0.02);
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
var st = tzwMat(o.mat || "ashlar");
tzwBox(g, 1.8, 1.3, 0.5, st, 0, 0, 0);
tzwBox(g, 1.0, 0.8, 0.52, tzwLam(0x141210), 0, 0, 0.02);
tzwBox(g, 2.0, 0.1, 0.6, tzwMat("darkoak"), 0, 1.3, 0.04);
if (o.chimney !== false)
tzwBox(g, 1.4, (o.h || 3.4) - 1.4, 0.4, st, 0, 1.4, -0.04);
if (o.fire !== false) {
var f = tzwFire(g, 0, 0.02, 0.12, 0.6);
}
if (o.pot) {
tzwCyl(g, 0.2, 0.16, 0.26, tzwMat("iron"), 0, 0.3, 0.12, 12);
}
return g;
},
function (P, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
tzwCyl(g, 0.06, 0.07, 0.03, tzwMat(o.brass ? "brass" : "iron"), 0, 0, 0, 10);
tzwCyl(g, 0.018, 0.018, 0.16, tzwLam(0xF4EEDC), 0, 0.03, 0, 8);
var f = new THREE.Mesh(tzwGeo("cflame", function () { return new THREE.ConeGeometry(0.014, 0.05, 6); }), tzwGlowM(0xFFD070, 0.9));
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
var m = tzwMat(o.mat || "darkoak");
tzwBox(g, w, 0.07, d, m, 0, 0.42, 0);
[-1, 1].forEach(function (k) { tzwBox(g, 0.07, 0.42, d * 0.86, m, k * (w / 2 - 0.12), 0, 0); });
if (w > 2.6)
tzwBox(g, 0.07, 0.42, d * 0.86, m, 0, 0, 0);
if (o.back !== false) {
tzwBox(g, w, 0.55, 0.06, m, 0, 0.49, -d / 2 + 0.03);
tzwBox(g, w, 0.05, 0.09, m, 0, 1.03, -d / 2 + 0.04);
}
if (o.cushion)
tzwBox(g, w - 0.1, 0.06, d - 0.06, tzwLam(o.cushion), 0, 0.49, 0.02);
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), tzwM("rug" + col, function () {
var t = tzwCanvas("rugt" + col, 256, 256, function (c, W, H) {
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
tzwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
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
var t = tzwCanvas("pic" + x.toFixed(1) + z.toFixed(1) + w, 128, Math.round(128 * h / w), draw || function (c, W, H) { var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#6A8AB0"); g.addColorStop(0.6, "#D8D0B0"); g.addColorStop(1, "#4A5A30"); c.fillStyle = g; c.fillRect(0, 0, W, H); c.fillStyle = "#5A6A7A"; c.beginPath(); c.moveTo(0, H * 0.7); c.lineTo(W * 0.3, H * 0.35); c.lineTo(W * 0.55, H * 0.6); c.lineTo(W * 0.8, H * 0.3); c.lineTo(W, H * 0.7); c.fill(); });
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
tzwBox(g, w + 0.12, h + 0.12, 0.04, tzwMat("brass"), 0, -h / 2 - 0.06, 0);
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), tzwLam(0xFFFFFF, { map: t, mapk: "pic" + x.toFixed(1) + z.toFixed(1) + w }));
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), tzwGlowM(col));
m.position.z = 0.02;
g.add(m);
tzwBox(g, w + 0.16, 0.08, 0.12, tzwMat("oak"), 0, -h / 2 - 0.04, 0.04);
tzwBox(g, 0.05, h, 0.06, tzwMat("oak"), 0, -h / 2, 0.05);
tzwBox(g, w, 0.04, 0.06, tzwMat("oak"), 0, -0.02, 0.05);
[-1, 1].forEach(function (s) { tzwBox(g, 0.05, h, 0.06, tzwMat("oak"), s * w / 2, -h / 2, 0.05); });
return g;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : tzwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = tzwMat(o.wall || "render"), trim = tzwMat(o.trim || "ashlar"), sh = tzwLam(o.shut || 0x4A6A4A), pane = tzwMat("pane"), lite = tzwLite();
tzwBox(g, w, h, d, wall, 0, 0, 0);
tzwBox(g, w + 0.1, 0.6, d + 0.1, tzwMat("greystone"), 0, 0, 0);
tzwBox(g, w + 0.3, 0.22, d + 0.3, trim, 0, h - 0.22, 0);
var rh = o.rh || Math.min(w, d) * 0.62, roofM = tzwMat(o.roof || "tile");
var rf = new THREE.Mesh(tzwGeo("gab" + w.toFixed(1) + "|" + d.toFixed(1) + "|" + rh.toFixed(1) + (o.hip ? "h" : ""), function () {
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
tzwBox(g, 0.7, rh * 0.9, 0.7, tzwMat("brick"), w * 0.28, h + rh * 0.3, -d * 0.15);
if (o.dormer && !lite)
[-1, 1].forEach(function (s) { var dg = new THREE.Group(); dg.position.set(s * w * 0.22, h + rh * 0.25, d / 2 - rh * 0.3); g.add(dg); tzwBox(dg, 0.9, 0.9, 0.8, wall, 0, 0, 0); tzwBox(dg, 0.6, 0.6, 0.04, pane, 0, 0.15, 0.41); });
var n = Math.max(1, Math.floor(w / 2.6)), floors = Math.max(1, Math.round((h - 0.4) / 3.1));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 0.9 + f * 3.1;
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
tzwBox(g, 1.2, 2.4, 0.1, tzwMat(o.doorM || "darkoak"), wx, 0, d / 2 + 0.02);
tzwBox(g, 1.5, 0.25, 0.16, trim, wx, 2.4, d / 2 + 0.05);
tzwBox(g, 1.6, 0.14, 0.6, tzwMat("greystone"), wx, 0, d / 2 + 0.3);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
tzwBox(g, 1.0, 1.7, 0.08, trim, wx, wy, zz);
tzwBox(g, 0.8, 1.5, 0.06, pane, wx, wy + 0.1, zz + (k ? -0.03 : 0.03));
tzwBox(g, 0.8, 0.04, 0.07, trim, wx, wy + 0.85, zz + (k ? -0.05 : 0.05));
if (!lite)
[-1, 1].forEach(function (s) { tzwBox(g, 0.42, 1.6, 0.05, sh, wx + s * 0.64, wy + 0.05, zz + (k ? -0.07 : 0.07)); });
});
}
tzwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = tzwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = tzwMat(o.wall || "ashlar"), roof = tzwMat(o.roof || "slate"), L = o.len || 30, W = o.w || 13, H = o.h || 13;
tzwBox(g, W, H, L, wall, 0, 0, 0);
var rf = new THREE.Mesh(tzwGeo("chr" + W + "|" + L, function () { var s = new THREE.Shape(); s.moveTo(-W / 2 - 0.4, 0); s.lineTo(0, W * 0.55); s.lineTo(W / 2 + 0.4, 0); s.lineTo(-W / 2 - 0.4, 0); var e = new THREE.ExtrudeGeometry(s, { depth: L + 0.6, bevelEnabled: false }); e.translate(0, 0, -(L + 0.6) / 2); return e; }), roof);
rf.position.y = H;
g.add(rf);
for (var i = 0; i < 5; i++) {
var wz = -L / 2 + 4 + i * (L - 8) / 4;
[-1, 1].forEach(function (s) { tzwBox(g, 0.12, 5, 1.6, tzwMat("pane"), s * (W / 2 + 0.05), 3.5, wz); tzwBox(g, 0.14, 0.4, 1.9, wall, s * (W / 2 + 0.06), 8.5, wz); });
}
var T = o.tower || 6, TH = o.th || 26;
tzwBox(g, T, TH, T, wall, 0, 0, L / 2 + T / 2 - 0.5);
tzwBox(g, T + 0.4, 0.4, T + 0.4, tzwMat("greystone"), 0, TH - 0.4, L / 2 + T / 2 - 0.5);
if (o.clock) {
var cl = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), tzwLam(0xF4F0E4));
cl.position.set(0, TH - 3.5, L / 2 + T - 0.45);
g.add(cl);
var hd = tzwBox(g, 0.08, 0.9, 0.04, tzwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.4);
hd.rotation.z = 0.0;
var md = tzwBox(g, 0.06, 1.1, 0.04, tzwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.38);
md.rotation.z = Math.PI;
g.userData.clock = [hd, md];
}
if (o.dome) {
var dm = new THREE.Mesh(tzwGeo("bulb", function () { var pts = []; for (var k = 0; k <= 12; k++) {
var t = k / 12;
pts.push(new THREE.Vector2(Math.max(0.05, Math.sin(t * Math.PI) * (1.2 - t * 0.6)) * T * 0.45, t * T * 1.1));
} return new THREE.LatheGeometry(pts, 16); }), tzwShine(o.domeCol || 0x4A4A50, 0.4, 0.6));
dm.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(dm);
}
else {
var sp = new THREE.Mesh(tzwGeo("spire" + T, function () { var c = new THREE.ConeGeometry(T * 0.62, T * 2.6, 8); c.translate(0, T * 1.3, 0); return c; }), o.spireM || tzwShine(0xF2F0EA, 0.6, 0.05));
sp.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(sp);
}
tzwBox(g, 2.2, 3.6, 0.2, tzwMat("darkoak"), 0, 0, L / 2 + T - 0.4);
tzwSolid(x, z, W, L, y - 1, y + H + 8, o.ry || 0);
var tz = Math.cos(o.ry || 0) * (L / 2 + T / 2 - 0.5), tx = Math.sin(o.ry || 0) * (L / 2 + T / 2 - 0.5);
tzwSolid(x + tx, z + tz, T, T, y - 1, y + TH + T * 2.6, o.ry || 0);
return g;
},
function (P, x0, z0, x1, z1, h, gate) {
var dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz), ry = Math.atan2(dx, dz) + Math.PI / 2, n = Math.ceil(L / 12), st = tzwMat("greystone");
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, mx = x0 + dx * (t0 + t1) / 2, mz = z0 + dz * (t0 + t1) / 2, seg = L / n;
if (gate && Math.hypot(mx - gate[0], mz - gate[1]) < seg * 0.6)
continue;
tzwBox(P, seg + 0.2, h, 2, st, mx, tzwLand(mx, mz) - 0.5, mz, ry, true);
for (var c = 0; c < 3; c++) {
var cx = mx + Math.cos(ry) * (-seg / 3 + c * seg / 3), cz = mz - Math.sin(ry) * (-seg / 3 + c * seg / 3);
tzwBox(P, 1.2, 0.8, 2, st, cx, tzwLand(mx, mz) - 0.5 + h, cz, ry);
}
}
},
function (P, list, o) {
o = o || {};
if (!list.length)
return;
var lite = tzwLite();
if (lite && list.length > 80)
list = list.filter(function (t, i) { return i % 2 === 0; });
tzwInst(P, tzwGeo("firT", function () { var g = new THREE.CylinderGeometry(0.16, 0.34, 9, 6); g.translate(0, 4.5, 0); return g; }), tzwMat("darkbark"), list, { shadow: !lite });
tzwInst(P, tzwGeo("firC" + (lite ? "l" : ""), function () { var parts = []; var n = lite ? 4 : 7; for (var i = 0; i < n; i++) {
var r = 2.6 - i * (2.2 / n), c = new THREE.ConeGeometry(r, 2.6, lite ? 7 : 10, 1);
c.translate(0, 2.2 + i * 1.15, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), tzwM("firM" + (o.snow ? "s" : ""), function () {
var t = tzwCanvas("needles", 128, 128, function (c, W, H) { c.fillStyle = "#24402A"; c.fillRect(0, 0, W, H); var R = wRand(7); for (var i = 0; i < 1600; i++) {
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
var lite = tzwLite();
tzwInst(P, tzwGeo("birT", function () { var g = new THREE.CylinderGeometry(0.1, 0.16, 8, 6); g.translate(0, 4, 0); return g; }), tzwMat("birch"), list, {});
tzwInst(P, tzwGeo("birC", function () { var parts = [], R = wRand(13); for (var i = 0; i < (lite ? 3 : 6); i++) {
var c = new THREE.IcosahedronGeometry(1.2 + R() * 0.8, 1);
c.translate((R() - 0.5) * 2.4, 6 + R() * 2.6, (R() - 0.5) * 2.4);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), tzwM("birL", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AAA4A, map: tzwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
},
function (P, x, z, r, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, o.y || 0, z);
P.add(g);
var R = wRand(Math.round(x + z));
var geo = tzwGeo("peak" + (o.k || 0), function () { var c = new THREE.ConeGeometry(1, 1, 14, 6); var pa = c.attributes.position, RR = wRand(o.k || 3); for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i);
if (y < 0.49) {
var j = 0.82 + RR() * 0.36;
pa.setX(i, pa.getX(i) * j);
pa.setZ(i, pa.getZ(i) * j);
pa.setY(i, y + (RR() - 0.5) * 0.06);
}
} c.computeVertexNormals(); c.translate(0, 0.5, 0); return c; });
var rock = new THREE.Mesh(geo, o.mat || tzwMat("darkrock"));
rock.scale.set(r, h, r * (o.sz || 1));
g.add(rock);
var cap = new THREE.Mesh(geo, tzwMat("snowwall"));
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
var hull = tzwMat(o.hull || "hull");
var h = new THREE.Mesh(tzwGeo("rowb", function () { var c = new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); c.scale(0.9, 0.55, 2.8); return c; }), hull);
h.position.y = 0.5;
g.add(h);
tzwBox(g, 1.5, 0.06, 0.3, tzwMat("planks"), 0, 0.38, -0.6);
tzwBox(g, 1.5, 0.06, 0.3, tzwMat("planks"), 0, 0.38, 0.8);
[-1, 1].forEach(function (s) { var oar = tzwBox(g, 0.05, 0.05, 2.6, tzwMat("oak"), s * 0.95, 0.5, 0.1); oar.rotation.z = s * 0.2; });
if (o.mast) {
tzwCyl(g, 0.04, 0.05, 3.4, tzwMat("oak"), 0, 0.4, -1.0, 6);
var sl = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), tzwMat("sail"));
sl.position.set(0, 2.4, -0.6);
sl.rotation.y = Math.PI / 2;
g.add(sl);
}
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : tzwLand(x, z), w = o.w || 9, d = o.d || 8, h = o.h || 6.4, lite = tzwLite();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var brick = tzwS("brick", o.brick || 0xB86A4E, 1.4), trim = tzwLam(0xF2EEE2), stone = tzwMat("ashlar"), pane = tzwMat("pane"), slate = tzwMat("slate");
tzwBox(g, w, h, d, brick, 0, 0, 0);
tzwBox(g, w + 0.12, 0.5, d + 0.12, tzwMat("darkstone"), 0, 0, 0);
tzwBox(g, w + 0.2, 0.16, d + 0.2, stone, 0, 3.1, 0);
tzwBox(g, w + 0.3, 0.2, d + 0.3, trim, 0, h - 0.2, 0);
var rh = o.rh || 3.2;
var rf = new THREE.Mesh(tzwGeo("hip" + w + "|" + d + "|" + rh, function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); c.scale(w + 0.8, rh, d + 0.8); return c; }), slate);
rf.position.y = h;
g.add(rf);
[-1, 1].forEach(function (s) { tzwBox(g, 0.9, rh + 1.8, 0.6, brick, s * w * 0.3, h, 0); tzwCyl(g, 0.12, 0.12, 0.5, tzwLam(0xA85A3A), s * w * 0.3 - 0.2, h + rh + 1.8, 0, 8); tzwCyl(g, 0.12, 0.12, 0.5, tzwLam(0xA85A3A), s * w * 0.3 + 0.2, h + rh + 1.8, 0, 8); });
var bx = -w * 0.22;
tzwBox(g, 3.2, h - 0.6, 1.2, brick, bx, 0, d / 2 + 0.6);
var br = tzwBox(g, 3.6, 0.5, 1.6, slate, bx, h - 0.6, d / 2 + 0.6);
br.rotation.x = -0.25;
[0.9, 4.0].forEach(function (wy) { tzwBox(g, 2.6, 1.7, 0.06, trim, bx, wy, d / 2 + 1.22); tzwBox(g, 2.4, 1.5, 0.06, pane, bx, wy + 0.1, d / 2 + 1.25); tzwBox(g, 0.06, 1.5, 0.08, trim, bx - 0.8, wy + 0.1, d / 2 + 1.27); tzwBox(g, 0.06, 1.5, 0.08, trim, bx + 0.8, wy + 0.1, d / 2 + 1.27); });
var dx = w * 0.25;
tzwBox(g, 1.1, 2.4, 0.08, tzwLam(o.door || 0x2A3A2A), dx, 0.2, d / 2 + 0.04);
tzwBox(g, 1.6, 0.14, 1.2, trim, dx, 2.8, d / 2 + 0.6);
[-1, 1].forEach(function (s) { tzwBox(g, 0.1, 2.6, 0.1, trim, dx + s * 0.7, 0.2, d / 2 + 1.1); });
tzwBox(g, 1.6, 0.2, 1.0, stone, dx, 0, d / 2 + 0.6);
tzwBox(g, 0.5, 0.05, 0.4, tzwLam(0xC8B080), dx + 0.3, 1.6, d / 2 + 0.08);
var win = function (wx, wy, zz, rot) { var q = new THREE.Group(); q.position.set(wx, wy, zz); q.rotation.y = rot; g.add(q); tzwBox(q, 1.1, 1.7, 0.06, trim, 0, 0, 0); tzwBox(q, 0.9, 1.5, 0.06, pane, 0, 0.1, 0.02); tzwBox(q, 1.3, 0.12, 0.2, stone, 0, -0.06, 0.06); tzwBox(q, 1.2, 0.16, 0.12, stone, 0, 1.7, 0.03); };
win(dx, 4.0, d / 2 + 0.02, 0);
[-w * 0.25, w * 0.2].forEach(function (wx) { win(wx, 0.9, -d / 2 - 0.02, Math.PI); win(wx, 4.0, -d / 2 - 0.02, Math.PI); });
[-1, 1].forEach(function (s) { win(s * (w / 2 + 0.02), 4.0, 0, s * Math.PI / 2); });
if (o.garden !== false) {
var gz = d / 2 + (o.gd || 6);
tzwBox(g, w + 4, 0.7, 0.3, brick, 0, 0, gz);
tzwBox(g, w + 4.2, 0.1, 0.4, stone, 0, 0.7, gz);
tzwBox(g, 1.2, 0.05, gz - d / 2 - 0.6, tzwMat("gravel"), dx, 0.02, (gz + d / 2) / 2 + 0.3);
if (!lite)
tzwPlant(P, "bush", [{ x: x + Math.cos(o.ry || 0) * (-w * 0.4) + Math.sin(o.ry || 0) * (d / 2 + 3), z: z - Math.sin(o.ry || 0) * (-w * 0.4) + Math.cos(o.ry || 0) * (d / 2 + 3), y: y, s: 0.9, ry: 0 }], { col: 0x2E4A26, keepAll: true });
}
tzwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
g.userData.door = { x: dx, z: d / 2 + 1.6 };
return g;
},
function (P, x, z, n, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : tzwLand(x, z), sw = o.sw || 6, d = o.d || 9, h = o.h || 8.6;
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var names = o.names || ["GROCER", "BUTCHER", "DRAPER", "CHEMIST", "IRONMONGER", "BAKER", "TOBACCONIST", "NEWSAGENT", "BOOTMAKER", "POST OFFICE"], cols = [0x2A3A5A, 0x5A1E1E, 0x2A4A2A, 0x3A2A1A, 0x4A3A5A, 0x1E3A3A], R = wRand(Math.round(x * 3 + z));
var brick = tzwS("brick", 0xA86048, 1.4), slate = tzwMat("slate"), trim = tzwLam(0xF2EEE2), pane = tzwMat("pane");
for (var i = 0; i < n; i++) {
var cx = -((n - 1) * sw) / 2 + i * sw, c = cols[Math.floor(R() * cols.length)], ht = h + (i % 3) * 0.4;
tzwBox(g, sw - 0.05, ht, d, brick, cx, 0, 0);
var rf = new THREE.Mesh(tzwGeo("shr" + sw + "|" + d, function () { var s = new THREE.Shape(); s.moveTo(-d / 2 - 0.3, 0); s.lineTo(0, 2.6); s.lineTo(d / 2 + 0.3, 0); s.lineTo(-d / 2 - 0.3, 0); var e = new THREE.ExtrudeGeometry(s, { depth: sw, bevelEnabled: false }); e.translate(0, 0, -sw / 2); e.rotateY(Math.PI / 2); return e; }), slate);
rf.position.set(cx, ht, 0);
g.add(rf);
tzwBox(g, sw - 0.3, 3.3, 0.12, tzwLam(c), cx, 0, d / 2 + 0.04);
tzwBox(g, sw - 1.6, 2.3, 0.06, pane, cx - 0.5, 0.5, d / 2 + 0.12);
tzwBox(g, 1.0, 2.4, 0.08, tzwLam(0x1E1A16), cx + sw / 2 - 0.9, 0, d / 2 + 0.12);
tzwSign(g, o.names ? names[i % names.length] : names[Math.floor(R() * names.length)], sw - 0.6, 0.62, cx, 3.0, d / 2 + 0.2, 0, { bg: "#" + c.toString(16).padStart(6, "0"), ink: "#F0D890" });
if (!tzwLite()) {
var aw = tzwBox(g, sw - 0.4, 0.06, 1.6, tzwLam([0xC8B080, 0x8A3A2A, 0x3A5A3A][i % 3], { ds: 1 }), cx, 2.7, d / 2 + 0.8);
aw.rotation.x = 0.3;
}
[0, 1].forEach(function (f) { for (var k = -1; k <= 1; k += 2) {
tzwBox(g, 1.0, 1.6, 0.06, trim, cx + k * sw * 0.22, 4.2 + f * 2.4, d / 2 + 0.03);
tzwBox(g, 0.8, 1.4, 0.06, pane, cx + k * sw * 0.22, 4.3 + f * 2.4, d / 2 + 0.06);
} });
}
tzwSolid(x, z, n * sw, d, y - 1, y + h + 3, o.ry || 0);
return g;
},
function (P, pts, hfn) {
var lite = tzwLite();
tzwStrip(P, pts, 7, hfn, tzwMat("gravel"), 0.12);
var sl = [], rl = [];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ry = Math.atan2(b[0] - a[0], b[1] - a[1]), n = Math.floor(L / (lite ? 1.6 : 0.8));
for (var k = 0; k < n; k++) {
var t = k / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t;
[-1.6, 1.6].forEach(function (o) { sl.push({ x: x + Math.cos(ry) * o, z: z - Math.sin(ry) * o, y: hfn(x, z) + 0.16, ry: ry }); });
}
[-2.32, -0.88, 0.88, 2.32].forEach(function (o) { var m = new THREE.Mesh(tzwGeo("rail", function () { return new THREE.BoxGeometry(0.08, 0.14, 1); }), tzwMat("iron")); var mx = (a[0] + b[0]) / 2 + Math.cos(ry) * o, mz = (a[1] + b[1]) / 2 - Math.sin(ry) * o; m.position.set(mx, hfn(mx, mz) + 0.3, mz); m.rotation.y = ry; m.scale.z = L; P.add(m); });
}
tzwInst(P, tzwGeo("sleeper", function () { return new THREE.BoxGeometry(2.4, 0.14, 0.26); }), tzwMat("darkoak"), sl, {});
},
function (P, x, z, len, name, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : tzwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
tzwBox(g, 6, 1.0, len, tzwMat("paving"), 0, 0, 0);
tzwBox(g, 6.1, 0.12, len, tzwMat("ashlar"), 0, 1.0, 0);
for (var i = 0; i < Math.floor(len / 6); i++) {
var cz = -len / 2 + 3 + i * 6;
tzwCyl(g, 0.1, 0.12, 4, tzwLam(0x2A4A3A), 1.6, 1, cz, 8);
}
var cn = tzwBox(g, 5, 0.1, len * 0.7, tzwLam(0xD8D0C0, { ds: 1 }), 0.6, 5.0, 0);
cn.rotation.z = 0.12;
tzwBox(g, 0.2, 0.4, len * 0.7, tzwLam(0x2A4A3A), 3, 4.8, 0);
tzwBox(g, 4, 3.8, 12, tzwS("brick", 0xA86048, 1.4), -1, 1, 0);
tzwBox(g, 4.4, 0.3, 12.4, tzwLam(0xF2EEE2), -1, 4.8, 0);
tzwBox(g, 1.2, 2.3, 0.08, tzwLam(0x2A3A2A), 1.02, 1, 0);
tzwSign(g, name, 5, 0.8, 2.9, 2.6, len / 2 - 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
tzwSign(g, name, 5, 0.8, 2.9, 2.6, -len / 2 + 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
tzwFloor(x, z, 6, len, y + 1.12, {});
tzwSolid(x + Math.cos(o.ry || 0) * (-1), z - Math.sin(o.ry || 0) * (-1), 4, 12, y, y + 5, o.ry || 0);
return g;
},
function (P, x, z, len, w, y, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var br = tzwS("brick", 0x9A5A40, 1.4), rise = o.rise || 1.6, n = 8;
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, z0 = -len / 2 + len * t0, z1 = -len / 2 + len * t1, y0 = Math.sin(t0 * Math.PI) * rise, y1 = Math.sin(t1 * Math.PI) * rise, seg = tzwBox(g, w, 0.5, len / n + 0.05, br, 0, (y0 + y1) / 2 - 0.4, (z0 + z1) / 2);
seg.rotation.x = -Math.atan2(y1 - y0, len / n);
[-1, 1].forEach(function (s) { var pr = tzwBox(g, 0.4, 1.0, len / n + 0.05, br, s * (w / 2 - 0.2), (y0 + y1) / 2, (z0 + z1) / 2); pr.rotation.x = -Math.atan2(y1 - y0, len / n); });
}
var ar = new THREE.Mesh(tzwGeo("arch" + w, function () { var t = new THREE.TorusGeometry(3, 0.6, 6, 12, Math.PI); return t; }), br);
ar.rotation.y = Math.PI / 2;
ar.position.y = -3.2;
g.add(ar);
var ry = o.ry || 0, cx = function (lz) { return x + Math.sin(ry) * lz; }, cz = function (lz) { return z + Math.cos(ry) * lz; };
tzwRamp(cx(-len / 4), cz(-len / 4), w - 0.8, len / 2, y - 0.1, y + rise - 0.1, ry);
tzwRamp(cx(len / 4), cz(len / 4), w - 0.8, len / 2, y + rise - 0.1, y - 0.1, ry);
[-1, 1].forEach(function (s) { tzwSolid(x + Math.cos(ry) * s * (w / 2 - 0.2), z - Math.sin(ry) * s * (w / 2 - 0.2), 0.4, len, y - 1, y + rise + 1.1, ry); });
return g;
},
function (P, x, z, hfn, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var ir = tzwLam(0x1E2A22);
tzwCyl(g, 0.07, 0.12, 3.4, ir, 0, 0, 0, 8);
tzwBox(g, 0.7, 0.06, 0.06, ir, 0, 3.1, 0);
var lt = tzwBox(g, 0.34, 0.5, 0.34, tzwGlowM(o.lit ? 0xFFE0A0 : 0xE8E4D0, o.lit ? 0.95 : 0.6), 0, 3.4, 0);
var cap = new THREE.Mesh(tzwGeo("lampcap", function () { return new THREE.ConeGeometry(0.3, 0.3, 4); }), ir);
cap.position.y = 4.05;
cap.rotation.y = Math.PI / 4;
g.add(cap);
if (o.lit) {
var gl = wGlow(0xFFD890, 0.9, 2.4);
gl.position.y = 3.6;
g.add(gl);
}
tzwRound(x, z, 0.2, hfn(x, z) - 1, hfn(x, z) + 3.5);
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
tzwInst(P, tzwGeo("tpole", function () { var p = new THREE.CylinderGeometry(0.1, 0.14, 8, 6); p.translate(0, 4, 0); var c = new THREE.BoxGeometry(1.6, 0.1, 0.1); c.translate(0, 7.4, 0); var c2 = new THREE.BoxGeometry(1.2, 0.1, 0.1); c2.translate(0, 6.8, 0); return gwMerge([p.toNonIndexed(), c, c2].map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), tzwMat("darkoak"), list, {});
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
tzwInst(P, tzwGeo("drywall", function () { var b = new THREE.BoxGeometry(0.7, 1.1, 2.5); b.translate(0, 0.5, 0); return b; }), tzwMat("granite"), list, {});
list.forEach(function (q) { tzwSolid(q.x, q.z, 0.8, 2.5, q.y - 1, q.y + 1.1, q.ry); });
return;
}
if (o.hedge) {
tzwPlant(P, "bush", list.map(function (q, i) { return { x: q.x, z: q.z, y: q.y - 0.2, s: 0.85 + ((i * 37) % 10) / 40, ry: i * 1.7 }; }), { col: 0x4A6A30, keepAll: true });
return;
}
tzwInst(P, tzwGeo(o.hedge ? "hedge" : "paling", function () { if (o.hedge) {
var h = new THREE.BoxGeometry(0.9, 1.4, 2.5, 2, 2, 2);
h.translate(0, 0.7, 0);
return h;
} var parts = []; for (var j = 0; j < 6; j++) {
var s = new THREE.BoxGeometry(0.06, 1.1, 0.08);
s.translate(0, 0.55, -1.0 + j * 0.4);
parts.push(s);
} var r = new THREE.BoxGeometry(0.05, 0.08, 2.4); r.translate(0, 0.85, 0); parts.push(r); var r2 = r.clone(); r2.translate(0, -0.5, 0); parts.push(r2); return gwMerge(parts.map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), o.hedge ? tzwM("hedgeM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x3A5A2A, map: tzwLeafTex(), alphaTest: 0.3 }); m.userData.noPhoto = 1; return m; }) : tzwLam(o.col || 0xE8E2D2), list, {});
},
function (P, x, z, r, hfn, fires) {
var m = new THREE.Mesh(new THREE.CircleGeometry(r, 18), tzwM("scorch", function () { var mm = new THREE.MeshLambertMaterial({ color: 0x14100C, transparent: true, opacity: 0.85, depthWrite: false }); mm.userData.noPhoto = 1; return mm; }));
m.rotation.x = -Math.PI / 2;
m.position.set(x, hfn(x, z) + 0.05, z);
P.add(m);
var R = wRand(Math.round(x * 7 + z));
for (var i = 0; i < (fires || 0); i++) {
var a = R() * 6.283, d = R() * r * 0.8, fx = x + Math.cos(a) * d, fz = z + Math.sin(a) * d;
var f = tzwFire(P, fx, hfn(fx, fz), fz, 0.6 + R() * 0.8);
f.userData.keep = 1;
}
return m;
},
function (P, list) { if (!list.length)
return; tzwInst(P, tzwGeo("deadT", function () { var t = new THREE.CylinderGeometry(0.12, 0.3, 6, 6); t.translate(0, 3, 0); var b = new THREE.CylinderGeometry(0.05, 0.1, 2.4, 5); b.rotateZ(0.9); b.translate(0.8, 4.2, 0); var b2 = b.clone(); b2.rotateY(2.4); return gwMerge([t.toNonIndexed(), b.toNonIndexed(), b2.toNonIndexed()]); }), tzwLam(0x1A1612), list, {}); },
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : tzwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
var wd = tzwMat(o.mat || "oak"), blk = tzwLam(0x1A1612);
var L = o.len || 2.6, W = o.w || 1.5;
tzwBox(g, W, 0.5, L, wd, 0, 0.8, 0);
if (o.seat)
tzwBox(g, W, 0.5, 0.5, tzwLam(o.seatCol || 0x3A2A1E), 0, 1.3, -0.3);
if (o.load)
for (var i = 0; i < o.load; i++)
tzwBox(g, 0.6, 0.4 + i % 2 * 0.2, 0.6, tzwLam([0x8A6A4A, 0x5A4A3A, 0xC8B898, 0x6A3A2A][i % 4]), -0.4 + (i % 3) * 0.4, 1.3, -0.8 + Math.floor(i / 3) * 0.6);
[-1, 1].forEach(function (s) { var wh = new THREE.Mesh(tzwGeo("cwheel", function () { return new THREE.TorusGeometry(0.75, 0.05, 6, 16); }), blk); wh.position.set(s * (W / 2 + 0.1), 0.75, 0.2); wh.rotation.y = Math.PI / 2; g.add(wh); for (var k = 0; k < 5; k++) {
var sp = tzwBox(g, 0.03, 1.5, 0.03, wd, s * (W / 2 + 0.1), 0, 0.2);
sp.position.y = 0.75;
sp.rotation.x = k / 5 * Math.PI;
} });
[-1, 1].forEach(function (s) { tzwBox(g, 0.06, 0.06, 2.4, wd, s * 0.45, 0.9, -L / 2 - 1.1); });
if (o.horse !== false)
tzwHorse(g, 0, 0, -L / 2 - 2.0, 0, { col: o.hcol || 0x5A3A22, kind: o.kind });
if (!o.nosolid)
tzwSolid(x, z, W + 0.6, L + 2, y - 1, y + 2.2, ry || 0);
return g;
},
function (P, hfn, col, o) {
o = o || {};
var R = o.r || 2600, st = tzwLite() ? 160 : 100, E = o.edge || 820, cl = function (v) { return Math.max(-E, Math.min(E, v)); };
return tzwTerrain(P, -R, -R, 2 * R, 2 * R, st, function (x, z) { var e = Math.max(Math.abs(x), Math.abs(z)), k = tzwSmooth(E, R, e); return hfn(cl(x), cl(z)) * (1 - k) + (o.rise || 18) * k * tzwFbm(x * 0.002, z * 0.002, 2) - 0.6 - 8 * (1 - k); }, tzwMat("meadow"), function (x, z, y, c) { var g = 0.75 + tzwFbm(x * 0.01, z * 0.01, 2) * 0.2, C = typeof col === "number" ? [((col >> 16) & 255) / 255, ((col >> 8) & 255) / 255, (col & 255) / 255] : (col || [0.56, 0.74, 0.42]); c.setRGB(C[0] * g, C[1] * g, C[2] * g); });
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
var lite = tzwLite(), R = wRand(o.seed || 5), L = tzwPathLen(pts), W = o.w || 8, mv = [], g = new THREE.Group();
P.add(g);
g.userData.keep = 1;
g.userData.live = 1;
var dress = o.dress || ["gent", "lady", "maid", "worker", "boy", "girl", "porter", "cabby", "clergy", "newsboy"], n = lite ? Math.round((o.n || 40) * 0.4) : (o.n || 40), nc = lite ? Math.round((o.carts || 8) * 0.5) : (o.carts || 8);
for (var i = 0; i < n; i++) {
var d = dress[Math.floor(R() * dress.length)], kid = d === "boy" || d === "girl", m = tzwDressed((o.seed || 5) * 100 + i, d, { sex: d === "lady" || d === "maid" || d === "girl" ? "f" : "m", child: kid });
g.add(m);
mv.push({ g: m, s: R() * L, off: (R() - 0.5) * W, sp: (o.sp || 1.4) * (0.8 + R() * 0.5) });
}
for (i = 0; i < nc; i++) {
var c = tzwCart(g, 0, 0, 0, { y: 0, nosolid: true, seat: R() < 0.6, load: Math.floor(R() * 6), hcol: [0x5A3A22, 0x2A1E16, 0x8A6A4A, 0x3A3028][i % 4], len: 2 + R() * 1.4 });
mv.push({ g: c, s: R() * L, off: (R() - 0.5) * W * 0.5, sp: (o.sp || 1.4) * (0.9 + R() * 0.3), cart: 1 });
}
var on = true;
TZW.ticks.push(function (dt) { if (!g.parent || !on)
return; mv.forEach(function (M) { M.s += M.sp * dt; if (M.s > L)
M.s -= L; var p = tzwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); }); });
mv.forEach(function (M) { var p = tzwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); });
g.userData.stop = function () { on = false; };
return g;
},
function (P, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var ir = tzwLam(0x1E1E1A), br = tzwMat(o.brass ? "brass" : "iron");
if (o.hang)
tzwCyl(g, 0.012, 0.012, o.hang, ir, 0, 0.34, 0, 4);
tzwCyl(g, 0.12, 0.12, 0.03, br, 0, 0, 0, 8);
tzwCyl(g, 0.1, 0.1, 0.24, tzwGlowM(0xFFD890, 0.75), 0, 0.03, 0, 8);
tzwCyl(g, 0.04, 0.12, 0.08, br, 0, 0.27, 0, 8);
return g;
},
function (P, x, y, z, s) { s = s || 1; var m = new THREE.Mesh(tzwGeo("tzGourd", function () { var pts = []; for (var i = 0; i <= 12; i++) {
var t = i / 12;
pts.push(new THREE.Vector2(Math.max(0.01, (t < 0.55 ? Math.sin(t / 0.55 * Math.PI) * 0.16 : Math.sin((t - 0.55) / 0.45 * Math.PI) * 0.08 + 0.02)), t * 0.5));
} return new THREE.LatheGeometry(pts, 10); }), tzwLam(0xC8A050)); m.position.set(x, y, z); m.scale.setScalar(s); P.add(m); return m; },
function (P, x, y, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var m = new THREE.Mesh(tzwGeo("tzShield", function () { var c = new THREE.CircleGeometry(0.5, 16); c.scale(0.55, 1, 1); return c; }), tzwLam(col || 0x6A4A2A, { ds: 1 }));
g.add(m);
var b = new THREE.Mesh(tzwGeo("tzShieldB", function () { var c = new THREE.PlaneGeometry(0.06, 0.95); return c; }), tzwLam(0xE8E0C8, { ds: 1 }));
b.position.z = 0.005;
g.add(b);
return g;
},
function (P, x, y, z, ry, items) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
tzwBox(g, 0.2 + items.length * 0.45, 0.08, 0.04, tzwMat("darkoak"), 0, 0, 0);
items.forEach(function (it, i) {
var px = -items.length * 0.225 + 0.22 + i * 0.45;
tzwCyl(g, 0.02, 0.02, 0.1, tzwMat("oak"), px, 0.0, 0.06, 5).rotation.x = Math.PI / 2;
if (it === "coat")
tzwBox(g, 0.42, 0.9, 0.08, tzwLam(0x3A3A30), px, -0.92, 0.08);
else if (it === "hat")
tzwCyl(g, 0.15, 0.17, 0.12, tzwLam(0xD8C8A0), px, -0.06, 0.12, 10);
else if (it === "rope") {
var r = new THREE.Mesh(tzwGeo("tzRopeC", function () { return new THREE.TorusGeometry(0.16, 0.03, 5, 14); }), tzwLam(0xB8A070));
r.position.set(px, -0.2, 0.08);
g.add(r);
}
else if (it === "bag")
tzwBox(g, 0.3, 0.36, 0.14, tzwLam(0x6A4A2A), px, -0.42, 0.1);
});
return g;
},
function (P, x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
tzwBox(g, 0.42, 0.52, 0.1, tzwMat("darkoak"), 0, 0, 0);
var f = new THREE.Mesh(new THREE.CircleGeometry(0.15, 20), tzwLam(0xF4F0E4));
f.position.set(0, 0.3, 0.052);
g.add(f);
var h = tzwBox(g, 0.015, 0.11, 0.01, tzwLam(0x141414), 0, 0.3, 0.056);
h.rotation.z = 0.8;
tzwBox(g, 0.012, 0.13, 0.01, tzwLam(0x141414), 0, 0.3, 0.058);
return g;
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var ir = tzwShine(0x1E1E1E, 0.6, 0.5);
tzwCyl(g, 0.32, 0.36, 0.9, ir, 0, 0.12, 0, 14);
tzwCyl(g, 0.38, 0.38, 0.06, ir, 0, 1.0, 0, 14);
[[-0.22, -0.22], [0.22, -0.22], [-0.22, 0.22], [0.22, 0.22]].forEach(function (q) { tzwBox(g, 0.06, 0.14, 0.06, ir, q[0], 0, q[1]); });
tzwCyl(g, 0.07, 0.07, 2.0, ir, 0, 1.06, 0, 8);
tzwBox(g, 0.18, 0.14, 0.02, tzwGlowM(0xFF8A3A, 0.8), 0, 0.4, 0.35);
return g;
},
function (P, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var c = tzwLam(col || 0x2A1A14), wd = tzwMat("darkoak");
tzwBox(g, 1.9, 0.42, 0.7, c, 0, 0.12, 0);
tzwBox(g, 1.9, 0.55, 0.16, c, 0, 0.5, -0.28);
[-1, 1].forEach(function (s) { tzwBox(g, 0.14, 0.32, 0.7, c, s * 0.95, 0.5, 0); });
[[-0.85, -0.3], [0.85, -0.3], [-0.85, 0.3], [0.85, 0.3]].forEach(function (q) { tzwBox(g, 0.06, 0.12, 0.06, wd, q[0], 0, q[1]); });
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
tzwTable(g, 0, 0, 0.6, 0.6, 0.7, { mat: "darkoak" });
tzwCyl(g, 0.1, 0.12, 0.04, tzwMat("brass"), 0, 0.7, 0, 10);
tzwCyl(g, 0.08, 0.1, 0.18, tzwGlowM(0xFFE0A8, 0.7), 0, 0.74, 0, 10);
tzwCyl(g, 0.04, 0.06, 0.2, tzwShine(0xEAF2F4, 0.1, 0.05), 0, 0.92, 0, 8);
if (o.book)
tzwBox(g, 0.22, 0.05, 0.3, tzwLam(0x6A2A1A), 0.14, 0.7, 0.1);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = tzwMat(o.mat || "oak");
tzwBox(g, 1.4, 0.9, 0.5, wd, 0, 0, 0);
for (var i = 0; i < 2; i++) {
tzwBox(g, 0.62, 0.3, 0.02, tzwMat("darkoak"), -0.34 + i * 0.68, 0.15, 0.26);
tzwBox(g, 0.62, 0.3, 0.02, tzwMat("darkoak"), -0.34 + i * 0.68, 0.52, 0.26);
}
if (o.hutch) {
tzwBox(g, 1.4, 1.0, 0.3, wd, 0, 0.9, -0.1);
for (var p = 0; p < 5; p++)
tzwCyl(g, 0.12, 0.12, 0.02, tzwLam([0xF4F2EA, 0x3A6A9A, 0xF4F2EA, 0xC8A060, 0xF4F2EA][p]), -0.5 + p * 0.25, 1.55, 0.0, 12).rotation.x = Math.PI / 2.4;
tzwBox(g, 1.3, 0.03, 0.25, wd, 0, 1.4, -0.08);
}
return g;
},
function (P, x, y, z, ry) {
tzwPicture(P, x, y, z, ry || 0, 0.9, 0.7, function (c, W, H) {
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
function (g, R, lite) {
tzwTable(g, 2.6, 1.4, 1.0, 0.6, 0.76, { mat: "planks" });
tzwBox(g, 0.32, 0.03, 0.24, tzwLam(0x2A2418), 2.5, 0.76, 1.4);
tzwBox(g, 0.3, 0.005, 0.22, tzwLam(0xE8DCB8), 2.5, 0.79, 1.4);
tzwCyl(g, 0.03, 0.03, 0.06, tzwLam(0x101418), 2.85, 0.76, 1.3, 8);
tzfStool(g, 2.6, 0.8, { mat: "oak", h: 0.42 });
tzfPegs(g, -0.8, 1.9, -2.94, 0, ["coat", "hat", "bag"]);
tzfWood(g, -1.0, -2.55, 0, lite ? 5 : 10);
tzwCyl(g, 0.13, 0.15, 0.22, tzwLam(0x2A2A2A), -2.4, 0.3, -2.5, 10);
tzfBucket(g, -3.3, -1.8);
tzfLantern(g, 0.6, 2.6, 0.2, { hang: 0.6 });
if (!lite) {
tzfBasket(g, -3.2, 0.4, 1.0);
tzwPot(g, -3.3, 0, 0.9, 0.28);
}
},
function (g, R, lite) {
tzfStool(g, 0, -1.6, { h: 0.42 });
tzfDrums(g, 2.4, -0.6);
tzfShield(g, -3.44, 1.6, -1.0, Math.PI / 2, 0x6A3A1A);
tzfShield(g, -3.44, 1.6, 0.2, Math.PI / 2, 0x3A2A1A);
tzfShield(g, 3.44, 1.6, 1.2, -Math.PI / 2, 0x8A5A2A);
tzfTusk(g, -2.4, -1.2, 0.4);
tzfTusk(g, -2.2, -1.0, 0.5);
tzfMat(g, -2.0, 1.6, 1.4, 2.0, 0xC8B070);
tzwRug(g, -2.0, 1.6, 1.2, 1.4, 0xA87A4A);
for (var i = 0; i < (lite ? 2 : 4); i++)
tzfBasket(g, 2.8, 1.0 + i * 0.55, 0.9 + 0.2 * (i % 2));
tzfHang(g, -0.6, 2.6, 0.6, lite ? 2 : 4, 0xC8A050, 0.32);
if (!lite)
[[-1.2, 2.2], [0.4, 2.4]].forEach(function (q) { tzfGourd(g, q[0], 0, q[1], 1.2); });
tzwFire(g, 0.6, 0, 0.8, 0.5);
},
function (g, R, lite) {
tzfMat(g, 1.6, 1.4, 1.2, 1.8, 0xC8B070);
tzfMat(g, -1.6, 1.4, 1.0, 1.6, 0xB8A060, 0.2);
tzfStool(g, -0.6, -0.4, { h: 0.3 });
for (var i = 0; i < (lite ? 2 : 3); i++)
tzfBasket(g, -2.4 + i * 0.5, -0.4, 0.8 + 0.2 * (i % 2), [0xB8945A, 0xA8844A, 0xC8A46A][i]);
tzfHang(g, 0.8, 2.5, -2.2, lite ? 2 : 4, 0x6A5A3A, 0.4);
tzfGourd(g, 2.4, 0, -0.4, 1.0);
if (!lite)
tzfGourd(g, 2.5, 0, 0.0, 0.8);
tzfShield(g, -2.94, 1.5, -1.0, Math.PI / 2, 0x5A3A1A);
var bw = tzwCyl(g, 0.02, 0.02, 1.5, tzwMat("oak"), -2.9, 0.6, 0.4, 5);
bw.rotation.z = 0.12;
},
function (g, R, lite) {
[[-0.4, -0.6], [0.4, -0.6], [0, -0.1]].forEach(function (q) { tzwCyl(g, 0.12, 0.14, 0.2, tzwMat("rock"), q[0], 0, q[1], 6); });
tzwPot(g, 0, 0.22, -0.4, 0.42);
var rk = new THREE.Group();
rk.position.set(-2.2, 0, 1.2);
g.add(rk);
[-0.8, 0.8].forEach(function (s) { tzwCyl(rk, 0.04, 0.05, 1.6, tzwMat("darkbark"), s, 0, 0, 5); });
for (var b = 0; b < 2; b++) {
tzwBox(rk, 1.8, 0.04, 0.04, tzwMat("darkbark"), 0, 1.1 + b * 0.4, 0);
tzfHang(rk, -0.7, 1.06 + b * 0.4, 0, lite ? 3 : 7, b ? 0x5A3A20 : 0x8A6A4A, 0.24);
}
for (var i = 0; i < (lite ? 2 : 5); i++)
tzfBasket(g, 2.6, -1.6 + i * 0.6, 1.0, [0xB8945A, 0xA8844A, 0xC8A46A, 0xB8945A, 0xA8844A][i]);
if (!lite) {
for (var p = 0; p < 3; p++)
tzwBox(g, 0.14, 0.06, 0.3, tzwLam(0xE8DCB0), 2.6, 0.31, -1.6 + p * 0.6);
for (var q = 0; q < 3; q++)
tzwBox(g, 0.08, 0.05, 0.24, tzwLam(0xD8C040), 2.6, 0.31, 0.2 + q * 0.6, 0.3);
}
tzfWood(g, -2.6, -2.0, Math.PI / 2, lite ? 5 : 9);
tzfGourd(g, 1.2, 0, 2.2, 1.2);
tzfGourd(g, 1.6, 0, 2.3, 1.0);
},
function (g, R, lite) {
tzfLantern(g, 0, 2.7, 0, { hang: 0.5, brass: 1 });
tzfPlates(g, 0, 0.76, 0, lite ? 4 : 8, [1.9, 0.42]);
tzfDresser(g, -3.6, 1.8, Math.PI, { mat: "darkoak" });
for (var d = 0; d < 3; d++)
tzfBottle(g, -4.0 + d * 0.4, 0.9, 1.8, [0x6A1A1A, 0x8A6A2A, 0x2A4A2A][d]);
tzwShelves(g, 4.36, -1.0, 1.6, 2.0, -Math.PI / 2, { books: 1 });
tzwPicture(g, 4.38, 1.6, 1.4, -Math.PI / 2, 1.0, 0.7, function (c, W, H) { c.fillStyle = "#E8DCB8"; c.fillRect(0, 0, W, H); c.strokeStyle = "#3A5A8A"; c.lineWidth = 2; c.beginPath(); c.moveTo(W * 0.2, H * 0.1); c.bezierCurveTo(W * 0.5, H * 0.4, W * 0.3, H * 0.7, W * 0.6, H * 0.9); c.stroke(); c.fillStyle = "#2A1A10"; c.font = Math.round(H * 0.1) + "px serif"; c.fillText("Côte d'Afrique", W * 0.05, H * 0.95); });
tzfClock(g, -4.38, 1.9, -1.0, Math.PI / 2);
for (var s = 0; s < 3; s++) {
var sw = tzwBox(g, 0.04, 0.9, 0.02, tzwShine(0xC8C8D0, 0.2, 0.8), -4.4, 1.0, 0.2 + s * 0.25, Math.PI / 2);
sw.rotation.z = 0.1;
}
},
function (g, R, lite) {
tzfLantern(g, 0, 2.8, -0.6, { hang: 0.4, brass: 1 });
tzfPlates(g, 0, 0.76, -0.6, lite ? 4 : 6, [1.4, 0.36]);
tzwTable(g, -4.0, 1.2, 1.2, 0.7, 0.76, { mat: "darkoak" });
tzwChair(g, -4.0, 1.9, Math.PI, {});
tzwBox(g, 0.3, 0.04, 0.22, tzwLam(0x2A1A10), -4.0, 0.76, 1.1);
tzwCandle(g, -4.4, 0.76, 1.0, {});
tzwPot(g, 4.5, 0, -2.8, 0.45);
tzfBasket(g, -2.6, 2.8, 0.9, 0xC8A46A);
tzwBench(g, 1.8, 3.0, Math.PI, { w: 1.6 });
[-4.2, -3.0].forEach(function (x, i) { tzwPicture(g, x, 1.9, -3.38, 0, 0.5, 0.7, function (c, W, H) { c.fillStyle = i ? "#2A3A6A" : "#6A2A2A"; c.fillRect(0, 0, W, H); c.fillStyle = "#E8C870"; c.beginPath(); c.arc(W / 2, H * 0.3, W * 0.18, 0, 7); c.fill(); c.fillStyle = "#F2EAD4"; c.fillRect(W * 0.3, H * 0.45, W * 0.4, H * 0.45); }); });
tzwPot(g, 0.6, 0.76, -0.6, 0.18);
if (!lite)
[0, 1, 2].forEach(function (f) { var fl = new THREE.Mesh(tzwGeo("tzFlower", function () { return new THREE.IcosahedronGeometry(0.06, 0); }), tzwLam([0xE83A3A, 0xF0C030, 0xF4F0E8][f])); fl.position.set(0.6 + (f - 1) * 0.07, 0.98, -0.6); g.add(fl); });
},
function (g, R, lite) {
tzfLantern(g, 0, 1.9, -0.6, { hang: 0.3, brass: 1 });
tzfChart(g, 0, 0.78, -0.6, 1.1, 0.7);
tzfBottle(g, 0.7, 0.76, -0.9, 0x6A3A10);
tzwCyl(g, 0.04, 0.035, 0.08, tzwShine(0xD8E4E8, 0.1, 0.1), 0.85, 0.76, -0.8, 8);
tzwChest(g, -2.6, 1.4, 0, { y: 0, w: 1.1, h: 0.55, d: 0.55 });
tzfClock(g, -1.4, 1.6, -2.44, 0);
tzfPegs(g, 1.6, 1.7, -2.44, 0, ["coat"]);
tzwRug(g, 0, 0.2, 2.4, 1.4, 0x4A2A1A);
},
function (g, R, lite) {
tzfSofa(g, 0, 1.6, Math.PI, 0x3A2A3A);
tzfLampTable(g, -1.4, 1.6, { book: 1 });
tzfClock(g, 0, 1.4, -2.82, 0);
var rk = new THREE.Group();
rk.position.set(-2.6, 0, 1.2);
rk.rotation.y = 2.4;
g.add(rk);
tzwChair(rk, 0, 0, 0, {});
[-0.24, 0.24].forEach(function (x) { var r = new THREE.Mesh(tzwGeo("tzRocker", function () { return new THREE.TorusGeometry(0.4, 0.035, 5, 14, Math.PI * 0.6); }), tzwMat("oak")); r.rotation.set(0, Math.PI / 2, Math.PI * 1.2); r.position.set(x, 0.34, 0); rk.add(r); });
tzfCurtain(g, 3.78, 1.5, 0.35, Math.PI / 2, 0.35, 1.7, 0x6A2A3A);
tzfCurtain(g, 3.78, 1.5, 1.65, Math.PI / 2, 0.35, 1.7, 0x6A2A3A);
tzfPlant(g, 3.2, -2.4, 1.1);
if (!lite) {
var og = new THREE.Group();
og.position.set(-3.6, 0, -1.6);
og.rotation.y = Math.PI / 2;
g.add(og);
tzwBox(og, 1.4, 1.0, 0.6, tzwMat("darkoak"), 0, 0, 0);
tzwBox(og, 1.4, 0.7, 0.2, tzwMat("darkoak"), 0, 1.0, -0.2);
tzwBox(og, 1.1, 0.04, 0.2, tzwLam(0xF4F0E4), 0, 0.9, 0.2);
}
},
function (g, R, lite) {
tzfDresser(g, 0.6, -2.6, 0, { hutch: 1, mat: "oak" });
var sk = new THREE.Group();
sk.position.set(-3.1, 0, 0.8);
sk.rotation.y = Math.PI / 2;
g.add(sk);
tzwBox(sk, 1.2, 0.8, 0.6, tzwMat("oak"), 0, 0, 0);
tzwBox(sk, 0.8, 0.1, 0.45, tzwShine(0xD8D8D0, 0.3, 0.4), 0, 0.8, 0);
tzwCyl(sk, 0.04, 0.04, 0.5, tzwLam(0x2A3A2A), 0.4, 0.8, -0.2, 6);
var hd = tzwBox(sk, 0.04, 0.3, 0.04, tzwLam(0x2A3A2A), 0.4, 1.25, -0.05);
hd.rotation.x = 0.6;
for (var p = 0; p < 3; p++)
tzwCyl(g, 0.14, 0.12, 0.14, tzwShine(0x3A3A3A, 0.4, 0.5), -2.6 + p * 0.36, 1.6, -2.9, 10);
tzwBox(g, 1.2, 0.04, 0.04, tzwLam(0x2A2A2A), -2.2, 1.78, -2.9);
tzwCyl(g, 0.3, 0.28, 0.8, tzwMat("oak"), 3.0, 0, 1.8, 12);
tzwBox(g, 0.8, 1.3, 0.6, tzwMat("oak"), 3.0, 0, -0.4);
tzwBox(g, 0.1, 0.08, 0.03, tzwMat("brass"), 2.68, 0.9, -0.4);
tzfLantern(g, 0.6, 2.6, 0.2, { hang: 0.4 });
tzwBox(g, 0.4, 0.16, 0.22, tzwLam(0xC8904A), 0.4, 0.76, 0.2);
tzwCyl(g, 0.12, 0.1, 0.14, tzwLam(0xF4F2EA), 1.0, 0.76, 0.3, 10);
},
function (g, R, lite) {
tzfStove(g, 0, 0.6, 0);
tzfClock(g, -2.6, 2.0, -2.44, 0);
tzfTimetable(g, -1.2, 1.7, -2.44, 0);
tzwBox(g, 1.6, 1.4, 0.08, tzwMat("darkoak"), 2.6, 1.1, 0.9);
for (var b = 0; b < 6; b++)
tzwBox(g, 0.02, 0.8, 0.02, tzwMat("brass"), 2.0 + b * 0.22, 1.2, 0.86);
tzwBox(g, 0.2, 0.08, 0.3, tzwMat("brass"), 3.0, 1.12, 1.4);
tzwBox(g, 0.9, 0.5, 0.55, tzwLam(0x6A3A1A), -3.2, 0, 1.6);
tzwBox(g, 0.7, 0.4, 0.45, tzwLam(0x3A2A1A), -3.2, 0.5, 1.6);
tzfLantern(g, 0, 2.4, -1.2, { hang: 0.6 });
},
function (g, R, lite) {
tzfSofa(g, -2.0, 2.4, Math.PI, 0x1E1410);
tzfLampTable(g, -3.4, 2.4, {});
tzfLampTable(g, 3.4, -2.5, { book: 1 });
tzfDresser(g, 2.6, 2.6, Math.PI, { mat: "darkoak" });
tzwCyl(g, 0.1, 0.08, 0.26, tzwLam(0xF4F2EA), 2.4, 0.9, 2.6, 10);
for (var gl = 0; gl < 3; gl++)
tzwCyl(g, 0.035, 0.03, 0.1, tzwShine(0xD8E4E8, 0.1, 0.1), 2.7 + gl * 0.12, 0.9, 2.55, 8);
tzfPlant(g, -3.4, -2.5, 1.2);
tzfCurtain(g, -3.78, 1.5, -0.65, Math.PI / 2, 0.3, 1.7, 0xE8E0D0);
tzfCurtain(g, -3.78, 1.5, 0.65, Math.PI / 2, 0.3, 1.7, 0xE8E0D0);
tzfClock(g, -1.6, 1.9, -2.82, 0);
},
function (sc, G) {
var X = TZW_ROOMXZ[sc];
if (sc === "coast") {
tzwRoom(G, "hotel", X.hotel[0], X.hotel[1], 11, 7, { wall: "plaster", floor: "tile", name: "the Hôtel de la Côte", beams: true, lightI: 0.85, lightCol: 0xFFE8C8 });
tzwRoom(G, "church", X.church[0], X.church[1], 7, 12, { wall: "plaster", floor: "planks", name: "the mission church", beams: true, lightI: 0.85, lightCol: 0xFFF0D8, h: 4.6 });
}
if (sc === "wisconsin") {
tzwRoom(G, "barn", X.barn[0], X.barn[1], 12, 9, { wall: "planks", floor: "planks", ceil: "planks", name: "the barn", beams: true, lightI: 0.7, h: 5, bare: 1 });
}
},
function (g, R, lite) {
var bar = new THREE.Group();
bar.position.set(-3.6, 0, -2.6);
g.add(bar);
tzwBox(bar, 3.4, 1.05, 0.6, tzwMat("darkoak"), 0, 0, 0);
tzwBox(bar, 3.5, 0.06, 0.7, tzwMat("darkoak"), 0, 1.05, 0);
tzwBox(g, 3.4, 1.6, 0.06, tzwMat("darkoak"), -3.6, 1.0, -3.42);
tzwBox(g, 2.6, 0.8, 0.02, tzwShine(0xC8D4D8, 0.05, 0.6), -3.6, 1.6, -3.38);
tzwBox(g, 3.2, 0.04, 0.24, tzwMat("darkoak"), -3.6, 1.3, -3.3);
for (var b = 0; b < (lite ? 5 : 10); b++)
tzfBottle(g, -5.0 + b * 0.3, 1.34, -3.3, [0x6A1A1A, 0x8A6A2A, 0x2A4A2A, 0xD8C890, 0x3A2A1A][b % 5]);
tzwCyl(g, 0.16, 0.18, 0.5, tzwMat("brass"), -2.4, 1.1, -2.6, 12);
for (var t = 0; t < (lite ? 3 : 5); t++) {
var tx = -1.4 + (t % 3) * 2.2, tz = -0.2 + Math.floor(t / 3) * 2.0 + (t % 2) * 0.3;
tzwTable(g, tx, tz, 0.9, 0.9, 0.75, { cloth: 0xF4F2EA });
tzwChair(g, tx - 0.7, tz, Math.PI / 2, { mat: "oak" });
tzwChair(g, tx + 0.7, tz, -Math.PI / 2, { mat: "oak" });
tzwCyl(g, 0.035, 0.03, 0.12, tzwShine(0xD8E4E8, 0.1, 0.1), tx + 0.15, 0.75, tz, 8);
}
tzwBox(g, 4.6, 0.5, 0.04, tzwLam(0xE8E0C8, { ds: 1 }), 0.8, 3.0, 0.6);
tzwCyl(g, 0.012, 0.012, 0.4, tzwLam(0x3A3A3A), 0.8, 3.1, 0.6, 4);
tzfPlant(g, 5.0, -3.0, 1.4);
tzfPlant(g, 5.0, 2.6, 1.2);
tzfPlant(g, -5.0, 2.6, 1.3);
tzwPicture(g, 2.4, 1.8, -3.44, 0, 1.0, 0.7, function (c, W, H) { c.fillStyle = "#F2EAD4"; c.fillRect(0, 0, W, H); c.fillStyle = "#2A1A10"; c.textAlign = "center"; c.font = "bold " + Math.round(H * 0.13) + "px serif"; c.fillText("VAPEURS", W / 2, H * 0.2); c.font = Math.round(H * 0.09) + "px serif"; ["Pour Bordeaux  le 3", "Pour Dakar  le 11", "Pour Lyon  le 19"].forEach(function (s, i) { c.fillText(s, W / 2, H * (0.42 + i * 0.18)); }); });
tzfClock(g, 0.6, 2.1, -3.44, 0);
tzfCurtain(g, 5.44, 1.5, -0.8, -Math.PI / 2, 0.4, 1.8, 0xE8E0D0);
tzfCurtain(g, 5.44, 1.5, 0.8, -Math.PI / 2, 0.4, 1.8, 0xE8E0D0);
},
function (g, R, lite) {
tzwBox(g, 4.4, 0.2, 2.2, tzwMat("planks"), 0, 0, -4.6);
tzwBox(g, 2.2, 1.0, 0.8, tzwMat("oak"), 0, 0.2, -5.3);
tzwBox(g, 2.3, 0.04, 0.9, tzwLam(0xF4F2EA), 0, 1.2, -5.3);
tzwBox(g, 0.1, 1.6, 0.08, tzwMat("darkoak"), 0, 1.8, -5.9);
tzwBox(g, 0.8, 0.1, 0.08, tzwMat("darkoak"), 0, 2.9, -5.9);
[-0.8, -0.4, 0.4, 0.8].forEach(function (x) { tzwCandle(g, x, 1.24, -5.3, { brass: 1 }); });
tzwPot(g, 0, 1.24, -5.1, 0.16);
var lc = new THREE.Group();
lc.position.set(1.8, 0.2, -4.0);
g.add(lc);
tzwCyl(lc, 0.06, 0.1, 1.1, tzwMat("oak"), 0, 0, 0, 8);
var ld = tzwBox(lc, 0.6, 0.04, 0.45, tzwMat("oak"), 0, 1.1, 0);
ld.rotation.x = -0.35;
tzwBox(lc, 0.4, 0.03, 0.3, tzwLam(0x3A1A10), 0, 1.16, 0);
for (var r = 0; r < (lite ? 4 : 6); r++)
[-1.6, 1.6].forEach(function (x) { tzwBench(g, x, -2.4 + r * 1.3, 0, { w: 2.2 }); });
tzwPicture(g, -3.38, 2.2, -3.6, Math.PI / 2, 0.8, 1.1, function (c, W, H) { c.fillStyle = "#2A3A6A"; c.fillRect(0, 0, W, H); c.fillStyle = "#E8C870"; c.beginPath(); c.arc(W / 2, H * 0.22, W * 0.2, 0, 7); c.fill(); c.fillStyle = "#3A5A9A"; c.beginPath(); c.moveTo(W * 0.5, H * 0.32); c.lineTo(W * 0.82, H * 0.95); c.lineTo(W * 0.18, H * 0.95); c.fill(); c.fillStyle = "#F2D8C0"; c.beginPath(); c.arc(W / 2, H * 0.25, W * 0.1, 0, 7); c.fill(); });
tzwCyl(g, 0.3, 0.22, 0.9, tzwMat("stone"), -2.6, 0, 4.6, 12);
tzwCyl(g, 0.012, 0.012, 4.0, tzwLam(0xB8A070), 2.9, 0.6, 5.4, 4);
[-3.38, 3.38].forEach(function (x, i) { for (var w = 0; w < 3; w++)
tzwWindowIn(g, x, 2.2, -3 + w * 3, i ? -Math.PI / 2 : Math.PI / 2, 0.7, 1.6, { sky: 0xC8D8E8 }); });
},
function (g, R, lite) {
for (var s = 0; s < 3; s++) {
var sx = -4.6 + s * 2.2;
tzwBox(g, 0.1, 1.4, 2.6, tzwMat("planks"), sx - 1.05, 0, -3.1);
tzwBox(g, 2.0, 0.1, 0.1, tzwMat("planks"), sx, 1.2, -1.85);
tzwBox(g, 1.6, 0.4, 0.5, tzwMat("planks"), sx, 0.5, -4.2);
tzwBox(g, 1.5, 0.1, 0.45, tzwLam(0xC8B060), sx, 0.9, -4.2);
}
tzwBox(g, 0.1, 1.4, 2.6, tzwMat("planks"), -4.6 + 3 * 2.2 - 1.05, 0, -3.1);
if (typeof tzwHorse === "function")
try {
tzwHorse(g, -4.6, 0, -3.0, Math.PI);
}
catch (e) { }
tzwBox(g, 12, 0.15, 3.6, tzwMat("planks"), 0, 3.0, 2.6);
for (var h = 0; h < (lite ? 3 : 6); h++)
tzwBox(g, 1.6, 0.9, 1.2, tzwLam(0xD8C070), -4.8 + h * 1.9, 3.15, 2.8, h * 0.2);
[[3.6, -2.6], [4.6, -1.4], [2.4, -3.2]].forEach(function (q, i) { var hm = new THREE.Mesh(tzwGeo("tzHay", function () { var c = new THREE.SphereGeometry(1, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2); c.scale(1.2, 0.8, 1.0); return c; }), tzwMat("thatch")); hm.position.set(q[0], 0, q[1]); hm.scale.setScalar(0.45 + i * 0.12); g.add(hm); });
if (typeof tzwCart === "function")
try {
tzwCart(g, 2.8, 1.8, Math.PI / 2, { y: 0 });
}
catch (e) { }
tzfPegs(g, -2.0, 1.9, 4.44, Math.PI, ["rope", "bag", "rope", "coat"]);
for (var m = 0; m < 3; m++)
tzwCyl(g, 0.18, 0.2, 0.6, tzwShine(0xB8BCC0, 0.3, 0.6), -5.4 + m * 0.42, 0, 3.6, 10);
tzwBox(g, 1.4, 0.9, 0.8, tzwMat("oak"), 5.2, 0, 3.6);
var pf = tzwCyl(g, 0.02, 0.02, 1.8, tzwMat("oak"), 5.7, 0, 1.2, 5);
pf.rotation.z = 0.25;
tzfLantern(g, 0, 3.6, -0.4, { hang: 0.8 });
tzfBucket(g, -3.0, -1.2);
},
function () {
if (typeof CRX_PLANS === "undefined" || typeof crxQuad !== "function" || CRX_PLANS.mangani)
return;
var ape = function (o) {
return function () {
return crxBiped({ h: o.h, b: o.b, hunch: 0.85, arm: 1.5, legs: 0.36, gut: o.gut || 0.5, head: "brute", hs: o.hs || 1.45, col: o.col, skin: o.skin || 0x2A2622, col2: o.col, legCol: o.col, hand: 0x2A2420, headCol: o.col,
ears: "round", nose: 0.05, eyeCol: 0x5A3A1A, claws: 0, surf: "fur", back: 1, stride: 1.5,
more: function (Q) { return [{ t: "e", c: [0, Q.E[1] + 0.02 * Q.u, Q.E[2] + 0.12 * Q.u], r: [0.09 * Q.u, 0.07 * Q.u, 0.06 * Q.u], bone: "head", col: o.skin || 0x2A2622, k: 0.02 }, { t: "e", c: [0, Q.E[1] + 0.11 * Q.u, Q.E[2] + 0.08 * Q.u], r: [0.1 * Q.u, 0.03 * Q.u, 0.05 * Q.u], bone: "head", col: o.col, k: 0.02 }]; } });
};
};
CRX_PLANS.mangani = ape({ h: 2.05, b: 1.55, col: 0x1E1A18 });
CRX_PLANS.kerchak = ape({ h: 2.35, b: 1.75, col: 0x16120F, gut: 0.7, hs: 1.55 });
CRX_PLANS.kala = ape({ h: 1.9, b: 1.4, col: 0x2A221C });
CRX_PLANS.bolgani = ape({ h: 2.25, b: 1.95, col: 0x161618, gut: 0.85, hs: 1.65, skin: 0x1A1A1E });
CRX_PLANS.manganiyoung = ape({ h: 1.25, b: 0.85, col: 0x2A2420, hs: 1.6 });
CRX_PLANS.numa = function () {
return crxQuad({ L: 1.1, H: 0.9, G: 0.32, W: 0.9, legR: 0.065, head: "cat", hs: 1.45, col: 0xC8984E, belly: 0xE2CCA0, back: 0xB08040, muzzle: 0xEAD8B8,
tail: { l: 0.9, r: 0.04, up: -1.2, tip: 0x3A2410 }, neck: { l: 0.34, up: 0.45 }, fangs: 1, eyeCol: 0xC8902A, claws: 1, stride: 1.5 });
};
CRX_PLANS.sabor = function () {
return crxQuad({ L: 0.98, H: 0.78, G: 0.28, W: 0.82, legR: 0.055, head: "cat", hs: 1.22, col: 0xC89A58, belly: 0xEAD8B4, back: 0xB8884A, muzzle: 0xF0E2C8,
tail: { l: 0.85, r: 0.035, up: -1.2, tip: 0x4A2A14 }, neck: { l: 0.3, up: 0.4 }, fangs: 1, eyeCol: 0xC8902A, claws: 1, stride: 1.6 });
};
CRX_PLANS.sheeta = function () {
return crxQuad({ L: 0.9, H: 0.66, G: 0.26, W: 0.78, legR: 0.05, head: "cat", hs: 1.1, col: 0xD8A850, belly: 0xF2E8D2, muzzle: 0xF2E8D2,
spots: [42, 0.42, 0x2A1E12], tail: { l: 0.95, r: 0.035, up: -1.0, tip: 0x2A1E12 }, neck: { l: 0.26, up: 0.4 }, fangs: 1, eyeCol: 0xC8C03A, claws: 1, stride: 1.7 });
};
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = null, key = o.kind || "horse";
if (o.plain)
return tzwStandIn(P, x, y, z, ry, o);
var crx = false;
try {
tzwCrxKinds();
crx = typeof crxBuild === "function" && typeof crxHas === "function" && crxHas(key) && !tzwLite() && typeof CRX !== "undefined";
}
catch (e) { }
if (crx && CRX.geo[key]) {
try {
g = crxBuild(key);
if (g) {
var w = new THREE.Group();
w.add(g);
g.scale.multiplyScalar(o.s || 1.55);
g.rotation.y = Math.PI;
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
var stand = tzwStandIn(hold, 0, 0, 0, 0, { col: o.col, kind: key });
TZW.ticks.push(function () { if (!hold.parent || hold.userData.done || !CRX.geo[key])
return; hold.userData.done = 1; try {
var c = crxBuild(key);
if (c) {
c.scale.multiplyScalar(o.s || 1.55);
c.rotation.y = Math.PI;
hold.remove(stand);
hold.add(c);
}
}
catch (e) { } });
return hold;
}
if (!g)
return tzwStandIn(P, x, y, z, ry, o);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
},
function (cow) {
var key = "tzBeast" + (cow ? "C" : "H");
if (TZW_GEO[key])
return TZW_GEO[key];
return (TZW_GEO[key] = (function () {
var coat = [], dark = [], hr = [], S = function (r) { return new THREE.SphereGeometry(r, 14, 10); }, Cy = function (a, b, h, n) { return new THREE.CylinderGeometry(a, b, h, n || 10); };
var Hb = cow ? 1.12 : 1.3, L = cow ? 0.72 : 0.8, W = cow ? 0.42 : 0.31;
tzwPartG(coat, S(1), 0, Hb, 0, 0, 0, 0, W, cow ? 0.42 : 0.37, L);
tzwPartG(coat, S(1), 0, Hb + 0.04, -L * 0.7, 0, 0, 0, W * 0.92, 0.38, 0.34);
tzwPartG(coat, S(1), 0, Hb + 0.06, L * 0.66, 0, 0, 0, W * 0.98, 0.4, 0.36);
if (cow) {
tzwPartG(coat, Cy(0.14, 0.24, 0.6, 10), 0, Hb + 0.12, -0.86, -1.25, 0, 0);
tzwPartG(coat, Cy(0.1, 0.17, 0.48, 10), 0, Hb + 0.02, -1.22, -0.5 + Math.PI / 2, 0, 0);
tzwPartG(dark, S(0.11), 0, Hb - 0.12, -1.42, 0, 0, 0, 1.1, 0.8, 0.8);
[-1, 1].forEach(function (s) { tzwPartG(dark, new THREE.ConeGeometry(0.035, 0.24, 6), s * 0.16, Hb + 0.26, -1.08, 0, 0, -s * 1.1); tzwPartG(coat, S(0.06), s * 0.14, Hb + 0.16, -1.05, 0, 0, 0, 1.4, 0.5, 0.6); });
}
else {
tzwPartG(coat, Cy(0.12, 0.25, 0.86, 12), 0, 1.83, -0.76, -0.62, 0, 0);
tzwPartG(coat, Cy(0.14, 0.085, 0.62, 10), 0, 1.96, -1.13, 0.72, 0, 0);
tzwPartG(coat, S(0.13), 0, 2.12, -0.98, 0, 0, 0, 1, 1, 1.2);
tzwPartG(dark, S(0.09), 0, 1.74, -1.31, 0, 0, 0, 1, 0.8, 1.1);
[-1, 1].forEach(function (s) { tzwPartG(coat, new THREE.ConeGeometry(0.045, 0.16, 6), s * 0.07, 2.27, -0.94, -0.2, 0, -s * 0.15); tzwPartG(dark, S(0.025), s * 0.11, 2.04, -1.1, 0, 0, 0); });
tzwPartG(dark, new THREE.BoxGeometry(0.06, 0.86, 0.13), 0, 1.95, -0.68, -0.62, 0, 0);
tzwPartG(dark, new THREE.BoxGeometry(0.05, 0.18, 0.12), 0, 2.24, -1.04, 0.4, 0, 0);
}
var lh = cow ? 0.78 : 0.92;
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) {
var x = q[0] * W * 0.5, z = q[1] * L * 0.68, hind = q[1] > 0;
var kn = lh * (hind ? 0.6 : 0.52), top = Hb - 0.08;
if (hind) {
tzwPartG(coat, Cy(0.13, 0.08, top - kn + 0.1, 10), x, (top + kn) / 2, z + 0.07, -0.22, 0, 0);
}
else
tzwPartG(coat, Cy(0.1, 0.06, top - kn + 0.08, 10), x, (top + kn) / 2, z, 0, 0, 0);
tzwPartG(coat, S(hind ? 0.07 : 0.062), x, kn, z + (hind ? 0.14 : 0), 0, 0, 0, 1, 1.25, 1.1);
tzwPartG(coat, Cy(0.045, 0.04, kn - 0.12, 8), x, (kn + 0.12) / 2, z + (hind ? 0.07 : 0), hind ? 0.2 : 0, 0, 0);
tzwPartG(dark, S(0.052), x, 0.13, z, 0, 0, 0, 1, 1.1, 1.25);
tzwPartG(dark, Cy(0.055, 0.075, 0.12, 10), x, 0.06, z - 0.02, 0, 0, 0);
});
tzwPartG(dark, Cy(cow ? 0.03 : 0.075, cow ? 0.02 : 0.035, cow ? 0.8 : 0.85, 8), 0, Hb - 0.24, L * 0.98 + 0.12, 0.28, 0, 0);
if (cow)
tzwPartG(dark, S(0.06), 0, Hb - 0.66, L * 0.98 + 0.24, 0, 0, 0, 1, 1.6, 1);
if (!cow) {
tzwPartG(hr, new THREE.TorusGeometry(0.27, 0.06, 8, 16), 0, 1.6, -0.66, 0.95, 0, 0);
tzwPartG(hr, new THREE.BoxGeometry(0.5, 0.07, 0.3), 0, 1.68, -0.12, 0, 0, 0);
tzwPartG(hr, new THREE.BoxGeometry(0.72, 0.05, 0.08), 0, 1.3, -0.12, 0, 0, 0, 1, 1, 1);
tzwPartG(hr, new THREE.TorusGeometry(0.36, 0.025, 6, 18, Math.PI), 0, 1.34, 0.62, 0, Math.PI / 2, Math.PI / 2);
[-1, 1].forEach(function (s) { tzwPartG(hr, new THREE.BoxGeometry(0.02, 0.1, 0.1), s * 0.12, 2.04, -1.06, 0, 0, 0); tzwPartG(hr, new THREE.BoxGeometry(0.02, 0.02, 0.9), s * 0.1, 1.85, -0.82, 0.55, 0, 0); });
}
var out = { coat: gwMerge(coat), dark: gwMerge(dark), harness: hr.length ? gwMerge(hr) : null };
[out.coat, out.dark, out.harness].forEach(function (gg) { if (gg)
gg.userData.shared = 1; });
return out;
})());
},
function (P, x, y, z, ry, o) {
var g = new THREE.Group(), cow = o.kind === "cow" || o.kind === "imcow", G = tzwBeastGeo(cow), c = tzwLam(o.col || (cow ? 0xD8CCB8 : 0x5A3A22)), dk = tzwLam(cow ? 0x2A2420 : 0x1A120C);
var a = new THREE.Mesh(G.coat, c), b = new THREE.Mesh(G.dark, dk);
a.castShadow = !tzwLite();
g.add(a);
g.add(b);
if (G.harness && o.harness !== false && o.inShafts)
g.add(new THREE.Mesh(G.harness, tzwShine(0x141210, 0.3, 0.2)));
if (cow && !o.col) {
var pt = new THREE.Mesh(tzwGeo("cowpatch", function () { var l = []; tzwPartG(l, new THREE.SphereGeometry(1, 10, 8), 0.05, 1.18, -0.2, 0, 0, 0, 0.44, 0.3, 0.4); tzwPartG(l, new THREE.SphereGeometry(1, 10, 8), -0.05, 1.2, 0.45, 0, 0, 0, 0.44, 0.32, 0.3); return gwMerge(l); }), tzwLam(0x1E1A18));
g.add(pt);
}
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
},
function (P, x, y, z, ry, o) {
var k = o.kind || "horse";
if (k === "mangani" || k === "kerchak" || k === "kala" || k === "ape")
return tzwPlainApe(P, x, y, z, ry, o);
if (k === "sabor" || k === "sheeta" || k === "lion" || k === "numa")
return tzwPlainCat(P, x, y, z, ry, o);
if (k === "elephant")
return tzwPlainElephant(P, x, y, z, ry, o);
return tzwPlainBeast(P, x, y, z, ry, o);
},
function () {
var key = "tzApe";
if (TZW_GEO[key])
return TZW_GEO[key];
return (TZW_GEO[key] = (function () {
var fur = [], skin = [], S = function (r) { return new THREE.SphereGeometry(r, 14, 10); }, Cy = function (a, b, h) { return new THREE.CylinderGeometry(a, b, h, 10); };
tzwPartG(fur, S(1), 0, 1.12, 0.05, -0.5, 0, 0, 0.42, 0.5, 0.36);
tzwPartG(fur, S(1), 0, 0.86, 0.42, 0, 0, 0, 0.34, 0.36, 0.3);
tzwPartG(fur, S(1), 0, 1.36, -0.18, 0, 0, 0, 0.3, 0.22, 0.26);
tzwPartG(fur, S(0.2), 0, 1.4, -0.42, 0, 0, 0, 1, 1.05, 1.05);
tzwPartG(skin, S(0.13), 0, 1.34, -0.58, 0.2, 0, 0, 1, 0.8, 0.9);
tzwPartG(fur, new THREE.BoxGeometry(0.34, 0.07, 0.1), 0, 1.5, -0.55, 0.3, 0, 0);
[-1, 1].forEach(function (s) {
tzwPartG(skin, S(0.025), s * 0.07, 1.42, -0.63, 0, 0, 0);
tzwPartG(fur, S(0.045), s * 0.17, 1.43, -0.38, 0, 0, 0, 0.5, 1, 1);
tzwPartG(fur, Cy(0.12, 0.1, 0.62), s * 0.36, 1.0, -0.28, 0.25, 0, s * 0.12);
tzwPartG(fur, Cy(0.1, 0.08, 0.62), s * 0.4, 0.42, -0.42, -0.15, 0, s * 0.05);
tzwPartG(skin, S(0.09), s * 0.41, 0.08, -0.46, 0, 0, 0, 1, 0.6, 1.3);
tzwPartG(fur, Cy(0.13, 0.1, 0.48), s * 0.2, 0.56, 0.5, -0.35, 0, 0);
tzwPartG(fur, Cy(0.09, 0.08, 0.4), s * 0.22, 0.22, 0.62, 0.25, 0, 0);
tzwPartG(skin, S(0.08), s * 0.22, 0.04, 0.56, 0, 0, 0, 1, 0.5, 1.6);
});
return { fur: gwMerge(fur), skin: gwMerge(skin) };
})());
},
function (P, x, y, z, ry, o) {
var g = new THREE.Group(), G = tzwApeGeo(), s = o.kind === "kerchak" ? 1.18 : o.kind === "kala" ? 0.94 : 1.06;
g.add(new THREE.Mesh(G.fur, tzwLam(o.col || (o.kind === "kerchak" ? 0x16120F : o.kind === "kala" ? 0x2A221C : 0x1E1A18))));
g.add(new THREE.Mesh(G.skin, tzwLam(0x2E2A26)));
g.scale.setScalar(s * (o.s ? o.s / 1.55 : 1));
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
},
function (mane) {
var key = "tzCat" + (mane ? "M" : "");
if (TZW_GEO[key])
return TZW_GEO[key];
return (TZW_GEO[key] = (function () {
var coat = [], dark = [], S = function (r) { return new THREE.SphereGeometry(r, 14, 10); }, Cy = function (a, b, h) { return new THREE.CylinderGeometry(a, b, h, 8); };
tzwPartG(coat, S(1), 0, 0.72, 0, 0, 0, 0, 0.26, 0.27, 0.72);
tzwPartG(coat, S(1), 0, 0.76, -0.5, 0, 0, 0, 0.27, 0.3, 0.3);
tzwPartG(coat, S(1), 0, 0.74, 0.48, 0, 0, 0, 0.26, 0.28, 0.3);
tzwPartG(coat, Cy(0.13, 0.17, 0.36), 0, 0.92, -0.72, -0.9, 0, 0);
tzwPartG(coat, S(0.17), 0, 1.0, -0.92, 0, 0, 0, 1, 0.95, 1.1);
tzwPartG(coat, S(0.09), 0, 0.94, -1.06, 0, 0, 0, 0.95, 0.8, 1.0);
tzwPartG(dark, S(0.03), 0, 0.97, -1.15, 0, 0, 0);
[-1, 1].forEach(function (s) { tzwPartG(coat, new THREE.ConeGeometry(0.05, 0.08, 6), s * 0.1, 1.15, -0.9, 0, 0, 0); tzwPartG(dark, S(0.02), s * 0.07, 1.04, -1.05, 0, 0, 0); });
if (mane)
tzwPartG(dark, S(0.3), 0, 0.98, -0.82, 0, 0, 0, 1, 1.05, 0.9);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { var x = q[0] * 0.14, z = q[1] * 0.46; tzwPartG(coat, Cy(0.08, 0.055, 0.52), x, 0.36, z, q[1] > 0 ? 0.12 : -0.05, 0, 0); tzwPartG(coat, S(0.065), x, 0.05, z - 0.04, 0, 0, 0, 1, 0.6, 1.4); });
tzwPartG(coat, Cy(0.035, 0.025, 0.9), 0, 0.55, 0.95, 0.6, 0, 0);
tzwPartG(dark, S(0.05), 0, 0.2, 1.28, 0, 0, 0);
return { coat: gwMerge(coat), dark: gwMerge(dark) };
})());
},
function (P, x, y, z, ry, o) {
var g = new THREE.Group(), lion = o.kind === "lion" || o.kind === "numa", G = tzwCatGeo(lion), col = o.kind === "sheeta" ? 0xD8A850 : lion ? 0xC0924A : 0xC89A58;
g.add(new THREE.Mesh(G.coat, tzwLam(o.col || col)));
g.add(new THREE.Mesh(G.dark, tzwLam(lion ? 0x5A3418 : 0x2A1E12)));
g.scale.setScalar(o.kind === "sheeta" ? 0.85 : 1);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
},
function () {
var key = "tzEle";
if (TZW_GEO[key])
return TZW_GEO[key];
return (TZW_GEO[key] = (function () {
var hide = [], tusk = [], S = function (r) { return new THREE.SphereGeometry(r, 16, 12); }, Cy = function (a, b, h) { return new THREE.CylinderGeometry(a, b, h, 12); };
tzwPartG(hide, S(1), 0, 2.0, 0, 0, 0, 0, 0.95, 1.0, 1.55);
tzwPartG(hide, S(0.6), 0, 2.5, -1.55, 0, 0, 0, 1, 1.05, 1);
tzwPartG(hide, Cy(0.22, 0.1, 1.7), 0, 1.55, -2.05, 0.25, 0, 0);
tzwPartG(hide, Cy(0.1, 0.08, 0.4), 0, 0.72, -2.3, -0.3, 0, 0);
[-1, 1].forEach(function (s) { tzwPartG(hide, S(1), s * 0.55, 2.4, -1.3, 0, 0, 0, 0.08, 0.62, 0.5); tzwPartG(tusk, Cy(0.06, 0.03, 0.9), s * 0.24, 1.95, -2.0, 1.1, 0, s * 0.1); });
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { tzwPartG(hide, Cy(0.3, 0.27, 1.6), q[0] * 0.5, 0.8, q[1] * 0.9, 0, 0, 0); tzwPartG(tusk, Cy(0.3, 0.31, 0.08), q[0] * 0.5, 0.02, q[1] * 0.9, 0, 0, 0); });
tzwPartG(hide, Cy(0.04, 0.02, 0.7), 0, 1.8, 1.5, 0.4, 0, 0);
return { hide: gwMerge(hide), tusk: gwMerge(tusk) };
})());
},
function (list, a, b, r0, r1, seg) {
var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.hypot(dx, dy, dz);
if (L < 0.01)
return;
var c = new THREE.CylinderGeometry(r1, r0, L, seg || 7, 1, true);
var q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
c.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
c.translate((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
list.push(c.index ? c.toNonIndexed() : c);
},
function (list, r, x, y, z, seed, flat, det) {
var g = new THREE.IcosahedronGeometry(r, det == null ? 1 : det), p = g.attributes.position, R = wRand(seed), seen = {};
for (var i = 0; i < p.count; i++) {
var k = p.getX(i).toFixed(2) + "," + p.getY(i).toFixed(2) + "," + p.getZ(i).toFixed(2);
var f = seen[k] || (seen[k] = 0.7 + R() * 0.6);
p.setXYZ(i, p.getX(i) * f, p.getY(i) * f * (flat || 0.62), p.getZ(i) * f);
}
g.computeVertexNormals();
var n = g.attributes.normal, v = new THREE.Vector3();
for (var j = 0; j < p.count; j++) {
v.set(p.getX(j), p.getY(j) / (flat || 0.62), p.getZ(j)).normalize();
v.y = v.y * 0.7 + 0.3;
v.normalize();
n.setXYZ(j, v.x, v.y, v.z);
}
var uv = g.attributes.uv;
for (var u = 0; u < p.count; u++)
uv.setXY(u, (p.getX(u) + p.getZ(u) * 0.6) / (r * 1.1) + 0.5, (p.getY(u) * 1.4 + p.getZ(u) * 0.4) / (r * 1.1) + 0.5);
g.translate(x, y, z);
list.push(g.index ? g.toNonIndexed() : g);
},
function (list, a, b, sag, r, seed) {
var R = wRand(seed), pts = [], n = 7;
for (var i = 0; i <= n; i++) {
var t = i / n, s = Math.sin(t * Math.PI) * sag;
pts.push(new THREE.Vector3(a[0] + (b[0] - a[0]) * t + (R() - 0.5) * 0.4, a[1] + (b[1] - a[1]) * t - s, a[2] + (b[2] - a[2]) * t + (R() - 0.5) * 0.4));
}
var c = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 14, r, 4, false);
list.push(c.index ? c.toNonIndexed() : c);
},
function (k, v) {
var key = "tzj" + k + v;
if (TZW_GEO[key])
return TZW_GEO[key];
var lite = tzwLite(), R = wRand(101 + v * 37 + (k === "giant" ? 0 : k === "canopy" ? 500 : 900)), bark = [], leaf = [], dark = [];
if (k === "giant") {
var H = 38 + v * 3, tr = 1.25 + v * 0.12, lean = (R() - 0.5) * 1.2;
tzjLimb(bark, [0, 0, 0], [lean * 0.3, H * 0.55, 0], tr, tr * 0.78, lite ? 7 : 11);
tzjLimb(bark, [lean * 0.3, H * 0.55, 0], [lean, H * 0.8, 0], tr * 0.78, tr * 0.55, lite ? 6 : 9);
for (var b = 0; b < (lite ? 4 : 6); b++) {
var a = b / (lite ? 4 : 6) * Math.PI * 2 + R() * 0.5, ex = tr * (3.2 + R() * 1.6), hb = tr * (3.6 + R() * 2.2);
var s = new THREE.Shape();
s.moveTo(0, 0);
s.lineTo(ex, 0);
s.quadraticCurveTo(tr * 0.9, hb * 0.25, 0, hb);
s.lineTo(0, 0);
var f = new THREE.ExtrudeGeometry(s, { depth: 0.28, bevelEnabled: false, curveSegments: lite ? 3 : 6 });
f.translate(tr * 0.55, 0, -0.14);
f.rotateY(-a);
bark.push(f.index ? f.toNonIndexed() : f);
}
var nl = lite ? 5 : 7, ends = [];
for (var l = 0; l < nl; l++) {
var a2 = l / nl * Math.PI * 2 + R() * 0.6, y0 = H * (0.62 + R() * 0.16), out = 8 + R() * 6, up = H * (0.16 + R() * 0.1);
var p0 = [lean * 0.6, y0, 0], p1 = [p0[0] + Math.cos(a2) * out * 0.6, y0 + up * 0.7, Math.sin(a2) * out * 0.6];
tzjLimb(bark, p0, p1, tr * 0.42, tr * 0.24, lite ? 5 : 7);
for (var s2 = 0; s2 < (lite ? 2 : 3); s2++) {
var a3 = a2 + (s2 - 1) * 0.5 + (R() - 0.5) * 0.3, o2 = out * (0.9 + R() * 0.4), e = [p0[0] + Math.cos(a3) * o2, p1[1] + up * (0.3 + R() * 0.6), Math.sin(a3) * o2];
tzjLimb(bark, p1, e, tr * 0.2, tr * 0.07, 5);
ends.push(e);
}
if (!lite || l % 2 === 0) {
var hang = [p1[0] + (R() - 0.5) * 2, p1[1] - 0.5, p1[2] + (R() - 0.5) * 2];
tzjLiana(bark, hang, [hang[0] * 1.6 + (R() - 0.5) * 4, 0.2, hang[2] * 1.6 + (R() - 0.5) * 4], 2.5 + R() * 3, 0.07 + R() * 0.05, v * 50 + l);
}
if (!lite && l % 2 === 1) {
var e1 = ends[ends.length - 1], e2 = ends[Math.max(0, ends.length - 4)];
tzjLiana(bark, [e1[0] * 0.7, e1[1] - 2, e1[2] * 0.7], [e2[0] * 0.7, e2[1] - 2, e2[2] * 0.7], 4 + R() * 3, 0.05, v * 70 + l);
}
}
ends.push([lean, H * 0.95, 0]);
ends.forEach(function (e, i) {
var r = 4.0 + R() * 2.0;
tzjClump(leaf, r, e[0], e[1], e[2], v * 100 + i, 0.55, lite ? 0 : 1);
if (!lite)
tzjClump(dark, r * 0.8, e[0] * 0.92 + (R() - 0.5) * 2, e[1] - r * 0.45, e[2] * 0.92 + (R() - 0.5) * 2, v * 100 + i + 50, 0.5, 1);
if (!lite)
tzjClump(leaf, r * 0.75, e[0] * 1.12 + (R() - 0.5) * 2, e[1] + r * 0.3, e[2] * 1.12 + (R() - 0.5) * 2, v * 100 + i + 90, 0.55, 1);
if (!lite && i % 2 === 0)
tzjClump(leaf, r * 0.7, e[0] * 0.6, e[1] - r * 0.2, e[2] * 0.6, v * 100 + i + 130, 0.55, 1);
});
}
else if (k === "canopy") {
var H2 = 18 + v * 3.5, tr2 = 0.45 + v * 0.08;
tzjLimb(bark, [0, 0, 0], [0, H2 * 0.62, 0], tr2 * 1.3, tr2 * 0.85, lite ? 6 : 9);
for (var r0 = 0; r0 < (lite ? 3 : 5); r0++) {
var ar = r0 / (lite ? 3 : 5) * Math.PI * 2 + R();
tzjLimb(bark, [Math.cos(ar) * tr2 * 0.5, 1.1, Math.sin(ar) * tr2 * 0.5], [Math.cos(ar) * tr2 * 2.6, -0.1, Math.sin(ar) * tr2 * 2.6], tr2 * 0.5, tr2 * 0.15, 5);
}
var nl2 = lite ? 4 : 5, en2 = [];
for (var l2 = 0; l2 < nl2; l2++) {
var a4 = l2 / nl2 * Math.PI * 2 + R() * 0.7, ou = 4.5 + R() * 3.5, p02 = [0, H2 * (0.55 + R() * 0.12), 0], p12 = [Math.cos(a4) * ou, H2 * (0.82 + R() * 0.1), Math.sin(a4) * ou];
tzjLimb(bark, p02, p12, tr2 * 0.55, tr2 * 0.2, lite ? 5 : 6);
en2.push(p12);
if (!lite) {
var a5 = a4 + 0.6, p22 = [Math.cos(a5) * ou * 0.6, H2 * 0.92, Math.sin(a5) * ou * 0.6];
tzjLimb(bark, p02, p22, tr2 * 0.4, tr2 * 0.15, 5);
en2.push(p22);
}
if (!lite && l2 % 2 === 0)
tzjLiana(bark, [p12[0] * 0.8, p12[1] - 0.4, p12[2] * 0.8], [p12[0] * 1.2 + (R() - 0.5) * 3, 0.2, p12[2] * 1.2 + (R() - 0.5) * 3], 1.5 + R() * 2, 0.045, v * 30 + l2);
}
en2.push([0, H2, 0]);
en2.forEach(function (e, i) { var r = 3.1 + R() * 1.5; tzjClump(leaf, r, e[0], e[1], e[2], v * 200 + i, 0.5, lite ? 0 : 1); if (!lite && i % 2 === 0)
tzjClump(dark, r * 0.85, e[0] * 0.8, e[1] - r * 0.4, e[2] * 0.8, v * 200 + i + 40, 0.5, 1); });
}
else {
var H3 = 7 + v * 2, tr3 = 0.16 + v * 0.04;
tzjLimb(bark, [0, 0, 0], [(R() - 0.5) * 0.8, H3 * 0.7, (R() - 0.5) * 0.8], tr3, tr3 * 0.6, lite ? 5 : 6);
for (var c3 = 0; c3 < (lite ? 3 : 6); c3++) {
var a6 = R() * Math.PI * 2, d6 = R() * 1.8;
tzjClump(leaf, 1.6 + R() * 1.0, Math.cos(a6) * d6, H3 * (0.6 + R() * 0.35), Math.sin(a6) * d6, v * 300 + c3, 0.7, lite ? 0 : 1);
}
}
return (TZW_GEO[key] = { bark: gwMerge(bark), leaf: gwMerge(leaf), dark: dark.length ? gwMerge(dark) : null });
},
function () {
var key = "tzjOilPalm";
if (TZW_GEO[key])
return TZW_GEO[key];
var lite = tzwLite(), trunk = [], frond;
var t = new THREE.CylinderGeometry(0.38, 0.48, 7, lite ? 6 : 9, 6);
var pa = t.attributes.position;
for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i);
var bump = 1 + 0.12 * Math.abs(Math.sin(y * 5.3 + Math.atan2(pa.getZ(i), pa.getX(i)) * 3));
pa.setX(i, pa.getX(i) * bump);
pa.setZ(i, pa.getZ(i) * bump);
}
t.translate(0, 3.5, 0);
trunk.push(t.toNonIndexed());
frond = tzwFronds(lite ? 10 : 18, 4.6, 1.4, 0.75, 7.0, 0.9);
return (TZW_GEO[key] = { trunk: gwMerge(trunk), frond: frond });
},
function () {
return tzwCanvas("bananaleaf", 128, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = wRand(77);
x.fillStyle = "#4E8A2E";
x.beginPath();
x.moveTo(W / 2, H);
x.bezierCurveTo(W * 0.02, H * 0.8, W * 0.02, H * 0.2, W / 2, 0);
x.bezierCurveTo(W * 0.98, H * 0.2, W * 0.98, H * 0.8, W / 2, H);
x.fill();
x.strokeStyle = "#A8C860";
x.lineWidth = 3;
x.beginPath();
x.moveTo(W / 2, H);
x.lineTo(W / 2, 0);
x.stroke();
x.strokeStyle = "rgba(30,70,20,0.5)";
x.lineWidth = 1;
for (var y = 8; y < H; y += 5) {
x.beginPath();
x.moveTo(W / 2, y);
x.lineTo(4, y - 14);
x.moveTo(W / 2, y);
x.lineTo(W - 4, y - 14);
x.stroke();
}
x.globalCompositeOperation = "destination-out";
for (var k = 0; k < 9; k++) {
var ty = 20 + R() * (H - 40), side = R() < 0.5;
x.fillRect(side ? 0 : W / 2 + 6, ty, W / 2 - 6, 1.5 + R() * 1.5);
}
x.globalCompositeOperation = "source-over";
for (var s = 0; s < 400; s++) {
x.fillStyle = "rgba(20,40,10," + (R() * 0.15) + ")";
x.fillRect(R() * W, R() * H, 2, 2);
}
});
},
function () {
var key = "tzjBanana";
if (TZW_GEO[key])
return TZW_GEO[key];
var lite = tzwLite(), stem = [], leaves = [];
var st = new THREE.CylinderGeometry(0.12, 0.2, 3.2, 7);
st.translate(0, 1.6, 0);
stem.push(st.toNonIndexed());
for (var i = 0; i < (lite ? 5 : 8); i++) {
var p = new THREE.PlaneGeometry(0.9, 2.6, 1, 5), pa = p.attributes.position;
for (var j = 0; j < pa.count; j++) {
var y = pa.getY(j) + 1.3;
pa.setZ(j, -Math.pow(y / 2.6, 2) * 1.2);
pa.setY(j, y);
}
p.rotateX(-0.9 + (i % 3) * 0.25);
p.rotateY(i / (lite ? 5 : 8) * Math.PI * 2 + i * 0.4);
p.translate(0, 3.0 + (i % 2) * 0.3, 0);
leaves.push(p.toNonIndexed());
}
return (TZW_GEO[key] = { stem: gwMerge(stem), leaf: gwMerge(leaves) });
},
function () {
return tzwGeo("tzjFloor", function () {
var parts = [];
for (var i = 0; i < 6; i++) {
var p = new THREE.PlaneGeometry(0.55, 1.1, 1, 3), pa = p.attributes.position;
for (var j = 0; j < pa.count; j++) {
var y = pa.getY(j) + 0.55;
pa.setZ(j, -y * y * 0.35);
pa.setY(j, y);
}
p.rotateX(-0.7);
p.rotateY(i / 6 * Math.PI * 2);
p.translate(0, 0.25, 0);
parts.push(p.toNonIndexed());
}
return gwMerge(parts);
});
},
function () {
return TZW.mats.tzj || (TZW.mats.tzj = {
bark: tzwS("bark", 0x7A6A58, 2.2), leaf: tzwM("tzjLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x3E7A2C, map: tzwLeafTex(), alphaTest: 0.42, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }),
leaf2: tzwM("tzjLeaf2", function () { var m = new THREE.MeshLambertMaterial({ color: 0x5A8A34, map: tzwLeafTex(), alphaTest: 0.42, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }),
leaf3: tzwM("tzjLeaf3", function () { var m = new THREE.MeshLambertMaterial({ color: 0x2E5E26, map: tzwLeafTex(), alphaTest: 0.42, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }),
dark: tzwM("tzjDark", function () { var m = new THREE.MeshLambertMaterial({ color: 0x1E3E18, map: tzwLeafTex(), alphaTest: 0.42, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }),
palmT: tzwS("bark", 0x6A5A40, 1.4), frond: tzwLam(0xFFFFFF, { ds: 1, map: tzwFrondTex("palm"), mapk: "palm", cut: 0.5, e: 0x1E2C14 }), fern: tzwLam(0xFFFFFF, { ds: 1, map: tzwFrondTex("fern"), mapk: "fern", cut: 0.5, e: 0x142410 }),
banana: tzwLam(0xF4FAEC, { ds: 1, map: tzjBananaTex(), mapk: "bananaleaf", cut: 0.45, e: 0x2A3A1A }), bstem: tzwLam(0x3E4E26),
floor: tzwM("tzjFloorM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x3A6A2A, map: tzjBananaTex(), alphaTest: 0.45, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; })
});
},
function (P, kind, list, o) {
o = o || {};
if (!list || !list.length)
return;
var M = tzjMats(), lite = tzwLite(), cell = o.cell || 240;
if (kind === "giant" || kind === "canopy" || kind === "under") {
var by = [[], [], []];
list.forEach(function (t, i) { by[t.v != null ? t.v : i % 3].push(t); });
by.forEach(function (L, v) {
if (!L.length)
return;
var G = tzjTreeGeo(kind, v), lm = [M.leaf, M.leaf2, M.leaf3][v];
tzjChunks(L, cell).forEach(function (c) { tzjFar(tzwInst(P, G.bark, M.bark, c, { shadow: !lite && kind === "giant" }), c); tzjFar(tzwInst(P, G.leaf, lm, c, {}), c); if (G.dark)
tzjFar(tzwInst(P, G.dark, M.dark, c, {}), c); });
});
if (o.solid !== false && kind !== "under")
list.forEach(function (t) { tzwRound(t.x, t.z, (kind === "giant" ? 1.6 : 0.6) * (t.s || 1)); });
return;
}
if (kind === "oilpalm") {
var Gp = tzjPalmGeo();
tzjChunks(list, cell).forEach(function (c) { tzjFar(tzwInst(P, Gp.trunk, M.palmT, c, {}), c); tzjFar(tzwInst(P, Gp.frond, M.frond, c, {}), c); });
return;
}
if (kind === "banana") {
var Gb = tzjBananaGeo();
tzjChunks(list, cell).forEach(function (c) { tzjFar(tzwInst(P, Gb.stem, M.bstem, c, {}), c); tzjFar(tzwInst(P, Gb.leaf, M.banana, c, {}), c); });
return;
}
if (kind === "lowfern") {
tzjChunks(list, cell).forEach(function (c) { tzjFar(tzwInst(P, tzjFernGeo(), M.fern, c, {}), c); });
return;
}
if (kind === "floor") {
tzjChunks(list, cell).forEach(function (c) { tzjFar(tzwInst(P, tzjFloorGeo(), M.floor, c, {}), c); });
return;
}
},
function (v) {
var key = "tzjShrub" + v;
if (TZW_GEO[key])
return TZW_GEO[key];
var R = wRand(611 + v * 53), stem = [], leaf = [], n = 3 + v;
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = R() * 0.5, h = 0.5 + R() * (0.7 + v * 0.35);
tzjLimb(stem, [0, 0, 0], [Math.cos(a) * d, h, Math.sin(a) * d], 0.04, 0.025, 5);
tzjClump(leaf, 0.38 + R() * 0.32, Math.cos(a) * d, h + 0.1, Math.sin(a) * d, 700 + v * 31 + i, 0.7, 1);
}
return (TZW_GEO[key] = { stem: gwMerge(stem), leaf: gwMerge(leaf) });
},
function (P, ok, H) {
var lite = tzwLite(), M = tzjMats(), cap = lite ? 1100 : 7000, Gb = tzjBananaGeo(), Gp = tzjPalmGeo(), S0 = tzjShrubGeo(0), S1 = tzjShrubGeo(1);
var mk = function (g, m) { var im = new THREE.InstancedMesh(g, m, cap); im.count = 0; im.frustumCulled = false; im.castShadow = false; im.receiveShadow = true; P.add(im); return im; };
TZW.near = { ok: ok, H: H, R: lite ? 26 : 50, cell: lite ? 3.0 : 1.9, at: null,
K: [{ w: 0.34, m: [mk(tzjFernGeo(), M.fern)], s: [0.7, 1.8] },
{ w: 0.24, m: [mk(tzjFloorGeo(), M.floor)], s: [0.9, 2.0] },
{ w: 0.18, m: [mk(S0.stem, M.bark), mk(S0.leaf, M.leaf3)], s: [0.8, 1.5] },
{ w: 0.14, m: [mk(S1.stem, M.bark), mk(S1.leaf, M.dark)], s: [0.9, 1.7] },
{ w: 0.10, m: [mk(Gp.trunk, M.palmT), mk(Gp.frond, M.frond)], s: [0.12, 0.24] }] };
},
function (L) {
var N = TZW.near;
if (!N)
return;
var on = !TZW.inRm && TZW.sc === "coast";
N.K.forEach(function (k) { k.m.forEach(function (m) { m.visible = on; }); });
if (!on)
return;
if (N.at && Math.hypot(L.x - N.at[0], L.z - N.at[1]) < 5)
return;
N.at = [L.x, L.z];
var d = new THREE.Object3D(), c = N.cell, R = N.R, n = N.K.map(function () { return 0; }), cap = N.K[0].m[0].instanceMatrix.count;
var x0 = Math.floor((L.x - R) / c), x1 = Math.floor((L.x + R) / c), z0 = Math.floor((L.z - R) / c), z1 = Math.floor((L.z + R) / c);
var hs = function (a, b, k) { var h = Math.sin(a * 127.1 + b * 311.7 + k * 74.7) * 43758.5453; return h - Math.floor(h); };
for (var i = x0; i <= x1; i++)
for (var j = z0; j <= z1; j++) {
var r1 = hs(i, j, 0), r2 = hs(i, j, 1), r3 = hs(i, j, 2), r4 = hs(i, j, 3);
var x = (i + r2) * c, z = (j + r3) * c, dd = Math.hypot(x - L.x, z - L.z);
if (dd > R)
continue;
if (!N.ok(x, z))
continue;
var ki = 0, acc = N.K[0].w;
while (ki < N.K.length - 1 && r4 >= acc) {
ki++;
acc += N.K[ki].w;
}
var K = N.K[ki];
if (n[ki] >= cap)
continue;
var s = K.s[0] + r1 * (K.s[1] - K.s[0]);
d.position.set(x, N.H(x, z) - 0.05, z);
d.rotation.set((r2 - 0.5) * 0.12, r1 * 6.283, (r3 - 0.5) * 0.12);
d.scale.set(s, s * (0.85 + r2 * 0.3), s);
d.updateMatrix();
K.m.forEach(function (m) { m.setMatrixAt(n[ki], d.matrix); });
n[ki]++;
}
N.K.forEach(function (K, ki) { K.m.forEach(function (m) { m.count = n[ki]; m.instanceMatrix.needsUpdate = true; }); });
},
function (x, z) {
var C = TZW_CO, cx = tzwCoastX(z), n = tzwFbm(x * 0.006, z * 0.006, 4), h;
var inl = x - cx;
h = 1.4 + Math.max(0, inl - 40) * 0.028 + n * 9 * tzwSmooth(20, 200, inl) + tzwFbm(x * 0.002 + 7, z * 0.002, 3) * 14 * tzwSmooth(150, 600, inl);
if (inl < 60) {
var t = tzwSmooth(-6, 60, inl);
h = (-1.6 + (inl + 6) * 0.04) * (1 - t) + h * t;
if (inl < 0)
h = Math.min(h, -1.4 + inl * 0.05);
}
var hd = Math.hypot(x - C.harb[0], z - C.harb[1]), md = tzwPathD(x, z, [[C.harb[0], C.harb[1]], [C.harb[0] - 110, C.harb[1] + 6]]);
var bas = Math.min(hd / 52, md / 15);
if (bas < 1.35) {
var t2 = tzwSmooth(0.82, 1.35, bas);
h = h * t2 + (-3.2) * (1 - t2);
}
var cd = Math.hypot(x - C.cabin[0], z - C.cabin[1]);
if (cd < 34) {
var t3 = tzwSmooth(16, 34, cd);
h = h * t3 + 3.4 * (1 - t3);
}
if (typeof TZW_CO_STREAM !== "undefined" && x < -220 && x > -420 && z > 20 && z < 80) {
var sd = tzwPathD(x, z, TZW_CO_STREAM);
if (sd < 4)
h -= (1 - sd / 4) * (1 - sd / 4) * 0.7;
}
var ad = Math.hypot(x - C.amph[0], z - C.amph[1]), ah = tzwAmphY();
if (ad < 40) {
var t4 = tzwSmooth(22, 40, ad);
h = h * t4 + (ah + (ad > 20 ? Math.min(1.6, (ad - 20) * 0.4) : 0)) * (1 - t4);
}
var wd = Math.hypot(x - C.hole[0], z - C.hole[1]);
if (wd < 30) {
var hy = tzwHoleY(), t5 = tzwSmooth(12, 30, wd);
h = h * t5 + (hy - 1.4 + wd * 0.08) * (1 - t5);
}
var vd = Math.hypot(x - C.vil[0], z - C.vil[1]);
if (vd < 130) {
var vy = tzwVilY(), t7 = tzwSmooth(60, 130, vd);
h = h * t7 + (vy + (vd > 60 ? (vd - 60) * 0.02 : 0) + tzwFbm(x * 0.03, z * 0.03, 2) * 0.4) * (1 - t7);
}
var rd = tzwPathD(x, z, TZW_RIVER), ry = tzwRiverY(x), rw = tzwRiverW(x) / 2;
if (rd < rw + 110) {
var vf = ry + 1.6 + Math.max(0, rd - rw) * 0.05, t6 = 1 - (1 - tzwSmooth(rw + 10, rw + 110, rd)) * tzwSmooth(-10, 30, inl);
h = h * t6 + vf * (1 - t6);
if (rd < rw + 2)
h = Math.min(h, ry - 0.4 - 2.2 * (1 - rd / (rw + 2)));
}
return h;
},
function (G) {
var X = TZW_ROOMXZ.coast, R, st = TZW.st, lite = tzwLite();
R = tzwRoom(G, "cabin", X.cabin[0], X.cabin[1], 7.4, 6, { wall: "logs", floor: "planks", ceil: "logs", name: "the cabin", beams: true, lightI: 0.7, bare: 1 });
tzwHearth(R.g, -2.4, -2.75, 0, { h: R.h, mat: "stone" });
tzwTable(R.g, 0.6, 0.2, 1.6, 0.9, 0.76, { mat: "planks" });
[[-0.1, 0.95], [1.3, 0.95], [0.6, -0.6]].forEach(function (p, i) { var s = new THREE.Group(); s.position.set(p[0], 0, p[1]); R.g.add(s); tzwCyl(s, 0.2, 0.22, 0.46, tzwMat("oak"), 0, 0, 0, 8); });
tzwShelves(R.g, 3.45, -1.2, 2.2, 2.0, -Math.PI / 2, { books: 1 });
tzwBed(R.g, -2.6, 1.6, Math.PI / 2, { cover: 0x8A7A5A, mat: "planks" });
var cr = new THREE.Group();
cr.position.set(-0.6, 0, 2.4);
R.g.add(cr);
tzwBox(cr, 1.0, 0.5, 0.6, tzwMat("planks"), 0, 0.12, 0);
[-0.4, 0.4].forEach(function (x) { var rk = new THREE.Mesh(tzwGeo("tzRocker", function () { return new THREE.TorusGeometry(0.4, 0.035, 5, 14, Math.PI * 0.6); }), tzwMat("oak")); rk.rotation.set(0, Math.PI / 2, Math.PI * 1.2); rk.position.set(x, 0.3, 0); cr.add(rk); });
tzwBox(cr, 0.9, 0.06, 0.5, tzwLam(0xEAE2D0), 0, 0.6, 0);
for (var rf = 0; rf < 2; rf++) {
var rg = new THREE.Group();
rg.position.set(1.4 + rf * 0.9, 1.6, -2.86);
rg.rotation.z = 0.06;
R.g.add(rg);
tzwBox(rg, 1.2, 0.05, 0.05, tzwLam(0x1E1E22), 0, 0, 0);
tzwBox(rg, 0.35, 0.07, 0.06, tzwMat("darkoak"), -0.55, -0.02, 0);
[-0.4, 0.3].forEach(function (x) { tzwBox(R.g, 0.05, 0.05, 0.12, tzwMat("oak"), 1.4 + rf * 0.9 + x, 1.55 + 0.04, -2.92); });
}
tzwBox(R.g, 0.5, 0.28, 0.32, tzwLam(0x5A6A4A), 2.6, 0.02, 2.2);
tzwWindowIn(R.g, 1.6, 1.4, 2.88, Math.PI, 1.0, 0.9, { sky: 0x9AC0A0 });
for (var b = 0; b < 4; b++)
tzwBox(R.g, 0.06, 0.9, 0.08, tzwMat("oak"), 1.25 + b * 0.24, 1.4, 2.86);
if (!lite) {
tzwCandle(R.g, 0.3, 0.76, 0.0, {});
tzwBox(R.g, 0.28, 0.04, 0.2, tzwLam(0x2A3A5A), 1.0, 0.76, 0.2);
tzwBox(R.g, 0.22, 0.04, 0.3, tzwLam(0x7A2A1A), 0.7, 0.8, -0.1);
}
tzwRug(R.g, 0.4, 1.4, 2.2, 1.4, 0xB88A4A);
tzwRug(R.g, -1.2, -1.2, 1.8, 1.1, 0xC89A4A);
[[0.95, 0.76, 0.45], [3.2, 0.0, 2.5], [-3.2, 0.0, -0.2]].forEach(function (q, i) { var vg = new THREE.Group(); vg.position.set(q[0], q[1], q[2]); R.g.add(vg); tzwPot(vg, 0, 0, 0, 0.22 + i * 0.04); if (!lite)
[0, 1, 2].forEach(function (f) { var fl = new THREE.Mesh(tzwGeo("tzFlower", function () { return new THREE.IcosahedronGeometry(0.06, 0); }), tzwLam([0xE83A3A, 0xF0C030, 0xF0F0E8][(i + f) % 3], { e: 0x200808 })); fl.position.set(Math.cos(f * 2.1) * 0.06, 0.38 + f * 0.05, Math.sin(f * 2.1) * 0.06); vg.add(fl); }); });
for (var gc = 0; gc < 12; gc++)
tzwBox(R.g, 0.08, 1.0, 0.02, tzwLam(0xB8A868), 1.18 + gc * 0.075, 1.36, 2.8);
if (st.bones) {
tzwBox(R.g, 0.8, 0.22, 1.7, tzwLam(0xC8C0A8), -2.6, 0.62, 1.6);
var sh = new THREE.Mesh(tzwGeo("tzShroud", function () { var g = new THREE.SphereGeometry(0.5, 10, 6); g.scale(0.9, 0.35, 1.8); return g; }), tzwLam(0xD8D0B8));
sh.position.set(-2.6, 0.86, 1.6);
R.g.add(sh);
var sh2 = new THREE.Mesh(tzwGeo("tzShroud2", function () { var g = new THREE.SphereGeometry(0.5, 10, 6); g.scale(0.8, 0.5, 1.0); return g; }), tzwLam(0xB8B0A0));
sh2.position.set(0.6, 0.12, 1.2);
R.g.add(sh2);
}
tzwSpot(X.cabin[0] + 3.1, X.cabin[1] - 1.2, 1.6, "The books on the shelf", "look at", function () { tzwBookshelf(); }, TZW_RY);
R = tzwRoom(G, "mbonga", X.mbonga[0], X.mbonga[1], 7, 7, { wall: "mud", floor: "clay", ceil: "thatch", name: "the chief's house", bare: 1, lightI: 0.6, lightCol: 0xFFB878 });
tzwBox(R.g, 2.6, 0.4, 1.6, tzwMat("oak"), 0, 0, -2.4);
tzwRug(R.g, 0, -2.4, 2.4, 1.4, 0x8A4A2A);
for (var p2 = 0; p2 < 5; p2++)
tzwPot(R.g, -3.0 + p2 * 0.3, 0, -3.0, 0.3 + (p2 % 2) * 0.1);
tzwBox(R.g, 0.12, 2.0, 0.12, tzwMat("darkbark"), -2.6, 0, 2.0);
tzwSpearRack(R.g, 2.4, -2.8, 0);
R = tzwRoom(G, "hut", X.hut[0], X.hut[1], 6, 6, { wall: "mud", floor: "clay", ceil: "thatch", name: "a house of the village", bare: 1, lightI: 0.5, lightCol: 0xFFB878 });
tzwBox(R.g, 1.8, 0.3, 1.0, tzwMat("oak"), -1.6, 0, -2.0);
tzwRug(R.g, -1.6, -2.0, 1.8, 1.0, 0xC89A4A);
for (var p3 = 0; p3 < 4; p3++)
tzwPot(R.g, 1.6 + p3 * 0.35, 0, -2.4, 0.25 + (p3 % 2) * 0.1);
tzwFire(R.g, 0.6, 0, 0.6, 0.5);
R = tzwRoom(G, "cook", X.cook[0], X.cook[1], 7, 6, { wall: "mud", floor: "clay", ceil: "thatch", name: "the cooking-house", bare: 1, light: false });
tzwFire(R.g, 0, 0, -0.6, 0.8);
for (var p4 = 0; p4 < 7; p4++)
tzwPot(R.g, -2.8 + p4 * 0.8, 0, -2.5, 0.3 + (p4 % 3) * 0.08);
tzwMortar(R.g, 2.2, 1.6);
R = tzwRoom(G, "wardroom", X.wardroom[0], X.wardroom[1], 9, 6, { wall: "oak", floor: "planks", name: "the cruiser's wardroom", beams: true, lightI: 0.8 });
tzwTable(R.g, 0, 0, 4.6, 1.2, 0.76, { mat: "darkoak" });
for (var c = 0; c < 4; c++) {
tzwChair(R.g, -1.8 + c * 1.2, -0.9, 0, {});
tzwChair(R.g, -1.8 + c * 1.2, 0.9, Math.PI, {});
}
tzwWindowIn(R.g, -3, 1.6, -2.88, 0, 0.6, 0.6, { sky: 0x6A9AC8 });
tzwWindowIn(R.g, 3, 1.6, -2.88, 0, 0.6, 0.6, { sky: 0x6A9AC8 });
tzwPicture(R.g, 0, 1.8, -2.86, 0, 1.2, 0.8, function (x, W, H) { x.fillStyle = "#1E2A5A"; x.fillRect(0, 0, W / 3, H); x.fillStyle = "#F4F2EC"; x.fillRect(W / 3, 0, W / 3, H); x.fillStyle = "#C82A2A"; x.fillRect(2 * W / 3, 0, W / 3, H); });
R = tzwRoom(G, "arrowcabin", X.arrowcabin[0], X.arrowcabin[1], 7, 5, { wall: "oak", floor: "planks", name: "the Arrow's after-cabin", beams: true, lightI: 0.7 });
tzwTable(R.g, 0, 0, 2.2, 1.0, 0.76, { mat: "darkoak" });
tzwChair(R.g, -0.8, 0.8, Math.PI, {});
tzwChair(R.g, 0.8, 0.8, Math.PI, {});
tzwShelves(R.g, -3.2, -1, 1.6, 1.8, Math.PI / 2, { books: 1 });
tzwWindowIn(R.g, 0, 1.6, -2.38, 0, 0.5, 0.5, { sky: 0x6A9AC8 });
R = tzwRoom(G, "mission", X.mission[0], X.mission[1], 10, 7, { wall: "plaster", floor: "planks", name: "the mission house", beams: true, lightI: 0.85, lightCol: 0xFFE8C8 });
tzwTable(R.g, 0, -0.6, 3.6, 1.1, 0.76, { mat: "oak" });
for (var mc = 0; mc < 3; mc++) {
tzwChair(R.g, -1.2 + mc * 1.2, -1.4, 0, {});
tzwChair(R.g, -1.2 + mc * 1.2, 0.2, Math.PI, {});
}
tzwShelves(R.g, -4.8, -1.6, 1.8, 2.0, Math.PI / 2, { books: 1 });
tzwBed(R.g, 3.4, 2.0, Math.PI / 2);
tzwBed(R.g, 3.4, -0.4, Math.PI / 2);
tzwBox(R.g, 0.08, 0.9, 0.06, tzwMat("darkoak"), 0, 1.5, -3.38);
tzwBox(R.g, 0.5, 0.08, 0.06, tzwMat("darkoak"), 0, 2.1, -3.38);
tzwBox(R.g, 1.0, 0.75, 0.6, tzwMat("oak"), -3.2, 0, 2.6);
tzwBox(R.g, 0.9, 0.06, 0.5, tzwLam(0xF4F2EC), -3.2, 0.76, 2.6);
tzwWindowIn(R.g, -2, 1.6, -3.38, 0, 0.8, 0.9, { sky: 0x9AC0D8 });
tzwWindowIn(R.g, 2, 1.6, -3.38, 0, 0.8, 0.9, { sky: 0x9AC0D8 });
tzwRug(R.g, 0, -0.6, 4.4, 2.4, 0xA86A3A);
},
function (G, H) {
var C = TZW_PORT, lite = tzwLite(), R = wRand(888);
var hx = C[0] + 18, hz = C[1] + 8;
tzwTownHouse(G, hx, hz, 12, 8, 6.4, { y: H(hx, hz), ry: -Math.PI / 2, wall: "render", roof: "tile", shut: 0x2A5A4A });
var vy = H(hx, hz);
tzwBox(G, 12.4, 0.25, 3.2, tzwMat("planks"), hx - 5.6, vy + 0.3, hz, Math.PI / 2);
for (var vp = 0; vp < 6; vp++)
tzwCyl(G, 0.1, 0.1, 3.2, tzwMat("oak"), hx - 7.1, vy + 0.3, hz - 5.6 + vp * 2.24, 6);
tzwBox(G, 12.8, 0.14, 3.6, tzwMat("tile"), hx - 5.7, vy + 3.5, hz, Math.PI / 2);
tzwBox(G, 4, 0.4, 1.6, tzwMat("oak"), hx - 4.4, vy + 0.3, hz + 4.2, Math.PI / 2);
var tg = new THREE.Group();
tg.position.y = vy + 0.55;
G.add(tg);
for (var t = 0; t < 3; t++) {
tzwTable(tg, hx - 5.0, hz - 3 + t * 2.6, 0.9, 0.9, 0.75, { mat: "oak" });
tzwChair(tg, hx - 4.2, hz - 3 + t * 2.6, -Math.PI / 2, {});
}
tzwSign(G, "HÔTEL DE LA CÔTE", 4, 0.7, hx - 6.05, vy + 4.4, hz, -Math.PI / 2, {});
var HR = TZW.rooms.filter(function (r) { return r.key === "hotel"; })[0];
if (HR)
tzwDoor(HR, "The door of the Hôtel de la Côte", hx - 7.6, hz, -Math.PI / 2);
[[C[0] + 30, C[1] - 10, 7, 6, 4], [C[0] + 32, C[1] + 22, 8, 6, 4.4], [C[0] + 44, C[1] + 6, 6, 6, 3.8], [C[0] + 46, C[1] - 14, 9, 7, 4.2]].forEach(function (q, i) { tzwTownHouse(G, q[0], q[1], q[2], q[3], q[4], { y: H(q[0], q[1]), ry: -Math.PI / 2, wall: "render", roof: i % 2 ? "tile" : "slate", shut: [0x4A6A4A, 0x6A4A2A, 0x3A4A6A, 0x5A5A3A][i] }); });
var sx = C[0] + 62, sz = C[1] + 2;
tzwBox(G, 6, 3, 5, tzwMat("planks"), sx, H(sx, sz), sz);
tzwBox(G, 6.4, 0.2, 5.4, tzwMat("tile"), sx, H(sx, sz) + 3, sz);
var jz = C[1] - 4, jx0 = tzwCoastX(jz) + 8;
for (var j = 0; j < 10; j++) {
var jx = jx0 - j * 3;
tzwBox(G, 3.0, 0.2, 2.4, tzwMat("planks"), jx, 0.6, jz);
[-1, 1].forEach(function (sd) { tzwCyl(G, 0.12, 0.12, 3.2, tzwMat("darkbark"), jx, -2.4, jz + sd * 1.1, 6); });
}
var tub = tzwSailShip(G, jx0 - 38, jz - 14, 0.0, { kind: "brig", furled: true, flag: "fra", hull: 0x3A3028, band: 0x6A2A1A, sails: 0xC8BCA4 });
if (tub)
tub.userData.name = "tub";
for (var c = 0; c < (lite ? 3 : 6); c++) {
tzwCanoe(G, tzwCoastX(jz + 8 + c * 4) + 4, 0.2, jz + 8 + c * 4, 0.3 + c * 0.4, 5 + (c % 2));
}
tzwFire(G, C[0] + 38, H(C[0] + 38, C[1] - 2), C[1] - 2, 0.4);
tzwStrip(G, [[jx0 + 2, jz], [C[0] + 10, C[1] - 3], [C[0] + 24, C[1] - 2], [C[0] + 40, C[1] - 3], [C[0] + 58, C[1] + 1]], 6, H, tzwMat("trail"), 0.07);
tzwStrip(G, [[C[0] + 10, C[1] - 3], [C[0] + 11, C[1] + 8]], 3.4, H, tzwMat("trail"), 0.075);
var aw = [0xB83A22, 0xE0B040, 0x3A6A8A, 0xE8E0D0, 0x6A8A3A];
for (var m = 0; m < (lite ? 3 : 5); m++) {
var mx = C[0] + 16 + m * 4.4, mz = C[1] - 9, my = H(mx, mz), st = new THREE.Group();
st.position.set(mx, my, mz);
st.rotation.y = (R() - 0.5) * 0.2;
G.add(st);
[[-1.6, -1.1], [1.6, -1.1], [-1.6, 1.1], [1.6, 1.1]].forEach(function (q) { tzwCyl(st, 0.05, 0.05, q[1] < 0 ? 2.5 : 2.1, tzwMat("darkbark"), q[0], 0, q[1], 5); });
var a = tzwBox(st, 3.6, 0.05, 2.8, tzwLam(aw[m % aw.length], { ds: 1 }), 0, 2.25, 0);
a.rotation.x = 0.14;
tzwBox(st, 2.8, 0.08, 1.1, tzwMat("planks"), 0, 0.8, 0.3);
[-1.2, 1.2].forEach(function (lx) { tzwBox(st, 0.1, 0.8, 0.9, tzwMat("darkoak"), lx, 0, 0.3); });
for (var k = 0; k < 4; k++) {
if (m % 2)
tzwPot(st, -0.9 + k * 0.6, 0.88, 0.3, 0.32 + R() * 0.1);
else
tzwBox(st, 0.42, 0.18, 0.32, tzwLam([0xE8C040, 0x8AA83A, 0xC8642A, 0xA83A2A][k]), -0.9 + k * 0.6, 0.88, 0.3);
}
}
[[C[0] + 56, C[1] - 4], [C[0] + 4, C[1] - 8], [C[0] + 66, C[1] + 7]].forEach(function (q, qi) {
for (var b = 0; b < (lite ? 3 : 6); b++) {
var bx = q[0] + (b % 3) * 0.9, bz = q[1] + Math.floor(b / 3) * 0.9;
if ((b + qi) % 2)
tzwCyl(G, 0.36, 0.4, 0.95, tzwMat("darkoak"), bx, H(bx, bz), bz, 10);
else
tzwBox(G, 0.8, 0.7, 0.8, tzwMat("planks"), bx, H(bx, bz), bz, R());
}
});
var pl = [];
for (var t2 = 0; t2 < (lite ? 6 : 14); t2++) {
var px = C[0] + 6 + R() * 60, pz = C[1] - 24 + R() * 52;
if (Math.abs(pz - C[1] + 2) < 5 || Math.abs(pz - C[1] + 9) < 3)
continue;
pl.push({ x: px, z: pz, y: H(px, pz), s: 0.8 + R() * 0.4, ry: R() * 6 });
}
tzjPlant(G, "palm", pl);
tzjPlant(G, "tree", [{ x: C[0] + 4, z: C[1] + 14, y: H(C[0] + 4, C[1] + 14), s: 1.3, ry: 1 }]);
tzjPlant(G, "bush", tzwScatter(889, lite ? 20 : 50, C[0] - 4, C[1] - 26, C[0] + 70, C[1] + 30, function (x, z) { return Math.abs(z - C[1] + 2) > 5 && Math.abs(z - C[1] + 9) > 3; }, H, 0.5, 0.9));
if (!st0())
tzwCrowd("port", [["A trader weighing ivory", "m", "gent", "Ivory, rubber, palm oil. And cloth and wire and salt going up the river.", TZP.portman], ["A fisherman mending nets", "m", "tzvillm", "The sea was kind this morning. Look: a whole basket.", TZP.mission],
["A woman selling plantains", "f", "tzvillf", "Ripe today. Tomorrow too ripe. Buy now.", TZP.mission], ["A clerk of the customs house", "m", "gent", "Every bale, every barrel, written in the book, monsieur.", TZP.portman],
["A sailor off the steamer", "m", "tzfrsail", "Three days here, then on down the coast. Nothing to do but drink and wait.", TZP.portman], ["A boy carrying fish", "m", "tzvillc", "For the hotel kitchen! Make way!", TZP.mission, true],
["A woman with a basket of cloth", "f", "tzvillf", "Cloth from Manchester, cloth from Lyons. Mine is better, I wove it.", TZP.mission], ["A boatman resting", "m", "tzvillm", "Tomorrow I take the doctor up the river. Ten days.", TZP.mission]], C[0] + 4, C[1] - 16, C[0] + 60, C[1] + 4, { wander: 4, skin: [0x4A2C1C, 0x5A3422, 0x3E2418, 0xE8C0A0, 0xD8A884], ok: function (x, z) { return Math.abs(z - C[1] + 3) < 8; } });
function st0() { return !!TZW.st.portEmpty; }
},
function (G, H) {
var C = TZW_MISSION, lite = tzwLite(), R = wRand(777), pr = 30, my = H(C[0], C[1]);
var stakes = [];
for (var a = 0; a < Math.PI * 2; a += lite ? 0.06 : 0.03) {
if (Math.abs(a - Math.PI / 2) < 0.09)
continue;
var px = C[0] + Math.sin(a) * pr, pz = C[1] + Math.cos(a) * pr;
stakes.push({ x: px, z: pz, y: H(px, pz) - 0.3, s: 0.9 + R() * 0.2, ry: R() * 6 });
}
tzwInst(G, tzwGeo("tzStake", function () { var c = new THREE.CylinderGeometry(0.11, 0.13, 3.6, 6); c.translate(0, 1.8, 0); var t = new THREE.ConeGeometry(0.11, 0.35, 6); t.translate(0, 3.77, 0); return gwMerge([c.toNonIndexed(), t.toNonIndexed()]); }), tzwMat("darkbark"), stakes, {});
for (var s = 0; s < Math.PI * 2; s += 0.2) {
if (Math.abs(s - Math.PI / 2) < 0.12)
continue;
tzwSolid(C[0] + Math.sin(s) * pr, C[1] + Math.cos(s) * pr, pr * 0.2 + 0.6, 0.6, my - 2, my + 4, s);
}
[-1, 1].forEach(function (sd) { tzwCyl(G, 0.2, 0.24, 4.4, tzwMat("darkbark"), C[0] + pr, my - 0.2, C[1] + sd * 3.2, 8); });
tzwBox(G, 0.4, 0.3, 7.4, tzwMat("darkbark"), C[0] + pr, my + 4.0, C[1]);
var hx = C[0] - 6, hz = C[1] - 8;
tzwTownHouse(G, hx, hz, 10, 7, 3.6, { y: H(hx, hz), ry: Math.PI / 2, wall: "render", roof: "tile", shut: 0x3A5A7A });
tzwBox(G, 10.4, 0.2, 2.6, tzwMat("planks"), hx + 4.9, H(hx, hz) + 0.2, hz, Math.PI / 2);
for (var vp = 0; vp < 5; vp++)
tzwCyl(G, 0.08, 0.08, 3.0, tzwMat("oak"), hx + 5.9, H(hx, hz), hz - 4.6 + vp * 2.3, 6);
tzwBox(G, 10.6, 0.12, 3.0, tzwMat("tile"), hx + 5.0, H(hx, hz) + 3.0, hz, Math.PI / 2);
tzwChurch(G, C[0] + 2, C[1] + 12, { ry: Math.PI / 2, len: 12, w: 7, h: 5, tower: 3, th: 8, wall: "render", roof: "tile" });
var CR = TZW.rooms.filter(function (r) { return r.key === "church"; })[0];
if (CR)
tzwDoor(CR, "The door of the church", C[0] + 2 - 7.0, C[1] + 12, -Math.PI / 2);
[[C[0] - 16, C[1] + 10, 0.9], [C[0] - 18, C[1] + 2, 2.2], [C[0] + 12, C[1] - 14, -0.6], [C[0] + 16, C[1] - 4, -1.4]].forEach(function (q) { tzwRoundHut(G, q[0], q[1], 3.0, { y: H(q[0], q[1]), ry: q[2] }); });
var fpx = C[0] + 20, fpz = C[1] - 6;
tzwCyl(G, 0.07, 0.09, 9, tzwMat("oak"), fpx, H(fpx, fpz), fpz, 6);
var mfl = tzwFlag(G, "fr", 1.8, 1.2);
mfl.position.set(fpx, H(fpx, fpz) + 8.2, fpz);
var rows = [];
for (var fr = 0; fr < (lite ? 6 : 14); fr++)
for (var fc = 0; fc < (lite ? 10 : 22); fc++) {
var fx = C[0] + pr + 10 + fr * 2.2, fz = C[1] - 24 + fc * 2.2 + (fr % 2) * 0.6;
rows.push({ x: fx, z: fz, y: H(fx, fz), s: 0.45 + R() * 0.2, ry: R() * 6 });
}
tzjPlant(G, "bush", rows, { col: 0x5A8A3A });
var D = TZW.rooms.filter(function (r) { return r.key === "mission"; })[0];
if (D)
tzwDoor(D, "The door of the mission house", hx + 3.9, hz, Math.PI / 2);
tzwStrip(G, [[C[0] + pr + 2, C[1]], [C[0] + 8, C[1] - 1], [hx + 6.6, hz]], 3, H, tzwMat("trail"), 0.07);
tzwStrip(G, [[C[0] + 8, C[1] - 1], [C[0] + 4, C[1] + 6.5]], 2.4, H, tzwMat("trail"), 0.075);
tzwStrip(G, [[C[0] + 8, C[1] - 1], [C[0] - 14, C[1] + 4]], 2, H, tzwMat("trail"), 0.075);
tzwStrip(G, [[C[0] + 8, C[1] - 1], [C[0] + 14, C[1] - 10]], 2, H, tzwMat("trail"), 0.075);
var wx = C[0] + 6, wz = C[1] - 4, wy = H(wx, wz);
tzwCyl(G, 0.8, 0.85, 0.8, tzwMat("stone"), wx, wy, wz, 14);
[-1, 1].forEach(function (sd) { tzwBox(G, 0.12, 2.0, 0.12, tzwMat("oak"), wx + sd * 0.8, wy, wz); });
tzwBox(G, 1.8, 0.12, 0.12, tzwMat("oak"), wx, wy + 2.0, wz);
tzwCyl(G, 0.18, 0.15, 0.3, tzwMat("darkoak"), wx, wy + 1.3, wz, 8);
var gb = [];
for (var gr = 0; gr < 4; gr++)
for (var gc = 0; gc < 8; gc++) {
var gx = C[0] - 10 + gr * 1.6, gz = C[1] - 20 + gc * 1.1;
gb.push({ x: gx, z: gz, y: H(gx, gz), s: 0.28 + R() * 0.1, ry: R() * 6 });
}
tzwStrip(G, [[C[0] - 7.6, C[1] - 21], [C[0] - 7.6, C[1] - 11]], 7, H, tzwMat("trail"), 0.065);
tzjPlant(G, "bush", gb, { col: 0x4A8A2A });
tzwCyl(G, 0.05, 0.05, 2, tzwMat("oak"), C[0] - 14, H(C[0] - 14, C[1] - 8), C[1] - 8, 5);
tzwCyl(G, 0.05, 0.05, 2, tzwMat("oak"), C[0] - 14, H(C[0] - 14, C[1] - 2), C[1] - 2, 5);
for (var ln = 0; ln < (lite ? 2 : 5); ln++) {
var lz = C[1] - 7.2 + ln * 1.1;
tzwBox(G, 0.05, 0.7, 0.8, tzwLam([0xF0ECE0, 0x3A6A9A, 0xE8D8B0, 0xC8442A, 0xF0ECE0][ln], { ds: 1 }), C[0] - 14, H(C[0] - 14, lz) + 1.2, lz);
}
tzwBench(G, hx + 7.6, hz - 3, Math.PI / 2, { w: 2 });
var mp = [];
for (var q = 0; q < (lite ? 4 : 9); q++) {
var a2 = R() * 6.28, r2 = 10 + R() * 16, mx2 = C[0] + Math.sin(a2) * r2, mz2 = C[1] + Math.cos(a2) * r2;
if (Math.hypot(mx2 - hx, mz2 - hz) < 9 || Math.hypot(mx2 - C[0] - 2, mz2 - C[1] - 12) < 9)
continue;
mp.push({ x: mx2, z: mz2, y: H(mx2, mz2), s: 0.8 + R() * 0.3, ry: R() * 6 });
}
tzjPlant(G, "palm", mp);
if (!TZW.st.missionEmpty)
tzwCrowd("mis", [["A woman sweeping the veranda", "f", "tzvillf", "The Father likes it clean. The dust comes back every hour.", TZP.mission], ["A man carrying water from the well", "m", "tzvillm", "Sweet water, deep down. The Fathers dug it with us.", TZP.mission],
["A girl reading from a slate", "f", "tzvillc", "B, A, BA. I can write my name now. Look!", TZP.mission, true], ["A carpenter mending the church door", "m", "tzvillm", "The termites eat everything. I mend, they eat. We are old friends.", TZP.mission],
["A woman washing linen", "f", "tzvillf", "The sun dries it in an hour. The rain wets it in a minute.", TZP.mission], ["A brother of the mission with a hoe", "m", "clergy", "God's garden and our own: both need weeding.", TZP.constantine]], C[0] - 20, C[1] - 20, C[0] + 20, C[1] + 20, { wander: 4, skin: [0x4A2C1C, 0x5A3422, 0x3E2418, 0x6A3E28], ok: function (x, z) { return Math.hypot(x - hx, z - hz) > 7 && Math.hypot(x - C[0] - 2, z - C[1] - 12) > 8; } });
},
function () {
if (typeof worldCard !== "function")
return;
var b = "<h3 style='margin:4px 0'>The books on the shelf</h3><p>Primers, picture-books for a child, a big dictionary, Lord Greystoke's own books on history and travel, and the little black diary he kept in French. The baby's picture-book is open at a page of a boy and a dog; <b>A is for Archer</b>, says the primer, <b>who shoots with a bow</b>.</p>" +
tzQs("Among the other books were a primer, some child's readers, numerous picture books, and a great dictionary. All of these he examined, but the pictures caught his fancy most, though the strange little bugs which covered the pages where there were no pictures excited his wonder and deepest thought.") + tzSrc("Chapter 7, The Light of Knowledge");
worldCard(b + worldBtn("x", "Close", ""), { x: function () { worldCard(null); } });
},
function (P, x, y, z, s) { var m = new THREE.Mesh(tzwGeo("tzPot", function () { var pts = []; for (var i = 0; i <= 10; i++) {
var t = i / 10;
pts.push(new THREE.Vector2(0.02 + Math.sin(t * Math.PI * 0.95) * 0.5 + (t > 0.85 ? 0.08 : 0), t * 0.9));
} return new THREE.LatheGeometry(pts, 14); }), tzwMat("pot")); m.scale.setScalar(s || 0.3); m.position.set(x, y, z); P.add(m); return m; },
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
tzwBox(g, 1.6, 0.08, 0.08, tzwMat("oak"), 0, 1.2, 0);
for (var i = 0; i < 5; i++) {
var s = tzwCyl(g, 0.018, 0.02, 2.2, tzwMat("oak"), -0.6 + i * 0.3, 0, 0.06, 5);
s.rotation.x = -0.08;
var t = new THREE.Mesh(tzwGeo("tzSpT", function () { var c = new THREE.ConeGeometry(0.035, 0.24, 4); c.scale(1, 1, 0.35); return c; }), tzwMat("iron"));
t.position.set(-0.6 + i * 0.3, 2.3, 0.06);
g.add(t);
}
return g;
},
function (P, x, z, r, o) {
o = o || {};
var y = o.y != null ? o.y : tzwLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var lite = tzwLite(), wh = o.h || 2.2;
var w = new THREE.Mesh(tzwGeo("tzHutW" + r, function () { var c = new THREE.CylinderGeometry(r, r * 1.04, wh, lite ? 12 : 20, 1, true, 0.35, Math.PI * 2 - 0.7); c.translate(0, wh / 2, 0); return c; }), tzwMat("mud"));
w.material.side = THREE.DoubleSide;
g.add(w);
[-1, 1].forEach(function (s) { var j = tzwCyl(g, 0.07, 0.08, wh + 0.2, tzwMat("darkbark"), Math.sin(s * 0.35) * r, 0, Math.cos(s * 0.35) * r, 6); });
tzwBox(g, 0.9, 0.1, 0.2, tzwMat("darkbark"), 0, wh - 0.25, r * 0.98);
var roof = new THREE.Mesh(tzwGeo("tzHutR" + r, function () { var c = new THREE.ConeGeometry(r * 1.38, r * 1.25 + 0.4, lite ? 12 : 20, 3, true); var pa = c.attributes.position; for (var i = 0; i < pa.count; i++) {
var yy = pa.getY(i);
if (yy < -0.1) {
var a = Math.atan2(pa.getZ(i), pa.getX(i));
pa.setY(i, yy + Math.sin(a * 7) * 0.06);
}
} c.translate(0, (r * 1.25 + 0.4) / 2, 0); return c; }), tzwThatchM());
roof.material.side = THREE.DoubleSide;
roof.position.y = wh - 0.15;
g.add(roof);
if (!lite) {
var cap = new THREE.Mesh(tzwGeo("tzHutC", function () { return new THREE.ConeGeometry(0.28, 0.6, 8); }), tzwThatchM());
cap.position.y = wh + r * 1.25 + 0.3;
g.add(cap);
}
tzwRound(x, z, r + 0.15, y - 1, y + wh + 1);
return g;
},
function (P, x, z) {
var y = tzwLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
tzwCyl(g, 0.08, 0.1, 1.1, tzwMat("darkbark"), Math.cos(a) * 0.9, 0, Math.sin(a) * 0.9, 6);
}
var w = new THREE.Mesh(tzwGeo("tzGranW", function () { var c = new THREE.CylinderGeometry(1.15, 0.95, 1.6, 14); c.translate(0, 0.8, 0); return c; }), tzwMat("mud"));
w.position.y = 1.1;
g.add(w);
var rf = new THREE.Mesh(tzwGeo("tzGranR", function () { var c = new THREE.ConeGeometry(1.7, 1.6, 14, 1, true); c.translate(0, 0.8, 0); return c; }), tzwThatchM());
rf.material.side = THREE.DoubleSide;
rf.position.y = 2.6;
g.add(rf);
tzwRound(x, z, 1.2);
return g;
},
function (P, x, y, z, ry, len) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
len = len || 6;
var hull = new THREE.Mesh(tzwGeo("tzCanoe", function () { var s = new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); s.scale(0.42, 0.36, 3); s.rotateX(Math.PI); s.translate(0, 0.36, 0); return s; }), tzwMat("darkoak"));
hull.material.side = THREE.DoubleSide;
hull.scale.z = len / 6;
g.add(hull);
var pd = tzwBox(g, 0.12, 0.03, 1.4, tzwMat("oak"), 0.1, 0.3, 0.6);
pd.rotation.x = 0.1;
return g;
},
function (P, x, z, ry, what) {
var y = tzwLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
[-1.4, 1.4].forEach(function (s) { tzwCyl(g, 0.05, 0.06, 1.8, tzwMat("darkbark"), s, 0, 0, 5); });
var pl = tzwCyl(g, 0.035, 0.035, 3.0, tzwMat("darkbark"), 0, 1.75, 0, 5);
pl.rotation.z = Math.PI / 2;
for (var i = 0; i < 6; i++) {
if (what === "cloth")
tzwBox(g, 0.4, 0.8, 0.02, tzwLam([0xC8A050, 0x8A3A1E, 0xE8D8B8, 0x3A5A7A][i % 4], { ds: 1 }), -1.1 + i * 0.45, 0.95, 0);
else
tzwBox(g, 0.08, 0.35, 0.03, tzwLam(0x8A7A6A), -1.1 + i * 0.45, 1.4, 0);
}
return g;
},
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var m = new THREE.Mesh(tzwGeo("tzDrum", function () { var pts = [new THREE.Vector2(0, 0.95), new THREE.Vector2(1.0, 0.95), new THREE.Vector2(1.15, 0.85), new THREE.Vector2(1.35, 0.4), new THREE.Vector2(1.6, 0.05), new THREE.Vector2(1.7, -0.1)]; return new THREE.LatheGeometry(pts, 24); }), tzwMat("clay"));
g.add(m);
tzwRound(x, z, 1.5, y - 1, y + 0.9);
tzwFloor(x, z, 2.2, 2.2, y + 0.95, { r: 1.05 });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var y = o.y != null ? o.y : tzwLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var w = o.w || 1.0, h = o.h || 0.6, d = o.d || 0.6;
tzwBox(g, w, h, d, tzwMat(o.mat || "darkoak"), 0, 0, 0);
[-w * 0.35, w * 0.35].forEach(function (xx) { tzwBox(g, 0.06, h + 0.02, d + 0.02, tzwMat("iron"), xx, 0, 0); });
if (o.lid !== false) {
var lid = new THREE.Mesh(tzwGeo("tzLid" + w + d, function () { var c = new THREE.CylinderGeometry(d / 2, d / 2, w, 10, 1, false, 0, Math.PI); c.rotateZ(Math.PI / 2); c.rotateX(-Math.PI / 2); return c; }), tzwMat(o.mat || "darkoak"));
lid.position.y = h;
g.add(lid);
}
return g;
},
function (G) {
var lite = tzwLite(), st = TZW.st, H = tzwCoH, C = TZW_CO, D;
tzwFar(G, H, 0x3A6A2A, { edge: 880, rise: 30 });
var tcol = function (x, z, y, c) {
var g = 0.82 + tzwFbm(x * 0.04, z * 0.04, 2) * 0.3, inl = x - tzwCoastX(z);
if (y < 0.9 && inl < 70) {
c.setRGB(0.98 * g, 0.92 * g, 0.78 * g);
return;
}
if (y < 0.2) {
c.setRGB(0.5 * g, 0.44 * g, 0.32 * g);
return;
}
var rd = tzwPathD(x, z, TZW_RIVER);
if (rd < tzwRiverW(x) / 2 + 6) {
c.setRGB(0.42 * g, 0.36 * g, 0.24 * g);
return;
}
var vd = Math.hypot(x - C.vil[0], z - C.vil[1]);
if (vd < 58) {
c.setRGB(0.66 * g, 0.5 * g, 0.34 * g);
return;
}
if (vd < 130) {
c.setRGB(0.5 * g, 0.52 * g, 0.28 * g);
return;
}
var ad = Math.hypot(x - C.amph[0], z - C.amph[1]);
if (ad < 22) {
c.setRGB(0.5 * g, 0.42 * g, 0.28 * g);
return;
}
if (Math.hypot(x - C.cabin[0], z - C.cabin[1]) < 20) {
c.setRGB(0.48 * g, 0.56 * g, 0.3 * g);
return;
}
if (inl < 110) {
c.setRGB(0.5 * g, 0.58 * g, 0.32 * g);
return;
}
c.setRGB(0.36 * g, 0.42 * g, 0.22 * g);
};
tzwTerrain(G, -900, -900, 620, 1800, lite ? 16 : 8, H, tzwMat("shoreground"), tcol);
tzwTerrain(G, -280, -900, 1180, 1800, lite ? 16 : 8, H, tzwMat("jungleground"), tcol);
var sea = tzwWater(G, -1300, 0, 1600, 2400, -1.0, 0x2A6A7A, 0.9);
sea.userData.fx = 0.2;
tzwWater(G, C.harb[0] - 10, C.harb[1] + 6, 150, 140, -0.95, 0x3A7A80, 0.86);
var rv = tzwStrip(G, TZW_RIVER, 64, function (x, z) { return tzwRiverY(x); }, tzwWaterM(0x5A5A3A, 0.88), 0);
rv.renderOrder = 2;
TZW.water.push(rv);
rv.userData.fx = 0.6;
rv.userData.fz = 0.3;
var strm = tzwStrip(G, TZW_CO_STREAM, 2.2, function (x, z) { var p = tzwPathD(x, z, TZW_CO_STREAM); return H(x, z) + 0.32 - (p < 4 ? 0 : 0.3); }, tzwWaterM(0x4A6A5A, 0.8), 0);
strm.renderOrder = 2;
tzjPlant(G, "reeds", tzwScatter(326, lite ? 16 : 50, -420, -40, -240, 80, function (x, z) { var d = tzwPathD(x, z, TZW_CO_STREAM); return d > 1.4 && d < 3.4; }, H, 0.6, 1.0));
if (!lite) {
var surf = [];
for (var zz = -860; zz < 860; zz += 6) {
var sx = tzwCoastX(zz) - 4;
if (Math.hypot(sx - C.harb[0], zz - C.harb[1]) < 90)
continue;
surf.push([sx, zz]);
}
for (var sp = 0; sp < surf.length - 1; sp += 30) {
var seg = surf.slice(sp, sp + 31);
if (seg.length > 1) {
var f = tzwStrip(G, seg, 3, function () { return -0.92; }, tzwLam(0xF4F6F4, { op: 0.55 }), 0);
f.renderOrder = 3;
}
}
}
Object.keys(TZW_CO_PATHS).forEach(function (k) { tzwStrip(G, TZW_CO_PATHS[k], k === "trail" ? 5 : k === "shore" ? 4 : 2.6, H, tzwMat(k === "shore" ? "sand" : "trail"), 0.06); });
tzwPlant(G, "rock", [[-528, 30, 4.2], [-536, 48, 3.0], [-520, 12, 3.4], [-514, 74, 3.8], [-506, 90, 2.8], [-545, 64, 2.4], [-490, 104, 2.6], [-500, -6, 2.6]].map(function (q) { return { x: q[0], z: q[1], y: H(q[0], q[1]) - 0.8, s: q[2], ry: q[0] }; }), { mat: tzwMat("darkrock"), keepAll: true });
tzwPlant(G, "rock", tzwScatter(301, lite ? 10 : 28, -560, -800, -460, 800, function (x, z) { var i = x - tzwCoastX(z); return i > -14 && i < 6 && Math.hypot(x - C.harb[0], z - C.harb[1]) > 100; }, H, 0.8, 2.4), { mat: tzwMat("darkrock") });
var palmOk = function (x, z) { var i = x - tzwCoastX(z); return i > 14 && i < 120 && Math.hypot(x - C.cabin[0], z - C.cabin[1]) > 22 && tzwPathD(x, z, TZW_CO_PATHS.cabin) > 4 && tzwPathD(x, z, TZW_RIVER) > 30; };
var palms = tzwScatter(302, lite ? 70 : 180, -620, -820, -300, 820, palmOk, H, 0.85, 1.3);
palms.forEach(function (p) { p.rz = (Math.random() - 0.5) * 0.1; });
tzjPlant(G, "palm", palms);
for (var dw = 0; dw < (lite ? 6 : 16); dw++) {
var R1 = wRand(310 + dw), dz = -700 + R1() * 1400, dx = tzwCoastX(dz) + 8 + R1() * 16;
tzwLog(G, dx, dz, R1() * 6, 2 + R1() * 3);
}
if (!st.noLanding) {
[[-438, 0, 0.3], [-441, 6, 1.2], [-435, 10, 0.2], [-444, -4, 0.9]].forEach(function (q, i) { tzwChest(G, q[0], q[1], q[2], { w: [1.2, 0.9, 1.0, 1.4][i], h: [0.7, 0.6, 0.5, 0.8][i], d: 0.7 }); });
}
var cb = new THREE.Group(), cy = H(C.cabin[0], C.cabin[1]);
cb.position.set(C.cabin[0], cy, C.cabin[1]);
cb.rotation.y = -Math.PI / 2;
G.add(cb);
if (st.noCabin)
cb.visible = false;
var logs = tzwMat("logs"), lw = 7.4, ld = 6, lh = 2.7, nlg = st.noCabin ? 0 : (st.cabinHalf ? 4 : 9);
for (var lg = 0; lg < nlg; lg++) {
var ly = lg * 0.3 + 0.15;
[[0, -ld / 2, lw + 0.6, 0], [0, ld / 2, lw + 0.6, 0]].forEach(function (q, k) { if (k === 1 && lg < 7) {
[-1, 1].forEach(function (s) { var m = tzwCyl(cb, 0.16, 0.16, (lw - 1.2) / 2 + 0.3, logs, s * ((lw + 1.2) / 4 + 0.15), ly - ((lw - 1.2) / 2 + 0.3) / 2, q[1], 8); m.rotation.z = Math.PI / 2; m.position.y = ly; });
return;
} var m2 = tzwCyl(cb, 0.16, 0.16, q[2], logs, 0, 0, q[1], 8); m2.rotation.z = Math.PI / 2; m2.position.y = ly; });
[-lw / 2, lw / 2].forEach(function (xx) { var m3 = tzwCyl(cb, 0.16, 0.16, ld + 0.6, logs, xx, 0, 0, 8); m3.rotation.x = Math.PI / 2; m3.position.y = ly + 0.15; });
}
if (st.noCabin || st.cabinHalf) {
if (st.cabinHalf) {
for (var kl = 0; kl < 10; kl++) {
var ml = tzwCyl(G, 0.16, 0.16, 6.6, logs, C.cabin[0] + 10 + (kl % 4) * 0.34, H(C.cabin[0] + 10, C.cabin[1] - 4) + 0.16 + Math.floor(kl / 4) * 0.3, C.cabin[1] - 4, 8);
ml.rotation.x = Math.PI / 2;
ml.position.y = H(C.cabin[0] + 10, C.cabin[1] - 4) + 0.16 + Math.floor(kl / 4) * 0.3;
}
tzwPlant(G, "rock", [0, 1, 2, 3, 4].map(function (i) { return { x: C.cabin[0] - 2 + i * 0.7, z: C.cabin[1] - 9 + (i % 2) * 0.6, y: H(C.cabin[0] - 2, C.cabin[1] - 9), s: 0.35 + (i % 3) * 0.1, ry: i }; }), { mat: tzwMat("stone"), keepAll: true });
tzwSolid(C.cabin[0], C.cabin[1], ld + 0.6, lw + 0.6, cy - 1, cy + 1.4);
}
}
else {
tzwBox(cb, 1.1, 2.1, 0.1, tzwMat("planks"), 0, 0, ld / 2 + 0.02);
tzwBox(cb, 0.3, 0.05, 0.06, tzwMat("iron"), 0.38, 1.05, ld / 2 + 0.1);
var roofG = new THREE.Mesh(tzwGeo("tzCabRoof", function () { var s = new THREE.Shape(); s.moveTo(-4.4, 0); s.lineTo(0, 2.1); s.lineTo(4.4, 0); s.lineTo(-4.4, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 7.2, bevelEnabled: false }); e.translate(0, 0, -3.6); e.rotateY(Math.PI / 2); return e; }), tzwThatchM());
roofG.rotation.y = Math.PI / 2;
roofG.position.y = lh;
roofG.scale.set(1.0, 1, 1.12);
cb.add(roofG);
var ch = tzwBox(cb, 1.0, 4.4, 1.0, tzwMat("stone"), -lw / 2 - 0.3, 0, -1.6);
tzwBox(cb, 0.7, 0.5, 0.7, tzwMat("stone"), -lw / 2 - 0.3, 4.4, -1.6);
if (!lite)
tzwSmoke(cb, -lw / 2 - 0.3, 5.0, -1.6, 0x9A9A9A, 4);
tzwBox(cb, 1.0, 0.9, 0.08, tzwLam(0x141C14), 1.8, 1.0, -ld / 2 - 0.12);
for (var wb = 0; wb < 4; wb++)
tzwBox(cb, 0.06, 0.9, 0.08, tzwMat("oak"), 1.45 + wb * 0.24, 1.0, -ld / 2 - 0.18);
tzwSolid(C.cabin[0], C.cabin[1], ld + 0.6, lw + 0.6, cy - 1, cy + 5);
D = function (key, p, nm) { var Rm = TZW.rooms.filter(function (r) { return r.key === key; })[0]; if (Rm)
tzwDoor(Rm, nm, p.x, p.z, p.ry); };
D("cabin", { x: C.cabin[0] - 4.2, z: C.cabin[1], ry: -Math.PI / 2 }, "The door of the cabin");
}
if (st.nest)
tzwNest(G, H);
if (st.fuAnchor) {
var fa = tzwSailShip(G, C.harb[0] - 6, C.harb[1] + 4, 0.5, { kind: "ship", furled: true, flag: "eng", hull: 0x2E2620, band: 0x2E2620, sails: 0xEAE2CC });
if (fa)
fa.userData.name = "fuwalda";
}
if (st.boats) {
[[-392, 10, 0.4], [-394, 20, -0.3]].forEach(function (q) { var bt = new THREE.Mesh(tzwGeo("tzBoat", function () { var s = new THREE.SphereGeometry(1, 14, 7, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); s.scale(0.85, 0.55, 2.6); s.rotateX(Math.PI); s.translate(0, 0.55, 0); return s; }), tzwMat("hull")); bt.material.side = THREE.DoubleSide; bt.position.set(q[0], -1.05, q[1]); bt.rotation.y = q[2]; G.add(bt); });
}
if (!lite) {
var gpl = [], gR = wRand(313);
for (var gr = 0; gr < 4; gr++) {
var gzz = C.cabin[1] - 8 + gr * 1.6;
tzwBox(G, 6, 0.1, 0.9, tzwMat("trail"), C.cabin[0] + 8, H(C.cabin[0] + 8, gzz) - 0.02, gzz);
for (var gk = 0; gk < 7; gk++) {
var gxx = C.cabin[0] + 5.4 + gk * 0.85;
gpl.push({ x: gxx, z: gzz + (gR() - 0.5) * 0.2, y: H(gxx, gzz) + 0.06, s: 0.22 + gR() * 0.08, ry: gR() * 6 });
}
}
tzjPlant(G, "bush", gpl, { col: 0x6A9A3A });
}
tzwCyl(G, 0.5, 0.6, 0.6, tzwMat("bark"), C.cabin[0] + 6, H(C.cabin[0] + 6, C.cabin[1] + 9), C.cabin[1] + 9, 10);
tzwPaling(G, [[C.cabin[0] - 14, C.cabin[1] + 16], [C.cabin[0] + 12, C.cabin[1] + 18], [C.cabin[0] + 16, C.cabin[1] + 2]], H, {});
var clear = function (x, z, pad) {
pad = pad || 0;
var inl = x - tzwCoastX(z);
if (inl < 90 + pad)
return false;
if (Math.hypot(x - C.cabin[0], z - C.cabin[1]) < 30 + pad)
return false;
if (Math.hypot(x - C.amph[0], z - C.amph[1]) < 27 + pad)
return false;
if (Math.hypot(x - C.hole[0], z - C.hole[1]) < 24 + pad)
return false;
if (Math.hypot(x - 10, z - 40) < 13 + pad)
return false;
if (Math.hypot(x - TZW_FCAMP[0], z - TZW_FCAMP[1]) < 12 + pad)
return false;
if (Math.hypot(x - TZW_MISSION[0], z - TZW_MISSION[1]) < 34 + pad)
return false;
if (z < TZW_PORT[1] + 36 && x < TZW_PORT[0] + 72)
return false;
if (x > TZW_MISSION[0] + 28 && x < TZW_MISSION[0] + 66 && Math.abs(z - TZW_MISSION[1]) < 30 + pad)
return false;
if (Math.hypot(x - C.vil[0], z - C.vil[1]) < 120 + pad)
return false;
var rd = tzwPathD(x, z, TZW_RIVER);
if (rd < tzwRiverW(x) / 2 + 8 + pad)
return false;
for (var k in TZW_CO_PATHS) {
if (k === "shore")
continue;
if (tzwPathD(x, z, TZW_CO_PATHS[k]) < (k === "trail" ? 6 : 3.5) + pad)
return false;
}
return true;
};
tzjNearInit(G, function (x, z) { return clear(x, z, -2.5); }, H);
var nearTop = function (x, z) { return tzwPathD(x, z, TZW_TOPWAY.map(function (p) { return [p[0], p[1]]; })) < 9; };
var giants = tzwScatter(311, lite ? 80 : 230, -560, -880, 880, 880, function (x, z) { return clear(x, z, 4) && !nearTop(x, z); }, H, 0.85, 1.15);
giants.forEach(function (t, i) { t.v = i % 3; });
var canopy = tzwScatter(312, lite ? 260 : 2000, -560, -880, 880, 880, function (x, z) { return clear(x, z, 1) && !nearTop(x, z); }, H, 0.8, 1.2);
canopy.forEach(function (t, i) { t.v = i % 3; });
var under = tzwScatter(313, lite ? 320 : 3400, -560, -880, 880, 880, function (x, z) { return clear(x, z, 0); }, H, 0.7, 1.3);
under.forEach(function (t, i) { t.v = i % 3; });
TZW_TOPWAY.forEach(function (p, i) { if (i > 1 && i < TZW_TOPWAY.length - 2 && i % 2 === 0)
giants.push({ x: p[0] + 2.2, z: p[1] + 2.4, y: H(p[0] + 2.2, p[1] + 2.4), s: 0.95, ry: i, v: i % 3 }); });
tzjPlace(G, "giant", giants);
tzjPlace(G, "canopy", canopy);
tzjPlace(G, "under", under);
tzjPlace(G, "oilpalm", tzwScatter(314, lite ? 70 : 300, -560, -880, 880, 880, function (x, z) { return clear(x, z, 0); }, H, 0.8, 1.2));
tzjPlant(G, "fern", tzwScatter(316, lite ? 70 : 320, -560, -880, 880, 880, function (x, z) { return clear(x, z, -2); }, H, 0.7, 1.2));
tzjPlant(G, "bush", tzwScatter(317, lite ? 320 : 2600, -560, -880, 880, 880, function (x, z) { return clear(x, z, -2); }, H, 0.8, 1.6), { col: 0x2E5A22 });
tzjPlace(G, "lowfern", tzwScatter(325, lite ? 300 : 2400, -560, -880, 880, 880, function (x, z) { return clear(x, z, -2.5); }, H, 0.7, 1.5));
tzjPlace(G, "floor", tzwScatter(318, lite ? 260 : 2200, -560, -880, 880, 880, function (x, z) { return clear(x, z, -2.5); }, H, 0.8, 1.6));
if (!lite)
for (var lgx = 0; lgx < 60; lgx++) {
var R2 = wRand(330 + lgx), lx = -500 + R2() * 1350, lz = -860 + R2() * 1720;
if (clear(lx, lz, 1))
tzwLog(G, lx, lz, R2() * 6, 4 + R2() * 6);
}
var scrub = function (x, z) { var i = x - tzwCoastX(z); return i > 40 && i < 110 && Math.hypot(x - C.cabin[0], z - C.cabin[1]) > 24 && tzwPathD(x, z, TZW_CO_PATHS.cabin) > 3 && tzwPathD(x, z, TZW_RIVER) > 24; };
tzjPlant(G, "bush", tzwScatter(319, lite ? 60 : 220, -620, -820, -300, 820, scrub, H, 0.7, 1.3), { col: 0x4A7A30 });
tzjPlant(G, "grass", tzwScatter(320, lite ? 160 : 900, -620, -820, -300, 820, scrub, H, 0.8, 1.4), { col: 0x8AAA58 });
var reedOk = function (x, z) { var d = tzwPathD(x, z, TZW_RIVER), w = tzwRiverW(x) / 2; return d > w - 3 && d < w + 5; };
tzjPlant(G, "reeds", tzwScatter(321, lite ? 120 : 420, -560, -640, 900, -200, reedOk, H, 0.8, 1.3));
tzwMangroves(G, tzwScatter(322, lite ? 14 : 36, -560, -300, -430, -210, function (x, z) { var d = tzwPathD(x, z, TZW_RIVER); return d > 16 && d < 34; }, H, 0.9, 1.3));
tzwTopWay(G, H);
tzwPerch(G, H, TZW_PERCH);
TZW_PERCH2.name = "The great tree over the village";
tzwPerch(G, H, TZW_PERCH2);
var ay = tzwAmphY();
tzwDrum(G, C.amph[0], ay, C.amph[1]);
if (!lite)
for (var bo = 0; bo < 14; bo++) {
var ba = bo / 14 * Math.PI * 2, bx = C.amph[0] + Math.cos(ba) * 21, bz = C.amph[1] + Math.sin(ba) * 21;
tzwPlant(G, "rock", [{ x: bx, z: bz, y: H(bx, bz) - 0.3, s: 0.6 + (bo % 3) * 0.3, ry: bo }], { mat: tzwMat("darkrock"), keepAll: true });
}
tzjPlant(G, "grass", tzwScatter(323, lite ? 20 : 60, C.amph[0] - 24, C.amph[1] - 24, C.amph[0] + 24, C.amph[1] + 24, function (x, z) { var d = Math.hypot(x - C.amph[0], z - C.amph[1]); return d > 17 && d < 25; }, H, 0.6, 1.0), { col: 0x9AA860 });
tzwWater(G, C.hole[0], C.hole[1], 34, 30, tzwHoleY() - 0.3, 0x4A5A3A, 0.9);
tzjPlant(G, "reeds", tzwScatter(324, lite ? 30 : 90, C.hole[0] - 24, C.hole[1] - 22, C.hole[0] + 24, C.hole[1] + 22, function (x, z) { var d = Math.hypot(x - C.hole[0], z - C.hole[1]); return d > 13 && d < 20; }, H, 0.8, 1.3));
tzwVillage(G, H);
tzwMission(G, H);
tzwPort(G, H);
if (st.arrow) {
var ar = tzwSailShip(G, st.arrowOut ? -640 : C.harb[0] - 8, st.arrowOut ? 90 : C.harb[1] + 10, st.arrowOut ? -0.4 : 0.9, { kind: "brig", furled: true, flag: "usa", hull: 0x2A2420, band: 0x2A2420 });
if (ar)
ar.userData.name = "arrow";
}
if (st.cruiser)
tzwCruiser(G, -760, -60, 0.3);
if (st.smoke)
tzwSmoke(G, -1100, 6, -700, 0x3A3A3A, lite ? 5 : 9);
if (st.graves) {
var gx = C.cabin[0] - 4, gz = C.cabin[1] - 11, gm = tzwMat("trail"), oak = tzwMat("oak");
[-2.2, 0, 2.2].forEach(function (o, i) {
var L = i === 1 ? 0.9 : 2.0, m = new THREE.Mesh(tzwGeo("tzGrave" + i, function () { var g = new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2); g.scale(i === 1 ? 0.35 : 0.55, 0.32, L / 2); return g; }), gm);
m.position.set(gx + o, H(gx + o, gz), gz);
G.add(m);
tzwBox(G, 0.08, 1.1 - (i === 1 ? 0.35 : 0), 0.08, oak, gx + o, H(gx + o, gz - L / 2 - 0.2), gz - L / 2 - 0.2);
tzwBox(G, 0.5, 0.07, 0.07, oak, gx + o, H(gx + o, gz - L / 2 - 0.2) + (i === 1 ? 0.5 : 0.8), gz - L / 2 - 0.2);
if (!lite)
for (var k = 0; k < 8; k++) {
var a = k / 8 * Math.PI * 2;
tzwPlant(G, "rock", [{ x: gx + o + Math.cos(a) * (i === 1 ? 0.45 : 0.7), z: gz + Math.sin(a) * L * 0.6, y: H(gx + o, gz), s: 0.12, ry: k }], { mat: tzwMat("stone"), keepAll: true });
}
});
tzwPlant(G, "flowers", [{ x: gx - 2.2, z: gz + 0.2, y: H(gx, gz), s: 0.6 }, { x: gx + 2.2, z: gz - 0.3, y: H(gx, gz), s: 0.6 }], { keepAll: true });
}
if (st.arrowPoint) {
var ap = tzwSailShip(G, -640, -150, 0.2, { kind: "brig", furled: true, flag: "usa", hull: 0x2A2420, band: 0x2A2420 });
if (ap)
ap.userData.name = "arrow";
}
var bz = TZW_BLUFF.z, bx = tzwCoastX(bz) + TZW_BLUFF.in;
tzjPlace(G, "canopy", [{ x: bx, z: bz, y: H(bx, bz), s: 0.85, ry: 0.7, v: 2 }], { solid: true });
if (st.trench || st.brush) {
var tr = new THREE.Mesh(tzwBoxG(1.4, 0.2, 2.6), tzwMat("trail"));
tr.position.set(bx + 2, H(bx + 2, bz) + 0.04, bz + 1);
G.add(tr);
if (st.trench) {
tzwBox(G, 0.9, 0.5, 0.9, tzwMat("trail"), bx + 3.6, H(bx + 3.6, bz), bz + 0.6);
tzwBox(G, 0.06, 0.06, 1.3, tzwMat("oak"), bx + 3.4, H(bx + 3.4, bz + 2.6) + 0.05, bz + 2.6);
}
if (st.brush)
tzjPlant(G, "bush", [0, 1, 2, 3].map(function (i) { return { x: bx + 1.6 + (i % 2) * 0.9, z: bz + (i >> 1) * 1.2 + 0.3, y: H(bx + 2, bz), s: 0.5, ry: i }; }), { col: 0x6A5A3A });
}
if (st.pyre || st.pyreLit) {
var px = tzwCoastX(bz - 14) + 8, pz = bz - 14, py = H(px, pz), bk = tzwMat("bark");
for (var pw = 0; pw < (lite ? 10 : 22); pw++) {
var a = pw * 2.39, rr = 0.4 + (pw % 5) * 0.35, l = tzwCyl(G, 0.07, 0.1, 2.2 + (pw % 3) * 0.5, bk, px + Math.cos(a) * rr * 0.5, py + 0.3 + Math.floor(pw / 6) * 0.35, pz + Math.sin(a) * rr * 0.5, 6);
l.rotation.set(Math.cos(a) * 1.0, 0, Math.sin(a) * 1.0);
}
tzjPlant(G, "bush", [0, 1, 2].map(function (i) { return { x: px + (i - 1) * 0.6, z: pz + 0.3, y: py + 0.9, s: 0.45, ry: i }; }), { col: 0x8A7A4A });
if (st.pyreLit) {
tzwFire(G, px, py + 0.4, pz, 2.2);
tzwSmoke(G, px, py + 3, pz, 0x6A6A66, lite ? 6 : 12);
tzwSmoke(G, px, py + 16, pz, 0x8A8A84, lite ? 4 : 8);
}
}
if (st.frCamp) {
var fcx = TZW_FCAMP[0], fcz = TZW_FCAMP[1];
tzwFire(G, fcx, H(fcx, fcz), fcz, 1.6);
if (!lite)
tzwSmoke(G, fcx, H(fcx, fcz) + 2, fcz, 0x7A7A74, 5);
tzjPlant(G, "bush", Array.from({ length: lite ? 14 : 30 }, function (_, i) { var a = i / (lite ? 14 : 30) * Math.PI * 2; return { x: fcx + Math.cos(a) * 9, z: fcz + Math.sin(a) * 9, y: H(fcx + Math.cos(a) * 9, fcz + Math.sin(a) * 9), s: 0.7, ry: i }; }), { col: 0x5A5A30 });
for (var bd = 0; bd < 6; bd++) {
var ba = bd / 6 * Math.PI * 2 + 0.3;
tzwBox(G, 0.7, 0.12, 1.9, tzwLam(0x5A5A4A), fcx + Math.cos(ba) * 4.5, H(fcx + Math.cos(ba) * 4.5, fcz + Math.sin(ba) * 4.5), fcz + Math.sin(ba) * 4.5, ba);
}
}
if (st.bower) {
var bwx = C.amph[0] + 7, bwz = C.amph[1] + 3, bwy = H(bwx, bwz), bw = new THREE.Group();
bw.position.set(bwx, bwy, bwz);
bw.rotation.y = -0.6;
G.add(bw);
tzwBox(bw, 1.3, 0.18, 2.2, tzwLam(0x6A8A3A), 0, 0, 0);
for (var bb = 0; bb < 7; bb++) {
[-1, 1].forEach(function (sd) { var l = tzwCyl(bw, 0.04, 0.05, 1.9, tzwMat("bark"), sd * 0.8, 0, -1.0 + bb * 0.33, 5); l.rotation.z = sd * 0.62; l.position.y = 0.75; });
}
[-1, 1].forEach(function (sd) { var r = tzwBox(bw, 0.06, 1.75, 2.4, tzjMats().leaf3, sd * 0.48, 0.05, 0); r.rotation.z = sd * 0.62; r.material.side = THREE.DoubleSide; });
tzwBox(bw, 1.6, 1.4, 0.15, tzjMats().dark, 0, 0, -1.15);
}
if (st.frBoats) {
[[-396, 4, 0.2], [-399, 14, -0.2], [-393, 26, 0.5]].forEach(function (q) { var bt = new THREE.Mesh(tzwGeo("tzBoat", function () { var s = new THREE.SphereGeometry(1, 14, 7, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); s.scale(0.85, 0.55, 2.6); s.rotateX(Math.PI); s.translate(0, 0.55, 0); return s; }), tzwMat("hull")); bt.material.side = THREE.DoubleSide; bt.position.set(q[0], -1.05, q[1]); bt.rotation.y = q[2]; G.add(bt); });
}
if (st.chestBoat) {
tzwChest(G, tzwCoastX(bz) - 2, bz + 6, 0.4, { w: 1.2, h: 0.7, d: 0.8 });
}
},
function (G, H) {
var C = TZW_CO, nx = C.cabin[0] + 8, nz = C.cabin[1] - 20, ny = H(nx, nz), bark = tzwMat("bark"), w = 2.5, lite = tzwLite();
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { tzwCyl(G, 0.26, 0.34, 11, bark, nx + q[0] * w / 2, ny - 0.3, nz + q[1] * w / 2, 9); tzwSolid(nx + q[0] * w / 2, nz + q[1] * w / 2, 0.5, 0.5, ny - 1, ny + 11); });
var py = ny + 3.05, ry = py + 2.15, g = new THREE.Group();
g.position.set(nx, 0, nz);
G.add(g);
for (var b = 0; b < 11; b++) {
var m = tzwCyl(g, 0.06, 0.07, w + 0.9, bark, -w / 2 - 0.2 + b * (w + 0.4) / 10, py - 0.12, 0, 6);
m.rotation.x = Math.PI / 2;
m.position.y = py - 0.08;
}
[-1, 1].forEach(function (s) { var m = tzwCyl(g, 0.1, 0.1, w + 1.0, bark, 0, py - 0.2, s * w / 2, 7); m.rotation.z = Math.PI / 2; m.position.y = py - 0.2; });
tzwBox(g, w + 0.2, 0.05, w + 0.2, tzwLam(0x3E6A2A), 0, py, 0);
tzwBox(g, w - 0.3, 0.12, w - 0.3, tzwLam(0xD8D0B8), 0, py + 0.05, 0);
for (var r = 0; r < 9; r++) {
var m2 = tzwCyl(g, 0.05, 0.05, w + 0.6, bark, -w / 2 + r * w / 8, ry, 0, 6);
m2.rotation.x = Math.PI / 2;
m2.position.y = ry;
}
tzwBox(g, w + 0.6, 0.06, w + 0.6, tzwLam(0x2E5A22), 0, ry + 0.06, 0);
var sail = tzwLam(0xE4DCC4, { ds: 1 });
[[0, -w / 2, 0], [0, w / 2, 1], [-w / 2, 0, 2]].forEach(function (q) { var c = new THREE.Mesh(new THREE.PlaneGeometry(w, 2.1, 1, 1), sail); c.position.set(q[0], py + 1.08, q[1]); c.rotation.y = q[2] === 2 ? Math.PI / 2 : 0; g.add(c); });
var rl = new THREE.Mesh(new THREE.PlaneGeometry(w, 0.8, 1, 1), sail);
rl.position.set(w / 2, ry - 0.4, 0);
rl.rotation.y = Math.PI / 2;
g.add(rl);
var lx = nx + w / 2 + 1.5;
[-0.32, 0.32].forEach(function (s) { var m = tzwCyl(G, 0.05, 0.05, 3.6, bark, lx, 0, nz + s, 6); m.rotation.z = 0.45; m.position.set(lx - 0.1, ny + 1.6, nz + s); });
for (var rg = 0; rg < 7; rg++) {
var t = rg / 6, m3 = tzwCyl(G, 0.035, 0.035, 0.7, bark, 0, 0, 0, 5);
m3.rotation.x = Math.PI / 2;
m3.position.set(lx + 0.7 - t * 1.6, ny + 0.2 + t * 2.8, nz);
G.add(m3);
}
tzwRamp(lx - 0.2, nz, 0.9, 3.2, ny, py, Math.PI / 2);
tzwFloor(nx, nz, w, w, py);
tzwSolid(nx, nz - w / 2, w, 0.2, py, py + 2.1);
tzwSolid(nx, nz + w / 2, w, 0.2, py, py + 2.1);
tzwSolid(nx - w / 2, nz, 0.2, w, py, py + 2.1);
TZW.nestY = py;
if (!lite) {
var bas = new THREE.Mesh(tzwGeo("tzBasin", function () { return new THREE.CylinderGeometry(0.3, 0.22, 0.16, 12); }), tzwMat("iron"));
bas.position.set(nx - 0.8, py + 0.14, nz + 0.7);
G.add(bas);
}
},
function (P, list) {
if (!list.length)
return;
var lite = tzwLite();
tzwInst(P, tzwGeo("tzMangR", function () {
var parts = [];
for (var i = 0; i < (lite ? 5 : 9); i++) {
var a = i / (lite ? 5 : 9) * Math.PI * 2, pts = [[0, 2.4, 0], [Math.cos(a) * 1.0, 2.0, Math.sin(a) * 1.0], [Math.cos(a) * 1.8, 1.0, Math.sin(a) * 1.8], [Math.cos(a) * 2.2, -0.4, Math.sin(a) * 2.2]];
var c = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); })), 8, 0.07, 4, false);
parts.push(c.toNonIndexed());
}
var t = new THREE.CylinderGeometry(0.16, 0.22, 4, 6);
t.translate(0, 4.2, 0);
parts.push(t.toNonIndexed());
return gwMerge(parts);
}), tzwMat("darkbark"), list, {});
tzwInst(P, tzwGeo("tzMangC", function () { var l = []; for (var i = 0; i < 5; i++)
tzjClump(l, 1.8, (i % 3 - 1) * 1.4, 6 + (i % 2), ((i + 1) % 3 - 1) * 1.4, 600 + i, 0.6, lite ? 0 : 1); return gwMerge(l); }), tzjMats().leaf3, list, {});
},
function (G, H) {
var W = TZW_TOPWAY, lite = tzwLite(), bark = tzwMat("bark"), pts = W.map(function (p) { return [p[0], H(p[0], p[1]) + p[2], p[1]]; });
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dz = b[2] - a[2], L = Math.hypot(dx, dz), ry = Math.atan2(dx, dz), mx = (a[0] + b[0]) / 2, mz = (a[2] + b[2]) / 2;
if (Math.abs(b[1] - a[1]) > 0.3)
tzwRamp(mx, mz, 1.8, L + 0.6, a[1], b[1], ry);
else
tzwFloor(mx, mz, 1.8, L + 0.6, (a[1] + b[1]) / 2, { rot: ry });
var lb = new THREE.Mesh(tzwGeo("tzTopLimb", function () { var c = new THREE.CylinderGeometry(0.42, 0.5, 1, 10, 4); var pa = c.attributes.position; for (var k = 0; k < pa.count; k++) {
var y = pa.getY(k);
pa.setX(k, pa.getX(k) + Math.sin(y * 3) * 0.06);
} return c; }), bark);
var v = new THREE.Vector3(dx, b[1] - a[1], dz), l3 = v.length();
lb.scale.y = l3 + 0.8;
lb.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.normalize());
lb.position.set(mx, (a[1] + b[1]) / 2 - 0.42, mz);
G.add(lb);
if (!lite || i % 2 === 0) {
var R = wRand(400 + i);
for (var s = 0; s < 2; s++) {
var t = 0.3 + s * 0.4, px = a[0] + dx * t, pz = a[2] + dz * t, py = a[1] + (b[1] - a[1]) * t - 0.3, side = s ? 1 : -1, ex = px + Math.cos(ry) * side * 4.5, ez = pz - Math.sin(ry) * side * 4.5;
var bb = tzwCyl(G, 0.08, 0.18, 4.8, bark, 0, 0, 0, 6);
var vv = new THREE.Vector3(ex - px, 2.2, ez - pz);
bb.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vv.clone().normalize());
bb.position.set((px + ex) / 2, py + 1.1, (pz + ez) / 2);
var cl = [];
tzjClump(cl, 2.2 + R() * 0.8, 0, 0, 0, 450 + i * 3 + s, 0.55, lite ? 0 : 1);
var cm = new THREE.Mesh(gwMerge(cl), tzjMats().leaf);
cm.position.set(ex, py + 2.6, ez);
G.add(cm);
}
}
if (!lite && i % 2 === 1) {
var lc = [];
tzjLiana(lc, [a[0], a[1] - 0.4, a[2]], [b[0], b[1] - 0.4, b[2]], 2.6, 0.05, 470 + i);
var lm = new THREE.Mesh(gwMerge(lc), bark);
G.add(lm);
}
}
[[0, 1], [pts.length - 1, pts.length - 2]].forEach(function (q) { var p = pts[q[0]], n = pts[q[1]], g = H(p[0], p[2]), tr = tzwCyl(G, 0.35, 0.45, Math.hypot(n[0] - p[0], n[1] - g, n[2] - p[2]), bark, 0, 0, 0, 8); var vv = new THREE.Vector3(n[0] - p[0], n[1] - g, n[2] - p[2]); tr.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vv.clone().normalize()); tr.position.set((p[0] + n[0]) / 2, (g + n[1]) / 2 - 0.3, (p[2] + n[2]) / 2); });
tzwSpot(W[0][0], W[0][1], 2.4, "The apes' road through the trees", "climb up", null);
tzwSpot(W[W.length - 1][0], W[W.length - 1][1], 2.4, "The apes' road through the trees", "climb up", null);
},
function (G, H, P) {
var bark = tzwMat("bark"), lite = tzwLite(), y = H(P.x, P.z) + P.h, ux = Math.sin(P.a), uz = Math.cos(P.a), vx = uz, vz = -ux, M = tzjMats();
var Sx = P.x - ux * (P.len / 2 - 2), Sz = P.z - uz * (P.len / 2 - 2), Fx = Sx - ux * 12, Fz = Sz - uz * 12, gS = H(Sx, Sz), gF = H(Fx, Fz);
var Gt = tzjTreeGeo("giant", 1), T = { x: Sx + vx * 2.8, y: gS - 0.2, z: Sz + vz * 2.8, s: 1.0, ry: 0.4 };
tzwInst(G, Gt.bark, M.bark, [T], {});
tzwInst(G, Gt.leaf, M.leaf2, [T], {});
tzwRound(T.x, T.z, 1.4);
var up = new THREE.Vector3(0, 1, 0), lb = tzwCyl(G, 0.38, 0.55, P.len, bark, 0, 0, 0, 10);
lb.quaternion.setFromUnitVectors(up, new THREE.Vector3(ux, 0, uz));
lb.position.set(P.x, y - 0.4, P.z);
tzwFloor(P.x, P.z, 1.5, P.len, y, { rot: P.a });
var cl = [];
for (var i = 0; i < 3; i++)
tzjClump(cl, 2.4, (i - 1) * 1.6, 2.2 + i % 2, (i - 1) * 1.4, 880 + i, 0.6, lite ? 0 : 1);
var cm = new THREE.Mesh(gwMerge(cl), M.leaf);
cm.position.set(P.x + ux * (P.len / 2 - 3), y, P.z + uz * (P.len / 2 - 3));
G.add(cm);
var lv = new THREE.Vector3(Sx - Fx, y - gF, Sz - Fz), tr = tzwCyl(G, 0.34, 0.42, lv.length(), bark, 0, 0, 0, 8);
tr.quaternion.setFromUnitVectors(up, lv.clone().normalize());
tr.position.set((Sx + Fx) / 2, (y + gF) / 2 - 0.3, (Sz + Fz) / 2);
tzwRamp((Sx + Fx) / 2, (Sz + Fz) / 2, 1.4, 12.4, gF, y, P.a);
if (!lite) {
var lc = [];
tzjLiana(lc, [P.x + ux * 2 + vx * 0.3, y - 0.4, P.z + uz * 2 + vz * 0.3], [P.x + ux * 3 + vx * 0.6, H(P.x, P.z) + 0.4, P.z + uz * 3 + vz * 0.6], 0.5, 0.05, 890);
tzjLiana(lc, [P.x + ux * 6, y - 0.4, P.z + uz * 6], [P.x + ux * 7, H(P.x, P.z) + 1.6, P.z + uz * 7], 0.4, 0.04, 891);
G.add(new THREE.Mesh(gwMerge(lc), bark));
}
tzwSpot(Fx, Fz, 2.2, P.name || "The great branch over the trail", "climb up", null);
},
function (G, H) {
var C = TZW_CO.vil, lite = tzwLite(), vy = tzwVilY(), R = wRand(501), X = TZW_ROOMXZ.coast;
var stakes = [], pr = 54;
for (var a = 0; a < Math.PI * 2; a += lite ? 0.05 : 0.022) {
var px = C[0] + Math.sin(a) * pr, pz = C[1] + Math.cos(a) * pr;
if (Math.abs(a) < 0.08 || Math.abs(a - Math.PI * 2) < 0.08)
continue;
stakes.push({ x: px, z: pz, y: H(px, pz) - 0.3, s: 0.9 + R() * 0.25, ry: R() * 6 });
}
tzwInst(G, tzwGeo("tzStake", function () { var c = new THREE.CylinderGeometry(0.11, 0.13, 3.6, 6); c.translate(0, 1.8, 0); var t = new THREE.ConeGeometry(0.11, 0.35, 6); t.translate(0, 3.77, 0); return gwMerge([c.toNonIndexed(), t.toNonIndexed()]); }), tzwMat("darkbark"), stakes, {});
for (var s = 0; s < Math.PI * 2; s += 0.2) {
if (Math.abs(s) < 0.1 || Math.abs(s - Math.PI * 2) < 0.1)
continue;
var sx = C[0] + Math.sin(s) * pr, sz = C[1] + Math.cos(s) * pr;
tzwSolid(sx, sz, pr * 0.2 + 0.6, 0.6, vy - 2, vy + 4, s);
}
[-1, 1].forEach(function (sd) { tzwCyl(G, 0.2, 0.24, 4.6, tzwMat("darkbark"), C[0] + sd * 3.6, vy - 0.2, C[1] + pr, 8); });
tzwBox(G, 8, 0.3, 0.4, tzwMat("darkbark"), C[0], vy + 4.0, C[1] + pr);
var huts = [];
for (var i = 0; i < (lite ? 12 : 22); i++) {
var ring = i < 12 ? 0 : 1, n = ring ? 10 : 12, k = ring ? i - 12 : i, a2 = k / n * Math.PI * 2 + (ring ? 0.3 : 0), rr = ring ? 40 : 25, hx = C[0] + Math.sin(a2) * rr, hz = C[1] + Math.cos(a2) * rr;
if (Math.abs(Math.sin(a2)) < 0.2 && Math.cos(a2) > 0)
continue;
huts.push([hx, hz, 3.0 + R() * 0.8, a2 + Math.PI]);
}
huts.forEach(function (h, i) { tzwRoundHut(G, h[0], h[1], h[2], { y: H(h[0], h[1]), ry: h[3] }); });
tzwRoundHut(G, C[0], C[1] - 12, 4.6, { y: H(C[0], C[1] - 12), ry: 0, h: 2.6 });
var Dr = function (key, x, z, ry, nm) { var Rm = TZW.rooms.filter(function (r) { return r.key === key; })[0]; if (Rm)
tzwDoor(Rm, nm, x, z, ry); };
Dr("mbonga", C[0], C[1] - 12 + 5.4, Math.PI, "The door of the chief's house");
if (!TZW.st.noOffering) {
var ox = C[0] + 12, oz = C[1] + pr + 8;
tzwRoundHut(G, ox, oz, 1.3, { y: H(ox, oz), ry: Math.PI, h: 1.2 });
tzwPot(G, ox - 0.6, H(ox, oz), oz + 2.0, 0.5);
var qv = tzwCyl(G, 0.09, 0.11, 0.8, tzwMat("leather"), ox + 0.6, H(ox, oz), oz + 2.0, 8);
qv.rotation.z = 0.2;
for (var qa = 0; qa < 5; qa++)
tzwCyl(G, 0.008, 0.008, 0.5, tzwMat("oak"), ox + 0.6 + (qa - 2) * 0.02, H(ox, oz) + 0.7, oz + 2.0, 4);
}
if (huts[3])
Dr("hut", huts[3][0] + Math.sin(huts[3][3]) * (huts[3][2] + 0.8), huts[3][1] + Math.cos(huts[3][3]) * (huts[3][2] + 0.8), huts[3][3] + Math.PI, "The door of a house");
if (huts[8])
Dr("cook", huts[8][0] + Math.sin(huts[8][3]) * (huts[8][2] + 0.8), huts[8][1] + Math.cos(huts[8][3]) * (huts[8][2] + 0.8), huts[8][3] + Math.PI, "The cooking-house");
[[-20, -34], [22, -36], [-34, 6], [30, 10]].forEach(function (q) { tzwGranary(G, C[0] + q[0], C[1] + q[1]); });
var sm = new THREE.Group(), smx = C[0] + 16, smz = C[1] + 14;
sm.position.set(smx, H(smx, smz), smz);
G.add(sm);
[[-2, -1.6], [2, -1.6], [-2, 1.6], [2, 1.6]].forEach(function (q) { tzwCyl(sm, 0.08, 0.1, 2.6, tzwMat("darkbark"), q[0], 0, q[1], 6); });
var smr = new THREE.Mesh(tzwGeo("tzShelterR", function () { var c = new THREE.ConeGeometry(3.4, 1.6, 4, 1, true); c.rotateY(Math.PI / 4); c.translate(0, 0.8, 0); return c; }), tzwThatchM());
smr.material.side = THREE.DoubleSide;
smr.position.y = 2.5;
smr.scale.set(1.2, 1, 0.95);
sm.add(smr);
tzwCyl(sm, 0.6, 0.7, 0.6, tzwMat("clay"), 0, 0, 0, 10);
if (!lite)
tzwFire(sm, 0, 0.6, 0, 0.4);
tzwBox(sm, 0.6, 0.5, 0.4, tzwMat("darkrock"), 1.3, 0, 0.4);
tzwBox(sm, 0.8, 0.3, 0.5, tzwLam(0x5A3A2A), -1.4, 0, 0.2);
var pt = new THREE.Group(), ptx = C[0] - 18, ptz = C[1] + 12;
pt.position.set(ptx, H(ptx, ptz), ptz);
G.add(pt);
[[-2, -1.6], [2, -1.6], [-2, 1.6], [2, 1.6]].forEach(function (q) { tzwCyl(pt, 0.08, 0.1, 2.6, tzwMat("darkbark"), q[0], 0, q[1], 6); });
var ptr = new THREE.Mesh(smr.geometry, tzwThatchM());
ptr.position.y = 2.5;
ptr.scale.set(1.2, 1, 0.95);
pt.add(ptr);
for (var p = 0; p < (lite ? 6 : 12); p++)
tzwPot(pt, -1.6 + (p % 4) * 1.0, 0, -1 + Math.floor(p / 4) * 0.9, 0.4 + (p % 3) * 0.12);
for (var f = 0; f < (lite ? 3 : 6); f++) {
var fa = f / 6 * Math.PI * 2 + 0.5, fx = C[0] + Math.sin(fa) * 14, fz = C[1] + Math.cos(fa) * 14;
if (f < 3 || !lite)
tzwFire(G, fx, H(fx, fz), fz, 0.6);
tzwPot(G, fx + 1.3, H(fx + 1.3, fz), fz, 0.35);
tzwMortar(G, fx - 1.6, fz - 1.0);
G.children[G.children.length - 1].position.y = H(fx - 1.6, fz - 1.0);
}
for (var c = 0; c < (lite ? 4 : 8); c++) {
var cx = C[0] - 24 + c * 7, cz = TZW_CO.vil[1] + 76 + (c % 2) * 3;
var ry = tzwRiverY(cx);
tzwCanoe(G, cx, Math.max(H(cx, cz), ry) + 0.05, cz, 0.4 + (c % 3) * 0.2, 5 + (c % 3));
}
tzwRack(G, C[0] - 10, C[1] + 64, 0.2, "fish");
tzwRack(G, C[0] + 12, C[1] + 62, -0.3, "fish");
tzwRack(G, C[0] - 8, C[1] - 28, 0.1, "cloth");
var big = [{ x: C[0] + 3, z: C[1] + 2, y: H(C[0] + 3, C[1] + 2), s: 0.85, ry: 1.2, v: 1 }];
tzjPlace(G, "canopy", big, { solid: true });
tzwLog(G, C[0] - 2, C[1] + 5, 0.3, 5);
tzwLog(G, C[0] + 7, C[1] - 1, 1.6, 4);
var gpx = C[0] - 8, gpz = C[1] - 4;
tzwCyl(G, 0.22, 0.26, 3.4, tzwMat("darkbark"), gpx, H(gpx, gpz), gpz, 9);
for (var gb = 0; gb < 3; gb++)
tzwCyl(G, 0.27, 0.27, 0.08, tzwLam(0x6A4A2A), gpx, H(gpx, gpz) + 0.8 + gb * 0.9, gpz, 9);
if (TZW.st.feast) {
for (var ff = 0; ff < (lite ? 5 : 10); ff++) {
var fa2 = ff / (lite ? 5 : 10) * Math.PI * 2, fx2 = gpx + Math.sin(fa2) * 7, fz2 = gpz + Math.cos(fa2) * 7;
tzwFire(G, fx2, H(fx2, fz2), fz2, 0.9);
if (ff % 2 === 0)
tzwPot(G, fx2 + 0.9, H(fx2 + 0.9, fz2), fz2, 0.45);
}
}
var fieldOk = function (x, z) { var d = Math.hypot(x - C[0], z - C[1]); return d > 62 && d < 124 && z < C[1] + 40 && tzwPathD(x, z, TZW_RIVER) > 30 && tzwPathD(x, z, TZW_CO_PATHS.trail) > 6; };
tzjPlace(G, "banana", tzwScatter(510, lite ? 40 : 140, C[0] - 130, C[1] - 130, C[0] + 130, C[1] + 40, function (x, z) { return fieldOk(x, z) && x < C[0] - 20; }, H, 0.9, 1.2));
var maize = [];
for (var mz = 0; mz < (lite ? 6 : 12); mz++)
for (var mx = 0; mx < (lite ? 14 : 28); mx++) {
var x = C[0] + 20 + mx * 2.6, z = C[1] - 120 + mz * 2.4;
if (fieldOk(x, z))
maize.push({ x: x, z: z, y: H(x, z), s: 0.9 + ((mx * 7 + mz * 3) % 5) * 0.05, ry: mx + mz });
}
tzwPlant(G, "reeds", maize.filter(function (m, i) { return i % 2 === 0; }));
tzwPlant(G, "grass", maize.filter(function (m, i) { return i % 2 === 1; }), { col: 0x8AA850 });
tzjPlant(G, "bush", tzwScatter(511, lite ? 40 : 140, C[0] - 130, C[1] - 130, C[0] + 130, C[1] + 40, function (x, z) { return fieldOk(x, z) && x >= C[0] - 20 && x < C[0] + 20; }, H, 0.4, 0.6), { col: 0x5A8A3A });
var wh = new THREE.Group(), whx = C[0] + 80, whz = C[1] - 60;
wh.position.set(whx, H(whx, whz), whz);
G.add(wh);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { tzwCyl(wh, 0.06, 0.07, 3.2, tzwMat("darkbark"), q[0] * 0.9, 0, q[1] * 0.9, 5); });
tzwBox(wh, 2.2, 0.12, 2.2, tzwMat("planks"), 0, 2.2, 0);
var whr = new THREE.Mesh(smr.geometry, tzwThatchM());
whr.position.y = 3.2;
whr.scale.set(0.7, 0.8, 0.7);
wh.add(whr);
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, -1.0, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
var lite = tzwLite(), grey = tzwShine(0x5A6066, 0.6, 0.35), dark = tzwShine(0x2A2E32, 0.7, 0.3), white = tzwLam(0xE8E8E4), wood = tzwMat("deck");
var hull = new THREE.Mesh(tzwGeo("tzCruHull", function () { var s = new THREE.Shape(); s.moveTo(0, -56); s.quadraticCurveTo(8, -40, 8.4, -10); s.lineTo(8.2, 40); s.quadraticCurveTo(7, 52, 0, 54); s.quadraticCurveTo(-7, 52, -8.2, 40); s.lineTo(-8.4, -10); s.quadraticCurveTo(-8, -40, 0, -56); var e = new THREE.ExtrudeGeometry(s, { depth: 9, bevelEnabled: false, curveSegments: 10 }); e.rotateX(-Math.PI / 2); e.translate(0, -3, 0); return e; }), grey);
g.add(hull);
var dk = new THREE.Mesh(tzwGeo("tzCruDeck", function () { var s = new THREE.Shape(); s.moveTo(0, -55); s.quadraticCurveTo(7.6, -40, 8, -10); s.lineTo(7.8, 40); s.quadraticCurveTo(6.6, 51, 0, 53); s.quadraticCurveTo(-6.6, 51, -7.8, 40); s.lineTo(-8, -10); s.quadraticCurveTo(-7.6, -40, 0, -55); return new THREE.ShapeGeometry(s, 10); }), wood);
dk.rotation.x = -Math.PI / 2;
dk.position.y = 6.02;
g.add(dk);
tzwBox(g, 12, 4, 40, grey, 0, 6, -4);
tzwBox(g, 10, 3, 14, grey, 0, 10, -16);
tzwBox(g, 8, 2.4, 6, white, 0, 13, -20);
tzwBox(g, 9, 0.3, 4, dark, 0, 15.4, -20);
[-6, 8].forEach(function (fz) { tzwCyl(g, 1.6, 1.7, 12, tzwShine(0x2A2A2A, 0.7, 0.3), 0, 10, fz, 14); tzwCyl(g, 1.65, 1.65, 1.2, tzwLam(0x1A1A1A), 0, 21, fz, 14); });
tzwCyl(g, 0.35, 0.45, 26, tzwMat("oak"), 0, 10, -30, 8);
tzwCyl(g, 0.3, 0.4, 22, tzwMat("oak"), 0, 10, 24, 8);
[[0, -40, 1], [0, 34, -1]].forEach(function (q) { var t = new THREE.Group(); t.position.set(q[0], 6, q[1]); g.add(t); tzwCyl(t, 2.2, 2.4, 1.8, grey, 0, 0, 0, 14); var gun = tzwCyl(t, 0.22, 0.26, 7, dark, 0, 0, 0, 8); gun.rotation.x = Math.PI / 2 * q[2]; gun.position.set(0, 1.1, 3.4 * q[2]); });
for (var i = 0; i < (lite ? 2 : 5); i++)
[-1, 1].forEach(function (s) { var t = new THREE.Group(); t.position.set(s * 8.6, 4.2, -24 + i * 11); g.add(t); tzwCyl(t, 0.9, 0.9, 1.2, grey, 0, 0, 0, 10); var gn = tzwCyl(t, 0.12, 0.14, 3, dark, 0, 0, 0, 6); gn.rotation.z = Math.PI / 2 * s; gn.position.set(s * 1.6, 0.6, 0); });
var fl = tzwFlag(g, "fr", 3.6, 2.4);
fl.position.set(0, 7.2, -56);
var fl2 = tzwFlag(g, "fr", 2.4, 1.6);
fl2.position.set(0, 35, -30);
tzwSmoke(g, 0, 22, -6, 0x6A6A6A, lite ? 3 : 6);
return g;
},
function (P, kind, w, h) {
var t = tzwCanvas("flag:" + kind, 128, 84, function (x, W, H) {
if (kind === "fr") {
x.fillStyle = "#1E2A6A";
x.fillRect(0, 0, W / 3, H);
x.fillStyle = "#F4F2EC";
x.fillRect(W / 3, 0, W / 3, H);
x.fillStyle = "#C8202A";
x.fillRect(2 * W / 3, 0, W / 3, H);
}
else if (kind === "usa") {
for (var i = 0; i < 13; i++) {
x.fillStyle = i % 2 ? "#F4F2EC" : "#B8202A";
x.fillRect(0, i * H / 13, W, H / 13 + 1);
}
x.fillStyle = "#1E2A5A";
x.fillRect(0, 0, W * 0.42, H * 7 / 13);
x.fillStyle = "#F4F2EC";
for (var s = 0; s < 30; s++)
x.fillRect(4 + (s % 6) * 8, 3 + Math.floor(s / 6) * 8, 2, 2);
}
else {
x.fillStyle = "#B8202A";
x.fillRect(0, 0, W, H);
x.fillStyle = "#1E2A6A";
x.fillRect(0, 0, W / 2, H / 2);
x.strokeStyle = "#F4F2EC";
x.lineWidth = 6;
x.beginPath();
x.moveTo(0, 0);
x.lineTo(W / 2, H / 2);
x.moveTo(W / 2, 0);
x.lineTo(0, H / 2);
x.stroke();
x.strokeStyle = "#C8202A";
x.lineWidth = 3;
x.stroke();
x.fillStyle = "#F4F2EC";
x.fillRect(W / 4 - 4, 0, 8, H / 2);
x.fillRect(0, H / 4 - 4, W / 2, 8);
x.fillStyle = "#C8202A";
x.fillRect(W / 4 - 2, 0, 4, H / 2);
x.fillRect(0, H / 4 - 2, W / 2, 4);
}
});
var p = new THREE.PlaneGeometry(w, h, 6, 1);
p.translate(w / 2, 0, 0);
var pa = p.attributes.position;
for (var i2 = 0; i2 < pa.count; i2++)
pa.setZ(i2, Math.sin(pa.getX(i2) * 1.6) * 0.12 * w);
p.computeVertexNormals();
var m = new THREE.Mesh(p, tzwLam(0xFFFFFF, { map: t, mapk: "flag:" + kind, ds: 1 }));
m.rotation.y = Math.PI / 2;
P.add(m);
return m;
},
function (P, x, z, ry, o) {
o = o || {};
if (typeof prwShip !== "function")
return null;
var g = null, l0 = typeof PRW !== "undefined" ? PRW.lite : false;
try {
if (typeof PRW !== "undefined")
PRW.lite = tzwLite();
g = prwShip(o.kind || "brig", o);
}
catch (e) {
if (window.console)
console.warn("[tarzan] ship", e);
g = null;
}
finally {
if (typeof PRW !== "undefined")
PRW.lite = l0;
}
if (!g)
return null;
g.position.set(x, -1.0, z);
g.rotation.y = ry || 0;
g.userData.keep = 1;
P.add(g);
return g;
},
function (G) {
var st = TZW.st, C = TZW_CO.vil, H = tzwCoH;
if (!st.vilEmpty) {
var P = TZP.villager, list = [["A woman pounding cassava", "f", "tzvillf", "The mortar is never quiet in this village. Come, sit in the shade if you are tired.", P], ["A smith at the bellows", "m", "tzvillm", "This iron we bring from far up the river. These spear-heads are my work.", P],
["A potter shaping a pot", "f", "tzvillf", "Clay from the river bank, fired in the evening. This one is for oil.", P], ["A hunter mending his bow", "m", "tzvillm", "The forest gives us meat if we are patient. And quiet.", P], ["An old man weaving a mat", "m", "tzvillm", "I remember the land we came from, before the white soldiers drove us here. Long ago now.", P],
["A girl with a basket of plantains", "f", "tzvillf", "From the fields. My mother says we will eat well tonight.", P, true], ["A boy herding goats", "m", "tzvillc", "My goats know my voice. Listen: they come.", P, true], ["A fisherman with his net", "m", "tzvillm", "The river is full of fish this season. The canoes go out at dawn.", P],
["A woman carrying water", "f", "tzvillf", "Water from the river, twice a day. The path is steep, but my neck is strong.", P], ["A drummer", "m", "tzvillm", "The drum speaks to the next village. Can you hear what it says?", P], ["A grandmother shelling beans", "f", "tzvillf", "Sit with me. Tell me where you come from, stranger.", P], ["A young man carving a stool", "m", "tzvillm", "A stool for my father. Every chief needs a good stool.", P],
["A mother with her baby", "f", "tzvillf", "Hush, little one. The stranger means no harm.", P], ["Two children playing", "m", "tzvillc", "We are playing at hunting. I am the leopard!", P, true], ["A woman dyeing cloth", "f", "tzvillf", "Indigo, and bark for the brown. See how it takes?", P], ["A warrior at the gate", "m", "tzvillm", "Who comes? Speak, and come in peace.", P]];
tzwCrowd("vil", list, C[0] - 34, C[1] - 34, C[0] + 34, C[1] + 34, { wander: 5, skin: [0x4A2C1C, 0x5A3422, 0x3E2418, 0x6A3E28, 0x52301E], ok: function (x, z) { return Math.hypot(x - C[0], z - C[1]) < 46; } });
tzwCrowd("vilf", [["A woman hoeing the cassava", "f", "tzvillf", "The rains will come soon. Everything must be in the ground before.", P], ["A man clearing the field", "m", "tzvillm", "Each year a little more forest becomes field.", P], ["A girl scaring birds from the maize", "f", "tzvillf", "Shoo! Shoo! The birds want it more than we do.", P, true]], C[0] - 110, C[1] - 110, C[0] + 110, C[1] - 60, { wander: 6, skin: [0x4A2C1C, 0x5A3422, 0x3E2418] });
}
},
function (G) {
var st = TZW.st, A = TZW_CO.amph, H = tzwCoH, lite = tzwLite(), R = wRand(601), list = [];
if (!st.noTribe) {
var n = lite ? 5 : 11;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.4, r = 30 + R() * 40, x = A[0] + Math.cos(a) * r, z = A[1] + Math.sin(a) * r, k = i === 0 ? "kerchak" : i === 1 ? "kala" : "mangani";
if (i === 0 && st.kerchakDead)
k = "mangani";
var b = tzwBeast(G, k, x, H(x, z), z, R() * 6.28, { s: 1.0 });
if (b)
list.push({ g: b, x0: x, z0: z, r: 12, sp: 0.7 });
}
}
if (!st.saborDead) {
var sx = TZW_CO.hole[0] + 18, sz = TZW_CO.hole[1] + 8;
var sb = tzwBeast(G, "sabor", sx, H(sx, sz), sz, -1.2, {});
if (sb)
list.push({ g: sb, x0: sx, z0: sz, r: 16, sp: 0.9 });
}
[[300, -260], [318, -266], [290, -276]].forEach(function (q, i) { if (lite && i)
return; var e = tzwBeast(G, "elephant", q[0], H(q[0], q[1]), q[1], 0.6 + i, { s: 1.0 }); if (e)
list.push({ g: e, x0: q[0], z0: q[1], r: 14, sp: 0.5 }); });
if (!lite)
[[120, -200], [132, -192]].forEach(function (q) { var bo = tzwBeast(G, "boar", q[0], H(q[0], q[1]), q[1], 1, {}); if (bo)
list.push({ g: bo, x0: q[0], z0: q[1], r: 10, sp: 0.8 }); });
TZW.ticks.push(function (dt) {
list.forEach(function (B) {
var g = B.g;
if (!g.parent)
return;
B.t = (B.t || R() * 8) - dt;
if (B.t <= 0) {
B.t = 5 + R() * 9;
B.tx = B.x0 + (R() - 0.5) * B.r * 2;
B.tz = B.z0 + (R() - 0.5) * B.r * 2;
}
if (B.tx == null)
return;
var dx = B.tx - g.position.x, dz = B.tz - g.position.z, d = Math.hypot(dx, dz);
if (d < 0.5)
return;
var s = Math.min(d, B.sp * dt);
g.position.x += dx / d * s;
g.position.z += dz / d * s;
g.position.y = H(g.position.x, g.position.z);
var ty = Math.atan2(-dx, -dz), dr = ((ty - g.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
g.rotation.y += dr * Math.min(1, dt * 3);
});
});
},
function (G) {
var lite = tzwLite(), st = TZW.st;
var sea = tzwWater(G, 0, 0, 5000, 5000, 0, 0x24546A, 0.94);
sea.userData.fx = 0.15;
sea.userData.fz = 0.5;
if (st.land) {
var far = tzwTerrain(G, 600, -1600, 500, 3200, 40, function (x, z) { return x < 700 ? -3 : (x - 700) * 0.06 + tzwFbm(x * 0.01, z * 0.01, 3) * 16; }, tzwMat("meadow"), function (x, z, y, c) { c.setRGB(0.18, 0.3, 0.14); });
}
if (st.warship && typeof tzwCruiser === "function")
tzwCruiser(G, 520, -260, 1.1);
var ship = tzwSailShip(G, 0, 0, 0, { kind: "ship", hull: 0x2E2620, band: 0x2E2620, flag: "eng", furled: !!st.furled, live: true, sails: 0xEAE2CC });
var dy = 4.86, L = TZW_FU.L, B = L * 0.27, qy = null, qz = -13.6;
if (ship) {
ship.position.y = 0;
dy = ship.userData.dy;
var qd = ship.userData.qd;
qy = qd && qd.y;
qz = qd ? qd.z + 1 : qz;
TZW.fuShip = ship;
}
else {
var h = tzwBox(G, B, dy, L, tzwMat("hull"), 0, 0, 0);
tzwBox(G, B * 0.95, 0.1, L * 0.95, tzwMat("deck"), 0, dy, 0);
}
TZW.fuDy = dy + 0.11;
var d0 = dy + 0.11;
tzwFloor(0, 1.5, B * 0.78, L * 0.62, d0);
tzwFloor(0, 14.2, B * 0.5, 5, d0);
if (qy != null) {
tzwFloor(0, -14.3, B * 0.78, 8.6, qy);
[-1, 1].forEach(function (s) { tzwRamp(s * 2.6, -8.6, 1.0, 2.6, d0, qy, Math.PI); });
}
[-1, 1].forEach(function (s) { tzwSolid(s * (B * 0.43), 0, 0.4, L * 0.92, d0 - 0.5, d0 + 1.2); });
tzwSolid(0, -L * 0.47, B, 0.4, d0 - 0.5, d0 + 6);
tzwSolid(0, L * 0.45, B * 0.5, 0.4, d0 - 0.5, d0 + 1.2);
var dk = new THREE.Group();
dk.position.y = d0;
G.add(dk);
for (var c = 0; c < (lite ? 3 : 6); c++) {
var cs = new THREE.Mesh(tzwGeo("tzCask", function () { var p = []; for (var i = 0; i <= 8; i++) {
var t = i / 8;
p.push(new THREE.Vector2(0.34 + Math.sin(t * Math.PI) * 0.08, t * 0.9));
} return new THREE.LatheGeometry(p, 12); }), tzwMat("oak"));
cs.position.set(-3.0 + (c % 2) * 0.8, 0, 6 + Math.floor(c / 2) * 0.8);
dk.add(cs);
tzwSolid(-3.0 + (c % 2) * 0.8, 6 + Math.floor(c / 2) * 0.8, 0.7, 0.7, d0 - 0.5, d0 + 0.9);
}
for (var r = 0; r < (lite ? 4 : 8); r++) {
var co = new THREE.Mesh(tzwGeo("tzCoil", function () { return new THREE.TorusGeometry(0.3, 0.06, 6, 16); }), tzwMat("rope"));
co.rotation.x = Math.PI / 2;
co.position.set(r % 2 ? 3.4 : -3.4, 0.06, -6 + r * 2.6);
dk.add(co);
}
tzwBox(dk, 0.6, 1.8, 0.6, tzwLam(0x2A2A2E), 1.4, 0, 9.6);
if (!lite)
tzwSmoke(dk, 1.4, 1.9, 9.6, 0x8A8A8A, 4);
var bt = new THREE.Group();
bt.position.set(-2.0, 0.5, 2.6);
dk.add(bt);
var bh = new THREE.Mesh(tzwGeo("tzBoat", function () { var s = new THREE.SphereGeometry(1, 14, 7, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); s.scale(0.85, 0.55, 2.6); s.rotateX(Math.PI); s.translate(0, 0.55, 0); return s; }), tzwMat("hull"));
bh.material.side = THREE.DoubleSide;
bt.add(bh);
for (var th = 0; th < 4; th++)
tzwBox(bt, 1.5, 0.06, 0.18, tzwMat("oak"), 0, 0.35, -1.6 + th * 1.05);
tzwSolid(-2.0, 2.6, 1.9, 5.4, d0 - 0.5, d0 + 1.2);
var coop = tzwBox(dk, 1.6, 0.8, 0.8, tzwMat("planks"), 2.8, 0, -3.4);
for (var cb = 0; cb < 6; cb++)
tzwBox(dk, 0.04, 0.7, 0.04, tzwLam(0x2A1E14), 2.1 + cb * 0.28, 0.05, -2.98);
var comp = new THREE.Group();
comp.position.set(0, d0, -9.2);
G.add(comp);
tzwBox(comp, 1.4, 1.1, 1.6, tzwMat("darkoak"), 0, 0, 0);
tzwBox(comp, 1.0, 0.9, 0.06, tzwLam(0x141210), 0, 0.05, 0.82);
var sct = new THREE.Group();
sct.position.set(0, d0, 11.6);
G.add(sct);
tzwBox(sct, 1.1, 0.8, 1.2, tzwMat("darkoak"), 0, 0, 0);
var Dr = function (key, x, z, ry, nm) { var Rm = TZW.rooms.filter(function (q) { return q.key === key; })[0]; if (!Rm)
return; tzwDoor(Rm, nm, x, z, ry); var S = TZW.spots[TZW.spots.length - 2]; if (S)
S.y = d0; };
Dr("stateroom", 0, -8.0, 0, "The companion-way down to the cabins");
Dr("fo", 0, 10.6, Math.PI, "The scuttle down to the forecastle");
tzwInDoor("stateroom", "captcab", 3.0, 1.6, "The captain's cabin", "go in");
if (ship && !lite) {
TZW.ticks.push(function (dt) { var t = TZW.t; ship.rotation.z = Math.sin(t * 0.6) * 0.012; ship.rotation.x = Math.sin(t * 0.43 + 1) * 0.008; });
}
},
function (G) {
var X = TZW_ROOMXZ.fuwalda, R;
R = tzwRoom(G, "stateroom", X.stateroom[0], X.stateroom[1], 7, 5, { wall: "oak", floor: "deck", ceil: "oak", name: "the Claytons' cabin", beams: true, lightI: 0.7, h: 2.4 });
tzwBed(R.g, -2.5, -0.8, Math.PI / 2, { cover: 0xE8E0CC, mat: "oak" });
tzwBed(R.g, -2.5, 1.4, Math.PI / 2, { cover: 0xD8D0C0, mat: "oak" });
tzwTable(R.g, 1.2, -1.0, 1.2, 0.8, 0.74, { mat: "darkoak" });
tzwChair(R.g, 1.2, -0.2, Math.PI, {});
tzwChest(R.g, 2.6, 1.6, 0.1, { y: 0, w: 1.1, h: 0.6, d: 0.6 });
tzwChest(R.g, 1.4, 1.7, -0.1, { y: 0, w: 0.9, h: 0.5, d: 0.5, mat: "leather" });
tzwWindowIn(R.g, -1.2, 1.3, -2.38, 0, 0.6, 0.5, { sky: 0x6A9AC8 });
tzwWindowIn(R.g, 1.2, 1.3, -2.38, 0, 0.6, 0.5, { sky: 0x6A9AC8 });
tzwCandle(R.g, 1.2, 0.74, -1.0, { brass: 1 });
R = tzwRoom(G, "captcab", X.captcab[0], X.captcab[1], 7, 5, { wall: "darkoak", floor: "deck", ceil: "oak", name: "the captain's cabin", beams: true, lightI: 0.7, h: 2.4 });
tzwTable(R.g, 0, -0.6, 2.0, 1.0, 0.76, { mat: "darkoak" });
tzwChair(R.g, 0, -1.6, 0, { arm: 1 });
tzwBox(R.g, 1.2, 0.01, 0.8, tzwLam(0xE8DCB8), 0, 0.77, -0.6);
tzwBed(R.g, 2.6, 0.6, Math.PI / 2, { cover: 0x5A4A3A, mat: "darkoak" });
for (var p = 0; p < 2; p++)
tzwBox(R.g, 0.36, 0.08, 0.06, tzwLam(0x1E1E22), -2.4 + p * 0.5, 1.6, -2.36);
tzwWindowIn(R.g, 0, 1.3, -2.38, 0, 0.8, 0.5, { sky: 0x6A9AC8 });
R = tzwRoom(G, "fo", X.fo[0], X.fo[1], 8, 6, { wall: "planks", floor: "deck", ceil: "planks", name: "the forecastle", beams: true, lightI: 0.5, h: 2.3 });
for (var b = 0; b < 4; b++) {
[-1, 1].forEach(function (s) { tzwBox(R.g, 0.9, 0.08, 1.9, tzwMat("oak"), s * 3.4, 0.5, -2 + b * 1.3 * 0); });
}
[-1, 1].forEach(function (s) { for (var t = 0; t < 2; t++) {
tzwBox(R.g, 0.9, 0.1, 2.0, tzwMat("oak"), s * 3.4, 0.4 + t * 1.0, -1.6);
tzwBox(R.g, 0.85, 0.08, 1.9, tzwLam(0x8A7A5A), s * 3.4, 0.5 + t * 1.0, -1.6);
tzwBox(R.g, 0.9, 0.1, 2.0, tzwMat("oak"), s * 3.4, 0.4 + t * 1.0, 1.0);
tzwBox(R.g, 0.85, 0.08, 1.9, tzwLam(0x7A6A5A), s * 3.4, 0.5 + t * 1.0, 1.0);
} });
for (var sc = 0; sc < 4; sc++)
tzwChest(R.g, -1.2 + sc * 0.8, -2.4, 0, { y: 0, w: 0.7, h: 0.45, d: 0.45 });
tzwTable(R.g, 0, 0.2, 1.4, 0.8, 0.7, { mat: "planks" });
},
function (G) {
var st = TZW.st, y = tzwFuDeckY();
if (st.noCrew)
return;
var P = TZP.sailor, list = [["A sailor coiling a line", "m", "tzsailor", "Mind your feet, sir. She's a lively one in this swell.", P], ["A sailor at the pump", "m", "tzsailor", "Pump, pump, pump. She leaks like a basket.", P], ["The helmsman", "m", "tzsailor", "Steady as she goes, sir. South by east.", P], ["A sailor splicing rope", "m", "tzsailor", "Captain's in a black mood again. Keep out of his way, I would.", P],
["A sailor scrubbing the deck", "m", "tzsailor", "Holystone, they call it. My knees call it something else.", P], ["The cook at the galley door", "m", "tzsailor", "Salt pork again. Don't look at me like that, it's all there is.", P], ["A sailor up from below", "m", "tzsailor", "Hot as an oven down there. Where's the wind gone?", P], ["A sailor mending a sail", "m", "tzsailor", "Needle, palm and twine. A sailor's work is never done.", P]];
tzwCrowd("fu", list, -2.8, -5, 2.8, 8, { y: y, wander: 2, sp: 0.4, ok: function (x, z) { return !(x < -1 && z > 0 && z < 5.5); }, skin: [0xE8C0A0, 0xD8A884, 0xC89874, 0x8A5A3A] });
},
function (x, z) {
var n = tzwFbm(x * 0.005, z * 0.005, 4), h = 6 + n * 16 + tzwFbm(x * 0.0015 + 3, z * 0.0015, 2) * 20;
var fd = Math.hypot(x - 10, z - 0);
if (fd < 120) {
var t = tzwSmooth(70, 120, fd);
h = h * t + (9 + tzwFbm(x * 0.02, z * 0.02, 2) * 1.2) * (1 - t);
}
var sd = tzwPathD(x, z, TZW_WI_RAIL);
if (sd < 40) {
var t2 = tzwSmooth(10, 40, sd);
h = h * t2 + (8 + x * 0.004) * (1 - t2);
}
var rd = tzwPathD(x, z, TZW_WI_ROADS.road);
if (rd < 12) {
var t3 = tzwSmooth(4, 12, rd);
h = h * t3 + tzwWiRoadY(x, z, h) * (1 - t3);
}
return h;
},
function (G) {
var lite = tzwLite(), st = TZW.st, H = tzwWiH, fire = !!st.fire, burnt = !!st.burnt;
tzwFar(G, H, [0.42, 0.38, 0.22], { edge: 600, rise: 40 });
tzwTerrain(G, -640, -640, 1280, 1280, lite ? 18 : 10, H, tzwMat("meadow"), function (x, z, y, c) {
var g = 0.82 + tzwFbm(x * 0.03, z * 0.03, 2) * 0.25, fd = Math.hypot(x - 10, z);
if ((fire || burnt) && z > 40 && fd > 90) {
c.setRGB(0.22 * g, 0.2 * g, 0.18 * g);
return;
}
if (fd < 100) {
c.setRGB(0.66 * g, 0.6 * g, 0.34 * g);
return;
}
c.setRGB(0.5 * g, 0.44 * g, 0.26 * g);
});
Object.keys(TZW_WI_ROADS).forEach(function (k) { tzwStrip(G, TZW_WI_ROADS[k], k === "road" || k === "south" ? 6 : 4, H, tzwMat("trail"), 0.06); });
tzwRailway(G, TZW_WI_RAIL, H);
tzwPoles(G, TZW_WI_RAIL, H, 48);
var C = TZW_WI.house, hy = H(C[0], C[1]), hs = new THREE.Group();
hs.position.set(C[0], hy, C[1]);
G.add(hs);
var sid = tzwMat("siding"), trim = tzwLam(0xF4F2EC), sh = tzwLam(0x2E5A3A), gl = tzwShine(0x1A2228, 0.2, 0.3);
tzwBox(hs, 12, 0.6, 8, tzwMat("stone"), 0, 0, 0);
tzwBox(hs, 12, 6.2, 8, sid, 0, 0.6, 0);
var rf = new THREE.Mesh(tzwGeo("tzWiRoof", function () { var s = new THREE.Shape(); s.moveTo(-4.8, 0); s.lineTo(0, 3.4); s.lineTo(4.8, 0); s.lineTo(-4.8, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 13, bevelEnabled: false }); e.translate(0, 0, -6.5); e.rotateY(Math.PI / 2); return e; }), tzwMat("shingle"));
rf.position.y = 6.8;
hs.add(rf);
tzwBox(hs, 1.0, 2.2, 1.0, tzwMat("brick"), 3.6, 8.4, 0);
for (var f = 0; f < 2; f++)
for (var w = 0; w < 4; w++) {
var wx = -4.5 + w * 3, wy = 1.6 + f * 3;
if (f === 0 && w === 1)
continue;
[4.03, -4.03].forEach(function (zz, k) { tzwBox(hs, 1.1, 1.7, 0.08, trim, wx, wy, zz); tzwBox(hs, 0.9, 1.5, 0.06, gl, wx, wy + 0.1, zz + (k ? -0.03 : 0.03)); if (!lite)
[-1, 1].forEach(function (s) { tzwBox(hs, 0.42, 1.6, 0.05, sh, wx + s * 0.8, wy + 0.05, zz + (k ? -0.06 : 0.06)); }); });
}
tzwBox(hs, 1.2, 2.4, 0.1, tzwMat("darkoak"), -1.5, 0.6, 4.05);
tzwBox(hs, 12.6, 0.2, 3, tzwMat("planks"), 0, 0.6, 5.5);
for (var p = 0; p < 6; p++)
tzwBox(hs, 0.16, 2.8, 0.16, trim, -6 + p * 2.4, 0.8, 6.9);
tzwBox(hs, 12.8, 0.2, 3.2, tzwMat("shingle"), 0, 3.6, 5.5);
for (var rl = 0; rl < 12; rl++)
tzwBox(hs, 0.06, 0.8, 0.06, trim, -6 + rl * 1.1, 0.8, 6.9);
tzwBox(hs, 12.4, 0.08, 0.1, trim, 0, 1.6, 6.9);
tzwFloor(C[0], C[1] + 5.5, 12.6, 3, hy + 0.8);
tzwSolid(C[0], C[1], 12, 8, hy - 1, hy + 10);
var Dr = function (key, x, z, ry, nm) { var Rm = TZW.rooms.filter(function (q) { return q.key === key; })[0]; if (Rm)
tzwDoor(Rm, nm, x, z, ry); };
Dr("parlour", C[0] - 1.5, C[1] + 5.2, 0, "The front door of the farmhouse");
if (!fire && !lite)
tzwSmoke(hs, 3.6, 10.6, 0, 0x9A9A9A, 4);
var B = TZW_WI.barn, bb = new THREE.Group(), by = H(B[0], B[1]);
bb.position.set(B[0], by, B[1]);
bb.rotation.y = 0.1;
G.add(bb);
tzwBox(bb, 14, 6, 10, tzwS("siding", 0x9A3A2A, 2), 0, 0, 0);
tzwBox(bb, 3.2, 4.2, 0.1, tzwS("siding", 0x6A2A1A, 2), 0, 0, 5.04);
tzwBox(bb, 0.2, 4.4, 0.14, tzwLam(0xF4F0E4), -1.6, 0, 5.08);
tzwBox(bb, 0.2, 4.4, 0.14, tzwLam(0xF4F0E4), 1.6, 0, 5.08);
Dr("barn", B[0] + 0.5, B[1] + 5.6, 0, "The big doors of the barn");
var br = new THREE.Mesh(rf.geometry, tzwMat("shingle"));
br.scale.set(1.15, 1.1, 1.2);
br.position.y = 6;
bb.add(br);
tzwBox(bb, 4, 4.4, 0.12, tzwS("siding", 0x7A2A20, 2), 0, 0, 5.04);
tzwBox(bb, 1.6, 1.4, 0.12, tzwLam(0x1A1410), 0, 6.4, 5.04);
tzwSolid(B[0], B[1], 14.4, 10.4, by - 1, by + 10, 0.1);
var wl = new THREE.Group(), wly = H(16, 4);
wl.position.set(16, wly, 4);
G.add(wl);
tzwCyl(wl, 0.7, 0.75, 0.9, tzwMat("stone"), 0, 0, 0, 14);
[-0.6, 0.6].forEach(function (x) { tzwBox(wl, 0.12, 1.8, 0.12, tzwMat("oak"), x, 0.9, 0); });
tzwBox(wl, 1.6, 0.12, 1.2, tzwMat("shingle"), 0, 2.7, 0);
tzwRound(16, 4, 0.8);
for (var wp = 0; wp < (lite ? 8 : 20); wp++) {
var lg = tzwCyl(G, 0.15, 0.15, 1.2, tzwMat("bark"), -14 + (wp % 5) * 0.32, H(-14, -6) + 0.15 + Math.floor(wp / 5) * 0.3, -6, 7);
lg.rotation.z = Math.PI / 2;
}
tzwPlant(G, "tree", tzwScatter(901, lite ? 10 : 24, -70, 4, -24, 50, function () { return true; }, H, 0.5, 0.7), { col: 0x8A9A3A });
tzwPaling(G, [[-80, -60], [80, -60], [80, 70], [-80, 70], [-80, -30]], H, {});
tzwCart(G, 44, -4, 1.2, {});
var woodOk = function (x, z) { return Math.hypot(x - 10, z) > 72 && Object.keys(TZW_WI_ROADS).every(function (k) { return tzwPathD(x, z, TZW_WI_ROADS[k]) > 7; }) && tzwPathD(x, z, TZW_WI_RAIL) > 16 && Math.hypot(x - TZW_WI.station[0], z - TZW_WI.station[1]) > 56; };
var south = function (x, z) { return (fire || burnt) && z > 40; };
tzwConifer(G, tzwScatter(902, lite ? 140 : 420, -620, -620, 620, 620, function (x, z) { return woodOk(x, z) && !south(x, z); }, H, 0.9, 1.4));
tzwBirch(G, tzwScatter(903, lite ? 60 : 200, -620, -620, 620, 620, function (x, z) { return woodOk(x, z) && !south(x, z); }, H, 0.8, 1.2));
[0xC8541E, 0xE89A2A, 0xB83A1E, 0xD8B84A].forEach(function (col, i) { tzjPlant(G, "tree", tzwScatter(904 + i, lite ? 30 : 90, -620, -620, 620, 620, function (x, z) { return woodOk(x, z) && !south(x, z); }, H, 0.8, 1.3), { col: col }); });
tzjPlant(G, "bush", tzwScatter(908, lite ? 80 : 300, -620, -620, 620, 620, function (x, z) { return woodOk(x, z) && !south(x, z); }, H, 0.6, 1.2), { col: 0x8A6A2A });
var nearRd = function (x, z) { return tzwPathD(x, z, TZW_WI_ROADS.south) < 95 || tzwPathD(x, z, TZW_WI_ROADS.road) < 80; };
var band = function (x, z) { return woodOk(x, z) && nearRd(x, z); };
tzwConifer(G, tzwScatter(911, lite ? 260 : 900, -420, -300, 260, 620, function (x, z) { return band(x, z) && !south(x, z); }, H, 0.9, 1.5));
tzwBirch(G, tzwScatter(912, lite ? 110 : 380, -420, -300, 260, 620, function (x, z) { return band(x, z) && !south(x, z); }, H, 0.8, 1.3));
[0xC8541E, 0xE89A2A, 0xB83A1E].forEach(function (col, i) { tzjPlant(G, "tree", tzwScatter(913 + i, lite ? 40 : 140, -420, -300, 260, 620, function (x, z) { return band(x, z) && !south(x, z); }, H, 0.8, 1.3), { col: col }); });
tzjPlant(G, "bush", tzwScatter(917, lite ? 160 : 600, -420, -300, 260, 620, function (x, z) { return band(x, z) && !south(x, z); }, H, 0.6, 1.3), { col: 0x6A5A2A });
if (fire || burnt) {
var bandDead = tzwScatter(918, lite ? 200 : 700, -420, 40, 260, 620, band, H, 0.8, 1.4);
tzwDeadTrees(G, bandDead);
if (fire) {
var R2 = wRand(919), along = [];
for (var fz = 50; fz < 520; fz += lite ? 26 : 11) {
along.push(fz);
}
along.forEach(function (fz, i) {
var best = null;
for (var q = 0; q < TZW_WI_ROADS.south.length - 1; q++) {
var a = TZW_WI_ROADS.south[q], b = TZW_WI_ROADS.south[q + 1];
if (fz >= a[1] && fz <= b[1]) {
var t = (fz - a[1]) / (b[1] - a[1]);
best = a[0] + (b[0] - a[0]) * t;
}
}
if (best == null)
return;
var side = i % 2 ? 1 : -1, fx = best + side * (9 + R2() * 16);
tzwBlaze(G, fx, H(fx, fz), fz, 1.8 + R2() * 1.6);
if (i % 3 === 0)
tzwSmoke(G, fx, H(fx, fz) + 3, fz, 0x2A2420, lite ? 4 : 7);
});
}
}
if (fire || burnt) {
var dead = tzwScatter(909, lite ? 120 : 360, -620, 40, 620, 620, woodOk, H, 0.8, 1.3);
tzwDeadTrees(G, dead);
if (fire) {
var R = wRand(910);
for (var fi = 0; fi < (lite ? 8 : 22); fi++) {
var t = dead[Math.floor(R() * dead.length)];
if (t)
tzwBlaze(G, t.x, t.y, t.z, 1.6 + R() * 1.4);
}
for (var sm = 0; sm < (lite ? 4 : 10); sm++) {
var sx = -300 + sm * 60, sz = 120 + (sm % 3) * 40;
tzwSmoke(G, sx, H(sx, sz) + 4, sz, 0x3A3430, 8);
}
}
}
var S = TZW_WI.station, sy = H(S[0], S[1]), sg = new THREE.Group();
sg.position.set(S[0], sy, S[1]);
G.add(sg);
tzwBox(sg, 14, 0.6, 5, tzwMat("planks"), 0, 0, -12);
tzwBox(sg, 10, 4.2, 6, tzwS("siding", 0xC8B070, 2), 0, 0.6, -2);
var dr = new THREE.Mesh(rf.geometry, tzwMat("shingle"));
dr.scale.set(0.75, 0.7, 0.9);
dr.position.y = 4.8;
dr.position.z = -2;
sg.add(dr);
tzwBox(sg, 1.2, 2.4, 0.1, tzwMat("darkoak"), 0, 0.6, -5.05);
tzwSign(sg, "BIRCH LAKE", 3.4, 0.6, 0, 4.0, -5.08, Math.PI, { bg: "#F2EAD4", ink: "#2A1A10" });
var tk = new THREE.Group();
tk.position.set(12, 0, -6);
sg.add(tk);
for (var tl = 0; tl < 4; tl++)
tzwBox(tk, 0.2, 6, 0.2, tzwMat("darkoak"), tl % 2 ? 1.4 : -1.4, 0, tl < 2 ? 1.4 : -1.4);
tzwCyl(tk, 2.0, 2.0, 3.2, tzwS("siding", 0x8A6A4A, 2), 0, 6, 0, 16);
var tc = new THREE.Mesh(tzwGeo("tzTankCap", function () { return new THREE.ConeGeometry(2.2, 1.2, 16); }), tzwMat("shingle"));
tc.position.y = 9.8;
tk.add(tc);
tzwFloor(S[0], S[1] - 12, 14, 5, sy + 0.6);
tzwSolid(S[0], S[1] - 2, 10, 6, sy - 1, sy + 6);
Dr("depot", S[0], S[1] - 6, Math.PI, "The door of the station");
var trimW = tzwLam(0xF4F0E4), glW = tzwShine(0x1A2228, 0.2, 0.3);
[-3, 3].forEach(function (wx) { tzwBox(sg, 1.2, 1.7, 0.08, trimW, wx, 1.6, 1.04); tzwBox(sg, 1.0, 1.5, 0.06, glW, wx, 1.7, 1.08); tzwBox(sg, 0.46, 1.6, 0.05, tzwLam(0x2E5A3A), wx - 0.86, 1.65, 1.1); tzwBox(sg, 0.46, 1.6, 0.05, tzwLam(0x2E5A3A), wx + 0.86, 1.65, 1.1); });
tzwBox(sg, 1.8, 2.4, 0.08, tzwMat("darkoak"), 0, 0.6, 1.05);
tzwBox(sg, 2.2, 0.2, 0.16, trimW, 0, 3.0, 1.08);
tzwSign(sg, "BIRCH LAKE", 3.0, 0.5, 0, 3.5, 1.12, 0, { bg: "#F2EAD4", ink: "#2A1A10" });
tzwBox(sg, 11, 0.3, 2.4, tzwMat("planks"), 0, 0, 2.3);
tzwBench(sg, -3.2, 2.8, Math.PI, { w: 2.2 });
[[2.4, 2.6, 0x6A3A1A], [3.1, 2.4, 0x3A2A1A], [2.7, 2.5, 0x8A6A3A]].forEach(function (q, i) { tzwBox(sg, 0.9, 0.5, 0.55, tzwLam(q[2]), q[0], 0.3 + (i === 2 ? 0.5 : 0), q[1], 0.2 * i); });
for (var hp = 0; hp < 2; hp++)
tzwCyl(sg, 0.07, 0.07, 1.1, tzwMat("oak"), 6 + hp * 2.4, 0, 5.4, 6);
tzwBox(sg, 2.6, 0.08, 0.08, tzwMat("oak"), 7.2, 1.0, 5.4);
tzwLamp(G, S[0] - 6.5, S[1] + 3.6, H, {});
var hx = S[0] + 18, hz = S[1] + 32;
tzwTownHouse(G, hx, hz, 9, 7, 6, { y: H(hx, hz), ry: Math.PI, wall: "render", roof: "shingle", shut: 0x2A4A2A });
tzwBox(G, 9.4, 0.2, 2.2, tzwMat("planks"), hx, H(hx, hz) + 0.3, hz - 4.6);
for (var vp = 0; vp < 4; vp++)
tzwCyl(G, 0.08, 0.08, 2.8, tzwMat("oak"), hx - 4.2 + vp * 2.8, H(hx, hz) + 0.3, hz - 5.6, 6);
tzwSign(G, "BIRCH LAKE HOTEL", 3.6, 0.6, hx, H(hx, hz) + 3.6, hz - 3.56, Math.PI, { bg: "#F2EAD4", ink: "#2A1A10" });
Dr("inn", hx, hz - 4.2, Math.PI, "The door of the little hotel");
if (st.car)
tzwMotorCar(G, -14, -14, 0.8);
if (st.car2)
tzwMotorCar(G, 14, -16, -0.6);
if (st.hamlet) {
var hx2 = TZW_WI.station[0] + 18, hz2 = TZW_WI.station[1] + 32;
tzwMotorCar(G, hx2 - 7, hz2 - 14, Math.PI / 2);
tzwMotorCar(G, hx2 + 5, hz2 - 14, Math.PI / 2);
if (st.canlerCar)
tzwMotorCar(G, hx2 + 14, hz2 - 15, Math.PI / 2 + 0.2);
}
},
function (P, x, z, ry) {
var y = tzwLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
var lite = tzwLite();
var paint = tzwShine(0x1E2A3A, 0.35, 0.3), brass = tzwMat("brass"), black = tzwShine(0x141414, 0.5, 0.2), leather = tzwLam(0x3A1E14);
tzwBox(g, 1.7, 0.5, 4.2, paint, 0, 0.55, 0);
tzwBox(g, 1.2, 0.6, 1.4, paint, 0, 0.9, 1.5);
tzwBox(g, 1.24, 0.7, 0.14, brass, 0, 0.85, 2.26);
tzwBox(g, 1.6, 0.5, 0.9, leather, 0, 1.05, -0.2);
tzwBox(g, 1.6, 0.8, 0.2, leather, 0, 1.05, -0.6);
tzwBox(g, 1.6, 0.5, 0.9, leather, 0, 1.05, -1.4);
tzwBox(g, 1.6, 0.9, 0.2, leather, 0, 1.05, -1.85);
tzwBox(g, 1.5, 0.5, 0.06, tzwShine(0xC8D8E0, 0.1, 0.2), 0, 1.5, 0.7);
var sw = tzwCyl(g, 0.2, 0.2, 0.04, black, -0.4, 1.4, 0.3, 14);
sw.rotation.x = 1.0;
[[-0.9, 1.4], [0.9, 1.4], [-0.9, -1.4], [0.9, -1.4]].forEach(function (q) {
var w = new THREE.Group();
w.position.set(q[0], 0.45, q[1]);
g.add(w);
var t = new THREE.Mesh(tzwGeo("tzCarTyre", function () { return new THREE.TorusGeometry(0.4, 0.07, 8, 18); }), black);
t.rotation.y = Math.PI / 2;
w.add(t);
if (!lite)
for (var s = 0; s < 10; s++) {
var sp = tzwBox(w, 0.03, 0.7, 0.03, tzwMat("oak"), 0, -0.35, 0);
sp.rotation.x = s / 10 * Math.PI;
}
});
[-0.55, 0.55].forEach(function (s) { var l = tzwCyl(g, 0.13, 0.13, 0.2, brass, s, 1.0, 2.3, 12); l.rotation.x = Math.PI / 2; });
tzwBox(g, 0.2, 0.1, 1.2, black, -0.95, 0.4, 0);
tzwBox(g, 0.2, 0.1, 1.2, black, 0.95, 0.4, 0);
tzwSolid(x, z, 2.0, 4.4, y - 1, y + 2, ry);
return g;
},
function (G) {
var X = TZW_ROOMXZ.wisconsin, R, st = TZW.st;
R = tzwRoom(G, "parlour", X.parlour[0], X.parlour[1], 8, 6, { wall: "bluepaper", floor: "floor", name: "the parlour of the farmhouse", lightI: 0.7 });
tzwBench(R.g, 0, -2.4, 0, { w: 2.2, cushion: 0x7A2A2A });
tzwChair(R.g, -2.6, -0.6, Math.PI / 2, { arm: 1 });
tzwChair(R.g, 2.6, -0.6, -Math.PI / 2, { arm: 1 });
tzwTable(R.g, 0, -0.6, 1.2, 0.7, 0.5, {});
tzwRug(R.g, 0, -0.6, 4, 3, 0x6A3A2A);
tzwHearth(R.g, 0, -2.8, 0, { h: R.h, mat: "brick", fire: !st.fire });
tzwShelves(R.g, -3.8, 1, 2, 2, Math.PI / 2, { books: 1 });
tzwPicture(R.g, 2.6, 1.8, -2.86, 0, 0.9, 0.7);
tzwWindowIn(R.g, 3.8, 1.5, 1, -Math.PI / 2, 1, 1.4, { sky: st.fire ? 0xC86A3A : 0xB8C8D8 });
R = tzwRoom(G, "kitchen", X.kitchen[0], X.kitchen[1], 7, 6, { wall: "plaster", floor: "planks", name: "the farmhouse kitchen", lightI: 0.7 });
tzwBox(R.g, 1.6, 0.9, 0.7, tzwLam(0x1A1A1A), -2, 0, -2.6);
tzwCyl(R.g, 0.08, 0.08, 2.6, tzwLam(0x1A1A1A), -2, 0.9, -2.8, 8);
tzwTable(R.g, 0.6, 0.2, 2, 1, 0.76, { cloth: 0xE8E0D0 });
for (var c = 0; c < 4; c++)
tzwChair(R.g, -0.3 + c * 0.6, c % 2 ? 1.0 : -0.6, c % 2 ? Math.PI : 0, {});
tzwShelves(R.g, 3.2, -1, 1.6, 2, -Math.PI / 2, { jars: 1 });
tzwInDoor("parlour", "kitchen", 3.6, 2.2, "Through to the kitchen", "go");
R = tzwRoom(G, "depot", X.depot[0], X.depot[1], 8, 5, { wall: "planks", floor: "planks", name: "the waiting-room of the station", lightI: 0.7 });
tzwBench(R.g, -1.6, -2, 0, { w: 3 });
tzwBench(R.g, 1.8, -2, 0, { w: 3 });
tzwBox(R.g, 2, 1.1, 0.6, tzwMat("darkoak"), 2.6, 0, 1.4);
tzwBox(R.g, 0.5, 0.3, 0.4, tzwMat("brass"), 2.6, 1.1, 1.4);
R = tzwRoom(G, "inn", X.inn[0], X.inn[1], 8, 6, { wall: "bluepaper", floor: "floor", name: "the parlour of the little hotel", lightI: 0.75 });
tzwChair(R.g, -2.6, -1.6, Math.PI / 2, { arm: 1 });
tzwChair(R.g, 2.6, -1.6, -Math.PI / 2, { arm: 1 });
tzwChair(R.g, -1.2, 1.6, Math.PI, {});
tzwChair(R.g, 1.2, 1.6, Math.PI, {});
tzwBench(R.g, 0, -2.4, 0, { w: 2.4, cushion: 0x3A2A1A });
tzwTable(R.g, 0, -0.4, 1.2, 0.8, 0.5, {});
tzwRug(R.g, 0, -0.4, 4, 3, 0x4A3A6A);
tzwBox(R.g, 0.7, 1.0, 0.7, tzwLam(0x1A1A1A), 3.2, 0, 2.2);
tzwCyl(R.g, 0.07, 0.07, 2.4, tzwLam(0x1A1A1A), 3.2, 1.0, 2.2, 8);
tzwWindowIn(R.g, -3.8, 1.5, 0, Math.PI / 2, 1, 1.4, { sky: 0xB8C8D8 });
tzwPicture(R.g, 0, 1.8, -2.86, 0, 1.0, 0.7);
},
function (G) {
var st = TZW.st;
if (st.fire)
return;
tzwCrowd("wi", [["A farm hand with a pitchfork", "m", "tzfarm", "Dry, this fall. Too dry. You can smell smoke on the wind some days.", TZP.farm], ["A neighbour come to call", "f", "tzfarmf", "So the Porters are back from Africa! My, what stories they must have.", TZP.farm], ["A boy with a fishing pole", "m", "tzfarm", "The lake's just over the hill. Perch, mostly.", TZP.farm, true]], -30, -20, 40, 30, { wander: 6 });
tzwCrowd("wis", [["The station agent", "m", "tzfarm", "Train south's at four, if she's on time. Which she ain't, mostly.", TZP.farm], ["A lumberman waiting for the train", "m", "tzfarm", "Fires up north. They're saying the whole country's like tinder this fall.", TZP.farm]], TZW_WI.station[0] - 6, TZW_WI.station[1] - 14, TZW_WI.station[0] + 6, TZW_WI.station[1] - 10, { wander: 2, y: tzwWiH(TZW_WI.station[0], TZW_WI.station[1]) + 0.6 });
},
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var R = wRand(Math.floor(x * 7 + z * 13));
var bed = new THREE.Mesh(tzwGeo("tzEmber", function () { var c = new THREE.CircleGeometry(1, 10); c.rotateX(-Math.PI / 2); return c; }), tzwGlowM(0x7A2008, 0.55));
bed.position.y = 0.05;
bed.scale.set(0.75 * s, 1, 0.6 * s);
bed.rotation.y = R() * 6;
g.add(bed);
var fl = [];
for (var i = 0; i < 7; i++) {
var a = R() * 6.283, r = R() * 0.8 * s, f = new THREE.Mesh(tzwGeo("tzBlaze", function () { return new THREE.ConeGeometry(0.24, 2.6, 6, 1, true); }), tzwGlowM([0xFFB040, 0xFF7A20, 0xFFE080, 0xFF5A10][i % 4], 0.8));
f.position.set(Math.cos(a) * r, 1.0 * s * (0.7 + R() * 0.6), Math.sin(a) * r);
f.scale.setScalar(s * (0.6 + R() * 0.8));
g.add(f);
fl.push(f);
}
if (!tzwLite() && typeof THREE.PointLight === "function" && (TZW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF8A3A, 1.6, 22 * s);
L.position.y = 1.4;
g.add(L);
g.userData.light = L;
TZW.lights = (TZW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
TZW.fx.push(g);
return g;
},
function () {
var S = tzwSc(), k = S.env;
if (TZW.envK && TZW_ENV[TZW.envK])
k = TZW.envK;
if (TZW.night)
k = TZW.envK === "moon" || TZW.envK === "storm" ? TZW.envK : "night";
if (tzwInRoom()) {
var L = tzwLocalSc(), R = tzwRoomAt(L.x, L.z);
k = R ? R.env : "indoor";
}
else if (TZW.sc === "coast" && !TZW.envK && !TZW.night && typeof tzwUnderCanopy === "function") {
var L2 = tzwLocalSc();
if (tzwUnderCanopy(L2.x, L2.z))
k = "canopy";
}
var E = {}, B = TZW_ENV[k] || TZW_ENV.lake;
for (var q in B)
E[q] = B[q];
if (tzwLite() && E.fogD)
E.fogD *= 1.35;
return E;
},
function (x, z, feet) {
if (TZW.moving || TZW.ride)
return true;
var S = tzwSc(), D = TZW_SCN[TZW.sc];
if (!D)
return false;
if (tzwInRoom()) {
if (tzwSolidAt(x, z, feet))
return true;
return tzwFloorAt(x, z, feet) === null;
}
if (Math.abs(x) > S.bound || Math.abs(z) > S.bound)
return true;
if (tzwSolidAt(x, z, feet))
return true;
var fl = tzwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = tzwLand(x, z);
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
TZW.t += dt;
if (!TZW.built || !TZW.scG)
return;
var S = tzwSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72;
TZW.inRm = tzwInRoom();
TZW.et = (TZW.et || 0) + dt;
if (TZW.et > 0.8) {
TZW.et = 0;
worldEnv(tzwEnvNow());
}
var flow = TZW.t * 0.03;
TZW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * (m.userData.fx || 0.3), flow * (m.userData.fz || 1)); });
TZW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (TZW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(TZW.t * 3 + i * 2)) * 0.3; f.rotation.y = TZW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(TZW.t * 1.3) * 0.08;
}
else if (k === "snowfall") {
var pa = F.geometry.attributes.position;
for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) - dt * (F.userData.sp || 1.4);
if (y < 0)
y += 40;
pa.setY(i, y);
pa.setX(i, pa.getX(i) + Math.sin(TZW.t * 0.5 + i) * dt * 0.3);
}
pa.needsUpdate = true;
F.position.set(L.x, TZW.inRm ? -500 : tzwLand(L.x, L.z), L.z);
}
});
TZW.ft = (TZW.ft || 0) + dt;
if (TZW.ft > 0.4) {
TZW.ft = 0;
try {
tzjFarTick(L);
}
catch (e) { }
try {
tzjNearTick(L);
}
catch (e) { }
}
(TZW.ticks || []).forEach(function (f) { try {
f(dt, L);
}
catch (e) { } });
(TZW.smoke || []).forEach(function (g) { g.children.forEach(function (m, i) { m.position.x += Math.sin(TZW.t * 0.1 + i) * dt * 0.4; m.rotation.y += dt * 0.02; }); });
TZW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return tzwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof tzbTick === "function")
try {
tzbTick(dt, L);
}
catch (e) {
var em = String(e && e.message);
TZW.e1 = TZW.e1 || {};
if (!TZW.e1[em]) {
TZW.e1[em] = 1;
if (window.console)
console.warn("[tarzan] book", e && e.stack ? String(e.stack).slice(0, 400) : e);
}
}
if (!TZW.bannerBook)
worldBanner("<b>🌴 " + TZW_NAME + "</b> · " + esc(tzwPlaceName(L)) + (TZW.night ? " · night" : ""));
TZW.pt = (TZW.pt || 0) + dt;
if (TZW.pt < 0.15)
return;
TZW.pt = 0;
if (TZW.moving || TZW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
TZW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof tzbTalk === "function" && tzbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
TZW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : tzwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof tzbSpot === "function")
tzbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof tzbIdlePrompt === "function")
tzbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = tzwAtPt(opt.at) || (typeof tzbStartAt === "function" && tzbStartAt()) || tzwAtPt("beach");
try {
tzwCrxKinds();
if (typeof crxWarm === "function" && !tzwLite())
crxWarm(["mangani", "kerchak", "kala", "sabor", "elephant", "manganiyoung"]);
}
catch (e) { }
tzwScene(A.sc);
var S = TZW_SC[A.sc], y = A.y != null ? A.y : tzwGround(A.x, A.z);
camera.position.set(TZW.base + S.x + A.x, y + 1.72, A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
TZW.moving = false;
TZW.ride = null;
TZW.inRm = tzwInRoom();
worldEnv(tzwEnvNow());
setStatus("🌴 <b>" + TZW_NAME + ".</b> Edgar Rice Burroughs's book, the whole of it: the cabin on the shore, the jungle and the tribe of Kerchak, Mbonga's village up the river, the Fuwalda at sea and the woods of Wisconsin. <b>Press E</b> for the book.");
if (typeof tzbEnter === "function")
try {
tzbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[tarzan] enter", e);
}
},
function () {
tzwSceneDrop();
for (var k in TZW.mats) {
var m = TZW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in TZW.tex) {
var x = TZW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in TZW_GEO) {
try {
TZW_GEO[g].dispose();
}
catch (e) { }
}
TZW.mats = {};
TZW.tex = {};
TZW_GEO = {};
TZW.built = false;
TZW.G = null;
TZW.lights = 0;
},
function (P, n, sp) {
var lite = tzwLite();
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
TZW.fx.push(p);
return p;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = TZW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = TZW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: TZW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return tzbPos(at.at);
var C = TZB_CH[tzbS().ch], i = tzbS().s, c = C && C.cast ? C.cast.filter(function (d) { return tzbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? tzbPos(c.at) : null;
}
if (at.spot) {
var Sp = TZW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: TZW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return tzbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || TZW.sc, x: at.x, z: at.z, y: at.y };
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
if (TZB.beam && TZB.beam.parent === TZW.scG)
return TZB.beam;
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
TZW.scG.add(g);
TZB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return tzwLam(c); }, m;
switch (kind) {
case "load":
m = tzwBox(g, 0.62, 0.42, 0.48, tzwMat("planks"), 0, 0, 0);
[-0.22, 0.22].forEach(function (x) { tzwBox(g, 0.05, 0.44, 0.5, tzwMat("darkoak"), x, 0, 0); });
tzwBox(g, 0.66, 0.04, 0.52, tzwMat("darkoak"), 0, 0.42, 0);
tzwBox(g, 0.12, 0.06, 0.03, tzwMat("iron"), 0, 0.3, 0.25);
break;
case "rifle":
var rf = new THREE.Group();
rf.rotation.y = 0.4;
g.add(rf);
m = tzwCyl(rf, 0.018, 0.018, 0.8, tzwMat("iron"), 0, 0, 0, 8);
m.rotation.x = Math.PI / 2;
m.position.set(0, 0.06, -0.3);
tzwBox(rf, 0.06, 0.07, 0.34, tzwMat("darkoak"), 0, 0.02, 0.02);
var stk = tzwBox(rf, 0.05, 0.12, 0.36, tzwMat("darkoak"), 0, 0, 0.32);
stk.rotation.x = -0.12;
tzwBox(rf, 0.03, 0.04, 0.08, tzwMat("brass"), 0, 0.08, 0.1);
break;
case "fern":
m = new THREE.Mesh(tzwFronds(5, 0.7, 0.24, 0.2, 0.0, 1.0), tzjMats().fern);
m.scale.set(0.8, 0.4, 0.8);
g.add(m);
break;
case "thorn":
m = tzwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = tzwCyl(g, 0.07, 0.08, 1.4, tzwMat("bark"), 0, 0, 0, 8);
m.rotation.z = Math.PI / 2;
m.position.y = 0.08;
var tw = tzwCyl(g, 0.025, 0.03, 0.4, tzwMat("bark"), 0, 0, 0, 6);
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
m = tzwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
tzwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = tzwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
tzwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), tzwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "pencil":
for (var pi = 0; pi < 3; pi++) {
var pc = tzwCyl(g, 0.012, 0.012, 0.18, M([0xC8A030, 0x3A6A3A, 0xA83A2A][pi]), 0, 0, 0, 6);
pc.rotation.z = Math.PI / 2;
pc.rotation.y = pi * 0.3;
pc.position.set(0, 0.014, (pi - 1) * 0.04);
}
m = g.children[0];
break;
case "note":
m = tzwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "paper":
m = tzwBox(g, 0.34, 0.03, 0.46, M(0xE8E2D0), 0, 0.02, 0);
tzwBox(g, 0.3, 0.005, 0.08, M(0x2A2A2A), 0, 0.04, -0.16);
break;
case "bread":
m = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), M(0xC8945A));
m.scale.set(1.5, 0.8, 1);
m.position.y = 0.1;
g.add(m);
break;
case "bottle":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 10), tzwShine(0x1A3A1A, 0.2, 0));
m.position.y = 0.15;
g.add(m);
var nk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.1, 8), tzwShine(0x1A3A1A, 0.2, 0));
nk.position.y = 0.35;
g.add(nk);
break;
case "tin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 12), tzwShine(0xA8A8A0, 0.4, 0.6));
m.position.y = 0.05;
g.add(m);
break;
case "coin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.01, 12), tzwShine(0xE8C060, 0.3, 0.9));
m.position.y = 0.01;
g.add(m);
break;
case "spade":
m = tzwBox(g, 0.05, 0.05, 1.0, M(0x6A4A2A), 0, 0.03, 0);
tzwBox(g, 0.2, 0.02, 0.26, tzwShine(0x8A8A88, 0.4, 0.7), 0, 0.02, 0.6);
break;
case "post":
m = tzwBox(g, 0.08, 1.1, 0.08, M(0xE8E0CC), 0, 0, 0);
break;
case "skin":
m = new THREE.Mesh(tzwGeo("tzSkin", function () { var sh = new THREE.Shape(); sh.moveTo(-0.5, 0); sh.quadraticCurveTo(-0.6, 0.3, -0.3, 0.42); sh.lineTo(-0.1, 0.3); sh.lineTo(0.1, 0.3); sh.lineTo(0.3, 0.42); sh.quadraticCurveTo(0.6, 0.3, 0.5, 0); sh.quadraticCurveTo(0.6, -0.3, 0.3, -0.42); sh.lineTo(0, -0.36); sh.lineTo(-0.3, -0.42); sh.quadraticCurveTo(-0.6, -0.3, -0.5, 0); var e = new THREE.ShapeGeometry(sh); e.rotateX(-Math.PI / 2); return e; }), M(0xB8904A));
m.position.y = 0.02;
g.add(m);
break;
case "cane":
m = tzwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
break;
case "shell":
m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), M(0xD8C8A8));
m.scale.y = 0.4;
m.position.y = 0.05;
g.add(m);
break;
case "book":
m = tzwBox(g, 0.22, 0.06, 0.3, M(0x5A2A1A), 0, 0, 0);
tzwBox(g, 0.2, 0.05, 0.28, M(0xE8E0CC), 0.012, 0.005, 0);
break;
case "letter":
m = tzwBox(g, 0.22, 0.01, 0.15, M(0xF2ECDC), 0, 0.01, 0);
tzwBox(g, 0.04, 0.012, 0.04, M(0x8A1A1A), 0, 0.016, 0);
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
var rt = tzwCyl(g, 0.012, 0.02, 0.3, M(0x8A6A4A), 0, 0, 0, 5);
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
m = tzwBox(g, 0.03, 0.015, 0.24, tzwShine(0xC8C8D0, 0.25, 0.9), 0, 0.02, -0.12);
tzwBox(g, 0.04, 0.035, 0.12, tzwMat("darkoak"), 0, 0.01, 0.06);
break;
case "rope":
m = new THREE.Mesh(tzwGeo("tzCoilI", function () { return new THREE.TorusGeometry(0.2, 0.035, 6, 18); }), tzwMat("rope"));
m.rotation.x = Math.PI / 2;
m.position.y = 0.04;
g.add(m);
var m2b = m.clone();
m2b.scale.set(0.75, 0.75, 1);
m2b.position.y = 0.1;
g.add(m2b);
break;
case "spear":
m = tzwCyl(g, 0.022, 0.022, 1.9, tzwMat("oak"), 0, 0, 0, 6);
m.rotation.z = Math.PI / 2;
m.position.y = 0.05;
var tip = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.22, 6), tzwShine(0x8A8A88, 0.35, 0.7));
tip.rotation.z = -Math.PI / 2;
tip.position.set(1.05, 0.05, 0);
g.add(tip);
break;
case "arrow":
for (var ar = 0; ar < 3; ar++) {
var sh2 = tzwCyl(g, 0.008, 0.008, 0.7, tzwMat("oak"), 0, 0, 0, 5);
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
var bn = tzwCyl(g, 0.02, 0.02, 0.2, M(0xE8E0CC), 0, 0, 0, 6);
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
m = tzwBox(g, 0.16, 0.26, 0.16, M(0x3A3A3A), 0, 0, 0);
var lf = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), tzwGlowM(0xFFD070, 0.9));
lf.position.y = 0.13;
g.add(lf);
break;
case "pistol":
m = tzwBox(g, 0.05, 0.06, 0.34, M(0x3A3A40), 0, 0.03, 0);
tzwBox(g, 0.05, 0.14, 0.08, M(0x5A3A1A), 0, 0, 0.14);
break;
case "locket":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.015, 14), tzwShine(0xD8B048, 0.3, 0.9));
m.position.y = 0.02;
g.add(m);
break;
case "flask":
m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), tzwMat("glass"));
m.position.y = 0.08;
g.add(m);
tzwCyl(g, 0.02, 0.02, 0.1, tzwMat("glass"), 0, 0.14, 0, 6);
break;
case "cloak":
m = tzwBox(g, 0.6, 0.08, 0.5, M(0x3A3A4A), 0, 0.04, 0);
break;
case "fire":
m = tzwBox(g, 0.5, 0.1, 0.5, M(0x3A2A1A), 0, 0, 0);
tzwFire(g, 0, 0.08, 0, 0.4);
break;
case "chain":
m = tzwBox(g, 0.4, 0.04, 0.04, M(0x8A8A90), 0, 0.02, 0);
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
if (!P || !TZW.scG || P.sc !== TZW.sc)
return null;
var g = tzbItemMesh(kind), y = P.y != null ? P.y : tzwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
TZW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = tzwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (TZB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = TZW.spots.indexOf(I.S); if (j >= 0)
TZW.spots.splice(j, 1); TZB.items = TZB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.tzb = 1;
TZB.items.push(I);
return I;
},
function (k) {
if (TZB.tuneKey === k)
return;
TZB.tuneKey = k;
var old = TZB.tune;
TZB.tune = null;
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
if (!k || !TZB_TUNES[k])
return;
try {
var A = new Audio(TZB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
TZB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (TZB.tune !== A) {
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
if (TZB.text)
return fn(TZB.text);
if (TZB.textWait) {
TZB.textWait.push(fn);
return;
}
TZB.textWait = [fn];
var done = function (B) { TZB.text = B; var w = TZB.textWait; TZB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/tarzan/tarzan.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
tzbText(function (B) {
var C = TZB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + tzbNum(i) + ". " + esc(C.t) + "</h3>" + TZB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(tzbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); TZB.readOpen = 0; TZB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = tzbS(), C = TZB_CH[S.ch];
if (!C)
return;
TZB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
TZB.readAsk = 0;
TZB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : "Tarzan of the Apes") + "</div><h3 style='margin:4px 0'>" + tzbNum(ch) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? tzbOpening(T).map(tzbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); TZB.readOpen = 0; tzbStepDone(); }, all: function () { tzbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Burroughs's own words, all of it");
b += tzbKeeperBtns(fns);
worldCard(b, fns);
};
tzbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
TZB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); tzbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = tzbS(), C = TZB_CH[S.ch];
if (!C)
return;
tzbItemsClear();
tzbCastClear();
TZB.hold = 0;
var go = function () { tzbWorldState(); tzbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[tzb] setup", S.ch, e);
} tzbTune(C.tune || null); tzbStepBegin(); };
if (place && C.start) {
var P = tzbPos(C.start);
if (P && WLD.on === TZW_KEY) {
tzwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (TZW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = tzbStep();
tzbItemsClear();
TZB.hold = 0;
TZB.puzOpen = 0;
if (!b)
return;
b._key = tzbKey();
tzbWorldState();
try {
if (b.on)
b.on(tzbS().f);
}
catch (e) {
if (window.console)
console.warn("[tzb] on", e);
}
if (b.k === "read") {
tzbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { TZB.rew[k] = 0; });
if (b.k === "find") {
var Pf = tzbPos(b.at);
if (Pf && Pf.sc === TZW.sc)
tzbItemAdd(b.item, Pf, b.name, b.verb, function () { if (tzbKey() === b._key)
tzbStepDone(); });
}
if (b.k === "gather") {
var P = tzbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(tzbS().ch * 97 + tzbS().s * 13 + 7);
TZB.got = 0;
if (P && P.sc === TZW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = tzwGround(Q.x, Q.z, (P.y != null ? P.y : tzwLand(P.x, P.z)) + 1);
tzbItemAdd(b.item, Q, b.name, b.verb, function () { if (tzbKey() !== b._key)
return; TZB.got++; try {
if (b.each)
b.each(TZB.got);
}
catch (e) { } if (TZB.got < n) {
tzbSay((b.eachSay || "Got one.") + " " + TZB.got + " of " + n + ".");
return;
} tzbStepDone(); });
}
}
if (b.h)
tzbSay("<b>" + esc(TZB_CH[tzbS().ch].t) + ".</b> " + b.h);
},
function (b) {
TZB.puzOpen = 1;
TZB.puzT = performance.now();
var k = tzbKey(), fns = {}, h = TZB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
tzbSay(b.yes);
if (tzbKey() === k)
tzbStepDone();
return;
}
tzbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (tzbKey() === k)
TZB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = tzbS(), C = TZB_CH[S.ch], b = tzbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[tzb] done", e);
}
if (b.say)
tzbSay(b.say);
S.s++;
if (window.TZB_LOG)
TZB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= TZB_CH.length - 1) {
S.done = 1;
S.s = 0;
tzbSave();
tzbItemsClear();
tzbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
tzbSave();
var nx = TZB_CH[S.ch];
setTimeout(function () { try {
tzbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[tzb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
tzbSave();
tzbStepBegin();
},
function () {
tzbTune("end");
var S = tzbS();
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>" + tzQ("I was born there,\" said Tarzan, quietly.  \"My mother was an Ape") + "</p><p style='font-size:12px;opacity:.75'>Edgar Rice Burroughs, Tarzan of the Apes (1912), the last chapter</p><p>You have sailed on the Fuwalda and seen the mutiny; built the cabin with John Clayton above the little harbour; seen Kala carry the white baby up into the trees; learned to read from the picture-books in the cabin; fought Bolgani and Sabor and Kerchak; hunted on the tree-top ways; gone down to Mbonga's village; watched the Arrow's people come ashore; carried Jane Porter into the forest and back; freed D'Arnot from the torture; stood by the French cruiser; and gone at last through the burning woods in Wisconsin. Your keepsakes:</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; tzbSave(); tzbChapterBegin(true); } };
b += worldBtn("again", "Read it again from the start", "The deck of the Fuwalda, 1888");
if (typeof bhnOpen === "function") {
b += worldBtn("hon", "🏅 The book's honours", "Its badge, its decor, and its vault");
fns.hon = function () { worldCard(null); bhnOpen("tarzan"); };
}
worldCard(b, fns);
},
function (c) {
var C = TZB.cast[c.key || c.k];
if (tzbCastLive(C))
return C;
var P = tzbPos(c.at);
if (!P || P.sc !== TZW.sc)
return null;
var F = TZW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute, name: c.name };
var Pp;
if (c.beast) {
var yb = o.y != null ? o.y : tzwGround(P.x + (c.ox || 0), P.z + (c.oz || 0), 500), gb = tzwBeast(TZW.scG, c.beast, P.x + (c.ox || 0), yb, P.z + (c.oz || 0), c.ry || 0, { s: c.s });
Pp = { g: gb, y: yb, o: {} };
TZW.people.push(Pp);
if (c.name && !c.mute)
tzwTalk(Pp, c.name, tzwPersona(c.persona || c.k), c.greet || "", c.r || 3.6);
}
else if (F.name && !c.dress)
Pp = tzwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = tzwDressed("tzb" + (c.key || c.k), c.dress || "tzvillm", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : tzwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
TZW.scG.add(g);
Pp = { g: g, y: y, o: {} };
TZW.people.push(Pp);
if (c.name && !c.mute)
tzwTalk(Pp, c.name, tzwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
TZB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return TZB.cast[c.key || c.k];
},
function () {
var C = TZB_CH[tzbS().ch];
if (!C || !C.cast)
return;
var idx = tzbS().s;
var on = {};
C.cast.forEach(function (c) { var key = c.key || c.k; if (!(c.from != null && idx < c.from) && !(c.until != null && idx >= c.until) && !on[key])
on[key] = c; });
C.cast.forEach(function (c) {
var key = c.key || c.k, want = on[key], have = TZB.cast[key];
if (!want) {
if (have)
tzbCastHide(key);
return;
}
if (want !== c)
return;
if (have && have.c && have.c !== c)
tzbCastHide(key);
if (!tzbCastLive(TZB.cast[key]))
tzbCastAdd(c);
});
},
function () {
var b = tzbStep(), key = "pass", have = TZB.cast[key];
var want = b && b.k === "talk" && b.at && b.at.at ? b : null, P = want ? tzbPos(want.at.at) : null;
if (!want || !P || P.sc !== TZW.sc) {
if (have)
tzbCastHide(key);
return;
}
if (have && have.b === want && tzbCastLive(have))
return;
if (have)
tzbCastHide(key);
if (!want.pass && TZW.talk.some(function (T) { return T.name === want.who && T.p && T.p.g && T.p.g.parent; }))
return;
var pa = want.pass || {}, nm = String(want.who), fem = /woman|lady|girl|wife|Mrs|Miss|mother|maid/i.test(nm), kid = pa.child || /boy|girl|child/i.test(nm);
var dr = pa.dress || (/officer|lieutenant/i.test(nm) ? "tzfroff" : (/French sailor|soldier/i.test(nm) ? "tzfrsail" : (/sailor|boatman|seaman|mate|captain/i.test(nm) ? "tzsailor" : (/villag|warrior|hunter|Mbonga/i.test(nm) ? (fem ? "tzvillf" : "tzvillm") : (fem ? (kid ? "girl" : "maid") : (kid ? "boy" : (/farm|labourer|porter|man with/i.test(nm) ? "tzfarm" : "gent")))))));
var Pp = tzwOne("pass" + tzbS().ch + "_" + tzbS().s, want.who, pa.sex || (fem ? "f" : "m"), dr, P.x, P.z, pa.ry || 0, pa.greet || "", { y: P.y, child: !!kid, persona: TZP.townfolk });
if (Pp)
TZB.cast[key] = { g: Pp.g, P: Pp, c: { k: key }, b: want };
},
function () {
if (!TZW.scG)
return;
tzbCastClear();
var S = tzbS(), C = TZB_CH[S.ch];
if (S.started && !S.done && C && C.cast && tzbCastHere(C)) {
tzbCastTick();
return;
}
(TZB_FOLK_AT[TZW.sc] || []).forEach(function (q) { var key = "f_" + q[0]; var Pp = tzwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
TZB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!tzbActive())
return false;
var b = tzbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = tzbKey();
worldPrompt(null);
var next = function () { if (tzbKey() === k)
tzbStepDone(); };
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
worldCard(TZB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
TZB.wt += dt;
if (TZB.wt > 0.5) {
TZB.wt = 0;
if (tzbActive() && tzbCastHere(TZB_CH[tzbS().ch]))
tzbCastTick();
if (tzbActive())
tzbPassTick();
var S0 = tzbS();
S0.seen[TZW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!tzbActive()) {
if (TZB.beam)
TZB.beam.visible = false;
TZW.bannerBook = false;
return;
}
var S = tzbS(), b = tzbStep(), t = TZW.t, feet = camera.position.y - 1.72;
TZB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? tzbPos(b.at) : null, here = P && P.sc === TZW.sc, bm = tzbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + tzbScName(P.sc) + ": press E for the book)";
if (here && !TZW.moving && !TZW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : tzwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = tzbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !TZW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (TZB.readAsk)
break;
if (!TZB.readOpen)
tzbChapterCard();
else {
TZB.readOpen = 0;
tzbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
tzbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
TZB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(TZB.hold, dt);
}
catch (e) { }
if (TZB.hold >= (b.sec || 8)) {
tzbStepDone();
return;
}
}
else
TZB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return TZB.rew[k]; })) {
tzbStepDone();
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
tzbStepDone();
return;
}
break;
}
case "puzzle":
if ((!TZB.puzOpen || performance.now() - (TZB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
tzbPuzzleCard(b);
break;
}
}
var C = TZB_CH[S.ch], prog = b && b.k === "hold" && TZB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - TZB.hold)) + " s)" : b && b.k === "gather" ? " (" + (TZB.got || 0) + " of " + (b.n || 3) + ")" : "";
TZW.bannerBook = true;
worldBanner("⚡ <b>" + tzbNum(S.ch) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = tzbS(), C = TZB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Edgar Rice Burroughs · Tarzan of the Apes (1912), the whole book</div><h3 style='margin:4px 0'>🌿 Tarzan of the Apes</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + tzbNum(S.ch) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((tzbStep() || {}).h || "") + "</p>";
var st = tzbStep(), P = st && st.at ? tzbPos(st.at) : null, Cs = tzbPos(C.start);
var to = P && P.sc !== TZW.sc ? P : (!P && Cs && Cs.sc !== TZW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + tzbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); tzwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { tzbPopulate(); tzbStepBegin(); }); };
}
}
else
b += "<p>1888. A young English lord and his wife sail from Freetown on the barkentine Fuwalda; her crew mutinies, and the Claytons are put ashore on a lonely stretch of the West African coast. All twenty-eight chapters, every one played: the cabin above the little harbour, the great apes of Kerchak's tribe and Kala who takes the baby, the boy who teaches himself to read from his father's books, Sabor and Numa and Tantor, the tree-top ways, Mbonga's village, the treasure-seekers of the Arrow, Jane Porter, Lieutenant D'Arnot and the French cruiser, and the end of it in the Wisconsin woods. About four hours at your own pace; your place is kept.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: the Fuwalda, out of Freetown", S.started ? "Back to where you were" : "\"I had this story from one who had no business to tell it to me.\"");
fns.go = function () { worldCard(null); tzbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; tzbSave(); tzbBegin(); };
}
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(TZW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(TZW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = (TZW_SCN[k].start || { x: 0, z: 0 }); tzwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, tzbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += tzbKeeperBtns(fns);
worldCard(b, fns);
},
function (C) {
var R = function (v) { return typeof v === "string" ? tzbIdx(C, v) : v; };
(C.cast || []).forEach(function (c) { c.from = R(c.from); c.until = R(c.until); });
if (C.state) {
["nightFrom", "nightUntil", "drumsFrom"].forEach(function (k) { if (C.state[k] != null)
C.state[k] = R(C.state[k]); });
}
TZB_CH.push(C);
return C;
},
function (st, s) {
var v = function (k) { return tzbStV(st[k]); }, reb = false;
Object.keys(TZW.st).forEach(function (k) { if (!(k in st) && TZW.st[k] != null && TZW.st[k] !== false) {
delete TZW.st[k];
if (TZW_LIVEK.indexOf(k) < 0)
reb = true;
} });
Object.keys(st).forEach(function (k) { if (k === "env" || k === "night" || k === "nightUntil" || k === "nightFrom")
return; var nv = v(k); if (TZW.st[k] !== nv) {
TZW.st[k] = nv;
if (TZW_LIVEK.indexOf(k) < 0)
reb = true;
} });
if (typeof tzwLiveState === "function")
try {
tzwLiveState();
}
catch (e) { }
if (reb && !TZW.rebuilding && TZW.scBuilt) {
TZW.rebuilding = 1;
try {
tzwRebuild();
}
catch (e) { }
TZW.rebuilding = 0;
}
}
];
});
