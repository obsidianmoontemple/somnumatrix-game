/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(514, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (PHW.tex[k])
return PHW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = phwLite();
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
return (PHW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (PHW.mats[k])
return PHW.mats[k];
var own = name.slice(0, 2) === "b:", map = phwPhotoTex(name, mpt || 2), m;
if (phwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = phwPhotoTex(name, mpt || 2, true);
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
return (PHW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return phwM(k, function () {
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
return phwCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return phwCanvas("bamboo", 64, 256, function (x, W, H) {
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
phwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return phwCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return phwCanvas("tuft", 128, 64, function (x, W, H) {
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
return phwCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return phwCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
phwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return phwCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = PHW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / PHW_CELL) + "," + Math.floor(z / PHW_CELL)];
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
p = dlnPerson("phw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("phw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || PHW.scG || PHW.G).add(p);
var P = { g: p, y: y, o: o };
PHW.people.push(P);
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
PHW.inst.push(m);
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
var a0 = pts[q - 1], b0 = pts[q], L0 = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), n0 = Math.max(1, Math.ceil(L0 / (phwLite() ? 8 : 4)));
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
var lite = phwLite(), leaf = phwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
phwInst(P, phwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), phwMat("pale"), list, { shadow: !lite });
phwInst(P, phwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), phwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
phwInst(P, phwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), phwMat("bark"), list, { shadow: !lite });
phwInst(P, phwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), phwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
phwInst(P, phwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), phwMat("darkbark"), list, { shadow: !lite });
phwInst(P, phwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), phwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
phwInst(P, phwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), phwMat("bark"), list, { shadow: !lite });
phwInst(P, phwGeo("pfronds", function () { var g = phwFronds(lite ? 8 : 12, 5.2, 1.6, 0.5, 12, 1.0); g.translate(1.4, 0, 0); return g; }), phwLam(0xFFFFFF, { ds: 1, map: phwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "mauritia": {
phwInst(P, phwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), phwMat("darkbark"), list, {});
phwInst(P, phwGeo("mfronds", function () { return phwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), phwLam(0xFFFFFF, { ds: 1, map: phwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
phwInst(P, phwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), phwMat("darkbark"), list, {});
phwInst(P, phwGeo("ffronds", function () { return phwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), phwLam(0xFFFFFF, { ds: 1, map: phwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
phwInst(P, phwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), phwMat("darkbark"), list, {});
phwInst(P, phwGeo("cyf", function () { return phwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), phwLam(0xFFFFFF, { ds: 1, map: phwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
phwInst(P, phwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), phwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: phwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
phwInst(P, phwGeo("bamL", function () { return phwCards(3, 2.6, 2.2, 5.4); }), phwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
phwInst(P, phwGeo("reed" + kind, function () { return phwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), phwLam(0xFFFFFF, { ds: 1, map: phwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
phwInst(P, phwGeo("tuft", function () { return phwCards(2, 1.6, 0.7, 0); }), phwLam(o.col || 0xFFFFFF, { ds: 1, map: phwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
phwInst(P, phwGeo("flw", function () { return phwCards(2, 0.9, 0.7, 0); }), phwLam(0xFFFFFF, { ds: 1, map: phwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
phwInst(P, phwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), phwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
phwInst(P, phwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || phwMat("rock"), list, {});
break;
}
case "cactus": {
phwInst(P, phwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), phwLam(0x4A7A3A), list, {});
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
function (kind, col) { return phwM("skinM" + kind + (col || ""), function () { var t = phwSkinTex(kind); t.repeat.set(2, 2); var m = phwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = phwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(phwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = phwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(phwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
phwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return phwGeo(k, function () {
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
var t = phwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), phwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || phwS("b:stucco", o.col || 0xF0E2C8, 3), trim = phwLam(0xFAF6EE), sh = phwLam(o.shut || 0x3A6A4A), glass = phwShine(0x1A2228, 0.2, 0.3);
phwBox(g, w, h, d, wall, 0, 0, 0);
phwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
phwBox(g, w + 0.12, 0.5, d + 0.12, phwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(phwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || phwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
phwBox(g, 1.3, 2.6, 0.12, phwMat("oak"), wx, 0, d / 2 + 0.02);
phwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = phwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = phwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!phwLite())
[-1, 1].forEach(function (s) { phwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
phwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
phwBox(g, 0.05, 0.9, 0.05, phwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
phwBox(g, 1.8, 0.05, 0.05, phwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
phwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
if (PHW.scG) {
if (PHW.scG.parent)
PHW.scG.parent.remove(PHW.scG);
PHW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
PHW.scG = null;
PHW.solids = [];
PHW.sgrid = null;
PHW.floors = [];
PHW.spots = [];
PHW.talk = [];
PHW.people = [];
PHW.beasts = [];
PHW.fx = [];
PHW.water = [];
PHW.inst = [];
PHW.hgt = null;
PHW.scBuilt = null;
PHW.rooms = [];
PHW.doors = [];
PHW.lights = 0;
PHW.ticks = [];
PHW.tripods = [];
PHW.handlers = [];
PHW.smoke = [];
PHW.live = null;
if (typeof phbSceneDrop === "function")
try {
phbSceneDrop();
}
catch (e) { }
},
function (k) {
if (PHW.scBuilt === k && PHW.scG)
return;
phwSceneDrop();
var D = PHW_SCN[k], S = PHW_SC[k];
if (!D || !S || !PHW.G)
return;
PHW.sc = k;
PHW.scG = new THREE.Group();
PHW.scG.position.x = S.x;
PHW.G.add(PHW.scG);
PHW.hgt = D.h || function () { return 0; };
try {
D.build(PHW.scG);
}
catch (e) {
if (window.console)
console.warn("[phantom] scene", k, e);
}
PHW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
PHW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = phwAtPt(at);
if (!A)
return;
var v = phwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
PHW.moving = true;
setTimeout(function () {
if (WLD.on !== PHW_KEY) {
v.style.opacity = "0";
PHW.moving = false;
return;
}
phwScene(A.sc);
var S = PHW_SC[A.sc], y = A.y != null ? A.y : phwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(PHW.base + S.x + A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(phwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; PHW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(phwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), phwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; PHW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(phwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), phwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(phwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), phwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(phwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), phwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!phwLite() && typeof THREE.PointLight === "function" && (PHW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
PHW.lights = (PHW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
PHW.fx.push(g);
return g;
},
function (seed, dress, o) {
o = o || {};
if (typeof dlnPerson !== "function")
return wPerson("phw" + seed, { sex: o.sex });
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("phw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (key, x, z, ry, o) {
var F = PHW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : phwGround(x, z, o.feet != null ? o.feet : 500);
var g = F.voice ? phwVoiceG() : phwDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin, child: F.child });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
if (F.head)
phwErikHead(g, F.head);
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || PHW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
PHW.people.push(P);
if (!o.mute)
phwTalk(P, o.name || F.name, phwPersona(F.persona), o.greet || F.greet, o.r || 3.4, o.fn);
return P;
},
function (seed, list, x0, z0, x1, z1, o) {
o = o || {};
var R = wRand(seed), out = [], lite = phwLite(), n = lite ? Math.ceil(list.length * 0.6) : list.length;
for (var i = 0; i < n; i++) {
var L = list[i], x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), tries = 0;
while (o.ok && !o.ok(x, z) && tries++ < 12) {
x = x0 + R() * (x1 - x0);
z = z0 + R() * (z1 - z0);
}
var sex = L[1], g = phwDressed(seed + "c" + i, L[2], { sex: sex, child: !!L[5], beard: sex === "m" && R() < 0.3 ? (R() < 0.5 ? "mustache" : "short") : null, hair: [0x141414, 0x3A2A1A, 0x6A4A2A, 0x8A7A6A, 0xB8A060][Math.floor(R() * 5)], skin: o.skin ? o.skin[Math.floor(R() * o.skin.length)] : null });
var y = o.y != null ? o.y : phwGround(x, z, 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
(o.parent || PHW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander != null ? o.wander : 6, sp: o.sp || 0.7 } };
PHW.people.push(P);
phwTalk(P, L[0], L[4] || o.persona || PHP.townfolk, L[3], 3.0);
out.push(P);
}
return out;
},
function (seed, name, sex, dress, x, z, ry, greet, o) {
o = o || {};
var g = phwDressed(seed, dress, { sex: sex, child: !!o.child, beard: o.beard, hair: o.hair, skin: o.skin });
if (o.scale)
g.scale.set(o.scale[0], o.scale[1], o.scale[2]);
var y = o.y != null ? o.y : phwGround(x, z, o.feet != null ? o.feet : 500);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
(o.parent || PHW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander || 0, sp: 0.6 } };
PHW.people.push(P);
if (name)
phwTalk(P, name, o.persona || PHP.townfolk, greet || "Good day.", o.r || 3.0);
return P;
},
function (g, kind) {
var H = new THREE.Group();
H.position.set(0, 1.6, 0);
g.add(H);
if (kind === "cap") {
var cap = new THREE.Mesh(phwGeo("phCap", function () { return new THREE.CylinderGeometry(0.1, 0.11, 0.13, 16); }), phwLam(0x1A1614));
cap.position.y = 0.17;
H.add(cap);
return H;
}
if (kind === "red") {
var sk = new THREE.Mesh(phwGeo("phSkull", function () { return new THREE.SphereGeometry(0.118, 14, 12); }), phwLam(0xE8DCC0));
sk.scale.set(1, 1.16, 1.08);
sk.position.y = 0.06;
H.add(sk);
[-0.045, 0.045].forEach(function (x) { var e = new THREE.Mesh(phwGeo("phSock", function () { return new THREE.SphereGeometry(0.032, 10, 8); }), phwLam(0x0A0806)); e.position.set(x, 0.08, 0.1); H.add(e); });
var ns = new THREE.Mesh(phwGeo("phNose", function () { return new THREE.ConeGeometry(0.016, 0.03, 3); }), phwLam(0x1A1410));
ns.rotation.x = Math.PI;
ns.position.set(0, 0.035, 0.122);
H.add(ns);
var tt = new THREE.Mesh(phwGeo("phTeeth", function () { return new THREE.BoxGeometry(0.07, 0.018, 0.01); }), phwLam(0xF4ECD8));
tt.position.set(0, -0.01, 0.118);
H.add(tt);
var brim = new THREE.Mesh(phwGeo("phRedBrim", function () { return new THREE.CylinderGeometry(0.26, 0.26, 0.014, 22); }), phwLam(0x8A0E12));
brim.position.y = 0.19;
brim.rotation.z = 0.12;
H.add(brim);
var cr = new THREE.Mesh(phwGeo("phRedCrown", function () { return new THREE.CylinderGeometry(0.11, 0.12, 0.1, 16); }), phwLam(0x8A0E12));
cr.position.y = 0.24;
H.add(cr);
for (var i = 0; i < 3; i++) {
var f = new THREE.Mesh(phwGeo("phPlume", function () { var c = new THREE.ConeGeometry(0.03, 0.34, 6); c.translate(0, 0.17, 0); return c; }), phwLam(i === 1 ? 0xF4F0E8 : 0xB01418));
f.position.set(-0.06 + i * 0.05, 0.27, -0.04);
f.rotation.set(-0.5, 0, 0.4 - i * 0.25);
H.add(f);
}
return H;
}
var m = new THREE.Mesh(phwGeo("phMask", function () { var c = new THREE.SphereGeometry(0.12, 14, 12, -Math.PI * 0.42, Math.PI * 0.84, 0.25, 1.9); return c; }), phwShine(0x0A0A0C, 0.45, 0.1));
m.scale.set(1, 1.16, 1.12);
m.position.y = 0.06;
H.add(m);
[-0.045, 0.045].forEach(function (x) { var e = new THREE.Mesh(phwGeo("phEyeHole", function () { return new THREE.SphereGeometry(0.018, 8, 6); }), phwLam(0x1A1206, { e: 0x2A1A04 })); e.scale.set(1.3, 0.8, 0.5); e.position.set(x, 0.08, 0.128); H.add(e); });
[-1, 1].forEach(function (k) { var lk = new THREE.Mesh(phwGeo("phLock", function () { return new THREE.BoxGeometry(0.012, 0.09, 0.02); }), phwLam(0x0E0A08)); lk.position.set(k * 0.1, 0.02, -0.02); H.add(lk); });
var b2 = new THREE.Mesh(phwGeo("phBrim", function () { return new THREE.CylinderGeometry(0.19, 0.19, 0.012, 20); }), phwLam(0x0A0A0C));
b2.position.y = 0.18;
H.add(b2);
var c2 = new THREE.Mesh(phwGeo("phCrown", function () { return new THREE.CylinderGeometry(0.1, 0.11, 0.16, 16); }), phwShine(0x0A0A0C, 0.35, 0.1));
c2.position.y = 0.26;
H.add(c2);
return H;
},
function (k) {
switch (k) {
case "plaster": return phwS("plaster", 0xF0EAD8, 4);
case "render": return phwS("b:stucco", 0xEAE2D0, 3);
case "ochre": return phwS("b:stucco", 0xE8CC98, 3);
case "rose": return phwS("b:stucco", 0xE8C0B0, 3);
case "grey": return phwS("b:stucco", 0xC8C8C4, 3);
case "ashlar": return phwS("b:ashlar", 0xE0D8C8, 2.4);
case "stone": return phwS("stone", 0xC8C0B0, 2.4);
case "greystone": return phwS("b:limestone", 0xA8A49C, 4);
case "darkstone": return phwS("b:limestone", 0x6A6660, 4);
case "brick": return phwS("brick", 0xB87A5E, 1.6);
case "slate": return phwS("b:slate", 0x5A5E68, 2);
case "tile": return phwS("b:terracotta", 0xA85A40, 1.6);
case "shingle": return phwS("shingle", 0x7A5A44, 2);
case "thatch": return phwThatchM();
case "oak": return phwS("b:oak", 0x8A5E3A, 1.4);
case "darkoak": return phwS("b:oak", 0x4A3020, 1.4);
case "floor": return phwS("b:oak", 0xA87A50, 1.8);
case "planks": return phwS("b:planks", 0x9A8060, 2);
case "deck": return phwS("b:deck", 0xB8A07A, 2);
case "hull": return phwS("b:planks", 0x4A3A2A, 2);
case "damask": return phwS("b:damask", 0x8A6A4A, 1.2);
case "bluepaper": return phwS("b:damask", 0x6A7A9A, 1.2);
case "greenpaper": return phwS("b:damask", 0x6A8A6A, 1.2);
case "velvet": return phwS("b:velvet", 0x6A1E22, 0.8);
case "leather": return phwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return phwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return phwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "ceiling": return phwLam(0xEDE6D6);
case "beams": return phwS("b:oak", 0x5A3E26, 1.4);
case "brass": return phwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "iron": return phwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "copper": return phwShine(0xC87A4A, 0.35, 0.85);
case "glass": return phwM("glass", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8ECE8, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.42, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "pane": return phwShine(0x26323A, 0.15, 0.3);
case "earth": return phwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return phwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "meadow": return phwS("grass", 0xB8D098, 4, { vc: 1 });
case "paving": return phwS("paving", 0xC8C0B0, 2.4);
case "cobble": return phwS("b:cotto", 0x9A9088, 1.2);
case "setts": return phwS("paving", 0x8A8478, 2.4);
case "gravel": return phwS("sand", 0x9A8C72, 3);
case "sand": return phwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "rock": return phwS("b:strata", 0x8A847A, 6);
case "darkrock": return phwS("b:strata", 0x5A5650, 7);
case "granite": return phwS("b:limestone", 0x9A948C, 5);
case "moss": return phwS("b:moss", 0x7A9A5A, 3);
case "bark": return phwS("bark", 0x8A7A64, 2.5);
case "darkbark": return phwS("bark", 0x5A4E40, 3);
case "birch": return phwS("bark", 0xE8E4DA, 2);
case "slush": return phwS("sand", 0xC4BCB0, 3);
case "snowroof": return phwS("snow", 0xD4D8DE, 3);
case "snow": return phwS("snow", 0xF4F6FA, 5, { vc: 1 });
case "snowwall": return phwS("snow", 0xF0F4FA, 3);
case "ice": return phwM("icem", function () { var m = phwLite() ? new THREE.MeshLambertMaterial({ color: 0xD8EAF4, map: phwPhotoTex("snow", 6) }) : new THREE.MeshPhongMaterial({ color: 0xD0E6F2, map: phwPhotoTex("snow", 6), shininess: 70, specular: 0x8AA8C0, vertexColors: true }); m.userData.noPhoto = 1; return m; });
case "blueice": return phwM("blueice", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8AC0DA, shininess: 110, specular: 0xE8F8FF, transparent: true, opacity: 0.92 }); m.userData.noPhoto = 1; return m; });
case "cloth": return phwLam(0xE8DCC4, { ds: 1 });
case "sail": return phwLam(0xE8E0CC, { ds: 1 });
case "rope": return phwLam(0x8A7A5A);
case "gilt": return phwS("b:brass", 0xF0C860, 0.7, { shine: 110 });
case "redvelvet": return phwS("b:velvet", 0x9A1A20, 0.6);
case "greenmarble": return phwS("b:marble", 0x3A6A50, 1.8, { shine: 70 });
case "redmarble": return phwS("b:marble", 0x9A4A3A, 1.8, { shine: 70 });
case "onyx": return phwS("b:marble", 0xE8D4A8, 1.4, { shine: 90 });
case "zinc": return phwS("b:slate", 0x7A8290, 2);
case "patina": return phwS("b:brass", 0x7AB098, 1.6, { shine: 30 });
case "cave": return phwS("b:cave", 0x8A8478, 4);
case "wetstone": return phwS("b:limestone", 0x5A5A58, 3, { shine: 60 });
case "pinkgranite": return phwS("b:limestone", 0xC8988A, 4);
case "mirror": return phwShine(0xE8ECF0, 0.04, 1.0);
case "blackcloth": return phwLam(0x0E0C10);
case "canvas": return phwLam(0xD8CCB0, { ds: 1 });
}
return phwS("earth", 0x8A7058, 5);
},
function () {
return phwM("thatch", function () {
var t = phwCanvas("thatch", 128, 128, function (c, W, H) { c.fillStyle = "#7A6640"; c.fillRect(0, 0, W, H); var R = wRand(41); for (var i = 0; i < 900; i++) {
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
var y = PHW_RY, h = o.h || 3.4, g = new THREE.Group();
g.position.set(cx, y, cz);
P.add(g);
g.userData.keep = 0;
var wall = phwMat(o.wall || "plaster"), fl = phwMat(o.floor || "floor");
phwBox(g, w, 0.12, d, fl, 0, -0.12, 0);
phwBox(g, w, 0.1, d, o.ceil ? phwMat(o.ceil) : phwMat("ceiling"), 0, h, 0);
[[0, -d / 2, w, 0.2], [0, d / 2, w, 0.2]].forEach(function (q, i) {
if (i === 1) {
var dw = 1.2;
phwBox(g, (w - dw) / 2, h, 0.2, wall, -(w + dw) / 4, 0, q[1]);
phwBox(g, (w - dw) / 2, h, 0.2, wall, (w + dw) / 4, 0, q[1]);
phwBox(g, dw, h - 2.3, 0.2, wall, 0, 2.3, q[1]);
phwBox(g, dw, 2.3, 0.08, phwMat(o.door || "darkoak"), 0, 0, q[1] - 0.06);
phwBox(g, 0.06, 0.06, 0.04, phwMat("brass"), 0.42, 1.0, q[1] - 0.12);
}
else
phwBox(g, q[2], h, 0.2, wall, q[0], 0, q[1]);
});
phwBox(g, 0.2, h, d, wall, -w / 2, 0, 0);
phwBox(g, 0.2, h, d, wall, w / 2, 0, 0);
if (!o.bare) {
var sk = phwMat(o.trim || "oak");
[[0, -d / 2 + 0.11, w - 0.2, 0.04], [0, d / 2 - 0.11, w - 0.2, 0.04]].forEach(function (q) { phwBox(g, q[2], 0.16, q[3], sk, q[0], 0, q[1]); });
[-w / 2 + 0.11, w / 2 - 0.11].forEach(function (x) { phwBox(g, 0.04, 0.16, d - 0.2, sk, x, 0, 0); });
}
if (o.beams)
for (var b = -w / 2 + 1; b < w / 2; b += 1.6)
phwBox(g, 0.18, 0.22, d - 0.2, phwMat("beams"), b, h - 0.22, 0);
phwSolid(cx, cz - d / 2, w, 0.3, y - 1, y + h + 1);
phwSolid(cx - w / 2, cz, 0.3, d, y - 1, y + h + 1);
phwSolid(cx + w / 2, cz, 0.3, d, y - 1, y + h + 1);
phwSolid(cx - (w + 1.2) / 4, cz + d / 2, (w - 1.2) / 2, 0.3, y - 1, y + h + 1);
phwSolid(cx + (w + 1.2) / 4, cz + d / 2, (w - 1.2) / 2, 0.3, y - 1, y + h + 1);
phwFloor(cx, cz, w, d, y);
var R = { key: key, x0: cx - w / 2, x1: cx + w / 2, z0: cz - d / 2, z1: cz + d / 2, cx: cx, cz: cz, w: w, d: d, y: y, h: h, env: o.env || "indoor", name: o.name || key, g: g, out: null };
PHW.rooms.push(R);
if (o.light !== false && !phwLite() && (PHW.lights || 0) < 5 && typeof THREE.PointLight === "function") {
var L = new THREE.PointLight(o.lightCol || 0xFFD8A0, o.lightI || 0.9, Math.max(w, d) * 1.4);
L.position.set(0, h - 0.6, 0);
g.add(L);
PHW.lights = (PHW.lights || 0) + 1;
}
return R;
},
function (R, name, ox, oz, ory) {
R.out = { x: ox, z: oz, ry: ory };
phwSpot(ox, oz, 1.8, name, "go in", function () { phwGo({ sc: PHW.sc, x: R.cx, z: R.z1 - 1.2, y: R.y, ry: 0 }, "🚪 <b>" + phEsc(R.name) + ".</b>"); if (typeof phbNote === "function")
phbNote("in:" + R.key); });
phwSpot(R.cx, R.z1 - 0.6, 1.4, "The door", "go out", function () { phwGo({ sc: PHW.sc, x: ox, z: oz, ry: ory != null ? ory : Math.PI }, null); if (typeof phbNote === "function")
phbNote("out:" + R.key); }, R.y);
PHW.doors.push(R);
return R;
},
function (fromKey, toKey, lx, lz, name, verb) {
var A = PHW.rooms.filter(function (r) { return r.key === fromKey; })[0], B = PHW.rooms.filter(function (r) { return r.key === toKey; })[0];
if (!A || !B)
return;
var x = A.cx + lx, z = A.cz + lz;
B.out = { x: x, z: z, ry: Math.PI, inner: fromKey };
phwSpot(x, z, 1.5, name, verb || "go through", function () { phwGo({ sc: PHW.sc, x: B.cx, z: B.z1 - 1.2, y: B.y, ry: 0 }, "🚪 <b>" + phEsc(B.name) + ".</b>"); if (typeof phbNote === "function")
phbNote("in:" + B.key); }, A.y);
phwSpot(B.cx, B.z1 - 0.6, 1.4, "Back to " + A.name, "go", function () { phwGo({ sc: PHW.sc, x: x, z: z + 1.2, y: A.y, ry: 0 }, null); if (typeof phbNote === "function")
phbNote("out:" + B.key); }, B.y);
PHW.doors.push(B);
return B;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wd = phwMat(o.mat || "oak");
phwBox(g, w, 0.06, d, o.cloth ? phwLam(o.cloth) : wd, 0, h - 0.06, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { phwBox(g, 0.07, h - 0.06, 0.07, wd, q[0] * (w / 2 - 0.08), 0, q[1] * (d / 2 - 0.08)); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = phwMat(o.mat || "oak");
phwBox(g, 0.46, 0.05, 0.44, o.seat ? phwMat(o.seat) : wd, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { phwBox(g, 0.04, 0.44, 0.04, wd, q[0] * 0.2, 0, q[1] * 0.19); });
phwBox(g, 0.46, 0.5, 0.04, wd, 0, 0.49, -0.2);
if (o.arm)
[-1, 1].forEach(function (s) { phwBox(g, 0.05, 0.22, 0.42, wd, s * 0.24, 0.5, 0); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = phwMat(o.mat || "oak");
phwBox(g, 1.1, 0.4, 2.0, wd, 0, 0, 0);
phwBox(g, 1.04, 0.18, 1.94, phwLam(o.cover || 0xE8E0CC), 0, 0.4, 0);
phwBox(g, 0.8, 0.12, 0.36, phwLam(0xF4F0E8), 0, 0.58, -0.7);
phwBox(g, 1.1, 0.9, 0.06, wd, 0, 0, -1.0);
if (o.posts)
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { phwBox(g, 0.07, 1.9, 0.07, wd, q[0] * 0.52, 0, q[1] * 0.97); });
return g;
},
function (P, x, z, w, h, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = phwMat(o.mat || "darkoak"), R = wRand(Math.round(x * 7 + z * 13 + w));
phwBox(g, w, h, 0.06, wd, 0, 0, -0.16);
[-w / 2, w / 2].forEach(function (s) { phwBox(g, 0.05, h, 0.36, wd, s, 0, 0); });
var rows = Math.floor(h / 0.42);
for (var r = 0; r <= rows; r++) {
var y = 0.05 + r * (h - 0.1) / rows;
phwBox(g, w, 0.04, 0.36, wd, 0, y, 0);
if (r === rows)
break;
if (o.jars) {
for (var j = -w / 2 + 0.12; j < w / 2 - 0.1; j += 0.18) {
var jm = new THREE.Mesh(phwGeo("jar", function () { return new THREE.CylinderGeometry(0.05, 0.055, 0.18, 10); }), R() < 0.5 ? phwMat("glass") : phwLam([0x6A8A6A, 0x8A6A3A, 0xC8C0A0][Math.floor(R() * 3)]));
jm.position.set(j, y + 0.13, 0);
g.add(jm);
}
continue;
}
var bx = -w / 2 + 0.06;
while (bx < w / 2 - 0.08) {
var bw = 0.03 + R() * 0.05, bh = 0.22 + R() * 0.12;
phwBox(g, bw, bh, 0.24, phwLam([0x6A2A1A, 0x2A3A5A, 0x3A4A2A, 0x5A4020, 0x7A6A4A, 0x2A2A2A][Math.floor(R() * 6)]), bx + bw / 2, y + 0.04, 0.02);
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
var st = phwMat(o.mat || "ashlar");
phwBox(g, 1.8, 1.3, 0.5, st, 0, 0, 0);
phwBox(g, 1.0, 0.8, 0.52, phwLam(0x141210), 0, 0, 0.02);
phwBox(g, 2.0, 0.1, 0.6, phwMat("darkoak"), 0, 1.3, 0.04);
if (o.chimney !== false)
phwBox(g, 1.4, (o.h || 3.4) - 1.4, 0.4, st, 0, 1.4, -0.04);
if (o.fire !== false) {
var f = phwFire(g, 0, 0.02, 0.12, 0.6);
}
if (o.pot) {
phwCyl(g, 0.2, 0.16, 0.26, phwMat("iron"), 0, 0.3, 0.12, 12);
}
return g;
},
function (P, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
phwCyl(g, 0.06, 0.07, 0.03, phwMat(o.brass ? "brass" : "iron"), 0, 0, 0, 10);
phwCyl(g, 0.018, 0.018, 0.16, phwLam(0xF4EEDC), 0, 0.03, 0, 8);
var f = new THREE.Mesh(phwGeo("cflame", function () { return new THREE.ConeGeometry(0.014, 0.05, 6); }), phwGlowM(0xFFD070, 0.9));
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
var m = phwMat(o.mat || "darkoak");
phwBox(g, w, 0.07, d, m, 0, 0.42, 0);
[-1, 1].forEach(function (k) { phwBox(g, 0.07, 0.42, d * 0.86, m, k * (w / 2 - 0.12), 0, 0); });
if (w > 2.6)
phwBox(g, 0.07, 0.42, d * 0.86, m, 0, 0, 0);
if (o.back !== false) {
phwBox(g, w, 0.55, 0.06, m, 0, 0.49, -d / 2 + 0.03);
phwBox(g, w, 0.05, 0.09, m, 0, 1.03, -d / 2 + 0.04);
}
if (o.cushion)
phwBox(g, w - 0.1, 0.06, d - 0.06, phwLam(o.cushion), 0, 0.49, 0.02);
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), phwM("rug" + col, function () {
var t = phwCanvas("rugt" + col, 256, 256, function (c, W, H) {
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
phwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
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
var t = phwCanvas("pic" + x.toFixed(1) + z.toFixed(1) + w, 128, Math.round(128 * h / w), draw || function (c, W, H) { var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#6A8AB0"); g.addColorStop(0.6, "#D8D0B0"); g.addColorStop(1, "#4A5A30"); c.fillStyle = g; c.fillRect(0, 0, W, H); c.fillStyle = "#5A6A7A"; c.beginPath(); c.moveTo(0, H * 0.7); c.lineTo(W * 0.3, H * 0.35); c.lineTo(W * 0.55, H * 0.6); c.lineTo(W * 0.8, H * 0.3); c.lineTo(W, H * 0.7); c.fill(); });
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
phwBox(g, w + 0.12, h + 0.12, 0.04, phwMat("brass"), 0, -h / 2 - 0.06, 0);
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), phwLam(0xFFFFFF, { map: t, mapk: "pic" + x.toFixed(1) + z.toFixed(1) + w }));
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), phwGlowM(col));
m.position.z = 0.02;
g.add(m);
phwBox(g, w + 0.16, 0.08, 0.12, phwMat("oak"), 0, -h / 2 - 0.04, 0.04);
phwBox(g, 0.05, h, 0.06, phwMat("oak"), 0, -h / 2, 0.05);
phwBox(g, w, 0.04, 0.06, phwMat("oak"), 0, -0.02, 0.05);
[-1, 1].forEach(function (s) { phwBox(g, 0.05, h, 0.06, phwMat("oak"), s * w / 2, -h / 2, 0.05); });
return g;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : phwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = phwMat(o.wall || "render"), trim = phwMat(o.trim || "ashlar"), sh = phwLam(o.shut || 0x4A6A4A), pane = phwMat("pane"), lite = phwLite();
phwBox(g, w, h, d, wall, 0, 0, 0);
phwBox(g, w + 0.1, 0.6, d + 0.1, phwMat("greystone"), 0, 0, 0);
phwBox(g, w + 0.3, 0.22, d + 0.3, trim, 0, h - 0.22, 0);
var rh = o.rh || Math.min(w, d) * 0.62, roofM = phwMat(o.roof || "tile");
var rf = new THREE.Mesh(phwGeo("gab" + w.toFixed(1) + "|" + d.toFixed(1) + "|" + rh.toFixed(1) + (o.hip ? "h" : ""), function () {
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
phwBox(g, 0.7, rh * 0.9, 0.7, phwMat("brick"), w * 0.28, h + rh * 0.3, -d * 0.15);
if (o.dormer && !lite)
[-1, 1].forEach(function (s) { var dg = new THREE.Group(); dg.position.set(s * w * 0.22, h + rh * 0.25, d / 2 - rh * 0.3); g.add(dg); phwBox(dg, 0.9, 0.9, 0.8, wall, 0, 0, 0); phwBox(dg, 0.6, 0.6, 0.04, pane, 0, 0.15, 0.41); });
var n = Math.max(1, Math.floor(w / 2.6)), floors = Math.max(1, Math.round((h - 0.4) / 3.1));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 0.9 + f * 3.1;
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
phwBox(g, 1.2, 2.4, 0.1, phwMat(o.doorM || "darkoak"), wx, 0, d / 2 + 0.02);
phwBox(g, 1.5, 0.25, 0.16, trim, wx, 2.4, d / 2 + 0.05);
phwBox(g, 1.6, 0.14, 0.6, phwMat("greystone"), wx, 0, d / 2 + 0.3);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
phwBox(g, 1.0, 1.7, 0.08, trim, wx, wy, zz);
phwBox(g, 0.8, 1.5, 0.06, pane, wx, wy + 0.1, zz + (k ? -0.03 : 0.03));
phwBox(g, 0.8, 0.04, 0.07, trim, wx, wy + 0.85, zz + (k ? -0.05 : 0.05));
if (!lite)
[-1, 1].forEach(function (s) { phwBox(g, 0.42, 1.6, 0.05, sh, wx + s * 0.64, wy + 0.05, zz + (k ? -0.07 : 0.07)); });
});
}
phwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = phwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = phwMat(o.wall || "ashlar"), roof = phwMat(o.roof || "slate"), L = o.len || 30, W = o.w || 13, H = o.h || 13;
phwBox(g, W, H, L, wall, 0, 0, 0);
var rf = new THREE.Mesh(phwGeo("chr" + W + "|" + L, function () { var s = new THREE.Shape(); s.moveTo(-W / 2 - 0.4, 0); s.lineTo(0, W * 0.55); s.lineTo(W / 2 + 0.4, 0); s.lineTo(-W / 2 - 0.4, 0); var e = new THREE.ExtrudeGeometry(s, { depth: L + 0.6, bevelEnabled: false }); e.translate(0, 0, -(L + 0.6) / 2); return e; }), roof);
rf.position.y = H;
g.add(rf);
for (var i = 0; i < 5; i++) {
var wz = -L / 2 + 4 + i * (L - 8) / 4;
[-1, 1].forEach(function (s) { phwBox(g, 0.12, 5, 1.6, phwMat("pane"), s * (W / 2 + 0.05), 3.5, wz); phwBox(g, 0.14, 0.4, 1.9, wall, s * (W / 2 + 0.06), 8.5, wz); });
}
var T = o.tower || 6, TH = o.th || 26;
phwBox(g, T, TH, T, wall, 0, 0, L / 2 + T / 2 - 0.5);
phwBox(g, T + 0.4, 0.4, T + 0.4, phwMat("greystone"), 0, TH - 0.4, L / 2 + T / 2 - 0.5);
if (o.clock) {
var cl = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), phwLam(0xF4F0E4));
cl.position.set(0, TH - 3.5, L / 2 + T - 0.45);
g.add(cl);
var hd = phwBox(g, 0.08, 0.9, 0.04, phwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.4);
hd.rotation.z = 0.0;
var md = phwBox(g, 0.06, 1.1, 0.04, phwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.38);
md.rotation.z = Math.PI;
g.userData.clock = [hd, md];
}
if (o.dome) {
var dm = new THREE.Mesh(phwGeo("bulb", function () { var pts = []; for (var k = 0; k <= 12; k++) {
var t = k / 12;
pts.push(new THREE.Vector2(Math.max(0.05, Math.sin(t * Math.PI) * (1.2 - t * 0.6)) * T * 0.45, t * T * 1.1));
} return new THREE.LatheGeometry(pts, 16); }), phwShine(o.domeCol || 0x4A4A50, 0.4, 0.6));
dm.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(dm);
}
else {
var sp = new THREE.Mesh(phwGeo("spire" + T, function () { var c = new THREE.ConeGeometry(T * 0.62, T * 2.6, 8); c.translate(0, T * 1.3, 0); return c; }), o.spireM || phwShine(0xF2F0EA, 0.6, 0.05));
sp.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(sp);
}
phwBox(g, 2.2, 3.6, 0.2, phwMat("darkoak"), 0, 0, L / 2 + T - 0.4);
phwSolid(x, z, W, L, y - 1, y + H + 8, o.ry || 0);
var tz = Math.cos(o.ry || 0) * (L / 2 + T / 2 - 0.5), tx = Math.sin(o.ry || 0) * (L / 2 + T / 2 - 0.5);
phwSolid(x + tx, z + tz, T, T, y - 1, y + TH + T * 2.6, o.ry || 0);
return g;
},
function (P, x0, z0, x1, z1, h, gate) {
var dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz), ry = Math.atan2(dx, dz) + Math.PI / 2, n = Math.ceil(L / 12), st = phwMat("greystone");
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, mx = x0 + dx * (t0 + t1) / 2, mz = z0 + dz * (t0 + t1) / 2, seg = L / n;
if (gate && Math.hypot(mx - gate[0], mz - gate[1]) < seg * 0.6)
continue;
phwBox(P, seg + 0.2, h, 2, st, mx, phwLand(mx, mz) - 0.5, mz, ry, true);
for (var c = 0; c < 3; c++) {
var cx = mx + Math.cos(ry) * (-seg / 3 + c * seg / 3), cz = mz - Math.sin(ry) * (-seg / 3 + c * seg / 3);
phwBox(P, 1.2, 0.8, 2, st, cx, phwLand(mx, mz) - 0.5 + h, cz, ry);
}
}
},
function (P, list, o) {
o = o || {};
if (!list.length)
return;
var lite = phwLite();
if (lite && list.length > 80)
list = list.filter(function (t, i) { return i % 2 === 0; });
phwInst(P, phwGeo("firT", function () { var g = new THREE.CylinderGeometry(0.16, 0.34, 9, 6); g.translate(0, 4.5, 0); return g; }), phwMat("darkbark"), list, { shadow: !lite });
phwInst(P, phwGeo("firC" + (lite ? "l" : ""), function () { var parts = []; var n = lite ? 4 : 7; for (var i = 0; i < n; i++) {
var r = 2.6 - i * (2.2 / n), c = new THREE.ConeGeometry(r, 2.6, lite ? 7 : 10, 1);
c.translate(0, 2.2 + i * 1.15, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), phwM("firM" + (o.snow ? "s" : ""), function () {
var t = phwCanvas("needles", 128, 128, function (c, W, H) { c.fillStyle = "#24402A"; c.fillRect(0, 0, W, H); var R = wRand(7); for (var i = 0; i < 1600; i++) {
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
var lite = phwLite();
phwInst(P, phwGeo("birT", function () { var g = new THREE.CylinderGeometry(0.1, 0.16, 8, 6); g.translate(0, 4, 0); return g; }), phwMat("birch"), list, {});
phwInst(P, phwGeo("birC", function () { var parts = [], R = wRand(13); for (var i = 0; i < (lite ? 3 : 6); i++) {
var c = new THREE.IcosahedronGeometry(1.2 + R() * 0.8, 1);
c.translate((R() - 0.5) * 2.4, 6 + R() * 2.6, (R() - 0.5) * 2.4);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), phwM("birL", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AAA4A, map: phwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
},
function (P, x, z, r, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, o.y || 0, z);
P.add(g);
var R = wRand(Math.round(x + z));
var geo = phwGeo("peak" + (o.k || 0), function () { var c = new THREE.ConeGeometry(1, 1, 14, 6); var pa = c.attributes.position, RR = wRand(o.k || 3); for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i);
if (y < 0.49) {
var j = 0.82 + RR() * 0.36;
pa.setX(i, pa.getX(i) * j);
pa.setZ(i, pa.getZ(i) * j);
pa.setY(i, y + (RR() - 0.5) * 0.06);
}
} c.computeVertexNormals(); c.translate(0, 0.5, 0); return c; });
var rock = new THREE.Mesh(geo, o.mat || phwMat("darkrock"));
rock.scale.set(r, h, r * (o.sz || 1));
g.add(rock);
var cap = new THREE.Mesh(geo, phwMat("snowwall"));
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
var hull = phwMat(o.hull || "hull");
var h = new THREE.Mesh(phwGeo("rowb", function () { var c = new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); c.scale(0.9, 0.55, 2.8); return c; }), hull);
h.position.y = 0.5;
g.add(h);
phwBox(g, 1.5, 0.06, 0.3, phwMat("planks"), 0, 0.38, -0.6);
phwBox(g, 1.5, 0.06, 0.3, phwMat("planks"), 0, 0.38, 0.8);
[-1, 1].forEach(function (s) { var oar = phwBox(g, 0.05, 0.05, 2.6, phwMat("oak"), s * 0.95, 0.5, 0.1); oar.rotation.z = s * 0.2; });
if (o.mast) {
phwCyl(g, 0.04, 0.05, 3.4, phwMat("oak"), 0, 0.4, -1.0, 6);
var sl = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), phwMat("sail"));
sl.position.set(0, 2.4, -0.6);
sl.rotation.y = Math.PI / 2;
g.add(sl);
}
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : phwLand(x, z), w = o.w || 9, d = o.d || 8, h = o.h || 6.4, lite = phwLite();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var brick = phwS("brick", o.brick || 0xB86A4E, 1.4), trim = phwLam(0xF2EEE2), stone = phwMat("ashlar"), pane = phwMat("pane"), slate = phwMat("slate");
phwBox(g, w, h, d, brick, 0, 0, 0);
phwBox(g, w + 0.12, 0.5, d + 0.12, phwMat("darkstone"), 0, 0, 0);
phwBox(g, w + 0.2, 0.16, d + 0.2, stone, 0, 3.1, 0);
phwBox(g, w + 0.3, 0.2, d + 0.3, trim, 0, h - 0.2, 0);
var rh = o.rh || 3.2;
var rf = new THREE.Mesh(phwGeo("hip" + w + "|" + d + "|" + rh, function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); c.scale(w + 0.8, rh, d + 0.8); return c; }), slate);
rf.position.y = h;
g.add(rf);
[-1, 1].forEach(function (s) { phwBox(g, 0.9, rh + 1.8, 0.6, brick, s * w * 0.3, h, 0); phwCyl(g, 0.12, 0.12, 0.5, phwLam(0xA85A3A), s * w * 0.3 - 0.2, h + rh + 1.8, 0, 8); phwCyl(g, 0.12, 0.12, 0.5, phwLam(0xA85A3A), s * w * 0.3 + 0.2, h + rh + 1.8, 0, 8); });
var bx = -w * 0.22;
phwBox(g, 3.2, h - 0.6, 1.2, brick, bx, 0, d / 2 + 0.6);
var br = phwBox(g, 3.6, 0.5, 1.6, slate, bx, h - 0.6, d / 2 + 0.6);
br.rotation.x = -0.25;
[0.9, 4.0].forEach(function (wy) { phwBox(g, 2.6, 1.7, 0.06, trim, bx, wy, d / 2 + 1.22); phwBox(g, 2.4, 1.5, 0.06, pane, bx, wy + 0.1, d / 2 + 1.25); phwBox(g, 0.06, 1.5, 0.08, trim, bx - 0.8, wy + 0.1, d / 2 + 1.27); phwBox(g, 0.06, 1.5, 0.08, trim, bx + 0.8, wy + 0.1, d / 2 + 1.27); });
var dx = w * 0.25;
phwBox(g, 1.1, 2.4, 0.08, phwLam(o.door || 0x2A3A2A), dx, 0.2, d / 2 + 0.04);
phwBox(g, 1.6, 0.14, 1.2, trim, dx, 2.8, d / 2 + 0.6);
[-1, 1].forEach(function (s) { phwBox(g, 0.1, 2.6, 0.1, trim, dx + s * 0.7, 0.2, d / 2 + 1.1); });
phwBox(g, 1.6, 0.2, 1.0, stone, dx, 0, d / 2 + 0.6);
phwBox(g, 0.5, 0.05, 0.4, phwLam(0xC8B080), dx + 0.3, 1.6, d / 2 + 0.08);
var win = function (wx, wy, zz, rot) { var q = new THREE.Group(); q.position.set(wx, wy, zz); q.rotation.y = rot; g.add(q); phwBox(q, 1.1, 1.7, 0.06, trim, 0, 0, 0); phwBox(q, 0.9, 1.5, 0.06, pane, 0, 0.1, 0.02); phwBox(q, 1.3, 0.12, 0.2, stone, 0, -0.06, 0.06); phwBox(q, 1.2, 0.16, 0.12, stone, 0, 1.7, 0.03); };
win(dx, 4.0, d / 2 + 0.02, 0);
[-w * 0.25, w * 0.2].forEach(function (wx) { win(wx, 0.9, -d / 2 - 0.02, Math.PI); win(wx, 4.0, -d / 2 - 0.02, Math.PI); });
[-1, 1].forEach(function (s) { win(s * (w / 2 + 0.02), 4.0, 0, s * Math.PI / 2); });
if (o.garden !== false) {
var gz = d / 2 + (o.gd || 6);
phwBox(g, w + 4, 0.7, 0.3, brick, 0, 0, gz);
phwBox(g, w + 4.2, 0.1, 0.4, stone, 0, 0.7, gz);
phwBox(g, 1.2, 0.05, gz - d / 2 - 0.6, phwMat("gravel"), dx, 0.02, (gz + d / 2) / 2 + 0.3);
if (!lite)
phwPlant(P, "bush", [{ x: x + Math.cos(o.ry || 0) * (-w * 0.4) + Math.sin(o.ry || 0) * (d / 2 + 3), z: z - Math.sin(o.ry || 0) * (-w * 0.4) + Math.cos(o.ry || 0) * (d / 2 + 3), y: y, s: 0.9, ry: 0 }], { col: 0x2E4A26, keepAll: true });
}
phwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
g.userData.door = { x: dx, z: d / 2 + 1.6 };
return g;
},
function (P, x, z, n, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : phwLand(x, z), sw = o.sw || 6, d = o.d || 9, h = o.h || 8.6;
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var names = o.names || ["GROCER", "BUTCHER", "DRAPER", "CHEMIST", "IRONMONGER", "BAKER", "TOBACCONIST", "NEWSAGENT", "BOOTMAKER", "POST OFFICE"], cols = [0x2A3A5A, 0x5A1E1E, 0x2A4A2A, 0x3A2A1A, 0x4A3A5A, 0x1E3A3A], R = wRand(Math.round(x * 3 + z));
var brick = phwS("brick", 0xA86048, 1.4), slate = phwMat("slate"), trim = phwLam(0xF2EEE2), pane = phwMat("pane");
for (var i = 0; i < n; i++) {
var cx = -((n - 1) * sw) / 2 + i * sw, c = cols[Math.floor(R() * cols.length)], ht = h + (i % 3) * 0.4;
phwBox(g, sw - 0.05, ht, d, brick, cx, 0, 0);
var rf = new THREE.Mesh(phwGeo("shr" + sw + "|" + d, function () { var s = new THREE.Shape(); s.moveTo(-d / 2 - 0.3, 0); s.lineTo(0, 2.6); s.lineTo(d / 2 + 0.3, 0); s.lineTo(-d / 2 - 0.3, 0); var e = new THREE.ExtrudeGeometry(s, { depth: sw, bevelEnabled: false }); e.translate(0, 0, -sw / 2); e.rotateY(Math.PI / 2); return e; }), slate);
rf.position.set(cx, ht, 0);
g.add(rf);
phwBox(g, sw - 0.3, 3.3, 0.12, phwLam(c), cx, 0, d / 2 + 0.04);
phwBox(g, sw - 1.6, 2.3, 0.06, pane, cx - 0.5, 0.5, d / 2 + 0.12);
phwBox(g, 1.0, 2.4, 0.08, phwLam(0x1E1A16), cx + sw / 2 - 0.9, 0, d / 2 + 0.12);
phwSign(g, o.names ? names[i % names.length] : names[Math.floor(R() * names.length)], sw - 0.6, 0.62, cx, 3.0, d / 2 + 0.2, 0, { bg: "#" + c.toString(16).padStart(6, "0"), ink: "#F0D890" });
if (!phwLite()) {
var aw = phwBox(g, sw - 0.4, 0.06, 1.6, phwLam([0xC8B080, 0x8A3A2A, 0x3A5A3A][i % 3], { ds: 1 }), cx, 2.7, d / 2 + 0.8);
aw.rotation.x = 0.3;
}
[0, 1].forEach(function (f) { for (var k = -1; k <= 1; k += 2) {
phwBox(g, 1.0, 1.6, 0.06, trim, cx + k * sw * 0.22, 4.2 + f * 2.4, d / 2 + 0.03);
phwBox(g, 0.8, 1.4, 0.06, pane, cx + k * sw * 0.22, 4.3 + f * 2.4, d / 2 + 0.06);
} });
}
phwSolid(x, z, n * sw, d, y - 1, y + h + 3, o.ry || 0);
return g;
},
function (P, pts, hfn) {
var lite = phwLite();
phwStrip(P, pts, 7, hfn, phwMat("gravel"), 0.12);
var sl = [], rl = [];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ry = Math.atan2(b[0] - a[0], b[1] - a[1]), n = Math.floor(L / (lite ? 1.6 : 0.8));
for (var k = 0; k < n; k++) {
var t = k / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t;
[-1.6, 1.6].forEach(function (o) { sl.push({ x: x + Math.cos(ry) * o, z: z - Math.sin(ry) * o, y: hfn(x, z) + 0.16, ry: ry }); });
}
[-2.32, -0.88, 0.88, 2.32].forEach(function (o) { var m = new THREE.Mesh(phwGeo("rail", function () { return new THREE.BoxGeometry(0.08, 0.14, 1); }), phwMat("iron")); var mx = (a[0] + b[0]) / 2 + Math.cos(ry) * o, mz = (a[1] + b[1]) / 2 - Math.sin(ry) * o; m.position.set(mx, hfn(mx, mz) + 0.3, mz); m.rotation.y = ry; m.scale.z = L; P.add(m); });
}
phwInst(P, phwGeo("sleeper", function () { return new THREE.BoxGeometry(2.4, 0.14, 0.26); }), phwMat("darkoak"), sl, {});
},
function (P, x, z, len, name, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : phwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
phwBox(g, 6, 1.0, len, phwMat("paving"), 0, 0, 0);
phwBox(g, 6.1, 0.12, len, phwMat("ashlar"), 0, 1.0, 0);
for (var i = 0; i < Math.floor(len / 6); i++) {
var cz = -len / 2 + 3 + i * 6;
phwCyl(g, 0.1, 0.12, 4, phwLam(0x2A4A3A), 1.6, 1, cz, 8);
}
var cn = phwBox(g, 5, 0.1, len * 0.7, phwLam(0xD8D0C0, { ds: 1 }), 0.6, 5.0, 0);
cn.rotation.z = 0.12;
phwBox(g, 0.2, 0.4, len * 0.7, phwLam(0x2A4A3A), 3, 4.8, 0);
phwBox(g, 4, 3.8, 12, phwS("brick", 0xA86048, 1.4), -1, 1, 0);
phwBox(g, 4.4, 0.3, 12.4, phwLam(0xF2EEE2), -1, 4.8, 0);
phwBox(g, 1.2, 2.3, 0.08, phwLam(0x2A3A2A), 1.02, 1, 0);
phwSign(g, name, 5, 0.8, 2.9, 2.6, len / 2 - 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
phwSign(g, name, 5, 0.8, 2.9, 2.6, -len / 2 + 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
phwFloor(x, z, 6, len, y + 1.12, {});
phwSolid(x + Math.cos(o.ry || 0) * (-1), z - Math.sin(o.ry || 0) * (-1), 4, 12, y, y + 5, o.ry || 0);
return g;
},
function (P, x, z, len, w, y, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var br = phwS("brick", 0x9A5A40, 1.4), rise = o.rise || 1.6, n = 8;
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, z0 = -len / 2 + len * t0, z1 = -len / 2 + len * t1, y0 = Math.sin(t0 * Math.PI) * rise, y1 = Math.sin(t1 * Math.PI) * rise, seg = phwBox(g, w, 0.5, len / n + 0.05, br, 0, (y0 + y1) / 2 - 0.4, (z0 + z1) / 2);
seg.rotation.x = -Math.atan2(y1 - y0, len / n);
[-1, 1].forEach(function (s) { var pr = phwBox(g, 0.4, 1.0, len / n + 0.05, br, s * (w / 2 - 0.2), (y0 + y1) / 2, (z0 + z1) / 2); pr.rotation.x = -Math.atan2(y1 - y0, len / n); });
}
var ar = new THREE.Mesh(phwGeo("arch" + w, function () { var t = new THREE.TorusGeometry(3, 0.6, 6, 12, Math.PI); return t; }), br);
ar.rotation.y = Math.PI / 2;
ar.position.y = -3.2;
g.add(ar);
var ry = o.ry || 0, cx = function (lz) { return x + Math.sin(ry) * lz; }, cz = function (lz) { return z + Math.cos(ry) * lz; };
phwRamp(cx(-len / 4), cz(-len / 4), w - 0.8, len / 2, y - 0.1, y + rise - 0.1, ry);
phwRamp(cx(len / 4), cz(len / 4), w - 0.8, len / 2, y + rise - 0.1, y - 0.1, ry);
[-1, 1].forEach(function (s) { phwSolid(x + Math.cos(ry) * s * (w / 2 - 0.2), z - Math.sin(ry) * s * (w / 2 - 0.2), 0.4, len, y - 1, y + rise + 1.1, ry); });
return g;
},
function (P, x, z, hfn, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var ir = phwLam(0x1E2A22);
phwCyl(g, 0.07, 0.12, 3.4, ir, 0, 0, 0, 8);
phwBox(g, 0.7, 0.06, 0.06, ir, 0, 3.1, 0);
var lt = phwBox(g, 0.34, 0.5, 0.34, phwGlowM(o.lit ? 0xFFE0A0 : 0xE8E4D0, o.lit ? 0.95 : 0.6), 0, 3.4, 0);
var cap = new THREE.Mesh(phwGeo("lampcap", function () { return new THREE.ConeGeometry(0.3, 0.3, 4); }), ir);
cap.position.y = 4.05;
cap.rotation.y = Math.PI / 4;
g.add(cap);
if (o.lit) {
var gl = wGlow(0xFFD890, 0.9, 2.4);
gl.position.y = 3.6;
g.add(gl);
}
phwRound(x, z, 0.2, hfn(x, z) - 1, hfn(x, z) + 3.5);
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
phwInst(P, phwGeo("tpole", function () { var p = new THREE.CylinderGeometry(0.1, 0.14, 8, 6); p.translate(0, 4, 0); var c = new THREE.BoxGeometry(1.6, 0.1, 0.1); c.translate(0, 7.4, 0); var c2 = new THREE.BoxGeometry(1.2, 0.1, 0.1); c2.translate(0, 6.8, 0); return gwMerge([p.toNonIndexed(), c, c2].map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), phwMat("darkoak"), list, {});
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
phwInst(P, phwGeo("drywall", function () { var b = new THREE.BoxGeometry(0.7, 1.1, 2.5); b.translate(0, 0.5, 0); return b; }), phwMat("granite"), list, {});
list.forEach(function (q) { phwSolid(q.x, q.z, 0.8, 2.5, q.y - 1, q.y + 1.1, q.ry); });
return;
}
if (o.hedge) {
phwPlant(P, "bush", list.map(function (q, i) { return { x: q.x, z: q.z, y: q.y - 0.2, s: 0.85 + ((i * 37) % 10) / 40, ry: i * 1.7 }; }), { col: 0x4A6A30, keepAll: true });
return;
}
phwInst(P, phwGeo(o.hedge ? "hedge" : "paling", function () { if (o.hedge) {
var h = new THREE.BoxGeometry(0.9, 1.4, 2.5, 2, 2, 2);
h.translate(0, 0.7, 0);
return h;
} var parts = []; for (var j = 0; j < 6; j++) {
var s = new THREE.BoxGeometry(0.06, 1.1, 0.08);
s.translate(0, 0.55, -1.0 + j * 0.4);
parts.push(s);
} var r = new THREE.BoxGeometry(0.05, 0.08, 2.4); r.translate(0, 0.85, 0); parts.push(r); var r2 = r.clone(); r2.translate(0, -0.5, 0); parts.push(r2); return gwMerge(parts.map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), o.hedge ? phwM("hedgeM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x3A5A2A, map: phwLeafTex(), alphaTest: 0.3 }); m.userData.noPhoto = 1; return m; }) : phwLam(o.col || 0xE8E2D2), list, {});
},
function (P, x, z, r, hfn, fires) {
var m = new THREE.Mesh(new THREE.CircleGeometry(r, 18), phwM("scorch", function () { var mm = new THREE.MeshLambertMaterial({ color: 0x14100C, transparent: true, opacity: 0.85, depthWrite: false }); mm.userData.noPhoto = 1; return mm; }));
m.rotation.x = -Math.PI / 2;
m.position.set(x, hfn(x, z) + 0.05, z);
P.add(m);
var R = wRand(Math.round(x * 7 + z));
for (var i = 0; i < (fires || 0); i++) {
var a = R() * 6.283, d = R() * r * 0.8, fx = x + Math.cos(a) * d, fz = z + Math.sin(a) * d;
var f = phwFire(P, fx, hfn(fx, fz), fz, 0.6 + R() * 0.8);
f.userData.keep = 1;
}
return m;
},
function (P, list) { if (!list.length)
return; phwInst(P, phwGeo("deadT", function () { var t = new THREE.CylinderGeometry(0.12, 0.3, 6, 6); t.translate(0, 3, 0); var b = new THREE.CylinderGeometry(0.05, 0.1, 2.4, 5); b.rotateZ(0.9); b.translate(0.8, 4.2, 0); var b2 = b.clone(); b2.rotateY(2.4); return gwMerge([t.toNonIndexed(), b.toNonIndexed(), b2.toNonIndexed()]); }), phwLam(0x1A1612), list, {}); },
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : phwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
var wd = phwMat(o.mat || "oak"), blk = phwLam(0x1A1612);
var L = o.len || 2.6, W = o.w || 1.5;
phwBox(g, W, 0.5, L, wd, 0, 0.8, 0);
if (o.seat)
phwBox(g, W, 0.5, 0.5, phwLam(o.seatCol || 0x3A2A1E), 0, 1.3, -0.3);
if (o.load)
for (var i = 0; i < o.load; i++)
phwBox(g, 0.6, 0.4 + i % 2 * 0.2, 0.6, phwLam([0x8A6A4A, 0x5A4A3A, 0xC8B898, 0x6A3A2A][i % 4]), -0.4 + (i % 3) * 0.4, 1.3, -0.8 + Math.floor(i / 3) * 0.6);
[-1, 1].forEach(function (s) { var wh = new THREE.Mesh(phwGeo("cwheel", function () { return new THREE.TorusGeometry(0.75, 0.05, 6, 16); }), blk); wh.position.set(s * (W / 2 + 0.1), 0.75, 0.2); wh.rotation.y = Math.PI / 2; g.add(wh); for (var k = 0; k < 5; k++) {
var sp = phwBox(g, 0.03, 1.5, 0.03, wd, s * (W / 2 + 0.1), 0, 0.2);
sp.position.y = 0.75;
sp.rotation.x = k / 5 * Math.PI;
} });
[-1, 1].forEach(function (s) { phwBox(g, 0.06, 0.06, 2.4, wd, s * 0.45, 0.9, -L / 2 - 1.1); });
if (o.horse !== false)
phwHorse(g, 0, 0, -L / 2 - 2.0, 0, { col: o.hcol || 0x5A3A22, kind: o.kind });
if (!o.nosolid)
phwSolid(x, z, W + 0.6, L + 2, y - 1, y + 2.2, ry || 0);
return g;
},
function (P, hfn, col, o) {
o = o || {};
var R = o.r || 2600, st = phwLite() ? 160 : 100, E = o.edge || 820, cl = function (v) { return Math.max(-E, Math.min(E, v)); };
return phwTerrain(P, -R, -R, 2 * R, 2 * R, st, function (x, z) { var e = Math.max(Math.abs(x), Math.abs(z)), k = phwSmooth(E, R, e); return hfn(cl(x), cl(z)) * (1 - k) + (o.rise || 18) * k * phwFbm(x * 0.002, z * 0.002, 2) - 0.6 - 8 * (1 - k); }, phwMat("meadow"), function (x, z, y, c) { var g = 0.75 + phwFbm(x * 0.01, z * 0.01, 2) * 0.2, C = typeof col === "number" ? [((col >> 16) & 255) / 255, ((col >> 8) & 255) / 255, (col & 255) / 255] : (col || [0.56, 0.74, 0.42]); c.setRGB(C[0] * g, C[1] * g, C[2] * g); });
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
var lite = phwLite(), R = wRand(o.seed || 5), L = phwPathLen(pts), W = o.w || 8, mv = [], g = new THREE.Group();
P.add(g);
g.userData.keep = 1;
g.userData.live = 1;
var dress = o.dress || ["gent", "lady", "maid", "worker", "boy", "girl", "porter", "cabby", "clergy", "newsboy"], n = lite ? Math.round((o.n || 40) * 0.4) : (o.n || 40), nc = lite ? Math.round((o.carts || 8) * 0.5) : (o.carts || 8);
for (var i = 0; i < n; i++) {
var d = dress[Math.floor(R() * dress.length)], kid = d === "boy" || d === "girl", m = phwDressed((o.seed || 5) * 100 + i, d, { sex: d === "lady" || d === "maid" || d === "girl" ? "f" : "m", child: kid });
g.add(m);
mv.push({ g: m, s: R() * L, off: (R() - 0.5) * W, sp: (o.sp || 1.4) * (0.8 + R() * 0.5) });
}
for (i = 0; i < nc; i++) {
var c = phwCart(g, 0, 0, 0, { y: 0, nosolid: true, seat: R() < 0.6, load: Math.floor(R() * 6), hcol: [0x5A3A22, 0x2A1E16, 0x8A6A4A, 0x3A3028][i % 4], len: 2 + R() * 1.4 });
mv.push({ g: c, s: R() * L, off: (R() - 0.5) * W * 0.5, sp: (o.sp || 1.4) * (0.9 + R() * 0.3), cart: 1 });
}
var on = true;
PHW.ticks.push(function (dt) { if (!g.parent || !on)
return; mv.forEach(function (M) { M.s += M.sp * dt; if (M.s > L)
M.s -= L; var p = phwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); }); });
mv.forEach(function (M) { var p = phwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); });
g.userData.stop = function () { on = false; };
return g;
},
function (P, x, y, z, s, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
g.scale.setScalar(s || 1);
P.add(g);
var m = o.mat || phwMat("gilt");
phwEll(g, m, 0.2, 0.62, 0.18, 0, 0.62, 0, 10);
phwEll(g, m, 0.17, 0.22, 0.15, 0, 1.32, 0, 10);
phwEll(g, m, 0.11, 0.13, 0.11, 0, 1.68, 0, 10);
if (o.robe !== false) {
var r = new THREE.Mesh(phwGeo("gfRobe", function () { return new THREE.CylinderGeometry(0.16, 0.34, 1.0, 10); }), m);
r.position.y = 0.5;
g.add(r);
}
[-1, 1].forEach(function (k) {
var a = new THREE.Mesh(phwGeo("gfArm", function () { var c = new THREE.CylinderGeometry(0.045, 0.04, 0.62, 6); c.translate(0, 0.31, 0); return c; }), m);
a.position.set(k * 0.2, 1.42, 0);
a.rotation.z = o.up ? -k * 0.45 : Math.PI - k * 0.2;
g.add(a);
});
if (o.wings) {
[-1, 1].forEach(function (k) { var w = new THREE.Mesh(phwGeo("gfWing", function () { var sh = new THREE.Shape(); sh.moveTo(0, 0); sh.quadraticCurveTo(0.5, 0.6, 0.3, 1.4); sh.quadraticCurveTo(0.15, 0.8, 0, 0.2); return new THREE.ShapeGeometry(sh); }), phwM("giltds", function () { var mm = phwMat("gilt").clone(); mm.side = THREE.DoubleSide; return mm; })); w.position.set(k * 0.08, 1.2, -0.14); w.rotation.y = k * 0.6; w.scale.x = k; g.add(w); });
}
if (o.lyre) {
var ly = new THREE.Mesh(phwGeo("gfLyre", function () { return new THREE.TorusGeometry(0.22, 0.035, 6, 14, Math.PI * 1.4); }), m);
ly.position.set(0, 2.35, 0.05);
ly.rotation.z = Math.PI * 0.8;
g.add(ly);
phwBox(g, 0.36, 0.04, 0.04, m, 0, 2.08, 0.05);
}
if (o.torch) {
phwCyl(g, 0.03, 0.03, 0.5, m, 0.3, 1.8, 0.1, 6);
var gl = wGlow(0xFFD890, 0.8, 1.4);
gl.position.set(0.3, 2.4, 0.1);
g.add(gl);
var bl = new THREE.Mesh(phwGeo("gfBulb", function () { return new THREE.SphereGeometry(0.1, 10, 8); }), phwGlowM(0xFFE8B0, 0.95));
bl.position.set(0.3, 2.36, 0.1);
g.add(bl);
}
return g;
},
function (P, x, z, w, o) {
o = o || {};
var d = o.d || 14, fl = o.fl || 6, fh = 3.3, h = fl * fh + 1.2, g = new THREE.Group(), y = o.y != null ? o.y : phwLand(x, z), lite = phwLite();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var st = phwMat("ashlar"), cream = phwS("b:ashlar", 0xEDE4CE, 2.4), iron = phwLam(0x1A1C1E), pane = phwMat("pane"), zinc = phwMat("zinc");
phwBox(g, w, h, d, st, 0, 0, 0);
var mh = 4.2;
var mr = new THREE.Mesh(phwGeo("mans" + w.toFixed(1) + "|" + d, function () { var s = new THREE.Shape(); s.moveTo(-d / 2 - 0.2, 0); s.lineTo(-d / 2 + 1.3, mh); s.lineTo(d / 2 - 1.3, mh); s.lineTo(d / 2 + 0.2, 0); s.lineTo(-d / 2 - 0.2, 0); var e = new THREE.ExtrudeGeometry(s, { depth: w, bevelEnabled: false }); e.translate(0, 0, -w / 2); e.rotateY(Math.PI / 2); return e; }), zinc);
mr.position.y = h;
g.add(mr);
var bays = Math.max(2, Math.round(w / 3.2)), bw = w / bays;
for (var i = 0; i < bays; i++) {
var bx = -w / 2 + (i + 0.5) * bw;
if (o.door && i === Math.floor(bays / 2)) {
phwBox(g, 2.4, 4.2, 0.12, phwMat("darkoak"), bx, 0, d / 2 + 0.04);
phwBox(g, 2.8, 0.4, 0.2, cream, bx, 4.2, d / 2 + 0.08);
}
else {
phwBox(g, bw - 0.5, 3.4, 0.08, o.cafe ? phwShine(0x2A1E14, 0.4, 0.2) : pane, bx, 0.2, d / 2 + 0.05);
phwBox(g, bw - 0.3, 0.18, 0.14, cream, bx, 3.6, d / 2 + 0.08);
if (!lite && (o.names || o.cafe) && i % 2 === 0) {
var aw = phwBox(g, bw - 0.2, 0.05, 1.8, phwLam(o.cafe ? 0xA8281E : [0x2A4A3A, 0x6A2A2A, 0x2A3A5A][i % 3], { ds: 1 }), bx, 3.5, d / 2 + 0.9);
aw.rotation.x = 0.28;
}
}
for (var f = 1; f < fl; f++) {
var wy = f * fh + 0.9 + 0.6;
phwBox(g, 1.3, 2.3, 0.06, pane, bx, wy, d / 2 + 0.04);
phwBox(g, 1.5, 0.14, 0.12, cream, bx, wy + 2.35, d / 2 + 0.08);
if (f === 2 && !lite) {
var pd = new THREE.Mesh(phwGeo("ped", function () { return new THREE.ConeGeometry(0.95, 0.5, 3, 1); }), cream);
pd.rotation.set(Math.PI / 2, 0, 0);
pd.scale.set(1, 1, 0.25);
pd.position.set(bx, wy + 2.7, d / 2 + 0.12);
pd.rotation.z = 0;
g.add(pd);
}
}
}
[2, 5].forEach(function (f) { if (f >= fl)
return; var by = f * fh + 1.45; phwBox(g, w - 0.4, 0.16, 1.0, cream, 0, by - 0.16, d / 2 + 0.5); if (!lite) {
phwBox(g, w - 0.4, 0.08, 0.06, iron, 0, by + 1.0, d / 2 + 0.98);
for (var k = -w / 2 + 0.5; k < w / 2 - 0.3; k += 0.5)
phwBox(g, 0.04, 1.0, 0.04, iron, k, by, d / 2 + 0.98);
}
else
phwBox(g, w - 0.4, 1.0, 0.04, iron, 0, by, d / 2 + 0.98); });
phwBox(g, w + 0.2, 0.5, d + 0.2, cream, 0, h - 0.5, 0);
phwBox(g, w + 0.1, 0.3, d + 0.1, cream, 0, fh * 1 + 0.6, 0);
if (!lite)
for (i = 0; i < bays; i += 2) {
var dg = new THREE.Group();
dg.position.set(-w / 2 + (i + 0.5) * bw, h + 0.6, d / 2 - 0.7);
g.add(dg);
phwBox(dg, 1.2, 1.8, 0.9, zinc, 0, 0, 0);
phwBox(dg, 0.8, 1.2, 0.04, pane, 0, 0.2, 0.46);
phwBox(dg, 1.4, 0.2, 1.0, cream, 0, 1.8, 0);
}
for (i = 0; i < Math.max(1, Math.floor(w / 9)); i++)
phwBox(g, 0.8, 2.4, 2.6, phwS("brick", 0xB0806A, 1.4), -w / 2 + 4 + i * 9, h + mh - 0.6, 0);
if (o.names)
o.names.forEach(function (n, k) { var bx = -w / 2 + (k * 2 + 0.5) * bw; if (bx > w / 2)
return; phwSign(g, n, Math.min(bw * 1.8, 6), 0.6, bx + bw / 2, 4.15, d / 2 + 0.16, 0, { bg: "#1E2A22", ink: "#E8D090" }); });
if (o.sign)
phwSign(g, o.sign, Math.min(w - 2, 12), 0.9, 0, 4.3, d / 2 + 0.18, 0, { bg: o.signBg || "#2A1E14", ink: "#F0D890" });
phwSolid(x, z, w, d, y - 1, y + h + mh, o.ry || 0);
return g;
},
function (P, x, z, hfn) {
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var gr = phwLam(0x2A4A3A);
phwCyl(g, 0.75, 0.8, 0.4, gr, 0, 0, 0, 16);
var t = phwCanvas("affiche", 256, 256, function (c, W, H) { var R = wRand(9); for (var i = 0; i < 14; i++) {
c.fillStyle = ["#E8D8A8", "#C84A30", "#F0E8D0", "#2A4A8A", "#E8B040", "#3A6A3A"][i % 6];
var x = R() * W, y = R() * H, w = 40 + R() * 70, h = 50 + R() * 80;
c.fillRect(x, y, w, h);
c.fillStyle = "#1A1410";
c.font = "bold 13px Georgia";
c.fillText(["OPERA", "FAUST", "BAL", "THEATRE", "CONCERT", "CIRQUE"][i % 6], x + 4, y + 18);
} });
var m = new THREE.Mesh(phwGeo("colP", function () { return new THREE.CylinderGeometry(0.7, 0.7, 2.6, 18, 1, true); }), phwLam(0xFFFFFF, { map: t, mapk: "affiche" }));
m.position.y = 1.7;
g.add(m);
var cap = new THREE.Mesh(phwGeo("colC", function () { var p = []; for (var k = 0; k <= 8; k++) {
var a = k / 8;
p.push(new THREE.Vector2(0.86 * (1 - a * a) + 0.05, a * 0.9));
} return new THREE.LatheGeometry(p, 16); }), gr);
cap.position.y = 3.0;
g.add(cap);
phwRound(x, z, 0.8);
return g;
},
function (r) {
return phwGeo("phwheel" + r, function () {
var l = [];
phwPartG(l, new THREE.TorusGeometry(r, 0.035, 6, 28), 0, 0, 0, 0, Math.PI / 2, 0);
phwPartG(l, new THREE.TorusGeometry(r - 0.06, 0.03, 5, 24), 0, 0, 0, 0, Math.PI / 2, 0);
for (var k = 0; k < 12; k++) {
var a = k / 12 * Math.PI * 2;
phwPartG(l, new THREE.CylinderGeometry(0.014, 0.02, r - 0.08, 5), 0, Math.cos(a) * (r - 0.08) / 2, Math.sin(a) * (r - 0.08) / 2, a, 0, 0);
}
phwPartG(l, new THREE.CylinderGeometry(0.07, 0.08, 0.22, 10), 0, 0, 0, 0, 0, Math.PI / 2);
return gwMerge(l);
});
},
function (P, x, z, ry, hfn, o) {
o = o || {};
var g = new THREE.Group(), y = hfn(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
var CABS = [[0x3A1820, 0x8A6A2A], [0x1C3326, 0x6A1A1A], [0x1E2A48, 0x9A7A30], [0x2A2A30, 0x3A2418], [0x401E14, 0x2A2A2A]], ck = Math.abs(Math.round(x * 7 + z * 3)) % CABS.length, bk = phwShine(o.col && o.col > 0x202020 ? o.col : CABS[ck][0], 0.22, 0.55), blk = phwShine(0x101012, 0.3, 0.4), wd = phwShine(o.wheel || CABS[ck][1], 0.4, 0.2), trim = phwShine(0xC8A050, 0.3, 0.8), pane = phwMat("pane"), brass = phwShine(0xC8A050, 0.3, 0.9), lite = phwLite();
var body = new THREE.Mesh(phwGeo("cabBody", function () {
var l = [];
phwPartG(l, new THREE.BoxGeometry(1.44, 1.0, 1.5), 0, 1.45, 0.45, 0, 0, 0);
phwPartG(l, new THREE.CylinderGeometry(0.62, 0.62, 1.44, 16, 1, false, 0, Math.PI / 2), 0, 1.33, -0.3, 0, 0, Math.PI / 2);
phwPartG(l, new THREE.BoxGeometry(1.44, 0.3, 0.6), 0, 1.08, -0.6, 0, 0, 0);
phwPartG(l, new THREE.BoxGeometry(1.56, 0.08, 1.86), 0, 2.0, 0.32, 0, 0, 0);
phwPartG(l, new THREE.BoxGeometry(1.5, 0.06, 1.8), 0, 2.07, 0.32, 0, 0, 0);
phwPartG(l, new THREE.BoxGeometry(1.2, 0.16, 0.62), 0, 1.45, -1.28, 0, 0, 0);
phwPartG(l, new THREE.BoxGeometry(1.0, 0.5, 0.08), 0, 1.6, -0.98, 0, 0, 0);
return gwMerge(l);
}), bk);
body.castShadow = !lite;
g.add(body);
[-1, 1].forEach(function (sd) { phwBox(g, 0.02, 0.03, 1.5, trim, sd * 0.725, 1.92, 0.45); phwBox(g, 0.02, 0.03, 1.5, trim, sd * 0.725, 0.97, 0.45); phwBox(g, 0.02, 0.9, 0.03, trim, sd * 0.725, 0.97, 1.19); phwBox(g, 0.02, 0.9, 0.03, trim, sd * 0.725, 0.97, 0.15); });
phwBox(g, 1.2, 0.03, 0.03, trim, 0, 1.92, 1.21);
phwBox(g, 0.5, 0.4, 0.04, phwMat("pane"), 0, 1.5, 1.22);
phwBox(g, 1.2, 0.5, 0.03, pane, 0, 1.42, -0.3).rotation.x = -0.5;
[-1, 1].forEach(function (s) {
phwBox(g, 0.03, 0.5, 0.62, pane, s * 0.73, 1.5, 0.55);
phwBox(g, 0.03, 0.66, 0.8, blk, s * 0.731, 1.0, 0.55).position.y = 1.0;
phwBox(g, 0.05, 0.04, 0.12, brass, s * 0.76, 1.32, 0.88);
phwBox(g, 0.32, 0.03, 0.22, blk, s * 0.86, 0.62, 0.6);
phwBox(g, 0.04, 0.3, 0.04, blk, s * 0.78, 1.6, -0.98);
phwBox(g, 0.14, 0.22, 0.14, blk, s * 0.82, 1.86, -0.98);
phwBox(g, 0.11, 0.16, 0.11, phwGlowM(0xFFE0A0, 0.9), s * 0.82, 1.89, -0.98);
phwEll(g, blk, 0.05, 0.07, 0.36, s * 0.5, 0.86, 0.75, 8);
phwEll(g, blk, 0.05, 0.06, 0.3, s * 0.5, 0.68, -0.95, 8);
});
phwBox(g, 1.1, 0.12, 0.5, phwLam(0x2A1E18), 0, 1.62, -1.3);
phwBox(g, 1.1, 0.06, 0.4, blk, 0, 1.1, -1.68).rotation.x = 0.4;
phwCyl(g, 0.012, 0.008, 1.6, blk, 0.56, 1.62, -1.5, 4).rotation.z = -0.2;
if (o.driver !== false && !lite) {
var cm = new THREE.Group();
cm.position.set(0, 1.74, -1.32);
g.add(cm);
var coat = phwLam(0x1E1E26), skin = phwLam(0xC89A7A);
phwBox(cm, 0.46, 0.6, 0.32, coat, 0, 0, 0);
phwBox(cm, 0.42, 0.16, 0.5, coat, 0, -0.05, -0.2);
[-1, 1].forEach(function (s) { phwBox(cm, 0.15, 0.48, 0.15, coat, s * 0.13, -0.5, -0.38); phwBox(cm, 0.12, 0.42, 0.12, coat, s * 0.27, 0.15, -0.12).rotation.x = -0.8; });
phwEll(cm, skin, 0.11, 0.13, 0.11, 0, 0.78, 0, 10);
phwCyl(cm, 0.17, 0.17, 0.02, blk, 0, 0.88, 0, 12);
phwCyl(cm, 0.11, 0.12, 0.26, blk, 0, 0.89, 0, 12);
phwBox(cm, 0.3, 0.2, 0.1, phwLam(0x8A7A6A), 0, 0.56, -0.08);
}
[[-0.82, 0.75, 0.68], [0.82, 0.75, 0.68], [-0.78, -0.95, 0.5], [0.78, -0.95, 0.5]].forEach(function (q) { var wh = new THREE.Mesh(phwWheelGeo(q[2]), wd); wh.position.set(q[0], q[2], q[1]); g.add(wh); });
phwCyl(g, 0.03, 0.03, 1.66, blk, 0, 0.68, 0.75, 6).rotation.z = Math.PI / 2;
phwCyl(g, 0.03, 0.03, 1.58, blk, 0, 0.5, -0.95, 6).rotation.z = Math.PI / 2;
[-1, 1].forEach(function (s) { var sh = phwCyl(g, 0.03, 0.04, 2.3, wd, s * 0.44, 1.0, -2.3, 6); sh.rotation.x = Math.PI / 2 - 0.1; sh.position.set(s * 0.44, 1.12, -2.3); });
phwBox(g, 0.8, 0.06, 0.06, wd, 0, 0.98, -1.32);
if (o.horse !== false)
phwHorse(g, 0, 0, -2.95, 0, { col: o.hcol || 0x3A2418, kind: o.kind || "phdark", plain: o.plain, inShafts: true });
if (!o.nosolid)
phwSolid(x, z, 1.9, 5.6, y - 1, y + 2.3, ry || 0);
return g;
},
function (P, x, z, ry, hfn) {
var g = new THREE.Group(), y = hfn(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
var c = phwLam(0xC8B070), dk = phwLam(0x2A1E14);
phwBox(g, 2.1, 1.9, 5.2, c, 0, 0.9, 0);
phwBox(g, 2.0, 0.6, 5.0, phwMat("pane"), 0, 1.9, 0);
phwBox(g, 2.2, 0.1, 5.4, dk, 0, 2.8, 0);
for (var i = 0; i < 6; i++)
phwBox(g, 0.36, 0.5, 0.36, dk, i % 2 ? 0.6 : -0.6, 2.9, -2 + Math.floor(i / 2) * 1.4);
phwSign(g, "MADELEINE · BASTILLE", 1.9, 0.3, 1.07, 2.4, 0, Math.PI / 2, { bg: "#2A3A5A", ink: "#F4E8C0" });
[[-1.1, 1.8, 0.8], [1.1, 1.8, 0.8], [-1.1, -1.6, 0.6], [1.1, -1.6, 0.6]].forEach(function (q) { var wh = new THREE.Mesh(phwWheelGeo(q[2]), dk); wh.position.set(q[0], q[2], q[1]); g.add(wh); });
phwHorse(g, -0.5, 0, -4.4, 0, { col: 0xE0DCD4, kind: "phwhite", plain: 1, inShafts: true });
phwHorse(g, 0.5, 0, -4.4, 0, { col: 0x8A8A88, plain: 1, inShafts: true });
phwHorse(g, 0, 0, -6.6, 0, { col: 0xD8D4CC, plain: 1, inShafts: true });
phwSolid(x, z, 2.4, 10, y - 1, y + 3, ry || 0);
return g;
},
function (P, x, z, hfn) {
var y = hfn(x, z) + 0.2, g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var lite = phwLite(), F = PHW_GN.front;
var st = phwS("b:ashlar", 0xE4D8BC, 3), cream = phwS("b:ashlar", 0xF0E6CC, 2), gm = phwMat("greenmarble"), rm = phwMat("redmarble"), gilt = phwMat("gilt"), pat = phwMat("patina"), dark = phwLam(0x1A140E);
for (var s = 0; s < 8; s++)
phwBox(g, 74 - s * 0.6, 0.3, 1.0, cream, 0, s * 0.3, F + 9 - s * 1.0);
phwFloor(x, z + F + 5.5, 72, 8, y + 2.4);
for (s = 0; s < 8; s++)
phwRamp(x, z + F + 9.5 - s * 1.0, 72 - s * 0.6, 1.0, y + 0.3 * (s + 1), y + 0.3 * s);
phwBox(g, 82, 30, 22, st, 0, 0, F - 11);
phwBox(g, 84, 1.2, 23, cream, 0, 11.2, F - 10.6);
phwBox(g, 84, 1.6, 23, cream, 0, 24.6, F - 10.6);
phwBox(g, 82, 4, 22, st, 0, 26, F - 11);
for (var i = 0; i < 7; i++) {
var ax = -27 + i * 9;
var ar = new THREE.Mesh(phwGeo("garch", function () { var sh = new THREE.Shape(); sh.moveTo(-3, 0); sh.lineTo(-3, 6.5); sh.absarc(0, 6.5, 3, Math.PI, 0, true); sh.lineTo(3, 0); sh.lineTo(-3, 0); return new THREE.ExtrudeGeometry(sh, { depth: 0.4, bevelEnabled: false }); }), dark);
ar.position.set(ax, 2.4, F + 0.02);
g.add(ar);
phwBox(g, 1.2, 9.5, 1.0, cream, ax - 4.5, 2.4, F + 0.4);
}
phwBox(g, 1.2, 9.5, 1.0, cream, 27 + 4.5, 2.4, F + 0.4);
for (i = 0; i < 8; i++) {
var cx = -28 + i * 8;
[-0.9, 0.9].forEach(function (o) { phwCyl(g, 0.62, 0.7, 11.6, cream, cx + o, 12.4, F + 2.0, 14); phwBox(g, 1.6, 0.6, 1.6, cream, cx + o, 24.0, F + 2.0); });
if (i < 7) {
phwCyl(g, 0.26, 0.28, 5.8, i % 2 ? rm : gm, cx + 4, 12.6, F + 0.8, 10);
var ow = new THREE.Mesh(phwGeo("oeil", function () { return new THREE.TorusGeometry(1.0, 0.22, 8, 18); }), gilt);
ow.position.set(cx + 4, 21.2, F + 0.7);
g.add(ow);
var bu = phwEll(g, phwMat("gilt"), 0.36, 0.44, 0.3, cx + 4, 21.0, F + 0.75, 10);
}
}
phwBox(g, 74, 11, 0.4, phwS("b:ashlar", 0xD8CCAE, 2), 0, 12.4, F - 1.2);
phwBox(g, 74, 0.6, 4.2, cream, 0, 24.6, F + 1.0);
phwSign(g, "ACADÉMIE NATIONALE DE MUSIQUE", 36, 1.4, 0, 27.4, F + 0.08, 0, { bg: "#E8DCC0", ink: "#6A5420" });
[-1, 1].forEach(function (k) {
phwBox(g, 12, 32, 24, st, k * 41, 0, F - 11);
var pd = new THREE.Mesh(phwGeo("gped", function () { var sh = new THREE.Shape(); sh.moveTo(-6.5, 0); sh.lineTo(0, 4.0); sh.lineTo(6.5, 0); sh.lineTo(-6.5, 0); return new THREE.ExtrudeGeometry(sh, { depth: 1.0, bevelEnabled: false }); }), cream);
pd.position.set(k * 41, 32, F + 0.6);
g.add(pd);
var arb = new THREE.Mesh(phwGeo("garchB", function () { var sh = new THREE.Shape(); sh.moveTo(-3.6, 0); sh.lineTo(-3.6, 12); sh.absarc(0, 12, 3.6, Math.PI, 0, true); sh.lineTo(3.6, 0); sh.lineTo(-3.6, 0); return new THREE.ExtrudeGeometry(sh, { depth: 0.4, bevelEnabled: false }); }), dark);
arb.position.set(k * 41, 2.4, F + 1.02);
g.add(arb);
var gr = phwGiltFigure(g, k * 41, 36.2, F - 0.8, 3.2, { up: true, wings: true });
phwGiltFigure(g, k * 41 - 2.4, 35.2, F - 1.6, 2.4, { wings: false });
phwGiltFigure(g, k * 41 + 2.4, 35.2, F - 1.6, 2.4, { torch: false });
phwBox(g, 5, 5, 3, cream, k * 30, 2.4, F + 2.6);
phwGiltFigure(g, k * 30, 7.4, F + 2.6, 1.6, { mat: cream, up: k > 0 });
phwGiltFigure(g, k * 34.5, 7.4, F + 2.6, 1.6, { mat: cream });
});
phwCyl(g, 30, 30, 34, st, 0, 0, PHW_GN.dome, 32);
phwCyl(g, 30.6, 30.6, 1.2, cream, 0, 30, PHW_GN.dome, 32);
var dm = new THREE.Mesh(phwGeo("gdome", function () { return new THREE.SphereGeometry(30, 32, 12, 0, Math.PI * 2, 0, Math.PI * 0.32); }), pat);
dm.scale.y = 0.55;
dm.position.set(0, 34, PHW_GN.dome);
g.add(dm);
for (i = 0; i < 16; i++) {
var a = i / 16 * Math.PI * 2;
var rib = phwBox(g, 0.5, 0.6, 0.5, gilt, Math.cos(a) * 27, 37.4, PHW_GN.dome + Math.sin(a) * 27);
}
var crown = new THREE.Mesh(phwGeo("gcrown", function () { return new THREE.CylinderGeometry(3.2, 3.6, 2.6, 16); }), gilt);
crown.position.set(0, 44.4, PHW_GN.dome);
g.add(crown);
phwEll(g, gilt, 1.4, 1.0, 1.4, 0, 46.4, PHW_GN.dome, 12);
phwBox(g, 60, PHW_GN.roofY, 46, st, 0, 0, PHW_GN.stage - 23);
phwBox(g, 62, 1.2, 48, cream, 0, PHW_GN.roofY - 1.2, PHW_GN.stage - 23);
var gab = new THREE.Mesh(phwGeo("ggab", function () { var sh = new THREE.Shape(); sh.moveTo(-30, 0); sh.lineTo(0, 14); sh.lineTo(30, 0); sh.lineTo(-30, 0); return new THREE.ExtrudeGeometry(sh, { depth: 46, bevelEnabled: false }); }), phwMat("zinc"));
gab.position.set(0, PHW_GN.roofY, PHW_GN.stage - 46);
g.add(gab);
var tri = new THREE.Mesh(phwGeo("gtri", function () { var sh = new THREE.Shape(); sh.moveTo(-30, 0); sh.lineTo(0, 14); sh.lineTo(30, 0); sh.lineTo(-30, 0); return new THREE.ShapeGeometry(sh); }), cream);
tri.position.set(0, PHW_GN.roofY, PHW_GN.stage + 0.05);
g.add(tri);
phwBox(g, 3.2, 1.4, 3.2, cream, 0, PHW_GN.roofY + 13.4, PHW_GN.stage + 0.4);
phwGiltFigure(g, 0, PHW_GN.roofY + 14.8, PHW_GN.stage + 0.4, 3.6, { up: true, lyre: true, robe: true });
[-1, 1].forEach(function (k) { phwGiltFigure(g, k * 29, PHW_GN.roofY + 0.6, PHW_GN.stage - 45, 2.2, { mat: phwMat("patina"), wings: true }); });
phwFloor(x, z + PHW_GN.stage + 5, 30, 10, y + PHW_GN.roofY);
phwBox(g, 30, 0.6, 10, phwMat("zinc"), 0, PHW_GN.roofY - 0.6, PHW_GN.stage + 5);
[[0, PHW_GN.stage + 10, 30, 0.3], [-15, PHW_GN.stage + 5, 0.3, 10], [15, PHW_GN.stage + 5, 0.3, 10]].forEach(function (q) { phwBox(g, q[2], 1.0, q[3], cream, q[0], PHW_GN.roofY, q[1]); phwSolid(x + q[0], z + q[1], q[2] + 0.2, q[3] + 0.2, y + PHW_GN.roofY - 1, y + PHW_GN.roofY + 1.2); });
phwSolid(x, z + PHW_GN.stage - 0.4, 30, 0.8, y + PHW_GN.roofY - 1, y + PHW_GN.roofY + 20);
[-1, 1].forEach(function (k) { phwBox(g, 4, 0.7, 2.6, phwMat("zinc"), k * 11, PHW_GN.roofY, PHW_GN.stage + 2.4); phwBox(g, 3.6, 0.04, 2.2, phwShine(0x1A2A30, 0.12, 0.3), k * 11, PHW_GN.roofY + 0.62, PHW_GN.stage + 2.4); phwSolid(x + k * 11, z + PHW_GN.stage + 2.4, 4.2, 2.8, y + PHW_GN.roofY - 1, y + PHW_GN.roofY + 0.75); });
[-1, 1].forEach(function (k) {
phwBox(g, 22, 26, 110, st, k * 41, 0, -14);
phwBox(g, 23, 1.2, 111, cream, k * 41, 25, -14);
for (var w = 0; w < 10; w++) {
phwBox(g, 0.1, 5, 2.4, phwMat("pane"), k * 52.05, 10, -60 + w * 10);
phwBox(g, 0.1, 4, 2.0, phwMat("pane"), k * 52.05, 17, -60 + w * 10);
}
phwCyl(g, 13, 13, 20, st, k * 58, 0, 10, 24);
var pd = new THREE.Mesh(phwGeo("pdome", function () { return new THREE.SphereGeometry(13.2, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2); }), pat);
pd.scale.y = 0.45;
pd.position.set(k * 58, 20, 10);
g.add(pd);
phwGiltFigure(g, k * 58, 25.6, 10, 1.4, {});
if (k > 0) {
phwBox(g, 8, 4, 40, cream, k * 68, 0, -20);
}
});
phwBox(g, 90, 24, 30, st, 0, 0, PHW_GN.back + 15);
phwBox(g, 92, 1.2, 31, cream, 0, 23.2, PHW_GN.back + 15);
phwBox(g, 3.4, 4.2, 0.2, phwMat("darkoak"), 0, 0, PHW_GN.back - 0.05);
phwSign(g, "ENTRÉE DES ARTISTES", 6, 0.6, 0, 4.8, PHW_GN.back - 0.15, Math.PI, { bg: "#1E2A22", ink: "#F0D890" });
for (i = -3; i <= 3; i++)
if (i) {
var cg = new THREE.Group();
cg.position.set(i * 10, 2.4, F + 11);
g.add(cg);
phwCyl(cg, 0.25, 0.4, 4.2, phwLam(0x2A2A22), 0, 0, 0, 10);
for (var b = 0; b < 5; b++) {
var bl = new THREE.Mesh(phwGeo("cdlb", function () { return new THREE.SphereGeometry(0.22, 10, 8); }), phwGlowM(0xFFE8B8, 0.95));
bl.position.set(b ? Math.cos(b * 1.57) * 0.7 : 0, 4.6 + (b ? 0 : 0.5), b ? Math.sin(b * 1.57) * 0.7 : 0);
cg.add(bl);
}
if (!lite) {
var gl = wGlow(0xFFD898, 0.6, 4);
gl.position.y = 4.8;
cg.add(gl);
}
}
phwSolid(x, z + F - 11, 108, 22, y - 1, y + 60);
phwSolid(x, z + PHW_GN.dome, 62, 58, y - 1, y + PHW_GN.roofY - 1);
phwSolid(x, z + PHW_GN.stage - 23, 62, 46, y - 1, y + PHW_GN.roofY - 0.3);
phwSolid(x, z - 14, 106, 110, y - 1, y + 26);
phwSolid(x, z + PHW_GN.back + 15, 92, 30, y - 1, y + 24);
phwRound(x - 58, z + 10, 13.4, y - 1, y + 26);
phwRound(x + 58, z + 10, 13.4, y - 1, y + 26);
return g;
},
function (P, x, y, z, s, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.scale.setScalar(s || 1);
P.add(g);
var gilt = phwMat("gilt"), lite = phwLite();
var body = new THREE.Mesh(phwGeo("chB", function () { var p = []; for (var k = 0; k <= 14; k++) {
var t = k / 14;
p.push(new THREE.Vector2(0.15 + Math.sin(t * Math.PI) * 1.6 * (1 - t * 0.4), -t * 3.2));
} return new THREE.LatheGeometry(p, 20); }), gilt);
g.add(body);
var crys = phwM("crys", function () { var m = new THREE.MeshPhongMaterial({ color: 0xF8F4E8, emissive: 0x8A7A50, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.85 }); m.userData.noPhoto = 1; return m; });
var list = [], lights = [];
[[1.9, -0.6, 18], [2.5, -1.4, 24], [2.9, -2.2, 30], [2.2, -2.9, 22]].forEach(function (r) {
var ring = new THREE.Mesh(phwGeo("chR" + r[0], function () { return new THREE.TorusGeometry(r[0], 0.06, 6, 32); }), gilt);
ring.rotation.x = Math.PI / 2;
ring.position.y = r[1];
g.add(ring);
for (var i = 0; i < r[2]; i++) {
var a = i / r[2] * Math.PI * 2;
lights.push({ x: Math.cos(a) * r[0], y: r[1] + 0.18, z: Math.sin(a) * r[0], s: 1 });
for (var k = 0; k < (lite ? 1 : 3); k++)
list.push({ x: Math.cos(a) * r[0], y: r[1] - 0.25 - k * 0.22, z: Math.sin(a) * r[0], s: 1 - k * 0.2 });
}
});
phwInst(g, phwGeo("chDrop", function () { return new THREE.OctahedronGeometry(0.07, 0); }), crys, list);
phwInst(g, phwGeo("chBulb", function () { return new THREE.SphereGeometry(0.1, 8, 6); }), phwGlowM(o.dark ? 0x3A3020 : 0xFFF0C8, o.dark ? 0.6 : 0.95), lights);
if (!lite && !o.dark) {
var gl = wGlow(0xFFE0A0, 1.0, 9);
gl.position.y = -1.6;
g.add(gl);
}
phwCyl(g, 0.05, 0.05, 6, phwLam(0x2A2418), 0, 0, 0, 6).position.y = 3;
if (o.fallen) {
g.rotation.set(0.5, 0.3, 0.9);
}
return g;
},
function (P, x, y, z, len, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var n = o.n || 8, bw = len / n, gilt = phwMat("gilt"), rv = phwMat("redvelvet"), cream = phwS("b:ashlar", 0xF2E8D0, 1.6);
phwBox(g, len, 0.3, 2.0, cream, 0, -0.3, 1.0);
phwBox(g, len, 2.6, 0.2, rv, 0, 0, -0.1);
phwBox(g, len, 0.3, 2.0, cream, 0, 2.6, 1.0);
for (var i = 0; i <= n; i++) {
var bx = -len / 2 + i * bw;
phwBox(g, 0.14, 2.6, 2.0, cream, bx, 0, 1.0);
}
for (i = 0; i < n; i++) {
var bx2 = -len / 2 + (i + 0.5) * bw;
phwBox(g, bw - 0.2, 0.85, 0.14, o.fronts || gilt, bx2, 0, 2.0);
phwBox(g, bw - 0.2, 0.08, 0.4, rv, bx2, 0.85, 1.95);
var lb = new THREE.Mesh(phwGeo("bxl", function () { return new THREE.SphereGeometry(0.08, 8, 6); }), phwGlowM(0xFFE8B8, 0.9));
lb.position.set(bx2 + bw / 2 - 0.3, 1.9, 1.9);
g.add(lb);
if (o.num)
phwSign(g, String(o.num[i] || ""), 0.36, 0.24, bx2, 0.42, 2.08, 0, { bg: "#C8A040", ink: "#2A1A08" });
}
return g;
},
function (P, kind, w, h, x, y, z, ry) {
var t = phwCanvas("scen" + kind, 512, 256, function (c, W, H) {
var R = wRand(kind.length * 7);
if (kind === "garden") {
var gr = c.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, "#8AA8C8");
gr.addColorStop(0.6, "#C8D8B8");
gr.addColorStop(1, "#4A6A2A");
c.fillStyle = gr;
c.fillRect(0, 0, W, H);
for (var i = 0; i < 26; i++) {
c.fillStyle = ["#2A4A1E", "#3A5A2A", "#4A6A30"][i % 3];
c.beginPath();
c.arc(R() * W, H * 0.5 + R() * H * 0.2, 20 + R() * 30, 0, 7);
c.fill();
}
for (i = 0; i < 60; i++) {
c.fillStyle = ["#E86A8A", "#F0E8D0", "#E8C040"][i % 3];
c.beginPath();
c.arc(R() * W, H * 0.75 + R() * H * 0.25, 3 + R() * 3, 0, 7);
c.fill();
}
c.fillStyle = "#D8CCB0";
c.fillRect(W * 0.62, H * 0.42, W * 0.2, H * 0.4);
c.fillStyle = "#8A5A3A";
c.fillRect(W * 0.69, H * 0.62, W * 0.06, H * 0.2);
}
else if (kind === "church") {
c.fillStyle = "#3A3440";
c.fillRect(0, 0, W, H);
for (var a = 0; a < 5; a++) {
c.fillStyle = "#5A5060";
c.fillRect(30 + a * 100, 20, 60, H);
c.fillStyle = "#C8A060";
c.beginPath();
c.arc(60 + a * 100, 90, 22, Math.PI, 0);
c.fill();
c.fillRect(38 + a * 100, 90, 44, 60);
}
}
else if (kind === "farm") {
c.fillStyle = "#C8B890";
c.fillRect(0, 0, W, H);
c.fillStyle = "#8A6A40";
c.fillRect(0, H * 0.3, W, H * 0.7);
c.fillStyle = "#E8D8B0";
c.fillRect(W * 0.2, H * 0.35, W * 0.5, H * 0.5);
c.fillStyle = "#6A4A2A";
c.fillRect(W * 0.4, H * 0.55, W * 0.1, H * 0.3);
c.fillStyle = "#A85A3A";
c.beginPath();
c.moveTo(W * 0.15, H * 0.36);
c.lineTo(W * 0.45, H * 0.08);
c.lineTo(W * 0.75, H * 0.36);
c.fill();
}
else if (kind === "forest") {
c.fillStyle = "#2A3A2A";
c.fillRect(0, 0, W, H);
for (var t2 = 0; t2 < 30; t2++) {
c.fillStyle = ["#1A2A1A", "#3A4A2A", "#4A3A2A"][t2 % 3];
var x = R() * W;
c.fillRect(x, 0, 8 + R() * 14, H);
c.beginPath();
c.arc(x + 8, R() * H * 0.4, 30 + R() * 30, 0, 7);
c.fill();
}
}
else {
c.fillStyle = "#4A3A5A";
c.fillRect(0, 0, W, H);
c.fillStyle = "#E8D8A8";
for (var k = 0; k < 40; k++)
c.fillRect(R() * W, R() * H, 2, 2);
}
phwNoise(c, W, H, 900, 0.12, 3, "0,0,0");
});
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), phwLam(0xFFFFFF, { map: t, mapk: "scen" + kind, ds: 1 }));
m.position.set(x, y + h / 2, z);
m.rotation.y = ry || 0;
P.add(m);
return m;
},
function (P, x0, z0, cols, rows, gap, y, o) {
o = o || {};
var list = [], backs = [];
for (var r = 0; r < rows; r++)
for (var c = 0; c < cols; c++) {
var x = x0 + c * 0.62, z = z0 + r * (gap || 0.95);
if (o.aisle && Math.abs(x - o.aisle) < 0.7)
continue;
list.push({ x: x, y: y + 0.42, z: z });
backs.push({ x: x, y: y + 0.7, z: z + 0.26 });
}
phwInst(P, phwGeo("seatS", function () { return new THREE.BoxGeometry(0.5, 0.12, 0.48); }), phwMat("redvelvet"), list);
phwInst(P, phwGeo("seatB", function () { return new THREE.BoxGeometry(0.5, 0.62, 0.08); }), phwMat("redvelvet"), backs);
},
function (P, x, y, z, r) {
var t = phwCanvas("ceilP", 512, 512, function (c, W, H) {
var g = c.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, W / 2);
g.addColorStop(0, "#F4E8C0");
g.addColorStop(0.35, "#7AA0C8");
g.addColorStop(0.8, "#5A7AA8");
g.addColorStop(1, "#C8A040");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
var R = wRand(31);
for (var i = 0; i < 26; i++) {
var a = R() * 6.28, d = 90 + R() * 130;
c.fillStyle = ["#E8B898", "#F0D8B8", "#C84A3A", "#3A5A9A", "#E8D070"][i % 5];
c.beginPath();
c.ellipse(W / 2 + Math.cos(a) * d, H / 2 + Math.sin(a) * d, 10 + R() * 12, 18 + R() * 14, a, 0, 7);
c.fill();
}
c.strokeStyle = "#C8A040";
c.lineWidth = 14;
c.beginPath();
c.arc(W / 2, H / 2, W / 2 - 8, 0, 7);
c.stroke();
});
var m = new THREE.Mesh(new THREE.CircleGeometry(r, 40), phwLam(0xFFFFFF, { map: t, mapk: "ceilP" }));
m.rotation.x = Math.PI / 2;
m.position.set(x, y, z);
P.add(m);
return m;
},
function (P, x, y, z, col) { var g = new THREE.Group(); g.position.set(x, y, z); P.add(g); phwCyl(g, 0.09, 0.12, 0.3, phwMat("glass"), 0, 0, 0, 10); for (var i = 0; i < 9; i++) {
var a = i / 9 * 6.28;
var f = new THREE.Mesh(phwGeo("flw1", function () { return new THREE.SphereGeometry(0.05, 6, 5); }), phwLam(col || [0xE8505A, 0xF4F0E8, 0xE8C040][i % 3]));
f.position.set(Math.cos(a) * 0.1, 0.42 + (i % 3) * 0.05, Math.sin(a) * 0.1);
g.add(f);
} return g; },
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var w = phwMat("darkoak");
var d = new THREE.Mesh(phwGeo("drum", function () { var c = new THREE.CylinderGeometry(0.7, 0.7, 2.4, 14); c.rotateZ(Math.PI / 2); return c; }), w);
d.position.y = 1.0;
g.add(d);
[-1.3, 1.3].forEach(function (s) { phwBox(g, 0.16, 1.8, 0.16, w, s, 0, 0); });
for (var i = 0; i < 4; i++)
phwCyl(g, 0.02, 0.02, 5, phwMat("rope"), -0.9 + i * 0.6, 1.0, 0, 4);
return g;
},
function (P, x, y, z, o) {
o = o || {};
var b = new THREE.Mesh(phwGeo("barrel", function () { var p = []; for (var k = 0; k <= 8; k++) {
var t = k / 8;
p.push(new THREE.Vector2(0.36 + Math.sin(t * Math.PI) * 0.08, t * 1.0));
} return new THREE.LatheGeometry(p, 12); }), phwMat("oak"));
b.position.set(x, y, z);
if (o.lie) {
b.rotation.z = Math.PI / 2;
b.position.y = y + 0.42;
b.position.x = x + 0.5;
}
P.add(b);
if (!phwLite())
[0.15, 0.85].forEach(function (h) { var r = new THREE.Mesh(phwGeo("bhoop", function () { return new THREE.TorusGeometry(0.42, 0.02, 4, 14); }), phwMat("iron")); r.rotation.x = Math.PI / 2; r.position.y = h; b.add(r); });
return b;
},
function (P, x, y, z, n, o) {
o = o || {};
var list = [], bones = [], R = wRand(Math.round(x * 3 + z));
for (var i = 0; i < n; i++) {
var row = Math.floor(i / 8), col = i % 8;
list.push({ x: x - 1.4 + col * 0.4 + (R() - 0.5) * 0.05, y: y + 0.12 + row * 0.26, z: z + (R() - 0.5) * 0.06, ry: (R() - 0.5) * 0.6, s: 0.9 + R() * 0.2 });
if (i % 2)
bones.push({ x: x - 1.4 + col * 0.4, y: y + row * 0.26, z: z - 0.2, rz: Math.PI / 2, s: 1 });
}
phwInst(P, phwGeo("skull", function () { var s = new THREE.SphereGeometry(0.11, 10, 8); s.scale(1, 0.95, 1.15); return s; }), phwLam(0xE0D4B8), list);
phwInst(P, phwGeo("bone", function () { return new THREE.CylinderGeometry(0.025, 0.025, 0.42, 6); }), phwLam(0xD8CCB0), bones);
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var w = phwMat("darkoak"), gilt = phwMat("gilt");
phwBox(g, 3.2, 1.0, 0.9, w, 0, 0, 0);
phwBox(g, 2.4, 0.06, 0.3, phwLam(0xF4F0E4), 0, 1.0, 0.3);
phwBox(g, 2.4, 0.06, 0.3, phwLam(0x141414), 0, 1.12, 0.2);
phwBox(g, 3.4, 3.2, 0.4, w, 0, 1.0, -0.4);
for (var i = 0; i < 15; i++) {
var px = -1.5 + i * 0.21, ph = 1.6 + Math.sin(i / 14 * Math.PI) * 1.6;
phwCyl(g, 0.07, 0.07, ph, gilt, px, 1.8, -0.6, 8);
}
phwBox(g, 0.7, 0.5, 0.04, phwLam(0xF4F0E4), 0, 1.4, 0.42).rotation.x = -0.3;
[-1.4, 1.4].forEach(function (s) { phwCandle(g, s, 1.0, 0.3, { brass: 1 }); });
return g;
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var bl = phwLam(0x141012);
var sh = new THREE.Shape();
sh.moveTo(-0.28, -1.0);
sh.lineTo(0.28, -1.0);
sh.lineTo(0.38, 0.4);
sh.lineTo(0.22, 1.0);
sh.lineTo(-0.22, 1.0);
sh.lineTo(-0.38, 0.4);
sh.lineTo(-0.28, -1.0);
var c = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.5, bevelEnabled: false }), bl);
c.rotation.x = -Math.PI / 2;
c.position.y = 0.4;
g.add(c);
phwBox(g, 1.0, 0.4, 2.2, phwLam(0x2A1A1A), 0, 0, 0);
return g;
},
function (P, x, z, h) {
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
var ir = phwMat("iron");
phwCyl(g, 0.12, 0.2, h, ir, 0, 0, 0, 8);
for (var i = 0; i < 6; i++) {
var b = new THREE.Mesh(phwGeo("itb", function () { var c = new THREE.CylinderGeometry(0.04, 0.08, 1.4, 6); c.translate(0, 0.7, 0); return c; }), ir);
b.position.y = h * 0.55 + i * 0.3;
b.rotation.set(0.9, i * 1.1, 0);
g.add(b);
}
var lf = phwM("ironleaf", function () { var m = new THREE.MeshStandardMaterial({ color: 0x3A3A40, roughness: 0.5, metalness: 0.8, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; });
var leaves = [];
for (var k = 0; k < 40; k++) {
var a = k * 2.4, r = 0.5 + (k % 5) * 0.2;
leaves.push({ x: Math.cos(a) * r, y: h * 0.6 + (k % 7) * 0.24, z: Math.sin(a) * r, rx: k, ry: k * 0.7, s: 1 });
}
phwInst(g, phwGeo("ileaf", function () { return new THREE.PlaneGeometry(0.18, 0.1); }), lf, leaves);
return g;
},
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var eb = phwShine(0x141012, 0.3, 0.1), br = phwMat("brass");
[-0.35, 0.35].forEach(function (s, i) {
phwBox(g, 0.3, 0.18, 0.22, eb, s, 0, 0);
if (i === 0) {
phwEll(g, br, 0.06, 0.02, 0.08, s, 0.2, 0, 8);
var t = new THREE.Mesh(phwGeo("sctl", function () { return new THREE.TorusGeometry(0.05, 0.012, 4, 10, Math.PI * 1.3); }), br);
t.position.set(s, 0.26, 0.06);
t.rotation.y = Math.PI / 2;
g.add(t);
}
else {
phwEll(g, br, 0.03, 0.025, 0.1, s, 0.21, 0, 8);
[-1, 1].forEach(function (k) { var l = phwBox(g, 0.01, 0.01, 0.12, br, s + k * 0.03, 0.22, -0.03); l.rotation.x = 0.6; });
}
});
return g;
},
function () {
if (typeof CRX_PLANS === "undefined" || typeof crxQuad !== "function" || CRX_PLANS.phwhite)
return;
var tail = function (c) { return { l: 0.8, r: 0.07, up: -1.3, col: c }; };
CRX_PLANS.phdark = function () { return crxQuad({ L: 1.05, H: 1.0, G: 0.34, W: 0.78, legR: 0.05, head: "horse", hs: 1.2, col: 0x2A1C14, back: 0x1E140E, muzzle: 0x1A1210, mane: 0x0E0A08, foot: "hoof", tail: tail(0x0E0A08), neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0 }); };
CRX_PLANS.phbay = function () { return crxQuad({ L: 0.95, H: 0.92, G: 0.32, W: 0.74, legR: 0.045, head: "horse", hs: 1.25, col: 0x6A625A, back: 0x5A524A, muzzle: 0x3A3430, mane: 0x2A2622, foot: "hoof", tail: tail(0x2A2622), neck: { l: 0.5, up: 0.8 }, neckR0: 0.5, neckR1: 0.32, stride: 1.6, runAt: 3.0 }); };
CRX_PLANS.phwhite = function () { return crxQuad({ L: 1.1, H: 1.04, G: 0.35, W: 0.8, legR: 0.05, head: "horse", hs: 1.2, col: 0xF2EEE6, back: 0xE8E4DC, muzzle: 0xC8B8B0, mane: 0xF8F6F0, foot: "hoof", tail: tail(0xF8F6F0), neck: { l: 0.62, up: 0.98 }, neckR0: 0.56, neckR1: 0.36, stride: 2.0, runAt: 4.0 }); };
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = null, key = o.kind || "horse";
if (o.plain)
return phwPlainBeast(P, x, y, z, ry, o);
var crx = false;
try {
phwCrxKinds();
crx = typeof crxBuild === "function" && typeof crxHas === "function" && crxHas(key) && !phwLite() && typeof CRX !== "undefined";
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
var stand = phwHorse(hold, 0, 0, 0, 0, { col: o.col, plain: 1, kind: key });
PHW.ticks.push(function () { if (!hold.parent || hold.userData.done || !CRX.geo[key])
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
return phwPlainBeast(P, x, y, z, ry, o);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
},
function (cow) {
var key = "phBeast" + (cow ? "C" : "H");
if (PHW_GEO[key])
return PHW_GEO[key];
return (PHW_GEO[key] = (function () {
var coat = [], dark = [], hr = [], S = function (r) { return new THREE.SphereGeometry(r, 14, 10); }, Cy = function (a, b, h, n) { return new THREE.CylinderGeometry(a, b, h, n || 10); };
var Hb = cow ? 1.12 : 1.3, L = cow ? 0.72 : 0.8, W = cow ? 0.42 : 0.31;
phwPartG(coat, S(1), 0, Hb, 0, 0, 0, 0, W, cow ? 0.42 : 0.37, L);
phwPartG(coat, S(1), 0, Hb + 0.04, -L * 0.7, 0, 0, 0, W * 0.92, 0.38, 0.34);
phwPartG(coat, S(1), 0, Hb + 0.06, L * 0.66, 0, 0, 0, W * 0.98, 0.4, 0.36);
if (cow) {
phwPartG(coat, Cy(0.14, 0.24, 0.6, 10), 0, Hb + 0.12, -0.86, -1.25, 0, 0);
phwPartG(coat, Cy(0.1, 0.17, 0.48, 10), 0, Hb + 0.02, -1.22, -0.5 + Math.PI / 2, 0, 0);
phwPartG(dark, S(0.11), 0, Hb - 0.12, -1.42, 0, 0, 0, 1.1, 0.8, 0.8);
[-1, 1].forEach(function (s) { phwPartG(dark, new THREE.ConeGeometry(0.035, 0.24, 6), s * 0.16, Hb + 0.26, -1.08, 0, 0, -s * 1.1); phwPartG(coat, S(0.06), s * 0.14, Hb + 0.16, -1.05, 0, 0, 0, 1.4, 0.5, 0.6); });
}
else {
phwPartG(coat, Cy(0.12, 0.25, 0.86, 12), 0, 1.83, -0.76, -0.62, 0, 0);
phwPartG(coat, Cy(0.14, 0.085, 0.62, 10), 0, 1.96, -1.13, 0.72, 0, 0);
phwPartG(coat, S(0.13), 0, 2.12, -0.98, 0, 0, 0, 1, 1, 1.2);
phwPartG(dark, S(0.09), 0, 1.74, -1.31, 0, 0, 0, 1, 0.8, 1.1);
[-1, 1].forEach(function (s) { phwPartG(coat, new THREE.ConeGeometry(0.045, 0.16, 6), s * 0.07, 2.27, -0.94, -0.2, 0, -s * 0.15); phwPartG(dark, S(0.025), s * 0.11, 2.04, -1.1, 0, 0, 0); });
phwPartG(dark, new THREE.BoxGeometry(0.06, 0.86, 0.13), 0, 1.95, -0.68, -0.62, 0, 0);
phwPartG(dark, new THREE.BoxGeometry(0.05, 0.18, 0.12), 0, 2.24, -1.04, 0.4, 0, 0);
}
var lh = cow ? 0.78 : 0.92;
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) {
var x = q[0] * W * 0.5, z = q[1] * L * 0.68, hind = q[1] > 0;
var kn = lh * (hind ? 0.6 : 0.52), top = Hb - 0.08;
if (hind) {
phwPartG(coat, Cy(0.13, 0.08, top - kn + 0.1, 10), x, (top + kn) / 2, z + 0.07, -0.22, 0, 0);
}
else
phwPartG(coat, Cy(0.1, 0.06, top - kn + 0.08, 10), x, (top + kn) / 2, z, 0, 0, 0);
phwPartG(coat, S(hind ? 0.07 : 0.062), x, kn, z + (hind ? 0.14 : 0), 0, 0, 0, 1, 1.25, 1.1);
phwPartG(coat, Cy(0.045, 0.04, kn - 0.12, 8), x, (kn + 0.12) / 2, z + (hind ? 0.07 : 0), hind ? 0.2 : 0, 0, 0);
phwPartG(dark, S(0.052), x, 0.13, z, 0, 0, 0, 1, 1.1, 1.25);
phwPartG(dark, Cy(0.055, 0.075, 0.12, 10), x, 0.06, z - 0.02, 0, 0, 0);
});
phwPartG(dark, Cy(cow ? 0.03 : 0.075, cow ? 0.02 : 0.035, cow ? 0.8 : 0.85, 8), 0, Hb - 0.24, L * 0.98 + 0.12, 0.28, 0, 0);
if (cow)
phwPartG(dark, S(0.06), 0, Hb - 0.66, L * 0.98 + 0.24, 0, 0, 0, 1, 1.6, 1);
if (!cow) {
phwPartG(hr, new THREE.TorusGeometry(0.27, 0.06, 8, 16), 0, 1.6, -0.66, 0.95, 0, 0);
phwPartG(hr, new THREE.BoxGeometry(0.5, 0.07, 0.3), 0, 1.68, -0.12, 0, 0, 0);
phwPartG(hr, new THREE.BoxGeometry(0.72, 0.05, 0.08), 0, 1.3, -0.12, 0, 0, 0, 1, 1, 1);
phwPartG(hr, new THREE.TorusGeometry(0.36, 0.025, 6, 18, Math.PI), 0, 1.34, 0.62, 0, Math.PI / 2, Math.PI / 2);
[-1, 1].forEach(function (s) { phwPartG(hr, new THREE.BoxGeometry(0.02, 0.1, 0.1), s * 0.12, 2.04, -1.06, 0, 0, 0); phwPartG(hr, new THREE.BoxGeometry(0.02, 0.02, 0.9), s * 0.1, 1.85, -0.82, 0.55, 0, 0); });
}
var out = { coat: gwMerge(coat), dark: gwMerge(dark), harness: hr.length ? gwMerge(hr) : null };
[out.coat, out.dark, out.harness].forEach(function (gg) { if (gg)
gg.userData.shared = 1; });
return out;
})());
},
function (P, x, y, z, ry, o) {
var g = new THREE.Group(), cow = o.kind === "cow" || o.kind === "imcow", G = phwBeastGeo(cow), c = phwLam(o.col || (cow ? 0xD8CCB8 : 0x5A3A22)), dk = phwLam(cow ? 0x2A2420 : 0x1A120C);
var a = new THREE.Mesh(G.coat, c), b = new THREE.Mesh(G.dark, dk);
a.castShadow = !phwLite();
g.add(a);
g.add(b);
if (G.harness && o.harness !== false && o.inShafts)
g.add(new THREE.Mesh(G.harness, phwShine(0x141210, 0.3, 0.2)));
if (cow && !o.col) {
var pt = new THREE.Mesh(phwGeo("cowpatch", function () { var l = []; phwPartG(l, new THREE.SphereGeometry(1, 10, 8), 0.05, 1.18, -0.2, 0, 0, 0, 0.44, 0.3, 0.4); phwPartG(l, new THREE.SphereGeometry(1, 10, 8), -0.05, 1.2, 0.45, 0, 0, 0, 0.44, 0.32, 0.3); return gwMerge(l); }), phwLam(0x1E1A18));
g.add(pt);
}
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
},
function (P, x, y, z, ry) {
var g = new THREE.Group(), w = phwLam(0xE8E2D4), dk = phwLam(0x3A2E26);
var b = phwEll(g, w, 0.32, 0.3, 0.5, 0, 0.62, 0, 10);
var h = phwEll(g, dk, 0.1, 0.11, 0.16, 0, 0.62, -0.56, 8);
h.rotation.x = 0.5;
phwEll(g, w, 0.13, 0.1, 0.12, 0, 0.76, -0.44, 8);
[[-0.14, -0.28], [0.14, -0.28], [-0.14, 0.28], [0.14, 0.28]].forEach(function (q) { phwCyl(g, 0.035, 0.03, 0.42, dk, q[0], 0, q[1], 6); });
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.keep = 1;
P.add(g);
return g;
},
function (G) {
var X = PHW_ROOMXZ.opera, R, st = PHW.st, lite = phwLite(), gilt = phwMat("gilt");
R = phwRoom(G, "foyer", X.foyer[0], X.foyer[1], 32, 40, { wall: "marble", floor: "checker", h: 16, name: "the grand staircase of the Opera", env: "opera", lightI: 1.1, lightCol: 0xFFE0B0, trim: "oak", ceil: "marble" });
for (var s = 0; s < 16; s++)
phwBox(R.g, 8, (s + 1) * 0.2, 0.6, phwMat("marble"), 0, 0, 3.9 - s * 0.6);
phwRamp(R.cx, R.cz - 0.6, 8, 9.6, R.y + 3.2, R.y);
phwFloor(R.cx, R.cz - 8.4, 14, 6, R.y + 3.2);
phwBox(R.g, 14, 3.2, 6, phwMat("onyx"), 0, 0, -8.4);
[-1, 1].forEach(function (k) { for (var s2 = 0; s2 < 10; s2++)
phwBox(R.g, 4, 3.2 + (s2 + 1) * 0.28, 0.6, phwMat("marble"), k * 9, 0, -4.3 - s2 * 0.6); phwRamp(R.cx + k * 9, R.cz - 7, 4, 6, R.y + 6, R.y + 3.2); });
phwFloor(R.cx, R.cz - 15, 32, 10, R.y + 6);
phwBox(R.g, 32, 0.4, 10, phwMat("marble"), 0, 5.6, -15);
[-1, 1].forEach(function (k) { phwBox(R.g, 0.3, 1.0, 9.6, phwMat("onyx"), k * 4.2, 0, -0.6); phwBox(R.g, 0.3, 1.0, 6, phwMat("onyx"), k * 11.2, 3.2, -7); });
phwBox(R.g, 22, 1.0, 0.3, phwMat("onyx"), 0, 6, -10);
phwSolid(R.cx, R.cz - 10.1, 13.6, 0.4, R.y + 5.6, R.y + 7.2);
[-1, 1].forEach(function (k) { phwSolid(R.cx + k * 13.2, R.cz - 10.1, 5.6, 0.4, R.y + 5.6, R.y + 7.2); });
for (var c = 0; c < 8; c++) {
var cx = -14 + c * 4;
phwCyl(R.g, 0.36, 0.4, 9, c % 2 ? phwMat("redmarble") : phwMat("greenmarble"), cx, 6, -19.4, 12);
phwBox(R.g, 1.0, 0.6, 1.0, gilt, cx, 15, -19.4);
}
[-1, 1].forEach(function (k) { for (var c2 = 0; c2 < 4; c2++)
phwCyl(R.g, 0.5, 0.55, 6, phwMat("greenmarble"), k * 15.2, 0, 8 - c2 * 7, 12); });
phwPaintedCeiling(R.g, 0, 15.8, -2, 9);
phwChandelier(R.g, 0, 13.4, -2, 0.9, {});
if (!lite) {
phwChandelier(R.g, -8, 13.6, -15, 0.5, {});
phwChandelier(R.g, 8, 13.6, -15, 0.5, {});
}
[-1, 1].forEach(function (k) { phwBox(R.g, 1.6, 1.4, 1.6, phwMat("redmarble"), k * 5, 0, 6); phwGiltFigure(R.g, k * 5, 1.4, 6, 1.25, { torch: true, mat: phwShine(0x4A3A2A, 0.4, 0.7) }); phwSolid(R.cx + k * 5, R.cz + 6, 1.8, 1.8, R.y - 1, R.y + 4); });
for (var m = 0; m < 5; m++)
phwMirror(R.g, -12 + m * 6, 7.6, -19.8, 0, 2.6, 4.2);
phwHearth(R.g, 0, -19.6, 0, { h: 4, mat: "marble", fire: !(st.ball) });
phwSign(R.g, "GRAND FOYER", 4, 0.5, 0, 13, -19.75, 0, { bg: "#C8A040", ink: "#2A1A08" });
if (st.ball) {
for (var b = 0; b < (lite ? 12 : 30); b++) {
var ba = wRand(77 + b);
var bl = new THREE.Mesh(phwGeo("balloon", function () { return new THREE.SphereGeometry(0.25, 8, 6); }), phwLam([0xE84A5A, 0xF0D040, 0x4A8AE8, 0xE8E8E8][b % 4]));
bl.position.set(-14 + ba() * 28, 8 + ba() * 6, -18 + ba() * 30);
R.g.add(bl);
}
for (var gl = 0; gl < 8; gl++)
phwBox(R.g, 0.04, 0.04, 30, phwLam([0xE84A5A, 0xF0D040, 0x4A8AE8][gl % 3]), -14 + gl * 4, 12, -4).rotation.x = 0.04;
}
R = phwRoom(G, "hall", X.hall[0], X.hall[1], 44, 58, { wall: "redvelvet", floor: "planks", h: 22, name: "the house: the stalls of the Opera", env: st.dark ? "dark" : "opera", lightI: st.dark ? 0.15 : 1.2, lightCol: 0xFFE0B0, ceil: "plaster" });
var SZ = -29, SD = 15;
phwBox(R.g, 44, 1.3, SD, phwMat("planks"), 0, 0, SZ + SD / 2);
phwFloor(R.cx, R.cz + SZ + SD / 2, 44, SD, R.y + 1.3);
phwSolid(R.cx, R.cz + SZ + SD / 2 + 0.2, 44, SD - 0.4, R.y - 1, R.y + 1.3);
phwRamp(R.cx + 19, R.cz + SZ + SD + 1.6, 3, 3.2, R.y + 1.3, R.y);
phwBox(R.g, 3, 0.6, 3.2, phwMat("darkoak"), 19, 0, SZ + SD + 1.6);
phwRamp(R.cx - 19, R.cz + SZ + SD + 1.6, 3, 3.2, R.y + 1.3, R.y);
phwBox(R.g, 3, 0.6, 3.2, phwMat("darkoak"), -19, 0, SZ + SD + 1.6);
[-1, 1].forEach(function (k) { phwBox(R.g, 2.4, 16, 1.6, gilt, k * 15.4, 1.3, SZ + SD); phwBox(R.g, 6, 22, 1.6, phwMat("redvelvet"), k * 19, 0, SZ + SD - 0.2); phwSolid(R.cx + k * 18, R.cz + SZ + SD, 8, 1.6, R.y - 1, R.y + 23); });
phwBox(R.g, 33, 2.2, 1.6, gilt, 0, 15.3, SZ + SD);
phwBox(R.g, 33, 4.5, 1.6, phwMat("redvelvet"), 0, 17.5, SZ + SD);
if (st.curtain) {
phwBox(R.g, 28.4, 14, 0.2, phwMat("redvelvet"), 0, 1.3, SZ + SD - 0.6);
phwSolid(R.cx, R.cz + SZ + SD - 0.6, 28.4, 0.4, R.y - 1, R.y + 16);
}
else {
[-1, 1].forEach(function (k) { phwBox(R.g, 2.4, 12.6, 0.4, phwMat("redvelvet"), k * 13, 2.6, SZ + SD - 0.6); });
phwBox(R.g, 28, 2.4, 0.4, phwMat("redvelvet"), 0, 12.6, SZ + SD - 0.6);
}
phwScenery(R.g, st.scene || "garden", 30, 13, 0, 1.3, SZ + 0.6, 0);
if (!lite) {
[-1, 1].forEach(function (k) { for (var w = 0; w < 3; w++)
phwScenery(R.g, st.scene === "church" ? "church" : "forest", 3, 12, k * (13 - w * 0.4), 1.3, SZ + 3 + w * 3.6, k * Math.PI / 2); });
}
if (!st.scene || st.scene === "garden") {
phwBox(R.g, 3, 2.6, 2.4, phwS("b:ashlar", 0xE8DCC0, 2), -6, 1.3, SZ + 5);
phwBox(R.g, 0.9, 1.9, 0.06, phwMat("darkoak"), -6, 1.3, SZ + 6.25);
phwBench(R.g, 4, SZ + 8, 0, { w: 2, d: 0.5 }).position.y = 1.3;
}
phwBox(R.g, 1.9, 0.03, 0.08, phwMat("iron"), 8, 1.3, SZ + 9.06);
phwBox(R.g, 1.9, 0.03, 0.08, phwMat("iron"), 8, 1.3, SZ + 10.94);
phwBox(R.g, 0.08, 0.03, 1.9, phwMat("iron"), 7.06, 1.3, SZ + 10);
phwBox(R.g, 0.08, 0.03, 1.9, phwMat("iron"), 8.94, 1.3, SZ + 10);
if (st.trap) {
phwBox(R.g, 1.8, 0.02, 1.8, phwLam(0x050505), 8, 1.305, SZ + 10);
phwBox(R.g, 1.8, 0.06, 1.8, phwMat("planks"), 8, 1.3, SZ + 11.9).rotation.x = -1.2;
}
for (var f = -14; f <= 14; f += 1)
phwBox(R.g, 0.3, 0.12, 0.2, phwGlowM(st.dark ? 0x2A2010 : 0xFFE8B0, 0.95), f, 1.3, SZ + SD - 0.2);
phwBox(R.g, 30, 0.2, 4, phwMat("darkoak"), 0, -0.1, SZ + SD + 2.6);
for (var o2 = 0; o2 < 16; o2++) {
phwChair(R.g, -12 + (o2 % 8) * 3.2, SZ + SD + 1.8 + Math.floor(o2 / 8) * 1.6, Math.PI, {});
phwBox(R.g, 0.04, 1.1, 0.04, phwMat("iron"), -12 + (o2 % 8) * 3.2, 0, SZ + SD + 1.1 + Math.floor(o2 / 8) * 1.6);
}
phwBox(R.g, 30, 1.0, 0.3, phwMat("darkoak"), 0, 0, SZ + SD + 4.8);
phwSeats(R.g, -12, SZ + SD + 6.4, 40, 16, 0.95, 0, { aisle: 0.4 });
phwSolid(R.cx - 6.5, R.cz + SZ + SD + 13.6, 12.6, 15.4, R.y - 1, R.y + 0.9);
phwSolid(R.cx + 7.4, R.cz + SZ + SD + 13.6, 12.6, 15.4, R.y - 1, R.y + 0.9);
[3.6, 7.0, 10.4, 13.8].forEach(function (ty, ti) { phwBoxTier(R.g, -21.8, ty, 4, 40, Math.PI / 2, { n: 10, num: ti === 0 ? [1, 3, 5, 7, 9, 11, 13, 15, 17, 19] : null }); phwBoxTier(R.g, 21.8, ty, 4, 40, -Math.PI / 2, { n: 10, num: ti === 0 ? [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] : null }); phwBoxTier(R.g, 0, ty, 28.8, 40, Math.PI, { n: 12 }); });
phwBox(R.g, 0.2, 0.85, 0.4, phwGlowM(0xFFE8B8, 0.8), -19.7, 4.3, -11.3);
phwPaintedCeiling(R.g, 0, 21.8, 2, 15);
if (st.fallen) {
phwChandelier(R.g, 4, 1.8, 10, 1.6, { fallen: 1, dark: 1 });
for (var dbr = 0; dbr < 14; dbr++) {
var dr = wRand(dbr + 5);
phwBox(R.g, 0.3 + dr() * 0.6, 0.1, 0.2 + dr() * 0.4, dbr % 2 ? gilt : phwMat("redvelvet"), 4 + (dr() - 0.5) * 8, 0.05, 10 + (dr() - 0.5) * 8).rotation.y = dr() * 3;
}
}
else
phwChandelier(R.g, 0, 19.6, 2, 1.6, { dark: !!st.dark });
if (!st.dark && !lite)
[-1, 1].forEach(function (k) { for (var bl2 = 0; bl2 < 6; bl2++) {
var gb = new THREE.Mesh(phwGeo("wallb", function () { return new THREE.SphereGeometry(0.18, 8, 6); }), phwGlowM(0xFFE8C0, 0.9));
gb.position.set(k * 21.6, 2.6, -8 + bl2 * 6);
R.g.add(gb);
} });
R = phwRoom(G, "corridor", X.corridor[0], X.corridor[1], 24, 5, { wall: "damask", floor: "floor", h: 4, name: "the corridor of the grand tier", env: "opera", lightI: 0.7 });
for (var bd = 0; bd < 6; bd++) {
var bx = -10 + bd * 4;
phwBox(R.g, 1.0, 2.2, 0.08, phwMat("darkoak"), bx, 0, -2.4);
phwSign(R.g, String(1 + bd * 2), 0.3, 0.22, bx, 2.4, -2.35, 0, { bg: "#C8A040", ink: "#2A1A08" });
}
phwRug(R.g, 0, 0, 22, 2.2, 0x6A1E22);
for (var lc = -1; lc <= 1; lc++)
phwCandle(R.g, lc * 8, 2.3, -2.3, { brass: 1 });
phwChair(R.g, 8, 1.6, Math.PI, { seat: "redvelvet" });
phwBox(R.g, 1.6, 0.9, 0.5, phwMat("darkoak"), 10, 0, 1.8);
R = phwRoom(G, "box5", X.box5[0], X.box5[1], 4, 4, { wall: "redvelvet", floor: "floor", h: 3.4, name: "Box Five, on the grand tier", env: "opera", lightI: 0.6, light: !lite });
[-0.9, 0, 0.9].forEach(function (x, i) { phwChair(R.g, x, -0.9, 0, { seat: "redvelvet", arm: i === 1 }); });
phwBox(R.g, 3.8, 0.9, 0.2, gilt, 0, 0, -1.9);
phwBox(R.g, 3.8, 0.1, 0.4, phwMat("redvelvet"), 0, 0.9, -1.8);
phwBox(R.g, 3.6, 2.2, 0.02, phwGlowM(st.dark ? 0x1A140A : 0xC8A070, 0.5), 0, 1.0, -1.98);
phwBox(R.g, 0.2, 0.3, 0.2, phwLam(0xF4F0E4), 1.4, 0.92, -1.7);
R = phwRoom(G, "rotunda", X.rotunda[0], X.rotunda[1], 14, 14, { wall: "ashlar", floor: "checker", h: 7, name: "the Subscribers' Rotunda", env: "opera", lightI: 0.9 });
for (var rc = 0; rc < 10; rc++) {
var a = rc / 10 * Math.PI * 2;
phwCyl(R.g, 0.3, 0.34, 7, phwMat("greenmarble"), Math.cos(a) * 5.6, 0, Math.sin(a) * 5.6, 10);
}
phwChandelier(R.g, 0, 6, 0, 0.5, {});
phwRug(R.g, 0, 0, 6, 6, 0x6A1E22);
phwBench(R.g, -4, 4, 0, { w: 2.4, d: 0.5, cushion: 0x8A1A1A });
phwBench(R.g, 4, 4, 0, { w: 2.4, d: 0.5, cushion: 0x8A1A1A });
R = phwRoom(G, "stagedoor", X.stagedoor[0], X.stagedoor[1], 12, 8, { wall: "ochre", floor: "planks", h: 4.5, name: "the stage door and the concierge's lodge", env: "indoor", lightI: 0.7 });
phwBox(R.g, 3.4, 2.4, 2.4, phwMat("darkoak"), -3.6, 0, -2.4);
phwBox(R.g, 3.2, 1.0, 0.06, phwMat("pane"), -3.6, 1.3, -1.18);
phwShelves(R.g, -4.2, -3.6, 1.6, 1.4, 0, { jars: 0 }).position.y = 1.0;
phwBox(R.g, 2.4, 1.6, 0.06, phwLam(0x5A4A2A), 2.4, 1.2, -3.86);
for (var nt = 0; nt < 8; nt++)
phwBox(R.g, 0.3, 0.4, 0.01, phwLam(0xF0E8D0), 1.6 + (nt % 4) * 0.5, 1.5 + Math.floor(nt / 4) * 0.6, -3.82);
phwSign(R.g, "ADMINISTRATION · LOGES · FOYER DE LA DANSE", 5, 0.4, 2, 3.4, -3.86, 0, { bg: "#1E2A22", ink: "#F0D890" });
R = phwRoom(G, "dance", X.dance[0], X.dance[1], 18, 12, { wall: "greenpaper", floor: "floor", h: 7, name: "the dancers' foyer", env: "opera", lightI: 1.0 });
for (var mi = 0; mi < 4; mi++)
phwMirror(R.g, -6.6 + mi * 4.4, 1.6, -5.88, 0, 3.6, 4.4);
phwBox(R.g, 17, 0.05, 0.05, phwMat("brass"), 0, 1.0, -5.6);
phwChandelier(R.g, -4, 6.6, 0, 0.4, {});
phwChandelier(R.g, 4, 6.6, 0, 0.4, {});
[-1, 1].forEach(function (k) { phwBench(R.g, k * 8.6, 0, -k * Math.PI / 2, { w: 6, d: 0.5, cushion: 0x8A1A1A }); });
for (var pc = 0; pc < 4; pc++)
phwPicture(R.g, -8.88, 4.2, -3 + pc * 2, Math.PI / 2, 1.0, 1.3, function (c, W, H) { c.fillStyle = "#2A2420"; c.fillRect(0, 0, W, H); c.fillStyle = "#F4ECE0"; c.beginPath(); c.ellipse(W / 2, H * 0.55, W * 0.18, H * 0.3, 0, 0, 7); c.fill(); c.fillStyle = "#E8C8B0"; c.beginPath(); c.arc(W / 2, H * 0.22, W * 0.1, 0, 7); c.fill(); });
R = phwRoom(G, "sorelli", X.sorelli[0], X.sorelli[1], 7, 6, { wall: "bluepaper", floor: "floor", h: 3.6, name: "La Sorelli's dressing-room", env: "indoor", lightI: 0.8 });
phwMirror(R.g, 0, 0.9, -2.88, 0, 1.8, 1.6);
phwTable(R.g, 0, -2.4, 2.2, 0.6, 0.78, { cloth: 0xF4F0E8 });
phwChair(R.g, 0, -1.6, Math.PI, { seat: "redvelvet" });
phwSofa(R.g, -2.4, 0.6, Math.PI / 2, {});
phwScreen(R.g, 2.6, 0.4, -0.6);
phwFlowers(R.g, 0.8, 0.8, -2.5, 0xE8A0B0);
R = phwRoom(G, "christine", X.christine[0], X.christine[1], 8, 7, { wall: "damask", floor: "floor", h: 3.6, name: "Christine Daae's dressing-room", env: "indoor", lightI: 0.8 });
phwMirror(R.g, 0, 0.2, -3.38, 0, 2.8, 2.6);
phwTable(R.g, -2.4, -2.6, 1.8, 0.6, 0.78, { cloth: 0xF4F0E8 });
phwChair(R.g, -2.4, -1.8, Math.PI, { seat: "redvelvet" });
phwSofa(R.g, 3.2, 0, -Math.PI / 2, {});
phwScreen(R.g, -3, 1.4, 0.6);
phwFlowers(R.g, -2.9, 0.8, -2.7, 0xF4F0E8);
phwFlowers(R.g, -1.9, 0.8, -2.7, 0xE8505A);
phwCandle(R.g, -2.4, 0.78, -2.8, { brass: 1 });
phwRug(R.g, 0, 0.4, 3.6, 2.6, 0x5A3A5A);
if (st.mirror) {
phwBox(R.g, 1.2, 2.4, 0.05, phwGlowM(0x1A0A04, 0.92), 0, 0.1, -3.34);
}
R = phwRoom(G, "office", X.office[0], X.office[1], 10, 8, { wall: "greenpaper", floor: "floor", h: 4.5, name: "the managers' office", env: "indoor", lightI: 0.9 });
phwTable(R.g, -2.2, -2.2, 2.2, 1.1, 0.78, { mat: "darkoak" });
phwTable(R.g, 2.2, -2.2, 2.2, 1.1, 0.78, { mat: "darkoak" });
phwChair(R.g, -2.2, -1.4, Math.PI, { arm: 1, seat: "leather" });
phwChair(R.g, 2.2, -1.4, Math.PI, { arm: 1, seat: "leather" });
phwBox(R.g, 1.1, 1.4, 0.9, phwMat("iron"), 4.3, 0, -3.2);
phwBox(R.g, 0.2, 0.2, 0.04, phwMat("brass"), 4.3, 0.8, -2.72);
phwShelves(R.g, -4.8, 0.4, 3.0, 2.6, Math.PI / 2, {});
phwRug(R.g, 0, 0.2, 5, 3.4, 0x3A2A4A);
phwHearth(R.g, 0, -3.7, 0, { h: R.h, mat: "marble" });
for (var lt = 0; lt < 6; lt++)
phwBox(R.g, 0.22, 0.01, 0.3, phwLam(0xF4F0E4), -2.8 + lt * 0.22, 0.79, -2.3);
R = phwRoom(G, "cellar1", X.cellar1[0], X.cellar1[1], 30, 22, { wall: "greystone", floor: "planks", h: 7, name: "the first cellar, under the stage", env: "cellar", lightI: 0.6, lightCol: 0xFFC880, bare: 1 });
for (var pl = 0; pl < 4; pl++)
for (var pr = 0; pr < 3; pr++)
phwBox(R.g, 0.5, 7, 0.5, phwMat("darkoak"), -11 + pl * 7.3, 0, -7 + pr * 7);
for (var tr = 0; tr < 3; tr++)
phwBox(R.g, 2.4, 0.2, 1.4, phwMat("planks"), -6 + tr * 6, 6.8, -2);
phwDrum(R.g, -8, 0, 4);
phwDrum(R.g, 6, 0, 6);
for (var rp = 0; rp < 10; rp++)
phwCyl(R.g, 0.02, 0.02, 7, phwMat("rope"), -12 + rp * 2.6, 0, -9, 4);
phwScenery(R.g, "forest", 8, 5, -10, 0, 8, 0.4);
phwScenery(R.g, "church", 8, 5, 8, 0, -9.6, 0);
for (var ln = 0; ln < 4; ln++)
phwCandle(R.g, -12 + ln * 8, 2.0, -10.6, {});
R = phwRoom(G, "cellar3", X.cellar3[0], X.cellar3[1], 30, 22, { wall: "greystone", floor: "cobble", h: 7, name: "the third cellar", env: "cellar", lightI: 0.45, lightCol: 0xFFB870, bare: 1 });
for (pl = 0; pl < 4; pl++)
for (pr = 0; pr < 3; pr++)
phwCyl(R.g, 0.4, 0.5, 7, phwMat("greystone"), -11 + pl * 7.3, 0, -7 + pr * 7, 10);
phwScenery(R.g, "farm", 10, 6, -6, 0, -10.6, 0);
phwBox(R.g, 1.0, 2.2, 0.08, phwMat("darkoak"), -5, 0, -10.5);
phwScenery(R.g, "garden", 6, 4, 9, 0, 5, 1.2);
phwScenery(R.g, "church", 6, 4, -11, 0, 4, -1.0);
phwBox(R.g, 1.8, 0.6, 0.4, phwMat("darkstone"), 12, 1.6, -10.85);
for (var lb2 = 0; lb2 < 3; lb2++)
phwCandle(R.g, -10 + lb2 * 10, 2.0, -10.6, {});
R = phwRoom(G, "stable", X.stable[0], X.stable[1], 18, 12, { wall: "greystone", floor: "cobble", h: 5, name: "the stables of the Opera", env: "cellar", lightI: 0.6 });
for (var sb = 0; sb < 6; sb++) {
var sx = -7.5 + sb * 3;
phwBox(R.g, 0.15, 1.6, 3, phwMat("darkoak"), sx - 1.5, 0, -4.4);
phwBox(R.g, 2.8, 0.5, 0.4, phwMat("darkoak"), sx, 0.8, -5.6);
if (sb !== 2 && !lite)
phwHorse(R.g, sx, 0, -4.2, Math.PI, { plain: 1, col: [0x5A3A22, 0x2A1C14, 0x8A6A4A, 0xE0DCD4, 0x3A2418, 0x6A4A2A][sb] });
}
phwSign(R.g, "CÉSAR", 1.0, 0.3, -1.5, 2.0, -5.86, 0, { bg: "#2A1E14", ink: "#F0D890" });
for (var hy = 0; hy < 4; hy++)
phwBox(R.g, 1.2, 0.6, 0.8, phwLam(0xC8B068), 6 + hy % 2 * 1.3, Math.floor(hy / 2) * 0.6, 3.8);
R = phwRoom(G, "cellar5", X.cellar5[0], X.cellar5[1], 24, 16, { wall: "darkstone", floor: "cobble", h: 6, name: "the fifth cellar, and the Communists' road", env: "cellar", lightI: 0.35, lightCol: 0xC8A070, bare: 1 });
for (var dc = 0; dc < 4; dc++) {
phwBox(R.g, 1.1, 2.0, 0.1, phwMat("iron"), -9 + dc * 5, 0, -7.85);
for (var bar = 0; bar < 4; bar++)
phwBox(R.g, 0.04, 0.6, 0.04, phwMat("iron"), -9.3 + dc * 5 + bar * 0.2, 1.3, -7.8);
}
phwBox(R.g, 2.4, 0.06, 14, phwLam(0x0A1418), 9, 0.02, 0);
phwWater(R.g, 9, 0, 2.2, 14, 0.06, 0x1A2A30, 0.9);
if (st.skeleton) {
phwSkulls(R.g, -8.4, 0.02, -5, 1);
for (var sb = 0; sb < 7; sb++) {
var sr = wRand(sb + 41);
phwBox(R.g, 0.05, 0.04, 0.3 + sr() * 0.2, phwLam(0xD8CCB0), -8.2 + (sr() - 0.5) * 0.8, 0.02, -4.4 + sb * 0.16).rotation.y = (sr() - 0.5) * 0.8;
}
var rgn = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.008, 6, 12), phwShine(0xE8C060, 0.25, 0.9));
rgn.position.set(-7.8, 0.03, -3.6);
rgn.rotation.x = Math.PI / 2;
R.g.add(rgn);
phwCyl(R.g, 0.5, 0.55, 0.7, phwMat("darkstone"), -9.6, 0, -5.6, 12);
phwWater(R.g, -9.6, -5.6, 0.8, 0.8, 0.62, 0x14222A, 0.9);
}
if (st.rats) {
var rg = new THREE.Group();
R.g.add(rg);
var rm = phwLam(0x3A3430), rt = phwLam(0x8A7A70), rats = [];
for (var ri = 0; ri < (lite ? 18 : 46); ri++) {
var r1 = wRand(ri * 7 + 3), q = new THREE.Group();
phwEll(q, rm, 0.11, 0.07, 0.2, 0, 0.07, 0, 8);
phwEll(q, rm, 0.06, 0.05, 0.08, 0, 0.08, 0.22, 6);
phwCyl(q, 0.008, 0.004, 0.3, rt, 0, 0.05, -0.32, 4).rotation.x = Math.PI / 2.2;
q.position.set((r1() - 0.5) * 20, 0, (r1() - 0.5) * 5);
rg.add(q);
rats.push({ g: q, sp: 2.4 + r1() * 1.6, ph: r1() * 6 });
}
var rdir = 1, rt0 = 0;
PHW.ticks.push(function (dt) { if (!rg.parent)
return; rt0 += dt; rats.forEach(function (Q) { Q.g.position.x += rdir * Q.sp * Math.min(dt, 0.1); Q.g.rotation.y = rdir > 0 ? Math.PI / 2 : -Math.PI / 2; Q.g.position.y = Math.abs(Math.sin(rt0 * 14 + Q.ph)) * 0.03; if (Q.g.position.x > 10)
Q.g.position.x = -10; if (Q.g.position.x < -10)
Q.g.position.x = 10; }); });
}
phwCandle(R.g, -10, 1.6, -7.6, {});
for (var bn = 0; bn < 3; bn++)
phwBox(R.g, 0.4, 0.05, 0.08, phwLam(0xD8CCB0), -4 + bn * 0.3, 0.02, 3 + bn * 0.2).rotation.y = bn;
R = phwRoom(G, "lake", X.lake[0], X.lake[1], 40, 60, { wall: "cave", floor: "cobble", h: 12, name: "the lake under the Opera", env: "lakecave", lightI: 0.4, lightCol: 0x8AB0C8, bare: 1, ceil: "cave" });
phwWater(R.g, 0, -4, 39.6, 44, 0.3, 0x0A1A20, 0.96);
phwSolid(R.cx, R.cz - 4, 39.4, 44, R.y - 1, R.y + 12);
phwBox(R.g, 40, 0.4, 10, phwMat("wetstone"), 0, 0, 23);
phwBox(R.g, 6, 0.3, 4, phwMat("planks"), 0, 0.3, 17.6);
phwBoat(R.g, -4, 0.1, 15.6, 0.2, {});
for (var ch = 0; ch < 6; ch++)
phwCyl(R.g, 0.12, 0.12, 1.6, phwMat("darkoak"), -3 + ch * 1.2, -0.6, 15.8, 6);
phwBox(R.g, 40, 0.6, 4, phwMat("wetstone"), 0, 0, -28);
phwBox(R.g, 22, 10, 0.6, phwMat("darkstone"), 0, 0, -29.6);
phwBox(R.g, 1.4, 2.4, 0.1, phwMat("darkoak"), 0, 0.6, -29.2);
phwBoat(R.g, 6, 0.1, -24.2, 1.2, {});
for (var rk = 0; rk < (lite ? 8 : 18); rk++) {
var rr = wRand(rk + 40);
phwBox(R.g, 1 + rr() * 3, 2 + rr() * 6, 1 + rr() * 2, phwMat("cave"), -19 + rr() * 38, 0, -30 + rr() * 0.5).rotation.y = rr();
}
phwFloor(R.cx, R.cz - 28, 40, 4, R.y + 0.6);
if (!lite) {
var lg = wGlow(0x2A4A5A, 0.5, 12);
lg.position.set(0, 1, -6);
R.g.add(lg);
}
R = phwRoom(G, "louis", X.louis[0], X.louis[1], 10, 9, { wall: "rose", floor: "floor", h: 4, name: "the Louis-Philippe room in Erik's house", env: "indoor", lightI: 0.8 });
phwBed(R.g, -3, -1.6, Math.PI / 2, { posts: 1, cover: 0xE8D8E0 });
phwHearth(R.g, 2, -4.3, 0, { h: R.h, mat: "marble" });
phwCaskets(R.g, 2, 1.32, -4.2);
phwSofa(R.g, 3.6, 1, -Math.PI / 2, { mat: "velvet" });
phwChair(R.g, 0, 1, 0, { arm: 1, seat: "redvelvet" });
phwTable(R.g, 0, 0, 1.0, 0.7, 0.72, { cloth: 0xF0E8E0 });
phwPicture(R.g, -4.88, 2.2, 1, Math.PI / 2, 1.2, 0.9);
phwRug(R.g, 0, 0, 4, 3, 0x6A4A5A);
phwFlowers(R.g, 0, 0.72, 0, 0xF4F0E8);
phwBox(R.g, 0.3, 0.4, 0.2, phwMat("brass"), 1.4, 1.32, -4.2);
R = phwRoom(G, "erikroom", X.erikroom[0], X.erikroom[1], 10, 9, { wall: "blackcloth", floor: "planks", h: 4.5, name: "Erik's own room", env: "cellar", lightI: 0.45, lightCol: 0xFFB070, bare: 1, ceil: "blackcloth" });
phwCoffin(R.g, 0, 0, 0);
phwOrgan(R.g, 0, -3.9, 0);
for (var ec = 0; ec < 4; ec++)
phwCandle(R.g, -3 + ec * 2, 0, 2.8, { brass: 1 }).scale.setScalar(2.4);
phwBox(R.g, 0.5, 0.03, 0.7, phwLam(0xF4ECDA), 2.6, 0.8, -3.6);
phwSign(R.g, "DIES IRÆ", 2.2, 0.4, 0, 3.4, -4.38, 0, { bg: "#0E0C10", ink: "#C8A040", it: 1 });
R = phwRoom(G, "torture", X.torture[0], X.torture[1], 8, 8, { wall: "mirror", floor: st.desert ? "sand" : "floor", h: 5, name: "the torture-chamber", env: st.heat ? "hot" : "cellar", lightI: st.heat ? 1.4 : 0.4, lightCol: st.heat ? 0xFFE8C0 : 0xFFB870, bare: 1 });
[[-3.9, 0, Math.PI / 2], [3.9, 0, -Math.PI / 2], [0, -3.9, 0], [-2.8, -2.8, Math.PI / 4], [2.8, -2.8, -Math.PI / 4]].forEach(function (q) { phwMirror(R.g, q[0], 0.1, q[1], q[2], 3.2, 4.6); });
phwIronTree(R.g, -2.6, -2.4, 4.6);
phwSolid(R.cx - 2.6, R.cz - 2.4, 0.6, 0.6, R.y - 1, R.y + 5);
if (st.forest && !lite) {
for (var ft = 0; ft < 10; ft++) {
var fa = ft / 10 * Math.PI * 2;
phwCyl(R.g, 0.2, 0.3, 5, phwMat("darkbark"), Math.cos(fa) * 3.4, 0, Math.sin(fa) * 3.4, 8);
var cr = phwEll(R.g, phwLam(0x2A5A2A), 1.2, 0.8, 1.2, Math.cos(fa) * 3.3, 4.4, Math.sin(fa) * 3.3, 8);
}
}
if (st.desert) {
phwBox(R.g, 7.6, 0.1, 7.6, phwMat("sand"), 0, 0, 0);
}
if (st.flood > 1) {
phwWater(R.g, 0, 0, 7.8, 7.8, st.flood > 2 ? 2.6 : 0.9, 0x14222A, 0.9);
}
phwBox(R.g, 0.2, 0.12, 0.12, phwMat("iron"), 1.2, 0.02, 1.4);
R = phwRoom(G, "powder", X.powder[0], X.powder[1], 14, 10, { wall: "darkstone", floor: "cobble", h: 3.6, name: "the cellar under the torture-chamber", env: "cellar", lightI: 0.35, bare: 1 });
for (var br = 0; br < (lite ? 16 : 30); br++) {
phwBarrel(R.g, -6 + (br % 10) * 1.3, 0, -4 + Math.floor(br / 10) * 1.1, {});
}
phwSign(R.g, "POUDRE", 1.2, 0.3, -2, 2.4, -4.86, 0, { bg: "#2A1E14", ink: "#E8C060" });
if (st.flood) {
phwWater(R.g, 0, 0, 13.6, 9.6, st.flood > 1 ? 1.6 : 0.6, 0x1A2A30, 0.92);
}
R = phwRoom(G, "valerius", X.valerius[0], X.valerius[1], 8, 7, { wall: "bluepaper", floor: "floor", h: 3.4, name: "Mamma Valerius's little flat", env: "indoor", lightI: 0.75 });
phwBed(R.g, -2.4, -1.4, Math.PI / 2, { posts: 1, cover: 0xE8E0D0 });
phwChair(R.g, -0.8, -0.6, -Math.PI / 2, {});
phwTable(R.g, 2, -2.6, 1.4, 0.7, 0.76, {});
phwShelves(R.g, 3.8, 0, 2.4, 2.0, -Math.PI / 2, {});
phwPicture(R.g, 0, 2.2, -3.38, 0, 1.0, 1.2);
phwCandle(R.g, 2, 0.76, -2.6, { brass: 1 });
phwBox(R.g, 0.7, 0.12, 0.24, phwLam(0x6A3A1A), 2.4, 0.78, -2.5);
R = phwRoom(G, "persian", X.persian[0], X.persian[1], 8, 7, { wall: "damask", floor: "floor", h: 3.4, name: "the Persian's flat, in the Rue de Rivoli", env: "indoor", lightI: 0.75 });
phwRug(R.g, 0, 0, 5, 4, 0x8A2A1E);
phwSofa(R.g, -2.6, -1.6, Math.PI / 2, { mat: "velvet" });
phwTable(R.g, 0.6, -0.4, 1.0, 1.0, 0.5, { mat: "darkoak" });
phwCyl(R.g, 0.12, 0.18, 0.6, phwMat("brass"), 0.6, 0.5, -0.4, 10);
phwWindowIn(R.g, 2, 2.0, -3.38, 0, 1.6, 1.6, { sky: 0xA8C0D8 });
phwShelves(R.g, 3.8, 1, 2.2, 2.0, -Math.PI / 2, {});
R = phwRoom(G, "cafe", X.cafe[0], X.cafe[1], 12, 8, { wall: "damask", floor: "checker", h: 4.2, name: "the Cafe de la Paix", env: "opera", lightI: 0.9 });
phwBox(R.g, 4, 1.1, 0.8, phwMat("darkoak"), -3, 0, -3.2);
for (var mr2 = 0; mr2 < 3; mr2++)
phwMirror(R.g, -4 + mr2 * 4, 1.3, -3.88, 0, 3, 2.2);
for (var ct = 0; ct < 6; ct++) {
var tx = -4 + (ct % 3) * 4, tz = -0.6 + Math.floor(ct / 3) * 2.4;
phwTable(R.g, tx, tz, 0.8, 0.8, 0.74, { mat: "oak", cloth: 0xF4F0E8 });
phwChair(R.g, tx - 0.6, tz, Math.PI / 2, {});
phwChair(R.g, tx + 0.6, tz, -Math.PI / 2, {});
}
phwChandelier(R.g, 0, 4.0, 0, 0.3, {});
R = phwRoom(G, "chagny", X.chagny[0], X.chagny[1], 10, 8, { wall: "damask", floor: "floor", h: 4.2, name: "Raoul's bedroom in the Chagny house", env: "indoor", lightI: (st.night || PHW.night) ? 0.3 : 0.75 });
phwBed(R.g, -2.8, -1.6, Math.PI / 2, { posts: 1, cover: 0xE8E0D0 });
phwBox(R.g, 1.6, 1.0, 0.6, phwMat("darkoak"), 3.6, 0, -3.4);
phwCandle(R.g, -1.4, 0.6, -2.6, { brass: 1 });
phwBox(R.g, 0.6, 0.6, 0.6, phwMat("darkoak"), -1.4, 0, -2.6);
phwWindowIn(R.g, 0, 1.0, -3.88, 0, 2.0, 2.8, { sky: (st.night || PHW.night) ? 0x101828 : 0xA8C0D8 });
phwBox(R.g, 2.6, 0.08, 0.8, phwMat("stone"), 0, 0, -4.3);
phwBox(R.g, 2.6, 0.9, 0.05, phwMat("iron"), 0, 0.08, -4.68);
phwRug(R.g, 0, 0.4, 4, 3, 0x6A2A2A);
phwPicture(R.g, -4.8, 2.2, 0, Math.PI / 2, 1.0, 1.3);
phwChair(R.g, 2.6, 1.6, Math.PI, {});
R = phwRoom(G, "study", X.study[0], X.study[1], 9, 8, { wall: "damask", floor: "floor", h: 4.2, name: "Count Philippe's study", env: "indoor", lightI: 0.8 });
phwTable(R.g, 0, -1.6, 2.4, 1.1, 0.78, { mat: "darkoak" });
phwChair(R.g, 0, -2.6, 0, {});
phwChair(R.g, 0, -0.4, Math.PI, {});
phwShelves(R.g, -4.3, 0, 3.0, 2.4, Math.PI / 2, {});
phwShelves(R.g, 4.3, 0, 3.0, 2.4, -Math.PI / 2, {});
phwRug(R.g, 0, 0, 4, 3, 0x2A3A5A);
phwPicture(R.g, 0, 2.2, -3.88, 0, 1.4, 1.0);
phwInDoor("chagny", "study", 4.6, 2.6, "The door to the Count's study", "go in");
phwInDoor("foyer", "hall", 0, -18.6, "The doors of the stalls (on the gallery)", "go in");
phwInDoor("foyer", "corridor", -14, -18.6, "The stair to the grand tier", "go up");
phwInDoor("corridor", "box5", -10, -2, "The door of Box Five", "go in");
phwInDoor("foyer", "rotunda", 14, -18.6, "The door to the Rotunda");
phwInDoor("stagedoor", "dance", 4.8, -3.2, "The passage to the dancers' foyer");
phwInDoor("stagedoor", "sorelli", -5.4, 2.6, "La Sorelli's door");
phwInDoor("stagedoor", "christine", 5.4, 2.6, "Christine Daae's door");
phwInDoor("stagedoor", "office", 0, -3.2, "The stair to the managers' office", "go up");
phwPassage("stagedoor", -5.4, -0.2, 0, "hall", 18, -26, 1.3, "The passage behind the scenes, to the stage", "go", "The passage to the stage door", "go");
phwInDoor("stagedoor", "cellar1", 5.4, -0.2, "The stairs down to the cellars", "go down");
phwInDoor("cellar1", "cellar3", 13, -9.4, "The stairs down to the third cellar", "go down");
phwInDoor("cellar3", "stable", -13, -9.4, "The way to the stables");
phwInDoor("cellar3", "cellar5", 6, -9.4, "The stairs down to the fifth cellar", "go down");
phwInDoor("cellar5", "lake", 11, -6.8, "The way on to the lake", "go");
phwInDoor("lake", "louis", 0, -28.2, "The door in the wall of Erik's house", "go in");
phwInDoor("louis", "erikroom", -4, -3.6, "The door of Erik's room");
phwInDoor("louis", "torture", 4.4, 3.6, "The door to the torture-chamber");
phwInDoor("torture", "powder", 1.2, 1.4, "The trap-door in the floor", "go down");
if (st.mirror)
phwPassage("christine", 0, -2.6, 0, "cellar3", 11, -8.4, 0, "The great mirror, turned", "step through", "The dark passage up to the mirror", "go");
if (st.wall)
phwPassage("cellar3", 12, -9.6, 0, "torture", 0, 1.8, 0, "The stone that turns, in the wall", "go through", null, null);
var L = PHW.rooms.filter(function (r) { return r.key === "lake"; })[0];
if (L) {
phwSpot(L.cx - 4, L.cz + 18.6, 2.4, "Erik's boat", "row across the lake", function () { phwGo({ sc: "opera", x: L.cx + 4, z: L.cz - 27.4, y: L.y + 0.6, ry: Math.PI }, "🛶 <b>Across the lake.</b> The water is black and still; the shore is lost behind you."); }, L.y);
phwSpot(L.cx + 6, L.cz - 27.2, 2.4, "The boat", "row back across the lake", function () { phwGo({ sc: "opera", x: L.cx - 4, z: L.cz + 17, y: L.y, ry: 0 }, "🛶 <b>Back across the lake.</b>"); }, L.y + 0.6);
}
var Fy = PHW.rooms.filter(function (r) { return r.key === "foyer"; })[0];
if (Fy) {
phwSpot(Fy.cx + 14, Fy.cz - 12, 1.6, "The little stairs up to the roofs", "climb", function () { phwGo({ sc: "opera", x: PHW_OP.gx, z: PHW_OP.gz + PHW_GN.stage + 7, y: phwRoofY(), ry: Math.PI }, "🏛️ <b>The roofs of the Opera.</b> Paris all round you, and Apollo above with his lyre."); }, Fy.y + 6);
phwSpot(PHW_OP.gx + 12, PHW_OP.gz + PHW_GN.stage + 8, 1.8, "The little stairs down", "go down", function () { phwGo({ sc: "opera", x: Fy.cx + 12, z: Fy.cz - 12, y: Fy.y + 6, ry: 0 }, null); }, phwRoofY());
}
},
function (a, ax, az, ay, b, bx, bz, by, n1, v1, n2, v2) {
var A = phwRm(a), B = phwRm(b);
if (!A || !B)
return;
phwSpot(A.cx + ax, A.cz + az, 1.5, n1, v1 || "go", function () { phwGo({ sc: PHW.sc, x: B.cx + bx, z: B.cz + bz + 0.6, y: B.y + by, ry: Math.PI }, "🚪 <b>" + phEsc(B.name) + ".</b>"); if (typeof phbNote === "function")
phbNote("in:" + B.key); }, A.y + ay);
if (n2)
phwSpot(B.cx + bx, B.cz + bz, 1.4, n2, v2 || "go", function () { phwGo({ sc: PHW.sc, x: A.cx + ax, z: A.cz + az + 1.2, y: A.y + ay, ry: 0 }, null); if (typeof phbNote === "function")
phbNote("in:" + A.key); }, B.y + by);
},
function (G) {
var lite = phwLite(), st = PHW.st, H = phwOpH, D;
phwTerrain(G, -440, -440, 880, 880, lite ? 20 : 12, H, phwMat("paving"), function (x, z, y, c) { var g = 0.86 + phwFbm(x * 0.05, z * 0.05, 2) * 0.14; c.setRGB(0.78 * g, 0.76 * g, 0.72 * g); });
Object.keys(PHW_OP_ROADS).forEach(function (k) { phwStrip(G, PHW_OP_ROADS[k], k === "boul" ? 28 : (k === "avenue" ? 24 : 14), H, phwMat("setts"), 0.05); });
phwStrip(G, [[-70, 24], [70, 24], [70, 64], [-70, 64], [-70, 24]], 8, H, phwMat("setts"), 0.04);
D = function (key, p, nm) { var Rm = PHW.rooms.filter(function (r) { return r.key === key; })[0]; if (Rm)
phwDoor(Rm, nm || ("The door of " + Rm.name), p.x, p.z, p.ry); };
phwGarnier(G, PHW_OP.gx, PHW_OP.gz, H);
var gy = H(0, -60) + 0.2;
D("foyer", { x: 0, z: PHW_OP.gz + PHW_GN.front + 2.6, ry: Math.PI }, "The doors of the Opera");
D("rotunda", { x: -72.6, z: -50, ry: -Math.PI / 2 }, "The door of the Subscribers' pavilion");
if (st.barouche) {
phwCab(G, -82, -36, 0, H, { col: 0x1A1E2A });
phwCab(G, -82, -24, 0, H, { plain: 1 });
}
D("stagedoor", { x: 0, z: PHW_OP.gz + PHW_GN.back - 1.6, ry: 0 }, "The stage door");
phwBox(G, 2.4, 3.2, 0.12, phwMat("iron"), -53.2, H(-53, -110), -110).rotation.y = Math.PI / 2;
phwSign(G, "N° 2", 0.4, 0.3, -53.4, H(-53, -110) + 3.4, -110, -Math.PI / 2, { bg: "#1E2420", ink: "#E8E0C8" });
var Lk = PHW.rooms.filter(function (r) { return r.key === "lake"; })[0];
if (Lk)
phwSpot(-55.4, -110, 1.8, "The little iron gate in the Rue Scribe", "go through", function () { phwGo({ sc: "opera", x: Lk.cx + 12, z: Lk.cz + 20, y: Lk.y, ry: Math.PI }, "🚪 <b>The road from the Rue Scribe</b>, down in the dark to the lake's shore."); });
var NM = [["MODES", "PARFUMERIE", "GANTS"], ["LIBRAIRIE", "CHAPELIER", "BIJOUTIER"], ["PATISSERIE", "FLEURS", "TABAC"], ["PAPETERIE", "MUSIQUE", "CORSETS"], ["CHOCOLAT", "PIANOS", "SOIERIES"]], ni = 0;
[-122].forEach(function (z) { phwHaus(G, -104, z, 50, { ry: Math.PI / 2, names: NM[(ni++) % 5] }); phwHaus(G, 104, z, 50, { ry: -Math.PI / 2, names: NM[(ni++) % 5] }); });
phwHaus(G, -104, -60, 70, { ry: Math.PI / 2, names: NM[(ni++) % 5] });
phwHaus(G, 104, -60, 70, { ry: -Math.PI / 2, names: NM[(ni++) % 5], door: 1 });
phwHaus(G, -104, 26, 64, { ry: Math.PI / 2, cafe: 1, sign: "GRAND HÔTEL · CAFÉ DE LA PAIX", fl: 7 });
D("cafe", { x: -95.6, z: 58, ry: Math.PI / 2 }, "The door of the Cafe de la Paix");
phwHaus(G, 104, 26, 64, { ry: -Math.PI / 2, names: NM[(ni++) % 5], door: 1 });
D("valerius", { x: 95.6, z: 30, ry: -Math.PI / 2 }, "The door to Mamma Valerius's little flat (up the stair)");
D("chagny", { x: -360, z: 103.6, ry: Math.PI }, "The door of the Chagny house");
[-280, -200, -120, -40, 40, 120, 200, 280].forEach(function (x) { phwHaus(G, x, -200, 72, { ry: 0, names: NM[(ni++) % 5] }); });
[-380, -300, -220, -150].forEach(function (x) { phwHaus(G, x, 48, 66, { ry: 0, names: NM[(ni++) % 5] }); phwHaus(G, -x, 48, 66, { ry: 0, names: NM[(ni++) % 5] }); });
[-360, -280, -200, -120, -56].forEach(function (x) { phwHaus(G, x, 112, x === -56 ? 60 : 72, { ry: Math.PI, names: NM[(ni++) % 5], cafe: x === -120 }); phwHaus(G, -x, 112, x === -56 ? 60 : 72, { ry: Math.PI, names: NM[(ni++) % 5] }); });
[-370, -280, -190].forEach(function (x, i) { if (lite && i > 1)
return; [-30, -110].forEach(function (z) { phwHaus(G, x, z, 70, { ry: 0, names: NM[(ni++) % 5] }); phwHaus(G, -x, z, 70, { ry: 0, names: NM[(ni++) % 5] }); }); });
[-320, -220, -120].forEach(function (x, i) { if (lite && i > 1)
return; [210, 330].forEach(function (z) { phwHaus(G, x, z, 80, { ry: Math.PI, names: NM[(ni++) % 5] }); phwHaus(G, -x, z, 80, { ry: Math.PI, names: NM[(ni++) % 5] }); }); });
[170, 240, 310, 380].forEach(function (z) { phwHaus(G, -26, z, 64, { ry: Math.PI / 2, names: NM[(ni++) % 5] }); phwHaus(G, 26, z, 64, { ry: -Math.PI / 2, names: NM[(ni++) % 5] }); });
D("persian", { x: -17.6, z: 398, ry: Math.PI / 2 }, "The door of the Persian's flat (the Rue de Rivoli is at the foot of the Avenue)");
var trees = [];
for (var tx = -410; tx <= 410; tx += 14) {
if (Math.abs(tx) < 30)
continue;
trees.push({ x: tx, z: 68, y: H(tx, 68), s: 1.2 });
trees.push({ x: tx, z: 93, y: H(tx, 93), s: 1.2 });
}
phwPlant(G, "tree", lite ? trees.filter(function (t, i) { return i % 2 === 0; }) : trees, { col: st.winter ? 0x6A6A5A : 0x4A6A34 });
for (var lx = -400; lx <= 400; lx += (lite ? 40 : 24)) {
phwLamp(G, lx, 64, H, { lit: true });
phwLamp(G, lx, 96, H, { lit: true });
}
for (var lz = -250; lz <= 60; lz += (lite ? 50 : 30)) {
phwLamp(G, -70, lz, H, { lit: true });
phwLamp(G, 70, lz, H, { lit: true });
}
for (lz = 120; lz <= 410; lz += (lite ? 60 : 36)) {
phwLamp(G, -14, lz, H, { lit: true });
phwLamp(G, 14, lz, H, { lit: true });
}
[-180, -110, 110, 180, -300, 300].forEach(function (x, i) { if (lite && i > 3)
return; phwColonne(G, x, i % 2 ? 94 : 66, H); });
[-140, 140, -240, 240].forEach(function (x) { phwBenchOut(G, x, 70, Math.PI, H); phwBenchOut(G, x, 91, 0, H); });
for (var cb = 0; cb < (lite ? 3 : 6); cb++)
phwCab(G, -40 + cb * 7.6, 40, Math.PI, H, { plain: lite || cb > 2, col: [0x14141A, 0x1A1410, 0x101418][cb % 3] });
if (!lite) {
phwCab(G, -62, -20, 0, H, {});
phwOmnibus(G, -170, 78, Math.PI / 2, H);
phwOmnibus(G, 210, 84, -Math.PI / 2, H);
}
phwCab(G, -86, -40, Math.PI, H, { plain: lite });
},
function (G) {
var st = PHW.st, lite = phwLite(), night = !st.day;
phwCrowd("opP", night ? [["A gentleman in evening dress", "m", "pheve", "Faust tonight, and Carlotta singing. They say there was trouble at the gala."], ["A lady in her cloak", "f", "lady", "My dear, everyone is talking of the ghost. Isn't it delicious?"], ["A cabman", "m", "cabby", "Cab, monsieur? Anywhere in Paris."], ["A flower-girl", "f", "maid", "Violets! Violets for the lady, monsieur?"],
["A newsboy", "m", "newsboy", "L'Époque! The Opera ghost again! Read all about it!", null, true], ["A sergeant de ville", "m", "police", "Move along, please, keep the steps clear."], ["A subscriber", "m", "pheve", "I've had my box twenty years. I never saw the house so full."], ["A young man with a cane", "m", "gent", "I came for the ballet, frankly. La Sorelli!"],
["An old lady with a lorgnette", "f", "lady", "In my day the Opera was in the Rue Le Peletier. This one is too gilded by half."], ["A student", "m", "gent", "Standing room in the gods. One sees everything from up there."]]
: [["A shopgirl", "f", "maid", "The new hats are in at the milliner's in the Rue de la Paix."], ["A gentleman with a newspaper", "m", "gent", "Another letter from the ghost in the paper this morning, they say."], ["A cabman", "m", "cabby", "Cab, monsieur? To the Bois?"], ["A nursemaid", "f", "maid", "Hold my hand crossing, Lucien."], ["A porter with a crate", "m", "worker", "Scenery for the Opera. Mind your back!"], ["A gendarme", "m", "police", "Good day, monsieur."]], -70, 24, 70, 72, { wander: 6 });
phwCrowd("opB", [["A boulevardier", "m", "pheve", "The Cafe de la Paix has the best ices in Paris."], ["A lady shopping", "f", "lady", "The shops here! One could spend a fortune before dinner."], ["A shoeblack", "m", "boy", "Shine, monsieur? Two sous.", null, true], ["A waiter on the terrace", "m", "porter", "A table, monsieur? Absinthe, coffee, an ice?"], ["A boy with a hoop", "m", "boy", "Look out!", null, true], ["A soldier on leave", "m", "police", "First time in Paris. It's all so bright!"]], -300, 70, 300, 92, { wander: 9 });
if (!lite)
phwCrowd("opA", [["A lady in a carriage", "f", "lady", "Drive on, Jules. To the Rue de Rivoli."], ["A clerk hurrying", "m", "gent", "Late again! The bank opens at nine."], ["A painter with his box", "m", "gent", "I paint the Avenue at dusk. The lamps!"]], -14, 140, 14, 380, { wander: 8 });
phwCrowd("opS", [["A stage-hand having his pipe", "m", "phshifter", "Don't go round the back after dark, I tell the new ones. Not since Joseph Buquet."], ["A fireman of the Opera", "m", "phfireman", "Fire-watch tonight. Every lamp in the house is mine to mind."]], -30, -176, 30, -168, { wander: 3 });
if (st.police)
phwCrowd("opPol", [["A gendarme at the gate", "m", "police", "Nobody goes in or out without the commissary's leave."], ["A gendarme", "m", "police", "A singer carried off from the stage in the middle of the performance! In front of everyone!"]], -20, 14, 20, 30, { wander: 2 });
},
function () {
var st = PHW.st, lite = phwLite(), Rm = function (k) { return PHW.rooms.filter(function (r) { return r.key === k; })[0]; };
var put = function (k, list, o) { var R = Rm(k); if (!R)
return; phwCrowd("rf" + k, list, R.x0 + 1.4, R.z0 + 1.4, R.x1 - 1.4, R.z1 - 1.6, Object.assign({ y: R.y, wander: o && o.wander != null ? o.wander : 2 }, o || {})); };
if (!st.dark && !st.empty) {
put("foyer", st.ball ? [["A pierrot", "m", "phfancy", "Have you seen Red Death? Everyone's talking of him!"], ["A shepherdess", "f", "phfancy", "Who are you, under that domino? I shall guess!"], ["A Harlequin", "m", "phfancy", "Supper at three, and dancing till dawn!"], ["A black domino", "f", "phdomino", "Hush ... I am waiting for someone."], ["A white domino", "m", "phdomino", "These masks are absurd. I can't see a thing."], ["A sailor in fancy dress", "m", "phfancy", "To the famous draftsman! Long life!"], ["A Columbine", "f", "phfancy", "The music! Come and dance!"], ["A Turk", "m", "phfancy", "Was that a real skull on that fellow in red?"]]
: [["An usher with programs", "m", "porter", "Programs! Program, monsieur?"], ["A subscriber", "m", "pheve", "The grand staircase never fails to take my breath away."], ["A lady in diamonds", "f", "lady", "Carlotta is ill, they say. Some girl called Daae is singing instead."], ["A gentleman", "m", "pheve", "I hear the managers are leaving. Something about the ghost!"], ["A young lady", "f", "lady", "Look at the onyx! And the ceiling!"], ["An old general", "m", "pheve", "Sixty years of opera and I never saw a house like it."]], { wander: 5 });
if (st.gala || st.faust)
put("hall", [["A lady in the stalls", "f", "lady", "Hush, it's beginning!"], ["A gentleman in the stalls", "m", "pheve", "Bravo! Bravo!"], ["An usher", "m", "porter", "Your seat, monsieur? Row twelve."], ["A critic", "m", "gent", "I shall write that the new Margarita is a revelation."], ["A young subscriber", "m", "pheve", "Look at the chandelier. Seven tons of bronze and crystal, they say."]], { wander: 3 });
put("rotunda", [["A subscriber taking off his coat", "m", "pheve", "My carriage at midnight, Joseph."], ["A footman", "m", "porter", "This way, monsieur. Your box is on the grand tier."]], { wander: 2 });
put("dance", [["A ballet-girl", "f", "phballet", "The ghost! Don't say his name in here!", null, true], ["A ballet-girl at the barre", "f", "phballet", "One-two, one-two ... my feet are dead.", null, true], ["A ballet-master", "m", "gent", "Again! From the beginning! And smile, mesdemoiselles!"], ["A ballet-girl doing up her shoe", "f", "phballet", "Did you hear? Joseph Buquet!", null, true], ["An old subscriber", "m", "pheve", "Charming, charming. I come to the foyer every Saturday."]], { wander: 3 });
put("stagedoor", [["The concierge", "f", "phgiry", "Name, monsieur? Nobody goes up without leave."], ["A call-boy", "m", "boy", "Overture and beginners, please!", null, true], ["A scene-shifter", "m", "phshifter", "Mind the flats. They're heavy as sin."]], { wander: 1 });
put("cellar1", [["A scene-shifter at the drum", "m", "phshifter", "Third act change in two minutes. Heave!"], ["A gas-man with his lamp", "m", "phshifter", "Mauclair keeps the gas-room. Don't touch his taps."], ["A carpenter", "m", "phshifter", "We had a trap-door stick last night. Nobody near it, either."]], { wander: 3 });
put("stable", [["The stable-man", "m", "phshifter", "Cesar? Gone. Stolen out of his stall, the white horse of Le Prophete. Nobody saw a thing."]], { wander: 1 });
put("cafe", [["A waiter", "m", "porter", "A coffee, monsieur? Or an ice?"], ["A journalist", "m", "gent", "I'm writing up the ghost for tomorrow. One can't invent better."], ["A lady with an ice", "f", "lady", "Delicious. And one sees all Paris go by."], ["A retired captain", "m", "gent", "Ghost? Pah! A hoax by the ballet."]], { wander: 2 });
put("corridor", [["A box-keeper", "f", "phgiry", "Your box, madame? This way. Mind the step."], ["An usher", "m", "porter", "Not that box, monsieur. Box Five is ... reserved."]], { wander: 2 });
}
if (st.ball)
put("rotunda", [["A gentleman in a white domino", "m", "phdomino", "The door to the Rotunda? Just here."]], { wander: 1 });
put("persian", [["Darius, the Persian's servant", "m", "gent", "My master is at home."]], { wander: 0 });
},
function (x, z) {
var n = phwFbm(x * 0.006, z * 0.006, 4), h = 4 + n * 5;
h += phwSmooth(-60, -190, z) * 14 * (1 - Math.min(1, Math.abs(x - 60) / 600));
h += phwSmooth(0, 500, z) * 10;
var cz = PHW_PG.sea + 18 * Math.sin(x / 140) * 0.5;
if (z < cz + 30) {
var t = Math.min(1, (cz + 30 - z) / 40);
var bh = x > 200 && x < 420 ? 1.2 : -1.0;
h = h * (1 - t) + bh * t;
if (z < cz)
h = Math.min(h, -1.6 - (cz - z) * 0.06);
}
var sd = Math.abs(z + 40), sx = Math.max(0, Math.abs(x) - 240);
if (sd < 24 && sx < 20) {
var t = Math.max(Math.min(1, (sd - 14) / 10), sx / 20);
h = h * t + 5.2 * (1 - t);
}
return h;
},
function (G) {
var X = PHW_ROOMXZ.perros, R, st = PHW.st, lite = phwLite();
R = phwRoom(G, "sunbar", X.sunbar[0], X.sunbar[1], 11, 8, { wall: "render", floor: "cobble", name: "the inn of the Setting Sun", beams: true, lightI: 0.8 });
phwHearth(R.g, 0, -3.7, 0, { h: R.h, pot: 1, mat: "granite" });
for (var t = 0; t < 2; t++) {
phwTable(R.g, -2.6 + t * 5.2, 0.6, 1.8, 0.9, 0.76, {});
phwBench(R.g, -2.6 + t * 5.2, 1.5, Math.PI, { w: 1.8, d: 0.4, back: false });
phwBench(R.g, -2.6 + t * 5.2, -0.3, 0, { w: 1.8, d: 0.4, back: false });
}
phwShelves(R.g, -5.3, -1, 2.6, 2.2, Math.PI / 2, { jars: 1 });
phwBox(R.g, 1.6, 2.2, 0.6, phwMat("darkoak"), 4.6, 0, -3.4);
phwSign(R.g, "AU SOLEIL COUCHANT", 3.6, 0.4, 0, 2.8, -3.86, 0, { bg: "#2A1E14", ink: "#F0C870" });
R = phwRoom(G, "sunraoul", X.sunraoul[0], X.sunraoul[1], 7, 6, { wall: "plaster", floor: "planks", name: "Raoul's room at the inn", beams: true, lightI: 0.6 });
phwBed(R.g, -2, -1.2, Math.PI / 2, { cover: 0xE8E0D0 });
phwChair(R.g, 1.6, 0.4, Math.PI, {});
phwWindowIn(R.g, 0, 1.8, -2.88, 0, 1.2, 1.2, { sky: (st.night || PHW.night) ? 0x141C30 : 0xB8C8D8 });
phwTable(R.g, 2.4, -2.2, 0.9, 0.6, 0.76, {});
phwCandle(R.g, 2.4, 0.76, -2.2, {});
R = phwRoom(G, "sunchris", X.sunchris[0], X.sunchris[1], 7, 6, { wall: "bluepaper", floor: "planks", name: "Christine's room at the inn", beams: true, lightI: 0.6 });
phwBed(R.g, -2, -1.2, Math.PI / 2, { cover: 0xF4F0F0 });
phwChair(R.g, 1.6, 0.4, Math.PI, {});
phwWindowIn(R.g, 0, 1.8, -2.88, 0, 1.2, 1.2, { sky: (st.night || PHW.night) ? 0x141C30 : 0xB8C8D8 });
phwFlowers(R.g, 2.4, 0.76, -2.2, 0xE8D040);
phwTable(R.g, 2.4, -2.2, 0.9, 0.6, 0.76, {});
R = phwRoom(G, "church", X.church[0], X.church[1], 12, 20, { wall: "granite", floor: "cobble", h: 9, name: "the church of Perros", env: "indoor", lightI: 0.6, bare: 1 });
phwBox(R.g, 3, 1.1, 1.2, phwMat("granite"), 0, 0, -8.6);
phwBox(R.g, 3.2, 0.06, 1.3, phwLam(0xF4F0E8), 0, 1.1, -8.6);
for (var c = 0; c < 6; c++)
phwCandle(R.g, -1.2 + c * 0.48, 1.16, -8.8, { brass: 1 });
for (var p = 0; p < 6; p++) {
phwBench(R.g, -2.6, -4 + p * 2, Math.PI, { w: 3.6, d: 0.45 });
phwBench(R.g, 2.6, -4 + p * 2, Math.PI, { w: 3.6, d: 0.45 });
}
for (var sh = 0; sh < 3; sh++) {
var sg = new THREE.Group();
sg.position.set(-5.6, 3 + sh * 0.6, -4 + sh * 3);
R.g.add(sg);
phwBox(sg, 0.2, 0.4, 1.2, phwMat("hull"), 0, 0, 0);
phwCyl(sg, 0.02, 0.02, 0.9, phwMat("oak"), 0, 0.4, 0, 4);
}
phwWindowIn(R.g, 0, 4.4, -9.88, 0, 1.6, 3.2, { sky: 0x6A8AC8 });
[-5.88, 5.88].forEach(function (x) { for (var w = 0; w < 3; w++)
phwWindowIn(R.g, x, 3.4, -5 + w * 5, x < 0 ? Math.PI / 2 : -Math.PI / 2, 0.9, 2.2, { sky: 0x8AA0C8 }); });
R = phwRoom(G, "daae", X.daae[0], X.daae[1], 8, 7, { wall: "render", floor: "cobble", name: "the house where the Daaes stayed", beams: true, lightI: 0.6 });
phwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "granite" });
phwBox(R.g, 2.0, 1.8, 0.6, phwMat("darkoak"), -2.6, 0, -3.0);
phwBed(R.g, 2.6, -1, Math.PI / 2, { cover: 0xC8B898 });
phwTable(R.g, -0.6, 0.8, 1.4, 0.8, 0.74, {});
phwBox(R.g, 0.7, 0.12, 0.24, phwLam(0x6A3A1A), -0.6, 0.76, 0.8);
R = phwRoom(G, "barn", X.barn[0], X.barn[1], 10, 8, { wall: "granite", floor: "earth", name: "a barn", beams: true, light: false });
for (var hy = 0; hy < 6; hy++)
phwBox(R.g, 1.4, 0.7, 1.0, phwLam(0xC8B068), -3 + (hy % 3) * 1.5, Math.floor(hy / 3) * 0.7, -3);
R = phwRoom(G, "cott", X.cott[0], X.cott[1], 8, 7, { wall: "render", floor: "cobble", name: "a fisherman's cottage", beams: true, lightI: 0.6 });
phwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "granite", pot: 1 });
phwBox(R.g, 2.0, 1.8, 0.6, phwMat("darkoak"), -2.6, 0, -3.0);
phwTable(R.g, 1.6, 0.6, 1.4, 0.8, 0.74, {});
phwInDoor("sunbar", "sunraoul", -4.2, -3.0, "The stair up to Raoul's room", "go up");
phwInDoor("sunbar", "sunchris", 4.2, 2.6, "The stair up to Christine's room", "go up");
},
function (G) {
var lite = phwLite(), st = PHW.st, H = phwPgH, D;
phwFar(G, H, 0x6A7A4A, { edge: 640 });
phwTerrain(G, -640, -640, 1280, 1280, lite ? 18 : 10, H, phwMat("meadow"), function (x, z, y, c) {
var g = 0.84 + phwFbm(x * 0.03, z * 0.03, 2) * 0.2;
if (y < 1.6 && z < PHW_PG.sea + 40) {
if (x > 200 && x < 420)
c.setRGB(0.92, 0.82, 0.58);
else
c.setRGB(0.66, 0.56, 0.5);
return;
}
if (st.snow) {
var w = 0.88 + g * 0.1;
c.setRGB(w, w + 0.01, w + 0.04);
return;
}
if (z < -150 && z > -240) {
c.setRGB(0.52 * g, 0.5 * g, 0.34 * g);
return;
}
c.setRGB(0.5 * g, 0.68 * g, 0.36 * g);
});
phwWater(G, 0, -560, 1400, 620, -1.2, 0x2A5A6A, 0.92);
Object.keys(PHW_PG_ROADS).forEach(function (k) { phwStrip(G, PHW_PG_ROADS[k], k === "street" ? 10 : (k === "lannion" ? 7 : 4), H, phwMat(k === "street" ? "cobble" : "gravel"), 0.06); });
D = function (key, p, nm) { var Rm = phwRm(key); if (Rm)
phwDoor(Rm, nm || ("The door of " + Rm.name), p.x, p.z, p.ry); };
var gran = phwMat("pinkgranite");
[-220, -180, -140, -100, -60, -20, 20, 60, 100, 140, 180, 220].forEach(function (x, i) {
var nz = -40 - (i % 2 ? 16 : 15), sz = -40 + 15;
if (x === -60)
return;
phwTownHouse(G, x, nz, 12 + (i % 3) * 2, 9, 7 + (i % 2), { wall: "granite", roof: "slate", trim: "greystone", shut: [0x3A5A8A, 0x5A7A4A, 0x8A3A2A][i % 3] });
if (!(x > -10 && x < 30))
phwTownHouse(G, x + 8, sz, 11, 8, 6.4, { wall: "granite", roof: "slate", trim: "greystone", ry: Math.PI, shut: [0x2A4A7A, 0x6A6A3A][i % 2] });
});
phwTownHouse(G, -40, -54, 16, 10, 8.4, { wall: "render", roof: "slate", trim: "granite", dormer: true, shut: 0x3A5A8A });
D("sunbar", { x: -40, z: -47.6, ry: 0 }, "The door of the inn of the Setting Sun");
phwSign(G, "AU SOLEIL COUCHANT", 4.4, 0.8, -40, H(-40, -48) + 4.2, -48.6, 0, { bg: "#2A1E14", ink: "#F0B860" });
phwTownHouse(G, -120, -56, 10, 8, 6, { wall: "granite", roof: "slate" });
D("daae", { x: -120, z: -50.6, ry: 0 }, "The door of the house where the Daaes stayed");
phwTownHouse(G, -200, 30, 14, 10, 6, { wall: "granite", roof: "thatch", ry: Math.PI });
D("barn", { x: -200, z: 23.6, ry: Math.PI }, "The barn door");
phwTownHouse(G, 180, -90, 9, 7, 5.4, { wall: "granite", roof: "slate" });
D("cott", { x: 180, z: -85.2, ry: 0 }, "A fisherman's cottage");
var C = PHW_PG.church;
phwChurch(G, C[0], C[1], { wall: "granite", roof: "slate", len: 26, w: 12, h: 10, tower: 6, th: 22, ry: 0, spireM: phwMat("granite") });
D("church", { x: C[0], z: C[1] + 20.4, ry: 0 }, "The church door");
phwPaling(G, [[0, -90], [0, -160], [110, -160], [110, -90], [66, -90]], H, { wall: true });
var gy = function (x, z) { return H(x, z); };
for (var g = 0; g < (lite ? 14 : 30); g++) {
var gx = 10 + (g % 6) * 14, gz = -150 + Math.floor(g / 6) * 10;
if (Math.abs(gx - C[0]) < 9 && gz > -125)
continue;
var gg = new THREE.Group();
gg.position.set(gx, gy(gx, gz), gz);
G.add(gg);
phwBox(gg, 0.7, 1.0 + (g % 3) * 0.2, 0.14, phwMat("granite"), 0, 0, 0);
phwBox(gg, 1.0, 0.1, 1.8, phwMat("moss"), 0, 0, 0.9);
if (g % 4 === 0) {
phwBox(gg, 0.12, 1.4, 0.12, phwMat("granite"), 0, 0, -0.2);
phwBox(gg, 0.6, 0.12, 0.12, phwMat("granite"), 0, 1.0, -0.2);
}
}
var Gv = PHW_PG.grave, gv = new THREE.Group();
gv.position.set(Gv[0], H(Gv[0], Gv[1]), Gv[1]);
G.add(gv);
phwBox(gv, 1.0, 1.3, 0.18, phwMat("granite"), 0, 0, 0);
phwBox(gv, 1.2, 0.14, 2.0, phwMat("granite"), 0, 0, 1.0);
phwSign(gv, "DAAÉ", 0.7, 0.24, 0, 0.95, 0.1, 0, { bg: "#9A948C", ink: "#2A2420" });
phwFlowers(gv, 0, 0.14, 1.2, 0xE8E0F0);
var cv = new THREE.Group();
cv.position.set(20, H(20, -100), -100);
G.add(cv);
phwBox(cv, 2.4, 1.2, 2.4, phwMat("granite"), 0, 0, 0);
phwBox(cv, 0.3, 5, 0.3, phwMat("granite"), 0, 1.2, 0);
phwBox(cv, 2.2, 0.3, 0.3, phwMat("granite"), 0, 5.0, 0);
phwSolid(20, -100, 2.6, 2.6);
var bx = C[0] + 6.6, bz = C[1] - 9, hp = new THREE.Group();
hp.position.set(bx, H(bx, bz), bz);
hp.rotation.y = Math.PI / 2;
G.add(hp);
phwSkulls(hp, 0, 0, 0, lite ? 48 : 96, {});
phwBox(hp, 3.4, 2.8, 0.04, phwLam(0x5A5A5A, { op: 0.4 }), 0, 0, 0.35);
var sc = new THREE.Group();
sc.position.set(C[0] + 8.6, H(C[0] + 9, C[1] - 2), C[1] - 2);
G.add(sc);
phwBox(sc, 5, 4.2, 6, phwMat("granite"), 0, 0.6, 0);
phwBox(sc, 5.1, 0.6, 6.1, phwLam(0xD8CCB0), 0, 0, 0);
phwSkulls(sc, 0.2, 0.02, 3.06, 16, {});
phwBox(sc, 0.9, 1.9, 0.08, phwMat("darkoak"), 0.2, 0.6, 3.04);
var roof = new THREE.Mesh(phwGeo("sacr", function () { var s = new THREE.Shape(); s.moveTo(-3, 0); s.lineTo(0, 2); s.lineTo(3, 0); s.lineTo(-3, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 6.2, bevelEnabled: false }); e.translate(0, 0, -3.1); return e; }), phwMat("slate"));
roof.position.y = 4.8;
sc.add(roof);
phwSolid(C[0] + 8.6, C[1] - 2, 5, 6);
var heathOk = function (x, z) { return z < -150 && z > -240 && phwPathD(x, z, PHW_PG_ROADS.heath) > 4; };
phwPlant(G, "bush", phwScatter(61, lite ? 60 : 160, -300, -240, 400, -150, heathOk, H, 0.4, 0.8), { col: 0xC8A830 });
phwPlant(G, "grass", phwScatter(62, lite ? 80 : 220, -300, -240, 400, -150, heathOk, H, 0.6, 1.0), { col: 0x8A5A7A });
phwPlant(G, "rock", phwScatter(63, lite ? 16 : 40, -400, -280, 180, -200, function (x, z) { return true; }, H, 1.6, 4.2), { mat: gran, keepAll: true });
phwPlant(G, "rock", phwScatter(64, lite ? 8 : 20, 420, -290, 620, -200, function (x, z) { return true; }, H, 1.6, 3.6), { mat: gran, keepAll: true });
for (var b = 0; b < (lite ? 3 : 6); b++)
phwBoat(G, 240 + b * 30, H(240 + b * 30, -238) + 0.1, -238 + (b % 2) * 6, 0.2 + b * 0.5, { mast: b % 2 === 0 });
if (!lite)
for (var n = 0; n < 5; n++) {
phwBox(G, 0.08, 1.6, 0.08, phwMat("oak"), 260 + n * 6, H(260 + n * 6, -220), -220);
phwBox(G, 6, 1.2, 0.02, phwLam(0x6A5A3A, { op: 0.6 }), 263 + n * 6, H(260, -220) + 0.4, -220);
}
var fld = function (x, z) { return z > -60 && Object.keys(PHW_PG_ROADS).every(function (k) { return phwPathD(x, z, PHW_PG_ROADS[k]) > 9; }) && !(Math.abs(x) < 250 && z < 0); };
phwPlant(G, "tree", phwScatter(65, lite ? 60 : 180, -620, -60, 620, 620, fld, H, 0.8, 1.3), { col: 0x4A6A34 });
phwPlant(G, "conifer", phwScatter(66, lite ? 20 : 60, -620, -160, -260, 200, fld, H, 0.9, 1.4), { col: 0x2A4A2A });
phwPlant(G, "grass", phwScatter(67, lite ? 100 : 300, -620, -60, 620, 620, fld, H, 0.8, 1.2), { col: 0x9AB878 });
for (var wl = 0; wl < (lite ? 4 : 10); wl++) {
var wz = 60 + wl * 50;
phwPaling(G, [[-600, wz], [-30, wz]], H, { wall: true });
phwPaling(G, [[40, wz + 20], [600, wz + 20]], H, { wall: true });
}
phwPoles(G, PHW_PG_ROADS.lannion, H, 46);
for (var lp = 0; lp < (lite ? 3 : 6); lp++)
phwLamp(G, -200 + lp * 80, lp % 2 ? -30 : -50, H, { lit: !!(st.night || PHW.night) });
if ((st.night || PHW.night) && !lite) {
var mg = wGlow(0xC8D8FF, 0.25, 30);
mg.position.set(60, H(60, -110) + 30, -110);
G.add(mg);
}
},
function (G) {
var st = PHW.st;
if (!(st.night || PHW.night)) {
phwCrowd("pgs", [["A Breton woman in her white cap", "f", "phbretonf", "Kenavo! Old Daae? Oh, the fiddler. I remember him and his little girl, singing at the pardons.", PHP.breton], ["A fisherman mending nets", "m", "phbretonm", "The sea's quiet today. Quiet as it ever is here.", PHP.breton], ["An old woman knitting", "f", "phbretonf", "The korrigans dance on the heather by moonlight. My grandmother saw them.", PHP.breton],
["A boy with a basket of fish", "m", "phbretonm", "Mackerel! Fresh this morning!", PHP.breton, true], ["The rector", "m", "clergy", "Old Daae is buried by the church wall. His daughter comes every year, they say.", PHP.breton], ["A carter from Lannion", "m", "phbretonm", "The diligence from Lannion? Every morning. Bumpy road.", PHP.breton], ["A girl in a lace cap", "f", "phbretonf", "There's a pardon next Sunday at Ploumanac'h! Dancing and music!", PHP.breton, true]], -220, -56, 220, -24, { wander: 6 });
phwCrowd("pgb", [["A fisherman with his boat", "m", "phbretonm", "That's where the little Paris boy ran into the sea after the young lady's scarf. Long ago now.", PHP.breton], ["A woman gathering seaweed", "f", "phbretonf", "Good for the fields, the goémon.", PHP.breton]], 250, -240, 360, -220, { wander: 5 });
}
else
phwCrowd("pgn", [["An old man smoking at his door", "m", "phbretonm", "Out at this hour? There's no one in the churchyard at night but the dead, monsieur.", PHP.breton]], -80, -50, 40, -30, { wander: 2 });
},
function (G) {
phwPgRooms(G);
phwPerros(G);
phwPgFolk(G);
var st = PHW.st;
if (!(st.night || PHW.night))
[["sunbar", "The landlady of the Setting Sun", "f", "phbretonf", "A room? You're lucky, monsieur. The young lady from Paris took the other."], ["church", "The sacristan", "m", "phbretonm", "The bones? Our dead, monsieur. Where else should we keep them?"], ["cott", "A fisherman's wife", "f", "phbretonf", "Come in out of the wind. There's soup."]].forEach(function (F, i) { var R = phwRm(F[0]); if (R)
phwOne("pgr" + i, F[1], F[2], F[3], R.cx + 0.8, R.cz - 1.2, Math.PI, F[4], { y: R.y, persona: PHP.breton }); });
},
function (x, z) {
var n = phwFbm(x * 0.005, z * 0.005, 4), h = 2 + n * 3;
var cd = Math.hypot(x - PHW_BS.cascade[0], z - PHW_BS.cascade[1]);
if (cd < 60)
h += (1 - cd / 60) * 9 * (z < PHW_BS.cascade[1] ? 1 : 0.2);
var C = PHW_BS.cascade, cdx = Math.abs(x - C[0]), cdz = Math.abs(z - (C[1] - 7));
if (cdx < 16 && cdz < 9) {
var PL = phwBsPL(), ct = Math.min(1, Math.max(Math.max(0, cdx - 11) / 5, Math.max(0, cdz - 6) / 3));
h = h * ct + (PL - 0.6) * (1 - ct);
}
var ld = Math.hypot((x - PHW_BS.lake[0]) / 1.6, z - PHW_BS.lake[1]);
if (ld < 60) {
var t = Math.min(1, (1 - ld / 60) * 1.6);
h = h * (1 - t) - 3.4 * t;
var id = Math.hypot(x - PHW_BS.lake[0], z - PHW_BS.lake[1]);
if (id < 16)
h = Math.max(h, 0.8 * (1 - id / 16) + (-3.4) * (id / 16) * 0.4);
}
if (x > PHW_BS.seine - 60) {
var s = Math.min(1, (x - PHW_BS.seine + 60) / 50);
h = h * (1 - s) - 2.4 * s;
}
if (x > 140 && x < 470)
h = h * 0.3 + 1.0;
return h;
},
function (G) {
var X = PHW_ROOMXZ.bois, R;
R = phwRoom(G, "cascade", X.cascade[0], X.cascade[1], 12, 9, { wall: "greenpaper", floor: "checker", h: 4.4, name: "the restaurant of the Cascade", env: "opera", lightI: 0.9 });
for (var t = 0; t < 6; t++) {
var tx = -4 + (t % 3) * 4, tz = -1.6 + Math.floor(t / 3) * 3;
phwTable(R.g, tx, tz, 1.0, 1.0, 0.74, { cloth: 0xF4F0E8 });
phwChair(R.g, tx - 0.7, tz, Math.PI / 2, {});
phwChair(R.g, tx + 0.7, tz, -Math.PI / 2, {});
phwFlowers(R.g, tx, 0.74, tz, 0xE8C040);
}
phwBox(R.g, 3.6, 1.1, 0.8, phwMat("darkoak"), 3.4, 0, -3.6);
for (var m = 0; m < 3; m++)
phwMirror(R.g, -4 + m * 4, 1.3, -4.38, 0, 2.6, 2.2);
phwChandelier(R.g, 0, 4.2, 0, 0.3, {});
R = phwRoom(G, "stand", X.stand[0], X.stand[1], 14, 8, { wall: "oak", floor: "planks", h: 4, name: "the stewards' room under the grand stand", env: "indoor", lightI: 0.6 });
phwTable(R.g, 0, -1.6, 3, 1.2, 0.78, { mat: "darkoak" });
for (var c = 0; c < 4; c++)
phwChair(R.g, -1.2 + c * 0.8, -0.8, Math.PI, {});
phwPicture(R.g, -3, 2.2, -3.88, 0, 1.6, 1.0, function (cx, W, H) { cx.fillStyle = "#6A8A4A"; cx.fillRect(0, 0, W, H); cx.fillStyle = "#3A2A1A"; cx.beginPath(); cx.ellipse(W * 0.5, H * 0.55, W * 0.25, H * 0.15, 0, 0, 7); cx.fill(); });
phwPicture(R.g, 3, 2.2, -3.88, 0, 1.6, 1.0);
phwShelves(R.g, 6.8, 0, 2.4, 2.0, -Math.PI / 2, {});
},
function (G) {
var lite = phwLite(), st = PHW.st, H = phwBsH, D;
phwFar(G, H, 0x3A5A2A, { edge: 640 });
phwTerrain(G, -640, -640, 1280, 1280, lite ? 18 : 10, H, phwMat("meadow"), function (x, z, y, c) {
var g = 0.84 + phwFbm(x * 0.03, z * 0.03, 2) * 0.2;
if (x > 140 && x < 470) {
c.setRGB(0.44 * g, 0.66 * g, 0.32 * g);
return;
}
if (y < -0.8) {
c.setRGB(0.5, 0.46, 0.38);
return;
}
c.setRGB(0.36 * g, 0.5 * g, 0.26 * g);
});
phwWater(G, PHW_BS.seine + 120, 0, 240, 1300, -1.6, 0x2A4A50, 0.92);
phwWater(G, PHW_BS.lake[0], PHW_BS.lake[1], 196, 124, -0.7, 0x4A7088, 0.88);
Object.keys(PHW_BS_ROADS).forEach(function (k) { phwStrip(G, PHW_BS_ROADS[k], k === "drive" ? 12 : 6, H, phwS("sand", 0xE8E2D2, 4), 0.06); });
D = function (key, p, nm) { var Rm = phwRm(key); if (Rm)
phwDoor(Rm, nm || ("The door of " + Rm.name), p.x, p.z, p.ry); };
for (var s = 0; s < 3; s++) {
var sz = -160 + s * 110, g = new THREE.Group();
g.position.set(PHW_BS.stand[0], H(PHW_BS.stand[0], sz), sz);
G.add(g);
phwBox(g, 22, 3, 80, phwS("b:ashlar", 0xE8E0CC, 2), 0, 0, 0);
for (var t = 0; t < 8; t++)
phwBox(g, 2, 0.5, 80, phwMat("planks"), 2 + t * 1.6, 3 + t * 0.6, 0);
var rf = phwBox(g, 24, 0.3, 84, phwMat("zinc"), 6, 12, 0);
rf.rotation.z = -0.12;
for (var c = 0; c < 8; c++) {
phwCyl(g, 0.15, 0.15, 9, phwMat("iron"), 14, 3, -36 + c * 10.3, 8);
}
for (var w = 0; w < 10; w++)
phwBox(g, 0.1, 1.6, 1.2, phwMat("pane"), -11.05, 0.8, -36 + w * 8);
phwSolid(PHW_BS.stand[0] + 2, sz, 26, 82, H(PHW_BS.stand[0], sz) - 1, H(PHW_BS.stand[0], sz) + 12);
}
D("stand", { x: PHW_BS.stand[0] - 12.6, z: -50, ry: -Math.PI / 2 }, "The stewards' door under the grand stand");
var rails = [];
for (var a = 0; a < 64; a++) {
var t2 = a / 64 * Math.PI * 2;
rails.push([PHW_BS.course[0] + Math.cos(t2) * 140, PHW_BS.course[1] + Math.sin(t2) * 380]);
}
rails.push(rails[0]);
phwPaling(G, rails, H, { col: 0xF4F2EC });
phwPaling(G, rails.map(function (p) { return [PHW_BS.course[0] + (p[0] - PHW_BS.course[0]) * 0.8, PHW_BS.course[1] + (p[1] - PHW_BS.course[1]) * 0.9]; }), H, { col: 0xF4F2EC });
var wp = new THREE.Group();
wp.position.set(165, H(165, -40), -40);
G.add(wp);
phwCyl(wp, 0.12, 0.12, 4, phwLam(0xF4F2EC), 0, 0, 0, 8);
phwCyl(wp, 0.5, 0.5, 0.1, phwLam(0xC83A2A), 0, 4, 0, 16);
var C = PHW_BS.cascade;
phwScatter(71, lite ? 20 : 50, C[0] - 40, C[1] - 50, C[0] + 40, C[1] - 6, function () { return true; }, H, 0.8, 2.0).forEach(function (q, i) { var b = phwEll(G, phwMat("rock"), 1.1 * q.s, 0.6 * q.s, 0.9 * q.s, q.x, q.y + 0.1 * q.s, q.z, 9); b.rotation.y = q.ry || i; b.rotation.z = ((i * 37) % 10 - 5) * 0.03; });
(function () {
var fx = C[0], fz = C[1] - 14, py = phwBsPL();
var rk = phwMat("rock"), lite2 = phwLite();
phwBox(G, 26, 14, 5, rk, fx, py - 4, fz - 2.4, 0, true);
for (var r = 0; r < (lite2 ? 8 : 18); r++) {
var a = r / 18, rx = fx - 13 + a * 26, ry2 = py + ((r * 7) % 9) + 0.6;
if (Math.abs(rx - fx) < 4.4)
continue;
phwEll(G, rk, 1.6 + (r % 3) * 0.5, 1.2 + (r % 2) * 0.6, 1.2, rx, ry2, fz + 0.2 + ((r * 5) % 3) * 0.2, 9);
}
for (var t2 = 0; t2 < (lite2 ? 7 : 14); t2++) {
var tx = fx - 13 + t2 * 2, tz = fz - 2.4 + ((t2 * 3) % 5 - 2) * 0.6;
phwEll(G, rk, 2.0 + (t2 % 3) * 0.4, 1.4 + (t2 % 2) * 0.5, 2.2, tx, py + 10 + ((t2 * 5) % 3) * 0.4, tz, 9);
}
[-1, 1].forEach(function (sd) { for (var e2 = 0; e2 < (lite2 ? 3 : 6); e2++)
phwEll(G, rk, 2.4, 1.8 + (e2 % 2) * 0.4, 2.6, fx + sd * (13.4 + (e2 % 2) * 0.8), py + e2 * 1.7, fz - 1.6 + (e2 % 3) * 0.8, 9); });
phwPlant(G, "bush", [-9, -6, 6, 9, -11, 11].map(function (bx, bi) { return { x: fx + bx, z: fz - 1.4, y: py + 10.6, s: 0.7 + bi % 2 * 0.3, ry: bi }; }), { col: 0x3A5A2A, keepAll: true });
var ftx = phwCanvas("fallstreaks", 128, 256, function (c, W, Hh) { var q = wRand(5); c.fillStyle = "#B8C8D0"; c.fillRect(0, 0, W, Hh); for (var i = 0; i < 90; i++) {
var x = q() * W, w = 1 + q() * 4;
c.fillStyle = ["#FFFFFF", "#E8F0F4", "#C8D8E0", "#9AB0BC"][i % 4];
c.globalAlpha = 0.5 + q() * 0.5;
c.fillRect(x, 0, w, Hh);
} c.globalAlpha = 1; var g = c.createLinearGradient(0, Hh * 0.8, 0, Hh); g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(255,255,255,0.9)"); c.fillStyle = g; c.fillRect(0, 0, W, Hh); });
var fm = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: ftx, transparent: true, opacity: 0.88, side: THREE.DoubleSide });
fm.userData.noPhoto = 1;
PHW.ticks && PHW.ticks.push(function () { if (ftx)
ftx.offset.y = (performance.now() / 900) % 1; });
var fall = new THREE.Mesh(new THREE.PlaneGeometry(7, 8.6, 1, 6), fm);
fall.position.set(fx, py + 4.3, fz + 0.5);
G.add(fall);
var sp = new THREE.Mesh(new THREE.PlaneGeometry(9, 1.6), new THREE.MeshLambertMaterial({ color: 0xF4F8FA, transparent: true, opacity: 0.5, depthWrite: false }));
sp.position.set(fx, py + 0.7, fz + 1.6);
G.add(sp);
phwWater(G, fx, fz + 7, 22, 12, py, 0x4A7088, 0.88);
for (var e = 0; e < (lite2 ? 6 : 14); e++) {
var ea = e / 14 * Math.PI, ex = fx + Math.cos(ea) * 11.5, ez = fz + 7 + Math.sin(ea) * 6.4;
phwEll(G, rk, 1.0, 0.6, 0.8, ex, H(ex, ez) + 0.1, ez, 9);
}
})();
phwPlant(G, "bush", phwScatter(77, lite ? 20 : 70, C[0] - 44, C[1] - 54, C[0] + 44, C[1] - 4, function () { return true; }, H, 0.7, 1.2), { col: 0x3A6A2A });
phwPlant(G, "bush", phwScatter(78, lite ? 10 : 40, C[0] - 50, C[1] - 60, C[0] + 50, C[1] - 8, function () { return true; }, H, 0.6, 1.0), { col: 0x3A5A2A });
var fall = new THREE.Mesh(new THREE.PlaneGeometry(10, 9), phwWaterM(0xC8E0E8, 0.7));
fall.position.set(C[0], H(C[0], C[1] - 8) - 1, C[1] - 6);
G.add(fall);
PHW.water.push(fall);
fall.userData.fz = -3;
phwWater(G, C[0], C[1] + 6, 26, 14, H(C[0], C[1] + 8) - 0.6, 0x3A5A5A, 0.9);
phwSolid(C[0], C[1] + 6, 24, 12);
phwTownHouse(G, C[0] + 40, C[1] + 10, 16, 10, 6.4, { wall: "render", roof: "slate", trim: "oak", ry: -Math.PI / 2, dormer: true });
D("cascade", { x: C[0] + 34.6, z: C[1] + 10, ry: -Math.PI / 2 }, "The door of the restaurant of the Cascade");
phwSign(G, "RESTAURANT DE LA CASCADE", 5, 0.6, C[0] + 34.8, H(C[0] + 35, C[1] + 10) + 3.8, C[1] + 10, -Math.PI / 2, { bg: "#1E2A22", ink: "#F0D890" });
phwBoat(G, PHW_BS.lake[0] + 60, -0.6, PHW_BS.lake[1] + 30, 1.2, {});
var isl = function (x, z) { return Math.hypot(x - PHW_BS.lake[0], z - PHW_BS.lake[1]) < 14; };
phwPlant(G, "tree", phwScatter(72, 6, PHW_BS.lake[0] - 12, PHW_BS.lake[1] - 12, PHW_BS.lake[0] + 12, PHW_BS.lake[1] + 12, isl, function (x, z) { return Math.max(H(x, z), -0.4); }, 0.9, 1.2), { col: 0x3A5A2A });
var wood = function (x, z) { return x < 40 && Object.keys(PHW_BS_ROADS).every(function (k) { return phwPathD(x, z, PHW_BS_ROADS[k]) > 8; }) && Math.hypot(x - C[0], z - C[1]) > 48 && Math.hypot((x - PHW_BS.lake[0]) / 1.6, z - PHW_BS.lake[1]) > 62; };
phwPlant(G, "tree", phwScatter(73, lite ? 140 : 420, -620, -620, 40, 620, wood, H, 0.9, 1.6), { col: 0x2E4A24 });
var grove = function (x, z) { return wood(x, z) && phwFbm(x * 0.008 + 3.1, z * 0.008 - 1.7, 3) > 0.5; };
phwPlant(G, "tree", phwScatter(79, lite ? 260 : 900, -620, -620, 40, 620, grove, H, 0.8, 1.5), { col: 0x34522A, keepAll: true });
phwPlant(G, "bush", phwScatter(80, lite ? 120 : 420, -620, -620, 40, 620, grove, H, 0.6, 1.1), { col: 0x2E4A24, keepAll: true });
phwPlant(G, "bush", phwScatter(83, lite ? 0 : 300, -620, -620, 40, 620, grove, H, 0.35, 0.6), { col: 0x4A6A2E });
phwPlant(G, "bush", phwScatter(75, lite ? 80 : 240, -620, -620, 40, 620, wood, H, 0.5, 0.9), { col: 0x3A5A2A });
phwPlant(G, "tree", phwScatter(76, lite ? 20 : 50, 470, -620, 500, 620, function () { return true; }, H, 0.9, 1.3), { col: 0x4A6A34 });
for (var lz = -560; lz <= 560; lz += (lite ? 140 : 80))
phwLamp(G, 46, lz, H, { lit: !!(st.night || PHW.night) || !!st.moon });
phwCab(G, 46, 74, 0, H, { plain: lite });
if (st.brougham) {
var bg = phwCab(G, 60, 300, Math.PI, H, { plain: lite }), bz = 300;
PHW.ticks.push(function (dt) { if (!bg.parent)
return; var sp = bz > 40 ? 3 : 22; bz -= sp * Math.min(dt, 0.1); if (bz < -560)
bz = 300; bg.position.z = bz; bg.position.y = H(60, bz); });
}
phwBox(G, 40, 30, 1200, phwLam(0x3A4A3A), 700, -14, 0);
},
function (G) {
var st = PHW.st;
if (!(st.night || PHW.night) && !st.moon) {
phwCrowd("bsd", [["A lady riding", "f", "lady", "A lovely morning for a ride in the Bois."], ["A gentleman in a phaeton", "m", "pheve", "Longchamp on Sunday? The Grand Prix, my dear fellow, the Grand Prix!"], ["A nursemaid with a pram", "f", "maid", "Shh. Baby's asleep."], ["A park-keeper", "m", "police", "No riding on the footpaths, if you please."], ["A boy with a kite", "m", "boy", "Higher! Higher!", null, true], ["A couple strolling", "f", "lady", "They say the restaurant at the Cascade has the best fried fish."]], -120, -300, 120, 300, { wander: 9 });
}
else
phwCrowd("bsn", [["Raoul's cabman, on his box", "m", "cabby", "Cold work, waiting in the Bois at night. Still, monsieur pays well."]], 40, 64, 50, 70, { wander: 0 });
},
function (G) {
phwBsRooms(G);
phwBois(G);
phwBsFolk(G);
var R = phwRm("cascade");
if (R)
phwOne("bsr0", "A waiter at the Cascade", "m", "porter", R.cx + 1, R.cz - 1, Math.PI, "A table by the window, monsieur? You can hear the falls.", { y: R.y });
R = phwRm("stand");
if (R)
phwOne("bsr1", "A steward of the Jockey Club", "m", "gent", R.cx - 1, R.cz - 1.6, Math.PI, "The course is closed tonight, monsieur. Not a race till Sunday.", { y: R.y });
},
function (P, x, z, hfn, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
g.rotation.y = o.ry || 0;
P.add(g);
var gr = phwLam(0x2A4A3A);
phwCyl(g, 1.25, 1.3, 0.3, phwMat("greystone"), 0, 0, 0, 8);
phwCyl(g, 1.15, 1.15, 2.3, gr, 0, 0.3, 0, 8);
var pt = phwCanvas("kiosk", 256, 64, function (c, W, H) { var C = ["#C83A2A", "#E8C040", "#2A4A8A", "#F0E8D0", "#3A7A4A", "#E87A3A"]; for (var i = 0; i < 8; i++) {
c.fillStyle = C[i % 6];
c.fillRect(i * W / 8, 0, W / 8 - 2, H);
c.fillStyle = "rgba(20,20,20,.7)";
c.font = "bold 11px serif";
c.fillText(["LE FIGARO", "L'EPOQUE", "LE TEMPS", "GIL BLAS", "LE GAULOIS", "LA LANTERNE", "LE MATIN", "LE SIECLE"][i], i * W / 8 + 3, H * 0.45);
} });
var band = new THREE.Mesh(phwGeo("kband", function () { return new THREE.CylinderGeometry(1.17, 1.17, 0.9, 8, 1, true); }), phwM("kbandM", function () { return new THREE.MeshLambertMaterial({ map: pt }); }));
band.position.y = 2.0;
g.add(band);
phwCyl(g, 1.55, 1.55, 0.12, gr, 0, 2.6, 0, 8);
var dome = new THREE.Mesh(phwGeo("kdome", function () { return new THREE.ConeGeometry(1.5, 1.1, 8); }), gr);
dome.position.y = 3.27;
g.add(dome);
phwCyl(g, 0.05, 0.05, 0.5, phwMat("gilt"), 0, 3.8, 0, 6);
phwBox(g, 1.0, 0.06, 0.5, phwLam(0xE8E0C8), 0, 1.1, 1.2);
phwSolid(x, z, 2.6, 2.6);
return g;
},
function (P, x, z, hfn) {
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var gr = phwLam(0x1E3A2E);
phwCyl(g, 0.7, 0.8, 0.5, gr, 0, 0, 0, 8);
phwCyl(g, 0.45, 0.55, 0.3, gr, 0, 0.5, 0, 8);
for (var i = 0; i < 4; i++) {
var a = i / 4 * Math.PI * 2 + 0.78;
phwCyl(g, 0.07, 0.09, 1.3, gr, Math.cos(a) * 0.32, 0.8, Math.sin(a) * 0.32, 6);
phwEll(g, gr, 0.08, 0.1, 0.08, Math.cos(a) * 0.32, 2.18, Math.sin(a) * 0.32, 6);
}
var dm = new THREE.Mesh(phwGeo("wdome", function () { return new THREE.SphereGeometry(0.5, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2); }), gr);
dm.position.y = 2.25;
g.add(dm);
phwCyl(g, 0.04, 0.04, 0.3, gr, 0, 2.7, 0, 6);
phwSolid(x, z, 1.6, 1.6);
return g;
},
function (P, x, z, hfn, o) {
o = o || {};
var g = new THREE.Group(), y = hfn(x, z);
g.position.set(x, y, z);
P.add(g);
var ir = phwLam(0x1E2A22), lit = o.lit !== false;
phwCyl(g, 0.32, 0.4, 1.0, ir, 0, 0, 0, 10);
phwCyl(g, 0.12, 0.16, 4.2, ir, 0, 1.0, 0, 10);
for (var i = 0; i < 5; i++) {
var a = i / 5 * Math.PI * 2, r = i === 4 ? 0 : 0.7, lx = i === 4 ? 0 : Math.cos(a) * r, lz = i === 4 ? 0 : Math.sin(a) * r;
if (i < 4)
phwBox(g, 0.05, 0.05, 0.72, ir, lx / 2, 4.8, lz / 2).rotation.y = -a + Math.PI / 2;
phwEll(g, phwGlowM(lit ? 0xFFF0C8 : 0xD8D4C8, lit ? 0.92 : 0.6), 0.2, 0.26, 0.2, lx, i === 4 ? 5.6 : 5.1, lz, 8);
}
if (lit && !phwLite()) {
var gl = wGlow(0xFFE8B0, 0.18, 5);
gl.position.set(0, 5.3, 0);
g.add(gl);
}
return g;
},
function (P, x, y, z, w, d, ry, cols) {
var t = phwCanvas("awn" + cols.join(""), 128, 64, function (c, W, H) { for (var i = 0; i < 16; i++) {
c.fillStyle = cols[i % cols.length];
c.fillRect(i * W / 16, 0, W / 16, H);
} c.fillStyle = "rgba(0,0,0,.12)"; c.fillRect(0, H * 0.85, W, H * 0.15); });
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), phwM("awnM" + cols.join(""), function () { return new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }); }));
m.position.set(x, y, z);
m.rotation.set(-Math.PI / 2 + 0.32, 0, 0);
var gp = new THREE.Group();
gp.position.set(0, 0, 0);
gp.rotation.y = ry || 0;
var h = new THREE.Group();
h.position.set(x, y, z);
h.rotation.y = ry || 0;
P.add(h);
m.position.set(0, 0, 0);
h.add(m);
return h;
},
function (P, x0, z0, x1, z1, ry, hfn, o) {
o = o || {};
var lite = phwLite(), sp = lite ? 3.4 : 2.4, n = 0;
for (var x = x0; x <= x1; x += sp)
for (var z = z0; z <= z1; z += sp) {
if (lite && n > 14)
break;
n++;
var y = hfn(x, z), g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
phwCyl(g, 0.05, 0.12, 0.72, phwLam(0x1A1A1A), 0, 0, 0, 8);
phwCyl(g, 0.36, 0.36, 0.04, phwMat("marble"), 0, 0.72, 0, 14);
var R = wRand(Math.round(x * 7 + z * 3));
if (R() < 0.6)
phwCyl(g, 0.04, 0.035, 0.1, phwMat("glass"), 0.1, 0.76, 0.05, 8);
if (R() < 0.4)
phwCyl(g, 0.05, 0.04, 0.07, phwLam(0xF4F0E8), -0.12, 0.76, -0.05, 8);
phwChair(g, 0, 0.62, Math.PI, { mat: "darkoak" });
phwChair(g, 0, -0.62, 0, { mat: "darkoak" });
}
return n;
},
function (P, x, z, ry, hfn, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
g.rotation.y = ry || 0;
P.add(g);
var wd = phwMat("oak"), R = wRand(Math.round(x * 11 + z * 5));
phwBox(g, 2.6, 0.8, 1.1, wd, 0, 0, 0);
phwBox(g, 2.7, 0.05, 1.2, phwMat("planks"), 0, 0.8, 0);
[[-1.3, -0.6], [1.3, -0.6], [-1.3, 0.6], [1.3, 0.6]].forEach(function (p) { phwCyl(g, 0.04, 0.04, 2.3, wd, p[0], 0, p[1], 6); });
var aw = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.6), phwM("stallM" + (o.cols || ["#C83A2A", "#F0E8D8"]).join(""), function () { var t = phwCanvas("stall" + (o.cols || ["#C83A2A", "#F0E8D8"]).join(""), 64, 32, function (c, W, H) { var cs = o.cols || ["#C83A2A", "#F0E8D8"]; for (var i = 0; i < 8; i++) {
c.fillStyle = cs[i % cs.length];
c.fillRect(i * W / 8, 0, W / 8, H);
} }); return new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }); }));
aw.rotation.x = -Math.PI / 2 + 0.18;
aw.position.set(0, 2.35, 0);
g.add(aw);
var kind = o.goods || "veg", cols = { veg: [0x6A9A3A, 0xC85A2A, 0xE8C040, 0x8A3A5A, 0xD8B070], fish: [0x9AA8B0, 0xB8C0C8, 0x7A8A98, 0xC8A080], flowers: [0xE84A6A, 0xF0E040, 0xF4F0F4, 0xA05AC8, 0xE87A3A], bread: [0xC89050, 0xB07A40, 0xD8A868], cloth: [0x8A2A2A, 0x2A4A8A, 0xE8E0C8, 0x3A6A3A] }[kind] || [0x8A8A8A];
for (var i = 0; i < (phwLite() ? 6 : 14); i++) {
var c = cols[i % cols.length], px = -1.1 + (i % 7) * 0.36, pz = -0.3 + Math.floor(i / 7) * 0.5;
if (kind === "cloth")
phwBox(g, 0.32, 0.08 + R() * 0.08, 0.4, phwLam(c), px, 0.85, pz);
else if (kind === "fish") {
var f = phwEll(g, phwShine(c, 0.5, 0.6), 0.16, 0.04, 0.05, px, 0.9, pz, 8);
f.rotation.y = R() * 3;
}
else if (kind === "flowers") {
phwCyl(g, 0.12, 0.1, 0.22, phwLam(0x6A4A2A), px, 0.85, pz, 8);
phwEll(g, phwLam(c), 0.16, 0.14, 0.16, px, 1.18, pz, 8);
}
else if (kind === "bread") {
var b = phwEll(g, phwLam(c), 0.22, 0.07, 0.08, px, 0.9, pz, 8);
b.rotation.y = R() * 3;
}
else {
phwBox(g, 0.32, 0.12, 0.42, phwLam(0x8A6A3A), px, 0.85, pz);
phwEll(g, phwLam(c), 0.14, 0.08, 0.18, px, 1.0, pz, 8);
}
}
phwSolid(x, z, 2.8, 1.4, undefined, undefined, ry);
return g;
},
function (P, x, z, hfn, col) {
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var st = phwMat("ashlar");
phwBox(g, 0.8, 0.8, 0.8, st, 0, 0, 0);
var u = new THREE.Mesh(phwGeo("urn", function () { var p = []; for (var k = 0; k <= 10; k++) {
var t = k / 10;
p.push(new THREE.Vector2(0.18 + Math.sin(t * Math.PI) * 0.3 + t * 0.12, t * 0.8));
} return new THREE.LatheGeometry(p, 14); }), st);
u.position.y = 0.8;
g.add(u);
phwEll(g, phwLam(0x3A5A2A), 0.48, 0.25, 0.48, 0, 1.62, 0, 10);
for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.28;
phwEll(g, phwLam(col || 0xE84A5A), 0.1, 0.08, 0.1, Math.cos(a) * 0.3, 1.78, Math.sin(a) * 0.3, 6);
}
phwSolid(x, z, 0.9, 0.9);
return g;
},
function (P, x, z, w, d, hfn, col, o) {
o = o || {};
var y = hfn(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var bx = phwLam(0x2E4A24);
phwBox(g, w, 0.4, 0.35, bx, 0, 0, -d / 2);
phwBox(g, w, 0.4, 0.35, bx, 0, 0, d / 2);
phwBox(g, 0.35, 0.4, d, bx, -w / 2, 0, 0);
phwBox(g, 0.35, 0.4, d, bx, w / 2, 0, 0);
phwBox(g, w - 0.4, 0.12, d - 0.4, phwLam(0x4A3A28), 0, 0, 0);
var n = phwLite() ? 10 : Math.min(40, Math.round(w * d / 1.4)), R = wRand(Math.round(x * 3 + z * 17)), cs = [].concat(col || [0xE84A5A, 0xF0D040, 0xF4F0F0]);
var pts = [];
for (var i = 0; i < n; i++)
pts.push({ x: (R() - 0.5) * (w - 0.8), y: 0.12, z: (R() - 0.5) * (d - 0.8), s: 0.5 + R() * 0.3, c: cs[i % cs.length] });
cs.forEach(function (c) { phwInst(g, phwGeo("bloom", function () { return new THREE.IcosahedronGeometry(0.28, 0); }), phwLam(c), pts.filter(function (p) { return p.c === c; }), {}); });
if (o.centre)
phwUrn(P, x, z, hfn, cs[0]);
return g;
},
function (P, x, z, hfn, s) {
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
g.scale.setScalar(s || 1);
P.add(g);
var m = phwLam(0xC8A858);
phwCyl(g, 1.7, 1.9, 2.0, m, 0, 0, 0, 12);
var c = new THREE.Mesh(phwGeo("haycone", function () { return new THREE.ConeGeometry(1.8, 1.8, 12); }), m);
c.position.y = 2.9;
g.add(c);
phwSolid(x, z, 3.6 * (s || 1), 3.6 * (s || 1));
return g;
},
function (P, x, z, hfn, n) {
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var wk = phwLam(0x7A5A34), R = wRand(Math.round(x + z * 3));
for (var i = 0; i < (n || 6); i++) {
var p = new THREE.Mesh(phwGeo("lpot", function () { return new THREE.CylinderGeometry(0.28, 0.34, 0.5, 8, 1, true); }), wk);
p.position.set((i % 3) * 0.7, 0.25 + Math.floor(i / 3) * 0.5, (R() - 0.5) * 0.3);
p.rotation.z = Math.PI / 2;
g.add(p);
}
return g;
},
function (P, x, z, ry, hfn, w) {
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
g.rotation.y = ry || 0;
P.add(g);
var wd = phwMat("oak");
w = w || 6;
phwCyl(g, 0.05, 0.05, 2.0, wd, -w / 2, 0, 0, 6);
phwCyl(g, 0.05, 0.05, 2.0, wd, w / 2, 0, 0, 6);
phwBox(g, w, 0.01, 0.01, phwLam(0xE8E0D0), 0, 1.9, 0);
var C = [0xF4F0E8, 0xE8D8C0, 0x8AA0C8, 0xC85A4A, 0xF0F0F0];
for (var i = 0; i < 6; i++)
phwBox(g, 0.5 + (i % 2) * 0.2, 0.6 + (i % 3) * 0.15, 0.01, phwLam(C[i % 5], { ds: 1 }), -w / 2 + 0.6 + i * (w - 1.2) / 5, 1.25 - (i % 3) * 0.15, 0);
return g;
},
function (P, x, z, hfn) {
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var gr = phwMat("granite");
phwCyl(g, 0.9, 0.95, 0.9, gr, 0, 0, 0, 14);
phwCyl(g, 0.7, 0.7, 0.05, phwLam(0x0A1418), 0, 0.86, 0, 14);
[-1, 1].forEach(function (k) { phwBox(g, 0.14, 2.2, 0.14, phwMat("oak"), k * 0.85, 0.9, 0); });
phwBox(g, 2.0, 0.1, 0.1, phwMat("oak"), 0, 2.9, 0);
var rf = new THREE.Mesh(phwGeo("wellrf", function () { var s = new THREE.Shape(); s.moveTo(-1.2, 0); s.lineTo(0, 0.7); s.lineTo(1.2, 0); s.lineTo(-1.2, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 1.4, bevelEnabled: false }); e.translate(0, 0, -0.7); return e; }), phwMat("slate"));
rf.position.y = 3.0;
g.add(rf);
phwCyl(g, 0.16, 0.18, 0.28, phwMat("oak"), 0.2, 2.2, 0, 8);
phwSolid(x, z, 2, 2);
return g;
},
function (G) {
var lite = phwLite(), st = PHW.st, H = phwOpH, night = !st.day;
[[-52, 52], [52, 52], [0, 58]].forEach(function (p) { phwRefuge(G, p[0], p[1], 7, 3, H, { lit: true }); });
[-330, -250, -60, 60, 250, 330].forEach(function (x, i) { if (lite && i % 2)
return; phwKiosk(G, x, i % 2 ? 94 : 66, H); });
[[-46, 66], [46, 66], [-200, 94], [200, 94]].forEach(function (p, i) { if (lite && i > 1)
return; phwWallace(G, p[0], p[1], H); });
phwTerrace(G, -100, 4, -93, 54, 0, H);
phwAwning(G, -98, 3.4, 29, 4.4, 52, Math.PI / 2, ["#7A1A1A", "#E8D8B8"]);
phwSign(G, "CAFÉ DE LA PAIX", 6, 0.7, -103.6, H(-100, 20) + 3.9, 20, Math.PI / 2, { bg: "#1E1A14", ink: "#E8C878" });
phwTerrace(G, -142, 103, -100, 106, 0, H);
phwAwning(G, -121, 3.2, 104, 44, 3.6, 0, ["#2A4A2A", "#E8E0C8"]);
if (!lite) {
phwTerrace(G, -20, 150, -18, 190, 0, H);
phwAwning(G, -19.5, 3.2, 170, 3.2, 44, Math.PI / 2, ["#1A2A5A", "#E8E0D0"]);
}
phwStall(G, -36, 18, 0, H, { goods: "flowers", cols: ["#2A5A3A", "#F0E8D8"] });
phwStall(G, 36, 18, 0, H, { goods: "flowers", cols: ["#7A2A4A", "#F0E8D8"] });
if (!lite) {
phwStall(G, -70, 72, Math.PI, H, { goods: "bread", cols: ["#C8A040", "#F0E8D8"] });
phwStall(G, 140, 72, Math.PI, H, { goods: "veg" });
phwStall(G, -150, 92, 0, H, { goods: "cloth", cols: ["#3A3A6A", "#E8E0D0"] });
}
[-56, -44, 44, 56].forEach(function (x) { phwUrn(G, x, 14, H, 0xE84A5A); });
if (!lite) {
phwCart(G, -74, -150, 0, { y: H(-74, -150) });
phwHorse(G, -74, H(-74, -146), -146, 0, {});
phwCart(G, 74, -30, Math.PI, { y: H(74, -30) });
phwHorse(G, 74, H(74, -34), -34, Math.PI, {});
phwCart(G, 30, -186, Math.PI / 2, { y: H(30, -186) });
phwHorse(G, 34, H(34, -186), -186, Math.PI / 2, {});
}
for (var b = 0; b < (lite ? 3 : 8); b++)
phwBarrel(G, -16 + b * 1.1, H(-16, -174), -174 + (b % 2) * 0.9, {});
for (var c = 0; c < (lite ? 2 : 6); c++)
phwBox(G, 1.0, 0.8, 1.0, phwMat("planks"), 12 + c * 1.2, H(12, -172), -172 - (c % 2) * 1.1);
if (!lite) {
phwCab(G, -120, 84, Math.PI / 2, H, { col: 0x1A1E2A });
phwCab(G, 90, 76, -Math.PI / 2, H, { plain: 1 });
phwCab(G, 320, 84, Math.PI / 2, H, {});
phwCab(G, 6, 230, Math.PI, H, { col: 0x2A1A14 });
phwCab(G, -6, 320, 0, H, { plain: 1 });
phwOmnibus(G, -340, 76, -Math.PI / 2, H);
}
phwCrowd("opX", night ? [["A gentleman in a silk hat", "m", "pheve", "After the opera, Durand's for supper."], ["A lady in a fur cape", "f", "lady", "Fetch the carriage, Henri, I shall freeze."], ["A cabman stamping his feet", "m", "cabby", "Twenty sous to the Madeleine, monsieur."], ["A girl selling programs", "f", "maid", "Programme! Faust, tonight's programme!"],
["A waiter carrying a tray", "m", "porter", "Two bocks for the terrace!"], ["A couple arm in arm", "f", "lady", "Wasn't Daae divine?"], ["An old gentleman", "m", "pheve", "In my day we walked home. Walked!"], ["A lamplighter", "m", "worker", "Every lamp from here to the Madeleine is mine."]]
: [["A delivery boy with hatboxes", "m", "boy", "Mind out, madame!", null, true], ["A governess with two girls", "f", "maid", "Stay together, girls."], ["A gentleman reading Le Figaro", "m", "gent", "The managers of the Opera are leaving, it says."], ["A street-sweeper", "m", "worker", "All night they come and go. All day I sweep."], ["A water-carrier", "m", "worker", "Water! Fresh water!"],
["A lady with a parasol", "f", "lady", "The light on the Opera at noon! Like gold."], ["An English tourist", "m", "gent", "Rather grand, what? Bigger than Covent Garden."], ["A soldier", "m", "police", "Is that the Opera? I thought it was a palace."]], -90, 60, 90, 100, { wander: 8 });
if (!lite)
phwCrowd("opT", [["A waiter of the Cafe de la Paix", "m", "porter", "An absinthe? A coffee? A grenadine for madame?"], ["A journalist at his table", "m", "gent", "Write it down: the ghost was seen in the corridors again."], ["A lady with an ice", "f", "lady", "The best ices in Paris, everybody says so."], ["A man playing dominoes", "m", "gent", "Double six! You owe me a coffee."]], -99, 8, -94, 50, { wander: 1 });
},
function (G) {
var lite = phwLite(), st = PHW.st, H = phwPgH, night = !!(st.night || PHW.night);
var lane = PHW_PG_ROADS.lannion, hedge = [], side = function (d) { var out = []; for (var s = 40; s < 640; s += lite ? 14 : 8) {
var p = phwPathAt(lane, s);
if (!p)
break;
if (Math.floor(s / 60) % 5 === 2)
continue;
out.push([p.x + p.nx * d, p.z + p.nz * d]);
} return out; };
[6, -6].forEach(function (d) { var pts = side(d); for (var i = 0; i < pts.length - 1; i++) {
if (Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]) > 20)
continue;
phwPaling(G, [pts[i], pts[i + 1]], H, { hedge: true });
} });
[[90, 150, 0], [-110, 260, Math.PI], [120, 420, 0]].forEach(function (f, i) {
if (lite && i > 1)
return;
phwTownHouse(G, f[0], f[1], 12, 8, 6, { wall: "granite", roof: i === 1 ? "thatch" : "slate", ry: f[2], shut: 0x3A5A2A });
phwTownHouse(G, f[0] + (i === 1 ? -18 : 18), f[1] + 6, 14, 9, 5, { wall: "granite", roof: "thatch", ry: f[2] });
phwHay(G, f[0] + 8, f[1] + 20, H, 1);
phwHay(G, f[0] - 6, f[1] + 22, H, 0.8);
phwCart(G, f[0] - 10, f[1] + 12, 0.6, { y: H(f[0] - 10, f[1] + 12) });
phwWell(G, f[0] + 4, f[1] + 12, H);
});
var cows = [], sheep = [];
for (var i = 0; i < (lite ? 6 : 16); i++) {
cows.push({ x: -200 + (i % 8) * 30 + ((i * 37) % 11), z: 120 + Math.floor(i / 8) * 140 + ((i * 13) % 17), ry: i });
}
for (var j = 0; j < (lite ? 8 : 24); j++) {
sheep.push({ x: -260 + (j % 8) * 16 + ((j * 7) % 9), z: -150 - Math.floor(j / 8) * 14 - ((j * 11) % 7), ry: j * 0.8 });
}
if (!night) {
phwGraze(G, cows, H, "cow");
phwGraze(G, sheep, H, "sheep");
}
var orch = [];
for (var ox = -200; ox <= -80; ox += lite ? 14 : 9)
for (var oz = 8; oz <= 60; oz += lite ? 14 : 9)
orch.push({ x: ox + ((ox * oz) % 3), z: oz, y: H(ox, oz), s: 0.55 });
phwPlant(G, "tree", orch, { col: 0x5A7A34 });
phwPaling(G, [[-206, 4], [-206, 66], [-74, 66], [-74, 4]], H, { wall: true });
[[14, 150], [-20, 330]].forEach(function (p) { var cv = new THREE.Group(); cv.position.set(p[0], H(p[0], p[1]), p[1]); G.add(cv); phwBox(cv, 1.2, 0.6, 1.2, phwMat("granite"), 0, 0, 0); phwBox(cv, 0.24, 3, 0.24, phwMat("granite"), 0, 0.6, 0); phwBox(cv, 1.2, 0.22, 0.22, phwMat("granite"), 0, 2.8, 0); phwSolid(p[0], p[1], 1.4, 1.4); });
if (!night) {
[[-90, -34, "fish"], [-74, -34, "veg"], [-58, -34, "bread"], [-8, -34, "cloth"], [8, -34, "flowers"]].forEach(function (s, i) { if (lite && i > 2)
return; phwStall(G, s[0], s[1], Math.PI, H, { goods: s[2], cols: i % 2 ? ["#2A4A8A", "#F0E8D8"] : ["#C83A2A", "#F0E8D8"] }); });
}
phwWell(G, 24, -36, H);
[[-160, -70, 0], [-30, -72, 0.2], [110, -70, 0]].forEach(function (l, i) { if (lite && i)
return; phwLine(G, l[0], l[1], l[2], H, 7); });
for (var bn = 0; bn < (lite ? 3 : 8); bn++) {
var bx = -200 + bn * 52;
phwBenchOut(G, bx, -48.4, 0, H);
}
for (var fb = 0; fb < (lite ? 4 : 12); fb++) {
var fx = -216 + fb * 36;
phwBox(G, 1.6, 0.3, 0.4, phwLam(0x6A4A2A), fx, H(fx, -47.6) + 1.6, -47.6);
phwEll(G, phwLam([0xE84A5A, 0xF0D040, 0xE8E8F0][fb % 3]), 0.7, 0.2, 0.2, fx, H(fx, -47.6) + 1.98, -47.6, 8);
}
[[250, -226], [280, -230], [330, -228]].forEach(function (p) { phwPots(G, p[0], p[1], H, 6); });
if (!lite) {
phwBoat(G, 370, H(370, -230) + 0.1, -230, 2.4, {});
phwBoat(G, 212, H(212, -226) + 0.1, -226, 0.6, { mast: true });
}
phwPlant(G, "flowers", phwScatter(81, lite ? 40 : 140, -60, 0, 80, 600, function (x, z) { var d = phwPathD(x, z, PHW_PG_ROADS.lannion); return d > 4 && d < 12; }, H, 0.6, 1.0), { col: 0xC84AA0 });
phwPlant(G, "bush", phwScatter(82, lite ? 30 : 90, -620, -60, 620, 620, function (x, z) { return Object.keys(PHW_PG_ROADS).every(function (k) { return phwPathD(x, z, PHW_PG_ROADS[k]) > 10; }) && !(Math.abs(x) < 250 && z < 0); }, H, 0.6, 1.1), { col: 0x4A6A2A });
},
function (G) {
var lite = phwLite(), st = PHW.st, H = phwBsH, night = !!(st.night || PHW.night || st.moon);
[[30, -40], [30, 40], [30, 120], [30, -120]].forEach(function (p, i) { if (lite && i > 1)
return; phwParterre(G, p[0], p[1], 8, 14, H, [[0xE84A5A, 0xF4F0F0], [0xF0D040, 0xA05AC8], [0xE87A3A, 0xF4F0F0], [0xE84A6A, 0x4A7AE8]][i], { centre: true }); });
for (var b = 0; b < (lite ? 6 : 16); b++) {
var bz = -300 + b * 44;
phwBenchOut(G, 44, bz, Math.PI / 2, H);
}
var C = PHW_BS.cascade;
phwParterre(G, C[0] + 20, C[1] + 30, 10, 6, H, [0xE84A5A, 0xF0D040]);
phwTerrace(G, C[0] + 24, C[1] + 2, C[0] + 30, C[1] + 18, 0, H);
phwAwning(G, C[0] + 30.5, 3.0, C[1] + 10, 3.4, 18, -Math.PI / 2, ["#2A4A2A", "#F0E8D0"]);
var L = PHW_BS.lake;
phwTownHouse(G, L[0] + 96, L[1] + 44, 10, 7, 5, { wall: "oak", roof: "tile", ry: -Math.PI / 2, trim: "oak" });
phwSign(G, "CHALET DU LAC · CANOTS", 3.6, 0.5, L[0] + 90.8, H(L[0] + 90, L[1] + 44) + 3.4, L[1] + 44, -Math.PI / 2, { bg: "#2A3A2A", ink: "#F0E0B0" });
for (var k = 0; k < (lite ? 3 : 7); k++) {
var a = k / 7 * Math.PI * 2;
phwBoat(G, L[0] + Math.cos(a) * 60, -0.6, L[1] + Math.sin(a) * 32, a, {});
}
phwPaling(G, [[L[0] + 84, L[1] + 30], [L[0] + 84, L[1] + 60]], H, { col: 0xE8E2D2 });
if (!lite)
for (var s = 0; s < 6; s++) {
var sw = new THREE.Group();
sw.position.set(L[0] - 40 + s * 14, -0.7, L[1] - 10 + (s % 3) * 12);
sw.rotation.y = s;
G.add(sw);
phwEll(sw, phwLam(0xF4F4F0), 0.35, 0.2, 0.18, 0, 0.1, 0, 8);
phwCyl(sw, 0.04, 0.05, 0.5, phwLam(0xF4F4F0), 0.28, 0.1, 0, 6).rotation.z = -0.3;
phwEll(sw, phwLam(0xF4F4F0), 0.08, 0.07, 0.12, 0.36, 0.62, 0, 6);
}
if (!night) {
if (!lite) {
phwRider(G, 64, -160, Math.PI, H, { dress: "pheve" });
phwRider(G, 58, 180, 0, H, { dress: "lady", sex: "f", col: 0x2A1A12 });
phwRider(G, 64, -420, Math.PI, H, { dress: "gent" });
}
phwCab(G, 64, -60, Math.PI, H, { col: 0x2A1A14 });
phwCab(G, 56, 240, 0, H, { plain: 1 });
}
phwPaling(G, [[150, 40], [150, 90], [210, 90], [210, 40], [150, 40]], H, { col: 0xF4F2EC });
for (var f = 0; f < 3; f++) {
var sz = -160 + f * 110;
phwCyl(G, 0.08, 0.08, 8, phwLam(0xE8E8E8), PHW_BS.stand[0] + 6, H(PHW_BS.stand[0], sz) + 12, sz, 6);
phwBox(G, 0.02, 1.0, 1.6, phwLam([0x2A4A8A, 0xF4F4F4, 0xC83A2A][f], { ds: 1 }), PHW_BS.stand[0] + 6, H(PHW_BS.stand[0], sz) + 19, sz + 0.8);
}
phwKiosk(G, 200, -30, H);
phwKiosk(G, 130, 120, H);
phwPlant(G, "bush", phwScatter(91, lite ? 60 : 220, -620, -620, 36, 620, function (x, z) { return Object.keys(PHW_BS_ROADS).every(function (k) { return phwPathD(x, z, PHW_BS_ROADS[k]) > 7; }) && Math.hypot((x - L[0]) / 1.6, z - L[1]) > 62; }, H, 0.6, 1.1), { col: 0x3A6A2A });
phwPlant(G, "flowers", phwScatter(92, lite ? 30 : 100, -40, -600, 40, 600, function (x, z) { var d = phwPathD(x, z, PHW_BS_ROADS.drive); return d > 7 && d < 20; }, H, 0.6, 1.0), { col: 0xE8E0F0 });
},
function (P, x, z, ry, cols) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var ir = phwMat("brass");
[-0.9, 0.9].forEach(function (k) { phwCyl(g, 0.025, 0.025, 1.8, ir, k, 0, 0, 6); });
phwBox(g, 1.9, 0.03, 0.03, ir, 0, 1.78, 0);
(cols || [0xE8E0F0, 0xC83A4A, 0x2A3A6A, 0xF0D8A0, 0x3A6A4A]).forEach(function (c, i) { var d = new THREE.Mesh(phwGeo("gown", function () { return new THREE.CylinderGeometry(0.12, 0.38, 1.3, 10, 1, true); }), phwLam(c, { ds: 1 })); d.position.set(-0.7 + i * 0.35, 1.05, 0); g.add(d); phwEll(g, phwLam(c), 0.14, 0.08, 0.1, -0.7 + i * 0.35, 1.66, 0, 6); });
return g;
},
function (P, x, z, ry) { var g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry || 0; P.add(g); var bk = phwShine(0x0E0A08, 0.25, 0.2); phwBox(g, 1.5, 1.3, 0.6, bk, 0, 0, 0); phwBox(g, 1.4, 0.06, 0.3, phwLam(0xF4F0E4), 0, 0.74, 0.42); phwBox(g, 1.5, 0.08, 0.34, bk, 0, 0.7, 0.42); phwBox(g, 1.0, 0.5, 0.4, phwMat("redvelvet"), 0, 0, 1.0); return g; },
function () {
var lite = phwLite(), st = PHW.st, R = function (k) { return phwRm(k); }, r;
if ((r = R("dance"))) {
phwPiano(r.g, 6, -4.6, 0);
for (var i = 0; i < 8; i++) {
phwBox(r.g, 0.08, 0.08, 0.18, phwMat("brass"), -7 + i * 2, 2.2, -5.86);
phwEll(r.g, phwLam(0xF4ECEC), 0.3, 0.12, 0.3, -7 + i * 2, 1.9, -5.7, 10);
}
for (var c = 0; c < 6; c++) {
phwCyl(r.g, 0.22, 0.26, 7, phwMat("gilt"), c < 3 ? -8.6 : 8.6, 0, -4 + (c % 3) * 4, 10);
}
phwRug(r.g, 0, 1.6, 8, 3, 0x6A1E22);
for (var ch = 0; ch < 6; ch++)
phwChair(r.g, -5 + ch * 2, 4.6, Math.PI, { seat: "redvelvet" });
phwPotPalm(r.g, -8, 5);
phwPotPalm(r.g, 8, 5);
phwChandelier(r.g, -4, 5.6, 0, 0.7);
phwChandelier(r.g, 4, 5.6, 0, 0.7);
for (var sh = 0; sh < 6; sh++)
phwEll(r.g, phwLam(0xF0C8C8), 0.08, 0.04, 0.14, -2 + sh * 0.3, 0.04, -4.6, 6);
}
if ((r = R("sorelli"))) {
phwRail(r.g, -1.2, 2.4, Math.PI);
phwHatBoxes(r.g, 2.9, -2.2);
phwSconce(r.g, -1.1, 1.6, -2.9, 0);
phwSconce(r.g, 1.1, 1.6, -2.9, 0);
phwFlowers(r.g, -0.8, 0.8, -2.5, 0xF4F0F0);
phwRug(r.g, 0, 0.4, 3, 2.4, 0x3A3A6A);
phwPicture(r.g, -3.38, 2.0, -1, Math.PI / 2, 0.8, 1.0);
phwPotPalm(r.g, 2.9, 2.4);
}
if ((r = R("christine"))) {
phwRail(r.g, 1.0, 3.0, Math.PI, [0xF4F0F0, 0xE8E0C8, 0x8A2A3A, 0x2A2A4A]);
phwSconce(r.g, -1.6, 1.8, -3.38, 0);
phwSconce(r.g, 1.6, 1.8, -3.38, 0);
phwHatBoxes(r.g, 3.4, -2.8);
phwPicture(r.g, -3.88, 2.0, 0.6, Math.PI / 2, 0.9, 1.1);
phwFlowers(r.g, 3.2, 0.45, 1.2, 0xE8505A);
phwPotPalm(r.g, -3.4, 2.8);
}
if ((r = R("office"))) {
phwClock(r.g, -4.6, -3.4, Math.PI / 2);
phwPotPalm(r.g, 4.4, 3.2);
phwPotPalm(r.g, -4.4, 3.2);
for (var pm = 0; pm < 3; pm++)
phwPicture(r.g, 4.88, 2.4, -1.4 + pm * 1.6, -Math.PI / 2, 1.0, 1.3, function (c, W, H) { c.fillStyle = "#2A2018"; c.fillRect(0, 0, W, H); c.fillStyle = "#C8A880"; c.beginPath(); c.arc(W / 2, H * 0.35, W * 0.18, 0, 7); c.fill(); c.fillStyle = "#141010"; c.fillRect(W * 0.25, H * 0.55, W * 0.5, H * 0.45); });
phwSofa(r.g, 0, 3.2, Math.PI, { mat: "leather" });
phwSconce(r.g, -1.6, 2.2, -3.88, 0);
phwSconce(r.g, 1.6, 2.2, -3.88, 0);
}
if ((r = R("rotunda"))) {
for (var cr = 0; cr < 2; cr++) {
var cx = -5 + cr * 10;
phwCyl(r.g, 0.04, 0.05, 1.9, phwMat("brass"), cx, 0, -5.6, 6);
for (var h = 0; h < 4; h++) {
var a = h / 4 * 6.28;
phwEll(r.g, phwLam([0x141414, 0x2A2420, 0x3A2A1A, 0x1A1A2A][h]), 0.18, 0.4, 0.12, cx + Math.cos(a) * 0.22, 1.6, -5.6 + Math.sin(a) * 0.22, 6);
}
}
phwBox(r.g, 5, 1.0, 0.7, phwMat("darkoak"), 0, 0, -6.4);
phwPotPalm(r.g, -6, 5.6);
phwPotPalm(r.g, 6, 5.6);
phwMirror(r.g, -6.88, 1.0, 0, Math.PI / 2, 2.4, 2.8);
phwMirror(r.g, 6.88, 1.0, 0, -Math.PI / 2, 2.4, 2.8);
phwChandelier(r.g, 0, 6.4, 0, 0.9);
[[-4.6, -4.6], [4.6, -4.6], [-4.6, 4.6], [4.6, 4.6]].forEach(function (p) { phwCyl(r.g, 0.34, 0.4, 1.1, phwMat("ashlar"), p[0], 0, p[1], 12); phwEll(r.g, phwMat("ashlar"), 0.24, 0.3, 0.24, p[0], 1.4, p[1], 10); phwEll(r.g, phwMat("ashlar"), 0.34, 0.16, 0.22, p[0], 1.18, p[1], 10); });
phwBench(r.g, 0, -4.6, 0, { w: 2.4, cushion: 0x6A1E22 });
phwBench(r.g, 0, 4.6, Math.PI, { w: 2.4, cushion: 0x6A1E22 });
}
if ((r = R("corridor"))) {
for (var sc2 = 0; sc2 < 5; sc2++)
phwSconce(r.g, -8 + sc2 * 4, 2.0, -2.42, 0);
for (var pc = 0; pc < 4; pc++)
phwPicture(r.g, -9 + pc * 6, 2.2, 2.42, Math.PI, 0.9, 0.7);
phwChair(r.g, -8, 1.6, Math.PI, { seat: "redvelvet" });
phwPotPalm(r.g, -11, 1.6);
phwPotPalm(r.g, 11, 1.6);
}
if ((r = R("cellar5"))) {
for (var b = 0; b < (lite ? 4 : 10); b++)
phwBarrel(r.g, 6 + (b % 3) * 0.9, 0, -6.6 + Math.floor(b / 3) * 0.9, {});
for (var cb = 0; cb < (lite ? 3 : 8); cb++)
phwBox(r.g, 0.9, 0.7, 0.9, phwMat("planks"), -10.6 + (cb % 4) * 1.0, Math.floor(cb / 4) * 0.7, 6.6);
for (var rb = 0; rb < (lite ? 6 : 16); rb++) {
var rr = wRand(rb + 70);
phwBox(r.g, 0.3 + rr() * 0.5, 0.2 + rr() * 0.3, 0.3 + rr() * 0.4, phwMat("darkstone"), -3 + rr() * 8, 0, 5 + rr() * 2.4).rotation.y = rr() * 3;
}
phwScenery(r.g, "forest", 5, 3.4, -2, 0, 7.6, Math.PI);
for (var ch2 = 0; ch2 < 3; ch2++)
phwCyl(r.g, 0.02, 0.02, 2.2, phwMat("iron"), -6 + ch2 * 0.3, 3.8, -7.7, 4);
phwCandle(r.g, 4, 1.6, 7.6, {});
phwCandle(r.g, -2, 1.6, -7.6, {});
[[-3, -3.6], [2, -3.6], [2, 3.4], [-3, 3.6]].forEach(function (p) { phwBox(r.g, 0.9, 6, 0.9, phwMat("darkstone"), p[0], 0, p[1]); phwBox(r.g, 1.3, 0.4, 1.3, phwMat("darkstone"), p[0], 0, p[1]); phwBox(r.g, 1.2, 0.5, 1.2, phwMat("darkstone"), p[0], 5.5, p[1]); });
phwBox(r.g, 6, 0.5, 0.9, phwMat("darkstone"), -0.5, 5.5, -3.6);
phwBox(r.g, 6, 0.5, 0.9, phwMat("darkstone"), -0.5, 5.5, 3.5);
for (var pp = 0; pp < 3; pp++) {
var pi = phwCyl(r.g, 0.09 + pp * 0.03, 0.09 + pp * 0.03, 23, phwMat("iron"), 0, 4.9 - pp * 0.36, 7.5 - pp * 0.3, 8);
pi.rotation.z = Math.PI / 2;
pi.position.y = 4.9 - pp * 0.36;
}
phwScenery(r.g, "palace", 4, 3, 2.0, 0, -4.2, 0);
phwScenery(r.g, "forest", 3.6, 2.8, -0.4, 0, 4.2, Math.PI);
phwScenery(r.g, "garden", 3.4, 2.6, 4.6, 0, -6.9, 0);
for (var fl = 0; fl < (lite ? 2 : 5); fl++) {
var f = phwBox(r.g, 0.06, 3 + fl * 0.2, 2.4, phwLam([0x5A4A3A, 0x4A5A4A, 0x6A5A3A][fl % 3]), 2.6 + fl * 0.12, 0, 0.6);
f.rotation.z = -0.08;
}
var th = new THREE.Group();
th.position.set(4.6, 0, -5.8);
th.rotation.y = Math.PI * 0.8;
r.g.add(th);
phwBox(th, 1.2, 0.5, 1.0, phwMat("gilt"), 0, 0, 0);
phwBox(th, 1.2, 2.2, 0.14, phwMat("gilt"), 0, 0.5, -0.44);
phwBox(th, 1.0, 0.12, 0.8, phwMat("redvelvet"), 0, 0.5, 0.02);
var wh = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.07, 6, 18), phwMat("oak"));
wh.position.set(5.6, 0.72, 1.8);
wh.rotation.y = 0.4;
wh.rotation.x = 0.15;
r.g.add(wh);
[[-3, -3.1], [2, -3.1], [2, 2.9], [-3, 3.1]].forEach(function (p) { phwCandle(r.g, p[0], 2.2, p[1], {}); });
if (!lite) {
var cg = wGlow(0xFFB860, 0.22, 7);
cg.position.set(0, 2.2, 0);
r.g.add(cg);
}
}
if ((r = R("lake"))) {
for (var rd = 0; rd < (lite ? 20 : 60); rd++) {
var q = wRand(rd + 90);
phwCyl(r.g, 0.02, 0.03, 0.8 + q() * 1.2, phwLam(0x3A4A2A), -19 + q() * 38, 0.1, 17.2 + q() * 0.8, 4);
}
[-14, -6, 6, 14].forEach(function (x) { phwCandle(r.g, x, 0.4, 18.4, {}).scale.setScalar(2.2); });
if (!lite) {
var gl = wGlow(0xFFC870, 0.3, 9);
gl.position.set(0, 1.6, 18);
r.g.add(gl);
var g2 = wGlow(0xFFC870, 0.22, 8);
g2.position.set(0, 2, -26);
r.g.add(g2);
}
phwCandle(r.g, -4, 0.6, 15.6, {}).scale.setScalar(1.6);
phwCandle(r.g, 0, 1.0, -27.8, {}).scale.setScalar(2.4);
}
if ((r = R("chagny"))) {
phwBox(r.g, 1.6, 2.4, 0.7, phwMat("darkoak"), -4.4, 0, 2.8);
phwClock(r.g, 4.6, 2.6, -Math.PI / 2);
phwSofa(r.g, 3.6, 0.4, -Math.PI / 2, { mat: "velvet" });
phwSconce(r.g, -2, 2.0, -3.88, 0);
phwSconce(r.g, 2, 2.0, -3.88, 0);
phwPotPalm(r.g, -4.4, -3.4);
}
if ((r = R("study"))) {
phwShelves(r.g, -4.38, 0, 3.4, 3.0, Math.PI / 2, {});
phwShelves(r.g, 4.38, 0, 3.4, 3.0, -Math.PI / 2, {});
phwClock(r.g, 3.6, -3.6, 0);
phwRug(r.g, 0, 0.4, 4, 3, 0x3A2A1A);
phwPotPalm(r.g, -3.8, 3.4);
}
if ((r = R("church"))) {
phwBox(r.g, 4.2, 3.6, 0.3, phwMat("gilt"), 0, 1.1, -9.7);
for (var sa = 0; sa < 3; sa++)
phwGiltFigure(r.g, -1.4 + sa * 1.4, 1.6, -9.5, 0.7, { mat: phwLam(0xE8E0D0) });
phwCandle(r.g, -1.8, 1.16, -8.4, { brass: 1 }).scale.setScalar(2.2);
phwCandle(r.g, 1.8, 1.16, -8.4, { brass: 1 }).scale.setScalar(2.2);
for (var vc = 0; vc < (lite ? 6 : 16); vc++)
phwCandle(r.g, 4.6 + (vc % 2) * 0.3, 0.9, 6 - Math.floor(vc / 2) * 0.3, {});
phwBox(r.g, 1.0, 0.9, 0.6, phwMat("darkoak"), 4.8, 0, 6);
phwBox(r.g, 1.2, 0.1, 0.6, phwLam(0xF4F0E8), -4.8, 0.9, 7.6);
}
if ((r = R("sunbar"))) {
for (var br = 0; br < 3; br++)
phwBarrel(r.g, -4.6, br * 0.0, 2.6 - br * 0.9, {});
for (var hm = 0; hm < 4; hm++)
phwEll(r.g, phwLam(0x8A4A2A), 0.12, 0.24, 0.12, -2 + hm * 0.8, R("sunbar").h - 0.6, 0.4, 8);
for (var jg = 0; jg < 5; jg++)
phwCyl(r.g, 0.07, 0.09, 0.24, phwLam(0xC8A878), 3.8 + jg * 0.25, 1.1, -3.4, 8);
phwPicture(r.g, 5.38, 1.8, 0, -Math.PI / 2, 1.0, 0.7);
}
},
function () {
var S = phwSc(), k = S.env;
if (PHW.envK && PHW_ENV[PHW.envK])
k = PHW.envK;
if (PHW.night)
k = PHW.envK === "moon" || PHW.envK === "storm" ? PHW.envK : "night";
if (phwInRoom()) {
var L = phwLocalSc(), R = phwRoomAt(L.x, L.z);
k = R ? R.env : "indoor";
}
var E = {}, B = PHW_ENV[k] || PHW_ENV.lake;
for (var q in B)
E[q] = B[q];
if (phwLite() && E.fogD)
E.fogD *= 1.35;
return E;
},
function (x, z, feet) {
if (PHW.moving || PHW.ride)
return true;
var S = phwSc(), D = PHW_SCN[PHW.sc];
if (!D)
return false;
if (phwInRoom()) {
if (phwSolidAt(x, z, feet))
return true;
return phwFloorAt(x, z, feet) === null;
}
if (Math.abs(x) > S.bound || Math.abs(z) > S.bound)
return true;
if (phwSolidAt(x, z, feet))
return true;
var fl = phwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = phwLand(x, z);
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
PHW.t += dt;
if (!PHW.built || !PHW.scG)
return;
var S = phwSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72;
PHW.inRm = phwInRoom();
PHW.et = (PHW.et || 0) + dt;
if (PHW.et > 0.8) {
PHW.et = 0;
worldEnv(phwEnvNow());
}
var flow = PHW.t * 0.03;
PHW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * (m.userData.fx || 0.3), flow * (m.userData.fz || 1)); });
PHW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (PHW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(PHW.t * 3 + i * 2)) * 0.3; f.rotation.y = PHW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(PHW.t * 1.3) * 0.08;
}
else if (k === "snowfall") {
var pa = F.geometry.attributes.position;
for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) - dt * (F.userData.sp || 1.4);
if (y < 0)
y += 40;
pa.setY(i, y);
pa.setX(i, pa.getX(i) + Math.sin(PHW.t * 0.5 + i) * dt * 0.3);
}
pa.needsUpdate = true;
F.position.set(L.x, PHW.inRm ? -500 : phwLand(L.x, L.z), L.z);
}
});
(PHW.ticks || []).forEach(function (f) { try {
f(dt, L);
}
catch (e) { } });
(PHW.smoke || []).forEach(function (g) { g.children.forEach(function (m, i) { m.position.x += Math.sin(PHW.t * 0.1 + i) * dt * 0.4; m.rotation.y += dt * 0.02; }); });
PHW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return phwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof phbTick === "function")
try {
phbTick(dt, L);
}
catch (e) {
var em = String(e && e.message);
PHW.e1 = PHW.e1 || {};
if (!PHW.e1[em]) {
PHW.e1[em] = 1;
if (window.console)
console.warn("[phantom] book", e && e.stack ? String(e.stack).slice(0, 400) : e);
}
}
if (!PHW.bannerBook)
worldBanner("<b>🎭 " + PHW_NAME + "</b> · " + esc(phwPlaceName(L)) + (PHW.night ? " · night" : ""));
PHW.pt = (PHW.pt || 0) + dt;
if (PHW.pt < 0.15)
return;
PHW.pt = 0;
if (PHW.moving || PHW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
PHW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof phbTalk === "function" && phbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
PHW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : phwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof phbSpot === "function")
phbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof phbIdlePrompt === "function")
phbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = phwAtPt(opt.at) || (typeof phbStartAt === "function" && phbStartAt()) || phwAtPt("place");
try {
phwCrxKinds();
if (typeof crxWarm === "function" && !phwLite())
crxWarm(["horse", "phdark", "phwhite"]);
}
catch (e) { }
phwScene(A.sc);
var S = PHW_SC[A.sc], y = A.y != null ? A.y : phwGround(A.x, A.z);
camera.position.set(PHW.base + S.x + A.x, y + 1.72, A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
PHW.moving = false;
PHW.ride = null;
PHW.inRm = phwInRoom();
worldEnv(phwEnvNow());
setStatus("🎭 <b>" + PHW_NAME + ".</b> Gaston Leroux's book, the whole of it: the Opera and all that is under it, the cellars, the lake and Erik's house; Perros-Guirec in Brittany; the Bois de Boulogne by moonlight. <b>Press E</b> for the book.");
if (typeof phbEnter === "function")
try {
phbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[phantom] enter", e);
}
},
function () {
phwSceneDrop();
for (var k in PHW.mats) {
var m = PHW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in PHW.tex) {
var x = PHW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in PHW_GEO) {
try {
PHW_GEO[g].dispose();
}
catch (e) { }
}
PHW.mats = {};
PHW.tex = {};
PHW_GEO = {};
PHW.built = false;
PHW.G = null;
PHW.lights = 0;
},
function (P, n, sp) {
var lite = phwLite();
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
PHW.fx.push(p);
return p;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = PHW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = PHW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: PHW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return phbPos(at.at);
var C = PHB_CH[phbS().ch], i = phbS().s, c = C && C.cast ? C.cast.filter(function (d) { return phbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? phbPos(c.at) : null;
}
if (at.spot) {
var Sp = PHW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: PHW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return phbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || PHW.sc, x: at.x, z: at.z, y: at.y };
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
if (PHB.beam && PHB.beam.parent === PHW.scG)
return PHB.beam;
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
PHW.scG.add(g);
PHB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return phwLam(c); }, m;
switch (kind) {
case "load":
m = phwBox(g, 0.6, 0.4, 0.5, M(0x8A7A5A), 0, 0, 0);
phwBox(g, 0.64, 0.06, 0.54, M(0x4A3A2A), 0, 0.2, 0);
break;
case "rifle":
m = phwBox(g, 0.08, 0.08, 1.1, M(0x3A2A1A), 0, 0.04, 0);
break;
case "fern":
m = phwBox(g, 0.4, 0.04, 0.3, M(0x5A8A3A), 0, 0.02, 0);
break;
case "thorn":
m = phwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = phwBox(g, 0.9, 0.12, 0.12, M(0x6A4A2A), 0, 0.06, 0);
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
m = phwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
phwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = phwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
phwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), phwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "note":
m = phwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "paper":
m = phwBox(g, 0.34, 0.03, 0.46, M(0xE8E2D0), 0, 0.02, 0);
phwBox(g, 0.3, 0.005, 0.08, M(0x2A2A2A), 0, 0.04, -0.16);
break;
case "bread":
m = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), M(0xC8945A));
m.scale.set(1.5, 0.8, 1);
m.position.y = 0.1;
g.add(m);
break;
case "bottle":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 10), phwShine(0x1A3A1A, 0.2, 0));
m.position.y = 0.15;
g.add(m);
var nk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.1, 8), phwShine(0x1A3A1A, 0.2, 0));
nk.position.y = 0.35;
g.add(nk);
break;
case "tin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 12), phwShine(0xA8A8A0, 0.4, 0.6));
m.position.y = 0.05;
g.add(m);
break;
case "coin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.01, 12), phwShine(0xE8C060, 0.3, 0.9));
m.position.y = 0.01;
g.add(m);
break;
case "spade":
m = phwBox(g, 0.05, 0.05, 1.0, M(0x6A4A2A), 0, 0.03, 0);
phwBox(g, 0.2, 0.02, 0.26, phwShine(0x8A8A88, 0.4, 0.7), 0, 0.02, 0.6);
break;
case "post":
m = phwBox(g, 0.08, 1.1, 0.08, M(0xE8E0CC), 0, 0, 0);
break;
case "skin":
m = phwBox(g, 0.8, 0.05, 0.6, M(0xA88A60), 0, 0.03, 0);
break;
case "cane":
m = phwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
break;
case "shell":
m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), M(0xD8C8A8));
m.scale.y = 0.4;
m.position.y = 0.05;
g.add(m);
break;
case "book":
m = phwBox(g, 0.22, 0.06, 0.3, M(0x5A2A1A), 0, 0, 0);
phwBox(g, 0.2, 0.05, 0.28, M(0xE8E0CC), 0.012, 0.005, 0);
break;
case "letter":
m = phwBox(g, 0.22, 0.01, 0.15, M(0xF2ECDC), 0, 0.01, 0);
phwBox(g, 0.04, 0.012, 0.04, M(0x8A1A1A), 0, 0.016, 0);
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
m = phwBox(g, 0.3, 0.06, 0.06, M(0x9A7A5A), 0, 0.03, 0);
break;
case "lantern":
m = phwBox(g, 0.16, 0.26, 0.16, M(0x3A3A3A), 0, 0, 0);
var lf = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), phwGlowM(0xFFD070, 0.9));
lf.position.y = 0.13;
g.add(lf);
break;
case "pistol":
m = phwBox(g, 0.05, 0.06, 0.34, M(0x3A3A40), 0, 0.03, 0);
phwBox(g, 0.05, 0.14, 0.08, M(0x5A3A1A), 0, 0, 0.14);
break;
case "locket":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.015, 14), phwShine(0xD8B048, 0.3, 0.9));
m.position.y = 0.02;
g.add(m);
break;
case "flask":
m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), phwMat("glass"));
m.position.y = 0.08;
g.add(m);
phwCyl(g, 0.02, 0.02, 0.1, phwMat("glass"), 0, 0.14, 0, 6);
break;
case "cloak":
m = phwBox(g, 0.6, 0.08, 0.5, M(0x3A3A4A), 0, 0.04, 0);
break;
case "fire":
m = phwBox(g, 0.5, 0.1, 0.5, M(0x3A2A1A), 0, 0, 0);
phwFire(g, 0, 0.08, 0, 0.4);
break;
case "chain":
m = phwBox(g, 0.4, 0.04, 0.04, M(0x8A8A90), 0, 0.02, 0);
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
if (!P || !PHW.scG || P.sc !== PHW.sc)
return null;
var g = phbItemMesh(kind), y = P.y != null ? P.y : phwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
PHW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = phwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (PHB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = PHW.spots.indexOf(I.S); if (j >= 0)
PHW.spots.splice(j, 1); PHB.items = PHB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.phb = 1;
PHB.items.push(I);
return I;
},
function (k) {
if (PHB.tuneKey === k)
return;
PHB.tuneKey = k;
var old = PHB.tune;
PHB.tune = null;
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
if (!k || !PHB_TUNES[k])
return;
try {
var A = new Audio(PHB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
PHB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (PHB.tune !== A) {
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
if (PHB.text)
return fn(PHB.text);
if (PHB.textWait) {
PHB.textWait.push(fn);
return;
}
PHB.textWait = [fn];
var done = function (B) { PHB.text = B; var w = PHB.textWait; PHB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/phantom/phantom.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
phbText(function (B) {
var C = PHB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + phbNum(i) + ". " + esc(C.t) + "</h3>" + PHB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(phbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); PHB.readOpen = 0; PHB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = phbS(), C = PHB_CH[S.ch];
if (!C)
return;
PHB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
PHB.readAsk = 0;
PHB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : "The Phantom of the Opera") + "</div><h3 style='margin:4px 0'>" + phbNum(ch) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? phbOpening(T).map(phbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); PHB.readOpen = 0; phbStepDone(); }, all: function () { phbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Leroux's own words, all of it");
b += phbKeeperBtns(fns);
worldCard(b, fns);
};
phbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
PHB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); phbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = phbS(), C = PHB_CH[S.ch];
if (!C)
return;
phbItemsClear();
phbCastClear();
PHB.hold = 0;
var go = function () { phbWorldState(); phbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[phb] setup", S.ch, e);
} phbTune(C.tune || null); phbStepBegin(); };
if (place && C.start) {
var P = phbPos(C.start);
if (P && WLD.on === PHW_KEY) {
phwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (PHW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = phbStep();
phbItemsClear();
PHB.hold = 0;
PHB.puzOpen = 0;
if (!b)
return;
b._key = phbKey();
phbWorldState();
try {
if (b.on)
b.on(phbS().f);
}
catch (e) {
if (window.console)
console.warn("[phb] on", e);
}
if (b.k === "read") {
phbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { PHB.rew[k] = 0; });
if (b.k === "find") {
var Pf = phbPos(b.at);
if (Pf && Pf.sc === PHW.sc)
phbItemAdd(b.item, Pf, b.name, b.verb, function () { if (phbKey() === b._key)
phbStepDone(); });
}
if (b.k === "gather") {
var P = phbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(phbS().ch * 97 + phbS().s * 13 + 7);
PHB.got = 0;
if (P && P.sc === PHW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = phwGround(Q.x, Q.z, (P.y != null ? P.y : phwLand(P.x, P.z)) + 1);
phbItemAdd(b.item, Q, b.name, b.verb, function () { if (phbKey() !== b._key)
return; PHB.got++; try {
if (b.each)
b.each(PHB.got);
}
catch (e) { } if (PHB.got < n) {
phbSay((b.eachSay || "Got one.") + " " + PHB.got + " of " + n + ".");
return;
} phbStepDone(); });
}
}
if (b.h)
phbSay("<b>" + esc(PHB_CH[phbS().ch].t) + ".</b> " + b.h);
},
function (b) {
PHB.puzOpen = 1;
PHB.puzT = performance.now();
var k = phbKey(), fns = {}, h = PHB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
phbSay(b.yes);
if (phbKey() === k)
phbStepDone();
return;
}
phbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (phbKey() === k)
PHB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = phbS(), C = PHB_CH[S.ch], b = phbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[phb] done", e);
}
if (b.say)
phbSay(b.say);
S.s++;
if (window.PHB_LOG)
PHB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= PHB_CH.length - 1) {
S.done = 1;
S.s = 0;
phbSave();
phbItemsClear();
phbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
phbSave();
var nx = PHB_CH[S.ch];
setTimeout(function () { try {
phbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[phb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
phbSave();
phbStepBegin();
},
function () {
phbTune("end");
var S = phbS();
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>" + phQ("Poor, unhappy Erik! Shall we pity him? Shall we curse him?") + "</p><p style='font-size:12px;opacity:.75'>Gaston Leroux, The Phantom of the Opera (1910), the Epilogue</p><p>You have heard the ballet-girls' fright on the night of the gala, seen Christine sing Margarita and the Viscount fall in love with her again; kept watch on Box Five, seen the chandelier come down; stood in the churchyard at Perros at midnight; waited in the Bois under the moon; gone to the masked ball and seen Red Death; climbed to the roofs under Apollo's lyre; gone down through the cellars to the lake with the Persian; borne the torture-chamber and turned the scorpion; and heard the end of the ghost's love story. Your keepsakes:</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; phbSave(); phbChapterBegin(true); } };
b += worldBtn("again", "Read it again from the start", "The Place de l'Opera, the night of the gala");
if (typeof bhnOpen === "function") {
b += worldBtn("hon", "🏅 The book's honours", "Its badge, its decor, and its vault");
fns.hon = function () { worldCard(null); bhnOpen("phantom"); };
}
worldCard(b, fns);
},
function (c) {
var C = PHB.cast[c.key || c.k];
if (phbCastLive(C))
return C;
var P = phbPos(c.at);
if (!P || P.sc !== PHW.sc)
return null;
var F = PHW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute, name: c.name };
var Pp;
if (F.name && !c.dress)
Pp = phwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = phwDressed("phb" + (c.key || c.k), c.dress || "lsmojo", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : phwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
PHW.scG.add(g);
Pp = { g: g, y: y, o: {} };
PHW.people.push(Pp);
if (c.name && !c.mute)
phwTalk(Pp, c.name, phwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
PHB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return PHB.cast[c.key || c.k];
},
function () {
var C = PHB_CH[phbS().ch];
if (!C || !C.cast)
return;
var idx = phbS().s;
var on = {};
C.cast.forEach(function (c) { var key = c.key || c.k; if (!(c.from != null && idx < c.from) && !(c.until != null && idx >= c.until) && !on[key])
on[key] = c; });
C.cast.forEach(function (c) {
var key = c.key || c.k, want = on[key], have = PHB.cast[key];
if (!want) {
if (have)
phbCastHide(key);
return;
}
if (want !== c)
return;
if (have && have.c && have.c !== c)
phbCastHide(key);
if (!phbCastLive(PHB.cast[key]))
phbCastAdd(c);
});
},
function () {
var b = phbStep(), key = "pass", have = PHB.cast[key];
var want = b && b.k === "talk" && b.at && b.at.at ? b : null, P = want ? phbPos(want.at.at) : null;
if (!want || !P || P.sc !== PHW.sc) {
if (have)
phbCastHide(key);
return;
}
if (have && have.b === want && phbCastLive(have))
return;
if (have)
phbCastHide(key);
if (!want.pass && PHW.talk.some(function (T) { return T.name === want.who && T.p && T.p.g && T.p.g.parent; }))
return;
var pa = want.pass || {}, nm = String(want.who), fem = /woman|lady|girl|wife|Mrs|Miss|mother|maid/i.test(nm), kid = pa.child || /boy|girl|child/i.test(nm);
var dr = pa.dress || (/hussar|cavalry|lieutenant/i.test(nm) ? "imhussar" : (/soldier|gunner|artillery|sergeant/i.test(nm) ? "imarty" : (/sailor|boatman|waterman|captain/i.test(nm) ? "imsailor" : (fem ? (kid ? "girl" : "maid") : (kid ? "boy" : (/milkman|carter|labourer|porter|landlord|man with/i.test(nm) ? "worker" : "gent"))))));
var Pp = phwOne("pass" + phbS().ch + "_" + phbS().s, want.who, pa.sex || (fem ? "f" : "m"), dr, P.x, P.z, pa.ry || 0, pa.greet || "", { y: P.y, child: !!kid, persona: PHP.townfolk });
if (Pp)
PHB.cast[key] = { g: Pp.g, P: Pp, c: { k: key }, b: want };
},
function () {
if (!PHW.scG)
return;
phbCastClear();
var S = phbS(), C = PHB_CH[S.ch];
if (S.started && !S.done && C && C.cast && phbCastHere(C)) {
phbCastTick();
return;
}
(PHB_FOLK_AT[PHW.sc] || []).forEach(function (q) { var key = "f_" + q[0]; var Pp = phwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
PHB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!phbActive())
return false;
var b = phbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = phbKey();
worldPrompt(null);
var next = function () { if (phbKey() === k)
phbStepDone(); };
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
worldCard(PHB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
PHB.wt += dt;
if (PHB.wt > 0.5) {
PHB.wt = 0;
if (phbActive() && phbCastHere(PHB_CH[phbS().ch]))
phbCastTick();
if (phbActive())
phbPassTick();
var S0 = phbS();
S0.seen[PHW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!phbActive()) {
if (PHB.beam)
PHB.beam.visible = false;
PHW.bannerBook = false;
return;
}
var S = phbS(), b = phbStep(), t = PHW.t, feet = camera.position.y - 1.72;
PHB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? phbPos(b.at) : null, here = P && P.sc === PHW.sc, bm = phbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + phbScName(P.sc) + ": press E for the book)";
if (here && !PHW.moving && !PHW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : phwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = phbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !PHW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (PHB.readAsk)
break;
if (!PHB.readOpen)
phbChapterCard();
else {
PHB.readOpen = 0;
phbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
phbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
PHB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(PHB.hold, dt);
}
catch (e) { }
if (PHB.hold >= (b.sec || 8)) {
phbStepDone();
return;
}
}
else
PHB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return PHB.rew[k]; })) {
phbStepDone();
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
phbStepDone();
return;
}
break;
}
case "puzzle":
if ((!PHB.puzOpen || performance.now() - (PHB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
phbPuzzleCard(b);
break;
}
}
var C = PHB_CH[S.ch], prog = b && b.k === "hold" && PHB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - PHB.hold)) + " s)" : b && b.k === "gather" ? " (" + (PHB.got || 0) + " of " + (b.n || 3) + ")" : "";
PHW.bannerBook = true;
worldBanner("⚡ <b>" + phbNum(S.ch) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = phbS(), C = PHB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Gaston Leroux · The Phantom of the Opera (1910), the whole book</div><h3 style='margin:4px 0'>🎭 The Phantom of the Opera</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + phbNum(S.ch) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((phbStep() || {}).h || "") + "</p>";
var st = phbStep(), P = st && st.at ? phbPos(st.at) : null, Cs = phbPos(C.start);
var to = P && P.sc !== PHW.sc ? P : (!P && Cs && Cs.sc !== PHW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + phbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); phwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { phbPopulate(); phbStepBegin(); }); };
}
}
else
b += "<p>Paris, the 1880s. The ballet-girls burst into La Sorelli's dressing-room on the night of the managers' farewell gala: they have seen the ghost. The Prologue, all twenty-six chapters and the Epilogue, every one played: Christine Daae's triumph and the Viscount de Chagny, Box Five and its box-keeper, the chandelier, Perros-Guirec and its churchyard at midnight, the masked ball and Red Death, the roofs under Apollo's lyre, the safety-pin, the cellars and the lake with the Persian, the torture-chamber, the scorpion and the grasshopper, and the end of the ghost's love story. About four hours at your own pace; your place is kept.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: the Opera, on the night of the gala", S.started ? "Back to where you were" : "\"The Opera ghost really existed.\"");
fns.go = function () { worldCard(null); phbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; phbSave(); phbBegin(); };
}
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(PHW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(PHW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = (PHW_SCN[k].start || { x: 0, z: 0 }); phwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, phbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += phbKeeperBtns(fns);
worldCard(b, fns);
},
function (st, s) {
var v = function (k) { return phbStV(st[k]); }, reb = false;
Object.keys(PHW.st).forEach(function (k) { if (!(k in st) && PHW.st[k] != null && PHW.st[k] !== false) {
delete PHW.st[k];
if (PHW_LIVEK.indexOf(k) < 0)
reb = true;
} });
Object.keys(st).forEach(function (k) { if (k === "env" || k === "night" || k === "nightUntil" || k === "nightFrom")
return; var nv = v(k); if (PHW.st[k] !== nv) {
PHW.st[k] = nv;
if (PHW_LIVEK.indexOf(k) < 0)
reb = true;
} });
if (typeof phwLiveState === "function")
try {
phwLiveState();
}
catch (e) { }
if (reb && !PHW.rebuilding && PHW.scBuilt) {
PHW.rebuilding = 1;
try {
phwRebuild();
}
catch (e) { }
PHW.rebuilding = 0;
}
}
];
});
