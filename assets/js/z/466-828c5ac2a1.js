/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(466, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (LSW.tex[k])
return LSW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = lswLite();
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
return (LSW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (LSW.mats[k])
return LSW.mats[k];
var own = name.slice(0, 2) === "b:", map = lswPhotoTex(name, mpt || 2), m;
if (lswLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = lswPhotoTex(name, mpt || 2, true);
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
return (LSW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return lswM(k, function () {
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
function (k) {
switch (k) {
case "earth": return lswS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return lswS("grass", 0xC8D8A8, 4, { vc: 1 });
case "sand": return lswS("sand", 0xE8D8B0, 4, { vc: 1 });
case "basalt": return lswS("b:strata", 0xB0563A, 14, { n: 1.4 });
case "chocolate": return lswS("b:strata", 0x6A4030, 12, { n: 1.2 });
case "granite": return lswS("b:limestone", 0x8A8480, 6);
case "cave": return lswS("b:cave", 0x8A8278, 5);
case "rock": return lswS("b:strata", 0x8A7A6A, 6);
case "bark": return lswS("bark", 0x8A7A64, 2.5);
case "darkbark": return lswS("bark", 0x5A4E40, 3);
case "pale": return lswS("bark", 0xC8BCA8, 3);
case "planks": return lswS("b:planks", 0x9A8060, 2);
case "deck": return lswS("b:deck", 0xA88A66, 2);
case "oak": return lswS("b:oak", 0x8A6A4A, 1.5);
case "stucco": return lswS("b:stucco", 0xF0E2C8, 3);
case "pink": return lswS("b:stucco", 0xE8A8A0, 3);
case "terracotta": return lswS("b:terracotta", 0xC87A5A, 1.6);
case "tile": return lswS("b:cotto", 0xB86A4A, 2);
case "moss": return lswS("b:moss", 0x7A9A5A, 3);
case "iron": return lswS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "brass": return lswS("b:brass", 0xD8A84A, 1.2, { shine: 80 });
case "lava": return lswS("b:cave", 0x3A3230, 4);
}
return lswS("earth", 0x8A7058, 5);
},
function (kind) {
return lswCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return lswCanvas("bamboo", 64, 256, function (x, W, H) {
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
lswNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return lswCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return lswCanvas("tuft", 128, 64, function (x, W, H) {
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
return lswCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return lswCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
lswNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return lswCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = LSW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / LSW_CELL) + "," + Math.floor(z / LSW_CELL)];
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
p = dlnPerson("lsw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("lsw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || LSW.scG || LSW.G).add(p);
var P = { g: p, y: y, o: o };
LSW.people.push(P);
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
LSW.inst.push(m);
try {
m.computeBoundingSphere && m.computeBoundingSphere();
}
catch (e) { }
return m;
},
function (P, kind, list, o) {
o = o || {};
if (!list || !list.length)
return;
var lite = lswLite(), leaf = lswLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
lswInst(P, lswGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), lswMat("pale"), list, { shadow: !lite });
lswInst(P, lswGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), lswM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
lswInst(P, lswGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), lswMat("bark"), list, { shadow: !lite });
lswInst(P, lswGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), lswM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
lswInst(P, lswGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), lswMat("darkbark"), list, { shadow: !lite });
lswInst(P, lswGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), lswLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
lswInst(P, lswGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), lswMat("bark"), list, { shadow: !lite });
lswInst(P, lswGeo("pfronds", function () { var g = lswFronds(lite ? 8 : 12, 5.2, 1.6, 0.5, 12, 1.0); g.translate(1.4, 0, 0); return g; }), lswLam(0xFFFFFF, { ds: 1, map: lswFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "mauritia": {
lswInst(P, lswGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), lswMat("darkbark"), list, {});
lswInst(P, lswGeo("mfronds", function () { return lswFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), lswLam(0xFFFFFF, { ds: 1, map: lswFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
lswInst(P, lswGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), lswMat("darkbark"), list, {});
lswInst(P, lswGeo("ffronds", function () { return lswFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), lswLam(0xFFFFFF, { ds: 1, map: lswFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
lswInst(P, lswGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), lswMat("darkbark"), list, {});
lswInst(P, lswGeo("cyf", function () { return lswFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), lswLam(0xFFFFFF, { ds: 1, map: lswFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
lswInst(P, lswGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), lswM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: lswBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
lswInst(P, lswGeo("bamL", function () { return lswCards(3, 2.6, 2.2, 5.4); }), lswM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
lswInst(P, lswGeo("reed" + kind, function () { return lswCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), lswLam(0xFFFFFF, { ds: 1, map: lswReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
lswInst(P, lswGeo("tuft", function () { return lswCards(2, 1.6, 0.7, 0); }), lswLam(o.col || 0xFFFFFF, { ds: 1, map: lswGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
lswInst(P, lswGeo("flw", function () { return lswCards(2, 0.9, 0.7, 0); }), lswLam(0xFFFFFF, { ds: 1, map: lswFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
lswInst(P, lswGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), lswM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
lswInst(P, lswGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || lswMat("rock"), list, {});
break;
}
case "cactus": {
lswInst(P, lswGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), lswLam(0x4A7A3A), list, {});
break;
}
}
},
function (P, pts, w, hfn, mat, lift) {
if (hfn) {
var rs = [pts[0]];
for (var q = 1; q < pts.length; q++) {
var a0 = pts[q - 1], b0 = pts[q], L0 = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), n0 = Math.max(1, Math.ceil(L0 / (lswLite() ? 8 : 4)));
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
function (kind, col) { return lswM("skinM" + kind + (col || ""), function () { var t = lswSkinTex(kind); t.repeat.set(2, 2); var m = lswLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = lswPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(lswTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = lswPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(lswTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
lswEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (s) {
var g = new THREE.Group(), M = lswSkinM("slate"), B = lswPiv(g, 0, 0, 0);
g.userData.kind = "iguanodon";
var body = lswPiv(B, 0, 3.4, 0);
body.rotation.x = -0.75;
body.add(new THREE.Mesh(lswTaper([[0, -1.2, 0.2], [0, 0.6, 0.3], [0, 2.4, 0.1], [0, 3.6, -0.1]], [1.15, 1.35, 1.0, 0.55], 12, 12), M));
var neck = lswPiv(body, 0, 3.5, -0.1);
neck.add(new THREE.Mesh(lswTaper([[0, 0, 0], [0, 0.8, 0.3], [0, 1.5, 0.8]], [0.55, 0.42, 0.34], 8, 9), M));
var head = lswPiv(neck, 0, 1.55, 0.85);
head.rotation.x = 0.9;
head.add(new THREE.Mesh(lswTaper([[0, 0, -0.2], [0, 0.2, 0.4], [0, 0.15, 1.1], [0, 0.0, 1.45]], [0.36, 0.38, 0.24, 0.12], 8, 9), M));
[-1, 1].forEach(function (k) { lswEye(head, k * 0.28, 0.3, 0.45, 0.07); });
var tail = lswPiv(B, 0, 2.6, 0.6);
tail.add(new THREE.Mesh(lswTaper([[0, 0, 0], [0, -1.2, 1.8], [0, -2.2, 3.8], [0, -2.5, 6.4]], [1.0, 0.7, 0.36, 0.08], 12, 9), M));
var legs = [-1, 1].map(function (k) { return lswLeg(B, M, k * 0.95, 3.0, 0.2, 3.0, 0.62, { toes: 1, bend: 1.2 }); });
var arms = [-1, 1].map(function (k) {
var a = lswPiv(body, k * 0.9, 2.4, 0.5);
a.add(new THREE.Mesh(lswTaper([[0, 0, 0], [k * 0.1, -0.6, 0.5], [k * 0.05, -1.2, 0.6]], [0.24, 0.18, 0.12], 6, 6), M));
var sp = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.32, 5), lswLam(0xD8D0B8));
sp.position.set(k * 0.1, -1.2, 0.75);
sp.rotation.x = 1.2;
a.add(sp);
return a;
});
g.userData.j = { B: B, body: body, neck: neck, head: head, tail: tail, legs: legs, arms: arms };
g.scale.setScalar(s || 1);
return g;
},
function (span) {
var g = new THREE.Group(), M = lswSkinM("leather", 0xB8A898), W = lswM("pteroWing", function () { var t = lswSkinTex("leather"); var m = new THREE.MeshLambertMaterial({ color: 0x8A7A6A, map: t, side: THREE.DoubleSide, transparent: true, opacity: 0.94 }); m.userData.noPhoto = 1; return m; });
g.userData.kind = "ptero";
var B = lswPiv(g, 0, 0, 0);
B.add(new THREE.Mesh(lswTaper([[0, 0, -0.5], [0, 0.05, 0], [0, 0, 0.5]], [0.18, 0.28, 0.14], 6, 8), M));
var neck = lswPiv(B, 0, 0.05, -0.45);
neck.add(new THREE.Mesh(lswTaper([[0, 0, 0], [0, 0.25, -0.35], [0, 0.35, -0.7]], [0.11, 0.08, 0.07], 6, 6), M));
var head = lswPiv(neck, 0, 0.35, -0.72);
head.add(new THREE.Mesh(lswTaper([[0, 0, 0.12], [0, 0, -0.4], [0, -0.03, -1.0]], [0.13, 0.08, 0.012], 8, 7), M));
var crest = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.6, 5), M);
crest.rotation.x = -1.9;
crest.position.set(0, 0.08, 0.38);
head.add(crest);
[-1, 1].forEach(function (k) { lswEye(head, k * 0.07, 0.06, -0.08, 0.03, 0xA81808); });
for (var t = 0; t < 7; t++) {
var tooth = new THREE.Mesh(new THREE.ConeGeometry(0.008, 0.04, 4), lswLam(0xF0EADC));
tooth.rotation.x = Math.PI;
tooth.position.set(0, -0.05, -0.25 - t * 0.09);
head.add(tooth);
}
var wings = [-1, 1].map(function (k) {
var w = lswPiv(B, k * 0.15, 0.08, -0.2);
var sh = new THREE.Shape();
sh.moveTo(0, 0.3);
sh.lineTo(k * span * 0.22, 0.42);
sh.lineTo(k * span * 0.5, 0.0);
sh.quadraticCurveTo(k * span * 0.3, -0.3, k * span * 0.08, -0.75);
sh.lineTo(0, -0.6);
sh.lineTo(0, 0.3);
var m = new THREE.Mesh(new THREE.ShapeGeometry(sh, 6), W);
m.rotation.x = -Math.PI / 2;
w.add(m);
var bone = new THREE.Mesh(lswTaper([[0, 0, -0.3], [k * span * 0.22, 0, -0.42], [k * span * 0.5, 0, 0]], [0.05, 0.035, 0.01], 6, 5), M);
w.add(bone);
return w;
});
var legs = [-1, 1].map(function (k) { var l = lswPiv(B, k * 0.12, -0.05, 0.4); l.add(new THREE.Mesh(lswTaper([[0, 0, 0], [0, -0.25, 0.15], [0, -0.45, 0.2]], [0.05, 0.035, 0.02], 5, 5), M)); return l; });
g.userData.j = { B: B, neck: neck, head: head, wings: wings, legs: legs, span: span };
return g;
},
function (g, t, mode) {
var J = g.userData.j;
if (!J)
return;
var f = mode === "fold";
J.wings.forEach(function (w, i) { var k = i ? 1 : -1; if (f) {
w.rotation.z = k * 1.25;
w.rotation.y = -k * 0.9;
w.scale.set(0.42, 1, 0.7);
}
else {
w.scale.set(1, 1, 1);
w.rotation.y = 0;
w.rotation.z = k * (mode === "glide" ? 0.08 : Math.sin(t * 5.2) * 0.7);
} });
J.neck.rotation.x = f ? 0.9 + Math.sin(t * 0.7) * 0.06 : 0.2;
J.head.rotation.x = f ? -0.5 : 0;
J.B.rotation.x = f ? -1.0 : 0;
},
function (s) {
var g = new THREE.Group(), M = lswSkinM("toad", 0xC8C0A8), B = lswPiv(g, 0, 0, 0);
g.userData.kind = "toad";
var body = lswPiv(B, 0, 4.2, 0);
body.rotation.x = -0.45;
body.add(new THREE.Mesh(lswTaper([[0, -1.4, 0.4], [0, 0.4, 0.2], [0, 2.0, -0.2], [0, 2.8, -0.3]], [1.5, 1.9, 1.5, 1.1], 12, 12), M));
var head = lswPiv(body, 0, 2.9, -0.2);
head.rotation.x = 0.6;
lswEll(head, M, 1.25, 0.7, 1.25, 0, 0.35, -0.7, 16);
var jaw = lswPiv(head, 0, 0.05, -0.1);
lswEll(jaw, M, 1.15, 0.35, 1.15, 0, -0.2, -0.75, 14);
var mouth = lswEll(jaw, lswLam(0x6A1A18), 1.0, 0.12, 1.0, 0, 0.02, -0.8, 12);
for (var t = 0; t < 14; t++) {
var a = -1.3 + t * 0.2, tooth = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.28, 5), lswLam(0xE8E0C8));
tooth.position.set(Math.sin(a) * 1.0, 0.18, -0.75 - Math.cos(a) * 0.95);
tooth.rotation.x = Math.PI;
head.add(tooth);
}
[-1, 1].forEach(function (k) { var e = lswEye(head, k * 0.62, 0.82, -0.95, 0.2, 0x8AA838); e.material = lswShine(0x9AB840, 0.2, 0.2); lswEye(head, k * 0.62, 0.84, -1.12, 0.08, 0x0A0A04); });
var tail = lswPiv(B, 0, 3.4, 0.9);
tail.add(new THREE.Mesh(lswTaper([[0, 0, 0], [0, -1.4, 2.0], [0, -2.6, 4.4], [0, -3.1, 6.8]], [1.2, 0.8, 0.4, 0.08], 12, 10), M));
var legs = [-1, 1].map(function (k) { return lswLeg(B, M, k * 1.2, 3.8, 0.3, 3.8, 0.9, { toes: 1, bend: 1.5 }); });
var arms = [-1, 1].map(function (k) {
var a = lswPiv(body, k * 1.2, 1.6, -0.6);
a.add(new THREE.Mesh(lswTaper([[0, 0, 0], [k * 0.2, -0.6, -0.5], [k * 0.1, -1.0, -0.9]], [0.32, 0.22, 0.15], 6, 7), M));
for (var c = -1; c <= 1; c++) {
var cl = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.35, 5), lswLam(0x2A2418));
cl.position.set(k * 0.1 + c * 0.08, -1.1, -1.0);
cl.rotation.x = -2.2;
a.add(cl);
}
return a;
});
g.userData.j = { B: B, body: body, head: head, jaw: jaw, tail: tail, legs: legs, arms: arms };
g.scale.setScalar(s || 1);
return g;
},
function (s) {
var g = new THREE.Group(), M = lswSkinM("stego", 0xC8C0A8), B = lswPiv(g, 0, 0, 0);
g.userData.kind = "stego";
B.add(new THREE.Mesh(lswTaper([[0, 2.2, -3.2], [0, 3.4, -1.2], [0, 3.9, 0.8], [0, 3.2, 2.8]], [0.5, 1.5, 1.7, 1.0], 14, 12), M));
var neck = lswPiv(B, 0, 2.3, -3.0);
neck.add(new THREE.Mesh(lswTaper([[0, 0, 0], [0, -0.5, -1.0], [0, -0.9, -1.7]], [0.45, 0.32, 0.24], 7, 8), M));
var head = lswPiv(neck, 0, -0.95, -1.8);
head.add(new THREE.Mesh(lswTaper([[0, 0, 0.1], [0, 0, -0.4], [0, -0.15, -0.8]], [0.3, 0.24, 0.08], 7, 8), M));
[-1, 1].forEach(function (k) { lswEye(head, k * 0.2, 0.1, -0.25, 0.05); });
var tail = lswPiv(B, 0, 3.1, 2.9);
tail.add(new THREE.Mesh(lswTaper([[0, 0, 0], [0, -0.6, 2.0], [0, -1.0, 4.2]], [0.9, 0.45, 0.1], 10, 9), M));
for (var sp = 0; sp < 4; sp++) {
var sk = new THREE.Mesh(new THREE.ConeGeometry(0.1, 1.1, 6), lswLam(0xD8CCB0));
sk.position.set((sp % 2 ? 1 : -1) * 0.3, -0.75, 3.2 + (sp >> 1) * 0.6);
sk.rotation.z = (sp % 2 ? 1 : -1) * 1.0;
tail.add(sk);
}
var plates = [];
for (var p = 0; p < 11; p++) {
var t = p / 10, z = -2.6 + t * 6.4, y = 2.6 + Math.sin(t * Math.PI) * 1.6 + 0.9, sz = 0.5 + Math.sin(t * Math.PI) * 1.0;
[-1, 1].forEach(function (k) { var sh = new THREE.Shape(); sh.moveTo(-sz * 0.7, 0); sh.lineTo(0, sz * 1.5); sh.lineTo(sz * 0.7, 0); var pl = new THREE.Mesh(new THREE.ShapeGeometry(sh), lswLam(0x8A6A4A, { ds: 1 })); pl.position.set(k * 0.18, y, z + (k > 0 ? 0.25 : 0)); pl.rotation.y = Math.PI / 2; pl.rotation.x = k * 0.12; B.add(pl); plates.push(pl); });
}
var legs = [[-1, -1.8, 2.6], [1, -1.8, 2.6], [-1, 1.6, 3.2], [1, 1.6, 3.2]].map(function (q) { return lswLeg(B, M, q[0] * 0.9, q[2], q[1], q[2], 0.5, { bend: 0.3 }); });
g.userData.j = { B: B, neck: neck, head: head, tail: tail, legs: legs, plates: plates };
g.scale.setScalar(s || 1);
return g;
},
function (s) {
var g = new THREE.Group(), M = lswSkinM("plesio", 0xB8C8C0), B = lswPiv(g, 0, 0, 0);
g.userData.kind = "plesio";
B.add(new THREE.Mesh(lswTaper([[0, 0, -2.0], [0, 0.25, 0], [0, 0, 2.0], [0, -0.1, 3.6]], [0.5, 1.4, 1.0, 0.1], 12, 12, 1), M));
var neck = lswPiv(B, 0, 0.2, -1.9);
neck.add(new THREE.Mesh(lswTaper([[0, 0, 0], [0, 1.4, -1.2], [0, 3.0, -1.6], [0, 3.9, -2.6]], [0.42, 0.3, 0.24, 0.2], 14, 8), M));
var head = lswPiv(neck, 0, 3.9, -2.7);
head.add(new THREE.Mesh(lswTaper([[0, 0, 0.2], [0, -0.05, -0.3], [0, -0.1, -0.7]], [0.24, 0.2, 0.06], 7, 8), M));
[-1, 1].forEach(function (k) { lswEye(head, k * 0.16, 0.08, -0.15, 0.05); });
var fl = [[-1, -1.0], [1, -1.0], [-1, 1.5], [1, 1.5]].map(function (q) { var f = lswPiv(B, q[0] * 1.0, -0.1, q[1]); var sh = new THREE.Shape(); sh.moveTo(0, 0.25); sh.quadraticCurveTo(q[0] * 1.4, 0.3, q[0] * 2.3, -0.2); sh.quadraticCurveTo(q[0] * 1.2, -0.45, 0, -0.3); var m = new THREE.Mesh(new THREE.ShapeGeometry(sh), lswLam(0x3A4A48, { ds: 1 })); m.rotation.x = -Math.PI / 2; f.add(m); return f; });
g.userData.j = { B: B, neck: neck, head: head, fl: fl };
g.scale.setScalar(s || 1);
return g;
},
function (s, doe) {
var g = new THREE.Group(), M = lswSkinM("elk", 0xFFFFFF), B = lswPiv(g, 0, 0, 0);
g.userData.kind = "elk";
B.add(new THREE.Mesh(lswTaper([[0, 2.3, -1.2], [0, 2.4, 0], [0, 2.25, 1.2]], [0.75, 0.85, 0.7], 10, 10), M));
var neck = lswPiv(B, 0, 2.6, -1.2);
neck.add(new THREE.Mesh(lswTaper([[0, 0, 0], [0, 0.7, -0.4], [0, 1.2, -0.6]], [0.4, 0.3, 0.25], 7, 8), M));
var head = lswPiv(neck, 0, 1.25, -0.7);
head.add(new THREE.Mesh(lswTaper([[0, 0, 0.1], [0, -0.1, -0.4], [0, -0.25, -0.8]], [0.25, 0.22, 0.12], 7, 8), M));
[-1, 1].forEach(function (k) { lswEye(head, k * 0.17, 0.05, -0.25, 0.045); });
if (!doe)
[-1, 1].forEach(function (k) {
var an = new THREE.Group();
an.position.set(k * 0.18, 0.2, 0);
an.rotation.z = -k * 0.5;
head.add(an);
var palm = new THREE.Shape();
palm.moveTo(0, 0);
palm.lineTo(k * 0.4, 0.9);
palm.lineTo(k * 1.4, 1.4);
palm.lineTo(k * 1.9, 1.0);
palm.lineTo(k * 2.1, 1.6);
palm.lineTo(k * 1.6, 2.0);
palm.lineTo(k * 1.0, 1.7);
palm.lineTo(k * 0.6, 2.1);
palm.lineTo(k * 0.2, 1.1);
palm.lineTo(0, 0);
var m = new THREE.Mesh(new THREE.ShapeGeometry(palm), lswLam(0xD8C8A8, { ds: 1 }));
m.rotation.y = Math.PI / 2 * 0.2;
an.add(m);
});
var legs = [[-1, -1.0], [1, -1.0], [-1, 1.0], [1, 1.0]].map(function (q) { return lswLeg(B, M, q[0] * 0.45, 1.95, q[1], 1.95, 0.18, { bend: -0.6 }); });
g.userData.j = { B: B, neck: neck, head: head, legs: legs };
g.scale.setScalar(s || 1);
return g;
},
function (s) {
var g = new THREE.Group(), M = lswSkinM("grey", 0xC8B8A0);
lswEll(g, M, 0.7, 0.5, 1.0, 0, 0.55, 0, 12);
for (var b = 0; b < 6; b++) {
var r = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.04, 4, 14, Math.PI), lswLam(0x6A6050));
r.position.set(0, 0.55, -0.6 + b * 0.24);
r.rotation.y = Math.PI / 2;
r.rotation.x = 0;
g.add(r);
}
var h = lswPiv(g, 0, 0.4, -1.0);
h.add(new THREE.Mesh(lswTaper([[0, 0, 0], [0, -0.05, -0.3], [0, -0.15, -0.5]], [0.2, 0.12, 0.04], 6, 6), M));
var tongue = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.6, 4), lswLam(0xC83A3A));
tongue.rotation.x = 1.4;
tongue.position.set(0, -0.18, -0.75);
h.add(tongue);
var tail = new THREE.Mesh(lswTaper([[0, 0.4, 0.9], [0, 0.2, 1.4], [0, 0.05, 1.8]], [0.14, 0.08, 0.02], 5, 5), M);
g.add(tail);
g.userData.kind = "armadillo";
g.userData.j = { tongue: tongue };
g.scale.setScalar(s || 1);
return g;
},
function (s) {
var g = new THREE.Group(), M = lswSkinM("fur", 0x9A8A7A), B = lswPiv(g, 0, 0, 0);
g.userData.kind = "bird";
lswEll(B, M, 0.8, 0.9, 1.3, 0, 2.4, 0.1, 12);
var neck = lswPiv(B, 0, 2.9, -0.9);
neck.add(new THREE.Mesh(lswTaper([[0, 0, 0], [0, 0.8, -0.2], [0, 1.4, -0.4]], [0.3, 0.22, 0.24], 7, 8), M));
var head = lswPiv(neck, 0, 1.45, -0.45);
lswEll(head, M, 0.32, 0.38, 0.5, 0, 0, 0, 10);
var beak = new THREE.Mesh(lswTaper([[0, 0.05, -0.3], [0, 0.0, -0.8], [0, -0.25, -1.05]], [0.2, 0.13, 0.02], 7, 7), lswLam(0xC8A040));
head.add(beak);
[-1, 1].forEach(function (k) { lswEye(head, k * 0.22, 0.12, -0.2, 0.06, 0xE8C020); });
var legs = [-1, 1].map(function (k) { return lswLeg(B, lswLam(0x8A6A3A), k * 0.35, 1.9, 0.2, 1.9, 0.16, { toes: 1, bend: -0.8 }); });
g.userData.j = { B: B, neck: neck, head: head, legs: legs };
g.scale.setScalar(s || 1);
return g;
},
function (s) { var g = new THREE.Group(), M = lswSkinM("black", 0x8A8A6A); g.add(new THREE.Mesh(lswTaper([[0, 0.25, -1.6], [0, 0.32, -0.4], [0, 0.3, 0.6], [0, 0.15, 2.4]], [0.14, 0.42, 0.36, 0.04], 10, 8, 0.55), M)); [-1, 1].forEach(function (k) { [-0.5, 0.4].forEach(function (z) { var l = new THREE.Mesh(lswTaper([[0, 0.2, 0], [k * 0.4, 0.05, 0.1], [k * 0.55, 0, 0.2]], [0.1, 0.07, 0.05], 4, 5), M); l.position.z = z; g.add(l); }); lswEye(g, k * 0.13, 0.44, -1.0, 0.05, 0xC8B020); }); g.userData.kind = "cayman"; g.scale.setScalar(s || 1); return g; },
function (s) {
var g = new THREE.Group(), M = lswSkinM("black", 0x6A6060);
lswEll(g, M, 0.55, 0.6, 1.1, 0, 1.0, 0, 12);
lswEll(g, M, 0.3, 0.32, 0.4, 0, 1.1, -1.15, 10);
var sn = new THREE.Mesh(lswTaper([[0, 1.05, -1.5], [0, 0.9, -1.75]], [0.12, 0.07], 4, 6), M);
g.add(sn);
[[-1, -0.7], [1, -0.7], [-1, 0.7], [1, 0.7]].forEach(function (q) { var l = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.75, 6), M); l.position.set(q[0] * 0.32, 0.38, q[1]); g.add(l); });
g.userData.kind = "tapir";
g.scale.setScalar(s || 1);
return g;
},
function (s) {
var g = new THREE.Group(), M = lswSkinM("elk", 0xE8C890);
lswEll(g, M, 0.35, 0.38, 0.95, 0, 0.75, 0, 12);
lswEll(g, M, 0.22, 0.22, 0.26, 0, 0.95, -0.95, 10);
[-1, 1].forEach(function (k) { lswEye(g, k * 0.1, 1.0, -1.17, 0.035, 0x6AC83A); });
g.add(new THREE.Mesh(lswTaper([[0, 0.8, 0.9], [0, 0.5, 1.5], [0, 0.6, 2.1]], [0.08, 0.06, 0.05], 6, 5), M));
[[-1, -0.6], [1, -0.6], [-1, 0.6], [1, 0.6]].forEach(function (q) { var l = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.6, 6), M); l.position.set(q[0] * 0.2, 0.3, q[1]); g.add(l); });
g.userData.kind = "puma";
g.scale.setScalar(s || 1);
return g;
},
function () {
var g = new THREE.Group(), M = lswLam(0x141414);
lswEll(g, M, 0.16, 0.2, 0.14, 0, 0.3, 0, 8);
lswEll(g, M, 0.11, 0.11, 0.1, 0, 0.56, -0.03, 8);
[-1, 1].forEach(function (k) { lswEye(g, k * 0.04, 0.58, -0.11, 0.02, 0xE0C060); });
g.add(new THREE.Mesh(lswTaper([[0, 0.2, 0.1], [0, 0.0, 0.4], [0, 0.3, 0.6]], [0.03, 0.025, 0.02], 6, 4), M));
g.userData.kind = "monkey";
return g;
},
function (col) {
var g = new THREE.Group(), M = lswLam(col);
lswEll(g, M, 0.18, 0.2, 0.35, 0, 1.0, 0, 8);
var n = new THREE.Mesh(lswTaper([[0, 1.1, -0.25], [0, 1.4, -0.3], [0, 1.55, -0.2]], [0.05, 0.04, 0.04], 5, 5), M);
g.add(n);
var bk = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.32, 5), lswLam(0x2A2A2A));
bk.rotation.x = -1.6;
bk.position.set(0, 1.56, -0.38);
g.add(bk);
[-1, 1].forEach(function (k) { var l = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.85, 4), lswLam(0xC88A6A)); l.position.set(k * 0.06, 0.45, 0); g.add(l); });
g.userData.kind = "wader";
return g;
},
function (P, n, x, z, y, r, col) {
var grp = new THREE.Group();
grp.position.set(x, y, z);
P.add(grp);
var mat = lswLam(col || 0x2A6AE8, { ds: 1, e: 0x0A1A40 });
var R = wRand(n * 7 + 3);
for (var i = 0; i < n; i++) {
var b = new THREE.Group();
[-1, 1].forEach(function (k) { var w = new THREE.Mesh(new THREE.CircleGeometry(0.09, 6), mat); w.position.x = k * 0.07; w.userData.k = k; b.add(w); });
b.userData.ph = R() * 6;
b.userData.r = r * (0.3 + R() * 0.7);
b.userData.sp = 0.4 + R() * 0.6;
grp.add(b);
}
grp.userData.kind = "butterflies";
LSW.fx.push(grp);
return grp;
},
function (dt, L) {
LSW.beasts.forEach(function (Bt) {
var g = Bt.g, J = g.userData.j, o = Bt.o;
Bt.t += dt;
var t = Bt.t;
if (!g.parent)
return;
if (o.vis && Math.abs(g.position.x - L.x) + Math.abs(g.position.z - L.z) > (lswLite() ? 260 : 420)) {
g.visible = false;
return;
}
g.visible = true;
if (o.path && Bt.mode !== "stop") {
var P = o.path, sp = o.speed || 2;
Bt.d = (Bt.d || 0) + sp * dt;
var tot = o.pathLen || (o.pathLen = P.reduce(function (a, p, i) { return i ? a + Math.hypot(p[0] - P[i - 1][0], p[1] - P[i - 1][1]) : 0; }, 0));
var d = o.loop ? Bt.d % tot : Math.min(Bt.d, tot);
for (var i = 1; i < P.length; i++) {
var sl = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
if (d <= sl || i === P.length - 1) {
var f = sl ? Math.min(1, d / sl) : 0, x = P[i - 1][0] + (P[i][0] - P[i - 1][0]) * f, z = P[i - 1][1] + (P[i][1] - P[i - 1][1]) * f;
g.position.x = x;
g.position.z = z;
g.rotation.y = Math.atan2(P[i - 1][0] - P[i][0], P[i - 1][1] - P[i][1]);
if (o.ground)
g.position.y = o.ground(x, z) + (o.lift || 0);
break;
}
d -= sl;
}
if (!o.loop && Bt.d >= tot && o.done) {
var fd = o.done;
o.done = null;
try {
fd(Bt);
}
catch (e) { }
}
}
if (o.circle) {
var C = o.circle, a = t * (C.sp || 0.2) + (C.a0 || 0);
g.position.set(C.x + Math.cos(a) * C.r, C.y + Math.sin(t * 0.7) * (C.bob || 2), C.z + Math.sin(a) * C.r);
g.rotation.y = -a + (C.sp > 0 ? Math.PI : 0);
}
if (!J)
return;
var moving = !!(o.path && Bt.mode !== "stop") || !!o.circle, ph = t * (o.gait || 3.2);
switch (Bt.kind) {
case "iguanodon":
J.neck.rotation.x = Math.sin(t * 0.6) * 0.2 + (Bt.mode === "browse" ? -0.3 : 0);
J.head.rotation.x = 0.9 + Math.sin(t * 1.3) * 0.1;
J.arms.forEach(function (a, i) { a.rotation.x = Bt.mode === "browse" ? -1.2 + Math.sin(t * 1.2 + i) * 0.4 : Math.sin(t + i) * 0.2; });
J.tail.rotation.y = Math.sin(t * 0.5) * 0.15;
if (moving) {
J.legs[0].rotation.x = Math.sin(ph) * 0.5;
J.legs[1].rotation.x = -Math.sin(ph) * 0.5;
J.B.position.y = Math.abs(Math.sin(ph)) * 0.25;
}
else if (Bt.mode === "gambol") {
var hop = Math.max(0, Math.sin(t * 2.4));
J.B.position.y = hop * 1.6;
}
break;
case "toad":
J.jaw.rotation.x = 0.15 + Math.max(0, Math.sin(t * 1.7)) * 0.35;
J.tail.rotation.y = Math.sin(t * 0.9) * 0.2;
if (moving) {
var hp = Math.max(0, Math.sin(ph));
J.B.position.y = hp * 2.2;
J.legs.forEach(function (l) { l.rotation.x = -hp * 0.8 + 0.3; });
J.body.rotation.x = -0.45 - (Bt.mode === "sniff" ? Math.max(0, Math.sin(t * 0.8)) * 0.5 : 0);
}
break;
case "stego":
J.neck.rotation.x = Math.sin(t * 0.4) * 0.15 + (Bt.mode === "drink" ? 0.5 : 0);
J.tail.rotation.y = Math.sin(t * 0.6) * 0.25;
if (moving)
J.legs.forEach(function (l, i) { l.rotation.x = Math.sin(ph + (i % 2 ? Math.PI : 0) + (i > 1 ? Math.PI / 2 : 0)) * 0.35; });
break;
case "plesio":
J.neck.rotation.x = Math.sin(t * 0.8) * 0.18;
J.neck.rotation.y = Math.sin(t * 0.5) * 0.3;
J.fl.forEach(function (f, i) { f.rotation.z = Math.sin(t * 1.6 + (i < 2 ? 0 : 1.2)) * 0.4 * (i % 2 ? 1 : -1); });
if (o.bob)
g.position.y = o.bob + Math.sin(t * 0.9) * 0.15;
break;
case "elk":
case "bird":
J.neck.rotation.x = (Bt.mode === "drink" ? 0.9 : 0) + Math.sin(t * 0.7) * 0.1;
if (moving)
J.legs.forEach(function (l, i) { l.rotation.x = Math.sin(ph * 1.4 + (i % 2 ? Math.PI : 0)) * 0.5; });
break;
case "ptero":
lswPteroPose(g, t, Bt.mode === "fold" ? "fold" : Bt.mode === "glide" ? "glide" : "flap");
break;
}
});
LSW.fx.forEach(function (F) { if (F.userData.kind !== "butterflies")
return; var t = LSW.t; F.children.forEach(function (b) { var u = b.userData, a = t * u.sp + u.ph; b.position.set(Math.cos(a) * u.r, Math.sin(t * 1.3 + u.ph) * 0.6 + 0.6, Math.sin(a * 1.3) * u.r); b.rotation.y = -a; b.children.forEach(function (w) { w.rotation.y = w.userData.k * (0.3 + Math.abs(Math.sin(t * 14 + u.ph)) * 1.1); }); }); });
},
function (seed, dress, o) {
o = o || {};
if (typeof dlnPerson !== "function")
return wPerson("lsw" + seed, { sex: o.sex });
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("lsw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (key, x, z, ry, o) {
var F = LSW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : lswGround(x, z, o.feet != null ? o.feet : 500);
var g = lswDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || LSW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
LSW.people.push(P);
if (!o.mute)
lswTalk(P, F.name, lswPersona(F.persona), o.greet || F.greet, o.r || 3.4, o.fn);
return P;
},
function (seed, n, x0, z0, x1, z1, dress, names, persona, greets, o) {
o = o || {};
var R = wRand(seed), out = [];
for (var i = 0; i < n; i++) {
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0);
if (o.ok && !o.ok(x, z))
continue;
var sex = o.sex || (R() < (o.women || 0) ? "f" : "m"), d = typeof dress === "function" ? dress(i, sex) : dress;
var g = lswDressed(seed + "c" + i, d, { sex: sex, beard: sex === "m" && R() < 0.3 ? (R() < 0.5 ? "mustache" : "short") : null, hair: o.hair != null ? o.hair : [0x141414, 0x2A1A10, 0x3A2A1A][Math.floor(R() * 3)], skin: o.skin ? o.skin[Math.floor(R() * o.skin.length)] : null });
if (o.scale)
g.scale.set(o.scale[0], o.scale[1], o.scale[2]);
var y = lswGround(x, z, 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
LSW.scG.add(g);
var P = { g: g, y: y, o: { wander: o.wander != null ? o.wander : 5, sp: o.sp || 0.7 } };
LSW.people.push(P);
if (names)
lswTalk(P, names[i % names.length], persona, greets ? greets[i % greets.length] : "Good day.", 3.0);
out.push(P);
}
return out;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return lswGeo(k, function () {
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
var t = lswCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), lswLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || lswS("b:stucco", o.col || 0xF0E2C8, 3), trim = lswLam(0xFAF6EE), sh = lswLam(o.shut || 0x3A6A4A), glass = lswShine(0x1A2228, 0.2, 0.3);
lswBox(g, w, h, d, wall, 0, 0, 0);
lswBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
lswBox(g, w + 0.12, 0.5, d + 0.12, lswMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(lswGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || lswMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
lswBox(g, 1.3, 2.6, 0.12, lswMat("oak"), wx, 0, d / 2 + 0.02);
lswBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = lswBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = lswBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!lswLite())
[-1, 1].forEach(function (s) { lswBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
lswBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
lswBox(g, 0.05, 0.9, 0.05, lswLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
lswBox(g, 1.8, 0.05, 0.05, lswLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
lswSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
if (LSW.scG) {
if (LSW.scG.parent)
LSW.scG.parent.remove(LSW.scG);
LSW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
LSW.scG = null;
LSW.solids = [];
LSW.sgrid = null;
LSW.floors = [];
LSW.spots = [];
LSW.talk = [];
LSW.people = [];
LSW.beasts = [];
LSW.fx = [];
LSW.water = [];
LSW.inst = [];
LSW.hgt = null;
LSW.scBuilt = null;
if (typeof lsbSceneDrop === "function")
try {
lsbSceneDrop();
}
catch (e) { }
},
function (k) {
if (LSW.scBuilt === k && LSW.scG)
return;
lswSceneDrop();
var D = LSW_SCN[k], S = LSW_SC[k];
if (!D || !S || !LSW.G)
return;
LSW.sc = k;
LSW.scG = new THREE.Group();
LSW.scG.position.x = S.x;
LSW.G.add(LSW.scG);
LSW.hgt = D.h || function () { return 0; };
try {
D.build(LSW.scG);
}
catch (e) {
if (window.console)
console.warn("[lost world] scene", k, e);
}
LSW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
LSW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = lswAtPt(at);
if (!A)
return;
var v = lswVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
LSW.moving = true;
setTimeout(function () {
if (WLD.on !== LSW_KEY) {
v.style.opacity = "0";
LSW.moving = false;
return;
}
lswScene(A.sc);
var S = LSW_SC[A.sc], y = A.y != null ? A.y : lswGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(LSW.base + S.x + A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(lswEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; LSW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function () {
var g = new THREE.Group(), white = lswShine(0xF2F0EA, 0.5, 0.05), red = lswShine(0x8A1A14, 0.6, 0.05), dk = lswMat("deck");
var sh = new THREE.Shape();
sh.moveTo(-2.5, 11);
sh.lineTo(2.5, 11);
sh.quadraticCurveTo(2.8, 6, 2.6, -4);
sh.quadraticCurveTo(1.9, -10, 0, -13.5);
sh.quadraticCurveTo(-1.9, -10, -2.6, -4);
sh.quadraticCurveTo(-2.8, 6, -2.5, 11);
var hull = new THREE.Mesh(lswGeo("esmHull", function () { var e = new THREE.ExtrudeGeometry(sh, { depth: 2.0, bevelEnabled: false }); e.rotateX(-Math.PI / 2); e.translate(0, -0.8, 0); return e; }), white);
g.add(hull);
var hb = new THREE.Mesh(lswGeo("esmBoot", function () { var e = new THREE.ExtrudeGeometry(sh, { depth: 0.25, bevelEnabled: false }); e.rotateX(-Math.PI / 2); e.scale(1.01, 1, 1.01); e.translate(0, -0.1, 0); return e; }), red);
g.add(hb);
var deck = new THREE.Mesh(lswGeo("esmDeck", function () { var e = new THREE.ShapeGeometry(sh); e.rotateX(-Math.PI / 2); var uv = e.attributes.uv; for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * 0.5, uv.getY(i) * 0.5); return e; }), dk);
deck.position.y = 1.21;
g.add(deck);
lswBox(g, 3.4, 2.3, 3.0, white, 0, 1.2, -7.5);
lswBox(g, 3.7, 0.14, 3.3, lswLam(0x2A2A2A), 0, 3.5, -7.5);
for (var i = 0; i < 3; i++) {
lswBox(g, 0.8, 0.7, 0.05, lswShine(0x1A2228, 0.2, 0.3), -1.0 + i * 1.0, 2.5, -9.03);
}
var wheel = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.04, 6, 18), lswMat("oak"));
wheel.position.set(0, 2.2, -8.6);
g.add(wheel);
for (var s = 0; s < 8; s++) {
var sp = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.0, 4), lswMat("oak"));
sp.rotation.z = s / 8 * Math.PI;
sp.position.copy(wheel.position);
g.add(sp);
}
g.userData.wheel = wheel;
lswCyl(g, 0.42, 0.48, 4.2, lswShine(0x141414, 0.7, 0.2), 0, 1.2, -3.2, 14);
lswCyl(g, 0.44, 0.44, 0.5, red, 0, 4.4, -3.2, 14);
lswBox(g, 3.6, 2.0, 5.0, white, 0, 1.2, 1.2);
lswBox(g, 4.0, 0.12, 5.4, lswLam(0x6A5A44), 0, 3.2, 1.2);
for (i = 0; i < 4; i++)
lswBox(g, 0.7, 0.6, 0.05, lswShine(0x1A2228, 0.2, 0.3), -1.2 + i * 0.8, 2.2, 3.73);
var aw = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 6.0), lswLam(0xEAE0C8, { ds: 1 }));
aw.rotation.x = -Math.PI / 2;
aw.position.set(0, 3.4, 7.0);
g.add(aw);
[[-2.1, 4.3], [2.1, 4.3], [-2.1, 9.7], [2.1, 9.7]].forEach(function (q) { lswCyl(g, 0.05, 0.05, 2.2, lswLam(0x6A5A44), q[0], 1.2, q[1], 6); });
for (var r = -11; r <= 10; r += 1.2) {
var hw = r < -4 ? 2.6 * (1 - (-4 - r) / 9.5) : 2.5;
[-1, 1].forEach(function (k) { lswCyl(g, 0.025, 0.025, 0.9, white, k * hw, 1.2, r, 5); });
}
var lb = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.08, 8, 16), lswLam(0xE8E4DC));
lb.position.set(2.35, 2.0, 6.0);
lb.rotation.y = Math.PI / 2;
g.add(lb);
var lb2 = lb.clone();
lb2.material = lswLam(0xC82A1A);
lb2.scale.set(1.02, 1.02, 0.5);
g.add(lb2);
lswSign(g, "ESMERALDA", 2.4, 0.4, 0, 1.0, -12.55, Math.PI, { bg: "#F2F0EA", ink: "#1A2A4A" });
lswSign(g, "ESMERALDA · MANAOS", 3.0, 0.4, 0, 0.9, 11.03, 0, { bg: "#F2F0EA", ink: "#1A2A4A" });
lswCyl(g, 0.03, 0.03, 2.6, lswLam(0x6A5A44), 0, 1.2, 10.6, 5);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.66), lswLam(0xFFFFFF, { ds: 1, map: lswCanvas("esmFlag", 96, 64, function (c, W, H) { c.fillStyle = "#2A8A3A"; c.fillRect(0, 0, W, H); c.fillStyle = "#F0D020"; c.beginPath(); c.moveTo(W / 2, 6); c.lineTo(W - 8, H / 2); c.lineTo(W / 2, H - 6); c.lineTo(8, H / 2); c.fill(); c.fillStyle = "#1A3A8A"; c.beginPath(); c.arc(W / 2, H / 2, H * 0.22, 0, 7); c.fill(); }), mapk: "esmFlag" }));
fl.position.set(0.5, 3.4, 10.6);
g.add(fl);
g.userData.flag = fl;
return g;
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(lswGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), lswLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; LSW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(lswGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), lswMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(lswGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), lswMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(lswGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), lswGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!lswLite() && typeof THREE.PointLight === "function" && (LSW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
LSW.lights = (LSW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
LSW.fx.push(g);
return g;
},
function (P, x, y, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var m = lswLam(col || 0xD8CCAA, { ds: 1 });
var t = new THREE.Mesh(lswGeo("tent", function () { var s = new THREE.Shape(); s.moveTo(-1.3, 0); s.lineTo(0, 1.7); s.lineTo(1.3, 0); s.lineTo(-1.3, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 2.6, bevelEnabled: false }); e.translate(0, 0, -1.3); return e; }), m);
g.add(t);
lswCyl(g, 0.03, 0.03, 1.9, lswMat("oak"), 0, 0, 1.32, 5);
return g;
},
function (P, x, y, z, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var skin = lswSkinM("leather", 0xC8A880), bam = lswLam(0xC8B070);
var hull = new THREE.Mesh(lswGeo("canoe", function () { var c = new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); c.scale(0.75, 0.5, 5.5); return c; }), skin);
hull.position.y = 0.5;
if (o.frame)
hull.visible = false;
g.add(hull);
if (o.frame || !lswLite())
for (var r = -4; r <= 4; r++) {
var rb = new THREE.Mesh(lswGeo("rib", function () { return new THREE.TorusGeometry(0.7, 0.03, 4, 12, Math.PI); }), bam);
rb.rotation.z = Math.PI;
rb.position.set(0, 0.52, r * 0.6);
rb.scale.set(1 - Math.abs(r) / 10, 1 - Math.abs(r) / 9, 1);
g.add(rb);
}
[-1, 1].forEach(function (k) { var gw = new THREE.Mesh(lswGeo("gun", function () { return new THREE.CylinderGeometry(0.035, 0.035, 10.4, 5); }), bam); gw.rotation.x = Math.PI / 2; gw.position.set(k * 0.7, 0.52, 0); g.add(gw); });
if (o.load)
for (var b = 0; b < 5; b++)
lswBox(g, 0.6, 0.35, 0.6, lswLam([0x8A7A5A, 0x6A5A44, 0x9A8A6A][b % 3]), (b % 2 ? 0.15 : -0.15), 0.2, -2.4 + b * 1.2);
return g;
},
function () {
return lswM("thatch", function () {
var t = lswCanvas("thatch", 128, 128, function (c, W, H) { c.fillStyle = "#8A7448"; c.fillRect(0, 0, W, H); for (var i = 0; i < 900; i++) {
var x = Math.random() * W, y = Math.random() * H;
c.strokeStyle = "rgba(" + (110 + Math.random() * 80 | 0) + "," + (90 + Math.random() * 60 | 0) + "," + (40 + Math.random() * 30 | 0) + ",0.8)";
c.lineWidth = 1 + Math.random() * 1.5;
c.beginPath();
c.moveTo(x, y);
c.lineTo(x + (Math.random() - 0.5) * 4, y + 10 + Math.random() * 12);
c.stroke();
} });
t.repeat.set(4, 4);
var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: t, side: THREE.DoubleSide });
m.userData.noPhoto = 1;
return m;
});
},
function (P, x, z, w, d, ry, o) {
o = o || {};
var g = new THREE.Group(), y = lswLand(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
P.add(g);
var wall = lswMat("planks"), th = lswThatchM();
[[-w / 2, 0], [w / 2, 0]].forEach(function (q) { lswBox(g, 0.15, 1.8, d, wall, q[0], 0, 0); });
lswBox(g, w, 1.8, 0.15, wall, 0, 0, -d / 2);
lswBox(g, w / 2 - 0.6, 1.8, 0.15, wall, -w / 4 - 0.3, 0, d / 2);
lswBox(g, w / 2 - 0.6, 1.8, 0.15, wall, w / 4 + 0.3, 0, d / 2);
var roof = new THREE.Mesh(lswGeo("gable" + w + "|" + d, function () { var s = new THREE.Shape(); s.moveTo(-w / 2 - 0.6, 0); s.lineTo(0, w * 0.55); s.lineTo(w / 2 + 0.6, 0); s.lineTo(-w / 2 - 0.6, 0); var e = new THREE.ExtrudeGeometry(s, { depth: d + 1.2, bevelEnabled: false }); e.translate(0, 0, -(d + 1.2) / 2); return e; }), th);
roof.position.y = 1.8;
g.add(roof);
[[-w / 2, -d / 2], [w / 2, -d / 2], [-w / 2, d / 2], [w / 2, d / 2]].forEach(function (q) { lswSolid(x + (q[0] * Math.cos(ry || 0) + q[1] * Math.sin(ry || 0)), z + (-q[0] * Math.sin(ry || 0) + q[1] * Math.cos(ry || 0)), 0.5, 0.5, y - 1, y + 3); });
lswSolid(x, z, w, 0.4, y - 1, y + 3, ry || 0);
LSW.solids[LSW.solids.length - 1].off = true;
[[-w / 2, 0, 0.3, d], [w / 2, 0, 0.3, d], [0, -d / 2, w, 0.3], [-w / 4 - 0.3, d / 2, w / 2 - 0.6, 0.3], [w / 4 + 0.3, d / 2, w / 2 - 0.6, 0.3]].forEach(function (q) { var c = Math.cos(ry || 0), s = Math.sin(ry || 0); lswSolid(x + q[0] * c + q[1] * s, z - q[0] * s + q[1] * c, q[2], q[3], y - 1, y + 3, ry || 0); });
if (o.hammock) {
var hm = new THREE.Mesh(lswGeo("hammock", function () { var c = new THREE.CylinderGeometry(0.5, 0.5, 2.2, 10, 1, true, 0, Math.PI); c.rotateZ(Math.PI / 2); c.rotateX(Math.PI); return c; }), lswLam(0xD84A2A, { ds: 1 }));
hm.position.set(0, 1.1, -d / 4);
g.add(hm);
}
return g;
},
function (P) {
var lite = lswLite(), h = LSW_SCN.manaos.h;
lswTerrain(P, -320, -320, 640, 640, lite ? 8 : 5, h, lswMat("earth"), function (x, z, y, c) { var road = Math.abs(x) < 7 && z > -46 && z < 160, plaza = Math.hypot(x + 80, z - 14) < 34; if (y < -1) {
c.setRGB(0.5, 0.42, 0.32);
return;
} if (road || plaza) {
c.setRGB(0.82, 0.78, 0.72);
return;
} var g = 0.7 + lswFbm(x * 0.05, z * 0.05, 2) * 0.3; c.setRGB(0.62 * g, 0.78 * g, 0.48 * g); });
lswWater(P, 0, -680, 2400, 1260, -0.6, 0x1A1610, 0.92);
lswPlant(P, "jtree", lswScatter(31, lite ? 40 : 90, -1200, -1340, 1200, -1300, null, function () { return -1; }, 0.8, 1.2));
lswQuay(P, -150, 150, -49, 1.5);
lswBox(P, 300, 0.2, 8, lswMat("granite"), 0, 1.3, -44);
for (var i = 0; i < (lite ? 16 : 34); i++) {
var R = wRand(70 + i), bx = -120 + R() * 240, bz = -42 + R() * 6;
if (Math.abs(bx - 40) < 6)
continue;
if (R() < 0.5)
lswBox(P, 1.2, 0.9, 1.2, lswMat("oak"), bx, 1.5, bz, R() * 0.4, true);
else {
var bl = new THREE.Mesh(lswGeo("bale", function () { return new THREE.SphereGeometry(0.55, 10, 7); }), lswLam(0x2A2420));
bl.position.set(bx, 2.0, bz);
bl.scale.y = 0.8;
P.add(bl);
}
}
lswSign(P, "COMPANHIA AMAZONAS · BORRACHA", 6, 0.8, -60, 5.2, -35.9, Math.PI, { bg: "#E8DCC0", ink: "#6A1A10" });
lswHouse(P, -60, -30, 26, 10, 8, { col: 0xE8D8B8, ry: Math.PI, balcony: 1 });
lswHouse(P, -100, -30, 22, 10, 7, { col: 0xD8C8A8, ry: Math.PI });
lswHouse(P, 90, -30, 26, 10, 8, { col: 0xC8D8E0, ry: Math.PI, balcony: 1 });
lswHouse(P, 125, -30, 18, 10, 7, { col: 0xE8C8A0, ry: Math.PI });
var esm = lswLaunch();
esm.position.set(40, -0.6, -78);
esm.rotation.y = Math.PI / 2;
P.add(esm);
lswSmoke(P, 40 + 3.2, 6, -78, 0x4A4A4A, 6);
lswBox(P, 1.4, 0.12, 22, lswMat("planks"), 40, 1.0, -62);
lswFloor(40, -62, 1.4, 22, 1.2);
[[-40, -95, 1.6], [110, -110, 2.0]].forEach(function (q, k) { var st = lswLaunch(); st.scale.setScalar(q[2]); st.position.set(q[0], -0.6, q[1]); st.rotation.y = Math.PI / 2 + (k ? 0.2 : -0.1); P.add(st); lswSmoke(P, q[0] + 3.2 * q[2], 6 * q[2], q[1], 0x3A3A3A, 5); });
lswSpot(40, -52, 3, "The Esmeralda, at the quay", "go aboard", function () { lswTale("🚢 The Esmeralda", ["esmeralda"], ["A steam launch of the river, chartered by Lord John Roxton, to carry the expedition up the Amazon."], "VII"); });
var cols = [0xF0E0B0, 0xC8E0E8, 0xF0C8C0, 0xE8E8D0, 0xD8C8E8, 0xF8D8A8, 0xC8E8C8];
for (var s = 0; s < 9; s++) {
var zz = -6 + s * 18;
[-1, 1].forEach(function (k) { lswHouse(P, k * 18, zz, 14, 10, s % 3 === 1 ? 11 : 7.5, { col: cols[(s * 2 + (k > 0 ? 1 : 0)) % cols.length], ry: k > 0 ? -Math.PI / 2 : Math.PI / 2, balcony: s % 2 === 0, shut: [0x3A6A4A, 0x2A4A6A, 0x6A3A2A][s % 3] }); });
}
for (s = 0; s < 10; s++) {
var lz = -30 + s * 18;
[-1, 1].forEach(function (k) { lswCyl(P, 0.07, 0.1, 4.2, lswShine(0x1A1A1A, 0.5, 0.6), k * 8.2, h(k * 8.2, lz), lz, 8); var lamp = new THREE.Mesh(lswGeo("lampG", function () { return new THREE.SphereGeometry(0.22, 10, 8); }), lswGlowM(0xFFF0C8, 0.9)); lamp.position.set(k * 8.2, h(k * 8.2, lz) + 4.35, lz); P.add(lamp); lswRound(k * 8.2, lz, 0.25); });
}
[-1.1, 1.1].forEach(function (x) { lswStrip(P, [[x, -44], [x, 160]], 0.12, h, lswShine(0x6A6A70, 0.3, 0.8), 0.05); });
var tr = new THREE.Group();
tr.position.set(0, h(0, 60), 60);
P.add(tr);
lswBox(tr, 2.4, 2.6, 8, lswShine(0x1A5A3A, 0.5, 0.1), 0, 0.6, 0);
lswBox(tr, 2.6, 0.2, 8.4, lswLam(0xE8E0C8), 0, 3.2, 0);
for (var w = 0; w < 6; w++)
[-1, 1].forEach(function (k) { lswBox(tr, 0.05, 0.9, 0.9, lswShine(0x1A2228, 0.2, 0.3), k * 1.22, 1.8, -3.2 + w * 1.3); });
lswCyl(tr, 0.03, 0.03, 2.4, lswLam(0x1A1A1A), 0, 3.4, -2, 5);
lswSolid(0, 60, 2.6, 8.4, h(0, 60) - 1, h(0, 60) + 4);
lswPlant(P, "palm", lswScatter(41, lite ? 14 : 30, -140, -20, 140, 170, function (x, z) { return Math.abs(Math.abs(x) - 18) > 9 && Math.abs(x) > 9 && Math.hypot(x + 80, z - 38) > 40; }, h, 0.8, 1.3));
lswOpera(P, -80, 52);
var wave = lswCanvas("waves", 256, 256, function (c, W, H) { c.fillStyle = "#F2EEE6"; c.fillRect(0, 0, W, H); c.fillStyle = "#1A1A1A"; for (var y = 0; y < H; y += 32) {
c.beginPath();
c.moveTo(0, y);
for (var x = 0; x <= W; x += 4)
c.lineTo(x, y + Math.sin(x / W * Math.PI * 4) * 8);
for (x = W; x >= 0; x -= 4)
c.lineTo(x, y + 14 + Math.sin(x / W * Math.PI * 4) * 8);
c.fill();
} });
wave.repeat.set(6, 6);
var sq = new THREE.Mesh(new THREE.CircleGeometry(30, 40), lswLam(0xFFFFFF, { map: wave, mapk: "waves" }));
sq.rotation.x = -Math.PI / 2;
sq.position.set(-80, h(-80, 14) + 0.08, 14);
P.add(sq);
lswSpot(-80, 24, 5, "The opera house", "look", function () { lswTale("🎭 The opera house", [], ["Manaos, a thousand miles up the Amazon, grew rich on rubber; its opera house, finished in 1896, was built with iron from Glasgow, marble from Italy and tiles for its dome from Alsace. The book's travellers pass through this city on their way to the unknown."], ""); });
lswFazenda(P, 70, 205);
var names = ["Senhor Albuquerque, a rubber merchant", "Dona Isabel", "a stevedore of the quay", "Senhor Pinto, the customs officer", "a lad selling oranges", "Senhora Carvalho"];
lswCrowd(901, lite ? 8 : 18, -40, -44, 40, 150, function (i, sex) { return sex === "f" ? "lslady" : ["lsplanter", "lsdocker", "lsdocker", "lsplanter"][i % 4]; }, names, "You are one of the people of Manaos on the Rio Negro in 1911, in the world of Conan Doyle's The Lost World (the book only): the rubber city a thousand miles up the Amazon, with its opera house, its trams, its steamers at the quay. You speak Portuguese first but a little English for the English travellers.", ["Bom dia! Good day, senhor.", "Ah, English? Welcome to Manaos.", "The rubber steamers sail at dawn.", "You go up the river? Take quinine!"], { women: 0.35, skin: [0xE6BD9C, 0xC28862, 0xA66C48, 0x875335, 0xF1D5C0], wander: 6 });
lswButterflies(P, 10, -60, 120, 1.5, 6, 0xE8C020);
lswButterflies(P, 8, 60, 180, 1.5, 5, 0x2A6AE8);
},
function (P, x, z) {
var g = new THREE.Group(), y = LSW_SCN.manaos.h(x, z);
g.position.set(x, y, z);
P.add(g);
var pink = lswS("b:stucco", 0xE8A8A0, 3), white = lswLam(0xF8F4EC), gold = lswShine(0xD8B048, 0.4, 0.6);
lswBox(g, 44, 16, 32, pink, 0, 0, 0);
lswBox(g, 46, 1.2, 34, white, 0, 16, 0);
lswBox(g, 46, 1.4, 34, lswMat("granite"), 0, -0.4, 0);
lswBox(g, 20, 1.4, 6, white, 0, 0, -19);
for (var i = 0; i < 5; i++) {
lswBox(g, 1.2, 9, 1.2, white, -8 + i * 4, 1.4, -21.4);
}
lswBox(g, 22, 1.2, 6, white, 0, 10.4, -19);
lswBox(g, 22, 0.8, 0.3, gold, 0, 11.6, -21.8);
for (i = 0; i < 8; i++) {
lswBox(g, 0.8, 14, 0.6, white, -21 + i * 6, 0, -16.2);
}
for (i = 0; i < 6; i++)
[-1, 1].forEach(function (k) { lswBox(g, 1.6, 2.6, 0.1, lswShine(0x1A2228, 0.2, 0.3), -17.5 + i * 7, 6, k * 16.05); });
lswSign(g, "TEATRO AMAZONAS", 14, 1.4, 0, 13.6, -22.2, Math.PI, { bg: "#F8F4EC", ink: "#6A3A10" });
var tiles = lswCanvas("domeTiles", 256, 256, function (c, W, H) { var cs = ["#2A8A3A", "#F0C020", "#1A4AA8", "#F4F0E8"]; for (var y = 0; y < 16; y++)
for (var x = 0; x < 16; x++) {
c.fillStyle = cs[(x + y * 2 + ((x >> 2) + (y >> 2))) % 4];
c.save();
c.translate(x * 16 + 8, y * 16 + 8);
c.rotate(Math.PI / 4);
c.fillRect(-6, -6, 12, 12);
c.restore();
} });
tiles.repeat.set(8, 4);
var dome = new THREE.Mesh(new THREE.SphereGeometry(9, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), lswShine(0xFFFFFF, 0.35, 0.15));
dome.material = lswM("domeM", function () { var m = new THREE.MeshPhongMaterial({ map: tiles, shininess: 70, specular: 0x8A8A8A }); m.userData.noPhoto = 1; return m; });
dome.position.set(0, 18, 6);
dome.scale.y = 1.1;
g.add(dome);
lswCyl(g, 9.4, 9.4, 1.4, white, 0, 16.8, 6, 28);
lswCyl(g, 1.2, 1.4, 3.2, white, 0, 27.5, 6, 12);
var ball = new THREE.Mesh(new THREE.SphereGeometry(0.7, 12, 8), gold);
ball.position.set(0, 31.4, 6);
g.add(ball);
lswSolid(x, z, 44, 32, y - 1, y + 30);
lswSolid(x, z - 19, 22, 6, y - 1, y + 12);
return g;
},
function (P, x, z) {
var h = LSW_SCN.manaos.h, y = h(x, z) + 0.4, g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var W = 22, D = 14, Hh = 4.2, wall = lswS("b:stucco", 0xF8F2E6, 3), trim = lswLam(0x3A5A3A), floor = lswS("b:cotto", 0xC88A6A, 1.2);
lswBox(g, W + 6, 0.4, D + 6, lswMat("granite"), 0, -0.4, 0);
lswBox(g, W + 6, 0.05, D + 6, floor, 0, 0, 0);
lswFloor(x, z, W + 6, D + 6, y + 0.05);
lswBox(g, W, Hh, 0.3, wall, 0, 0, D / 2);
lswBox(g, 0.3, Hh, D, wall, -W / 2, 0, 0);
lswBox(g, 0.3, Hh, D, wall, W / 2, 0, 0);
lswBox(g, W / 2 - 1, Hh, 0.3, wall, -W / 4 - 0.5, 0, -D / 2);
lswBox(g, W / 2 - 1, Hh, 0.3, wall, W / 4 + 0.5, 0, -D / 2);
lswBox(g, 2, Hh - 2.8, 0.3, wall, 0, 2.8, -D / 2);
[[-W / 2, 0, 0.5, D], [W / 2, 0, 0.5, D], [0, D / 2, W, 0.5], [-W / 4 - 0.5, -D / 2, W / 2 - 1, 0.5], [W / 4 + 0.5, -D / 2, W / 2 - 1, 0.5]].forEach(function (q) { lswSolid(x + q[0], z + q[1], q[2], q[3], y - 1, y + Hh); });
for (var i = 0; i < 4; i++) {
var wx = -W / 2 + 2.5 + i * (i < 2 ? 3 : 3) + (i >= 2 ? 7.2 : 0);
lswBox(g, 1.6, 2.4, 0.34, lswShine(0x2A3A2A, 0.4, 0.1), wx, 0.9, -D / 2);
[-1, 1].forEach(function (k) { lswBox(g, 0.8, 2.4, 0.06, trim, wx + k * 1.25, 0.9, -D / 2 - 0.22); });
}
lswBox(g, W, 0.15, D, lswLam(0xF4EEE2), 0, Hh, 0);
var cane = lswLam(0xD8B878);
var tb = new THREE.Group();
tb.position.set(0, 0.05, -2);
g.add(tb);
lswCyl(tb, 1.0, 1.0, 0.06, cane, 0, 0.74, 0, 20);
lswCyl(tb, 0.12, 0.4, 0.74, cane, 0, 0, 0, 10);
for (var c = 0; c < 4; c++) {
var a = c / 4 * 6.283 + 0.4, ch = new THREE.Group();
ch.position.set(Math.cos(a) * 1.6, 0, Math.sin(a) * 1.6);
ch.rotation.y = -a + Math.PI / 2;
tb.add(ch);
lswBox(ch, 0.6, 0.08, 0.6, cane, 0, 0.45, 0);
lswBox(ch, 0.6, 0.8, 0.06, cane, 0, 0.5, -0.28);
[[-0.25, -0.25], [0.25, -0.25], [-0.25, 0.25], [0.25, 0.25]].forEach(function (q) { lswCyl(ch, 0.025, 0.025, 0.45, cane, q[0], 0, q[1], 5); });
}
var env = lswBox(tb, 0.32, 0.01, 0.22, lswLam(0xF0E8D4), 0.1, 0.8, 0.1);
env.rotation.y = 0.3;
var seal = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.01, 10), lswLam(0xA81A1A));
seal.position.set(0.12, 0.815, 0.12);
tb.add(seal);
g.userData.env = env;
var clock = new THREE.Group();
clock.position.set(0, 2.7, D / 2 - 0.22);
g.add(clock);
lswBox(clock, 0.7, 1.0, 0.12, lswMat("oak"), 0, -0.5, 0);
var face = new THREE.Mesh(new THREE.CircleGeometry(0.28, 24), lswLam(0xFFFFFF, { map: lswCanvas("clockFace", 128, 128, function (cx, W, H) { cx.fillStyle = "#F8F4E8"; cx.fillRect(0, 0, W, H); cx.fillStyle = "#1A1A1A"; cx.font = "bold 15px Georgia"; cx.textAlign = "center"; cx.textBaseline = "middle"; for (var n = 1; n <= 12; n++) {
var a = n / 12 * Math.PI * 2;
cx.fillText(["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][n - 1], W / 2 + Math.sin(a) * 48, H / 2 - Math.cos(a) * 48);
} }), mapk: "clockFace" }));
face.position.set(0, 0, -0.07);
face.rotation.y = Math.PI;
clock.add(face);
var hands = [];
[0.17, 0.24].forEach(function (L, k) { var hd = new THREE.Mesh(new THREE.BoxGeometry(0.02, L, 0.01), lswLam(0x1A1A1A)); hd.geometry.translate(0, L / 2, 0); hd.position.z = -0.08; clock.add(hd); hands.push(hd); });
g.userData.hands = hands;
LSW.clock = hands;
lswBox(g, 2.4, 0.9, 0.6, lswMat("oak"), -7, 0.05, D / 2 - 0.6);
lswBox(g, 2.6, 0.02, 1.8, lswLam(0x8A2A2A), -6, 0.06, 0);
lswBox(g, 3.2, 0.02, 2.4, lswLam(0x2A4A6A), 4, 0.06, 1);
[[-9, 4], [8.5, 4.5]].forEach(function (q) { var pl = new THREE.Group(); pl.position.set(q[0], 0.05, q[1]); g.add(pl); lswCyl(pl, 0.3, 0.24, 0.6, lswMat("terracotta"), 0, 0, 0, 10); lswPlant(pl, "fern", [{ x: 0, z: 0, y: 0.4, s: 0.35 }], { keepAll: 1 }); });
for (var p = 0; p < 8; p++) {
[-1, 1].forEach(function (k) { lswCyl(g, 0.12, 0.14, Hh, lswLam(0xF8F4EC), -W / 2 - 1.8 + p * (W + 3.6) / 7, 0, k * (D / 2 + 2.2), 10); });
}
var rf = new THREE.Mesh(lswGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), lswMat("terracotta"));
rf.scale.set(W + 6.4, 3.2, D + 6.4);
rf.position.y = Hh;
g.add(rf);
lswPlant(P, "palm", lswScatter(51, 10, x - 36, z - 40, x + 36, z - 12, null, h, 0.9, 1.3));
lswPlant(P, "bush", lswScatter(52, 24, x - 30, z - 30, x + 30, z - 12, function (xx) { return Math.abs(xx - x) > 3; }, h, 0.7, 1.2), { col: 0x3A7A3A });
lswPlant(P, "flowers", lswScatter(53, 40, x - 28, z - 28, x + 28, z - 12, function (xx) { return Math.abs(xx - x) > 2; }, h, 0.8, 1.2), { col: "#E84A8A" });
lswPlant(P, "flowers", lswScatter(54, 30, x - 28, z - 28, x + 28, z - 12, function (xx) { return Math.abs(xx - x) > 2; }, h, 0.8, 1.2), { col: "#F8E040" });
lswStrip(P, [[x, z - 48], [x, z - 10]], 2.4, h, lswS("sand", 0xE8D8B8, 3), 0.08);
lswSign(P, "FAZENDA ST. IGNATIO", 4, 0.6, x, h(x, z - 46) + 2.4, z - 46, Math.PI, { bg: "#F4EEE0", ink: "#2A4A2A" });
lswCyl(P, 0.08, 0.08, 2.2, lswMat("oak"), x - 1.8, h(x - 1.8, z - 46), z - 46, 6);
lswCyl(P, 0.08, 0.08, 2.2, lswMat("oak"), x + 1.8, h(x + 1.8, z - 46), z - 46, 6);
return g;
},
function (P) {
var lite = lswLite();
var esm = lswLaunch();
esm.position.set(0, 0, 0);
P.add(esm);
LSW.esm = esm;
esm.userData.live = 1;
lswSmoke(P, 0, 5.6, -3.2, 0x4A4A4A, 8).userData.drift = 1;
lswFloor(0, -1, 5.0, 24, 1.21);
LSW.deckBox = { hw: 2.35, z0: -12.2, z1: 10.6 };
lswSolid(0, -7.5, 3.4, 3.0, 1, 4);
lswSolid(0, 1.2, 3.6, 5.0, 1, 4);
lswRound(0, -3.2, 0.55, 1, 6);
lswWater(P, 0, 0, 3000, 3000, 0, 0x7A6440, 0.94);
LSW.banks = [];
[-1, 1].forEach(function (k) {
for (var c = 0; c < 2; c++) {
var B = new THREE.Group();
B.position.set(k * (lite ? 150 : 170), 0, -c * 1200);
P.add(B);
B.userData.live = 1;
LSW.banks.push(B);
var land = new THREE.Mesh(new THREE.PlaneGeometry(220, 1200, 1, 1), lswLam(0x3A4A26));
land.rotation.x = -Math.PI / 2;
land.position.set(k * 110, 0.6, 0);
B.add(land);
var mud = new THREE.Mesh(new THREE.PlaneGeometry(14, 1200), lswLam(0x6A5438));
mud.rotation.x = -Math.PI / 2 + k * 0.25;
mud.rotation.y = 0;
mud.position.set(-k * 2, 0.2, 0);
B.add(mud);
lswPlant(B, "jtree", lswScatter(400 + c * 7 + k, lite ? 60 : 130, k > 0 ? 6 : -60, -600, k > 0 ? 60 : -6, 600, null, function () { return 0.6; }, 0.8, 1.3));
lswPlant(B, "mauritia", lswScatter(410 + c * 7 + k, lite ? 20 : 50, k > 0 ? 0 : -20, -600, k > 0 ? 20 : 0, 600, null, function () { return 0.6; }, 0.8, 1.2));
lswPlant(B, "palm", lswScatter(420 + c * 7 + k, lite ? 16 : 40, k > 0 ? 2 : -26, -600, k > 0 ? 26 : -2, 600, null, function () { return 0.6; }, 0.8, 1.2));
}
});
lswSpot(0, -8.6, 1.6, "The wheel of the Esmeralda", "take the wheel", function () { if (typeof lsbSteer === "function")
lsbSteer();
else
lswTale("🚢 The wheel", ["shadows"], [], "VII"); }, 1.21);
lswSpot(0, -11.6, 1.6, "The bow", "look ahead", function () { lswTale("🌊 The great river", ["shadows", "eightinches"], ["A thousand miles from the sea, and still so wide that from the middle the banks are shadows."], "VII"); }, 1.21);
lswSpot(0, 9.6, 2.0, "The stern, under the awning", "sit in the shade", function () { lswTale("⛱️ Under the awning", ["gapo"], [], "VIII"); }, 1.21);
var cay = lswCayman(1.2);
cay.position.set(-158, 0.4, -200);
LSW.banks[0].add(cay);
for (var b = 0; b < 6; b++) {
var wd = lswWader([0xF8F4F0, 0xE89AB0, 0xF8F4F0][b % 3]);
wd.position.set(158 + (b % 3) * 2, 0.3, -300 + b * 40);
LSW.banks[2].add(wd);
}
if (!lite)
lswButterflies(P, 10, 0, 0, 4, 14, 0x2A6AE8);
},
function (P) {
var lite = lswLite(), h = LSW_SCN.village.h;
lswTerrain(P, -260, -260, 520, 520, lite ? 8 : 4, h, lswMat("earth"), function (x, z, y, c) { if (y < -0.8) {
c.setRGB(0.48, 0.38, 0.26);
return;
} var clr = Math.hypot(x, z - 10) < 70, g = 0.7 + lswFbm(x * 0.06, z * 0.06, 2) * 0.3; if (clr)
c.setRGB(0.66 * g, 0.56 * g, 0.4 * g);
else
c.setRGB(0.42 * g, 0.6 * g, 0.3 * g); });
lswWater(P, 0, -560, 1600, 1000, -0.5, 0x6A5A3A, 0.94);
lswPlant(P, "jtree", lswScatter(61, lite ? 60 : 140, -250, -50, 250, 250, function (x, z) { return Math.hypot(x, z - 10) > 82; }, h, 0.8, 1.3));
lswPlant(P, "jtree", lswScatter(62, lite ? 30 : 80, -800, -260, 800, -200, null, function () { return -0.3; }, 0.8, 1.2));
lswPlant(P, "palm", lswScatter(63, lite ? 16 : 36, -90, -55, 90, 90, function (x, z) { return Math.hypot(x, z - 10) > 40; }, h, 0.8, 1.2));
lswPlant(P, "mauritia", lswScatter(64, lite ? 10 : 24, -160, -60, 160, -40, null, h, 0.8, 1.2));
lswPlant(P, "fern", lswScatter(65, lite ? 20 : 50, -200, -40, 200, 200, function (x, z) { return Math.hypot(x, z - 10) > 60; }, h, 0.7, 1.2));
lswPlant(P, "grass", lswScatter(66, lite ? 60 : 160, -80, -50, 80, 80, function (x, z) { return Math.hypot(x, z - 10) < 70; }, h, 0.6, 1.1));
var mx = 30, mz = 30, my = h(mx, mz), mg = new THREE.Group();
mg.position.set(mx, my, mz);
P.add(mg);
var mw = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 2.2, 28, 1, true), lswMat("planks"));
mw.material = lswMat("planks");
mw.position.y = 1.1;
mg.add(mw);
var mr = new THREE.Mesh(new THREE.ConeGeometry(11, 9, 28, 1, true), lswThatchM());
mr.position.y = 2.2 + 4.5;
mg.add(mr);
lswRound(mx, mz, 9.3, my - 1, my + 11);
LSW.solids[LSW.solids.length - 1].off = true;
for (var s = 0; s < 28; s++) {
var a = s / 28 * 6.283;
if (Math.abs(a - 4.71) < 0.35)
continue;
lswRound(mx + Math.cos(a) * 9, mz + Math.sin(a) * 9, 1.1, my - 1, my + 3);
}
lswFloor(mx, mz, 0, 0, my + 0.05, { r: 9 });
lswFire(mg, 0, 0.05, 0, 1.0);
for (var hmk = 0; hmk < 6; hmk++) {
var a2 = hmk / 6 * 6.283 + 0.3, hm = new THREE.Mesh(lswGeo("hammock", function () { var c = new THREE.CylinderGeometry(0.5, 0.5, 2.2, 10, 1, true, 0, Math.PI); c.rotateZ(Math.PI / 2); c.rotateX(Math.PI); return c; }), lswLam([0xD84A2A, 0xE8C040, 0x2A8AA8][hmk % 3], { ds: 1 }));
hm.position.set(Math.cos(a2) * 6, 1.2, Math.sin(a2) * 6);
hm.rotation.y = -a2;
mg.add(hm);
}
lswHut(P, -50, 20, 7, 5, 0.3, { hammock: 1 });
lswHut(P, -30, 60, 6, 5, -0.4, {});
lswHut(P, 60, -10, 6, 5, 1.2, {});
lswHut(P, -70, -20, 6, 4.5, 0.9, {});
lswHut(P, 70, 60, 6, 5, -0.9, { hammock: 1 });
for (var r = 0; r < 4; r++) {
var rx = -10 + r * 6, rz = -20;
lswCyl(P, 0.06, 0.06, 1.6, lswMat("darkbark"), rx - 1, h(rx - 1, rz), rz, 5);
lswCyl(P, 0.06, 0.06, 1.6, lswMat("darkbark"), rx + 1, h(rx + 1, rz), rz, 5);
var bar = lswBox(P, 2.2, 0.06, 0.06, lswMat("darkbark"), rx, h(rx, rz) + 1.55, rz);
for (var f = 0; f < 5; f++)
lswBox(P, 0.1, 0.5, 0.04, lswLam(0x8A6A4A), rx - 0.8 + f * 0.4, h(rx, rz) + 1.0, rz);
}
for (var pt = 0; pt < 6; pt++) {
var px = 6 + pt * 1.3, pz = 4, pot = new THREE.Mesh(lswGeo("pot", function () { var pts = []; for (var i = 0; i <= 8; i++) {
var t = i / 8;
pts.push(new THREE.Vector2(0.28 * Math.sin(t * Math.PI) + 0.12, t * 0.55));
} return new THREE.LatheGeometry(pts, 12); }), lswMat("terracotta"));
pot.position.set(px, h(px, pz), pz);
P.add(pot);
}
lswFire(P, 0, h(0, 0), 0, 0.8);
lswCanoe(P, -20, h(-20, -52) + 0.4, -52, 0.2, {});
lswCanoe(P, -12, h(-12, -50) + 0.4, -50, 0.15, { frame: 1 });
lswCanoe(P, -30, -0.4, -70, 0.1, { load: 1 });
lswCanoe(P, -22, -0.4, -74, 0.05, { load: 1 });
for (var tr = 0; tr < 2; tr++) {
[-3, 3].forEach(function (dz) { var tx = -20 + tr * 8, tz = -52 + dz; lswBox(P, 1.8, 0.7, 0.2, lswMat("darkbark"), tx, h(tx, tz), tz); });
}
lswBox(P, 3, 0.15, 16, lswMat("planks"), 0, 0.6, -66);
lswFloor(0, -66, 3, 16, 0.75);
for (var j = 0; j < 6; j++)
[-1, 1].forEach(function (k) { lswCyl(P, 0.1, 0.1, 3.2, lswMat("darkbark"), k * 1.4, -2.5, -72 + j * 2.6, 6); });
var vn = ["Ataca", "Ipetu", "the chief of the village", "a woman at the cassava", "a boy with a bow", "an old woman weaving a hammock"];
lswCrowd(951, lite ? 6 : 14, -60, -40, 70, 70, function (i, sex) { return "lsmojo"; }, null, null, null, { women: 0.4, skin: [0x93603E, 0x875335, 0xA66C48], wander: 5 });
lswFolkV(P);
lswSpot(-20, -52, 4, "The two canoes of skins over bamboo", "look at them", function () { lswTale("🛶 The canoes", ["skins"], ["Two light canoes, bought from the village: hides stretched over a frame of bamboo, so light that two men can carry one round a rapid."], "VII"); });
lswSpot(-50, 20, 5, "The hut where the plans are made", "go in", function () { lswTale("🛖 The hut", [], ["Here the four Englishmen sit at night over their plans, and settle what is to be done tomorrow."], "VIII"); });
if (!lite)
lswButterflies(P, 12, -30, -30, 1.5, 8, 0x2A6AE8);
var mk = lswMonkey();
mk.position.set(-90, 26, 40);
P.add(mk);
},
function (P) {
var h = LSW_SCN.village.h, per = "You are one of the people of an Indian village on a tributary of the Amazon in 1911, in the world of Conan Doyle's The Lost World (the book only): a skilled river people who build canoes of skins over bamboo. Speak simply and with dignity; you know the river, the forest, the fish and the rapids. You are wary of the country to the east, where the drums are.";
[["Ataca", -14, -46, 0.4, "You are Ataca, a man of the village, who went once before with Professor Challenger up the river; you are afraid to go again, but the chief has made the bargain. "], ["Ipetu", -24, -46, -0.6, "You are Ipetu, a man of the village, who went once before with Professor Challenger up the river, and who is afraid of what lies beyond. "],
["The chief of the village", 24, 12, Math.PI, "You are the old chief of the village, who has patriarchal powers here; you have made a good bargain with the English for two canoes and two of your men. "]].forEach(function (q, i) {
var g = lswDressed("vil" + i, "lsmojo", { sex: "m", hair: 0x0E0E0E, skin: [0x875335, 0x93603E, 0x74492E][i] });
g.position.set(q[1], h(q[1], q[2]), q[2]);
g.rotation.y = q[3];
P.add(g);
var Pp = { g: g, y: g.position.y, o: {} };
LSW.people.push(Pp);
lswTalk(Pp, q[0], q[4] + per, i === 2 ? "(He lifts his hand in greeting.)" : "(He nods.)", 3.2);
});
},
function (on) {
if (!on) {
if (LSW.drum) {
clearInterval(LSW.drum.iv);
LSW.drum = null;
}
return;
}
if (LSW.drum)
return;
var AC = window.AudioContext || window.webkitAudioContext;
if (!AC)
return;
var ctx;
try {
ctx = LSW.ac || (LSW.ac = new AC());
}
catch (e) {
return;
}
function hit(t, f, v) {
try {
var o = ctx.createOscillator(), g = ctx.createGain(), lp = ctx.createBiquadFilter();
lp.type = "lowpass";
lp.frequency.value = 220;
o.type = "sine";
o.frequency.setValueAtTime(f * 1.6, t);
o.frequency.exponentialRampToValueAtTime(f, t + 0.08);
g.gain.setValueAtTime(0.0001, t);
g.gain.exponentialRampToValueAtTime(v * (window.SBK_VOL != null ? window.SBK_VOL * 1.6 : 0.4), t + 0.01);
g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
o.connect(lp);
lp.connect(g);
g.connect(ctx.destination);
o.start(t);
o.stop(t + 0.55);
}
catch (e) { }
}
var n = 0;
LSW.drum = { iv: setInterval(function () {
if (WLD.on !== LSW_KEY) {
lswDrums(false);
return;
}
var t = ctx.currentTime + 0.05, quick = (Math.floor(n / 16) % 3) === 1;
for (var i = 0; i < (quick ? 8 : 4); i++)
hit(t + i * (quick ? 0.18 : 0.42), [62, 74, 55][i % 3], 0.5 + Math.random() * 0.3);
n += 4;
}, 1800) };
},
function (P) {
var lite = lswLite(), h = LSW_SCN.forest.h;
lswTerrain(P, -440, -440, 880, 880, lite ? 8 : 4, h, lswMat("earth"), function (x, z, y, c) { var d = Math.abs(x - lswFrRiverX(z)), g = 0.7 + lswFbm(x * 0.08, z * 0.08, 2) * 0.3; if (d < 16) {
c.setRGB(0.5 * g, 0.44 * g, 0.34 * g);
return;
} c.setRGB(0.36 * g, 0.42 * g, 0.26 * g); });
var low = lswWater(P, lswFrRiverX(300), 300, 60, 300, -1, 0x4A4430, 0.94), up = lswWater(P, lswFrRiverX(-300), -300, 60, 300, 6, 0x4A4430, 0.94);
var rg = new THREE.BufferGeometry(), rpos = [], ruv = [], ri = [], N = 24;
for (i = 0; i <= N; i++) {
var zq = -160 + i * 320 / N, xq = lswFrRiverX(zq), yq = lswFrWater(zq) - 0.4;
rpos.push(xq - 16, yq, zq, xq + 16, yq, zq);
ruv.push(0, i * 2, 4, i * 2);
if (i)
ri.push((i - 1) * 2, (i - 1) * 2 + 1, i * 2, (i - 1) * 2 + 1, i * 2 + 1, i * 2);
}
rg.setAttribute("position", new THREE.Float32BufferAttribute(rpos, 3));
rg.setAttribute("uv", new THREE.Float32BufferAttribute(ruv, 2));
rg.setIndex(ri);
rg.computeVertexNormals();
var rapid = new THREE.Mesh(rg, lswWaterM(0xE8ECE8, 0.9));
P.add(rapid);
LSW.water.push(rapid);
rapid.userData.fast = 1;
lswPlant(P, "rock", lswScatter(71, lite ? 24 : 60, 20, -160, 100, 160, function (x, z) { return Math.abs(x - lswFrRiverX(z)) < 14; }, function (x, z) { return lswFrWater(z) - 0.8; }, 0.5, 1.6), { mat: lswMat("granite") });
for (i = 0; i < (lite ? 8 : 20); i++) {
var R = wRand(700 + i), fz = -150 + R() * 300;
var foam = new THREE.Mesh(lswGeo("foam", function () { return new THREE.IcosahedronGeometry(0.8, 1); }), lswLam(0xF4F6F4, { op: 0.6 }));
foam.position.set(lswFrRiverX(fz) + (R() - 0.5) * 20, lswFrWater(fz) - 0.2, fz);
foam.scale.set(1.8, 0.4, 1.4);
P.add(foam);
}
var ok = function (x, z) { return Math.abs(x - lswFrRiverX(z)) > 22 && lswPathD(x, z, LSW_FR_PATH) > 5; };
lswPlant(P, "jtree", lswScatter(72, lite ? 110 : 260, -430, -430, 430, 430, ok, h, 0.9, 1.4));
lswPlant(P, "palm", lswScatter(73, lite ? 20 : 50, -430, -430, 430, 430, ok, h, 0.8, 1.2));
lswPlant(P, "fern", lswScatter(74, lite ? 40 : 120, -430, -430, 430, 430, ok, h, 0.6, 1.1));
lswPlant(P, "bush", lswScatter(75, lite ? 40 : 110, -430, -430, 430, 430, ok, h, 0.7, 1.3), { col: 0x2E5A26 });
if (!lite) {
var lianas = [];
lswScatter(76, 90, -400, -400, 400, 400, ok, h, 1, 1).forEach(function (t) { lianas.push({ x: t.x, z: t.z, y: t.y, sy: 14 + Math.random() * 16, rz: (Math.random() - 0.5) * 0.2 }); });
lswInst(P, lswGeo("liana", function () { var c = new THREE.CylinderGeometry(0.06, 0.06, 1, 4); c.translate(0, 0.5, 0); return c; }), lswLam(0x4A5A2A), lianas, {});
}
lswPlant(P, "flowers", lswScatter(77, lite ? 30 : 80, -420, -420, 420, 420, ok, h, 0.8, 1.3), { col: "#F8D020" });
lswPlant(P, "flowers", lswScatter(78, lite ? 20 : 60, -420, -420, 420, 420, ok, h, 0.8, 1.3), { col: "#C84AE8" });
for (i = 0; i < (lite ? 5 : 12); i++) {
var R2 = wRand(800 + i), sx = -300 + R2() * 600, sz = -380 + R2() * 760;
if (!ok(sx, sz))
continue;
var beam = new THREE.Mesh(lswGeo("shaft", function () { var c = new THREE.CylinderGeometry(1.2, 2.6, 40, 10, 1, true); c.translate(0, 20, 0); return c; }), lswGlowM(0xFFF4C0, 0.08));
beam.position.set(sx, h(sx, sz), sz);
beam.rotation.z = 0.18;
beam.material.side = THREE.DoubleSide;
P.add(beam);
}
lswStrip(P, LSW_FR_PATH, 2.6, h, lswS("earth", 0x8A6A4A, 3), 0.08);
var silk = new THREE.Group(), sy = h(-80, 30);
silk.position.set(-80, sy, 30);
P.add(silk);
var sb = new THREE.Mesh(lswGeo("silkT", function () { var c = new THREE.CylinderGeometry(2.0, 3.6, 46, 12); c.translate(0, 23, 0); var bs = [c.toNonIndexed()]; for (var b = 0; b < 7; b++) {
var f = new THREE.BoxGeometry(0.5, 9, 6);
f.translate(0, 4.5, 4);
f.rotateY(b / 7 * 6.283);
bs.push(f.toNonIndexed());
} return gwMerge(bs); }), lswMat("pale"));
silk.add(sb);
var sc = new THREE.Mesh(lswGeo("silkC", function () { var parts = [], R3 = wRand(9); for (var b = 0; b < 12; b++) {
var c = new THREE.IcosahedronGeometry(6 + R3() * 3, 1);
c.translate((R3() - 0.5) * 20, 46 + R3() * 6, (R3() - 0.5) * 20);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), lswM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: lswLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
silk.add(sc);
lswRound(-80, 30, 4.2, sy - 1, sy + 40);
lswSpot(-80, 36, 6, "The great silk-cotton tree", "look up", function () { lswTale("🌳 The silk-cotton tree", ["cedars", "gothic"], ["A great silk-cotton tree of the Amazon, its buttresses standing out like the walls of a church."], "VIII"); });
lswSpot(-60, 120, 6, "The aisles of the great trees", "stand and listen", function () { lswTale("⛪ The forest", ["abbeyhush", "upwards"], [], "VIII"); });
lswSpot(lswFrRiverX(0) - 18, 0, 8, "The rapid, a mile long", "look at the white water", function () { lswTale("🌊 The steep rapid", ["steeprapid", "corrob"], [], "VIII"); });
lswSpot(lswFrRiverX(300) - 14, 300, 6, "The put-in, below the rapid", "look", function () { lswTale("🛶 Below the rapid", ["portage"], [], "VIII"); });
lswSpot(lswFrRiverX(-300) - 14, -300, 6, "Above the rapid", "look", function () { lswTale("🛶 Above the rapid", ["hundredmiles"], [], "VIII"); });
LSW.cLow = [lswCanoe(P, lswFrRiverX(300) - 10, -1.2, 304, 0.05, { load: 1 }), lswCanoe(P, lswFrRiverX(312) - 10, -1.2, 316, 0.1, { load: 1 })];
LSW.cUp = [lswCanoe(P, lswFrRiverX(-300) - 10, 5.8, -304, -0.05, {}), lswCanoe(P, lswFrRiverX(-312) - 10, 5.8, -316, 0.0, {})];
LSW.cUp.forEach(function (c) { c.visible = false; });
for (i = 0; i < (lite ? 4 : 10); i++) {
var R4 = wRand(900 + i), mx = -300 + R4() * 600, mz = -300 + R4() * 600;
if (!ok(mx, mz))
continue;
var mk = lswMonkey();
mk.scale.setScalar(1.6);
mk.position.set(mx, h(mx, mz) + 22 + R4() * 10, mz);
P.add(mk);
}
var ae = lswArmadillo(1.3);
ae.position.set(-40, h(-40, 180), 180);
P.add(ae);
lswBeastAdd(ae, "armadillo", { path: [[-40, 180], [-10, 150], [20, 170], [-40, 180]], loop: 1, speed: 0.8, ground: h });
if (!lite)
lswButterflies(P, 12, -60, 120, 1.5, 8, 0x2A6AE8);
},
function (P) {
var lite = lswLite(), h = LSW_SCN.channel.h;
lswTerrain(P, -540, -540, 1080, 1140, lite ? 8 : 4, h, lswMat("earth"), function (x, z, y, c) { var g = 0.7 + lswFbm(x * 0.08, z * 0.08, 2) * 0.3; if (y < -1) {
c.setRGB(0.5 * g, 0.46 * g, 0.32 * g);
return;
} c.setRGB(0.34 * g, 0.46 * g, 0.24 * g); });
lswWater(P, 0, 520, 1600, 160, -0.6, 0x6A5A3A, 0.94);
var cl = lswWater(P, 0, -20, 40, 900, -0.6, 0x2A6A5A, 0.62);
cl.userData.clear = 1;
lswPlant(P, "jtree", lswScatter(81, lite ? 50 : 120, -520, 440, 520, 600, null, function () { return 0.5; }, 0.8, 1.2));
var assai = new THREE.Group(), ay = h(-40, 420);
assai.position.set(-40, ay, 420);
P.add(assai);
lswPlant(assai, "palm", [{ x: 0, z: 0, y: 0, s: 1.9 }], { keepAll: 1 });
lswSpot(-40, 416, 6, "The Assai palm", "look at it", function () { lswTale("🌴 The Assai palm", ["assai"], [], "VIII"); });
lswPlant(P, "reeds", lswScatter(82, lite ? 160 : 400, -24, 318, 24, 342, null, function () { return -0.6; }, 0.9, 1.4), { keepAll: 1 });
LSW.reedZ = 330;
var ok = function (x, z) { return Math.abs(x - lswChX(z)) > 8; }, near = function (x, z) { var d = Math.abs(x - lswChX(z)); return d > 8 && d < 26; };
lswPlant(P, "jtree", lswScatter(83, lite ? 160 : 380, -200, -520, 200, 320, ok, h, 0.8, 1.2));
lswPlant(P, "tree", lswScatter(84, lite ? 80 : 200, -60, -440, 60, 300, near, h, 1.2, 1.7), { col: 0x4A8A2E });
if (!lite) {
var arch = [];
for (var z = 300; z > -400; z -= 6) {
var cx = lswChX(z);
arch.push({ x: cx, z: z, y: 9 + Math.random() * 2, s: 1, ry: Math.random() * 6, sx: 2.4, sy: 0.8, sz: 1.2 });
}
lswInst(P, lswGeo("archLeaf", function () { var parts = [], R = wRand(41); for (var b = 0; b < 6; b++) {
var c = new THREE.IcosahedronGeometry(2.6, 1);
c.translate((R() - 0.5) * 10, (R() - 0.5) * 1.4, (R() - 0.5) * 4);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), lswM("archM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x6AA040, map: lswLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), arch, {});
}
lswPlant(P, "fern", lswScatter(85, lite ? 40 : 120, -60, -440, 60, 320, near, h, 0.6, 1.0));
lswPlant(P, "flowers", lswScatter(86, lite ? 30 : 90, -40, -440, 40, 320, near, h, 0.7, 1.2), { col: "#F0C020" });
lswPlant(P, "flowers", lswScatter(87, lite ? 20 : 60, -40, -440, 40, 320, near, h, 0.7, 1.2), { col: "#E85AA8" });
var ms = [];
for (var i = 0; i < (lite ? 6 : 16); i++) {
var R = wRand(500 + i), mz = 280 - R() * 680, mx = lswChX(mz) + (R() < 0.5 ? -1 : 1) * (6 + R() * 4);
var mk = lswMonkey();
mk.position.set(mx, 9 + R() * 2, mz);
P.add(mk);
ms.push(mk);
}
[[-6, 180], [7, -60], [-5, -260]].forEach(function (q, i) { var c = lswCayman(1.0 + i * 0.2); c.position.set(lswChX(q[1]) + q[0], -0.55, q[1]); c.rotation.y = i * 1.3; P.add(c); });
var tp = lswTapir(1.1);
tp.position.set(lswChX(40) + 12, h(lswChX(40) + 12, 40), 40);
tp.rotation.y = -1.4;
P.add(tp);
var pm = lswPuma(1.1);
pm.position.set(lswChX(-180) - 13, h(lswChX(-180) - 13, -180), -180);
pm.rotation.y = 1.6;
P.add(pm);
lswBeastAdd(pm, "puma", { path: [[lswChX(-180) - 13, -180], [lswChX(-200) - 16, -200], [lswChX(-230) - 26, -230]], speed: 1.2, ground: h });
for (i = 0; i < (lite ? 4 : 10); i++) {
var wz = 200 - i * 60, wd = lswWader([0xF8F4F0, 0xE89AB0, 0xA8B8C8][i % 3]);
wd.position.set(lswChX(wz) + (i % 2 ? 5 : -5), -0.5, wz);
wd.rotation.y = i;
P.add(wd);
}
lswSpot(lswChX(100) - 7, 100, 6, "The green tunnel", "look", function () { lswTale("🌿 The green tunnel", ["pergola", "iceberg", "hazy"], [], "VIII"); });
lswSpot(lswChX(-430) - 5, -430, 6, "Where the canoes can go no farther", "look", function () { lswTale("🛶 The end of the water", ["shallow"], [], "VIII"); });
var bz = -446, bx = 12;
lswPlant(P, "jtree", [{ x: bx, z: bz, y: h(bx, bz), s: 1.1 }], { keepAll: 1 });
var blaze = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.2), lswLam(0xF0E0C0, { ds: 1 }));
blaze.position.set(bx - 1.6, h(bx, bz) + 1.6, bz);
blaze.rotation.y = -Math.PI / 2;
P.add(blaze);
lswSpot(bx - 2, bz, 3, "The blazed tree", "look", function () { lswTale("🪓 The blazed tree", ["blazing"], [], "VIII"); });
LSW.chCanoe = lswCanoe(P, lswChX(400) + 2, -0.9, 400, 0.1, { load: 1 });
lswCanoe(P, lswChX(410) - 4, -0.9, 410, 0.0, { load: 1 });
if (!lite)
lswButterflies(P, 14, 0, 100, 1.5, 8, 0x2A6AE8);
},
function (dt) {
var R = LSW.ride;
if (!R)
return;
var P = LSW_CH_PATH, tot = 0, segs = [];
for (var i = 1; i < P.length; i++) {
var L = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
segs.push(L);
tot += L;
}
var stop = R.stop.filter(function (s) { return !s.done && R.d >= s.d; })[0];
if (stop) {
if (!stop.asked) {
stop.asked = 1;
try {
stop.fn(function () { stop.done = 1; });
}
catch (e) {
stop.done = 1;
}
}
}
else
R.d = Math.min(tot, R.d + R.sp * dt);
var d = R.d, x = P[0][0], z = P[0][1], ang = 0;
for (i = 1; i < P.length; i++) {
if (d <= segs[i - 1] || i === P.length - 1) {
var f = Math.min(1, d / segs[i - 1]);
x = P[i - 1][0] + (P[i][0] - P[i - 1][0]) * f;
z = P[i - 1][1] + (P[i][1] - P[i - 1][1]) * f;
ang = Math.atan2(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
break;
}
d -= segs[i - 1];
}
R.c.position.set(x, -0.9, z);
R.c.rotation.y = ang;
var S = lswSc();
camera.position.set(LSW.base + S.x + x + Math.sin(ang) * -2.6, -0.9 + 0.6 + 1.4, z + Math.cos(ang) * -2.6);
if (R.d >= tot && R.done) {
var f2 = R.done;
R.done = null;
LSW.ride = null;
try {
f2();
}
catch (e) { }
}
},
function (P) {
var lite = lswLite(), h = LSW_SCN.uplands.h;
lswTerrain(P, -780, -780, 1560, 1560, lite ? 10 : 5, h, lswMat("grass"), function (x, z, y, c) { var g = 0.75 + lswFbm(x * 0.05, z * 0.05, 2) * 0.25; if (z > 560) {
c.setRGB(0.42 * g, 0.6 * g, 0.3 * g);
return;
} if (Math.hypot(x - 60, z - 260) < 9) {
c.setRGB(0.5, 0.48, 0.4);
return;
} if (z < -200)
c.setRGB(0.6 * g, 0.66 * g, 0.38 * g);
else
c.setRGB(0.5 * g, 0.64 * g, 0.34 * g); });
for (var i = 0; i < (lite ? 10 : 26); i++) {
var R = wRand(1000 + i), px = -200 + R() * 400, pz = 580 + R() * 160;
var pd = new THREE.Mesh(new THREE.CircleGeometry(2 + R() * 5, 14), lswWaterM(0x3A4A30, 0.8));
pd.rotation.x = -Math.PI / 2;
pd.position.set(px, h(px, pz) + 0.05, pz);
P.add(pd);
}
lswPlant(P, "grass", lswScatter(91, lite ? 120 : 320, -300, 540, 300, 760, null, h, 0.8, 1.3), { col: 0x9AC060 });
lswPlant(P, "mauritia", lswScatter(92, lite ? 14 : 36, -300, 560, 300, 760, null, h, 0.8, 1.2));
for (var s = 0; s < 4; s++) {
var st = new THREE.Mesh(lswGeo("fstone2", function () { return new THREE.DodecahedronGeometry(0.4, 0); }), lswLam(0x2A2622));
st.position.set(-70 + Math.cos(s * 1.57) * 0.7, h(-70, 420) + 0.2, 420 + Math.sin(s * 1.57) * 0.7);
P.add(st);
}
var ash = new THREE.Mesh(new THREE.CircleGeometry(0.6, 12), lswLam(0x3A3A3A));
ash.rotation.x = -Math.PI / 2;
ash.position.set(-70, h(-70, 420) + 0.04, 420);
P.add(ash);
lswSpot(-70, 420, 4, "The four fire-blackened stones", "look", function () { lswTale("🔥 Four stones", ["firestones"], [], "VIII"); });
lswStrip(P, [[60, 400], [50, 330], [60, 260], [80, 180], [70, 80]], 3, h, lswWaterM(0x4A7A8A, 0.8), -0.3);
var pool = new THREE.Mesh(new THREE.CircleGeometry(9, 24), lswWaterM(0x3A7A8A, 0.82));
pool.rotation.x = -Math.PI / 2;
pool.position.set(60, h(60, 260) + 1.6, 260);
P.add(pool);
LSW.water.push(pool);
lswPlant(P, "rock", lswScatter(93, 14, 48, 248, 72, 272, function (x, z) { var d = Math.hypot(x - 60, z - 260); return d > 6 && d < 10; }, h, 0.5, 1.0), { mat: lswMat("granite") });
var fish = new THREE.Group();
fish.position.set(60, h(60, 260) + 1.2, 260);
P.add(fish);
for (i = 0; i < 12; i++) {
var f = new THREE.Mesh(lswGeo("fish", function () { var c = new THREE.SphereGeometry(0.12, 8, 6); c.scale(0.4, 0.5, 1.6); return c; }), lswShine(0x2A5AA8, 0.3, 0.4));
f.userData.ph = i;
fish.add(f);
}
fish.userData.kind = "fish";
LSW.fx.push(fish);
lswSpot(56, 252, 8, "The rock-studded pool", "look in the water", function () { lswTale("🐟 The blue-backed fish", ["trout"], [], "VIII"); });
lswTent(P, 76, h(76, 268), 268, 0.4);
lswTent(P, 80, h(80, 258), 258, -0.2);
lswFire(P, 70, h(70, 262), 262, 0.9);
var bok = function (x, z) { return Math.abs(x) > 2.2; };
lswPlant(P, "bamboo", lswScatter(94, lite ? 600 : 1500, -700, -110, 700, 70, bok, h, 0.9, 1.3), { keepAll: 1 });
LSW.bamCut = LSW.bamCut || 0;
LSW.bamLane = [];
for (var b = 0; b < 10; b++) {
var bz = 62 - b * 18, grp = new THREE.Group();
P.add(grp);
lswPlant(grp, "bamboo", lswScatter(950 + b, lite ? 10 : 22, -2.2, bz - 9, 2.2, bz + 9, null, h, 0.9, 1.2), { keepAll: 1 });
var S = lswSolid(0, bz, 4.6, 18, -50, 400);
LSW.bamLane.push({ g: grp, S: S, z: bz });
}
lswSolid(-360, -20, 640, 180, -50, 400);
lswSolid(360, -20, 640, 180, -50, 400);
lswBamboo(LSW.bamCut);
lswSpot(0, 74, 4, "The wall of bamboo", "cut a way through", function () { lswBamCut(); });
lswPlant(P, "fern", lswScatter(95, lite ? 120 : 320, -700, -470, 700, -130, null, h, 1.0, 1.8));
lswPlant(P, "cycad", lswScatter(96, lite ? 40 : 110, -700, -470, 700, -130, null, h, 0.8, 1.3));
lswPlant(P, "palm", lswScatter(97, lite ? 40 : 100, -700, 100, 700, 560, function (x, z) { return Math.hypot(x - 60, z - 260) > 20 && Math.hypot(x + 70, z - 420) > 8; }, h, 0.9, 1.3));
lswPlant(P, "jtree", lswScatter(98, lite ? 20 : 60, -700, 120, 700, 540, function (x, z) { return Math.abs(x) > 60; }, h, 0.8, 1.1));
lswPlant(P, "grass", lswScatter(99, lite ? 150 : 400, -500, -780, 500, -130, null, h, 0.8, 1.2), { col: 0xC8C880 });
lswPlant(P, "flowers", lswScatter(100, lite ? 40 : 120, -400, -780, 400, -130, null, h, 0.8, 1.2), { col: "#F8F0E0" });
var cl = new THREE.Mesh(new THREE.PlaneGeometry(6000, 420, 60, 1), lswMat("basalt"));
var cpa = cl.geometry.attributes.position;
for (i = 0; i < cpa.count; i++) {
if (cpa.getY(i) > 0)
cpa.setY(i, 210 + Math.sin(cpa.getX(i) * 0.004) * 40 + lswHash(cpa.getX(i), 1) * 30);
}
cl.geometry.computeVertexNormals();
cl.position.set(0, 140, -3000);
P.add(cl);
lswSpot(0, -480, 10, "The whale-backed ridge", "look about", function () { lswTale("⛰️ The ridge", ["treeferns"], [], "VIII"); });
lswSpot(0, -680, 12, "The second ridge: the red cliffs in sight", "look north", function () { lswTale("🟥 The red cliffs", ["redcliffs"], [], "VIII"); });
var pt = lswPtero(7);
pt.visible = false;
P.add(pt);
LSW.upPtero = lswBeastAdd(pt, "ptero", { mode: "glide" });
if (!lite)
lswButterflies(P, 12, -40, 300, 1.5, 9, 0x2A6AE8);
},
function () {
if (!LSW.bamLane)
return;
var n = LSW.bamCut || 0;
if (n >= LSW.bamLane.length) {
setStatus("🎋 The way is cut right through the bamboo.");
return;
}
var L = lswLocalSc();
if (L.z > LSW.bamLane[n].z + 16) {
setStatus("🎋 Come closer to the bamboo first.");
return;
}
LSW.bamCut = n + 1;
lswBamboo(LSW.bamCut);
if (typeof playTone === "function")
playTone(320, 0.06);
setStatus("🎋 <b>Chop, chop.</b> You cut through another stretch of the canes (" + LSW.bamCut + " of " + LSW.bamLane.length + ")." + (LSW.bamCut < LSW.bamLane.length ? " Walk on and cut again." : " Daylight ahead!"));
var next = LSW.bamLane[LSW.bamCut];
if (next) {
var sp = LSW.spots.filter(function (s) { return s.name === "The wall of bamboo"; })[0];
if (sp) {
sp.z = next.z + 10;
}
}
if (typeof lsbNote === "function")
lsbNote("bamboo");
},
function (x, z) {
var r = Math.hypot(x - LSW_LAKE.x, z - LSW_LAKE.z), y;
if (r < LSW_LAKE.r)
y = 104 - 10 * (1 - r / LSW_LAKE.r);
else
y = 108 + 42 * lswSmooth(LSW_LAKE.r, 760, r);
y += lswFbm(x * 0.012, z * 0.012, 3) * 5 * lswSmooth(LSW_LAKE.r, LSW_LAKE.r + 60, r);
var sw = Math.hypot(x - 220, z + 380);
if (sw < 60)
y -= 7 * (1 - sw / 60);
var ap = Math.hypot(x + 120, z + 520);
if (ap < 14)
y -= 1.4 * (1 - ap / 14);
y += (110 - y) * lswSmooth(LSW_ESC_Z + 40, LSW_ESC_Z + 4, z);
if (z < LSW_ESC_Z - 40)
y += 110 * lswSmooth(LSW_ESC_Z - 40, LSW_ESC_Z - 52, z);
var rim = lswSmooth(-60, -8, z);
return y + (LSW_CLIFF_H - y) * rim;
},
function (x, z) {
if (x > 1700)
return -1000;
if (z < LSW_RIM_Z)
return lswPlateauH(x, z);
if (z < 0)
return LSW_CLIFF_H;
var pd = Math.hypot(x - LSW_PIN.x, z - LSW_PIN.z);
if (pd < LSW_PIN.r)
return LSW_CLIFF_H;
var y = lswFbm(x * 0.01, z * 0.01, 3) * 3 + Math.max(0, z - 500) * 0.01;
var jd = Math.hypot((x - 700) / 1.6, z - 220);
if (jd < 120)
y -= 0.8 * (1 - jd / 120);
return y;
},
function (P) {
var lite = lswLite(), h = LSW_SCN.maple.h, st = lite ? 16 : 9;
lswTerrain(P, -1520, 0, 3040, 1520, st, h, lswMat("grass"), function (x, z, y, c) { var g = 0.72 + lswFbm(x * 0.04, z * 0.04, 2) * 0.28, jd = Math.hypot((x - 700) / 1.6, z - 220); if (jd < 120) {
c.setRGB(0.4 * g, 0.48 * g, 0.3 * g);
return;
} c.setRGB(0.6 * g, 0.68 * g, 0.36 * g); });
lswTerrain(P, -1520, -1300, 3040, 1300 + LSW_RIM_Z, st, h, lswMat("grass"), function (x, z, y, c) {
var g = 0.72 + lswFbm(x * 0.04, z * 0.04, 2) * 0.28;
if (z < LSW_ESC_Z - 4) {
c.setRGB(0.78, 0.42, 0.3);
return;
}
if (y < 106.5) {
c.setRGB(0.62 * g, 0.56 * g, 0.42 * g);
return;
}
if (Math.hypot(x - 220, z + 380) < 56) {
c.setRGB(0.4 * g, 0.42 * g, 0.28 * g);
return;
}
if (Math.hypot(x + 120, z + 520) < 12) {
c.setRGB(0.1, 0.09, 0.08);
return;
}
c.setRGB(0.5 * g, 0.64 * g, 0.34 * g);
});
lswCliffs(P);
var lake = new THREE.Mesh(new THREE.CircleGeometry(LSW_LAKE.r + 4, 60), lswWaterM(0x2A5A6A, 0.88));
lake.rotation.x = -Math.PI / 2;
lake.position.set(LSW_LAKE.x, 106, LSW_LAKE.z);
P.add(lake);
LSW.water.push(lake);
var ap = new THREE.Mesh(new THREE.CircleGeometry(12, 24), lswShine(0x0A0908, 0.15, 0.2));
ap.rotation.x = -Math.PI / 2;
ap.position.set(-120, lswPlateauH(-120, -520) + 0.6, -520);
P.add(ap);
lswSmoke(P, -120, lswPlateauH(-120, -520) + 0.8, -520, 0x2A2A2A, 4);
lswMapleBelow(P);
lswMapleAbove(P);
lswCaves(P);
lswTunnel(P);
},
function (P) {
var lite = lswLite(), H = LSW_CLIFF_H, mat = lswMat("basalt");
var g = new THREE.PlaneGeometry(3040, H + 12, lite ? 120 : 300, lite ? 10 : 22), pa = g.attributes.position;
for (var i = 0; i < pa.count; i++) {
var x = pa.getX(i), y = pa.getY(i) + H / 2 - 6, rib = Math.sin(x * 0.9) * 0.5 + Math.sin(x * 0.23) * 1.2 + lswHash(Math.round(x * 2), 3) * 0.6, ov = lswFbm(x * 0.02, y * 0.02, 3) * 4;
pa.setXYZ(i, x, y, -(rib + ov) + (y > H - 8 ? -(y - H + 8) * 0.6 : 0));
}
g.computeVertexNormals();
var w = new THREE.Mesh(g, mat);
w.position.set(0, 0, -1);
P.add(w);
w.receiveShadow = true;
var top = new THREE.Mesh(new THREE.PlaneGeometry(3040, 12), lswMat("basalt"));
top.rotation.x = -Math.PI / 2;
top.position.set(0, H - 0.2, -3);
P.add(top);
var pg = new THREE.CylinderGeometry(LSW_PIN.r * 0.9, LSW_PIN.r * 1.6, H, 16, 24), pp = pg.attributes.position;
for (i = 0; i < pp.count; i++) {
var a = Math.atan2(pp.getZ(i), pp.getX(i)), yy = pp.getY(i), k = 1 + Math.sin(a * 7 + yy * 0.05) * 0.08 + lswHash(Math.round(a * 10), Math.round(yy)) * 0.05;
pp.setX(i, pp.getX(i) * k);
pp.setZ(i, pp.getZ(i) * k);
}
pg.computeVertexNormals();
var pin = new THREE.Mesh(pg, mat);
pin.position.set(LSW_PIN.x, H / 2, LSW_PIN.z);
P.add(pin);
lswRound(LSW_PIN.x, LSW_PIN.z, LSW_PIN.r * 1.5, -10, H - 0.6);
var ptop = new THREE.Mesh(new THREE.CircleGeometry(LSW_PIN.r * 0.92, 18), lswMat("rock"));
ptop.rotation.x = -Math.PI / 2;
ptop.position.set(LSW_PIN.x, H + 0.02, LSW_PIN.z);
P.add(ptop);
lswFloor(LSW_PIN.x, LSW_PIN.z, 0, 0, H, { r: LSW_PIN.r * 0.92 });
LSW.ledges = [[LSW_PIN.x + 2, LSW_PIN.z + LSW_PIN.r * 1.5 + 0.8, 38], [LSW_PIN.x - 3, LSW_PIN.z + LSW_PIN.r * 1.35 + 0.8, 80], [LSW_PIN.x + 1, LSW_PIN.z + LSW_PIN.r * 1.15 + 0.8, 118]];
LSW.ledges.forEach(function (L, i) {
lswBox(P, 4, 0.6, 2.2, lswMat("rock"), L[0], L[2] - 0.6, L[1]);
lswFloor(L[0], L[1], 4, 2.2, L[2]);
lswSpot(L[0], L[1], 2.4, i < 2 ? "A ledge in the chimney" : "The last ledge", "climb higher", function () { lswClimb(i + 1); }, L[2]);
lswSpot(L[0] + 1.4, L[1], 1.6, "The way back down the chimney", "climb down", function () { lswClimb(i - 1); }, L[2]);
});
var bz = LSW_PIN.z + 2, beech = new THREE.Group();
beech.position.set(LSW_PIN.x + 1.5, H, bz);
P.add(beech);
lswPlant(beech, "tree", [{ x: 0, z: 0, y: 0, s: 1.6 }], { keepAll: 1, col: 0x6A9A3A });
LSW.beech = beech;
beech.userData.live = 1;
var log = new THREE.Mesh(lswGeo("beechLog", function () { var c = new THREE.CylinderGeometry(0.4, 0.55, 26, 10); c.rotateX(Math.PI / 2); return c; }), lswMat("bark"));
log.position.set(LSW_PIN.x, H + 0.2, LSW_PIN.z - 12);
P.add(log);
LSW.log = log;
log.userData.live = 1;
lswSpot(LSW_PIN.x + 1.5, LSW_PIN.z + 2, 3, "The beech tree on the pinnacle", "cut at it with the hatchet", function () { lswChop(); }, H);
lswSpot(LSW_PIN.x - 1, LSW_PIN.z + 4.5, 1.6, "The top of the chimney", "climb down", function () { lswClimb(2); }, H);
LSW.bridge = lswFloor(LSW_PIN.x, LSW_PIN.z - 12, 1.4, 24, H + 0.55);
lswBridge(LSW.bridgeState || 0);
var rope = new THREE.Mesh(lswGeo("rope", function () { var c = new THREE.CylinderGeometry(0.02, 0.02, 30, 4); c.rotateX(Math.PI / 2); return c; }), lswLam(0xC8B080));
rope.position.set(LSW_PIN.x - 2, H + 1.2, LSW_PIN.z - 10);
P.add(rope);
LSW.rope = rope;
rope.visible = !!LSW.ropeUp;
rope.userData.live = 1;
},
function () {
if (LSW.bridgeState) {
setStatus("🌳 The beech is down already: it lies across the gulf.");
return;
}
if (typeof lsbMayChop === "function" && !lsbMayChop()) {
setStatus("🌳 A beech tree, at the very edge of the pinnacle. Its time will come (the book will tell you when).");
return;
}
LSW.chops = (LSW.chops || 0) + 1;
if (typeof playTone === "function")
playTone(260 + LSW.chops * 10, 0.07);
LSW.beech.rotation.z = -LSW.chops * 0.02;
if (LSW.chops < 8) {
setStatus("🪓 <b>Chop.</b> The chips fly. (" + LSW.chops + " of 8) Keep at it.");
return;
}
LSW.chops = 0;
LSW.beech.rotation.z = 0;
lswBridge(1);
setStatus("🌳 <i>" + esc(LSW_Q.crack) + "</i> A bridge!");
if (typeof lsbNote === "function")
lsbNote("felled");
},
function (k) {
var L = LSW.ledges;
if (!L)
return;
if (k < 0) {
lswGo({ sc: "maple", x: LSW_PIN.x, z: LSW_PIN.z + LSW_PIN.r * 1.5 + 3, ry: Math.PI }, "🧗 Down at the foot of the pinnacle again.");
return;
}
if (k >= L.length) {
lswGo({ sc: "maple", x: LSW_PIN.x - 1, z: LSW_PIN.z + 1, y: LSW_CLIFF_H, ry: 0 }, "🧗 <b>The top of the pinnacle.</b> The whole plain lies below you; across the gulf, the edge of the plateau.");
if (typeof lsbNote === "function")
lsbNote("ptop");
return;
}
var q = L[k];
lswGo({ sc: "maple", x: q[0], z: q[1], y: q[2], ry: 0 }, "🧗 Up the chimney: hands and knees, wedged against the rock. " + ["A third of the way.", "Two-thirds of the way. Don't look down.", "Nearly there."][k]);
if (typeof lsbNote === "function")
lsbNote("ledge" + k);
},
function (n) {
LSW.bridgeState = n;
if (!LSW.beech)
return;
LSW.beech.visible = n === 0;
LSW.log.visible = n >= 1;
if (LSW.bridge)
LSW.bridge.off = n !== 1;
if (n === 2) {
LSW.log.position.set(LSW_PIN.x + 3, 3, LSW_PIN.z - 4);
LSW.log.rotation.set(1.2, 0.3, 0.2);
}
else {
LSW.log.position.set(LSW_PIN.x, LSW_CLIFF_H + 0.2, LSW_PIN.z - 12);
LSW.log.rotation.set(0, 0, 0);
}
},
function (P) {
var lite = lswLite(), h = LSW_SCN.maple.h;
var bamOk = function (x, z) { return z > 8 && z < 46 && Math.abs(x - LSW_PIN.x) > 36 && Math.abs(x + 380) > 26 && Math.abs(x + 160) > 10 && Math.abs(x + 1200) > 24 && Math.abs(x - 40) > 40; };
lswPlant(P, "bamboo", lswScatter(1101, lite ? 300 : 900, -1500, 8, 1500, 46, bamOk, h, 1.2, 1.7));
lswPlant(P, "palm", lswScatter(1102, lite ? 40 : 110, -1500, 60, 1500, 1500, function (x, z) { return Math.hypot(x, z - 700) > 20; }, h, 0.9, 1.3));
lswPlant(P, "tree", lswScatter(1103, lite ? 40 : 120, -1500, 60, 1500, 1500, null, h, 0.9, 1.4), { col: 0x5A8A3A });
lswPlant(P, "grass", lswScatter(1104, lite ? 200 : 600, -1000, 60, 1000, 1000, null, h, 0.8, 1.3), { col: 0xC8C880 });
lswPlant(P, "bush", lswScatter(1105, lite ? 60 : 160, -1500, 50, 1500, 1500, null, h, 0.7, 1.3), { col: 0x4A7A34 });
lswPlant(P, "cactus", lswScatter(1106, lite ? 10 : 30, -600, 200, 600, 1200, null, h, 0.8, 1.2));
var trail = [[0, 760], [6, 700], [-8, 600], [14, 480], [4, 360], [26, 240], [30, 140], [40, 70]];
lswStrip(P, trail, 2.4, h, lswS("earth", 0x9A8064, 5), 0.05);
var nearT = function (x, z) { return lswPathD(x, z, trail) > 4 && Math.hypot(x, z - 700) > 8; };
lswPlant(P, "fern", lswScatter(1121, lite ? 40 : 120, -120, 420, 120, 900, nearT, h, 0.8, 1.4));
lswPlant(P, "palm", lswScatter(1122, lite ? 12 : 34, -300, 150, 300, 900, nearT, h, 0.8, 1.2));
lswPlant(P, "cycad", lswScatter(1123, lite ? 14 : 40, -140, 380, 140, 900, nearT, h, 0.8, 1.3));
lswPlant(P, "bush", lswScatter(1124, lite ? 40 : 120, -140, 380, 140, 900, nearT, h, 0.6, 1.3), { col: 0x3E6A2E });
lswPlant(P, "grass", lswScatter(1125, lite ? 120 : 360, -110, 450, 110, 860, nearT, h, 0.9, 1.5), { col: 0xB8B870 });
if (!lite)
lswPlant(P, "flowers", lswScatter(1126, 90, -160, 300, 160, 860, nearT, h, 0.6, 1.0));
lswPlant(P, "rock", lswScatter(1127, lite ? 8 : 20, -260, 60, 260, 300, nearT, h, 0.6, 1.6));
(function () {
var R = wRand(1301), K = { palm: [], fern: [], cycad: [], bush: [], grass: [], flowers: [], tree: [], rock: [] }, ng = lite ? 14 : 34;
var clear = function (x, z) { return lswPathD(x, z, trail) > 6 && Math.hypot(x, z - 700) > 14 && Math.hypot(x - 40, z - 60) > 24 && Math.hypot(x - 700, z - 220) > 130 && Math.hypot(x + 380, z - 44) > 14; };
var near = [[-34, 688, 12], [32, 724, 10], [-30, 742, 9], [42, 664, 12], [-52, 640, 14], [24, 770, 9]];
for (var gi = 0; gi < ng + near.length; gi++) {
var nr = near[gi], gx = nr ? nr[0] : (R() - 0.5) * 1100, gz = nr ? nr[1] : 110 + R() * 1150, gr = nr ? nr[2] : 8 + R() * 16;
if (!clear(gx, gz))
continue;
var add = function (kind, n, rr, smin, smax) { for (var q = 0; q < n; q++) {
var a = R() * 6.283, d = Math.sqrt(R()) * rr, x = gx + Math.cos(a) * d, z = gz + Math.sin(a) * d;
if (!clear(x, z))
continue;
K[kind].push({ x: x, z: z, y: h(x, z), s: smin + R() * (smax - smin), ry: R() * 6.283 });
} };
add("palm", 2 + Math.floor(R() * 5), gr * 0.6, 0.8, 1.35);
add("fern", 5 + Math.floor(R() * 8), gr, 0.8, 1.5);
add("cycad", 1 + Math.floor(R() * 3), gr * 0.8, 0.8, 1.3);
add("bush", 6 + Math.floor(R() * 8), gr * 1.1, 0.6, 1.4);
add("grass", 14 + Math.floor(R() * 16), gr * 1.4, 0.9, 1.6);
if (R() < 0.5)
add("tree", 1 + Math.floor(R() * 2), gr * 0.5, 0.9, 1.3);
if (R() < 0.6)
add("flowers", 6, gr * 1.2, 0.6, 1.0);
if (R() < 0.35)
add("rock", 1 + Math.floor(R() * 3), gr, 0.6, 1.8);
}
for (var mi = 0; mi < (lite ? 6 : 16); mi++) {
var mx2 = (R() - 0.5) * 900, mz2 = 160 + R() * 1000, mr = 14 + R() * 22;
for (var q = 0; q < (lite ? 25 : 60); q++) {
var a = R() * 6.283, d = Math.sqrt(R()) * mr, x = mx2 + Math.cos(a) * d, z = mz2 + Math.sin(a) * d;
if (clear(x, z))
K.grass.push({ x: x, z: z, y: h(x, z), s: 1.1 + R() * 0.8, ry: R() * 6.283 });
}
}
lswPlant(P, "palm", K.palm);
lswPlant(P, "fern", K.fern);
lswPlant(P, "cycad", K.cycad);
lswPlant(P, "bush", K.bush, { col: 0x3E6A2E });
lswPlant(P, "tree", K.tree, { col: 0x5A8A3A });
lswPlant(P, "grass", K.grass, { col: 0xC0B868 });
if (K.flowers.length)
lswPlant(P, "flowers", K.flowers, { col: "#E86A3A" });
lswPlant(P, "rock", K.rock);
for (var fi = 0; fi < (lite ? 4 : 12); fi++) {
var fx = (R() - 0.5) * 700, fz = 200 + R() * 800;
if (!clear(fx, fz))
continue;
var L = [6, 8, 10][fi % 3], lg = lswCyl(P, 0.38, 0.5, L, lswMat("darkbark"), fx, h(fx, fz) + 0.35, fz, 8);
lg.rotation.order = "YZX";
lg.rotation.set(0, R() * 6.283, Math.PI / 2);
lg.position.y = h(fx, fz) + 0.4;
}
var cols = [0x5A7AC8, 0xD8402A, 0xF4F0E8];
[[60, 640], [-90, 560], [150, 820], [-200, 900]].slice(0, lite ? 2 : 4).forEach(function (pp, pi) {
var px = pp[0], pz = pp[1], py = h(px, pz), r0 = 5 + pi * 1.5;
var pd = new THREE.Mesh(new THREE.CircleGeometry(r0, 20), lswWaterM(0x3A5040, 0.9));
pd.rotation.x = -Math.PI / 2;
pd.position.set(px, py + 0.07, pz);
P.add(pd);
lswPlant(P, "reeds", lswScatter(1320 + pi, lite ? 14 : 30, px - r0 - 2, pz - r0 - 2, px + r0 + 2, pz + r0 + 2, function (x, z) { var d = Math.hypot(x - px, z - pz); return d > r0 - 1 && d < r0 + 2.5; }, h, 0.8, 1.2), { keepAll: 1 });
for (var wi = 0; wi < (lite ? 2 : 4); wi++) {
var wd = lswWader(cols[(wi + pi) % 3]), a = R() * 6.283;
wd.position.set(px + Math.cos(a) * (r0 - 0.8), py, pz + Math.sin(a) * (r0 - 0.8));
wd.rotation.y = R() * 6.283;
P.add(wd);
}
});
var tp = lswTapir(1.1);
tp.position.set(-188, h(-188, 894), 894);
P.add(tp);
lswBeastAdd(tp, "tapir", { path: [[-188, 894], [-176, 880], [-196, 870], [-188, 894]], loop: 1, speed: 0.4, ground: h });
var am = lswArmadillo(1.2);
am.position.set(30, h(30, 620), 620);
P.add(am);
lswBeastAdd(am, "armadillo", { path: [[30, 620], [44, 600], [24, 580], [30, 620]], loop: 1, speed: 0.7, ground: h });
lswButterflies(P, lite ? 6 : 14, 8, 712, h(8, 712) + 1.0, 6, 0x2A6AE8);
if (!lite)
lswButterflies(P, 10, -20, 660, h(-20, 660) + 1.0, 5, 0xE8A02A);
})();
lswPlant(P, "reeds", lswScatter(1107, lite ? 120 : 320, 520, 120, 880, 320, function (x, z) { return Math.hypot((x - 700) / 1.6, z - 220) < 118; }, h, 0.9, 1.4));
lswPlant(P, "mauritia", lswScatter(1108, lite ? 10 : 26, 560, 140, 840, 300, null, h, 0.8, 1.2));
for (var i = 0; i < (lite ? 8 : 20); i++) {
var R = wRand(1110 + i), px = 560 + R() * 280, pz = 150 + R() * 140;
var pd = new THREE.Mesh(new THREE.CircleGeometry(2 + R() * 4, 14), lswWaterM(0x3A4A30, 0.85));
pd.rotation.x = -Math.PI / 2;
pd.position.set(px, h(px, pz) + 0.08, pz);
P.add(pd);
}
for (i = 0; i < (lite ? 4 : 9); i++) {
var R2 = wRand(1130 + i), sx = 600 + R2() * 200, sz = 170 + R2() * 100, sn = lswSnake(2.0 + R2() * 1.2, 0x6A6A40);
sn.position.set(sx, h(sx, sz) + 0.05, sz);
sn.rotation.y = R2() * 6;
P.add(sn);
}
lswSpot(700, 220, 40, "The edge of the Jaracaca Swamp", "look", function () { lswTale("🐍 The Jaracaca Swamp", ["jaracaca"], ["The book's travellers named it after the deadliest snake of South America; they ran from it."], "IX"); });
var cy = h(40, 60);
lswTent(P, 30, cy, 62, 0.2);
lswTent(P, 44, cy, 66, -0.3, 0xC8BC9A);
lswTent(P, 54, h(54, 44), 44, 0.6, 0xB8AC8A);
lswFire(P, 38, cy, 54, 1.0);
for (i = 0; i < 6; i++)
lswBox(P, 0.7, 0.5, 0.6, lswMat("oak"), 22 + i * 1.0, cy, 52 + (i % 2) * 0.8);
lswSpot(40, 60, 6, "The camp under the pinnacle", "look about", function () { lswTale("⛺ The camp", ["thousandft", "spire"], [], "IX"); });
lswSpot(LSW_PIN.x, LSW_PIN.z + LSW_PIN.r * 1.5 + 2, 4, "The foot of the pinnacle", "look up", function () { lswTale("🗼 The pinnacle", ["perched", "spire"], [], "IX"); });
lswSpot(LSW_PIN.x + 2, LSW_PIN.z + LSW_PIN.r * 1.5 + 2, 2.2, "The chimney up the pinnacle", "climb", function () { lswClimb(0); });
var mx = -380, mz = 44, my = h(mx, mz);
for (i = 0; i < 9; i++) {
var R3 = wRand(1150 + i), tn = lswCyl(P, 0.06, 0.06, 0.12, lswShine(0x8A8478, 0.4, 0.6), mx + (R3() - 0.5) * 4, my, mz + (R3() - 0.5) * 3, 8);
tn.rotation.z = R3() * 1.5;
}
var paper = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.35), lswLam(0xD8D0B8, { ds: 1 }));
paper.rotation.x = -Math.PI / 2;
paper.position.set(mx + 1, my + 0.03, mz - 0.5);
P.add(paper);
var post = new THREE.Group();
post.position.set(mx + 3, my, mz + 2);
P.add(post);
lswCyl(post, 0.06, 0.07, 1.8, lswMat("darkbark"), 0, 0, 0, 6);
var arm = lswBox(post, 1.1, 0.12, 0.08, lswMat("darkbark"), 0.5, 1.5, 0);
post.rotation.y = -Math.PI / 2;
lswSpot(mx, mz, 6, "Maple White's old camp", "search it", function () { lswTale("🥫 An old encampment", ["tins", "democrat"], [], "IX"); });
lswSpot(mx + 3, mz + 2, 3, "The sign-post", "look at it", function () { lswTale("🪧 A sign-post", ["signpost"], [], "IX"); });
var cx = -560, cz = 26, bones = new THREE.Group();
bones.position.set(cx, h(cx, cz) + 0.1, cz);
P.add(bones);
for (i = 0; i < 9; i++) {
var bn = lswBox(bones, 0.04, 0.04, 0.35 + Math.random() * 0.3, lswLam(0xE8E0CC), (Math.random() - 0.5) * 0.8, 0.02, (Math.random() - 0.5) * 0.8, Math.random() * 3);
}
var skull = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), lswLam(0xE8E0CC));
skull.position.set(0.3, 0.1, -0.2);
bones.add(skull);
lswPlant(P, "bamboo", lswScatter(1160, 30, cx - 10, cz - 10, cx + 10, cz + 10, function (x, z) { return Math.hypot(x - cx, z - cz) > 1.5; }, h, 1.4, 1.8), { keepAll: 1 });
lswSpot(cx, cz, 4, "Something in the high bamboo", "look", function () { lswTale("💀 In the bamboo", ["hudson", "jcase", "colver"], ["The book gives the plain truth: a man fell, or was thrown, from the cliff above. Nothing here is shown but bones and the things he carried."], "IX"); });
[-700, -820, -940, -1060].forEach(function (ax, k) {
var ay = h(ax, 6);
lswBox(P, 2.4, 2.0, 1.4, lswMat("rock"), ax, ay, 5.4, 0, true);
var ar = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.5), lswLam(0xFFFFFF, { map: lswCanvas("chalkArrow", 128, 64, function (c, W, H) { c.clearRect(0, 0, W, H); c.strokeStyle = "#F4F0F8"; c.lineWidth = 7; c.beginPath(); c.moveTo(W - 10, H / 2); c.lineTo(14, H / 2); c.moveTo(34, H / 2 - 18); c.lineTo(12, H / 2); c.lineTo(34, H / 2 + 18); c.stroke(); }), mapk: "chalkArrow", cut: 0.3 }));
ar.position.set(ax, ay + 1.2, 6.15);
P.add(ar);
lswSpot(ax, 9, 3, "A chalk arrow", "look at it", function () { lswTale("➡️ A chalk arrow", ["chalkarrow", "stump"], [], "IX"); });
});
lswBox(P, 24, LSW_CLIFF_H + 4, 6, lswMat("chocolate"), -1200 - 18, 0, -4);
lswBox(P, 24, LSW_CLIFF_H + 4, 6, lswMat("chocolate"), -1200 + 18, 0, -4);
var cave = new THREE.Mesh(new THREE.CircleGeometry(3, 16, 0, Math.PI), lswLam(0x0A0806));
cave.position.set(-1200, h(-1200, 0), 0.5);
P.add(cave);
for (i = 0; i < 8; i++) {
var rk = new THREE.Mesh(lswGeo("rock", function () { return new THREE.DodecahedronGeometry(1, 1); }), lswMat("rock"));
rk.position.set(-1200 + (i % 4 - 1.5) * 1.4, h(-1200, 0) + 0.6 + (i > 3 ? 1.2 : 0), 1.2);
rk.scale.setScalar(0.9 + Math.random() * 0.5);
P.add(rk);
}
lswSolid(-1200, 1, 6, 3, -10, 20);
lswSpot(-1200, 20, 8, "The mouth of the cleft", "go in", function () { lswTale("🕳️ The cleft", ["cleft", "circle"], [], "IX"); });
lswSpot(-1200, 4, 4, "The cave in the cleft", "go in with the torch", function () { lswTale("🔦 The cave", ["torch", "blocked", "fallenin"], [], "IX"); });
var rift = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 5), lswLam(0x0A0806));
rift.position.set(-160, h(-160, 1) + 2.5, 0.6);
P.add(rift);
lswSpot(-160, 26, 6, "The foot of the cliff, where the rift comes out", "look", function () { lswTale("🌙 The rift", ["moonbg"], [], "XV"); });
var py = lswSnake(9, 0x7A6A3A);
py.position.set(-240, h(-240, 90) + 0.1, 90);
py.scale.setScalar(2.4);
P.add(py);
lswSpot(-240, 90, 8, "A great snake", "look (from a distance)", function () { lswTale("🐍 A python", ["python"], [], "IX"); });
},
function (P) {
var lite = lswLite(), h = LSW_SCN.maple.h;
var ok = function (x, z) { return Math.hypot(x - LSW_LAKE.x, z - LSW_LAKE.z) > LSW_LAKE.r + 14 && Math.hypot(x - 20, z + 90) > 22 && Math.hypot(x + 70, z + 330) > 40 && Math.hypot(x - 220, z + 380) > 64 && Math.hypot(x + 120, z + 520) > 18 && z < LSW_RIM_Z - 6 && z > LSW_ESC_Z + 6 && Math.hypot(x + 560, z + 140) > 70 && Math.hypot(x - 340, z + 1060) > 30 && lswPathD(x, z, LSW_PL_PATH) > 4; };
lswPlant(P, "tree", lswScatter(1201, lite ? 260 : 700, -1500, -1110, 1500, -10, ok, h, 1.0, 1.6), { col: 0x5A8A3A });
lswPlant(P, "conifer", lswScatter(1202, lite ? 80 : 220, -1500, -1110, 1500, -10, ok, h, 1.0, 1.6));
lswPlant(P, "cycad", lswScatter(1203, lite ? 80 : 240, -1500, -1110, 1500, -10, ok, h, 0.8, 1.4));
lswPlant(P, "fern", lswScatter(1204, lite ? 100 : 300, -1500, -1110, 1500, -10, ok, h, 0.8, 1.5));
lswPlant(P, "bamboo", lswScatter(1205, lite ? 40 : 120, -1500, -1110, 1500, -10, ok, h, 1.0, 1.4));
lswPlant(P, "grass", lswScatter(1206, lite ? 300 : 800, -1000, -1100, 1000, -10, function (x, z) { return Math.hypot(x - LSW_LAKE.x, z - LSW_LAKE.z) > LSW_LAKE.r + 2; }, h, 0.8, 1.3));
lswPlant(P, "flowers", lswScatter(1207, lite ? 60 : 200, -800, -1100, 800, -20, ok, h, 0.8, 1.2), { col: "#F8E8F0" });
lswPlant(P, "flowers", lswScatter(1208, lite ? 40 : 140, -800, -1100, 800, -20, ok, h, 0.8, 1.2), { col: "#E8B020" });
lswStrip(P, LSW_PL_PATH, 2.0, h, lswS("earth", 0x8A7058, 3), 0.08);
var fx = 20, fz = -90, fy = h(fx, fz);
var thorn = [];
for (var a = 0; a < 64; a++) {
var t = a / 64 * 6.283;
if (Math.abs(t - Math.PI / 2) < 0.12)
continue;
thorn.push({ x: fx + Math.cos(t) * 11, z: fz + Math.sin(t) * 11, y: h(fx + Math.cos(t) * 11, fz + Math.sin(t) * 11), s: 1.0 + Math.random() * 0.4, ry: Math.random() * 6 });
lswRound(fx + Math.cos(t) * 11, fz + Math.sin(t) * 11, 0.9, fy - 5, fy + 3);
}
lswPlant(P, "bush", thorn, { col: 0x3A4A26, keepAll: 1 });
LSW.gate = lswBox(P, 2.4, 1.8, 0.4, lswMat("darkbark"), fx, h(fx, fz + 11), fz + 11);
LSW.gateS = lswSolid(fx, fz + 11, 2.4, 0.8, fy - 5, fy + 3);
LSW.gateS.off = true;
lswTent(P, fx - 4, fy, fz - 2, 0.3);
lswTent(P, fx + 4, fy, fz - 3, -0.3, 0xC8BC9A);
lswFire(P, fx, fy, fz + 2, 1.0);
for (var i = 0; i < 5; i++)
lswBox(P, 0.7, 0.5, 0.6, lswMat("oak"), fx - 5 + i * 1.1, fy, fz + 6);
lswSpot(fx, fz, 7, "Fort Challenger", "look about", function () { lswTale("🌵 Fort Challenger", ["fortchall", "fortname"], [], "X"); });
var gx = fx + 10, gz = fz - 6, gy = h(gx, gz), gk = new THREE.Group();
gk.position.set(gx, gy, gz);
P.add(gk);
lswCyl(gk, 1.3, 2.2, 38, lswMat("darkbark"), 0, 0, 0, 12);
lswInst(gk, lswGeo("gingkoC", function () { var parts = [], R = wRand(77); for (var b = 0; b < 14; b++) {
var c = new THREE.IcosahedronGeometry(4 + R() * 2.5, 1);
c.translate((R() - 0.5) * 16, 22 + R() * 18, (R() - 0.5) * 16);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), lswM("gingkoM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AB03A, map: lswLeafTex(), alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), [{ x: 0, z: 0, y: 0, s: 1 }], {});
for (i = 0; i < 9; i++) {
lswBox(gk, 0.5, 0.2, 1.6, lswMat("bark"), Math.cos(i * 1.3) * 1.4, 3 + i * 4, Math.sin(i * 1.3) * 1.4, i * 1.3);
}
lswRound(gx, gz, 2.4, gy - 2, gy + 40);
LSW.gingko = { x: gx, z: gz, y: gy };
lswSpot(gx, gz + 3, 4, "The great gingko tree", "climb it", function () { if (typeof lsbClimbGingko === "function")
lsbClimbGingko();
else
lswTale("🌳 The gingko tree", ["gingkotree", "watchtower"], [], "X"); });
var spr = new THREE.Mesh(new THREE.CircleGeometry(2.4, 18), lswWaterM(0x4A8A9A, 0.86));
spr.rotation.x = -Math.PI / 2;
spr.position.set(4, h(4, -84) + 0.06, -84);
P.add(spr);
lswSpot(4, -84, 4, "The spring by the fort", "drink", function () { lswTale("💧 The spring", ["liebow"], [], "X"); });
lswPlant(P, "horse", lswScatter(1210, lite ? 60 : 160, -80, -270, 0, -210, null, h, 1.0, 1.6), { keepAll: 1 });
for (i = 0; i < 14; i++) {
var tx = -60 + i * 3.4, tz = -262 + Math.sin(i) * 1.2, tr = new THREE.Mesh(lswGeo("track3", function () { var s = new THREE.Shape(); s.moveTo(0, -0.3); s.lineTo(-0.5, 0.6); s.lineTo(-0.15, 0.1); s.lineTo(0, 0.75); s.lineTo(0.15, 0.1); s.lineTo(0.5, 0.6); s.lineTo(0, -0.3); var g = new THREE.ShapeGeometry(s); g.rotateX(-Math.PI / 2); return g; }), lswLam(0x3A2E20));
tr.position.set(tx + (i % 2 ? 0.8 : -0.8), h(tx, tz) + 0.05, tz);
tr.rotation.y = -Math.PI / 2;
P.add(tr);
}
lswSpot(-50, -262, 6, "The great three-toed tracks", "look", function () { lswTale("🦶 The tracks", ["mares", "fatherbirds", "threetoed", "wealden"], [], "X"); });
LSW.igs = [];
for (i = 0; i < 5; i++) {
var ig = lswIguanodon(i === 4 ? 0.6 : 0.95 + i * 0.05), R = wRand(1220 + i), ix = -70 + (R() - 0.5) * 40, iz = -330 + (R() - 0.5) * 30;
ig.position.set(ix, h(ix, iz), iz);
ig.rotation.y = R() * 6;
LSW.igs.push(lswBeastAdd(ig, "iguanodon", { mode: i === 4 ? "gambol" : "browse", vis: 1 }));
}
lswPlant(P, "tree", [{ x: -60, z: -345, y: h(-60, -345), s: 1.6 }, { x: -85, z: -318, y: h(-85, -318), s: 1.4 }], { keepAll: 1, col: 0x6A9A3A });
lswSpot(-70, -300, 14, "The glade of the iguanodons", "watch from the bushes", function () { lswTale("🦖 Iguanodons", ["five", "slate", "kangaroos", "sapling"], [], "X"); });
var sx = 220, sz = -380, sy = lswPlateauH(sx, sz);
var bog = new THREE.Mesh(new THREE.CircleGeometry(40, 30), lswWaterM(0x3A3A26, 0.9));
bog.rotation.x = -Math.PI / 2;
bog.position.set(sx, sy + 3, sz);
P.add(bog);
LSW.pteros = [];
for (i = 0; i < (lite ? 10 : 26); i++) {
var R5 = wRand(1240 + i), a2 = R5() * 6.283, rr = 6 + R5() * 30, px = sx + Math.cos(a2) * rr, pz = sz + Math.sin(a2) * rr;
var nest = new THREE.Mesh(lswGeo("nest", function () { return new THREE.TorusGeometry(0.9, 0.35, 5, 10); }), lswLam(0x5A4A30));
nest.rotation.x = Math.PI / 2;
nest.position.set(px, sy + 3.1, pz);
P.add(nest);
var pt = lswPtero(5 + R5() * 2);
pt.position.set(px, sy + 3.6, pz);
pt.rotation.y = R5() * 6;
LSW.pteros.push(lswBeastAdd(pt, "ptero", { mode: "fold", vis: 1 }));
}
for (i = 0; i < (lite ? 3 : 6); i++) {
var pf = lswPtero(6);
LSW.pteros.push(lswBeastAdd(pf, "ptero", { mode: "glide", circle: { x: sx, y: sy + 40 + i * 8, z: sz, r: 40 + i * 14, sp: 0.18 + i * 0.03, a0: i } }));
}
lswPlant(P, "rock", lswScatter(1260, 20, sx - 30, sz + 60, sx + 30, sz + 90, null, h, 1.2, 2.6), { mat: lswMat("rock") });
lswSpot(sx, sz + 80, 10, "The rocks above the pterodactyl swamp", "look over", function () { lswTale("🦇 The rookery", ["rookery", "oldwomen", "greensand"], [], "X"); });
lswSpot(-120, -506, 10, "The asphalt pool", "look", function () { lswTale("⚫ The asphalt pool", ["kettle", "trafalgar"], [], "XII"); });
var pit = new THREE.Mesh(new THREE.CircleGeometry(1.6, 16), lswLam(0x0A0806));
pit.rotation.x = -Math.PI / 2;
pit.position.set(-40, h(-40, -470) + 0.05, -470);
P.add(pit);
var stake = lswCyl(P, 0.06, 0.02, 1.8, lswMat("darkbark"), -40, h(-40, -470) - 1.2, -470, 5);
lswSpot(-40, -470, 4, "The pit", "look down", function () { lswTale("🕳️ The pit", ["trap", "master"], [], "XII"); });
lswBox(P, 4, 2.2, 3, lswMat("lava"), -30, h(-30, -455) - 0.2, -455, 0.4, true);
lswSpot(-30, -450, 3, "The block of lava by the drinking-place", "hide behind it", function () { lswTale("🪨 The block of lava", ["armadillos", "deer"], [], "XII"); });
var arm1 = lswArmadillo(1.4);
arm1.position.set(-64, h(-64, -466), -466);
P.add(arm1);
var arm2 = lswArmadillo(1.2);
arm2.position.set(-56, h(-56, -470), -470);
arm2.rotation.y = 1;
P.add(arm2);
var elk = lswElk(1.2);
elk.position.set(-74, h(-74, -470), -470);
elk.rotation.y = -0.5;
P.add(elk);
LSW.elk = lswBeastAdd(elk, "elk", { mode: "drink", vis: 1 });
var doe = lswElk(1.0, 1);
doe.position.set(-80, h(-80, -474), -474);
doe.rotation.y = 0.3;
P.add(doe);
lswBeastAdd(doe, "elk", { mode: "drink", vis: 1 });
var stg = lswStego(1.0);
stg.position.set(70, h(70, -462), -462);
stg.rotation.y = Math.PI * 0.9;
P.add(stg);
LSW.stego = lswBeastAdd(stg, "stego", { mode: "drink", vis: 1, path: [[70, -462], [40, -470], [-10, -472], [-60, -468], [-90, -440], [-60, -420], [20, -430], [70, -462]], loop: 1, speed: 0.9, ground: h });
LSW.plesios = [];
for (i = 0; i < (lite ? 2 : 4); i++) {
var pl = lswPlesio(1.0 + i * 0.2), ang = i * 1.6;
pl.position.set(LSW_LAKE.x + Math.cos(ang) * 150, 104, LSW_LAKE.z + Math.sin(ang) * 150);
LSW.plesios.push(lswBeastAdd(pl, "plesio", { bob: 104.6, circle: { x: LSW_LAKE.x, y: 104.6, z: LSW_LAKE.z, r: 120 + i * 30, sp: 0.05 + i * 0.01, a0: ang, bob: 0.2 } }));
}
for (i = 0; i < (lite ? 4 : 10); i++) {
var wd = lswWader([0xF8F4F0, 0xE89AB0, 0x8A9AAA][i % 3]), wa = 0.5 + i * 0.5;
wd.position.set(LSW_LAKE.x + Math.cos(wa) * (LSW_LAKE.r - 2), 105.4, LSW_LAKE.z + Math.sin(wa) * (LSW_LAKE.r - 2));
P.add(wd);
}
lswSpot(40, -455, 10, "The south shore of Lake Gladys", "look across the lake", function () { lswTale("🌊 Lake Gladys", ["quicksilver", "swan", "portholes"], [], "XII"); });
lswPlant(P, "bush", lswScatter(1270, 30, -170, -150, -150, -130, function (x, z) { return Math.hypot(x + 160, z + 140) > 3; }, h, 1.2, 1.6), { col: 0x3A5A2A, keepAll: 1 });
lswSpot(-160, -140, 4, "The brushwood hiding-place", "look", function () { lswTale("🌿 The hiding-place", ["open"], [], "XIII"); });
lswApeTown(P);
var tb = lswToadBeast(1.0);
tb.visible = false;
P.add(tb);
LSW.toad = lswBeastAdd(tb, "toad", { mode: "stop" });
var bird = lswTerrorBird(1.1);
bird.position.set(500, h(500, -300), -300);
P.add(bird);
lswBeastAdd(bird, "bird", { path: [[500, -300], [620, -260], [700, -360], [560, -420], [500, -300]], loop: 1, speed: 3.2, ground: h, vis: 1 });
lswButterflies(P, 14, -40, -160, lswPlateauH(-40, -160) + 1, 10, 0x2A6AE8);
if (!lite)
lswButterflies(P, 12, 60, -600, lswPlateauH(60, -600) + 1, 10, 0xE8C020);
},
function (P) {
var lite = lswLite(), h = LSW_SCN.maple.h, ax = -560, az = -160;
var tr = [];
LSW.apeHuts = [];
for (var i = 0; i < (lite ? 14 : 30); i++) {
var R = wRand(1300 + i), a = R() * 6.283, r = 8 + R() * 60, x = ax + Math.cos(a) * r, z = az + Math.sin(a) * r * 0.8;
tr.push({ x: x, z: z, y: h(x, z), s: 1.4 + R() * 0.4 });
var hy = h(x, z) + 8 + R() * 5, hut = new THREE.Group();
hut.position.set(x + 1.6, hy, z);
P.add(hut);
lswBox(hut, 3.6, 0.25, 3.6, lswMat("darkbark"), 0, 0, 0);
var rf = new THREE.Mesh(lswGeo("apeRoof", function () { return new THREE.ConeGeometry(2.4, 2.2, 8, 1, true); }), lswThatchM());
rf.position.y = 2.0;
hut.add(rf);
for (var w = 0; w < 3; w++)
lswBox(hut, 0.12, 1.2, 3.4, lswMat("darkbark"), -1.6 + w * 1.6, 0.25, 0);
}
lswPlant(P, "tree", tr, { keepAll: 1, col: 0x4A7A2E });
LSW.apes = lswCrowd(1340, lite ? 6 : 14, ax - 50, az - 40, ax + 50, az + 40, "lsape", ["One of the ape-men"], "You are one of the ape-men of Maple White Land in Conan Doyle's The Lost World (the book only): you do not speak English; you answer only with a clicking, chattering noise like castanets, and grunts, and gestures. Keep it non-violent in this conversation.", ["(A clicking, chattering noise, like castanets.)"], { hair: 0x9A3A1A, skin: [0x74492E, 0x683F28], scale: [1.12, 0.86, 1.12], wander: 8 });
var king = lswDressed("apeking", "lsape", { sex: "m", beard: "full", hair: 0xA83A1A, skin: 0x74492E });
king.scale.set(1.3, 0.92, 1.3);
king.position.set(ax, h(ax, az + 60), az + 60);
P.add(king);
var K = { g: king, y: king.position.y, o: {} };
LSW.people.push(K);
lswTalk(K, "The king of the ape-men", "You are the king of the ape-men in Conan Doyle's The Lost World (the book only): huge, red-haired, with a great beard; Lord John says you are the image of Professor Challenger, only redder. You speak no English: only clicking, grunts, and great gestures. Keep it non-violent.", "(He looks you over, exactly as the Professor would.)", 4);
lswSpot(ax, az + 100, 14, "The clearing at the cliff's edge", "look", function () { lswTale("🌳 The clearing", ["thousandhuts", "neverforget"], ["The book tells a hard thing here, and it is told plainly but never shown."], "XIII"); });
lswSpot(-450, -110, 8, "The bushes above the clearing", "hide and watch", function () { lswTale("🌿 Above Ape Town", ["rookhuts"], [], "XIII"); });
},
function (P) {
var h = LSW_SCN.maple.h, by = h(0, LSW_ESC_Z + 2);
LSW_CAVE_Y = by + 24;
lswBox(P, 820, 1.0, 6.6, lswMat("rock"), -140, LSW_CAVE_Y - 1, LSW_ESC_Z - 26.7);
lswFloor(-140, LSW_ESC_Z - 26.7, 820, 6.6, LSW_CAVE_Y);
[[60], [-320]].forEach(function (q) { var sx = q[0], z0 = LSW_ESC_Z - 2, z1 = LSW_ESC_Z - 23.5; var y0 = h(sx, z0); for (var s = 0; s < 24; s++) {
var t = s / 24;
lswBox(P, 3, 0.6, 1.0, lswMat("granite"), sx, y0 + t * (LSW_CAVE_Y - y0) - 0.6, z0 + (z1 - z0) * t);
} lswRamp(sx, (z0 + z1) / 2, 3, Math.abs(z1 - z0), y0, LSW_CAVE_Y, Math.PI); });
lswBox(P, 820, 112, 1.2, lswMat("basalt"), -140, by - 2, LSW_ESC_Z - 30.0, 0, true);
LSW_CAVES.forEach(function (C) { lswBox(P, 3.6, 4.6, 0.5, lswLam(0x050403), C.x, LSW_CAVE_Y - 0.2, LSW_ESC_Z - 29.3); });
LSW_CAVES.forEach(function (C) {
var m = new THREE.Mesh(lswGeo("caveMouth", function () { var s = new THREE.Shape(); s.moveTo(-1.6, 0); s.lineTo(-1.6, 2.4); s.quadraticCurveTo(0, 4.2, 1.6, 2.4); s.lineTo(1.6, 0); s.lineTo(-1.6, 0); return new THREE.ShapeGeometry(s); }), lswLam(0x0E0A08));
m.position.set(C.x, LSW_CAVE_Y, LSW_ESC_Z - 29.0);
P.add(m);
if (C.n % 3 === 1) {
lswFire(P, C.x + 2.6, LSW_CAVE_Y, LSW_ESC_Z - 27, 0.5);
}
});
LSW_AT.cave17.x = LSW_CAVES[16].x;
LSW_AT.cave17.y = LSW_CAVE_Y;
LSW_AT.cave17.z = LSW_ESC_Z - 26;
lswSpot(LSW_CAVES[16].x, LSW_ESC_Z - 26.5, 2.6, "The seventeenth cave from the right", "go in with a torch", function () { if (typeof lsbCave === "function")
lsbCave();
else
lswTale("🕯️ The seventeenth cave", ["seventeen"], [], "XV"); }, LSW_CAVE_Y);
lswSpot(60, LSW_ESC_Z - 26, 6, "The caves of the Accala", "look along the cliff", function () { lswTale("🏔️ The caves", ["stairs", "pictures"], [], "XV"); }, LSW_CAVE_Y);
LSW.acc = lswCrowd(1400, lswLite() ? 8 : 18, -260, LSW_ESC_Z + 8, 260, LSW_ESC_Z + 60, "lsacc", ["One of the Accala", "One of the Accala, with a bamboo spear", "An Accala woman"], LSW_ACC, ["(He touches his breast.) \"Accala.\"", "(She smiles, and offers you a fruit.)", "\"Doda!\""], { women: 0.4, hair: 0x0E0E0E, skin: [0xB07A52, 0xA66C48, 0xC28862], scale: [0.94, 0.92, 0.94], wander: 7 });
var mr = lswDressed("maretas", "lsacc", { sex: "m", hair: 0x0E0E0E, skin: 0xB07A52 });
mr.position.set(80, h(80, LSW_ESC_Z + 12), LSW_ESC_Z + 12);
P.add(mr);
var M = { g: mr, y: mr.position.y, o: {} };
LSW.people.push(M);
lswTalk(M, "Maretas", LSW_MARETAS, "\"Maretas.\" (He puts his hand upon his breast.)", 3.6);
var cy = h(150, -1110);
lswTent(P, 146, cy, -1110, 0.3);
lswTent(P, 154, cy, -1106, -0.4, 0xC8BC9A);
lswFire(P, 150, cy, -1102, 0.9);
lswSpot(150, -1110, 6, "The camp below the caves", "look about", function () { lswTale("⛺ The camp by the caves", ["evenings"], [], "XV"); });
lswPlant(P, "palm", lswScatter(1410, 24, 300, -1100, 380, -1020, function (x, z) { return Math.hypot(x - 340, z + 1060) > 6; }, h, 0.9, 1.3), { keepAll: 1 });
var gz = new THREE.Mesh(new THREE.CircleGeometry(4, 18), lswLam(0x6A5A48));
gz.rotation.x = -Math.PI / 2;
gz.position.set(340, h(340, -1060) + 0.05, -1060);
P.add(gz);
lswSmoke(P, 340, h(340, -1060) + 0.3, -1060, 0xD8D8D0, 6);
lswSpot(340, -1060, 6, "Challenger's workshop: the mud geyser", "look", function () { lswTale("💨 The mud geyser", ["hydrogen"], [], "XV"); });
var bp = new THREE.Mesh(new THREE.CircleGeometry(5, 18), lswLam(0x3A5A8A));
bp.rotation.x = -Math.PI / 2;
bp.position.set(-160, h(-160, -1050) + 0.05, -1050);
P.add(bp);
lswSpot(-160, -1050, 7, "A pit of blue clay", "look", function () { lswTale("🔵 The blue clay", ["bluesoil", "muttered"], [], "XV"); });
for (var i = 0; i < 6; i++) {
var R = wRand(1420 + i), gl = new THREE.Mesh(lswGeo("phosph", function () { return new THREE.SphereGeometry(0.4, 8, 6); }), lswGlowM(0xC8FFD8, 0.5));
gl.position.set(520 + (R() - 0.5) * 60, h(520, -760) + 1.5, -760 + (R() - 0.5) * 60);
P.add(gl);
}
lswSpot(520, -760, 20, "The swamp east of the lake", "look", function () { lswTale("✨ The swamp", ["phosph"], [], "XV"); });
},
function (P) {
var T = LSW_TUN, m = lswMat("cave"), fl = lswMat("cave"), torch = [];
function seg(x0, z0, x1, z1) {
var cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, L = Math.hypot(x1 - x0, z1 - z0) + 3, a = Math.atan2(x1 - x0, z1 - z0);
var g = new THREE.Group();
g.position.set(cx, T.y, cz);
g.rotation.y = a;
P.add(g);
lswBox(g, 3.2, 0.2, L, fl, 0, -0.2, 0);
lswBox(g, 0.4, 3.6, L, m, -1.8, 0, 0);
lswBox(g, 0.4, 3.6, L, m, 1.8, 0, 0);
lswBox(g, 3.6, 0.4, L, m, 0, 3.4, 0);
lswFloor(cx, cz, 3.2, L, T.y, { rot: a });
lswSolid(cx + Math.cos(a) * 1.9, cz - Math.sin(a) * 1.9, 0.4, L, T.y - 1, T.y + 4, a);
lswSolid(cx - Math.cos(a) * 1.9, cz + Math.sin(a) * 1.9, 0.4, L, T.y - 1, T.y + 4, a);
}
seg(T.x, T.z, T.x, T.z - 72);
lswBox(P, 4, 4, 0.6, lswMat("cave"), T.x, T.y, T.z - 73.5, 0, true);
seg(T.x, T.z - 12, T.x + 30, T.z - 36);
seg(T.x + 30, T.z - 36, T.x + 34, T.z - 112);
var moon = new THREE.Mesh(new THREE.CircleGeometry(0.9, 20), lswGlowM(0xF4F0D8, 1));
moon.position.set(T.x + 34, T.y + 2.4, T.z - 114);
P.add(moon);
lswSolid(T.x + 34, T.z - 115, 4, 1, T.y - 1, T.y + 4);
lswSpot(T.x + 3, T.z - 14, 3.4, "The fork in the tunnel", "feel along the wall", function () { if (typeof lsbFork === "function")
lsbFork();
else
lswTale("🔀 A fork", ["forked"], [], "XV"); }, T.y);
lswSpot(T.x, T.z - 70, 3, "The end of the passage", "feel the wall", function () { lswTale("🧱 A blank wall", ["culdesac"], [], "XV"); }, T.y);
lswSpot(T.x, T.z - 22, 2.4, "Spent matches on the floor", "look", function () { lswTale("🔥 The matches", [], ["Here is where the torches were lit: the fork must be nearer the mouth than this."], "XV"); }, T.y);
lswSpot(T.x + 34, T.z - 110, 3, "The rift, and the moon", "look out", function () { lswTale("🌙 The moon", ["moonbg"], [], "XV"); }, T.y);
LSW.tunTorch = [];
for (var i = 0; i < 5; i++) {
var tg = lswFire(P, i < 3 ? T.x + 1.4 : T.x + 31.4, T.y + 1.6, i < 3 ? T.z - 30 - i * 14 : T.z - 50 - (i - 3) * 30, 0.25);
tg.visible = false;
LSW.tunTorch.push(tg);
}
},
function (x, z, feet) {
if (LSW.moving || LSW.ride)
return true;
var S = lswSc(), D = LSW_SCN[LSW.sc];
if (!D)
return false;
if (LSW.sc === "river") {
var B = LSW.deckBox;
if (!B || Math.abs(x) > B.hw * (z < -5 ? Math.max(0.35, 1 - (-5 - z) / 8) : 1) || z < B.z0 || z > B.z1)
return true;
return lswSolidAt(x, z, feet);
}
if (lswInTunnel(x)) {
if (lswFloorAt(x, z, feet) === null)
return true;
return lswSolidAt(x, z, feet);
}
if (Math.abs(x) > S.bound || z > S.bound || z < -S.bound - (LSW.sc === "maple" ? 0 : 0))
return true;
if (lswSolidAt(x, z, feet))
return true;
var fl = lswFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = lswLand(x, z);
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
LSW.t += dt;
if (!LSW.built || !LSW.scG)
return;
var S = lswSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72;
if (LSW.ride)
lswRideTick(dt);
LSW.et = (LSW.et || 0) + dt;
if (LSW.et > 1) {
LSW.et = 0;
worldEnv(lswEnvNow());
}
var flow = LSW.t * 0.03;
LSW.water.forEach(function (m) { var mp = m.material && m.material.map; if (!mp)
return; if (m.userData.fast)
mp.offset.y = LSW.t * 0.5;
else
mp.offset.set(flow * 0.3, flow * (LSW.sc === "river" ? 6 : 1)); });
LSW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (LSW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6 + (F.userData.drift ? 0 : 0), u * 7, (F.userData.drift ? u * 9 : 0)); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire")
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.8 + Math.abs(Math.sin(LSW.t * 9 + i * 2)) * 0.5; f.rotation.y = LSW.t * 2 + i; }), F.userData.light && (F.userData.light.intensity = 1.0 + Math.sin(LSW.t * 1.6) * 0.12);
else if (k === "fish")
F.children.forEach(function (f) { var a = LSW.t * 0.8 + f.userData.ph; f.position.set(Math.cos(a) * (2 + f.userData.ph % 4), 0, Math.sin(a * 1.3) * (2 + f.userData.ph % 3)); f.rotation.y = -a; });
});
if (LSW.sc === "river" && LSW.banks) {
var sp = (LSW.steer && LSW.steer.sp != null ? LSW.steer.sp : 7) * dt;
LSW.banks.forEach(function (B) { B.position.z += sp; if (B.position.z > 900)
B.position.z -= 2400; });
if (LSW.esm) {
LSW.esm.position.y = Math.sin(LSW.t * 0.8) * 0.04;
LSW.esm.rotation.z = Math.sin(LSW.t * 0.6) * 0.01;
if (LSW.esm.userData.flag)
LSW.esm.userData.flag.rotation.y = Math.sin(LSW.t * 3) * 0.25;
}
}
if (LSW.clock)
lswClockSet();
lswBeastsTick(dt, L);
LSW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 120)
wWander(P.g, dt, function (x, z) { return lswGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof lsbTick === "function")
try {
lsbTick(dt, L);
}
catch (e) {
if (!LSW.e1) {
LSW.e1 = 1;
if (window.console)
console.warn("[lost world] book", e);
}
}
if (!LSW.bannerBook)
worldBanner("<b>🦕 " + LSW_NAME + "</b> · " + esc(lswPlaceName(L)) + (LSW.night ? " · night" : ""));
LSW.pt = (LSW.pt || 0) + dt;
if (LSW.pt < 0.15)
return;
LSW.pt = 0;
if (LSW.moving || LSW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
LSW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof lsbTalk === "function" && lsbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
LSW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : lswLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof lsbSpot === "function")
lsbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof lsbIdlePrompt === "function")
lsbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = lswAtPt(opt.at) || (typeof lsbStartAt === "function" && lsbStartAt()) || { sc: "maple", x: 0, z: 700, ry: Math.PI };
lswScene(A.sc);
var S = LSW_SC[A.sc], y = A.y != null ? A.y : lswGround(A.x, A.z);
camera.position.set(LSW.base + S.x + A.x, y + 1.72, A.z);
yaw = A.ry != null ? A.ry : Math.PI;
pitch = 0;
LSW.moving = false;
LSW.ride = null;
worldEnv(lswEnvNow());
setStatus("🦕 <b>" + LSW_NAME + ".</b> Arthur Conan Doyle's book (1912), the whole of it from the Amazon to the plateau: Manaos, the river, the forest, the hidden channel, and Maple White Land, where the dinosaurs still live. <b>Press E</b> for the book.");
if (typeof lsbEnter === "function")
try {
lsbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[lost world] enter", e);
}
},
function () {
lswSceneDrop();
for (var k in LSW.mats) {
var m = LSW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in LSW.tex) {
var x = LSW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in LSW_GEO) {
try {
LSW_GEO[g].dispose();
}
catch (e) { }
}
LSW.mats = {};
LSW.tex = {};
LSW_GEO = {};
LSW.built = false;
LSW.G = null;
LSW.lights = 0;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = LSW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = LSW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: LSW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return lsbPos(at.at);
var C = LSB_CH[lsbS().ch], i = lsbS().s, c = C && C.cast ? C.cast.filter(function (d) { return lsbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? lsbPos(c.at) : null;
}
if (at.spot) {
var Sp = LSW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: LSW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return lsbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || LSW.sc, x: at.x, z: at.z, y: at.y };
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
if (LSB.beam && LSB.beam.parent === LSW.scG)
return LSB.beam;
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
LSW.scG.add(g);
LSB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return lswLam(c); }, m;
switch (kind) {
case "load":
m = lswBox(g, 0.6, 0.4, 0.5, M(0x8A7A5A), 0, 0, 0);
lswBox(g, 0.64, 0.06, 0.54, M(0x4A3A2A), 0, 0.2, 0);
break;
case "rifle":
m = lswBox(g, 0.08, 0.08, 1.1, M(0x3A2A1A), 0, 0.04, 0);
break;
case "fern":
m = lswBox(g, 0.4, 0.04, 0.3, M(0x5A8A3A), 0, 0.02, 0);
break;
case "thorn":
m = lswBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = lswBox(g, 0.9, 0.12, 0.12, M(0x6A4A2A), 0, 0.06, 0);
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
m = lswBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "note":
m = lswBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "skin":
m = lswBox(g, 0.8, 0.05, 0.6, M(0xA88A60), 0, 0.03, 0);
break;
case "cane":
m = lswBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
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
if (!P || !LSW.scG || P.sc !== LSW.sc)
return null;
var g = lsbItemMesh(kind), y = P.y != null ? P.y : lswGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
LSW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = lswSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (LSB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = LSW.spots.indexOf(I.S); if (j >= 0)
LSW.spots.splice(j, 1); LSB.items = LSB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.lsb = 1;
LSB.items.push(I);
return I;
},
function (k) {
if (LSB.tuneKey === k)
return;
LSB.tuneKey = k;
var old = LSB.tune;
LSB.tune = null;
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
if (!k || !LSB_TUNES[k])
return;
try {
var A = new Audio(LSB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
LSB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (LSB.tune !== A) {
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
if (LSB.text)
return fn(LSB.text);
if (LSB.textWait) {
LSB.textWait.push(fn);
return;
}
LSB.textWait = [fn];
var done = function (B) { LSB.text = B; var w = LSB.textWait; LSB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/lost-world/plateau.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
lsbText(function (B) {
var C = LSB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3>" + LSB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(lsbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); LSB.readOpen = 0; LSB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = lsbS(), C = LSB_CH[S.ch];
if (!C)
return;
LSB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
LSB.readAsk = 0;
LSB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : "The Lost World") + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? lsbOpening(T).map(lsbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); LSB.readOpen = 0; lsbStepDone(); }, all: function () { lsbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Conan Doyle's own words, all of it");
b += lsbKeeperBtns(fns);
worldCard(b, fns);
};
lsbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
LSB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); lsbJump(i); }; });
return b + "</div>";
},
function () {
var S = lsbS(), C = LSB_CH[S.ch] || {}, st = C.state || {};
LSW.night = !!(st.night && !(st.nightUntil != null && S.s >= st.nightUntil) && !(st.nightFrom != null && S.s < st.nightFrom));
if (typeof lswBridge === "function")
lswBridge(lsbStV(st.bridge) || 0);
LSW.ropeUp = !!lsbStV(st.rope);
if (LSW.rope)
LSW.rope.visible = LSW.ropeUp;
if (LSW.gateS)
LSW.gateS.off = !lsbStV(st.gateShut);
lswDrums(!!st.drums && LSW.sc === "forest" && lsbS().s >= (st.drumsFrom || 0));
worldEnv(lswEnvNow());
},
function (place) {
var S = lsbS(), C = LSB_CH[S.ch];
if (!C)
return;
lsbItemsClear();
lsbCastClear();
LSB.hold = 0;
var go = function () { lsbWorldState(); lsbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[lsb] setup", S.ch, e);
} lsbTune(C.tune || null); lsbStepBegin(); };
if (place && C.start) {
var P = lsbPos(C.start);
if (P && WLD.on === LSW_KEY) {
lswGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (LSW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = lsbStep();
lsbItemsClear();
LSB.hold = 0;
LSB.puzOpen = 0;
if (!b)
return;
b._key = lsbKey();
lsbWorldState();
try {
if (b.on)
b.on(lsbS().f);
}
catch (e) {
if (window.console)
console.warn("[lsb] on", e);
}
if (b.k === "read") {
lsbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { LSB.rew[k] = 0; });
if (b.k === "find") {
var Pf = lsbPos(b.at);
if (Pf && Pf.sc === LSW.sc)
lsbItemAdd(b.item, Pf, b.name, b.verb, function () { if (lsbKey() === b._key)
lsbStepDone(); });
}
if (b.k === "gather") {
var P = lsbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(lsbS().ch * 97 + lsbS().s * 13 + 7);
LSB.got = 0;
if (P && P.sc === LSW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = lswGround(Q.x, Q.z, (P.y != null ? P.y : lswLand(P.x, P.z)) + 1);
lsbItemAdd(b.item, Q, b.name, b.verb, function () { if (lsbKey() !== b._key)
return; LSB.got++; try {
if (b.each)
b.each(LSB.got);
}
catch (e) { } if (LSB.got < n) {
lsbSay((b.eachSay || "Got one.") + " " + LSB.got + " of " + n + ".");
return;
} lsbStepDone(); });
}
}
if (b.h)
lsbSay("<b>" + esc(LSB_CH[lsbS().ch].t) + ".</b> " + b.h);
},
function (b) {
LSB.puzOpen = 1;
LSB.puzT = performance.now();
var k = lsbKey(), fns = {}, h = LSB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
lsbSay(b.yes);
if (lsbKey() === k)
lsbStepDone();
return;
}
lsbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (lsbKey() === k)
LSB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = lsbS(), C = LSB_CH[S.ch], b = lsbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[lsb] done", e);
}
if (b.say)
lsbSay(b.say);
S.s++;
if (window.LSB_LOG)
LSB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= LSB_CH.length - 1) {
S.done = 1;
S.s = 0;
lsbSave();
lsbItemsClear();
lsbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
lsbSave();
var nx = LSB_CH[S.ch];
setTimeout(function () { try {
lsbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[lsb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
lsbSave();
lsbStepBegin();
},
function () {
lsbTune("largo");
var S = lsbS();
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>" + esc(LSW_Q.greatwonders || "") + "</p><p style='font-size:12px;opacity:.75'>Arthur Conan Doyle, The Lost World (1912), chapter XV</p><p>You have gone up the Amazon and through the green tunnel, cut your way through the bamboo, crossed the gulf on a beech tree, watched the iguanodons in their glade, run from the flesh-eater in the moonlight, lived among the Accala, and found the way down by the seventeenth cave. The homecoming, the Queen's Hall and the box with the Devil's chick in it, is the last chapter of Challenger's London, in Darlings' London.</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; lsbSave(); lsbChapterBegin(true); } };
b += worldBtn("again", "Walk it again from the start", "Manaos, on the Rio Negro");
worldCard(b, fns);
},
function (c) {
var C = LSB.cast[c.key || c.k];
if (lsbCastLive(C))
return C;
var P = lsbPos(c.at);
if (!P || P.sc !== LSW.sc)
return null;
var F = LSW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute };
var Pp;
if (F.name && !c.dress)
Pp = lswFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = lswDressed("lsb" + (c.key || c.k), c.dress || "lsmojo", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : lswGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
LSW.scG.add(g);
Pp = { g: g, y: y, o: {} };
LSW.people.push(Pp);
if (c.name && !c.mute)
lswTalk(Pp, c.name, lswPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
LSB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return LSB.cast[c.key || c.k];
},
function () {
var C = LSB_CH[lsbS().ch];
if (!C || !C.cast)
return;
var idx = lsbS().s;
C.cast.forEach(function (c) { var key = c.key || c.k; if (c.from != null && idx < c.from) {
if (LSB.cast[key])
lsbCastHide(key);
return;
} if (c.until != null && idx >= c.until) {
if (LSB.cast[key])
lsbCastHide(key);
return;
} if (!lsbCastLive(LSB.cast[key]))
lsbCastAdd(c); });
},
function () {
if (!LSW.scG)
return;
lsbCastClear();
var S = lsbS(), C = LSB_CH[S.ch];
if (S.started && !S.done && C && C.cast && lsbCastHere(C)) {
lsbCastTick();
return;
}
(LSB_FOLK_AT[LSW.sc] || []).forEach(function (q) { var key = "f_" + q[0]; var Pp = lswFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
LSB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!lsbActive())
return false;
var b = lsbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = lsbKey();
worldPrompt(null);
var next = function () { if (lsbKey() === k)
lsbStepDone(); };
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
worldCard(LSB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
LSB.wt += dt;
if (LSB.wt > 0.5) {
LSB.wt = 0;
if (lsbActive() && lsbCastHere(LSB_CH[lsbS().ch]))
lsbCastTick();
var S0 = lsbS();
S0.seen[LSW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!lsbActive()) {
if (LSB.beam)
LSB.beam.visible = false;
LSW.bannerBook = false;
return;
}
var S = lsbS(), b = lsbStep(), t = LSW.t, feet = camera.position.y - 1.72;
LSB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? lsbPos(b.at) : null, here = P && P.sc === LSW.sc, bm = lsbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + lsbScName(P.sc) + ": press E for the book)";
if (here && !LSW.moving && !LSW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : lswGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = lsbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !LSW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (LSB.readAsk)
break;
if (!LSB.readOpen)
lsbChapterCard();
else {
LSB.readOpen = 0;
lsbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
lsbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
LSB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(LSB.hold, dt);
}
catch (e) { }
if (LSB.hold >= (b.sec || 8)) {
lsbStepDone();
return;
}
}
else
LSB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return LSB.rew[k]; })) {
lsbStepDone();
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
lsbStepDone();
return;
}
break;
}
case "puzzle":
if ((!LSB.puzOpen || performance.now() - (LSB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
lsbPuzzleCard(b);
break;
}
}
var C = LSB_CH[S.ch], prog = b && b.k === "hold" && LSB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - LSB.hold)) + " s)" : b && b.k === "gather" ? " (" + (LSB.got || 0) + " of " + (b.n || 3) + ")" : "";
LSW.bannerBook = true;
worldBanner("🦕 <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = lsbS(), C = LSB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Arthur Conan Doyle · The Lost World (1912), chapters VII to XV</div><h3 style='margin:4px 0'>🦕 Maple White Land</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((lsbStep() || {}).h || "") + "</p>";
var st = lsbStep(), P = st && st.at ? lsbPos(st.at) : null, Cs = lsbPos(C.start);
var to = P && P.sc !== LSW.sc ? P : (!P && Cs && Cs.sc !== LSW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + lsbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); lswGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { lsbPopulate(); lsbStepBegin(); }); };
}
}
else
b += "<p>Ned Malone of the Daily Gazette has come out to South America with Professor Challenger, who says that dinosaurs still live on a plateau in the heart of the Amazon; Professor Summerlee, who says he is a liar; and Lord John Roxton, who has shot everything else. From Manaos, up the great river, through the hidden channel, over the uplands, to the red cliffs and the land on top of them: the whole of the book's journey, in Conan Doyle's own words, to walk and to play.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: Manaos, on the Rio Negro", S.started ? "Back to where you were" : "\"To-morrow we disappear into the unknown\"");
fns.go = function () { worldCard(null); lsbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; lsbSave(); lsbBegin(); };
}
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(LSW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(LSW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = LSW_SCN[k].start; lswGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, lsbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
if (typeof lwbOpen === "function") {
b += worldBtn("london", "🎩 Challenger's London", "The London chapters (I to VI, and the homecoming), in Darlings' London");
fns.london = function () { worldCard(null); lwbOpen(); };
}
b += lsbKeeperBtns(fns);
worldCard(b, fns);
},
function () {
if (LSW.sc !== "river")
return;
var st = LSW.steer = LSW.steer || { n: 0, ok: 0, sp: 7 };
var k = lsbKey();
if (st.n >= LSB_SNAGS.length) {
setStatus("🚢 You have her in mid-stream: nothing ahead but brown water. Well steered.");
return;
}
var S = LSB_SNAGS[st.n], h = LSB_H + "🚢 At the wheel</div><p>" + esc(S[0]) + " ahead, on the " + (S[1] === "port" ? "right" : "left") + "-hand side of the channel.</p><p style='opacity:.8;font-size:13px'>Port is the left, starboard the right. Steer away from it.</p>";
var fns = { p: function () { pick("port"); }, s: function () { pick("starboard"); } };
h += worldBtn("p", "◀ Port (left)", "") + worldBtn("s", "Starboard (right) ▶", "");
function pick(side) {
worldCard(null);
var good = side === S[1];
if (LSW.esm && LSW.esm.userData.wheel)
LSW.esm.userData.wheel.rotation.z += side === "port" ? 0.8 : -0.8;
if (!good) {
setStatus("🚢 ✗ That is straight for it! Hard over, the other way.");
setTimeout(lsbSteer, 1200);
return;
}
st.n++;
st.ok++;
if (typeof playTone === "function")
playTone(660, 0.05);
if (typeof lsbNote === "function")
lsbNote("steer");
if (st.n >= LSB_SNAGS.length) {
setStatus("🚢 <b>Clear water.</b> Lord John nods his approval. (" + st.n + " of " + LSB_SNAGS.length + ")");
if (typeof lsbNote === "function")
lsbNote("steered");
return;
}
setStatus("🚢 Clear of it. (" + st.n + " of " + LSB_SNAGS.length + ") Keep your eyes on the water...");
setTimeout(function () { if (WLD.on === LSW_KEY && LSW.sc === "river")
lsbSteer(); }, window.SBK_FAST ? 30 : 2600);
}
worldCard(h, fns);
},
function () {
var G = LSW.gingko;
if (!G)
return;
if (!LSW.gkFloor || LSW.floors.indexOf(LSW.gkFloor) < 0) {
LSW.gkFloor = lswFloor(G.x, G.z, 0, 0, G.y + 30, { r: 2.6 });
lswSpot(G.x - 1.2, G.z, 1.6, "The way down the gingko", "climb down", lsbDownGingko, G.y + 30);
}
lswGo({ sc: "maple", x: G.x + 1.2, z: G.z, y: G.y + 30, ry: Math.PI }, "🌳 <b>Up the gingko.</b> A long climb from branch to branch, the boughs thinning, the light coming green and then gold through the leaves; and at last you put your head out above the whole forest of Maple White Land.");
if (typeof lsbNote === "function")
lsbNote("gingko");
},
function (on) {
var L = lswLocalSc();
(LSW.pteros || []).forEach(function (B, i) {
if (!on) {
B.o.circle = B.o.circle0 || null;
if (B.o.circle0 === undefined)
B.mode = B.mode0 || B.mode;
return;
}
if (i % 2)
return;
B.o.circle0 = B.o.circle || null;
B.mode0 = B.mode;
B.mode = "flap";
B.o.circle = { x: L.x, y: lswLand(L.x, L.z) + 5 + i % 3, z: L.z, r: 5 + (i % 4) * 2, sp: 1.2 + (i % 3) * 0.3, a0: i, bob: 1.2 };
B.o.chase = 1;
});
LSW.pteroOn = !!on;
},
function (mode, at) {
var T = LSW.toad;
if (!T)
return;
var g = T.g;
if (mode === "off") {
g.visible = false;
T.mode = "stop";
T.o.follow = null;
return;
}
var P = lsbPos(at) || lswLocalSc();
g.visible = true;
g.position.set(P.x, lswLand(P.x, P.z), P.z);
T.mode = mode === "gate" ? "stop" : "move";
T.o.follow = mode === "chase" ? { gap: 16, sp: 0 } : null;
T.o.vis = 0;
},
function (dt) {
var T = LSW.toad;
if (!T || !T.o.follow || !T.g.visible)
return;
var L = lswLocalSc(), g = T.g, dx = L.x - g.position.x, dz = L.z - g.position.z, d = Math.hypot(dx, dz), F = T.o.follow;
var want = d > F.gap ? Math.min(9, (d - F.gap) * 0.9 + 3) : d < F.gap - 3 ? 0.5 : 3;
F.sp += (want - F.sp) * Math.min(1, dt * 2);
var st = F.sp * dt;
if (d > 0.1) {
g.position.x += dx / d * st;
g.position.z += dz / d * st;
g.rotation.y = Math.atan2(dx, dz);
}
g.position.y = lswLand(g.position.x, g.position.z);
var J = g.userData.j;
if (J) {
var hp = Math.max(0, Math.sin(LSW.t * F.sp * 0.9));
J.B.position.y = hp * 2.0;
J.jaw.rotation.x = 0.2 + Math.max(0, Math.sin(LSW.t * 2)) * 0.3;
}
F.d = d;
},
function (stage) {
var x = 340, z = -1060, y = lswLand(x, z);
if (!LSW.balloon) {
var g = new THREE.Group();
g.position.set(x + 2, y, z);
LSW.scG.add(g);
var bag = new THREE.Mesh(new THREE.SphereGeometry(2.2, 18, 14), lswSkinM("leather", 0xD8C8A0));
bag.position.y = 5;
g.add(bag);
for (var i = 0; i < 8; i++) {
var a = i / 8 * 6.283, th = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 3, 4), lswLam(0x6A5A40));
th.position.set(Math.cos(a) * 1.1, 2.6, Math.sin(a) * 1.1);
th.rotation.z = Math.cos(a) * 0.35;
th.rotation.x = -Math.sin(a) * 0.35;
g.add(th);
}
var rock = new THREE.Mesh(lswGeo("rock", function () { return new THREE.DodecahedronGeometry(1, 1); }), lswMat("rock"));
rock.scale.setScalar(0.45);
rock.position.y = 1.0;
g.add(rock);
g.userData.bag = bag;
LSW.balloon = g;
g.userData.live = 1;
}
var B = LSW.balloon;
B.visible = stage > 0;
B.userData.bag.scale.setScalar(stage === 1 ? 0.5 : 1);
B.userData.rise = stage === 3 ? 0.01 : 0;
if (stage < 3) {
B.position.y = y;
}
},
function () { var T = LSW_TUN; lswGo({ sc: "maple", x: T.x, z: T.z - 1, y: T.y, ry: 0 }, "🕯️ <b>Into the seventeenth cave.</b> Pitch dark: you feel your way in along the wall, the torches still unlit."); LSW.torchLit = false; (LSW.tunTorch || []).forEach(function (t) { t.visible = false; }); if (typeof lsbNote === "function")
lsbNote("cave"); },
function (at) { var P = lsbPos(at); if (!P)
return; var pt = lswPtero(7); pt.position.set(P.x - 80, 40, P.z); LSW.scG.add(pt); var B = lswBeastAdd(pt, "ptero", { mode: "flap", path: [[P.x - 80, P.z - 10], [P.x, P.z], [P.x + 90, P.z + 20]], speed: 22, ground: function (x, z) { return lswLand(x, z) + (Math.abs(x - P.x) < 12 ? 4 : 30); }, done: function () { pt.visible = false; } }); }
];
});
