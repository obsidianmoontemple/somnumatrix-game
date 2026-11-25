/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(493, function () {
return [
function (name, mpt, nrm) {
var k = "ph:" + name + ":" + mpt + (nrm ? ":n" : "");
if (GVW.tex[k])
return GVW.tex[k];
var own = name.slice(0, 2) === "b:", nm = own ? name.slice(2) : name, lite = gvwLite();
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
return (GVW.tex[k] = t);
},
function (name, col, mpt, o) {
o = o || {};
var k = "s|" + name + "|" + col + "|" + (mpt || 0) + "|" + JSON.stringify(o);
if (GVW.mats[k])
return GVW.mats[k];
var own = name.slice(0, 2) === "b:", map = gvwPhotoTex(name, mpt || 2), m;
if (gvwLite())
m = new THREE.MeshLambertMaterial({ color: col, map: map });
else {
m = new THREE.MeshPhongMaterial({ color: col, map: map, shininess: o.shine || (own ? 12 : 5), specular: o.spec || (own ? 0x262420 : 0x121210) });
if (own) {
m.normalMap = gvwPhotoTex(name, mpt || 2, true);
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
return (GVW.mats[k] = m);
},
function (col, o) {
o = o || {};
var k = "l" + col + "|" + (o.e || "") + "|" + (o.ds ? 1 : 0) + "|" + (o.op || "") + "|" + (o.mapk || "") + "|" + (o.cut || "");
return gvwM(k, function () {
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
return gvwCanvas("frond" + kind, 128, 256, function (x, W, H) {
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
return gvwCanvas("bamboo", 64, 256, function (x, W, H) {
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
gvwNoise(x, W, H, 200, 0.2, 11, "60,60,20");
});
},
function (kind) {
return gvwCanvas("reed" + kind, 64, 256, function (x, W, H) {
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
return gvwCanvas("tuft", 128, 64, function (x, W, H) {
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
return gvwCanvas("flw" + col, 64, 64, function (x, W, H) {
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
return gvwCanvas("skin" + kind, 256, 256, function (x, W, H) {
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
gvwNoise(x, W, H, 1600, 0.25, 7, "20,14,10");
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
return gvwCanvas("ripple", 256, 256, function (x, W, H) {
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
var g = GVW.sgrid;
if (!g)
return false;
var L = g[Math.floor(x / GVW_CELL) + "," + Math.floor(z / GVW_CELL)];
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
p = dlnPerson("gvw" + seed, o.dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
else
p = wPerson("gvw" + seed, { sex: o.sex, look: o.look || {} });
}
catch (e) {
p = new THREE.Group();
}
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
p.position.set(x, y, z);
if (ry !== undefined)
p.rotation.y = ry;
(o.parent || GVW.scG || GVW.G).add(p);
var P = { g: p, y: y, o: o };
GVW.people.push(P);
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
GVW.inst.push(m);
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
var a0 = pts[q - 1], b0 = pts[q], L0 = Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), n0 = Math.max(1, Math.ceil(L0 / (gvwLite() ? 8 : 4)));
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
var lite = gvwLite(), leaf = gvwLeafTex();
if (lite && list.length > 60 && !o.keepAll)
list = list.filter(function (t, i) { return i % 2 === 0; });
switch (kind) {
case "jtree": {
gvwInst(P, gvwGeo("jtrunk", function () { var g = new THREE.CylinderGeometry(0.9, 1.5, 38, 9, 1); g.translate(0, 19, 0); var b = [g.toNonIndexed()]; for (var i = 0; i < 5; i++) {
var f = new THREE.BoxGeometry(0.25, 4, 2.6);
f.translate(0, 2, 1.6);
f.rotateY(i / 5 * 6.283);
b.push(f.toNonIndexed());
} return gwMerge(b); }), gvwMat("pale"), list, { shadow: !lite });
gvwInst(P, gvwGeo("jcrown", function () { var parts = []; var R = wRand(3); for (var i = 0; i < (lite ? 6 : 10); i++) {
var c = new THREE.IcosahedronGeometry(4.2 + R() * 2, 0);
c.translate((R() - 0.5) * 9, 36 + R() * 6, (R() - 0.5) * 9);
parts.push(c);
} var g = gwMerge(parts.map(function (p) { return p.index ? p.toNonIndexed() : p; })); return g; }), gvwM("jleaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x4A7A34, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "tree": {
gvwInst(P, gvwGeo("ttrunk", function () { var g = new THREE.CylinderGeometry(0.35, 0.6, 9, 7); g.translate(0, 4.5, 0); return g; }), gvwMat("bark"), list, { shadow: !lite });
gvwInst(P, gvwGeo("tcrown", function () { var parts = [], R = wRand(5); for (var i = 0; i < (lite ? 4 : 7); i++) {
var c = new THREE.IcosahedronGeometry(2.4 + R() * 1.4, 1);
c.translate((R() - 0.5) * 4.6, 8.5 + R() * 3, (R() - 0.5) * 4.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), gvwM("tleaf" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x5A8A3A, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "conifer": {
gvwInst(P, gvwGeo("ctrunk", function () { var g = new THREE.CylinderGeometry(0.25, 0.5, 16, 6); g.translate(0, 8, 0); return g; }), gvwMat("darkbark"), list, { shadow: !lite });
gvwInst(P, gvwGeo("ccrown", function () { var parts = []; for (var i = 0; i < 5; i++) {
var c = new THREE.ConeGeometry(3.4 - i * 0.5, 2.2, 8, 1, true);
c.translate(0, 8 + i * 2, 0);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), gvwLam(0x2E4A2A, { ds: 1 }), list, {});
break;
}
case "palm": {
gvwInst(P, gvwGeo("ptrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.34, 12, 7, 6); var pa = g.attributes.position; for (var i = 0; i < pa.count; i++) {
var y = pa.getY(i) + 6;
pa.setX(i, pa.getX(i) + Math.pow(y / 12, 2) * 1.4);
} g.translate(0, 6, 0); return g; }), gvwMat("bark"), list, { shadow: !lite });
gvwInst(P, gvwGeo("pfronds", function () { var g = gvwFronds(lite ? 8 : 12, 5.2, 1.6, 0.5, 12, 1.0); g.translate(1.4, 0, 0); return g; }), gvwLam(0xFFFFFF, { ds: 1, map: gvwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "mauritia": {
gvwInst(P, gvwGeo("mtrunk", function () { var g = new THREE.CylinderGeometry(0.3, 0.38, 15, 7); g.translate(0, 7.5, 0); return g; }), gvwMat("darkbark"), list, {});
gvwInst(P, gvwGeo("mfronds", function () { return gvwFronds(lite ? 8 : 14, 4.4, 2.4, 0.9, 15, 0.7); }), gvwLam(0xFFFFFF, { ds: 1, map: gvwFrondTex("palm"), mapk: "palm", cut: 0.5 }), list, {});
break;
}
case "fern": {
gvwInst(P, gvwGeo("ftrunk", function () { var g = new THREE.CylinderGeometry(0.22, 0.3, 4.2, 7); g.translate(0, 2.1, 0); return g; }), gvwMat("darkbark"), list, {});
gvwInst(P, gvwGeo("ffronds", function () { return gvwFronds(lite ? 8 : 13, 3.2, 1.3, 0.7, 4.2, 0.9); }), gvwLam(0xFFFFFF, { ds: 1, map: gvwFrondTex("fern"), mapk: "fern", cut: 0.5 }), list, {});
break;
}
case "cycad": {
gvwInst(P, gvwGeo("cyt", function () { var g = new THREE.CylinderGeometry(0.4, 0.55, 1.6, 8); g.translate(0, 0.8, 0); return g; }), gvwMat("darkbark"), list, {});
gvwInst(P, gvwGeo("cyf", function () { return gvwFronds(lite ? 8 : 14, 2.2, 0.8, 0.2, 1.6, 0.75); }), gvwLam(0xFFFFFF, { ds: 1, map: gvwFrondTex("cycad"), mapk: "cycad", cut: 0.5 }), list, {});
break;
}
case "bamboo": {
gvwInst(P, gvwGeo("bam", function () { var parts = [], R = wRand(11); for (var i = 0; i < (lite ? 5 : 9); i++) {
var h = 6 + R() * 2.5, c = new THREE.CylinderGeometry(0.07, 0.09, h, 5);
c.translate((R() - 0.5) * 1.4, h / 2, (R() - 0.5) * 1.4);
c.rotateZ((R() - 0.5) * 0.12);
parts.push(c.toNonIndexed());
} return gwMerge(parts); }), gvwM("bamM", function () { var m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: gvwBambooTex() }); m.userData.noPhoto = 1; return m; }), list, {});
gvwInst(P, gvwGeo("bamL", function () { return gvwCards(3, 2.6, 2.2, 5.4); }), gvwM("bamLeaf", function () { var m = new THREE.MeshLambertMaterial({ color: 0x8AA040, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "reeds":
case "horse": {
gvwInst(P, gvwGeo("reed" + kind, function () { return gvwCards(3, 1.8, kind === "horse" ? 3.2 : 2.2, 0); }), gvwLam(0xFFFFFF, { ds: 1, map: gvwReedTex(kind), mapk: "reed" + kind, cut: 0.45 }), list, {});
break;
}
case "grass": {
gvwInst(P, gvwGeo("tuft", function () { return gvwCards(2, 1.6, 0.7, 0); }), gvwLam(o.col || 0xFFFFFF, { ds: 1, map: gvwGrassTex(), mapk: "tuft", cut: 0.4 }), list, {});
break;
}
case "flowers": {
var c = o.col || "#F4F0E0";
gvwInst(P, gvwGeo("flw", function () { return gvwCards(2, 0.9, 0.7, 0); }), gvwLam(0xFFFFFF, { ds: 1, map: gvwFlowerTex(c), mapk: "flw" + c, cut: 0.4 }), list, {});
break;
}
case "bush": {
gvwInst(P, gvwGeo("bush", function () { var parts = [], R = wRand(21); for (var i = 0; i < 4; i++) {
var c = new THREE.IcosahedronGeometry(0.9 + R() * 0.5, 1);
c.translate((R() - 0.5) * 1.6, 0.8 + R() * 0.5, (R() - 0.5) * 1.6);
parts.push(c.index ? c.toNonIndexed() : c);
} return gwMerge(parts); }), gvwM("bushM" + (o.col || ""), function () { var m = new THREE.MeshLambertMaterial({ color: o.col || 0x3E6A2E, map: leaf, alphaTest: 0.4, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }), list, {});
break;
}
case "rock": {
gvwInst(P, gvwGeo("rock", function () { var g = new THREE.DodecahedronGeometry(1, 1); var pa = g.attributes.position, R = wRand(9); for (var i = 0; i < pa.count; i++) {
var hx = pa.getX(i), hy = pa.getY(i), hz = pa.getZ(i), q = function (s) { var v = Math.sin(Math.round(hx * 1e3) * 12.99 + Math.round(hy * 1e3) * 78.23 + Math.round(hz * 1e3) * 37.72 + s) * 43758.55; return v - Math.floor(v); };
pa.setXYZ(i, hx * (0.8 + q(1) * 0.4), hy * (0.55 + q(2) * 0.3), hz * (0.8 + q(3) * 0.4));
} g.computeVertexNormals(); return g; }), o.mat || gvwMat("rock"), list, {});
break;
}
case "cactus": {
gvwInst(P, gvwGeo("cact", function () { var parts = []; var a = new THREE.CylinderGeometry(0.28, 0.32, 3.2, 8); a.translate(0, 1.6, 0); parts.push(a.toNonIndexed()); [[-1, 1.4], [1, 2.0]].forEach(function (q) { var b = new THREE.CylinderGeometry(0.18, 0.2, 1.2, 7); b.translate(q[0] * 0.55, q[1], 0); parts.push(b.toNonIndexed()); var c = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 7); c.rotateZ(Math.PI / 2); c.translate(q[0] * 0.3, q[1] - 0.5, 0); parts.push(c.toNonIndexed()); }); return gwMerge(parts); }), gvwLam(0x4A7A3A), list, {});
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
function (kind, col) { return gvwM("skinM" + kind + (col || ""), function () { var t = gvwSkinTex(kind); t.repeat.set(2, 2); var m = gvwLite() ? new THREE.MeshLambertMaterial({ color: col || 0xFFFFFF, map: t }) : new THREE.MeshPhongMaterial({ color: col || 0xFFFFFF, map: t, shininess: kind === "toad" || kind === "plesio" ? 50 : 18, specular: kind === "toad" ? 0x5A6A7A : 0x2A2A2A }); m.userData.noPhoto = 1; return m; }); },
function (P, mat, x, y, z, len, thick, o) {
o = o || {};
var hip = gvwPiv(P, x, y, z), k = o.knee || 0.45;
hip.add(new THREE.Mesh(gvwTaper([[0, 0, 0], [0, -len * k * 0.5, len * 0.06 * (o.bend || 1)], [0, -len * k, len * 0.12 * (o.bend || 1)]], [thick, thick * 0.8, thick * 0.6], 6, 7), mat));
var knee = gvwPiv(hip, 0, -len * k, len * 0.12 * (o.bend || 1));
knee.add(new THREE.Mesh(gvwTaper([[0, 0, 0], [0, -len * (1 - k) * 0.5, -len * 0.05 * (o.bend || 1)], [0, -len * (1 - k), 0]], [thick * 0.6, thick * 0.48, thick * 0.36], 6, 7), mat));
if (o.toes)
for (var t = -1; t <= 1; t++) {
var toe = new THREE.Mesh(new THREE.ConeGeometry(thick * 0.18, thick * 1.3, 5), mat);
toe.rotation.x = Math.PI / 2;
toe.rotation.y = t * 0.4;
toe.position.set(t * thick * 0.25, -len * (1 - k) + thick * 0.1, thick * 0.6);
knee.add(toe);
}
else
gvwEll(knee, mat, thick * 0.55, thick * 0.25, thick * 0.6, 0, -len * (1 - k) + thick * 0.15, thick * 0.15, 8);
hip.userData.knee = knee;
return hip;
},
function (w, h, d) {
var k = "bx" + w.toFixed(2) + "|" + h.toFixed(2) + "|" + d.toFixed(2);
return gvwGeo(k, function () {
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
var t = gvwCanvas("sign:" + text + (o.bg || ""), 512, Math.round(512 * h / w), function (c, W, H) {
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
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), gvwLam(0xFFFFFF, { map: t, mapk: "sign:" + text + (o.bg || ""), ds: 1 }));
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
var wall = o.wall || gvwS("b:stucco", o.col || 0xF0E2C8, 3), trim = gvwLam(0xFAF6EE), sh = gvwLam(o.shut || 0x3A6A4A), glass = gvwShine(0x1A2228, 0.2, 0.3);
gvwBox(g, w, h, d, wall, 0, 0, 0);
gvwBox(g, w + 0.3, 0.35, d + 0.3, trim, 0, h - 0.35, 0);
gvwBox(g, w + 0.12, 0.5, d + 0.12, gvwMat("granite"), 0, 0, 0);
var rf = new THREE.Mesh(gvwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || gvwMat("terracotta"));
rf.scale.set(w + 0.9, o.rh || h * 0.32, d + 0.9);
rf.position.y = h;
g.add(rf);
var n = Math.max(1, Math.floor(w / 3.2)), floors = Math.max(1, Math.round(h / 4));
for (var f = 0; f < floors; f++)
for (var i = 0; i < n; i++) {
var wx = -w / 2 + (i + 0.5) * w / n, wy = 1.0 + f * (h / floors) + (f ? 0.3 : 0);
if (f === 0 && i === Math.floor(n / 2) && !o.noDoor) {
gvwBox(g, 1.3, 2.6, 0.12, gvwMat("oak"), wx, 0, d / 2 + 0.02);
gvwBox(g, 1.6, 0.25, 0.18, trim, wx, 2.6, d / 2 + 0.05);
continue;
}
[d / 2 + 0.03, -d / 2 - 0.03].forEach(function (zz, k) {
var fr = gvwBox(g, 1.2, 2.2, 0.08, trim, wx, wy, zz);
var gl = gvwBox(g, 0.95, 1.95, 0.06, glass, wx, wy + 0.12, zz + (k ? -0.03 : 0.03));
if (!gvwLite())
[-1, 1].forEach(function (s) { gvwBox(g, 0.5, 2.1, 0.05, sh, wx + s * 0.9, wy + 0.05, zz + (k ? -0.06 : 0.06)); });
});
if (f > 0 && o.balcony) {
gvwBox(g, 1.8, 0.12, 0.9, trim, wx, wy - 0.15, d / 2 + 0.45);
for (var b = 0; b < 6; b++)
gvwBox(g, 0.05, 0.9, 0.05, gvwLam(0x1A1A1A), wx - 0.8 + b * 0.32, wy - 0.05, d / 2 + 0.86);
gvwBox(g, 1.8, 0.05, 0.05, gvwLam(0x1A1A1A), wx, wy + 0.85, d / 2 + 0.86);
}
}
gvwSolid(x, z, w, d, (o.y || 0) - 1, (o.y || 0) + h + 4, o.ry || 0);
return g;
},
function () {
if (GVW.scG) {
if (GVW.scG.parent)
GVW.scG.parent.remove(GVW.scG);
GVW.scG.traverse(function (o) { if (o.geometry && !(o.geometry.userData && o.geometry.userData.shared))
try {
o.geometry.dispose();
}
catch (e) { } });
}
GVW.scG = null;
GVW.solids = [];
GVW.sgrid = null;
GVW.floors = [];
GVW.spots = [];
GVW.talk = [];
GVW.people = [];
GVW.beasts = [];
GVW.fx = [];
GVW.water = [];
GVW.inst = [];
GVW.hgt = null;
GVW.scBuilt = null;
if (typeof gvbSceneDrop === "function")
try {
gvbSceneDrop();
}
catch (e) { }
},
function (k) {
if (GVW.scBuilt === k && GVW.scG)
return;
gvwSceneDrop();
var D = GVW_SCN[k], S = GVW_SC[k];
if (!D || !S || !GVW.G)
return;
GVW.sc = k;
GVW.scG = new THREE.Group();
GVW.scG.position.x = S.x;
GVW.G.add(GVW.scG);
GVW.hgt = D.h || function () { return 0; };
try {
D.build(GVW.scG);
}
catch (e) {
if (window.console)
console.warn("[time machine] scene", k, e);
}
GVW.scBuilt = k;
if (typeof gwBake === "function" && D.bake !== false) {
try {
GVW.scG.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep && !c.userData.limbs && !c.userData.live)
try {
gwBake(c);
}
catch (e) { } });
}
catch (e) { }
}
},
function (at, msg, after) {
var A = gvwAtPt(at);
if (!A)
return;
var v = gvwVeil();
v.style.opacity = "1";
worldCard(null);
worldPrompt(null);
GVW.moving = true;
setTimeout(function () {
if (WLD.on !== GVW_KEY) {
v.style.opacity = "0";
GVW.moving = false;
return;
}
gvwScene(A.sc);
var S = GVW_SC[A.sc], y = A.y != null ? A.y : gvwGround(A.x, A.z, A.y != null ? A.y + 1 : 1e4);
camera.position.set(GVW.base + S.x + A.x, y + 1.72, A.z);
if (A.ry != null)
yaw = A.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
worldEnv(gvwEnvNow());
if (msg)
setStatus(msg);
if (after)
try {
after();
}
catch (e) { }
setTimeout(function () { v.style.opacity = "0"; GVW.moving = false; }, window.SBK_FAST ? 20 : 350);
}, window.SBK_FAST ? 20 : 520);
},
function (P, x, y, z, col, n) { var grp = new THREE.Group(); grp.position.set(x, y, z); P.add(grp); for (var i = 0; i < (n || 7); i++) {
var s = new THREE.Mesh(gvwGeo("smk", function () { return new THREE.IcosahedronGeometry(0.5, 1); }), gvwLam(col || 0x6A6A6A, { op: 0.32 }));
s.userData.ph = i / (n || 7);
grp.add(s);
} grp.userData.kind = "smoke"; GVW.fx.push(grp); return grp; },
function (P, x, y, z, s) {
s = s || 1;
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
for (var i = 0; i < 5; i++) {
var l = new THREE.Mesh(gvwGeo("log", function () { var c = new THREE.CylinderGeometry(0.07, 0.08, 1.0, 6); c.rotateZ(Math.PI / 2); return c; }), gvwMat("darkbark"));
l.rotation.y = i / 5 * Math.PI;
l.position.y = 0.08;
l.scale.setScalar(s);
g.add(l);
}
for (i = 0; i < 8; i++) {
var st = new THREE.Mesh(gvwGeo("fstone", function () { return new THREE.DodecahedronGeometry(0.16, 0); }), gvwMat("rock"));
st.position.set(Math.cos(i / 8 * 6.283) * 0.6 * s, 0.08, Math.sin(i / 8 * 6.283) * 0.6 * s);
g.add(st);
}
var fl = [];
for (i = 0; i < 3; i++) {
var f = new THREE.Mesh(gvwGeo("flame", function () { return new THREE.ConeGeometry(0.18, 0.7, 7); }), gvwGlowM([0xFFB040, 0xFF7A20, 0xFFE080][i], 0.85));
f.position.set((i - 1) * 0.12 * s, 0.4 * s, 0);
f.scale.setScalar(s);
g.add(f);
fl.push(f);
}
if (!gvwLite() && typeof THREE.PointLight === "function" && (GVW.lights || 0) < 4) {
var L = new THREE.PointLight(0xFF9A4A, 1.2, 14 * s);
L.position.y = 0.8;
g.add(L);
g.userData.light = L;
GVW.lights = (GVW.lights || 0) + 1;
}
g.userData.kind = "fire";
g.userData.fl = fl;
GVW.fx.push(g);
return g;
},
function (k) {
switch (k) {
case "brick": return gvwS("brick", 0xC07A5E, 1.6);
case "yellowbrick": return gvwS("brick", 0xD8C098, 1.6);
case "ashlar": return gvwS("b:ashlar", 0xE8E0D0, 2.4);
case "stone": return gvwS("stone", 0xD0C8B8, 2.4);
case "slate": return gvwS("b:slate", 0x6A6E78, 2);
case "oak": return gvwS("b:oak", 0x8A5E3A, 1.4);
case "floor": return gvwS("b:oak", 0xA87A50, 1.8);
case "planks": return gvwS("b:planks", 0x9A8060, 2);
case "damask": return gvwS("b:damask", 0x8A3A3A, 1.2);
case "greenpaper": return gvwS("b:damask", 0x4A6A52, 1.2);
case "bluepaper": return gvwS("b:damask", 0x4A5A7A, 1.2);
case "velvet": return gvwS("b:velvet", 0x6A1E22, 0.8);
case "greenvelvet": return gvwS("b:velvet", 0x2E4A34, 0.8);
case "leather": return gvwS("b:velvet", 0x4A2A18, 0.8, { shine: 30 });
case "checker": return gvwS("b:checker", 0xFFFFFF, 1.2, { shine: 40 });
case "marble": return gvwS("b:marble", 0xF4F0EA, 2.4, { shine: 50 });
case "plaster": return gvwS("plaster", 0xF0EAD8, 4);
case "ceiling": return gvwLam(0xEDE6D6);
case "brass": return gvwS("b:brass", 0xE0B050, 1.0, { shine: 90 });
case "nickel": return gvwShine(0xD8DCE0, 0.25, 0.9);
case "iron": return gvwS("b:iron", 0x3A3A40, 1.4, { shine: 40 });
case "ivory": return gvwShine(0xF2EAD8, 0.35, 0.05);
case "quartz": return gvwM("quartz", function () { var m = new THREE.MeshPhongMaterial({ color: 0xE8F4FF, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.55, depthWrite: false }); m.userData.noPhoto = 1; return m; });
case "granite": return gvwS("b:limestone", 0x9A948C, 4);
case "terracotta": return gvwS("b:terracotta", 0xC87A5A, 1.6);
case "earth": return gvwS("earth", 0x8A7058, 5, { vc: 1 });
case "grass": return gvwS("grass", 0xC8D8A8, 4, { vc: 1 });
case "lawn": return gvwS("grass", 0xA8C888, 4);
case "gravel": return gvwS("sand", 0xC8B898, 3);
case "paving": return gvwS("paving", 0xC8C0B0, 2.4);
case "road": return gvwS("asphalt", 0x8A8478, 5);
case "white": return gvwS("b:marble", 0xF8F6F2, 3, { shine: 30 });
case "bronze": return gvwS("b:brass", 0x7A6A3A, 1.6, { shine: 60 });
case "verdigris": return gvwS("b:brass", 0x6A9A8A, 1.6, { shine: 30 });
case "greystone": return gvwS("b:limestone", 0xB0ACA4, 4);
case "ruin": return gvwS("b:limestone", 0xA8A498, 4);
case "porcelain": return gvwS("b:darktile", 0x8AC8A8, 2, { shine: 90 });
case "rock": return gvwS("b:strata", 0x8A7A6A, 6);
case "redrock": return gvwS("b:strata", 0x8A3A2A, 8);
case "cave": return gvwS("b:cave", 0x7A746C, 4);
case "moss": return gvwS("b:moss", 0x7A9A5A, 3);
case "bark": return gvwS("bark", 0x8A7A64, 2.5);
case "darkbark": return gvwS("bark", 0x5A4E40, 3);
case "pale": return gvwS("bark", 0xC8BCA8, 3);
case "sand": return gvwS("sand", 0xE0D0B0, 4, { vc: 1 });
case "snow": return gvwS("snow", 0xF4F6FA, 4);
}
return gvwS("earth", 0x8A7058, 5);
},
function (P, x, z, ry, mat, arm) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = gvwMat("oak");
if (arm) {
gvwBox(g, 0.9, 0.42, 0.85, mat, 0, 0, 0);
gvwBox(g, 0.9, 0.8, 0.22, mat, 0, 0.4, 0.34);
[-1, 1].forEach(function (k) { gvwBox(g, 0.18, 0.3, 0.85, mat, k * 0.4, 0.42, 0); });
gvwBox(g, 0.7, 0.1, 0.6, mat, 0, 0.42, -0.04);
}
else {
gvwBox(g, 0.46, 0.06, 0.46, mat, 0, 0.44, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { gvwBox(g, 0.04, 0.44, 0.04, wd, q[0] * 0.2, 0, q[1] * 0.2); });
gvwBox(g, 0.44, 0.56, 0.05, wd, 0, 0.5, 0.21);
}
return g;
},
function (P, x, z, w, h, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = gvwMat("oak"), R = wRand(Math.round(x * 7 + z * 13));
gvwBox(g, w, h, 0.36, wd, 0, 0, 0);
var n = Math.floor(h / 0.42);
for (var i = 0; i < n; i++) {
var y = 0.12 + i * 0.42, bx = -w / 2 + 0.1;
while (bx < w / 2 - 0.12) {
var bw = 0.04 + R() * 0.05, bh = 0.24 + R() * 0.12;
gvwBox(g, bw, bh, 0.24, gvwLam([0x6A1E1E, 0x1E3A2A, 0x2A2A4A, 0x5A3A1E, 0x8A6A3A, 0x3A1A2A][Math.floor(R() * 6)]), bx + bw / 2, y, -0.2);
bx += bw + 0.005;
}
}
return g;
},
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var ag = gvwShine(0xE0E4E8, 0.25, 0.9);
gvwCyl(g, 0.015, 0.02, 0.5, ag, 0, 0, 0, 6);
[0, 1, 2].forEach(function (i) {
var a = i / 3 * 6.283, f = new THREE.Group();
f.position.set(Math.cos(a) * 0.14, 0.5, Math.sin(a) * 0.14);
f.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5);
g.add(f);
var c = new THREE.Mesh(gvwGeo("lilyc", function () { return new THREE.ConeGeometry(0.07, 0.14, 8, 1, true); }), ag);
c.rotation.x = Math.PI;
f.add(c);
var b = new THREE.Mesh(gvwGeo("lilyb", function () { return new THREE.SphereGeometry(0.035, 8, 6); }), gvwGlowM(0xFFF0C0));
b.position.y = -0.04;
f.add(b);
});
return g;
},
function (P, x, z, w, d, col) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), gvwM("rug" + col, function () {
var t = gvwCanvas("rugt" + col, 256, 256, function (c, W, H) {
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
gvwNoise(c, W, H, 1400, 0.18, 5, "0,0,0");
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
h = h || GVW_HOUSE.h1;
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
gvwBox(P, G[1], h - 2.4, 0.3, inner || mat, G[0], 2.4, z);
});
segs.forEach(function (s) { var w = s[1] - s[0]; if (w < 0.05)
return; gvwBox(P, w, h, 0.3, mat, (s[0] + s[1]) / 2, 0, z, 0, true); if (inner) {
gvwBox(P, w, h, 0.02, inner, (s[0] + s[1]) / 2, 0, z + 0.16);
gvwBox(P, w, h, 0.02, inner, (s[0] + s[1]) / 2, 0, z - 0.16);
} });
},
function (P, x, z0, z1, mat, inner, gaps, h) {
h = h || GVW_HOUSE.h1;
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
gvwBox(P, 0.3, h - 2.4, G[1], inner || mat, x, 2.4, G[0]);
});
segs.forEach(function (s) { var d = s[1] - s[0]; if (d < 0.05)
return; gvwBox(P, 0.3, h, d, mat, x, 0, (s[0] + s[1]) / 2, 0, true); });
},
function (P, x0, x1, z0, z1, mat, dx, dz) {
var H = GVW_HOUSE.h1 - 0.02, w = x1 - x0, d = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, wd = gvwMat("oak");
gvwBox(P, w - 0.32, H, 0.02, mat, cx, 0, z0 + 0.17);
gvwBox(P, w - 0.32, H, 0.02, mat, cx, 0, z1 - 0.17);
[x0 + 0.17, x1 - 0.17].forEach(function (x) {
var segs = [[z0 + 0.16, z1 - 0.16]];
if (dx != null && Math.abs(x - dx) < 0.5) {
segs = [[z0 + 0.16, dz - 0.65], [dz + 0.65, z1 - 0.16]];
gvwBox(P, 0.02, H - 2.4, 1.3, mat, x, 2.4, dz);
}
segs.forEach(function (sg) { var L = sg[1] - sg[0]; gvwBox(P, 0.02, H, L, mat, x, 0, (sg[0] + sg[1]) / 2); gvwBox(P, 0.04, 0.06, L, wd, x + (x < cx ? 0.02 : -0.02), 0.95, (sg[0] + sg[1]) / 2); gvwBox(P, 0.04, 0.18, L, wd, x + (x < cx ? 0.02 : -0.02), 0, (sg[0] + sg[1]) / 2); });
});
[z0 + 0.19, z1 - 0.19].forEach(function (z) { gvwBox(P, w - 0.34, 0.06, 0.04, wd, cx, 0.95, z); gvwBox(P, w - 0.34, 0.18, 0.04, wd, cx, 0, z); });
},
function (seed, dress, o) {
o = o || {};
if (typeof dlnPerson !== "function")
return wPerson("gvw" + seed, { sex: o.sex });
var f0 = wPerson, sk = o.skin;
if (sk != null)
wPerson = function (s, oo) { if (oo && oo.look)
oo.look.skin = sk; return f0.apply(this, arguments); };
try {
return dlnPerson("gvw" + seed, dress, { sex: o.sex, beard: o.beard, hair: o.hair, child: o.child });
}
finally {
wPerson = f0;
}
},
function (g) {
var arm = new THREE.Group();
arm.position.set(0.28, 1.32, 0.05);
g.add(arm);
var st = new THREE.Mesh(gvwGeo("flst", function () { var c = new THREE.CylinderGeometry(0.012, 0.016, 0.9, 5); c.translate(0, 0.45, 0); return c; }), gvwLam(0x6A4A2A));
st.rotation.x = 0.2;
arm.add(st);
var bl = new THREE.Mesh(gvwGeo("flbl", function () { return new THREE.SphereGeometry(0.11, 10, 8); }), gvwLam(0xE8DCB8));
bl.position.set(0, 0.98, 0.22);
bl.scale.set(1, 1.25, 1);
arm.add(bl);
g.userData.arm = arm;
GVW.flappers.push(g);
return arm;
},
function (g) { var mats = []; g.traverse(function (o) { if (o.material) {
var m = o.material.clone();
m.transparent = true;
m.opacity = 0.55;
m.depthWrite = false;
if (m.color)
m.color.lerp(new THREE.Color(0xD8DCF0), 0.35);
if (m.emissive)
m.emissive.setHex(0x2A2A4A);
o.material = m;
mats.push(m);
} }); g.userData.mats = mats; GVW.ghosts.push(g); return g; },
function (key, x, z, ry, o) {
var F = GVW_FOLK[key];
o = o || {};
if (!F)
return null;
var y = o.y != null ? o.y : gvwGround(x, z, o.feet != null ? o.feet : 500);
var g = gvwDressed(key + (o.seed || ""), F.dress, { sex: F.sex, beard: F.beard, hair: F.hair, skin: F.skin });
if (F.scale)
g.scale.set(F.scale[0], F.scale[1], F.scale[2]);
if (F.dress === "gvlaputan")
gvwTilt(g, (key.length % 2) / 2 + 0.1);
g.position.set(x, y, z);
if (ry != null)
g.rotation.y = ry;
(o.parent || GVW.scG).add(g);
var P = { g: g, y: y, o: o, key: key };
GVW.people.push(P);
if (!o.mute)
gvwTalk(P, F.name, gvwPersona(F.persona), o.greet || F.greet, o.r || 3.4, o.fn);
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
var d = f ? (o.dressF || o.dress) : o.dress, g = gvwDressed(seed + "c" + i, d, { sex: f ? "f" : "m", beard: !f && R() < 0.4 ? (R() < 0.5 ? "full" : "mustache") : null, hair: o.hair ? o.hair(R) : null, skin: o.skin || null });
if (o.tilt)
gvwTilt(g, R());
var y = gvwGround(x, z, o.feet != null ? o.feet : 500);
g.position.set(x, y, z);
g.rotation.y = R() * 6.283;
GVW.scG.add(g);
var P = { g: g, y: y, o: { wander: o.wander == null ? 10 : o.wander, sp: o.sp || 0.6 } };
GVW.people.push(P);
if (o.names && R() < (o.talkP == null ? 0.6 : o.talkP))
gvwTalk(P, o.names[i % o.names.length], gvwPersona(o.persona || "townsman"), (o.says || ["Good day to you."])[i % (o.says || [1]).length], 2.8);
if (o.flapper && !f && R() < 0.5) {
var fg = gvwDressed(seed + "f" + i, "gvflap", { sex: "m" });
fg.position.set(x + 0.9, y, z + 0.5);
fg.rotation.y = g.rotation.y;
GVW.scG.add(fg);
gvwFlail(fg);
var FP = { g: fg, y: y, o: {} };
GVW.people.push(FP);
if (R() < 0.5)
gvwTalk(FP, "A flapper", gvwPersona("flapper"), "(He gently flaps his master's ear with the bladder.) Pardon, sir: he will attend to you directly.", 2.4);
}
if (o.mark)
gvwSpotMark(g);
if (o.ghost)
gvwGhostly(g);
out.push(P);
}
return out;
},
function (G, sc, i, W, D, H, o) {
o = o || {};
var A = gvwInAt(sc, i), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
var wall = o.wall || gvwMat("plaster"), inner = o.paper || null;
gvwBox(g, W, 0.12, D, o.floor || gvwMat("floor"), 0, -0.12, 0);
gvwBox(g, W, 0.2, D, o.ceil || gvwMat("ceiling"), 0, H, 0);
gvwFloor(A.x, A.z, W, D, GVW_IN_Y);
var h0 = GVW_HOUSE.h1;
GVW_HOUSE.h1 = H;
try {
gvwWallZ(g, -D / 2, -W / 2, W / 2, wall, inner, o.gapN || [], H);
gvwWallZ(g, D / 2, -W / 2, W / 2, wall, inner, [[0, 1.6]], H);
gvwWallX(g, -W / 2, -D / 2, D / 2, wall, inner, [], H);
gvwWallX(g, W / 2, -D / 2, D / 2, wall, inner, [], H);
}
finally {
GVW_HOUSE.h1 = h0;
}
gvwBox(g, 1.6, 2.5, 0.06, gvwGlowM(o.day || 0xF4ECD8, 0.9), 0, 0, D / 2 + 0.2);
for (var k = 0; k < (W > 16 ? 4 : 2); k++) {
var lx = (k % 2 ? 1 : -1) * W * 0.3, lz = (k < 2 ? -1 : 1) * D * 0.25;
var c = gvwCyl(g, 0.05, 0.05, 0.5, gvwMat("brass"), lx, H - 0.5, lz, 6);
var b = new THREE.Mesh(gvwGeo("rlamp", function () { return new THREE.SphereGeometry(0.16, 10, 8); }), gvwGlowM(0xFFE8B8));
b.position.set(lx, H - 0.6, lz);
g.add(b);
}
gvwRoom(sc, A.x - W / 2, A.x + W / 2, A.z - D / 2, A.z + D / 2, o.env || "indoor");
var out = o.out;
gvwSpot(A.x, A.z + D / 2 - 0.8, 1.5, o.doorName || "The door", "go out", function () { var bk = GVW.back && GVW.back[sc + i]; if (bk)
out = bk; if (out)
gvwGo({ sc: sc, x: out.x, z: out.z, ry: out.ry }, null, typeof gvbPopulate === "function" ? gvbPopulate : null); }, GVW_IN_Y);
g.userData.A = A;
g.userData.W = W;
g.userData.D = D;
g.userData.H = H;
return g;
},
function (G, sc, i, x, z, ry, name, W, D, o) {
o = o || {};
var A = gvwInAt(sc, i), y = o.y != null ? o.y : gvwLand(x, z);
var dg = new THREE.Group();
dg.position.set(x, y, z);
dg.rotation.y = ry || 0;
G.add(dg);
gvwBox(dg, 1.7, 2.7, 0.14, o.frame || gvwMat("ashlar"), 0, 0, 0);
gvwBox(dg, 1.25, 2.35, 0.1, gvwLam(o.col || 0x4A2E1A), 0, 0.04, 0.07);
gvwBox(dg, 0.09, 0.09, 0.06, gvwMat("brass"), 0.42, 1.1, 0.15);
gvwBox(dg, 2.0, 0.16, 0.5, o.frame || gvwMat("ashlar"), 0, -0.02, 0.35);
var fx = x + Math.sin(ry || 0) * 1.6, fz = z + Math.cos(ry || 0) * 1.6;
gvwSpot(fx, fz, 1.7, name, "go in", function () { (GVW.back || (GVW.back = {}))[sc + i] = { x: fx, z: fz, ry: (ry || 0) + Math.PI }; GVW.lastBack = { sc: sc, x: fx, z: fz, ry: (ry || 0) + Math.PI }; gvwGo({ sc: sc, x: A.x, z: A.z + D / 2 - 2.2, y: GVW_IN_Y, ry: 0 }, o.msg || ("🚪 <b>" + name.replace(/^The door of /, "") + "</b>"), typeof gvbPopulate === "function" ? gvbPopulate : null); }, y);
return { x: fx, z: fz, ry: (ry || 0) };
},
function (G, sc, i, x, z, ry, name, room, o) {
o = o || {};
var W = room.W || 12, D = room.D || 10, H = room.H || 4;
var dw = o.door != null ? o.door : 0, ca = Math.cos(ry || 0), sa = Math.sin(ry || 0), front = o.front != null ? o.front : (o.d || 10) / 2 + 0.08;
var dx = x + sa * front + ca * dw, dz = z + ca * front - sa * dw;
var d = gvwDoorTo(G, sc, i, dx, dz, ry, name, W, D, o);
var g = gvwRoomBuild(G, sc, i, W, D, H, Object.assign({}, room, { out: { x: d.x, z: d.z, ry: (ry || 0) + Math.PI }, doorName: "The door, out to " + (o.outName || "the street") }));
if (room.fill)
try {
room.fill(g, W, D, H, gvwInAt(sc, i));
}
catch (e) {
if (window.console)
console.warn("[gulliver] room", name, e);
}
return g;
},
function (P, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = gvwMat("oak");
gvwBox(g, 1.6, 0.5, 2.1, wd, 0, 0, 0);
gvwBox(g, 1.5, 0.22, 2.0, gvwLam(0xF2EEE4), 0, 0.5, 0);
gvwBox(g, 1.52, 0.08, 1.3, gvwLam(col || 0x6A2A2A), 0, 0.72, 0.35);
gvwBox(g, 1.2, 0.16, 0.4, gvwLam(0xFAF8F2), 0, 0.72, -0.75);
gvwBox(g, 1.7, 1.4, 0.1, wd, 0, 0, -1.05);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { gvwBox(g, 0.08, 2.2, 0.08, wd, q[0] * 0.78, 0, q[1] * 1.02); });
gvwBox(g, 1.7, 0.3, 2.2, gvwLam(col || 0x6A2A2A), 0, 2.2, 0);
return g;
},
function (P, x, z, s, sky) {
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
s = s || 1;
var wd = gvwMat("oak");
[0, 1, 2].forEach(function (i) { var a = i / 3 * 6.283; var l = gvwBox(g, 0.05 * s, 0.8 * s, 0.05 * s, wd, Math.cos(a) * 0.32 * s, 0, Math.sin(a) * 0.32 * s); l.rotation.z = Math.cos(a) * 0.2; });
var t = gvwCanvas(sky ? "gl:sky" : "gl:earth", 256, 128, function (c, W, H) {
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
var b = new THREE.Mesh(gvwGeo("globe", function () { return new THREE.SphereGeometry(0.36, 24, 16); }), gvwLam(0xFFFFFF, { map: t, mapk: sky ? "gl:sky" : "gl:earth" }));
b.scale.setScalar(s);
b.position.y = 1.05 * s;
b.rotation.z = 0.4;
g.add(b);
var m = new THREE.Mesh(gvwGeo("gmer", function () { return new THREE.TorusGeometry(0.4, 0.015, 6, 32); }), gvwMat("brass"));
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
[-1, 1].forEach(function (k) { var l = gvwBox(g, 0.06, 1.3, 0.06, gvwMat("oak"), k * 0.4, 0, 0); l.rotation.z = k * 0.25; });
gvwBox(g, 0.06, 1.3, 0.06, gvwMat("oak"), 0, 0, -0.45).rotation.x = -0.3;
var t = new THREE.Mesh(gvwGeo("tscope" + len, function () { var c = new THREE.CylinderGeometry(0.07, 0.13, len, 12); c.rotateX(Math.PI / 2); return c; }), gvwMat("brass"));
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
gvwBox(g, 0.5, 1.0, 0.5, gvwMat("oak"), 0, 0, 0);
var q = new THREE.Mesh(gvwGeo("quad", function () { return new THREE.RingGeometry(0.55, 0.7, 16, 1, 0, Math.PI / 2); }), gvwM("quadm", function () { var m = new THREE.MeshPhongMaterial({ color: 0xE0B050, shininess: 80, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
q.position.set(-0.3, 1.05, 0);
g.add(q);
gvwBox(g, 0.04, 0.7, 0.04, gvwMat("brass"), -0.3, 1.0, 0).rotation.z = -0.7;
return g;
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wd = gvwLam(0x2A3A2A), gl = gvwMat("brass");
var sh = new THREE.Shape();
sh.moveTo(-0.5, 0);
sh.lineTo(0.5, 0);
sh.lineTo(0.5, 0.6);
sh.quadraticCurveTo(0.2, 2.0, -0.3, 2.2);
sh.lineTo(-0.5, 2.2);
sh.lineTo(-0.5, 0);
var b = new THREE.Mesh(gvwGeo("harps", function () { var e = new THREE.ExtrudeGeometry(sh, { depth: 0.3, bevelEnabled: false }); e.rotateX(Math.PI / 2); return e; }), wd);
b.position.y = 1.0;
g.add(b);
gvwBox(g, 0.96, 0.04, 0.25, gvwLam(0xF2EEE0), 0, 0.86, -0.08);
[[-0.4, 0.1], [0.4, 0.1], [-0.3, 2.0], [0.3, 0.6]].forEach(function (q) { gvwBox(g, 0.08, 0.7, 0.08, gl, q[0], 0, q[1]); });
return g;
},
function (P, x, y, z, kind) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var wd = gvwLam(0x8A5A2A);
if (kind === "lute") {
gvwEll(g, wd, 0.18, 0.24, 0.08, 0, 0, 0, 12);
gvwBox(g, 0.05, 0.4, 0.03, gvwLam(0x2A1A0A), 0, 0.2, 0);
}
else if (kind === "horn") {
var t = new THREE.Mesh(gvwGeo("horn", function () { return new THREE.TorusGeometry(0.16, 0.025, 6, 18); }), gvwMat("brass"));
g.add(t);
var bl = new THREE.Mesh(gvwGeo("hornb", function () { return new THREE.ConeGeometry(0.1, 0.2, 12, 1, true); }), gvwMat("brass"));
bl.position.set(0.16, 0.08, 0);
g.add(bl);
}
else {
gvwEll(g, wd, 0.14, 0.28, 0.06, 0, 0, 0, 12);
gvwBox(g, 0.04, 0.36, 0.025, gvwLam(0x1A1208), 0, 0.28, 0);
}
return g;
},
function (P, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var meat = gvwLam(0xA8583A), pud = gvwLam(0xD8B070), plate = gvwShine(0xF4F0E8, 0.3, 0.05);
[[-1.2, 0], [0, 0], [1.2, 0], [-0.6, 0.6], [0.6, 0.6], [-0.6, -0.6], [0.6, -0.6]].forEach(function (q, i) {
var p = gvwCyl(g, 0.26, 0.24, 0.03, plate, q[0], 0, q[1], 16);
var m;
if (i === 0) {
m = new THREE.Mesh(gvwGeo("tri", function () { return new THREE.CylinderGeometry(0.16, 0.16, 0.08, 3); }), meat);
}
else if (i === 1) {
m = new THREE.Mesh(gvwGeo("rhomb", function () { return new THREE.CylinderGeometry(0.17, 0.17, 0.08, 4); }), meat);
m.scale.z = 0.6;
}
else if (i === 2) {
m = new THREE.Mesh(gvwGeo("cyc", function () { return new THREE.SphereGeometry(0.17, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2); }), pud);
m.scale.z = 0.5;
}
else if (i === 3) {
m = new THREE.Mesh(gvwGeo("fid", function () { return new THREE.SphereGeometry(0.1, 10, 8); }), gvwLam(0xC88A4A));
m.scale.set(1, 0.6, 1.8);
}
else if (i === 4) {
m = new THREE.Mesh(gvwGeo("flute", function () { var c = new THREE.CylinderGeometry(0.03, 0.03, 0.42, 8); c.rotateZ(Math.PI / 2); return c; }), gvwLam(0x9A4A2A));
}
else if (i === 5) {
m = new THREE.Mesh(gvwGeo("harpv", function () { var c = new THREE.TorusGeometry(0.13, 0.04, 6, 12, Math.PI * 1.3); return c; }), gvwLam(0xD8A080));
m.rotation.x = -Math.PI / 2;
}
else {
m = new THREE.Mesh(gvwGeo("bread", function () { return new THREE.ConeGeometry(0.13, 0.2, 4); }), gvwLam(0xD8A860));
}
m.position.set(q[0], 0.08, q[1]);
g.add(m);
});
return g;
},
function (L, W, Dp, o) {
o = o || {};
var key = "hull" + L + "|" + W + "|" + Dp + "|" + (o.junk ? 1 : 0);
return gvwGeo(key, function () {
var n = 18, m = 10, pos = [], idx = [], uv = [];
for (var i = 0; i <= n; i++) {
var t = i / n, z = (t - 0.5) * L, bow = Math.pow(Math.max(0, (t - 0.62) / 0.38), 1.6), stern = Math.pow(Math.max(0, (0.12 - t) / 0.12), 1.4), wd = W * 0.5 * Math.sqrt(Math.max(0.02, 1 - bow)) * (1 - stern * 0.35);
var sheer = (o.junk ? Math.pow(Math.abs(t - 0.5) * 2, 2) * 1.6 : Math.pow(Math.abs(t - 0.45) * 2, 2) * 0.9);
for (var j = 0; j <= m; j++) {
var a = j / m * Math.PI, x = -Math.cos(a) * wd, y = -Math.sin(a) * Dp * (1 - bow * 0.5) + 0;
if (j === 0 || j === m)
y = sheer;
else
y = y * (1) + sheer * (1 - Math.sin(a));
pos.push(x, y, z);
uv.push(j / m * W, t * L / 2);
}
}
for (i = 0; i < n; i++)
for (j = 0; j < m; j++) {
var a1 = i * (m + 1) + j, b1 = a1 + m + 1;
idx.push(a1, a1 + 1, b1, b1, a1 + 1, b1 + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
return g;
});
},
function (w, h, belly, tri) {
return gvwGeo("sail" + w + "|" + h + "|" + belly + "|" + (tri ? 1 : 0), function () {
var g = new THREE.PlaneGeometry(w, h, 6, 6), pa = g.attributes.position;
for (var i = 0; i < pa.count; i++) {
var x = pa.getX(i), y = pa.getY(i), u = x / w * 2, v = y / h * 2;
if (tri) {
var lim = (0.5 - y / h) * w;
if (x > lim - w / 2)
pa.setX(i, lim - w / 2 + (x - (lim - w / 2)) * 0.0 + Math.min(x, lim - w / 2) - Math.min(x, lim - w / 2));
}
pa.setZ(i, belly * (1 - u * u) * (1 - v * v * 0.6));
}
g.computeVertexNormals();
return g;
});
},
function (P, x, z, ry, kind, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, o.y || 0, z);
g.rotation.y = ry || 0;
g.userData.live = 1;
P.add(g);
g.userData.y0 = o.y || 0;
var L = kind === "sloop" ? 16 : kind === "junk" ? 24 : kind === "ship" ? 36 : 30, W = kind === "sloop" ? 5 : kind === "ship" ? 9 : 7.5, Dp = kind === "sloop" ? 2.6 : kind === "ship" ? 4.4 : 3.6, deck = kind === "sloop" ? 2.2 : kind === "ship" ? 3.0 : 2.6;
var hullM = kind === "junk" ? gvwLam(0x5A3A22) : kind === "pirate" ? gvwLam(0x2A2420) : gvwMat("oak"), deckM = gvwMat("planks"), saM = gvwM("sail" + (o.sail || kind), function () { var m = new THREE.MeshLambertMaterial({ color: o.sail || (kind === "pirate" ? 0x5A5048 : kind === "junk" ? 0xC89A5A : GVW_SAIL), side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; });
var hull = new THREE.Mesh(gvwHullGeo(L, W, Dp, { junk: kind === "junk" }), hullM);
hull.position.y = deck;
g.add(hull);
var hm = new THREE.Mesh(gvwHullGeo(L, W, Dp, { junk: kind === "junk" }), hullM);
hm.scale.set(0.97, 0.97, 0.97);
hm.position.y = deck - 0.02;
hm.material = gvwM("hullin", function () { var m = new THREE.MeshLambertMaterial({ color: 0x6A4A2A, side: THREE.BackSide }); m.userData.noPhoto = 1; return m; });
g.add(hm);
gvwBox(g, W * 0.9, 0.08, L * 0.82, deckM, 0, deck - 0.08, -L * 0.04);
[-1, 1].forEach(function (k) { gvwBox(g, 0.12, 0.9, L * 0.78, hullM, k * W * 0.46, deck, -L * 0.04); for (var i = 0; i < (kind === "ship" ? 8 : kind === "sloop" ? 0 : 5); i++) {
var gun = gvwCyl(g, 0.12, 0.14, 0.9, gvwMat("iron"), k * W * 0.5, deck + 0.45, -L * 0.3 + i * L * 0.08, 8);
gun.rotation.z = Math.PI / 2;
} });
var qd = kind === "sloop" ? 1.0 : kind === "junk" ? 2.4 : 1.8;
gvwBox(g, W * 0.88, qd, L * 0.2, hullM, 0, deck, -L * 0.38);
gvwBox(g, W * 0.9, 0.08, L * 0.2, deckM, 0, deck + qd, -L * 0.38);
if (kind !== "sloop") {
for (var w = 0; w < 4; w++)
gvwBox(g, 0.7, 0.6, 0.06, gvwGlowM(0xFFE0A0, 0.7), -W * 0.3 + w * W * 0.2, deck + qd * 0.3, -L * 0.48 - 0.02);
}
gvwBox(g, 0.3, 0.3, L * 0.18, hullM, 0, deck + 0.6, L * 0.5).rotation.x = -0.25;
var masts = kind === "sloop" ? [[0, 13]] : kind === "ship" ? [[L * 0.22, 22], [-L * 0.02, 26], [-L * 0.26, 18]] : kind === "junk" ? [[L * 0.18, 16], [-L * 0.06, 19]] : [[L * 0.2, 19], [-L * 0.04, 22], [-L * 0.28, 15]];
masts.forEach(function (M, mi) {
gvwCyl(g, 0.13, 0.2, M[1], gvwMat("darkbark"), 0, deck, M[0], 8);
if (kind === "junk") {
var s = new THREE.Mesh(gvwSailGeo(M[1] * 0.5, M[1] * 0.6, 0.3), saM);
s.position.set(0.4, deck + M[1] * 0.55, M[0]);
s.rotation.y = Math.PI / 2 + 0.25;
g.add(s);
for (var b = 0; b < 6; b++) {
var bt = gvwBox(g, 0.06, 0.06, M[1] * 0.5, gvwLam(0x3A2A1A), 0.45, deck + M[1] * 0.27 + b * M[1] * 0.11, M[0]);
bt.rotation.y = 0.25;
}
}
else {
var tiers = kind === "sloop" ? 1 : M[1] > 20 ? 3 : 2;
for (var t = 0; t < tiers; t++) {
var sw = (W * 1.5) * (1 - t * 0.22), sh = M[1] * 0.24, sy = deck + 3 + t * (sh + 0.6);
var sl = new THREE.Mesh(gvwSailGeo(sw, sh, 0.7), saM);
sl.position.set(0, sy + sh / 2, M[0] + 0.3);
g.add(sl);
var yd = gvwCyl(g, 0.07, 0.07, sw + 0.6, gvwMat("darkbark"), 0, 0, M[0] + 0.1, 6);
yd.rotation.z = Math.PI / 2;
yd.position.set(0, sy + sh, M[0] + 0.1);
}
}
});
if (kind === "sloop") {
var jb = new THREE.Mesh(gvwSailGeo(5, 9, 0.4), saM);
jb.position.set(0, deck + 5.5, L * 0.32);
jb.rotation.y = Math.PI / 2;
jb.scale.z = 0.6;
g.add(jb);
}
var fc = o.flag || (kind === "pirate" ? "#1A1A1A" : kind === "junk" ? "#E8E0D0" : kind === "ship" ? "dutch" : "#C82A2A");
var ft = gvwCanvas("flag" + fc, 96, 64, function (c, W2, H2) { if (fc === "dutch") {
["#AE1C28", "#FFFFFF", "#21468B"].forEach(function (cc, i) { c.fillStyle = cc; c.fillRect(0, i * H2 / 3, W2, H2 / 3 + 1); });
}
else {
c.fillStyle = fc;
c.fillRect(0, 0, W2, H2);
if (fc === "#C82A2A") {
c.fillStyle = "#F4F0E8";
c.fillRect(0, 0, W2 * 0.4, H2 * 0.45);
c.fillStyle = "#C82A2A";
c.fillRect(W2 * 0.16, 0, W2 * 0.08, H2 * 0.45);
c.fillRect(0, H2 * 0.18, W2 * 0.4, H2 * 0.09);
}
if (fc === "#E8E0D0") {
c.fillStyle = "#B81E1E";
c.beginPath();
c.arc(W2 / 2, H2 / 2, H2 * 0.28, 0, 7);
c.fill();
}
} });
var fl = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.2), gvwLam(0xFFFFFF, { map: ft, mapk: "flag" + fc, ds: 1 }));
var tm = masts[masts.length - 1];
fl.position.set(0, deck + tm[1] + 0.6, tm[0] - 0.9);
fl.rotation.y = Math.PI / 2;
g.add(fl);
if (o.walk) {
var ca = Math.cos(ry || 0), sa = Math.sin(ry || 0), wx = function (lx, lz) { return x + lx * ca + lz * sa; }, wz = function (lx, lz) { return z - lx * sa + lz * ca; };
gvwFloor(wx(0, L * 0.02), wz(0, L * 0.02), W * 0.82, L * 0.62, deck + (o.y || 0), { rot: -(ry || 0) });
gvwFloor(wx(0, -L * 0.38), wz(0, -L * 0.38), W * 0.82, L * 0.18, deck + qd + (o.y || 0), { rot: -(ry || 0) });
gvwRamp(wx(0, -L * 0.26), wz(0, -L * 0.26), 1.4, 2.2, deck + qd + (o.y || 0), deck + (o.y || 0), -(ry || 0));
[-1, 1].forEach(function (k) { gvwSolid(wx(k * W * 0.47, 0), wz(k * W * 0.47, 0), 0.3, L * 0.8, (o.y || 0) - 4, (o.y || 0) + deck + 1.2, -(ry || 0)); });
gvwSolid(wx(0, L * 0.36), wz(0, L * 0.36), W, 0.4, (o.y || 0) - 4, (o.y || 0) + deck + 1.2, -(ry || 0));
gvwSolid(wx(0, -L * 0.48), wz(0, -L * 0.48), W, 0.4, (o.y || 0) - 4, (o.y || 0) + deck + qd + 1.2, -(ry || 0));
masts.forEach(function (M) { gvwRound(wx(0, M[0]), wz(0, M[0]), 0.35); });
}
if (o.float !== false)
GVW.ships.push(g);
g.userData.deck = deck;
g.userData.L = L;
return g;
},
function (R) {
R = R || 300;
var g = new THREE.Group();
g.userData.live = 1;
var ad = gvwM("adamant", function () { var m = new THREE.MeshPhongMaterial({ color: 0x6A7080, shininess: 70, specular: 0x8A90A0 }); m.userData.noPhoto = 1; return m; });
var under = new THREE.Mesh(gvwGeo("islu", function () { var pts = []; for (var i = 0; i <= 14; i++) {
var t = i / 14;
pts.push(new THREE.Vector2(Math.max(0.001, Math.sqrt(1 - t * t)), -t * 0.42));
} return new THREE.LatheGeometry(pts.reverse(), 48); }), ad);
under.scale.set(R, R, R);
g.add(under);
for (var k = 0; k < 4; k++) {
var rg = new THREE.Mesh(gvwGeo("islg", function () { return new THREE.CylinderGeometry(1, 0.985, 0.02, 48, 1, true); }), gvwMat("ashlar"));
rg.scale.set(R * (1 - k * 0.04), R, R * (1 - k * 0.04));
rg.position.y = -k * R * 0.028;
g.add(rg);
var lip = new THREE.Mesh(gvwGeo("isll", function () { return new THREE.CylinderGeometry(1, 1, 0.004, 48, 1); }), gvwMat("granite"));
lip.scale.set(R * (1 - k * 0.04) + 1, R, R * (1 - k * 0.04) + 1);
lip.position.y = -k * R * 0.028 - R * 0.012;
g.add(lip);
}
var top = new THREE.Mesh(gvwGeo("islt", function () { return new THREE.CircleGeometry(1, 48); }), gvwMat("grass"));
top.rotation.x = -Math.PI / 2;
top.scale.setScalar(R * 0.99);
top.position.y = 0.02 * R;
g.add(top);
var R2 = wRand(41), roofs = [];
for (var i = 0; i < (gvwLite() ? 40 : 90); i++) {
var a = R2() * 6.283, r = R * (0.15 + R2() * 0.75);
roofs.push({ x: Math.cos(a) * r, z: Math.sin(a) * r, y: 0.02 * R, s: R * (0.012 + R2() * 0.016), ry: R2() * 3 });
}
gvwInst(g, gvwGeo("isroof", function () { var b = new THREE.BoxGeometry(1, 1.2, 1.4); b.translate(0, 0.6, 0); return b; }), gvwMat("plaster"), roofs, {});
gvwBox(g, R * 0.18, R * 0.08, R * 0.12, gvwMat("ashlar"), 0, 0.02 * R, -R * 0.22);
var dm = new THREE.Mesh(gvwGeo("isdome", function () { return new THREE.SphereGeometry(1, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2); }), gvwMat("brass"));
dm.scale.setScalar(R * 0.05);
dm.position.set(0, 0.1 * R, -R * 0.22);
g.add(dm);
return g;
},
function (P, x, y, z, len) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var ir = gvwMat("iron");
var ch = new THREE.Mesh(gvwGeo("chain" + len, function () { return new THREE.CylinderGeometry(0.05, 0.05, len, 6); }), ir);
ch.position.y = len / 2 + 1.2;
g.add(ch);
for (var i = 0; i < Math.min(40, len / 0.6); i++) {
var l = new THREE.Mesh(gvwGeo("link", function () { return new THREE.TorusGeometry(0.11, 0.03, 5, 10); }), ir);
l.position.y = 1.3 + i * 0.6;
l.rotation.y = i % 2 ? Math.PI / 2 : 0;
g.add(l);
}
[-1, 1].forEach(function (k) { var r = gvwCyl(g, 0.025, 0.025, 1.3, ir, k * 0.4, 0.45, 0, 5); r.rotation.z = k * -0.3; });
gvwBox(g, 1.0, 0.08, 0.55, gvwMat("oak"), 0, 0.4, 0);
gvwBox(g, 1.0, 0.5, 0.06, gvwMat("oak"), 0, 0.48, -0.26);
return g;
},
function (P, x, z, w, d, h, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(x, o.y != null ? o.y : gvwLand(x, z), z);
g.rotation.y = (o.ry || 0) + 0.07;
P.add(g);
var la = o.lean || 0.09, lb = o.lean2 || -0.06;
var body = new THREE.Mesh(gvwGeo("bvb" + la + "|" + lb, function () { var b = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1); b.translate(0, 0.5, 0); var M = new THREE.Matrix4(); M.set(1, la, 0, 0, 0, 1, 0, 0, 0, lb, 1, 0, 0, 0, 0, 1); b.applyMatrix4(M); return b; }), o.wall || gvwS("b:stucco", o.col || 0xE8DCC4, 3));
body.scale.set(w, h, d);
g.add(body);
var rf = new THREE.Mesh(gvwGeo("bvr", function () { var c = new THREE.ConeGeometry(0.75, 1, 4, 1); c.rotateY(Math.PI / 4 + 0.12); c.translate(0, 0.5, 0); return c; }), o.roof || gvwMat("slate"));
rf.scale.set(w * 1.15, h * 0.45, d * 1.15);
rf.position.set(h * la, h, h * lb);
rf.rotation.z = 0.05;
g.add(rf);
var R = wRand(Math.round(x * 3 + z * 7)), gl = gvwShine(0x2A3440, 0.2, 0.3);
for (var i = 0; i < Math.max(2, Math.floor(w / 2.6)); i++) {
for (var f = 0; f < Math.max(1, Math.round(h / 3.6)); f++) {
var wy = 1.1 + f * 3.2, wx = -w / 2 + (i + 0.5) * w / Math.max(2, Math.floor(w / 2.6)), ww = 0.7 + R() * 0.6, wh = 0.9 + R() * 0.9;
var m = gvwBox(g, ww, wh, 0.08, gl, wx + wy * la, wy, d / 2 + 0.02 + wy * lb);
m.rotation.z = (R() - 0.5) * 0.3;
}
}
gvwSolid(x, z, w + 0.6, d + 0.6, (o.y != null ? o.y : gvwLand(x, z)) - 2, (o.y != null ? o.y : gvwLand(x, z)) + h + 3, o.ry || 0);
return g;
},
function (g, W, D, kind, seed) {
var R = wRand(seed || 7);
if (kind === "home" || kind === "laputan") {
gvwRug(g, 0, 0, W * 0.5, D * 0.45, [0x6A2A2A, 0x2A3A6A, 0x5A4A2A][Math.floor(R() * 3)]);
var t = gvwTable(g, 0, -0.4, 1.8, 1.0, 0.78, gvwMat("oak"));
[-1, 1].forEach(function (k) { gvwChair(g, k * 1.2, -0.4, k * Math.PI / 2, gvwMat("velvet")); });
gvwBed(g, W / 2 - 1.3, -D / 2 + 1.4, 0);
gvwChest(g, -W / 2 + 1.0, -D / 2 + 0.6, 0);
gvwShelves(g, -W / 2 + 0.3, 1.0, 2.2, 2.2, Math.PI / 2);
if (kind === "laputan") {
gvwGlobe(g, -W / 2 + 1.2, D / 2 - 1.6, 0.8, true);
gvwHarpsichord(g, W / 2 - 1.4, D / 2 - 2.2, -Math.PI / 2);
gvwQuadrant(g, 1.6, -D / 2 + 0.8, 0);
gvwPaper(g, -W / 2, W / 2, -D / 2, D / 2, gvwMat("bluepaper"), null, null);
}
}
else if (kind === "poor") {
gvwTable(g, 0, 0, 1.4, 0.8, 0.74, gvwMat("planks"));
gvwChair(g, 0.9, 0, Math.PI / 2, gvwMat("planks"));
gvwBox(g, 1.8, 0.35, 0.9, gvwMat("planks"), W / 2 - 1.2, 0, -D / 2 + 0.8);
gvwBox(g, 1.7, 0.1, 0.8, gvwLam(0x8A7A60), W / 2 - 1.2, 0.35, -D / 2 + 0.8);
gvwChest(g, -W / 2 + 0.8, -D / 2 + 0.6, 0);
gvwFire(g, -W / 2 + 1.0, 0, D / 2 - 1.4, 0.6);
}
else if (kind === "shop") {
gvwBox(g, W * 0.7, 0.95, 0.7, gvwMat("oak"), 0, 0, -D / 2 + 1.6);
gvwShelves(g, 0, -D / 2 + 0.3, W * 0.8, 2.6, 0);
gvwChair(g, W / 2 - 1, 0.5, -Math.PI / 2, gvwMat("oak"));
}
else if (kind === "east") {
gvwBox(g, W * 0.8, 0.06, D * 0.7, gvwLam(0xC8B888), 0, 0, 0);
for (var i = 0; i < 4; i++)
gvwBox(g, 0.9, 0.12, 0.9, gvwLam([0x8A2A2A, 0x2A4A6A, 0x6A5A2A, 0x3A5A3A][i]), -1.5 + i, 0.06, -0.8);
gvwBox(g, 1.2, 0.35, 0.8, gvwLam(0x2A1A10), 0, 0, 0.2);
gvwBox(g, 0.5, 1.4, 0.04, gvwLam(0xF0E8D8), -W / 2 + 1.2, 0, -D / 2 + 0.3);
}
},
function (x, z) {
var h = -7;
for (var i = 0; i < GVW_ISLES.length; i++) {
var I = GVW_ISLES[i], d = Math.hypot(x - I[0], z - I[1]), t = 1 - d / I[2];
if (t <= 0)
continue;
var n = gvwFbm(x * 0.05 + i, z * 0.05, 3), v = -7 + 10 * gvwSmooth(0, 0.22, t) + (I[3] - 3) * gvwSmooth(0.22, 1, t) * (0.7 + n * 0.6);
if (i === 4) {
v += Math.max(0, 8 - Math.hypot(x - 630, z - 600) * 0.12) * gvwSmooth(0.2, 0.6, t);
var cd = Math.hypot(x - 600, (z + 470) * 0.6);
if (cd < 16)
v = Math.min(v, -1.5 + cd * 0.12);
}
if (v > h)
h = v;
}
var j = gvwJapanIn(x, z);
if (j > -60) {
var v2 = -7 + 10 * gvwSmooth(-30, 10, j) + gvwSmooth(110, 320, j) * (30 + gvwFbm(x * 0.01, z * 0.01, 3) * 60);
if (v2 > h)
h = v2;
}
return h;
},
function (G) {
var lite = gvwLite(), H = gvwSeaH;
gvwTerrain(G, -900, -900, 1800, 1800, lite ? 20 : 12, H, gvwMat("earth"), function (x, z, y, c) {
var n = gvwFbm(x * 0.03, z * 0.03, 3);
if (y < -1)
c.setRGB(0.5, 0.52, 0.48);
else if (y < 1.6)
c.setRGB(0.92, 0.86, 0.7);
else if (gvwJapanIn(x, z) > 0)
c.setRGB(0.5 + n * 0.15, 0.66 + n * 0.12, 0.38);
else if (y > 6 && n > 0.45)
c.setRGB(0.55, 0.62, 0.4);
else
c.setRGB(0.62 + n * 0.2, 0.6 + n * 0.18, 0.56 + n * 0.14);
});
gvwWater(G, 0, 0, 1800, 1800, 0, 0x2A5A7A, 0.82);
var far = new THREE.Mesh(new THREE.RingGeometry(880, 8000, 48, 1), gvwLam(0x2A5470));
far.rotation.x = -Math.PI / 2;
far.position.y = -0.05;
G.add(far);
var sl = gvwShip(G, 0, 0, 0, "sloop", { walk: true });
GVW.sloop = sl;
gvwShip(G, 34, -18, 0.25, "junk", {});
gvwShip(G, -30, 16, -0.2, "pirate", {});
for (var b = 0; b < 6; b++) {
var bx = gvwBox(G, 0.9, 0.6, 0.7, gvwLam(0x8A6A3A), -1.2 + (b % 3) * 1.1, 2.2, -3 + Math.floor(b / 3) * 1.0);
}
gvwBox(G, 1.2, 0.5, 0.9, gvwLam(0x6A4A2A), 1.6, 2.2, 4);
gvwBox(G, 0.6, 0.9, 0.6, gvwLam(0x5A3A1A), -1.8, 2.2, 4.5);
var cn = new THREE.Group();
cn.position.set(-4.6, 0.1, 0);
cn.userData.live = 1;
G.add(cn);
var ch = new THREE.Mesh(gvwHullGeo(5, 1.0, 0.5, {}), gvwMat("oak"));
ch.position.y = 0.4;
cn.add(ch);
gvwCyl(cn, 0.04, 0.05, 3.2, gvwMat("darkbark"), 0, 0.3, 0.4, 6);
var cs = new THREE.Mesh(gvwSailGeo(1.6, 2.2, 0.2), gvwM("sail" + GVW_SAIL, function () { var m = new THREE.MeshLambertMaterial({ color: GVW_SAIL, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
cs.position.set(0, 2.2, 0.5);
cn.add(cs);
GVW.ships.push(cn);
var rocks = gvwScatter(801, lite ? 140 : 300, 200, -700, 760, -140, function (x, z) { return H(x, z) > 1.2; }, H, 0.6, 2.4);
gvwPlant(G, "rock", rocks, { mat: gvwMat("rock") });
rocks.forEach(function (r) { if (r.s > 1.6)
gvwRound(r.x, r.z, r.s * 0.8, r.y - 1, r.y + r.s); });
gvwPlant(G, "grass", gvwScatter(803, lite ? 160 : 420, 200, -700, 760, -140, function (x, z) { var y = H(x, z); return y > 2 && y < 20; }, H, 0.6, 1.2), { col: 0xC8D8A0 });
gvwPlant(G, "flowers", gvwScatter(805, lite ? 40 : 110, 500, -700, 760, -440, function (x, z) { var y = H(x, z); return y > 3; }, H, 0.5, 0.9), { col: "#E8D8F0" });
var birds = gvwScatter(807, lite ? 40 : 120, 200, -700, 760, -140, function (x, z) { return H(x, z) > 2; }, H, 0.8, 1.2).map(function (b) { return { x: b.x, z: b.z, y: b.y + 0.1, s: b.s, ry: b.ry }; });
gvwInst(G, gvwGeo("gull", function () { var p = []; var b = new THREE.SphereGeometry(0.14, 8, 6); b.scale(1, 0.8, 1.8); b.translate(0, 0.2, 0); p.push(b.toNonIndexed()); var h = new THREE.SphereGeometry(0.08, 8, 6); h.translate(0, 0.32, 0.2); p.push(h.toNonIndexed()); return gwMerge(p); }), gvwLam(0xF4F4F0), birds, {});
var cv = new THREE.Group();
var cy = H(650, -560);
cv.position.set(650, cy, -560);
G.add(cv);
var rk = gvwMat("rock");
gvwBox(cv, 1.4, 3.2, 7, rk, -3, 0, -1, 0);
gvwBox(cv, 1.4, 3.2, 7, rk, 3, 0, -1, 0);
gvwBox(cv, 7.4, 1.4, 8, rk, 0, 3.0, -1.2, 0);
gvwBox(cv, 7.4, 3.4, 1.4, rk, 0, 0, -4.6, 0);
gvwSolid(647, -561, 1.4, 7, cy - 1, cy + 4);
gvwSolid(653, -561, 1.4, 7, cy - 1, cy + 4);
gvwSolid(650, -564.6, 7.4, 1.4, cy - 1, cy + 4);
gvwFloor(650, -561, 4.6, 7, cy);
for (var s = 0; s < 8; s++)
gvwBox(cv, 0.8, 0.1, 0.6, gvwLam(0x6A6A3A), -1 + (s % 3) * 0.7, 0.0, -3 + Math.floor(s / 3) * 0.6);
[[700, -520], [560, -600], [590, -520], [680, -640]].forEach(function (q) { var y = H(q[0], q[1]); var m = new THREE.Mesh(gvwGeo("cvm", function () { return new THREE.CircleGeometry(1.4, 10, 0, Math.PI); }), gvwLam(0x0A0A0A)); m.position.set(q[0], y + 0.1, q[1]); m.rotation.y = Math.atan2(630 - q[0], -570 - q[1]); G.add(m); });
gvwJapan(G, H);
var hillM = gvwLam(0x6A8090);
for (var i = 0; i < 14; i++) {
var a = i / 14 * Math.PI * 2, r = 2000 + ((i * 37) % 5) * 220;
var hm = new THREE.Mesh(gvwGeo("fhill", function () { return new THREE.SphereGeometry(1, 14, 6, 0, Math.PI * 2, 0, Math.PI / 2); }), hillM);
hm.scale.set(200 + ((i * 31) % 4) * 80, 40 + ((i * 17) % 5) * 20, 140);
hm.position.set(Math.cos(a) * r, -6, Math.sin(a) * r);
G.add(hm);
}
gvwRoomBuild(G, "sea", 0, 12, 9, 3.4, { paper: gvwMat("greenpaper"), out: { x: 0, z: 2, ry: Math.PI }, doorName: "The street door (the book takes you to sea)", day: 0xD8E0E8 });
(function () {
var A = gvwInAt("sea", 0), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
gvwFurnish(g, 12, 9, "home", 71);
gvwShelves(g, 4.5, -4.1, 2.6, 2.4, 0);
gvwBox(g, 1.6, 0.9, 0.7, gvwMat("oak"), -3.8, 0, 3.2);
var sc = new THREE.Group();
sc.position.set(-3.8, 0.92, 3.2);
g.add(sc);
gvwBox(sc, 0.3, 0.08, 0.2, gvwMat("brass"), 0, 0, 0);
gvwFire(g, 0, 0, -4.0, 0.7);
gvwBox(g, 2.4, 1.4, 0.6, gvwMat("marble"), 0, 0, -4.3);
})();
GVW.isle = null;
if (GVW.isleWant)
gvwIsleSet(true, GVW.isleWant);
},
function (G, H) {
var lite = gvwLite(), R = wRand(2701);
var tile = gvwS("b:slate", 0x4A4E58, 2), wood = gvwLam(0x6A4A30), plaster = gvwS("plaster", 0xF0EADC, 3), red = gvwLam(0x9A2A1E);
function jhouse(x, z, w, d, ry, two) {
var g = new THREE.Group(), y = H(x, z);
g.position.set(x, y, z);
g.rotation.y = ry || 0;
G.add(g);
gvwBox(g, w + 0.6, 0.5, d + 0.6, gvwMat("granite"), 0, 0, 0);
gvwBox(g, w, 2.8, d, plaster, 0, 0.5, 0);
for (var i = 0; i < Math.floor(w / 1.2); i++)
gvwBox(g, 0.12, 2.8, 0.06, wood, -w / 2 + 0.6 + i * 1.2, 0.5, d / 2 + 0.03);
var rf = new THREE.Mesh(gvwGeo("jroof", function () { var c = new THREE.CylinderGeometry(0.02, 0.75, 0.5, 4, 1); c.rotateY(Math.PI / 4); c.scale(1, 1, 0.75); c.translate(0, 0.25, 0); return c; }), tile);
rf.scale.set(w * 1.5, 3, d * 1.9);
rf.position.y = 3.3;
g.add(rf);
if (two) {
gvwBox(g, w * 0.8, 2.4, d * 0.8, plaster, 0, 4.2, 0);
var r2 = rf.clone();
r2.scale.set(w * 1.2, 2.4, d * 1.5);
r2.position.y = 6.6;
g.add(r2);
}
gvwSolid(x, z, w + 0.6, d + 0.6, y - 1, y + 8, ry || 0);
return g;
}
var spots = [];
for (var ix = 0; ix < 6; ix++)
for (var iz = 0; iz < 3; iz++) {
var x = -700 + ix * 34 + (iz % 2) * 10, z = 330 + iz * 40;
if (Math.hypot(x + 640, z - 420) < 22)
continue;
spots.push([x, z]);
}
spots.forEach(function (q, i) { jhouse(q[0], q[1], 8 + R() * 4, 6 + R() * 3, R() < 0.5 ? 0 : Math.PI, R() < 0.3); });
(function () { var x = -760, z = 430, y = H(x, z), g = new THREE.Group(); g.position.set(x, y, z); G.add(g); for (var k = 0; k < 5; k++) {
var s = 1 - k * 0.14;
gvwBox(g, 7 * s, 2.6, 7 * s, red, 0, k * 3.4, 0);
var rf = new THREE.Mesh(gvwGeo("jroof", function () { var c = new THREE.CylinderGeometry(0.02, 0.75, 0.5, 4, 1); c.rotateY(Math.PI / 4); c.scale(1, 1, 0.75); c.translate(0, 0.25, 0); return c; }), tile);
rf.scale.set(13 * s, 2.2, 17 * s);
rf.position.y = k * 3.4 + 2.6;
g.add(rf);
} gvwCyl(g, 0.12, 0.2, 6, gvwMat("brass"), 0, 17, 0, 8); gvwSolid(x, z, 8, 8, y - 1, y + 20); })();
var qy = 2.2;
gvwBox(G, 200, qy + 7, 10, gvwMat("granite"), -600, -7, 481);
gvwFloor(-600, 481, 200, 10, qy);
gvwBox(G, 8, qy + 7, 26, gvwMat("granite"), -600, -7, 498);
gvwFloor(-600, 498, 8, 26, qy);
for (var i = 0; i < 20; i++)
gvwBox(G, 0.4, 0.6, 0.4, gvwMat("granite"), -690 + i * 10, qy, 486);
gvwShip(G, -600, 522, Math.PI / 2, "ship", { walk: true });
gvwShip(G, -680, 515, -Math.PI / 2 + 0.1, "junk", {});
gvwShip(G, -520, 520, Math.PI / 2 - 0.1, "junk", {});
for (i = 0; i < 10; i++)
gvwBox(G, 1 + R() * 0.6, 0.8, 1 + R() * 0.6, gvwLam([0x8A6A3A, 0x6A5A3A, 0xA88A5A][i % 3]), -650 + R() * 100, qy, 478 + R() * 5);
gvwSign(G, "NANGASAC", 5, 1, -600, qy + 3.4, 476.2, 0, { bg: "#F4ECD8", ink: "#6A1A10" });
gvwEnterable(G, "sea", 2, -640, 420, 0, "The door of a tea-house", { W: 12, D: 9, H: 3.4, wall: plaster, floor: gvwLam(0xC8B888), day: 0xF4ECD8, fill: function (g, W, D) { gvwFurnish(g, W, D, "east", 31); } }, { d: 9, col: 0x6A4A30, frame: wood, outName: "the street at Nangasac" });
jhouse(-640, 420, 12, 9, 0, false);
(function () { var x = -370, z = 300; gvwBox(G, 30, 9.2, 8, gvwMat("granite"), x, -7, z, 0); gvwFloor(x, z, 30, 8, 2.2); jhouse(-430, 320, 8, 6, Math.PI / 2, false); jhouse(-430, 284, 8, 6, Math.PI / 2, false); gvwShip(G, -340, 312, 0, "junk", {}); })();
gvwStrip(G, gvwDense([[-390, 300], [-500, 320], [-600, 340], [-700, 350], [-782, 352]], 6), 5, function (x, z) { return H(x, z) + 0.06; }, gvwMat("gravel"), 0.06);
var pines = [];
for (i = 0; i < 36; i++) {
var t = i / 36, x = -420 - t * 330, z = 304 + t * 50 + (i % 2 ? 7 : -7);
pines.push({ x: x, z: z, y: H(x, z), s: 0.8 + R() * 0.4, ry: R() * 6 });
}
gvwPlant(G, "conifer", pines, { keepAll: 1 });
(function () {
var x = -800, z = 352, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = Math.PI / 2;
G.add(g);
gvwBox(g, 40, 4, 30, gvwMat("granite"), 0, 0, 0);
gvwBox(g, 30, 6, 20, plaster, 0, 4, 0);
var rf = new THREE.Mesh(gvwGeo("jroof", function () { var c = new THREE.CylinderGeometry(0.02, 0.75, 0.5, 4, 1); c.rotateY(Math.PI / 4); c.scale(1, 1, 0.75); c.translate(0, 0.25, 0); return c; }), tile);
rf.scale.set(52, 8, 44);
rf.position.y = 10;
g.add(rf);
gvwBox(g, 18, 4, 14, plaster, 0, 13, 0);
var r2 = rf.clone();
r2.scale.set(30, 6, 26);
r2.position.y = 17;
g.add(r2);
gvwSolid(x, z, 30, 40, y - 1, y + 24);
})();
gvwEnterable(G, "sea", 1, -784, 352, Math.PI / 2, "The gate of the Emperor's palace", { W: 26, D: 18, H: 6, wall: plaster, floor: gvwLam(0xD8C898), day: 0xF4ECD8, fill: function (g, W, D) {
gvwBox(g, 8, 0.5, 4, gvwLam(0x8A2A1E), 0, 0, -D / 2 + 3);
gvwBox(g, 2.2, 1.4, 1.2, gvwMat("brass"), 0, 0.5, -D / 2 + 2.6);
for (var i = 0; i < 6; i++) {
gvwCyl(g, 0.3, 0.3, 6, red, -W / 2 + 2 + i * (W - 4) / 5, 0, -2, 10);
gvwCyl(g, 0.3, 0.3, 6, red, -W / 2 + 2 + i * (W - 4) / 5, 0, 3, 10);
}
for (i = 0; i < 8; i++)
gvwBox(g, 0.9, 0.1, 0.9, gvwLam(0x2A4A6A), -5 + i * 1.4, 0, 1.5);
} }, { d: 0, front: 0, frame: wood, col: 0x8A2A1E, outName: "Yedo" });
gvwCrowd("nang", lite ? 10 : 22, -690, 300, -520, 470, { dress: "gveast", dressF: "gveastf", skin: 0xD8B898, hair: function () { return 0x141414; }, names: ["A merchant of Nangasac", "A fisherman", "A porter on the quay", "A lady of Nangasac", "A boatman"], persona: "townsman", says: ["The Hollanders' ship sails soon, they say.", "Good fish this morning, from beyond the islands.", "Mind your step on the stones.", "Have you come from very far?", "Only the Hollanders may trade here."] });
gvwCrowd("xam", lite ? 3 : 6, -440, 290, -410, 320, { dress: "gveast", dressF: "gveastf", skin: 0xD8B898, hair: function () { return 0x141414; }, names: ["A fisherman of Xamoschi", "A customs officer"], persona: "townsman", says: ["A ship from the east? Rare, rare.", "Papers, if you please."] });
gvwCrowd("yedo", lite ? 4 : 8, -760, 330, -700, 370, { dress: "gveast", dressF: "gveastf", skin: 0xD8B898, hair: function () { return 0x141414; }, names: ["A guard of the palace", "A courtier"], persona: "townsman", says: ["The Emperor gives audience today.", "You have letters from the King of Luggnagg? Then you are expected."] });
},
function (x, z) {
var r = Math.hypot(x, z);
if (r < 25)
return -60;
if (r > 606)
return GVW_LGAL;
var h = gvwLapTop(r);
if (r > 600)
h = GVW_LGAL + (gvwLapTop(600) - GVW_LGAL) * (606 - r) / 6;
for (var i = 0; i < 4; i++) {
var B = GVW_BASINS[i], d = Math.hypot(x - B[0], z - B[1]);
if (d < 46)
h = Math.min(h, gvwLapTop(Math.hypot(B[0], B[1])) - 3.2 * gvwSmooth(46, 36, d));
}
return h + gvwFbm(x * 0.03, z * 0.03, 2) * 0.4;
},
function (G, y) {
var t = gvwCanvas("below", 512, 512, function (c, W, H) {
var R = wRand(77);
c.fillStyle = "#7A8A5A";
c.fillRect(0, 0, W, H);
for (var i = 0; i < 260; i++) {
c.fillStyle = ["#8A9A5A", "#9A8A5A", "#6A7A4A", "#A89A6A", "#5A6A3A", "#B8A878"][Math.floor(R() * 6)];
c.fillRect(R() * W, R() * H, 10 + R() * 40, 8 + R() * 30);
}
c.strokeStyle = "rgba(200,190,160,.6)";
c.lineWidth = 2;
for (i = 0; i < 10; i++) {
c.beginPath();
c.moveTo(R() * W, 0);
c.bezierCurveTo(R() * W, H / 3, R() * W, H * 2 / 3, R() * W, H);
c.stroke();
}
c.strokeStyle = "rgba(80,110,150,.7)";
c.lineWidth = 4;
c.beginPath();
c.moveTo(0, H * 0.3);
c.bezierCurveTo(W * 0.3, H * 0.5, W * 0.6, H * 0.1, W, H * 0.4);
c.stroke();
gvwNoise(c, W, H, 3000, 0.2, 3, "40,40,20");
});
t.repeat.set(12, 12);
var m = new THREE.Mesh(new THREE.PlaneGeometry(36000, 36000), gvwM("belowm", function () { var mm = new THREE.MeshLambertMaterial({ map: t }); mm.userData.noPhoto = 1; return mm; }));
m.rotation.x = -Math.PI / 2;
m.position.y = y;
G.add(m);
var cl = [], R = wRand(91);
for (var i = 0; i < (gvwLite() ? 14 : 30); i++) {
var a = R() * 6.283, r = 800 + R() * 2600;
cl.push({ x: Math.cos(a) * r, z: Math.sin(a) * r, y: -240 - R() * 400, s: 60 + R() * 90, ry: R() * 3 });
}
gvwInst(G, gvwGeo("cloud", function () { var p = [], R2 = wRand(5); for (var k = 0; k < 5; k++) {
var s = new THREE.IcosahedronGeometry(0.5 + R2() * 0.4, 1);
s.translate((R2() - 0.5) * 1.6, (R2() - 0.5) * 0.3, (R2() - 0.5) * 0.9);
p.push(s.toNonIndexed());
} var g = gwMerge(p); g.scale(1, 0.35, 1); return g; }), gvwLam(0xF4F6FA, { op: 0.85 }), cl, {});
},
function (G) {
var lite = gvwLite(), H = gvwLapH, R = wRand(5150);
gvwDisc(G, GVW_LR + 2, lite ? 36 : 64, lite ? 72 : 128, H, gvwMat("grass"), function (x, z, y, c) {
var r = Math.hypot(x, z), n = gvwFbm(x * 0.02, z * 0.02, 3);
if (r > 603) {
c.setRGB(0.86, 0.84, 0.8);
return;
}
if (r < 30) {
c.setRGB(0.5, 0.48, 0.46);
return;
}
c.setRGB(0.6 + n * 0.2, 0.76 + n * 0.14, 0.46 + n * 0.1);
});
var ad = gvwM("adamant", function () { var m = new THREE.MeshPhongMaterial({ color: 0x6A7080, shininess: 70, specular: 0x8A90A0 }); m.userData.noPhoto = 1; return m; });
var side = new THREE.Mesh(gvwGeo("lapside", function () { var pts = []; for (var i = 0; i <= 16; i++) {
var t = i / 16;
pts.push(new THREE.Vector2(Math.max(1, GVW_LR * Math.sqrt(1 - t * t)), GVW_LGAL - t * 220));
} return new THREE.LatheGeometry(pts, 96); }), ad);
G.add(side);
for (var k = 1; k < 5; k++) {
var rr = GVW_LR - k * 9, gy = GVW_LGAL - k * 7;
var ring = new THREE.Mesh(gvwGeo("lgring" + k, function () { var g = new THREE.RingGeometry(rr - 2, rr + 8, 96, 1); g.rotateX(-Math.PI / 2); return g; }), gvwMat("ashlar"));
ring.position.y = gy;
G.add(ring);
}
var gal = new THREE.Mesh(gvwGeo("lgtop", function () {
var g = new THREE.RingGeometry(600, GVW_LR + 1, lite ? 192 : 384, lite ? 3 : 6);
g.rotateX(-Math.PI / 2);
var pa = g.attributes.position, ua = g.attributes.uv;
for (var q = 0; q < pa.count; q++)
ua.setXY(q, pa.getX(q), -pa.getZ(q));
return g;
}), gvwMat("paving"));
gal.position.y = GVW_LGAL + 0.02;
G.add(gal);
var posts = [];
for (var i = 0; i < (lite ? 160 : 320); i++) {
var a = i / (lite ? 160 : 320) * Math.PI * 2;
posts.push({ x: Math.cos(a) * (GVW_LR - 0.6), z: Math.sin(a) * (GVW_LR - 0.6), y: GVW_LGAL, s: 1, ry: -a });
}
gvwInst(G, gvwGeo("bpost", function () { var c = new THREE.CylinderGeometry(0.1, 0.14, 1.0, 6); c.translate(0, 0.5, 0); return c; }), gvwMat("ashlar"), posts, {});
var rail = new THREE.Mesh(gvwGeo("brail", function () { return new THREE.TorusGeometry(GVW_LR - 0.6, 0.12, 4, 160); }), gvwMat("ashlar"));
rail.rotation.x = Math.PI / 2;
rail.position.y = GVW_LGAL + 1.05;
G.add(rail);
for (i = 0; i < 8; i++) {
var a2 = Math.PI / 2 + i * Math.PI / 4, cx = Math.cos(a2), cz = Math.sin(a2), sx = cx * 602, sz = cz * 602, g = new THREE.Group();
g.position.set(sx, GVW_LGAL, sz);
g.rotation.y = -a2 + Math.PI / 2;
G.add(g);
for (var st = 0; st < 12; st++)
gvwBox(g, 4, (st + 1) * (gvwLapTop(600) - GVW_LGAL) / 12, 0.8, gvwMat("ashlar"), 0, 0, 4.4 - st * 0.8);
gvwRamp(sx, sz, 4, 10, gvwLapTop(596) + 0.1, GVW_LGAL, -(-a2 + Math.PI / 2));
}
gvwBelow(G, -1600);
var ch = new THREE.Mesh(gvwGeo("chasmw", function () { return new THREE.CylinderGeometry(25, 25, 62, 48, 1, true); }), gvwM("chasmM", function () { var m = new THREE.MeshLambertMaterial({ color: 0x5A5850, side: THREE.BackSide }); m.userData.noPhoto = 1; return m; }));
ch.position.y = -28;
G.add(ch);
var cb = new THREE.Mesh(gvwGeo("chasmb", function () { return new THREE.CircleGeometry(25, 32); }), gvwLam(0x0A0A0E));
cb.rotation.x = -Math.PI / 2;
cb.position.y = -58;
G.add(cb);
var cposts = [];
for (i = 0; i < 60; i++) {
var a3 = i / 60 * Math.PI * 2;
if (Math.abs(Math.sin(a3) - 1) < 0.01)
continue;
cposts.push({ x: Math.cos(a3) * 26, z: Math.sin(a3) * 26, y: H(Math.cos(a3) * 26, Math.sin(a3) * 26), s: 1, ry: 0 });
gvwRound(Math.cos(a3) * 26, Math.sin(a3) * 26, 0.9);
}
gvwInst(G, gvwGeo("bpost", function () { var c = new THREE.CylinderGeometry(0.1, 0.14, 1.0, 6); c.translate(0, 0.5, 0); return c; }), gvwMat("ashlar"), cposts, {});
var crail = new THREE.Mesh(gvwGeo("crail", function () { return new THREE.TorusGeometry(26, 0.12, 4, 64); }), gvwMat("ashlar"));
crail.rotation.x = Math.PI / 2;
crail.position.y = H(26, 0) + 1.05;
G.add(crail);
var sg = new THREE.Group();
sg.position.set(0, H(0, 27), 27);
G.add(sg);
gvwBox(sg, 3, 3.2, 2, gvwMat("ashlar"), 0, 0, 0);
var arch = new THREE.Mesh(gvwGeo("sarch", function () { return new THREE.CylinderGeometry(1.5, 1.5, 2.1, 14, 1, false, 0, Math.PI); }), gvwMat("ashlar"));
arch.rotation.z = Math.PI / 2;
arch.rotation.y = Math.PI / 2;
arch.position.set(0, 3.2, 0);
sg.add(arch);
gvwBox(sg, 1.6, 2.4, 0.06, gvwLam(0x0A0A0A), 0, 0, 1.03);
gvwSign(G, "FLANDONA GAGNOLE", 3, 0.5, 0, H(0, 28) + 3.8, 28.05, 0, { bg: "#E8E0D0", ink: "#2A2A4A" });
gvwSpot(0, 30, 2, "The stair down into the Flandona Gagnole", "go down", function () { gvwGo("cavein", "🌌 <b>The Astronomer's Cave.</b> A hundred yards down, under its dome, the twenty lamps burning, and the great loadstone in the middle.", gvbPopulate); }, H(0, 30));
GVW_BASINS.forEach(function (B) {
var y = gvwLapTop(Math.hypot(B[0], B[1])) - 1.0;
var w = new THREE.Mesh(gvwGeo("basinw", function () { return new THREE.CircleGeometry(42, 40); }), gvwWaterM(0x4A6A8A, 0.85));
w.rotation.x = -Math.PI / 2;
w.position.set(B[0], y, B[1]);
w.renderOrder = 2;
G.add(w);
GVW.water.push(w);
var lip = new THREE.Mesh(gvwGeo("basinl", function () { var g = new THREE.RingGeometry(40, 44, 48, 1); g.rotateX(-Math.PI / 2); return g; }), gvwMat("ashlar"));
lip.position.set(B[0], y + 0.6, B[1]);
G.add(lip);
});
gvwLapPalace(G, H);
var homes = [[120, 120, 0], [170, 78, 0.4], [-130, 40, 0], [-60, 240, Math.PI], [-160, 180, 0.2], [200, 220, -0.3], [-260, 120, 0.8], [280, -160, 2.6], [-300, -200, -2.4], [60, 330, 3.0], [-200, 360, 2.4], [330, 40, -1.2], [-380, -20, 1.4], [420, -200, -2.0], [-420, 220, 1.0], [100, -330, 0.1], [-60, -360, -0.2], [260, 360, -0.8], [-300, 420, 0.6], [380, 280, -0.9], [-460, -160, 1.8], [460, 100, -1.6], [180, -440, 0.3], [-200, -460, -0.3], [0, 430, Math.PI], [300, -380, 2.4], [-360, -360, -2.3], [520, -80, -1.5], [-520, 60, 1.6], [80, 170, 0.5]];
homes.forEach(function (q, i) {
var x = q[0], z = q[1], ry = q[2];
if (i === 2)
return;
var w = 8 + R() * 5, d = 7 + R() * 4, hh = 6 + R() * 6;
gvwBevelHouse(G, x, z, w, d, hh, { ry: ry, col: [0xE8DCC4, 0xD8C8E0, 0xC8D8E4, 0xE4D0B8, 0xF0E4D4][i % 5], lean: 0.05 + R() * 0.1, lean2: -(0.03 + R() * 0.08) });
var slot = i === 0 ? 1 : i === 1 ? 2 : i === 3 ? 4 : 5 + (i % 4), nm = i === 0 ? "The door of your lodging" : i === 1 ? "The tailor's door" : i === 3 ? "The great lord's door" : "The door of a Laputian house";
var dd = d / 2 + 0.4;
gvwDoorTo(G, "laputa", slot, x + Math.sin(ry) * dd, z + Math.cos(ry) * dd, ry, nm, slot === 1 ? 10 : 12, slot === 1 ? 8 : 10, { col: [0x2A3A6A, 0x6A2A3A, 0x3A5A3A][i % 3] });
});
(function () {
var x = -130, z = 40, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
gvwCyl(g, 14, 14, 10, gvwS("b:stucco", 0xF0E8D8, 3), 0, 0, 0, 28);
var dm = new THREE.Mesh(gvwGeo("mdome", function () { return new THREE.SphereGeometry(14.5, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2); }), gvwMat("verdigris"));
dm.position.y = 10;
g.add(dm);
for (var i = 0; i < 12; i++) {
var a = i / 12 * 6.283;
gvwCyl(g, 0.5, 0.6, 10, gvwMat("ashlar"), Math.cos(a) * 14.6, 0, Math.sin(a) * 14.6, 10);
}
gvwRound(x, z, 14.8, y - 1, y + 20);
gvwDoorTo(G, "laputa", 3, x, z + 15.2, 0, "The music room's door", 20, 16, {});
})();
[[60, 60], [-80, -60], [300, -20], [-300, 60], [40, -260]].forEach(function (q, i) { gvwTelescope(G, q[0], q[1], i, 0.9, H(q[0], q[1])); });
(function () {
var x = 60, z = -60, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
gvwCyl(g, 1.2, 1.6, 1.2, gvwMat("ashlar"), 0, 0, 0, 12);
[0, 1, 2].forEach(function (k) { var t = new THREE.Mesh(gvwGeo("arm", function () { return new THREE.TorusGeometry(2.4, 0.06, 6, 48); }), gvwMat("brass")); t.position.y = 3.8; t.rotation.set(k === 0 ? Math.PI / 2 : 0.4, k * 1.0, k === 2 ? 0.9 : 0); g.add(t); });
var ea = new THREE.Mesh(gvwGeo("arme", function () { return new THREE.SphereGeometry(0.5, 14, 10); }), gvwMat("brass"));
ea.position.y = 3.8;
g.add(ea);
gvwRound(x, z, 1.8, y - 1, y + 6);
})();
var trees = gvwScatter(5201, lite ? 50 : 120, -560, -560, 560, 560, function (x, z) { var r = Math.hypot(x, z); return r > 60 && r < 580 && !gvwLapBusy(x, z); }, H, 0.7, 1.2);
gvwPlant(G, "tree", trees.filter(function (t, i) { return i % 2; }), { col: 0x5A8A3A, keepAll: 1 });
gvwPlant(G, "conifer", trees.filter(function (t, i) { return !(i % 2); }), { keepAll: 1 });
trees.forEach(function (t) { gvwRound(t.x, t.z, 0.6 * t.s, t.y - 1, t.y + 10); });
gvwPlant(G, "flowers", gvwScatter(5203, lite ? 60 : 160, -560, -560, 560, 560, function (x, z) { var r = Math.hypot(x, z); return r > 40 && r < 590 && !gvwLapBusy(x, z); }, H, 0.7, 1.1), { col: "#C8D8FF" });
gvwPlant(G, "grass", gvwScatter(5205, lite ? 200 : 600, -580, -580, 580, 580, function (x, z) { var r = Math.hypot(x, z); return r > 30 && r < 595 && !gvwLapBusy(x, z); }, H, 0.7, 1.2), { col: 0xD8E8B0 });
var rods = [];
for (i = 0; i < (lite ? 8 : 18); i++) {
var a4 = Math.PI / 2 - 0.5 + i * 0.06, x4 = Math.cos(a4) * (GVW_LR - 2.5), z4 = Math.sin(a4) * (GVW_LR - 2.5);
var P = gvwPerson("fish" + i, x4, z4, GVW_LGAL, { dress: i % 3 ? "gvlaputan" : "gvflap", sex: "m" }, Math.PI / 2 - a4 + Math.PI);
var rod = new THREE.Mesh(gvwGeo("rod", function () { var c = new THREE.CylinderGeometry(0.015, 0.03, 7, 5); c.translate(0, 3.5, 0); return c; }), gvwLam(0x6A4A2A));
rod.position.set(0.3, 1.1, 0.2);
rod.rotation.x = 1.0;
P.g.add(rod);
if (i % 3 === 0)
gvwTalk(P, "An angler on the gallery", gvwPersona("laputan"), "(He does not look round.) The fish below are very large this season. I calculate it by the arc of the line.");
}
gvwChainSeat(G, 0, GVW_LGAL - 40, GVW_LR + 3, 46);
var dv = new THREE.Group();
dv.position.set(0, GVW_LGAL, GVW_LR - 1);
G.add(dv);
gvwBox(dv, 0.4, 5, 0.4, gvwMat("oak"), -1.6, 0, 0);
gvwBox(dv, 0.4, 5, 0.4, gvwMat("oak"), 1.6, 0, 0);
gvwBox(dv, 3.6, 0.4, 0.6, gvwMat("oak"), 0, 5, 1.2).rotation.x = -0.5;
var pul = gvwCyl(dv, 0.5, 0.5, 0.3, gvwMat("iron"), 0, 5.2, 3.2, 14);
pul.rotation.z = Math.PI / 2;
var reel = new THREE.Group();
reel.position.set(-440, GVW_LGAL, 444);
G.add(reel);
for (i = 0; i < 4; i++) {
gvwCyl(reel, 0.25, 0.25, 0.6, gvwLam(0xC8B888), i * 1.2 - 1.8, 0.8, 0, 10).rotation.x = Math.PI / 2;
gvwBox(reel, 0.08, 0.9, 0.08, gvwMat("oak"), i * 1.2 - 1.8, 0, 0);
var ln = gvwCyl(reel, 0.01, 0.01, 60, gvwLam(0xE8E0C8), i * 1.2 - 1.8 + i * 0.8, -60, 4 + i, 3);
ln.rotation.x = 0.05;
}
gvwCrowd("lap", lite ? 14 : 30, -420, -420, 420, 460, { dress: "gvlaputan", dressF: "gvlaputana", tilt: 1, flapper: 1, ok: function (x, z) { var r = Math.hypot(x, z); return r > 40 && r < 580 && !gvwLapBusy(x, z); },
names: ["A Laputian gentleman", "A mathematician", "A courtier", "A lady of the court", "A musician", "A Laputian lady"], persona: "laputan",
says: ["(He stares upward, and says nothing, until his flapper touches his mouth.) Ah. Have you considered the conic sections?", "The comet, sir. Have you heard? In one-and-thirty years it will come again.", "(Humming a scale.) Pardon. The music of the spheres is especially fine this morning.", "You are the stranger! Do tell me about Lagado. My husband never notices me.", "Triangles, rhomboids, cycloids: everything has its figure.", "I have asked the King's licence to go down to Lagado. Twice. He was thinking."] });
gvwCrowd("lapg", lite ? 4 : 10, -200, 580, 200, 640, { dress: "gvlaputan", dressF: "gvlaputana", tilt: 1, feet: GVW_LGAL + 1, ok: function (x, z) { var r = Math.hypot(x, z); return r > 608 && r < 640; }, names: ["A gentleman on the gallery", "A lady watching the anglers"], persona: "laputan", says: ["The land is very far down today.", "We may go lower when the King pleases."], wander: 4 });
gvwLapRooms(G);
if (GVW.isleWant)
GVW.isleWant = null;
},
function (P, R, rings, segs, hfn, mat, cfn) {
var pos = [], col = [], uv = [], idx = [], c = new THREE.Color();
for (var i = 0; i <= rings; i++) {
var r = i === 0 ? 0.01 : Math.pow(i / rings, 0.85) * R;
for (var j = 0; j <= segs; j++) {
var a = j / segs * Math.PI * 2, x = Math.cos(a) * r, z = Math.sin(a) * r, y = hfn(x, z);
pos.push(x, y, z);
uv.push(x / 6, z / 6);
if (cfn)
cfn(x, z, y, c);
else
c.setRGB(1, 1, 1);
col.push(c.r, c.g, c.b);
}
}
for (i = 0; i < rings; i++)
for (j = 0; j < segs; j++) {
var a1 = i * (segs + 1) + j, b1 = a1 + segs + 1;
idx.push(a1, a1 + 1, b1, b1, a1 + 1, b1 + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.receiveShadow = true;
P.add(m);
return m;
},
function (G, H) {
var x = 0, z = -150, y = H(0, -150), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var st = gvwMat("ashlar"), gold = gvwMat("brass");
gvwBox(g, 92, 2, 54, gvwMat("granite"), 0, -1, 0);
gvwBox(g, 86, 16, 46, st, 0, 1, 0);
gvwBox(g, 88, 1.2, 48, gvwMat("white"), 0, 17, 0);
for (var i = 0; i < 14; i++) {
gvwCyl(g, 0.8, 0.9, 14, gvwMat("white"), -39 + i * 6, 1, 23.6, 14);
}
gvwBox(g, 86, 2.2, 2, gvwMat("white"), 0, 15, 24);
var pd = new THREE.Mesh(gvwGeo("ped", function () { var s = new THREE.Shape(); s.moveTo(-20, 0); s.lineTo(20, 0); s.lineTo(0, 6); s.lineTo(-20, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 2, bevelEnabled: false }); return e; }), gvwMat("white"));
pd.position.set(0, 17.2, 23);
g.add(pd);
var dm = new THREE.Mesh(gvwGeo("pdome", function () { return new THREE.SphereGeometry(14, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2); }), gold);
dm.position.set(0, 18, 0);
g.add(dm);
gvwCyl(g, 14.5, 14.5, 4, st, 0, 16, 0, 28);
for (i = 0; i < 24; i++) {
var a = i / 24 * 6.283, s = new THREE.Mesh(gvwGeo("pstar", function () { return new THREE.OctahedronGeometry(0.5, 0); }), gvwGlowM(0xFFF0B0));
s.position.set(Math.cos(a) * 14.6, 20, Math.sin(a) * 14.6);
g.add(s);
}
for (i = 0; i < 3; i++) {
var sp = new THREE.Mesh(gvwGeo("psun", function () { return new THREE.SphereGeometry(1.4, 16, 10); }), gold);
sp.position.set(-30 + i * 30, 22, 10);
g.add(sp);
}
for (i = 0; i < 8; i++)
gvwBox(g, 30 - i * 1.5, 0.3 * (i + 1), 0.8, gvwMat("white"), 0, 0, 27.2 + (7 - i) * 0.8);
for (var f = 0; f < 3; f++)
for (i = 0; i < 12; i++)
if (!(f === 0 && Math.abs(i - 5.5) < 1))
gvwBox(g, 2.2, 3.6, 0.1, gvwShine(0x2A3440, 0.2, 0.3), -37 + i * 6.7, 3 + f * 4.6, 23.05);
gvwSolid(x, z, 92, 54, y - 2, y + 40);
gvwRamp(0, -120, 14, 6.4, y + 2.4, y, 0);
gvwDoorTo(G, "laputa", 0, 0, -122.6, 0, "The door of the royal palace", 40, 30, { y: y + 2.4, col: 0x2A2A5A, frame: gvwMat("white") });
gvwSign(G, "THE KING'S PALACE", 8, 1.2, 0, y + 12, -125.9, 0, { bg: "#1E2A5A", ink: "#F0D890" });
},
function (G) {
var blue = gvwMat("bluepaper");
gvwRoomBuild(G, "laputa", 0, 40, 30, 9, { paper: gvwMat("damask"), floor: gvwMat("checker"), day: 0xF8F4EC, out: { x: 0, z: -114, ry: Math.PI }, doorName: "The palace door" });
(function () {
var A = gvwInAt("laputa", 0), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
gvwBox(g, 10, 0.6, 6, gvwMat("velvet"), 0, 0, -12);
var th = new THREE.Group();
th.position.set(0, 0.6, -13.4);
g.add(th);
gvwBox(th, 2.2, 1.0, 1.6, gvwMat("brass"), 0, 0, 0);
gvwBox(th, 2.2, 3.2, 0.3, gvwMat("velvet"), 0, 1.0, -0.7);
gvwBox(th, 2.6, 0.4, 0.4, gvwMat("brass"), 0, 4.2, -0.7);
var t = gvwTable(g, 0, -8, 6, 2.4, 0.85, gvwMat("oak"), gvwMat("greenvelvet"));
for (var i = 0; i < 3; i++) {
var gl = gvwGlobe(g, -2 + i * 2, -8, 0.55, i === 1);
gl.position.y = 0.85;
}
gvwQuadrant(g, 3.6, -8, 0);
gvwTelescope(g, -3.6, -6.6, 0.4, 0.9);
gvwTable(g, 12, -2, 3, 10, 0.8, gvwMat("oak"), gvwLam(0xF4F0E4));
gvwMathDinner(g, 12, 0.82, -4);
gvwMathDinner(g, 12, 0.82, 1);
for (i = 0; i < 5; i++) {
gvwChair(g, 10.2, -6 + i * 2.4, Math.PI / 2, gvwMat("velvet"));
gvwChair(g, 13.8, -6 + i * 2.4, -Math.PI / 2, gvwMat("velvet"));
}
for (i = 0; i < 8; i++) {
gvwCyl(g, 0.5, 0.55, 9, gvwMat("white"), -18 + (i % 4) * 12, 0, i < 4 ? -10 : 8, 12);
}
gvwHarpsichord(g, -14, 4, Math.PI / 2);
for (i = 0; i < 5; i++)
gvwInstrument(g, -12 + i * 1.2, 1.0, 8.5, ["lute", "horn", "viol"][i % 3]);
for (i = 0; i < 6; i++) {
var c = new THREE.Mesh(gvwGeo("cstar", function () { return new THREE.OctahedronGeometry(0.35, 0); }), gvwGlowM(0xFFF0B0));
c.position.set(-15 + i * 6, 8.4, -4 + (i % 2) * 6);
g.add(c);
}
})();
gvwRoomBuild(G, "laputa", 1, 10, 8, 3.6, { paper: blue, out: { x: 120, z: 128, ry: Math.PI }, doorName: "The door, out to the island" });
(function () { var A = gvwInAt("laputa", 1), g = new THREE.Group(); g.position.set(A.x, GVW_IN_Y, A.z); G.add(g); gvwFurnish(g, 10, 8, "laputan", 11); })();
gvwRoomBuild(G, "laputa", 2, 12, 10, 3.8, { paper: gvwMat("plaster"), out: { x: 170, z: 86, ry: Math.PI }, doorName: "The door, out to the island" });
(function () {
var A = gvwInAt("laputa", 2), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
gvwTable(g, 0, -1, 4, 1.6, 0.9, gvwMat("oak"));
for (var i = 0; i < 6; i++)
gvwBox(g, 0.6, 0.08, 1.2, gvwLam([0x1E2A5A, 0x5A1E2A, 0x0E3A4A, 0xE8C860, 0x3A1E5A, 0xF0ECE0][i]), -1.6 + i * 0.6, 0.9, -1);
gvwQuadrant(g, 3, -3.6, 0);
gvwShelves(g, 0, -4.7, 8, 2.6, 0);
gvwBox(g, 0.6, 1.8, 0.5, gvwLam(0xD8C8A8), -4, 0, 2);
})();
gvwRoomBuild(G, "laputa", 3, 20, 16, 7, { paper: gvwMat("bluepaper"), floor: gvwMat("marble"), out: { x: -130, z: 60, ry: Math.PI }, doorName: "The door, out to the island" });
(function () {
var A = gvwInAt("laputa", 3), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
gvwHarpsichord(g, -4, -4, 0);
gvwHarpsichord(g, 4, -4, 0);
gvwRug(g, 0, 0, 10, 8, 0x2A3A6A);
for (var i = 0; i < 14; i++) {
var a = i / 14 * Math.PI + Math.PI;
gvwChair(g, Math.cos(a) * 7, 1 + Math.sin(a) * -5, -a + Math.PI / 2, gvwMat("velvet"));
}
for (i = 0; i < 8; i++)
gvwInstrument(g, -7 + i * 2, 1.0, -6.5, ["lute", "horn", "viol"][i % 3]);
})();
gvwRoomBuild(G, "laputa", 4, 12, 10, 3.8, { paper: gvwMat("greenpaper"), out: { x: -60, z: 252, ry: 0 }, doorName: "The door, out to the island" });
(function () { var A = gvwInAt("laputa", 4), g = new THREE.Group(); g.position.set(A.x, GVW_IN_Y, A.z); G.add(g); gvwFurnish(g, 12, 10, "home", 21); gvwGlobe(g, 4, 2, 0.9, false); gvwShelves(g, -5.6, -1, 3, 2.6, Math.PI / 2); })();
for (var k = 0; k < 4; k++) {
gvwRoomBuild(G, "laputa", 5 + k, 12, 10, 3.6, { paper: [gvwMat("bluepaper"), gvwMat("damask"), gvwMat("greenpaper"), gvwMat("plaster")][k], out: { x: -160, z: 190, ry: Math.PI }, doorName: "The door, out to the island" });
(function (k) { var A = gvwInAt("laputa", 5 + k), g = new THREE.Group(); g.position.set(A.x, GVW_IN_Y, A.z); G.add(g); gvwFurnish(g, 12, 10, "laputan", 40 + k); })(k);
var A2 = gvwInAt("laputa", 5 + k);
gvwCrowd("laph" + k, 2, A2.x - 3, A2.z - 2, A2.x + 3, A2.z + 2, { dress: "gvlaputan", dressF: "gvlaputana", women: 0.5, tilt: 1, flapper: k % 2 === 0, wander: 2, sp: 0.3, feet: GVW_IN_Y + 1, names: ["The master of the house", "The lady of the house"], persona: "laputan", talkP: 1,
says: ["(He is drawing circles on a slate and does not see you. His flapper coughs.) Ah! A visitor. Do you know any music?", "Oh, a stranger! Sit, sit. My husband has not spoken to me since Tuesday: he is working out the orbit of a comet."] });
}
},
function (list) {
var n = 0;
list.forEach(function (g) { n += g.attributes.position.count; });
if (!n)
return null;
var P = new Float32Array(n * 3), N = new Float32Array(n * 3), C = new Float32Array(n * 3), U = new Float32Array(n * 2), o = 0;
list.forEach(function (g) {
var p = g.attributes.position, nn = g.attributes.normal, c = g.attributes.color, u = g.attributes.uv;
for (var i = 0; i < p.count; i++) {
P[(o + i) * 3] = p.getX(i);
P[(o + i) * 3 + 1] = p.getY(i);
P[(o + i) * 3 + 2] = p.getZ(i);
N[(o + i) * 3] = nn.getX(i);
N[(o + i) * 3 + 1] = nn.getY(i);
N[(o + i) * 3 + 2] = nn.getZ(i);
C[(o + i) * 3] = c.getX(i);
C[(o + i) * 3 + 1] = c.getY(i);
C[(o + i) * 3 + 2] = c.getZ(i);
if (u) {
U[(o + i) * 2] = u.getX(i);
U[(o + i) * 2 + 1] = u.getY(i);
}
}
o += p.count;
g.dispose();
});
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(P, 3));
G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
G.setAttribute("color", new THREE.BufferAttribute(C, 3));
G.setAttribute("uv", new THREE.BufferAttribute(U, 2));
G.computeBoundingSphere();
return G;
},
function (geo, M, col, uvm) {
var g = geo.index ? geo.toNonIndexed() : geo;
if (g !== geo)
geo.dispose();
g.applyMatrix4(M);
g.computeVertexNormals();
if (uvm) {
var p = g.attributes.position, u = new Float32Array(p.count * 2);
for (var j = 0; j < p.count; j++) {
u[j * 2] = p.getX(j) / uvm;
u[j * 2 + 1] = p.getZ(j) / uvm;
}
g.setAttribute("uv", new THREE.BufferAttribute(u, 2));
}
var c = new THREE.Color(col), a = new Float32Array(g.attributes.position.count * 3);
for (var i = 0; i < a.length; i += 3) {
a[i] = c.r;
a[i + 1] = c.g;
a[i + 2] = c.b;
}
g.setAttribute("color", new THREE.BufferAttribute(a, 3));
return g;
},
function (list) {
var n = 0;
list.forEach(function (g) { n += g.attributes.position.count; });
var P = new Float32Array(n * 3), N = new Float32Array(n * 3), o = 0;
list.forEach(function (g) { P.set(g.attributes.position.array, o * 3); N.set(g.attributes.normal.array, o * 3); o += g.attributes.position.count; g.dispose(); });
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(P, 3));
G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
G.computeBoundingSphere();
return G;
},
function (G) {
var T = GVW_TOWN, H = gvwLapH, lite = gvwLite(), walls = [], roofs = [], glass = [], doors = [], pave = {}, trim = [], M = new THREE.Matrix4(), S = new THREE.Matrix4(), Q = new THREE.Matrix4();
function Hm(x, z, rr) { var m = H(x, z); for (var k = 0; k < 12; k++) {
var a = k / 12 * 6.283;
for (var f = 0.5; f <= 1; f += 0.5)
m = Math.max(m, H(x + Math.cos(a) * rr * f, z + Math.sin(a) * rr * f));
} return m; }
function place(x, y, z, ry, sx, sy, sz) { M.makeRotationY(ry || 0); M.setPosition(x, y, z); S.makeScale(sx || 1, sy || 1, sz || 1); return M.clone().multiply(S); }
function pp(part, x, z) { var k = Math.floor(x / 160) + "," + Math.floor(z / 160); (pave[k] || (pave[k] = [])).push(part); }
T.rings.forEach(function (rg) {
var n = Math.ceil(2 * Math.PI * rg / 6);
for (var i = 0; i < n; i++) {
var a = (i + 0.5) / n * 2 * Math.PI, x = Math.cos(a) * rg, z = Math.sin(a) * rg;
if (Math.abs(x) < 80 && z < -80 && rg < 170)
continue;
pp(gvwTownPart(new THREE.BoxGeometry(1, 1, 1), place(x, Hm(x, z, 5) - 0.15, z, -a, 6.4, 0.6, 8.2), 0xB8B2A6, 1), x, z);
}
});
T.rad.forEach(function (a) { for (var r = 150; r < 598; r += 6) {
var x = Math.cos(a) * (r + 3), z = Math.sin(a) * (r + 3);
pp(gvwTownPart(new THREE.BoxGeometry(1, 1, 1), place(x, Hm(x, z, 5) - 0.15, z, -a, 6.4, 0.6, 8.2), 0xB0AA9E, 1), x, z);
} });
T.sq.forEach(function (q) {
var g = new THREE.CylinderGeometry(q.r, q.r + 0.4, 0.9, lite ? 16 : 32, 1, true);
q.y = Hm(q.x, q.z, q.r + 0.5) + 0.15;
pp(gvwTownPart(g, place(q.x, q.y - 0.45, q.z, 0, 1, 1, 1), 0xBCB6AA, 1), q.x, q.z);
var tp = new THREE.RingGeometry(0.01, q.r, lite ? 24 : 48, lite ? 8 : 14);
tp.rotateX(-Math.PI / 2);
pp(gvwTownPart(tp, place(q.x, q.y, q.z, 0, 1, 1, 1), 0xBCB6AA, 1), q.x, q.z);
gvwFloor(q.x, q.z, q.r * 2, q.r * 2, q.y, { r: q.r });
var rg = new THREE.TorusGeometry(q.r * 0.55, 0.25, 4, lite ? 20 : 40);
rg.rotateX(Math.PI / 2);
pp(gvwTownPart(rg, place(q.x, q.y + 0.02, q.z, 0, 1, 1, 1), 0x7A7466, 1), q.x, q.z);
});
var keep = [];
T.houses.forEach(function (h) {
var y = H(h.x, h.z);
if (gvwSolidAt(h.x, h.z, y + 0.5) || gvwSolidAt(h.x + h.w / 2, h.z, y + 0.5) || gvwSolidAt(h.x - h.w / 2, h.z, y + 0.5) || gvwSolidAt(h.x, h.z + h.d / 2, y + 0.5) || gvwSolidAt(h.x, h.z - h.d / 2, y + 0.5))
return;
keep.push(h);
var Rr = wRand(h.seed), ry = h.ry + 0.07, base = place(h.x, y - 0.3, h.z, ry, 1, 1, 1);
var b = new THREE.BoxGeometry(1, 1, 1);
b.translate(0, 0.5, 0);
Q.set(1, h.la, 0, 0, 0, 1, 0, 0, 0, h.lb, 1, 0, 0, 0, 0, 1);
b.applyMatrix4(Q);
b.scale(h.w, h.h + 0.3, h.d);
walls.push(gvwTownPart(b, base, h.col));
var c = new THREE.ConeGeometry(0.75, 1, 4, 1);
c.rotateY(Math.PI / 4 + 0.12);
c.translate(0, 0.5, 0);
c.scale(h.w * 1.15, h.h * 0.45, h.d * 1.15);
c.translate(h.h * h.la, h.h + 0.3, h.h * h.lb);
roofs.push(gvwTownPart(c, base, [0x4E5660, 0x5A4A44, 0x4A5A54][h.seed % 3]));
var nx = Math.max(2, Math.floor(h.w / 2.6)), nf = Math.max(1, Math.round(h.h / 3.6));
for (var i = 0; i < nx; i++)
for (var f = 0; f < nf; f++) {
var wy = 1.4 + f * 3.2, wx = -h.w / 2 + (i + 0.5) * h.w / nx, ww = 0.7 + Rr() * 0.6, wh = 0.9 + Rr() * 0.9;
if (f === 0 && i === Math.floor(nx / 2))
continue;
var gw = new THREE.BoxGeometry(ww, wh, 0.08);
gw.rotateZ((Rr() - 0.5) * 0.3);
gw.translate(wx + wy * h.la, wy + 0.3, h.d / 2 + 0.03 + wy * h.lb);
glass.push(gvwTownPart(gw, base, 0x2A3440));
var fr = new THREE.BoxGeometry(ww + 0.2, 0.12, 0.18);
fr.translate(wx + wy * h.la, wy + 0.3 - wh / 2 - 0.06, h.d / 2 + 0.06 + wy * h.lb);
trim.push(gvwTownPart(fr, base, 0xE8E2D4));
}
var dx = -h.w / 2 + (Math.floor(nx / 2) + 0.5) * h.w / nx, dg = new THREE.BoxGeometry(1.2, 2.3, 0.1);
dg.translate(dx + 1.15 * h.la, 1.15 + 0.3, h.d / 2 + 0.04 + 1.15 * h.lb);
doors.push(gvwTownPart(dg, base, [0x2A3A6A, 0x6A2A3A, 0x3A5A3A, 0x5A4A2A][h.seed % 4]));
gvwSolid(h.x, h.z, h.w + 0.6, h.d + 0.6, y - 2, y + h.h + 3, h.ry);
});
T.kept = keep.length;
function mesh(list, mat) { var g = gvwTownMerge(list); if (!g)
return null; var m = new THREE.Mesh(g, mat); m.receiveShadow = true; m.castShadow = !lite; m.matrixAutoUpdate = false; m.updateMatrix(); G.add(m); return m; }
var pm = gvwTownMat(gvwMat("paving"));
if (pm.specular) {
pm.specular.setHex(0x161616);
pm.shininess = 6;
}
Object.keys(pave).forEach(function (k) { var pv = mesh(pave[k], pm); if (pv)
pv.userData.notGround = 1; });
var gpm = gvwMat("paving");
G.traverse(function (m) { if (m.isMesh && m.material === gpm)
m.userData.notGround = 1; });
mesh(walls, gvwTownMat(gvwS("b:stucco", 0xFFFFFF, 3)));
mesh(roofs, gvwTownMat(gvwMat("slate")));
mesh(trim, new THREE.MeshLambertMaterial({ vertexColors: true }));
mesh(doors, gvwTownMat(gvwMat("oak")));
var gm = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.15, metalness: 0.35 });
gm.userData.noPhoto = 1;
if (typeof glassEnv === "function") {
var hook = function () { var e = glassEnv(); if (!e)
return false; gm.envMap = e; gm.envMapIntensity = 0.8; gm.needsUpdate = true; return true; };
if (!hook()) {
var tries = 0, iv = setInterval(function () { if (hook() || ++tries > 60)
clearInterval(iv); }, 2000);
}
}
mesh(glass, gm);
(function () {
var y = GVW_LGAL, lr = GVW_LR, bench = [], back = [], post = [], head = [], tub = [], bloom = [], n = lite ? 96 : 300;
for (var i = 0; i < n; i++) {
var a = i / n * 2 * Math.PI + 0.013;
if (Math.abs(Math.sin(a) - 1) < 0.0012)
continue;
var k = i % 3, x = Math.cos(a) * (lr - 3), z = Math.sin(a) * (lr - 3), ry = Math.PI / 2 - a + Math.PI;
if (k === 0) {
bench.push({ x: x, z: z, y: y + 0.45, s: 1, ry: ry });
back.push({ x: x - Math.cos(a) * 0.24, z: z - Math.sin(a) * 0.24, y: y + 0.55, s: 1, ry: ry });
gvwRound(x, z, 1.1, y - 1, y + 1);
}
else if (k === 1) {
var lx = Math.cos(a) * (lr - 2.2), lz = Math.sin(a) * (lr - 2.2);
post.push({ x: lx, z: lz, y: y, s: 1, ry: 0 });
head.push({ x: lx, z: lz, y: y + 3.2, s: 1, ry: 0 });
gvwRound(lx, lz, 0.2, y - 1, y + 4);
}
else {
var tx = Math.cos(a) * (lr - 1.6), tz = Math.sin(a) * (lr - 1.6);
tub.push({ x: tx, z: tz, y: y, s: 1, ry: a });
bloom.push({ x: tx, z: tz, y: y + 0.62, s: 1, ry: a * 3 });
gvwRound(tx, tz, 0.45, y - 1, y + 1);
}
}
gvwInst(G, gvwGeo("tgbench", function () { return new THREE.BoxGeometry(2.2, 0.08, 0.5); }), gvwMat("oak"), bench, {});
gvwInst(G, gvwGeo("tgback", function () { var b = new THREE.BoxGeometry(2.2, 0.5, 0.06); b.translate(0, 0.25, 0); return b; }), gvwMat("oak"), back, {});
gvwInst(G, gvwGeo("tgpost", function () { var c = new THREE.CylinderGeometry(0.06, 0.09, 3.2, 8); c.translate(0, 1.6, 0); return c; }), gvwMat("iron"), post, {});
gvwInst(G, gvwGeo("tghead", function () { return new THREE.BoxGeometry(0.34, 0.4, 0.34); }), gvwLam(0xF0D8A0, { e: 0xC8A060 }), head, {});
gvwInst(G, gvwGeo("tgtub", function () { var c = new THREE.CylinderGeometry(0.4, 0.32, 0.5, 12); c.translate(0, 0.25, 0); return c; }), gvwMat("terracotta"), tub, {});
gvwInst(G, gvwGeo("tgbloom", function () { var p = []; for (var f = 0; f < 5; f++) {
var b = new THREE.SphereGeometry(0.16, 7, 5);
b.translate(Math.cos(f * 1.3) * 0.22, 0, Math.sin(f * 1.3) * 0.22);
p.push(b.toNonIndexed());
} return gvwTownMergePlain(p); }), gvwLam(0xD85A6A), bloom, {});
gvwCrowd("lapgal2", lite ? 10 : 34, -660, -660, 660, 660, { dress: "gvlaputan", dressF: "gvlaputana", tilt: 1, flapper: 1, feet: GVW_LGAL + 1, wander: 5, ok: function (x, z) { var r = Math.hypot(x, z); return r > 609 && r < 640; },
names: ["A gentleman on the gallery", "A lady taking the air", "An angler"], persona: "laputan", says: ["The clouds are below us today. One forgets they are clouds.", "My husband has not looked down in eleven years. He says there is nothing there that cannot be calculated.", "They bite best when the island passes over the sea."] });
})();
[[-123, 630], [201, 610], [29, 643], [-300, 575], [330, 560]].forEach(function (k, i) {
var a = Math.atan2(k[1], k[0]), tx = Math.cos(a) * (GVW_LR - 2.4), tz = Math.sin(a) * (GVW_LR - 2.4), y = GVW_LGAL;
if (typeof gvwTelescope === "function")
gvwTelescope(G, tx, tz, -a + Math.PI / 2, lite ? 2 : 3, y);
for (var j = 0; j < (lite ? 1 : 2); j++) {
var b = a + (j ? 0.006 : -0.006), px = Math.cos(b) * (GVW_LR - 5.5), pz = Math.sin(b) * (GVW_LR - 5.5);
var P = gvwPerson("tgaz" + i + "_" + j, px, pz, y, { dress: "gvlaputan", sex: j ? "f" : "m" }, Math.atan2(tx - px, tz - pz) + (j ? 0.6 : -0.6));
if (P && j === 0)
gvwTalk(P, "A stargazer at the rail", gvwPersona("laputan"), ["The comet is due in thirty-one years. We have checked the sum four hundred times.", "Look: the sun is a little smaller than yesterday. I am almost sure of it.", "Down there they plough with hogs. Up here we plough with numbers."][i % 3], 2.8);
}
});
T.sq.forEach(function (q, qi) { gvwTownSquare(G, q, qi); });
gvwCrowd("laptown", lite ? 14 : 34, -560, -560, 560, 560, { dress: "gvlaputan", dressF: "gvlaputana", tilt: 1, flapper: 1, wander: 6,
ok: function (x, z) { return gvwTownStreet(x, z) && !gvwSolidAt(x, z, H(x, z) + 0.5); },
names: ["A Laputian gentleman", "A mathematician", "A courtier", "A lady of the town", "A musician", "A tailor with his quadrant", "A cook's boy"], persona: "laputan",
says: ["(He walks with his eyes on the sky until his flapper taps his shoulder at the corner.) Ah. The street turns. Thank you, Bliffmarklub.", "Every street here runs true to the compass, sir. The houses, I grant you, do not.", "(Humming.) The fourth note of the scale is off today. Can you not hear it?", "My husband is at his figures. He has been at his figures since Michaelmas.", "The tailor measured me with a quadrant and a pair of compasses. The coat came six days later and fits nobody.", "Mutton in triangles, beef in rhomboides! Fresh this morning!"] });
},
function (G, q, qi) {
var H = function (x, z) { return q.y; }, lite = gvwLite(), y = H(q.x, q.z), oak = gvwMat("oak"), iron = gvwMat("iron"), brass = gvwMat("brass"), R = wRand(900 + qi);
var face = Math.atan2(-q.x, -q.z);
function stall(ax, title, fill) {
var sx = q.x + Math.sin(face + ax) * (q.r - 5), sz = q.z + Math.cos(face + ax) * (q.r - 5), g = new THREE.Group();
g.position.set(sx, H(sx, sz), sz);
g.rotation.y = face + ax + Math.PI;
G.add(g);
gvwBox(g, 3.2, 0.9, 1.2, oak, 0, 0, 0);
[-1.5, 1.5].forEach(function (e) { gvwBox(g, 0.12, 2.6, 0.12, oak, e, 0, 0.5); gvwBox(g, 0.12, 2.6, 0.12, oak, e, 0, -0.5); });
var aw = gvwBox(g, 3.6, 0.08, 1.8, gvwLam([0x2A3A6A, 0x6A2A3A, 0x3A5A3A, 0x5A3A6A][qi % 4]), 0, 2.6, 0);
aw.rotation.x = -0.18;
fill(g);
gvwRound(sx, sz, 1.9, H(sx, sz) - 1, H(sx, sz) + 3);
return g;
}
stall(-0.6, "cook", function (g) {
var meat = gvwLam(0xA84A3A), beef = gvwLam(0x7A3A2A), pud = gvwLam(0xD8B878), pl = gvwLam(0xE8E4DA);
for (var k = 0; k < 3; k++) {
gvwCyl(g, 0.28, 0.28, 0.04, pl, -1.0 + k * 1.0, 0.9, 0.1, 16);
}
var tri = new THREE.Mesh(gvwGeo("ltri", function () { var s = new THREE.Shape(); s.moveTo(-0.2, -0.12); s.lineTo(0.2, -0.12); s.lineTo(0, 0.23); s.lineTo(-0.2, -0.12); var e = new THREE.ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: false }); e.rotateX(-Math.PI / 2); return e; }), meat);
tri.position.set(-1.0, 0.95, 0.1);
g.add(tri);
var rh = new THREE.Mesh(gvwGeo("lrho", function () { var s = new THREE.Shape(); s.moveTo(-0.24, -0.1); s.lineTo(0.12, -0.1); s.lineTo(0.24, 0.1); s.lineTo(-0.12, 0.1); s.lineTo(-0.24, -0.1); var e = new THREE.ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: false }); e.rotateX(-Math.PI / 2); return e; }), beef);
rh.position.set(0, 0.95, 0.1);
g.add(rh);
var cy = new THREE.Mesh(gvwGeo("lcyc", function () { var s = new THREE.Shape(); s.moveTo(-0.22, 0); for (var t = 0; t <= 1.0001; t += 0.1) {
var th = t * 2 * Math.PI;
s.lineTo(-0.22 + (th - Math.sin(th)) * 0.07, (1 - Math.cos(th)) * 0.07);
} s.lineTo(-0.22, 0); var e = new THREE.ExtrudeGeometry(s, { depth: 0.14, bevelEnabled: false }); e.translate(0, 0, -0.07); return e; }), pud);
cy.position.set(1.0, 0.93, 0.1);
g.add(cy);
gvwSign(g, "MUTTON · BEEF · PUDDING, CUT TRUE", 2.8, 0.45, 0, 2.25, 0.62, 0, { bg: "#F2EAD4", ink: "#2A2A4A" });
});
stall(0.6, "instruments", function (g) {
var gl = new THREE.Mesh(gvwGeo("lglobe", function () { return new THREE.SphereGeometry(0.28, 16, 12); }), gvwLam(0x6A8AA8));
gl.position.set(-0.9, 1.25, 0);
g.add(gl);
gvwCyl(g, 0.05, 0.08, 0.3, brass, -0.9, 0.9, 0, 8);
var qd = new THREE.Mesh(gvwGeo("lquad", function () { return new THREE.CircleGeometry(0.35, 12, 0, Math.PI / 2); }), brass);
qd.position.set(0.1, 1.0, 0.1);
qd.rotation.x = -0.5;
g.add(qd);
for (var k = 0; k < 3; k++) {
var c = gvwBox(g, 0.03, 0.4, 0.03, brass, 0.8 + k * 0.18, 0.9, 0.1);
c.rotation.z = 0.3 * (k % 2 ? 1 : -1);
}
gvwSign(g, "INSTRUMENTS · MATHEMATICAL & MUSICAL", 2.8, 0.45, 0, 2.25, 0.62, 0, { bg: "#E8E0D0", ink: "#2A2A4A" });
});
[-2.2, 2.2].forEach(function (ax) {
var bx = q.x + Math.sin(face + ax) * (q.r - 3.5), bz = q.z + Math.cos(face + ax) * (q.r - 3.5), g = new THREE.Group();
g.position.set(bx, H(bx, bz), bz);
g.rotation.y = face + ax + Math.PI;
G.add(g);
gvwBox(g, 2.2, 0.08, 0.5, oak, 0, 0.45, 0);
gvwBox(g, 2.2, 0.5, 0.06, oak, 0, 0.55, -0.24);
[-0.95, 0.95].forEach(function (e) { gvwBox(g, 0.08, 0.45, 0.45, iron, e, 0, 0); });
gvwRound(bx, bz, 1.1, H(bx, bz) - 1, H(bx, bz) + 1);
});
var mg = new THREE.Group();
mg.position.set(q.x + 3, y, q.z + 3);
G.add(mg);
gvwCyl(mg, 0.6, 0.75, 1.0, gvwMat("ashlar"), 0, 0, 0, 12);
gvwCyl(mg, 0.55, 0.55, 0.05, brass, 0, 1.0, 0, 20);
var gn = new THREE.Mesh(gvwGeo("gnomon", function () { var s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(0.45, 0); s.lineTo(0, 0.38); s.lineTo(0, 0); return new THREE.ExtrudeGeometry(s, { depth: 0.02, bevelEnabled: false }); }), brass);
gn.position.set(-0.2, 1.05, 0);
mg.add(gn);
gvwRound(q.x + 3, q.z + 3, 0.9, y - 1, y + 2);
if (!lite && qi % 2 === 0 && typeof gvwTelescope === "function")
gvwTelescope(G, q.x - 5, q.z + 4, qi * 0.7, 3, H(q.x - 5, q.z + 4));
var mx = q.x + Math.sin(face + Math.PI) * (q.r - 6), mz = q.z + Math.cos(face + Math.PI) * (q.r - 6);
for (var k = 0; k < (lite ? 1 : 2); k++) {
var px = mx + k * 1.4, pz = mz;
var P = gvwPerson("tmus" + qi + "_" + k, px, pz, H(px, pz), { dress: "gvlaputan", sex: k ? "f" : "m" }, face);
if (P && P.g && typeof gvwInstrument === "function")
gvwInstrument(P.g, 0.25, 1.1, 0.25, k ? "lute" : "viol");
if (P && k === 0)
gvwTalk(P, "A musician of the square", gvwPersona("laputan"), "(He tunes a string, very carefully, to a star.) The music of the spheres, sir. We play it every evening, so the court need not stop thinking.", 2.8);
}
},
function (G) {
var lite = gvwLite(), y = GVW_LGAL, oak = gvwMat("oak"), iron = gvwMat("iron"), brass = gvwMat("brass"), n = 0;
function at(a, r) { return [Math.sin(a) * r, Math.cos(a) * r]; }
for (var i = -6; i <= 6; i++) {
if (i === 0 || (lite && i % 2))
continue;
var a = i * 0.045, ry = a + Math.PI;
if (i % 2 === 0) {
var p = at(a, GVW_LR - 3), g = new THREE.Group();
g.position.set(p[0], y, p[1]);
g.rotation.y = ry;
G.add(g);
gvwBox(g, 2.2, 0.08, 0.5, oak, 0, 0.45, 0);
gvwBox(g, 2.2, 0.5, 0.06, oak, 0, 0.55, -0.24);
[-0.95, 0.95].forEach(function (e) { gvwBox(g, 0.08, 0.45, 0.45, iron, e, 0, 0); });
gvwRound(p[0], p[1], 1.1, y - 1, y + 1);
}
else {
var q = at(a, GVW_LR - 2.2), lg = new THREE.Group();
lg.position.set(q[0], y, q[1]);
G.add(lg);
gvwCyl(lg, 0.06, 0.09, 3.2, iron, 0, 0, 0, 8);
gvwBox(lg, 0.34, 0.4, 0.34, gvwLam(0xF0D8A0, { e: 0xC8A060 }), 0, 3.2, 0);
gvwBox(lg, 0.42, 0.06, 0.42, iron, 0, 3.6, 0);
gvwRound(q[0], q[1], 0.2, y - 1, y + 4);
var t = at(a + 0.022, GVW_LR - 1.6), tb = new THREE.Group();
tb.position.set(t[0], y, t[1]);
G.add(tb);
gvwCyl(tb, 0.4, 0.32, 0.5, gvwMat("terracotta"), 0, 0, 0, 12);
for (var fl = 0; fl < 5; fl++) {
var b = new THREE.Mesh(new THREE.SphereGeometry(0.16, 7, 5), gvwLam([0xC83A4A, 0xE8C040, 0x8A5AC8, 0xE87A3A][(fl + i + 8) % 4]));
b.position.set(Math.cos(fl * 1.3) * 0.22, 0.62, Math.sin(fl * 1.3) * 0.22);
tb.add(b);
}
gvwRound(t[0], t[1], 0.45, y - 1, y + 1);
}
}
[-0.33, 0.33].forEach(function (a) {
var p = at(a, GVW_LR - 2.4), g = new THREE.Group();
g.position.set(p[0], y, p[1]);
g.rotation.y = a;
G.add(g);
[0, 2.09, 4.19].forEach(function (b) { var l = gvwBox(g, 0.05, 1.5, 0.05, oak, Math.cos(b) * 0.3, 0, Math.sin(b) * 0.3); l.rotation.z = Math.cos(b) * 0.18; l.rotation.x = -Math.sin(b) * 0.18; });
var tube = gvwCyl(g, 0.07, 0.11, 1.8, brass, 0, 1.3, 0.2, 12);
tube.rotation.x = -1.0;
gvwRound(p[0], p[1], 0.5, y - 1, y + 2);
});
},
function (G) {
var lite = gvwLite();
var ad = gvwM("adamantC", function () { var m = new THREE.MeshPhongMaterial({ color: 0x7A8090, shininess: 90, specular: 0xC8CCD8, side: THREE.BackSide }); m.userData.noPhoto = 1; return m; });
var dome = new THREE.Mesh(gvwGeo("cdome", function () { return new THREE.SphereGeometry(GVW_CAVE_R, 48, 20, 0, Math.PI * 2, 0, Math.PI / 2); }), ad);
dome.scale.y = 0.62;
G.add(dome);
var fl = new THREE.Mesh(gvwGeo("cfloor", function () { return new THREE.CircleGeometry(GVW_CAVE_R, 48); }), gvwShine(0x5A6070, 0.35, 0.5));
fl.rotation.x = -Math.PI / 2;
G.add(fl);
for (var i = 1; i < 5; i++) {
var rg = new THREE.Mesh(gvwGeo("cring" + i, function () { var g = new THREE.RingGeometry(i * 8 - 0.15, i * 8 + 0.15, 96, 1); g.rotateX(-Math.PI / 2); return g; }), gvwMat("brass"));
rg.position.y = 0.02;
G.add(rg);
}
for (i = 0; i < 20; i++) {
var a = i / 20 * Math.PI * 2, x = Math.cos(a) * (GVW_CAVE_R - 4), z = Math.sin(a) * (GVW_CAVE_R - 4);
var lg = new THREE.Group();
lg.position.set(x, 0, z);
G.add(lg);
gvwCyl(lg, 0.12, 0.2, 4.2, gvwMat("brass"), 0, 0, 0, 8);
gvwCyl(lg, 0.5, 0.25, 0.4, gvwMat("brass"), 0, 4.2, 0, 12);
var fla = new THREE.Mesh(gvwGeo("lampf", function () { return new THREE.SphereGeometry(0.32, 12, 8); }), gvwGlowM(0xFFE6A0));
fla.position.y = 4.8;
fla.scale.y = 1.4;
lg.add(fla);
if (!lite && i % 5 === 0) {
var L = new THREE.PointLight(0xFFE0A0, 0.9, 60);
L.position.set(0, 5.2, 0);
lg.add(L);
}
gvwRound(x, z, 0.5);
}
var hp = new THREE.Group();
hp.position.set(0, 0, 0);
G.add(hp);
var adm = gvwShine(0x6A7080, 0.25, 0.7);
for (i = 0; i < 8; i++) {
var a2 = i / 8 * Math.PI * 2;
gvwCyl(hp, 0.5, 0.7, 5.5, adm, Math.cos(a2) * 5.5, 0, Math.sin(a2) * 5.5, 10);
gvwRound(Math.cos(a2) * 5.5, Math.sin(a2) * 5.5, 0.8);
}
var hoop = new THREE.Mesh(gvwGeo("hoop", function () { var outer = new THREE.CylinderGeometry(5.5, 5.5, 1.2, 48, 1, true); return outer; }), gvwM("hoopM", function () { var m = new THREE.MeshStandardMaterial({ color: 0x6A7080, roughness: 0.25, metalness: 0.7, side: THREE.DoubleSide }); m.userData.noPhoto = 1; return m; }));
hoop.position.y = 6.1;
hp.add(hoop);
var hr = new THREE.Mesh(gvwGeo("hooprim", function () { var g = new THREE.RingGeometry(4.3, 5.5, 48, 1); g.rotateX(-Math.PI / 2); return g; }), adm);
hr.position.y = 6.7;
hp.add(hr);
var hr2 = hr.clone();
hr2.position.y = 5.5;
hp.add(hr2);
var groove = new THREE.Mesh(gvwGeo("groove", function () { return new THREE.TorusGeometry(5.1, 0.12, 6, 64); }), gvwMat("brass"));
groove.rotation.x = Math.PI / 2;
groove.position.y = 6.1;
hp.add(groove);
var axle = gvwCyl(hp, 0.22, 0.22, 10.4, adm, 0, 0, 0, 10);
axle.rotation.x = Math.PI / 2;
axle.position.set(0, 6.1, 0);
var piv = new THREE.Group();
piv.position.set(0, 6.1, 0);
piv.userData.live = 1;
G.add(piv);
var st = new THREE.Mesh(gvwGeo("shuttle", function () { var pts = []; for (var k = 0; k <= 20; k++) {
var t = k / 20, y = (t - 0.5) * 5.5, r = 1.35 * Math.pow(Math.sin(t * Math.PI), 0.8) + 0.05;
pts.push(new THREE.Vector2(r, y));
} var g = new THREE.LatheGeometry(pts, 28); g.rotateZ(Math.PI / 2); return g; }), gvwM("lodeM", function () {
var t = gvwCanvas("lode", 256, 256, function (c, W, H) { c.fillStyle = "#2A2A30"; c.fillRect(0, 0, W, H); gvwNoise(c, W, H, 4000, 0.5, 8, "120,120,140"); gvwNoise(c, W, H, 1200, 0.4, 9, "20,20,20"); });
var m = new THREE.MeshStandardMaterial({ color: 0x8A8A98, map: t, roughness: 0.4, metalness: 0.8 });
m.userData.noPhoto = 1;
return m;
}));
piv.add(st);
[[-2.9, 0xC83A2A], [2.9, 0x2A5AC8]].forEach(function (q) { var cap = new THREE.Mesh(gvwGeo("lcap", function () { return new THREE.SphereGeometry(0.22, 10, 8); }), gvwShine(q[1], 0.3, 0.4)); cap.position.x = q[0]; piv.add(cap); });
GVW.stone = piv;
piv.rotation.z = GVW.stoneTilt || 0;
gvwRound(0, 0, 6.4, -1, 8);
gvwBox(G, 16, 5.5, 4, gvwMat("ashlar"), 0, 0, -11);
gvwFloor(0, -11, 16, 4, 5.5);
gvwRamp(-9.5, -6, 3, 10, 5.5, 0, 0);
for (i = 0; i < 11; i++)
gvwBox(G, 3, 0.5 * (11 - i), 0.9, gvwMat("ashlar"), -9.5, 0, -10.5 + i * 0.9);
gvwSolid(0, -11, 16, 4, -1, 5.4);
gvwBox(G, 8, 1, 0.12, gvwMat("brass"), 0, 5.5, -9.0);
gvwSolid(0, -8.9, 8, 0.3, 5, 7);
for (i = 0; i < 6; i++) {
var tx = -28 + (i % 3) * 5, tz = -14 + Math.floor(i / 3) * 10;
if (i % 2)
gvwQuadrant(G, tx, tz, i);
else
gvwTelescope(G, tx, tz, i * 0.7, 0.9);
}
for (i = 0; i < 4; i++) {
var gl = gvwGlobe(G, -30 + i * 3, 4 + (i % 2) * 3, 0.9, i % 2 === 0);
}
for (i = 0; i < 5; i++) {
var as = new THREE.Group();
as.position.set(-18 + i * 2.4, 0, -30);
G.add(as);
gvwBox(as, 0.8, 1.0, 0.6, gvwMat("oak"), 0, 0, 0);
var ab = new THREE.Mesh(gvwGeo("astro", function () { return new THREE.TorusGeometry(0.4, 0.04, 6, 24); }), gvwMat("brass"));
ab.position.y = 1.5;
as.add(ab);
var ab2 = ab.clone();
ab2.rotation.y = Math.PI / 2;
as.add(ab2);
}
gvwTelescope(G, -14, -22, 0.6, 0.9);
gvwSign(G, "MARS, AND HIS TWO SATELLITES", 4, 0.6, -14, 3.4, -24.5, 0, { bg: "#101828", ink: "#E8C880" });
(function () {
var t = gvwCanvas("marsc", 512, 256, function (c, W, H) {
c.fillStyle = "#0A0E1A";
c.fillRect(0, 0, W, H);
c.fillStyle = "#C8603A";
c.beginPath();
c.arc(W / 2, H / 2, 26, 0, 7);
c.fill();
c.strokeStyle = "rgba(232,200,128,.7)";
c.lineWidth = 1.5;
[78, 130].forEach(function (r) { c.beginPath(); c.arc(W / 2, H / 2, r, 0, 7); c.stroke(); });
c.fillStyle = "#E8E0C8";
c.beginPath();
c.arc(W / 2 + 78, H / 2, 5, 0, 7);
c.fill();
c.beginPath();
c.arc(W / 2 - 92, H / 2 - 92, 4, 0, 7);
c.fill();
c.font = "14px Georgia";
c.fillText("3 diameters · 10 hours", W / 2 + 40, H / 2 + 30);
c.fillText("5 diameters · 21½ hours", W / 2 - 200, H / 2 - 100);
});
var m = new THREE.Mesh(new THREE.PlaneGeometry(4, 2), gvwLam(0xFFFFFF, { map: t, mapk: "marsc" }));
m.position.set(-14, 4.6, -24.4);
G.add(m);
})();
gvwTable(G, 20, -6, 5, 2, 0.9, gvwMat("oak"), gvwMat("greenvelvet"));
for (i = 0; i < 6; i++)
gvwBox(G, 0.5, 0.12 + i * 0.02, 0.7, gvwLam([0x6A1E1E, 0x1E3A2A, 0x2A2A4A][i % 3]), 18 + i * 0.7, 0.9, -6);
gvwShelves(G, 24, -14, 6, 3.4, -0.4);
gvwShelves(G, 27, -4, 6, 3.4, -Math.PI / 2 + 0.2);
(function () {
var t = gvwCanvas("starc", 512, 512, function (c, W, H) {
c.fillStyle = "#0E1630";
c.fillRect(0, 0, W, H);
var R = wRand(12);
c.fillStyle = "#F0E0A0";
for (var i = 0; i < 900; i++) {
c.beginPath();
c.arc(R() * W, R() * H, 0.4 + R() * 1.8, 0, 7);
c.fill();
}
c.strokeStyle = "rgba(240,224,160,.4)";
for (i = 0; i < 6; i++) {
c.beginPath();
c.arc(W / 2, H / 2, 60 + i * 40, 0, 7);
c.stroke();
}
c.strokeStyle = "rgba(240,224,160,.8)";
for (i = 0; i < 8; i++) {
var a = R() * 6.283;
c.beginPath();
c.ellipse(W / 2, H / 2, 240, 40 + R() * 60, a, 0, 7);
c.stroke();
}
});
var m = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), gvwLam(0xFFFFFF, { map: t, mapk: "starc" }));
m.position.set(28, 6, -16);
m.rotation.y = -0.9;
G.add(m);
})();
gvwSign(G, "10,000 FIXED STARS · 93 COMETS", 5, 0.7, 20, 2.2, -7.05, 0, { bg: "#E8E0D0", ink: "#1E2A5A" });
var sg = new THREE.Group();
sg.position.set(0, 0, 38);
G.add(sg);
for (i = 0; i < 10; i++)
gvwBox(sg, 4, 0.4 * (i + 1), 0.8, gvwMat("ashlar"), 0, 0, -i * 0.0 + i * 0.8 - 4);
gvwSpot(0, 36, 2, "The stair up to the island", "climb up", function () { gvwGo("chasm", "☀️ <b>Up into the daylight</b>, by the chasm in the middle of the island.", gvbPopulate); }, 0);
gvwCrowd("ast", lite ? 3 : 6, -26, -26, 26, 20, { dress: "gvlaputan", tilt: 1, flapper: 1, women: 0, wander: 5, ok: function (x, z) { return Math.hypot(x, z) > 9 && Math.hypot(x, z + 11) > 6; }, names: ["An astronomer", "A keeper of the stone", "An observer of comets"], persona: "astronomer",
says: ["The stone is level: the island stands still.", "Attracting end down, and we sink; repelling end down, and we rise. A child could do it, if it knew which end was which.", "The sun is going out, sir. Slowly. Very slowly. But surely."] });
},
function (x, z) {
var n = gvwFbm(x * 0.006, z * 0.006, 4), h = 2 + n * 10;
var ld = Math.hypot(x, z - 250);
h += 34 * gvwSmooth(130, 0, ld) * (0.8 + n * 0.3);
var md = Math.hypot(x - 800, z + 840);
h += 150 * gvwSmooth(330, 0, md);
var cd = Math.hypot(x, z + 130);
h = h + (3 - h) * gvwSmooth(300, 200, cd);
var kd = Math.hypot(x - 400, z + 540);
h = h + (5 - h) * gvwSmooth(160, 90, kd);
h = h + (-7 - h) * gvwSmooth(520, 600, z);
var rd = gvwPathD(x, z, GVW_RIVER);
if (rd < 26)
h = Math.min(h, h + ((-1.6) - h) * gvwSmooth(26, 9, rd));
return h;
},
function (G) {
var lite = gvwLite(), H = gvwBalH, R = wRand(9090);
gvwTerrain(G, -950, -950, 1900, 1900, lite ? 20 : 12, H, gvwMat("earth"), function (x, z, y, c) {
var n = gvwFbm(x * 0.02, z * 0.02, 3), kd = Math.hypot(x - 400, z + 540);
if (y < 1) {
c.setRGB(0.86, 0.8, 0.64);
return;
}
if (kd < 200) {
c.setRGB(0.42 + n * 0.12, 0.66 + n * 0.14, 0.3);
return;
}
if (y > 60) {
c.setRGB(0.62 + n * 0.1, 0.6 + n * 0.1, 0.56);
return;
}
if (Math.hypot(x, z + 130) < 230) {
c.setRGB(0.64 + n * 0.1, 0.6 + n * 0.1, 0.5);
return;
}
c.setRGB(0.62 + n * 0.16, 0.54 + n * 0.12, 0.4 + n * 0.08);
});
gvwStrip(G, gvwDense(GVW_RIVER, 8), 22, function (x, z) { return H(x, z) + 1.4; }, gvwWaterM(0x4A6A7A, 0.85), 0);
GVW.water.push(G.children[G.children.length - 1]);
gvwWater(G, 0, 760, 1900, 440, 0, 0x2A5A7A, 0.84);
var far = new THREE.Mesh(new THREE.PlaneGeometry(9000, 4000), gvwLam(0x2A5470));
far.rotation.x = -Math.PI / 2;
far.position.set(0, -0.05, 2900);
G.add(far);
GVW_ROADS.forEach(function (r) { gvwStrip(G, gvwDense(r, 6), 6, function (x, z) { return H(x, z) + 0.05; }, gvwMat("gravel"), 0.05); });
for (var i = 0; i < 56; i++) {
var a = i / 56 * Math.PI * 2, wx = Math.sin(a) * 292, wz = -130 - Math.cos(a) * 292;
if (i % 7 === 3 && i !== 0)
continue;
if (Math.abs(Math.sin(a)) < 0.05 && Math.cos(a) > 0)
continue;
var hh = i % 5 === 2 ? 3 : 7;
var wb = gvwBox(G, 33, hh, 3, gvwMat("ruin"), wx, H(wx, wz) - 0.5, wz, -a);
gvwSolid(wx, wz, 33, 3, H(wx, wz) - 1, H(wx, wz) + hh, -a);
}
(function () { var x = 0, z = -322, y = H(x, z), g = new THREE.Group(); g.position.set(x, y, z); G.add(g); [-1, 1].forEach(function (k) { gvwBox(g, 6, 12, 6, gvwMat("ruin"), k * 6, 0, 0); gvwSolid(x + k * 6, z, 6, 6, y - 1, y + 12); }); gvwBox(g, 18, 3, 6, gvwMat("ruin"), 0, 9, 0); gvwSign(G, "LAGADO", 4, 0.8, 0, y + 8, -318.9, 0, { bg: "#E8E0D0" }); })();
gvwLagado(G, H, R);
gvwManor(G, H, 60, -170, 0, 15, "The door of Lord Munodi's house", 1);
gvwAcademy(G, H);
var furrows = [];
for (i = 0; i < (lite ? 120 : 300); i++) {
var fx = -40 + R() * 300, fz = -460 + R() * 120;
if (gvwPathD(fx, fz, GVW_ROADS[0]) < 8)
continue;
furrows.push({ x: fx, z: fz, y: H(fx, fz), s: 1 + R(), ry: 0.4 + R() * 0.2 });
}
gvwInst(G, gvwGeo("furrow", function () { var b = new THREE.BoxGeometry(0.5, 0.3, 6); b.translate(0, 0.05, 0); return b; }), gvwMat("earth"), furrows, {});
var tools = [];
for (i = 0; i < 40; i++)
tools.push({ x: -30 + R() * 280, z: -450 + R() * 100, y: 0, s: 1, ry: R() * 3 });
tools.forEach(function (t) { t.y = H(t.x, t.z); });
gvwInst(G, gvwGeo("spade", function () { var p = []; var h = new THREE.CylinderGeometry(0.03, 0.03, 1.3, 5); h.translate(0, 0.65, 0); p.push(h.toNonIndexed()); var b = new THREE.BoxGeometry(0.25, 0.3, 0.03); b.translate(0, 0.1, 0); p.push(b.toNonIndexed()); var g = gwMerge(p); g.rotateZ(0.4); return g; }), gvwMat("iron"), tools, {});
gvwCrowd("fld", lite ? 8 : 18, -30, -470, 250, -360, { dress: "gvrag", dressF: "gvragf", wander: 8, sp: 1.1, names: ["A labourer", "A ploughman with a new plough", "A woman digging"], persona: "ragged", says: ["New method. Can't stop. The Academy says it will double the crop in a year, or ten.", "Dig, and fill, and dig again. They say it improves the soil.", "No corn this year, nor grass. But next year!"] });
gvwManor(G, H, 400, -560, 0, 16, "The door of Lord Munodi's country house", 1.3);
gvwEstate(G, H, R);
gvwMills(G, H);
var trees = gvwScatter(9101, lite ? 120 : 300, -940, -940, 940, 520, function (x, z) { return !gvwBalBusy(x, z) && H(x, z) > 1.5 && H(x, z) < 90; }, H, 0.7, 1.3);
gvwPlant(G, "tree", trees.filter(function (t, i) { return i % 3 === 0; }), { col: 0x6A8A4A, keepAll: 1 });
gvwPlant(G, "conifer", trees.filter(function (t, i) { return i % 3 === 1; }), { keepAll: 1 });
gvwPlant(G, "bush", trees.filter(function (t, i) { return i % 3 === 2; }), { col: 0x6A7A3A });
trees.forEach(function (t, i) { if (i % 3 !== 2)
gvwRound(t.x, t.z, 0.6 * t.s, t.y - 1, t.y + 10); });
gvwPlant(G, "rock", gvwScatter(9103, lite ? 60 : 140, 500, -950, 950, -500, function (x, z) { return H(x, z) > 30; }, H, 1, 3), { mat: gvwMat("rock") });
gvwPlant(G, "grass", gvwScatter(9105, lite ? 300 : 900, -900, -900, 900, 520, function (x, z) { return !gvwBalBusy(x, z) && H(x, z) > 1; }, H, 0.7, 1.3), { col: 0xB8B888 });
gvwMaldonada(G, H, R);
var isl = gvwIslandModel(560);
isl.position.set(-120, 620, -260);
isl.userData.y0 = 620;
G.add(isl);
GVW.isle = isl;
var hl = gvwChainSeat(G, 0, 0, 0, 10);
hl.position.set(0, H(0, 210), 206);
hl.visible = false;
GVW.seatB = hl;
},
function (G, H, x, z, ry, slot, name, sc) {
sc = sc || 1;
var y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.scale.setScalar(sc);
G.add(g);
var W = 30, D = 16, h = 11;
gvwBox(g, W + 2, 1, D + 2, gvwMat("granite"), 0, -0.5, 0);
gvwBox(g, W, h, D, gvwMat("ashlar"), 0, 0.5, 0);
gvwBox(g, W + 1, 0.8, D + 1, gvwMat("white"), 0, h + 0.5, 0);
var rf = new THREE.Mesh(gvwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), gvwMat("slate"));
rf.scale.set(W + 2, 4.5, D + 2);
rf.position.y = h + 1.3;
g.add(rf);
for (var i = 0; i < 8; i++)
gvwBox(g, 0.8, h, 0.4, gvwMat("white"), -W / 2 + 1 + i * (W - 2) / 7, 0.5, D / 2 + 0.2);
for (var f = 0; f < 2; f++)
for (i = 0; i < 7; i++) {
if (f === 0 && i === 3)
continue;
gvwBox(g, 1.6, 3, 0.1, gvwShine(0x2A3440, 0.2, 0.3), -W / 2 + 3 + i * (W - 6) / 6, 2 + f * 4.8, D / 2 + 0.06);
gvwBox(g, 2.0, 0.25, 0.3, gvwMat("white"), -W / 2 + 3 + i * (W - 6) / 6, 5.1 + f * 4.8, D / 2 + 0.15);
}
var pd = new THREE.Mesh(gvwGeo("mped", function () { var s = new THREE.Shape(); s.moveTo(-6, 0); s.lineTo(6, 0); s.lineTo(0, 2.6); s.lineTo(-6, 0); return new THREE.ExtrudeGeometry(s, { depth: 0.6, bevelEnabled: false }); }), gvwMat("white"));
pd.position.set(0, h + 1.3, D / 2 - 0.3);
g.add(pd);
for (i = 0; i < 4; i++)
gvwBox(g, 10 - i * 0.8, 0.25 * (i + 1), 0.6, gvwMat("white"), 0, -0.5, D / 2 + 2.2 - i * 0.6);
gvwSolid(x, z, (W + 2) * sc, (D + 2) * sc, y - 2, y + h * sc + 6, ry || 0);
var ca = Math.cos(ry || 0), sa = Math.sin(ry || 0), fr = (D / 2 + 0.3) * sc;
gvwDoorTo(G, "balnibarbi", slot, x + sa * fr, z + ca * fr, ry || 0, name, 22, 16, { y: y + 0.5, frame: gvwMat("white"), col: 0x2A3A2A });
},
function (G, H, R) {
var lite = gvwLite(), list = [];
for (var ix = -6; ix <= 6; ix++)
for (var iz = -6; iz <= 5; iz++) {
var x = ix * 26 + (iz % 2) * 8, z = -130 + iz * 28;
if (Math.abs(x) < 10)
continue;
if (Math.hypot(x - 60, z + 170) < 30)
continue;
if (x < -170 && z > -280)
continue;
if (Math.hypot(x, z + 130) > 235)
continue;
if (R() < 0.15)
continue;
list.push([x, z]);
}
list.forEach(function (q, i) {
var x = q[0], z = q[1], y = H(x, z), w = 9 + R() * 6, d = 8 + R() * 4, h = 5 + R() * 8, g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = (R() - 0.5) * 0.3 + (i % 2 ? Math.PI : 0);
G.add(g);
var col = [0xC8B8A0, 0xB8A890, 0xD0C0A0, 0xA89880, 0xC0B0A0][i % 5];
gvwBox(g, w, h, d, gvwS("b:stucco", col, 3), 0, 0, 0);
var rk = R();
if (rk < 0.45) {
var rf = new THREE.Mesh(gvwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), gvwMat("terracotta"));
rf.scale.set(w + 0.8, 3 + R() * 2, d + 0.8);
rf.position.y = h;
rf.rotation.z = (R() - 0.5) * 0.12;
g.add(rf);
}
else if (rk < 0.8) {
var hr = gvwBox(g, w * 0.5, 0.3, d + 0.6, gvwMat("terracotta"), -w * 0.25, h, 0);
hr.rotation.z = 0.5;
for (var k = 0; k < 5; k++) {
var ra = gvwBox(g, 0.15, 0.15, d + 0.4, gvwMat("darkbark"), k * w * 0.1, h + 0.6 + k * 0.4, 0);
}
}
else {
for (k = 0; k < 6; k++) {
var ra2 = gvwBox(g, 0.15, 0.15, d, gvwMat("darkbark"), -w / 2 + k * w / 5, h, 0);
ra2.rotation.x = (R() - 0.5) * 0.4;
}
}
for (k = 0; k < Math.floor(w / 3); k++) {
var wx = -w / 2 + 1.5 + k * 3;
gvwBox(g, 1.1, 1.4, 0.08, R() < 0.3 ? gvwMat("planks") : gvwShine(0x1A1A20, 0.4, 0.1), wx, h * 0.6, d / 2 + 0.02);
if (h > 8)
gvwBox(g, 1.1, 1.4, 0.08, gvwShine(0x1A1A20, 0.4, 0.1), wx, h * 0.25 + 0.8, d / 2 + 0.02);
}
var cr = gvwBox(g, 0.08, h * 0.6, 0.04, gvwLam(0x3A3028), w * 0.3, h * 0.2, d / 2 + 0.03);
cr.rotation.z = 0.3;
if (R() < 0.2) {
for (k = 0; k < 4; k++) {
gvwBox(g, 0.15, h + 2, 0.15, gvwMat("darkbark"), -w / 2 + k * w / 3, 0, d / 2 + 1.4);
}
gvwBox(g, w, 0.12, 1.2, gvwMat("planks"), 0, h * 0.5, d / 2 + 1.4);
}
gvwSolid(x, z, w + 0.6, d + 0.6, y - 1, y + h + 3, g.rotation.y);
var dd = d / 2 + 0.3, ry = g.rotation.y;
gvwDoorTo(G, "balnibarbi", 18 + (i % 3), x + Math.sin(ry) * dd, z + Math.cos(ry) * dd, ry, "The door of a house in Lagado", 12, 10, { col: 0x4A3A2A, frame: gvwMat("ruin") });
});
for (var k = 0; k < 3; k++) {
gvwRoomBuild(G, "balnibarbi", 18 + k, 12, 10, 3.4, { paper: gvwMat("plaster"), wall: gvwMat("ruin"), floor: gvwMat("planks"), out: { x: 0, z: -60, ry: 0 }, doorName: "The door, out to the street" });
(function (k) {
var A = gvwInAt("balnibarbi", 18 + k), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
gvwFurnish(g, 12, 10, "poor", 80 + k);
gvwCrowd("lagh" + k, 2, A.x - 3, A.z - 2, A.x + 3, A.z + 2, { dress: "gvrag", dressF: "gvragf", women: 0.5, wander: 2, sp: 0.3, feet: GVW_IN_Y + 1, talkP: 1, names: ["A man of Lagado at home", "A woman of Lagado at home"], persona: "ragged",
says: ["Sit, if you can find a stool that stands. My husband pulled the old ones apart: the Academy has a new way to make chairs.", "We tore down the old house and built it again by the new rules. It leaks, but the rules are excellent."] });
})(k);
}
gvwCrowd("lag", lite ? 18 : 40, -220, -330, 220, 80, { dress: "gvrag", dressF: "gvragf", sp: 1.3, wander: 16, ok: function (x, z) { return Math.hypot(x, z + 130) < 230 && !gvwSolidAt(x, z, H(x, z) + 0.5); },
names: ["A man of Lagado", "A woman of Lagado", "A projector's clerk", "A beggar", "A builder of the new method"], persona: "ragged",
says: ["Can't stop! The scheme! The scheme!", "My house? Pulled down. The new method will build it better, when it is finished.", "Spare a farthing for a projector, sir? For the encouragement of ingenuity?", "The Academy will make us all rich. In a few years.", "Look at that roof. Built from the top down. Like the bees."] });
},
function (G, H) {
var x0 = -230, lite = gvwLite(), y = H(x0, -120);
gvwStrip(G, gvwDense([[x0, -30], [x0, -260]], 8), 10, function (x, z) { return H(x, z) + 0.06; }, gvwMat("paving"), 0.06);
(function () { var g = new THREE.Group(); g.position.set(x0, H(x0, -36), -36); G.add(g); [-1, 1].forEach(function (k) { gvwCyl(g, 0.7, 0.8, 8, gvwMat("ashlar"), k * 6, 0, 0, 10); gvwRound(x0 + k * 6, -36, 0.9); }); gvwBox(g, 14, 1.6, 1.4, gvwMat("ashlar"), 0, 8, 0); })();
gvwSign(G, "THE GRAND ACADEMY OF LAGADO", 9, 1.2, x0, H(x0, -36) + 10.4, -35.2, 0, { bg: "#2A1E14", ink: "#E8C878" });
GVW_ACAD.forEach(function (A, i) {
var east = i >= 8, k = east ? i - 8 : i, z = -60 - k * 26, x = east ? x0 + 24 : x0 - 24, ry = east ? -Math.PI / 2 : Math.PI / 2, yy = H(x, z), g = new THREE.Group();
g.position.set(x, yy, z);
g.rotation.y = ry;
G.add(g);
gvwBox(g, 22, 9 + k % 3, 16, gvwS("b:stucco", [0xC8B898, 0xB8A888, 0xD0C0A0][k % 3], 3), 0, 0, 0);
var rf = new THREE.Mesh(gvwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), gvwMat("slate"));
rf.scale.set(23, 3.5, 17);
rf.position.y = 9 + k % 3;
g.add(rf);
for (var w = 0; w < 5; w++)
if (w !== 2)
gvwBox(g, 1.4, 2, 0.08, gvwShine(0x2A2A30, 0.3, 0.2), -8 + w * 4, 3, 8.02);
gvwBox(g, 1.2, 4, 1.2, gvwMat("brick"), 6, 9 + k % 3, -3);
if (!lite || i % 3 === 0)
gvwSmoke(g, 6, 13 + k % 3, -3, 0x5A5A5A, 5);
gvwSolid(x, z, 16, 22, yy - 1, yy + 14);
gvwSign(G, A[1], 5, 0.6, x + (east ? -8.2 : 8.2), yy + 5.2, z, ry, { bg: "#F0E6CC", ink: "#3A2A1A" });
var dx = x + (east ? -8.4 : 8.4);
gvwDoorTo(G, "balnibarbi", i, dx, z, ry, "The door of " + A[1].toLowerCase(), 16, 12, { y: yy, col: 0x3A2A1A });
gvwRoomBuild(G, "balnibarbi", i, 16, 12, 4.2, { paper: gvwMat("plaster"), floor: gvwMat("planks"), out: { x: dx + (east ? -1.6 : 1.6), z: z, ry: ry + Math.PI }, doorName: "The door, out to the Academy street" });
var Ai = gvwInAt("balnibarbi", i), rg = new THREE.Group();
rg.position.set(Ai.x, GVW_IN_Y, Ai.z);
G.add(rg);
try {
gvwAcadFill(rg, A[0], Ai);
}
catch (e) {
if (window.console)
console.warn("[gulliver] academy", A[0], e);
}
});
gvwCrowd("acad", lite ? 6 : 12, x0 - 8, -260, x0 + 8, -40, { dress: "gvproj", dressF: "gvragf", women: 0.15, sp: 1.2, wander: 10, names: ["A projector", "A student of the Academy", "A projector with a petition"], persona: "projector", says: ["My project wants only a little money, sir, for the encouragement of ingenuity.", "I have a scheme for making the sea flat. Calm, I mean. Permanently.", "I was once a man of business. Now I am a man of projects!"] });
},
function (P, kind, x, z, ry, y) {
var g = new THREE.Group();
g.position.set(x, y || 0, z);
g.rotation.y = ry || 0;
P.add(g);
var col = kind === "hog" ? 0xE8B0A0 : kind === "sheep" ? 0xE8D0C0 : 0x8A6A4A, m = gvwLam(col), s = kind === "dog" ? 0.7 : 1;
gvwEll(g, m, 0.35 * s, 0.32 * s, 0.6 * s, 0, 0.62 * s, 0);
gvwEll(g, m, 0.2 * s, 0.2 * s, 0.24 * s, 0, 0.75 * s, 0.62 * s);
if (kind === "hog") {
gvwCyl(g, 0.09, 0.1, 0.1, gvwLam(0xD89080), 0, 0.68, 0.84, 10).rotation.x = Math.PI / 2;
}
if (kind === "dog") {
gvwEll(g, m, 0.06, 0.16, 0.06, 0.12, 0.92, 0.6, 6);
gvwEll(g, m, 0.06, 0.16, 0.06, -0.12, 0.92, 0.6, 6);
}
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { gvwCyl(g, 0.06 * s, 0.05 * s, 0.45 * s, m, q[0] * 0.2 * s, 0, q[1] * 0.38 * s, 6); });
return g;
},
function (g, k, A) {
var R = wRand(k.length * 31), wd = gvwMat("oak"), glass = gvwShine(0xB8D0C8, 0.1, 0.1);
var proj = function (name, greet, x, z, o) { var P = gvwPerson("ac" + k + (o && o.n || ""), A.x + x, A.z + z, GVW_IN_Y, { dress: (o && o.dress) || "gvproj", sex: (o && o.sex) || "m", beard: (o && o.beard) || null }, (o && o.ry) || 0); gvwTalk(P, name, gvwPersona("projector"), greet, 3.2); return P; };
var bench = function (x, z, w) { gvwTable(g, x, z, w || 3, 1.0, 0.9, wd); };
switch (k) {
case "sunbeams":
bench(0, -3, 5);
for (var i = 0; i < 14; i++) {
var c = new THREE.Mesh(gvwGeo("cuc", function () { var e = new THREE.CylinderGeometry(0.06, 0.06, 0.36, 8); return e; }), gvwLam(0x3A6A2A));
c.rotation.z = Math.PI / 2;
c.position.set(-2 + i * 0.3, 0.97, -3.2);
g.add(c);
}
for (i = 0; i < 10; i++) {
var ph = gvwCyl(g, 0.08, 0.1, 0.4, gvwM("phial", function () { var m = new THREE.MeshPhongMaterial({ color: 0xFFE890, emissive: 0x6A5A10, transparent: true, opacity: 0.7 }); m.userData.noPhoto = 1; return m; }), -2 + i * 0.45, 0.9, -2.6, 10);
}
proj("The projector of sunbeams", "Eight years, sir, eight years upon this project: to extract sunbeams out of cucumbers, put them in phials hermetically sealed, and let them out to warm the air in raw inclement summers.", 0, -1.4, { beard: "full", ry: Math.PI });
break;
case "ordure":
for (i = 0; i < 5; i++)
gvwCyl(g, 0.5, 0.45, 0.8, gvwMat("oak"), -4 + i * 2, 0, -3.5, 12);
bench(3, 1, 3);
proj("The oldest student of the Academy", "(He is filthy from head to foot and greets you with a close embrace.) Welcome! My project is to return a certain thing to the food it came from. Sit down, sit down.", -1, -1, { beard: "full", ry: Math.PI });
break;
case "ice":
gvwFire(g, 0, 0, -4, 1.0);
gvwBox(g, 2.4, 1.6, 1.2, gvwMat("brick"), 0, 0, -5);
for (i = 0; i < 6; i++)
gvwBox(g, 0.5, 0.5, 0.5, gvwM("iceb", function () { var m = new THREE.MeshPhongMaterial({ color: 0xD8ECF8, shininess: 90, transparent: true, opacity: 0.8 }); m.userData.noPhoto = 1; return m; }), -3 + i * 0.8, 0, -2.4);
for (i = 0; i < 4; i++)
gvwCyl(g, 0.3, 0.3, 0.6, gvwLam(0x3A3A3A), 2 + i * 0.8, 0, -2.2, 10);
proj("The calciner of ice", "Gunpowder, sir, from ice, by calcining it. I have also written a treatise on the malleability of fire, which I intend to publish.", 0, 0, { ry: Math.PI });
break;
case "roof":
var hz = new THREE.Group();
hz.position.set(0, 4.2, -2);
g.add(hz);
var rr = new THREE.Mesh(gvwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), gvwMat("terracotta"));
rr.scale.set(3, 1.4, 3);
rr.rotation.x = Math.PI;
hz.add(rr);
gvwBox(hz, 2.6, 1.0, 2.6, gvwMat("brick"), 0, -2.4, 0);
for (i = 0; i < 4; i++)
gvwCyl(g, 0.02, 0.02, 1.2, gvwLam(0x6A5A4A), -1.2 + i * 0.8, 3.0, -2, 4);
proj("The ingenious architect", "A new method of building houses, by beginning at the roof and working downward to the foundation. The two prudent insects, the bee and the spider, do the same.", 2, 1, { ry: Math.PI * 0.8 });
break;
case "colours":
for (i = 0; i < 16; i++) {
var pc = ["#C8302A", "#2A5AC8", "#E8C030", "#3A8A3A", "#8A3AA8", "#E87A2A", "#2A2A2A", "#F4F4F0"][i % 8];
gvwCyl(g, 0.15, 0.13, 0.2, gvwLam(parseInt(pc.slice(1), 16)), -3 + (i % 8) * 0.8, 0.9, -3 + Math.floor(i / 8) * 0.6, 10);
}
bench(0, -2.8, 7);
proj("The blind master", "(He is blind from his birth, and so are his apprentices.) I mix colours for painters, by feeling and smelling. A little mistaken now and then. But the professor himself is generally mistaken also.", 0, -1.2, { ry: Math.PI, beard: "full" });
gvwCrowd("acb", 3, A.x - 4, A.z - 1, A.x + 4, A.z + 3, { dress: "gvrag", women: 0, wander: 2, sp: 0.2, feet: GVW_IN_Y + 1, names: ["A blind apprentice"], persona: "projector", talkP: 0.5, says: ["This one smells of red. I think."] });
break;
case "hogs":
gvwBox(g, 14, 0.1, 8, gvwMat("earth"), 0, 0, -1);
for (i = 0; i < 6; i++)
gvwBeast(g, "hog", -5 + i * 2, -2 + (i % 2) * 2, R() * 6);
for (i = 0; i < 30; i++) {
var ac = new THREE.Mesh(gvwGeo("acorn", function () { return new THREE.SphereGeometry(0.05, 6, 4); }), gvwLam(0x7A5A2A));
ac.position.set(-6 + R() * 12, 0.12, -4 + R() * 6);
g.add(ac);
}
proj("The projector of hog-ploughing", "Bury acorns, dates, chestnuts in an acre of ground, six inches apart, eight deep: drive in six hundred hogs, and in a few days they root it all up and dung it besides. Saves ploughs and cattle and labour!", 5, 3, { ry: Math.PI * 1.2 });
break;
case "spiders":
for (i = 0; i < 12; i++) {
var wb = new THREE.Mesh(gvwGeo("web", function () { var gg = new THREE.CircleGeometry(0.9, 8); return gg; }), gvwM("webM", function () { var t = gvwCanvas("webt", 128, 128, function (c, W, H) { c.clearRect(0, 0, W, H); c.strokeStyle = "rgba(240,240,240,.8)"; for (var a = 0; a < 8; a++) {
c.beginPath();
c.moveTo(W / 2, H / 2);
c.lineTo(W / 2 + Math.cos(a / 8 * 6.283) * 60, H / 2 + Math.sin(a / 8 * 6.283) * 60);
c.stroke();
} for (var r = 8; r < 60; r += 8) {
c.beginPath();
c.arc(W / 2, H / 2, r, 0, 7);
c.stroke();
} }); var m = new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide, depthWrite: false }); m.userData.noPhoto = 1; return m; }));
wb.position.set(-7.5 + (i % 2) * 15, 1.5 + R() * 2.4, -5 + i * 0.8);
wb.rotation.y = Math.PI / 2;
g.add(wb);
}
for (i = 0; i < 8; i++) {
var fl = new THREE.Mesh(gvwGeo("fly", function () { return new THREE.SphereGeometry(0.04, 6, 4); }), gvwLam([0xC82A2A, 0x2A5AC8, 0xE8C030, 0x3A8A3A][i % 4]));
fl.position.set(-2 + R() * 4, 1 + R() * 2, -3 + R() * 4);
g.add(fl);
}
proj("The projector of spiders", "Why employ silkworms, when we have such plenty of domestic insects who could both spin and weave? Feed them flies of the right colours, and they spin it already dyed.", 0, 0, { ry: Math.PI });
break;
case "dial":
var wc = new THREE.Group();
wc.position.set(0, 0, -3);
g.add(wc);
gvwCyl(wc, 0.06, 0.06, 3, gvwMat("iron"), 0, 0, 0, 6);
var ar = gvwBox(wc, 1.6, 0.08, 0.3, gvwMat("brass"), 0, 3, 0);
var dl = gvwCyl(wc, 0.5, 0.5, 0.06, gvwMat("brass"), 0, 3.08, 0, 20);
proj("An astronomer of the Academy", "I am putting a sundial upon the great weathercock of the town-house, adjusting the annual and diurnal motions of the earth and sun, so as to answer and coincide with all accidental turnings of the wind.", 2, 0, { ry: -Math.PI / 2 });
break;
case "bellows":
gvwBox(g, 1.4, 0.6, 0.6, wd, 0, 0, -2.6);
var bl = new THREE.Mesh(gvwGeo("bellow", function () { return new THREE.ConeGeometry(0.6, 1.6, 4); }), gvwMat("leather"));
bl.rotation.z = Math.PI / 2;
bl.position.set(-2, 1, -2.6);
g.add(bl);
gvwBeast(g, "dog", 1.5, -2, 0.3);
proj("A great physician", "I cure colics by contrary operations, with a large pair of bellows, sir. Mostly. The dog is quite well, I assure you.", 0, 0, { ry: Math.PI, beard: "full" });
break;
case "marble":
for (i = 0; i < 6; i++)
gvwBox(g, 0.7, 0.5, 0.7, gvwMat("marble"), -3 + i * 1.2, 0, -3);
for (i = 0; i < 8; i++) {
var pn = gvwEll(g, gvwLam([0xC86A8A, 0xF0E0D0, 0x8AA8C8][i % 3]), 0.18, 0.1, 0.18, -2 + i * 0.5, 0.98, -1.2, 10);
}
bench(0, -1.2, 5);
proj("The softener of marble", "I am softening marble, sir, for pillows and pincushions. It takes a long while. Feel this one. No, it is not soft yet.", 0, 0.4, { ry: Math.PI });
break;
case "sheep":
gvwBox(g, 14, 0.1, 8, gvwLam(0x8A9A5A), 0, 0, -1);
for (i = 0; i < 5; i++)
gvwBeast(g, "sheep", -4 + i * 2, -2 + (i % 2) * 2, R() * 6);
proj("The breeder of sheep", "I hope to propagate the breed of naked sheep throughout the kingdom. Two, so far. Rather cold, poor things.", 4, 3, { ry: Math.PI * 1.2 });
break;
case "engine":
(function () {
var F = new THREE.Group();
F.position.set(0, 0, -1.5);
g.add(F);
var t = gvwCanvas("words", 512, 512, function (c, W, H) {
c.fillStyle = "#E8DCC0";
c.fillRect(0, 0, W, H);
var R2 = wRand(3), sy = ["the", "of", "moon", "and", "seven", "wise", "shoe", "run", "in", "green", "at", "sing", "flat", "king", "bone", "to"];
c.font = "14px Georgia";
c.fillStyle = "#2A1A10";
for (var yy = 0; yy < 16; yy++)
for (var xx = 0; xx < 12; xx++) {
c.strokeStyle = "rgba(60,40,20,.5)";
c.strokeRect(xx * 42 + 2, yy * 32 + 2, 40, 30);
c.fillText(sy[Math.floor(R2() * sy.length)], xx * 42 + 5, yy * 32 + 20);
}
});
var fr = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), gvwLam(0xFFFFFF, { map: t, mapk: "words" }));
fr.position.set(0, 2.3, 0);
F.add(fr);
gvwBox(F, 6.3, 0.2, 0.3, wd, 0, 0.2, 0);
gvwBox(F, 6.3, 0.2, 0.3, wd, 0, 4.3, 0);
[-3.1, 3.1].forEach(function (xx) { gvwBox(F, 0.2, 4.4, 0.3, wd, xx, 0, 0); });
for (var h = 0; h < 10; h++) {
var hd = gvwCyl(F, 0.03, 0.03, 0.6, gvwMat("iron"), -3.3 + h % 2 * 6.6, 0.5 + Math.floor(h / 2) * 0.75, 0.3, 5);
hd.rotation.x = Math.PI / 2;
}
F.userData.live = 1;
GVW.engine = F;
})();
proj("The professor of the Engine", "By my contrivance the most ignorant person, at a reasonable charge, and with a little bodily labour, may write books in philosophy, poetry, politics, law, mathematics, and theology, without the least assistance from genius or study.", 3.6, 1, { beard: "full", ry: -Math.PI / 2 });
gvwCrowd("acpup", gvwLite() ? 6 : 12, A.x - 4, A.z, A.x + 4, A.z + 3, { dress: "gvrag", women: 0, wander: 1, sp: 0.2, feet: GVW_IN_Y + 1, names: ["A pupil at the Engine"], persona: "projector", talkP: 0.4, says: ["(Turning a handle.) Thirty-six turns a day, sir. Six hours."] });
break;
case "language":
for (i = 0; i < 6; i++) {
var pk = gvwBox(g, 0.8, 0.8, 0.5, gvwLam(0x6A5A3A), -3 + i * 1.2, 0, -3.4);
}
for (i = 0; i < 10; i++)
gvwBox(g, 0.2 + R() * 0.4, 0.2 + R() * 0.4, 0.2 + R() * 0.4, gvwLam([0x8A3A2A, 0x3A5A8A, 0xC8A840, 0x5A8A3A][i % 4]), -3 + R() * 6, 0, -1 + R() * 2);
proj("A sage with his pack", "(He opens his pack, takes out a hat, a spoon and a little bird, and shows them to you one after another, in silence. Then he waits for your answer.)", -1, 1, { beard: "full", ry: Math.PI * 0.7 });
proj("Another sage with his pack", "(He sets down a candlestick and a plum. You understand he is asking whether you have dined.)", 1.4, 1, { n: "b", ry: -Math.PI * 0.7 });
break;
case "wafer":
bench(0, -2, 4);
for (i = 0; i < 12; i++) {
var wf = gvwCyl(g, 0.08, 0.08, 0.01, gvwLam(0xF0E8D0), -1.6 + (i % 6) * 0.6, 0.92, -2.2 + Math.floor(i / 6) * 0.4, 12);
}
gvwCyl(g, 0.12, 0.14, 0.3, gvwShine(0x4A2A6A, 0.2, 0.1), 1.6, 0.9, -2, 10);
proj("The professor of mathematics", "Each proposition and demonstration is written on a thin wafer, with ink composed of a cephalic tincture. The student swallows it upon a fasting stomach, and for three days eats nothing but bread and water.", 0, -0.4, { ry: Math.PI });
break;
case "politics":
gvwTable(g, 0, -1, 6, 2, 0.85, wd, gvwMat("greenvelvet"));
for (i = 0; i < 6; i++)
gvwChair(g, -2.4 + i * 1.0, -2.4, 0, gvwMat("velvet"));
proj("The professor of politics", "Our professors propose schemes for persuading monarchs to choose favourites for their wisdom, capacity and virtue. They are all quite mad, of course. And now we come to the matter of discovering plots...", 0, 0.8, { ry: Math.PI, beard: "full" });
proj("Another projector of politics", "I have a very good scheme: tax every man by the vote of his neighbours for his own good qualities. Wit, valour and politeness. He will pay gladly!", 3, 0.8, { n: "c", ry: Math.PI });
break;
}
},
function (G, H, R) {
var lite = gvwLite(), x0 = 400, z0 = -560;
var av = [];
for (var i = 0; i < 16; i++) {
[-1, 1].forEach(function (k) { var x = x0 + k * 8, z = z0 + 26 + i * 12; av.push({ x: x, z: z, y: H(x, z), s: 1, ry: 0 }); });
}
gvwPlant(G, "tree", av, { col: 0x3A6A2A, keepAll: 1 });
av.forEach(function (t) { gvwRound(t.x, t.z, 0.6, t.y - 1, t.y + 10); });
(function () { var x = x0, z = z0 + 50, y = H(x, z), g = new THREE.Group(); g.position.set(x, y, z); G.add(g); gvwCyl(g, 5, 5.4, 0.8, gvwMat("ashlar"), 0, 0, 0, 24); var w = new THREE.Mesh(gvwGeo("fountw", function () { return new THREE.CircleGeometry(4.8, 24); }), gvwWaterM(0x6A8AA8, 0.85)); w.rotation.x = -Math.PI / 2; w.position.y = 0.7; g.add(w); GVW.water.push(w); gvwCyl(g, 0.5, 0.7, 3, gvwMat("ashlar"), 0, 0.8, 0, 12); gvwCyl(g, 1.6, 0.4, 0.4, gvwMat("ashlar"), 0, 3.6, 0, 16); gvwRound(x, z, 5.4, y - 1, y + 1); })();
[-1, 1].forEach(function (k) { for (var r = 0; r < 4; r++)
for (var c = 0; c < 3; c++) {
var x = x0 + k * (40 + c * 16), z = z0 - 14 + r * 14;
gvwBox(G, 12, 0.6, 10, gvwLam(0x3A5A2A), x, H(x, z) - 0.2, z);
gvwPlant(G, "flowers", gvwScatter(9300 + r * 10 + c + (k > 0 ? 50 : 0), 12, x - 5, z - 4, x + 5, z + 4, null, H, 0.7, 1.0), { col: ["#F0C8E0", "#F8E070", "#E8F0FF", "#F08A6A"][(r + c) % 4] });
} });
var vines = [];
for (i = 0; i < (lite ? 140 : 320); i++) {
var vx = x0 - 170 + (i % 20) * 8, vz = z0 + 120 + Math.floor(i / 20) * 5;
if (vz > z0 + 200)
break;
vines.push({ x: vx, z: vz, y: H(vx, vz), s: 1, ry: 0 });
}
gvwInst(G, gvwGeo("vine", function () { var p = []; var s = new THREE.CylinderGeometry(0.04, 0.05, 1.4, 4); s.translate(0, 0.7, 0); p.push(s.toNonIndexed()); var b = new THREE.IcosahedronGeometry(0.5, 0); b.scale(1.6, 0.7, 0.6); b.translate(0, 1.3, 0); p.push(b.toNonIndexed()); return gwMerge(p); }), gvwLam(0x4A7A2A), vines, {});
var corn = [];
for (i = 0; i < (lite ? 300 : 800); i++) {
var cx = x0 + 60 + R() * 170, cz = z0 + 110 + R() * 110;
corn.push({ x: cx, z: cz, y: H(cx, cz), s: 0.8 + R() * 0.4, ry: R() * 3 });
}
gvwPlant(G, "grass", corn, { col: 0xE8D070, keepAll: 1 });
gvwPlant(G, "flowers", gvwScatter(9351, lite ? 60 : 160, x0 - 180, z0 - 160, x0 + 180, z0 - 60, null, H, 0.7, 1.0), { col: "#F8F0A0" });
var grove = gvwScatter(9361, lite ? 40 : 90, x0 - 200, z0 - 200, x0 + 200, z0 - 80, function (x, z) { return Math.hypot(x - x0, z - z0) > 40; }, H, 0.9, 1.4);
gvwPlant(G, "tree", grove, { col: 0x4A7A34, keepAll: 1 });
grove.forEach(function (t) { gvwRound(t.x, t.z, 0.7 * t.s, t.y - 1, t.y + 10); });
gvwCrowd("est", lite ? 6 : 12, x0 - 180, z0 + 60, x0 + 220, z0 + 220, { dress: "gvsea", dressF: "gvlady", women: 0.4, names: ["One of Lord Munodi's tenants", "A vine-dresser", "A reaper"], persona: "townsman", says: ["My lord farms the old way. Our neighbours laugh at us, and they are hungry.", "Good grapes this year, as every year.", "The projectors call us ignorant. Well, we eat."] });
[15, 16].forEach(function (slot) {
gvwRoomBuild(G, "balnibarbi", slot, 22, 16, 6, { paper: slot === 15 ? gvwMat("damask") : gvwMat("greenpaper"), floor: gvwMat("marble"), out: slot === 15 ? { x: 60, z: -146, ry: 0 } : { x: 400, z: -532, ry: 0 }, doorName: "The door, out" });
var A = gvwInAt("balnibarbi", slot), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
gvwRug(g, 0, 0, 10, 7, slot === 15 ? 0x6A2A2A : 0x2A4A3A);
gvwTable(g, 0, -3, 6, 2, 0.8, gvwMat("oak"), gvwLam(0xF4F0E4));
for (var i = 0; i < 6; i++)
gvwChair(g, -2.5 + i, -1.6, 0, gvwMat("velvet"));
gvwShelves(g, -10.6, 0, 6, 3, Math.PI / 2);
gvwShelves(g, 10.6, 0, 6, 3, -Math.PI / 2);
gvwFire(g, 0, 0, -7.2, 0.9);
gvwBox(g, 3, 1.8, 0.7, gvwMat("marble"), 0, 0, -7.6);
for (i = 0; i < 4; i++) {
var pt = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.2), gvwLam([0x6A7A5A, 0x8A6A4A, 0x5A6A8A, 0x7A5A4A][i]));
pt.position.set(-6 + i * 4, 3, -7.9);
g.add(pt);
gvwBox(g, 1.8, 1.4, 0.06, gvwMat("brass"), -6 + i * 4, 2.3, -7.95);
}
gvwCrowd("mun" + slot, 3, A.x - 6, A.z - 2, A.x + 6, A.z + 5, { dress: "gvflap", dressF: "gvlady", women: 0.5, wander: 3, sp: 0.3, feet: GVW_IN_Y + 1, names: ["A servant of Lord Munodi", "Lady Munodi's waiting-woman"], persona: "townsman", talkP: 1, says: ["My lord will see you in the hall.", "Everything here is done as it was done in my grandfather's day. My lord likes it so."] });
});
},
function (G, H) {
var x = 568, z = -590, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = -0.5;
G.add(g);
gvwBox(g, 12, 8, 10, gvwMat("stone"), 0, 0, 0);
var rf = new THREE.Mesh(gvwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), gvwMat("slate"));
rf.scale.set(13, 4, 11);
rf.position.y = 8;
g.add(rf);
var wh = new THREE.Group();
wh.position.set(-7.2, 3.5, 0);
wh.userData.live = 1;
g.add(wh);
var rim = new THREE.Mesh(gvwGeo("wheel", function () { return new THREE.TorusGeometry(3.4, 0.2, 6, 24); }), gvwMat("oak"));
rim.rotation.y = Math.PI / 2;
wh.add(rim);
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2, p = gvwBox(wh, 0.8, 0.1, 1.2, gvwMat("oak"), 0, 0, 0);
p.position.set(0, Math.sin(a) * 3.4, Math.cos(a) * 3.4);
p.rotation.x = a;
}
GVW.wheel = wh;
gvwSolid(x, z, 13, 13, y - 1, y + 12, -0.5);
gvwDoorTo(G, "balnibarbi", 17, x + Math.sin(-0.5) * 5.3 + Math.cos(-0.5) * 2, z + Math.cos(-0.5) * 5.3 - Math.sin(-0.5) * 2, -0.5, "The door of the old mill", 12, 10, { col: 0x5A4A3A, frame: gvwMat("stone") });
gvwRoomBuild(G, "balnibarbi", 17, 12, 10, 5, { wall: gvwMat("stone"), floor: gvwMat("planks"), out: { x: 556, z: -588, ry: 0 }, doorName: "The door, out to the river" });
(function () {
var A = gvwInAt("balnibarbi", 17), r = new THREE.Group();
r.position.set(A.x, GVW_IN_Y, A.z);
G.add(r);
gvwCyl(r, 1.2, 1.2, 0.5, gvwMat("granite"), 0, 0.5, -2, 20);
gvwCyl(r, 1.2, 1.2, 0.5, gvwMat("granite"), 0, 1.0, -2, 20);
gvwBox(r, 1.2, 0.5, 1.2, gvwMat("oak"), 0, 0, -2);
for (var i = 0; i < 8; i++)
gvwBox(r, 0.7, 0.8, 0.5, gvwLam(0xD8C8A0), -4 + i * 0.9, 0, 3.4);
var P = gvwPerson("miller", A.x + 2, A.z, GVW_IN_Y, { dress: "gvsea", sex: "m", beard: "full" }, Math.PI);
gvwTalk(P, "The miller", "You are the miller of Lord Munodi's old mill on the river, in Swift's Gulliver's Travels (1726). It has served the family for generations and serves the whole neighbourhood still. You are proud of it, and suspicious of projectors.", "She's ground the corn of this valley a hundred years, and she'll grind it a hundred more, if they let her be.", 3);
})();
var rx = 700, rz = -740, ry = H(rx, rz), rg = new THREE.Group();
rg.position.set(rx, ry, rz);
G.add(rg);
[[0, 0, 14, 10, 1], [-8, 6, 1.2, 8, 0], [7, -4, 1.2, 6, 0]].forEach(function (q) { gvwBox(rg, q[2], q[3], q[2] === 14 ? 10 : 1.2, gvwMat("ruin"), q[0], 0, q[1]); });
gvwBox(rg, 14, 1.2, 10, gvwMat("ruin"), 0, 10, 0).rotation.z = 0.12;
for (i = 0; i < 6; i++) {
var bk = gvwBox(rg, 1.2 + i * 0.2, 0.8, 1, gvwMat("ruin"), -6 + i * 2.4, 0, 8);
bk.rotation.y = i;
}
var pipe = [];
for (i = 0; i < 20; i++) {
var t = i / 20, px = rx - 30 + t * -120, pz = rz + 30 + t * 120;
pipe.push([px, pz]);
}
gvwStrip(G, pipe, 0.9, function (x, z) { return H(x, z) + 0.5; }, gvwMat("iron"), 0.5);
gvwSolid(rx, rz, 14, 10, ry - 1, ry + 12);
gvwSign(G, "THE NEW MILL (UNFINISHED)", 4, 0.6, rx, ry + 4, rz + 5.05, 0, { bg: "#E8E0D0" });
},
function (G, H, R) {
var lite = gvwLite();
gvwBox(G, 220, 9.2, 10, gvwMat("granite"), -600, -7, 552);
gvwFloor(-600, 552, 220, 10, 2.2);
for (var i = 0; i < 4; i++) {
gvwBox(G, 8, 9.2, 30, gvwMat("granite"), -680 + i * 54, -7, 572);
gvwFloor(-680 + i * 54, 572, 8, 30, 2.2);
}
gvwShip(G, -626, 594, Math.PI / 2, "ship", {});
gvwShip(G, -572, 590, Math.PI / 2, "sloop", {});
gvwShip(G, -680, 598, -Math.PI / 2, "ship", { sail: 0xE0D4B8 });
for (var ix = 0; ix < 6; ix++)
for (var iz = 0; iz < 3; iz++) {
var x = -700 + ix * 38, z = 420 + iz * 36;
if (Math.hypot(x + 620, z - 470) < 16)
continue;
var w = 10 + R() * 4, d = 8 + R() * 3, h = 6 + R() * 5, ry = iz % 2 ? Math.PI : 0;
gvwHouseB(G, x, z, w, d, h, ry, { col: [0xE8D8B8, 0xD8C8A8, 0xF0E0C8][ix % 3] });
var dd = d / 2 + 0.3;
gvwDoorTo(G, "balnibarbi", 22, x + Math.sin(ry) * dd, z + Math.cos(ry) * dd, ry, "The door of a house in Maldonada", 12, 10, {});
}
gvwHouseB(G, -620, 470, 16, 10, 9, 0, { col: 0xF0E4C8 });
gvwSign(G, "THE INN", 3, 0.7, -620, 6, 475.4, 0, { bg: "#2A1E14", ink: "#E8C878" });
gvwDoorTo(G, "balnibarbi", 21, -620, 475.4, 0, "The door of the inn", 16, 12, {});
gvwRoomBuild(G, "balnibarbi", 21, 16, 12, 3.8, { paper: gvwMat("plaster"), floor: gvwMat("planks"), out: { x: -620, z: 478, ry: 0 }, doorName: "The door, out to the port" });
(function () {
var A = gvwInAt("balnibarbi", 21), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
for (var i = 0; i < 4; i++) {
gvwTable(g, -4.5 + i * 3, -1, 2, 1.2, 0.78, gvwMat("oak"));
gvwChair(g, -4.5 + i * 3, 0, Math.PI, gvwMat("planks"));
}
gvwBox(g, 8, 1.1, 0.8, gvwMat("oak"), 0, 0, -5);
gvwFire(g, 6.5, 0, -4.5, 0.8);
gvwCrowd("inn", lite ? 3 : 6, A.x - 6, A.z - 3, A.x + 6, A.z + 4, { dress: "gvsea", dressF: "gvragf", women: 0.3, wander: 2, sp: 0.3, feet: GVW_IN_Y + 1, names: ["A sailor at the inn", "The innkeeper", "A merchant waiting for a ship"], persona: "townsman", talkP: 0.8, says: ["No ship for Luggnagg this month, friend. Not one.", "Glubbdubdrib? Five leagues south-west. The island of sorcerers. You'll see things there.", "A room? Upstairs, the second door."] });
})();
gvwRoomBuild(G, "balnibarbi", 22, 12, 10, 3.4, { paper: gvwMat("bluepaper"), out: { x: -600, z: 480, ry: 0 }, doorName: "The door, out to the port" });
(function () { var A = gvwInAt("balnibarbi", 22), g = new THREE.Group(); g.position.set(A.x, GVW_IN_Y, A.z); G.add(g); gvwFurnish(g, 12, 10, "home", 91); gvwCrowd("mh", 2, A.x - 3, A.z - 2, A.x + 3, A.z + 2, { dress: "gvsea", dressF: "gvlady", women: 0.5, wander: 2, sp: 0.3, feet: GVW_IN_Y + 1, talkP: 1, names: ["A sea-captain at home", "His wife"], persona: "townsman", says: ["Luggnagg lies to the south-east. A month's wait for the trade wind.", "Welcome! We are sea folk here, not projectors, thank heaven."] }); })();
gvwCrowd("mald", lite ? 8 : 18, -720, 400, -500, 548, { dress: "gvsea", dressF: "gvlady", women: 0.35, names: ["A sailor of Maldonada", "A fishwife", "A porter", "A merchant"], persona: "townsman", says: ["Fair wind for Glubbdubdrib today.", "Fresh fish! None of your Academy fish, either.", "Mind the bales, sir.", "Luggnagg? Next month."] });
},
function (G, x, z, w, d, h, ry, o) {
o = o || {};
var H = GVW.hgt, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
G.add(g);
gvwBox(g, w, h, d, o.wall || gvwS("b:stucco", o.col || 0xE8D8B8, 3), 0, 0, 0);
var rf = new THREE.Mesh(gvwGeo("hip4", function () { var c = new THREE.ConeGeometry(0.7072, 1, 4, 1); c.rotateY(Math.PI / 4); c.translate(0, 0.5, 0); return c; }), o.roof || gvwMat("terracotta"));
rf.scale.set(w + 0.8, o.rh || 3.4, d + 0.8);
rf.position.y = h;
g.add(rf);
for (var k = 0; k < Math.floor(w / 3); k++) {
var wx = -w / 2 + 1.5 + k * 3;
if (Math.abs(wx) < 1.2)
continue;
gvwBox(g, 1.1, 1.4, 0.08, gvwShine(0x1A2228, 0.3, 0.2), wx, h * 0.55, d / 2 + 0.02);
}
gvwSolid(x, z, w + 0.6, d + 0.6, y - 1, y + h + 4, ry || 0);
return g;
},
function (G) {
var lite = gvwLite(), H = gvwGlubbH, R = wRand(6060);
gvwTerrain(G, -520, -520, 1040, 1040, lite ? 16 : 10, H, gvwMat("grass"), function (x, z, y, c) { var n = gvwFbm(x * 0.02, z * 0.02, 3); if (y < 1.5) {
c.setRGB(0.88, 0.82, 0.66);
return;
} c.setRGB(0.5 + n * 0.16, 0.7 + n * 0.14, 0.4 + n * 0.1); });
gvwWater(G, 0, 0, 1040, 1040, 0, 0x3A5A6A, 0.84);
var far = new THREE.Mesh(new THREE.RingGeometry(510, 8000, 48, 1), gvwLam(0x2A4A60));
far.rotation.x = -Math.PI / 2;
far.position.y = -0.05;
G.add(far);
gvwBox(G, 10, 9.2, 40, gvwMat("granite"), 0, -7, 420);
gvwFloor(0, 420, 10, 40, 2.2);
gvwShip(G, 12, 432, 0, "sloop", { sail: 0xD8D0C0 });
var wm = gvwS("b:ashlar", 0xB8B0A0, 3), Wx = 230, Z0 = -270, Z1 = 190, Wh = 6.1;
[[0, Z0, Wx * 2, 0], [-Wx, (Z0 + Z1) / 2, Z1 - Z0, 1], [Wx, (Z0 + Z1) / 2, Z1 - Z0, 1]].forEach(function (q) { var y = 4; gvwBox(G, q[3] ? 1.4 : q[2], Wh, q[3] ? q[2] : 1.4, wm, q[0], y - 1, q[1]); gvwSolid(q[0], q[1], q[3] ? 1.4 : q[2], q[3] ? q[2] : 1.4, 0, 40); });
[[-Wx, -8], [8, Wx]].forEach(function (q) { var cx = (q[0] + q[1]) / 2, w = q[1] - q[0]; gvwBox(G, w, Wh, 1.4, wm, cx, 3, Z1); gvwSolid(cx, Z1, w, 1.4, 0, 40); });
var gg = new THREE.Group();
gg.position.set(0, 4, Z1);
G.add(gg);
[-1, 1].forEach(function (k) { gvwBox(gg, 3, 9, 3, wm, k * 9.5, -1, 0); });
gvwBox(gg, 22, 2, 3, wm, 0, 8, 0);
gvwSign(G, "GLUBBDUBDRIB", 5, 0.8, 0, 13.2, Z1 + 1.6, 0, { bg: "#1A1A2A", ink: "#C8C8F0" });
gvwSolid(-9.5, Z1, 3, 3, 0, 40);
gvwSolid(9.5, Z1, 3, 3, 0, 40);
(function () {
var x = 0, z = -50, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var st = gvwS("b:ashlar", 0x8A8478, 3);
gvwBox(g, 80, 18, 60, st, 0, 0, 0);
gvwBox(g, 82, 1.6, 62, gvwMat("granite"), 0, 18, 0);
for (var i = 0; i < 4; i++) {
var tx = (i % 2 ? 1 : -1) * 40, tz = (i < 2 ? 1 : -1) * 30;
gvwCyl(g, 6, 6, 28, st, tx, 0, tz, 16);
var cn = new THREE.Mesh(gvwGeo("tcone", function () { return new THREE.ConeGeometry(7, 10, 16); }), gvwMat("slate"));
cn.position.set(tx, 33, tz);
g.add(cn);
}
for (var f = 0; f < 3; f++)
for (i = 0; i < 10; i++)
if (!(f === 0 && (i === 4 || i === 5)))
gvwBox(g, 1.8, 3.6, 0.1, gvwShine(0x1A1A28, 0.2, 0.3), -34 + i * 7.6, 2.4 + f * 5, 30.05);
gvwBox(g, 8, 7, 1, st, 0, 0, 30.6);
gvwSolid(x, z, 82, 62, y - 2, y + 40);
[[-40, 30], [40, 30], [-40, -30], [40, -30]].forEach(function (q) { gvwRound(x + q[0], z + q[1], 6.4, y - 2, y + 40); });
})();
gvwDoorTo(G, "glubb", 0, 0, -19.4, 0, "The door of the governor's palace", 30, 24, { col: 0x1A1A2A, frame: gvwMat("granite") });
var hedges = [[-160, -200, 60, 40], [120, -200, 70, 40], [150, -60, 50, 60], [-170, 40, 60, 50], [140, 90, 60, 40]];
hedges.forEach(function (q, i) {
var x = q[0], z = q[1], w = q[2], d = q[3], hm = gvwLam(0x3A5A2A);
[[x, z - d / 2, w, 1], [x, z + d / 2, w, 1], [x - w / 2, z, 1, d], [x + w / 2, z, 1, d]].forEach(function (e, k) { if (k === 1) {
gvwBox(G, e[2] / 2 - 3, 1.6, e[3], hm, e[0] - e[2] / 4 - 1.5, H(e[0], e[1]), e[1]);
gvwBox(G, e[2] / 2 - 3, 1.6, e[3], hm, e[0] + e[2] / 4 + 1.5, H(e[0], e[1]), e[1]);
gvwSolid(e[0] - e[2] / 4 - 1.5, e[1], e[2] / 2 - 3, 1.2, 0, 30);
gvwSolid(e[0] + e[2] / 4 + 1.5, e[1], e[2] / 2 - 3, 1.2, 0, 30);
return;
} gvwBox(G, e[2], 1.6, e[3], hm, e[0], H(e[0], e[1]), e[1]); gvwSolid(e[0], e[1], e[2], e[3], 0, 30); });
if (i === 1 || i === 3) {
var cn = [];
for (var k = 0; k < (lite ? 60 : 160); k++)
cn.push({ x: x - w / 2 + 2 + R() * (w - 4), z: z - d / 2 + 2 + R() * (d - 4), y: 0, s: 0.9 + R() * 0.3, ry: R() * 3 });
cn.forEach(function (t) { t.y = H(t.x, t.z); });
gvwPlant(G, "grass", cn, { col: 0xE8D070, keepAll: 1 });
}
else if (i === 0 || i === 4) {
for (var k2 = 0; k2 < 5; k2++)
gvwBeast(G, "sheep", x - w / 3 + R() * w * 0.6, z - d / 3 + R() * d * 0.6, R() * 6, H(x, z));
for (k2 = 0; k2 < 3; k2++) {
var cw = gvwBeast(G, "sheep", x - w / 3 + R() * w * 0.6, z - d / 3 + R() * d * 0.6, R() * 6, H(x, z));
cw.scale.set(1.6, 1.6, 1.8);
cw.traverse(function (o) { if (o.material)
o.material = gvwLam(0x6A4A3A); });
}
}
else {
gvwPlant(G, "flowers", gvwScatter(6100 + i, lite ? 30 : 80, x - w / 2 + 2, z - d / 2 + 2, x + w / 2 - 2, z + d / 2 - 2, null, H, 0.7, 1), { col: "#F0D0E8" });
gvwPlant(G, "bush", gvwScatter(6110 + i, 12, x - w / 2 + 2, z - d / 2 + 2, x + w / 2 - 2, z + d / 2 - 2, null, H, 0.7, 1), { col: 0x4A6A3A });
}
});
var av = [];
for (var i = 0; i < 14; i++) {
[-1, 1].forEach(function (k) { var x = k * 10, z = 176 - i * 12; av.push({ x: x, z: z, y: H(x, z), s: 1.1, ry: 0 }); });
}
gvwPlant(G, "conifer", av, { keepAll: 1 });
av.forEach(function (t) { gvwRound(t.x, t.z, 0.6, t.y - 1, t.y + 10); });
var trees = gvwScatter(6201, lite ? 70 : 180, -500, -500, 500, 500, function (x, z) { var r = Math.hypot(x * 1.05, z); return r < GVW_GR - 30 && !(Math.abs(x) < 235 && z < 195 && z > -275 && Math.abs(x) > 200) && Math.hypot(x, z + 50) > 60 && Math.abs(x) > 16 && !(x > 80 && x < 240 && z > 230 && z < 370); }, H, 0.8, 1.4);
gvwPlant(G, "tree", trees.filter(function (t, i) { return i % 2; }), { col: 0x3E6A2E, keepAll: 1 });
gvwPlant(G, "conifer", trees.filter(function (t, i) { return !(i % 2); }), { keepAll: 1 });
trees.forEach(function (t) { gvwRound(t.x, t.z, 0.6 * t.s, t.y - 1, t.y + 10); });
gvwPlant(G, "grass", gvwScatter(6203, lite ? 200 : 600, -420, -420, 420, 420, function (x, z) { return Math.hypot(x * 1.05, z) < GVW_GR - 20; }, H, 0.7, 1.2), { col: 0xC8E0A0 });
for (i = 0; i < 10; i++) {
var gx = (i % 2 ? 1 : -1) * 5.5, gz = Z1 - 6 - Math.floor(i / 2) * 14;
var P = gvwPerson("gg" + i, gx, gz, H(gx, gz), { dress: "gvancient", sex: "m", beard: i % 3 ? "full" : null }, i % 2 ? -Math.PI / 2 : Math.PI / 2);
gvwGhostly(P.g);
P.g.userData.live = 1;
var sp = new THREE.Mesh(gvwGeo("spear", function () { var c = new THREE.CylinderGeometry(0.02, 0.02, 2.6, 5); c.translate(0, 1.3, 0); return c; }), gvwMat("bronze"));
sp.position.set(0.3, 0, 0.1);
P.g.add(sp);
if (i < 2)
gvwTalk(P, "A guard of the gate", gvwPersona("ghost"), "(He says nothing. His eyes look through you, as though you were the ghost.)", 2.4);
}
for (var ix = 0; ix < 4; ix++)
for (var iz = 0; iz < 3; iz++) {
var x = 100 + ix * 32, z = 250 + iz * 36;
if (ix === 1 && iz === 1)
continue;
var ry = iz % 2 ? Math.PI : 0, w = 10 + R() * 3, d = 8 + R() * 2;
gvwHouseB(G, x, z, w, d, 6 + R() * 3, ry, { col: [0xD8D0C8, 0xC8C0D0, 0xE0D8C8][(ix + iz) % 3], roof: gvwMat("slate") });
gvwDoorTo(G, "glubb", 3 + ((ix + iz) % 2), x + Math.sin(ry) * (d / 2 + 0.3), z + Math.cos(ry) * (d / 2 + 0.3), ry, "The door of a house in the town", 12, 10, {});
}
gvwHouseB(G, 132, 286, 14, 9, 8, 0, { col: 0xE8E0D0, roof: gvwMat("slate") });
gvwSign(G, "LODGINGS", 3, 0.6, 132, 5, 290.8, 0, { bg: "#2A2A3A", ink: "#E0E0F0" });
gvwDoorTo(G, "glubb", 2, 132, 290.8, 0, "The door of your lodging", 12, 10, {});
gvwCrowd("gtown", lite ? 6 : 14, 90, 230, 240, 370, { dress: "gvsea", dressF: "gvlady", women: 0.45, names: ["A magician's cousin", "A townswoman", "A fisherman", "A boy of the town"], persona: "townsman", says: ["We are all of the one tribe here: magicians, every one, more or less.", "Don't stare at the palace guards, sir. They don't like it. Well, they don't like anything.", "The governor called up a whole Roman legion last spring, for a parade.", "Grandfather? Oh, the governor calls him up for supper sometimes."] });
gvwGlubbRooms(G);
},
function (G) {
var dark = gvwS("b:ashlar", 0x6A6470, 3);
gvwRoomBuild(G, "glubb", 0, 30, 24, 8, { wall: dark, paper: gvwMat("velvet"), floor: gvwMat("checker"), out: { x: 0, z: -16, ry: 0 }, doorName: "The palace door", env: "ghosts" });
(function () {
var A = gvwInAt("glubb", 0), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
for (var i = 0; i < 3; i++)
gvwBox(g, 10 - i * 2, 0.4, 4 - i * 0.6, gvwMat("marble"), 0, i * 0.4, -9.5);
var th = gvwBox(g, 2.4, 1.2, 1.6, gvwMat("brass"), 0, 1.2, -10.5);
gvwBox(g, 2.4, 3.4, 0.3, gvwMat("velvet"), 0, 2.4, -11.3);
for (i = 0; i < 3; i++)
gvwCyl(g, 0.3, 0.25, 0.5, gvwMat("oak"), -1.4 + i * 1.4, 0, -6.8, 10);
for (i = 0; i < 8; i++) {
var gx = (i % 2 ? 1 : -1) * 10, gz = -6 + Math.floor(i / 2) * 4;
var P = gvwPerson("gs" + i, A.x + gx, A.z + gz, GVW_IN_Y, { dress: "gvancient", sex: i % 3 === 0 ? "f" : "m" }, i % 2 ? -Math.PI / 2 : Math.PI / 2);
gvwGhostly(P.g);
P.g.userData.live = 1;
P.ghostServant = 1;
(GVW.gserv || (GVW.gserv = [])).push(P);
}
})();
gvwRoomBuild(G, "glubb", 1, 20, 14, 6, { wall: dark, paper: gvwMat("greenvelvet"), floor: gvwMat("floor"), out: { x: 0, z: -16, ry: 0 }, doorName: "The door, down through the palace", env: "ghosts" });
(function () {
var A = gvwInAt("glubb", 1), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
var t = gvwCanvas("parkview", 512, 256, function (c, W, H) {
var gr = c.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, "#8A90B8");
gr.addColorStop(0.5, "#C8C8D8");
gr.addColorStop(0.52, "#5A7A4A");
gr.addColorStop(1, "#3A5A2A");
c.fillStyle = gr;
c.fillRect(0, 0, W, H);
var R = wRand(4);
c.fillStyle = "rgba(220,220,255,.55)";
for (var i = 0; i < 140; i++) {
var x = 40 + R() * W * 0.85, y = H * 0.56 + R() * H * 0.35;
c.fillRect(x, y, 3, 8);
c.fillRect(x - 1, y - 3, 5, 3);
}
c.strokeStyle = "rgba(220,220,255,.4)";
for (i = 0; i < 40; i++) {
var x2 = 40 + R() * W * 0.85, y2 = H * 0.56 + R() * H * 0.3;
c.beginPath();
c.moveTo(x2, y2);
c.lineTo(x2 + 2, y2 - 16);
c.stroke();
}
});
var win = new THREE.Mesh(new THREE.PlaneGeometry(14, 4.4), gvwGlowM(0xFFFFFF));
win.material = gvwM("pvM", function () { var m = new THREE.MeshBasicMaterial({ map: t }); m.userData.noPhoto = 1; return m; });
win.position.set(0, 3, -6.82);
g.add(win);
for (var i = 0; i < 6; i++)
gvwBox(g, 0.2, 4.6, 0.2, gvwMat("oak"), -7 + i * 2.8, 0.8, -6.78);
gvwBox(g, 14.4, 0.3, 0.4, gvwMat("oak"), 0, 0.7, -6.7);
for (i = 0; i < 3; i++)
gvwChair(g, -3 + i * 3, -3, Math.PI, gvwMat("velvet"));
gvwRug(g, 0, -1, 10, 6, 0x3A2A4A);
gvwTable(g, 6, 1, 2, 1.2, 0.8, gvwMat("oak"));
})();
gvwRoomBuild(G, "glubb", 2, 12, 10, 3.6, { paper: gvwMat("bluepaper"), out: { x: 132, z: 293, ry: 0 }, doorName: "The door, out to the town" });
(function () { var A = gvwInAt("glubb", 2), g = new THREE.Group(); g.position.set(A.x, GVW_IN_Y, A.z); G.add(g); gvwFurnish(g, 12, 10, "home", 61); })();
[3, 4].forEach(function (s) {
gvwRoomBuild(G, "glubb", s, 12, 10, 3.4, { paper: s === 3 ? gvwMat("damask") : gvwMat("greenpaper"), out: { x: 150, z: 300, ry: 0 }, doorName: "The door, out to the town" });
var A = gvwInAt("glubb", s), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
gvwFurnish(g, 12, 10, "home", 62 + s);
gvwCrowd("gh" + s, 2, A.x - 3, A.z - 2, A.x + 3, A.z + 2, { dress: "gvsea", dressF: "gvlady", women: 0.5, wander: 2, sp: 0.3, feet: GVW_IN_Y + 1, talkP: 1, names: ["A magician at home", "A magician's wife"], persona: "townsman",
says: ["(He snaps his fingers, and a pale old servant brings you a stool, and is gone.) Sit down, sit down.", "Mind the cups: they belonged to my great-great-grandmother. She'll be cross if you break one, and she can be asked."] });
var gp = gvwPerson("ghh" + s, A.x + 4, A.z - 3, GVW_IN_Y, { dress: "gvancient", sex: "f" }, Math.PI);
gvwGhostly(gp.g);
gp.g.userData.live = 1;
});
},
function (x, z) {
var n = gvwFbm(x * 0.008, z * 0.008, 4), h = 3 + n * 12 + gvwSmooth(260, 0, Math.hypot(x + 380, z + 380)) * 60 + gvwSmooth(240, 0, Math.hypot(x - 420, z + 300)) * 40;
h = h + (4 - h) * gvwSmooth(170, 110, Math.hypot(x, z + 170));
h = h + (-7 - h) * gvwSmooth(440, 490, z);
var rd = gvwPathD(x, z, GVW_LRIV);
if (rd < 22)
h = Math.min(h, h + (-1.8 - h) * gvwSmooth(22, 8, rd));
return h;
},
function (G) {
var lite = gvwLite(), H = gvwLugH, R = wRand(7070);
gvwTerrain(G, -620, -620, 1240, 1240, lite ? 18 : 11, H, gvwMat("grass"), function (x, z, y, c) { var n = gvwFbm(x * 0.02, z * 0.02, 3); if (y < 1.2) {
c.setRGB(0.88, 0.82, 0.66);
return;
} if (y > 40) {
c.setRGB(0.5 + n * 0.1, 0.6 + n * 0.1, 0.42);
return;
} c.setRGB(0.52 + n * 0.16, 0.72 + n * 0.12, 0.38 + n * 0.08); });
gvwWater(G, 0, 560, 1240, 200, 0, 0x2A5A7A, 0.84);
var far = new THREE.Mesh(new THREE.PlaneGeometry(9000, 4000), gvwLam(0x2A5470));
far.rotation.x = -Math.PI / 2;
far.position.set(0, -0.05, 2660);
G.add(far);
gvwStrip(G, gvwDense(GVW_LRIV, 8), 18, function (x, z) { return H(x, z) + 1.4; }, gvwWaterM(0x4A6A7A, 0.85), 0);
gvwStrip(G, gvwDense([[230, 400], [150, 200], [80, 40], [20, -120], [0, -226]], 6), 7, function (x, z) { return H(x, z) + 0.05; }, gvwMat("gravel"), 0.05);
gvwStrip(G, gvwDense([[0, -130], [-150, 60], [-260, 300], [-300, 440]], 6), 6, function (x, z) { return H(x, z) + 0.05; }, gvwMat("gravel"), 0.05);
var red = gvwLam(0xA83A2A), tile = gvwS("b:slate", 0x3A4A5A, 2), plaster = gvwS("plaster", 0xF0E8D8, 3), gold = gvwMat("brass");
function ehouse(x, z, w, d, ry, o) {
o = o || {};
var y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry || 0;
G.add(g);
gvwBox(g, w + 0.8, 0.6, d + 0.8, gvwMat("granite"), 0, -0.1, 0);
gvwBox(g, w, o.h || 4, d, plaster, 0, 0.5, 0);
for (var i = 0; i < 4; i++)
gvwCyl(g, 0.22, 0.22, o.h || 4, red, (i % 2 ? 1 : -1) * (w / 2 - 0.2), 0.5, (i < 2 ? 1 : -1) * (d / 2 - 0.2), 8);
var rf = new THREE.Mesh(gvwGeo("lroof", function () { var c = new THREE.CylinderGeometry(0.05, 0.78, 0.5, 4, 1); c.rotateY(Math.PI / 4); c.scale(1, 1, 0.72); c.translate(0, 0.25, 0); return c; }), o.roof || tile);
rf.scale.set(w * 1.45, 2.8, d * 1.9);
rf.position.y = (o.h || 4) + 0.5;
g.add(rf);
gvwSolid(x, z, w + 0.8, d + 0.8, y - 1, y + (o.h || 4) + 4, ry || 0);
return g;
}
gvwBox(G, 90, 9.2, 10, gvwMat("granite"), 250, -7, 470);
gvwFloor(250, 470, 90, 10, 2.2);
gvwShip(G, 250, 500, Math.PI / 2, "ship", {});
gvwShip(G, 200, 505, Math.PI / 2 + 0.1, "junk", {});
for (var i = 0; i < 12; i++) {
var a = Math.PI * 0.95 + i / 11 * Math.PI * 1.1, wx = 250 + Math.cos(a) * 90, wz = 400 + Math.sin(a) * 70;
if (i === 6)
continue;
gvwBox(G, 18, 6, 2, gvwMat("stone"), wx, H(wx, wz) - 0.5, wz, -a + Math.PI / 2);
gvwSolid(wx, wz, 18, 2, 0, 30, -a + Math.PI / 2);
}
var lst = [[200, 380], [300, 380], [180, 420], [320, 420], [230, 350], [280, 350]];
lst.forEach(function (q, i) { var ry = q[1] > 400 ? 0 : Math.PI; ehouse(q[0], q[1], 12, 8, ry); gvwDoorTo(G, "luggnagg", 5 + (i % 2), q[0] + Math.sin(ry) * 4.3, q[1] + Math.cos(ry) * 4.3, ry, "The door of a house in Clumegnig", 12, 10, { col: 0x6A2A1E, frame: red }); });
ehouse(226, 410, 16, 10, 0, { h: 5 });
gvwSign(G, "CUSTOM-HOUSE", 4, 0.7, 226, 6.6, 415.5, 0, { bg: "#6A1E1A", ink: "#F0E0B0" });
gvwDoorTo(G, "luggnagg", 0, 226, 415.4, 0, "The door of the custom-house", 16, 12, { col: 0x6A2A1E, frame: red });
ehouse(282, 440, 12, 8, 0);
gvwDoorTo(G, "luggnagg", 1, 282, 444.4, 0, "The door of your lodging (a sentry stands by it)", 12, 10, { col: 0x2A3A5A, frame: red });
gvwCrowd("clum", lite ? 8 : 18, 190, 340, 320, 466, { dress: "gveast", dressF: "gveastf", skin: 0xD8B898, hair: function () { return 0x141414; }, names: ["A pilot of Clumegnig", "A sailor", "A merchant", "A lady of Clumegnig", "A custom-house clerk"], persona: "luggnagg", says: ["Mind the shoals by the river mouth: only a pilot can bring you in.", "A Hollander, are you? Welcome.", "The court sends word in a fortnight, always a fortnight.", "Have you seen the struldbrugs? No? You will.", "Your name, country, and business, if you please."] });
var fields = [];
for (i = 0; i < (lite ? 200 : 520); i++) {
var fx = 40 + R() * 200, fz = -40 + R() * 360;
if (gvwPathD(fx, fz, GVW_LRIV) < 20)
continue;
fields.push({ x: fx, z: fz, y: H(fx, fz), s: 0.8 + R() * 0.4, ry: R() * 3 });
}
gvwPlant(G, "grass", fields, { col: 0x9AC860, keepAll: 1 });
[[60, 120], [180, 40], [120, -40], [200, 220]].forEach(function (q, i) { ehouse(q[0], q[1], 10, 7, i, { h: 3.4 }); });
var trees = gvwScatter(7101, lite ? 100 : 240, -600, -600, 600, 440, function (x, z) { return Math.hypot(x, z + 170) > 180 && gvwPathD(x, z, GVW_LRIV) > 24 && Math.hypot(x - 250, z - 400) > 110 && Math.hypot(x + 300, z - 420) > 80; }, H, 0.8, 1.4);
gvwPlant(G, "tree", trees.filter(function (t, i) { return i % 3 === 0; }), { col: 0x4A7A34, keepAll: 1 });
gvwPlant(G, "conifer", trees.filter(function (t, i) { return i % 3 === 1; }), { keepAll: 1 });
gvwPlant(G, "bamboo", trees.filter(function (t, i) { return i % 3 === 2; }), {});
trees.forEach(function (t) { gvwRound(t.x, t.z, 0.6 * t.s, t.y - 1, t.y + 10); });
gvwCrowd("lfarm", lite ? 4 : 10, 40, -40, 240, 320, { dress: "gveast", dressF: "gveastf", skin: 0xD8B898, hair: function () { return 0x141414; }, names: ["A farmer of Luggnagg", "A farmer's wife"], persona: "luggnagg", says: ["Good rice this year.", "The king is gracious to strangers. Mind you crawl properly."] });
for (i = 0; i < 36; i++) {
var a2 = i / 36 * Math.PI * 2, wx2 = Math.sin(a2) * 165, wz2 = -170 + Math.cos(a2) * 165;
if (i === 0 || i === 18)
continue;
gvwBox(G, 30, 8, 3, gvwMat("stone"), wx2, H(wx2, wz2) - 0.5, wz2, -a2);
gvwSolid(wx2, wz2, 30, 3, 0, 40, -a2);
}
[[0, -5], [0, -335]].forEach(function (q) { var g = new THREE.Group(); g.position.set(q[0], H(q[0], q[1]), q[1]); G.add(g); [-1, 1].forEach(function (k) { gvwBox(g, 5, 11, 5, red, k * 6, 0, 0); }); var rf = new THREE.Mesh(gvwGeo("lroof", function () { var c = new THREE.CylinderGeometry(0.05, 0.78, 0.5, 4, 1); c.rotateY(Math.PI / 4); c.scale(1, 1, 0.72); c.translate(0, 0.25, 0); return c; }), tile); rf.scale.set(26, 3, 12); rf.position.y = 11; g.add(rf); gvwSolid(q[0] - 6, q[1], 5, 5, 0, 40); gvwSolid(q[0] + 6, q[1], 5, 5, 0, 40); });
var city = [];
for (var ix = -5; ix <= 5; ix++)
for (var iz = -4; iz <= 3; iz++) {
var x = ix * 24 + (iz % 2) * 8, z = -150 + iz * 26;
if (Math.abs(x) < 12)
continue;
if (Math.abs(x) < 60 && z < -200)
continue;
if (Math.hypot(x, z + 170) > 150)
continue;
if (Math.hypot(x + 170, z + 160) < 30)
continue;
city.push([x, z]);
}
city.forEach(function (q, i) { var ry = i % 2 ? Math.PI : 0, w = 10 + R() * 4, d = 7 + R() * 3; ehouse(q[0], q[1], w, d, ry, { h: 4 + R() * 3, roof: i % 5 === 0 ? red : tile }); gvwDoorTo(G, "luggnagg", 4 + (i % 4 === 0 ? 0 : i % 3 === 0 ? 3 : i % 2 ? 5 : 6), q[0] + Math.sin(ry) * (d / 2 + 0.5), q[1] + Math.cos(ry) * (d / 2 + 0.5), ry, i % 4 === 0 ? "The door of a house of quality" : "The door of a house in Traldragdubh", 12, 10, { col: 0x6A2A1E, frame: red }); });
(function () {
var x = 0, z = -270, y = H(x, z), g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
gvwBox(g, 70, 3, 46, gvwMat("granite"), 0, 0, 0);
for (var i = 0; i < 10; i++)
gvwBox(g, 24 - i * 0.6, 0.3 * (i + 1), 0.9, gvwMat("granite"), 0, 0, 30 - i * 0.9 + 0.0);
gvwBox(g, 52, 10, 30, plaster, 0, 3, 0);
for (i = 0; i < 12; i++)
gvwCyl(g, 0.7, 0.7, 10, red, -24 + i * 4.36, 3, 15.6, 12);
var rf = new THREE.Mesh(gvwGeo("lroof", function () { var c = new THREE.CylinderGeometry(0.05, 0.78, 0.5, 4, 1); c.rotateY(Math.PI / 4); c.scale(1, 1, 0.72); c.translate(0, 0.25, 0); return c; }), tile);
rf.scale.set(80, 8, 60);
rf.position.y = 13;
g.add(rf);
var r2 = rf.clone();
r2.scale.set(50, 6, 38);
r2.position.y = 19;
g.add(r2);
var fin = new THREE.Mesh(gvwGeo("fin", function () { return new THREE.SphereGeometry(1.2, 12, 8); }), gold);
fin.position.y = 23;
g.add(fin);
gvwSolid(x, z, 54, 32, y - 2, y + 30);
gvwFloor(x, z, 70, 46, y + 3);
gvwRamp(0, -242, 22, 10, y + 3, y, 0);
})();
gvwDoorTo(G, "luggnagg", 2, 0, -254.6, 0, "The door of the king's palace", 34, 26, { y: H(0, -270) + 3, col: 0x6A1E1A, frame: red });
gvwSign(G, "TRALDRAGDUBH", 6, 1, 0, H(0, -5) + 13.5, -2.4, 0, { bg: "#6A1E1A", ink: "#F0E0B0" });
(function () {
var x = -170, z = -160, y = H(x, z);
gvwBox(G, 40, 0.2, 30, gvwMat("paving"), x, y - 0.1, z);
for (var i = 0; i < 6; i++) {
gvwBox(G, 3, 0.45, 0.6, gvwMat("oak"), x - 12 + i * 5, y, z + 8);
}
gvwPlant(G, "tree", [{ x: x, z: z - 4, y: y, s: 1.4, ry: 0 }], { col: 0x5A7A3A, keepAll: 1 });
gvwRound(x, z - 4, 1, y - 1, y + 12);
ehouse(x, z - 24, 22, 9, 0, { h: 4.6 });
gvwSign(G, "THE HOUSE OF THE STRULDBRUGS", 5, 0.6, x, y + 5.6, z - 19.4, 0, { bg: "#3A3A3A", ink: "#E8E0D0" });
gvwDoorTo(G, "luggnagg", 7, x, z - 19.4, 0, "The door of the house of the struldbrugs", 16, 12, { col: 0x3A3A3A, frame: red });
})();
gvwCrowd("strl", lite ? 5 : 10, -190, -150, -150, -140, { dress: "gvold", women: 0.4, wander: 3, sp: 0.2, mark: 1, hair: function () { return 0xE8E8E8; }, names: ["A struldbrug", "A very old struldbrug", "An old woman with the spot"], persona: "struld", talkP: 0.9, says: ["Slumskudask. Slumskudask. (He holds out a hand.)", "I was born ... in the reign of ... I forget. Long ago.", "(She speaks, but the words are old ones, and your interpreter shakes his head: he understands one in three.)"] });
gvwCrowd("tral", lite ? 10 : 24, -140, -300, 140, -30, { dress: "gveast", dressF: "gveastf", skin: 0xD8B898, hair: function () { return 0x141414; }, ok: function (x, z) { return Math.hypot(x, z + 170) < 150 && Math.abs(x) > 4; }, names: ["A courtier of Luggnagg", "A lady of Traldragdubh", "A scholar", "A palace servant", "A shopkeeper"], persona: "luggnagg",
says: ["You are the stranger who was admitted to lick the dust? With a clean floor! An honour.", "Polite and generous, they say of us. We try.", "The struldbrugs? Ask anyone. Pity them.", "The bliffmarklub himself appointed your lodging.", "Silks from Japan, very fine."] });
gvwBox(G, 70, 9.2, 10, gvwMat("granite"), -300, -7, 470);
gvwFloor(-300, 470, 70, 10, 2.2);
gvwShip(G, -300, 500, -Math.PI / 2, "junk", {});
[[-330, 420], [-270, 420], [-300, 390]].forEach(function (q, i) { ehouse(q[0], q[1], 12, 8, 0); gvwDoorTo(G, "luggnagg", 5 + (i % 2), q[0], q[1] + 4.3, 0, "The door of a house in Glanguenstald", 12, 10, { col: 0x6A2A1E, frame: red }); });
gvwCrowd("glang", lite ? 4 : 8, -340, 400, -260, 466, { dress: "gveast", dressF: "gveastf", skin: 0xD8B898, hair: function () { return 0x141414; }, names: ["A sailor of the royal port", "A guard of the King's"], persona: "luggnagg", says: ["The ship for Japan sails in six days.", "His majesty sent us to see you aboard."] });
gvwLugRooms(G);
},
function (G) {
var red = gvwLam(0xA83A2A), mat = gvwLam(0xD8C898);
gvwRoomBuild(G, "luggnagg", 0, 16, 12, 4.2, { paper: gvwMat("plaster"), floor: mat, out: { x: 226, z: 418, ry: 0 }, doorName: "The door, out to the quay" });
(function () {
var A = gvwInAt("luggnagg", 0), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
gvwBox(g, 6, 1.0, 1.0, gvwMat("oak"), 0, 0, -3.6);
for (var i = 0; i < 8; i++)
gvwBox(g, 0.8, 0.6, 0.6, gvwLam(0x8A6A3A), -6 + i * 0.6, 0, 4);
gvwShelves(g, -6, -5.6, 3, 2.6, 0);
var P = gvwPerson("cust", A.x, A.z - 4.4, GVW_IN_Y, { dress: "gveast", sex: "m" }, 0);
gvwTalk(P, "The custom-house officer", gvwPersona("luggnagg"), "You will be examined very strictly. Your name, your country, and how you came here.", 3.2);
})();
gvwRoomBuild(G, "luggnagg", 1, 12, 10, 3.6, { paper: gvwMat("bluepaper"), floor: mat, out: { x: 282, z: 447, ry: 0 }, doorName: "The door (the sentry nods you through)" });
(function () { var A = gvwInAt("luggnagg", 1), g = new THREE.Group(); g.position.set(A.x, GVW_IN_Y, A.z); G.add(g); gvwFurnish(g, 12, 10, "east", 71); gvwBed(g, 4.4, -3.6, 0, 0x2A4A6A); })();
gvwRoomBuild(G, "luggnagg", 2, 34, 26, 9, { paper: gvwLam(0x8A2A1E), floor: gvwShine(0xC8A870, 0.2, 0.1), out: { x: 0, z: -250, ry: 0 }, doorName: "The palace door" });
(function () {
var A = gvwInAt("luggnagg", 2), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
for (var i = 0; i < 3; i++)
gvwBox(g, 10 - i * 2.4, 0.45, 5 - i, gvwMat("brass"), 0, i * 0.45, -10.5);
gvwBox(g, 2.6, 1.4, 1.8, gvwMat("brass"), 0, 1.35, -11.6);
gvwBox(g, 2.6, 3.6, 0.3, red, 0, 2.7, -12.5);
gvwBox(g, 3, 0.06, 22, gvwLam(0xE8D8B0), 0, 0.01, 1);
for (i = 0; i < 12; i++)
gvwCyl(g, 0.6, 0.6, 9, red, (i % 2 ? 1 : -1) * 9, 0, -10 + Math.floor(i / 2) * 4, 12);
for (i = 0; i < 6; i++) {
var c = new THREE.Mesh(gvwGeo("lant", function () { return new THREE.CylinderGeometry(0.4, 0.3, 0.9, 8); }), gvwGlowM(0xFFD890));
c.position.set((i % 2 ? 1 : -1) * 5, 7, -8 + Math.floor(i / 2) * 7);
g.add(c);
}
gvwCrowd("lct", lite2() ? 6 : 12, A.x - 14, A.z - 8, A.x + 14, A.z + 8, { dress: "gveast", dressF: "gveastf", skin: 0xD8B898, hair: function () { return 0x141414; }, wander: 0, feet: GVW_IN_Y + 1, ok: function (x) { return Math.abs(x - A.x) > 4; }, names: ["A lord of the court", "A lady of the court"], persona: "luggnagg", talkP: 0.5, says: ["Crawl, stranger, and strike your forehead seven times.", "Four yards from the throne: then rise to your knees."] });
})();
gvwRoomBuild(G, "luggnagg", 3, 14, 10, 3.8, { paper: gvwLam(0xD8C8A8), floor: mat, out: { x: 0, z: -232, ry: 0 }, doorName: "The door, out to the palace court" });
(function () { var A = gvwInAt("luggnagg", 3), g = new THREE.Group(); g.position.set(A.x, GVW_IN_Y, A.z); G.add(g); gvwFurnish(g, 14, 10, "east", 72); gvwBed(g, 5, -3.6, 0, 0x6A2A1E); for (var i = 0; i < 4; i++)
gvwBox(g, 0.5, 0.4, 0.5, gvwMat("brass"), -5 + i * 0.7, 0, -4); })();
[4, 5, 6].forEach(function (s) {
gvwRoomBuild(G, "luggnagg", s, 12, 10, 3.6, { paper: [gvwLam(0xE8D8B8), gvwLam(0xD8E0C8), gvwLam(0xE0C8C0)][s - 4], floor: mat, out: { x: -110, z: -110, ry: 0 }, doorName: "The door, out to the street" });
var A = gvwInAt("luggnagg", s), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
gvwFurnish(g, 12, 10, "east", 73 + s);
gvwCrowd("lh" + s, s === 4 ? 3 : 2, A.x - 3, A.z - 2, A.x + 3, A.z + 2, { dress: "gveast", dressF: "gveastf", skin: 0xD8B898, hair: function () { return 0x141414; }, women: 0.5, wander: 2, sp: 0.3, feet: GVW_IN_Y + 1, talkP: 1, names: s === 4 ? ["A person of quality", "A lady of quality", "A guest"] : ["The master of the house", "The mistress of the house"], persona: "luggnagg",
says: s === 4 ? ["Have you seen any of our struldbrugs, sir? Our immortals?", "Sit with us. Tell us how you would live, if you could never die.", "(He smiles, with the smile that comes of pity for the ignorant.)"] : ["You are welcome. Tea?", "Our son? No, no spot. Thank heaven."] });
});
gvwRoomBuild(G, "luggnagg", 7, 16, 12, 3.6, { paper: gvwLam(0xA8A098), floor: mat, out: { x: -170, z: -140, ry: 0 }, doorName: "The door, out to the square" });
(function () {
var A = gvwInAt("luggnagg", 7), g = new THREE.Group();
g.position.set(A.x, GVW_IN_Y, A.z);
G.add(g);
for (var i = 0; i < 6; i++) {
gvwBox(g, 1.9, 0.4, 0.9, gvwMat("planks"), -6 + i * 2.4, 0, -4.6);
gvwBox(g, 1.8, 0.1, 0.8, gvwLam(0x8A8070), -6 + i * 2.4, 0.4, -4.6);
}
gvwTable(g, 0, 1, 4, 1.2, 0.75, gvwMat("planks"));
gvwCrowd("strh", 4, A.x - 5, A.z - 2, A.x + 5, A.z + 3, { dress: "gvold", women: 0.5, wander: 1, sp: 0.15, mark: 1, feet: GVW_IN_Y + 1, hair: function () { return 0xE8E8E8; }, names: ["A struldbrug at the table", "A struldbrug by the wall"], persona: "struld", talkP: 1, says: ["(She does not know her own family's names any more. She has outlived them all.)", "Slumskudask..."] });
})();
},
function () {
var S = gvwSc(), k = S.env, L = null;
try {
var Lw = worldLocal();
L = { x: Lw.x - S.x, z: Lw.z };
}
catch (e) { }
if (GVW.envK && GVW_ENV[GVW.envK])
k = GVW.envK;
if (GVW.night && GVW.sc !== "cave")
k = "night";
var R = L ? gvwRoomAt(L.x, L.z) : null;
if (R)
k = R.env;
var E = {}, B = GVW_ENV[k] || GVW_ENV.land;
for (var q in B)
E[q] = B[q];
if (gvwLite() && E.fogD)
E.fogD *= 1.4;
return E;
},
function (x, z, feet) {
if (GVW.moving || GVW.ride)
return true;
var S = gvwSc(), D = GVW_SCN[GVW.sc];
if (!D)
return false;
if ((Math.abs(x) > S.bound || Math.abs(z) > S.bound) && gvwFloorAt(x, z, feet) === null)
return true;
if (D.edge && x < S.bound + 60 && D.edge(x, z))
return true;
if (gvwSolidAt(x, z, feet))
return true;
var fl = gvwFloorAt(x, z, feet);
if (fl !== null)
return false;
var hh = gvwLand(x, z);
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
GVW.t += dt;
if (!GVW.built || !GVW.scG)
return;
var S = gvwSc(), Lw = worldLocal(), L = { x: Lw.x - S.x, z: Lw.z }, feet = camera.position.y - 1.72;
GVW.et = (GVW.et || 0) + dt;
if (GVW.et > 0.8) {
GVW.et = 0;
worldEnv(gvwEnvNow());
}
var flow = GVW.t * 0.02;
GVW.water.forEach(function (m) { var mp = m.material && m.material.map; if (mp)
mp.offset.set(flow * 0.4, flow); });
GVW.fx.forEach(function (F) {
var k = F.userData.kind;
if (k === "smoke")
F.children.forEach(function (s) { var u = (GVW.t * 0.12 + s.userData.ph) % 1; s.position.set(Math.sin(u * 9 + s.userData.ph * 5) * 0.6, u * 7, 0); s.scale.setScalar(0.6 + u * 2.4); s.material.opacity = 0.34 * (1 - u); });
else if (k === "fire") {
F.userData.fl.forEach(function (f, i) { f.scale.y = 0.85 + Math.abs(Math.sin(GVW.t * 3 + i * 2)) * 0.3; f.rotation.y = GVW.t * 1.2 + i; });
if (F.userData.light)
F.userData.light.intensity = 1.0 + Math.sin(GVW.t * 1.3) * 0.08;
}
});
GVW.ships.forEach(function (s, i) { s.position.y = (s.userData.y0 || 0) + Math.sin(GVW.t * 0.7 + i) * 0.12; s.rotation.z = Math.sin(GVW.t * 0.5 + i * 1.3) * 0.025; });
if (GVW.isle) {
var I = GVW.isle;
I.rotation.y += dt * 0.004;
I.position.y = I.userData.y0 + Math.sin(GVW.t * 0.12) * 3;
}
if (GVW.stone) {
var tg = GVW.stoneTilt || 0;
GVW.stone.rotation.z += (tg - GVW.stone.rotation.z) * Math.min(1, dt * 0.8);
}
GVW.ghosts.forEach(function (g, i) { var m = g.userData.mats; if (m)
m.forEach(function (x) { x.opacity = 0.5 + Math.sin(GVW.t * 0.8 + i) * 0.12; }); });
GVW.flappers.forEach(function (f, i) { var a = f.userData.arm; if (a)
a.rotation.x = -0.6 + Math.max(0, Math.sin(GVW.t * 1.6 + i * 1.7)) * 0.9; });
GVW.people.forEach(function (P) { if (P.o && P.o.wander && typeof wWander === "function" && Math.abs(P.g.position.x - L.x) + Math.abs(P.g.position.z - L.z) < 140)
wWander(P.g, dt, function (x, z) { return gvwGround(x, z, (P.y || 0) + 2); }, { r: P.o.wander, sp: P.o.sp || 0.7 }); });
if (typeof gvbTick === "function")
try {
gvbTick(dt, L);
}
catch (e) {
if (!GVW.e1) {
GVW.e1 = 1;
if (window.console)
console.warn("[gulliver] book", e);
}
}
if (!GVW.bannerBook)
worldBanner("<b>🏝️ " + GVW_NAME + "</b> · " + esc(gvwPlaceName(L)) + (GVW.night ? " · night" : ""));
GVW.pt = (GVW.pt || 0) + dt;
if (GVW.pt < 0.15)
return;
GVW.pt = 0;
if (GVW.moving || GVW.ride || (WLD.card && WLD.card.style.display === "block")) {
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
GVW.talk.forEach(function (T) {
var g = T.p.g;
if (!g.parent || g.visible === false)
return;
var p = g.position;
if (Math.abs(p.x - L.x) > T.r + 1 || Math.abs(p.z - L.z) > T.r + 1 || Math.abs(p.y - feet) > 4)
return;
cand(p.x, p.z, T.r, T.fn ? function () { T.fn(T); } : function () { if (typeof gvbTalk === "function" && gvbTalk(T))
return; if (typeof wTalk === "function")
wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
GVW.spots.forEach(function (s) {
if (s.off || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y != null ? s.y : gvwLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.6)
return;
cand(s.x, s.z, s.r, function () { var r = s.fn && s.fn(); if (typeof gvbSpot === "function")
gvbSpot(s); return r; }, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (best)
worldPrompt(best.html, best.fn);
else if (typeof gvbIdlePrompt === "function")
gvbIdlePrompt();
else
worldPrompt(null);
},
function (opt) {
opt = opt || {};
var A = gvwAtPt(opt.at) || (typeof gvbStartAt === "function" && gvbStartAt()) || gvwAtPt("gallery");
gvwScene(A.sc);
var S = GVW_SC[A.sc], y = A.y != null ? A.y : gvwGround(A.x, A.z);
camera.position.set(GVW.base + S.x + A.x, y + 1.72, A.z);
yaw = A.ry != null ? A.ry : 0;
pitch = 0;
GVW.moving = false;
GVW.ride = null;
worldEnv(gvwEnvNow());
setStatus("🏝️ <b>" + GVW_NAME + ".</b> Jonathan Swift's Gulliver's Travels (1726), the third voyage, the whole of it: the pirates, Laputa the flying island, the Grand Academy of Lagado, the sorcerers of Glubbdubdrib and the immortals of Luggnagg. <b>Press E</b> for the book.");
if (typeof gvbEnter === "function")
try {
gvbEnter(opt);
}
catch (e) {
if (window.console)
console.warn("[gulliver] enter", e);
}
},
function () {
gvwSceneDrop();
for (var k in GVW.mats) {
var m = GVW.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in GVW.tex) {
var x = GVW.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
for (var g in GVW_GEO) {
try {
GVW_GEO[g].dispose();
}
catch (e) { }
}
GVW.mats = {};
GVW.tex = {};
GVW_GEO = {};
GVW.built = false;
GVW.G = null;
GVW.lights = 0;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (typeof at === "string") {
var A = GVW_AT[at];
return A ? { sc: A.sc, x: A.x, z: A.z, y: A.y } : null;
}
if (at.who) {
var T = GVW.talk.filter(function (t) { return at.who instanceof RegExp ? at.who.test(t.name) : t.name === at.who; })[0];
if (T && T.p.g.parent)
return { sc: GVW.sc, x: T.p.g.position.x, z: T.p.g.position.z, y: T.p.g.position.y };
if (at.at)
return gvbPos(at.at);
var C = GVB_CH[gvbS().ch], i = gvbS().s, c = C && C.cast ? C.cast.filter(function (d) { return gvbCastName(d) === at.who && !(d.from != null && i < d.from) && !(d.until != null && i >= d.until); })[0] : null;
return c ? gvbPos(c.at) : null;
}
if (at.spot) {
var Sp = GVW.spots.filter(function (s) { return at.spot instanceof RegExp ? at.spot.test(s.name) : s.name === at.spot; })[0];
if (Sp)
return { sc: GVW.sc, x: Sp.x, z: Sp.z, y: Sp.y };
if (at.at)
return gvbPos(at.at);
return null;
}
if (at.x != null)
return { sc: at.sc || GVW.sc, x: at.x, z: at.z, y: at.y };
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
if (GVB.beam && GVB.beam.parent === GVW.scG)
return GVB.beam;
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
GVW.scG.add(g);
GVB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), M = function (c) { return gvwLam(c); }, m;
switch (kind) {
case "load":
m = gvwBox(g, 0.6, 0.4, 0.5, M(0x8A7A5A), 0, 0, 0);
gvwBox(g, 0.64, 0.06, 0.54, M(0x4A3A2A), 0, 0.2, 0);
break;
case "rifle":
m = gvwBox(g, 0.08, 0.08, 1.1, M(0x3A2A1A), 0, 0.04, 0);
break;
case "fern":
m = gvwBox(g, 0.4, 0.04, 0.3, M(0x5A8A3A), 0, 0.02, 0);
break;
case "thorn":
m = gvwBox(g, 0.8, 0.5, 0.8, M(0x4A5A2A), 0, 0, 0);
break;
case "wood":
m = gvwBox(g, 0.9, 0.12, 0.12, M(0x6A4A2A), 0, 0.06, 0);
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
m = gvwBox(g, 0.08, 0.08, 0.6, M(0xE8E0CC), 0, 0.04, 0);
break;
case "flower":
m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), M(0xF6F2EC));
m.scale.y = 0.5;
m.position.y = 0.06;
g.add(m);
gvwBox(g, 0.02, 0.06, 0.02, M(0x4A7A2A), 0, 0.0, 0);
break;
case "matchbox":
m = gvwBox(g, 0.16, 0.06, 0.1, M(0x9A8A6A), 0, 0.03, 0);
gvwBox(g, 0.17, 0.02, 0.11, M(0x7A5A3A), 0, 0.07, 0);
break;
case "jar":
m = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.22, 12), gvwShine(0xC8D8D0, 0.15, 0));
m.position.y = 0.11;
g.add(m);
break;
case "note":
m = gvwBox(g, 0.2, 0.02, 0.14, M(0xF0E8D4), 0, 0.02, 0);
break;
case "skin":
m = gvwBox(g, 0.8, 0.05, 0.6, M(0xA88A60), 0, 0.03, 0);
break;
case "cane":
m = gvwBox(g, 0.06, 0.06, 1.8, M(0xC8B070), 0, 0.03, 0);
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
if (!P || !GVW.scG || P.sc !== GVW.sc)
return null;
var g = gvbItemMesh(kind), y = P.y != null ? P.y : gvwGround(P.x, P.z, 500);
g.position.set(P.x, y + 0.02, P.z);
GVW.scG.add(g);
var I = { g: g, P: P, name: name || kind };
I.S = gvwSpot(P.x, P.z, 1.8, I.name, verb || "pick it up", function () { if (GVB.items.indexOf(I) < 0)
return; if (g.parent)
g.parent.remove(g); var j = GVW.spots.indexOf(I.S); if (j >= 0)
GVW.spots.splice(j, 1); GVB.items = GVB.items.filter(function (x) { return x !== I; }); if (typeof playTone === "function")
playTone(980, 0.05); try {
onTake && onTake(I);
}
catch (e) { } }, y);
I.S.gvb = 1;
GVB.items.push(I);
return I;
},
function (k) {
if (GVB.tuneKey === k)
return;
GVB.tuneKey = k;
var old = GVB.tune;
GVB.tune = null;
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
if (!k || !GVB_TUNES[k])
return;
try {
var A = new Audio(GVB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
GVB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (GVB.tune !== A) {
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
if (GVB.text)
return fn(GVB.text);
if (GVB.textWait) {
GVB.textWait.push(fn);
return;
}
GVB.textWait = [fn];
var done = function (B) { GVB.text = B; var w = GVB.textWait; GVB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/laputa/laputa.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
gvbText(function (B) {
var C = GVB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3>" + GVB_PLAIN + "<div style='max-height:56vh;overflow:auto'>" + T.p.map(gvbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); GVB.readOpen = 0; GVB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = gvbS(), C = GVB_CH[S.ch];
if (!C)
return;
GVB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
GVB.readAsk = 0;
GVB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : "Gulliver's Travels") + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:44vh;overflow:auto'>" + (T ? gvbOpening(T).map(gvbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); GVB.readOpen = 0; gvbStepDone(); }, all: function () { gvbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Swift's own words, all of it");
b += gvbKeeperBtns(fns);
worldCard(b, fns);
};
gvbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
GVB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); gvbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = gvbS(), C = GVB_CH[S.ch];
if (!C)
return;
gvbItemsClear();
gvbCastClear();
GVB.hold = 0;
var go = function () { gvbWorldState(); gvbPopulate(); try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[gvb] setup", S.ch, e);
} gvbTune(C.tune || null); gvbStepBegin(); };
if (place && C.start) {
var P = gvbPos(C.start);
if (P && WLD.on === GVW_KEY) {
gvwGo({ sc: P.sc, x: P.x, z: P.z, y: P.y, ry: C.start.ry != null ? C.start.ry : (GVW_AT[C.start] || {}).ry }, null, go);
return;
}
}
go();
},
function () {
var b = gvbStep();
gvbItemsClear();
GVB.hold = 0;
GVB.puzOpen = 0;
if (!b)
return;
b._key = gvbKey();
gvbWorldState();
try {
if (b.on)
b.on(gvbS().f);
}
catch (e) {
if (window.console)
console.warn("[gvb] on", e);
}
if (b.k === "read") {
gvbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { GVB.rew[k] = 0; });
if (b.k === "find") {
var Pf = gvbPos(b.at);
if (Pf && Pf.sc === GVW.sc)
gvbItemAdd(b.item, Pf, b.name, b.verb, function () { if (gvbKey() === b._key)
gvbStepDone(); });
}
if (b.k === "gather") {
var P = gvbPos(b.at), n = b.n || 3, sp = b.spread || 6, R = wRand(gvbS().ch * 97 + gvbS().s * 13 + 7);
GVB.got = 0;
if (P && P.sc === GVW.sc)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { sc: P.sc, x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
Q.y = gvwGround(Q.x, Q.z, (P.y != null ? P.y : gvwLand(P.x, P.z)) + 1);
gvbItemAdd(b.item, Q, b.name, b.verb, function () { if (gvbKey() !== b._key)
return; GVB.got++; try {
if (b.each)
b.each(GVB.got);
}
catch (e) { } if (GVB.got < n) {
gvbSay((b.eachSay || "Got one.") + " " + GVB.got + " of " + n + ".");
return;
} gvbStepDone(); });
}
}
if (b.h)
gvbSay("<b>" + esc(GVB_CH[gvbS().ch].t) + ".</b> " + b.h);
},
function (b) {
GVB.puzOpen = 1;
GVB.puzT = performance.now();
var k = gvbKey(), fns = {}, h = GVB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
gvbSay(b.yes);
if (gvbKey() === k)
gvbStepDone();
return;
}
gvbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (gvbKey() === k)
GVB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = gvbS(), C = GVB_CH[S.ch], b = gvbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[gvb] done", e);
}
if (b.say)
gvbSay(b.say);
S.s++;
if (window.GVB_LOG)
GVB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= GVB_CH.length - 1) {
S.done = 1;
S.s = 0;
gvbSave();
gvbItemsClear();
gvbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
gvbSave();
var nx = GVB_CH[S.ch];
setTimeout(function () { try {
gvbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[gvb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
gvbSave();
gvbStepBegin();
},
function () {
gvbTune("end");
var S = gvbS();
var b = "<h3 style='margin:4px 0'>The voyage ends</h3><p style='font-style:italic'>" + gvQ("I went straight to Redriff, where I arrived the same day at two in the afternoon, and found my wife and family in good health.") + "</p><p style='font-size:12px;opacity:.75'>Jonathan Swift, Gulliver's Travels (1726), Part III, Chapter XI</p><p>You have been taken by pirates and set adrift, drawn up by a chain into the flying island of Laputa, stood beside the loadstone in the Astronomer's Cave, walked the ruined streets of Lagado and every room of the Grand Academy, dined with ghosts on Glubbdubdrib, met the immortals of Luggnagg, and sailed home by way of Japan.</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; gvbSave(); gvbChapterBegin(true); } };
b += worldBtn("again", "Sail it again from the start", "The Hopewell, August 1706");
worldCard(b, fns);
},
function (c) {
var C = GVB.cast[c.key || c.k];
if (gvbCastLive(C))
return C;
var P = gvbPos(c.at);
if (!P || P.sc !== GVW.sc)
return null;
var F = GVW_FOLK[c.k] || {}, o = { y: c.y != null ? c.y : (P.y != null ? P.y : null), greet: c.greet, mute: !!c.mute };
var Pp;
if (F.name && !c.dress)
Pp = gvwFolk(c.k, P.x + (c.ox || 0), P.z + (c.oz || 0), c.ry || 0, o);
else {
var g = gvwDressed("gvb" + (c.key || c.k), c.dress || "lsmojo", { sex: c.sex || "m", beard: c.beard, hair: c.hair, skin: c.skin });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
var y = o.y != null ? o.y : gvwGround(P.x, P.z, 500);
g.position.set(P.x + (c.ox || 0), y, P.z + (c.oz || 0));
g.rotation.y = c.ry || 0;
GVW.scG.add(g);
Pp = { g: g, y: y, o: {} };
GVW.people.push(Pp);
if (c.name && !c.mute)
gvwTalk(Pp, c.name, gvwPersona(c.persona), c.greet || "Good day.", c.r || 3.4);
}
if (c.lie) {
Pp.g.rotation.x = -Math.PI / 2;
Pp.g.position.y += 0.3;
}
GVB.cast[c.key || c.k] = { g: Pp.g, P: Pp, c: c };
return GVB.cast[c.key || c.k];
},
function () {
var C = GVB_CH[gvbS().ch];
if (!C || !C.cast)
return;
var idx = gvbS().s;
C.cast.forEach(function (c) { var key = c.key || c.k; if (c.from != null && idx < c.from) {
if (GVB.cast[key])
gvbCastHide(key);
return;
} if (c.until != null && idx >= c.until) {
if (GVB.cast[key])
gvbCastHide(key);
return;
} if (!gvbCastLive(GVB.cast[key]))
gvbCastAdd(c); });
},
function () {
if (!GVW.scG)
return;
gvbCastClear();
var S = gvbS(), C = GVB_CH[S.ch];
if (S.started && !S.done && C && C.cast && gvbCastHere(C)) {
gvbCastTick();
return;
}
(GVB_FOLK_AT[GVW.sc] || []).forEach(function (q) { var key = "f_" + q[0]; var Pp = gvwFolk(q[0], q[1], q[2], q[3], { y: q[4] }); if (Pp)
GVB.cast[key] = { g: Pp.g, P: Pp, c: { k: q[0] } }; });
},
function (T) {
if (!gvbActive())
return false;
var b = gvbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = gvbKey();
worldPrompt(null);
var next = function () { if (gvbKey() === k)
gvbStepDone(); };
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
worldCard(GVB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
GVB.wt += dt;
if (GVB.wt > 0.5) {
GVB.wt = 0;
if (gvbActive() && gvbCastHere(GVB_CH[gvbS().ch]))
gvbCastTick();
var S0 = gvbS();
S0.seen[GVW.sc] = 1;
}
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!gvbActive()) {
if (GVB.beam)
GVB.beam.visible = false;
GVW.bannerBook = false;
return;
}
var S = gvbS(), b = gvbStep(), t = GVW.t, feet = camera.position.y - 1.72;
GVB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? gvbPos(b.at) : null, here = P && P.sc === GVW.sc, bm = gvbBeam(), way = "";
if (P && !here)
way = "(the book will take you to " + gvbScName(P.sc) + ": press E for the book)";
if (here && !GVW.moving && !GVW.ride) {
bm.visible = true;
var y = P.y != null ? P.y : gvwGround(P.x, P.z, 500);
bm.position.set(P.x, y, P.z);
var cd = Math.hypot(P.x - L.x, P.z - L.z);
bm.userData.col.visible = cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = gvbWay(P, L);
}
else
bm.visible = false;
if (b && !cardOpen && !GVW.moving) {
var fd = here ? Math.hypot(P.x - L.x, P.z - L.z) : 1e9, near = here && (P.y == null || Math.abs(P.y - feet) < 6);
switch (b.k) {
case "read":
if (GVB.readAsk)
break;
if (!GVB.readOpen)
gvbChapterCard();
else {
GVB.readOpen = 0;
gvbStepDone();
return;
}
break;
case "go":
if (near && fd < (b.r || 6)) {
gvbStepDone();
return;
}
break;
case "hold":
if (near && fd < (b.r || 6)) {
GVB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(GVB.hold, dt);
}
catch (e) { }
if (GVB.hold >= (b.sec || 8)) {
gvbStepDone();
return;
}
}
else
GVB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return GVB.rew[k]; })) {
gvbStepDone();
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
gvbStepDone();
return;
}
break;
}
case "puzzle":
if ((!GVB.puzOpen || performance.now() - (GVB.puzT || 0) > 3000) && (!P || (near && fd < (b.r || 6))))
gvbPuzzleCard(b);
break;
}
}
var C = GVB_CH[S.ch], prog = b && b.k === "hold" && GVB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - GVB.hold)) + " s)" : b && b.k === "gather" ? " (" + (GVB.got || 0) + " of " + (b.n || 3) + ")" : "";
GVW.bannerBook = true;
worldBanner("⏳ <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var S = gvbS(), C = GVB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Jonathan Swift · Gulliver's Travels (1726), Part III, the whole voyage</div><h3 style='margin:4px 0'>🏝️ Gulliver's Third Voyage</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started) {
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((gvbStep() || {}).h || "") + "</p>";
var st = gvbStep(), P = st && st.at ? gvbPos(st.at) : null, Cs = gvbPos(C.start);
var to = P && P.sc !== GVW.sc ? P : (!P && Cs && Cs.sc !== GVW.sc ? Cs : null);
if (to) {
b += worldBtn("there", "▶ Go on to " + gvbScName(to.sc), "The book takes you where it goes next");
fns.there = function () { worldCard(null); gvwGo({ sc: to.sc, x: to.x, z: to.z, y: to.y }, null, function () { gvbPopulate(); gvbStepBegin(); }); };
}
}
else
b += "<p>August 1706. Lemuel Gulliver, ship's surgeon, sails again: to Tonquin, then in a little sloop of his own command, until pirates take her and set him adrift in a canoe. On a rocky island he looks up and sees an island in the air. Laputa, the flying island of mathematicians and musicians, lets down a chain for him; and from there his voyage goes to Balnibarbi and the Grand Academy of Lagado, to the sorcerers of Glubbdubdrib, to the immortals of Luggnagg, and home by way of Japan. The whole voyage, in Swift's own words, to live and to play.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: the Hopewell, August 1706", S.started ? "Back to where you were" : "\"I had not been at home above ten days\"");
fns.go = function () { worldCard(null); gvbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; gvbSave(); gvbBegin(); };
}
var kp = typeof isKeeperNow === "function" && isKeeperNow(), pl = Object.keys(GVW_SC).filter(function (k) { return kp || S.seen[k] || S.done; });
if (pl.length) {
b += "<div style='margin-top:8px;font-size:12px;opacity:.8'>Go back to a place you have been</div><div>";
pl.forEach(function (k) { b += "<span data-w='pl" + k + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + esc(GVW_SC[k].name) + "</span>"; fns["pl" + k] = function () { worldCard(null); var A = (GVW_SCN[k].start || { x: 0, z: 0 }); gvwGo({ sc: k, x: A.x, z: A.z, ry: A.ry }, null, gvbPopulate); }; });
b += "</div>";
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += gvbKeeperBtns(fns);
worldCard(b, fns);
},
function (st, s) {
var V = function (v) { return typeof v === "function" ? v(s) : v; };
if (GVW.sc === "sea") {
var ik = V(st.isle) || null;
if (ik && GVW_ISLE_AT[ik])
gvwIsleSet(true, GVW_ISLE_AT[ik]);
else
gvwIsleSet(false);
var seat = ik === "over" && !!V(st.seat);
if (seat && !GVW.seatA) {
var y = gvwSeaH(630, -600);
GVW.seatA = gvwChainSeat(GVW.scG, 630, y + 0.2, -603, Math.max(4, 118 - y - 2));
}
if (GVW.seatA)
GVW.seatA.visible = seat;
if (GVW.sloop)
GVW.sloop.visible = V(st.sloop) !== false;
}
if (GVW.sc === "cave")
GVW.stoneTilt = V(st.stone) || 0;
if (GVW.sc === "glubb" && GVW.gserv) {
var gs = V(st.servants) !== false;
GVW.gserv.forEach(function (P) { P.g.visible = gs; });
}
if (GVW.sc === "glubb") {
var army = V(st.army) || null;
if (army !== GVW.armyK) {
GVW.armyK = army;
if (GVW.armyG && GVW.armyG.parent)
GVW.armyG.parent.remove(GVW.armyG);
GVW.armyG = null;
GVW.ghosts = GVW.ghosts.filter(function (g) { return !g.userData.army; });
if (army) {
var g = new THREE.Group();
GVW.scG.add(g);
GVW.armyG = g;
g.userData.live = 1;
var R = wRand(army.length * 7), n = gvwLite() ? 18 : 40;
for (var i = 0; i < n; i++) {
var x = -110 + (i % 10) * 6 + R() * 1.5, z = -150 + Math.floor(i / 10) * 6;
var p = gvwDressed("army" + army + i, "gvancient", { sex: "m", beard: R() < 0.5 ? "full" : null });
p.position.set(x, gvwGlubbH(x, z), z);
p.rotation.y = Math.PI * 0.25;
g.add(p);
gvwGhostly(p);
p.userData.army = 1;
var sp = new THREE.Mesh(gvwGeo("spear", function () { var c = new THREE.CylinderGeometry(0.02, 0.02, 2.6, 5); c.translate(0, 1.3, 0); return c; }), gvwMat("bronze"));
sp.position.set(0.3, 0, 0.1);
p.add(sp);
}
}
}
}
if (GVW.sc === "balnibarbi" && GVW.seatB)
GVW.seatB.visible = !!V(st.seatB);
if (GVW.sc === "balnibarbi" && GVW.isle) {
var ib = V(st.isleB) || "city";
var P = { city: { x: -120, y: 620, z: -260 }, mount: { x: 0, y: 420, z: -300 }, far: { x: -1600, y: 1200, z: -2400 } }[ib] || { x: -120, y: 620, z: -260 };
GVW.isle.position.set(P.x, P.y, P.z);
GVW.isle.userData.y0 = P.y;
GVW.isle.visible = ib !== "none";
}
}
];
});
