/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(514, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (WDW.tex[k])
return WDW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = wdwLite();
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
return (WDW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (WDW.mats[k])
return WDW.mats[k];
var own = name.slice(0, 2) === "b:", map = wdwPhotoTex(name, mpt || 2), m;
if (wdwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = wdwPhotoTex(name, mpt || 2, true);
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
return (WDW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return wdwM(k, function () {
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
return wdwCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return wdwCanvas("bamboo", 64, 256, function (x, W, H) {
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
wdwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return wdwCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return wdwCanvas("tuft", 128, 64, function (x, W, H) {
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
return wdwCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return wdwCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
wdwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return wdwCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = WDW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / WDW_CELL) + "," + Math.floor(z / WDW_CELL)];
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
p = dlnPerson("wdw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("wdw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || WDW.scG || WDW.G).add(p);
var P = { g: p, y: y, o: o };
WDW.people.push(P);
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
WDW.inst.push(m);
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
var a0 = pts[q - 1], b0 = pts[q], L0 = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), n0 = Math.max(1, Math.ceil(L0 / (wdwLite() ? 8 : 4)));
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
var lite = wdwLite(), leaf = wdwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
wdwInst(P, wdwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), wdwMat("pale"), list, { shadow: !lite });
wdwInst(P, wdwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), wdwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
wdwInst(P, wdwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), wdwMat("bark"), list, { shadow: !lite });
wdwInst(P, wdwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), wdwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
wdwInst(P, wdwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), wdwMat("darkbark"), list, { shadow: !lite });
wdwInst(P, wdwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), wdwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
wdwInst(P, wdwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), wdwMat("bark"), list, { shadow: !lite });
wdwInst(P, wdwGeo("pfronds", function () { var g = wdwFronds(lite ? 8 : 14, 5.6, 1.7, 0.55, 12, 1.0); g.translate(1.4, 0, 0); return g; }), wdwLam(0xFFFFFF, { ds: 1, map: wdwFrondTex("palm"), mapk: "palm", cut: 0.5, e: 0x1E2C14 }), list, {});
break;
}
case "mauritia": {
wdwInst(P, wdwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), wdwMat("darkbark"), list, {});
wdwInst(P, wdwGeo("mfronds", function () { return wdwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), wdwLam(0xFFFFFF, { ds: 1, map: wdwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
wdwInst(P, wdwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), wdwMat("darkbark"), list, {});
wdwInst(P, wdwGeo("ffronds", function () { return wdwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), wdwLam(0xFFFFFF, { ds: 1, map: wdwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
wdwInst(P, wdwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), wdwMat("darkbark"), list, {});
wdwInst(P, wdwGeo("cyf", function () { return wdwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), wdwLam(0xFFFFFF, { ds: 1, map: wdwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
wdwInst(P, wdwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), wdwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: wdwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
wdwInst(P, wdwGeo("bamL", function () { return wdwCards(3, 2.6, 2.2, 5.4); }), wdwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
wdwInst(P, wdwGeo("reed" + kind, function () { return wdwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), wdwLam(0xFFFFFF, { ds: 1, map: wdwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
wdwInst(P, wdwGeo("tuft", function () { return wdwCards(2, 1.6, 0.7, 0); }), wdwLam(o.col || 0xFFFFFF, { ds: 1, map: wdwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
wdwInst(P, wdwGeo("flw", function () { return wdwCards(2, 0.9, 0.7, 0); }), wdwLam(0xFFFFFF, { ds: 1, map: wdwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
wdwInst(P, wdwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), wdwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
wdwInst(P, wdwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || wdwMat("rock"), list, {});
break;
}
case "cactus": {
wdwInst(P, wdwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), wdwLam(0x4A7A3A), list, {});
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
function (kind, col) { return wdwM("skinM" + kind + (col || ""), function () { var t = wdwSkinTex(kind); t.repeat.set(2, 2); var m = wdwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = wdwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(wdwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = wdwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(wdwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
wdwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return wdwGeo(k, function () {
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
var t = wdwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wdwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || wdwS("b:stucco", o.col || 0xF0E2C8, 3), trim = wdwLam(0xFAF6EE), sh = wdwLam(o.shut || 0x3A6A4A), glass = wdwShine(0x1A2228, 0.2, 0.3);
wdwBox(g, w, h, d, wall, 0, 0, 0);
wdwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
wdwBox(g, w + 0.12, 0.5, d + 0.12, wdwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(wdwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || wdwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
wdwBox(g, 1.3, 2.6, 0.12, wdwMat("oak"), wx, 0, d / 2 + 0.02);
wdwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = wdwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = wdwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!wdwLite())
[-1, 1].forEach(function (s) { wdwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
wdwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
wdwBox(g, 0.05, 0.9, 0.05, wdwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
wdwBox(g, 1.8, 0.05, 0.05, wdwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
wdwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
WDW.near = null;
if (WDW.scG) {
if (WDW.scG.parent)
WDW.scG.parent.remove(WDW.scG);
WDW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
WDW.scG = null;
WDW.solids = [];
WDW.sgrid = null;
WDW.floors = [];
WDW.spots = [];
WDW.talk = [];
WDW.people = [];
WDW.beasts = [];
WDW.fx = [];
WDW.water = [];
WDW.inst = [];
WDW.hgt = null;
WDW.scBuilt = null;
WDW.rooms = [];
WDW.doors = [];
WDW.lights = 0;
WDW.ticks = [];
WDW.far = [];
WDW.tripods = [];
WDW.handlers = [];
WDW.smoke = [];
WDW.live = null;
if (typeof wdbSceneDrop === "function")
try {
wdbSceneDrop();
}
catch (e) { }
},
function (k) {
if (WDW.scBuilt === k && WDW.scG)
return;
wdwSceneDrop();
var D = WDW_SCN[k], S = WDW_SC[k];
if (!D || !S || !WDW.G)
return;
WDW.sc = k;
WDW.scG = new THREE.Group();
WDW.scG.position.x = S.x;
WDW.G.add(WDW.scG);
WDW.hgt = D.h || function () { return 0; };
try {
D.build(WDW.scG);
}
catch (e) {
if (window.console)
console.warn("[wonderland] scene", k, e);
}
WDW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
WDW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = wdwAtPt(at);
if (!A)
return;
var v = wdwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
WDW.moving = true;
setTimeout(function () {
if (WLD.on !== WDW_KEY) {
v.style.opacity = "0";
WDW.moving = false;
return;
}
wdwScene(A.sc);
var S = WDW_SC[A.sc], y = A.y != null ? A.y : wdwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(WDW.base + S.x + A.x, y + 1.72 + wdwEyeOff(), A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(wdwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; WDW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(wdwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), wdwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; WDW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(wdwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), wdwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(wdwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), wdwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(wdwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), wdwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!wdwLite() && typeof THREE.PointLight === "function" && (WDW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
WDW.lights = (WDW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
WDW.fx.push(g);
return g;
},
function (seed, dress, o) {
o = o || {};
if (typeof dlnPerson !== "function")
return wPerson("wdw" + seed, { sex: o.sex });
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("wdw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (key, x, z, ry, o) {
var F = WDW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : wdwGround(x, z, o.feet != null ? o.feet : 500);
var g = F.voice ? wdwVoiceG() : F.make ? wdwCreature(F.make, o.seed || key) : wdwDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin, child: F.child });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
if (o.s)
g.scale.multiplyScalar(o.s);
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || WDW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
WDW.people.push(P);
if (!o.mute && !F.mute)
wdwTalk(P, o.name || F.name, wdwPersona(F.persona), o.greet || F.greet, o.r || (3.4 * Math.max(0.5, o.s || 1)), o.fn);
return P;
},
function (seed, list, x0, z0, x1, z1, o) {
o = o || {};
var R = wRand(seed), out = [], lite = wdwLite(), n = lite ? Math.ceil(list.length * 0.6) : list.length;
for (var i = 0; i < n; i++) {
var L = list[i], x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), tries = 0;
while (o.ok && !o.ok(x, z) && tries++ < 12) {
x = x0 + R() * (x1 - x0);
z = z0 + R() * (z1 - z0);
}
var sex = L[1], g = wdwDressed(seed + "c" + i, L[2], { sex: sex, child: !!L[5], beard: sex === "m" && R() < 0.3 ? (R() < 0.5 ? "mustache" : "short") : null, hair: [0x141414, 0x3A2A1A, 0x6A4A2A, 0x8A7A6A, 0xB8A060][Math.floor(R() * 5)], skin: o.skin ? o.skin[Math.floor(R() * o.skin.length)] : null });
var y = o.y != null ? o.y : wdwGround(x, z, 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
(o.parent || WDW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander != null ? o.wander : 6, sp: o.sp || 0.7 } };
WDW.people.push(P);
wdwTalk(P, L[0], L[4] || o.persona || WDP.creature, L[3], 3.0);
out.push(P);
}
return out;
},
function (seed, name, sex, dress, x, z, ry, greet, o) {
o = o || {};
var g = wdwDressed(seed, dress, { sex: sex, child: !!o.child, beard: o.beard, hair: o.hair, skin: o.skin });
if (o.scale)
g.scale.set(o.scale[0], o.scale[1], o.scale[2]);
var y = o.y != null ? o.y : wdwGround(x, z, o.feet != null ? o.feet : 500);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
(o.parent || WDW.scG).add(g);
var P = { g: g, y: y, o: { wander: o.wander || 0, sp: 0.6 } };
WDW.people.push(P);
if (name)
wdwTalk(P, name, o.persona || WDP.creature, greet || "Good day.", o.r || 3.0);
return P;
},
function (k) {
switch (k) {
case "plaster": return wdwS("plaster", 0xF0EAD8, 4);
case "render": return wdwS("b:stucco", 0xEAE2D0, 3);
case "ochre": return wdwS("b:stucco", 0xE8CC98, 3);
case "rose": return wdwS("b:stucco", 0xE8C0B0, 3);
case "grey": return wdwS("b:stucco", 0xC8C8C4, 3);
case "ashlar": return wdwS("b:ashlar", 0xE0D8C8, 2.4);
case "stone": return wdwS("stone", 0xC8C0B0, 2.4);
case "greystone": return wdwS("b:limestone", 0xA8A49C, 4);
case "darkstone": return wdwS("b:limestone", 0x6A6660, 4);
case "brick": return wdwS("brick", 0xB87A5E, 1.6);
case "slate": return wdwS("b:slate", 0x5A5E68, 2);
case "tile": return wdwS("b:terracotta", 0xA85A40, 1.6);
case "shingle": return wdwS("shingle", 0x7A5A44, 2);
case "thatch": return wdwThatchM();
case "oak": return wdwS("b:oak", 0x8A5E3A, 1.4);
case "darkoak": return wdwS("b:oak", 0x4A3020, 1.4);
case "floor": return wdwS("b:oak", 0xA87A50, 1.8);
case "planks": return wdwS("b:planks", 0x9A8060, 2);
case "deck": return wdwS("b:deck", 0xB8A07A, 2);
case "hull": return wdwS("b:planks", 0x4A3A2A, 2);
case "damask": return wdwS("b:damask", 0x8A6A4A, 1.2);
case "bluepaper": return wdwS("b:damask", 0x6A7A9A, 1.2);
case "greenpaper": return wdwS("b:damask", 0x6A8A6A, 1.2);
case "velvet": return wdwS("b:velvet", 0x6A1E22, 0.8);
case "leather": return wdwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return wdwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return wdwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "ceiling": return wdwLam(0xEDE6D6);
case "beams": return wdwS("b:oak", 0x5A3E26, 1.4);
case "brass": return wdwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "iron": return wdwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "copper": return wdwShine(0xC87A4A, 0.35, 0.85);
case "glass": return wdwM("glass", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8ECE8, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.42, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "pane": return wdwShine(0x26323A, 0.15, 0.3);
case "earth": return wdwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return wdwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "meadow": return wdwS("grass", 0xB8D098, 4, { vc: 1 });
case "paving": return wdwS("paving", 0xC8C0B0, 2.4);
case "cobble": return wdwS("b:cotto", 0x9A9088, 1.2);
case "setts": return wdwS("paving", 0x8A8478, 2.4);
case "gravel": return wdwS("sand", 0x9A8C72, 3);
case "sand": return wdwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "rock": return wdwS("b:strata", 0x8A847A, 6);
case "darkrock": return wdwS("b:strata", 0x5A5650, 7);
case "granite": return wdwS("b:limestone", 0x9A948C, 5);
case "moss": return wdwS("b:moss", 0x7A9A5A, 3);
case "bark": return wdwS("bark", 0x8A7A64, 2.5);
case "darkbark": return wdwS("bark", 0x5A4E40, 3);
case "birch": return wdwS("bark", 0xE8E4DA, 2);
case "slush": return wdwS("sand", 0xC4BCB0, 3);
case "snowroof": return wdwS("snow", 0xD4D8DE, 3);
case "snow": return wdwS("snow", 0xF4F6FA, 5, { vc: 1 });
case "snowwall": return wdwS("snow", 0xF0F4FA, 3);
case "ice": return wdwM("icem", function () { var m = wdwLite() ? new THREE.MeshLambertMaterial({ color: 0xD8EAF4, map: wdwPhotoTex("snow", 6) }) : new THREE.MeshPhongMaterial({ color: 0xD0E6F2, map: wdwPhotoTex("snow", 6), shininess: 70, specular: 0x8AA8C0, vertexColors: true }); m.userData.noPhoto = 1; return m; });
case "blueice": return wdwM("blueice", function () { var m = new THREE.MeshPhongMaterial({ color: 0x8AC0DA, shininess: 110, specular: 0xE8F8FF, transparent: true, opacity: 0.92 }); m.userData.noPhoto = 1; return m; });
case "cloth": return wdwLam(0xE8DCC4, { ds: 1 });
case "sail": return wdwLam(0xE8E0CC, { ds: 1 });
case "rope": return wdwLam(0x8A7A5A);
case "gilt": return wdwS("b:brass", 0xF0C860, 0.7, { shine: 110 });
case "redvelvet": return wdwS("b:velvet", 0x9A1A20, 0.6);
case "greenmarble": return wdwS("b:marble", 0x3A6A50, 1.8, { shine: 70 });
case "redmarble": return wdwS("b:marble", 0x9A4A3A, 1.8, { shine: 70 });
case "onyx": return wdwS("b:marble", 0xE8D4A8, 1.4, { shine: 90 });
case "zinc": return wdwS("b:slate", 0x7A8290, 2);
case "patina": return wdwS("b:brass", 0x7AB098, 1.6, { shine: 30 });
case "cave": return wdwS("b:cave", 0x8A8478, 4);
case "wetstone": return wdwS("b:limestone", 0x5A5A58, 3, { shine: 60 });
case "pinkgranite": return wdwS("b:limestone", 0xC8988A, 4);
case "mirror": return wdwShine(0xE8ECF0, 0.04, 1.0);
case "blackcloth": return wdwLam(0x0E0C10);
case "canvas": return wdwLam(0xD8CCB0, { ds: 1 });
case "logs": return wdwS("bark", 0x8A7458, 1.6);
case "siding": return wdwS("siding", 0xF2F0EA, 2.4);
case "mud": return wdwS("b:stucco", 0xA8744A, 2.4);
case "clay": return wdwS("earth", 0x9A6A44, 3);
case "pot": return wdwS("b:terracotta", 0xA8643E, 0.8);
case "trail": return wdwS("earth", 0x8A6A48, 3);
case "jungleground": return wdwS("earth", 0xC8C0A8, 6, { vc: 1 });
case "shoreground": return wdwS("sand", 0xFFFFFF, 5, { vc: 1 });
case "mossbark": return wdwS("b:moss", 0x6A7A4A, 1.6);
}
return wdwS("earth", 0x8A7058, 5);
},
function () {
return wdwM("thatch", function () {
var t = wdwCanvas("thatch", 128, 128, function (c, W, H) { c.fillStyle = "#7A6640"; c.fillRect(0, 0, W, H); var R = wRand(41); for (var i = 0; i < 900; i++) {
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
var y = WDW_RY, h = o.h || 3.4, g = new THREE.Group();
g.position.set(cx, y, cz);
P.add(g);
g.userData.keep = 0;
var wall = wdwMat(o.wall || "plaster"), fl = wdwMat(o.floor || "floor");
wdwBox(g, w, 0.12, d, fl, 0, -0.12, 0);
wdwBox(g, w, 0.1, d, o.ceil ? wdwMat(o.ceil) : wdwMat("ceiling"), 0, h, 0);
[[0, -d / 2, w, 0.2], [0, d / 2, w, 0.2]].forEach(function (q, i) {
if (i === 1) {
var dw = o.dw || 1.2, dh = o.dh || 2.3;
wdwBox(g, (w - dw) / 2, h, 0.2, wall, -(w + dw) / 4, 0, q[1]);
wdwBox(g, (w - dw) / 2, h, 0.2, wall, (w + dw) / 4, 0, q[1]);
wdwBox(g, dw, h - dh, 0.2, wall, 0, dh, q[1]);
wdwBox(g, dw, dh, 0.08, wdwMat(o.door || "darkoak"), 0, 0, q[1] - 0.06);
wdwBox(g, 0.06 * dw / 1.2, 0.06 * dw / 1.2, 0.04, wdwMat("brass"), 0.42 * dw / 1.2, dh * 0.43, q[1] - 0.12);
}
else
wdwBox(g, q[2], h, 0.2, wall, q[0], 0, q[1]);
});
wdwBox(g, 0.2, h, d, wall, -w / 2, 0, 0);
wdwBox(g, 0.2, h, d, wall, w / 2, 0, 0);
if (!o.bare) {
var sk = wdwMat(o.trim || "oak");
[[0, -d / 2 + 0.11, w - 0.2, 0.04], [0, d / 2 - 0.11, w - 0.2, 0.04]].forEach(function (q) { wdwBox(g, q[2], 0.16, q[3], sk, q[0], 0, q[1]); });
[-w / 2 + 0.11, w / 2 - 0.11].forEach(function (x) { wdwBox(g, 0.04, 0.16, d - 0.2, sk, x, 0, 0); });
}
if (o.beams)
for (var b = -w / 2 + 1; b < w / 2; b += 1.6)
wdwBox(g, 0.18, 0.22, d - 0.2, wdwMat("beams"), b, h - 0.22, 0);
wdwSolid(cx, cz - d / 2, w, 0.3, y - 1, y + h + 1);
wdwSolid(cx - w / 2, cz, 0.3, d, y - 1, y + h + 1);
wdwSolid(cx + w / 2, cz, 0.3, d, y - 1, y + h + 1);
var DW = o.dw || 1.2;
wdwSolid(cx - (w + DW) / 4, cz + d / 2, (w - DW) / 2, 0.3, y - 1, y + h + 1);
wdwSolid(cx + (w + DW) / 4, cz + d / 2, (w - DW) / 2, 0.3, y - 1, y + h + 1);
wdwFloor(cx, cz, w, d, y);
var R = { key: key, x0: cx - w / 2, x1: cx + w / 2, z0: cz - d / 2, z1: cz + d / 2, cx: cx, cz: cz, w: w, d: d, y: y, h: h, env: o.env || "indoor", name: o.name || key, g: g, out: null };
WDW.rooms.push(R);
if (o.light !== false && !wdwLite() && (WDW.lights || 0) < 5 && typeof THREE.PointLight === "function") {
var L = new THREE.PointLight(o.lightCol || 0xFFD8A0, o.lightI || 0.9, Math.max(w, d) * 1.4);
L.position.set(0, h - 0.6, 0);
g.add(L);
WDW.lights = (WDW.lights || 0) + 1;
}
return R;
},
function (R, name, ox, oz, ory) {
R.out = { x: ox, z: oz, ry: ory };
wdwSpot(ox, oz, 1.8, name, "go in", function () { wdwGo({ sc: WDW.sc, x: R.cx, z: R.z1 - 1.2, y: R.y, ry: 0 }, "🚪 <b>" + wdEsc(R.name) + ".</b>"); if (typeof wdbNote === "function")
wdbNote("in:" + R.key); });
wdwSpot(R.cx, R.z1 - 0.6, 1.4, "The door", "go out", function () { wdwGo({ sc: WDW.sc, x: ox, z: oz, ry: ory != null ? ory : Math.PI }, null); if (typeof wdbNote === "function")
wdbNote("out:" + R.key); }, R.y);
WDW.doors.push(R);
return R;
},
function (fromKey, toKey, lx, lz, name, verb) {
var A = WDW.rooms.filter(function (r) { return r.key === fromKey; })[0], B = WDW.rooms.filter(function (r) { return r.key === toKey; })[0];
if (!A || !B)
return;
var x = A.cx + lx, z = A.cz + lz;
B.out = { x: x, z: z, ry: Math.PI, inner: fromKey };
wdwSpot(x, z, 1.5, name, verb || "go through", function () { wdwGo({ sc: WDW.sc, x: B.cx, z: B.z1 - 1.2, y: B.y, ry: 0 }, "🚪 <b>" + wdEsc(B.name) + ".</b>"); if (typeof wdbNote === "function")
wdbNote("in:" + B.key); }, A.y);
wdwSpot(B.cx, B.z1 - 0.6, 1.4, "Back to " + A.name, "go", function () { wdwGo({ sc: WDW.sc, x: x, z: z + 1.2, y: A.y, ry: 0 }, null); if (typeof wdbNote === "function")
wdbNote("out:" + B.key); }, B.y);
WDW.doors.push(B);
return B;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wd = wdwMat(o.mat || "oak");
wdwBox(g, w, 0.06, d, o.cloth ? wdwLam(o.cloth) : wd, 0, h - 0.06, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { wdwBox(g, 0.07, h - 0.06, 0.07, wd, q[0] * (w / 2 - 0.08), 0, q[1] * (d / 2 - 0.08)); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = wdwMat(o.mat || "oak");
wdwBox(g, 0.46, 0.05, 0.44, o.seat ? wdwMat(o.seat) : wd, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { wdwBox(g, 0.04, 0.44, 0.04, wd, q[0] * 0.2, 0, q[1] * 0.19); });
wdwBox(g, 0.46, 0.5, 0.04, wd, 0, 0.49, -0.2);
if (o.arm)
[-1, 1].forEach(function (s) { wdwBox(g, 0.05, 0.22, 0.42, wd, s * 0.24, 0.5, 0); });
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = wdwMat(o.mat || "oak");
wdwBox(g, 1.1, 0.4, 2.0, wd, 0, 0, 0);
wdwBox(g, 1.04, 0.18, 1.94, wdwLam(o.cover || 0xE8E0CC), 0, 0.4, 0);
wdwBox(g, 0.8, 0.12, 0.36, wdwLam(0xF4F0E8), 0, 0.58, -0.7);
wdwBox(g, 1.1, 0.9, 0.06, wd, 0, 0, -1.0);
if (o.posts)
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { wdwBox(g, 0.07, 1.9, 0.07, wd, q[0] * 0.52, 0, q[1] * 0.97); });
return g;
},
function (P, x, z, w, h, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = wdwMat(o.mat || "darkoak"), R = wRand(Math.round(x * 7 + z * 13 + w));
wdwBox(g, w, h, 0.06, wd, 0, 0, -0.16);
[-w / 2, w / 2].forEach(function (s) { wdwBox(g, 0.05, h, 0.36, wd, s, 0, 0); });
var rows = Math.floor(h / 0.42);
for (var r = 0; r <= rows; r++) {
var y = 0.05 + r * (h - 0.1) / rows;
wdwBox(g, w, 0.04, 0.36, wd, 0, y, 0);
if (r === rows)
break;
if (o.jars) {
for (var j = -w / 2 + 0.12; j < w / 2 - 0.1; j += 0.18) {
var jm = new THREE.Mesh(wdwGeo("jar", function () { return new THREE.CylinderGeometry(0.05, 0.055, 0.18, 10); }), R() < 0.5 ? wdwMat("glass") : wdwLam([0x6A8A6A, 0x8A6A3A, 0xC8C0A0][Math.floor(R() * 3)]));
jm.position.set(j, y + 0.13, 0);
g.add(jm);
}
continue;
}
var bx = -w / 2 + 0.06;
while (bx < w / 2 - 0.08) {
var bw = 0.03 + R() * 0.05, bh = 0.22 + R() * 0.12;
wdwBox(g, bw, bh, 0.24, wdwLam([0x6A2A1A, 0x2A3A5A, 0x3A4A2A, 0x5A4020, 0x7A6A4A, 0x2A2A2A][Math.floor(R() * 6)]), bx + bw / 2, y + 0.04, 0.02);
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
var st = wdwMat(o.mat || "ashlar");
wdwBox(g, 1.8, 1.3, 0.5, st, 0, 0, 0);
wdwBox(g, 1.0, 0.8, 0.52, wdwLam(0x141210), 0, 0, 0.02);
wdwBox(g, 2.0, 0.1, 0.6, wdwMat("darkoak"), 0, 1.3, 0.04);
if (o.chimney !== false)
wdwBox(g, 1.4, (o.h || 3.4) - 1.4, 0.4, st, 0, 1.4, -0.04);
if (o.fire !== false) {
var f = wdwFire(g, 0, 0.02, 0.12, 0.6);
}
if (o.pot) {
wdwCyl(g, 0.2, 0.16, 0.26, wdwMat("iron"), 0, 0.3, 0.12, 12);
}
return g;
},
function (P, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
wdwCyl(g, 0.06, 0.07, 0.03, wdwMat(o.brass ? "brass" : "iron"), 0, 0, 0, 10);
wdwCyl(g, 0.018, 0.018, 0.16, wdwLam(0xF4EEDC), 0, 0.03, 0, 8);
var f = new THREE.Mesh(wdwGeo("cflame", function () { return new THREE.ConeGeometry(0.014, 0.05, 6); }), wdwGlowM(0xFFD070, 0.9));
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
var m = wdwMat(o.mat || "darkoak");
wdwBox(g, w, 0.07, d, m, 0, 0.42, 0);
[-1, 1].forEach(function (k) { wdwBox(g, 0.07, 0.42, d * 0.86, m, k * (w / 2 - 0.12), 0, 0); });
if (w > 2.6)
wdwBox(g, 0.07, 0.42, d * 0.86, m, 0, 0, 0);
if (o.back !== false) {
wdwBox(g, w, 0.55, 0.06, m, 0, 0.49, -d / 2 + 0.03);
wdwBox(g, w, 0.05, 0.09, m, 0, 1.03, -d / 2 + 0.04);
}
if (o.cushion)
wdwBox(g, w - 0.1, 0.06, d - 0.06, wdwLam(o.cushion), 0, 0.49, 0.02);
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), wdwM("rug" + col, function () {
var t = wdwCanvas("rugt" + col, 256, 256, function (c, W, H) {
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
wdwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
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
var t = wdwCanvas("pic" + x.toFixed(1) + z.toFixed(1) + w, 128, Math.round(128 * h / w), draw || function (c, W, H) { var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#6A8AB0"); g.addColorStop(0.6, "#D8D0B0"); g.addColorStop(1, "#4A5A30"); c.fillStyle = g; c.fillRect(0, 0, W, H); c.fillStyle = "#5A6A7A"; c.beginPath(); c.moveTo(0, H * 0.7); c.lineTo(W * 0.3, H * 0.35); c.lineTo(W * 0.55, H * 0.6); c.lineTo(W * 0.8, H * 0.3); c.lineTo(W, H * 0.7); c.fill(); });
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
wdwBox(g, w + 0.12, h + 0.12, 0.04, wdwMat("brass"), 0, -h / 2 - 0.06, 0);
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wdwLam(0xFFFFFF, { map: t, mapk: "pic" + x.toFixed(1) + z.toFixed(1) + w }));
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wdwGlowM(col));
m.position.z = 0.02;
g.add(m);
wdwBox(g, w + 0.16, 0.08, 0.12, wdwMat("oak"), 0, -h / 2 - 0.04, 0.04);
wdwBox(g, 0.05, h, 0.06, wdwMat("oak"), 0, -h / 2, 0.05);
wdwBox(g, w, 0.04, 0.06, wdwMat("oak"), 0, -0.02, 0.05);
[-1, 1].forEach(function (s) { wdwBox(g, 0.05, h, 0.06, wdwMat("oak"), s * w / 2, -h / 2, 0.05); });
return g;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : wdwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = wdwMat(o.wall || "render"), trim = wdwMat(o.trim || "ashlar"), sh = wdwLam(o.shut || 0x4A6A4A), pane = wdwMat("pane"), lite = wdwLite();
wdwBox(g, w, h, d, wall, 0, 0, 0);
wdwBox(g, w + 0.1, 0.6, d + 0.1, wdwMat("greystone"), 0, 0, 0);
wdwBox(g, w + 0.3, 0.22, d + 0.3, trim, 0, h - 0.22, 0);
var rh = o.rh || Math.min(w, d) * 0.62, roofM = wdwMat(o.roof || "tile");
var rf = new THREE.Mesh(wdwGeo("gab" + w.toFixed(1) + "|" + d.toFixed(1) + "|" + rh.toFixed(1) + (o.hip ? "h" : ""), function () {
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
wdwBox(g, 0.7, rh * 0.9, 0.7, wdwMat("brick"), w * 0.28, h + rh * 0.3, -d * 0.15);
if (o.dormer && !lite)
[-1, 1].forEach(function (s) { var dg = new THREE.Group(); dg.position.set(s * w * 0.22, h + rh * 0.25, d / 2 - rh * 0.3); g.add(dg); wdwBox(dg, 0.9, 0.9, 0.8, wall, 0, 0, 0); wdwBox(dg, 0.6, 0.6, 0.04, pane, 0, 0.15, 0.41); });
var n = Math.max(1, Math.floor(w / 2.6)), floors = Math.max(1, Math.round((h - 0.4) / 3.1));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 0.9 + f * 3.1;
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
wdwBox(g, 1.2, 2.4, 0.1, wdwMat(o.doorM || "darkoak"), wx, 0, d / 2 + 0.02);
wdwBox(g, 1.5, 0.25, 0.16, trim, wx, 2.4, d / 2 + 0.05);
wdwBox(g, 1.6, 0.14, 0.6, wdwMat("greystone"), wx, 0, d / 2 + 0.3);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
wdwBox(g, 1.0, 1.7, 0.08, trim, wx, wy, zz);
wdwBox(g, 0.8, 1.5, 0.06, pane, wx, wy + 0.1, zz + (k ? -0.03 : 0.03));
wdwBox(g, 0.8, 0.04, 0.07, trim, wx, wy + 0.85, zz + (k ? -0.05 : 0.05));
if (!lite)
[-1, 1].forEach(function (s) { wdwBox(g, 0.42, 1.6, 0.05, sh, wx + s * 0.64, wy + 0.05, zz + (k ? -0.07 : 0.07)); });
});
}
wdwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = wdwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var wall = wdwMat(o.wall || "ashlar"), roof = wdwMat(o.roof || "slate"), L = o.len || 30, W = o.w || 13, H = o.h || 13;
wdwBox(g, W, H, L, wall, 0, 0, 0);
var rf = new THREE.Mesh(wdwGeo("chr" + W + "|" + L, function () { var s = new THREE.Shape(); s.moveTo(-W / 2 - 0.4, 0); s.lineTo(0, W * 0.55); s.lineTo(W / 2 + 0.4, 0); s.lineTo(-W / 2 - 0.4, 0); var e = new THREE.ExtrudeGeometry(s, { depth: L + 0.6, bevelEnabled: false }); e.translate(0, 0, -(L + 0.6) / 2); return e; }), roof);
rf.position.y = H;
g.add(rf);
for (var i = 0; i < 5; i++) {
var wz = -L / 2 + 4 + i * (L - 8) / 4;
[-1, 1].forEach(function (s) { wdwBox(g, 0.12, 5, 1.6, wdwMat("pane"), s * (W / 2 + 0.05), 3.5, wz); wdwBox(g, 0.14, 0.4, 1.9, wall, s * (W / 2 + 0.06), 8.5, wz); });
}
var T = o.tower || 6, TH = o.th || 26;
wdwBox(g, T, TH, T, wall, 0, 0, L / 2 + T / 2 - 0.5);
wdwBox(g, T + 0.4, 0.4, T + 0.4, wdwMat("greystone"), 0, TH - 0.4, L / 2 + T / 2 - 0.5);
if (o.clock) {
var cl = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), wdwLam(0xF4F0E4));
cl.position.set(0, TH - 3.5, L / 2 + T - 0.45);
g.add(cl);
var hd = wdwBox(g, 0.08, 0.9, 0.04, wdwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.4);
hd.rotation.z = 0.0;
var md = wdwBox(g, 0.06, 1.1, 0.04, wdwLam(0x141414), 0, TH - 3.5, L / 2 + T - 0.38);
md.rotation.z = Math.PI;
g.userData.clock = [hd, md];
}
if (o.dome) {
var dm = new THREE.Mesh(wdwGeo("bulb", function () { var pts = []; for (var k = 0; k <= 12; k++) {
var t = k / 12;
pts.push(new THREE.Vector2(Math.max(0.05, Math.sin(t * Math.PI) * (1.2 - t * 0.6)) * T * 0.45, t * T * 1.1));
} return new THREE.LatheGeometry(pts, 16); }), wdwShine(o.domeCol || 0x4A4A50, 0.4, 0.6));
dm.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(dm);
}
else {
var sp = new THREE.Mesh(wdwGeo("spire" + T, function () { var c = new THREE.ConeGeometry(T * 0.62, T * 2.6, 8); c.translate(0, T * 1.3, 0); return c; }), o.spireM || wdwShine(0xF2F0EA, 0.6, 0.05));
sp.position.set(0, TH, L / 2 + T / 2 - 0.5);
g.add(sp);
}
wdwBox(g, 2.2, 3.6, 0.2, wdwMat("darkoak"), 0, 0, L / 2 + T - 0.4);
wdwSolid(x, z, W, L, y - 1, y + H + 8, o.ry || 0);
var wd = Math.cos(o.ry || 0) * (L / 2 + T / 2 - 0.5), tx = Math.sin(o.ry || 0) * (L / 2 + T / 2 - 0.5);
wdwSolid(x + tx, z + wd, T, T, y - 1, y + TH + T * 2.6, o.ry || 0);
return g;
},
function (P, x0, z0, x1, z1, h, gate) {
var dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz), ry = Math.atan2(dx, dz) + Math.PI / 2, n = Math.ceil(L / 12), st = wdwMat("greystone");
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, mx = x0 + dx * (t0 + t1) / 2, mz = z0 + dz * (t0 + t1) / 2, seg = L / n;
if (gate && Math.hypot(mx - gate[0], mz - gate[1]) < seg * 0.6)
continue;
wdwBox(P, seg + 0.2, h, 2, st, mx, wdwLand(mx, mz) - 0.5, mz, ry, true);
for (var c = 0; c < 3; c++) {
var cx = mx + Math.cos(ry) * (-seg / 3 + c * seg / 3), cz = mz - Math.sin(ry) * (-seg / 3 + c * seg / 3);
wdwBox(P, 1.2, 0.8, 2, st, cx, wdwLand(mx, mz) - 0.5 + h, cz, ry);
}
}
},
function (P, list, o) {
o = o || {};
if (!list.length)
return;
var lite = wdwLite();
if (lite && list.length > 80)
list = list.filter(function (t, i) { return i % 2 === 0; });
wdwInst(P, wdwGeo("firT", function () { var g = new THREE.CylinderGeometry(0.16, 0.34, 9, 6); g.translate(0, 4.5, 0); return g; }), wdwMat("darkbark"), list, { shadow: !lite });
wdwInst(P, wdwGeo("firC" + (lite ? "l" : ""), function () { var parts = []; var n = lite ? 4 : 7; for (var i = 0; i < n; i++) {
var r = 2.6 - i * (2.2 / n), c = new THREE.ConeGeometry(r, 2.6, lite ? 7 : 10, 1);
c.translate(0, 2.2 + i * 1.15, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), wdwM("firM" + (o.snow ? "s" : ""), function () {
var t = wdwCanvas("needles", 128, 128, function (c, W, H) { c.fillStyle = "#24402A"; c.fillRect(0, 0, W, H); var R = wRand(7); for (var i = 0; i < 1600; i++) {
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
var lite = wdwLite();
wdwInst(P, wdwGeo("birT", function () { var g = new THREE.CylinderGeometry(0.1, 0.16, 8, 6); g.translate(0, 4, 0); return g; }), wdwMat("birch"), list, {});
wdwInst(P, wdwGeo("birC", function () { var parts = [], R = wRand(13); for (var i = 0; i < (lite ? 3 : 6); i++) {
var c = new THREE.IcosahedronGeometry(1.2 + R() * 0.8, 1);
c.translate((R() - 0.5) * 2.4, 6 + R() * 2.6, (R() - 0.5) * 2.4);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), wdwM("birL", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AAA4A, map: wdwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
},
function (P, x, z, r, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, o.y || 0, z);
P.add(g);
var R = wRand(Math.round(x + z));
var geo = wdwGeo("peak" + (o.k || 0), function () { var c = new THREE.ConeGeometry(1, 1, 14, 6); var pa = c.attributes.position, RR = wRand(o.k || 3); for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i);
if (y < 0.49) {
var j = 0.82 + RR() * 0.36;
pa.setX(i, pa.getX(i) * j);
pa.setZ(i, pa.getZ(i) * j);
pa.setY(i, y + (RR() - 0.5) * 0.06);
}
} c.computeVertexNormals(); c.translate(0, 0.5, 0); return c; });
var rock = new THREE.Mesh(geo, o.mat || wdwMat("darkrock"));
rock.scale.set(r, h, r * (o.sz || 1));
g.add(rock);
var cap = new THREE.Mesh(geo, wdwMat("snowwall"));
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
var hull = wdwMat(o.hull || "hull");
var h = new THREE.Mesh(wdwGeo("rowb", function () { var c = new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); c.scale(0.9, 0.55, 2.8); return c; }), hull);
h.position.y = 0.5;
g.add(h);
wdwBox(g, 1.5, 0.06, 0.3, wdwMat("planks"), 0, 0.38, -0.6);
wdwBox(g, 1.5, 0.06, 0.3, wdwMat("planks"), 0, 0.38, 0.8);
[-1, 1].forEach(function (s) { var oar = wdwBox(g, 0.05, 0.05, 2.6, wdwMat("oak"), s * 0.95, 0.5, 0.1); oar.rotation.z = s * 0.2; });
if (o.mast) {
wdwCyl(g, 0.04, 0.05, 3.4, wdwMat("oak"), 0, 0.4, -1.0, 6);
var sl = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.2), wdwMat("sail"));
sl.position.set(0, 2.4, -0.6);
sl.rotation.y = Math.PI / 2;
g.add(sl);
}
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : wdwLand(x, z), w = o.w || 9, d = o.d || 8, h = o.h || 6.4, lite = wdwLite();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var brick = wdwS("brick", o.brick || 0xB86A4E, 1.4), trim = wdwLam(0xF2EEE2), stone = wdwMat("ashlar"), pane = wdwMat("pane"), slate = wdwMat("slate");
wdwBox(g, w, h, d, brick, 0, 0, 0);
wdwBox(g, w + 0.12, 0.5, d + 0.12, wdwMat("darkstone"), 0, 0, 0);
wdwBox(g, w + 0.2, 0.16, d + 0.2, stone, 0, 3.1, 0);
wdwBox(g, w + 0.3, 0.2, d + 0.3, trim, 0, h - 0.2, 0);
var rh = o.rh || 3.2;
var rf = new THREE.Mesh(wdwGeo("hip" + w + "|" + d + "|" + rh, function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); c.scale(w + 0.8, rh, d + 0.8); return c; }), slate);
rf.position.y = h;
g.add(rf);
[-1, 1].forEach(function (s) { wdwBox(g, 0.9, rh + 1.8, 0.6, brick, s * w * 0.3, h, 0); wdwCyl(g, 0.12, 0.12, 0.5, wdwLam(0xA85A3A), s * w * 0.3 - 0.2, h + rh + 1.8, 0, 8); wdwCyl(g, 0.12, 0.12, 0.5, wdwLam(0xA85A3A), s * w * 0.3 + 0.2, h + rh + 1.8, 0, 8); });
var bx = -w * 0.22;
wdwBox(g, 3.2, h - 0.6, 1.2, brick, bx, 0, d / 2 + 0.6);
var br = wdwBox(g, 3.6, 0.5, 1.6, slate, bx, h - 0.6, d / 2 + 0.6);
br.rotation.x = -0.25;
[0.9, 4.0].forEach(function (wy) { wdwBox(g, 2.6, 1.7, 0.06, trim, bx, wy, d / 2 + 1.22); wdwBox(g, 2.4, 1.5, 0.06, pane, bx, wy + 0.1, d / 2 + 1.25); wdwBox(g, 0.06, 1.5, 0.08, trim, bx - 0.8, wy + 0.1, d / 2 + 1.27); wdwBox(g, 0.06, 1.5, 0.08, trim, bx + 0.8, wy + 0.1, d / 2 + 1.27); });
var dx = w * 0.25;
wdwBox(g, 1.1, 2.4, 0.08, wdwLam(o.door || 0x2A3A2A), dx, 0.2, d / 2 + 0.04);
wdwBox(g, 1.6, 0.14, 1.2, trim, dx, 2.8, d / 2 + 0.6);
[-1, 1].forEach(function (s) { wdwBox(g, 0.1, 2.6, 0.1, trim, dx + s * 0.7, 0.2, d / 2 + 1.1); });
wdwBox(g, 1.6, 0.2, 1.0, stone, dx, 0, d / 2 + 0.6);
wdwBox(g, 0.5, 0.05, 0.4, wdwLam(0xC8B080), dx + 0.3, 1.6, d / 2 + 0.08);
var win = function (wx, wy, zz, rot) { var q = new THREE.Group(); q.position.set(wx, wy, zz); q.rotation.y = rot; g.add(q); wdwBox(q, 1.1, 1.7, 0.06, trim, 0, 0, 0); wdwBox(q, 0.9, 1.5, 0.06, pane, 0, 0.1, 0.02); wdwBox(q, 1.3, 0.12, 0.2, stone, 0, -0.06, 0.06); wdwBox(q, 1.2, 0.16, 0.12, stone, 0, 1.7, 0.03); };
win(dx, 4.0, d / 2 + 0.02, 0);
[-w * 0.25, w * 0.2].forEach(function (wx) { win(wx, 0.9, -d / 2 - 0.02, Math.PI); win(wx, 4.0, -d / 2 - 0.02, Math.PI); });
[-1, 1].forEach(function (s) { win(s * (w / 2 + 0.02), 4.0, 0, s * Math.PI / 2); });
if (o.garden !== false) {
var gz = d / 2 + (o.gd || 6);
wdwBox(g, w + 4, 0.7, 0.3, brick, 0, 0, gz);
wdwBox(g, w + 4.2, 0.1, 0.4, stone, 0, 0.7, gz);
wdwBox(g, 1.2, 0.05, gz - d / 2 - 0.6, wdwMat("gravel"), dx, 0.02, (gz + d / 2) / 2 + 0.3);
if (!lite)
wdwPlant(P, "bush", [{ x: x + Math.cos(o.ry || 0) * (-w * 0.4) + Math.sin(o.ry || 0) * (d / 2 + 3), z: z - Math.sin(o.ry || 0) * (-w * 0.4) + Math.cos(o.ry || 0) * (d / 2 + 3), y: y, s: 0.9, ry: 0 }], { col: 0x2E4A26, keepAll: true });
}
wdwSolid(x, z, w, d, y - 1, y + h + rh, o.ry || 0);
g.userData.door = { x: dx, z: d / 2 + 1.6 };
return g;
},
function (P, x, z, n, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : wdwLand(x, z), sw = o.sw || 6, d = o.d || 9, h = o.h || 8.6;
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var names = o.names || ["GROCER", "BUTCHER", "DRAPER", "CHEMIST", "IRONMONGER", "BAKER", "TOBACCONIST", "NEWSAGENT", "BOOTMAKER", "POST OFFICE"], cols = [0x2A3A5A, 0x5A1E1E, 0x2A4A2A, 0x3A2A1A, 0x4A3A5A, 0x1E3A3A], R = wRand(Math.round(x * 3 + z));
var brick = wdwS("brick", 0xA86048, 1.4), slate = wdwMat("slate"), trim = wdwLam(0xF2EEE2), pane = wdwMat("pane");
for (var i = 0; i < n; i++) {
var cx = -((n - 1) * sw) / 2 + i * sw, c = cols[Math.floor(R() * cols.length)], ht = h + (i % 3) * 0.4;
wdwBox(g, sw - 0.05, ht, d, brick, cx, 0, 0);
var rf = new THREE.Mesh(wdwGeo("shr" + sw + "|" + d, function () { var s = new THREE.Shape(); s.moveTo(-d / 2 - 0.3, 0); s.lineTo(0, 2.6); s.lineTo(d / 2 + 0.3, 0); s.lineTo(-d / 2 - 0.3, 0); var e = new THREE.ExtrudeGeometry(s, { depth: sw, bevelEnabled: false }); e.translate(0, 0, -sw / 2); e.rotateY(Math.PI / 2); return e; }), slate);
rf.position.set(cx, ht, 0);
g.add(rf);
wdwBox(g, sw - 0.3, 3.3, 0.12, wdwLam(c), cx, 0, d / 2 + 0.04);
wdwBox(g, sw - 1.6, 2.3, 0.06, pane, cx - 0.5, 0.5, d / 2 + 0.12);
wdwBox(g, 1.0, 2.4, 0.08, wdwLam(0x1E1A16), cx + sw / 2 - 0.9, 0, d / 2 + 0.12);
wdwSign(g, o.names ? names[i % names.length] : names[Math.floor(R() * names.length)], sw - 0.6, 0.62, cx, 3.0, d / 2 + 0.2, 0, { bg: "#" + c.toString(16).padStart(6, "0"), ink: "#F0D890" });
if (!wdwLite()) {
var aw = wdwBox(g, sw - 0.4, 0.06, 1.6, wdwLam([0xC8B080, 0x8A3A2A, 0x3A5A3A][i % 3], { ds: 1 }), cx, 2.7, d / 2 + 0.8);
aw.rotation.x = 0.3;
}
[0, 1].forEach(function (f) { for (var k = -1; k <= 1; k += 2) {
wdwBox(g, 1.0, 1.6, 0.06, trim, cx + k * sw * 0.22, 4.2 + f * 2.4, d / 2 + 0.03);
wdwBox(g, 0.8, 1.4, 0.06, pane, cx + k * sw * 0.22, 4.3 + f * 2.4, d / 2 + 0.06);
} });
}
wdwSolid(x, z, n * sw, d, y - 1, y + h + 3, o.ry || 0);
return g;
},
function (P, pts, hfn) {
var lite = wdwLite();
wdwStrip(P, pts, 7, hfn, wdwMat("gravel"), 0.12);
var sl = [], rl = [];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ry = Math.atan2(b[0] - a[0], b[1] - a[1]), n = Math.floor(L / (lite ? 1.6 : 0.8));
for (var k = 0; k < n; k++) {
var t = k / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t;
[-1.6, 1.6].forEach(function (o) { sl.push({ x: x + Math.cos(ry) * o, z: z - Math.sin(ry) * o, y: hfn(x, z) + 0.16, ry: ry }); });
}
[-2.32, -0.88, 0.88, 2.32].forEach(function (o) { var m = new THREE.Mesh(wdwGeo("rail", function () { return new THREE.BoxGeometry(0.08, 0.14, 1); }), wdwMat("iron")); var mx = (a[0] + b[0]) / 2 + Math.cos(ry) * o, mz = (a[1] + b[1]) / 2 - Math.sin(ry) * o; m.position.set(mx, hfn(mx, mz) + 0.3, mz); m.rotation.y = ry; m.scale.z = L; P.add(m); });
}
wdwInst(P, wdwGeo("sleeper", function () { return new THREE.BoxGeometry(2.4, 0.14, 0.26); }), wdwMat("darkoak"), sl, {});
},
function (P, x, z, len, name, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : wdwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
wdwBox(g, 6, 1.0, len, wdwMat("paving"), 0, 0, 0);
wdwBox(g, 6.1, 0.12, len, wdwMat("ashlar"), 0, 1.0, 0);
for (var i = 0; i < Math.floor(len / 6); i++) {
var cz = -len / 2 + 3 + i * 6;
wdwCyl(g, 0.1, 0.12, 4, wdwLam(0x2A4A3A), 1.6, 1, cz, 8);
}
var cn = wdwBox(g, 5, 0.1, len * 0.7, wdwLam(0xD8D0C0, { ds: 1 }), 0.6, 5.0, 0);
cn.rotation.z = 0.12;
wdwBox(g, 0.2, 0.4, len * 0.7, wdwLam(0x2A4A3A), 3, 4.8, 0);
wdwBox(g, 4, 3.8, 12, wdwS("brick", 0xA86048, 1.4), -1, 1, 0);
wdwBox(g, 4.4, 0.3, 12.4, wdwLam(0xF2EEE2), -1, 4.8, 0);
wdwBox(g, 1.2, 2.3, 0.08, wdwLam(0x2A3A2A), 1.02, 1, 0);
wdwSign(g, name, 5, 0.8, 2.9, 2.6, len / 2 - 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
wdwSign(g, name, 5, 0.8, 2.9, 2.6, -len / 2 + 6, Math.PI / 2, { bg: "#1E3A5A", ink: "#F4F0E0" });
wdwFloor(x, z, 6, len, y + 1.12, {});
wdwSolid(x + Math.cos(o.ry || 0) * (-1), z - Math.sin(o.ry || 0) * (-1), 4, 12, y, y + 5, o.ry || 0);
return g;
},
function (P, x, z, len, w, y, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var br = wdwS("brick", 0x9A5A40, 1.4), rise = o.rise || 1.6, n = 8;
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, z0 = -len / 2 + len * t0, z1 = -len / 2 + len * t1, y0 = Math.sin(t0 * Math.PI) * rise, y1 = Math.sin(t1 * Math.PI) * rise, seg = wdwBox(g, w, 0.5, len / n + 0.05, br, 0, (y0 + y1) / 2 - 0.4, (z0 + z1) / 2);
seg.rotation.x = -Math.atan2(y1 - y0, len / n);
[-1, 1].forEach(function (s) { var pr = wdwBox(g, 0.4, 1.0, len / n + 0.05, br, s * (w / 2 - 0.2), (y0 + y1) / 2, (z0 + z1) / 2); pr.rotation.x = -Math.atan2(y1 - y0, len / n); });
}
var ar = new THREE.Mesh(wdwGeo("arch" + w, function () { var t = new THREE.TorusGeometry(3, 0.6, 6, 12, Math.PI); return t; }), br);
ar.rotation.y = Math.PI / 2;
ar.position.y = -3.2;
g.add(ar);
var ry = o.ry || 0, cx = function (lz) { return x + Math.sin(ry) * lz; }, cz = function (lz) { return z + Math.cos(ry) * lz; };
wdwRamp(cx(-len / 4), cz(-len / 4), w - 0.8, len / 2, y - 0.1, y + rise - 0.1, ry);
wdwRamp(cx(len / 4), cz(len / 4), w - 0.8, len / 2, y + rise - 0.1, y - 0.1, ry);
[-1, 1].forEach(function (s) { wdwSolid(x + Math.cos(ry) * s * (w / 2 - 0.2), z - Math.sin(ry) * s * (w / 2 - 0.2), 0.4, len, y - 1, y + rise + 1.1, ry); });
return g;
},
function (P, x, z, hfn, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, hfn(x, z), z);
P.add(g);
var ir = wdwLam(0x1E2A22);
wdwCyl(g, 0.07, 0.12, 3.4, ir, 0, 0, 0, 8);
wdwBox(g, 0.7, 0.06, 0.06, ir, 0, 3.1, 0);
var lt = wdwBox(g, 0.34, 0.5, 0.34, wdwGlowM(o.lit ? 0xFFE0A0 : 0xE8E4D0, o.lit ? 0.95 : 0.6), 0, 3.4, 0);
var cap = new THREE.Mesh(wdwGeo("lampcap", function () { return new THREE.ConeGeometry(0.3, 0.3, 4); }), ir);
cap.position.y = 4.05;
cap.rotation.y = Math.PI / 4;
g.add(cap);
if (o.lit) {
var gl = wGlow(0xFFD890, 0.9, 2.4);
gl.position.y = 3.6;
g.add(gl);
}
wdwRound(x, z, 0.2, hfn(x, z) - 1, hfn(x, z) + 3.5);
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
wdwInst(P, wdwGeo("tpole", function () { var p = new THREE.CylinderGeometry(0.1, 0.14, 8, 6); p.translate(0, 4, 0); var c = new THREE.BoxGeometry(1.6, 0.1, 0.1); c.translate(0, 7.4, 0); var c2 = new THREE.BoxGeometry(1.2, 0.1, 0.1); c2.translate(0, 6.8, 0); return gwMerge([p.toNonIndexed(), c, c2].map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), wdwMat("darkoak"), list, {});
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
wdwInst(P, wdwGeo("drywall", function () { var b = new THREE.BoxGeometry(0.7, 1.1, 2.5); b.translate(0, 0.5, 0); return b; }), wdwMat("granite"), list, {});
list.forEach(function (q) { wdwSolid(q.x, q.z, 0.8, 2.5, q.y - 1, q.y + 1.1, q.ry); });
return;
}
if (o.hedge) {
wdwPlant(P, "bush", list.map(function (q, i) { return { x: q.x, z: q.z, y: q.y - 0.2, s: 0.85 + ((i * 37) % 10) / 40, ry: i * 1.7 }; }), { col: 0x4A6A30, keepAll: true });
return;
}
wdwInst(P, wdwGeo(o.hedge ? "hedge" : "paling", function () { if (o.hedge) {
var h = new THREE.BoxGeometry(0.9, 1.4, 2.5, 2, 2, 2);
h.translate(0, 0.7, 0);
return h;
} var parts = []; for (var j = 0; j < 6; j++) {
var s = new THREE.BoxGeometry(0.06, 1.1, 0.08);
s.translate(0, 0.55, -1.0 + j * 0.4);
parts.push(s);
} var r = new THREE.BoxGeometry(0.05, 0.08, 2.4); r.translate(0, 0.85, 0); parts.push(r); var r2 = r.clone(); r2.translate(0, -0.5, 0); parts.push(r2); return gwMerge(parts.map(function (q) { return q.index ? q.toNonIndexed() : q; })); }), o.hedge ? wdwM("hedgeM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x3A5A2A, map: wdwLeafTex(), alphaTest: 0.3 }); m.userData.noPhoto = 1; return m; }) : wdwLam(o.col || 0xE8E2D2), list, {});
},
function (P, x, z, r, hfn, fires) {
var m = new THREE.Mesh(new THREE.CircleGeometry(r, 18), wdwM("scorch", function () { var mm = new THREE.MeshLambertMaterial({ color: 0x14100C, transparent: true, opacity: 0.85, depthWrite: false }); mm.userData.noPhoto = 1; return mm; }));
m.rotation.x = -Math.PI / 2;
m.position.set(x, hfn(x, z) + 0.05, z);
P.add(m);
var R = wRand(Math.round(x * 7 + z));
for (var i = 0; i < (fires || 0); i++) {
var a = R() * 6.283, d = R() * r * 0.8, fx = x + Math.cos(a) * d, fz = z + Math.sin(a) * d;
var f = wdwFire(P, fx, hfn(fx, fz), fz, 0.6 + R() * 0.8);
f.userData.keep = 1;
}
return m;
},
function (P, list) { if (!list.length)
return; wdwInst(P, wdwGeo("deadT", function () { var t = new THREE.CylinderGeometry(0.12, 0.3, 6, 6); t.translate(0, 3, 0); var b = new THREE.CylinderGeometry(0.05, 0.1, 2.4, 5); b.rotateZ(0.9); b.translate(0.8, 4.2, 0); var b2 = b.clone(); b2.rotateY(2.4); return gwMerge([t.toNonIndexed(), b.toNonIndexed(), b2.toNonIndexed()]); }), wdwLam(0x1A1612), list, {}); },
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group(), y = o.y != null ? o.y : wdwLand(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
g.userData.keep = 1;
var wd = wdwMat(o.mat || "oak"), blk = wdwLam(0x1A1612);
var L = o.len || 2.6, W = o.w || 1.5;
wdwBox(g, W, 0.5, L, wd, 0, 0.8, 0);
if (o.seat)
wdwBox(g, W, 0.5, 0.5, wdwLam(o.seatCol || 0x3A2A1E), 0, 1.3, -0.3);
if (o.load)
for (var i = 0; i < o.load; i++)
wdwBox(g, 0.6, 0.4 + i % 2 * 0.2, 0.6, wdwLam([0x8A6A4A, 0x5A4A3A, 0xC8B898, 0x6A3A2A][i % 4]), -0.4 + (i % 3) * 0.4, 1.3, -0.8 + Math.floor(i / 3) * 0.6);
[-1, 1].forEach(function (s) { var wh = new THREE.Mesh(wdwGeo("cwheel", function () { return new THREE.TorusGeometry(0.75, 0.05, 6, 16); }), blk); wh.position.set(s * (W / 2 + 0.1), 0.75, 0.2); wh.rotation.y = Math.PI / 2; g.add(wh); for (var k = 0; k < 5; k++) {
var sp = wdwBox(g, 0.03, 1.5, 0.03, wd, s * (W / 2 + 0.1), 0, 0.2);
sp.position.y = 0.75;
sp.rotation.x = k / 5 * Math.PI;
} });
[-1, 1].forEach(function (s) { wdwBox(g, 0.06, 0.06, 2.4, wd, s * 0.45, 0.9, -L / 2 - 1.1); });
if (o.horse && typeof wdwHorse === "function")
wdwHorse(g, 0, 0, -L / 2 - 2.0, 0, { col: o.hcol || 0x5A3A22, kind: o.kind });
if (!o.nosolid)
wdwSolid(x, z, W + 0.6, L + 2, y - 1, y + 2.2, ry || 0);
return g;
},
function (P, hfn, col, o) {
o = o || {};
var R = o.r || 2600, st = wdwLite() ? 160 : 100, E = o.edge || 820, cl = function (v) { return Math.max(-E, Math.min(E, v)); };
return wdwTerrain(P, -R, -R, 2 * R, 2 * R, st, function (x, z) { var e = Math.max(Math.abs(x), Math.abs(z)), k = wdwSmooth(E, R, e); return hfn(cl(x), cl(z)) * (1 - k) + (o.rise || 18) * k * wdwFbm(x * 0.002, z * 0.002, 2) - 0.6 - 8 * (1 - k); }, wdwMat("meadow"), function (x, z, y, c) { var g = 0.75 + wdwFbm(x * 0.01, z * 0.01, 2) * 0.2, C = typeof col === "number" ? [((col >> 16) & 255) / 255, ((col >> 8) & 255) / 255, (col & 255) / 255] : (col || [0.56, 0.74, 0.42]); c.setRGB(C[0] * g, C[1] * g, C[2] * g); });
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
var lite = wdwLite(), R = wRand(o.seed || 5), L = wdwPathLen(pts), W = o.w || 8, mv = [], g = new THREE.Group();
P.add(g);
g.userData.keep = 1;
g.userData.live = 1;
var dress = o.dress || ["gent", "lady", "maid", "worker", "boy", "girl", "porter", "cabby", "clergy", "newsboy"], n = lite ? Math.round((o.n || 40) * 0.4) : (o.n || 40), nc = lite ? Math.round((o.carts || 8) * 0.5) : (o.carts || 8);
for (var i = 0; i < n; i++) {
var d = dress[Math.floor(R() * dress.length)], kid = d === "boy" || d === "girl", m = wdwDressed((o.seed || 5) * 100 + i, d, { sex: d === "lady" || d === "maid" || d === "girl" ? "f" : "m", child: kid });
g.add(m);
mv.push({ g: m, s: R() * L, off: (R() - 0.5) * W, sp: (o.sp || 1.4) * (0.8 + R() * 0.5) });
}
for (i = 0; i < nc; i++) {
var c = wdwCart(g, 0, 0, 0, { y: 0, nosolid: true, seat: R() < 0.6, load: Math.floor(R() * 6), hcol: [0x5A3A22, 0x2A1E16, 0x8A6A4A, 0x3A3028][i % 4], len: 2 + R() * 1.4 });
mv.push({ g: c, s: R() * L, off: (R() - 0.5) * W * 0.5, sp: (o.sp || 1.4) * (0.9 + R() * 0.3), cart: 1 });
}
var on = true;
WDW.ticks.push(function (dt) { if (!g.parent || !on)
return; mv.forEach(function (M) { M.s += M.sp * dt; if (M.s > L)
M.s -= L; var p = wdwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); }); });
mv.forEach(function (M) { var p = wdwPathAt(pts, M.s), x = p.x + p.nx * M.off, z = p.z + p.nz * M.off; M.g.position.set(x, hfn(x, z), z); M.g.rotation.y = p.ry + (M.cart ? Math.PI : 0); });
g.userData.stop = function () { on = false; };
return g;
},
function (P, x, y, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var ir = wdwLam(0x1E1E1A), br = wdwMat(o.brass ? "brass" : "iron");
if (o.hang)
wdwCyl(g, 0.012, 0.012, o.hang, ir, 0, 0.34, 0, 4);
wdwCyl(g, 0.12, 0.12, 0.03, br, 0, 0, 0, 8);
wdwCyl(g, 0.1, 0.1, 0.24, wdwGlowM(0xFFD890, 0.75), 0, 0.03, 0, 8);
wdwCyl(g, 0.04, 0.12, 0.08, br, 0, 0.27, 0, 8);
return g;
},
function (P, x, y, z, s) { s = s || 1; var m = new THREE.Mesh(wdwGeo("wdGourd", function () { var pts = []; for (var i = 0; i <= 12; i++) {
var t = i / 12;
pts.push(new THREE.Vector2(Math.max(0.01, (t < 0.55 ? Math.sin(t / 0.55 * Math.PI) * 0.16 : Math.sin((t - 0.55) / 0.45 * Math.PI) * 0.08 + 0.02)), t * 0.5));
} return new THREE.LatheGeometry(pts, 10); }), wdwLam(0xC8A050)); m.position.set(x, y, z); m.scale.setScalar(s); P.add(m); return m; },
function (P, x, y, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var m = new THREE.Mesh(wdwGeo("wdShield", function () { var c = new THREE.CircleGeometry(0.5, 16); c.scale(0.55, 1, 1); return c; }), wdwLam(col || 0x6A4A2A, { ds: 1 }));
g.add(m);
var b = new THREE.Mesh(wdwGeo("wdShieldB", function () { var c = new THREE.PlaneGeometry(0.06, 0.95); return c; }), wdwLam(0xE8E0C8, { ds: 1 }));
b.position.z = 0.005;
g.add(b);
return g;
},
function (P, x, y, z, ry, items) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
wdwBox(g, 0.2 + items.length * 0.45, 0.08, 0.04, wdwMat("darkoak"), 0, 0, 0);
items.forEach(function (it, i) {
var px = -items.length * 0.225 + 0.22 + i * 0.45;
wdwCyl(g, 0.02, 0.02, 0.1, wdwMat("oak"), px, 0.0, 0.06, 5).rotation.x = Math.PI / 2;
if (it === "coat")
wdwBox(g, 0.42, 0.9, 0.08, wdwLam(0x3A3A30), px, -0.92, 0.08);
else if (it === "hat")
wdwCyl(g, 0.15, 0.17, 0.12, wdwLam(0xD8C8A0), px, -0.06, 0.12, 10);
else if (it === "rope") {
var r = new THREE.Mesh(wdwGeo("wdRopeC", function () { return new THREE.TorusGeometry(0.16, 0.03, 5, 14); }), wdwLam(0xB8A070));
r.position.set(px, -0.2, 0.08);
g.add(r);
}
else if (it === "bag")
wdwBox(g, 0.3, 0.36, 0.14, wdwLam(0x6A4A2A), px, -0.42, 0.1);
});
return g;
},
function (P, x, y, z, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
wdwBox(g, 0.42, 0.52, 0.1, wdwMat("darkoak"), 0, 0, 0);
var f = new THREE.Mesh(new THREE.CircleGeometry(0.15, 20), wdwLam(0xF4F0E4));
f.position.set(0, 0.3, 0.052);
g.add(f);
var h = wdwBox(g, 0.015, 0.11, 0.01, wdwLam(0x141414), 0, 0.3, 0.056);
h.rotation.z = 0.8;
wdwBox(g, 0.012, 0.13, 0.01, wdwLam(0x141414), 0, 0.3, 0.058);
return g;
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var ir = wdwShine(0x1E1E1E, 0.6, 0.5);
wdwCyl(g, 0.32, 0.36, 0.9, ir, 0, 0.12, 0, 14);
wdwCyl(g, 0.38, 0.38, 0.06, ir, 0, 1.0, 0, 14);
[[-0.22, -0.22], [0.22, -0.22], [-0.22, 0.22], [0.22, 0.22]].forEach(function (q) { wdwBox(g, 0.06, 0.14, 0.06, ir, q[0], 0, q[1]); });
wdwCyl(g, 0.07, 0.07, 2.0, ir, 0, 1.06, 0, 8);
wdwBox(g, 0.18, 0.14, 0.02, wdwGlowM(0xFF8A3A, 0.8), 0, 0.4, 0.35);
return g;
},
function (P, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var c = wdwLam(col || 0x2A1A14), wd = wdwMat("darkoak");
wdwBox(g, 1.9, 0.42, 0.7, c, 0, 0.12, 0);
wdwBox(g, 1.9, 0.55, 0.16, c, 0, 0.5, -0.28);
[-1, 1].forEach(function (s) { wdwBox(g, 0.14, 0.32, 0.7, c, s * 0.95, 0.5, 0); });
[[-0.85, -0.3], [0.85, -0.3], [-0.85, 0.3], [0.85, 0.3]].forEach(function (q) { wdwBox(g, 0.06, 0.12, 0.06, wd, q[0], 0, q[1]); });
return g;
},
function (P, x, z, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
wdwTable(g, 0, 0, 0.6, 0.6, 0.7, { mat: "darkoak" });
wdwCyl(g, 0.1, 0.12, 0.04, wdwMat("brass"), 0, 0.7, 0, 10);
wdwCyl(g, 0.08, 0.1, 0.18, wdwGlowM(0xFFE0A8, 0.7), 0, 0.74, 0, 10);
wdwCyl(g, 0.04, 0.06, 0.2, wdwShine(0xEAF2F4, 0.1, 0.05), 0, 0.92, 0, 8);
if (o.book)
wdwBox(g, 0.22, 0.05, 0.3, wdwLam(0x6A2A1A), 0.14, 0.7, 0.1);
return g;
},
function (P, x, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = wdwMat(o.mat || "oak");
wdwBox(g, 1.4, 0.9, 0.5, wd, 0, 0, 0);
for (var i = 0; i < 2; i++) {
wdwBox(g, 0.62, 0.3, 0.02, wdwMat("darkoak"), -0.34 + i * 0.68, 0.15, 0.26);
wdwBox(g, 0.62, 0.3, 0.02, wdwMat("darkoak"), -0.34 + i * 0.68, 0.52, 0.26);
}
if (o.hutch) {
wdwBox(g, 1.4, 1.0, 0.3, wd, 0, 0.9, -0.1);
for (var p = 0; p < 5; p++)
wdwCyl(g, 0.12, 0.12, 0.02, wdwLam([0xF4F2EA, 0x3A6A9A, 0xF4F2EA, 0xC8A060, 0xF4F2EA][p]), -0.5 + p * 0.25, 1.55, 0.0, 12).rotation.x = Math.PI / 2.4;
wdwBox(g, 1.3, 0.03, 0.25, wd, 0, 1.4, -0.08);
}
return g;
},
function (P, x, y, z, ry) {
wdwPicture(P, x, y, z, ry || 0, 0.9, 0.7, function (c, W, H) {
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
var k = new THREE.Group();
k.scale.setScalar(0.4);
g.add(k);
wdwBox(k, 0.12, 1.5, 1.7, wdwMat("pane"), 4.43, 1.6, -1.2);
wdwBox(k, 0.2, 0.12, 2.0, wdwMat("oak"), 4.38, 1.5, -1.2);
wdwBox(k, 0.18, 0.1, 1.8, wdwMat("oak"), 4.4, 3.1, -1.2);
wdwBox(k, 0.16, 1.5, 0.08, wdwMat("oak"), 4.4, 1.6, -1.2);
wdwPot && wdwPot(k, 4.25, 1.62, -1.6, 0.3);
wdfCurtain && wdfCurtain(k, 4.3, 1.6, -0.2, Math.PI / 2, 0.5, 1.6, 0xC8A060);
var cu = wdwShine(0xC8783A, 0.3, 0.8);
for (var i = 0; i < 4; i++) {
var p = wdwCyl(k, 0.22 + i * 0.04, 0.2 + i * 0.04, 0.1, cu, 2.0 + i * 0.62, 2.3, -3.55, 14);
p.rotation.x = Math.PI / 2;
wdwCyl(k, 0.03, 0.03, 0.4, cu, 2.0 + i * 0.62, 2.0, -3.55, 5);
}
var ham = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), wdwLam(0x8A4A2A));
ham.scale.set(1, 1.5, 0.8);
ham.position.set(-1.6, 2.9, -1.0);
k.add(ham);
wdwCyl(k, 0.01, 0.01, 0.6, wdwLam(0x6A5A3A), -1.6, 3.3, -1.0, 4);
for (var o = 0; o < 6; o++) {
var on = new THREE.Mesh(wdwGeo("wdOnion", function () { return new THREE.SphereGeometry(0.1, 8, 6); }), wdwLam(0xC89040));
on.position.set(-0.6 + o * 0.12, 3.1 - o % 2 * 0.12, -1.4);
k.add(on);
}
wdwShelves(k, -2.6, -3.75, 1.6, 2.4, 0, { jars: 1 });
wdwBox(k, 0.3, 0.4, 0.24, wdwMat("oak"), -0.7, 2.0, -3.55);
wdwCyl(k, 0.08, 0.1, 0.32, wdwMat("darkoak"), 0.7, 2.0, -3.55, 8);
wdfWood && wdfWood(k, 1.6, -3.0, 0, 8);
var br = wdwCyl(k, 0.03, 0.03, 2.2, wdwMat("oak"), -4.1, 1.1, 2.6, 5);
br.rotation.z = 0.2;
var bh = wdwCyl(k, 0.16, 0.1, 0.5, wdwLam(0xC8A858), -4.1 + 0.2, 0.2, 2.6, 8);
bh.rotation.z = 0.2;
wdwRug(k, -1.0, 1.4, 2.4, 1.6, 0x8A4A3A);
for (var b = 0; b < 5; b++) {
var sh = wdwBox(k, 0.18 + b % 2 * 0.1, 0.02, 0.12, wdwLam(0xF0ECE0), -0.4 + b * 0.5, 0.01, 0.9 - b % 3 * 0.3);
sh.rotation.y = b * 1.3;
}
wdwCyl(k, 0.3, 0.26, 0.05, wdwLam(0xE8E4D8), 1.1, 0.0, 1.2, 16);
var glow = null;
g.children.forEach(function (c) { if (c.isPointLight)
glow = c; });
if (glow) {
glow.color.setHex(0xFF9446);
glow.intensity = 1.4;
glow.position.set(0, 0.5, -0.9);
}
if (typeof wdxPool === "function")
try {
wdxPool(k, 0, 0.02, -2.2, 2.6, 0xFF9A4A, 0.35);
}
catch (e) { }
for (var bi = 0; bi < 4; bi++)
wdwBox(k, 0.3, 0.34, 7.4, wdwMat("beams"), -3.0 + bi * 2.0, 3.4, -0.1);
[-1.1, -0.85].forEach(function (x, i) { var fi = wdwCyl(k, 0.03, 0.03, 1.6, wdwMat("iron"), x - 0.8, 0, -2.6, 6); fi.rotation.z = 0.12 + i * 0.06; });
wdwCyl(k, 0.6, 0.6, 0.06, wdwShine(0x7A5A2A, 0.3, 0), 0, 1.28, -2.8, 16);
var smT = wdwCanvas("wdkSmoke", 64, 64, function (c, W, H) { var gr = c.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2); gr.addColorStop(0, "rgba(200,186,160,.75)"); gr.addColorStop(1, "rgba(200,186,160,0)"); c.fillStyle = gr; c.fillRect(0, 0, W, H); });
var sm = [], n = lite ? 10 : 26;
for (var q = 0; q < n; q++) {
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: smT, transparent: true, opacity: 0.32, depthWrite: false, color: 0xB8A890 }));
var sx = (q * 0.37 % 1 - 0.5) * 3.0, sz = (q * 0.61 % 1 - 0.5) * 2.4, sy = 0.5 + (q * 0.23 % 1) * 0.9;
sp.position.set(sx, sy, sz);
sp.scale.setScalar(1.2 + (q % 3) * 0.4);
g.add(sp);
sm.push({ s: sp, x: sx, y: sy, z: sz, p: q });
}
WDW.ticks.push(function () { if (!WDW.inRm)
return; var T = WDW.t; sm.forEach(function (o) { o.s.position.set(o.x + Math.sin(T * 0.2 + o.p) * 0.3, o.y + Math.sin(T * 0.13 + o.p * 2) * 0.12, o.z + Math.cos(T * 0.17 + o.p) * 0.25); }); if (glow)
glow.intensity = 1.4 * (0.9 + Math.sin(T * 7.3) * 0.06 + Math.sin(T * 3.1) * 0.05); });
},
function (g, R, lite) {
wdwTable(g, -1.6, -1.4, 0.6, 0.4, 0.72, {});
typeof wdxLamp === "function" && wdxLamp(g, -1.6, 0.74, -1.4, null, 0xFFE0A8);
for (var u = 0; u < 3; u++) {
var um = wdwCyl(g, 0.02, 0.04, 0.9, wdwLam([0x1A1A1A, 0x3A2A5A, 0x5A2A2A][u]), -2.1 + (u - 1) * 0.05, 0.45, 1.4, 6);
um.rotation.z = (u - 1) * 0.12;
}
wdfPlant && wdfPlant(g, -0.9, -1.5, 1);
wdwPicture(g, 0.6, 1.6, -1.86, 0, 0.5, 0.4);
wdwBox(g, 0.06, 0.6, 0.14, wdwMat("darkoak"), -2.38, 1.3, 0.2);
var gl0 = wdwCyl(g, 0.08, 0.08, 0.02, wdwShine(0xD8D0B0, 0.1, 0.3), -2.33, 1.7, 0.2, 14);
gl0.rotation.z = Math.PI / 2;
},
function (g, R, lite) {
wdwRug(g, 0, 0.3, 2.0, 1.4, 0x3A4A7A);
wdwBox(g, 0.8, 0.78, 0.45, wdwMat("oak"), 1.7, 0, 1.2);
wdwBox(g, 0.82, 0.04, 0.48, wdwMat("marble"), 1.7, 0.78, 1.2);
wdwCyl(g, 0.2, 0.12, 0.1, wdwLam(0xF4F0F0), 1.7, 0.82, 1.2, 16);
wdwCyl(g, 0.08, 0.1, 0.24, wdwLam(0xF4F0F0), 1.9, 0.82, 1.25, 10);
wdwBox(g, 1.0, 0.9, 0.5, wdwMat("darkoak"), -1.4, 0, -1.5);
for (var d = 0; d < 3; d++) {
wdwBox(g, 0.9, 0.22, 0.02, wdwMat("oak"), -1.4, 0.1 + d * 0.27, -1.24);
wdwCyl(g, 0.02, 0.02, 0.02, wdwMat("brass"), -1.4, 0.2 + d * 0.27, -1.22, 6);
}
wdwPicture(g, -0.9, 1.7, -1.76, 0, 0.4, 0.5);
wdwPicture(g, 0.9, 1.7, -1.76, 0, 0.4, 0.5);
},
function (p, hf, df) {
var H = p.h || 1, b = p.b || 1, am = p.arm || 1, col = p.col, c2 = p.col2 !== undefined ? p.col2 : col, cs = p.skin !== undefined ? p.skin : col, lc = p.legCol !== undefined ? p.legCol : c2, fc = p.foot !== undefined ? p.foot : lc, hc = p.hand !== undefined ? p.hand : cs;
var prims = [], bones = [], eyes = [], bird = !!p.bird, hipY = H * (p.legs || 0.42), sY = hipY + H * (bird ? 0.33 : 0.36), sX = 0.11 * b * H, E = [0, sY + H * (bird ? 0.05 : 0.06), H * (bird ? 0.06 : 0.015)], F = 0.1 * b * H;
var e = function (c, r, cl, bn, o) { prims.push(wdcE(c, r, cl, bn, o)); }, cy = function (a, bb, r0, r1, cl, bn, o) { prims.push(wdcC(a, bb, r0, r1, cl, bn, o)); };
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
arm.push(wdcE([sX + 0.03 * b * H, sY - 0.12 * H, -0.04 * H], [0.035 * H, 0.13 * H, 0.19 * H], wc, "L_arm", { rot: [0.45, 0, 0.08], k: 0.02 * H }), wdcE([sX + 0.02 * b * H, sY - 0.17 * H, -0.2 * H], [0.025 * H, 0.06 * H, 0.12 * H], p.tipCol !== undefined ? p.tipCol : wc, "L_fore", { rot: [0.6, 0, 0], k: 0.015 * H }));
el = [sX + 0.03 * H, sY - 0.1 * H, -0.1 * H];
wr = [sX + 0.03 * H, sY - 0.16 * H, -0.2 * H];
}
else {
var ar = (p.limb || 1) * 0.034 * b * H;
arm.push(wdcC([sX, sY - 0.01 * H, 0], el, ar * 1.15, ar, col, "L_arm", { k: 0.01 * H }), wdcC(el, wr, ar, ar * 0.85, col, "L_fore", { k: 0.01 * H }), wdcE([wr[0], wr[1] + 0.01 * H, wr[2]], [ar * 1.15, ar * 0.7, ar * 1.15], p.cuff !== undefined ? p.cuff : col, "L_fore", { k: 0.006 * H }), wdcE(hd, [ar * 0.75, 0.035 * H, ar * 0.95], hc, "L_hand", { k: 0.01 * H }));
for (var f = 0; f < 3; f++)
arm.push(wdcC([hd[0], hd[1] - 0.02 * H, hd[2] + (f - 1) * ar * 0.5], [hd[0] + 0.003 * H, hd[1] - 0.055 * H, hd[2] + (f - 1) * ar * 0.55 + 0.006 * H], ar * 0.3, ar * 0.22, hc, "L_hand", { k: 0.005 * H }));
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
legs.push(wdcE([hx, hipY + 0.02 * H, 0.0], [0.06 * b * H, 0.08 * H, 0.07 * b * H], col, "L_thigh", { k: 0.02 * H }), wdcC([hx, hipY - 0.04 * H, 0.0], kn, lr * 1.2, lr, lc, "L_thigh"), wdcC(kn, an, lr, lr, lc, "L_shin"));
[-0.5, 0, 0.5].forEach(function (a) { legs.push(wdcC(an, [an[0] + Math.sin(a) * FL * 0.7, 0.008 * H, an[2] + Math.cos(a) * FL * 0.7], lr * 0.8, lr * 0.5, fc, "L_foot", { k: 0.003 * H })); });
legs.push(wdcC(an, [an[0], 0.01 * H, an[2] - FL * 0.35], lr * 0.7, lr * 0.4, fc, "L_foot"));
}
else {
legs.push(wdcE([hx, hipY - 0.06 * H, 0.01 * H], [lr * 1.6, 0.11 * H, lr * 1.6], lc, "L_thigh", { k: 0.02 * H }), wdcC([hx, hipY - 0.04 * H, 0], kn, lr * 1.35, lr * 1.05, lc, "L_thigh", { k: 0.01 * H }), wdcC(kn, an, lr * 1.05, lr * 0.8, lc, "L_shin", { k: 0.01 * H }));
if (p.digi)
legs.push(wdcC(an, [an[0], 0.03 * H, an[2] + 0.01 * H], lr * 0.8, lr * 0.75, lc, "L_foot", { k: 0.008 * H }));
legs.push(wdcE([hx, 0.03 * H, an[2] + FL * 0.5], [lr * 1.05, 0.03 * H, FL * 0.55], fc, "L_foot", { k: 0.012 * H }));
if (p.hooves)
legs.push(wdcE([hx, 0.035 * H, an[2] + FL * 0.5], [lr * 1.15, 0.04 * H, FL * 0.45], 0x1E1814, "L_foot", { g: 0.4, k: 0.01 * H }));
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
prims = prims.concat(hf(wdcAt(E, (H / 1.85) * (p.hs || 1)), (H / 1.85) * (p.hs || 1), eyes, I));
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
o.push(wdcE(at(0, 0.07, 0.01), [0.078 * s, 0.08 * s, 0.095 * s], fur, B));
o.push(wdcE(at(0, 0.035, 0.085), [0.055 * s, 0.046 * s, 0.055 * s], fur, B, { k: 0.02 * s }));
o.push(wdcE(at(0.032, 0.025, 0.1), [0.03 * s, 0.026 * s, 0.028 * s], fur, B, { k: 0.01 * s }), wdcE(at(-0.032, 0.025, 0.1), [0.03 * s, 0.026 * s, 0.028 * s], fur, B, { k: 0.01 * s }));
o.push(wdcE(at(0, 0.045, 0.138), [0.014 * s, 0.011 * s, 0.009 * s], 0xD88A92, B, { g: 0.6, k: 0.004 * s }));
o.push(wdcE(at(0, 0.005, 0.11), [0.02 * s, 0.012 * s, 0.016 * s], fur, B, { k: 0.01 * s }));
var L = hare ? 0.36 : 0.42;
[-1, 1].forEach(function (sd) {
o.push(wdcC(at(sd * 0.035, 0.13, -0.01), at(sd * (hare ? 0.09 : 0.06), 0.13 + L * 0.55, -0.05), 0.032 * s, 0.03 * s, fur, B, { k: 0.012 * s }));
o.push(wdcC(at(sd * (hare ? 0.09 : 0.06), 0.13 + L * 0.55, -0.05), at(sd * (hare ? 0.13 : 0.075), 0.13 + L, -0.085), 0.03 * s, 0.012 * s, fur, B, { k: 0.01 * s }));
o.push(wdcE(at(sd * (hare ? 0.085 : 0.058), 0.13 + L * 0.55, -0.022), [0.012 * s, L * 0.36 * s, 0.016 * s], inner, B, { rot: [-0.12, 0, sd * (hare ? -0.18 : -0.08)], k: 0.004 * s }));
});
wdcEye(eyes, at(0.05, 0.08, 0.075), 0.016 * s, eyeCol, "r");
return o;
},
function (at, s, eyes, fur, inner) {
var o = [], B = "head";
o.push(wdcE(at(0, 0.06, 0.02), [0.07 * s, 0.068 * s, 0.08 * s], fur, B));
o.push(wdcC(at(0, 0.05, 0.07), at(0, 0.03, 0.17), 0.05 * s, 0.018 * s, fur, B, { k: 0.015 * s }));
o.push(wdcE(at(0, 0.032, 0.175), [0.012 * s, 0.01 * s, 0.01 * s], 0xC88A8A, B, { g: 0.5, k: 0.004 * s }));
[-1, 1].forEach(function (sd) { o.push(wdcE(at(sd * 0.06, 0.12, -0.01), [0.05 * s, 0.05 * s, 0.012 * s], fur, B, { rot: [0, sd * 0.3, 0], k: 0.01 * s }), wdcE(at(sd * 0.06, 0.12, 0.0), [0.036 * s, 0.036 * s, 0.008 * s], inner, B, { rot: [0, sd * 0.3, 0], k: 0.004 * s })); });
wdcEye(eyes, at(0.042, 0.075, 0.075), 0.016 * s, 0x0E0A08, "r");
return o;
},
function (at, s, eyes, col, beakCol, kind, eyeCol) {
var o = [], B = "head";
o.push(wdcE(at(0, 0.06, 0.02), [0.075 * s, 0.075 * s, 0.08 * s], col, B));
if (kind === "dodo") {
o.push(wdcC(at(0, 0.06, 0.07), at(0, 0.03, 0.2), 0.05 * s, 0.04 * s, beakCol, B, { g: 0.5, k: 0.015 * s }));
o.push(wdcE(at(0, 0.0, 0.22), [0.04 * s, 0.045 * s, 0.045 * s], beakCol, B, { g: 0.5, k: 0.02 * s }));
o.push(wdcE(at(0, -0.02, 0.18), [0.032 * s, 0.02 * s, 0.06 * s], beakCol, B, { g: 0.5 }));
}
else if (kind === "hook") {
o.push(wdcC(at(0, 0.07, 0.08), at(0, 0.04, 0.15), 0.03 * s, 0.02 * s, beakCol, B, { g: 0.55, k: 0.01 * s }));
o.push(wdcC(at(0, 0.04, 0.15), at(0, -0.01, 0.16), 0.02 * s, 0.006 * s, beakCol, B, { g: 0.55, k: 0.006 * s }));
}
else if (kind === "flat") {
o.push(wdcE(at(0, 0.04, 0.12), [0.035 * s, 0.012 * s, 0.07 * s], beakCol, B, { g: 0.45, k: 0.01 * s }));
}
else {
o.push(wdcC(at(0, 0.06, 0.08), at(0, 0.05, 0.13), 0.018 * s, 0.004 * s, beakCol, B, { g: 0.5, k: 0.006 * s }));
}
wdcEye(eyes, at(0.05, 0.08, 0.06), 0.015 * s, eyeCol || 0x2A1A0A, "r");
return o;
},
function (at, s, eyes, skin) {
var o = [], B = "head";
o.push(wdcE(at(0, 0.05, 0.03), [0.11 * s, 0.07 * s, 0.1 * s], skin, B));
o.push(wdcE(at(0, 0.02, 0.09), [0.1 * s, 0.035 * s, 0.05 * s], skin, B, { k: 0.02 * s }));
o.push(wdcC(at(-0.09, 0.015, 0.11), at(0.09, 0.015, 0.11), 0.008 * s, 0.008 * s, 0x3A2A1A, B, { k: 0.004 * s }));
[-1, 1].forEach(function (sd) { o.push(wdcE(at(sd * 0.06, 0.11, 0.05), [0.035 * s, 0.035 * s, 0.035 * s], skin, B, { k: 0.01 * s })); });
wdcEye(eyes, at(0.06, 0.115, 0.078), 0.022 * s, 0xC8A030, "bar");
return o;
},
function (at, s, eyes, skin) {
var o = [], B = "head";
o.push(wdcE(at(0, 0.07, 0.04), [0.07 * s, 0.11 * s, 0.13 * s], skin, B));
o.push(wdcE(at(0, 0.05, 0.16), [0.035 * s, 0.035 * s, 0.02 * s], 0xC87A6A, B, { k: 0.01 * s }));
o.push(wdcE(at(0, 0.18, -0.02), [0.01 * s, 0.06 * s, 0.08 * s], 0x8A9AA8, B, { rot: [0.3, 0, 0], k: 0.01 * s }));
wdcEye(eyes, at(0.06, 0.1, 0.09), 0.022 * s, 0xE8D8A0, "r");
return o;
},
function (at, s, eyes, hide) {
var o = [], B = "head";
o.push(wdcE(at(0, 0.07, 0.03), [0.09 * s, 0.09 * s, 0.1 * s], hide, B));
o.push(wdcC(at(0, 0.05, 0.08), at(0, 0.0, 0.2), 0.075 * s, 0.06 * s, hide, B, { k: 0.02 * s }));
o.push(wdcE(at(0, -0.01, 0.22), [0.06 * s, 0.045 * s, 0.04 * s], 0x8A6A5A, B, { g: 0.3, k: 0.01 * s }));
[-1, 1].forEach(function (sd) { o.push(wdcE(at(sd * 0.11, 0.1, -0.01), [0.06 * s, 0.02 * s, 0.03 * s], hide, B, { rot: [0, 0, sd * -0.4], k: 0.01 * s }), wdcC(at(sd * 0.05, 0.15, 0.0), at(sd * 0.07, 0.19, 0.0), 0.012 * s, 0.005 * s, 0xE8DCC0, B, { g: 0.4, k: 0.005 * s })); });
wdcEye(eyes, at(0.065, 0.09, 0.08), 0.02 * s, 0x3A2210, "r", { turn: 0.5 });
return o;
},
function () {
if (typeof CRX_PLANS === "undefined" || typeof crxQuad !== "function" || CRX_PLANS.wd_rabbit)
return;
var F = function (k, f) { CRX_PLANS["wd_" + k] = f; WDW_CRX[k] = "wd_" + k; };
var WHITE = 0xF4F2EC, PINK = 0xE8A8B0;
var coat = function (I, tails, vest, bow, collar) {
var H = I.H, h = I.hipY, o = [];
if (vest != null)
o.push(wdcE([0, h + 0.21 * H, I.F * 0.72], [0.075 * I.b * H, 0.11 * H, 0.035 * H], vest, "spine", { k: 0.012 * H }));
if (collar != null)
o.push(wdcC([-0.045 * H, I.sY + 0.005 * H, 0.035 * H], [0.045 * H, I.sY + 0.005 * H, 0.035 * H], 0.022 * H, 0.022 * H, collar, "chest", { k: 0.008 * H }));
if (bow != null)
o.push(wdcE([0, I.sY - 0.012 * H, 0.075 * H], [0.04 * H, 0.018 * H, 0.016 * H], bow, "chest", { k: 0.005 * H }));
if (tails != null)
[-1, 1].forEach(function (sd) { o.push(wdcC([sd * 0.05 * H, h + 0.06 * H, -0.08 * H], [sd * 0.06 * H, h - 0.2 * H, -0.12 * H], 0.04 * H, 0.022 * H, tails, "hips", { k: 0.012 * H })); });
return o;
};
var rab = function (herald) {
return wdcSoft({ h: 1.0, b: 0.85, legs: 0.4, digi: 1, footL: 0.2, hs: 1.25, col: herald ? 0xF4F0E8 : 0x8A2E2A, col2: herald ? 0xF4F0E8 : 0xE0C050, skin: WHITE, hand: WHITE, legCol: WHITE, foot: WHITE, cuff: WHITE, limb: 0.85 }, function (at, s, e) { return wdcRabbitHead(at, s, e, WHITE, PINK, 0xD84A5A); }, function (I) {
var o = coat(I, herald ? null : 0x8A2E2A, herald ? null : 0xE0C050, 0xB82A2A, 0xF8F6F0);
var H = I.H;
if (!herald)
o.push(wdcC([0.0, I.hipY + 0.25 * H, I.F * 0.98], [0.07 * H, I.hipY + 0.2 * H, I.F * 0.9], 0.004 * H, 0.004 * H, 0xE8C048, "spine", { g: 0.8, k: 0.002 * H }), wdcE([0.07 * H, I.hipY + 0.19 * H, I.F * 0.92], [0.022 * H, 0.022 * H, 0.008 * H], 0xE8C048, "spine", { g: 0.8 }));
o.push(wdcE([0, I.hipY + 0.02 * H, -0.13 * H], [0.05 * H, 0.05 * H, 0.05 * H], WHITE, "hips", { k: 0.02 * H }));
return o;
});
};
F("rabbit", function () { return rab(false); });
F("herald", function () { var p = rab(true); p.extras = function (I) { wdcHearts(I); wdcTrumpet(I); }; return p; });
F("hare", function () {
return wdcSoft({ h: 1.2, b: 0.85, legs: 0.43, digi: 1, footL: 0.2, hs: 1.2, col: 0x6A5A3A, col2: 0xE8E0C8, skin: 0xA8865A, hand: 0xA8865A, legCol: 0x8A7A5A, foot: 0xA8865A, limb: 0.85 }, function (at, s, e) { var o = wdcRabbitHead(at, s, e, 0xA8865A, 0xD8A8A0, 0xC8902A, true); for (var i = 0; i < 7; i++) {
var a = i * 0.9;
o.push(wdcC(at(Math.sin(a) * 0.06, 0.14, Math.cos(a) * 0.05 - 0.01), at(Math.sin(a) * 0.14, 0.2 + (i % 3) * 0.03, Math.cos(a) * 0.1), 0.006 * s, 0.004 * s, 0xD8C060, "head", { k: 0.002 * s }));
} return o; }, function (I) { return coat(I, 0x6A5A3A, 0xE8D8A8, 0x2A4A8A, 0xF8F6F0); });
});
F("mouse", function () { var p = crxQuad({ L: 0.16, H: 0.06, G: 0.06, W: 1.1, legR: 0.012, head: "rat", hs: 0.34, col: 0x8A7A6A, belly: 0xC8B8A8, muzzle: 0xA89888, tail: { l: 0.24, r: 0.008, up: -0.4 }, neck: { l: 0.04, up: 0.6 }, eyeCol: 0x0E0A08, surf: "fur" }); return p; });
F("dormouse", function () { var p = crxQuad({ L: 0.13, H: 0.05, G: 0.07, W: 1.35, legR: 0.012, head: "rat", hs: 0.32, col: 0xB8864A, belly: 0xE8D0A8, muzzle: 0xD8B088, tail: { l: 0.16, r: 0.02, up: -0.2 }, neck: { l: 0.03, up: 0.5 }, eyeCol: 0x1A0E08, surf: "fur" }); return p; });
var bird = function (h, o, kind) { return wdcSoft(Object.assign({ h: h, b: 1.0, legs: 0.24, bird: 1, footL: 0.07, hs: 1.5, surf: "fur", stride: 0.5 * h }, o), function (at, s, e) { return wdcBirdHead(at, s, e, o.headCol != null ? o.headCol : o.col, o.beak, kind, o.eye); }); };
F("dodo", function () { var p = bird(1.0, { col: 0x8A8A84, col2: 0xC8C0A8, beak: 0xD8C060, legCol: 0xD8C060, foot: 0xD8C060, eye: 0xE8D040, wingCol: 0x6A6A64, tailCol: 0xE8E4DC, b: 1.25, hs: 1.7 }, "dodo"); p.extras = function (I) { wdcStick(I, 0.9); }; return p; });
F("lory", function () { return bird(0.55, { col: 0xC82A2A, col2: 0xD84A2A, beak: 0xE8A030, legCol: 0x5A5A5A, foot: 0x5A5A5A, eye: 0xE89030, wingCol: 0x2A8A3A, tipCol: 0x2A4AB8, tailCol: 0x2A4AB8, headCol: 0x3A3AA8 }, "hook"); });
F("eaglet", function () { return bird(0.55, { col: 0x6A4A2A, col2: 0xA8865A, beak: 0xE8C040, legCol: 0xE8C040, foot: 0xE8C040, eye: 0xE8B020, wingCol: 0x4A321A, headCol: 0xC8A878 }, "hook"); });
F("duck", function () { return bird(0.55, { col: 0xF0EEE6, col2: 0xF6F4EE, beak: 0xE8A030, legCol: 0xE8A030, foot: 0xE8A030, eye: 0x2A2018, wingCol: 0xE0DCD0 }, "flat"); });
F("magpie", function () { return bird(0.45, { col: 0x141418, col2: 0xF4F4F0, beak: 0x1A1A1A, legCol: 0x1A1A1A, foot: 0x1A1A1A, eye: 0x1A1A1A, wingCol: 0x1A2A4A, tipCol: 0xF0F0F0, tailCol: 0x1A2A3A }, "short"); });
F("canary", function () { return bird(0.3, { col: 0xF0D840, col2: 0xF4E070, beak: 0xE8B080, legCol: 0xC8A0A0, foot: 0xC8A0A0, eye: 0x1A1A1A, wingCol: 0xE0C030 }, "short"); });
F("pigeon", function () { return bird(0.48, { col: 0x8A8AA0, col2: 0xA0A0B8, beak: 0x3A3A3A, legCol: 0xC86A6A, foot: 0xC86A6A, eye: 0xE8783A, wingCol: 0x6A6A80, tipCol: 0x3A3A4A, headCol: 0x6A7A8A }, "short"); });
F("flamingo", function () {
return wdcSoft({ h: 1.3, b: 0.8, legs: 0.55, bird: 1, footL: 0.07, hs: 0.9, col: 0xF08AA0, col2: 0xF4A0B4, legCol: 0xE87A90, foot: 0xE87A90, wingCol: 0xE87090, tipCol: 0x1A1A1A, surf: "fur", limb: 0.8 }, function (at, s, e) { return [wdcC(at(0, -0.1, -0.02), at(0, -0.85, 0.05), 0.035 * s, 0.045 * s, 0xF4A0B4, "head", { k: 0.02 * s })].concat(wdcBirdHead(at, s, e, 0xF4A0B4, 0x2A2A2A, "hook", 0xE8D040)); });
});
F("bill", function () { return wdcSoft({ h: 0.6, b: 0.85, legs: 0.36, hs: 1.4, col: 0x6A8A3A, col2: 0xB8C890, skin: 0x7A9A44, hand: 0x7A9A44, legCol: 0x6A8A3A, foot: 0x6A8A3A, tail: 1, tailCol: 0x5A7A32, surf: "scale" }, function (at, s, e) { return wdcLizHead(at, s, e, 0x7A9A44); }, function (I) { return coat(I, null, 0xC8A040, null, null); }); });
var wig = function (at, s) { var o = []; for (var i = 0; i < 9; i++) {
var a = (i / 8 - 0.5) * 3.0;
o.push(wdcE(at(Math.sin(a) * 0.11, 0.12 - Math.abs(Math.sin(a)) * 0.05, Math.cos(a) * 0.03 - 0.06), [0.04 * s, 0.04 * s, 0.04 * s], 0xF4F2EE, "head", { k: 0.02 * s }));
} return o; };
var footman = function (liv, face) { return function (I) { var o = coat(I, liv, 0xF0E8D0, null, 0xF8F6F0), H = I.H; [0.04, 0.1, 0.16].forEach(function (y) { o.push(wdcE([0.04 * H, I.hipY + (0.12 + y) * H, I.F * 0.98], [0.008 * H, 0.008 * H, 0.005 * H], 0xE8C048, "spine", { g: 0.8 }), wdcE([-0.04 * H, I.hipY + (0.12 + y) * H, I.F * 0.98], [0.008 * H, 0.008 * H, 0.005 * H], 0xE8C048, "spine", { g: 0.8 })); }); return o; }; };
F("frogfoot", function () { return wdcSoft({ h: 1.6, b: 1.0, legs: 0.45, hs: 1.35, col: 0x2A4A8A, col2: 0xF0E8D0, skin: 0x7A9A5A, hand: 0x7A9A5A, legCol: 0xE8E0C8, foot: 0x1A1A1A, footL: 0.12, cuff: 0xF0E8D0, surf: "hide", limb: 0.75 }, function (at, s, e) { return wdcFrogHead(at, s, e, 0x7A9A5A).concat(wig(at, s)); }, footman(0x2A4A8A)); });
F("fishfoot", function () { return wdcSoft({ h: 1.65, b: 1.0, legs: 0.45, hs: 1.3, col: 0x6A2A3A, col2: 0xF0E8D0, skin: 0x9AAAB8, hand: 0x9AAAB8, legCol: 0xE8E0C8, foot: 0x1A1A1A, footL: 0.12, cuff: 0xF0E8D0, surf: "scale", limb: 0.75 }, function (at, s, e) { return wdcFishHead(at, s, e, 0x9AAAB8).concat(wig(at, s)); }, footman(0x6A2A3A)); });
F("pat", function () { return wdcSoft({ h: 0.7, b: 1.1, legs: 0.34, hs: 1.4, gut: 0.5, col: 0xE8E0D0, col2: 0x8A7A5A, skin: 0x3A3434, hand: 0xD8A8A0, legCol: 0x4A3A2A, foot: 0xD8A8A0, footL: 0.14 }, function (at, s, e) { return wdcMouseHead(at, s, e, 0x3A3434, 0x5A4A4A); }, function (I) { var H = I.H; return [wdcE([0, I.hipY + 0.08 * H, I.F * 0.7], [0.11 * H, 0.16 * H, 0.03 * H], 0x8A7A5A, "spine", { k: 0.01 * H })]; }); });
F("puppy", function () { return crxQuad({ L: 0.62, H: 0.48, G: 0.24, W: 1.0, legR: 0.06, head: "dog", hs: 1.4, col: 0xD8C0A0, belly: 0xF0E4D0, muzzle: 0xF0E4D0, tail: { l: 0.3, r: 0.05, up: 0.6 }, neck: { l: 0.22, up: 0.6 }, eyeCol: 0x3A2410, stride: 0.9 }); });
F("pig", function () { return crxQuad({ L: 0.3, H: 0.16, G: 0.12, W: 1.15, legR: 0.03, head: "boar", hs: 0.62, col: 0xF0B8B0, belly: 0xF4C8C0, muzzle: 0xE8A0A0, tail: { l: 0.08, r: 0.012, up: 0.8 }, neck: { l: 0.08, up: 0.3 }, surf: "flesh", foot: "hoof", footCol: 0x8A6A60, eyeCol: 0x2A1A10 }); });
F("cat", function () { return crxQuad({ L: 0.62, H: 0.42, G: 0.21, W: 1.2, legR: 0.045, head: "cat", hs: 1.3, col: 0x8A7A64, belly: 0xE8E0D0, muzzle: 0xF4ECDC, stripes: 0x4A3A2A, tail: { l: 0.6, r: 0.05, up: 0.4 }, neck: { l: 0.16, up: 0.7 }, eyeCol: 0xC8D040, stride: 0.95 }); });
F("hedgehog", function () { return crxQuad({ L: 0.18, H: 0.07, G: 0.09, W: 1.3, legR: 0.016, head: "rat", hs: 0.42, col: 0x6A5A44, belly: 0xC8B898, muzzle: 0xC8B898, neck: { l: 0.04, up: 0.2 }, surf: "fur", eyeCol: 0x0E0A08 }); });
F("caterpillar", function () {
var prims = [], bones = [["c0", null, [0, 0.1, 0]]], col = 0x4A8AC8, col2 = 0x7AB0E0, eyes = [], n = 9;
for (var i = 0; i < n; i++) {
var t = i / (n - 1), y = 0.1 + (t < 0.45 ? 0 : (t - 0.45) * 1.3), z = t < 0.45 ? -0.5 + t * 0.9 : -0.1 + (t - 0.45) * 0.15, r = 0.11 - t * 0.025, b = "c" + Math.min(4, Math.floor(i / 2));
prims.push(wdcE([0, y, z], [r, r * 0.95, r * 1.05], i % 2 ? col : col2, b, { k: 0.04 }));
if (i < n - 2 && i % 2 === 0)
[-1, 1].forEach(function (sd) { prims.push(wdcC([sd * r * 0.8, y - r * 0.5, z], [sd * r * 1.15, y - r * 0.95, z + 0.02], 0.022, 0.016, 0x2A4A8A, b, { k: 0.01 })); });
}
for (var bi = 1; bi < 5; bi++) {
var tt = (bi * 2) / (n - 1);
bones.push(["c" + bi, "c" + (bi - 1), [0, 0.1 + (tt < 0.45 ? 0 : (tt - 0.45) * 1.3), tt < 0.45 ? -0.5 + tt * 0.9 : -0.1 + (tt - 0.45) * 0.15]]);
}
var hy = 0.1 + 0.55 * 1.3 + 0.06, hz = -0.1 + 0.55 * 0.15 + 0.02;
bones.push(["head", "c4", [0, hy, hz]]);
prims.push(wdcE([0, hy + 0.04, hz + 0.02], [0.1, 0.1, 0.1], col, "head", { k: 0.03 }));
prims.push(wdcE([0, hy + 0.0, hz + 0.09], [0.05, 0.035, 0.035], 0x2A5A9A, "head", { k: 0.015 }));
[-1, 1].forEach(function (sd) { prims.push(wdcC([sd * 0.1, hy - 0.12, hz + 0.02], [sd * 0.02, hy - 0.2, hz + 0.1], 0.025, 0.02, 0x3A7AB8, "c4", { k: 0.015 })); });
eyes.push({ bone: "head", at: [0.045, hy + 0.07, hz + 0.08], r: 0.022, iris: 0x1A1A2A, pupil: "r", turn: 0.3 });
return { prims: prims, bones: crxBonesMirror(bones), eyes: eyes, col: col, surf: "flesh", anim: "float", k: 0.05, stride: 1, runAt: 9, fine: 110, pose: {} };
});
F("gryphon", function () { return crxQuad({ L: 1.15, H: 0.8, G: 0.32, W: 0.95, legR: 0.07, head: "eagle", hs: 2.0, col: 0xC8A060, belly: 0xE8D8B0, muzzle: 0xF2EEE6, headCol: 0xE8DCC0, tail: { l: 0.9, r: 0.06, up: -0.2 }, neck: { l: 0.45, up: 0.7 }, claws: 1, eyeCol: 0xE8B23A, stride: 1.4, wings: { col: 0xB8904A, col2: 0x8A6A3A, s: 1.5 } }); });
F("turtle", function () {
return wdcSoft({ h: 1.15, b: 1.35, legs: 0.3, hs: 1.4, gut: 1.0, col: 0x8A9A6A, col2: 0xD8C890, skin: 0x8A9A6A, hand: 0x8A9A6A, legCol: 0x8A6A4A, foot: 0x2A1E14, hooves: 1, tail: 1, tailCol: 0x8A6A4A, surf: "hide", footL: 0.12 }, function (at, s, e) { return wdcCalfHead(at, s, e, 0x8A6A4A); }, function (I) {
var H = I.H, o = [];
o.push(wdcE([0, I.hipY + 0.2 * H, -0.07 * H], [0.22 * H, 0.25 * H, 0.14 * H], 0x5A6A32, "spine", { k: 0.03 * H }));
for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2;
o.push(wdcE([Math.sin(a) * 0.11 * H, I.hipY + 0.2 * H + Math.cos(a) * 0.14 * H, -0.18 * H], [0.055 * H, 0.055 * H, 0.02 * H], 0x4A5A2A, "spine", { k: 0.01 * H }));
}
o.push(wdcE([0, I.hipY + 0.2 * H, -0.21 * H], [0.06 * H, 0.06 * H, 0.02 * H], 0x4A5A2A, "spine", { k: 0.01 * H }));
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
return wdcSoft({ h: 1.0, b: 0.7, legs: 0.4, hs: 1.3, col: 0xC83A2A, col2: 0xD85A3A, skin: 0xC83A2A, hand: 0xC83A2A, legCol: 0xB83020, foot: 0xB83020, surf: "chitin", tail: 1, tailCol: 0xB83020, limb: 0.7 }, function (at, s, e) {
var o = [wdcE(at(0, 0.05, 0.04), [0.06 * s, 0.05 * s, 0.09 * s], 0xC83A2A, "head")];
[-1, 1].forEach(function (sd) { o.push(wdcC(at(sd * 0.03, 0.08, 0.1), at(sd * 0.2, 0.4, 0.3), 0.006 * s, 0.003 * s, 0xA82A1A, "head", { k: 0.004 * s })); });
wdcEye(e, at(0.035, 0.09, 0.09), 0.012 * s, 0x0A0A0A, "r");
return o;
}, function (I) { var H = I.H; return [wdcE([I.sX + 0.03 * H, I.sY - 0.38 * H, 0.06 * H], [0.05 * H, 0.09 * H, 0.04 * H], 0xC83A2A, "L_hand", { k: 0.015 * H }), wdcE([-I.sX - 0.03 * H, I.sY - 0.38 * H, 0.06 * H], [0.05 * H, 0.09 * H, 0.04 * H], 0xC83A2A, "R_hand", { k: 0.015 * H })]; });
});
},
function (I) {
var bone = "chest", w = 0.3, b = I.bones[bone];
if (!b)
return;
var o = I.at[bone];
var t = wdwCanvas("tabard", 128, 192, function (c, W, H) { c.fillStyle = "#F4F0E8"; c.fillRect(0, 0, W, H); c.fillStyle = "#C82A2A"; [[W / 2, H * 0.3], [W * 0.28, H * 0.62], [W * 0.72, H * 0.62]].forEach(function (p) { c.beginPath(); c.moveTo(p[0], p[1] + 18); c.bezierCurveTo(p[0] - 30, p[1] - 6, p[0] - 14, p[1] - 30, p[0], p[1] - 12); c.bezierCurveTo(p[0] + 14, p[1] - 30, p[0] + 30, p[1] - 6, p[0], p[1] + 18); c.fill(); }); c.strokeStyle = "#C8A040"; c.lineWidth = 6; c.strokeRect(3, 3, W - 6, H - 6); });
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
var parts = [], c = new THREE.Color(), lite = wdwLite();
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
return parts.length ? wdwMergeC(parts) : null;
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
var G = WDW_GEO["si_" + key] || (WDW_GEO["si_" + key] = (function () { var g = wdwPartsGeo(plan); if (g)
g.userData.shared = 1; return g; })());
var grp = new THREE.Group();
if (!G)
return grp;
var m = new THREE.Mesh(G, wdwM("siMat", function () { return new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.82, metalness: 0 }); }));
m.castShadow = !wdwLite();
grp.add(m);
(plan.eyes || []).forEach(function (E) { [1, -1].forEach(function (sd) { if (sd < 0 && E.one)
return; var e = new THREE.Mesh(wdwGeo("siEye", function () { return new THREE.SphereGeometry(1, 10, 8); }), wdwShine(0x0E0A08, 0.1, 0.2)); e.scale.setScalar(E.r); e.position.set(E.at[0] * sd, E.at[1], E.at[2] + E.r * 0.35); grp.add(e); }); });
return grp;
},
function (suit, n) {
return wdwCanvas("card" + suit + n, 256, 360, function (c, W, H) {
var S = WDW_SUITS[suit] || WDW_SUITS.spades;
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
function () { return wdwCanvas("cardback", 128, 180, function (c, W, H) { c.fillStyle = "#2A3A8A"; c.fillRect(0, 0, W, H); c.strokeStyle = "#E8E0F0"; c.lineWidth = 2; for (var i = -H; i < W + H; i += 10) {
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
var k = kind.split(":"), suit = k[1] || "spades", n = +(k[2] || 5), g = new THREE.Group(), R = wRand(String(seed || kind).length * 31 + n), lite = wdwLite();
var W = 0.62, H = 0.86, body = new THREE.Group();
body.position.y = 0.62;
g.add(body);
var face = new THREE.Mesh(wdwGeo("cardPl", function () { return new THREE.PlaneGeometry(W, H); }), wdwM("cardF" + suit + n, function () { return new THREE.MeshLambertMaterial({ map: wdwCardFace(suit, n) }); }));
face.position.set(0, H / 2, 0.021);
body.add(face);
var back = new THREE.Mesh(wdwGeo("cardPl", function () { return new THREE.PlaneGeometry(W, H); }), wdwM("cardB", function () { return new THREE.MeshLambertMaterial({ map: wdwCardBack() }); }));
back.position.set(0, H / 2, -0.021);
back.rotation.y = Math.PI;
body.add(back);
wdwBox(body, W, H, 0.036, wdwLam(0xF0ECE2), 0, 0, 0);
var limb = wdwLam(0x1A1A1E), skin = wdwLam([0xF0D0B8, 0xE8C0A0, 0xD8A888][Math.floor(R() * 3)]);
var leg = function (x) { var p = new THREE.Group(); p.position.set(x, 0.62, 0); g.add(p); var l = new THREE.Mesh(wdwGeo("cardLeg", function () { var c = new THREE.CylinderGeometry(0.025, 0.022, 0.6, 6); c.translate(0, -0.3, 0); return c; }), limb); p.add(l); var f = new THREE.Mesh(wdwGeo("cardFoot", function () { var b = new THREE.BoxGeometry(0.08, 0.04, 0.15); b.translate(0, -0.6, 0.04); return b; }), limb); p.add(f); return p; };
var arm = function (x) { var p = new THREE.Group(); p.position.set(x, 0.62 + H * 0.82, 0); g.add(p); var a = new THREE.Mesh(wdwGeo("cardArm", function () { var c = new THREE.CylinderGeometry(0.022, 0.02, 0.5, 6); c.translate(0, -0.25, 0); return c; }), limb); p.add(a); var h = new THREE.Mesh(wdwGeo("cardHand", function () { var s = new THREE.SphereGeometry(0.04, 8, 6); s.translate(0, -0.52, 0); return s; }), skin); p.add(h); p.rotation.z = x > 0 ? 0.25 : -0.25; return p; };
var Ll = leg(-W * 0.32), Lr = leg(W * 0.32), Al = arm(-W / 2 - 0.02), Ar = arm(W / 2 + 0.02);
var hd = new THREE.Group();
hd.position.y = 0.62 + H + 0.02;
g.add(hd);
var neck = new THREE.Mesh(wdwGeo("cardNeck", function () { return new THREE.CylinderGeometry(0.035, 0.04, 0.06, 8); }), skin);
neck.position.y = 0.03;
hd.add(neck);
var head = new THREE.Mesh(wdwGeo("cardHead", function () { var s = new THREE.SphereGeometry(0.11, 14, 10); s.scale(1, 1.12, 1); return s; }), skin);
head.position.y = 0.15;
hd.add(head);
[-1, 1].forEach(function (sd) { var e = new THREE.Mesh(wdwGeo("cardEye", function () { return new THREE.SphereGeometry(0.014, 6, 5); }), wdwLam(0x141414)); e.position.set(sd * 0.038, 0.17, 0.098); hd.add(e); });
var nose = new THREE.Mesh(wdwGeo("cardNose", function () { return new THREE.SphereGeometry(0.018, 6, 5); }), skin);
nose.position.set(0, 0.14, 0.11);
hd.add(nose);
var hairC = [0x2A1E14, 0x5A3A1E, 0x8A6A3A, 0x141414][Math.floor(R() * 4)], hair = new THREE.Mesh(wdwGeo("cardHair", function () { var s = new THREE.SphereGeometry(0.118, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55); s.scale(1, 1.1, 1.05); return s; }), wdwLam(hairC));
hair.position.set(0, 0.17, -0.01);
hd.add(hair);
if (suit === "clubs") {
var sp = new THREE.Mesh(wdwGeo("cardPike", function () { var c = new THREE.CylinderGeometry(0.012, 0.012, 1.8, 5); c.translate(0, 0.4, 0); return c; }), wdwLam(0x5A3A1E));
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
g.add(wdwCardMan(kind, seed));
g.userData.cardIn = g.children[0];
return g;
}
try {
wdwCrxKinds();
}
catch (e) { }
var key = WDW_CRX[kind];
if (!key || typeof crxPlan !== "function" || !crxPlan(key))
return g;
var useCrx = typeof crxBuild === "function" && typeof CRX !== "undefined" && !wdwLite();
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
var stand = wdwStandInC(key);
g.add(stand);
if (useCrx) {
try {
crxWarm([key]);
}
catch (e) { }
WDW.ticks.push(function () { if (!g.parent || g.userData.done || !CRX.geo[key])
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
function () { return wdwCanvas("wdxHalo", 128, 128, function (c, W, H) { var g = c.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.18, "rgba(255,240,210,.55)"); g.addColorStop(0.5, "rgba(255,210,150,.16)"); g.addColorStop(1, "rgba(255,200,140,0)"); c.fillStyle = g; c.fillRect(0, 0, W, H); }); },
function (P, L, size) {
if (!L || !L.pos.length)
return null;
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(L.pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(L.col, 3));
var m = new THREE.PointsMaterial({ size: size || 0.7, map: wdxHaloTex(), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
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
var wax = wdwLam(o.wax || 0xF2E6CE), fl = wdwGlowM(o.flame || 0xFFC860);
wdwInst(P, wdwGeo("wdxWax", function () { var g = new THREE.CylinderGeometry(0.035, 0.04, 1, 8); g.translate(0, 0.5, 0); return g; }), wax, list.map(function (c) { return { x: c.x, y: c.y, z: c.z, sx: c.s || 1, sz: c.s || 1, sy: c.h || 0.18 }; }));
wdwInst(P, wdwGeo("wdxFlame", function () { var g = new THREE.SphereGeometry(0.03, 6, 5); g.scale(1, 2.2, 1); return g; }), fl, list.map(function (c) { return { x: c.x, y: c.y + (c.h || 0.18) + 0.05, z: c.z }; }));
list.forEach(function (c) { wdxGlow(L, c.x, c.y + (c.h || 0.18) + 0.06, c.z, o.halo || 0xFFB860, o.hs || 0.55); });
},
function (P, x, y, z, ry, L, cl) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var b = wdxBrass();
var bp = new THREE.Mesh(wdwGeo("wdxBP", function () { var s = new THREE.SphereGeometry(0.16, 10, 8); s.scale(1, 1.6, 0.25); return s; }), b);
bp.position.z = 0.03;
g.add(bp);
var arm = new THREE.Mesh(wdwGeo("wdxArm", function () { return new THREE.TorusGeometry(0.18, 0.018, 6, 16, Math.PI); }), b);
arm.rotation.set(0, Math.PI / 2, Math.PI / 2);
arm.position.set(0, -0.02, 0.2);
g.add(arm);
var cups = [];
[-0.16, 0.16].forEach(function (dx) { var cu = new THREE.Mesh(wdwGeo("wdxCup", function () { return new THREE.CylinderGeometry(0.06, 0.03, 0.05, 10); }), b); cu.position.set(dx, 0.12, 0.24); g.add(cu); cups.push(new THREE.Vector3(dx, 0.15, 0.24)); });
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
var b = wdxBrass(), lite = wdwLite(), cry = wdwShine(0xF4F8FF, 0.05, 0.2);
if (ceil != null) {
var ch = new THREE.Mesh(wdwGeo("wdxChain", function () { return new THREE.CylinderGeometry(0.02, 0.02, 1, 5); }), b);
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
var a2 = i / 4 * Math.PI * 2, sp = new THREE.Mesh(wdwGeo("wdxSpoke", function () { return new THREE.CylinderGeometry(0.015, 0.015, 1, 4); }), b);
sp.scale.y = rr;
sp.rotation.z = Math.PI / 2;
sp.rotation.y = -a2;
sp.position.set(Math.cos(a2) * rr / 2, yy, Math.sin(a2) * rr / 2);
g.add(sp);
}
}
var bowl = new THREE.Mesh(wdwGeo("wdxBowl", function () { var s = new THREE.SphereGeometry(0.3, 14, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); return s; }), b);
bowl.position.y = -(tiers - 1) * 0.55 - 0.1;
g.add(bowl);
var fin = new THREE.Mesh(wdwGeo("wdxFinial", function () { return new THREE.OctahedronGeometry(0.12, 0); }), cry);
fin.scale.y = 2;
fin.position.y = bowl.position.y - 0.45;
g.add(fin);
wdwInst(g, wdwGeo("wdxDrop", function () { var o = new THREE.OctahedronGeometry(0.05, 0); o.scale(1, 2, 1); return o; }), cry, drops);
wdxGlow(L, x, y - 0.4, z, 0xFFD8A0, r * 2.6);
if (own)
wdxCandles(P, cl, null, {});
return g;
},
function (w, h, folds, depth) {
var k = "wdxDr" + w.toFixed(1) + "|" + h.toFixed(1) + "|" + folds + "|" + depth;
return wdwGeo(k, function () {
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
var m = new THREE.Mesh(wdxDrapeGeo(w, h, Math.max(2, Math.round(w * (o.fold || 1.6))), o.depth || 0.12), mat);
m.position.set(x, y, z);
m.rotation.y = ry || 0;
P.add(m);
if (o.fringe) {
var f = new THREE.Mesh(wdwBoxG(w, 0.12, 0.06), wdxGilt());
f.position.set(0, -h - 0.04, 0.02);
m.add(f);
}
if (o.tie) {
var t = new THREE.Mesh(wdwBoxG(Math.min(0.5, w * 0.5), 0.07, 0.34), wdxGilt());
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
var t = new THREE.Mesh(new THREE.TorusGeometry(w / 2, 0.03, 4, 24, Math.PI), wdxGilt());
t.rotation.copy(g.rotation);
t.scale.set(1, (drop + 0.16) * 2 / w, 0.6);
t.position.set(x, y, z);
P.add(t);
return g;
},
function (tint) {
var key = "wdxMirG" + (tint || "warm");
return wdwM(key, function () {
var t = wdwCanvas(key + "T", 128, 256, function (c, W, H) {
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
var gi = wdxGilt();
var gl = new THREE.Mesh(wdwGeo(o.oval ? "wdxMirOv" : "wdxMirRe", function () { return o.oval ? new THREE.CircleGeometry(0.5, 32) : new THREE.PlaneGeometry(1, 1); }), wdxMirrorGlassM(o.tint));
gl.scale.set(w, h, 1);
gl.position.set(0, h / 2, 0.04);
g.add(gl);
if (o.oval) {
var fr = new THREE.Mesh(wdwGeo("wdxMirOvF", function () { return new THREE.TorusGeometry(0.5, 0.05, 8, 40); }), gi);
fr.scale.set(w, h, 1);
fr.position.set(0, h / 2, 0.05);
g.add(fr);
}
else {
[[0, h, w + 0.24, 0.16], [0, -0.04, w + 0.24, 0.14]].forEach(function (b) { wdwBox(g, b[2], b[3], 0.1, gi, b[0], b[1] - b[3] / 2, 0.04); });
[-1, 1].forEach(function (s) { wdwBox(g, 0.12, h, 0.1, gi, s * (w / 2 + 0.06), 0, 0.04); });
var cr = new THREE.Mesh(wdwGeo("wdxCrest", function () { return new THREE.TorusKnotGeometry(0.14, 0.035, 40, 6, 2, 3); }), gi);
cr.position.set(0, h + 0.22, 0.06);
cr.scale.set(1.4, 0.8, 0.4);
g.add(cr);
}
return g;
},
function (P, w, d, H, o) {
o = o || {};
var wood = o.wood || wdwS("b:oak", 0x3A1E10, 1.4), gi = o.trim || wdxGilt(), h0 = o.h0 || 1.2, step = o.step || 4, skip = o.skip || [];
function inGap(side, u) { return skip.some(function (s) { return s[0] === side && Math.abs(u - s[1]) < (s[2] || 1.2); }); }
[["n", -d / 2, 1], ["s", d / 2, -1]].forEach(function (S) {
for (var u = -w / 2 + 0.5; u < w / 2 - 0.4; u += 1) {
if (inGap(S[0], u + 0.5))
continue;
wdwBox(P, 1, h0, 0.08, wood, u + 0.5, 0, S[1] + S[2] * 0.04);
}
wdwBox(P, w, 0.08, 0.12, gi, 0, h0, S[1] + S[2] * 0.06);
wdwBox(P, w, 0.3, 0.24, gi, 0, H - 0.3, S[1] + S[2] * 0.12);
for (u = -w / 2 + step / 2; u < w / 2; u += step) {
if (inGap(S[0], u))
continue;
wdwBox(P, 0.36, H - h0 - 0.3, 0.16, gi, u, h0 + 0.08, S[1] + S[2] * 0.08);
}
});
[["w", -w / 2, 1], ["e", w / 2, -1]].forEach(function (S) {
for (var u = -d / 2 + 0.5; u < d / 2 - 0.4; u += 1) {
if (inGap(S[0], u + 0.5))
continue;
wdwBox(P, 0.08, h0, 1, wood, S[1] + S[2] * 0.04, 0, u + 0.5);
}
wdwBox(P, 0.12, 0.08, d, gi, S[1] + S[2] * 0.06, h0, 0);
wdwBox(P, 0.24, 0.3, d, gi, S[1] + S[2] * 0.12, H - 0.3, 0);
for (u = -d / 2 + step / 2; u < d / 2; u += step) {
if (inGap(S[0], u))
continue;
wdwBox(P, 0.16, H - h0 - 0.3, 0.36, gi, S[1] + S[2] * 0.08, h0 + 0.08, u);
}
});
},
function (P, x, y, z, len, r0, r1, col, op, tx, ty, tz) {
var q = Math.max(0.02, Math.min(1, r0 / r1)).toFixed(2);
var m = new THREE.Mesh(wdwGeo("wdxShaft" + q, function () { var g = new THREE.CylinderGeometry(+q, 1, 1, 24, 1, true); g.translate(0, -0.5, 0); return g; }), wdwM("wdxShaftM" + col + "|" + op, function () {
var t = wdwCanvas("wdxShaftT", 16, 128, function (c, W, H) { var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "rgba(255,255,255,.95)"); g.addColorStop(1, "rgba(255,255,255,0)"); c.fillStyle = g; c.fillRect(0, 0, W, H); });
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
var m = new THREE.Mesh(new THREE.CircleGeometry(r, 32), wdwM("wdxPool" + col + "|" + op, function () { var mm = new THREE.MeshBasicMaterial({ color: col, map: wdxHaloTex(), transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending }); mm.userData.noPhoto = 1; return mm; }));
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
var c = new THREE.Mesh(wdwGeo("wdxCloth" + r, function () { var pts = [new THREE.Vector2(0, 0.78), new THREE.Vector2(r, 0.78), new THREE.Vector2(r + 0.04, 0.74), new THREE.Vector2(r + 0.12, 0.4), new THREE.Vector2(r + 0.2, 0.02), new THREE.Vector2(r + 0.21, 0)]; var gg = new THREE.LatheGeometry(pts, 28); return gg; }), cloth);
g.add(c);
wdxLamp(g, 0, 0.78, 0, null);
wdxGlow(L, x, 0.98, z, 0xFFB050, 0.9);
if (o.wine !== false)
[[0.3, 0.2], [-0.28, -0.18]].forEach(function (p) { var w = new THREE.Mesh(wdwGeo("wdxGlass", function () { return new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(0.04, 0), new THREE.Vector2(0.006, 0.01), new THREE.Vector2(0.006, 0.09), new THREE.Vector2(0.045, 0.13), new THREE.Vector2(0.05, 0.2)], 10); }), wqiIce(0x8A1A24, { op: 0.75 })); w.position.set(p[0], 0.78, p[1]); g.add(w); });
return g;
},
function (P, x, y, z, L, col) {
wdwCyl(P, 0.05, 0.05, 0.18, wdxBrass(), x, y, z, 8);
var sh = new THREE.Mesh(wdwGeo("wdxShade", function () { return new THREE.CylinderGeometry(0.07, 0.14, 0.14, 12, 1, true); }), wdwM("wdxShadeM" + (col || ""), function () { var m = new THREE.MeshBasicMaterial({ color: col || 0xFFB050, side: THREE.DoubleSide, transparent: true, opacity: 0.95 }); m.userData.noPhoto = 1; return m; }));
sh.position.set(x, y + 0.24, z);
P.add(sh);
if (L)
wdxGlow(L, x, y + 0.22, z, col || 0xFFB050, 1.0);
return sh;
},
function (P, cx, cy, cz, rx, ry, rz, n, seed, cols) {
var R = wRand(seed || 77);
(cols || [0xB8281A, 0xE0A030, 0xC8601A]).forEach(function (col, ci) {
var list = [];
for (var i = 0; i < Math.round(n / 3); i++)
list.push({ x: cx + (R() - 0.5) * rx * 2, y: cy + R() * ry, z: cz + (R() - 0.5) * rz * 2, rx: R() * 6, ry: R() * 6, rz: R() * 6, s: 0.7 + R() * 0.6 });
wdwInst(P, wdwGeo("wdxLeaf", function () { var s = new THREE.Shape(); s.moveTo(0, -0.08); s.quadraticCurveTo(0.07, 0, 0, 0.09); s.quadraticCurveTo(-0.07, 0, 0, -0.08); return new THREE.ShapeGeometry(s); }), wdwLam(col, { ds: 1, e: ci === 1 ? 0x3A2008 : 0x200804 }), list);
});
},
function (kind) {
return wdwGeo("wdxT_" + kind, function () {
var R = wRand(kind.length * 131 + 7), parts = [], lite = wdwLite();
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
return wdwGeo("wdxC_" + kind + (wdwLite() ? "L" : ""), function () {
var R = wRand(kind.length * 977 + 3), parts = [], lite = wdwLite();
var n = kind === "oak" ? (lite ? 24 : 96) : kind === "birch" ? (lite ? 14 : 54) : kind === "pine" ? (lite ? 12 : 40) : (lite ? 22 : 86), cx = kind === "oak" ? 5.4 : kind === "birch" ? 2.4 : kind === "pine" ? 2.6 : 3.8, cy = kind === "oak" ? 3.4 : kind === "birch" ? 4 : kind === "pine" ? 7 : 4.2, y0 = kind === "oak" ? 9.4 : kind === "birch" ? 11 : kind === "pine" ? 9 : 10.4;
for (var i = 0; i < n; i++) {
var u = R() * Math.PI * 2, v = Math.acos(2 * R() - 1), rr = 0.55 + R() * 0.45, x = Math.sin(v) * Math.cos(u) * cx * rr, y = Math.cos(v) * cy * rr, z = Math.sin(v) * Math.sin(u) * cx * rr;
if (kind === "pine") {
var t = (y / cy + 1) / 2;
x *= 1 - t;
z *= 1 - t;
}
var s = (kind === "oak" ? 2.7 : kind === "birch" ? 1.8 : 2.3) * (0.75 + R() * 0.5), c = wdwCards(2, s, s, -s / 2, 0);
c.rotateX((R() - 0.5) * 1.2);
c.rotateZ((R() - 0.5) * 1.2);
c.rotateY(R() * 3);
c.translate(x, y0 + y, z);
parts.push(c);
}
if (kind !== "pine") {
var ns = Math.round(n * 0.4);
for (i = 0; i < ns; i++) {
var a2 = R() * Math.PI * 2, rr2 = cx * (0.55 + R() * 0.5), yy = y0 - cy * (0.5 + R() * 0.55), s2 = (kind === "oak" ? 2.4 : kind === "birch" ? 1.6 : 2.1) * (0.75 + R() * 0.5), c2 = wdwCards(2, s2, s2, -s2 / 2, 0);
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
var lite = wdwLite();
if (lite && list.length > 80)
list = list.filter(function (t, i) { return i % 2 === 0; });
var bark = kind === "birch" ? wdwS("b:limestone", 0xE8E4DC, 1.2) : wdwMat("bark");
wdwInst(P, wdxTreeGeo(kind), bark, list, { shadow: !lite });
(cols || [0x3A6A2A]).forEach(function (col, k) { var sub = list.filter(function (t, i) { return i % cols.length === k; }); if (sub.length)
wdwInst(P, wdxCrownGeo(kind), wdxLeafM(col), sub, {}); });
if (!o.noSolid)
list.forEach(function (t) { wdwRound(t.x, t.z, 0.6 * (t.s || 1), (t.y || 0) - 1, (t.y || 0) + 6); });
},
function (kind) {
return wdwCanvas("wdxSG" + kind, 128, 320, function (c, W, H) {
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
var ir = wdwShine(0x1A1A1A, 0.6, 0.6);
wdwCyl(P, 0.06, 0.09, h, ir, x, y, z, 8);
wdwBox(P, 0.34, 0.06, 0.34, ir, x, y + h, z);
var gl = new THREE.Mesh(wdwBoxG(0.26, 0.36, 0.26), wdwGlowM(0xFFC070, 0.92));
gl.position.set(x, y + h + 0.24, z);
P.add(gl);
var cap = new THREE.Mesh(wdwGeo("lanCap", function () { return new THREE.ConeGeometry(0.26, 0.22, 4); }), ir);
cap.rotation.y = Math.PI / 4;
cap.position.set(x, y + h + 0.53, z);
P.add(cap);
wdxGlow(L, x, y + h + 0.24, z, 0xFFB060, 2.2);
},
function () {
return wdwGeo("wdxWillow", function () {
var R = wRand(41), parts = [], lite = wdwLite();
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
return wdwGeo("wdxWillowF" + (wdwLite() ? "L" : ""), function () {
var R = wRand(43), parts = [], n = wdwLite() ? 26 : 64;
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
return wdwCanvas("wdxWillowT", 64, 256, function (c, W, H) {
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
wdwInst(P, wdxWillowGeo(), wdwMat("bark"), list, { shadow: !wdwLite() });
wdwInst(P, wdxWillowFall(), wdwM("wdxWillowM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xC8D890, map: wdxWillowTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
list.forEach(function (t) { wdwRound(t.x, t.z, 0.7 * (t.s || 1), (t.y || 0) - 1, (t.y || 0) + 5); });
},
function (P, pts, hfn, o) {
o = o || {};
var list = [], fl = [], R = wRand(o.seed || 7), step = wdwLite() ? 2.6 : 1.5;
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
wdwPlant(P, "bush", list, { col: o.col || 0x3E6A2E, keepAll: 1 });
if (!o.bare)
wdwPlant(P, "flowers", fl, { col: o.flower || "#F4F2EA", keepAll: 1 });
for (i = 0; i < pts.length - 1; i++) {
var A = pts[i], B = pts[i + 1], cx = (A[0] + B[0]) / 2, cz = (A[1] + B[1]) / 2, LL = Math.hypot(B[0] - A[0], B[1] - A[1]);
if (!o.gap)
wdwSolid(cx, cz, LL, 2.2, hfn(cx, cz) - 1, hfn(cx, cz) + 3, Math.atan2(B[1] - A[1], B[0] - A[0]) * -1);
}
return list;
},
function (P, x0, z0, x1, z1, hfn, ok, seed, o) {
o = o || {};
var lite = wdwLite(), k = lite ? 0.35 : 1, d = o.dens || 1;
wdwPlant(P, "grass", wdwScatter(seed, Math.round(2600 * k * d), x0, z0, x1, z1, ok, hfn, 0.5, 1.0), { col: o.grass || 0xFFFFFF, keepAll: 1 });
wdwPlant(P, "flowers", wdwScatter(seed + 1, Math.round(900 * k * d), x0, z0, x1, z1, ok, hfn, 0.4, 0.7), { col: "#F8F6EE", keepAll: 1 });
wdwPlant(P, "flowers", wdwScatter(seed + 2, Math.round(700 * k * d), x0, z0, x1, z1, ok, hfn, 0.5, 0.8), { col: "#F4D020", keepAll: 1 });
wdwPlant(P, "flowers", wdwScatter(seed + 3, Math.round(300 * k * d), x0, z0, x1, z1, ok, hfn, 0.4, 0.6), { col: "#D88AB0", keepAll: 1 });
if (o.poppies !== false)
wdwPlant(P, "flowers", wdwScatter(seed + 4, Math.round(160 * k * d), x0, z0, x1, z1, ok, hfn, 0.6, 0.9), { col: "#D8281A", keepAll: 1 });
},
function (col, paint) {
return wdwCanvas("wdxRose" + col + (paint || ""), 128, 128, function (c, W, H) {
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
wdwCyl(g, 0.06 * s, 0.09 * s, 1.0 * s, wdwMat("bark"), 0, 0, 0, 6);
var leaf = wdwM("wdxRoseLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x3E6A2E, map: wdwLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; });
var ball = new THREE.Mesh(wdwGeo("wdxRoseBall", function () { var parts = [], R = wRand(3); for (var i = 0; i < 5; i++) {
var c = new THREE.IcosahedronGeometry(0.55 + R() * 0.2, 1);
c.translate((R() - 0.5) * 0.7, (R() - 0.5) * 0.5, (R() - 0.5) * 0.7);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), leaf);
ball.position.y = 1.5 * s;
ball.scale.setScalar(s);
g.add(ball);
var fl = new THREE.Mesh(wdwGeo("wdxRoseFl", function () { var parts = [], R = wRand(5); for (var i = 0; i < 6; i++) {
var c = new THREE.IcosahedronGeometry(0.68 + R() * 0.15, 1);
c.translate((R() - 0.5) * 0.5, (R() - 0.5) * 0.4, (R() - 0.5) * 0.5);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), wdwM("wdxRoseM" + (o.col || "w") + (o.paint || ""), function () { var t = wdxRoseTex(o.col || "#F6F4EE", o.paint); var m = new THREE.MeshLambertMaterial({ map: t, alphaTest: 0.5, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
fl.position.y = 1.5 * s;
fl.scale.setScalar(s);
g.add(fl);
g.userData.roses = fl;
wdwRound(x, z, 0.6 * s, y - 1, y + 2.5 * s);
return g;
},
function (P, x, z, y, s, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = o.ry || 0;
P.add(g);
var lite = wdwLite();
var stem = new THREE.Mesh(wdwGeo("wdxStem" + (lite ? "L" : ""), function () { var pts = []; for (var i = 0; i <= 8; i++) {
var t = i / 8;
pts.push(new THREE.Vector2(0.12 + 0.05 * Math.sin(t * 3.1) + (t < 0.12 ? 0.06 * (1 - t / 0.12) : 0), t * 0.9));
} return new THREE.LatheGeometry(pts, lite ? 8 : 14); }), wdwLam(o.stem || 0xF0E8D8));
stem.scale.setScalar(s);
g.add(stem);
var cap = new THREE.Mesh(wdwGeo("wdxCap" + (lite ? "L" : ""), function () { var pts = []; for (var i = 0; i <= 10; i++) {
var a = i / 10 * Math.PI / 2;
pts.push(new THREE.Vector2(Math.cos(a) * 0.55 + 0.001, Math.sin(a) * 0.32));
} pts.unshift(new THREE.Vector2(0.001, -0.02)); pts.splice(1, 0, new THREE.Vector2(0.5, -0.04)); return new THREE.LatheGeometry(pts.reverse(), lite ? 12 : 24); }), o.capM || wdwM("wdxCapM" + (o.cap || 0xC83A2A) + (o.spots ? "s" : ""), function () {
var t = wdwCanvas("wdxCapT" + (o.cap || 0xC83A2A) + (o.spots ? "s" : ""), 128, 64, function (c, W, H) {
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
var gill = new THREE.Mesh(wdwGeo("wdxGill", function () { var c = new THREE.CircleGeometry(0.52, 24); c.rotateX(Math.PI / 2); return c; }), wdwLam(o.gill || 0xD8C8A8));
gill.position.y = 0.85 * s;
gill.scale.setScalar(s);
g.add(gill);
if (s > 1.6 && !o.noSolid) {
wdwRound(x, z, 0.16 * s, y - 1, y + 0.8 * s);
if (o.top)
wdwFloor(x, z, 0.7 * s, 0.7 * s, y + 1.16 * s, { r: 0.5 * s });
}
return g;
},
function (P, x, z, y, s, col) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
wdwCyl(g, 0.012 * s, 0.02 * s, 1.4 * s, wdwLam(0x4A7A30), 0, 0, 0, 5);
var bell = wdwLam(col || 0xC860A8);
for (var i = 0; i < 9; i++) {
var b = wdwCyl(g, 0.035 * s, 0.06 * s, 0.1 * s, bell, Math.sin(i * 2.4) * 0.05 * s, 0.7 * s + i * 0.07 * s, Math.cos(i * 2.4) * 0.05 * s, 6);
b.rotation.z = 0.5 * Math.sin(i * 2.4);
b.rotation.x = 0.5 * Math.cos(i * 2.4);
}
for (i = 0; i < 5; i++) {
var l = new THREE.Mesh(wdwGeo("wdxFgLeaf", function () { var p = new THREE.PlaneGeometry(0.12, 0.4); p.translate(0, 0.2, 0); p.rotateX(-1.0); return p; }), wdwLam(0x3E6A2E, { ds: 1 }));
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
var gr = wdwLam(0x5A7A4A), pu = wdwLam(0x8A4AA8);
wdwCyl(g, 0.03 * s, 0.05 * s, 1.2 * s, gr, 0, 0, 0, 6);
for (var i = 0; i < 3; i++) {
var a = i * 2.1, br = new THREE.Group();
br.position.y = 0.8 * s;
br.rotation.set(0.5 * Math.cos(a), 0, 0.5 * Math.sin(a));
g.add(br);
wdwCyl(br, 0.02 * s, 0.025 * s, 0.5 * s, gr, 0, 0, 0, 5);
var hd = new THREE.Mesh(wdwGeo("wdxThHead", function () { return new THREE.SphereGeometry(0.08, 8, 6); }), gr);
hd.position.y = 0.55 * s;
hd.scale.setScalar(s);
br.add(hd);
var tf = wdwCyl(br, 0.05 * s, 0.08 * s, 0.12 * s, pu, 0, 0.6 * s, 0, 8);
}
for (i = 0; i < 6; i++) {
var l = new THREE.Mesh(wdwGeo("wdxThLeaf", function () { var sh = new THREE.Shape(); sh.moveTo(0, 0); for (var k = 0; k <= 8; k++) {
var t = k / 8;
sh.lineTo((k % 2 ? 0.12 : 0.06) * (1 - t), t * 0.6);
} for (k = 8; k >= 0; k--) {
var t2 = k / 8;
sh.lineTo(-(k % 2 ? 0.12 : 0.06) * (1 - t2), t2 * 0.6);
} var gg = new THREE.ShapeGeometry(sh); gg.rotateX(-1.1); return gg; }), wdwLam(0x5A7A4A, { ds: 1 }));
l.rotation.y = i * 1.05;
l.position.y = 0.1 * s;
l.scale.setScalar(s);
g.add(l);
}
return g;
},
function () {
if (typeof CRX_PLANS === "undefined" || CRX_PLANS.wd_sheep || typeof crxQuad !== "function")
return;
CRX_PLANS.wd_sheep = function () { return crxQuad({ L: 0.55, H: 0.36, G: 0.3, W: 1.25, legR: 0.035, head: "horse", hs: 0.42, col: 0xE8E2D2, belly: 0xD8D0C0, muzzle: 0x2A2420, headCol: 0x2A2420, tail: { l: 0.12, r: 0.05, up: -0.8 }, neck: { l: 0.14, up: 0.5 }, surf: "fur", foot: "hoof", footCol: 0x1A1614, eyeCol: 0x3A2A10 }); };
WDW_CRX.sheep = "wd_sheep";
CRX_PLANS.wd_cow = function () { return crxQuad({ L: 1.2, H: 0.72, G: 0.38, W: 1.1, legR: 0.065, head: "bull", hs: 1.05, col: 0x8A5A3A, belly: 0xF0ECE4, muzzle: 0xD8B8A8, spots: 0xF4F0E8, tail: { l: 0.8, r: 0.03, up: -1.2 }, neck: { l: 0.3, up: 0.3 }, surf: "hide", foot: "hoof", footCol: 0x1A1614, eyeCol: 0x2A1A0A }); };
WDW_CRX.cow = "wd_cow";
},
function (P, x0, x1, z, y, o) {
o = o || {};
var R = wRand(o.seed || 3), china = wdwShine(0xF6F4EE, 0.25, 0), blue = wdwShine(0x3A5AA8, 0.3, 0), gilt = wdwShine(0xD8B048, 0.3, 0.8), tea = wdwShine(0x6A3A1A, 0.1, 0), bread = wdwLam(0xE8D0A0), butter = wdwLam(0xF4E08A);
for (var x = x0; x <= x1; x += o.gap || 0.7) {
[-1, 1].forEach(function (sd) {
var zz = z + sd * (o.w || 0.45) * 0.7, cx = x + (R() - 0.5) * 0.2;
if (R() < (o.messy ? 0.3 : 0.1))
return;
var sau = wdwCyl(P, 0.07, 0.06, 0.012, china, cx, y, zz, 14);
var cup = wdwCyl(P, 0.045, 0.035, 0.06, R() < 0.5 ? china : blue, cx, y + 0.012, zz, 12);
if (!o.empty && R() < 0.5)
wdwCyl(P, 0.04, 0.04, 0.004, tea, cx, y + 0.06, zz, 12);
if (R() < 0.5) {
var h = new THREE.Mesh(wdwGeo("wdxHandle", function () { return new THREE.TorusGeometry(0.018, 0.004, 5, 10); }), china);
h.position.set(cx + 0.05, y + 0.04, zz);
P.add(h);
}
if (o.messy && R() < 0.25) {
var tip = wdwCyl(P, 0.045, 0.035, 0.06, china, cx + 0.12, y + 0.03, zz, 12);
tip.rotation.z = 1.5;
}
});
if (R() < 0.35) {
var pot = new THREE.Mesh(wdwGeo("wdxPot", function () { var s = new THREE.SphereGeometry(0.1, 14, 10); s.scale(1, 0.85, 1); return s; }), R() < 0.5 ? china : blue);
pot.position.set(x, y + 0.09, z);
P.add(pot);
wdwCyl(P, 0.03, 0.02, 0.04, china, x, y + 0.16, z, 8);
var sp = wdwCyl(P, 0.012, 0.02, 0.12, china, x + 0.11, y + 0.07, z, 6);
sp.rotation.z = -0.9;
}
else if (R() < 0.45) {
wdwCyl(P, 0.13, 0.11, 0.012, china, x, y, z, 16);
for (var b = 0; b < 4; b++) {
wdwBox(P, 0.07, 0.012, 0.05, bread, x + (b % 2 - 0.5) * 0.08, y + 0.012 + Math.floor(b / 2) * 0.012, z + (b % 2 ? 0.02 : -0.02));
}
wdwBox(P, 0.05, 0.02, 0.03, butter, x + 0.06, y + 0.012, z + 0.05);
}
else if (R() < 0.3) {
wdwCyl(P, 0.035, 0.045, 0.1, china, x, y, z, 10);
wdwCyl(P, 0.05, 0.05, 0.008, gilt, x, y + 0.1, z, 10);
}
}
},
function (key, sec, grin) {
var C = WDB.cast && WDB.cast[key];
if (!C || !C.g)
return;
var g = C.g, mats = [], t = 0;
g.traverse(function (m) { if (!m.material)
return; var arr = Array.isArray(m.material) ? m.material : [m.material], out = arr.map(function (q) { var c = q.clone(); c.transparent = true; mats.push({ m: c, y: m.getWorldPosition ? 0 : 0 }); return c; }); m.material = Array.isArray(m.material) ? out : out[0]; });
var bb = new THREE.Box3().setFromObject(g), hy = bb.max.y - (bb.max.y - bb.min.y) * 0.2, fx = Math.sin(g.rotation.y), fz = Math.cos(g.rotation.y), len = (bb.max.x - bb.min.x + bb.max.z - bb.min.z) * 0.3;
if (grin)
wdwGrin(g.position.x + fx * len, hy, g.position.z + fz * len, g.rotation.y, sec + 4, (g.scale.x || 1));
WDW.ticks.push(function (dt) { if (t > sec + 0.1)
return; t += dt; var a = Math.max(0, 1 - t / sec); mats.forEach(function (q) { q.m.opacity = a; }); if (a <= 0)
g.visible = false; });
},
function (x, y, z, ry, sec, s) {
if (!WDW.scG)
return;
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.scale.setScalar((s || 1) * 1.2);
WDW.scG.add(g);
var mouth = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.022, 8, 24, Math.PI), new THREE.MeshBasicMaterial({ color: 0x3A1A22, transparent: true }));
mouth.rotation.z = Math.PI;
g.add(mouth);
var tm = new THREE.MeshBasicMaterial({ color: 0xF8F4E8, transparent: true }), mats = [mouth.material, tm];
for (var i = 0; i < 13; i++) {
var a = Math.PI + i / 12 * Math.PI, th = new THREE.Mesh(new THREE.BoxGeometry(0.013, 0.026, 0.01), tm);
th.position.set(Math.cos(a) * 0.1, Math.sin(a) * 0.1 + 0.005, 0.012);
th.rotation.z = a + Math.PI / 2;
g.add(th);
}
var t = 0;
WDW.ticks.push(function (dt) { if (!g.parent)
return; t += dt; g.position.y = y + Math.sin(t * 1.3) * 0.01; var a = t < sec - 2 ? 1 : Math.max(0, (sec - t) / 2); mats.forEach(function (m) { m.opacity = a; }); if (t > sec)
g.parent.remove(g); });
},
function (x, z) {
var T = WDW.terr || [], best = null, ba = 1e18;
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
var c = wdlCol(x, z);
if (!c || !c.mead || !(c.g > c.r * 1.08 && c.g > c.b * 1.35))
return null;
var S = WDW.strips || [];
for (var i = 0; i < S.length; i++) {
var s = S[i];
if (x < s.x0 || x > s.x1 || z < s.z0 || z > s.z1)
continue;
if (wdwPathD(x, z, s.pts) < s.w / 2 + 0.3)
return null;
}
var N = WDW.noTurf || [];
for (i = 0; i < N.length; i++) {
var o = N[i];
if (o.r !== undefined ? Math.hypot(x - o.x, z - o.z) < o.r : (x > o.x0 && x < o.x1 && z > o.z0 && z < o.z1))
return null;
}
var Wt = WDW.water || [];
for (i = 0; i < Wt.length; i++) {
var m = Wt[i], p = m.geometry && m.geometry.parameters;
if (!p || !p.width)
continue;
var hw = p.width * m.scale.x / 2, hd = p.height * m.scale.y / 2;
if (Math.abs(x - m.position.x) < hw && Math.abs(z - m.position.z) < hd && y < m.position.y + 0.08)
return null;
}
if (wdwSolidAt(x, z, y))
return null;
return c;
},
function (key, w, h, fill, fn) {
if (WDW.tex[key])
return WDW.tex[key];
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
return (WDW.tex[key] = t);
},
function () {
return wdlCardTex("wdlTuftD", 256, 128, 0x9CBC6A, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = wRand(29);
for (var i = 0; i < 120; i++) {
var px = 6 + R() * (W - 12), h = H * (0.3 + R() * 0.66), lean = (R() - 0.5) * 18, wd = 0.8 + R() * 1.2, v = R();
var g = x.createLinearGradient(0, H, 0, H - h);
g.addColorStop(0, "rgba(" + (120 + v * 20 | 0) + "," + (150 + v * 30 | 0) + "," + (80 + v * 10 | 0) + ",1)");
g.addColorStop(0.55, "rgba(" + (150 + v * 40 | 0) + "," + (190 + v * 40 | 0) + "," + (110 + v * 30 | 0) + ",1)");
g.addColorStop(1, "rgba(" + (200 + v * 40 | 0) + "," + (226 + v * 28 | 0) + "," + (150 + v * 40 | 0) + ",1)");
x.fillStyle = g;
x.beginPath();
x.moveTo(px - wd, H);
x.quadraticCurveTo(px - wd * 0.4 + lean * 0.3, H - h * 0.6, px + lean, H - h);
x.quadraticCurveTo(px + wd * 0.4 + lean * 0.3, H - h * 0.6, px + wd, H);
x.closePath();
x.fill();
}
});
},
function () {
return wdlCardTex("wdlFlwD", 256, 64, 0x4E7A34, function (x, W, H) {
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
return wdwGeo("wdlTuft" + h + (flw ? "f" + kind : ""), function () {
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
var C = WDL_CFG[k];
if (!C || !WDW.scG)
return;
var lite = wdwLite(), cell = lite ? 0.7 : 0.34, half = lite ? 13 : 36, Rr = half * cell, N = half * 2, tot = N * N;
var gm = wdwM("wdlTuftM", function () { var m = new THREE.MeshLambertMaterial({ map: wdlTuftTex(), alphaTest: 0.42 }); m.userData.noPhoto = 1; return m; });
var fm = wdwM("wdlFlwM", function () { var m = new THREE.MeshLambertMaterial({ map: wdlFlowerTex(), alphaTest: 0.4 }); m.userData.noPhoto = 1; return m; });
var g = new THREE.InstancedMesh(wdlTuftGeo(C.h, 0), gm, tot), nf = Math.max(4, Math.round(tot * C.fl / 4) + 4), F = [0, 1, 2, 3].map(function (kd) { return new THREE.InstancedMesh(wdlTuftGeo(C.h * 0.75, 1, kd), fm, nf); });
var c0 = new THREE.Color(1, 1, 1);
g.setColorAt(0, c0);
if (g.instanceColor && g.instanceColor.count < tot) {
g.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(tot * 3), 3);
}
[g].concat(F).forEach(function (m) { m.frustumCulled = false; m.count = 0; m.userData.keep = 1; m.renderOrder = 1; WDW.scG.add(m); });
var KW = C.kinds || [0.4, 0.3, 0.2, 0.1];
var st = { cx: 1e9, cz: 1e9 }, d = new THREE.Object3D(), col = new THREE.Color();
function lay(L) {
var bx = Math.floor(L.x / cell), bz = Math.floor(L.z / cell), ng = 0, nk = [0, 0, 0, 0];
for (var j = 0; j < N; j++)
for (var i = 0; i < N; i++) {
var gx = bx + i - half, gz = bz + j - half, h1 = wdwHash(gx * 1.37, gz * 0.91), h2 = wdwHash(gz * 2.11 + 7, gx * 1.73);
var x = (gx + h1) * cell, z = (gz + h2) * cell, dd = Math.hypot(x - L.x, z - L.z);
if (dd > Rr)
continue;
var y = WDW.hgt ? WDW.hgt(x, z) : 0, c = wdlTurf(x, z, y);
if (!c)
continue;
var fade = wdwSmooth(Rr, Rr * 0.62, dd), s = (0.7 + h1 * 0.6) * fade;
if (s < 0.05)
continue;
var isF = h2 > 1 - C.fl, kd = 0, hk = wdwHash(gx * 0.37 + 3, gz * 0.53), acc = 0;
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
WDW.ticks.push(function (dt, L) { var inR = WDW.inRm; g.visible = !inR; F.forEach(function (m) { m.visible = !inR; }); if (inR)
return; if (Math.hypot(L.x - st.cx, L.z - st.cz) < (lite ? 2.2 : 1.4))
return; st.cx = L.x; st.cz = L.z; lay(L); });
WDL.g = g;
WDL.F = F;
},
function (x, z) {
var d = z - wdwRiverZ(x), ad = Math.abs(d), n = wdwFbm(x * 0.012, z * 0.012, 3);
if (ad < 13)
return -2.4 + ad * 0.06 + n * 0.2;
var bank = -1.6 + wdwSmooth(13, 24, ad) * 1.9;
if (d > 0)
return bank + n * 1.2 * wdwSmooth(24, 60, ad) + Math.max(0, z - 62) * 0.035 + wdwFbm(x * 0.004 + 3, z * 0.004, 2) * 5 * wdwSmooth(70, 300, z);
return bank + n * 1.4 * wdwSmooth(24, 60, ad) + wdwFbm(x * 0.004 + 9, z * 0.004, 2) * 6 * wdwSmooth(40, 260, -d);
},
function (G) {
var H = wdwBankH, lite = wdwLite(), st = WDW.st || {}, R = wRand(101);
WDW_BK.boat = [-44, wdwRiverZ(-44) + 12];
wdwTerrain(G, -600, -600, 1200, 1200, lite ? 6 : 3, H, wdwMat("meadow"), function (x, z, y, c) {
var d = Math.abs(z - wdwRiverZ(x)), g = 0.82 + wdwFbm(x * 0.03, z * 0.03, 2) * 0.22;
if (d < 16)
c.setRGB(0.42 * g, 0.38 * g, 0.26 * g);
else if (d < 22)
c.setRGB(0.58 * g, 0.72 * g, 0.36 * g);
else {
var dr = wdwFbm(x * 0.011 + 5, z * 0.011, 2);
c.setRGB((0.46 + dr * 0.16) * g, (0.64 + dr * 0.08) * g, (0.3 + dr * 0.03) * g);
}
});
var water = [];
for (var wx = -600; wx < 600; wx += 40) {
var wz = wdwRiverZ(wx + 20);
water.push(wdwWater(G, wx + 20, wz, 41, 30, -1.0, 0x3A5A3A, 0.88));
}
wdwStrip(G, WDW_BK_PATHS.field, 1.4, H, wdwMat("trail"), 0.04);
wdwStrip(G, WDW_BK_PATHS.lane, 3.2, H, wdwMat("gravel"), 0.05);
var offPath = function (x, z) { return wdwPathD(x, z, WDW_BK_PATHS.field) > 1.6 && wdwPathD(x, z, WDW_BK_PATHS.lane) > 2.6; };
var dry = function (x, z) { return z - wdwRiverZ(x) > 16 || z - wdwRiverZ(x) < -16; };
var nearHome = function (x, z) { return Math.hypot(x - WDW_BK.farm[0], z - WDW_BK.farm[1]) > 26 && Math.hypot(x - WDW_BK.barn[0], z - WDW_BK.barn[1]) > 16; };
var reedL = [], lilies = [], flags = [];
for (var rx = -580; rx < 580; rx += lite ? 3 : 1.4) {
[-1, 1].forEach(function (sd) { if (R() < 0.35)
return; var z = wdwRiverZ(rx) + sd * (12 + R() * 3); reedL.push({ x: rx + R(), z: z, y: -1.1, s: 0.9 + R() * 0.7, ry: R() * 6 }); if (R() < 0.12)
flags.push({ x: rx, z: z + sd * 0.5, y: -0.9, s: 0.8, ry: R() * 6 }); if (R() < 0.15)
lilies.push({ x: rx + R() * 2, z: z - sd * (2 + R() * 3), y: -0.98, s: 0.6 + R() * 0.6, ry: R() * 6 }); });
}
wdwInst(G, wdwGeo("wdReed", function () { return wdwCards(3, 1.0, 2.0, 0); }), wdwLam(0xFFFFFF, { ds: 1, map: wdwReedTex("reed"), mapk: "reedT", cut: 0.4 }), reedL, {});
wdwPlant(G, "flowers", flags, { col: "#F0D030", keepAll: 1 });
wdwInst(G, wdwGeo("wdLily", function () { var c = new THREE.CircleGeometry(0.35, 10, 0.3, 5.8); c.rotateX(-Math.PI / 2); return c; }), wdwLam(0x4A7A3A), lilies, {});
wdwInst(G, wdwGeo("wdLilyF", function () { var s = new THREE.SphereGeometry(0.1, 8, 4, 0, 6.3, 0, 1.3); return s; }), wdwLam(0xF8F0F4), lilies.filter(function (t, i) { return i % 2 === 0; }).map(function (t) { return { x: t.x + 0.1, y: -0.96, z: t.z, s: t.s }; }), {});
var will = [];
for (var w = -560; w < 560; w += lite ? 60 : 34) {
if (R() < 0.3)
continue;
var sd = R() < 0.5 ? 1 : -1, z = wdwRiverZ(w) + sd * (16 + R() * 6);
will.push({ x: w + R() * 8, z: z, y: H(w, z), s: 0.9 + R() * 0.4, ry: R() * 6 });
}
will = will.filter(function (t) { return Math.hypot(t.x - WDW_BK.boat[0], t.z - WDW_BK.boat[1]) > 9; });
wdxWillows(G, will);
wdxTrees(G, "oak", [{ x: WDW_BK.oak[0], z: WDW_BK.oak[1], y: H(WDW_BK.oak[0], WDW_BK.oak[1]), s: 1.45, ry: 0.6 }], [0x4A7A2E]);
var field = wdwScatter(102, lite ? 14 : 30, -560, -560, 560, 560, function (x, z) { return dry(x, z) && offPath(x, z) && nearHome(x, z) && Math.hypot(x - WDW_BK.oak[0], z - WDW_BK.oak[1]) > 40 && Math.abs(z - 56) > 8; }, H, 0.9, 1.4);
wdxTrees(G, "oak", field.filter(function (t, i) { return i % 2 === 0; }), [0x4E7A30, 0x5A8A36]);
wdxTrees(G, "maple", field.filter(function (t, i) { return i % 2 === 1; }), [0x3E6A2A, 0x5A7A30]);
var wood = function (x, z) { return Math.hypot(x, z) > 330 && dry(x, z) && offPath(x, z); };
wdxTrees(G, "oak", wdwScatter(103, lite ? 60 : 180, -600, -600, 600, 600, wood, H, 0.9, 1.4), [0x3E6A2A, 0x4A7A2E, 0x5A8436]);
wdxTrees(G, "birch", wdwScatter(104, lite ? 20 : 60, -600, -600, 600, 600, wood, H, 0.8, 1.2), [0x6A9A3A]);
var mok = function (x, z) { return dry(x, z) && offPath(x, z) && nearHome(x, z); };
wdxMeadow(G, -140, -60, 140, 54, H, mok, 110, { dens: 1.4 });
wdxMeadow(G, -560, -560, 560, 560, H, function (x, z) { return mok(x, z) && !(x > -140 && x < 140 && z > -60 && z < 54); }, 120, { dens: 1.2 });
var O = WDW_BK.oak, oy = H(O[0] + 3, O[1] + 4);
wdwRug(G, O[0] + 3, O[1] + 4, 2.6, 1.8, 0x7A2A2A);
G.children[G.children.length - 1].position.y = oy + 0.03;
var bon = new THREE.Group();
bon.position.set(O[0] + 5, oy + 0.05, O[1] + 5.5);
G.add(bon);
var straw = wdwLam(0xE8D498);
wdwCyl(bon, 0.2, 0.2, 0.02, straw, 0, 0, 0, 16);
var cr = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 8, 0, 6.3, 0, 1.5), straw);
cr.position.y = 0.02;
bon.add(cr);
wdwBox(bon, 0.04, 0.006, 0.4, wdwLam(0x3A6AC8), 0.06, 0.02, 0.18);
for (var dc = 0; dc < 14; dc++) {
var a = dc / 14 * 3.2;
var dz = new THREE.Mesh(wdwGeo("wdDaisy", function () { return new THREE.CircleGeometry(0.03, 8); }), wdwLam(0xF8F8F0, { ds: 1 }));
dz.rotation.x = -Math.PI / 2;
dz.position.set(O[0] + 4 + Math.cos(a) * 0.4, oy + 0.06, O[1] + 6 + Math.sin(a) * 0.25);
G.add(dz);
}
var par = new THREE.Group();
par.position.set(O[0] + 1.2, oy, O[1] + 3);
par.rotation.z = 1.1;
G.add(par);
wdwCyl(par, 0.008, 0.008, 0.9, wdwLam(0x6A4A2A), 0, 0, 0, 5);
var cn = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.2, 10, 1, true), wdwLam(0xF4ECE0, { ds: 1 }));
cn.position.y = 0.9;
par.add(cn);
var bk = new THREE.Group();
bk.position.set(O[0] + 2.2, oy + 0.02, O[1] + 4.6);
G.add(bk);
wdwBox(bk, 0.3, 0.12, 0.22, wdwLam(0xA87A3A), 0, 0, 0);
wdwBox(bk, 0.32, 0.03, 0.24, wdwLam(0x8A5A2A), 0, 0.12, 0);
wdwBox(bk, 0.28, 0.02, 0.2, wdwLam(0xE8D8D8), 0, 0.13, 0.0);
wdwSpot(O[0] + 4, O[1] + 6, 1.6, "The daisies Alice was picking", "pick a daisy", function () { setStatus("🌼 <b>A daisy for the chain.</b> “whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies”"); });
var bt = WDW_BK.boat;
wdwBoat(G, bt[0], -1.0, bt[1] - 3, 0.25, { len: 5.4, col: 0x6A4A2A });
wdwBox(G, 1.2, 0.3, 0.8, wdwMat("planks"), bt[0] - 2, H(bt[0] - 2, bt[1] + 1) - 0.1, bt[1] + 1);
var hedgePts = [];
for (var hx = -400; hx <= 400; hx += 20)
hedgePts.push([hx, 56 + 3 * Math.sin(hx / 43)]);
var Ho = WDW_BK.hole, S = WDW_BK.stile;
wdxHedge(G, hedgePts, H, { seed: 7, s: 1.2, gap: function (x, z) { return Math.abs(x - S[0]) < 1.8; } });
for (var i = 0; i < hedgePts.length - 1; i++) {
var A = hedgePts[i], B = hedgePts[i + 1];
var segs = [[A, B]];
if (S[0] > A[0] && S[0] < B[0])
segs = [[A, [S[0] - 2, A[1] + (B[1] - A[1]) * (S[0] - 2 - A[0]) / (B[0] - A[0])]], [[S[0] + 2, A[1] + (B[1] - A[1]) * (S[0] + 2 - A[0]) / (B[0] - A[0])], B]];
segs.forEach(function (sg) { var a = sg[0], b = sg[1], cx = (a[0] + b[0]) / 2, cz = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]); wdwSolid(cx, cz, L, 1.8, H(cx, cz) - 1, H(cx, cz) + 3, -Math.atan2(b[1] - a[1], b[0] - a[0])); });
}
var sy = H(S[0], S[1] + 3 * Math.sin(S[0] / 43));
var stl = new THREE.Group();
stl.position.set(S[0], sy, 56 + 3 * Math.sin(S[0] / 43));
G.add(stl);
[-0.8, 0.8].forEach(function (x) { wdwBox(stl, 0.14, 1.3, 0.14, wdwMat("oak"), x, 0, 0); });
wdwBox(stl, 1.8, 0.08, 0.3, wdwMat("oak"), 0, 0.45, 0.4);
wdwBox(stl, 1.8, 0.08, 0.3, wdwMat("oak"), 0, 0.45, -0.4);
wdwBox(stl, 1.8, 0.1, 0.1, wdwMat("oak"), 0, 1.1, 0);
var hz = Ho[1] + 3 * Math.sin(Ho[0] / 43) - 1.6, hy = H(Ho[0], hz);
var hole = new THREE.Group();
hole.position.set(Ho[0], hy, hz);
G.add(hole);
wdwEll(hole, wdwMat("earth"), 1.8, 0.9, 1.2, 0, 0.1, 0.6, 16);
wdwEll(hole, wdwMat("trail"), 1.3, 0.5, 0.9, 0, 0, -0.2, 14);
var mouth = new THREE.Mesh(wdwGeo("wdHoleM", function () { return new THREE.CircleGeometry(0.42, 20); }), wdwLam(0x0A0806));
mouth.position.set(0, 0.42, -0.62);
mouth.rotation.x = -0.3;
mouth.rotation.y = Math.PI;
hole.add(mouth);
var rim = new THREE.Mesh(wdwGeo("wdHoleR", function () { return new THREE.TorusGeometry(0.45, 0.1, 6, 18); }), wdwMat("earth"));
rim.position.copy(mouth.position);
rim.rotation.copy(mouth.rotation);
hole.add(rim);
for (var rt = 0; rt < 5; rt++) {
var r0 = wdwCyl(hole, 0.02, 0.03, 0.6, wdwMat("bark"), -0.6 + rt * 0.3, 0.6, -0.5, 5);
r0.rotation.z = 1.2 + rt * 0.2;
}
wdwSpot(Ho[0], hz + 1.4, 2.0, "The rabbit-hole under the hedge", "look down it", function () { setStatus("🕳️ <b>A large rabbit-hole under the hedge.</b> It goes straight on like a tunnel, and then dips suddenly down."); });
wdwBkFarm(G, H);
var sheepFold = [[-200, 90], [-40, 90], [-40, 240], [-200, 240], [-200, 90]];
wdwPaling(G, sheepFold, H, {});
if (typeof wdxBeastKinds === "function")
try {
wdxBeastKinds();
}
catch (e) { }
var flock = wdwScatter(130, lite ? 6 : 16, -190, 100, -50, 230, null, H, 1, 1);
flock.forEach(function (t, i) { var s = wdwCreature("sheep", "sh" + i); s.position.set(t.x, t.y, t.z); s.rotation.y = t.ry; G.add(s); WDW.people.push({ g: s, y: t.y, o: { wander: 5, sp: 0.25 } }); });
var herd = wdwScatter(131, lite ? 4 : 10, -200, -300, 200, -140, function (x, z) { return z - wdwRiverZ(x) < -20; }, H, 1, 1);
herd.forEach(function (t, i) { var c = wdwCreature("cow", "cw" + i); c.position.set(t.x, t.y, t.z); c.rotation.y = t.ry; G.add(c); WDW.people.push({ g: c, y: t.y, o: { wander: 4, sp: 0.2 } }); });
wdwSpot(-120, 100, 6, "The sheep", "listen", function () { setStatus("🐑 <b>The tinkling sheep-bells.</b> The sheep crop the grass along the hurdles."); });
wdwFar(G, H, null, { edge: 600 });
wdwCrowd("bkfarm", [["The farmer's wife", "f", "maid", "Hot enough to melt the butter. You'll be with the young ladies down by the river, I expect.", WDP.creature], ["A farm boy with a pitchfork", "m", "worker", "The hay's nearly all in. Mind the bull in the far meadow.", WDP.creature, true], ["The milkmaid", "f", "maid", "The cows'll be lowing for me soon enough.", WDP.creature]], WDW_BK.farm[0] - 14, WDW_BK.farm[1] + 8, WDW_BK.farm[0] + 20, WDW_BK.farm[1] + 24, { wander: 5 });
wdwOne("bkfish", "A boy fishing", "m", "boy", 120, wdwRiverZ(120) + 15, Math.PI, "Gudgeon, mostly. They don't bite in this heat.", { child: true });
wdwBoat(G, 260, -1.0, wdwRiverZ(260) - 2, 0.1, { len: 5, col: 0x3A4A6A });
},
function (G, H) {
var F = WDW_BK.farm, fy = H(F[0], F[1]);
wdwTownHouse(G, F[0], F[1], 12, 7, 5.2, { y: fy, ry: Math.PI, wall: "greystone", roof: "slate", shut: 0x3A5A3A });
var Dr = function (key, x, z, ry, nm) { var Rm = WDW.rooms.filter(function (q) { return q.key === key; })[0]; if (Rm)
wdwDoor(Rm, nm, x, z, ry); };
Dr("farmkitchen", F[0], F[1] - 4.6, Math.PI, "The farmhouse door");
var B = WDW_BK.barn, by = H(B[0], B[1]), bb = new THREE.Group();
bb.position.set(B[0], by, B[1]);
bb.rotation.y = 0.2;
G.add(bb);
wdwBox(bb, 14, 6, 9, wdwMat("planks"), 0, 0, 0);
var rf = new THREE.Mesh(wdwGeo("wdBarnRoof", function () { var s = new THREE.Shape(); s.moveTo(-5.2, 0); s.lineTo(0, 3.6); s.lineTo(5.2, 0); s.lineTo(-5.2, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 15, bevelEnabled: false }); e.translate(0, 0, -7.5); e.rotateY(Math.PI / 2); return e; }), wdwThatchM());
rf.position.y = 6;
bb.add(rf);
wdwBox(bb, 4, 4.5, 0.12, wdwMat("darkoak"), 0, 0, -4.56);
wdwSolid(B[0], B[1], 14.4, 9.4, by - 1, by + 9, 0.2);
for (var r = 0; r < 3; r++) {
var rk = new THREE.Group();
rk.position.set(B[0] + 20 + r * 8, H(B[0] + 20 + r * 8, B[1] - 10), B[1] - 10);
G.add(rk);
wdwCyl(rk, 2.6, 2.8, 3.2, wdwThatchM(), 0, 0, 0, 14);
var cn = new THREE.Mesh(new THREE.ConeGeometry(2.9, 2.4, 14), wdwThatchM());
cn.position.y = 4.4;
rk.add(cn);
wdwRound(B[0] + 20 + r * 8, B[1] - 10, 2.8, -1, 8);
}
var pump = new THREE.Group();
pump.position.set(F[0] + 10, H(F[0] + 10, F[1] - 10), F[1] - 10);
G.add(pump);
wdwBox(pump, 0.4, 1.6, 0.4, wdwMat("darkoak"), 0, 0, 0);
var hd = wdwBox(pump, 0.08, 0.08, 0.7, wdwMat("iron"), 0, 1.4, 0.3);
wdwBox(pump, 1.0, 0.3, 0.6, wdwMat("stone"), 0, 0, 0.6);
wdwCart(G, F[0] - 14, F[1] - 12, 0.4, { load: 3 });
wdwPaling(G, [[F[0] - 24, F[1] - 20], [F[0] + 30, F[1] - 20], [F[0] + 30, F[1] + 30]], H, {});
},
function (G) {
var X = WDW_ROOMXZ.bank, R;
R = wdwRoom(G, "farmkitchen", X.farmkitchen[0], X.farmkitchen[1], 8, 6, { wall: "plaster", floor: "setts", name: "the farmhouse kitchen", beams: 1, lightI: 0.75 });
wdwHearth(R.g, 0, -2.8, 0, { h: R.h, mat: "stone", fire: 1 });
wdwTable(R.g, 0, 0, 2.4, 1.0, 0.78, { cloth: 0xE8E0D0 });
for (var c = 0; c < 4; c++)
wdwChair(R.g, -0.8 + c * 0.55, c % 2 ? 0.8 : -0.8, c % 2 ? Math.PI : 0, {});
wdfDresser(R.g, -3.7, 0.4, Math.PI / 2, {});
wdfPlates(R.g, -3.6, 1.4, 0.4, 6, 1.2);
wdfBucket(R.g, 3.2, -2.2);
wdfPegs(R.g, 3.85, 1.6, 0.6, -Math.PI / 2, ["coat", "hat", "basket"]);
wdfClock(R.g, 3.8, 0, -1.6, -Math.PI / 2);
wdfHang(R.g, 1.4, 2.9, -1.6, 4, 0x8A6A3A, 0.5);
wdfBottle(R.g, 0.4, 0.78, 0.1, 0x3A5A2A);
wdxTeaThings(R.g, -0.8, 0.8, 0, 0.79, { seed: 5, gap: 0.8, w: 0.3 });
wdwWindowIn(R.g, 3.85, 1.5, 1.4, -Math.PI / 2, 1, 1.2, { sky: 0xA8D0E8 });
R = wdwRoom(G, "farmparlour", X.farmparlour[0], X.farmparlour[1], 7, 6, { wall: "greenpaper", floor: "floor", name: "the farmhouse parlour", lightI: 0.7 });
wdfSofa(R.g, 0, -2.4, 0, 0x6A3A2A);
wdwChair(R.g, -2.4, -0.6, Math.PI / 2, { arm: 1 });
wdwChair(R.g, 2.4, -0.6, -Math.PI / 2, { arm: 1 });
wdwTable(R.g, 0, -0.6, 1.0, 0.6, 0.5, {});
wdwRug(R.g, 0, -0.6, 3.6, 2.6, 0x5A3A5A);
wdwHearth(R.g, 0, -2.85, 0, { h: R.h, mat: "brick" });
wdwShelves(R.g, -3.3, 1.2, 1.6, 2, Math.PI / 2, { books: 1 });
wdwPicture(R.g, 1.8, 1.8, -2.86, 0, 0.8, 0.6);
wdfLampTable(R.g, 3.0, 1.6, {});
wdwWindowIn(R.g, 3.35, 1.5, 0.6, -Math.PI / 2, 1, 1.3, { sky: 0xA8D0E8 });
wdwInDoor("farmkitchen", "farmparlour", -3.4, 2.2, "Through to the parlour", "go");
},
function (x, z) {
var W = WDW_WELL, r = Math.hypot(x, z);
if (z < -1 && Math.abs(x) < 2.2)
return W.top;
if (r < W.r)
return WDW.fallY != null ? WDW.fallY : W.top;
if (z > 0 && Math.abs(x) < 2.0)
return W.bot;
return W.top + 4;
},
function () {
return wdwCanvas("wdShelfT4", 256, 288, function (c, W, H) {
var R = wRand(31);
c.fillStyle = "#3A2414";
c.fillRect(0, 0, W, H);
for (var row = 0; row < 4; row++) {
var y0 = row * H / 4 + 6, x = 6;
while (x < W - 6) {
var w = 6 + R() * 10, h = H / 4 - 14 - R() * 14;
c.fillStyle = ["#6A1E1A", "#1E3A5A", "#2A4A2A", "#8A6A2A", "#4A2A4A", "#2A2A2A", "#8A3A1A"][Math.floor(R() * 7)];
c.fillRect(x, y0 + (H / 4 - 10 - h), w, h);
c.fillStyle = "rgba(232,200,120,0.6)";
c.fillRect(x + 1, y0 + (H / 4 - 10 - h) + 6, w - 2, 2);
x += w + 1;
}
c.fillStyle = "#5A3A20";
c.fillRect(0, y0 + H / 4 - 10, W, 6);
}
});
},
function (i) {
return wdwCanvas("wdMapT" + i, 128, 96, function (c, W, H) {
var R = wRand(70 + i);
c.fillStyle = "#E8DCB8";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#7A5A3A";
c.lineWidth = 3;
c.strokeRect(2, 2, W - 4, H - 4);
c.fillStyle = "#A8C8D8";
c.fillRect(6, 6, W - 12, H - 12);
c.fillStyle = "#C8B888";
for (var k = 0; k < 3; k++) {
c.beginPath();
var cx = 20 + R() * (W - 40), cy = 20 + R() * (H - 40);
c.moveTo(cx, cy);
for (var a = 0; a < 12; a++) {
var rr = 10 + R() * 16;
c.lineTo(cx + Math.cos(a / 12 * 6.283) * rr, cy + Math.sin(a / 12 * 6.283) * rr * 0.8);
}
c.fill();
}
c.strokeStyle = "rgba(90,60,30,0.5)";
c.lineWidth = 1;
for (var g = 12; g < W; g += 16) {
c.beginPath();
c.moveTo(g, 6);
c.lineTo(g, H - 6);
c.stroke();
}
for (g = 12; g < H; g += 16) {
c.beginPath();
c.moveTo(6, g);
c.lineTo(W - 6, g);
c.stroke();
}
});
},
function (i) {
return wdwCanvas("wdPicT" + i, 96, 120, function (c, W, H) {
var R = wRand(90 + i);
var sky = c.createLinearGradient(0, 0, 0, H);
sky.addColorStop(0, ["#8AB0D8", "#E8B888", "#A8B8C8"][i % 3]);
sky.addColorStop(1, "#E8E4D0");
c.fillStyle = sky;
c.fillRect(0, 0, W, H);
c.fillStyle = ["#4A6A3A", "#6A5A3A", "#3A5A4A"][i % 3];
c.beginPath();
c.moveTo(0, H * 0.65);
for (var x = 0; x <= W; x += 8)
c.lineTo(x, H * 0.6 + Math.sin(x * 0.08 + i) * 8);
c.lineTo(W, H);
c.lineTo(0, H);
c.fill();
if (i % 2 === 0) {
c.fillStyle = "#E8D8C0";
c.beginPath();
c.ellipse(W / 2, H * 0.42, 14, 20, 0, 0, 7);
c.fill();
c.fillStyle = "#3A2A1A";
c.beginPath();
c.ellipse(W / 2, H * 0.32, 10, 9, 0, 0, 7);
c.fill();
}
c.strokeStyle = "#C8A040";
c.lineWidth = 8;
c.strokeRect(0, 0, W, H);
});
},
function (G) {
var W = WDW_WELL, lite = wdwLite(), R = wRand(201), depth = W.top - W.bot + 20;
var tun = new THREE.Mesh(wdwGeo("wdTun", function () { var c = new THREE.CylinderGeometry(2.4, 2.4, 40, 16, 1, true); c.rotateX(Math.PI / 2); c.translate(0, 1.6, -21); return c; }), wdwM("wdTunM", function () { var m = wdwS("b:dirt", 0x6A4A2E, 2).clone(); m.side = THREE.BackSide; return m; }));
G.add(tun);
for (var rt = 0; rt < (lite ? 8 : 20); rt++) {
var r0 = wdwCyl(G, 0.02, 0.05, 1.2 + R() * 1.2, wdwMat("bark"), (R() - 0.5) * 3, 2.6 + R() * 0.8, -3 - R() * 34, 5);
r0.rotation.set(R() * 0.6, 0, Math.PI + (R() - 0.5) * 0.8);
}
wdwBox(G, 4.4, 0.2, 40, wdwMat("trail"), 0, -0.2, -21);
wdwSolid(-2.3, -21, 0.4, 40, -1, 6);
wdwSolid(2.3, -21, 0.4, 40, -1, 6);
wdwSolid(0, -41, 4.6, 0.4, -1, 6);
var wall = new THREE.Mesh(new THREE.CylinderGeometry(W.r + 0.4, W.r + 0.4, depth, lite ? 18 : 28, 1, true), wdwM("wdWellM", function () { var m = wdwS("b:brick", 0x8A6A4A, 1.4).clone(); m.side = THREE.BackSide; if (m.map) {
m.map = m.map.clone();
m.map.needsUpdate = true;
m.map.repeat.set(10, depth / 1.4);
} return m; }));
wall.position.y = W.bot + depth / 2 - 10;
G.add(wall);
for (var a = 0; a < 16; a++) {
var an = a / 16 * Math.PI * 2;
if (Math.abs(Math.sin(an)) < 0.4 && Math.cos(an) < 0) { }
wdwSolid(Math.sin(an) * (W.r + 0.3), Math.cos(an) * (W.r + 0.3), 1.4, 0.4, W.bot - 2, W.top + 4, -an);
}
var cup = [], shelf = [], maps = [], pics = [], lamps = [], lv = lite ? 4.6 : 2.3;
for (var y = W.top - 3; y > W.bot + 8; y -= lv) {
var off = R() * 6.283, n = lite ? 8 : 12;
for (var k = 0; k < n; k++) {
var ang = off + k / n * 6.283 + (R() - 0.5) * 0.3, rr = W.r - 0.05, it = { x: Math.sin(ang) * rr, z: Math.cos(ang) * rr, y: y + (R() - 0.5) * 1.4, ry: ang + Math.PI, s: 1 };
var t = R();
if (t < 0.3)
cup.push(it);
else if (t < 0.76)
shelf.push(it);
else if (t < 0.88)
maps.push(it);
else
pics.push(it);
}
if (R() < (lite ? 0.25 : 0.45)) {
var la = R() * 6.283;
lamps.push([Math.sin(la) * (W.r - 0.3), y - 1, Math.cos(la) * (W.r - 0.3)]);
}
}
wdwInst(G, wdwGeo("wdCup", function () { var parts = []; var b = new THREE.BoxGeometry(1.4, 1.8, 0.45); b.translate(0, 0.9, -0.22); parts.push(b.toNonIndexed()); [-0.34, 0.34].forEach(function (x) { var d = new THREE.BoxGeometry(0.62, 1.6, 0.04); d.translate(x, 0.9, 0.02); parts.push(d.toNonIndexed()); }); var k = new THREE.BoxGeometry(0.06, 0.14, 0.05); k.translate(0.06, 0.9, 0.05); parts.push(k.toNonIndexed()); return gwMerge(parts); }), wdwMat("oak"), cup, {});
wdwInst(G, wdwGeo("wdShelfB", function () { var b = new THREE.BoxGeometry(1.6, 1.9, 0.4); b.translate(0, 0.95, -0.2); return b; }), wdwMat("darkoak"), shelf, {});
wdwInst(G, wdwGeo("wdShelfF", function () { var p = new THREE.PlaneGeometry(1.5, 1.8); p.translate(0, 0.95, 0.01); return p; }), wdwLam(0xFFFFFF, { map: wdwShelfTex(), mapk: "wdShelfT4" }), shelf, {});
for (var mi = 0; mi < 4; mi++) {
var sub = maps.filter(function (t, i) { return i % 4 === mi; });
wdwInst(G, wdwGeo("wdMapP", function () { var p = new THREE.PlaneGeometry(1.2, 0.9); p.translate(0, 0.5, 0.02); return p; }), wdwLam(0xFFFFFF, { map: wdwMapTex(mi), mapk: "wdMapT" + mi, ds: 1 }), sub, {});
}
for (var pi = 0; pi < 3; pi++) {
var sp = pics.filter(function (t, i) { return i % 3 === pi; });
wdwInst(G, wdwGeo("wdPicP", function () { var p = new THREE.PlaneGeometry(0.7, 0.9); p.translate(0, 0.5, 0.02); return p; }), wdwLam(0xFFFFFF, { map: wdwPicTex(pi), mapk: "wdPicT" + pi, ds: 1 }), sp, {});
}
var pegs = maps.concat(pics);
wdwInst(G, wdwGeo("wdPeg", function () { var c = new THREE.CylinderGeometry(0.03, 0.03, 0.2, 5); c.rotateX(Math.PI / 2); c.translate(0, 1.05, 0.06); return c; }), wdwMat("brass"), pegs, {});
var jar = new THREE.Group();
jar.position.set(0, W.top - 14, W.r - 0.55);
jar.rotation.y = Math.PI;
G.add(jar);
wdwBox(jar, 1.0, 0.06, 0.4, wdwMat("oak"), 0, 0, 0);
wdwBox(jar, 0.08, 0.3, 0.4, wdwMat("oak"), -0.45, -0.3, 0);
var jg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.11, 0.24, 14), wdwShine(0xE8E4D8, 0.15, 0));
jg.position.y = 0.18;
jar.add(jg);
wdwSign(jar, "ORANGE MARMALADE", 0.22, 0.08, 0, 0.17, 0.112, 0, { bg: "#F4EAD0", ink: "#8A3A10" });
WDW.jar = jar;
lamps.forEach(function (p) { wdfLantern(G, p[0], p[1], p[2], { brass: 1 }); });
var Lg = wdxGlowStart();
lamps.forEach(function (p) { wdxGlow(Lg, p[0], p[1] + 0.3, p[2], 0xFFC870, 1.4); });
wdxGlowDone(G, Lg);
var heap = [];
for (var h = 0; h < (lite ? 60 : 180); h++) {
var aa = R() * 6.283, rr2 = Math.sqrt(R()) * W.r;
heap.push({ x: Math.sin(aa) * rr2, y: W.bot + R() * 0.4, z: Math.cos(aa) * rr2, rx: R() * 6, ry: R() * 6, rz: R() * 6, s: 0.6 + R() });
}
wdwInst(G, wdwGeo("wdStick", function () { var c = new THREE.CylinderGeometry(0.02, 0.03, 1.0, 4); c.rotateZ(Math.PI / 2); return c; }), wdwMat("bark"), heap.slice(0, heap.length / 3 | 0), {});
wdwInst(G, wdwGeo("wdLeaf", function () { var s = new THREE.Shape(); s.moveTo(0, -0.1); s.quadraticCurveTo(0.08, 0, 0, 0.12); s.quadraticCurveTo(-0.08, 0, 0, -0.1); return new THREE.ShapeGeometry(s); }), wdwLam(0x8A6A2A, { ds: 1 }), heap, {});
wdwInst(G, wdwGeo("wdLeaf", null), wdwLam(0xB8862A, { ds: 1 }), heap.map(function (t) { return { x: t.x * 0.9, y: t.y + 0.05, z: t.z * 0.9, rx: t.rz, ry: t.rx, rz: t.ry, s: t.s }; }), {});
var pas = new THREE.Group();
pas.position.set(0, W.bot, 0);
G.add(pas);
wdwBox(pas, 4.2, 0.2, 92, wdwMat("setts"), 0, -0.2, 46);
wdwBox(pas, 0.3, 3.4, 92, wdwMat("brick"), -2.1, 0, 46);
wdwBox(pas, 0.3, 3.4, 92, wdwMat("brick"), 2.1, 0, 46);
wdwBox(pas, 4.4, 0.3, 92, wdwMat("brick"), 0, 3.4, 46);
for (var lp = 6; lp < 90; lp += 12)
wdfLantern(pas, 1.8, 2.2, lp, { brass: 1 });
var Lp = wdxGlowStart();
for (lp = 6; lp < 90; lp += 12)
wdxGlow(Lp, 1.8, W.bot + 2.5, lp, 0xFFC870, 1.2);
wdxGlowDone(G, Lp);
wdwSolid(-2.1, 46, 0.4, 92, W.bot - 1, W.bot + 4);
wdwSolid(2.1, 46, 0.4, 92, W.bot - 1, W.bot + 4);
wdwSolid(0, 92, 4.4, 0.4, W.bot - 1, W.bot + 4);
wdwBox(pas, 2.6, 2.6, 0.1, wdwMat("darkoak"), 0, 0, 91.6);
wdwSign(pas, "→", 0.6, 0.4, 0, 2.8, 91.5, Math.PI, {});
wdwSpot(0, 89, 2.2, "Round the corner, after the Rabbit", "go", function () { wdwGo("hall0", "🕯️ <b>A long, low hall,</b> lit up by a row of lamps hanging from the roof."); }, W.bot);
},
function (dt, L) {
if (WDW.sc !== "well")
return;
var W = WDW_WELL, inWell = Math.hypot(L.x, L.z) < W.r - 0.2;
if (WDW.fallY == null)
WDW.fallY = W.top;
if (inWell && !WDW.fallDone && WDW.fallY > W.bot) {
WDW.falling = true;
var sp = window.SBK_FAST ? 60 : 2.6;
WDW.fallY = Math.max(W.bot, WDW.fallY - sp * dt);
if (WDW.fallY <= W.bot) {
WDW.fallDone = true;
WDW.falling = false;
if (typeof wdbNote === "function")
wdbNote("fell");
setStatus("🍂 <b>Thump! thump!</b> Down you come upon a heap of sticks and dry leaves, and the fall is over.");
}
}
},
function (G) {
var H = WDW_HALL, lite = wdwLite(), R = wRand(301), st = WDW.st || {}, T0 = H.tbl, open = !!st.doorOpen;
var fl = new THREE.Mesh(new THREE.PlaneGeometry(H.w, H.l), wdwMat("checker"));
fl.rotation.x = -Math.PI / 2;
G.add(fl);
wdwBox(G, H.w, 0.2, H.l, wdwMat("ceiling"), 0, H.h, 0);
for (var b = -H.l / 2 + 2; b < H.l / 2; b += 3)
wdwBox(G, H.w, 0.22, 0.24, wdwMat("beams"), 0, H.h - 0.22, b);
var wallM = wdwMat("damask");
[[-H.w / 2, 0, Math.PI / 2], [H.w / 2, 0, -Math.PI / 2]].forEach(function (q) { wdwBox(G, 0.2, H.h, H.l, wallM, q[0], 0, 0); });
wdwBox(G, H.w, H.h, 0.2, wallM, 0, 0, H.l / 2);
var D = H.door;
wdwBox(G, (H.w - 0.6) / 2, H.h, 0.2, wallM, -(H.w + 0.6) / 4, 0, -H.l / 2);
wdwBox(G, (H.w - 0.6) / 2, H.h, 0.2, wallM, (H.w + 0.6) / 4, 0, -H.l / 2);
wdwBox(G, 0.6, H.h - 0.42, 0.2, wallM, 0, 0.42, -H.l / 2);
wdwSolid(0, H.l / 2, H.w, 0.4, -1, H.h + 1);
wdwSolid(-H.w / 2, 0, 0.4, H.l, -1, H.h + 1);
wdwSolid(H.w / 2, 0, 0.4, H.l, -1, H.h + 1);
wdwSolid(-(H.w + 0.6) / 4, -H.l / 2, (H.w - 0.6) / 2, 0.4, -1, H.h + 1);
wdwSolid((H.w + 0.6) / 4, -H.l / 2, (H.w - 0.6) / 2, 0.4, -1, H.h + 1);
if (typeof wdxPanelling === "function" && !lite)
try {
var pg = new THREE.Group();
G.add(pg);
wdxPanelling(pg, H.w, H.l, H.h, { h0: 1.1, step: 3 });
}
catch (e) { }
var ld = new THREE.Group();
ld.position.set(0, 0, -H.l / 2 + 0.12);
G.add(ld);
wdwBox(ld, 0.3, 0.38, 0.04, wdwMat("oak"), 0, 0, 0);
wdwBox(ld, 0.36, 0.04, 0.06, wdwMat("gilt"), 0, 0.38, 0);
var lk = wdwBox(ld, 0.02, 0.03, 0.02, wdwMat("brass"), 0.1, 0.18, 0.03);
WDW.littleDoor = ld;
ld.visible = !open;
if (!open)
wdwSolid(0, -H.l / 2, 0.6, 0.4, -1, 1);
var cur = new THREE.Group();
cur.position.set(0, 0, -H.l / 2 + 0.5);
G.add(cur);
wdwCyl(cur, 0.02, 0.02, 2.4, wdwMat("brass"), 0, 0.66, 0, 6).rotation.z = Math.PI / 2;
if (typeof wdxDrape === "function") {
try {
wdxDrape(cur, -0.6, 0.33, 0, 1.1, 0.66, 0, wdwMat("redvelvet"), {});
wdxDrape(cur, 0.6, 0.33, 0, 1.1, 0.66, 0, wdwMat("redvelvet"), {});
}
catch (e) { }
}
var gd = new THREE.Group();
gd.position.set(0, 0, -H.l / 2 - 0.2);
G.add(gd);
wdwBox(gd, 0.32, 0.4, 1.8, wdwMat("brick"), 0, 0, -0.9);
var lawn = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), wdwS("grass", 0x6AA83A, 1));
lawn.rotation.x = -Math.PI / 2;
lawn.position.set(0, 0.02, -8);
gd.add(lawn);
var sunL = new THREE.Mesh(new THREE.PlaneGeometry(12, 6), wdwLam(0xBFE0F8, { ds: 1, e: 0x88A8C8 }));
sunL.position.set(0, 3, -14);
gd.add(sunL);
for (var fb = 0; fb < 14; fb++) {
var fx = (R() - 0.5) * 9, fz = -3 - R() * 9;
wdwPlant(gd, "flowers", [{ x: fx, y: 0, z: fz, s: 0.6, ry: R() * 6 }], { col: ["#E83A3A", "#F4D040", "#E8E8F4", "#C860C8", "#F08A30"][fb % 5], keepAll: 1 });
}
wdwCyl(gd, 0.9, 1.0, 0.35, wdwMat("marble"), 0, 0, -8, 18);
wdwCyl(gd, 0.12, 0.16, 0.8, wdwMat("marble"), 0, 0.35, -8, 10);
var spray = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8, 0, 6.3, 0, 1.6), wdwLam(0xD8ECF8, { op: 0.5 }));
spray.position.set(0, 1.0, -8);
gd.add(spray);
for (var rb = 0; rb < 4; rb++)
wdxRoseTree(gd, (rb % 2 ? 1 : -1) * (2 + rb * 0.6), -5 - rb * 1.8, 0, { s: 0.7, col: "#F6F4EE" });
wdwSolid(0, -H.l / 2 - 1.2, 0.8, 2.0, -1, 1);
wdwSpot(0, -20.4, 1.6, "The low curtain", "lift the curtain", function () { setStatus("🎭 <b>Behind the low curtain:</b> a little door about fifteen inches high."); });
wdwSpot(0, -21.0, 0.9, "The little door behind the curtain", open ? "go through" : "try the little door", function () { if (open && (WDW.size || 1) < 0.3) {
if (typeof wdbNote === "function")
wdbNote("littledoor");
return;
} setStatus((WDW.size || 1) > 0.3 ? "🚪 <b>You could not even get your head through the doorway.</b>" : "🔒 <b>The little door is locked.</b>"); });
wdwSpot(T0[0], T0[1], 1.5, "A leg of the glass table", "try to climb it", function () { setStatus((WDW.size || 1) < 0.3 ? "🪟 <b>It is too slippery.</b> You slide down again every time." : "🪟 <b>The little glass table,</b> three-legged, all solid glass."); });
if (st.bottleOut && !st.drank)
wdwSpot(T0[0], T0[1] + 0.2, 1.4, "The little bottle on the table: DRINK ME", "take it up", function () { });
if (st.cakeOut && !st.ate)
wdwSpot(T0[0] + 0.05, T0[1] + 0.5, 1.0, "The little glass box under the table", "open it", function () { });
var doors = [];
for (var dz = -H.l / 2 + 4; dz < H.l / 2 - 3; dz += 5) {
doors.push([-H.w / 2 + 0.12, dz, Math.PI / 2]);
doors.push([H.w / 2 - 0.12, dz, -Math.PI / 2]);
}
doors.forEach(function (q, i) { var g = new THREE.Group(); g.position.set(q[0], 0, q[1]); g.rotation.y = q[2]; G.add(g); wdwBox(g, 1.1, 2.3, 0.08, wdwMat(i % 3 ? "darkoak" : "oak"), 0, 0, 0); wdwBox(g, 1.3, 0.14, 0.12, wdwMat("gilt"), 0, 2.3, 0); wdwBox(g, 0.05, 0.05, 0.05, wdwMat("brass"), 0.4, 1.0, 0.06); wdwBox(g, 0.05, 0.09, 0.02, wdwLam(0x1A1A1A), 0.4, 0.9, 0.07); });
wdwSpot(-H.w / 2 + 1, 0, 3.2, "The doors all round the hall", "try the doors", function () { setStatus("🚪 <b>Locked.</b> Every one of them is locked; you go down one side and up the other, trying every door."); });
wdwSpot(H.w / 2 - 1, 8, 3.2, "The doors all round the hall", "try the doors", function () { setStatus("🚪 <b>Locked.</b> Not one of these doors will open."); });
var Lg = wdxGlowStart();
for (var lz = -H.l / 2 + 4; lz < H.l / 2; lz += 6) {
var lm = new THREE.Group();
lm.position.set(0, H.h - 0.1, lz);
G.add(lm);
wdwCyl(lm, 0.008, 0.008, 0.4, wdwMat("brass"), 0, -0.4, 0, 4);
var gl = new THREE.Mesh(wdwGeo("wdHLamp", function () { var s = new THREE.SphereGeometry(0.16, 12, 8); s.scale(1, 1.3, 1); return s; }), wdwGlowM(0xFFE0A0, 0.9));
gl.position.y = -0.55;
lm.add(gl);
wdwCyl(lm, 0.12, 0.06, 0.1, wdwMat("brass"), 0, -0.45, 0, 10);
wdxGlow(Lg, 0, H.h - 0.65, lz, 0xFFD890, 2.0);
}
wdxGlowDone(G, Lg);
var T = H.tbl, tg = new THREE.Group();
tg.position.set(T[0], 0, T[1]);
G.add(tg);
var glass = wdwM("wdGlass", function () { return new THREE.MeshPhongMaterial({ color: 0xD8ECF4, transparent: true, opacity: 0.35, shininess: 90, specular: 0xFFFFFF }); });
var top = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.04, 28), glass);
top.position.y = 0.92;
tg.add(top);
for (var lg = 0; lg < 3; lg++) {
var la = lg / 3 * 6.283, leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.92, 8), glass);
leg.position.set(Math.sin(la) * 0.38, 0.46, Math.cos(la) * 0.38);
tg.add(leg);
}
wdwRound(T[0], T[1], 0.5, -1, 0.94);
WDW.key = wdwHallKey(tg, !st.keyTaken);
WDW.bottle = wdwHallBottle(tg, !!st.bottleOut && !st.drank);
WDW.cakeBox = wdwHallCake(G, T, !!st.cakeOut && !st.ate);
if (st.gloves && !st.fanTaken) {
var fan = new THREE.Group();
fan.position.set(2.4, 0.01, 6);
G.add(fan);
for (var f = 0; f < 9; f++) {
var vn = wdwBox(fan, 0.02, 0.004, 0.3, wdwLam(0xF4ECE0), 0, 0, 0.15);
vn.rotation.y = (f - 4) * 0.16;
vn.position.set(Math.sin((f - 4) * 0.16) * 0.15, 0, Math.cos((f - 4) * 0.16) * 0.15);
}
[0, 0.12].forEach(function (o) { var gv = wdwBox(G, 0.08, 0.02, 0.2, wdwLam(0xF6F2EA), 2.8 + o, 0.01, 6.3); gv.rotation.y = 0.4 + o; });
}
if (st.tears) {
var pool = wdwWater(G, 0, 4, H.w - 0.4, H.l * 0.55, 0.1, 0x7A9AA8, 0.55);
pool.position.z = H.l / 2 - H.l * 0.55 / 2 - 0.2;
}
},
function (P, show) {
var k = new THREE.Group();
k.position.set(0.1, 0.95, 0.05);
P.add(k);
k.visible = show;
var gold = wdwShine(0xE8C048, 0.25, 0.9);
var bow = new THREE.Mesh(new THREE.TorusGeometry(0.02, 0.006, 6, 14), gold);
bow.rotation.x = Math.PI / 2;
k.add(bow);
var sh = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.07, 5), gold);
sh.rotation.z = Math.PI / 2;
sh.position.x = 0.055;
k.add(sh);
wdwBox(k, 0.012, 0.004, 0.016, gold, 0.085, -0.002, 0.006);
return k;
},
function (P, show) {
var b = new THREE.Group();
b.position.set(-0.15, 0.94, -0.1);
P.add(b);
b.visible = show;
var gl = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.12, 12), wdwShine(0x5A8A9A, 0.1, 0));
gl.position.y = 0.06;
b.add(gl);
var nk = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.02, 0.05, 8), wdwShine(0x5A8A9A, 0.1, 0));
nk.position.y = 0.145;
b.add(nk);
wdwCyl(b, 0.013, 0.013, 0.02, wdwLam(0xC8A06A), 0, 0.17, 0, 6);
var tag = wdwSign(b, "DRINK ME", 0.07, 0.04, 0, 0.08, 0.042, 0, { bg: "#F4EAD0", ink: "#1A1A1A" });
var str = wdwCyl(b, 0.002, 0.002, 0.05, wdwLam(0xC8B8A0), 0, 0.11, 0.03, 4);
return b;
},
function (P, T, show) {
var g = new THREE.Group();
g.position.set(T[0] + 0.05, 0, T[1] + 0.08);
P.add(g);
g.visible = show;
var bx = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.12), wdwM("wdGlass", function () { return new THREE.MeshPhongMaterial({ color: 0xD8ECF4, transparent: true, opacity: 0.35, shininess: 90, specular: 0xFFFFFF }); }));
bx.position.y = 0.04;
g.add(bx);
var ck = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.035, 12), wdwLam(0xD8A860));
ck.position.y = 0.02;
g.add(ck);
wdwSign(g, "EAT ME", 0.06, 0.025, 0, 0.04, 0.046, 0, { bg: "#D8A860", ink: "#3A1A0A" });
return g;
},
function (x, z) {
var P = WDW_WO.pool, d = Math.hypot(x - P[0], z - P[1]), r = wdwPoolR(x, z), n = wdwFbm(x * 0.008, z * 0.008, 3);
var land = 0.6 + n * 4.4 + wdwFbm(x * 0.022 + 1, z * 0.022, 2) * 0.9 + wdwFbm(x * 0.002 + 4, z * 0.002, 2) * 10 * wdwSmooth(200, 900, Math.hypot(x - 40, z));
if (d < r) {
var floor = WDW_POOL_Y - 0.5 - wdwSmooth(0, 30, r - d) * 2.2;
if ((WDW.size || 1) < 0.65 && !WDW.inRm)
return Math.max(floor, WDW_POOL_Y - 1.72 * (WDW.size || 1) * 0.82);
return floor;
}
return WDW_POOL_Y - 0.5 + wdwSmooth(r, r + 14, d) * (land - WDW_POOL_Y + 0.5);
},
function (G) {
var H = wdwWonderH, lite = wdwLite(), R = wRand(401), W = WDW_WO, st = WDW.st || {};
wdwTerrain(G, -900, -900, 1800, 1800, lite ? 8 : 4, H, wdwMat("meadow"), function (x, z, y, c) {
var g = 0.8 + wdwFbm(x * 0.03, z * 0.03, 2) * 0.24, P = W.pool, d = Math.hypot(x - P[0], z - P[1]), r = wdwPoolR(x, z);
if (d < r + 5)
c.setRGB(0.78 * g, 0.72 * g, 0.58 * g);
else if (d < r + 11)
c.setRGB(0.6 * g, 0.7 * g, 0.42 * g);
else {
var w = wdwSmooth(80, 30, Math.hypot(x - W.wood[0], z - W.wood[1]) - 200), dry = wdwFbm(x * 0.011 + 7, z * 0.011, 2), moss = wdwFbm(x * 0.05 + 2, z * 0.05, 2);
var lit = wdwSmooth(0.5, 0.68, wdwFbm(x * 0.045 + 11, z * 0.045, 3)) * w;
c.setRGB((0.44 - 0.1 * w + dry * 0.14 * (1 - w) - moss * 0.04) * g, (0.62 - 0.2 * w + dry * 0.08 * (1 - w)) * g, (0.27 - 0.08 * w + dry * 0.02) * g);
if (lit > 0) {
c.r += (0.46 * g - c.r) * lit;
c.g += (0.36 * g - c.g) * lit;
c.b += (0.2 * g - c.b) * lit;
}
}
});
var pw = wdwWater(G, W.pool[0], W.pool[1], 250, 250, WDW_POOL_Y, 0x5A8098, 0.78);
pw.userData.fx = 0.1;
pw.userData.fz = 0.1;
var shingle = [];
for (var a = 0; a < 6.283; a += lite ? 0.05 : 0.02) {
var r = wdwPoolR(W.pool[0] + Math.cos(a), W.pool[1] + Math.sin(a)) + 1 + R() * 5, x = W.pool[0] + Math.cos(a) * r, z = W.pool[1] + Math.sin(a) * r;
shingle.push({ x: x, z: z, y: H(x, z) - 0.05, s: 0.12 + R() * 0.2, sy: 0.06 + R() * 0.08, ry: R() * 6 });
}
wdwPlant(G, "rock", shingle, { mat: wdwMat("granite") });
var rush = [];
for (a = 0; a < 6.283; a += lite ? 0.07 : 0.03) {
if (R() < 0.4)
continue;
var rr = wdwPoolR(W.pool[0] + Math.cos(a), W.pool[1] + Math.sin(a)) - 1 - R() * 4, rx = W.pool[0] + Math.cos(a) * rr, rz = W.pool[1] + Math.sin(a) * rr;
rush.push({ x: rx, z: rz, y: WDW_POOL_Y - 0.6, s: 0.8 + R() * 0.6, ry: R() * 6 });
}
wdwInst(G, wdwGeo("wdReed", function () { return wdwCards(3, 1.0, 2.0, 0); }), wdwLam(0xFFFFFF, { ds: 1, map: wdwReedTex("reed"), mapk: "reedT", cut: 0.4 }), rush, {});
var C = W.race, cy = H(C[0], C[1]), ring = [];
for (a = 0; a < 6.283; a += 0.12)
ring.push({ x: C[0] + Math.cos(a) * 12, z: C[1] + Math.sin(a) * 12, y: H(C[0] + Math.cos(a) * 12, C[1] + Math.sin(a) * 12), s: 0.18, sy: 0.12, ry: a });
wdwPlant(G, "rock", ring, { mat: wdwMat("marble") });
wdwSpot(C[0], C[1], 13, "The caucus-race course", "look at the course", function () { setStatus("🏁 <b>The race-course,</b> marked out in a sort of circle. (“the exact shape doesn't matter”)"); });
Object.keys(WDW_WO_PATHS).forEach(function (k) { wdwStrip(G, WDW_WO_PATHS[k], k === "shore" ? 2.4 : 1.8, H, wdwMat("trail"), 0.04); });
var offP = function (x, z) { return Object.keys(WDW_WO_PATHS).every(function (k) { return wdwPathD(x, z, WDW_WO_PATHS[k]) > 2.6; }); };
var dryL = function (x, z) { return Math.hypot(x - W.pool[0], z - W.pool[1]) > wdwPoolR(x, z) + 12; };
var away = function (x, z, list) { return list.every(function (p) { return Math.hypot(x - p[0], z - p[1]) > p[2]; }); };
var clear = [[W.rabbit[0], W.rabbit[1], 30], [W.shroom[0], W.shroom[1], 18], [W.duchess[0], W.duchess[1], 26], [W.cat[0], W.cat[1], 16], [W.hare[0], W.hare[1] + 20, 40], [W.door[0], W.door[1], 10], [W.race[0], W.race[1], 20], [W.puppy[0], W.puppy[1], 14]];
var ok = function (x, z) { return dryL(x, z) && offP(x, z) && away(x, z, clear); };
var inWood = function (x, z) { var d = Math.hypot(x - W.wood[0], z - W.wood[1]); return d < 260 || (x > 560 && x < 760 && z < -60 && z > -260); };
wdxTrees(G, "oak", wdwScatter(402, lite ? 110 : 340, -260, -300, 780, 300, function (x, z) { return ok(x, z) && inWood(x, z); }, H, 0.9, 1.5), [0x3E6A2A, 0x4A7A2E, 0x2E5A24]);
wdxTrees(G, "maple", wdwScatter(403, lite ? 60 : 180, -260, -300, 780, 300, function (x, z) { return ok(x, z) && inWood(x, z); }, H, 0.9, 1.4), [0x4A7A30, 0x5A8A36]);
wdxTrees(G, "birch", wdwScatter(404, lite ? 30 : 90, -260, -300, 780, 300, function (x, z) { return ok(x, z) && inWood(x, z); }, H, 0.8, 1.2), [0x6A9A3A]);
wdxBracken(G, wdwScatter(405, lite ? 260 : 1400, -260, -300, 780, 300, function (x, z) { return ok(x, z) && inWood(x, z); }, H, 0.7, 1.3));
wdwPlant(G, "flowers", wdwScatter(408, lite ? 200 : 1200, -260, -300, 780, 300, function (x, z) { return ok(x, z) && inWood(x, z); }, H, 0.4, 0.7), { col: "#6070D8", keepAll: 1 });
wdwPlant(G, "bush", wdwScatter(406, lite ? 80 : 260, -900, -900, 900, 900, function (x, z) { return ok(x, z); }, H, 0.6, 1.3), { col: 0x3E6A2A });
wdxTrees(G, "oak", wdwScatter(407, lite ? 40 : 120, -900, -900, 900, 900, function (x, z) { return ok(x, z) && !inWood(x, z) && Math.hypot(x - W.pool[0], z - W.pool[1]) > 140; }, H, 0.9, 1.4), [0x4E7A30, 0x5A8A36]);
wdxMeadow(G, -900, -900, 900, 900, H, function (x, z) { return ok(x, z) && !inWood(x, z); }, 410, { dens: 1.6 });
wdxMeadow(G, -260, -300, 780, 300, H, function (x, z) { return ok(x, z) && inWood(x, z); }, 420, { dens: 0.5, poppies: false });
var tall = wdwScatter(430, lite ? 50 : 160, -260, -300, 780, 300, function (x, z) { return ok(x, z); }, H, 1, 1);
tall.forEach(function (t, i) { if (i % 3 === 0)
wdxThistle(G, t.x, t.z, t.y, 1 + R() * 0.6);
else
wdxFoxglove(G, t.x, t.z, t.y, 1 + R() * 0.8, [0xC860A8, 0xE8E0F0, 0xD870B8][i % 3]); });
for (var tr = 0; tr < (lite ? 6 : 18); tr++) {
var tx = -200 + R() * 900, tz = -260 + R() * 520;
if (!ok(tx, tz))
continue;
for (var tk = 0; tk < 7; tk++) {
var ta = tk / 7 * 6.283;
wdxShroom(G, tx + Math.cos(ta) * 1.6, tz + Math.sin(ta) * 1.6, H(tx, tz), 0.18 + R() * 0.12, { cap: [0xC83A2A, 0xD8A040, 0xE8D8C0][tr % 3], spots: tr % 3 === 0, noSolid: 1 });
}
}
wdxThistle(G, W.puppy[0] + 3, W.puppy[1] + 2, H(W.puppy[0] + 3, W.puppy[1] + 2), 1.6);
var S = W.shroom, sy = H(S[0], S[1]);
wdxShroom(G, S[0], S[1], sy, 0.3, { cap: 0xD8C8A8, gill: 0xC8A888, stem: 0xF0E8D8, noSolid: 1 });
for (var sm = 0; sm < 10; sm++) {
var sa = R() * 6.283, sr = 1.2 + R() * 3;
wdxShroom(G, S[0] + Math.cos(sa) * sr, S[1] + Math.sin(sa) * sr, sy, 0.08 + R() * 0.1, { cap: [0xC8A060, 0xE8D8C0, 0xA87A4A][sm % 3], noSolid: 1 });
}
wdwSpot(S[0], S[1], 1.2, "The great mushroom", "look over the edge", function () { setStatus("🍄 <b>The mushroom.</b> One side will make you grow taller, and the other side will make you grow shorter."); });
var Pg = W.pigeon;
wdxTrees(G, "oak", [{ x: Pg[0], z: Pg[1], y: H(Pg[0], Pg[1]), s: 1.7, ry: 1 }], [0x3E6A2A]);
var nest = new THREE.Group();
nest.position.set(Pg[0] + 3, H(Pg[0], Pg[1]) + 15, Pg[1]);
G.add(nest);
var nb = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.25, 6, 14), wdwMat("bark"));
nb.rotation.x = Math.PI / 2;
nest.add(nb);
for (var e = 0; e < 3; e++) {
var eg = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), wdwLam(0xE8E4F0));
eg.scale.y = 1.3;
eg.position.set((e - 1) * 0.15, 0.05, 0);
nest.add(eg);
}
wdwBkRabbit(G, H);
wdwWoDuchess(G, H);
wdwWoHare(G, H);
var K = W.cat, ky = H(K[0], K[1]);
wdxTrees(G, "oak", [{ x: K[0], z: K[1], y: ky, s: 1.3, ry: 2 }], [0x4A7A2E]);
var post = new THREE.Group();
post.position.set(K[0] + 6, ky, K[1] + 3);
G.add(post);
wdwCyl(post, 0.08, 0.1, 2.8, wdwMat("oak"), 0, 0, 0, 8);
wdwSign(post, "THE HATTER →", 1.6, 0.32, 0.8, 2.3, 0.1, 0.6, { bg: "#F2EAD4" });
wdwSign(post, "← THE MARCH HARE", 1.8, 0.32, -0.8, 1.9, 0.1, -0.4, { bg: "#F2EAD4" });
var D = W.door, dy = H(D[0], D[1]);
var big = new THREE.Group();
big.position.set(D[0], dy, D[1]);
G.add(big);
var trunk = new THREE.Mesh(wdwGeo("wdDoorTree", function () { var c = new THREE.CylinderGeometry(1.6, 2.4, 9, 14, 3); var p = c.attributes.position; for (var i = 0; i < p.count; i++) {
var y = p.getY(i);
p.setX(i, p.getX(i) * (1 + Math.sin(y * 1.3 + p.getZ(i)) * 0.06));
} c.computeVertexNormals(); c.translate(0, 4.5, 0); return c; }), wdwMat("bark"));
big.add(trunk);
wdxTrees(G, "oak", [{ x: D[0], z: D[1], y: dy - 2, s: 1.4, ry: 0 }], [0x3E6A2A]);
wdwBox(big, 0.8, 1.6, 0.12, wdwMat("darkoak"), 0, 0, 2.32);
wdwBox(big, 1.0, 0.1, 0.16, wdwMat("oak"), 0, 1.6, 2.34);
wdwBox(big, 0.06, 0.06, 0.04, wdwMat("brass"), 0.28, 0.8, 2.4);
wdwRound(D[0], D[1], 2.4, dy - 1, dy + 9);
wdwSpot(D[0], D[1] + 3, 2.0, "The tree with a door leading right into it", "go in", function () { if (typeof wdbNote === "function")
wdbNote("treedoor"); wdwGo({ sc: "hall", x: 0, z: -3, ry: 0 }, "🚪 <b>The long hall again,</b> and close to the little glass table."); });
var crowdK = ["mouse", "dormouse", "hedgehog", "canary", "magpie", "duck", "pigeon"];
var wild = wdwScatter(440, lite ? 10 : 28, -500, -300, 700, 300, function (x, z) { return ok(x, z); }, H, 1, 1);
wild.forEach(function (t, i) { var c = wdwCreature(crowdK[i % crowdK.length], "wild" + i); c.position.set(t.x, t.y, t.z); c.rotation.y = t.ry; c.scale.multiplyScalar(0.7); G.add(c); var Pw = { g: c, y: t.y, o: { wander: 4, sp: 0.2 } }; WDW.people.push(Pw); var nm = { mouse: "A little mouse", dormouse: "A sleepy dormouse", hedgehog: "A hedgehog", canary: "A canary", magpie: "An old magpie", duck: "A duck", pigeon: "A wood-pigeon" }[crowdK[i % crowdK.length]]; if (typeof WDP !== "undefined" && WDP.creature)
wdwTalk(Pw, nm, WDP.creature, ["Have you seen the White Rabbit? He was in a dreadful hurry.", "I must be getting home; the night-air doesn't suit my throat!", "The Duchess? She's in a temper again, I hear.", "Mind the Queen. Off with their heads, she says.", "Curiouser and curiouser, isn't it?", "It's always six o'clock up at the Hare's house."][i % 6], 2.4); });
wdwGlade(G, H, W.shroom[0], W.shroom[1], 16, 470, { keep: 4, dens: 2.6 });
wdwGlade(G, H, W.puppy[0], W.puppy[1], 14, 480, { keep: 3 });
wdwGlade(G, H, W.duchess[0], W.duchess[1], 24, 490, { keep: 7, bells: "#F4E8F8" });
wdwGlade(G, H, W.cat[0], W.cat[1], 14, 500, { keep: 3 });
wdwGlade(G, H, W.rabbit[0], W.rabbit[1], 28, 510, { keep: 10, noFox: 0 });
wdwGlade(G, H, W.hare[0], W.hare[1] + 18, 38, 520, { keep: 14, bells: "#F0D040" });
wdwGlade(G, H, W.door[0], W.door[1], 10, 530, { keep: 3 });
wdwGlade(G, H, W.race[0], W.race[1], 18, 540, { keep: 13, noTrees: 1 });
wdwGlade(G, H, W.pigeon[0], W.pigeon[1], 12, 550, { keep: 3 });
wdwFar(G, H, null, { edge: 900 });
},
function (G, H) {
var B = WDW_WO.rabbit, by = H(B[0], B[1]), lite = wdwLite();
wdwTownHouse(G, B[0], B[1], 7, 5.5, 4.6, { y: by, ry: Math.PI, wall: "brick", roof: "tile", shut: 0x2A5A3A, trim: "ashlar" });
wdwSign(G, "W. RABBIT", 0.5, 0.14, B[0] + 0.0, by + 1.55, B[1] - 2.84, Math.PI, { bg: "#E8C048", ink: "#3A2A0A" });
var Dr = function (key, x, z, ry, nm) { var Rm = WDW.rooms.filter(function (q) { return q.key === key; })[0]; if (Rm)
wdwDoor(Rm, nm, x, z, ry); };
Dr("rabhall", B[0], B[1] - 4.0, Math.PI, "The door with the brass plate, W. RABBIT");
var gx = B[0], gz = B[1] + 7, gy = H(gx, gz);
var cf = new THREE.Group();
cf.position.set(gx + 1.5, gy, gz);
G.add(cf);
wdwBox(cf, 2.4, 0.4, 1.2, wdwMat("planks"), 0, 0, 0);
var gl = wdwBox(cf, 2.3, 0.04, 1.1, wdwMat("glass"), 0, 0.5, 0);
gl.rotation.x = -0.25;
for (var c = 0; c < 5; c++)
wdwPlant(cf, "bush", [{ x: -0.9 + c * 0.45, y: 0.2, z: 0, s: 0.25 }], { col: 0x4A8A3A });
if ((WDW.st || {}).frame) {
for (var sh = 0; sh < 6; sh++) {
var s = wdwBox(G, 0.2, 0.01, 0.15, wdwMat("glass"), gx + 1 + Math.random() * 1.5, gy + 0.02, gz - 0.8);
}
}
var lad = new THREE.Group();
lad.position.set(B[0] - 2.6, by, B[1] + 2.9);
lad.rotation.x = -0.2;
G.add(lad);
[-0.25, 0.25].forEach(function (x) { wdwBox(lad, 0.06, 4.4, 0.06, wdwMat("oak"), x, 0, 0); });
for (var r = 0; r < 9; r++)
wdwBox(lad, 0.5, 0.04, 0.04, wdwMat("oak"), 0, 0.4 + r * 0.45, 0);
wdwCart(G, gx - 3, gz + 2, 1.2, { len: 1.2 });
wdwPaling(G, [[B[0] - 6, B[1] - 4], [B[0] - 6, B[1] + 12], [B[0] + 6, B[1] + 12], [B[0] + 6, B[1] - 4]], H, {});
wdwPlant(G, "flowers", wdwScatter(450, lite ? 20 : 60, B[0] - 5, B[1] + 4, B[0] + 5, B[1] + 11, null, H, 0.5, 0.8), { col: "#E8A030" });
wdwPlant(G, "flowers", wdwScatter(451, lite ? 20 : 60, B[0] - 5, B[1] - 6, B[0] + 5, B[1] - 3, null, H, 0.5, 0.8), { col: "#F4F0F8" });
},
function (G) {
var X = WDW_ROOMXZ.wonder, R, st = WDW.st || {};
R = wdwRoom(G, "rabhall", X.rabhall[0], X.rabhall[1], 5, 4, { wall: "greenpaper", floor: "floor", name: "the White Rabbit's hall", h: 2.6, lightI: 0.7 });
for (var s = 0; s < 8; s++) {
wdwBox(R.g, 1.0, s * 0.3 + 0.16, 0.28, wdwMat("planks"), 1.6, 0, 1.0 - s * 0.3);
wdwBox(R.g, 1.04, 0.04, 0.32, wdwMat("oak"), 1.6, s * 0.3 + 0.16, 1.0 - s * 0.3);
}
wdwBox(R.g, 0.06, 2.6, 2.6, wdwMat("darkoak"), 1.08, 0, -0.05);
for (var bl = 0; bl < 8; bl++)
wdwBox(R.g, 0.03, 0.8, 0.03, wdwMat("darkoak"), 1.12, bl * 0.3 + 0.2, 1.0 - bl * 0.3);
var rail = wdwBox(R.g, 0.06, 0.06, 2.6, wdwMat("darkoak"), 1.12, 1.95, -0.05);
rail.rotation.x = 0.82;
wdfPegs(R.g, -2.4, 1.5, 0.4, Math.PI / 2, ["coat", "hat", "coat"]);
wdfClock(R.g, -2.4, 0, -1.2, Math.PI / 2);
wdwRug(R.g, -0.4, 0.4, 1.6, 2.6, 0x6A2A2A);
wdwPicture(R.g, -0.6, 1.6, -1.86, 0, 0.6, 0.5);
wdwCyl(R.g, 0.12, 0.12, 0.6, wdwLam(0x3A3A3A), -2.1, 0, 1.4, 10);
R = wdwRoom(G, "rabroom", X.rabroom[0], X.rabroom[1], 4.4, 3.6, { wall: "bluepaper", floor: "floor", name: "the tidy little room upstairs", h: 2.7, lightI: 0.75 });
wdwTable(R.g, 0, -1.3, 1.2, 0.6, 0.72, { cloth: 0xF0E8E0 });
wdwWindowIn(R.g, 0, 1.5, -1.76, 0, 1.0, 1.0, { sky: 0xA8D0E8 });
if (!st.fanTaken2) {
var fan = new THREE.Group();
fan.position.set(-0.2, 0.74, -1.3);
R.g.add(fan);
for (var f = 0; f < 9; f++) {
var vn = wdwBox(fan, 0.02, 0.004, 0.24, wdwLam(0xF4ECE0), Math.sin((f - 4) * 0.16) * 0.12, 0, Math.cos((f - 4) * 0.16) * 0.12);
vn.rotation.y = (f - 4) * 0.16;
}
}
[0, 0.14, 0.28].forEach(function (o) { var gv = wdwBox(R.g, 0.07, 0.015, 0.17, wdwLam(0xF6F2EA), 0.2 + o, 0.73, -1.3); gv.rotation.y = 0.2 + o; });
if (typeof wdxMirror === "function")
try {
wdxMirror(R.g, 1.9, 1.4, 0, 0.6, 0.9, -Math.PI / 2, {});
}
catch (e) { }
if (!st.drank2) {
var bt = wdwHallBottle(R.g, true);
bt.position.set(1.6, 0.72, 0.4);
bt.children.forEach(function (c) { if (c.material && c.material.map && /DRINK/.test(c.material.mapk || ""))
c.visible = false; });
wdwBox(R.g, 0.5, 0.72, 0.4, wdwMat("darkoak"), 1.7, 0, 0.4);
}
wdwBed(R.g, -1.5, 0.6, Math.PI / 2, { w: 1.0, l: 1.6 });
wdwHearth(R.g, -2.1, -0.6, Math.PI / 2, { h: R.h, mat: "brick" });
wdwInDoor("rabhall", "rabroom", 1.6, -1.6, "Up the stairs", "go up");
R = wdwRoom(G, "kitchen", X.kitchen[0], X.kitchen[1], 3.6, 3.0, { wall: "brick", floor: "setts", name: "the Duchess's kitchen", h: 1.5, dw: 0.55, dh: 1.0, beams: 0, lightI: 0.6, bare: 1 });
var k = new THREE.Group();
k.scale.setScalar(0.4);
k.position.set(0, 0, 0);
R.g.add(k);
wdwHearth(k, 0, -3.4, 0, { h: 3.6, mat: "stone", fire: 1 });
var pot = new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 10, 0, 6.3, 0.6, 2.5), wdwLam(0x1A1A1A));
pot.position.set(0, 0.9, -2.8);
k.add(pot);
wdwCyl(k, 0.48, 0.48, 0.04, wdwShine(0x6A5A2A, 0.2, 0), 0, 1.22, -2.8, 14);
wdwTable(k, 2.6, 0.2, 2.0, 1.0, 0.8, {});
wdfPlates(k, 2.6, 0.82, 0.2, 6, 1.6);
wdfDresser(k, -3.8, 0.6, Math.PI / 2, {});
wdfPlates(k, -3.7, 1.5, 0.6, 8, 1.5);
wdfStool(k, 0, 0.4, {});
wdfHang(k, -2.2, 3.2, -2.6, 5, 0x8A6A3A, 0.6);
wdfBucket(k, 3.6, -2.4);
for (var pp = 0; pp < 4; pp++) {
var pep = wdwCyl(k, 0.08, 0.1, 0.3, wdwLam(0x8A8A88), 2.0 + pp * 0.3, 0.8, -0.2, 8);
}
wdwCyl(k, 0.06, 0.06, 0.1, wdwLam(0xC8A040), 2.0, 1.1, -0.2, 8);
if (!wdwLite())
wdwSmoke(R.g, 0, 0.4, -0.8, 0x8A7A6A, 6);
R = wdwRoom(G, "harehouse", X.harehouse[0], X.harehouse[1], 4.6, 3.6, { wall: "greenpaper", floor: "floor", name: "the March Hare's parlour", h: 1.8, dw: 0.7, dh: 1.3, lightI: 0.6, bare: 1 });
var h = new THREE.Group();
h.scale.setScalar(0.5);
R.g.add(h);
wdfClock(h, 0, 0, -3.4, 0);
wdfSofa(h, -2, -2.6, 0, 0x8A6A3A);
wdwTable(h, 1.4, 0, 1.4, 0.9, 0.75, { cloth: 0xE8D8C0 });
wdwChair(h, 1.4, 1.0, Math.PI, {});
wdwHearth(h, 3.8, -1, -Math.PI / 2, { h: 3.4, mat: "brick" });
wdwShelves(h, -4.2, 0.8, 1.6, 2.2, Math.PI / 2, { jars: 1 });
wdwRug(h, -0.6, 0, 3, 2.4, 0x8A4A2A);
wdwPicture(h, -1, 1.8, -3.5, 0, 1.0, 0.8);
},
function (G, H) {
var A = WDW_WO.hare, ay = H(A[0], A[1]), g = new THREE.Group();
g.position.set(A[0], ay, A[1]);
g.rotation.y = Math.PI;
G.add(g);
wdwBox(g, 5, 2.0, 4, wdwMat("ochre"), 0, 0, 0);
wdwBox(g, 5.2, 0.12, 4.2, wdwMat("oak"), 0, 2.0, 0);
var fur = wdwM("wdFurRoof", function () { var t = wdwCanvas("wdFurT", 128, 128, function (c, W, Hh) { c.fillStyle = "#8A6A44"; c.fillRect(0, 0, W, Hh); var R = wRand(7); for (var i = 0; i < 1600; i++) {
var x = R() * W, y = R() * Hh;
c.strokeStyle = ["#A8865A", "#6A4A2A", "#C8A878", "#5A3A1E"][i % 4];
c.lineWidth = 1;
c.beginPath();
c.moveTo(x, y);
c.lineTo(x + (R() - 0.5) * 3, y + 5 + R() * 4);
c.stroke();
} }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 3); return new THREE.MeshLambertMaterial({ map: t }); });
var rf = new THREE.Mesh(wdwGeo("wdHareRoof", function () { var s = new THREE.Shape(); s.moveTo(-2.8, 0); s.quadraticCurveTo(-1.2, 1.9, 0, 2.0); s.quadraticCurveTo(1.2, 1.9, 2.8, 0); s.lineTo(-2.8, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 5.6, bevelEnabled: true, bevelSize: 0.15, bevelThickness: 0.15, bevelSegments: 2, curveSegments: 10 }); e.translate(0, 0, -2.8); e.rotateY(Math.PI / 2); return e; }), fur);
rf.position.y = 2.12;
g.add(rf);
[-0.9, 0.9].forEach(function (x, i) {
var ear = new THREE.Mesh(wdwGeo("wdEarChim", function () { var p = []; for (var k = 0; k <= 10; k++) {
var t = k / 10;
p.push(new THREE.Vector2(0.32 * Math.sin(Math.PI * Math.min(1, t * 1.08)) + 0.02, t * 2.4));
} return new THREE.LatheGeometry(p, 12); }), fur);
ear.scale.set(1, 1, 0.55);
ear.position.set(x, 3.4, 0.2);
ear.rotation.z = i ? -0.2 : 0.2;
g.add(ear);
var inner = new THREE.Mesh(wdwGeo("wdEarIn", function () { var c = new THREE.CircleGeometry(0.2, 12); c.scale(1, 4, 1); return c; }), wdwLam(0xD8A8A0, { ds: 1 }));
inner.position.set(x + (i ? 0.06 : -0.06), 4.4, 0.37);
inner.rotation.z = i ? -0.2 : 0.2;
g.add(inner);
});
wdwBox(g, 0.8, 1.3, 0.08, wdwMat("darkoak"), 0, 0, 2.03);
[-1.6, 1.6].forEach(function (x) { wdwBox(g, 0.8, 0.8, 0.06, wdwMat("pane"), x, 0.8, 2.03); wdwBox(g, 0.9, 0.08, 0.1, wdwMat("oak"), x, 0.75, 2.06); });
wdwSolid(A[0], A[1], 5.2, 4.2, ay - 1, ay + 5);
var Dr = WDW.rooms.filter(function (q) { return q.key === "harehouse"; })[0];
if (Dr)
wdwDoor(Dr, "The March Hare's door", A[0], A[1] - 2.6, Math.PI);
var T = WDW_WO.tea, ty = H(T[0], T[1]);
wdxTrees(G, "oak", [{ x: T[0] + 9, z: T[1] + 5, y: H(T[0] + 9, T[1] + 5), s: 1.4, ry: 0.4 }], [0x4A7A2E]);
var tb = new THREE.Group();
tb.position.set(T[0], ty, T[1]);
G.add(tb);
tb.scale.setScalar(0.5);
wdwBox(tb, 12, 0.08, 1.6, wdwLam(0xF4F0E6), 0, 0.78, 0);
for (var l = -5.6; l <= 5.6; l += 2.8)
[-0.6, 0.6].forEach(function (z) { wdwBox(tb, 0.1, 0.78, 0.1, wdwMat("oak"), l, 0, z); });
for (var cx = -5.4; cx <= 5.4; cx += 0.9)
[-1.1, 1.1].forEach(function (z) { wdwChair(tb, cx, z, z < 0 ? 0 : Math.PI, {}); });
wdwChair(tb, -6.6, 0, Math.PI / 2, { arm: 1 });
wdxTeaThings(tb, -5.6, 5.6, 0, 0.86, { seed: 11, gap: 0.55, w: 0.6, messy: true });
wdwSolid(T[0], T[1], 6.2, 1.3, ty - 1, ty + 0.45);
wdwSpot(T[0] - 3.3, T[1], 1.6, "The large arm-chair at one end of the table", "sit down", function () { setStatus("🪑 <b>You sit down in the large arm-chair.</b> “Have some wine,” the March Hare said in an encouraging tone."); });
},
function (P, list) {
if (!list.length)
return;
wdwInst(P, wdwGeo("wdBracken2", function () { var g = wdwFronds(7, 1.1, 0.42, 0.55, 0.05, 1.0); return typeof wdlTwoSided === "function" ? wdlTwoSided(g) : g; }), wdwM("wdBrackenM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x9AB870, map: wdwFrondTex("fern"), alphaTest: 0.4 }); m.userData.noPhoto = 1; return m; }), list, {});
},
function (P, list) {
list.forEach(function (t) {
var g = new THREE.Group();
g.position.set(t.x, t.y + 0.18 * t.s, t.z);
g.rotation.y = t.ry;
g.scale.setScalar(t.s);
P.add(g);
var lg = new THREE.Mesh(wdwGeo("wdLog", function () { var c = new THREE.CylinderGeometry(0.26, 0.32, 3.4, 9, 3); var p = c.attributes.position; for (var i = 0; i < p.count; i++) {
var y = p.getY(i);
p.setX(i, p.getX(i) * (1 + Math.sin(y * 2.1) * 0.05));
} c.rotateZ(Math.PI / 2); c.computeVertexNormals(); return c; }), wdwMat("bark"));
g.add(lg);
var moss = new THREE.Mesh(wdwGeo("wdLogMoss", function () { var c = new THREE.CylinderGeometry(0.3, 0.34, 2.6, 9, 1, true, -0.9, 1.8); c.rotateZ(Math.PI / 2); return c; }), wdwLam(0x5A8A34));
moss.position.y = 0.02;
g.add(moss);
var end = new THREE.Mesh(new THREE.CircleGeometry(0.31, 9), wdwLam(0xC8A878));
end.position.x = 1.71;
end.rotation.y = Math.PI / 2;
g.add(end);
});
},
function (G, H, x, z, r, seed, o) {
o = o || {};
var lite = wdwLite(), keep = o.keep || 0, P = WDW_WO_PATHS;
var off = function (px, pz) { return Object.keys(P).every(function (k) { return wdwPathD(px, pz, P[k]) > 2.4; }); };
var dryP = function (px, pz) { return Math.hypot(px - WDW_WO.pool[0], pz - WDW_WO.pool[1]) > wdwPoolR(px, pz) + 10; };
var ring = function (a, b) { return function (px, pz) { var d = Math.hypot(px - x, pz - z); return d > a && d < b && off(px, pz) && dryP(px, pz); }; };
if (!o.noTrees) {
var T = wdwScatter(seed, lite ? Math.round(r * 0.35) : Math.round(r * 1.1), x - r - 22, z - r - 22, x + r + 22, z + r + 22, ring(r + 3, r + 22), H, 0.85, 1.35);
wdxTrees(G, "oak", T.filter(function (t, i) { return i % 3 === 0; }), [0x3E6A2A, 0x4A7A2E]);
wdxTrees(G, "maple", T.filter(function (t, i) { return i % 3 === 1; }), [0x4A7A30, 0x5A8A36]);
wdxTrees(G, "birch", T.filter(function (t, i) { return i % 3 === 2; }), [0x6A9A3A]);
}
wdxMeadow(G, x - r, z - r, x + r, z + r, H, ring(keep, r), seed + 10, { dens: (o.dens || 2.2) * (r * r) / (900 * 900) * 60 });
wdxBracken(G, wdwScatter(seed + 20, lite ? Math.round(r * 0.8) : Math.round(r * 3), x - r - 8, z - r - 8, x + r + 8, z + r + 8, ring(Math.max(keep, r - 4), r + 8), H, 0.7, 1.3));
wdwPlant(G, "flowers", wdwScatter(seed + 30, lite ? Math.round(r * 1.5) : Math.round(r * 6), x - r - 6, z - r - 6, x + r + 6, z + r + 6, ring(Math.max(keep, r - 6), r + 6), H, 0.4, 0.7), { col: o.bells || "#6070D8", keepAll: 1 });
if (!o.noFox) {
var F = wdwScatter(seed + 40, lite ? 3 : Math.round(r * 0.6), x - r, z - r, x + r, z + r, ring(Math.max(keep, r - 5), r + 3), H, 1, 1);
F.forEach(function (t, i) { wdxFoxglove(G, t.x, t.z, t.y, 0.9 + (i % 4) * 0.2, [0xC860A8, 0xE8E0F0, 0xD870B8][i % 3]); });
}
if (!lite) {
wdxLogs(G, wdwScatter(seed + 50, 2, x - r, z - r, x + r, z + r, ring(Math.max(keep + 2, r - 6), r + 4), H, 0.8, 1.2));
wdxMossy(G, wdwScatter(seed + 60, 5, x - r, z - r, x + r, z + r, ring(Math.max(keep + 1, r - 8), r + 6), H, 0.3, 0.7));
}
},
function (P, x, z, y, ry, sc, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.scale.setScalar(sc);
P.add(g);
var w = o.w || 8.4, d = o.d || 6.2, h = 2.9, lite = wdwLite(), plaster = wdwLam(o.wall || 0xEDE2C8), oak = wdwMat("darkoak"), stone = wdwMat("greystone"), pane = wdwMat("pane");
wdwBox(g, w + 0.3, 0.5, d + 0.3, stone, 0, -0.05, 0);
wdwBox(g, w, h, d, plaster, 0, 0.45, 0);
var beam = function (bw, bh, bd, bx, by, bz, rz, ryy) { var m = wdwBox(g, bw, bh, bd, oak, bx, by, bz); if (rz) {
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
[d / 2, -d / 2].forEach(function (gz) { var gm = new THREE.Mesh(wdwGeo("wdGab" + w, function () { var s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(0, rh * 0.92); s.lineTo(w / 2, 0); s.lineTo(-w / 2, 0); return new THREE.ShapeGeometry(s); }), wdwLam(o.wall || 0xEDE2C8, { ds: 1 })); gm.position.set(0, h + 0.45, gz + (gz > 0 ? 0.01 : -0.01)); g.add(gm); });
var th = new THREE.Mesh(wdwGeo("wdThatch" + w + "|" + d, function () {
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
}), wdwThatchM());
th.position.y = h + 0.45;
g.add(th);
var rg = new THREE.Mesh(wdwGeo("wdRidge" + d, function () { var c = new THREE.CylinderGeometry(0.28, 0.28, d + 1.6, 10); c.rotateX(Math.PI / 2); return c; }), wdwLam(0x8A7040));
rg.position.y = h + 0.45 + rh - 0.02;
g.add(rg);
var cx = o.chimX != null ? o.chimX : -w / 2 + 0.9;
wdwBox(g, 1.1, h + rh + 1.5, 0.9, wdwMat("brick"), cx, 0, 0.0);
wdwBox(g, 1.3, 0.18, 1.1, stone, cx, h + rh + 1.5, 0);
[-0.25, 0.25].forEach(function (px) { wdwCyl(g, 0.13, 0.16, 0.55, wdwLam(0xB0603A), cx + px, h + rh + 1.68, 0, 10); });
if (!lite && o.smoke !== false)
wdwSmoke(g, cx, h + rh + 2.4, 0, 0x9A8A7A, 5);
var win = function (wx, wy, wz, face) {
var gw = new THREE.Group();
gw.position.set(wx, wy, wz);
gw.rotation.y = face;
g.add(gw);
wdwBox(gw, 1.25, 1.1, 0.1, oak, 0, 0, 0.02);
wdwBox(gw, 1.05, 0.9, 0.04, pane, 0, 0.1, 0.07);
for (var i = 1; i < 4; i++)
wdwBox(gw, 0.025, 0.9, 0.03, wdwLam(0x3A3A3A), -0.525 + i * 0.2625, 0.1, 0.1);
for (var j = 1; j < 3; j++)
wdwBox(gw, 1.05, 0.025, 0.03, wdwLam(0x3A3A3A), 0, 0.1 + j * 0.3, 0.1);
wdwBox(gw, 1.4, 0.1, 0.22, oak, 0, -0.05, 0.12);
wdwBox(gw, 1.2, 0.26, 0.26, wdwLam(0x6A4A2A), 0, -0.33, 0.22);
if (!lite)
for (var f = 0; f < 7; f++) {
var fl = new THREE.Mesh(wdwGeo("wdWbF", function () { return new THREE.SphereGeometry(0.08, 6, 5); }), wdwLam([0xD8283A, 0xF4E8F0, 0xE8A020, 0xC860A8][f % 4]));
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
wdwBox(dg, 1.25, 2.25, 0.12, oak, 0, 0, -0.02);
for (var p = 0; p < 4; p++)
wdwBox(dg, 0.24, 2.05, 0.05, wdwLam([0x5A3A22, 0x4A3020][p % 2]), -0.36 + p * 0.24, 0.02, 0.05);
[0.4, 1.6].forEach(function (hy) { wdwBox(dg, 0.7, 0.06, 0.03, wdwLam(0x1A1A1A), -0.14, hy, 0.09); });
wdwBox(dg, 0.06, 0.06, 0.06, wdwMat("brass"), 0.38, 1.0, 0.1);
var hood = new THREE.Mesh(wdwGeo("wdHood", function () { var s = new THREE.Shape(); s.moveTo(-0.95, 0); s.lineTo(0, 0.6); s.lineTo(0.95, 0); s.lineTo(-0.95, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 0.8, bevelEnabled: false }); return e; }), wdwThatchM());
hood.position.set(0, 2.35, -0.1);
dg.add(hood);
wdwBox(g, 1.7, 0.18, 0.8, stone, doorX, 0, d / 2 + 0.5);
return g;
},
function (G, H) {
var D = WDW_WO.duchess, dy = H(D[0], D[1]), lite = wdwLite(), sc = 0.42;
var g = wdwCottage(G, D[0], D[1], dy, Math.PI, sc, { w: 8.4, d: 6.2, wall: 0xEADCC0 });
var plate = new THREE.Group();
plate.position.set(D[0] + 0.6, dy + 0.01, D[1] - 2.1);
G.add(plate);
[0, 1, 2].forEach(function (i) { var sh = new THREE.Mesh(new THREE.CircleGeometry(0.16, 10, i * 2.1, 1.6), wdwLam(0xF4F2EC, { ds: 1 })); sh.rotation.x = -Math.PI / 2; sh.position.set((i - 1) * 0.18, 0.005, (i % 2) * 0.1); plate.add(sh); });
wdwSolid(D[0], D[1], 8.4 * sc + 0.1, 6.2 * sc + 0.1, dy - 1, dy + 3, 0);
var Dr = WDW.rooms.filter(function (q) { return q.key === "kitchen"; })[0];
if (Dr)
wdwDoor(Dr, "The door of the Duchess's house", D[0], D[1] - 1.9, Math.PI);
for (var s = 0; s < 6; s++) {
var st = new THREE.Mesh(wdwGeo("wdStep", function () { return new THREE.CylinderGeometry(0.22, 0.24, 0.06, 8); }), wdwMat("greystone"));
st.position.set(D[0] + (s % 2 ? 0.06 : -0.06), H(D[0], D[1] - 2.3 - s * 0.55) + 0.02, D[1] - 2.3 - s * 0.55);
G.add(st);
}
var fence = new THREE.Group();
G.add(fence);
var fz = D[1] - 5.4;
for (var fx = -3.4; fx <= 3.4; fx += 0.22) {
if (Math.abs(fx) < 0.45)
continue;
var pk = wdwBox(fence, 0.07, 0.5, 0.03, wdwLam(0xF0ECE0), D[0] + fx, H(D[0] + fx, fz), fz);
}
[0.22, 0.4].forEach(function (ry) { wdwBox(fence, 6.8, 0.04, 0.03, wdwLam(0xE8E4D8), D[0], H(D[0], fz) + ry, fz - 0.02); });
[-1, 1].forEach(function (sd) { for (var zz = D[1] - 5.0; zz < D[1] + 2.6; zz += 0.22) {
wdwBox(fence, 0.03, 0.5, 0.07, wdwLam(0xF0ECE0), D[0] + sd * 3.4, H(D[0] + sd * 3.4, zz), zz);
} });
var holly = wdwScatter(461, lite ? 6 : 22, D[0] - 3.1, D[1] - 5.1, D[0] + 3.1, D[1] - 1.9, function (x, z) { return Math.abs(x - D[0]) > 0.7; }, H, 1, 1);
holly.forEach(function (t, i) { wdxFoxglove(G, t.x, t.z, t.y, 0.55 + (i % 3) * 0.12, [0xE8A0B8, 0xF4F0F0, 0xC83A5A, 0xF0D060][i % 4]); });
wdwPlant(G, "flowers", wdwScatter(462, lite ? 20 : 70, D[0] - 3.2, D[1] - 5.2, D[0] + 3.2, D[1] + 2.4, function (x, z) { return (Math.abs(x - D[0]) > 1.9 || Math.abs(z - D[1]) > 1.5) && Math.abs(x - D[0]) > 0.5; }, H, 0.25, 0.4), { col: "#E8C040", keepAll: 1 });
wdwBox(G, 0.8, 0.2, 0.3, wdwMat("oak"), D[0] + 1.0, dy + 0.2, D[1] - 1.8);
},
function (G) {
var H = wdwWonderH, W = WDW_WO, lite = wdwLite(), P = WDW_WO_PATHS;
var woodWays = ["wood", "duch", "fork", "hatter", "hare"].map(function (k) { return P[k]; });
var near = function (x, z, a, b) { var d = 1e9; woodWays.forEach(function (p) { d = Math.min(d, wdwPathD(x, z, p)); }); return d > a && d < b; };
var clear = [[W.rabbit[0], W.rabbit[1], 34], [W.shroom[0], W.shroom[1], 20], [W.duchess[0], W.duchess[1], 30], [W.cat[0], W.cat[1], 18], [W.hare[0], W.hare[1] + 20, 46], [W.door[0], W.door[1], 10], [W.puppy[0], W.puppy[1], 16], [W.pigeon[0], W.pigeon[1], 10], [W.race[0], W.race[1], 24]];
var open = function (x, z) { return clear.every(function (c) { return Math.hypot(x - c[0], z - c[1]) > c[2]; }) && Math.hypot(x - W.pool[0], z - W.pool[1]) > wdwPoolR(x, z) + 14; };
var inWood = function (x, z) { var d = Math.hypot(x - W.wood[0], z - W.wood[1]); return d < 300 || (x > 540 && x < 780 && z < -40 && z > -280); };
var ok = function (a, b) { return function (x, z) { return open(x, z) && inWood(x, z) && near(x, z, a, b); }; };
wdxTrees(G, "oak", wdwScatter(601, lite ? 90 : 420, -260, -320, 800, 320, ok(5, 40), H, 1.0, 1.7), [0x3A6426, 0x46742C, 0x2E5622]);
wdxTrees(G, "maple", wdwScatter(602, lite ? 50 : 240, -260, -320, 800, 320, ok(5, 40), H, 0.9, 1.5), [0x4A7A2E, 0x3E6A28]);
wdxTrees(G, "birch", wdwScatter(603, lite ? 24 : 110, -260, -320, 800, 320, ok(4, 30), H, 0.8, 1.3), [0x6A9A3A, 0x5A8A34]);
wdxTrees(G, "pine", wdwScatter(604, lite ? 16 : 70, -260, -320, 800, 320, ok(14, 60), H, 1.0, 1.5), [0x2E4A26]);
if (!lite)
wdxTrees(G, "oak", wdwScatter(605, 300, -260, -320, 800, 320, ok(40, 90), H, 1.0, 1.6), [0x34602A, 0x2E5622]);
wdwPlant(G, "bush", wdwScatter(611, lite ? 120 : 520, -260, -320, 800, 320, ok(2.4, 30), H, 0.6, 1.4), { col: 0x355E26, keepAll: 1 });
wdwPlant(G, "bush", wdwScatter(612, lite ? 40 : 200, -260, -320, 800, 320, ok(3, 26), H, 0.5, 1.0), { col: 0x1E3E1A, keepAll: 1 });
wdxBracken(G, wdwScatter(613, lite ? 300 : 1800, -260, -320, 800, 320, ok(1.6, 24), H, 0.6, 1.4));
var fx = wdwScatter(614, lite ? 20 : 90, -260, -320, 800, 320, ok(2, 14), H, 1, 1);
fx.forEach(function (t, i) { wdxFoxglove(G, t.x, t.z, t.y, 0.8 + (i % 5) * 0.15, [0xC860A8, 0xE8E0F0, 0xB04898][i % 3]); });
wdwPlant(G, "flowers", wdwScatter(615, lite ? 120 : 700, -260, -320, 800, 320, ok(1.5, 22), H, 0.4, 0.7), { col: "#6A78E0", keepAll: 1 });
wdxLogs(G, wdwScatter(616, lite ? 10 : 46, -260, -320, 800, 320, ok(3, 30), H, 0.8, 1.4));
if (typeof wdxMossy === "function")
wdxMossy(G, wdwScatter(617, lite ? 12 : 60, -260, -320, 800, 320, ok(2.5, 30), H, 0.3, 0.8));
var lv = wdwScatter(618, lite ? 300 : 2400, -260, -320, 800, 320, function (x, z) { return open(x, z) && inWood(x, z) && near(x, z, 1.2, 30); }, H, 0.5, 1.1);
var leafG = wdwGeo("wdcLitter", function () { var p = new THREE.PlaneGeometry(1.4, 1.4); p.rotateX(-Math.PI / 2); return p; });
[0x8A6A3A, 0x6A4E2A, 0xA0783A].forEach(function (c, i) {
var part = lv.filter(function (t, j) { return j % 3 === i; }).map(function (t) { return { x: t.x, z: t.z, y: t.y + 0.03 + i * 0.004, s: t.s, ry: t.ry }; });
wdwInst(G, leafG, wdwM("wdcLitM" + c, function () { var m = new THREE.MeshLambertMaterial({ color: c, map: wdwLeafTex(), alphaTest: 0.45, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), part, {});
});
if (!lite && typeof wdxShaft === "function") {
var R = wRand(619);
woodWays.forEach(function (p) {
for (var i = 0; i < p.length - 1; i++) {
if (R() < 0.35)
continue;
var a = p[i], b = p[i + 1], t = R(), x = a[0] + (b[0] - a[0]) * t + (R() - 0.5) * 8, z = a[1] + (b[1] - a[1]) * t + (R() - 0.5) * 8, y = H(x, z);
try {
wdxShaft(G, x, y + 16, z, 18, 0.6, 2.6, 0xFFF2C8, 0.09, x + 3, y, z + 2);
}
catch (e) { }
}
});
}
},
function (G) {
var H = wdwWonderH, W = WDW_WO, lite = wdwLite(), R = wRand(631), P = WDW_WO_PATHS;
var inWood = function (x, z) { return Math.hypot(x - W.wood[0], z - W.wood[1]) < 300 || (x > 540 && x < 780 && z < -40 && z > -280); };
var offP = function (x, z, m) { return Object.keys(P).every(function (k) { return wdwPathD(x, z, P[k]) > (m || 4); }); };
var clear = [[W.rabbit[0], W.rabbit[1], 34], [W.race[0], W.race[1], 26], [W.hare[0], W.hare[1] + 20, 46], [W.duchess[0], W.duchess[1], 30]];
var ok = function (x, z) { return !inWood(x, z) && offP(x, z) && Math.hypot(x - W.pool[0], z - W.pool[1]) > wdwPoolR(x, z) + 16 && clear.every(function (c) { return Math.hypot(x - c[0], z - c[1]) > c[2]; }); };
var oaks = [], ash = [], bush = [];
for (var c = 0; c < (lite ? 14 : 44); c++) {
var cx = -860 + R() * 1720, cz = -860 + R() * 1720;
if (!ok(cx, cz))
continue;
var n = 5 + (R() * 8 | 0), r = 10 + R() * 16;
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = Math.sqrt(R()) * r, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
if (!ok(x, z))
continue;
(i % 3 ? oaks : ash).push({ x: x, z: z, y: H(x, z), s: 0.9 + R() * 0.7, ry: R() * 6 });
}
for (i = 0; i < n * 2; i++) {
a = R() * 6.283;
x = cx + Math.cos(a) * (r + 2 + R() * 4);
z = cz + Math.sin(a) * (r + 2 + R() * 4);
if (ok(x, z))
bush.push({ x: x, z: z, y: H(x, z), s: 0.6 + R() * 0.8, ry: R() * 6 });
}
}
for (var h = 0; h < (lite ? 6 : 18); h++) {
var x0 = -860 + R() * 1720, z0 = -860 + R() * 1720, ang = R() * 6.283, L = 80 + R() * 160, step = lite ? 3 : 1.8;
for (var t = 0; t < L; t += step) {
var x = x0 + Math.cos(ang) * t, z = z0 + Math.sin(ang) * t;
if (!ok(x, z))
continue;
bush.push({ x: x, z: z, y: H(x, z), s: 0.9 + R() * 0.6, ry: R() * 6 });
if (R() < 0.05)
oaks.push({ x: x, z: z, y: H(x, z), s: 1 + R() * 0.5, ry: R() * 6 });
}
}
wdxTrees(G, "oak", oaks, [0x3E6A2A, 0x4A7A2E, 0x46742C]);
wdxTrees(G, "maple", ash, [0x4E7E30, 0x5A8A36]);
wdwPlant(G, "bush", bush, { col: 0x355E26, keepAll: 1 });
},
function (x, z) {
var n = wdwFbm(x * 0.01, z * 0.01, 2), C = WDW_GA.cro;
if (x > 430) {
var t = wdwSmooth(430, 560, x);
return (0.4 + n * 0.6) * (1 - t) + (-1.6 - (x - 560) * 0.02) * t;
}
var h = 0.4 + n * 0.5 * wdwSmooth(140, 420, Math.hypot(x, z - 80));
if (Math.abs(x - C[0]) < 46 && Math.abs(z - C[1]) < 34)
h += 0.32 * Math.sin((z - C[1]) * 0.9) * Math.cos((x - C[0]) * 0.15);
return h;
},
function (G) {
var H = wdwGardenH, lite = wdwLite(), R = wRand(501), st = WDW.st || {}, A = WDW_GA;
wdwTerrain(G, -760, -760, 1520, 1520, lite ? 8 : 4, H, wdwMat("meadow"), function (x, z, y, c) {
var g = 0.84 + wdwFbm(x * 0.04, z * 0.04, 2) * 0.16;
var C = A.cro;
if (x > 500) {
var wet = wdwSmooth(528, 552, x), rip = 0.95 + 0.05 * wdwFbm(x * 0.4, z * 0.12, 2), sh = wdwFbm(x * 0.03, z * 0.03, 2);
c.setRGB((0.8 - 0.24 * wet - 0.06 * sh) * g * rip, (0.74 - 0.24 * wet - 0.06 * sh) * g * rip, (0.58 - 0.18 * wet - 0.04 * sh) * g * rip);
}
else if (x > 440) {
var t2 = wdwSmooth(440, 500, x);
c.setRGB((0.34 + 0.5 * t2) * g, (0.5 + 0.28 * t2) * g, (0.22 + 0.38 * t2) * g);
}
else if (Math.abs(x - C[0]) < 50 && Math.abs(z - C[1]) < 38) {
var rg = Math.sin((z - C[1]) * 0.9) * Math.cos((x - C[0]) * 0.15), bare = wdwFbm(x * 0.3, z * 0.3, 2) > 0.62 && rg < -0.2 ? 1 : 0;
if (bare)
c.setRGB(0.42 * g, 0.34 * g, 0.22 * g);
else
c.setRGB((0.3 + 0.08 * rg) * g, (0.5 + 0.1 * rg) * g, (0.2 + 0.05 * rg) * g);
}
else {
var dry = wdwFbm(x * 0.006, z * 0.006, 2), pat = wdwFbm(x * 0.05 + 3, z * 0.05, 2);
c.setRGB((0.26 + 0.1 * dry + 0.04 * pat) * g, (0.44 + 0.06 * pat) * g, (0.17 + 0.03 * dry) * g);
}
});
wdwWater(G, 700, 0, 300, 1520, -1.4, 0x4A7A98, 0.85);
var wallM = wdwMat("brick");
for (var wx = -300; wx <= 300; wx += 20) {
if (Math.abs(wx) < 3)
continue;
wdwBox(G, 20, 4.5, 0.8, wallM, wx, H(wx, A.gate[1]) - 0.5, A.gate[1]);
wdwBox(G, 20.4, 0.3, 1.0, wdwMat("ashlar"), wx, H(wx, A.gate[1]) + 4, A.gate[1]);
}
wdwSolid(-150, A.gate[1], 296, 1, -2, 6);
wdwSolid(150, A.gate[1], 296, 1, -2, 6);
wdwBox(G, 0.5, 0.45, 0.9, wdwMat("darkoak"), 0, H(0, A.gate[1]), A.gate[1] - 0.1);
wdwBox(G, 1.6, 1.4, 1.2, wallM, 0, H(0, A.gate[1]) + 0.45, A.gate[1]);
var walks = [[[0, 316], [0, 180]], [[0, 80], [0, -120]], [[-120, 200], [120, 200]], [[60, 110], [200, 90], [380, 60], [500, 40]], [[-46, 110], [-46, -60]], [[46, 110], [46, -60]]];
walks.forEach(function (p) { wdwStrip(G, p, p.length > 2 ? 2.4 : 4, H, wdwMat("gravel"), 0.05); });
var offW = function (x, z) { return walks.every(function (p) { return wdwPathD(x, z, p) > 3.2; }); };
var inCro = function (x, z) { return Math.abs(x - A.cro[0]) < 52 && Math.abs(z - A.cro[1]) < 40; };
var nearPal = function (x, z) { return Math.abs(x - A.palace[0]) < 70 && z < -100 && z > -220; };
WDW.roseTree = wdxRoseTree(G, A.rose[0], A.rose[1], H(A.rose[0], A.rose[1]), { s: 1.8, col: "#F6F4EE", paint: st.painted ? "#C81A2A" : null });
var paint = new THREE.Group();
paint.position.set(A.rose[0] - 2, H(A.rose[0] - 2, A.rose[1]), A.rose[1] + 1.5);
G.add(paint);
wdwCyl(paint, 0.18, 0.16, 0.3, wdwLam(0x6A6A6A), 0, 0, 0, 12);
wdwCyl(paint, 0.16, 0.16, 0.02, wdwLam(0xC81A2A), 0, 0.28, 0, 12);
for (var b = 0; b < 3; b++) {
var br = wdwCyl(G, 0.015, 0.015, 0.6, wdwMat("oak"), A.rose[0] - 1.2 + b * 0.5, H(A.rose[0], A.rose[1]) + 0.02, A.rose[1] + 2.2, 5);
br.rotation.z = Math.PI / 2;
}
wdwSpot(A.rose[0], A.rose[1] + 2, 2.4, "The large rose-tree near the entrance", "look at the roses", function () { setStatus("🌹 <b>The roses growing on it are white,</b> but the gardeners are busily painting them red."); });
var cols = ["#E83A3A", "#F4D040", "#F4F0F8", "#C860C8", "#F08A30", "#5A7AE8"];
for (var bx = -240; bx <= 240; bx += 36)
for (var bz = -60; bz <= 290; bz += 36) {
if (inCro(bx, bz) || nearPal(bx, bz) || walks.some(function (p) { return wdwPathD(bx, bz, p) < 15; }))
continue;
var by = H(bx, bz);
var edge = [[bx - 12, bz - 8], [bx + 12, bz - 8], [bx + 12, bz + 8], [bx - 12, bz + 8], [bx - 12, bz - 8]];
if (!lite)
wdxHedge(G, edge, H, { s: 0.32, bare: 1, seed: bx * 7 + bz, col: 0x2E5A24 });
else
wdwBox(G, 24, 0.4, 16, wdwLam(0x2E5A24), bx, by - 0.1, bz);
wdwPlant(G, "flowers", wdwScatter(bx * 13 + bz, lite ? 16 : 40, bx - 10, bz - 6, bx + 10, bz + 6, null, H, 0.6, 0.9), { col: cols[Math.abs(bx + bz) / 36 % cols.length | 0], keepAll: 1 });
}
var yews = [];
for (var yz = -80; yz <= 300; yz += 18)
[-14, 14].forEach(function (x) { if (!inCro(x, yz) && !nearPal(x, yz))
yews.push({ x: x, z: yz, y: H(x, yz), s: 1, ry: 0 }); });
wdwInst(G, wdwGeo("wdYew", function () { var c = new THREE.ConeGeometry(1.0, 4.2, 10); c.translate(0, 2.6, 0); var t = new THREE.CylinderGeometry(0.2, 0.25, 0.6, 6); t.translate(0, 0.3, 0); return gwMerge([c.toNonIndexed(), t.toNonIndexed()]); }), wdwM("wdYewM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x2A4A22, map: wdwLeafTex(), alphaTest: 0.3 }); m.userData.noPhoto = 1; return m; }), yews, { shadow: !lite });
yews.forEach(function (t) { wdwRound(t.x, t.z, 0.9, t.y - 1, t.y + 5); });
var roses = [];
for (var rz = 150; rz <= 290; rz += 10)
[-24, 24].forEach(function (x) { if (Math.abs(rz - 200) > 6)
roses.push([x, rz]); });
roses.forEach(function (p, i) { wdxRoseTree(G, p[0], p[1], H(p[0], p[1]), { s: 1.1, col: i % 3 === 0 ? "#F6F4EE" : "#C81A2A" }); });
[[0, 200], [-120, 200], [120, 200]].forEach(function (f, i) {
var fy = H(f[0], f[1]), fg = new THREE.Group();
fg.position.set(f[0], fy, f[1]);
G.add(fg);
wdwCyl(fg, 4.0, 4.2, 0.6, wdwMat("marble"), 0, 0, 0, 28);
wdwWater(fg, 0, 0, 7.4, 7.4, 0.5, 0x6A9AB8, 0.7);
wdwCyl(fg, 0.4, 0.6, 1.8, wdwMat("marble"), 0, 0.5, 0, 12);
wdwCyl(fg, 1.6, 1.2, 0.3, wdwMat("marble"), 0, 2.2, 0, 18);
wdwCyl(fg, 0.2, 0.3, 1.0, wdwMat("marble"), 0, 2.4, 0, 10);
var sp = new THREE.Mesh(new THREE.SphereGeometry(1.2, 14, 8, 0, 6.3, 0, 1.4), wdwLam(0xD8ECF8, { op: 0.35 }));
sp.position.y = 2.6;
fg.add(sp);
wdwRound(f[0], f[1], 4.2, fy - 1, fy + 0.6);
});
var C = A.cro, croE = [[C[0] - 50, C[1] - 38], [C[0] + 50, C[1] - 38], [C[0] + 50, C[1] + 38], [C[0] + 4, C[1] + 38]];
wdxHedge(G, croE, H, { s: 0.6, bare: 1, seed: 91, col: 0x2E5A24 });
wdxHedge(G, [[C[0] - 4, C[1] + 38], [C[0] - 50, C[1] + 38], [C[0] - 50, C[1] - 38]], H, { s: 0.6, bare: 1, seed: 92, col: 0x2E5A24 });
wdwSpot(C[0], C[1], 30, "The croquet-ground", "look at the ground", function () { setStatus("🦩 <b>A curious croquet-ground:</b> it is all ridges and furrows; the balls are live hedgehogs, the mallets live flamingoes."); });
if (!st.noArches) {
var arches = [[-30, 90], [-10, 124], [14, 96], [34, 128], [24, 74], [-26, 132]];
arches.forEach(function (a, i) { var cm = wdwCreature("card:clubs:" + (2 + i), "arch" + i); cm.position.set(C[0] + a[0], H(C[0] + a[0], a[1]), a[1]); cm.rotation.y = i * 0.7; var inner = cm.children[0]; if (inner) {
inner.rotation.x = 0;
} G.add(cm); wdwArch(cm); });
}
var hh = wdwScatter(510, lite ? 4 : 9, C[0] - 40, C[1] - 30, C[0] + 40, C[1] + 30, null, H, 1, 1);
hh.forEach(function (t, i) { var c = wdwCreature("hedgehog", "hh" + i); c.position.set(t.x, t.y, t.z); c.rotation.y = t.ry; G.add(c); WDW.people.push({ g: c, y: t.y, o: { wander: 6, sp: 0.3 } }); });
var fl = wdwScatter(511, lite ? 3 : 7, C[0] - 45, C[1] - 34, C[0] + 45, C[1] + 34, null, H, 1, 1);
fl.forEach(function (t, i) { var c = wdwCreature("flamingo", "fl" + i); c.position.set(t.x, t.y, t.z); c.rotation.y = t.ry; G.add(c); WDW.people.push({ g: c, y: t.y, o: { wander: 3, sp: 0.25 } }); });
wdwGaPalace(G, H);
var rocks = wdwScatter(520, lite ? 30 : 90, 480, -700, 620, 700, null, H, 0.6, 2.4);
wdwPlant(G, "rock", rocks, { mat: wdwMat("rock") });
var L = A.ledge, ly = H(L[0], L[1]), led = new THREE.Group();
led.position.set(L[0], ly, L[1]);
G.add(led);
wdwEll(led, wdwMat("rock"), 4, 1.6, 3, 0, 0.4, 0, 14);
wdwEll(led, wdwMat("darkrock"), 2.6, 1.1, 2.0, 1.6, 1.3, 0.4, 12);
wdwFloor(L[0], L[1], 4.4, 3.4, ly + 1.5, {});
wdwRound(L[0], L[1], 3.6, ly - 1, ly + 1.2);
wdwPlant(G, "grass", wdwScatter(521, lite ? 300 : 900, -740, -740, 470, 740, function (x, z) { return !inCro(x, z) && offW(x, z) && !nearPal(x, z); }, H, 0.5, 1), { col: 0xE8F0D8, keepAll: 1 });
wdxTrees(G, "oak", wdwScatter(522, lite ? 40 : 120, -740, -740, 440, 740, function (x, z) { return Math.hypot(x, z - 80) > 300 && offW(x, z); }, H, 1, 1.5), [0x3E6A2A, 0x4A7A2E]);
wdxTrees(G, "maple", wdwScatter(523, lite ? 20 : 60, -740, -740, 440, 740, function (x, z) { return Math.hypot(x, z - 80) > 280 && offW(x, z); }, H, 1, 1.4), [0x5A8A36]);
var suits = ["spades", "clubs", "diamonds", "hearts"];
var cw = wdwScatter(530, lite ? 8 : 20, -220, -60, 220, 290, function (x, z) { return !inCro(x, z) && offW(x, z) && !nearPal(x, z); }, H, 1, 1);
cw.forEach(function (t, i) {
var c = wdwCreature("card:" + suits[i % 4] + ":" + (2 + i % 9), "gc" + i);
c.position.set(t.x, t.y, t.z);
c.rotation.y = t.ry;
G.add(c);
var P = { g: c, y: t.y, o: { wander: 5, sp: 0.5 } };
WDW.people.push(P);
wdwTalk(P, ["A gardener (the " + (2 + i % 9) + " of " + suits[i % 4] + ")", "A soldier of the Queen's", "A courtier", "A gardener"][i % 4], WDP.card, ["Mind the roses: the Queen will have them red.", "Off with his head, she says, and none of us is safe.", "The croquet's this afternoon. Are you playing?", "Paint, paint, paint, before she comes."][i % 4], 3);
});
WDW.ticks.push(function (dt) { var t = WDW.t; WDW.people.forEach(function (P) { if (P.g.userData.cardIn)
wdwCardTick(P.g.children[0], t, true); }); });
wdwFar(G, H, null, { edge: 760 });
},
function (G, H) {
var P = WDW_GA.palace, py = H(P[0], P[1]), g = new THREE.Group();
g.position.set(P[0], py, P[1]);
G.add(g);
var lite = wdwLite();
var red = wdwS("b:stucco", 0xC83A3A, 3), white = wdwMat("marble"), gold = wdwMat("gilt");
wdwBox(g, 64, 1.2, 30, wdwMat("ashlar"), 0, 0, 0);
wdwBox(g, 60, 14, 26, red, 0, 1.2, 0);
wdwBox(g, 61, 0.8, 27, white, 0, 15.2, 0);
for (var b = -28; b <= 28; b += 4)
wdwBox(g, 1.6, 1.6, 1.0, white, b, 16, 13.0);
[[-30, 13], [30, 13], [-30, -13], [30, -13]].forEach(function (q) { wdwCyl(g, 4, 4.2, 22, white, q[0], 0, q[1], 20); var cn = new THREE.Mesh(new THREE.ConeGeometry(4.8, 9, 20), wdwShine(0xB82030, 0.4, 0.1)); cn.position.set(q[0], 26.5, q[1]); g.add(cn); wdwGaHeart(g, q[0], 31.5, q[1], 1.2); });
for (var s = 0; s < 5; s++)
wdwBox(g, 18 - s * 0.6, 0.24, 3 - s * 0.5, white, 0, s * 0.24, 14.5 + (4 - s) * 0.5);
for (var c = -7; c <= 7; c += 3.5)
wdwCyl(g, 0.6, 0.7, 11, white, c, 1.2, 15.6, 14);
var ped = new THREE.Mesh(wdwGeo("wdPed", function () { var s = new THREE.Shape(); s.moveTo(-9.5, 0); s.lineTo(0, 4); s.lineTo(9.5, 0); s.lineTo(-9.5, 0); return new THREE.ExtrudeGeometry(s, { depth: 2, bevelEnabled: false }); }), white);
ped.position.set(0, 12.2, 14.6);
g.add(ped);
wdwGaHeart(g, 0, 13.7, 16.7, 1.4);
wdwBox(g, 3.6, 5.6, 0.2, wdwMat("darkoak"), 0, 1.2, 13.1);
wdwBox(g, 4.2, 0.4, 0.3, gold, 0, 6.8, 13.2);
for (var x = -26; x <= 26; x += 4.2) {
if (Math.abs(x) < 9)
continue;
[3.4, 9.2].forEach(function (y) { wdwBox(g, 1.8, 3.0, 0.1, wdwMat("pane"), x, y, 13.05); wdwBox(g, 2.2, 0.3, 0.25, white, x, y + 3.1, 13.1); wdwBox(g, 2.2, 0.2, 0.3, white, x, y - 0.2, 13.1); });
if (!lite)
wdwGaHeart(g, x, 12.9, 13.2, 0.4);
}
wdwSolid(P[0], P[1], 64, 30, py - 1, py + 30);
var Dr = WDW.rooms.filter(function (q) { return q.key === "court"; })[0];
if (Dr)
wdwDoor(Dr, "The doors of the palace, into the court of justice", P[0], P[1] + 18, 0);
[-18, 18].forEach(function (x) {
var hb = new THREE.Mesh(wdwGeo("wdHeartBed", function () { var s = wdwHeartShape(4); var e = new THREE.ExtrudeGeometry(s, { depth: 0.4, bevelEnabled: false }); e.rotateX(-Math.PI / 2); return e; }), wdwLam(0x3A6A2A));
hb.position.set(P[0] + x, H(P[0] + x, P[1] + 26) + 0.01, P[1] + 26);
G.add(hb);
for (var r = 0; r < (lite ? 5 : 12); r++)
wdxRoseTree(G, P[0] + x + (Math.random() - 0.5) * 5, P[1] + 24 + (Math.random() - 0.5) * 4, H(P[0] + x, P[1] + 26), { s: 0.6, col: "#C81A2A" });
});
[-26, 26].forEach(function (x) { var fp = new THREE.Group(); fp.position.set(P[0] + x, H(P[0] + x, P[1] + 20), P[1] + 20); G.add(fp); wdwCyl(fp, 0.08, 0.1, 10, wdwMat("iron"), 0, 0, 0, 8); var fg = new THREE.Mesh(new THREE.PlaneGeometry(3, 2), wdwM("wdFlag", function () { return new THREE.MeshLambertMaterial({ map: wdwCardFace("hearts", 1), side: THREE.DoubleSide }); })); fg.position.set(1.5, 9, 0); fp.add(fg); });
},
function (P, x, y, z, r) { var m = new THREE.Mesh(wdwGeo("wdHeart", function () { var e = new THREE.ExtrudeGeometry(wdwHeartShape(1), { depth: 0.3, bevelEnabled: true, bevelSize: 0.1, bevelThickness: 0.1, bevelSegments: 2 }); e.translate(0, 0, -0.15); return e; }), wdwShine(0xC81A2A, 0.3, 0.2)); m.position.set(x, y, z); m.scale.setScalar(r); P.add(m); return m; },
function (G) {
var X = WDW_ROOMXZ.garden, R;
R = wdwRoom(G, "court", X.court[0], X.court[1], 26, 22, { wall: "redvelvet", floor: "checker", name: "the court of justice", h: 9, lightI: 1.1, ceil: "ceiling" });
var g = R.g, gold = wdwMat("gilt"), oak = wdwMat("darkoak"), lite = wdwLite();
if (typeof wdxPanelling === "function" && !lite)
try {
var pg = new THREE.Group();
g.add(pg);
wdxPanelling(pg, 26, 22, 9, { h0: 2.4, step: 4, skip: [] });
}
catch (e) { }
wdwBox(g, 10, 0.8, 5, wdwMat("redvelvet"), 0, 0, -8.4);
[-1.4, 1.4].forEach(function (x) { wdwBox(g, 1.6, 0.6, 1.4, gold, x, 0.8, -9.2); wdwBox(g, 1.6, 3.2, 0.3, gold, x, 0.8, -9.9); wdwBox(g, 1.3, 2.6, 0.1, wdwMat("redvelvet"), x, 1.2, -9.72); });
wdwBox(g, 6, 0.3, 3, gold, 0, 6.4, -9.2);
if (typeof wdxDrape === "function")
try {
wdxDrape(g, -2.8, 3.6, -9.4, 1.6, 5.4, 0, wdwMat("redvelvet"), {});
wdxDrape(g, 2.8, 3.6, -9.4, 1.6, 5.4, 0, wdwMat("redvelvet"), {});
}
catch (e) { }
wdwGaHeart(g, 0, 7.6, -10.6, 1.2);
wdwFloor(X.court[0], X.court[1] - 8.4, 10, 5, WDW_RY + 0.8, {});
var jb = new THREE.Group();
jb.position.set(-9.5, 0, -2);
g.add(jb);
wdwBox(jb, 4, 0.4, 6, oak, 0, 0, 0);
wdwBox(jb, 4, 1.0, 0.12, oak, 0, 0.4, 3.0);
wdwBox(jb, 0.12, 1.0, 6, oak, 2.0, 0.4, 0);
wdwBox(jb, 4, 0.8, 6, oak, -0.6, 0.4, 0);
for (var j = 0; j < 6; j++)
[0.6, -1.0].forEach(function (x, k) { wdwBox(jb, 0.7, 0.06, 0.5, oak, x, k ? 1.2 : 0.8, -2.5 + j * 1.0); var sl = wdwBox(jb, 0.3, 0.02, 0.22, wdwLam(0x2A2A2E), x + 0.6, 1.42, -2.5 + j * 1.0); });
wdwTable(g, 0, -2.2, 3, 1.4, 0.9, { cloth: 0xF4F0E6 });
var dish = wdwCyl(g, 0.6, 0.45, 0.08, wdwShine(0xE8E4D8, 0.2, 0.1), 0, 0.92, -2.2, 22);
for (var t = 0; t < (WDW.st && WDW.st.tartsGone ? 0 : 12); t++) {
var a = t / 12 * 6.283, rr = t < 8 ? 0.4 : 0.18;
var tr = wdwCyl(g, 0.08, 0.06, 0.04, wdwLam(0xD8A060), Math.cos(a) * rr, 1.0, -2.2 + Math.sin(a) * rr, 10);
wdwCyl(g, 0.06, 0.06, 0.01, wdwLam(0xA81A2A), Math.cos(a) * rr, 1.04, -2.2 + Math.sin(a) * rr, 10);
}
var wb = new THREE.Group();
wb.position.set(6.4, 0, -3);
g.add(wb);
wdwBox(wb, 1.8, 0.4, 1.8, oak, 0, 0, 0);
wdwBox(wb, 1.8, 1.1, 0.1, oak, 0, 0.4, 0.9);
wdwBox(wb, 0.1, 1.1, 1.8, oak, -0.9, 0.4, 0);
wdwBox(wb, 0.1, 1.1, 1.8, oak, 0.9, 0.4, 0);
wdwFloor(X.court[0] + 6.4, X.court[1] - 3, 1.6, 1.6, WDW_RY + 0.4, {});
var dk = new THREE.Group();
dk.position.set(0, 0, 2.6);
g.add(dk);
wdwBox(dk, 2.4, 1.1, 0.1, oak, 0, 0, 0.8);
wdwBox(dk, 0.1, 1.1, 1.6, oak, -1.2, 0, 0);
wdwBox(dk, 0.1, 1.1, 1.6, oak, 1.2, 0, 0);
[-1, 1].forEach(function (sd) { wdwBox(g, 4, 0.3, 18, oak, sd * 11, 3.2, 1); wdwBox(g, 0.1, 1.0, 18, gold, sd * 9, 3.5, 1); for (var b = 0; b < 6; b++)
wdwBench(g, sd * 11.2, -7 + b * 3, sd > 0 ? -Math.PI / 2 : Math.PI / 2, { w: 2.4 }); });
for (var bn = 0; bn < 4; bn++) {
wdwBench(g, -4 + bn % 2 * 8, 6 + Math.floor(bn / 2) * 2.2, Math.PI, { w: 4 });
}
var Lg = wdxGlowStart();
[[-8, -6], [8, -6], [-8, 6], [8, 6]].forEach(function (q) { if (typeof wdxChandelier === "function")
try {
wdxChandelier(g, q[0], 8.6, q[1], 1.2, 2, Lg, null, 9);
}
catch (e) { } });
wdxGlowDone(g, Lg);
wdwWindowIn(g, 12.9, 4.5, -4, -Math.PI / 2, 2.2, 4, { sky: 0xB8D8F0 });
wdwWindowIn(g, 12.9, 4.5, 4, -Math.PI / 2, 2.2, 4, { sky: 0xB8D8F0 });
wdwWindowIn(g, -12.9, 4.5, 6, Math.PI / 2, 2.2, 4, { sky: 0xB8D8F0 });
R = wdwRoom(G, "qhall", X.qhall[0], X.qhall[1], 16, 10, { wall: "damask", floor: "marble", name: "the Queen's hall", h: 6, lightI: 1.0 });
wdwTable(R.g, 0, -0.5, 10, 1.6, 0.8, { cloth: 0xF4F0E6 });
for (var ch = -4.4; ch <= 4.4; ch += 1.1)
[-1.3, 0.3].forEach(function (z) { wdwChair(R.g, ch, z, z < 0 ? 0 : Math.PI, {}); });
["hearts", "spades", "clubs", "diamonds"].forEach(function (su, i) { var pm = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.96), new THREE.MeshLambertMaterial({ map: wdwCardFace(su, 13) })); pm.position.set(-6 + i * 4, 3, -4.88); R.g.add(pm); wdwBox(R.g, 1.6, 2.16, 0.06, wdwMat("gilt"), -6 + i * 4, 1.92, -4.93); });
wdxTeaThings(R.g, -4, 4, -0.5, 0.82, { seed: 21, gap: 1.1, w: 0.6 });
var Lq = wdxGlowStart();
if (typeof wdxChandelier === "function")
try {
wdxChandelier(R.g, 0, 5.6, -0.5, 1.4, 2, Lq, null, 6);
}
catch (e) { }
wdxGlowDone(R.g, Lq);
wdwInDoor("court", "qhall", 11.5, 8, "The side door, to the Queen's hall", "go through");
},
function () {
return wdwM("wdgClipM", function () {
var t = wdwCanvas("wdgClipT", 128, 128, function (c, W, H) {
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
var m = wdwBox(G, w, h, seg, wdgClipM(), x, y, z, ang);
m.castShadow = !wdwLite();
}
if (solid !== false) {
var cx = (a[0] + b[0]) / 2, cz = (a[1] + b[1]) / 2;
wdwSolid(cx, cz, w, L, H(cx, cz) - 1, H(cx, cz) + h, -ang);
}
},
function (G, x, z, y, kind, s) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.scale.setScalar(s || 1);
G.add(g);
var M = wdgClipM();
wdwBox(g, 0.9, 0.5, 0.9, wdwMat("ashlar"), 0, 0, 0);
wdwCyl(g, 0.55, 0.45, 0.6, wdwLam(0x9A5A3A), 0, 0.5, 0, 12);
if (kind === "ball") {
wdwCyl(g, 0.06, 0.08, 1.0, wdwMat("bark"), 0, 1.0, 0, 6);
var b = new THREE.Mesh(new THREE.SphereGeometry(0.7, 14, 10), M);
b.position.y = 2.2;
g.add(b);
}
else if (kind === "cone") {
var c = new THREE.Mesh(new THREE.ConeGeometry(0.75, 2.6, 14), M);
c.position.y = 2.4;
g.add(c);
}
else {
var hr = new THREE.Mesh(wdwGeo("wdgHeartTop", function () { var e = new THREE.ExtrudeGeometry(wdwHeartShape(0.8), { depth: 0.5, bevelEnabled: true, bevelSize: 0.12, bevelThickness: 0.12, bevelSegments: 2 }); e.rotateZ(Math.PI); e.translate(0, 0.8, -0.25); return e; }), M);
hr.position.y = 1.2;
g.add(hr);
}
wdwRound(x, z, 0.6 * (s || 1), y - 1, y + 3);
return g;
},
function (G, x, z, y) {
var g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var st = wdwMat("ashlar");
wdwBox(g, 1.2, 1.1, 1.2, st, 0, 0, 0);
wdwBox(g, 1.4, 0.15, 1.4, st, 0, 1.1, 0);
var u = new THREE.Mesh(wdwGeo("wdgUrn", function () { var p = []; [[0.15, 0], [0.32, 0.05], [0.2, 0.2], [0.22, 0.3], [0.55, 0.55], [0.62, 0.85], [0.5, 0.95], [0.56, 1.0]].forEach(function (q) { p.push(new THREE.Vector2(q[0], q[1])); }); return new THREE.LatheGeometry(p, 16); }), st);
u.position.y = 1.25;
g.add(u);
for (var f = 0; f < 9; f++) {
var fl = new THREE.Mesh(wdwGeo("wdgUrnF", function () { return new THREE.SphereGeometry(0.16, 6, 5); }), wdwLam([0xC81A2A, 0xF4F0F0, 0xC81A2A][f % 3]));
fl.position.set(Math.cos(f / 9 * 6.283) * 0.36, 2.3 + (f % 2) * 0.12, Math.sin(f / 9 * 6.283) * 0.36);
g.add(fl);
}
var lv = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 6, 0, 6.3, 0, 1.2), wdgClipM());
lv.position.y = 2.1;
g.add(lv);
wdwRound(x, z, 0.7, y - 1, y + 2.5);
},
function (G, x, z, y, w) {
var g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var ir = wdwLam(0x2A2A26);
[-1, 1].forEach(function (s) { wdwCyl(g, 0.05, 0.05, 2.6, ir, s * w / 2, 0, 0, 6); });
var ar = new THREE.Mesh(wdwGeo("wdgArc" + w, function () { var c = new THREE.TorusGeometry(w / 2, 0.05, 6, 16, Math.PI); return c; }), ir);
ar.position.y = 2.6;
g.add(ar);
var R = wRand(Math.round(x * 7 + z * 3)), list = [];
for (var i = 0; i < 26; i++) {
var a = R() * Math.PI, side = i < 8 ? (i % 2 ? 1 : -1) : 0;
var px = side ? side * w / 2 : Math.cos(a) * w / 2, py = side ? 0.5 + R() * 2.1 : 2.6 + Math.sin(a) * w / 2;
list.push({ x: x + px + (R() - 0.5) * 0.25, y: y + py, z: z + (R() - 0.5) * 0.3, s: 0.18 + R() * 0.12, ry: R() * 6 });
}
wdwInst(G, wdwGeo("wdgLeafBlob", function () { return new THREE.IcosahedronGeometry(1, 0); }), wdgClipM(), list, {});
wdwInst(G, wdwGeo("wdgRose", function () { return new THREE.SphereGeometry(0.5, 6, 5); }), wdwLam(0xC81A2A), list.filter(function (t, i) { return i % 2 === 0; }).map(function (t) { return { x: t.x + 0.08, y: t.y + 0.08, z: t.z, s: t.s * 0.6 }; }), {});
wdwInst(G, wdwGeo("wdgRose", null), wdwLam(0xF4F0EE), list.filter(function (t, i) { return i % 4 === 1; }).map(function (t) { return { x: t.x - 0.06, y: t.y + 0.1, z: t.z + 0.05, s: t.s * 0.55 }; }), {});
},
function (G, x, z, y, r, h) {
var g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var M = wdwLam(0xFFFFFF, { map: wdgStripeTex("#C81A2A", "#F4F0E8"), mapk: "wdgStrRW", ds: 1 });
var wall = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 24, 1, true), M);
wall.position.y = h / 2;
g.add(wall);
var rf = new THREE.Mesh(new THREE.ConeGeometry(r * 1.15, h * 0.8, 24, 1, true), M);
rf.position.y = h + h * 0.4;
g.add(rf);
for (var i = 0; i < 24; i++) {
var a = i / 24 * 6.283, v = new THREE.Mesh(wdwGeo("wdgVal", function () { var s = new THREE.Shape(); s.moveTo(-0.28, 0); s.lineTo(0.28, 0); s.lineTo(0, -0.35); s.lineTo(-0.28, 0); return new THREE.ShapeGeometry(s); }), wdwLam(i % 2 ? 0xC81A2A : 0xF4F0E8, { ds: 1 }));
v.position.set(Math.sin(a) * r * 1.14, h + 0.02, Math.cos(a) * r * 1.14);
v.rotation.y = a;
g.add(v);
}
wdwCyl(g, 0.04, 0.04, 1.4, wdwMat("gilt"), 0, h * 1.8, 0, 6);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.5), wdwLam(0xC81A2A, { ds: 1 }));
fl.position.set(0.45, h * 1.8 + 1.15, 0);
g.add(fl);
wdwSolid(x, z, r * 2, r * 2, y - 1, y + h, 0);
return g;
},
function (G, x, z, y, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
G.add(g);
var gold = wdwMat("gilt"), red = wdwMat("redvelvet");
wdwBox(g, 6, 0.5, 4, red, 0, 0, 0);
[-2.8, 2.8].forEach(function (px) { [-1.8, 1.8].forEach(function (pz) { wdwCyl(g, 0.08, 0.08, 3.6, gold, px, 0.5, pz, 8); }); });
wdwBox(g, 6.2, 0.25, 4.2, red, 0, 4.1, 0);
for (var i = 0; i < 12; i++) {
var v = wdwBox(g, 0.5, 0.4, 0.05, wdwLam(i % 2 ? 0xC81A2A : 0xE8C048), -2.75 + i * 0.5, 3.75, 2.1);
}
[-1, 1].forEach(function (s) { wdwBox(g, 1.1, 0.6, 0.9, gold, s * 0.9, 0.5, -0.6); wdwBox(g, 1.1, 1.8, 0.18, red, s * 0.9, 1.1, -1.0); });
wdwGaHeart(g, 0, 4.8, 0, 0.5);
wdwSolid(x, z, 6, 4, y - 1, y + 0.5, -(ry || 0));
},
function (G, x, z, y) {
var g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
wdwCyl(g, 0.05, 0.06, 5, wdwMat("gilt"), 0, 0, 0, 6);
var f = new THREE.Mesh(wdwGeo("wdgPen", function () { var s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(1.6, -0.35); s.lineTo(0, -0.7); s.lineTo(0, 0); return new THREE.ShapeGeometry(s); }), wdwLam(0xC81A2A, { ds: 1 }));
f.position.y = 4.9;
g.add(f);
},
function (G, x, z, y, ry, i) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
G.add(g);
var M = wdwLam(0xFFFFFF, { map: wdgStripeTex(["#2A5A9A", "#C81A2A", "#2A7A4A"][i % 3], "#F4F0E8"), mapk: "wdgStrB" + i % 3 });
wdwBox(g, 1.8, 2.0, 2.6, M, 0, 0.7, 0);
var rf = new THREE.Mesh(wdwGeo("wdgBRoof", function () { var s = new THREE.Shape(); s.moveTo(-1.05, 0); s.quadraticCurveTo(0, 0.7, 1.05, 0); s.lineTo(-1.05, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 2.8, bevelEnabled: false }); e.translate(0, 0, -1.4); return e; }), wdwLam(0xE8E4D8));
rf.position.y = 2.7;
g.add(rf);
[[-0.9, -1.0], [0.9, -1.0], [-0.9, 1.0], [0.9, 1.0]].forEach(function (q) { var wh = new THREE.Mesh(wdwGeo("wdgWheel", function () { var c = new THREE.TorusGeometry(0.42, 0.05, 6, 16); c.rotateY(Math.PI / 2); return c; }), wdwLam(0x4A3A2A)); wh.position.set(q[0] * 1.08, 0.45, q[1]); g.add(wh); });
wdwBox(g, 0.7, 1.5, 0.05, wdwMat("darkoak"), 0, 0.8, 1.32);
wdwBox(g, 0.9, 0.1, 0.5, wdwMat("oak"), 0, 0.35, 1.6);
wdwSolid(x, z, 2, 2.8, y - 1, y + 3, -ry);
},
function (G) {
var H = wdwGardenH, A = WDW_GA, lite = wdwLite(), R = wRand(901);
var gaps = [[200, 7], [250, 3]];
[-7, 7].forEach(function (sx) { var z0 = 288; gaps.concat([[150, 0]]).sort(function (a, b) { return b[0] - a[0]; }).forEach(function (gp) { var z1 = gp[0] + gp[1]; if (z0 > z1 + 1)
wdgHedge(G, [sx, z0], [sx, z1], 2.1, 1.2, H); z0 = gp[0] - gp[1]; }); });
for (var az = 284; az >= 214; az -= 12)
if (Math.abs(az - 250) > 4)
wdgRoseArch(G, 0, az, H(0, az), 4.6);
var cols = ["#E83A3A", "#F4D040", "#F4F0F8", "#C860C8", "#F08A30", "#5A7AE8", "#E8A0B8"];
cols.forEach(function (c, k) { wdwPlant(G, "flowers", wdwScatter(930 + k, lite ? 60 : 260, -6.2, 152, 6.2, 288, function (x, z) { return Math.abs(x) > 2.6 && Math.abs(x) < 6.2 && (Math.abs(z - 200) > 8); }, H, 0.7, 1.1), { col: c, keepAll: 1 }); });
wdxFoxglove && wdwScatter(940, lite ? 10 : 46, -6.2, 152, 6.2, 288, function (x, z) { return Math.abs(x) > 4.6 && Math.abs(x) < 6.2; }, H, 1, 1).forEach(function (t, i) { wdxFoxglove(G, t.x, t.z, t.y, 0.9 + (i % 3) * 0.15, [0xE8A0B8, 0xF4F0F0, 0xC83A5A][i % 3]); });
for (var tz = 284; tz >= 160; tz -= 16) {
if (Math.abs(tz - 200) < 10)
continue;
[-1, 1].forEach(function (s) { wdgTopiary(G, s * 8.6, tz, H(s * 8.6, tz), ["ball", "cone", "heart"][(tz / 16 | 0) % 3], 0.9); });
}
[[0, 200], [-120, 200], [120, 200]].forEach(function (f) { for (var k = 0; k < 6; k++) {
var a = k / 6 * 6.283 + 0.3, x = f[0] + Math.cos(a) * 8.5, z = f[1] + Math.sin(a) * 8.5;
if (Math.abs(x - f[0]) < 2.5 || Math.abs(z - 200) < 2.5)
continue;
wdgTopiary(G, x, z, H(x, z), k % 2 ? "heart" : "ball", 1);
} });
[[-6, 206], [6, 206], [-6, 194], [6, 194], [-6, 152], [6, 152], [-52, 206], [52, 206], [-52, 194], [52, 194]].forEach(function (u) { wdgUrn(G, u[0], u[1], H(u[0], u[1])); });
[-1, 1].forEach(function (s) {
wdgHedge(G, [s * 30, 210], [s * 30, 290], 1.6, 1.0, H);
wdgHedge(G, [s * 30, 290], [s * 110, 290], 1.6, 1.0, H);
wdgHedge(G, [s * 30, 210], [s * 60, 210], 1.6, 1.0, H);
for (var b = 0; b < 4; b++)
wdwBench(G, s * (40 + b * 18), 286.6, Math.PI, { w: 2.2 });
});
var C = A.cro;
wdgPavilion(G, C[0] + 62, C[1] + 20, H(C[0] + 62, C[1] + 20), 5, 3.2);
wdgPavilion(G, C[0] - 64, C[1] - 8, H(C[0] - 64, C[1] - 8), 4, 2.8);
wdgCanopy(G, C[0], C[1] - 44, H(C[0], C[1] - 44), 0);
for (var bx = -40; bx <= 40; bx += 10) {
if (Math.abs(bx) < 6)
continue;
wdwBench(G, C[0] + bx, C[1] - 43, 0, { w: 3 });
}
for (var pz = -36; pz <= 36; pz += 12) {
wdgPennant(G, C[0] - 53, C[1] + pz, H(C[0] - 53, C[1] + pz));
wdgPennant(G, C[0] + 53, C[1] + pz, H(C[0] + 53, C[1] + pz));
}
if (!lite) {
var guards = [[-54, -40], [54, -40], [-54, 40], [54, 40], [-20, -42], [20, -42], [-8, -46], [8, -46]];
guards.forEach(function (q, i) { var c = wdwCreature("card:" + (i % 2 ? "clubs" : "spades") + ":" + (3 + i), "gd" + i); c.position.set(C[0] + q[0], H(C[0] + q[0], C[1] + q[1]), C[1] + q[1]); c.rotation.y = q[1] < 0 ? 0 : Math.PI; G.add(c); WDW.people.push({ g: c, y: c.position.y, o: {} }); if (typeof WDP !== "undefined")
wdwTalk(WDW.people[WDW.people.length - 1], "A soldier of the Queen's", WDP.card, ["Mind your head. She's in a temper today.", "Off with their heads, that's all we hear.", "The hedgehogs keep walking off."][i % 3], 2.2); });
}
var hh = wdwScatter(950, lite ? 3 : 10, C[0] - 44, C[1] - 30, C[0] + 44, C[1] + 30, null, H, 1, 1);
hh.forEach(function (t, i) { var c = wdwCreature(i % 2 ? "hedgehog" : "flamingo", "hx" + i); c.position.set(t.x, t.y, t.z); c.rotation.y = t.ry; G.add(c); WDW.people.push({ g: c, y: t.y, o: { wander: 5, sp: 0.25 } }); });
var cliff = [];
for (var cz = -700; cz <= 700; cz += lite ? 8 : 4) {
if (Math.abs(cz - A.ledge[1]) < 16 || Math.abs(cz) < 30)
continue;
var cx = 468 + Math.sin(cz * 0.02) * 8;
cliff.push({ x: cx + (R() - 0.5) * 4, z: cz, y: H(cx, cz) - 1, s: 3 + R() * 3, sy: 4 + R() * 4, ry: R() * 6 });
}
wdwPlant(G, "rock", cliff, { mat: wdwMat("rock"), keepAll: 1 });
wdwInst(G, wdwGeo("wdgTuft", function () { return wdwCards(3, 1.2, 0.8, 0); }), wdwLam(0xFFFFFF, { ds: 1, map: wdwGrassTex(), mapk: "tuft", cut: 0.4 }), cliff.filter(function (t, i) { return i % 2 === 0; }).map(function (t) { return { x: t.x - 1, y: t.y + t.sy * 0.9, z: t.z, s: 1.2, ry: t.ry }; }), {});
var pools = wdwScatter(960, lite ? 6 : 18, 500, -300, 580, 300, function (x, z) { return Math.abs(z - A.ledge[1]) > 8; }, H, 1.5, 3.5);
pools.forEach(function (p) {
var w = new THREE.Mesh(wdwGeo("wdgPoolC", function () { var c = new THREE.CircleGeometry(1, 20), a = c.attributes.position; for (var i = 1; i < a.count; i++) {
var f = 0.8 + 0.25 * Math.sin(i * 1.7) * Math.sin(i * 0.6);
a.setX(i, a.getX(i) * f);
a.setY(i, a.getY(i) * f);
} c.rotateX(-Math.PI / 2); return c; }), wdwWaterM(0x3A6A78, 0.85));
w.scale.set(p.s, 1, p.s * 0.7);
w.rotation.y = p.ry;
w.position.set(p.x, H(p.x, p.z) + 0.04, p.z);
G.add(w);
var rim = [];
for (var k = 0; k < 7; k++) {
var a2 = k / 7 * 6.283 + p.ry;
rim.push({ x: p.x + Math.cos(a2) * p.s * 1.05, z: p.z + Math.sin(a2) * p.s * 0.75, y: H(p.x, p.z) - 0.1, s: 0.35 + 0.2 * ((k * 7) % 3) / 2, sy: 0.3, ry: k });
}
wdwPlant(G, "rock", rim, { mat: wdwMat("darkrock"), keepAll: 1 });
});
wdwPlant(G, "rock", pools.map(function (p) { return { x: p.x + p.s, z: p.z, y: H(p.x, p.z) - 0.2, s: 0.6, sy: 0.4, ry: p.ry }; }), { mat: wdwMat("darkrock") });
var weed = wdwScatter(961, lite ? 60 : 260, 490, -500, 600, 500, null, H, 0.5, 1.0);
wdwInst(G, wdwGeo("wdgWeed", function () { return wdwCards(2, 0.8, 0.25, 0); }), wdwLam(0x8A7A3A, { ds: 1, map: wdwGrassTex(), mapk: "tuft", cut: 0.4 }), weed.map(function (t) { t.y += 0.02; return t; }), {});
var shells = wdwScatter(962, lite ? 80 : 400, 500, -400, 600, 400, null, H, 0.06, 0.12);
wdwInst(G, wdwGeo("wdgShell", function () { var s = new THREE.SphereGeometry(1, 8, 4, 0, 6.3, 0, 1.3); s.scale(1, 0.4, 0.8); return s; }), wdwLam(0xF0E4D4), shells, {});
for (var bm = 0; bm < 6; bm++)
wdgBathing(G, 552 + (bm % 2) * 3, -60 - bm * 7, H(552, -60 - bm * 7), -1.57, bm);
var L = A.ledge;
wdwPlant(G, "rock", [{ x: L[0] + 3, z: L[1] - 4, y: H(L[0], L[1]) - 0.5, s: 3.4, sy: 2.4, ry: 1 }, { x: L[0] + 5, z: L[1] + 4, y: H(L[0], L[1]) - 0.6, s: 3, sy: 2.0, ry: 2 }, { x: L[0] - 2, z: L[1] + 5, y: H(L[0], L[1]) - 0.4, s: 2.4, sy: 1.6, ry: 3 }], { mat: wdwMat("rock"), keepAll: 1 });
},
function (G, x, z, y, ry, w) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
G.add(g);
var wood = wdwMat("oak"), dk = wdwMat("darkoak");
for (var t = 0; t < 3; t++) {
wdwBox(g, w, 0.12, 1.0, wood, 0, 0.45 + t * 0.55, -t * 1.0);
wdwBox(g, w, 0.45 + t * 0.55, 0.08, dk, 0, 0, -t * 1.0 + 0.46);
}
[-w / 2, w / 2].forEach(function (sx) { [0.5, -2.6].forEach(function (sz) { wdwCyl(g, 0.07, 0.08, 3.6, wdwMat("gilt"), sx, 1.8, sz, 8); }); });
var aw = wdwBox(g, w + 0.6, 0.06, 3.6, wdwLam(0xFFFFFF, { map: wdgStripeTex("#C81A2A", "#F4F0E8"), mapk: "wdgStrRW", ds: 1 }), 0, 3.6, -1.05);
aw.rotation.x = -0.14;
for (var v = 0; v < Math.round(w / 0.8); v++) {
var fl = new THREE.Mesh(wdwGeo("wdgVal", function () { var s = new THREE.Shape(); s.moveTo(-0.4, 0); s.lineTo(0.4, 0); s.lineTo(0, -0.35); s.lineTo(-0.4, 0); return new THREE.ShapeGeometry(s); }), wdwLam(v % 2 ? 0xC81A2A : 0xF4F0E8, { ds: 1 }));
fl.position.set(-w / 2 + 0.4 + v * 0.8, 3.62, 0.72);
g.add(fl);
}
wdwSolid(x, z, w, 3.4, y - 1, y + 0.4, ry || 0);
return g;
},
function (G, x, z, y, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
G.add(g);
var gold = wdwMat("gilt"), red = wdwMat("redvelvet");
wdwBox(g, 2.4, 0.3, 2.0, wdwMat("marble"), 0, 0, 0);
wdwBox(g, 1.2, 0.5, 1.0, red, 0, 0.3, 0);
wdwBox(g, 1.3, 2.0, 0.18, red, 0, 0.8, -0.45);
wdwBox(g, 1.45, 0.14, 0.24, gold, 0, 2.8, -0.45);
[-0.6, 0.6].forEach(function (sx) { wdwBox(g, 0.14, 0.5, 0.9, gold, sx, 0.8, 0); });
if (typeof wdwGaHeart === "function")
wdwGaHeart(g, 0, 2.4, -0.34, 0.28);
},
function (G, x, z, y, ry) {
var m = new THREE.Mesh(wdwGeo("wdgLPot", function () { var g = new THREE.SphereGeometry(0.4, 10, 6, 0, 6.3, 0, 1.9); g.scale(1, 0.8, 1); return g; }), wdwM("wdgWicker", function () { var t = wdwCanvas("wdgWickT", 64, 64, function (c, W, H) { c.fillStyle = "#7A5A30"; c.fillRect(0, 0, W, H); c.strokeStyle = "#C8A060"; c.lineWidth = 3; for (var i = 0; i < W; i += 8) {
c.beginPath();
c.moveTo(i, 0);
c.lineTo(i, H);
c.stroke();
} c.strokeStyle = "#A8803E"; for (i = 0; i < H; i += 6) {
c.beginPath();
c.moveTo(0, i);
c.lineTo(W, i);
c.stroke();
} }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 2); return new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }); }));
m.position.set(x, y + 0.05, z);
m.rotation.y = ry || 0;
G.add(m);
return m;
},
function (G, x, z, y, ry) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
G.add(g);
[-2, 2].forEach(function (sx) { wdwCyl(g, 0.06, 0.07, 2.4, wdwMat("darkoak"), sx, 1.2, 0, 6); });
var n = new THREE.Mesh(wdwGeo("wdgNet", function () { var p = new THREE.PlaneGeometry(4, 1.8, 8, 4), a = p.attributes.position; for (var i = 0; i < a.count; i++) {
var u = a.getX(i) / 2;
a.setY(i, a.getY(i) - 0.35 * (1 - u * u));
a.setZ(i, Math.sin(a.getX(i) * 2) * 0.06);
} p.computeVertexNormals(); return p; }), wdwM("wdgNetM", function () { var t = wdwCanvas("wdgNetT", 64, 64, function (c, W, H) { c.clearRect(0, 0, W, H); c.strokeStyle = "#5A4A34"; c.lineWidth = 2; for (var i = 0; i <= W; i += 8) {
c.beginPath();
c.moveTo(i, 0);
c.lineTo(i, H);
c.stroke();
c.beginPath();
c.moveTo(0, i);
c.lineTo(W, i);
c.stroke();
} }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(6, 3); return new THREE.MeshLambertMaterial({ map: t, transparent: true, alphaTest: 0.3, side: THREE.DoubleSide }); }));
n.position.y = 1.5;
g.add(n);
},
function (G, x, z, y, ry) {
var g = new THREE.Group();
g.position.set(x, y + 0.25, z);
g.rotation.set(0, ry || 0, 0.12);
G.add(g);
var hull = new THREE.Mesh(wdwGeo("wdgHull", function () { var s = new THREE.SphereGeometry(1, 16, 8, 0, 6.3, Math.PI / 2, Math.PI / 2); s.scale(0.85, 0.55, 2.4); return s; }), wdwLam(0x2A4A6A, { ds: 1 }));
hull.rotation.x = 0;
g.add(hull);
wdwBox(g, 1.5, 0.06, 0.3, wdwMat("oak"), 0, -0.08, 0.3);
wdwBox(g, 1.5, 0.06, 0.3, wdwMat("oak"), 0, -0.08, -0.8);
[-0.3, 0.3].forEach(function (sx) { var o = wdwCyl(g, 0.03, 0.03, 2.6, wdwMat("oak"), sx, 0.0, 0, 6); o.rotation.x = Math.PI / 2; });
},
function (G, x, z, y, i) {
var sand = wdwLam(0xD8C48E);
wdwCyl(G, 0.5, 0.6, 0.35, sand, x, y, z, 10);
[[0.35, 0], [-0.35, 0], [0, 0.35], [0, -0.35]].forEach(function (o) { wdwCyl(G, 0.14, 0.17, 0.32, sand, x + o[0], y + 0.3, z + o[1], 8); });
wdwCyl(G, 0.2, 0.24, 0.4, sand, x, y + 0.35, z, 8);
wdwCyl(G, 0.008, 0.008, 0.4, wdwMat("oak"), x, y + 0.75, z, 4);
wdwBox(G, 0.14, 0.08, 0.01, wdwLam([0xC81A2A, 0x2A5A9A, 0xF4D040][i % 3], { ds: 1 }), x + 0.07, y + 0.82, z);
var b = wdwCyl(G, 0.1, 0.08, 0.18, wdwLam([0xC83A2A, 0x3A6AB0, 0x3A8A4A][i % 3]), x + 0.8, y, z + 0.3, 10);
var sp = wdwBox(G, 0.12, 0.02, 0.2, wdwMat("oak"), x + 0.6, y + 0.02, z - 0.5);
sp.rotation.y = 0.7;
var hd = wdwCyl(G, 0.012, 0.012, 0.45, wdwMat("oak"), x + 0.6, y + 0.04, z - 0.2, 5);
hd.rotation.x = Math.PI / 2;
},
function (G) {
var H = wdwGardenH, A = WDW_GA, lite = wdwLite(), R = wRand(1201), C = A.cro;
var walks = [[[0, 316], [0, 180]], [[0, 80], [0, -120]], [[-120, 200], [120, 200]], [[60, 110], [200, 90], [380, 60], [500, 40]], [[-46, 110], [-46, -60]], [[46, 110], [46, -60]]];
var offW = function (x, z, d) { return walks.every(function (p) { return wdwPathD(x, z, p) > (d || 3.6); }); };
var inCro = function (x, z) { return Math.abs(x - C[0]) < 60 && Math.abs(z - C[1]) < 50; };
var nearPal = function (x, z) { return Math.abs(x - A.palace[0]) < 80 && z < -90 && z > -230; };
var inBeds = function (x, z) { return Math.abs(x) <= 256 && z > -76 && z < 306; };
var ok = function (x, z) { return offW(x, z) && !inCro(x, z) && !nearPal(x, z) && x < 455; };
var lim = [];
for (var ax = 18; ax <= 112; ax += 13)
[-1, 1].forEach(function (s) { [192, 208].forEach(function (z) { lim.push({ x: s * ax, z: z, y: H(s * ax, z), s: 0.75, ry: R() * 6 }); }); });
for (var az = 60; az >= -80; az -= 14)
[-5.5, 5.5].forEach(function (x) { lim.push({ x: x, z: az, y: H(x, az), s: 0.7, ry: R() * 6 }); });
wdxTrees(G, "maple", lim, [0x4E7E2C, 0x5A8A32]);
var blos = wdwScatter(1202, lite ? 24 : 70, -440, -320, 440, 520, function (x, z) { return ok(x, z) && !inBeds(x, z); }, H, 0.7, 1.1);
wdxTrees(G, "birch", blos.filter(function (t, i) { return i % 3 === 0; }), [0xE8B8C8, 0xF4E8EC]);
wdxTrees(G, "maple", blos.filter(function (t, i) { return i % 3 !== 0; }), [0xF0C8D4, 0xF8F0F0, 0xE8A8BC]);
var oaks = wdwScatter(1203, lite ? 14 : 36, -300, -300, 440, 480, function (x, z) { return ok(x, z) && !inBeds(x, z) && Math.hypot(x, z - 80) < 300; }, H, 1.3, 1.8);
wdxTrees(G, "oak", oaks, [0x3E6A2A, 0x4A7A2E]);
oaks.forEach(function (t, i) { if (i % 2)
return; var a = t.ry; wdwBench(G, t.x + Math.cos(a) * 4.5, t.z + Math.sin(a) * 4.5, -a + Math.PI / 2, { w: 2.2 }); });
var turf = function (x, z) { return ok(x, z) && !inBeds(x, z); };
[["#F8F6F0", lite ? 300 : 1400, 0.32, 0.5], ["#F4D040", lite ? 140 : 700, 0.35, 0.55], ["#E8B0D0", lite ? 80 : 400, 0.3, 0.45]].forEach(function (d, k) { wdwPlant(G, "flowers", wdwScatter(1210 + k, d[1], -460, -360, 450, 560, turf, H, d[2], d[3]), { col: d[0], keepAll: 1 }); });
wdwPlant(G, "grass", wdwScatter(1214, lite ? 400 : 1600, -460, -360, 450, 560, turf, H, 0.5, 0.9), { col: 0xC8E0A8, keepAll: 1 });
if (!lite)
for (var rz = 40; rz >= -60; rz -= 12)
[-50, 50, -42, 42].forEach(function (x, k) { wdxRoseTree(G, x, rz + (k > 1 ? 6 : 0), H(x, rz), { s: 0.7, col: (rz / 12 + k) % 2 ? "#C81A2A" : "#F6F4EE" }); });
wdgStand(G, C[0] - 28, C[1] + 46, H(C[0] - 28, C[1] + 46), Math.PI, 14);
wdgStand(G, C[0] + 28, C[1] + 46, H(C[0] + 28, C[1] + 46), Math.PI, 14);
wdgStand(G, C[0] + 60, C[1] - 14, H(C[0] + 60, C[1] - 14), -Math.PI / 2, 12);
wdgQueenChair(G, C[0], C[1] - 48, H(C[0], C[1] - 48), 0);
[[-56, -30], [56, 24], [-56, 30]].forEach(function (q) { var x = C[0] + q[0], z = C[1] + q[1], y = H(x, z); wdwBox(G, 2.4, 0.08, 0.4, wdwMat("darkoak"), x, y + 0.9, z); [-1.1, 1.1].forEach(function (o) { wdwBox(G, 0.08, 0.9, 0.4, wdwMat("darkoak"), x + o, y, z); }); for (var k = 0; k < 4; k++)
wdwCyl(G, 0.2, 0.16, 0.25, wdwLam(0xA8803E), x - 0.9 + k * 0.6, y + 0.12, z + 0.7, 10); });
var crowd = [];
for (var cx = -44; cx <= 44; cx += lite ? 16 : 6.5)
crowd.push([cx, 40.5, Math.PI]);
for (var cz = -30; cz <= 30; cz += lite ? 20 : 8) {
crowd.push([-52.5, cz, Math.PI / 2]);
crowd.push([52.5, cz, -Math.PI / 2]);
}
var lines = ["The Queen's in a fine temper today.", "Have you seen the Duchess? She's under sentence of execution.", "Mind where you step: the hedgehogs walk off.", "Somebody's head will come off before tea, mark me.", "Hush! Here she comes!", "They're dreadfully fond of beheading people here."];
crowd.forEach(function (q, i) {
var x = C[0] + q[0], z = C[1] + q[1], y = H(x, z), suit = i % 3 === 0 ? "hearts" : "diamonds", c = wdwCreature("card:" + suit + ":" + (2 + i % 9), "cr" + i);
c.position.set(x, y, z);
c.rotation.y = q[2] + (R() - 0.5) * 0.4;
G.add(c);
var P = { g: c, y: y, o: {} };
WDW.people.push(P);
if (i % 2 === 0 && typeof WDP !== "undefined")
wdwTalk(P, suit === "hearts" ? "One of the royal children (" + (2 + i % 9) + " of hearts)" : "A courtier (" + (2 + i % 9) + " of diamonds)", WDP.card, lines[i % lines.length]);
});
var dunes = wdwScatter(1220, lite ? 24 : 70, 486, -640, 514, 640, function (x, z) { return Math.abs(z - A.ledge[1]) > 14 && Math.abs(z) > 34; }, H, 2, 5);
var sandM = wdwS("sand", 0xD6C08A, 3);
dunes.forEach(function (d) { wdwEll(G, sandM, d.s * 1.6, d.s * 0.35, d.s, d.x, d.y - 0.15, d.z, lite ? 8 : 12); });
var marram = [];
dunes.forEach(function (d, i) { for (var k = 0; k < (lite ? 3 : 9); k++) {
var a = R() * 6.3, r = R() * d.s * 1.1;
marram.push({ x: d.x + Math.cos(a) * r * 1.4, z: d.z + Math.sin(a) * r, y: d.y + d.s * 0.3 * (1 - r / (d.s * 1.2)) - 0.1, s: 0.8 + R() * 0.6, ry: R() * 6 });
} });
wdwInst(G, wdwGeo("wdgMarram", function () { return wdwCards(3, 0.9, 1.0, 0); }), wdwLam(0xB8B070, { ds: 1, map: wdwGrassTex(), mapk: "tuft", cut: 0.4 }), marram, {});
var gm = wdwMat("darkoak"), gr = [];
for (var gz = -560; gz <= 560; gz += lite ? 160 : 80) {
if (Math.abs(gz - A.ledge[1]) < 30 || Math.abs(gz + 60) < 30)
continue;
for (var gx = 518; gx <= 612; gx += lite ? 2.4 : 1.2)
gr.push({ x: gx, z: gz + (R() - 0.5) * 0.15, y: H(gx, gz), s: 1, ry: 0 });
}
wdwInst(G, wdwGeo("wdgGroyne", function () { var c = new THREE.CylinderGeometry(0.13, 0.15, 2.2, 6); c.translate(0, 0.4, 0); return c; }), gm, gr, {});
for (gz = -560; gz <= 560; gz += lite ? 160 : 80) {
if (Math.abs(gz - A.ledge[1]) < 30 || Math.abs(gz + 60) < 30)
continue;
for (var pl = 0; pl < 2; pl++) {
var b = wdwBox(G, 95, 0.32, 0.08, gm, 565, H(565, gz) + 0.4 + pl * 0.6, gz + 0.14);
b.rotation.z = 0.022;
}
}
wdxLogs && wdxLogs(G, wdwScatter(1221, lite ? 6 : 18, 520, -500, 575, 500, null, H, 0.5, 0.9).map(function (t) { t.y -= 0.1; return t; }));
var L = A.ledge;
for (var p = 0; p < (lite ? 4 : 9); p++) {
var px = L[0] - 14 + (p % 3) * 2.2, pz = L[1] + 18 + Math.floor(p / 3) * 1.6;
wdgPot(G, px, pz, H(px, pz), p);
}
wdgNets(G, L[0] - 10, L[1] + 24, H(L[0] - 10, L[1] + 24), 0.3);
wdgNets(G, L[0] - 4, L[1] - 26, H(L[0] - 4, L[1] - 26), -0.2);
wdgBoat(G, 548, -22, H(548, -22), 1.3);
wdgBoat(G, 544, 118, H(544, 118), 1.9);
[[530, -120], [536, -150], [528, 170], [540, 210], [532, 250]].forEach(function (c, i) { wdgCastle(G, c[0], c[1], H(c[0], c[1]), i); });
var sh = wdwScatter(1223, lite ? 300 : 1500, 526, -640, 546, 640, function (x, z) { return Math.abs(z - L[1]) > 8; }, H, 0.05, 0.16);
wdwInst(G, wdwGeo("wdgPebble", function () { var g = new THREE.IcosahedronGeometry(1, 0); g.scale(1, 0.45, 0.8); return g; }), wdwLam(0x9A9488), sh.map(function (t) { t.y -= 0.01; return t; }), {});
var wr = [];
for (var wz = -640; wz <= 640; wz += lite ? 3 : 1.2) {
var wx = 540 + Math.sin(wz * 0.05) * 3 + Math.sin(wz * 0.31) * 1.2;
wr.push({ x: wx, z: wz, y: H(wx, wz) + 0.01, s: 0.6 + 0.4 * Math.abs(Math.sin(wz * 1.3)), ry: wz });
}
wdwInst(G, wdwGeo("wdgWrack", function () { return wdwCards(2, 1.0, 0.22, 0); }), wdwLam(0x5A4A22, { ds: 1, map: wdwGrassTex(), mapk: "tuft", cut: 0.4 }), wr, {});
var sea = wdwScatter(1222, lite ? 3 : 10, 522, -260, 575, 300, function (x, z) { return Math.abs(z - L[1]) > 6; }, H, 1, 1);
sea.forEach(function (t, i) {
var c = wdwCreature(["crab", "crabyoung", "lobster"][i % 3], "sh" + i);
c.position.set(t.x, t.y, t.z);
c.rotation.y = t.ry;
G.add(c);
var P = { g: c, y: t.y, o: { wander: 4, sp: 0.2 } };
WDW.people.push(P);
if (typeof WDP !== "undefined" && WDP.creature && i % 2 === 0)
wdwTalk(P, ["An old Crab", "A young Crab", "A Lobster"][i % 3], WDP.creature, ["Ah, my dear! Let this be a lesson to you never to lose your temper!", "Hold your tongue, Ma! You're enough to try the patience of an oyster!", "Will you, won't you, will you, won't you, will you join the dance?"][i % 3]);
});
},
function (col) {
return wdlCardTex("wdgBloomD" + col, 128, 128, 0x3E6A2E, function (c, W, H) {
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
function () { return wdwGeo("wdgBloomG", function () { var parts = []; for (var i = 0; i < 3; i++) {
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
function (G, H) {
var A = WDW_GA, lite = wdwLite(), walks = [[[0, 316], [0, 180]], [[0, 80], [0, -120]], [[-120, 200], [120, 200]], [[60, 110], [200, 90], [380, 60], [500, 40]], [[-46, 110], [-46, -60]], [[46, 110], [46, -60]]];
var inCro = function (x, z) { return Math.abs(x - A.cro[0]) < 52 && Math.abs(z - A.cro[1]) < 40; }, nearPal = function (x, z) { return Math.abs(x - A.palace[0]) < 70 && z < -100 && z > -220; };
var cols = ["#E8302A", "#F6D23A", "#F8F4F0", "#9A48C0", "#F28A26", "#5A78E8", "#F07AA8"], lists = cols.map(function () { return []; }), soil = [], R = wRand(901);
for (var bx = -240; bx <= 240; bx += 36)
for (var bz = -60; bz <= 290; bz += 36) {
if (inCro(bx, bz) || nearPal(bx, bz) || walks.some(function (p) { return wdwPathD(bx, bz, p) < 15; }))
continue;
var by = H(bx, bz), ci = (Math.abs(bx + bz) / 36 | 0) % cols.length, n = lite ? 36 : 150;
soil.push({ x: bx, z: bz, y: by + 0.04, s: 1 });
(WDW.noTurf || (WDW.noTurf = [])).push({ x0: bx - 12.2, x1: bx + 12.2, z0: bz - 8.2, z1: bz + 8.2 });
for (var i = 0; i < n; i++) {
var x = bx - 11 + R() * 22, z = bz - 7 + R() * 14, ring = Math.abs(x - bx) > 8.5 || Math.abs(z - bz) > 4.5, c = ring ? (ci + 3) % cols.length : ci;
lists[c].push({ x: x, z: z, y: H(x, z) + 0.02, s: 0.8 + R() * 0.5, sy: 0.8 + R() * 0.6, ry: R() * 6.283 });
}
}
wdwInst(G, wdwGeo("wdgSoil", function () { var p = new THREE.PlaneGeometry(23.6, 15.6); p.rotateX(-Math.PI / 2); return p; }), wdwS("earth", 0x6A4A30, 2), soil, {});
cols.forEach(function (col, i) { if (!lists[i].length)
return; wdwInst(G, wdgBloomGeo(), wdwM("wdgBloomM" + col, function () { var m = new THREE.MeshLambertMaterial({ map: wdgBloomTex(col), alphaTest: 0.4 }); m.userData.noPhoto = 1; return m; }), lists[i], {}); });
var urn = [];
for (var ux = -110; ux <= 110; ux += 22) {
if (Math.abs(ux) < 12)
continue;
urn.push([ux, 194], [ux, 206]);
}
for (var uz = 150; uz <= 300; uz += 30)
urn.push([-5, uz], [5, uz]);
urn.forEach(function (u) {
var y = H(u[0], u[1]), g = new THREE.Group();
g.position.set(u[0], y, u[1]);
G.add(g);
var st = wdwMat("ashlar");
wdwBox(g, 0.7, 0.7, 0.7, st, 0, 0, 0);
wdwCyl(g, 0.18, 0.26, 0.4, st, 0, 0.7, 0, 12);
var bowl = new THREE.Mesh(new THREE.SphereGeometry(0.5, 14, 8, 0, 6.3, Math.PI / 2, Math.PI / 2), st);
bowl.position.y = 1.5;
bowl.rotation.x = Math.PI;
g.add(bowl);
wdwCyl(g, 0.52, 0.5, 0.08, st, 0, 1.46, 0, 16);
var fl = new THREE.Mesh(wdgBloomGeo(), wdwM("wdgBloomM#E8302A", function () { var m = new THREE.MeshLambertMaterial({ map: wdgBloomTex("#E8302A"), alphaTest: 0.4 }); m.userData.noPhoto = 1; return m; }));
fl.position.y = 1.48;
fl.scale.set(1.0, 0.9, 1.0);
g.add(fl);
wdwRound(u[0], u[1], 0.5, y - 1, y + 1.6);
});
},
function (G, H) {
var lite = wdwLite(), n = lite ? 90 : 320, pts = [[0, 200], [-120, 200], [120, 200]];
var dropT = wdwCanvas("wdgDrop", 32, 32, function (c, W, Hh) { var g = c.createRadialGradient(W / 2, Hh / 2, 0, W / 2, Hh / 2, W / 2); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(1, "rgba(255,255,255,0)"); c.fillStyle = g; c.fillRect(0, 0, W, Hh); });
pts.forEach(function (f, fi) {
var y0 = H(f[0], f[1]), pos = new Float32Array(n * 3), ph = [], g = new THREE.BufferGeometry();
for (var i = 0; i < n; i++) {
ph.push({ a: i / n * 6.283 * 7.3, t: (i * 0.618) % 1, s: 0.85 + ((i * 0.37) % 1) * 0.3 });
}
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var m = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xE8F4FF, size: lite ? 0.22 : 0.16, map: dropT, transparent: true, opacity: 0.75, depthWrite: false }));
m.position.set(f[0], y0, f[1]);
m.frustumCulled = false;
G.add(m);
var jet = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.12, 2.4, 8, 1, true), wdwLam(0xE8F4FF, { op: 0.45 }));
jet.position.set(f[0], y0 + 3.6, f[1]);
G.add(jet);
WDW.ticks.push(function (dt) {
var p = g.attributes.position, T = WDW.t;
for (var i = 0; i < n; i++) {
var q = ph[i], u = (T * 0.45 * q.s + q.t) % 1, r = u * 3.3 * q.s, yy = 4.8 + u * 2.6 - u * u * 6.4;
p.setXYZ(i, Math.cos(q.a) * r, Math.max(0.55, yy), Math.sin(q.a) * r);
}
p.needsUpdate = true;
});
});
},
function (G, H) {
var C = WDW_GA.cro, lite = wdwLite();
wdwTerrain(G, C[0] - 50, C[1] - 38, 100, 76, lite ? 1.4 : 0.7, function (x, z) { return H(x, z) + 0.03; }, wdwMat("meadow"), function (x, z, y, c) {
var g = 0.86 + wdwFbm(x * 0.04, z * 0.04, 2) * 0.14, rg = Math.sin((z - C[1]) * 0.9) * Math.cos((x - C[0]) * 0.15), bare = wdwFbm(x * 0.3, z * 0.3, 2) > 0.64 && rg < -0.3;
if (bare)
c.setRGB(0.44 * g, 0.35 * g, 0.22 * g);
else
c.setRGB((0.3 + 0.07 * rg) * g, (0.5 + 0.12 * rg) * g, (0.2 + 0.05 * rg) * g);
});
},
function (G, H) {
var lite = wdwLite(), R = wRand(911), sea = -1.4;
wdwWater(G, 1200, 0, 700, 1520, sea - 0.02, 0x2E5A78, 0.92);
var foamT = wdwCanvas("wdgFoam", 256, 64, function (c, W, Hh) { c.clearRect(0, 0, W, Hh); var r = wRand(13); for (var i = 0; i < 900; i++) {
var x = r() * W, y = Hh * 0.5 + (r() - 0.5) * Hh * 0.8 * r();
c.fillStyle = "rgba(255,255,255," + (0.25 + r() * 0.6) + ")";
c.beginPath();
c.arc(x, y, 0.8 + r() * 2.4, 0, 7);
c.fill();
} });
foamT.wrapS = THREE.RepeatWrapping;
foamT.repeat.set(30, 1);
var foams = [];
for (var k = 0; k < (lite ? 2 : 4); k++) {
var fm = new THREE.Mesh(new THREE.PlaneGeometry(10, 1520), new THREE.MeshLambertMaterial({ map: foamT, transparent: true, opacity: 0.9, depthWrite: false }));
fm.material.map.rotation = 0;
fm.rotation.x = -Math.PI / 2;
fm.rotation.z = Math.PI / 2 * 0;
fm.position.set(560, sea + 0.03, 0);
fm.renderOrder = 3;
G.add(fm);
foams.push({ m: fm, ph: k / (lite ? 2 : 4) });
}
WDW.ticks.push(function (dt) { var T = WDW.t; foams.forEach(function (f) { var u = (T * 0.08 + f.ph) % 1; f.m.position.x = 600 - u * 50; f.m.position.y = sea + 0.03 + Math.max(0, (u - 0.75)) * 0.6; f.m.material.opacity = 0.85 * Math.sin(Math.min(1, u) * Math.PI); f.m.scale.x = 1 + u * 0.6; }); });
var sw = [];
for (var s = 0; s < (lite ? 6 : 14); s++)
sw.push({ x: 620 + s * 24, z: 0, y: sea + 0.02, s: 1 });
var swell = wdwInst(G, wdwGeo("wdgSwell", function () { var p = new THREE.PlaneGeometry(3, 1520); p.rotateX(-Math.PI / 2); return p; }), wdwLam(0xC8E0E8, { op: 0.18 }), sw, {});
[[-1, -600], [1, 620]].forEach(function (e, ei) {
for (var c = 0; c < (lite ? 8 : 16); c++) {
var x = 470 + c * 18 + R() * 8, z = e[1] + e[0] * (R() * 60 + c * 6), hgt = 18 + R() * 16 - c * 0.6, g = new THREE.Group();
g.position.set(x, H(x, z) - 1, z);
G.add(g);
wdwEll(g, wdwS("b:limestone", 0xE8E4D8, 6), 10 + R() * 6, hgt, 14 + R() * 8, 0, hgt * 0.3, 0, 10);
wdwEll(g, wdwMat("darkrock"), 11 + R() * 5, 4, 15, 0, 0.6, 0, 10);
var top = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 6, 0, 6.3, 0, 1.2), wdwLam(0x5A8A3A));
top.scale.set(10, 3, 14);
top.position.y = hgt * 1.22;
g.add(top);
}
});
var groups = wdwScatter(912, lite ? 10 : 26, 470, -560, 600, 560, function (x, z) { return Math.abs(z - 40) > 16; }, H, 1, 1);
groups.forEach(function (t, gi) {
var n = 4 + (gi % 5);
for (var i = 0; i < n; i++) {
var x = t.x + (R() - 0.5) * 8, z = t.z + (R() - 0.5) * 8, s = 0.5 + R() * 1.8, y = H(x, z);
var g = new THREE.Group();
g.position.set(x, y - s * 0.3, z);
g.rotation.y = R() * 6;
G.add(g);
wdwEll(g, wdwMat(i % 2 ? "rock" : "darkrock"), s * 1.2, s * 0.8, s, 0, s * 0.3, 0, 9);
if (x > 535)
wdwEll(g, wdwLam(0x3A4A22), s * 1.25, s * 0.25, s * 1.05, 0, 0.05, 0, 9);
if (s > 1.2)
wdwRound(x, z, s * 0.9, y - 1, y + s);
}
});
var bm = [[548, -120], [556, -100], [540, -80], [552, -60], [530, -160], [526, -200]];
bm.forEach(function (b, i) {
var y = H(b[0], b[1]), g = new THREE.Group();
g.position.set(b[0], Math.max(y, sea - 0.6), b[1]);
g.rotation.y = Math.PI / 2;
G.add(g);
var body = wdwS("b:planks", [0xF0ECE0, 0xE8D8B0, 0xD8E4E8][i % 3], 1.4);
wdwBox(g, 1.8, 2.0, 2.6, body, 0, 0.8, 0);
var stripe = wdwLam([0x2A4A8A, 0xA82A2A, 0x2A6A3A][i % 3]);
for (var s2 = 0; s2 < 4; s2++)
wdwBox(g, 1.82, 0.18, 2.62, stripe, 0, 1.0 + s2 * 0.42, 0);
var roof = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 2.7, 12, 1, false, 0, Math.PI), wdwLam(0x6A6A70));
roof.rotation.z = Math.PI / 2;
roof.rotation.y = Math.PI / 2;
roof.position.y = 2.8;
roof.scale.set(1, 1, 0.5);
g.add(roof);
[-1, 1].forEach(function (k) { [-0.9, 0.9].forEach(function (zz) { var w = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.08, 14), wdwMat("darkoak")); w.rotation.x = Math.PI / 2; w.position.set(k * 0.95, 0.55, zz); w.rotation.z = Math.PI / 2; g.add(w); }); });
var aw = wdwBox(g, 1.6, 0.06, 1.2, wdwLam(0xF4F0E8), 0, 2.2, 1.8);
aw.rotation.x = 0.4;
wdwBox(g, 0.3, 0.6, 0.8, wdwMat("oak"), 0, 0, 1.6);
wdwSolid(b[0], b[1], 2.8, 2.0, y - 1, y + 3);
});
var gulls = [], gm = wdwLam(0xF4F4F0, { ds: 1 });
for (var q = 0; q < (lite ? 5 : 14); q++) {
var gg = new THREE.Group();
[-1, 1].forEach(function (k) { var w = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.16), gm); w.position.x = k * 0.3; w.rotation.z = k * 0.25; gg.add(w); });
G.add(gg);
gulls.push({ g: gg, a: R() * 6.283, r: 20 + R() * 60, cx: 560 + R() * 80, cz: (R() - 0.5) * 500, h: 8 + R() * 14, sp: 0.08 + R() * 0.1 });
}
WDW.ticks.push(function (dt) { var T = WDW.t; gulls.forEach(function (u) { u.a += dt * u.sp; u.g.position.set(u.cx + Math.cos(u.a) * u.r, u.h + Math.sin(T * 0.7 + u.a) * 1.2, u.cz + Math.sin(u.a) * u.r); u.g.rotation.y = -u.a; u.g.children.forEach(function (w, k) { w.rotation.z = (k ? 1 : -1) * (0.2 + Math.sin(T * 4 + u.a) * 0.35); }); }); });
var wr = wdwScatter(913, lite ? 120 : 520, 520, -640, 560, 640, null, H, 0.4, 1.1);
wdwInst(G, wdwGeo("wdgWrack", function () { var p = new THREE.PlaneGeometry(1.2, 0.5); p.rotateX(-Math.PI / 2); return p; }), wdwM("wdgWrackM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A4A22, map: wdwLeafTex(), alphaTest: 0.4 }); m.userData.noPhoto = 1; return m; }), wr.map(function (t) { return { x: t.x, z: t.z, y: t.y + 0.04, s: t.s, ry: t.ry }; }), {});
},
function () {
var S = wdwSc(), k = S.env;
if (WDW.envK && WDW_ENV[WDW.envK])
k = WDW.envK;
if (WDW.night)
k = WDW.envK === "moon" || WDW.envK === "storm" ? WDW.envK : "night";
if (wdwInRoom()) {
var L = wdwLocalSc(), R = wdwRoomAt(L.x, L.z);
k = R ? R.env : "indoor";
}
var E = {}, B = WDW_ENV[k] || WDW_ENV.lake;
for (var q in B)
E[q] = B[q];
if (wdwLite() && E.fogD)
E.fogD *= 1.35;
return E;
},
function (x, z, feet) {
if (WDW.moving || WDW.ride)
return true;
var S = wdwSc(), D = WDW_SCN[WDW.sc];
if (!D)
return false;
if (wdwInRoom()) {
if (wdwSolidAt(x, z, feet))
return true;
return wdwFloorAt(x, z, feet) === null;
}
if (Math.abs(x) > S.bound || Math.abs(z) > S.bound)
return true;
if (wdwSolidAt(x, z, feet))
return true;
var fl = wdwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = wdwLand(x, z);
if (hh > feet + 1.3 * Math.min(1.4, Math.max(0.12, WDW.size || 1)))
return true;
if (feet - hh > 7)
return true;
var w = D.wl ? D.wl(x, z) : null;
if (w !== null && w - hh > 1.1)
return true;
return false;
},
function (L) {
if (wdwInRoom()) {
var R = wdwRoomAt(L.x, L.z);
if (R)
return R.name;
}
var best = null, bd = 1e9;
for (var k in WDW_AT) {
var A = WDW_AT[k];
if (A.sc !== WDW.sc || !(A.name || WDW_ATN[k]))
continue;
var d = Math.hypot(A.x - L.x, A.z - L.z);
if (d < bd) {
bd = d;
best = A.name || WDW_ATN[k];
}
}
return best && bd < 70 ? best : wdwSc().name;
},
function (dt) {
WDW.t += dt;
if (!WDW.built || !WDW.scG)
return;
wdwSizeTick(dt);
var S = wdwSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72 - wdwEyeOff();
WDW.inRm = wdwInRoom();
WDW.et = (WDW.et || 0) + dt;
if (WDW.et > 0.8) {
WDW.et = 0;
worldEnv(wdwEnvNow());
}
var flow = WDW.t * 0.03;
WDW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * (m.userData.fx || 0.3), flow * (m.userData.fz || 1)); });
WDW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (WDW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(WDW.t * 3 + i * 2)) * 0.3; f.rotation.y = WDW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(WDW.t * 1.3) * 0.08;
}
else if (k === "snowfall") {
var pa = F.geometry.attributes.position;
for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) - dt * (F.userData.sp || 1.4);
if (y < 0)
y += 40;
pa.setY(i, y);
pa.setX(i, pa.getX(i) + Math.sin(WDW.t * 0.5 + i) * dt * 0.3);
}
pa.needsUpdate = true;
F.position.set(L.x, WDW.inRm ? -500 : wdwLand(L.x, L.z), L.z);
}
});
(WDW.ticks || []).forEach(function (f) { try {
f(dt, L);
}
catch (e) { } });
(WDW.smoke || []).forEach(function (g) { g.children.forEach(function (m, i) { m.position.x += Math.sin(WDW.t * 0.1 + i) * dt * 0.4; m.rotation.y += dt * 0.02; }); });
WDW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return wdwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof wdbTick === "function")
try {
wdbTick(dt, L);
}
catch (e) {
var em = String(e && e.message);
WDW.e1 = WDW.e1 || {};
if (!WDW.e1[em]) {
WDW.e1[em] = 1;
if (window.console)
console.warn("[wonderland] book", e && e.stack ? String(e.stack).slice(0, 400) : e);
}
}
if (!WDW.bannerBook)
worldBanner("<b>🐇 " + WDW_NAME + "</b> · " + esc(wdwPlaceName(L)) + (WDW.night ? " · night" : ""));
WDW.pt = (WDW.pt || 0) + dt;
if (WDW.pt < 0.15)
return;
WDW.pt = 0;
if (WDW.moving || WDW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
WDW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof wdbTalk === "function" && wdbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
WDW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : wdwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof wdbSpot === "function")
wdbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof wdbIdlePrompt === "function")
wdbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = wdwAtPt(opt.at) || (typeof wdbStartAt === "function" && wdbStartAt()) || wdwAtPt("oak");
try {
wdwCrxKinds();
if (typeof crxWarm === "function" && !wdwLite())
crxWarm(WDW_CRX_WARM);
}
catch (e) { }
wdwScene(A.sc);
var S = WDW_SC[A.sc], y = A.y != null ? A.y : wdwGround(A.x, A.z);
camera.position.set(WDW.base + S.x + A.x, y + 1.72 + wdwEyeOff(), A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
WDW.moving = false;
WDW.ride = null;
WDW.inRm = wdwInRoom();
worldEnv(wdwEnvNow());
setStatus("🐇 <b>" + WDW_NAME + ".</b> Lewis Carroll's book, the whole of it: the riverbank, the rabbit-hole, the long low hall, the pool of tears, the White Rabbit's house, the Caterpillar's mushroom, the Duchess's kitchen, the mad tea-party, the Queen's croquet-ground and the court. <b>Press E</b> for the book.");
if (typeof wdbEnter === "function")
try {
wdbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[wonderland] enter", e);
}
},
function () {
wdwSceneDrop();
for (var k in WDW.mats) {
var m = WDW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in WDW.tex) {
var x = WDW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in WDW_GEO) {
try {
WDW_GEO[g].dispose();
}
catch (e) { }
}
WDW.mats = {};
WDW.tex = {};
WDW_GEO = {};
WDW.built = false;
WDW.G = null;
WDW.lights = 0;
},
function (P, n, sp) {
var lite = wdwLite();
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
WDW.fx.push(p);
return p;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = WDW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = WDW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: WDW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return wdbPos(at.at);
var C = WDB_CH[wdbS().ch], i = wdbS().s, c = C && C.cast ? C.cast.filter(function (d) { return wdbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? wdbPos(c.at) : null;
}
if (at.spot) {
var Sp = WDW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: WDW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return wdbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || WDW.sc, x: at.x, z: at.z, y: at.y };
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
if (WDB.beam && WDB.beam.parent === WDW.scG)
return WDB.beam;
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
WDW.scG.add(g);
WDB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return wdwLam(c); }, m;
switch (kind) {
case "load":
m = wdwBox(g, 0.62, 0.42, 0.48, wdwMat("planks"), 0, 0, 0);
[-0.22, 0.22].forEach(function (x) { wdwBox(g, 0.05, 0.44, 0.5, wdwMat("darkoak"), x, 0, 0); });
wdwBox(g, 0.66, 0.04, 0.52, wdwMat("darkoak"), 0, 0.42, 0);
wdwBox(g, 0.12, 0.06, 0.03, wdwMat("iron"), 0, 0.3, 0.25);
break;
case "rifle":
var rf = new THREE.Group();
rf.rotation.y = 0.4;
g.add(rf);
m = wdwCyl(rf, 0.018, 0.018, 0.8, wdwMat("iron"), 0, 0, 0, 8);
m.rotation.x = Math.PI / 2;
m.position.set(0, 0.06, -0.3);
wdwBox(rf, 0.06, 0.07, 0.34, wdwMat("darkoak"), 0, 0.02, 0.02);
var stk = wdwBox(rf, 0.05, 0.12, 0.36, wdwMat("darkoak"), 0, 0, 0.32);
stk.rotation.x = -0.12;
wdwBox(rf, 0.03, 0.04, 0.08, wdwMat("brass"), 0, 0.08, 0.1);
break;
case "thorn":
m = wdwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = wdwCyl(g, 0.07, 0.08, 1.4, wdwMat("bark"), 0, 0, 0, 8);
m.rotation.z = Math.PI / 2;
m.position.y = 0.08;
var tw = wdwCyl(g, 0.025, 0.03, 0.4, wdwMat("bark"), 0, 0, 0, 6);
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
m = wdwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
wdwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = wdwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
wdwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), wdwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "pencil":
for (var pi = 0; pi < 3; pi++) {
var pc = wdwCyl(g, 0.012, 0.012, 0.18, M([0xC8A030, 0x3A6A3A, 0xA83A2A][pi]), 0, 0, 0, 6);
pc.rotation.z = Math.PI / 2;
pc.rotation.y = pi * 0.3;
pc.position.set(0, 0.014, (pi - 1) * 0.04);
}
m = g.children[0];
break;
case "note":
m = wdwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "paper":
m = wdwBox(g, 0.34, 0.03, 0.46, M(0xE8E2D0), 0, 0.02, 0);
wdwBox(g, 0.3, 0.005, 0.08, M(0x2A2A2A), 0, 0.04, -0.16);
break;
case "bread":
m = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), M(0xC8945A));
m.scale.set(1.5, 0.8, 1);
m.position.y = 0.1;
g.add(m);
break;
case "bottle":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 10), wdwShine(0x1A3A1A, 0.2, 0));
m.position.y = 0.15;
g.add(m);
var nk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.1, 8), wdwShine(0x1A3A1A, 0.2, 0));
nk.position.y = 0.35;
g.add(nk);
break;
case "tin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 12), wdwShine(0xA8A8A0, 0.4, 0.6));
m.position.y = 0.05;
g.add(m);
break;
case "coin":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.01, 12), wdwShine(0xE8C060, 0.3, 0.9));
m.position.y = 0.01;
g.add(m);
break;
case "spade":
m = wdwBox(g, 0.05, 0.05, 1.0, M(0x6A4A2A), 0, 0.03, 0);
wdwBox(g, 0.2, 0.02, 0.26, wdwShine(0x8A8A88, 0.4, 0.7), 0, 0.02, 0.6);
break;
case "post":
m = wdwBox(g, 0.08, 1.1, 0.08, M(0xE8E0CC), 0, 0, 0);
break;
case "skin":
m = new THREE.Mesh(wdwGeo("wdSkin", function () { var sh = new THREE.Shape(); sh.moveTo(-0.5, 0); sh.quadraticCurveTo(-0.6, 0.3, -0.3, 0.42); sh.lineTo(-0.1, 0.3); sh.lineTo(0.1, 0.3); sh.lineTo(0.3, 0.42); sh.quadraticCurveTo(0.6, 0.3, 0.5, 0); sh.quadraticCurveTo(0.6, -0.3, 0.3, -0.42); sh.lineTo(0, -0.36); sh.lineTo(-0.3, -0.42); sh.quadraticCurveTo(-0.6, -0.3, -0.5, 0); var e = new THREE.ShapeGeometry(sh); e.rotateX(-Math.PI / 2); return e; }), M(0xB8904A));
m.position.y = 0.02;
g.add(m);
break;
case "cane":
m = wdwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
break;
case "shell":
m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), M(0xD8C8A8));
m.scale.y = 0.4;
m.position.y = 0.05;
g.add(m);
break;
case "book":
m = wdwBox(g, 0.22, 0.06, 0.3, M(0x5A2A1A), 0, 0, 0);
wdwBox(g, 0.2, 0.05, 0.28, M(0xE8E0CC), 0.012, 0.005, 0);
break;
case "letter":
m = wdwBox(g, 0.22, 0.01, 0.15, M(0xF2ECDC), 0, 0.01, 0);
wdwBox(g, 0.04, 0.012, 0.04, M(0x8A1A1A), 0, 0.016, 0);
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
var rt = wdwCyl(g, 0.012, 0.02, 0.3, M(0x8A6A4A), 0, 0, 0, 5);
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
m = wdwBox(g, 0.03, 0.015, 0.24, wdwShine(0xC8C8D0, 0.25, 0.9), 0, 0.02, -0.12);
wdwBox(g, 0.04, 0.035, 0.12, wdwMat("darkoak"), 0, 0.01, 0.06);
break;
case "rope":
m = new THREE.Mesh(wdwGeo("wdCoilI", function () { return new THREE.TorusGeometry(0.2, 0.035, 6, 18); }), wdwMat("rope"));
m.rotation.x = Math.PI / 2;
m.position.y = 0.04;
g.add(m);
var m2b = m.clone();
m2b.scale.set(0.75, 0.75, 1);
m2b.position.y = 0.1;
g.add(m2b);
break;
case "spear":
m = wdwCyl(g, 0.022, 0.022, 1.9, wdwMat("oak"), 0, 0, 0, 6);
m.rotation.z = Math.PI / 2;
m.position.y = 0.05;
var tip = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.22, 6), wdwShine(0x8A8A88, 0.35, 0.7));
tip.rotation.z = -Math.PI / 2;
tip.position.set(1.05, 0.05, 0);
g.add(tip);
break;
case "arrow":
for (var ar = 0; ar < 3; ar++) {
var sh2 = wdwCyl(g, 0.008, 0.008, 0.7, wdwMat("oak"), 0, 0, 0, 5);
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
var bn = wdwCyl(g, 0.02, 0.02, 0.2, M(0xE8E0CC), 0, 0, 0, 6);
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
m = wdwBox(g, 0.16, 0.26, 0.16, M(0x3A3A3A), 0, 0, 0);
var lf = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), wdwGlowM(0xFFD070, 0.9));
lf.position.y = 0.13;
g.add(lf);
break;
case "pistol":
m = wdwBox(g, 0.05, 0.06, 0.34, M(0x3A3A40), 0, 0.03, 0);
wdwBox(g, 0.05, 0.14, 0.08, M(0x5A3A1A), 0, 0, 0.14);
break;
case "locket":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.015, 14), wdwShine(0xD8B048, 0.3, 0.9));
m.position.y = 0.02;
g.add(m);
break;
case "flask":
m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), wdwMat("glass"));
m.position.y = 0.08;
g.add(m);
wdwCyl(g, 0.02, 0.02, 0.1, wdwMat("glass"), 0, 0.14, 0, 6);
break;
case "cloak":
m = wdwBox(g, 0.6, 0.08, 0.5, M(0x3A3A4A), 0, 0.04, 0);
break;
case "fire":
m = wdwBox(g, 0.5, 0.1, 0.5, M(0x3A2A1A), 0, 0, 0);
wdwFire(g, 0, 0.08, 0, 0.4);
break;
case "chain":
m = wdwBox(g, 0.4, 0.04, 0.04, M(0x8A8A90), 0, 0.02, 0);
break;
case "key":
m = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.008, 6, 14), wdwShine(0xE8C048, 0.25, 0.9));
m.position.y = 0.04;
m.rotation.x = Math.PI / 2;
g.add(m);
wdwBox(g, 0.1, 0.01, 0.01, wdwShine(0xE8C048, 0.25, 0.9), 0.07, 0.04, 0);
break;
case "bottle":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.12, 12), wdwShine(0x5A8A9A, 0.1, 0));
m.position.y = 0.06;
g.add(m);
wdwCyl(g, 0.012, 0.02, 0.05, wdwShine(0x5A8A9A, 0.1, 0), 0, 0.12, 0, 8);
wdwSign(g, "DRINK ME", 0.07, 0.04, 0, 0.06, 0.042, 0, { bg: "#F4EAD0", ink: "#1A1A1A" });
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
var vn = wdwBox(g, 0.02, 0.004, 0.24, M(0xF4ECE0), Math.sin((fv - 4) * 0.16) * 0.12, 0.01, Math.cos((fv - 4) * 0.16) * 0.12);
vn.rotation.y = (fv - 4) * 0.16;
}
break;
case "gloves":
[0, 0.1].forEach(function (o) { var gv = wdwBox(g, 0.07, 0.015, 0.17, M(0xF6F2EA), o, 0.01, 0); gv.rotation.y = 0.3 + o * 2; });
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
m = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.016, 0.025, 10), wdwShine(0xC8C8C0, 0.3, 0.8));
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
wdwCyl(g, 0.06, 0.06, 0.01, M(0xA81A2A), 0, 0.04, 0, 10);
break;
case "brush":
wdwBox(g, 0.03, 0.03, 0.3, M(0x6A4A2A), 0, 0.02, 0);
wdwBox(g, 0.06, 0.04, 0.06, M(0xC81A2A), 0, 0.02, 0.17);
break;
case "watch":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.015, 16), wdwShine(0xE8C048, 0.25, 0.9));
m.position.y = 0.01;
g.add(m);
wdwCyl(g, 0.034, 0.034, 0.004, M(0xF4F0E4), 0, 0.017, 0, 16);
break;
case "slate":
wdwBox(g, 0.26, 0.012, 0.18, M(0x2A2A2E), 0, 0.006, 0);
wdwBox(g, 0.28, 0.014, 0.2, M(0x8A6A3A), 0, 0, 0);
break;
case "pepper":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.1, 10), wdwShine(0xC8C8C0, 0.3, 0.7));
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
if (!P || !WDW.scG || P.sc !== WDW.sc)
return null;
var g = wdbItemMesh(kind), y = P.y != null ? P.y : wdwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
WDW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = wdwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (WDB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = WDW.spots.indexOf(I.S); if (j >= 0)
WDW.spots.splice(j, 1); WDB.items = WDB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.wdb = 1;
WDB.items.push(I);
return I;
},
function (k) {
if (WDB.tuneKey === k)
return;
WDB.tuneKey = k;
var old = WDB.tune;
WDB.tune = null;
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
if (!k || !WDB_TUNES[k])
return;
try {
var A = new Audio(WDB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
WDB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (WDB.tune !== A) {
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
if (WDB.text)
return fn(WDB.text);
if (WDB.textWait) {
WDB.textWait.push(fn);
return;
}
WDB.textWait = [fn];
var done = function (B) { WDB.text = B; var w = WDB.textWait; WDB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/wonderland/wonderland.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
wdbText(function (B) {
var C = WDB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + wdbNum(i) + ". " + esc(C.t) + "</h3>" + WDB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(wdbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); WDB.readOpen = 0; WDB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = wdbS(), C = WDB_CH[S.ch];
if (!C)
return;
WDB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
WDB.readAsk = 0;
WDB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : WDW_NAME) + "</div><h3 style='margin:4px 0'>" + wdbNum(ch) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? T.p.slice(0, C.p0 != null ? C.p0 : 1).map(wdbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); WDB.readOpen = 0; wdbStepDone(); }, all: function () { wdbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Carroll's own words, all of it");
b += wdbKeeperBtns(fns);
worldCard(b, fns);
};
wdbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
WDB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); wdbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = wdbS(), C = WDB_CH[S.ch];
if (!C)
return;
wdbItemsClear();
wdbCastClear();
WDB.hold = 0;
var go = function () { wdbWorldState(); wdbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[wdb] setup", S.ch, e);
} wdbTune(C.tune || null); wdbStepBegin(); };
if (place && C.start) {
var P = wdbPos(C.start);
if (P && WLD.on === WDW_KEY) {
wdwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (WDW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = wdbStep();
wdbItemsClear();
WDB.hold = 0;
WDB.puzOpen = 0;
if (!b)
return;
b._key = wdbKey();
wdbWorldState();
try {
if (b.on)
b.on(wdbS().f);
}
catch (e) {
if (window.console)
console.warn("[wdb] on", e);
}
if (b.k === "read") {
wdbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { WDB.rew[k] = 0; });
if (b.k === "find") {
var Pf = wdbPos(b.at);
if (Pf && Pf.sc === WDW.sc)
wdbItemAdd(b.item, Pf, b.name, b.verb, function () { if (wdbKey() === b._key)
wdbStepDone(); });
}
if (b.k === "gather") {
var P = wdbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(wdbS().ch * 97 + wdbS().s * 13 + 7);
WDB.got = 0;
if (P && P.sc === WDW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = wdwGround(Q.x, Q.z, (P.y != null ? P.y : wdwLand(P.x, P.z)) + 1);
wdbItemAdd(b.item, Q, b.name, b.verb, function () { if (wdbKey() !== b._key)
return; WDB.got++; try {
if (b.each)
b.each(WDB.got);
}
catch (e) { } if (WDB.got < n) {
wdbSay((b.eachSay || "Got one.") + " " + WDB.got + " of " + n + ".");
return;
} wdbStepDone(); });
}
}
if (b.h)
wdbSay("<b>" + esc(WDB_CH[wdbS().ch].t) + ".</b> " + b.h);
},
function (b) {
WDB.puzOpen = 1;
WDB.puzT = performance.now();
var k = wdbKey(), fns = {}, h = WDB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + wdbExpand(b.html) + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
wdbSay(b.yes);
if (wdbKey() === k)
wdbStepDone();
return;
}
wdbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (wdbKey() === k)
WDB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = wdbS(), C = WDB_CH[S.ch], b = wdbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[wdb] done", e);
}
if (b.say)
wdbSay(b.say);
S.s++;
if (window.WDB_LOG)
WDB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= WDB_CH.length - 1) {
S.done = 1;
S.s = 0;
wdbSave();
wdbItemsClear();
wdbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
wdbSave();
var nx = WDB_CH[S.ch];
setTimeout(function () { try {
wdbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[wdb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
wdbSave();
wdbStepBegin();
},
function () {
wdbTune("end");
var S = wdbS();
wdwSizeSet(1);
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>" + wdQ("and how she would gather about her other little children, and make THEIR eyes bright and eager with many a strange tale, perhaps even with the dream of Wonderland of long ago") + "</p><p style='font-size:12px;opacity:.75'>Lewis Carroll, Alice's Adventures in Wonderland (1865), the last chapter</p><p>You have followed the White Rabbit down the rabbit-hole; found the golden key and the little door; shrunk and grown and swum in the pool of tears; run the Caucus-race; been sent for the Rabbit's gloves and fan; taken advice from a Caterpillar; nursed the Duchess's baby; sat at the mad tea-party; painted the roses red and played croquet with a flamingo; heard the Mock Turtle's story and danced the Lobster Quadrille; sat in the court when the Knave of Hearts was tried; and woken on the bank with the dead leaves fluttering down. On the other side of the looking-glass, the second book is waiting in the Mirror World.</p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; wdbSave(); wdbChapterBegin(true); } };
b += worldBtn("again", "Read it again from the start", "The riverbank, a hot summer afternoon");
if (typeof bhnOpen === "function") {
b += worldBtn("hon", "🏅 The book's honours", "Its badge, its decor, and its vault");
fns.hon = function () { worldCard(null); bhnOpen("alice"); };
}
worldCard(b, fns);
},
function (c) {
var C = WDB.cast[c.key || c.k];
if (wdbCastLive(C))
return C;
var P = wdbPos(c.at);
if (!P || P.sc !== WDW.sc)
return null;
var F = WDW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute, name: c.name, s: c.s };
if (c.dy != null)
o.y = wdwGround(P.x, P.z, 500) + c.dy;
var Pp;
if (c.beast) {
var yb = o.y != null ? o.y : wdwGround(P.x + (c.ox || 0), P.z + (c.oz || 0), 500), gb = wdwCreature(c.beast, c.key || c.k);
WDW.scG.add(gb);
gb.position.set(P.x + (c.ox || 0), yb, P.z + (c.oz || 0));
gb.rotation.y = c.ry || 0;
if (c.s)
gb.scale.multiplyScalar(c.s);
Pp = { g: gb, y: yb, o: {} };
WDW.people.push(Pp);
if (c.name && !c.mute)
wdwTalk(Pp, c.name, wdwPersona(c.persona || c.k), c.greet || "", c.r || 3.6);
}
else if (F.name && !c.dress)
Pp = wdwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = wdwDressed("wdb" + (c.key || c.k), c.dress || "gent", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : wdwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
WDW.scG.add(g);
Pp = { g: g, y: y, o: {} };
WDW.people.push(Pp);
if (c.name && !c.mute)
wdwTalk(Pp, c.name, wdwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
WDB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return WDB.cast[c.key || c.k];
},
function () {
var C = WDB_CH[wdbS().ch];
if (!C || !C.cast)
return;
var idx = wdbS().s;
var on = {};
C.cast.forEach(function (c) { var key = c.key || c.k; if (!(c.from != null && idx < c.from) && !(c.until != null && idx >= c.until) && !on[key])
on[key] = c; });
C.cast.forEach(function (c) {
var key = c.key || c.k, want = on[key], have = WDB.cast[key];
if (!want) {
if (have)
wdbCastHide(key);
return;
}
if (want !== c)
return;
if (have && have.c && have.c !== c)
wdbCastHide(key);
if (!wdbCastLive(WDB.cast[key]))
wdbCastAdd(c);
});
},
function () {
var b = wdbStep(), key = "pass", have = WDB.cast[key];
var want = b && b.k === "talk" && b.at && b.at.at ? b : null, P = want ? wdbPos(want.at.at) : null;
if (!want || !P || P.sc !== WDW.sc) {
if (have)
wdbCastHide(key);
return;
}
if (have && have.b === want && wdbCastLive(have))
return;
if (have)
wdbCastHide(key);
if (!want.pass && WDW.talk.some(function (T) { return T.name === want.who && T.p && T.p.g && T.p.g.parent; }))
return;
var pa = want.pass || {}, nm = String(want.who), fem = /woman|lady|girl|wife|Mrs|Miss|mother|maid/i.test(nm), kid = pa.child || /boy|girl|child/i.test(nm);
var dr = pa.dress || (fem ? (kid ? "girl" : "maid") : (kid ? "boy" : "gent"));
var Pp = wdwOne("pass" + wdbS().ch + "_" + wdbS().s, want.who, pa.sex || (fem ? "f" : "m"), dr, P.x, P.z, pa.ry || 0, pa.greet || "", { y: P.y, child: !!kid, persona: WDP.townfolk });
if (Pp)
WDB.cast[key] = { g: Pp.g, P: Pp, c: { k: key }, b: want };
},
function () {
if (!WDW.scG)
return;
wdbCastClear();
var S = wdbS(), C = WDB_CH[S.ch];
if (S.started && !S.done && C && C.cast && wdbCastHere(C)) {
wdbCastTick();
return;
}
(WDB_FOLK_AT[WDW.sc] || []).forEach(function (q) { var key = "f_" + q[0]; var Pp = wdwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
WDB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!wdbActive())
return false;
var b = wdbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = wdbKey();
worldPrompt(null);
var next = function () { if (wdbKey() === k)
wdbStepDone(); };
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
var body = wdbExpand(b.card[1]);
worldCard(WDB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + body + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
wdbVoices(T.name, body, k);
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
WDB.wt += dt;
if (WDB.wt > 0.5) {
WDB.wt = 0;
if (wdbActive() && wdbCastHere(WDB_CH[wdbS().ch]))
wdbCastTick();
if (wdbActive())
wdbPassTick();
var S0 = wdbS();
S0.seen[WDW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!wdbActive()) {
if (WDB.beam)
WDB.beam.visible = false;
WDW.bannerBook = false;
return;
}
var S = wdbS(), b = wdbStep(), t = WDW.t, feet = camera.position.y - 1.72 - wdwEyeOff();
WDB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? wdbPos(b.at) : null, here = P && P.sc === WDW.sc, bm = wdbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + wdbScName(P.sc) + ": press E for the book)";
if (here && !WDW.moving && !WDW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : wdwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = wdbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !WDW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (WDB.readAsk)
break;
if (!WDB.readOpen)
wdbChapterCard();
else {
WDB.readOpen = 0;
wdbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
wdbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
WDB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(WDB.hold, dt);
}
catch (e) { }
if (WDB.hold >= (b.sec || 8)) {
wdbStepDone();
return;
}
}
else
WDB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return WDB.rew[k]; })) {
wdbStepDone();
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
wdbStepDone();
return;
}
break;
}
case "puzzle":
if ((!WDB.puzOpen || performance.now() - (WDB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
wdbPuzzleCard(b);
break;
}
}
var C = WDB_CH[S.ch], prog = b && b.k === "hold" && WDB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - WDB.hold)) + " s)" : b && b.k === "gather" ? " (" + (WDB.got || 0) + " of " + (b.n || 3) + ")" : "";
WDW.bannerBook = true;
worldBanner("⚡ <b>" + wdbNum(S.ch) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = wdbS(), C = WDB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Lewis Carroll · Alice's Adventures in Wonderland (1865), the whole book</div><h3 style='margin:4px 0'>🐇 Alice's Adventures in Wonderland</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + wdbNum(S.ch) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((wdbStep() || {}).h || "") + "</p>";
var st = wdbStep(), P = st && st.at ? wdbPos(st.at) : null, Cs = wdbPos(C.start);
var to = P && P.sc !== WDW.sc ? P : (!P && Cs && Cs.sc !== WDW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + wdbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); wdwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { wdbPopulate(); wdbStepBegin(); }); };
}
}
else
b += "<p>A hot summer afternoon on a riverbank. Alice is tired of sitting by her sister with nothing to do, when a White Rabbit with pink eyes runs close by her, takes a watch out of its waistcoat-pocket, and hurries down a large rabbit-hole under the hedge. You go down after them. All twelve chapters, every one played: the long fall, the hall of locked doors and the golden key, DRINK ME and EAT ME, the pool of tears, the Caucus-race, the White Rabbit's house, the Caterpillar on his mushroom, the Duchess's kitchen and the Cheshire Cat, the mad tea-party, the Queen's croquet-ground, the Gryphon and the Mock Turtle, and the trial of the Knave of Hearts. About three and a half hours at your own pace; your place is kept.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: the riverbank", S.started ? "Back to where you were" : "\"and what is the use of a book,\" thought Alice, \"without pictures or conversations?\"");
fns.go = function () { worldCard(null); wdbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; wdbSave(); wdbBegin(); };
}
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(WDW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(WDW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = (WDW_SCN[k].start || { x: 0, z: 0 }); wdwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, wdbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += wdbKeeperBtns(fns);
worldCard(b, fns);
},
function (h) {
return String(h == null ? "" : h).replace(/\u27E6(\d+):(\d+)-(\d+)\u27E7/g, function (m, c, a, b) {
var T = WDB.text && WDB.text.ch && WDB.text.ch[+c];
if (!T) {
try {
wdbText(function () { });
}
catch (e) { }
return "<p><i>(The page is being fetched: close this and open it again in a moment.)</i></p>";
}
var out = "";
for (var i = +a; i <= +b && i < T.p.length; i++)
out += wdbPara(T.p[i]);
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
var i = 0, step = function () { if (i >= L.length || wdbKey() !== k)
return; var q = L[i++], V = WDW_VO[q[0]] || [], c = { name: q[0], ftkSex: V[0], ftkAge: V[1], fvoP: V[2], fvoRt: V[3] }; try {
fvoSpeak(c, q[1], function () { setTimeout(step, 250); });
}
catch (e) { } };
step();
},
function (C) {
var R = function (v) { return typeof v === "string" ? wdbIdx(C, v) : v; };
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
WDB_CH.push(C);
return C;
},
function (st, s) {
var v = function (k) { return wdbStV(st[k]); }, reb = false;
Object.keys(WDW.st).forEach(function (k) { if (!(k in st) && WDW.st[k] != null && WDW.st[k] !== false) {
delete WDW.st[k];
if (WDW_LIVEK.indexOf(k) < 0)
reb = true;
} });
Object.keys(st).forEach(function (k) { if (k === "env" || k === "night" || k === "nightUntil" || k === "nightFrom")
return; var nv = v(k); if (WDW.st[k] !== nv) {
WDW.st[k] = nv;
if (WDW_LIVEK.indexOf(k) < 0)
reb = true;
} });
if (typeof wdwLiveState === "function")
try {
wdwLiveState();
}
catch (e) { }
if (reb && !WDW.rebuilding && WDW.scBuilt) {
WDW.rebuilding = 1;
try {
wdwRebuild();
}
catch (e) { }
WDW.rebuilding = 0;
}
},
function (dt, L) {
if (WDW.sc !== "wonder")
return;
var C = WDW_WO.race, dx = L.x - C[0], dz = L.z - C[1], d = Math.hypot(dx, dz);
if (d < 5 || d > 20) {
return;
}
var a = Math.atan2(dz, dx);
if (WDW.raceA == null) {
WDW.raceA = a;
WDW.raceSum = 0;
return;
}
var da = a - WDW.raceA;
while (da > Math.PI)
da -= 6.283;
while (da < -Math.PI)
da += 6.283;
WDW.raceA = a;
WDW.raceSum = (WDW.raceSum || 0) + da;
if (Math.abs(WDW.raceSum) >= 6.0) {
WDW.raceLaps = (WDW.raceLaps || 0) + 1;
WDW.raceSum = 0;
setStatus("🏁 <b>Round the course!</b> “The race is over!”");
}
},
function (keys, sec) {
var C = keys.map(function (k) { return WDB.cast[k]; }).filter(function (c) { return c && c.g; });
if (!C.length)
return;
var cx = 0, cz = 0;
C.forEach(function (c) { cx += c.g.position.x; cz += c.g.position.z; });
cx /= C.length;
cz /= C.length;
var t = 0;
WDW.ticks.push(function (dt) { if (t > sec)
return; t += dt; C.forEach(function (c, i) { if (!c.g.parent)
return; var a = t * 0.7 + i / C.length * 6.283, r = 2.6 + Math.sin(t * 1.4 + i) * 0.4; c.g.position.x = cx + Math.cos(a) * r; c.g.position.z = cz + Math.sin(a) * r; c.g.rotation.y = -a; c.g.position.y += Math.sin(t * 6 + i) * 0.004; }); });
},
function () {
if (typeof KGN === "undefined" || !KGN.live || KGN.wdl)
return;
KGN.wdl = 1;
var X0 = KGN_LW.x0 + WDL_BANK.x, Z0 = WDL_BANK.z, P = new THREE.Group();
P.position.set(kgX(X0), 0, Z0);
P.name = "wdl-bank";
KGN.live.add(P);
var lam = function (c) { var m = new THREE.MeshLambertMaterial({ color: c }); m.userData.noPhoto = 1; return m; };
try {
if (typeof kgnChestnut === "function")
kgnChestnut(P, -1.5, -4, wRand(1862), 12, false);
}
catch (e) { }
var hedgeM = [lam(0x2A5222), lam(0x335E28), lam(0x24481E)], RH = wRand(1864);
for (var i = 0; i < 16; i++) {
var hs = 0.8 + RH() * 0.5, h = new THREE.Mesh(new THREE.SphereGeometry(hs, 10, 8), hedgeM[i % 3]);
h.scale.set(1.0, 1.15, 0.8);
h.position.set(-3.8 + (RH() - 0.5) * 0.5, hs * 0.95, -9 + i * 1.2);
P.add(h);
}
var hole = new THREE.Mesh(new THREE.CircleGeometry(0.5, 16), lam(0x14100A));
hole.position.set(-3.0, 0.28, 2.2);
hole.rotation.y = Math.PI / 2;
hole.scale.y = 0.7;
P.add(hole);
var lip = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.1, 6, 16, Math.PI), lam(0x5A4430));
lip.position.copy(hole.position);
lip.rotation.y = Math.PI / 2;
P.add(lip);
var soil = new THREE.Mesh(new THREE.CircleGeometry(0.9, 14), lam(0x6A5038));
soil.rotation.x = -Math.PI / 2;
soil.position.set(-2.4, 0.03, 2.2);
P.add(soil);
var st = new THREE.CylinderGeometry(0.008, 0.008, 0.14, 3), hd = new THREE.CircleGeometry(0.035, 8), R = wRand(1865);
var wm = lam(0xF8F6EE), ym = lam(0xE8C030), n = wdlLite() ? 60 : 220, sI = new THREE.InstancedMesh(hd, wm, n), q = new THREE.Object3D();
for (var d = 0; d < n; d++) {
var a = R() * 6.283, r = Math.sqrt(R()), dx = 2 + Math.cos(a) * r * 7, dz = Math.sin(a) * r * 7, y = 0.1;
q.position.set(dx, y, dz);
q.rotation.set(-Math.PI / 2 + (R() - 0.5) * 0.6, 0, R() * 6);
q.updateMatrix();
sI.setMatrixAt(d, q.matrix);
}
P.add(sI);
try {
if (typeof wdwCreature === "function") {
var rb = wdwCreature("rabbit", 7);
if (rb) {
rb.position.set(-2.2, 0.1, 3.4);
rb.rotation.y = Math.PI * 0.9;
rb.scale.multiplyScalar(0.55);
P.add(rb);
var PR = { g: rb, key: "kgn_wdl_rabbit", ground: 0.1 };
SHK.people.push(PR);
var V = WDW_VO["The White Rabbit"];
SHK.talk.push({ p: PR, name: "The White Rabbit", r: 3.0, t: { name: "The White Rabbit", sex: V[0], age: V[1], vp: V[2], vr: V[3], persona: "You are the White Rabbit of Lewis Carroll's book, with pink eyes, a waistcoat-pocket and a watch, hurrying because you are late for the Duchess; you are nervous, fussy and always in a hurry, and you say \"Oh dear! Oh dear! I shall be too late!\" You will not stop long. If asked, your rabbit-hole is just here under the hedge.", greet: "Oh dear! Oh dear! I shall be too late! (He takes a watch out of his waistcoat-pocket, looks at it, and hurries on.)" } });
}
}
}
catch (e) { }
shkSpot(kgX(X0 - 1.2), Z0 + 2.4, 3.6, "The rabbit-hole under the hedge (Alice's Adventures in Wonderland)", "follow the White Rabbit", function () { wdbOpenIn(); });
shkSolidBox(kgX(X0 - 3.6), Z0, 2.4, 18, 0, 2.6);
}
];
});
