/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(487, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (TMW.tex[k])
return TMW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = tmwLite();
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
return (TMW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (TMW.mats[k])
return TMW.mats[k];
var own = name.slice(0, 2) === "b:", map = tmwPhotoTex(name, mpt || 2), m;
if (tmwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = tmwPhotoTex(name, mpt || 2, true);
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
return (TMW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return tmwM(k, function () {
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
return tmwCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return tmwCanvas("bamboo", 64, 256, function (x, W, H) {
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
tmwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return tmwCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return tmwCanvas("tuft", 128, 64, function (x, W, H) {
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
return tmwCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return tmwCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
tmwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return tmwCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = TMW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / TMW_CELL) + "," + Math.floor(z / TMW_CELL)];
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
p = dlnPerson("tmw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("tmw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || TMW.scG || TMW.G).add(p);
var P = { g: p, y: y, o: o };
TMW.people.push(P);
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
TMW.inst.push(m);
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
var a0 = pts[q - 1], b0 = pts[q], L0 = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), n0 = Math.max(1, Math.ceil(L0 / (tmwLite() ? 8 : 4)));
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
var lite = tmwLite(), leaf = tmwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
tmwInst(P, tmwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), tmwMat("pale"), list, { shadow: !lite });
tmwInst(P, tmwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), tmwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
tmwInst(P, tmwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), tmwMat("bark"), list, { shadow: !lite });
tmwInst(P, tmwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), tmwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
tmwInst(P, tmwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), tmwMat("darkbark"), list, { shadow: !lite });
tmwInst(P, tmwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), tmwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
tmwInst(P, tmwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), tmwMat("bark"), list, { shadow: !lite });
tmwInst(P, tmwGeo("pfronds", function () { var g = tmwFronds(lite ? 8 : 12, 5.2, 1.6, 0.5, 12, 1.0); g.translate(1.4, 0, 0); return g; }), tmwLam(0xFFFFFF, { ds: 1, map: tmwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "mauritia": {
tmwInst(P, tmwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), tmwMat("darkbark"), list, {});
tmwInst(P, tmwGeo("mfronds", function () { return tmwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), tmwLam(0xFFFFFF, { ds: 1, map: tmwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
tmwInst(P, tmwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), tmwMat("darkbark"), list, {});
tmwInst(P, tmwGeo("ffronds", function () { return tmwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), tmwLam(0xFFFFFF, { ds: 1, map: tmwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
tmwInst(P, tmwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), tmwMat("darkbark"), list, {});
tmwInst(P, tmwGeo("cyf", function () { return tmwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), tmwLam(0xFFFFFF, { ds: 1, map: tmwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
tmwInst(P, tmwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), tmwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: tmwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
tmwInst(P, tmwGeo("bamL", function () { return tmwCards(3, 2.6, 2.2, 5.4); }), tmwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
tmwInst(P, tmwGeo("reed" + kind, function () { return tmwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), tmwLam(0xFFFFFF, { ds: 1, map: tmwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
tmwInst(P, tmwGeo("tuft", function () { return tmwCards(2, 1.6, 0.7, 0); }), tmwLam(o.col || 0xFFFFFF, { ds: 1, map: tmwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
tmwInst(P, tmwGeo("flw", function () { return tmwCards(2, 0.9, 0.7, 0); }), tmwLam(0xFFFFFF, { ds: 1, map: tmwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
tmwInst(P, tmwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), tmwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
tmwInst(P, tmwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || tmwMat("rock"), list, {});
break;
}
case "cactus": {
tmwInst(P, tmwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), tmwLam(0x4A7A3A), list, {});
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
function (kind, col) { return tmwM("skinM" + kind + (col || ""), function () { var t = tmwSkinTex(kind); t.repeat.set(2, 2); var m = tmwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = tmwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(tmwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = tmwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(tmwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
tmwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return tmwGeo(k, function () {
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
var t = tmwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), tmwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || tmwS("b:stucco", o.col || 0xF0E2C8, 3), trim = tmwLam(0xFAF6EE), sh = tmwLam(o.shut || 0x3A6A4A), glass = tmwShine(0x1A2228, 0.2, 0.3);
tmwBox(g, w, h, d, wall, 0, 0, 0);
tmwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
tmwBox(g, w + 0.12, 0.5, d + 0.12, tmwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(tmwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || tmwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
tmwBox(g, 1.3, 2.6, 0.12, tmwMat("oak"), wx, 0, d / 2 + 0.02);
tmwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = tmwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = tmwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!tmwLite())
[-1, 1].forEach(function (s) { tmwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
tmwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
tmwBox(g, 0.05, 0.9, 0.05, tmwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
tmwBox(g, 1.8, 0.05, 0.05, tmwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
tmwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
if (TMW.scG) {
if (TMW.scG.parent)
TMW.scG.parent.remove(TMW.scG);
TMW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
TMW.scG = null;
TMW.solids = [];
TMW.sgrid = null;
TMW.floors = [];
TMW.spots = [];
TMW.talk = [];
TMW.people = [];
TMW.beasts = [];
TMW.fx = [];
TMW.water = [];
TMW.inst = [];
TMW.hgt = null;
TMW.scBuilt = null;
if (typeof tmbSceneDrop === "function")
try {
tmbSceneDrop();
}
catch (e) { }
},
function (k) {
if (TMW.scBuilt === k && TMW.scG)
return;
tmwSceneDrop();
var D = TMW_SCN[k], S = TMW_SC[k];
if (!D || !S || !TMW.G)
return;
TMW.sc = k;
TMW.scG = new THREE.Group();
TMW.scG.position.x = S.x;
TMW.G.add(TMW.scG);
TMW.hgt = D.h || function () { return 0; };
try {
D.build(TMW.scG);
}
catch (e) {
if (window.console)
console.warn("[time machine] scene", k, e);
}
TMW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
TMW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = tmwAtPt(at);
if (!A)
return;
var v = tmwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
TMW.moving = true;
setTimeout(function () {
if (WLD.on !== TMW_KEY) {
v.style.opacity = "0";
TMW.moving = false;
return;
}
tmwScene(A.sc);
var S = TMW_SC[A.sc], y = A.y != null ? A.y : tmwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(TMW.base + S.x + A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(tmwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; TMW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(tmwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), tmwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; TMW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(tmwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), tmwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(tmwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), tmwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(tmwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), tmwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!tmwLite() && typeof THREE.PointLight === "function" && (TMW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
TMW.lights = (TMW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
TMW.fx.push(g);
return g;
},
function (seed, dress, o) {
o = o || {};
if (typeof dlnPerson !== "function")
return wPerson("tmw" + seed, { sex: o.sex });
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("tmw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (key, x, z, ry, o) {
var F = TMW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : tmwGround(x, z, o.feet != null ? o.feet : 500);
var g = tmwDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || TMW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
TMW.people.push(P);
if (!o.mute)
tmwTalk(P, F.name, tmwPersona(F.persona), o.greet || F.greet, o.r || 3.4, o.fn);
return P;
},
function (seed, n, x0, z0, x1, z1, o) {
o = o || {};
var R = wRand(seed), out = [], lite = tmwLite();
if (lite)
n = Math.ceil(n * 0.5);
for (var i = 0; i < n; i++) {
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (o.ok && !o.ok(x, z))
continue;
var sex = R() < 0.5 ? "f" : "m";
var g = tmwDressed(seed + "e" + i, "tmeloi", { sex: sex, hair: [0xD8B060, 0xC89A50, 0xE8C878, 0xB8864A][Math.floor(R() * 4)], skin: [0xF8E4D8, 0xF4DCCC, 0xF0D4C0][Math.floor(R() * 3)] });
var s = 0.68 + R() * 0.08;
g.scale.set(s, s, s);
var y = o.y != null ? o.y : tmwGround(x, z, 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
(o.parent || TMW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander != null ? o.wander : 8, sp: 0.55 } };
TMW.people.push(P);
TMW.eloi.push(P);
tmwTalk(P, TMW_ELOI_NAMES[i % TMW_ELOI_NAMES.length], TMW_ELOI, TMW_ELOI_SAY[i % TMW_ELOI_SAY.length], 2.6);
out.push(P);
}
return out;
},
function (seed) {
var g = new THREE.Group(), R = wRand(seed || 7), skin = tmwM("mskin", function () { var m = new THREE.MeshLambertMaterial({ color: 0xE8E2DA }); m.userData.noPhoto = 1; return m; }), hair = tmwM("mhair", function () { var m = new THREE.MeshLambertMaterial({ color: 0xE0D2A0 }); m.userData.noPhoto = 1; return m; }), eye = tmwM("meye", function () { var m = new THREE.MeshBasicMaterial({ color: 0xC88A80 }); m.userData.noPhoto = 1; return m; });
var B = tmwPiv(g, 0, 0.78, 0);
B.rotation.x = 0.55;
tmwEll(B, skin, 0.2, 0.3, 0.16, 0, 0.18, 0, 12);
tmwEll(B, hair, 0.17, 0.26, 0.1, 0, 0.22, 0.08, 10);
var H = tmwPiv(B, 0, 0.52, -0.04);
tmwEll(H, skin, 0.15, 0.16, 0.15, 0, 0, 0, 12);
tmwEll(H, hair, 0.155, 0.12, 0.16, 0, 0.06, 0.02, 10);
[-1, 1].forEach(function (k) { tmwEll(H, eye, 0.045, 0.05, 0.03, k * 0.06, 0.0, -0.13, 8); });
var arms = [], legs = [];
[-1, 1].forEach(function (k) {
var a = tmwPiv(B, k * 0.22, 0.34, 0);
a.rotation.x = -0.9;
tmwEll(a, skin, 0.05, 0.28, 0.05, 0, -0.26, 0, 8);
arms.push(a);
var l = tmwPiv(g, k * 0.11, 0.8, 0.06);
tmwEll(l, skin, 0.07, 0.4, 0.07, 0, -0.4, 0, 8);
legs.push(l);
});
g.userData.j = { B: B, H: H, arms: arms, legs: legs };
g.userData.kind = "morlock";
g.scale.setScalar(0.92 + R() * 0.12);
return g;
},
function (k) {
switch (k) {
case "brick": return tmwS("brick", 0xC07A5E, 1.6);
case "yellowbrick": return tmwS("brick", 0xD8C098, 1.6);
case "ashlar": return tmwS("b:ashlar", 0xE8E0D0, 2.4);
case "stone": return tmwS("stone", 0xD0C8B8, 2.4);
case "slate": return tmwS("b:slate", 0x6A6E78, 2);
case "oak": return tmwS("b:oak", 0x8A5E3A, 1.4);
case "floor": return tmwS("b:oak", 0xA87A50, 1.8);
case "planks": return tmwS("b:planks", 0x9A8060, 2);
case "damask": return tmwS("b:damask", 0x8A3A3A, 1.2);
case "greenpaper": return tmwS("b:damask", 0x4A6A52, 1.2);
case "bluepaper": return tmwS("b:damask", 0x4A5A7A, 1.2);
case "velvet": return tmwS("b:velvet", 0x6A1E22, 0.8);
case "greenvelvet": return tmwS("b:velvet", 0x2E4A34, 0.8);
case "leather": return tmwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return tmwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return tmwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "plaster": return tmwS("plaster", 0xF0EAD8, 4);
case "ceiling": return tmwLam(0xEDE6D6);
case "brass": return tmwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "nickel": return tmwShine(0xD8DCE0, 0.25, 0.9);
case "iron": return tmwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "ivory": return tmwShine(0xF2EAD8, 0.35, 0.05);
case "quartz": return tmwM("quartz", function () { var m = new THREE.MeshPhongMaterial({ color: 0xE8F4FF, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.55, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "granite": return tmwS("b:limestone", 0x9A948C, 4);
case "terracotta": return tmwS("b:terracotta", 0xC87A5A, 1.6);
case "earth": return tmwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return tmwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "lawn": return tmwS("grass", 0xA8C888, 4);
case "gravel": return tmwS("sand", 0xC8B898, 3);
case "paving": return tmwS("paving", 0xC8C0B0, 2.4);
case "road": return tmwS("asphalt", 0x8A8478, 5);
case "white": return tmwS("b:marble", 0xF8F6F2, 3, { shine: 30 });
case "bronze": return tmwS("b:brass", 0x7A6A3A, 1.6, { shine: 60 });
case "verdigris": return tmwS("b:brass", 0x6A9A8A, 1.6, { shine: 30 });
case "greystone": return tmwS("b:limestone", 0xB0ACA4, 4);
case "ruin": return tmwS("b:limestone", 0xA8A498, 4);
case "porcelain": return tmwS("b:darktile", 0x8AC8A8, 2, { shine: 90 });
case "rock": return tmwS("b:strata", 0x8A7A6A, 6);
case "redrock": return tmwS("b:strata", 0x8A3A2A, 8);
case "cave": return tmwS("b:cave", 0x7A746C, 4);
case "moss": return tmwS("b:moss", 0x7A9A5A, 3);
case "bark": return tmwS("bark", 0x8A7A64, 2.5);
case "darkbark": return tmwS("bark", 0x5A4E40, 3);
case "pale": return tmwS("bark", 0xC8BCA8, 3);
case "sand": return tmwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "snow": return tmwS("snow", 0xF4F6FA, 4);
}
return tmwS("earth", 0x8A7058, 5);
},
function (s) {
s = s || 1;
var g = new THREE.Group(), br = tmwMat("brass"), ni = tmwMat("nickel"), iv = tmwMat("ivory"), qz = tmwMat("quartz"), lt = tmwMat("leather");
[-1, 1].forEach(function (k) { var r = tmwBox(g, 0.08, 0.08, 2.4, ni, k * 0.62, 0.02, 0); tmwBox(g, 0.06, 0.9, 0.06, br, k * 0.62, 0.08, -1.0); tmwBox(g, 0.06, 0.9, 0.06, br, k * 0.62, 0.08, 1.0); tmwBox(g, 0.06, 0.06, 2.0, br, k * 0.62, 0.92, 0); });
[-1, 0, 1].forEach(function (k) { tmwBox(g, 1.3, 0.05, 0.05, iv, 0, 0.92, k * 1.0); tmwBox(g, 1.3, 0.05, 0.05, br, 0, 0.1, k * 1.0); });
for (var i = 0; i < 6; i++) {
var q = new THREE.Mesh(tmwGeo("qrod", function () { var c = new THREE.CylinderGeometry(0.025, 0.025, 0.9, 6, 8); var pa = c.attributes.position; for (var j = 0; j < pa.count; j++) {
var y = pa.getY(j), a = y * 6;
var x = pa.getX(j), z = pa.getZ(j);
pa.setXYZ(j, x * Math.cos(a) - z * Math.sin(a), y, x * Math.sin(a) + z * Math.cos(a));
} c.computeVertexNormals(); return c; }), qz);
q.position.set(-0.5 + i * 0.2, 0.55, -1.0 + (i % 2) * 0.04);
g.add(q);
}
for (i = 0; i < 4; i++) {
var q2 = new THREE.Mesh(tmwGeo("qrod2", function () { return new THREE.CylinderGeometry(0.02, 0.02, 1.8, 6); }), qz);
q2.rotation.x = Math.PI / 2;
q2.position.set(-0.45 + i * 0.3, 0.97, 0);
g.add(q2);
}
tmwCyl(g, 0.05, 0.06, 0.5, iv, 0, 0.92, 0.25, 8);
var sd = new THREE.Mesh(tmwGeo("saddle", function () { var c = new THREE.SphereGeometry(0.28, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2); c.scale(0.9, 0.35, 1.25); return c; }), lt);
sd.position.set(0, 1.42, 0.25);
g.add(sd);
var db = tmwBox(g, 0.9, 0.36, 0.05, tmwMat("oak"), 0, 1.32, -0.55);
db.rotation.x = -0.5;
var dials = [];
for (i = 0; i < 4; i++) {
var d = new THREE.Group();
d.position.set(-0.33 + i * 0.22, 1.5, -0.58);
d.rotation.x = -0.5;
g.add(d);
tmwCyl(d, 0.085, 0.085, 0.02, iv, 0, 0, 0, 18).rotation.x = Math.PI / 2;
var rim = new THREE.Mesh(tmwGeo("drim", function () { return new THREE.TorusGeometry(0.088, 0.012, 6, 20); }), br);
d.add(rim);
var hand = tmwBox(d, 0.01, 0.075, 0.008, tmwLam(0x1A1A1A), 0, 0, 0.016);
hand.geometry = tmwGeo("dhand", function () { var b = new THREE.BoxGeometry(0.012, 0.075, 0.008); b.translate(0, 0.035, 0); return b; });
d.userData.hand = hand;
dials.push(hand);
}
var levers = [];
[-1, 1].forEach(function (k) { var L = new THREE.Group(); L.position.set(k * 0.36, 1.12, -0.36); g.add(L); tmwCyl(L, 0.016, 0.016, 0.42, br, 0, 0, 0, 6); var kn = new THREE.Mesh(tmwGeo("lknob", function () { return new THREE.SphereGeometry(0.035, 10, 8); }), iv); kn.position.y = 0.44; L.add(kn); levers.push(L); });
var disc = new THREE.Mesh(tmwGeo("disc", function () { return new THREE.CylinderGeometry(0.62, 0.62, 0.04, 40); }), br);
disc.rotation.x = Math.PI / 2;
disc.position.set(0, 1.0, 1.1);
g.add(disc);
var spokes = new THREE.Group();
spokes.position.set(0, 1.0, 1.13);
g.add(spokes);
for (i = 0; i < 8; i++) {
var sp = tmwBox(spokes, 0.04, 1.1, 0.02, ni, 0, -0.55, 0);
sp.rotation.z = i / 8 * Math.PI;
sp.position.set(0, 0, 0);
sp.geometry = tmwGeo("spk", function () { return new THREE.BoxGeometry(0.035, 1.14, 0.02); });
}
g.userData.dials = dials;
g.userData.levers = levers;
g.userData.disc = spokes;
g.userData.live = 1;
g.userData.keep = 1;
g.scale.setScalar(s);
return g;
},
function (P, x, z, ry, mat, arm) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = tmwMat("oak");
if (arm) {
tmwBox(g, 0.9, 0.42, 0.85, mat, 0, 0, 0);
tmwBox(g, 0.9, 0.8, 0.22, mat, 0, 0.4, 0.34);
[-1, 1].forEach(function (k) { tmwBox(g, 0.18, 0.3, 0.85, mat, k * 0.4, 0.42, 0); });
tmwBox(g, 0.7, 0.1, 0.6, mat, 0, 0.42, -0.04);
}
else {
tmwBox(g, 0.46, 0.06, 0.46, mat, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { tmwBox(g, 0.04, 0.44, 0.04, wd, q[0] * 0.2, 0, q[1] * 0.2); });
tmwBox(g, 0.44, 0.56, 0.05, wd, 0, 0.5, 0.21);
}
return g;
},
function (P, x, z, w, h, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = tmwMat("oak"), R = wRand(Math.round(x * 7 + z * 13));
tmwBox(g, w, h, 0.36, wd, 0, 0, 0);
var n = Math.floor(h / 0.42);
for (var i = 0; i < n; i++) {
var y = 0.12 + i * 0.42, bx = -w / 2 + 0.1;
while (bx < w / 2 - 0.12) {
var bw = 0.04 + R() * 0.05, bh = 0.24 + R() * 0.12;
tmwBox(g, bw, bh, 0.24, tmwLam([0x6A1E1E, 0x1E3A2A, 0x2A2A4A, 0x5A3A1E, 0x8A6A3A, 0x3A1A2A][Math.floor(R() * 6)]), bx + bw / 2, y, -0.2);
bx += bw + 0.005;
}
}
return g;
},
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var ag = tmwShine(0xE0E4E8, 0.25, 0.9);
tmwCyl(g, 0.015, 0.02, 0.5, ag, 0, 0, 0, 6);
[0, 1, 2].forEach(function (i) {
var a = i / 3 * 6.283, f = new THREE.Group();
f.position.set(Math.cos(a) * 0.14, 0.5, Math.sin(a) * 0.14);
f.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
g.add(f);
var c = new THREE.Mesh(tmwGeo("lilyc", function () { return new THREE.ConeGeometry(0.07, 0.14, 8, 1, true); }), ag);
c.rotation.x = Math.PI;
f.add(c);
var b = new THREE.Mesh(tmwGeo("lilyb", function () { return new THREE.SphereGeometry(0.035, 8, 6); }), tmwGlowM(0xFFF0C0));
b.position.y = -0.04;
f.add(b);
});
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), tmwM("rug" + col, function () {
var t = tmwCanvas("rugt" + col, 256, 256, function (c, W, H) {
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
tmwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
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
function (P, x, y, z, ry, w, h) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var fr = tmwLam(0xF4F0E6), gl = tmwShine(0x2A3438, 0.15, 0.4);
tmwBox(g, w + 0.2, h + 0.2, 0.08, tmwMat("ashlar"), 0, -0.1, 0.02);
tmwBox(g, w, h, 0.06, gl, 0, 0, 0.06);
tmwBox(g, w, 0.06, 0.08, fr, 0, h / 2 - 0.03, 0.08);
tmwBox(g, 0.05, h, 0.08, fr, 0, 0, 0.08);
tmwBox(g, w + 0.3, 0.1, 0.22, tmwMat("ashlar"), 0, -0.12, 0.12);
return g;
},
function (P, z, x0, x1, mat, inner, gaps, h) {
h = h || TMW_HOUSE.h1;
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
tmwBox(P, G[1], h - 2.4, 0.3, inner || mat, G[0], 2.4, z);
});
segs.forEach(function (s) { var w = s[1] - s[0]; if (w < 0.05)
return; tmwBox(P, w, h, 0.3, mat, (s[0] + s[1]) / 2, 0, z, 0, true); if (inner) {
tmwBox(P, w, h, 0.02, inner, (s[0] + s[1]) / 2, 0, z + 0.16);
tmwBox(P, w, h, 0.02, inner, (s[0] + s[1]) / 2, 0, z - 0.16);
} });
},
function (P, x, z0, z1, mat, inner, gaps, h) {
h = h || TMW_HOUSE.h1;
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
tmwBox(P, 0.3, h - 2.4, G[1], inner || mat, x, 2.4, G[0]);
});
segs.forEach(function (s) { var d = s[1] - s[0]; if (d < 0.05)
return; tmwBox(P, 0.3, h, d, mat, x, 0, (s[0] + s[1]) / 2, 0, true); });
},
function (P, x0, x1, z0, z1, mat, dx, dz) {
var H = TMW_HOUSE.h1 - 0.02, w = x1 - x0, d = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, wd = tmwMat("oak");
tmwBox(P, w - 0.32, H, 0.02, mat, cx, 0, z0 + 0.17);
tmwBox(P, w - 0.32, H, 0.02, mat, cx, 0, z1 - 0.17);
[x0 + 0.17, x1 - 0.17].forEach(function (x) {
var segs = [[z0 + 0.16, z1 - 0.16]];
if (dx != null && Math.abs(x - dx) < 0.5) {
segs = [[z0 + 0.16, dz - 0.65], [dz + 0.65, z1 - 0.16]];
tmwBox(P, 0.02, H - 2.4, 1.3, mat, x, 2.4, dz);
}
segs.forEach(function (sg) { var L = sg[1] - sg[0]; tmwBox(P, 0.02, H, L, mat, x, 0, (sg[0] + sg[1]) / 2); tmwBox(P, 0.04, 0.06, L, wd, x + (x < cx ? 0.02 : -0.02), 0.95, (sg[0] + sg[1]) / 2); tmwBox(P, 0.04, 0.18, L, wd, x + (x < cx ? 0.02 : -0.02), 0, (sg[0] + sg[1]) / 2); });
});
[z0 + 0.19, z1 - 0.19].forEach(function (z) { tmwBox(P, w - 0.34, 0.06, 0.04, wd, cx, 0.95, z); tmwBox(P, w - 0.34, 0.18, 0.04, wd, cx, 0, z); });
},
function (G) {
var H = TMW_HOUSE, br = tmwMat("brick"), st = tmwMat("ashlar"), lite = tmwLite();
tmwBox(G, 26, 0.1, 20, tmwMat("floor"), 0, -0.08, 0);
var hall = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 19.4), tmwMat("checker"));
hall.rotation.x = -Math.PI / 2;
hall.position.set(0, 0.03, 0);
G.add(hall);
tmwBox(G, 26, 0.25, 20, tmwMat("ceiling"), 0, H.h1, 0);
tmwWallZ(G, H.z1, H.x0, H.x1, br, null, [[0, 1.6]], H.h2);
tmwWallZ(G, H.z0, H.x0, H.x1, br, null, [[0, 1.4]], H.h2);
tmwWallX(G, H.x0, H.z0, H.z1, br, null, [], H.h2);
tmwWallX(G, H.x1, H.z0, H.z1, br, null, [], H.h2);
var wl = tmwMat("plaster");
tmwWallX(G, -3, H.z0, H.z1, wl, null, [[5, 1.3], [-5, 1.3]]);
tmwWallX(G, 3, H.z0, H.z1, wl, null, [[5, 1.3], [-5, 1.3]]);
tmwWallZ(G, 0, H.x0, -3, wl);
tmwWallZ(G, 0, 3, H.x1, wl);
tmwPaper(G, H.x0, -3, 0, H.z1, tmwMat("damask"), -3, 5);
tmwPaper(G, H.x0, -3, H.z0, 0, tmwMat("greenpaper"), -3, -5);
tmwPaper(G, 3, H.x1, 0, H.z1, tmwMat("bluepaper"), 3, 5);
tmwPaper(G, 3, H.x1, H.z0, 0, tmwMat("plaster"), 3, -5);
var wd = tmwMat("oak");
[[-3, 5], [-3, -5], [3, 5], [3, -5]].forEach(function (q) { tmwBox(G, 0.36, 0.14, 1.5, wd, q[0], 2.38, q[1]); [-1, 1].forEach(function (k) { tmwBox(G, 0.36, 2.4, 0.08, wd, q[0], 0, q[1] + k * 0.7); }); });
tmwBox(G, 26.4, 0.3, 20.4, st, 0, H.h1 - 0.1, 0);
tmwBox(G, 26.6, 0.4, 20.6, st, 0, H.h2 - 0.4, 0);
tmwBox(G, 26.5, 0.5, 20.5, st, 0, -0.2, 0);
[-9.5, -6, 6, 9.5].forEach(function (x) { [[H.z1 + 0.16, 0], [H.z0 - 0.16, Math.PI]].forEach(function (q) { tmwSash(G, x, 1.0, q[0], q[1], 1.3, 2.0); tmwSash(G, x, 4.6, q[0], q[1], 1.2, 1.8); }); });
[-6, -1.5, 3, 7.5].forEach(function (z) { tmwSash(G, H.x0 - 0.16, 1.0, z, -Math.PI / 2, 1.2, 2.0); tmwSash(G, H.x1 + 0.16, 1.0, z, Math.PI / 2, 1.2, 2.0); tmwSash(G, H.x0 - 0.16, 4.6, z, -Math.PI / 2, 1.1, 1.8); tmwSash(G, H.x1 + 0.16, 4.6, z, Math.PI / 2, 1.1, 1.8); });
tmwSash(G, 0, 4.6, H.z1 + 0.16, 0, 1.4, 1.8);
var day = tmwLam(0xE8ECE8, { e: 0x6A6E6A }), cur = tmwMat("velvet");
[-9.5, -6, 6, 9.5].forEach(function (x) { [[H.z1 - 0.21, 1], [H.z0 + 0.21, -1]].forEach(function (q) { tmwBox(G, 1.2, 1.9, 0.02, day, x, 1.05, q[0]); [-1, 1].forEach(function (k) { tmwBox(G, 0.4, 2.6, 0.06, cur, x + k * 0.82, 0.6, q[0] - q[1] * 0.05); }); tmwBox(G, 2.2, 0.12, 0.12, tmwMat("brass"), x, 3.15, q[0] - q[1] * 0.06); }); });
tmwBox(G, 4, 0.18, 2.4, st, 0, 0, H.z1 + 1.2);
tmwBox(G, 3.4, 0.18, 1.8, st, 0, 0.18, H.z1 + 0.9);
[-1.5, 1.5].forEach(function (x) { tmwCyl(G, 0.17, 0.2, 3.3, st, x, 0.36, H.z1 + 1.9, 14); tmwBox(G, 0.5, 0.25, 0.5, st, x, 0.18, H.z1 + 1.9); });
tmwBox(G, 3.8, 0.4, 2.6, st, 0, 3.6, H.z1 + 1.1);
var ped = new THREE.Mesh(tmwGeo("pedim", function () { var s = new THREE.Shape(); s.moveTo(-2.0, 0); s.lineTo(0, 0.9); s.lineTo(2.0, 0); s.lineTo(-2.0, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 0.4, bevelEnabled: false }); return e; }), st);
ped.position.set(0, 4.0, H.z1 + 2.0);
G.add(ped);
tmwBox(G, 1.5, 0.22, 0.1, wd, 0, 2.25, H.z1 + 0.05);
var fan = new THREE.Mesh(tmwGeo("fanl", function () { return new THREE.CircleGeometry(0.75, 16, 0, Math.PI); }), tmwShine(0x2A3438, 0.15, 0.4));
fan.position.set(0, 2.45, H.z1 + 0.17);
G.add(fan);
var dr = tmwBox(G, 0.08, 2.3, 1.4, tmwLam(0x1E2A22), 0.0, 0, 0);
dr.position.set(-0.8, 1.15, H.z1 - 0.7);
dr.rotation.y = 0;
var kn = tmwCyl(G, 0.04, 0.04, 0.06, tmwMat("brass"), -0.74, 1.1, H.z1 - 1.2, 8);
for (var x = -12.5; x <= 12.5; x += 0.25) {
if (Math.abs(x) < 2.2)
continue;
tmwCyl(G, 0.016, 0.016, 1.0, tmwMat("iron"), x, 0.25, H.z1 + 4.2, 5);
}
tmwBox(G, 10.3, 0.25, 0.3, st, -7.35, 0, H.z1 + 4.2);
tmwBox(G, 10.3, 0.25, 0.3, st, 7.35, 0, H.z1 + 4.2);
tmwSolid(-7.35, H.z1 + 4.2, 10.3, 0.4, -1, 2);
tmwSolid(7.35, H.z1 + 4.2, 10.3, 0.4, -1, 2);
[-1, 1].forEach(function (k) { var bed = new THREE.Mesh(new THREE.PlaneGeometry(9, 3.4), tmwMat("lawn")); bed.rotation.x = -Math.PI / 2; bed.position.set(k * 7.6, 0.03, H.z1 + 2.2); G.add(bed); });
var rf = new THREE.Mesh(tmwGeo("tmroof", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), tmwMat("slate"));
rf.scale.set(27.6, 4.6, 21.6);
rf.position.y = H.h2;
G.add(rf);
[[-12.2, 5], [-12.2, -5], [12.2, 5], [12.2, -5]].forEach(function (q) { tmwBox(G, 1.0, 4.2, 1.8, br, q[0], H.h2, q[1]); for (var i = 0; i < 3; i++)
tmwCyl(G, 0.16, 0.18, 0.5, tmwLam(0xA85A3A), q[0], H.h2 + 4.2, q[1] - 0.5 + i * 0.5, 8); });
for (var s = 0; s < 14; s++)
tmwBox(G, 1.4, 0.2 + s * 0.24, 0.28, wd, 1.9, 0, -2 - s * 0.28 - 0.14);
tmwSolid(1.9, -4, 1.4, 4.1, -1, 4);
var clk = new THREE.Group();
clk.position.set(-2.4, 0, -7);
G.add(clk);
tmwBox(clk, 0.6, 2.1, 0.4, wd, 0, 0, 0);
var face = new THREE.Mesh(new THREE.CircleGeometry(0.22, 20), tmwLam(0xF4F0E4));
face.position.set(0.31, 1.75, 0);
face.rotation.y = Math.PI / 2;
clk.add(face);
tmwSolid(-2.4, -7, 0.7, 0.5, -1, 3);
tmwCyl(G, 0.04, 0.05, 1.8, wd, -2.4, 0, 7.4, 6);
for (var hk = 0; hk < 4; hk++) {
var a = hk / 4 * 6.283;
tmwBox(G, 0.25, 0.03, 0.03, wd, -2.4 + Math.cos(a) * 0.12, 1.7, 7.4 + Math.sin(a) * 0.12).rotation.y = a;
}
tmwRug(G, 0, 4, 2.4, 5, 0x6A1A1A);
var fx = H.x0 + 0.4;
tmwBox(G, 0.6, 1.3, 2.4, tmwMat("marble"), fx + 0.1, 0, 5);
tmwBox(G, 0.8, 0.12, 2.8, tmwMat("marble"), fx + 0.2, 1.3, 5);
tmwBox(G, 0.3, 1.0, 1.4, tmwLam(0x141210), fx + 0.3, 0, 5);
tmwBox(G, 0.05, 1.4, 1.6, tmwShine(0xC8CED4, 0.05, 0.9), fx - 0.05, 1.6, 5);
TMW.hearth = tmwFire(G, fx + 0.55, 0.05, 5, 0.55);
tmwSolid(fx + 0.2, 5, 1.0, 2.8, -1, 2);
tmwRug(G, -8, 5, 6, 6, 0x3A1A2A);
var vel = tmwMat("velvet");
tmwChair(G, -9.3, 3.2, -Math.PI * 0.25, vel, 1);
tmwChair(G, -9.3, 6.8, -Math.PI * 0.75, vel, 1);
tmwChair(G, -6.2, 7.6, Math.PI, vel, 1);
tmwChair(G, -5.2, 3.0, Math.PI * 0.35, vel, 1);
tmwChair(G, -7.6, 1.6, 0, tmwMat("greenvelvet"), 1);
[[-9.3, 3.2], [-9.3, 6.8], [-6.2, 7.6], [-5.2, 3.0], [-7.6, 1.6]].forEach(function (q) { tmwSolid(q[0], q[1], 0.9, 0.9, -1, 1.0); });
var ot = new THREE.Group();
ot.position.set(TMW_AT.table.x, 0, TMW_AT.table.z);
G.add(ot);
var top = new THREE.Mesh(tmwGeo("octt", function () { return new THREE.CylinderGeometry(0.42, 0.42, 0.04, 8); }), tmwMat("oak"));
top.position.y = 0.62;
ot.add(top);
tmwCyl(ot, 0.04, 0.05, 0.6, tmwMat("oak"), 0, 0, 0, 8);
tmwCyl(ot, 0.22, 0.24, 0.04, tmwMat("oak"), 0, 0, 0, 8);
tmwSolid(TMW_AT.table.x, TMW_AT.table.z, 0.7, 0.7, -1, 0.7);
TMW.tableTop = 0.64;
tmwShelves(G, -11, 0.4, 3.6, 2.6, 0);
tmwShelves(G, -11, 9.6, 3.6, 2.6, Math.PI);
tmwSolid(-11, 0.4, 3.6, 0.5, -1, 3);
tmwSolid(-11, 9.6, 3.6, 0.5, -1, 3);
tmwLily(G, -12.3, 1.42, 3.6);
tmwLily(G, -12.3, 1.42, 6.4);
[[-4, 1.2], [-4, 9.0]].forEach(function (q) { tmwCyl(G, 0.04, 0.12, 1.3, tmwMat("brass"), q[0], 0, q[1], 8); tmwLily(G, q[0], 1.3, q[1]); });
if (!lite && (TMW.lights || 0) < 4) {
var L1 = new THREE.PointLight(0xFFE0A8, 0.9, 11);
L1.position.set(-8, 2.6, 5);
G.add(L1);
TMW.lights = (TMW.lights || 0) + 1;
}
tmwRug(G, -8, -5, 5, 5, 0x2A3A4A);
tmwTable(G, -8, -6.5, 2.2, 1.1, 0.78, tmwMat("oak"));
tmwChair(G, -8, -5.5, 0, tmwMat("leather"), 0);
tmwSolid(-8, -6.5, 2.2, 1.1, -1, 1);
tmwShelves(G, -12.6, -5, 4.4, 3.2, Math.PI / 2);
tmwSolid(-12.6, -5, 0.5, 4.4, -1, 3.4);
tmwShelves(G, -8, -9.6, 4.4, 3.2, 0);
tmwSolid(-8, -9.6, 4.4, 0.5, -1, 3.4);
var globe = new THREE.Mesh(tmwGeo("globe", function () { return new THREE.SphereGeometry(0.3, 20, 14); }), tmwLam(0x6A8AA8));
globe.position.set(-4.4, 1.05, -8.6);
G.add(globe);
tmwCyl(G, 0.03, 0.18, 0.75, tmwMat("oak"), -4.4, 0, -8.6, 8);
for (var pp = 0; pp < 6; pp++)
tmwBox(G, 0.22, 0.004, 0.3, tmwLam(0xF0E8D4), -8.6 + pp * 0.22, 0.78, -6.6 + ((pp * 37) % 5) * 0.04).rotation.y = pp * 0.3;
tmwRug(G, 8, 5, 7, 6, 0x4A1E1E);
var cloth = tmwLam(0xF8F6F0);
tmwTable(G, 8, 5, 5.2, 1.6, 0.78, tmwMat("oak"), cloth);
tmwSolid(8, 5, 5.3, 1.7, -1, 1);
for (var c = 0; c < 4; c++) {
tmwChair(G, 6.0 + c * 1.3, 3.7, 0, tmwMat("oak"), 0);
tmwChair(G, 6.0 + c * 1.3, 6.3, Math.PI, tmwMat("oak"), 0);
}
tmwChair(G, 5.0, 5, -Math.PI / 2, tmwMat("oak"), 0);
tmwChair(G, 11.0, 5, Math.PI / 2, tmwMat("oak"), 0);
for (c = 0; c < 4; c++)
[4.55, 5.45].forEach(function (z) {
var pl = new THREE.Mesh(tmwGeo("plate", function () { return new THREE.CylinderGeometry(0.13, 0.1, 0.02, 16); }), tmwLam(0xFAFAF6));
pl.position.set(6.0 + c * 1.3, 0.8, z);
G.add(pl);
var gl = new THREE.Mesh(tmwGeo("wglass", function () { return new THREE.CylinderGeometry(0.035, 0.02, 0.14, 10); }), tmwMat("quartz"));
gl.position.set(6.2 + c * 1.3, 0.86, z + (z < 5 ? -0.12 : 0.12));
G.add(gl);
});
[6.5, 9.5].forEach(function (x) { tmwCyl(G, 0.05, 0.09, 0.36, tmwShine(0xE0E4E8, 0.25, 0.9), x, 0.8, 5, 8); for (var k = -1; k <= 1; k++) {
tmwCyl(G, 0.015, 0.015, 0.2, tmwLam(0xF8F4E8), x + k * 0.12, 1.12, 5, 6);
var fl = new THREE.Mesh(tmwGeo("cfl", function () { return new THREE.SphereGeometry(0.02, 6, 5); }), tmwGlowM(0xFFD890));
fl.scale.y = 1.8;
fl.position.set(x + k * 0.12, 1.36, 5);
G.add(fl);
} });
tmwBox(G, 3.0, 1.0, 0.6, tmwMat("oak"), 8, 0, 9.5);
tmwSolid(8, 9.5, 3.0, 0.7, -1, 1.2);
tmwBox(G, 9.6, 0.1, 9.6, tmwMat("planks"), 8, -0.02, -5);
var bench = function (x, z, w, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
G.add(g);
tmwBox(g, w, 0.08, 0.9, tmwMat("oak"), 0, 0.86, 0);
[-1, 1].forEach(function (k) { tmwBox(g, 0.08, 0.86, 0.8, tmwMat("oak"), k * (w / 2 - 0.1), 0, 0); });
var R = wRand(Math.round(x * 11 + z));
for (var i = 0; i < Math.floor(w / 0.5); i++) {
var px = -w / 2 + 0.3 + i * 0.5, k = R();
if (k < 0.3) {
var f = new THREE.Mesh(tmwGeo("flask", function () { return new THREE.SphereGeometry(0.09, 10, 8); }), tmwMat("quartz"));
f.position.set(px, 1.0, (R() - 0.5) * 0.4);
g.add(f);
tmwCyl(g, 0.02, 0.02, 0.14, tmwMat("quartz"), px, 1.06, f.position.z, 6);
}
else if (k < 0.55) {
tmwBox(g, 0.2, 0.3, 0.2, tmwMat("brass"), px, 0.94, (R() - 0.5) * 0.4);
}
else if (k < 0.75) {
tmwCyl(g, 0.06, 0.06, 0.04, tmwMat("nickel"), px, 0.94, (R() - 0.5) * 0.3, 10);
tmwBox(g, 0.02, 0.4, 0.02, tmwMat("brass"), px, 0.94, 0);
}
else
tmwBox(g, 0.26, 0.02, 0.34, tmwLam(0xE8E0CC), px, 0.94, (R() - 0.5) * 0.3).rotation.y = R();
}
tmwSolid(x, z, ry ? 0.95 : w, ry ? w : 0.95, -1, 1.1);
return g;
};
bench(8, -9.4, 8, 0);
bench(12.4, -4.4, 4, Math.PI / 2);
bench(4.6, -3.0, 2.4, Math.PI / 2);
tmwBox(G, 1.6, 0.9, 0.5, tmwMat("iron"), 11.6, 0, -1.0);
tmwCyl(G, 0.12, 0.12, 0.4, tmwMat("iron"), 11.2, 0.9, -1.0, 10).rotation.z = Math.PI / 2;
tmwSolid(11.6, -1.0, 1.6, 0.6, -1, 1.3);
for (var t2 = 0; t2 < 8; t2++)
tmwBox(G, 0.04, 0.36, 0.02, tmwMat("iron"), 4.0 + t2 * 0.3, 2.0, -9.78);
tmwBox(G, 1.6, 1.1, 0.01, tmwLam(0xFFFFFF, { map: tmwCanvas("tmplans", 256, 180, function (c, W, H) {
c.fillStyle = "#1E3A6A";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#E8F0FF";
c.lineWidth = 2;
c.strokeRect(16, 16, W - 32, H - 32);
c.beginPath();
c.moveTo(40, 140);
c.lineTo(210, 140);
c.moveTo(60, 140);
c.lineTo(60, 70);
c.lineTo(190, 70);
c.lineTo(190, 140);
c.moveTo(80, 70);
c.lineTo(110, 30);
c.moveTo(125, 105);
c.arc(125, 105, 30, 0, 7);
c.stroke();
c.font = "12px Georgia";
c.fillStyle = "#E8F0FF";
c.fillText("Fig. 1. The Machine", 70, 165);
}), mapk: "tmplans" }), 7, 1.6, -9.8);
var M = tmwMachine(1);
M.position.set(TMW_AT.machine.x, 0, TMW_AT.machine.z);
M.rotation.y = Math.PI / 2;
G.add(M);
TMW.machineLab = M;
TMW.machineLabS = tmwSolid(TMW_AT.machine.x, TMW_AT.machine.z, 2.6, 1.6, -1, 1.6);
if (!lite && (TMW.lights || 0) < 4) {
var L2 = new THREE.PointLight(0xFFF2D8, 0.8, 12);
L2.position.set(8, 3.0, -5);
G.add(L2);
TMW.lights = (TMW.lights || 0) + 1;
}
var mdl = tmwMachine(0.16);
mdl.position.set(TMW_AT.table.x, TMW.tableTop, TMW_AT.table.z);
G.add(mdl);
mdl.visible = false;
TMW.model = mdl;
},
function (G) {
var lite = tmwLite();
var road = new THREE.Mesh(new THREE.PlaneGeometry(220, 12), tmwMat("road"));
road.rotation.x = -Math.PI / 2;
road.position.set(0, 0.02, 26);
G.add(road);
[18.6, 33.4].forEach(function (z) { var pv = new THREE.Mesh(new THREE.PlaneGeometry(220, 3.2), tmwMat("paving")); pv.rotation.x = -Math.PI / 2; pv.position.set(0, 0.06, z); G.add(pv); tmwBox(G, 220, 0.14, 0.25, tmwMat("ashlar"), 0, 0, z + (z < 26 ? 1.6 : -1.6)); });
for (var x = -60; x <= 60; x += 20)
[18.0, 34.0].forEach(function (z) {
var g = new THREE.Group();
g.position.set(x + (z > 26 ? 10 : 0), 0, z);
G.add(g);
tmwCyl(g, 0.06, 0.1, 3.2, tmwMat("iron"), 0, 0, 0, 8);
tmwBox(g, 0.5, 0.06, 0.06, tmwMat("iron"), 0, 2.9, 0);
var lb = new THREE.Mesh(tmwGeo("gasl", function () { return new THREE.CylinderGeometry(0.22, 0.14, 0.5, 4); }), tmwLam(0xFFF0C0, { e: 0xC8A060 }));
lb.position.y = 3.45;
g.add(lb);
var cp = new THREE.Mesh(tmwGeo("gasc", function () { return new THREE.ConeGeometry(0.28, 0.22, 4); }), tmwMat("iron"));
cp.position.y = 3.8;
g.add(cp);
tmwSolid(g.position.x, z, 0.3, 0.3, -1, 3);
});
var vill = function (x, z, ry, w, col, seed) {
tmwHouse(G, x, z, w, 11, 7.2, { ry: ry, wall: tmwS("brick", col, 1.6), roof: tmwMat("slate"), shut: 0x2A3A2A, col: col });
var gl = new THREE.Group();
gl.position.set(x, 0, z);
gl.rotation.y = ry;
G.add(gl);
for (var i = -1; i <= 1; i += 2)
tmwCyl(gl, 0.4, 0.4, 3.6, tmwMat("brick"), i * (w / 2 - 0.8), 7.2, 0, 8);
tmwBox(gl, w, 0.9, 0.3, tmwMat("brick"), -0, 0, 7.5);
};
[[-46, 0], [46, 0], [-80, 0], [80, 0]].forEach(function (q, i) { vill(q[0], q[1], 0, [18, 16, 20, 14][i], [0xC07A5E, 0xB86A50, 0xD8C098, 0xA86048][i]); });
[-66, -38, -6, 26, 58].forEach(function (x, i) { vill(x, 46, Math.PI, [16, 18, 14, 20, 16][i], [0xB86A50, 0xD8C098, 0xC07A5E, 0xA86048, 0xC8A080][i]); });
var trees = [];
for (var t = -90; t <= 90; t += 14)
trees.push({ x: t + 3, z: 36.8, s: 0.9 + ((t * 7) % 5) / 12, ry: t });
[-30, 30, -60, 60].forEach(function (x) { trees.push({ x: x, z: 14, s: 1.0, ry: x }); });
tmwPlant(G, "tree", trees, { col: 0x5A7A3A });
var lawn = new THREE.Mesh(new THREE.PlaneGeometry(30, 26), tmwMat("lawn"));
lawn.rotation.x = -Math.PI / 2;
lawn.position.set(0, 0.03, -24);
G.add(lawn);
var walk = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 24), tmwMat("gravel"));
walk.rotation.x = -Math.PI / 2;
walk.position.set(0, 0.05, -23);
G.add(walk);
tmwWallZ(G, -37.2, -15, 15, tmwMat("brick"), null, [], 2.4);
tmwWallX(G, -15, -37, -10, tmwMat("brick"), null, [], 2.4);
tmwWallX(G, 15, -37, -10, tmwMat("brick"), null, [], 2.4);
tmwPlant(G, "bush", tmwScatter(41, lite ? 14 : 28, -14, -36, 14, -12, function (x, z) { return Math.abs(x) > 2.4 && (Math.abs(x) > 11 || z < -33); }), { col: 0x3E6A2E });
tmwPlant(G, "flowers", tmwScatter(43, lite ? 20 : 44, -14, -36, 14, -12, function (x, z) { return Math.abs(x) > 1.8 && Math.abs(x) < 3.6; }), { col: "#E8A0B8" });
tmwPlant(G, "tree", [{ x: -9, z: -28, s: 1.2, ry: 1 }, { x: 10, z: -31, s: 1.1, ry: 2 }, { x: -11, z: -17, s: 0.9, ry: 3 }], { col: 0x4A7A34 });
tmwSolid(-9, -28, 1.2, 1.2, -1, 10);
tmwSolid(10, -31, 1.2, 1.2, -1, 10);
tmwSolid(-11, -17, 1.2, 1.2, -1, 10);
tmwWallX(G, -14.5, -10, 13.8, tmwMat("brick"), null, [[11.6, 1.6]], 2.2);
tmwWallX(G, 14.5, -10, 13.8, tmwMat("brick"), null, [[11.6, 1.6]], 2.2);
var R = wRand(77);
for (var i = 0; i < (lite ? 6 : 12); i++) {
var f = R() < 0.45, x2 = -80 + R() * 160, z2 = R() < 0.5 ? 18.6 : 33.4;
var P = tmwPerson("rd" + i, x2, z2, 0, { dress: f ? "tmlady" : "tmstreet", sex: f ? "f" : "m", beard: !f && R() < 0.5 ? (R() < 0.5 ? "mustache" : "full") : null, wander: 14, sp: 0.9 }, R() * 6.283);
tmwTalk(P, f ? ["a lady of Richmond", "a governess with a parcel", "a lady walking home"][i % 3] : ["a gentleman of Richmond", "a clerk going home", "a doctor on his rounds", "a curate"][i % 4], "You are a passer-by on a quiet road in Richmond, Surrey, in the 1890s, in the world of H. G. Wells's The Time Machine (the book only). You know the house with the brass lamp in the porch: a clever, odd gentleman lives there who does experiments, and his friends dine with him on Thursdays.", ["Good evening. A fine evening for it.", "Evening. Lights in the clever gentleman's laboratory again, I see.", "Good evening to you.", "Evening. Mind the puddle there."][i % 4], 3.0);
}
},
function (G) {
var lite = tmwLite();
TMW_VILLAS.forEach(function (v, i) {
var x = v[0], z = v[1], back = v[2], fz = back ? z - 5.9 : z + 5.9, I = tmwVillaIn(i), F = TMW_VILLA_FOLK[i];
var dg = new THREE.Group();
dg.position.set(x, 0, back ? z - 5.52 : z + 5.52);
dg.rotation.y = back ? Math.PI : 0;
G.add(dg);
tmwBox(dg, 1.5, 2.6, 0.12, tmwMat("ashlar"), 0, 0, 0);
tmwBox(dg, 1.1, 2.25, 0.1, tmwLam([0x2A3A2A, 0x5A1A1A, 0x1A2A4A][i % 3]), 0, 0.05, 0.06);
tmwBox(dg, 0.08, 0.08, 0.06, tmwMat("brass"), 0.38, 1.05, 0.13);
tmwBox(dg, 1.8, 0.18, 0.3, tmwMat("ashlar"), 0, 0, 0.4);
tmwSpot(x, fz, 1.6, "The front door of " + F[0].split(",")[0], "go in", function () { tmwGo({ sc: "richmond", x: I.x, z: I.z + 3.6, ry: 0 }, "🚪 <b>" + F[0] + "</b>, at home."); });
var g = new THREE.Group();
g.position.set(I.x, 0, I.z);
G.add(g);
var W = 11, D = 9, H = 3.4;
tmwBox(g, W, 0.1, D, tmwMat("floor"), 0, -0.08, 0);
tmwBox(g, W, 0.2, D, tmwMat("ceiling"), 0, H, 0);
tmwFloor(I.x, I.z, W, D, 0);
var paper = tmwMat(["damask", "greenpaper", "bluepaper"][i % 3]);
tmwWallZ(g, -D / 2, -W / 2, W / 2, tmwMat("brick"), paper, [], H);
tmwWallZ(g, D / 2, -W / 2, W / 2, tmwMat("brick"), paper, [[0, 1.3]], H);
tmwWallX(g, -W / 2, -D / 2, D / 2, tmwMat("brick"), paper, [], H);
tmwWallX(g, W / 2, -D / 2, D / 2, tmwMat("brick"), paper, [], H);
tmwSolid(I.x, I.z - D / 2, W, 0.4, -1, H);
tmwSolid(I.x - W / 2, I.z, 0.4, D, -1, H);
tmwSolid(I.x + W / 2, I.z, 0.4, D, -1, H);
tmwSolid(I.x - 3.2, I.z + D / 2, 4.6, 0.4, -1, H);
tmwSolid(I.x + 3.2, I.z + D / 2, 4.6, 0.4, -1, H);
tmwBox(g, 2.4, 1.8, 0.04, tmwLam(0xFFE8B0, { e: 0x8A6A3A }), -3.2, 1.0, D / 2 - 0.18);
tmwBox(g, 2.6, 0.12, 0.2, tmwMat("oak"), -3.2, 0.9, D / 2 - 0.25);
tmwBox(g, 2.4, 1.3, 0.6, tmwMat("marble"), 0, 0, -D / 2 + 0.4);
tmwBox(g, 2.8, 0.12, 0.8, tmwMat("marble"), 0, 1.3, -D / 2 + 0.45);
tmwBox(g, 1.4, 1.0, 0.3, tmwLam(0x141210), 0, 0, -D / 2 + 0.62);
if (!lite)
tmwFire(g, 0, 0.05, -D / 2 + 0.75, 0.45);
tmwBox(g, 0.36, 0.44, 0.18, tmwMat("oak"), 0.6, 1.42, -D / 2 + 0.45);
tmwSolid(I.x, I.z - D / 2 + 0.5, 2.8, 1.0, -1, 1.4);
tmwRug(g, 0, -0.6, 5, 4, [0x6A1A1A, 0x2A3A5A, 0x3A4A2A][i % 3]);
var vel = tmwMat(i % 2 ? "greenvelvet" : "velvet");
tmwChair(g, -1.8, -2.0, -Math.PI * 0.25, vel, 1);
tmwChair(g, 1.8, -2.0, Math.PI * 0.25, vel, 1);
tmwChair(g, 0, 1.4, Math.PI, vel, 0);
tmwTable(g, 0, 0.3, 1.4, 0.9, 0.72, tmwMat("oak"), tmwLam(0xF4F0E4));
tmwSolid(I.x, I.z + 0.3, 1.5, 1.0, -1, 0.8);
tmwShelves(g, W / 2 - 0.4, -1.0, 2.6, 2.4, -Math.PI / 2);
tmwSolid(I.x + W / 2 - 0.4, I.z - 1.0, 0.6, 2.6, -1, 2.4);
if (i % 2) {
tmwBox(g, 1.6, 1.1, 0.6, tmwLam(0x1A1210), -W / 2 + 0.5, 0, -1.4);
tmwBox(g, 1.5, 0.06, 0.3, tmwLam(0xF4F0E4), -W / 2 + 0.5, 0.8, -1.1);
tmwSolid(I.x - W / 2 + 0.5, I.z - 1.4, 1.7, 0.7, -1, 1.2);
}
else {
tmwBox(g, 0.5, 1.8, 1.4, tmwMat("oak"), -W / 2 + 0.5, 0, -1.4);
tmwSolid(I.x - W / 2 + 0.5, I.z - 1.4, 0.6, 1.5, -1, 1.9);
}
var lamp = new THREE.Mesh(tmwGeo("vlamp", function () { return new THREE.SphereGeometry(0.18, 12, 8); }), tmwLam(0xFFE8B8, { e: 0xC8A060 }));
lamp.position.set(0, 1.0, 0.3);
g.add(lamp);
var P = tmwPerson("vl" + i, I.x + 1.8, I.z - 2.0, 0, { dress: F[2], sex: F[1], beard: F[1] === "m" && i % 2 ? "mustache" : null }, Math.PI * 0.75);
tmwTalk(P, F[0], TMW_VILLA_P + " You are " + F[0] + ".", F[3], 2.6);
if (i % 3 === 0) {
var K = tmwPerson("vk" + i, I.x - 2.2, I.z + 1.6, 0, { dress: "tmstreet", sex: i % 2 ? "f" : "m", child: 1, wander: 2, sp: 0.5 }, 0);
tmwTalk(K, "a child of the house", TMW_VILLA_P + " You are a child of about ten, in your nightclothes, allowed down to say good-night.", "Good evening! I'm allowed up till nine.", 2.2);
}
tmwSpot(I.x, I.z + D / 2 - 0.6, 1.4, "The front door", "go out", function () { tmwGo({ sc: "richmond", x: x, z: fz + (back ? -1.2 : 1.2), ry: back ? 0 : Math.PI }, null); });
});
},
function (x, z) {
var h = 3 + tmwFbm(x * 0.006, z * 0.006, 4) * 9 - 4.5;
h += 30 * tmwSmooth(-110, -430, z) * (1 - 0.4 * tmwSmooth(260, 520, Math.abs(x - 60)));
h += 10 * tmwSmooth(-300, -700, z) * tmwSmooth(-300, -640, x);
h += 6 * tmwSmooth(430, 560, z);
var d = Math.abs(z - tmwRiverZ(x));
h = h * tmwSmooth(16, 70, d) + (-2.6) * (1 - tmwSmooth(16, 70, d));
return h;
},
function (G, x, z) {
var y = tmwFlatH(0), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var wm = tmwMat("white"), bz = tmwMat("verdigris"), bd = tmwMat("bronze");
tmwBox(g, 8.4, 0.6, 13.4, bz, 0, 0, 0);
tmwBox(g, 7, 3.6, 12, bz, 0, 0.6, 0);
tmwBox(g, 7.8, 0.5, 12.8, bz, 0, 4.0, 0);
for (var i = -2; i <= 2; i++) {
tmwBox(g, 0.12, 3.0, 0.06, bd, -3.52, 0.9, i * 2.2).rotation.y = 0;
tmwBox(g, 0.12, 3.0, 0.06, bd, 3.52, 0.9, i * 2.2);
}
var pf = new THREE.Group();
pf.position.set(0, 0.6, 6.03);
g.add(pf);
tmwBox(pf, 4.2, 3.2, 0.08, bd, 0, 0.15, 0);
var panels = [];
[-1, 1].forEach(function (k) {
var hinge = new THREE.Group();
hinge.position.set(k * 2.0, 0.25, 0.06);
pf.add(hinge);
var p = tmwBox(hinge, 2.0, 2.9, 0.1, bz, -k * 1.0, 0, 0);
for (var r = 0; r < 3; r++)
tmwBox(hinge, 1.5, 0.06, 0.04, bd, -k * 1.0, 0.5 + r * 0.9, 0.07);
panels.push(hinge);
});
TMW.panels = panels;
TMW.pedS = tmwSolid(x, z, 8.4, 13.4, y - 1, y + 5);
var B = new THREE.Group();
B.position.set(0, 4.5, 0);
g.add(B);
tmwEll(B, wm, 2.4, 2.0, 4.4, 0, 1.9, 0.6, 20);
tmwEll(B, wm, 2.2, 1.6, 2.0, 0, 1.5, -3.4, 16);
[-1, 1].forEach(function (k) { tmwEll(B, wm, 0.6, 0.6, 2.4, k * 1.5, 0.6, 3.6, 12); tmwEll(B, wm, 0.7, 0.45, 0.9, k * 1.5, 0.45, 5.6, 10); tmwEll(B, wm, 0.9, 1.2, 1.6, k * 1.9, 1.1, -3.0, 12); });
var Hd = new THREE.Group();
Hd.position.set(0, 4.8, 4.0);
B.add(Hd);
tmwEll(Hd, wm, 1.15, 1.45, 1.25, 0, 0, 0, 18);
tmwEll(Hd, wm, 1.5, 1.7, 0.9, 0, -0.3, -0.6, 16);
tmwEll(Hd, wm, 0.24, 0.36, 0.3, 0, -0.1, 1.18, 10);
[-1, 1].forEach(function (k) { var e = tmwEll(Hd, tmwLam(0xC8C2B6), 0.2, 0.1, 0.06, k * 0.42, 0.3, 1.08, 10); });
tmwEll(Hd, wm, 0.36, 0.12, 0.12, 0, -0.62, 1.1, 10);
tmwEll(B, wm, 0.9, 1.4, 0.9, 0, 3.4, 3.4, 14);
[-1, 1].forEach(function (k) {
var W = new THREE.Mesh(tmwGeo("swing" + k, function () {
var s = new THREE.Shape();
s.moveTo(0, 0);
s.bezierCurveTo(2, 2.4, 5, 3.6, 8.2, 4.4);
s.lineTo(7.4, 3.4);
s.lineTo(8.0, 2.6);
s.lineTo(6.8, 1.9);
s.lineTo(7.2, 1.0);
s.lineTo(5.6, 0.6);
s.lineTo(5.6, -0.3);
s.bezierCurveTo(3.6, -0.6, 1.6, -1.0, 0, -0.6);
s.lineTo(0, 0);
var e = new THREE.ExtrudeGeometry(s, { depth: 0.4, bevelEnabled: true, bevelSize: 0.12, bevelThickness: 0.12, bevelSegments: 2 });
e.translate(0, 0, -0.2);
if (k < 0)
e.scale(-1, 1, 1);
e.computeVertexNormals();
return e;
}), wm);
W.position.set(k * 1.8, 3.0, -0.2);
W.rotation.set(0.25, k * 0.35, k * -0.12);
B.add(W);
for (var f = 0; f < 6; f++) {
var fe = tmwBox(B, 0.05, 0.04, 1.6, tmwLam(0xD8D4CC), k * (2.6 + f * 0.9), 3.6 + f * 0.45, -0.2 - f * 0.05);
fe.rotation.y = k * 0.35;
}
});
for (var s2 = 0; s2 < 8; s2++) {
var st = tmwEll(B, tmwLam(0xA8A898, { op: 0.35 }), 0.3 + s2 % 3 * 0.2, 0.05, 0.8, ((s2 * 37) % 10 - 5) * 0.4, 3.9 - (s2 % 4) * 0.4, ((s2 * 53) % 10 - 5) * 0.6, 8);
}
tmwPlant(G, "birch", [{ x: x + 6.4, z: z - 4, y: y, s: 1.25, ry: 0.6 }], { keepAll: 1 });
return g;
},
function (G) {
var cx = 160, cz = -124, y = tmwFlatH(1), g = new THREE.Group();
g.position.set(cx, y, cz);
G.add(g);
var gs = tmwMat("greystone"), lite = tmwLite();
var W = 30, D = 56, H = 16, ws = function (zz, x0, x1, gap) { var segs = gap ? [[x0, -gap / 2], [gap / 2, x1]] : [[x0, x1]]; segs.forEach(function (s) { tmwBox(g, s[1] - s[0], H, 1.2, gs, (s[0] + s[1]) / 2, 0, zz); tmwSolid(cx + (s[0] + s[1]) / 2, cz + zz, s[1] - s[0], 1.4, y - 1, y + H); }); if (gap)
tmwBox(g, gap, H - 9, 1.2, gs, 0, 9, zz); };
ws(D / 2, -W / 2, W / 2, 7);
ws(-D / 2, -W / 2, W / 2, 0);
[-1, 1].forEach(function (k) { tmwBox(g, 1.2, H, D, gs, k * W / 2, 0, 0); tmwSolid(cx + k * W / 2, cz, 1.4, D, y - 1, y + H); });
var fret = tmwM("fret", function () {
var t = tmwCanvas("frett", 256, 64, function (c, W2, H2) { c.fillStyle = "#9A968C"; c.fillRect(0, 0, W2, H2); c.strokeStyle = "#5A5650"; c.lineWidth = 5; for (var i = 0; i < 8; i++) {
var x0 = i * 32;
c.beginPath();
c.moveTo(x0 + 4, H2 - 8);
c.lineTo(x0 + 4, 8);
c.lineTo(x0 + 28, 8);
c.lineTo(x0 + 28, 40);
c.lineTo(x0 + 12, 40);
c.lineTo(x0 + 12, 24);
c.stroke();
} tmwNoise(c, W2, H2, 500, 0.25, 9, "40,40,40"); });
t.repeat.set(1, 1);
var m = new THREE.MeshLambertMaterial({ map: t });
m.userData.noPhoto = 1;
return m;
});
[[0, D / 2 + 0.62, W + 1.4, 0], [0, -D / 2 - 0.62, W + 1.4, 0]].forEach(function (q) { var b = new THREE.Mesh(new THREE.PlaneGeometry(q[2], 2.2), fret); b.position.set(q[0], H - 2.4, q[1]); if (q[1] < 0)
b.rotation.y = Math.PI; g.add(b); fret.map.repeat.set(q[2] / 8, 1); });
[-1, 1].forEach(function (k) { var b = new THREE.Mesh(new THREE.PlaneGeometry(D + 1.4, 2.2), fret); b.position.set(k * (W / 2 + 0.62), H - 2.4, 0); b.rotation.y = k * Math.PI / 2; g.add(b); });
tmwBox(g, W + 2, 0.8, D + 2, gs, 0, H, 0);
tmwBox(g, W + 3, 1.0, D + 3, gs, 0, -0.6, 0);
[-1, 1].forEach(function (k) { tmwBox(g, 1.6, 9, 1.8, gs, k * 4.3, 0, D / 2 + 0.2); });
var ar = new THREE.Mesh(tmwGeo("hallarch", function () { return new THREE.TorusGeometry(4.3, 0.8, 8, 20, Math.PI); }), gs);
ar.position.set(0, 8.6, D / 2 + 0.3);
g.add(ar);
var rf = new THREE.Mesh(tmwGeo("hallroof", function () { var c = new THREE.CylinderGeometry(W / 2 + 1, W / 2 + 1, D + 2, 24, 1, true, -Math.PI / 2, Math.PI); c.rotateX(Math.PI / 2); c.scale(1, 0.5, 1); return c; }), tmwM("hallroofm", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8A867E, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
rf.position.y = H + 0.6;
g.add(rf);
var cg = [0x8A3A4A, 0x3A6A8A, 0xC8A040, 0x4A8A5A, 0x6A4A8A];
for (var i = 0; i < 7; i++) {
[-1, 1].forEach(function (k) { var w = tmwBox(g, 0.2, 4.2, 2.6, tmwLam(cg[(i + (k > 0 ? 2 : 0)) % 5], { e: cg[(i + (k > 0 ? 2 : 0)) % 5] }), k * (W / 2 - 0.55), 8.4, -D / 2 + 5 + i * 7.6); });
}
var fl = new THREE.Mesh(new THREE.PlaneGeometry(W - 1, D - 1), tmwShine(0xE4E2DC, 0.35, 0.6));
fl.rotation.x = -Math.PI / 2;
fl.position.y = 0.04;
g.add(fl);
for (i = 0; i < 9; i++) {
[-1, 1].forEach(function (k) { tmwBox(g, 0.08, 6, 4.6, tmwLam(0x6A4A30, { ds: 1 }), k * (W / 2 - 0.7), 0.6, -D / 2 + 4 + i * 6); });
}
var fruitM = [tmwLam(0xD84A3A), tmwLam(0xE8B040), tmwLam(0x8A3A6A), tmwLam(0xC8D850)], cush = [tmwMat("velvet"), tmwMat("greenvelvet"), tmwLam(0xC8A048), tmwLam(0x4A5A8A)];
for (var r = 0; r < 6; r++)
[-1, 1].forEach(function (k) {
var tx = k * 7.2, tz = -D / 2 + 7 + r * 8;
tmwBox(g, 9, 0.3, 2.4, tmwMat("marble"), tx, 0, tz);
tmwSolid(cx + tx, cz + tz, 9, 2.4, y - 1, y + 0.3);
var R = wRand(r * 7 + k * 3 + 11);
for (var f = 0; f < (lite ? 8 : 18); f++) {
var fr = new THREE.Mesh(tmwGeo("fruit", function () { return new THREE.SphereGeometry(0.13, 8, 6); }), fruitM[Math.floor(R() * 4)]);
fr.position.set(tx - 4 + R() * 8, 0.42 + R() * 0.2, tz - 0.8 + R() * 1.6);
g.add(fr);
}
for (var c = 0; c < 4; c++) {
tmwBox(g, 1.0, 0.22, 1.0, cush[(c + r) % 4], tx - 3.4 + c * 2.3, 0, tz + (c % 2 ? 1.9 : -1.9));
}
});
if (!lite && (TMW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFFE0B0, 0.6, 40);
L.position.set(0, 8, 0);
g.add(L);
TMW.lights = (TMW.lights || 0) + 1;
TMW.hallLight = L;
}
return g;
},
function (G, x, z, s) {
s = s || 1;
var y = tmwFutH(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.scale.setScalar(s);
G.add(g);
var st = tmwMat("greystone"), bz = tmwMat("verdigris");
var ring = new THREE.Mesh(tmwGeo("wellring", function () { var c = new THREE.CylinderGeometry(1.6, 1.7, 1.0, 24, 1, true); return c; }), tmwM("wellm", function () { var m = tmwMat("greystone").clone(); m.side = THREE.DoubleSide; return m; }));
ring.position.y = 0.5;
g.add(ring);
var lip = new THREE.Mesh(tmwGeo("welllip", function () { return new THREE.TorusGeometry(1.65, 0.14, 6, 24); }), st);
lip.rotation.x = Math.PI / 2;
lip.position.y = 1.0;
g.add(lip);
var dark = new THREE.Mesh(tmwGeo("wellpit", function () { return new THREE.CircleGeometry(1.55, 20); }), tmwLam(0x020202));
dark.rotation.x = -Math.PI / 2;
dark.position.y = 0.4;
g.add(dark);
for (var i = 0; i < 4; i++) {
var a = i / 4 * Math.PI * 2 + Math.PI / 4;
tmwCyl(g, 0.08, 0.09, 2.4, bz, Math.cos(a) * 1.55, 1.0, Math.sin(a) * 1.55, 8);
}
var cup = new THREE.Mesh(tmwGeo("wellcup", function () { return new THREE.SphereGeometry(2.0, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2); }), bz);
cup.scale.y = 0.6;
cup.position.y = 3.4;
g.add(cup);
var fin = tmwCyl(g, 0.06, 0.12, 0.6, bz, 0, 4.5, 0, 8);
tmwRound(x, z, 1.9 * s, y - 1, y + 1.1);
TMW.wells = TMW.wells || [];
TMW.wells.push({ x: x, z: z, y: y });
return g;
},
function (G, x, z, h) {
var y = tmwFutH(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var st = tmwMat("greystone");
tmwCyl(g, 1.2, 1.8, h, st, 0, 0, 0, 10);
tmwCyl(g, 1.5, 1.3, 1.4, tmwMat("verdigris"), 0, h, 0, 10);
for (var i = 0; i < 6; i++) {
tmwBox(g, 0.5, 1.2, 0.1, tmwLam(0x141414), Math.cos(i / 6 * 6.283) * 1.42, h + 0.1, Math.sin(i / 6 * 6.283) * 1.42).rotation.y = -i / 6 * 6.283;
}
var sh = new THREE.Mesh(tmwGeo("shim", function () { return new THREE.CylinderGeometry(1.6, 1.2, 6, 12, 1, true); }), tmwLam(0xFFFFFF, { op: 0.06, ds: 1 }));
sh.position.y = h + 4.5;
g.add(sh);
tmwSolid(x, z, 3.6, 3.6, y - 1, y + h);
return g;
},
function (G, x, z, w, d, h, seed, ruin) {
var y = tmwFutH(x, z) - 0.6, g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var R = wRand(seed), lite = tmwLite();
var m = [tmwMat("greystone"), tmwMat("white"), tmwMat("ashlar"), tmwMat("porcelain")][Math.floor(R() * 4)], m2 = tmwMat("greystone");
tmwBox(g, w + 2, 1.2, d + 2, m2, 0, 0, 0);
if (ruin) {
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2, hh = h * (0.3 + R() * 0.7);
tmwBox(g, i % 2 ? w * 0.9 : 2.4, hh, i % 2 ? 1.4 : d * 0.7, m, Math.cos(a) * w * 0.42, 1.2, Math.sin(a) * d * 0.42, a);
tmwSolid(x + Math.cos(a) * w * 0.42, z + Math.sin(a) * d * 0.42, i % 2 ? w * 0.9 : 2.4, i % 2 ? 1.4 : d * 0.7, y - 1, y + hh + 1, a);
}
for (i = 0; i < 8; i++) {
var b = tmwBox(g, 1 + R() * 3, 0.8 + R() * 1.4, 1 + R() * 2, m, (R() - 0.5) * w * 1.2, 0.6, (R() - 0.5) * d * 1.2, R() * 3);
b.rotation.z = (R() - 0.5) * 0.4;
}
tmwPlant(g, "ivy", [{ x: -w * 0.4, z: 0, y: 1.2, s: 1.4 }, { x: w * 0.3, z: d * 0.3, y: 1.2, s: 1.2 }], { keepAll: 1 });
}
else {
tmwBox(g, w, h, d, m, 0, 1.2, 0);
var n = Math.max(4, Math.floor(w / 3.4));
for (var c = 0; c < n; c++)
tmwCyl(g, 0.45, 0.55, h * 0.7, m2, -w / 2 + 1.7 + c * (w - 3.4) / (n - 1), 1.2, d / 2 + 2.2, 12);
tmwBox(g, w + 1, 1.2, 4.4, m2, 0, 1.2 + h * 0.7, d / 2 + 1.4);
tmwBox(g, w + 1.2, 1.0, d + 1.2, m2, 0, 1.2 + h, 0);
if (R() < 0.6) {
var dm = new THREE.Mesh(tmwGeo("piledome", function () { return new THREE.SphereGeometry(1, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2); }), R() < 0.5 ? tmwMat("verdigris") : tmwMat("white"));
dm.scale.set(Math.min(w, d) * 0.32, Math.min(w, d) * 0.32, Math.min(w, d) * 0.32);
dm.position.y = 2.2 + h;
g.add(dm);
}
for (c = 0; c < n; c++)
for (var f = 0; f < Math.floor(h / 5); f++)
tmwBox(g, 1.2, 2.2, 0.1, tmwLam(0x1A1E22), -w / 2 + 1.7 + c * (w - 3.4) / Math.max(1, n - 1), 2.4 + f * 5, d / 2 + 0.02);
tmwSolid(x, z, w + 2, d + 6, y - 1, y + h + 2);
}
return g;
},
function (G, x, z) {
var y = tmwFlatH(3), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var ym = tmwS("b:brass", 0xC8A050, 1.2, { shine: 50 }), rust = tmwLam(0xC88A7A, { op: 0.4 });
tmwBox(g, 2.4, 0.12, 0.7, ym, 0, 0.48, 0);
tmwBox(g, 2.4, 0.8, 0.08, ym, 0, 0.6, -0.34);
[-1, 1].forEach(function (k) {
tmwBox(g, 0.1, 0.48, 0.6, ym, k * 1.1, 0, 0);
var gh = new THREE.Group();
gh.position.set(k * 1.25, 0.76, 0.18);
g.add(gh);
tmwEll(gh, ym, 0.14, 0.16, 0.22, 0, 0, 0, 10);
var bk = new THREE.Mesh(tmwGeo("beak", function () { return new THREE.ConeGeometry(0.06, 0.22, 6); }), ym);
bk.rotation.x = Math.PI / 2;
bk.position.set(0, -0.02, 0.24);
gh.add(bk);
[-1, 1].forEach(function (e) { var er = new THREE.Mesh(tmwGeo("gear", function () { return new THREE.ConeGeometry(0.04, 0.14, 5); }), ym); er.position.set(e * 0.07, 0.16, -0.04); gh.add(er); });
});
tmwBox(g, 1.0, 0.02, 0.4, rust, 0.4, 0.6, 0);
tmwBox(g, 2.6, 0.06, 0.9, tmwMat("moss"), 0, 0, 0);
tmwSolid(x, z, 2.6, 0.8, y - 1, y + 0.5);
return g;
},
function (G) {
var P = TMW_PAL, y = tmwFlatH(2), g = new THREE.Group();
g.position.y = y;
G.add(g);
var pc = tmwMat("porcelain"), fr = tmwMat("iron"), lite = tmwLite();
var cx = (P.x0 + P.x1) / 2, cz = (P.z0 + P.z1) / 2, W = P.x1 - P.x0, D = P.z1 - P.z0;
var wz = function (z, x0, x1, gaps, mat, h) {
h = h || P.h;
var segs = [[x0, x1]];
(gaps || []).forEach(function (G2) { var a = G2[0] - G2[1] / 2, b = G2[0] + G2[1] / 2, ns = []; segs.forEach(function (s) { if (b <= s[0] || a >= s[1]) {
ns.push(s);
return;
} if (a > s[0])
ns.push([s[0], a]); if (b < s[1])
ns.push([b, s[1]]); }); segs = ns; tmwBox(g, G2[1], h - G2[2], 1.0, mat, G2[0], G2[2], z); });
segs.forEach(function (s) { tmwBox(g, s[1] - s[0], h, 1.0, mat, (s[0] + s[1]) / 2, 0, z); tmwSolid((s[0] + s[1]) / 2, z, s[1] - s[0], 1.2, y - 1, y + h); });
};
var wx = function (x, z0, z1, gaps, mat, h) {
h = h || P.h;
var segs = [[z0, z1]];
(gaps || []).forEach(function (G2) { var a = G2[0] - G2[1] / 2, b = G2[0] + G2[1] / 2, ns = []; segs.forEach(function (s) { if (b <= s[0] || a >= s[1]) {
ns.push(s);
return;
} if (a > s[0])
ns.push([s[0], a]); if (b < s[1])
ns.push([b, s[1]]); }); segs = ns; tmwBox(g, 1.0, h - G2[2], G2[1], mat, x, G2[2], G2[0]); });
segs.forEach(function (s) { tmwBox(g, 1.0, h, s[1] - s[0], mat, x, 0, (s[0] + s[1]) / 2); tmwSolid(x, (s[0] + s[1]) / 2, 1.2, s[1] - s[0], y - 1, y + h); });
};
var inner = tmwMat("plaster");
wz(P.z1, P.x0, P.x1, [[-700, 7, 8]], pc);
wz(P.z0, P.x0, P.x1, [], pc);
wx(P.x0, P.z0, P.z1, [], pc);
wx(P.x1, P.z0, P.z1, [], pc);
wx(-716, -680, P.z1, [[-625, 3.4, 3.4], [-665, 3.4, 3.4]], inner, 12);
wz(-640, P.x0, -716, [[-738, 3.4, 3.4]], inner, 12);
wx(-684, P.z0, P.z1, [[-630, 3.4, 3.4], [-670, 3.4, 3.4]], inner, 12);
wz(-680, -716, -684, [[-700, 6, 4]], inner, 12);
wx(-716, P.z0, -680, [], inner, 12);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(W, D), tmwS("b:darktile", 0x9A9488, 2.4));
fl.rotation.x = -Math.PI / 2;
fl.position.set(cx, 0.05, cz);
g.add(fl);
var dust = new THREE.Mesh(new THREE.PlaneGeometry(W, D), tmwLam(0xB8B0A0, { op: 0.45 }));
dust.rotation.x = -Math.PI / 2;
dust.position.set(cx, 0.07, cz);
g.add(dust);
var R = wRand(707);
for (var i = 0; i < 12; i++) {
for (var j = 0; j < 10; j++) {
if (R() < 0.12)
continue;
tmwBox(g, W / 12, 0.6, D / 10, pc, P.x0 + (i + 0.5) * W / 12, P.h, P.z0 + (j + 0.5) * D / 10);
}
}
for (i = 0; i < 10; i++) {
[P.z1 + 0.52, P.z0 - 0.52].forEach(function (z) { tmwBox(g, 1.0, 4.4, 0.1, tmwLam(0x1A2420), P.x0 + 6 + i * 12, 5, z); });
[P.x0 - 0.52, P.x1 + 0.52].forEach(function (x) { tmwBox(g, 0.1, 4.4, 1.0, tmwLam(0x1A2420), x, 5, P.z0 + 6 + i * 9); });
}
var pin = function (x, z, h, r) { tmwCyl(g, r, r * 1.15, h, pc, x, 0, z, 8); var cn = new THREE.Mesh(tmwGeo("palpin", function () { return new THREE.ConeGeometry(1, 1, 8); }), pc); cn.scale.set(r * 1.2, h * 0.55, r * 1.2); cn.position.set(x, h + h * 0.275, z); g.add(cn); tmwCyl(g, r * 1.25, r * 1.25, 0.5, fr, x, h - 0.4, z, 8); };
[[P.x0, P.z0], [P.x1, P.z0], [P.x0, P.z1], [P.x1, P.z1]].forEach(function (q) { pin(q[0], q[1], P.h + 12, 2.6); tmwSolid(q[0], q[1], 5.4, 5.4, y - 1, y + P.h + 12); });
[-722, -678].forEach(function (x) { pin(x, P.z1 + 0.4, P.h + 8, 1.6); });
for (i = 0; i < 9; i++) {
var px = P.x0 + 12 + i * 12;
if (Math.abs(px + 700) < 8)
continue;
[P.z1 + 0.7, P.z0 - 0.7].forEach(function (z) { tmwBox(g, 1.4, P.h + 0.6, 0.8, pc, px, 0, z); pin(px, z, P.h + 3.2, 0.55); });
}
for (i = 0; i < 7; i++) {
var pz = P.z0 + 8 + i * 12.5;
[P.x0 - 0.7, P.x1 + 0.7].forEach(function (x) { tmwBox(g, 0.8, P.h + 0.6, 1.4, pc, x, 0, pz); pin(x, pz, P.h + 3.2, 0.55); });
}
tmwBox(g, W + 1.2, 1.0, 0.5, pc, cx, P.h + 0.6, P.z1 + 0.3);
tmwBox(g, W + 1.2, 1.0, 0.5, pc, cx, P.h + 0.6, P.z0 - 0.3);
tmwBox(g, 0.5, 1.0, D + 1.2, pc, P.x0 - 0.3, P.h + 0.6, cz);
tmwBox(g, 0.5, 1.0, D + 1.2, pc, P.x1 + 0.3, P.h + 0.6, cz);
tmwBox(g, 16, 1.2, 4, pc, -700, P.h - 1.6, P.z1 + 2.4);
[-1, 1].forEach(function (k) { tmwBox(g, 1.6, P.h - 1.6, 1.6, pc, -700 + k * 7.4, 0, P.z1 + 3.6); pin(-700 + k * 7.4, P.z1 + 3.6, P.h + 4, 0.8); tmwSolid(-700 + k * 7.4, P.z1 + 3.6, 1.8, 1.8, y - 1, y + P.h); });
var gb = new THREE.Mesh(tmwGeo("palgable", function () { var sh = new THREE.Shape(); sh.moveTo(-8, 0); sh.lineTo(8, 0); sh.lineTo(0, 6); sh.lineTo(-8, 0); return new THREE.ExtrudeGeometry(sh, { depth: 1, bevelEnabled: false }); }), pc);
gb.position.set(-700, P.h - 0.4, P.z1 + 3.6);
g.add(gb);
for (i = 0; i < 8; i++) {
var sx = P.x0 + 8 + R() * (W - 16), sh = 3 + R() * 5;
tmwBox(g, 4 + R() * 4, sh, 0.3, tmwLam(0x5A4A3A), sx, 2 + R() * 6, P.z1 + 0.62);
for (var b = 0; b < 4; b++)
tmwBox(g, 0.12, sh + 1, 0.14, fr, sx - 1.5 + b * 1.0, 1.5, P.z1 + 0.82);
}
var ins = new THREE.Mesh(new THREE.PlaneGeometry(18, 1.6), tmwLam(0xFFFFFF, { map: tmwCanvas("palins", 512, 46, function (c, W2, H2) {
c.fillStyle = "#8AC8A8";
c.fillRect(0, 0, W2, H2);
c.fillStyle = "#2A4A3A";
var R2 = wRand(5);
var x0 = 10;
while (x0 < W2 - 20) {
var k = Math.floor(R2() * 5);
c.fillRect(x0, 10, 4, 26);
if (k > 1)
c.fillRect(x0, 10, 14, 4);
if (k > 2)
c.fillRect(x0 + 10, 22, 4, 14);
if (k === 4)
c.beginPath(), c.arc(x0 + 8, 24, 5, 0, 7), c.fill();
x0 += 22;
}
}), mapk: "palins" }));
ins.position.set(-700, 10.5, P.z1 + 0.56);
g.add(ins);
[-1, 1].forEach(function (k) { var v = tmwBox(g, 3.2, 7.4, 0.24, tmwMat("bronze"), -700 + k * 5.6, 0, P.z1 + 1.6); v.rotation.y = k * 0.9; v.rotation.z = k * 0.04; });
var bone = tmwLam(0xD8CCB0);
var mega = new THREE.Group();
mega.position.set(-700, 0, -628);
g.add(mega);
[-1, 1].forEach(function (k) { tmwCyl(mega, 0.18, 0.24, 2.2, bone, k * 0.9, 0, 0, 8); tmwCyl(mega, 0.16, 0.2, 2.0, bone, k * 0.9, 0, -1.8, 8); tmwBox(mega, 0.5, 0.15, 0.9, bone, k * 0.9, 0, 0.5); });
tmwEll(mega, bone, 1.2, 0.5, 1.4, 0, 2.4, -0.9, 10);
tmwEll(mega, bone, 0.5, 0.35, 0.6, 1.8, 0.2, 1.6, 8);
tmwSolid(-700, -628, 3, 4, y - 1, y + 3);
var bron = new THREE.Group();
bron.position.set(-700, 0, -655);
g.add(bron);
for (i = 0; i < 14; i++) {
var a = i / 13 * Math.PI;
var rb = new THREE.Mesh(tmwGeo("rib", function () { return new THREE.TorusGeometry(2.2, 0.1, 6, 16, Math.PI); }), bone);
rb.position.set(0, 3.8, -4 + i * 0.62);
g.add(rb);
rb.position.add(bron.position);
}
tmwCyl(bron, 0.2, 0.25, 10, bone, 0, 5.8, 0, 8).rotation.x = Math.PI / 2;
for (i = 0; i < 4; i++)
tmwCyl(bron, 0.3, 0.4, 4, bone, (i % 2 ? 1 : -1) * 1.6, 0, (i < 2 ? -3 : 3), 8);
var neck = new THREE.Mesh(tmwTaper([[0, 6, -5], [0, 7.4, -8], [0, 8.6, -11], [0, 9.2, -13]], [0.4, 0.3, 0.24, 0.18], 8), bone);
bron.add(neck);
var tail = new THREE.Mesh(tmwTaper([[0, 6, 5], [0, 4.4, 8], [0, 2.2, 11], [0, 0.6, 14]], [0.4, 0.3, 0.2, 0.1], 8), bone);
bron.add(tail);
tmwSolid(-700, -655, 5, 24, y - 1, y + 10);
var cases = function (x, z0, z1, face) {
for (var zz = z0; zz <= z1; zz += 4.2) {
tmwBox(g, 1.4, 1.0, 3.6, tmwMat("oak"), x, 0, zz);
var gl = tmwBox(g, 1.4, 0.05, 3.6, tmwMat("quartz"), x, 1.02, zz);
gl.rotation.z = face * 0.3;
tmwSolid(x, zz, 1.4, 3.6, y - 1, y + 1.2);
var R3 = wRand(Math.round(zz * 3 + x));
for (var k = 0; k < 4; k++) {
var f = new THREE.Mesh(tmwGeo("fossil", function () { return new THREE.TorusGeometry(0.12, 0.05, 6, 10); }), tmwLam([0x8A7A6A, 0x6A5A4A, 0xA89A88][Math.floor(R3() * 3)]));
f.position.set(x, 1.0, zz - 1.2 + k * 0.8);
f.rotation.x = -Math.PI / 2;
g.add(f);
}
}
};
cases(-713, -676, -614, 1);
cases(-687, -676, -614, -1);
for (i = 0; i < 4; i++)
for (j = 0; j < 2; j++) {
var mx = -752 + i * 10, mz = -632 + j * 14;
tmwBox(g, 6, 1.0, 1.4, tmwMat("oak"), mx, 0, mz);
tmwSolid(mx, mz, 6, 1.4, y - 1, y + 1.2);
var R4 = wRand(i * 7 + j);
for (var k2 = 0; k2 < 6; k2++) {
var cr = new THREE.Mesh(tmwGeo("crys", function () { return new THREE.OctahedronGeometry(0.2, 0); }), tmwShine([0xC8A8E8, 0x8AC8E8, 0xE8E8F0, 0xE8B06A, 0x9AE8A8][Math.floor(R4() * 5)], 0.2, 0.2));
cr.position.set(mx - 2.4 + k2 * 0.95, 1.2, mz);
cr.scale.y = 1.6;
g.add(cr);
}
}
var sul = tmwBox(g, 1.0, 0.8, 0.8, tmwLam(0xE8D84A, { e: 0x3A3410 }), -734, 0, -626);
TMW.sulphur = { x: -734, z: -626 };
var R5 = wRand(55);
for (i = 0; i < 9; i++) {
var ex = -672 + (i % 2) * 20, ez = -616 - i * 9.6;
if (i === 6)
ex = -654;
var eg = new THREE.Group();
eg.position.set(ex, 0, ez);
g.add(eg);
tmwBox(eg, 4 + R5() * 2, 2 + R5() * 2.6, 3, tmwMat("iron"), 0, 0, 0);
tmwCyl(eg, 0.8, 0.8, 3.2, tmwLam(0x5A3A2A), 0, 2.8, 0, 14).rotation.z = Math.PI / 2;
tmwBox(eg, 0.3, 1.6, 0.3, tmwLam(0x6A4A3A), 1.8, 2.4, 1.0);
tmwSolid(ex, ez, 6, 3.4, y - 1, y + 4);
}
var lv = new THREE.Group();
lv.position.set(-654, 0, -680);
g.add(lv);
tmwBox(lv, 2.2, 1.6, 1.4, tmwMat("iron"), 0, 0, 0);
var arm = tmwCyl(lv, 0.06, 0.07, 2.2, tmwMat("iron"), 0, 1.6, 0.4, 8);
arm.rotation.x = -0.3;
TMW.leverArm = arm;
var dk = new THREE.Mesh(new THREE.PlaneGeometry(42, 24), tmwLam(0x000000, { op: 0.7 }));
dk.rotation.x = -Math.PI / 2;
dk.position.set(-662, 0.1, -693);
g.add(dk);
for (i = 0; i < 3; i++) {
var dv = new THREE.Mesh(new THREE.PlaneGeometry(42, 12), tmwLam(0x000000, { op: 0.35 + i * 0.2, ds: 1 }));
dv.position.set(-662, 6, -686 - i * 6);
g.add(dv);
}
for (i = 0; i < 8; i++) {
[-758.4, -717.6].forEach(function (x) { tmwBox(g, 0.8, 6, 5, tmwMat("oak"), x, 0, -700 + i * 7.6); tmwSolid(x, -700 + i * 7.6, 0.9, 5, y - 1, y + 6); var rag = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 4.4), tmwLam(0x5A4030, { ds: 1, op: 0.9 })); rag.position.set(x + (x < -730 ? 0.5 : -0.5), 3.6, -700 + i * 7.6); rag.rotation.y = Math.PI / 2; g.add(rag); });
}
for (i = 0; i < 5; i++) {
tmwBox(g, 6, 1, 1.4, tmwMat("oak"), -738, 0, -698 + i * 12);
tmwSolid(-738, -698 + i * 12, 6, 1.4, y - 1, y + 1.2);
}
for (i = 0; i < 6; i++) {
var aX = -752 + i * 6;
tmwBox(g, 0.2, 2.2, 1.6, tmwLam(0x4A3A2A), aX, 0, -646);
for (var k3 = 0; k3 < 4; k3++) {
var gun = tmwBox(g, 0.06, 1.6, 0.06, tmwLam(0x6A3A20), aX + 0.1, 0.4, -646.6 + k3 * 0.4);
gun.rotation.z = 0.12;
}
}
tmwBox(g, 32, 2.4, 24, tmwMat("ashlar"), -700, 0, -693);
tmwFloor(-700, -693, 32, 24, y + 2.4);
for (i = 0; i < 8; i++)
tmwBox(g, 6, 0.3 * (i + 1), 0.5, tmwMat("ashlar"), -700, 0, -678 + i * 0.5 - 4);
tmwRamp(-700, -680, 6, 4.4, y, y + 2.4, Math.PI);
for (i = 0; i < 4; i++) {
[-712, -688].forEach(function (x) { tmwBox(g, 1.2, 1.2, 3.6, tmwMat("oak"), x, 2.4, -702 + i * 5.4); tmwBox(g, 1.2, 0.8, 3.6, tmwMat("quartz"), x, 3.6, -702 + i * 5.4); tmwSolid(x, -702 + i * 5.4, 1.3, 3.6, y + 2, y + 4.4); });
}
var jars = [];
for (i = 0; i < 10; i++) {
var jr = new THREE.Mesh(tmwGeo("jar", function () { return new THREE.CylinderGeometry(0.12, 0.12, 0.34, 10); }), tmwMat("quartz"));
jr.position.set(i % 2 ? -712 : -688, 3.8, -702 + Math.floor(i / 2) * 4.2);
g.add(jr);
}
for (i = 0; i < 5; i++) {
var fb = tmwBox(g, 2 + i * 0.6, 0.8, 1.8, pc, -690 + i * 1.5, 2.4, -702 + i * 0.8);
fb.rotation.set(0.3 * i, 0.5 * i, 0.2);
}
var ct = new THREE.Mesh(new THREE.PlaneGeometry(40, 30), tmwMat("lawn"));
ct.rotation.x = -Math.PI / 2;
ct.position.set(-700, 0.05, -724);
g.add(ct);
wz(-739, -720, -680, [], pc, 4);
wx(-720, -739, -705, [[-722, 4, 4]], pc, 4);
wx(-680, -739, -705, [], pc, 4);
tmwPlant(G, "fruit", [{ x: -708, z: -722, y: y, s: 1 }, { x: -694, z: -728, y: y, s: 0.9 }, { x: -700, z: -716, y: y, s: 1.1 }], { keepAll: 1 });
return g;
},
function (x, z) {
if (Math.abs(z - tmwRiverZ(x)) < 40)
return false;
for (var i = 0; i < TMW_FLAT.length; i++) {
var F = TMW_FLAT[i];
if (Math.hypot(x - F.x, z - F.z) < F.r + 4)
return false;
}
if (x > -770 && x < -630 && z > -750 && z < -600)
return false;
var W = TMW.wells || [];
for (i = 0; i < W.length; i++)
if (Math.hypot(x - W[i].x, z - W[i].z) < 6)
return false;
var Pl = TMW.piles || [];
for (i = 0; i < Pl.length; i++)
if (Math.abs(x - Pl[i].x) < Pl[i].w / 2 + 6 && Math.abs(z - Pl[i].z) < Pl[i].d / 2 + 8)
return false;
return true;
},
function (G) {
var lite = tmwLite(), H = tmwFutH;
TMW.wells = [];
TMW.piles = [];
tmwTerrain(G, -980, -980, 1960, 1960, lite ? 20 : 12, H, tmwMat("grass"), function (x, z, y, c) {
var w = tmwInWood(x, z) ? 0.7 : 1, n = tmwFbm(x * 0.02, z * 0.02, 3);
var dr = Math.abs(z - tmwRiverZ(x));
if (dr < 30) {
c.setRGB(0.92, 0.86, 0.7);
return;
}
if (Math.hypot(x, z - 4) < 36) {
c.setRGB(0.78, 0.98, 0.62);
return;
}
c.setRGB((0.72 + n * 0.2) * w, (0.9 + n * 0.12) * w, (0.58 + n * 0.1) * w);
});
tmwRiver(G);
var hillM = tmwLam(0x8AA0B0);
for (var i = 0; i < 24; i++) {
var a = i / 24 * Math.PI * 2, r = 1700 + ((i * 37) % 5) * 120, hh = 80 + ((i * 53) % 7) * 30;
var hm = new THREE.Mesh(tmwGeo("fhill", function () { return new THREE.SphereGeometry(1, 14, 6, 0, Math.PI * 2, 0, Math.PI / 2); }), hillM);
hm.scale.set(380, hh, 260);
hm.position.set(Math.cos(a) * r, -10, Math.sin(a) * r);
hm.rotation.y = -a;
G.add(hm);
}
var ring = [];
for (i = 0; i < (lite ? 22 : 40); i++) {
var a2 = i / (lite ? 22 : 40) * Math.PI * 2, rr = 30 + Math.sin(i * 1.7) * 3;
if (Math.abs(Math.sin(a2)) > 0.94 && Math.sin(a2) > 0)
continue;
var rx = Math.cos(a2) * rr, rz = 4 + Math.sin(a2) * rr;
ring.push({ x: rx, z: rz, y: H(rx, rz), s: 0.9 + ((i * 7) % 4) * 0.15, ry: a2 });
}
tmwPlant(G, "rhodo", ring.filter(function (t, i) { return i % 2; }), { col: 0xB04A9A, keepAll: 1 });
tmwPlant(G, "rhodo", ring.filter(function (t, i) { return !(i % 2); }), { col: 0x8A4AB8, keepAll: 1 });
tmwTreesSolid(ring, 1.4);
tmwPlant(G, "flowers", tmwScatter(101, lite ? 60 : 140, -28, -24, 28, 32, function (x, z) { return Math.hypot(x, z - 4) < 27 && Math.hypot(x, z) > 9; }, H), { col: "#F0D8F0" });
tmwPlant(G, "flowers", tmwScatter(103, lite ? 40 : 100, -28, -24, 28, 32, function (x, z) { return Math.hypot(x, z - 4) < 27 && Math.hypot(x, z) > 9; }, H), { col: "#F8E080" });
tmwSphinx(G, 0, -10);
var M = tmwMachine(1);
M.position.set(0, H(0, 12), 12);
M.rotation.y = Math.PI;
G.add(M);
TMW.machineF = M;
TMW.machineFS = tmwSolid(0, 12, 1.6, 2.6, H(0, 12) - 1, H(0, 12) + 1.6);
tmwGreatHall(G);
[["well1"], ["well2"], ["well3"], ["well4"]].forEach(function (k) { var A = TMW_AT[k[0]]; tmwWell(G, A.x, A.z, 1); });
[[260, 60], [-120, -150], [420, -40], [-430, -140], [340, 240], [-520, 180], [180, -300], [-60, 180]].forEach(function (q) { tmwWell(G, q[0], q[1], 0.9); });
[[TMW_AT.tower.x, TMW_AT.tower.z, 26], [380, 120, 22], [-60, -330, 30], [520, -300, 24], [-560, 60, 20], [240, -520, 28]].forEach(function (q) { tmwVentTower(G, q[0], q[1], q[2]); });
tmwPile(G, -240, 30, 44, 34, 18, 7, true);
TMW.piles.push({ x: -240, z: 30, w: 44, d: 34 });
var R = wRand(4040), piles = [[300, -60, 40, 26, 20, 0], [-120, -60, 30, 22, 16, 1], [420, 140, 36, 30, 22, 0], [-380, 200, 30, 26, 14, 1], [200, 180, 26, 20, 14, 0], [-560, -60, 34, 24, 18, 0], [560, -160, 40, 30, 24, 1], [120, -240, 28, 22, 18, 0], [-180, -260, 26, 20, 12, 1], [640, 40, 40, 32, 26, 0], [-680, -300, 30, 24, 16, 1], [380, -420, 34, 26, 20, 0], [-260, -560, 26, 22, 14, 1], [700, -480, 40, 30, 22, 0], [-820, 120, 36, 28, 18, 1], [60, 520, 40, 30, 20, 0], [-300, 560, 36, 26, 18, 1]];
piles.forEach(function (q, i) { tmwPile(G, q[0], q[1], q[2], q[3], q[4], 100 + i, !!q[5]); TMW.piles.push({ x: q[0], z: q[1], w: q[2], d: q[3] }); });
var rg = new THREE.Group();
rg.position.set(-240, H(-240, 24), 14);
G.add(rg);
tmwBox(rg, 14, 6, 1, tmwMat("ruin"), 0, 0, -6);
tmwBox(rg, 1, 6, 10, tmwMat("ruin"), -7, 0, -1);
tmwBox(rg, 1, 6, 10, tmwMat("ruin"), 7, 0, -1);
tmwBox(rg, 15, 1, 11, tmwMat("ruin"), 0, 6, -1);
var shade = new THREE.Mesh(new THREE.PlaneGeometry(13, 5.6), tmwLam(0x050505, { op: 0.8 }));
shade.position.set(0, 3, -5.4);
rg.add(shade);
tmwSolid(-240, 8, 14, 1.4, -10, 40);
tmwSolid(-247, 13, 1.4, 10, -10, 40);
tmwSolid(-233, 13, 1.4, 10, -10, 40);
var eyes = new THREE.Group();
eyes.position.set(1.4, 1.2, -5.2);
rg.add(eyes);
[-1, 1].forEach(function (k) { var e = new THREE.Mesh(tmwGeo("eye2", function () { return new THREE.SphereGeometry(0.07, 8, 6); }), tmwGlowM(0xC88A80)); e.position.x = k * 0.12; eyes.add(e); });
eyes.visible = false;
TMW.ruinEyes = eyes;
tmwSeat(G, TMW_AT.seat.x, TMW_AT.seat.z);
tmwPalace(G);
var wood = tmwScatter(505, lite ? 260 : 520, -720, -640, -220, -220, function (x, z) { return tmwInWood(x, z) && tmwFutClear(x, z) && Math.hypot(x - TMW_AT.glade.x, z - TMW_AT.glade.z) > 22 && Math.hypot(x - TMW_AT.knoll.x, z - TMW_AT.knoll.z) > 18; }, H, 0.9, 1.5);
var wA = wood.filter(function (t, i) { return i % 3 === 0; }), wB = wood.filter(function (t, i) { return i % 3 === 1; }), wC = wood.filter(function (t, i) { return i % 3 === 2; });
tmwPlant(G, "tree", wA, { col: 0x3A6A2A, keepAll: 1 });
tmwPlant(G, "conifer", wB, { keepAll: 1 });
tmwPlant(G, "tree", wC, { col: 0x4A7A34, keepAll: 1 });
tmwTreesSolid(wood, 0.6);
TMW.wood = wood;
tmwPlant(G, "bush", tmwScatter(507, lite ? 120 : 260, -720, -640, -220, -220, function (x, z) { return tmwInWood(x, z) && tmwFutClear(x, z); }, H, 0.8, 1.3), { col: 0x2E4A26 });
var trees = tmwScatter(601, lite ? 160 : 340, -940, -940, 940, 940, function (x, z) { return !tmwInWood(x, z) && tmwFutClear(x, z) && Math.hypot(x, z) > 40; }, H, 0.8, 1.4);
tmwPlant(G, "fruit", trees.filter(function (t, i) { return i % 3 === 0; }), { keepAll: 1 });
tmwPlant(G, "tree", trees.filter(function (t, i) { return i % 3 === 1; }), { col: 0x5A8A3A, keepAll: 1 });
tmwPlant(G, "birch", trees.filter(function (t, i) { return i % 3 === 2; }), { keepAll: 1 });
tmwTreesSolid(trees, 0.6);
tmwPlant(G, "rhodo", tmwScatter(611, lite ? 40 : 90, -900, -900, 900, 900, function (x, z) { return !tmwInWood(x, z) && tmwFutClear(x, z) && Math.hypot(x, z) > 40; }, H, 0.8, 1.2), { col: 0xC85AA8 });
tmwPlant(G, "grass", tmwScatter(701, lite ? 600 : 1800, -700, -700, 700, 600, function (x, z) { return tmwFutClear(x, z); }, H, 0.9, 1.6), { col: 0xD8F0B0 });
["#F4F0E0", "#F0C8E8", "#F8E070", "#C8D8FF"].forEach(function (c, k) { tmwPlant(G, "flowers", tmwScatter(711 + k, lite ? 150 : 400, -700, -700, 700, 600, function (x, z) { return tmwFutClear(x, z); }, H, 0.8, 1.3), { col: c }); });
tmwPlant(G, "reeds", tmwScatter(731, lite ? 60 : 160, -900, 250, 900, 470, function (x, z) { var d = Math.abs(z - tmwRiverZ(x)); return d > 34 && d < 46; }, H), {});
tmwEloi("lawn", lite ? 6 : 12, -24, -2, 24, 30, { ok: function (x, z) { return Math.hypot(x, z + 10) > 9; } });
tmwEloi("hall", lite ? 6 : 12, 130, -100, 190, -70, {});
tmwEloi("hallin", lite ? 4 : 8, 150, -145, 170, -110, { wander: 4, y: tmwFlatH(1) + 0.05 });
tmwEloi("river", lite ? 5 : 10, -60, 300, 180, 320, {});
tmwEloi("slope", lite ? 4 : 10, -160, -220, 240, -100, {});
tmwEloi("hill", lite ? 2 : 5, 30, -440, 90, -400, {});
TMW.night = TMW.night || false;
},
function (G) {
var lite = tmwLite(), cave = tmwMat("cave");
TMW.morlocks = [];
var sh = new THREE.Mesh(tmwGeo("shaft", function () { return new THREE.CylinderGeometry(1.8, 1.8, 60, 16, 1, true); }), tmwM("shaftm", function () { var m = tmwMat("cave").clone(); m.side = THREE.BackSide; return m; }));
sh.position.set(0, 32, 2);
G.add(sh);
for (var i = 0; i < 26; i++) {
var hk = new THREE.Mesh(tmwGeo("hook", function () { return new THREE.TorusGeometry(0.16, 0.03, 5, 8, Math.PI); }), tmwMat("iron"));
hk.position.set(0, 1.2 + i * 1.1, 3.7);
hk.rotation.x = Math.PI / 2;
G.add(hk);
}
var sky = new THREE.Mesh(new THREE.CircleGeometry(1.7, 16), tmwGlowM(0xB8C8E0));
sky.rotation.x = Math.PI / 2;
sky.position.set(0, 61, 2);
G.add(sky);
var floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 150), tmwMat("cave"));
floor.rotation.x = -Math.PI / 2;
floor.position.set(0, 0.01, -60);
G.add(floor);
for (var a = 0; a < 10; a++) {
var an = a / 10 * Math.PI * 2;
if (Math.abs(Math.sin(an) + 1) < 0.4)
continue;
tmwBox(G, 2.4, 6, 0.8, cave, Math.cos(an) * 4.2, 0, 2 + Math.sin(an) * 4.2, -an + Math.PI / 2, true);
}
var tp = [[0, -2], [1.4, -12], [-0.8, -22], [1.2, -32], [0, -44], [-1.6, -54], [0, -62]];
for (i = 1; i < tp.length; i++) {
var A = tp[i - 1], B = tp[i], dx = B[0] - A[0], dz = B[1] - A[1], L = Math.hypot(dx, dz), r = Math.atan2(dx, dz), mx = (A[0] + B[0]) / 2, mz = (A[1] + B[1]) / 2, nx = Math.cos(r), nz = -Math.sin(r);
[-1, 1].forEach(function (k) { tmwBox(G, 0.8, 3.2, L + 0.6, cave, mx + nx * k * 2.0, 0, mz + nz * k * 2.0, r, true); });
tmwBox(G, 4.8, 0.6, L + 0.6, cave, mx, 3.0, mz, r);
}
var cv = new THREE.Mesh(tmwGeo("cavern", function () { var c = new THREE.SphereGeometry(1, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2); return c; }), tmwM("cavernm", function () { var m = tmwMat("cave").clone(); m.side = THREE.BackSide; return m; }));
cv.scale.set(30, 14, 28);
cv.position.set(0, 0, -92);
G.add(cv);
for (i = 0; i < 28; i++) {
var a2 = i / 28 * Math.PI * 2;
if (Math.abs(a2 - Math.PI / 2) < 0.18)
continue;
tmwBox(G, 7, 10, 2, cave, Math.cos(a2) * 29.5, 0, -92 + Math.sin(a2) * 27.5, -a2 + Math.PI / 2, true);
}
var R = wRand(4141);
TMW.engines = [];
for (i = 0; i < 7; i++) {
var ex = -18 + (i % 4) * 12, ez = -84 - Math.floor(i / 4) * 18 - (i % 2) * 4;
var eg = new THREE.Group();
eg.position.set(ex, 0, ez);
G.add(eg);
tmwBox(eg, 4, 3 + R() * 3, 3, tmwMat("iron"), 0, 0, 0);
var wh = new THREE.Mesh(tmwGeo("flyw", function () { return new THREE.TorusGeometry(1.6, 0.25, 8, 20); }), tmwMat("iron"));
wh.position.set(2.4, 2.6, 0);
wh.rotation.y = Math.PI / 2;
eg.add(wh);
TMW.engines.push(wh);
tmwCyl(eg, 0.3, 0.3, 6, tmwMat("iron"), -1, 3, 0, 8);
tmwSolid(ex, ez, 6.2, 4, -1, 8);
}
var tb = tmwTable(G, TMW_AT.meat.x, TMW_AT.meat.z, 1.6, 1.0, 0.8, tmwMat("iron"));
tmwSolid(TMW_AT.meat.x, TMW_AT.meat.z, 1.7, 1.1, -1, 1);
tmwEll(G, tmwLam(0x8A4A40), 0.4, 0.15, 0.3, TMW_AT.meat.x, 0.92, TMW_AT.meat.z, 10);
tmwSmoke(G, -8, 0.5, -96, 0x2A2622, 8);
tmwSmoke(G, 10, 0.5, -100, 0x2A2622, 8);
for (i = 0; i < (lite ? 6 : 12); i++) {
var m = tmwMorlock(300 + i), mx = -14 + R() * 28, mz = -82 - R() * 20;
m.position.set(mx, 0, mz);
m.rotation.y = R() * 6.283;
G.add(m);
TMW.morlocks.push({ g: m, home: { x: mx, z: mz }, t: R() * 10, flee: 0 });
}
var ml = new THREE.PointLight(0xFFB060, 0, 9);
ml.position.set(0, 1.5, 0);
G.add(ml);
TMW.matchLight = ml;
},
function (s) {
var g = new THREE.Group(), M = tmwM("crabm", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8A2A20, shininess: 30, specular: 0x3A1A1A }); m.userData.noPhoto = 1; return m; }), lch = tmwLam(0x4A6A3A);
tmwEll(g, M, 1.6, 0.6, 1.3, 0, 0.9, 0, 16);
tmwEll(g, lch, 0.8, 0.12, 0.6, 0.3, 1.42, -0.2, 10);
var legs = [];
[-1, 1].forEach(function (k) { for (var i = 0; i < 4; i++) {
var L = tmwPiv(g, k * 1.3, 0.8, -0.6 + i * 0.45);
L.rotation.z = k * 0.6;
tmwEll(L, M, 0.9, 0.1, 0.1, k * 0.9, 0, 0, 6);
var L2 = tmwPiv(L, k * 1.7, 0, 0);
L2.rotation.z = k * -1.2;
tmwEll(L2, M, 0.8, 0.08, 0.08, k * 0.7, 0, 0, 6);
legs.push(L);
} });
var claws = [];
[-1, 1].forEach(function (k) { var C = tmwPiv(g, k * 0.8, 0.9, -1.2); tmwEll(C, M, 0.3, 0.25, 0.9, 0, 0, -0.8, 8); tmwEll(C, M, 0.5, 0.35, 0.6, 0, 0, -1.8, 10); claws.push(C); });
var ants = [];
[-1, 1].forEach(function (k) { var A = tmwPiv(g, k * 0.3, 1.2, -1.2); A.rotation.x = -0.6; var w = new THREE.Mesh(tmwTaper([[0, 0, 0], [k * 0.4, 1.2, -1], [k * 0.6, 2.0, -2.4], [k * 0.4, 2.4, -3.6]], [0.05, 0.04, 0.025, 0.01], 5), M); A.add(w); ants.push(A); });
[-1, 1].forEach(function (k) { var st = tmwPiv(g, k * 0.4, 1.3, -1.2); tmwCyl(st, 0.05, 0.05, 0.4, M, 0, 0, 0, 5); var e = new THREE.Mesh(tmwGeo("crabeye", function () { return new THREE.SphereGeometry(0.1, 8, 6); }), tmwLam(0x141414)); e.position.y = 0.42; st.add(e); });
g.userData.j = { legs: legs, claws: claws, ants: ants };
g.scale.setScalar(s || 1);
return g;
},
function (G) {
var lite = tmwLite(), H = TMW_SCN.further.h;
TMW.crabs = [];
tmwTerrain(G, -420, -420, 840, 840, lite ? 14 : 8, H, tmwMat("sand"), function (x, z, y, c) { var n = tmwFbm(x * 0.05, z * 0.05, 3); c.setRGB(0.55 + n * 0.15, 0.42 + n * 0.1, 0.38 + n * 0.08); });
tmwPlant(G, "rock", tmwScatter(901, lite ? 60 : 150, -300, -120, 300, 300, function () { return true; }, H, 0.5, 2.4), { mat: tmwMat("redrock") });
var lichen = tmwLam(0x5A8A3A);
tmwInst(G, tmwGeo("lich", function () { var c = new THREE.CircleGeometry(1, 10); c.rotateX(-Math.PI / 2); return c; }), lichen, tmwScatter(903, lite ? 80 : 200, -300, -60, 300, 300, function () { return true; }, function (x, z) { return H(x, z) + 0.05; }, 0.5, 2.0), {});
var sea = new THREE.Mesh(new THREE.PlaneGeometry(2600, 1400), tmwWaterM(0x5A1E22, 0.92));
sea.rotation.x = -Math.PI / 2;
sea.position.set(0, -0.2, -760);
G.add(sea);
TMW.water.push(sea);
TMW.sea = sea;
var sun = new THREE.Mesh(new THREE.CircleGeometry(260, 48), new THREE.MeshBasicMaterial({ color: 0xC8381E, fog: false }));
sun.position.set(0, 120, -2400);
G.add(sun);
TMW.redSun = sun;
var halo = new THREE.Mesh(new THREE.CircleGeometry(420, 48), new THREE.MeshBasicMaterial({ color: 0x8A2A1A, transparent: true, opacity: 0.35, fog: false, depthWrite: false }));
halo.position.set(0, 120, -2410);
G.add(halo);
TMW.redHalo = halo;
var moon = new THREE.Mesh(new THREE.CircleGeometry(250, 48), new THREE.MeshBasicMaterial({ color: 0x080406, fog: false }));
moon.position.set(-900, 120, -2390);
G.add(moon);
TMW.eclipse = moon;
for (var i = 0; i < (lite ? 3 : 6); i++) {
var c = tmwCrab(1.0 + (i % 3) * 0.2), cx = -60 + i * 24, cz = 10 + ((i * 37) % 30);
c.position.set(cx, H(cx, cz), cz);
c.rotation.y = Math.PI + (i - 2) * 0.3;
G.add(c);
TMW.crabs.push({ g: c, x: cx, z: cz, t: i * 1.7, a: c.rotation.y });
}
var M = tmwMachine(1);
M.position.set(0, H(0, 4), 4);
M.rotation.y = Math.PI;
G.add(M);
TMW.machineX = M;
tmwSolid(0, 4, 1.6, 2.6, -5, 5);
var n = lite ? 600 : 1600, pos = new Float32Array(n * 3), R = wRand(77);
for (i = 0; i < n; i++) {
pos[i * 3] = (R() - 0.5) * 120;
pos[i * 3 + 1] = R() * 40;
pos[i * 3 + 2] = (R() - 0.5) * 120;
}
var pg = new THREE.BufferGeometry();
pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var snow = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xF0F0F4, size: 0.18, transparent: true, opacity: 0.85, depthWrite: false }));
snow.visible = false;
G.add(snow);
TMW.snow = snow;
var blob = new THREE.Group();
tmwEll(blob, tmwLam(0x1A1A1A), 1.0, 0.7, 1.0, 0, 0.5, 0, 12);
for (var t = 0; t < 6; t++) {
var tn = tmwPiv(blob, 0, 0.3, 0);
tn.rotation.y = t / 6 * 6.283;
tmwEll(tn, tmwLam(0x1A1A1A), 0.9, 0.08, 0.1, 1.4, 0, 0, 6);
}
blob.position.set(20, -0.1, -30);
blob.visible = false;
G.add(blob);
TMW.blob = blob;
},
function () {
if (TMW.rideV)
return TMW.rideV;
var v = document.createElement("div");
v.style.cssText = "position:fixed;inset:0;pointer-events:none;opacity:0;transition:opacity 1.6s ease;z-index:42;font-family:Georgia,serif;color:#F4E8D0;text-align:center";
v.innerHTML = "<div data-k='sky' style='position:absolute;inset:0;background:linear-gradient(#3A3A4A,#6A6A78 55%,#4A4A50)'></div>" +
"<div data-k='band' style='position:absolute;left:-10%;right:-10%;top:18%;height:46%;border-radius:50%;border-top:10px solid rgba(255,190,90,.75);filter:blur(3px)'></div>" +
"<div data-k='land' style='position:absolute;left:0;right:0;bottom:0;height:34%;background:linear-gradient(rgba(70,80,70,.9),rgba(40,44,40,.95))'></div>" +
"<div style='position:absolute;left:0;right:0;top:12%;font-size:15px;opacity:.85'>⏳ the Machine is travelling</div>" +
"<div data-k='year' style='position:absolute;left:0;right:0;top:40%;font-size:46px;letter-spacing:2px;text-shadow:0 2px 12px #000'></div>" +
"<div data-k='line' style='position:absolute;left:12%;right:12%;top:56%;font-size:17px;font-style:italic;line-height:1.5;text-shadow:0 1px 8px #000;transition:opacity 1.2s'></div>";
document.body.appendChild(v);
TMW.rideV = v;
return v;
},
function (dt) {
var R = TMW.ride;
if (!R)
return;
R.t += dt;
var o = R.o, u = Math.min(1, R.t / R.sec), v = TMW.rideV, e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
var yr = o.from + (o.to - o.from) * (o.log ? (Math.pow(10, e * Math.log10(Math.abs(o.to - o.from) + 1)) - 1) / Math.abs(o.to - o.from) * Math.sign(o.to - o.from) * Math.abs(o.to - o.from) / Math.abs(o.to - o.from) : e);
if (o.log) {
var span = Math.abs(o.to - o.from);
yr = o.from + Math.sign(o.to - o.from) * (Math.pow(span + 1, e) - 1);
}
if (v) {
v.querySelector("[data-k=year]").textContent = tmwYearStr(yr);
var L = o.lines || [], li = Math.min(L.length - 1, Math.floor(u * L.length));
var le = v.querySelector("[data-k=line]");
if (L.length && le.dataset.i !== String(li)) {
le.dataset.i = String(li);
le.style.opacity = "0";
setTimeout(function () { le.innerHTML = L[li]; le.style.opacity = "1"; }, 500);
}
var g = Math.round(90 + 40 * Math.sin(u * Math.PI)), b = Math.round(100 + 30 * Math.sin(u * Math.PI * 0.7 + 0.5));
v.querySelector("[data-k=sky]").style.background = "linear-gradient(rgb(" + (g - 30) + "," + (g - 26) + "," + (b - 10) + "),rgb(" + (g + 10) + "," + (g + 10) + "," + (b + 8) + ") 55%,rgb(" + (g - 30) + "," + (g - 26) + "," + (g - 30) + "))";
v.querySelector("[data-k=band]").style.top = (18 + Math.sin(u * Math.PI * 3) * 4) + "%";
}
var Ms = [TMW.machineLab, TMW.machineF, TMW.machineX].filter(Boolean);
Ms.forEach(function (M) { if (M.parent)
tmwDialsSet(M, Math.abs(yr - 1895) * 365.25); if (M.userData.disc)
M.userData.disc.rotation.z += dt * (2 + 6 * Math.sin(u * Math.PI)); });
if (!R.swapped && u >= 0.5) {
R.swapped = true;
var A = tmwAtPt(o.at);
if (A) {
tmwScene(A.sc);
var S = TMW_SC[A.sc], y = A.y != null ? A.y : tmwGround(A.x, A.z);
camera.position.set(TMW.base + S.x + A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (o.env)
TMW.envK = o.env;
worldEnv(tmwEnvNow());
if (o.mid)
try {
o.mid();
}
catch (er) { }
}
}
if (u >= 1) {
TMW.ride = null;
if (v)
v.style.opacity = "0";
if (o.say)
setStatus(o.say);
if (o.done)
try {
o.done();
}
catch (er) { }
if (typeof tmbPopulate === "function")
try {
tmbPopulate();
}
catch (er) { }
}
},
function () {
if (TMW.mBtn)
return TMW.mBtn;
var b = document.createElement("div");
b.style.cssText = "position:fixed;right:14px;bottom:120px;z-index:41;padding:8px 12px;border-radius:6px;background:rgba(30,20,10,.82);color:#FFE0B0;font:600 14px Georgia,serif;cursor:pointer;display:none;border:1px solid rgba(255,190,110,.5)";
b.onclick = function () { tmwStrike(); };
document.body.appendChild(b);
TMW.mBtn = b;
return b;
},
function () {
var S = tmbS();
if (!S.f || !(S.f.matches > 0)) {
setStatus("🔥 You have no matches left.");
return;
}
if (TMW.matchT > 1)
return;
S.f.matches--;
tmbSave();
TMW.matchT = 10;
if (typeof playTone === "function")
try {
playTone(1400, 0.04);
}
catch (e) { }
if (typeof tmbHeard === "function")
tmbHeard("match");
setStatus("🔥 You strike a match. " + (S.f.matches > 0 ? S.f.matches + " left." : "That was the last.") + " The pale things shrink back from the light.");
},
function (dt) {
var b = tmwMatchBtn(), dark = TMW.sc === "under" || TMW.night, n = tmwMatchesN();
b.style.display = WLD.on === TMW_KEY && dark && n > 0 && !TMW.ride ? "block" : "none";
b.textContent = "🔥 Strike a match (F) · " + n;
if (TMW.matchT > 0)
TMW.matchT = Math.max(0, TMW.matchT - dt);
var I = TMW.matchT > 0 ? Math.min(1, (10 - TMW.matchT) / 0.8) * Math.min(1, TMW.matchT / 3) : 0;
var L = TMW.matchLight;
if (TMW.sc !== "under") {
if (!TMW.matchLightF && TMW.scG && I > 0) {
TMW.matchLightF = new THREE.PointLight(0xFFB060, 0, 12);
TMW.scG.add(TMW.matchLightF);
}
L = TMW.matchLightF;
}
if (L && L.parent) {
var Lw = worldLocal();
L.position.set(Lw.x - tmwSc().x, camera.position.y - 0.3, Lw.z);
L.intensity = I * 1.8;
}
TMW.matchI = I;
},
function (dt, L) {
var C = TMB.cast && TMB.cast.weena;
if (!C || !C.g || !C.g.parent)
return;
var g = C.g, f = tmbS().f || {};
if (!f.weenaFollow)
return;
var dx = L.x - g.position.x, dz = L.z - g.position.z, d = Math.hypot(dx, dz);
if (d > 60) {
g.position.set(L.x - 2, 0, L.z + 2);
d = 2.8;
}
if (d > 2.6) {
var sp = Math.min(d - 2.4, (d > 8 ? 5.5 : 2.6) * dt);
g.position.x += dx / d * sp;
g.position.z += dz / d * sp;
g.rotation.y = Math.atan2(dx, dz);
}
g.position.y = tmwGround(g.position.x, g.position.z, camera.position.y - 1.72 + 1);
},
function (dt, L) {
var I = TMW.matchI || 0, fire = TMW.fireOn ? 1 : 0;
(TMW.morlocks || []).forEach(function (M) {
var g = M.g;
if (!g.parent)
return;
M.t += dt;
var dx = L.x - g.position.x, dz = L.z - g.position.z, d = Math.hypot(dx, dz) || 1, run = false;
var keep = I > 0.2 || fire ? 9 + I * 6 : (TMW.sc === "under" ? 3.2 : 6);
if (d < keep) {
var sp = (I > 0.2 ? 5 : 2) * dt;
g.position.x -= dx / d * sp;
g.position.z -= dz / d * sp;
g.rotation.y = Math.atan2(-dx, -dz);
run = true;
}
else if (d < 24 && I < 0.2 && !fire) {
var sp2 = Math.min(d - keep, 1.3 * dt);
g.position.x += dx / d * sp2;
g.position.z += dz / d * sp2;
g.rotation.y = Math.atan2(dx, dz);
run = sp2 > 0.001;
}
else {
var hx = M.home.x - g.position.x, hz = M.home.z - g.position.z, hd = Math.hypot(hx, hz);
if (hd > 1) {
g.position.x += hx / hd * Math.min(hd, 1.2 * dt);
g.position.z += hz / hd * Math.min(hd, 1.2 * dt);
g.rotation.y = Math.atan2(hx, hz);
run = true;
}
}
if (TMW.sc !== "under" && typeof tmwBlockL === "function" && tmwSolidAt(g.position.x, g.position.z, g.position.y)) {
g.position.x = M.home.x;
g.position.z = M.home.z;
}
g.position.y = tmwGround(g.position.x, g.position.z, g.position.y + 1.5);
tmwMorlockPose(g, M.t, run);
});
},
function () {
var S = tmwSc(), k = S.env, L = null;
try {
var Lw = worldLocal();
L = { x: Lw.x - S.x, z: Lw.z };
}
catch (e) { }
if (TMW.envK && TMW_ENV[TMW.envK])
k = TMW.envK;
if (TMW.night && TMW.sc === "future")
k = TMW.envK === "fire" ? "fire" : (TMW.envK === "moon" ? "moon" : "night");
if (L && tmwInHouse(L.x, L.z))
k = "indoor";
if (L && tmwInPalace(L.x, L.z) && !TMW.night)
k = "palace";
if (TMW.sc === "further")
k = TMW.furtherStage >= 2 ? "dying" : "red";
var E = {}, B = TMW_ENV[k] || TMW_ENV.golden;
for (var q in B)
E[q] = B[q];
if (L && tmwInHall(L.x, L.z)) {
E.hemi *= 0.8;
E.fogD *= 1.8;
}
if (tmwLite() && E.fogD)
E.fogD *= 1.4;
return E;
},
function (x, z, feet) {
if (TMW.moving || TMW.ride)
return true;
var S = tmwSc(), D = TMW_SCN[TMW.sc];
if (!D)
return false;
if (Math.abs(x) > S.bound || Math.abs(z) > S.bound)
return true;
if (tmwSolidAt(x, z, feet))
return true;
var fl = tmwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = tmwLand(x, z);
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
TMW.t += dt;
if (!TMW.built || !TMW.scG)
return;
var S = tmwSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72;
if (TMW.ride)
tmwRideTick(dt);
TMW.et = (TMW.et || 0) + dt;
if (TMW.et > 0.8) {
TMW.et = 0;
worldEnv(tmwEnvNow());
}
var flow = TMW.t * 0.03;
TMW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * 0.3, flow); });
TMW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (TMW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(TMW.t * 3 + i * 2)) * 0.3; f.rotation.y = TMW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(TMW.t * 1.3) * 0.08;
}
});
(TMW.engines || []).forEach(function (w) { w.rotation.x += dt * 0.9; });
(TMW.crabs || []).forEach(function (C) {
C.t += dt;
var g = C.g;
if (!g.visible)
return;
var J = g.userData.j;
J.legs.forEach(function (l, i) { l.rotation.x = Math.sin(C.t * 2 + i) * 0.25; });
J.ants.forEach(function (a, i) { a.rotation.z = Math.sin(C.t * 0.9 + i * 2) * 0.35; });
J.claws.forEach(function (c, i) { c.rotation.y = Math.sin(C.t * 0.7 + i) * 0.3; });
var d = Math.hypot(L.x - g.position.x, L.z - g.position.z);
if (d < 26 && d > 5) {
var dx = (L.x - g.position.x) / d, dz = (L.z - g.position.z) / d;
g.position.x += dx * 0.5 * dt;
g.position.z += dz * 0.5 * dt;
g.rotation.y = Math.atan2(dx, dz) + Math.PI;
g.position.y = TMW_SCN.further.h(g.position.x, g.position.z);
}
});
if (TMW.sc === "further" && TMW.eclipse) {
var es = TMW.furtherStage >= 3 ? Math.min(1, (TMW.eclT = (TMW.eclT || 0) + dt * 0.02)) : 0;
TMW.eclipse.position.x = -900 + 900 * es;
if (TMW.snow && TMW.snow.visible) {
var pa = TMW.snow.geometry.attributes.position;
for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) - dt * 1.2;
if (y < 0)
y += 40;
pa.setY(i, y);
}
pa.needsUpdate = true;
TMW.snow.position.set(L.x, 0, L.z);
}
}
if (TMW.blob && TMW.blob.visible) {
TMW.blob.position.y = -0.1 + Math.sin(TMW.t * 0.8) * 0.15;
TMW.blob.rotation.y += dt * 0.3;
}
if (TMW.ruinEyes)
TMW.ruinEyes.visible = !!TMW.eyesOn && Math.hypot(L.x + 240, L.z - 12) < 26;
if (TMW.panels) {
var op = TMW.panelsOpen ? 1 : 0;
TMW.panels.forEach(function (p, i) { var k = i ? 1 : -1, target = op * k * 1.5; p.rotation.y += (target - p.rotation.y) * Math.min(1, dt * 1.5); });
if (TMW.pedS)
TMW.pedS.off = false;
}
tmwMatchTick(dt);
tmwMorlocksTick(dt, L);
tmwWeenaTick(dt, L);
TMW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return tmwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (TMW.sc === "future") {
var nt = !!TMW.night;
if (nt !== TMW.eloiNight) {
TMW.eloiNight = nt;
TMW.eloi.forEach(function (P, i) { P.g.visible = !nt || tmwInHall(P.g.position.x, P.g.position.z); });
}
}
if (typeof tmbTick === "function")
try {
tmbTick(dt, L);
}
catch (e) {
if (!TMW.e1) {
TMW.e1 = 1;
if (window.console)
console.warn("[time machine] book", e);
}
}
if (!TMW.bannerBook)
worldBanner("<b>⏳ " + TMW_NAME + "</b> · " + esc(tmwPlaceName(L)) + (TMW.night ? " · night" : ""));
TMW.pt = (TMW.pt || 0) + dt;
if (TMW.pt < 0.15)
return;
TMW.pt = 0;
if (TMW.moving || TMW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
TMW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof tmbTalk === "function" && tmbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
TMW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : tmwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof tmbSpot === "function")
tmbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof tmbIdlePrompt === "function")
tmbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = tmwAtPt(opt.at) || (typeof tmbStartAt === "function" && tmbStartAt()) || tmwAtPt("road");
tmwScene(A.sc);
var S = TMW_SC[A.sc], y = A.y != null ? A.y : tmwGround(A.x, A.z);
camera.position.set(TMW.base + S.x + A.x, y + 1.72, A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
TMW.moving = false;
TMW.ride = null;
worldEnv(tmwEnvNow());
setStatus("⏳ <b>" + TMW_NAME + ".</b> H. G. Wells's book (1895), the whole of it: the Time Traveller's house at Richmond, the year 802,701, the Eloi and the Morlocks, and the last shore. <b>Press E</b> for the book.");
if (typeof tmbEnter === "function")
try {
tmbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[time machine] enter", e);
}
},
function () {
tmwSceneDrop();
for (var k in TMW.mats) {
var m = TMW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in TMW.tex) {
var x = TMW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in TMW_GEO) {
try {
TMW_GEO[g].dispose();
}
catch (e) { }
}
TMW.mats = {};
TMW.tex = {};
TMW_GEO = {};
TMW.built = false;
TMW.G = null;
TMW.lights = 0;
TMW.matchLightF = null;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = TMW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = TMW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: TMW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return tmbPos(at.at);
var C = TMB_CH[tmbS().ch], i = tmbS().s, c = C && C.cast ? C.cast.filter(function (d) { return tmbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? tmbPos(c.at) : null;
}
if (at.spot) {
var Sp = TMW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: TMW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return tmbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || TMW.sc, x: at.x, z: at.z, y: at.y };
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
if (TMB.beam && TMB.beam.parent === TMW.scG)
return TMB.beam;
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
TMW.scG.add(g);
TMB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return tmwLam(c); }, m;
switch (kind) {
case "load":
m = tmwBox(g, 0.6, 0.4, 0.5, M(0x8A7A5A), 0, 0, 0);
tmwBox(g, 0.64, 0.06, 0.54, M(0x4A3A2A), 0, 0.2, 0);
break;
case "rifle":
m = tmwBox(g, 0.08, 0.08, 1.1, M(0x3A2A1A), 0, 0.04, 0);
break;
case "fern":
m = tmwBox(g, 0.4, 0.04, 0.3, M(0x5A8A3A), 0, 0.02, 0);
break;
case "thorn":
m = tmwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = tmwBox(g, 0.9, 0.12, 0.12, M(0x6A4A2A), 0, 0.06, 0);
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
m = tmwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
tmwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = tmwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
tmwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), tmwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "note":
m = tmwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "skin":
m = tmwBox(g, 0.8, 0.05, 0.6, M(0xA88A60), 0, 0.03, 0);
break;
case "cane":
m = tmwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
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
if (!P || !TMW.scG || P.sc !== TMW.sc)
return null;
var g = tmbItemMesh(kind), y = P.y != null ? P.y : tmwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
TMW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = tmwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (TMB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = TMW.spots.indexOf(I.S); if (j >= 0)
TMW.spots.splice(j, 1); TMB.items = TMB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.tmb = 1;
TMB.items.push(I);
return I;
},
function (k) {
if (TMB.tuneKey === k)
return;
TMB.tuneKey = k;
var old = TMB.tune;
TMB.tune = null;
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
if (!k || !TMB_TUNES[k])
return;
try {
var A = new Audio(TMB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
TMB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (TMB.tune !== A) {
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
if (TMB.text)
return fn(TMB.text);
if (TMB.textWait) {
TMB.textWait.push(fn);
return;
}
TMB.textWait = [fn];
var done = function (B) { TMB.text = B; var w = TMB.textWait; TMB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/time-machine/time-machine.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
tmbText(function (B) {
var C = TMB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3>" + TMB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(tmbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); TMB.readOpen = 0; TMB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = tmbS(), C = TMB_CH[S.ch];
if (!C)
return;
TMB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
TMB.readAsk = 0;
TMB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : "The Time Machine") + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? tmbOpening(T).map(tmbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); TMB.readOpen = 0; tmbStepDone(); }, all: function () { tmbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Wells's own words, all of it");
b += tmbKeeperBtns(fns);
worldCard(b, fns);
};
tmbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
TMB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); tmbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = tmbS(), C = TMB_CH[S.ch];
if (!C)
return;
tmbItemsClear();
tmbCastClear();
TMB.hold = 0;
var go = function () { tmbWorldState(); tmbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[tmb] setup", S.ch, e);
} tmbTune(C.tune || null); tmbStepBegin(); };
if (place && C.start) {
var P = tmbPos(C.start);
if (P && WLD.on === TMW_KEY) {
tmwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (TMW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = tmbStep();
tmbItemsClear();
TMB.hold = 0;
TMB.puzOpen = 0;
if (!b)
return;
b._key = tmbKey();
tmbWorldState();
try {
if (b.on)
b.on(tmbS().f);
}
catch (e) {
if (window.console)
console.warn("[tmb] on", e);
}
if (b.k === "read") {
tmbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { TMB.rew[k] = 0; });
if (b.k === "find") {
var Pf = tmbPos(b.at);
if (Pf && Pf.sc === TMW.sc)
tmbItemAdd(b.item, Pf, b.name, b.verb, function () { if (tmbKey() === b._key)
tmbStepDone(); });
}
if (b.k === "gather") {
var P = tmbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(tmbS().ch * 97 + tmbS().s * 13 + 7);
TMB.got = 0;
if (P && P.sc === TMW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = tmwGround(Q.x, Q.z, (P.y != null ? P.y : tmwLand(P.x, P.z)) + 1);
tmbItemAdd(b.item, Q, b.name, b.verb, function () { if (tmbKey() !== b._key)
return; TMB.got++; try {
if (b.each)
b.each(TMB.got);
}
catch (e) { } if (TMB.got < n) {
tmbSay((b.eachSay || "Got one.") + " " + TMB.got + " of " + n + ".");
return;
} tmbStepDone(); });
}
}
if (b.h)
tmbSay("<b>" + esc(TMB_CH[tmbS().ch].t) + ".</b> " + b.h);
},
function (b) {
TMB.puzOpen = 1;
TMB.puzT = performance.now();
var k = tmbKey(), fns = {}, h = TMB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
tmbSay(b.yes);
if (tmbKey() === k)
tmbStepDone();
return;
}
tmbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (tmbKey() === k)
TMB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = tmbS(), C = TMB_CH[S.ch], b = tmbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[tmb] done", e);
}
if (b.say)
tmbSay(b.say);
S.s++;
if (window.TMB_LOG)
TMB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= TMB_CH.length - 1) {
S.done = 1;
S.s = 0;
tmbSave();
tmbItemsClear();
tmbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
tmbSave();
var nx = TMB_CH[S.ch];
setTimeout(function () { try {
tmbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[tmb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
tmbSave();
tmbStepBegin();
},
function () {
tmbTune("end");
var S = tmbS();
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>" + tmQ("And I have by me, for my comfort, two strange white flowers—shrivelled now, and brown and flat and brittle—to witness that even when mind and strength had gone, gratitude and a mutual tenderness still lived on in the heart of man.") + "</p><p style='font-size:12px;opacity:.75'>H. G. Wells, The Time Machine (1895), Epilogue</p><p>You have sat by the fire at Richmond and watched the little model vanish, ridden the Machine to the year 802,701, lived among the Eloi, found Weena, gone down the well to the Morlocks, crossed the Palace of Green Porcelain, lit the fire in the wood, sprung the trap of the White Sphinx, and seen the last red sun on the shore thirty million years away. And then he went again, and has never come back.</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; tmbSave(); tmbChapterBegin(true); } };
b += worldBtn("again", "Read it again from the start", "Richmond, a Thursday evening");
worldCard(b, fns);
},
function (c) {
var C = TMB.cast[c.key || c.k];
if (tmbCastLive(C))
return C;
var P = tmbPos(c.at);
if (!P || P.sc !== TMW.sc)
return null;
var F = TMW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute };
var Pp;
if (F.name && !c.dress)
Pp = tmwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = tmwDressed("tmb" + (c.key || c.k), c.dress || "lsmojo", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : tmwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
TMW.scG.add(g);
Pp = { g: g, y: y, o: {} };
TMW.people.push(Pp);
if (c.name && !c.mute)
tmwTalk(Pp, c.name, tmwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
TMB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return TMB.cast[c.key || c.k];
},
function () {
var C = TMB_CH[tmbS().ch];
if (!C || !C.cast)
return;
var idx = tmbS().s;
C.cast.forEach(function (c) { var key = c.key || c.k; if (c.from != null && idx < c.from) {
if (TMB.cast[key])
tmbCastHide(key);
return;
} if (c.until != null && idx >= c.until) {
if (TMB.cast[key])
tmbCastHide(key);
return;
} if (!tmbCastLive(TMB.cast[key]))
tmbCastAdd(c); });
},
function () {
if (!TMW.scG)
return;
tmbCastClear();
var S = tmbS(), C = TMB_CH[S.ch];
if (S.started && !S.done && C && C.cast && tmbCastHere(C)) {
tmbCastTick();
return;
}
(TMB_FOLK_AT[TMW.sc] || []).forEach(function (q) { var key = "f_" + q[0]; var Pp = tmwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
TMB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!tmbActive())
return false;
var b = tmbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = tmbKey();
worldPrompt(null);
var next = function () { if (tmbKey() === k)
tmbStepDone(); };
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
worldCard(TMB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
TMB.wt += dt;
if (TMB.wt > 0.5) {
TMB.wt = 0;
if (tmbActive() && tmbCastHere(TMB_CH[tmbS().ch]))
tmbCastTick();
var S0 = tmbS();
S0.seen[TMW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!tmbActive()) {
if (TMB.beam)
TMB.beam.visible = false;
TMW.bannerBook = false;
return;
}
var S = tmbS(), b = tmbStep(), t = TMW.t, feet = camera.position.y - 1.72;
TMB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? tmbPos(b.at) : null, here = P && P.sc === TMW.sc, bm = tmbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + tmbScName(P.sc) + ": press E for the book)";
if (here && !TMW.moving && !TMW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : tmwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = tmbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !TMW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (TMB.readAsk)
break;
if (!TMB.readOpen)
tmbChapterCard();
else {
TMB.readOpen = 0;
tmbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
tmbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
TMB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(TMB.hold, dt);
}
catch (e) { }
if (TMB.hold >= (b.sec || 8)) {
tmbStepDone();
return;
}
}
else
TMB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return TMB.rew[k]; })) {
tmbStepDone();
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
tmbStepDone();
return;
}
break;
}
case "puzzle":
if ((!TMB.puzOpen || performance.now() - (TMB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
tmbPuzzleCard(b);
break;
}
}
var C = TMB_CH[S.ch], prog = b && b.k === "hold" && TMB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - TMB.hold)) + " s)" : b && b.k === "gather" ? " (" + (TMB.got || 0) + " of " + (b.n || 3) + ")" : "";
TMW.bannerBook = true;
worldBanner("⏳ <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = tmbS(), C = TMB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>H. G. Wells · The Time Machine (1895), the whole book</div><h3 style='margin:4px 0'>⏳ The Time Machine</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((tmbStep() || {}).h || "") + "</p>";
var st = tmbStep(), P = st && st.at ? tmbPos(st.at) : null, Cs = tmbPos(C.start);
var to = P && P.sc !== TMW.sc ? P : (!P && Cs && Cs.sc !== TMW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + tmbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); tmwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { tmbPopulate(); tmbStepBegin(); }); };
}
}
else
b += "<p>A Thursday evening in Richmond, in the 1890s. The Time Traveller (\"for so it will be convenient to speak of him\") tells his guests that time is only a fourth dimension, and shows them a little machine of brass and ivory that can travel in it. A week later he walks in late to dinner, dusty and limping, and tells them where he has been: the year 802,701, the gentle Eloi, Weena, the Morlocks under the ground, and the end of the world. The whole book, in Wells's own words, to live and to play.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: Richmond, a Thursday evening", S.started ? "Back to where you were" : "\"The fire burnt brightly\"");
fns.go = function () { worldCard(null); tmbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; tmbSave(); tmbBegin(); };
}
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(TMW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(TMW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = (TMW_SCN[k].start || { x: 0, z: 0 }); tmwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, tmbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += tmbKeeperBtns(fns);
worldCard(b, fns);
},
function (C) {
var R = function (v) { return typeof v === "string" ? tmbIdx(C, v) : v; };
(C.cast || []).forEach(function (c) { c.from = R(c.from); c.until = R(c.until); });
if (C.state) {
["nightFrom", "nightUntil", "drumsFrom"].forEach(function (k) { if (C.state[k] != null)
C.state[k] = R(C.state[k]); });
}
TMB_CH.push(C);
return C;
},
function (st, s) {
var V = function (v) { return typeof v === "function" ? v(s) : v; };
var mach = V(st.machine) || "lab";
if (TMW.machineLab) {
TMW.machineLab.visible = mach === "lab";
if (TMW.machineLabS)
TMW.machineLabS.off = mach !== "lab";
}
if (TMW.machineF) {
var inside = mach === "inside";
TMW.machineF.visible = mach === "lawn";
if (inside) {
TMW.machineF.position.set(0, tmwFlatH(0) + 0.6, -8);
TMW.machineF.rotation.y = Math.PI;
}
else
TMW.machineF.position.set(0, tmwFutH(0, 12), 12);
if (TMW.machineFS)
TMW.machineFS.off = mach !== "lawn";
}
if (TMW.model)
TMW.model.visible = !!V(st.model);
TMW.panelsOpen = !!V(st.panels);
if (TMW.pedS)
TMW.pedS.off = false;
TMW.eyesOn = !!V(st.eyes);
if (TMW.sc === "further")
tmwFurtherSet(V(st.further) || 1);
var fire = !!V(st.fire);
if (fire !== !!TMW.fireOn)
tmwForestFire(fire);
if (TMW.hearth)
TMW.hearth.visible = V(st.hearth) !== false;
var pr = V(st.prowl) || null, key = pr ? JSON.stringify(pr) : "";
if (key !== TMW.prowlKey || TMW.prowlSc !== TMW.sc) {
TMW.prowlKey = key;
TMW.prowlSc = TMW.sc;
tmwMorlocksClear();
if (pr && TMW.sc === "future")
pr.forEach(function (q, i) { tmwMorlockAdd(q[0], q[1], 500 + i); });
}
var wf = V(st.weena);
if (wf != null) {
var f = tmbS().f;
f.weenaFollow = !!wf;
}
},
function (done) {
var M = TMW.model;
if (!M) {
if (done)
done();
return;
}
var t = 0;
M.visible = true;
var mats = [];
M.traverse(function (o) { if (o.material && mats.indexOf(o.material) < 0) {
o.material = o.material.clone();
o.material.transparent = true;
mats.push(o.material);
} });
var iv = setInterval(function () { t += 0.05; M.rotation.y += 0.04 + t * 0.2; var op = Math.max(0, 1 - t / 2.2); mats.forEach(function (m) { m.opacity = op; }); if (t >= 2.4) {
clearInterval(iv);
M.visible = false;
if (done)
done();
} }, 50);
},
function (on) {
TMW.fireOn = on;
if (TMW.fireG && TMW.fireG.parent)
TMW.fireG.parent.remove(TMW.fireG);
TMW.fireG = null;
TMW.fx = TMW.fx.filter(function (F) { return !F.userData.forest; });
if (!on || TMW.sc !== "future" || !TMW.scG)
return;
var g = new THREE.Group();
TMW.scG.add(g);
TMW.fireG = g;
var R = wRand(31);
for (var i = 0; i < (tmwLite() ? 8 : 16); i++) {
var a = R() * Math.PI * 2, r = 20 + R() * 60, x = TMW_AT.glade.x + Math.cos(a) * r, z = TMW_AT.glade.z + Math.sin(a) * r;
var F = tmwFire(g, x, tmwFutH(x, z), z, 3 + R() * 2);
F.userData.forest = 1;
var S = tmwSmoke(g, x, tmwFutH(x, z) + 3, z, 0x3A3028, 6);
S.userData.forest = 1;
S.scale.setScalar(4);
}
},
function () { tmwSpot(TMW_AT.machine.x - 1.4, TMW_AT.machine.z, 2.2, "The Time Machine", "look at it", function () { setStatus("⏳ Nickel and ivory, brass and twisted rods of rock crystal; a saddle; two levers before it; and four small dials. Parts of it are clearly not finished: on the bench lie rods of quartz, half filed."); }); },
function () { tmwSpot(TMW_AT.machine.x - 1.4, TMW_AT.machine.z, 2.4, "The Time Machine", "touch it", function () { setStatus("⏳ " + tmQ("a thing of brass, ebony, ivory, and translucent glimmering quartz.") + " Solid to the touch. Brown spots and smears on the ivory; bits of grass and moss on the lower parts; one rail bent awry."); }); }
];
});
