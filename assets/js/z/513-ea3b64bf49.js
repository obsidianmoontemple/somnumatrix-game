/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(513, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (DKW.tex[k])
return DKW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = dkwLite();
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
return (DKW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (DKW.mats[k])
return DKW.mats[k];
var own = name.slice(0, 2) === "b:", map = dkwPhotoTex(name, mpt || 2), m;
if (dkwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = dkwPhotoTex(name, mpt || 2, true);
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
return (DKW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return dkwM(k, function () {
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
return dkwCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return dkwCanvas("bamboo", 64, 256, function (x, W, H) {
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
dkwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return dkwCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return dkwCanvas("tuft", 128, 64, function (x, W, H) {
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
return dkwCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return dkwCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
dkwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return dkwCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = DKW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / DKW_CELL) + "," + Math.floor(z / DKW_CELL)];
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
p = dlnPerson("dkw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("dkw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || DKW.scG || DKW.G).add(p);
var P = { g: p, y: y, o: o };
DKW.people.push(P);
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
DKW.inst.push(m);
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
var pos = [], uv = [], idx = [], acc = 0;
for (var i = 0; i < pts.length; i++) {
var a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)], dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz) || 1, nx = -dz / L * w / 2, nz = dx / L * w / 2, p = pts[i];
if (i)
acc += Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]);
[[p[0] + nx, p[1] + nz], [p[0] - nx, p[1] - nz]].forEach(function (q, k) { pos.push(q[0], (hfn ? hfn(q[0], q[1]) : 0) + (lift || 0.06), q[1]); uv.push(k, acc / w); });
if (i) {
var o = (i - 1) * 2;
idx.push(o, o + 1, o + 2, o + 1, o + 3, o + 2);
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
var lite = dkwLite(), leaf = dkwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
dkwInst(P, dkwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), dkwMat("pale"), list, { shadow: !lite });
dkwInst(P, dkwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), dkwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
dkwInst(P, dkwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), dkwMat("bark"), list, { shadow: !lite });
dkwInst(P, dkwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), dkwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
dkwInst(P, dkwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), dkwMat("darkbark"), list, { shadow: !lite });
dkwInst(P, dkwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), dkwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
dkwInst(P, dkwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), dkwMat("bark"), list, { shadow: !lite });
dkwInst(P, dkwGeo("pfronds", function () { var g = dkwFronds(lite ? 8 : 12, 5.2, 1.6, 0.5, 12, 1.0); g.translate(1.4, 0, 0); return g; }), dkwLam(0xFFFFFF, { ds: 1, map: dkwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "mauritia": {
dkwInst(P, dkwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), dkwMat("darkbark"), list, {});
dkwInst(P, dkwGeo("mfronds", function () { return dkwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), dkwLam(0xFFFFFF, { ds: 1, map: dkwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
dkwInst(P, dkwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), dkwMat("darkbark"), list, {});
dkwInst(P, dkwGeo("ffronds", function () { return dkwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), dkwLam(0xFFFFFF, { ds: 1, map: dkwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
dkwInst(P, dkwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), dkwMat("darkbark"), list, {});
dkwInst(P, dkwGeo("cyf", function () { return dkwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), dkwLam(0xFFFFFF, { ds: 1, map: dkwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
dkwInst(P, dkwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), dkwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: dkwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
dkwInst(P, dkwGeo("bamL", function () { return dkwCards(3, 2.6, 2.2, 5.4); }), dkwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
dkwInst(P, dkwGeo("reed" + kind, function () { return dkwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), dkwLam(0xFFFFFF, { ds: 1, map: dkwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
dkwInst(P, dkwGeo("tuft", function () { return dkwCards(2, 1.6, 0.7, 0); }), dkwLam(o.col || 0xFFFFFF, { ds: 1, map: dkwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
dkwInst(P, dkwGeo("flw", function () { return dkwCards(2, 0.9, 0.7, 0); }), dkwLam(0xFFFFFF, { ds: 1, map: dkwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
dkwInst(P, dkwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), dkwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
dkwInst(P, dkwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || dkwMat("rock"), list, {});
break;
}
case "cactus": {
dkwInst(P, dkwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), dkwLam(0x4A7A3A), list, {});
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
function (kind, col) { return dkwM("skinM" + kind + (col || ""), function () { var t = dkwSkinTex(kind); t.repeat.set(2, 2); var m = dkwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = dkwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(dkwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = dkwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(dkwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
dkwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return dkwGeo(k, function () {
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
var t = dkwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), dkwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || dkwS("b:stucco", o.col || 0xF0E2C8, 3), trim = dkwLam(0xFAF6EE), sh = dkwLam(o.shut || 0x3A6A4A), glass = dkwShine(0x1A2228, 0.2, 0.3);
dkwBox(g, w, h, d, wall, 0, 0, 0);
dkwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
dkwBox(g, w + 0.12, 0.5, d + 0.12, dkwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(dkwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || dkwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
dkwBox(g, 1.3, 2.6, 0.12, dkwMat("oak"), wx, 0, d / 2 + 0.02);
dkwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = dkwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = dkwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!dkwLite())
[-1, 1].forEach(function (s) { dkwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
dkwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
dkwBox(g, 0.05, 0.9, 0.05, dkwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
dkwBox(g, 1.8, 0.05, 0.05, dkwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
dkwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
if (DKW.scG) {
if (DKW.scG.parent)
DKW.scG.parent.remove(DKW.scG);
DKW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
DKW.scG = null;
DKW.solids = [];
DKW.sgrid = null;
DKW.floors = [];
DKW.spots = [];
DKW.talk = [];
DKW.people = [];
DKW.beasts = [];
DKW.fx = [];
DKW.water = [];
DKW.inst = [];
DKW.hgt = null;
DKW.scBuilt = null;
if (typeof dkbSceneDrop === "function")
try {
dkbSceneDrop();
}
catch (e) { }
},
function (k) {
if (DKW.scBuilt === k && DKW.scG)
return;
dkwSceneDrop();
var D = DKW_SCN[k], S = DKW_SC[k];
if (!D || !S || !DKW.G)
return;
DKW.sc = k;
DKW.scG = new THREE.Group();
DKW.scG.position.x = S.x;
DKW.G.add(DKW.scG);
DKW.hgt = D.h || function () { return 0; };
try {
D.build(DKW.scG);
}
catch (e) {
if (window.console)
console.warn("[drakkyn] scene", k, e);
}
DKW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
DKW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = dkwAtPt(at);
if (!A)
return;
var v = dkwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
DKW.moving = true;
setTimeout(function () {
if (WLD.on !== DKW_KEY) {
v.style.opacity = "0";
DKW.moving = false;
return;
}
dkwScene(A.sc);
var S = DKW_SC[A.sc], y = A.y != null ? A.y : dkwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(DKW.base + S.x + A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = y;
worldEnv(dkwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; DKW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(dkwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), dkwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; DKW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(dkwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), dkwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(dkwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), dkwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(dkwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), dkwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!dkwLite() && typeof THREE.PointLight === "function" && (DKW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
DKW.lights = (DKW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
DKW.fx.push(g);
return g;
},
function (k) {
switch (k) {
case "brick": return dkwS("brick", 0xC07A5E, 1.6);
case "yellowbrick": return dkwS("brick", 0xD8C098, 1.6);
case "ashlar": return dkwS("b:ashlar", 0xE8E0D0, 2.4);
case "stone": return dkwS("stone", 0xD0C8B8, 2.4);
case "slate": return dkwS("b:slate", 0x6A6E78, 2);
case "oak": return dkwS("b:oak", 0x8A5E3A, 1.4);
case "floor": return dkwS("b:oak", 0xA87A50, 1.8);
case "planks": return dkwS("b:planks", 0x9A8060, 2);
case "damask": return dkwS("b:damask", 0x8A3A3A, 1.2);
case "greenpaper": return dkwS("b:damask", 0x4A6A52, 1.2);
case "bluepaper": return dkwS("b:damask", 0x4A5A7A, 1.2);
case "velvet": return dkwS("b:velvet", 0x6A1E22, 0.8);
case "greenvelvet": return dkwS("b:velvet", 0x2E4A34, 0.8);
case "leather": return dkwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return dkwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return dkwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "plaster": return dkwS("plaster", 0xF0EAD8, 4);
case "ceiling": return dkwLam(0xEDE6D6);
case "brass": return dkwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "nickel": return dkwShine(0xD8DCE0, 0.25, 0.9);
case "iron": return dkwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "ivory": return dkwShine(0xF2EAD8, 0.35, 0.05);
case "quartz": return dkwM("quartz", function () { var m = new THREE.MeshPhongMaterial({ color: 0xE8F4FF, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.55, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "granite": return dkwS("b:limestone", 0x9A948C, 4);
case "terracotta": return dkwS("b:terracotta", 0xC87A5A, 1.6);
case "earth": return dkwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return dkwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "lawn": return dkwS("grass", 0xD8E8B8, 4, { vc: 1 });
case "gravel": return dkwS("sand", 0xC8B898, 3);
case "paving": return dkwS("paving", 0xC8C0B0, 2.4);
case "road": return dkwS("asphalt", 0x8A8478, 5);
case "white": return dkwS("b:marble", 0xF8F6F2, 3, { shine: 30 });
case "bronze": return dkwS("b:brass", 0x7A6A3A, 1.6, { shine: 60 });
case "verdigris": return dkwS("b:brass", 0x6A9A8A, 1.6, { shine: 30 });
case "greystone": return dkwS("b:limestone", 0xB0ACA4, 4);
case "ruin": return dkwS("b:limestone", 0xA8A498, 4);
case "porcelain": return dkwS("b:darktile", 0x8AC8A8, 2, { shine: 90 });
case "rock": return dkwS("b:strata", 0x8A7A6A, 6);
case "redrock": return dkwS("b:strata", 0x8A3A2A, 8);
case "cave": return dkwS("b:cave", 0x7A746C, 4);
case "moss": return dkwS("b:moss", 0x7A9A5A, 3);
case "bark": return dkwS("bark", 0x8A7A64, 2.5);
case "darkbark": return dkwS("bark", 0x5A4E40, 3);
case "pale": return dkwS("bark", 0xC8BCA8, 3);
case "sand": return dkwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "snow": return dkwS("snow", 0xF4F6FA, 4);
}
return dkwS("earth", 0x8A7058, 5);
},
function (P, x, z, ry, mat, arm) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = dkwMat("oak");
if (arm) {
dkwBox(g, 0.9, 0.42, 0.85, mat, 0, 0, 0);
dkwBox(g, 0.9, 0.8, 0.22, mat, 0, 0.4, 0.34);
[-1, 1].forEach(function (k) { dkwBox(g, 0.18, 0.3, 0.85, mat, k * 0.4, 0.42, 0); });
dkwBox(g, 0.7, 0.1, 0.6, mat, 0, 0.42, -0.04);
}
else {
dkwBox(g, 0.46, 0.06, 0.46, mat, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { dkwBox(g, 0.04, 0.44, 0.04, wd, q[0] * 0.2, 0, q[1] * 0.2); });
dkwBox(g, 0.44, 0.56, 0.05, wd, 0, 0.5, 0.21);
}
return g;
},
function (P, x, z, w, h, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = dkwMat("oak"), R = wRand(Math.round(x * 7 + z * 13));
dkwBox(g, w, h, 0.36, wd, 0, 0, 0);
var n = Math.floor(h / 0.42);
for (var i = 0; i < n; i++) {
var y = 0.12 + i * 0.42, bx = -w / 2 + 0.1;
while (bx < w / 2 - 0.12) {
var bw = 0.04 + R() * 0.05, bh = 0.24 + R() * 0.12;
dkwBox(g, bw, bh, 0.24, dkwLam([0x6A1E1E, 0x1E3A2A, 0x2A2A4A, 0x5A3A1E, 0x8A6A3A, 0x3A1A2A][Math.floor(R() * 6)]), bx + bw / 2, y, -0.2);
bx += bw + 0.005;
}
}
return g;
},
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var ag = dkwShine(0xE0E4E8, 0.25, 0.9);
dkwCyl(g, 0.015, 0.02, 0.5, ag, 0, 0, 0, 6);
[0, 1, 2].forEach(function (i) {
var a = i / 3 * 6.283, f = new THREE.Group();
f.position.set(Math.cos(a) * 0.14, 0.5, Math.sin(a) * 0.14);
f.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
g.add(f);
var c = new THREE.Mesh(dkwGeo("lilyc", function () { return new THREE.ConeGeometry(0.07, 0.14, 8, 1, true); }), ag);
c.rotation.x = Math.PI;
f.add(c);
var b = new THREE.Mesh(dkwGeo("lilyb", function () { return new THREE.SphereGeometry(0.035, 8, 6); }), dkwGlowM(0xFFF0C0));
b.position.y = -0.04;
f.add(b);
});
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), dkwM("rug" + col, function () {
var t = dkwCanvas("rugt" + col, 256, 256, function (c, W, H) {
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
dkwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
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
h = h || DKW_HOUSE.h1;
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
dkwBox(P, G[1], h - 2.4, 0.3, inner || mat, G[0], 2.4, z);
});
segs.forEach(function (s) { var w = s[1] - s[0]; if (w < 0.05)
return; dkwBox(P, w, h, 0.3, mat, (s[0] + s[1]) / 2, 0, z, 0, true); if (inner) {
dkwBox(P, w, h, 0.02, inner, (s[0] + s[1]) / 2, 0, z + 0.16);
dkwBox(P, w, h, 0.02, inner, (s[0] + s[1]) / 2, 0, z - 0.16);
} });
},
function (P, x, z0, z1, mat, inner, gaps, h) {
h = h || DKW_HOUSE.h1;
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
dkwBox(P, 0.3, h - 2.4, G[1], inner || mat, x, 2.4, G[0]);
});
segs.forEach(function (s) { var d = s[1] - s[0]; if (d < 0.05)
return; dkwBox(P, 0.3, h, d, mat, x, 0, (s[0] + s[1]) / 2, 0, true); });
},
function (P, x0, x1, z0, z1, mat, dx, dz) {
var H = DKW_HOUSE.h1 - 0.02, w = x1 - x0, d = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, wd = dkwMat("oak");
dkwBox(P, w - 0.32, H, 0.02, mat, cx, 0, z0 + 0.17);
dkwBox(P, w - 0.32, H, 0.02, mat, cx, 0, z1 - 0.17);
[x0 + 0.17, x1 - 0.17].forEach(function (x) {
var segs = [[z0 + 0.16, z1 - 0.16]];
if (dx != null && Math.abs(x - dx) < 0.5) {
segs = [[z0 + 0.16, dz - 0.65], [dz + 0.65, z1 - 0.16]];
dkwBox(P, 0.02, H - 2.4, 1.3, mat, x, 2.4, dz);
}
segs.forEach(function (sg) { var L = sg[1] - sg[0]; dkwBox(P, 0.02, H, L, mat, x, 0, (sg[0] + sg[1]) / 2); dkwBox(P, 0.04, 0.06, L, wd, x + (x < cx ? 0.02 : -0.02), 0.95, (sg[0] + sg[1]) / 2); dkwBox(P, 0.04, 0.18, L, wd, x + (x < cx ? 0.02 : -0.02), 0, (sg[0] + sg[1]) / 2); });
});
[z0 + 0.19, z1 - 0.19].forEach(function (z) { dkwBox(P, w - 0.34, 0.06, 0.04, wd, cx, 0.95, z); dkwBox(P, w - 0.34, 0.18, 0.04, wd, cx, 0, z); });
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
} }); g.userData.mats = mats; DKW.ghosts.push(g); return g; },
function (seed, dress, o) {
o = o || {};
if (!dress || /^dkmod/.test(dress) || typeof dlnPerson !== "function") {
var lk = {};
if (o.skin != null)
lk.skin = o.skin;
if (o.hair != null)
lk.hair = o.hair;
return wPerson("dkw" + seed, { sex: o.sex, look: lk, child: o.child });
}
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("dkw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (key, x, z, ry, o) {
var F = DKW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : dkwGround(x, z, o.feet != null ? o.feet : 500);
var g = dkwDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin, child: F.child });
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
(o.parent || DKW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
DKW.people.push(P);
if (!o.mute)
dkwTalk(P, F.name, dkwPersona(F.persona), o.greet || F.greet, o.r || 3.4, o.fn);
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
var d = f ? (o.dressF || o.dress) : o.dress, g = dkwDressed(seed + "c" + i, d, { sex: f ? "f" : "m", beard: !f && R() < (o.beardP == null ? 0.35 : o.beardP) ? (R() < 0.5 ? "full" : "mustache") : null, hair: o.hair ? o.hair(R) : null, skin: sk, child: o.childP && R() < o.childP });
if (o.look)
try {
o.look(g, R);
}
catch (e) { }
var y = dkwGround(x, z, o.feet != null ? o.feet : 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
DKW.scG.add(g);
var P = { g: g, y: y, o: { wander: o.wander == null ? 10 : o.wander, sp: o.sp || 0.6 } };
DKW.people.push(P);
if (o.names && R() < (o.talkP == null ? 0.6 : o.talkP))
dkwTalk(P, o.names[i % o.names.length], dkwPersona(o.persona || "native"), (o.says || ["Good day to you."])[i % (o.says || [1]).length], 2.8);
out.push(P);
}
return out;
},
function (G, sc, i, W, D, H, o) {
o = o || {};
var A = dkwInAt(sc, i), g = new THREE.Group();
g.position.set(A.x, DKW_IN_Y, A.z);
G.add(g);
var wall = o.wall || dkwMat("plaster"), inner = o.paper || null;
dkwBox(g, W, 0.12, D, o.floor || dkwMat("floor"), 0, -0.12, 0);
dkwBox(g, W, 0.2, D, o.ceil || dkwMat("ceiling"), 0, H, 0);
dkwFloor(A.x, A.z, W, D, DKW_IN_Y);
var h0 = DKW_HOUSE.h1;
DKW_HOUSE.h1 = H;
try {
dkwWallZ(g, -D / 2 - 0.15, -W / 2 - 0.3, W / 2 + 0.3, wall, inner, o.gapN || [], H);
dkwWallZ(g, D / 2 + 0.15, -W / 2 - 0.3, W / 2 + 0.3, wall, inner, [[0, 1.6]], H);
dkwWallX(g, -W / 2 - 0.15, -D / 2, D / 2, wall, inner, [], H);
dkwWallX(g, W / 2 + 0.15, -D / 2, D / 2, wall, inner, [], H);
}
finally {
DKW_HOUSE.h1 = h0;
}
dkwBox(g, 1.6, 2.5, 0.06, dkwGlowM(o.day || 0xF4ECD8, 0.9), 0, 0, D / 2 + 0.2);
for (var k = 0; k < (W > 16 ? 4 : 2); k++) {
var lx = (k % 2 ? 1 : -1) * W * 0.3, lz = (k < 2 ? -1 : 1) * D * 0.25;
var c = dkwCyl(g, 0.05, 0.05, 0.5, dkwMat("brass"), lx, H - 0.5, lz, 6);
var b = new THREE.Mesh(dkwGeo("rlamp", function () { return new THREE.SphereGeometry(0.16, 10, 8); }), dkwGlowM(0xFFE8B8));
b.position.set(lx, H - 0.6, lz);
g.add(b);
}
dkwRoom(sc, A.x - W / 2, A.x + W / 2, A.z - D / 2, A.z + D / 2, o.env || "indoor");
var out = o.out;
dkwSpot(A.x, A.z + D / 2 - 0.8, 1.5, o.doorName || "The door", "go out", function () { var bk = DKW.back && DKW.back[sc + i]; if (bk)
out = bk; if (out)
dkwGo({ sc: sc, x: out.x, z: out.z, ry: out.ry }, null, typeof dkbPopulate === "function" ? dkbPopulate : null); }, DKW_IN_Y);
g.userData.A = A;
g.userData.W = W;
g.userData.D = D;
g.userData.H = H;
return g;
},
function (G, sc, i, x, z, ry, name, W, D, o) {
o = o || {};
var A = dkwInAt(sc, i), y = o.y != null ? o.y : dkwLand(x, z);
var dg = new THREE.Group();
dg.position.set(x, y, z);
dg.rotation.y = ry || 0;
G.add(dg);
dkwBox(dg, 1.7, 2.7, 0.14, o.frame || dkwMat("ashlar"), 0, 0, 0);
dkwBox(dg, 1.25, 2.35, 0.1, dkwLam(o.col || 0x4A2E1A), 0, 0.04, 0.07);
dkwBox(dg, 0.09, 0.09, 0.06, dkwMat("brass"), 0.42, 1.1, 0.15);
dkwBox(dg, 2.0, 0.16, 0.5, o.frame || dkwMat("ashlar"), 0, -0.02, 0.35);
var fx = x + Math.sin(ry || 0) * 1.6, fz = z + Math.cos(ry || 0) * 1.6;
dkwSpot(fx, fz, 1.7, name, "go in", function () { (DKW.back || (DKW.back = {}))[sc + i] = { x: fx, z: fz, ry: (ry || 0) + Math.PI }; DKW.lastBack = { sc: sc, x: fx, z: fz, ry: (ry || 0) + Math.PI }; dkwGo({ sc: sc, x: A.x, z: A.z + D / 2 - 2.2, y: DKW_IN_Y, ry: 0 }, o.msg || ("🚪 <b>" + name.replace(/^The door of /, "") + "</b>"), typeof dkbPopulate === "function" ? dkbPopulate : null); }, y);
return { x: fx, z: fz, ry: (ry || 0) };
},
function (G, sc, i, x, z, ry, name, room, o) {
o = o || {};
var W = room.W || 12, D = room.D || 10, H = room.H || 4;
var dw = o.door != null ? o.door : 0, ca = Math.cos(ry || 0), sa = Math.sin(ry || 0), front = o.front != null ? o.front : (o.d || 10) / 2 + 0.08;
var dx = x + sa * front + ca * dw, dz = z + ca * front - sa * dw;
var d = dkwDoorTo(G, sc, i, dx, dz, ry, name, W, D, o);
var g = dkwRoomBuild(G, sc, i, W, D, H, Object.assign({}, room, { out: { x: d.x, z: d.z, ry: (ry || 0) + Math.PI }, doorName: "The door, out to " + (o.outName || "the street") }));
if (room.fill)
try {
room.fill(g, W, D, H, dkwInAt(sc, i));
}
catch (e) {
if (window.console)
console.warn("[drakkyn] room", name, e);
}
return g;
},
function (P, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = dkwMat("oak");
dkwBox(g, 1.6, 0.5, 2.1, wd, 0, 0, 0);
dkwBox(g, 1.5, 0.22, 2.0, dkwLam(0xF2EEE4), 0, 0.5, 0);
dkwBox(g, 1.52, 0.08, 1.3, dkwLam(col || 0x6A2A2A), 0, 0.72, 0.35);
dkwBox(g, 1.2, 0.16, 0.4, dkwLam(0xFAF8F2), 0, 0.72, -0.75);
dkwBox(g, 1.7, 1.4, 0.1, wd, 0, 0, -1.05);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { dkwBox(g, 0.08, 2.2, 0.08, wd, q[0] * 0.78, 0, q[1] * 1.02); });
dkwBox(g, 1.7, 0.3, 2.2, dkwLam(col || 0x6A2A2A), 0, 2.2, 0);
return g;
},
function (P, x, z, s, sky) {
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
s = s || 1;
var wd = dkwMat("oak");
[0, 1, 2].forEach(function (i) { var a = i / 3 * 6.283; var l = dkwBox(g, 0.05 * s, 0.8 * s, 0.05 * s, wd, Math.cos(a) * 0.32 * s, 0, Math.sin(a) * 0.32 * s); l.rotation.z = Math.cos(a) * 0.2; });
var t = dkwCanvas(sky ? "gl:sky" : "gl:earth", 256, 128, function (c, W, H) {
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
var b = new THREE.Mesh(dkwGeo("globe", function () { return new THREE.SphereGeometry(0.36, 24, 16); }), dkwLam(0xFFFFFF, { map: t, mapk: sky ? "gl:sky" : "gl:earth" }));
b.scale.setScalar(s);
b.position.y = 1.05 * s;
b.rotation.z = 0.4;
g.add(b);
var m = new THREE.Mesh(dkwGeo("gmer", function () { return new THREE.TorusGeometry(0.4, 0.015, 6, 32); }), dkwMat("brass"));
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
[-1, 1].forEach(function (k) { var l = dkwBox(g, 0.06, 1.3, 0.06, dkwMat("oak"), k * 0.4, 0, 0); l.rotation.z = k * 0.25; });
dkwBox(g, 0.06, 1.3, 0.06, dkwMat("oak"), 0, 0, -0.45).rotation.x = -0.3;
var t = new THREE.Mesh(dkwGeo("tscope" + len, function () { var c = new THREE.CylinderGeometry(0.07, 0.13, len, 12); c.rotateX(Math.PI / 2); return c; }), dkwMat("brass"));
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
dkwBox(g, 0.5, 1.0, 0.5, dkwMat("oak"), 0, 0, 0);
var q = new THREE.Mesh(dkwGeo("quad", function () { return new THREE.RingGeometry(0.55, 0.7, 16, 1, 0, Math.PI / 2); }), dkwM("quadm", function () { var m = new THREE.MeshPhongMaterial({ color: 0xE0B050, shininess: 80, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
q.position.set(-0.3, 1.05, 0);
g.add(q);
dkwBox(g, 0.04, 0.7, 0.04, dkwMat("brass"), -0.3, 1.0, 0).rotation.z = -0.7;
return g;
},
function (g, W, D, kind, seed) {
var R = wRand(seed || 7);
if (kind === "home") {
dkwRug(g, 0, 0, W * 0.5, D * 0.45, [0x6A2A2A, 0x2A3A6A, 0x5A4A2A][Math.floor(R() * 3)]);
var t = dkwTable(g, 0, -0.4, 1.8, 1.0, 0.78, dkwMat("oak"));
[-1, 1].forEach(function (k) { dkwChair(g, k * 1.2, -0.4, k * Math.PI / 2, dkwMat("velvet")); });
dkwBed(g, W / 2 - 1.3, -D / 2 + 1.4, 0);
dkwChest(g, -W / 2 + 1.0, -D / 2 + 0.6, 0);
dkwShelves(g, -W / 2 + 0.3, 1.0, 2.2, 2.2, Math.PI / 2);
}
else if (kind === "poor") {
dkwTable(g, 0, 0, 1.4, 0.8, 0.74, dkwMat("planks"));
dkwChair(g, 0.9, 0, Math.PI / 2, dkwMat("planks"));
dkwBox(g, 1.8, 0.35, 0.9, dkwMat("planks"), W / 2 - 1.2, 0, -D / 2 + 0.8);
dkwBox(g, 1.7, 0.1, 0.8, dkwLam(0x8A7A60), W / 2 - 1.2, 0.35, -D / 2 + 0.8);
dkwChest(g, -W / 2 + 0.8, -D / 2 + 0.6, 0);
dkwFire(g, -W / 2 + 1.0, 0, D / 2 - 1.4, 0.6);
}
else if (kind === "shop") {
dkwBox(g, W * 0.7, 0.95, 0.7, dkwMat("oak"), 0, 0, -D / 2 + 1.6);
dkwShelves(g, 0, -D / 2 + 0.3, W * 0.8, 2.6, 0);
dkwChair(g, W / 2 - 1, 0.5, -Math.PI / 2, dkwMat("oak"));
}
else if (kind === "east") {
dkwBox(g, W * 0.8, 0.06, D * 0.7, dkwLam(0xC8B888), 0, 0, 0);
for (var i = 0; i < 4; i++)
dkwBox(g, 0.9, 0.12, 0.9, dkwLam([0x8A2A2A, 0x2A4A6A, 0x6A5A2A, 0x3A5A3A][i]), -1.5 + i, 0.06, -0.8);
dkwBox(g, 1.2, 0.35, 0.8, dkwLam(0x2A1A10), 0, 0, 0.2);
dkwBox(g, 0.5, 1.4, 0.04, dkwLam(0xF0E8D8), -W / 2 + 1.2, 0, -D / 2 + 0.3);
}
},
function (v) {
return dkwCanvas("glass" + v, 256, 256, function (c, W, H) {
var R = wRand(331 + v * 17), base = ["#0E1420", "#141824", "#101A1E", "#1A1420"][v % 4];
c.fillStyle = base;
c.fillRect(0, 0, W, H);
var cols = 8, rows = 8, cw = W / cols, rh = H / rows;
for (var i = 0; i < cols; i++)
for (var j = 0; j < rows; j++) {
var lit = R() < [0.42, 0.3, 0.5, 0.36][v % 4], hue = R();
c.fillStyle = lit ? (hue < 0.6 ? "rgba(255,226,170," + (0.55 + R() * 0.4) + ")" : hue < 0.85 ? "rgba(180,220,255," + (0.5 + R() * 0.4) + ")" : "rgba(255,170,230,.6)") : "rgba(60,80,110," + (0.25 + R() * 0.25) + ")";
c.fillRect(i * cw + 2, j * rh + 3, cw - 4, rh - 6);
}
c.fillStyle = "rgba(150,170,200,.35)";
for (i = 0; i <= cols; i++)
c.fillRect(i * cw - 1, 0, 2, H);
for (j = 0; j <= rows; j++)
c.fillRect(0, j * rh - 1, W, 3);
});
},
function (v) {
return dkwM("glassM" + v, function () {
var t = dkcGlassTex(v);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / 24, 1 / 26);
var m = dkwLite() ? new THREE.MeshLambertMaterial({ map: t, emissive: 0xFFFFFF, emissiveMap: t, emissiveIntensity: 0.55 }) : new THREE.MeshPhongMaterial({ map: t, emissive: 0xFFFFFF, emissiveMap: t, emissiveIntensity: 0.6, shininess: 90, specular: 0x8090A8 });
m.userData.noPhoto = 1;
return m;
});
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : dkwLand(x, z);
g.position.set(x, y, z);
if (o.ry)
g.rotation.y = o.ry;
P.add(g);
var m = new THREE.Mesh(dkwBoxG(w, h, d), dkcGlassM(o.v || 0));
m.position.y = h / 2;
g.add(m);
var trim = dkwShine(o.trim || 0x8A94A0, 0.25, 0.9);
dkwBox(g, w + 0.6, 1.2, d + 0.6, trim, 0, h, 0);
dkwBox(g, w + 0.4, 5, d + 0.4, dkwLam(0x1A1C22), 0, 0, 0);
if (o.step) {
var w2 = w * 0.7, d2 = d * 0.7, h2 = h * 0.25;
var m2 = new THREE.Mesh(dkwBoxG(w2, h2, d2), dkcGlassM((o.v || 0) + 1));
m2.position.y = h + h2 / 2 + 1.2;
g.add(m2);
dkwBox(g, w2 + 0.4, 0.8, d2 + 0.4, trim, 0, h + h2 + 1.2, 0);
h += h2 + 1.2;
}
if (o.spire) {
dkwCyl(g, 0.25, 0.6, o.spire, trim, 0, h, 0, 8);
var b = new THREE.Mesh(new THREE.SphereGeometry(0.6, 10, 8), dkwGlowM(o.beacon || 0xFF5A5A, 0.85));
b.position.y = h + o.spire;
g.add(b);
}
if (o.band) {
for (var k = 1; k < 4; k++) {
var bd = new THREE.Mesh(new THREE.BoxGeometry(w + 0.3, 0.35, d + 0.3), dkwGlowM(o.band, 0.75));
bd.position.y = h * k / 4;
g.add(bd);
}
}
if (o.solid !== false)
dkwSolid(x, z, w + 0.6, d + 0.6, y - 1, y + h + 20, o.ry || 0);
g.userData.h = h;
return g;
},
function (P, text, x, y, z, ry, col, hgt, o) {
o = o || {};
var key = "neon:" + text + col, cs = "#" + ("000000" + col.toString(16)).slice(-6), len = Math.max(4, text.length), W = 512, H = Math.round(512 / len * 1.5);
var t = dkwCanvas(key, W, H, function (c, Wd, Hd) {
c.clearRect(0, 0, Wd, Hd);
var fs = Math.min(Hd * 0.78, Wd / len * 1.55);
c.font = (o.font || "bold ") + fs + "px " + (o.face || "Georgia");
c.textAlign = "center";
c.textBaseline = "middle";
c.shadowColor = cs;
c.shadowBlur = 18;
c.fillStyle = cs;
c.fillText(text, Wd / 2, Hd / 2);
c.shadowBlur = 6;
c.fillStyle = "rgba(255,255,255,.85)";
c.fillText(text, Wd / 2, Hd / 2);
});
var w = hgt * W / H, m = new THREE.Mesh(new THREE.PlaneGeometry(w, hgt), dkwM("neonM" + key, function () { var mm = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: false }); mm.userData.noPhoto = 1; return mm; }));
m.position.set(x, y, z);
m.rotation.y = ry || 0;
P.add(m);
return m;
},
function (P, pts, w, H, o) {
o = o || {};
dkwStrip(P, pts, w, H, dkwMat("road"), 0.25);
if (o.walk !== false) {
var off = w / 2 + 1.8;
dkcSide(P, pts, off, H);
dkcSide(P, pts, -off, H);
}
var dash = [];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
for (var s = 0; s < L; s += 9) {
var t = s / L;
dash.push({ x: a[0] + (b[0] - a[0]) * t, z: a[1] + (b[1] - a[1]) * t, y: H(a[0], a[1]) + 0.28, ry: Math.atan2(b[0] - a[0], b[1] - a[1]) });
}
}
dkwInst(P, dkwGeo("dash", function () { var g = new THREE.PlaneGeometry(0.18, 3.2); g.rotateX(-Math.PI / 2); return g; }), dkwLam(0xE8D070), dash, { cull: false });
},
function (P, list, H, col) {
var pole = [], head = [];
list.forEach(function (q) { var y = H(q[0], q[1]); pole.push({ x: q[0], z: q[1], y: y, s: 1, ry: q[2] || 0 }); head.push({ x: q[0], z: q[1], y: y, s: 1, ry: q[2] || 0 }); dkwRound(q[0], q[1], 0.25); });
dkwInst(P, dkwGeo("lpole", function () { var g = new THREE.CylinderGeometry(0.08, 0.14, 7, 7); g.translate(0, 3.5, 0); var a = new THREE.BoxGeometry(0.1, 0.1, 1.6); a.translate(0, 7, 0.7); return dkwMerge([g, a]); }), dkwShine(0x4A5058, 0.3, 0.8), pole, {});
dkwInst(P, dkwGeo("lhead", function () { var g = new THREE.BoxGeometry(0.5, 0.12, 0.9); g.translate(0, 6.9, 1.4); return g; }), dkwGlowM(col || 0xE8F0FF, 0.95), head, {});
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
function (P, x, z, ry, col, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : dkwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var body = dkwShine(col || 0x2A2A34, 0.2, 0.85), gl = dkwShine(0x0A0E14, 0.1, 0.9);
var b = dkwEll(g, body, 1.0, 0.42, 2.3, 0, 0.62, 0, 16);
var cab = dkwEll(g, gl, 0.82, 0.38, 1.25, 0, 0.98, -0.2, 14);
var hl = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.06), dkwGlowM(0xE8F4FF, 0.95));
hl.position.set(0, 0.7, 2.28);
g.add(hl);
var tl = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.06), dkwGlowM(0xFF3A4A, 0.9));
tl.position.set(0, 0.72, -2.28);
g.add(tl);
[[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(function (q) { var w = new THREE.Mesh(dkwGeo("carwh", function () { var c = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 14); c.rotateZ(Math.PI / 2); return c; }), dkwLam(0x141416)); w.position.set(q[0] * 0.86, 0.36, q[1] * 1.45); g.add(w); });
if (o.hover) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.04, 6, 24), dkwGlowM(o.hover, 0.8));
ring.rotation.x = Math.PI / 2;
ring.position.y = 0.1;
g.add(ring);
}
if (o.solid !== false)
dkwSolid(x, z, 2.2, 4.8, y - 1, y + 1.6, ry || 0);
return g;
},
function (P, text, x, y, z, col, w) {
var t = dkwCanvas("holo:" + text, 512, 256, function (c, W, H) {
c.clearRect(0, 0, W, H);
var cs = "#" + ("000000" + col.toString(16)).slice(-6);
c.strokeStyle = cs;
c.lineWidth = 4;
c.globalAlpha = 0.8;
c.strokeRect(8, 8, W - 16, H - 16);
for (var i = 0; i < H; i += 6) {
c.fillStyle = "rgba(255,255,255,.05)";
c.fillRect(0, i, W, 2);
}
c.globalAlpha = 1;
c.fillStyle = cs;
c.font = "bold 54px Georgia";
c.textAlign = "center";
c.textBaseline = "middle";
c.shadowColor = cs;
c.shadowBlur = 16;
c.fillText(text, W / 2, H / 2);
});
var m = new THREE.Mesh(new THREE.PlaneGeometry(w || 12, (w || 12) / 2), dkwM("holoM" + text, function () { var mm = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.78, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, fog: false }); mm.userData.noPhoto = 1; return mm; }));
var g = new THREE.Group();
g.position.set(x, y, z);
g.add(m);
g.userData.sp = 0.12;
P.add(g);
DKW.spin.push(g);
return g;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var y = o.y != null ? o.y : dkwLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = o.wall || dkwS(o.tex || "brick", o.col || 0x8A5A4A, 1.6);
dkwBox(g, w, h, d, wall, 0, 0, 0);
dkwBox(g, w + 0.4, 0.5, d + 0.4, dkwLam(0x1E1E22), 0, h, 0);
var win = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.7, 2.4), dkwGlowM(o.glow || 0xFFE0B0, 0.55));
win.position.set(0, 1.6, d / 2 + 0.02);
g.add(win);
for (var f = 1; f < Math.floor(h / 3.6); f++)
for (var i = 0; i < Math.max(2, Math.floor(w / 3)); i++) {
var wm = new THREE.Mesh(dkwGeo("swin", function () { return new THREE.PlaneGeometry(1.1, 1.5); }), (i + f) % 3 ? dkwGlowM(0xFFD8A0, 0.65) : dkwLam(0x1A1C24));
wm.position.set(-w / 2 + (i + 0.5) * w / Math.max(2, Math.floor(w / 3)), f * 3.6 + 1.2, d / 2 + 0.02);
g.add(wm);
}
if (o.sign)
dkcNeon(g, o.sign, 0, h - 1.2, d / 2 + 0.12, 0, o.neon || 0xFF6AD8, 1.1);
if (o.fire) {
for (var f2 = 1; f2 < Math.floor(h / 3.6); f2++) {
dkwBox(g, w * 0.4, 0.08, 1.0, dkwMat("iron"), w * 0.2, f2 * 3.6, d / 2 + 0.5);
for (var r = 0; r < 6; r++)
dkwBox(g, 0.03, 1, 0.03, dkwMat("iron"), w * 0.2 - w * 0.2 + r * w * 0.08, f2 * 3.6, d / 2 + 1.0);
}
}
dkwSolid(x, z, w, d, y - 1, y + h + 2, o.ry || 0);
return g;
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
var M = dkwM("crys" + col, function () { var m = new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 0.25, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.86, flatShading: true }); m.userData.noPhoto = 1; return m; });
var R = wRand(Math.round(x * 3 + z * 7)), n = o.n || 5;
for (var i = 0; i < n; i++) {
var hh = h * (i ? 0.35 + R() * 0.45 : 1), r = hh * 0.12, c = new THREE.Mesh(dkwGeo("crysG", function () { var k = new THREE.CylinderGeometry(0, 1, 1, 6, 1); k.translate(0, 0.5, 0); var b = new THREE.CylinderGeometry(1, 1, 1, 6, 1); b.translate(0, -0.5, 0); return dkwMerge([k, b]); }), M);
c.scale.set(r, hh * 0.5, r);
c.position.set(i ? (R() - 0.5) * h * 0.3 : 0, hh * 0.5, i ? (R() - 0.5) * h * 0.3 : 0);
c.rotation.set(i ? (R() - 0.5) * 0.5 : 0, R() * 3, i ? (R() - 0.5) * 0.5 : 0);
g.add(c);
}
if (o.solid !== false)
dkwRound(x, z, Math.max(0.6, h * 0.12));
return g;
},
function (P, list, o) {
o = o || {};
var lite = dkwLite(), leaf = dkwLeafTex();
if (lite && list.length > 40)
list = list.filter(function (t, i) { return i % 2 === 0; });
dkwInst(P, dkwGeo("atrunk", function () { var g = new THREE.CylinderGeometry(0.4, 0.9, 12, 8); g.translate(0, 6, 0); return g; }), dkwShine(o.bark || 0xE8E0F0, 0.35, 0.3), list, { shadow: !lite });
dkwInst(P, dkwGeo("acrown", function () { var parts = [], R = wRand(9); for (var i = 0; i < (lite ? 5 : 9); i++) {
var c = new THREE.IcosahedronGeometry(2.6 + R() * 1.8, 1);
c.translate((R() - 0.5) * 6, 11 + R() * 4, (R() - 0.5) * 6);
parts.push(c.index ? c.toNonIndexed() : c);
} return dkwMerge(parts); }), dkwM("aleaf" + (o.leaf || 0), function () { var m = new THREE.MeshLambertMaterial({ color: o.leaf || 0x8A6AE8, emissive: o.leaf || 0x8A6AE8, emissiveIntensity: o.glow != null ? o.glow : 0.35, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
list.forEach(function (t) { dkwRound(t.x, t.z, 0.9); });
},
function (P, list, cols) {
cols = cols || [0xFF8AE8, 0x8AE8FF, 0xFFE88A, 0xB88AFF, 0x8AFFB8];
cols.forEach(function (col, k) {
var part = list.filter(function (t, i) { return i % cols.length === k; });
if (!part.length)
return;
dkwInst(P, dkwGeo("aflow", function () { var s = new THREE.CylinderGeometry(0.015, 0.02, 0.5, 4); s.translate(0, 0.25, 0); var b = new THREE.IcosahedronGeometry(0.12, 0); b.translate(0, 0.55, 0); return dkwMerge([s, b]); }), dkwGlowM(col, 0.95), part, {});
});
},
function (P, x, z, h, col, ry, o) {
o = o || {};
var y = o.y != null ? o.y : dkwLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var st = dkwBox(g, 1.2 * h / 3, h, 0.6 * h / 3, dkwMat("greystone"), 0, -0.2, 0);
var t = dkwCanvas("runes" + col, 128, 256, function (c, W, H) {
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
var rm = new THREE.Mesh(new THREE.PlaneGeometry(0.8 * h / 3, h * 0.85), dkwM("runeM" + col, function () { var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }); m.userData.noPhoto = 1; return m; }));
rm.position.set(0, h / 2 - 0.2, 0.3 * h / 3 + 0.02);
g.add(rm);
var rb = rm.clone();
rb.rotation.y = Math.PI;
rb.position.z = -rb.position.z;
g.add(rb);
dkwRound(x, z, 0.6 * h / 3);
return g;
},
function (P, n, x, z, r, y0, y1, col) {
var R = wRand(n * 7 + r), pos = [];
for (var i = 0; i < n; i++)
pos.push((R() - 0.5) * 2 * r, y0 + R() * (y1 - y0), (R() - 0.5) * 2 * r);
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
var m = new THREE.PointsMaterial({ color: col || 0xE8D8FF, size: 0.35, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending });
var p = new THREE.Points(g, m);
p.position.set(x, 0, z);
p.userData.sp = 0.02;
P.add(p);
DKW.spin.push(p);
return p;
},
function (P, x, y, z, r, col, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var ring = new THREE.Mesh(new THREE.TorusGeometry(r, r * 0.06, 10, 48), dkwGlowM(col, 0.95));
g.add(ring);
var t = dkwCanvas("swirl" + col, 256, 256, function (c, W, H) {
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
var disc = new THREE.Mesh(new THREE.CircleGeometry(r * 0.96, 40), dkwM("swirlM" + col, function () { var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.85, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }); m.userData.noPhoto = 1; return m; }));
var sp = new THREE.Group();
sp.add(disc);
sp.userData.sp = 0.4;
g.add(sp);
DKW.spin.push(sp);
sp.rotation.x = 0;
disc.rotation.y = 0;
sp.rotation.order = "YXZ";
sp.userData.axis = "z";
g.userData.live = 1;
return g;
},
function (G) {
var lite = dkwLite(), H = dkwGladeH, R = wRand(77);
dkwTerrain(G, -420, -420, 840, 840, lite ? 14 : 7, H, dkwMat("grass"), function (x, z, y, c) { var n = dkwFbm(x * 0.04, z * 0.04, 3); c.setRGB(0.22 + n * 0.12, 0.24 + n * 0.1, 0.42 + n * 0.12); });
dkcMoons(G);
var i, cg = new THREE.PlaneGeometry(170, 46, lite ? 40 : 90, lite ? 14 : 30), cp = cg.attributes.position;
for (i = 0; i < cp.count; i++) {
var u = cp.getX(i), v = cp.getY(i) + 23, a = u / 170 * Math.PI * 0.9, rr = 96 + dkwFbm(u * 0.05, v * 0.05, 4) * 14 + Math.max(0, 8 - v) * 0.6 + (Math.floor(v / 9) % 2) * 1.6;
cp.setXYZ(i, Math.sin(a) * rr, v - 4 + H(Math.sin(a) * rr, -10 - Math.cos(a) * rr) * 0, -Math.cos(a) * rr + 16);
}
cg.computeVertexNormals();
var cn = cg.attributes.normal, mid = Math.floor(cp.count / 2);
if (cn.getZ(mid) < 0) {
for (i = 0; i < cn.count; i++)
cn.setXYZ(i, -cn.getX(i), -cn.getY(i), -cn.getZ(i));
}
var cm = dkwM("cliffM", function () { var m = dkwS("stone", 0xB8B0D0, 5).clone(); m.side = THREE.DoubleSide; if (m.emissive)
m.emissive.setHex(0x2E2848); return m; });
var cliff = new THREE.Mesh(cg, cm);
cliff.position.set(0, H(0, -80) - 2, -6);
G.add(cliff);
for (i = 0; i < 28; i++) {
var ca = (i / 28 - 0.5) * Math.PI * 0.84;
dkwSolid(Math.sin(ca) * 100, -6 - Math.cos(ca) * 100 + 16, 10, 10, -50, 80, 0);
}
for (i = 0; i < (lite ? 8 : 18); i++) {
var sa = (R() - 0.5) * Math.PI * 0.8, sr = 97;
dkcCrystal(G, Math.sin(sa) * sr, H(0, -80) + 4 + R() * 30, -6 - Math.cos(sa) * sr + 16, 2 + R() * 3, [0xC8A8FF, 0x8AE8FF, 0xFFE08A][i % 3], { n: 3, solid: false });
}
for (i = 0; i < (lite ? 20 : 50); i++) {
var va = (R() - 0.5) * Math.PI * 0.8, vr = 96, vx = Math.sin(va) * vr, vz = -6 - Math.cos(va) * vr + 16, vy = H(0, -80) + 16 + R() * 24, vl = 6 + R() * 14;
var vn = new THREE.Mesh(dkwTaper([[vx, vy, vz], [vx + (R() - 0.5), vy - vl * 0.5, vz + 0.6], [vx + (R() - 0.5) * 2, vy - vl, vz + 1]], [0.12, 0.09, 0.04], 8, 4), dkwLam(0x5A8A6A));
G.add(vn);
}
var fall = new THREE.Mesh(new THREE.PlaneGeometry(10, 38, 1, 8), dkwM("lightfall", function () {
var t = dkwCanvas("lfall", 64, 256, function (c, W, Hh) { var g = c.createLinearGradient(0, 0, W, 0); g.addColorStop(0, "rgba(200,180,255,0)"); g.addColorStop(0.3, "rgba(230,220,255,.9)"); g.addColorStop(0.7, "rgba(255,240,200,.9)"); g.addColorStop(1, "rgba(200,180,255,0)"); c.fillStyle = g; c.fillRect(0, 0, W, Hh); for (var k = 0; k < 40; k++) {
c.fillStyle = "rgba(255,255,255,.4)";
c.fillRect(Math.random() * W, Math.random() * Hh, 1.5, 20);
} });
t.wrapS = t.wrapT = THREE.RepeatWrapping;
var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
m.userData.noPhoto = 1;
return m;
}));
fall.position.set(0, H(0, -70) + 19, -74.5);
G.add(fall);
DKW.water.push(fall);
var pool = dkwWater(G, 0, -56, 34, 22, H(0, -56) + 0.3, 0xB8A8FF, 0.8);
for (i = 0; i < 7; i++) {
var a = i / 7 * Math.PI - Math.PI;
dkcRune(G, Math.cos(a) * 16, -56 + Math.sin(a) * 10, 2.6 + R() * 1.4, [0xC8A8FF, 0x8AE8FF, 0xFFE08A][i % 3], a);
}
dkcMotes(G, lite ? 120 : 360, 0, -30, 90, 0.5, 16, 0xE8D8FF);
(function () {
var x = 34, z = -10, y = H(x, z), M = dkwShine(0xD8D0E8, 0.35, 0.3);
var tr = new THREE.Mesh(dkwTaper([[0, 0, 0], [0, 10, 0.5], [0.5, 22, -0.5], [0, 30, 0]], [4.5, 3.2, 2.4, 1.6], 12, 12), M);
tr.position.set(x, y, z);
G.add(tr);
for (var k = 0; k < 8; k++) {
var a = k / 8 * Math.PI * 2, rt = new THREE.Mesh(dkwTaper([[0, 3, 0], [Math.cos(a) * 5, 0.8, Math.sin(a) * 5], [Math.cos(a) * 10, -0.4, Math.sin(a) * 10]], [1.4, 0.8, 0.3], 8, 8), M);
rt.position.set(x, y, z);
G.add(rt);
}
dkcAwenTrees(G, [{ x: x, z: z, y: y + 16, s: 2.6 }], { bark: 0xD8D0E8, leaf: 0xB88AFF, glow: 0.45 });
dkwRound(x, z, 4.6);
})();
var trees = dkwScatter(78, lite ? 40 : 90, -260, -200, 260, 200, function (x, z) { var r = Math.hypot(x, z + 10); return r > 70 && r < 240; }, H, 0.8, 1.4);
dkcAwenTrees(G, trees, { bark: 0xF0E8F8, leaf: 0x9A7AF0 });
dkcFlowers(G, dkwScatter(79, lite ? 260 : 700, -120, -90, 120, 90, function (x, z) { return Math.hypot(x, z + 10) < 110; }, H, 0.8, 1.6));
(function () {
var x = -14, z = 20, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = 0.4;
G.add(g);
dkwBox(g, 3.2, 4.2, 0.9, dkwMat("greystone"), 0, -0.2, 0);
dkwBox(g, 3.8, 0.5, 1.4, dkwMat("greystone"), 0, -0.3, 0);
dkwSign(g, "WHEN STEEL TOWERS PIERCE THE STARLIT VEIL", 2.8, 0.36, 0, 3.4, 0.47, 0, { bg: "#3A3A44", ink: "#E8D8A0" });
dkwSign(g, "A CHILD OF SCALES SHALL NOW AWAKE", 2.8, 0.36, 0, 2.9, 0.47, 0, { bg: "#3A3A44", ink: "#E8D8A0" });
dkwSign(g, "AURELIAN THE TIMELESS", 2.0, 0.3, 0, 0.5, 0.47, 0, { bg: "#3A3A44", ink: "#C8B880", it: 1 });
dkwRound(x, z, 1.8);
})();
dkwSpot(-14, 22, 3, "The prophecy stone", "read the prophecy", function () { dkxProphecy(); }, H(-14, 22));
dkwSpot(34, -3, 4, "The ancient tree", "lay your hand on its bark", function () { dkbSay("🌳 Its bark is warm, and under your palm you feel a heartbeat that is not yours: roots that run down into two worlds at once."); }, H(34, -3));
dkwSpot(0, -46, 4, "The pool of light", "look into the pool", function () { dkbSay("✨ The pool shows you a city of glass and neon under a hard, starless sky. Dallas. The veil is thin here."); }, H(0, -46));
},
function () {
dkbText(function (B) {
var T = B && B.ch ? B.ch[0] : null;
var b = DKB_H + "The Great Drakkyn Prophecy</div><div style='max-height:52vh;overflow:auto;font-style:italic;line-height:1.5'>" + (T ? T.p.map(function (l) { return esc(l); }).join("<br>") : "") + "</div>";
worldCard(b + worldBtn("back", "Close", ""), { back: function () { worldCard(null); } });
});
},
function (G) {
var lite = dkwLite(), H = dkwTowerH, R = wRand(2077);
dkwBox(G, 1400, 2, 1400, dkwMat("paving"), 0, 0, 0);
var T = dkcTower(G, 0, -10, 34, 34, 198, { v: 0, trim: 0xA8B4C0, band: 0x6AC8FF, step: 1, spire: 22, beacon: 0x6AC8FF });
for (var k = 0; k < 4; k++) {
var a = k / 4 * Math.PI * 2 + 0.4, dish = new THREE.Mesh(new THREE.SphereGeometry(4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 3), dkwShine(0xE8ECF0, 0.2, 0.6));
dish.position.set(Math.cos(a) * 8, 252, -10 + Math.sin(a) * 8);
dish.rotation.set(-0.8, a, 0);
G.add(dish);
}
dkcNeon(G, "VERRIN", 0, 30, 7.4, 0, 0x9AD8FF, 4.5, { face: "Arial" });
dkcNeon(G, "RESEARCH INSTITUTE", 0, 25.5, 7.4, 0, 0xE8F4FF, 1.6, { face: "Arial" });
dkwBox(G, 16, 0.6, 8, dkwShine(0x2A3038, 0.2, 0.9), 0, 8, 11);
for (var i = -2; i <= 2; i++)
dkwBox(G, 0.3, 8, 0.3, dkwShine(0xA8B4C0, 0.2, 0.9), i * 3.6, 2, 14.6);
var gl = new THREE.Mesh(new THREE.PlaneGeometry(12, 6), dkwGlowM(0xD8ECFF, 0.55));
gl.position.set(0, 5, 7.2);
G.add(gl);
dkwDoorTo(G, "tower", 0, 0, 7.6, 0, "The glass doors of Verrin Tower", 30, 24, { col: 0x2A3A48, frame: dkwShine(0xA8B4C0, 0.2, 0.9), y: 2 });
dkwWater(G, 0, 52, 8, 40, 2.3, 0x2A5A8A, 0.85);
dkwBox(G, 9, 0.4, 41, dkwMat("granite"), 0, 2, 52);
for (i = 0; i < 8; i++) {
var lt = new THREE.Mesh(new THREE.CircleGeometry(0.4, 12), dkwGlowM(0x8AD8FF, 0.8));
lt.rotation.x = -Math.PI / 2;
lt.position.set(0, 2.32, 36 + i * 5);
G.add(lt);
}
[[-14, 40], [14, 40], [-14, 64], [14, 64]].forEach(function (q) { dkwBox(G, 6, 0.9, 2, dkwMat("granite"), q[0], 2, q[1], 0, true); dkwPlant(G, "bush", [{ x: q[0], z: q[1], y: 2.9, s: 1.1 }], { col: 0x2A5A3A, keepAll: 1 }); });
[-9, 9].forEach(function (x) { dkwBox(G, 1.2, 2.4, 1.2, dkwShine(0x2A3038, 0.2, 0.9), x, 2, 22, 0, true); var s = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.5), dkwGlowM(0x6AFF8A, 0.8)); s.position.set(x, 4, 22.62); G.add(s); });
dkwBox(G, 40, 0.3, 40, dkwMat("granite"), -58, 2, -10);
[[-58, 10, 40, 0], [-58, -30, 40, 0], [-78, -10, 0, 40]].forEach(function (q) { dkwBox(G, q[2] || 0.3, 6, q[3] || 0.3, dkwShine(0x1A2A3A, 0.15, 0.9), q[0], 2, q[1], 0, true); });
var circ = dkwCanvas("arcane", 512, 512, function (c, W, Hh) {
c.clearRect(0, 0, W, Hh);
c.strokeStyle = "#7ACFFF";
c.shadowColor = "#7ACFFF";
c.shadowBlur = 14;
c.lineWidth = 6;
[240, 200, 120].forEach(function (r) { c.beginPath(); c.arc(W / 2, Hh / 2, r, 0, 7); c.stroke(); });
for (var k = 0; k < 7; k++) {
var a = k / 7 * Math.PI * 2;
c.beginPath();
c.moveTo(W / 2 + Math.cos(a) * 120, Hh / 2 + Math.sin(a) * 120);
c.lineTo(W / 2 + Math.cos(a + Math.PI * 4 / 7) * 120, Hh / 2 + Math.sin(a + Math.PI * 4 / 7) * 120);
c.stroke();
}
c.font = "bold 26px Georgia";
c.fillStyle = "#BFE8FF";
for (k = 0; k < 24; k++) {
var b = k / 24 * Math.PI * 2;
c.save();
c.translate(W / 2 + Math.cos(b) * 220, Hh / 2 + Math.sin(b) * 220);
c.rotate(b + Math.PI / 2);
c.fillText("ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ"[k], 0, 0);
c.restore();
}
});
var cm = new THREE.Mesh(new THREE.CircleGeometry(9, 48), dkwM("arcM", function () { var m = new THREE.MeshBasicMaterial({ map: circ, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }); m.userData.noPhoto = 1; return m; }));
cm.rotation.x = -Math.PI / 2;
cm.position.set(-58, 2.34, -14);
G.add(cm);
dkwSpot(-58, -14, 5, "The arcane circle", "study the symbols", function () { dkbSay("🔷 Symbols older than any alphabet, cut into the stone and filled with a faint blue glow: Verrin's attempt to steady a flow of raw magic."); }, 2.3);
var pts = [[-700, 120], [700, 120]];
dkcStreet(G, pts, 16, H, {});
dkcLamps(G, [-120, -80, -40, 0, 40, 80, 120].map(function (x) { return [x, 109, 0]; }).concat([-100, -60, -20, 20, 60, 100].map(function (x) { return [x, 131, Math.PI]; })), H);
for (i = 0; i < 12; i++) {
var cx = -160 + i * 30;
dkcCar(G, cx, 116 + (i % 2 ? -1 : 1) * 0.5, i % 2 ? Math.PI / 2 : -Math.PI / 2, [0x2A2A34, 0x8A1A2A, 0xE8E8EC, 0x1A3A6A, 0x3A3A3A][i % 5], { y: 2, hover: i % 4 === 0 ? 0x6AE8FF : 0 });
}
[[-150, -60, 40, 40, 140, 1], [150, -40, 36, 44, 170, 2], [-170, 220, 50, 40, 90, 3], [160, 220, 44, 44, 120, 1], [-300, -10, 40, 60, 110, 2], [300, 30, 44, 44, 150, 3], [0, -180, 60, 40, 120, 1], [-260, 210, 40, 40, 70, 0], [280, -200, 40, 40, 180, 0]].forEach(function (q) { dkcTower(G, q[0], q[1], q[2], q[3], q[4], { v: q[5], y: 2, band: R() < 0.5 ? [0xFF6AD8, 0x6AE8FF, 0xFFC86A][Math.floor(R() * 3)] : 0 }); });
dkcHolo(G, "THE FUTURE IS CONTROL", -40, 26, 100, 0x6AE8FF, 14);
dkcHolo(G, "DALLAS 2077", 46, 22, 104, 0xFF6AD8, 12);
dkwCrowd(2078, lite ? 8 : 18, -60, 70, 60, 105, { dress: "dkmod", wander: 12, names: ["A night-shift worker", "A courier", "A woman walking her dog", "A man with a coffee"], says: ["Don't look up at the top floors. People say they hum at night.", "I deliver to the tower sometimes. Nobody signs. They just take it.", "Lovely night. Bit too quiet round the tower, though.", "Long shift. You?"], persona: "city" });
},
function () {
var floors = [["tLobby", "The lobby"], ["tLab", "The top floor: the laboratory and the holographic map"], ["tAeth", "The Aetherium chamber"], ["tOffice", "Dr. Verrin's office"], ["tCells", "Sublevel: the Containment Wing"], ["tLab13", "The 13th floor: the glyph laboratory"], ["tBoard", "The 40th floor: the boardroom"]], fns = {}, b = DKB_H + "🛗 Verrin Tower</div><p style='opacity:.85'>Fifty-two floors. The panel lights under your hand.</p>";
floors.forEach(function (f, i) { b += worldBtn("f" + i, f[1], ""); fns["f" + i] = function () { worldCard(null); var A = DKW_AT[f[0]]; dkwGo({ sc: "tower", x: A.x, z: A.z, y: A.y, ry: 0 }, "🛗 <b>" + esc(f[1]) + "</b>", dkbPopulate); }; });
b += worldBtn("x", "Stay here", "");
fns.x = function () { worldCard(null); };
worldCard(b, fns);
},
function () {
var g = new THREE.Group();
var t = dkwCanvas("holomap", 512, 512, function (c, W, Hh) {
c.clearRect(0, 0, W, Hh);
c.strokeStyle = "rgba(120,200,255,.8)";
c.lineWidth = 2;
for (var i = 0; i < W; i += 32) {
c.beginPath();
c.moveTo(i, 0);
c.lineTo(i, Hh);
c.stroke();
c.beginPath();
c.moveTo(0, i);
c.lineTo(W, i);
c.stroke();
}
var R = wRand(5);
c.fillStyle = "rgba(140,220,255,.55)";
for (i = 0; i < 70; i++)
c.fillRect(R() * W, R() * Hh, 8 + R() * 20, 8 + R() * 20);
c.strokeStyle = "rgba(200,140,255,.9)";
c.lineWidth = 3;
c.shadowColor = "#C88AFF";
c.shadowBlur = 12;
for (i = 0; i < 9; i++) {
c.beginPath();
var x = R() * W, y = R() * Hh;
c.moveTo(x, y);
for (var j = 0; j < 6; j++) {
x += (R() - 0.5) * 90;
y += (R() - 0.5) * 90;
c.lineTo(x, y);
}
c.stroke();
}
});
var M = function (op) { var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; };
var base = new THREE.Mesh(new THREE.CircleGeometry(2.4, 40), M(0.85));
base.rotation.x = -Math.PI / 2;
g.add(base);
var R = wRand(9);
for (var i = 0; i < 26; i++) {
var hh = 0.15 + R() * 0.9, b = new THREE.Mesh(new THREE.BoxGeometry(0.12, hh, 0.12), dkwGlowM(0x8AD8FF, 0.55));
var a = R() * 6.28, r = R() * 1.8;
b.position.set(Math.cos(a) * r, hh / 2, Math.sin(a) * r);
g.add(b);
}
for (i = 0; i < 7; i++) {
var s = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.5 + R() * 0.5, 5), dkwGlowM(0xD8A8FF, 0.6));
var a2 = R() * 6.28, r2 = R() * 1.8;
s.position.set(Math.cos(a2) * r2, 1.2 + R() * 0.4, Math.sin(a2) * r2);
s.rotation.x = Math.PI;
g.add(s);
}
g.userData.sp = 0.08;
DKW.spin.push(g);
return g;
},
function (P, x, z, ry, o) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
P.add(g);
var steel = dkwShine(0x8A949E, 0.25, 0.85);
dkwBox(g, 5, 0.2, 5, dkwShine(0x2A3038, 0.2, 0.85), 0, 0, 0);
dkwBox(g, 5, 0.3, 5, steel, 0, 4.2, 0);
[-2.5, 2.5].forEach(function (k) { dkwBox(g, 0.2, 4.2, 5, steel, k, 0, 0); });
dkwBox(g, 5, 4.2, 0.2, steel, 0, 0, -2.5);
for (var i = 0; i < 9; i++)
dkwBox(g, 0.08, 4.2, 0.08, o.red ? dkwGlowM(0xFF3A2A, 0.85) : steel, -2.2 + i * 0.55, 0, 2.45);
var pane = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 4), dkwM("cellglass", function () { var m = new THREE.MeshPhongMaterial({ color: 0xBFE8FF, transparent: true, opacity: 0.16, shininess: 120, depthWrite: false }); m.userData.noPhoto = 1; return m; }));
pane.position.set(0, 2.1, 2.3);
g.add(pane);
var lt = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 0.12), dkwGlowM(o.red ? 0xFF4A3A : 0x8AFFB8, 0.85));
lt.position.set(0, 4.1, 2.36);
g.add(lt);
var w = dkwLocalSc;
switch (o.n) {
case "griffin":
dkxGriffin(g);
break;
case "jelly": {
var tank = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 3.6, 20, 1, true), dkwWaterM(0x2A8AC8, 0.45));
tank.position.y = 2;
g.add(tank);
for (var j = 0; j < 4; j++) {
var jb = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), dkwGlowM([0xFF8AE8, 0x8AE8FF][j % 2], 0.6));
jb.position.set((j - 1.5) * 0.6, 1.2 + j * 0.6, (j % 2) * 0.4);
jb.userData.y0 = jb.position.y;
jb.userData.ph = j;
g.add(jb);
DKW.bob.push(Object.assign(jb, {}));
jb.userData.kind = "float";
jb.userData.amp = 0.25;
jb.userData.f = 0.6;
}
break;
}
case "dryad": {
var p = dkwDressed("dryad", "dkfae", { sex: "f", skin: 0xA8C890, hair: 0x3A6A2A });
p.position.set(0, 0, -0.6);
g.add(p);
for (var v = 0; v < 5; v++) {
var vn = new THREE.Mesh(dkwTaper([[-2 + v, 0, -2.3], [-1.6 + v, 2, -2.2], [-2 + v, 4, -2.3]], [0.05, 0.04, 0.02], 8, 5), dkwLam(0x3A6A2A));
g.add(vn);
}
break;
}
case "gnome": {
var gn = dkwDressed("gnome", "dktown", { sex: "m", beard: "full", hair: 0xE8E8E8 });
gn.scale.set(0.55, 0.55, 0.55);
gn.position.set(0, 0, -0.4);
g.add(gn);
var hat = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 10), dkwLam(0xA82A2A));
hat.position.y = 1.08;
gn.add(hat);
break;
}
case "wisp": {
var ws = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10), dkwGlowM(0xC8FFE8, 0.9));
ws.position.set(0, 2.2, 0);
ws.userData.kind = "float";
ws.userData.y0 = 2.2;
ws.userData.amp = 0.5;
ws.userData.f = 0.8;
ws.userData.ph = 1;
g.add(ws);
DKW.bob.push(ws);
var h2 = new THREE.Mesh(new THREE.SphereGeometry(0.7, 12, 10), dkwGlowM(0x8AFFC8, 0.2));
ws.add(h2);
break;
}
case "golem":
dkxGolem(g, 0x8A7A6A, false);
g.children[g.children.length - 1].scale && 0;
break;
case "zariah": break;
}
dkwSolid(P.position.x + x, P.position.z + z, 5.4, 5.4, DKW_IN_Y - 100, DKW_IN_Y + 100, ry);
return g;
},
function (g) {
var fur = dkwLam(0xC89A5A), wh = dkwLam(0xF4F0E8), beak = dkwLam(0xE8B83A);
dkwEll(g, fur, 0.6, 0.55, 1.1, 0, 1.1, 0, 14);
var hd = dkwEll(g, wh, 0.32, 0.34, 0.38, 0, 1.75, 0.9, 12);
var bk = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.4, 8), beak);
bk.rotation.x = Math.PI / 2;
bk.position.set(0, 1.68, 1.32);
g.add(bk);
[-1, 1].forEach(function (k) { var wing = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 1.1), wh); wing.position.set(k * 0.6, 1.45, -0.1); wing.rotation.z = k * 0.4; g.add(wing); });
[[-1, 0.6], [1, 0.6], [-1, -0.6], [1, -0.6]].forEach(function (q) { dkwLeg(g, q[1] > 0 ? beak : fur, q[0] * 0.3, 1.0, q[1], 1.0, 0.12, { toes: q[1] > 0 }); });
},
function (G) {
var lite = dkwLite(), H = dkwGardenH;
dkwTerrain(G, -210, -210, 420, 420, lite ? 12 : 6, H, dkwMat("lawn"), function (x, z, y, c) { var n = dkwFbm(x * 0.06, z * 0.06, 3); c.setRGB(0.2 + n * 0.1, 0.3 + n * 0.12, 0.2 + n * 0.08); });
dkwHouse(G, 0, -26, 16, 12, 7, { col: 0xE8E0D0, roof: dkwMat("slate"), shut: 0x2A3A4A, noDoor: true });
dkwBox(G, 10, 0.4, 4, dkwMat("planks"), 0, 0, -18.2);
[-4.6, 4.6].forEach(function (x) { dkwCyl(G, 0.15, 0.15, 3, dkwMat("white"), x, 0.4, -16.6, 8); });
dkwBox(G, 10.4, 0.25, 4.4, dkwMat("white"), 0, 3.4, -18.2);
var pl = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), dkwGlowM(0xFFE0A0, 0.95));
pl.position.set(1.6, 3, -19.6);
G.add(pl);
if (!lite) {
var L = new THREE.PointLight(0xFFD8A0, 0.9, 18);
L.position.set(1.6, 3, -18);
G.add(L);
}
dkwDoorTo(G, "garden", 0, 0, -19.9, 0, "The door of the house", 12, 10, { col: 0x3A2A1E, frame: dkwMat("white") });
var jas = dkwScatter(301, lite ? 12 : 26, -16, -6, -4, 8, null, H, 0.8, 1.3);
dkwPlant(G, "bush", jas, { col: 0x2A4A2A, keepAll: 1 });
dkcFlowers(G, jas.map(function (t) { return { x: t.x, z: t.z, y: t.y + 1.0, s: 0.5 }; }).concat(dkwScatter(302, lite ? 60 : 160, -16, -6, -4, 8, null, function (x, z) { return H(x, z) + 0.6 + Math.random() * 0.6; }, 0.25, 0.4)), [0xFFFFF0]);
for (var x = -24; x <= 24; x += 2) {
dkwBox(G, 0.12, 1.4, 0.12, dkwMat("white"), x, 0, 14);
}
dkwBox(G, 48, 0.1, 0.12, dkwMat("white"), 0, 1.2, 14);
dkwBox(G, 48, 0.1, 0.12, dkwMat("white"), 0, 0.6, 14);
dkwPlant(G, "bush", dkwScatter(303, lite ? 10 : 20, -24, 13, 24, 15, null, H, 0.6, 0.9), { col: 0x3A5A2A, keepAll: 1 });
dkcFlowers(G, dkwScatter(304, lite ? 40 : 90, -24, 13, 24, 15, null, function (x, z) { return H(x, z) + 0.9; }, 0.3, 0.4), [0xFFE8A0, 0xFFF4D8]);
dkwStrip(G, [[0, 24], [0, -16]], 1.6, H, dkwMat("gravel"), 0.05);
dkwPlant(G, "tree", dkwScatter(305, lite ? 10 : 22, -200, -200, 200, -40, null, H, 0.9, 1.4), { col: 0x1E2E1E });
dkwPlant(G, "tree", [{ x: 18, z: -6, y: H(18, -6), s: 1.2 }, { x: -20, z: -8, y: H(-20, -8), s: 1.1 }], { col: 0x2A3A24, keepAll: 1 });
dkcMotes(G, lite ? 60 : 160, 0, 0, 22, 0.4, 3, 0xE8FF8A);
var moon = new THREE.Mesh(new THREE.SphereGeometry(40, 20, 14), new THREE.MeshBasicMaterial({ color: 0xF4F4E8, fog: false }));
moon.position.set(300, 420, -900);
G.add(moon);
dkwSpot(-8, 4, 3, "The jasmine", "smell the jasmine", function () { dkbSay("🌼 Night-blooming jasmine, sweet and heavy, and under it honeysuckle and wood smoke: phantom scents from a life that feels centuries old."); }, H(-8, 4));
},
function (G) {
var lite = dkwLite(), R = wRand(404), rockM = dkwS("b:strata", 0x2A2230, 6);
DKW_VOIDP.forEach(function (p) { var g = new THREE.Mesh(new THREE.CylinderGeometry(p[2], p[2] * 0.3, p[2] * 1.4, 9, 1), rockM); g.position.set(p[0], p[3] - p[2] * 0.7, p[1]); G.add(g); var top = new THREE.Mesh(new THREE.CircleGeometry(p[2], 9), rockM); top.rotation.x = -Math.PI / 2; top.position.set(p[0], p[3] + 0.01, p[1]); G.add(top); });
for (var i = 0; i < (lite ? 20 : 50); i++) {
var s = 2 + R() * 10, sh = new THREE.Mesh(new THREE.OctahedronGeometry(s, 0), rockM), a = R() * 6.28, r = 60 + R() * 220;
sh.position.set(Math.cos(a) * r, (R() - 0.5) * 120, Math.sin(a) * r);
sh.rotation.set(R() * 3, R() * 3, R() * 3);
sh.userData.kind = "float";
sh.userData.y0 = sh.position.y;
sh.userData.amp = 2;
sh.userData.f = 0.1;
sh.userData.ph = R() * 6;
G.add(sh);
DKW.bob.push(sh);
}
dkcMotes(G, lite ? 200 : 600, 0, -40, 200, -40, 60, 0xB08AFF);
dkcPortal(G, 0, 6, -18, 5, 0x6AC8FF, 0);
var lab = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), dkwGlowM(0x8ACFFF, 0.25));
lab.position.set(0, 6, -18.3);
G.add(lab);
(function () {
var g = new THREE.Group();
g.position.set(-60, 7, -170);
G.add(g);
var M = dkwS("b:slate", 0x1A1620, 3);
dkwBox(g, 40, 18, 30, M, 0, 0, 0);
[-18, 18].forEach(function (x) { dkwCyl(g, 4, 5, 40, M, x, 0, 12, 10); var c = new THREE.Mesh(new THREE.ConeGeometry(5.4, 12, 10), M); c.position.set(x, 46, 12); g.add(c); });
dkwCyl(g, 6, 7, 60, M, 0, 0, -6, 12);
var cn = new THREE.Mesh(new THREE.ConeGeometry(8, 18, 12), M);
cn.position.set(0, 69, -6);
g.add(cn);
for (var k = 0; k < 14; k++) {
var w = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.4), dkwGlowM(0x9A6AFF, 0.7));
w.position.set(-16 + k * 2.5, 8 + (k % 3) * 4, 15.1);
g.add(w);
}
})();
dkwSpot(0, -12, 5, "The tear in the Void", "look through the tear", function () { dkbSay("🌀 Through the tear: a destroyed laboratory, two figures changed by powers they cannot hope to understand, and a crystal pulsing with stolen heartbeats."); }, 0.5);
},
function (G) {
var lite = dkwLite(), H = dkwDallasH, R = wRand(2077002);
dkwBox(G, 1900, 0.3, 1900, dkwS("b:darktile", 0x3A3A40, 3), 0, 0, 0);
dkcStreet(G, [[-900, 0], [900, 0]], 18, H, {});
[-300, -150, 0, 150, 300].forEach(function (x) { dkcStreet(G, [[x, -900], [x, 900]], 14, H, {}); });
dkcStreet(G, [[-900, -170], [900, -170]], 14, H, {});
dkcStreet(G, [[-900, 170], [900, 170]], 14, H, {});
var sheen = new THREE.Mesh(new THREE.PlaneGeometry(1800, 18), dkwM("wetroad", function () { var m = new THREE.MeshPhongMaterial({ color: 0x1A1424, transparent: true, opacity: 0.35, shininess: 140, specular: 0xB88AE8, depthWrite: false }); m.userData.noPhoto = 1; return m; }));
sheen.rotation.x = -Math.PI / 2;
sheen.position.y = 0.58;
G.add(sheen);
var lamps = [];
for (var x = -880; x <= 880; x += 40) {
lamps.push([x, -11.5, 0]);
lamps.push([x + 20, 11.5, Math.PI]);
}
dkcLamps(G, lamps, H);
var blocks = [[-225, -85], [-75, -85], [75, -85], [225, -85], [-225, 85], [-75, 85], [75, 85], [225, 85], [-375, 85], [375, 85], [-375, -85], [375, -85]];
blocks.forEach(function (b, i) { if (b[0] === 225 && b[1] === -85)
return; var big = R() < 0.6; if (big)
dkcTower(G, b[0] + (R() - 0.5) * 20, b[1] + (b[1] > 0 ? 30 : -30), 40 + R() * 16, 34 + R() * 10, 80 + R() * 170, { v: i % 4, band: R() < 0.5 ? [0xFF6AD8, 0x6AE8FF, 0xFFC86A, 0x9A6AFF][i % 4] : 0, spire: R() < 0.3 ? 14 : 0, beacon: 0xFF4A4A }); });
var shops = [[-130, -24, "PAWN"], [-40, -24, "NOODLES"], [30, -24, "24 HR LAUNDRY"], [100, -24, "BAR"], [180, -24, "TATTOO"], [-180, 24, "PHARMACY"], [-30, 24, "SYNTH-REPAIR"], [160, 24, "KARAOKE"], [200, 24, "BODEGA"], [-330, 24, "HOTEL"], [330, -24, "DANCE CLUB"], [-330, -24, "GROCERY"]];
shops.forEach(function (s, i) {
var ry = s[1] < 0 ? 0 : Math.PI, w = 22 + R() * 10, d = 14, h = 8 + Math.floor(R() * 4) * 3.6;
dkcShop(G, s[0], s[1] + (s[1] < 0 ? -d / 2 : d / 2), w, d, h, { ry: ry, sign: s[2], neon: [0xFF6AD8, 0x6AE8FF, 0xFFC86A, 0x9AFF6A, 0xFF5A5A][i % 5], col: [0x6A4A3A, 0x4A4A52, 0x7A5A40, 0x3A3A44][i % 4], fire: i % 3 === 0 });
dkwDoorTo(G, "dallas", 6 + (i % 4), s[0], s[1] + (s[1] < 0 ? 0.3 : -0.3), ry, "The door of the " + s[2].toLowerCase(), 14, 10, { col: 0x1A1A22, frame: dkwShine(0x3A3A44, 0.3, 0.8) });
});
(function () {
var g = new THREE.Group();
g.position.set(60, 0.3, -14);
G.add(g);
var chrome = dkwShine(0xD8DCE0, 0.2, 0.9);
dkwBox(g, 26, 5.2, 14, dkwS("b:darktile", 0xE8ECEC, 1.4), 0, 0, -7);
dkwBox(g, 26.4, 0.6, 14.4, chrome, 0, 5.2, -7);
dkwBox(g, 26.4, 0.5, 14.4, dkwLam(0x2A9A9A), 0, 0, -7);
var win = new THREE.Mesh(new THREE.PlaneGeometry(22, 2.6), dkwGlowM(0xFFF4E0, 0.7));
win.position.set(0, 2.4, 0.02);
g.add(win);
dkcNeon(g, "MOONLIGHT DINER", 0, 7.2, 0.2, 0, 0x8AE8FF, 1.8, { face: "Georgia", font: "italic bold " });
var cres = dkcNeon(g, "☾", -10, 7.2, 0.25, 0, 0xFFE08A, 2.4);
dkcNeon(g, "OPEN 24 HOURS", 8, 1.1, 0.12, 0, 0xFF6A8A, 0.5, { face: "Arial" });
dkwSolid(60, -21, 26, 14, -1, 8, 0);
})();
dkwDoorTo(G, "dallas", 0, 52, -13.6, 0, "The door of the Moonlight Diner", 22, 18, { col: 0x8AC8C8, frame: dkwShine(0xD8DCE0, 0.2, 0.9) });
(function () {
dkcShop(G, -90, -31, 24, 16, 18, { wall: dkwS("brick", 0x6A3A2E, 1.6), fire: 1, glow: 0xFFE8C0 });
var ac = dkwBox(G, 0.9, 0.6, 0.7, dkwShine(0x9A9A9A, 0.3, 0.7), -84, 10.8, -22.6);
})();
dkwDoorTo(G, "dallas", 1, -96, -22.8, 0, "The door of Drake's building", 14, 10, { col: 0x3A2A20, frame: dkwMat("iron") });
(function () { dkcShop(G, -90, 31, 20, 14, 7, { ry: Math.PI, sign: "QUIK-STOP 24/7", neon: 0xFF3A4A, glow: 0xF8FFF0 }); var n2 = dkcNeon(G, "ICE · LOTTO · NOODLES", -90, 5.4, 23.8, Math.PI, 0x3A8AFF, 0.7, { face: "Arial" }); })();
dkwDoorTo(G, "dallas", 5, -90, 23.8, Math.PI, "The door of the convenience store", 14, 10, { col: 0x1A1A22, frame: dkwShine(0xD8DCE0, 0.2, 0.9) });
(function () {
var px = 230, pz = -110;
dkwBox(G, 120, 0.5, 70, dkwMat("lawn"), px, 0.3, pz);
var iron = dkwLam(0x141414);
var posts = [];
for (var x = px - 60; x <= px + 60; x += 1.2)
posts.push({ x: x, z: pz + 35, y: 0.8, s: 1 });
dkwInst(G, dkwGeo("fpost", function () { var c = new THREE.CylinderGeometry(0.03, 0.03, 1.8, 5); c.translate(0, 0.9, 0); var t = new THREE.ConeGeometry(0.07, 0.2, 5); t.translate(0, 1.9, 0); return dkwMerge([c, t]); }), iron, posts, {});
dkwBox(G, 120, 0.08, 0.08, iron, px, 1.5, pz + 35);
dkwBox(G, 120, 0.08, 0.08, iron, px, 0.5, pz + 35);
dkwSolid(px, pz + 35, 120, 0.3, -1, 3, 0);
dkwPlant(G, "tree", dkwScatter(2201, lite ? 10 : 22, px - 55, pz - 30, px + 55, pz + 28, null, H, 1, 1.4), { col: 0x2A4A2A });
dkwPlant(G, "bush", dkwScatter(2202, lite ? 10 : 24, px - 55, pz - 30, px + 55, pz + 28, null, H, 0.8, 1.2), { col: 0x2A4A2A });
var ferns = new THREE.Group();
for (var i = 0; i < 26; i++) {
var f = new THREE.Mesh(dkwGeo("frostfern", function () { return new THREE.PlaneGeometry(0.6, 0.9); }), dkwM("fernM", function () {
var t = dkwCanvas("fern", 128, 192, function (c, W, Hh) { c.clearRect(0, 0, W, Hh); c.strokeStyle = "rgba(230,248,255,.95)"; c.lineWidth = 3; c.shadowColor = "#BFE8FF"; c.shadowBlur = 8; c.beginPath(); c.moveTo(W / 2, Hh); c.lineTo(W / 2, 10); c.stroke(); for (var k = 0; k < 12; k++) {
var y = Hh - 14 - k * 14, l = 40 - k * 2.6;
c.beginPath();
c.moveTo(W / 2, y);
c.lineTo(W / 2 - l, y - 14);
c.moveTo(W / 2, y);
c.lineTo(W / 2 + l, y - 14);
c.stroke();
} });
var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, side: THREE.DoubleSide });
m.userData.noPhoto = 1;
return m;
}));
f.position.set(px - 30 + i * 2.3, 1.2, pz + 35.1);
ferns.add(f);
}
G.add(ferns);
dkwShow("ferns", ferns, false);
var snow = new THREE.Group();
var sm = dkwMat("snow");
for (var j = 0; j < (lite ? 30 : 70); j++) {
var d = new THREE.Mesh(new THREE.SphereGeometry(2 + R() * 4, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), sm);
d.scale.y = 0.3;
d.position.set(px - 200 + R() * 260, 0.3, -70 + R() * 90);
snow.add(d);
}
for (j = 0; j < 14; j++) {
var ic = new THREE.Mesh(new THREE.ConeGeometry(0.4, 3 + R() * 3, 6), dkwShine(0xD8F0FF, 0.2, 0.2));
ic.position.set(px - 150 + R() * 200, 1.5, -60 + R() * 70);
snow.add(ic);
}
G.add(snow);
dkwShow("blizzard", snow, false);
})();
(function () {
var g = new THREE.Group();
g.position.set(-240, 0.3, -50);
G.add(g);
var gold = dkwShine(0xB89A4A, 0.4, 0.8), stone = dkwS("b:limestone", 0xD8CCB0, 3);
dkwBox(g, 40, 22, 30, stone, 0, 0, 0);
for (var k = -3; k <= 3; k++) {
dkwBox(g, 1.2, 22, 0.6, gold, k * 5, 0, 15.2);
}
dkwBox(g, 8, 30, 2, stone, 0, 0, 15.6);
var ap = new THREE.Mesh(new THREE.ConeGeometry(4, 8, 4), stone);
ap.position.set(0, 34, 15.6);
ap.rotation.y = Math.PI / 4;
g.add(ap);
dkcNeon(g, "MAJESTIC", 0, 24, 16.8, 0, 0xE8C86A, 3.2, { face: "Georgia" });
dkwBox(g, 22, 2.4, 5, dkwLam(0x1A1612), 0, 7, 18);
var mq = new THREE.Mesh(new THREE.PlaneGeometry(20, 1.4), dkwLam(0x2A241C));
mq.position.set(0, 8.2, 20.52);
g.add(mq);
dkwSolid(-240, -50, 40, 30, -1, 30, 0);
})();
dkwDoorTo(G, "dallas", 3, -240, -34.6, 0, "The doors of the Majestic", 20, 16, { col: 0x4A2A1A, frame: dkwShine(0xB89A4A, 0.4, 0.8) });
(function () {
var g = new THREE.Group();
g.position.set(260, 0.3, 150);
g.rotation.y = Math.PI;
G.add(g);
var st = dkwS("b:slate", 0x5A5660, 3);
dkwBox(g, 30, 20, 50, st, 0, 0, 0);
var rf = new THREE.Mesh(new THREE.ConeGeometry(22, 16, 4), st);
rf.rotation.y = Math.PI / 4;
rf.scale.z = 1.7;
rf.position.y = 28;
g.add(rf);
[-1, 1].forEach(function (k) { dkwBox(g, 9, 46, 9, st, k * 12, 0, 24); var sp = new THREE.Mesh(new THREE.ConeGeometry(6.4, 18, 4), st); sp.rotation.y = Math.PI / 4; sp.position.set(k * 12, 55, 24); g.add(sp); });
var rose = new THREE.Mesh(new THREE.CircleGeometry(4, 24), dkwGlowM(0x8A1A2A, 0.75));
rose.position.set(0, 14, 25.1);
g.add(rose);
dkwSolid(260, 150, 30, 60, -1, 40, 0);
})();
dkwDoorTo(G, "dallas", 4, 260, 124.6, Math.PI, "The great door of the old cathedral", 20, 20, { col: 0x2A1A14, frame: dkwS("b:slate", 0x5A5660, 3) });
for (var i = 0; i < (lite ? 14 : 30); i++) {
var cx = -800 + R() * 1600, lane = R() < 0.5 ? -4.5 : 4.5;
if (Math.abs(cx - 60) < 20)
continue;
dkcCar(G, cx, lane, lane < 0 ? Math.PI / 2 : -Math.PI / 2, [0x2A2A34, 0x8A1A2A, 0xE8E8EC, 0x1A3A6A, 0xE8C82A, 0x3A3A3A][i % 6], { hover: i % 5 === 0 ? 0x6AE8FF : 0 });
}
[[120, 6, "TAXI"]].forEach(function (t) { dkcCar(G, t[0], t[1], Math.PI / 2, 0xE8C82A, {}); dkcNeon(G, "TAXI", t[0], 1.8, t[1], Math.PI / 2, 0xFFE88A, 0.4, { face: "Arial" }); });
dkcHolo(G, "VERRIN · TOMORROW, CONTROLLED", 0, 28, -40, 0x6AE8FF, 16);
dkcHolo(G, "NOCTURNE REVELS · DOCKS", -180, 24, 40, 0xFF6AD8, 12);
dkcHolo(G, "DRINK NEON", 200, 26, -40, 0x9AFF6A, 10);
dkwCrowd(2077010, lite ? 14 : 34, -300, -14, 300, 14, { dress: "dkmod", wander: 16, ok: function (x, z) { return Math.abs(z) > 10; }, names: ["A trucker", "A night nurse", "A delivery rider", "A student", "A street musician", "A busker with a violin", "A man selling umbrellas", "A tired office worker"],
says: ["Best coffee in Dallas is at the Moonlight. Worst everything else, but best coffee.", "They say three blocks froze solid by the old park once. In Texas. In summer.", "Keep away from the docks at night. Things grow there that shouldn't.", "You see the lights on the Verrin tower? Never go off.", "Stand still and listen: the city hums like it's waiting for something.", "Rain's coming. Rain's always coming.", "Some folks at the diner don't eat. Just sip tea and watch.", "Long night. They're all long nights now."], persona: "city" });
},
function () {
return dkwCanvas("awenmapT", 512, 320, function (c, W, H) {
c.fillStyle = "#E8DCC0";
c.fillRect(0, 0, W, H);
var R = wRand(42);
c.fillStyle = "rgba(120,90,50,.12)";
for (var i = 0; i < 400; i++)
c.fillRect(R() * W, R() * H, 2, 2);
c.strokeStyle = "#5A3A1A";
c.lineWidth = 3;
c.strokeRect(8, 8, W - 16, H - 16);
var spot = function (x, y, n, col) { c.fillStyle = col || "#3A5A8A"; c.beginPath(); c.arc(x, y, 6, 0, 7); c.fill(); c.fillStyle = "#2A1A0A"; c.font = "italic 13px Georgia"; c.fillText(n, x + 9, y + 4); };
c.fillStyle = "rgba(90,140,200,.4)";
c.beginPath();
c.ellipse(150, 220, 60, 30, 0, 0, 7);
c.fill();
c.strokeStyle = "rgba(90,70,40,.6)";
c.lineWidth = 2;
for (i = 0; i < 5; i++) {
c.beginPath();
c.moveTo(300 + i * 30, 60);
c.lineTo(315 + i * 30, 30);
c.lineTo(330 + i * 30, 60);
c.stroke();
}
spot(150, 220, "Whispering Lake");
spot(110, 250, "Caldemora");
spot(250, 70, "Frostspire", "#8AB8E8");
spot(200, 140, "The Summer Court", "#6A9A3A");
spot(330, 110, "Eldrinwood", "#8A8AC8");
spot(400, 60, "White Mountain", "#8A6A4A");
spot(420, 190, "Razkanyr", "#C89A4A");
spot(460, 250, "Dragoon Mountain", "#A83A2A");
spot(300, 270, "Tyr-Narhul", "#6A4A8A");
spot(60, 120, "The Fire Lands", "#C84A1A");
c.font = "bold 22px Georgia";
c.fillStyle = "#3A1A0A";
c.fillText("AWEN", W / 2 - 30, 30);
});
},
function (G) {
var lite = dkwLite(), H = dkwDocksH, R = wRand(1313);
dkwBox(G, 1000, 0.6, 1600, dkwS("concrete", 0x55524E, 4), 240, 0, 0);
dkwWater(G, -760, 0, 1000, 1800, -0.4, 0x2A3A44, 0.92);
dkwBox(G, 1.2, 1.2, 1600, dkwS("concrete", 0x6A6660, 4), -260, 0, 0, 0, true);
for (var z = -700; z <= 700; z += 24) {
dkwCyl(G, 0.35, 0.4, 0.9, dkwMat("iron"), -258, 0.6, z, 8);
dkwRound(-258, z, 0.4);
}
dkwBox(G, 60, 0.6, 8, dkwMat("planks"), -290, 0.2, 40);
for (var x = -318; x <= -262; x += 6)
dkwCyl(G, 0.3, 0.3, 4, dkwMat("darkbark"), x, -3.6, 36, 6);
dkwFloor(-290, 40, 60, 8, 0.8);
[[-230, -200], [-230, 160], [-230, 380]].forEach(function (q) {
var g = new THREE.Group();
g.position.set(q[0], 0.6, q[1]);
G.add(g);
var M = dkwS("b:iron", 0xC8642A, 1.4);
[[-6, -6], [6, -6], [-6, 6], [6, 6]].forEach(function (p) { dkwBox(g, 1, 34, 1, M, p[0], 0, p[1]); });
dkwBox(g, 14, 2, 14, M, 0, 34, 0);
dkwBox(g, 60, 2.4, 3, M, -20, 38, 0);
dkwBox(g, 6, 5, 5, M, 6, 36, 0);
dkwSolid(q[0], q[1], 14, 14, -1, 40, 0);
});
var cols = [0xA83A2A, 0x2A5A8A, 0x3A7A4A, 0xC88A2A, 0x6A6A6A, 0x8A2A5A];
for (var i = 0; i < (lite ? 30 : 60); i++) {
var cx = -220 + (i % 10) * 14, cz = 180 + Math.floor(i / 10) * 30, st = Math.floor(R() * 3);
for (var s = 0; s <= st; s++)
dkwBox(G, 12, 2.6, 2.6, dkwS("b:iron", cols[(i + s) % 6], 1.6), cx, 0.6 + s * 2.6, cz + (s % 2) * 0.2);
dkwSolid(cx, cz, 12, 2.8, -1, 10, 0);
}
var whs = [[-60, -200, "9"], [40, -210, "11"], [150, -120, "13"], [260, -140, "14"], [-90, -90, "7"], [260, 20, "16"], [320, 140, "18"]];
whs.forEach(function (w, k) {
var g = new THREE.Group();
g.position.set(w[0], 0.6, w[1]);
G.add(g);
var M = dkwS("metalroof", k === 2 ? 0x5A4A40 : 0x8A8478, 3);
dkwBox(g, 60, 16, 40, M, 0, 0, 0);
var rf = new THREE.Mesh(new THREE.CylinderGeometry(30, 30, 40, 16, 1, false, 0, Math.PI), M);
rf.rotation.z = Math.PI / 2;
rf.rotation.y = Math.PI / 2;
rf.scale.set(1, 1, 0.25);
rf.position.y = 16;
g.add(rf);
dkwSign(g, "WAREHOUSE " + w[2], 8, 2, 0, 12, 20.1, 0, { bg: "#2A2A2A", ink: k === 2 ? "#C83A2A" : "#E8E0C8" });
for (var j = 0; j < 6; j++) {
var wn = new THREE.Mesh(new THREE.PlaneGeometry(4, 1.6), j % 3 ? dkwLam(0x1A1C1E) : dkwGlowM(0x6A8AAA, 0.25));
wn.position.set(-25 + j * 10, 10, 20.05);
g.add(wn);
}
dkwBox(g, 12, 9, 0.3, dkwS("b:iron", 0x5A5450, 1.4), 0, 0, 20.1);
dkwSolid(w[0], w[1], 60, 40, -1, 22, 0);
});
dkwDoorTo(G, "docks", 0, 150, -89.6, 0, "The door of Old Warehouse 13", 44, 48, { col: 0x3A2A24, frame: dkwS("b:iron", 0x4A4440, 1.4) });
var seal = dkcNeon(G, "✠", 150, 4.4, -89.2, 0, 0xC81A1A, 3.2);
dkwShow("seal", seal, true);
(function () {
var x = -160, z = -40, g = new THREE.Group();
g.position.set(x, 0.6, z);
G.add(g);
var M = dkwS("b:iron", 0x7A5A4A, 1.4);
[[-3, -3], [3, -3], [-3, 3], [3, 3]].forEach(function (p) { var l = dkwBox(g, 0.5, 22, 0.5, M, p[0], 0, p[1]); });
dkwCyl(g, 5, 5, 9, dkwS("b:planks", 0x6A5040, 2), 0, 22, 0, 18);
var cn = new THREE.Mesh(new THREE.ConeGeometry(5.6, 3, 18), M);
cn.position.y = 32.5;
g.add(cn);
for (var k = 0; k < 4; k++) {
var b = dkwBox(g, 8.4, 0.2, 0.2, M, 0, 8 + k * 4, (k % 2 ? 3 : -3));
b.rotation.z = k % 2 ? 0.5 : -0.5;
}
dkwSolid(x, z, 7, 7, -1, 40, 0);
dkcFlowers(G, dkwScatter(1314, lite ? 200 : 520, x - 40, z - 40, x + 40, z + 40, function (px, pz) { var r = Math.hypot(px - x, pz - z); return r > 4 && r < 40 - R() * 14; }, function () { return 0.62; }, 0.7, 1.5));
})();
dkwSpot(-160, -30, 6, "The wildflowers", "kneel among the flowers", function () { dkbSay("🌸 The petals shimmer with colours that have no names here. The locals avoid this place: something old in them knows the Veil is thin."); }, 0.6);
(function () { dkcShop(G, 120, 80, 40, 24, 12, { ry: Math.PI, sign: "NOCTURNE REVELS", neon: 0xB06AFF, wall: dkwS("brick", 0x4A2A3A, 1.6), glow: 0xB06AFF }); })();
dkwDoorTo(G, "docks", 1, 120, 67.7, Math.PI, "The door of the Nocturne Revels", 24, 18, { col: 0x1A0A1A, frame: dkwShine(0x6A3A8A, 0.3, 0.8) });
var ley = new THREE.Group();
[[[0, 110], [30, 60], [50, 20], [70, -20]], [[90, -50], [110, -80], [150, -95]]].forEach(function (seg, k) { dkwStrip(ley, seg, 0.5, function () { return 0.62; }, dkwGlowM(k ? 0xFF6A3A : 0x8AE8FF, 0.8), 0.02); });
G.add(ley);
dkwShow("ley", ley, false);
dkwPlant(G, "bush", dkwScatter(1315, lite ? 20 : 50, -240, -300, 400, 300, function (x, z) { return R() < 0.5; }, H, 0.4, 0.8), { col: 0x3A4A2A });
dkcLamps(G, [[0, 100, 0], [40, 40, 0], [80, -40, 0], [120, -70, 0], [-60, 60, 0], [-120, 0, 0], [200, 20, 0]], H, 0xFFC870);
dkwCrowd(1316, lite ? 6 : 14, -200, 20, 200, 160, { dress: "dkmod", wander: 14, names: ["A dock worker", "A fisherman", "A night watchman", "A couple out late"], says: ["Don't go near Thirteen. Nobody goes near Thirteen.", "The fish here glow sometimes. I don't eat 'em.", "My shift ends at dawn. I'll be glad of the light.", "We heard music from the old cannery. Revels, they call it."], persona: "city" });
},
function (G) {
var lite = dkwLite(), H = dkwCaldH, R = wRand(5001);
dkwTerrain(G, -1100, -1100, 2200, 2200, lite ? 24 : 14, H, dkwMat("grass"), function (x, z, y, c) { var n = dkwFbm(x * 0.02, z * 0.02, 3); if (y < 0.6)
c.setRGB(0.62 + n * 0.1, 0.58 + n * 0.1, 0.5);
else
c.setRGB(0.24 + n * 0.1, 0.34 + n * 0.12, 0.3 + n * 0.1); });
dkwWater(G, 0, -180, 700, 560, 0, 0x3A6A9A, 0.86);
dkcMoons(G);
for (var i = 0; i < (lite ? 10 : 22); i++) {
var a = R() * Math.PI * 2, r = 60 + R() * 190, x = Math.cos(a) * r / 0.8, z = -180 + Math.sin(a) * r;
if (Math.hypot(x * 0.8, z + 180) > 220)
continue;
dkcCrystal(G, x, -2, z, 6 + R() * 6, 0x8AE8FF, { n: 3, solid: false });
}
(function () {
var x = -120, z = -40, y = Math.max(0, H(x, z)), g = new THREE.Group();
g.position.set(x, 0, z);
G.add(g);
var W = dkwS("b:marble", 0xE8F0F4, 3, { shine: 60 });
dkwBox(g, 60, 2, 40, W, 0, -0.5, 0);
dkwBox(g, 44, 22, 30, W, 0, 1.5, -2);
var dome = new THREE.Mesh(new THREE.SphereGeometry(14, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), dkwM("tdome", function () { var m = new THREE.MeshPhongMaterial({ color: 0xBFE8FF, emissive: 0x2A5A7A, emissiveIntensity: 0.4, shininess: 120, transparent: true, opacity: 0.85 }); m.userData.noPhoto = 1; return m; }));
dome.position.y = 23.5;
g.add(dome);
[[-24, -16, 42], [24, -16, 42], [-24, 14, 34], [24, 14, 34], [0, -20, 58]].forEach(function (t) { dkcCrystal(g, t[0], 1.5, t[1], t[2], 0x9AD8FF, { n: 4, solid: false }); });
for (var k = 0; k < 8; k++)
dkwCyl(g, 0.9, 1, 14, W, -17.5 + k * 5, 1.5, 13.5, 12);
dkwBox(g, 40, 2, 4, W, 0, 15.5, 13.5);
var door = new THREE.Mesh(new THREE.PlaneGeometry(6, 9), dkwGlowM(0xD8F4FF, 0.6));
door.position.set(0, 6, 13.1);
g.add(door);
dkwSolid(x, z - 2, 44, 30, -5, 30, 0);
})();
dkwDoorTo(G, "caldemora", 0, -120, -26.4, 0, "The doors of the Water Temple", 36, 40, { col: 0xC8E8F4, frame: dkwS("b:marble", 0xE8F0F4, 3) });
var canals = [[[100, 120], [160, 150], [220, 150], [300, 180], [380, 170]], [[220, 150], [230, 220], [250, 300]]];
canals.forEach(function (c) { dkwStrip(G, c, 7, function (x, z) { return H(x, z) + 0.15; }, dkwGlowM(0x3AE8C8, 0.55), 0); });
var town = dkwScatter(5002, lite ? 24 : 56, 90, 170, 420, 360, function (x, z) { var near = false; canals.forEach(function (c) { if (dkwPathD(x, z, c) < 9)
near = true; }); Object.keys(DKW_AT).forEach(function (q) { var A = DKW_AT[q]; if (A && A.sc === "caldemora" && (A.y == null || A.y > -500) && Math.hypot(A.x - x, A.z - z) < 14)
near = true; }); return !near; }, H, 1, 1);
town.forEach(function (t, k) {
dkwHouse(G, t.x, t.z, 8 + R() * 5, 7 + R() * 4, 6 + Math.floor(R() * 3) * 3, { y: t.y, ry: Math.round(R() * 4) * Math.PI / 2, wall: dkwS("b:stucco", 0xF4F0E8, 3), roof: dkwS("b:terracotta", 0x7AAAC8, 1.6), shut: 0x2A6A8A, balcony: k % 3 === 0 });
if (k < 10)
dkwDoorTo(G, "caldemora", 2 + (k % 4), t.x, t.z + 5.5, 0, "The door of a house in Caldemora", 12, 10, { col: 0x2A6A8A, frame: dkwMat("white") });
});
for (i = 0; i < 6; i++) {
var bp = canals[0][1 + i % 3];
dkwBox(G, 3, 0.4, 9, dkwMat("white"), bp[0] + i * 4, H(bp[0], bp[1]) + 1, bp[1]);
dkwFloor(bp[0] + i * 4, bp[1], 3, 9, H(bp[0], bp[1]) + 1.4);
}
for (i = 0; i < 8; i++) {
var sx = 40 + R() * 60, sz = 20 + R() * 40;
var rk = new THREE.Mesh(new THREE.DodecahedronGeometry(2 + R() * 2, 0), dkwMat("rock"));
rk.position.set(sx, H(sx, sz) - 0.5, sz);
rk.scale.y = 0.5;
G.add(rk);
}
for (i = 0; i < 6; i++) {
var seal = dkwEll(G, dkwShine(0x3A3A40, 0.3, 0.2), 0.4, 0.35, 1.0, 50 + R() * 50, 0.1, 30 + R() * 40, 12);
seal.userData.kind = "float";
seal.userData.y0 = 0.05;
seal.userData.amp = 0.08;
seal.userData.f = 0.7;
seal.userData.ph = i;
DKW.bob.push(seal);
}
for (i = 0; i < (lite ? 10 : 20); i++) {
var mx = -340 + (i % 5) * 18, mz = 10 + Math.floor(i / 5) * 16, my = H(mx, mz);
dkwBox(G, 6, 0.9, 3, dkwMat("planks"), mx, my, mz);
var aw = dkwBox(G, 6.4, 0.1, 3.6, dkwLam([0xC83A3A, 0x3A8AC8, 0xE8C83A, 0x3AA86A][i % 4]), mx, my + 3, mz);
[-1, 1].forEach(function (k) { dkwBox(G, 0.12, 3, 0.12, dkwMat("oak"), mx + k * 2.9, my, mz + 1.6); });
dkwSolid(mx, mz, 6, 3, my - 1, my + 3, 0);
}
dkwPlant(G, "tree", dkwScatter(5003, lite ? 30 : 80, -900, 200, 900, 900, null, H, 1, 1.6), { col: 0x3A5A4A });
dkcAwenTrees(G, dkwScatter(5004, lite ? 14 : 30, -600, -20, -300, 300, null, H, 0.8, 1.2), { bark: 0xE8F0F8, leaf: 0x6ACFE8, glow: 0.3 });
dkwCrowd(5005, lite ? 10 : 24, 100, 150, 420, 340, { dress: "dktown", dressF: "dktownf", wander: 14, names: ["A fisherwoman", "A lamplighter of the canals", "A boatman", "A child chasing glowfish", "A merchant"], says: ["The algae glow brighter when the moons are full. Tonight they're all three full.", "Lady Marina keeps the temple. You can hear its song from the boats.", "Mind the bridges, they're slick with lake mist.", "The Selkies say the water is troubled.", "Pearls, fresh from the lake! Well. Nearly fresh."], persona: "awen" });
dkwCrowd(5006, lite ? 6 : 14, -360, 0, -260, 70, { dress: "dktown", dressF: "dktownf", wander: 8, names: ["A spice seller", "A weaver", "A smith's boy", "A seller of lake-pearls"], says: ["Saffron from the Fire Lands, if you can pay.", "Silk woven in Eldrinwood, softer than moonlight.", "My master forges hooks and blades both.", "Pearls from Whispering Lake. Each one sings, if you listen."], persona: "awen" });
},
function (G) {
var lite = dkwLite(), H = dkwFrostH, R = wRand(6006), ice = dkwM("icewall", function () { var m = new THREE.MeshPhongMaterial({ color: 0xCFE8F8, emissive: 0x2A5A7A, emissiveIntensity: 0.18, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.92 }); m.userData.noPhoto = 1; return m; });
dkwTerrain(G, -1000, -1000, 2000, 2000, lite ? 24 : 12, H, dkwMat("snow"), function (x, z, y, c) { var n = dkwFbm(x * 0.03, z * 0.03, 3); c.setRGB(0.68 + n * 0.12, 0.74 + n * 0.1, 0.86 + n * 0.06); });
dkcMoons(G, { n: 2 });
dkwPlant(G, "conifer", dkwScatter(6007, lite ? 60 : 160, -900, 120, 900, 900, function (x, z) { return Math.abs(x) > 30 || z > 420; }, H, 0.9, 1.5), { col: 0xD8E8F0 });
dkcAwenTrees(G, dkwScatter(6008, lite ? 16 : 40, -400, 150, 400, 500, function (x, z) { return Math.abs(x) > 24; }, H, 0.7, 1.1), { bark: 0xF0F4F8, leaf: 0xE0F0FF, glow: 0.2 });
dkwBox(G, 60, 0.4, 50, dkwS("b:limestone", 0xE8ECF0, 4), 0, H(0, 80), 80);
var fnt = dkcCrystal(G, 0, H(0, 80) + 0.4, 80, 7, 0xBFE8FF, { n: 5 });
dkwCyl(G, 4, 4.4, 0.8, dkwS("b:marble", 0xE8F0F4, 3), 0, H(0, 80), 80, 20);
var houses = [];
for (var i = 0; i < (lite ? 14 : 26); i++) {
var a = i / 26 * Math.PI * 2, r = 46 + R() * 40;
houses.push([Math.cos(a) * r * 1.2, 80 + Math.sin(a) * r]);
}
houses.forEach(function (q, k) {
if (Math.abs(q[0]) < 10 && q[1] < 60)
return;
if (q[0] < -40 && Math.abs(q[1] - 60) < 20)
return;
var ry = Math.atan2(-q[0], 80 - q[1]);
dkwHouse(G, q[0], q[1], 9 + R() * 4, 8, 6 + Math.floor(R() * 2) * 3, { y: H(q[0], q[1]), ry: ry, wall: dkwS("b:stucco", 0xF0F4F8, 3), roof: dkwS("b:slate", 0x8AB0D8, 2), shut: 0x3A6A9A });
if (k < 12)
dkwDoorTo(G, "frostspire", 7 + (k % 2), q[0] + Math.sin(ry) * 4.2, q[1] + Math.cos(ry) * 4.2, ry, "The door of a house in Frostspire", 12, 10, { col: 0x3A6A9A, frame: dkwMat("white"), y: H(q[0], q[1]) });
});
(function () {
var x = -60, z = 40, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
dkwBox(g, 22, 16, 34, ice, 0, 0, -6);
var rf = new THREE.Mesh(new THREE.ConeGeometry(16, 14, 4), ice);
rf.rotation.y = Math.PI / 4;
rf.scale.z = 1.6;
rf.position.set(0, 22, -6);
g.add(rf);
[-1, 1].forEach(function (k) { dkcCrystal(g, k * 8, 0, 10, 32, 0xBFE8FF, { n: 3, solid: false }); });
dkcCrystal(g, 0, 14, -14, 26, 0xD8F0FF, { n: 3, solid: false });
var rose = new THREE.Mesh(new THREE.CircleGeometry(3.4, 24), dkwGlowM(0xBFE8FF, 0.7));
rose.position.set(0, 11, 11.05);
g.add(rose);
dkwSolid(x, z - 6, 22, 34, y - 1, y + 30, 0);
})();
dkwDoorTo(G, "frostspire", 6, -60, 51.2, 0, "The doors of the ice cathedral", 24, 32, { col: 0xBFE0F4, frame: ice, y: H(-60, 51) });
dkwStrip(G, [[0, 40], [0, -20], [0, -110]], 7, function (x, z) { return H(x, z) + 0.05; }, dkwS("b:limestone", 0xE0E8F0, 4), 0.08);
(function () {
var x = 0, z = -150, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
dkwBox(g, 70, 24, 40, ice, 0, 0, 0);
dkwBox(g, 74, 2, 44, dkwM("icetrim", function () { var m = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, emissive: 0x8AC8F0, emissiveIntensity: 0.3, shininess: 140 }); m.userData.noPhoto = 1; return m; }), 0, 24, 0);
[[-36, -20, 70], [36, -20, 70], [-36, 20, 56], [36, 20, 56], [0, -10, 110], [-18, 0, 84], [18, 0, 84]].forEach(function (t) { dkwCyl(g, 5, 6, t[2] * 0.7, ice, t[0], 0, t[1], 10); var sp = new THREE.Mesh(new THREE.ConeGeometry(6, t[2] * 0.4, 10), ice); sp.position.set(t[0], t[2] * 0.7 + t[2] * 0.2, t[1]); g.add(sp); dkcCrystal(g, t[0], t[2] * 0.9, t[1], t[2] * 0.15, 0xE8F8FF, { n: 2, solid: false }); });
var gate = new THREE.Mesh(new THREE.PlaneGeometry(10, 14), dkwGlowM(0xD8F0FF, 0.55));
gate.position.set(0, 7, 20.1);
g.add(gate);
dkwSolid(x, z, 74, 44, y - 2, y + 40, 0);
})();
dkwDoorTo(G, "frostspire", 1, 0, -128.6, 0, "The carved doors of the palace", 34, 32, { col: 0xD8ECF8, frame: ice, y: H(0, -128) });
(function () {
var x = 70, z = -90, y = H(x, z);
var gl = new THREE.Mesh(new THREE.DodecahedronGeometry(30, 1), ice);
gl.scale.set(1.2, 0.6, 1);
gl.position.set(x, y, z - 16);
G.add(gl);
var arch = new THREE.Mesh(new THREE.TorusGeometry(5, 1.2, 8, 20, Math.PI), ice);
arch.position.set(x, y, z + 8);
G.add(arch);
dkcRune(G, x - 7, z + 9, 4, 0x8AE8FF, 0, { y: y });
dkcRune(G, x + 7, z + 9, 4, 0x8AE8FF, 0, { y: y });
dkwSolid(x, z - 16, 60, 50, y - 2, y + 30, 0);
})();
dkwDoorTo(G, "frostspire", 0, 70, -81, 0, "The gate of the Bastion", 30, 30, { col: 0xBFE0F4, frame: ice, y: H(70, -81) });
for (i = 0; i < 4; i++) {
var gx = [-14, 14, 60, 80][i], gz = [-120, -120, -72, -72][i];
var gg = new THREE.Group();
gg.position.set(gx, H(gx, gz), gz);
dkxGolem(gg, 0xCFE6F6, true);
gg.rotation.y = 0;
G.add(gg);
dkwRound(gx, gz, 1.4);
}
dkcMotes(G, lite ? 300 : 900, 0, 100, 400, 0, 60, 0xFFFFFF);
dkwCrowd(6009, lite ? 10 : 22, -40, 60, 40, 110, { dress: "dktown", dressF: "dktownf", wander: 12, skin: 0xF0E8E8, names: ["A baker of Frostspire", "An ice-carver", "A sledge driver", "A girl with skates", "A watchman"], says: ["Bread? Warm from the oven, the only warm thing in Frostspire!", "Lord Kael's grandfather carved the fountain. Still hasn't melted.", "Mind the path up to the palace: it's polished by the wind.", "The lake by the cathedral freezes so clear you can see the fish asleep.", "Prince Jayke used to sneak down here for honey-cakes."], persona: "frost" });
},
function (w, h, d) {
return dkwGeo("boxM" + w + "|" + h + "|" + d, function () {
var g = new THREE.BoxGeometry(w, h, d);
g.translate(0, h / 2, 0);
var p = g.attributes.position, n = g.attributes.normal, uv = g.attributes.uv;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), nx = Math.abs(n.getX(i)), ny = Math.abs(n.getY(i));
if (ny > 0.5)
uv.setXY(i, 0, 0);
else if (nx > 0.5)
uv.setXY(i, z + d / 2, y);
else
uv.setXY(i, x + w / 2, y);
}
uv.needsUpdate = true;
return g;
});
},
function (v) {
return dkwCanvas("brickwin" + v, 256, 256, function (c, W, H) {
var R = wRand(907 + v * 13), base = ["#5A2E24", "#4A3A30", "#6A5A48", "#3A3438"][v % 4];
c.fillStyle = base;
c.fillRect(0, 0, W, H);
c.globalAlpha = 0.18;
for (var y = 0; y < H; y += 6) {
c.fillStyle = y % 12 ? "#000" : "#FFF";
c.fillRect(0, y, W, 1);
}
c.globalAlpha = 1;
var cols = 6, rows = 8, cw = W / cols, rh = H / rows;
for (var i = 0; i < cols; i++)
for (var j = 0; j < rows; j++) {
var lit = R() < 0.38, hue = R();
c.fillStyle = "#2A2420";
c.fillRect(i * cw + 7, j * rh + 5, cw - 14, rh - 9);
c.fillStyle = lit ? (hue < 0.7 ? "rgba(255,214,150,.9)" : hue < 0.9 ? "rgba(160,210,255,.8)" : "rgba(255,120,190,.8)") : "rgba(40,50,70,.9)";
c.fillRect(i * cw + 9, j * rh + 7, cw - 18, rh - 13);
}
});
},
function (G, H, o) {
var R = wRand(o.seed || 2077777), sc = o.sc, XS = o.XS, ZS = o.ZS, kinds = o.kinds || DKC_KINDS, keep = o.keep || [], rooms = o.rooms, lite = dkwLite();
var paths = o.paths || [];
var clear = function (x, z, w, d) {
var hd = Math.hypot(w, d) / 2;
for (var k = 0; k < paths.length; k++) {
var pp = paths[k];
if (Math.hypot(x - pp[0], z - pp[1]) < pp[2] + hd)
return false;
}
for (k = 0; k < keep.length; k++) {
var q = keep[k];
if (Math.abs(x - q[0]) < q[2] + w / 2 + 4 && Math.abs(z - q[1]) < q[3] + d / 2 + 4)
return false;
}
var pts = [[0, 0], [-w / 2, -d / 2], [w / 2, -d / 2], [-w / 2, d / 2], [w / 2, d / 2], [0, -d / 2], [0, d / 2], [-w / 2, 0], [w / 2, 0]];
for (k = 0; k < pts.length; k++)
if (dkwSolidAt(x + pts[k][0], z + pts[k][1], H(x, z) + 0.5))
return false;
return true;
};
var lots = {}, add = function (kind, mat, x, z, ry) { var key = kind + "|" + mat; (lots[key] = lots[key] || []).push({ x: x, z: z, y: H(x, z), ry: ry }); };
var roofs = { tank: [], ac: [], mast: [], beacon: [] }, fronts = [[], [], [], []], doors = [], nDoor = 0, nB = o.nB || 4;
var place = function (x, z, face, big) {
var ki = big ? nB + Math.floor(R() * (kinds.length - nB)) : (R() < 0.7 ? Math.floor(R() * nB) : Math.min(kinds.length - 1, nB + Math.floor(R() * 2))), K = kinds[ki], rot = Math.abs(Math.sin(face)) > 0.5;
var fw = rot ? K.d : K.w, fd = rot ? K.w : K.d;
if (!clear(x, z, fw, fd))
return false;
var mat = K.m || (K.b ? "b" + Math.floor(R() * 4) : "g" + Math.floor(R() * 4));
add(ki, mat, x, z, face);
dkwSolid(x, z, fw, fd, H(x, z) - 1, H(x, z) + K.h + 2, 0);
var top = H(x, z) + K.h;
if (K.b) {
if (R() < (K.tank == null ? 0.6 : K.tank))
roofs.tank.push({ x: x + (R() - 0.5) * K.w * 0.4, z: z + (R() - 0.5) * K.d * 0.4, y: top });
for (var a = 0; a < 2; a++)
roofs.ac.push({ x: x + (R() - 0.5) * K.w * 0.6, z: z + (R() - 0.5) * K.d * 0.6, y: top, ry: R() * 3 });
}
else {
if (K.h > 90) {
roofs.mast.push({ x: x, z: z, y: top });
roofs.beacon.push({ x: x, z: z, y: top + 18 });
}
else
roofs.ac.push({ x: x, z: z, y: top, ry: face });
}
var fx = Math.sin(face), fz = Math.cos(face), half = K.d / 2;
if (!big && !K.dark) {
fronts[Math.floor(R() * 4)].push({ x: x + fx * (half + 0.05), z: z + fz * (half + 0.05), y: H(x, z) + 1.6, ry: face, sx: K.w * 0.8 });
}
doors.push({ x: x + fx * (half + 0.08), z: z + fz * (half + 0.08), y: H(x, z), ry: face, room: rooms[nDoor++ % rooms.length], name: K.n || (K.b ? (R() < 0.5 ? "an old walk-up" : "a shopfront") : (K.h > 90 ? "a tower" : "an office block")) });
return true;
};
for (var i = 0; i < XS.length - 1; i++)
for (var j = 0; j < ZS.length - 1; j++) {
var x0 = XS[i] + 20, x1 = XS[i + 1] - 20, z0 = ZS[j] + 20, z1 = ZS[j + 1] - 20;
if (x1 - x0 < 30 || z1 - z0 < 30)
continue;
var st = o.step || 34;
for (var x = x0 + 14; x < x1 - 10; x += st) {
place(x, z0 + 12, Math.PI);
place(x, z1 - 12, 0);
}
for (var z = z0 + 40; z < z1 - 36; z += st) {
place(x0 + 12, z, -Math.PI / 2);
place(x1 - 12, z, Math.PI / 2);
}
if (o.middle !== false)
place((x0 + x1) / 2, (z0 + z1) / 2, R() < 0.5 ? 0 : Math.PI, true);
}
for (var key in lots) {
var p = key.split("|"), K = kinds[+p[0]], m = p[1][0] === "b" ? dkcBrickM(+p[1][1]) : p[1][0] === "w" ? dkcShedM(+p[1][1]) : dkcGlassM(+p[1][1]);
dkwInst(G, dkcBoxM(K.w, K.h, K.d), m, lots[key]);
}
dkwInst(G, dkwGeo("rtank", function () { var g = new THREE.CylinderGeometry(1.6, 1.6, 3, 10); g.translate(0, 4.2, 0); return g; }), dkwLam(0x5A4030), roofs.tank);
dkwInst(G, dkwGeo("rtankleg", function () { var g = new THREE.BoxGeometry(2.6, 2.7, 2.6); g.translate(0, 1.35, 0); return g; }), dkwLam(0x2A2A2A), roofs.tank);
dkwInst(G, dkwGeo("rac", function () { var g = new THREE.BoxGeometry(2.4, 1.2, 1.6); g.translate(0, 0.6, 0); return g; }), dkwShine(0x8A8E94, 0.3, 0.6), roofs.ac);
dkwInst(G, dkwGeo("rmast", function () { var g = new THREE.CylinderGeometry(0.15, 0.4, 18, 6); g.translate(0, 9, 0); return g; }), dkwShine(0x9A9EA4, 0.3, 0.7), roofs.mast);
dkwInst(G, dkwGeo("rbeacon", function () { return new THREE.SphereGeometry(0.7, 8, 6); }), dkwGlowM(0xFF2A2A, 0.95), roofs.beacon, { cull: false });
[0xFF6AD8, 0x6AE8FF, 0xFFC86A, 0x9AFF6A].forEach(function (col, k) { dkwInst(G, dkwGeo("sfront", function () { return new THREE.PlaneGeometry(1, 2.6); }), dkwGlowM(col, 0.6), fronts[k]); });
dkwInst(G, dkwGeo("cdoor", function () { var g = new THREE.BoxGeometry(1.5, 2.5, 0.14); g.translate(0, 1.25, 0); return g; }), dkwShine(0x1A1A22, 0.3, 0.8), doors);
dkwInst(G, dkwGeo("cdoorlamp", function () { var g = new THREE.BoxGeometry(0.5, 0.12, 0.3); g.translate(0, 2.85, 0.2); return g; }), dkwGlowM(0xFFE8B0, 0.9), doors);
doors.forEach(function (D) {
var fx = D.x + Math.sin(D.ry) * 1.6, fz = D.z + Math.cos(D.ry) * 1.6, A = dkwInAt(sc, D.room);
dkwSpot(fx, fz, 1.7, "The door of " + D.name, "go in", function () {
(DKW.back || (DKW.back = {}))[sc + D.room] = { x: fx, z: fz, ry: D.ry + Math.PI };
DKW.lastBack = { sc: sc, x: fx, z: fz, ry: D.ry + Math.PI };
dkwGo({ sc: sc, x: A.x, z: A.z + 3, y: DKW_IN_Y, ry: 0 }, "🚪 <b>" + D.name.charAt(0).toUpperCase() + D.name.slice(1) + "</b>", typeof dkbPopulate === "function" ? dkbPopulate : null);
}, D.y);
});
return { doors: doors.length };
},
function (v) {
return dkwM("shedM" + v, function () {
var t = dkwCanvas("shed" + v, 256, 256, function (c, W, Hh) {
var R = wRand(55 + v), base = ["#7A7468", "#5A6268", "#8A6A4A", "#4A5A4A"][v % 4];
c.fillStyle = base;
c.fillRect(0, 0, W, Hh);
for (var x = 0; x < W; x += 8) {
c.fillStyle = "rgba(0,0,0,.18)";
c.fillRect(x, 0, 3, Hh);
c.fillStyle = "rgba(255,255,255,.06)";
c.fillRect(x + 4, 0, 2, Hh);
}
c.fillStyle = "rgba(90,50,30,.25)";
for (var k = 0; k < 30; k++)
c.fillRect(R() * W, R() * Hh, 2 + R() * 6, 10 + R() * 40);
for (k = 0; k < 4; k++) {
c.fillStyle = R() < 0.3 ? "rgba(255,210,140,.8)" : "#1A1C1E";
c.fillRect(20 + k * 60, 30, 36, 18);
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / 30, 1 / 30);
var m = new THREE.MeshLambertMaterial({ map: t, emissive: 0xFFFFFF, emissiveMap: t, emissiveIntensity: 0.12 });
m.userData.noPhoto = 1;
return m;
});
},
function (G, H, o) {
var R = wRand(o.seed || 5), x0 = o.x0, z0 = o.z0, x1 = o.x1, z1 = o.z1, n = o.n || 200, paths = o.paths || [], lite = dkwLite();
if (lite)
n = Math.round(n * 0.5);
var ok = function (x, z, r) { for (var k = 0; k < paths.length; k++) {
var p = paths[k];
if (Math.hypot(x - p[0], z - p[1]) < p[2] + r)
return false;
} return !dkwSolidAt(x, z, H(x, z) + 0.5); };
var crate = [], pallet = [], drum = [], puddle = [], fence = [], steam = [];
for (var i = 0; i < n; i++) {
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), y = H(x, z), t = R();
if (t < 0.3) {
if (!ok(x, z, 3))
continue;
var st = 1 + Math.floor(R() * 3);
for (var s = 0; s < st; s++)
crate.push({ x: x + (R() - 0.5) * 0.3, z: z + (R() - 0.5) * 0.3, y: y + s * 1.4, ry: R() * 0.4 });
dkwSolid(x, z, 1.8, 1.8, y - 1, y + st * 1.4, 0);
}
else if (t < 0.45) {
if (!ok(x, z, 2))
continue;
for (s = 0; s < 1 + Math.floor(R() * 4); s++)
pallet.push({ x: x, z: z, y: y + s * 0.16, ry: R() * 0.3 });
}
else if (t < 0.62) {
if (!ok(x, z, 2))
continue;
for (s = 0; s < 2 + Math.floor(R() * 4); s++) {
var dx = (R() - 0.5) * 2.4, dz = (R() - 0.5) * 2.4;
drum.push({ x: x + dx, z: z + dz, y: y });
dkwRound(x + dx, z + dz, 0.35, y - 1, y + 1.1);
}
}
else if (t < 0.84) {
puddle.push({ x: x, z: z, y: y + 0.03, ry: R() * 3, sx: 1 + R() * 3, sz: 0.6 + R() * 1.6 });
}
else if (t < 0.94) {
if (!ok(x, z, 5))
continue;
var a = R() < 0.5 ? 0 : Math.PI / 2;
fence.push({ x: x, z: z, y: y, ry: a });
dkwSolid(x, z, a ? 0.2 : 8, a ? 8 : 0.2, y - 1, y + 2.4, 0);
}
else
steam.push([x, y, z]);
}
dkwInst(G, dkwGeo("crate", function () { var g = new THREE.BoxGeometry(1.4, 1.4, 1.4); g.translate(0, 0.7, 0); return g; }), dkwS("b:planks", 0x8A6A40, 1.2), crate);
dkwInst(G, dkwGeo("pallet", function () { var g = new THREE.BoxGeometry(1.2, 0.15, 1.0); g.translate(0, 0.075, 0); return g; }), dkwS("b:planks", 0x9A7A50, 1.2), pallet);
dkwInst(G, dkwGeo("drum", function () { var g = new THREE.CylinderGeometry(0.32, 0.32, 0.95, 12); g.translate(0, 0.48, 0); return g; }), dkwShine([0x2A4A8A, 0x8A2A1A, 0x3A5A2A][o.seed % 3], 0.3, 0.6), drum);
dkwInst(G, dkwGeo("puddle", function () { var g = new THREE.CircleGeometry(1, 18); g.rotateX(-Math.PI / 2); return g; }), dkwM("puddleM", function () { var m = new THREE.MeshPhongMaterial({ color: 0x0A0A12, shininess: 160, specular: 0xD8A8FF, transparent: true, opacity: 0.75, depthWrite: false }); m.userData.noPhoto = 1; return m; }), puddle, { cull: false });
dkwInst(G, dkwGeo("chainlink", function () { var g = new THREE.PlaneGeometry(8, 2.4); g.translate(0, 1.2, 0); return g; }), dkwM("chainM", function () {
var t = dkwCanvas("chain", 128, 128, function (c, W, Hh) { c.clearRect(0, 0, W, Hh); c.strokeStyle = "rgba(170,175,180,.85)"; c.lineWidth = 2; for (var k = -W; k < W * 2; k += 12) {
c.beginPath();
c.moveTo(k, 0);
c.lineTo(k + Hh, Hh);
c.stroke();
c.beginPath();
c.moveTo(k + Hh, 0);
c.lineTo(k, Hh);
c.stroke();
} });
t.repeat.set(4, 1.2);
var m = new THREE.MeshLambertMaterial({ map: t, transparent: true, alphaTest: 0.3, side: THREE.DoubleSide });
return m;
}), fence);
if (!lite && typeof dkwSmoke === "function")
steam.slice(0, 12).forEach(function (q) { try {
dkwSmoke(G, q[0], q[1], q[2], 0xB8B0C8, 3);
}
catch (e) { } });
},
function () {
var A = DKW_AT, P = [], way = [[0, 120], [-40, 40], [0, 60], [120, 60], [60, 90], [0, 110], [30, 60], [50, 20], [70, -20], [90, -50], [110, -80], [150, -95], [150, -110]];
for (var i = 0; i < way.length - 1; i++) {
var a = way[i], b = way[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
for (var s = 0; s <= L; s += 6) {
var t = L ? s / L : 0;
P.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, 10]);
}
}
["kTaxi", "kPier", "kTower", "kRevels", "kLine1", "kLine2", "kLine3", "kW13"].forEach(function (k) { if (A[k])
P.push([A[k].x, A[k].z, 16]); });
return P;
},
function (P, x, y, z, w, h, ry, col) {
var t = dkwCanvas("aurora_" + col, 256, 128, function (c, W, H) {
c.clearRect(0, 0, W, H);
var cs = "#" + ("000000" + col.toString(16)).slice(-6);
for (var i = 0; i < W; i += 2) {
var a = 0.25 + 0.35 * Math.abs(Math.sin(i * 0.05)) + 0.2 * Math.sin(i * 0.013);
var g = c.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "rgba(0,0,0,0)");
g.addColorStop(0.35, cs);
g.addColorStop(1, "rgba(0,0,0,0)");
c.globalAlpha = Math.max(0.05, a);
c.fillStyle = g;
c.fillRect(i, 0, 2, H);
}
c.globalAlpha = 1;
});
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h, 24, 1), dkwM("auroraM" + col, function () { var mm = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.6, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, fog: false }); mm.userData.noPhoto = 1; return mm; }));
var pa = m.geometry.attributes.position;
for (var i = 0; i < pa.count; i++)
pa.setZ(i, Math.sin(pa.getX(i) * 0.004) * w * 0.08);
m.position.set(x, y, z);
m.rotation.y = ry || 0;
P.add(m);
m.userData.kind = "float";
m.userData.y0 = y;
m.userData.amp = 6;
m.userData.f = 0.03;
m.userData.ph = x * 0.01;
DKW.bob.push(m);
return m;
},
function () {
return dkwM("jewelbark", function () {
var t = dkwCanvas("jewelbarkT", 256, 512, function (c, W, H) {
c.fillStyle = "#3A2A3A";
c.fillRect(0, 0, W, H);
var cols = ["#8A4AE8", "#4AC8E8", "#E8C84A", "#4AE88A", "#E84A8A", "#4A6AE8"];
for (var k = 0; k < 46; k++) {
c.strokeStyle = cols[k % cols.length];
c.globalAlpha = 0.35 + 0.4 * ((k * 37) % 10) / 10;
c.lineWidth = 4 + (k % 5) * 3;
c.beginPath();
var y0 = (k * 41) % H;
c.moveTo(0, y0);
c.bezierCurveTo(W * 0.3, y0 - 60, W * 0.7, y0 - 120, W, y0 - 170);
c.stroke();
}
c.globalAlpha = 1;
c.strokeStyle = "rgba(20,10,20,.55)";
c.lineWidth = 2;
for (k = 0; k < 70; k++) {
var x = (k * 53) % W;
c.beginPath();
c.moveTo(x, 0);
c.lineTo(x + ((k % 7) - 3) * 6, H);
c.stroke();
}
});
t.repeat.set(4, 3);
var m = new THREE.MeshPhongMaterial({ map: t, emissive: 0x2A1A3A, emissiveMap: t, emissiveIntensity: 0.55, shininess: 60, specular: 0x8A8AAA });
m.userData.noPhoto = 1;
return m;
});
},
function (P, x, y, z, s, hgt) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var bark = dkcJewelBark(), lite = dkwLite();
var tr = new THREE.Mesh(new THREE.CylinderGeometry(4.2 * s, 5.4 * s, hgt, 24, 12), bark);
var pa = tr.geometry.attributes.position;
for (var i = 0; i < pa.count; i++) {
var px = pa.getX(i), py = pa.getY(i), pz = pa.getZ(i), a = Math.atan2(pz, px) + py * 0.06, r = Math.hypot(px, pz) * (1 + 0.08 * Math.sin(a * 6));
pa.setXYZ(i, Math.cos(a) * r, py, Math.sin(a) * r);
}
tr.geometry.computeVertexNormals();
tr.position.y = hgt / 2;
g.add(tr);
for (var k = 0; k < 9; k++) {
var a = k / 9 * Math.PI * 2, L = 7 * s + (k % 3) * 2;
g.add(new THREE.Mesh(dkwTaper([[Math.cos(a) * 4 * s, 2.4, Math.sin(a) * 4 * s], [Math.cos(a) * (4 * s + L * 0.5), 0.6, Math.sin(a) * (4 * s + L * 0.5)], [Math.cos(a) * (4 * s + L), -0.2, Math.sin(a) * (4 * s + L)]], [1.1 * s, 0.6 * s, 0.2 * s], 10, 6), bark));
}
for (k = 0; k < 6; k++) {
var b = k / 6 * Math.PI * 2 + 0.4, by = hgt * 0.62 + (k % 3) * 2.5;
g.add(new THREE.Mesh(dkwTaper([[Math.cos(b) * 3.5 * s, by, Math.sin(b) * 3.5 * s], [Math.cos(b) * 9 * s, by + 4, Math.sin(b) * 9 * s], [Math.cos(b) * 14 * s, by + 5, Math.sin(b) * 14 * s]], [0.9 * s, 0.5 * s, 0.2 * s], 10, 6), bark));
}
var leaf = dkwM("heartleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0xE8D88A, emissive: 0xE8C85A, emissiveIntensity: 0.7, map: dkwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; });
var cr = [], R = wRand(901);
for (k = 0; k < (lite ? 10 : 22); k++) {
var c = new THREE.IcosahedronGeometry(2.4 * s + R() * 2 * s, 1);
var ca = R() * 6.28, cd = 4 * s + R() * 10 * s;
c.translate(Math.cos(ca) * cd, hgt * 0.66 + R() * hgt * 0.3, Math.sin(ca) * cd);
cr.push(c.index ? c.toNonIndexed() : c);
}
g.add(new THREE.Mesh(dkwMerge(cr), leaf));
dkcMotes(g, lite ? 60 : 180, 0, 0, 16 * s, hgt * 0.3, hgt, 0xFFE88A);
if (!lite) {
var L = new THREE.PointLight(0xFFE0A0, 1.0, 60 * s, 2);
L.position.y = hgt * 0.5;
g.add(L);
}
return g;
},
function (G) {
var lite = dkwLite(), H = dkwSummerH, R = wRand(9009);
dkwTerrain(G, -900, -900, 1800, 1800, lite ? 24 : 12, H, dkwMat("lawn"), function (x, z, y, c) { var n = dkwFbm(x * 0.02, z * 0.02, 3), w = x < -300 ? 1 : 0; c.setRGB(0.24 + n * 0.14 - w * 0.06, 0.42 + n * 0.14 - w * 0.08, 0.22 + n * 0.1 - w * 0.04); });
dkcMoons(G, { n: 3 });
[[-300, 260, -700, 900, 220, 0.2, 0xE8203A], [200, 300, -800, 800, 180, -0.1, 0xC81A4A], [500, 240, -500, 700, 200, -0.6, 0xFF3A2A], [-600, 280, -300, 700, 200, 0.9, 0xB81A3A]].forEach(function (a) { dkcAurora(G, a[0], a[1], a[2], a[3], a[4], a[5], a[6]); });
dkcFlowers(G, dkwScatter(9010, lite ? 400 : 1400, -300, -300, 300, 600, function (x, z) { return Math.hypot(x, z + 120) > 70 && Math.abs(x) > 5; }, function (x, z) { return H(x, z) + 0.25; }, 0.3, 0.6), [0xFF8AB8, 0xFFE88A, 0xB88AFF, 0xFFFFFF, 0x8AD8FF]);
dkwStrip(G, [[0, 320], [0, 150], [0, -40]], 8, function (x, z) { return H(x, z) + 0.06; }, dkwS("b:limestone", 0xF0E8F0, 4), 0.08);
dkwStrip(G, [[0, 40], [80, 10], [160, -30], [205, -44]], 4, function (x, z) { return H(x, z) + 0.06; }, dkwS("b:limestone", 0xE8E0E8, 4), 0.08);
dkwStrip(G, [[0, 80], [-160, 90], [-320, 110], [-460, 120]], 3.4, function (x, z) { return H(x, z) + 0.06; }, dkwMat("gravel"), 0.06);
(function () {
var x = 0, z = -120, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var cry = dkwM("summercrystal", function () { var m = new THREE.MeshPhongMaterial({ color: 0xF0D8F0, emissive: 0x8A4A7A, emissiveIntensity: 0.25, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.9 }); m.userData.noPhoto = 1; return m; });
var wood = dkwS("b:oak", 0x8A6A4A, 2);
dkwBox(g, 80, 22, 60, cry, 0, 0, 0);
dkwBox(g, 84, 1.6, 64, dkwShine(0xE8C87A, 0.3, 0.7), 0, 22, 0);
[[-40, -30, 70], [40, -30, 64], [-40, 30, 52], [40, 30, 56], [0, -20, 120], [-22, 6, 86], [22, 6, 90], [0, 24, 66]].forEach(function (t, i) {
dkwCyl(g, 5, 6.5, t[2] * 0.72, cry, t[0], 0, t[1], 12);
var sp = new THREE.Mesh(new THREE.ConeGeometry(6.8, t[2] * 0.42, 12), cry);
sp.position.set(t[0], t[2] * 0.72 + t[2] * 0.21, t[1]);
sp.rotation.y = i * 0.4;
g.add(sp);
dkcCrystal(g, t[0], t[2] * 0.93, t[1], t[2] * 0.12, 0xFFD8F0, { n: 2, solid: false });
});
for (var k = 0; k < 10; k++) {
var a = k / 10 * Math.PI, ax = -36 + k * 8;
g.add(new THREE.Mesh(dkwTaper([[ax, 0, 31], [ax + 2, 12, 34], [ax + 4, 22, 31], [ax + 6, 30, 26]], [0.9, 0.7, 0.5, 0.25], 10, 6), wood));
}
for (k = 0; k < 16; k++) {
var bf = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.8, 10, 1, true), dkwM("bellflower", function () { var m = new THREE.MeshLambertMaterial({ color: 0xC88AE8, emissive: 0x6A2A8A, emissiveIntensity: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
bf.position.set(-38 + k * 5, 20, 31.5);
bf.rotation.x = Math.PI;
g.add(bf);
}
var gate = new THREE.Mesh(new THREE.PlaneGeometry(12, 16), dkwGlowM(0xFFD8F0, 0.55));
gate.position.set(0, 8, 30.1);
g.add(gate);
dkwSolid(x, z, 84, 64, y - 2, y + 60, 0);
})();
dkwDoorTo(G, "summer", 0, 0, -88.6, 0, "The doors of the Everchanging Palace", 60, 50, { col: 0xF0D8F0, frame: dkwShine(0xE8C87A, 0.3, 0.7), y: H(0, -88) });
dkwDoorTo(G, "summer", 1, 30, -88.6, 0, "A stair up to the highest window", 14, 12, { col: 0xE8D0E8, frame: dkwShine(0xE8C87A, 0.3, 0.7), y: H(30, -88) });
(function () {
var gx = -120, gz = -30;
dkwPlant(G, "bush", dkwScatter(9011, lite ? 40 : 90, gx - 40, gz - 40, gx + 40, gz + 40, function (x, z) { return Math.abs(x - gx) > 36 || Math.abs(z - gz) > 36; }, H, 0.9, 1.3), { col: 0x2A5A2A, keepAll: 1 });
for (var r = 0; r < 7; r++) {
var bz = gz - 26 + r * 8, bx = gx;
dkwBox(G, 40, 0.5, 3, dkwS("b:planks", 0x6A4A2A, 2), bx, H(bx, bz), bz);
var herb = [[0x5AA84A, 0xFFFFFF], [0x4A8A3A, 0xB88AFF], [0x6AB84A, 0xFFE88A], [0x3A7A3A, 0xFF8AB8], [0x5A9A4A, 0xB8E8FF], [0x4A8A4A, 0xFFFFFF], [0x6AA84A, 0xC88AFF]][r];
dkwPlant(G, "bush", dkwScatter(9020 + r, lite ? 10 : 22, bx - 19, bz - 1, bx + 19, bz + 1, null, function (x, z) { return H(x, z) + 0.45; }, 0.28, 0.42), { col: herb[0], keepAll: 1 });
dkcFlowers(G, dkwScatter(9030 + r, lite ? 16 : 40, bx - 19, bz - 1, bx + 19, bz + 1, null, function (x, z) { return H(x, z) + 0.85; }, 0.14, 0.22), [herb[1]]);
}
for (var k = 0; k < (lite ? 12 : 30); k++) {
var mx = gx - 14 + (k % 10) * 1.6, mz = gz - 14 + Math.floor(k / 10) * 1.4, my = H(mx, mz);
var bud = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.4, 8), dkwM("moonpetal", function () { var m = new THREE.MeshLambertMaterial({ color: 0xF4F4FF, emissive: 0x8A8AC8, emissiveIntensity: 0.35 }); m.userData.noPhoto = 1; return m; }));
bud.position.set(mx, my + 0.7, mz);
G.add(bud);
dkwCyl(G, 0.02, 0.02, 0.6, dkwLam(0x4A7A3A), mx, my, mz, 5);
}
var cy = H(gx + 20, gz + 14);
dkwCyl(G, 0.8, 0.6, 1, dkwShine(0x2A2A2A, 0.5, 0.6), gx + 20, cy, gz + 14, 14);
dkwSmoke(G, gx + 20, cy + 1.1, gz + 14, 0xB8E8B8, 3);
dkwBox(G, 3, 0.9, 1, dkwMat("oak"), gx + 16, H(gx + 16, gz + 16), gz + 16);
for (k = 0; k < 4; k++)
dkwBox(G, 0.08, 0.4, 0.08, dkwShine(0x8A8A8A, 0.4, 0.7), gx + 15 + k * 0.5, H(gx + 16, gz + 16) + 0.9, gz + 16);
dkwHouse(G, gx + 30, gz + 26, 6, 5, 4, { y: H(gx + 30, gz + 26), wall: dkwS("b:planks", 0x8A6A4A, 2), roof: dkwS("b:moss", 0x9A8A5A, 2), shut: 0x4A6A3A });
})();
(function () {
var x = 230, z = -60, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var st = dkwS("b:limestone", 0x8A8090, 3);
dkwCyl(g, 12, 14, 60, st, 0, 0, 0, 16);
dkwCyl(g, 13, 13, 2, dkwShine(0xC8A84A, 0.3, 0.7), 0, 60, 0, 16);
dkwCyl(g, 9, 11, 30, st, 0, 62, 0, 14);
var cn = new THREE.Mesh(new THREE.ConeGeometry(11, 26, 14), dkwS("b:slate", 0x3A2A5A, 2));
cn.position.set(0, 105, 0);
g.add(cn);
[[0, 1], [Math.PI * 2 / 3, 1], [Math.PI * 4 / 3, 1]].forEach(function (q) { var sx = Math.cos(q[0]) * 14, sz = Math.sin(q[0]) * 14; dkwCyl(g, 3, 3.5, 52, st, sx, 0, sz, 10); var sc = new THREE.Mesh(new THREE.ConeGeometry(4, 14, 10), dkwS("b:slate", 0x3A2A5A, 2)); sc.position.set(sx, 59, sz); g.add(sc); });
for (var k = 0; k < 24; k++) {
var a = k / 24 * Math.PI * 2, wy = 8 + (k % 6) * 12;
var w = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 3), dkwGlowM([0xFFC86A, 0xB88AFF][k % 2], 0.75));
w.position.set(Math.cos(a) * 12.6 - 0, wy, Math.sin(a) * 12.6);
w.lookAt(Math.cos(a) * 40, wy, Math.sin(a) * 40);
g.add(w);
}
for (k = 0; k < 8; k++)
dkcRune(g, Math.cos(k / 8 * Math.PI * 2) * 10, Math.sin(k / 8 * Math.PI * 2) * 10, 3, 0xC88AFF, 0, { y: 92 + k % 2 });
dkwSolid(x, z, 30, 30, y - 2, y + 120, 0);
})();
dkwDoorTo(G, "summer", 2, 226, -46, 0.4, "The door of the Arcane Tower", 18, 16, { col: 0x5A4A7A, frame: dkwS("b:limestone", 0x8A8090, 3), y: H(226, -46) });
dkcAwenTrees(G, dkwScatter(9040, lite ? 60 : 160, -900, -300, -320, 500, null, H, 0.9, 1.5), { bark: 0xD8DCE4, leaf: 0x4A8A5A, glow: 0.12 });
dkwPlant(G, "tree", dkwScatter(9041, lite ? 40 : 110, -900, -300, -340, 500, null, H, 1.0, 1.6), { col: 0x2A4A2A });
dkwPlant(G, "bush", dkwScatter(9042, lite ? 60 : 180, -880, -280, -330, 480, function (x, z) { return Math.abs(z - 120 + (x + 460) * 0.0) > 3 || x > -440; }, H, 0.6, 1.1), { col: 0x2A4A28 });
dkwPlant(G, "fern", dkwScatter(9043, lite ? 80 : 260, -880, -280, -330, 480, null, H, 0.6, 1.1), { col: 0x3A6A34 });
dkcFlowers(G, dkwScatter(9044, lite ? 60 : 200, -880, -280, -330, 480, null, function (x, z) { return H(x, z) + 0.6; }, 0.15, 0.25), [0xFFFFF0, 0xFFF4D8]);
dkcMotes(G, lite ? 80 : 220, -560, 80, 180, 0.5, 10, 0xE8FFB8);
[[-40, 40], [40, 40]].forEach(function (f) { var fy = H(f[0], f[1]); dkwCyl(G, 5, 5.5, 0.8, dkwS("b:marble", 0xF0E8F0, 3), f[0], fy, f[1], 20); dkcCrystal(G, f[0], fy + 0.8, f[1], 5, 0xFFC8E8, { n: 4 }); dkwRound(f[0], f[1], 5.6); });
for (var i = 0; i < (lite ? 12 : 30); i++) {
var lx = -80 + R() * 160, lz = -40 + R() * 160;
var ln = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), dkwGlowM([0xFFE8A0, 0xFFB8E8, 0xB8E8FF][i % 3], 0.9));
ln.position.set(lx, H(lx, lz) + 4 + R() * 6, lz);
ln.userData.kind = "float";
ln.userData.y0 = ln.position.y;
ln.userData.amp = 0.6;
ln.userData.f = 0.2;
ln.userData.ph = i;
G.add(ln);
DKW.bob.push(ln);
}
dkwCrowd(9050, lite ? 10 : 26, -70, -30, 70, 140, { dress: "dkfaem", dressF: "dkfae", wander: 18, names: ["A courtier with dragonfly wings", "A lady of the Summer Court", "A pixie messenger", "A fae musician", "A palace gossip"], says: ["Have you seen the sky? Red as heartsblood. The Queen has not slept.", "They say the Whispering Lake has gone silent.", "The bell-flowers rang on their own last night. All of them.", "Lyra's nettles exploded again. The whole east wing smells of pepper.", "The Heart Tree is glowing. It has not glowed like that since the Elden War, my grandmother says."] });
[["gardenPortal", -106, -20], ["woodsPortal", -600, 20]].forEach(function (q) { var pg = new THREE.Group(); G.add(pg); dkcPortal(pg, q[1], H(q[1], q[2]) + 2.2, q[2], 1.8, 0xE84A6A, 0); dkwShow(q[0], pg, false); });
dkwSpot(-128, -44, 3, "The moonpetal", "look at the moonpetal", function () { dkbSay("🌸 " + dkQ("She gestured to a patch of moonpetal blossoms that had closed their petals tightly, as if hiding from the unnatural light.")); }, H(-128, -44));
},
function (x, z) {
var h = dkwFbm(x * 0.004, z * 0.004, 3) * 14 + dkwFbm(x * 0.02, z * 0.02, 2) * 1.5;
if (z < -200) {
var m = Math.min(1, (-200 - z) / 140), d = dkwPassD(x, z), wall = Math.max(0, Math.min(1, (d - 9) / 30));
h += m * (30 + (-200 - z) * 0.05) * 0 + m * wall * (140 + dkwFbm(x * 0.012, z * 0.012, 4) * 120);
h += m * (-200 - z) * 0.03;
}
var dc = Math.hypot(x, z + 130);
if (dc < 30)
h = h * (dc / 30) + 2 * (1 - dc / 30);
return h;
},
function (G) {
var lite = dkwLite(), H = dkwFrostfangH, R = wRand(1313);
var basalt = dkwS("b:strata", 0x2A2A30, 8);
dkwTerrain(G, -1000, -1000, 2000, 2000, lite ? 20 : 10, H, dkwMat("snow"), function (x, z, y, c) {
var n = dkwFbm(x * 0.03, z * 0.03, 3), rock = z < -220 ? Math.min(1, Math.max(0, (y - 30) / 60)) : 0, pass = z < -220 && dkwPassD(x, z) < 14 ? 0.2 : 0;
var r = 0.74 + n * 0.12, g = 0.8 + n * 0.1, b = 0.9 + n * 0.06;
r = r * (1 - rock) + 0.18 * rock - pass;
g = g * (1 - rock) + 0.18 * rock - pass;
b = b * (1 - rock) + 0.22 * rock - pass;
c.setRGB(r, g, b);
});
dkcMoons(G, { n: 2 });
var cols = [];
for (var i = 0; i < (lite ? 160 : 420); i++) {
var t = R() * (DKW_PASS.length - 1.01), k = Math.floor(t), f = t - k, a = DKW_PASS[k], b = DKW_PASS[k + 1];
var cx = a[0] + (b[0] - a[0]) * f, cz = a[1] + (b[1] - a[1]) * f, side = R() < 0.5 ? -1 : 1, off = 12 + R() * 18;
var nx = -(b[1] - a[1]), nz = b[0] - a[0], nl = Math.hypot(nx, nz);
var x = cx + nx / nl * off * side, z = cz + nz / nl * off * side;
cols.push({ x: x, z: z, y: H(x, z) - 6, s: 1, h: 16 + R() * 40, r: 2 + R() * 3, ry: R() * 6 });
}
dkwInst(G, dkwGeo("basaltcol", function () { var g = new THREE.CylinderGeometry(1, 1.1, 1, 6, 1); g.translate(0, 0.5, 0); return g; }), basalt, cols.map(function (c) { return { x: c.x, z: c.z, y: c.y, s: 1, sx: c.r, sy: c.h, sz: c.r, ry: c.ry }; }), { shadow: !lite });
cols.forEach(function (c) { dkwRound(c.x, c.z, c.r); });
for (i = 0; i < (lite ? 10 : 26); i++) {
var t2 = R() * (DKW_PASS.length - 1.01), k2 = Math.floor(t2), f2 = t2 - k2, a2 = DKW_PASS[k2], b2 = DKW_PASS[k2 + 1];
var mx = a2[0] + (b2[0] - a2[0]) * f2, mz = a2[1] + (b2[1] - a2[1]) * f2;
var ms = new THREE.Mesh(new THREE.PlaneGeometry(40, 10), dkwM("passmist", function () { var t = dkwCanvas("passmistT", 256, 64, function (c, W, H) { var g = c.createRadialGradient(W / 2, H / 2, 4, W / 2, H / 2, W / 2); g.addColorStop(0, "rgba(230,240,255,.55)"); g.addColorStop(1, "rgba(230,240,255,0)"); c.fillStyle = g; c.fillRect(0, 0, W, H); }); var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
ms.position.set(mx, H(mx, mz) + 3 + R() * 5, mz);
ms.rotation.y = R() * 3;
G.add(ms);
}
dkcMotes(G, lite ? 300 : 900, 0, -200, 700, 0, 40, 0xFFFFFF);
dkwPlant(G, "conifer", dkwScatter(1314, lite ? 60 : 180, -1000, -200, 1000, 1000, function (x, z) { return Math.abs(x) > 30 || z < -150; }, H, 0.8, 1.6), { col: 0xD8E8F0 });
for (i = 0; i < (lite ? 20 : 50); i++) {
var dx = -600 + R() * 1200, dz = -100 + R() * 800;
var dr = new THREE.Mesh(new THREE.SphereGeometry(4 + R() * 8, 10, 6), dkwMat("snow"));
dr.scale.set(1.6, 0.25, 1);
dr.position.set(dx, H(dx, dz) - 0.4, dz);
dr.rotation.y = R() * 3;
G.add(dr);
}
(function () { var g = new THREE.Group(); g.position.set(0, 0, 980); G.add(g); var ice = dkwM("icewall"); [[-30, 90], [30, 80], [0, 140], [-60, 60], [60, 60]].forEach(function (t) { dkwCyl(g, 5, 6, t[1], ice, t[0], 0, 0, 8); var sp = new THREE.Mesh(new THREE.ConeGeometry(6, t[1] * 0.4, 8), ice); sp.position.set(t[0], t[1] + t[1] * 0.2, 0); g.add(sp); }); })();
(function () {
var x = 0, z = -138, y = H(x, z);
var oh = new THREE.Mesh(new THREE.BoxGeometry(30, 4, 14), basalt);
oh.position.set(x, y + 9, z - 4);
oh.rotation.x = -0.12;
G.add(oh);
dkwBox(G, 30, 10, 4, basalt, x, y - 1, z - 12);
dkwSolid(x, z - 12, 30, 4, y - 2, y + 12, 0);
[-14, 14].forEach(function (s) { dkwBox(G, 3, 10, 10, basalt, x + s, y - 1, z - 6); dkwSolid(x + s, z - 6, 3, 10, y - 2, y + 12, 0); });
var tent = new THREE.Mesh(new THREE.ConeGeometry(2.4, 2.6, 4), dkwS("b:quilt", 0x8A7A5A, 1));
tent.rotation.y = Math.PI / 4;
tent.position.set(x - 6, y + 1.3, z - 5);
G.add(tent);
dkwSolid(x - 6, z - 5, 3.4, 3.4, y - 1, y + 3, 0);
dkwFire(G, x + 1, y, z - 1, 1);
for (var k = 0; k < 5; k++)
dkwBox(G, 0.9, 0.15, 0.15, dkwMat("oak"), x + 1 + Math.cos(k * 1.3) * 0.8, y, z - 1 + Math.sin(k * 1.3) * 0.8, k * 1.3);
[[4, -6], [5, -5], [-2, -8]].forEach(function (p) { dkwBox(G, 0.6, 0.7, 0.4, dkwS("b:quilt", 0x6A5A3A, 1), x + p[0], y, z + p[1], R()); });
})();
for (i = 0; i < (lite ? 14 : 30); i++) {
var tx = 90 + R() * 50, tz = -195 + R() * 50;
if (Math.hypot(tx - 110, tz - 170) < 6)
continue;
var ty = H(tx, tz), lean = (R() - 0.5) * 0.6;
G.add(new THREE.Mesh(dkwTaper([[tx, ty, tz], [tx + lean * 2, ty + 3, tz + 0.4], [tx + lean * 4, ty + 6, tz - 0.3], [tx + lean * 5 + 1, ty + 8, tz + 0.5]], [0.4, 0.3, 0.18, 0.06], 8, 5), dkwS("b:oak", 0x3A342E, 2)));
for (var j = 0; j < 4; j++) {
var bx = tx + lean * 3, by = ty + 4 + j, bz = tz, ba = R() * 6;
G.add(new THREE.Mesh(dkwTaper([[bx, by, bz], [bx + Math.cos(ba) * 1.5, by + 0.8, bz + Math.sin(ba) * 1.5], [bx + Math.cos(ba) * 3, by + 0.6, bz + Math.sin(ba) * 3]], [0.12, 0.07, 0.02], 6, 4), dkwS("b:oak", 0x3A342E, 2)));
}
dkwRound(tx, tz, 0.5);
}
(function () {
var x = -10, z = -760, y = H(x, z);
var mw = new THREE.Mesh(new THREE.TorusGeometry(9, 3, 8, 20, Math.PI), dkwM("blackice", function () { var m = new THREE.MeshPhongMaterial({ color: 0x1A2A3A, emissive: 0x0A2034, shininess: 100, specular: 0x8ACFFF }); m.userData.noPhoto = 1; return m; }));
mw.position.set(x, y, z + 8);
G.add(mw);
var dk = new THREE.Mesh(new THREE.PlaneGeometry(16, 9), dkwGlowM(0x0A1420, 0.92));
dk.position.set(x, y + 4, z + 7.6);
G.add(dk);
for (var k = 0; k < 8; k++) {
var ic = new THREE.Mesh(new THREE.ConeGeometry(0.5, 2 + k % 3, 6), dkwM("blackice"));
ic.rotation.x = Math.PI;
ic.position.set(x - 7 + k * 2, y + 8 - (k % 2), z + 8.4);
G.add(ic);
}
})();
dkwDoorTo(G, "frostfang", 0, -10, -751, 0, "Into the Ice Wraith's Maw", 40, 40, { col: 0x0A1420, frame: dkwM("blackice"), y: H(-10, -751) });
dkwSpot(110, -170, 4, "Glowing eyes", "look into the dark", function () { dkbSay("👁️ Two points of eerie green light in the darkness, like embers burning in the heart of a glacier."); }, H(110, -170));
},
function (x, z) {
var h = dkwFbm(x * 0.005, z * 0.005, 3) * 10 + dkwFbm(x * 0.03, z * 0.03, 2) * 1.4;
if (z > 620)
h += (z - 620) * 0.9;
if (x < -200)
h += Math.min(60, (-200 - x) * 0.7) * Math.max(0, 1 - Math.abs(z - 180) / 220);
var d = Math.hypot(x, z + 150);
if (d < 120)
h = h * (d / 120) + 2 * (1 - d / 120);
return h;
},
function (P, w, h, d, mat, x, y, z, amp, seed) {
var g = new THREE.BoxGeometry(w, h, d, Math.max(5, Math.round(w / 2.2)), Math.max(5, Math.round(h / 2.2)), Math.max(5, Math.round(d / 2.2))), p = g.attributes.position, uv = g.attributes.uv, s = seed || 1;
var n = function (a, b, c) { return Math.sin(a * 0.31 + s) * Math.cos(b * 0.27 - s * 0.7) + Math.sin(c * 0.23 + b * 0.11 + s * 1.3) * 0.7 + Math.sin((a + c) * 0.9 + b * 0.5 + s) * 0.35 + Math.sin(a * 1.7 - c * 1.3 + b * 1.1) * 0.18; };
for (var i = 0; i < p.count; i++) {
var X = p.getX(i), Y = p.getY(i), Z = p.getZ(i), k = amp * n(X, Y, Z), ledge = Math.round(Y / 4) * 4 - Y;
var ex = Math.abs(Math.abs(X) - w / 2) < 0.01, ey = Math.abs(Y - h / 2) < 0.01, ez = Math.abs(Math.abs(Z) - d / 2) < 0.01;
uv.setXY(i, ex ? Z + w / 2 : X + w / 2, ex || ez ? Y + h / 2 : Z + d / 2);
if (ex)
X += Math.sign(X) * (k + ledge * 0.25);
if (ez)
Z += Math.sign(Z) * (k + ledge * 0.25);
if (ey)
Y += k * 0.6;
if (Y < -h / 2 + 0.01)
continue;
p.setXYZ(i, X, Y, Z);
}
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.position.set(x, y + h / 2, z);
m.castShadow = m.receiveShadow = true;
P.add(m);
return m;
},
function (P, x, y, z, w, h, ry, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h, 1, 6), dkwM("wfall" + col, function () {
var t = dkwCanvas("wfallT" + col, 64, 256, function (c, W, Hh) {
var cs = "#" + ("000000" + col.toString(16)).slice(-6), g = c.createLinearGradient(0, 0, W, 0);
g.addColorStop(0, "rgba(255,255,255,0)");
g.addColorStop(0.15, cs);
g.addColorStop(0.5, "#F4FAFF");
g.addColorStop(0.85, cs);
g.addColorStop(1, "rgba(255,255,255,0)");
c.fillStyle = g;
c.fillRect(0, 0, W, Hh);
for (var k = 0; k < 70; k++) {
c.fillStyle = "rgba(255,255,255," + (0.25 + (k % 5) * 0.1) + ")";
c.fillRect((k * 23) % W, (k * 61) % Hh, 1 + (k % 3), 18 + (k % 4) * 8);
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
var mm = new THREE.MeshLambertMaterial({ map: t, transparent: true, opacity: 0.88, depthWrite: false, side: THREE.DoubleSide, emissive: 0x8AA8C8, emissiveIntensity: 0.35 });
mm.userData.noPhoto = 1;
return mm;
}));
m.position.set(x, y + h / 2, z);
m.rotation.y = ry || 0;
P.add(m);
DKW.water.push(m);
dkwSmoke(P, x, y + 0.4, z + Math.cos(ry || 0) * 1.5, 0xF0F8FF, 5);
return m;
},
function (P, x, z, H, span, s, bark) {
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
var R = wRand(Math.round(x * 7 + z * 13));
[-1, 1].forEach(function (sd) {
var bx = sd * span / 2, by = H(x + bx, z);
g.add(new THREE.Mesh(dkwTaper([[bx, by - 1, 0], [bx * 0.92, by + 8 * s, 0.6], [bx * 0.6, by + 15 * s, -0.4], [bx * 0.15, by + 19 * s, 0.3]], [1.3 * s, 1.0 * s, 0.7 * s, 0.35 * s], 12, 8), bark));
for (var k = 0; k < 4; k++) {
var a = R() * 6.28, l = 4 + R() * 5;
g.add(new THREE.Mesh(dkwTaper([[bx * 0.75, by + (11 + k * 2) * s, 0], [bx * 0.75 + Math.cos(a) * l * 0.6, by + (13 + k * 2) * s, Math.sin(a) * l * 0.6], [bx * 0.75 + Math.cos(a) * l, by + (15 + k * 2) * s, Math.sin(a) * l]], [0.4 * s, 0.24 * s, 0.08 * s], 8, 4), bark));
}
dkwRound(x + bx, z, 1.3 * s);
});
return g;
},
function (G) {
var lite = dkwLite(), H = dkwEldrinH, R = wRand(17017);
dkwTerrain(G, -800, -800, 1600, 1600, lite ? 24 : 12, H, dkwMat("lawn"), function (x, z, y, c) { var n = dkwFbm(x * 0.02, z * 0.02, 3), r = (z > 620 || x < -210) ? 1 : 0; c.setRGB(0.22 + n * 0.12 + r * 0.12, 0.40 + n * 0.16 - r * 0.06, 0.18 + n * 0.08 + r * 0.06); });
dkcMoons(G, { n: 3 });
var moss = dkwS("b:moss", 0x5A7A4A, 3), rock = dkwS("b:strata", 0x6A6A62, 4), bark = dkwS("b:oak", 0x5A4632, 2), silver = dkwShine(0xD8DCE4, 0.35, 0.35);
(function () {
var bas = dkwS("b:slate", 0x2A2C30, 3);
for (var k = 0; k < 14; k++) {
var cx = -160 + k * 24 + (k === 6 || k === 7 ? (k === 6 ? -14 : 14) : 0);
if (k === 6 || k === 7)
continue;
var hh = 30 + ((k * 37) % 20);
dkwBox(G, 22, hh, 22, bas, cx, H(cx, 660) - 4, 660 + ((k * 11) % 9));
var sn = new THREE.Mesh(new THREE.BoxGeometry(23, 2, 23), dkwLam(0xF0F4FA));
sn.position.set(cx, H(cx, 660) - 4 + hh, 660 + ((k * 11) % 9));
G.add(sn);
dkwSolid(cx, 660 + ((k * 11) % 9), 22, 22, -50, 400, 0);
}
dkwBox(G, 6, 38, 22, bas, -22, H(-22, 660) - 4, 664);
dkwBox(G, 6, 38, 22, bas, 22, H(22, 660) - 4, 664);
dkwSolid(-22, 664, 6, 22);
dkwSolid(22, 664, 6, 22);
})();
dkwStrip(G, [[0, 640], [0, 520], [-20, 440], [-70, 330], [-110, 260], [-90, 160], [-80, 70], [-40, 0], [0, -80], [0, -190]], 3.4, function (x, z) { return H(x, z) + 0.05; }, dkwMat("gravel"), 0.05);
dkcAwenTrees(G, dkwScatter(17020, lite ? 80 : 220, -780, -700, 780, 640, function (x, z) { return Math.hypot(x, z + 150) > 110 && !(x < -150 && x > -240 && z > 120 && z < 260); }, H, 1.1, 1.8), { bark: 0x6A5A44, leaf: 0x4A9A3A, glow: 0.1 });
dkwPlant(G, "tree", dkwScatter(17021, lite ? 60 : 180, -780, -700, 780, 640, function (x, z) { return Math.hypot(x, z + 150) > 110; }, H, 1.2, 2.0), { col: 0x2A5A22 });
[[0, 560, 14], [-6, 500, 14], [-18, 450, 13], [-40, 390, 13], [-64, 340, 12], [-96, 290, 12], [-100, 140, 13], [-84, 100, 12], [-60, 30, 13], [-20, -40, 14]].forEach(function (t) { dkcTwined(G, t[0], t[1], H, t[2], 1, bark); });
dkwPlant(G, "fern", dkwScatter(17022, lite ? 120 : 420, -500, -400, 400, 620, null, H, 0.7, 1.3), { col: 0x3A7A30 });
dkwPlant(G, "bush", dkwScatter(17023, lite ? 60 : 220, -500, -400, 400, 620, function (x, z) { return Math.hypot(x, z + 150) > 90; }, H, 0.6, 1.2), { col: 0x2A5A24 });
dkcFlowers(G, dkwScatter(17024, lite ? 120 : 420, -160, 0, 40, 600, function (x, z) { return Math.abs(x - (z > 330 ? -20 - (440 - z) * 0.45 : -80)) < 20; }, function (x, z) { return H(x, z) + 0.5; }, 0.2, 0.4), [0x8AFFC8, 0xC8FF8A, 0x8AC8FF, 0xFFE88A]);
for (var i = 0; i < (lite ? 14 : 40); i++) {
var gx = -150 + R() * 190, gz = 60 + R() * 520, gy = H(gx, gz);
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.4 + R() * 0.5, 10, 6, 0, 6.28, 0, 1.4), dkwGlowM([0x6AE8C8, 0xB8FF8A, 0x8AB8FF][i % 3], 0.8));
cap.position.set(gx, gy + 0.5, gz);
G.add(cap);
dkwCyl(G, 0.06, 0.09, 0.5, dkwLam(0xE8F0D8), gx, gy, gz, 6);
}
dkcMotes(G, lite ? 120 : 360, -60, 300, 260, 0.5, 14, 0xE8FFB8);
[[40, 520, 0.3], [-130, 380, -0.6], [30, 300, 0.2]].forEach(function (f) { var fy = H(f[0], f[1]); dkwBox(G, 10, 9, 6, moss, f[0], fy - 1, f[1] - 3, f[2]); dkwBox(G, 6, 5, 5, rock, f[0] + 5, fy - 1, f[1] + 1, f[2]); dkwSolid(f[0], f[1] - 3, 10, 6, fy - 2, fy + 8, f[2]); dkcFall(G, f[0], fy, f[1] + 0.1, 3, 7.6, f[2], 0xB8D8E8); dkwWater(G, f[0], f[1] + 4, 8, 6, fy + 0.2, 0x4A7A8A, 0.8); });
(function () {
var fx = -240, fz = 180, fy = H(-200, 180);
dkcCrag(G, 30, 96, 90, rock, fx - 10, fy - 46, fz, 3.2, 11);
dkcCrag(G, 36, 5, 94, moss, fx - 10, fy + 49, fz, 1.6, 12);
[[-14, -62, 26, 84, 0.25], [-20, -38, 30, 104, -0.15], [-6, 46, 24, 90, 0.3], [-16, 64, 30, 78, -0.25], [-26, 8, 26, 118, 0.1], [-30, -18, 22, 124, -0.2], [-24, 34, 22, 112, 0.2], [-4, -50, 18, 64, 0.4]].forEach(function (c, n) {
var top = fy - 46 + c[3];
dkcCrag(G, c[2], c[3], c[2] * 1.1, rock, fx + c[0], fy - 46, fz + c[1], 4.6, 20 + n).rotation.y = c[4];
dkcCrag(G, c[2] + 5, 4, c[2] * 1.1 + 5, moss, fx + c[0], top - 2, fz + c[1], 1.4, 40 + n).rotation.y = c[4];
dkwSolid(fx + c[0], fz + c[1], c[2], c[2] * 1.1, -50, 400, c[4]);
dkwPlant(G, "tree", [{ x: fx + c[0] - c[2] * 0.2, y: top + 1, z: fz + c[1] - 3, s: 1.4, ry: n }, { x: fx + c[0] + c[2] * 0.1, y: top + 1, z: fz + c[1] + 5, s: 1.1, ry: n * 2 }], { keepAll: 1, col: 0x2E6A2A });
});
dkwSolid(fx - 10, fz, 30, 90, -50, 400, 0);
for (var k = 0; k < 10; k++)
dkwBox(G, 4 + R() * 5, 3 + R() * 6, 4 + R() * 5, moss, fx + 5 + R() * 4, fy - 1 + R() * 30, fz - 40 + R() * 80, R());
dkcFall(G, fx + 9.5, fy - 1, fz, 14, 52, Math.PI / 2, 0xC8D8F0);
dkcFall(G, fx + 9.6, fy + 14, fz + 20, 5, 36, Math.PI / 2, 0xC8D8F0);
dkwWater(G, -212, fz, 46, 60, fy + 0.25, 0x5A8AA8, 0.85);
dkwSmoke(G, -226, fy + 1, fz, 0xF0F8FF, lite ? 6 : 12);
[[-190, 150], [-188, 210], [-196, 232], [-200, 128]].forEach(function (s) { dkwBox(G, 2.6, 1, 2, rock, s[0], H(s[0], s[1]) - 0.3, s[1], R()); });
dkcMotes(G, lite ? 60 : 200, -210, 180, 40, 1, 24, 0xD8E8FF);
var L = new THREE.PointLight(0xC8D8FF, lite ? 0.6 : 1.0, 90, 2);
L.position.set(-215, fy + 10, fz);
G.add(L);
for (k = 0; k < 9; k++) {
var a = k / 9 * Math.PI * 2, rx = -160 + Math.cos(a) * 12, rz = 214 + Math.sin(a) * 12;
dkwBox(G, 1, 2.2 + (k % 3) * 0.4, 0.8, dkwS("b:limestone", 0xD8DCE8, 2), rx, H(rx, rz), rz, a);
dkcRune(G, rx, rz, 0.6, 0xC8A8FF, a, { y: H(rx, rz) + 2.6 + (k % 3) * 0.4 });
}
for (k = 0; k < (lite ? 8 : 20); k++) {
var lx = -200 + R() * 80, lz = 150 + R() * 110;
var ln = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), dkwGlowM(0xD8E0FF, 0.9));
ln.position.set(lx, H(lx, lz) + 3 + R() * 5, lz);
ln.userData.kind = "float";
ln.userData.y0 = ln.position.y;
ln.userData.amp = 0.4;
ln.userData.f = 0.18;
ln.userData.ph = k;
G.add(ln);
DKW.bob.push(ln);
}
})();
for (i = 0; i < (lite ? 20 : 60); i++) {
var mx = -110 + R() * 40, mz = 40 + R() * 40, my = H(mx, mz);
var bl = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 6, 0, 6.28, 0, 1.2), dkwGlowM(0xF8F8FF, 0.92));
bl.position.set(mx, my + 0.6, mz);
bl.rotation.x = Math.PI;
G.add(bl);
dkwCyl(G, 0.02, 0.02, 0.6, dkwLam(0x4A7A3A), mx, my, mz, 5);
}
dkcAwenTrees(G, dkwScatter(17030, lite ? 8 : 20, -80, -10, -10, 60, null, H, 1.1, 1.5), { bark: 0xE0E4EC, leaf: 0xE8C84A, glow: 0.45 });
dkcFlowers(G, dkwScatter(17031, lite ? 120 : 400, -100, -240, 100, -40, function (x, z) { return Math.abs(x) > 4 && !(Math.abs(x) < 44 && z < -170); }, function (x, z) { return H(x, z) + 0.3; }, 0.25, 0.5), [0xFFF8F0, 0xFFB8E8, 0xB8E8FF, 0xE8FFB8]);
(function () {
var x = 0, z = -230, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var lw = dkwS("b:oak", 0x7A5E3E, 2.4);
dkwBox(g, 80, 20, 50, dkwS("b:moss", 0x6A7A4A, 3), 0, 0, -6);
dkwSolid(x, z - 6, 80, 50, y - 2, y + 60, 0);
[[-40, -30, 44], [40, -30, 40], [-40, 18, 34], [40, 18, 36], [-16, -30, 52], [16, -30, 48], [0, -20, 60]].forEach(function (t, i) {
g.add(new THREE.Mesh(dkwTaper([[t[0], -1, t[1]], [t[0] * 1.05, t[2] * 0.5, t[1]], [t[0] * 0.9, t[2], t[1] - 2]], [5, 3.6, 2], 14, 8), lw));
var cr = new THREE.Mesh(new THREE.IcosahedronGeometry(8 + i % 3 * 2, 1), dkwM("palaceleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x5AA84A, emissive: 0x2A6A2A, emissiveIntensity: 0.25, map: dkwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
cr.position.set(t[0], t[2] + 4, t[1]);
g.add(cr);
});
for (var k = 0; k < 12; k++) {
var ax = -36 + k * 6.5;
g.add(new THREE.Mesh(dkwTaper([[ax, 0, 19], [ax + 2, 10, 20.5], [ax + 3.4, 20, 19.5]], [0.7, 0.5, 0.25], 10, 6), lw));
}
for (k = 0; k < 26; k++) {
var vx = -38 + k * 3;
var vn = new THREE.Mesh(dkwTaper([[vx, 20, 19.2], [vx + 0.4, 12, 19.4], [vx - 0.3, 4 + (k % 4), 19.3]], [0.1, 0.08, 0.05], 8, 4), dkwLam(0x3A7A2A));
g.add(vn);
var fb = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), dkwGlowM([0xFFE8F8, 0xE8FFF0, 0xFFF4B8][k % 3], 0.9));
fb.position.set(vx - 0.3, 4 + (k % 4), 19.4);
g.add(fb);
}
[-30, 30].forEach(function (s) { dkcFall(g, s, 0, 19.3, 6, 20, 0, 0xC8E0E8); dkwWater(g, s, 23, 10, 6, 0.2, 0x4A7A8A, 0.85); });
var door = new THREE.Mesh(new THREE.PlaneGeometry(10, 14), dkwM("tidoor", function () {
var t = dkwCanvas("tidoorT", 128, 192, function (c, W, Hh) {
c.fillStyle = "#4A3A22";
c.fillRect(0, 0, W, Hh);
for (var j = 0; j < 40; j++) {
c.strokeStyle = "rgba(40,26,14,.6)";
c.lineWidth = 2;
c.beginPath();
c.moveTo(j * 3.3, 0);
c.bezierCurveTo(j * 3.3 + 8, Hh * 0.3, j * 3.3 - 8, Hh * 0.7, j * 3.3, Hh);
c.stroke();
}
c.strokeStyle = "#8AFF9A";
c.lineWidth = 1.2;
c.globalAlpha = 0.85;
for (j = 0; j < 26; j++) {
c.beginPath();
var sx = 14 + (j * 29) % 100, sy = 16 + (j * 47) % 160;
c.moveTo(sx, sy);
c.bezierCurveTo(sx + 6, sy - 8, sx + 14, sy + 8, sx + 20, sy);
c.stroke();
}
});
var m = new THREE.MeshLambertMaterial({ map: t, emissive: 0x2A8A3A, emissiveIntensity: 0.35, emissiveMap: t });
m.userData.noPhoto = 1;
return m;
}));
door.position.set(0, 7, 19.15);
g.add(door);
})();
dkwDoorTo(G, "eldrin", 0, 0, -209, 0, "The doors of living wood", 50, 40, { col: 0x4A3A22, frame: dkwS("b:oak", 0x7A5E3E, 2.4), y: H(0, -209) });
(function () {
var x = 40, z = -156, y = H(x, z);
G.add(new THREE.Mesh(dkwTaper([[x, y - 1, z], [x + 0.5, y + 10, z + 0.4], [x, y + 18, z]], [3.6, 2.6, 1.8], 16, 8), bark));
dkwRound(x, z, 3.6);
for (var k = 0; k < 7; k++) {
var a = k / 7 * 6.28;
G.add(new THREE.Mesh(dkwTaper([[x, y + 14, z], [x + Math.cos(a) * 7, y + 18, z + Math.sin(a) * 7], [x + Math.cos(a) * 13, y + 19 + (k % 2) * 2, z + Math.sin(a) * 13]], [1.2, 0.7, 0.25], 10, 6), bark));
G.add(new THREE.Mesh(dkwTaper([[x, y, z], [x + Math.cos(a + 0.3) * 4, y - 0.2, z + Math.sin(a + 0.3) * 4], [x + Math.cos(a + 0.3) * 7, y - 0.6, z + Math.sin(a + 0.3) * 7]], [1.1, 0.6, 0.2], 8, 5), bark));
}
var cr = [];
for (k = 0; k < (lite ? 6 : 14); k++) {
var c = new THREE.IcosahedronGeometry(4 + R() * 2.4, 1);
var ca = R() * 6.28, cd = R() * 11;
c.translate(x + Math.cos(ca) * cd, y + 20 + R() * 7, z + Math.sin(ca) * cd);
cr.push(c.index ? c.toNonIndexed() : c);
}
G.add(new THREE.Mesh(dkwMerge(cr), dkwM("oakleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x3A7A2A, map: dkwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; })));
})();
for (i = 0; i < (lite ? 12 : 30); i++) {
var lx = -80 + R() * 160, lz = -200 + R() * 140;
var ln = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), dkwGlowM([0xF0F4FF, 0xFFF0C8, 0xC8FFE8][i % 3], 0.9));
ln.position.set(lx, H(lx, lz) + 4 + R() * 6, lz);
ln.userData.kind = "float";
ln.userData.y0 = ln.position.y;
ln.userData.amp = 0.6;
ln.userData.f = 0.2;
ln.userData.ph = i;
G.add(ln);
DKW.bob.push(ln);
}
dkwCrowd(17050, lite ? 10 : 24, -70, -180, 70, -60, { dress: "dkelf", dressF: "dkfae", wander: 16, names: ["An elven courtier", "A lady of the Lunethian Court", "A pixie on an errand", "A harpist of the court", "A gardener of living wood"], says: ["Strangers from the Frostfangs? The Queen will want to see them. She always does.", "Mind the vines on the left, they've taken a liking to boots.", "Lord Goodfellow has hidden the steward's spectacles again.", "The Didomi leaves are whispering tonight. Something is coming.", "Have you heard? The Whispering Lake has fallen silent."] });
dkwSpot(-90, 60, 3, "The moonpetal blossoms", "look at the moonpetal", function () { dkbSay("🌸 " + dkQ("\"These are moonpetal blossoms,\" he explained, pointing to a cluster of luminous white flowers.")); }, H(-90, 60));
},
function (P, x, z, H, s, R, lite) {
var y = H(x, z), bark = dkwS("b:oak", 0x6A5848, 2), g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
g.add(new THREE.Mesh(dkwTaper([[0, -1.2, 0], [0, 1.5 * s, 0], [0, 9 * s, 0], [0, 16 * s, 0]], [1.6 * s, 0.75 * s, 0.5 * s, 0.28 * s], 10, 6), bark));
var cr = [];
for (var k = 0; k < (lite ? 3 : 6); k++) {
var c = new THREE.CylinderGeometry(2.8 * s + R() * 1.4 * s, 3.2 * s, 1.2 * s, 8);
c.translate((R() - 0.5) * 3 * s, 12 * s + k * 1.2 * s, (R() - 0.5) * 3 * s);
cr.push(c.index ? c.toNonIndexed() : c);
}
g.add(new THREE.Mesh(dkwMerge(cr), dkwM("cypressleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A6A34, map: dkwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; })));
var moss = dkwM("spanishmoss", function () {
var t = dkwCanvas("spmossT", 64, 256, function (c, W, Hh) { c.clearRect(0, 0, W, Hh); for (var j = 0; j < 90; j++) {
c.strokeStyle = "rgba(" + (140 + j % 40) + "," + (150 + j % 30) + "," + (130 + j % 20) + ",.8)";
c.lineWidth = 1 + (j % 3);
c.beginPath();
var sx = (j * 13) % W;
c.moveTo(sx, 0);
c.bezierCurveTo(sx + 6, Hh * 0.3, sx - 6, Hh * 0.6, sx + ((j % 5) - 2) * 4, Hh * (0.5 + ((j * 7) % 50) / 100));
c.stroke();
} });
var m = new THREE.MeshLambertMaterial({ map: t, transparent: true, alphaTest: 0.2, side: THREE.DoubleSide, depthWrite: false });
m.userData.noPhoto = 1;
return m;
});
for (k = 0; k < (lite ? 2 : 5); k++) {
var mm = new THREE.Mesh(new THREE.PlaneGeometry(1.4 * s, 4 * s), moss);
var a = R() * 6.28;
mm.position.set(Math.cos(a) * 2 * s, 10 * s - 1.4 * s, Math.sin(a) * 2 * s);
mm.rotation.y = a;
g.add(mm);
}
dkwRound(x, z, 0.9 * s);
return g;
},
function (P, x, z, r, h, n) {
var g = new THREE.Group();
P.add(g);
var R = wRand(n + r);
for (var L = 0; L < 2; L++) {
var pos = [];
for (var i = 0; i < n; i++) {
var px = x + (R() - 0.5) * 2 * r, pz = z + (R() - 0.5) * 2 * r, py = R() * h;
pos.push(px, py, pz, px + 0.05, py - 1.1, pz);
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
var ls = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: 0xA8B8D0, transparent: true, opacity: 0.45, depthWrite: false }));
ls.userData.kind = "float";
ls.userData.y0 = 0;
ls.userData.amp = 1.4;
ls.userData.f = 1.6;
ls.userData.ph = L * 1.6;
g.add(ls);
DKW.bob.push(ls);
}
return g;
},
function (G) {
var lite = dkwLite(), H = dkwBayouH, R = wRand(20020);
dkwTerrain(G, -600, -600, 1200, 1200, lite ? 20 : 10, H, dkwMat("lawn"), function (x, z, y, c) { var n = dkwFbm(x * 0.03, z * 0.03, 3), wet = y < 0.4 ? 1 : 0; c.setRGB(0.26 + n * 0.1 - wet * 0.08, 0.34 + n * 0.12 - wet * 0.06, 0.16 + n * 0.06); });
dkwWater(G, 0, -50, 1200, 64, -1.2, 0x4A4A2A, 0.9);
for (var i = 0; i < (lite ? 20 : 60); i++) {
var lx = -200 + R() * 400, lz = -50 + Math.sin(lx * 0.01) * 8 + (R() - 0.5) * 40;
var lp = new THREE.Mesh(new THREE.CircleGeometry(0.4 + R() * 0.4, 10, 0.3, 5.9), dkwLam(0x4A7A3A));
lp.rotation.x = -Math.PI / 2;
lp.position.set(lx, -1.15, lz);
G.add(lp);
}
for (i = 0; i < (lite ? 14 : 40); i++) {
var kx = -60 + R() * 120, kz = -34 + R() * 10;
dkwCyl(G, 0.1, 0.25, 0.6 + R() * 0.6, dkwS("b:oak", 0x6A5848, 2), kx, H(kx, kz) - 0.2, kz, 6);
}
dkwBox(G, 2, 0.2, 8, dkwS("b:planks", 0x7A6A54, 2), 6, -0.6, -34);
for (i = 0; i < 4; i++)
dkwCyl(G, 0.12, 0.12, 2.4, dkwMat("oak"), 5.2 + (i % 2) * 1.6, -1.9, -37 + Math.floor(i / 2) * 5, 6);
(function () { var pg = new THREE.Group(); pg.position.set(8.6, -1.05, -37); G.add(pg); var hull = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 5, 10, 1, false, 0, Math.PI), dkwS("b:planks", 0x5A4A34, 2)); hull.rotation.z = Math.PI / 2; hull.rotation.y = Math.PI / 2; pg.add(hull); dkwBox(pg, 0.06, 0.06, 3, dkwMat("oak"), 0.4, 0.3, 0); })();
dkwScatter(20030, lite ? 24 : 60, -300, -90, 300, -26, function (x, z) { return Math.abs(x) > 14 || z < -40; }, H, 0.9, 1.4).forEach(function (t) { dkcCypress(G, t.x, t.z, H, t.s, R, lite); });
dkwScatter(20031, lite ? 10 : 26, -200, 30, 200, 200, function (x, z) { return Math.abs(x) > 30 || z > 60; }, H, 1.0, 1.5).forEach(function (t) { dkcCypress(G, t.x, t.z, H, t.s * 1.1, R, lite); });
dkwPlant(G, "bush", dkwScatter(20032, lite ? 60 : 200, -300, -30, 300, 300, function (x, z) { return !(Math.abs(x) < 34 && z > -30 && z < 40) && Math.abs(x) > 4; }, H, 0.7, 1.4), { col: 0x3A5A2A });
dkwPlant(G, "fern", dkwScatter(20033, lite ? 60 : 220, -300, -40, 300, 300, function (x, z) { return !(Math.abs(x) < 30 && z > -28 && z < 36); }, H, 0.6, 1.2), { col: 0x4A6A30 });
(function () {
var x = 0, z = 0, y = H(0, 0) + 0.9, g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var bd = dkwS("b:planks", 0x8A8070, 2), wd = dkwMat("oak");
for (var k = 0; k < 8; k++)
dkwCyl(g, 0.15, 0.15, 1.4, wd, -5 + (k % 4) * 3.3, -1.4, -3.6 + Math.floor(k / 4) * 7.2, 6);
dkwBox(g, 12.4, 0.2, 9.4, bd, 0, -0.1, 0);
dkwBox(g, 12, 3.2, 0.2, bd, 0, 0, -4.4);
dkwBox(g, 0.2, 3.2, 9, bd, -6, 0, 0);
dkwBox(g, 0.2, 3.2, 9, bd, 6, 0, 0);
dkwBox(g, 4.6, 3.2, 0.2, bd, -3.9, 0, 4.4);
dkwBox(g, 4.6, 3.2, 0.2, bd, 3.9, 0, 4.4);
dkwBox(g, 2.8, 0.9, 0.2, bd, 0, 2.3, 4.4);
var th = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 9.6, 3.4, 4, 1), dkwS("b:moss", 0x8A7A4A, 2));
th.rotation.y = Math.PI / 4;
th.scale.set(1, 1, 0.78);
th.position.set(0, 4.9, 0);
g.add(th);
for (k = 0; k < 14; k++) {
var fr = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 1.2), dkwLam(0x7A6A3A, { ds: 1 }));
fr.position.set(-6.2 + k * 0.95, 3.0, 5.6);
fr.rotation.x = 0.5;
g.add(fr);
}
[[-3.6, 4.5], [3.6, 4.5], [-3, -4.5], [6.1, 0]].forEach(function (w, i) { var gl = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.1), dkwM("warpglass", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8A9A7A, emissive: 0x5A4A20, emissiveIntensity: 0.5, shininess: 90, transparent: true, opacity: 0.7 }); m.userData.noPhoto = 1; return m; })); gl.position.set(w[0], 1.7, w[1] + (i === 3 ? 0 : (w[1] > 0 ? 0.12 : -0.12))); if (i === 3) {
gl.rotation.y = Math.PI / 2;
gl.position.x = 6.12;
}
else if (w[1] < 0)
gl.rotation.y = Math.PI; g.add(gl); });
dkwBox(g, 12.4, 0.15, 3, dkwS("b:planks", 0x9A8A70, 2), 0, -0.08, 6);
var white = dkwS("b:planks", 0xE8E4D8, 1);
for (k = 0; k < 5; k++)
dkwBox(g, 0.18, 3, 0.18, white, -6 + k * 3, 0, 7.4);
dkwBox(g, 12.4, 0.12, 0.12, white, 0, 1, 7.4);
dkwBox(g, 12.4, 0.16, 0.3, white, 0, 3, 7.4);
for (k = 0; k < 26; k++)
if (Math.abs(-6 + k * 0.48) > 1.2)
dkwBox(g, 0.05, 0.9, 0.05, white, -6 + k * 0.48, 0.1, 7.4);
for (k = 0; k < 3; k++)
dkwBox(g, 2.4, 0.15, 0.5, bd, 0, -0.4 - k * 0.3, 7.8 + k * 0.5);
var lan = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), dkwGlowM(0xFFC86A, 0.9));
lan.position.set(2, 2.6, 7);
g.add(lan);
if (!lite) {
var PL = new THREE.PointLight(0xFFB85A, 0.8, 14, 2);
PL.position.set(2, 2.4, 7);
g.add(PL);
}
[[-4, 5.6], [-3, 6.2], [4.4, 5.4]].forEach(function (c) { dkwBox(g, 0.7, 0.5, 0.5, dkwS("b:planks", 0x7A6A4A, 2), c[0], 0, c[1]); });
dkwSolid(x, z, 12.4, 9.4, y - 2, y + 5, 0);
dkwFloor(x, z + 6, 12.4, 3, y);
})();
dkwDoorTo(G, "bayou", 0, 0, 4.7, 0, "The door of the hut", 12, 9, { col: 0x5A4A34, frame: dkwS("b:planks", 0xE8E4D8, 1), y: H(0, 0) + 0.9 });
(function () {
var gx = -22, gz = 14;
for (var r = 0; r < 6; r++) {
var bz = gz - 6 + r * 2.4;
dkwBox(G, 12, 0.25, 1.2, dkwS("b:moss", 0x4A3A28, 2), gx, H(gx, bz) - 0.05, bz);
dkwPlant(G, "bush", dkwScatter(20040 + r, lite ? 6 : 14, gx - 5.5, bz - 0.4, gx + 5.5, bz + 0.4, null, function (x, z) { return H(x, z) + 0.2; }, 0.25, 0.4), { col: [0x4A7A3A, 0x5A8A3A, 0x3A6A2A][r % 3], keepAll: 1 });
}
dkcFlowers(G, dkwScatter(20050, lite ? 20 : 50, gx - 8, gz - 10, gx + 8, gz - 7, null, function (x, z) { return H(x, z) + 0.7; }, 0.18, 0.3), [0xC81A2A, 0xE84A5A, 0xFFE8E8]);
for (var k = 0; k < 6; k++) {
var sx = gx + 7.5, sz = gz - 5 + k * 2, sy = H(sx, sz);
dkwCyl(G, 0.04, 0.05, 2.2, dkwLam(0x5A7A2A), sx, sy, sz, 5);
var hd = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.08, 12), dkwLam(0xE8B81A));
hd.rotation.x = 1.2;
hd.position.set(sx, sy + 2.2, sz + 0.1);
G.add(hd);
var ce = new THREE.Mesh(new THREE.CircleGeometry(0.14, 10), dkwLam(0x2A1A0A));
ce.position.set(sx, sy + 2.24, sz + 0.16);
ce.rotation.x = 1.2 - Math.PI / 2;
G.add(ce);
}
var fy = H(gx, gz + 8);
dkwBox(G, 1.6, 0.08, 0.08, dkwMat("oak"), gx, fy + 1.6, gz + 8);
dkwCyl(G, 0.05, 0.05, 2, dkwMat("oak"), gx, fy, gz + 8, 5);
dkwBox(G, 0.8, 1, 0.4, dkwS("b:quilt", 0x6A5A4A, 1), gx, fy + 0.8, gz + 8);
})();
(function () {
var hx = 18, hz = 12, hy = H(hx, hz);
dkwHouse(G, hx + 4, hz - 3, 3, 2.4, 1.6, { y: hy, wall: dkwS("b:planks", 0x7A6A54, 2), roof: dkwS("b:planks", 0x5A4A3A, 2), shut: 0x4A3A2A });
for (var k = 0; k < 16; k++)
dkwCyl(G, 0.04, 0.04, 1, dkwMat("oak"), hx - 5 + (k % 8) * 1.4, H(hx - 5 + (k % 8) * 1.4, hz + (k < 8 ? -5 : 5)), hz + (k < 8 ? -5 : 5), 4);
for (k = 0; k < (lite ? 5 : 10); k++) {
var cx = hx - 4 + R() * 8, cz = hz - 4 + R() * 8, cy = H(cx, cz);
var hen = new THREE.Group();
hen.position.set(cx, cy, cz);
hen.rotation.y = R() * 6.28;
G.add(hen);
var bd = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), dkwLam([0xE8E0D0, 0x8A4A2A, 0x2A2420][k % 3]));
bd.scale.set(1, 0.9, 1.3);
bd.position.y = 0.22;
hen.add(bd);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), dkwLam([0xE8E0D0, 0x8A4A2A, 0x2A2420][k % 3]));
hd.position.set(0, 0.4, 0.18);
hen.add(hd);
var cb = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.06, 0.08), dkwLam(0xC81A1A));
cb.position.set(0, 0.48, 0.18);
hen.add(cb);
}
})();
var ear = new THREE.Mesh(new THREE.CircleGeometry(5, 32), dkwLam(0x5A4A34));
ear.rotation.x = -Math.PI / 2;
ear.position.set(0, H(0, -22) + 0.04, -22);
G.add(ear);
var circ = new THREE.Group();
G.add(circ);
for (i = 0; i < 36; i++) {
var a = i / 36 * Math.PI * 2, px = Math.cos(a) * 4, pz = -22 + Math.sin(a) * 4;
var pt = new THREE.Mesh(new THREE.CircleGeometry(0.1, 6), dkwLam(0xC81A2A, { ds: 1 }));
pt.rotation.x = -Math.PI / 2;
pt.position.set(px, H(px, pz) + 0.07, pz);
circ.add(pt);
if (i % 3 === 0) {
var st = new THREE.Mesh(new THREE.IcosahedronGeometry(0.14, 1), dkwLam(0x8A8478));
st.scale.y = 0.5;
st.position.set(Math.cos(a) * 4.4, H(px, pz) + 0.06, -22 + Math.sin(a) * 4.4);
circ.add(st);
}
}
var sig = new THREE.Mesh(new THREE.CircleGeometry(2.2, 40), dkwM("simbisigil", function () {
var t = dkwCanvas("simbisigilT", 256, 256, function (c, W, Hh) {
c.clearRect(0, 0, W, Hh);
c.strokeStyle = "rgba(240,236,224,.95)";
c.lineWidth = 5;
c.beginPath();
c.arc(128, 128, 100, 0, 7);
c.stroke();
c.beginPath();
c.moveTo(128, 40);
c.bezierCurveTo(200, 80, 60, 120, 128, 160);
c.bezierCurveTo(190, 190, 80, 210, 128, 230);
c.stroke();
for (var j = 0; j < 6; j++) {
var a = j / 6 * Math.PI * 2;
c.beginPath();
c.arc(128 + Math.cos(a) * 70, 128 + Math.sin(a) * 70, 12, 0, 4);
c.stroke();
}
c.beginPath();
c.moveTo(60, 128);
c.lineTo(196, 128);
c.stroke();
});
var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false });
m.userData.noPhoto = 1;
return m;
}));
sig.rotation.x = -Math.PI / 2;
sig.position.set(0, H(0, -22) + 0.08, -22);
circ.add(sig);
dkwShow("circle", circ, false);
var snake = new THREE.Group();
snake.position.set(0, H(0, -22), -22);
G.add(snake);
for (i = 0; i < 24; i++) {
var sp = new THREE.Mesh(new THREE.SphereGeometry(0.2 - i * 0.006, 8, 6), dkwGlowM(0xF0F4F8, 0.45));
sp.position.set(Math.sin(i * 0.6) * 0.7, 0.3 + i * 0.12, Math.cos(i * 0.6) * 0.7);
snake.add(sp);
}
snake.userData.kind = "float";
snake.userData.y0 = snake.position.y;
snake.userData.amp = 0.2;
snake.userData.f = 0.8;
snake.userData.ph = 0;
DKW.bob.push(snake);
dkwShow("simbi", snake, false);
[[-5.4, -20], [-5.2, -24]].forEach(function (s) { dkwCyl(G, 0.25, 0.25, 0.5, dkwMat("oak"), s[0], H(s[0], s[1]), s[1], 8); });
dkwStrip(G, [[0, 10], [0, 40], [4, 80], [20, 140], [60, 200]], 3, function (x, z) { return H(x, z) + 0.04; }, dkwMat("earth"), 0.04);
for (i = 0; i < 20; i++) {
[-1, 1].forEach(function (sd) { var fx = sd * (3 + i * 1.6), fz = 40; if (Math.abs(fx) < 2.4)
return; dkwCyl(G, 0.08, 0.08, 1.2, dkwMat("oak"), fx, H(fx, fz), fz, 5); });
}
dkwBox(G, 32, 0.1, 0.1, dkwMat("oak"), 18.6, H(18, 40) + 1, 40);
dkwBox(G, 32, 0.1, 0.1, dkwMat("oak"), -18.6, H(-18, 40) + 1, 40);
[[-80, 60, 0.3], [90, 32, -0.4], [-60, 130, 0.1], [120, 120, -0.2]].forEach(function (s) { dkwHouse(G, s[0], s[1], 7, 6, 3, { y: H(s[0], s[1]) + 0.6, ry: s[2], wall: dkwS("b:planks", [0x8A7A64, 0x7A6A5A][Math.abs(s[0]) % 2], 2), roof: dkwS("b:slate", 0x5A5048, 2), shut: 0x3A4A3A }); });
(function () { var mx = -150, mz = -30, my = H(mx, mz); dkwHouse(G, mx, mz, 12, 9, 6, { y: my, wall: dkwS("b:planks", 0x6A5A48, 2), roof: dkwS("b:slate", 0x4A4440, 2), shut: 0x3A3A2A }); var wh = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 0.8, 16), dkwS("b:planks", 0x5A4A3A, 2)); wh.rotation.x = Math.PI / 2; wh.position.set(mx, my + 2, mz - 5.6); G.add(wh); wh.userData.sp = 0.3; DKW.spin.push(wh); })();
(function () {
var gx = 64, gz = 92;
for (var k = 0; k < 22; k++) {
var tx = gx - 14 + (k % 6) * 5.4 + (R() - 0.5), tz = gz - 10 + Math.floor(k / 6) * 5 + (R() - 0.5), ty = H(tx, tz);
if (Math.abs(tx - gx) < 3 && Math.abs(tz - gz) < 3)
continue;
if (k % 3 === 0) {
dkwBox(G, 0.12, 1.3, 0.12, dkwS("b:planks", 0xE0DCD0, 1), tx, ty, tz);
dkwBox(G, 0.7, 0.12, 0.12, dkwS("b:planks", 0xE0DCD0, 1), tx, ty + 0.9, tz);
}
else
dkwBox(G, 0.7, 0.9 + R() * 0.4, 0.18, dkwS("b:limestone", 0xB8B4A8, 2), tx, ty, tz, (R() - 0.5) * 0.2);
}
for (k = 0; k < 40; k++) {
var a = k / 40 * Math.PI * 2, fx = gx + Math.cos(a) * 22, fz = gz + Math.sin(a) * 18;
if (Math.abs(a - Math.PI * 0.75) < 0.12)
continue;
dkwCyl(G, 0.03, 0.03, 1, dkwMat("iron"), fx, H(fx, fz), fz, 4);
}
var gr = new THREE.Group();
G.add(gr);
var gy = H(gx, gz);
var pit = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.4), dkwLam(0x1A1208));
pit.rotation.x = -Math.PI / 2;
pit.position.set(gx, gy + 0.03, gz);
gr.add(pit);
dkwBox(gr, 1.6, 0.5, 1, dkwMat("earth"), gx + 1.6, gy, gz);
var cof = new THREE.Group();
cof.position.set(gx, gy, gz + 3);
gr.add(cof);
[-0.8, 0.8].forEach(function (s) { dkwBox(cof, 0.12, 0.7, 1, dkwMat("oak"), 0, 0, s); });
dkwBox(cof, 0.7, 0.5, 2.1, dkwS("b:planks", 0xC8B48A, 1), 0, 0.7, 0);
for (k = 0; k < 12; k++) {
var ca = k / 12 * Math.PI * 2, cx = gx + Math.cos(ca) * 1.8, cz = gz + Math.sin(ca) * 2.4;
dkwCyl(G, 0.05, 0.05, 0.14, dkwLam(0xF0ECE0), cx, H(cx, cz), cz, 6);
var fl = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.08, 6), dkwGlowM(0xFFC86A, 0.9));
fl.position.set(cx, H(cx, cz) + 0.2, cz);
gr.add(fl);
}
dkwShow("grave", gr, false);
[[gx - 24, gz - 10], [gx + 22, gz + 6], [gx - 8, gz + 24], [gx + 16, gz - 20]].forEach(function (o) {
var oy = H(o[0], o[1]), bark = dkwS("b:oak", 0x4A3E30, 2);
G.add(new THREE.Mesh(dkwTaper([[o[0], oy - 1, o[1]], [o[0], oy + 5, o[1]], [o[0] + 2, oy + 8, o[1]]], [1.4, 1.1, 0.8], 12, 6), bark));
dkwRound(o[0], o[1], 1.4);
for (var j = 0; j < 6; j++) {
var a = j / 6 * 6.28;
G.add(new THREE.Mesh(dkwTaper([[o[0], oy + 6, o[1]], [o[0] + Math.cos(a) * 7, oy + 9, o[1] + Math.sin(a) * 7], [o[0] + Math.cos(a) * 13, oy + 8, o[1] + Math.sin(a) * 13]], [0.7, 0.4, 0.15], 8, 5), bark));
}
dkcCypress(G, o[0] + 0.01, o[1] + 0.01, function () { return oy - 4; }, 1.2, R, lite);
});
})();
dkwShow("rain", dkcRain(G, 0, 0, 60, 30, lite ? 400 : 1400), false);
var mob = new THREE.Group();
G.add(mob);
for (i = 0; i < (lite ? 8 : 18); i++) {
var tx = -10 + R() * 20, tz = 14 + R() * 10;
dkwCyl(mob, 0.03, 0.04, 1.2, dkwMat("oak"), tx, H(tx, tz) + 0.6, tz, 5);
var fl = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.4, 8), dkwGlowM(0xFF8A2A, 0.9));
fl.position.set(tx, H(tx, tz) + 2, tz);
fl.userData.kind = "float";
fl.userData.y0 = fl.position.y;
fl.userData.amp = 0.05;
fl.userData.f = 3;
fl.userData.ph = i;
mob.add(fl);
DKW.bob.push(fl);
}
if (!lite) {
var ML = new THREE.PointLight(0xFF8A3A, 1.2, 40, 2);
ML.position.set(0, H(0, 18) + 3, 18);
mob.add(ML);
}
dkwShow("torches", mob, false);
var ghosts = new THREE.Group();
G.add(ghosts);
for (i = 0; i < (lite ? 6 : 12); i++) {
var gx2 = -12 + R() * 24, gz2 = 10 + R() * 14, gy2 = H(gx2, gz2);
var gh = new THREE.Mesh(dkwTaper([[0, 0, 0], [0, 1, 0], [0, 1.6, 0], [0, 1.85, 0]], [0.08, 0.32, 0.22, 0.16], 10, 6), dkwM("ghostM", function () { var m = new THREE.MeshBasicMaterial({ color: 0xB8E8D8, transparent: true, opacity: 0.38, depthWrite: false, blending: THREE.AdditiveBlending }); m.userData.noPhoto = 1; return m; }));
gh.position.set(gx2, gy2 + 0.3, gz2);
gh.userData.kind = "float";
gh.userData.y0 = gh.position.y;
gh.userData.amp = 0.3;
gh.userData.f = 0.5;
gh.userData.ph = i;
ghosts.add(gh);
DKW.bob.push(gh);
var eye = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 4), dkwGlowM(0xE8FFF0, 1));
eye.position.set(gx2 + 0.07, gy2 + 2, gz2 + 0.15);
ghosts.add(eye);
var eye2 = eye.clone();
eye2.position.x -= 0.14;
ghosts.add(eye2);
}
dkcMotes(ghosts, lite ? 40 : 120, 0, 18, 14, 0.3, 4, 0xB8FFE8);
dkwShow("dead", ghosts, false);
dkcMotes(G, lite ? 60 : 160, 0, -10, 80, 0.5, 4, 0xE8FF8A);
},
function () {
return dkwM("ironlace", function () {
var t = dkwCanvas("ironlaceT", 256, 64, function (c, W, Hh) {
c.clearRect(0, 0, W, Hh);
c.strokeStyle = "#16161A";
c.lineWidth = 3;
c.strokeRect(1, 2, W - 2, Hh - 4);
for (var i = 0; i < 16; i++) {
var x = 8 + i * 16;
c.beginPath();
c.moveTo(x, 4);
c.lineTo(x, Hh - 4);
c.stroke();
c.beginPath();
c.arc(x + 8, Hh / 2, 6, 0, 7);
c.stroke();
c.beginPath();
c.moveTo(x + 2, 12);
c.quadraticCurveTo(x + 8, 2, x + 14, 12);
c.stroke();
c.beginPath();
c.moveTo(x + 2, Hh - 12);
c.quadraticCurveTo(x + 8, Hh - 2, x + 14, Hh - 12);
c.stroke();
}
});
t.wrapS = THREE.RepeatWrapping;
var m = new THREE.MeshLambertMaterial({ map: t, transparent: true, alphaTest: 0.3, side: THREE.DoubleSide });
m.userData.noPhoto = 1;
return m;
});
},
function (P, x, z, w, d, fl, side, o) {
o = o || {};
var y = dkwLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
P.add(g);
var R = wRand(Math.round(x * 3 + z * 7)), fh = 3.6, H = fl * fh;
var col = o.col || [0xE8C8A8, 0xC8D8C0, 0xE8D0D8, 0xD8C8E0, 0xF0E0B0, 0xC8B8A0, 0xE0B8A0][Math.floor(R() * 7)];
dkwBox(g, w, H, d, dkwS("b:stucco", col, 2), 0, 0, 0);
dkwBox(g, w + 0.3, 0.5, d + 0.3, dkwS("b:stucco", 0xE8E4DC, 2), 0, H, 0);
dkwBox(g, w * 0.9, 1.1, 0.3, dkwS("b:slate", 0x4A4A52, 2), 0, H + 0.5, -d / 2 + 1.2);
var shut = dkwLam([0x2A5A3A, 0x2A3A5A, 0x5A2A2A, 0x3A4A3A][Math.floor(R() * 4)]), front = d / 2 + 0.02, n = Math.max(2, Math.floor(w / 3.2));
for (var f = 0; f < fl; f++)
for (var i = 0; i < n; i++) {
var dx = -w / 2 + w / n * (i + 0.5);
var dr = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 2.6), f === 0 ? dkwGlowM(o.glow || 0xFFC890, 0.6) : dkwGlowM(R() < 0.5 ? 0xFFD8A0 : 0x2A2420, f === 0 ? 0.6 : 0.85));
dr.position.set(dx, f * fh + 1.4, front);
g.add(dr);
[-1, 1].forEach(function (s) { var sh = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 2.7), shut); sh.position.set(dx + s * 1.0, f * fh + 1.4, front + 0.02); g.add(sh); });
}
var lace = dkcIronLace(), iron = dkwLam(0x16161A);
for (f = 1; f < fl; f++) {
var gy = f * fh;
dkwBox(g, w, 0.15, 1.8, dkwS("b:planks", 0x5A4A3A, 2), 0, gy - 0.15, d / 2 + 0.9);
var rl = new THREE.Mesh(new THREE.PlaneGeometry(w, 1.0), lace);
rl.material.map.repeat.set(w / 4, 1);
rl.position.set(0, gy + 0.5, d / 2 + 1.78);
g.add(rl);
for (var k = 0; k <= Math.floor(w / 3); k++)
dkwBox(g, 0.08, fh, 0.08, iron, -w / 2 + k * (w / Math.floor(w / 3)), gy - fh + (f === 1 ? 0 : 0), d / 2 + 1.75);
if (R() < 0.7)
for (k = 0; k < 3; k++) {
var fx = -w / 2 + w * (k + 0.5) / 3;
dkwCyl(g, 0.01, 0.01, 0.6, iron, fx, gy + fh - 1.1, d / 2 + 1.6, 3);
var fern = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 6), dkwLam(0x3A6A2A));
fern.scale.y = 0.7;
fern.position.set(fx, gy + fh - 1.3, d / 2 + 1.6);
g.add(fern);
}
}
if (o.sign)
dkcNeon(g, o.sign, 0, fh - 0.5, front + 0.1, 0, o.neon || 0xFF6AB8, 0.9, { face: o.face || "Georgia", font: "bold " });
if (o.lamp !== false) {
var gl = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), dkwGlowM(0xFFC86A, 0.9));
gl.position.set(w / 2 - 0.6, 2.6, front + 0.25);
g.add(gl);
}
var c = Math.cos(g.rotation.y), s = Math.sin(g.rotation.y);
dkwSolid(x, z, Math.abs(c) * w + Math.abs(s) * d, Math.abs(s) * w + Math.abs(c) * d, y - 2, y + H + 2, 0);
return g;
},
function (G) {
var lite = dkwLite(), H = dkwQuarterH, R = wRand(21021);
dkwTerrain(G, -500, -500, 1000, 1000, lite ? 24 : 12, H, dkwS("b:ashlar", 0x5A5450, 6), function (x, z, y, c) { var n = dkwFbm(x * 0.05, z * 0.05, 2); c.setRGB(0.36 + n * 0.06, 0.34 + n * 0.06, 0.32 + n * 0.06); });
dkwStrip(G, [[0, 240], [0, -210]], 8, function (x, z) { return H(x, z) + 0.05; }, dkwS("b:darktile", 0x2A2A2E, 3, { shine: 30 }), 0.05);
[-1, 1].forEach(function (s) { dkwStrip(G, [[s * 5.6, 240], [s * 5.6, -210]], 3.2, function (x, z) { return H(x, z) + 0.18; }, dkwS("b:ashlar", 0x8A8278, 3), 0.18); });
for (var i = 0; i < (lite ? 8 : 20); i++) {
var px = (R() - 0.5) * 7, pz = -200 + R() * 430;
dkwWater(G, px, pz, 1.2 + R() * 2, 0.8 + R() * 1.4, H(px, pz) + 0.07, 0x2A1E3A, 0.55);
}
dkcLamps(G, (function () { var L = []; for (var z = 230; z > -200; z -= 22) {
L.push([-7.6, z, Math.PI / 2]);
L.push([7.6, z + 11, -Math.PI / 2]);
} return L; })(), H, 0xFFC878);
var signs = ["BOURBON HOUSE", "JAZZ", "BAR", "OYSTERS", "BODEGA", "HOT BOILED CRAWFISH", "LIVE MUSIC", "POOR BOYS", "PRALINES", "HURRICANES", "VOODOO", "LOUNGE", "BEIGNETS", "DAIQUIRIS"];
var neons = [0xFF5A8A, 0x6AE8FF, 0xFFC86A, 0x9AFF6A, 0xFF6A3A, 0xC88AFF];
[-1, 1].forEach(function (side) {
var z = 226;
var k = 0;
while (z > -196) {
var w = 8 + Math.floor(R() * 3) * 2;
if (Math.abs(z - 100) < w / 2 + 4 || Math.abs(z + 80) < w / 2 + 4) {
z -= w + 8;
continue;
}
var fl = 2 + (R() < 0.6 ? 1 : 0) + (R() < 0.2 ? 1 : 0);
if (side > 0 && Math.abs(z - w / 2 - 60) < w / 2 + 1)
fl = 3;
dkcCreole(G, side * (7.6 + 6), z - w / 2, w, 12, fl, side, { sign: k % 2 === 0 ? signs[(k + (side > 0 ? 5 : 0)) % signs.length] : null, neon: neons[k % neons.length] });
z -= w + 0.2;
k++;
}
});
[100, -80].forEach(function (cz) { dkwStrip(G, [[-240, cz], [240, cz]], 7, function (x, z) { return H(x, z) + 0.04; }, dkwS("b:darktile", 0x2A2A2E, 3), 0.04); });
(function () {
var y = H(13.6, 60);
dkwFloor(6.7, 60, 1.8, 8, y + 7.2);
dkwSolid(5.75, 60, 0.3, 8, y + 7.2, y + 8.4, 0);
dkwSolid(6.7, 64.1, 1.8, 0.3, y + 7.2, y + 8.4, 0);
dkwSolid(6.7, 55.9, 1.8, 0.3, y + 7.2, y + 8.4, 0);
var chair = dkwS("b:oak", 0x4A3A2A, 2);
dkwBox(G, 0.5, 0.45, 0.5, chair, 7.1, y + 7.2, 62.2);
var bot = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.3, 8), dkwM("ryebottle", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8A4A1A, transparent: true, opacity: 0.75, shininess: 90 }); m.userData.noPhoto = 1; return m; }));
bot.position.set(7.1, y + 7.85, 62.2);
G.add(bot);
var cd = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), dkwGlowM(0xFFC86A, 0.95));
cd.position.set(5.9, y + 8.5, 58.2);
G.add(cd);
})();
dkwDoorTo(G, "quarter", 0, -7.4, 120, Math.PI / 2, "Madame Toussaint's door", 10, 6, { col: 0x2A3A2A, frame: dkwS("b:stucco", 0xE8E4DC, 2), y: H(-7.4, 120) + 0.18 });
(function () { var bx = -3, bz = 14; for (var j = 0; j < 5; j++) {
var hr = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 6, 14), dkwShine(0xE8C04A, 0.25, 0.9));
hr.position.set(bx - 2 + j, 1.5, bz - 0.4);
g0(hr);
} function g0(m) { G.add(m); } dkwCyl(G, 0.4, 0.4, 0.5, dkwLam(0xE8E0D0), bx + 3, H(bx + 3, bz), bz, 14); })();
(function () {
var cz = -280, y = H(0, cz), wh = dkwS("b:stucco", 0xF4F2EC, 2), sl = dkwS("b:slate", 0x3A3C44, 2);
dkwBox(G, 30, 16, 24, wh, 0, y, cz);
dkwBox(G, 31, 1, 25, dkwS("b:stucco", 0xE8E4DC, 2), 0, y + 16, cz);
[[-12, 24, 5], [12, 24, 5], [0, 30, 6]].forEach(function (t) { dkwBox(G, t[2], t[1], t[2], wh, t[0], y, cz + 10); var sp = new THREE.Mesh(new THREE.ConeGeometry(t[2] * 0.62, t[1] * 0.6, 4), sl); sp.rotation.y = Math.PI / 4; sp.position.set(t[0], y + t[1] + t[1] * 0.3, cz + 10); G.add(sp); });
for (var j = 0; j < 3; j++) {
var dr = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 4.4), dkwLam(0x3A2A1A));
dr.position.set(-8 + j * 8, y + 2.2, cz + 12.6);
G.add(dr);
}
var clk = new THREE.Mesh(new THREE.CircleGeometry(1.4, 24), dkwLam(0xF0ECE0));
clk.position.set(0, y + 22, cz + 13.05);
G.add(clk);
dkwSolid(0, cz, 30, 24, y - 2, y + 60, 0);
dkwSolid(0, cz + 10, 30, 5, y - 2, y + 60, 0);
for (j = 0; j < 40; j++) {
var fx = -30 + j * 1.5;
dkwCyl(G, 0.03, 0.03, 1.4, dkwLam(0x16161A), fx, H(fx, -250), -250, 4);
}
dkwPlant(G, "tree", dkwScatter(21030, lite ? 6 : 14, -36, -248, 36, -212, function (x) { return Math.abs(x) > 6; }, H, 1.1, 1.5), { col: 0x3A5A2A });
var stat = new THREE.Group();
stat.position.set(0, H(0, -232), -232);
G.add(stat);
dkwBox(stat, 3, 2.4, 3, dkwS("b:marble", 0xE8E4DC, 2), 0, 0, 0);
dkwBox(stat, 1.2, 1.4, 2.4, dkwShine(0x2A3A2A, 0.4, 0.7), 0, 2.4, 0);
dkwCyl(stat, 0.25, 0.3, 1.4, dkwShine(0x2A3A2A, 0.4, 0.7), 0, 3.8, 0.3, 8);
dkwRound(0, -232, 2.2);
})();
dkwCrowd(21050, lite ? 14 : 36, -6, -190, 6, 230, { dress: "dktown", dressF: "dktown", wander: 30, names: ["A tourist with a go-cup", "A street musician", "A doorman at a club", "A tarot reader at a folding table", "A man selling roses", "A drunk bachelorette", "A shoeshine boy", "A sax player on a stoop"], says: ["Hey! Laissez les bons temps rouler!", "Tell your future for five dollars, sugar.", "They say there's a girl who fixes what's broke. Mambo Z, they call her.", "Don't drink the hurricanes, they'll knock you flat.", "Rose for the lady?", "Cathedral bells at six. You'll hear 'em even through this."] });
dkcMotes(G, lite ? 40 : 120, 0, 0, 220, 2, 12, 0xFFD8A8);
dkwShow("qrain", dkcRain(G, 0, 100, 60, 26, lite ? 400 : 1200), false);
},
function (g, col) {
var h = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), dkwShine(0x6A6A72, 0.3, 0.85));
h.position.y = 1.66;
g.add(h);
for (var i = 0; i < 5; i++) {
var a = i / 5 * Math.PI * 2;
var sp = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.14, 5), dkwGlowM(col || 0x6AB8FF, 0.9));
sp.position.set(Math.cos(a) * 0.1, 1.8, Math.sin(a) * 0.1);
g.add(sp);
}
},
function (G) {
var lite = dkwLite(), H = dkwWestH, R = wRand(23023);
dkwTerrain(G, -900, -300, 1800, 1200, lite ? 24 : 12, H, dkwS("b:strata", 0x9A9AA0, 6), function (x, z, y, c) { var n = dkwFbm(x * 0.02, z * 0.02, 3), snow = Math.max(0, Math.min(1, (y - 60) / 80)); c.setRGB(0.5 + n * 0.1 + snow * 0.4, 0.5 + n * 0.1 + snow * 0.42, 0.52 + n * 0.1 + snow * 0.44); });
[[-300, -500, 420], [0, -620, 560], [300, -480, 460], [560, -300, 360], [-560, -260, 340]].forEach(function (p) { var pk = new THREE.Mesh(new THREE.ConeGeometry(p[2] * 0.55, p[2], 10), dkwS("b:strata", 0x8A8A92, 8)); pk.position.set(p[0], p[2] / 2 + 100, p[1]); G.add(pk); var cap = new THREE.Mesh(new THREE.ConeGeometry(p[2] * 0.28, p[2] * 0.5, 10), dkwLam(0xF4F6FA)); cap.position.set(p[0], p[2] * 0.76 + 100, p[1]); G.add(cap); });
dkwStrip(G, [[0, 660], [-30, 560], [30, 500], [-30, 420], [30, 360], [24, 300], [-20, 240], [-10, 190], [20, 140], [30, 96], [42, 82]], 2.6, function (x, z) { return H(x, z) + 0.06; }, dkwMat("gravel"), 0.06);
dkwPlant(G, "conifer", dkwScatter(23030, lite ? 50 : 140, -300, 100, 300, 700, function (x, z) { return Math.abs(x - (z > 300 ? 0 : 10)) > 12; }, H, 0.5, 0.9), { col: 0x2A4A30 });
for (var i = 0; i < (lite ? 24 : 70); i++) {
var bx = -200 + R() * 400, bz = 120 + R() * 560;
if (Math.abs(bx) < 10)
continue;
var bo = new THREE.Mesh(new THREE.IcosahedronGeometry(1 + R() * 2.2, 1), dkwS("b:strata", 0x8A8A82, 2));
bo.scale.y = 0.7;
bo.position.set(bx, H(bx, bz), bz);
G.add(bo);
dkwRound(bx, bz, 1.4);
}
(function () { var x = 30, z = 294, y = H(x, z); dkwBox(G, 10, 2, 6, dkwS("b:strata", 0x7A7A7A, 3), x, y + 5, z - 3, 0.1); dkwBox(G, 10, 7, 2, dkwS("b:strata", 0x7A7A7A, 3), x, y - 1, z - 6); dkwSolid(x, z - 6, 10, 2, y - 2, y + 7, 0); dkwBox(G, 2.4, 0.6, 1.2, dkwS("b:strata", 0x8A8A82, 2), x - 2, y, z); })();
for (i = 0; i < (lite ? 40 : 120); i++) {
var sx = -40 + R() * 60, sz = 170 + R() * 40;
var st = new THREE.Mesh(new THREE.DodecahedronGeometry(0.2 + R() * 0.4, 0), dkwS("b:strata", 0x9A9890, 2));
st.position.set(sx, H(sx, sz) + 0.1, sz);
G.add(st);
}
(function () {
var cl = dkwS("b:strata", 0x6A6A72, 6);
dkwBox(G, 140, 180, 30, cl, 90, 80, -2);
dkwSolid(90, -2, 140, 30, -50, 400, 0);
var vein = new THREE.Mesh(dkwTaper([[30, 120, 13.2], [60, 160, 13.2], [90, 190, 13.2], [120, 230, 13.2], [150, 250, 13.2]], [2.2, 3, 2.4, 2.8, 1.6], 12, 4), dkwM("gemvein", function () { var m = new THREE.MeshPhongMaterial({ color: 0x6AB8FF, emissive: 0x3A6AD8, emissiveIntensity: 0.9, shininess: 140, transparent: true, opacity: 0.9 }); m.userData.noPhoto = 1; return m; }));
G.add(vein);
var vein2 = new THREE.Mesh(dkwTaper([[40, 150, 13.3], [75, 170, 13.3], [100, 210, 13.3]], [1.2, 1.6, 1.0], 10, 4), dkwGlowM(0xFFC84A, 0.85));
G.add(vein2);
var mw = new THREE.Mesh(new THREE.PlaneGeometry(26, 20), dkwM("metalwall", function () {
var t = dkwCanvas("metalwallT", 256, 192, function (c, W, Hh) { c.fillStyle = "#4A4E56"; c.fillRect(0, 0, W, Hh); for (var j = 0; j < 30; j++) {
c.strokeStyle = "rgba(140,200,255,.85)";
c.lineWidth = 2 + (j % 3);
c.beginPath();
var x0 = (j * 37) % W;
c.moveTo(x0, 0);
c.lineTo(x0 + ((j % 5) - 2) * 20, Hh * 0.5);
c.lineTo(x0 + ((j % 3) - 1) * 30, Hh);
c.stroke();
} for (j = 0; j < 14; j++) {
c.strokeStyle = "#2A2C30";
c.strokeRect((j % 7) * 36 + 4, Math.floor(j / 7) * 96 + 4, 30, 88);
} });
var m = new THREE.MeshPhongMaterial({ map: t, emissive: 0x2A4A7A, emissiveMap: t, emissiveIntensity: 0.6, shininess: 80, specular: 0x8A9AB8 });
m.userData.noPhoto = 1;
return m;
}));
mw.position.set(72, 150, 13.1);
G.add(mw);
var gt = new THREE.Mesh(new THREE.PlaneGeometry(7, 10), dkwM("dwarfgate", function () {
var t = dkwCanvas("dwarfgateT", 128, 192, function (c, W, Hh) { c.fillStyle = "#2A2622"; c.fillRect(0, 0, W, Hh); c.strokeStyle = "#5A544A"; c.lineWidth = 4; for (var j = 0; j < 6; j++)
c.strokeRect(6, 6 + j * 30, W - 12, 26); c.fillStyle = "rgba(255,200,90,.9)"; c.font = "bold 16px serif"; for (j = 0; j < 12; j++)
c.fillText("ᚦᚨᛞᚱᛖᚹ".charAt(j % 6), 14 + (j % 4) * 28, 30 + Math.floor(j / 4) * 60); });
var m = new THREE.MeshPhongMaterial({ map: t, emissive: 0x8A5A1A, emissiveMap: t, emissiveIntensity: 0.7, shininess: 60 });
m.userData.noPhoto = 1;
return m;
}));
gt.position.set(72, 145, 13.15);
G.add(gt);
[[66, 0], [78, 0]].forEach(function (a) { dkwBox(G, 2.6, 4, 2, cl, a[0], 140, 14.4); });
})();
dkwWater(G, 110, 40, 30, 300, 72, 0x1A2A3A, 0.95);
for (i = 0; i < (lite ? 8 : 20); i++) {
var ix = 100 + R() * 20, iz = -40 + R() * 200;
var ic = new THREE.Mesh(new THREE.CircleGeometry(2 + R() * 3, 8), dkwLam(0xE8F0F8));
ic.rotation.x = -Math.PI / 2;
ic.position.set(ix, 72.2, iz);
G.add(ic);
}
(function () {
var pts = [[42, 82, H(42, 82)], [50, 72, 160], [56, 62, 152], [60, 54, 146], [66, 46, 140.2]], stone = dkwS("b:strata", 0x7A7A7A, 3), iron = dkwMat("iron");
for (var k = 0; k < pts.length - 1; k++) {
var a = pts[k], b = pts[k + 1], mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]), ry = Math.atan2(b[0] - a[0], b[1] - a[1]);
var sl = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1, L + 0.6), stone);
sl.position.set(mx, (a[2] + b[2]) / 2 - 0.5, mz);
sl.rotation.y = ry;
sl.rotation.x = Math.atan2(a[2] - b[2], L);
G.add(sl);
dkwRamp(mx, mz, 2.4, L + 0.6, a[2], b[2], ry);
dkwCyl(G, 0.05, 0.05, 1.2, iron, a[0] - Math.cos(ry) * 1.1, a[2], a[1] + Math.sin(ry) * 1.1, 5);
var rp = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, L, 5), dkwLam(0xC8A86A));
rp.position.set(mx - Math.cos(ry) * 1.1, (a[2] + b[2]) / 2 + 1.1, mz + Math.sin(ry) * 1.1);
rp.rotation.order = "YXZ";
rp.rotation.y = ry;
rp.rotation.x = Math.PI / 2 - Math.atan2(a[2] - b[2], L);
G.add(rp);
}
})();
(function () {
var y = 140;
dkwBox(G, 30, 24, 26, dkwS("b:strata", 0x8A8A92, 3), 76, y - 24, 30);
var ice = new THREE.Mesh(new THREE.BoxGeometry(30, 0.3, 26), dkwS("b:marble", 0xE8F0F8, 4, { shine: 60 }));
ice.position.set(76, y + 0.02, 30);
G.add(ice);
dkwFloor(76, 30, 30, 26, y);
for (var k = 0; k < (lite ? 6 : 14); k++)
dkcCrystal(G, 62 + R() * 28, y, 18 + R() * 24, 0.8 + R() * 1.6, [0x8AD8FF, 0xC8E8FF, 0xFFD88A][k % 3], { n: 3, solid: false });
dkwSolid(91, 30, 0.6, 26, y, y + 2, 0);
dkwSolid(76, 43, 30, 0.6, y, y + 2, 0);
})();
dkwDoorTo(G, "westheart", 0, 72, 13.4, 0, "The gate of the Western Heart", 40, 70, { col: 0x2A2622, frame: dkwShine(0x6A6A72, 0.3, 0.85), y: 140 });
dkcMotes(G, lite ? 100 : 300, 0, 300, 400, 0, 80, 0xFFFFFF);
},
function (col, k) {
return dkwM("trialrune" + col + k, function () {
var t = dkwCanvas("trialruneT" + k, 256, 64, function (c, W, Hh) {
c.fillStyle = "#1A1C22";
c.fillRect(0, 0, W, Hh);
c.font = "bold 30px serif";
c.textBaseline = "middle";
var rs = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ";
for (var j = 0; j < 10; j++) {
c.fillStyle = "rgba(255,255,255,.95)";
c.fillText(rs.charAt((j * 7 + k * 3) % rs.length), 6 + j * 25, 32 + ((j + k) % 2) * 4 - 2);
}
});
var m = new THREE.MeshPhongMaterial({ color: 0x2A2C34, emissive: col, emissiveMap: t, emissiveIntensity: 0.9, map: t });
m.userData.noPhoto = 1;
return m;
});
},
function (G, x, z, w, d, h, o) {
o = o || {};
var rock = o.mat || dkwS("b:cave", 0x4A4A52, 3), R = wRand(Math.round(z * 13 + w));
if (!o.noL) {
dkwBox(G, 1, h + 1, d, rock, x - w / 2 - 0.5, -0.5, z);
dkwSolid(x - w / 2 - 0.5, z, 1, d);
}
if (!o.noR) {
dkwBox(G, 1, h + 1, d, rock, x + w / 2 + 0.5, -0.5, z);
dkwSolid(x + w / 2 + 0.5, z, 1, d);
}
dkwBox(G, w + 2, 1, d, rock, x, h, z);
var ribs = Math.floor(d / (o.rib || 6));
for (var i = 0; i < ribs; i++) {
var rz = z - d / 2 + (i + 0.5) * d / ribs;
if (!o.noL)
dkwBox(G, 0.5, h, 0.8, rock, x - w / 2 + 0.25, 0, rz);
if (!o.noR)
dkwBox(G, 0.5, h, 0.8, rock, x + w / 2 - 0.25, 0, rz);
dkwBox(G, w, 0.4, 0.8, rock, x, h - 0.4, rz);
}
var pos = [], n = Math.round(d * (o.veins || 2));
for (i = 0; i < n; i++) {
var side = i % 3, t = R();
pos.push({ x: side === 2 ? x - w / 2 + R() * w : x + (side ? w / 2 - 0.02 : -w / 2 + 0.02), y: side === 2 ? h - 0.02 : 0.3 + R() * (h - 0.6), z: z - d / 2 + t * d, s: 0.5 + R() * 1.4, ry: side === 2 ? R() * 3 : Math.PI / 2 });
}
dkwInst(G, dkwGeo("orevein", function () { return new THREE.BoxGeometry(0.9, 0.06, 0.06); }), dkwGlowM(o.vein || 0x5AE8C8, 0.85), pos, { cull: false });
},
function (G) {
var lite = dkwLite(), H = dkwTrialH, R = wRand(24024), rock = dkwS("b:cave", 0x4A4A52, 3), iron = dkwShine(0x3A3A40, 0.35, 0.85), slate = dkwS("b:slate", 0x3A3E46, 2);
dkwTerrain(G, -140, -160, 200, 480, lite ? 6 : 3, H, dkwS("b:ashlar", 0x4A4648, 4), function (x, z, y, c) { var n = dkwFbm(x * 0.05, z * 0.05, 2); c.setRGB(0.32 + n * 0.06, 0.31 + n * 0.06, 0.33 + n * 0.06); });
dkwTerrain(G, -760, -560, 620, 1000, lite ? 24 : 12, H, dkwS("b:strata", 0x7A7A6A, 8), function (x, z, y, c) { var n = dkwFbm(x * 0.01, z * 0.01, 3), f = Math.max(0, Math.min(1, (z - 120) / 240)); c.setRGB(0.42 + n * 0.1 + f * 0.25, 0.46 + n * 0.12 - f * 0.1, 0.32 + n * 0.06 - f * 0.12); });
dkcTun(G, 0, 303, 12, 14, 10, { rib: 7 });
dkcCap(G, 0, 310.5, 14, 10, rock);
var dr = new THREE.Mesh(new THREE.PlaneGeometry(5, 8), iron);
dr.position.set(0, 4, 309.9);
dr.rotation.y = Math.PI;
G.add(dr);
for (var i = 0; i < 3; i++)
dkwBox(G, 5.4, 0.3, 0.4, dkwShine(0x5A5A60, 0.3, 0.9), 0, 1.5 + i * 2.6, 309.6);
dkwBox(G, 0.8, 9, 0.8, iron, -3.2, 0, 296);
dkwBox(G, 0.8, 9, 0.8, iron, 3.2, 0, 296);
var lin = new THREE.Mesh(new THREE.BoxGeometry(7.2, 1.2, 0.9), dkwRuneM(0xFFB86A, 1));
lin.position.set(0, 8.4, 296);
G.add(lin);
dkwBox(G, 2.6, 10, 1, rock, -4.7, 0, 296);
dkwBox(G, 2.6, 10, 1, rock, 4.7, 0, 296);
dkwSolid(-4.7, 296, 2.6, 1);
dkwSolid(4.7, 296, 2.6, 1);
dkcTun(G, 0, 270, 6, 52, 5, {});
dkcTun(G, 0, 224, 8, 40, 6, { rib: 8 });
dkwBox(G, 8, 1.4, 1, rock, 0, 4.6, 244);
var warn = new THREE.Mesh(new THREE.PlaneGeometry(6, 1), dkwRuneM(0x8AE8FF, 2));
warn.position.set(0, 5.3, 243.4);
warn.rotation.y = Math.PI;
G.add(warn);
var plates = [];
for (var r = 0; r < 10; r++)
for (var c2 = 0; c2 < 4; c2++)
plates.push({ x: -3 + c2 * 2, y: ((r + c2) % 2) * 0.025, z: 241 - r * 3.8, s: 1, ry: 0 });
dkwInst(G, dkwGeo("plate", function () { return new THREE.BoxGeometry(1.92, 0.08, 3.7); }), dkwShine(0x5A5A62, 0.4, 0.75), plates.filter(function (p, i) { return i % 2 === 0; }), { cull: false });
dkwInst(G, dkwGeo("plate", function () { return new THREE.BoxGeometry(1.92, 0.08, 3.7); }), dkwShine(0x6A6460, 0.4, 0.7), plates.filter(function (p, i) { return i % 2 === 1; }), { cull: false });
for (i = 0; i < 5; i++) {
[-1, 1].forEach(function (s) { var zz = 238 - i * 7.4; dkwBox(G, 0.2, 0.9, 0.9, dkwLam(0x0A0A0C), s * 4.02, 1.3, zz); var bit = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.2, 10), dkwShine(0x9A9AA2, 0.3, 0.9)); bit.rotation.z = s * Math.PI / 2; bit.position.set(s * 3.6, 1.75, zz); bit.userData.sp = 6; bit.userData.axis = "z"; G.add(bit); DKW.spin.push(bit); });
}
dkcTun(G, 0, 195, 4, 18, 3.5, {});
dkcCap(G, -3.75, 204, 2.5, 6);
dkcCap(G, 3.75, 204, 2.5, 6);
for (i = 0; i < 4; i++) {
[-1, 1].forEach(function (s) { var sl = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3.4, 3.6), rock); sl.position.set(s * 1.8, 1.7, 202 - i * 4.4); G.add(sl); dkwCyl(G, 0.12, 0.12, 0.8, iron, s * 1.95, 2.4, 202 - i * 4.4, 6); });
}
dkcTun(G, 0, 177, 12, 18, 6, {});
dkwBox(G, 4, 6.5, 1, rock, -4, -0.5, 186.5);
dkwBox(G, 4, 6.5, 1, rock, 4, -0.5, 186.5);
dkwSolid(-4, 186.5, 4, 1);
dkwSolid(4, 186.5, 4, 1);
dkwBox(G, 4.5, 6.5, 1, rock, -3.75, -0.5, 167.5);
dkwBox(G, 4.5, 6.5, 1, rock, 3.75, -0.5, 167.5);
dkwSolid(-3.75, 167.5, 4.5, 1);
dkwSolid(3.75, 167.5, 4.5, 1);
for (i = 0; i < 8; i++) {
var vx = (i % 2 ? 5.6 : -5.6), vz = 184 - i * 2.1;
dkwBox(G, 0.5, 0.6, 0.5, iron, vx, 1.6 + (i % 3) * 0.4, vz);
dkwSmoke(G, vx * 0.9, 1.9 + (i % 3) * 0.4, vz, 0xE8ECF0, lite ? 3 : 6);
}
dkcTun(G, 0, 163, 3, 10, 3, {});
var web = new THREE.Group();
G.add(web);
for (i = 0; i < (lite ? 14 : 30); i++) {
var f = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 3.6, 3), dkwM("webglass", function () { var m = new THREE.MeshBasicMaterial({ color: 0xE8F8FF, transparent: true, opacity: 0.6 }); m.userData.noPhoto = 1; return m; }));
f.position.set(0, 0.4 + R() * 2.4, 168 - R() * 6);
f.rotation.z = Math.PI / 2 + (R() - 0.5) * 0.9;
f.rotation.y = (R() - 0.5) * 0.4;
web.add(f);
}
dkwShow("web", web, true);
var vine = new THREE.Group();
G.add(vine);
vine.add(new THREE.Mesh(dkwTaper([[0.4, 0, 166], [0.2, 0.6, 165], [-0.2, 1.2, 164.5], [0, 1.6, 163.6]], [0.06, 0.05, 0.04, 0.02], 12, 6), dkwLam(0xD8E8C8)));
dkwShow("vine", vine, false);
var door = new THREE.Group();
door.position.set(0, 0, 158);
G.add(door);
dkwBox(door, 3.2, 3.2, 0.35, slate, 0, 0, 0);
[[1.4, 0x6AE8FF], [1.05, 0xFFC86A], [0.7, 0xE86AFF], [0.35, 0x8AFF8A]].forEach(function (rg, j) { var ring = new THREE.Mesh(new THREE.RingGeometry(rg[0] - 0.24, rg[0], 40), dkwGlowM(rg[1], 0.75)); ring.position.set(0, 1.6, 0.19); door.add(ring); for (var q = 0; q < 6 + j * 2; q++) {
var a = q / (6 + j * 2) * Math.PI * 2, ru = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.04), dkwGlowM(0xFFFFFF, 0.9));
ru.position.set(Math.cos(a) * (rg[0] - 0.12), 1.6 + Math.sin(a) * (rg[0] - 0.12), 0.21);
ru.rotation.z = a;
door.add(ru);
} });
dkwShow("slatedoor", door, true);
DKW.trialDoor = dkwSolid(0, 158, 3.2, 0.6);
DKW.trialDoor.off = 0;
dkwBox(G, 4.9, 8.5, 1, rock, -4.05, -0.5, 157.5);
dkwBox(G, 4.9, 8.5, 1, rock, 4.05, -0.5, 157.5);
dkwSolid(-4.05, 157.5, 4.9, 1);
dkwSolid(4.05, 157.5, 4.9, 1);
dkwBox(G, 3.2, 5, 1, rock, 0, 3.2, 157.5);
dkcTun(G, 0, 129.5, 12, 53, 8, { rib: 9, vein: 0x6AC8E8, veins: 1 });
for (i = 0; i < 8; i++) {
[-1, 1].forEach(function (s) { dkwCyl(G, 0.5, 0.6, 8, dkwS("b:ashlar", 0x6A6466, 2), s * 5.2, 0, 152 - i * 6.6, 12); });
}
["forge", "battle", "dying", "crowned"].forEach(function (kind, j) {
[-1, 1].forEach(function (s) {
var mu = new THREE.Mesh(new THREE.PlaneGeometry(5, 3.4), dkwM("mural" + kind, function () {
var t = dkwCanvas("muralT" + kind, 320, 220, function (c, W, Hh) {
var g = c.createLinearGradient(0, 0, 0, Hh);
g.addColorStop(0, "#3A3430");
g.addColorStop(1, "#1E1A18");
c.fillStyle = g;
c.fillRect(0, 0, W, Hh);
c.strokeStyle = "#C8A04A";
c.lineWidth = 6;
c.strokeRect(4, 4, W - 8, Hh - 8);
var dw = function (x, y, s, col) { c.fillStyle = col || "#8A7A6A"; c.fillRect(x - 9 * s, y - 24 * s, 18 * s, 24 * s); c.beginPath(); c.arc(x, y - 30 * s, 7 * s, 0, 7); c.fill(); c.fillStyle = "#D8D0C0"; c.beginPath(); c.moveTo(x - 6 * s, y - 27 * s); c.lineTo(x + 6 * s, y - 27 * s); c.lineTo(x, y - 12 * s); c.fill(); };
if (kind === "forge") {
c.fillStyle = "#FF7A2A";
c.fillRect(120, 150, 80, 30);
for (var q = 0; q < 5; q++) {
dw(40 + q * 60, 180, 1.4);
c.strokeStyle = "#B8B8C0";
c.lineWidth = 5;
c.beginPath();
c.moveTo(48 + q * 60, 140);
c.lineTo(60 + q * 60, 118);
c.stroke();
}
}
if (kind === "battle") {
c.fillStyle = "#4A6A3A";
c.beginPath();
c.moveTo(200, 190);
c.quadraticCurveTo(260, 40, 300, 60);
c.quadraticCurveTo(280, 120, 250, 190);
c.fill();
c.fillStyle = "#FF3A2A";
c.fillRect(278, 62, 6, 6);
for (q = 0; q < 4; q++)
dw(40 + q * 40, 190, 1.3, "#6A6A72");
}
if (kind === "dying") {
for (q = 0; q < 9; q++) {
c.save();
c.translate(30 + q * 32, 180 + (q % 2) * 10);
c.rotate(1.4 + (q % 3) * 0.2);
dw(0, 0, 1, "#5A4A4A");
c.restore();
}
c.fillStyle = "rgba(200,40,30,.6)";
c.fillRect(10, 190, 300, 20);
}
if (kind === "crowned") {
dw(160, 190, 2.2, "#8A7A4A");
c.fillStyle = "#FFD84A";
c.beginPath();
c.moveTo(140, 96);
c.lineTo(146, 80);
c.lineTo(153, 92);
c.lineTo(160, 76);
c.lineTo(167, 92);
c.lineTo(174, 80);
c.lineTo(180, 96);
c.fill();
for (q = 0; q < 6; q++) {
c.fillStyle = "rgba(255,220,120,.8)";
c.beginPath();
c.arc(160 + Math.cos(q) * 90, 110 + Math.sin(q) * 60, 3, 0, 7);
c.fill();
}
}
});
var m = new THREE.MeshLambertMaterial({ map: t });
m.userData.noPhoto = 1;
return m;
}));
mu.position.set(s * 5.95, 3.6, 148 - j * 12.6 - (s > 0 ? 6 : 0));
mu.rotation.y = -s * Math.PI / 2;
G.add(mu);
});
});
if (!lite)
for (i = 0; i < 3; i++) {
var ML = new THREE.PointLight(0xFFC890, 0.8, 22, 2);
ML.position.set(0, 6, 148 - i * 18);
G.add(ML);
}
(function () {
var E = 6;
dkwBox(G, 1, 48, 82, rock, -40.5, -60, 61);
dkwSolid(-40.5, 61, 1, 82);
dkwBox(G, 35, 48, 2, rock, -23, -60, 103);
dkwSolid(-23, 103, 35, 2);
dkwBox(G, 48, 2, 100, rock, -17, 48, 56);
var lava = new THREE.Mesh(new THREE.PlaneGeometry(46, 74, 1, 1), dkwM("lavaflow", function () {
var t = dkwCanvas("lavaT", 256, 256, function (c, W, Hh) { c.fillStyle = "#FF5A0A"; c.fillRect(0, 0, W, Hh); for (var j = 0; j < 120; j++) {
c.fillStyle = "rgba(" + (j % 2 ? "40,10,0" : "255,220,80") + "," + (0.2 + Math.random() * 0.5) + ")";
c.beginPath();
c.ellipse(Math.random() * W, Math.random() * Hh, 6 + Math.random() * 30, 3 + Math.random() * 10, Math.random() * 3, 0, 7);
c.fill();
} });
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(2, 3);
var m = new THREE.MeshBasicMaterial({ map: t });
m.userData.noPhoto = 1;
m.userData.scroll = t;
return m;
}));
lava.rotation.x = -Math.PI / 2;
lava.position.set(-17, -50, 61);
G.add(lava);
DKW.water.push(lava);
for (var k = 0; k < (lite ? 6 : 16); k++) {
var gx = -36 + R() * 40, gz = 30 + R() * 64;
var go = new THREE.Mesh(new THREE.SphereGeometry(0.8 + R() * 1.2, 10, 8), dkwGlowM(0xFFC84A, 0.9));
go.position.set(gx, -50, gz);
go.userData.kind = "float";
go.userData.y0 = -50.5;
go.userData.amp = 1.2;
go.userData.f = 0.5 + R() * 0.6;
go.userData.ph = k;
G.add(go);
DKW.bob.push(go);
}
if (!lite) {
[[-17, 40], [-17, 80], [0, 60]].forEach(function (p) { var LL = new THREE.PointLight(0xFF7A2A, 2.4, 90, 1.6); LL.position.set(p[0], -30, p[1]); G.add(LL); });
}
var updraft = dkcMotes(G, lite ? 120 : 400, -17, 61, 30, -50, 20, 0xFFB86A);
updraft.userData.sp = 0.05;
var pave = dkwS("b:ashlar", 0x6A5E58, 2);
dkwBox(G, 4, 1.2, 74, pave, 0, -1.2, 61);
dkwBox(G, 2.4, 3, 74, dkwS("b:cave", 0x3A3438, 2), 0, -4.2, 61);
dkwFloor(0, 61, 4, 74, 0);
[[-2.3, 0], [2.3, 0]].forEach(function (e) { dkwSolid(e[0], e[0] > 0 ? 79.5 : 61, 0.3, e[0] > 0 ? 37 : 74, -1, 1.2); });
dkwSolid(2.3, 39, 0.3, 30, -1, 1.2);
for (k = 0; k < 4; k++) {
var pz = 92 - k * 20;
dkwBox(G, 3.4, 50, 3.4, dkwS("b:cave", 0x4A3E3A, 2), 0, -51, pz);
var pr = new THREE.Mesh(new THREE.BoxGeometry(3.5, 6, 3.5), dkwRuneM(0xFF6A1A, k + 3));
pr.position.set(0, -10, pz);
G.add(pr);
}
dkwBox(G, 3.8, 1.2, 6, pave, 4, -1.2, 57);
dkwFloor(4, 57, 3.8, 6, 0);
dkwSolid(4.1, 53.8, 4, 0.3, -1, 1.2);
dkwSolid(4.1, 60.2, 4, 0.3, -1, 1.2);
dkwBox(G, 2, 48, 30, rock, E + 1, -0.5, 39);
dkwSolid(E + 1, 39, 2, 30);
dkwBox(G, 24, 48, 42, rock, E + 12, -0.5, 81);
dkwSolid(E + 12, 81, 24, 42);
dkwBox(G, 19, 48, 52, rock, E + 14.5, -0.5, 34);
dkwSolid(E + 14.5, 34, 19, 52);
dkwBox(G, 2, 48, 8, rock, E + 1, -0.5, 12);
dkwSolid(E + 1, 12, 2, 8);
dkwBox(G, 5, 1, 44, rock, E + 2.5, 3, 38);
var tun = new THREE.Group();
G.add(tun);
[E + 2.02, E + 4.98].forEach(function (wx) { var gl = new THREE.Mesh(new THREE.PlaneGeometry(44, 3), dkwM("meltglass", function () { var m = new THREE.MeshPhongMaterial({ color: 0x2A1008, emissive: 0xFF4A0A, emissiveIntensity: 0.5, shininess: 140, specular: 0xFFC88A }); m.userData.noPhoto = 1; return m; })); gl.position.set(wx, 1.5, 38); gl.rotation.y = wx < E + 3 ? Math.PI / 2 : -Math.PI / 2; tun.add(gl); });
dkwShow("melted", tun, false);
var plug = new THREE.Group();
G.add(plug);
dkwBox(plug, 2, 4, 6, dkwS("b:cave", 0x5A5258, 3), E + 1, -0.5, 57);
dkwShow("plug", plug, true);
DKW.trialPlug = dkwSolid(E + 1, 57, 2, 6);
DKW.trialPlug.off = 0;
var fall = new THREE.Group();
G.add(fall);
for (k = 0; k < (lite ? 6 : 14); k++) {
var sb = new THREE.Mesh(new THREE.BoxGeometry(2 + R() * 3, 1.4 + R() * 2, 2 + R() * 3), rock);
sb.position.set(-6 + R() * 10, 6 + R() * 34, 40 + R() * 36);
sb.rotation.set(R(), R(), R());
sb.userData.kind = "float";
sb.userData.y0 = sb.position.y;
sb.userData.amp = 1.4;
sb.userData.f = 0.3;
sb.userData.ph = k;
fall.add(sb);
DKW.bob.push(sb);
}
dkwShow("ceilingfall", fall, false);
var slab = new THREE.Group();
G.add(slab);
var sl2 = new THREE.Mesh(new THREE.BoxGeometry(5.4, 4, 4.4), rock);
sl2.position.set(0, 1.2, 48);
sl2.rotation.set(0.2, 0.3, 0.15);
slab.add(sl2);
dkwFire(slab, -1, 0.4, 45, 1.6);
dkwFire(slab, 1.4, 0.4, 46, 1.4);
dkwShow("slab", slab, false);
DKW.trialSlab = dkwSolid(0, 48, 4.6, 4.6);
DKW.trialSlab.off = 1;
dkwBox(G, 1, 12, 18, rock, -40.5, -0.5, 15);
dkwSolid(-40.5, 15, 1, 18);
})();
dkwBox(G, 48, 1, 18, rock, -17, 12, 15);
dkwBox(G, 37, 13, 1, rock, -21.5, -0.5, 6.5);
dkwSolid(-21.5, 6.5, 37, 1);
dkwBox(G, 4, 13, 1, rock, 5, -0.5, 6.5);
dkwSolid(5, 6.5, 4, 1);
dkcTun(G, 0, -27, 6, 66, 5, { rib: 5 });
for (i = 0; i < 3; i++) {
dkwBox(G, 6, 1, 1, rock, 0, 4.2 - i * 0.5, -6 - i * 20);
}
(function () {
var vz = -90, obs = dkwShine(0x0A0A0E, 0.06, 0.45);
dkcCap(G, -15, -60, 24, 26);
dkcCap(G, 15, -60, 24, 26);
dkwBox(G, 1, 27, 58, rock, 26.5, -0.5, vz);
dkwSolid(26.5, vz, 1, 58);
dkwBox(G, 1, 27, 26, rock, -26.5, -0.5, -74);
dkwSolid(-26.5, -74, 1, 26);
dkwBox(G, 1, 27, 24, rock, -26.5, -0.5, -108);
dkwSolid(-26.5, -108, 1, 24);
dkwBox(G, 1, 21, 8, rock, -26.5, 5.5, -93);
DKW.trialSecret = dkwSolid(-26.5, -93, 1, 8);
DKW.trialSecret.off = 0;
var sec = new THREE.Group();
G.add(sec);
dkwBox(sec, 1, 6, 8, dkwS("b:cave", 0x52525A, 3), -26.5, -0.5, -93);
dkwShow("secretwall", sec, true);
dkcCap(G, -15.5, -120, 23, 26);
dkcCap(G, 15.5, -120, 23, 26);
var aw = new THREE.Group();
G.add(aw);
dkwBox(aw, 8, 6, 1, dkwRuneM(0x5AE8C8, 9), 0, -0.5, -120);
dkwShow("anchorwall", aw, true);
DKW.trialAnchorWall = dkwSolid(0, -120, 8, 1);
DKW.trialAnchorWall.off = 0;
dkwBox(G, 8, 20, 1, rock, 0, 6, -120);
var dish = new THREE.Mesh(new THREE.CircleGeometry(24, 48), obs);
dish.rotation.x = -Math.PI / 2;
dish.position.set(0, 0.03, vz);
G.add(dish);
var dome = new THREE.Mesh(new THREE.SphereGeometry(27, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), dkwM("constdome", function () {
var t = dkwCanvas("constT", 512, 256, function (c, W, Hh) {
c.fillStyle = "#04060E";
c.fillRect(0, 0, W, Hh);
var Rr = wRand(77);
for (var j = 0; j < 420; j++) {
c.fillStyle = "rgba(235,245,255," + (0.3 + Rr() * 0.7) + ")";
c.fillRect(Rr() * W, Rr() * Hh, 1 + Rr() * 2, 1 + Rr() * 2);
}
c.strokeStyle = "rgba(180,220,255,.55)";
c.lineWidth = 1.2;
for (j = 0; j < 14; j++) {
var x0 = Rr() * W, y0 = Rr() * Hh * 0.8;
c.beginPath();
c.moveTo(x0, y0);
for (var q = 0; q < 4; q++) {
x0 += (Rr() - 0.5) * 60;
y0 += (Rr() - 0.5) * 40;
c.lineTo(x0, y0);
c.fillStyle = "#FFFFFF";
c.fillRect(x0 - 2, y0 - 2, 4, 4);
}
c.stroke();
}
});
var m = new THREE.MeshBasicMaterial({ map: t, side: THREE.BackSide });
m.userData.noPhoto = 1;
return m;
}));
dome.position.set(0, 0, vz);
dome.scale.y = 0.9;
G.add(dome);
dkwBox(G, 54, 1, 58, rock, 0, 26.5, vz);
for (var k = 0; k < 12; k++) {
var a = k / 12 * Math.PI * 2, px = Math.cos(a) * 21, pz = vz + Math.sin(a) * 21;
if (Math.abs(px) < 4 && pz > vz)
continue;
dkwCyl(G, 0.9, 1.1, 22, dkwS("b:ashlar", 0x5A5458, 2), px, 0, pz, 14);
dkwRound(px, pz, 1.1);
var vn = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.3, 14), dkwGlowM(0x5AE8C8, 0.6));
vn.position.set(px, 3 + (k % 3) * 4, pz);
G.add(vn);
}
if (!lite) {
var VL = new THREE.PointLight(0xC8E8FF, 1.6, 60, 1.6);
VL.position.set(0, 18, vz);
G.add(VL);
}
var fallen = new THREE.Group();
fallen.position.set(0, 0, -92);
G.add(fallen);
var bd = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 4.6), dkwShine(0x5A5E66, 0.35, 0.85));
bd.position.set(0, 0.7, 0);
bd.rotation.y = 0.4;
fallen.add(bd);
var hdh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 1.6), dkwGlowM(0xFF6A1A, 0.7));
hdh.position.set(3, 0.3, 1.4);
fallen.add(hdh);
dkwShow("fallen", fallen, false);
dkwBox(G, 1, 7, 8, rock, -4.5, -0.5, -124);
dkwSolid(-4.5, -124, 1, 8);
dkwBox(G, 1, 7, 8, rock, 4.5, -0.5, -124);
dkwSolid(4.5, -124, 1, 8);
dkcCap(G, 0, -128.5, 10, 7);
dkwBox(G, 10, 1, 9, rock, 0, 6, -124);
dkwBox(G, 1.2, 1.1, 1.2, obs, 0, 0, -123.4);
var anc = new THREE.Group();
anc.position.set(0, 1.25, -123.4);
G.add(anc);
var br2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.26), dkwShine(0x0E0E12, 0.3, 0.6));
anc.add(br2);
var ah = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 8), dkwGlowM(0x5AE8C8, 0.25));
anc.add(ah);
dkwShow("anchor", anc, true);
if (!lite) {
var AL = new THREE.PointLight(0x5AE8C8, 1.2, 10, 2);
AL.position.set(0, 2.4, -123.4);
G.add(AL);
}
})();
(function () {
dkwBox(G, 52, 1, 8, rock, -52, 32, -93);
[[-89], [-97]].forEach(function (zz) { dkwBox(G, 52, 34, 1, rock, -52, -0.5, zz[0]); dkwSolid(-52, zz[0], 52, 1); });
dkwRamp(-52, -93, 6, 48, 30, 0, Math.PI / 2);
var st = new THREE.Mesh(new THREE.BoxGeometry(48.6, 1, 6), dkwS("b:ashlar", 0x5A5458, 2));
st.position.set(-52, 15 - 0.6, -93);
st.rotation.z = -Math.atan2(30, 48);
G.add(st);
for (var k = 0; k < 16; k++) {
var gp = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.5), dkwRuneM(0x5AE8C8, k));
gp.rotation.x = -Math.PI / 2;
gp.rotation.z = Math.PI / 2;
gp.position.set(-30 - k * 3, (k * 3 + 2) * 30 / 48 + 0.08, -93);
G.add(gp);
}
dkwFloor(-84, -93, 16, 6, 30);
dkwBox(G, 16, 1, 6, dkwS("b:ashlar", 0x5A5458, 2), -84, 29, -93);
var cl = dkwS("b:strata", 0x8A8A90, 6);
dkwBox(G, 4, 300, 180, cl, -86, -200, 1);
dkwBox(G, 4, 300, 180, cl, -86, -200, -187);
dkwBox(G, 4, 160, 8, cl, -86, 34, -93);
dkwSolid(-86, 1, 4, 180);
dkwSolid(-86, -187, 4, 180);
dkwBox(G, 16, 230, 24, cl, -96, -200, -93);
dkwFloor(-96, -93, 16, 24, 30);
dkwSolid(-104.5, -93, 1, 24, 29, 32);
dkwSolid(-96, -105.5, 16, 1, 29, 32);
dkwSolid(-96, -80.5, 16, 1, 29, 32);
dkwPlant(G, "conifer", dkwScatter(24090, lite ? 30 : 90, -420, -400, -120, 200, null, H, 0.8, 1.3), { col: 0x2A4A34 });
[[-500, -420, 320], [-380, -480, 260], [-620, -300, 380], [-260, -520, 220]].forEach(function (p) { var pk = new THREE.Mesh(new THREE.ConeGeometry(p[2] * 0.5, p[2], 10), cl); pk.position.set(p[0], p[2] / 2 - 120, p[1]); G.add(pk); var cap = new THREE.Mesh(new THREE.ConeGeometry(p[2] * 0.25, p[2] * 0.5, 10), dkwLam(0xF4F6FA)); cap.position.set(p[0], p[2] * 0.75 - 120, p[1]); G.add(cap); });
for (k = 0; k < 5; k++) {
var hz = new THREE.Mesh(new THREE.PlaneGeometry(260, 70), dkwM("firehaze", function () { var m = new THREE.MeshBasicMaterial({ color: 0xFF5A1A, transparent: true, opacity: 0.16, depthWrite: false }); m.userData.noPhoto = 1; return m; }));
hz.position.set(-420 - k * 40, -60, 320 + k * 20);
G.add(hz);
var vo = new THREE.Mesh(new THREE.ConeGeometry(40 + k * 8, 60 + k * 10, 10), dkwS("b:strata", 0x3A2A26, 6));
vo.position.set(-380 - k * 70, -150 + 30 + k * 5, 300 + k * 30);
G.add(vo);
dkwSmoke(G, -380 - k * 70, -90 + k * 10, 300 + k * 30, 0x5A4A44, 4);
}
dkcMotes(G, lite ? 60 : 160, -96, -93, 30, 30, 60, 0xFFFFFF);
})();
dkwSpot(0, 240.5, 2.5, "The lintel of warning", "read the runes", function () { dkbSay("📜 Finer runes than the ones at the entrance, less ceremonial, cut with a craftsman's hand. The patterns repeat; a warning, more or less, about haste."); });
dkwSpot(-4.6, 141, 2.5, "The murals", "study them", function () { dkbSay("🖼️ Dwarves working the forge, battling monsters, sometimes dying in droves, sometimes crowned in glory."); });
dkwSpot(0, -80, 3, "The dome of constellations", "look up", function () { dkbSay("✨ Stars that flicker with their own inner light, cold and white and impossibly remote, in constellations none of you know."); });
},
function (P, x, z, w, d, h, ry, R, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 10, z);
g.rotation.y = ry;
P.add(g);
var cols = [0x2A5AA8, 0xD89A3A, 0xE8D8B0, 0x3A6AB8, 0xC87A3A, 0xF0E4C8];
var wall = dkwS("b:stucco", cols[Math.floor(R() * cols.length)], 2);
dkwBox(g, w, h, d, wall, 0, 0, 0);
dkwBox(g, w + 0.3, 0.6, d + 0.3, dkwS("b:stucco", 0xE8D8B8, 2), 0, h, 0);
var dr = new THREE.Mesh(dkwGeo("adobedoor", function () { return new THREE.PlaneGeometry(1.3, 2.4); }), dkwLam(R() < 0.5 ? 0x3A2414 : 0x1A3A6A));
dr.position.set((R() - 0.5) * w * 0.4, 1.2, d / 2 + 0.02);
g.add(dr);
var fl = Math.max(1, Math.floor(h / 3.4));
for (var f = 0; f < fl; f++)
for (var i = 0; i < Math.max(1, Math.floor(w / 3.2)); i++) {
if (f === 0 && i === 0)
continue;
var wm = new THREE.Mesh(dkwGeo("adobewin", function () { return new THREE.PlaneGeometry(0.8, 1.2); }), f % 2 && i % 2 ? dkwGlowM(0xFFD890, 0.5) : dkwLam(0x1A140E));
wm.position.set(-w / 2 + (i + 0.5) * w / Math.max(1, Math.floor(w / 3.2)), f * 3.4 + 1.8, d / 2 + 0.02);
g.add(wm);
}
if (R() < 0.6) {
var aw = new THREE.Mesh(dkwGeo("awning", function () { return new THREE.PlaneGeometry(2.4, 1.4); }), dkwLam([0xB83A2A, 0x2A5A9A, 0xE8C860, 0x3A7A4A][Math.floor(R() * 4)]));
aw.position.set(0, 2.8, d / 2 + 0.6);
aw.rotation.x = -1.1;
g.add(aw);
}
var c = Math.cos(ry), s = Math.sin(ry);
dkwSolid(x, z, w, d, -50, 400, -ry);
return g;
},
function (G) {
var lite = dkwLite(), H = dkwRazH, R = wRand(26026), sand = dkwS("b:stucco", 0xE0C08A, 6), stone = dkwS("b:ashlar", 0xD8B07A, 3);
dkwTerrain(G, -700, -500, 1400, 1300, lite ? 16 : 8, H, dkwS("b:stucco", 0xE0C08A, 10), function (x, z, y, c) { var n = dkwFbm(x * 0.03, z * 0.03, 2); c.setRGB(0.86 + n * 0.06, 0.72 + n * 0.06, 0.5 + n * 0.05); });
dkwStrip(G, [[0, 700], [0, 560], [0, 420], [0, 330]], 5, function (x, z) { return H(x, z) + 0.05; }, dkwS("b:stucco", 0xC8A87A, 3), 0.05);
dkwPlant(G, "palm", dkwScatter(26030, lite ? 12 : 30, -200, 330, 200, 520, function (x, z) { return Math.abs(x) > 10; }, H, 0.8, 1.2), {});
var WH = 16, glyphM = dkwM("razglyphs", function () { var t = dkwCanvas("razglyphsT", 512, 32, function (c, W, Hh) { c.fillStyle = "#7A4A1A"; c.fillRect(0, 0, W, Hh); c.fillStyle = "#FFD88A"; c.font = "bold 22px serif"; c.textBaseline = "middle"; var s = "𓂀𓃠𓆣𓋹𓇳𓂝𓅓𓊖𓏏𓈖𓉐𓁹"; for (var j = 0; j < 24; j++)
c.fillText(Array.from(s)[j % 12], 6 + j * 21, 17); }); var m = new THREE.MeshPhongMaterial({ map: t, emissive: 0x6A3A0A, emissiveMap: t, emissiveIntensity: 0.5 }); m.userData.noPhoto = 1; return m; });
var wallSeg = function (x0, z0, x1, z1) {
var L = Math.hypot(x1 - x0, z1 - z0), ry = Math.atan2(x1 - x0, z1 - z0), mx = (x0 + x1) / 2, mz = (z0 + z1) / 2;
var w = new THREE.Mesh(new THREE.BoxGeometry(4, WH, L), stone);
w.position.set(mx, 10 + WH / 2, mz);
w.rotation.y = ry;
G.add(w);
dkwSolid(mx, mz, 4, L, -50, 400, -ry);
var band = new THREE.Mesh(new THREE.BoxGeometry(4.3, 1.1, L), glyphM);
band.position.set(mx, 10 + WH - 0.8, mz);
band.rotation.y = ry;
G.add(band);
for (var k = 0; k < Math.floor(L / 8); k++) {
var t = (k + 0.5) / Math.floor(L / 8), bx = x0 + (x1 - x0) * t, bz = z0 + (z1 - z0) * t;
dkwBox(G, 1.2, 1.4, 1.2, stone, bx, 10 + WH, bz);
var bell = new THREE.Mesh(dkwGeo("razbell", function () { var g = new THREE.CylinderGeometry(0.12, 0.32, 0.5, 12, 1, true); return g; }), dkwShine(0xC8783A, 0.3, 0.9));
bell.position.set(bx, 10 + WH + 1.6, bz);
bell.userData.kind = "float";
bell.userData.y0 = 10 + WH + 1.6;
bell.userData.amp = 0.04;
bell.userData.f = 2 + R();
bell.userData.ph = k;
G.add(bell);
DKW.bob.push(bell);
}
};
wallSeg(-230, 300, -9, 300);
wallSeg(9, 300, 230, 300);
wallSeg(230, 300, 230, -270);
wallSeg(-230, 300, -230, -270);
wallSeg(-230, -270, 230, -270);
(function () {
var z = 300;
[-9, -3, 3, 9].forEach(function (px) { dkwBox(G, 2, WH - 2, 4.4, stone, px, 10, z); dkwSolid(px, z, 2, 4.4, -50, 400, 0); });
dkwBox(G, 20, 4, 4.4, stone, 0, 10 + WH - 4, z);
var gb = new THREE.Mesh(new THREE.BoxGeometry(20.2, 1.2, 4.6), glyphM);
gb.position.set(0, 10 + WH - 1.4, z);
G.add(gb);
[-6, 0, 6].forEach(function (px) { var ar = new THREE.Mesh(new THREE.TorusGeometry(2, 0.35, 8, 20, Math.PI), stone); ar.position.set(px, 10 + WH - 4, z + 2.25); G.add(ar); });
})();
var keep = function (x, z) { if (Math.abs(x) < 9)
return false; if (z < -80 && Math.abs(x) < 110)
return false; if (Math.abs(z - 120) < 10)
return false; if (Math.abs(z - 190) < 26 && Math.abs(x) < 34)
return false; if (Math.abs(x + 22) < 3 && z > 210 && z < 260)
return false; return true; };
var houses = [], n = lite ? 60 : 150, tries = 0;
while (houses.length < n && tries < n * 8) {
tries++;
var hx = (R() - 0.5) * 440, hz = -250 + R() * 540, hw = 6 + R() * 6, hd = 6 + R() * 5;
if (!keep(hx, hz))
continue;
if (houses.some(function (q) { return Math.abs(q[0] - hx) < (q[2] + hw) / 2 + 2.4 && Math.abs(q[1] - hz) < (q[3] + hd) / 2 + 2.4; }))
continue;
houses.push([hx, hz, hw, hd]);
}
houses.forEach(function (q) { var ry = Math.abs(q[0]) < 40 ? (q[0] < 0 ? Math.PI / 2 : -Math.PI / 2) : (q[1] > 0 ? 0 : Math.PI); dkcAdobe(G, q[0], q[1], q[2], q[3], 4 + Math.floor(R() * 3) * 3.4, ry, R); });
var glass = dkwM("spunglass", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8AC8FF, emissive: 0x2A5A8A, emissiveIntensity: 0.4, transparent: true, opacity: 0.55, shininess: 140, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; });
for (var i = 0; i < (lite ? 14 : 36); i++) {
var bz = 280 - i * 10, bn = new THREE.Mesh(new THREE.PlaneGeometry(16, 1.2), i % 3 ? glass : dkwM("spunglass2", function () { var m = new THREE.MeshPhongMaterial({ color: 0xFFC86A, emissive: 0x8A4A1A, emissiveIntensity: 0.4, transparent: true, opacity: 0.55, shininess: 140, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
bn.position.set(0, 19, bz);
bn.rotation.x = -Math.PI / 2 + 0.3 * Math.sin(i);
bn.userData.kind = "float";
bn.userData.y0 = 19;
bn.userData.amp = 0.3;
bn.userData.f = 0.7;
bn.userData.ph = i;
G.add(bn);
DKW.bob.push(bn);
}
var pz = new THREE.Mesh(new THREE.CircleGeometry(30, 40), dkwS("b:terracotta", 0xC88A5A, 4));
pz.rotation.x = -Math.PI / 2;
pz.position.set(0, 10.03, 190);
G.add(pz);
dkwCyl(G, 4, 4.4, 0.8, stone, 0, 10, 190, 24);
dkwWater(G, 0, 190, 7, 7, 10.7, 0x6AC8E8, 0.8);
dkwRound(0, 190, 4.4);
dkwPlant(G, "palm", [{ x: -20, z: 178, y: 10, s: 1, ry: 0 }, { x: 20, z: 204, y: 10, s: 1.1, ry: 1 }, { x: -18, z: 206, y: 10, s: 0.9, ry: 2 }, { x: 22, z: 176, y: 10, s: 1, ry: 3 }], {});
for (i = 0; i < 8; i++) {
var sa = i / 8 * Math.PI * 2, sx = Math.cos(sa) * 24, sz = 190 + Math.sin(sa) * 24;
if (Math.abs(sx) < 6)
continue;
var st = new THREE.Group();
st.position.set(sx, 10, sz);
st.rotation.y = -sa + Math.PI / 2;
G.add(st);
dkwBox(st, 2.4, 0.9, 1.2, dkwMat("oak"), 0, 0, 0);
var aw2 = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 1.8), dkwLam([0xB83A2A, 0x2A5A9A, 0xE8C860, 0x7A3A8A][i % 4]));
aw2.position.set(0, 2.4, 0);
aw2.rotation.x = -1.3;
st.add(aw2);
[-1.2, 1.2].forEach(function (px) { dkwCyl(st, 0.04, 0.04, 2.4, dkwMat("oak"), px, 0, -0.6, 6); });
for (var j = 0; j < 5; j++) {
var ware = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), dkwLam([0xE8A040, 0xC83A2A, 0x6A8A3A, 0xE8D8A0, 0x8A4AC8][j]));
ware.position.set(-0.9 + j * 0.45, 1.0, 0.2);
st.add(ware);
}
dkwSolid(sx, sz, 2.6, 1.4, -50, 400, sa - Math.PI / 2);
}
var cn = new THREE.Mesh(new THREE.BoxGeometry(460, 3, 8), dkwS("b:ashlar", 0xB89A6A, 3));
cn.position.set(0, 7, 120);
G.add(cn);
dkwWater(G, 0, 120, 460, 6.4, 9.2, 0x8AE8FF, 0.6);
dkwSolid(-120, 120, 220, 8, -50, 400, 0);
dkwSolid(124, 120, 212, 8, -50, 400, 0);
dkwBox(G, 10, 0.6, 12, stone, 0, 9.6, 120);
dkwFloor(0, 120, 10, 12, 10.2);
[-5, 5].forEach(function (bx) { dkwBox(G, 0.5, 0.9, 12, stone, bx, 10.2, 120); });
if (!lite)
for (i = 0; i < 16; i++) {
var mo = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), dkwGlowM(0xC8F8FF, 0.8));
mo.position.set(-60 + i * 8, 9.6, 120 + (i % 3 - 1));
mo.userData.kind = "float";
mo.userData.y0 = 9.6;
mo.userData.amp = 0.15;
mo.userData.f = 1.2;
mo.userData.ph = i;
G.add(mo);
DKW.bob.push(mo);
}
(function () {
var gold = dkwShine(0xD8A84A, 0.3, 0.9), obs = dkwShine(0x0E0C10, 0.08, 0.6), fg = dkwGlowM(0xFF8A3A, 0.5);
dkwBox(G, 200, 8, 4, stone, 0, 10, -104);
dkwSolid(-58, -104, 84, 4);
dkwSolid(58, -104, 84, 4);
for (var k = 0; k < 24; k++) {
var ix = -96 + k * 8.3;
if (Math.abs(ix) < 14)
continue;
var tile = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), k % 2 ? obs : fg);
tile.position.set(ix, 14, -101.9);
tile.rotation.z = Math.PI / 4;
G.add(tile);
}
dkwBox(G, 24, 2, 4, stone, 0, 16, -104);
[[0, -150, 90, 60, 10], [0, -160, 70, 46, 9], [0, -170, 52, 34, 9], [0, -178, 34, 22, 8]].forEach(function (t, j) {
var y = 10 + t[4] * j;
dkwBox(G, t[2], t[4], t[3], j % 2 ? stone : gold, t[0], y, t[1]);
dkwBox(G, t[2] + 1, 0.6, t[3] + 1, gold, t[0], y + t[4], t[1]);
for (var c = 0; c < Math.floor(t[2] / 8); c++) {
dkwCyl(G, 0.5, 0.5, t[4] * 0.9, gold, t[0] - t[2] / 2 + 4 + c * 8, y, t[1] + t[3] / 2 + 1.2, 10);
}
});
dkwSolid(0, -150, 90, 60);
var prow = new THREE.Mesh(new THREE.ConeGeometry(6, 30, 4), gold);
prow.position.set(0, 10 + 36 + 12, -176);
G.add(prow);
var dome = new THREE.Mesh(new THREE.SphereGeometry(14, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), dkwM("razdome", function () { var m = new THREE.MeshPhongMaterial({ color: 0x6AA8E8, emissive: 0x2A4A8A, emissiveIntensity: 0.4, shininess: 120, transparent: true, opacity: 0.85 }); m.userData.noPhoto = 1; return m; }));
dome.position.set(0, 10 + 19, -150);
G.add(dome);
[-11, 11].forEach(function (sx) {
var S = new THREE.Group();
S.position.set(sx, 10, -100);
S.rotation.y = sx < 0 ? 0.2 : -0.2;
G.add(S);
var bas = dkwShine(0x1A1A1E, 0.3, 0.4);
dkwBox(S, 4, 2, 4, stone, 0, 0, 0);
var bd = new THREE.Mesh(dkwTaper([[0, 2, 0], [0, 6, 0.2], [0, 9.5, 0], [0, 11, 0.1]], [1.5, 1.2, 1.0, 0.6], 12, 10), bas);
S.add(bd);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 12), bas);
hd.position.set(0, 12, 0.2);
hd.scale.set(1, 1.05, 1.1);
S.add(hd);
[-1, 1].forEach(function (k) { var ear = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1, 4), bas); ear.position.set(k * 0.5, 12.9, 0.1); S.add(ear); var ey = new THREE.Mesh(new THREE.CircleGeometry(0.16, 12), dkwShine(0xE8E8F0, 0.05, 1)); ey.position.set(k * 0.32, 12.1, 1.08); S.add(ey); var arm = new THREE.Mesh(dkwTaper([[k * 1.2, 9, 0], [k * 1.5, 6.5, 0.6], [k * 1.1, 4.8, 1.1]], [0.4, 0.32, 0.25], 10, 8), bas); S.add(arm); });
var sn = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.6, 8), bas);
sn.rotation.x = Math.PI / 2;
sn.position.set(0, 11.8, 1.2);
S.add(sn);
var nk = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.12, 6, 18), gold);
nk.rotation.x = Math.PI / 2;
nk.position.set(0, 10.4, 0.1);
S.add(nk);
dkwSolid(sx, -100, 4, 4);
});
var gp = new THREE.Mesh(new THREE.PlaneGeometry(60, 70), dkwS("b:moss", 0x6A8A3A, 6));
gp.rotation.x = -Math.PI / 2;
gp.position.set(70, 10.04, -150);
G.add(gp);
dkwWater(G, 62, -140, 4, 40, 10.15, 0x4AA8D8, 0.7);
dkwBox(G, 5, 0.3, 41, stone, 62, 9.9, -140);
dkwPlant(G, "bush", dkwScatter(26070, lite ? 20 : 50, 46, -180, 96, -112, function (x, z) { return Math.abs(x - 62) > 4; }, function () { return 10; }, 0.6, 1.1), { col: 0x3A6A2A });
dkwPlant(G, "conifer", [{ x: 50, z: -178, y: 10, s: 1, ry: 0 }, { x: 90, z: -178, y: 10, s: 1, ry: 1 }, { x: 50, z: -116, y: 10, s: 0.9, ry: 2 }, { x: 90, z: -116, y: 10, s: 1.1, ry: 3 }], { col: 0x2A4A2A });
dkcFlowers && dkcFlowers(G, dkwScatter(26071, lite ? 40 : 120, 46, -180, 96, -112, null, function () { return 10; }, 1, 1), [0xF4F4F0, 0xF0E8C8, 0xE8C84A]);
dkwBox(G, 30, 3, 1, stone, 70, 10, -186);
dkwSolid(70, -186, 30, 1);
dkwBox(G, 1, 3, 74, stone, 100, 10, -150);
dkwSolid(100, -150, 1, 74);
dkwBox(G, 20, 0.4, 10, stone, 70, 12.6, -160);
dkwRamp(70, -169, 6, 8, 10, 13, 0);
dkwFloor(70, -160, 20, 10, 13);
dkwSolid(70, -165, 20, 0.3, 13, 14.2, 0);
})();
dkwDoorTo(G, "razkanyr", 0, 0, -119.6, 0, "The doors of the palace", 30, 32, { col: 0x1A1410, frame: dkwShine(0xD8A84A, 0.3, 0.9), y: 10 });
dkcMotes(G, lite ? 60 : 160, 0, 100, 200, 10, 30, 0xFFF0C8);
dkwCrowd(26080, lite ? 14 : 36, -30, 140, 30, 260, { dress: "dkdesert", dressF: "dkdesertf", wander: 18, names: ["A woman in a loose caftan", "A water seller", "A man under an awning", "A dwarf hawking wares", "A girl with a copper bell", "A spice merchant"], says: ["The bells rang wrong this morning. Bast will know why.", "Cold water, straight from the canal, for a copper.", "Is that one of the Scholars? The human?", "Mind your purse. And your tongue. The bells hear everything.", "Dwarven knives! Better than anything the smiths in Razkanyr make. Don't tell them I said so."] });
dkwCrowd(26081, lite ? 8 : 20, -30, -80, 30, 110, { dress: "dkdesert", dressF: "dkdesertf", wander: 16, names: ["A courier of the palace", "A potter", "A woman carrying water", "A boy with a kite"], says: ["The palace takes no visitors. Unless it has sent for them.", "Sentinels at the gate since dawn. Something is coming.", "My grandmother says Bast was here before the sand."] });
},
function (x, z) {
var n = dkwFbm(x * 0.008, z * 0.008, 3), ax = Math.abs(x);
if (z > 420) {
var t = Math.min(1, (z - 420) / 120);
return (ax < 8 && z < 580 ? -1.2 * (1 - Math.min(1, ax / 8)) : 0) + t * 0.3 + (1 - t) * n * 2;
}
if (z > 110) {
return ax < 14 ? n * 0.6 : Math.min(140, (ax - 14) * 3) + n * 20;
}
var r = Math.max(0, Math.hypot(x * 0.9, (z + 140) * 1.0) - 330);
return n * 2.4 + Math.min(160, r * r * 0.004 + r * 0.2);
},
function (g, col, R) {
R = R || Math.random;
var hc = [0x2A1A10, 0x1A1A1A, 0x6A4A2A, 0xC8A880][Math.floor(R() * 4)];
[-1, 1].forEach(function (k) { var h = new THREE.Mesh(dkwTaper([[k * 0.05, 1.76, 0], [k * 0.08, 1.86, -0.06], [k * 0.09, 1.9, -0.16], [k * 0.08, 1.86, -0.24]], [0.03, 0.024, 0.016, 0.006], 8, 6), dkwShine(hc, 0.3, 0.5)); g.add(h); });
var sc = dkwShine(col, 0.3, 0.6);
for (var i = 0; i < 10; i++) {
var s = new THREE.Mesh(dkwGeo("dkringscale", function () { return new THREE.TorusGeometry(0.018, 0.006, 4, 10); }), sc);
var a = i / 10 * Math.PI;
s.position.set(Math.cos(a) * 0.09, 1.5 + Math.sin(a) * 0.06, 0.08);
g.add(s);
}
for (i = 0; i < 4; i++) {
var r = new THREE.Mesh(dkwGeo("dkridge", function () { return new THREE.ConeGeometry(0.012, 0.05, 4); }), sc);
r.position.set(0, 1.82 - i * 0.03, -0.1 - i * 0.02);
r.rotation.x = -0.8;
g.add(r);
}
dkfEyes(g, R() < 0.5 ? 0xFFB030 : 0xFF7A2A);
},
function (P, x, y, z, s, light) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 8; i++) {
var st = new THREE.Mesh(dkwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), dkwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.7 * s, 0.08 * s, Math.sin(i / 8 * 6.283) * 0.7 * s);
st.scale.setScalar(s);
g.add(st);
}
for (i = 0; i < 4; i++) {
var l = new THREE.Mesh(dkwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), dkwMat("darkbark"));
l.rotation.y = i / 4 * Math.PI;
l.position.y = 0.08 * s;
l.scale.setScalar(s);
g.add(l);
}
[[0x3A6AFF, 0.34, 0.5, 0.28], [0x8A3AE8, 0.26, 0.8, 0.5], [0xFFC040, 0.16, 0.7, 0.95]].forEach(function (f, j) { for (var k = 0; k < 3; k++) {
var c = new THREE.Mesh(dkwGeo("dfl" + j, function () { return new THREE.ConeGeometry(f[1], f[2], 7); }), dkwGlowM(f[0], 0.85));
c.position.set((k - 1) * 0.12 * s, f[3] * s, (k % 2 ? 0.08 : -0.06) * s);
c.scale.setScalar(s);
c.userData.kind = "float";
c.userData.y0 = f[3] * s;
c.userData.amp = 0.04 * s;
c.userData.f = 3 + k + j;
c.userData.ph = k * 2 + j;
g.add(c);
DKW.bob.push(c);
} });
if (light && !dkwLite() && (DKW.lights || 0) < 4) {
var L = new THREE.PointLight(0xB890FF, 1.3, 16 * s);
L.position.y = 1;
g.add(L);
DKW.lights = (DKW.lights || 0) + 1;
}
dkwRound(x, z, 0.7 * s);
return g;
},
function (P, x, z, ry, R, o) {
o = o || {};
var y = dkwLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
P.add(g);
var w = o.w || 3.6, d = o.d || 4.6, h = o.h || 2.6;
var M = dkwM("scaletent" + (o.c || 0), function () { var cs = ["#8A3A22", "#5A2A1A", "#A8642A", "#3A2A20"][o.c || 0]; var t = dkwCanvas("scaletentT" + (o.c || 0), 128, 128, function (c, W, H) { c.fillStyle = cs; c.fillRect(0, 0, W, H); for (var r = 0; r < 12; r++)
for (var q = 0; q < 10; q++) {
c.fillStyle = "rgba(0,0,0," + (0.1 + ((r + q) % 3) * 0.06) + ")";
c.beginPath();
c.arc(q * 13 + (r % 2) * 6, r * 11, 7, 0, Math.PI);
c.fill();
c.strokeStyle = "rgba(255,220,160,.18)";
c.beginPath();
c.arc(q * 13 + (r % 2) * 6, r * 11, 7, 0, Math.PI);
c.stroke();
} }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2, 2); var m = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }); return m; });
var geo = dkwGeo("tentprism", function () { var s = new THREE.Shape(); s.moveTo(-0.5, 0); s.lineTo(0.5, 0); s.lineTo(0, 1); s.lineTo(-0.5, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false }); e.translate(0, 0, -0.5); return e; });
var t = new THREE.Mesh(geo, M);
t.scale.set(w, h, d);
g.add(t);
var fl = new THREE.Mesh(dkwGeo("tentflap", function () { return new THREE.PlaneGeometry(0.9, 1.4); }), dkwGlowM(o.lit ? 0xFFB060 : 0x1A0E08, o.lit ? 0.6 : 1));
fl.position.set(0, 0.7, d / 2 + 0.01);
g.add(fl);
dkwCyl(g, 0.04, 0.04, h + 0.3, dkwMat("oak"), 0, 0, d / 2 + 0.05, 6);
dkwCyl(g, 0.04, 0.04, h + 0.3, dkwMat("oak"), 0, 0, -d / 2 - 0.05, 6);
dkwSolid(x, z, w, d, -50, 400, -ry);
return g;
},
function (G) {
var lite = dkwLite(), H = dkwCampH, R = wRand(27027), red = dkwS("b:strata", 0xA8502A, 6), red2 = dkwS("b:strata", 0x8A3A22, 5);
dkwTerrain(G, -700, -700, 1400, 1400, lite ? 16 : 8, H, dkwS("b:stucco", 0xD8A878, 10), function (x, z, y, c) {
var n = dkwFbm(x * 0.03, z * 0.03, 2);
if (z > 420) {
c.setRGB(0.93 + n * 0.04, 0.9 + n * 0.04, 0.84 + n * 0.04);
return;
}
var rk = Math.min(1, Math.max(0, y / 40));
c.setRGB(0.78 + n * 0.06 - rk * 0.18, 0.5 + n * 0.05 - rk * 0.18, 0.32 + n * 0.04 - rk * 0.12);
});
dkcMotes(G, lite ? 60 : 180, 0, 580, 500, 0, 3, 0xFFFFFF);
dkwStrip(G, [[0, 600], [3, 520], [-4, 460], [0, 400], [0, 330]], 7, function (x, z) { return H(x, z) + 0.04; }, dkwS("b:limestone", 0xB89878, 4), 0.04);
var shim = new THREE.Mesh(new THREE.PlaneGeometry(240, 10), dkwM("razshimmer", function () { var m = new THREE.MeshBasicMaterial({ color: 0xE8C060, transparent: true, opacity: 0.35, fog: false, depthWrite: false }); m.userData.noPhoto = 1; return m; }));
shim.position.set(0, 6, 1300);
shim.rotation.y = Math.PI;
G.add(shim);
dkwPlant(G, "rock", dkwScatter(27030, lite ? 20 : 60, -300, 420, 300, 700, function (x, z) { return Math.abs(x) > 10; }, H, 0.4, 1.4), {});
for (var z = 392; z > 104; z -= 14) {
[-1, 1].forEach(function (s) {
var w = 16 + R() * 8, h = 90 + R() * 60, off = 6.5 + R() * 1.6 + w / 2, wx = s * off;
var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 15 + R() * 3), R() < 0.5 ? red : red2);
m.position.set(wx, h / 2 - 4, z);
m.rotation.y = (R() - 0.5) * 0.12;
G.add(m);
dkwSolid(wx, z, w, 15, -50, 400, 0);
if (R() < 0.5) {
var lg = new THREE.Mesh(new THREE.BoxGeometry(2 + R() * 2, 1.2, 12), red2);
lg.position.set(s * (off - w / 2 - 0.8), 8 + R() * 40, z);
G.add(lg);
}
});
}
dkwPlant(G, "rock", dkwScatter(27031, lite ? 16 : 44, -6, 120, 6, 380, null, H, 0.3, 0.8), {});
var bd = new THREE.Mesh(new THREE.DodecahedronGeometry(2.4, 1), red2);
bd.scale.set(1.3, 0.9, 1);
bd.position.set(-1.8, 1.4, 164);
G.add(bd);
dkwRound(-1.8, 164, 2.6);
(function () {
var c = new THREE.Group();
c.position.set(0, 320, 300);
G.add(c);
var cm = dkwM("holecloud", function () { var t = dkwCanvas("holecloudT", 256, 256, function (x, W, Hh) { var gr = x.createRadialGradient(W / 2, Hh / 2, 30, W / 2, Hh / 2, W / 2); gr.addColorStop(0, "rgba(255,255,255,0)"); gr.addColorStop(0.25, "rgba(255,255,255,0)"); gr.addColorStop(0.32, "rgba(255,250,240,.95)"); gr.addColorStop(0.8, "rgba(255,245,235,.7)"); gr.addColorStop(1, "rgba(255,245,235,0)"); x.fillStyle = gr; x.fillRect(0, 0, W, Hh); }); var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, fog: false, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; });
var cl = new THREE.Mesh(new THREE.PlaneGeometry(260, 260), cm);
cl.rotation.x = Math.PI / 2;
c.add(cl);
var sw = new THREE.Group();
c.add(sw);
for (var i = 0; i < (lite ? 40 : 120); i++) {
var a = i * 0.37, r = 12 + (i % 17) * 1.4, p = new THREE.Mesh(dkwGeo("dustspark", function () { return new THREE.SphereGeometry(0.9, 6, 4); }), dkwM("dustsparkM", function () { var m = new THREE.MeshBasicMaterial({ color: 0xFFE0A0, fog: false }); m.userData.noPhoto = 1; return m; }));
p.position.set(Math.cos(a) * r, -2 + (i % 5) * 1.2, Math.sin(a) * r);
sw.add(p);
}
sw.userData.sp = 0.12;
DKW.spin.push(sw);
})();
dkwPlant(G, "cactus", dkwScatter(27032, lite ? 20 : 60, -360, -460, 360, 100, function (x, z) { return Math.hypot(x, z + 140) > 260; }, H, 0.7, 1.3), {});
dkwPlant(G, "bush", dkwScatter(27033, lite ? 24 : 80, -360, -460, 360, 100, function (x, z) { return Math.hypot(x, z + 140) > 200; }, H, 0.5, 1.0), { col: 0x8A8A4A });
dkwPlant(G, "flowers", dkwScatter(27034, lite ? 20 : 70, -190, -240, -110, -160, null, H, 0.8, 1.3), {});
dkwPlant(G, "flowers", dkwScatter(27035, lite ? 10 : 40, -300, -300, 300, 60, function (x, z) { return Math.abs(x) > 140; }, H, 0.6, 1.1), {});
(function () {
var mm = dkwM("dragoonM", function () { var m = new THREE.MeshBasicMaterial({ color: 0x3A2A3A, fog: false }); m.userData.noPhoto = 1; return m; });
var mt = new THREE.Mesh(new THREE.ConeGeometry(520, 900, 9), mm);
mt.position.set(80, 300, -1500);
G.add(mt);
var m2 = new THREE.Mesh(new THREE.ConeGeometry(340, 560, 8), mm);
m2.position.set(-420, 180, -1300);
G.add(m2);
var cap = new THREE.Mesh(new THREE.ConeGeometry(80, 140, 9), dkwM("dragoonCap", function () { var m = new THREE.MeshBasicMaterial({ color: 0x6A3A2A, fog: false }); m.userData.noPhoto = 1; return m; }));
cap.position.set(80, 700, -1500);
G.add(cap);
})();
var tents = [];
for (var row = 0; row < (lite ? 3 : 5); row++) {
for (var i = 0; i < (lite ? 8 : 14); i++) {
var a = (i / (lite ? 8 : 14)) * Math.PI * 2 + row * 0.3, rr = 60 + row * 34, tx = Math.cos(a) * rr, tz = -140 + Math.sin(a) * rr * 0.9;
if (Math.abs(tx - 30) < 8 && Math.abs(tz + 96) < 8)
continue;
if (Math.hypot(tx - 96, tz + 196) < 16 || Math.hypot(tx - 44, tz + 62) < 8 || Math.hypot(tx + 60, tz + 240) < 24 || Math.hypot(tx + 110, tz + 40) < 22 || Math.hypot(tx - 110, tz + 30) < 16 || Math.hypot(tx + 84, tz + 90) < 8)
continue;
if (Math.abs(tx) < 10 && tz > -100)
continue;
if (Math.abs(tx) < 8 && tz < -200)
continue;
tents.push([tx, tz, -a + Math.PI / 2]);
}
}
tents.forEach(function (t, j) { dkcScaleTent(G, t[0], t[1], t[2], R, { c: j % 4, lit: j % 5 === 0 }); });
dkcDragonFire(G, 0, H(0, -140), -140, 3, true);
[[-26, 40], [30, -96], [-60, -150], [60, -180], [-30, -210], [90, -120], [-100, -120], [20, -260], [-140, -60], [130, -210], [-90, -260], [150, -90], [-170, -170], [70, -40], [-40, -60], [110, -280], [-120, -300], [180, -150]].forEach(function (p, j) {
dkcDragonFire(G, p[0], H(p[0], p[1]), p[1], 1, j < 2);
for (var k = 0; k < 3; k++) {
var a = k * 2.1 + j;
var lg = new THREE.Mesh(dkwGeo("sitlog", function () { var c = new THREE.CylinderGeometry(0.22, 0.24, 1.6, 8); c.rotateZ(Math.PI / 2); return c; }), dkwMat("darkbark"));
lg.position.set(p[0] + Math.cos(a) * 2, H(p[0], p[1]) + 0.22, p[1] + Math.sin(a) * 2);
lg.rotation.y = -a + Math.PI / 2;
G.add(lg);
}
});
for (i = 0; i < 7; i++) {
var sa = i / 7 * Math.PI * 2 + Math.PI / 2;
dkwBox(G, 1.2, 0.5, 0.8, dkwS("b:strata", 0x6A3A2A, 1), Math.cos(sa) * 7, H(0, -140), -140 + Math.sin(sa) * 7);
}
(function () {
var x = 30, z = -96, y = H(x, z);
[-1, 1].forEach(function (s) { dkwCyl(G, 0.04, 0.04, 1.4, dkwMat("oak"), x + s * 1.2, y, z, 6); });
var sp = dkwCyl(G, 0.02, 0.02, 2.6, dkwMat("iron"), x, y + 1.3, z, 6);
sp.rotation.z = Math.PI / 2;
for (var k = 0; k < 4; k++) {
var mt = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), dkwLam(0x7A3A1A));
mt.position.set(x - 0.6 + k * 0.4, y + 1.3, z);
G.add(mt);
}
var bread = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.3), dkwLam(0xE8D0A0));
bread.position.set(x + 2.2, y + 0.3, z + 0.6);
G.add(bread);
})();
(function () {
var x = -110, z = -40, y = H(x, z);
var ring = new THREE.Mesh(new THREE.RingGeometry(9, 10, 40), dkwS("b:stucco", 0x8A5A3A, 2));
ring.rotation.x = -Math.PI / 2;
ring.position.set(x, y + 0.05, z);
G.add(ring);
for (var k = 0; k < 3; k++) {
var rk = new THREE.Group();
rk.position.set(x - 12, y, z - 6 + k * 6);
rk.rotation.y = Math.PI / 2;
G.add(rk);
dkwBox(rk, 2.4, 0.1, 0.2, dkwMat("oak"), 0, 1.4, 0);
for (var j = 0; j < 4; j++) {
var sp = dkwCyl(rk, 0.02, 0.02, 2, dkwMat("iron"), -0.9 + j * 0.6, 0, 0.1, 6);
}
dkwSolid(x - 12, z - 6 + k * 6, 0.4, 2.6);
}
for (k = 0; k < (lite ? 4 : 9); k++) {
var b = new THREE.Mesh(dkwGeo("flameburst", function () { return new THREE.SphereGeometry(0.3, 10, 8); }), dkwGlowM(k % 2 ? 0xFFA040 : 0x8A6AFF, 0.7));
b.position.set(x + Math.cos(k) * 5, y + 1.4, z + Math.sin(k) * 5);
b.userData.kind = "float";
b.userData.y0 = y + 1.4;
b.userData.amp = 0.5;
b.userData.f = 2.5 + k * 0.3;
b.userData.ph = k;
G.add(b);
DKW.bob.push(b);
}
})();
(function () {
var x = 110, z = -30, y = H(x, z);
dkwBox(G, 3, 1, 2, dkwS("b:strata", 0x3A2A22, 1), x, y, z);
dkcDragonFire(G, x, y + 1, z, 0.6, false);
var an = new THREE.Mesh(new THREE.BoxGeometry(1, 0.5, 0.4), dkwShine(0x2A2A30, 0.3, 0.9));
an.position.set(x + 3, y + 0.8, z);
G.add(an);
dkwBox(G, 0.5, 0.8, 0.5, dkwMat("oak"), x + 3, y, z);
dkwSolid(x, z, 3, 2);
dkwSolid(x + 3, z, 1, 1);
var bar = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.06, 0.12), dkwGlowM(0xFF6A2A, 0.8));
bar.position.set(x + 3, y + 1.08, z);
G.add(bar);
var bar2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.06, 0.12), dkwGlowM(0x6AC8FF, 0.7));
bar2.position.set(x + 3, y + 1.08, z + 0.15);
G.add(bar2);
var bar3 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.06, 0.12), dkwGlowM(0xB84AFF, 0.7));
bar3.position.set(x + 3, y + 1.08, z - 0.15);
G.add(bar3);
for (var k = 0; k < 4; k++) {
var hd = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.6), dkwLam([0x6A3A1A, 0x4A2A14, 0x8A4A22, 0x5A321A][k], { ds: 1 }));
hd.position.set(x - 4 + k * 1.6, y + 1.4, z - 4);
G.add(hd);
}
dkwBox(G, 7, 0.1, 0.1, dkwMat("oak"), x - 1.6, y + 2.3, z - 4);
dkwSolid(x - 1.6, z - 4, 7, 0.4);
})();
(function () {
var x = -60, z = -246, y = H(x, z), reed = dkwM("reedwall", function () { var t = dkwCanvas("reedwallT", 128, 128, function (c, W, Hh) { c.fillStyle = "#B89A5A"; c.fillRect(0, 0, W, Hh); for (var i = 0; i < W; i += 4) {
c.fillStyle = i % 8 ? "#A88A4A" : "#C8AA6A";
c.fillRect(i, 0, 3, Hh);
} c.fillStyle = "rgba(60,40,20,.35)"; for (var j = 0; j < Hh; j += 16)
c.fillRect(0, j, W, 3); }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 1); var m = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }); return m; });
var N = 24, Rr = 11;
for (var k = 0; k < N; k++) {
var a = (k + 0.5) / N * Math.PI * 2;
if (Math.abs(Math.cos(a) - 0) < 0.2 && Math.sin(a) > 0.9)
continue;
var wx = x + Math.cos(a) * Rr, wz = z + Math.sin(a) * Rr;
var p = new THREE.Mesh(new THREE.PlaneGeometry(2.95, 3.4), reed);
p.position.set(wx, y + 1.7, wz);
p.rotation.y = -a + Math.PI / 2;
G.add(p);
dkwSolid(wx, wz, 2.95, 0.4, -50, 400, a - Math.PI / 2);
dkwCyl(G, 0.08, 0.08, 3.8, dkwMat("darkbark"), wx, y, wz, 6);
}
var top = new THREE.Mesh(new THREE.TorusGeometry(Rr, 0.18, 6, 48), dkwMat("darkbark"));
top.rotation.x = Math.PI / 2;
top.position.set(x, y + 3.6, z);
G.add(top);
var fl = new THREE.Mesh(new THREE.CircleGeometry(Rr, 40), dkwS("b:velvet", 0x7A3A22, 2));
fl.rotation.x = -Math.PI / 2;
fl.position.set(x, y + 0.04, z);
G.add(fl);
for (k = 0; k < 7; k++) {
var ca = Math.PI * 1.5 + (k - 3) * 0.32, cx = x + Math.cos(ca) * 6, cz = z + Math.sin(ca) * 6;
var cu = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.25, 12), dkwS("b:velvet", [0xA8642A, 0x6A2A1A, 0xC8A040][k % 3], 1));
cu.position.set(cx, y + 0.12, cz);
G.add(cu);
}
for (k = 0; k < 6; k++) {
var cx2 = x - 3 + k * 1.2, cz2 = z + 2;
var cu2 = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 0.22, 12), dkwS("b:velvet", 0x3A2A20, 1));
cu2.position.set(cx2, y + 0.11, cz2);
G.add(cu2);
}
if (!lite)
for (k = 0; k < 30; k++) {
var mo = new THREE.Mesh(new THREE.SphereGeometry(0.03, 4, 3), dkwGlowM(0xFFF0C8, 0.8));
mo.position.set(x + Math.cos(k) * 5, y + 1 + ((k * 7) % 30) / 10, z + Math.sin(k * 1.3) * 5);
mo.userData.kind = "float";
mo.userData.y0 = mo.position.y;
mo.userData.amp = 0.3;
mo.userData.f = 0.3;
mo.userData.ph = k;
G.add(mo);
DKW.bob.push(mo);
}
var shaft = new THREE.Mesh(new THREE.CylinderGeometry(Rr - 1, Rr - 1, 8, 24, 1, true), dkwGlowM(0xFFE8B0, 0.05));
shaft.position.set(x, y + 4, z);
G.add(shaft);
})();
(function () {
var big = dkcScaleTent(G, 96, -200, 0, R, { c: 1, w: 6, d: 7, h: 3.6, lit: 1 });
dkwDoorTo(G, "drakcamp", 0, 96, -196.4, 0, "The flap of the Matriarch's tent", 9, 9, { col: 0x3A1A0E, frame: dkwMat("darkbark") });
dkcScaleTent(G, 44, -66, 0, R, { c: 2, w: 4.4, d: 5, h: 3 });
dkwDoorTo(G, "drakcamp", 1, 44, -63.4, 0, "The flap of your sleeping tent", 10, 8, { col: 0x2A140A, frame: dkwMat("darkbark") });
})();
var look = function (g, Rr) { dkfDrakkyn(g, [0xC83A2A, 0x2A6A4A, 0x8A5A1A, 0x3A3A6A, 0xA87A2A][Math.floor(Rr() * 5)], Rr); };
var skins = [0x8A4A2A, 0x6A3A2A, 0x5A4A3A, 0x7A5A3A, 0x4A3A3A];
dkwCrowd(27080, lite ? 16 : 40, -170, -300, 170, 40, { dress: "dkdrakkyn", wander: 12, skins: skins, childP: 0.22, look: look, ok: function (x, z) { return Math.abs(x) > 8 && Math.hypot(x, z + 140) > 10; }, names: ["A Drakkyn hunter", "A Drakkyn mother", "A scale-weaver", "A young Drakkyn", "A Drakkyn sentry", "A Drakkyn elder"], says: ["Vivienne's son? The one who left for the mortal realm?", "Mind the fires, outsider. They burn hotter than they look.", "The sentries are on edge. Something is moving in the hills.", "Those flowers bloom once every seven years. It is a sign.", "Show me your flame. Is it gold?", "The Matriarch decides who stays. Not us."] });
dkwCrowd(27081, lite ? 6 : 14, -122, -52, -98, -28, { dress: "dkdrakkyn", wander: 4, skins: skins, look: look, names: ["A Drakkyn warrior at practice", "A flame-dancer"], says: ["Strike, then burn. The fire follows the fist.", "Again. Slower. Let the flame come to you."] });
dkcMotes(G, lite ? 60 : 200, 0, -140, 300, 1, 8, 0xFFC870);
},
function (x, z) {
var n = dkwFbm(x * 0.007, z * 0.007, 3), ax = Math.abs(x);
if (z > 480)
return n * 6 + Math.sin(x * 0.02) * 1.5;
if (z > 260)
return n * 8 + (480 - z) * 0.05;
if (z > 90)
return n * 10 + 11 + (260 - z) * 0.15 + ax * 0.02;
if (z > -150) {
return ax < 9 ? 37 + n * 0.8 : Math.min(160, 37 + (ax - 9) * 4) + n * 16;
}
return Math.min(260, 37 + (-150 - z) * 0.7 + ax * 0.06) + n * 22;
},
function (key, draw, glow) {
return dkwM("etch" + key, function () {
var t = dkwCanvas("etchT" + key, 512, 256, function (c, W, H) { c.fillStyle = "#3A2410"; c.fillRect(0, 0, W, H); for (var i = 0; i < 300; i++) {
c.fillStyle = "rgba(0,0,0," + (Math.random() * 0.15) + ")";
c.fillRect(Math.random() * W, Math.random() * H, 3, 3);
} c.strokeStyle = "#FFC860"; c.fillStyle = "#FFB040"; c.lineWidth = 3; draw(c, W, H); });
var m = new THREE.MeshPhongMaterial({ map: t, emissive: 0xFFA040, emissiveMap: t, emissiveIntensity: glow || 0.35 });
m.userData.noPhoto = 1;
return m;
});
},
function (c, x, y, s, arms) { c.beginPath(); c.arc(x, y - 34 * s, 6 * s, 0, Math.PI * 2); c.stroke(); c.beginPath(); c.moveTo(x, y - 28 * s); c.lineTo(x, y - 6 * s); c.moveTo(x, y - 6 * s); c.lineTo(x - 8 * s, y + 14 * s); c.moveTo(x, y - 6 * s); c.lineTo(x + 8 * s, y + 14 * s); c.moveTo(x - (arms || 12) * s, y - 22 * s); c.lineTo(x + (arms || 12) * s, y - 22 * s); c.stroke(); c.beginPath(); c.moveTo(x - 4 * s, y - 40 * s); c.lineTo(x - 7 * s, y - 48 * s); c.moveTo(x + 4 * s, y - 40 * s); c.lineTo(x + 7 * s, y - 48 * s); c.stroke(); },
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var lite = dkwLite();
var scaleM = dkwM("aurelianScales", function () { var t = dkwCanvas("aurelianT", 256, 256, function (c, W, H) { c.fillStyle = "#B8862A"; c.fillRect(0, 0, W, H); for (var r = 0; r < 16; r++)
for (var q = 0; q < 9; q++) {
var cx = q * 30 + (r % 2) * 15, cy = r * 16;
var gr = c.createRadialGradient(cx, cy - 4, 2, cx, cy, 16);
gr.addColorStop(0, "#FFE89A");
gr.addColorStop(0.6, "#D8A040");
gr.addColorStop(1, "#6A4210");
c.fillStyle = gr;
c.beginPath();
c.arc(cx, cy, 15, 0, Math.PI);
c.fill();
} }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 6); var m = new THREE.MeshPhongMaterial({ map: t, color: 0xFFE0A0, specular: 0xFFE8A0, shininess: 90, emissive: 0x3A2408 }); return m; });
var belly = dkwShine(0xE8C878, 0.3, 0.6), horn = dkwShine(0x6A4A2A, 0.4, 0.3), claw = dkwShine(0x2A1A0A, 0.3, 0.5);
var pts = [], rad = [];
for (var i = 0; i <= 26; i++) {
var t = i / 26, a = Math.PI * 0.5 + t * Math.PI * 3.2, r = 12 - t * 6;
pts.push([Math.cos(a) * r, 2.6 - t * 1.6 + Math.sin(t * 9) * 0.3, -14 + Math.sin(a) * r * 0.8]);
rad.push(3.2 * (1 - t) + 0.25);
}
var body = new THREE.Mesh(dkwTaper(pts, rad, lite ? 60 : 120, lite ? 10 : 16), scaleM);
g.add(body);
for (i = 1; i < 22; i += 1) {
var p = pts[i];
var sp = new THREE.Mesh(dkwGeo("aurSpine", function () { return new THREE.ConeGeometry(0.5, 2, 5); }), horn);
sp.position.set(p[0], p[1] + rad[i] * 0.95, p[2]);
sp.scale.setScalar(rad[i] / 3);
g.add(sp);
}
var neckPts = [[0, 2.6, -2.0], [0, 4.6, -6], [0, 5.6, -10], [1.6, 4.4, -13.6]];
var neck = new THREE.Mesh(dkwTaper(neckPts, [2.0, 2.4, 2.8, 3.2], lite ? 24 : 40, lite ? 10 : 14), scaleM);
g.add(neck);
var hg = new THREE.Group();
hg.position.set(0, 2.6, -1.2);
g.add(hg);
hg.userData.kind = "float";
hg.userData.y0 = 2.6;
hg.userData.amp = 0.08;
hg.userData.f = 0.25;
hg.userData.ph = 0;
DKW.bob.push(hg);
dkwEll(hg, scaleM, 1.9, 1.5, 2.6, 0, 0.2, 0.8);
dkwEll(hg, scaleM, 1.2, 0.8, 2.4, 0, -0.1, 3.2);
dkwEll(hg, belly, 1.0, 0.4, 2.2, 0, -0.7, 2.8);
dkwEll(hg, scaleM, 0.7, 0.4, 0.6, 0, -0.1, 5.4);
[-1, 1].forEach(function (k) {
dkwEll(hg, horn, 0.5, 0.35, 1.4, k * 1.1, 1.0, 0.6);
var ey = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), dkwGlowM(0xFFC020, 1));
ey.position.set(k * 1.25, 0.7, 1.9);
ey.scale.set(0.7, 1, 1);
hg.add(ey);
var pu = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.6, 0.1), dkwLam(0x1A0A00));
pu.position.set(k * 1.5, 0.7, 2.05);
hg.add(pu);
var hp = [], hr = [];
for (var j = 0; j <= 10; j++) {
var t = j / 10, a = t * Math.PI * 2.4;
hp.push([k * (1.2 + t * 2.4 + Math.cos(a) * 0.6), 1.2 + t * 7.5, -0.4 - t * 2.4 + Math.sin(a) * 0.6]);
hr.push(0.5 * (1 - t) + 0.06);
}
var hn = new THREE.Mesh(dkwTaper(hp, hr, lite ? 24 : 40, 8), horn);
hg.add(hn);
for (j = 0; j < 4; j++) {
var tn = new THREE.Mesh(new THREE.ConeGeometry(0.12, 1.0, 5), horn);
var q = hp[2 + j * 2];
tn.position.set(q[0] + k * 0.4, q[1], q[2]);
tn.rotation.z = -k * 0.9;
hg.add(tn);
}
for (j = 0; j < 5; j++) {
var tooth = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.35, 4), dkwLam(0xF0E8D0));
tooth.position.set(k * (0.9 - j * 0.12), -0.55, 2.6 + j * 0.5);
tooth.rotation.x = Math.PI;
hg.add(tooth);
}
var wh = new THREE.Mesh(dkwTaper([[k * 0.9, -0.2, 4.4], [k * 2.2, -0.6, 3.6], [k * 3.6, -1.4, 2.2]], [0.06, 0.04, 0.01], 10, 5), horn);
hg.add(wh);
});
[-1, 1].forEach(function (k) { var lp = [[k * 3.6, 2.4, -6], [k * 4.4, 1.2, -3], [k * 2.6, 0.5, 0.6]]; var lg = new THREE.Mesh(dkwTaper(lp, [1.5, 1.1, 0.8], 20, 10), scaleM); g.add(lg); for (var j = 0; j < 4; j++) {
var cl = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.2, 6), claw);
cl.position.set(k * 2.6 + (j - 1.5) * 0.5, 0.3, 1.6);
cl.rotation.x = Math.PI / 2;
g.add(cl);
} });
var wingM = dkwM("aurWing", function () { var m = new THREE.MeshPhongMaterial({ color: 0xC8902A, emissive: 0x4A2A08, side: THREE.DoubleSide, transparent: true, opacity: 0.92, shininess: 40 }); return m; });
[-1, 1].forEach(function (k) { var s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(18, 3); s.quadraticCurveTo(14, -2, 16, -6); s.quadraticCurveTo(10, -4, 10, -8); s.quadraticCurveTo(5, -5, 4, -9); s.quadraticCurveTo(1, -5, 0, 0); var w = new THREE.Mesh(new THREE.ShapeGeometry(s), wingM); w.position.set(k * 2.4, 5.4, -8); w.rotation.set(-0.15, k > 0 ? -Math.PI / 2 + 0.2 : Math.PI / 2 - 0.2, k * 1.1); g.add(w); var bone = new THREE.Mesh(dkwTaper([[k * 2.4, 5.4, -8], [k * 4, 8.4, -16], [k * 3, 9, -26]], [0.35, 0.28, 0.12], 12, 6), scaleM); g.add(bone); });
if (!dkwLite()) {
var L = new THREE.PointLight(0xFFC860, 1.6, 60, 1.6);
L.position.set(0, 14, -6);
g.add(L);
}
if (!lite)
for (i = 0; i < 60; i++) {
var sp2 = new THREE.Mesh(dkwGeo("aurSpark", function () { return new THREE.SphereGeometry(0.06, 6, 4); }), dkwGlowM(0xFFF0B0, 1));
var pp = pts[i % 26];
sp2.position.set(pp[0] + (Math.random() - 0.5) * rad[i % 26] * 2, pp[1] + rad[i % 26], pp[2] + (Math.random() - 0.5) * rad[i % 26] * 2);
sp2.userData.kind = "float";
sp2.userData.y0 = sp2.position.y;
sp2.userData.amp = 0.12;
sp2.userData.f = 1.4;
sp2.userData.ph = i;
g.add(sp2);
DKW.bob.push(sp2);
}
var gh = new THREE.Group();
gh.position.set(-2.6, 1.4, 2.6);
g.add(gh);
var hdl = new THREE.Mesh(dkwTaper([[0, 0, -0.5], [0.12, 0.1, 0], [0, 0.05, 0.5]], [0.07, 0.09, 0.06], 16, 8), dkwShine(0x0A0A10, 0.06, 0.9));
gh.add(hdl);
for (i = 0; i < 6; i++) {
var v = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.09, 4), dkwShine(0x0A0A10, 0.06, 0.9));
v.position.set(0.05, 0.14, -0.4 + i * 0.16);
gh.add(v);
}
gh.add(wGlow(0xC8E0FF, 0.5, 1));
gh.userData.sp = 0.3;
DKW.spin.push(gh);
dkwShow("ghostheart", gh, true);
return g;
},
function (G) {
var lite = dkwLite(), H = dkwDragH, R = wRand(28028);
var bandM = dkwM("ravineBands", function () { var t = dkwCanvas("ravineBandsT", 128, 256, function (c, W, Hh) { var cols = ["#8A3A1E", "#2A2422", "#A8502A", "#3A3030", "#7A3A22", "#1E1A1A"]; for (var y = 0; y < Hh; y += 8) {
c.fillStyle = cols[Math.floor(y / 8 + Math.sin(y) * 1.5 + 6) % 6];
c.fillRect(0, y, W, 8);
} for (var i = 0; i < 26; i++) {
c.strokeStyle = "rgba(255,210,90,.85)";
c.lineWidth = 1.5;
c.beginPath();
var yy = Math.random() * Hh;
c.moveTo(0, yy);
c.bezierCurveTo(40, yy + 10, 80, yy - 12, W, yy + 4);
c.stroke();
} }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1, 4); var m = new THREE.MeshPhongMaterial({ map: t, emissive: 0x3A2008, shininess: 20 }); return m; });
dkwTerrain(G, -900, -900, 1800, 1800, lite ? 18 : 9, H, dkwMat("grass"), function (x, z, y, c) {
var n = dkwFbm(x * 0.03, z * 0.03, 2);
if (z > 260) {
c.setRGB(0.3 + n * 0.08, 0.52 + n * 0.1, 0.2 + n * 0.05);
return;
}
if (z > 90) {
var t = (260 - z) / 170;
c.setRGB(0.3 + t * 0.22 + n * 0.06, 0.5 - t * 0.12 + n * 0.06, 0.2 + t * 0.14 + n * 0.04);
return;
}
var snow = Math.min(1, Math.max(0, (y - 200) / 40));
c.setRGB(0.48 + n * 0.06 + snow * 0.4, 0.4 + n * 0.05 + snow * 0.48, 0.36 + n * 0.04 + snow * 0.56);
});
var bigTrees = [];
for (var i = 0; i < (lite ? 20 : 52); i++) {
var tx = (R() < 0.5 ? -1 : 1) * (10 + R() * 240), tz = 480 + R() * 420;
bigTrees.push({ x: tx, z: tz, y: H(tx, tz) - 0.3, s: 1.8 + R() * 1.0, ry: R() * 6 });
}
dkwPlant(G, "tree", bigTrees, {});
dkwPlant(G, "tree", dkwScatter(28030, lite ? 30 : 90, -700, 480, 700, 900, function (x, z) { return Math.abs(x) > 14; }, H, 0.9, 1.4), {});
[[[-60, 900], [-40, 760], [-70, 640], [-30, 520], [-50, 420]], [[90, 900], [120, 780], [80, 660], [110, 540]]].forEach(function (s) { dkwStrip(G, s, 4, function (x, z) { return H(x, z) + 0.12; }, dkwWaterM(0x6AB8D8, 0.85), 0.12); });
dkwStrip(G, [[0, 860], [4, 700], [-3, 560], [0, 420], [2, 280], [0, 150], [0, 60]], 3, function (x, z) { return H(x, z) + 0.04; }, dkwS("b:limestone", 0x8A7A5A, 4), 0.04);
dkwPlant(G, "flowers", dkwScatter(28031, lite ? 60 : 200, -300, 280, 300, 480, function (x, z) { return Math.abs(x) > 3; }, H, 0.8, 1.4), {});
dkwPlant(G, "grass", dkwScatter(28032, lite ? 60 : 220, -400, 280, 400, 900, null, H, 0.8, 1.4), {});
if (!lite)
for (i = 0; i < 70; i++) {
var fx = (R() - 0.5) * 160, fz = 300 + R() * 170, fl = new THREE.Mesh(dkwGeo("songmote", function () { return new THREE.SphereGeometry(0.06, 6, 4); }), dkwGlowM([0xFFE07A, 0xC8A0FF, 0x8AE8FF][i % 3], 0.9));
fl.position.set(fx, H(fx, fz) + 0.6, fz);
fl.userData.kind = "float";
fl.userData.y0 = fl.position.y;
fl.userData.amp = 0.25;
fl.userData.f = 0.9 + (i % 5) * 0.2;
fl.userData.ph = i;
G.add(fl);
DKW.bob.push(fl);
}
(function () {
var x = 24, z = 372, y = H(x, z);
for (var k = 0; k < 9; k++) {
var a = k / 9 * 6.283, st = new THREE.Mesh(new THREE.DodecahedronGeometry(0.7 + R() * 0.4, 0), dkwMat("moss"));
st.position.set(x + Math.cos(a) * 2.2, y + 0.2, z + Math.sin(a) * 2.2);
st.rotation.set(R(), R(), R());
G.add(st);
}
dkwWater(G, x, z, 3.6, 3.6, y + 0.15, 0x7AD0E8, 0.8);
dkwRound(x, z, 2.6);
for (k = 0; k < 8; k++) {
var b = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), dkwGlowM(0xD8F8FF, 0.6));
b.position.set(x + (R() - 0.5) * 1.2, y + 0.2, z + (R() - 0.5) * 1.2);
b.userData.kind = "float";
b.userData.y0 = y + 0.2;
b.userData.amp = 0.08;
b.userData.f = 3;
b.userData.ph = k;
G.add(b);
DKW.bob.push(b);
}
})();
dkwPlant(G, "conifer", dkwScatter(28033, lite ? 24 : 80, -260, 90, 260, 280, function (x, z) { return Math.abs(x) > 8; }, H, 0.5, 0.9), { col: 0x4A6A4A });
dkwPlant(G, "rock", dkwScatter(28034, lite ? 24 : 80, -300, -140, 300, 280, function (x, z) { return Math.abs(x) > 6; }, H, 0.6, 2.2), {});
if (!lite)
for (i = 0; i < 60; i++) {
var px = (R() - 0.5) * 80, pz = 100 + R() * 170, fr = new THREE.Mesh(dkwGeo("frostpetal", function () { return new THREE.ConeGeometry(0.12, 0.16, 6); }), dkwShine(0xE8F4FF, 0.1, 0.4));
fr.position.set(px, H(px, pz) + 0.1, pz);
fr.rotation.x = Math.PI;
G.add(fr);
}
for (var z = 86; z > -140; z -= 12) {
[-1, 1].forEach(function (s) { var w = 14 + R() * 6, h = 60 + R() * 50, off = 4.2 + R() * 1.2 + w / 2; var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 13), bandM); m.position.set(s * off, 37 + h / 2 - 6, z); m.rotation.y = (R() - 0.5) * 0.1; G.add(m); dkwSolid(s * off, z, w, 13, -50, 400, 0); });
}
dkwBox(G, 40, 80, 16, bandM, 0, 30, -150);
dkwSolid(0, -150, 40, 16);
(function () {
var y = H(0, -142);
var fis = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 3.2), dkwLam(0x050302));
fis.position.set(0, y + 1.6, -141.9);
G.add(fis);
var gl = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 2.6), dkwGlowM(0xFFA040, 0.25));
gl.position.set(0, y + 1.4, -141.85);
G.add(gl);
dkwDoorTo(G, "dragoon", 0, 0, -141.8, 0, "The fissure: squeeze through, into the mountain", 10, 60, { col: 0x050302, frame: bandM, y: y });
})();
var rockM = dkwS("b:strata", 0x6A5A52, 10), snowM = dkwMat("snow");
(function () {
var face = new THREE.Mesh(new THREE.BoxGeometry(700, 520, 220), rockM);
face.position.set(0, 140, -540);
G.add(face);
dkwSolid(0, -540, 700, 220);
var cap = new THREE.Mesh(new THREE.BoxGeometry(700, 30, 220), snowM);
cap.position.set(0, 400, -540);
G.add(cap);
var pk = new THREE.Mesh(new THREE.ConeGeometry(420, 820, 10), rockM);
pk.position.set(60, 560, -900);
G.add(pk);
var ps = new THREE.Mesh(new THREE.ConeGeometry(180, 330, 10), snowM);
ps.position.set(60, 810, -900);
G.add(ps);
for (var k = 0; k < (lite ? 10 : 30); k++) {
var bx = -330 + R() * 660, by = 60 + R() * 320, bt = new THREE.Mesh(new THREE.DodecahedronGeometry(6 + R() * 12, 0), rockM);
bt.position.set(bx, by, -428 - R() * 6);
bt.scale.set(1.4, 1, 0.5);
if (Math.abs(by - DG_LEDGE_Y) < 14 && Math.abs(bx) < 140)
continue;
G.add(bt);
}
})();
(function () {
var y = DG_LEDGE_Y, zW = -430;
var segs = [[-130, -60, 3.2], [-60, -20, 2.2], [-20, 30, 1.2], [30, 70, 2.2], [70, 130, 3.2]];
segs.forEach(function (s) { var w = s[1] - s[0], cx = (s[0] + s[1]) / 2, d = s[2], cz = zW + d / 2; var sh = new THREE.Mesh(new THREE.BoxGeometry(w, 3, d), rockM); sh.position.set(cx, y - 1.5, cz); G.add(sh); dkwFloor(cx, cz, w, d, y); dkwSolid(cx, cz + d / 2 + 0.25, w, 0.5, y - 2, y + 60); });
for (var k = 0; k < (lite ? 10 : 26); k++) {
var px = -120 + k * 9.4, pb = new THREE.Mesh(new THREE.DodecahedronGeometry(0.3, 0), rockM);
pb.position.set(px, y + 0.15, zW + 0.6);
G.add(pb);
}
var arch = new THREE.Group();
arch.position.set(126, y, zW + 0.2);
G.add(arch);
[-1.2, 1.2].forEach(function (k) { dkwBox(arch, 0.6, 3, 0.8, rockM, k, 0, 0); });
var ab = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.32, 8, 16, Math.PI), rockM);
ab.position.set(0, 3, 0);
arch.add(ab);
var scr = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.5), dkcEtchM("draconic", function (c, W, Hh) { c.font = "bold 120px serif"; c.textBaseline = "middle"; c.fillStyle = "#FFD070"; c.fillText("ᚱᛟᚷᚨ ᛞᚱᚨᚲ ᚹᛖᛚ", 10, Hh / 2); }, 0.5));
scr.position.set(0, 3.9, 0.45);
arch.add(scr);
var dk = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 3), dkwLam(0x020100));
dk.position.set(0, 1.5, 0.05);
arch.add(dk);
dkwDoorTo(G, "dragoon", 4, 126, zW + 0.9, 0, "The archway: step into the shadow", 64, 64, { col: 0x020100, frame: rockM, y: y });
})();
var look = function (g, Rr) { if (typeof dkfDrakkyn === "function")
dkfDrakkyn(g, [0xC83A2A, 0x2A6A4A, 0x8A5A1A, 0x3A3A6A][Math.floor(Rr() * 4)], Rr); };
dkwCrowd(28080, lite ? 6 : 16, -120, 560, 120, 860, { dress: "dkdrakkyn", wander: 14, skins: [0x8A4A2A, 0x6A3A2A, 0x7A5A3A], look: look, ok: function (x, z) { return Math.abs(x) > 6; }, names: ["A Drakkyn herder", "A traveller from the valley", "A Drakkyn woman gathering herbs"], says: ["The mountain has its own weather. Its own rules.", "You are going to the Heartkeepers? Speak truth to them.", "The flowers sing when the fae walk by. Listen."] });
dkcMotes(G, lite ? 60 : 200, 0, 600, 400, 1, 10, 0xFFF8D0);
},
function (g) {
var skin = dkwM("sirenSkin", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8E8F0, emissive: 0x2A4A5A, transparent: true, opacity: 0.85, shininess: 80 }); return m; }), hair = dkwGlowM(0x9AE8D8, 0.5);
var bd = new THREE.Mesh(dkwTaper([[0, 0, 0], [0, 0.8, 0.05], [0, 1.4, 0], [0, 1.75, 0.04]], [0.12, 0.16, 0.13, 0.06], 14, 8), skin);
g.add(bd);
dkwEll(g, skin, 0.11, 0.14, 0.12, 0, 1.9, 0.02);
[-1, 1].forEach(function (k) { var ar = new THREE.Mesh(dkwTaper([[k * 0.15, 1.55, 0], [k * 0.45, 1.3, 0.25], [k * 0.62, 0.9, 0.5]], [0.04, 0.035, 0.025], 10, 6), skin); g.add(ar); for (var j = 0; j < 3; j++) {
var cl = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.14, 4), dkwLam(0x1A2A2A));
cl.position.set(k * (0.62 + j * 0.03), 0.82, 0.54);
cl.rotation.x = 1.6;
g.add(cl);
} var wb = new THREE.Mesh(new THREE.CircleGeometry(0.08, 6), skin); wb.position.set(k * 0.64, 0.86, 0.5); g.add(wb); });
for (var i = 0; i < 9; i++) {
var h = new THREE.Mesh(dkwTaper([[(i - 4) * 0.022, 1.98, -0.04], [(i - 4) * 0.04, 1.7, -0.2], [(i - 4) * 0.06 + Math.sin(i) * 0.08, 1.2, -0.3]], [0.018, 0.014, 0.004], 10, 4), hair);
g.add(h);
}
var mo = new THREE.Mesh(new THREE.CircleGeometry(0.035, 10), dkwLam(0x0A0A10));
mo.position.set(0, 1.84, 0.13);
g.add(mo);
for (i = 0; i < 6; i++) {
var t = new THREE.Mesh(new THREE.ConeGeometry(0.004, 0.025, 3), dkwLam(0xF0F0F0));
t.position.set(-0.025 + i * 0.01, 1.86, 0.135);
t.rotation.x = Math.PI;
g.add(t);
}
[-1, 1].forEach(function (k) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 6), dkwGlowM(0x6AFFE8, 1)); e.position.set(k * 0.04, 1.93, 0.11); g.add(e); });
},
function (G) {
var lite = dkwLite(), H = dkwMarshH, R = wRand(30030);
dkwTerrain(G, -900, -700, 1800, 1600, lite ? 18 : 9, H, dkwMat("earth"), function (x, z, y, c) {
var n = dkwFbm(x * 0.03, z * 0.03, 2);
if (z > 660) {
c.setRGB(0.55 + n * 0.06, 0.36 + n * 0.05, 0.28 + n * 0.04);
return;
}
if (z > 220) {
c.setRGB(0.24 + n * 0.05, 0.3 + n * 0.06, 0.2 + n * 0.04);
return;
}
if (z > -80) {
c.setRGB(0.18 + n * 0.04, 0.18 + n * 0.04, 0.22 + n * 0.04);
return;
}
c.setRGB(0.36 + n * 0.06, 0.42 + n * 0.06, 0.26 + n * 0.04);
});
dkwPlant(G, "rock", dkwScatter(30031, lite ? 60 : 200, -400, 700, 400, 900, null, H, 0.3, 1.2), {});
(function () { var mm = dkwM("dragoonM2", function () { var m = new THREE.MeshBasicMaterial({ color: 0x5A4A5A, fog: false }); m.userData.noPhoto = 1; return m; }); var mt = new THREE.Mesh(new THREE.ConeGeometry(600, 1000, 9), mm); mt.position.set(-60, 380, 1700); G.add(mt); var sn = new THREE.Mesh(new THREE.ConeGeometry(220, 340, 9), dkwM("dragoonSnow", function () { var m = new THREE.MeshBasicMaterial({ color: 0xE8ECF4, fog: false }); m.userData.noPhoto = 1; return m; })); sn.position.set(-60, 720, 1700); G.add(sn); })();
if (!lite)
for (var i = 0; i < 60; i++) {
var fx = (R() - 0.5) * 80, fz = 680 + R() * 200, fr = new THREE.Mesh(new THREE.CircleGeometry(0.4 + R() * 0.6, 6), dkwShine(0xE8F0F8, 0.1, 0.5));
fr.rotation.x = -Math.PI / 2;
fr.position.set(fx, H(fx, fz) + 0.03, fz);
G.add(fr);
}
dkwWater(G, 0, 440, 1800, 440, -0.15, 0x2A3A2A, 0.88);
dkwPlant(G, "reeds", dkwScatter(30032, lite ? 80 : 260, -400, 240, 400, 650, function (x, z) { return Math.abs(x) > 5; }, function (x, z) { return -0.15; }, 0.8, 1.5), {});
dkwPlant(G, "mauritia", dkwScatter(30033, lite ? 10 : 30, -500, 260, 500, 640, function (x, z) { return Math.abs(x) > 40; }, H, 0.6, 1.0), {});
var path = [];
for (var z = 640; z > 230; z -= 2.6) {
var px = Math.sin(z * 0.04) * 6 + Math.sin(z * 0.013) * 10 * (z < 420 && z > 360 ? 0 : 1);
if (z < 360 && z > 230)
px = -14 + Math.sin(z * 0.05) * 3;
path.push([px, z]);
}
path.forEach(function (p, j) { if (j % 17 === 9)
return; var mossy = j % 3 === 0, s = mossy ? 1.9 : 1.2 + R() * 0.4; var st = new THREE.Mesh(mossy ? new THREE.CylinderGeometry(s, s * 1.1, 0.25, 10) : new THREE.DodecahedronGeometry(s * 0.7, 0), mossy ? dkwMat("moss") : dkwMat("rock")); st.position.set(p[0], mossy ? 0.0 : -0.3, p[1]); if (!mossy) {
st.scale.y = 0.45;
} st.rotation.y = R() * 3; G.add(st); dkwFloor(p[0], p[1], s * 1.6, s * 1.6, 0.12, { r: s * 0.95 }); });
for (i = 0; i < path.length; i += 17) {
var q = path[i + 9];
if (!q)
continue;
var qw = new THREE.Mesh(new THREE.CircleGeometry(1.4, 16), dkwM("quickwater", function () { var m = new THREE.MeshPhongMaterial({ color: 0x1A2A1A, emissive: 0x0A1A0A, shininess: 120, transparent: true, opacity: 0.95 }); return m; }));
qw.rotation.x = -Math.PI / 2;
qw.position.set(q[0], -0.1, q[1]);
G.add(qw);
dkwFloor(q[0], q[1], 3, 3, -0.05, { r: 1.6 });
}
if (!lite)
for (i = 0; i < 70; i++) {
var wx = (R() - 0.5) * 120, wz = 260 + R() * 380, w = new THREE.Mesh(dkwGeo("wisp", function () { return new THREE.SphereGeometry(0.12, 8, 6); }), dkwGlowM([0xB8FFE8, 0x8AC8FF, 0xE8FFB8][i % 3], 0.9));
w.position.set(wx, 0.8 + R() * 2, wz);
w.userData.kind = "float";
w.userData.y0 = w.position.y;
w.userData.amp = 0.5;
w.userData.f = 0.5 + R();
w.userData.ph = i;
G.add(w);
DKW.bob.push(w);
}
for (i = 0; i < (lite ? 8 : 24); i++) {
var dg = new THREE.Group();
var dx = (R() - 0.5) * 60, dz = 280 + R() * 340;
dg.position.set(dx, 1.4 + R(), dz);
G.add(dg);
var db = new THREE.Mesh(dkwTaper([[0, 0, -0.18], [0, 0, 0.12]], [0.03, 0.02], 6, 6), dkwShine([0x3AA8E8, 0x8A3AE8, 0x3AE8A8][i % 3], 0.3, 0.9));
dg.add(db);
[-1, 1].forEach(function (k) { var wg = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.08), dkwM("dfWing", function () { var m = new THREE.MeshPhongMaterial({ color: 0xE8F8FF, transparent: true, opacity: 0.5, side: THREE.DoubleSide, shininess: 120 }); return m; })); wg.position.set(k * 0.18, 0.02, 0.04); wg.rotation.x = -Math.PI / 2; dg.add(wg); });
var orb = new THREE.Group();
orb.position.set(dx, 0, dz);
G.add(orb);
G.remove(dg);
dg.position.set(1.4 + R() * 2, 1.2 + R(), 0);
orb.add(dg);
orb.userData.sp = 0.6 + R();
DKW.spin.push(orb);
}
for (i = 0; i < (lite ? 10 : 30); i++) {
var p2 = path[Math.floor(R() * path.length)], fg = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), dkwShine(0x4A8A2A, 0.3, 0.6));
fg.scale.set(1.2, 0.8, 1);
fg.position.set(p2[0] + (R() < 0.5 ? -1.6 : 1.6), 0.12, p2[1]);
G.add(fg);
var th = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), dkwShine(0xE8E8B0, 0.3, 0.4));
th.position.set(fg.position.x, 0.1, fg.position.z + 0.08);
th.userData.kind = "float";
th.userData.y0 = 0.1;
th.userData.amp = 0.03;
th.userData.f = 4 + i % 3;
th.userData.ph = i;
G.add(th);
DKW.bob.push(th);
}
for (i = 0; i < (lite ? 20 : 60); i++) {
var bx = (R() - 0.5) * 40, bz = 600 + R() * 80;
if (Math.abs(bx - 6) < 5 && Math.abs(bz - 650) < 5)
continue;
var bp = new THREE.Mesh(dkwGeo("biolum", function () { var c = new THREE.CylinderGeometry(0.02, 0.03, 0.9, 5); c.translate(0, 0.45, 0); return c; }), dkwLam(0x2A4A3A));
bp.position.set(bx, H(bx, bz), bz);
G.add(bp);
var bl = new THREE.Mesh(dkwGeo("biolumB", function () { return new THREE.SphereGeometry(0.1, 8, 6); }), dkwGlowM([0x8AF8E8, 0xC8A8FF, 0xB8FF8A][i % 3], 0.8));
bl.position.set(bx, H(bx, bz) + 0.95, bz);
bl.userData.kind = "float";
bl.userData.y0 = bl.position.y;
bl.userData.amp = 0.05;
bl.userData.f = 0.4;
bl.userData.ph = i;
G.add(bl);
DKW.bob.push(bl);
}
(function () {
var x = 6, z = 650, y = H(x, z);
[[-2.4, 0], [2.4, 0]].forEach(function (o, j) {
var tp = new THREE.Mesh(dkwGeo("tarp", function () { var s = new THREE.Shape(); s.moveTo(-1, 0); s.lineTo(1, 0); s.lineTo(0, 1); s.lineTo(-1, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false }); e.translate(0, 0, -0.5); return e; }), dkwShine([0x5A4A2A, 0x4A4A3A][j], 0.2, 0.5));
tp.scale.set(2.2, 1.2, 2.6);
tp.position.set(x + o[0], y, z + o[1]);
G.add(tp);
dkwSolid(x + o[0], z + o[1], 2.2, 2.6);
var ws = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22, 0), dkwGlowM(0xFF8A3A, 0.6));
ws.position.set(x + o[0], y + 0.2, z + o[1] + 1.8);
G.add(ws);
});
var pk = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.3), dkwMat("leather"));
pk.position.set(x, y + 0.3, z - 1.6);
G.add(pk);
})();
(function () {
var gw = new THREE.Mesh(new THREE.CircleGeometry(80, 48), dkwM("glassfield", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8AB8C8, emissive: 0x1A3A4A, shininess: 180, specular: 0xFFFFFF, transparent: true, opacity: 0.9 }); return m; }));
gw.rotation.x = -Math.PI / 2;
gw.position.set(70, -0.08, 320);
G.add(gw);
var pet = [];
for (var k = 0; k < (lite ? 160 : 520); k++) {
var a = R() * 6.283, r = Math.sqrt(R()) * 78;
pet.push({ x: 70 + Math.cos(a) * r, z: 320 + Math.sin(a) * r, y: -0.04, s: 0.6 + R() * 0.8, ry: R() * 6 });
}
dkwInst(G, dkwGeo("glowpetal", function () { var g = new THREE.CircleGeometry(0.3, 5); g.rotateX(-Math.PI / 2); return g; }), dkwGlowM(0xFFC8E8, 0.7), pet, { cull: false });
var sir = new THREE.Group();
G.add(sir);
[[40, 318], [48, 330], [44, 304], [56, 322], [38, 338]].forEach(function (p, j) { var s = new THREE.Group(); s.position.set(p[0], -0.4, p[1]); s.rotation.y = -Math.PI / 2 + (j - 2) * 0.2; s.scale.setScalar(1.1); sir.add(s); dkxSiren(s); s.userData.kind = "float"; s.userData.y0 = -0.4; s.userData.amp = 0.2; s.userData.f = 0.6; s.userData.ph = j; DKW.bob.push(s); });
dkwShow("sirens", sir, false);
var sw = new THREE.Group();
G.add(sw);
for (k = 0; k < 6; k++) {
var ring = new THREE.Mesh(new THREE.RingGeometry(1 + k * 1.4, 1.2 + k * 1.4, 40), dkwGlowM(0xC8FFF0, 0.25));
ring.rotation.x = -Math.PI / 2;
ring.position.set(46, 0.2 + k * 0.3, 322);
sw.add(ring);
}
dkwShow("sirensong", sw, false);
})();
(function () {
var bark = dkwM("petriBark", function () { var t = dkwCanvas("petriBarkT", 64, 256, function (c, W, Hh) { c.fillStyle = "#141218"; c.fillRect(0, 0, W, Hh); for (var i = 0; i < 14; i++) {
c.strokeStyle = "rgba(140,220,255,.9)";
c.lineWidth = 1 + Math.random() * 1.5;
c.beginPath();
var x = Math.random() * W;
c.moveTo(x, 0);
for (var y = 0; y < Hh; y += 24) {
x += (Math.random() - 0.5) * 14;
c.lineTo(x, y);
}
c.stroke();
} }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 2); var m = new THREE.MeshPhongMaterial({ map: t, emissive: 0x2A5A7A, emissiveMap: t, emissiveIntensity: 0.6, shininess: 90 }); return m; }), frost = dkwShine(0xE8F4FF, 0.1, 0.35);
var trees = [];
for (var k = 0; k < (lite ? 40 : 110); k++) {
var tx = (R() - 0.5) * 500, tz = -70 + R() * 290;
if (Math.abs(tx) < 7 && tz > -70)
continue;
if (Math.hypot(tx + 12, tz - 40) < 10)
continue;
trees.push([tx, tz, 2 + R() * 2.4, 30 + R() * 30]);
}
trees.forEach(function (t, j) {
var y = H(t[0], t[1]);
var tr = new THREE.Mesh(dkwGeo("petriTrunk", function () { var c = new THREE.CylinderGeometry(0.6, 1, 1, 9); c.translate(0, 0.5, 0); return c; }), bark);
tr.scale.set(t[2], t[3], t[2]);
tr.position.set(t[0], y - 0.5, t[1]);
G.add(tr);
dkwRound(t[0], t[1], t[2] * 0.95);
for (var b = 0; b < 3; b++) {
var a = j + b * 2.1, L = 6 + (j % 4) * 2, br = new THREE.Mesh(dkwTaper([[0, 0, 0], [Math.cos(a) * L * 0.5, L * 0.4, Math.sin(a) * L * 0.5], [Math.cos(a) * L, L * 0.55, Math.sin(a) * L]], [t[2] * 0.35, t[2] * 0.22, 0.1], 10, 6), bark);
br.position.set(t[0], y + t[3] * (0.55 + b * 0.12), t[1]);
G.add(br);
var fr2 = new THREE.Mesh(dkwTaper([[0, 0.05, 0], [Math.cos(a) * L * 0.5, L * 0.4 + 0.05, Math.sin(a) * L * 0.5], [Math.cos(a) * L, L * 0.55 + 0.05, Math.sin(a) * L]], [t[2] * 0.28, t[2] * 0.18, 0.08], 10, 6, 0.4), frost);
fr2.position.copy(br.position);
fr2.position.y += t[2] * 0.18;
G.add(fr2);
}
});
var ft = new THREE.Mesh(dkwTaper([[-30, 1.4, 30], [-18, 1.8, 36], [-4, 2.6, 42]], [1.2, 1.6, 2.0], 20, 10), bark);
G.add(ft);
for (k = 0; k < 12; k++) {
var ra = k / 12 * Math.PI * 2, rt = new THREE.Mesh(dkwTaper([[-4, 2.6, 42], [-4 + Math.cos(ra) * 2, 2.6 + Math.sin(ra) * 3, 40.4], [-4 + Math.cos(ra) * 4, 2.6 + Math.sin(ra) * 5.6, 38.6]], [0.5, 0.3, 0.08], 10, 6), bark);
G.add(rt);
}
dkwSolid(-17, 36, 28, 3, -50, 400, -0.4);
var etch = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), dkcEtchM("elden", function (c, W, Hh) { c.fillStyle = "#141218"; c.fillRect(0, 0, W, Hh); c.strokeStyle = "#9AE8FF"; c.lineWidth = 6; for (var i = 0; i < 6; i++) {
c.beginPath();
c.arc(W / 2, 30 + i * 38, 14, 0, Math.PI * (1 + i % 2));
c.stroke();
c.beginPath();
c.moveTo(W / 2 - 60, 40 + i * 38);
c.lineTo(W / 2 + 60, 30 + i * 38);
c.stroke();
} }, 0.6));
etch.position.set(6, H(6, 104) + 2, 104.2);
G.add(etch);
dkwRound(6, 103, 1.6);
var hg = new THREE.Group();
G.add(hg);
for (k = 0; k < (lite ? 120 : 400); k++) {
var h = new THREE.Mesh(dkwGeo("hail", function () { return new THREE.SphereGeometry(0.06, 5, 4); }), dkwShine(0xF0F8FF, 0.1, 0.4));
h.position.set(-12 + (R() - 0.5) * 60, 4 + R() * 20, 40 + (R() - 0.5) * 60);
h.userData.kind = "float";
h.userData.y0 = h.position.y;
h.userData.amp = 8;
h.userData.f = 2 + R();
h.userData.ph = k;
hg.add(h);
DKW.bob.push(h);
}
dkwShow("hail", hg, false);
var wd = new THREE.Mesh(new THREE.SphereGeometry(3.4, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), dkwGlowM(0x6AA8FF, 0.25));
wd.position.set(-12, H(-12, 40), 40);
var wg = new THREE.Group();
wg.add(wd);
G.add(wg);
dkwShow("ward", wg, false);
})();
dkcMoons(G, { n: 3 });
dkwPlant(G, "grass", dkwScatter(30034, lite ? 60 : 220, -400, -700, 400, -80, null, H, 0.8, 1.4), {});
dkwPlant(G, "bush", dkwScatter(30035, lite ? 14 : 40, -400, -700, 400, -80, function (x, z) { return Math.abs(x) > 8; }, H, 0.6, 1.1), { col: 0x4A5A3A });
(function () { var x = 10, z = -460, y = H(x, z); for (var k = 0; k < 10; k++) {
var a = Math.PI * 0.2 + k / 10 * Math.PI * 1.4, st = new THREE.Mesh(new THREE.DodecahedronGeometry(1.4 + R() * 1.2, 0), dkwMat("rock"));
st.position.set(x + Math.cos(a) * 6, y + 0.6, z + Math.sin(a) * 6);
st.rotation.set(R(), R(), R());
G.add(st);
dkwRound(st.position.x, st.position.z, 1.4);
} var wr = new THREE.Mesh(new THREE.CircleGeometry(2.4, 16), dkwGlowM(0xFFB070, 0.12)); wr.rotation.x = -Math.PI / 2; wr.position.set(x, y + 0.05, z); G.add(wr); })();
dkcMotes(G, lite ? 60 : 200, 0, 440, 200, 0.5, 4, 0xC8FFE8);
},
function (P, x, z, w, d, h, ry, R) {
var cols = [0x8A8A90, 0x9A948A, 0x7A7A82, 0xA8A098];
var g = dkwHouse(P, x, z, w, d, h, { ry: ry, wall: dkwS("b:ashlar", cols[Math.floor(R() * 4)], 2), roof: dkwMat("slate"), shut: [0x3A2A1A, 0x2A3A5A, 0x5A2A2A][Math.floor(R() * 3)], balcony: R() < 0.4 });
if (R() < 0.7) {
var bn = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 3.2), dkcBannerM(Math.floor(R() * 8)));
bn.position.set((R() - 0.5) * w * 0.5, h - 1.8, d / 2 + 0.12);
g.add(bn);
}
return g;
},
function (i) {
return dkwM("tyrbanner" + i, function () {
var cs = ["#B8282A", "#2A5AB8", "#E8B82A", "#2A8A4A", "#8A2AB8", "#E86A1A", "#1A8AA8", "#C8C8C8"];
var t = dkwCanvas("tyrbannerT" + i, 64, 128, function (c, W, H) {
c.fillStyle = cs[i];
c.fillRect(0, 0, W, H);
c.fillStyle = "rgba(255,255,255,.85)";
c.strokeStyle = "rgba(255,255,255,.85)";
c.lineWidth = 3;
if (i % 4 === 0) {
c.beginPath();
c.arc(W / 2, 50, 16, 0, Math.PI * 2);
c.stroke();
}
else if (i % 4 === 1) {
c.beginPath();
c.moveTo(W / 2, 30);
c.lineTo(W / 2 + 16, 70);
c.lineTo(W / 2 - 16, 70);
c.closePath();
c.fill();
}
else if (i % 4 === 2) {
c.fillRect(W / 2 - 14, 36, 28, 28);
}
else {
c.beginPath();
c.moveTo(W / 2, 30);
c.quadraticCurveTo(W / 2 + 20, 55, W / 2, 78);
c.quadraticCurveTo(W / 2 - 20, 55, W / 2, 30);
c.fill();
}
c.beginPath();
c.moveTo(0, H - 14);
c.lineTo(W / 2, H);
c.lineTo(W, H - 14);
c.lineTo(W, H);
c.lineTo(0, H);
c.fillStyle = "rgba(0,0,0,.3)";
c.fill();
});
return new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide });
});
},
function (G) {
var lite = dkwLite(), H = dkwTyrH, R = wRand(31031), granite = dkwS("b:ashlar", 0x6A6A72, 3), cob = dkwS("b:limestone", 0x7A7470, 6);
dkwTerrain(G, -900, -700, 1800, 1500, lite ? 18 : 9, H, dkwMat("grass"), function (x, z, y, c) { var n = dkwFbm(x * 0.03, z * 0.03, 2), r = Math.hypot(x, z); if (r < 300) {
c.setRGB(0.46 + n * 0.04, 0.44 + n * 0.04, 0.42 + n * 0.04);
return;
} if (z < -330) {
c.setRGB(0.4 + n * 0.05, 0.36 + n * 0.04, 0.3 + n * 0.04);
return;
} c.setRGB(0.36 + n * 0.06, 0.46 + n * 0.06, 0.26 + n * 0.05); });
dkwStrip(G, [[0, 700], [0, 560], [0, 420], [0, 300]], 7, function (x, z) { return H(x, z) + 0.05; }, cob, 0.05);
for (var z = 600; z > 320; z -= 14) {
[-1, 1].forEach(function (s) { var y = H(s * 5, z); dkwCyl(G, 0.07, 0.1, 3, dkwShine(0x2A2A30, 0.3, 0.8), s * 5, y, z, 6); var cr = new THREE.Mesh(dkwGeo("lantcrys", function () { return new THREE.OctahedronGeometry(0.28, 0); }), dkwGlowM([0x8AE8FF, 0xFFC86A, 0xC88AFF][Math.floor(z / 14) % 3], 0.9)); cr.position.set(s * 5, y + 3.3, z); cr.userData.kind = "float"; cr.userData.y0 = y + 3.3; cr.userData.amp = 0.08; cr.userData.f = 1; cr.userData.ph = z; G.add(cr); DKW.bob.push(cr); dkwRound(s * 5, z, 0.25); });
}
var WR = 300, WH = 22;
for (var a = 0; a < 64; a++) {
var a0 = a / 64 * Math.PI * 2, a1 = (a + 1) / 64 * Math.PI * 2, x0 = Math.sin(a0) * WR, z0 = Math.cos(a0) * WR, x1 = Math.sin(a1) * WR, z1 = Math.cos(a1) * WR;
var mx = (x0 + x1) / 2, mz = (z0 + z1) / 2, L = Math.hypot(x1 - x0, z1 - z0) + 0.6, ry = Math.atan2(x1 - x0, z1 - z0);
if (Math.abs(mx) < 10 && mz > 0)
continue;
if (Math.abs(mx) < 8 && mz < 0)
continue;
var w = new THREE.Mesh(new THREE.BoxGeometry(5, WH, L), granite);
w.position.set(mx, WH / 2, mz);
w.rotation.y = ry;
G.add(w);
dkwSolid(mx, mz, 5, L, -50, 400, -ry);
if (a % 2 === 0) {
var bn = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 9), dkcBannerM(a % 8));
var nx = Math.sin((a0 + a1) / 2), nz = Math.cos((a0 + a1) / 2);
bn.position.set(mx + nx * 2.62, WH - 6, mz + nz * 2.62);
bn.rotation.y = Math.atan2(nx, nz);
G.add(bn);
}
if (a % 4 === 0) {
var tw = dkwCyl(G, 4, 4.6, WH + 8, granite, mx, 0, mz, 10);
var cn = new THREE.Mesh(new THREE.ConeGeometry(5, 7, 10), dkwMat("slate"));
cn.position.set(mx, WH + 11.5, mz);
G.add(cn);
dkwRound(mx, mz, 4.6);
}
}
(function () {
[-1, 1].forEach(function (s) { dkwCyl(G, 5, 5.6, WH + 12, granite, s * 12, 0, WR, 10); var cn = new THREE.Mesh(new THREE.ConeGeometry(6, 8, 10), dkwMat("slate")); cn.position.set(s * 12, WH + 16, WR); G.add(cn); dkwRound(s * 12, WR, 5.6); });
dkwBox(G, 20, 6, 5, granite, 0, WH - 6, WR);
var gt = new THREE.Mesh(new THREE.TorusGeometry(7, 1, 8, 20, Math.PI), granite);
gt.position.set(0, WH - 6, WR + 2.6);
G.add(gt);
[-1, 1].forEach(function (s) { dkwCyl(G, 4, 4.4, WH + 6, granite, s * 12, 0, -WR, 10); dkwRound(s * 12, -WR, 4.4); });
})();
for (a = 0; a < 40; a++) {
var b0 = a / 40 * Math.PI * 2, b1 = (a + 1) / 40 * Math.PI * 2, ix = (Math.sin(b0) + Math.sin(b1)) / 2 * 160, iz = (Math.cos(b0) + Math.cos(b1)) / 2 * 160;
if (a % 5 === 0)
continue;
var L2 = 160 * (b1 - b0) + 0.4, r2 = Math.atan2(Math.sin(b1) - Math.sin(b0), Math.cos(b1) - Math.cos(b0));
var iw = new THREE.Mesh(new THREE.BoxGeometry(2, 6, L2), granite);
iw.position.set(ix, 3, iz);
iw.rotation.y = r2;
G.add(iw);
dkwSolid(ix, iz, 2, L2, -50, 400, -r2);
}
(function () {
var x = 44, z = 186, y = H(x, z);
dkwBox(G, 6, 1, 6, granite, x, y, z);
var ob = new THREE.Mesh(new THREE.BoxGeometry(3, 12, 3), dkwS("b:marble", 0xD8D4CC, 2));
ob.position.set(x, y + 7, z);
G.add(ob);
dkwSolid(x, z, 6, 6);
for (var k = 0; k < 8; k++) {
var fa = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 10), dkwS("b:marble", 0xD0CCC4, 1));
fa.scale.set(0.85, 1.1, 0.5);
var side = k % 4, hy = y + 3 + Math.floor(k / 4) * 4.4;
fa.position.set(x + (side === 1 ? 1.55 : side === 3 ? -1.55 : 0), hy, z + (side === 0 ? 1.55 : side === 2 ? -1.55 : 0));
G.add(fa);
}
dkwFire(G, x + 5, y, z + 6, 0.8);
})();
var keep = function (x, z) { var r = Math.hypot(x, z); if (r > 286 || r < 22)
return false; if (Math.abs(r - 160) < 8)
return false; if (Math.abs(x) < 10 && (z > 0 || z < -60))
return false; if (Math.abs(z) < 9)
return false; if (Math.hypot(x - 44, z - 186) < 12)
return false; if (Math.hypot(x + 112, z + 6) < 10 || Math.hypot(x - 110, z - 60) < 10 || Math.hypot(x, z + 110) < 12 || Math.hypot(x + 94, z - 40) < 16 || Math.hypot(x + 70, z + 76) < 18 || Math.hypot(x - 120, z + 70) < 20 || Math.hypot(x - 91, z - 36) < 14)
return false; return true; };
var houses = [], n = lite ? 70 : 180, tries = 0;
while (houses.length < n && tries < n * 10) {
tries++;
var hx = (R() - 0.5) * 580, hz = (R() - 0.5) * 580, hw = 7 + R() * 5, hd = 7 + R() * 4;
if (!keep(hx, hz))
continue;
if (houses.some(function (q) { return Math.abs(q[0] - hx) < (q[2] + hw) / 2 + 3 && Math.abs(q[1] - hz) < (q[3] + hd) / 2 + 3; }))
continue;
houses.push([hx, hz, hw, hd]);
}
houses.forEach(function (q) { var ry = Math.abs(q[0]) > Math.abs(q[1]) ? (q[0] < 0 ? Math.PI / 2 : -Math.PI / 2) : (q[1] > 0 ? Math.PI : 0); dkcTyrHouse(G, q[0], q[1], q[2], q[3], 7 + Math.floor(R() * 3) * 3, ry, R); });
dkwStrip(G, [[0, 300], [0, 150], [0, 0], [0, -110], [0, -300]], 8, function () { return 0.05; }, cob, 0.05);
dkwStrip(G, [[-290, 0], [-150, 0], [0, 0], [150, 0], [290, 0]], 8, function () { return 0.05; }, cob, 0.05);
dkcLamps(G, [[6, 280], [-6, 240], [6, 200], [-6, 120], [6, 60], [-6, -60], [6, -200], [60, 6], [-60, -6], [120, 6], [-120, -6]], H);
var stallCols = [0xB83A2A, 0x2A5A9A, 0xE8C860, 0x7A3A8A, 0x3A8A4A, 0xE86A1A];
for (var i = 0; i < (lite ? 14 : 34); i++) {
var sx = (i % 2 ? 1 : -1) * (8 + R() * 4), sz = 290 - i * 8;
if (sz < 170 && sz > 150)
continue;
var st = new THREE.Group();
st.position.set(sx, 0, sz);
st.rotation.y = sx < 0 ? Math.PI / 2 : -Math.PI / 2;
G.add(st);
dkwBox(st, 2.6, 0.9, 1.3, dkwMat("oak"), 0, 0, 0);
var aw = new THREE.Mesh(new THREE.PlaneGeometry(3, 1.9), dkwLam(stallCols[i % 6]));
aw.position.set(0, 2.4, 0.2);
aw.rotation.x = -1.25;
st.add(aw);
[-1.3, 1.3].forEach(function (px) { dkwCyl(st, 0.04, 0.04, 2.4, dkwMat("oak"), px, 0, -0.6, 6); });
for (var j = 0; j < 6; j++) {
var wr = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), dkwGlowM([0xFFC86A, 0x8AE8FF, 0xFF8A6A, 0xC8FF8A, 0xE88AFF, 0xFFFFFF][j], j % 2 ? 0.6 : 0.2));
wr.position.set(-1 + j * 0.4, 1.0, 0.2);
st.add(wr);
}
dkwSolid(sx, sz, 1.4, 2.8);
}
dkcDragonFire(G, -12, 0, 262, 0.6, true);
(function () { var wg = new THREE.Group(); wg.position.set(14, 1.6, 232); G.add(wg); var M = dkwGlowM(0xFF8A2A, 0.75); var bd = dkwEll(wg, M, 0.3, 0.25, 0.7, 0, 0, 0); dkwEll(wg, M, 0.18, 0.16, 0.26, 0, 0.2, 0.75); var tl = new THREE.Mesh(dkwTaper([[0, 0, -0.6], [0, 0.2, -1.1], [0, 0.4, -1.3]], [0.1, 0.08, 0.02], 8, 6), M); wg.add(tl); for (var k = 0; k < 4; k++) {
var lg = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.6, 5), M);
lg.position.set(k % 2 ? 0.15 : -0.15, -0.4, k < 2 ? 0.4 : -0.4);
lg.rotation.x = Math.PI;
wg.add(lg);
} var orb = new THREE.Group(); orb.position.set(14, 0, 232); G.add(orb); G.remove(wg); wg.position.set(2, 1.6, 0); orb.add(wg); orb.userData.sp = 1.4; DKW.spin.push(orb); })();
(function () {
var pz = new THREE.Mesh(new THREE.CircleGeometry(20, 40), dkwS("b:ashlar", 0xA8A098, 4));
pz.rotation.x = -Math.PI / 2;
pz.position.y = 0.04;
G.add(pz);
dkwCyl(G, 6, 6.6, 1, granite, 0, 0, 0, 30);
dkwWater(G, 0, 0, 11, 11, 0.85, 0x6AA8D8, 0.85);
dkwRound(0, 0, 6.6);
dkwCyl(G, 0.8, 1.1, 4, granite, 0, 0.8, 0, 12);
var bw = new THREE.Mesh(new THREE.SphereGeometry(2.2, 20, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), granite);
bw.position.y = 4.8;
G.add(bw);
for (var k = 0; k < 12; k++) {
var jet = new THREE.Mesh(dkwGeo("fjet", function () { return new THREE.CylinderGeometry(0.05, 0.12, 1.8, 6); }), dkwShine(0xC8E8FF, 0.1, 0.3));
var ka = k / 12 * Math.PI * 2;
jet.position.set(Math.cos(ka) * 2.2, 4.4, Math.sin(ka) * 2.2);
jet.rotation.z = Math.cos(ka) * 0.6;
jet.rotation.x = -Math.sin(ka) * 0.6;
G.add(jet);
}
})();
(function () {
var x = -112, z = -6;
var aw = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), dkwM("dragonhideAwn", function () { var t = dkwCanvas("dragonhideAwnT", 128, 96, function (c, W, H) { c.fillStyle = "#6A5A3A"; c.fillRect(0, 0, W, H); c.fillStyle = "#3A6A3A"; c.fillRect(20, 10, 40, 30); c.fillStyle = "#8A3A2A"; c.fillRect(70, 50, 40, 30); for (var r = 0; r < 6; r++)
for (var q = 0; q < 8; q++) {
c.strokeStyle = "rgba(0,0,0,.25)";
c.beginPath();
c.arc(q * 16 + (r % 2) * 8, r * 16, 7, 0, Math.PI);
c.stroke();
} }); return new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }); }));
aw.position.set(x, 3, z);
aw.rotation.x = -Math.PI / 2 + 0.25;
G.add(aw);
[[-2.8, -1.8], [2.8, -1.8], [-2.8, 1.8], [2.8, 1.8]].forEach(function (p) { dkwCyl(G, 0.06, 0.06, 3.2, dkwMat("oak"), x + p[0], 0, z + p[1], 6); });
var cd = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 0.9, 1, 16, 1, true), dkwShine(0x2A2A2A, 0.3, 0.8));
cd.position.set(x, 0.6, z - 0.4);
G.add(cd);
dkwWater(G, x, z - 0.4, 2, 2, 1.0, 0x1A0A0A, 0.95);
dkwFire(G, x, 0, z - 0.4, 0.7);
dkwRound(x, z - 0.4, 1.3);
dkwBox(G, 3, 0.9, 0.6, dkwMat("oak"), x, 0, z + 1.2);
for (var k = 0; k < 5; k++) {
var bt = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.2, 8), dkwShine([0x3A8AE8, 0x8AE83A, 0xE83A8A, 0xE8C83A, 0xFFFFFF][k], 0.1, 0.8));
bt.position.set(x - 1 + k * 0.5, 1.0, z + 1.2);
G.add(bt);
}
})();
(function () {
for (var k = 0; k < 6; k++) {
var bx = 86 + k * 5, st = new THREE.Group();
st.position.set(bx, 0, 30);
G.add(st);
dkwShelves(st, 0, 0, 1.4, 2, 0);
dkwSolid(bx, 30, 1.4, 0.6);
}
var x = 110, z = 60;
var tn = new THREE.Mesh(new THREE.ConeGeometry(4, 4.4, 6), dkwLam(0x2A2A3A));
tn.position.set(x, 2.2, z);
G.add(tn);
var rn = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), dkcEtchM("bluerune", function (c, W, Hh) { c.fillStyle = "#1A1A2A"; c.fillRect(0, 0, W, Hh); c.strokeStyle = "#3AA8FF"; c.lineWidth = 14; c.beginPath(); c.moveTo(W / 2, 30); c.lineTo(W / 2, Hh - 30); c.moveTo(W / 2, Hh / 2); c.lineTo(W / 2 + 80, 60); c.moveTo(W / 2, Hh / 2); c.lineTo(W / 2 - 80, Hh - 60); c.stroke(); }, 0.9));
rn.position.set(x, 2, z + 3.1);
G.add(rn);
dkwRound(x, z, 3.4);
})();
(function () { var x = 0, z = -110; dkwBox(G, 6, 0.6, 6, granite, x, 0, z); for (var k = 0; k < 5; k++)
dkwBox(G, 3, 0.2, 0.8, granite, x, 0.6 - k * 0.12, z - 1 + k * 0.6); dkwEnterable(G, "tyrnarhul", 3, x, z - 3.4, 0, "The door painted with old blood and fresh runes, down to the Midnight Emporium", { W: 40, D: 36, H: 9, wall: dkwS("b:darktile", 0x2A1A2A, 3), floor: dkwS("b:checker", 0x1A1018, 3), ceil: dkwLam(0x0A060A), env: "tyrunder", day: 0x6A3A8A }, { col: 0x4A0A0A, outName: "the bazaar", front: 0.1 }); })();
dkwWater(G, 0, -420, 1800, 160, -1.6, 0x3A5A6A, 0.85);
(function () {
dkwBox(G, 14, 0.5, 40, dkwMat("oak"), 0, -1.2, -372);
dkwFloor(0, -372, 14, 40, -0.7);
for (var k = 0; k < 8; k++) {
[-7, 7].forEach(function (s) { dkwCyl(G, 0.25, 0.25, 4, dkwMat("darkbark"), s, -3, -356 - k * 5, 8); });
}
var bt = new THREE.Group();
bt.position.set(10, -1.4, -380);
G.add(bt);
var hull = new THREE.Mesh(dkwTaper([[0, 0, -6], [0, 0.3, 0], [0, 0.6, 6]], [0.4, 1.6, 0.3], 20, 10, 0.6), dkwMat("oak"));
bt.add(hull);
dkwCyl(bt, 0.1, 0.1, 8, dkwMat("oak"), 0, 0.5, 0, 6);
})();
if (!lite)
for (i = 0; i < 60; i++) {
var fx = (R() - 0.5) * 400, fz = (R() - 0.5) * 400, fy = 50 + R() * 60, fw = new THREE.Mesh(dkwGeo("fwork", function () { return new THREE.SphereGeometry(0.6, 6, 4); }), dkwGlowM([0xFF5A3A, 0x5AFF8A, 0x5A8AFF, 0xFFE05A, 0xFF5AE8][i % 5], 1));
fw.position.set(fx, fy, fz);
fw.userData.kind = "float";
fw.userData.y0 = fy;
fw.userData.amp = 3;
fw.userData.f = 0.3 + R() * 0.4;
fw.userData.ph = i;
G.add(fw);
DKW.bob.push(fw);
}
for (i = 0; i < (lite ? 30 : 90); i++) {
var lx = (R() - 0.5) * 480, lz = (R() - 0.5) * 480;
if (Math.hypot(lx, lz) > 280)
continue;
var fl = new THREE.Mesh(dkwGeo("flantern", function () { return new THREE.OctahedronGeometry(0.4, 0); }), dkwGlowM([0xFFD08A, 0x8AE8FF, 0xE8A8FF][i % 3], 0.9));
fl.position.set(lx, 24 + R() * 16, lz);
fl.userData.kind = "float";
fl.userData.y0 = fl.position.y;
fl.userData.amp = 0.8;
fl.userData.f = 0.3;
fl.userData.ph = i;
G.add(fl);
DKW.bob.push(fl);
}
dkwCrowd(31080, lite ? 20 : 60, -30, 170, 30, 295, { dress: "dktown", dressF: "dktownf", wander: 16, women: 0.5, childP: 0.15, names: ["A market crier", "A flower seller", "A dwarven smith roasting chestnuts", "A reveller", "A merchant of the Glass Guild", "A fortune-teller", "A child in a moon mask"], says: ["Spirit glyphs! Genuine spirit glyphs, inked on dried leaves!", "Roast chestnuts, hot from the forge!", "Happy Merchant's Moon, stranger!", "The guards watch the main gates. Not the old pass, mind.", "Every banner is a guild. Every guild owes someone a favour.", "Have you seen the fire wolf? The magician's by the gate."] });
dkwCrowd(31081, lite ? 14 : 40, -200, -200, 200, 150, { dress: "dktown", dressF: "dktownf", wander: 20, women: 0.5, ok: function (x, z) { var r = Math.hypot(x, z); return r > 12 && r < 280; }, names: ["A healer's apprentice", "An itinerant philosopher", "A scroll dealer", "A city guard in black", "A lantern-lighter", "A half-folk reveller"], says: ["Healing supplies cost what they cost. Necessities.", "Memory-leaf scrolls: unroll one and see the past!", "Keep your purse close. This city is built on misdirection.", "Move along. Festival or no festival.", "The earth folk are buying up every rare gem in the city.", "Meet at the fountain? Everyone meets at the fountain."] });
dkcMotes(G, lite ? 80 : 240, 0, 0, 300, 2, 30, 0xFFE0A0);
},
function (P, x, y, z, s, col, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
s = s || 1;
var gl = new THREE.Mesh(dkwGeo("podglass", function () { return new THREE.CylinderGeometry(0.75, 0.75, 2.4, 20, 1, true); }), dkwM("podglassM", function () { var m = new THREE.MeshPhongMaterial({ color: 0xC8E8FF, emissive: 0x1A3A5A, transparent: true, opacity: 0.28, shininess: 160, side: THREE.DoubleSide, depthWrite: false }); m.userData.noPhoto = 1; return m; }));
gl.position.y = 1.2;
gl.scale.setScalar(s);
g.add(gl);
var fl = new THREE.Mesh(dkwGeo("podfluid", function () { return new THREE.CylinderGeometry(0.72, 0.72, 2.3, 20, 1); }), dkwGlowM(col || 0x6AC8FF, 0.14));
fl.position.y = 1.2;
fl.scale.setScalar(s);
g.add(fl);
[0, 2.4].forEach(function (yy) { var cap = new THREE.Mesh(dkwGeo("podcap", function () { return new THREE.CylinderGeometry(0.85, 0.85, 0.2, 20); }), dkwShine(0x8A949E, 0.25, 0.9)); cap.position.y = yy * s; cap.scale.setScalar(s); g.add(cap); });
for (var k = 0; k < (o.wires || 4); k++) {
var a = k / (o.wires || 4) * Math.PI * 2, w = new THREE.Mesh(dkwTaper([[Math.cos(a) * 0.6 * s, 2.5 * s, Math.sin(a) * 0.6 * s], [Math.cos(a) * 0.9 * s, 3.2 * s, Math.sin(a) * 0.9 * s], [Math.cos(a) * 1.4 * s, 3.4 * s, Math.sin(a) * 1.4 * s]], [0.03, 0.03, 0.03], 8, 4), dkwLam(0x1A1A22));
g.add(w);
}
if (o.figure) {
var f = new THREE.Mesh(dkwTaper([[0, 0.3, 0], [0, 1.2, 0], [0, 1.9, 0], [0, 2.1, 0]], [0.14, 0.16, 0.1, 0.06], 10, 8), dkwGlowM(o.figure, 0.4));
f.scale.setScalar(s);
g.add(f);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), dkwGlowM(o.figure, 0.5));
hd.position.y = 2.0 * s;
g.add(hd);
}
return g;
},
function (P, x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var reed = dkwM("skiffReed", function () { var t = dkwCanvas("skiffReedT", 64, 128, function (c, W, H) { c.fillStyle = "#2A3A1A"; c.fillRect(0, 0, W, H); for (var i = 0; i < W; i += 4) {
c.fillStyle = "rgba(" + (60 + i % 3 * 20) + "," + (90 + i % 5 * 10) + ",40,.9)";
c.fillRect(i, 0, 3, H);
} c.strokeStyle = "rgba(120,200,90,.6)"; c.lineWidth = 2; for (var j = 0; j < H; j += 12) {
c.beginPath();
c.moveTo(0, j);
c.lineTo(W, j + 6);
c.stroke();
} }); var m = new THREE.MeshLambertMaterial({ map: t, emissive: 0x1A5A1A, side: THREE.DoubleSide }); return m; });
var bone = dkwShine(0xEDE6D2, 0.35, 0.05), glow = dkwGlowM(0x7AFF8A, 0.5);
var front = new THREE.Group(), back = new THREE.Group();
g.add(front);
g.add(back);
[[front, 0.5, 3.8], [back, -3.6, -0.4]].forEach(function (q) {
var hp = new THREE.Mesh(dkwTaper([[0, 0, q[1]], [0, 0.25, (q[1] + q[2]) / 2], [0, 0.5, q[2]]], [q[0] === front ? 1.0 : 0.7, 1.15, q[0] === front ? 0.25 : 1.0], 16, 10, 0.55), reed);
q[0].add(hp);
for (var k = 0; k < 4; k++) {
var zz = q[1] + (q[2] - q[1]) * (k + 0.5) / 4;
var rib = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.05, 6, 16, Math.PI), bone);
rib.position.set(0, 0.55, zz);
rib.rotation.z = Math.PI;
q[0].add(rib);
}
var keel = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, q[2] - q[1]), bone);
keel.position.set(0, -0.05, (q[1] + q[2]) / 2);
q[0].add(keel);
var gl = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.04, q[2] - q[1]), glow);
gl.position.set(0, 0.62, (q[1] + q[2]) / 2);
q[0].add(gl);
});
var prow = new THREE.Mesh(dkwTaper([[0, 0.4, 3.8], [0, 1.1, 4.3], [0, 1.5, 4.1]], [0.08, 0.05, 0.02], 8, 6), bone);
front.add(prow);
[-1, 1].forEach(function (s) { for (var k = 0; k < 2; k++) {
var oar = new THREE.Group();
oar.position.set(s * 1.1, 0.6, 1.4 - k * 2.2);
oar.rotation.z = s * 0.9;
front.add(oar);
var sh = new THREE.Mesh(dkwTaper([[0, 0, 0], [0, -1.4, 0.1], [0, -2.4, 0]], [0.04, 0.035, 0.02], 8, 5), dkwMat("darkbark"));
oar.add(sh);
for (var f = 0; f < 5; f++) {
var fe = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.5), dkwM("featherIri" + f, function () { return new THREE.MeshPhongMaterial({ color: [0x3AE8C8, 0x8A5AFF, 0x3A8AFF, 0xE85AC8, 0x8AFF5A][f], emissive: 0x1A2A3A, shininess: 120, side: THREE.DoubleSide }); }));
fe.position.set((f - 2) * 0.06, -2.5, 0);
fe.rotation.z = (f - 2) * 0.2;
oar.add(fe);
}
oar.userData.kind = "spin";
} });
var seat = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 0.5), bone);
seat.position.set(0, 0.4, -2);
back.add(seat);
var lv = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.06), dkwShine(0x6A5A3A, 0.4, 0.6));
lv.position.set(0.4, 0.3, -1.6);
back.add(lv);
g.userData.front = front;
g.userData.back = back;
return g;
},
function (boat, key, x, z, ry, o) {
var F = DKW_FOLK[key];
if (!F)
return null;
o = o || {};
var g = dkwDressed(key + "ride", F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin });
if (F.look)
try {
F.look(g);
}
catch (e) { }
g.position.set(x, o.y != null ? o.y : 0.15, z);
g.rotation.y = ry || 0;
if (o.s)
g.scale.setScalar(o.s);
(o.part || boat).add(g);
return g;
},
function (dt) {
var R = DKW.ride;
if (!R || !R.p)
return;
if (DKW.moving) {
if (R.t > 0.6) {
DKW.ride = null;
}
return;
}
R.t += dt * (window.SBK_FAST ? 6 : 1);
var u = Math.min(1, R.t / R.dur), n = R.p.length - 1, f = u * n, i = Math.min(n - 1, Math.floor(f)), k = f - i, a = R.p[i], b = R.p[i + 1];
var x = a[0] + (b[0] - a[0]) * k, y = a[1] + (b[1] - a[1]) * k, z = a[2] + (b[2] - a[2]) * k, S = DKW_SC[DKW.sc];
if (R.b) {
R.b.position.set(x, y, z);
var want = Math.atan2(b[0] - a[0], b[2] - a[2]);
R.b.rotation.y += (want - R.b.rotation.y) * Math.min(1, dt * 2);
R.b.rotation.z = Math.sin(DKW.t * 1.3) * 0.03 * (R.o.rock || 1);
}
camera.position.set(DKW.base + S.x + x, y + 0.6 + 1.72, z);
if (typeof flyY !== "undefined")
flyY = 0;
if (u >= 1) {
DKW.ride = null;
if (R.o.done)
try {
R.o.done();
}
catch (e) { }
}
},
function (G) {
var lite = dkwLite(), H = dkwCanalH, R = wRand(34034), cob = dkwS("b:limestone", 0x6A6460, 6), granite = dkwS("b:ashlar", 0x6A6A72, 3), rock = dkwMat("rock");
dkwTerrain(G, -900, -700, 1800, 1600, lite ? 16 : 8, H, dkwMat("earth"), function (x, z, y, c) { var n = dkwFbm(x * 0.03, z * 0.03, 2); if (z > 590) {
c.setRGB(0.36 + n * 0.04, 0.34 + n * 0.04, 0.32 + n * 0.04);
return;
} if (y > 18) {
c.setRGB(0.3 + n * 0.05, 0.27 + n * 0.05, 0.24 + n * 0.04);
return;
} if (y < 0) {
c.setRGB(0.12, 0.14, 0.1);
return;
} c.setRGB(0.12 + n * 0.04, 0.2 + n * 0.06, 0.14 + n * 0.04); });
dkwStrip(G, [[0, 800], [0, 700], [0, 600], [0, 570]], 7, function () { return 0.65; }, cob, 0.05);
for (var z = 780; z > 596; z -= 14) {
[-1, 1].forEach(function (s) { dkcTyrHouse(G, s * (9 + R() * 1.5), z, 9, 11, 8 + Math.floor(R() * 3) * 3, s < 0 ? Math.PI / 2 : -Math.PI / 2, R); });
}
for (var i = 0; i < (lite ? 40 : 120); i++) {
var px = (R() - 0.5) * 6, pz = 600 + R() * 190, pt = new THREE.Mesh(dkwGeo("petal", function () { return new THREE.CircleGeometry(0.07, 5); }), dkwLam([0xC83A5A, 0xE8A82A, 0xE85AA8, 0x8A3AC8][i % 4]));
pt.rotation.x = -Math.PI / 2;
pt.position.set(px, 0.72, pz);
G.add(pt);
}
for (i = 0; i < 8; i++) {
var wn = new THREE.Mesh(new THREE.CircleGeometry(0.5 + R() * 0.6, 10), dkwShine(0x4A0A1A, 0.05, 0.2));
wn.rotation.x = -Math.PI / 2;
wn.position.set((R() - 0.5) * 5, 0.71, 610 + R() * 170);
G.add(wn);
}
for (z = 770; z > 600; z -= 28) {
var ln = new THREE.Mesh(dkwGeo("lantcrys", function () { return new THREE.OctahedronGeometry(0.28, 0); }), dkwGlowM(0xFFC86A, 0.55));
ln.position.set((z % 56 ? 3.4 : -3.4), 3.6, z);
G.add(ln);
}
var plank = dkwMat("planks"), dark = dkwMat("darkbark");
dkwBox(G, 26, 0.4, 22, plank, 0, 0.4, 574);
dkwFloor(0, 574, 26, 22, 0.8);
dkwBox(G, 4, 0.3, 30, plank, 6, 0.5, 548);
dkwFloor(6, 548, 4, 30, 0.8);
dkwBox(G, 4, 0.3, 16, plank, -8, 0.5, 555);
dkwFloor(-8, 555, 4, 16, 0.8);
for (var k = 0; k < 12; k++) {
[[4.2, 0], [7.8, 0]].forEach(function (q) { var pl = dkwCyl(G, 0.22, 0.26, 3.2, dkwM("mossPile", function () { return new THREE.MeshLambertMaterial({ color: 0x3A4A2A }); }), q[0], -2.2, 535 + k * 2.6, 7); });
}
for (k = 0; k < 6; k++) {
var lx = (k % 2 ? 7.6 : 4.4), lz = 536 + k * 5;
dkwCyl(G, 0.05, 0.06, 2.4, dark, lx, 0.8, lz, 6);
var lan = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.3), dkwGlowM(0xFFB86A, 0.85));
lan.position.set(lx, 3.3, lz);
G.add(lan);
}
(function () {
for (var t = 0; t < (lite ? 6 : 14); t++) {
var tx = (t % 2 ? 1 : -1) * (16 + R() * 14), tz = 520 + R() * 80, ty = H(tx, tz), tg = new THREE.Group();
tg.position.set(tx, ty, tz);
G.add(tg);
tg.add(new THREE.Mesh(dkwTaper([[0, 0, 0], [0.4, 3, 0.2], [-0.3, 6, 0], [0.2, 8, 0.3]], [0.7, 0.45, 0.3, 0.15], 12, 7), dark));
for (var b = 0; b < 6; b++) {
var a = b / 6 * Math.PI * 2 + R(), L = 3 + R() * 3;
tg.add(new THREE.Mesh(dkwTaper([[0, 5 + b * 0.5, 0], [Math.cos(a) * L * 0.5, 6.5 + b * 0.4, Math.sin(a) * L * 0.5], [Math.cos(a + 0.4) * L, 7.8 + R() * 2, Math.sin(a + 0.4) * L]], [0.16, 0.08, 0.02], 8, 5), dark));
}
dkwRound(tx, tz, 0.8);
}
})();
var B = dkcSkiff(G, 6, 0.1, 540, Math.PI);
DKW.skiffA = B;
var rf = new THREE.Group(), rb = new THREE.Group();
B.userData.front.add(rf);
B.userData.back.add(rb);
dkcRider(B, "cassian", -0.5, 2.4, Math.PI, { part: rf });
dkcRider(B, "lyra", 0.5, 1.0, Math.PI * 0.9, { part: rf });
dkcRider(B, "echo", -0.4, -0.2, 0.2, { part: rf });
dkcRider(B, "lok", 0, -2.4, 0, { part: rb, y: 0.45 });
dkwShow("ridersA", rf, false);
dkwShow("ridersA2", rb, false);
dkwWater(G, 0, 206, 22, 700, -0.1, 0x0A1A22, 0.92);
dkwFloor(0, 210, 20, 690, -0.05);
var glowCols = [0x5AFFB8, 0x5AC8FF, 0xB88AFF, 0xE8FF6A, 0x5AFFE8];
if (true) {
var stalks = [], caps = [];
for (i = 0; i < (lite ? 260 : 900); i++) {
var bz = -140 + R() * 680, side = R() < 0.5 ? -1 : 1, bx = side * (10.5 + R() * 9), by = H(bx, bz);
if (bz > 540)
continue;
stalks.push({ x: bx, y: by, z: bz, s: 0.5 + R() * 1.4, ry: R() * 6 });
caps.push({ x: bx, y: by + (0.5 + R() * 1.4) * 0.9, z: bz, s: 0.3 + R() * 0.5 });
}
dkwInst(G, dkwGeo("bioStalk", function () { var c = new THREE.CylinderGeometry(0.03, 0.06, 1, 5); c.translate(0, 0.5, 0); return c; }), dkwLam(0x1A4A3A, { e: 0x0A3A2A }), stalks);
for (var c = 0; c < 4; c++)
dkwInst(G, dkwGeo("bioCap", function () { return new THREE.SphereGeometry(0.22, 8, 6); }), dkwGlowM(glowCols[c], 0.85), caps.filter(function (_, j) { return j % 4 === c; }));
var fronds = [];
for (i = 0; i < (lite ? 120 : 400); i++) {
var fz = -140 + R() * 680, fs = R() < 0.5 ? -1 : 1;
if (fz > 540)
continue;
fronds.push({ x: fs * (10 + R() * 3), y: -0.2, z: fz, s: 0.8 + R() * 1.4, ry: R() * 6, rz: (R() - 0.5) * 0.6 });
}
dkwInst(G, dkwGeo("bioFrond", function () { var p = new THREE.PlaneGeometry(0.4, 2.2); p.translate(0, 1.1, 0); return p; }), dkwM("bioFrondM", function () { return new THREE.MeshBasicMaterial({ color: 0x3AE8A0, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false }); }), fronds);
}
dkwPlant(G, "reeds", dkwScatter(34035, lite ? 60 : 200, -60, -120, 60, 530, function (x, z) { var a = Math.abs(x); return a > 10 && a < 18; }, H, 0.8, 1.4), {});
if (!lite)
for (i = 0; i < 70; i++) {
var fx = (R() - 0.5) * 14, fz = -120 + R() * 650, fi = new THREE.Mesh(dkwGeo("lumfish", function () { var s = new THREE.SphereGeometry(0.14, 8, 6); s.scale(0.5, 0.5, 1.6); return s; }), dkwGlowM([0x8AFFFF, 0x6AE8FF, 0xC8FFE8][i % 3], 0.8));
fi.position.set(fx, -0.45, fz);
fi.userData.kind = "float";
fi.userData.y0 = -0.45;
fi.userData.amp = 0.15;
fi.userData.f = 1.2;
fi.userData.ph = i;
G.add(fi);
DKW.bob.push(fi);
}
dkcMotes(G, lite ? 60 : 200, 0, 200, 60, 1, 9, 0xB8FFD8);
(function () {
var mg = new THREE.Group();
mg.position.set(0, 0, -150);
G.add(mg);
var maw = new THREE.Mesh(new THREE.CircleGeometry(7, 9), dkwLam(0x000000));
maw.scale.set(1, 0.9, 1);
maw.position.set(0, 3, 0.4);
mg.add(maw);
for (var j = 0; j < 16; j++) {
var a = j / 16 * Math.PI, rr = 8 + R() * 2.5, jg = new THREE.Mesh(dkwGeo("rock", function () { return new THREE.DodecahedronGeometry(1, 1); }), rock);
jg.position.set(Math.cos(a) * rr, Math.sin(a) * rr * 0.9 + 1, R());
jg.scale.set(1.8 + R() * 2, 1.4 + R() * 2.4, 2 + R() * 2);
jg.rotation.set(R(), R(), R());
mg.add(jg);
}
for (j = 0; j < 7; j++) {
var fang = new THREE.Mesh(new THREE.ConeGeometry(0.5 + R() * 0.4, 2 + R() * 2.4, 6), rock);
fang.position.set(-5 + j * 1.7, 9.4 - R(), 0.8);
fang.rotation.x = Math.PI;
mg.add(fang);
}
dkwSolid(-11, -150, 8, 6, -50, 400);
dkwSolid(11, -150, 8, 6, -50, 400);
})();
dkwCrowd(34080, lite ? 6 : 14, -4, 600, 4, 790, { dress: "dktown", dressF: "dktownf", wander: 10, women: 0.5, names: ["A reveller going home", "A lantern-lighter putting out the festival lights", "A street sweeper", "A baker lighting her ovens"], says: ["The Merchant's Moon is done for another year.", "Mind the wine on the stones: it's slick as ice.", "You're up early, or late.", "Fresh bread at sunrise, if you're still in the city."] });
dkwCrowd(34081, lite ? 3 : 6, -12, 560, -4, 590, { dress: "dktown", wander: 6, names: ["A dockhand of the Winding Willow", "A boatman mending a net"], says: ["Lok's skiff? Wouldn't catch me in it.", "The willows were gone before my grandmother's time."] });
dkwCrowd(34082, lite ? 3 : 8, 16, 200, 22, 500, { dress: "dktown", dressF: "dktownf", wander: 4, women: 0.4, ok: function (x, z) { return dkwCanalH(x, z) > 0.5; }, names: ["An eel-fisher on the bank", "A night-gatherer picking glowcaps"], says: ["The fish follow anything that glows.", "Quiet, now: you'll scare the light-fish."] });
dkcMoons(G);
},
function (x, z) {
var n = dkwFbm(x * 0.004, z * 0.004, 4), rr = Math.hypot(x, z);
var ring = rr > 880 ? (rr - 880) * 1.5 + Math.pow(Math.max(0, rr - 880) / 100, 1.6) * 12 + n * 60 : 0;
var base = n * 4;
if (z < 70 && z > -210)
base = Math.max(0, dkwFbm(x * 0.02, z * 0.02, 3) * 12) + 2;
if (z <= -210 && z > -290)
base = Math.floor((-210 - z) / 16) * -0.0 + 2 - ((-210 - z) / 80) * 2;
if (z <= -290)
base = 0;
var y = Math.max(base, ring);
if (Math.abs(x) < 90 && z > 680 && z < 940) {
var sp = z <= 870 ? (z - 680) * 0.69 : 131.1, bl = Math.max(0, Math.min(1, (Math.abs(x) - 55) / 35));
y = sp * (1 - bl) + Math.max(sp, y) * bl;
if (z > 905)
y = Math.max(y, 131.1 + (z - 905) * 3);
}
return y;
},
function () {
return dkwM("titanBark", function () {
var t = dkwCanvas("titanBarkT", 128, 256, function (c, W, H) {
c.fillStyle = "#4A3A2A";
c.fillRect(0, 0, W, H);
for (var i = 0; i < 60; i++) {
c.fillStyle = "rgba(" + (40 + Math.random() * 40 | 0) + "," + (30 + Math.random() * 30 | 0) + ",20,.6)";
c.fillRect(Math.random() * W, 0, 2 + Math.random() * 4, H);
}
for (i = 0; i < 14; i++) {
c.strokeStyle = i % 2 ? "rgba(60,200,140,.85)" : "rgba(220,130,60,.85)";
c.lineWidth = 2 + Math.random() * 2;
c.beginPath();
var x = Math.random() * W, y = Math.random() * H;
c.moveTo(x, y);
for (var k = 0; k < 6; k++) {
x += (Math.random() - 0.5) * 30;
y += Math.random() * 40;
c.lineTo(x, y);
}
c.stroke();
}
});
t.repeat.set(3, 4);
return new THREE.MeshStandardMaterial({ map: t, roughness: 0.8, metalness: 0.25 });
});
},
function () { return dkwM("mosaicBark", function () { var t = dkwCanvas("mosaicBarkT", 256, 256, function (c, W, H) { var cs = ["#5A3A1A", "#C8A060", "#8A5A3A", "#E8D8B0", "#3A2A1A", "#A84A2A", "#6A6A5A", "#D8C8A0", "#2A1A10", "#B88850"]; for (var i = 0; i < 140; i++) {
c.fillStyle = cs[i % cs.length];
c.beginPath();
var x = Math.random() * W, y = Math.random() * H, r = 8 + Math.random() * 16;
for (var k = 0; k < 6; k++) {
var a = k / 6 * Math.PI * 2 + Math.random() * 0.4;
c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
}
c.closePath();
c.fill();
c.strokeStyle = "rgba(0,0,0,.35)";
c.stroke();
} }); t.repeat.set(4, 4); return new THREE.MeshLambertMaterial({ map: t }); }); },
function (P, x, y, z, ry, R) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
P.add(g);
var hide = dkwLam(0x8A5A3A), pale = dkwLam(0xE8D8C0), wood = dkwMat("darkbark");
dkwEll(g, hide, 0.45, 0.5, 1.0, 0, 1.35, 0);
dkwEll(g, pale, 0.3, 0.25, 0.6, 0, 1.1, 0.1);
var nk = new THREE.Mesh(dkwTaper([[0, 1.5, 0.7], [0, 1.95, 1.0], [0, 2.15, 1.1]], [0.2, 0.15, 0.12], 8, 6), hide);
g.add(nk);
dkwEll(g, hide, 0.14, 0.15, 0.3, 0, 2.15, 1.25);
[[-0.25, 0.7], [0.25, 0.7], [-0.25, -0.65], [0.25, -0.65]].forEach(function (q) { g.add(new THREE.Mesh(dkwTaper([[q[0], 1.1, q[1]], [q[0], 0.55, q[1] + 0.05], [q[0], 0, q[1]]], [0.07, 0.05, 0.04], 6, 5), hide)); });
[-1, 1].forEach(function (s) { var a = new THREE.Mesh(dkwTaper([[s * 0.08, 2.3, 1.15], [s * 0.35, 2.8, 1.05], [s * 0.55, 3.3, 0.9], [s * 0.5, 3.7, 1.0]], [0.04, 0.035, 0.025, 0.015], 8, 5), wood); g.add(a); for (var k = 0; k < 5; k++) {
var f = new THREE.Mesh(dkwGeo("antlerBloom", function () { return new THREE.SphereGeometry(0.08, 6, 5); }), dkwGlowM([0xFFB8D8, 0xF8F0A8, 0xC8A8FF][k % 3], 0.9));
f.position.set(s * (0.2 + k * 0.08), 2.6 + k * 0.22, 1.1 - k * 0.03);
g.add(f);
var lf = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.2), dkwLam(0x4AA84A, { ds: 1 }));
lf.position.set(s * (0.25 + k * 0.08), 2.7 + k * 0.2, 1.05);
lf.rotation.z = s * 0.6;
g.add(lf);
} });
g.userData.kind = "walk";
g.userData.home = [x, z];
g.userData.ph = R() * 9;
g.userData.hfn = dkwEnclH;
DKW.bob.push(g);
return g;
},
function (P, x, y, z, i) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var wm = dkwM("mothWing" + (i % 3), function () { var t = dkwCanvas("mothWingT" + (i % 3), 64, 64, function (c, W, H) { c.clearRect(0, 0, W, H); c.fillStyle = ["rgba(140,255,220,.55)", "rgba(200,160,255,.55)", "rgba(255,230,140,.55)"][i % 3]; c.beginPath(); c.ellipse(W / 2, H / 2, W / 2 - 2, H / 2 - 6, 0, 0, Math.PI * 2); c.fill(); c.fillStyle = "rgba(255,255,255,.9)"; c.beginPath(); c.arc(W / 2, H / 2, 6, 0, Math.PI * 2); c.fill(); }); return new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide, depthWrite: false }); });
[-1, 1].forEach(function (s) { var w = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.4), wm); w.position.x = s * 0.25; w.rotation.y = s * 0.4; g.add(w); });
g.userData.kind = "air";
g.userData.home = [x, z];
g.userData.y0 = y;
g.userData.ph = i * 1.7;
g.userData.dr = [0.3 + ((i * 37) % 10) / 20, 0.3 + ((i * 53) % 10) / 20];
DKW.bob.push(g);
return g;
},
function (P, x, y, z, i) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var gold = dkwShine(0xE8B83A, 0.3, 0.7);
dkwEll(g, gold, 0.6, 0.5, 1.8, 0, 0, 0);
dkwEll(g, gold, 0.35, 0.35, 0.5, 0, 0.2, 1.8);
var bk = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.6, 6), dkwLam(0x3A3A3A));
bk.rotation.x = Math.PI / 2;
bk.position.set(0, 0.15, 2.4);
g.add(bk);
[-1, 1].forEach(function (s) { var w = new THREE.Mesh(dkwGeo("tbWing", function () { var sh = new THREE.Shape(); sh.moveTo(0, 0); sh.quadraticCurveTo(3, 1.4, 7, 0.4); sh.lineTo(6.2, -0.4); sh.lineTo(5, -0.2); sh.lineTo(4.2, -0.8); sh.lineTo(3, -0.4); sh.lineTo(1.8, -1); sh.lineTo(0, -1.2); return new THREE.ShapeGeometry(sh); }), dkwShine(0xF0C84A, 0.35, 0.6)); w.material.side = THREE.DoubleSide; w.rotation.x = -Math.PI / 2; w.scale.x = s; w.position.set(s * 0.4, 0.1, 0.4); g.add(w); });
var tl = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.4), gold);
tl.rotation.x = -Math.PI / 2;
tl.position.set(0, 0, -2.4);
g.add(tl);
g.userData.kind = "air";
g.userData.home = [x, z];
g.userData.y0 = y;
g.userData.ph = i * 2.1;
g.userData.dr = [2.4 + i % 3, 2.0 + i % 2];
DKW.bob.push(g);
return g;
},
function (P, x, y, z, i) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var hide = dkwLam([0xE8E8F0, 0xC8C8D8, 0xA8B8C8][i % 3]), wind = dkwGlowM(0xC8F0FF, 0.4);
dkwEll(g, hide, 0.4, 0.45, 1.05, 0, 1.4, 0);
var nk = new THREE.Mesh(dkwTaper([[0, 1.6, 0.8], [0, 2.1, 1.15], [0, 2.25, 1.3]], [0.22, 0.16, 0.13], 8, 6), hide);
g.add(nk);
dkwEll(g, hide, 0.13, 0.16, 0.36, 0, 2.15, 1.5);
[[-0.22, 0.75], [0.22, 0.75], [-0.22, -0.75], [0.22, -0.75]].forEach(function (q) { g.add(new THREE.Mesh(dkwTaper([[q[0], 1.15, q[1]], [q[0], 0.55, q[1]], [q[0], 0.05, q[1]]], [0.08, 0.055, 0.05], 6, 5), hide)); });
for (var k = 0; k < 6; k++) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.25), wind);
m.position.set(0, 2.1 - k * 0.12, 1.05 - k * 0.18);
m.rotation.y = Math.PI / 2;
g.add(m);
}
var tl = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.5), wind);
tl.position.set(0, 1.5, -1.6);
tl.rotation.y = Math.PI / 2;
tl.rotation.z = 0.4;
g.add(tl);
g.userData.kind = "walk";
g.userData.home = [x, z];
g.userData.ph = i * 2.3;
g.userData.hfn = dkwEnclH;
DKW.bob.push(g);
return g;
},
function (P, x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var sc = dkwShine(0xB8603A, 0.55, 0.2), belly = dkwLam(0xD8A070), mem = dkwLam(0x8A3A2A, { ds: 1 });
var bd = new THREE.Mesh(dkwTaper([[0, 1.2, -5], [0, 1.6, -2.5], [0, 2.2, 0], [0, 3.2, 1.6], [0, 4.6, 2.4], [0, 5.2, 3.4]], [0.15, 0.7, 1.1, 0.8, 0.55, 0.4], 18, 10), sc);
g.add(bd);
var hd = dkwEll(g, sc, 0.45, 0.42, 0.9, 0, 5.3, 4.0);
var jaw = dkwEll(g, belly, 0.32, 0.15, 0.6, 0, 5.05, 4.3);
[-1, 1].forEach(function (s) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), dkwGlowM(0xFFC83A, 1)); e.position.set(s * 0.28, 5.45, 4.4); g.add(e); var hn = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.7, 6), dkwLam(0x3A2A1A)); hn.position.set(s * 0.22, 5.75, 3.7); hn.rotation.x = -1.2; g.add(hn); });
for (var k = 0; k < 8; k++) {
var tt = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.12, 4), dkwLam(0xF0E8D8));
tt.position.set(-0.2 + k * 0.057, 4.98, 4.6);
tt.rotation.x = Math.PI;
g.add(tt);
}
[-1, 1].forEach(function (s) { var w = new THREE.Mesh(dkwGeo("ddWing", function () { var sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(2, 3.6); sh.lineTo(5.4, 3.0); sh.lineTo(4.6, 1.4); sh.lineTo(5.0, 0.2); sh.lineTo(3.4, -0.2); sh.lineTo(3.0, -1.6); sh.lineTo(1.6, -0.8); sh.lineTo(0, -1.2); return new THREE.ShapeGeometry(sh); }), mem); w.scale.x = s; w.position.set(s * 0.6, 3.0, 1.0); w.rotation.y = s * -1.2; w.rotation.z = s * 0.3; g.add(w); });
[[-0.6, 1.8], [0.6, 1.8], [-0.6, -1.4], [0.6, -1.4]].forEach(function (q) { g.add(new THREE.Mesh(dkwTaper([[q[0], 2, q[1]], [q[0] * 1.4, 1, q[1] + 0.3], [q[0] * 1.4, 0, q[1] + 0.5]], [0.25, 0.18, 0.14], 8, 6), sc)); });
return g;
},
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var sk = dkwM("aetherFish", function () { return new THREE.MeshPhongMaterial({ color: 0x8AE8FF, emissive: 0x2A4A8A, specular: 0xFFC8FF, shininess: 150 }); }), fin = dkwM("aetherFin", function () { return new THREE.MeshBasicMaterial({ color: 0xE8C8FF, transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthWrite: false }); });
dkwEll(g, sk, 0.22, 0.3, 0.7, 0, 0, 0);
var tl = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.8), fin);
tl.rotation.y = Math.PI / 2;
tl.position.z = -0.85;
g.add(tl);
[-1, 1].forEach(function (s) { var f = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.3), fin); f.position.set(s * 0.3, 0, 0.1); f.rotation.z = s * 0.4; g.add(f); });
var df = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.4), fin);
df.rotation.y = Math.PI / 2;
df.position.set(0, 0.35, 0);
g.add(df);
g.userData.kind = "air";
g.userData.home = [x, z];
g.userData.y0 = y;
g.userData.ph = 1;
g.userData.dr = [0.25, 0.25];
DKW.bob.push(g);
return g;
},
function (P, x, z, w, h, R) {
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
var cols = [0xD8B88A, 0xC89A6A, 0xE8D0A8, 0xB88A5A];
var st = dkwS("b:ashlar", cols[Math.floor(R() * 4)], 2), seg = 8;
var bd = new THREE.Mesh(new THREE.CylinderGeometry(w * 0.5, w * 0.62, h, seg), st);
bd.position.y = h / 2;
bd.rotation.y = R();
g.add(bd);
var bnd = new THREE.Mesh(new THREE.CylinderGeometry(w * 0.52, w * 0.52, 0.8, seg), dkwShine([0x8A3A5A, 0x3A6A8A, 0xA8603A, 0x5A8A6A][Math.floor(R() * 4)], 0.15, 0.3));
bnd.position.y = h * 0.66;
bnd.rotation.y = bd.rotation.y;
g.add(bnd);
var dm = new THREE.Mesh(new THREE.SphereGeometry(w * 0.48, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), dkwM("alabaster", function () { return new THREE.MeshPhongMaterial({ color: 0xF8F0E4, emissive: 0x3A3428, transparent: true, opacity: 0.92, shininess: 60 }); }));
dm.position.y = h;
g.add(dm);
for (var k = 0; k < 4; k++) {
var a = bd.rotation.y + k / 4 * Math.PI * 2 + 0.4, wn = new THREE.Mesh(new THREE.CircleGeometry(0.55, 12), dkwGlowM(0xFFD89A, 0.75));
wn.position.set(Math.sin(a) * w * 0.535, h * 0.42, Math.cos(a) * w * 0.535);
wn.rotation.y = a;
g.add(wn);
}
if (R() < 0.5) {
var gd = new THREE.Mesh(new THREE.SphereGeometry(w * 0.3, 8, 6), dkwLam(0x4A8A3A));
gd.scale.y = 0.4;
gd.position.set(w * 0.2, h * 0.7, w * 0.3);
g.add(gd);
}
dkwRound(x, z, w * 0.62);
return g;
},
function (G) {
var lite = dkwLite(), H = dkwEnclH, R = wRand(35035), rock = dkwMat("rock"), red = dkwMat("redrock");
dkwTerrain(G, -1300, -1300, 2600, 2600, lite ? 26 : 13, H, dkwMat("grass"), function (x, z, y, c) {
var n = dkwFbm(x * 0.03, z * 0.03, 2), rr = Math.hypot(x, z);
if (y > 200) {
c.setRGB(0.88, 0.9, 0.94);
return;
}
if (rr > 870 && y > 8) {
c.setRGB(0.42 + n * 0.06, 0.38 + n * 0.05, 0.34 + n * 0.05);
return;
}
if (z > 420) {
c.setRGB(0.2 + n * 0.05, 0.34 + n * 0.07, 0.16 + n * 0.04);
return;
}
if (z > 70) {
c.setRGB(0.5 + n * 0.06, 0.6 + n * 0.06, 0.48 + n * 0.05);
return;
}
if (z > -210) {
c.setRGB(0.66 + n * 0.07, 0.32 + n * 0.05, 0.2 + n * 0.04);
return;
}
if (z > -290) {
c.setRGB(0.3 + n * 0.05, 0.38 + n * 0.05, 0.2 + n * 0.04);
return;
}
c.setRGB(0.62 + n * 0.04, 0.54 + n * 0.04, 0.42 + n * 0.04);
});
(function () {
dkwBox(G, 40, 1, 20, dkwS("b:ashlar", 0x8A7A6A, 3), 0, 130.4, 888);
dkwFloor(0, 888, 40, 20, 131.4);
for (var k = -4; k <= 4; k++)
dkwBox(G, 3.6, 1, 0.6, dkwS("b:ashlar", 0x8A7A6A, 3), k * 4.2, 131.4, 877.8);
dkwSolid(0, 877.4, 38, 0.6, 120, 133);
var mo = new THREE.Mesh(new THREE.CircleGeometry(3.4, 10, 0, Math.PI), dkwLam(0x050505));
mo.position.set(0, 131.4, 905.6);
mo.rotation.y = Math.PI;
G.add(mo);
dkwSolid(0, 907, 12, 4, 120, 150);
})();
var path = [];
for (var z = 878; z > 680; z -= 8)
path.push([Math.sin(z * 0.05) * 22, z]);
dkwStrip(G, path, 4, function (x, z) { return H(x, z) + 0.06; }, dkwS("b:limestone", 0xA8946A, 6), 0.06);
for (var i = 0; i < (lite ? 8 : 18); i++) {
var a = i / 18 * Math.PI * 2 + 0.2, fx = Math.sin(a) * 940, fz = Math.cos(a) * 940;
if (Math.abs(fx) < 120 && fz > 0)
continue;
var fh = H(fx * 1.12, fz * 1.12);
var wf = new THREE.Mesh(new THREE.PlaneGeometry(14, fh * 0.9), dkwM("enFall", function () { var t = dkwCanvas("enFallT", 32, 128, function (c, W, Hh) { c.fillStyle = "#E8F4FF"; c.fillRect(0, 0, W, Hh); for (var k = 0; k < 40; k++) {
c.fillStyle = "rgba(150,190,220,.5)";
c.fillRect(Math.random() * W, Math.random() * Hh, 1, 10 + Math.random() * 30);
} }); return new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false }); }));
wf.position.set(fx * 1.06, fh * 0.45 + 4, fz * 1.06);
wf.rotation.y = a + Math.PI;
wf.rotation.x = -0.5;
G.add(wf);
}
var bark = dkcTitanBarkM(), leafGreen = [], leafGold = [], trees = [];
(function () {
var n = lite ? 18 : 46, t = 0;
while (trees.length < n && t < n * 20) {
t++;
var tx = (R() - 0.5) * 560, tz = 430 + R() * 260;
if (Math.abs(tx - Math.sin(tz * 0.05) * 6) < 12)
continue;
if (Math.hypot(tx + 46, tz - 566) < 18 || Math.hypot(tx - 40, tz - 478) < 26)
continue;
if (trees.some(function (q) { return Math.hypot(q[0] - tx, q[1] - tz) < 22; }))
continue;
trees.push([tx, tz, 3 + R() * 2.4, 60 + R() * 30]);
}
trees.forEach(function (q) {
var y = H(q[0], q[1]);
var tr = new THREE.Mesh(dkwTaper([[0, -2, 0], [0, q[3] * 0.3, 0], [0, q[3] * 0.7, 0], [0, q[3], 0]], [q[2] * 1.5, q[2], q[2] * 0.8, q[2] * 0.5], 14, 10), bark);
tr.position.set(q[0], y, q[1]);
G.add(tr);
dkwRound(q[0], q[1], q[2] * 1.2);
for (var r = 0; r < 5; r++) {
var ra = r / 5 * Math.PI * 2 + q[0];
var root = new THREE.Mesh(dkwTaper([[0, 3, 0], [Math.cos(ra) * q[2] * 1.6, 1, Math.sin(ra) * q[2] * 1.6], [Math.cos(ra) * q[2] * 2.6, -0.5, Math.sin(ra) * q[2] * 2.6]], [q[2] * 0.5, q[2] * 0.3, 0.2], 8, 6), bark);
root.position.set(q[0], y, q[1]);
G.add(root);
}
var tiers = lite ? [0.62, 0.86] : [0.45, 0.62, 0.8];
tiers.forEach(function (f, ti) {
var nb = lite ? 3 : 4;
for (var b = 0; b < nb; b++) {
var ba = b / nb * Math.PI * 2 + R() + ti * 0.7, L = (1 - f) * 30 + 10 + R() * 6, rise = 4 + R() * 6, y0 = q[3] * f;
var ex = Math.cos(ba) * L, ez = Math.sin(ba) * L, ey = y0 + rise;
var br = new THREE.Mesh(dkwTaper([[0, y0, 0], [ex * 0.55, y0 + rise * 0.35, ez * 0.55], [ex, ey, ez]], [q[2] * 0.42, q[2] * 0.24, 0.35], 8, 6), bark);
br.position.set(q[0], y, q[1]);
G.add(br);
var s = 2.2 + R() * 1.1 + (1 - f) * 1.4;
(R() < 0.33 ? leafGold : leafGreen).push({ x: q[0] + ex, y: y + ey - 12.6 * s + 2.6 * s, z: q[1] + ez, s: s, ry: R() * 6.28 });
}
});
var st = 3.2 + R() * 0.8;
(R() < 0.3 ? leafGold : leafGreen).push({ x: q[0], y: y + q[3] - 12.6 * st + 1.5 * st, z: q[1], s: st, ry: R() * 6.28 });
});
})();
(function () {
var leaf = dkwLeafTex();
var mk = function (key, col) { return dkwM(key, function () { var m = new THREE.MeshLambertMaterial({ color: col, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }); };
var cell = function (l) { var m = {}; l.forEach(function (t) { var k = Math.floor(t.x / 160) + "," + Math.floor(t.z / 160); (m[k] = m[k] || []).push(t); }); return Object.keys(m).map(function (k) { return m[k]; }); };
cell(leafGreen).forEach(function (p) { dkwInst(G, dkwGeo("acrown"), mk("tleafTitan", 0x3E7A30), p, {}); });
cell(leafGold).forEach(function (p) { dkwInst(G, dkwGeo("acrown"), mk("tleafTitanGold", 0xC8A83A), p, {}); });
})();
dkwPlant(G, "fern", dkwScatter(35036, lite ? 120 : 420, -280, 420, 280, 700, function (x, z) { return Math.abs(x - Math.sin(z * 0.05) * 6) > 4; }, H, 0.6, 1.4), {});
(function () { var moss = []; for (var k = 0; k < (lite ? 300 : 1100); k++) {
var mx = (R() - 0.5) * 560, mz = 420 + R() * 280;
moss.push({ x: mx, y: H(mx, mz) + 0.05, z: mz, s: 0.6 + R() * 1.6, ry: R() * 6 });
} dkwInst(G, dkwGeo("mossTuft", function () { var s = new THREE.SphereGeometry(0.5, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2); s.scale(1, 0.3, 1); return s; }), dkwGlowM(0x8AE88A, 0.55), moss); })();
for (i = 0; i < (lite ? 4 : 9); i++)
dkcStag(G, -30 + R() * 60, 0, 560 + R() * 120, R() * 6, R);
for (i = 0; i < (lite ? 20 : 70); i++)
dkcMoth(G, (R() - 0.5) * 300, 3 + R() * 10, 440 + R() * 250, i);
(function () { var bg = new THREE.Group(); bg.position.set(16, H(16, 622), 622); G.add(bg); for (var k = 0; k < 40; k++) {
var a = k * 2.4, r = 0.4 + Math.sqrt(k) * 0.5;
var st = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.6, 4), dkwLam(0x3A6A2A));
st.position.set(Math.cos(a) * r, 0.3, Math.sin(a) * r);
bg.add(st);
var bl = new THREE.Mesh(dkwGeo("bell", function () { return new THREE.ConeGeometry(0.1, 0.18, 8, 1, true); }), dkwGlowM(k % 2 ? 0x5A6AFF : 0xB88AFF, 0.85));
bl.position.set(Math.cos(a) * r, 0.62, Math.sin(a) * r);
bl.userData.kind = "float";
bl.userData.y0 = 0.62;
bl.userData.amp = 0.04;
bl.userData.f = 1.4;
bl.userData.ph = 0;
bg.add(bl);
DKW.bob.push(bl);
} })();
(function () { var fr = []; for (var k = 0; k < (lite ? 40 : 120); k++) {
var q = trees[k % Math.max(1, trees.length)];
if (!q)
break;
fr.push({ x: q[0] + (R() - 0.5) * 20, y: H(q[0], q[1]) + 8 + R() * 10, z: q[1] + (R() - 0.5) * 20, s: 0.6 + R() * 0.5 });
} dkwInst(G, dkwGeo("lumfruit", function () { return new THREE.SphereGeometry(0.22, 8, 6); }), dkwGlowM(0xFFE88A, 0.9), fr); })();
(function () {
var x = -46, z = 566, y = H(x, z);
var pl = new THREE.Mesh(new THREE.CircleGeometry(9, 32), dkwS("b:limestone", 0x6A7A6A, 3));
pl.rotation.x = -Math.PI / 2;
pl.position.set(x, y + 0.02, z);
G.add(pl);
dkwWater(G, x, z, 14, 14, y + 0.12, 0x6AC8E8, 0.7);
dkwRound(x, z, 6.6);
var vis = new THREE.Mesh(new THREE.PlaneGeometry(12, 6.8), dkwM("awenMemory", function () {
var t = dkwCanvas("awenMemoryT", 512, 290, function (c, W, Hh) {
var g = c.createLinearGradient(0, 0, 0, Hh);
g.addColorStop(0, "#2A3A6A");
g.addColorStop(1, "#C8A86A");
c.fillStyle = g;
c.fillRect(0, 0, W, Hh);
c.fillStyle = "#F8F0E0";
c.beginPath();
c.arc(80, 50, 18, 0, Math.PI * 2);
c.fill();
c.beginPath();
c.arc(120, 40, 11, 0, Math.PI * 2);
c.fill();
c.fillStyle = "#5A6A3A";
c.fillRect(0, 200, W / 2, 90);
c.fillStyle = "#3A3A2A";
for (var k = 0; k < 14; k++) {
c.beginPath();
c.ellipse(20 + k * 16, 205 + (k % 3) * 8, 8, 4, 0, 0, Math.PI * 2);
c.fill();
}
c.fillStyle = "#6A8A4A";
[[300, 90], [380, 60], [440, 110]].forEach(function (p) { c.beginPath(); c.ellipse(p[0], p[1], 34, 10, 0, 0, Math.PI * 2); c.fill(); c.fillStyle = "rgba(255,140,60,.8)"; c.fillRect(p[0] - 10, p[1] - 18, 20, 10); c.fillStyle = "#6A8A4A"; c.beginPath(); c.moveTo(p[0] - 30, p[1]); c.lineTo(p[0], p[1] + 30); c.lineTo(p[0] + 30, p[1]); c.fill(); });
c.fillStyle = "rgba(30,80,140,.85)";
c.fillRect(W / 2, 200, W / 2, 90);
c.fillStyle = "#E8C8D8";
for (k = 0; k < 6; k++) {
c.fillRect(290 + k * 34, 230 - k % 3 * 14, 10, 60);
c.beginPath();
c.arc(295 + k * 34, 226 - k % 3 * 14, 7, 0, Math.PI * 2);
c.fill();
}
});
return new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide });
}));
vis.position.set(x, y + 0.3, z);
vis.rotation.x = -Math.PI / 2;
G.add(vis);
dkwShow("awenmemory", vis, false);
dkwPlant(G, "fern", dkwScatter(35037, lite ? 10 : 30, x - 14, z - 14, x + 14, z + 14, function (a, b) { return Math.hypot(a - x, b - z) > 9; }, H, 0.6, 1.1), {});
})();
(function () { var x = -34, z = 592, y = H(x, z); var tr = new THREE.Mesh(dkwTaper([[0, 0, 0], [0.4, 10, 0], [0, 22, 0.5]], [2.0, 1.4, 0.8], 14, 8), dkwLam(0xE8E8E0)); tr.position.set(x, y, z); G.add(tr); dkwRound(x, z, 2.2); for (var k = 0; k < 20; k++) {
var mk = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.12), dkwLam(0x2A2A2A, { ds: 1 }));
var a = R() * 6;
mk.position.set(x + Math.sin(a) * 1.95, y + 1 + R() * 16, z + Math.cos(a) * 1.95);
mk.rotation.y = a;
G.add(mk);
} })();
(function () {
var x = 40, z = 478, y = H(x, z);
var tr = new THREE.Mesh(dkwTaper([[0, -1, 0], [0, 12, 0], [0, 26, 0], [0, 40, 0]], [9, 6.5, 5, 3], 18, 10), dkcMosaicBarkM());
tr.position.set(x, y, z);
G.add(tr);
dkwRound(x, z, 7.2);
var lv = [];
for (var k = 0; k < (lite ? 300 : 900); k++) {
var a = R() * Math.PI * 2, r = R() * 26, h = 34 + R() * 20;
lv.push({ x: x + Math.cos(a) * r, y: y + h - r * 0.3, z: z + Math.sin(a) * r, s: 0.8 + R() * 0.8, rx: R() * 3, ry: R() * 6 });
}
[0xE83A3A, 0xE8A83A, 0x3AA84A, 0x3A8AE8, 0xB83AE8, 0xE8E83A].forEach(function (col, c) { dkwInst(G, dkwGeo("ftLeaf" + (c % 3), function () { return c % 3 === 0 ? new THREE.CircleGeometry(0.6, 5) : c % 3 === 1 ? new THREE.PlaneGeometry(0.9, 0.5) : new THREE.CircleGeometry(0.5, 3); }), dkwLam(col, { ds: 1 }), lv.filter(function (_, j) { return j % 6 === c; })); });
for (k = 0; k < 6; k++) {
var ba = k / 6 * Math.PI * 2;
var br = new THREE.Mesh(dkwTaper([[0, 26, 0], [Math.cos(ba) * 12, 34, Math.sin(ba) * 12], [Math.cos(ba) * 22, 40, Math.sin(ba) * 22]], [2, 1, 0.3], 10, 6), dkcMosaicBarkM());
br.position.set(x, y, z);
G.add(br);
}
dkwPlant(G, "cactus", [{ x: x - 12, y: H(x - 12, z + 4), z: z + 4, s: 0.5 }, { x: x - 13, y: H(x - 13, z + 6), z: z + 6, s: 0.4 }], {});
dkwWater(G, x - 10, z + 10, 3, 3, y + 0.1, 0x3A8A6A, 0.8);
for (k = 0; k < 5; k++) {
var ly = new THREE.Mesh(new THREE.CircleGeometry(0.3, 10), dkwLam(0x3A8A3A));
ly.rotation.x = -Math.PI / 2;
ly.position.set(x - 11 + k * 0.5, y + 0.14, z + 9 + (k % 2));
G.add(ly);
var lf = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 4), dkwLam(0xF8D8E8));
lf.position.set(x - 11 + k * 0.5, y + 0.2, z + 9 + (k % 2));
G.add(lf);
}
for (k = 0; k < 14; k++) {
var o = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 4), dkwLam([0xE8E8C8, 0xC83AE8, 0xE83A8A, 0xA8C8A8][k % 4]));
var a2 = R() * 6;
o.position.set(x + Math.cos(a2) * (10 + R() * 3), y + 0.3 + R() * 0.5, z + Math.sin(a2) * (10 + R() * 3));
G.add(o);
}
dkcAetherFish(G, x - 6, y + 4, z + 12);
})();
(function () {
var bl = [];
for (var k = 0; k < (lite ? 1600 : 5200); k++) {
var gx = (R() - 0.5) * 820, gz = 70 + R() * 350;
if (Math.abs(gx - Math.sin(gz * 0.03) * 14) < 2.4)
continue;
bl.push({ x: gx, y: H(gx, gz), z: gz, s: 0.8 + R() * 0.9, ry: R() * 6 });
}
dkwInst(G, dkwGeo("wwgrass", function () { return dkwCards(3, 1.4, 1.2, 0); }), dkwLam(0xC8E8C8, { ds: 1, map: dkwGrassTex(), mapk: "tuft", cut: 0.4 }), bl);
var gp = [];
for (var z = 420; z > -300; z -= 8)
gp.push([z > 70 ? Math.sin(z * 0.03) * 14 : z > -210 ? Math.sin(z * 0.05) * 8 : 0, z]);
dkwStrip(G, gp, 2.4, function (x, z) { return H(x, z) + 0.07; }, dkwM("goldmoss", function () { return new THREE.MeshLambertMaterial({ color: 0xE8C84A, emissive: 0x8A6A10 }); }), 0.07);
})();
for (i = 0; i < (lite ? 6 : 14); i++)
dkcWindHorse(G, (R() - 0.5) * 500, 0, 120 + R() * 260, i);
for (i = 0; i < (lite ? 3 : 7); i++)
dkcThunderbird(G, (R() - 0.5) * 300, 70 + R() * 50, 200 + R() * 200, i);
(function () { [["dkdwarf", -40, 330], ["dkdwarf", -38, 331.4], ["dkelf", 34, 280], ["dktownf", -30, 250], ["dkrobe", 26, 190]].forEach(function (q, k) { var g = dkwDressed("illu" + k, q[0], { sex: q[0] === "dktownf" ? "f" : "m", beard: q[0] === "dkdwarf" ? "full" : null }); dkfGhost(g); g.position.set(q[1], H(q[1], q[2]), q[2]); g.rotation.y = k * 1.3; G.add(g); g.userData.kind = "float"; g.userData.y0 = g.position.y; g.userData.amp = 0.15; g.userData.f = 0.7; g.userData.ph = k; DKW.bob.push(g); DKW.ghosts.push(g); }); })();
(function () {
var cols = [0xE83A4A, 0x3A6AE8, 0x3AC86A, 0xE8A83A, 0xB83AE8];
for (var k = 0; k < 9; k++) {
var cx = -24 + (k % 3) * 10 + (R() - 0.5) * 4, cz = 214 + Math.floor(k / 3) * 9, y = H(cx, cz), cg = new THREE.Group();
cg.position.set(cx, y, cz);
G.add(cg);
for (var j = 0; j < 7; j++) {
var cr = new THREE.Mesh(dkwGeo("hcrys", function () { var c = new THREE.CylinderGeometry(0.0, 0.45, 1, 6); c.translate(0, 0.5, 0); return c; }), dkwM("hstone" + (k % 5), function () { return new THREE.MeshPhongMaterial({ color: cols[k % 5], emissive: cols[k % 5], emissiveIntensity: 0.45, transparent: true, opacity: 0.88, shininess: 140 }); }));
cr.scale.set(1, 2 + R() * 3.4, 1);
cr.position.set((R() - 0.5) * 1.4, 0, (R() - 0.5) * 1.4);
cr.rotation.set((R() - 0.5) * 0.6, R() * 3, (R() - 0.5) * 0.6);
cg.add(cr);
}
dkwRound(cx, cz, 1.2);
}
})();
(function () {
var veinM = dkwM("badVein", function () { var t = dkwCanvas("badVeinT", 128, 128, function (c, W, Hh) { c.fillStyle = "#A8502A"; c.fillRect(0, 0, W, Hh); for (var k = 0; k < 12; k++) {
c.fillStyle = "rgba(140,60,30,.5)";
c.fillRect(0, k * 11, W, 4);
} c.strokeStyle = "rgba(255,190,70,.9)"; c.lineWidth = 2; for (k = 0; k < 6; k++) {
c.beginPath();
var x = Math.random() * W, y = 0;
c.moveTo(x, y);
for (var s = 0; s < 8; s++) {
x += (Math.random() - 0.5) * 24;
y += 16;
c.lineTo(x, y);
}
c.stroke();
} }); t.repeat.set(1, 3); return new THREE.MeshLambertMaterial({ map: t, emissive: 0x2A0A00 }); });
var hood = 0, tries = 0;
while (hood < (lite ? 26 : 70) && tries < 600) {
tries++;
var hx = (R() - 0.5) * 700, hz = -200 + R() * 260;
if (Math.abs(hx - Math.sin(hz * 0.05) * 8) < 14)
continue;
if (Math.hypot(hx - 30, hz + 92) < 10)
continue;
hood++;
var y = H(hx, hz), hh = 10 + R() * 30, hr = 2 + R() * 4;
var col = new THREE.Mesh(dkwTaper([[0, -1, 0], [0, hh * 0.4, 0], [0, hh * 0.8, 0], [0, hh, 0]], [hr, hr * 0.7, hr * 0.85, hr * 0.5], 10, 8), veinM);
col.position.set(hx, y, hz);
G.add(col);
var cap = new THREE.Mesh(dkwGeo("rock", function () { return new THREE.DodecahedronGeometry(1, 1); }), red);
cap.position.set(hx, y + hh + 0.6, hz);
cap.scale.set(hr * 1.3, hr * 0.5, hr * 1.3);
G.add(cap);
dkwRound(hx, hz, hr);
}
var ax = Math.sin(-40 * 0.05) * 8, ar = new THREE.Mesh(new THREE.TorusGeometry(14, 3.4, 10, 24, Math.PI), veinM);
ar.position.set(ax, H(ax, -40) - 1, -40);
G.add(ar);
[-1, 1].forEach(function (s) { dkwRound(ax + s * 14, -40, 3.6); });
for (var k = 0; k < 30; k++) {
var a = k / 30 * Math.PI, mn = new THREE.Mesh(dkwGeo("archGem", function () { return new THREE.OctahedronGeometry(0.3, 0); }), dkwGlowM([0xFFC83A, 0x3AE8FF, 0xE83AA8][k % 3], 0.95));
mn.position.set(ax + Math.cos(a) * 10.8, H(ax, -40) - 1 + Math.sin(a) * 10.8, -40 + (R() - 0.5) * 3);
G.add(mn);
}
var py = H(30, -92);
var pin = new THREE.Mesh(dkwTaper([[0, -1, 0], [0, 20, 0], [0, 38, 0]], [6, 4, 2.6], 12, 8), veinM);
pin.position.set(30, py, -92);
G.add(pin);
dkwRound(30, -92, 6);
var dd = dkcDesertDrake(G, 30, py + 37.4, -92, -Math.PI / 2 - 0.4);
dkwShow("desertdrake", dd, false);
})();
dkwPlant(G, "cactus", dkwScatter(35038, lite ? 30 : 90, -300, -200, 300, 60, function (x, z) { return Math.abs(x - Math.sin(z * 0.05) * 8) > 5; }, H, 0.4, 0.9), {});
for (i = 0; i < (lite ? 4 : 10); i++) {
var lz = new THREE.Mesh(dkwGeo("lizard", function () { var s = new THREE.SphereGeometry(0.1, 8, 5); s.scale(0.7, 0.4, 2.4); return s; }), dkwLam([0xB8603A, 0xC8A060, 0x8A6A3A][i % 3]));
var lx = (R() - 0.5) * 40, lzz = -180 + R() * 220;
lz.position.set(lx, H(lx, lzz) + 0.05, lzz);
lz.rotation.y = R() * 6;
G.add(lz);
}
(function () { for (var r = 0; r < 5; r++) {
var tz = -216 - r * 14;
[-1, 1].forEach(function (s) { var tb = new THREE.Mesh(new THREE.BoxGeometry(240, 0.6, 12), dkwS("b:ashlar", 0x8A6A4A, 4)); tb.position.set(s * 130, H(s * 130, tz) - 0.2, tz); G.add(tb); var crops = []; for (var k = 0; k < (lite ? 40 : 120); k++)
crops.push({ x: s * (12 + R() * 240), y: H(0, tz) + 0.2, z: tz + (R() - 0.5) * 10, s: 0.5 + R() * 0.6 }); dkwInst(G, dkwGeo("fungCrop", function () { var c = new THREE.SphereGeometry(0.4, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2); c.scale(1, 0.6, 1); return c; }), dkwGlowM([0x8AE8C8, 0xE8C86A, 0xC88AE8, 0x8AC8FF, 0xE88A6A][r], 0.8), crops); });
} })();
(function () {
var x = 0, z = -300;
var gm = dkwM("livingStone", function () { return new THREE.MeshStandardMaterial({ color: 0xB8946A, emissive: 0x5A3A10, roughness: 0.7, metalness: 0.1 }); });
var ar = new THREE.Mesh(new THREE.TorusGeometry(12, 3.2, 12, 28, Math.PI), gm);
ar.position.set(x, 0, z);
G.add(ar);
[-1, 1].forEach(function (s) { var p = dkwCyl(G, 3.6, 4.2, 4, gm, s * 12, -1, z, 12); dkwRound(s * 12, z, 4.2); });
var glow = new THREE.Mesh(new THREE.TorusGeometry(12, 0.5, 8, 28, Math.PI), dkwGlowM(0xFFB84A, 0.7));
glow.position.set(x, 0, z + 3.3);
G.add(glow);
glow.userData.kind = "float";
glow.userData.y0 = 0;
glow.userData.amp = 0.05;
glow.userData.f = 1;
glow.userData.ph = 0;
DKW.bob.push(glow);
for (var a = 0; a < 48; a++) {
var a0 = a / 48 * Math.PI * 2, a1 = (a + 1) / 48 * Math.PI * 2, wx = EN_CITY.x + (Math.sin(a0) + Math.sin(a1)) / 2 * 262, wz = EN_CITY.z + (Math.cos(a0) + Math.cos(a1)) / 2 * 262;
if (Math.abs(wx) < 16 && wz > -320)
continue;
var L = 262 * (a1 - a0) + 1, ry = Math.atan2(Math.sin(a1) - Math.sin(a0), Math.cos(a1) - Math.cos(a0));
var wl = new THREE.Mesh(new THREE.BoxGeometry(6, 9, L), gm);
wl.position.set(wx, 4.5, wz);
wl.rotation.y = ry;
G.add(wl);
dkwSolid(wx, wz, 6, L, -50, 400, -ry);
var cr = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, L, 10, 1, false, 0, Math.PI), gm);
cr.rotation.z = Math.PI / 2;
cr.rotation.y = ry + Math.PI / 2;
cr.position.set(wx, 9, wz);
G.add(cr);
}
})();
(function () {
var CX = EN_CITY.x, CZ = EN_CITY.z, hs = [], t = 0, n = lite ? 60 : 150;
while (hs.length < n && t < n * 12) {
t++;
var a = R() * Math.PI * 2, r = 40 + R() * 205, hx = CX + Math.sin(a) * r, hz = CZ + Math.cos(a) * r;
if (Math.abs(hx) < 22 && hz > -700)
continue;
if (Math.hypot(hx, hz + 620) < 46)
continue;
if (Math.hypot(hx, hz + 720) < 60)
continue;
var hw = 8 + R() * 8;
if (hs.some(function (q) { return Math.hypot(q[0] - hx, q[1] - hz) < (q[2] + hw) * 0.62 + 3; }))
continue;
hs.push([hx, hz, hw]);
}
hs.forEach(function (q) { dkcEarthHouse(G, q[0], q[1], q[2], 8 + R() * 14, R); });
var cob = dkwS("b:limestone", 0xC8A880, 6);
dkwStrip(G, [[0, -300], [0, -400], [0, -500], [0, -586]], 12, function () { return 0.06; }, cob, 0.06);
dkwStrip(G, [[-240, -560], [-60, -560], [60, -560], [240, -560]], 8, function () { return 0.06; }, cob, 0.06);
[-1, 1].forEach(function (s) {
dkwWater(G, s * 9, -450, 3, 280, 0.05, 0x5AA8C8, 0.85);
var ed = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 280), dkwS("b:ashlar", 0xD8C8A8, 4));
ed.position.set(s * 10.7, 0.25, -450);
G.add(ed);
dkwSolid(s * 9, -450, 3, 280, -50, 0.6);
for (var k = 0; k < 3; k++) {
var tz = -340 - k * 100, tr = new THREE.Mesh(new THREE.BoxGeometry(10, 12, 10), dkwS("b:ashlar", 0xD8B88A, 3));
tr.position.set(s * 18, 6, tz);
G.add(tr);
dkwSolid(s * 18, tz, 10, 10);
var gd = new THREE.Mesh(new THREE.BoxGeometry(10, 0.8, 10), dkwLam(0x4A8A3A));
gd.position.set(s * 18, 12.4, tz);
G.add(gd);
var wf = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 12), dkwM("enFall", function () { return new THREE.MeshBasicMaterial({ color: 0xE8F4FF, transparent: true, opacity: 0.8 }); }));
wf.position.set(s * 12.9, 6, tz);
wf.rotation.y = -s * Math.PI / 2;
G.add(wf);
if (s < 0) {
var br = new THREE.Mesh(new THREE.TorusGeometry(18, 0.8, 8, 24, Math.PI), dkwMat("darkbark"));
br.position.set(0, -4, tz);
br.rotation.y = Math.PI / 2;
br.scale.set(1, 0.6, 1);
br.rotation.order = "YXZ";
G.add(br);
var br2 = br.clone();
br2.position.z = tz + 1.2;
G.add(br2);
for (var v = 0; v < 10; v++) {
var vn = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 1.6), dkwLam(0x3A7A2A, { ds: 1 }));
vn.position.set(-14 + v * 3, 9.4 - Math.abs(v - 4.5) * 0.3, tz + 0.6);
G.add(vn);
}
}
}
});
var sc = [0xB83A2A, 0x2A6A9A, 0xE8C860, 0x6A3A8A, 0x3A8A5A, 0xE86A1A];
for (var k = 0; k < (lite ? 14 : 34); k++) {
var sx = (k % 2 ? 1 : -1) * 15, sz = -330 - k * 4.4;
var st = new THREE.Group();
st.position.set(sx, 0, sz);
st.rotation.y = sx < 0 ? Math.PI / 2 : -Math.PI / 2;
G.add(st);
dkwBox(st, 2.6, 0.9, 1.3, dkwMat("oak"), 0, 0, 0);
var aw = new THREE.Mesh(new THREE.PlaneGeometry(3, 1.9), dkwLam(sc[k % 6], { ds: 1 }));
aw.position.set(0, 2.3, 0.2);
aw.rotation.x = -0.6;
st.add(aw);
dkwCyl(st, 0.04, 0.04, 2.4, dkwMat("oak"), -1.3, 0, 0.8, 5);
dkwCyl(st, 0.04, 0.04, 2.4, dkwMat("oak"), 1.3, 0, 0.8, 5);
for (var j = 0; j < 6; j++) {
var it = new THREE.Mesh(k % 3 === 0 ? new THREE.OctahedronGeometry(0.12, 0) : new THREE.SphereGeometry(0.1, 6, 5), k % 3 === 0 ? dkwGlowM([0xE83A4A, 0x3A6AE8, 0x3AC86A][j % 3], 0.9) : dkwLam([0xA87A5A, 0xC8A87A, 0x8A5A3A][j % 3]));
it.position.set(-1 + j * 0.4, 1, 0);
st.add(it);
}
dkwSolid(sx, sz, 1.4, 2.8);
}
(function () {
dkwBox(G, 1.6, 0.9, 0.8, dkwMat("oak"), -11, 0, -380);
for (var j = 0; j < 12; j++) {
var sw = new THREE.Mesh(dkwGeo("rock", function () { return new THREE.DodecahedronGeometry(1, 1); }), dkwLam([0xE8B86A, 0xC88A5A, 0xF0D8A0][j % 3]));
sw.scale.setScalar(0.07);
sw.position.set(-11.6 + (j % 6) * 0.24, 0.95, -380.2 + Math.floor(j / 6) * 0.24);
G.add(sw);
}
var mg = new THREE.Group();
mg.position.set(13, 1, -440);
G.add(mg);
dkwBox(G, 1.4, 1, 1.4, dkwS("b:ashlar", 0x8A8A8A, 2), 13, 0, -440);
dkwEll(mg, dkwLam(0xC8B89A), 0.3, 0.18, 0.3, 0, 0.1, 0);
for (j = 0; j < 7; j++) {
var sp = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.4 + (j === 3 ? 0.2 : 0), 6), dkwShine(0x6A6A70, 0.2, 0.5));
var a = (j - 3) * 0.4;
sp.position.set(Math.sin(a) * 0.22, 0.4, Math.cos(a) * -0.1);
mg.add(sp);
}
mg.userData.sp = 0.3;
DKW.spin.push(mg);
dkwSolid(13, -440, 1.4, 1.4);
})();
for (k = 0; k < 14; k++) {
var gs = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 5), dkwGlowM([0x8AE8FF, 0xFFE08A, 0xC88AFF][k % 3], 0.95));
var a2 = k / 14 * Math.PI * 2;
gs.position.set(-6 + Math.cos(a2) * 1.2, 0.1, -470 + Math.sin(a2) * 1.2);
G.add(gs);
}
for (k = 0; k < 3; k++) {
var sg = new THREE.Group();
sg.position.set(6 + k * 2.4, 0, -486);
G.add(sg);
var rkM = dkwS("b:ashlar", 0x9A7A5A, 1);
dkwEll(sg, rkM, 0.3, 0.45, 0.25, 0, 1.3, 0);
dkwEll(sg, rkM, 0.18, 0.2, 0.18, 0, 1.95, 0);
[-1, 1].forEach(function (s) { var ar = new THREE.Mesh(dkwTaper([[s * 0.3, 1.6, 0], [s * 0.6, 1.3, 0.1], [s * 0.7, 0.9, 0]], [0.09, 0.07, 0.06], 6, 5), rkM); sg.add(ar); var lg = new THREE.Mesh(dkwTaper([[s * 0.15, 1, 0], [s * 0.2, 0.5, 0], [s * 0.25, 0, 0]], [0.11, 0.09, 0.08], 6, 5), rkM); sg.add(lg); });
sg.userData.sp = 1 + k * 0.4;
DKW.spin.push(sg);
}
(function () {
var pz = new THREE.Mesh(new THREE.CircleGeometry(36, 48), dkwM("agatePlaza", function () {
var t = dkwCanvas("agatePlazaT", 512, 512, function (c, W, Hh) {
c.fillStyle = "#C8A890";
c.fillRect(0, 0, W, Hh);
var cs = ["#8A3A2A", "#D8B8A0", "#5A3A5A", "#E8D8C8", "#A86A3A", "#3A5A6A"];
for (var r = 250; r > 10; r -= 10) {
c.strokeStyle = cs[(r / 10 | 0) % cs.length];
c.lineWidth = 7;
c.beginPath();
c.arc(W / 2, Hh / 2, r, 0, Math.PI * 2);
c.stroke();
}
c.fillStyle = "rgba(40,30,20,.7)";
for (var k = 0; k < 8; k++) {
var a = k / 8 * Math.PI * 2;
c.save();
c.translate(W / 2 + Math.cos(a) * 170, Hh / 2 + Math.sin(a) * 170);
c.rotate(a + Math.PI / 2);
c.beginPath();
c.moveTo(-20, 10);
c.lineTo(0, -24);
c.lineTo(20, 10);
c.closePath();
c.fill();
c.fillRect(-3, 10, 6, 14);
c.restore();
}
});
return new THREE.MeshStandardMaterial({ map: t, roughness: 0.25, metalness: 0.1 });
}));
pz.rotation.x = -Math.PI / 2;
pz.position.set(0, 0.08, -620);
G.add(pz);
for (var k = 0; k < 10; k++) {
var a = k / 10 * Math.PI * 2;
if (Math.abs(Math.sin(a)) < 0.2 && Math.cos(a) > 0)
continue;
var ax = Math.sin(a) * 40, az = -620 + Math.cos(a) * 40;
var ag = new THREE.Group();
ag.position.set(ax, 0, az);
ag.rotation.y = a;
G.add(ag);
var stM = dkwS("b:ashlar", 0xD8C0A0, 2);
dkwBox(ag, 1.4, 8, 1.4, stM, -3, 0, 0);
dkwBox(ag, 1.4, 8, 1.4, stM, 3, 0, 0);
var at = new THREE.Mesh(new THREE.TorusGeometry(3, 0.7, 8, 16, Math.PI), stM);
at.position.y = 8;
ag.add(at);
var dk = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 8), dkwLam(0x1A140E));
dk.position.set(0, 4, -0.7);
ag.add(dk);
dkwSolid(ax + Math.cos(a) * 3, az - Math.sin(a) * 3, 1.4, 1.4);
dkwSolid(ax - Math.cos(a) * 3, az + Math.sin(a) * 3, 1.4, 1.4);
}
})();
(function () {
var x = 0, z = -720, gm = dkwS("b:ashlar", 0xB8A080, 3), pol = dkwShine(0x6A6670, 0.15, 0.55);
var b1 = new THREE.Mesh(new THREE.CylinderGeometry(48, 60, 22, 24), gm);
b1.position.set(x, 11, z);
G.add(b1);
var b2 = new THREE.Mesh(new THREE.CylinderGeometry(34, 44, 18, 24), gm);
b2.position.set(x, 31, z - 6);
G.add(b2);
var dm = new THREE.Mesh(new THREE.SphereGeometry(30, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), dkwM("alabaster", function () { return new THREE.MeshPhongMaterial({ color: 0xF8F0E4, emissive: 0x3A3428, transparent: true, opacity: 0.92, shininess: 60 }); }));
dm.position.set(x, 40, z - 6);
G.add(dm);
dkwRound(x, z, 60);
for (var k = 0; k < 7; k++) {
var a = (k - 3) * 0.42, sx = x + Math.sin(a) * 40, sz = z - 6 - Math.cos(a) * -28 * 0 + Math.cos(a) * 14 - 14, hh = k === 3 ? 150 : 90 + Math.abs(3 - k) * -8 + 30;
var sp = new THREE.Mesh(dkwTaper([[0, 0, 0], [0, hh * 0.5, 0], [0, hh * 0.9, 0], [0, hh, 0]], [6, 4.4, 2.4, 0.4], 12, 8), pol);
sp.position.set(sx, 8, sz);
G.add(sp);
var cr = new THREE.Mesh(new THREE.OctahedronGeometry(1.6, 0), dkwGlowM(0xFFD89A, 0.9));
cr.position.set(sx, 8 + hh * 0.92, sz);
G.add(cr);
}
var dr = new THREE.Mesh(new THREE.PlaneGeometry(10, 14), dkwGlowM(0xFFC86A, 0.6));
dr.position.set(x, 7, z + 60.3);
G.add(dr);
})();
dkwCrowd(35080, lite ? 24 : 70, -14, -470, 14, -320, { dress: "dktown", dressF: "dktownf", wander: 14, women: 0.5, childP: 0.14, skins: [0xA87A5A, 0x8A6A4A, 0xC8A880, 0x6A5A3A, 0xD8B898], names: ["An earth elemental, eyes like polished gems", "A dwarf with stones braided in his beard", "An elven merchant, skin like bark", "A gnome measuring the flow of earth magic", "A water sprite with a vessel of spring water", "A human trader from the far realms", "A faerie at the flower stalls"], says: ["Enchanted gemstones! Fair weight, fair price!", "Sweetstone, good for the spirit.", "Mind the bridges: they grow a hand's breadth every year.", "The spring water is sacred: step aside.", "Have you come for the market, or for the council?"], look: function (g, R) { if (R() < 0.3) {
var e = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 4), dkwGlowM([0x3AE88A, 0xE8A83A, 0x3A8AE8][Math.floor(R() * 3)], 1));
e.position.set(0.04, 1.62, 0.11);
g.add(e);
var e2 = e.clone();
e2.position.x = -0.04;
g.add(e2);
} } });
dkwCrowd(35081, lite ? 10 : 30, -200, -760, 200, -400, { dress: "dktown", dressF: "dktownf", wander: 20, women: 0.5, ok: function (x, z) { var r = Math.hypot(x, z + 560); return r > 30 && r < 240 && Math.hypot(x, z + 720) > 64 && Math.abs(x) > 20; }, skins: [0xA87A5A, 0x8A6A4A, 0xC8A880, 0x6A5A3A], names: ["A Stone Shaper", "A gardener of the terraces", "A city guard of polished jade", "A minotaur hauling a cart"], says: ["Our greatest buildings were grown, not built.", "The earth itself is the judge in this city.", "Make way!"] });
dkwCrowd(35082, lite ? 6 : 16, -8, -300, 8, -200, { dress: "dktown", dressF: "dktownf", wander: 22, women: 0.5, names: ["An earth elemental working the fields", "A merchant on the road to the gate"], says: ["The glowfungi are good this year.", "The gate is just ahead."] });
})();
dkcMotes(G, lite ? 60 : 200, 0, 560, 200, 2, 30, 0xE8FFB8);
},
function (dt) {
if (DKW.sc !== "conclave" || !DKW.built)
return;
var t = DKW.t;
var still = DKW.shows && DKW.shows.earthstill && DKW.shows.earthstill.visible;
if (DKCV.tiles) {
var T = DKCV.tiles, d = new THREE.Object3D();
T.list.forEach(function (q, i) {
var y = 0, off = false, wall = false;
if (!still && !q.safe) {
var u = (t * q.sp + q.ph) % 1;
if (u < 0.45)
y = 0;
else if (u < 0.6) {
y = 2.4;
wall = true;
}
else if (u < 0.8)
y = 0;
else {
y = -9;
off = true;
}
}
else if (!still)
y = Math.sin(t * 0.8 + q.ph * 9) * 0.12;
q.cy += (y - q.cy) * Math.min(1, dt * 6);
q.F.y = T.Y + q.cy + 0.25;
q.F.off = off;
q.S.off = !wall;
d.position.set(q.x, q.cy, q.z);
d.updateMatrix();
T.m.setMatrixAt(i, d.matrix);
});
T.m.instanceMatrix.needsUpdate = true;
}
var al = DKW.shows && DKW.shows.airalign && DKW.shows.airalign.visible;
if (DKCV.plats)
DKCV.plats.forEach(function (p, i) {
var tx = al ? p.ax : p.hx + Math.sin(t * 0.3 + i) * p.dx, tz = al ? p.az : p.hz + Math.cos(t * 0.25 + i * 2) * p.dz, ty = al ? 0 : Math.sin(t * 0.6 + i * 1.7) * 2.2;
p.g.position.x += (tx - p.g.position.x) * Math.min(1, dt * 1.2);
p.g.position.z += (tz - p.g.position.z) * Math.min(1, dt * 1.2);
p.g.position.y += (ty - p.g.position.y) * Math.min(1, dt * 1.2);
p.g.rotation.y = al ? 0 : Math.sin(t * 0.4 + i) * 0.6;
p.F.x = p.A.x + p.g.position.x;
p.F.z = p.A.z + p.g.position.z;
p.F.y = DKW_IN_Y + p.g.position.y + 0.4;
});
if (DKCV.fire) {
var fw = DKW.shows && DKW.shows.firewall && DKW.shows.firewall.visible;
DKCV.fire.forEach(function (S) { S.off = !fw; });
}
if (!DKW.moving && !DKW.ride) {
var Lw = worldLocal(), S0 = DKW_SC.conclave, lx = Lw.x - S0.x, feet = camera.position.y - 1.72;
if (feet < DKW_IN_Y - 5 && feet > DKW_IN_Y - 200) {
var A2 = dkwInAt("conclave", 2), A4 = dkwInAt("conclave", 4);
if (Math.abs(lx - A2.x) < 40)
dkwGo(DKW_AT.tEarthIn, "🕳️ The floor swallowed you. You climb back up to the trial's edge. Watch the patterns: they repeat.", dkbPopulate);
else if (Math.abs(lx - A4.x) < 40)
dkwGo(DKW_AT.tAirIn, "🌪️ The wind tore you off. Something caught you in the mist and set you back on the ledge.", dkbPopulate);
}
}
},
function (P, x, y, z, h, col, R) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var st = dkwS("b:ashlar", 0x8A8278, 3);
g.add(new THREE.Mesh(dkwTaper([[0, 0, 0], [0, h * 0.5, 0], [0, h, 0]], [4.4, 3.4, 4.0], 16, 10), st));
for (var k = 0; k < 3; k++) {
var pts = [], rads = [];
for (var j = 0; j <= 12; j++) {
var a = j * 0.7 + k * 2.1, r = 3.7 - j * 0.02;
pts.push([Math.cos(a) * r, j / 12 * h, Math.sin(a) * r]);
rads.push(0.5);
}
g.add(new THREE.Mesh(dkwTaper(pts, rads, 24, 6), dkwGlowM(col, 0.55)));
}
var cap = new THREE.Mesh(new THREE.CylinderGeometry(5.6, 4.2, 2.4, 16), st);
cap.position.y = h;
g.add(cap);
dkwRound(x, z, 4.6);
return g;
},
function (P, x, z, ry, col, sym, name) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
P.add(g);
var st = dkwS("b:ashlar", 0x6A6470, 2);
dkwBox(g, 1.2, 7, 1.2, st, -2.6, 0, 0);
dkwBox(g, 1.2, 7, 1.2, st, 2.6, 0, 0);
var ar = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.6, 8, 16, Math.PI), st);
ar.position.y = 7;
g.add(ar);
var dr = new THREE.Mesh(new THREE.PlaneGeometry(4, 7.6), dkwGlowM(col, 0.35));
dr.position.set(0, 3.8, -0.3);
g.add(dr);
var sg = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), dkwM("elemSym" + sym, function () {
var t = dkwCanvas("elemSymT" + sym, 128, 128, function (c, W, H) {
c.clearRect(0, 0, W, H);
c.strokeStyle = "#fff";
c.fillStyle = "#fff";
c.lineWidth = 8;
c.beginPath();
if (sym === "earth") {
for (var a = 0; a < 14; a += 0.2) {
var r = 4 + a * 3.6;
c.lineTo(W / 2 + Math.cos(a) * r, H / 2 + Math.sin(a) * r);
}
c.stroke();
}
else if (sym === "water") {
for (var k = 0; k < 3; k++) {
c.beginPath();
for (var x = 10; x < W - 10; x += 4)
c.lineTo(x, 36 + k * 28 + Math.sin(x * 0.12) * 10);
c.stroke();
}
}
else if (sym === "air") {
for (k = 0; k < 3; k++) {
c.beginPath();
c.arc(W / 2 - 10 + k * 8, H / 2, 16 + k * 14, Math.PI * 0.9, Math.PI * 2.2);
c.stroke();
}
}
else if (sym === "fire") {
c.moveTo(W / 2, 10);
c.quadraticCurveTo(W - 14, 70, W / 2, H - 10);
c.quadraticCurveTo(14, 70, W / 2, 10);
c.fill();
}
else {
for (k = 0; k < 6; k++) {
var a2 = k / 6 * Math.PI * 2;
c.beginPath();
c.moveTo(W / 2, H / 2);
c.lineTo(W / 2 + Math.cos(a2) * 54, H / 2 + Math.sin(a2) * 54);
c.stroke();
}
}
});
return new THREE.MeshBasicMaterial({ map: t, transparent: true, color: col, depthWrite: false });
}));
sg.position.set(0, 8.6, 0.7);
g.add(sg);
dkwSolid(x + Math.cos(ry) * 2.6, z - Math.sin(ry) * 2.6, 1.2, 1.2, -50, 400, 0);
dkwSolid(x - Math.cos(ry) * 2.6, z + Math.sin(ry) * 2.6, 1.2, 1.2, -50, 400, 0);
return g;
},
function (G) {
var lite = dkwLite(), H = dkwConclaveH, R = wRand(36036), rock = dkwMat("rock"), st = dkwS("b:ashlar", 0x7A746C, 3);
dkwTerrain(G, -140, -140, 280, 420, lite ? 6 : 3, H, dkwMat("cave"), function (x, z, y, c) { var n = dkwFbm(x * 0.08, z * 0.08, 2); if (y < -19 && Math.hypot(x, z) < 90) {
c.setRGB(0.42 + n * 0.04, 0.4 + n * 0.04, 0.38 + n * 0.04);
return;
} c.setRGB(0.22 + n * 0.06, 0.2 + n * 0.05, 0.18 + n * 0.05); });
dkwBox(G, 8, 1, 116, st, 0, 8, 206);
for (var z = 258; z > 152; z -= 6) {
[-1, 1].forEach(function (s) { dkwBox(G, 0.6, 8, 6.2, st, s * 2.9, 0, z); });
if (z % 18 === 0) {
var tl = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), dkwGlowM(0xFFB86A, 0.95));
tl.position.set(-2.5, 2.6, z);
G.add(tl);
}
if (z % 24 === 0)
dkwBox(G, 0.1, 2.4, 1.4, dkwMat("darkbark"), 2.55, 0, z + 2);
}
dkwSolid(-2.9, 206, 0.6, 116);
dkwSolid(2.9, 190, 0.6, 76);
dkwSolid(2.9, 236, 0.6, 52);
dkwBox(G, 3, 4, 0.6, st, 3.6, 0, 203);
dkwBox(G, 3, 4, 0.6, st, 3.6, 0, 209);
var dw = new THREE.Mesh(new THREE.BoxGeometry(6, 8, 1), st);
dw.position.set(0, 4, 152);
G.add(dw);
dkwShow("vwall", dw, true);
var dws = dkwSolid(0, 152, 6, 1, -50, 400);
DKCV.wallS = dws;
for (z = 150; z > 100; z -= 3) {
var y = H(0, z);
[-1, 1].forEach(function (s) { var rk = new THREE.Mesh(dkwGeo("rock", function () { return new THREE.DodecahedronGeometry(1, 1); }), rock); rk.position.set(s * (4 + R()), y + 2 + R() * 2, z); rk.scale.set(1.4, 3, 2); G.add(rk); });
var cl = new THREE.Mesh(dkwGeo("rock", function () { return new THREE.DodecahedronGeometry(1, 1); }), rock);
cl.position.set(0, y + 7, z);
cl.scale.set(5, 1.6, 2.4);
G.add(cl);
}
(function () { var fu = []; for (var k = 0; k < (lite ? 80 : 240); k++) {
var fz = 102 + R() * 48, s = R() < 0.5 ? -1 : 1;
fu.push({ x: s * (3.1 + R() * 0.4), y: H(0, fz) + R() * 5, z: fz, s: 0.3 + R() * 0.6, rz: -s * Math.PI / 2 });
} dkwInst(G, dkwGeo("fungCap", function () { var s = new THREE.SphereGeometry(0.3, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2); s.scale(1, 0.5, 1); return s; }), dkwGlowM(0x6AFFC8, 0.85), fu); })();
var dome = new THREE.Mesh(new THREE.SphereGeometry(118, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), dkwM("cvDome", function () { return new THREE.MeshLambertMaterial({ color: 0x2A2620, side: THREE.BackSide }); }));
dome.position.y = -22;
dome.scale.y = 0.9;
G.add(dome);
var floor = new THREE.Mesh(new THREE.CircleGeometry(92, 48), dkwS("b:marble", 0x8A8A90, 6));
floor.rotation.x = -Math.PI / 2;
floor.position.y = -19.92;
G.add(floor);
var cols = [0xFF6A2A, 0x3A8AFF, 0x6AC84A, 0xE8F0FF, 0x8AE8FF];
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2 + 0.31;
dkcElemColumn(G, Math.sin(a) * 70, -20, Math.cos(a) * 70, 80, cols[i % 5], R);
}
for (i = 0; i < (lite ? 14 : 36); i++) {
var a2 = i / 36 * Math.PI * 2, ax = Math.sin(a2) * 98, az = Math.cos(a2) * 98;
if (az > 90 && Math.abs(ax) < 8)
continue;
var ni = new THREE.Group();
ni.position.set(ax, -20, az);
ni.rotation.y = a2 + Math.PI;
G.add(ni);
dkwBox(ni, 2.4, 1.2, 1.2, st, 0, 0, 0);
var ar = new THREE.Mesh(i % 3 === 0 ? new THREE.OctahedronGeometry(0.5, 0) : i % 3 === 1 ? new THREE.TorusKnotGeometry(0.3, 0.08, 40, 6) : new THREE.IcosahedronGeometry(0.45, 0), dkwGlowM(cols[i % 5], 0.9));
ar.position.y = 2;
ni.add(ar);
ar.userData.sp = 0.6;
DKW.spin.push(ar);
}
(function () { var L = new THREE.PointLight(0xFFE8C8, 0.6, 200); L.position.set(0, 10, 0); G.add(L); })();
dkwEnterable(G, "conclave", 0, -50, -46, Math.PI * 0.25, "The healing chamber, bathed in a soft green light", { W: 24, D: 22, H: 7, wall: dkwM("healWall", function () { return new THREE.MeshLambertMaterial({ color: 0x3A6A4A, emissive: 0x0A2A12 }); }), floor: dkwS("b:moss", 0x5A8A4A, 3), ceil: dkwMat("cave"), env: "cvheal", day: 0x8AFFA8 }, { d: 6, outName: "the cavern", y: -20 });
dkwEnterable(G, "conclave", 1, 0, -92, Math.PI, "The guardians' hall of the Ethereal Conclave", { W: 64, D: 56, H: 30, wall: dkwS("b:ashlar", 0x5A5460, 3), floor: dkwS("b:marble", 0x6A6470, 4), ceil: dkwMat("cave"), env: "cvguard", day: 0xFFE8C8 }, { d: 6, outName: "the cavern", y: -20 });
dkwCrowd(36080, lite ? 8 : 22, -70, -70, 70, 70, { dress: "dkrobe", dressF: "dkrobe", wander: 12, women: 0.5, ok: function (x, z) { var r = Math.hypot(x, z); return r < 80 && r > 8 && !(z > 60 && Math.abs(x) < 10); }, skins: [0x8A6A4A, 0xC8A880, 0x6A5A3A, 0xE0C8A8], names: ["A keeper of the Conclave's archive", "A novice of the Conclave", "An earth elemental at the long vigil", "A scribe of the five elements"], says: ["The Conclave sees and hears much.", "Walk softly: the columns are listening.", "The relics on these walls are older than the Sundering.", "Rest first. Whatever comes next, you'll need your strength."] });
dkcMotes(G, lite ? 50 : 160, 0, 0, 90, -18, 20, 0xFFE8C8);
},
function (G, a, b, seed, col) {
var R = wRand(seed), pts = [], n = 9;
for (var i = 0; i <= n; i++) {
var t = i / n;
pts.push(new THREE.Vector3(a[0] + (b[0] - a[0]) * t + (i && i < n ? (R() - 0.5) * 14 : 0), a[1] + (b[1] - a[1]) * t + (i && i < n ? (R() - 0.5) * 10 - Math.sin(t * Math.PI) * 8 : 0), a[2] + (b[2] - a[2]) * t + (i && i < n ? (R() - 0.5) * 14 : 0)));
}
var m = new THREE.MeshBasicMaterial({ color: col || 0xD8C8FF, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending });
m.userData.noPhoto = 1;
var curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.1), mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.35, 5, false), m);
G.add(mesh);
var hm = new THREE.MeshBasicMaterial({ color: col || 0x9A7AFF, transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending });
hm.userData.noPhoto = 1;
G.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 1.6, 5, false), hm));
DKCD.arcs.push({ m: m, h: hm, ph: R() * 6.28, sp: 0.35 + R() * 0.4 });
return mesh;
},
function (dt) {
if (DKW.sc !== "dallas" || !DKW.built)
return;
var t = DKW.t;
DKCD.arcs.forEach(function (a) { var v = 0.5 + 0.5 * Math.sin(t * a.sp + a.ph); a.m.opacity = 0.18 + 0.6 * v; a.h.opacity = 0.04 + 0.14 * v; });
if (DKCD.bank) {
DKCD.bank.offset.y = (DKCD.bank.offset.y + dt * 0.04) % 1;
DKCD.bank.offset.x = Math.sin(t * 0.3) * 0.04;
}
if (DKCD.pillar)
DKCD.pillar.forEach(function (p, i) { p.rotation.y += dt * (0.3 + i * 0.2); p.scale.x = p.scale.z = 1 + 0.06 * Math.sin(t * 1.2 + i); });
if (DKCD.fount)
DKCD.fount.material.color.setHSL((t * 0.05) % 1, 0.7, 0.6);
},
function () {
return dkwM("sootM", function () {
var t = dkwCanvas("soot", 256, 256, function (c, W, H) {
var R = wRand(3838);
c.fillStyle = "#1A1614";
c.fillRect(0, 0, W, H);
for (var i = 0; i < 260; i++) {
c.fillStyle = "rgba(" + (R() < 0.2 ? "90,70,50" : "8,6,6") + "," + (0.2 + R() * 0.4) + ")";
c.fillRect(R() * W, R() * H * 0.4, 2 + R() * 10, 20 + R() * 120);
}
for (i = 0; i < 40; i++) {
c.fillStyle = "rgba(200,190,170," + (0.05 + R() * 0.1) + ")";
c.fillRect(R() * W, H * 0.6 + R() * H * 0.4, 8 + R() * 30, 4 + R() * 20);
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
return new THREE.MeshStandardMaterial({ map: t, roughness: 0.95, metalness: 0.05 });
});
},
function (x, z) {
if (x > -100)
return 0;
var r = Math.hypot(x + 800, z), n = dkwFbm(x * 0.01, z * 0.01, 3);
var y = 190 * Math.exp(-(r / 360) * (r / 360)) + n * 8 - 6;
var pd = Math.hypot(x + 800, z + 392);
if (pd < 80) {
var b = Math.max(0, Math.min(1, (pd - 62) / 18));
y = 86 * (1 - b) + Math.min(86, y) * b;
}
var a = Math.atan2(z, x + 800);
if (a < 0.5 && a > -1.65) {
var t = (0.45 - a) / 2.05, pr = 372 - t * 52, py = 190 * Math.exp(-(pr / 360) * (pr / 360)) - 4;
if (Math.abs(r - pr) < 6)
y = py + (t > 0.92 ? (86 - py) * ((t - 0.92) / 0.08) : 0);
else if (Math.abs(r - pr) < 14) {
var k = (Math.abs(r - pr) - 6) / 8;
y = (py) * (1 - k) + y * k;
}
}
return Math.max(-2, y);
},
function () {
return dkwM("zemblem", function () {
var t = dkwCanvas("zembT", 256, 256, function (c, W, H) {
c.clearRect(0, 0, W, H);
c.lineWidth = 8;
c.strokeStyle = "#E8C86A";
c.beginPath();
c.arc(128, 128, 110, 0, 7);
c.stroke();
[["#8A5A2A", 0], ["#E8482A", 1], ["#3A8AE8", 2], ["#D8E8F0", 3], ["#9AE8FF", 4]].forEach(function (q) { var a = -Math.PI / 2 + q[1] * Math.PI * 2 / 5, x = 128 + Math.cos(a) * 64, y = 128 + Math.sin(a) * 64; c.fillStyle = q[0]; c.beginPath(); c.arc(x, y, 26, 0, 7); c.fill(); c.strokeStyle = "#E8C86A"; c.lineWidth = 3; c.stroke(); });
c.strokeStyle = "#E8C86A";
c.lineWidth = 3;
c.beginPath();
for (var k = 0; k <= 5; k++) {
var a = -Math.PI / 2 + (k * 2 % 5) * Math.PI * 2 / 5;
c[k ? "lineTo" : "moveTo"](128 + Math.cos(a) * 64, 128 + Math.sin(a) * 64);
}
c.stroke();
});
var m = new THREE.MeshLambertMaterial({ map: t, transparent: true, depthWrite: false });
m.userData.noPhoto = 1;
return m;
});
},
function (G, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var bronze = dkwShine(0xB8864A, 0.35, 0.8), brass = dkwMat("brass"), wood = dkwS("b:oak", 0x7A5030, 1.2), cloth = dkwLam(0xE8DCC0);
var env = new THREE.Mesh(dkwGeo("zenv", function () { var s = new THREE.SphereGeometry(1, 32, 16); s.scale(11, 11, 34); return s; }), dkwShine(0xC89A5A, 0.45, 0.55));
env.position.y = 26;
g.add(env);
for (var k = -5; k <= 5; k++) {
var rib = new THREE.Mesh(dkwGeo("zrib", function () { return new THREE.TorusGeometry(1, 0.02, 4, 40); }), bronze);
var zz = k * 5.6, rr = 11 * Math.sqrt(Math.max(0, 1 - (zz / 34) * (zz / 34)));
rib.scale.set(rr + 0.05, rr + 0.05, rr + 0.05);
rib.position.set(0, 26, zz);
g.add(rib);
}
[-1, 1].forEach(function (s) { var em = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), dkcZEmblem()); em.position.set(s * 11.02, 26, -4); em.rotation.y = s * Math.PI / 2; g.add(em); });
[[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(function (f) { var fin = dkwBox(g, f[0] ? 0.2 : 8, f[0] ? 8 : 0.2, 6, bronze, f[0] * 6, 26 + f[1] * 6 - (f[0] ? 4 : 0.1), 33); });
for (k = 0; k < 8; k++) {
[-1, 1].forEach(function (s) { var c = new THREE.Mesh(dkwGeo("zcable", function () { var cg = new THREE.CylinderGeometry(0.03, 0.03, 1, 4); cg.translate(0, 0.5, 0); return cg; }), dkwLam(0x3A3A3A)); var zz = -20 + k * 5.6, top = new THREE.Vector3(s * 7, 18.5, zz), bot = new THREE.Vector3(s * 5.8, 3.2, zz * 0.9); c.position.copy(bot); c.scale.y = top.distanceTo(bot); c.lookAt(top); c.rotateX(Math.PI / 2); g.add(c); });
}
dkwBox(g, 12, 0.4, 50, wood, 0, -0.4, 0);
dkwBox(g, 12.2, 0.2, 50.2, brass, 0, -0.6, 0);
var hull = new THREE.Mesh(dkwGeo("zhull", function () { var s = new THREE.CylinderGeometry(6, 4, 50, 16, 1, false, Math.PI / 2, Math.PI); s.rotateX(Math.PI / 2); s.scale(1, 0.5, 1); return s; }), wood);
hull.rotation.z = Math.PI;
hull.position.y = -0.5;
g.add(hull);
for (k = 0; k < 9; k++) {
[-1, 1].forEach(function (s) { var w = new THREE.Mesh(dkwGeo("zwin", function () { return new THREE.CircleGeometry(0.5, 14); }), dkwGlowM(0xFFE8B0, 0.9)); w.position.set(s * 5.4, -1.4, -16 + k * 4); w.rotation.y = s * Math.PI / 2; g.add(w); });
}
dkwBox(g, 8, 3.2, 22, dkwS("b:planks", 0x8A6040, 1.2), 0, 0, 7);
dkwBox(g, 8.4, 0.3, 22.4, brass, 0, 3.2, 7);
for (k = 0; k < 5; k++)
[-1, 1].forEach(function (s) { var w = new THREE.Mesh(dkwGeo("zwin2", function () { return new THREE.PlaneGeometry(1.2, 0.9); }), dkwGlowM(0xFFE0A0, 0.85)); w.position.set(s * 4.02, 2, -1 + k * 4); w.rotation.y = s * Math.PI / 2; g.add(w); });
var rail = [];
for (var zz2 = -24.6; zz2 <= 24.6; zz2 += 1.2) {
rail.push({ x: -5.8, z: zz2, y: 0, s: 1 });
rail.push({ x: 5.8, z: zz2, y: 0, s: 1 });
}
for (var xx = -5.8; xx <= 5.8; xx += 1.2) {
rail.push({ x: xx, z: -24.8, y: 0, s: 1 });
rail.push({ x: xx, z: 24.8, y: 0, s: 1 });
}
dkwInst(g, dkwGeo("zpost", function () { return new THREE.CylinderGeometry(0.04, 0.04, 1.1, 6).translate(0, 0.55, 0); }), brass, rail, {});
[[-5.8, 0, 0.06, 50], [5.8, 0, 0.06, 50], [0, -24.8, 11.6, 0.06], [0, 24.8, 11.6, 0.06]].forEach(function (q) { dkwBox(g, q[2], 0.08, q[3], brass, q[0], 1.08, q[1]); });
[-1, 1].forEach(function (s) { dkwBox(g, 6, 0.3, 0.4, bronze, s * 8.6, 1.2, 18); var pr = new THREE.Group(); pr.position.set(s * 11.6, 1.35, 18.3); g.add(pr); for (var b = 0; b < 3; b++) {
var bl = dkwBox(pr, 0.5, 3.4, 0.08, wood, 0, -1.7, 0);
bl.rotation.z = b * Math.PI * 2 / 3;
bl.position.set(Math.sin(b * Math.PI * 2 / 3) * 1.7, Math.cos(b * Math.PI * 2 / 3) * 1.7 - 1.7 + 1.7, 0);
} pr.userData.axis = "z"; pr.userData.sp = 4; DKW.spin.push(pr); });
var pr2 = new THREE.Group();
pr2.position.set(0, 26, 35);
g.add(pr2);
for (var b2 = 0; b2 < 4; b2++) {
var bl2 = dkwBox(pr2, 0.7, 5, 0.1, wood, 0, 0, 0);
bl2.rotation.z = b2 * Math.PI / 2;
}
pr2.userData.axis = "z";
pr2.userData.sp = 3;
DKW.spin.push(pr2);
if (o.deck) {
var wh = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.06, 6, 24), wood);
wh.position.set(0, 1.4, -9.6);
g.add(wh);
for (k = 0; k < 8; k++) {
var sp = dkwBox(g, 0.05, 0.9, 0.05, wood, 0, 1.4, -9.6);
sp.rotation.z = k * Math.PI / 4;
sp.position.y = 1.4;
}
dkwBox(g, 0.3, 1.2, 0.3, brass, 0, 0, -9.4);
for (k = 0; k < 4; k++) {
var cp = new THREE.Group();
cp.position.set(-2.6 + k * 1.7, 1.1, -11);
g.add(cp);
dkwCyl(cp, 0.3, 0.3, 0.1, brass, 0, 0, 0, 16);
var nd = dkwBox(cp, 0.04, 0.02, 0.5, dkwGlowM([0xFF6A6A, 0x6AE8FF, 0x8AFF8A, 0xFFE06A][k], 0.95), 0, 0.12, 0);
cp.userData.sp = 0.6 + k * 0.3;
DKW.spin.push(cp);
dkwBox(g, 0.2, 1.1, 0.2, brass, -2.6 + k * 1.7, 0, -11);
}
for (k = 0; k < 3; k++) {
var bar = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.9, 12), dkwGlowM(0xD8E8F0, 0.35));
bar.position.set(-4.6, 1.6, -8 + k * 0.6);
g.add(bar);
dkwSmoke(g, -4.6, 1.2, -8 + k * 0.6, 0xE8F0F8, 3);
}
var map = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.2), dkwM("zlivemap", function () {
var t = dkwCanvas("zmap", 256, 170, function (c, W, H) { c.fillStyle = "#0A2A3A"; c.fillRect(0, 0, W, H); c.strokeStyle = "#6AE8FF"; c.lineWidth = 2; for (var i = 0; i < 9; i++) {
c.beginPath();
c.moveTo(0, 10 + i * 18);
c.bezierCurveTo(80, i * 20, 160, 30 + i * 16, 256, 8 + i * 19);
c.stroke();
} c.fillStyle = "#FF8A3A"; c.beginPath(); c.arc(220, 30, 8, 0, 7); c.fill(); });
var m = new THREE.MeshBasicMaterial({ map: t });
m.userData.noPhoto = 1;
return m;
}));
map.rotation.x = -Math.PI / 2;
map.position.set(4, 1.02, -8);
g.add(map);
dkwBox(g, 2, 1, 1.4, wood, 4, 0, -8);
var tel = dkwCyl(g, 0.08, 0.12, 1.2, brass, -3, 1.2, -22, 10);
tel.rotation.x = 1.2;
dkwBox(g, 0.1, 1.2, 0.1, brass, -3, 0, -22);
var flag = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.4), dkcZEmblem());
flag.position.set(0, 4.6, 24);
g.add(flag);
dkwCyl(g, 0.06, 0.06, 5.4, brass, 0, 0, 24.6, 6);
[["The galley door", 0, -1.4], ["The cabin door", 1, 4], ["The door to the heart of the ship", 2, 9], ["The library nook", 3, 13], ["The hatch to the hold", 4, 16.4]].forEach(function (q, i) { var s = i % 2 ? 1 : -1; dkwBox(g, 0.08, 2.2, 1.2, dkwLam(0x4A2A14), s * 4.04, 0, q[2]); dkwSpot(x + s * 4.6, z + q[2], 1.4, q[0], "go in", function () { var A = dkwInAt("zephyr", q[1], 0, 4); dkwGo({ sc: "zephyr", x: A.x, z: A.z, y: A.y, ry: Math.PI }, null, typeof dkbPopulate === "function" ? dkbPopulate : null); }, y); });
dkwFloor(x, z, 12, 50, y);
[[x - 6, z, 0.3, 50], [x + 6, z, 0.3, 50], [x, z - 25, 12, 0.3], [x, z + 25, 12, 0.3]].forEach(function (q) { dkwSolid(q[0], q[1], q[2], q[3], y - 2, y + 1.3, 0); });
dkwSolid(x, z + 7, 8, 22, y - 1, y + 3.4, 0);
dkwSolid(x, z - 9.4, 1.6, 0.6, y - 1, y + 2, 0);
dkwSolid(x + 4, z - 8, 2, 1.4, y - 1, y + 1.2, 0);
}
return g;
},
function (P, s, seed) {
var g = new THREE.Group();
P.add(g);
var R = wRand(seed), m = new THREE.MeshPhongMaterial({ color: 0x8AB8FF, emissive: 0x2A4A8A, transparent: true, opacity: 0.42, shininess: 80, depthWrite: false });
m.userData.noPhoto = 1;
var body = new THREE.Mesh(dkwGeo("levb", function () { var b = new THREE.SphereGeometry(1, 20, 12); b.scale(3, 2.4, 10); return b; }), m);
g.add(body);
var tail = new THREE.Mesh(dkwGeo("levt", function () { var t = new THREE.ConeGeometry(2, 6, 10); t.rotateX(-Math.PI / 2); t.translate(0, 0, 12); return t; }), m);
g.add(tail);
var fl = new THREE.Mesh(dkwGeo("levf", function () { var f = new THREE.BoxGeometry(14, 0.2, 3); f.translate(0, 0, 15); return f; }), m);
g.add(fl);
[-1, 1].forEach(function (k) { var fin = new THREE.Mesh(dkwGeo("levfin", function () { var f = new THREE.BoxGeometry(6, 0.15, 2.4); return f; }), m); fin.position.set(k * 4, -1, -2); fin.rotation.z = k * 0.4; g.add(fin); });
var pts = [];
for (var i = 0; i < 60; i++) {
var u = R() * 6.28, v = R() * 3.14;
pts.push(Math.sin(v) * Math.cos(u) * 2.6, Math.cos(v) * 2, Math.sin(v) * Math.sin(u) * 9);
}
var pg = new THREE.BufferGeometry();
pg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
var pm = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.35, transparent: true, opacity: 0.95 });
pm.userData.noPhoto = 1;
g.add(new THREE.Points(pg, pm));
var eye = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), dkwGlowM(0xFFE8A8, 0.95));
eye.position.set(2.4, 0.6, -7.4);
g.add(eye);
var eye2 = eye.clone();
eye2.position.x = -2.4;
g.add(eye2);
g.scale.setScalar(s);
return g;
},
function (P, seed) {
var R = wRand(seed), pts = [];
for (var i = 0; i < 12; i++)
pts.push(new THREE.Vector3(Math.sin(i * 0.9) * 3, Math.cos(i * 0.7) * 1.5, i * 2.4));
var m = new THREE.MeshPhongMaterial({ color: 0x6AE8B8, emissive: 0x1A6A4A, shininess: 60 });
m.userData.noPhoto = 1;
var g = new THREE.Group();
g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.5, 8, false), m));
[-1, 1].forEach(function (k) { var w = new THREE.Mesh(dkwGeo("serw", function () { return new THREE.PlaneGeometry(4, 2); }), dkwGlowM(0xA8FFE8, 0.4)); w.material.side = THREE.DoubleSide; w.position.set(k * 2.2, 0.6, 4); w.rotation.z = k * 0.5; g.add(w); });
P.add(g);
return g;
},
function (kind) {
return dkwCanvas("zground" + kind, 512, 512, function (c, W, H) {
var R = wRand(kind.length * 7717);
var base = { plains: "#5A7A3A", water: "#5A5A4A", fire: "#1A1210" }[kind];
c.fillStyle = base;
c.fillRect(0, 0, W, H);
for (var i = 0; i < 900; i++) {
var x = R() * W, y = R() * H, r = 4 + R() * 26;
if (kind === "plains")
c.fillStyle = R() < 0.55 ? "rgba(30,60,26,.55)" : R() < 0.5 ? "rgba(170,160,70,.4)" : "rgba(110,140,60,.4)";
else if (kind === "water")
c.fillStyle = R() < 0.5 ? "rgba(70,70,58,.5)" : "rgba(110,104,84,.35)";
else
c.fillStyle = R() < 0.7 ? "rgba(10,8,8,.6)" : "rgba(70,40,30,.4)";
c.beginPath();
c.arc(x, y, r, 0, 7);
c.fill();
}
var river = function (col, w) { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); var x = R() * W; c.moveTo(x, 0); for (var y = 0; y <= H; y += 32) {
x += (R() - 0.5) * 60;
c.lineTo(x, y);
} c.stroke(); };
if (kind === "plains") {
river("#8AC8E8", 6);
river("#8AC8E8", 3);
}
if (kind === "water") {
river("#4A5A3A", 8);
river("#3A4A2A", 5);
for (i = 0; i < 20; i++) {
c.strokeStyle = "rgba(150,140,120,.6)";
c.lineWidth = 2;
c.strokeRect(R() * W, R() * H, 6 + R() * 12, 6 + R() * 12);
}
}
if (kind === "fire") {
c.shadowColor = "#FF6A1A";
c.shadowBlur = 12;
river("#FF7A2A", 7);
river("#FFB04A", 4);
river("#FF5A1A", 5);
c.shadowBlur = 0;
for (i = 0; i < 60; i++) {
c.fillStyle = ["#E8B83A", "#E84A2A", "#B86AE8"][i % 3];
c.fillRect(R() * W, R() * H, 2, 2);
}
}
});
},
function (dt) {
if (DKW.sc !== "zephyr" || !DKW.built)
return;
var t = DKW.t;
DKZ.flow.forEach(function (f) { if (f.g.visible === false)
return; f.g.position.z += f.sp * dt; if (f.g.position.z > f.z1)
f.g.position.z -= f.z1 - f.z0; if (f.bob)
f.g.position.y = f.y0 + Math.sin(t * 0.4 + f.ph) * f.bob; if (f.swim)
f.g.rotation.y = Math.sin(t * 0.2 + f.ph) * 0.15; });
DKZ.tex.forEach(function (x) { x.offset.y += dt * 0.006; });
if (DKZ.furn) {
var hum = DKW.zhum ? 1 : 0;
DKZ.hv = (DKZ.hv || 0) + (hum - (DKZ.hv || 0)) * Math.min(1, dt * 2);
var s = 1 + 0.08 * Math.sin(t * 2) + DKZ.hv * 0.25 * Math.sin(t * 5);
DKZ.furn.scale.setScalar(s);
DKZ.furn.material.color.setHSL(0.1 + DKZ.hv * 0.03, 1, 0.6 + DKZ.hv * 0.15);
}
if (!DKW.moving) {
var Lw = worldLocal(), S0 = DKW_SC.zephyr, lx = Lw.x - S0.x, feet = camera.position.y - 1.72;
if (Math.abs(lx - DKZ.sx) < 300 && feet < DKZ.dy - 20 && feet > -100)
dkwGo("zDeck", "🪢 The crew haul you back aboard", typeof dkbPopulate === "function" ? dkbPopulate : null);
}
},
function (G) {
var lite = dkwLite(), H = dkwZephH, R = wRand(39039), rock = dkwMat("rock");
dkwTerrain(G, -1500, -900, 1300, 1800, lite ? 24 : 12, H, dkwMat("grass"), function (x, z, y, c) { var n = dkwFbm(x * 0.03, z * 0.03, 2); if (y > 120) {
c.setRGB(0.5 + n * 0.06, 0.48 + n * 0.05, 0.46 + n * 0.05);
return;
} if (y > 60) {
c.setRGB(0.34 + n * 0.06, 0.42 + n * 0.06, 0.28 + n * 0.04);
return;
} c.setRGB(0.22 + n * 0.06, 0.38 + n * 0.08, 0.18 + n * 0.05); });
dkwStrip(G, dkcZPath(), 5, H, dkwS("b:strata", 0xB8A890, 2), 0.08);
dkwPlant(G, "tree", dkwScatter(39101, lite ? 60 : 180, -1500, -900, -200, 900, function (x, z) { return H(x, z) < 55 && Math.hypot(x + 800, z) > 420; }, H, 1, 1.8), { col: 0x2A4A22 });
dkwPlant(G, "tree", dkwScatter(39102, lite ? 14 : 40, -1250, -500, -350, 500, function (x, z) { var y = H(x, z); return y > 55 && y < 120 && Math.abs(Math.hypot(x + 800, z) - 350) > 30; }, H, 0.8, 1.2), { col: 0x1A3A1A, kind: "pine" });
dkwWater(G, -950, 700, 900, 40, 1, 0x4A8AB8, 0.85);
dkwWater(G, -1300, 0, 40, 1600, 1, 0x4A8AB8, 0.85);
(function () {
var A = DKW_AT.zDoor, y = H(A.x, A.z);
var g = new THREE.Group();
g.position.set(A.x - 8, y, A.z + 5);
g.rotation.y = -1.9;
G.add(g);
var st = dkwS("b:ashlar", 0x9A9088, 2);
dkwBox(g, 14, 12, 3, st, 0, -1, 0);
dkwBox(g, 5, 7, 0.4, dkwGlowM(0xC8B8FF, 0.5), 0, 0, 1.6);
for (var k = 0; k < 5; k++) {
var o = new THREE.Mesh(new THREE.SphereGeometry(0.4, 10, 8), dkwGlowM([0x8A5A2A, 0xE8482A, 0x3A8AE8, 0xD8E8F0, 0x9AE8FF][k], 0.95));
o.position.set(-4 + k * 2, 8.6, 1.8);
g.add(o);
}
dkwSpot(A.x - 6, A.z + 3, 3, "The Conclave's door", "go in", function () { var B = DKW_AT.vGuest; dkwGo({ sc: "conclave", x: B.x, z: B.z, y: B.y, ry: Math.PI }, null, typeof dkbPopulate === "function" ? dkbPopulate : null); }, y);
})();
[[-520, -160], [-700, -330], [-470, 30]].forEach(function (p) { var y = H(p[0], p[1]); var a = Math.atan2(p[1], p[0] + 800); var g = new THREE.Group(); g.position.set(p[0], y, p[1]); g.rotation.y = -a; G.add(g); dkwBox(g, 3, 14, 4, rock, 0, -1, -6); dkwBox(g, 3, 14, 4, rock, 0, -1, 6); var top = new THREE.Mesh(new THREE.TorusGeometry(6, 2, 8, 16, Math.PI), rock); top.position.y = 12; top.rotation.y = Math.PI / 2; g.add(top); dkwSolid(p[0] - Math.sin(a) * 6, p[1] + Math.cos(a) * 6, 4, 4, y - 2, y + 14, 0); dkwSolid(p[0] + Math.sin(a) * 6, p[1] - Math.cos(a) * 6, 4, 4, y - 2, y + 14, 0); });
[[-640, -300], [-430, -60]].forEach(function (p, i) {
var r = Math.hypot(p[0] + 800, p[1]), a = Math.atan2(p[1], p[0] + 800), fx = -800 + Math.cos(a) * (r - 24), fz = Math.sin(a) * (r - 24), y = H(fx, fz);
var fall = new THREE.Mesh(new THREE.PlaneGeometry(8, 40), dkwWaterM(0xD8F0FF, 0.7));
fall.position.set(fx, y + 16, fz);
fall.lookAt(p[0], y + 16, p[1]);
G.add(fall);
dkwSmoke(G, fx + Math.cos(a) * 4, y - 2, fz + Math.sin(a) * 4, 0xF0F8FF, 6);
var bow = new THREE.Mesh(new THREE.TorusGeometry(6, 0.3, 6, 24, Math.PI), dkwGlowM([0xFF8A8A, 0xFFE08A][i], 0.25));
bow.position.set(fx + Math.cos(a) * 6, y, fz + Math.sin(a) * 6);
bow.lookAt(p[0], y, p[1]);
G.add(bow);
});
(function () {
var A = DKW_AT.zField;
dkwBox(G, 120, 0.3, 0.3, dkwLam(0xE8C83A), A.x, 86.05, A.z - 56, 0);
for (var k = 0; k < 10; k++)
dkwBox(G, 1.2, 1.2, 1.2, dkwS("b:planks", 0x8A6A40, 1), A.x - 30 + (k % 5) * 1.4, 86, A.z + 10 + Math.floor(k / 5) * 1.4);
for (k = 0; k < 6; k++) {
dkwCyl(G, 0.5, 0.5, 1.4, dkwMat("brass"), A.x + 26 + (k % 3) * 1.2, 86, A.z + 8 + Math.floor(k / 3) * 1.2, 10);
}
dkwCyl(G, 0.3, 0.4, 14, dkwMat("iron"), A.x + 20, 86, A.z - 62, 8);
dkwCyl(G, 0.3, 0.4, 14, dkwMat("iron"), A.x - 20, 86, A.z - 62, 8);
var moored = dkcZephyr(G, A.x, 92, A.z - 80, {});
moored.rotation.y = Math.PI / 2;
dkwShow("moored", moored, true);
dkwSolid(A.x, A.z - 80, 60, 14, 80, 98, 0);
var gang = dkwBox(G, 2.2, 0.2, 16, dkwS("b:planks", 0x8A6A40, 1), A.x, 88.6, A.z - 36);
gang.rotation.x = -0.36;
})();
dkwCrowd(39010, lite ? 6 : 14, DKW_AT.zField.x - 40, DKW_AT.zField.z - 30, DKW_AT.zField.x + 40, DKW_AT.zField.z + 30, { dress: "dkwarden", dressF: "dkwardenf", wander: 8, women: 0.4, skins: [0xC8A880, 0x8A6A4A, 0xE8C8A8, 0x6A4A2A], names: ["An aeronaut checking the rigging", "A loader with a crate of supplies", "A rigger", "A pressure-valve hand"], says: ["Secure those lines, she says. They're secured. They were secured an hour ago.", "Three days to the Fire Lands, if the thermals are kind.", "Don't stand under the gondola when she lifts.", "Valve four's sticky. Valve four's always sticky."] });
var sx = DKZ.sx, dy = DKZ.dy;
var fly = dkcZephyr(G, sx, dy, 0, { deck: 1 });
dkwShow("flying", fly, false);
var grounds = {};
["plains", "water", "fire"].forEach(function (k) { var t = dkcZGround(k); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(6, 6); DKZ.tex.push(t); var m = new THREE.Mesh(new THREE.PlaneGeometry(6000, 6000), new THREE.MeshLambertMaterial({ map: t })); m.rotation.x = -Math.PI / 2; m.position.set(sx + 1000, -30 + (k === "plains" ? 0 : k === "water" ? 0.5 : 1), 0); G.add(m); grounds[k] = dkwShow("g" + k, m, k === "plains"); });
var clouds = new THREE.Group();
G.add(clouds);
var cm = dkwLam(0xFFFFFF, { op: 0.7 });
for (var k = 0; k < (lite ? 18 : 46); k++) {
var c = new THREE.Group();
for (var j = 0; j < 5; j++) {
var p = new THREE.Mesh(dkwGeo("zcloud", function () { return new THREE.IcosahedronGeometry(1, 1); }), cm);
p.scale.set(14 + R() * 16, 6 + R() * 5, 10 + R() * 12);
p.position.set((R() - 0.5) * 40, (R() - 0.5) * 6, (R() - 0.5) * 30);
c.add(p);
}
c.position.set(sx + (R() < 0.5 ? -1 : 1) * (60 + R() * 500), dy - 120 + R() * 200, -1600 + R() * 3200);
clouds.add(c);
dkcZFlow(c, 14, -1600, 1600, {});
}
dkwShow("clouds", clouds, true);
var beasts = new THREE.Group();
G.add(beasts);
for (k = 0; k < (lite ? 3 : 6); k++) {
var L = dkcLeviathan(beasts, 1.4 + R() * 1.4, 3900 + k);
L.position.set(sx + (k % 2 ? 1 : -1) * (70 + R() * 120), dy - 20 + R() * 60, -600 + k * 240);
dkcZFlow(L, 6 + R() * 3, -800, 800, { bob: 4, swim: 1 });
}
for (k = 0; k < (lite ? 2 : 5); k++) {
var S = dkcSerpent(beasts, 3950 + k);
S.position.set(sx + (k % 2 ? -1 : 1) * (40 + R() * 80), dy + 10 + R() * 50, -500 + k * 220);
dkcZFlow(S, 9, -800, 800, { bob: 6, swim: 1 });
}
dkwShow("skybeasts", beasts, false);
var sky = new THREE.Group();
G.add(sky);
for (k = 0; k < (lite ? 4 : 8); k++) {
var isl = new THREE.Group();
var cone = new THREE.Mesh(dkwGeo("skyisl", function () { var g = new THREE.ConeGeometry(30, 60, 10); g.rotateX(Math.PI); return g; }), rock);
cone.position.y = -30;
isl.add(cone);
dkwBox(isl, 52, 4, 52, dkwMat("grass"), 0, -4, 0);
for (j = 0; j < 7; j++) {
var tr = new THREE.Group();
tr.position.set((R() - 0.5) * 40, 0, (R() - 0.5) * 40);
isl.add(tr);
dkwCyl(tr, 0.4, 0.7, 8, dkwShine(0xD8DCE8, 0.3, 0.7), 0, 0, 0, 8);
var cr = new THREE.Mesh(dkwGeo("silvcrown", function () { return new THREE.IcosahedronGeometry(4, 1); }), dkwShine(0xE8F0FF, 0.2, 0.9));
cr.position.y = 10;
tr.add(cr);
}
var fall2 = new THREE.Mesh(new THREE.PlaneGeometry(4, 50), dkwWaterM(0xD8F0FF, 0.55));
fall2.position.set(20, -28, 10);
isl.add(fall2);
isl.scale.setScalar(0.6 + R() * 0.8);
isl.position.set(sx + (k % 2 ? 1 : -1) * (150 + R() * 400), dy - 60 + R() * 140, -1400 + k * 360);
sky.add(isl);
dkcZFlow(isl, 5, -1600, 1600, { bob: 3 });
}
dkwShow("skylands", sky, false);
var cry = new THREE.Group();
G.add(cry);
var cols = [0xB86AE8, 0x6AE8FF, 0xFFB0E8, 0xA8FFC8, 0xFFE08A];
for (k = 0; k < (lite ? 30 : 80); k++) {
var sh = new THREE.Mesh(dkwGeo("zshard", function () { var g = new THREE.OctahedronGeometry(1, 0); g.scale(1, 2.6, 1); return g; }), dkwShine(cols[k % 5], 0.05, 0.3));
sh.material = sh.material.clone();
sh.material.transparent = true;
sh.material.opacity = 0.8;
sh.material.emissive = new THREE.Color(cols[k % 5]);
sh.material.emissiveIntensity = 0.35;
sh.material.userData.noPhoto = 1;
sh.scale.setScalar(1 + R() * (R() < 0.2 ? 14 : 4));
sh.rotation.set(R() * 3, R() * 3, R() * 3);
var hold = new THREE.Group();
hold.add(sh);
var side = (R() < 0.5 ? -1 : 1);
hold.position.set(sx + side * (16 + R() * 300), dy - 80 + R() * 160, -1500 + R() * 3000);
cry.add(hold);
dkcZFlow(hold, 7, -1500, 1500, { bob: 2 });
}
var viv = new THREE.Group();
var vs = new THREE.Mesh(dkwGeo("zshard", function () { var g = new THREE.OctahedronGeometry(1, 0); g.scale(1, 2.6, 1); return g; }), dkwGlowM(0xFFD86A, 0.55));
vs.scale.setScalar(3);
viv.add(vs);
var vimg = new THREE.Mesh(new THREE.PlaneGeometry(3, 4), dkwM("vivinc", function () {
var t = dkwCanvas("vivincT", 128, 160, function (c, W, Hh) { c.clearRect(0, 0, W, Hh); c.fillStyle = "rgba(255,220,140,.9)"; c.beginPath(); c.ellipse(64, 60, 22, 30, 0, 0, 7); c.fill(); c.beginPath(); c.ellipse(64, 150, 40, 40, 0, Math.PI, 0); c.fill(); c.fillStyle = "#E8A81A"; c.beginPath(); c.arc(56, 56, 3, 0, 7); c.fill(); c.beginPath(); c.arc(72, 56, 3, 0, 7); c.fill(); });
var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, side: THREE.DoubleSide });
m.userData.noPhoto = 1;
return m;
}));
viv.add(vimg);
viv.position.set(sx - 14, dy + 2, -60);
cry.add(viv);
dkwShow("vivcrystal", viv, false);
dkwShow("crystals", cry, false);
var wat = new THREE.Group();
G.add(wat);
(function () {
var town = new THREE.Group();
town.position.set(sx - 60, -29, -400);
wat.add(town);
var st = dkwS("b:limestone", 0xB8B0A0, 2);
dkwCyl(town, 14, 15, 2, st, 0, 0, 0, 24);
var dry = new THREE.Mesh(new THREE.CircleGeometry(13, 24), dkwLam(0x5A5444));
dry.rotation.x = -Math.PI / 2;
dry.position.y = 2.05;
town.add(dry);
for (var k = 0; k < 4; k++) {
var a = k * Math.PI / 2;
var mer = new THREE.Group();
mer.position.set(Math.cos(a) * 9, 2, Math.sin(a) * 9);
town.add(mer);
dkwCyl(mer, 0.8, 1.2, 4, st, 0, 0, 0, 10);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.9, 10, 8), st);
hd.position.y = 4.8;
mer.add(hd);
}
for (k = 0; k < 22; k++) {
var a2 = k / 22 * Math.PI * 2, r = 40 + (k % 3) * 18;
dkwBox(town, 10, 8 + (k % 4) * 3, 8, dkwS("b:stucco", 0x9A9088, 2), Math.cos(a2) * r, 0, Math.sin(a2) * r, a2);
}
dkwStrip(town, [[-200, 30], [-60, 20], [0, 60], [120, 40], [260, 60]], 10, null, dkwLam(0x3A4A2A), 2.1);
var lake = new THREE.Group();
lake.position.set(sx + 120, -29, -1100);
wat.add(lake);
var lw = new THREE.Mesh(new THREE.CircleGeometry(60, 32), dkwWaterM(0x4A6A5A, 0.9));
lw.rotation.x = -Math.PI / 2;
lw.position.y = 0.5;
lake.add(lw);
var dev = new THREE.Group();
lake.add(dev);
dkwCyl(dev, 3, 3, 40, dkwShine(0xC8D0E0, 0.2, 0.9), 0, 0, 0, 16);
dkwCyl(dev, 0.6, 0.6, 20, dkwShine(0xC8D0E0, 0.2, 0.9), 0, -14, 0, 8);
var fluid = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 24, 16), dkwGlowM(0x6AE8FF, 0.7));
fluid.position.y = 14;
dev.add(fluid);
for (var j = 0; j < 3; j++) {
var leg = dkwBox(dev, 0.6, 46, 0.6, dkwMat("iron"), Math.cos(j * 2.1) * 18, 0, Math.sin(j * 2.1) * 18);
leg.rotation.set(Math.sin(j * 2.1) * 0.35, 0, -Math.cos(j * 2.1) * 0.35);
}
for (j = 0; j < 12; j++) {
var op = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 2, 6), dkwLam(0x8AA8D8));
op.position.set(Math.cos(j * 0.52) * 64, 1, Math.sin(j * 0.52) * 64);
lake.add(op);
}
dkwSmoke(lake, 0, 0, 0, 0xB8E8F0, 6);
dkcZFlow(town, 18, -1800, 1200, {});
dkcZFlow(lake, 18, -1800, 1200, {});
})();
dkwShow("waterland", wat, false);
var fire = new THREE.Group();
G.add(fire);
(function () {
var ig = new THREE.Group();
ig.position.set(sx, -30, -2600);
fire.add(ig);
var vm = dkwS("b:cave", 0x2A1E1A, 4);
var cone = new THREE.Mesh(new THREE.ConeGeometry(520, 620, 24, 1, true), vm);
cone.position.y = 310;
ig.add(cone);
var crown = new THREE.Mesh(new THREE.ConeGeometry(70, 160, 16, 1, true), dkwGlowM(0xFF6A1A, 0.6));
crown.position.y = 660;
crown.material.side = THREE.DoubleSide;
ig.add(crown);
dkwSmoke(ig, 0, 640, 0, 0x3A3030, 8);
var lav = new THREE.Mesh(new THREE.PlaneGeometry(14, 600), dkwGlowM(0xFF5A1A, 0.85));
lav.position.set(80, 300, 252);
lav.rotation.x = -0.7;
ig.add(lav);
[[-900, -1800], [1100, -2000]].forEach(function (p) { var v = new THREE.Mesh(new THREE.ConeGeometry(220, 300, 16, 1, true), vm); v.position.set(p[0], 120, p[1]); fire.add(v); dkwSmoke(fire, p[0], 260, p[1], 0x2A2020, 6); });
})();
dkwShow("firelands", fire, false);
var stars = new THREE.Group();
G.add(stars);
(function () { var pts = []; for (var i = 0; i < (lite ? 400 : 1200); i++) {
var u = R() * 6.28, v = R() * 1.4;
pts.push(sx + Math.cos(u) * Math.cos(v) * 2400, dy + Math.sin(v) * 2400, Math.sin(u) * Math.cos(v) * 2400);
} var g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3)); var m = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 5, sizeAttenuation: true }); m.userData.noPhoto = 1; stars.add(new THREE.Points(g, m)); })();
dkwShow("zstars", stars, false);
(DKW.stateFns = DKW.stateFns || []).push(function (st, V) { DKW.zhum = !!V(st.zhum); });
dkwCrowd(39011, lite ? 3 : 6, sx - 4, -16, sx + 4, 20, { dress: "dkwarden", dressF: "dkwardenf", feet: dy + 1, wander: 3, women: 0.5, ok: function (x, z) { return Math.abs(x - sx) > 4.6 || z < -4 || z > 18; }, skins: [0xC8A880, 0x8A6A4A, 0xE8C8A8], names: ["A rigger of the Zephyr's Flame", "A lookout", "A deckhand coiling rope"], says: ["Thermal pocket on the port bow. Hold on to something.", "Sky-beasts, two points to starboard. Don't wave, they don't like it.", "Captain's in a mood. Captain's always in a mood."] });
var wood = dkwS("b:oak", 0x7A5030, 1.2), plank = dkwS("b:planks", 0x8A6040, 1.4);
var port = function (P, W, D, n, side) { for (var k = 0; k < n; k++) {
var w = new THREE.Mesh(dkwGeo("zport", function () { return new THREE.CircleGeometry(0.42, 16); }), dkwGlowM(0xC8E0F8, 0.92));
var zz = -D / 2 + D * (k + 0.5) / n;
w.position.set(side * (W / 2 - 0.06), 1.7, zz);
w.rotation.y = -side * Math.PI / 2;
P.add(w);
var rim = new THREE.Mesh(dkwGeo("zrim", function () { return new THREE.TorusGeometry(0.46, 0.06, 6, 16); }), dkwMat("brass"));
rim.position.copy(w.position);
rim.rotation.y = w.rotation.y + Math.PI / 2;
rim.rotateY(Math.PI / 2);
P.add(rim);
} };
var Ga = dkwRoomBuild(G, "zephyr", 0, 10, 9, 2.8, { wall: plank, floor: wood, ceil: wood, env: "zcabin", out: { x: sx - 4.8, z: -1.4, ry: -Math.PI / 2 }, doorName: "The door, up to the deck", day: 0xC8E0F8 });
port(Ga, 10, 9, 3, -1);
port(Ga, 10, 9, 3, 1);
dkwBox(Ga, 5, 0.9, 1.6, wood, 0, 0, -1);
for (var k = 0; k < 6; k++)
dkwBox(Ga, 0.5, 0.45, 0.5, wood, -2 + (k % 3) * 2, 0, -1 + (k < 3 ? -1.3 : 1.3));
for (k = 0; k < 6; k++) {
var bw = new THREE.Mesh(dkwGeo("zbowl", function () { return new THREE.SphereGeometry(0.18, 10, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); }), wood);
bw.position.set(-2 + (k % 3) * 2, 1.1, -1 + (k < 3 ? -0.5 : 0.5));
Ga.add(bw);
}
dkwBox(Ga, 3, 0.9, 0.8, dkwMat("iron"), -3, 0, -4);
var pot = dkwCyl(Ga, 0.4, 0.35, 0.5, dkwMat("iron"), -3.4, 0.9, -4, 12);
dkwSmoke(Ga, -3.4, 1.4, -4, 0xE8E0D8, 4);
dkwFire(Ga, -2.2, 0.9, -4, 0.3);
for (k = 0; k < 4; k++) {
var ln = new THREE.Mesh(dkwGeo("zlant", function () { return new THREE.SphereGeometry(0.16, 8, 6); }), dkwGlowM(0x6AB8FF, 0.9));
ln.position.set(-3 + k * 2, 2.3, 1.6);
Ga.add(ln);
dkwShow("bluelant" + k, ln, false);
}
var Cb = dkwRoomBuild(G, "zephyr", 1, 12, 10, 3, { wall: plank, floor: wood, ceil: wood, env: "zcabin", out: { x: sx + 4.8, z: 4, ry: Math.PI / 2 }, doorName: "The door, up to the deck", day: 0xC8E0F8 });
port(Cb, 12, 10, 4, -1);
port(Cb, 12, 10, 4, 1);
for (k = 0; k < 6; k++) {
var hx = -4 + (k % 3) * 4, hz = -3 + Math.floor(k / 3) * 3.4;
var hm = new THREE.Mesh(dkwGeo("zhamm", function () { var g = new THREE.CylinderGeometry(0.5, 0.5, 2.4, 10, 1, true, 0, Math.PI); g.rotateZ(Math.PI / 2); g.rotateX(Math.PI / 2); return g; }), dkwLam(0xD8C8A0, { ds: 1 }));
hm.rotation.y = Math.PI / 2;
hm.position.set(hx, 1.3, hz);
Cb.add(hm);
dkwCyl(Cb, 0.03, 0.03, 1.4, dkwLam(0x5A4A3A), hx - 1.25, 1.4, hz, 4);
dkwCyl(Cb, 0.03, 0.03, 1.4, dkwLam(0x5A4A3A), hx + 1.25, 1.4, hz, 4);
}
var Ht = dkwRoomBuild(G, "zephyr", 2, 10, 9, 3.6, { wall: dkwS("b:iron", 0x6A5A4A, 1.2), floor: dkwS("b:iron", 0x4A3A2A, 1.2), ceil: dkwS("b:iron", 0x3A2A1A, 1.2), env: "zcabin", out: { x: sx - 4.8, z: 9, ry: -Math.PI / 2 }, doorName: "The door, up to the deck", day: 0xFFB060 });
(function () {
var f = new THREE.Group();
f.position.set(0, 0, -2.4);
Ht.add(f);
dkwCyl(f, 1.6, 1.8, 2.8, dkwShine(0x3A2A1A, 0.4, 0.9), 0, 0, 0, 18);
for (var k = 0; k < 12; k++) {
var rn = new THREE.Mesh(dkwGeo("zrune", function () { return new THREE.PlaneGeometry(0.3, 0.4); }), dkwGlowM(0xFF8A3A, 0.9));
var a = k / 12 * Math.PI * 2;
rn.position.set(Math.sin(a) * 1.72, 1.6, Math.cos(a) * 1.72);
rn.rotation.y = a;
f.add(rn);
}
var vp = new THREE.Mesh(new THREE.CircleGeometry(0.5, 16), dkwGlowM(0xFFF0C0, 0.95));
vp.position.set(0, 1.4, 1.82);
f.add(vp);
var sun = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), new THREE.MeshBasicMaterial({ color: 0xFFD86A }));
sun.material.userData.noPhoto = 1;
sun.position.set(0, 1.4, 1.5);
f.add(sun);
DKZ.furn = sun;
dkwCyl(f, 0.3, 0.3, 1.4, dkwMat("brass"), 0, 2.8, 0, 10);
})();
for (k = 0; k < 6; k++)
dkwCyl(Ht, 0.12, 0.12, 3.6, dkwMat("brass"), -4.6, 0, -4 + k * 1.6, 8);
dkwBox(Ht, 2, 1, 1, dkwMat("iron"), 3.6, 0, -3);
var Lb = dkwRoomBuild(G, "zephyr", 3, 7, 6, 2.6, { wall: plank, floor: wood, ceil: wood, env: "zcabin", out: { x: sx + 4.8, z: 13, ry: Math.PI / 2 }, doorName: "The door, up to the deck", day: 0xC8E0F8 });
dkwShelves(Lb, -3.2, 0, 4, 2, Math.PI / 2);
dkwShelves(Lb, 3.2, 0, 4, 2, -Math.PI / 2);
dkwBox(Lb, 1.8, 0.8, 1, wood, 0, 0, -1.4);
var ml = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), dkwGlowM(0xD8F0FF, 0.95));
ml.position.set(0.5, 1.2, -1.4);
Lb.add(ml);
var bk = dkwBox(Lb, 0.5, 0.06, 0.36, dkwLam(0xE8DCC0), -0.2, 0.8, -1.4);
var Hd = dkwRoomBuild(G, "zephyr", 4, 12, 10, 2.6, { wall: plank, floor: plank, ceil: wood, env: "zcabin", out: { x: sx - 4.8, z: 16.4, ry: -Math.PI / 2 }, doorName: "The ladder, up to the deck", day: 0xC8E0F8 });
for (k = 0; k < 14; k++)
dkwBox(Hd, 1, 1, 1, dkwS("b:planks", 0x8A6A40, 1), -5 + (k % 4) * 1.1, (k >= 8 ? 1 : 0), -4 + Math.floor((k % 8) / 4) * 1.1);
for (k = 0; k < 2; k++) {
dkwBox(Hd, 2, 0.25, 0.9, dkwLam(0xC8B898), 1.4 + k * 1.6, 0, -2);
}
},
function (x, z) {
var n = dkwFbm(x * 0.012, z * 0.012, 4), r = Math.hypot(x, z + 1000);
var y = n * 7 + 260 * Math.exp(-(r / 430) * (r / 430));
if (z > 640)
y += (z - 640) * 0.04;
var pz = dkcFirePathX(z);
if (Math.abs(x - pz) < 6)
y = y * 0.5 + (n * 2 + 260 * Math.exp(-(r / 430) * (r / 430))) * 0.5;
if (z < -520 && z > -600 && Math.abs(x) < 40) {
var t = Math.max(0, Math.min(1, (Math.abs(x) - 28) / 12));
var yd = 260 * Math.exp(-(440 / 430) * (440 / 430));
y = yd * (1 - t) + y * t;
}
return y;
},
function (dt) {
if (DKW.sc !== "firelands" || !DKW.built)
return;
var t = DKW.t;
DKF.geys.forEach(function (g) { var c = ((t + g.userData.ph) % 14) / 14, v = c < 0.25 ? c / 0.25 : c < 0.5 ? 1 : Math.max(0, 1 - (c - 0.5) / 0.3); g.scale.set(1, 0.05 + v, 1); g.material.opacity = 0.55 * v; });
if (DKF.ash) {
var p = DKF.ash.geometry.attributes.position;
for (var i = 0; i < p.count; i++) {
var y = p.getY(i) - dt * 2.2;
if (y < 0)
y += 60;
p.setY(i, y);
}
p.needsUpdate = true;
try {
var Lw = worldLocal();
DKF.ash.position.set(Lw.x - DKW_SC.firelands.x, camera.position.y - 30, Lw.z);
}
catch (e) { }
}
if (DKW.moving || DKW.ride)
return;
var Lw = worldLocal(), lx = Lw.x - DKW_SC.firelands.x, lz = Lw.z, feet = camera.position.y - 1.72;
if (feet < -500)
return;
var hot = false;
for (var k = 0; k < DKF.lava.length; k++) {
var L = DKF.lava[k];
if (L.off)
continue;
if (Math.hypot(lx - L.x, lz - L.z) < L.r && feet < dkwFireH(lx, lz) + 1.5) {
hot = true;
break;
}
}
DKF.t += dt;
if (!hot) {
if (DKF.t > 1) {
DKF.t = 0;
DKF.safe = { x: lx, z: lz };
}
return;
}
var S = DKF.safe || { x: 0, z: 600 };
dkwGo({ sc: "firelands", x: S.x, z: S.z }, "🔥 <b>Too hot!</b> You leap back to safe ground.", null);
},
function (G) {
var lite = dkwLite(), H = dkwFireH, R = wRand(42042), basalt = dkwS("b:cave", 0x2A2420, 4), obs = dkwShine(0x0E0C10, 0.15, 0.6);
dkwTerrain(G, -1100, -1300, 2200, 2400, lite ? 24 : 12, H, dkwMat("rock"), function (x, z, y, c) { var n = dkwFbm(x * 0.05, z * 0.05, 2); if (z > 640) {
c.setRGB(0.2 + n * 0.05, 0.36 + n * 0.08, 0.16 + n * 0.04);
return;
} c.setRGB(0.12 + n * 0.06, 0.1 + n * 0.05, 0.09 + n * 0.04); });
dkwStrip(G, dkcFirePath(), 4, H, dkwS("b:strata", 0x5A4A40, 2), 0.08);
dkwPlant(G, "tree", dkwScatter(42101, lite ? 40 : 120, -900, 650, 900, 1100, null, H, 1.1, 1.8), { col: 0x2A5A22, kind: "pine" });
dkwWater(G, 0, 900, 1800, 30, H(0, 900) + 0.6, 0x4A8AB8, 0.8);
var lavaM = dkwM("lavaM", function () { var t = dkwCanvas("lavaT", 256, 256, function (c, W, Hh) { var Rr = wRand(77); c.fillStyle = "#FF5A1A"; c.fillRect(0, 0, W, Hh); for (var i = 0; i < 200; i++) {
c.fillStyle = ["#FFB03A", "#C82A0A", "#FFE07A", "#3A0A04"][i % 4];
c.globalAlpha = 0.5;
c.beginPath();
c.arc(Rr() * W, Rr() * Hh, 4 + Rr() * 18, 0, 7);
c.fill();
} }); t.wrapS = t.wrapT = THREE.RepeatWrapping; var m = new THREE.MeshBasicMaterial({ map: t }); m.userData.noPhoto = 1; return m; });
[-1, 1].forEach(function (s) { var P = dkcLavaFlow(s); dkwStrip(G, P, 9, H, lavaM, 0.25); P.forEach(function (p, i) { if (i % 2 === 0)
DKF.lava.push({ x: p[0], z: p[1], r: 5 }); }); });
var riv = [];
for (var x = -900; x <= 900; x += 12)
riv.push([x, 140 + Math.sin(x / 60) * 12]);
dkwStrip(G, riv, 12, H, lavaM, 0.25);
riv.forEach(function (p) { if (Math.abs(p[0] - dkcFirePathX(p[1])) > 9)
DKF.lava.push({ x: p[0], z: p[1], r: 6.5 }); });
(function () { var bx = dkcFirePathX(140); dkwBox(G, 10, 2, 22, basalt, bx, H(bx, 140) - 0.6, 140); dkwFloor(bx, 140, 8, 22, H(bx, 140) + 1.3); })();
for (var k = 0; k < (lite ? 14 : 34); k++) {
var px = -600 + R() * 1200, pz = -500 + R() * 1050;
if (Math.abs(px - dkcFirePathX(pz)) < 22)
continue;
var r = 3 + R() * 8;
var pool = new THREE.Mesh(new THREE.CircleGeometry(r, 18), lavaM);
pool.rotation.x = -Math.PI / 2;
pool.position.set(px, H(px, pz) + 0.2, pz);
G.add(pool);
DKF.lava.push({ x: px, z: pz, r: r });
}
(function () {
var A = DKW_AT.fCrust, cx = A.x - 6, cz = A.z - 2;
var pool = new THREE.Mesh(new THREE.CircleGeometry(3, 18), lavaM);
pool.rotation.x = -Math.PI / 2;
pool.position.set(cx, H(cx, cz) + 0.15, cz);
G.add(pool);
var cr = new THREE.Mesh(new THREE.CircleGeometry(3.2, 18), basalt);
cr.rotation.x = -Math.PI / 2;
cr.position.set(cx, H(cx, cz) + 0.3, cz);
G.add(cr);
dkwShow("crust", cr, true);
var B = DKW_AT.fSink, sk = new THREE.Mesh(new THREE.CircleGeometry(4, 18), dkwGlowM(0xFF8A4A, 0.45));
sk.rotation.x = -Math.PI / 2;
sk.position.set(B.x + 8, H(B.x + 8, B.z) + 0.2, B.z);
G.add(sk);
DKF.lava.push({ x: B.x + 8, z: B.z, r: 3.6 });
})();
var glows = [[0, -300], [-60, 140], [60, 140], [0, -500], [200, 0], [-260, -200]];
glows.forEach(function (p) { var l = new THREE.PointLight(0xFF6A2A, lite ? 0.6 : 1.0, 140, 1.6); l.position.set(p[0], H(p[0], p[1]) + 6, p[1]); G.add(l); });
for (k = 0; k < 8; k++) {
var gx = (k % 2 ? 1 : -1) * (20 + R() * 90), gz = 560 - k * 120;
var gm = new THREE.MeshBasicMaterial({ color: 0xF0F0F0, transparent: true, opacity: 0.4, depthWrite: false });
gm.userData.noPhoto = 1;
var gy = new THREE.Mesh(dkwGeo("geyser", function () { var c = new THREE.CylinderGeometry(3, 1, 30, 10, 1, true); c.translate(0, 15, 0); return c; }), gm);
gy.position.set(gx, H(gx, gz), gz);
gy.userData.ph = k * 1.7;
G.add(gy);
DKF.geys.push(gy);
var vent = new THREE.Mesh(new THREE.CircleGeometry(1.2, 10), dkwLam(0x0A0806));
vent.rotation.x = -Math.PI / 2;
vent.position.set(gx, H(gx, gz) + 0.1, gz);
G.add(vent);
}
for (k = 0; k < (lite ? 40 : 110); k++) {
var rx = -700 + R() * 1400, rz = -600 + R() * 1200;
if (Math.abs(rx - dkcFirePathX(rz)) < 10)
continue;
var rk = new THREE.Mesh(dkwGeo("frock" + (k % 4), function () { return new THREE.DodecahedronGeometry(1, 0); }), k % 3 ? basalt : obs);
rk.scale.set(1 + R() * 4, 0.6 + R() * 3, 1 + R() * 4);
rk.rotation.y = R() * 6;
rk.position.set(rx, H(rx, rz), rz);
G.add(rk);
}
(function () { var A = DKW_AT.fRidge; var rg = new THREE.Mesh(new THREE.ConeGeometry(18, 46, 5), obs); rg.position.set(A.x + 18, H(A.x + 18, A.z - 10) + 18, A.z - 10); rg.rotation.z = 0.5; G.add(rg); dkwSolid(A.x + 18, A.z - 10, 22, 22, -50, 80, 0); })();
(function () {
var A = DKW_AT.fCaveOut;
var f = new THREE.Mesh(new THREE.ConeGeometry(30, 70, 6), obs);
f.position.set(A.x - 26, H(A.x - 26, A.z - 4) + 30, A.z - 4);
G.add(f);
dkwSolid(A.x - 26, A.z - 4, 40, 40, -50, 100, 0);
var mouth = new THREE.Mesh(new THREE.CircleGeometry(4, 12, 0, Math.PI), dkwLam(0x020202));
mouth.position.set(A.x - 6.5, H(A.x - 6, A.z), A.z);
mouth.rotation.y = Math.PI / 2;
G.add(mouth);
dkwDoorTo(G, "firelands", 0, A.x - 6, A.z, Math.PI / 2, "The mouth of the cave", 14, 12, { col: 0x050505, frame: obs });
})();
(function () {
var pts = [];
for (var k = 0; k < (lite ? 40 : 120); k++) {
var a = R() * 6.28, r = R() * 14;
var A = DKW_AT.fLilies;
pts.push({ x: A.x - 6 + Math.cos(a) * r, z: A.z + Math.sin(a) * r });
}
for (k = 0; k < (lite ? 40 : 140); k++) {
var z = -500 + R() * 1000, x = dkcFirePathX(z) + (R() < 0.5 ? -1 : 1) * (6 + R() * 20);
pts.push({ x: x, z: z });
}
pts.forEach(function (p, i) { var f = new THREE.Mesh(dkwGeo("flily", function () { var g = new THREE.ConeGeometry(0.25, 0.5, 6, 1, true); g.rotateX(Math.PI); g.translate(0, 0.6, 0); return g; }), dkwGlowM(i % 5 ? 0xFF2A2A : 0xFF8A2A, 0.95)); f.position.set(p.x, H(p.x, p.z), p.z); G.add(f); });
})();
(function () {
var crown = new THREE.Mesh(new THREE.ConeGeometry(60, 140, 16, 1, true), dkwGlowM(0xFF6A1A, 0.5));
crown.material.side = THREE.DoubleSide;
crown.position.set(0, H(0, -1000) + 60, -1000);
G.add(crown);
dkwSmoke(G, 0, H(0, -1000) + 80, -1000, 0x2A2020, 9);
var A = DKW_AT.fDoors, y = H(0, -560), g = new THREE.Group();
g.position.set(0, y, -566);
G.add(g);
var st = dkwS("b:ashlar", 0x4A3A30, 2);
dkwBox(g, 22, 10, 4, st, 0, -1, -1);
var lintel = dkwBox(g, 24, 2, 5, st, 0, 8.6, -1);
[-1, 1].forEach(function (s) { dkwBox(g, 2.4, 10, 5, st, s * 11, -1, -1); });
var leaves = new THREE.Group();
g.add(leaves);
[-1, 1].forEach(function (s) { var lf = dkwBox(leaves, 8.6, 8.4, 0.8, dkwS("b:ashlar", 0x5A4A3A, 1.6), s * 4.4, 0, 1.4); for (var r = 0; r < 5; r++) {
var rn = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), dkcEtchM("frune" + r, function (c, W, Hh) { c.clearRect(0, 0, W, Hh); c.strokeStyle = "#FFB04A"; c.lineWidth = 10; c.beginPath(); c.moveTo(W * 0.2, Hh * 0.8); c.lineTo(W * 0.5, Hh * 0.2); c.lineTo(W * 0.8, Hh * 0.8); c.moveTo(W * 0.3, Hh * 0.55); c.lineTo(W * 0.7, Hh * 0.55); c.stroke(); }, 0.3));
rn.position.set(s * 4.4 + (r - 2) * 1.4, 6.8, 1.82);
leaves.add(rn);
} });
var sockets = new THREE.Group();
g.add(sockets);
var cold = new THREE.Group();
g.add(cold);
for (var k = 0; k < 24; k++) {
var sx = -8 + (k % 6) * 3.2, sy = 1 + Math.floor(k / 6) * 1.5;
var sc = new THREE.Mesh(dkwGeo("fsock", function () { return new THREE.CircleGeometry(0.28, 12); }), dkwGlowM(0xFFC84A, 0.95));
sc.position.set(sx, sy, 1.84);
sockets.add(sc);
var cs = new THREE.Mesh(dkwGeo("fsock", function () { return new THREE.CircleGeometry(0.28, 12); }), dkwLam(0x1A1210));
cs.position.set(sx, sy, 1.83);
cold.add(cs);
}
for (k = 0; k < 6; k++) {
dkwBox(g, 0.14, 8, 0.14, dkwMat("brass"), -8 + k * 3.2, 0, 1.9);
}
dkwShow("embers", sockets, false);
dkwShow("embercold", cold, true);
dkwShow("fdoorsclosed", leaves, true);
var dark = new THREE.Mesh(new THREE.PlaneGeometry(17, 8.4), dkwLam(0x0A0604));
dark.position.set(0, 4.2, 0.4);
g.add(dark);
var glowin = new THREE.Mesh(new THREE.PlaneGeometry(4, 6), dkwGlowM(0xFFB04A, 0.4));
glowin.position.set(0, 3, 0.5);
g.add(glowin);
dkwShow("fdoorglow", glowin, false);
var S = dkwSolid(0, -564.6, 18, 1.6, y - 2, y + 9, 0);
S.show = "fdoorsclosed";
S.showDef = true;
dkwSolid(-14, -566, 6, 6, y - 2, y + 12, 0);
dkwSolid(14, -566, 6, 6, y - 2, y + 12, 0);
dkwSpot(0, -563, 2.4, "Through the doors, into the mountain", "go in", function () { if (DKW.shows.fdoorsclosed && DKW.shows.fdoorsclosed.visible) {
worldPrompt && worldPrompt("The doors are sealed. Only true dragon fire can open them.");
return;
} dkwGo("fHallway", null, typeof dkbPopulate === "function" ? dkbPopulate : null); }, y);
})();
(function () { var pts = []; for (var i = 0; i < (lite ? 300 : 900); i++)
pts.push((R() - 0.5) * 120, R() * 60, (R() - 0.5) * 120); var g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3)); var m = new THREE.PointsMaterial({ color: 0xB8B0A8, size: 0.18, transparent: true, opacity: 0.8 }); m.userData.noPhoto = 1; DKF.ash = new THREE.Points(g, m); G.add(DKF.ash); })();
dkwCrowd(42050, lite ? 4 : 10, -300, -300, 300, 500, { dress: "dkdrakkyn", dressF: "dkdrakkyn", wander: 10, ok: function (x, z) { return Math.abs(x - dkcFirePathX(z)) > 30 && Math.abs(x - dkcFirePathX(z)) < 160; }, skins: [0x8A3A1A, 0xC85A2A, 0x6A2A1A], names: ["A fire-folk pilgrim", "A Drakkyn of the ember flight", "A lava-glass gatherer"], says: ["The mountain's been singing for days.", "Mind the crusts. They look like stone till they aren't.", "Fire lilies only bloom when she's awake."], persona: "native" });
var Cv = dkwRoomBuild(G, "firelands", 0, 14, 12, 4.4, { wall: dkwS("b:cave", 0x1A1A20, 3), floor: dkwS("b:cave", 0x2A2A30, 2), ceil: dkwS("b:cave", 0x141418, 3), env: "fcave", out: { x: -62, z: -20, ry: -Math.PI / 2 }, doorName: "Out of the cave", day: 0xFF8A4A });
dkwCyl(Cv, 2.4, 2.8, 0.4, dkwS("b:cave", 0x3A3A44, 1), -2, 0, -2, 18);
var sw = new THREE.Mesh(new THREE.CircleGeometry(2.3, 18), dkwWaterM(0x6AC8E8, 0.85));
sw.rotation.x = -Math.PI / 2;
sw.position.set(-2, 0.42, -2);
Cv.add(sw);
dkwSmoke(Cv, -2, 0.4, -2, 0xE8F4FF, 3);
for (k = 0; k < 6; k++) {
var cr = new THREE.Mesh(new THREE.OctahedronGeometry(0.3, 0), dkwGlowM(0x8AD8FF, 0.85));
cr.scale.y = 2;
cr.position.set(-6 + k * 2.4, 3.4, -5.6);
Cv.add(cr);
}
for (k = 0; k < 4; k++)
dkwBox(Cv, 1.4, 0.5, 1, dkwS("b:cave", 0x3A3A44, 1), 3 + (k % 2) * 2, 0, -3 + Math.floor(k / 2) * 3);
var Co = dkwRoomBuild(G, "firelands", 1, 14, 60, 10, { wall: dkwS("b:ashlar", 0x5A4A3A, 3), floor: dkwS("b:slate", 0x2A2420, 2), ceil: dkwS("b:cave", 0x1A140E, 3), env: "fhall", out: { x: 0, z: -552, ry: 0 }, doorName: "The great doors, out to the mountainside", day: 0xFF6A2A });
for (k = 0; k < 10; k++) {
var s = k % 2 ? 1 : -1, z = -26 + Math.floor(k / 2) * 12;
dkwBox(Co, 2.4, 1, 2.4, dkwS("b:ashlar", 0x6A5A4A, 1), s * 5.4, 0, z);
var fg = dkwDressed("smithst" + k, "dkdwarf", { sex: "m", beard: "full" });
dkcStoneFig(fg);
fg.scale.setScalar(1.7);
fg.position.set(s * 5.4, 1, z);
fg.rotation.y = -s * Math.PI / 2;
Co.add(fg);
var hm = dkwBox(Co, 0.3, 1.6, 0.3, dkwS("b:ashlar", 0x6A5A4A, 1), s * 4.6, 2.4, z + 0.6);
hm.rotation.x = 0.5;
dkwCyl(Co, 0.5, 0.3, 1.2, dkwMat("iron"), s * 5.6, 0, z + 6, 10);
dkwFire(Co, s * 5.6, 1.2, z + 6, 0.6);
}
dkwSpot(Co.userData.A.x, Co.userData.A.z - 29, 2, "Into the great hall", "go in", function () { dkwGo("fForge", null, typeof dkbPopulate === "function" ? dkbPopulate : null); }, DKW_IN_Y);
dkwBox(Co, 4, 6, 0.2, dkwGlowM(0xFFA84A, 0.5), 0, 0, -29.9);
var Fh = dkwRoomBuild(G, "firelands", 2, 64, 72, 24, { wall: dkwS("b:ashlar", 0x4A3A2E, 4), floor: dkwS("b:slate", 0x2A221C, 3), ceil: dkwLam(0x0A0604), env: "fhall", out: { x: 0, z: -552, ry: 0 }, doorName: "Back to the mountainside", day: 0xFF6A2A });
(function () {
var lit = new THREE.Group(), dead = new THREE.Group();
Fh.add(lit);
Fh.add(dead);
for (var k = 0; k < 8; k++) {
var s = k % 2 ? 1 : -1, z = -26 + Math.floor(k / 2) * 14;
var fo = new THREE.Group();
fo.position.set(s * 27, 0, z);
fo.rotation.y = -s * Math.PI / 2;
Fh.add(fo);
dkwBox(fo, 8, 7, 5, dkwS("b:ashlar", 0x3A2E24, 2), 0, 0, 0);
var hood = new THREE.Mesh(new THREE.ConeGeometry(4, 8, 4), dkwS("b:ashlar", 0x3A2E24, 2));
hood.position.y = 11;
hood.rotation.y = Math.PI / 4;
fo.add(hood);
var mouth = new THREE.Mesh(new THREE.PlaneGeometry(4, 2.4), dkwGlowM(0xFF8A2A, 0.95));
mouth.position.set(fo.position.x - s * 2.52, 3, z);
mouth.rotation.y = -s * Math.PI / 2;
lit.add(mouth);
var ash = new THREE.Mesh(new THREE.PlaneGeometry(4, 2.4), dkwLam(0x3A3634));
ash.position.copy(mouth.position);
ash.rotation.copy(mouth.rotation);
dead.add(ash);
dkwFire(lit, fo.position.x - s * 1, 3.6, z, 1.6);
dkwSolid(Fh.userData.A.x + s * 27, Fh.userData.A.z + z, 5, 8, DKW_IN_Y - 1, DKW_IN_Y + 12, 0);
var av = dkwBox(Fh, 4, 2.2, 2, dkwMat("iron"), s * 18, 0, z);
dkwSolid(Fh.userData.A.x + s * 18, Fh.userData.A.z + z, 4, 2, DKW_IN_Y - 1, DKW_IN_Y + 2.4, 0);
}
dkwShow("forgeslit", lit, false);
dkwShow("forgesdead", dead, true);
var bots = new THREE.Group();
Fh.add(bots);
for (k = 0; k < (lite ? 10 : 22); k++) {
var s2 = k % 2 ? 1 : -1, z2 = -30 + Math.floor(k / 2) * 5.6;
var b = dkwDressed("auto" + k, "dkw", { sex: k % 3 ? "m" : "f" });
dkcBronze(b, 0x6AB8FF, k % 4 === 0);
b.scale.setScalar(1.25);
b.position.set(s2 * 31, 0, z2);
b.rotation.y = -s2 * Math.PI / 2;
bots.add(b);
}
var mu = new THREE.Mesh(new THREE.PlaneGeometry(22, 12), dkwM("fmural", function () {
var t = dkwCanvas("fmuralT", 512, 280, function (c, W, Hh) {
var g = c.createLinearGradient(0, 0, 0, Hh);
g.addColorStop(0, "#1A1030");
g.addColorStop(1, "#4A2A14");
c.fillStyle = g;
c.fillRect(0, 0, W, Hh);
c.fillStyle = "#C8885A";
c.beginPath();
c.ellipse(170, 150, 34, 70, 0, 0, 7);
c.fill();
c.beginPath();
c.arc(170, 70, 22, 0, 7);
c.fill();
c.strokeStyle = "#C8885A";
c.lineWidth = 12;
c.beginPath();
c.moveTo(190, 110);
c.lineTo(260, 60);
c.stroke();
c.fillStyle = "#6A6A70";
c.fillRect(250, 40, 40, 28);
c.fillStyle = "#3A3A40";
c.fillRect(200, 210, 90, 30);
var Rr = wRand(9);
for (var i = 0; i < 60; i++) {
c.fillStyle = ["#FFE08A", "#FF8A3A", "#FFFFFF"][i % 3];
c.beginPath();
c.arc(260 + Rr() * 230, 30 + Rr() * 200, 1 + Rr() * 3, 0, 7);
c.fill();
}
[[360, 90, 26, "#3A8AE8"], [440, 160, 20, "#6AC84A"], [330, 190, 16, "#E84A2A"], [460, 70, 14, "#E8E8F8"]].forEach(function (p) { c.fillStyle = p[3]; c.beginPath(); c.arc(p[0], p[1], p[2], 0, 7); c.fill(); });
});
return new THREE.MeshLambertMaterial({ map: t, emissive: 0x2A1A0A });
}));
mu.position.set(-31.9, 9, 6);
mu.rotation.y = Math.PI / 2;
Fh.add(mu);
var wd = new THREE.Mesh(new THREE.PlaneGeometry(16, 14), dkcEtchM("fweapons", function (c, W, Hh) {
c.fillStyle = "#2A1A10";
c.fillRect(0, 0, W, Hh);
c.strokeStyle = "#E8B86A";
c.lineWidth = 5;
c.strokeRect(10, 10, W - 20, Hh - 20);
c.beginPath();
c.moveTo(W / 2, 10);
c.lineTo(W / 2, Hh - 10);
c.stroke();
c.beginPath();
c.moveTo(90, 80);
c.lineTo(90, 200);
c.moveTo(70, 80);
c.lineTo(70, 110);
c.lineTo(110, 110);
c.lineTo(110, 80);
c.moveTo(90, 80);
c.lineTo(90, 70);
c.stroke();
c.beginPath();
c.arc(170, 110, 30, Math.PI, 0);
c.lineTo(200, 150);
c.lineTo(140, 150);
c.closePath();
c.stroke();
c.beginPath();
c.moveTo(330, 60);
c.lineTo(310, 120);
c.lineTo(340, 120);
c.lineTo(320, 190);
c.stroke();
c.lineWidth = 8;
c.beginPath();
c.moveTo(256, 60);
c.lineTo(256, 220);
c.stroke();
c.beginPath();
c.arc(220, 80, 40, -0.3, 1.2);
c.stroke();
}, 0.6));
wd.position.set(0, 7, -35.9);
Fh.add(wd);
var mf = new THREE.Group();
mf.position.set(0, 0, -18);
Fh.add(mf);
dkwCyl(mf, 4, 5, 3, dkwS("b:ashlar", 0x3A2E24, 2), 0, 0, 0, 16);
var col = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 3, 22, 16, 1, true), dkwGlowM(0xFFB04A, 0.55));
col.material.side = THREE.DoubleSide;
col.position.y = 14;
mf.add(col);
dkwFire(mf, 0, 3, 0, 3);
dkwShow("mainforge", col, false);
dkwSolid(Fh.userData.A.x, Fh.userData.A.z - 18, 9, 9, DKW_IN_Y - 1, DKW_IN_Y + 3.4, 0);
var vis = new THREE.Group();
vis.position.set(0, 12, -18);
Fh.add(vis);
[[0xFFE08A, "bolt"], [0x3A8AE8, "tri"], [0x2A2A3A, "helm"], [0xD8D8E8, "scy"]].forEach(function (q, i) { var m = new THREE.Mesh(i === 3 ? new THREE.TorusGeometry(2, 0.15, 6, 30, Math.PI * 0.8) : i === 1 ? new THREE.ConeGeometry(0.6, 5, 3) : i === 2 ? new THREE.SphereGeometry(1.6, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2) : new THREE.TetrahedronGeometry(1.6, 0), dkwGlowM(q[0], 0.5)); var a = i / 4 * Math.PI * 2; m.position.set(Math.cos(a) * 5, Math.sin(i * 1.3) * 2, Math.sin(a) * 3); vis.add(m); });
vis.userData.sp = 0.25;
DKW.spin.push(vis);
dkwShow("visions", vis, false);
var an = dkwBox(Fh, 3.4, 1.6, 1.6, dkwMat("iron"), 0, 0, -6);
dkwBox(Fh, 4.4, 0.3, 1.8, dkwMat("iron"), 0, 1.6, -6);
dkwSolid(Fh.userData.A.x, Fh.userData.A.z - 6, 4.4, 1.8, DKW_IN_Y - 1, DKW_IN_Y + 1.9, 0);
var frags = new THREE.Group();
Fh.add(frags);
[[-1.2, 0xC8C8D8], [-0.4, 0xE8C86A], [0.4, 0x6AE8B8], [1.2, 0xD8C8FF]].forEach(function (p) { var f = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), dkwGlowM(p[1], 0.95)); f.scale.y = 2.4; f.rotation.z = 1.4; f.position.set(p[0], 1.98, -6); frags.add(f); });
dkwShow("fragsanvil", frags, false);
var sc = new THREE.Group();
sc.position.set(0, 2, -6);
Fh.add(sc);
var bl = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.06, 6, 30, Math.PI * 0.8), dkwShine(0x0A0A10, 0.1, 0.95));
bl.rotation.x = Math.PI / 2;
bl.position.set(0, 0.1, -0.2);
sc.add(bl);
var hf = dkwCyl(sc, 0.04, 0.04, 2.8, dkwShine(0x2A1A10, 0.4, 0.4), 0, 0, 0, 8);
hf.rotation.z = Math.PI / 2;
hf.position.set(0.4, 0.06, 0.5);
var rn = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.012, 4, 30, Math.PI * 0.8), dkwGlowM(0xFFC86A, 0.85));
rn.rotation.x = Math.PI / 2;
rn.position.set(0, 0.13, -0.2);
sc.add(rn);
dkwShow("scythedone", sc, false);
dkwBox(Fh, 4, 1, 1.6, dkwS("b:ashlar", 0x3A2E24, 1), 6, 0, -6);
var vw = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.2), dkwLam(0x000000));
vw.rotation.x = -Math.PI / 2;
vw.position.set(6, 1.02, -6);
Fh.add(vw);
var dv = new THREE.Mesh(new THREE.SphereGeometry(3, 20, 14), dkwGlowM(0xFFE0A0, 0.35));
dv.position.set(-2, 3, -8);
Fh.add(dv);
dkwShow("vulcanfire", dv, false);
var dome = new THREE.Mesh(new THREE.SphereGeometry(5, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), dkwGlowM(0xD8E8FF, 0.18));
dome.material.side = THREE.DoubleSide;
dome.position.set(0, 0, 4);
Fh.add(dome);
dkwShow("starshield", dome, false);
for (k = 0; k < 8; k++) {
var sh = new THREE.Mesh(new THREE.PlaneGeometry(2, 8), dkwGlowM(0xFFC86A, 0.12));
sh.position.set(-24 + k * 7, 16, -10 + (k % 3) * 8);
sh.rotation.x = -0.3;
Fh.add(sh);
}
})();
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var steel = dkwShine(0x6A747E, 0.3, 0.85);
dkwBox(g, 6, 0.2, 6, dkwShine(0x2A3038, 0.2, 0.85), 0, 0, 0);
dkwBox(g, 6, 0.3, 6, steel, 0, 4.4, 0);
[-3, 3].forEach(function (k) { dkwBox(g, 0.2, 4.4, 6, steel, k, 0, 0); });
dkwBox(g, 6, 4.4, 0.2, steel, 0, 0, -3);
if (o.glass) {
var pane = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 4.2), dkwWaterM(o.water || 0x3AA8C8, 0.55));
pane.position.set(0, 2.2, 2.9);
g.add(pane);
}
else
for (var i = 0; i < 11; i++)
dkwBox(g, 0.08, 4.4, 0.08, o.red ? dkwGlowM(0xFF3A2A, 0.85) : steel, -2.6 + i * 0.52, 0, 2.95);
var run = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 0.14), dkwGlowM(0xFF3A3A, 0.8));
run.position.set(0, 4.2, 3.02);
g.add(run);
dkwSolid(P.userData.A.x + x, P.userData.A.z + z, 6.4, 6.4, DKW_IN_Y - 1, DKW_IN_Y + 5, ry || 0);
return g;
},
function () {
return dkwCanvas("lavaFlowT", 256, 256, function (c, W, H) {
var R = wRand(4401);
var g = c.createLinearGradient(0, 0, W, 0);
g.addColorStop(0, "#C8280A");
g.addColorStop(0.5, "#FF6A1A");
g.addColorStop(1, "#C8280A");
c.fillStyle = g;
c.fillRect(0, 0, W, H);
for (var i = 0; i < 90; i++) {
c.globalAlpha = 0.55;
c.fillStyle = ["#FFD24A", "#FFF0A0", "#FF9A2A"][i % 3];
c.beginPath();
c.ellipse(R() * W, R() * H, 4 + R() * 22, 2 + R() * 8, R() * 3, 0, 7);
c.fill();
}
for (i = 0; i < 70; i++) {
c.globalAlpha = 0.75;
c.fillStyle = ["#2A0804", "#4A1206", "#1A0402"][i % 3];
c.beginPath();
c.ellipse(R() * W, R() * H, 6 + R() * 26, 3 + R() * 10, R() * 3, 0, 7);
c.fill();
}
c.globalAlpha = 1;
});
},
function () { return dkwM("lavaFallM", function () { var t = dkwCanvas("lavaFallT", 128, 256, function (c, W, H) { var R = wRand(4402); c.fillStyle = "#FF5A14"; c.fillRect(0, 0, W, H); for (var i = 0; i < 60; i++) {
c.globalAlpha = 0.6;
c.fillStyle = ["#FFE08A", "#FFB03A", "#8A1A04"][i % 3];
c.fillRect(R() * W, R() * H, 2 + R() * 8, 20 + R() * 70);
} c.globalAlpha = 1; }); var m = new THREE.MeshBasicMaterial({ map: t }); m.userData.noPhoto = 1; return m; }); },
function () {
return dkwM("charBarkM", function () {
var t = dkwCanvas("charBarkT", 128, 256, function (c, W, H) { var R = wRand(4403); c.fillStyle = "#141010"; c.fillRect(0, 0, W, H); for (var i = 0; i < 220; i++) {
c.fillStyle = ["#0A0808", "#262020", "#1C1614"][i % 3];
c.fillRect(R() * W, R() * H, 1 + R() * 4, 8 + R() * 30);
} });
var e = dkwCanvas("charBarkE", 128, 256, function (c, W, H) { var R = wRand(4404); c.fillStyle = "#000"; c.fillRect(0, 0, W, H); c.strokeStyle = "#FF7A2A"; c.lineWidth = 3; for (var i = 0; i < 28; i++) {
var x = R() * W, y = R() * H;
c.beginPath();
c.moveTo(x, y);
for (var k = 0; k < 4; k++) {
x += (R() - 0.5) * 14;
y += 6 + R() * 18;
c.lineTo(x, y);
}
c.stroke();
} });
var m = new THREE.MeshLambertMaterial({ map: t, emissive: 0xFFFFFF, emissiveMap: e, emissiveIntensity: 1.4 });
return m;
});
},
function (v) {
return dkwGeo("deadtree" + v, function () {
var R = wRand(4410 + v), parts = [], h = 6 + v * 1.6;
parts.push(dkwTaper([[0, 0, 0], [R() * 0.4 - 0.2, h * 0.5, R() * 0.4 - 0.2], [R() * 0.8 - 0.4, h, R() * 0.8 - 0.4]], [0.45 + v * 0.06, 0.3, 0.1], 8, 6));
var nb = 3 + v;
for (var i = 0; i < nb; i++) {
var y = h * (0.35 + 0.55 * R()), a = R() * 6.283, L = 1.6 + R() * 2.6, up = 0.6 + R() * 1.6;
var x1 = Math.cos(a) * L, z1 = Math.sin(a) * L;
parts.push(dkwTaper([[0, y, 0], [x1 * 0.5, y + up * 0.6, z1 * 0.5], [x1, y + up, z1]], [0.16, 0.1, 0.03], 5, 5));
if (R() < 0.7) {
var a2 = a + (R() - 0.5) * 1.4;
parts.push(dkwTaper([[x1 * 0.6, y + up * 0.7, z1 * 0.6], [x1 * 0.6 + Math.cos(a2) * 1.1, y + up + 0.9, z1 * 0.6 + Math.sin(a2) * 1.1]], [0.07, 0.02], 3, 4));
}
}
return dkwMerge(parts);
});
},
function (P, x, y, z, s, n) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var fl = [];
n = n || 5;
for (var i = 0; i < n; i++) {
var f = new THREE.Mesh(dkwGeo("flameT", function () { var c = new THREE.ConeGeometry(0.3, 1.4, 7); c.translate(0, 0.7, 0); return c; }), dkcAddM([0xFFB040, 0xFF6A1A, 0xFFE080, 0xFF8A2A][i % 4], 0.85));
var a = i / n * 6.283;
f.position.set(Math.cos(a) * 0.25 * s, 0, Math.sin(a) * 0.25 * s);
f.scale.set(s, s * (0.8 + (i % 3) * 0.35), s);
g.add(f);
fl.push(f);
}
g.userData.kind = "fire";
g.userData.fl = fl;
DKW.fx.push(g);
return g;
},
function (P, n, w, h, d, cx, cy, cz, follow) {
var R = wRand(4420 + n), pts = [];
for (var i = 0; i < n; i++)
pts.push((R() - 0.5) * w, R() * h, (R() - 0.5) * d);
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
var m = new THREE.PointsMaterial({ color: 0xFF9A3A, size: follow ? 0.22 : 0.16, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
m.userData.noPhoto = 1;
var p = new THREE.Points(g, m);
p.position.set(cx, cy, cz);
P.add(p);
p.userData.h = h;
p.userData.follow = follow;
DKFG.embers.push(p);
return p;
},
function (dt) {
if (DKW.sc !== "firelands" || !DKW.built)
return;
var t = DKW.t;
DKFG.embers.forEach(function (E) {
var a = E.geometry.attributes.position, h = E.userData.h;
for (var i = 0; i < a.count; i++) {
var y = a.getY(i) + dt * (1.2 + (i % 5) * 0.35);
if (y > h)
y -= h;
a.setY(i, y);
a.setX(i, a.getX(i) + Math.sin(t * 1.3 + i) * dt * 0.3);
}
a.needsUpdate = true;
if (E.userData.follow) {
try {
var Lw = worldLocal();
if (camera.position.y > -500)
E.position.set(Lw.x - DKW_SC.firelands.x, camera.position.y - 6, Lw.z);
}
catch (e) { }
}
});
},
function () {
var S = dkwSc(), k = S.env, L = null;
try {
var Lw = worldLocal();
L = { x: Lw.x - S.x, z: Lw.z };
}
catch (e) { }
if (DKW.envK && DKW_ENV[DKW.envK])
k = DKW.envK;
if (DKW.night && !dkwSc0(DKW.sc).under)
k = DKW_SC[DKW.sc] && DKW_SC[DKW.sc].tor ? "tnight" : "enight";
var R = L ? dkwRoomAt(L.x, L.z) : null;
if (R)
k = R.env;
var E = {}, B = DKW_ENV[k] || DKW_ENV.land;
for (var q in B)
E[q] = B[q];
if (dkwLite() && E.fogD)
E.fogD *= 1.4;
return E;
},
function (x, z, feet) {
if (DKW.moving || DKW.ride)
return true;
var S = dkwSc(), D = DKW_SCN[DKW.sc];
if (!D)
return false;
if ((Math.abs(x) > S.bound || Math.abs(z) > S.bound) && dkwFloorAt(x, z, feet) === null)
return true;
if (D.edge && x < S.bound + 60 && D.edge(x, z))
return true;
if (dkwSolidAt(x, z, feet))
return true;
var fl = dkwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = dkwLand(x, z);
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
DKW.t += dt;
if (!DKW.built || !DKW.scG)
return;
var S = dkwSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72;
if (typeof flyY !== "undefined" && feet < -500 && flyY > feet + 0.5 && dkwRoomAt(L.x, L.z))
flyY = feet;
DKW.et = (DKW.et || 0) + dt;
if (DKW.et > 0.8) {
DKW.et = 0;
worldEnv(dkwEnvNow());
}
var flow = DKW.t * 0.02;
DKW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * 0.4, flow); });
DKW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (DKW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(DKW.t * 3 + i * 2)) * 0.3; f.rotation.y = DKW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(DKW.t * 1.3) * 0.08;
}
});
DKW.bob.forEach(function (g, i) {
var u = g.userData, k = u.kind;
if (Math.abs(g.position.x - L.x) + Math.abs(g.position.z - L.z) > 260)
return;
if (k === "air") {
g.position.x = u.home[0] + Math.sin(DKW.t * 0.05 + u.ph) * 20 * u.dr[0] * 2;
g.position.z = u.home[1] + Math.cos(DKW.t * 0.04 + u.ph) * 20 * u.dr[1] * 2;
g.position.y = u.y0 + Math.sin(DKW.t * 0.4 + u.ph) * 0.8;
g.rotation.y += dt * 0.2;
}
else if (k === "walk") {
var a = DKW.t * 0.03 + u.ph;
g.position.x = u.home[0] + Math.sin(a) * 8;
g.position.z = u.home[1] + Math.cos(a * 0.7) * 8;
if (u.hfn)
g.position.y = u.hfn(g.position.x, g.position.z);
}
else if (k === "waltz") {
var b = DKW.t * 0.08 + u.ph;
g.position.x = u.home[0] + Math.sin(b) * 10;
g.position.z = u.home[1] + Math.sin(b * 2) * 5;
if (u.hfn)
g.position.y = u.hfn(g.position.x, g.position.z);
g.children[0].rotation.y = DKW.t * 2.2;
g.children[0].position.y = 0.55 + Math.abs(Math.sin(DKW.t * 3.3)) * 0.08;
}
else if (k === "spin") {
g.rotation.y += dt * (u.sp || 0.3);
}
else if (k === "float") {
g.position.y = u.y0 + Math.sin(DKW.t * (u.f || 0.3) + u.ph) * (u.amp || 1);
}
});
DKW.ghosts.forEach(function (g, i) { var m = g.userData.mats; if (m)
m.forEach(function (x) { x.opacity = 0.55 + Math.sin(DKW.t * 0.8 + i) * 0.1; }); });
DKW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return dkwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof dkbTick === "function")
try {
dkbTick(dt, L);
}
catch (e) {
DKW.e1 = (e && e.message) || 1;
if (!DKW.e1w) {
DKW.e1w = 1;
if (window.console)
console.warn("[drakkyn] book", e);
}
}
if (!DKW.bannerBook)
worldBanner("<b>🐉 " + DKW_NAME + "</b> · " + esc(dkwPlaceName(L)) + (DKW.night ? " · night" : ""));
DKW.pt = (DKW.pt || 0) + dt;
if (DKW.pt < 0.15)
return;
DKW.pt = 0;
if (DKW.moving || DKW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
DKW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof dkbTalk === "function" && dkbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
DKW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : dkwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof dkbSpot === "function")
dkbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof dkbIdlePrompt === "function")
dkbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = dkwAtPt(opt.at) || (typeof dkbStartAt === "function" && dkbStartAt()) || dkwAtPt("gladeIn");
dkwScene(A.sc);
var S = DKW_SC[A.sc], y = A.y != null ? A.y : dkwGround(A.x, A.z);
camera.position.set(DKW.base + S.x + A.x, y + 1.72, A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
DKW.moving = false;
DKW.ride = null;
worldEnv(dkwEnvNow());
setStatus("🐉 <b>" + DKW_NAME + ".</b> Sebastian Nightwell and Thaddeus Johnson's novel, the whole of it: Dallas in 2077, and Awen, the realm beyond the veil. <b>Press E</b> for the book.");
if (typeof dkbEnter === "function")
try {
dkbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[drakkyn] enter", e);
}
},
function () {
dkwSceneDrop();
for (var k in DKW.mats) {
var m = DKW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in DKW.tex) {
var x = DKW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in DKW_GEO) {
try {
DKW_GEO[g].dispose();
}
catch (e) { }
}
DKW.mats = {};
DKW.tex = {};
DKW_GEO = {};
DKW.built = false;
DKW.G = null;
DKW.lights = 0;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = DKW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = DKW.talk.filter(function (t) { return t.p && t.p.g && t.p.g.parent && (at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who); })[0];
if (T && T.p.g.parent)
return { sc: DKW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return dkbPos(at.at);
var C = DKB_CH[dkbS().ch], i = dkbS().s, c = C && C.cast ? C.cast.filter(function (d) { return dkbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? dkbPos(c.at) : null;
}
if (at.spot) {
var Sp = DKW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: DKW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return dkbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || DKW.sc, x: at.x, z: at.z, y: at.y };
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
if (DKB.beam && DKB.beam.parent === DKW.scG)
return DKB.beam;
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
DKW.scG.add(g);
DKB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return dkwLam(c); }, m;
switch (kind) {
case "load":
m = dkwBox(g, 0.6, 0.4, 0.5, M(0x8A7A5A), 0, 0, 0);
dkwBox(g, 0.64, 0.06, 0.54, M(0x4A3A2A), 0, 0.2, 0);
break;
case "rifle":
m = dkwBox(g, 0.08, 0.08, 1.1, M(0x3A2A1A), 0, 0.04, 0);
break;
case "fern":
m = dkwBox(g, 0.4, 0.04, 0.3, M(0x5A8A3A), 0, 0.02, 0);
break;
case "thorn":
m = dkwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = dkwBox(g, 0.9, 0.12, 0.12, M(0x6A4A2A), 0, 0.06, 0);
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
m = dkwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
dkwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = dkwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
dkwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), dkwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "note":
m = dkwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "skin":
m = dkwBox(g, 0.8, 0.05, 0.6, M(0xA88A60), 0, 0.03, 0);
break;
case "cane":
m = dkwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
break;
case "shell":
m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), M(0xD8C8A8));
m.scale.y = 0.4;
m.position.y = 0.05;
g.add(m);
break;
case "crystal":
m = new THREE.Mesh(new THREE.OctahedronGeometry(0.1, 0), dkwGlowM(0x8AFFC8, 0.9));
m.position.y = 0.14;
g.add(m);
break;
case "shard":
m = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.36, 3), M(0x14141C));
m.rotation.z = Math.PI / 2.4;
m.position.y = 0.1;
g.add(m);
var sg = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), dkwGlowM(0xB86AFF, 0.35));
sg.position.y = 0.1;
g.add(sg);
break;
case "stone":
m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.07, 1), M(0x8A8478));
m.scale.y = 0.55;
m.position.y = 0.04;
g.add(m);
break;
case "ghostheart":
m = new THREE.Mesh(dkwTaper([[0, 0.06, -0.22], [0.05, 0.1, 0], [0, 0.08, 0.22]], [0.035, 0.045, 0.03], 14, 8), M(0x0A0A10));
g.add(m);
var gg = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), dkwGlowM(0xC8E0FF, 0.3));
gg.position.y = 0.08;
g.add(gg);
break;
case "anchor":
m = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.1, 0.14), M(0x0E0E12));
m.position.y = 0.06;
g.add(m);
var ag = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), dkwGlowM(0x5AE8C8, 0.35));
ag.position.y = 0.06;
g.add(ag);
break;
case "chalk":
dkwBox(g, 0.12, 0.03, 0.03, M(0xF4F4F0), 0, 0, 0);
break;
case "salt":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.26, 10), M(0xD8C8A0));
m.position.y = 0.13;
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
if (!P || !DKW.scG || P.sc !== DKW.sc)
return null;
var g = dkbItemMesh(kind), y = P.y != null ? P.y : dkwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
DKW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = dkwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (DKB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = DKW.spots.indexOf(I.S); if (j >= 0)
DKW.spots.splice(j, 1); DKB.items = DKB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.arb = 1;
DKB.items.push(I);
return I;
},
function (k) {
if (DKB.tuneKey === k)
return;
DKB.tuneKey = k;
var old = DKB.tune;
DKB.tune = null;
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
if (!k || !DKB_TUNES[k])
return;
try {
var A = new Audio(DKB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
DKB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (DKB.tune !== A) {
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
if (DKB.text)
return fn(DKB.text);
if (DKB.textWait) {
DKB.textWait.push(fn);
return;
}
DKB.textWait = [fn];
var done = function (B) { DKB.text = B; var w = DKB.textWait; DKB.textWait = null; w.forEach(function (f) { try {
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
dkbText(function (B) {
var C = DKB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + dkbLabel(i) + "</h3>" + DKB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(dkbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); DKB.readOpen = 0; DKB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = dkbS(), C = DKB_CH[S.ch];
if (!C)
return;
DKB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
DKB.readAsk = 0;
DKB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : "Heart of the Drakkyn") + "</div><h3 style='margin:4px 0'>" + dkbLabel(ch) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? dkbOpening(T).map(dkbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); DKB.readOpen = 0; dkbStepDone(); }, all: function () { dkbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "The book's own words, all of it");
b += dkbKeeperBtns(fns);
worldCard(b, fns);
};
dkbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
DKB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); dkbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = dkbS(), C = DKB_CH[S.ch];
if (!C)
return;
dkbItemsClear();
dkbCastClear();
DKB.hold = 0;
var go = function () { dkbWorldState(); dkbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[dkb] setup", S.ch, e);
} dkbTune(C.tune || null); dkbStepBegin(); };
if (place && C.start) {
var P = dkbPos(C.start);
if (P && WLD.on === DKW_KEY) {
dkwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (DKW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = dkbStep();
dkbItemsClear();
DKB.hold = 0;
DKB.puzOpen = 0;
if (typeof dkxStepBegin === "function")
try {
dkxStepBegin(b);
}
catch (e) { }
if (!b)
return;
b._key = dkbKey();
dkbWorldState();
try {
if (b.on)
b.on(dkbS().f);
}
catch (e) {
if (window.console)
console.warn("[dkb] on", e);
}
if (b.k === "read") {
dkbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { DKB.rew[k] = 0; });
if (b.k === "find") {
var Pf = dkbPos(b.at);
if (Pf && Pf.sc === DKW.sc)
dkbItemAdd(b.item, Pf, b.name, b.verb, function () { if (dkbKey() === b._key)
dkbStepDone(); });
}
if (b.k === "gather") {
var P = dkbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(dkbS().ch * 97 + dkbS().s * 13 + 7);
DKB.got = 0;
if (P && P.sc === DKW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = dkwGround(Q.x, Q.z, (P.y != null ? P.y : dkwLand(P.x, P.z)) + 1);
dkbItemAdd(b.item, Q, b.name, b.verb, function () { if (dkbKey() !== b._key)
return; DKB.got++; try {
if (b.each)
b.each(DKB.got);
}
catch (e) { } if (DKB.got < n) {
dkbSay((b.eachSay || "Got one.") + " " + DKB.got + " of " + n + ".");
return;
} dkbStepDone(); });
}
}
if (b.h)
dkbSay("<b>" + esc(DKB_CH[dkbS().ch].t) + ".</b> " + b.h);
},
function (b) {
DKB.puzOpen = 1;
DKB.puzT = performance.now();
var k = dkbKey(), fns = {}, h = DKB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
dkbSay(b.yes);
if (dkbKey() === k)
dkbStepDone();
return;
}
dkbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (dkbKey() === k)
DKB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = dkbS(), C = DKB_CH[S.ch], b = dkbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[dkb] done", e);
}
if (b.say)
dkbSay(b.say);
S.s++;
if (window.DKB_LOG)
DKB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= DKB_CH.length - 1) {
S.done = 1;
S.s = 0;
dkbSave();
dkbItemsClear();
dkbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
dkbSave();
var nx = DKB_CH[S.ch];
setTimeout(function () { try {
dkbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[dkb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
dkbSave();
dkbStepBegin();
},
function () {
dkbTune("end");
var S = dkbS();
var b = "<h3 style='margin:4px 0'>The End of Book One</h3><p style='font-style:italic'>" + dkQ("Drake opened his eyes, his resolve hardening. \"Tell me where to start.\"") + "</p><p style='font-style:italic'>" + dkQ("\"We need to talk,\" he said. \"Something's happened. Something big.\"") + "</p>" + dxsrc("Book 2 sneak peek, The Unending Thread") + "<p>You have played the whole of Heart of the Drakkyn: the Moonlight Diner and Warehouse 13, Frostspire and the Summer Court, Eldrinwood, the Western Heart, Razkanyr and Dragoon Mountain, Tyr-Narhul, the Earthen Enclosure and the Conclave, the Halls of Vulcan, Verrin Tower, and the Battle of Caldemora. The Scythe is whole, the Veil is healed, and Drake is the Bridge.</p>";
try {
if (typeof bhnFinish === "function")
bhnFinish(DKW_KEY);
else if (typeof dkxFinishGift === "function")
dkxFinishGift();
}
catch (e) { }
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; dkbSave(); dkbChapterBegin(true); } };
b += worldBtn("again", "Play it again from the start", "The Great Drakkyn Prophecy");
worldCard(b, fns);
},
function (c) {
var C = DKB.cast[c.key || c.k];
if (dkbCastLive(C))
return C;
var P = dkbPos(c.at);
if (!P || P.sc !== DKW.sc)
return null;
var F = DKW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute };
var Pp;
if (F.name && !c.dress)
Pp = dkwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = dkwDressed("arb" + (c.key || c.k), c.dress || "dkmod", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : dkwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
DKW.scG.add(g);
Pp = { g: g, y: y, o: {} };
DKW.people.push(Pp);
if (c.name && !c.mute)
dkwTalk(Pp, c.name, dkwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
DKB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return DKB.cast[c.key || c.k];
},
function () {
var C = DKB_CH[dkbS().ch];
if (!C || !C.cast)
return;
var idx = dkbS().s;
var act = {};
C.cast.forEach(function (c) { var key = c.key || c.k, on = !(c.from != null && idx < c.from) && !(c.until != null && idx >= c.until); if (on) {
if (!act[key])
act[key] = c;
}
else if (!(key in act))
act[key] = null; });
Object.keys(act).forEach(function (key) { var c = act[key], cur = DKB.cast[key]; if (!c) {
if (cur)
dkbCastHide(key);
return;
} if (cur && cur.c !== c)
dkbCastHide(key); if (!dkbCastLive(DKB.cast[key]))
dkbCastAdd(c); });
},
function () {
if (!DKW.scG)
return;
dkbCastClear();
var S = dkbS(), C = DKB_CH[S.ch];
var mine = null;
if (S.started && !S.done && C && C.cast && dkbCastHere(C)) {
dkbCastTick();
mine = {};
C.cast.forEach(function (c) { mine[c.k] = 1; });
}
(DKB_FOLK_AT[DKW.sc] || []).forEach(function (q) { if (mine && mine[q[0]])
return; var key = "f_" + q[0]; var Pp = dkwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
DKB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!dkbActive())
return false;
var b = dkbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = dkbKey();
worldPrompt(null);
var next = function () { if (dkbKey() === k)
dkbStepDone(); };
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
worldCard(DKB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
DKB.wt += dt;
if (DKB.wt > 0.5) {
DKB.wt = 0;
if (dkbActive() && dkbCastHere(DKB_CH[dkbS().ch]))
dkbCastTick();
if (dkbActive()) {
var bs = dkbStep();
if (bs && bs.k === "spot" && bs.on && !DKW.moving)
try {
bs.on(dkbS().f);
}
catch (e) { }
}
var S0 = dkbS();
S0.seen[DKW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!dkbActive()) {
if (DKB.beam)
DKB.beam.visible = false;
DKW.bannerBook = false;
return;
}
var S = dkbS(), b = dkbStep(), t = DKW.t, feet = camera.position.y - 1.72;
DKB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? dkbPos(b.at) : null, here = P && P.sc === DKW.sc, bm = dkbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + dkbScName(P.sc) + ": press E for the book)";
if (here && !DKW.moving && !DKW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : dkwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = dkbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !DKW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (DKB.readAsk)
break;
if (!DKB.readOpen)
dkbChapterCard();
else {
DKB.readOpen = 0;
dkbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
dkbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
DKB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(DKB.hold, dt);
}
catch (e) { }
if (DKB.hold >= (b.sec || 8)) {
dkbStepDone();
return;
}
}
else
DKB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return DKB.rew[k]; })) {
dkbStepDone();
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
dkbStepDone();
return;
}
break;
}
case "puzzle":
if ((!DKB.puzOpen || performance.now() - (DKB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
dkbPuzzleCard(b);
break;
case "fight":
if (!DKX.fight && (!P || (near && fd < (b.r || 9))) && performance.now() - (DKX.fightT || 0) > 2500)
dkxFightCard(b);
break;
}
}
var C = DKB_CH[S.ch], prog = b && b.k === "hold" && DKB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - DKB.hold)) + " s)" : b && b.k === "gather" ? " (" + (DKB.got || 0) + " of " + (b.n || 3) + ")" : "";
DKW.bannerBook = true;
worldBanner("⏳ <b>" + dkbLabel(S.ch) + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = dkbS(), C = DKB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Sebastian Nightwell and Thaddeus Johnson · Heart of the Drakkyn (The Drakkyn Saga, Book 1), the whole book</div><h3 style='margin:4px 0'>🐉 Heart of the Drakkyn</h3>";
if (S.done && S.wait)
b += "<p>You have played every chapter built so far. The rest of the book is being built now, and you will carry on from here when it arrives. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.done)
b += "<p>You have played the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + dkbLabel(S.ch) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((dkbStep() || {}).h || "") + "</p>";
var st = dkbStep(), P = st && st.at ? dkbPos(st.at) : null, Cs = dkbPos(C.start);
var to = P && P.sc !== DKW.sc ? P : (!P && Cs && Cs.sc !== DKW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + dkbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); dkwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { dkbPopulate(); dkbStepBegin(); }); };
}
}
else
b += "<p>Dallas, 2077. Neon bleeds across steel and glass, and magic hides in plain sight: vampires at penthouse galas, wolves by the Gulf, and the Empirical Order's hidden labs. Dr. Marcus Verrin is tearing at the veil to Awen, the realm of magic. And a young waiter at the Moonlight Diner, who hides his golden eyes behind contact lenses, is about to learn that he is the Child of Scales the old prophecy spoke of.</p><p style='opacity:.85'>You will play every scene of the book, as the person each one follows, and you can read every chapter in full as you go.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: the Great Drakkyn Prophecy", S.started ? "Back to where you were" : "\"When steel towers pierce the starlit veil\"");
fns.go = function () { worldCard(null); dkbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; dkbSave(); dkbBegin(); };
}
b += worldBtn("awenmap", "🗺️ The map of Awen", "Every land of the book, and where you are");
fns.awenmap = function () { worldCard(null); dkcAwenMapOpen(); };
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(DKW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(DKW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = (DKW_SCN[k].start || { x: 0, z: 0 }); dkwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, dkbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += dkbKeeperBtns(fns);
worldCard(b, fns);
},
function (st, s) {
var V = function (v) { return typeof v === "function" ? v(s) : v; };
if (DKW.shows)
for (var k in DKW.shows) {
var o = DKW.shows[k];
if (o)
o.visible = st[k] === undefined ? !!o.userData.def : !!V(st[k]);
}
DKW.solids.forEach(function (S) { if (S.show) {
var on = st[S.show] === undefined ? !!S.showDef : !!V(st[S.show]);
S.off = !on;
} });
if (DKW.stateFns)
DKW.stateFns.forEach(function (f) { try {
f(st, V, s);
}
catch (e) { } });
},
function (dt, L) {
var i = 0;
for (var k in DKB.cast) {
var C = DKB.cast[k];
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
g.position.y = dkwGround(g.position.x, g.position.z, feet + 1);
}
},
function (g) {
var M = dkwM("shadowfoe", function () { var m = new THREE.MeshBasicMaterial({ color: 0x0A0612, transparent: true, opacity: 0.82, depthWrite: false }); m.userData.noPhoto = 1; return m; });
var body = new THREE.Mesh(dkwTaper([[0, 0, 0], [0, 0.9, 0], [0, 1.8, 0.05], [0, 2.4, 0]], [0.5, 0.42, 0.3, 0.18], 10, 9), M);
g.add(body);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 10), M);
hd.position.y = 2.45;
g.add(hd);
[-1, 1].forEach(function (k) {
var e = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), dkwGlowM(0xB06AFF, 1));
e.position.set(k * 0.09, 2.48, 0.22);
g.add(e);
var arm = new THREE.Mesh(dkwTaper([[0, 0, 0], [k * 0.4, -0.4, 0.2], [k * 0.6, -1.0, 0.3]], [0.12, 0.08, 0.03], 8, 6), M);
arm.position.set(k * 0.3, 1.9, 0);
g.add(arm);
});
g.userData.float = 1;
},
function (g, s, col, eye) {
var M = dkwShine(col, 0.3, 0.05), dk = dkwLam(0x8AA0B8);
var b = dkwEll(g, M, 0.55 * s, 0.5 * s, 1.15 * s, 0, 1.05 * s, 0, 16);
var nk = new THREE.Mesh(dkwTaper([[0, 1.2 * s, 0.8 * s], [0, 1.45 * s, 1.25 * s]], [0.4 * s, 0.3 * s], 6, 8), M);
g.add(nk);
var hd = dkwEll(g, M, 0.3 * s, 0.3 * s, 0.42 * s, 0, 1.5 * s, 1.5 * s, 12);
dkwEll(g, M, 0.15 * s, 0.14 * s, 0.3 * s, 0, 1.42 * s, 1.85 * s, 10);
[-1, 1].forEach(function (k) {
var e = new THREE.Mesh(new THREE.SphereGeometry(0.05 * s, 8, 6), dkwGlowM(eye, 1));
e.position.set(k * 0.13 * s, 1.58 * s, 1.78 * s);
g.add(e);
var ear = new THREE.Mesh(new THREE.ConeGeometry(0.09 * s, 0.25 * s, 6), M);
ear.position.set(k * 0.16 * s, 1.82 * s, 1.42 * s);
g.add(ear);
});
[[-1, 0.7], [1, 0.7], [-1, -0.7], [1, -0.7]].forEach(function (q) { g.add(dkwLeg(g, M, q[0] * 0.3 * s, 0.95 * s, q[1] * s, 0.95 * s, 0.16 * s, { bend: q[1] > 0 ? -1 : 1 })); });
for (var i = 0; i < 14; i++) {
var sp = new THREE.Mesh(new THREE.ConeGeometry(0.06 * s, 0.5 * s, 5), dkwShine(0xBFE8FF, 0.4, 0.2));
sp.position.set((i % 2 ? 1 : -1) * 0.15 * s * (i % 3), 1.5 * s, -0.8 * s + i * 0.12 * s);
sp.rotation.x = -0.5;
g.add(sp);
}
var tl = new THREE.Mesh(dkwTaper([[0, 1.1 * s, -1.1 * s], [0, 0.9 * s, -1.6 * s], [0, 0.6 * s, -1.9 * s]], [0.15 * s, 0.1 * s, 0.03 * s], 8, 6), M);
g.add(tl);
g.userData.beast = 1;
},
function (g) {
var M = dkwM("wraithM", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8ECFF, emissive: 0x2A4A6A, transparent: true, opacity: 0.7, shininess: 80, depthWrite: false }); m.userData.noPhoto = 1; return m; });
var robe = new THREE.Mesh(new THREE.ConeGeometry(0.9, 3.2, 12, 1, true), M);
robe.position.y = 1.9;
g.add(robe);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.34, 12, 10), M);
hd.position.y = 3.5;
g.add(hd);
[-1, 1].forEach(function (k) {
var e = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), dkwGlowM(0x8AE8FF, 1));
e.position.set(k * 0.12, 3.55, 0.28);
g.add(e);
var arm = new THREE.Mesh(dkwTaper([[0, 0, 0], [k * 0.7, -0.5, 0.4], [k * 1.1, -1.2, 0.6]], [0.16, 0.1, 0.02], 8, 6), M);
arm.position.set(k * 0.4, 3.0, 0);
g.add(arm);
});
for (var i = 0; i < 8; i++) {
var c = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.7, 5), dkwShine(0xE8F8FF, 0.5, 0.3));
c.position.set(Math.cos(i) * 0.7, 3.6 + Math.sin(i * 2) * 0.15, Math.sin(i) * 0.4);
c.rotation.z = Math.cos(i) * 0.6;
g.add(c);
}
g.userData.float = 1;
},
function (g, col, ice) {
var M = ice ? dkwShine(col, 0.25, 0.1) : dkwMat("rock"), R = wRand(col);
var t = dkwBox(g, 1.4, 1.5, 0.9, M, 0, 1.4, 0);
dkwBox(g, 0.7, 0.6, 0.6, M, 0, 2.95, 0.05);
[-1, 1].forEach(function (k) {
dkwBox(g, 0.5, 1.4, 0.5, M, k * 0.95, 1.4, 0);
dkwBox(g, 0.55, 1.3, 0.55, M, k * 0.4, 0, 0);
var e = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), dkwGlowM(ice ? 0x8AE8FF : 0xFF9A3A, 1));
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
function (g) {
dkxPersonFoe(g, "dkorder");
var M = dkwShine(0xB8C0C8, 0.15, 0.95);
var sh = new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 10), M);
sh.position.set(0, 1.66, 0.02);
sh.scale.set(1, 1.1, 1.1);
g.add(sh);
var vz = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.06, 0.04), dkwGlowM(0x6AFF6A, 0.9));
vz.position.set(0, 1.68, 0.17);
g.add(vz);
dkwBox(g, 0.46, 0.5, 0.28, M, 0, 1.1, 0);
var gun = dkwBox(g, 0.08, 0.1, 0.6, dkwMat("iron"), 0.25, 1.05, 0.35);
},
function (kind, P) {
var F = DKX_FOES[kind];
if (!F || !DKW.scG || !P || P.sc !== DKW.sc)
return null;
var g = new THREE.Group();
try {
F.make(g);
}
catch (e) { }
var y = P.y != null ? P.y : dkwGround(P.x, P.z, 500);
g.position.set(P.x, y, P.z);
g.userData.keep = 1;
g.userData.live = 1;
g.userData.y0 = y;
g.userData.ph = Math.random() * 6;
DKW.scG.add(g);
var o = { g: g, kind: kind, P: P };
DKX.foes.push(o);
return o;
},
function (dt) {
var L = dkwLocalSc();
DKX.foes.forEach(function (o) {
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
var k = dkbKey(), F = DKX_FOES[b.foe] || DKX_FOES.shadow, as = b.as || dkxAs(), H = DKX_HEROES[as] || DKX_HEROES.drake;
var n = b.n || 1, st = DKX.fight = { b: b, k: k, hp: (b.hp || F.hp) * n, max: (b.hp || F.hp) * n, me: 40, meMax: 40, log: b.intro || "", turn: 0, guard: 0 };
if (!DKX.foes.length) {
var P = dkbPos(b.at);
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
dkxFoeAdd(b.foe, { sc: P.sc, x: P.x + (n > 1 ? Math.cos(a) * 3 : 0), z: P.z + (n > 1 ? Math.sin(a) * 3 : 0) });
}
}
var bar = function (v, m, c) { return "<div style='height:8px;background:rgba(255,255,255,.12);border-radius:4px;overflow:hidden;margin:2px 0 6px'><div style='height:100%;width:" + Math.max(0, Math.round(v / m * 100)) + "%;background:" + c + "'></div></div>"; };
var show = function () {
if (dkbKey() !== k) {
DKX.fight = null;
return;
}
var pows = (b.pow || H.pow).filter(function (p) { return !p.from || dkxHas(p.from) || (b.give && b.give.indexOf(p.from) >= 0); });
var h = DKB_H + "⚔️ " + esc((n > 1 ? n + " × " : "") + (b.name || F.name)) + "</div>" + bar(st.hp, st.max, "#E86A4A") + "<div style='font-size:12px;opacity:.85'>" + H.icon + " " + esc(H.name) + "</div>" + bar(st.me, st.meMax, "#6AD8A8") + "<div style='opacity:.92;margin:6px 0;line-height:1.5;min-height:40px'>" + st.log + "</div>", fns = {};
pows.forEach(function (p, i) { h += worldBtn("p" + i, p.n, p.guard ? "guard and strike" : p.heal ? "heal" : ""); fns["p" + i] = function () { turn(p); }; });
fns.away = function () { worldCard(null); DKX.fight = null; DKX.fightT = performance.now(); dkbSay("You step back. Come close again to fight on."); };
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
DKX.foes.forEach(function (o) { o.hurt = 0.5; });
if (typeof playTone === "function")
try {
playTone(w ? 520 : s ? 180 : 340, 0.06);
}
catch (e) { }
st.log = "<b>" + esc(p.n) + ".</b> " + esc(p.say) + (d > 0 ? " (" + (w ? "it hurts it badly" : s ? "it barely touches it" : "a good hit") + ")" : "");
if (st.hp <= 0) {
DKX.fight = null;
worldCard(null);
dkxFoesClear();
if (typeof dkbHeard === "function")
dkbHeard("won:" + b.foe);
if (b.won)
try {
b.won();
}
catch (e) { }
if (b.yes)
dkbSay(b.yes);
if (dkbKey() === k)
dkbStepDone();
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
function (title) {
var S = dkbS(), kp = typeof isKeeperNow === "function" && isKeeperNow(), upto = S.done || kp ? DKB_CH.length - 1 : S.ch, fns = {}, b = DKB_H + "📚 " + esc(title || "Heart of the Drakkyn") + "</div><p style='opacity:.85;margin:4px 0'>Every chapter you have reached, in the book's own words.</p><div style='max-height:50vh;overflow:auto'>";
for (var i = 0; i <= upto; i++) {
if (DKB_CH[i].txt == null)
continue;
b += "<span data-w='r" + i + "' role='button' style='display:block;margin:2px 0;padding:4px 8px;border:1px solid rgba(232,192,96,.4);border-radius:3px'>" + dkbLabel(i) + "</span>";
(function (j) { fns["r" + j] = function () { dkbReadAll(j); }; })(i);
}
b += "</div>";
fns.back = function () { worldCard(null); };
b += worldBtn("back", "Close", "");
worldCard(b, fns);
},
function (g, col, s) {
s = s || 1;
var M = dkwM("wing" + col, function () {
var t = dkwCanvas("wingT" + col, 128, 256, function (c, W, H) { c.clearRect(0, 0, W, H); var cs = "#" + ("000000" + col.toString(16)).slice(-6); var gr = c.createLinearGradient(0, 0, W, H); gr.addColorStop(0, cs); gr.addColorStop(1, "rgba(255,255,255,.3)"); c.fillStyle = gr; c.beginPath(); c.moveTo(4, H - 10); c.bezierCurveTo(10, 20, W - 10, 0, W - 6, 60); c.bezierCurveTo(W - 20, 140, 40, 200, 4, H - 10); c.fill(); c.strokeStyle = "rgba(255,255,255,.6)"; c.lineWidth = 2; for (var i = 0; i < 5; i++) {
c.beginPath();
c.moveTo(6, H - 12);
c.quadraticCurveTo(40 + i * 10, 120 - i * 10, W - 10 - i * 8, 40 + i * 20);
c.stroke();
} });
var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.75, side: THREE.DoubleSide, depthWrite: false });
m.userData.noPhoto = 1;
return m;
});
[-1, 1].forEach(function (k) { var w = new THREE.Mesh(dkwGeo("wingG", function () { var p = new THREE.PlaneGeometry(0.6, 1.1); p.translate(0.3, 0.25, 0); return p; }), M); w.position.set(k * 0.06 * s, 1.32 * s, -0.12 * s); w.rotation.y = k > 0 ? -0.5 : Math.PI + 0.5; w.scale.setScalar(s); g.add(w); });
},
function (g) {
var st = dkwShine(0x5A5E66, 0.35, 0.85), br = dkwShine(0xA8783A, 0.3, 0.9), ru = dkwGlowM(0x3AE8C8, 0.8);
dkwBox(g, 1.6, 1.9, 1.0, st, 0, 3.6, 0);
dkwBox(g, 1.7, 0.18, 1.05, br, 0, 4.3, 0);
dkwBox(g, 1.7, 0.18, 1.05, br, 0, 3.9, 0);
dkwBox(g, 0.8, 0.7, 0.8, st, 0, 5.55, 0);
[-1, 1].forEach(function (k) {
dkwBox(g, 0.62, 1.8, 0.62, st, k * 1.15, 3.3, 0);
dkwBox(g, 0.7, 1.8, 0.7, st, k * 0.45, 0, 0);
dkwBox(g, 0.74, 1.7, 0.74, st, k * 0.45, 1.8, 0);
dkwBox(g, 0.8, 0.5, 0.8, br, k * 1.15, 4.9, 0);
var e = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), dkwGlowM(0x6AC8FF, 1));
e.position.set(k * 0.17, 5.95, 0.41);
g.add(e);
});
for (var i = 0; i < 14; i++) {
var r = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.2), ru);
r.position.set(-0.6 + (i % 5) * 0.3, 2.2 + Math.floor(i / 5) * 0.7 + (i % 2) * 0.12, 0.51);
g.add(r);
}
var sh = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 3.6, 8), dkwShine(0xD8DCE4, 0.1, 1));
sh.position.set(1.5, 3.2, 0.5);
sh.rotation.x = 0.35;
g.add(sh);
dkwBox(g, 1.2, 0.9, 1.0, st, 1.5, 4.6, 1.1);
g.userData.beast = 1;
},
function (g, s) {
var M = dkwM("spritefoxM", function () { var m = new THREE.MeshPhongMaterial({ color: 0x4A3A7A, emissive: 0x2A1A5A, transparent: true, opacity: 0.8, shininess: 40 }); return m; }), tip = dkwGlowM(0xC8A8FF, 0.7);
dkwEll(g, M, 0.32 * s, 0.34 * s, 0.85 * s, 0, 0.75 * s, 0, 14);
var hd = dkwEll(g, M, 0.22 * s, 0.2 * s, 0.3 * s, 0, 1.0 * s, 0.95 * s, 12);
dkwEll(g, M, 0.09 * s, 0.08 * s, 0.22 * s, 0, 0.95 * s, 1.25 * s, 10);
[-1, 1].forEach(function (k) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.04 * s, 8, 6), dkwGlowM(0xFF5A3A, 1)); e.position.set(k * 0.09 * s, 1.06 * s, 1.18 * s); g.add(e); var ear = new THREE.Mesh(new THREE.ConeGeometry(0.08 * s, 0.28 * s, 5), M); ear.position.set(k * 0.12 * s, 1.28 * s, 0.9 * s); g.add(ear); });
[[-1, 0.5], [1, 0.5], [-1, -0.5], [1, -0.5]].forEach(function (q) { g.add(dkwLeg(g, M, q[0] * 0.18 * s, 0.7 * s, q[1] * s, 0.7 * s, 0.08 * s, { bend: q[1] > 0 ? -1 : 1 })); });
var tl = new THREE.Mesh(dkwTaper([[0, 0.8 * s, -0.8 * s], [0, 1.0 * s, -1.3 * s], [0, 1.3 * s, -1.6 * s], [0, 1.4 * s, -1.7 * s]], [0.12 * s, 0.22 * s, 0.18 * s, 0.04 * s], 12, 8), M);
g.add(tl);
var tt = new THREE.Mesh(new THREE.SphereGeometry(0.12 * s, 8, 6), tip);
tt.position.set(0, 1.38 * s, -1.66 * s);
g.add(tt);
g.userData.beast = 1;
},
function (s) { return dxAfter("hollow")(s) ? "msdawn" : dxAfter("hills")(s) ? "msmoons" : dxAfter("hail")(s) && !dxAfter("hailend")(s) ? "mshail" : dxAfter("forest")(s) ? "msforest" : dxAfter("glass")(s) ? "msglass" : dxAfter("fog")(s) && !dxAfter("fogout")(s) ? "msfog" : dxAfter("marsh")(s) ? "msmarsh" : dxAfter("night")(s) && !dxAfter("morning")(s) ? "msnight" : null; },
function (g) {
var e = new THREE.Mesh(new THREE.SphereGeometry(0.06, 14, 10), dkwShine(0xF8F8F0, 0.1, 0.4));
e.position.set(0, 1.64, 0.08);
g.add(e);
var ir = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 8), dkwGlowM(0x6A3AE8, 0.6));
ir.position.set(0, 1.645, 0.125);
g.add(ir);
var sk = dkwShine(0xE8E4DC, 0.2, 0.5);
[[-1, 1.25], [1, 1.25], [-1, 1.05], [1, 1.05]].forEach(function (q) { var ar = new THREE.Mesh(dkwTaper([[q[0] * 0.18, q[1], 0], [q[0] * 0.36, q[1] - 0.1, 0.2], [q[0] * 0.32, q[1] - 0.05, 0.42]], [0.045, 0.04, 0.03], 10, 6), sk); g.add(ar); });
},
function (g) {
var ink = dkwM("cartoInk", function () { var t = dkwCanvas("cartoInkT", 128, 128, function (c, W, H) { c.clearRect(0, 0, W, H); c.strokeStyle = "rgba(20,20,40,.85)"; c.lineWidth = 1.4; for (var i = 0; i < 30; i++) {
c.beginPath();
c.moveTo(Math.random() * W, Math.random() * H);
c.bezierCurveTo(Math.random() * W, Math.random() * H, Math.random() * W, Math.random() * H, Math.random() * W, Math.random() * H);
c.stroke();
} }); var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false }); m.userData.noPhoto = 1; return m; });
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.115, 14, 10), ink);
hd.position.set(0, 1.62, 0.01);
g.add(hd);
[-1, 1].forEach(function (k) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), dkwGlowM(0xF0F8FF, 1)); e.position.set(k * 0.034, 1.634, 0.1); g.add(e); });
},
function (g) { var h = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 8), dkwShine(0xB8C0C8, 0.15, 0.95)); h.position.y = 1.66; h.scale.set(1, 1.05, 1.1); g.add(h); var v = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.04), dkwShine(0x8A9AAA, 0.05, 1)); v.position.set(0, 1.66, 0.15); g.add(v); var r = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.7), dkwShine(0x2A2E34, 0.3, 0.8)); r.position.set(0.22, 1.1, 0.3); g.add(r); },
function (g) { dkfEyes(g, 0x0A0A0A); var md = new THREE.Mesh(new THREE.CircleGeometry(0.07, 16), dkwShine(0xC8A060, 0.2, 0.9)); md.position.set(0, 1.3, 0.16); g.add(md); [0xFF6A2A, 0x3A8AFF, 0x6AC84A, 0xE8F0FF, 0x8AE8FF].forEach(function (c, i) { var d = new THREE.Mesh(new THREE.SphereGeometry(0.012, 6, 4), dkwGlowM(c, 1)); var a = i / 5 * Math.PI * 2; d.position.set(Math.cos(a) * 0.045, 1.3 + Math.sin(a) * 0.045, 0.17); g.add(d); }); },
function (g) { for (var j = 0; j < 6; j++) {
var r = new THREE.Mesh(new THREE.TorusGeometry(0.35 + j * 0.14, 0.04, 4, 18), dkwGlowM(0xE8F8FF, 0.55));
r.position.y = 0.4 + j * 0.32;
r.rotation.x = Math.PI / 2 + Math.sin(j) * 0.3;
g.add(r);
} [-1, 1].forEach(function (s) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), dkwGlowM(0x6AB8FF, 1)); e.position.set(s * 0.1, 2, 0.3); g.add(e); }); },
function (g) { dkfEyes(g, 0xFF8A2A); g.scale.setScalar(1.18); var hm = new THREE.Group(); dkwCyl(hm, 0.025, 0.025, 1.5, dkwShine(0x3A2A1A, 0.5, 0.3), 0, 0, 0, 8); var hd = dkwBox(hm, 0.34, 0.2, 0.18, dkwShine(0x8A9AB8, 0.25, 0.95), 0, 1.5, 0); hm.position.set(0.32, 0, 0.18); g.add(hm); dkwCyl(g, 0.07, 0.07, 0.36, dkwShine(0xC8884A, 0.3, 0.9), -0.09, 0.14, 0, 10); },
function (T) {
var S = 2, NX = Math.ceil(T.w / S) + 1, NZ = Math.ceil(T.d / S) + 1, O = new Uint8Array(NX * NZ), mark = function (x, z, r) { var i0 = Math.floor((x - r - T.x0) / S), i1 = Math.ceil((x + r - T.x0) / S), j0 = Math.floor((z - r - T.z0) / S), j1 = Math.ceil((z + r - T.z0) / S); for (var i = Math.max(0, i0); i <= Math.min(NX - 1, i1); i++)
for (var j = Math.max(0, j0); j <= Math.min(NZ - 1, j1); j++)
O[j * NX + i] = 1; };
DKGL.strips.forEach(function (s) { var r = s.w / 2 + 0.6; for (var k = 0; k < s.pts.length - 1; k++) {
var a = s.pts[k], b = s.pts[k + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / 1.5));
for (var q = 0; q <= n; q++)
mark(a[0] + (b[0] - a[0]) * q / n, a[1] + (b[1] - a[1]) * q / n, r);
} });
(DKW.water || []).forEach(function (m) { try {
if (!m.geometry)
return;
m.geometry.computeBoundingBox();
var B = m.geometry.boundingBox.clone();
m.updateMatrix();
B.applyMatrix4(m.matrix);
var p = m.parent;
while (p && p !== DKW.scG) {
p.updateMatrix();
B.applyMatrix4(p.matrix);
p = p.parent;
}
if (p !== DKW.scG || B.max.x - B.min.x > 1500)
return;
for (var x = B.min.x; x <= B.max.x; x += S)
for (var z = B.min.z; z <= B.max.z; z += S)
mark(x, z, 1);
}
catch (e) { } });
(DKW.floors || []).forEach(function (F) { if (F.y < -500)
return; var r = F.r !== undefined ? F.r : Math.max(F.hw, F.hd); if (r > 300)
return; for (var x = -r; x <= r; x += S)
for (var z = -r; z <= r; z += S) {
if (dkwFloorIn(F, F.x + x, F.z + z))
mark(F.x + x, F.z + z, 0.5);
} });
return { S: S, NX: NX, NZ: NZ, O: O };
},
function () {
if (typeof aupMeadow !== "function" || !DKW.scG || !DKW.sc)
return;
var G = DKW.scG;
if (G.userData.dkgl)
return;
G.userData.dkgl = 1;
var lite = dkwLite(), origin = (function () { G.updateMatrixWorld(true); var v = new THREE.Vector3(); G.getWorldPosition(v); return v.x; })();
DKGL.terr.slice().forEach(function (T, ti) {
if (T.w < 150 || T.d < 150)
return;
var kind = dkcKindOf(T.mat);
if (!kind)
return;
var K = DKGL.kinds[kind], O = dkcOcc(T);
var grow = function (x, z) { var i = Math.round((x - T.x0) / O.S), j = Math.round((z - T.z0) / O.S); if (i < 0 || j < 0 || i >= O.NX || j >= O.NZ || O.O[j * O.NX + i])
return false; var h = dkcTerrTop(T, x, z); if (h == null)
return false; return !(typeof dkwSolidAt === "function" && dkwSolidAt(x, z, h)); };
var hgt = function (x, z) { var h = dkcTerrTop(T, x, z); return h == null ? -999 : h; }, L = dkwLocalSc();
var fixC = function (im) { if (im && !im.instanceColor) {
var n = im.instanceMatrix.count, a = new Float32Array(n * 3).fill(1);
im.instanceColor = new THREE.InstancedBufferAttribute(a, 3);
} return im; };
try {
if (T.w >= 500 && T.d >= 500 && !(DKGL.noWild || {})[DKW.sc])
dkcWildLand(G, T, kind, O, ti);
}
catch (e) {
if (window.console)
console.warn("[drakkyn] wild", DKW.sc, e);
}
try {
fixC(aupMeadow(G, { lite: lite, origin: origin, start: [L.x, L.z], height: hgt, grow: grow, hMin: K.h, hVar: K.v, dens: K.dens, seed: (DKW.sc.length * 131 + ti * 17) % 997, cols: (DKGL.scCols && DKGL.scCols[DKW.sc]) || K.cols }));
if (K.fl && !lite) {
var fc = [0xE8D04A, 0xF0F0E8, 0xC86AB0, 0x8A7AE0, 0xE87A4A][(DKW.sc.length * 7) % 5];
fixC(aupMeadow(G, { lite: lite, origin: origin, start: [L.x, L.z], height: hgt, grow: grow, hMin: 0.1, hVar: 0.08, dens: -0.45, seed: (DKW.sc.length * 53 + ti) % 991 + 5, cols: { base: fc, lush: new THREE.Color(fc).multiplyScalar(0.8).getHex(), dry: 0xF4F0E0 } }));
}
}
catch (e) {
if (window.console)
console.warn("[drakkyn] ground", DKW.sc, e);
}
});
},
function (G, T, kind, O, ti) {
var lite = dkwLite(), R = wRand(T.nx * 31 + T.nz * 7 + ti), sc = DKW.sc;
var places = Object.keys(DKW_AT).map(function (k) { return DKW_AT[k]; }).filter(function (A) { return A.sc === sc && (A.y == null || A.y > -500); });
var ok = function (x, z, clear) {
var i = Math.round((x - T.x0) / O.S), j = Math.round((z - T.z0) / O.S);
if (i < 1 || j < 1 || i >= O.NX - 1 || j >= O.NZ - 1)
return false;
for (var a = -2; a <= 2; a++)
for (var b = -2; b <= 2; b++) {
var ii = i + a, jj = j + b;
if (ii >= 0 && jj >= 0 && ii < O.NX && jj < O.NZ && O.O[jj * O.NX + ii])
return false;
}
for (var k = 0; k < places.length; k++)
if (Math.hypot(places[k].x - x, places[k].z - z) < clear)
return false;
var h = dkcTerrTop(T, x, z);
if (h == null || h < 0.3)
return false;
return !(typeof dkwSolidAt === "function" && dkwSolidAt(x, z, h));
};
var trees = [], bushes = [], rocks = [], area = T.w * T.d, ng = Math.round(area / (lite ? 120000 : 65000));
for (var g = 0; g < ng; g++) {
var cx = T.x0 + 30 + R() * (T.w - 60), cz = T.z0 + 30 + R() * (T.d - 60);
if (!ok(cx, cz, 34))
continue;
var nt = (lite ? 3 : 5) + Math.floor(R() * (lite ? 3 : 6));
for (var t = 0; t < nt; t++) {
var a = R() * 6.283, r = R() * 16, x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
if (!ok(x, z, 26))
continue;
trees.push({ x: x, y: dkcTerrTop(T, x, z) - 0.2, z: z, ry: R() * 6.28, s: 0.8 + R() * 0.6 });
}
for (t = 0; t < (lite ? 2 : 5); t++) {
a = R() * 6.283;
r = 6 + R() * 20;
x = cx + Math.cos(a) * r;
z = cz + Math.sin(a) * r;
if (!ok(x, z, 22))
continue;
bushes.push({ x: x, y: dkcTerrTop(T, x, z) - 0.1, z: z, ry: R() * 6.28, s: 0.7 + R() * 0.7 });
}
}
var nr = Math.round(area / (lite ? 60000 : 26000));
for (var k = 0; k < nr; k++) {
var x = T.x0 + 20 + R() * (T.w - 40), z = T.z0 + 20 + R() * (T.d - 40);
if (!ok(x, z, 20))
continue;
var s = 0.6 + Math.pow(R(), 2) * 2.6;
rocks.push({ x: x, y: dkcTerrTop(T, x, z) - s * 0.25, z: z, ry: R() * 6.28, s: s });
if (R() < 0.5) {
for (var q = 0; q < 3; q++) {
var x2 = x + (R() - 0.5) * s * 4, z2 = z + (R() - 0.5) * s * 4;
if (ok(x2, z2, 20))
rocks.push({ x: x2, y: dkcTerrTop(T, x2, z2) - 0.15, z: z2, ry: R() * 6.28, s: 0.3 + R() * 0.6 });
}
}
}
var cell = function (l) { var m = {}; l.forEach(function (t) { var k = Math.floor(t.x / 320) + "," + Math.floor(t.z / 320); (m[k] = m[k] || []).push(t); }); return Object.keys(m).map(function (k) { return m[k]; }); };
var each = function (kind2, l, o) { cell(l).forEach(function (p) { dkwPlant(G, kind2, p, o); }); };
if (kind === "snow") {
each("conifer", trees, { keepAll: 1 });
each("rock", rocks, { mat: dkwS("b:cave", 0x8A8E96, 3) });
}
else if (kind === "stucco") {
each("rock", rocks, { mat: dkwS("b:cave", 0xB89A72, 3) });
}
else {
each("tree", trees, { keepAll: 1, col: kind === "earth" ? 0x6A7A3A : 0x4E7A34 });
each("bush", bushes, { keepAll: 1 });
each("rock", rocks, {});
}
trees.forEach(function (t) { dkwRound(t.x, t.z, 0.5 * t.s, t.y - 1, t.y + 12); });
rocks.forEach(function (t) { if (t.s > 1.2)
dkwRound(t.x, t.z, t.s * 0.8, t.y - 1, t.y + t.s * 0.8); });
},
function (a, b, r0, r1, seg) {
var dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], L = Math.sqrt(dx * dx + dy * dy + dz * dz), g = new THREE.CylinderGeometry(r1, r0, L, seg || 6, 1, true);
g.translate(0, L / 2, 0);
var q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(dx / L, dy / L, dz / L));
g.applyMatrix4(new THREE.Matrix4().makeRotationFromQuaternion(q));
g.translate(a[0], a[1], a[2]);
return g.index ? g.toNonIndexed() : g;
},
function (o) {
var R = wRand(o.seed || 7), H = o.h, parts = [], tips = [], lite = dkwLite();
var bx = (R() - 0.5) * 0.5, bz = (R() - 0.5) * 0.5, p0 = [0, -0.3, 0], p1 = [bx * 0.4, H * 0.35, bz * 0.4], p2 = [bx, H * o.fork, bz];
parts.push(dkgtLimb(p0, p1, o.r, o.r * 0.82, lite ? 7 : 10));
parts.push(dkgtLimb(p1, p2, o.r * 0.82, o.r * 0.6, lite ? 7 : 10));
for (var i = 0; i < (lite ? 3 : 5); i++) {
var a = i / (lite ? 3 : 5) * 6.283 + R() * 0.5;
parts.push(dkgtLimb([Math.cos(a) * o.r * 2.2, -0.25, Math.sin(a) * o.r * 2.2], [Math.cos(a) * o.r * 0.4, o.r * 2.2, Math.sin(a) * o.r * 0.4], o.r * 0.18, o.r * 0.5, 5));
}
var n = o.limbs || 5;
for (var k = 0; k < n; k++) {
var a = k / n * 6.283 + R() * 0.6, up = o.up + (R() - 0.5) * 0.3, len = o.len * (0.8 + R() * 0.4), y0 = H * o.fork - R() * H * 0.08;
var e = [p2[0] + Math.cos(a) * Math.cos(up) * len, y0 + Math.sin(up) * len, p2[2] + Math.sin(a) * Math.cos(up) * len];
parts.push(dkgtLimb([p2[0], y0, p2[2]], e, o.r * 0.42, o.r * 0.16, lite ? 5 : 7));
tips.push(e);
for (var t = 0; t < (lite ? 1 : 2); t++) {
var a2 = a + (t ? 0.7 : -0.7) + (R() - 0.5) * 0.4, l2 = len * 0.55, f = 0.55 + R() * 0.25, s = [p2[0] + (e[0] - p2[0]) * f, y0 + (e[1] - y0) * f, p2[2] + (e[2] - p2[2]) * f];
var e2 = [s[0] + Math.cos(a2) * l2 * 0.8, s[1] + l2 * 0.6, s[2] + Math.sin(a2) * l2 * 0.8];
parts.push(dkgtLimb(s, e2, o.r * 0.14, o.r * 0.05, 4));
tips.push(e2);
}
}
var top = [p2[0] + (R() - 0.5), H * o.fork + o.len * 0.9, p2[2] + (R() - 0.5)];
parts.push(dkgtLimb(p2, top, o.r * 0.4, o.r * 0.12, 6));
tips.push(top);
var g = gwMerge(parts);
g.computeVertexNormals && 0;
return { g: g, tips: tips };
},
function (o, tips) {
var R = wRand((o.seed || 7) + 101), lite = dkwLite(), parts = [], cen = new THREE.Vector3(0, o.cy, 0), sprays = [];
tips.forEach(function (t) { sprays.push([t[0], t[1] + o.sz * 0.15, t[2], o.sz * (1 + R() * 0.3)]); });
var nt = sprays.length, n = lite ? Math.round(o.n * 0.25) : Math.round(o.n * 0.5);
for (var i = 0; i < n; i++) {
var u = R() * 6.283, v = Math.acos(1 - 2 * R()), r = 0.55 + Math.pow(R(), 0.5) * 0.45;
sprays.push([Math.cos(u) * Math.sin(v) * o.rx * r, o.cy + Math.cos(v) * o.ry * r, Math.sin(u) * Math.sin(v) * o.rx * r, o.sz * (0.75 + R() * 0.5)]);
}
sprays.forEach(function (s, si) {
var w = s[3] * 0.9, ry = R() * 3.1416, tilt = (R() - 0.5) * 0.6;
for (var c = 0; c < (si < nt ? 2 : 1); c++) {
var p = new THREE.PlaneGeometry(w, w);
if (c === 1)
p.rotateX(-Math.PI / 2 + tilt);
else
p.rotateX(tilt * 0.5);
p.rotateY(ry);
p.translate(s[0], s[1], s[2]);
parts.push(p.index ? p.toNonIndexed() : p);
}
});
var core = new THREE.IcosahedronGeometry(1, 1), cp = core.attributes.position, RR = wRand(o.seed || 3);
for (var q = 0; q < cp.count; q++) {
var k = 0.85 + RR() * 0.3;
cp.setXYZ(q, cp.getX(q) * o.rx * 0.7 * k, cp.getY(q) * o.ry * 0.68 * k + o.cy, cp.getZ(q) * o.rx * 0.7 * k);
}
core = core.index ? core.toNonIndexed() : core;
core.computeVertexNormals();
parts.push(core);
var g = gwMerge(parts), P = g.attributes.position, N = g.attributes.normal, v3 = new THREE.Vector3();
for (var j = 0; j < P.count; j++) {
v3.set(P.getX(j), P.getY(j), P.getZ(j)).sub(cen);
v3.y = v3.y * 0.6 + o.ry * 0.5;
v3.normalize();
N.setXYZ(j, v3.x, v3.y, v3.z);
}
g.userData.dkTreeCrown = 1;
return g;
},
function () {
var R = wRand(61), parts = [], n = dkwLite() ? 6 : 10;
for (var i = 0; i < n; i++) {
var t = i / n, r = 3.6 * (1 - t) + 0.35, y = 5 + t * 12.5, c = new THREE.ConeGeometry(r, 2.6 - t * 0.9, dkwLite() ? 9 : 16, 2, true), pa = c.attributes.position;
for (var j = 0; j < pa.count; j++) {
var py = pa.getY(j);
if (py < 0) {
var k = 1 + (R() - 0.5) * 0.5;
pa.setX(j, pa.getX(j) * k);
pa.setZ(j, pa.getZ(j) * k);
pa.setY(j, py - R() * 0.5);
}
}
c.computeVertexNormals();
c.rotateY(R() * 6.28);
c.translate(0, y, 0);
parts.push(c.index ? c.toNonIndexed() : c);
}
var tip = new THREE.ConeGeometry(0.3, 2, 6, 1, true);
tip.translate(0, 18.4, 0);
parts.push(tip.toNonIndexed());
var g = gwMerge(parts);
return g;
},
function (v) {
return dkwCanvas("dkgrPaint" + v, 256, 192, function (c, W, H) {
var R = wRand(4401 + v * 31), skies = [["#F4C88A", "#8AB8E8"], ["#E87A5A", "#3A2A5A"], ["#C8E8F4", "#5A8AC8"], ["#F4E0B0", "#C88A5A"], ["#B8A8E8", "#2A1A4A"], ["#E8F0F4", "#8AA8B8"]], s = skies[v % skies.length];
var gr = c.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, s[1]);
gr.addColorStop(0.62, s[0]);
c.fillStyle = gr;
c.fillRect(0, 0, W, H);
c.fillStyle = "rgba(255,248,220,0.85)";
c.beginPath();
c.arc(W * (0.2 + R() * 0.6), H * (0.2 + R() * 0.25), 8 + R() * 14, 0, 7);
c.fill();
for (var L = 0; L < 3; L++) {
var y0 = H * (0.5 + L * 0.13), col = ["#5A6A7A", "#3A5A3A", "#2A3A22"][L];
if (v % 3 === 1)
col = ["#7A5A6A", "#5A3A4A", "#2A1A2A"][L];
c.fillStyle = col;
c.beginPath();
c.moveTo(0, H);
for (var x = 0; x <= W; x += 8)
c.lineTo(x, y0 - Math.abs(Math.sin(x * 0.02 * (L + 1) + v + L * 2)) * H * (0.18 - L * 0.04) - R() * 4);
c.lineTo(W, H);
c.fill();
}
if (v % 2 === 0) {
c.fillStyle = "rgba(20,30,20,0.85)";
for (var t = 0; t < 6; t++) {
var tx = R() * W, ty = H * 0.78 + R() * H * 0.15, th = 20 + R() * 24;
c.beginPath();
c.moveTo(tx, ty - th);
c.lineTo(tx - th * 0.3, ty);
c.lineTo(tx + th * 0.3, ty);
c.fill();
}
}
c.strokeStyle = "rgba(0,0,0,0.25)";
c.lineWidth = 1;
for (var k = 0; k < 180; k++) {
var px = R() * W, py = R() * H;
c.beginPath();
c.moveTo(px, py);
c.lineTo(px + R() * 5 - 2.5, py + R() * 5 - 2.5);
c.stroke();
}
});
},
function (v) {
return dkwCanvas("dkgrScreen" + v, 256, 160, function (c, W, H) {
var R = wRand(771 + v * 13);
c.fillStyle = "#04121C";
c.fillRect(0, 0, W, H);
c.strokeStyle = "rgba(80,220,255,0.35)";
c.lineWidth = 1;
for (var x = 0; x < W; x += 16) {
c.beginPath();
c.moveTo(x, 0);
c.lineTo(x, H);
c.stroke();
}
for (var y = 0; y < H; y += 16) {
c.beginPath();
c.moveTo(0, y);
c.lineTo(W, y);
c.stroke();
}
c.strokeStyle = "#5AF0FF";
c.lineWidth = 2;
c.beginPath();
for (x = 0; x < W; x += 4)
c.lineTo(x, H * 0.5 + Math.sin(x * 0.05 + v) * H * 0.18 + Math.sin(x * 0.13) * 8);
c.stroke();
c.fillStyle = "#FFB84A";
for (var k = 0; k < 12; k++)
c.fillRect(10 + k * 20, H - 12 - R() * 50, 10, R() * 50 + 4);
c.fillStyle = "#BFF4FF";
c.font = "bold 14px monospace";
c.fillText(["AETHER FLUX", "CONTAINMENT", "SUBJECT 7", "VERRIN SYS", "CORE TEMP", "LEY LINES"][v % 6], 10, 20);
});
},
function (f, env) {
var M = {}, violet = /^(void|wraith|encell)$/.test(env || "");
if (f === "home") {
M.trim = dkwS("b:oak", 0x6A4630, 1.2, { shine: 30 });
M.panel = dkwS("b:oak", 0x8A5E3A, 1.4, { shine: 20 });
M.cornice = dkwLam(0xF4EEE2);
M.lamp = dkwMat("brass");
M.glow = dkwGlowM(0xFFE2A8);
}
else if (f === "stone") {
M.trim = dkwS("b:ashlar", 0x6A6460, 2.4);
M.pier = dkwS("b:ashlar", 0x7A746C, 2.4);
M.rib = dkwS("b:ashlar", 0x5E5852, 2.4);
M.lamp = dkwMat("iron");
M.glow = dkwGlowM(violet ? 0x9A5AFF : 0xFF9A3A);
M.fire = dkwGlowM(violet ? 0xC89AFF : 0xFFC86A, 0.85);
if (violet) {
M.pier = dkwS("b:slate", 0x2A2430, 3);
M.rib = dkwS("b:slate", 0x221E28, 3);
M.trim = dkwS("b:slate", 0x2E2834, 3);
}
}
else if (f === "palace") {
M.trim = dkwS("b:marble", 0xE8E0D4, 2.4, { shine: 60 });
M.pier = dkwS("b:marble", 0xF4EEE6, 2.4, { shine: 60 });
M.gold = dkwShine(0xE0B04A, 0.3, 0.85);
M.coffer = dkwS("b:marble", 0xD8CEC0, 2.4, { shine: 40 });
M.lamp = M.gold;
M.glow = dkwGlowM(0xFFE2A8);
M.banner = dkwLam(0x8A1A2A, { ds: 1 });
}
else if (f === "crystal") {
M.pier = dkwM("dkgrCrys", function () { var m = new THREE.MeshPhongMaterial({ color: 0xE8F4FF, emissive: 0x6A8AC8, emissiveIntensity: 0.45, shininess: 140, specular: 0xFFFFFF, transparent: true, opacity: 0.82 }); m.userData.noPhoto = 1; return m; });
M.trim = dkwShine(0xD8E0EC, 0.25, 0.9);
M.gold = M.trim;
M.glow = dkwGlowM(0xE8F4FF);
M.lamp = M.trim;
}
else if (f === "tech") {
M.trim = dkwShine(0x2A3038, 0.35, 0.7);
M.seam = dkwLam(0x0A0E14);
M.line = dkwGlowM(0x5AE8FF);
M.panel = dkwGlowM(0xE8F4FF);
M.lamp = M.trim;
}
return M;
},
function (g, W, D, H, o) {
var f = DKGR.fam[o.env || "indoor"];
if (o.noDress || !f || f === "none" || W < 5 || D < 5)
return;
var lite = dkwLite(), M = dkgrMats(f, o.env), B = {}, R = wRand(Math.round(W * 31 + D * 17 + H * 7));
var add = function (mk, w, h, d, x, y, z, ry) { var gg = new THREE.BoxGeometry(w, h, d), uv = gg.attributes.uv, dm = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]]; for (var f6 = 0; f6 < 6; f6++)
for (var v4 = 0; v4 < 4; v4++) {
var ii = f6 * 4 + v4;
uv.setXY(ii, uv.getX(ii) * dm[f6][0], uv.getY(ii) * dm[f6][1]);
} if (ry)
gg.rotateY(ry); gg.translate(x, y + h / 2, z); (B[mk] || (B[mk] = [])).push(gg.index ? gg.toNonIndexed() : gg); };
var gaps = [{ w: 2, u: 0, a: 1.3 }];
(o.gapN || []).forEach(function (q) { gaps.push({ w: 0, u: q[0], a: q[1] / 2 + 0.4 }); });
(o.clear || []).forEach(function (q) { gaps.push({ w: q[0] === 1 ? 2 : q[0] === 0 ? 0 : q[0] + 10, u: q[1], a: q[2] }); });
var walls = [{ L: W, p: function (u, i) { return [u, -D / 2 + i]; }, ry: 0 }, { L: W, p: function (u, i) { return [u, D / 2 - i]; }, ry: 0 }, { L: D, p: function (u, i) { return [-W / 2 + i, u]; }, ry: Math.PI / 2 }, { L: D, p: function (u, i) { return [W / 2 - i, u]; }, ry: Math.PI / 2 }];
var free = function (wi, u, half) { for (var k = 0; k < gaps.length; k++) {
var G = gaps[k];
if ((wi === 1 && G.w === 2) || (wi === 0 && G.w === 0) || (wi >= 2 && G.w === wi + 10)) {
if (Math.abs(u - G.u) < G.a + half)
return false;
}
} return true; };
var run = function (mk, wi, y, h, dep, inset) {
var Wl = walls[wi], L = Wl.L - 0.02, n = Math.ceil(L / 0.5), s = null;
for (var k = 0; k <= n; k++) {
var u = -L / 2 + k * L / n, ok = k < n && free(wi, u + L / n / 2, 0.05);
if (ok && s === null)
s = u;
if ((!ok || k === n) && s !== null) {
var e = u, len = e - s;
if (len > 0.3) {
var c = (s + e) / 2, P = Wl.p(c, (inset || 0) + dep / 2);
add(mk, Wl.ry ? dep : len, h, Wl.ry ? len : dep, P[0], y, P[1]);
}
s = null;
}
}
};
var each = function (wi, step, fn) { var L = walls[wi].L, n = Math.max(1, Math.floor(L / step)); for (var k = 0; k <= n; k++) {
var u = -L / 2 + L * k / n;
if (Math.abs(u) > L / 2 - 0.3)
continue;
if (!free(wi, u, 0.6))
continue;
fn(u, k);
} };
if (f === "home") {
for (var wi = 0; wi < 4; wi++) {
run("trim", wi, 0, 0.16, 0.04);
run("panel", wi, 0.16, 0.84, 0.025);
run("trim", wi, 1.0, 0.07, 0.06);
run("cornice", wi, H - 0.22, 0.22, 0.12);
}
var pv = Math.round(W * 3 + D);
for (wi = 0; wi < 4; wi++)
each(wi, wi < 2 ? W / 3 : D / 3, function (u, k) {
if (k % 2 === 0)
return;
var P = walls[wi].p(u, 0.05), ry = walls[wi].ry, pw = 1.1, ph = 0.8;
add("trim", ry ? 0.05 : pw + 0.14, ph + 0.14, ry ? pw + 0.14 : 0.05, P[0], 1.55, P[1]);
var pm = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), dkwLam(0xFFFFFF, { map: dkgrPaintTex(pv++ % 9), mapk: "dkgrP" + (pv % 9) }));
var Q = walls[wi].p(u, 0.08);
pm.position.set(Q[0], 1.62 + ph / 2, Q[1]);
pm.rotation.y = wi === 0 ? 0 : wi === 1 ? Math.PI : wi === 2 ? Math.PI / 2 : -Math.PI / 2;
g.add(pm);
});
for (wi = 0; wi < 4; wi++)
each(wi, wi < 2 ? W / 4 : D / 4, function (u, k) { if (k % 2)
return; var P = walls[wi].p(u, 0.1), ry = walls[wi].ry; add("lamp", ry ? 0.08 : 0.16, 0.3, ry ? 0.16 : 0.08, P[0], 2.1, P[1]); var Q = walls[wi].p(u, 0.22); add("glow", 0.16, 0.2, 0.16, Q[0], 2.38, Q[1]); });
}
else if (f === "stone") {
for (wi = 0; wi < 4; wi++) {
run("trim", wi, 0, 0.35, 0.12);
each(wi, 4.2, function (u) { var P = walls[wi].p(u, 0.3), ry = walls[wi].ry; add("pier", ry ? 0.6 : 1.0, H, ry ? 1.0 : 0.6, P[0], 0, P[1]); var Q = walls[wi].p(u, 0.4); add("trim", ry ? 0.8 : 1.2, 0.4, ry ? 1.2 : 0.8, Q[0], 0, Q[1]); });
}
var nr = Math.max(1, Math.floor(D / 4.2));
for (var r = 1; r < nr; r++) {
var z = -D / 2 + D * r / nr;
add("rib", W, 0.45, 0.5, 0, H - 0.45, z);
}
for (wi = 0; wi < 4; wi++)
each(wi, 4.2, function (u, k) { if (k % 2 === 0)
return; var P = walls[wi].p(u, 0.25), Q = walls[wi].p(u, 0.45); add("lamp", 0.12, 0.5, 0.12, P[0], 2.0, P[1]); add("lamp", 0.4, 0.18, 0.4, Q[0], 2.5, Q[1]); add("fire", 0.26, 0.32, 0.26, Q[0], 2.68, Q[1]); });
if (/^(dwar|tyr|trial)/.test(o.env || "") && typeof dkfCrysGeo === "function") {
var cc = [], pl = [], hang = [], cv = /forge/.test(o.env) ? 0xFFB86A : 0x8AE8FF;
for (wi = 0; wi < 4; wi++)
each(wi, 4.2, function (u, k) { if (k % 2)
return; var P = walls[wi].p(u + 1.2, 0.9); cc.push({ x: P[0], y: 0, z: P[1], ry: R() * 6.28, s: 0.8 + R() * 0.6 }); pl.push({ x: P[0], y: 0.03, z: P[1], rx: -Math.PI / 2, s: 1.2 }); });
if (W >= 24 && D >= 24)
for (var hx = -W / 2 + W / 4; hx < W / 2 - 1; hx += W / 4)
for (var hz = -D / 2 + D / 4; hz < D / 2 - 1; hz += D / 4) {
hang.push({ x: hx, y: H, z: hz, rx: Math.PI, s: 2.2 + R() * 1.2 });
}
dkwInst(g, dkfCrysGeo(), dkfCrysM(cv), cc.concat(hang), { cull: false });
dkwInst(g, dkwGeo("dkfPoolG", function () { return new THREE.PlaneGeometry(3.4, 3.4); }), dkfPoolM(cv), pl, { cull: false });
}
}
else if (f === "palace") {
for (wi = 0; wi < 4; wi++) {
run("trim", wi, 0, 0.3, 0.08);
run("trim", wi, 0.9, 0.08, 0.06);
run("gold", wi, H - 0.34, 0.1, 0.16);
run("trim", wi, H - 0.24, 0.24, 0.2);
each(wi, 3.4, function (u) { var P = walls[wi].p(u, 0.12), ry = walls[wi].ry; add("pier", ry ? 0.24 : 0.7, H - 0.5, ry ? 0.7 : 0.24, P[0], 0.3, P[1]); var Q = walls[wi].p(u, 0.16); add("gold", ry ? 0.32 : 0.86, 0.3, ry ? 0.86 : 0.32, Q[0], H - 0.66, Q[1]); add("gold", ry ? 0.3 : 0.8, 0.12, ry ? 0.8 : 0.3, Q[0], 0.3, Q[1]); });
}
var cs = Math.max(2.2, Math.min(4, W / 5));
for (var cx = -W / 2 + cs; cx < W / 2 - 0.5; cx += cs)
add("coffer", 0.25, 0.3, D, cx, H - 0.3, 0);
for (var cz = -D / 2 + cs; cz < D / 2 - 0.5; cz += cs)
add("coffer", W, 0.3, 0.25, 0, H - 0.3, cz);
for (wi = 0; wi < 2; wi++)
each(wi, 6.8, function (u, k) { if (k % 2 === 0)
return; var P = walls[wi].p(u, 0.14); add("banner", 1.3, Math.min(4, H * 0.45), 0.02, P[0], H - 0.7 - Math.min(4, H * 0.45), P[1]); add("gold", 1.5, 0.08, 0.08, P[0], H - 0.7, P[1]); });
for (wi = 0; wi < 4; wi++)
each(wi, 3.4, function (u, k) { if (k === 0)
return; var P = walls[wi].p(u - walls[wi].L / Math.max(1, Math.floor(walls[wi].L / 3.4)) / 2, 0.14); if (!free(wi, u, 1.2))
return; add("lamp", 0.12, 0.4, 0.12, P[0], 2.2, P[1]); add("glow", 0.2, 0.24, 0.2, P[0], 2.62, P[1]); });
}
else if (f === "crystal") {
for (wi = 0; wi < 4; wi++) {
run("trim", wi, 0, 0.14, 0.05);
run("trim", wi, H - 0.18, 0.18, 0.1);
each(wi, 3.6, function (u) { var P = walls[wi].p(u, 0.18), ry = walls[wi].ry; add("pier", ry ? 0.3 : 0.5, H - 0.4, ry ? 0.5 : 0.3, P[0], 0.14, P[1]); });
}
if (H > 4 && !lite) {
var ch = new THREE.Group();
ch.position.set(0, H, 0);
g.add(ch);
var cr = dkwM("dkgrCrys", function () { return M.pier; });
for (var k = 0; k < 14; k++) {
var a = k / 14 * 6.283, rr = 0.9 + (k % 2) * 0.5, len = 0.7 + (k % 3) * 0.4, m = new THREE.Mesh(dkwGeo("dkgrPr", function () { return new THREE.OctahedronGeometry(0.18, 0); }), cr);
m.scale.set(1, len / 0.36, 1);
m.position.set(Math.cos(a) * rr, -0.9 - (k % 3) * 0.3, Math.sin(a) * rr);
ch.add(m);
}
var ring = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.04, 6, 32), M.trim);
ring.rotation.x = Math.PI / 2;
ring.position.y = -0.6;
ch.add(ring);
add("lamp", 0.04, 0.6, 0.04, 0, H - 0.6, 0);
var core = new THREE.Mesh(dkwGeo("dkgrCore", function () { return new THREE.IcosahedronGeometry(0.32, 1); }), M.glow);
core.position.y = -1.0;
ch.add(core);
}
}
else if (f === "tech") {
for (wi = 0; wi < 4; wi++) {
run("seam", wi, 0, 0.12, 0.03);
run("line", wi, 0.12, 0.04, 0.035);
run("line", wi, H - 0.3, 0.04, 0.035);
run("trim", wi, H - 0.26, 0.26, 0.05);
each(wi, 2.4, function (u) { var P = walls[wi].p(u, 0.012), ry = walls[wi].ry; add("seam", ry ? 0.025 : 0.05, H - 0.4, ry ? 0.05 : 0.025, P[0], 0.16, P[1]); });
}
for (var px = -W / 2 + 2; px < W / 2 - 1; px += 3.2)
for (var pz = -D / 2 + 2; pz < D / 2 - 1; pz += 3.2) {
add("panel", 1.4, 0.03, 1.4, px, H - 0.04, pz);
add("trim", 1.6, 0.05, 1.6, px, H - 0.06, pz);
}
var sv = Math.round(W + D);
for (wi = 0; wi < 4; wi++)
each(wi, wi < 2 ? W / 3 : D / 3, function (u, k) {
if (k % 2 === 0)
return;
var Wl = walls[wi], P = Wl.p(u, 0.05);
add("trim", Wl.ry ? 0.06 : 1.5, 1.0, Wl.ry ? 1.5 : 0.06, P[0], 1.3, P[1]);
var sm = new THREE.Mesh(new THREE.PlaneGeometry(1.36, 0.86), dkwM("dkgrScr" + (sv % 6), function () { var m = new THREE.MeshBasicMaterial({ map: dkgrScreenTex(sv % 6) }); m.userData.noPhoto = 1; return m; }));
sv++;
var Q = Wl.p(u, 0.085);
sm.position.set(Q[0], 1.8, Q[1]);
sm.rotation.y = wi === 0 ? 0 : wi === 1 ? Math.PI : wi === 2 ? Math.PI / 2 : -Math.PI / 2;
g.add(sm);
});
}
Object.keys(B).forEach(function (k) { var mat = M[k]; if (!mat || !B[k].length)
return; var mg = gwMerge(B[k]), mesh = new THREE.Mesh(mg, mat); mesh.receiveShadow = true; mesh.name = "dkgr-" + k; mesh.raycast = function () { }; g.add(mesh); });
},
function (root) { if (!root)
return; var t = null; root.traverse(function (o) { if (o.isPoints && o.material && !o.material.map && !o.material.userData.dkgrDot) {
var m = o.material;
t = t || dkgrDotTex();
t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
m.map = t;
m.transparent = true;
m.alphaTest = 0.02;
m.depthWrite = false;
m.userData.dkgrDot = 1;
m.needsUpdate = true;
} }); },
function () {
dkamClose();
var sc = DKW.sc, S = typeof dkbS === "function" ? dkbS() : { seen: {} }, here = null;
DKAM_PLACES.forEach(function (p) { if (p.sc.indexOf(sc) >= 0)
here = p; });
var d = document.createElement("div");
d.id = "dkAwenMap";
d.style.cssText = "position:fixed;inset:0;z-index:99990;background:rgba(6,8,14,0.88);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:Georgia,serif;color:#F4ECD8";
var w = "min(94vw,calc(84vh*1.4125))", h = "";
h += "<div style='position:relative;width:" + w + ";aspect-ratio:452/320;border-radius:6px;box-shadow:0 8px 40px #000;overflow:hidden'><img src='assets/textures/drakkyn/awen-map.jpg' style='width:100%;height:100%;display:block' alt='The map of Awen'>";
DKAM_PLACES.forEach(function (p, i) {
var on = p === here, been = p.sc.some(function (k) { return S.seen && S.seen[k]; });
h += "<div title='" + p.n.replace(/'/g, "&#39;") + "' style='position:absolute;left:" + (p.x * 100) + "%;top:" + (p.y * 100) + "%;transform:translate(-50%,-50%);text-align:center;pointer-events:auto'>"
+ "<div style='width:" + (on ? 26 : 16) + "px;height:" + (on ? 26 : 16) + "px;margin:auto;border-radius:50%;background:" + p.c + ";border:2px solid " + (on ? "#FFF" : "rgba(255,255,255,0.75)") + ";box-shadow:0 0 " + (on ? 18 : 6) + "px " + p.c + (on ? ";animation:dkamPulse 1.2s ease-in-out infinite" : "") + "'></div>"
+ "<div style='" + (p.lab === "left" ? "position:absolute;right:100%;top:-2px;margin-right:4px;width:120px;" : "margin-top:2px;") + "font-size:" + (p.small ? 10 : 11.5) + "px;line-height:1.15;max-width:150px;padding:1px 5px;border-radius:4px;background:rgba(20,14,8,0.72);color:#FFF4DC;white-space:normal;" + (been || on ? "" : "opacity:.82;") + "'>" + (on ? "★ You are here<br>" : "") + p.n + "</div></div>";
});
h += "</div><div style='margin-top:10px;font-size:14px;opacity:.9;text-align:center;padding:0 12px'>" + (here ? "You are at <b>" + here.n + "</b>." : (sc === "zephyr" ? "You are aboard the Zephyr's Flame, high over Awen." : dkwSc0(sc).awen ? "You are in Awen." : "You are on Earth, in Dallas, 2077. Awen lies beyond the veil.")) + " &nbsp;<button id='dkamX' style='margin-left:8px;padding:6px 14px;border-radius:8px;border:1px solid #C8A86A;background:#2A2016;color:#F4ECD8;font-size:14px;cursor:pointer'>Close the map</button></div>"
+ "<style>@keyframes dkamPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.35)}}</style>";
d.innerHTML = h;
document.body.appendChild(d);
d.addEventListener("click", function (e) { if (e.target === d || e.target.id === "dkamX")
dkamClose(); });
document.addEventListener("keydown", dkamKey, true);
if (typeof worldCard === "function")
worldCard(null);
},
function () { return dkwGeo("dkfCrys", function () { var R = wRand(77), parts = []; for (var i = 0; i < 6; i++) {
var h = 0.5 + R() * 1.3, c = new THREE.CylinderGeometry(0, 0.14 + R() * 0.1, h, 5, 1);
c.translate(0, h / 2, 0);
c.rotateZ((R() - 0.5) * 0.9);
c.rotateX((R() - 0.5) * 0.9);
c.translate((R() - 0.5) * 0.5, 0, (R() - 0.5) * 0.5);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }); },
function (col) {
return dkwM("dkfPool" + col, function () {
var t = dkwCanvas("dkfPoolT", 64, 64, function (c, W, H) { var g = c.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, "rgba(255,255,255,0.9)"); g.addColorStop(1, "rgba(255,255,255,0)"); c.clearRect(0, 0, W, H); c.fillStyle = g; c.fillRect(0, 0, W, H); });
var m = new THREE.MeshBasicMaterial({ color: col, map: t, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending });
m.userData.noPhoto = 1;
return m;
});
},
function () {
return dkwGeo("dkdfFern", function () {
var parts = [], R = wRand(5);
for (var i = 0; i < 9; i++) {
var p = new THREE.PlaneGeometry(0.55, 1.5, 1, 3), a = i / 9 * 6.283 + R() * 0.3, pa = p.attributes.position;
for (var j = 0; j < pa.count; j++) {
var y = pa.getY(j) + 0.75;
pa.setXYZ(j, pa.getX(j), y * 0.55, 0.0 + y * y * 0.18);
}
p.rotateX(-0.75 - R() * 0.4);
p.translate(0, 0, 0.15);
p.rotateY(a);
parts.push(p.index ? p.toNonIndexed() : p);
}
var g = gwMerge(parts);
g.computeVertexNormals();
var N = g.attributes.normal;
for (var k = 0; k < N.count; k++)
N.setXYZ(k, 0, 1, 0);
return g;
});
},
function () {
return dkwGeo("dkdfLog", function () {
var g = new THREE.CylinderGeometry(0.55, 0.7, 9, 12, 6), p = g.attributes.position, R = wRand(9);
for (var i = 0; i < p.count; i++) {
var y = p.getY(i), k = 1 + Math.sin(y * 1.3) * 0.06 + (R() - 0.5) * 0.05;
p.setX(i, p.getX(i) * k);
p.setZ(i, p.getZ(i) * k);
}
var stub = new THREE.CylinderGeometry(0.12, 0.25, 2.2, 6);
stub.rotateZ(1.1);
stub.translate(0.7, 1.5, 0);
var stub2 = new THREE.CylinderGeometry(0.1, 0.2, 1.6, 6);
stub2.rotateX(-1.2);
stub2.translate(0, -2.2, 0.6);
var m = gwMerge([g.toNonIndexed(), stub.toNonIndexed(), stub2.toNonIndexed()]);
m.rotateZ(Math.PI / 2);
m.translate(0, 0.45, 0);
m.computeVertexNormals();
return m;
});
},
function () {
return dkwGeo("dkdfShroom", function () {
var parts = [], R = wRand(13);
for (var i = 0; i < 6; i++) {
var s = 0.25 + R() * 0.5, x = (R() - 0.5) * 0.9, z = (R() - 0.5) * 0.9;
var st = new THREE.CylinderGeometry(0.04 * s * 3, 0.06 * s * 3, 0.5 * s * 2, 6);
st.translate(x, 0.5 * s, z);
var cp = new THREE.SphereGeometry(0.35 * s, 10, 6, 0, 6.283, 0, 1.4);
cp.translate(x, s * 1.0, z);
parts.push(st.toNonIndexed(), cp.toNonIndexed());
}
return gwMerge(parts);
});
},
function () {
return dkwGeo("dkdfBeard", function () {
var parts = [];
for (var i = 0; i < 3; i++) {
var p = new THREE.PlaneGeometry(0.9, 4.2, 1, 4), pa = p.attributes.position;
for (var j = 0; j < pa.count; j++) {
var y = pa.getY(j);
pa.setX(j, pa.getX(j) * (0.4 + (y + 2.1) / 4.2 * 0.6));
pa.setZ(j, Math.sin(y * 1.2 + i) * 0.15);
}
p.translate(0, -2.1, 0);
p.rotateY(i / 3 * Math.PI);
parts.push(p.index ? p.toNonIndexed() : p);
}
return gwMerge(parts);
});
},
function () {
return dkwM("dkdfBeardM", function () {
var t = dkwCanvas("dkdfBeardT", 64, 256, function (c, W, H) { c.clearRect(0, 0, W, H); for (var i = 0; i < 90; i++) {
var x = 4 + Math.random() * (W - 8), l = H * (0.3 + Math.random() * 0.7);
c.strokeStyle = "rgba(" + (110 + Math.random() * 50 | 0) + "," + (130 + Math.random() * 50 | 0) + "," + (80 + Math.random() * 30 | 0) + ",0.9)";
c.lineWidth = 1 + Math.random() * 1.5;
c.beginPath();
c.moveTo(x, 0);
c.bezierCurveTo(x + 4, l * 0.3, x - 4, l * 0.6, x + (Math.random() - 0.5) * 6, l);
c.stroke();
} });
var m = new THREE.MeshLambertMaterial({ map: t, alphaTest: 0.35, side: THREE.DoubleSide, color: 0xB8C8A0 });
m.userData.noPhoto = 1;
return m;
});
},
function (col) {
return dkwM("tleafFern" + col, function () {
var t = dkwCanvas("dkdfFernT", 64, 128, function (c, W, H) {
c.clearRect(0, 0, W, H);
c.strokeStyle = "#4A7A30";
c.lineWidth = 3;
c.beginPath();
c.moveTo(W / 2, H);
c.lineTo(W / 2, 4);
c.stroke();
for (var i = 0; i < 22; i++) {
var y = H - 6 - i * (H - 10) / 22, l = (W / 2 - 3) * (0.35 + 0.65 * Math.sin((i + 1) / 23 * Math.PI));
c.fillStyle = "rgba(" + (60 + i * 2) + "," + (120 + i * 3) + ",50,1)";
[-1, 1].forEach(function (s) { c.beginPath(); c.moveTo(W / 2, y); c.quadraticCurveTo(W / 2 + s * l * 0.6, y - 6, W / 2 + s * l, y - 2); c.quadraticCurveTo(W / 2 + s * l * 0.5, y + 2, W / 2, y + 3); c.fill(); });
}
});
var m = new THREE.MeshLambertMaterial({ map: t, alphaTest: 0.4, side: THREE.DoubleSide, color: col || 0xFFFFFF });
m.userData.noPhoto = 1;
return m;
});
},
function () {
return dkwM("dkdfMist", function () {
var t = dkwCanvas("dkdfMistT", 128, 128, function (c, W, H) { var g = c.createRadialGradient(W / 2, H / 2, 4, W / 2, H / 2, W / 2); g.addColorStop(0, "rgba(255,255,255,0.55)"); g.addColorStop(0.6, "rgba(255,255,255,0.18)"); g.addColorStop(1, "rgba(255,255,255,0)"); c.fillStyle = g; c.fillRect(0, 0, W, H); });
var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.32, depthWrite: false, color: 0xD8E8F0, fog: true });
m.userData.noPhoto = 1;
return m;
});
},
function (G, o) {
var lite = dkwLite(), R = wRand(o.seed || 1), H = o.h, k = lite ? 0.4 : 1;
var ok = function (x, z, pad) { if (o.ok && !o.ok(x, z, pad || 0))
return false; var h = H(x, z); return !(typeof dkwSolidAt === "function" && dkwSolidAt(x, z, h)); };
var sc = function (seed, n, pad, s0, s1) { return dkwScatter(seed, Math.round(n * k), o.x0, o.z0, o.x1, o.z1, function (x, z) { return ok(x, z, pad); }, H, s0, s1); };
var far = [], put = function (fn) { far = far.concat(dkdfTake(G, fn)); };
var big = sc(o.seed + 1, o.trees, o.pad || 7, 1.5, 2.5), mid = sc(o.seed + 2, o.trees * 0.8, o.pad || 6, 1.0, 1.6);
dkdfCells(big, 140).forEach(function (p) { put(function () { dkwPlant(G, "tree", p.map(function (t) { return { x: t.x, y: t.y - 0.3, z: t.z, ry: t.ry, s: t.s }; }), { keepAll: 1, col: o.leaf || 0x3E7A30 }); }); });
dkdfCells(mid, 140).forEach(function (p) { put(function () { dkwPlant(G, "tree", p, { keepAll: 1, col: o.leaf2 || 0x2E6A2A }); }); });
big.concat(mid).forEach(function (t) { dkwRound(t.x, t.z, 0.55 * t.s, t.y - 1, t.y + 14 * t.s); });
var beards = [];
big.forEach(function (t, i) { if (i % 2)
return; for (var q = 0; q < 3; q++) {
var a = R() * 6.283, d = (1.6 + R() * 1.8) * t.s;
beards.push({ x: t.x + Math.cos(a) * d, y: t.y + (7.6 + R() * 1.6) * t.s, z: t.z + Math.sin(a) * d, ry: R() * 6.28, s: 0.8 + R() * 0.6 });
} });
dkdfCells(beards, 140).forEach(function (p) { put(function () { dkwInst(G, dkdfBeardGeo(), dkdfBeardM(), p, {}); }); });
var ferns = sc(o.seed + 3, o.ferns || 1400, 1.2, 0.8, 1.6);
dkdfCells(ferns, 120).forEach(function (p) { put(function () { var im = dkwInst(G, dkdfFernGeo(), dkdfFernM(o.fern || 0xFFFFFF), p, {}); }); });
var bush = sc(o.seed + 4, o.bushes || 420, 2, 0.8, 1.6);
dkdfCells(bush, 140).forEach(function (p) { put(function () { dkwPlant(G, "bush", p, { keepAll: 1 }); }); });
var logs = sc(o.seed + 5, o.logs || 70, 6, 0.7, 1.2);
dkdfCells(logs, 160).forEach(function (p) { put(function () { dkwInst(G, dkdfLogGeo(), dkwMat("bark"), p, { shadow: !lite }); dkwInst(G, dkdfLogMossGeo(), dkwS("b:moss", 0x5A7A3A, 2), p, {}); }); });
logs.forEach(function (t) { var c = Math.cos(t.ry), s = Math.sin(t.ry); dkwSolid(t.x, t.z, 9 * t.s, 1.4 * t.s, t.y - 1, t.y + 1.2 * t.s, t.ry); });
var rocks = sc(o.seed + 6, o.rocks || 160, 4, 0.6, 2.4);
dkdfCells(rocks, 160).forEach(function (p) { put(function () { dkwPlant(G, "rock", p, { mat: dkwS("b:moss", 0x5A6A4A, 3) }); }); });
rocks.forEach(function (t) { if (t.s > 1.3)
dkwRound(t.x, t.z, t.s * 0.7, t.y - 1, t.y + t.s); });
var sh = sc(o.seed + 7, o.shrooms || 200, 1, 0.6, 1.4);
var shA = sh.filter(function (t, i) { return i % 3 === 0; }), shB = sh.filter(function (t, i) { return i % 3 !== 0; });
dkdfCells(shA, 160).forEach(function (p) { put(function () { dkwInst(G, dkdfShroomGeo(), dkwGlowM(o.glow || 0x8AE8C8), p, {}); }); });
dkdfCells(shB, 160).forEach(function (p) { put(function () { dkwInst(G, dkdfShroomGeo(), dkwShine(0xC8A07A, 0.7, 0), p, {}); }); });
if (!lite && o.path) {
var mm = dkdfMistM(), shm = dkdfShaftM(o.shaft);
for (var i = 0; i < (o.mists || 26); i++) {
var pt = o.path[Math.floor(R() * (o.path.length - 1))], pt2 = o.path[Math.min(o.path.length - 1, o.path.indexOf(pt) + 1)], f = R(), mx = pt[0] + (pt2[0] - pt[0]) * f + (R() - 0.5) * 40, mz = pt[1] + (pt2[1] - pt[1]) * f + (R() - 0.5) * 40;
var mi = new THREE.Mesh(new THREE.PlaneGeometry(24 + R() * 20, 24 + R() * 20), mm);
mi.rotation.x = -Math.PI / 2;
mi.position.set(mx, H(mx, mz) + 0.6 + R() * 0.8, mz);
G.add(mi);
}
for (i = 0; i < (o.shafts || 18); i++) {
var p1 = o.path[Math.floor(R() * (o.path.length - 1))], sx = p1[0] + (R() - 0.5) * 30, sz = p1[1] + (R() - 0.5) * 30, sy = H(sx, sz);
var cs = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 3.6, 30, 10, 1, true), shm);
cs.position.set(sx, sy + 15, sz);
cs.rotation.z = 0.18;
cs.rotation.y = R() * 6.28;
G.add(cs);
}
}
dkdfFar(far, o.far || 320);
return { trees: big.concat(mid) };
},
function (seed, n, path, dmin, dmax, ok, H, s0, s1) {
var R = wRand(seed), out = [], L = 0, seg = [];
for (var i = 0; i < path.length - 1; i++) {
var l = Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]);
seg.push([L, l]);
L += l;
}
var tries = 0;
while (out.length < n && tries < n * 10) {
tries++;
var d = R() * L, j = 0;
while (j < seg.length - 1 && seg[j][0] + seg[j][1] < d)
j++;
var f = (d - seg[j][0]) / seg[j][1], a = path[j], b = path[j + 1], px = a[0] + (b[0] - a[0]) * f, pz = a[1] + (b[1] - a[1]) * f, dx = (b[0] - a[0]) / seg[j][1], dz = (b[1] - a[1]) / seg[j][1];
var off = (dmin + Math.pow(R(), 0.8) * (dmax - dmin)) * (R() < 0.5 ? -1 : 1), x = px - dz * off + (R() - 0.5) * 8, z = pz + dx * off + (R() - 0.5) * 8;
if (ok && !ok(x, z))
continue;
out.push({ x: x, z: z, y: H(x, z), s: s0 + R() * (s1 - s0), ry: R() * 6.283 });
}
return out;
},
function (sc) {
var L = Object.keys(DKW_AT).map(function (k) { return DKW_AT[k]; }).filter(function (A) { return A && A.sc === sc && (A.y == null || A.y > -500) && typeof A.x === "number"; });
var out = [];
L.forEach(function (A) { if (!out.length || Math.hypot(out[out.length - 1][0] - A.x, out[out.length - 1][1] - A.z) > 6)
out.push([A.x, A.z]); });
return out;
},
function (G, sc, c) {
var lite = dkwLite(), k = lite ? 0.35 : 1, H = DKW_SCN[sc].h || function () { return 0; }, R = wRand(sc.length * 977 + 31), path = dkldPath(sc);
if (path.length < 2)
return;
var spots = Object.keys(DKW_AT).map(function (q) { return DKW_AT[q]; }).filter(function (A) { return A && A.sc === sc && (A.y == null || A.y > -500); });
var B = (DKW_SC[sc] && DKW_SC[sc].bound) || 900;
var ok = function (pad) { return function (x, z) { if (Math.abs(x) > B - 20 || Math.abs(z) > B - 20)
return false; for (var i = 0; i < spots.length; i++)
if (Math.hypot(spots[i].x - x, spots[i].z - z) < 10 + pad)
return false; if (dkwPathD(x, z, path) < 5 + pad)
return false; var h = H(x, z); if (!(h > -50))
return false; if (c.water && h < c.water)
return false; return !(typeof dkwSolidAt === "function" && (dkwSolidAt(x, z, h) || dkwSolidAt(x + 2, z, h) || dkwSolidAt(x - 2, z, h) || dkwSolidAt(x, z + 2, h) || dkwSolidAt(x, z - 2, h))); }; };
var band = function (seed, n, d0, d1, pad, s0, s1) { return dkdfBand(seed, Math.round(n * k), path, d0, d1, ok(pad), H, s0, s1); };
var far = [], put = function (fn) { far = far.concat(dkdfTake(G, fn)); }, cells = function (l, fn) { dkdfCells(l, 150).forEach(function (p) { put(function () { fn(p); }); }); };
var leafM = function (col) { return dkwM("tleafLD" + col, function () { var m = new THREE.MeshLambertMaterial({ color: col, map: dkwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }); };
var kind = c.kind;
if (c.trees) {
var tr = band(R() * 1e5 | 0, c.trees, 9, 110, 4, kind === "swamp" ? 1.0 : 1.3, kind === "swamp" ? 1.8 : 2.4);
if (c.woods)
c.woods.forEach(function (w) { tr = tr.concat(dkwScatter(R() * 1e5 | 0, Math.round(140 * k), w[0], w[1], w[2], w[3], ok(3), H, 1.3, 2.3)); });
if (kind === "snow" || kind === "pine") {
cells(tr, function (p) { dkwPlant(G, "conifer", p.map(function (t) { return { x: t.x, y: t.y - 0.3, z: t.z, ry: t.ry, s: t.s * 0.75 }; }), { keepAll: 1 }); });
}
else {
cells(tr, function (p) { dkwPlant(G, "tree", p, { keepAll: 1, col: c.leaf || 0x3E7A30 }); });
}
tr.forEach(function (t) { dkwRound(t.x, t.z, 0.5 * t.s, t.y - 1, t.y + 14 * t.s); });
if (kind === "swamp") {
var beards = [];
tr.forEach(function (t) { for (var q = 0; q < 3; q++) {
var a = R() * 6.283, d = (1.4 + R() * 2) * t.s;
beards.push({ x: t.x + Math.cos(a) * d, y: t.y + (7.6 + R() * 1.4) * t.s, z: t.z + Math.sin(a) * d, ry: R() * 6.28, s: 1 + R() * 0.8 });
} });
cells(beards, function (p) { dkwInst(G, dkdfBeardGeo(), dkdfBeardM(), p, {}); });
}
}
if (c.palms) {
var pl = band(R() * 1e5 | 0, c.palms, 8, 70, 4, 0.9, 1.4);
cells(pl, function (p) { dkwPlant(G, "palm", p, { keepAll: 1 }); });
pl.forEach(function (t) { dkwRound(t.x, t.z, 0.5, t.y - 1, t.y + 10); });
}
if (kind === "forest" || kind === "swamp" || kind === "meadow") {
var fe = band(R() * 1e5 | 0, kind === "meadow" ? 600 : 2400, 4, 60, 0.5, 1.2, 2.4);
cells(fe, function (p) { dkwInst(G, dkdfFernGeo(), dkdfFernM(kind === "swamp" ? 0xC8D8A0 : 0xFFFFFF), p, {}); });
}
if (c.bushes) {
var bu = band(R() * 1e5 | 0, c.bushes, 4, 70, 1, 0.8, 1.7);
cells(bu, function (p) { dkwPlant(G, "bush", p, { keepAll: 1 }); });
}
if (c.reeds) {
var re = band(R() * 1e5 | 0, c.reeds, 2.5, 60, 0.3, 1.4, 2.6);
cells(re, function (p) { dkwInst(G, dkdfFernGeo(), dkdfFernM(0xC8C890), p, {}); });
}
if (c.scrub) {
var scb = band(R() * 1e5 | 0, c.scrub, 3, 100, 0.3, 0.8, 1.6);
cells(scb, function (p) { dkwInst(G, dkdfFernGeo(), dkdfFernM(0xD8B878), p, {}); });
}
if (c.flowers) {
dkcFlowers(G, band(R() * 1e5 | 0, c.flowers, 3, 70, 0.2, 0.35, 0.75).map(function (t) { t.y += 0.25; return t; }), [0xFFF0F8, 0xFFC8E0, 0xC8DCFF, 0xFFF0A0, 0xE0C8FF, 0xFFB878]);
}
if (c.glow) {
var gl = band(R() * 1e5 | 0, c.glow, 2, 40, 0.2, 0.9, 2.2);
cells(gl.filter(function (t, i) { return i % 2; }), function (p) { dkwInst(G, dkdfFernGeo(), dkwGlowM(0x6AE8B8, 0.85), p, {}); });
cells(gl.filter(function (t, i) { return !(i % 2); }), function (p) { dkwInst(G, dkdfShroomGeo(), dkwGlowM([0x8AC8FF, 0xC88AFF][p.length % 2], 0.9), p, {}); });
}
if (c.logs) {
var lg = band(R() * 1e5 | 0, c.logs, 7, 60, 5, 0.8, 1.3);
cells(lg, function (p) { dkwInst(G, dkdfLogGeo(), dkwMat(kind === "snow" ? "darkbark" : "bark"), p, {}); if (kind !== "snow")
dkwInst(G, dkdfLogMossGeo(), dkwS("b:moss", 0x5A7A3A, 2), p, {});
else
dkwInst(G, dkdfLogMossGeo(), dkwLam(0xF4F8FC), p, {}); });
lg.forEach(function (t) { dkwSolid(t.x, t.z, 9 * t.s, 1.4 * t.s, t.y - 1, t.y + 1.2 * t.s, t.ry); });
}
if (kind === "forest") {
var sh = band(R() * 1e5 | 0, 300, 3, 40, 0.4, 0.7, 1.4);
cells(sh, function (p) { dkwInst(G, dkdfShroomGeo(), dkwShine(0xC8A07A, 0.7, 0), p, {}); });
}
if (c.rocks) {
var rmat = { snow: dkwS("b:cave", 0x8A8E96, 3), pine: dkwS("b:strata", 0x8A8680, 4), desert: dkwS("b:strata", 0xB08A62, 4), fire: dkwShine(0x1A1416, 0.35, 0.2) }[kind] || dkwS("b:moss", 0x6A6E5A, 3);
var ro = band(R() * 1e5 | 0, c.rocks, 4, 120, 3, 0.6, 3.0);
cells(ro, function (p) { dkwPlant(G, "rock", p, { mat: rmat }); });
ro.forEach(function (t) { if (t.s > 1.3)
dkwRound(t.x, t.z, t.s * 0.7, t.y - 1, t.y + t.s); });
if (kind === "snow") {
var dr = band(R() * 1e5 | 0, c.rocks * 0.6, 4, 100, 2, 1.2, 3.4);
cells(dr, function (p) { dkwInst(G, dkwGeo("dkldDrift", function () { var s = new THREE.SphereGeometry(1, 14, 6, 0, 6.283, 0, Math.PI / 2); s.scale(2.4, 0.5, 1.4); return s; }), dkwLam(0xF4F8FF), p, {}); });
}
}
if (c.crags) {
var cm = { desert: dkwS("b:strata", 0xC08A5E, 4), fire: dkwS("b:strata", 0x2A2224, 4), pine: dkwS("b:strata", 0x8A8680, 4) }[kind] || dkwS("b:strata", 0x7A7670, 4);
var cr = band(R() * 1e5 | 0, c.crags, 40, 180, 12, 1, 1);
cr.forEach(function (t, n) { var low = (kind === "desert" || kind === "fire"), w = low ? 16 + R() * 26 : 10 + R() * 18, h = low ? 7 + R() * 16 : 14 + R() * 40, d = w * (0.6 + R() * 0.6); var cm2 = new THREE.Mesh(dkldCragGeo(w, h, d, Math.min(6, Math.min(w, d) * 0.14), n + 7), cm); cm2.position.set(t.x, t.y - 4 + h / 2, t.z); cm2.rotation.y = R() * 3; cm2.castShadow = cm2.receiveShadow = true; G.add(cm2); dkwSolid(t.x, t.z, Math.min(w, d) * 0.8, Math.min(w, d) * 0.8, t.y - 6, t.y + h - 4, 0); h -= 2; if (kind === "pine" || kind === "snow")
dkwPlant(G, "conifer", [{ x: t.x, y: t.y + h - 7, z: t.z, s: 0.6, ry: n }], { keepAll: 1 }); });
}
dkdfFar(far, c.far || 340);
},
function (x, y, z) {
var i = Math.floor(x), j = Math.floor(y), k = Math.floor(z), fx = x - i, fy = y - j, fz = z - k, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy), w = fz * fz * (3 - 2 * fz);
var L = function (a, b, t) { return a + (b - a) * t; };
return L(L(L(dkldH(i, j, k), dkldH(i + 1, j, k), u), L(dkldH(i, j + 1, k), dkldH(i + 1, j + 1, k), u), v), L(L(dkldH(i, j, k + 1), dkldH(i + 1, j, k + 1), u), L(dkldH(i, j + 1, k + 1), dkldH(i + 1, j + 1, k + 1), u), v), w);
},
function (w, h, d, amp, seed) {
var sx = Math.min(40, Math.max(5, Math.round(w / 3))), sy = Math.min(48, Math.max(5, Math.round(h / 3))), sz = Math.min(40, Math.max(5, Math.round(d / 3)));
var g = new THREE.BoxGeometry(w, h, d, sx, sy, sz), p = g.attributes.position, uv = g.attributes.uv, s = seed || 1;
var n = function (a, b, c) { var f = 1 / Math.max(6, Math.min(w, d) * 0.22); return dkldN3(a * f + s * 7.1, b * f * 0.8, c * f - s * 3.3) * 1.0 + dkldN3(a * f * 2.3, b * f * 2.1 + s, c * f * 2.3) * 0.5 + dkldN3(a * f * 5.1 + s, b * f * 4.7, c * f * 5.3) * 0.25; };
for (var i = 0; i < p.count; i++) {
var X = p.getX(i), Y = p.getY(i), Z = p.getZ(i), ex = Math.abs(Math.abs(X) - w / 2) < 0.01, ey = Math.abs(Y - h / 2) < 0.01, ez = Math.abs(Math.abs(Z) - d / 2) < 0.01;
uv.setXY(i, ex ? Z + d / 2 : X + w / 2, ex || ez ? Y + h / 2 : Z + d / 2);
if (Y < -h / 2 + 0.01)
continue;
var k = amp * n(X, Y, Z), st = Math.round(Y / (h / 12)) * (h / 12) - Y, f = Math.min(1, (Y + h / 2) / (h * 0.15));
if (ex)
X += Math.sign(X) * (k + st * 0.18) * f;
if (ez)
Z += Math.sign(Z) * (k + st * 0.18) * f;
if (ey)
Y += k * 0.7;
p.setXYZ(i, X, Y, Z);
}
g.computeVertexNormals();
return g;
},
function (r, h, seg, seed) {
var g = new THREE.ConeGeometry(r, h, Math.max(seg, 28), 18, false), p = g.attributes.position, s = seed || 3;
for (var i = 0; i < p.count; i++) {
var X = p.getX(i), Y = p.getY(i), Z = p.getZ(i), a = Math.atan2(Z, X), t = (Y + h / 2) / h;
if (t > 0.995)
continue;
var k = 1 + 0.16 * Math.sin(a * 7 + s) + 0.1 * Math.sin(a * 13 + t * 9 + s * 2) + 0.06 * Math.sin(a * 29 + t * 21) + 0.05 * Math.sin(t * 25 + a * 3);
p.setX(i, X * k);
p.setZ(i, Z * k);
p.setY(i, Y + Math.sin(a * 5 + s) * h * 0.03 * (1 - t));
}
g.computeVertexNormals();
return g;
},
function (G, sc) {
var n = 0, list = [];
G.traverse(function (o) {
if (!o.isMesh || o.isInstancedMesh || !o.geometry || !o.geometry.parameters)
return;
var P = o.geometry.parameters, m = o.material;
if (!m || m.transparent || Array.isArray(m))
return;
if (m.isMeshBasicMaterial && !(o.geometry.type === "ConeGeometry"))
return;
if (o.geometry.type === "BoxGeometry" && !DKLD_ROCKY.test((m.userData && m.userData.dkKey) || ""))
return;
if (o.geometry.type === "BoxGeometry" && P.height >= 25 && Math.max(P.width, P.depth) >= 14 && Math.min(P.width, P.depth) >= 8)
list.push([o, "b"]);
else if (o.geometry.type === "ConeGeometry" && P.radius >= 80 && P.height >= 150)
list.push([o, "c"]);
});
list.forEach(function (L) { var o = L[0], P = o.geometry.parameters; try {
var g = L[1] === "b" ? dkldCragGeo(P.width, P.height, P.depth, Math.min(10, Math.min(P.width, P.depth) * 0.09), n + 1) : dkldPeakGeo(P.radius, P.height, P.radialSegments, n + 1);
g.userData.dkld = 1;
o.geometry = g;
o.castShadow = o.receiveShadow = true;
n++;
}
catch (e) { } });
return n;
},
function () {
return dkwM("dkldNeedle", function () {
var t = dkwCanvas("dkldNeedleT", 128, 128, function (c, W, H) { c.fillStyle = "#1E3A22"; c.fillRect(0, 0, W, H); for (var i = 0; i < 900; i++) {
var x = Math.random() * W, y = Math.random() * H, l = 4 + Math.random() * 7, a = Math.PI / 2 + (Math.random() - 0.5) * 1.4;
c.strokeStyle = "rgba(" + (30 + Math.random() * 50 | 0) + "," + (70 + Math.random() * 60 | 0) + "," + (40 + Math.random() * 30 | 0) + ",0.9)";
c.lineWidth = 1;
c.beginPath();
c.moveTo(x, y);
c.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l);
c.stroke();
} });
t.repeat.set(3, 2);
var m = new THREE.MeshLambertMaterial({ map: t, color: 0xC8D8C0, side: THREE.DoubleSide });
m.userData.noPhoto = 1;
return m;
});
},
function () { return dkwGeo("dkldBarrel", function () { var g = new THREE.CylinderGeometry(0.42, 0.42, 1.1, 14, 4), p = g.attributes.position; for (var i = 0; i < p.count; i++) {
var y = p.getY(i), k = 1 + 0.13 * Math.cos(y / 0.55 * Math.PI / 2);
p.setX(i, p.getX(i) * k);
p.setZ(i, p.getZ(i) * k);
} g.translate(0, 0.55, 0); var parts = [g.toNonIndexed()]; [0.12, 0.98].forEach(function (y) { var h = new THREE.TorusGeometry(0.45, 0.025, 4, 18); h.rotateX(Math.PI / 2); h.translate(0, y, 0); parts.push(h.toNonIndexed()); }); var m = gwMerge(parts); m.computeVertexNormals(); return m; }); },
function () { return dkwGeo("dkldCrate", function () { var parts = [new THREE.BoxGeometry(0.9, 0.8, 0.9).toNonIndexed()]; [[-0.46, 0], [0.46, 0]].forEach(function (o) { var b = new THREE.BoxGeometry(0.04, 0.84, 0.12); b.translate(o[0], 0.0, 0.4); parts.push(b.toNonIndexed()); var c = b.clone(); c.translate(0, 0, -0.8); parts.push(c); }); var x = new THREE.BoxGeometry(1.2, 0.08, 0.03); x.rotateZ(0.72); x.translate(0, 0, 0.47); parts.push(x.toNonIndexed()); var g = gwMerge(parts); g.translate(0, 0.4, 0); return g; }); },
function () { return dkwGeo("dkldSack", function () { var g = new THREE.SphereGeometry(0.4, 12, 8), p = g.attributes.position; for (var i = 0; i < p.count; i++) {
var y = p.getY(i);
p.setY(i, y * (y > 0 ? 1.5 : 0.7));
p.setX(i, p.getX(i) * (y > 0.3 ? 0.6 : 1));
p.setZ(i, p.getZ(i) * (y > 0.3 ? 0.6 : 1));
} g.translate(0, 0.3, 0); g.computeVertexNormals(); return g; }); },
function () {
return dkwGeo("dkldCart", function () {
var parts = [];
var bed = new THREE.BoxGeometry(2.2, 0.15, 1.3);
bed.translate(0, 0.9, 0);
parts.push(bed.toNonIndexed());
[[0, 0.65], [0, -0.65]].forEach(function (o) { var s = new THREE.BoxGeometry(2.2, 0.45, 0.06); s.translate(0, 1.17, o[1]); parts.push(s.toNonIndexed()); });
[-1, 1].forEach(function (sd) { var w = new THREE.TorusGeometry(0.5, 0.06, 6, 16); w.translate(0.3, 0.5, sd * 0.72); parts.push(w.toNonIndexed()); for (var k = 0; k < 6; k++) {
var sp = new THREE.BoxGeometry(0.04, 0.95, 0.04);
sp.rotateZ(k / 6 * Math.PI);
sp.translate(0.3, 0.5, sd * 0.72);
parts.push(sp.toNonIndexed());
} });
var sh = new THREE.BoxGeometry(2.0, 0.08, 0.08);
sh.translate(-2.0, 0.75, 0.4);
parts.push(sh.toNonIndexed());
var sh2 = sh.clone();
sh2.translate(0, 0, -0.8);
parts.push(sh2);
return gwMerge(parts);
});
},
function () { return dkwGeo("dkldBench", function () { var parts = []; var s = new THREE.BoxGeometry(1.8, 0.08, 0.45); s.translate(0, 0.46, 0); parts.push(s.toNonIndexed()); var b = new THREE.BoxGeometry(1.8, 0.4, 0.06); b.translate(0, 0.75, -0.2); parts.push(b.toNonIndexed()); [-0.8, 0.8].forEach(function (x) { var l = new THREE.BoxGeometry(0.08, 0.46, 0.42); l.translate(x, 0.23, 0); parts.push(l.toNonIndexed()); }); return gwMerge(parts); }); },
function () { return dkwGeo("dkldLamp", function () { var parts = []; var p = new THREE.CylinderGeometry(0.06, 0.1, 3.6, 8); p.translate(0, 1.8, 0); parts.push(p.toNonIndexed()); var a = new THREE.BoxGeometry(0.6, 0.05, 0.05); a.translate(0.25, 3.55, 0); parts.push(a.toNonIndexed()); var c = new THREE.ConeGeometry(0.22, 0.25, 6); c.translate(0.5, 3.65, 0); parts.push(c.toNonIndexed()); var bs = new THREE.CylinderGeometry(0.18, 0.22, 0.3, 8); bs.translate(0, 0.15, 0); parts.push(bs.toNonIndexed()); return gwMerge(parts); }); },
function () { return dkwGeo("dkldHyd", function () { var parts = []; var b = new THREE.CylinderGeometry(0.14, 0.17, 0.65, 12); b.translate(0, 0.33, 0); parts.push(b.toNonIndexed()); var t = new THREE.SphereGeometry(0.15, 10, 6, 0, 6.283, 0, 1.6); t.translate(0, 0.66, 0); parts.push(t.toNonIndexed()); var n = new THREE.CylinderGeometry(0.05, 0.05, 0.42, 8); n.rotateZ(Math.PI / 2); n.translate(0, 0.45, 0); parts.push(n.toNonIndexed()); return gwMerge(parts); }); },
function () {
return dkwGeo("dkldCar", function () {
var parts = [];
var b = new THREE.BoxGeometry(4.4, 0.7, 1.8);
b.translate(0, 0.62, 0);
parts.push(b.toNonIndexed());
var c = new THREE.BoxGeometry(2.4, 0.6, 1.6);
c.translate(-0.2, 1.25, 0);
var p = c.attributes.position;
for (var i = 0; i < p.count; i++)
if (p.getY(i) > 1.3)
p.setX(i, p.getX(i) * 0.8 - 0.1);
parts.push(c.toNonIndexed());
[[1.4, 0.85], [1.4, -0.85], [-1.4, 0.85], [-1.4, -0.85]].forEach(function (w) { var t = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 14); t.rotateX(Math.PI / 2); t.translate(w[0], 0.36, w[1]); parts.push(t.toNonIndexed()); });
return gwMerge(parts);
});
},
function () { return dkwGeo("dkldBunt", function () { var parts = []; for (var i = 0; i < 14; i++) {
var t = new THREE.BufferGeometry();
var x = -7 + i + 0.5, sag = -0.8 * (1 - Math.pow((x / 7), 2));
t.setAttribute("position", new THREE.Float32BufferAttribute([x - 0.35, sag, 0, x + 0.35, sag, 0, x, sag - 0.55, 0], 3));
t.computeVertexNormals();
parts.push(t);
} return gwMerge(parts); }); },
function (G, sc, c) {
var lite = dkwLite(), k = (lite ? 0.4 : 1) * (c.n || 1), H = (DKW_SCN[sc] && DKW_SCN[sc].h) || function () { return 0; }, R = wRand(sc.length * 733 + 5), path = dkldPath(sc);
if (path.length < 2)
return;
var spots = Object.keys(DKW_AT).map(function (q) { return DKW_AT[q]; }).filter(function (A) { return A && A.sc === sc && (A.y == null || A.y > -500); });
var free = function (pad) { return function (x, z) { for (var i = 0; i < spots.length; i++)
if (Math.hypot(spots[i].x - x, spots[i].z - z) < 4 + pad)
return false; if (dkwPathD(x, z, path) < 2.2 + pad)
return false; var h = H(x, z); return !(typeof dkwSolidAt === "function" && (dkwSolidAt(x, z, h) || dkwSolidAt(x + 1, z, h) || dkwSolidAt(x - 1, z, h) || dkwSolidAt(x, z + 1, h) || dkwSolidAt(x, z - 1, h))); }; };
var nearWall = function (x, z, h) { if (typeof dkwSolidAt !== "function")
return true; for (var a = 0; a < 8; a++) {
var dx = Math.cos(a * 0.785) * 3, dz = Math.sin(a * 0.785) * 3;
if (dkwSolidAt(x + dx, z + dz, h))
return true;
} return false; };
var pick = function (seed, n, d0, d1, pad, wall) { var l = dkdfBand(seed, Math.round(n * k * (wall ? 3 : 1)), path, d0, d1, free(pad), H, 0.85, 1.15); if (wall)
l = l.filter(function (t) { return nearWall(t.x, t.z, t.y); }).slice(0, Math.round(n * k)); return l; };
var far = [], put = function (fn) { far = far.concat(dkdfTake(G, fn)); }, cells = function (l, fn) { dkdfCells(l, 120).forEach(function (p) { put(function () { fn(p); }); }); };
var wood = dkwS("b:planks", 0x8A6A48, 1.4), iron = dkwShine(0x2A2A2E, 0.5, 0.7), st = c.style, modern = (st === "modern");
var solidAll = function (l, r) { l.forEach(function (t) { dkwRound(t.x, t.z, r * t.s, t.y - 1, t.y + 1.6); }); };
if (!modern) {
var br = pick(R() * 1e5 | 0, 260, 3, 26, 0.6, 1);
cells(br, function (p) { dkwInst(G, dkldGeoBarrel(), wood, p, {}); });
solidAll(br, 0.45);
var cr = pick(R() * 1e5 | 0, 200, 3, 26, 0.6, 1);
cells(cr, function (p) { dkwInst(G, dkldGeoCrate(), dkwS("b:planks", 0xA0805A, 1.2), p, {}); });
solidAll(cr, 0.55);
if (st !== "snowtown" && st !== "docks") {
var sk = pick(R() * 1e5 | 0, 160, 3, 24, 0.4, 1);
cells(sk, function (p) { dkwInst(G, dkldGeoSack(), dkwLam(0xC8B088), p, {}); });
}
var ct = pick(R() * 1e5 | 0, st === "docks" ? 20 : 36, 4, 22, 2, 0);
cells(ct, function (p) { dkwInst(G, dkldGeoCart(), wood, p, {}); });
ct.forEach(function (t) { dkwRound(t.x, t.z, 1.3, t.y - 1, t.y + 1.6); });
var pl = pick(R() * 1e5 | 0, st === "docks" ? 0 : 120, 3, 20, 0.6, 1);
cells(pl, function (p) { dkwInst(G, dkldGeoPlanter(), dkwS("b:ashlar", 0x9A8A78, 2), p, {}); dkwInst(G, dkwGeo("bush"), dkwM("tleafPlanter", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A8A3A, map: dkwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), p.map(function (t) { return { x: t.x, y: t.y + 0.45, z: t.z, ry: t.ry, s: 0.45 }; }), {}); });
if (st !== "docks") {
dkcFlowers(G, [].concat.apply([], pl.map(function (t) { return [0, 1, 2, 3].map(function (q) { return { x: t.x + (R() - 0.5) * 1.1, y: t.y + 0.75, z: t.z + (R() - 0.5) * 0.5, s: 0.3 }; }); })), [0xFF6A8A, 0xFFD84A, 0xE8E8FF, 0xC86AFF]);
}
var bn = pick(R() * 1e5 | 0, 60, 3, 18, 1, 1);
cells(bn, function (p) { dkwInst(G, dkldGeoBench(), wood, p, {}); });
}
else {
var bi = pick(R() * 1e5 | 0, 120, 3, 16, 0.4, 0);
cells(bi, function (p) { dkwInst(G, dkldGeoBin(), dkwShine(0x3A4A3A, 0.6, 0.4), p, {}); });
solidAll(bi, 0.35);
var hy = pick(R() * 1e5 | 0, 40, 3, 10, 0.4, 0);
cells(hy, function (p) { dkwInst(G, dkldGeoHydrant(), dkwShine(0xC83A2A, 0.4, 0.3), p, {}); });
var cars = pick(R() * 1e5 | 0, 70, 4, 14, 2.2, 0);
var cc = [0x2A3A5A, 0x8A1A1A, 0x1A1A1A, 0xC8C8C8, 0x3A5A3A, 0xE8C84A];
cc.forEach(function (col, q) { var part = cars.filter(function (t, i) { return i % cc.length === q; }); cells(part, function (p) { dkwInst(G, dkldGeoCar(), dkwShine(col, 0.3, 0.6), p, {}); dkwInst(G, dkwGeo("dkldCarGlass", function () { var g = new THREE.BoxGeometry(2.0, 0.5, 1.64); g.translate(-0.2, 1.25, 0); return g; }), dkwShine(0x1A2A3A, 0.1, 0.9), p, {}); }); });
cars.forEach(function (t) { dkwSolid(t.x, t.z, 4.4, 1.9, t.y - 1, t.y + 1.6, t.ry); });
var tr = pick(R() * 1e5 | 0, 50, 4, 14, 1.5, 0);
cells(tr, function (p) { dkwPlant(G, "tree", p.map(function (t) { return { x: t.x, y: t.y, z: t.z, ry: t.ry, s: 0.7 }; }), { keepAll: 1, col: 0x3A6A2A }); });
tr.forEach(function (t) { dkwRound(t.x, t.z, 0.4, t.y - 1, t.y + 6); });
}
var lp = pick(R() * 1e5 | 0, modern ? 80 : 110, 2.6, 7, 0.4, 0);
cells(lp, function (p) { dkwInst(G, dkldGeoLamp(), iron, p, {}); dkwInst(G, dkldGeoGlow(), dkwGlowM(modern ? 0xFFE8C8 : 0xFFC870, 0.95), p, {}); });
solidAll(lp, 0.2);
if (st === "fantasy" || st === "desert" || st === "oldtown") {
var bc = [0xC83A3A, 0x3A6AC8, 0xE8C83A, 0x3AA85A, 0xE8E8E8];
for (var i = 0; i < Math.round((lite ? 10 : 40) * (c.n || 1)); i++) {
var j = Math.floor(R() * (path.length - 1)), f = R(), a = path[j], b = path[j + 1], px = a[0] + (b[0] - a[0]) * f, pz = a[1] + (b[1] - a[1]) * f, an = Math.atan2(b[1] - a[1], b[0] - a[0]);
var bu = new THREE.Mesh(dkldGeoBunting(), dkwM("bunt" + bc[i % 5], function () { var m = new THREE.MeshLambertMaterial({ color: bc[i % 5], side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
bu.position.set(px, H(px, pz) + 6.5, pz);
bu.rotation.y = -an + Math.PI / 2;
G.add(bu);
}
}
dkdfFar(far, c.far || 240);
},
function (G, sc, c) {
var rk = new THREE.Color(c.rock), ms = c.moss ? new THREE.Color(c.moss) : null, n = 0;
G.traverse(function (o) {
var g = o.geometry;
if (!o.isMesh || o.isInstancedMesh || !g || g.type !== "PlaneGeometry" || !g.attributes.color || !g.attributes.normal || g.attributes.position.count < 4000)
return;
var P = g.attributes.position, C = g.attributes.color, N = g.attributes.normal, ox = o.position.x, oz = o.position.z;
for (var i = 0; i < P.count; i++) {
var x = P.getX(i) + ox, z = P.getZ(i) + oz, y = P.getY(i), ny = N.getY(i);
var steep = dkwSmooth(0.93, 0.66, ny), mott = 0.84 + 0.3 * dkwFbm(x * 0.045 + 3.3, z * 0.045 - 1.7, 3), fine = 0.92 + 0.16 * dkwNoise2(x * 0.7, z * 0.7);
var r = C.getX(i) * mott * fine, gg = C.getY(i) * mott * fine, b = C.getZ(i) * mott * fine;
if (ms) {
var m = Math.max(0, Math.min(0.55, (dkwFbm(x * 0.02 + 5.1, z * 0.02 + 2.3, 3) - 0.52) * 3)) * (1 - steep);
r += (ms.r - r) * m;
gg += (ms.g - gg) * m;
b += (ms.b - b) * m;
}
if (steep > 0) {
var s = c.band ? 0.74 + 0.34 * (0.5 + 0.5 * Math.sin(y * 0.62 + dkwFbm(x * 0.012, z * 0.012, 2) * 7)) : 0.82 + 0.3 * dkwFbm(x * 0.08, z * 0.08, 2), q = s * (0.9 + 0.2 * dkwNoise2(x * 0.3 + y * 0.2, z * 0.3));
r += (rk.r * q - r) * steep;
gg += (rk.g * q - gg) * steep;
b += (rk.b * q - b) * steep;
}
C.setXYZ(i, Math.min(1, r), Math.min(1, gg), Math.min(1, b));
}
C.needsUpdate = true;
n++;
});
return n;
},
function () {
return dkwGeo("dktrFork", function () {
var parts = [];
var b = new THREE.BoxGeometry(2.4, 1.1, 1.3);
b.translate(-0.2, 0.85, 0);
parts.push(b.toNonIndexed());
var c = new THREE.BoxGeometry(1.0, 1.2, 1.2);
c.translate(-0.6, 1.95, 0);
parts.push(c.toNonIndexed());
[[-0.15, 0.5], [-0.15, -0.5]].forEach(function (o) { var p = new THREE.BoxGeometry(0.08, 1.4, 0.08); p.translate(-0.6 + o[0] * 0 + 0.5 * 0, 2.6, o[1]); parts.push(p.toNonIndexed()); });
[0.55, -0.55].forEach(function (z) { var m = new THREE.BoxGeometry(0.12, 3.0, 0.12); m.translate(1.15, 1.5, z); parts.push(m.toNonIndexed()); var f = new THREE.BoxGeometry(1.3, 0.06, 0.14); f.translate(1.8, 0.2, z * 0.7); parts.push(f.toNonIndexed()); });
[[0.6, 0.7], [0.6, -0.7], [-1.0, 0.7], [-1.0, -0.7]].forEach(function (w) { var t = new THREE.CylinderGeometry(0.34, 0.34, 0.26, 12); t.rotateX(Math.PI / 2); t.translate(w[0], 0.34, w[1]); parts.push(t.toNonIndexed()); });
return gwMerge(parts);
});
},
function () {
return dkwGeo("dktrTrailer", function () {
var parts = [];
var b = new THREE.BoxGeometry(12, 2.8, 2.5);
b.translate(0, 2.6, 0);
parts.push(b.toNonIndexed());
[[-4.4, 1.1], [-4.4, -1.1], [-5.6, 1.1], [-5.6, -1.1]].forEach(function (w) { var t = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 12); t.rotateX(Math.PI / 2); t.translate(w[0], 0.5, w[1]); parts.push(t.toNonIndexed()); });
[1.0, -1.0].forEach(function (z) { var l = new THREE.BoxGeometry(0.15, 1.0, 0.15); l.translate(4.6, 0.7, z); parts.push(l.toNonIndexed()); });
return gwMerge(parts);
});
},
function (key, cols) {
return dkwM("dklNeb" + key, function () {
var t = dkwCanvas("dklNebT" + key, 1024, 512, function (c, W, H) {
c.fillStyle = "#030208";
c.fillRect(0, 0, W, H);
for (var i = 0; i < 46; i++) {
var x = Math.random() * W, y = H * 0.15 + Math.random() * H * 0.7, r = 60 + Math.random() * 200, col = cols[i % cols.length], g = c.createRadialGradient(x, y, 0, x, y, r);
g.addColorStop(0, "rgba(" + col + ",0.11)");
g.addColorStop(0.5, "rgba(" + col + ",0.035)");
g.addColorStop(1, "rgba(" + col + ",0)");
c.fillStyle = g;
c.fillRect(x - r, y - r, r * 2, r * 2);
}
for (i = 0; i < 1600; i++) {
var a = Math.random();
c.fillStyle = "rgba(255,255,255," + (a * a * 0.9) + ")";
c.fillRect(Math.random() * W, Math.random() * H, a > 0.97 ? 2 : 1, a > 0.97 ? 2 : 1);
}
});
var m = new THREE.MeshBasicMaterial({ map: t, side: THREE.BackSide, fog: false, depthWrite: false });
m.userData.noPhoto = 1;
return m;
});
},
function () { return dkwGeo("dklRoot", function () { var parts = []; for (var k = 0; k < 3; k++) {
var pts = [], r = [];
for (var j = 0; j <= 6; j++) {
pts.push([Math.sin(j * 0.9 + k * 2) * 0.5 * j / 6 + k * 0.3, -j * 1.1, Math.cos(j * 0.7 + k) * 0.4 * j / 6]);
r.push(0.14 * (1 - j / 7) + 0.02);
}
parts.push(dkwTaper(pts, r, 6, 4).toNonIndexed());
} return gwMerge(parts); }); },
function () {
return dkwM("dklMosaic", function () {
var t = dkwCanvas("dklMosaicT", 1024, 1024, function (c, W, H) {
var cx = W / 2, cy = H / 2;
c.fillStyle = "#8A8478";
c.fillRect(0, 0, W, H);
for (var i = 0; i < 5200; i++) {
var a = Math.random() * 6.283, r = Math.sqrt(Math.random()) * W * 0.5, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r, v = 110 + Math.random() * 40 | 0;
c.fillStyle = "rgb(" + v + "," + (v - 6) + "," + (v - 16) + ")";
c.fillRect(x, y, 9, 9);
}
var cols = ["#FF6A2A", "#3A8AFF", "#6AC84A", "#E8F0FF", "#8AE8FF"];
c.lineWidth = 10;
[0.46, 0.38, 0.2].forEach(function (f, k) { c.strokeStyle = k === 1 ? "#C8A85A" : "#4A4440"; c.beginPath(); c.arc(cx, cy, W * f, 0, 6.283); c.stroke(); });
for (i = 0; i < 5; i++) {
var a2 = i / 5 * 6.283 - Math.PI / 2;
c.fillStyle = cols[i];
c.strokeStyle = cols[i];
c.lineWidth = 8;
c.beginPath();
c.moveTo(cx + Math.cos(a2) * W * 0.2, cy + Math.sin(a2) * W * 0.2);
c.lineTo(cx + Math.cos(a2) * W * 0.38, cy + Math.sin(a2) * W * 0.38);
c.stroke();
c.beginPath();
c.arc(cx + Math.cos(a2) * W * 0.29, cy + Math.sin(a2) * W * 0.29, W * 0.05, 0, 6.283);
c.fill();
}
c.strokeStyle = "#C8A85A";
c.lineWidth = 6;
c.beginPath();
for (i = 0; i <= 5; i++) {
var a3 = (i * 2) / 5 * 6.283 - Math.PI / 2;
c[i ? "lineTo" : "moveTo"](cx + Math.cos(a3) * W * 0.17, cy + Math.sin(a3) * W * 0.17);
}
c.stroke();
});
var m = new THREE.MeshPhongMaterial({ map: t, shininess: 50, specular: 0x2A2A2A });
m.userData.noPhoto = 1;
return m;
});
}
];
});
