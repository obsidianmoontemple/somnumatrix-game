/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(524, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (HGW.tex[k])
return HGW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = hgwLite();
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
return (HGW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (HGW.mats[k])
return HGW.mats[k];
var own = name.slice(0, 2) === "b:", map = hgwPhotoTex(name, mpt || 2), m;
if (hgwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = hgwPhotoTex(name, mpt || 2, true);
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
return (HGW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return hgwM(k, function () {
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
return hgwCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return hgwCanvas("bamboo", 64, 256, function (x, W, H) {
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
hgwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return hgwCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return hgwCanvas("tuft", 128, 64, function (x, W, H) {
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
return hgwCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return hgwCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
hgwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return hgwCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = HGW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / HGW_CELL) + "," + Math.floor(z / HGW_CELL)];
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
p = dlnPerson("hgw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("hgw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || HGW.scG || HGW.G).add(p);
var P = { g: p, y: y, o: o };
HGW.people.push(P);
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
HGW.inst.push(m);
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
var a0 = pts[q - 1], b0 = pts[q], L0 = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), n0 = Math.max(1, Math.ceil(L0 / (hgwLite() ? 8 : 4)));
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
var lite = hgwLite(), leaf = hgwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
hgwInst(P, hgwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), hgwMat("pale"), list, { shadow: !lite });
hgwInst(P, hgwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), hgwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
hgwInst(P, hgwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), hgwMat("bark"), list, { shadow: !lite });
hgwInst(P, hgwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), hgwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
hgwInst(P, hgwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), hgwMat("darkbark"), list, { shadow: !lite });
hgwInst(P, hgwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), hgwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
hgwInst(P, hgwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), hgwMat("bark"), list, { shadow: !lite });
hgwInst(P, hgwGeo("pfronds", function () { var g = hgwFronds(lite ? 8 : 12, 5.2, 1.6, 0.5, 12, 1.0); g.translate(1.4, 0, 0); return g; }), hgwLam(0xFFFFFF, { ds: 1, map: hgwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "mauritia": {
hgwInst(P, hgwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), hgwMat("darkbark"), list, {});
hgwInst(P, hgwGeo("mfronds", function () { return hgwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), hgwLam(0xFFFFFF, { ds: 1, map: hgwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
hgwInst(P, hgwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), hgwMat("darkbark"), list, {});
hgwInst(P, hgwGeo("ffronds", function () { return hgwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), hgwLam(0xFFFFFF, { ds: 1, map: hgwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
hgwInst(P, hgwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), hgwMat("darkbark"), list, {});
hgwInst(P, hgwGeo("cyf", function () { return hgwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), hgwLam(0xFFFFFF, { ds: 1, map: hgwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
hgwInst(P, hgwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), hgwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: hgwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
hgwInst(P, hgwGeo("bamL", function () { return hgwCards(3, 2.6, 2.2, 5.4); }), hgwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
hgwInst(P, hgwGeo("reed" + kind, function () { return hgwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), hgwLam(0xFFFFFF, { ds: 1, map: hgwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
hgwInst(P, hgwGeo("tuft", function () { return hgwCards(2, 1.6, 0.7, 0); }), hgwLam(o.col || 0xFFFFFF, { ds: 1, map: hgwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
hgwInst(P, hgwGeo("flw", function () { return hgwCards(2, 0.9, 0.7, 0); }), hgwLam(0xFFFFFF, { ds: 1, map: hgwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
hgwInst(P, hgwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), hgwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
hgwInst(P, hgwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || hgwMat("rock"), list, {});
break;
}
case "cactus": {
hgwInst(P, hgwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), hgwLam(0x4A7A3A), list, {});
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
function (kind, col) { return hgwM("skinM" + kind + (col || ""), function () { var t = hgwSkinTex(kind); t.repeat.set(2, 2); var m = hgwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = hgwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(hgwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = hgwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(hgwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
hgwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return hgwGeo(k, function () {
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
var t = hgwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), hgwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || hgwS("b:stucco", o.col || 0xF0E2C8, 3), trim = hgwLam(0xFAF6EE), sh = hgwLam(o.shut || 0x3A6A4A), glass = hgwShine(0x1A2228, 0.2, 0.3);
hgwBox(g, w, h, d, wall, 0, 0, 0);
hgwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
hgwBox(g, w + 0.12, 0.5, d + 0.12, hgwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(hgwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || hgwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
hgwBox(g, 1.3, 2.6, 0.12, hgwMat("oak"), wx, 0, d / 2 + 0.02);
hgwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = hgwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = hgwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!hgwLite())
[-1, 1].forEach(function (s) { hgwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
hgwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
hgwBox(g, 0.05, 0.9, 0.05, hgwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
hgwBox(g, 1.8, 0.05, 0.05, hgwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
hgwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
if (HGW.scG) {
if (HGW.scG.parent)
HGW.scG.parent.remove(HGW.scG);
HGW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
HGW.scG = null;
HGW.solids = [];
HGW.sgrid = null;
HGW.floors = [];
HGW.spots = [];
HGW.talk = [];
HGW.people = [];
HGW.beasts = [];
HGW.fx = [];
HGW.water = [];
HGW.inst = [];
HGW.hgt = null;
HGW.scBuilt = null;
HGW.rooms = [];
HGW.doors = [];
HGW.lights = 0;
HGW.ticks = [];
HGW.tripods = [];
HGW.handlers = [];
HGW.smoke = [];
HGW.live = null;
if (typeof hgbSceneDrop === "function")
try {
hgbSceneDrop();
}
catch (e) { }
},
function (k) {
if (HGW.scBuilt === k && HGW.scG)
return;
hgwSceneDrop();
var D = HGW_SCN[k], S = HGW_SC[k];
if (!D || !S || !HGW.G)
return;
HGW.sc = k;
HGW.scG = new THREE.Group();
HGW.scG.position.x = S.x;
HGW.G.add(HGW.scG);
HGW.hgt = D.h || function () { return 0; };
try {
D.build(HGW.scG);
}
catch (e) {
if (window.console)
console.warn("[homer] scene", k, e);
}
HGW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
HGW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = hgwAtPt(at);
if (!A)
return;
var v = hgwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
HGW.moving = true;
setTimeout(function () {
if (WLD.on !== HGW_KEY) {
v.style.opacity = "0";
HGW.moving = false;
return;
}
hgwScene(A.sc);
var S = HGW_SC[A.sc], y = A.y != null ? A.y : hgwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(HGW.base + S.x + A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(hgwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; HGW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(hgwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), hgwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; HGW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(hgwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), hgwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(hgwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), hgwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(hgwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), hgwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!hgwLite() && typeof THREE.PointLight === "function" && (HGW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
HGW.lights = (HGW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
HGW.fx.push(g);
return g;
},
function (seed, role, o) {
o = o || {};
var look = { _eb: role || "gkman", sex: o.sex || "m", hat: "none" };
if (o.beard && o.sex !== "f")
look.beard = o.beard;
if (o.hair != null)
look.hair = o.hair;
if (o.skin != null)
look.skin = o.skin;
if (o.col) {
look.top = o.col[0];
look.layerColor = o.col[1];
look.bottom = o.col[2];
}
var ok = typeof WDR_COST !== "undefined" && WDR_COST.oz_ebk;
var g = wPerson("hgw" + seed, ok ? { look: look, sex: look.sex, ozCos: "oz_ebk", child: !!o.child } : { look: { sex: look.sex }, sex: look.sex, child: !!o.child });
g.userData.shkFlat = 1;
return g;
},
function (key, x, z, ry, o) {
var F = HGW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : hgwGround(x, z, o.feet != null ? o.feet : 500);
var g = F.dog ? hgwDog(0xB8A070, 1.0) : hgwDressed(key + (o.seed || ""), o.role || F.role, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || HGW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
HGW.people.push(P);
if (!o.mute && !F.dog)
hgwTalk(P, o.name || F.name, hgwPersona(F.persona), o.greet || F.greet, o.r || (F.scale ? 8 : 3.4), o.fn);
return P;
},
function (seed, list, x0, z0, x1, z1, o) {
o = o || {};
var R = wRand(seed), out = [], lite = hgwLite(), n = lite ? Math.ceil(list.length * 0.6) : list.length;
for (var i = 0; i < n; i++) {
var L = list[i], x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), tries = 0;
while (o.ok && !o.ok(x, z) && tries++ < 12) {
x = x0 + R() * (x1 - x0);
z = z0 + R() * (z1 - z0);
}
var sex = L[1], g = hgwDressed(seed + "c" + i, L[2], { sex: sex, child: !!L[5], beard: sex === "m" && !L[5] && R() < 0.6 ? (R() < 0.5 ? "full" : "short") : null, hair: HGW_HAIR[Math.floor(R() * HGW_HAIR.length)], skin: HGW_SKIN[Math.floor(R() * HGW_SKIN.length)], col: HGW_CLOTH[Math.floor(R() * HGW_CLOTH.length)] });
var y = o.y != null ? o.y : hgwGround(x, z, 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
(o.parent || HGW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander != null ? o.wander : 6, sp: o.sp || 0.7 } };
HGW.people.push(P);
hgwTalk(P, L[0], hgwPersona(L[4] || o.persona || "greek"), L[3], 3.0);
out.push(P);
}
return out;
},
function (seed, name, sex, role, x, z, ry, greet, o) {
o = o || {};
var R = wRand(String(seed).length * 131 + (x | 0) * 7 + (z | 0));
var g = hgwDressed(seed, role, { sex: sex, child: !!o.child, beard: o.beard != null ? o.beard : (sex === "m" && !o.child && R() < 0.6 ? "full" : null), hair: o.hair != null ? o.hair : HGW_HAIR[Math.floor(R() * HGW_HAIR.length)], skin: o.skin != null ? o.skin : HGW_SKIN[Math.floor(R() * HGW_SKIN.length)], col: o.col || HGW_CLOTH[Math.floor(R() * HGW_CLOTH.length)] });
if (o.scale)
g.scale.set(o.scale[0], o.scale[1], o.scale[2]);
var y = o.y != null ? o.y : hgwGround(x, z, o.feet != null ? o.feet : 500);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
(o.parent || HGW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander || 0, sp: 0.6 } };
HGW.people.push(P);
if (name)
hgwTalk(P, name, hgwPersona(o.persona || "greek"), greet || "Greetings, stranger.", o.r || 3.0);
return P;
},
function (col, s) {
var g = new THREE.Group(), m = hgwLam(col || 0xB8A070), d = hgwLam(0x2A2018);
s = s || 1;
var b = new THREE.Mesh(hgwGeo("dgB", function () { var s2 = new THREE.SphereGeometry(0.2, 12, 8); s2.scale(1, 2.2, 0.9); return s2; }), m);
b.rotation.z = Math.PI / 2;
b.position.y = 0.55;
g.add(b);
var n = new THREE.Mesh(hgwGeo("dgN", function () { return new THREE.CylinderGeometry(0.08, 0.12, 0.36, 8); }), m);
n.position.set(0.46, 0.72, 0);
n.rotation.z = -0.7;
g.add(n);
var h = new THREE.Mesh(hgwGeo("dgH", function () { return new THREE.SphereGeometry(0.12, 10, 8); }), m);
h.scale.set(1.3, 0.9, 0.85);
h.position.set(0.6, 0.86, 0);
g.add(h);
var mz = new THREE.Mesh(hgwGeo("dgM", function () { return new THREE.CylinderGeometry(0.045, 0.07, 0.2, 8); }), m);
mz.rotation.z = Math.PI / 2;
mz.position.set(0.76, 0.82, 0);
g.add(mz);
var ns = new THREE.Mesh(hgwGeo("dgNs", function () { return new THREE.SphereGeometry(0.03, 6, 5); }), d);
ns.position.set(0.86, 0.83, 0);
g.add(ns);
[-1, 1].forEach(function (k) { var e = new THREE.Mesh(hgwGeo("dgE", function () { return new THREE.ConeGeometry(0.04, 0.12, 5); }), m); e.position.set(0.56, 0.98, k * 0.06); e.rotation.x = k * 0.3; g.add(e); });
[[0.32, 0.1], [0.32, -0.1], [-0.3, 0.1], [-0.3, -0.1]].forEach(function (p) { var l = new THREE.Mesh(hgwGeo("dgL", function () { var c = new THREE.CylinderGeometry(0.035, 0.03, 0.5, 6); c.translate(0, -0.25, 0); return c; }), m); l.position.set(p[0], 0.5, p[1]); g.add(l); });
var t = new THREE.Mesh(hgwGeo("dgT", function () { var c = new THREE.CylinderGeometry(0.015, 0.03, 0.4, 5); c.translate(0, 0.2, 0); return c; }), m);
t.position.set(-0.42, 0.62, 0);
t.rotation.z = 1.0;
g.add(t);
g.scale.setScalar(s);
g.rotation.y = 0;
var w = new THREE.Group();
g.rotation.y = -Math.PI / 2;
w.add(g);
return w;
},
function (k) {
switch (k) {
case "plaster": return hgwS("plaster", 0xF0EAD8, 4);
case "render": return hgwS("b:stucco", 0xEAE2D0, 3);
case "ochre": return hgwS("b:stucco", 0xE8CC98, 3);
case "rose": return hgwS("b:stucco", 0xE8C0B0, 3);
case "grey": return hgwS("b:stucco", 0xC8C8C4, 3);
case "ashlar": return hgwS("b:ashlar", 0xE0D8C8, 2.4);
case "stone": return hgwS("stone", 0xC8C0B0, 2.4);
case "greystone": return hgwS("b:limestone", 0xA8A49C, 4);
case "darkstone": return hgwS("b:limestone", 0x6A6660, 4);
case "brick": return hgwS("brick", 0xB87A5E, 1.6);
case "slate": return hgwS("b:slate", 0x5A5E68, 2);
case "tile": return hgwS("b:terracotta", 0xA85A40, 1.6);
case "shingle": return hgwS("shingle", 0x7A5A44, 2);
case "thatch": return hgwThatchM();
case "oak": return hgwS("b:oak", 0x8A5E3A, 1.4);
case "darkoak": return hgwS("b:oak", 0x4A3020, 1.4);
case "floor": return hgwS("b:oak", 0xA87A50, 1.8);
case "planks": return hgwS("b:planks", 0x9A8060, 2);
case "deck": return hgwS("b:deck", 0xB8A07A, 2);
case "hull": return hgwS("b:planks", 0x4A3A2A, 2);
case "damask": return hgwS("b:damask", 0x8A6A4A, 1.2);
case "bluepaper": return hgwS("b:damask", 0x6A7A9A, 1.2);
case "greenpaper": return hgwS("b:damask", 0x6A8A6A, 1.2);
case "velvet": return hgwS("b:velvet", 0x6A1E22, 0.8);
case "leather": return hgwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return hgwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return hgwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "ceiling": return hgwLam(0xEDE6D6);
case "beams": return hgwS("b:oak", 0x5A3E26, 1.4);
case "brass": return hgwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "iron": return hgwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "copper": return hgwShine(0xC87A4A, 0.35, 0.85);
case "glass": return hgwM("glass", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8ECE8, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.42, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "pane": return hgwShine(0x26323A, 0.15, 0.3);
case "earth": return hgwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return hgwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "meadow": return hgwS("grass", 0xB8D098, 4, { vc: 1 });
case "paving": return hgwS("paving", 0xC8C0B0, 2.4);
case "cobble": return hgwS("b:cotto", 0x9A9088, 1.2);
case "setts": return hgwS("paving", 0x8A8478, 2.4);
case "gravel": return hgwS("sand", 0x9A8C72, 3);
case "sand": return hgwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "rock": return hgwS("b:strata", 0x8A847A, 6);
case "darkrock": return hgwS("b:strata", 0x5A5650, 7);
case "granite": return hgwS("b:limestone", 0x9A948C, 5);
case "moss": return hgwS("b:moss", 0x7A9A5A, 3);
case "bark": return hgwS("bark", 0x8A7A64, 2.5);
case "darkbark": return hgwS("bark", 0x5A4E40, 3);
case "birch": return hgwS("bark", 0xE8E4DA, 2);
case "slush": return hgwS("sand", 0xC4BCB0, 3);
case "snowroof": return hgwS("snow", 0xD4D8DE, 3);
case "snow": return hgwS("snow", 0xF4F6FA, 5, { vc: 1 });
case "snowwall": return hgwS("snow", 0xF0F4FA, 3);
case "ice": return hgwM("icem", function () { var m = hgwLite() ? new THREE.MeshLambertMaterial({ color: 0xD8EAF4, map: hgwPhotoTex("snow", 6) }) : new THREE.MeshPhongMaterial({ color: 0xD0E6F2, map: hgwPhotoTex("snow", 6), shininess: 70, specular: 0x8AA8C0, vertexColors: true }); m.userData.noPhoto = 1; return m; });
case "blueice": return hgwM("blueice", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8AC0DA, shininess: 110, specular: 0xE8F8FF, transparent: true, opacity: 0.92 }); m.userData.noPhoto = 1; return m; });
case "cloth": return hgwLam(0xE8DCC4, { ds: 1 });
case "sail": return hgwLam(0xE8E0CC, { ds: 1 });
case "rope": return hgwLam(0x8A7A5A);
case "gilt": return hgwS("b:brass", 0xF0C860, 0.7, { shine: 110 });
case "redvelvet": return hgwS("b:velvet", 0x9A1A20, 0.6);
case "greenmarble": return hgwS("b:marble", 0x3A6A50, 1.8, { shine: 70 });
case "redmarble": return hgwS("b:marble", 0x9A4A3A, 1.8, { shine: 70 });
case "onyx": return hgwS("b:marble", 0xE8D4A8, 1.4, { shine: 90 });
case "zinc": return hgwS("b:slate", 0x7A8290, 2);
case "patina": return hgwS("b:brass", 0x7AB098, 1.6, { shine: 30 });
case "cave": return hgwS("b:cave", 0x8A8478, 4);
case "wetstone": return hgwS("b:limestone", 0x5A5A58, 3, { shine: 60 });
case "pinkgranite": return hgwS("b:limestone", 0xC8988A, 4);
case "mirror": return hgwShine(0xE8ECF0, 0.04, 1.0);
case "blackcloth": return hgwLam(0x0E0C10);
case "canvas": return hgwLam(0xD8CCB0, { ds: 1 });
}
return hgwS("earth", 0x8A7058, 5);
},
function () {
return hgwM("thatch", function () {
var t = hgwCanvas("thatch", 128, 128, function (c, W, H) { c.fillStyle = "#7A6640"; c.fillRect(0, 0, W, H); var R = wRand(41); for (var i = 0; i < 900; i++) {
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
var y = HGW_RY, h = o.h || 3.4, g = new THREE.Group();
g.position.set(cx, y, cz);
P.add(g);
g.userData.keep = 0;
var wall = hgwMat(o.wall || "plaster"), fl = hgwMat(o.floor || "floor");
hgwBox(g, w, 0.12, d, fl, 0, -0.12, 0);
hgwBox(g, w, 0.1, d, o.ceil ? hgwMat(o.ceil) : hgwMat("ceiling"), 0, h, 0);
[[0, -d / 2, w, 0.2], [0, d / 2, w, 0.2]].forEach(function (q, i) {
if (i === 1) {
var dw = 1.2;
hgwBox(g, (w - dw) / 2, h, 0.2, wall, -(w + dw) / 4, 0, q[1]);
hgwBox(g, (w - dw) / 2, h, 0.2, wall, (w + dw) / 4, 0, q[1]);
hgwBox(g, dw, h - 2.3, 0.2, wall, 0, 2.3, q[1]);
hgwBox(g, dw, 2.3, 0.08, hgwMat(o.door || "darkoak"), 0, 0, q[1] - 0.06);
hgwBox(g, 0.06, 0.06, 0.04, hgwMat("brass"), 0.42, 1.0, q[1] - 0.12);
}
else
hgwBox(g, q[2], h, 0.2, wall, q[0], 0, q[1]);
});
hgwBox(g, 0.2, h, d, wall, -w / 2, 0, 0);
hgwBox(g, 0.2, h, d, wall, w / 2, 0, 0);
if (!o.bare) {
var sk = hgwMat(o.trim || "oak");
[[0, -d / 2 + 0.11, w - 0.2, 0.04], [0, d / 2 - 0.11, w - 0.2, 0.04]].forEach(function (q) { hgwBox(g, q[2], 0.16, q[3], sk, q[0], 0, q[1]); });
[-w / 2 + 0.11, w / 2 - 0.11].forEach(function (x) { hgwBox(g, 0.04, 0.16, d - 0.2, sk, x, 0, 0); });
}
if (o.beams)
for (var b = -w / 2 + 1; b < w / 2; b += 1.6)
hgwBox(g, 0.18, 0.22, d - 0.2, hgwMat("beams"), b, h - 0.22, 0);
hgwSolid(cx, cz - d / 2, w, 0.3, y - 1, y + h + 1);
hgwSolid(cx - w / 2, cz, 0.3, d, y - 1, y + h + 1);
hgwSolid(cx + w / 2, cz, 0.3, d, y - 1, y + h + 1);
hgwSolid(cx - (w + 1.2) / 4, cz + d / 2, (w - 1.2) / 2, 0.3, y - 1, y + h + 1);
hgwSolid(cx + (w + 1.2) / 4, cz + d / 2, (w - 1.2) / 2, 0.3, y - 1, y + h + 1);
hgwFloor(cx, cz, w, d, y);
var R = { key: key, x0: cx - w / 2, x1: cx + w / 2, z0: cz - d / 2, z1: cz + d / 2, cx: cx, cz: cz, w: w, d: d, y: y, h: h, env: o.env || "indoor", name: o.name || key, g: g, out: null };
HGW.rooms.push(R);
if (o.light !== false && !hgwLite() && (HGW.lights || 0) < 5 && typeof THREE.PointLight === "function") {
var L = new THREE.PointLight(o.lightCol || 0xFFD8A0, o.lightI || 0.9, Math.max(w, d) * 1.4);
L.position.set(0, h - 0.6, 0);
g.add(L);
HGW.lights = (HGW.lights || 0) + 1;
}
return R;
},
function (R, name, ox, oz, ory) {
R.out = { x: ox, z: oz, ry: ory };
hgwSpot(ox, oz, 1.8, name, "go in", function () { hgwGo({ sc: HGW.sc, x: R.cx, z: R.z1 - 1.2, y: R.y, ry: 0 }, "🚪 <b>" + hgEsc(R.name) + ".</b>"); if (typeof hgbNote === "function")
hgbNote("in:" + R.key); });
hgwSpot(R.cx, R.z1 - 0.6, 1.4, "The door", "go out", function () { hgwGo({ sc: HGW.sc, x: ox, z: oz, ry: ory != null ? ory : Math.PI }, null); if (typeof hgbNote === "function")
hgbNote("out:" + R.key); }, R.y);
HGW.doors.push(R);
return R;
},
function (fromKey, toKey, lx, lz, name, verb) {
var A = HGW.rooms.filter(function (r) { return r.key === fromKey; })[0], B = HGW.rooms.filter(function (r) { return r.key === toKey; })[0];
if (!A || !B)
return;
var x = A.cx + lx, z = A.cz + lz;
B.out = { x: x, z: z, ry: Math.PI, inner: fromKey };
hgwSpot(x, z, 1.5, name, verb || "go through", function () { hgwGo({ sc: HGW.sc, x: B.cx, z: B.z1 - 1.2, y: B.y, ry: 0 }, "🚪 <b>" + hgEsc(B.name) + ".</b>"); if (typeof hgbNote === "function")
hgbNote("in:" + B.key); }, A.y);
hgwSpot(B.cx, B.z1 - 0.6, 1.4, "Back to " + A.name, "go", function () { hgwGo({ sc: HGW.sc, x: x, z: z + 1.2, y: A.y, ry: 0 }, null); if (typeof hgbNote === "function")
hgbNote("out:" + B.key); }, B.y);
HGW.doors.push(B);
return B;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wd = hgwMat(o.mat || "oak");
hgwBox(g, w, 0.06, d, o.cloth ? hgwLam(o.cloth) : wd, 0, h - 0.06, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { hgwBox(g, 0.07, h - 0.06, 0.07, wd, q[0] * (w / 2 - 0.08), 0, q[1] * (d / 2 - 0.08)); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = hgwMat(o.mat || "oak");
hgwBox(g, 0.46, 0.05, 0.44, o.seat ? hgwMat(o.seat) : wd, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { hgwBox(g, 0.04, 0.44, 0.04, wd, q[0] * 0.2, 0, q[1] * 0.19); });
hgwBox(g, 0.46, 0.5, 0.04, wd, 0, 0.49, -0.2);
if (o.arm)
[-1, 1].forEach(function (s) { hgwBox(g, 0.05, 0.22, 0.42, wd, s * 0.24, 0.5, 0); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = hgwMat(o.mat || "oak");
hgwBox(g, 1.1, 0.4, 2.0, wd, 0, 0, 0);
hgwBox(g, 1.04, 0.18, 1.94, hgwLam(o.cover || 0xE8E0CC), 0, 0.4, 0);
hgwBox(g, 0.8, 0.12, 0.36, hgwLam(0xF4F0E8), 0, 0.58, -0.7);
hgwBox(g, 1.1, 0.9, 0.06, wd, 0, 0, -1.0);
if (o.posts)
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { hgwBox(g, 0.07, 1.9, 0.07, wd, q[0] * 0.52, 0, q[1] * 0.97); });
return g;
},
function (P, x, z, w, h, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = hgwMat(o.mat || "darkoak"), R = wRand(Math.round(x * 7 + z * 13 + w));
hgwBox(g, w, h, 0.06, wd, 0, 0, -0.16);
[-w / 2, w / 2].forEach(function (s) { hgwBox(g, 0.05, h, 0.36, wd, s, 0, 0); });
var rows = Math.floor(h / 0.42);
for (var r = 0; r <= rows; r++) {
var y = 0.05 + r * (h - 0.1) / rows;
hgwBox(g, w, 0.04, 0.36, wd, 0, y, 0);
if (r === rows)
break;
if (o.jars) {
for (var j = -w / 2 + 0.12; j < w / 2 - 0.1; j += 0.18) {
var jm = new THREE.Mesh(hgwGeo("jar", function () { return new THREE.CylinderGeometry(0.05, 0.055, 0.18, 10); }), R() < 0.5 ? hgwMat("glass") : hgwLam([0x6A8A6A, 0x8A6A3A, 0xC8C0A0][Math.floor(R() * 3)]));
jm.position.set(j, y + 0.13, 0);
g.add(jm);
}
continue;
}
var bx = -w / 2 + 0.06;
while (bx < w / 2 - 0.08) {
var bw = 0.03 + R() * 0.05, bh = 0.22 + R() * 0.12;
hgwBox(g, bw, bh, 0.24, hgwLam([0x6A2A1A, 0x2A3A5A, 0x3A4A2A, 0x5A4020, 0x7A6A4A, 0x2A2A2A][Math.floor(R() * 6)]), bx + bw / 2, y + 0.04, 0.02);
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
var st = hgwMat(o.mat || "ashlar");
hgwBox(g, 1.8, 1.3, 0.5, st, 0, 0, 0);
hgwBox(g, 1.0, 0.8, 0.52, hgwLam(0x141210), 0, 0, 0.02);
hgwBox(g, 2.0, 0.1, 0.6, hgwMat("darkoak"), 0, 1.3, 0.04);
if (o.chimney !== false)
hgwBox(g, 1.4, (o.h || 3.4) - 1.4, 0.4, st, 0, 1.4, -0.04);
if (o.fire !== false) {
var f = hgwFire(g, 0, 0.02, 0.12, 0.6);
}
if (o.pot) {
hgwCyl(g, 0.2, 0.16, 0.26, hgwMat("iron"), 0, 0.3, 0.12, 12);
}
return g;
},
function (P, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
hgwCyl(g, 0.06, 0.07, 0.03, hgwMat(o.brass ? "brass" : "iron"), 0, 0, 0, 10);
hgwCyl(g, 0.018, 0.018, 0.16, hgwLam(0xF4EEDC), 0, 0.03, 0, 8);
var f = new THREE.Mesh(hgwGeo("cflame", function () { return new THREE.ConeGeometry(0.014, 0.05, 6); }), hgwGlowM(0xFFD070, 0.9));
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
var m = hgwMat(o.mat || "darkoak");
hgwBox(g, w, 0.07, d, m, 0, 0.42, 0);
[-1, 1].forEach(function (k) { hgwBox(g, 0.07, 0.42, d * 0.86, m, k * (w / 2 - 0.12), 0, 0); });
if (w > 2.6)
hgwBox(g, 0.07, 0.42, d * 0.86, m, 0, 0, 0);
if (o.back !== false) {
hgwBox(g, w, 0.55, 0.06, m, 0, 0.49, -d / 2 + 0.03);
hgwBox(g, w, 0.05, 0.09, m, 0, 1.03, -d / 2 + 0.04);
}
if (o.cushion)
hgwBox(g, w - 0.1, 0.06, d - 0.06, hgwLam(o.cushion), 0, 0.49, 0.02);
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), hgwM("rug" + col, function () {
var t = hgwCanvas("rugt" + col, 256, 256, function (c, W, H) {
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
hgwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
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
var t = hgwCanvas("pic" + x.toFixed(1) + z.toFixed(1) + w, 128, Math.round(128 * h / w), draw || function (c, W, H) { var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#6A8AB0"); g.addColorStop(0.6, "#D8D0B0"); g.addColorStop(1, "#4A5A30"); c.fillStyle = g; c.fillRect(0, 0, W, H); c.fillStyle = "#5A6A7A"; c.beginPath(); c.moveTo(0, H * 0.7); c.lineTo(W * 0.3, H * 0.35); c.lineTo(W * 0.55, H * 0.6); c.lineTo(W * 0.8, H * 0.3); c.lineTo(W, H * 0.7); c.fill(); });
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
hgwBox(g, w + 0.12, h + 0.12, 0.04, hgwMat("brass"), 0, -h / 2 - 0.06, 0);
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), hgwLam(0xFFFFFF, { map: t, mapk: "pic" + x.toFixed(1) + z.toFixed(1) + w }));
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), hgwGlowM(col));
m.position.z = 0.02;
g.add(m);
hgwBox(g, w + 0.16, 0.08, 0.12, hgwMat("oak"), 0, -h / 2 - 0.04, 0.04);
hgwBox(g, 0.05, h, 0.06, hgwMat("oak"), 0, -h / 2, 0.05);
hgwBox(g, w, 0.04, 0.06, hgwMat("oak"), 0, -0.02, 0.05);
[-1, 1].forEach(function (s) { hgwBox(g, 0.05, h, 0.06, hgwMat("oak"), s * w / 2, -h / 2, 0.05); });
return g;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : hgwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = hgwMat(o.wall || "render"), trim = hgwMat(o.trim || "ashlar"), sh = hgwLam(o.shut || 0x4A6A4A), pane = hgwMat("pane"), lite = hgwLite();
hgwBox(g, w, h, d, wall, 0, 0, 0);
hgwBox(g, w + 0.1, 0.6, d + 0.1, hgwMat("greystone"), 0, 0, 0);
hgwBox(g, w + 0.3, 0.22, d + 0.3, trim, 0, h - 0.22, 0);
var rh = o.rh || Math.min(w, d) * 0.62, roofM = hgwMat(o.roof || "tile");
var rf = new THREE.Mesh(hgwGeo("gab" + w.toFixed(1) + "|" + d.toFixed(1) + "|" + rh.toFixed(1) + (o.hip ? "h" : ""), function () {
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
hgwBox(g, 0.7, rh * 0.9, 0.7, hgwMat("brick"), w * 0.28, h + rh * 0.3, -d * 0.15);
if (o.dormer && !lite)
[-1, 1].forEach(function (s) { var dg = new THREE.Group(); dg.position.set(s * w * 0.22, h + rh * 0.25, d / 2 - rh * 0.3); g.add(dg); hgwBox(dg, 0.9, 0.9, 0.8, wall, 0, 0, 0); hgwBox(dg, 0.6, 0.6, 0.04, pane, 0, 0.15, 0.41); });
var n = Math.max(1, Math.floor(w / 2.6)), floors = Math.max(1, Math.round((h - 0.4) / 3.1));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 0.9 + f * 3.1;
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
hgwBox(g, 1.2, 2.4, 0.1, hgwMat(o.doorM || "darkoak"), wx, 0, d / 2 + 0.02);
hgwBox(g, 1.5, 0.25, 0.16, trim, wx, 2.4, d / 2 + 0.05);
hgwBox(g, 1.6, 0.14, 0.6, hgwMat("greystone"), wx, 0, d / 2 + 0.3);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
hgwBox(g, 1.0, 1.7, 0.08, trim, wx, wy, zz);
hgwBox(g, 0.8, 1.5, 0.06, pane, wx, wy + 0.1, zz + (k ? -0.03 : 0.03));
hgwBox(g, 0.8, 0.04, 0.07, trim, wx, wy + 0.85, zz + (k ? -0.05 : 0.05));
if (!lite)
[-1, 1].forEach(function (s) { hgwBox(g, 0.42, 1.6, 0.05, sh, wx + s * 0.64, wy + 0.05, zz + (k ? -0.07 : 0.07)); });
});
}
hgwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = hgwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = hgwMat(o.wall || "ashlar"), roof = hgwMat(o.roof || "slate"), L = o.len || 30, W = o.w || 13, H = o.h || 13;
hgwBox(g, W, H, L, wall, 0, 0, 0);
var rf = new THREE.Mesh(hgwGeo("chr" + W + "|" + L, function () { var s = new THREE.Shape(); s.moveTo(-W / 2 - 0.4, 0); s.lineTo(0, W * 0.55); s.lineTo(W / 2 + 0.4, 0); s.lineTo(-W / 2 - 0.4, 0); var e = new THREE.ExtrudeGeometry(s, { depth: L + 0.6, bevelEnabled: false }); e.translate(0, 0, -(L + 0.6) / 2); return e; }), roof);
rf.position.y = H;
g.add(rf);
for (var i = 0; i < 5; i++) {
var wz = -L / 2 + 4 + i * (L - 8) / 4;
[-1, 1].forEach(function (s) { hgwBox(g, 0.12, 5, 1.6, hgwMat("pane"), s * (W / 2 + 0.05), 3.5, wz); hgwBox(g, 0.14, 0.4, 1.9, wall, s * (W / 2 + 0.06), 8.5, wz); });
}
var T = o.tower || 6, TH = o.th || 26;
hgwBox(g, T, TH, T, wall, 0, 0, L / 2 + T / 2 - 0.5);
hgwBox(g, T + 0.4, 0.4, T + 0.4, hgwMat("greystone"), 0, TH - 0.4, L / 2 + T / 2 - 0.5);
if (o.clock) {
var cl = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), hgwLam(0xF4F0E4));
cl.position.set(0, TH - 3.5, L / 2 + T - 0.45);
g.add(cl);
var hd = hgwBox(g, 0.08, 0.9, 0.04, hgwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.4);
hd.rotation.z = 0.0;
var md = hgwBox(g, 0.06, 1.1, 0.04, hgwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.38);
md.rotation.z = Math.PI;
g.userData.clock = [hd, md];
}
if (o.dome) {
var dm = new THREE.Mesh(hgwGeo("bulb", function () { var pts = []; for (var k = 0; k <= 12; k++) {
var t = k / 12;
pts.push(new THREE.Vector2(Math.max(0.05, Math.sin(t * Math.PI) * (1.2 - t * 0.6)) * T * 0.45, t * T * 1.1));
} return new THREE.LatheGeometry(pts, 16); }), hgwShine(o.domeCol || 0x4A4A50, 0.4, 0.6));
dm.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(dm);
}
else {
var sp = new THREE.Mesh(hgwGeo("spire" + T, function () { var c = new THREE.ConeGeometry(T * 0.62, T * 2.6, 8); c.translate(0, T * 1.3, 0); return c; }), o.spireM || hgwShine(0xF2F0EA, 0.6, 0.05));
sp.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(sp);
}
hgwBox(g, 2.2, 3.6, 0.2, hgwMat("darkoak"), 0, 0, L / 2 + T - 0.4);
hgwSolid(x, z, W, L, y - 1, y + H + 8, o.ry || 0);
var tz = Math.cos(o.ry || 0) * (L / 2 + T / 2 - 0.5), tx = Math.sin(o.ry || 0) * (L / 2 + T / 2 - 0.5);
hgwSolid(x + tx, z + tz, T, T, y - 1, y + TH + T * 2.6, o.ry || 0);
return g;
},
function (P, x0, z0, x1, z1, h, gate) {
var dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz), ry = Math.atan2(dx, dz) + Math.PI / 2, n = Math.ceil(L / 12), st = hgwMat("greystone");
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, mx = x0 + dx * (t0 + t1) / 2, mz = z0 + dz * (t0 + t1) / 2, seg = L / n;
if (gate && Math.hypot(mx - gate[0], mz - gate[1]) < seg * 0.6)
continue;
hgwBox(P, seg + 0.2, h, 2, st, mx, hgwLand(mx, mz) - 0.5, mz, ry, true);
for (var c = 0; c < 3; c++) {
var cx = mx + Math.cos(ry) * (-seg / 3 + c * seg / 3), cz = mz - Math.sin(ry) * (-seg / 3 + c * seg / 3);
hgwBox(P, 1.2, 0.8, 2, st, cx, hgwLand(mx, mz) - 0.5 + h, cz, ry);
}
}
},
function (P, list, o) {
o = o || {};
if (!list.length)
return;
var lite = hgwLite();
if (lite && list.length > 80)
list = list.filter(function (t, i) { return i % 2 === 0; });
hgwInst(P, hgwGeo("firT", function () { var g = new THREE.CylinderGeometry(0.16, 0.34, 9, 6); g.translate(0, 4.5, 0); return g; }), hgwMat("darkbark"), list, { shadow: !lite });
hgwInst(P, hgwGeo("firC" + (lite ? "l" : ""), function () { var parts = []; var n = lite ? 4 : 7; for (var i = 0; i < n; i++) {
var r = 2.6 - i * (2.2 / n), c = new THREE.ConeGeometry(r, 2.6, lite ? 7 : 10, 1);
c.translate(0, 2.2 + i * 1.15, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), hgwM("firM" + (o.snow ? "s" : ""), function () {
var t = hgwCanvas("needles", 128, 128, function (c, W, H) { c.fillStyle = "#24402A"; c.fillRect(0, 0, W, H); var R = wRand(7); for (var i = 0; i < 1600; i++) {
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
var lite = hgwLite();
hgwInst(P, hgwGeo("birT", function () { var g = new THREE.CylinderGeometry(0.1, 0.16, 8, 6); g.translate(0, 4, 0); return g; }), hgwMat("birch"), list, {});
hgwInst(P, hgwGeo("birC", function () { var parts = [], R = wRand(13); for (var i = 0; i < (lite ? 3 : 6); i++) {
var c = new THREE.IcosahedronGeometry(1.2 + R() * 0.8, 1);
c.translate((R() - 0.5) * 2.4, 6 + R() * 2.6, (R() - 0.5) * 2.4);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), hgwM("birL", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AAA4A, map: hgwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
},
function (P, x, z, r, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, o.y || 0, z);
P.add(g);
var R = wRand(Math.round(x + z));
var geo = hgwGeo("peak" + (o.k || 0), function () { var c = new THREE.ConeGeometry(1, 1, 14, 6); var pa = c.attributes.position, RR = wRand(o.k || 3); for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i);
if (y < 0.49) {
var j = 0.82 + RR() * 0.36;
pa.setX(i, pa.getX(i) * j);
pa.setZ(i, pa.getZ(i) * j);
pa.setY(i, y + (RR() - 0.5) * 0.06);
}
} c.computeVertexNormals(); c.translate(0, 0.5, 0); return c; });
var rock = new THREE.Mesh(geo, o.mat || hgwMat("darkrock"));
rock.scale.set(r, h, r * (o.sz || 1));
g.add(rock);
if (!o.noCap) {
var cap = new THREE.Mesh(geo, hgwMat("snowwall"));
var cs = o.snowLine || 0.45;
cap.scale.set(r * cs * 1.04, h * cs, r * cs * 1.04 * (o.sz || 1));
cap.position.y = h * (1 - cs) + 0.2;
g.add(cap);
}
g.userData.keep = 1;
return g;
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var hull = hgwMat(o.hull || "hull");
var h = new THREE.Mesh(hgwGeo("rowb", function () { var c = new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); c.scale(0.9, 0.55, 2.8); return c; }), hull);
h.position.y = 0.5;
g.add(h);
hgwBox(g, 1.5, 0.06, 0.3, hgwMat("planks"), 0, 0.38, -0.6);
hgwBox(g, 1.5, 0.06, 0.3, hgwMat("planks"), 0, 0.38, 0.8);
[-1, 1].forEach(function (s) { var oar = hgwBox(g, 0.05, 0.05, 2.6, hgwMat("oak"), s * 0.95, 0.5, 0.1); oar.rotation.z = s * 0.2; });
if (o.mast) {
hgwCyl(g, 0.04, 0.05, 3.4, hgwMat("oak"), 0, 0.4, -1.0, 6);
var sl = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), hgwMat("sail"));
sl.position.set(0, 2.4, -0.6);
sl.rotation.y = Math.PI / 2;
g.add(sl);
}
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : hgwLand(x, z), w = o.w || 9, d = o.d || 8, h = o.h || 6.4, lite = hgwLite();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var brick = hgwS("brick", o.brick || 0xB86A4E, 1.4), trim = hgwLam(0xF2EEE2), stone = hgwMat("ashlar"), pane = hgwMat("pane"), slate = hgwMat("slate");
hgwBox(g, w, h, d, brick, 0, 0, 0);
hgwBox(g, w + 0.12, 0.5, d + 0.12, hgwMat("darkstone"), 0, 0, 0);
hgwBox(g, w + 0.2, 0.16, d + 0.2, stone, 0, 3.1, 0);
hgwBox(g, w + 0.3, 0.2, d + 0.3, trim, 0, h - 0.2, 0);
var rh = o.rh || 3.2;
var rf = new THREE.Mesh(hgwGeo("hip" + w + "|" + d + "|" + rh, function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); c.scale(w + 0.8, rh, d + 0.8); return c; }), slate);
rf.position.y = h;
g.add(rf);
[-1, 1].forEach(function (s) { hgwBox(g, 0.9, rh + 1.8, 0.6, brick, s * w * 0.3, h, 0); hgwCyl(g, 0.12, 0.12, 0.5, hgwLam(0xA85A3A), s * w * 0.3 - 0.2, h + rh + 1.8, 0, 8); hgwCyl(g, 0.12, 0.12, 0.5, hgwLam(0xA85A3A), s * w * 0.3 + 0.2, h + rh + 1.8, 0, 8); });
var bx = -w * 0.22;
hgwBox(g, 3.2, h - 0.6, 1.2, brick, bx, 0, d / 2 + 0.6);
var br = hgwBox(g, 3.6, 0.5, 1.6, slate, bx, h - 0.6, d / 2 + 0.6);
br.rotation.x = -0.25;
[0.9, 4.0].forEach(function (wy) { hgwBox(g, 2.6, 1.7, 0.06, trim, bx, wy, d / 2 + 1.22); hgwBox(g, 2.4, 1.5, 0.06, pane, bx, wy + 0.1, d / 2 + 1.25); hgwBox(g, 0.06, 1.5, 0.08, trim, bx - 0.8, wy + 0.1, d / 2 + 1.27); hgwBox(g, 0.06, 1.5, 0.08, trim, bx + 0.8, wy + 0.1, d / 2 + 1.27); });
var dx = w * 0.25;
hgwBox(g, 1.1, 2.4, 0.08, hgwLam(o.door || 0x2A3A2A), dx, 0.2, d / 2 + 0.04);
hgwBox(g, 1.6, 0.14, 1.2, trim, dx, 2.8, d / 2 + 0.6);
[-1, 1].forEach(function (s) { hgwBox(g, 0.1, 2.6, 0.1, trim, dx + s * 0.7, 0.2, d / 2 + 1.1); });
hgwBox(g, 1.6, 0.2, 1.0, stone, dx, 0, d / 2 + 0.6);
hgwBox(g, 0.5, 0.05, 0.4, hgwLam(0xC8B080), dx + 0.3, 1.6, d / 2 + 0.08);
var win = function (wx, wy, zz, rot) { var q = new THREE.Group(); q.position.set(wx, wy, zz); q.rotation.y = rot; g.add(q); hgwBox(q, 1.1, 1.7, 0.06, trim, 0, 0, 0); hgwBox(q, 0.9, 1.5, 0.06, pane, 0, 0.1, 0.02); hgwBox(q, 1.3, 0.12, 0.2, stone, 0, -0.06, 0.06); hgwBox(q, 1.2, 0.16, 0.12, stone, 0, 1.7, 0.03); };
win(dx, 4.0, d / 2 + 0.02, 0);
[-w * 0.25, w * 0.2].forEach(function (wx) { win(wx, 0.9, -d / 2 - 0.02, Math.PI); win(wx, 4.0, -d / 2 - 0.02, Math.PI); });
[-1, 1].forEach(function (s) { win(s * (w / 2 + 0.02), 4.0, 0, s * Math.PI / 2); });
if (o.garden !== false) {
var gz = d / 2 + (o.gd || 6);
hgwBox(g, w + 4, 0.7, 0.3, brick, 0, 0, gz);
hgwBox(g, w + 4.2, 0.1, 0.4, stone, 0, 0.7, gz);
hgwBox(g, 1.2, 0.05, gz - d / 2 - 0.6, hgwMat("gravel"), dx, 0.02, (gz + d / 2) / 2 + 0.3);
if (!lite)
hgwPlant(P, "bush", [{ x: x + Math.cos(o.ry || 0) * (-w * 0.4) + Math.sin(o.ry || 0) * (d / 2 + 3), z: z - Math.sin(o.ry || 0) * (-w * 0.4) + Math.cos(o.ry || 0) * (d / 2 + 3), y: y, s: 0.9, ry: 0 }], { col: 0x2E4A26, keepAll: true });
}
hgwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
g.userData.door = { x: dx, z: d / 2 + 1.6 };
return g;
},
function (P, x, z, n, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : hgwLand(x, z), sw = o.sw || 6, d = o.d || 9, h = o.h || 8.6;
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var names = o.names || ["GROCER", "BUTCHER", "DRAPER", "CHEMIST", "IRONMONGER", "BAKER", "TOBACCONIST", "NEWSAGENT", "BOOTMAKER", "POST OFFICE"], cols = [0x2A3A5A, 0x5A1E1E, 0x2A4A2A, 0x3A2A1A, 0x4A3A5A, 0x1E3A3A], R = wRand(Math.round(x * 3 + z));
var brick = hgwS("brick", 0xA86048, 1.4), slate = hgwMat("slate"), trim = hgwLam(0xF2EEE2), pane = hgwMat("pane");
for (var i = 0; i < n; i++) {
var cx = -((n - 1) * sw) / 2 + i * sw, c = cols[Math.floor(R() * cols.length)], ht = h + (i % 3) * 0.4;
hgwBox(g, sw - 0.05, ht, d, brick, cx, 0, 0);
var rf = new THREE.Mesh(hgwGeo("shr" + sw + "|" + d, function () { var s = new THREE.Shape(); s.moveTo(-d / 2 - 0.3, 0); s.lineTo(0, 2.6); s.lineTo(d / 2 + 0.3, 0); s.lineTo(-d / 2 - 0.3, 0); var e = new THREE.ExtrudeGeometry(s, { depth: sw, bevelEnabled: false }); e.translate(0, 0, -sw / 2); e.rotateY(Math.PI / 2); return e; }), slate);
rf.position.set(cx, ht, 0);
g.add(rf);
hgwBox(g, sw - 0.3, 3.3, 0.12, hgwLam(c), cx, 0, d / 2 + 0.04);
hgwBox(g, sw - 1.6, 2.3, 0.06, pane, cx - 0.5, 0.5, d / 2 + 0.12);
hgwBox(g, 1.0, 2.4, 0.08, hgwLam(0x1E1A16), cx + sw / 2 - 0.9, 0, d / 2 + 0.12);
hgwSign(g, o.names ? names[i % names.length] : names[Math.floor(R() * names.length)], sw - 0.6, 0.62, cx, 3.0, d / 2 + 0.2, 0, { bg: "#" + c.toString(16).padStart(6, "0"), ink: "#F0D890" });
if (!hgwLite()) {
var aw = hgwBox(g, sw - 0.4, 0.06, 1.6, hgwLam([0xC8B080, 0x8A3A2A, 0x3A5A3A][i % 3], { ds: 1 }), cx, 2.7, d / 2 + 0.8);
aw.rotation.x = 0.3;
}
[0, 1].forEach(function (f) { for (var k = -1; k <= 1; k += 2) {
hgwBox(g, 1.0, 1.6, 0.06, trim, cx + k * sw * 0.22, 4.2 + f * 2.4, d / 2 + 0.03);
hgwBox(g, 0.8, 1.4, 0.06, pane, cx + k * sw * 0.22, 4.3 + f * 2.4, d / 2 + 0.06);
} });
}
hgwSolid(x, z, n * sw, d, y - 1, y + h + 3, o.ry || 0);
return g;
},
function (P, pts, hfn) {
var lite = hgwLite();
hgwStrip(P, pts, 7, hfn, hgwMat("gravel"), 0.12);
var sl = [], rl = [];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ry = Math.atan2(b[0] - a[0], b[1] - a[1]), n = Math.floor(L / (lite ? 1.6 : 0.8));
for (var k = 0; k < n; k++) {
var t = k / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t;
[-1.6, 1.6].forEach(function (o) { sl.push({ x: x + Math.cos(ry) * o, z: z - Math.sin(ry) * o, y: hfn(x, z) + 0.16, ry: ry }); });
}
[-2.32, -0.88, 0.88, 2.32].forEach(function (o) { var m = new THREE.Mesh(hgwGeo("rail", function () { return new THREE.BoxGeometry(0.08, 0.14, 1); }), hgwMat("iron")); var mx = (a[0] + b[0]) / 2 + Math.cos(ry) * o, mz = (a[1] + b[1]) / 2 - Math.sin(ry) * o; m.position.set(mx, hfn(mx, mz) + 0.3, mz); m.rotation.y = ry; m.scale.z = L; P.add(m); });
}
hgwInst(P, hgwGeo("sleeper", function () { return new THREE.BoxGeometry(2.4, 0.14, 0.26); }), hgwMat("darkoak"), sl, {});
},
function (P, x, z, len, name, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : hgwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
hgwBox(g, 6, 1.0, len, hgwMat("paving"), 0, 0, 0);
hgwBox(g, 6.1, 0.12, len, hgwMat("ashlar"), 0, 1.0, 0);
for (var i = 0; i < Math.floor(len / 6); i++) {
var cz = -len / 2 + 3 + i * 6;
hgwCyl(g, 0.1, 0.12, 4, hgwLam(0x2A4A3A), 1.6, 1, cz, 8);
}
var cn = hgwBox(g, 5, 0.1, len * 0.7, hgwLam(0xD8D0C0, { ds: 1 }), 0.6, 5.0, 0);
cn.rotation.z = 0.12;
hgwBox(g, 0.2, 0.4, len * 0.7, hgwLam(0x2A4A3A), 3, 4.8, 0);
hgwBox(g, 4, 3.8, 12, hgwS("brick", 0xA86048, 1.4), -1, 1, 0);
hgwBox(g, 4.4, 0.3, 12.4, hgwLam(0xF2EEE2), -1, 4.8, 0);
hgwBox(g, 1.2, 2.3, 0.08, hgwLam(0x2A3A2A), 1.02, 1, 0);
hgwSign(g, name, 5, 0.8, 2.9, 2.6, len / 2 - 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
hgwSign(g, name, 5, 0.8, 2.9, 2.6, -len / 2 + 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
hgwFloor(x, z, 6, len, y + 1.12, {});
hgwSolid(x + Math.cos(o.ry || 0) * (-1), z - Math.sin(o.ry || 0) * (-1), 4, 12, y, y + 5, o.ry || 0);
return g;
},
function (P, x, z, len, w, y, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var br = hgwS("brick", 0x9A5A40, 1.4), rise = o.rise || 1.6, n = 8;
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, z0 = -len / 2 + len * t0, z1 = -len / 2 + len * t1, y0 = Math.sin(t0 * Math.PI) * rise, y1 = Math.sin(t1 * Math.PI) * rise, seg = hgwBox(g, w, 0.5, len / n + 0.05, br, 0, (y0 + y1) / 2 - 0.4, (z0 + z1) / 2);
seg.rotation.x = -Math.atan2(y1 - y0, len / n);
[-1, 1].forEach(function (s) { var pr = hgwBox(g, 0.4, 1.0, len / n + 0.05, br, s * (w / 2 - 0.2), (y0 + y1) / 2, (z0 + z1) / 2); pr.rotation.x = -Math.atan2(y1 - y0, len / n); });
}
var ar = new THREE.Mesh(hgwGeo("arch" + w, function () { var t = new THREE.TorusGeometry(3, 0.6, 6, 12, Math.PI); return t; }), br);
ar.rotation.y = Math.PI / 2;
ar.position.y = -3.2;
g.add(ar);
var ry = o.ry || 0, cx = function (lz) { return x + Math.sin(ry) * lz; }, cz = function (lz) { return z + Math.cos(ry) * lz; };
hgwRamp(cx(-len / 4), cz(-len / 4), w - 0.8, len / 2, y - 0.1, y + rise - 0.1, ry);
hgwRamp(cx(len / 4), cz(len / 4), w - 0.8, len / 2, y + rise - 0.1, y - 0.1, ry);
[-1, 1].forEach(function (s) { hgwSolid(x + Math.cos(ry) * s * (w / 2 - 0.2), z - Math.sin(ry) * s * (w / 2 - 0.2), 0.4, len, y - 1, y + rise + 1.1, ry); });
return g;
},
function (P, x, z, hfn, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var ir = hgwLam(0x1E2A22);
hgwCyl(g, 0.07, 0.12, 3.4, ir, 0, 0, 0, 8);
hgwBox(g, 0.7, 0.06, 0.06, ir, 0, 3.1, 0);
var lt = hgwBox(g, 0.34, 0.5, 0.34, hgwGlowM(o.lit ? 0xFFE0A0 : 0xE8E4D0, o.lit ? 0.95 : 0.6), 0, 3.4, 0);
var cap = new THREE.Mesh(hgwGeo("lampcap", function () { return new THREE.ConeGeometry(0.3, 0.3, 4); }), ir);
cap.position.y = 4.05;
cap.rotation.y = Math.PI / 4;
g.add(cap);
if (o.lit) {
var gl = wGlow(0xFFD890, 0.9, 2.4);
gl.position.y = 3.6;
g.add(gl);
}
hgwRound(x, z, 0.2, hfn(x, z) - 1, hfn(x, z) + 3.5);
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
hgwInst(P, hgwGeo("tpole", function () { var p = new THREE.CylinderGeometry(0.1, 0.14, 8, 6); p.translate(0, 4, 0); var c = new THREE.BoxGeometry(1.6, 0.1, 0.1); c.translate(0, 7.4, 0); var c2 = new THREE.BoxGeometry(1.2, 0.1, 0.1); c2.translate(0, 6.8, 0); return gwMerge([p.toNonIndexed(), c, c2].map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), hgwMat("darkoak"), list, {});
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
hgwInst(P, hgwGeo("drywall", function () { var b = new THREE.BoxGeometry(0.7, 1.1, 2.5); b.translate(0, 0.5, 0); return b; }), hgwMat("granite"), list, {});
list.forEach(function (q) { hgwSolid(q.x, q.z, 0.8, 2.5, q.y - 1, q.y + 1.1, q.ry); });
return;
}
if (o.hedge) {
hgwPlant(P, "bush", list.map(function (q, i) { return { x: q.x, z: q.z, y: q.y - 0.2, s: 0.85 + ((i * 37) % 10) / 40, ry: i * 1.7 }; }), { col: 0x4A6A30, keepAll: true });
return;
}
hgwInst(P, hgwGeo(o.hedge ? "hedge" : "paling", function () { if (o.hedge) {
var h = new THREE.BoxGeometry(0.9, 1.4, 2.5, 2, 2, 2);
h.translate(0, 0.7, 0);
return h;
} var parts = []; for (var j = 0; j < 6; j++) {
var s = new THREE.BoxGeometry(0.06, 1.1, 0.08);
s.translate(0, 0.55, -1.0 + j * 0.4);
parts.push(s);
} var r = new THREE.BoxGeometry(0.05, 0.08, 2.4); r.translate(0, 0.85, 0); parts.push(r); var r2 = r.clone(); r2.translate(0, -0.5, 0); parts.push(r2); return gwMerge(parts.map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), o.hedge ? hgwM("hedgeM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x3A5A2A, map: hgwLeafTex(), alphaTest: 0.3 }); m.userData.noPhoto = 1; return m; }) : hgwLam(o.col || 0xE8E2D2), list, {});
},
function (P, x, z, r, hfn, fires) {
var m = new THREE.Mesh(new THREE.CircleGeometry(r, 18), hgwM("scorch", function () { var mm = new THREE.MeshLambertMaterial({ color: 0x14100C, transparent: true, opacity: 0.85, depthWrite: false }); mm.userData.noPhoto = 1; return mm; }));
m.rotation.x = -Math.PI / 2;
m.position.set(x, hfn(x, z) + 0.05, z);
P.add(m);
var R = wRand(Math.round(x * 7 + z));
for (var i = 0; i < (fires || 0); i++) {
var a = R() * 6.283, d = R() * r * 0.8, fx = x + Math.cos(a) * d, fz = z + Math.sin(a) * d;
var f = hgwFire(P, fx, hfn(fx, fz), fz, 0.6 + R() * 0.8);
f.userData.keep = 1;
}
return m;
},
function (P, list) { if (!list.length)
return; hgwInst(P, hgwGeo("deadT", function () { var t = new THREE.CylinderGeometry(0.12, 0.3, 6, 6); t.translate(0, 3, 0); var b = new THREE.CylinderGeometry(0.05, 0.1, 2.4, 5); b.rotateZ(0.9); b.translate(0.8, 4.2, 0); var b2 = b.clone(); b2.rotateY(2.4); return gwMerge([t.toNonIndexed(), b.toNonIndexed(), b2.toNonIndexed()]); }), hgwLam(0x1A1612), list, {}); },
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : hgwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
var wd = hgwMat(o.mat || "oak"), blk = hgwLam(0x1A1612);
var L = o.len || 2.6, W = o.w || 1.5;
hgwBox(g, W, 0.5, L, wd, 0, 0.8, 0);
if (o.seat)
hgwBox(g, W, 0.5, 0.5, hgwLam(o.seatCol || 0x3A2A1E), 0, 1.3, -0.3);
if (o.load)
for (var i = 0; i < o.load; i++)
hgwBox(g, 0.6, 0.4 + i % 2 * 0.2, 0.6, hgwLam([0x8A6A4A, 0x5A4A3A, 0xC8B898, 0x6A3A2A][i % 4]), -0.4 + (i % 3) * 0.4, 1.3, -0.8 + Math.floor(i / 3) * 0.6);
[-1, 1].forEach(function (s) { var wh = new THREE.Mesh(hgwGeo("cwheel", function () { return new THREE.TorusGeometry(0.75, 0.05, 6, 16); }), blk); wh.position.set(s * (W / 2 + 0.1), 0.75, 0.2); wh.rotation.y = Math.PI / 2; g.add(wh); for (var k = 0; k < 5; k++) {
var sp = hgwBox(g, 0.03, 1.5, 0.03, wd, s * (W / 2 + 0.1), 0, 0.2);
sp.position.y = 0.75;
sp.rotation.x = k / 5 * Math.PI;
} });
[-1, 1].forEach(function (s) { hgwBox(g, 0.06, 0.06, 2.4, wd, s * 0.45, 0.9, -L / 2 - 1.1); });
if (o.horse !== false)
hgwHorse(g, 0, 0, -L / 2 - 2.0, 0, { col: o.hcol || 0x5A3A22, kind: o.kind });
if (!o.nosolid)
hgwSolid(x, z, W + 0.6, L + 2, y - 1, y + 2.2, ry || 0);
return g;
},
function (P, hfn, col, o) {
o = o || {};
var R = o.r || 2600, st = hgwLite() ? 160 : 100, E = o.edge || 820, cl = function (v) { return Math.max(-E, Math.min(E, v)); };
return hgwTerrain(P, -R, -R, 2 * R, 2 * R, st, function (x, z) { var e = Math.max(Math.abs(x), Math.abs(z)), k = hgwSmooth(E, R, e); return hfn(cl(x), cl(z)) * (1 - k) + (o.rise || 18) * k * hgwFbm(x * 0.002, z * 0.002, 2) - 0.6 - 8 * (1 - k); }, hgwMat("meadow"), function (x, z, y, c) { var g = 0.75 + hgwFbm(x * 0.01, z * 0.01, 2) * 0.2, C = typeof col === "number" ? [((col >> 16) & 255) / 255, ((col >> 8) & 255) / 255, (col & 255) / 255] : (col || [0.56, 0.74, 0.42]); c.setRGB(C[0] * g, C[1] * g, C[2] * g); });
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
var lite = hgwLite(), R = wRand(o.seed || 5), L = hgwPathLen(pts), W = o.w || 8, mv = [], g = new THREE.Group();
P.add(g);
g.userData.keep = 1;
g.userData.live = 1;
var dress = o.dress || ["gent", "lady", "maid", "worker", "boy", "girl", "porter", "cabby", "clergy", "newsboy"], n = lite ? Math.round((o.n || 40) * 0.4) : (o.n || 40), nc = lite ? Math.round((o.carts || 8) * 0.5) : (o.carts || 8);
for (var i = 0; i < n; i++) {
var d = dress[Math.floor(R() * dress.length)], kid = d === "boy" || d === "girl", m = hgwDressed((o.seed || 5) * 100 + i, d, { sex: d === "lady" || d === "maid" || d === "girl" ? "f" : "m", child: kid });
g.add(m);
mv.push({ g: m, s: R() * L, off: (R() - 0.5) * W, sp: (o.sp || 1.4) * (0.8 + R() * 0.5) });
}
for (i = 0; i < nc; i++) {
var c = hgwCart(g, 0, 0, 0, { y: 0, nosolid: true, seat: R() < 0.6, load: Math.floor(R() * 6), hcol: [0x5A3A22, 0x2A1E16, 0x8A6A4A, 0x3A3028][i % 4], len: 2 + R() * 1.4 });
mv.push({ g: c, s: R() * L, off: (R() - 0.5) * W * 0.5, sp: (o.sp || 1.4) * (0.9 + R() * 0.3), cart: 1 });
}
var on = true;
HGW.ticks.push(function (dt) { if (!g.parent || !on)
return; mv.forEach(function (M) { M.s += M.sp * dt; if (M.s > L)
M.s -= L; var p = hgwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); }); });
mv.forEach(function (M) { var p = hgwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); });
g.userData.stop = function () { on = false; };
return g;
},
function (r) {
return hgwGeo("hgwheel" + r, function () {
var l = [];
hgwPartG(l, new THREE.TorusGeometry(r, 0.035, 6, 28), 0, 0, 0, 0, Math.PI / 2, 0);
hgwPartG(l, new THREE.TorusGeometry(r - 0.06, 0.03, 5, 24), 0, 0, 0, 0, Math.PI / 2, 0);
for (var k = 0; k < 12; k++) {
var a = k / 12 * Math.PI * 2;
hgwPartG(l, new THREE.CylinderGeometry(0.014, 0.02, r - 0.08, 5), 0, Math.cos(a) * (r - 0.08) / 2, Math.sin(a) * (r - 0.08) / 2, a, 0, 0);
}
hgwPartG(l, new THREE.CylinderGeometry(0.07, 0.08, 0.22, 10), 0, 0, 0, 0, 0, Math.PI / 2);
return gwMerge(l);
});
},
function (P, x, y, z, col) { var g = new THREE.Group(); g.position.set(x, y, z); P.add(g); hgwCyl(g, 0.09, 0.12, 0.3, hgwMat("glass"), 0, 0, 0, 10); for (var i = 0; i < 9; i++) {
var a = i / 9 * 6.28;
var f = new THREE.Mesh(hgwGeo("flw1", function () { return new THREE.SphereGeometry(0.05, 6, 5); }), hgwLam(col || [0xE8505A, 0xF4F0E8, 0xE8C040][i % 3]));
f.position.set(Math.cos(a) * 0.1, 0.42 + (i % 3) * 0.05, Math.sin(a) * 0.1);
g.add(f);
} return g; },
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var w = hgwMat("darkoak");
var d = new THREE.Mesh(hgwGeo("drum", function () { var c = new THREE.CylinderGeometry(0.7, 0.7, 2.4, 14); c.rotateZ(Math.PI / 2); return c; }), w);
d.position.y = 1.0;
g.add(d);
[-1.3, 1.3].forEach(function (s) { hgwBox(g, 0.16, 1.8, 0.16, w, s, 0, 0); });
for (var i = 0; i < 4; i++)
hgwCyl(g, 0.02, 0.02, 5, hgwMat("rope"), -0.9 + i * 0.6, 1.0, 0, 4);
return g;
},
function (P, x, y, z, o) {
o = o || {};
var b = new THREE.Mesh(hgwGeo("barrel", function () { var p = []; for (var k = 0; k <= 8; k++) {
var t = k / 8;
p.push(new THREE.Vector2(0.36 + Math.sin(t * Math.PI) * 0.08, t * 1.0));
} return new THREE.LatheGeometry(p, 12); }), hgwMat("oak"));
b.position.set(x, y, z);
if (o.lie) {
b.rotation.z = Math.PI / 2;
b.position.y = y + 0.42;
b.position.x = x + 0.5;
}
P.add(b);
if (!hgwLite())
[0.15, 0.85].forEach(function (h) { var r = new THREE.Mesh(hgwGeo("bhoop", function () { return new THREE.TorusGeometry(0.42, 0.02, 4, 14); }), hgwMat("iron")); r.rotation.x = Math.PI / 2; r.position.y = h; b.add(r); });
return b;
},
function (key, o) {
o = o || {};
var C = HGW_COAST[key], S = HGW_SC[key], B = (S ? S.bound : 1200) + 500, cell = hgwLite() ? 14 : 9, N = Math.ceil(2 * B / cell) + 1;
var rings = (C ? C.rings : []).map(function (r) { var p = []; for (var i = 0; i + 1 < r.length; i += 2)
p.push([r[i], r[i + 1]]); if (p.length > 1 && p[0][0] === p[p.length - 1][0] && p[0][1] === p[p.length - 1][1])
p.pop(); return hgwChaikin(p, 2); });
(o.extra || []).forEach(function (r) { rings.push(hgwChaikin(r, 2)); });
var ins = new Uint8Array(N * N), INF = 1e9, dI = new Float32Array(N * N), dO = new Float32Array(N * N);
for (var j = 0; j < N; j++) {
var z = -B + j * cell, xs = [];
rings.forEach(function (p) { for (var i = 0; i < p.length; i++) {
var a = p[i], b = p[(i + 1) % p.length];
if ((a[1] > z) !== (b[1] > z))
xs.push(a[0] + (z - a[1]) / (b[1] - a[1]) * (b[0] - a[0]));
} });
xs.sort(function (a, b) { return a - b; });
for (var q = 0; q + 1 < xs.length; q += 2) {
var i0 = Math.max(0, Math.ceil((xs[q] + B) / cell)), i1 = Math.min(N - 1, Math.floor((xs[q + 1] + B) / cell));
for (var i = i0; i <= i1; i++)
ins[j * N + i] = 1;
}
}
if (o.all)
ins.fill(1);
for (var k = 0; k < N * N; k++) {
dI[k] = ins[k] ? INF : 0;
dO[k] = ins[k] ? 0 : INF;
}
var d1 = cell, d2 = cell * 1.4142, pass = function (D) {
var x, y, i, v;
for (y = 0; y < N; y++)
for (x = 0; x < N; x++) {
i = y * N + x;
v = D[i];
if (!v)
continue;
if (x > 0)
v = Math.min(v, D[i - 1] + d1);
if (y > 0) {
v = Math.min(v, D[i - N] + d1);
if (x > 0)
v = Math.min(v, D[i - N - 1] + d2);
if (x < N - 1)
v = Math.min(v, D[i - N + 1] + d2);
}
D[i] = v;
}
for (y = N - 1; y >= 0; y--)
for (x = N - 1; x >= 0; x--) {
i = y * N + x;
v = D[i];
if (!v)
continue;
if (x < N - 1)
v = Math.min(v, D[i + 1] + d1);
if (y < N - 1) {
v = Math.min(v, D[i + N] + d1);
if (x < N - 1)
v = Math.min(v, D[i + N + 1] + d2);
if (x > 0)
v = Math.min(v, D[i + N - 1] + d2);
}
D[i] = v;
}
};
pass(dI);
pass(dO);
var sd = function (x, z) {
var fx = (x + B) / cell, fz = (z + B) / cell;
if (fx < 0 || fz < 0 || fx >= N - 1 || fz >= N - 1)
return o.all ? 400 : -400;
var i = Math.floor(fx), j = Math.floor(fz), u = fx - i, v = fz - j, k = j * N + i;
var s = function (q) { return ins[q] ? dI[q] : -dO[q]; };
return (s(k) * (1 - u) + s(k + 1) * u) * (1 - v) + (s(k + N) * (1 - u) + s(k + N + 1) * u) * v;
};
var hill = o.hill != null ? o.hill : 60, beach = o.beach || 22, deep = o.deep || -22, rough = o.rough != null ? o.rough : 1;
var Hraw = function (x, z) { var fl = o.flat; o.flat = null; var h = H(x, z); o.flat = fl; return h; };
var H = function (x, z) {
var d = sd(x, z) + (hgwFbm(x * 0.004 + 7, z * 0.004, 3) - 0.5) * 46 * rough;
var h;
if (d < 0)
h = Math.max(deep, d * 0.16) - 0.6;
else {
h = 0.4 + Math.min(d, beach) * 0.07 + hill * hgwSmooth(beach, beach + (o.rise || 260), d) * (0.35 + 0.9 * hgwFbm(x * 0.0024, z * 0.0024, 4)) + hgwSmooth(beach, beach + 80, d) * hgwFbm(x * 0.03, z * 0.03, 2) * 1.6;
}
if (o.shape)
h = o.shape(x, z, h, d);
if (o.peaks)
o.peaks.forEach(function (p) { var q = Math.hypot(x - p[0], z - p[1]); if (q < p[2]) {
var pk = p[3] * Math.pow(1 - q / p[2], 1.6) * (d > 0 ? 1 : 0.3);
if (o.crag) {
var rn = 1 - Math.abs(2 * hgwFbm(x * 0.006 + p[0] * 0.001, z * 0.006, 4) - 1), sp = hgwFbm(x * 0.02, z * 0.02, 2);
pk *= 0.55 + 0.7 * rn * rn + 0.15 * sp;
}
h += pk;
} });
if (o.flat)
o.flat.forEach(function (f) { var q = Math.hypot(x - f[0], z - f[1]); if (q < f[2]) {
if (f[3] == null)
f[3] = Hraw(f[0], f[1]);
h = h + (f[3] - h) * Math.min(1, (1 - q / f[2]) * 2.2);
} });
return h;
};
H.sd = sd;
return H;
},
function (H, o) {
o = o || {};
return function (x, z, y, c) {
var d = H.sd ? H.sd(x, z) : 50, g = 0.84 + hgwFbm(x * 0.03, z * 0.03, 2) * 0.24, dry = o.dry || 0.4;
if (y < -0.4) {
c.setRGB(0.62 * g, 0.58 * g, 0.48 * g);
return;
}
if (d < (o.beach || 22) * 0.7 || y < 1.1) {
c.setRGB(0.93 * g, 0.85 * g, 0.66 * g);
return;
}
var slope = Math.abs(H(x + 3, z) - H(x - 3, z)) + Math.abs(H(x, z + 3) - H(x, z - 3));
if (slope > 4.4 || y > (o.rock || 90)) {
var r = 0.78 * g;
c.setRGB(r, r * 0.96, r * 0.9);
return;
}
var t = hgwFbm(x * 0.008 + 3, z * 0.008, 3);
if (t < dry) {
c.setRGB(0.74 * g, 0.68 * g, 0.44 * g);
return;
}
c.setRGB(0.5 * g, 0.58 * g, 0.36 * g);
};
},
function (G, H, o) {
o = o || {};
var s = HGW_SC[HGW.sc], B = (s ? s.bound : 1200) + 420, lite = hgwLite();
var cfn = o.cfn || hgwGreekColour(H, o);
hgwTerrain(G, -B, -B, 2 * B, 2 * B, lite ? 16 : 9, H, hgwMat(o.mat || "maquis"), cfn);
var F = B + 1500;
hgwTerrain(G, -F, -F, 2 * F, 2 * F, lite ? 120 : 80, function (x, z) { var e = Math.max(Math.abs(x), Math.abs(z)); if (e < B - 40)
return -40; return H(x, z) - (e < B + 30 ? 2 : 0); }, hgwMat(o.mat || "maquis"), cfn);
},
function (G, H, o) {
o = o || {};
var s = HGW_SC[HGW.sc], B = s ? s.bound : 1200, lite = hgwLite(), clear = o.clear || [], roads = o.roads || [];
var ok = function (min, max) {
return function (x, z) {
var d = H.sd ? H.sd(x, z) : 99;
if (d < min || d > max)
return false;
for (var i = 0; i < clear.length; i++) {
var c = clear[i];
if (Math.hypot(x - c[0], z - c[1]) < c[2])
return false;
}
for (var r = 0; r < roads.length; r++)
if (hgwPathD(x, z, roads[r]) < 8)
return false;
return true;
};
};
var n = function (k) { return Math.round((o[k] != null ? o[k] : 1) * (lite ? 0.45 : 1.4)); };
hgwPlant(G, "olive", hgwScatter(101, n("olive") * 160, -B, -B, B, B, ok(40, 500), H, 0.8, 1.3), {});
hgwPlant(G, "cypress", hgwScatter(102, n("cypress") * 50, -B, -B, B, B, ok(40, 900), H, 0.8, 1.4), {});
hgwPlant(G, "pine", hgwScatter(103, n("pine") * 40, -B, -B, B, B, ok(20, 300), H, 0.7, 1.2), {});
hgwPlant(G, "tree", hgwScatter(104, n("oak") * 50, -B, -B, B, B, ok(200, 2000), H, 0.7, 1.1), { col: 0x4A6A34 });
hgwPlant(G, "maquis", hgwScatter(105, n("maquis") * 700, -B, -B, B, B, ok(16, 3000), H, 0.7, 1.6), {});
hgwPlant(G, "grass", hgwScatter(106, n("grass") * 900, -B, -B, B, B, ok(12, 3000), H, 0.6, 1.2), { col: o.grassCol || 0x6E6A3C });
hgwPlant(G, "flowers", hgwScatter(107, n("flowers") * 260, -B, -B, B, B, ok(20, 600), H, 0.6, 1.0), { col: "#E8D040" });
hgwPlant(G, "asphodel", hgwScatter(108, n("flowers") * 160, -B, -B, B, B, ok(30, 800), H, 0.6, 1.0), {});
hgwPlant(G, "rock", hgwScatter(109, n("rock") * 120, -B, -B, B, B, ok(-6, 3000), H, 0.6, 2.6), { mat: hgwMat("lime"), keepAll: true });
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : hgwLand(x, z), dr = hgwDrop(x, z, w + (o.court ? 2 : 0), d + (o.court ? (o.courtD || 6) * 2 : 0), o.ry, y);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = hgwMat(o.wall || (o.r2 != null && o.r2 < 0.5 ? "mudbrick" : "whitewash")), foot = hgwMat("lime");
hgwBox(g, w + 0.3, 0.7 + dr, d + 0.3, foot, 0, -0.3 - dr, 0);
hgwBox(g, w, h, d, wall, 0, 0.4, 0);
if (o.tile) {
var rf = new THREE.Mesh(hgwGeo("gkroof", function () { var s = new THREE.Shape(); s.moveTo(-0.5, 0); s.lineTo(0, 0.22); s.lineTo(0.5, 0); s.lineTo(-0.5, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false }); e.translate(0, 0, -0.5); return e; }), hgwMat("redtile"));
rf.scale.set(w + 0.8, w + 0.8, d + 0.8);
rf.position.y = h + 0.4;
g.add(rf);
}
else {
hgwBox(g, w + 0.2, 0.25, d + 0.2, hgwMat("beaten"), 0, h + 0.4, 0);
[[0, d / 2], [0, -d / 2]].forEach(function (p) { hgwBox(g, w + 0.2, 0.5, 0.25, wall, 0, h + 0.6, p[1]); });
[[w / 2, 0], [-w / 2, 0]].forEach(function (p) { hgwBox(g, 0.25, 0.5, d, wall, p[0], h + 0.6, 0); });
if (!hgwLite())
for (var b = 0; b < Math.floor(w / 1.2); b++) {
var bm = new THREE.Mesh(hgwGeo("gkbeam", function () { var c = new THREE.CylinderGeometry(0.08, 0.08, 0.5, 5); c.rotateX(Math.PI / 2); return c; }), hgwMat("darkoak"));
bm.position.set(-w / 2 + 0.6 + b * 1.2, h + 0.25, d / 2 + 0.2);
g.add(bm);
}
}
hgwBox(g, 1.1, 2.1, 0.12, hgwMat("oak"), o.door || 0, 0.4, d / 2 + 0.02);
hgwBox(g, 1.4, 0.18, 0.3, hgwMat("lime"), o.door || 0, 2.5, d / 2 + 0.05);
for (var i = 0; i < Math.max(1, Math.floor(w / 4)); i++) {
var wx = -w / 2 + (i + 0.5) * w / Math.max(1, Math.floor(w / 4));
if (Math.abs(wx - (o.door || 0)) < 1.2)
continue;
hgwBox(g, 0.6, 0.5, 0.1, hgwLam(0x1E1810), wx, h - 0.7, d / 2 + 0.02);
}
if (o.court) {
var cw = o.court, cd = o.courtD || 6, wm = wall;
hgwBox(g, 0.4, 1.8 + dr, cd, wm, -cw / 2, -dr, d / 2 + cd / 2);
hgwBox(g, 0.4, 1.8 + dr, cd, wm, cw / 2, -dr, d / 2 + cd / 2);
hgwBox(g, (cw - 2) / 2, 1.8 + dr, 0.4, wm, -cw / 4 - 0.5, -dr, d / 2 + cd);
hgwBox(g, (cw - 2) / 2, 1.8 + dr, 0.4, wm, cw / 4 + 0.5, -dr, d / 2 + cd);
hgwSolid(x + Math.cos(o.ry || 0) * (-cw / 2) + Math.sin(o.ry || 0) * (d / 2 + cd / 2), z - Math.sin(o.ry || 0) * (-cw / 2) + Math.cos(o.ry || 0) * (d / 2 + cd / 2), 0.5, cd, y - 1, y + 2, o.ry || 0);
}
hgwSolid(x, z, w + 0.3, d + 0.3, y - 1, y + h + 3, o.ry || 0);
return g;
},
function (P, x, y, z, h, r, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
if (o.wood) {
var c = new THREE.Mesh(hgwGeo("mcol" + h + r, function () { return new THREE.CylinderGeometry(r * 1.15, r * 0.85, h, 12); }), hgwMat(o.mat || "redpaint"));
c.position.y = h / 2;
g.add(c);
var cap = new THREE.Mesh(hgwGeo("mcap" + r, function () { return new THREE.CylinderGeometry(r * 1.6, r * 1.2, 0.35, 12); }), hgwLam(0x1E1A2A));
cap.position.y = h - 0.1;
g.add(cap);
hgwBox(g, r * 3.4, 0.28, r * 3.4, hgwLam(0x1E1A2A), 0, h + 0.05, 0);
return g;
}
var s = new THREE.Mesh(hgwGeo("dcol" + h + r, function () { return new THREE.CylinderGeometry(r * 0.82, r, h, 16); }), hgwMat(o.mat || "lime"));
s.position.y = h / 2;
g.add(s);
var ec = new THREE.Mesh(hgwGeo("dech" + r, function () { return new THREE.CylinderGeometry(r * 1.25, r * 0.85, 0.32, 16); }), hgwMat(o.mat || "lime"));
ec.position.y = h + 0.16;
g.add(ec);
hgwBox(g, r * 2.6, 0.24, r * 2.6, hgwMat(o.mat || "lime"), 0, h + 0.32, 0);
return g;
},
function (P, x, z, w, d, o) {
o = o || {};
var y = o.y != null ? o.y : hgwLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var st = hgwMat(o.mat || "lime");
var dr = hgwDrop(x, z, w + 2.4, d + 2.4, o.ry, y);
if (dr > 0.2)
hgwBox(g, w + 2.6, dr + 0.2, d + 2.6, hgwMat("cyclopean"), 0, -0.2 - dr, 0);
for (var s = 0; s < 3; s++)
hgwBox(g, w + 2.4 - s * 0.8, 0.4, d + 2.4 - s * 0.8, st, 0, -0.2 + s * 0.4, 0);
var h = o.h || Math.max(4.5, w * 0.45), nc = Math.max(4, Math.round(w / 2.4)), nd = Math.max(5, Math.round(d / 2.4)), r = Math.min(0.55, w / nc * 0.22), top = 1.0;
for (var i = 0; i < nc; i++) {
var cx = -w / 2 + r + i * (w - 2 * r) / (nc - 1);
[d / 2 - r, -d / 2 + r].forEach(function (cz) { hgwColumn(g, cx, top, cz, h, r, { mat: o.mat }); });
}
for (var j = 1; j < nd - 1; j++) {
var cz2 = -d / 2 + r + j * (d - 2 * r) / (nd - 1);
[w / 2 - r, -w / 2 + r].forEach(function (cx2) { hgwColumn(g, cx2, top, cz2, h, r, { mat: o.mat }); });
}
hgwBox(g, w - 3, h, d - 5.2, hgwMat(o.cella || "lime"), 0, top, -0.4);
hgwBox(g, 1.8, h * 0.7, 0.2, hgwMat("darkoak"), 0, top, d / 2 - 2.55);
hgwBox(g, w + 0.4, 0.9, d + 0.4, st, 0, top + h + 0.4, 0);
var rf = new THREE.Mesh(hgwGeo("gkroof", function () { var s2 = new THREE.Shape(); s2.moveTo(-0.5, 0); s2.lineTo(0, 0.22); s2.lineTo(0.5, 0); s2.lineTo(-0.5, 0); var e = new THREE.ExtrudeGeometry(s2, { depth: 1, bevelEnabled: false }); e.translate(0, 0, -0.5); return e; }), hgwMat("redtile"));
rf.scale.set(w + 1.2, w + 1.2, d + 1.2);
rf.position.y = top + h + 1.3;
g.add(rf);
[d / 2 + 0.62, -d / 2 - 0.62].forEach(function (pz) { var pd = new THREE.Mesh(hgwGeo("gkped", function () { var s3 = new THREE.Shape(); s3.moveTo(-0.5, 0); s3.lineTo(0, 0.2); s3.lineTo(0.5, 0); s3.lineTo(-0.5, 0); return new THREE.ShapeGeometry(s3); }), hgwLam(o.ped || 0xD8CCB4, { ds: 1 })); pd.scale.set(w + 0.6, w + 0.6, 1); pd.position.set(0, top + h + 1.32, pz); g.add(pd); });
if (o.statue) {
var sg = hgwDressed("tst" + x + z, o.statue, { sex: o.statueSex || "f" });
sg.scale.setScalar(2.2);
sg.position.set(0, top + 0.1, -d / 2 + 3.2);
g.add(sg);
g.userData.live = 1;
}
hgwSolid(x, z, w - 2.8, d - 5, y - 1, y + top + h + 2, o.ry || 0);
hgwFloor(x, z, w + 2.4, d + 2.4, y + 1.0, { rot: o.ry || 0 });
return g;
},
function (P, pts, h, hfn, o) {
o = o || {};
var lite = hgwLite(), m = hgwMat(o.mat || "cyclopean"), th = o.th || 3.2;
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ry = Math.atan2(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / (lite ? 14 : 8)));
for (var k = 0; k < n; k++) {
var t = (k + 0.5) / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t;
if (o.gate && o.gate.some(function (q) { return Math.hypot(x - q[0], z - q[1]) < q[2]; }))
continue;
var y = hfn(x, z);
var seg = hgwBox(P, th, h + 1.2, L / n + 0.25, m, x, y - 1.2, z, ry);
seg.rotation.y = ry;
hgwSolid(x, z, th, L / n + 0.3, y - 2, y + h, ry);
if (o.tower && k % Math.max(3, Math.round(60 / (L / n))) === 0) {
hgwBox(P, th + 3, h + 5, th + 3, m, x, y - 1.2, z, ry);
hgwSolid(x, z, th + 3, th + 3, y - 2, y + h + 5, ry);
}
}
}
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var L = o.len || 20, W = L * 0.16, pitch = hgwMat("pitch"), oak = hgwMat("planks"), lite = hgwLite();
var hull = new THREE.Mesh(hgwGeo("ship" + L, function () {
var s = new THREE.Shape();
s.moveTo(-W / 2, 0.5);
s.quadraticCurveTo(-W / 2, -0.4, 0, -0.55);
s.quadraticCurveTo(W / 2, -0.4, W / 2, 0.5);
s.lineTo(W / 2 - 0.12, 0.5);
s.quadraticCurveTo(W / 2 - 0.12, -0.25, 0, -0.4);
s.quadraticCurveTo(-W / 2 + 0.12, -0.25, -W / 2 + 0.12, 0.5);
s.lineTo(-W / 2, 0.5);
var e = new THREE.ExtrudeGeometry(s, { depth: L, bevelEnabled: false, steps: 16 });
e.translate(0, 0, -L / 2);
var pa = e.attributes.position;
for (var i = 0; i < pa.count; i++) {
var zz = pa.getZ(i) / (L / 2), k = 1 - Math.pow(Math.abs(zz), 3) * 0.85;
pa.setX(i, pa.getX(i) * k);
pa.setY(i, pa.getY(i) + Math.pow(Math.abs(zz), 4) * 0.9);
}
e.computeVertexNormals();
return e;
}), pitch);
g.add(hull);
hgwBox(g, W * 0.8, 0.06, L * 0.8, oak, 0, 0.3, 0);
for (var b = 0; b < (lite ? 5 : 9); b++)
hgwBox(g, W * 0.8, 0.08, 0.3, oak, 0, 0.5, -L * 0.36 + b * L * 0.09);
var bow = new THREE.Mesh(hgwGeo("shipbow" + L, function () { return hgwTaper([[0, 0.6, L / 2 - 0.4], [0, 1.8, L / 2 + 0.4], [0, 2.4, L / 2 + 0.7]], [0.14, 0.11, 0.07], 6, 6); }), pitch);
g.add(bow);
var st = new THREE.Mesh(hgwGeo("shipst" + L, function () { return hgwTaper([[0, 0.6, -L / 2 + 0.4], [0, 1.6, -L / 2 - 0.3], [0, 2.8, -L / 2 - 0.2], [0, 3.2, -L / 2 + 0.4]], [0.16, 0.12, 0.09, 0.05], 8, 6); }), pitch);
g.add(st);
[-1, 1].forEach(function (s) {
var e = new THREE.Mesh(hgwGeo("shipeye", function () { return new THREE.CircleGeometry(0.22, 14); }), hgwLam(0xF4F0E4, { ds: 1 }));
e.position.set(s * (W * 0.16 + 0.08), 0.75, L / 2 - 1.0);
e.rotation.y = s * Math.PI / 2;
g.add(e);
var p = new THREE.Mesh(hgwGeo("shipeyep", function () { return new THREE.CircleGeometry(0.1, 12); }), hgwLam(0x1A1A1A, { ds: 1 }));
p.position.set(s * (W * 0.16 + 0.1), 0.75, L / 2 - 0.98);
p.rotation.y = s * Math.PI / 2;
g.add(p);
hgwBox(g, 0.05, 0.3, L * 0.5, hgwMat("redpaint"), s * (W * 0.32), 0.3, 0);
});
if (o.oars !== false)
for (var r = 0; r < (lite ? 6 : 10); r++)
[-1, 1].forEach(function (s) { var oar = new THREE.Mesh(hgwGeo("shipoar", function () { var c = new THREE.CylinderGeometry(0.035, 0.035, 4.2, 5); c.rotateZ(Math.PI / 2); return c; }), hgwMat("oak")); oar.position.set(s * (W / 2 + 1.4), 0.25, -L * 0.32 + r * L * 0.07); oar.rotation.z = s * (o.afloat ? 0.32 : 0.12); g.add(oar); });
if (o.mast !== false) {
var mh = L * 0.5;
hgwCyl(g, 0.12, 0.15, mh, hgwMat("oak"), 0, 0.4, 0, 7);
if (o.sail) {
var yd = new THREE.Mesh(hgwGeo("shipyard" + L, function () { var c = new THREE.CylinderGeometry(0.08, 0.08, W * 2.8, 6); c.rotateZ(Math.PI / 2); return c; }), hgwMat("oak"));
yd.position.y = mh;
g.add(yd);
var sl = new THREE.Mesh(hgwGeo("shipsail" + L, function () { var p = new THREE.PlaneGeometry(W * 2.6, mh * 0.55, 6, 4); var pa = p.attributes.position; for (var i = 0; i < pa.count; i++)
pa.setZ(i, Math.cos(pa.getX(i) / (W * 1.3) * 1.4) * 0.6); p.computeVertexNormals(); return p; }), hgwLam(o.sailCol || 0xE8DCC0, { ds: 1 }));
sl.position.set(0, mh - mh * 0.3, 0.3);
g.add(sl);
}
}
if (!o.afloat)
hgwSolid(x, z, W + 0.6, L, y - 1, y + 3, ry || 0);
return g;
},
function (P, x, y, z, s) { var m = new THREE.Mesh(hgwGeo("pithos", function () { var pts = []; for (var i = 0; i <= 10; i++) {
var t = i / 10;
pts.push(new THREE.Vector2(0.18 + Math.sin(t * Math.PI) * 0.42 + (t > 0.9 ? 0.06 : 0), t * 1.6));
} return new THREE.LatheGeometry(pts, 14); }), hgwS("b:terracotta", 0xC8845A, 1)); m.position.set(x, y, z); m.scale.setScalar(s || 1); P.add(m); return m; },
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var b = hgwMat("bronze");
var bowl = new THREE.Mesh(hgwGeo("tripb", function () { return new THREE.SphereGeometry(0.4, 14, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); }), b);
bowl.position.y = 1.0;
g.add(bowl);
for (var i = 0; i < 3; i++) {
var a = i / 3 * 6.283, l = new THREE.Mesh(hgwGeo("tripl", function () { return new THREE.CylinderGeometry(0.03, 0.03, 1.05, 5); }), b);
l.position.set(Math.cos(a) * 0.3, 0.5, Math.sin(a) * 0.3);
l.rotation.set(Math.sin(a) * 0.15, 0, -Math.cos(a) * 0.15);
g.add(l);
var h = new THREE.Mesh(hgwGeo("triph", function () { return new THREE.TorusGeometry(0.12, 0.02, 5, 10); }), b);
h.position.set(Math.cos(a) * 0.38, 1.12, Math.sin(a) * 0.38);
h.rotation.y = -a;
g.add(h);
}
return g;
},
function (P, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var w = hgwMat("oak");
hgwBox(g, 0.12, 2.3, 0.12, w, -0.9, 0, 0);
hgwBox(g, 0.12, 2.3, 0.12, w, 0.9, 0, 0);
hgwBox(g, 2.0, 0.1, 0.1, w, 0, 2.2, 0);
hgwBox(g, 1.7, 1.7, 0.02, hgwLam(col || 0xD8C8A8, { ds: 1 }), 0, 0.4, 0.02);
for (var i = 0; i < 12; i++) {
var wt = new THREE.Mesh(hgwGeo("loomw", function () { return new THREE.CylinderGeometry(0.05, 0.06, 0.12, 6); }), hgwS("b:terracotta", 0xB87A5A, 1));
wt.position.set(-0.8 + i * 0.145, 0.3, 0.06);
g.add(wt);
}
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var m = hgwMat(o.mat || "darkoak"), t = hgwMat(o.trim || "gold");
hgwBox(g, 0.9, 0.5, 0.8, m, 0, 0, 0);
hgwBox(g, 0.9, 1.3, 0.12, m, 0, 0.5, -0.36);
hgwBox(g, 0.92, 0.06, 0.82, t, 0, 0.5, 0);
hgwBox(g, 0.08, 0.4, 0.7, m, -0.43, 0.5, 0);
hgwBox(g, 0.08, 0.4, 0.7, m, 0.43, 0.5, 0);
hgwBox(g, 0.6, 0.12, 0.4, m, 0, 0, 0.6);
return g;
},
function (P, x, z, s, o) {
o = o || {};
s = s || 1;
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
var h = new THREE.Mesh(hgwGeo("hhearth", function () { return new THREE.CylinderGeometry(1.8, 1.9, 0.3, 24); }), hgwS("b:stucco", 0xE0C8A8, 2));
h.scale.setScalar(s);
h.position.y = 0.15;
g.add(h);
var r = new THREE.Mesh(hgwGeo("hhring", function () { return new THREE.TorusGeometry(1.85, 0.08, 6, 32); }), hgwMat("redpaint"));
r.rotation.x = Math.PI / 2;
r.scale.setScalar(s);
r.position.y = 0.3;
g.add(r);
if (o.fire !== false)
hgwFire(g, 0, 0.3, 0, 1.1 * s);
if (o.cols)
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { hgwColumn(g, q[0] * 3.6 * s, 0, q[1] * 3.6 * s, o.h || 5.6, 0.32, { wood: true }); hgwRound(x + q[0] * 3.6 * s, z + q[1] * 3.6 * s, 0.4); });
return g;
},
function (P, x, y, z, ry, col) {
var g = hgwSheep(P, x, y, z, ry);
if (!g)
return null;
g.scale.set(0.85, 0.9, 0.85);
g.traverse(function (m) { if (m.isMesh && m.material && m.material.color && m.material.color.getHex() === 0xE8E2D4)
m.material = hgwLam(col || 0x8A6A4A); });
[-1, 1].forEach(function (s) { var h = new THREE.Mesh(hgwGeo("gthorn", function () { var c = new THREE.ConeGeometry(0.04, 0.3, 5); c.rotateX(-0.9); return c; }), hgwLam(0x3A3028)); h.position.set(s * 0.06, 0.98, -0.5); g.add(h); });
return g;
},
function (P, x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var m = hgwLam(0x4A3A30);
var b = new THREE.Mesh(hgwGeo("pigb", function () { return new THREE.SphereGeometry(0.42, 12, 9); }), m);
b.scale.set(0.8, 0.75, 1.35);
b.position.y = 0.55;
g.add(b);
var h = new THREE.Mesh(hgwGeo("pigh", function () { return new THREE.SphereGeometry(0.22, 10, 8); }), m);
h.position.set(0, 0.58, 0.6);
g.add(h);
var sn = new THREE.Mesh(hgwGeo("pigs", function () { return new THREE.CylinderGeometry(0.08, 0.1, 0.14, 8); }), hgwLam(0x6A4A40));
sn.rotation.x = Math.PI / 2;
sn.position.set(0, 0.52, 0.8);
g.add(sn);
[[-0.18, 0.32], [0.18, 0.32], [-0.18, -0.32], [0.18, -0.32]].forEach(function (p) { var l = new THREE.Mesh(hgwGeo("pigl", function () { return new THREE.CylinderGeometry(0.06, 0.05, 0.34, 6); }), m); l.position.set(p[0], 0.17, p[1]); g.add(l); });
[-1, 1].forEach(function (s) { var e = new THREE.Mesh(hgwGeo("pige", function () { return new THREE.ConeGeometry(0.07, 0.14, 4); }), m); e.position.set(s * 0.12, 0.78, 0.6); g.add(e); });
return g;
},
function (P, kind, cx, cz, r, n, hfn, seed) {
var R = wRand(seed || 7), lite = hgwLite(), out = [];
n = lite ? Math.ceil(n * 0.5) : n;
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = R() * r, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d, y = hfn(x, z), ry = R() * 6.283, g = null;
if (kind === "goat")
g = hgwGoat(P, x, y, z, ry, [0x8A6A4A, 0x2A2420, 0xE8E0D0, 0x6A5A4A][i % 4]);
else if (kind === "pig")
g = hgwPig(P, x, y, z, ry);
else if (kind === "sheep")
g = hgwSheep(P, x, y, z, ry);
else if (kind === "cow")
g = hgwPlainBeast(P, x, y, z, ry, { kind: "cow" });
else if (kind === "horse")
g = hgwHorse(P, x, y, z, ry, {});
if (g)
out.push(g);
}
return out;
},
function (G, H, o) {
var R = wRand(o.seed || 31), put = [], n = 0, lite = hgwLite(), want = lite ? Math.ceil((o.n || 40) * 0.45) : (o.n || 40), roads = o.roads || [], av = o.avoid || [], bx = o.boxes || [];
var free = function (x, z, r) {
if (H.sd && H.sd(x, z) < (o.sdMin || 10))
return false;
for (var q = 0; q < roads.length; q++)
if (hgwPathD(x, z, roads[q]) < r * 0.6 + (o.lane || 3))
return false;
for (var a = 0; a < av.length; a++)
if (Math.hypot(x - av[a][0], z - av[a][1]) < r + av[a][2])
return false;
for (var b = 0; b < bx.length; b++)
if (x > bx[b][0] - r && x < bx[b][2] + r && z > bx[b][1] - r && z < bx[b][3] + r)
return false;
for (var j = 0; j < put.length; j++)
if (Math.hypot(x - put[j][0], z - put[j][1]) < r + put[j][2] + 1.5)
return false;
return true;
};
for (var t = 0; t < want * 30 && n < want; t++) {
var a = R() * Math.PI * 2, d = Math.sqrt(R()), x = o.c[0] + Math.cos(a) * d * (o.rx || 80), z = o.c[1] + Math.sin(a) * d * (o.rz || o.rx || 80), w = (o.w0 || 5.5) + R() * (o.w1 || 4), dd = (o.d0 || 4.5) + R() * (o.d1 || 3), rr = Math.hypot(w, dd) / 2;
if (!free(x, z, rr) || hgwDrop(x, z, w + 2, dd + 2, 0, H(x, z)) > (o.maxDrop || 2.2))
continue;
put.push([x, z, rr]);
var best = null, bd = 1e9;
roads.forEach(function (rd) { for (var q = 0; q < rd.length - 1; q++) {
var A = rd[q], B = rd[q + 1], dx = B[0] - A[0], dz = B[1] - A[1], L = dx * dx + dz * dz || 1, u = Math.max(0, Math.min(1, ((x - A[0]) * dx + (z - A[1]) * dz) / L)), px = A[0] + dx * u, pz = A[1] + dz * u, dq = Math.hypot(x - px, z - pz);
if (dq < bd) {
bd = dq;
best = [px, pz];
}
} });
var ry = best && bd < 60 ? Math.round(Math.atan2(best[0] - x, best[1] - z) / (Math.PI / 2)) * (Math.PI / 2) : Math.round(a / 1.57) * 1.57;
hgwGkHouse(G, x, z, w, dd, (o.h0 || 3.0) + R() * (o.h1 || 1.6), { ry: ry, tile: R() < (o.tile != null ? o.tile : 0.3), r2: o.r2 != null ? o.r2 : R(), court: (w > 8 && R() < 0.5) ? w + 1 : 0, wall: o.wall });
n++;
if (o.door && n === (o.doorAt || 5)) {
var Rm = hgwRm(o.door.key);
if (Rm)
hgwDoor(Rm, o.door.name, x + Math.sin(ry) * (dd / 2 + 1), z + Math.cos(ry) * (dd / 2 + 1), ry + Math.PI);
}
if (!lite && R() < 0.3)
hgwPithos(G, x + Math.sin(ry) * (dd / 2 + 1.2) + Math.cos(ry) * (w / 2 - 0.6), H(x, z), z + Math.cos(ry) * (dd / 2 + 1.2) - Math.sin(ry) * (w / 2 - 0.6), 0.55);
if (!lite && o.life && R() < 0.25) {
var lx = x + Math.sin(ry) * (dd / 2 + 2.6), lz = z + Math.cos(ry) * (dd / 2 + 2.6);
if (R() < 0.5)
hgwLoom(G, lx, lz, ry, [0xE8D8B8, 0xB86A48, 0x6A7A9A][Math.floor(R() * 3)]);
else
hgwFire(G, lx, H(lx, lz), lz, 0.5);
}
}
return put;
},
function (G, H, o) {
var P = o.at, ry = o.ry || 0, T = hgwRot(P[0], P[1], ry), cw = o.cw || 56, cd = o.cd || 40, py = o.y != null ? o.y : H(P[0], P[1]), lite = hgwLite(), wm = o.wall || "limewall";
var dr = hgwDrop(P[0], P[1], cw + 4, cd + 4, ry, py);
if (dr > 0.2)
hgwBox(G, cw + 4, dr + 0.4, cd + 4, hgwMat("cyclopean"), P[0], py - dr - 0.2, P[1], ry);
hgwFloor(P[0], P[1], cw, cd, py, { rot: ry });
var cf = new THREE.Mesh(hgwGeo("ctfl", function () { var c = new THREE.PlaneGeometry(1, 1); c.rotateX(-Math.PI / 2); return c; }), hgwMat(o.court || "beaten"));
cf.scale.set(cw, 1, cd);
cf.position.set(P[0], py + 0.04, P[1]);
cf.rotation.y = ry;
G.add(cf);
var wl = [[-4, -cd / 2], [-cw / 2, -cd / 2], [-cw / 2, cd / 2], [cw / 2, cd / 2], [cw / 2, -cd / 2], [4, -cd / 2]].map(function (q) { return T(q[0], q[1]); });
hgwBigWall(G, wl, o.wallH || 3.4, function () { return py; }, { mat: wm, th: 1.0 });
var gq = T(0, -cd / 2), gt = new THREE.Group();
gt.position.set(gq[0], py, gq[1]);
gt.rotation.y = ry + Math.PI;
G.add(gt);
[-2.6, 2.6].forEach(function (gx) { hgwColumn(gt, gx, 0, 1.8, 3.8, 0.32, { wood: true }); hgwBox(gt, 1.2, 4.2, 1.2, hgwMat(wm), gx * 1.55, 0, 0); });
hgwBox(gt, 8, 0.6, 4.4, hgwMat("redtile"), 0, 4.0, 0.8);
var hq = T(0, cd / 2 - 11), mg = new THREE.Group();
mg.position.set(hq[0], py, hq[1]);
mg.rotation.y = ry + Math.PI;
G.add(mg);
hgwBox(mg, 26, 8, 18, hgwMat(wm), 0, 0, -1);
hgwBox(mg, 26.4, 0.6, 18.4, hgwMat("beaten"), 0, 8, -1);
hgwBox(mg, 4, 1.2, 4, hgwMat("lime"), 0, 8.6, -2);
hgwBox(mg, 26, 0.4, 5, hgwMat("lime"), 0, 0, 10);
[-8, -4, 4, 8].forEach(function (cx) { hgwColumn(mg, cx, 0.4, 10.8, 6.4, 0.42, { wood: true }); });
hgwBox(mg, 26.2, 0.6, 5.4, hgwMat("redtile"), 0, 7.4, 10.2);
hgwBox(mg, 2.4, 4, 0.2, hgwMat(o.rich ? "bronze" : "oak"), 0, 0.4, 8.02);
hgwBox(mg, 26.1, 0.5, 0.1, hgwMat(o.rich ? "gold" : "redpaint"), 0, 6.2, 8.02);
hgwBox(mg, 26.1, 0.25, 0.1, hgwMat("bluepaint"), 0, 5.9, 8.02);
if (o.rich)
for (var sp = 0; sp < 12; sp++)
hgwBox(mg, 0.5, 0.5, 0.06, hgwMat(sp % 2 ? "silver" : "gold"), -11 + sp * 2, 4.9, 8.06);
var sq = T(0, cd / 2 - 10);
hgwSolid(sq[0], sq[1], 26, 18, py - 1, py + 9, ry);
var pq = T(0, cd / 2 - 21);
hgwFloor(pq[0], pq[1], 26, 5, py + 0.4, { rot: ry });
var dq = T(0, cd / 2 - 22.5), Rm = o.hall && hgwRm(o.hall);
if (Rm)
hgwDoor(Rm, o.hallDoor || "The great doors of the hall", dq[0], dq[1], ry);
var tq = T(18, -6);
if (o.tholos !== false) {
var th = new THREE.Mesh(hgwGeo("tholos", function () { return new THREE.CylinderGeometry(3.4, 3.4, 4, 18); }), hgwMat(wm));
th.position.set(tq[0], py + 2, tq[1]);
G.add(th);
var tr = new THREE.Mesh(hgwGeo("tholosr", function () { return new THREE.ConeGeometry(3.8, 2, 18); }), hgwMat("redtile"));
tr.position.set(tq[0], py + 5, tq[1]);
G.add(tr);
hgwRound(tq[0], tq[1], 3.5);
}
var aq = T(-10, -4);
hgwAltar(G, aq[0], aq[1], function () { return py; }, {});
[[-22, -10], [-22, 2], [22, 6]].forEach(function (q) { var hq2 = T(q[0], q[1]); hgwGkHouse(G, hq2[0], hq2[1], 10, 6, 3.6, { ry: ry + (q[0] < 0 ? Math.PI / 2 : -Math.PI / 2), y: py, tile: true, wall: o.sideWall }); });
for (var pt = 0; pt < 6; pt++) {
var pq2 = T(-20 + pt * 1.6, -cd / 2 + 2.4);
hgwPithos(G, pq2[0], py, pq2[1], 0.9);
}
if (o.stable) {
var st = T(cw / 2 - 6, cd / 2 - 10);
hgwBox(G, 8, 3, 14, hgwMat("mudbrick"), st[0], py, st[1], ry);
hgwSolid(st[0], st[1], 8, 14, py - 1, py + 3.4, ry);
}
return { y: py, T: T, gate: T(0, -cd / 2 - 3), court: T(0, 0), porch: T(0, cd / 2 - 23) };
},
function (G, key, X, o) {
o = o || {};
var w = o.w || 26, d = o.d || 18, lite = hgwLite();
var R = hgwRoom(G, key, X[0], X[1], w, d, { wall: o.wall || "limewall", floor: o.floor || "gkfloor", h: o.h || 7, name: o.name, env: o.env || "megaron", beams: true, lightI: 1.1, lightCol: 0xFFC890, bare: 1 });
hgwHallHearth(R.g, 0, -1, 1.2, { cols: true, h: (o.h || 7) - 0.2 });
hgwBox(R.g, w - 0.4, 0.5, 0.1, hgwMat(o.rich ? "gold" : "redpaint"), 0, 2.2, -d / 2 + 0.14);
hgwBox(R.g, w - 0.4, 0.25, 0.1, hgwMat(o.rich ? "silver" : "bluepaint"), 0, 2.75, -d / 2 + 0.14);
if (o.rich) {
[-w / 2 + 0.14, w / 2 - 0.14].forEach(function (x) { hgwBox(R.g, 0.1, 0.5, d - 0.6, hgwMat("gold"), x, 2.2, 0); hgwBox(R.g, 0.1, 1.6, d - 0.6, hgwMat("bronze"), x, 3.0, 0); });
for (var am = 0; am < 10; am++)
hgwBox(R.g, 0.3, 0.3, 0.06, hgwLam(0xE8A030, { e: 0x6A3A08 }), -w / 2 + 2 + am * (w - 4) / 9, 3.8, -d / 2 + 0.2);
}
hgwThrone(R.g, 0, -d / 2 + 1.4, 0, { trim: o.rich ? "gold" : "silver" });
if (o.queen)
hgwThrone(R.g, -2.2, -d / 2 + 1.4, 0, { trim: "silver" });
for (var t = 0; t < (lite ? 4 : (o.tables || 8)); t++) {
var tx = (t % 2 ? 1 : -1) * (5.4 + Math.floor(t / 2) % 2 * 3.6), tz = -4 + Math.floor(t / 4) * 6;
hgwTable(R.g, tx, tz, 2.4, 0.9, 0.76, {});
[-0.8, 0.8].forEach(function (dx) { hgwChair(R.g, tx + dx, tz + 0.9, Math.PI, {}); });
hgwPithos(R.g, tx + 1.6, 0, tz - 0.8, 0.4);
}
hgwTripod(R.g, 8, 0, -d / 2 + 1.6);
hgwTripod(R.g, -8, 0, -d / 2 + 1.6);
return R;
},
function (G, key, X, name) {
var R = hgwRoom(G, key, X[0], X[1], 8, 7, { wall: "whitewash", floor: "gkfloor", h: 3.2, name: name, lightI: 0.7, bare: 1 });
var tub = new THREE.Mesh(hgwGeo("tub", function () { var s = new THREE.SphereGeometry(1, 16, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); s.scale(1.1, 0.55, 0.55); return s; }), hgwMat("lime"));
tub.position.set(0, 0.6, -1.6);
R.g.add(tub);
hgwWater(R.g, 0, -1.6, 1.9, 0.9, 0.5, 0x6A9AAA, 0.7);
for (var j = 0; j < 4; j++)
hgwPithos(R.g, -3 + j * 0.9, 0, -2.8, 0.45);
hgwFire(R.g, 3, 0, -2.4, 0.5);
hgwBox(R.g, 1.2, 0.6, 0.5, hgwMat("oak"), 2.4, 0, 1.6);
return R;
},
function (G, H, o) {
var T = hgwRot(o.at[0], o.at[1], o.ry || 0), L = o.len || 40, lite = hgwLite();
var q = T(0, 0);
hgwBox(G, L, 1.6, 5, hgwMat("cyclopean"), q[0], -1.2, q[1], o.ry || 0);
hgwFloor(q[0], q[1], L, 5, 0.4, { rot: o.ry || 0 });
var e = T(0, -2.6);
hgwSolid(e[0], e[1], L, 0.4, -2, 1.4, o.ry || 0);
for (var b = 0; b < Math.floor(L / 7); b++) {
var bq = T(-L / 2 + 3 + b * 7, -2);
hgwCyl(G, 0.22, 0.26, 0.7, hgwMat("lime"), bq[0], 0.4, bq[1], 8);
}
(o.drawn || []).forEach(function (s, i) { hgwShip(G, s[0], H(s[0], s[1]) + 0.6, s[1], s[2] || 0, { len: 15 + i % 3 * 3, sail: false }); hgwSolid(s[0], s[1], 3, 14, H(s[0], s[1]) - 1, H(s[0], s[1]) + 3, s[2] || 0); });
(o.anchor || []).slice(0, lite ? 1 : 9).forEach(function (s, i) { hgwShip(G, s[0], 0.1, s[1], s[2] || 0, { len: s[3] || 20, afloat: true, sail: !!s[4] }); });
},
function () {
if (typeof CRX_PLANS === "undefined" || typeof crxQuad !== "function" || CRX_PLANS.hgwhite)
return;
var tail = function (c) { return { l: 0.8, r: 0.07, up: -1.3, col: c }; };
CRX_PLANS.phdark = function () { return crxQuad({ L: 1.05, H: 1.0, G: 0.34, W: 0.78, legR: 0.05, head: "horse", hs: 1.2, col: 0x2A1C14, back: 0x1E140E, muzzle: 0x1A1210, mane: 0x0E0A08, foot: "hoof", tail: tail(0x0E0A08), neck: { l: 0.6, up: 0.95 }, neckR0: 0.55, neckR1: 0.35, stride: 2.0, runAt: 4.0 }); };
CRX_PLANS.hgbay = function () { return crxQuad({ L: 0.95, H: 0.92, G: 0.32, W: 0.74, legR: 0.045, head: "horse", hs: 1.25, col: 0x6A625A, back: 0x5A524A, muzzle: 0x3A3430, mane: 0x2A2622, foot: "hoof", tail: tail(0x2A2622), neck: { l: 0.5, up: 0.8 }, neckR0: 0.5, neckR1: 0.32, stride: 1.6, runAt: 3.0 }); };
CRX_PLANS.hgwhite = function () { return crxQuad({ L: 1.1, H: 1.04, G: 0.35, W: 0.8, legR: 0.05, head: "horse", hs: 1.2, col: 0xF2EEE6, back: 0xE8E4DC, muzzle: 0xC8B8B0, mane: 0xF8F6F0, foot: "hoof", tail: tail(0xF8F6F0), neck: { l: 0.62, up: 0.98 }, neckR0: 0.56, neckR1: 0.36, stride: 2.0, runAt: 4.0 }); };
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = null, key = o.kind || "horse";
if (o.plain)
return hgwPlainBeast(P, x, y, z, ry, o);
var crx = false;
try {
hgwCrxKinds();
crx = typeof crxBuild === "function" && typeof crxHas === "function" && crxHas(key) && !hgwLite() && typeof CRX !== "undefined";
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
var stand = hgwHorse(hold, 0, 0, 0, 0, { col: o.col, plain: 1, kind: key });
HGW.ticks.push(function () { if (!hold.parent || hold.userData.done || !CRX.geo[key])
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
return hgwPlainBeast(P, x, y, z, ry, o);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
g.userData.keep = 1;
P.add(g);
return g;
},
function (cow) {
var key = "phBeast" + (cow ? "C" : "H");
if (HGW_GEO[key])
return HGW_GEO[key];
return (HGW_GEO[key] = (function () {
var coat = [], dark = [], hr = [], S = function (r) { return new THREE.SphereGeometry(r, 14, 10); }, Cy = function (a, b, h, n) { return new THREE.CylinderGeometry(a, b, h, n || 10); };
var Hb = cow ? 1.12 : 1.3, L = cow ? 0.72 : 0.8, W = cow ? 0.42 : 0.31;
hgwPartG(coat, S(1), 0, Hb, 0, 0, 0, 0, W, cow ? 0.42 : 0.37, L);
hgwPartG(coat, S(1), 0, Hb + 0.04, -L * 0.7, 0, 0, 0, W * 0.92, 0.38, 0.34);
hgwPartG(coat, S(1), 0, Hb + 0.06, L * 0.66, 0, 0, 0, W * 0.98, 0.4, 0.36);
if (cow) {
hgwPartG(coat, Cy(0.14, 0.24, 0.6, 10), 0, Hb + 0.12, -0.86, -1.25, 0, 0);
hgwPartG(coat, Cy(0.1, 0.17, 0.48, 10), 0, Hb + 0.02, -1.22, -0.5 + Math.PI / 2, 0, 0);
hgwPartG(dark, S(0.11), 0, Hb - 0.12, -1.42, 0, 0, 0, 1.1, 0.8, 0.8);
[-1, 1].forEach(function (s) { hgwPartG(dark, new THREE.ConeGeometry(0.035, 0.24, 6), s * 0.16, Hb + 0.26, -1.08, 0, 0, -s * 1.1); hgwPartG(coat, S(0.06), s * 0.14, Hb + 0.16, -1.05, 0, 0, 0, 1.4, 0.5, 0.6); });
}
else {
hgwPartG(coat, Cy(0.12, 0.25, 0.86, 12), 0, 1.83, -0.76, -0.62, 0, 0);
hgwPartG(coat, Cy(0.14, 0.085, 0.62, 10), 0, 1.96, -1.13, 0.72, 0, 0);
hgwPartG(coat, S(0.13), 0, 2.12, -0.98, 0, 0, 0, 1, 1, 1.2);
hgwPartG(dark, S(0.09), 0, 1.74, -1.31, 0, 0, 0, 1, 0.8, 1.1);
[-1, 1].forEach(function (s) { hgwPartG(coat, new THREE.ConeGeometry(0.045, 0.16, 6), s * 0.07, 2.27, -0.94, -0.2, 0, -s * 0.15); hgwPartG(dark, S(0.025), s * 0.11, 2.04, -1.1, 0, 0, 0); });
hgwPartG(dark, new THREE.BoxGeometry(0.06, 0.86, 0.13), 0, 1.95, -0.68, -0.62, 0, 0);
hgwPartG(dark, new THREE.BoxGeometry(0.05, 0.18, 0.12), 0, 2.24, -1.04, 0.4, 0, 0);
}
var lh = cow ? 0.78 : 0.92;
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) {
var x = q[0] * W * 0.5, z = q[1] * L * 0.68, hind = q[1] > 0;
var kn = lh * (hind ? 0.6 : 0.52), top = Hb - 0.08;
if (hind) {
hgwPartG(coat, Cy(0.13, 0.08, top - kn + 0.1, 10), x, (top + kn) / 2, z + 0.07, -0.22, 0, 0);
}
else
hgwPartG(coat, Cy(0.1, 0.06, top - kn + 0.08, 10), x, (top + kn) / 2, z, 0, 0, 0);
hgwPartG(coat, S(hind ? 0.07 : 0.062), x, kn, z + (hind ? 0.14 : 0), 0, 0, 0, 1, 1.25, 1.1);
hgwPartG(coat, Cy(0.045, 0.04, kn - 0.12, 8), x, (kn + 0.12) / 2, z + (hind ? 0.07 : 0), hind ? 0.2 : 0, 0, 0);
hgwPartG(dark, S(0.052), x, 0.13, z, 0, 0, 0, 1, 1.1, 1.25);
hgwPartG(dark, Cy(0.055, 0.075, 0.12, 10), x, 0.06, z - 0.02, 0, 0, 0);
});
hgwPartG(dark, Cy(cow ? 0.03 : 0.075, cow ? 0.02 : 0.035, cow ? 0.8 : 0.85, 8), 0, Hb - 0.24, L * 0.98 + 0.12, 0.28, 0, 0);
if (cow)
hgwPartG(dark, S(0.06), 0, Hb - 0.66, L * 0.98 + 0.24, 0, 0, 0, 1, 1.6, 1);
if (!cow) {
hgwPartG(hr, new THREE.TorusGeometry(0.27, 0.06, 8, 16), 0, 1.6, -0.66, 0.95, 0, 0);
hgwPartG(hr, new THREE.BoxGeometry(0.5, 0.07, 0.3), 0, 1.68, -0.12, 0, 0, 0);
hgwPartG(hr, new THREE.BoxGeometry(0.72, 0.05, 0.08), 0, 1.3, -0.12, 0, 0, 0, 1, 1, 1);
hgwPartG(hr, new THREE.TorusGeometry(0.36, 0.025, 6, 18, Math.PI), 0, 1.34, 0.62, 0, Math.PI / 2, Math.PI / 2);
[-1, 1].forEach(function (s) { hgwPartG(hr, new THREE.BoxGeometry(0.02, 0.1, 0.1), s * 0.12, 2.04, -1.06, 0, 0, 0); hgwPartG(hr, new THREE.BoxGeometry(0.02, 0.02, 0.9), s * 0.1, 1.85, -0.82, 0.55, 0, 0); });
}
var out = { coat: gwMerge(coat), dark: gwMerge(dark), harness: hr.length ? gwMerge(hr) : null };
[out.coat, out.dark, out.harness].forEach(function (gg) { if (gg)
gg.userData.shared = 1; });
return out;
})());
},
function (P, x, y, z, ry, o) {
var g = new THREE.Group(), cow = o.kind === "cow" || o.kind === "imcow", G = hgwBeastGeo(cow), c = hgwLam(o.col || (cow ? 0xD8CCB8 : 0x5A3A22)), dk = hgwLam(cow ? 0x2A2420 : 0x1A120C);
var a = new THREE.Mesh(G.coat, c), b = new THREE.Mesh(G.dark, dk);
a.castShadow = !hgwLite();
g.add(a);
g.add(b);
if (G.harness && o.harness !== false && o.inShafts)
g.add(new THREE.Mesh(G.harness, hgwShine(0x141210, 0.3, 0.2)));
if (cow && !o.col) {
var pt = new THREE.Mesh(hgwGeo("cowpatch", function () { var l = []; hgwPartG(l, new THREE.SphereGeometry(1, 10, 8), 0.05, 1.18, -0.2, 0, 0, 0, 0.44, 0.3, 0.4); hgwPartG(l, new THREE.SphereGeometry(1, 10, 8), -0.05, 1.2, 0.45, 0, 0, 0, 0.44, 0.32, 0.3); return gwMerge(l); }), hgwLam(0x1E1A18));
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
var g = new THREE.Group(), w = hgwLam(0xE8E2D4), dk = hgwLam(0x3A2E26);
var b = hgwEll(g, w, 0.32, 0.3, 0.5, 0, 0.62, 0, 10);
var h = hgwEll(g, dk, 0.1, 0.11, 0.16, 0, 0.62, -0.56, 8);
h.rotation.x = 0.5;
hgwEll(g, w, 0.13, 0.1, 0.12, 0, 0.76, -0.44, 8);
[[-0.14, -0.28], [0.14, -0.28], [-0.14, 0.28], [0.14, 0.28]].forEach(function (q) { hgwCyl(g, 0.035, 0.03, 0.42, dk, q[0], 0, q[1], 6); });
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.keep = 1;
P.add(g);
return g;
},
function (G) {
var X = HGW_ROOMXZ.ithaca, R, st = HGW.st, lite = hgwLite(), wood = hgwMat("darkoak");
R = hgwRoom(G, "megaron", X.megaron[0], X.megaron[1], 26, 18, { wall: "limewall", floor: "gkfloor", h: 7, name: "the great hall of Odysseus", env: "megaron", beams: true, lightI: 1.1, lightCol: 0xFFC890, bare: 1 });
hgwHallHearth(R.g, 0, -1, 1.2, { cols: true, h: 6.8 });
hgwBox(R.g, 25.6, 0.5, 0.1, hgwMat("redpaint"), 0, 2.2, -8.86);
hgwBox(R.g, 25.6, 0.25, 0.1, hgwMat("bluepaint"), 0, 2.75, -8.86);
hgwThrone(R.g, 0, -7.6, 0, { trim: "silver" });
hgwThrone(R.g, -2, -7.6, 0, { trim: "bronze" });
for (var t = 0; t < (lite ? 4 : 8); t++) {
var tx = (t % 2 ? 1 : -1) * (5.4 + Math.floor(t / 2) % 2 * 3.6), tz = -4 + Math.floor(t / 4) * 6;
hgwTable(R.g, tx, tz, 2.4, 0.9, 0.76, {});
[-0.8, 0.8].forEach(function (dx) { hgwChair(R.g, tx + dx, tz + 0.9, Math.PI, {}); });
hgwPithos(R.g, tx + 1.6, 0, tz - 0.8, 0.4);
}
if (!st.armsDown)
for (var a = 0; a < 6; a++) {
var ag = new THREE.Group();
ag.position.set(-12.6, 2.6, -6 + a * 2.2);
ag.rotation.y = Math.PI / 2;
R.g.add(ag);
hgwCyl(ag, 0.5, 0.5, 0.08, hgwMat("bronze"), 0, 0, 0, 16);
hgwBox(ag, 0.06, 2.4, 0.06, hgwMat("oak"), 0.8, -1.2, 0.1);
}
hgwBox(R.g, 2.2, 2.6, 0.16, hgwMat("oak"), 0, 0, 8.9);
hgwBox(R.g, 2.6, 0.3, 0.6, hgwMat("ashlar"), 0, 0, 8.6);
hgwTripod(R.g, 8, 0, -7.4);
hgwTripod(R.g, -8, 0, -7.4);
if (st.axes) {
hgwBox(R.g, 0.5, 0.06, 11.4, hgwMat("beaten"), 3, -0.02, -1.0);
for (var x4 = 0; x4 < 12; x4++) {
var axg = new THREE.Group();
axg.position.set(3, 0, -6 + x4 * 0.9);
R.g.add(axg);
hgwBox(axg, 0.06, 1.0, 0.06, hgwMat("oak"), 0, 0, 0);
hgwBox(axg, 0.04, 0.24, 0.38, hgwMat("iron"), 0, 0.88, -0.1);
var rg = new THREE.Mesh(hgwGeo("axring", function () { return new THREE.TorusGeometry(0.075, 0.022, 6, 14); }), hgwMat("iron"));
rg.position.set(0, 1.0, -0.2);
axg.add(rg);
}
}
R = hgwRoom(G, "store", X.store[0], X.store[1], 10, 8, { wall: "limewall", floor: "gkfloor", h: 3.6, name: "the storeroom of Odysseus", lightI: 0.6, bare: 1 });
for (var j = 0; j < 7; j++)
hgwPithos(R.g, -4.2 + j * 1.4, 0, -3.2, 0.7);
for (var c = 0; c < 3; c++)
hgwBox(R.g, 1.4, 0.7, 0.8, wood, 3.4, 0, -1.2 + c * 1.2);
hgwBox(R.g, 0.3, 0.3, 0.1, hgwMat("oak"), -4.8, 2.2, 0);
var bow = new THREE.Mesh(hgwGeo("gkbow", function () { return new THREE.TorusGeometry(0.75, 0.035, 6, 20, Math.PI * 0.8); }), hgwMat("darkoak"));
bow.position.set(-4.85, 2.0, 0);
bow.rotation.set(0, Math.PI / 2, Math.PI * 0.6);
R.g.add(bow);
for (var x2 = 0; x2 < 12; x2++) {
var ax = new THREE.Group();
ax.position.set(-2 + x2 * 0.22, 0, 2.6);
R.g.add(ax);
hgwBox(ax, 0.04, 0.8, 0.04, hgwMat("oak"), 0, 0, 0);
hgwBox(ax, 0.18, 0.12, 0.03, hgwMat("iron"), 0.07, 0.72, 0);
}
R = hgwRoom(G, "upper", X.upper[0], X.upper[1], 9, 8, { wall: "whitewash", floor: "planks", h: 3.4, name: "Penelope's upper room", lightI: 0.7, bare: 1 });
hgwLoom(R.g, -2, -3.4, 0, 0xE8E0CC);
hgwThrone(R.g, 1.8, -1.6, -0.6, { mat: "oak", trim: "silver" });
hgwBox(R.g, 0.5, 0.4, 0.5, hgwLam(0xE8D8B0), 1.8, 0, -0.6);
hgwWindowIn(R.g, 3, 1.6, -3.88, 0, 1.0, 1.0, { sky: 0x8AB8E8 });
hgwBox(R.g, 0.8, 0.8, 0.6, wood, -3.6, 0, 1.6);
for (var w = 0; w < 3; w++)
hgwCyl(R.g, 0.18, 0.14, 0.3, hgwLam([0xE8E0D0, 0xA83A2A, 0x3A5A8A][w]), -3.6 + w * 0.3, 0.8, 1.6, 8);
R = hgwRoom(G, "bed", X.bed[0], X.bed[1], 9, 8, { wall: "limewall", floor: "gkfloor", h: 3.4, name: "the bedchamber", lightI: 0.55, bare: 1 });
var ol = new THREE.Mesh(hgwGeo("bedolive", function () { return hgwTaper([[0, 0, 0], [0.2, 1.4, 0.1], [-0.1, 2.8, 0.2], [0, 3.4, 0]], [0.55, 0.45, 0.4, 0.38], 8, 8); }), hgwMat("darkbark"));
ol.position.set(-1.6, 0, -2.6);
R.g.add(ol);
hgwBox(R.g, 2.6, 0.6, 3.2, hgwMat("oak"), -0.4, 0, -1.8);
hgwBox(R.g, 2.7, 0.12, 3.3, hgwMat("gold"), -0.4, 0.6, -1.8);
hgwBox(R.g, 2.5, 0.16, 3.0, hgwLam(0x5A1E3A), -0.4, 0.72, -1.8);
R = hgwRoom(G, "women", X.women[0], X.women[1], 14, 10, { wall: "whitewash", floor: "gkfloor", h: 3.6, name: "the women's hall", lightI: 0.7, bare: 1 });
for (var m = 0; m < 4; m++)
hgwLoom(R.g, -5 + m * 3.3, -4.4, 0, [0xE8D8B8, 0xB86A48, 0x6A7A9A, 0xD8C890][m]);
for (var q = 0; q < 3; q++) {
hgwCyl(R.g, 0.45, 0.5, 0.4, hgwMat("lime"), -4 + q * 4, 0, 1.8, 12);
hgwCyl(R.g, 0.42, 0.42, 0.14, hgwMat("lime"), -4 + q * 4, 0.42, 1.8, 12);
}
R = hgwRoom(G, "telroom", X.telroom[0], X.telroom[1], 7, 6, { wall: "whitewash", floor: "planks", h: 3.2, name: "Telemachus' room", lightI: 0.5, bare: 1 });
hgwBed(R.g, -1.6, -1.4, Math.PI / 2, { cover: 0xD8C8A8 });
hgwBox(R.g, 0.9, 0.7, 0.5, wood, 2, 0, -2.2);
R = hgwRoom(G, "hut", X.hut[0], X.hut[1], 9, 7, { wall: "lime", floor: "beaten", h: 3.0, name: "Eumaeus' hut", lightI: 0.6, bare: 1, beams: true });
hgwFire(R.g, 0, 0, -1, 0.8);
for (var s2 = 0; s2 < 3; s2++)
hgwBox(R.g, 1.6, 0.25, 0.9, hgwLam(0x8A6A4A), -3 + s2 * 3, 0, 2.2);
hgwPithos(R.g, 3.6, 0, -2.6, 0.6);
hgwBench(R.g, -2.6, -1.4, Math.PI / 2, { w: 1.6, d: 0.4, back: false });
R = hgwRoom(G, "laertes", X.laertes[0], X.laertes[1], 10, 8, { wall: "whitewash", floor: "beaten", h: 3.0, name: "Laertes' cottage", lightI: 0.6, bare: 1, beams: true });
hgwFire(R.g, 0, 0, -2.6, 0.6);
hgwTable(R.g, 2, 0.4, 2.0, 0.9, 0.76, {});
[-1, 1].forEach(function (d2) { hgwBench(R.g, 2, 0.4 + d2 * 0.9, d2 > 0 ? Math.PI : 0, { w: 1.8, d: 0.4, back: false }); });
hgwPithos(R.g, -4, 0, -3, 0.6);
R = hgwRoom(G, "cave", X.cave[0], X.cave[1], 12, 10, { wall: "darkrock", floor: "rock", h: 4.2, name: "the cave of the Naiads", env: "lakecave", lightI: 0.5, lightCol: 0xB8D8E8, bare: 1, ceil: "darkrock" });
for (var b2 = 0; b2 < 5; b2++) {
var bw = new THREE.Mesh(hgwGeo("nbowl", function () { return new THREE.SphereGeometry(0.4, 12, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); }), hgwMat("lime"));
bw.position.set(-4 + b2 * 1.8, 0.4, -4.2);
R.g.add(bw);
}
[-3, 3].forEach(function (x3) { hgwBox(R.g, 0.5, 3.2, 0.5, hgwMat("lime"), x3, 0, -2); hgwBox(R.g, 2.4, 0.3, 0.4, hgwMat("lime"), x3, 3.0, -2); hgwBox(R.g, 2.0, 2.4, 0.04, hgwLam(0x6A2A5A, { ds: 1 }), x3, 0.5, -2); });
hgwWater(R.g, 3.6, 2.4, 2.2, 1.6, 0.05, 0x2A6A7A, 0.85);
R = hgwRoom(G, "house", X.house[0], X.house[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a house in the town", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwLoom(R.g, -3, -2.6, 0.4);
hgwTable(R.g, 1.6, 0.6, 1.6, 0.8, 0.74, {});
hgwInDoor("megaron", "store", -12, -6, "The door to the storeroom", "go through");
hgwInDoor("megaron", "women", 12, -6, "The door to the women's hall", "go through");
hgwInDoor("megaron", "upper", -12, 4, "The stair to Penelope's upper room", "go up");
hgwInDoor("megaron", "bed", 12, 4, "The door to the bedchamber", "go through");
hgwInDoor("megaron", "telroom", -6, 8.2, "The stair to Telemachus' room", "go up");
},
function (G) {
var lite = hgwLite(), st = HGW.st, H = hgwItH, I = HGW_IT, D = function (key, p, nm) { var Rm = hgwRm(key); if (Rm)
hgwDoor(Rm, nm || ("The door of " + Rm.name), p.x, p.z, p.ry); };
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.45 });
hgwRoads(G, HGW_IT_ROADS, H, { w: { town: 6, east: 4, raven: 3, phorcys: 3, north: 4, neriton: 2.5 }, m: { town: "paving" } });
var hb = I.harbour;
hgwBox(G, 56, 1.6, 5, hgwMat("cyclopean"), hb[0] + 4, -1.2, hb[1] - 13);
hgwFloor(hb[0] + 4, hb[1] - 13, 56, 5, 0.4);
hgwSolid(hb[0] + 4, hb[1] - 15.6, 56, 0.4, -2, 1.4);
for (var bl = 0; bl < 8; bl++)
hgwCyl(G, 0.22, 0.26, 0.7, hgwMat("lime"), hb[0] - 22 + bl * 7, 0.4, hb[1] - 15, 8);
for (var s = 0; s < (lite ? 3 : 5); s++) {
var sx = hb[0] + 18 + s * 9, sz = hb[1] - 2 + (s % 2) * 3;
hgwShip(G, sx, H(sx, sz) + 0.6, sz, Math.PI + (s % 3 - 1) * 0.08, { len: 15 + s % 3 * 3, sail: false });
hgwSolid(sx, sz, 3, 14, H(sx, sz) - 1, H(sx, sz) + 3);
}
if (!st.telGone)
hgwShip(G, hb[0] - 20, 0.1, hb[1] - 34, Math.PI / 2, { len: 22, afloat: true, sail: !!st.telSail });
for (var nt = 0; nt < 3; nt++) {
var nx = hb[0] - 14 + nt * 5, nz = hb[1] + 11;
[-1.6, 1.6].forEach(function (dx) { hgwBox(G, 0.1, 2, 0.1, hgwMat("oak"), nx + dx, H(nx + dx, nz), nz); });
hgwBox(G, 3.2, 1.3, 0.04, hgwLam(0x8A7A5A, { ds: 1, op: 0.75 }), nx, H(nx, nz) + 0.6, nz);
}
hgwHarbourSpots("ithaca", hb[0] - 6, hb[1] + 3);
var R = wRand(31), n = 0, put = [], tn = I.town, roadsAll = Object.keys(HGW_IT_ROADS).map(function (k) { return HGW_IT_ROADS[k]; });
var free = function (x, z, r) {
if (hgwItH.sd(x, z) < 10)
return false;
for (var q = 0; q < roadsAll.length; q++)
if (hgwPathD(x, z, roadsAll[q]) < r * 0.6 + 3)
return false;
if (Math.hypot(x - I.agora[0], z - I.agora[1]) < r + 15)
return false;
if (x > I.palace[0] - 34 && x < I.palace[0] + 34 && z > I.palace[1] - 26 && z < I.palace[1] + 26)
return false;
for (var j = 0; j < put.length; j++)
if (Math.hypot(x - put[j][0], z - put[j][1]) < r + put[j][2] + 1.5)
return false;
return true;
};
for (var tries = 0; tries < 1400 && n < (lite ? 34 : 78); tries++) {
var a = R() * Math.PI * 2, d = Math.sqrt(R()) * 95, x = tn[0] + Math.cos(a) * d * 1.3, z = tn[1] + Math.sin(a) * d * 0.9 - 10, w = 5.5 + R() * 4, dd = 4.5 + R() * 3, rr = Math.hypot(w, dd) / 2;
if (!free(x, z, rr) || hgwDrop(x, z, w + 2, dd + 2, 0, H(x, z)) > 2.2)
continue;
put.push([x, z, rr]);
var best = null, bd = 1e9;
roadsAll.forEach(function (rd) { for (var q = 0; q < rd.length - 1; q++) {
var A = rd[q], B = rd[q + 1], dx = B[0] - A[0], dz = B[1] - A[1], L = dx * dx + dz * dz, t = Math.max(0, Math.min(1, ((x - A[0]) * dx + (z - A[1]) * dz) / L)), px = A[0] + dx * t, pz = A[1] + dz * t, dq = Math.hypot(x - px, z - pz);
if (dq < bd) {
bd = dq;
best = [px, pz];
}
} });
var ry = best && bd < 40 ? Math.round(Math.atan2(best[0] - x, best[1] - z) / (Math.PI / 2)) * (Math.PI / 2) : Math.round(a / 1.57) * 1.57;
hgwGkHouse(G, x, z, w, dd, 3.0 + R() * 1.6, { ry: ry, tile: R() < 0.3, r2: R(), court: (w > 8 && R() < 0.5) ? w + 1 : 0 });
n++;
if (n === 6)
hgwDoor(hgwRm("house"), "The door of a townsman's house", x + Math.sin(ry) * (dd / 2 + 1), z + Math.cos(ry) * (dd / 2 + 1), ry + Math.PI);
if (!lite && R() < 0.35)
hgwPithos(G, x + Math.sin(ry) * (dd / 2 + 1.2) + Math.cos(ry) * (w / 2 - 0.6), H(x, z), z + Math.cos(ry) * (dd / 2 + 1.2) - Math.sin(ry) * (w / 2 - 0.6), 0.55);
}
var ag = I.agora, agy = H(ag[0], ag[1]);
hgwFloor(ag[0], ag[1], 30, 30, agy, { r: 15 });
var agf = new THREE.Mesh(hgwGeo("agfl", function () { var c = new THREE.CircleGeometry(15, 28); c.rotateX(-Math.PI / 2); return c; }), hgwMat("paving"));
agf.position.set(ag[0], agy + 0.05, ag[1]);
G.add(agf);
for (var k = 0; k < 16; k++) {
var ka = k / 16 * Math.PI * 1.5 + Math.PI * 0.75, sx2 = ag[0] + Math.cos(ka) * 12, sz2 = ag[1] + Math.sin(ka) * 12;
hgwBox(G, 2.6, 0.5, 0.9, hgwMat("lime"), sx2, agy, sz2, -ka + Math.PI / 2);
hgwSolid(sx2, sz2, 2.6, 0.9, agy - 1, agy + 0.5, -ka + Math.PI / 2);
}
hgwThrone(G, ag[0], ag[1] + 12.5, Math.PI, { mat: "lime", trim: "lime" }).position.y = agy;
hgwAltar(G, ag[0], ag[1], function () { return agy; }, {});
hgwTemple(G, tn[0] + 62, tn[1] - 36, 10, 16, { ry: -Math.PI / 2, statue: "athena" });
var po = [tn[0] - 40, tn[1] - 14];
if (hgwItH.sd(po[0], po[1]) > 8) {
var poy = H(po[0], po[1]);
for (var pp = 0; pp < 9; pp++)
hgwPithos(G, po[0] - 4 + (pp % 3) * 1.4, poy, po[1] - 2 + Math.floor(pp / 3) * 1.4, 0.35 + R() * 0.25);
var kiln = new THREE.Mesh(hgwGeo("kiln", function () { var k2 = new THREE.SphereGeometry(1.6, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2); return k2; }), hgwMat("mudbrick"));
kiln.position.set(po[0] + 4, poy, po[1]);
G.add(kiln);
hgwRound(po[0] + 4, po[1], 1.6);
}
var P = I.palace, py = H(P[0], P[1]);
var cw = 56, cd = 40;
var dr = hgwDrop(P[0], P[1], cw + 4, cd + 4, 0, py);
if (dr > 0.2)
hgwBox(G, cw + 4, dr + 0.4, cd + 4, hgwMat("cyclopean"), P[0], py - dr - 0.2, P[1]);
hgwFloor(P[0], P[1], cw, cd, py);
var cf = new THREE.Mesh(hgwGeo("ctfl", function () { var c = new THREE.PlaneGeometry(1, 1); c.rotateX(-Math.PI / 2); return c; }), hgwMat("beaten"));
cf.scale.set(cw, 1, cd);
cf.position.set(P[0], py + 0.04, P[1]);
G.add(cf);
hgwBigWall(G, [[P[0] - 4, P[1] - cd / 2], [P[0] - cw / 2, P[1] - cd / 2], [P[0] - cw / 2, P[1] + cd / 2], [P[0] + cw / 2, P[1] + cd / 2], [P[0] + cw / 2, P[1] - cd / 2], [P[0] + 4, P[1] - cd / 2]], 3.4, function () { return py; }, { mat: "limewall", th: 1.0 });
var gt = new THREE.Group();
gt.position.set(P[0], py, P[1] - cd / 2);
gt.rotation.y = Math.PI;
G.add(gt);
[-2.6, 2.6].forEach(function (gx) { hgwColumn(gt, gx, 0, 1.8, 3.8, 0.32, { wood: true }); hgwBox(gt, 1.2, 4.2, 1.2, hgwMat("limewall"), gx * 1.55, 0, 0); });
hgwBox(gt, 8, 0.6, 4.4, hgwMat("redtile"), 0, 4.0, 0.8);
var mg = new THREE.Group();
mg.position.set(P[0], py, P[1] + cd / 2 - 11);
mg.rotation.y = Math.PI;
G.add(mg);
hgwBox(mg, 26, 8, 18, hgwMat("limewall"), 0, 0, -1);
hgwBox(mg, 26.4, 0.6, 18.4, hgwMat("beaten"), 0, 8, -1);
hgwBox(mg, 4, 1.2, 4, hgwMat("lime"), 0, 8.6, -2);
hgwBox(mg, 26, 0.4, 5, hgwMat("lime"), 0, 0, 10);
[-8, -4, 4, 8].forEach(function (cx) { hgwColumn(mg, cx, 0.4, 10.8, 6.4, 0.42, { wood: true }); });
hgwBox(mg, 26.2, 0.6, 5.4, hgwMat("redtile"), 0, 7.4, 10.2);
hgwBox(mg, 2.4, 4, 0.2, hgwMat("oak"), 0, 0.4, 8.02);
hgwBox(mg, 26.1, 0.5, 0.1, hgwMat("redpaint"), 0, 6.2, 8.02);
hgwBox(mg, 26.1, 0.25, 0.1, hgwMat("bluepaint"), 0, 5.9, 8.02);
hgwSolid(P[0], P[1] + cd / 2 - 10, 26, 18, py - 1, py + 9);
hgwFloor(P[0], P[1] + cd / 2 - 21, 26, 5, py + 0.4);
D("megaron", { x: P[0], z: P[1] + cd / 2 - 22.5, ry: 0 }, "The great doors of the hall");
var th = new THREE.Mesh(hgwGeo("tholos", function () { return new THREE.CylinderGeometry(3.4, 3.4, 4, 18); }), hgwMat("limewall"));
th.position.set(P[0] + 18, py + 2, P[1] - 6);
G.add(th);
var tr = new THREE.Mesh(hgwGeo("tholosr", function () { return new THREE.ConeGeometry(3.8, 2, 18); }), hgwMat("redtile"));
tr.position.set(P[0] + 18, py + 5, P[1] - 6);
G.add(tr);
hgwRound(P[0] + 18, P[1] - 6, 3.5);
hgwAltar(G, P[0] - 10, P[1] - 4, function () { return py; }, {});
[[-22, -10], [-22, 2], [22, 6]].forEach(function (q) { hgwGkHouse(G, P[0] + q[0], P[1] + q[1], 10, 6, 3.6, { ry: q[0] < 0 ? Math.PI / 2 : -Math.PI / 2, y: py, tile: true }); });
var dung = new THREE.Mesh(hgwGeo("dung", function () { var s2 = new THREE.SphereGeometry(2.4, 12, 8); s2.scale(1, 0.35, 1); return s2; }), hgwLam(0x5A4A32));
dung.position.set(P[0] + 10, H(P[0] + 10, P[1] - cd / 2 - 6), P[1] - cd / 2 - 6);
G.add(dung);
for (var pt = 0; pt < 6; pt++)
hgwPithos(G, P[0] - 20 + pt * 1.6, py, P[1] - cd / 2 + 2.4, 0.9);
for (var cy = 0; cy < (lite ? 2 : 4); cy++)
hgwPlant(G, "cypress", [{ x: P[0] - cw / 2 - 4, z: P[1] - cd / 2 + 6 + cy * 9, y: H(P[0] - cw / 2 - 4, P[1] - cd / 2 + 6 + cy * 9) }], { keepAll: true });
var F = I.fountain, fy = H(F[0], F[1]);
hgwBox(G, 6, 1.0, 4, hgwMat("lime"), F[0], fy - 0.2, F[1]);
hgwWater(G, F[0], F[1], 5.4, 3.4, fy + 0.7, 0x3A7A8A, 0.85);
hgwAltar(G, F[0] + 6, F[1] - 3, H, { fire: false });
hgwPlant(G, "poplar", [{ x: F[0] - 6, z: F[1] - 5 }, { x: F[0] + 6, z: F[1] + 5 }, { x: F[0] - 7, z: F[1] + 6 }, { x: F[0] + 8, z: F[1] - 6 }, { x: F[0], z: F[1] - 9 }].map(function (p) { p.y = H(p.x, p.z); p.s = 1.1; return p; }), {});
hgwSolid(F[0], F[1], 6, 4, fy - 1, fy + 0.9);
var E = I.eumaeus, ey = H(E[0], E[1]);
hgwBigWall(G, [[E[0] - 20, E[1] - 14], [E[0] + 20, E[1] - 14], [E[0] + 20, E[1] + 14], [E[0] - 20, E[1] + 14], [E[0] - 20, E[1] - 14]], 1.8, function () { return ey; }, { mat: "lime", th: 0.8, gate: [[E[0], E[1] - 14, 2.6]] });
for (var sy = 0; sy < 12; sy++) {
var sx2 = E[0] - 15 + (sy % 6) * 6, sz2 = E[1] + 4 + Math.floor(sy / 6) * 6;
hgwBox(G, 0.3, 1.0, 5, hgwMat("lime"), sx2 - 2.6, ey, sz2);
hgwBox(G, 5, 1.0, 0.3, hgwMat("lime"), sx2, ey, sz2 + 2.5);
}
hgwHerd(G, "pig", E[0] - 2, E[1] + 8, 10, lite ? 6 : 14, function () { return ey; }, 77);
hgwGkHouse(G, E[0] + 10, E[1] - 6, 8, 6, 3, { y: ey, r2: 0.2, ry: Math.PI });
D("hut", { x: E[0] + 10, z: E[1] - 10, ry: Math.PI }, "The door of Eumaeus' hut");
for (var dg = 0; dg < 4; dg++) {
var dog = hgwDog([0x6A5A44, 0x3A2E22, 0x8A7A5A, 0x2A2420][dg], 1.1);
dog.position.set(E[0] - 6 + dg * 3, ey, E[1] - 17);
dog.rotation.y = dg;
G.add(dog);
}
hgwPlant(G, "tree", [{ x: E[0] - 24, z: E[1] - 18 }, { x: E[0] + 24, z: E[1] + 18 }].map(function (p) { p.y = H(p.x, p.z); return p; }), { col: 0x5A7A3A });
var rv = I.raven;
hgwPlant(G, "rock", [{ x: rv[0], z: rv[1], y: H(rv[0], rv[1]) - 2, s: 9, sy: 12 }, { x: rv[0] + 8, z: rv[1] - 6, y: H(rv[0] + 8, rv[1] - 6) - 2, s: 6 }], { mat: hgwMat("lime"), keepAll: true });
hgwRound(rv[0], rv[1], 8);
var ar = I.arethusa;
hgwWater(G, ar[0], ar[1], 8, 6, H(ar[0], ar[1]) + 0.2, 0x3A7A8A, 0.85);
var ph = I.phorcys;
hgwPlant(G, "olive", [{ x: 62, z: 528, y: H(62, 528), s: 2.0 }], { keepAll: true });
hgwPlant(G, "rock", [{ x: I.cave[0] + 8, z: I.cave[1], y: H(I.cave[0] + 8, I.cave[1]) - 4, s: 10, sy: 7 }, { x: I.cave[0] + 4, z: I.cave[1] - 10, y: H(I.cave[0] + 4, I.cave[1] - 10) - 3, s: 7 }], { mat: hgwMat("lime"), keepAll: true });
hgwBox(G, 1.6, 2.4, 0.4, hgwLam(0x14100C), I.cave[0] + 0.6, H(I.cave[0], I.cave[1]) - 0.2, I.cave[1] + 0.4, Math.PI / 2);
D("cave", { x: I.cave[0] - 2, z: I.cave[1], ry: -Math.PI / 2 }, "The mouth of the cave of the Naiads");
hgwHarbourSpots("ithaca", ph[0] + 6, ph[1] - 4);
var L = I.laertes, ly = H(L[0], L[1]);
hgwGkHouse(G, L[0], L[1], 10, 7, 3.2, { y: ly, r2: 0.8, court: 12 });
D("laertes", { x: L[0], z: L[1] + 12, ry: 0 }, "The door of Laertes' cottage");
[[-16, 6], [16, 4]].forEach(function (q) { hgwGkHouse(G, L[0] + q[0], L[1] + q[1], 6, 5, 2.8, { y: H(L[0] + q[0], L[1] + q[1]), r2: 0.2 }); });
var orch = [];
for (var oy = 0; oy < 5; oy++)
for (var ox = 0; ox < 6; ox++)
orch.push({ x: L[0] - 40 + ox * 8, z: L[1] + 30 + oy * 8 });
orch.forEach(function (p) { p.y = H(p.x, p.z); });
hgwPlant(G, "fig", orch.filter(function (p, i) { return i % 3 === 0; }), {});
hgwPlant(G, "tree", orch.filter(function (p, i) { return i % 3 === 1; }).map(function (p) { p.s = 0.55; return p; }), { col: 0x6A8A3A });
hgwPlant(G, "olive", orch.filter(function (p, i) { return i % 3 === 2; }), {});
var vines = [];
for (var vr = 0; vr < 8; vr++)
for (var vc = 0; vc < 16; vc++)
vines.push({ x: L[0] + 20 + vc * 2.2, z: L[1] - 30 + vr * 3, y: H(L[0] + 20 + vc * 2.2, L[1] - 30 + vr * 3) });
hgwPlant(G, "vine", vines, { keepAll: true });
hgwGreekTrees(G, H, { clear: [[I.town[0], I.town[1], 90], [P[0], P[1], 40], [E[0], E[1], 30], [L[0], L[1] + 10, 60], [I.cave[0], I.cave[1], 14], [hb[0], hb[1], 30], [F[0], F[1], 12], [ag[0], ag[1], 18]], roads: Object.keys(HGW_IT_ROADS).map(function (k) { return HGW_IT_ROADS[k]; }), olive: 1.2 });
hgwHerd(G, "goat", -40, -420, 60, lite ? 8 : 18, H, 81);
hgwHerd(G, "sheep", 320, 520, 40, lite ? 6 : 14, H, 82);
hgwHerd(G, "goat", 440, 420, 40, lite ? 5 : 10, H, 83);
for (var tw = 0; tw < (lite ? 4 : 10); tw++) {
var tz = 380 + tw * 22;
hgwTerraceWall(G, [[300, tz], [360, tz + 6]], H);
}
},
function (G) {
var st = HGW.st, I = HGW_IT;
if (st.calm !== false) {
hgwCrowd("itTown", [["A fisherman with his catch", "m", "sailor", "Bream and red mullet, fresh from the bay!", null], ["A woman with a water jar", "f", "gkwoman", "The fountain's running sweet this year.", null], ["An old man in the sun", "m", "gkold", "I remember when King Odysseus sailed. Twenty years. Twenty.", null],
["A girl with a basket of figs", "f", "gkwoman", "Figs from the terraces! Taste one.", null, true], ["A boy chasing a hoop", "m", "gkman", "Have you seen my dog?", null, true], ["A potter", "m", "gkman", "Good clay on this island, if nothing else.", null], ["A woman spinning", "f", "gkveiled", "The suitors eat and eat up at the house. Shameful.", "ithacan"],
["A goatherd's wife", "f", "gkwoman", "Goat cheese, stranger? Better than the suitors deserve.", "ithacan"], ["A shipwright", "m", "gkman", "Pine for the hull, fir for the oars, and pray to Poseidon.", "sailor"], ["A trader from Taphos", "m", "sailor", "Iron for copper, friend. Always a fair trade.", null]], I.town[0] - 70, I.town[1] - 40, I.town[0] + 70, I.town[1] + 60, { wander: 6, ok: function (x, z) { return hgwItH.sd(x, z) > 12; }, persona: "ithacan" });
hgwCrowd("itHb", [["A sailor coiling rope", "m", "sailor", "Wind's from the north. Good for the mainland.", "sailor"], ["A net-mender", "m", "sailor", "The sea gives, the sea takes.", "sailor"]], I.harbour[0] - 30, I.harbour[1] - 6, I.harbour[0] + 30, I.harbour[1] + 10, { wander: 3 });
hgwCrowd("itFarm", [["A shepherd boy", "m", "herd", "The goats go up Neriton at dawn and come down at dusk.", "ithacan", true], ["A woman picking olives", "f", "gkwoman", "Beat the branches gently, or the tree remembers.", "ithacan"]], -80, -460, 140, -280, { wander: 8, ok: function (x, z) { return hgwItH.sd(x, z) > 20; } });
}
},
function (G) {
var X = HGW_ROOMXZ.pylos;
hgwHallRoom(G, "nhall", X.nhall, { name: "the great hall of Nestor", queen: true });
hgwBathRoom(G, "nbath", X.nbath, "the bath-room of Nestor's house");
var R = hgwRoom(G, "ncolon", X.ncolon[0], X.ncolon[1], 12, 8, { wall: "limewall", floor: "gkfloor", h: 3.6, name: "the echoing colonnade, where guests sleep", lightI: 0.5, bare: 1 });
[-4, 0, 4].forEach(function (x) { hgwColumn(R.g, x, 0, 1.4, 3.6, 0.24, { wood: true }); });
hgwBed(R.g, -2.6, -2, Math.PI / 2, { cover: 0x8A2A3A });
hgwBed(R.g, 2.6, -2, Math.PI / 2, { cover: 0x8A2A3A });
R = hgwRoom(G, "nhouse", X.nhouse[0], X.nhouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a house in the town of Pylos", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwLoom(R.g, -3, -2.6, 0.4);
hgwTable(R.g, 1.6, 0.6, 1.6, 0.8, 0.74, {});
hgwInDoor("nhall", "nbath", 12, -6, "The door to the bath-room", "go through");
hgwInDoor("nhall", "ncolon", -12, 4, "Out to the colonnade, where the guests' beds are made", "go through");
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : hgwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = hgwMat("oak"), br = hgwMat("bronze");
hgwBox(g, 1.2, 0.08, 0.9, wd, 0, 0.62, 0.6);
[-0.6, 0.6].forEach(function (sx) { hgwBox(g, 0.05, 0.7, 0.9, hgwLam(0x8A6A3A), sx, 0.66, 0.6); });
hgwBox(g, 1.2, 0.75, 0.05, hgwLam(0x8A6A3A), 0, 0.66, 0.15);
hgwBox(g, 1.24, 0.08, 0.06, br, 0, 1.38, 0.15);
[-0.72, 0.72].forEach(function (sx) {
var w = new THREE.Mesh(hgwGeo("chw", function () { var t = new THREE.TorusGeometry(0.46, 0.04, 6, 18); t.rotateY(Math.PI / 2); return t; }), wd);
w.position.set(sx, 0.48, 0.75);
g.add(w);
for (var k = 0; k < 4; k++) {
var sp = new THREE.Mesh(hgwGeo("chs", function () { return new THREE.CylinderGeometry(0.02, 0.02, 0.9, 4); }), wd);
sp.position.set(sx, 0.48, 0.75);
sp.rotation.x = k * Math.PI / 4;
g.add(sp);
}
});
hgwBox(g, 1.6, 0.06, 0.06, wd, 0, 0.46, 0.75);
hgwBox(g, 0.08, 0.08, 3.2, wd, 0, 0.62, -1.0);
hgwBox(g, 1.6, 0.08, 0.1, wd, 0, 1.2, -2.4);
if (o.horses !== false)
[-0.45, 0.45].forEach(function (sx, i) { hgwHorse(g, sx, 0, -2.6, 0, { col: i ? 0x5A3A22 : 0x8A5A32 }); });
hgwSolid(x, z, 2, 5, y - 1, y + 2, ry || 0);
return g;
},
function (G) {
var lite = hgwLite(), H = hgwPyH, I = HGW_PY, st = HGW.st;
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.55 });
hgwRoads(G, HGW_PY_ROADS, H, { w: { palace: 6, shore: 4, south: 4, east: 5 } });
var K = hgwKingsHouse(G, H, { at: I.palace, ry: I.ry, hall: "nhall", stable: true });
var sq = K.T(-8, -26);
hgwBox(G, 3.2, 0.6, 1.4, hgwLam(0xE8E0D0), sq[0], K.y - 0.1, sq[1], I.ry);
hgwSolid(sq[0], sq[1], 3.2, 1.4, K.y - 1, K.y + 0.5, I.ry);
var bq = K.T(16, 8);
var bh = hgwRm("nbath");
if (bh)
hgwDoor(bh, "The door of the bath-house", bq[0], bq[1], I.ry);
hgwTownPack(G, H, { c: I.town, rx: 110, rz: 90, n: 46, seed: 41, roads: Object.keys(HGW_PY_ROADS).map(function (k) { return HGW_PY_ROADS[k]; }), avoid: [[I.palace[0], I.palace[1], 44]], door: { key: "nhouse", name: "The door of a Pylian's house" }, life: true });
var R = wRand(7), alt = [];
for (var c = 0; c < 9; c++) {
var z = -380 + c * 80, x = hgwShoreX(H, z, 16, -700, 200) + 6;
alt.push([x, z]);
hgwAltar(G, x, z, H, {});
hgwFire(G, x, H(x, z) + 1.2, z, 1.2);
for (var b = 0; b < (lite ? 6 : 14); b++) {
var a = b / 14 * Math.PI * 2, sx = x + Math.cos(a) * 8, sz = z + Math.sin(a) * 8;
hgwBox(G, 1.8, 0.4, 0.6, hgwMat("oak"), sx, H(sx, sz), sz, -a);
}
}
HGW_PY.alt = alt;
if (st.sacrifice)
alt.forEach(function (p, i) { hgwHerd(G, "cow", p[0] + 14, p[1], 5, lite ? 2 : 4, H, 90 + i); });
var bx = hgwShoreX(H, -60, 4, -700, 200);
hgwQuay(G, H, { at: [bx - 8, -60], ry: Math.PI / 2, len: 30, drawn: [[bx + 4, -110, Math.PI / 2], [bx + 4, -140, Math.PI / 2], [bx + 4, 10, Math.PI / 2]], anchor: st.telGone ? [] : [[bx - 40, -40, 0.2, 22]] });
hgwHarbourSpots("pylos", bx + 6, -56);
hgwHerd(G, "horse", I.palace[0] + 200, I.palace[1] + 220, 60, lite ? 4 : 9, H, 61);
hgwHerd(G, "cow", -40, 200, 60, lite ? 4 : 9, H, 62);
hgwHerd(G, "sheep", 500, -100, 70, lite ? 6 : 14, H, 63);
if (!st.chariotGone)
hgwChariot(G, HGW_AT.pyChariot.x, HGW_AT.pyChariot.z, I.ry + Math.PI);
var vines = [];
for (var vr = 0; vr < 10; vr++)
for (var vc = 0; vc < 18; vc++) {
var vx = 330 + vc * 2.4, vz = -760 + vr * 3;
vines.push({ x: vx, z: vz, y: H(vx, vz) });
}
hgwPlant(G, "vine", vines, { keepAll: true });
hgwGreekTrees(G, H, { clear: [[I.palace[0], I.palace[1], 50], [I.town[0], I.town[1], 110], [bx, -60, 40]].concat(alt.map(function (p) { return [p[0], p[1], 14]; })), roads: Object.keys(HGW_PY_ROADS).map(function (k) { return HGW_PY_ROADS[k]; }), olive: 1.4 });
hgwCrowd("pyTown", [["A woman at her loom", "f", "gkwoman", "Ten years of war and Nestor came home safe. The gods love that old man.", "pylian"], ["A horse-breeder", "m", "gkman", "Pylian horses! Nothing faster from here to Argos.", "pylian"], ["A boy with a goose", "m", "gkman", "Have you seen the king? He's a hundred, they say.", "pylian", true],
["A potter's wife", "f", "gkwoman", "Mind the jars, stranger.", "pylian"], ["An old soldier", "m", "gkold", "I was at Troy with Nestor. Ninety ships we took.", "pylian"], ["A fisherman", "m", "sailor", "The sea's calm for you, friend. Poseidon is pleased with us.", "pylian"]], I.town[0] - 80, I.town[1] - 60, I.town[0] + 80, I.town[1] + 60, { wander: 6, ok: function (x, z) { return H.sd(x, z) > 12; }, persona: "pylian" });
},
function (G) {
var X = HGW_ROOMXZ.sparta;
hgwHallRoom(G, "mhall", X.mhall, { name: "the shining hall of Menelaus", rich: true, queen: true });
hgwBathRoom(G, "mbath", X.mbath, "the polished bath of Menelaus' house");
var R = hgwRoom(G, "mport", X.mport[0], X.mport[1], 12, 8, { wall: "limewall", floor: "gkfloor", h: 3.6, name: "the portico, where the guests' beds are spread", lightI: 0.5, bare: 1 });
[-4, 0, 4].forEach(function (x) { hgwColumn(R.g, x, 0, 1.4, 3.6, 0.24, { wood: true }); });
hgwBed(R.g, -2.6, -2, Math.PI / 2, { cover: 0x6A1A3A });
hgwBed(R.g, 2.6, -2, Math.PI / 2, { cover: 0x6A1A3A });
R = hgwRoom(G, "helen", X.helen[0], X.helen[1], 9, 8, { wall: "whitewash", floor: "gkfloor", h: 3.4, name: "Helen's fragrant room", lightI: 0.75, lightCol: 0xFFD8B0, bare: 1 });
hgwThrone(R.g, 0, -2.6, 0, { mat: "oak", trim: "gold" });
hgwBox(R.g, 0.6, 0.5, 0.6, hgwMat("silver"), 1.2, 0, -2.4);
hgwCyl(R.g, 0.3, 0.3, 0.04, hgwMat("gold"), 1.2, 0.5, -2.4, 16);
hgwCyl(R.g, 0.22, 0.18, 0.24, hgwLam(0x6A3A8A), 1.2, 0.54, -2.4, 10);
hgwLoom(R.g, -2.6, -3.2, 0, 0x8A4A9A);
R = hgwRoom(G, "mtreas", X.mtreas[0], X.mtreas[1], 9, 7, { wall: "limewall", floor: "gkfloor", h: 3.2, name: "Menelaus' treasure-room", lightI: 0.6, bare: 1 });
for (var i = 0; i < 6; i++) {
hgwTripod(R.g, -3.4 + i * 1.36, 0, -2.6);
}
hgwCyl(R.g, 0.6, 0.4, 0.3, hgwMat("silver"), 0, 0.8, 0, 18);
hgwBox(R.g, 1.6, 0.8, 0.6, hgwMat("oak"), 0, 0, 0.2);
for (var c = 0; c < 3; c++)
hgwBox(R.g, 1.2, 0.7, 0.8, hgwMat("darkoak"), 3, 0, -1 + c * 1.1);
R = hgwRoom(G, "shouse", X.shouse[0], X.shouse[1], 9, 7, { wall: "mudbrick", floor: "beaten", h: 3.0, name: "a house in Lacedaemon", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwLoom(R.g, -3, -2.6, 0.4);
hgwTable(R.g, 1.6, 0.6, 1.6, 0.8, 0.74, {});
hgwInDoor("mhall", "mbath", 12, -6, "The door to the bath", "go through");
hgwInDoor("mhall", "mport", -12, 4, "Out to the portico", "go through");
hgwInDoor("mhall", "helen", -12, -6, "Up to Helen's room", "go up");
hgwInDoor("mhall", "mtreas", 12, 4, "Down to the treasure-room", "go down");
},
function (G) {
var lite = hgwLite(), H = hgwSpH, I = HGW_SP, st = HGW.st;
hgwLandMesh(G, H, { dry: 0.35 });
var rp = [];
for (var z = -1500; z <= 1500; z += 30)
rp.push([hgwSpRiverX(z), z]);
var wm = hgwStrip(G, rp, 24, function () { return 3.1; }, hgwWaterM(0x3A6A6A, 0.88), 0);
HGW.water.push(wm);
wm.userData.fx = 0;
wm.userData.fz = 0.6;
var reeds = [], planes = [], R = wRand(23);
for (var r = 0; r < (lite ? 90 : 220); r++) {
var rz = -1200 + R() * 2400, side = R() < 0.5 ? -1 : 1, rx = hgwSpRiverX(rz) + side * (11 + R() * 4);
reeds.push({ x: rx, z: rz, y: H(rx, rz), s: 0.8 + R() * 0.6 });
if (r % 5 === 0) {
var px = hgwSpRiverX(rz) + side * (20 + R() * 14);
if (Math.abs(rz - I.bridgeZ) > 12)
planes.push({ x: px, z: rz, y: H(px, rz), s: 0.9 + R() * 0.4 });
}
}
hgwPlant(G, "reeds", reeds, {});
hgwPlant(G, "tree", planes, { col: 0x5A8A3A });
var bx = hgwSpRiverX(I.bridgeZ);
hgwBox(G, 34, 0.5, 4, hgwMat("planks"), bx, 3.6, I.bridgeZ);
hgwFloor(bx, I.bridgeZ, 34, 4, 4.1);
[-1.9, 1.9].forEach(function (dz) { hgwBox(G, 34, 0.9, 0.12, hgwMat("oak"), bx, 4.1, I.bridgeZ + dz); hgwSolid(bx, I.bridgeZ + dz, 34, 0.2, 3, 5.2); });
for (var p = 0; p < 5; p++)
hgwBox(G, 0.5, 3.4, 0.5, hgwMat("oak"), bx - 14 + p * 7, 0.4, I.bridgeZ);
hgwRoads(G, HGW_SP_ROADS, H, { w: { west: 6, bridge: 5, north: 4, south: 4 } });
var K = hgwKingsHouse(G, H, { at: I.palace, ry: I.ry, hall: "mhall", rich: true, stable: true, wall: "ashlar" });
var tq = K.T(16, 8);
var tr = hgwRm("mtreas");
if (tr)
hgwDoor(tr, "The door of the treasure-house", tq[0], tq[1], I.ry);
var roadsAll = Object.keys(HGW_SP_ROADS).map(function (k) { return HGW_SP_ROADS[k]; });
hgwTownPack(G, H, { c: I.town, rx: 120, rz: 150, n: 56, seed: 51, roads: roadsAll, r2: 0.3, tile: 0.15, door: { key: "shouse", name: "The door of a Spartan's house" }, life: true, boxes: [[hgwSpRiverX(0) - 40, -1500, hgwSpRiverX(0) + 40, 1500]] });
hgwTownPack(G, H, { c: [-150, -600], rx: 60, rz: 60, n: 10, seed: 52, roads: roadsAll, r2: 0.3, tile: 0 });
hgwTownPack(G, H, { c: [-120, 700], rx: 60, rz: 60, n: 10, seed: 53, roads: roadsAll, r2: 0.3, tile: 0 });
hgwTemple(G, I.town[0] - 40, I.town[1] - 140, 12, 20, { ry: Math.PI / 2, statue: "athena" });
hgwHerd(G, "horse", 380, -300, 70, lite ? 5 : 12, H, 71);
hgwHerd(G, "cow", -260, 320, 60, lite ? 4 : 8, H, 72);
hgwHerd(G, "sheep", -500, -500, 80, lite ? 6 : 16, H, 73);
hgwHerd(G, "goat", -800, 200, 80, lite ? 5 : 12, H, 74);
var wheat = [];
for (var f = 0; f < (lite ? 120 : 360); f++) {
var wz = -1000 + R() * 2000, wx = hgwSpRiverX(wz) + (R() < 0.5 ? -1 : 1) * (40 + R() * 110);
if (Math.hypot(wx - I.town[0], wz - I.town[1]) > 170 && Math.hypot(wx - I.palace[0], wz - I.palace[1]) > 60)
wheat.push({ x: wx, z: wz, y: H(wx, wz), s: 0.9 });
}
hgwPlant(G, "grass", wheat, { col: 0xB8A050, keepAll: true });
hgwGreekTrees(G, H, { clear: [[I.palace[0], I.palace[1], 50], [I.town[0], I.town[1], 140]], roads: roadsAll, olive: 1.0, pine: 2.0, oak: 1.4 });
hgwCrowd("spTown", [["A Spartan woman", "f", "gkwoman", "Helen is home, and the king. They say she weaves violet wool now, as if nothing ever happened.", "spartan"], ["A farmer with a mule", "m", "gkman", "Rain's coming off Taygetus. Look at it.", "spartan"], ["A girl with a goose", "f", "gkwoman", "Two weddings at the king's house today!", "spartan", true],
["A horse-trainer", "m", "gkman", "Menelaus brought back horses from Egypt. You should see them run.", "spartan"], ["An old man", "m", "gkold", "Eight years he wandered after Troy, the king. Eight.", "spartan"], ["A shepherd", "m", "herd", "The flocks go up the mountain when it's hot.", "spartan"], ["A weaver", "f", "gkveiled", "Purple from the sea, wool from the hills.", "spartan"]], I.town[0] - 90, I.town[1] - 110, I.town[0] + 90, I.town[1] + 110, { wander: 6, persona: "spartan" });
},
function (G) {
var X = HGW_ROOMXZ.ogygia;
var R = hgwRoom(G, "cgrot", X.cgrot[0], X.cgrot[1], 20, 16, { wall: "darkrock", floor: "sand", h: 6, ceil: "darkrock", name: "Calypso's cave", env: "lakecave", lightI: 1.0, lightCol: 0xFFB878, bare: 1 });
hgwFire(R.g, 0, 0, -3, 1.3);
hgwBox(R.g, 2.4, 0.4, 2.4, hgwMat("lime"), 0, 0, -3);
hgwThrone(R.g, -3, -5.6, 0.3, { mat: "oak", trim: "gold" });
hgwThrone(R.g, 3, -5.6, -0.3, { mat: "oak", trim: "silver" });
hgwLoom(R.g, -6, -6.4, 0.2, 0xD8B040);
hgwTable(R.g, 0, -5.2, 2.2, 0.8, 0.74, {});
for (var i = 0; i < 4; i++)
hgwPithos(R.g, 7 - i * 0.9, 0, -6.8, 0.6);
hgwBed(R.g, 6, 2, Math.PI / 2, { cover: 0x3A6A8A });
for (var r = 0; r < 9; r++) {
var a = r / 9 * Math.PI * 2;
hgwPlant(R.g, "rock", [{ x: Math.cos(a) * 9.4, z: Math.sin(a) * 7.4, y: -0.6, s: 2.4, sy: 3.6 }], { mat: hgwMat("darkrock"), keepAll: true });
}
},
function (G) {
var lite = hgwLite(), H = hgwOgH, I = HGW_OG, st = HGW.st;
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.2 });
hgwRoads(G, HGW_OG_ROADS, H, { w: { cave: 3, shore: 3, head: 2.5, wood: 2.5 }, m: { cave: "sand", shore: "sand" } });
var C = I.cave, cy = H(C[0], C[1]);
hgwPlant(G, "rock", [{ x: C[0] - 9, z: C[1] + 2, y: cy - 3, s: 9, sy: 9 }, { x: C[0] + 9, z: C[1] + 2, y: cy - 3, s: 9, sy: 9 }, { x: C[0], z: C[1] + 6, y: cy + 4, s: 12, sy: 8 }, { x: C[0] - 18, z: C[1] + 8, y: cy - 4, s: 10, sy: 10 }, { x: C[0] + 18, z: C[1] + 8, y: cy - 4, s: 10, sy: 10 }], { mat: hgwMat("lime"), keepAll: true });
hgwBox(G, 5, 5.2, 0.6, hgwLam(0x0C0806), C[0], cy - 0.3, C[1] - 2);
hgwSolid(C[0], C[1] + 4, 26, 10, cy - 5, cy + 20);
var vines = [];
for (var v = 0; v < (lite ? 10 : 24); v++)
vines.push({ x: C[0] - 6 + v % 12, z: C[1] - 2.8 - Math.floor(v / 12) * 0.6, y: cy + 3.4 - (v % 3) * 0.8, s: 1.2, rx: Math.PI * 0.5 });
hgwPlant(G, "vine", vines, { keepAll: true });
var rm = hgwRm("cgrot");
if (rm)
hgwDoor(rm, "The mouth of Calypso's cave", C[0], C[1] - 4, Math.PI);
[[30, 26, 0.3], [44, 30, 1.2], [20, 36, 2.2], [36, 44, 3.4]].forEach(function (q) {
var x = C[0] + q[0] - 10, z = C[1] + q[1];
hgwBox(G, 1.6, 0.7, 1.2, hgwMat("lime"), x, H(x, z) - 0.2, z);
hgwWater(G, x, z, 1.4, 1.0, H(x, z) + 0.45, 0x5AAAB8, 0.85);
var pts = [];
for (var k = 0; k < 8; k++)
pts.push([x + Math.cos(q[2]) * k * 6, z + Math.sin(q[2]) * k * 6]);
var m = hgwStrip(G, pts, 1.4, function (a, b) { return H(a, b) + 0.08; }, hgwWaterM(0x5AAAB8, 0.8), 0);
HGW.water.push(m);
});
var R = wRand(9), vio = [];
for (var f = 0; f < (lite ? 60 : 180); f++) {
var a = R() * 6.28, d = 20 + R() * 70, x = C[0] + Math.cos(a) * d, z = C[1] + 40 + Math.sin(a) * d * 0.7;
if (H.sd(x, z) > 20)
vio.push({ x: x, z: z, y: H(x, z), s: 0.7 + R() * 0.5 });
}
hgwPlant(G, "flowers", vio, { col: "#8A5AC8" });
var grove = [];
for (var g = 0; g < (lite ? 30 : 80); g++) {
var a2 = R() * 6.28, d2 = 26 + R() * 90, gx = C[0] + Math.cos(a2) * d2, gz = C[1] + 30 + Math.sin(a2) * d2 * 0.8;
if (H.sd(gx, gz) > 18 && hgwPathD(gx, gz, HGW_OG_ROADS.cave) > 6)
grove.push({ x: gx, z: gz, y: H(gx, gz), s: 0.9 + R() * 0.5 });
}
hgwPlant(G, "poplar", grove.filter(function (p, i) { return i % 3 === 0; }), {});
hgwPlant(G, "cypress", grove.filter(function (p, i) { return i % 3 === 1; }), {});
hgwPlant(G, "tree", grove.filter(function (p, i) { return i % 3 === 2; }), { col: 0x4A7A3A });
var W = I.wood, fw = [];
for (var t = 0; t < (lite ? 40 : 110); t++) {
var wx = W[0] + (R() - 0.5) * 260, wz = W[1] + (R() - 0.5) * 220;
if (H.sd(wx, wz) > 16)
fw.push({ x: wx, z: wz, y: H(wx, wz), s: 0.9 + R() * 0.6 });
}
hgwPlant(G, "conifer", fw.filter(function (p, i) { return i % 2 === 0; }), {});
hgwPlant(G, "poplar", fw.filter(function (p, i) { return i % 2 === 1; }), {});
var Rf = I.raft, ry = H(Rf[0], Rf[1]);
if (st.raft) {
var raft = new THREE.Group();
raft.position.set(Rf[0], ry + 0.3, Rf[1] + 2);
G.add(raft);
for (var lg = 0; lg < 10; lg++) {
var l = new THREE.Mesh(hgwGeo("rlog", function () { var c = new THREE.CylinderGeometry(0.28, 0.3, 9, 8); c.rotateX(Math.PI / 2); return c; }), hgwMat("bark"));
l.position.set(-2.7 + lg * 0.6, 0, 0);
raft.add(l);
}
hgwBox(raft, 6, 0.12, 8.6, hgwMat("planks"), 0, 0.25, 0);
if (st.raft > 1) {
hgwBox(raft, 0.2, 6, 0.2, hgwMat("oak"), 0, 0.3, 0.5);
hgwBox(raft, 3.4, 2.8, 0.04, hgwMat("sail"), 0, 3.0, 0.6);
hgwBox(raft, 0.2, 0.2, 2, hgwMat("oak"), 0, 0.6, 4.6);
}
hgwFloor(Rf[0], Rf[1] + 2, 6, 9, ry + 0.7);
}
else
for (var lg2 = 0; lg2 < 6; lg2++) {
var l2 = new THREE.Mesh(hgwGeo("rlog", function () { var c = new THREE.CylinderGeometry(0.28, 0.3, 9, 8); c.rotateX(Math.PI / 2); return c; }), hgwMat("bark"));
l2.position.set(Rf[0] - 8 + lg2 * 0.7, ry + 0.3, Rf[1] - 4);
l2.rotation.y = 1.4;
G.add(l2);
}
hgwPlant(G, "rock", [{ x: I.weep[0] + 3, z: I.weep[1] + 2, y: H(I.weep[0], I.weep[1]) - 0.6, s: 1.6, sy: 1.0 }], { mat: hgwMat("lime"), keepAll: true });
hgwGreekTrees(G, H, { clear: [[C[0], C[1], 40], [I.bay[0], I.bay[1], 30], [Rf[0], Rf[1], 20], [W[0], W[1], 130]], roads: Object.keys(HGW_OG_ROADS).map(function (k) { return HGW_OG_ROADS[k]; }), olive: 0.3, cypress: 1.4 });
hgwHerd(G, "goat", -500, 200, 80, lite ? 4 : 10, H, 31);
hgwCrowd("ogNymphs", [["A nymph of the springs", "f", "nymph", "The water runs four ways here, and every way is sweet.", "calypso"], ["A nymph with a basket of grapes", "f", "nymph", "Take some. The vines never stop.", "calypso"], ["A nymph at the loom", "f", "nymph", "Our mistress weaves with a golden shuttle. We only wind the wool.", "calypso"], ["A nymph of the wood", "f", "nymph", "He sits on the headland every day. Every single day.", "calypso"]], C[0] - 40, C[1] + 20, C[0] + 40, C[1] + 80, { wander: 5, ok: function (x, z) { return H.sd(x, z) > 16; }, persona: "calypso" });
if (HGB_ORDER && hgbS("odyssey").done)
hgwHarbourSpots("ogygia", I.bay[0] - 8, I.bay[1] + 4);
else
hgwSpot(I.bay[0] - 8, I.bay[1] + 4, 4, "The ship's chart", "see the map of the myths", function () { hgwMapCard(true); });
},
function (G) {
var X = HGW_ROOMXZ.scheria;
var R = hgwHallRoom(G, "ahall", X.ahall, { name: "the hall of Alcinous, walled with bronze", rich: true, queen: true, tables: 8 });
[[-9, -3], [9, -3], [-9, 3], [9, 3]].forEach(function (q) { var g = hgwDressed("gy" + q[0] + q[1], "prince", { sex: "m" }); g.position.set(q[0], 0.6, q[1]); g.traverse(function (o) { if (o.isMesh)
o.material = hgwMat("gold"); }); R.g.add(g); hgwBox(R.g, 0.9, 0.6, 0.9, hgwMat("lime"), q[0], 0, q[1]); hgwFire(R.g, q[0] + 0.3, 2.6, q[1], 0.25); });
R = hgwRoom(G, "aroom", X.aroom[0], X.aroom[1], 10, 8, { wall: "whitewash", floor: "gkfloor", h: 3.4, name: "Queen Arete's place by the hearth", lightI: 0.7, bare: 1 });
hgwHearth(R.g, 0, -3.6, 0, { h: R.h, mat: "lime" });
hgwThrone(R.g, -1.4, -2.2, 0, { trim: "silver" });
hgwLoom(R.g, 3, -3, 0, 0x6A2A5A);
R = hgwRoom(G, "nroom", X.nroom[0], X.nroom[1], 8, 7, { wall: "whitewash", floor: "planks", h: 3.2, name: "Nausicaa's room", lightI: 0.6, bare: 1 });
hgwBed(R.g, -1.6, -1.6, Math.PI / 2, { cover: 0xE8D0D8 });
hgwBox(R.g, 1, 0.6, 0.5, hgwMat("oak"), 2.2, 0, -2.8);
hgwBathRoom(G, "abath", X.abath, "the bath of Alcinous' house");
R = hgwRoom(G, "port", X.port[0], X.port[1], 12, 8, { wall: "limewall", floor: "gkfloor", h: 3.6, name: "the echoing portico, where the guest's bed is made", lightI: 0.5, bare: 1 });
[-4, 0, 4].forEach(function (x) { hgwColumn(R.g, x, 0, 1.4, 3.6, 0.24, { wood: true }); });
hgwBed(R.g, 0, -2, Math.PI / 2, { cover: 0x8A2A4A });
R = hgwRoom(G, "shouse", X.shouse[0], X.shouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a Phaeacian's house", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwTable(R.g, 1.6, 0.6, 1.6, 0.8, 0.74, {});
hgwBox(R.g, 2.4, 0.3, 0.6, hgwMat("oak"), -2.6, 0, -2.2);
hgwInDoor("ahall", "aroom", -12, -6, "Through to the queen's hearth", "go through");
hgwInDoor("ahall", "abath", 12, -6, "The door to the bath", "go through");
hgwInDoor("ahall", "port", -12, 4, "Out to the portico", "go through");
hgwInDoor("ahall", "nroom", 12, 4, "Up to Nausicaa's room", "go up");
},
function (G) {
var lite = hgwLite(), H = hgwShH, I = HGW_SH, st = HGW.st, R = wRand(17);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.25 });
var roadsAll = Object.keys(HGW_SH_ROADS).map(function (k) { return HGW_SH_ROADS[k]; });
hgwRoads(G, HGW_SH_ROADS, H, { w: { coast: 5, city: 7, south: 5, games: 5, inland: 4 }, m: { city: "paving" } });
var wall = [];
for (var a = 0; a <= 24; a++) {
var t = -Math.PI * 0.62 + a / 24 * Math.PI * 1.24, wx = I.city[0] + Math.cos(t + Math.PI) * 120, wz = I.city[1] + Math.sin(t + Math.PI) * 140;
wall.push([wx, wz]);
}
hgwBigWall(G, wall, 7, H, { mat: "ashlar", th: 2.4, tower: true, gate: [[HGW_AT.shGate.x, HGW_AT.shGate.z, 7]] });
var K = hgwKingsHouse(G, H, { at: I.palace, ry: I.ry, hall: "ahall", rich: true, wall: "ashlar", cw: 60, cd: 44 });
[-3.6, 3.6].forEach(function (dx, i) { var dq = K.T(dx, -25); var dg = hgwDog(0, 1.6); dg.position.set(dq[0], K.y, dq[1]); dg.rotation.y = I.ry; dg.traverse(function (o) { if (o.isMesh)
o.material = hgwMat(i ? "silver" : "gold"); }); G.add(dg); });
var gq = K.T(0, -22.4);
hgwBox(G, 8.2, 0.8, 0.5, hgwMat("bluepaint"), gq[0], K.y + 4.6, gq[1], I.ry);
var sp = K.T(16, 8), ab = hgwRm("abath");
if (ab)
hgwDoor(ab, "The door of the bath-house", sp[0], sp[1], I.ry);
var orch = [];
for (var oy = 0; oy < 7; oy++)
for (var ox = 0; ox < 8; ox++) {
var px = I.palace[0] - 110 - oy * 7, pz = I.palace[1] - 28 + ox * 8;
orch.push({ x: px, z: pz, y: H(px, pz), s: 0.9 });
}
hgwPlant(G, "fig", orch.filter(function (p, i) { return i % 4 === 0; }), {});
hgwPlant(G, "tree", orch.filter(function (p, i) { return i % 4 === 1; }).map(function (p) { p.s = 0.5; return p; }), { col: 0x5A8A3A });
hgwPlant(G, "olive", orch.filter(function (p, i) { return i % 4 === 2; }), {});
hgwPlant(G, "tree", orch.filter(function (p, i) { return i % 4 === 3; }).map(function (p) { p.s = 0.45; return p; }), { col: 0x6A9A3A });
var vin = [];
for (var vr = 0; vr < 6; vr++)
for (var vc = 0; vc < 14; vc++) {
var vx = I.palace[0] - 166 - vr * 3, vz = I.palace[1] - 26 + vc * 2.6;
vin.push({ x: vx, z: vz, y: H(vx, vz) });
}
hgwPlant(G, "vine", vin, { keepAll: true });
[[I.palace[0] - 130, I.palace[1] - 34], [I.palace[0] - 130, I.palace[1] + 34]].forEach(function (q) { hgwBox(G, 3, 0.8, 2, hgwMat("lime"), q[0], H(q[0], q[1]) - 0.2, q[1]); hgwWater(G, q[0], q[1], 2.6, 1.6, H(q[0], q[1]) + 0.55, 0x5AAAB8, 0.85); });
var ag = I.agora, agy = H(ag[0], ag[1]);
hgwTemple(G, ag[0] + 18, ag[1], 12, 20, { ry: -Math.PI / 2, statue: "warrior", statueSex: "m" });
for (var k = 0; k < 14; k++) {
var ka = Math.PI * 0.5 + k / 13 * Math.PI, sx = ag[0] + Math.cos(ka) * 14, sz = ag[1] + Math.sin(ka) * 14;
hgwBox(G, 2.6, 0.5, 0.9, hgwMat("ashlar"), sx, agy, sz, -ka + Math.PI / 2);
hgwSolid(sx, sz, 2.6, 0.9, agy - 1, agy + 0.5, -ka + Math.PI / 2);
}
for (var oa = 0; oa < (lite ? 6 : 14); oa++) {
var ox2 = ag[0] - 6 + oa % 7 * 2, oz2 = ag[1] + 18 + Math.floor(oa / 7) * 2;
hgwBox(G, 0.12, 0.12, 5.4, hgwMat("oak"), ox2, agy + 0.1, oz2, 0.1);
}
hgwTownPack(G, H, { c: I.city, rx: 100, rz: 120, n: 64, seed: 61, roads: roadsAll, avoid: [[I.palace[0], I.palace[1], 46], [ag[0], ag[1], 26], [I.games[0], I.games[1], 42], [I.palace[0] - 140, I.palace[1], 60]], tile: 0.5, door: { key: "shouse", name: "The door of a Phaeacian's house" }, life: true });
hgwQuay(G, H, { at: [I.harbourN[0], I.harbourN[1]], ry: Math.PI / 2, len: 50, drawn: [[I.harbourN[0] - 8, I.harbourN[1] - 30, Math.PI / 2], [I.harbourN[0] - 8, I.harbourN[1] - 14, Math.PI / 2], [I.harbourN[0] - 8, I.harbourN[1] + 14, Math.PI / 2]], anchor: [[I.harbourN[0] + 40, I.harbourN[1] + 10, 0.3, 22, 1], [I.harbourN[0] + 60, I.harbourN[1] - 30, 0.1, 20]] });
hgwQuay(G, H, { at: [I.harbourS[0], I.harbourS[1]], ry: Math.PI * 0.6, len: 40, drawn: [[I.harbourS[0] - 14, I.harbourS[1] + 6, Math.PI * 0.6], [I.harbourS[0] - 8, I.harbourS[1] - 12, Math.PI * 0.6]] });
hgwHarbourSpots("scheria", I.harbourN[0] - 8, I.harbourN[1] + 4);
if (st.phship)
hgwShip(G, I.harbourN[0] + 16, 0.1, I.harbourN[1], Math.PI, { len: 24, afloat: true, sail: true });
var gm = I.games, gy = H(gm[0], gm[1]);
var df = new THREE.Mesh(hgwGeo("dfl", function () { var c = new THREE.CircleGeometry(12, 28); c.rotateX(-Math.PI / 2); return c; }), hgwMat("sand"));
df.position.set(gm[0], gy + 0.05, gm[1]);
G.add(df);
hgwStrip(G, [[gm[0] - 30, gm[1] + 20], [gm[0] + 30, gm[1] + 20]], 6, H, hgwMat("sand"), 0.07);
[gm[0] - 30, gm[0] + 30].forEach(function (px) { hgwBox(G, 0.3, 1.6, 0.3, hgwMat("oak"), px, H(px, gm[1] + 20), gm[1] + 20); });
for (var dq2 = 0; dq2 < 3; dq2++)
hgwCyl(G, 0.32, 0.32, 0.08, hgwMat("lime"), gm[0] + 20 + dq2 * 1.2, gy, gm[1] - 10, 14);
var P = I.pools, py = H(P[0], P[1]);
for (var wp = 0; wp < 4; wp++) {
var wx = P[0] - 6 + wp * 4, wz = P[1] + 4;
hgwBox(G, 3.4, 0.6, 2.2, hgwMat("lime"), wx, py - 0.3, wz);
hgwWater(G, wx, wz, 3, 1.8, py + 0.25, 0x6AAAB8, 0.85);
}
var rv = hgwStrip(G, HGW_SH_RIVER, 13, function () { return -0.05; }, hgwWaterM(0x3A6A6A, 0.88), 0);
HGW.water.push(rv);
rv.userData.fx = 0.6;
rv.userData.fz = 0;
if (st.washing) {
for (var cl = 0; cl < 8; cl++) {
var cx = P[0] - 10 + cl * 2.6, cz = P[1] - 10 + (cl % 2) * 2;
hgwBox(G, 1.6, 0.04, 1.0, hgwLam([0xE8E0D0, 0xB83A3A, 0x3A5A9A, 0xE8C850][cl % 4], { ds: 1 }), cx, H(cx, cz) + 0.06, cz, R());
}
hgwCart(G, P[0] + 10, P[1] - 14, 0.6, {});
}
hgwPlant(G, "olive", [{ x: I.olives[0] - 2, z: I.olives[1], y: H(I.olives[0] - 2, I.olives[1]), s: 1.4 }, { x: I.olives[0] + 2.4, z: I.olives[1] + 1, y: H(I.olives[0] + 2.4, I.olives[1] + 1), s: 1.3 }], { keepAll: true });
var gv = [];
for (var p = 0; p < (lite ? 10 : 24); p++) {
var ga = R() * 6.28, gd = 8 + R() * 20;
gv.push({ x: I.grove[0] + Math.cos(ga) * gd, z: I.grove[1] + Math.sin(ga) * gd, y: 0, s: 1 });
}
gv.forEach(function (q) { q.y = H(q.x, q.z); });
hgwPlant(G, "poplar", gv, {});
hgwAltar(G, I.grove[0], I.grove[1], H, {});
hgwWater(G, I.grove[0] + 8, I.grove[1] + 6, 4, 3, H(I.grove[0] + 8, I.grove[1] + 6) + 0.2, 0x5AAAB8, 0.85);
hgwGreekTrees(G, H, { clear: [[I.city[0], I.city[1], 150], [I.palace[0] - 140, I.palace[1], 70], [P[0], P[1], 30], [I.grove[0], I.grove[1], 34]], roads: roadsAll, olive: 1.6, cypress: 1.2 });
hgwHerd(G, "sheep", -400, -100, 80, lite ? 6 : 14, H, 81);
hgwHerd(G, "cow", -600, -300, 60, lite ? 4 : 8, H, 82);
hgwCrowd("shCity", [["A Phaeacian shipwright", "m", "sailor", "Our ships need no steersman: they know the thoughts of men, and go where we wish.", "phaeacian"], ["A rope-maker", "m", "gkman", "Twist it tight, it holds a ship in a storm.", "phaeacian"], ["A woman weaving", "f", "gkwoman", "Our women weave as well as our men sail. Athena taught us.", "phaeacian"],
["A boy with a ball", "m", "gkman", "Can you dance? Everyone here can dance.", "phaeacian", true], ["An old sea-captain", "m", "gkold", "We take anyone home, stranger. Anyone, anywhere.", "phaeacian"], ["A girl with a basket of pears", "f", "gkwoman", "From the king's orchard. It never stops fruiting.", "phaeacian", true], ["A ship's carpenter", "m", "sailor", "Pine for the oars. Always pine.", "phaeacian"], ["A merchant", "m", "gkman", "The world comes to Scheria for our ships.", "phaeacian"]], I.city[0] - 70, I.city[1] - 80, I.city[0] + 70, I.city[1] + 80, { wander: 6, ok: function (x, z) { return H.sd(x, z) > 14; }, persona: "phaeacian" });
},
function (G) {
var H = HGW_IS_H, I = HGW_IS, lite = hgwLite(), X = HGW_ROOMXZ.ismarus;
var R = hgwRoom(G, "maron", X.maron[0], X.maron[1], 10, 8, { wall: "whitewash", floor: "beaten", h: 3.2, name: "Maron's storeroom, under the house", lightI: 0.5, bare: 1, beams: true });
for (var j = 0; j < 12; j++)
hgwPithos(R.g, -4 + (j % 6) * 1.6, 0, -2.6 + Math.floor(j / 6) * 1.6, 0.75);
hgwHearth(R.g, 0, 3.2, Math.PI, { h: R.h, mat: "lime" });
R = hgwRoom(G, "cichouse", X.cichouse[0], X.cichouse[1], 9, 7, { wall: "mudbrick", floor: "beaten", h: 3.0, name: "a Ciconian's house", lightI: 0.55, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwLoom(R.g, -3, -2.6, 0.4);
hgwWildBase(G, H, { roads: HGW_IS_ROADS, rw: { town: 5, grove: 4 }, dry: 0.5 });
var wall = hgwContour({ sd: function (x, z) { return 70 - Math.hypot(x - I.town[0], z - I.town[1]); } }, I.town[0], I.town[1], 0, 28);
hgwBigWall(G, wall, 6, H, { mat: "cyclopean", th: 2.6, tower: true, gate: [[-205, -275, 8]] });
hgwTownPack(G, H, { c: I.town, rx: 55, rz: 55, n: 30, seed: 91, roads: hgwRoadList(HGW_IS_ROADS), r2: 0.3, tile: 0.2, door: { key: "cichouse", name: "The door of a Ciconian house" }, life: true });
hgwGkHouse(G, I.grove[0], I.grove[1], 12, 9, 4, { ry: 0.3, court: true });
var rm = hgwRm("maron");
if (rm)
hgwDoor(rm, "The door of Maron's house", I.grove[0] - 5, I.grove[1] + 8, 0.3);
hgwTemple(G, I.grove[0] + 30, I.grove[1] - 20, 10, 16, { ry: 0.3, statue: "warrior", statueSex: "m" });
var lau = [], Rr = wRand(91);
for (var t = 0; t < (lite ? 14 : 34); t++) {
var a = Rr() * 6.28, d = 18 + Rr() * 40, x = I.grove[0] + Math.cos(a) * d, z = I.grove[1] + Math.sin(a) * d;
lau.push({ x: x, z: z, y: H(x, z), s: 0.8 + Rr() * 0.4 });
}
hgwPlant(G, "tree", lau, { col: 0x3A6A2A });
var vin = [];
for (var vr = 0; vr < 12; vr++)
for (var vc = 0; vc < 22; vc++) {
var vx = I.vines[0] - 30 + vc * 2.6, vz = I.vines[1] - 20 + vr * 3;
vin.push({ x: vx, z: vz, y: H(vx, vz) });
}
hgwPlant(G, "vine", vin, { keepAll: true });
hgwFleet(G, H, -10, 20, 0, 6, 9);
hgwGreekTrees(G, H, { clear: [[I.town[0], I.town[1], 80], [I.grove[0], I.grove[1], 50], [I.vines[0], I.vines[1], 40], [0, 0, 40]], roads: hgwRoadList(HGW_IS_ROADS), olive: 0.8, oak: 1.6, pine: 1.4 });
hgwHerd(G, "sheep", -500, -500, 80, lite ? 6 : 14, H, 92);
hgwHerd(G, "horse", -100, -500, 60, lite ? 3 : 7, H, 93);
hgwCrowd("isTown", [["A Ciconian woman at her door", "f", "gkwoman", "Ships on the beach! Run and tell the men inland, the ones who fight from chariots.", "greek"], ["A Ciconian spearman", "m", "warrior", "Our brothers inland fight from horseback, and on foot if they must.", "greek"], ["A vine-dresser", "m", "gkman", "Maron's wine is so strong you mix one cup with twenty of water.", "greek"], ["An old Ciconian", "m", "gkold", "Troy's allies, we were. Much good it did us.", "greek"], ["A girl with a jar", "f", "gkwoman", "Apollo's priest lives in the grove. No one touches him.", "greek", true]], I.town[0] - 40, I.town[1] - 40, I.town[0] + 40, I.town[1] + 40, { wander: 6, persona: "greek" });
hgwHarbourSpots("ismarus", 6, -4);
},
function (G) {
var H = HGW_LO_H, I = HGW_LO, lite = hgwLite(), R = wRand(71);
hgwWildBase(G, H, { roads: HGW_LO_ROADS, rw: { v: 4, g: 4 }, dry: 0.85 });
var lo = [];
for (var t = 0; t < (lite ? 24 : 60); t++) {
var a = R() * 6.28, d = R() * 60, x = I.grove[0] + Math.cos(a) * d, z = I.grove[1] + Math.sin(a) * d;
if (H.sd(x, z) > 8)
lo.push({ x: x, z: z, y: H(x, z), s: 0.6 + R() * 0.4 });
}
hgwPlant(G, "tree", lo, { col: 0x7A9A3A });
hgwPlant(G, "flowers", lo.map(function (p) { return { x: p.x + 1.5, z: p.z + 1, y: p.y, s: 0.8 }; }), { col: "#E8C850" });
hgwTownPack(G, H, { c: I.village, rx: 45, rz: 40, n: 14, seed: 72, roads: hgwRoadList(HGW_LO_ROADS), r2: 0.2, tile: 0, life: true });
var palms = [];
for (var p = 0; p < (lite ? 20 : 50); p++) {
var px = -500 + R() * 1000, pz = -560 + R() * 500;
if (H.sd(px, pz) > 10 && H.sd(px, pz) < 120)
palms.push({ x: px, z: pz, y: H(px, pz), s: 1.1 + R() * 0.4 });
}
hgwPlant(G, "cypress", palms, {});
hgwPlant(G, "maquis", hgwScatter(73, lite ? 60 : 160, -900, -560, 900, 600, function (x, z) { return H.sd(x, z) > 14; }, H, 0.6, 1.1), {});
hgwFleet(G, H, 0, -575, 0, 3, 10);
hgwHerd(G, "goat", -300, -200, 80, lite ? 4 : 8, H, 74);
hgwCrowd("loVillage", [["A Lotus-Eater, smiling", "m", "gkman", "Sit down. Eat. Why would you ever go anywhere?", "greek"], ["A Lotus-Eater woman", "f", "gkwoman", "Honey-sweet, the fruit. Try one. Only one.", "greek"], ["A drowsy old man", "m", "gkold", "Home? I had one once, I think.", "greek"], ["A girl with lotus flowers", "f", "gkwoman", "They never fight here. They never want anything.", "greek", true], ["A sailor who stayed", "m", "sailor", "My ship left. I don't mind. I don't mind anything.", "greek"]], I.village[0] - 40, I.village[1] - 30, I.village[0] + 40, I.village[1] + 30, { wander: 3, persona: "greek" });
hgwHarbourSpots("lotus", 6, -552);
},
function (G) {
var X = HGW_ROOMXZ.cyclops, st = HGW.st;
var R = hgwRoom(G, "pcave", X.pcave[0], X.pcave[1], 44, 32, { wall: "darkrock", floor: "beaten", h: 16, ceil: "darkrock", name: "the cave of Polyphemus", env: "lakecave", lightI: 0.7, lightCol: 0xFFB070, bare: 1 });
for (var r = 0; r < 14; r++) {
var a = r / 14 * Math.PI * 2;
hgwPlant(R.g, "rock", [{ x: Math.cos(a) * 21, z: Math.sin(a) * 15, y: -1, s: 6, sy: 12 }], { mat: hgwMat("darkrock"), keepAll: true });
}
hgwFire(R.g, 0, 0, 4, 2.6);
[[-14, -8], [-14, 2], [12, -8]].forEach(function (q, i) { var pts = [[q[0] - 6, q[1] - 4], [q[0] + 6, q[1] - 4], [q[0] + 6, q[1] + 4], [q[0] - 6, q[1] + 4], [q[0] - 6, q[1] - 4]]; hgwPaling(R.g, pts, function () { return 0; }, { h: 1.6 }); hgwHerd(R.g, i === 2 ? "goat" : "sheep", q[0], q[1], 4, hgwLite() ? 3 : 6, function () { return 0; }, 300 + i); });
for (var c = 0; c < 4; c++) {
hgwShelves(R.g, 8 + c * 3.4, -14, 3, 4.6, 0, {});
for (var k = 0; k < 6; k++)
hgwCyl(R.g, 0.5, 0.5, 0.4, hgwLam(0xE8DCA8), 8 + c * 3.4 - 1 + (k % 3), 1 + Math.floor(k / 3) * 1.6, -13.6, 12);
}
for (var p = 0; p < 6; p++)
hgwPithos(R.g, 14 + (p % 3) * 1.6, 0, 4 + Math.floor(p / 3) * 1.8, 1.4);
hgwBox(R.g, 0.8, 0.8, 16, hgwMat("bark"), -4, 0.4, 12, 0.2);
if (st.stone)
hgwPlant(R.g, "rock", [{ x: 0, z: 15, y: -1, s: 9, sy: 9 }], { mat: hgwMat("rock"), keepAll: true });
},
function (G) {
var H = HGW_CY_H, I = HGW_CY, lite = hgwLite(), st = HGW.st, R = wRand(81);
hgwWildBase(G, H, { roads: HGW_CY_ROADS, rw: { cave: 3 }, dry: 0.45 });
var yw = [];
for (var i = 0; i <= 20; i++) {
var a = -Math.PI * 0.5 + i / 20 * Math.PI;
yw.push([I.yard[0] + Math.cos(a) * 34, I.yard[1] + Math.sin(a) * 34]);
}
hgwBigWall(G, yw, 5, H, { mat: "cyclopean", th: 3, gate: [[-556, -254, 6]] });
var C = I.cave, cy = H(C[0], C[1]);
hgwPlant(G, "rock", [{ x: C[0] - 12, z: C[1] - 10, y: cy - 2, s: 14, sy: 16 }, { x: C[0] - 12, z: C[1] + 10, y: cy - 2, s: 14, sy: 16 }, { x: C[0] - 18, z: C[1], y: cy + 10, s: 18, sy: 12 }], { mat: hgwMat("darkrock"), keepAll: true });
hgwBox(G, 1, 12, 14, hgwLam(0x080604), C[0] - 6, cy - 0.5, C[1]);
hgwSolid(C[0] - 14, C[1], 12, 30, cy - 4, cy + 30);
if (st.stone)
hgwPlant(G, "rock", [{ x: C[0] - 3, z: C[1], y: cy - 1, s: 8, sy: 8 }], { mat: hgwMat("rock"), keepAll: true });
hgwPlant(G, "tree", [{ x: C[0] - 4, z: C[1] - 9, y: cy, s: 1.4 }, { x: C[0] - 4, z: C[1] + 9, y: cy, s: 1.3 }], { col: 0x3A5A2A });
var tall = [];
for (var t = 0; t < (lite ? 14 : 34); t++) {
var ta = R() * 6.28, td = 38 + R() * 60;
tall.push({ x: I.yard[0] + Math.cos(ta) * td, z: I.yard[1] + Math.sin(ta) * td, y: 0, s: 1.3 + R() * 0.6 });
}
tall.forEach(function (q) { q.y = H(q.x, q.z); });
hgwPlant(G, "pine", tall.filter(function (q, i) { return i % 2; }), {});
hgwPlant(G, "tree", tall.filter(function (q, i) { return !(i % 2); }), { col: 0x4A6A2A });
var rm = hgwRm("pcave");
if (rm)
hgwDoor(rm, "Into the cave of the Cyclops", C[0] + 4, C[1], -Math.PI / 2);
hgwHerd(G, "sheep", -500, -420, 90, lite ? 8 : 22, H, 82);
hgwHerd(G, "goat", -760, -60, 90, lite ? 6 : 16, H, 83);
hgwHerd(G, "goat", 250, -250, 80, lite ? 6 : 16, H, 84);
hgwFleet(G, H, -346, 12, Math.PI / 2, 1, 0);
hgwGreekTrees(G, H, { clear: [[I.yard[0], I.yard[1], 46], [I.beach[0], I.beach[1], 30]], roads: hgwRoadList(HGW_CY_ROADS), olive: 0.4, oak: 1.8, pine: 1.6 });
[[-900, -500], [-820, 300], [-1000, 100]].forEach(function (q, i) { hgwPlant(G, "rock", [{ x: q[0], z: q[1], y: H(q[0], q[1]) - 2, s: 16, sy: 14 }], { mat: hgwMat("darkrock"), keepAll: true }); hgwBox(G, 1, 9, 10, hgwLam(0x080604), q[0] + 8, H(q[0] + 8, q[1]) - 0.5, q[1]); });
hgwCrowd("cyBeach", [["One of Odysseus' crew", "m", "sailor", "Goats on that island, captain, thousands of them, and no one to hunt them.", "sailor"], ["A young oarsman", "m", "sailor", "Smoke up there on the mountain. And bleating. Big bleating.", "sailor"], ["The ship's helmsman", "m", "sailor", "Twelve ships on the goat island. We came over with just ours.", "sailor"]], -345, -14, -320, 14, { wander: 3, persona: "sailor" });
hgwHarbourSpots("cyclops", -322, 8);
},
function (G) {
var H = HGW_AO_H, I = HGW_AO, lite = hgwLite();
hgwHallRoom(G, "aohall", HGW_ROOMXZ.aeolia.aohall, { name: "the hall of Aeolus, where his sons and daughters feast", rich: true, queen: true, tables: 6 });
hgwWildBase(G, H, { roads: HGW_AO_ROADS, rw: { up: 5 }, dry: 0.3 });
var ring = hgwContour(H, -300, -400, 26, 48);
hgwBigWall(G, ring, 9, H, { mat: "bronze", th: 2, gate: [[-300, 186, 10]] });
hgwKingsHouse(G, H, { at: I.palace, ry: I.ry, hall: "aohall", rich: true, wall: "ashlar" });
hgwGreekTrees(G, H, { clear: [[I.palace[0], I.palace[1], 50]], roads: hgwRoadList(HGW_AO_ROADS), olive: 1.2, cypress: 1.6 });
hgwHerd(G, "cow", -200, -150, 60, lite ? 4 : 9, H, 51);
hgwHerd(G, "sheep", -500, -700, 60, lite ? 5 : 12, H, 52);
hgwCrowd("aoCourt", [["A son of Aeolus", "m", "prince", "Six of us, six sisters. We feast every day in our father's hall.", "greek"], ["A daughter of Aeolus", "f", "princess", "The winds? Father keeps them. Zeus gave him the keeping.", "greek"], ["A steward of Aeolus", "m", "gkman", "The island floats, you know. Some mornings it is somewhere else.", "greek"], ["A son of Aeolus, younger", "m", "prince", "Hear that? That's the wind in the wall.", "greek"]], I.palace[0] - 30, I.palace[1] + 20, I.palace[0] + 30, I.palace[1] + 60, { wander: 5, persona: "greek" });
hgwFleet(G, H, -316, 214, 0, 1, 0);
hgwHarbourSpots("aeolia", -294, 204);
},
function (G) {
var H = HGW_LA_H, I = HGW_LA, lite = hgwLite();
hgwWildBase(G, H, { roads: HGW_LA_ROADS, rw: { road: 6, town: 8 }, dry: 0.45 });
hgwBox(G, 3, 1, 2.4, hgwMat("lime"), I.spring[0], H(I.spring[0], I.spring[1]) - 0.2, I.spring[1]);
hgwWater(G, I.spring[0] + 3, I.spring[1], 3, 3, H(I.spring[0], I.spring[1]) + 0.5, 0x5AAAB8, 0.85);
var R = wRand(61);
for (var k = 0; k < (lite ? 8 : 18); k++) {
var a = R() * 6.28, d = 20 + R() * 70, x = I.town[0] + Math.cos(a) * d, z = I.town[1] + Math.sin(a) * d;
if (hgwPathD(x, z, HGW_LA_ROADS.town) < 14)
continue;
hgwGkHouse(G, x, z, 18 + R() * 6, 14 + R() * 4, 10, { ry: R() * 6.28, wall: "cyclopean" });
}
hgwGkHouse(G, I.palace[0], I.palace[1], 40, 28, 16, { ry: 0.4, wall: "cyclopean", court: true });
hgwFleet(G, H, -300, -60, 0.6, 5, 10);
hgwFleet(G, H, 316, 196, Math.PI / 2, 1, 0);
hgwGreekTrees(G, H, { clear: [[I.town[0], I.town[1], 100], [I.palace[0], I.palace[1], 40]], roads: hgwRoadList(HGW_LA_ROADS), olive: 0.3, pine: 1.4, cypress: 0.6 });
hgwHerd(G, "cow", 420, -200, 80, lite ? 4 : 10, H, 62);
hgwHerd(G, "sheep", -100, -700, 80, lite ? 5 : 12, H, 63);
hgwCrowd("laMouth", [["One of Odysseus' crew", "m", "sailor", "The captain moored us out here on the point. He doesn't like harbours he can't see out of.", "sailor"], ["A lookout", "m", "sailor", "Smoke inland. No ploughing, no cattle-work. Strange country.", "sailor"], ["An oarsman", "m", "sailor", "Here the herdsman going out calls to the one coming in. Day and night run together.", "sailor"]], 286, 170, 306, 190, { wander: 3, persona: "sailor" });
hgwHarbourSpots("laestry", 292, 186);
},
function (G) {
var H = HGW_AE_H, I = HGW_AE, lite = hgwLite(), st = HGW.st, X = HGW_ROOMXZ.aeaea;
var R = hgwRoom(G, "chall", X.chall[0], X.chall[1], 22, 16, { wall: "ashlar", floor: "gkfloor", h: 5, name: "the hall of Circe", lightI: 0.8, lightCol: 0xFFC890, bare: 1 });
hgwLoom(R.g, -7, -7, 0.2, 0xC8A040);
hgwThrone(R.g, 0, -6.4, 0, { trim: "silver" });
hgwThrone(R.g, -3, -5.6, 0.2, {});
hgwThrone(R.g, 3, -5.6, -0.2, {});
hgwTable(R.g, 0, -3.4, 3, 1, 0.8, {});
for (var p = 0; p < 4; p++)
hgwTripod(R.g, -6 + p * 4, 0, 4);
hgwHallHearth(R.g, 0, 1, 1.2, {});
hgwCyl(R.g, 0.7, 0.5, 0.6, hgwMat("silver"), 5, 0.8, -5, 16);
R = hgwRoom(G, "croom", X.croom[0], X.croom[1], 10, 8, { wall: "ashlar", floor: "gkfloor", h: 3.6, name: "Circe's room", lightI: 0.6, bare: 1 });
hgwBed(R.g, 0, -1.6, Math.PI / 2, { cover: 0x6A2A6A });
hgwInDoor("chall", "croom", 10, -6, "Through to Circe's room", "go through");
hgwWildBase(G, H, { roads: HGW_AE_ROADS, rw: { up: 3, crag: 2.5 }, dry: 0.3 });
hgwGkHouse(G, I.house[0], I.house[1], 18, 14, 5, { ry: I.ry, wall: "ashlar", court: true });
var rm = hgwRm("chall");
if (rm)
hgwDoor(rm, "The doors of Circe's house", I.house[0], I.house[1] + 15, I.ry + Math.PI);
var sx = I.house[0] + 26, sz = I.house[1] + 10;
hgwPaling(G, [[sx - 8, sz - 6], [sx + 8, sz - 6], [sx + 8, sz + 6], [sx - 8, sz + 6], [sx - 8, sz - 6]], H, { h: 1.4 });
if (st.swine)
hgwHerd(G, "pig", sx, sz, 5, lite ? 6 : 12, H, 71);
hgwBeasts(G, "wolf", I.house[0] - 14, I.house[1] + 24, 12, 4, H, 72, 1.0);
hgwBeasts(G, "lion", I.house[0] + 12, I.house[1] + 26, 12, 3, H, 73, 1.0);
var oak = [], Rr = wRand(74);
for (var t = 0; t < (lite ? 50 : 140); t++) {
var a = Rr() * 6.28, d = 40 + Rr() * 260, x = I.house[0] + Math.cos(a) * d, z = I.house[1] + 60 + Math.sin(a) * d * 1.2;
if (H.sd(x, z) > 14 && hgwPathD(x, z, HGW_AE_ROADS.up) > 5)
oak.push({ x: x, z: z, y: H(x, z), s: 1.1 + Rr() * 0.6 });
}
hgwPlant(G, "tree", oak, { col: 0x3A5A2A });
hgwFleet(G, H, 312, 150, 0, 1, 0);
hgwGreekTrees(G, H, { clear: [[I.house[0], I.house[1], 50]], roads: hgwRoadList(HGW_AE_ROADS), olive: 0.4, oak: 1.8, pine: 1.2 });
hgwCrowd("aeHouse", [["A handmaid of Circe, a nymph of the springs", "f", "nymph", "Our mistress sings at her loom. Go in, if you dare.", "circe"], ["A handmaid of Circe, a nymph of the groves", "f", "nymph", "Wash first. Then wine. That is how she welcomes guests.", "circe"], ["A handmaid of Circe, a nymph of the sacred rivers", "f", "nymph", "She has a herb for everything. Everything.", "circe"], ["A handmaid of Circe", "f", "nymph", "The wolves won't hurt you. Not any more.", "circe"]], I.house[0] - 12, I.house[1] + 16, I.house[0] + 12, I.house[1] + 30, { wander: 4, persona: "circe" });
hgwHarbourSpots("aeaea", 306, 128);
},
function (G) {
var H = HGW_OC_H, I = HGW_OC, lite = hgwLite(), R = wRand(41);
hgwWildBase(G, H, { roads: { p: [[-400, 0], [-300, -30], [-200, -110]] }, rw: { p: 2.5 }, dry: 0.9 });
var gv = [];
for (var t = 0; t < (lite ? 24 : 60); t++) {
var a = R() * 6.28, d = R() * 50, x = I.grove[0] + Math.cos(a) * d, z = I.grove[1] + Math.sin(a) * d;
if (H.sd(x, z) > 8)
gv.push({ x: x, z: z, y: H(x, z), s: 1 + R() * 0.4 });
}
hgwPlant(G, "poplar", gv.filter(function (p, i) { return i % 2; }), { col: 0x1E2A1E });
hgwPlant(G, "tree", gv.filter(function (p, i) { return !(i % 2); }), { col: 0x3A4A3A });
hgwPlant(G, "asphodel", hgwScatter(42, lite ? 120 : 320, -450, -300, 200, 300, function (x, z) { return H.sd(x, z) > 10; }, H, 0.6, 1.0), {});
var py = H(I.pit[0], I.pit[1]);
hgwBox(G, 1.6, 0.4, 1.6, hgwLam(0x0A0806), I.pit[0], py - 0.3, I.pit[1]);
var ry = H(I.rock[0], I.rock[1]);
hgwPlant(G, "rock", [{ x: I.rock[0], z: I.rock[1], y: ry - 2, s: 12, sy: 10 }], { mat: hgwMat("darkrock"), keepAll: true });
[[[-190, -120], [-120, -260], [-60, -420]], [[-190, -120], [-40, -60], [120, -20]]].forEach(function (p) { var m = hgwStrip(G, p, 6, function (x, z) { return H(x, z) + 0.12; }, hgwWaterM(0x0E1418, 0.92), 0); HGW.water.push(m); });
hgwPlant(G, "rock", hgwScatter(43, lite ? 20 : 50, -400, -400, 400, 400, function (x, z) { return H.sd(x, z) > 16; }, H, 1, 3).map(function (p) { p.sy = p.s * 0.7; return p; }), { mat: hgwMat("darkrock"), keepAll: true });
if (!HGW.st.underworld) {
hgwFleet(G, H, -420, 14, Math.PI / 2, 1, 0);
hgwCrowd("ocShore", [["One of Odysseus' crew, shivering", "m", "sailor", "The sun never comes here. Never.", "sailor"], ["Eurylochus' mate", "m", "sailor", "Mist on the water, mist on the land. I want to go home.", "sailor"], ["A young oarsman, praying", "m", "sailor", "Persephone's poplars. Don't touch them.", "sailor"]], -410, -10, -390, 10, { wander: 2, persona: "sailor" });
}
hgwSpot(I.rock[0] + 8, I.rock[1] + 6, 5, "The road on down", "into Erebos, the House of Hades (its own door in the Hall of Doors)", function () { worldCard("<h3>🌑 The road on down</h3><p>Past this rock, where the dark rivers fall together, the way goes on down into Erebos, the House of Hades, with all its halls and fields of the dead. It has its own door in the Hall of Doors.</p>" + worldBtn("x", "Turn back", ""), { x: function () { worldCard(null); } }); });
hgwHarbourSpots("ocean", -394, 6);
},
function (G) {
var H = HGW_SI_H, I = HGW_SI, lite = hgwLite();
hgwWildBase(G, H, { dry: 0.35 });
hgwPlant(G, "flowers", hgwScatter(31, lite ? 60 : 160, 150, -340, 470, -80, function (x, z) { return H.sd(x, z) > 4; }, H, 0.7, 1.1), { col: "#E8D0F0" });
hgwPlant(G, "rock", hgwScatter(32, lite ? 10 : 24, 150, -340, 470, -80, function (x, z) { return H.sd(x, z) > 2 && H.sd(x, z) < 14; }, H, 1.2, 2.4), { mat: hgwMat("lime"), keepAll: true });
hgwOne("siren1", "A Siren, singing", "f", "nymph", I.isle[0] - 6, I.isle[1] - 4, -0.8, "Come here, famous Odysseus, glory of the Greeks. Stop your ship and listen.", { persona: "greek", r: 6 });
hgwOne("siren2", "A Siren, singing", "f", "nymph", I.isle[0] + 4, I.isle[1] - 8, -0.8, "No one ever sailed past without hearing our sweet voices. We know everything.", { persona: "greek", r: 6 });
hgwGreekTrees(G, H, { clear: [[I.head[0], I.head[1], 20]], olive: 1.2, pine: 1.2, cypress: 1.0 });
hgwHerd(G, "goat", -500, -800, 80, lite ? 4 : 10, H, 33);
hgwCrowd("siHead", [["A fisherman on the headland", "m", "sailor", "No one sails close to those islands. No one comes back.", "greek"], ["His son", "m", "gkman", "Listen. Can you hear singing?", "greek", true], ["A goatherd", "m", "herd", "Wax in your ears, they say. Or rope.", "greek"]], I.head[0] - 14, I.head[1] - 10, I.head[0] + 14, I.head[1] + 10, { wander: 3, persona: "greek" });
},
function (G) {
var H = HGW_ST_H, I = HGW_ST, lite = hgwLite();
hgwWildBase(G, H, { dry: 0.4 });
var wg = new THREE.Group();
wg.position.set(I.whirl[0], 0.08, I.whirl[1]);
G.add(wg);
for (var r = 0; r < 4; r++) {
var ring = new THREE.Mesh(new THREE.RingGeometry(6 + r * 9, 12 + r * 9, 40), hgwWaterM([0x0A1418, 0x1A2A30, 0x2A4048, 0x3A5A60][r], 0.9));
ring.rotation.x = -Math.PI / 2;
ring.position.y = -r * 0.02 - (3 - r) * 0.6;
wg.add(ring);
}
var hole = new THREE.Mesh(new THREE.CircleGeometry(6, 24), hgwLam(0x020406));
hole.rotation.x = -Math.PI / 2;
hole.position.y = -2;
wg.add(hole);
HGW.ticks.push(function (dt) { wg.rotation.y += dt * 0.6; });
var fy = H(I.fig[0], I.fig[1]);
hgwPlant(G, "rock", [{ x: I.fig[0], z: I.fig[1], y: fy - 2, s: 6, sy: 6 }], { mat: hgwMat("lime"), keepAll: true });
hgwPlant(G, "fig", [{ x: I.fig[0] + 1, z: I.fig[1], y: fy + 2, s: 1.4 }], {});
var sy = H(I.scylla[0] - 60, I.scylla[1]);
var cx = I.scylla[0] - 70, cz = I.scylla[1], cyy = Math.max(30, sy * 0.6);
hgwBox(G, 2, 14, 18, hgwLam(0x060404), cx, cyy, cz);
var necks = new THREE.Group();
necks.position.set(cx - 1, cyy + 6, cz);
G.add(necks);
for (var n = 0; n < 6; n++) {
var ng = new THREE.Group();
ng.rotation.z = 0.9 + n * 0.08;
ng.rotation.y = (n - 2.5) * 0.22;
necks.add(ng);
var nk = new THREE.Mesh(hgwGeo("scyn", function () { var c = new THREE.CylinderGeometry(0.5, 0.9, 18, 8); c.translate(0, 9, 0); return c; }), hgwLam(0x3A4A3A));
ng.add(nk);
var hd = new THREE.Mesh(new THREE.SphereGeometry(1.4, 10, 8), hgwLam(0x2A3A2A));
hd.scale.set(1, 0.8, 1.6);
hd.position.y = 18.5;
ng.add(hd);
}
HGW.ticks.push(function (dt) { necks.children.forEach(function (g, i) { g.rotation.x = Math.sin(HGW.t * 0.7 + i) * 0.18; }); });
hgwGreekTrees(G, H, { clear: [[I.shore[0], I.shore[1], 30]], olive: 1.0, pine: 1.4 });
hgwCrowd("stShore", [["A Sicilian fisherman", "m", "sailor", "Three times a day she drinks the sea, three times she spits it out. Keep to the other side.", "greek"], ["His wife", "f", "gkwoman", "The other side has worse. Six heads. Six.", "greek"], ["An old pilot", "m", "gkold", "Better to lose six men than the whole ship. That is the sum of it.", "greek"]], I.shore[0] - 14, I.shore[1] - 14, I.shore[0] + 4, I.shore[1] + 14, { wander: 3, persona: "greek" });
},
function (G) {
var H = HGW_TH_H, I = HGW_TH, lite = hgwLite(), st = HGW.st;
hgwWildBase(G, H, { roads: { m: [[616, 0], [400, -40], [200, -100], [-100, -300]] }, rw: { m: 3 }, dry: 0.55 });
var C = I.cave, cy = H(C[0], C[1]);
hgwPlant(G, "rock", [{ x: C[0] - 6, z: C[1] - 10, y: cy - 2, s: 12, sy: 12 }, { x: C[0] - 6, z: C[1] + 10, y: cy - 2, s: 12, sy: 12 }, { x: C[0] - 12, z: C[1], y: cy + 6, s: 14, sy: 10 }], { mat: hgwMat("lime"), keepAll: true });
hgwBox(G, 1, 8, 12, hgwLam(0x0A0806), C[0] - 2, cy - 0.5, C[1]);
hgwShip(G, C[0] + 6, Math.max(0.2, H(C[0] + 6, C[1]) + 0.5), C[1], Math.PI / 2, { len: 20 });
[[200, -100], [60, 120], [-200, -80], [300, -400], [-60, -560], [420, 240], [-380, 260]].forEach(function (q, i) { if (st.slain && i === 0)
return; hgwHerd(G, "cow", q[0], q[1], 50, lite ? 5 : 12, H, 140 + i); hgwHerd(G, "sheep", q[0] + 90, q[1] + 60, 40, lite ? 5 : 12, H, 150 + i); });
if (st.slain) {
hgwFire(G, I.meadow[0], H(I.meadow[0], I.meadow[1]) + 0.4, I.meadow[1], 1.8);
}
hgwGreekTrees(G, H, { clear: [[I.meadow[0], I.meadow[1], 130], [I.beach[0], I.beach[1], 30]], olive: 1.2, oak: 1.0, pine: 0.8 });
hgwOne("phaethusa", "Phaethusa, daughter of the Sun", "f", "nymph", -180, -60, 0, "My sister and I keep our father's herds. He sees everything, stranger. Everything.", { persona: "greek" });
hgwCrowd("thBeach", [["One of Odysseus' crew, hungry", "m", "sailor", "A month of south wind. A month! And all that beef on the hoof.", "sailor"], ["A sailor with a fishing line", "m", "sailor", "Fish, birds, whatever the hand can catch. Not the cattle. Not the cattle.", "sailor"], ["Another of the crew", "m", "sailor", "Eurylochus says we'd be better drowned than starved.", "sailor"]], 596, -12, 616, 12, { wander: 3, persona: "sailor" });
hgwHarbourSpots("thrinacia", 612, 6);
},
function (x, z, h, d) {
if (d < 0)
return h;
var n = hgwFbm(x * 0.006 + 3, z * 0.006, 3);
var v = 0.5 + Math.min(d, 30) * 0.075 + n * 1.2;
var sig = (1 - hgwSmooth(-420, -200, x)) * hgwSmooth(40, 220, d) * (14 + n * 10);
var east = hgwSmooth(460, 1150, x) * (40 + n * 30), south = hgwSmooth(520, 1350, z) * (30 + n * 24);
var q = Math.hypot((x - 240) / 170, (z - 215) / 125), troy = Math.max(0, 1 - q) * 30;
var sp = Math.max(0, 1 - hgwPathD(x, z, [[240, 215], [520, 240], [900, 260]]) / 130) * hgwSmooth(150, 420, x) * 26;
v += Math.max(sig, east, south, troy, sp);
var rd = hgwTrRiverD(x, z);
if (rd < 16)
v = Math.min(v, 0.5 + Math.max(0, rd - 8) * 0.14);
else
v = Math.min(v, 1.6 + Math.pow(rd - 16, 1.3) * 0.1 + n);
return v;
},
function (G) {
var X = HGW_ROOMXZ.troy, R, lite = hgwLite();
hgwHallRoom(G, "phall", X.phall, { name: "the great hall of Priam", rich: true, queen: true });
R = hgwRoom(G, "hector", X.hector[0], X.hector[1], 12, 9, { wall: "limewall", floor: "gkfloor", h: 3.6, name: "Hector's house", lightI: 0.7, bare: 1, beams: true });
hgwHearth(R.g, 0, -4, 0, { h: R.h, mat: "lime" });
hgwLoom(R.g, -4, -3.4, 0.3, 0x8A2A4A);
hgwBed(R.g, 4, -2.4, Math.PI / 2, { cover: 0x8A2A4A });
hgwBox(R.g, 1.0, 0.5, 0.6, hgwMat("oak"), 2, 0, 2.4);
hgwCyl(R.g, 0.6, 0.6, 0.08, hgwMat("bronze"), -5.8, 2.0, 1, 16).rotation.z = Math.PI / 2;
hgwTable(R.g, 0, 0.6, 2.2, 0.9, 0.76, {});
R = hgwRoom(G, "paris", X.paris[0], X.paris[1], 12, 9, { wall: "whitewash", floor: "gkfloor", h: 3.8, name: "the house of Paris and Helen", lightI: 0.8, lightCol: 0xFFD8B0, bare: 1 });
hgwLoom(R.g, -4, -3.6, 0, 0x6A2A6A);
hgwThrone(R.g, 0, -3.4, 0, { mat: "oak", trim: "gold" });
hgwCouch(R.g, 3.6, -2, Math.PI / 2, 0x8A2A3A);
hgwBed(R.g, 3.8, 2, Math.PI / 2, { cover: 0x5A1E4A });
hgwTripod(R.g, -4, 0, 2.6);
R = hgwRoom(G, "athtemple", X.athtemple[0], X.athtemple[1], 12, 16, { wall: "ashlar", floor: "gkfloor", h: 6, name: "the temple of Athena in Troy", lightI: 0.55, lightCol: 0xFFE0B0, bare: 1, beams: true });
hgwBox(R.g, 2.4, 1.0, 2.0, hgwMat("lime"), 0, 0, -6.4);
hgwThrone(R.g, 0, -6.4, 0, { mat: "oak", trim: "gold" });
var im = hgwDressed("athImage", "athena", { sex: "f" });
im.position.set(0, 1.0, -6.2);
im.scale.set(1.5, 1.5, 1.5);
R.g.add(im);
for (var c = 0; c < 4; c++) {
hgwColumn(R.g, -3.6 + (c % 2) * 7.2, 0, -3 + Math.floor(c / 2) * 6, 6, 0.4, {});
}
hgwAltar(R.g, 0, 1.6, function () { return 0; }, {});
[["achut", "Achilles' hut, of fir beams thatched with meadow reeds", 1], ["aghut", "Agamemnon's hut", 1], ["nehut", "Nestor's hut", 0]].forEach(function (q) {
var k = q[0];
var r = hgwRoom(G, k, X[k][0], X[k][1], 12, 9, { wall: "planks", floor: "beaten", h: 3.4, name: q[1], lightI: 0.6, bare: 1, beams: true });
hgwFire(r.g, 0, 0, -1.6, 0.7);
hgwBed(r.g, -4, -2.6, Math.PI / 2, { cover: k === "aghut" ? 0x6A1A2A : 0x8A6A3A });
hgwTable(r.g, 3, -2, 2, 0.9, 0.76, {});
hgwBench(r.g, 3, -1.0, Math.PI, { w: 1.8, d: 0.4, back: false });
for (var p = 0; p < 3; p++)
hgwPithos(r.g, -5 + p * 0.9, 0, 3.6, 0.6);
if (q[2]) {
hgwTripod(r.g, 5, 0, 3.4);
hgwBox(r.g, 1.2, 0.6, 0.7, hgwMat("darkoak"), 5, 0, 0.6);
}
});
R = hgwRoom(G, "trhouse", X.trhouse[0], X.trhouse[1], 9, 7, { wall: "mudbrick", floor: "beaten", h: 3.0, name: "a house in Troy", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwLoom(R.g, -3, -2.6, 0.4);
hgwTable(R.g, 1.6, 0.6, 1.6, 0.8, 0.74, {});
},
function (G, H, x, z, w, d, ry, o) {
o = o || {};
var y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
hgwBox(g, w, 2.8, d, hgwMat("planks"), 0, 0, 0);
var rf = new THREE.Mesh(hgwGeo("trhutroof", function () { var s = new THREE.Shape(); s.moveTo(-0.55, 0); s.lineTo(0, 0.5); s.lineTo(0.55, 0); s.lineTo(-0.55, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false }); e.translate(0, 0, -0.5); return e; }), hgwMat("reedroof"));
rf.scale.set(w, w * 0.7, d + 0.6);
rf.position.y = 2.8;
g.add(rf);
hgwBox(g, 1.4, 2.2, 0.12, hgwMat("darkoak"), 0, 0, -d / 2 - 0.02);
hgwSolid(x, z, w, d, y - 1, y + 4, ry);
if (o.court) {
var T = hgwRot(x, z, ry), cw = w + 10, cd = d + 12, pts = [[-2, -cd / 2 - 2], [-cw / 2, -cd / 2 - 2], [-cw / 2, cd / 2 - 4], [cw / 2, cd / 2 - 4], [cw / 2, -cd / 2 - 2], [2, -cd / 2 - 2]].map(function (q) { return T(q[0], q[1]); });
var list = [];
for (var i = 0; i < pts.length - 1; i++) {
var A = pts[i], B = pts[i + 1], L = Math.hypot(B[0] - A[0], B[1] - A[1]), sry = Math.atan2(B[0] - A[0], B[1] - A[1]), n = Math.max(1, Math.floor(L / 2.4));
for (var k = 0; k < n; k++) {
var t = (k + 0.5) / n, sx = A[0] + (B[0] - A[0]) * t, sz = A[1] + (B[1] - A[1]) * t;
list.push({ x: sx, z: sz, y: H(sx, sz), ry: sry });
}
}
hgwInst(G, hgwGeo("trstock", function () { var b = new THREE.BoxGeometry(0.34, 2.8, 2.5); b.translate(0, 1.0, 0); return b; }), hgwMat("darkbark"), list, {});
list.forEach(function (q) { hgwSolid(q.x, q.z, 0.4, 2.5, q.y - 1, q.y + 2.4, q.ry); });
}
return g;
},
function (G) {
var lite = hgwLite(), H = hgwTrH, I = HGW_TR, st = HGW.st, R = wRand(77);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.45 });
[[HGW_TR_SCAM, 18, 0x4A7A72], [HGW_TR_SIMO, 11, 0x4A7262]].forEach(function (rv) { var m = hgwStrip(G, rv[0], rv[1], function () { return 0.95; }, hgwWaterM(rv[2], 0.86), 0); HGW.water.push(m); m.userData.fx = 0; m.userData.fz = 0.5; });
var reeds = [], tam = [];
[HGW_TR_SCAM, HGW_TR_SIMO].forEach(function (rv, ri) {
var LL = hgwPathLen(rv);
for (var s = 0; s < (lite ? 60 : 170); s++) {
var q0 = hgwPathAt(rv, R() * LL), q = [q0.x, q0.z], side = R() < 0.5 ? -1 : 1, a = R() * 6.28, rx = q[0] + Math.cos(a) * (10 + R() * 8), rz = q[1] + Math.sin(a) * (10 + R() * 8);
if (hgwTrRiverD(rx, rz) > 9 && H.sd(rx, rz) > 4)
reeds.push({ x: rx, z: rz, y: H(rx, rz), s: 0.8 + R() * 0.6 });
if (s % 4 === 0) {
var tx = q[0] + Math.cos(a) * (22 + R() * 16), tz = q[1] + Math.sin(a) * (22 + R() * 16);
if (hgwTrRiverD(tx, tz) > 16)
tam.push({ x: tx, z: tz, y: H(tx, tz), s: 0.8 + R() * 0.5 });
}
}
});
hgwPlant(G, "reeds", reeds, {});
hgwPlant(G, "poplar", tam.filter(function (p, i) { return i % 2; }), {});
hgwPlant(G, "tree", tam.filter(function (p, i) { return !(i % 2); }), { col: 0x6A8A4A });
hgwRoads(G, HGW_TR_ROADS, H, { w: { plain: 6, shore: 5, springs: 4, ida: 4, east: 4, street: 6 }, m: { shore: "sand", street: "paving" } });
var C = I.city, cy = H(C[0], C[1]), wall = [];
for (var a = 0; a <= 28; a++) {
var an = Math.PI + a / 28 * Math.PI * 2, rr = 88 + Math.sin(an * 3) * 5;
wall.push([C[0] + Math.cos(an) * rr, C[1] + Math.sin(an) * rr * 0.86]);
}
hgwBigWall(G, wall, lite ? 9 : 11, H, { mat: "ashlar", th: 4.4, tower: true, gate: [[I.gate[0], I.gate[1], 7]] });
var gx = I.gate[0], gz = I.gate[1], gy = H(gx, gz);
[-1, 1].forEach(function (s) { hgwBox(G, 9, 15, 8, hgwMat("ashlar"), gx, gy - 1.2, gz + s * 9); hgwSolid(gx, gz + s * 9, 9, 8, gy - 2, gy + 14); });
hgwBox(G, 9, 2.4, 10, hgwMat("ashlar"), gx, gy + 9.4, gz);
hgwBox(G, 0.3, 8.4, 4.4, hgwMat("darkoak"), gx + 3, gy, gz - 2.3);
hgwBox(G, 0.3, 8.4, 4.4, hgwMat("darkoak"), gx + 3, gy, gz + 2.3);
hgwFloor(gx + 2, gz + 11, 7, 6, gy + 13.8);
hgwRamp(gx + 10, gz + 11, 4, 10, gy, gy + 13.8, Math.PI / 2);
hgwPlant(G, "tree", [{ x: I.oak[0], z: I.oak[1], y: H(I.oak[0], I.oak[1]), s: 2.2 }], { col: 0x4A6A2A, keepAll: true });
var K = hgwKingsHouse(G, H, { at: [268, 215], ry: Math.PI / 2, hall: "phall", rich: true, wall: "ashlar", cw: 56, cd: 40, y: cy });
for (var r = 0; r < (lite ? 5 : 12); r++) {
var side = r % 2 ? 1 : -1, rz = 215 + side * 34, rx = 252 + Math.floor(r / 2) * 7;
hgwGkHouse(G, rx, rz, 6, 8, 4.2, { ry: side > 0 ? Math.PI : 0, y: cy, tile: true, wall: "ashlar" });
}
hgwTemple(G, 236, 166, 14, 22, { ry: 0, statue: "athena", y: cy });
var at = hgwRm("athtemple");
if (at)
hgwDoor(at, "The doors of Athena's temple", 236, 180, Math.PI);
hgwTemple(G, 230, 268, 12, 18, { ry: Math.PI, statue: "apollo", y: cy });
hgwGkHouse(G, 205, 180, 14, 10, 4.6, { ry: 0, y: cy, tile: true, court: 15, wall: "limewall" });
var hr = hgwRm("hector");
if (hr)
hgwDoor(hr, "The door of Hector's house", 205, 187, Math.PI);
hgwGkHouse(G, 205, 252, 14, 10, 4.6, { ry: Math.PI, y: cy, tile: true, court: 15, wall: "whitewash" });
var pr = hgwRm("paris");
if (pr)
hgwDoor(pr, "The door of the house of Paris", 205, 245, 0);
hgwTownPack(G, H, { c: C, rx: 76, rz: 66, n: 60, seed: 81, roads: [HGW_TR_ROADS.street], r2: 0.4, tile: 0.5, door: { key: "trhouse", name: "The door of a Trojan house" }, life: true, maxDrop: 3,
avoid: [[268, 215, 40], [236, 166, 18], [230, 268, 16], [205, 180, 14], [205, 252, 14], [I.gate[0], I.gate[1], 22]], sdMin: -1000 });
hgwTownPack(G, H, { c: [270, 330], rx: 90, rz: 40, n: 24, seed: 82, roads: [HGW_TR_ROADS.springs, HGW_TR_ROADS.ida], r2: 0.2, tile: 0.2, avoid: [[C[0], C[1], 104]] });
hgwPlant(G, "fig", [{ x: I.fig[0], z: I.fig[1], y: H(I.fig[0], I.fig[1]), s: 1.8 }], { keepAll: true });
[[-5, 0x8AC0C8, 1], [5, 0x5A9AB0, 0]].forEach(function (q) {
var sx = I.springs[0] + q[0], sz = I.springs[1], sy = H(sx, sz);
hgwBox(G, 3, 0.8, 2.4, hgwMat("lime"), sx, sy - 0.3, sz);
hgwWater(G, sx, sz, 2.6, 2.0, sy + 0.45, q[1], 0.85);
if (q[2] && !lite) {
var smoke = hgwFire(G, sx, sy + 0.6, sz, 0.01);
if (smoke)
smoke.visible = false;
}
hgwBox(G, 4, 0.6, 1.4, hgwMat("lime"), sx, sy - 0.2, sz + 3.4);
});
var il = new THREE.Mesh(hgwGeo("ilusmound", function () { return new THREE.SphereGeometry(10, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2); }), hgwMat("meadow"));
il.scale.y = 0.45;
il.position.set(I.ilus[0] + 14, H(I.ilus[0] + 14, I.ilus[1]), I.ilus[1]);
G.add(il);
hgwRound(I.ilus[0] + 14, I.ilus[1], 9.6);
hgwBox(G, 0.8, 2.4, 0.5, hgwMat("lime"), I.ilus[0] + 14, H(I.ilus[0] + 14, I.ilus[1]) + 4, I.ilus[1]);
hgwFleet(G, H, -10, -410, Math.PI / 2, lite ? 4 : 9, 8);
hgwFleet(G, H, 160, -412, Math.PI / 2, lite ? 5 : 12, 8);
hgwFleet(G, H, 370, -414, Math.PI / 2, lite ? 4 : 9, 8);
if (!lite) {
hgwFleet(G, H, 60, -426, Math.PI / 2, 6, 9);
hgwFleet(G, H, 280, -428, Math.PI / 2, 8, 9);
}
hgwTrHut(G, H, 10, -345, 12, 9, Math.PI, { court: true });
var ah = hgwRm("achut");
if (ah)
hgwDoor(ah, "The door of Achilles' hut", 10, -350, 0);
hgwTrHut(G, H, 240, -330, 13, 9, Math.PI, { court: true });
var gh = hgwRm("aghut");
if (gh)
hgwDoor(gh, "The door of Agamemnon's hut", 240, -335, 0);
hgwTrHut(G, H, 310, -336, 10, 8, Math.PI, {});
var nh = hgwRm("nehut");
if (nh)
hgwDoor(nh, "The door of Nestor's hut", 310, -341, 0);
for (var hu = 0; hu < (lite ? 14 : 40); hu++) {
var hx = -40 + R() * 500, hz = -388 + R() * 44;
if (Math.hypot(hx - I.agora[0], hz - I.agora[1]) < 26 || Math.hypot(hx - 10, hz - 345) < 20 || Math.hypot(hx - 240, hz - 330) < 20 || Math.hypot(hx - 310, hz - 336) < 14 || hgwPathD(hx, hz, HGW_TR_ROADS.plain) < 8)
continue;
hgwTrHut(G, H, hx, hz, 5 + R() * 3, 4 + R() * 2, Math.PI + (R() - 0.5) * 0.4, {});
}
for (var al = 0; al < 3; al++)
hgwAltar(G, I.agora[0] - 12 + al * 12, I.agora[1] + 6, H, {});
for (var cf = 0; cf < (lite ? 6 : 16); cf++) {
var fx = -30 + R() * 480, fz = -366 + R() * 30;
hgwFire(G, fx, H(fx, fz), fz, 0.6);
}
if (st.rampart) {
var rp = [[-70, -300], [60, -308], [200, -312], [340, -310], [490, -300]];
hgwBigWall(G, rp, 5, H, { mat: "mudbrick", th: 3, tower: true, gate: [[150, -311, 6], [330, -310, 6]] });
var di = hgwStrip(G, rp.map(function (p) { return [p[0], p[1] + 10]; }), 7, function (a, b) { return H(a, b) - 1.2; }, hgwMat("earth"), 0);
var stakes = [];
rp.forEach(function (p, i) { if (i < rp.length - 1)
for (var k = 0; k < (lite ? 6 : 18); k++) {
var t = k / 18, sx2 = p[0] + (rp[i + 1][0] - p[0]) * t, sz2 = p[1] + (rp[i + 1][1] - p[1]) * t + 13;
if (Math.abs(sx2 - 150) > 8 && Math.abs(sx2 - 330) > 8)
stakes.push([sx2, sz2]);
} });
stakes.forEach(function (s) { var m = hgwBox(G, 0.18, 2.0, 0.18, hgwMat("darkoak"), s[0], H(s[0], s[1]) - 0.4, s[1]); m.rotation.x = -0.5; });
}
if (st.trojanFires)
for (var tf = 0; tf < (lite ? 20 : 60); tf++) {
var ex = -60 + R() * 480, ez = -260 + R() * 260;
if (hgwTrRiverD(ex, ez) > 14)
hgwFire(G, ex, H(ex, ez), ez, 0.7);
}
if (st.shipFire)
hgwFire(G, 430, H(430, -414) + 2, -414, 2.2);
var wheat = [];
for (var f = 0; f < (lite ? 120 : 340); f++) {
var wx = -60 + R() * 560, wz = 260 + R() * 520;
if (Math.hypot(wx - C[0], wz - C[1]) > 110 && hgwTrRiverD(wx, wz) > 24 && hgwPathD(wx, wz, HGW_TR_ROADS.ida) > 6)
wheat.push({ x: wx, z: wz, y: H(wx, wz), s: 0.9 });
}
hgwPlant(G, "grass", wheat, { col: 0xC8A850, keepAll: true });
var mead = [];
for (var m2 = 0; m2 < (lite ? 120 : 360); m2++) {
var mx = -300 + R() * 700, mz = -280 + R() * 500;
if (hgwTrRiverD(mx, mz) > 12 && Math.hypot(mx - C[0], mz - C[1]) > 100)
mead.push({ x: mx, z: mz, y: H(mx, mz), s: 0.7 + R() * 0.5 });
}
hgwPlant(G, "flowers", mead.filter(function (p, i) { return i % 3 === 0; }), { col: "#E8D040" });
hgwPlant(G, "grass", mead.filter(function (p, i) { return i % 3; }), { col: 0x8AA850 });
hgwHerd(G, "horse", 520, 40, 90, lite ? 5 : 14, H, 91);
hgwHerd(G, "cow", -260, 420, 80, lite ? 4 : 10, H, 92);
hgwHerd(G, "sheep", 700, 700, 120, lite ? 6 : 18, H, 93);
hgwGreekTrees(G, H, { clear: [[C[0], C[1], 120], [200, -360, 140], [I.ilus[0], I.ilus[1], 40], [60, -150, 180]], roads: Object.keys(HGW_TR_ROADS).map(function (k) { return HGW_TR_ROADS[k]; }), olive: 0.6, oak: 1.6, pine: 1.4 });
hgwCrowd("trTown", [["A Trojan woman with a water jar", "f", "gkwoman", "Ten years. My son has never seen the springs without soldiers at them.", "A woman of Troy in the tenth year of the siege, from the world of Homer's Iliad."],
["An old Trojan", "m", "gkold", "I remember when Priam's ships came home from Phrygia full of gold. Look at us now.", "An old man of Troy, from the world of Homer's Iliad."],
["A Trojan spearman", "m", "trojan", "Hector will hold them. Hector always holds them.", "A Trojan soldier, from Homer's Iliad: proud of Hector, sick of the war."],
["A Lycian ally", "m", "warrior", "Sarpedon brought us from Lycia, far to the south, by the eddying Xanthus.", "A Lycian ally of Troy, from Homer's Iliad."],
["A girl with a basket of bread", "f", "gkwoman", "For the men on the walls.", "A girl of Troy, from Homer's Iliad.", true],
["A Trojan priest", "m", "gkold", "We have prayed to Athena. We will pray again.", "A Trojan priest, from Homer's Iliad."],
["A weaver", "f", "gkveiled", "We weave and we weave. Robes for the gods, shrouds for our men.", "A Trojan weaver, from Homer's Iliad."],
["A Trojan archer", "m", "archer", "From up there you can see their huts, and smell their cooking.", "A Trojan archer, from Homer's Iliad."]], C[0] - 60, C[1] - 50, C[0] + 30, C[1] + 50, { wander: 5, ok: function (x, z) { return Math.hypot(x - 268, z - 215) > 32; } });
hgwCrowd("trCamp", [["An Achaean spearman", "m", "warrior", "Nine years. The ship's timbers are rotting and the ropes are slack.", "A Greek soldier at Troy, from Homer's Iliad: homesick, stubborn, loyal to his chief."],
["A Myrmidon", "m", "warrior", "We follow Achilles. Where he goes, we go. Where he sulks, we sit.", "One of Achilles' Myrmidons, from Homer's Iliad."],
["A Cretan bowman", "m", "archer", "Idomeneus brought eighty ships from Crete. Eighty!", "A Cretan archer at Troy, from Homer's Iliad."],
["A herald", "m", "gkman", "When I hold up the staff, they listen. Mostly.", "A Greek herald at Troy, from Homer's Iliad."],
["A ship's carpenter", "m", "sailor", "Pitch, pine, and patience.", "A shipwright with the Greek fleet, from Homer's Iliad."],
["A captive woman from Lyrnessus", "f", "gkveiled", "They took my city. Now I grind their barley.", "A captive woman in the Greek camp, from Homer's Iliad: sorrowing, dignified."],
["An old charioteer", "m", "gkold", "Nestor's horses are the best on the shore. Don't tell Diomedes I said so.", "An old charioteer at Troy, from Homer's Iliad."],
["A Locrian slinger", "m", "warrior", "Little Ajax leads us. Small, quick, and rude.", "A Locrian at Troy, from Homer's Iliad."]], -20, -390, 440, -340, { wander: 6, ok: function (x, z) { return H.sd(x, z) > 8; } });
hgwHarbourSpots("troy", 204, -398);
},
function (H, o) {
var base = hgwGreekColour(H, o);
return function (x, z, y, c) {
base(x, z, y, c);
if (y < -0.4)
return;
var g = 0.86 + hgwFbm(x * 0.05, z * 0.05, 2) * 0.2;
if (o.dark)
for (var i = 0; i < o.dark.length; i++) {
var q = o.dark[i];
if (Math.hypot(x - q[0], z - q[1]) < q[2]) {
c.setRGB(0.26 * g, 0.25 * g, 0.24 * g);
return;
}
}
if (o.cliffCol) {
var slope = Math.abs(H(x + 3, z) - H(x - 3, z)) + Math.abs(H(x, z + 3) - H(x, z - 3));
if (slope > 3.6)
c.setRGB(o.cliffCol[0] * g, o.cliffCol[1] * g, o.cliffCol[2] * g);
}
};
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var w = hgwMat("darkoak"), br = hgwMat("bronze");
hgwBox(g, 2.0, 0.9, 1.2, w, 0, 0, 0);
if (!o.open)
hgwBox(g, 2.1, 0.16, 1.3, w, 0, 0.9, 0);
else {
var lid = hgwBox(g, 2.1, 0.16, 1.3, w, 0, 0.9, -0.7);
lid.rotation.x = -1.1;
}
[-0.9, 0.9].forEach(function (s) { hgwBox(g, 0.08, 0.95, 1.25, br, s, 0, 0); });
hgwBox(g, 2.05, 0.08, 1.25, br, 0, 0.45, 0);
return g;
},
function (P, x, z, ry, hfn) {
var y = hfn(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
[-2.4, 0, 2.4].forEach(function (s) { hgwCyl(g, 0.06, 0.07, 2.4, hgwMat("darkbark"), s, 0, 0, 6); });
var tex = hgwCanvas("netTex", 128, 128, function (c, W, H) { c.clearRect(0, 0, W, H); c.strokeStyle = "rgba(60,50,30,.85)"; c.lineWidth = 1.4; for (var i = 0; i <= W; i += 8) {
c.beginPath();
c.moveTo(i, 0);
c.lineTo(i, H);
c.stroke();
c.beginPath();
c.moveTo(0, i);
c.lineTo(W, i);
c.stroke();
} });
tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
tex.repeat.set(3, 2);
var n = new THREE.Mesh(hgwGeo("netpl", function () { var p = new THREE.PlaneGeometry(4.8, 1.8, 8, 2); var a = p.attributes.position; for (var i = 0; i < a.count; i++)
a.setZ(i, Math.sin(a.getX(i) * 1.3) * 0.12); return p; }), hgwM("netM", function () { return new THREE.MeshLambertMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, alphaTest: 0.2 }); }));
n.position.y = 1.4;
g.add(n);
return g;
},
function (P, cx, cz, r, n, hfn) {
var R = wRand(Math.round(cx * 3 + cz));
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r, y = hfn(x, z);
var s = new THREE.Mesh(hgwGeo("ringstone", function () { var c = new THREE.DodecahedronGeometry(0.7, 1); var p = c.attributes.position; for (var k = 0; k < p.count; k++)
p.setY(k, p.getY(k) * 1.6); c.computeVertexNormals(); return c; }), hgwMat("greystone"));
s.position.set(x, y + 0.8, z);
s.rotation.set((R() - 0.5) * 0.2, R() * 6.28, (R() - 0.5) * 0.2);
s.scale.setScalar(0.8 + R() * 0.4);
P.add(s);
hgwRound(x, z, 0.7, y - 1, y + 2);
}
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var s = o.s || 1;
var scale = hgwS("b:gorgonscale", o.medusa ? 0x5A6A4A : 0x4A4030, 0.9), brass = hgwMat("bronze"), wing = hgwLam(o.medusa ? 0x7A8A9A : 0x3A3428, { ds: 1 });
hgwEll(g, scale, 2.2 * s, 1.2 * s, 3.4 * s, 0, 1.2 * s, 0, 16);
hgwEll(g, scale, 1.0 * s, 0.9 * s, 1.1 * s, 0, 1.5 * s, 3.4 * s, 12);
for (var c = 0; c < 4; c++) {
var cx = (c % 2 ? 1 : -1) * 1.6 * s, cz = (c < 2 ? 1.8 : -1.8) * s;
hgwEll(g, brass, 0.45 * s, 0.3 * s, 0.8 * s, cx, 0.25 * s, cz + 0.6 * s, 8);
for (var t = 0; t < 3; t++) {
var cl = hgwEll(g, brass, 0.08 * s, 0.08 * s, 0.45 * s, cx + (t - 1) * 0.22 * s, 0.12 * s, cz + 1.3 * s, 6);
cl.rotation.x = 0.3;
}
}
[-1, 1].forEach(function (sd) {
var w = new THREE.Mesh(hgwGeo("gwing", function () { var sh = new THREE.Shape(); sh.moveTo(0, 0); sh.quadraticCurveTo(2.2, 1.6, 4.6, 0.8); sh.lineTo(4.0, 0.2); sh.lineTo(4.4, -0.4); sh.lineTo(3.4, -0.6); sh.lineTo(3.6, -1.2); sh.lineTo(2.2, -0.9); sh.quadraticCurveTo(1.0, -0.8, 0, 0); return new THREE.ShapeGeometry(sh, 8); }), wing);
w.scale.set(sd * s * 1.1, s * 1.1, s);
w.position.set(sd * 1.2 * s, 2.0 * s, 0.4 * s);
w.rotation.set(-Math.PI / 2 + 0.25, 0, sd * 0.15);
g.add(w);
});
if (o.medusa) {
var face = hgwEll(g, hgwSkinM("pale", 0xE8DCD0), 0.55 * s, 0.62 * s, 0.55 * s, 0, 1.8 * s, 4.2 * s, 14);
var vip = hgwLam(0x3A5A2A);
for (var v = 0; v < (hgwLite() ? 7 : 14); v++) {
var a = v / 14 * Math.PI * 2, m = new THREE.Mesh(hgwGeo("viper", function () { return new THREE.TorusGeometry(0.28, 0.05, 5, 10, Math.PI * 1.4); }), vip);
m.scale.setScalar(s);
m.position.set(Math.cos(a) * 0.55 * s, 1.95 * s + Math.sin(a) * 0.45 * s, 4.0 * s);
m.rotation.set(Math.random() * 3, a, 0);
g.add(m);
}
}
hgwRound(x, z, 3.2 * s, y - 1, y + 3 * s);
return g;
},
function (P, x, y, z, ry, stone) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.scale.setScalar(3.2);
P.add(g);
var sk = stone ? hgwMat("greystone") : hgwSkinM("tan", 0xB08060), cl = stone ? hgwMat("greystone") : hgwLam(0x5A4A3A);
hgwEll(g, cl, 7, 5, 6, 0, 4, 2, 14);
hgwEll(g, cl, 5, 9, 5, 0, 9, 0, 14);
hgwEll(g, sk, 8, 10, 6, 0, 22, 0, 16);
hgwEll(g, sk, 4.2, 5, 4.2, 0, 35, 0, 14);
hgwEll(g, stone ? cl : hgwLam(0x8A8070), 4.6, 4.6, 4.6, 0, 37.5, -1, 12);
[-1, 1].forEach(function (s) { var a = hgwEll(g, sk, 3, 9, 3, s * 10, 33, 0, 12); a.rotation.z = s * 0.4; var f = hgwEll(g, sk, 2.6, 8, 2.6, s * 12, 46, 0, 12); f.rotation.z = -s * 0.15; });
if (!stone) {
var cm = hgwLam(0xF4F6FA, { op: 0.92 });
for (var c = 0; c < 9; c++)
hgwEll(g, cm, 10 + ((c * 7) % 5) * 2, 4, 9, (c - 4) * 7, 56 + (c % 3) * 2, (c % 2) * 4 - 2, 10);
}
hgwRound(x, z, 36, y - 2, y + 200);
return g;
},
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
hgwCyl(g, 0.9, 1.4, 6, hgwMat("darkbark"), 0, 0, 0, 10);
for (var b = 0; b < 5; b++) {
var br = hgwCyl(g, 0.35, 0.55, 5, hgwMat("darkbark"), 0, 0, 0, 8);
br.position.set(Math.cos(b * 1.26) * 1.6, 7, Math.sin(b * 1.26) * 1.6);
br.rotation.set(Math.sin(b * 1.26) * 0.7, 0, -Math.cos(b * 1.26) * 0.7);
}
var lf = hgwLam(0x5A8A2A);
for (var c = 0; c < 7; c++) {
var a = c / 7 * Math.PI * 2;
hgwEll(g, lf, 3.6, 2.6, 3.6, Math.cos(a) * 3.4, 9 + (c % 2) * 1.4, Math.sin(a) * 3.4, 10);
}
hgwEll(g, lf, 4, 3, 4, 0, 11.6, 0, 10);
var gold = hgwShine(0xF8C828, 0.25, 0.95), R = wRand(9), list = [];
for (var f = 0; f < (hgwLite() ? 30 : 80); f++) {
var a2 = R() * 6.28, r = 2.6 + R() * 4.2;
list.push({ x: Math.cos(a2) * r, y: 7.0 + R() * 5.6, z: Math.sin(a2) * r });
}
list.forEach(function (q) { var m = new THREE.Mesh(hgwGeo("gapple", function () { return new THREE.SphereGeometry(0.42, 12, 9); }), gold); m.position.set(q.x, q.y, q.z); g.add(m); });
var lad = hgwS("b:ladon", 0x2A5A3A, 0.8);
for (var k = 0; k < 3; k++) {
var t = new THREE.Mesh(hgwGeo("ladon" + k, function () { return new THREE.TorusGeometry(2.4 + k * 0.5, 0.45 - k * 0.08, 8, 28); }), lad);
t.rotation.x = Math.PI / 2;
t.position.y = 0.35 + k * 0.55;
g.add(t);
}
var hd = hgwEll(g, lad, 0.7, 0.5, 1.2, 2.6, 1.2, 1.6, 10);
hd.rotation.y = 0.6;
hgwEye(g, 2.9, 1.45, 2.4, 0.1, 0xE8E060);
hgwEye(g, 2.4, 1.45, 2.6, 0.1, 0xE8E060);
hgwRound(x, z, 3.6, y - 1, y + 14);
return g;
},
function (P, x, z, ry, rock) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var m = rock ? hgwMat("darkrock") : hgwS("b:ketos", 0x1E2420, 0.8);
for (var i = 0; i < 7; i++) {
var r = 3.6 - Math.abs(i - 2) * 0.45;
hgwEll(g, m, r * 1.1, r * 0.7, 3.4, 0, rock ? 0.4 : 0.2, i * 5.6 - 12, 12);
}
if (!rock) {
hgwEll(g, m, 3, 2, 4.4, 0, 0.6, -16, 12);
var jaw = hgwEll(g, hgwLam(0x6A2A2A), 2.4, 0.6, 3, 0, 0.0, -17.6, 10);
hgwEye(g, 1.8, 1.6, -17, 0.3, 0xE8C040);
hgwEye(g, -1.8, 1.6, -17, 0.3, 0xE8C040);
var sh = hgwLam(0xC8B898);
for (var s = 0; s < 14; s++)
hgwEll(g, sh, 0.4, 0.25, 0.4, (s % 2 ? 2.8 : -2.8), 0.8, -8 + s * 1.6, 6);
}
return g;
},
function (G) {
var X = HGW_ROOMXZ.argolis, R;
hgwHallRoom(G, "achall", X.achall, { name: "the hall of King Acrisius", rich: true });
R = hgwRoom(G, "danaebr", X.danaebr[0], X.danaebr[1], 9, 9, { wall: "bronze", floor: "bronze", ceil: "bronze", h: 4.2, name: "the cavern lined with brass, under the palace", lightI: 0.55, lightCol: 0xFFC890, bare: 1 });
hgwBed(R.g, -2.6, -2.6, Math.PI / 2, { cover: 0x6A2A4A });
hgwLoom(R.g, 2.6, -3.4, 0, 0xC8A040);
hgwCandle(R.g, 0, 1.0, -3.8, {});
hgwTable(R.g, 2.4, 1.2, 1.4, 0.8, 0.74, {});
hgwRug(R.g, 0, 0, 4, 3, 0x6A2A2A);
var sh = hgwCyl(R.g, 0.5, 0.9, 4.2, hgwGlowM(0xFFE8A0, 0.16), 0, 0, 0, 10);
R = hgwRoom(G, "arhouse", X.arhouse[0], X.arhouse[1], 9, 7, { wall: "mudbrick", floor: "beaten", h: 3.0, name: "a house in Argos", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwLoom(R.g, -3, -2.6, 0.4);
hgwTable(R.g, 1.6, 0.6, 1.6, 0.8, 0.74, {});
hgwHallRoom(G, "persealall", X.persealall, { name: "the hall of King Perseus in Argos", rich: true, queen: true });
},
function (G) {
var H = HGW_AR_H, I = HGW_AR, lite = hgwLite(), st = HGW.st, R = wRand(301);
hgwArRooms(G);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.5 });
hgwRoads(G, HGW_AR_ROADS, H, { w: { shore: 5, tiryns: 5, mycenae: 5, lerna: 4, acro: 4 } });
hgwStrip(G, I.inachus, 16, H, hgwMat("gravel"), 0.06);
var wm = hgwStrip(G, I.inachus, 3, function (x, z) { return H(x, z) + 0.12; }, hgwWaterM(0x5A8A8A, 0.8), 0);
HGW.water.push(wm);
var pl = [];
var LL = hgwPathLen(I.inachus);
for (var s = 0; s < (lite ? 30 : 80); s++) {
var q = hgwPathAt(I.inachus, R() * LL), a = R() * 6.28, x = q.x + Math.cos(a) * (12 + R() * 10), z = q.z + Math.sin(a) * (12 + R() * 10);
pl.push({ x: x, z: z, y: H(x, z), s: 0.8 + R() * 0.5 });
}
hgwPlant(G, "poplar", pl.filter(function (p, i) { return i % 3 === 0; }), {});
hgwPlant(G, "bush", pl.filter(function (p, i) { return i % 3; }), { col: 0x5A7A3A });
var A = I.acro, ay = H(A[0], A[1]), ring = [];
for (var k = 0; k <= 24; k++) {
var an = k / 24 * Math.PI * 2;
ring.push([A[0] + Math.cos(an) * 30, A[1] + Math.sin(an) * 28]);
}
hgwBigWall(G, ring, 6, H, { mat: "cyclopean", th: 3, tower: true, gate: [[A[0] + 30, A[1] + 2, 6]] });
hgwKingsHouse(G, H, { at: [A[0] - 4, A[1]], ry: -Math.PI / 2, hall: "achall", cw: 34, cd: 26, y: ay, wall: "ashlar" });
var db = hgwRm("danaebr");
if (db)
hgwDoor(db, "A brass door in the rock, down steps under the palace", A[0] + 8, A[1] + 14, Math.PI);
hgwTownPack(G, H, { c: I.argos, rx: 90, rz: 70, n: 56, seed: 302, roads: [HGW_AR_ROADS.shore, HGW_AR_ROADS.acro, HGW_AR_ROADS.lerna], r2: 0.35, tile: 0.4, door: { key: "arhouse", name: "The door of a house in Argos" }, life: true, avoid: [[I.argos[0], I.argos[1], 18], [A[0], A[1], 40]] });
hgwTemple(G, I.argos[0] + 30, I.argos[1] - 40, 12, 20, { ry: 0, statue: "athena" });
hgwAltar(G, I.argos[0] + 30, I.argos[1] - 22, H, {});
if (st.argosWalls) {
var tw = [];
for (var t = 0; t <= 30; t++) {
var b = t / 30 * Math.PI * 2;
tw.push([I.argos[0] + Math.cos(b) * 112, I.argos[1] + Math.sin(b) * 92]);
}
hgwBigWall(G, tw, 8, H, { mat: "cyclopean", th: 4, tower: true, gate: [[I.argos[0] + 80, I.argos[1] + 64, 8], [I.argos[0] - 12, I.argos[1] + 92, 7], [I.argos[0] - 60, I.argos[1] - 80, 7]] });
}
if (st.perseusKing) {
var ph = hgwRm("persealall");
if (ph)
hgwDoor(ph, "The door of King Perseus' hall", A[0] - 22, A[1] + 6, Math.PI / 2);
}
var T = I.tiryns, trg = [];
for (var u = 0; u <= 20; u++) {
var c = u / 20 * Math.PI * 2;
trg.push([T[0] + Math.cos(c) * 44, T[1] + Math.sin(c) * 26]);
}
hgwBigWall(G, trg, 11, H, { mat: "cyclopean", th: 6, tower: true, gate: [[T[0] - 40, T[1] - 10, 6]] });
hgwKingsHouse(G, H, { at: [T[0] + 6, T[1]], ry: -Math.PI / 2, cw: 30, cd: 20, wall: "cyclopean" });
var M = I.mycenae, mrg = [];
for (var v = 0; v <= 20; v++) {
var e = v / 20 * Math.PI * 2;
mrg.push([M[0] + Math.cos(e) * 48, M[1] + Math.sin(e) * 34]);
}
hgwBigWall(G, mrg, 9, H, { mat: "cyclopean", th: 5, tower: true, gate: [[M[0] - 8, M[1] + 34, 6]] });
hgwTownPack(G, H, { c: M, rx: 40, rz: 28, n: 16, seed: 303, roads: [HGW_AR_ROADS.mycenae], r2: 0.3, tile: 0.3, life: true });
var rd = [];
for (var w = 0; w < (lite ? 60 : 160); w++) {
var rx = I.lerna[0] + (R() - 0.5) * 160, rz = I.lerna[1] + (R() - 0.5) * 90;
if (H.sd(rx, rz) > 2)
rd.push({ x: rx, z: rz, y: H(rx, rz), s: 0.8 + R() * 0.7 });
}
hgwPlant(G, "reeds", rd, {});
for (var pp = 0; pp < 5; pp++) {
var px = I.lerna[0] - 50 + pp * 24, pz = I.lerna[1] - 30 + (pp % 2) * 18;
hgwWater(G, px, pz, 14, 9, H(px, pz) + 0.15, 0x4A6A5A, 0.85);
}
hgwHerd(G, "horse", I.lerna[0] + 40, I.lerna[1] - 90, 70, lite ? 6 : 16, H, 304);
var vin = [];
for (var vr = 0; vr < 10; vr++)
for (var vc = 0; vc < 24; vc++) {
var vx = -280 + vc * 2.8, vz = 420 + vr * 3.2;
vin.push({ x: vx, z: vz, y: H(vx, vz) });
}
hgwPlant(G, "vine", vin, { keepAll: true });
hgwHerd(G, "sheep", -700, -200, 90, lite ? 8 : 20, H, 305);
hgwHerd(G, "cow", 100, 200, 60, lite ? 4 : 10, H, 306);
hgwGreekTrees(G, H, { clear: [[I.argos[0], I.argos[1], 130], [A[0], A[1], 40], [T[0], T[1], 60], [M[0], M[1], 60], [I.lerna[0], I.lerna[1], 120], [75, 640, 40]], roads: hgwRoadList(HGW_AR_ROADS), olive: 3.2, oak: 1.0, pine: 1.2 });
var corn = [];
for (var f = 0; f < (lite ? 90 : 260); f++) {
var fx = -250 + R() * 600, fz = -300 + R() * 560;
if (Math.hypot(fx - I.argos[0], fz - I.argos[1]) < 140 || hgwPathD(fx, fz, I.inachus) < 20)
continue;
corn.push({ x: fx, z: fz, y: H(fx, fz), s: 1.2 + R() * 0.6 });
}
hgwPlant(G, "grass", corn, { col: 0xC8A848 });
for (var hy = 0; hy < (lite ? 5 : 12); hy++) {
var hx = -200 + hy * 45, hz = -120 + (hy % 3) * 90;
hgwHay(G, hx, hz, H, 1);
}
[[-300, 150], [-150, 420], [150, 560]].forEach(function (q) { hgwWell(G, q[0], q[1], H); });
[[-250, 330, 0.5], [100, 620, 1.2], [-300, -300, 2.8]].forEach(function (q) { hgwCart(G, q[0], q[1], q[2], {}); });
hgwRider(G, -200, -500, 2.8, H, {});
hgwRider(G, 170, 652, 1.4, H, {});
for (var bb = 0; bb < (lite ? 3 : 6); bb++) {
var bx = 20 + bb * 14, bz = 652 + (bb % 2) * 4;
hgwBoat(G, bx, H(bx, bz) + 0.1, bz, 0.2 + bb * 0.3, {});
}
hgwFleet(G, H, 330, 1010, Math.PI / 2, lite ? 2 : 4, 9);
hgwCrowd("arAgora", [["A woman of Argos at the well", "f", "gkwoman", "The twins of Argos! Acrisius and Proetus quarrelled in the womb, they say, and never stopped.", "greek"],
["A horse-breeder from Lerna", "m", "herd", "Argos, the land of horses. Go down to Lerna Fen and see them.", "greek"], ["A potter", "m", "gkman", "A good pot from Argos, friend. Look at the paint on it.", "greek"],
["An old man under the plane tree", "m", "gkold", "The king is afraid of something. A king who is afraid is a dangerous king.", "greek"], ["A girl with a basket of figs", "f", "gkwoman", "Figs from the vale! Sweet as honey.", "greek", true],
["A spearman of the king's guard", "m", "warrior", "Keep moving, friend. The king does not like crowds under his hill.", "greek"], ["A shepherd", "m", "herd", "My flock is up on the hills toward Mycenae.", "greek"],
["A weaver", "f", "gkveiled", "They say the princess Danae weaves better than any of us. No one has seen her this long while.", "greek"]], I.argos[0] - 50, I.argos[1] - 40, I.argos[0] + 50, I.argos[1] + 40, { wander: 6, persona: "greek" });
hgwCrowd("arTiryns", [["A Cyclops mason, one-eyed and huge", "m", "giant", "We built these walls for King Proetus. Each stone, two yoke of oxen could not stir.", "greek"], ["A man of Tiryns", "m", "warrior", "Argos is over there. Our king and theirs are brothers, and that is the trouble.", "greek"], ["A woman at the gate", "f", "gkwoman", "We have fruitful meadows here too.", "greek"]], T[0] - 60, T[1] - 20, T[0] - 30, T[1] + 10, { wander: 4, persona: "greek" });
hgwCrowd("arLerna", [["A horse-boy", "m", "herd", "Watch their heels! Lerna horses kick.", "greek", true], ["A reed-cutter", "m", "herd", "The fen gives us reeds for roofs and for pipes.", "greek"]], I.lerna[0] + 10, I.lerna[1] - 80, I.lerna[0] + 60, I.lerna[1] - 40, { wander: 6, persona: "greek" });
},
function (G) {
var X = HGW_ROOMXZ.seriphos, R, st = HGW.st;
var hall = hgwHallRoom(G, "pdhall", X.pdhall, { name: "the hall of Polydectes", rich: true });
if (st.stoneHall && hall) {
var Rr = wRand(41);
for (var i = 0; i < 12; i++) {
var side = i % 2 ? 1 : -1, z = -5 + Math.floor(i / 2) * 2.2, p = hgwDressed("pdguest" + i, i === 0 ? "king" : "gkman", { sex: "m", beard: "full" });
p.position.set(side * 3.2, 0.0, z);
p.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
hall.g.add(p);
hgwStoneAll(p);
}
}
R = hgwRoom(G, "pdmill", X.pdmill[0], X.pdmill[1], 9, 7, { wall: "mudbrick", floor: "beaten", h: 3.0, name: "the room of the hand-mill, in Polydectes' house", lightI: 0.5, bare: 1, beams: true });
hgwCyl(R.g, 0.5, 0.55, 0.3, hgwMat("greystone"), 0, 0, -1.2, 14);
hgwCyl(R.g, 0.48, 0.48, 0.18, hgwMat("greystone"), 0, 0.3, -1.2, 14);
for (var j = 0; j < 4; j++)
hgwPithos(R.g, -3.6 + j * 1.0, 0, 2.6, 0.55);
R = hgwRoom(G, "dictys", X.dictys[0], X.dictys[1], 10, 8, { wall: "whitewash", floor: "beaten", h: 3.0, name: "Dictys the netter's cottage", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.6, 0, { h: R.h, mat: "lime" });
hgwLoom(R.g, -3.4, -3, 0.3, 0x4A6AA8);
hgwBed(R.g, 3.6, -2, Math.PI / 2, { cover: 0x8A6A3A });
hgwTable(R.g, 0.6, 0.8, 1.8, 0.9, 0.74, {});
hgwBench(R.g, 0.6, 1.8, Math.PI, { w: 1.8, d: 0.4, back: false });
for (var b = 0; b < 3; b++)
hgwBox(R.g, 0.5, 0.4, 0.4, hgwMat("oak"), -4.2 + b * 0.6, 0, 3.4);
R = hgwRoom(G, "athser", X.athser[0], X.athser[1], 12, 16, { wall: "ashlar", floor: "gkfloor", h: 6, name: "the temple of Athena on Seriphos", lightI: 0.55, lightCol: 0xFFE0B0, bare: 1, beams: true });
hgwBox(R.g, 2.4, 1.0, 2.0, hgwMat("lime"), 0, 0, -6.4);
var im = hgwDressed("athSer", "athena", { sex: "f" });
im.position.set(0, 1.0, -6.2);
im.scale.set(1.4, 1.4, 1.4);
R.g.add(im);
hgwAltar(R.g, 0, 1.6, function () { return 0; }, {});
for (var c = 0; c < 4; c++)
hgwColumn(R.g, -3.6 + (c % 2) * 7.2, 0, -3 + Math.floor(c / 2) * 6, 6, 0.4, {});
if (st.gorgonShield) {
var sh = hgwCyl(R.g, 1.1, 1.1, 0.1, hgwMat("bronze"), 1.5, 2.4, -6.0, 24);
sh.rotation.x = Math.PI / 2;
}
R = hgwRoom(G, "srhouse", X.srhouse[0], X.srhouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a house on Seriphos", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwTable(R.g, 1.6, 0.6, 1.6, 0.8, 0.74, {});
},
function (G) {
var H = HGW_SE_H, I = HGW_SE, lite = hgwLite(), st = HGW.st, R = wRand(311);
hgwSeRooms(G);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.75, rock: 70, cfn: hgwHeroColour(H, { dry: 0.75, rock: 70, cliffCol: [0.62, 0.34, 0.24] }) });
hgwRoads(G, HGW_SE_ROADS, H, { w: { up: 5, west: 4, cliff: 3, rocks: 3 } });
var bo = [];
for (var k = 0; k < (lite ? 40 : 110); k++) {
var a = R() * 6.28, r = 200 + R() * 900, x = Math.cos(a) * r, z = Math.sin(a) * r;
var sd = H.sd(x, z);
if (sd < -6 || sd > 8)
continue;
bo.push({ x: x, z: z, y: H(x, z), s: 1 + R() * 2.2 });
}
hgwPlant(G, "rock", bo, { col: 0x8A4A34 });
var T = I.town, ty = H(T[0], T[1]);
hgwKingsHouse(G, H, { at: I.palace, ry: Math.PI, hall: "pdhall", cw: 40, cd: 30, wall: "limewall" });
var mr = hgwRm("pdmill");
if (mr)
hgwDoor(mr, "A low door at the back of the palace: the women's rooms and the mill", I.palace[0] + 16, I.palace[1] + 14, 0);
hgwTemple(G, I.temple[0], I.temple[1] - 10, 12, 18, { ry: 0, statue: "athena" });
var at = hgwRm("athser");
if (at)
hgwDoor(at, "The doors of Athena's temple", I.temple[0], I.temple[1] + 2, Math.PI);
hgwTownPack(G, H, { c: T, rx: 80, rz: 60, n: 44, seed: 312, roads: [HGW_SE_ROADS.up, HGW_SE_ROADS.west], r2: 0.15, tile: 0.1, door: { key: "srhouse", name: "The door of a house on Seriphos" }, life: true, avoid: [[I.palace[0], I.palace[1], 30], [I.temple[0], I.temple[1] - 10, 16]] });
hgwFleet(G, H, 770, 450, 0, lite ? 2 : 4, 10);
for (var b = 0; b < (lite ? 3 : 7); b++) {
var bx = 690 - b * 3, bz = 430 + b * 8;
hgwBoat(G, bx, H(bx, bz) + 0.1, bz, 1.4 + b * 0.2, {});
}
hgwNets(G, 690, 480, 1.5, H);
hgwHarbourSpots("seriphos", 705, 446);
hgwGkHouse(G, I.cottage[0], I.cottage[1], 9, 7, 3.4, { ry: -Math.PI / 2, court: true });
var dr = hgwRm("dictys");
if (dr)
hgwDoor(dr, "The door of Dictys' cottage", I.cottage[0] - 5, I.cottage[1], -Math.PI / 2);
hgwNets(G, I.cottage[0] - 14, I.cottage[1] - 12, 0.4, H);
hgwNets(G, I.cottage[0] - 12, I.cottage[1] + 14, -0.3, H);
hgwBoat(G, -684, H(-684, 92) + 0.1, 92, 0.2, {});
if (st.chest) {
hgwChest(G, -692, 0.2, 104, 0.6, { open: st.chest === "open" });
}
hgwBox(G, 1.6, 0.5, 0.6, hgwMat("lime"), I.leap[0] + 3, H(I.leap[0] + 3, I.leap[1] + 4), I.leap[1] + 4);
if (st.stones)
hgwStoneRing(G, I.ring[0], I.ring[1], 12, 14, H);
hgwHerd(G, "goat", 0, -300, 160, lite ? 6 : 16, H, 313);
hgwHerd(G, "goat", -300, 400, 120, lite ? 4 : 10, H, 314);
hgwGreekTrees(G, H, { clear: [[T[0], T[1], 100], [I.cottage[0], I.cottage[1], 30], [I.harbour[0], I.harbour[1], 40], [I.leap[0], I.leap[1], 30]], roads: hgwRoadList(HGW_SE_ROADS), olive: 0.6, oak: 0.1, pine: 0.3 });
hgwTerraceWall(G, [[300, 340], [360, 380], [420, 400]], H);
hgwTerraceWall(G, [[520, 180], [580, 220], [620, 260]], H);
hgwCrowd("seTown", [["A fisherman mending a net", "m", "sailor", "Dictys? Best man on the island. His brother is the king, and that is the island's bad luck.", "greek"],
["A woman with a water-jar", "f", "gkwoman", "Seriphos is all rock, friend. Fish and goats and rock.", "greek"], ["A young sailor", "m", "sailor", "I've been to Samos and back, with Perseus. He's taller by a head than any of us.", "greek"],
["An old woman on her doorstep", "f", "gkold", "The king has his eye on Dictys' foster-daughter. No good will come of it.", "greek"], ["A boy with a goat on a string", "m", "herd", "My goat bites. Don't pat her.", "greek", true],
["A landowner in a fine cloak", "m", "gkman", "The king feasts us often. One must bring a present, of course.", "greek"]], T[0] - 50, T[1] - 40, T[0] + 50, T[1] + 40, { wander: 6, persona: "greek" });
hgwCrowd("seHarbour", [["A merchant from Samos", "m", "sailor", "Wine and oil for Seriphos, fish and stone for Samos.", "greek"], ["A net-woman", "f", "gkwoman", "Mullet today. Come back tomorrow for tunny.", "greek"]], I.harbour[0] - 20, I.harbour[1] - 20, I.harbour[0], I.harbour[1] + 10, { wander: 4, persona: "greek" });
},
function (G) {
var H = HGW_NC_H, I = HGW_NC, lite = hgwLite(), R = wRand(321);
hgwSea(G, 0);
hgwLandMesh(G, H, { mat: "snow", cfn: hgwNcColour(H) });
for (var c = 0; c < 9; c++) {
var cx = I.cliff[0] + c * 12 - 50, cz = I.cliff[1] + ((c % 2) * 6) - 4;
hgwPeak(G, cx, cz, 9, 26 + (c % 3) * 8, { k: 40 + c, mat: hgwMat("blueice"), y: H(cx, cz) - 2, noCap: 1 });
}
for (var b = 0; b < (lite ? 8 : 22); b++) {
var a = R() * Math.PI - Math.PI, d = 90 + R() * 700, bx = I.log[0] + Math.cos(a) * d, bz = I.log[1] + Math.sin(a) * d * 0.6 - 60;
if (H.sd(bx, bz) < -20)
hgwBerg(G, bx, bz, 10 + R() * 24, 14 + R() * 30, b);
}
var L = I.log, ly = H(L[0], L[1]);
var lg = hgwCyl(G, 0.45, 0.55, 7, hgwLam(0xE8E4DA), L[0], ly + 0.45, L[1], 10);
lg.rotation.z = Math.PI / 2;
lg.position.y = ly + 0.5;
hgwSolid(L[0], L[1], 7, 1.0, ly - 1, ly + 0.9);
hgwSnowfall(G, lite ? 260 : 600, 1.0);
if (!HGW.st.graeae)
[["The first Gray Sister", -2], ["The second Gray Sister", 0], ["The third Gray Sister", 2]].forEach(function (q, i) {
hgwOne("graea" + i, q[0], "f", "gkold", L[0] + q[1], L[1] + 0.9, 0, ["Why the old times were better than the new...", "Give me the eye, that I may see.", "There never was such a world as ours, nor will be."][i], { hair: 0xF4F4F4, persona: "graea", y: ly + 0.1 });
});
hgwSpot(I.cliff[0], I.cliff[1] + 18, 6, "The ice-cliff", "look up at the bones frozen in the ice", function () { hgbSay && hgbSay("❄️ Old bones in the ice, white and very old: seals, gulls, and things with no name, caught long ago."); });
for (var w = 0; w < 4; w++) {
var wx = L[0] + 30 + w * 18, wz = L[1] + 20 + (w % 2) * 10;
var rib = hgwCyl(G, 0.12, 0.12, 4, hgwLam(0xD8D2C4), wx, H(wx, wz), wz, 6);
rib.rotation.z = 0.6 + (w % 2) * 0.4;
}
},
function (G) {
var H = HGW_ATL_H, I = HGW_AT2, lite = hgwLite(), st = HGW.st, R = wRand(331);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.15, rock: 200, cfn: hgwHeroColour(H, { dry: 0.15, rock: 200, dark: [[-700, 720, 190]] }) });
hgwRoads(G, HGW_ATL_ROADS, H, { w: { up: 3, cave: 3, peak: 3 } });
var big = [], fern = [], fl = [];
for (var t = 0; t < (lite ? 70 : 200); t++) {
var x = -700 + R() * 1300, z = -700 + R() * 700;
if (H.sd(x, z) < 30 || hgwPathD(x, z, HGW_ATL_ROADS.up) < 8 || Math.hypot(x - I.garden[0], z - I.garden[1]) < 60)
continue;
big.push({ x: x, z: z, y: H(x, z), s: 0.9 + R() * 0.6 });
}
for (var f = 0; f < (lite ? 120 : 360); f++) {
var fx = -700 + R() * 1200, fz = -650 + R() * 600;
if (H.sd(fx, fz) < 20)
continue;
(f % 3 ? fern : fl).push({ x: fx, z: fz, y: H(fx, fz), s: 0.8 + R() * 0.8 });
}
hgwPlant(G, "jtree", big.filter(function (p, i) { return i % 2; }), {});
hgwPlant(G, "tree", big.filter(function (p, i) { return !(i % 2); }), { col: 0x2A5A2A });
hgwPlant(G, "fern", fern, {});
hgwPlant(G, "flowers", fl, {});
[[-420, -420], [-150, -460], [60, -480]].forEach(function (w, i) { var wy = H(w[0], w[1]); var fall = hgwBox(G, 4, 18, 0.4, hgwWaterM(0xD8E8F0, 0.7), w[0], wy, w[1]); HGW.water.push(fall); hgwWater(G, w[0], w[1] + 6, 14, 10, wy + 0.2, 0x5A8AA0, 0.85); });
var gy = H(I.garden[0], I.garden[1]);
hgwGoldTree(G, I.garden[0] + 20, gy, I.garden[1] - 10).scale.setScalar(1.5);
var cyp = [];
for (var k = 0; k < 24; k++) {
var a = k / 24 * Math.PI * 2;
cyp.push({ x: I.garden[0] + 20 + Math.cos(a) * 34, z: I.garden[1] - 10 + Math.sin(a) * 34, y: gy, s: 1.1 });
}
hgwPlant(G, "cypress", cyp.filter(function (p, i) { return i % 5 !== 2; }), { keepAll: true });
var gfl = [];
for (var g2 = 0; g2 < (lite ? 40 : 100); g2++) {
var a2 = R() * 6.28, d2 = 10 + R() * 20;
gfl.push({ x: I.garden[0] + 20 + Math.cos(a2) * d2, z: I.garden[1] - 10 + Math.sin(a2) * d2, y: gy, s: 0.9 });
}
hgwPlant(G, "flowers", gfl, { keepAll: true });
var C = I.cave, cy = H(C[0], C[1]);
hgwPeak(G, C[0] + 16, C[1] - 12, 26, 30, { k: 51, y: cy - 2, noCap: 1 });
hgwBox(G, 6, 7, 3, hgwLam(0x080606), C[0] + 8, cy, C[1] - 6, 0.6);
hgwSmoke(G, C[0] + 8, cy + 6, C[1] - 6, 0x3A3430, lite ? 10 : 24);
var glow = hgwBox(G, 4, 3, 0.4, hgwGlowM(0xC8401A, 0.5), C[0] + 8, cy + 0.2, C[1] - 4.4, 0.6);
var P = I.peak;
hgwAtlasGiant(G, P[0] + 30, H(P[0] + 30, P[1] - 20) - 2, P[1] - 20, Math.PI * 0.75, !!st.atlasStone);
var S = I.isle, sy = H(S[0], S[1]);
for (var r = 0; r < (lite ? 8 : 18); r++) {
var a3 = R() * 6.28, d3 = 20 + R() * 90, rx = S[0] + Math.cos(a3) * d3, rz = S[1] + Math.sin(a3) * d3;
if (H.sd(rx, rz) < 4)
continue;
hgwPeak(G, rx, rz, 4 + R() * 8, 4 + R() * 14, { k: 60 + r, y: H(rx, rz) - 1, noCap: 1 });
}
for (var m = 0; m < (lite ? 4 : 9); m++) {
var mx = S[0] - 30 + m * 7, mz = S[1] + 20 + (m % 3) * 6, man = hgwDressed("stoneman" + m, m % 3 ? "warrior" : "gkman", { sex: "m", beard: "full" });
man.position.set(mx, H(mx, mz), mz);
man.rotation.y = R() * 6.28;
G.add(man);
hgwStoneAll(man);
hgwRound(mx, mz, 0.5);
}
if (!st.gorgonsGone) {
hgwGorgon(G, S[0] - 60, H(S[0] - 60, S[1] - 40), S[1] - 40, 0.6, { s: 1.4 });
hgwGorgon(G, S[0] + 50, H(S[0] + 50, S[1] - 50), S[1] - 50, -0.8, { s: 1.4 });
}
if (!st.medusaGone)
hgwGorgon(G, S[0] - 6, H(S[0] - 6, S[1] - 80), S[1] - 80, 0.1, { s: 1.2, medusa: true });
hgwCrowd("atGarden", [["Aegle, one of the Hesperides", "f", "nymph", "We have danced alone here for a thousand years. Will you dance?", "A nymph of the Hesperides, daughter of the Evening Star, from Kingsley's The Heroes: lonely, playful, singing."],
["Erytheia, one of the Hesperides", "f", "nymph", "Mind old Ladon. He never sleeps.", "A nymph of the Hesperides, from Kingsley's The Heroes."], ["Hesperethusa, one of the Hesperides", "f", "nymph", "Are you Heracles the mighty, come to rob our garden?", "A nymph of the Hesperides, from Kingsley's The Heroes."]], I.garden[0] - 10, I.garden[1] - 10, I.garden[0] + 30, I.garden[1] + 20, { wander: 5 });
},
function (G) {
var X = HGW_ROOMXZ.iopa, R;
R = hgwHallRoom(G, "cephall", X.cephall, { name: "the hall of King Cepheus", rich: true, queen: true, wall: "limewall" });
R = hgwRoom(G, "iohouse", X.iohouse[0], X.iohouse[1], 9, 7, { wall: "mudbrick", floor: "beaten", h: 3.0, name: "a house in Iopa", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwLoom(R.g, -3, -2.6, 0.4, 0x2A4A8A);
},
function (G) {
var H = HGW_IO_H, I = HGW_IO, lite = hgwLite(), st = HGW.st, R = wRand(341);
hgwIoRooms(G);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.6, cfn: hgwHeroColour(H, { dry: 0.6, dark: [[-185, -150, 18]], cliffCol: [0.72, 0.62, 0.46] }) });
hgwRoads(G, HGW_IO_ROADS, H, { w: { harbour: 5, cliff: 4, inland: 4 } });
var T = I.town;
hgwKingsHouse(G, H, { at: I.palace, ry: -Math.PI / 2, hall: "cephall", cw: 36, cd: 26, wall: "limewall" });
hgwTownPack(G, H, { c: T, rx: 70, rz: 60, n: 46, seed: 342, roads: [HGW_IO_ROADS.harbour, HGW_IO_ROADS.inland], r2: 0.1, tile: 0.0, door: { key: "iohouse", name: "The door of a house in Iopa" }, life: true, avoid: [[I.palace[0], I.palace[1], 28]] });
hgwTemple(G, T[0] - 30, T[1] + 40, 10, 16, { ry: Math.PI / 2, statue: "warrior", statueSex: "f" });
hgwWater(G, T[0] - 30, T[1] + 64, 16, 10, H(T[0] - 30, T[1] + 64) + 0.2, 0x3A6A6A, 0.85);
var ry = H(I.rock[0], I.rock[1]);
hgwPeak(G, I.rock[0] - 7, I.rock[1] - 4, 8, 17, { k: 71, y: ry - 2, noCap: 1 });
hgwPeak(G, I.rock[0] + 6, I.rock[1] - 8, 5, 9, { k: 72, y: ry - 2, noCap: 1 });
if (!st.freed) {
[-1, 1].forEach(function (s) { var ch = hgwCyl(G, 0.05, 0.05, 1.6, hgwMat("bronze"), I.rock[0] - 1 + s * 0.7, ry + 1.4, I.rock[1] + 3, 6); ch.rotation.z = s * 0.5; });
}
var pa = [];
for (var p = 0; p < (lite ? 30 : 80); p++) {
var px = -60 + R() * 500, pz = -400 + R() * 700;
if (H.sd(px, pz) < 16 || Math.hypot(px - T[0], pz - T[1]) < 80)
continue;
pa.push({ x: px, z: pz, y: H(px, pz), s: 0.9 + R() * 0.5 });
}
hgwPlant(G, "palm", pa, {});
hgwFleet(G, H, -60, -300, 0, lite ? 2 : 3, 10);
for (var b = 0; b < (lite ? 3 : 6); b++) {
var bx = -20 - b * 3, bz = -270 - b * 6;
hgwBoat(G, bx, H(bx, bz) + 0.1, bz, 1.2 + b * 0.3, {});
}
hgwNets(G, 10, -262, 0.3, H);
if (st.altars)
[-8, 0, 8].forEach(function (dx) { hgwAltar(G, I.altars[0] + dx, I.altars[1] - 6, H, {}); });
if (st.beast === "coming") {
var bg = hgwSeaBeast(G, -420, -420, -2.48, false), t0 = 0;
HGW.ticks.push(function (dt) { if (!bg.parent)
return; t0 += dt; var k = Math.min(1, t0 / 90); bg.position.set(-420 + (-232 + 420) * k, Math.sin(HGW.t * 0.8) * 0.3, -420 + (-176 + 420) * k); });
}
if (st.beast === "rock")
hgwSeaBeast(G, -232, -176, -2.48, true);
hgwCrowd("ioTown", [["A water-carrier", "m", "gkman", "The sea came up over the low fields, and then the earth shook. The priests say it is the Sea Queen's anger.", "An Aethiop of Iopa in the time of King Cepheus, from Kingsley's The Heroes: frightened of the floods and earthquakes."],
["A woman in mourning", "f", "gkveiled", "Our princess. They took our princess down to the rock.", "An Aethiop woman of Iopa, from Kingsley's The Heroes."], ["A priest of Atergatis", "m", "seer", "Only the maiden's blood can atone. So the Queen of the Fishes has said.", "A priest of Atergatis at Iopa, from Kingsley's The Heroes: stern, afraid."],
["A fisherman who will not eat fish", "m", "sailor", "In our land we eat no fish, for fear of the Queen of the Fishes. We net them and let them go.", "An Aethiop of Iopa, from Kingsley's The Heroes."], ["A child with a doll", "f", "gkwoman", "Is Andromeda coming back?", "A child of Iopa.", true],
["A Phoenician trader from Tyre", "m", "sailor", "Cedars from Lebanon, purple from Tyre. Bad times to trade here, with the land shaking.", "greek"]], T[0] - 50, T[1] - 40, T[0] + 40, T[1] + 40, { wander: 6, persona: "greek" });
},
function (G) {
var X = HGW_ROOMXZ.larissa, R;
hgwHallRoom(G, "teuthall", X.teuthall, { name: "the hall of King Teutamenes" });
R = hgwRoom(G, "latemple", X.latemple[0], X.latemple[1], 12, 16, { wall: "ashlar", floor: "gkfloor", h: 6, name: "the temple in Larissa, where Perseus was made clean", lightI: 0.55, lightCol: 0xFFE0B0, bare: 1, beams: true });
hgwBox(R.g, 2.4, 1.0, 2.0, hgwMat("lime"), 0, 0, -6.4);
var im = hgwDressed("apLar", "hero", { sex: "m" });
im.position.set(0, 1.0, -6.2);
im.scale.set(1.4, 1.4, 1.4);
R.g.add(im);
hgwAltar(R.g, 0, 1.6, function () { return 0; }, {});
},
function (G) {
var H = HGW_LR_H, I = HGW_LA2, lite = hgwLite(), st = HGW.st, R = wRand(351);
hgwLaRooms(G);
hgwSea(G, -60);
hgwLandMesh(G, H, { dry: 0.35 });
hgwRoads(G, HGW_LR_ROADS, H, { w: { games: 5, river: 4, south: 4 } });
var wm = hgwStrip(G, I.peneus, 26, function (x, z) { return H(x, z) + 0.2; }, hgwWaterM(0x4A7A72, 0.86), 0);
HGW.water.push(wm);
var pl = [];
for (var s = 0; s < (lite ? 40 : 110); s++) {
var L = hgwPathLen(I.peneus), q = hgwPathAt(I.peneus, R() * L), a = R() * 6.28, x = q.x + Math.cos(a) * (18 + R() * 14), z = q.z + Math.sin(a) * (18 + R() * 14);
pl.push({ x: x, z: z, y: H(x, z), s: 0.9 + R() * 0.5 });
}
hgwPlant(G, "poplar", pl, {});
var T = I.town, ring = [];
for (var k = 0; k <= 22; k++) {
var an = k / 22 * Math.PI * 2;
ring.push([T[0] + Math.cos(an) * 62, T[1] + Math.sin(an) * 54]);
}
hgwBigWall(G, ring, 6, H, { mat: "cyclopean", th: 3, tower: true, gate: [[T[0] + 50, T[1] + 30, 7], [T[0] - 10, T[1] - 54, 6]] });
hgwKingsHouse(G, H, { at: [T[0] + 16, T[1] + 8], ry: Math.PI / 2, hall: "teuthall", cw: 30, cd: 24 });
hgwTemple(G, I.temple[0], I.temple[1] - 12, 12, 18, { ry: 0, statue: "warrior" });
var tr = hgwRm("latemple");
if (tr)
hgwDoor(tr, "The doors of the temple", I.temple[0], I.temple[1], Math.PI);
hgwTownPack(G, H, { c: T, rx: 56, rz: 46, n: 30, seed: 352, roads: [HGW_LR_ROADS.games, HGW_LR_ROADS.river], r2: 0.4, tile: 0.3, life: true, avoid: [[T[0] + 16, T[1] + 8, 24], [I.temple[0], I.temple[1] - 12, 14]] });
var Gm = I.games, gy = H(Gm[0], Gm[1]);
hgwStrip(G, [[Gm[0] - 80, Gm[1]], [Gm[0] + 80, Gm[1]]], 10, H, hgwMat("sand"), 0.06);
hgwCyl(G, 0.3, 0.3, 2.4, hgwMat("lime"), Gm[0] + 80, gy, Gm[1], 8);
hgwCyl(G, 0.3, 0.3, 2.4, hgwMat("lime"), Gm[0] - 80, gy, Gm[1], 8);
hgwAwning(G, Gm[0], gy + 3.2, Gm[1] - 22, 10, 5, 0, [0xC8A040, 0xE8E0C8]);
hgwThrone(G, Gm[0] - 2, Gm[1] - 22, 0, { mat: "oak", trim: "gold" }).position.y = gy;
hgwThrone(G, Gm[0] + 2, Gm[1] - 22, 0, { mat: "oak", trim: "gold" }).position.y = gy;
hgwTable(G, Gm[0] + 8, Gm[1] - 20, 2.4, 1, 0.8, {});
for (var cr = 0; cr < 5; cr++) {
var w = new THREE.Mesh(hgwGeo("crown", function () { return new THREE.TorusGeometry(0.16, 0.04, 6, 14); }), hgwLam(0x6A8A3A));
w.rotation.x = Math.PI / 2;
w.position.set(Gm[0] + 7 + cr * 0.45, gy + 0.86, Gm[1] - 20);
G.add(w);
}
var Rr = wRand(353), list = [];
for (var c = 0; c < (lite ? 16 : 40); c++) {
var side = c % 2 ? 1 : -1, x = Gm[0] - 70 + Rr() * 140, z = Gm[1] + side * (14 + Rr() * 6);
list.push(["A Pelasgian at the games", Rr() < 0.4 ? "f" : "m", Rr() < 0.5 ? "herd" : "gkman", "Run, stranger, run! Larissa has never seen such running.", "greek"]);
}
hgwCrowd("laGames", list, Gm[0] - 70, Gm[1] + 14, Gm[0] + 70, Gm[1] + 20, { wander: 2, persona: "greek" });
[-1, 1].forEach(function (sd) { hgwBox(G, 170, 1.4, 6, hgwMat("meadow"), Gm[0], gy - 0.4, Gm[1] + sd * 18); });
hgwPlant(G, "poplar", [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { return { x: Gm[0] - 90 + i * 26, z: Gm[1] + 30, y: gy, s: 1.2 }; }), { keepAll: true });
hgwHerd(G, "horse", -400, 500, 120, lite ? 6 : 14, H, 354);
hgwHerd(G, "cow", 500, 600, 100, lite ? 4 : 10, H, 355);
hgwGreekTrees(G, H, { clear: [[T[0], T[1], 80], [Gm[0], Gm[1], 110]], roads: hgwRoadList(HGW_LR_ROADS), olive: 0.6, oak: 1.2, pine: 0.4 });
hgwCrowd("laTown", [["A wild Pelasgian with a boar-spear", "m", "herd", "We are the old people of this land, before ever the Hellens came.", "A Pelasgian of Larissa, from Kingsley's The Heroes: rough, proud, hospitable."],
["A woman with a cheese", "f", "gkwoman", "The king of Argos is our guest! There are games in his honour.", "greek"], ["A boy with a hoop", "m", "herd", "I'm going to throw the quoit when I'm big.", "greek", true]], T[0] - 30, T[1] - 30, T[0] + 30, T[1] + 30, { wander: 6, persona: "greek" });
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = hgwShip(P, x, y, z, ry, { len: 26, sail: !!o.sail, afloat: !!o.afloat, oars: o.oars, sailCol: 0xE8D8B0 });
[-1, 1].forEach(function (s) { var bw = hgwBox(g, 0.06, 0.9, 4.4, hgwMat("redpaint"), s * 1.85, 0.55, 10.4); bw.rotation.y = -s * 0.16; });
var leaf = hgwLam(0x3A5A22);
hgwCyl(g, 0.06, 0.09, 1.6, hgwMat("darkbark"), 0, 2.2, 13.6, 6).rotation.x = 0.9;
for (var l = 0; l < 5; l++)
hgwEll(g, leaf, 0.32, 0.22, 0.36, (l % 2 ? 0.2 : -0.2), 2.7 + l * 0.08, 14.1 + l * 0.18, 7);
if (o.fleece)
hgwFleece(g, 0, 2.4, -9, 0, 0.8);
return g;
},
function (P, x, y, z, ry, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.scale.setScalar(s);
P.add(g);
var gold = hgwShine(0xF0C030, 0.3, 0.95), R = wRand(77);
var b = hgwEll(g, gold, 0.9, 1.4, 0.18, 0, 0, 0, 14);
for (var c = 0; c < (hgwLite() ? 14 : 34); c++) {
var a = R() * 6.28, r = R();
hgwEll(g, gold, 0.16, 0.16, 0.12, Math.cos(a) * r * 0.8, Math.sin(a) * r * 1.25, 0.12, 6);
}
[-1, 1].forEach(function (sd) { var l = hgwEll(g, gold, 0.14, 0.6, 0.1, sd * 0.95, 1.1, 0, 8); l.rotation.z = sd * 0.9; var h = hgwEll(g, gold, 0.14, 0.55, 0.1, sd * 0.75, -1.5, 0, 8); h.rotation.z = -sd * 0.4; });
var hd = hgwEll(g, gold, 0.32, 0.42, 0.16, 0, 1.45, 0.02, 10);
[-1, 1].forEach(function (sd) { var t = new THREE.Mesh(hgwGeo("ramhorn", function () { return new THREE.TorusGeometry(0.2, 0.06, 6, 12, Math.PI * 1.5); }), gold); t.position.set(sd * 0.3, 1.6, 0.06); t.rotation.y = sd * 0.4; hd.parent.add(t); });
return g;
},
function (seed, o) {
o = o || {};
var g = new THREE.Group(), coat = hgwLam(o.coat || 0x8A5A34), dk = hgwLam(0x3A2618), sk = hgwSkinM("tan", 0xA87050);
hgwEll(g, coat, 0.42, 0.44, 0.95, 0, 1.25, 0.25, 14);
hgwEll(g, coat, 0.38, 0.42, 0.4, 0, 1.32, 1.0, 12);
[[0.22, -0.45], [-0.22, -0.45], [0.22, 0.95], [-0.22, 0.95]].forEach(function (q, i) { var up = hgwEll(g, coat, 0.11, 0.32, 0.13, q[0], 0.9, q[1], 8); var lo = hgwCyl(g, 0.05, 0.07, 0.62, coat, q[0], 0.12, q[1], 7); hgwCyl(g, 0.08, 0.085, 0.12, dk, q[0], 0, q[1], 8); });
var tl = hgwEll(g, hgwLam(0xE8E4DA), 0.08, 0.5, 0.1, 0, 1.0, 1.42, 8);
tl.rotation.x = -0.4;
hgwEll(g, sk, 0.36, 0.42, 0.3, 0, 1.85, -0.45, 12);
hgwEll(g, sk, 0.3, 0.36, 0.26, 0, 2.25, -0.5, 12);
[-1, 1].forEach(function (sd) { var a = hgwEll(g, sk, 0.11, 0.36, 0.11, sd * 0.42, 2.18, -0.5, 8); a.rotation.z = sd * 0.25; var f = hgwEll(g, sk, 0.09, 0.3, 0.09, sd * 0.48, 1.75, -0.66, 8); f.rotation.x = -0.6; });
hgwEll(g, sk, 0.17, 0.21, 0.19, 0, 2.78, -0.52, 12);
hgwEll(g, hgwLam(0xF0ECE4), 0.21, 0.2, 0.2, 0, 2.86, -0.46, 10);
var bd = hgwEll(g, hgwLam(0xF0ECE4), 0.15, 0.3, 0.1, 0, 2.5, -0.66, 10);
hgwEll(g, hgwLam(0xF0ECE4), 0.26, 0.42, 0.14, 0, 2.45, -0.36, 10);
hgwEye(g, 0.065, 2.81, -0.69, 0.025, 0x3A4A5A);
hgwEye(g, -0.065, 2.81, -0.69, 0.025, 0x3A4A5A);
if (o.harp !== false) {
var gold = hgwShine(0xE8C040, 0.3, 0.9), hp = new THREE.Group();
hp.position.set(0.3, 1.85, -0.82);
hp.rotation.set(0.2, 0.3, 0.2);
g.add(hp);
hgwBox(hp, 0.04, 0.5, 0.04, gold, -0.16, 0, 0);
hgwBox(hp, 0.04, 0.5, 0.04, gold, 0.16, 0, 0);
hgwBox(hp, 0.4, 0.05, 0.05, gold, 0, 0.5, 0);
hgwEll(hp, gold, 0.2, 0.08, 0.06, 0, 0.02, 0, 8);
}
g.scale.setScalar(o.s || 1.1);
return g;
},
function (P, x, y, z, ry, dead) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var br = hgwShine(dead ? 0x6A4A2A : 0xC8903A, 0.25, 0.95);
var m = hgwDressed("talus", "warrior", { sex: "m", beard: "short" });
m.traverse(function (o) { if (o.isMesh || o.isSkinnedMesh)
o.material = br; });
m.scale.setScalar(9);
g.add(m);
if (dead) {
m.rotation.x = -Math.PI / 2;
m.position.y = 1.2;
}
hgwRound(x, z, dead ? 3 : 5, y - 1, y + (dead ? 6 : 16));
return g;
},
function (P, x, y, z, ry, seed) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var b = hgwDressed("harpy" + seed, "nymph", { sex: "f", hair: 0x2A1A12 });
b.scale.setScalar(0.85);
b.rotation.x = 0.9;
b.position.y = -0.6;
g.add(b);
var wing = hgwLam(0x5A4430, { ds: 1 });
[-1, 1].forEach(function (sd) {
var w = new THREE.Mesh(hgwGeo("gwing", function () { var sh = new THREE.Shape(); sh.moveTo(0, 0); sh.quadraticCurveTo(2.2, 1.6, 4.6, 0.8); sh.lineTo(4.0, 0.2); sh.lineTo(4.4, -0.4); sh.lineTo(3.4, -0.6); sh.lineTo(3.6, -1.2); sh.lineTo(2.2, -0.9); sh.quadraticCurveTo(1.0, -0.8, 0, 0); return new THREE.ShapeGeometry(sh, 8); }), wing);
w.scale.set(sd * 0.55, 0.55, 0.55);
w.position.set(sd * 0.2, 0.6, 0);
w.rotation.set(-0.3, 0, sd * 0.3);
g.add(w);
g.userData["w" + sd] = w;
});
var cl = hgwLam(0x3A3020);
[-1, 1].forEach(function (sd) { hgwEll(g, cl, 0.06, 0.2, 0.06, sd * 0.15, -1.2, 0.6, 6); });
return g;
},
function (P, x, y, z, ry, fire) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var b = hgwPlainBeast(g, 0, 0, 0, 0, { kind: "cow", col: 0x8A6A3A });
b.scale.setScalar(1.5);
var br = hgwShine(0xB8803A, 0.3, 0.9);
b.traverse(function (o) { if (o.isMesh)
o.material = br; });
[-1, 1].forEach(function (sd) { var h = hgwCyl(g, 0.07, 0.03, 0.7, br, sd * 0.32, 2.25, -1.35, 6); h.rotation.z = sd * 1.0; });
if (fire) {
var f = hgwGlowM(0xFF8A30, 0.5);
[-1, 1].forEach(function (sd) { var c = new THREE.Mesh(hgwGeo("bullfire", function () { var c = new THREE.ConeGeometry(0.3, 2.4, 8, 1, true); c.rotateX(-Math.PI / 2); c.translate(0, 0, -1.2); return c; }), f); c.position.set(sd * 0.1, 1.35, -1.95); g.add(c); });
hgwSmoke(g, 0, 1.8, -2.6, 0x8A8070, 6);
}
return g;
},
function (P, x, y, z, asleep) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var sk = hgwS("b:grovesnake", 0x3A4A2A, 0.8), sp = hgwLam(0xC8A040);
for (var k = 0; k < 4; k++) {
var t = new THREE.Mesh(hgwGeo("gsnake" + k, function () { return new THREE.TorusGeometry(3.2 + k * 0.9, 0.7 - k * 0.08, 9, 34); }), sk);
t.rotation.x = Math.PI / 2;
t.position.y = 0.5 + k * 0.9;
g.add(t);
}
var R = wRand(55);
for (var s = 0; s < (hgwLite() ? 12 : 30); s++) {
var a = R() * 6.28, r = 3.2 + Math.floor(R() * 4) * 0.9;
hgwEll(g, sp, 0.22, 0.1, 0.22, Math.cos(a) * r, 0.9 + Math.floor(R() * 4) * 0.9, Math.sin(a) * r, 6);
}
var nk = new THREE.Mesh(hgwGeo("gsnaken" + (asleep ? 1 : 0), function () { return asleep ? hgwTaper([[4.6, 0.6, 0], [6.4, 0.4, 1.4], [8.2, 0.3, 1.2]], [0.65, 0.55, 0.45], 8, 8) : hgwTaper([[4.6, 3.4, 0], [5.4, 5.6, 0.8], [6.0, 7.4, 2.2]], [0.65, 0.55, 0.45], 8, 8); }), sk);
g.add(nk);
var hp = asleep ? [8.8, 0.5, 1.0] : [6.3, 7.8, 3.0], hd = hgwEll(g, sk, 0.7, 0.5, 1.2, hp[0], hp[1], hp[2], 10);
hd.rotation.y = -0.8;
if (!asleep) {
hgwEye(g, hp[0] + 0.4, hp[1] + 0.3, hp[2] + 0.8, 0.12, 0xE8D040);
hgwEye(g, hp[0] - 0.2, hp[1] + 0.3, hp[2] + 1.0, 0.12, 0xE8D040);
}
hgwRound(x, z, 8, y - 1, y + 5);
return g;
},
function (G) {
var X = HGW_ROOMXZ.iolcos, R;
hgwHallRoom(G, "pelhall", X.pelhall, { name: "the hall of Pelias in Iolcos", rich: true });
R = hgwRoom(G, "chcave", X.chcave[0], X.chcave[1], 16, 14, { wall: "cave", floor: "beaten", ceil: "cave", h: 6, name: "Cheiron's cave on Pelion", lightI: 0.65, lightCol: 0xFFD8A8, bare: 1 });
hgwHearth(R.g, 0, 1.0, 0, { h: R.h, mat: "lime" });
for (var s = 0; s < 6; s++) {
hgwRug(R.g, -4.6 + s * 1.8, -4.8, 1.6, 1.2, [0x3A2A1A, 0x5A4A3A, 0x2A2018][s % 3]);
}
var lf = hgwLam(0x4A6A2A);
for (var b = 0; b < 8; b++)
hgwEll(R.g, lf, 0.8, 0.15, 0.5, -6.2 + b * 0.4, 0.15, -5.4 + (b % 2) * 0.4, 6);
for (var w = 0; w < 5; w++) {
var sp = hgwCyl(R.g, 0.03, 0.03, 2.4, hgwMat("oak"), 5.6, 0, -3 + w * 0.6, 5);
sp.rotation.z = 0.18;
}
hgwShelves(R.g, -7.6, 1.6, 3.2, 2.0, Math.PI / 2, {});
for (var j = 0; j < 4; j++)
hgwPithos(R.g, 6.4, 0, 1.6 + j * 1.0, 0.5);
R = hgwRoom(G, "ilhouse", X.ilhouse[0], X.ilhouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a house in Iolcos", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwLoom(R.g, -3, -2.6, 0.4);
hgwTable(R.g, 1.6, 0.6, 1.6, 0.8, 0.74, {});
R = hgwRoom(G, "heratmp", X.heratmp[0], X.heratmp[1], 12, 16, { wall: "ashlar", floor: "gkfloor", h: 6, name: "Hera's temple in Iolcos", lightI: 0.55, lightCol: 0xFFE0B0, bare: 1, beams: true });
hgwBox(R.g, 2.4, 1.0, 2.0, hgwMat("lime"), 0, 0, -6.4);
var im = hgwDressed("heraIl", "queen", { sex: "f" });
im.position.set(0, 1.0, -6.2);
im.scale.set(1.4, 1.4, 1.4);
R.g.add(im);
hgwAltar(R.g, 0, 1.6, function () { return 0; }, {});
},
function (G) {
var H = HGW_IL_H, I = HGW_IL, lite = hgwLite(), st = HGW.st, R = wRand(401);
hgwIlRooms(G);
hgwSea(G, 0);
var base = hgwGreekColour(H, { dry: 0.3 });
hgwLandMesh(G, H, { dry: 0.3, cfn: function (x, z, y, c) { base(x, z, y, c); if (y > 40 && y <= 300 && H.sd(x, z) > 60) {
var m = Math.min(1, (y - 40) / 60) * 0.65, g2 = 0.85 + hgwFbm(x * 0.02, z * 0.02, 2) * 0.3;
c.setRGB(c.r + (0.30 * g2 - c.r) * m, c.g + (0.44 * g2 - c.g) * m, c.b + (0.20 * g2 - c.b) * m);
} if (y > 300) {
var k = Math.min(1, (y - 300) / 70), g = 0.9 + hgwFbm(x * 0.03, z * 0.03, 2) * 0.1;
c.setRGB(c.r + (0.92 * g - c.r) * k, c.g + (0.94 * g - c.g) * k, c.b + (0.98 * g - c.b) * k);
} } });
hgwRoads(G, HGW_IL_ROADS, H, { w: { town: 5, ford: 4, pelion: 3, inland: 5 } });
hgwStrip(G, I.anauros, 18, H, hgwMat("gravel"), 0.3);
var wm = hgwStrip(G, I.anauros, 9, function (x, z) { return H(x, z) + (st.flood ? 1.6 : 0.9); }, hgwWaterM(st.flood ? 0x7A6A4A : 0x6A8A88, 0.9), 0.01);
HGW.water.push(wm);
var bl = [];
for (var s = 0; s < (lite ? 30 : 80); s++) {
var L = hgwPathLen(I.anauros), q = hgwPathAt(I.anauros, R() * L);
bl.push({ x: q.x + (R() - 0.5) * 14, z: q.z + (R() - 0.5) * 14, y: H(q.x, q.z), s: 0.6 + R() * 1.2 });
}
hgwPlant(G, "rock", bl, { col: 0x7A7468 });
hgwSpot(I.ford[0], I.ford[1], 8, "Anauros", "listen to the torrent", function () { hgbSay && hgbSay("🌊 The boulders rumble underneath like the tramp of horsemen, grinding along the narrow channel."); });
var C = I.cave, cy = H(C[0], C[1]), rock = hgwMat("darkrock");
for (var cf = 0; cf < 11; cf++) {
var fx = C[0] - 60 + cf * 12, fz = C[1] - 34 - (cf % 2) * 5 + Math.abs(cf - 5) * 3, ry = 30 + ((cf * 7) % 4) * 5, by0 = Math.min(cy, H(fx, fz));
var e = hgwEll(G, rock, 9 + (cf % 3) * 2, ry, 10, fx, by0 + ry * 0.5, fz, 12);
e.rotation.z = ((cf % 3) - 1) * 0.06;
}
var brow = hgwEll(G, rock, 70, 8, 18, C[0], cy + 38, C[1] - 38, 16);
var sn = hgwMat("snowwall");
for (var w = 0; w < 11; w++)
hgwEll(G, sn, 7 - w % 3, 2.2, 6, C[0] - 54 + w * 11, cy + 45 + (w % 3) * 1.5, C[1] - 38 + (w % 2) * 3, 8);
var mo = hgwEll(G, hgwLam(0x0C0A08), 5.4, 6.0, 4.0, C[0], cy, C[1] - 22, 14);
var cr = hgwRm("chcave");
if (cr)
hgwDoor(cr, "The mouth of the cave", C[0], C[1] - 14, Math.PI);
var fl = [];
for (var f = 0; f < (lite ? 20 : 50); f++) {
var a = R() * Math.PI - Math.PI, d = 8 + R() * 16;
fl.push({ x: C[0] + Math.cos(a) * d, z: C[1] + 6 + Math.abs(Math.sin(a)) * d, y: cy, s: 0.8 + R() * 0.4 });
}
hgwPlant(G, "flowers", fl, {});
var fall = hgwStrip(G, [[C[0] + 18, C[1] - 24], [C[0] + 20, C[1] + 10], [C[0] + 30, C[1] + 60]], 2.4, function (x, z) { return H(x, z) + 0.2; }, hgwWaterM(0xA8C8D0, 0.85), 0);
HGW.water.push(fall);
var pn = [], ok = [];
for (var p = 0; p < (lite ? 400 : 1100); p++) {
var px = 150 + R() * 1400, pz = -1500 + R() * 1300, sd = H.sd(px, pz), y = H(px, pz);
if (sd < 20 || y > 330 || Math.hypot(px - C[0], pz - C[1]) < 55 || hgwPathD(px, pz, HGW_IL_ROADS.pelion) < 8 || hgwPathD(px, pz, I.anauros) < 14 || hgwFbm(px * 0.01, pz * 0.01, 2) < 0.38)
continue;
(y > 110 ? pn : ok).push({ x: px, y: y, z: pz, s: 0.9 + R() * 0.7 });
}
hgwConifer(G, pn, {});
hgwPlant(G, "tree", ok, { col: 0x3A5A26 });
var ar = [];
for (var a = 0; a < (lite ? 40 : 120); a++) {
var ax = C[0] - 120 + R() * 240, az = C[1] + 40 + R() * 240;
if (hgwPathD(ax, az, HGW_IL_ROADS.pelion) < 5)
continue;
ar.push({ x: ax, z: az, y: H(ax, az), s: 0.8 + R() * 0.6 });
}
hgwPlant(G, "bush", ar, { col: 0x4A6A2A });
var gl = [];
for (var t = 0; t < (lite ? 30 : 90); t++) {
var a3 = R() * 6.28, d3 = 60 + R() * 140, tx = C[0] + Math.cos(a3) * d3, tz = C[1] + Math.sin(a3) * d3;
if (hgwPathD(tx, tz, HGW_IL_ROADS.pelion) < 6 || hgwPathD(tx, tz, I.anauros) < 12)
continue;
gl.push({ x: tx, z: tz, y: H(tx, tz), s: 0.9 + R() * 0.5 });
}
hgwConifer(G, gl, {});
var gr = [];
for (var t2 = 0; t2 < (lite ? 60 : 180); t2++) {
var a4 = R() * 6.28, d4 = 10 + R() * 70;
var gz = C[1] + 30 + Math.sin(a4) * d4 * 0.8;
if (gz > C[1] - 6)
gr.push({ x: C[0] + Math.cos(a4) * d4, z: gz, y: 0, s: 1 });
}
gr.forEach(function (q) { q.y = H(q.x, q.z); });
hgwPlant(G, "grass", gr, { col: 0x6A8A3A });
var T = I.town;
hgwKingsHouse(G, H, { at: I.palace, ry: Math.PI, hall: "pelhall", cw: 40, cd: 30, wall: "limewall" });
hgwTemple(G, I.temple[0], I.temple[1] - 10, 12, 18, { ry: 0, statue: "queen" });
var ht = hgwRm("heratmp");
if (ht)
hgwDoor(ht, "The doors of Hera's temple", I.temple[0], I.temple[1] + 2, Math.PI);
hgwAltar(G, I.temple[0], I.temple[1] + 8, H, {});
hgwTownPack(G, H, { c: T, rx: 100, rz: 60, n: 54, seed: 402, roads: [HGW_IL_ROADS.town, HGW_IL_ROADS.ford], r2: 0.3, tile: 0.3, door: { key: "ilhouse", name: "The door of a house in Iolcos" }, life: true, avoid: [[I.palace[0], I.palace[1], 30], [I.temple[0], I.temple[1] - 10, 16]] });
hgwFleet(G, H, -120, 210, Math.PI, lite ? 2 : 3, 10);
for (var b = 0; b < (lite ? 3 : 6); b++) {
var bx = -220 + b * 14, bz = 146 + (b % 2) * 3;
hgwBoat(G, bx, H(bx, bz) + 0.1, bz, Math.PI * 0.9 + b * 0.2, {});
}
hgwHarbourSpots("iolcos", -140, 136);
var vin = [];
for (var vr = 0; vr < 8; vr++)
for (var vc = 0; vc < 20; vc++) {
var vx = 180 + vc * 2.8, vz = -200 + vr * 3.2;
vin.push({ x: vx, z: vz, y: H(vx, vz) });
}
hgwPlant(G, "vine", vin, { keepAll: true });
hgwHerd(G, "horse", -700, -300, 110, lite ? 6 : 14, H, 403);
hgwHerd(G, "sheep", 300, -500, 90, lite ? 6 : 14, H, 404);
hgwHerd(G, "goat", 900, -600, 90, lite ? 4 : 10, H, 405);
hgwGreekTrees(G, H, { clear: [[T[0], T[1], 120], [I.beach[0], I.beach[1], 60], [C[0], C[1], 40], [I.ford[0], I.ford[1], 20]], roads: hgwRoadList(HGW_IL_ROADS), olive: 2.6, oak: 0.8, pine: 0.6 });
var B = I.beach, by = H(B[0], B[1]);
if (st.argo === "build") {
var hull = hgwArgo(G, B[0] + 6, by + 1.0, B[1], 0, { oars: false });
hull.userData.keep = 1;
for (var t = 0; t < 8; t++)
hgwBox(G, 0.4, 1.0, 0.4, hgwMat("oak"), B[0] + 4 + (t % 2) * 4, by, B[1] - 10 + Math.floor(t / 2) * 6);
for (var l = 0; l < 10; l++) {
var lx = B[0] - 16, lz = B[1] - 14 + l * 1.1;
var c = hgwCyl(G, 0.35, 0.4, 9, hgwMat("darkbark"), lx, H(lx, lz) + 0.38 + (l % 2) * 0.6, lz, 8);
c.rotation.z = Math.PI / 2;
}
hgwFire(G, B[0] - 8, by, B[1] + 18, 1.0);
hgwPithos(G, B[0] - 6, by, B[1] + 20, 0.8);
}
else if (st.argo === "launch") {
hgwArgo(G, B[0] + 10, by + 0.6, B[1], -Math.PI / 2, { oars: false });
for (var rl = 0; rl < 6; rl++) {
var r2 = hgwCyl(G, 0.3, 0.3, 5, hgwMat("darkbark"), B[0] + 18 + rl * 4, by + 0.3, B[1], 8);
r2.rotation.x = Math.PI / 2;
}
}
else if (st.argo === "afloat") {
hgwArgo(G, B[0] + 40, 0.2, B[1], -Math.PI / 2, { afloat: true, sail: false });
}
else if (st.argo === "home") {
hgwArgo(G, B[0] + 12, by + 0.4, B[1] + 4, -Math.PI / 2 * 1.1, { oars: false, fleece: true });
}
hgwCrowd("ilTown", [["A woman at the fountain", "f", "gkwoman", "Pelias? We say his name softly in Iolcos.", "greek"], ["An elder in a long cloak", "m", "gkold", "There is an oracle about a man with one sandal. Mark it.", "greek"],
["A horse-breeder of the Lapithai", "m", "herd", "Thessaly breeds the best horses in Hellas. Ask anyone.", "greek"], ["A fisherman with a basket", "m", "sailor", "The bay is calm as a pond. Out past Aphetai, that's another matter.", "greek"],
["A girl with a goose", "f", "gkwoman", "My goose bites everyone but me.", "greek", true], ["A potter", "m", "gkman", "Minuan ware! Grey as a dove, and rings like a bell.", "greek"], ["A spearman of Pelias", "m", "warrior", "Move on. The king does not care for crowds at his gate.", "greek"]], T[0] - 60, T[1] - 30, T[0] + 60, T[1] + 30, { wander: 6, persona: "greek" });
hgwCrowd("ilBeach", [["A shipwright's boy", "m", "herd", "Argus says she'll take fifty oars. Fifty! No ship ever had more than twenty.", "greek", true], ["A woman with bread", "f", "gkwoman", "Food for the heroes. They eat like wolves.", "greek"]], B[0] - 20, B[1] - 20, B[0], B[1] + 20, { wander: 4, persona: "greek" });
},
function (G) {
var X = HGW_ROOMXZ.cyzicus, R;
hgwHallRoom(G, "czhall", X.czhall, { name: "the hall of Cyzicus, king of the Doliones", rich: true, queen: true });
R = hgwRoom(G, "czhouse", X.czhouse[0], X.czhouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a house of the Doliones", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwTable(R.g, 1.6, 0.6, 1.6, 0.8, 0.74, {});
},
function (G) {
var H = HGW_CZ_H, I = HGW_CZ, lite = hgwLite(), st = HGW.st, R = wRand(411);
hgwCzRooms(G);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.35 });
hgwRoads(G, HGW_CZ_ROADS, H, { w: { beach: 5, mount: 3, south: 4 } });
var T = I.town;
hgwKingsHouse(G, H, { at: I.palace, ry: Math.PI / 2, hall: "czhall", cw: 34, cd: 26 });
hgwTownPack(G, H, { c: T, rx: 70, rz: 50, n: 36, seed: 412, roads: [HGW_CZ_ROADS.beach, HGW_CZ_ROADS.south], r2: 0.3, tile: 0.4, door: { key: "czhouse", name: "The door of a house of the Doliones" }, life: true, avoid: [[I.palace[0], I.palace[1], 26]] });
hgwTemple(G, T[0] - 40, T[1] - 30, 10, 16, { ry: 0.3, statue: "queen" });
var pn = [];
for (var p = 0; p < (lite ? 120 : 300); p++) {
var px = -500 + R() * 1200, pz = -1300 + R() * 1050;
if (H.sd(px, pz) < 15 || hgwPathD(px, pz, HGW_CZ_ROADS.mount) < 8)
continue;
pn.push({ x: px, y: H(px, pz), z: pz, s: 0.9 + R() * 0.5 });
}
hgwConifer(G, pn, {});
hgwBeasts(G, "bear", 200, -900, 160, lite ? 2 : 4, H, 413, 1.0);
var B = I.beach;
if (st.argo)
hgwArgo(G, B[0] + 4, 0.2, B[1] + 26, Math.PI / 2, { afloat: true });
if (st.mound) {
var M = I.mound, my = H(M[0], M[1]);
hgwEll(G, hgwLam(0x56703A), 9, 3.6, 9, M[0] - 14, my - 0.6, M[1] - 14, 14);
hgwAltar(G, M[0] - 4, M[1] - 4, H, {});
}
var F = I.fountain, fy = H(F[0], F[1]);
hgwCyl(G, 2.2, 2.4, 0.7, hgwMat("lime"), F[0], fy, F[1], 16);
var fw = hgwCyl(G, 1.9, 1.9, 0.05, hgwWaterM(0x7AA8B8, 0.9), F[0], fy + 0.62, F[1], 16);
HGW.water.push(fw);
hgwSpot(F[0], F[1], 4, "Cleite's fountain", "drink", function () { hgbSay && hgbSay("💧 Clear, cold water, which flows the whole year round."); });
var L = I.lake, ly = H(L[0], L[1]);
var lw = hgwWater(G, L[0], L[1], 60, 40, ly + 0.2, 0x4A7A7A, 0.88);
var rd = [];
for (var w = 0; w < (lite ? 30 : 70); w++) {
var a = R() * 6.28;
rd.push({ x: L[0] + Math.cos(a) * (30 + R() * 6), z: L[1] + Math.sin(a) * (20 + R() * 5), y: ly, s: 0.8 + R() * 0.5 });
}
hgwPlant(G, "reeds", rd, {});
hgwHerd(G, "sheep", 400, 500, 100, lite ? 6 : 14, H, 414);
hgwHerd(G, "cow", -300, 700, 90, lite ? 4 : 10, H, 415);
hgwGreekTrees(G, H, { clear: [[T[0], T[1], 90], [B[0], B[1], 40], [L[0], L[1], 50]], roads: hgwRoadList(HGW_CZ_ROADS), olive: 1.6, oak: 1.4, pine: 0.6 });
hgwCrowd("czTown", [["A Dolion fisherman", "m", "sailor", "Our king is a scholar of Cheiron's, like your captain. He'll feast you well.", "greek"], ["A Dolion woman", "f", "gkwoman", "Corn and wine for the heroes, cloaks and rugs, and shirts!", "greek"],
["An old Dolion", "m", "gkold", "Keep off the Bear Mountain at night. There are men up there with more arms than a man should have.", "greek"], ["A boy with a dog", "m", "herd", "My father says the ship has fifty oars.", "greek", true], ["A priestess of Rhea", "f", "gkveiled", "The Mother of the Gods is worshipped on the mountain.", "greek"]], T[0] - 50, T[1] - 30, T[0] + 50, T[1] + 30, { wander: 6, persona: "greek" });
},
function (G) {
var X = HGW_ROOMXZ.bosporus, R;
R = hgwHallRoom(G, "phhall", X.phhall, { name: "the hall of Phineus", rich: true });
if (R && HGW.st.harpies === "feast") {
hgwTable(R.g, 0, 3, 6, 1.4, 0.8, {});
for (var d = 0; d < 6; d++)
hgwPithos(R.g, -2.5 + d, 0.8, 3, 0.25);
}
R = hgwRoom(G, "bshouse", X.bshouse[0], X.bshouse[1], 9, 7, { wall: "mudbrick", floor: "beaten", h: 3.0, name: "a cold house in Phineus' city", lightI: 0.5, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
},
function (G) {
var H = HGW_BS_H, I = HGW_BS, lite = hgwLite(), st = HGW.st, R = wRand(421);
hgwBsRooms(G);
hgwSea(G, 0);
hgwLandMesh(G, H, { mat: "snow", cfn: hgwNcColour(H) });
hgwRoads(G, HGW_BS_ROADS, H, { w: { up: 4, north: 3 } });
var T = I.town;
hgwKingsHouse(G, H, { at: I.palace, ry: Math.PI * 0.5, hall: "phhall", cw: 34, cd: 26, wall: "limewall" });
hgwTownPack(G, H, { c: T, rx: 70, rz: 50, n: 34, seed: 422, roads: [HGW_BS_ROADS.up, HGW_BS_ROADS.north], r2: 0.3, tile: 0.2, door: { key: "bshouse", name: "The door of a house in Phineus' city" }, life: true, avoid: [[I.palace[0], I.palace[1], 26]] });
var pn = [];
for (var p = 0; p < (lite ? 180 : 460); p++) {
var px = -1400 + R() * 2800, pz = -1300 + R() * 2600;
if (H.sd(px, pz) < 10 || Math.hypot(px - T[0], pz - T[1]) < 100 || hgwPathD(px, pz, HGW_BS_ROADS.up) < 8 || hgwPathD(px, pz, HGW_BS_ROADS.north) < 8)
continue;
pn.push({ x: px, y: H(px, pz), z: pz, s: 0.9 + R() * 0.6 });
}
hgwConifer(G, pn, { snow: true });
if (st.storm)
hgwSnowfall(G, lite ? 300 : 700, 1.6);
else
hgwSnowfall(G, lite ? 120 : 300, 0.8);
if (st.harpies && st.harpies !== "gone") {
var hp = [hgwHarpy(G, T[0], H(T[0], T[1]) + 26, T[1], 0, 1), hgwHarpy(G, T[0], H(T[0], T[1]) + 30, T[1], 0, 2)];
var t0 = 0;
HGW.ticks.push(function (dt) { t0 += dt; hp.forEach(function (h, i) { var a = t0 * 0.5 + i * Math.PI; h.position.x = I.palace[0] + Math.cos(a) * 40; h.position.z = I.palace[1] + Math.sin(a) * 30; h.rotation.y = -a; var f = Math.sin(t0 * 6 + i) * 0.4; if (h.userData.w1)
h.userData.w1.rotation.z = 0.3 + f; if (h.userData["w-1"])
h.userData["w-1"].rotation.z = -0.3 - f; }); });
}
var Lg = I.landing;
if (st.argo)
hgwArgo(G, Lg[0] + 28, 0.2, Lg[1] + 30, -0.5, { afloat: true });
var ice = hgwMat("blueice"), rk = [];
I.rocks.forEach(function (q, i) { var g = new THREE.Group(); g.position.set(q[0], 0, q[1]); G.add(g); hgwPeak(g, 0, 0, 60, 120, { k: 70 + i, mat: ice, y: -20, noCap: 1 }); for (var s = 0; s < 5; s++)
hgwPeak(g, (s - 2) * 22, (s % 2) * 16 - 8, 14, 90 + s * 16, { k: 80 + s + i * 5, mat: hgwMat("glass"), y: -10, noCap: 1 }); rk.push(g); });
var t1 = 0, gap = function (t) { return 0.5 + 0.5 * Math.cos(t * 0.35); };
HGW.ticks.push(function (dt) { t1 += dt; var k = gap(t1); rk[0].position.x = I.rocks[0][0] + (1 - k) * 40; rk[1].position.x = I.rocks[1][0] - (1 - k) * 40; rk.forEach(function (g, i) { g.rotation.z = Math.sin(t1 * 0.4 + i) * 0.03; g.position.y = Math.sin(t1 * 0.5 + i * 2) * 1.4; }); });
hgwSpot(I.watch[0], I.watch[1], 10, "The Blue Rocks", "watch the rocks", function () { hgbSay && hgbSay("🧊 An ice-cold wind blows from them. They heave on the long swell, and grind, and the spray goes up in sheets."); });
hgwCrowd("bsTown", [["A starving man of Phineus' city", "m", "gkman", "Food? We have food enough. We cannot keep it on the table.", "greek"], ["A woman wrapped in a fleece", "f", "gkveiled", "The land of bitter blasts, they call it. They are right.", "greek"],
["An old woodcutter", "m", "gkold", "Something shrieks over the roofs at every meal.", "greek"], ["A thin boy", "m", "herd", "I saw them. Faces like maidens, claws like hawks.", "greek", true]], T[0] - 50, T[1] - 30, T[0] + 50, T[1] + 30, { wander: 5, persona: "greek" });
},
function (G) {
var X = HGW_ROOMXZ.colchis, R;
hgwHallRoom(G, "aiehall", X.aiehall, { name: "the hall of Aietes, the child of the Sun", rich: true, queen: true });
R = hgwRoom(G, "chhouse", X.chhouse[0], X.chhouse[1], 9, 7, { wall: "mudbrick", floor: "beaten", h: 3.0, name: "a Colchian house", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwLoom(R.g, -3, -2.6, 0.4, 0x8A2A3A);
},
function (G) {
var H = HGW_CH_H, I = HGW_CH, lite = hgwLite(), st = HGW.st, R = wRand(431);
hgwChRooms(G);
hgwSea(G, 0);
var base = hgwGreekColour(H, { dry: 0.15 });
hgwLandMesh(G, H, { dry: 0.15, cfn: function (x, z, y, c) { base(x, z, y, c); if (y > 160) {
var k = Math.min(1, (y - 160) / 80), g = 0.9 + hgwFbm(x * 0.03, z * 0.03, 2) * 0.1;
c.setRGB(c.r + (0.93 * g - c.r) * k, c.g + (0.95 * g - c.g) * k, c.b + (0.99 * g - c.b) * k);
} } });
hgwRoads(G, HGW_CH_ROADS, H, { w: { city: 6, field: 5, grove: 3 } });
var rd = [];
for (var w = 0; w < (lite ? 120 : 320); w++) {
var L = hgwPathLen(I.phasis), q = hgwPathAt(I.phasis, R() * L), sd = R() < 0.5 ? 1 : -1;
var rx = q.x + (R() - 0.5) * 20, rz = q.z + sd * (26 + R() * 14);
if (H(rx, rz) > -0.2)
rd.push({ x: rx, z: rz, y: H(rx, rz), s: 0.9 + R() * 0.6 });
}
hgwPlant(G, "reeds", rd, {});
var C = I.city, wall = hgwRing(C[0], C[1], 120, 90, 30);
hgwBigWall(G, wall, 9, H, { mat: "ashlar", th: 3, tower: true, gate: [[C[0] - 110, C[1] + 36, 9], [C[0] - 40, C[1] - 88, 7]] });
hgwKingsHouse(G, H, { at: I.palace, ry: -Math.PI / 2, hall: "aiehall", cw: 46, cd: 34, wall: "ashlar" });
var gold = hgwMat("gold"), py = H(I.palace[0], I.palace[1]);
for (var gr = 0; gr < 4; gr++)
hgwBox(G, 12, 0.5, 30, gold, I.palace[0] + 6 + gr * 2.4, py + 9.4 + gr * 0.6, I.palace[1], 0);
hgwTownPack(G, H, { c: C, rx: 100, rz: 70, n: 60, seed: 432, roads: [HGW_CH_ROADS.city, HGW_CH_ROADS.field], r2: 0.4, tile: 0.5, door: { key: "chhouse", name: "The door of a Colchian house" }, life: true, avoid: [[I.palace[0], I.palace[1], 34]] });
hgwTemple(G, C[0] - 40, C[1] - 30, 12, 18, { ry: 0.2, statue: "warrior" });
var F = I.field, fy = H(F[0], F[1]);
hgwAwning(G, F[0], fy + 3.6, F[1] - 60, 12, 6, 0, [0xC8A040, 0x7A2A3A]);
hgwThrone(G, F[0], F[1] - 60, 0, { mat: "oak", trim: "gold" }).position.y = fy;
if (st.field === "ploughed" || st.field === "sown") {
hgwBox(G, 124, 0.3, 64, hgwLam(0x5E4630), F[0], fy - 0.12, F[1], 0);
var ridge = hgwLam(0x6E5238);
for (var fr = 0; fr < 16; fr++) {
var rg = hgwCyl(G, 0.5, 0.5, 120, ridge, F[0], fy + 0.12, F[1] - 30 + fr * 4, 6);
rg.rotation.z = Math.PI / 2;
rg.position.set(F[0], fy + 0.12, F[1] - 30 + fr * 4);
rg.scale.set(1, 1, 0.6);
}
}
if (st.field === "sown") {
var hm = hgwMat("bronze");
for (var sm = 0; sm < (lite ? 20 : 60); sm++) {
var sx = F[0] - 56 + R() * 112, sz = F[1] - 28 + Math.floor(R() * 12) * 5;
hgwEll(G, hm, 0.22, 0.24, 0.22, sx, fy + 0.1, sz, 8);
hgwCyl(G, 0.03, 0.03, 1.4, hm, sx + 0.3, fy, sz, 5);
}
}
if (st.bulls) {
hgwBrassBull(G, F[0] - 6, fy, F[1] + 10, st.bulls === "yoked" ? Math.PI / 2 : Math.PI * 0.9, st.bulls === "fire");
hgwBrassBull(G, F[0] + 6, fy, F[1] + 8, st.bulls === "yoked" ? Math.PI / 2 : -Math.PI * 0.9, st.bulls === "fire");
if (st.bulls === "yoked")
hgwBox(G, 0.3, 0.3, 14, hgwMat("oak"), F[0], fy + 2.2, F[1] + 9, Math.PI / 2);
}
var stand = [];
for (var c = 0; c < (lite ? 20 : 50); c++) {
var side = c % 2 ? 1 : -1;
stand.push(["A Colchian at the field", R() < 0.4 ? "f" : "m", R() < 0.6 ? "colchian" : "gkman", "The child of the Sun keeps his promises. He keeps them to the letter.", "greek"]);
}
if (st.crowd)
hgwCrowd("chField", stand, F[0] - 70, F[1] + 36, F[0] + 70, F[1] + 44, { wander: 1, persona: "greek" });
var Gv = I.grove, gw = hgwRing(Gv[0], Gv[1], 90, 80, 30);
hgwBigWall(G, gw, 9, H, { mat: "ashlar", th: 3, tower: true, gate: [[Gv[0] - 40, Gv[1] - 72, 6]] });
var gt = H(Gv[0] - 40, Gv[1] - 72);
hgwBox(G, 8, 1, 1.4, gold, Gv[0] - 40, gt + 9, Gv[1] - 72, 0.5);
var bc = [];
for (var t = 0; t < (lite ? 50 : 130); t++) {
var a = R() * 6.28, d = R() * 78, x = Gv[0] + Math.cos(a) * d, z = Gv[1] + Math.sin(a) * d * 0.9;
if (Math.hypot(x - I.oak[0], z - I.oak[1]) < 30)
continue;
bc.push({ x: x, z: z, y: H(x, z), s: 1.4 + R() * 0.6 });
}
hgwPlant(G, "tree", bc, { col: 0x1E3A1E });
var O = I.oak, oy = H(O[0], O[1]);
hgwCyl(G, 1.8, 2.6, 14, hgwMat("darkbark"), O[0], oy, O[1], 12);
var lf = hgwLam(0x1E3A1E);
for (var cl = 0; cl < 8; cl++) {
var a2 = cl / 8 * 6.28;
hgwEll(G, lf, 7, 4.4, 7, O[0] + Math.cos(a2) * 7, oy + 16 + (cl % 2) * 2, O[1] + Math.sin(a2) * 7, 10);
}
hgwEll(G, lf, 9, 5, 9, O[0], oy + 21, O[1], 10);
if (st.fleece !== "taken") {
hgwFleece(G, O[0], oy + 5.4, O[1] - 2.7, 0, 1.7);
var gl = new THREE.PointLight(0xFFD060, 1.6, 40);
gl.position.set(O[0], oy + 5, O[1] - 6);
G.add(gl);
var hal = hgwEll(G, hgwGlowM(0xFFD870, 0.12), 3.2, 4, 1, O[0], oy + 5.4, O[1] - 3.2, 12);
}
if (st.serpent)
hgwGroveSerpent(G, O[0], oy, O[1], st.serpent === "asleep");
if (st.argo === "river")
hgwArgo(G, -300, 0.2, 10, Math.PI / 2, { afloat: true });
else if (st.argo === "moored")
hgwArgo(G, I.reeds[0], 0.2, 38, Math.PI / 2, { afloat: true });
var fo = [];
for (var p = 0; p < (lite ? 120 : 300); p++) {
var px = -200 + R() * 1700, pz = -1400 + R() * 2800;
if (H.sd(px, pz) < 20 || hgwPathD(px, pz, I.phasis) < 50 || Math.hypot(px - C[0], pz - C[1]) < 150 || Math.hypot(px - Gv[0], pz - Gv[1]) < 110 || Math.hypot(px - F[0], pz - F[1]) < 100)
continue;
fo.push({ x: px, z: pz, y: H(px, pz), s: 1.2 + R() * 0.6 });
}
hgwPlant(G, "tree", fo, { col: 0x2A4A22 });
hgwHerd(G, "cow", -100, 400, 120, lite ? 6 : 14, H, 433);
hgwHerd(G, "horse", 200, -200, 90, lite ? 4 : 10, H, 434);
hgwCrowd("chCity", [["A Colchian in steel mail", "m", "colchian", "Strangers from the west? The king's dream was of a falling star.", "greek"], ["A Colchian woman with a basket of strange fruit", "f", "gkwoman", "Fruit from the king's gardens. You have none like it in your country.", "greek"],
["A smith of the Chalybes", "m", "herd", "We forge for the War-god, day and night. Hear the anvils.", "greek"], ["A priest of the Sun", "m", "seer", "Aietes is the child of the Sun. Look at his roofs and believe it.", "greek"],
["A girl with a pitcher", "f", "gkwoman", "The princess Medeia gathers herbs by moonlight. Everyone knows.", "greek", true], ["A Colchian archer", "m", "archer", "No Hellen ever came so far. None ever went home.", "greek"]], C[0] - 60, C[1] - 40, C[0] + 60, C[1] + 40, { wander: 6, persona: "greek" });
},
function (G) {
var X = HGW_ROOMXZ.crete, R;
hgwHallRoom(G, "minhall", X.minhall, { name: "the hall of Minos in Knossos", rich: true, queen: true });
R = hgwRoom(G, "crhouse", X.crhouse[0], X.crhouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a house in Knossos", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwTable(R.g, 1.6, 0.6, 1.6, 0.8, 0.74, {});
},
function (G) {
var H = HGW_CR_H, I = HGW_CR, lite = hgwLite(), st = HGW.st, R = wRand(441);
hgwCrRooms(G);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.6 });
hgwRoads(G, HGW_CR_ROADS, H, { w: { knossos: 6, west: 4, cape: 3 } });
var K = I.knossos, ky = H(K[0], K[1]);
hgwKingsHouse(G, H, { at: [K[0], K[1] + 40], ry: 0, hall: "minhall", cw: 70, cd: 56, wall: "limewall" });
var red = hgwMat("redpaint"), lime = hgwMat("lime");
for (var c = 0; c < 10; c++) {
var cx = K[0] - 30 + c * 6.6;
hgwCyl(G, 0.55, 0.4, 4.4, red, cx, ky, K[1] + 8, 10);
hgwCyl(G, 0.75, 0.75, 0.4, hgwMat("darkstone"), cx, ky + 4.4, K[1] + 8, 10);
}
for (var hn = 0; hn < 8; hn++) {
var hx = K[0] - 28 + hn * 8;
[-1, 1].forEach(function (sd) { var h = hgwBox(G, 0.5, 1.6, 0.5, lime, hx + sd * 0.6, ky + 10, K[1] + 12, 0); h.rotation.z = -sd * 0.25; });
}
hgwTownPack(G, H, { c: [K[0], K[1] - 80], rx: 120, rz: 60, n: 58, seed: 442, roads: [HGW_CR_ROADS.knossos], r2: 0.4, tile: 0.5, door: { key: "crhouse", name: "The door of a house in Knossos" }, life: true });
hgwFleet(G, H, 200, -390, 0, lite ? 3 : 6, 10);
hgwHarbourSpots("crete", 180, -340);
var P = I.cape, py = H(P[0], P[1]);
if (st.talus)
hgwTalus(G, P[0], py, P[1], Math.PI * 0.75, st.talus === "dead");
if (st.talus === "dead") {
var lava = hgwStrip(G, [[P[0] + 8, P[1] + 8], [-1180, -760], [-1080, -600], [-990, -470]], 2.2, function (x, z) { return H(x, z) + 0.15; }, hgwGlowM(0xFF6A20, 0.85), 0);
}
if (st.argo)
hgwArgo(G, I.shore[0] + 22, 0.2, I.shore[1] - 40, -0.5, { afloat: true });
var S = I.spring, sy = H(S[0], S[1]);
hgwCyl(G, 1.6, 1.8, 0.6, hgwMat("greystone"), S[0], sy, S[1], 12);
var sw = hgwCyl(G, 1.4, 1.4, 0.05, hgwWaterM(0x7AA8B8, 0.9), S[0], sy + 0.52, S[1], 12);
HGW.water.push(sw);
hgwHerd(G, "sheep", -600, -100, 120, lite ? 6 : 14, H, 443);
hgwHerd(G, "goat", -1100, -700, 90, lite ? 4 : 10, H, 444);
hgwHerd(G, "cow", 400, 200, 80, lite ? 4 : 10, H, 445);
hgwGreekTrees(G, H, { clear: [[K[0], K[1], 140], [I.harbour[0], I.harbour[1], 40], [P[0], P[1], 30], [I.shore[0], I.shore[1], 30]], roads: hgwRoadList(HGW_CR_ROADS), olive: 3.0, oak: 0.6, pine: 0.8, cypress: 1.0 });
hgwCrowd("crKnossos", [["A Cretan lady in a flounced skirt", "f", "princess", "Minos is the greatest king of the sea. Every ship pays him.", "greek"], ["A bull-leaper", "m", "gkman", "You run at the bull, you take his horns, you go over. Simple.", "greek"],
["A potter", "m", "gkman", "Octopus and lilies, painted on every jar.", "greek"], ["A shepherd from the hills", "m", "herd", "There's a giant of brass on the western cape. He walks the island round three times a day.", "greek"],
["A child with a clay bull", "m", "herd", "Moo! I'm the bull from the sea!", "greek", true], ["A priestess", "f", "gkveiled", "Do not ask about what is kept under the palace.", "greek"]], K[0] - 60, K[1] - 90, K[0] + 60, K[1] - 30, { wander: 6, persona: "greek" });
},
function (P, x, y, z, ry, lifted) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var st = new THREE.Mesh(hgwGeo("tzstone", function () { var c = new THREE.DodecahedronGeometry(1, 1), p = c.attributes.position; for (var k = 0; k < p.count; k++) {
p.setX(k, p.getX(k) * 1.6);
p.setY(k, p.getY(k) * 0.55);
p.setZ(k, p.getZ(k) * 1.1);
} c.computeVertexNormals(); return c; }), hgwMat("greystone"));
if (lifted) {
st.position.set(-1.6, 0.7, 0.4);
st.rotation.set(0, 0.3, 1.0);
}
else
st.position.set(0, 0.45, 0);
g.add(st);
hgwRound(x, z, 1.5, y - 1, y + 1.2);
if (lifted) {
var gold = hgwShine(0xE8C040, 0.25, 0.95), br = hgwMat("bronze");
hgwBox(g, 0.08, 0.04, 1.0, br, 0.2, 0.05, 0);
hgwBox(g, 0.24, 0.06, 0.06, gold, 0.2, 0.06, 0.48);
hgwBox(g, 0.06, 0.06, 0.18, gold, 0.2, 0.06, 0.6);
hgwBox(g, 0.14, 0.04, 0.3, gold, -0.4, 0.04, -0.2);
hgwBox(g, 0.14, 0.04, 0.3, gold, -0.6, 0.04, -0.2);
}
return g;
},
function (P, x, y, z, ry) {
var m = null;
try {
if (typeof crxBuild === "function")
m = crxBuild("minotaur", {});
}
catch (e) {
m = null;
}
if (m) {
m.position.set(x, y, z);
m.rotation.y = ry || 0;
P.add(m);
return m;
}
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var fur = hgwLam(0x4A3022), hn = hgwLam(0xE8DCC0);
hgwEll(g, fur, 0.6, 0.9, 0.45, 0, 1.7, 0, 10);
hgwCyl(g, 0.22, 0.18, 1.0, fur, -0.25, 0, 0, 8);
hgwCyl(g, 0.22, 0.18, 1.0, fur, 0.25, 0, 0, 8);
hgwEll(g, fur, 0.36, 0.34, 0.5, 0, 2.7, -0.12, 10);
[-1, 1].forEach(function (s) { var h = hgwCyl(g, 0.04, 0.09, 0.5, hn, s * 0.38, 2.8, -0.05, 6); h.rotation.z = -s * 1.1; hgwCyl(g, 0.12, 0.1, 0.9, fur, s * 0.7, 1.4, 0, 8); });
return g;
},
function (G) {
var X = HGW_ROOMXZ.troezen, R;
hgwHallRoom(G, "tzhall", X.tzhall, { name: "the hall of Pittheus, king of Troezen", rich: true, queen: true });
R = hgwRoom(G, "aithra", X.aithra[0], X.aithra[1], 10, 8, { wall: "whitewash", floor: "beaten", h: 3.2, name: "Aithra's house", lightI: 0.7, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.6, 0, { h: R.h, mat: "lime" });
hgwLoom(R.g, 3.4, -2.6, -Math.PI / 2, 0xB83A2A);
hgwBed(R.g, -3.4, -2.4, 0, {});
R = hgwRoom(G, "tzhouse", X.tzhouse[0], X.tzhouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a house in Troezen", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwTable(R.g, 1.6, 0.6, 1.6, 0.8, 0.74, {});
},
function (G) {
var H = HGW_TZ_H, I = HGW_TZ, lite = hgwLite(), st = HGW.st, R = wRand(501);
hgwTzRooms(G);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.45 });
hgwRoads(G, HGW_TZ_ROADS, H, { w: { temple: 4, harbour: 5, west: 3 } });
var T = I.town;
hgwKingsHouse(G, H, { at: I.palace, ry: Math.PI / 2, hall: "tzhall", cw: 34, cd: 26 });
hgwTownPack(G, H, { c: T, rx: 80, rz: 56, n: 40, seed: 502, roads: [HGW_TZ_ROADS.temple, HGW_TZ_ROADS.harbour, HGW_TZ_ROADS.west], r2: 0.3, tile: 0.4, door: { key: "tzhouse", name: "The door of a house in Troezen" }, life: true, avoid: [[I.palace[0], I.palace[1], 26]] });
var ah = hgwRm("aithra");
if (ah)
hgwDoor(ah, "The door of Aithra's house", T[0] + 30, T[1] + 34, Math.PI);
var P = I.temple, py = H(P[0], P[1]);
hgwTemple(G, P[0] + 4, P[1] + 14, 10, 16, { ry: Math.PI, statue: "queen" });
hgwAltar(G, P[0] - 6, P[1] + 2, H, {});
var ring = [];
for (var k = 0; k <= 20; k++) {
var an = k / 20 * Math.PI * 2;
ring.push([P[0] + Math.cos(an) * 28, P[1] + Math.sin(an) * 26]);
}
hgwBigWall(G, ring, 2.4, H, { mat: "limewall", th: 0.8, gate: [[P[0] - 10, P[1] - 24, 4], [P[0] + 20, P[1] - 18, 3]] });
var S = I.stone;
hgwLiftStone(G, S[0], H(S[0], S[1]), S[1], 0.4, st.stone === "lifted");
hgwPlant(G, "tree", [{ x: S[0] - 5, z: S[1] - 4, y: H(S[0] - 5, S[1] - 4), s: 1.7 }], { col: 0x4A7A34 });
var bs = [];
for (var b = 0; b < 16; b++) {
var a = R() * 6.28, r = 2.4 + R() * 3;
bs.push({ x: S[0] + Math.cos(a) * r, z: S[1] + Math.sin(a) * r, y: H(S[0] + Math.cos(a) * r, S[1] + Math.sin(a) * r), s: 0.6 + R() * 0.4 });
}
if (st.stone !== "lifted")
hgwPlant(G, "bush", bs, { col: 0x4A6A2A });
var Hb = I.harbour;
hgwFleet(G, H, Hb[0] + 40, Hb[1] + 10, Math.PI / 2, lite ? 2 : 4, 10);
var D = I.down, dy = H(D[0], D[1]);
for (var s = 0; s < 14; s++) {
var a2 = R() * 6.28;
hgwEll(G, hgwMat("greystone"), 0.8 + R() * 0.6, 0.5 + R() * 0.4, 0.8 + R() * 0.6, D[0] + Math.cos(a2) * R() * 2.2, dy + 0.3 + (s > 9 ? 0.8 : 0), D[1] + Math.sin(a2) * R() * 2.2, 8);
}
var bog = [];
for (var w = 0; w < (lite ? 40 : 110); w++) {
var bx = D[0] + (R() - 0.5) * 180, bz = D[1] + (R() - 0.5) * 120;
bog.push({ x: bx, z: bz, y: H(bx, bz), s: 0.6 + R() * 0.6 });
}
hgwPlant(G, "bush", bog, { col: 0x5A5A34 });
var F = I.fountain, fy = H(F[0], F[1]);
hgwWater(G, F[0], F[1] - 6, 12, 8, fy + 0.25, 0x5A8A8A, 0.9);
hgwEll(G, hgwMat("darkrock"), 9, 7, 5, F[0] - 2, fy + 1, F[1] - 16, 10);
var cm = hgwEll(G, hgwLam(0x0C0A08), 2.2, 2.6, 1.2, F[0] - 2, fy + 1.2, F[1] - 11.6, 10);
var ft = [];
for (var t = 0; t < (lite ? 10 : 24); t++) {
var a3 = R() * 6.28, r3 = 10 + R() * 16;
ft.push({ x: F[0] + Math.cos(a3) * r3, z: F[1] + Math.sin(a3) * r3, y: H(F[0] + Math.cos(a3) * r3, F[1] + Math.sin(a3) * r3), s: 0.9 + R() * 0.5 });
}
hgwPlant(G, "tree", ft, { col: 0x3A6A2A });
hgwSpot(F[0], F[1] - 2, 4, "The nymphs' fountain", "drink", function () { hgbSay && hgbSay("💧 Cold, clear water out of the rock."); });
var pn = [];
for (var p = 0; p < (lite ? 120 : 300); p++) {
var px = -1300 + R() * 1100, pz = -1100 + R() * 900;
if (H.sd(px, pz) < 15 || hgwPathD(px, pz, HGW_TZ_ROADS.west) < 8)
continue;
pn.push({ x: px, y: H(px, pz), z: pz, s: 0.9 + R() * 0.5 });
}
hgwConifer(G, pn, {});
hgwHerd(G, "sheep", -700, -560, 120, lite ? 6 : 14, H, 503);
hgwHerd(G, "goat", -300, -250, 100, lite ? 4 : 10, H, 504);
hgwHerd(G, "cow", 400, 500, 80, lite ? 4 : 8, H, 505);
hgwGreekTrees(G, H, { clear: [[T[0], T[1], 100], [P[0], P[1], 34], [Hb[0], Hb[1], 40], [D[0], D[1], 50], [F[0], F[1], 20]], roads: hgwRoadList(HGW_TZ_ROADS), olive: 2.4, oak: 0.8, pine: 0.8, cypress: 0.8 });
hgwCrowd("tzTown", [["A fisherman of Troezen", "m", "sailor", "Pittheus is the wisest king in all the land. Ask him a riddle, he'll answer it.", "greek"], ["A woman at the well", "f", "gkwoman", "Aithra goes up to the temple every year with her son. Every year he tries the stone.", "greek"],
["An old man", "m", "gkold", "No man in Troezen can lift that stone. I tried it myself when I was young.", "greek"], ["A girl with a goose", "f", "herd", "Theseus can throw the javelin further than anyone!", "greek", true], ["A potter", "m", "gkman", "Jars, cups, lamps. Fired yesterday.", "greek"]], T[0] - 50, T[1] - 30, T[0] + 50, T[1] + 30, { wander: 6, persona: "greek" });
},
function (G) {
var X = HGW_ROOMXZ.isthmus, R;
R = hgwRoom(G, "ithouse", X.ithouse[0], X.ithouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a house in Corinth", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwTable(R.g, 1.6, 0.6, 1.6, 0.8, 0.74, {});
R = hgwRoom(G, "shut", X.shut[0], X.shut[1], 7, 6, { wall: "cave", floor: "beaten", h: 2.6, name: "a shepherd's hut on the Isthmus", lightI: 0.55, bare: 1 });
hgwHearth(R.g, 0, -2.6, 0, { h: R.h, mat: "lime" });
},
function (G) {
var H = HGW_ISX_H, I = HGW_ISX, lite = hgwLite(), st = HGW.st, R = wRand(521);
hgwIsRooms(G);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.5 });
hgwRoads(G, HGW_ISX_ROADS, H, { w: { isthmus: 5, scironpath: 2.4, lech: 4, acro: 3 } });
var C = I.corinth;
hgwTownPack(G, H, { c: C, rx: 90, rz: 60, n: 48, seed: 522, roads: [HGW_ISX_ROADS.isthmus, HGW_ISX_ROADS.lech], r2: 0.35, tile: 0.4, door: { key: "ithouse", name: "The door of a house in Corinth" }, life: true });
var A = I.acro, ring = [];
for (var k = 0; k <= 22; k++) {
var an = k / 22 * Math.PI * 2;
ring.push([A[0] + Math.cos(an) * 30, A[1] + Math.sin(an) * 26]);
}
hgwBigWall(G, ring, 6, H, { mat: "cyclopean", th: 3, tower: true, gate: [[A[0] + 20, A[1] - 20, 5]] });
hgwTemple(G, A[0], A[1], 10, 16, { ry: 0.4, statue: "queen" });
hgwFleet(G, H, I.lechaion[0], I.lechaion[1] - 30, 0, lite ? 2 : 4, 10);
var Pn = I.pines, pn = [];
for (var p = 0; p < (lite ? 90 : 220); p++) {
var a = R() * 6.28, r = 8 + R() * 110, px = Pn[0] + Math.cos(a) * r, pz = Pn[1] + Math.sin(a) * r;
if (H.sd(px, pz) < 10 || hgwPathD(px, pz, HGW_ISX_ROADS.isthmus) < 6)
continue;
pn.push({ x: px, y: H(px, pz), z: pz, s: 1.0 + R() * 0.6 });
}
hgwConifer(G, pn, {});
if (st.sinis) {
var bt = hgwCyl(G, 0.3, 0.5, 14, hgwMat("darkbark"), Pn[0] + 6, H(Pn[0] + 6, Pn[1] - 8), Pn[1] - 8, 8);
bt.rotation.z = 1.1;
var bt2 = hgwCyl(G, 0.3, 0.5, 14, hgwMat("darkbark"), Pn[0] - 6, H(Pn[0] - 6, Pn[1] - 8), Pn[1] - 8, 8);
bt2.rotation.z = -1.1;
}
var sh = hgwRm("shut");
if (sh)
hgwDoor(sh, "The door of a shepherd's hut", Pn[0] + 30, Pn[1] + 40, Math.PI);
var W = I.well, wy = H(W[0], W[1]);
hgwCyl(G, 1.2, 1.4, 0.8, hgwMat("greystone"), W[0], wy, W[1], 12);
var ww = hgwCyl(G, 1.0, 1.0, 0.05, hgwWaterM(0x4A7A8A, 0.9), W[0], wy + 0.72, W[1], 12);
HGW.water.push(ww);
if (st.barrier !== false)
for (var b = 0; b < 8; b++)
hgwEll(G, hgwMat("greystone"), 0.7, 0.6, 0.7, W[0] - 14 + (b % 4) * 1.2, H(W[0] - 14, W[1] + 2) + 0.4 + (b > 3 ? 0.9 : 0), W[1] + (b % 4) * 1.1 - 2, 8);
hgwEll(G, hgwMat("darkrock"), 9, 4, 7, W[0] + 10, -1, W[1] + 40, 10);
if (st.tortoise) {
var tt = new THREE.Group();
tt.position.set(W[0] + 10, 1.2, W[1] + 32);
G.add(tt);
hgwEll(tt, hgwLam(0x4A5A3A), 3.2, 1.2, 4, 0, 0, 0, 12);
hgwEll(tt, hgwLam(0x6A7A5A), 0.8, 0.6, 1.1, 0, 0.1, -4.2, 8);
}
hgwHerd(G, "sheep", -500, 300, 120, lite ? 6 : 14, H, 523);
hgwHerd(G, "goat", 500, -700, 140, lite ? 6 : 12, H, 524);
hgwGreekTrees(G, H, { clear: [[C[0], C[1], 110], [Pn[0], Pn[1], 120], [W[0], W[1], 30]], roads: hgwRoadList(HGW_ISX_ROADS), olive: 2.0, oak: 0.6, pine: 1.4, cypress: 0.6 });
hgwCrowd("isCorinth", [["A Corinthian trader", "m", "gkman", "Two seas, one road between them. Every ship's cargo comes over this neck of land.", "greek"], ["A Corinthian woman", "f", "gkwoman", "Nobody goes along the Isthmus alone. Not since the pine-bender.", "greek"],
["A carter", "m", "gkman", "I go inland round the cliffs. I'd sooner lose a day than meet Sciron.", "greek"], ["A boy with a top", "m", "herd", "Can you see both seas from the citadel? I can!", "greek", true]], C[0] - 50, C[1] - 30, C[0] + 50, C[1] + 20, { wander: 6, persona: "greek" });
},
function (G) {
var X = HGW_ROOMXZ.attica, R;
hgwHallRoom(G, "kerhall", X.kerhall, { name: "the hall of Kerkuon, king of Eleusis" });
hgwHallRoom(G, "aeghall", X.aeghall, { name: "the hall of Aegeus, king of Athens", rich: true, queen: true });
R = hgwRoom(G, "prohouse", X.prohouse[0], X.prohouse[1], 12, 9, { wall: "cave", floor: "beaten", h: 3.4, name: "the house in the glen", lightI: 0.55, bare: 1 });
hgwHearth(R.g, 0, -4.2, 0, { h: R.h, mat: "lime" });
hgwTable(R.g, -3, 0, 2.4, 1, 0.76, {});
hgwBox(R.g, 2.6, 0.5, 1.2, hgwMat("iron"), 3, 0, 1.8, 0);
hgwChest(R.g, -4.6, 0, -3.4, 0, {});
R = hgwRoom(G, "athouse", X.athouse[0], X.athouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a house in Athens", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwTable(R.g, 1.6, 0.6, 1.6, 0.8, 0.74, {});
R = hgwRoom(G, "elhouse", X.elhouse[0], X.elhouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a house in Eleusis", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwLoom(R.g, 3, -2, -Math.PI / 2, 0x3A5A8A);
},
function (G) {
var H = HGW_AA_H, I = HGW_AA, lite = hgwLite(), st = HGW.st, R = wRand(541);
hgwAaRooms(G);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.55 });
hgwRoads(G, HGW_AA_ROADS, H, { w: { sacred: 6, parnes: 3, down: 4, phaleron: 5, acro: 3 } });
hgwStrip(G, I.cephisus, 12, H, hgwMat("gravel"), 0.06);
var cw = hgwStrip(G, I.cephisus, 4, function (x, z) { return Math.max(H(x, z), -1.4) + 0.3; }, hgwWaterM(0x6A9AA8, 0.85), 0);
HGW.water.push(cw);
var pl = [];
var LL = hgwPathLen(I.cephisus);
for (var s = 0; s < (lite ? 30 : 80); s++) {
var q = hgwPathAt(I.cephisus, R() * LL), a = R() * 6.28, x = q.x + Math.cos(a) * (14 + R() * 10), z = q.z + Math.sin(a) * (14 + R() * 10);
pl.push({ x: x, z: z, y: H(x, z), s: 0.8 + R() * 0.5 });
}
hgwPlant(G, "tree", pl, { col: 0x4A7A34 });
var E = I.eleusis;
hgwKingsHouse(G, H, { at: I.kpalace, ry: 0, hall: "kerhall", cw: 34, cd: 26, court: true });
hgwTownPack(G, H, { c: E, rx: 70, rz: 46, n: 34, seed: 542, roads: [HGW_AA_ROADS.sacred, HGW_AA_ROADS.parnes], r2: 0.3, tile: 0.4, door: { key: "elhouse", name: "The door of a house in Eleusis" }, life: true, avoid: [[I.kpalace[0], I.kpalace[1], 30]] });
if (st.sand) {
var K = I.kpalace;
hgwBox(G, 12, 0.06, 12, hgwMat("sand"), K[0], H(K[0], K[1] + 24) + 0.02, K[1] + 24, 0);
}
var Gp = I.prohouse, gy = H(Gp[0], Gp[1]);
hgwGkHouse(G, Gp[0], Gp[1], 14, 10, 5, { ry: 0 });
var pr = hgwRm("prohouse");
if (pr)
hgwDoor(pr, "The door of the house in the glen", Gp[0], Gp[1] + 6, Math.PI);
hgwStream(G, [[-160, -1300], [-80, -1080], [-40, -930], [-120, -760], [-240, -560]], H, { w: 3 });
var cr = [];
for (var c2 = 0; c2 < (lite ? 20 : 50); c2++) {
var cx = -160 + R() * 260, cz = -1100 + R() * 400;
if (Math.hypot(cx - Gp[0], cz - Gp[1]) < 20 || hgwPathD(cx, cz, HGW_AA_ROADS.parnes) < 8)
continue;
cr.push({ x: cx, z: cz, y: H(cx, cz), s: 2 + R() * 3 });
}
hgwPlant(G, "rock", cr, {});
if (st.faggot) {
var Fg = I.faggot;
hgwCyl(G, 0.4, 0.4, 1.4, hgwMat("darkbark"), Fg[0] + 1.2, H(Fg[0] + 1.2, Fg[1]), Fg[1], 8).rotation.z = Math.PI / 2;
}
var El = I.elm, ey = H(El[0], El[1]);
hgwCyl(G, 1.2, 1.6, 9, hgwMat("darkbark"), El[0], ey, El[1], 10);
var lf = hgwLam(0x3A6A2A);
for (var e = 0; e < 6; e++) {
var ae = e / 6 * 6.28;
hgwEll(G, lf, 5, 3.6, 5, El[0] + Math.cos(ae) * 4, ey + 11 + (e % 2), El[1] + Math.sin(ae) * 4, 10);
}
hgwAltar(G, El[0] + 8, El[1] + 6, H, {});
var A = I.acro, ring = [];
for (var k = 0; k <= 24; k++) {
var an = k / 24 * Math.PI * 2;
ring.push([A[0] + Math.cos(an) * 30, A[1] + Math.sin(an) * 22]);
}
hgwBigWall(G, ring, 5, H, { mat: "cyclopean", th: 3, tower: true, gate: [[A[0] - 26, A[1] - 12, 5]] });
hgwKingsHouse(G, H, { at: [A[0] + 4, A[1]], ry: -Math.PI / 2, hall: "aeghall", cw: 34, cd: 24, wall: "ashlar" });
hgwTemple(G, A[0] - 10, A[1] + 12, 8, 12, { ry: 0, statue: "athena" });
var Ag = I.agora;
hgwTownPack(G, H, { c: I.athens, rx: 110, rz: 80, n: 60, seed: 543, roads: [HGW_AA_ROADS.sacred, HGW_AA_ROADS.phaleron, HGW_AA_ROADS.down], r2: 0.4, tile: 0.5, door: { key: "athouse", name: "The door of a house in Athens" }, life: true, avoid: [[A[0], A[1], 70], [Ag[0], Ag[1], 26]] });
hgwAltar(G, Ag[0], Ag[1], H, {});
var Ph = I.phaleron;
if (st.blackship)
hgwShip(G, Ph[0] - 14, 0.2, Ph[1] + 30, 0.6, { len: 22, sail: true, afloat: true, sailCol: 0x14100C });
hgwFleet(G, H, Ph[0] + 50, Ph[1] + 40, 0.6, lite ? 2 : 4, 10);
hgwHerd(G, "sheep", -200, -500, 140, lite ? 6 : 14, H, 544);
hgwHerd(G, "goat", 0, -1150, 120, lite ? 4 : 10, H, 545);
hgwHerd(G, "cow", 200, -200, 100, lite ? 4 : 8, H, 546);
hgwGreekTrees(G, H, { clear: [[E[0], E[1], 90], [A[0], A[1], 80], [I.athens[0], I.athens[1], 120], [Gp[0], Gp[1], 24], [El[0], El[1], 24], [Ph[0], Ph[1], 40]], roads: hgwRoadList(HGW_AA_ROADS), olive: 3.0, oak: 0.8, pine: 1.0, cypress: 0.6 });
hgwCrowd("aaEleusis", [["A woman of Eleusis", "f", "gkwoman", "Fair youth, why will you die? Hasten out of the city!", "greek"], ["A barley farmer", "m", "gkman", "The plain is rich, but our king is cruel.", "greek"], ["A priestess of Demeter", "f", "gkveiled", "The goddess walked here, mourning her daughter.", "greek"]], E[0] - 40, E[1] - 20, E[0] + 40, E[1] + 20, { wander: 6, persona: "greek" });
hgwCrowd("aaAthens", [["An Athenian potter", "m", "gkman", "The sons of Pallas sit in the king's hall and drink his wine, and he says nothing.", "greek"], ["An Athenian mother", "f", "gkwoman", "Spring is coming. Every spring we draw the lots. Every spring I pray.", "greek"],
["An old Athenian", "m", "gkold", "They say a hero has cleared the Isthmus road. They say he's on his way here.", "greek"], ["A girl with an olive branch", "f", "herd", "Athena gave us the olive tree. It's the best gift.", "greek", true], ["A sailor at the market", "m", "sailor", "Minos' ships are as many as the sea-gulls.", "greek"]], Ag[0] - 50, Ag[1] - 10, Ag[0] + 30, Ag[1] + 60, { wander: 6, persona: "greek" });
},
function (G) {
var H = HGW_NX_H, I = HGW_NX, lite = hgwLite(), st = HGW.st, R = wRand(561);
var X = HGW_ROOMXZ.naxos, Rm = hgwRoom(G, "nxhouse", X.nxhouse[0], X.nxhouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a house on Naxos", lightI: 0.6, bare: 1, beams: true });
hgwHearth(Rm.g, 0, -3.2, 0, { h: Rm.h, mat: "lime" });
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.45 });
hgwRoads(G, HGW_NX_ROADS, H, { w: { town: 4, vines: 3 } });
hgwTownPack(G, H, { c: I.town, rx: 60, rz: 40, n: 26, seed: 562, roads: [HGW_NX_ROADS.town], r2: 0.3, tile: 0.4, door: { key: "nxhouse", name: "The door of a house on Naxos" }, life: true });
if (st.ship)
hgwShip(G, I.shore[0] - 20, 0.2, I.shore[1] + 26, -0.9, { len: 22, sail: st.ship === "sail", afloat: true, sailCol: 0x14100C });
var V = I.vines, vy = H(V[0], V[1]), vl = [];
for (var r = 0; r < 10; r++)
for (var c = 0; c < (lite ? 8 : 16); c++) {
var x = V[0] - 40 + c * 5, z = V[1] - 30 + r * 6;
vl.push({ x: x, z: z, y: H(x, z), s: 0.5 });
}
hgwPlant(G, "bush", vl, { col: 0x4A7A2A });
hgwPithos(G, V[0] + 30, vy, V[1] + 10, 1.2);
hgwPithos(G, V[0] + 33, vy, V[1] + 12, 1.0);
var gr = [];
for (var t = 0; t < (lite ? 14 : 30); t++) {
var a = R() * 6.28, rr = 8 + R() * 30;
gr.push({ x: I.grove[0] + Math.cos(a) * rr, z: I.grove[1] + Math.sin(a) * rr, y: H(I.grove[0] + Math.cos(a) * rr, I.grove[1] + Math.sin(a) * rr), s: 0.9 + R() * 0.4 });
}
hgwPlant(G, "tree", gr, { col: 0x4A7A34 });
hgwHerd(G, "goat", 100, -200, 140, lite ? 4 : 10, H, 563);
hgwGreekTrees(G, H, { clear: [[I.town[0], I.town[1], 70], [V[0], V[1], 50], [I.shore[0], I.shore[1], 30]], roads: hgwRoadList(HGW_NX_ROADS), olive: 2.0, oak: 0.4, pine: 0.6, cypress: 0.6 });
hgwCrowd("nxTown", [["A Naxian fisherman", "m", "sailor", "The wine-king loves this island. Look at the grapes!", "greek"], ["A Naxian woman", "f", "gkwoman", "There was music on the hills last night. Pipes and drums, and no one playing them.", "greek"], ["An old potter", "m", "gkold", "Naxian marble, Naxian wine. The best of both in all the islands.", "greek"]], I.town[0] - 30, I.town[1] - 20, I.town[0] + 30, I.town[1] + 20, { wander: 6, persona: "greek" });
hgwCrowd("nxVines", [["A grape-picker", "f", "gkwoman", "The wine-king walks these rows at night, they say. The vines grow an inch a night after.", "greek"], ["A vine-dresser", "m", "gkman", "Prune in winter, tie in spring, and pray to Dionusos in between.", "greek"], ["A boy with a basket", "m", "herd", "I'm allowed one grape for every ten I pick.", "greek", true]], V[0] - 30, V[1] - 20, V[0] + 30, V[1] + 20, { wander: 5, persona: "greek" });
},
function (G) {
var H = HGW_SU_H, I = HGW_SU, lite = hgwLite(), st = HGW.st, R = wRand(581);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.6, rock: 40 });
hgwRoads(G, { road: I.road }, H, { w: { road: 3 } });
var C = I.cape;
hgwAltar(G, C[0] - 6, C[1] - 4, H, {});
hgwStoneRing(G, C[0] - 6, C[1] - 4, 7, 7, H);
if (st.blacksail)
hgwShip(G, C[0] + 260, 0.2, C[1] + 420, -2.4, { len: 22, sail: true, afloat: true, sailCol: 0x14100C });
hgwHerd(G, "goat", -200, -400, 120, lite ? 4 : 10, H, 582);
var L = I.landing;
hgwBoat(G, L[0] - 8, 0.2, L[1] + 10, 0.6, {});
hgwSpot(C[0] - 6, C[1] - 4, 5, "The altar on the height of Sunium", "look", function () { hgbSay && hgbSay("🌊 From here an old man could see every sail between the islands and the Attic shore."); });
hgwSpot(L[0], L[1], 4, "The cove under Sunium", "look", function () { hgbSay && hgbSay("🐚 Shells, weed, and the sea coming in."); });
hgwCrowd("suLanding", [["A fisherman of Sunium", "m", "sailor", "The old king sits up there every day. Every day. Looking south.", "greek"], ["A goatherd", "m", "herd", "My goats know the cliff paths better than I do.", "greek", true], ["A fisherman's wife", "f", "gkwoman", "Mending nets. There's always a net to mend.", "greek"], ["A shepherd of the cape", "m", "gkold", "Black sails, white sails. I've seen every kind come round this cape.", "greek"]], L[0] - 6, L[1] - 30, L[0] + 30, L[1] - 4, { wander: 5, persona: "greek" });
hgwGreekTrees(G, H, { clear: [[C[0], C[1], 40], [I.landing[0], I.landing[1], 20]], roads: [I.road], olive: 0.6, oak: 0.2, pine: 1.4, cypress: 0.2 });
},
function (G) {
var X = HGW_ROOMXZ.crete.labyr, L = HGW_LAB, N = L.N, C = L.C, W = L.w, st = HGW.st, lite = hgwLite();
var R = hgwRoom(G, "labyr", X[0], X[1], W, W, { wall: "cave", floor: "beaten", ceil: "cave", h: 5.5, name: "the Labyrinth under Knossos", lightI: 0.45, lightCol: 0xC8A878, bare: 1 });
var wm = hgwMat("cave"), y = R.y, h = 5.5, th = 0.7, rk = wRand(7103);
for (var j = 0; j < N; j++) {
var run = null;
for (var i = 0; i <= N; i++) {
var wall = i < N && j < N - 1 && !L.open[L.key(i, j) + "|" + L.key(i, j + 1)];
if (wall && run == null)
run = i;
if ((!wall || i === N) && run != null) {
var x0 = -W / 2 + run * C, x1 = -W / 2 + i * C, zz = -W / 2 + (j + 1) * C;
hgwBox(R.g, x1 - x0 + th, h, th, wm, (x0 + x1) / 2, 0, zz, 0);
hgwSolid(X[0] + (x0 + x1) / 2, X[1] + zz, x1 - x0 + th, th, y - 1, y + h + 1);
run = null;
}
}
}
for (var i2 = 0; i2 < N - 1; i2++) {
var run2 = null;
for (var j2 = 0; j2 <= N; j2++) {
var wall2 = j2 < N && !L.open[L.key(i2, j2) + "|" + L.key(i2 + 1, j2)];
if (wall2 && run2 == null)
run2 = j2;
if ((!wall2 || j2 === N) && run2 != null) {
var z0 = -W / 2 + run2 * C, z1 = -W / 2 + j2 * C, xx = -W / 2 + (i2 + 1) * C;
hgwBox(R.g, th, h, z1 - z0 + th, wm, xx, 0, (z0 + z1) / 2, 0);
hgwSolid(X[0] + xx, X[1] + (z0 + z1) / 2, th, z1 - z0 + th, y - 1, y + h + 1);
run2 = null;
}
}
}
for (var f = 0; f < (lite ? 10 : 26); f++) {
var fi = Math.floor(rk() * N), fj = Math.floor(rk() * N);
hgwEll(R.g, hgwMat("darkrock"), 0.4 + rk() * 0.4, 0.25 + rk() * 0.2, 0.4 + rk() * 0.4, L.cx(fi) + (rk() - 0.5) * 1.6, 0.1, L.cx(fj) + (rk() - 0.5) * 1.6, 7);
}
for (var b = 0; b < N; b += 2)
hgwBox(R.g, W, 0.5, 0.8, hgwMat("darkrock"), 0, h - 0.5, -W / 2 + b * C + 2, 0);
if (st.thread) {
var red = hgwLam(0xC82A2A), P = [[0, W / 2 - 0.6]].concat(L.path.slice().reverse().map(function (p) { return [L.cx(p[0]), L.cx(p[1])]; }));
hgwEll(R.g, hgwMat("greystone"), 0.5, 0.35, 0.5, 0.9, 0.1, W / 2 - 0.9, 8);
var upto = st.thread === "half" ? Math.ceil(P.length / 2) : P.length;
for (var t = 1; t < upto; t++) {
var a = P[t - 1], c = P[t], dx = c[0] - a[0], dz = c[1] - a[1], len = Math.hypot(dx, dz);
var seg = hgwBox(R.g, 0.05, 0.05, len, red, (a[0] + c[0]) / 2 + 0.3, 0.04, (a[1] + c[1]) / 2 + 0.3, Math.atan2(dx, dz));
}
}
if (st.minotaur) {
var B = L.beast;
hgwMinotaur(R.g, B[0], 0, B[1], L.far[1] > 5 ? 0 : Math.PI);
}
for (var tc = -1; tc <= 1; tc += 2)
hgwBox(R.g, 0.12, 0.6, 0.12, hgwGlowM(0xFF9A40, 0.9), tc * 1.6, 2.2, W / 2 - 0.3, 0);
return R;
},
function (G) {
var H = HGW_CR_H, K = HGW_CR.knossos, st = HGW.st;
var X = HGW_ROOMXZ.crete;
var Lr = hgwLabyrinth(G), mx = 172, mz = 548, my = H(mx, mz);
for (var c = 0; c < 7; c++) {
var a = c / 6 * Math.PI;
hgwEll(G, hgwMat("darkrock"), 5 + c % 3, 6 + c % 2 * 2, 5, mx + Math.cos(a) * 10, my + 2, mz + 9 + Math.sin(a) * 3, 10);
}
hgwEll(G, hgwLam(0x060504), 3.6, 4.6, 1.2, mx, my + 1.4, mz + 3.2, 12);
hgwBox(G, 8, 1.2, 6, hgwMat("darkrock"), mx, my + 5.6, mz + 4.5, 0);
hgwDoor(Lr, "The mouth of the Labyrinth", mx, mz - 3, 0);
var Pr = hgwRoom(G, "crprison", X.crprison[0], X.crprison[1], 12, 9, { wall: "cave", floor: "beaten", h: 3.2, name: "the prison under the palace of Minos", lightI: 0.4, bare: 1 });
for (var b = 0; b < 5; b++)
hgwBench(Pr.g, -4 + b * 2, -3.6, 0, {});
hgwDoor(Pr, "A low door under the palace of Minos", K[0] - 40, K[1] + 30, Math.PI / 2);
if (st.blackship)
hgwShip(G, HGW_CR.harbour[0] - 30, 0.2, HGW_CR.harbour[1] - 50, 0.2, { len: 22, sail: true, afloat: true, sailCol: 0x14100C });
var Df = [K[0] + 70, K[1] - 20], dy = H(Df[0], Df[1]);
hgwCyl(G, 9, 9, 0.3, hgwMat("marble"), Df[0], dy - 0.1, Df[1], 32);
hgwSpot(Df[0], Df[1], 6, "Ariadne's dancing-floor", "look", function () { hgbSay && hgbSay("🩰 White stone, carved by Daidalos for the princess, smooth as water."); });
},
function () {
if (typeof CRX_PLANS === "undefined" || typeof crxQuad !== "function" || CRX_PLANS.hghind)
return;
var gold = 0xE8C040;
CRX_PLANS.hghind = function () {
return crxQuad({ L: 0.8, H: 0.92, G: 0.25, W: 0.76, legR: 0.034, head: "horse", hs: 0.8, col: 0xB07A44, belly: 0xF0E4D0, back: 0x8A5A30, muzzle: 0x3A2A22, foot: "hoof", footCol: 0xB8863A,
tail: { l: 0.15, r: 0.04, up: -1.2, col: 0xF2EEE6 }, neck: { l: 0.45, up: 1.0 }, neckR0: 0.48, neckR1: 0.38, stride: 1.9, runAt: 4.2,
more: function (E) {
var a = function (x, y, z) { return [E[0] + x, E[1] + y, E[2] + z]; };
var out = [];
[1, -1].forEach(function (sd) {
out = out.concat(crxPath([a(0.05 * sd, 0.2, 0.04), a(0.2 * sd, 0.42, -0.04), a(0.32 * sd, 0.66, -0.12), a(0.38 * sd, 0.9, -0.08)], 0.026, 0.009, { bone: "head", col: gold, g: 0.85, k: 0.01 }));
out = out.concat(crxPath([a(0.14 * sd, 0.34, -0.0), a(0.18 * sd, 0.52, 0.14)], 0.017, 0.006, { bone: "head", col: gold, g: 0.85, k: 0.01 }));
out = out.concat(crxPath([a(0.29 * sd, 0.6, -0.1), a(0.26 * sd, 0.82, 0.02)], 0.015, 0.005, { bone: "head", col: gold, g: 0.85, k: 0.01 }));
});
return out;
} });
};
CRX_PLANS.hgbull = function () {
return crxQuad({ L: 1.1, H: 0.82, G: 0.42, W: 0.9, legR: 0.07, head: "bull", hs: 1.35, col: 0xF2EEE6, back: 0xE8E2D8, belly: 0xF8F6F0, muzzle: 0xC8A8A0, foot: "hoof",
tail: { l: 0.7, r: 0.04, up: -1.4, col: 0xE8E2D8 }, neck: { l: 0.3, up: 0.4 }, neckR0: 0.7, neckR1: 0.55, stride: 1.6, runAt: 3.4 });
};
CRX_PLANS.hgox = function () {
return crxQuad({ L: 1.05, H: 0.8, G: 0.4, W: 0.88, legR: 0.065, head: "bull", hs: 1.3, col: 0x9A2A1A, back: 0x7A1E12, belly: 0xB84A34, muzzle: 0x3A2420, foot: "hoof",
tail: { l: 0.7, r: 0.04, up: -1.4, col: 0x5A140C }, neck: { l: 0.3, up: 0.4 }, neckR0: 0.68, neckR1: 0.52, stride: 1.5, runAt: 3.2 });
};
CRX_PLANS.hgmare = function () {
return crxQuad({ L: 1.15, H: 1.08, G: 0.36, W: 0.8, legR: 0.055, head: "horse", hs: 1.25, col: 0x1E1612, back: 0x14100C, muzzle: 0x0E0A08, mane: 0x0A0806, foot: "hoof",
tail: { l: 0.85, r: 0.07, up: -1.3, col: 0x0A0806 }, neck: { l: 0.64, up: 0.98 }, neckR0: 0.58, neckR1: 0.36, eyeCol: 0xC8401A, fangs: 1, stride: 2.1, runAt: 4.2 });
};
CRX_PLANS.hgorthrus = function () {
return crxQuad({ L: 0.8, H: 0.7, G: 0.28, W: 0.92, legR: 0.055, head: "dog", hs: 1.05, heads: 2, col: 0x5A4A3A, back: 0x3A2E22, belly: 0x7A6A5A, muzzle: 0x2A2020,
tail: { l: 0.6, r: 0.06, up: -0.8 }, neck: { l: 0.28, up: 0.5 }, fangs: 1, eyeCol: 0xE8A040, claws: 1, stride: 1.3 });
};
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
if (o.dead)
return g;
var sk = hgwS("b:hydra", 0x3A5A34, 0.85), bl = hgwLam(0x8AA060), sc = hgwLam(0x14100C), R = wRand(71);
hgwEll(g, sk, 3.4, 1.6, 4.2, 0, 1.0, 0, 14);
hgwEll(g, bl, 2.8, 0.9, 3.6, 0, 0.5, 0.3, 12);
for (var c = 0; c < 4; c++) {
var co = hgwEll(g, sk, 1.4, 0.9, 1.8, Math.cos(c * 1.6) * 4.2, 0.6, Math.sin(c * 1.6) * 3.4 + 1.8, 10);
co.rotation.y = c;
}
for (var i = 0; i < 9; i++) {
var mid = i === 4, a = (i - 4) * 0.22, len = mid ? 7.5 : 5.6 + R() * 1.4, sway = (R() - 0.5) * 1.6;
var pts = [[Math.sin(a) * 2.0, 1.6, -1.2], [Math.sin(a) * 3.2 + sway * 0.4, 3.2, -2.4], [Math.sin(a) * 4.4 + sway, len * 0.75, -3.0], [Math.sin(a) * 4.8 + sway, len, -2.2]];
var nk = new THREE.Mesh(hgwTaper(pts, mid ? [0.7, 0.6, 0.5, 0.42] : [0.55, 0.46, 0.38, 0.32], 8, 6), sk);
g.add(nk);
var t = pts[3], burnt = o.cut && !mid && i < o.cut;
if (burnt) {
hgwEll(g, sc, 0.36, 0.2, 0.36, t[0], t[1] + 0.1, t[2], 8);
continue;
}
var hd = hgwEll(g, sk, mid ? 0.9 : 0.62, mid ? 0.62 : 0.44, mid ? 1.3 : 0.95, t[0], t[1] + 0.25, t[2] - 0.5, 10);
var jw = hgwEll(g, bl, mid ? 0.7 : 0.5, 0.2, mid ? 1.0 : 0.75, t[0], t[1] - 0.05, t[2] - 0.6, 8);
[-1, 1].forEach(function (s) { hgwEll(g, hgwGlowM(0xE8C040, 0.9), 0.09, 0.09, 0.09, t[0] + s * (mid ? 0.42 : 0.3), t[1] + 0.48, t[2] - (mid ? 1.0 : 0.75), 6); });
}
hgwRound(x, z, 5, y - 1, y + 8);
return g;
},
function (P, x, y, z, ry, s) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.scale.setScalar(s || 1);
P.add(g);
var br = hgwShine(0x8A6A3A, 0.55, 0.75), dk = hgwLam(0x2A2018), bk = hgwShine(0xC8A040, 0.4, 0.9);
hgwEll(g, br, 0.5, 0.45, 1.1, 0, 0, 0, 10);
hgwEll(g, br, 0.32, 0.32, 0.4, 0, 0.25, -1.0, 8);
var bc = new THREE.Mesh(hgwGeo("bbeak", function () { var c = new THREE.ConeGeometry(0.12, 0.5, 6); c.rotateX(-Math.PI / 2); return c; }), bk);
bc.position.set(0, 0.2, -1.5);
g.add(bc);
[-1, 1].forEach(function (sd) {
var w = new THREE.Group();
w.position.set(sd * 0.4, 0.1, -0.2);
g.add(w);
for (var f = 0; f < 5; f++) {
var fe = hgwBox(w, 1.0, 0.04, 0.32, br, sd * (0.5 + f * 0.42), 0, f * 0.12);
fe.rotation.y = sd * 0.12 * f;
}
w.userData.sd = sd;
(g.userData.w = g.userData.w || []).push(w);
});
hgwBox(g, 0.5, 0.05, 0.8, dk, 0, 0, 1.1);
return g;
},
function (P, cx, cy, cz, r, n, seed) {
var R = wRand(seed || 81), grp = new THREE.Group();
grp.userData.live = 1;
P.add(grp);
var bs = [];
for (var i = 0; i < (hgwLite() ? Math.ceil(n / 2) : n); i++) {
var b = hgwBronzeBird(grp, 0, 0, 0, 0, 1.6 + R() * 0.8);
b.userData.a = R() * 6.28;
b.userData.r = r * (0.4 + R() * 0.6);
b.userData.h = cy + R() * 30;
b.userData.v = 0.18 + R() * 0.12;
bs.push(b);
}
var t = 0;
HGW.ticks.push(function (dt) {
if (!grp.parent)
return;
t += dt || 0.016;
bs.forEach(function (b) {
var a = b.userData.a + t * b.userData.v;
b.position.set(cx + Math.cos(a) * b.userData.r, b.userData.h + Math.sin(t * 0.7 + b.userData.a) * 3, cz + Math.sin(a) * b.userData.r);
b.rotation.y = -a;
var fl = Math.sin(t * 5 + b.userData.a) * 0.35;
(b.userData.w || []).forEach(function (w) { w.rotation.z = w.userData.sd * fl; });
});
});
return grp;
},
function (P, x, y, z, ry, s) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.scale.setScalar(s || 1);
P.add(g);
var br = hgwLam(0x4A3422), wh = hgwLam(0xE8E0D0), yl = hgwLam(0xD8A030);
hgwEll(g, br, 0.4, 0.55, 0.4, 0, 0.6, 0, 10);
hgwEll(g, wh, 0.26, 0.26, 0.28, 0, 1.15, -0.1, 8);
var bc = new THREE.Mesh(hgwGeo("ebeak", function () { var c = new THREE.ConeGeometry(0.07, 0.24, 6); c.rotateX(-Math.PI / 2); return c; }), yl);
bc.position.set(0, 1.1, -0.4);
g.add(bc);
[-1, 1].forEach(function (sd) { var w = hgwEll(g, br, 0.12, 0.5, 0.9, sd * 0.4, 0.75, 0.1, 8); w.rotation.z = sd * 0.35; hgwCyl(g, 0.04, 0.04, 0.3, yl, sd * 0.12, 0.08, 0, 5); });
hgwBox(g, 0.3, 0.05, 0.6, br, 0, 0.25, 0.5);
return g;
},
function (P, x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var gd = hgwShine(0xE8B840, 0.25, 0.95);
var c = new THREE.Mesh(hgwGeo("suncup", function () { var s = new THREE.SphereGeometry(1, 24, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); s.scale(5.5, 3.2, 8.5); return s; }), gd);
c.position.y = 2.6;
g.add(c);
var rim = new THREE.Mesh(hgwGeo("suncupr", function () { var t = new THREE.TorusGeometry(1, 0.06, 6, 32); t.rotateX(Math.PI / 2); t.scale(5.5, 1, 8.5); return t; }), gd);
rim.position.y = 2.6;
g.add(rim);
hgwFloor(x, z, 8, 13, y + 0.8, { rot: ry || 0 });
return g;
},
function (G, H, cx, cz, r0, r1, n, seed, kind, col) {
var R = wRand(seed), out = [];
for (var t = 0; t < (hgwLite() ? Math.ceil(n / 2) : n); t++) {
var a = R() * 6.28, d = r0 + R() * (r1 - r0), x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
if (H.sd(x, z) < 12)
continue;
out.push({ x: x, z: z, y: H(x, z), s: 0.9 + R() * 0.5 });
}
if (kind === "conifer")
hgwConifer(G, out, {});
else
hgwPlant(G, kind || "tree", out, { col: col || 0x3A6A2A });
return out;
},
function (G) {
var X = HGW_ROOMXZ.thebes, R;
hgwHallRoom(G, "amphall", X.amphall, { name: "the hall of Amphitryon in Thebes", rich: true, queen: true });
R = hgwRoom(G, "nursery", X.nursery[0], X.nursery[1], 9, 8, { wall: "whitewash", floor: "beaten", h: 3.2, name: "Alcmene's chamber", lightI: 0.55, lightCol: 0xFFD8A8, bare: 1, beams: true });
var cr = new THREE.Group();
cr.position.set(0, 0, -2.4);
R.g.add(cr);
hgwBox(cr, 1.4, 0.5, 0.8, hgwMat("darkoak"), 0, 0.35, 0);
hgwBox(cr, 1.5, 0.1, 0.06, hgwMat("darkoak"), 0, 0.1, 0.3);
hgwBox(cr, 1.5, 0.1, 0.06, hgwMat("darkoak"), 0, 0.1, -0.3);
hgwBox(cr, 1.3, 0.12, 0.7, hgwLam(0xE8DCC8), 0, 0.66, 0);
hgwBed(R.g, -3, -2.4, 0, { cover: 0x8A2A2A });
hgwLoom(R.g, 3.2, -2.8, -Math.PI / 2, 0x3A5AA8);
hgwCandle(R.g, 2.6, 1.0, 1.8, {});
R = hgwRoom(G, "linus", X.linus[0], X.linus[1], 10, 8, { wall: "whitewash", floor: "beaten", h: 3.2, name: "the music-room, where old Linus taught", lightI: 0.65, bare: 1, beams: true });
hgwBench(R.g, 0, -1, 0, {});
hgwTable(R.g, 0, -3, 2, 0.9, 0.74, {});
hgwShelves(R.g, -4.6, -2, 2, 2.2, Math.PI / 2, {});
R = hgwRoom(G, "thhouse", X.thhouse[0], X.thhouse[1], 9, 7, { wall: "mudbrick", floor: "beaten", h: 3.0, name: "a house in Thebes", lightI: 0.6, bare: 1, beams: true });
hgwHearth(R.g, 0, -3.2, 0, { h: R.h, mat: "lime" });
hgwTable(R.g, 1.6, 0.6, 1.6, 0.8, 0.74, {});
},
function (G) {
var H = HGW_TB_H, I = HGW_TB, lite = hgwLite(), st = HGW.st, R = wRand(601);
hgwThRooms(G);
hgwSea(G, -60);
hgwLandMesh(G, H, { dry: 0.45, cfn: hgwSnowColour(H, 420, { dry: 0.45 }) });
hgwRoads(G, HGW_TH_ROADS, H, { w: { south: 5, forest: 3, east: 4 } });
var C = I.city, ring = [];
for (var k = 0; k <= 26; k++) {
var an = k / 26 * Math.PI * 2;
ring.push([C[0] + Math.cos(an) * 92, C[1] + Math.sin(an) * 78]);
}
hgwBigWall(G, ring, 8, H, { mat: "cyclopean", th: 3.4, tower: true, gate: [[I.gate[0], I.gate[1] - 6, 7], [C[0] + 90, C[1] + 8, 6], [C[0] - 88, C[1] - 14, 6], [C[0] + 20, C[1] - 78, 6]] });
hgwKingsHouse(G, H, { at: I.palace, ry: 0, hall: "amphall", cw: 36, cd: 26, wall: "ashlar" });
var nu = hgwRm("nursery");
if (nu)
hgwDoor(nu, "The door of Alcmene's chamber", I.palace[0] + 20, I.palace[1] + 6, Math.PI / 2);
var li = hgwRm("linus");
if (li)
hgwDoor(li, "The door of the music-room", I.palace[0] - 20, I.palace[1] + 6, -Math.PI / 2);
hgwTownPack(G, H, { c: C, rx: 84, rz: 70, n: 54, seed: 602, roads: [HGW_TH_ROADS.south.slice(0, 2), HGW_TH_ROADS.east.slice(0, 2)], r2: 0.35, tile: 0.4, door: { key: "thhouse", name: "The door of a house in Thebes" }, life: true, avoid: [[I.palace[0], I.palace[1], 30]] });
hgwTemple(G, C[0] + 40, C[1] + 30, 12, 18, { ry: Math.PI, statue: "apollo" });
hgwAltar(G, C[0] + 40, C[1] + 48, H, {});
var D = I.dirce, dy = H(D[0], D[1]);
hgwWater(G, D[0], D[1], 10, 6, dy + 0.25, 0x4A7A7A, 0.85);
hgwEll(G, hgwMat("greystone"), 4, 1.6, 2, D[0], dy + 0.6, D[1] - 4, 10);
hgwPlant(G, "poplar", [{ x: D[0] - 8, z: D[1] + 2, y: dy, s: 1.2 }, { x: D[0] + 9, z: D[1] - 1, y: dy, s: 1.1 }], {});
var Hu = I.hut, hy = H(Hu[0], Hu[1]);
hgwGkHouse(G, Hu[0], Hu[1] - 8, 8, 6, 3, {});
var pal = [];
for (var p = 0; p <= 16; p++) {
var pa = p / 16 * Math.PI * 2;
pal.push([Hu[0] + 20 + Math.cos(pa) * 26, Hu[1] + 10 + Math.sin(pa) * 18]);
}
hgwBigWall(G, pal, 1.2, H, { mat: "limewall", th: 0.6, gate: [[Hu[0] - 4, Hu[1] + 4, 4]] });
hgwHerd(G, "cow", I.pasture[0] - 40, I.pasture[1] + 30, 90, lite ? 6 : 16, H, 603);
hgwHerd(G, "sheep", -100, 120, 80, lite ? 6 : 14, H, 604);
hgwHerd(G, "goat", -500, 380, 70, lite ? 4 : 10, H, 605);
hgwRingTrees(G, H, I.forest[0], I.forest[1], 24, 120, lite ? 40 : 110, 606, "tree", 0x2A5A2A);
hgwRingTrees(G, H, -650, 600, 60, 300, lite ? 60 : 160, 607, "conifer");
var L = I.lair, ly = H(L[0], L[1]);
for (var r = 0; r < (lite ? 5 : 10); r++) {
var ra = r / 10 * Math.PI * 1.4 + 2.4;
hgwEll(G, hgwMat("darkrock"), 3 + R() * 3, 2 + R() * 3, 3 + R() * 3, L[0] + Math.cos(ra) * 12, ly + 1, L[1] + Math.sin(ra) * 12, 8);
}
if (st.thLion !== "dead")
hgwBeast(G, "lion", L[0] - 3, ly, L[1] + 6, -2.6, 1.9);
hgwFire(G, Hu[0] + 4, hy, Hu[1] + 14, 0.8);
var D2 = I.defile;
hgwPeak(G, D2[0] - 30, D2[1] + 10, 26, 44, { k: 61, y: H(D2[0] - 30, D2[1] + 10) - 2 });
hgwPeak(G, D2[0] + 30, D2[1] - 12, 24, 40, { k: 62, y: H(D2[0] + 30, D2[1] - 12) - 2 });
hgwGreekTrees(G, H, { clear: [[C[0], C[1], 120], [Hu[0], Hu[1], 50], [I.forest[0], I.forest[1], 22], [L[0], L[1], 20], [D2[0], D2[1], 30]], roads: hgwRoadList(HGW_TH_ROADS), olive: 2.0, oak: 1.4, pine: 1.0, cypress: 0.6 });
hgwCrowd("thCity", [["A Theban woman at the spring", "f", "gkwoman", "Alcmene's boy? He strangled two snakes in his cradle, they say. Two!", "greek"], ["A Theban elder", "m", "gkold", "Old Tiresias is blind, but he sees more than any of us.", "greek"],
["A potter of Thebes", "m", "gkman", "Cadmus built this city. Sowed it, they say, with dragon's teeth.", "greek"], ["A girl with a water-jar", "f", "gkwoman", "The Minyans want a hundred oxen from us every year. Every year!", "greek", true], ["A Theban spearman", "m", "warrior", "Seven gates, and every one of them watched.", "greek"]], C[0] - 60, C[1] - 40, C[0] + 60, C[1] + 50, { wander: 6, persona: "greek" });
hgwCrowd("thHut", [["Amphitryon's chief herdsman", "m", "herd", "The young master? Up on the mountain since dawn. He'll come down with a deer on his shoulders, you'll see.", "greek"], ["The herdsman's wife", "f", "gkwoman", "Eat, child. Cheese and bread, and milk warm from the cow.", "greek"], ["A cowherd", "m", "herd", "Something's been at the herds. Big. The dogs won't go up there.", "greek"]], Hu[0] - 20, Hu[1] - 10, Hu[0] + 30, Hu[1] + 30, { wander: 5, persona: "greek" });
},
function (G) {
var H = HGW_NE_H, I = HGW_NE, lite = hgwLite(), st = HGW.st, R = wRand(621);
var X = HGW_ROOMXZ.nemea;
var Rm = hgwRoom(G, "necave", X.necave[0], X.necave[1], 14, 12, { wall: "cave", floor: "beaten", ceil: "cave", h: 5, name: "the lion's den, a cave of two mouths", lightI: 0.35, lightCol: 0xC8A070, bare: 1 });
for (var b = 0; b < 8; b++)
hgwEll(Rm.g, hgwLam(0xE8DCC0), 0.3, 0.12, 0.6, -4 + b * 1.1, 0.1, 2 + (b % 3), 6);
Rm = hgwRoom(G, "nmhut", X.nmhut[0], X.nmhut[1], 8, 6, { wall: "mudbrick", floor: "beaten", h: 2.8, name: "a labourer's hut", lightI: 0.6, bare: 1, beams: true });
hgwHearth(Rm.g, 0, -2.6, 0, { h: Rm.h, mat: "lime" });
hgwTable(Rm.g, 1.4, 0.6, 1.4, 0.8, 0.74, {});
hgwSea(G, -60);
hgwLandMesh(G, H, { dry: 0.5 });
hgwRoads(G, HGW_NE_ROADS, H, { w: { west: 4, cave: 3 } });
var Cl = I.cleonae;
hgwTownPack(G, H, { c: Cl, rx: 50, rz: 36, n: 22, seed: 622, roads: [HGW_NE_ROADS.west], r2: 0.3, tile: 0.4, life: true });
var hu = hgwRm("nmhut");
if (hu)
hgwDoor(hu, "The door of the hut", I.hut[0], I.hut[1] - 6, 0);
hgwTemple(G, I.temple[0], I.temple[1], 12, 22, { ry: Math.PI / 2, statue: "warrior" });
hgwAltar(G, I.temple[0] + 18, I.temple[1], H, {});
var C = I.cave, cy = H(C[0], C[1]);
hgwBox(G, 6, 5, 2.4, hgwLam(0x0A0806), C[0], cy + 1.2, C[1] + 14, 0);
hgwBox(G, 5, 4, 2.4, hgwLam(0x0A0806), C[0] + 10, cy + 3, C[1] + 64, 0.2);
for (var r = 0; r < (lite ? 6 : 14); r++) {
var a = R() * 6.28;
hgwEll(G, hgwMat("darkrock"), 2 + R() * 3, 1.4 + R() * 2, 2 + R() * 3, C[0] + Math.cos(a) * (14 + R() * 8), cy + 0.8, C[1] + 30 + Math.sin(a) * (18 + R() * 8), 8);
}
var dn = hgwRm("necave");
if (dn)
hgwDoor(dn, "Into the lion's den", C[0], C[1] + 11, Math.PI);
if (st.neLion !== "dead")
hgwBeast(G, "lion", C[0] + 6, cy, C[1] + 4, -2.2, 2.4);
hgwRingTrees(G, H, I.forest[0], I.forest[1], 10, 160, lite ? 70 : 200, 623, "tree", 0x2A5A2A);
hgwHerd(G, "sheep", 300, 200, 90, lite ? 4 : 10, H, 624);
hgwHerd(G, "goat", 500, -300, 80, lite ? 4 : 8, H, 625);
var vin = [];
for (var vr = 0; vr < 8; vr++)
for (var vc = 0; vc < 18; vc++) {
var vx = 420 + vc * 3, vz = 60 + vr * 3.4;
vin.push({ x: vx, z: vz, y: H(vx, vz) });
}
hgwPlant(G, "vine", vin, { keepAll: true });
hgwGreekTrees(G, H, { clear: [[Cl[0], Cl[1], 70], [I.temple[0], I.temple[1], 40], [C[0], C[1], 40]], roads: hgwRoadList(HGW_NE_ROADS), olive: 2.4, oak: 1.2, pine: 1.0, cypress: 0.6 });
hgwCrowd("neCleonae", [["A woman of Cleonae", "f", "gkwoman", "Don't take the Nemea road alone. The lion took my brother's ox, and the ox-driver too.", "greek"], ["A labourer", "m", "gkman", "No one works the far fields any more. Not since the lion came.", "greek"],
["An old shepherd", "m", "gkold", "Arrows? Spears? They bounce off it, stranger. Its hide is proof against them all.", "greek"], ["A boy with a goose", "m", "herd", "I saw its paw-print! As big as a shield!", "greek", true]], Cl[0] - 40, Cl[1] - 30, Cl[0] + 40, Cl[1] + 30, { wander: 6, persona: "greek" });
hgwCrowd("neNemea", [["A priest of Zeus at Nemea", "m", "gkold", "The temple has had no pilgrims since spring. They are afraid.", "greek"], ["A cowherd", "m", "herd", "I keep the herd close in, by the temple. Zeus watch over us.", "greek"], ["A woman with a basket", "f", "gkwoman", "Wild figs. I don't go further than the temple wall for them.", "greek"]], I.temple[0] - 30, I.temple[1] - 20, I.temple[0] + 40, I.temple[1] + 30, { wander: 5, persona: "greek" });
},
function (G) {
var H = HGW_AR_H, I = HGW_AH, st = HGW.st, lite = hgwLite(), R = wRand(641), X = HGW_ROOMXZ.argolis;
var Rm = hgwRoom(G, "eurhall", X.eurhall[0], X.eurhall[1], 20, 16, { wall: "ashlar", floor: "gkfloor", h: 6, name: "the hall of King Eurystheus in Mycenae", lightI: 0.6, lightCol: 0xFFE0B0, bare: 1, beams: true });
hgwHallHearth(Rm.g, 0, 0, 1, {});
hgwThrone(Rm.g, 0, -7, 0, {});
var jar = new THREE.Mesh(hgwGeo("eurjar", function () { var pts = []; for (var i = 0; i <= 12; i++) {
var t = i / 12;
pts.push(new THREE.Vector2(0.4 + Math.sin(t * Math.PI) * 1.0 - (t > 0.85 ? 0.3 : 0), t * 2.6));
} return new THREE.LatheGeometry(pts, 24); }), hgwMat("bronze"));
jar.position.set(5, -0.8, -4);
Rm.g.add(jar);
[-1, 1].forEach(function (s) { hgwCyl(Rm.g, 0.5, 0.5, 5.8, hgwMat("redpaint"), s * 4, 0, -2, 12); });
var eh = hgwRm("eurhall");
if (eh)
hgwDoor(eh, "The doors of Eurystheus' hall", I.hall[0], I.hall[1] + 6, Math.PI);
var F = I.fen, fy = H(F[0], F[1]);
for (var p = 0; p < 6; p++) {
var px = F[0] - 30 + p * 14, pz = F[1] - 10 + (p % 2) * 14;
hgwWater(G, px, pz, 16, 11, H(px, pz) + 0.12, 0x2A3A2A, 0.94);
}
var rd = [];
for (var w = 0; w < (lite ? 40 : 110); w++) {
var rx = F[0] + (R() - 0.5) * 110, rz = F[1] + (R() - 0.5) * 70;
rd.push({ x: rx, z: rz, y: H(rx, rz), s: 1.0 + R() * 0.8 });
}
hgwPlant(G, "reeds", rd, {});
if (st.hydra !== "dead")
hgwHydra(G, F[0], fy - 0.3, F[1], 0.4, { cut: st.hydra === "burning" ? 8 : 0 });
var S = I.spring, sy = H(S[0], S[1]);
hgwEll(G, hgwMat("greystone"), 4, 2, 3, S[0], sy + 1, S[1] + 4, 10);
hgwSpot(S[0], S[1], 5, "The well of Amymone", "drink", function () { hgbSay && hgbSay("💧 Clear water, from three outlets in the rock."); });
for (var o = 0; o < 3; o++)
hgwWater(G, S[0] - 3 + o * 3, S[1] - 1, 2, 5, sy + 0.2, 0x5A8AA0, 0.85);
hgwPlant(G, "tree", [{ x: S[0] + 8, z: S[1] + 3, y: sy, s: 1.8 }], { col: 0x4A7A34 });
hgwRingTrees(G, H, I.wood[0], I.wood[1], 8, 60, lite ? 20 : 50, 642, "tree", 0x3A6A2A);
if (st.hydraFire) {
hgwFire(G, I.wood[0] + 12, H(I.wood[0] + 12, I.wood[1] + 10), I.wood[1] + 10, 1.4);
hgwSmoke(G, I.wood[0] + 12, H(I.wood[0] + 12, I.wood[1] + 10) + 4, I.wood[1] + 10, 0x5A5048, lite ? 6 : 14);
}
if (st.hydra === "dead")
hgwHydraStone(G, I.stone[0], H(I.stone[0], I.stone[1]), I.stone[1]);
hgwChariot(G, F[0] + 40, F[1] - 30, 0.8, {});
var T = I.tower, ty = H(T[0], T[1]);
hgwBox(G, 8, 22, 8, hgwMat("cyclopean"), T[0], ty, T[1]);
hgwBox(G, 9, 1, 9, hgwMat("cyclopean"), T[0], ty + 22, T[1]);
hgwCrowd("arMycGate", [["Copreus, the king's herald", "m", "gkold", "The king will not see you. The king says: tell your deeds to me, outside the town.", "Copreus, herald of Eurystheus, from the myths: pompous, nervous, a coward like his master." + HGW_ERA],
["A guard at the gate of Mycenae", "m", "warrior", "Stand back from the gate. Orders.", "greek"], ["A woman of Mycenae", "f", "gkwoman", "The king hides in a bronze jar when the strong one comes. Everyone knows. No one says.", "greek"]], I.hall[0] - 20, I.hall[1] + 14, I.hall[0] + 20, I.hall[1] + 40, { wander: 5, persona: "greek" });
},
function (G) {
var H = HGW_LD_H, I = HGW_LD, lite = hgwLite(), st = HGW.st, R = wRand(661), X = HGW_ROOMXZ.ladon;
var Rm = hgwRoom(G, "ldhut", X.ldhut[0], X.ldhut[1], 8, 6, { wall: "mudbrick", floor: "beaten", h: 2.8, name: "a shepherd's hut in Arcadia", lightI: 0.55, bare: 1, beams: true });
hgwHearth(Rm.g, 0, -2.6, 0, { h: Rm.h, mat: "lime" });
hgwBed(Rm.g, -2.4, -1.6, 0, { cover: 0x6A5A3A });
hgwSea(G, -60);
hgwLandMesh(G, H, { dry: 0.3 });
hgwRoads(G, HGW_LD_ROADS, H, { w: { down: 3, glade: 3 } });
var wm = hgwStrip(G, I.ladon, 22, function (x, z) { return Math.max(H(x, z), -1.2) + 0.15; }, hgwWaterM(0x4A7A8A, 0.88), 0);
HGW.water.push(wm);
var pl = [], LL = hgwPathLen(I.ladon);
for (var s = 0; s < (lite ? 40 : 110); s++) {
var q = hgwPathAt(I.ladon, R() * LL), a = R() * 6.28, x = q.x + Math.cos(a) * (18 + R() * 14), z = q.z + Math.sin(a) * (18 + R() * 14);
pl.push({ x: x, z: z, y: H(x, z), s: 0.9 + R() * 0.5 });
}
hgwPlant(G, "poplar", pl, {});
var hu = hgwRm("ldhut");
if (hu)
hgwDoor(hu, "The door of the shepherd's hut", I.hut[0], I.hut[1] - 5, 0);
hgwGkHouse(G, I.hut[0], I.hut[1] - 8, 7, 5, 2.8, {});
if (st.hind !== "caught" && st.hind !== "gone")
hgwBeast(G, "hghind", I.bank[0] - 24, H(I.bank[0] - 24, I.bank[1] + 20), I.bank[1] + 20, 2.4, 1.55);
var G2 = I.glade, gy = H(G2[0], G2[1]);
hgwAltar(G, G2[0], G2[1] - 6, H, {});
hgwRingTrees(G, H, G2[0], G2[1], 26, 80, lite ? 24 : 60, 662, "cypress");
hgwRingTrees(G, H, I.woods[0], I.woods[1], 10, 220, lite ? 70 : 200, 663, "tree", 0x3A6A2A);
hgwRingTrees(G, H, -600, -500, 40, 400, lite ? 60 : 160, 664, "conifer");
hgwHerd(G, "sheep", 500, -200, 80, lite ? 6 : 14, H, 665);
hgwHerd(G, "goat", -500, 0, 90, lite ? 4 : 10, H, 666);
hgwGreekTrees(G, H, { clear: [[I.bank[0], I.bank[1], 40], [G2[0], G2[1], 30], [I.hut[0], I.hut[1], 30]], roads: hgwRoadList(HGW_LD_ROADS), olive: 0.6, oak: 2.4, pine: 1.4, cypress: 0.4 });
hgwCrowd("ldHut", [["An Arcadian shepherd", "m", "herd", "A deer with golden horns? I've seen it. Everyone has. No one has caught it.", "greek"], ["The shepherd's wife", "f", "gkwoman", "Artemis's own hind, that is. Leave it be, I say.", "greek"], ["A shepherd boy with pipes", "m", "herd", "Pan taught us these pipes. Listen!", "greek", true]], I.hut[0] - 20, I.hut[1] - 10, I.hut[0] + 30, I.hut[1] + 30, { wander: 5, persona: "greek" });
hgwCrowd("ldBank", [["A fisherman of the Ladon", "m", "gkman", "The Ladon is the fairest river in Arcadia. Cold, even in summer.", "greek"], ["A woman washing wool", "f", "gkwoman", "Mind the stones, they're slippery.", "greek"], ["A girl with a jar", "f", "herd", "There's a sacred glade over there. We don't go in.", "greek", true]], I.bank[0] + 10, I.bank[1] - 30, I.bank[0] + 50, I.bank[1] + 10, { wander: 4, persona: "greek" });
},
function (G) {
var H = HGW_ER_H, I = HGW_ER, lite = hgwLite(), st = HGW.st, R = wRand(681), X = HGW_ROOMXZ.erymanthus;
var Rm = hgwRoom(G, "pholus", X.pholus[0], X.pholus[1], 14, 12, { wall: "cave", floor: "beaten", ceil: "cave", h: 5, name: "Pholus' cave", lightI: 0.55, lightCol: 0xFFC890, bare: 1 });
hgwHearth(Rm.g, 0, -4.8, 0, { h: Rm.h, mat: "lime" });
hgwTable(Rm.g, 0, -1, 3, 1.2, 0.8, {});
hgwBench(Rm.g, 0, 0.4, 0, { back: false });
hgwPithos(Rm.g, 4.6, 0, -3.6, 1.6);
hgwSea(G, -60);
hgwLandMesh(G, H, { dry: 0.35, cfn: hgwSnowColour(H, 230, { dry: 0.35 }) });
hgwRoads(G, { up: I.road }, H, { w: { up: 3 } });
var C = I.cave, cy = H(C[0], C[1]);
hgwPeak(G, C[0] + 6, C[1] - 30, 34, 30, { k: 68, y: cy - 2, noCap: 1 });
hgwBox(G, 6, 5, 2, hgwLam(0x0A0806), C[0], cy + 1, C[1] - 6, 0);
var pc = hgwRm("pholus");
if (pc)
hgwDoor(pc, "Into Pholus' cave", C[0], C[1] - 4, Math.PI);
hgwFire(G, C[0] + 8, cy, C[1] + 10, 1.0);
var S = I.snow, sy = H(S[0], S[1]);
for (var d = 0; d < (lite ? 8 : 20); d++) {
var a = R() * 6.28, r = R() * 60;
hgwEll(G, hgwLam(0xF4F6FA), 4 + R() * 6, 1 + R() * 1.6, 4 + R() * 6, S[0] + Math.cos(a) * r, H(S[0] + Math.cos(a) * r, S[1] + Math.sin(a) * r), S[1] + Math.sin(a) * r, 10);
}
if (st.boar !== "bound")
hgwBeast(G, "boar", I.thicket[0] + 20, H(I.thicket[0] + 20, I.thicket[1] - 20), I.thicket[1] - 20, 2.6, 2.2);
else
hgwBeast(G, "boar", S[0] + 4, sy, S[1] + 6, 0.6, 2.2);
hgwRingTrees(G, H, I.thicket[0], I.thicket[1], 12, 120, lite ? 50 : 140, 682, "bush", 0x3A5A2A);
hgwRingTrees(G, H, 0, 0, 100, 900, lite ? 120 : 320, 683, "conifer");
hgwHerd(G, "goat", -300, 600, 80, lite ? 4 : 10, H, 684);
var cents = [[C[0] - 14, C[1] + 18, 0.6], [C[0] + 16, C[1] + 22, -0.8], [C[0] - 30, C[1] + 40, 2.4]];
if (st.centaurs !== "fled")
cents.forEach(function (q, i) { var c = hgwCentaur(690 + i, { coat: i % 2 ? 0x6A4428 : 0x8A5A34 }); c.position.set(q[0], H(q[0], q[1]), q[1]); c.rotation.y = q[2]; G.add(c); });
hgwCrowd("erPholoe", [["Pholus the Centaur", "m", "herd", "Welcome, guest! Roast meat, and good bread, and the best of the hill.", "Pholus, the kind Centaur of Pholoe, from the myths: generous, gentle, a good host, careful of the Centaurs' common wine-cask." + HGW_ERA],
["A huntsman of Psophis", "m", "gkman", "The boar came down to the vineyards again. Tore up three rows.", "greek"], ["A woodcutter", "m", "gkold", "Snow up top already. It's always winter on Erymanthus.", "greek"]], C[0] - 20, C[1] + 10, C[0] + 20, C[1] + 40, { wander: 5, persona: "greek" });
},
function (G) {
var H = HGW_SY_H, I = HGW_SY, lite = hgwLite(), st = HGW.st, R = wRand(701), X = HGW_ROOMXZ.stymphalos;
var Rm = hgwRoom(G, "syhouse", X.syhouse[0], X.syhouse[1], 9, 7, { wall: "mudbrick", floor: "beaten", h: 3.0, name: "a house in Stymphalus", lightI: 0.55, bare: 1, beams: true });
hgwHearth(Rm.g, 0, -3.2, 0, { h: Rm.h, mat: "lime" });
hgwSea(G, -60);
hgwLandMesh(G, H, { dry: 0.3 });
hgwRoads(G, HGW_SY_ROADS, H, { w: { hill: 3, north: 4 } });
var L = I.lake;
hgwWater(G, L[0], L[1], 660, 360, -0.6, 0x3A5A5A, 0.9);
var rd = [];
for (var w = 0; w < (lite ? 60 : 180); w++) {
var a = R() * 6.28, rr = 0.95 + R() * 0.3, x = L[0] + Math.cos(a) * 320 * rr, z = L[1] + Math.sin(a) * 170 * rr;
rd.push({ x: x, z: z, y: Math.max(-0.5, H(x, z)), s: 1.0 + R() * 0.8 });
}
hgwPlant(G, "reeds", rd, {});
if (st.birds !== "gone") {
hgwBirdFlock(G, L[0], 40, L[1], 260, lite ? 8 : 18, 702);
for (var b = 0; b < (lite ? 10 : 24); b++) {
var bx = I.shore[0] - 30 + R() * 80, bz = I.shore[1] - 10 + R() * 30;
hgwEll(G, hgwLam(0xE8E2D4), 0.5, 0.1, 0.14, bx, H(bx, bz) + 0.08, bz, 5);
}
}
hgwTownPack(G, H, { c: I.town, rx: 50, rz: 34, n: 22, seed: 703, roads: [HGW_SY_ROADS.north, HGW_SY_ROADS.hill], r2: 0.3, tile: 0.4, door: { key: "syhouse", name: "The door of a house in Stymphalus" }, life: true });
var Hl = I.hill;
hgwEll(G, hgwMat("greystone"), 3, 1.4, 3, Hl[0], H(Hl[0], Hl[1]) + 0.6, Hl[1], 8);
hgwRingTrees(G, H, -600, -700, 60, 500, lite ? 60 : 160, 704, "conifer");
hgwHerd(G, "goat", 500, 300, 80, lite ? 4 : 10, H, 705);
hgwHerd(G, "sheep", -500, 400, 80, lite ? 4 : 10, H, 706);
hgwGreekTrees(G, H, { clear: [[I.town[0], I.town[1], 60], [L[0], L[1], 360]], roads: hgwRoadList(HGW_SY_ROADS), olive: 1.0, oak: 1.2, pine: 1.2, cypress: 0.4 });
hgwCrowd("syTown", [["A woman of Stymphalus", "f", "gkwoman", st.birds === "gone" ? "Listen! Birds singing. Ordinary birds. I'd forgotten." : "Keep under the roofs. Their feathers come down like arrows.", "greek"], ["A fisherman of the lake", "m", "gkman", st.birds === "gone" ? "I'll take the boat out tomorrow. First time in a year." : "No one fishes the lake now. No one.", "greek"],
["An old man", "m", "gkold", "Bronze beaks, bronze claws, bronze feathers. Ares' own birds, they say.", "greek"], ["A boy in a doorway", "m", "herd", "I counted a hundred of them yesterday!", "greek", true]], I.town[0] - 40, I.town[1] - 20, I.town[0] + 40, I.town[1] + 30, { wander: 5, persona: "greek" });
},
function (G) {
var H = HGW_EL_H, I = HGW_EL, lite = hgwLite(), st = HGW.st, R = wRand(721);
hgwHallRoom(G, "augeas", HGW_ROOMXZ.elis.augeas, { name: "the hall of King Augeas in Elis", rich: true });
var Rm = hgwRoom(G, "elhouse2", HGW_ROOMXZ.elis.elhouse2[0], HGW_ROOMXZ.elis.elhouse2[1], 9, 7, { wall: "mudbrick", floor: "beaten", h: 3.0, name: "a house in Elis", lightI: 0.55, bare: 1, beams: true });
hgwHearth(Rm.g, 0, -3.2, 0, { h: Rm.h, mat: "lime" });
hgwSea(G, -60);
hgwLandMesh(G, H, { dry: 0.3 });
hgwRoads(G, HGW_EL_ROADS, H, { w: { east: 5, north: 4, south: 4 } });
[I.peneus, I.alpheus].forEach(function (rv) { var wm = hgwStrip(G, rv, 30, function (x, z) { return Math.max(H(x, z), -1.2) + 0.15; }, hgwWaterM(0x4A7A72, 0.86), 0); HGW.water.push(wm); });
var pl = [];
[I.peneus, I.alpheus].forEach(function (rv) { var LL = hgwPathLen(rv); for (var s = 0; s < (lite ? 30 : 80); s++) {
var q = hgwPathAt(rv, R() * LL), a = R() * 6.28, x = q.x + Math.cos(a) * (22 + R() * 14), z = q.z + Math.sin(a) * (22 + R() * 14);
pl.push({ x: x, z: z, y: H(x, z), s: 0.9 + R() * 0.5 });
} });
hgwPlant(G, "poplar", pl, {});
hgwStrip(G, I.trench, 8, function (x, z) { return H(x, z) - 0.6; }, hgwMat("earth"), 0.02);
if (st.trench === "flowing" || st.stables === "clean") {
var tw = hgwStrip(G, I.trench, 5, function (x, z) { return H(x, z) - 0.2; }, hgwWaterM(0x6A7A5A, 0.9), 0);
HGW.water.push(tw);
}
var S = I.stables, sy = H(S[0], S[1]), yard = [];
for (var k = 0; k <= 24; k++) {
var an = k / 24 * Math.PI * 2;
yard.push([S[0] + Math.cos(an) * 60, S[1] + Math.sin(an) * 44]);
}
hgwBigWall(G, yard, 2.6, H, { mat: "limewall", th: 0.8, gate: [[S[0] - 58, S[1] - 10, 6], [S[0], S[1] - 44, 5], [S[0], S[1] + 44, 5]] });
for (var sh = 0; sh < 4; sh++) {
var sx = S[0] - 36 + sh * 24;
hgwBox(G, 18, 0.3, 10, hgwMat("reedroof"), sx, sy + 3.4, S[1] - 30);
[-8, 8].forEach(function (q) { hgwCyl(G, 0.2, 0.2, 3.4, hgwMat("oak"), sx + q, sy, S[1] - 26, 6); });
}
if (st.stables !== "clean") {
for (var m = 0; m < (lite ? 16 : 40); m++) {
var mx = S[0] - 50 + R() * 100, mz = S[1] - 34 + R() * 68;
hgwEll(G, hgwLam(0x4A3A22), 3 + R() * 4, 0.6 + R() * 1.2, 3 + R() * 4, mx, sy, mz, 8);
}
hgwSmoke(G, S[0], sy + 2, S[1], 0x8A7A5A, lite ? 4 : 10);
}
hgwHerd(G, "cow", S[0] + 160, S[1] + 60, 120, lite ? 10 : 28, H, 722);
hgwHerd(G, "cow", -300, 300, 100, lite ? 6 : 16, H, 723);
hgwKingsHouse(G, H, { at: I.palace, ry: 0, hall: "augeas", cw: 36, cd: 26 });
hgwTownPack(G, H, { c: I.city, rx: 80, rz: 60, n: 44, seed: 724, roads: [HGW_EL_ROADS.east, HGW_EL_ROADS.south], r2: 0.35, tile: 0.4, door: { key: "elhouse2", name: "The door of a house in Elis" }, life: true, avoid: [[I.palace[0], I.palace[1], 30]] });
hgwGreekTrees(G, H, { clear: [[I.city[0], I.city[1], 100], [S[0], S[1], 80]], roads: hgwRoadList(HGW_EL_ROADS), olive: 2.6, oak: 1.0, pine: 0.6, cypress: 0.6 });
hgwCrowd("elCity", [["Phyleus, son of Augeas", "m", "prince", "My father promised you a tenth of the herds. I heard him. I will say so before any court.", "Phyleus, son of King Augeas of Elis, from the myths: honest, just, brave enough to speak against his own father." + HGW_ERA],
["A cowherd of Augeas", "m", "herd", "Three thousand head, and not a stall swept in thirty years. You can smell it from the sea.", "greek"], ["A woman of Elis", "f", "gkwoman", "The king is the richest man in Greece. And the meanest.", "greek"], ["An old man", "m", "gkold", "Two rivers run by Elis, Peneus and Alpheus. Never enough water in the town all the same.", "greek"]], I.city[0] - 50, I.city[1] - 20, I.city[0] + 60, I.city[1] + 40, { wander: 6, persona: "greek" });
},
function (G) {
var H = HGW_CR_H, I = HGW_CB, st = HGW.st, lite = hgwLite(), R = wRand(741);
var F = I.field, fy = H(F[0], F[1]);
if (st.crbull === "wild")
hgwBeast(G, "hgbull", F[0] + 14, fy, F[1] - 8, 0.8, 1.9);
else if (st.crbull === "tame")
hgwBeast(G, "hgbull", I.shore[0] - 6, H(I.shore[0] - 6, I.shore[1] + 6), I.shore[1] + 6, 2.28, 1.9);
if (st.crbull === "wild") {
for (var b = 0; b < (lite ? 5 : 12); b++) {
var bx = F[0] - 40 + R() * 80, bz = F[1] - 30 + R() * 60;
hgwEll(G, hgwLam(0x6A4A2A), 1.2 + R(), 0.3, 0.6, bx, H(bx, bz) + 0.1, bz, 6);
}
}
hgwPaling(G, [[F[0] - 60, F[1] - 40], [F[0] + 60, F[1] - 40], [F[0] + 60, F[1] + 40], [F[0] - 60, F[1] + 40]], H, {});
},
function (G) {
var H = HGW_AB_H, I = HGW_AB, lite = hgwLite(), st = HGW.st, R = wRand(761), X = HGW_ROOMXZ.abdera;
hgwHallRoom(G, "diohall", X.diohall, { name: "the hall of Diomedes, king of the Bistones", rich: true });
var Rm = hgwRoom(G, "stable", X.stable[0], X.stable[1], 18, 10, { wall: "darkstone", floor: "beaten", h: 4, name: "the stables of the man-eating mares", lightI: 0.4, lightCol: 0xE8A070, bare: 1, beams: true });
for (var m = 0; m < 4; m++) {
hgwBox(Rm.g, 2.2, 1.0, 0.8, hgwMat("bronze"), -6 + m * 4, 0, -4.2);
hgwBox(Rm.g, 0.15, 2.0, 3.2, hgwMat("iron"), -4 + m * 4, 0, -2.6);
}
if (st.mares !== "gone")
for (var k = 0; k < 4; k++)
hgwBeast(Rm.g, "hgmare", -6 + k * 4, 0, -2.4, Math.PI, 1.6);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.45 });
hgwRoads(G, HGW_AB_ROADS, H, { w: { shore: 4, stables: 4, east: 4 } });
hgwKingsHouse(G, H, { at: I.palace, ry: Math.PI, hall: "diohall", cw: 32, cd: 24, wall: "darkstone" });
hgwTownPack(G, H, { c: I.town, rx: 70, rz: 50, n: 34, seed: 762, roads: [HGW_AB_ROADS.shore, HGW_AB_ROADS.stables], r2: 0.35, tile: 0.3, life: true, avoid: [[I.palace[0], I.palace[1], 28]] });
var S = I.stables, sy = H(S[0], S[1]);
hgwBox(G, 24, 5, 12, hgwMat("darkstone"), S[0], sy, S[1]);
hgwBox(G, 25, 0.6, 13, hgwMat("reedroof"), S[0], sy + 5, S[1]);
var sb = hgwRm("stable");
if (sb)
hgwDoor(sb, "The doors of the stables, barred with bronze", S[0], S[1] + 7, 0);
if (st.mares === "shore")
hgwBeasts(G, "hgmare", I.shore[0] + 20, I.shore[1] - 30, 14, 4, H, 763, 1.6);
var T = I.tomb, ty = H(T[0], T[1]);
if (st.abderus) {
hgwEll(G, hgwLam(0x6A7A3A), 6, 2.4, 6, T[0], ty, T[1], 12);
hgwBox(G, 0.6, 2.2, 0.3, hgwMat("greystone"), T[0], ty + 2, T[1]);
}
if (st.abdera) {
var C = I.newcity, ring = [];
for (var w = 0; w <= 20; w++) {
var an = w / 20 * Math.PI * 2;
ring.push([C[0] + Math.cos(an) * 44, C[1] + Math.sin(an) * 32]);
}
hgwBigWall(G, ring, st.abdera === "built" ? 6 : 2, H, { mat: "ashlar", th: 2, tower: st.abdera === "built", gate: [[C[0] - 44, C[1], 6]] });
}
hgwHerd(G, "horse", -600, -500, 90, lite ? 5 : 12, H, 764);
hgwHerd(G, "sheep", -800, -200, 80, lite ? 5 : 12, H, 765);
hgwGreekTrees(G, H, { clear: [[I.town[0], I.town[1], 90], [S[0], S[1], 40], [T[0], T[1], 20], [I.newcity[0], I.newcity[1], 60]], roads: hgwRoadList(HGW_AB_ROADS), olive: 0.6, oak: 1.6, pine: 1.6, cypress: 0.2 });
hgwFleet(G, H, I.shore[0] + 40, I.shore[1] + 60, Math.PI / 2, lite ? 1 : 2, 10);
hgwCrowd("abTown", [["A Bistonian woman", "f", "gkwoman", "Strangers are taken to the stables. We don't ask what happens there.", "greek"], ["A Bistonian warrior", "m", "warrior", "Diomedes is the son of Ares. Mind your tongue.", "greek"],
["An old Bistonian", "m", "gkold", "The mares eat no hay. Not a stalk. Remember that, and go home.", "greek"], ["A boy with a dog", "m", "herd", "My father says the king's horses are the fastest in Thrace.", "greek", true]], I.town[0] - 50, I.town[1] - 30, I.town[0] + 50, I.town[1] + 30, { wander: 6, persona: "greek" });
hgwCrowd("abShore", [["A fisherman of the Thracian shore", "m", "sailor", "Good sand here for a ship. Good fish too.", "greek"], ["A net-mender", "f", "gkwoman", "There's always a net to mend.", "greek"], ["A Thracian boy", "m", "herd", "Is that a Greek ship? Where are you going?", "greek", true]], I.shore[0] - 30, I.shore[1] - 40, I.shore[0] + 30, I.shore[1] - 10, { wander: 5, persona: "greek" });
},
function (G) {
var H = HGW_AM_H, I = HGW_AM, lite = hgwLite(), st = HGW.st, R = wRand(781), X = HGW_ROOMXZ.themiscyra;
hgwHallRoom(G, "hiphall", X.hiphall, { name: "the hall of Hippolyte, queen of the Amazons", rich: true, queen: true });
var Rm = hgwRoom(G, "amhouse", X.amhouse[0], X.amhouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "an Amazon's house", lightI: 0.6, bare: 1, beams: true });
hgwHearth(Rm.g, 0, -3.2, 0, { h: Rm.h, mat: "lime" });
hgwShelves(Rm.g, -4, -2, 2, 2.2, Math.PI / 2, {});
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.3 });
hgwRoads(G, HGW_AM_ROADS, H, { w: { shore: 5, field: 4 } });
var wm = hgwStrip(G, I.thermodon, 30, function (x, z) { return Math.max(H(x, z), -1.2) + 0.15; }, hgwWaterM(0x4A7A72, 0.86), 0);
HGW.water.push(wm);
var T = I.town, ring = [];
for (var k = 0; k <= 24; k++) {
var an = k / 24 * Math.PI * 2;
ring.push([T[0] + Math.cos(an) * 96, T[1] + Math.sin(an) * 72]);
}
hgwBigWall(G, ring, 6, H, { mat: "ashlar", th: 2.4, tower: true, gate: [[T[0] + 94, T[1] - 10, 7], [T[0] + 10, T[1] - 72, 7]] });
hgwKingsHouse(G, H, { at: I.hall, ry: Math.PI / 2, hall: "hiphall", cw: 34, cd: 26, wall: "ashlar" });
hgwTownPack(G, H, { c: T, rx: 80, rz: 60, n: 40, seed: 782, roads: [HGW_AM_ROADS.shore, HGW_AM_ROADS.field], r2: 0.35, tile: 0.4, door: { key: "amhouse", name: "The door of an Amazon's house" }, life: true, avoid: [[I.hall[0], I.hall[1], 28], [I.temple[0], I.temple[1], 18]] });
hgwTemple(G, I.temple[0], I.temple[1] - 14, 12, 18, { ry: 0, statue: "warrior" });
hgwAltar(G, I.temple[0], I.temple[1] + 4, H, {});
hgwBeasts(G, "horse", I.field[0], I.field[1], 70, lite ? 6 : 14, H, 783, 1.0);
for (var t = 0; t < 5; t++) {
var tx = I.field[0] - 60 + t * 30, tz = I.field[1] + 60;
hgwBox(G, 0.3, 2, 0.3, hgwMat("oak"), tx, H(tx, tz), tz);
hgwEll(G, hgwLam(0xC8A858), 0.9, 0.9, 0.2, tx, H(tx, tz) + 1.6, tz, 10);
}
if (st.amShip)
hgwShip(G, I.shore[0] + 30, 0.2, I.shore[1] + 6, 1.6, { len: 22, sail: false, afloat: true });
hgwGreekTrees(G, H, { clear: [[T[0], T[1], 110], [I.field[0], I.field[1], 100]], roads: hgwRoadList(HGW_AM_ROADS), olive: 0.6, oak: 1.6, pine: 0.8, cypress: 0.4 });
var am = function (n, g) { return [n, "f", "amazon", g, "An Amazon of Themiscyra on the Thermodon, from the myths: a warlike woman, proud, a fine rider and archer, loyal to her queen Hippolyte." + HGW_ERA]; };
hgwCrowd("amTown", [am("An Amazon at the gate", "Who comes to Themiscyra? Speak, and keep your hands from your sword."), am("An Amazon archer", "I can hit a ring at a hundred paces. From horseback."), am("A young Amazon", "The queen's girdle was a gift from Ares himself!"),
["A potter, a stranger here", "m", "gkman", "They let a few of us trade here. We keep our heads down.", "greek"]], T[0] - 50, T[1] - 30, T[0] + 50, T[1] + 40, { wander: 6 });
hgwCrowd("amField", [am("An Amazon horse-tamer", "Mares of the Thermodon. None faster."), am("An Amazon riding-mistress", "Again! Lean in, lean in!"), am("Melanippe, an Amazon captain", "I lead the queen's riders. If you are a friend, ride with us. If not, ride away.")], I.field[0] - 40, I.field[1] - 30, I.field[0] + 40, I.field[1] + 30, { wander: 6 });
},
function (G) {
var st = HGW.st, R = HGW_HS.rock;
if (!st.hesione)
return;
hgwPeak(G, R[0], R[1], 5, 7, { k: 77, y: -2, noCap: 1 });
if (st.hesione === "chained") {
var w = hgwDressed("hesione", "princess", { sex: "f", hair: 0x2A1A12 });
w.position.set(R[0] + 1.6, 2.6, R[1] + 2.4);
w.rotation.y = Math.PI * 0.95;
G.add(w);
hgwBox(G, 0.06, 0.06, 1.2, hgwMat("iron"), R[0] + 1.6, 3.6, R[1] + 2.1);
}
if (st.hesione === "monster")
hgwSeaBeast(G, R[0] - 40, R[1] - 60, 0.3, false);
},
function (G) {
var H = HGW_PI_H, I = HGW_PI, lite = hgwLite(), st = HGW.st, R = wRand(801);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.7, rock: 120 });
hgwRoads(G, HGW_PI_ROADS, H, { w: { calpe: 3 } });
var C = I.calpe, A = I.abyla;
if (st.pillars) {
hgwPillar(G, C[0], H(C[0], C[1]) - 1, C[1], st.pillars === "raised" ? 40 : 12);
hgwPillar(G, A[0], H(A[0], A[1]) - 1, A[1], st.pillars === "raised" ? 40 : 12);
}
else {
hgwEll(G, hgwMat("greystone"), 3, 1.5, 6, C[0] - 10, H(C[0] - 10, C[1] + 10) + 0.5, C[1] + 10, 10);
}
if (st.suncup)
hgwSunCup(G, I.beach[0] + 20, 0.1, I.beach[1] + 6, 1.35);
var Cp = I.camp;
hgwFire(G, Cp[0], H(Cp[0], Cp[1]), Cp[1], 0.9);
hgwBox(G, 3, 1.6, 2.4, hgwLam(0xB8A27A), Cp[0] + 6, H(Cp[0] + 6, Cp[1] - 4), Cp[1] - 4, 0.3);
hgwHerd(G, "goat", -600, -800, 120, lite ? 4 : 10, H, 802);
hgwGreekTrees(G, H, { clear: [[Cp[0], Cp[1], 30], [C[0], C[1], 30]], roads: hgwRoadList(HGW_PI_ROADS), olive: 0.8, oak: 0.6, pine: 1.4, cypress: 0.2, palm: 0.4 });
hgwCrowd("piCamp", [["One of Heracles' companions", "m", "warrior", "No man has sailed further west than this. Beyond is the Ocean.", "greek"], ["A shepherd of the straits", "m", "herd", "The sun sets out there, in the Ocean. Hot as a forge here, even so.", "greek"], ["A companion cooking", "m", "sailor", "Fish again. There's always fish.", "greek"]], Cp[0] - 20, Cp[1] - 14, Cp[0] + 20, Cp[1] + 14, { wander: 4, persona: "greek" });
},
function (G) {
var H = HGW_ET_H, I = HGW_ET, lite = hgwLite(), st = HGW.st, R = wRand(821);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.2, cfn: hgwHeroColour(H, { dry: 0.2, cliffCol: [0.62, 0.32, 0.22] }) });
if (st.suncup === "erytheia")
hgwSunCup(G, I.shore[0] - 12, 0.1, I.shore[1] + 14, -0.69);
if (st.suncup === "iberia")
hgwSunCup(G, I.iberia[0] - 12, 0.1, I.iberia[1] + 10, -1.17);
if (st.oxen !== "iberia")
hgwBeasts(G, "hgox", I.pasture[0], I.pasture[1], 50, lite ? 6 : 14, H, 822, 1.2);
else
hgwBeasts(G, "hgox", I.iberia[0] + 40, I.iberia[1] - 40, 40, lite ? 6 : 14, H, 823, 1.2);
var F = I.fold, fy = H(F[0], F[1]), ring = [];
for (var k = 0; k <= 14; k++) {
var an = k / 14 * Math.PI * 2;
ring.push([F[0] + Math.cos(an) * 16, F[1] + Math.sin(an) * 12]);
}
hgwBigWall(G, ring, 1.4, H, { mat: "limewall", th: 0.6, gate: [[F[0], F[1] + 12, 3]] });
if (st.orthrus !== "gone")
hgwBeast(G, "hgorthrus", F[0] + 4, fy, F[1] + 18, 0, 1.7);
hgwGreekTrees(G, H, { clear: [[I.pasture[0], I.pasture[1], 60], [F[0], F[1], 20]], olive: 0.4, oak: 0.4, pine: 1.4, cypress: 0.2, palm: 0.6 });
hgwCrowd("etFold", [["Eurytion, Geryon's herdsman", "m", "giant", "These are Geryon's cattle. Red as the sunset. Turn back.", "Eurytion, the giant herdsman of Geryon on the red island Erytheia, from the myths: huge, surly, loyal to his master." + HGW_ERA], ["A herd-boy of Erytheia", "m", "herd", "Orthrus has two heads. Both of them bite.", "greek", true], ["A woman of Gades, come to trade", "f", "gkwoman", "Phoenician ships come here for silver. Nobody comes for the cattle.", "greek"]], F[0] - 10, F[1] + 18, F[0] + 30, F[1] + 40, { wander: 4, persona: "greek" });
hgwCrowd("etIberia", [["An Iberian herdsman", "m", "herd", "You swam the cattle over? All of them?", "greek"], ["An Iberian woman", "f", "gkwoman", "Where are you driving them? Greece? That's the other end of the world.", "greek"], ["An Iberian boy", "m", "herd", "Red cattle! I've never seen red cattle!", "greek", true]], I.iberia[0] - 10, I.iberia[1] - 40, I.iberia[0] + 40, I.iberia[1] - 10, { wander: 4, persona: "greek" });
},
function (G) {
var H = HGW_CH_H, C = HGW_PM.crag, st = HGW.st;
if (!st.prometheus)
return;
var cy = H(C[0], C[1]);
hgwPeak(G, C[0] + 8, C[1] - 10, 14, 26, { k: 91, y: cy - 2, noCap: 1 });
[-1, 1].forEach(function (s) { hgwCyl(G, 0.08, 0.08, 4, hgwMat("iron"), C[0] + s * 2, cy + 6, C[1] - 1, 6); });
if (st.prometheus !== "free" && st.eagle !== "shot")
hgwEagle(G, C[0] + 4, cy + 12, C[1] - 6, 0.4, 2.2);
},
function (G) {
var H = HGW_ATL_H, I = HGW_HP, st = HGW.st, lite = hgwLite(), R = wRand(841);
if (!st.hesperides)
return;
var D = I.dragon, dy = H(D[0], D[1]);
if (st.dragon !== "gone")
hgwGroveSerpent(G, D[0], dy, D[1], st.dragon === "asleep").scale.setScalar(1.6);
var S = I.sands, sy = H(S[0], S[1]);
hgwEll(G, hgwLam(0xE0C890), 30, 0.3, 18, S[0], sy - 0.2, S[1], 12);
var K = I.rocks;
for (var r = 0; r < (lite ? 4 : 8); r++) {
var a = R() * 6.28;
hgwEll(G, hgwMat("darkrock"), 2 + R() * 2, 1 + R() * 1.4, 2 + R() * 2, K[0] + Math.cos(a) * 8, H(K[0], K[1]) + 0.4, K[1] + Math.sin(a) * 8, 8);
}
},
function (G) {
var H = HGW_TA_H, I = HGW_TA, lite = hgwLite(), st = HGW.st, R = wRand(861);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.7, rock: 60 });
hgwRoads(G, { cave: I.road }, H, { w: { cave: 3 } });
hgwTemple(G, I.temple[0] + 10, I.temple[1], 10, 14, { ry: Math.PI / 2, statue: "warrior" });
hgwAltar(G, I.temple[0] - 6, I.temple[1], H, {});
var C = I.cave, cy = H(C[0], C[1]);
hgwPeak(G, C[0] + 4, C[1] + 16, 18, 22, { k: 93, y: cy - 2, noCap: 1 });
hgwBox(G, 5, 5, 3, hgwLam(0x040303), C[0], cy + 0.6, C[1] + 6, 0.1);
hgwSmoke(G, C[0], cy + 4, C[1] + 6, 0x2A2624, lite ? 4 : 10);
hgwBoat(G, I.cove[0] - 6, 0.2, I.cove[1] + 4, 1.2, {});
hgwBoat(G, I.cove[0] - 10, 0.2, I.cove[1] - 6, 1.6, {});
hgwTownPack(G, H, { c: I.village, rx: 34, rz: 24, n: 12, seed: 862, roads: [], r2: 0.3, tile: 0.3, life: true });
hgwHerd(G, "goat", 0, -400, 80, lite ? 4 : 10, H, 863);
hgwGreekTrees(G, H, { clear: [[I.temple[0], I.temple[1], 30], [C[0], C[1], 20], [I.village[0], I.village[1], 40]], roads: [I.road], olive: 0.8, oak: 0.2, pine: 0.6, cypress: 0.4 });
hgwCrowd("taVillage", [["A fisherman of Taenarum", "m", "sailor", "That cave goes down further than any line. The old men say it goes to Hades.", "greek"], ["A priest of Poseidon", "m", "gkold", "The god shakes this cape. The cave breathes cold even at noon.", "greek"], ["A woman gutting fish", "f", "gkwoman", "We don't go near the cave after dark.", "greek"], ["A goat-boy", "m", "herd", "I threw a stone in once. I never heard it land.", "greek", true]], I.village[0] - 30, I.village[1] - 20, I.village[0] + 30, I.village[1] + 20, { wander: 5, persona: "greek" });
},
function (G) {
var st = HGW.st;
if (!st.underworld)
return;
var H = HGW_OC_H, gx = -140, gz = -176, gy = H(gx, gz);
[-1, 1].forEach(function (s) { hgwBox(G, 1.6, 9, 1.6, hgwMat("darkstone"), gx + s * 4, gy, gz); });
hgwBox(G, 10, 1.4, 2, hgwMat("darkstone"), gx, gy + 9, gz);
if (!st.gatesOpen) {
hgwBox(G, 3.2, 8, 0.2, hgwMat("bronze"), gx - 1.6, gy, gz);
hgwBox(G, 3.2, 8, 0.2, hgwMat("bronze"), gx + 1.6, gy, gz);
}
var rx = -200, rz = -150, ry0 = H(rx, rz);
hgwEll(G, hgwMat("darkrock"), 3.4, 1.2, 2.4, rx, ry0 + 0.5, rz, 10);
var ax = -212, az = -120;
if (!st.ascalaphus)
hgwEll(G, hgwMat("greystone"), 2.4, 1.6, 2.0, ax, H(ax, az) + 1, az, 10);
else
hgwEll(G, hgwMat("greystone"), 2.4, 1.6, 2.0, ax - 4, H(ax - 4, az) + 0.6, az + 2, 10);
if (st.cerberus === "there")
hgwBeast(G, "cerberus", -168, H(-168, -140), -140, 0.5, 2.6);
},
function (G) {
var H = HGW_DL_H, I = HGW_DL, lite = hgwLite(), st = HGW.st, R = wRand(881), X = HGW_ROOMXZ.delphi;
var Rm = hgwRoom(G, "adyton", X.adyton[0], X.adyton[1], 12, 14, { wall: "ashlar", floor: "gkfloor", h: 6, name: "the inner shrine of Apollo, where the Pythia sits", lightI: 0.45, lightCol: 0xFFD8A0, bare: 1 });
if (st.tripod !== "taken")
hgwTripod(Rm.g, 0, 0, -4);
hgwSmoke(Rm.g, 0, 0.4, -4, 0xB8B0A0, lite ? 4 : 8);
hgwEll(Rm.g, hgwMat("greystone"), 0.8, 0.9, 0.8, 3, 0.5, -5, 10);
Rm = hgwRoom(G, "dlhouse", X.dlhouse[0], X.dlhouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a pilgrims' lodging at Delphi", lightI: 0.6, bare: 1, beams: true });
hgwHearth(Rm.g, 0, -3.2, 0, { h: Rm.h, mat: "lime" });
hgwBed(Rm.g, -3, -2, 0, {});
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.45, rock: 200 });
hgwRoads(G, { up: I.road, way: I.way }, H, { w: { up: 4, way: 4 } });
var T = I.temple;
hgwTerraceWall(G, [[T[0] - 40, T[1] + 22], [T[0] + 50, T[1] + 22]], H);
hgwTemple(G, T[0], T[1] - 6, 14, 28, { ry: 0, statue: "apollo" });
hgwAltar(G, T[0], T[1] + 16, H, {});
var ad = hgwRm("adyton");
if (ad)
hgwDoor(ad, "The doors of the temple of Apollo", T[0], T[1] + 8, Math.PI);
var S = I.spring, sy = H(S[0], S[1]);
hgwWater(G, S[0], S[1], 8, 5, sy + 0.2, 0x5A8AA0, 0.85);
hgwSpot(S[0], S[1], 5, "The Castalian spring", "wash", function () { hgbSay && hgbSay("💧 Cold water from under the shining cliffs."); });
hgwEll(G, hgwMat("greystone"), 5, 3, 2, S[0], sy + 1.4, S[1] - 6, 10);
for (var t = 0; t < (lite ? 4 : 8); t++) {
var tx = -40 + t * 14, tz = -110 - t * 8;
hgwGkHouse(G, tx, tz, 5, 4, 3.2, {});
}
var dh = hgwRm("dlhouse");
if (dh)
hgwDoor(dh, "The door of the pilgrims' lodging", -40, -107.6, 0);
var Th = I.theatre, thy = H(Th[0], Th[1]);
for (var r = 0; r < 6; r++) {
var a = new THREE.Mesh(hgwGeo("dlth" + r, function () { return new THREE.RingGeometry(10 + r * 2, 11.4 + r * 2, 24, 1, Math.PI * 0.1, Math.PI * 0.8); }), hgwMat("lime"));
a.rotation.x = -Math.PI / 2;
a.position.set(Th[0], thy + r * 0.6 + 0.2, Th[1]);
G.add(a);
}
hgwPlant(G, "olive", (function () { var o = []; for (var k = 0; k < (lite ? 60 : 180); k++) {
var x = -900 + R() * 900, z = 0 + R() * 600;
if (H.sd(x, z) < 20 || Math.hypot(x + 772, z - 452) < 30)
continue;
o.push({ x: x, z: z, y: H(x, z), s: 0.9 + R() * 0.4 });
} return o; })(), {});
hgwGreekTrees(G, H, { clear: [[T[0], T[1], 60], [S[0], S[1], 14], [Th[0], Th[1], 30], [-772, 452, 30]], roads: [I.road, I.way], olive: 2.0, oak: 0.4, pine: 1.2, cypress: 1.2 });
hgwCrowd("dlWay", [["A pilgrim from Athens", "m", "gkman", "I've come to ask the god if I should marry. Three days' walk.", "greek"], ["A pilgrim woman", "f", "gkveiled", "Wash at the Castalian spring before you go up. Everyone must.", "greek"], ["A temple servant with a broom", "m", "gkold", "The Pythia sits on the tripod over the cleft. The god speaks through her.", "greek"],
["A seller of laurel", "f", "gkwoman", "Laurel! Apollo's own laurel!", "greek"], ["A pilgrim boy", "m", "herd", "They say the stone over there is the navel of the whole world.", "greek", true]], I.way[0][0] - 30, I.way[0][1] - 50, I.way[0][0] + 50, I.way[0][1] + 20, { wander: 5, persona: "greek" });
},
function (G) {
var H = HGW_SD_H, I = HGW_SD, lite = hgwLite(), st = HGW.st, R = wRand(901), X = HGW_ROOMXZ.sardis;
var Rm = hgwHallRoom(G, "omphale", X.omphale, { name: "the hall of Omphale, queen of Lydia", rich: true, queen: true });
var Om = hgwRm("omphale");
if (Om && Om.g) {
for (var b = 0; b < 5; b++) {
hgwPithos(Om.g, -8 + b * 1.4, 0, 6, 0.5);
hgwEll(Om.g, hgwLam(0xF0E8DC), 0.4, 0.3, 0.4, -8 + b * 1.4, 0.7, 6, 8);
}
hgwLoom(Om.g, 8, 4, -Math.PI / 2, 0x6A2A8A);
hgwRug(Om.g, 0, 2, 6, 4, 0x6A2A8A);
}
Rm = hgwRoom(G, "sdhouse", X.sdhouse[0], X.sdhouse[1], 9, 7, { wall: "mudbrick", floor: "beaten", h: 3.0, name: "a house in Sardis", lightI: 0.6, bare: 1, beams: true });
hgwHearth(Rm.g, 0, -3.2, 0, { h: Rm.h, mat: "lime" });
hgwRug(Rm.g, 0, 0, 3, 2, 0xB83A2A);
hgwSea(G, -60);
hgwLandMesh(G, H, { dry: 0.5 });
hgwRoads(G, HGW_SD_ROADS, H, { w: { main: 6, market: 4 } });
var wm = hgwStrip(G, I.pactolus, 18, function (x, z) { return Math.max(H(x, z), -1.0) + 0.12; }, hgwWaterM(0x8A8A5A, 0.86), 0);
HGW.water.push(wm);
var sn = hgwStrip(G, I.pactolus, 28, function (x, z) { return H(x, z) + 0.02; }, hgwLam(0xD8B860), 0.0);
var A = I.acro, ring = [];
for (var k = 0; k <= 20; k++) {
var an = k / 20 * Math.PI * 2;
ring.push([A[0] + Math.cos(an) * 60, A[1] + Math.sin(an) * 44]);
}
hgwBigWall(G, ring, 7, H, { mat: "ashlar", th: 2.4, tower: true, gate: [[A[0], A[1] - 44, 6]] });
hgwKingsHouse(G, H, { at: I.palace, ry: Math.PI, hall: "omphale", cw: 40, cd: 30, wall: "ashlar" });
hgwTownPack(G, H, { c: I.town, rx: 100, rz: 76, n: 60, seed: 902, roads: [HGW_SD_ROADS.main, HGW_SD_ROADS.market], r2: 0.35, tile: 0.5, door: { key: "sdhouse", name: "The door of a house in Sardis" }, life: true, avoid: [[I.palace[0], I.palace[1], 34]] });
[[-80, 40], [-50, 70], [-30, 40]].forEach(function (q) { hgwStall(G, q[0], q[1], 0, H, {}); });
var vin = [];
for (var vr = 0; vr < 10; vr++)
for (var vc = 0; vc < 20; vc++) {
var vx = 200 + vc * 3, vz = -200 + vr * 3.4;
vin.push({ x: vx, z: vz, y: H(vx, vz) });
}
hgwPlant(G, "vine", vin, { keepAll: true });
hgwHerd(G, "horse", 400, -300, 90, lite ? 5 : 12, H, 903);
hgwHerd(G, "sheep", -500, -400, 90, lite ? 5 : 12, H, 904);
hgwGreekTrees(G, H, { clear: [[I.town[0], I.town[1], 120], [A[0], A[1], 70]], roads: hgwRoadList(HGW_SD_ROADS), olive: 1.6, oak: 1.0, pine: 0.8, cypress: 1.0 });
var ly = function (n, s, g, c) { return [n, s, s === "f" ? "lydian" : "gkman", g, "A Lydian of Sardis, from the myths: rich, fond of music and fine clothes, proud of the gold of the Pactolus and of the first coins." + HGW_ERA, c]; };
hgwCrowd("sdTown", [ly("A Lydian merchant", "m", "Gold from the river, wool from the hills, purple from the coast. Everything is for sale in Sardis."), ly("A Lydian lady", "f", "The queen has bought a new slave. A big one, they say. Very big."),
ly("A Lydian flute-player", "m", "Lydian music is the softest in the world. Listen."), ly("A Lydian girl with a basket", "f", "Have you seen a coin? Look, a lion's head on it!", true), ["A Greek trader", "m", "sailor", "They'll sell you anything here, friend. Even a hero.", "greek"]], I.town[0] - 70, I.town[1] - 40, I.town[0] + 60, I.town[1] + 50, { wander: 6 });
hgwCrowd("sdPactolus", [ly("A gold-washer", "m", "Swirl the sand, let the water take the light grains. See it shine?"), ly("A washer-woman", "f", "They say a king bathed here once and left all his gold in the river."), ["A Lydian boy", "m", "herd", "I found a grain this big once! Well, nearly.", "greek", true]], I.pactolus[3][0] - 20, I.pactolus[3][1] - 30, I.pactolus[3][0] + 30, I.pactolus[3][1] + 30, { wander: 4 });
},
function (G) {
var H = HGW_CA_H, I = HGW_CA, lite = hgwLite(), st = HGW.st, R = wRand(921), X = HGW_ROOMXZ.calydon;
hgwHallRoom(G, "oeneus", X.oeneus, { name: "the hall of King Oeneus in Calydon", rich: true, queen: true });
var Rm = hgwRoom(G, "cahouse", X.cahouse[0], X.cahouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a house in Calydon", lightI: 0.6, bare: 1, beams: true });
hgwHearth(Rm.g, 0, -3.2, 0, { h: Rm.h, mat: "lime" });
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.4 });
hgwRoads(G, { road: I.road }, H, { w: { road: 4 } });
var wm = hgwStrip(G, I.evenus, 30, function (x, z) { return Math.max(H(x, z), -1.2) + 0.15; }, hgwWaterM(0x4A7A8A, 0.86), 0);
HGW.water.push(wm);
var T = I.town, ring = [];
for (var k = 0; k <= 22; k++) {
var an = k / 22 * Math.PI * 2;
ring.push([T[0] + Math.cos(an) * 80, T[1] + Math.sin(an) * 60]);
}
hgwBigWall(G, ring, 6, H, { mat: "cyclopean", th: 2.6, tower: true, gate: [[T[0] - 78, T[1] + 14, 6]] });
hgwKingsHouse(G, H, { at: I.palace, ry: -Math.PI / 2, hall: "oeneus", cw: 34, cd: 24 });
hgwTownPack(G, H, { c: T, rx: 70, rz: 50, n: 36, seed: 922, roads: [I.road.slice(0, 2)], r2: 0.35, tile: 0.4, door: { key: "cahouse", name: "The door of a house in Calydon" }, life: true, avoid: [[I.palace[0], I.palace[1], 28]] });
var vin = [];
for (var vr = 0; vr < 10; vr++)
for (var vc = 0; vc < 20; vc++) {
var vx = 380 + vc * 3, vz = -200 + vr * 3.4;
vin.push({ x: vx, z: vz, y: H(vx, vz) });
}
hgwPlant(G, "vine", vin, { keepAll: true });
var F = I.ford;
for (var s = 0; s < 6; s++)
hgwEll(G, hgwMat("greystone"), 0.8, 0.3, 0.6, F[0] - 6 - s * 5, H(F[0] - 6 - s * 5, F[1] - 2) + 0.1, F[1] - 2 + (s % 2), 6);
if (st.nessus === "there") {
var c = hgwCentaur(931, { coat: 0x5A3A22 });
c.position.set(F[0] - 8, H(F[0] - 8, F[1] + 6), F[1] + 6);
c.rotation.y = Math.PI / 2;
G.add(c);
}
var pl = [], LL = hgwPathLen(I.evenus);
for (var p = 0; p < (lite ? 30 : 80); p++) {
var q = hgwPathAt(I.evenus, R() * LL), a = R() * 6.28, x = q.x + Math.cos(a) * (20 + R() * 14), z = q.z + Math.sin(a) * (20 + R() * 14);
pl.push({ x: x, z: z, y: H(x, z), s: 0.9 + R() * 0.5 });
}
hgwPlant(G, "poplar", pl, {});
hgwHerd(G, "cow", 200, 300, 90, lite ? 5 : 12, H, 924);
hgwHerd(G, "sheep", 0, -500, 90, lite ? 5 : 12, H, 925);
hgwGreekTrees(G, H, { clear: [[T[0], T[1], 100], [I.field[0], I.field[1], 60], [F[0], F[1], 30]], roads: [I.road], olive: 2.0, oak: 1.4, pine: 1.0, cypress: 0.4 });
hgwCrowd("caTown", [["A Calydonian woman", "f", "gkwoman", "Our princess Deianeira drives a chariot and knows the arts of war. And she's beautiful besides.", "greek"], ["King Oeneus' wine-steward", "m", "gkman", "Oeneus was the first in Greece to grow the vine. Dionysus himself taught him.", "greek"],
["An old huntsman", "m", "gkold", "I was at the great boar-hunt. Meleager's hunt. There'll never be another like it.", "greek"], ["A boy with a goat", "m", "herd", "The river-god wants to marry the princess! A river!", "greek", true]], T[0] - 60, T[1] - 30, T[0] + 40, T[1] + 40, { wander: 6, persona: "greek" });
hgwCrowd("caFord", [["A traveller waiting at the ford", "m", "gkman", "Nessus charges a fee to carry you over. Expensive, but the river's deep in spring.", "greek"], ["A woman with a bundle", "f", "gkwoman", "I'll wait for the water to go down, thank you.", "greek"], ["A shepherd", "m", "herd", "My sheep swim it. I don't.", "greek"]], F[0] + 10, F[1] - 20, F[0] + 40, F[1] + 20, { wander: 4, persona: "greek" });
},
function (G) {
var H = HGW_OE_H, I = HGW_OE, lite = hgwLite(), st = HGW.st, R = wRand(941), X = HGW_ROOMXZ.oeta;
hgwHallRoom(G, "ceyx", X.ceyx, { name: "the hall of King Ceyx in Trachis", rich: true, queen: true });
var Rm = hgwRoom(G, "deianeira", X.deianeira[0], X.deianeira[1], 10, 8, { wall: "whitewash", floor: "beaten", h: 3.2, name: "Deianeira's chamber in Trachis", lightI: 0.55, bare: 1, beams: true });
hgwLoom(Rm.g, 3.6, -2.8, -Math.PI / 2, 0xE8E2D8);
hgwBed(Rm.g, -3, -2.4, 0, { cover: 0x6A2A4A });
hgwChest(Rm.g, 0, 0, -3.4, 0, {});
hgwSea(G, -60);
hgwLandMesh(G, H, { dry: 0.4, cfn: hgwSnowColour(H, 520, { dry: 0.4 }) });
hgwRoads(G, { path: I.path }, H, { w: { path: 3 } });
var T = I.trachis, ring = [];
for (var k = 0; k <= 20; k++) {
var an = k / 20 * Math.PI * 2;
ring.push([T[0] + Math.cos(an) * 70, T[1] + Math.sin(an) * 54]);
}
hgwBigWall(G, ring, 5, H, { mat: "cyclopean", th: 2.4, tower: true, gate: [[T[0] - 40, T[1] + 44, 6]] });
hgwKingsHouse(G, H, { at: I.palace, ry: 0, hall: "ceyx", cw: 30, cd: 22 });
var dh = hgwRm("deianeira");
if (dh)
hgwDoor(dh, "The door of Deianeira's chamber", I.palace[0] + 20, I.palace[1] + 14, Math.PI / 2);
hgwTownPack(G, H, { c: T, rx: 60, rz: 44, n: 28, seed: 942, roads: [I.path.slice(0, 2)], r2: 0.35, tile: 0.4, life: true, avoid: [[I.palace[0], I.palace[1], 26]] });
var P = I.pyre, py = H(P[0], P[1]);
if (st.pyre) {
if (st.pyre !== "ash")
for (var l = 0; l < 8; l++) {
var lg = hgwCyl(G, 0.3, 0.3, 5, hgwMat("darkbark"), P[0], py + 0.4 + l * 0.5, P[1], 8);
lg.rotation.z = Math.PI / 2;
lg.rotation.y = l * 0.8;
}
if (st.pyre === "burning") {
hgwFire(G, P[0], py + 2, P[1], 3.2);
hgwSmoke(G, P[0], py + 6, P[1], 0x5A5048, lite ? 10 : 24);
}
if (st.pyre === "ash")
hgwEll(G, hgwLam(0x2A2622), 4, 0.3, 4, P[0], py, P[1], 10);
}
hgwRingTrees(G, H, 0, 500, 100, 700, lite ? 120 : 320, 943, "conifer");
hgwHerd(G, "goat", 400, 300, 80, lite ? 4 : 10, H, 944);
hgwHerd(G, "sheep", 900, 300, 90, lite ? 5 : 12, H, 945);
hgwGreekTrees(G, H, { clear: [[T[0], T[1], 90], [P[0], P[1], 30]], roads: [I.path], olive: 1.2, oak: 1.6, pine: 1.0, cypress: 0.4 });
hgwCrowd("oeTrachis", [["King Ceyx of Trachis", "m", "king", "Heracles is my friend, and his family is welcome under my roof as long as they need it.", "Ceyx, king of Trachis, from the myths: a kind host, an old friend of Heracles." + HGW_ERA], ["A woman of Trachis", "f", "gkwoman", "The lady Deianeira waits every day for news from Euboea.", "greek"],
["A Trachinian herdsman", "m", "herd", "Oeta's the mountain of storms. Look at the cloud on it.", "greek"], ["Hyllus' playmate", "m", "herd", "Hyllus can throw a javelin as far as a man!", "greek", true]], T[0] - 40, T[1] - 30, T[0] + 40, T[1] + 40, { wander: 5, persona: "greek" });
hgwCrowd("oeMid", [["A woodcutter of Oeta", "m", "gkman", "Oak and wild olive burn the hottest. Ask any woodcutter.", "greek"], ["A shepherd of Oeta", "m", "herd", "From the top you can see the sea, and Euboea across it.", "greek"], ["A charcoal-burner", "m", "gkold", "My kiln's been smoking three days. Mind the path.", "greek"]], I.mid[0] - 20, I.mid[1] - 20, I.mid[0] + 20, I.mid[1] + 20, { wander: 4, persona: "greek" });
},
function (G) {
var H = HGW_ED_H, I = HGW_ED, lite = hgwLite(), st = HGW.st, R = wRand(961);
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.15 });
hgwRoads(G, { farm: [[-560, -180], [-400, -60], [-280, 80]] }, H, { w: { farm: 3 } });
var wm = hgwStrip(G, I.river, 46, function (x, z) { return Math.max(H(x, z), -1.4) + 0.15; }, hgwWaterM(0x5A7A6A, 0.88), 0);
HGW.water.push(wm);
var pl = [], LL = hgwPathLen(I.river);
for (var s = 0; s < (lite ? 50 : 140); s++) {
var q = hgwPathAt(I.river, R() * LL), a = R() * 6.28, x = q.x + Math.cos(a) * (30 + R() * 20), z = q.z + Math.sin(a) * (30 + R() * 20);
pl.push({ x: x, z: z, y: H(x, z), s: 1.0 + R() * 0.5 });
}
hgwPlant(G, "poplar", pl, {});
var rd = [];
for (var w = 0; w < (lite ? 40 : 120); w++) {
var q2 = hgwPathAt(I.river, R() * LL), a2 = R() * 6.28, x2 = q2.x + Math.cos(a2) * (22 + R() * 6), z2 = q2.z + Math.sin(a2) * (22 + R() * 6);
rd.push({ x: x2, z: z2, y: Math.max(-0.4, H(x2, z2)), s: 1.0 + R() * 0.6 });
}
hgwPlant(G, "reeds", rd, {});
var M = I.meadow, fl = [];
for (var f = 0; f < (lite ? 50 : 140); f++) {
var fa = R() * 6.28, fd = R() * 36;
fl.push({ x: M[0] + Math.cos(fa) * fd, z: M[1] + Math.sin(fa) * fd, y: H(M[0] + Math.cos(fa) * fd, M[1] + Math.sin(fa) * fd), s: 0.9 + R() * 0.5 });
}
hgwPlant(G, "flowers", fl, { keepAll: true });
var rk = hgwEll(G, hgwMat("greystone"), 1.6, 0.8, 1.2, M[0] + 12, H(M[0] + 12, M[1] - 8) + 0.3, M[1] - 8, 8);
if (st.rockSplit) {
rk.scale.set(0.5, 0.5, 0.5);
for (var p = 0; p < 5; p++)
hgwEll(G, hgwMat("greystone"), 0.5, 0.3, 0.4, M[0] + 10 + R() * 5, H(M[0] + 12, M[1] - 8) + 0.2, M[1] - 10 + R() * 5, 6);
}
var K = I.rocks, ky = H(K[0], K[1]);
hgwPeak(G, K[0] - 10, K[1] + 16, 16, 12, { k: 97, y: ky - 2, noCap: 1 });
hgwPlant(G, "bush", [{ x: K[0] - 6, z: K[1] + 8, y: ky + 3, s: 1.2 }, { x: K[0] - 12, z: K[1] + 4, y: ky + 4, s: 1.0 }, { x: K[0] - 2, z: K[1] + 12, y: ky + 2, s: 1.1 }], { col: 0x4A7A3A });
hgwGkHouse(G, I.farm[0], I.farm[1], 8, 6, 3, {});
hgwHerd(G, "cow", I.farm[0] + 40, I.farm[1] + 40, 60, lite ? 4 : 10, H, 962);
hgwHerd(G, "sheep", -900, 300, 80, lite ? 5 : 12, H, 963);
var corn = [];
for (var c = 0; c < (lite ? 60 : 180); c++) {
var cx = -800 + R() * 500, cz = -500 + R() * 300;
corn.push({ x: cx, z: cz, y: H(cx, cz), s: 1.2 + R() * 0.5 });
}
hgwPlant(G, "grass", corn, { col: 0xC8A848 });
hgwGreekTrees(G, H, { clear: [[M[0], M[1], 50], [I.farm[0], I.farm[1], 40], [I.beach[0], I.beach[1], 30]], olive: 0.4, oak: 1.4, pine: 1.0, cypress: 0.4 });
var ny = function (n, g) { return [n, "f", "nymph", g, "One of the maidens by the river Eridanus, nymphs, daughters of Zeus and Themis (Hawthorne's damsels): merry, kind, fond of flowers, songs and dances, anxious for heroes who go seeking the golden apples." + HGW_ERA]; };
if (st.maidens !== "gone")
hgwCrowd("edMeadow", [ny("A maiden twining a wreath", "The garden of the Hesperides! We thought mortals had been weary of seeking it."), ny("A maiden with a basket of grapes", "Sit down, and eat. Heroes are always hungry."), ny("The youngest maiden", "We do not wish the dragon with the hundred heads to eat you up!"), ny("A maiden singing", "Shall we dance? We always dance when a hero comes.")], M[0] - 20, M[1] - 20, M[0] + 20, M[1] + 20, { wander: 4 });
hgwCrowd("edFarm", [["A farmer of the Eridanus", "m", "herd", "Best soil in the world, this. The river brings it down every spring.", "greek"], ["The farmer's wife", "f", "gkwoman", "Amber washes up at the river-mouth. Tears of the Sun's daughters, they say.", "greek"], ["A farm boy", "m", "herd", "There's an old man asleep on the rocks by the sea. He smells of fish!", "greek", true]], I.farm[0] - 20, I.farm[1] - 10, I.farm[0] + 30, I.farm[1] + 30, { wander: 5, persona: "greek" });
},
function (P, x, y, z, ry, s, mat, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.scale.setScalar(s || 1);
P.add(g);
var robe = new THREE.Mesh(hgwGeo("idrobe" + (o.male ? 1 : 0), function () { var p = [], m = o.male; [[0, 0], [0.36, 0], [0.34, 0.1], [0.27, 0.55], m ? [0.22, 0.9] : [0.2, 0.9], [0.2, 1.1], [0.22, 1.25], [0.17, 1.38], [0.07, 1.42], [0, 1.42]].forEach(function (q) { p.push(new THREE.Vector2(q[0], q[1])); }); return new THREE.LatheGeometry(p, 24); }), mat);
g.add(robe);
var head = new THREE.Mesh(hgwGeo("idhead", function () { return new THREE.SphereGeometry(0.11, 16, 12); }), mat);
head.position.y = 1.56;
head.scale.set(0.9, 1.1, 0.95);
g.add(head);
var neck = new THREE.Mesh(hgwGeo("idneck", function () { return new THREE.CylinderGeometry(0.045, 0.055, 0.12, 10); }), mat);
neck.position.y = 1.44;
g.add(neck);
var hair = new THREE.Mesh(hgwGeo("idhair", function () { return new THREE.SphereGeometry(0.075, 10, 8); }), mat);
hair.position.set(0, 1.6, -0.1);
g.add(hair);
[-1, 1].forEach(function (sd) {
var up = new THREE.Mesh(hgwGeo("idarm", function () { return new THREE.CylinderGeometry(0.04, 0.035, 0.34, 8); }), mat);
up.position.set(sd * 0.2, 1.2, 0);
up.rotation.z = sd * 0.25;
g.add(up);
var lo = new THREE.Mesh(hgwGeo("idarm2", function () { return new THREE.CylinderGeometry(0.034, 0.03, 0.3, 8); }), mat);
lo.position.set(sd * 0.25, 1.0, 0.1);
lo.rotation.x = -1.1;
g.add(lo);
});
if (o.attr === "lyre") {
[-1, 1].forEach(function (sd) { var h = new THREE.Mesh(hgwGeo("idlyreh", function () { return new THREE.TorusGeometry(0.12, 0.015, 6, 12, Math.PI * 0.8); }), mat); h.position.set(-0.28 + sd * 0.07, 1.12, 0.22); h.rotation.z = sd > 0 ? 0.3 : Math.PI - 0.3; g.add(h); });
hgwBox(g, 0.2, 0.03, 0.03, mat, -0.28, 1.22, 0.22);
hgwBox(g, 0.16, 0.08, 0.05, mat, -0.28, 0.96, 0.22);
}
if (o.attr === "bow") {
var bw = new THREE.Mesh(hgwGeo("idbow", function () { return new THREE.TorusGeometry(0.42, 0.015, 6, 20, Math.PI * 0.9); }), mat);
bw.position.set(0.3, 1.05, 0.18);
bw.rotation.set(0, Math.PI / 2, Math.PI / 2 + Math.PI * 0.05);
g.add(bw);
}
if (o.attr === "torch2") {
[-1, 1].forEach(function (sd) { hgwCyl(g, 0.02, 0.025, 0.6, hgwMat("darkbark"), sd * 0.27, 0.95, 0.2, 6); var f = new THREE.Mesh(hgwGeo("dsflame", function () { return new THREE.ConeGeometry(0.12, 0.42, 7); }), hgwGlowM(0xFFB040, 0.9)); f.position.set(sd * 0.27, 1.72, 0.2); f.scale.setScalar(0.6); g.add(f); });
}
if (o.attr === "stars") {
for (var k = 0; k < 7; k++) {
var a = -0.9 + k * 0.3, st = new THREE.Mesh(hgwGeo("dsstar", function () { return new THREE.SphereGeometry(1, 6, 4); }), hgwGlowM(0xFFF4D8, 0.95));
st.position.set(Math.sin(a) * 0.16, 1.72 + Math.cos(a) * 0.06, Math.cos(a) * 0.02 - 0.02);
st.scale.setScalar(0.025);
g.add(st);
}
}
return g;
},
function (P, x, y, z, ry, s, mat) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.scale.setScalar(s || 1);
P.add(g);
hgwEll(g, mat, 0.2, 0.24, 0.5, 0, 0.62, 0.08, 12).rotation.x = 0.7;
[-1, 1].forEach(function (sd) {
hgwEll(g, mat, 0.15, 0.26, 0.32, sd * 0.13, 0.28, 0.38, 10);
hgwCyl(g, 0.055, 0.07, 0.84, mat, sd * 0.12, 0, -0.3, 8);
hgwEll(g, mat, 0.075, 0.05, 0.12, sd * 0.12, 0.03, -0.36, 8);
});
hgwEll(g, mat, 0.25, 0.3, 0.24, 0, 1.02, -0.32, 12);
hgwEll(g, mat, 0.13, 0.14, 0.19, 0, 1.1, -0.5, 10);
hgwEll(g, mat, 0.08, 0.05, 0.09, 0, 1.0, -0.64, 8);
[-1, 1].forEach(function (sd) { hgwEll(g, mat, 0.04, 0.05, 0.03, sd * 0.09, 1.24, -0.44, 6); });
var tail = hgwCyl(g, 0.03, 0.035, 0.7, mat, 0, -0.32, 0.82, 6);
tail.rotation.x = Math.PI / 2;
return g;
},
function (G) {
var X = HGW_ROOMXZ.delos.twins, lite = hgwLite();
var R = hgwRoom(G, "twins", X[0], X[1], 14, 16, { wall: "cave", floor: "marble", ceil: "cave", h: 6, name: "the hidden chamber of the twins, of Hecate and of Asteria", lightI: 0.5, lightCol: 0xD8D8FF, bare: 1 });
var gold = hgwShine(0xE8C060, 0.32, 0.92), silver = hgwShine(0xDDE2EA, 0.28, 0.92), obs = hgwShine(0x1E1A26, 0.18, 0.7), marble = hgwMat("marble");
hgwBox(R.g, 1.6, 0.8, 1.6, marble, -4, 0, -3.6);
hgwIdol(R.g, -4, 0.8, -3.6, 0.35, 1.5, gold, { male: 1, attr: "lyre" });
hgwBox(R.g, 1.6, 0.8, 1.6, marble, 4, 0, -3.6);
hgwIdol(R.g, 4, 0.8, -3.6, -0.35, 1.5, silver, { attr: "bow" });
hgwCyl(R.g, 1.0, 1.1, 0.55, marble, 0, 0, 2.2, 20);
for (var k = 0; k < 3; k++) {
var a = k / 3 * Math.PI * 2;
hgwIdol(R.g, Math.sin(a) * 0.26, 0.55, 2.2 + Math.cos(a) * 0.26, a, 1.15, obs, { attr: "torch2" });
}
hgwWater(R.g, 0, -6.6, 5, 2.2, 0.08, 0x1A2A4A, 0.92);
hgwEll(R.g, hgwMat("granite"), 1.1, 1.6, 0.9, 0, 0, -6.7, 12);
hgwIdol(R.g, 0, 1.5, -6.6, 0, 2.0, silver, { attr: "stars" });
var halo = new THREE.Mesh(hgwGeo("dshalo", function () { return new THREE.RingGeometry(0.7, 0.85, 32); }), hgwGlowM(0xE8F0FF, 0.75));
halo.position.set(0, 4.65, -6.9);
R.g.add(halo);
var q = new THREE.Group();
hgwEll(q, silver, 0.22, 0.16, 0.3, 0, 0.16, 0, 10);
hgwEll(q, silver, 0.1, 0.1, 0.1, 0, 0.3, -0.22, 8);
q.position.set(0.9, 0.12, -5.6);
R.g.add(q);
var stars = [];
var rr = wRand(1717);
for (var s = 0; s < (lite ? 40 : 120); s++) {
var sx = -6.6 + rr() * 13.2, sz = -7.6 + rr() * 15, sy = 5.3 + rr() * 0.6;
stars.push([sx, sy, sz, 0.03 + rr() * 0.05]);
}
stars.forEach(function (p) { var m = new THREE.Mesh(hgwGeo("dsstar", function () { return new THREE.SphereGeometry(1, 6, 4); }), hgwGlowM(p[3] > 0.06 ? 0xFFF4D8 : 0xD8E4FF, 0.95)); m.position.set(p[0], p[1], p[2]); m.scale.setScalar(p[3]); R.g.add(m); });
var sun = new THREE.Mesh(hgwGeo("dssun", function () { return new THREE.CircleGeometry(0.9, 28); }), gold);
sun.position.set(-6.55, 3.7, -3.6);
sun.rotation.y = Math.PI / 2;
R.g.add(sun);
var moon = new THREE.Mesh(hgwGeo("dsmoon", function () { return new THREE.CircleGeometry(0.8, 28); }), silver);
moon.position.set(6.55, 3.7, -3.6);
moon.rotation.y = -Math.PI / 2;
R.g.add(moon);
for (var t = 0; t < 4; t++)
hgwTorch(R.g, t < 2 ? -6.3 : 6.3, 0, t % 2 ? 3 : -1);
hgwBox(R.g, 3.2, 1.0, 0.25, marble, 0, 0, 4.8);
hgwSpot(R.cx, R.z1 - 2.4, 1.6, "The words cut in the stone", "read", function () { hgwDsWords(); }, R.y);
return R;
},
function () {
var first = !store.hgDelos;
store.hgDelos = store.hgDelos || Date.now();
try {
if (typeof save === "function")
save();
}
catch (e) { }
worldCard("<h3 style='margin:4px 0'>✨ The hidden chamber on Cynthus</h3>" + (first ? "<p style='font-size:12px;opacity:.8'>You have found one of the secrets of the World of Greek Myth.</p>" : "") + "<p style='font-style:italic;line-height:1.5'>" + esc(HGW_DS_WORDS) + "</p>", {});
},
function (kind) {
return hgwCanvas("dsmos" + kind, 512, 512, function (x, W, H) {
x.fillStyle = "#E8E0D0";
x.fillRect(0, 0, W, H);
var tess = function (c) { x.fillStyle = c; };
x.fillStyle = "#2A2420";
x.fillRect(16, 16, W - 32, H - 32);
x.fillStyle = "#E8E0D0";
x.fillRect(24, 24, W - 48, H - 48);
x.strokeStyle = "#2A2420";
x.lineWidth = 5;
for (var i = 0; i < 14; i++) {
var o = 40 + i * 31;
[[o, 40], [o, H - 60]].forEach(function (p) { x.beginPath(); x.moveTo(p[0], p[1] + 20); x.lineTo(p[0], p[1]); x.lineTo(p[0] + 20, p[1]); x.lineTo(p[0] + 20, p[1] + 12); x.lineTo(p[0] + 8, p[1] + 12); x.stroke(); });
}
x.fillStyle = kind === "dolphins" ? "#3A6A9A" : "#8A2A1A";
x.beginPath();
x.arc(W / 2, H / 2, 150, 0, Math.PI * 2);
x.fill();
x.fillStyle = kind === "dolphins" ? "#5A8ABA" : "#B8502A";
x.beginPath();
x.arc(W / 2, H / 2, 128, 0, Math.PI * 2);
x.fill();
if (kind === "dolphins") {
for (var d = 0; d < 4; d++) {
x.save();
x.translate(W / 2, H / 2);
x.rotate(d * Math.PI / 2);
x.translate(0, -80);
x.fillStyle = "#1E2A3A";
x.beginPath();
x.ellipse(0, 0, 46, 14, 0.3, 0, Math.PI * 2);
x.fill();
x.beginPath();
x.moveTo(40, -6);
x.lineTo(62, -18);
x.lineTo(58, 4);
x.fill();
x.beginPath();
x.moveTo(-10, -12);
x.lineTo(0, -30);
x.lineTo(8, -12);
x.fill();
x.fillStyle = "#E8E0D0";
x.beginPath();
x.ellipse(-4, 4, 30, 5, 0.3, 0, Math.PI * 2);
x.fill();
x.restore();
}
x.fillStyle = "#E8C040";
x.beginPath();
x.arc(W / 2, H / 2, 22, 0, Math.PI * 2);
x.fill();
}
else {
x.fillStyle = "#C89A40";
x.beginPath();
x.ellipse(W / 2, H / 2 + 30, 90, 34, 0, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#2A1A10";
for (var sp = 0; sp < 16; sp++) {
x.beginPath();
x.arc(W / 2 - 70 + sp * 10, H / 2 + 22 + (sp % 3) * 7, 4, 0, Math.PI * 2);
x.fill();
}
x.fillStyle = "#C89A40";
x.beginPath();
x.arc(W / 2 + 92, H / 2 + 10, 22, 0, Math.PI * 2);
x.fill();
[[-60, 60], [-20, 62], [30, 62], [64, 60]].forEach(function (l) { x.fillRect(W / 2 + l[0], H / 2 + 50, 10, l[1] - 10); });
x.fillStyle = "#F0D8B0";
x.beginPath();
x.ellipse(W / 2 - 10, H / 2 - 30, 20, 40, 0, 0, Math.PI * 2);
x.fill();
x.beginPath();
x.arc(W / 2 - 10, H / 2 - 82, 16, 0, Math.PI * 2);
x.fill();
x.strokeStyle = "#3A6A2A";
x.lineWidth = 6;
x.beginPath();
x.moveTo(W / 2 + 20, H / 2 + 20);
x.lineTo(W / 2 + 50, H / 2 - 110);
x.stroke();
x.fillStyle = "#3A6A2A";
x.beginPath();
x.arc(W / 2 + 52, H / 2 - 116, 12, 0, Math.PI * 2);
x.fill();
}
for (var n = 0; n < 2600; n++) {
x.fillStyle = "rgba(0,0,0," + (0.03 + Math.random() * 0.05) + ")";
x.fillRect(Math.random() * W, Math.random() * H, 3, 3);
}
});
},
function (G, key, name, kind) {
var X = HGW_ROOMXZ.delos[key];
if (!X)
return null;
var R = hgwRoom(G, key, X[0], X[1], 16, 14, { wall: "whitewash", floor: "gkfloor", h: 4.2, name: name, lightI: 0.9, lightCol: 0xFFE8C8, bare: 1 }), g = R.g;
var mos = new THREE.Mesh(hgwGeo("dsmosg", function () { var p = new THREE.PlaneGeometry(7, 7); p.rotateX(-Math.PI / 2); return p; }), hgwM("dsmosm" + kind, function () { return new THREE.MeshLambertMaterial({ map: hgwDsMosaic(kind) }); }));
mos.position.set(0, 0.02, -0.5);
g.add(mos);
[[-3.6, -4.1], [3.6, -4.1], [-3.6, 3.1], [3.6, 3.1], [0, -4.1], [0, 3.1], [-3.6, -0.5], [3.6, -0.5]].forEach(function (q) { hgwColumn(g, q[0], 0, q[1], 4.0, 0.2, {}); });
[[0, -6.88, 0], [-7.88, 0, Math.PI / 2], [7.88, 0, -Math.PI / 2]].forEach(function (w) {
var wg = new THREE.Group();
wg.position.set(w[0], 0, w[1]);
wg.rotation.y = w[2];
g.add(wg);
hgwBox(wg, w[2] ? 13.6 : 15.6, 0.9, 0.05, hgwLam(0x2A2420), 0, 0, 0);
for (var pn = 0; pn < 5; pn++)
hgwBox(wg, (w[2] ? 13.6 : 15.6) / 5 - 0.2, 1.6, 0.05, hgwLam(pn % 2 ? 0xB84A2A : 0xD8A848), -(w[2] ? 13.6 : 15.6) / 2 + ((w[2] ? 13.6 : 15.6) / 5) * (pn + 0.5), 0.95, 0);
hgwBox(wg, w[2] ? 13.6 : 15.6, 0.25, 0.05, hgwLam(0xF2EEE4), 0, 2.6, 0);
});
hgwCouch(g, -5.6, -5.4, 0, 0x8A2A2A);
hgwCouch(g, 5.6, -5.4, 0, 0x2A4A7A);
hgwTable(g, 0, -5.3, 1.4, 0.8, 0.7, { mat: "darkoak" });
hgwPithos(g, -7, 4.6, 0, 0.7);
hgwPithos(g, 7, 4.6, 0, 0.7);
hgwPithos(g, -7, 3.6, 0, 0.6);
hgwIdol(g, 6.6, 0, -6, -0.6, 1.15, hgwMat("marble"), { male: kind === "dionysus" ? 1 : 0, attr: kind === "dionysus" ? "" : "bow" });
for (var lp = 0; lp < 4; lp++)
hgwCandle(g, -6 + lp * 4, 0.72, -6.4, { brass: true });
hgwSpot(R.cx, R.cz - 0.5, 3.5, "The mosaic floor", "look down", function () {
worldCard(kind === "dolphins" ? "<h3 style='margin:4px 0'>🐬 The mosaic of the dolphins</h3><p>Thousands of little stones, black and white and blue: dolphins round a golden centre, and the sea-wave border all round. The owner paid more for this floor than for the house.</p>" :
"<h3 style='margin:4px 0'>🐆 Dionysus on his panther</h3><p>The god rides his spotted panther across the red floor, his thyrsus wound with ivy in his hand. Each stone is smaller than a fingernail.</p>");
});
return R;
},
function (G) {
var H = HGW_DS_H, I = HGW_DS, lite = hgwLite(), st = HGW.st, R = wRand(1701), X = HGW_ROOMXZ.delos;
hgwDsMemorial(G);
var Rm = hgwRoom(G, "dshouse", X.dshouse[0], X.dshouse[1], 9, 7, { wall: "whitewash", floor: "beaten", h: 3.0, name: "a house of the Delians", lightI: 0.6, bare: 1, beams: true });
hgwHearth(Rm.g, 0, -3.2, 0, { h: Rm.h, mat: "lime" });
hgwBed(Rm.g, -3, -2, 0, {});
hgwSea(G, 0);
hgwLandMesh(G, H, { dry: 0.7, rock: 40 });
hgwRoads(G, HGW_DS_ROADS, H, { w: { up: 5, sacred: 5, town: 4, cynthus: 3 } });
var bo = [];
for (var k = 0; k < (lite ? 40 : 120); k++) {
var x = -200 + R() * 560, z = -700 + R() * 1300;
if (H.sd(x, z) < 4)
continue;
bo.push({ x: x, z: z, y: H(x, z), s: 0.8 + R() * 1.8 });
}
hgwPlant(G, "rock", bo, { col: 0x9A948A });
hgwFleet(G, H, -170, -80, -Math.PI / 2, lite ? 2 : 4, 1702);
for (var b = 0; b < (lite ? 3 : 6); b++) {
var bx = -136 + b * 2, bz = -110 + b * 7;
hgwBoat(G, bx, H(bx, bz) + 0.1, bz, -1.1, {});
}
hgwHarbourSpots("delos", -125, -95);
var S = I.sanct;
hgwTemple(G, S[0] - 18, S[1] - 6, 12, 22, { ry: Math.PI / 2, statue: "hero", statueSex: "m" });
hgwTemple(G, S[0] + 2, S[1] - 6, 10, 18, { ry: Math.PI / 2 });
hgwTemple(G, S[0] + 18, S[1] - 6, 8, 14, { ry: Math.PI / 2 });
hgwAltar(G, S[0], S[1] + 16, H, { fire: true });
for (var c = 0; c < (lite ? 6 : 12); c++)
hgwColumn(G, S[0] - 36 + c * 6, H(S[0] - 36 + c * 6, S[1] + 30), S[1] + 30, 5, 0.32, {});
hgwBox(G, 72, 0.5, 6, hgwMat("lime"), S[0] - 3, H(S[0] - 3, S[1] + 33) + 5, S[1] + 33);
var L = I.lake, ly = H(L[0], L[1]);
hgwWater(G, L[0], L[1], 46, 30, ly + 0.15, 0x3A6A7A, 0.88);
var rim = new THREE.Mesh(hgwGeo("dsrim", function () { return new THREE.RingGeometry(23, 25, 40); }), hgwMat("lime"));
rim.rotation.x = -Math.PI / 2;
rim.scale.set(1, 0.66, 1);
rim.position.set(L[0], ly + 0.25, L[1]);
G.add(rim);
hgwPlant(G, "palm", [{ x: I.palm[0], z: I.palm[1], y: H(I.palm[0], I.palm[1]), s: 1.4 }, { x: I.palm[0] + 6, z: I.palm[1] + 3, y: H(I.palm[0] + 6, I.palm[1] + 3), s: 0.9 }], {});
hgwSpot(I.palm[0], I.palm[1] + 2, 3, "Leto's palm", "touch the trunk", function () { worldCard("<h3 style='margin:4px 0'>🌴 Leto's palm</h3><p>Here, holding on to this palm, Leto gave birth to Artemis and then to Apollo, on the one island that would take her in. The swans of the lake flew seven times round the island, singing.</p>", {}); });
var marble = hgwMat("marble");
for (var l = 0; l < (lite ? 5 : 9); l++) {
var lx = I.lions[0], lz = I.lions[1] - 40 + l * 10, gy = H(lx, lz);
hgwBox(G, 2.2, 0.8, 1.4, marble, lx, gy, lz);
hgwDsLion(G, lx, gy + 0.8, lz, -Math.PI / 2, 1.6, marble);
}
var Th = I.theatre, thy = H(Th[0], Th[1]);
for (var r = 0; r < (lite ? 7 : 14); r++) {
var rr = 10 + r * 1.0, a = new THREE.Mesh(hgwGeo("dsth" + r, function () { return new THREE.RingGeometry(rr, rr + 1.0, 32, 1, Math.PI * 1.1, Math.PI * 0.8); }), hgwMat("marble"));
a.rotation.x = -Math.PI / 2;
a.position.set(Th[0], thy + r * 0.42 + 0.42, Th[1]);
G.add(a);
var rs = new THREE.Mesh(hgwGeo("dsthr" + r, function () { return new THREE.CylinderGeometry(rr, rr, 0.42, 32, 1, true, Math.PI * 1.6, Math.PI * 0.8); }), hgwMat("lime"));
rs.position.set(Th[0], thy + r * 0.42 + 0.21, Th[1]);
G.add(rs);
}
var orc = new THREE.Mesh(hgwGeo("dsorc", function () { var g = new THREE.CircleGeometry(9.6, 32); g.rotateX(-Math.PI / 2); return g; }), hgwMat("beaten"));
orc.position.set(Th[0], thy + 0.06, Th[1]);
G.add(orc);
var sk = new THREE.Group();
sk.position.set(Th[0], thy, Th[1] + 12);
G.add(sk);
hgwBox(sk, 22, 4.2, 4, hgwMat("lime"), 0, 0, 1.5);
hgwBox(sk, 22.6, 0.4, 4.6, hgwMat("marble"), 0, 4.2, 1.5);
for (var sc2 = 0; sc2 < 8; sc2++)
hgwColumn(sk, -9.8 + sc2 * 2.8, 0, -0.8, 3.2, 0.22, {});
hgwBox(sk, 22, 0.3, 2.4, hgwMat("marble"), 0, 3.2, -0.8);
hgwSolid(Th[0], Th[1] + 13.5, 22, 4, thy - 1, thy + 4.5, 0);
hgwSpot(Th[0], Th[1] + 4, 4, "The theatre of Delos", "sit and look", function () { worldCard("<h3 style='margin:4px 0'>🎭 The theatre</h3><p>Cut into the hill below Cynthus, its marble seats hold five thousand. From the top row you see the harbour, the Sacred Lake and the sea to Mykonos.</p>"); });
var Cx = S[0] + 34, Cz = S[1] - 26, Cy = H(Cx, Cz);
hgwBox(G, 3.4, 1.4, 3.4, hgwMat("marble"), Cx, Cy, Cz);
hgwIdol(G, Cx, Cy + 1.4, Cz, Math.PI / 2, 5.0, hgwMat("marble"), { male: 1 });
hgwSolid(Cx, Cz, 3.6, 3.6, Cy - 1, Cy + 10, 0);
hgwSpot(Cx - 3, Cz, 3, "The Colossus of the Naxians", "read the base", function () { worldCard("<h3 style='margin:4px 0'>🗿 The Colossus of the Naxians</h3><p>Cut on the base: <i>I am of the same stone, statue and base.</i> The Naxians gave the god this Apollo, eight metres of marble, with a bronze palm tree beside it.</p>"); });
[["dsdolph", "The House of the Dolphins", [58, 96], Math.PI, "dolphins"], ["dsdiony", "The House of Dionysus", [-86, 86], Math.PI / 2, "dionysus"]].forEach(function (V) {
var vx = V[2][0], vz = V[2][1], vy = H(vx, vz);
hgwGkHouse(G, vx, vz, 14, 10, 4.4, { ry: V[3], tile: true, court: 15, courtD: 5, y: vy, wall: "whitewash" });
var Rv = hgwDsVilla(G, V[0], V[1], V[4]);
var ox = vx + Math.sin(V[3]) * (5 + 5 + 1.6), oz = vz + Math.cos(V[3]) * (5 + 5 + 1.6);
if (Rv)
hgwDoor(Rv, "The door of " + V[1].replace(/^The /, "the "), ox, oz, V[3]);
});
hgwTownPack(G, H, { c: I.town, rx: 60, rz: 50, n: 30, seed: 1703, roads: [HGW_DS_ROADS.town, HGW_DS_ROADS.cynthus], r2: 0.15, tile: 0.1, door: { key: "dshouse", name: "The door of a Delian house" }, life: true, avoid: [[Th[0], Th[1], 30], [58, 96, 16], [-86, 86, 16]] });
var Su = I.summit;
hgwTemple(G, Su[0], Su[1], 7, 10, { ry: Math.PI });
var Gr = I.grotto, gy2 = H(Gr[0], Gr[1]), gran = hgwMat("granite");
[-1, 1].forEach(function (s) { var sl = hgwBox(G, 3.8, 0.6, 5.4, gran, Gr[0] + s * 1.25, gy2 + 1.75, Gr[1]); sl.rotation.z = -s * 0.72; });
[-1, 1].forEach(function (s) { hgwBox(G, 0.9, 1.4, 5.0, gran, Gr[0] + s * 2.4, gy2 - 0.2, Gr[1]); });
hgwBox(G, 4.6, 3.4, 0.8, gran, Gr[0], gy2 - 0.2, Gr[1] - 2.7);
var cleft = new THREE.Mesh(hgwGeo("dscleft", function () { return new THREE.PlaneGeometry(0.9, 2.1); }), hgwGlowM(0x050407));
cleft.position.set(Gr[0], gy2 + 1.05, Gr[1] - 2.28);
G.add(cleft);
hgwEll(G, gran, 2.4, 1.6, 2.0, Gr[0] + 4, gy2 + 0.6, Gr[1] + 1, 9);
hgwEll(G, gran, 1.8, 1.2, 1.6, Gr[0] - 4, gy2 + 0.4, Gr[1] - 1, 9);
hgwSpot(Gr[0], Gr[1] + 3, 3, "The granite grotto", "look inside", function () { worldCard("<h3 style='margin:4px 0'>🪨 The grotto on Cynthus</h3><p>Great slabs of granite leaned together to make a roof. The pilgrims say Apollo's oracle spoke here once. The back of it is in shadow.</p>", {}); });
var tw = hgwRm("twins");
if (tw)
hgwDoor(tw, "A dark cleft at the back of the grotto", Gr[0], Gr[1] - 1.6, Math.PI);
hgwHerd(G, "goat", 120, 200, 90, lite ? 5 : 12, H, 1704);
hgwGreekTrees(G, H, { clear: [[S[0], S[1], 60], [L[0], L[1], 40], [Th[0], Th[1], 40], [Gr[0], Gr[1], 16], [Su[0], Su[1], 20], [I.harbour[0], I.harbour[1], 30]], roads: hgwRoadList(HGW_DS_ROADS), olive: 0.3, oak: 0.05, pine: 0.2, cypress: 0.3 });
hgwCrowd("dsSanct", [["A priest of Apollo", "m", "gkold", "No one may be born on Delos, and no one may die here. The island belongs to the god.", "greek"], ["A pilgrim from Naxos", "m", "gkman", "I brought a bull for the altar of horns. The god's altar, built of horns, they say, by the god himself as a boy.", "greek"],
["A Delian girl with a garland", "f", "gkwoman", "The maidens of Delos sing to Apollo and to Artemis and to Leto. Come to the dance at the festival!", "greek"], ["A temple servant", "m", "herd", "Sweep the steps, sweep the steps. The god likes his house clean.", "greek"]], S[0] - 30, S[1] + 6, S[0] + 30, S[1] + 26, { wander: 6, persona: "greek" });
hgwCrowd("dsLake", [["A swan-keeper", "m", "herd", "The sacred swans. They sang when the god was born. Don't chase them.", "greek"], ["A woman of Delos", "f", "gkveiled", "The lake is round as a coin. Leto knelt there, by the palm.", "greek"], ["An old islander", "m", "gkold", "This island used to float, you know. Asteria's island. It drifted on the sea until the god was born, and then it stood still.", "greek"]], L[0] - 30, L[1] + 16, L[0] + 20, L[1] + 30, { wander: 5, persona: "greek" });
hgwCrowd("dsTown", [["A Delian merchant", "m", "gkman", "Everything comes through Delos: grain, wine, pilgrims, gossip.", "greek"], ["A potter's wife", "f", "gkwoman", "Water is scarce here. We carry it up from the cisterns.", "greek"], ["A boy on a wall", "m", "herd", "I've been up Cynthus a hundred times. There's a cave with a stone roof!", "greek", true]], I.town[0] - 40, I.town[1] - 30, I.town[0] + 40, I.town[1] + 30, { wander: 6, persona: "greek" });
hgwCrowd("dsHarbour", [["A sailor from Mykonos", "m", "sailor", "Mykonos is just across the water. Delos is too holy to live on comfortably.", "sailor"], ["A pilgrim woman", "f", "gkveiled", "I promised Artemis I would come if my child lived. He lived.", "greek"]], I.harbour[0] - 6, I.harbour[1] - 14, I.harbour[0] + 16, I.harbour[1] + 10, { wander: 4, persona: "greek" });
},
function (P, x, z, hfn, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
g.rotation.y = o.ry || 0;
P.add(g);
var gr = hgwLam(0x2A4A3A);
hgwCyl(g, 1.25, 1.3, 0.3, hgwMat("greystone"), 0, 0, 0, 8);
hgwCyl(g, 1.15, 1.15, 2.3, gr, 0, 0.3, 0, 8);
var pt = hgwCanvas("kiosk", 256, 64, function (c, W, H) { var C = ["#C83A2A", "#E8C040", "#2A4A8A", "#F0E8D0", "#3A7A4A", "#E87A3A"]; for (var i = 0; i < 8; i++) {
c.fillStyle = C[i % 6];
c.fillRect(i * W / 8, 0, W / 8 - 2, H);
c.fillStyle = "rgba(20,20,20,.7)";
c.font = "bold 11px serif";
c.fillText(["LE FIGARO", "L'EPOQUE", "LE TEMPS", "GIL BLAS", "LE GAULOIS", "LA LANTERNE", "LE MATIN", "LE SIECLE"][i], i * W / 8 + 3, H * 0.45);
} });
var band = new THREE.Mesh(hgwGeo("kband", function () { return new THREE.CylinderGeometry(1.17, 1.17, 0.9, 8, 1, true); }), hgwM("kbandM", function () { return new THREE.MeshLambertMaterial({ map: pt }); }));
band.position.y = 2.0;
g.add(band);
hgwCyl(g, 1.55, 1.55, 0.12, gr, 0, 2.6, 0, 8);
var dome = new THREE.Mesh(hgwGeo("kdome", function () { return new THREE.ConeGeometry(1.5, 1.1, 8); }), gr);
dome.position.y = 3.27;
g.add(dome);
hgwCyl(g, 0.05, 0.05, 0.5, hgwMat("gilt"), 0, 3.8, 0, 6);
hgwBox(g, 1.0, 0.06, 0.5, hgwLam(0xE8E0C8), 0, 1.1, 1.2);
hgwSolid(x, z, 2.6, 2.6);
return g;
},
function (P, x, z, hfn) {
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var gr = hgwLam(0x1E3A2E);
hgwCyl(g, 0.7, 0.8, 0.5, gr, 0, 0, 0, 8);
hgwCyl(g, 0.45, 0.55, 0.3, gr, 0, 0.5, 0, 8);
for (var i = 0; i < 4; i++) {
var a = i / 4 * Math.PI * 2 + 0.78;
hgwCyl(g, 0.07, 0.09, 1.3, gr, Math.cos(a) * 0.32, 0.8, Math.sin(a) * 0.32, 6);
hgwEll(g, gr, 0.08, 0.1, 0.08, Math.cos(a) * 0.32, 2.18, Math.sin(a) * 0.32, 6);
}
var dm = new THREE.Mesh(hgwGeo("wdome", function () { return new THREE.SphereGeometry(0.5, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2); }), gr);
dm.position.y = 2.25;
g.add(dm);
hgwCyl(g, 0.04, 0.04, 0.3, gr, 0, 2.7, 0, 6);
hgwSolid(x, z, 1.6, 1.6);
return g;
},
function (P, x, z, hfn, o) {
o = o || {};
var g = new THREE.Group(), y = hfn(x, z);
g.position.set(x, y, z);
P.add(g);
var ir = hgwLam(0x1E2A22), lit = o.lit !== false;
hgwCyl(g, 0.32, 0.4, 1.0, ir, 0, 0, 0, 10);
hgwCyl(g, 0.12, 0.16, 4.2, ir, 0, 1.0, 0, 10);
for (var i = 0; i < 5; i++) {
var a = i / 5 * Math.PI * 2, r = i === 4 ? 0 : 0.7, lx = i === 4 ? 0 : Math.cos(a) * r, lz = i === 4 ? 0 : Math.sin(a) * r;
if (i < 4)
hgwBox(g, 0.05, 0.05, 0.72, ir, lx / 2, 4.8, lz / 2).rotation.y = -a + Math.PI / 2;
hgwEll(g, hgwGlowM(lit ? 0xFFF0C8 : 0xD8D4C8, lit ? 0.92 : 0.6), 0.2, 0.26, 0.2, lx, i === 4 ? 5.6 : 5.1, lz, 8);
}
if (lit && !hgwLite()) {
var gl = wGlow(0xFFE8B0, 0.18, 5);
gl.position.set(0, 5.3, 0);
g.add(gl);
}
return g;
},
function (P, x, y, z, w, d, ry, cols) {
var t = hgwCanvas("awn" + cols.join(""), 128, 64, function (c, W, H) { for (var i = 0; i < 16; i++) {
c.fillStyle = cols[i % cols.length];
c.fillRect(i * W / 16, 0, W / 16, H);
} c.fillStyle = "rgba(0,0,0,.12)"; c.fillRect(0, H * 0.85, W, H * 0.15); });
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), hgwM("awnM" + cols.join(""), function () { return new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }); }));
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
var lite = hgwLite(), sp = lite ? 3.4 : 2.4, n = 0;
for (var x = x0; x <= x1; x += sp)
for (var z = z0; z <= z1; z += sp) {
if (lite && n > 14)
break;
n++;
var y = hfn(x, z), g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
hgwCyl(g, 0.05, 0.12, 0.72, hgwLam(0x1A1A1A), 0, 0, 0, 8);
hgwCyl(g, 0.36, 0.36, 0.04, hgwMat("marble"), 0, 0.72, 0, 14);
var R = wRand(Math.round(x * 7 + z * 3));
if (R() < 0.6)
hgwCyl(g, 0.04, 0.035, 0.1, hgwMat("glass"), 0.1, 0.76, 0.05, 8);
if (R() < 0.4)
hgwCyl(g, 0.05, 0.04, 0.07, hgwLam(0xF4F0E8), -0.12, 0.76, -0.05, 8);
hgwChair(g, 0, 0.62, Math.PI, { mat: "darkoak" });
hgwChair(g, 0, -0.62, 0, { mat: "darkoak" });
}
return n;
},
function (P, x, z, ry, hfn, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
g.rotation.y = ry || 0;
P.add(g);
var wd = hgwMat("oak"), R = wRand(Math.round(x * 11 + z * 5));
hgwBox(g, 2.6, 0.8, 1.1, wd, 0, 0, 0);
hgwBox(g, 2.7, 0.05, 1.2, hgwMat("planks"), 0, 0.8, 0);
[[-1.3, -0.6], [1.3, -0.6], [-1.3, 0.6], [1.3, 0.6]].forEach(function (p) { hgwCyl(g, 0.04, 0.04, 2.3, wd, p[0], 0, p[1], 6); });
var aw = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.6), hgwM("stallM" + (o.cols || ["#C83A2A", "#F0E8D8"]).join(""), function () { var t = hgwCanvas("stall" + (o.cols || ["#C83A2A", "#F0E8D8"]).join(""), 64, 32, function (c, W, H) { var cs = o.cols || ["#C83A2A", "#F0E8D8"]; for (var i = 0; i < 8; i++) {
c.fillStyle = cs[i % cs.length];
c.fillRect(i * W / 8, 0, W / 8, H);
} }); return new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }); }));
aw.rotation.x = -Math.PI / 2 + 0.18;
aw.position.set(0, 2.35, 0);
g.add(aw);
var kind = o.goods || "veg", cols = { veg: [0x6A9A3A, 0xC85A2A, 0xE8C040, 0x8A3A5A, 0xD8B070], fish: [0x9AA8B0, 0xB8C0C8, 0x7A8A98, 0xC8A080], flowers: [0xE84A6A, 0xF0E040, 0xF4F0F4, 0xA05AC8, 0xE87A3A], bread: [0xC89050, 0xB07A40, 0xD8A868], cloth: [0x8A2A2A, 0x2A4A8A, 0xE8E0C8, 0x3A6A3A] }[kind] || [0x8A8A8A];
for (var i = 0; i < (hgwLite() ? 6 : 14); i++) {
var c = cols[i % cols.length], px = -1.1 + (i % 7) * 0.36, pz = -0.3 + Math.floor(i / 7) * 0.5;
if (kind === "cloth")
hgwBox(g, 0.32, 0.08 + R() * 0.08, 0.4, hgwLam(c), px, 0.85, pz);
else if (kind === "fish") {
var f = hgwEll(g, hgwShine(c, 0.5, 0.6), 0.16, 0.04, 0.05, px, 0.9, pz, 8);
f.rotation.y = R() * 3;
}
else if (kind === "flowers") {
hgwCyl(g, 0.12, 0.1, 0.22, hgwLam(0x6A4A2A), px, 0.85, pz, 8);
hgwEll(g, hgwLam(c), 0.16, 0.14, 0.16, px, 1.18, pz, 8);
}
else if (kind === "bread") {
var b = hgwEll(g, hgwLam(c), 0.22, 0.07, 0.08, px, 0.9, pz, 8);
b.rotation.y = R() * 3;
}
else {
hgwBox(g, 0.32, 0.12, 0.42, hgwLam(0x8A6A3A), px, 0.85, pz);
hgwEll(g, hgwLam(c), 0.14, 0.08, 0.18, px, 1.0, pz, 8);
}
}
hgwSolid(x, z, 2.8, 1.4, undefined, undefined, ry);
return g;
},
function (P, x, z, hfn, col) {
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var st = hgwMat("ashlar");
hgwBox(g, 0.8, 0.8, 0.8, st, 0, 0, 0);
var u = new THREE.Mesh(hgwGeo("urn", function () { var p = []; for (var k = 0; k <= 10; k++) {
var t = k / 10;
p.push(new THREE.Vector2(0.18 + Math.sin(t * Math.PI) * 0.3 + t * 0.12, t * 0.8));
} return new THREE.LatheGeometry(p, 14); }), st);
u.position.y = 0.8;
g.add(u);
hgwEll(g, hgwLam(0x3A5A2A), 0.48, 0.25, 0.48, 0, 1.62, 0, 10);
for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.28;
hgwEll(g, hgwLam(col || 0xE84A5A), 0.1, 0.08, 0.1, Math.cos(a) * 0.3, 1.78, Math.sin(a) * 0.3, 6);
}
hgwSolid(x, z, 0.9, 0.9);
return g;
},
function (P, x, z, w, d, hfn, col, o) {
o = o || {};
var y = hfn(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var bx = hgwLam(0x2E4A24);
hgwBox(g, w, 0.4, 0.35, bx, 0, 0, -d / 2);
hgwBox(g, w, 0.4, 0.35, bx, 0, 0, d / 2);
hgwBox(g, 0.35, 0.4, d, bx, -w / 2, 0, 0);
hgwBox(g, 0.35, 0.4, d, bx, w / 2, 0, 0);
hgwBox(g, w - 0.4, 0.12, d - 0.4, hgwLam(0x4A3A28), 0, 0, 0);
var n = hgwLite() ? 10 : Math.min(40, Math.round(w * d / 1.4)), R = wRand(Math.round(x * 3 + z * 17)), cs = [].concat(col || [0xE84A5A, 0xF0D040, 0xF4F0F0]);
var pts = [];
for (var i = 0; i < n; i++)
pts.push({ x: (R() - 0.5) * (w - 0.8), y: 0.12, z: (R() - 0.5) * (d - 0.8), s: 0.5 + R() * 0.3, c: cs[i % cs.length] });
cs.forEach(function (c) { hgwInst(g, hgwGeo("bloom", function () { return new THREE.IcosahedronGeometry(0.28, 0); }), hgwLam(c), pts.filter(function (p) { return p.c === c; }), {}); });
if (o.centre)
hgwUrn(P, x, z, hfn, cs[0]);
return g;
},
function (P, x, z, hfn, s) {
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
g.scale.setScalar(s || 1);
P.add(g);
var m = hgwLam(0xC8A858);
hgwCyl(g, 1.7, 1.9, 2.0, m, 0, 0, 0, 12);
var c = new THREE.Mesh(hgwGeo("haycone", function () { return new THREE.ConeGeometry(1.8, 1.8, 12); }), m);
c.position.y = 2.9;
g.add(c);
hgwSolid(x, z, 3.6 * (s || 1), 3.6 * (s || 1));
return g;
},
function (P, x, z, hfn, n) {
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var wk = hgwLam(0x7A5A34), R = wRand(Math.round(x + z * 3));
for (var i = 0; i < (n || 6); i++) {
var p = new THREE.Mesh(hgwGeo("lpot", function () { return new THREE.CylinderGeometry(0.28, 0.34, 0.5, 8, 1, true); }), wk);
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
var wd = hgwMat("oak");
w = w || 6;
hgwCyl(g, 0.05, 0.05, 2.0, wd, -w / 2, 0, 0, 6);
hgwCyl(g, 0.05, 0.05, 2.0, wd, w / 2, 0, 0, 6);
hgwBox(g, w, 0.01, 0.01, hgwLam(0xE8E0D0), 0, 1.9, 0);
var C = [0xF4F0E8, 0xE8D8C0, 0x8AA0C8, 0xC85A4A, 0xF0F0F0];
for (var i = 0; i < 6; i++)
hgwBox(g, 0.5 + (i % 2) * 0.2, 0.6 + (i % 3) * 0.15, 0.01, hgwLam(C[i % 5], { ds: 1 }), -w / 2 + 0.6 + i * (w - 1.2) / 5, 1.25 - (i % 3) * 0.15, 0);
return g;
},
function (P, x, z, hfn) {
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var gr = hgwMat("granite");
hgwCyl(g, 0.9, 0.95, 0.9, gr, 0, 0, 0, 14);
hgwCyl(g, 0.7, 0.7, 0.05, hgwLam(0x0A1418), 0, 0.86, 0, 14);
[-1, 1].forEach(function (k) { hgwBox(g, 0.14, 2.2, 0.14, hgwMat("oak"), k * 0.85, 0.9, 0); });
hgwBox(g, 2.0, 0.1, 0.1, hgwMat("oak"), 0, 2.9, 0);
var rf = new THREE.Mesh(hgwGeo("wellrf", function () { var s = new THREE.Shape(); s.moveTo(-1.2, 0); s.lineTo(0, 0.7); s.lineTo(1.2, 0); s.lineTo(-1.2, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 1.4, bevelEnabled: false }); e.translate(0, 0, -0.7); return e; }), hgwMat("slate"));
rf.position.y = 3.0;
g.add(rf);
hgwCyl(g, 0.16, 0.18, 0.28, hgwMat("oak"), 0.2, 2.2, 0, 8);
hgwSolid(x, z, 2, 2);
return g;
},
function (P, x, z, ry, cols) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var ir = hgwMat("brass");
[-0.9, 0.9].forEach(function (k) { hgwCyl(g, 0.025, 0.025, 1.8, ir, k, 0, 0, 6); });
hgwBox(g, 1.9, 0.03, 0.03, ir, 0, 1.78, 0);
(cols || [0xE8E0F0, 0xC83A4A, 0x2A3A6A, 0xF0D8A0, 0x3A6A4A]).forEach(function (c, i) { var d = new THREE.Mesh(hgwGeo("gown", function () { return new THREE.CylinderGeometry(0.12, 0.38, 1.3, 10, 1, true); }), hgwLam(c, { ds: 1 })); d.position.set(-0.7 + i * 0.35, 1.05, 0); g.add(d); hgwEll(g, hgwLam(c), 0.14, 0.08, 0.1, -0.7 + i * 0.35, 1.66, 0, 6); });
return g;
},
function (P, x, z, ry) { var g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry || 0; P.add(g); var bk = hgwShine(0x0E0A08, 0.25, 0.2); hgwBox(g, 1.5, 1.3, 0.6, bk, 0, 0, 0); hgwBox(g, 1.4, 0.06, 0.3, hgwLam(0xF4F0E4), 0, 0.74, 0.42); hgwBox(g, 1.5, 0.08, 0.34, bk, 0, 0.7, 0.42); hgwBox(g, 1.0, 0.5, 0.4, hgwMat("redvelvet"), 0, 0, 1.0); return g; },
function (G, H, o, put) {
if (!put.length)
return;
var lite = hgwLite(), R = wRand((o.seed || 31) + 501), c = o.c, rx = o.rx || 80, rz = o.rz || rx, earth = [], pave = [];
var st = lite ? 4.5 : 3.0;
for (var x = c[0] - rx - 6; x <= c[0] + rx + 6; x += st)
for (var z = c[1] - rz - 6; z <= c[1] + rz + 6; z += st) {
var near = false;
for (var i = 0; i < put.length; i++) {
if (Math.hypot(x - put[i][0], z - put[i][1]) < put[i][2] + 4.5) {
near = true;
break;
}
}
if (!near)
continue;
var y = H(x, z);
if (!(y > 0.2) || (H.sd && H.sd(x, z) < 2))
continue;
earth.push({ x: x + (R() - 0.5) * 0.8, z: z + (R() - 0.5) * 0.8, y: y + 0.03, s: 1, sx: st * 0.9, sy: 1, sz: st * 0.9, ry: R() * 0.4 });
}
if (earth.length)
hgwInst(G, hgwGeo("tearth", function () { var g = new THREE.CircleGeometry(1, 10); g.rotateX(-Math.PI / 2); return g; }), hgwM("tearthM", function () { var m = hgwMat("beaten").clone(); m.polygonOffset = true; m.polygonOffsetFactor = -2; m.polygonOffsetUnits = -2; return m; }), earth, {});
var best = null, bd = 1e9;
for (var t = 0; t < 300; t++) {
var a = R() * 6.283, d = Math.sqrt(R()) * Math.min(rx, rz) * 0.6, ax = c[0] + Math.cos(a) * d, az = c[1] + Math.sin(a) * d, free = true;
for (var j = 0; j < put.length; j++)
if (Math.hypot(ax - put[j][0], az - put[j][1]) < put[j][2] + 9) {
free = false;
break;
}
if (!free || hgwSolidAt(ax, az, H(ax, az) + 0.5))
continue;
if (d < bd) {
bd = d;
best = [ax, az];
}
}
if (best) {
var ay = H(best[0], best[1]);
for (var px = -9; px <= 9; px += 3)
for (var pz = -9; pz <= 9; pz += 3) {
if (px * px + pz * pz > 90)
continue;
pave.push({ x: best[0] + px, z: best[1] + pz, y: H(best[0] + px, best[1] + pz) + 0.05, s: 1, sx: 1.55, sy: 1, sz: 1.55 });
}
hgwInst(G, hgwGeo("tpave", function () { var g = new THREE.PlaneGeometry(2, 2); g.rotateX(-Math.PI / 2); return g; }), hgwM("tpaveM", function () { var m = hgwMat("lime").clone(); m.polygonOffset = true; m.polygonOffsetFactor = -3; m.polygonOffsetUnits = -3; return m; }), pave, {});
var fg = new THREE.Group();
fg.position.set(best[0], ay, best[1]);
G.add(fg);
hgwBox(fg, 3.2, 0.7, 1.6, hgwMat("lime"), 0, 0, 0);
hgwBox(fg, 3.4, 2.4, 0.4, hgwMat("marble"), 0, 0, -0.9);
hgwBox(fg, 3.8, 0.3, 1.0, hgwMat("redtile"), 0, 2.4, -0.6);
var wat = new THREE.Mesh(hgwGeo("twat", function () { var g = new THREE.PlaneGeometry(3, 1.4); g.rotateX(-Math.PI / 2); return g; }), hgwWaterM ? hgwWaterM(0x4A7A8A, 0.85) : hgwLam(0x4A7A8A));
wat.position.y = 0.62;
fg.add(wat);
[-0.9, 0.9].forEach(function (sx) { hgwEll(fg, hgwMat("brass"), 0.14, 0.14, 0.1, sx, 1.5, -0.66, 8); var st2 = new THREE.Mesh(hgwGeo("tstream", function () { return new THREE.CylinderGeometry(0.03, 0.04, 0.85, 6); }), hgwLam(0xBFE0EA, { op: 0.7 })); st2.position.set(sx, 1.05, -0.55); fg.add(st2); });
hgwSolid(best[0], best[1], 3.4, 2, ay - 1, ay + 1.2, 0);
hgwSpot(best[0], best[1] + 1.6, 2.2, "The fountain-house", "drink", function () { worldCard("<h3 style='margin:4px 0'>⛲ The fountain-house</h3><p>Cold water from the hill, running from the lions' mouths. You drink, and wash the dust of the road from your face.</p>"); });
var goods = [["amphora", "terracotta"], ["apple", "gold"], ["dolphin", "silver"], ["fleece", "wool"], ["cup", "bronze"], ["amphora", "clay"], ["apple", "red"], ["shell", "pearl"]], cl = [0xB86A48, 0xE8D8B8, 0x6A7A9A, 0xC8A040, 0x7A3A2A];
for (var k = 0; k < (lite ? 3 : 6); k++) {
var an = k / 6 * Math.PI * 2 + 0.3, sx2 = best[0] + Math.cos(an) * 12.5, sz2 = best[1] + Math.sin(an) * 12.5;
if (hgwSolidAt(sx2, sz2, H(sx2, sz2) + 0.5))
continue;
var sy = H(sx2, sz2), sg = new THREE.Group();
sg.position.set(sx2, sy, sz2);
sg.rotation.y = Math.atan2(best[0] - sx2, best[1] - sz2);
G.add(sg);
[[-1.2, -0.7], [1.2, -0.7], [-1.2, 0.7], [1.2, 0.7]].forEach(function (q) { hgwCyl(sg, 0.05, 0.05, 2.3, hgwMat("oak"), q[0], 0, q[1], 5); });
var aw = hgwBox(sg, 2.8, 0.06, 1.9, hgwLam(cl[k % 5], { ds: 1 }), 0, 2.3, 0);
aw.rotation.x = 0.12;
hgwBox(sg, 2.2, 0.12, 1.0, hgwMat("oak"), 0, 0.8, 0.25);
for (var gi = 0; gi < 4; gi++) {
if (typeof kcModel !== "function")
break;
var gd = goods[(k * 3 + gi) % goods.length], gm = kcModel(gd[0], gd[1]);
gm.scale.setScalar(1.3);
gm.position.set(-0.8 + gi * 0.53, 0.92, 0.25);
sg.add(gm);
}
hgwPithos(sg, 1.4, 0, -0.4, 0.5);
hgwSolid(sx2, sz2, 2.6, 1.6, sy - 1, sy + 1.1, sg.rotation.y);
}
}
var trees = { fig: [], olive: [], cypress: [] };
for (var tr = 0; tr < (lite ? 6 : 16); tr++) {
var tx = c[0] + (R() - 0.5) * rx * 1.6, tz = c[1] + (R() - 0.5) * rz * 1.6, ok = true;
for (var q = 0; q < put.length; q++)
if (Math.hypot(tx - put[q][0], tz - put[q][1]) < put[q][2] + 1.5) {
ok = false;
break;
}
if (!ok || !hgwLifeOk(H, tx, tz, 1.5))
continue;
var kd = R() < 0.45 ? "fig" : R() < 0.75 ? "olive" : "cypress";
trees[kd].push({ x: tx, z: tz, y: H(tx, tz), s: 0.7 + R() * 0.4 });
}
Object.keys(trees).forEach(function (kd) { if (trees[kd].length)
hgwPlant(G, kd, trees[kd], { keepAll: true }); });
for (var cc = 0; cc < (lite ? 1 : 3); cc++) {
var h1 = put[Math.floor(R() * put.length)];
var cx2 = h1[0] + h1[2] + 2.2, cz2 = h1[1];
if (hgwLifeOk(H, cx2, cz2, 0.6) && typeof hgwCart === "function")
try {
hgwCart(G, cx2, cz2, R() * 6.28, { y: H(cx2, cz2) });
}
catch (e) { }
}
if (!lite)
for (var wl = 0; wl < 4; wl++) {
var A = put[Math.floor(R() * put.length)], B = null, bb = 1e9;
put.forEach(function (q) { var dq = Math.hypot(q[0] - A[0], q[1] - A[1]); if (q !== A && dq < bb) {
bb = dq;
B = q;
} });
if (!B || bb > 16)
continue;
var mx = (A[0] + B[0]) / 2, mz = (A[1] + B[1]) / 2, my = H(mx, mz), L = bb - A[2] - B[2] + 1;
if (L < 2 || !hgwLifeOk(H, mx, mz, 0))
continue;
var lg = new THREE.Group();
lg.position.set(mx, my, mz);
lg.rotation.y = Math.atan2(B[0] - A[0], B[1] - A[1]);
G.add(lg);
hgwCyl(lg, 0.04, 0.05, 2.2, hgwMat("oak"), 0, 0, -L / 2, 5);
hgwCyl(lg, 0.04, 0.05, 2.2, hgwMat("oak"), 0, 0, L / 2, 5);
hgwBox(lg, 0.01, 0.01, L, hgwLam(0xD8D0B8), 0, 2.1, 0);
for (var cl2 = 0; cl2 < Math.floor(L / 0.9); cl2++)
hgwBox(lg, 0.02, 0.7, 0.6, hgwLam([0xE8E0D0, 0xB86A48, 0x6A7A9A, 0xD8C070][cl2 % 4], { ds: 1 }), 0, 1.4, -L / 2 + 0.6 + cl2 * 0.9);
}
},
function (g, x, z, w, d, h, o) {
var r = function (s) { return hgwH01(x, z, s); }, lime = hgwMat("lime"), oak = hgwMat("oak"), tc = hgwLam(0xB4603A), dr = o.door || 0;
var paint = [hgwLam(0x2A5A8A), hgwLam(0x3A6A4A), hgwLam(0x7A3A2A), hgwLam(0x5A6A7A)][Math.floor(r(1) * 4)], flat = !o.tile;
hgwBox(g, 1.6, 0.22, 0.7, lime, dr, 0.18, d / 2 + 0.38);
hgwBox(g, 1.5, 0.16, 0.18, oak, dr, 2.5, d / 2 + 0.12);
var nw = Math.max(1, Math.floor(w / 4));
for (var i = 0; i < nw; i++) {
var wx = -w / 2 + (i + 0.5) * w / nw;
if (Math.abs(wx - dr) < 1.2)
continue;
hgwBox(g, 0.3, 0.56, 0.05, paint, wx - 0.46, h - 0.98, d / 2 + 0.06);
hgwBox(g, 0.3, 0.56, 0.05, paint, wx + 0.46, h - 0.98, d / 2 + 0.06);
hgwBox(g, 0.8, 0.08, 0.12, lime, wx, h - 0.38, d / 2 + 0.06);
}
hgwBox(g, 0.6, 0.5, 0.1, hgwLam(0x1E1810), -w / 4, h - 0.7, -d / 2 - 0.02);
if (w > 6)
hgwBox(g, 0.6, 0.5, 0.1, hgwLam(0x1E1810), w / 4, h - 0.7, -d / 2 - 0.02);
var sw = hgwBox(g, 0.1, 0.5, 0.6, hgwLam(0x1E1810), w / 2 + 0.02, h - 0.7, 0);
sw.rotation.y = 0;
var np = 1 + Math.floor(r(2) * 3);
for (var p = 0; p < np; p++) {
var px = dr + (p % 2 ? 1 : -1) * (0.95 + p * 0.35), pz = d / 2 + 0.45;
var pot = new THREE.Mesh(hgwGeo("hpot", function () { return new THREE.CylinderGeometry(0.2, 0.14, 0.36, 10); }), tc);
pot.position.set(px, 0.58, pz);
g.add(pot);
hgwEll(g, hgwLam([0x4A7A34, 0x5A8A3A, 0x6A7A3A][p % 3]), 0.2, 0.2 + r(3 + p) * 0.12, 0.2, px, 0.86, pz, 7);
if (r(9 + p) < 0.5)
hgwEll(g, hgwLam([0xC83A5A, 0xE8C040, 0xE8E0F0][p % 3]), 0.07, 0.05, 0.07, px + 0.08, 1.0 + r(3 + p) * 0.1, pz, 5);
}
if (r(4) < 0.5) {
var bx = dr + (r(5) < 0.5 ? -1 : 1) * Math.min(w / 2 - 1.1, 2.2);
hgwBox(g, 1.6, 0.45, 0.42, lime, bx, 0.4, d / 2 + 0.32);
}
if (r(6) < 0.32 && w > 5) {
var side = dr > 0 ? -1 : 1, cx = side * (w / 4), wd = Math.min(3.2, w / 2 - 0.4);
[[cx - wd / 2, d / 2 + 2.2], [cx + wd / 2, d / 2 + 2.2]].forEach(function (q) { hgwCyl(g, 0.07, 0.08, 2.5, hgwMat("darkbark"), q[0], 0.4, q[1], 6); });
for (var b = 0; b < 4; b++)
hgwBox(g, 0.08, 0.08, 2.4, oak, cx - wd / 2 + b * wd / 3, 2.86, d / 2 + 1.1);
for (var lv = 0; lv < 5; lv++)
hgwEll(g, hgwLam(0x4E7A2E), 0.7, 0.22, 0.6, cx - wd / 2 + 0.3 + r(20 + lv) * (wd - 0.6), 3.02, d / 2 + 0.4 + r(30 + lv) * 1.8, 7);
if (r(7) < 0.6)
for (var gr = 0; gr < 3; gr++)
hgwEll(g, hgwLam(0x4A2A5A), 0.09, 0.16, 0.09, cx - wd / 3 + gr * wd / 3, 2.65, d / 2 + 1.2 + r(40 + gr) * 0.6, 6);
}
if (flat && r(8) < 0.5) {
var ry = h + 0.4 + 0.13;
var jar = new THREE.Mesh(hgwGeo("hjar", function () { return new THREE.LatheGeometry([[0, 0], [0.14, 0.04], [0.22, 0.25], [0.2, 0.5], [0.1, 0.62], [0.12, 0.68], [0, 0.68]].map(function (q) { return new THREE.Vector2(q[0], q[1]); }), 10); }), tc);
jar.position.set(-w / 2 + 0.8, ry, -d / 2 + 0.8);
g.add(jar);
var j2 = jar.clone();
j2.position.set(-w / 2 + 1.3, ry, -d / 2 + 0.7);
g.add(j2);
var bk = hgwCyl(g, 0.42, 0.36, 0.14, hgwLam(0xA88A50), w / 4, ry - 0.07, 0, 10);
hgwEll(g, hgwLam(0x6A4A3A), 0.34, 0.06, 0.34, w / 4, ry + 0.1, 0, 8);
var mat = hgwCyl(g, 0.12, 0.12, 1.4, hgwLam([0xB86A48, 0xE8D8B8, 0x6A7A9A][Math.floor(r(10) * 3)]), 0, ry - 0.7, -d / 4, 8);
mat.rotation.z = Math.PI / 2;
mat.position.y = ry + 0.12;
}
if (r(11) < 0.35) {
var wxs = (r(12) < 0.5 ? -1 : 1) * (w / 2 + 0.45);
for (var l = 0; l < 9; l++) {
var lg = new THREE.Mesh(hgwGeo("hlog", function () { var c = new THREE.CylinderGeometry(0.09, 0.1, 1.1, 6); c.rotateX(Math.PI / 2); return c; }), hgwMat("bark"));
lg.position.set(wxs + ((l % 3) - 1) * 0.2, 0.5 + Math.floor(l / 3) * 0.18, -d / 4);
g.add(lg);
}
}
if (flat && r(13) < 0.25 && d > 4.5) {
var sx = (r(14) < 0.5 ? -1 : 1) * (w / 2 + 0.5), steps = Math.ceil((h + 0.4) / 0.32);
for (var s = 0; s < steps; s++)
hgwBox(g, 0.9, 0.32 * (s + 1), 0.42, lime, sx, 0, d / 2 - 0.4 - s * ((d - 0.8) / steps));
}
},
function (H, x, z, clr) {
var y = H(x, z);
if (!(y > 0.6))
return false;
if (H.sd && H.sd(x, z) < 3.5)
return false;
if (hgwSolidAt(x, z, y + 0.5))
return false;
var L = HGW_LIFE;
for (var i = 0; i < L.houses.length; i++) {
var q = L.houses[i];
if (Math.abs(x - q[0]) < q[2] / 2 + (clr || 2) && Math.abs(z - q[1]) < q[3] / 2 + (clr || 2))
return false;
}
for (var r = 0; r < L.roads.length; r++)
if (hgwPathD(x, z, L.roads[r].pts) < L.roads[r].w / 2 + 0.5)
return false;
return true;
},
function (G, k, H) {
var lite = hgwLite(), R = wRand(9100 + k.length * 31 + k.charCodeAt(0)), grass = [], fl = [[], [], [], []], rocks = [], scrub = [], wall = [], cap = [], herms = [], FC = ["#E8D040", "#D83A3A", "#F4ECE0", "#9A6AD8"];
HGW_LIFE.roads.forEach(function (rd) {
var hw = rd.w / 2, wallOn = R() < 0.5, segLeft = 30 + R() * 50, side = R() < 0.5 ? 1 : -1, lastHerm = -90;
hgwRoadWalk(rd.pts, lite ? 6 : 3.2, function (x, z, nx, nz, s) {
[1, -1].forEach(function (sd) {
var o1 = hw + 0.7 + R() * 3, gx = x + nx * sd * o1, gz = z + nz * sd * o1;
if (hgwLifeOk(H, gx, gz, 1.2)) {
if (R() < 0.85)
grass.push({ x: gx, z: gz, y: H(gx, gz), s: 0.7 + R() * 0.6, ry: R() * 6.28 });
else
fl[Math.floor(R() * 4)].push({ x: gx, z: gz, y: H(gx, gz), s: 0.6 + R() * 0.5, ry: R() * 6.28 });
}
if (R() < 0.35) {
var o2 = hw + 5 + R() * 22, sx = x + nx * sd * o2, sz = z + nz * sd * o2;
if (hgwLifeOk(H, sx, sz, 2)) {
if (R() < 0.55)
scrub.push({ x: sx, z: sz, y: H(sx, sz), s: 0.6 + R() * 1.0, ry: R() * 6.28 });
else
rocks.push({ x: sx, z: sz, y: H(sx, sz) - 0.2, s: 0.3 + R() * 0.9, ry: R() * 6.28 });
}
}
});
segLeft -= lite ? 6 : 3.2;
if (segLeft < 0) {
wallOn = !wallOn;
segLeft = wallOn ? 30 + R() * 60 : 20 + R() * 50;
if (wallOn && R() < 0.5)
side = -side;
}
if (wallOn && !hgwNearHouse(x, z, 26)) {
var wo = hw + 3.6, wx = x + nx * side * wo, wz = z + nz * side * wo;
if (hgwLifeOk(H, wx, wz, 1)) {
var wy = H(wx, wz), ang = Math.atan2(nx, nz);
for (var c = 0; c < (lite ? 1 : 3); c++) {
var off = (c - 1) * 1.05;
wall.push({ x: wx + nz * off, z: wz - nx * off, y: wy + 0.12, s: 1, sx: 0.6 + R() * 0.15, sy: 0.34, sz: 0.5, ry: R() * 6.28 });
if (c !== 1 || !lite)
wall.push({ x: wx + nz * (off + 0.5), z: wz - nx * (off + 0.5), y: wy + 0.5, s: 1, sx: 0.5, sy: 0.26, sz: 0.45, ry: R() * 6.28 });
}
if (R() < 0.7)
cap.push({ x: wx, z: wz, y: wy + 0.8, s: 1, sx: 0.55, sy: 0.13, sz: 0.42, ry: ang });
}
}
if (s - lastHerm > 150 && !hgwNearHouse(x, z, 40)) {
var hx = x + nx * (hw + 1.6), hz = z + nz * (hw + 1.6);
if (hgwLifeOk(H, hx, hz, 1)) {
herms.push([hx, hz, H(hx, hz), Math.atan2(-nx, -nz)]);
lastHerm = s;
}
}
});
});
if (grass.length)
hgwPlant(G, "grass", grass, { keepAll: true });
fl.forEach(function (L, i) { if (L.length)
hgwPlant(G, "flowers", L, { col: FC[i], keepAll: true }); });
if (scrub.length)
hgwPlant(G, "maquis", scrub, { keepAll: true });
if (rocks.length)
hgwPlant(G, "rock", rocks, { mat: hgwMat("rock"), keepAll: true });
if (wall.length)
hgwPlant(G, "rock", wall, { mat: hgwMat("lime"), keepAll: true });
if (cap.length)
hgwPlant(G, "rock", cap, { mat: hgwMat("rock"), keepAll: true });
var marble = hgwMat("marble"), tc = hgwLam(0xB4603A);
herms.forEach(function (q, i) {
var g = new THREE.Group();
g.position.set(q[0], q[2], q[1]);
g.rotation.y = q[3];
G.add(g);
if (i % 3 === 2) {
hgwBox(g, 1.0, 1.3, 0.7, hgwMat("lime"), 0, 0, 0);
hgwBox(g, 1.2, 0.12, 0.9, hgwMat("redtile"), 0, 1.3, 0);
hgwBox(g, 0.5, 0.55, 0.06, hgwLam(0x2A2018), 0, 0.55, 0.33);
var lm = new THREE.Mesh(hgwGeo("hlamp", function () { return new THREE.SphereGeometry(0.06, 6, 4); }), hgwGlowM(0xFFC060));
lm.position.set(0, 0.7, 0.3);
g.add(lm);
}
else {
hgwBox(g, 0.34, 1.25, 0.3, marble, 0, 0, 0);
hgwEll(g, marble, 0.17, 0.21, 0.17, 0, 1.42, 0, 9);
hgwEll(g, marble, 0.12, 0.14, 0.08, 0, 1.3, 0.1, 7);
hgwBox(g, 0.42, 0.14, 0.36, marble, 0, 1.22, 0);
var t = new THREE.Mesh(hgwGeo("hgar", function () { return new THREE.TorusGeometry(0.2, 0.04, 5, 12); }), hgwLam(0x4E7A2E));
t.rotation.x = Math.PI / 2;
t.position.y = 1.24;
g.add(t);
}
var pt = new THREE.Mesh(hgwGeo("hpot", function () { return new THREE.CylinderGeometry(0.2, 0.14, 0.36, 10); }), tc);
pt.position.set(0.45, 0.18, 0.25);
g.add(pt);
hgwEll(g, hgwLam(0xD83A5A), 0.16, 0.14, 0.16, 0.45, 0.42, 0.25, 6);
hgwSolid(q[0], q[1], 0.9, 0.9, q[2] - 0.5, q[2] + 1.6, q[3]);
});
},
function (H, k, where, seed) {
var S = HGW_SCN[k].start, R = wRand(seed), best = null, bs = -1e9, L = HGW_LIFE, roads = L.roads.slice().sort(function (a, b) { return hgwPathLenR(b.pts) - hgwPathLenR(a.pts); });
var ok = function (x, z) { return hgwLifeOk(H, x, z, 2.5); };
if (where === "s") {
for (var t = 0; t < 600; t++) {
var a = R() * 6.283, d = 60 + R() * 360, x = S.x + Math.cos(a) * d, z = S.z + Math.sin(a) * d, sd = H.sd ? H.sd(x, z) : 99, y = H(x, z);
if (sd < 1.2 || sd > 6 || !(y > 0.3) || hgwSolidAt(x, z, y + 0.5))
continue;
var sc = -Math.abs(sd - 3) - Math.abs(d - 180) * 0.01;
if (sc > bs) {
bs = sc;
best = [x, z];
}
}
}
else if (where === "p") {
for (var t2 = 0; t2 < 900; t2++) {
var a2 = R() * 6.283, d2 = 40 + R() * 620, x2 = S.x + Math.cos(a2) * d2, z2 = S.z + Math.sin(a2) * d2;
if (!ok(x2, z2))
continue;
var y2 = H(x2, z2), sl = Math.abs(H(x2 + 3, z2) - H(x2 - 3, z2)) + Math.abs(H(x2, z2 + 3) - H(x2, z2 - 3));
if (sl > 4)
continue;
var sc2 = y2 - d2 * 0.01;
if (sc2 > bs) {
bs = sc2;
best = [x2, z2];
}
}
}
else if (where === "h") {
var hs = L.houses.filter(function (q) { return Math.hypot(q[0] - S.x, q[1] - S.z) < 500; });
if (!hs.length)
hs = L.houses;
if (hs.length) {
var q = hs[Math.floor(R() * hs.length)], c = Math.cos(q[4]), s = Math.sin(q[4]), lx = (R() - 0.5) * q[2] * 0.6, lz = -(q[3] / 2 + 1.0);
var x3 = q[0] + lx * c + lz * s, z3 = q[1] - lx * s + lz * c;
if (ok(x3, z3))
best = [x3, z3];
}
if (!best)
return hgwLifePick(H, k, "t", seed + 1);
}
else if (where === "w" && roads.length) {
var p = roads[0].pts, e = p[p.length - 1], f = p[p.length - 2] || p[0], dl = Math.hypot(e[0] - f[0], e[1] - f[1]) || 1;
for (var t3 = 0; t3 < 40 && !best; t3++) {
var x4 = e[0] + (e[0] - f[0]) / dl * (3 + t3) + (R() - 0.5) * 6, z4 = e[1] + (e[1] - f[1]) / dl * (3 + t3) + (R() - 0.5) * 6;
if (ok(x4, z4))
best = [x4, z4];
}
}
if (!best) {
var rd = roads.length ? roads[Math.floor(R() * Math.min(3, roads.length))].pts : null;
for (var t4 = 0; t4 < 200 && !best; t4++) {
var x5, z5;
if (rd) {
var pt = hgwPathAt(rd, hgwPathLenR(rd) * (0.3 + R() * 0.6));
x5 = pt.x + pt.nx * (18 + R() * 30) * (R() < 0.5 ? 1 : -1);
z5 = pt.z + pt.nz * (18 + R() * 30) * (R() < 0.5 ? 1 : -1);
}
else {
var a6 = R() * 6.283, d6 = 50 + R() * 300;
x5 = S.x + Math.cos(a6) * d6;
z5 = S.z + Math.sin(a6) * d6;
}
if (ok(x5, z5))
best = [x5, z5];
}
}
return best;
},
function (G, k, H) {
var list = HGW_GATHER[k];
if (!list)
return;
list.forEach(function (q, i) {
var at = hgwLifePick(H, k, q[0], 7300 + i * 17 + k.length);
if (!at)
return;
var V = HGW_GVIS[q[1]] || HGW_GVIS.hx_olive, x = at[0], z = at[1], y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
if (q[1] === "hx_olive")
hgwPlant(G, "olive", [{ x: x + 2, z: z, y: H(x + 2, z), s: 1.1 }], { keepAll: true });
if (q[1] === "cr_ore" || q[1] === "cr_crystal" || q[1] === "cr_ember") {
hgwPlant(G, "rock", [{ x: x, z: z - 1.2, y: y - 0.3, s: 1.6 }, { x: x + 1.4, z: z - 0.6, y: y - 0.3, s: 1.1 }], { mat: hgwMat("rock"), keepAll: true });
}
if (q[1] === "cr_wood" || q[1] === "hx_pine") {
for (var l = 0; l < 8; l++) {
var lg = new THREE.Mesh(hgwGeo("hlog", function () { var c = new THREE.CylinderGeometry(0.09, 0.1, 1.1, 6); c.rotateX(Math.PI / 2); return c; }), hgwMat("bark"));
lg.scale.set(1.6, 1.6, 1.4);
lg.position.set(((l % 4) - 1.5) * 0.32, 0.16 + Math.floor(l / 4) * 0.3, 0);
g.add(lg);
}
}
if (q[1] === "cr_hide") {
hgwCyl(g, 0.05, 0.05, 1.8, hgwMat("oak"), -1, 0, 0, 5);
hgwCyl(g, 0.05, 0.05, 1.8, hgwMat("oak"), 1, 0, 0, 5);
hgwBox(g, 2.2, 0.08, 0.08, hgwMat("oak"), 0, 1.75, 0);
hgwBox(g, 1.4, 1.1, 0.04, hgwLam(0x7A5232), 0, 0.6, 0);
}
if (q[1] === "hx_salt") {
hgwBox(g, 3, 0.06, 2, hgwLam(0xF4F2EC), 0, 0, 0);
hgwEll(g, hgwLam(0xF8F6F0), 0.5, 0.35, 0.5, 0.6, 0.06, 0.2, 8);
}
if (q[1] === "cr_coal") {
hgwEll(g, hgwLam(0x3A3028), 1.4, 0.9, 1.4, 0, 0, 0, 10);
hgwSmoke && hgwSmoke(G, x, y + 0.9, z, 0x8A8A8A, 4);
}
if (q[1] === "hx_fish" || q[1] === "hx_tunny") {
[-1, 1].forEach(function (s) { hgwCyl(g, 0.04, 0.04, 1.6, hgwMat("oak"), s * 1.1, 0, 0, 5); });
hgwBox(g, 2.2, 1.2, 0.02, hgwLam(0x8A7A5A, { op: 0.6 }), 0, 0.4, 0);
var bk = hgwCyl(g, 0.35, 0.28, 0.4, hgwLam(0xA88A50), 0, 0, 0.7, 10);
}
var m = typeof kcModel === 'function' ? kcModel(V[0], V[1]) : null;
if (m) {
m.scale.setScalar(2.2);
m.position.set(0.3, 0.05, 0.9);
g.add(m);
}
var id = "gk_" + k + "_" + i;
hgwSpot(x, z + 0.6, 3.2, V[2], V[3], function () { hgwGather(id, q[1], V, g); });
});
},
function (id, kind, V, g) {
var until = HGW_GPICK[id];
if (until && Date.now() < until) {
worldCard("<h3 style='margin:4px 0'>" + esc(V[2]) + "</h3><p>You have had what there is here for now. Worth another look in " + Math.ceil((until - Date.now()) / 60000) + " minutes.</p>");
return;
}
if (typeof cityRpc !== "function" || !(typeof session !== "undefined" && session)) {
worldCard("<h3 style='margin:4px 0'>" + esc(V[2]) + "</h3><p>Sign in first: what you gather is kept in your stock against your account, for the forges.</p>");
return;
}
setStatus("✋ " + esc(V[3]) + "…");
cityRpc("craft_gather", { p_spot: id }).then(function (o) {
if (o && o.ok) {
HGW_GPICK[id] = Date.now() + (+o.regrow || 30) * 60000;
if (g)
g.scale.setScalar(0.8);
worldCard("<h3 style='margin:4px 0'>" + esc(V[2]) + "</h3><p><b>" + esc(o.say || ("+" + o.got + " " + (HGW_MATNAME[kind] || kind))) + "</b></p><p style='font-size:12.5px;opacity:.85'>It is in your stock: take it to a forge to make things with it, or sell it to the city.</p>");
}
else {
if (o && o.wait)
HGW_GPICK[id] = Date.now() + o.wait * 60000;
worldCard("<h3 style='margin:4px 0'>" + esc(V[2]) + "</h3><p>" + esc((o && o.say) || "Nothing came of it.") + "</p>");
}
})
.catch(function (e) { worldCard("<h3 style='margin:4px 0'>" + esc(V[2]) + "</h3><p>" + esc((typeof rpcMissing === "function" && rpcMissing(e)) ? "Gathering here opens after the next update." : String(e && e.message || e)) + "</p>"); });
},
function (G, k, H) {
var rooms = HGW.rooms.filter(function (R) { return R.key !== "twins" && R.out; });
HGW_FINDS.forEach(function (f, i) {
if (f[1] !== k)
return;
var id = f[0];
var at = null, y = null;
if (f[2] === "r" && rooms.length) {
var R = rooms[(i * 7) % rooms.length];
at = [R.x0 + 0.9, R.z0 + 0.9];
y = R.y;
}
if (!at)
at = hgwLifePick(H, k, f[2] === "r" ? "h" : f[2], 5100 + i * 13);
if (!at)
return;
if (y == null)
y = H(at[0], at[1]);
var g = new THREE.Group();
g.position.set(at[0], y, at[1]);
g.rotation.y = hgwH01(at[0], at[1], 3) * 6.28;
G.add(g);
g.userData.keep = 1;
if (typeof kcModel !== 'function')
return;
var m = kcModel(f[4], f[5]);
m.scale.setScalar(1.6);
m.rotation.z = 0.25;
m.position.y = -0.02;
g.add(m);
if (f[2] === "s" || f[2] === "p" || f[2] === "t")
hgwPlant(G, "rock", [{ x: at[0] + 0.7, z: at[1] + 0.3, y: y - 0.15, s: 0.5 }, { x: at[0] - 0.5, z: at[1] + 0.6, y: y - 0.15, s: 0.4 }], { mat: hgwMat("rock"), keepAll: true });
if (f[2] === "p")
for (var c = 0; c < 4; c++)
hgwEll(G, hgwMat("lime"), 0.3 - c * 0.05, 0.16, 0.28 - c * 0.05, at[0] - 1.2, y + 0.12 + c * 0.26, at[1] - 0.8, 7);
var tw = new THREE.Mesh(hgwGeo("hgtw", function () { return new THREE.SphereGeometry(1, 6, 4); }), hgwGlowM(0xFFF2C8, 0.85));
tw.position.y = 0.35;
tw.scale.setScalar(0.001);
g.add(tw);
var S = hgwSpot(at[0], at[1], 1.7, "Something half hidden", "look closer", function () { hgwFindTake(f, g, S); }, f[2] === "r" ? y : undefined);
S.find = id;
if (hgwFindKnown(id)) {
g.visible = false;
S.off = true;
}
HGW.ticks.push(function () {
if (!g.parent || !g.visible)
return;
var P = camera.position, dx = P.x - (HGW.base + hgwSc().x + at[0]), dz = P.z - at[1], d = Math.hypot(dx, dz), t = performance.now() / 1000;
tw.scale.setScalar(d < 16 ? 0.03 + 0.03 * Math.max(0, Math.sin(t * 2.6 + i)) : 0.001);
});
});
},
function (f, g, S) {
var id = f[0], kinds = { t: "treasure", c: "for the forges", d: "decor for your home" };
var show = function (extra) { worldCard("<h3 style='margin:4px 0'>✨ " + esc(f[6]) + "</h3><p style='font-style:italic;line-height:1.5'>" + esc(f[7]) + "</p>" + extra + "<p style='font-size:12px;opacity:.75'>" + hgwFindCount() + " of " + HGW_FINDS.length + " hidden finds of the Greek world · the cabinet is on the map</p>"); };
var done = function () { store.hgFinds = store.hgFinds || {}; store.hgFinds[id] = Date.now(); try {
if (typeof save === "function")
save();
}
catch (e) { } g.visible = false; S.off = true; if (typeof playTone === "function")
try {
playTone(660, 0.12);
setTimeout(function () { playTone(990, 0.16); }, 130);
}
catch (e) { } };
var gives = f[3] === "t" ? "<p><b>In your backpack.</b> The city buys it for " + f[8] + " gold, or keep it with your collection.</p>" : f[3] === "c" ? "<p><b>+" + f[9] + " " + esc((HGW_MATNAME[f[8]] || f[8]).toLowerCase()) + "</b> in your stock, for the forges.</p>" : "<p><b>Yours to set out at home</b> with Rearrange your house.</p>";
if (typeof cityRpc !== "function" || !(typeof session !== "undefined" && session)) {
show("<p>Sign in to keep it: what you find is kept against your account.</p>");
return;
}
cityRpc("hgw_find", { p_id: id }).then(function (o) { if (o && o.ok) {
done();
show(gives);
}
else if (o && o.had) {
done();
show("<p>You found this one before; it is already yours.</p>");
}
else
show("<p>" + esc((o && o.say) || "Nothing came of it.") + "</p>"); })
.catch(function (e) { show("<p>" + esc((typeof rpcMissing === "function" && rpcMissing(e)) ? "Finds can be kept after the next update. It will wait for you here." : String(e && e.message || e)) + "</p>"); });
},
function () {
if (HGW.findsSynced || typeof cityRpc !== "function" || !(typeof session !== "undefined" && session))
return;
HGW.findsSynced = true;
cityRpc("hgw_found_mine", {}).then(function (o) {
if (!o || !o.ok)
return;
store.hgFinds = store.hgFinds || {};
(o.ids || []).forEach(function (id) { if (!store.hgFinds[id])
store.hgFinds[id] = 1; });
HGW.spots.forEach(function (S) { if (S.find && store.hgFinds[S.find])
S.off = true; });
}).catch(function () { });
},
function () {
var by = {};
HGW_FINDS.forEach(function (f) { (by[f[1]] = by[f[1]] || []).push(f); });
var html = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🏺 The cabinet of finds</div><div style='opacity:.8;margin-bottom:6px'>" + hgwFindCount() + " of " + HGW_FINDS.length + " found. Each is hidden somewhere off the story's road.</div>";
HGW_PLACES.forEach(function (p) {
var L = by[p[0]];
if (!L)
return;
html += "<div style='margin:6px 0 2px;font-weight:600'>" + esc(p[1]) + "</div>" + L.map(function (f) {
var k = hgwFindKnown(f[0]);
return "<div style='font-size:12.5px;margin-left:10px'>" + (k ? "✓ " + esc(f[6]) : "? something hidden " + HGW_WHERE[f[2]]) + " <span style='opacity:.6'>(" + (f[3] === "t" ? "treasure" : f[3] === "c" ? "crafting" : "decor") + ")</span></div>";
}).join("");
});
worldCard(html + worldBtn("map", "Back to the map", ""), { map: function () { hgwMapCard(false); } });
},
function (sel) {
if (!sel || sel.querySelector("optgroup[data-hgf]"))
return;
var mine = {};
((typeof myThings !== "undefined" && myThings) || []).forEach(function (t) { if (t && HGW_FDECOR[t.archetype])
mine[t.archetype] = (mine[t.archetype] || 0) + 1; });
var keys = Object.keys(mine);
if (!keys.length)
return;
var draft = (typeof bfDraft === "function" && bfDraft()) || [];
var og = document.createElement("optgroup");
og.label = "🏺 Finds of Greece";
og.setAttribute("data-hgf", "1");
keys.forEach(function (a) { var op = document.createElement("option"); op.value = a; op.textContent = HGW_FDECOR[a][6] + " (" + Math.max(0, mine[a] - bfCount(draft, a)) + " of " + mine[a] + " to set out)"; og.appendChild(op); });
sel.insertBefore(og, sel.firstChild);
},
function (G, H, o, put) {
if (!put.length || !o.c)
return;
var lite = hgwLite(), R = wRand((o.seed || 31) + 907), c = o.c, rx = o.rx || 80, rz = o.rz || rx;
var roads = HGW_LIFE.roads.slice();
(o.roads || []).forEach(function (p) { roads.push({ pts: p, w: 5 }); });
var r0 = Math.max(rx, rz) + 18, olive = [], vine = [], wheat = [], wtuft = [], pasture = [], wall = [], cap = [], fig = [], cyp = [], sheep = [];
var kinds = ["olive", "vine", "wheat", "olive", "fallow", "wheat", "vine", "olive"], nP = lite ? 3 : 7, a0 = R() * 6.283;
for (var p = 0; p < nP; p++) {
var kd = kinds[p % kinds.length], a = a0 + p / nP * 6.283 + (R() - 0.5) * 0.4, d = r0 + 20 + R() * 90, px = c[0] + Math.cos(a) * d, pz = c[1] + Math.sin(a) * d;
var W = 34 + R() * 26, L = 26 + R() * 22, ry = a + (R() - 0.5) * 0.5, cs = Math.cos(ry), sn = Math.sin(ry), at = function (u, v) { return [px + u * cs - v * sn, pz + u * sn + v * cs]; };
var st = kd === "olive" ? 7.5 : kd === "vine" ? 2.2 : kd === "wheat" ? 2.6 : 4, cnt = 0;
for (var u = -W / 2 + st / 2; u < W / 2; u += st)
for (var v = -L / 2 + st / 2; v < L / 2; v += (kd === "vine" ? 1.4 : st)) {
var q = at(u + (kd === "olive" ? (R() - 0.5) * 1.2 : 0), v + (kd === "olive" ? (R() - 0.5) * 1.2 : 0));
if (!hgwFarmOk(H, q[0], q[1], roads))
continue;
var y = H(q[0], q[1]);
cnt++;
if (kd === "olive")
olive.push({ x: q[0], z: q[1], y: y, s: 0.75 + R() * 0.35, ry: R() * 6.28 });
else if (kd === "vine")
vine.push({ x: q[0], z: q[1], y: y, s: 0.9 + R() * 0.2, ry: R() * 6.28 });
else if (kd === "wheat") {
wheat.push({ x: q[0], z: q[1], y: y + 0.04, s: 1, sx: st * 0.85, sy: 1, sz: st * 0.85, ry: ry });
if (!lite || R() < 0.5)
wtuft.push({ x: q[0] + (R() - 0.5), z: q[1] + (R() - 0.5), y: y, s: 0.9 + R() * 0.4, ry: R() * 6.28 });
}
else
pasture.push({ x: q[0], z: q[1], y: y, s: 0.7 + R() * 0.5, ry: R() * 6.28 });
}
if (cnt < 6)
continue;
var per = 2 * (W + L), step = lite ? 2.4 : 1.15, gate = R() * per;
for (var sP = 0; sP < per; sP += step) {
if (Math.abs(sP - gate) < 3)
continue;
var e = sP, u2, v2;
if (e < W) {
u2 = -W / 2 + e;
v2 = -L / 2 - 1.5;
}
else if ((e -= W) < L) {
u2 = W / 2 + 1.5;
v2 = -L / 2 + e;
}
else if ((e -= L) < W) {
u2 = W / 2 - e;
v2 = L / 2 + 1.5;
}
else {
e -= W;
u2 = -W / 2 - 1.5;
v2 = L / 2 - e;
}
var wq = at(u2, v2);
if (!hgwFarmOk(H, wq[0], wq[1], roads))
continue;
var wy = H(wq[0], wq[1]);
wall.push({ x: wq[0], z: wq[1], y: wy + 0.12, s: 1, sx: 0.6 + R() * 0.15, sy: 0.34, sz: 0.5, ry: R() * 6.28 });
if (!lite)
wall.push({ x: wq[0], z: wq[1], y: wy + 0.48, s: 1, sx: 0.5, sy: 0.26, sz: 0.45, ry: R() * 6.28 });
if (!lite && R() < 0.6)
cap.push({ x: wq[0], z: wq[1], y: wy + 0.76, s: 1, sx: 0.55, sy: 0.13, sz: 0.42, ry: ry });
}
var cq = at(W / 2 + 3, L / 2 + 3);
if (hgwFarmOk(H, cq[0], cq[1], roads))
(R() < 0.5 ? fig : cyp).push({ x: cq[0], z: cq[1], y: H(cq[0], cq[1]), s: 0.9 + R() * 0.3, ry: R() * 6.28 });
if (kd === "fallow" && !lite) {
for (var sh = 0; sh < 7; sh++) {
var sq = at((R() - 0.5) * W * 0.7, (R() - 0.5) * L * 0.7);
if (hgwFarmOk(H, sq[0], sq[1], roads))
sheep.push([sq[0], H(sq[0], sq[1]), sq[1], R() * 6.28, sh % 3 === 2]);
}
}
}
if (olive.length)
hgwPlant(G, "olive", olive, { keepAll: true });
if (vine.length)
hgwPlant(G, "vine", vine, { keepAll: true });
if (wheat.length)
hgwInst(G, hgwGeo("fwheat", function () { var g = new THREE.CircleGeometry(0.75, 8); g.rotateX(-Math.PI / 2); return g; }), hgwM("fwheatM", function () { var m = hgwLam(0xC8A650).clone(); m.polygonOffset = true; m.polygonOffsetFactor = -2; m.polygonOffsetUnits = -2; return m; }), wheat, {});
if (wtuft.length)
hgwInst(G, hgwGeo("fwtuft", function () { var parts = []; for (var i = 0; i < 3; i++) {
var p = new THREE.PlaneGeometry(1.5, 1.0);
p.translate(0, 0.5, 0);
p.rotateY(i * Math.PI / 3);
parts.push(p.toNonIndexed());
} return gwMerge(parts); }), hgwM("fwtuftM", function () { var m = new THREE.MeshLambertMaterial({ map: hgwWheatTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), wtuft, {});
if (pasture.length)
hgwPlant(G, "grass", pasture, { keepAll: true });
if (wall.length)
hgwPlant(G, "rock", wall, { mat: hgwMat("lime"), keepAll: true });
if (cap.length)
hgwPlant(G, "rock", cap, { mat: hgwMat("rock"), keepAll: true });
if (fig.length)
hgwPlant(G, "fig", fig, { keepAll: true });
if (cyp.length)
hgwPlant(G, "cypress", cyp, { keepAll: true });
sheep.forEach(function (s) { try {
if (s[4] && typeof hgwGoat === "function")
hgwGoat(G, s[0], s[1], s[2], s[3]);
else
hgwSheep(G, s[0], s[1], s[2], s[3]);
}
catch (e) { } });
for (var tt = 0; tt < 40; tt++) {
var ta = R() * 6.283, td = r0 + 4 + R() * 14, tx = c[0] + Math.cos(ta) * td, tz = c[1] + Math.sin(ta) * td, ok = true;
for (var k2 = 0; k2 < 8 && ok; k2++) {
var ka = k2 / 8 * 6.283;
if (!hgwFarmOk(H, tx + Math.cos(ka) * 7, tz + Math.sin(ka) * 7, roads))
ok = false;
}
if (!ok || !hgwFarmOk(H, tx, tz, roads))
continue;
var ty = H(tx, tz), tg = new THREE.Group();
tg.position.set(tx, ty, tz);
G.add(tg);
var fl = new THREE.Mesh(hgwGeo("thfl", function () { var g = new THREE.CircleGeometry(6.6, 24); g.rotateX(-Math.PI / 2); return g; }), hgwM("thflM", function () { var m = hgwMat("lime").clone(); m.polygonOffset = true; m.polygonOffsetFactor = -3; m.polygonOffsetUnits = -3; return m; }));
fl.position.y = 0.1;
tg.add(fl);
var rim = [];
for (var rs = 0; rs < (lite ? 14 : 28); rs++) {
var ra = rs / (lite ? 14 : 28) * 6.283;
rim.push({ x: tx + Math.cos(ra) * 6.8, z: tz + Math.sin(ra) * 6.8, y: H(tx + Math.cos(ra) * 6.8, tz + Math.sin(ra) * 6.8) + 0.12, s: 1, sx: 0.6, sy: 0.3, sz: 0.4, ry: ra });
}
hgwPlant(G, "rock", rim, { mat: hgwMat("rock"), keepAll: true });
for (var sv = 0; sv < (lite ? 2 : 5); sv++) {
var sa = sv * 1.3, sb = new THREE.Mesh(hgwGeo("sheaf", function () { return new THREE.CylinderGeometry(0.28, 0.36, 1.1, 8); }), hgwLam(0xD8B460));
sb.position.set(Math.cos(sa) * 4.6, 0.55, Math.sin(sa) * 4.6);
sb.rotation.z = (sv % 2 ? 0.15 : -0.1);
tg.add(sb);
}
var fk = hgwCyl(tg, 0.03, 0.03, 2.2, hgwMat("oak"), 5.4, 0, 0.6, 5);
if (fk)
fk.rotation.z = 0.35;
var bg = new THREE.Group();
bg.position.set(tx + Math.cos(ta) * 12, H(tx + Math.cos(ta) * 12, tz + Math.sin(ta) * 12), tz + Math.sin(ta) * 12);
bg.rotation.y = -ta;
G.add(bg);
if (hgwLifeOk(H, bg.position.x, bg.position.z, 1)) {
hgwBox(bg, 4.2, 0.5, 1.0, hgwMat("lime"), 0, 0, 0);
for (var bh = 0; bh < 5; bh++) {
var hv = new THREE.Mesh(hgwGeo("hive", function () { var g = new THREE.CylinderGeometry(0.26, 0.3, 0.95, 10); g.rotateX(Math.PI / 2); return g; }), hgwLam(0xB4744A));
hv.position.set(-1.6 + bh * 0.8, 0.78, 0);
bg.add(hv);
}
hgwSolid(bg.position.x, bg.position.z, 4.2, 1.0, bg.position.y - 1, bg.position.y + 1.1, -ta);
}
break;
}
},
function () {
if (HGW_WHEAT_TEX)
return HGW_WHEAT_TEX;
var c = document.createElement("canvas");
c.width = 128;
c.height = 96;
var x = c.getContext("2d"), R = wRand(77);
for (var i = 0; i < 34; i++) {
var bx = 4 + R() * 120, lean = (R() - 0.5) * 14, top = 6 + R() * 26, col = ["#C9A247", "#D8B65A", "#B8923A", "#E2C46E"][i % 4];
x.strokeStyle = col;
x.lineWidth = 1.6;
x.beginPath();
x.moveTo(bx, 96);
x.quadraticCurveTo(bx + lean * 0.3, 60, bx + lean, top + 10);
x.stroke();
x.fillStyle = col;
x.save();
x.translate(bx + lean, top + 6);
x.rotate(lean * 0.03);
x.beginPath();
x.ellipse(0, 0, 2.6, 8, 0, 0, 6.283);
x.fill();
x.strokeStyle = "#E8D49A";
x.lineWidth = 0.8;
for (var a = -1; a <= 1; a += 2) {
x.beginPath();
x.moveTo(0, -6);
x.lineTo(a * 3, -16);
x.stroke();
}
x.restore();
}
HGW_WHEAT_TEX = new THREE.CanvasTexture(c);
return HGW_WHEAT_TEX;
},
function (G, k, H) {
var s = HGW_SC[k];
if (!s)
return;
var B = s.bound || 1200, lite = hgwLite(), R = wRand(4400 + k.length * 97 + k.charCodeAt(0) * 13), roads = HGW_LIFE.roads.slice(), spots = HGW.spots.slice();
var A = { olive: [], vrow: [], wheat: [], wtuft: [], stook: [], pasture: [], wall: [], cap: [], cyp: [], pine: [], oak: [], hay: [], sheep: [] }, folk = 0, maxFolk = lite ? 3 : 10, cell = lite ? 190 : 120, st0 = HGW_SCN[k].start || { x: 0, z: 0 };
var free = function (x, z, clr) {
if (Math.abs(x) > B - 30 || Math.abs(z) > B - 30)
return false;
if (!hgwLifeOk(H, x, z, clr || 1.5))
return false;
if (H.sd && H.sd(x, z) < 10)
return false;
if (hgwNearHouse(x, z, 45))
return false;
for (var i = 0; i < roads.length; i++)
if (hgwPathD(x, z, roads[i].pts) < roads[i].w / 2 + 4)
return false;
for (var j = 0; j < spots.length; j++)
if (Math.hypot(x - spots[j].x, z - spots[j].z) < 8)
return false;
return true;
};
var slope = function (x, z) { return Math.abs(H(x + 6, z) - H(x - 6, z)) + Math.abs(H(x, z + 6) - H(x, z - 6)); };
for (var cx = -B + cell / 2; cx < B; cx += cell)
for (var cz = -B + cell / 2; cz < B; cz += cell) {
var px = cx + (R() - 0.5) * cell * 0.6, pz = cz + (R() - 0.5) * cell * 0.6, roll = R();
if (!free(px, pz, 3))
continue;
var sl = slope(px, pz), ry = R() * 3.1416, cs = Math.cos(ry), sn = Math.sin(ry), at = function (u, v) { return [px + u * cs - v * sn, pz + u * sn + v * cs]; };
var kd = sl > 9 ? (roll < 0.5 ? "copse" : roll < 0.8 ? "pasture" : "olive") : roll < 0.27 ? "olive" : roll < 0.45 ? "vine" : roll < 0.65 ? "wheat" : roll < 0.8 ? "pasture" : roll < 0.9 ? "copse" : "stooks";
var W = 36 + R() * 34, L = 28 + R() * 26, cnt = 0;
if (kd === "olive") {
for (var u = -W / 2; u < W / 2; u += 8.5)
for (var v = -L / 2; v < L / 2; v += 8.5) {
var q = at(u + (R() - 0.5) * 1.6, v + (R() - 0.5) * 1.6);
if (free(q[0], q[1])) {
A.olive.push({ x: q[0], z: q[1], y: H(q[0], q[1]), s: 0.75 + R() * 0.4, ry: R() * 6.28 });
cnt++;
}
}
}
else if (kd === "vine") {
for (var v2 = -L / 2; v2 < L / 2; v2 += 2.6) {
var seg = 0;
for (var u2 = -W / 2; u2 < W / 2; u2 += 6) {
var q2 = at(u2 + 3, v2);
if (free(q2[0], q2[1])) {
A.vrow.push({ x: q2[0], z: q2[1], y: H(q2[0], q2[1]), s: 1, sx: 6, sy: 1, sz: 1, ry: -ry });
cnt++;
}
}
}
}
else if (kd === "wheat" || kd === "stooks") {
for (var u3 = -W / 2; u3 < W / 2; u3 += 2.8)
for (var v3 = -L / 2; v3 < L / 2; v3 += 2.8) {
var q3 = at(u3, v3);
if (!free(q3[0], q3[1]))
continue;
var y3 = H(q3[0], q3[1]);
cnt++;
A.wheat.push({ x: q3[0], z: q3[1], y: y3 + 0.04, s: 1, sx: kd === "wheat" ? 2.5 : 3.2, sy: 1, sz: kd === "wheat" ? 2.5 : 3.2, ry: ry });
if (kd === "wheat") {
if (!lite || R() < 0.4)
A.wtuft.push({ x: q3[0] + (R() - 0.5), z: q3[1] + (R() - 0.5), y: y3, s: 0.9 + R() * 0.4, ry: R() * 6.28 });
}
else if (R() < 0.12)
A.stook.push({ x: q3[0], z: q3[1], y: y3, s: 1, sx: 1.3, sy: 1.6 + R() * 0.4, sz: 1.3, ry: R() * 6.28 });
}
}
else if (kd === "pasture") {
for (var i4 = 0; i4 < (lite ? 10 : 26); i4++) {
var q4 = at((R() - 0.5) * W, (R() - 0.5) * L);
if (free(q4[0], q4[1])) {
A.pasture.push({ x: q4[0], z: q4[1], y: H(q4[0], q4[1]), s: 0.7 + R() * 0.6, ry: R() * 6.28 });
cnt++;
}
}
if (!lite)
for (var sh = 0; sh < 6 + Math.floor(R() * 6); sh++) {
var q5 = at((R() - 0.5) * W * 0.6, (R() - 0.5) * L * 0.6);
if (free(q5[0], q5[1]))
A.sheep.push([q5[0], H(q5[0], q5[1]), q5[1], R() * 6.28, R() < 0.35]);
}
}
else {
for (var i6 = 0; i6 < (lite ? 5 : 11); i6++) {
var q6 = at((R() - 0.5) * W * 0.8, (R() - 0.5) * L * 0.8);
if (free(q6[0], q6[1])) {
(R() < 0.55 ? A.oak : A.pine).push({ x: q6[0], z: q6[1], y: H(q6[0], q6[1]), s: 0.7 + R() * 0.5, ry: R() * 6.28 });
cnt++;
}
}
continue;
}
if (cnt < 5)
continue;
var per = 2 * (W + L), stp = lite ? 3 : 1.5, gate = R() * per;
if (kd !== "pasture" || R() < 0.6)
for (var sP = 0; sP < per; sP += stp) {
if (Math.abs(sP - gate) < 3)
continue;
var e = sP, uu, vv;
if (e < W) {
uu = -W / 2 + e;
vv = -L / 2 - 2;
}
else if ((e -= W) < L) {
uu = W / 2 + 2;
vv = -L / 2 + e;
}
else if ((e -= L) < W) {
uu = W / 2 - e;
vv = L / 2 + 2;
}
else {
e -= W;
uu = -W / 2 - 2;
vv = L / 2 - e;
}
var wq = at(uu, vv);
if (!free(wq[0], wq[1], 1))
continue;
var wy = H(wq[0], wq[1]);
A.wall.push({ x: wq[0], z: wq[1], y: wy + 0.14, s: 1, sx: 0.75, sy: 0.38, sz: 0.55, ry: R() * 6.28 });
if (!lite && R() < 0.5)
A.cap.push({ x: wq[0], z: wq[1], y: wy + 0.55, s: 1, sx: 0.6, sy: 0.15, sz: 0.45, ry: ry });
}
var gq = at(W / 2 + 6, L / 2 + 6);
if (free(gq[0], gq[1], 2.5)) {
var gy = H(gq[0], gq[1]), what = Math.floor(R() * 5), fg = new THREE.Group();
fg.position.set(gq[0], gy, gq[1]);
fg.rotation.y = R() * 6.28;
G.add(fg);
if (what === 0) {
hgwCyl(fg, 0.9, 1.0, 0.8, hgwMat("lime"), 0, 0, 0, 12);
var dk = new THREE.Mesh(hgwGeo("wellw", function () { var g = new THREE.CircleGeometry(0.75, 12); g.rotateX(-Math.PI / 2); return g; }), hgwLam(0x1A2A30));
dk.position.y = 0.75;
fg.add(dk);
hgwCyl(fg, 0.08, 0.1, 3.2, hgwMat("oak"), 1.4, 0, 0, 6);
var sw = hgwCyl(fg, 0.05, 0.05, 6, hgwMat("oak"), 1.4, 2.4, 0, 5);
sw.rotation.z = 1.2;
sw.position.y = 3.2;
hgwSolid(gq[0], gq[1], 2, 2, gy - 1, gy + 0.9, 0);
}
else if (what === 1) {
[[-2.4, -1.6], [2.4, -1.6], [-2.4, 1.6], [2.4, 1.6]].forEach(function (p) { hgwCyl(fg, 0.12, 0.14, 2.6, hgwMat("oak"), p[0], 0, p[1], 6); });
var rf = hgwBox(fg, 5.6, 0.14, 4.0, hgwMat("redtile"), 0, 2.6, 0);
A.hay.push({ x: gq[0], z: gq[1], y: gy, s: 0.9, ry: R() * 6.28 });
}
else if (what === 2) {
if (typeof hgwCart === "function")
try {
hgwCart(G, gq[0], gq[1], R() * 6.28, { y: gy });
}
catch (e) { }
}
else if (what === 3) {
hgwBox(fg, 0.9, 1.2, 0.7, hgwMat("lime"), 0, 0, 0);
hgwBox(fg, 1.1, 0.12, 0.9, hgwMat("redtile"), 0, 1.2, 0);
hgwBox(fg, 0.45, 0.5, 0.06, hgwLam(0x2A2018), 0, 0.5, 0.33);
hgwEll(fg, hgwLam(0xD8B040), 0.12, 0.1, 0.12, 0, 1.36, 0, 6);
hgwSolid(gq[0], gq[1], 1, 0.8, gy - 0.5, gy + 1.4, 0);
}
else {
A.hay.push({ x: gq[0], z: gq[1], y: gy, s: 1.1, ry: 0 });
A.hay.push({ x: gq[0] + 3, z: gq[1] + 1, y: H(gq[0] + 3, gq[1] + 1), s: 0.9, ry: 0 });
}
}
if (folk < maxFolk && R() < 0.55) {
var F = HGW_FIELD_FOLK[Math.floor(R() * HGW_FIELD_FOLK.length)], fq = at((R() - 0.5) * W * 0.4, (R() - 0.5) * L * 0.4);
if (free(fq[0], fq[1])) {
try {
hgwCrowd(k + "fld" + folk, [[F[0], F[1], F[2], F[3], "greek"]], fq[0] - 1, fq[1] - 1, fq[0] + 1, fq[1] + 1, { wander: 5 });
folk++;
}
catch (e) { }
}
}
}
roads.forEach(function (rd) {
var last = -99;
hgwRoadWalk(rd.pts, lite ? 18 : 9, function (x, z, nx, nz, s2) {
if (s2 - last < (lite ? 18 : 9))
return;
last = s2;
if (R() < 0.45)
return;
var sd = R() < 0.5 ? 1 : -1, o2 = rd.w / 2 + 2.5, tx = x + nx * sd * o2, tz = z + nz * sd * o2;
if (hgwLifeOk(H, tx, tz, 1.2) && !hgwNearHouse(tx, tz, 20))
A.cyp.push({ x: tx, z: tz, y: H(tx, tz), s: 0.8 + R() * 0.4, ry: R() * 6.28 });
});
});
hgwCountryFlush(G, A);
},
function (G, A) {
var keep = { keepAll: true };
if (A.olive.length)
hgwPlant(G, "olivelo", A.olive, keep);
if (A.vrow.length)
hgwInst(G, hgwGeo("vrow", function () { var g = new THREE.BoxGeometry(1, 1.15, 0.9); g.translate(0, 0.75, 0); return g; }), hgwM("vrowM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x5E7A30, map: hgwLeafTex(), alphaTest: 0.3 }); m.userData.noPhoto = 1; return m; }), A.vrow, {});
if (A.wheat.length)
hgwInst(G, hgwGeo("fwheat", function () { var g = new THREE.CircleGeometry(0.75, 8); g.rotateX(-Math.PI / 2); return g; }), hgwM("fwheatM", function () { var m = hgwLam(0xC8A650).clone(); m.polygonOffset = true; m.polygonOffsetFactor = -2; m.polygonOffsetUnits = -2; return m; }), A.wheat, {});
if (A.wtuft.length)
hgwInst(G, hgwGeo("fwtuft", function () { var parts = []; for (var i = 0; i < 3; i++) {
var p = new THREE.PlaneGeometry(1.5, 1.0);
p.translate(0, 0.5, 0);
p.rotateY(i * Math.PI / 3);
parts.push(p.toNonIndexed());
} return gwMerge(parts); }), hgwM("fwtuftM", function () { var m = new THREE.MeshLambertMaterial({ map: hgwWheatTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), A.wtuft, {});
if (A.stook.length) {
hgwInst(G, hgwGeo("stookC", function () { var parts = []; for (var i = 0; i < 4; i++) {
var p = new THREE.PlaneGeometry(0.9, 1.0);
p.translate(0, 0.5, 0.12);
p.rotateX(-0.18);
p.rotateY(i * Math.PI / 2);
parts.push(p.toNonIndexed());
} return gwMerge(parts); }), hgwM("fwtuftM", function () { var m = new THREE.MeshLambertMaterial({ map: hgwWheatTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), A.stook, {});
hgwInst(G, hgwGeo("stookB", function () { var g = new THREE.CylinderGeometry(0.2, 0.34, 0.62, 7, 1, true); g.translate(0, 0.31, 0); return g; }), hgwLam(0xB89448, { ds: 1 }), A.stook, {});
}
if (A.hay.length)
hgwInst(G, hgwGeo("hay", function () { var g = new THREE.SphereGeometry(1.4, 10, 6, 0, 6.283, 0, 1.7); g.scale(1, 1.3, 1); return g; }), hgwLam(0xC8A458), A.hay, {});
if (A.pasture.length)
hgwPlant(G, "grass", A.pasture, keep);
if (A.wall.length)
hgwPlant(G, "rock", A.wall, { mat: hgwMat("lime"), keepAll: true });
if (A.cap.length)
hgwPlant(G, "rock", A.cap, { mat: hgwMat("rock"), keepAll: true });
if (A.cyp.length)
hgwPlant(G, "cypress", A.cyp, keep);
if (A.pine.length)
hgwPlant(G, "pine", A.pine, keep);
if (A.oak.length)
hgwPlant(G, "tree", A.oak, { keepAll: true, col: 0x4A6A34 });
A.sheep.forEach(function (s) { try {
if (s[4])
hgwGoat(G, s[0], s[1], s[2], s[3]);
else
hgwSheep(G, s[0], s[1], s[2], s[3]);
}
catch (e) { } });
},
function (G, k, H) {
var L = HGW_LIFE.houses;
if (!L.length)
return;
var X = [-1300, 1440];
var R = hgwRoom(G, "gkhome", X[0], X[1], 10, 8, { wall: "whitewash", floor: "gkfloor", h: 3.4, name: "A house", beams: true, lightI: 0.8, lightCol: 0xFFC890 });
if (!R)
return;
HGW_HOME.room = R;
HGW_HOME.g = null;
hgwSpot(R.cx, R.z1 - 0.6, 1.4, "The door", "go out", function () { var a = HGW_HOME.at; if (a)
hgwGo({ sc: HGW.sc, x: a.x, z: a.z, ry: a.ry }, null); }, R.y);
L.forEach(function (h, i) {
var x = h[0], z = h[1], d = h[3], ry = h[4], o2 = d / 2 + 1.1, dx = x + Math.sin(ry) * o2, dz = z + Math.cos(ry) * o2;
if (!(H(dx, dz) > 0.3))
return;
for (var q = 0; q < HGW.doors.length; q++) {
var O = HGW.doors[q].out;
if (O && Math.hypot(O.x - dx, O.z - dz) < 5)
return;
}
var seed = Math.floor(hgwH01(x, z, 5) * 1e6), tr = HGW_TRADES[seed % HGW_TRADES.length], who = HGW_HOME_NAMES[(seed >> 3) % HGW_HOME_NAMES.length];
hgwSpot(dx, dz, 1.6, "Knock at the door of " + tr[1] + " " + who, "go in", function () {
HGW_HOME.at = { x: dx + Math.sin(ry) * 1.2, z: dz + Math.cos(ry) * 1.2, ry: ry };
R.out = HGW_HOME.at;
hgwHomeDress(seed, tr[0], who, k);
hgwGo({ sc: HGW.sc, x: R.cx, z: R.z1 - 1.4, y: R.y, ry: 0 }, "🚪 <b>" + hgEsc(tr[1].charAt(0).toUpperCase() + tr[1].slice(1) + " " + who) + ".</b> “Come in, come in, sit by the fire.”");
});
});
var f = L[0];
R.out = { x: f[0] + Math.sin(f[4]) * (f[3] / 2 + 2.3), z: f[1] + Math.cos(f[4]) * (f[3] / 2 + 2.3), ry: f[4] };
},
function (seed, trade, who, k) {
var R = HGW_HOME.room;
if (!R)
return;
if (HGW_HOME.g && HGW_HOME.g.parent)
HGW_HOME.g.parent.remove(HGW_HOME.g);
var g = new THREE.Group();
R.g.add(g);
HGW_HOME.g = g;
var r = wRand(seed), W = R.w, D = R.d, lite = hgwLite(), cl = [0x8A2A2A, 0x2A4A7A, 0x6A5A2A, 0x4A6A3A, 0x7A3A6A][seed % 5];
hgwHearth(g, 0, -D / 2 + 0.45, 0, { fire: false, h: 3.4, pot: true });
var em = new THREE.Mesh(hgwGeo("embers", function () { return new THREE.SphereGeometry(0.3, 8, 4, 0, 6.283, 0, 1.4); }), hgwGlowM(0xFF7A30, 0.9));
em.position.set(0, 0.02, -D / 2 + 0.6);
em.scale.y = 0.35;
g.add(em);
hgwBox(g, 0.5, 0.6, 0.1, hgwLam(0x2A2018), -2.4, 1.5, -D / 2 + 0.12);
hgwEll(g, hgwMat("lime"), 0.1, 0.18, 0.08, -2.4, 1.62, -D / 2 + 0.2, 8);
[[-W / 2 + 0.12, Math.PI / 2], [W / 2 - 0.12, -Math.PI / 2]].forEach(function (q) { hgwBox(g, 0.04, 0.9, D - 0.4, hgwLam(cl), q[0], 0, 0); });
hgwTable(g, 0, 0.4, 1.6, 0.9, 0.72, { mat: "oak" });
hgwCouch(g, -W / 2 + 1.3, -0.6, Math.PI / 2, cl);
if (r() < 0.7)
hgwCouch(g, W / 2 - 1.3, -0.6, -Math.PI / 2, 0x6A4A2A);
var rug = new THREE.Mesh(hgwGeo("homerug", function () { var p = new THREE.PlaneGeometry(3.2, 2.2); p.rotateX(-Math.PI / 2); return p; }), hgwLam(cl));
rug.position.set(0, 0.015, 0.4);
g.add(rug);
for (var j = 0; j < (lite ? 2 : 4); j++)
hgwPithos(g, W / 2 - 0.6, 0, -D / 2 + 0.9 + j * 0.95, 0.42 + r() * 0.12);
if (typeof hgwChest === "function")
hgwChest(g, -W / 2 + 0.7, 0, D / 2 - 1.2, Math.PI / 2, {});
hgwCyl(g, 0.04, 0.06, 1.5, hgwMat("brass"), 1.6, 0, -1.6, 6);
var lm = new THREE.Mesh(hgwGeo("hlampb", function () { return new THREE.SphereGeometry(0.07, 6, 4); }), hgwGlowM(0xFFC060));
lm.position.set(1.6, 1.58, -1.6);
g.add(lm);
if (trade === "family" || trade === "weaver") {
hgwLoom(g, -1.8, -D / 2 + 1.2, 0, trade === "weaver" ? 0xC84A3A : 0xD8C8A8);
if (trade === "weaver")
for (var b = 0; b < 4; b++)
hgwEll(g, hgwLam([0xC84A3A, 0x2A4A8A, 0xE8D8B0, 0x4A7A3A][b]), 0.22, 0.16, 0.22, -W / 2 + 0.6 + b * 0.5, 0.16, D / 2 - 0.5, 8);
}
if (trade === "potter") {
hgwCyl(g, 0.45, 0.5, 0.6, hgwMat("lime"), -2.2, 0, -1.4, 14);
hgwCyl(g, 0.5, 0.5, 0.06, hgwMat("oak"), -2.2, 0.6, -1.4, 16);
hgwCyl(g, 0.18, 0.24, 0.32, hgwLam(0xB4603A), -2.2, 0.66, -1.4, 12);
for (var p = 0; p < 7; p++)
hgwCyl(g, 0.1 + r() * 0.08, 0.08 + r() * 0.06, 0.25 + r() * 0.25, hgwLam(p % 2 ? 0xB4603A : 0x2A2018), -W / 2 + 0.5 + p * 0.42, 0.92, -D / 2 + 0.4, 10);
hgwBox(g, 3.2, 0.06, 0.4, hgwMat("oak"), -W / 2 + 1.8, 0.9, -D / 2 + 0.4);
}
if (trade === "smith") {
hgwBox(g, 0.5, 0.55, 0.3, hgwMat("iron"), -2, 0.4, -1.2);
hgwBox(g, 0.7, 0.4, 0.7, hgwMat("darkoak"), -2, 0, -1.2);
hgwBox(g, 0.08, 0.06, 0.5, hgwMat("iron"), -1.9, 0.98, -1.2);
for (var t = 0; t < 4; t++)
hgwBox(g, 0.05, 0.6, 0.08, hgwMat("iron"), -W / 2 + 0.4 + t * 0.25, 1.2, -D / 2 + 0.2);
}
if (trade === "fisher") {
for (var n = 0; n < 3; n++) {
var net = new THREE.Mesh(hgwGeo("homenet", function () { return new THREE.PlaneGeometry(1.4, 1.8); }), hgwLam(0x8A7A5A, { ds: 1 }));
net.position.set(-W / 2 + 0.15, 1.6, -1.8 + n * 1.6);
net.rotation.y = Math.PI / 2;
g.add(net);
}
for (var o = 0; o < 3; o++)
hgwBox(g, 0.08, 0.08, 2.4, hgwMat("oak"), -1.6 + o * 0.2, 0.06, D / 2 - 1.6);
if (typeof kcModel === "function") {
var fs = kcModel("dolphin", "silver");
fs.scale.setScalar(0.6);
fs.position.set(0.3, 0.78, 0.3);
g.add(fs);
}
}
if (trade === "press") {
hgwCyl(g, 0.9, 1.0, 0.6, hgwMat("lime"), -2, 0, -1.3, 16);
hgwCyl(g, 0.45, 0.45, 0.7, hgwMat("rock"), -2, 0.6, -1.3, 12);
hgwBox(g, 2.6, 0.12, 0.12, hgwMat("oak"), -2, 1.0, -1.3);
}
if (trade === "wine") {
for (var a = 0; a < 6; a++) {
var am = kcModel ? kcModel("amphora", "terracotta") : null;
if (am) {
am.scale.setScalar(0.9);
am.position.set(-W / 2 + 0.6 + (a % 3) * 0.55, 0, -D / 2 + 0.5 + Math.floor(a / 3) * 0.6);
g.add(am);
}
}
hgwCyl(g, 0.7, 0.7, 0.5, hgwLam(0x5A2A3A), -1.4, 0, 1.6, 14);
}
hgwBed(g, W / 2 - 1.2, D / 2 - 1.5, Math.PI, {});
var cur = new THREE.Mesh(hgwGeo("homecur", function () { return new THREE.PlaneGeometry(2.4, 2.3); }), hgwLam(0xC8B488, { ds: 1 }));
cur.position.set(W / 2 - 2.5, 1.15, D / 2 - 1.5);
cur.rotation.y = Math.PI / 2;
g.add(cur);
R.name = "The house of " + who;
},
function () {
var S = hgwSc(), k = S.env;
if (HGW.envK && HGW_ENV[HGW.envK])
k = HGW.envK;
if (HGW.night)
k = HGW.envK === "moon" || HGW.envK === "storm" ? HGW.envK : "night";
if (hgwInRoom()) {
var L = hgwLocalSc(), R = hgwRoomAt(L.x, L.z);
k = R ? R.env : "indoor";
}
var E = {}, B = HGW_ENV[k] || HGW_ENV.lake;
for (var q in B)
E[q] = B[q];
if (hgwLite() && E.fogD)
E.fogD *= 1.35;
return E;
},
function (x, z, feet) {
if (HGW.moving || HGW.ride)
return true;
var S = hgwSc(), D = HGW_SCN[HGW.sc];
if (!D)
return false;
if (hgwInRoom()) {
if (hgwSolidAt(x, z, feet))
return true;
return hgwFloorAt(x, z, feet) === null;
}
if (Math.abs(x) > S.bound || Math.abs(z) > S.bound)
return true;
if (hgwSolidAt(x, z, feet))
return true;
var fl = hgwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = hgwLand(x, z);
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
HGW.t += dt;
if (!HGW.built || !HGW.scG)
return;
var S = hgwSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72;
HGW.inRm = hgwInRoom();
HGW.et = (HGW.et || 0) + dt;
if (HGW.et > 0.8) {
HGW.et = 0;
worldEnv(hgwEnvNow());
}
var flow = HGW.t * 0.03;
HGW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * (m.userData.fx || 0.3), flow * (m.userData.fz || 1)); });
HGW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (HGW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(HGW.t * 3 + i * 2)) * 0.3; f.rotation.y = HGW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(HGW.t * 1.3) * 0.08;
}
else if (k === "snowfall") {
var pa = F.geometry.attributes.position;
for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) - dt * (F.userData.sp || 1.4);
if (y < 0)
y += 40;
pa.setY(i, y);
pa.setX(i, pa.getX(i) + Math.sin(HGW.t * 0.5 + i) * dt * 0.3);
}
pa.needsUpdate = true;
F.position.set(L.x, HGW.inRm ? -500 : hgwLand(L.x, L.z), L.z);
}
});
(HGW.ticks || []).forEach(function (f) { try {
f(dt, L);
}
catch (e) { } });
(HGW.smoke || []).forEach(function (g) { g.children.forEach(function (m, i) { m.position.x += Math.sin(HGW.t * 0.1 + i) * dt * 0.4; m.rotation.y += dt * 0.02; }); });
HGW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return hgwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof hgbTick === "function")
try {
hgbTick(dt, L);
}
catch (e) {
var em = String(e && e.message);
HGW.e1 = HGW.e1 || {};
if (!HGW.e1[em]) {
HGW.e1[em] = 1;
if (window.console)
console.warn("[homer] book", e && e.stack ? String(e.stack).slice(0, 400) : e);
}
}
if (!HGW.bannerBook)
worldBanner("<b>🏛️ " + HGW_NAME + "</b> · " + esc(hgwPlaceName(L)) + (HGW.night ? " · night" : ""));
HGW.pt = (HGW.pt || 0) + dt;
if (HGW.pt < 0.15)
return;
HGW.pt = 0;
if (HGW.moving || HGW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
HGW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof hgbTalk === "function" && hgbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
HGW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : hgwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof hgbSpot === "function")
hgbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof hgbIdlePrompt === "function")
hgbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = hgwAtPt(opt.at) || (typeof hgbStartAt === "function" && hgbStartAt()) || hgwAtPt("place");
try {
hgwCrxKinds();
if (typeof crxWarm === "function" && !hgwLite())
crxWarm(["horse", "hgbay", "hgwhite"]);
}
catch (e) { }
hgwScene(A.sc);
var S = HGW_SC[A.sc], y = A.y != null ? A.y : hgwGround(A.x, A.z);
camera.position.set(HGW.base + S.x + A.x, y + 1.72, A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
HGW.moving = false;
HGW.ride = null;
HGW.inRm = hgwInRoom();
worldEnv(hgwEnvNow());
setStatus("🏛️ <b>" + HGW_NAME + ".</b> Greece and the sea of the myths, every place where it really is. <b>Press E</b> for the book, and the map.");
if (typeof hgbEnter === "function")
try {
hgbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[homer] enter", e);
}
},
function () {
hgwSceneDrop();
for (var k in HGW.mats) {
var m = HGW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in HGW.tex) {
var x = HGW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in HGW_GEO) {
try {
HGW_GEO[g].dispose();
}
catch (e) { }
}
HGW.mats = {};
HGW.tex = {};
HGW_GEO = {};
HGW.built = false;
HGW.G = null;
HGW.lights = 0;
},
function (P, n, sp) {
var lite = hgwLite();
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
HGW.fx.push(p);
return p;
},
function (fn) {
if (HGW_MAP)
return fn(HGW_MAP);
if (HGW_MAPW) {
HGW_MAPW.push(fn);
return;
}
HGW_MAPW = [fn];
var done = function (J) { HGW_MAP = J; var w = HGW_MAPW; HGW_MAPW = null; w.forEach(function (f) { try {
f(J);
}
catch (e) { } }); };
try {
fetch("data/homer/map.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (focus) {
hgwMapData(function (J) {
var W = 760, H = 430, bb = J ? J.bbox : [-7, 29, 44, 47], lo0 = focus ? 5 : bb[0], lo1 = focus ? 33 : bb[2], la0 = focus ? 32 : bb[1], la1 = focus ? 44 : bb[3];
var kx = Math.cos(38 * Math.PI / 180), sx = W / ((lo1 - lo0) * kx), sy = H / (la1 - la0), s = Math.min(sx, sy), ox = (W - (lo1 - lo0) * kx * s) / 2, oy = (H - (la1 - la0) * s) / 2;
var P = function (lo, la) { return [ox + (lo - lo0) * kx * s, oy + (la1 - la) * s]; };
var cv = document.createElement("canvas");
cv.width = W * 2;
cv.height = H * 2;
cv.style.cssText = "width:100%;max-width:" + W + "px;border-radius:6px;display:block;margin:6px 0";
var c = cv.getContext("2d");
c.scale(2, 2);
var sea = c.createLinearGradient(0, 0, 0, H);
sea.addColorStop(0, "#1E4A6E");
sea.addColorStop(1, "#163A58");
c.fillStyle = sea;
c.fillRect(0, 0, W, H);
if (J)
J.land.forEach(function (r) { c.beginPath(); for (var i = 0; i < r.length; i += 2) {
var q = P(r[i], r[i + 1]);
if (i)
c.lineTo(q[0], q[1]);
else
c.moveTo(q[0], q[1]);
} c.closePath(); c.fillStyle = "#D8C89A"; c.fill(); c.strokeStyle = "rgba(80,60,30,.55)"; c.lineWidth = 0.8; c.stroke(); });
c.font = "italic 13px Georgia,serif";
c.fillStyle = "rgba(230,240,250,.5)";
[["THE AEGEAN SEA", 24.6, 38.4], ["THE IONIAN SEA", 18.2, 38.0], ["THE TYRRHENIAN SEA", 11.6, 40.0], ["THE GREAT SEA", 20, 34.2], ["THE BLACK SEA (THE INHOSPITABLE SEA)", 33, 43.2]].forEach(function (t) { var q = P(t[1], t[2]); if (q[0] > 0 && q[0] < W && q[1] > 0 && q[1] < H)
c.fillText(t[0], q[0] - 40, q[1]); });
var next = null;
try {
var S = hgbS(), C = HGB_CH[S.ch], st = hgbStep(), p = st && st.at ? hgbPos(st.at) : (C && C.start ? hgbPos(C.start) : null);
if (S.started && !S.done && p)
next = p.sc;
}
catch (e) { }
var fns = {}, btn = "", spots = [], free = hgwSeaFree(), locked = 0;
Object.keys(HGW_SC).forEach(function (k) {
var L = hgwLonLat(k);
if (!L || !HGW_SCN[k])
return;
var q = P(L[0], L[1]);
if (q[0] < 0 || q[0] > W || q[1] < 0 || q[1] > H)
return;
var open = free || k === next || k === HGW.sc || hgwSeenAny(k);
if (!open)
locked++;
else
spots.push([k, q]);
c.beginPath();
c.arc(q[0], q[1], k === next ? 6 : 4, 0, 6.283);
c.fillStyle = !open ? "rgba(90,80,70,.55)" : (k === next ? "#FFD86A" : (k === HGW.sc ? "#8AE0FF" : "#8A1E14"));
c.fill();
c.strokeStyle = "#FFF8E8";
c.lineWidth = 1.2;
c.stroke();
c.font = "12px Georgia,serif";
c.fillStyle = open ? "#1A140C" : "rgba(40,30,20,.5)";
c.fillText(HGW_SC[k].name.split(",")[0], q[0] + 7, q[1] + 4);
if (!open)
return;
btn += "<span data-w='mp" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid " + (k === next ? "#FFD86A" : "rgba(143,180,232,.5)") + ";border-radius:3px'>" + (k === next ? "➜ " : "") + esc(HGW_SC[k].name) + "</span>";
fns["mp" + k] = function () { worldCard(null); hgwTravel(k); };
});
if (locked)
btn = "<div style='font-size:12px;opacity:.75;margin:2px 0 4px'>⛵ Finish Homer's Odyssey and every island and shore on this map is yours to sail to. Until then the map takes you where the books have been.</div>" + btn;
cv.onclick = function (ev) { var r = cv.getBoundingClientRect(), x = (ev.clientX - r.left) * W / r.width, y = (ev.clientY - r.top) * H / r.height, best = null, bd = 18; spots.forEach(function (s2) { var d = Math.hypot(s2[1][0] - x, s2[1][1] - y); if (d < bd) {
bd = d;
best = s2[0];
} }); if (best) {
worldCard(null);
hgwTravel(best);
} };
var b = "<h3 style='margin:4px 0'>🗺️ The map of the myths</h3><div style='font-size:12px;opacity:.75'>The real coasts of the Mediterranean and the Black Sea. Every place is where it really is" + (next ? "; ➜ marks where the book goes next" : "") + ". Touch one to go there.</div>";
worldCard(b + "<div id='hgw-map-slot'></div>" + (focus ? worldBtn("wide", "The whole sea", "From the Pillars of Heracles to Colchis") : worldBtn("near", "Closer: Greece and Troy", "")) + worldBtn("cab", "🏺 The cabinet of finds", (typeof hgwFindCount === "function" ? hgwFindCount() : 0) + " of " + (typeof HGW_FINDS !== "undefined" ? HGW_FINDS.length : 0) + " hidden finds found") + "<div style='margin-top:6px'>" + btn + "</div>", Object.assign(fns, { cab: function () { hgwCabinet(); }, wide: function () { hgwMapCard(false); }, near: function () { hgwMapCard(true); } }));
var slot = document.getElementById("hgw-map-slot");
if (slot)
slot.appendChild(cv);
});
},
function (k) {
if (!HGW_SCN[k])
return;
var A = HGW_SCN[k].start || { x: 0, z: 0 }, land = HGW_ROADS_BETWEEN[HGW.sc + "|" + k];
hgwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, (land ? "🐎 Overland by chariot: " : "⛵ Over the sea: ") + "<b>" + esc(HGW_SC[k].name) + ".</b>", function () { if (typeof hgbPopulate === "function")
hgbPopulate(); if (typeof hgbStepBegin === "function" && hgbActive())
hgbStepBegin(); });
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = HGW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = HGW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: HGW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return hgbPos(at.at);
var C = HGB_CH[hgbS().ch], i = hgbS().s, c = C && C.cast ? C.cast.filter(function (d) { return hgbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? hgbPos(c.at) : null;
}
if (at.spot) {
var Sp = HGW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: HGW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return hgbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || HGW.sc, x: at.x, z: at.z, y: at.y };
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
if (HGB.beam && HGB.beam.parent === HGW.scG)
return HGB.beam;
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
HGW.scG.add(g);
HGB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return hgwLam(c); }, m;
switch (kind) {
case "load":
m = hgwBox(g, 0.6, 0.4, 0.5, M(0x8A7A5A), 0, 0, 0);
hgwBox(g, 0.64, 0.06, 0.54, M(0x4A3A2A), 0, 0.2, 0);
break;
case "rifle":
m = hgwBox(g, 0.08, 0.08, 1.1, M(0x3A2A1A), 0, 0.04, 0);
break;
case "fern":
m = hgwBox(g, 0.4, 0.04, 0.3, M(0x5A8A3A), 0, 0.02, 0);
break;
case "thorn":
m = hgwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = hgwBox(g, 0.9, 0.12, 0.12, M(0x6A4A2A), 0, 0.06, 0);
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
m = hgwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
hgwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = hgwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
hgwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), hgwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "note":
m = hgwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "paper":
m = hgwBox(g, 0.34, 0.03, 0.46, M(0xE8E2D0), 0, 0.02, 0);
hgwBox(g, 0.3, 0.005, 0.08, M(0x2A2A2A), 0, 0.04, -0.16);
break;
case "bread":
m = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), M(0xC8945A));
m.scale.set(1.5, 0.8, 1);
m.position.y = 0.1;
g.add(m);
break;
case "bottle":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 10), hgwShine(0x1A3A1A, 0.2, 0));
m.position.y = 0.15;
g.add(m);
var nk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.1, 8), hgwShine(0x1A3A1A, 0.2, 0));
nk.position.y = 0.35;
g.add(nk);
break;
case "tin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 12), hgwShine(0xA8A8A0, 0.4, 0.6));
m.position.y = 0.05;
g.add(m);
break;
case "coin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.01, 12), hgwShine(0xE8C060, 0.3, 0.9));
m.position.y = 0.01;
g.add(m);
break;
case "spade":
m = hgwBox(g, 0.05, 0.05, 1.0, M(0x6A4A2A), 0, 0.03, 0);
hgwBox(g, 0.2, 0.02, 0.26, hgwShine(0x8A8A88, 0.4, 0.7), 0, 0.02, 0.6);
break;
case "post":
m = hgwBox(g, 0.08, 1.1, 0.08, M(0xE8E0CC), 0, 0, 0);
break;
case "skin":
m = hgwBox(g, 0.8, 0.05, 0.6, M(0xA88A60), 0, 0.03, 0);
break;
case "cane":
m = hgwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
break;
case "shell":
m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), M(0xD8C8A8));
m.scale.y = 0.4;
m.position.y = 0.05;
g.add(m);
break;
case "book":
m = hgwBox(g, 0.22, 0.06, 0.3, M(0x5A2A1A), 0, 0, 0);
hgwBox(g, 0.2, 0.05, 0.28, M(0xE8E0CC), 0.012, 0.005, 0);
break;
case "letter":
m = hgwBox(g, 0.22, 0.01, 0.15, M(0xF2ECDC), 0, 0.01, 0);
hgwBox(g, 0.04, 0.012, 0.04, M(0x8A1A1A), 0, 0.016, 0);
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
m = hgwBox(g, 0.3, 0.06, 0.06, M(0x9A7A5A), 0, 0.03, 0);
break;
case "lantern":
m = hgwBox(g, 0.16, 0.26, 0.16, M(0x3A3A3A), 0, 0, 0);
var lf = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), hgwGlowM(0xFFD070, 0.9));
lf.position.y = 0.13;
g.add(lf);
break;
case "pistol":
m = hgwBox(g, 0.05, 0.06, 0.34, M(0x3A3A40), 0, 0.03, 0);
hgwBox(g, 0.05, 0.14, 0.08, M(0x5A3A1A), 0, 0, 0.14);
break;
case "locket":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.015, 14), hgwShine(0xD8B048, 0.3, 0.9));
m.position.y = 0.02;
g.add(m);
break;
case "flask":
m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), hgwMat("glass"));
m.position.y = 0.08;
g.add(m);
hgwCyl(g, 0.02, 0.02, 0.1, hgwMat("glass"), 0, 0.14, 0, 6);
break;
case "cloak":
m = hgwBox(g, 0.6, 0.08, 0.5, M(0x3A3A4A), 0, 0.04, 0);
break;
case "fire":
m = hgwBox(g, 0.5, 0.1, 0.5, M(0x3A2A1A), 0, 0, 0);
hgwFire(g, 0, 0.08, 0, 0.4);
break;
case "chain":
m = hgwBox(g, 0.4, 0.04, 0.04, M(0x8A8A90), 0, 0.02, 0);
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
if (!P || !HGW.scG || P.sc !== HGW.sc)
return null;
var g = hgbItemMesh(kind), y = P.y != null ? P.y : hgwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
HGW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = hgwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (HGB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = HGW.spots.indexOf(I.S); if (j >= 0)
HGW.spots.splice(j, 1); HGB.items = HGB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.hgb = 1;
HGB.items.push(I);
return I;
},
function (k) {
if (HGB.tuneKey === k)
return;
HGB.tuneKey = k;
var old = HGB.tune;
HGB.tune = null;
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
if (!k || !HGB_TUNES[k])
return;
try {
var A = new Audio(HGB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
HGB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (HGB.tune !== A) {
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
if (HGB.text)
return fn(HGB.text);
if (HGB.textWait) {
HGB.textWait.push(fn);
return;
}
HGB.textWait = [fn];
var done = function (B) { HGB.text = B; var w = HGB.textWait; HGB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/homer/" + ((HGB_BOOKS[HGB_CUR] || {}).text || HGB_CUR) + ".json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
hgbText(function (B) {
var C = HGB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + hgbNum(i) + ". " + esc(C.t) + "</h3>" + ((HGB_BOOKS[HGB_CUR] || {}).plain != null ? HGB_BOOKS[HGB_CUR].plain : HGB_PLAIN) + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(hgbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); HGB.readOpen = 0; HGB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = hgbS(), C = HGB_CH[S.ch];
if (!C)
return;
HGB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
HGB.readAsk = 0;
HGB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : (HGB_BOOKS[HGB_CUR] || {}).name || "") + "</div><h3 style='margin:4px 0'>" + hgbNum(ch) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? (T.arg ? "<p style='margin:6px 0;opacity:.8;font-size:13px'><b>" + esc((HGB_BOOKS[HGB_CUR] || {}).argName || "Pope's argument") + ":</b> " + esc(T.arg) + "</p>" : "") + hgbOpening(T).map(hgbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); HGB.readOpen = 0; hgbStepDone(); }, all: function () { hgbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "The poem's own words, all of it");
b += hgbKeeperBtns(fns);
worldCard(b, fns);
};
hgbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
HGB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); hgbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = hgbS(), C = HGB_CH[S.ch];
if (!C)
return;
hgbItemsClear();
hgbCastClear();
HGB.hold = 0;
var go = function () { hgbWorldState(); hgbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[hgb] setup", S.ch, e);
} hgbTune(C.tune || null); hgbStepBegin(); };
if (place && C.start) {
var P = hgbPos(C.start);
if (P && WLD.on === HGW_KEY) {
hgwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (HGW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = hgbStep();
hgbItemsClear();
HGB.hold = 0;
HGB.puzOpen = 0;
if (!b)
return;
b._key = hgbKey();
hgbWorldState();
try {
if (b.on)
b.on(hgbS().f);
}
catch (e) {
if (window.console)
console.warn("[hgb] on", e);
}
if (b.k === "read") {
hgbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { HGB.rew[k] = 0; });
if (b.k === "find") {
var Pf = hgbPos(b.at);
if (Pf && Pf.sc === HGW.sc)
hgbItemAdd(b.item, Pf, b.name, b.verb, function () { if (hgbKey() === b._key)
hgbStepDone(); });
}
if (b.k === "gather") {
var P = hgbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(hgbS().ch * 97 + hgbS().s * 13 + 7);
HGB.got = 0;
if (P && P.sc === HGW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = hgwGround(Q.x, Q.z, (P.y != null ? P.y : hgwLand(P.x, P.z)) + 1);
hgbItemAdd(b.item, Q, b.name, b.verb, function () { if (hgbKey() !== b._key)
return; HGB.got++; try {
if (b.each)
b.each(HGB.got);
}
catch (e) { } if (HGB.got < n) {
hgbSay((b.eachSay || "Got one.") + " " + HGB.got + " of " + n + ".");
return;
} hgbStepDone(); });
}
}
if (b.h)
hgbSay("<b>" + esc(HGB_CH[hgbS().ch].t) + ".</b> " + b.h);
},
function (b) {
HGB.puzOpen = 1;
HGB.puzT = performance.now();
var k = hgbKey(), fns = {}, h = HGB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
hgbSay(b.yes);
if (hgbKey() === k)
hgbStepDone();
return;
}
hgbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (hgbKey() === k)
HGB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = hgbS(), C = HGB_CH[S.ch], b = hgbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[hgb] done", e);
}
if (b.say)
hgbSay(b.say);
S.s++;
if (window.HGB_LOG)
HGB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= HGB_CH.length - 1) {
S.done = 1;
S.s = 0;
hgbSave();
hgbItemsClear();
hgbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
hgbSave();
var nx = HGB_CH[S.ch];
setTimeout(function () { try {
hgbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[hgb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
hgbSave();
hgbStepBegin();
},
function () {
hgbTune("end");
var S = hgbS(), B = HGB_BOOKS[HGB_CUR] || {}, E = B.end || {};
var b = "<h3 style='margin:4px 0'>" + esc(B.name || "") + ": the end</h3>" + (E.q ? "<p style='font-style:italic;white-space:pre-line'>" + hgQ(E.q) + "</p><p style='font-size:12px;opacity:.75'>" + esc(E.src || "") + "</p>" : "") + "<p>" + esc(E.words || "You have played the whole of it.") + "</p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; hgbSave(); hgbChapterBegin(true); } };
b += worldBtn("again", "Play it again from the start", "");
var nx = HGB_ORDER[HGB_ORDER.indexOf(HGB_CUR) + 1];
if (nx) {
b += worldBtn("next", "▶ The next book: " + HGB_BOOKS[nx].name, HGB_BOOKS[nx].sub || "");
fns.next = function () { worldCard(null); hgbUse(nx); hgbBegin(); };
}
if (typeof bhnOpen === "function" && B.honours) {
b += worldBtn("hon", "🏅 The book's honours", "Its badge, its decor, and its vault");
fns.hon = function () { worldCard(null); bhnOpen(B.honours); };
}
worldCard(b, fns);
},
function (c) {
var C = HGB.cast[c.key || c.k];
if (hgbCastLive(C))
return C;
var P = hgbPos(c.at);
if (!P || P.sc !== HGW.sc)
return null;
var F = HGW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute, name: c.name };
var Pp;
if (F.make && !c.dress) {
var mg = F.make(c), my = o.y != null ? o.y : hgwGround(P.x, P.z, 500);
mg.position.set(P.x + (c.ox || 0), my, P.z + (c.oz || 0));
mg.rotation.y = c.ry || 0;
HGW.scG.add(mg);
Pp = { g: mg, y: my, o: {} };
HGW.people.push(Pp);
if (!c.mute)
hgwTalk(Pp, c.name || F.name, hgwPersona(F.persona), c.greet || F.greet, c.r || F.r || 4.5);
}
else if (F.name && !c.dress)
Pp = hgwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = hgwDressed("hgb" + (c.key || c.k), c.dress || "gkman", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin, child: !!c.child });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : hgwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
HGW.scG.add(g);
Pp = { g: g, y: y, o: {} };
HGW.people.push(Pp);
if (c.name && !c.mute)
hgwTalk(Pp, c.name, hgwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
HGB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return HGB.cast[c.key || c.k];
},
function () {
var C = HGB_CH[hgbS().ch];
if (!C || !C.cast)
return;
var idx = hgbS().s;
var on = {};
C.cast.forEach(function (c) { var key = c.key || c.k; if (!(c.from != null && idx < c.from) && !(c.until != null && idx >= c.until) && !on[key])
on[key] = c; });
C.cast.forEach(function (c) {
var key = c.key || c.k, want = on[key], have = HGB.cast[key];
if (!want) {
if (have)
hgbCastHide(key);
return;
}
if (want !== c)
return;
if (have && have.c && have.c !== c)
hgbCastHide(key);
if (!hgbCastLive(HGB.cast[key]))
hgbCastAdd(c);
});
},
function () {
var b = hgbStep(), key = "pass", have = HGB.cast[key];
var want = b && b.k === "talk" && b.at && b.at.at ? b : null, P = want ? hgbPos(want.at.at) : null;
if (!want || !P || P.sc !== HGW.sc) {
if (have)
hgbCastHide(key);
return;
}
if (have && have.b === want && hgbCastLive(have))
return;
if (have)
hgbCastHide(key);
if (!want.pass && HGW.talk.some(function (T) { return T.name === want.who && T.p && T.p.g && T.p.g.parent; }))
return;
var pa = want.pass || {}, nm = String(want.who), fem = /woman|lady|girl|wife|Mrs|Miss|mother|maid/i.test(nm), kid = pa.child || /boy|girl|child/i.test(nm);
var dr = pa.dress || (/warrior|soldier|spearman|guard|Trojan|Achaean/i.test(nm) ? "warrior" : (/sailor|boatman|helmsman|rower|captain/i.test(nm) ? "sailor" : (/herd|shepherd|swineherd|goatherd|cowherd/i.test(nm) ? "herd" : (/priest|seer|prophet/i.test(nm) ? "seer" : (/maid|servant/i.test(nm) ? "servant" : (fem ? "gkwoman" : "gkman"))))));
var Pp = hgwOne("pass" + hgbS().ch + "_" + hgbS().s, want.who, pa.sex || (fem ? "f" : "m"), dr, P.x, P.z, pa.ry || 0, pa.greet || "", { y: P.y, child: !!kid, persona: "greek" });
if (Pp)
HGB.cast[key] = { g: Pp.g, P: Pp, c: { k: key }, b: want };
},
function () {
if (!HGW.scG)
return;
hgbCastClear();
var S = hgbS(), C = HGB_CH[S.ch];
if (S.started && !S.done && C && C.cast && hgbCastHere(C)) {
hgbCastTick();
return;
}
(HGB_FOLK_AT[HGW.sc] || []).forEach(function (q) { var key = "f_" + q[0]; var Pp = hgwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
HGB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!hgbActive())
return false;
var b = hgbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = hgbKey();
worldPrompt(null);
var next = function () { if (hgbKey() === k)
hgbStepDone(); };
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
worldCard(HGB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
HGB.wt += dt;
if (HGB.wt > 0.5) {
HGB.wt = 0;
if (hgbActive() && hgbCastHere(HGB_CH[hgbS().ch]))
hgbCastTick();
if (hgbActive())
hgbPassTick();
var S0 = hgbS();
S0.seen[HGW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!hgbActive()) {
if (HGB.beam)
HGB.beam.visible = false;
HGW.bannerBook = false;
return;
}
var S = hgbS(), b = hgbStep(), t = HGW.t, feet = camera.position.y - 1.72;
HGB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? hgbPos(b.at) : null, here = P && P.sc === HGW.sc, bm = hgbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + hgbScName(P.sc) + ": press E for the book)";
if (here && !HGW.moving && !HGW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : hgwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = hgbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !HGW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (HGB.readAsk)
break;
if (!HGB.readOpen)
hgbChapterCard();
else {
HGB.readOpen = 0;
hgbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
hgbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
HGB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(HGB.hold, dt);
}
catch (e) { }
if (HGB.hold >= (b.sec || 8)) {
hgbStepDone();
return;
}
}
else
HGB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return HGB.rew[k]; })) {
hgbStepDone();
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
hgbStepDone();
return;
}
break;
}
case "puzzle":
if ((!HGB.puzOpen || performance.now() - (HGB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
hgbPuzzleCard(b);
break;
}
}
var C = HGB_CH[S.ch], prog = b && b.k === "hold" && HGB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - HGB.hold)) + " s)" : b && b.k === "gather" ? " (" + (HGB.got || 0) + " of " + (b.n || 3) + ")" : "";
HGW.bannerBook = true;
worldBanner("⚡ <b>" + hgbNum(S.ch) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var A = hgbAll();
if (A.cur && HGB_BOOKS[A.cur] && HGB_CUR !== A.cur)
hgbUse(A.cur);
var S = hgbS(), Bk = HGB_BOOKS[HGB_CUR] || {}, C = HGB_CH[S.ch], fns = {};
var b = "<div style='font-size:12px;opacity:.7'>" + esc(Bk.by || "") + "</div><h3 style='margin:4px 0'>" + (Bk.icon || "📜") + " " + esc(Bk.name || "") + "</h3>";
if (S.done)
b += "<p>You have played the whole of it. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started && C) {
b += "<p>You are in <b>" + hgbNum(S.ch) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((hgbStep() || {}).h || "") + "</p>";
var st = hgbStep(), P = st && st.at ? hgbPos(st.at) : null, Cs = hgbPos(C.start);
var to = P && P.sc !== HGW.sc ? P : (!P && Cs && Cs.sc !== HGW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + hgbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); hgwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { hgbPopulate(); hgbStepBegin(); }); };
}
}
else
b += "<p>" + esc(Bk.about || "") + "</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin" + (Bk.first ? ": " + Bk.first : ""), S.started ? "Back to where you were" : (Bk.sub || ""));
fns.go = function () { worldCard(null); hgbBegin(); };
}
else {
b += worldBtn("again", "Play it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; hgbSave(); hgbBegin(); };
}
if (HGB_ORDER.length > 1) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>The books of the myths</div>";
HGB_ORDER.forEach(function (k) { if (k === HGB_CUR)
return; var O = hgbS(k), K = HGB_BOOKS[k]; b += worldBtn("bk" + k, (O.done ? "✓ " : (O.started ? "◐ " : "○ ")) + (K.icon || "") + " " + esc(K.name), (O.started && !O.done ? "In " + hgbNumOf(k, O.ch) + " · " : "") + esc(K.sub || "")); fns["bk" + k] = function () { hgbUse(k); hgbOpen(); }; });
}
b += worldBtn("map", "🗺️ The map of the myths", "Greece and the sea round it, on the real map, with every place you can go");
fns.map = function () { if (typeof hgwMapCard === "function")
hgwMapCard(); };
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(HGW_SC).filter(function (k) { return HGW_SCN[k] && (kp || S.seen[k] || S.done); });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(HGW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A2 = (HGW_SCN[k].start || { x: 0, z: 0 }); hgwGo({ sc: k, x: A2.x, z: A2.z, ry: A2.ry }, null, hgbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += hgbKeeperBtns(fns);
worldCard(b, fns);
},
function (st, s) {
var v = function (k) { return hgbStV(st[k]); }, reb = false;
Object.keys(HGW.st).forEach(function (k) { if (!(k in st) && HGW.st[k] != null && HGW.st[k] !== false) {
delete HGW.st[k];
if (HGW_LIVEK.indexOf(k) < 0)
reb = true;
} });
Object.keys(st).forEach(function (k) { if (k === "env" || k === "night" || k === "nightUntil" || k === "nightFrom")
return; var nv = v(k); if (HGW.st[k] !== nv) {
HGW.st[k] = nv;
if (HGW_LIVEK.indexOf(k) < 0)
reb = true;
} });
if (typeof hgwLiveState === "function")
try {
hgwLiveState();
}
catch (e) { }
if (reb && !HGW.rebuilding && HGW.scBuilt) {
HGW.rebuilding = 1;
try {
hgwRebuild();
}
catch (e) { }
HGW.rebuilding = 0;
}
},
function (key) {
var B = HGB_BOOKS[key];
if (!B)
return false;
try {
worldCard(null);
}
catch (e) { }
hgbUse(key);
var S = hgbS(), fns = {}, h = "<h3 style='margin:4px 0'>" + (B.icon || "📜") + " " + esc(B.name) + ": " + esc(B.sub || "") + "</h3><p>" + esc(B.about || "") + "</p>";
h += worldBtn("go", S.done ? "▶ Play it again" : (S.started ? "▶ Carry on" : "▶ Begin" + (B.first ? ": " + B.first : "")), "Into Greece, the World of Greek Myth");
fns.go = function () { worldCard(null); if (S.done) {
S.ch = 0;
S.s = 0;
S.f = {};
S.done = 0;
S.started = 1;
hgbSave();
} hgbBegin(); };
h += worldBtn("map", "🗺️ The map of the myths", "");
fns.map = function () { if (WLD.on !== HGW_KEY) {
hgwEnter({});
setTimeout(function () { hgwMapCard(false); }, 1500);
}
else
hgwMapCard(false); };
worldCard(h, fns);
return true;
}
];
});
