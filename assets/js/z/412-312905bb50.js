/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(412, function () {
return [
function (key, w, h, fn, rep) {
if (SPK_TEX[key])
return SPK_TEX[key];
var t = wTex(w, h, fn);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
if (rep)
t.repeat.set(rep, rep);
if (typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
if (typeof renderer !== "undefined" && renderer && renderer.capabilities)
t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
return (SPK_TEX[key] = t);
},
function (x, W, H, n, cols, rmin, rmax, seed, ell) {
var R = wRand(seed);
for (var i = 0; i < n; i++) {
x.fillStyle = cols[Math.floor(R() * cols.length)];
var px = R() * W, py = R() * H, r = rmin + R() * (rmax - rmin);
x.beginPath();
if (ell)
x.ellipse(px, py, r, r * 0.55, R() * 3.14, 0, 7);
else
x.arc(px, py, r, 0, 7);
x.fill();
if (px < rmax || py < rmax || px > W - rmax || py > H - rmax) {
[[W, 0], [-W, 0], [0, H], [0, -H]].forEach(function (o) { x.beginPath(); if (ell)
x.ellipse(px + o[0], py + o[1], r, r * 0.55, 0, 0, 7);
else
x.arc(px + o[0], py + o[1], r, 0, 7); x.fill(); });
}
}
},
function (k) {
return spkTex("g" + k, 256, 256, function (x, W, H) {
if (k === "snow") {
x.fillStyle = "#E6EEF4";
x.fillRect(0, 0, W, H);
spkSpeck(x, W, H, 900, ["#F8FBFF", "#D4E0EA", "#DCE6EE", "#FFFFFF"], 1, 5, 11);
spkSpeck(x, W, H, 60, ["#C4D2DE"], 4, 10, 12, true);
}
else if (k === "blossom") {
x.fillStyle = "#5E9A44";
x.fillRect(0, 0, W, H);
spkSpeck(x, W, H, 1400, ["#4E8A38", "#6AAA4C", "#7AB858", "#568E3E"], 1, 3, 21);
spkSpeck(x, W, H, 260, ["#F6C4D4", "#FFE8F0", "#F0A8C0", "#FFFFFF"], 1.2, 2.6, 22, true);
spkSpeck(x, W, H, 40, ["#F8E070", "#B8A0E8"], 1.5, 2.5, 23);
}
else if (k === "lawn") {
var g = x.createLinearGradient(0, 0, W, 0);
g.addColorStop(0, "#4E9A34");
g.addColorStop(0.5, "#5AA83C");
g.addColorStop(0.5001, "#468C2E");
g.addColorStop(1, "#4E9632");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
spkSpeck(x, W, H, 1600, ["#3E8428", "#62B044", "#56A03A", "#4A9230"], 0.8, 2.4, 31);
spkSpeck(x, W, H, 30, ["#F8F0A0", "#FFFFFF"], 1, 1.8, 32);
}
else if (k === "leaves") {
x.fillStyle = "#6A5A30";
x.fillRect(0, 0, W, H);
spkSpeck(x, W, H, 700, ["#5A6A30", "#6E5E34", "#7A6838"], 1, 3, 41);
spkSpeck(x, W, H, 700, ["#C8501E", "#E08A28", "#E8B438", "#A8401A", "#D86A2A", "#8A3A18"], 2, 5, 42, true);
}
else if (k === "paved") {
x.fillStyle = "#C8C0B0";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(90,80,70,.35)";
x.lineWidth = 2;
for (var i = 0; i <= 8; i++) {
x.beginPath();
x.moveTo(0, i * 32);
x.lineTo(W, i * 32);
x.stroke();
}
for (var r = 0; r < 8; r++)
for (var c = 0; c <= 4; c++) {
x.beginPath();
var px = c * 64 + (r % 2 ? 32 : 0);
x.moveTo(px, r * 32);
x.lineTo(px, r * 32 + 32);
x.stroke();
}
spkSpeck(x, W, H, 500, ["rgba(255,255,255,.25)", "rgba(60,50,40,.18)"], 0.6, 1.6, 51);
}
else if (k === "ice") {
var gi = x.createLinearGradient(0, 0, W, H);
gi.addColorStop(0, "#BFE2F2");
gi.addColorStop(1, "#9CCBE4");
x.fillStyle = gi;
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(255,255,255,.55)";
x.lineWidth = 1.2;
var R = wRand(61);
for (var s = 0; s < 40; s++) {
var a = R() * 6.28, px2 = R() * W, py2 = R() * H, l = 20 + R() * 60;
x.beginPath();
x.moveTo(px2, py2);
x.quadraticCurveTo(px2 + Math.cos(a + 0.5) * l * 0.5, py2 + Math.sin(a + 0.5) * l * 0.5, px2 + Math.cos(a) * l, py2 + Math.sin(a) * l);
x.stroke();
}
}
else if (k === "water") {
x.fillStyle = "#3A7A96";
x.fillRect(0, 0, W, H);
spkSpeck(x, W, H, 240, ["rgba(160,215,235,.35)", "rgba(255,255,255,.22)", "rgba(30,80,110,.3)"], 2, 9, 71, true);
}
else if (k === "field") {
x.fillStyle = "#5A4A2E";
x.fillRect(0, 0, W, H);
spkSpeck(x, W, H, 900, ["#4A3C24", "#6A5838", "#3E6A28", "#4E7A2E"], 1, 3.4, 81);
}
});
},
function (title, sub, col, bg) {
return spkTex("s" + title, 512, 128, function (x, W, H) {
x.fillStyle = bg || "#1E2A22";
x.fillRect(0, 0, W, H);
x.strokeStyle = col;
x.lineWidth = 6;
x.strokeRect(5, 5, W - 10, H - 10);
hallText(x, title.toUpperCase(), W / 2, 48, W - 30, "bold " + (title.length > 18 ? 27 : title.length > 14 ? 33 : 40) + "px Georgia,serif", col);
hallText(x, sub || "", W / 2, 96, W - 40, "italic 24px Georgia,serif", "#F4ECD8");
});
},
function () {
return spkTex("hay", 128, 128, function (x, W, H) {
x.fillStyle = "#C8A850";
x.fillRect(0, 0, W, H);
var R = wRand(5);
for (var i = 0; i < 500; i++) {
x.strokeStyle = ["#E0C470", "#A8883A", "#D8B860", "#B89848"][i % 4];
x.lineWidth = 1 + R() * 1.5;
var y = R() * H, x0 = R() * W;
x.beginPath();
x.moveTo(x0, y);
x.lineTo(x0 + 10 + R() * 30, y + (R() - 0.5) * 4);
x.stroke();
}
x.strokeStyle = "rgba(90,60,20,.6)";
x.lineWidth = 3;
[0.3, 0.7].forEach(function (f) { x.beginPath(); x.moveTo(f * W, 0); x.lineTo(f * W, H); x.stroke(); });
});
},
function (parts) {
var pos = [], nor = [], idx = [], base = 0;
parts.forEach(function (g) {
var ng = g.index ? g.toNonIndexed() : g;
var p = ng.attributes.position, n = ng.attributes.normal;
for (var i = 0; i < p.count; i++) {
pos.push(p.getX(i), p.getY(i), p.getZ(i));
nor.push(n.getX(i), n.getY(i), n.getZ(i));
idx.push(base + i);
}
base += p.count;
if (ng !== g)
ng.dispose();
g.dispose();
});
var out = new THREE.BufferGeometry();
out.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
out.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
out.setIndex(idx);
return out;
},
function (k) {
if (SPK_GEO[k])
return SPK_GEO[k];
var g;
if (k === "trunk") {
g = new THREE.CylinderGeometry(0.16, 0.28, 3.2, 6);
g.translate(0, 1.6, 0);
}
else if (k === "crown") {
var a = new THREE.IcosahedronGeometry(2.1, 1);
a.translate(0, 4.2, 0);
var b = new THREE.IcosahedronGeometry(1.6, 1);
b.translate(1.1, 3.6, 0.4);
var c = new THREE.IcosahedronGeometry(1.5, 1);
c.translate(-1, 3.7, -0.5);
g = spkMerge([a, b, c]);
}
else if (k === "pinecrown") {
var p1 = new THREE.ConeGeometry(2.2, 3.4, 8);
p1.translate(0, 2.6, 0);
var p2 = new THREE.ConeGeometry(1.7, 2.8, 8);
p2.translate(0, 4.2, 0);
var p3 = new THREE.ConeGeometry(1.1, 2.2, 8);
p3.translate(0, 5.7, 0);
g = spkMerge([p1, p2, p3]);
}
else if (k === "bench") {
g = spkMerge([spkBox(1.8, 0.08, 0.46, 0, 0.46, 0), spkBox(1.8, 0.42, 0.06, 0, 0.76, -0.22), spkBox(0.08, 0.46, 0.42, -0.8, 0.23, 0), spkBox(0.08, 0.46, 0.42, 0.8, 0.23, 0)]);
}
else if (k === "post") {
g = new THREE.CylinderGeometry(0.07, 0.1, 3.6, 6);
g.translate(0, 1.8, 0);
}
else if (k === "lamphead") {
g = new THREE.CylinderGeometry(0.2, 0.14, 0.42, 6);
g.translate(0, 3.8, 0);
}
else if (k === "lampcap") {
g = new THREE.ConeGeometry(0.3, 0.26, 6);
g.translate(0, 4.14, 0);
}
else if (k === "railpost") {
g = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 4);
g.translate(0, 0.6, 0);
}
else if (k === "unit") {
g = new THREE.BoxGeometry(1, 1, 1);
g.translate(0, 0.5, 0);
}
else if (k === "ucyl") {
g = new THREE.CylinderGeometry(0.5, 0.5, 1, 10);
g.translate(0, 0.5, 0);
}
else if (k === "ball") {
g = new THREE.SphereGeometry(0.5, 10, 8);
}
else if (k === "bulb") {
g = new THREE.SphereGeometry(0.1, 6, 4);
}
else if (k === "flower") {
var st = new THREE.CylinderGeometry(0.015, 0.015, 0.4, 3);
st.translate(0, 0.2, 0);
var hd = new THREE.ConeGeometry(0.09, 0.14, 5);
hd.rotateX(Math.PI);
hd.translate(0, 0.45, 0);
g = spkMerge([st, hd]);
}
else if (k === "bloom") {
g = new THREE.SphereGeometry(0.11, 5, 4);
g.translate(0, 0.42, 0);
}
else if (k === "stem") {
g = new THREE.CylinderGeometry(0.03, 0.03, 0.42, 3);
g.translate(0, 0.21, 0);
}
else if (k === "pumpkin") {
g = new THREE.SphereGeometry(0.5, 12, 8);
var pp = g.attributes.position, v = new THREE.Vector3();
for (var i = 0; i < pp.count; i++) {
v.fromBufferAttribute(pp, i);
var an = Math.atan2(v.z, v.x), rib = 1 + 0.07 * Math.cos(an * 8);
v.x *= rib;
v.z *= rib;
v.y *= 0.74;
pp.setXYZ(i, v.x, v.y + 0.37, v.z);
}
g.computeVertexNormals();
}
else if (k === "bale") {
g = new THREE.BoxGeometry(1.6, 0.9, 0.9);
g.translate(0, 0.45, 0);
}
else if (k === "snowman") {
var s1 = new THREE.SphereGeometry(0.62, 10, 8);
s1.translate(0, 0.55, 0);
var s2 = new THREE.SphereGeometry(0.44, 10, 8);
s2.translate(0, 1.4, 0);
var s3 = new THREE.SphereGeometry(0.3, 10, 8);
s3.translate(0, 2.0, 0);
g = spkMerge([s1, s2, s3]);
}
else if (k === "hat") {
var h1 = new THREE.CylinderGeometry(0.2, 0.2, 0.34, 8);
h1.translate(0, 2.42, 0);
var h2 = new THREE.CylinderGeometry(0.32, 0.32, 0.04, 10);
h2.translate(0, 2.26, 0);
g = spkMerge([h1, h2]);
}
else if (k === "carrot") {
g = new THREE.ConeGeometry(0.05, 0.3, 5);
g.rotateX(Math.PI / 2);
g.translate(0, 2.0, 0.42);
}
else if (k === "sunflower") {
var ss = new THREE.CylinderGeometry(0.035, 0.05, 2.3, 4);
ss.translate(0, 1.15, 0);
var lf = spkBox(0.5, 0.02, 0.18, 0.2, 1.1, 0);
g = spkMerge([ss, lf]);
}
else if (k === "sunhead") {
g = new THREE.CylinderGeometry(0.32, 0.32, 0.06, 10);
g.rotateX(Math.PI / 2 - 0.3);
g.translate(0, 2.35, 0.08);
}
else if (k === "suneye") {
g = new THREE.CylinderGeometry(0.15, 0.15, 0.08, 8);
g.rotateX(Math.PI / 2 - 0.3);
g.translate(0, 2.36, 0.11);
}
else if (k === "duck") {
var db = new THREE.SphereGeometry(0.22, 8, 6);
db.scale(1, 0.7, 1.5);
db.translate(0, 0.1, 0);
var dh = new THREE.SphereGeometry(0.11, 8, 6);
dh.translate(0, 0.3, 0.24);
g = spkMerge([db, dh]);
}
else if (k === "swan") {
var hull = new THREE.SphereGeometry(1, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2);
hull.scale(0.9, 0.5, 1.5);
hull.rotateX(Math.PI);
hull.translate(0, 0.5, 0);
var neck = new THREE.CylinderGeometry(0.12, 0.18, 1.4, 6);
neck.rotateX(0.35);
neck.translate(0, 1.2, 0.95);
var head = new THREE.SphereGeometry(0.2, 8, 6);
head.translate(0, 1.85, 1.2);
var seat = spkBox(1.2, 0.1, 1.2, 0, 0.55, -0.2);
g = spkMerge([hull, neck, head, seat]);
}
else if (k === "pad") {
g = new THREE.CircleGeometry(0.45, 8);
g.rotateX(-Math.PI / 2);
}
else if (k === "rock") {
g = new THREE.DodecahedronGeometry(0.6, 0);
g.scale(1, 0.55, 0.8);
}
else if (k === "kite") {
g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute([0, 0.5, 0, -0.32, 0, 0, 0, -0.6, 0, 0, 0.5, 0, 0, -0.6, 0, 0.32, 0, 0], 3));
g.computeVertexNormals();
}
else if (k === "star") {
g = new THREE.OctahedronGeometry(0.3, 0);
}
else if (k === "egg") {
g = new THREE.SphereGeometry(0.16, 10, 8);
g.scale(1, 1.3, 1);
}
else if (k === "leaf") {
g = new THREE.CircleGeometry(0.22, 6);
g.scale(1, 1.5, 1);
}
else if (k === "chalet") {
g = spkMerge([spkBox(4, 2.6, 3, 0, 1.3, 0)]);
}
else if (k === "roof") {
var rf = new THREE.CylinderGeometry(0.01, 2.9, 1.5, 4, 1);
rf.rotateY(Math.PI / 4);
rf.scale(1.12, 1, 0.85);
rf.translate(0, 3.35, 0);
g = rf;
}
else if (k === "ribbon") {
g = new THREE.PlaneGeometry(0.18, 1);
g.translate(0, -0.5, 0);
}
return (SPK_GEO[k] = g);
},
function (k, col, opt) {
var key = k + ":" + (col === undefined ? "" : col);
if (SPK_MAT[key])
return SPK_MAT[key];
var m, o = opt || {};
if (k === "basic")
m = new THREE.MeshBasicMaterial({ color: col, fog: true, side: o.side || THREE.FrontSide, transparent: !!o.op, opacity: o.op || 1 });
else if (k === "glow")
m = new THREE.MeshBasicMaterial({ color: col, fog: true });
else
m = new THREE.MeshLambertMaterial({ color: col === undefined ? 0xFFFFFF : col, side: o.side || THREE.FrontSide, transparent: !!o.op, opacity: o.op || 1, emissive: o.em || 0x000000 });
return (SPK_MAT[key] = m);
},
function (G, geo, mat, list, cols) {
if (!list.length)
return null;
var im = new THREE.InstancedMesh(geo, mat, list.length);
list.forEach(function (p, i) {
SPK_O.position.set(p[0], p[1], p[2]);
SPK_O.rotation.set(p[7] || 0, p[3] || 0, 0);
var s = p[4] || 1;
SPK_O.scale.set(s, p[6] ? s * p[6] : s, s);
SPK_O.updateMatrix();
im.setMatrixAt(i, SPK_O.matrix);
if (cols) {
SPK_C.setHex(p[5] !== undefined ? p[5] : 0xFFFFFF);
im.setColorAt(i, SPK_C);
}
});
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.raycast = function () { };
im.userData.spkOwn = true;
im.frustumCulled = false;
G.add(im);
return im;
},
function (G, mat, list, cols) {
if (!list.length)
return null;
var im = new THREE.InstancedMesh(spkGeo("unit"), mat, list.length);
list.forEach(function (p, i) {
SPK_O.position.set(p[0], p[1], p[2]);
SPK_O.rotation.set(0, p[3] || 0, 0);
SPK_O.scale.set(p[4], p[5], p[6]);
SPK_O.updateMatrix();
im.setMatrixAt(i, SPK_O.matrix);
if (cols) {
SPK_C.setHex(p[7] !== undefined ? p[7] : 0xFFFFFF);
im.setColorAt(i, SPK_C);
}
});
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.raycast = function () { };
im.userData.spkOwn = true;
im.frustumCulled = false;
G.add(im);
return im;
},
function (G, file, want, list, alive, then) {
if (!list.length || typeof modelFile !== "function" || !(typeof modelsOn === "function" && modelsOn())) {
if (then)
then(false);
return;
}
modelFile(file, function (F) {
if (!F || !F.scene || !alive() || !G.parent) {
if (then)
then(false);
return;
}
var sc = F.scene;
sc.updateMatrixWorld(true);
var box = new THREE.Box3().setFromObject(sc), k = want / Math.max(0.01, box.max.y - box.min.y), inv = new THREE.Matrix4().copy(sc.matrixWorld).invert();
var norm = new THREE.Matrix4().makeTranslation(0, -box.min.y * k, 0).multiply(new THREE.Matrix4().makeScale(k, k, k)), M = new THREE.Matrix4(), rel = new THREE.Matrix4();
sc.traverse(function (m) {
if (!m.isMesh)
return;
rel.copy(inv).multiply(m.matrixWorld);
var leafy = /green|leaf/i.test((m.material && m.material.name) || ""), mat = m.material;
if (leafy) {
mat = m.material.clone();
mat.color.setHex(0xFFFFFF);
}
var im = new THREE.InstancedMesh(m.geometry, mat, list.length);
list.forEach(function (p, i) {
SPK_O.position.set(p[0], p[1], p[2]);
SPK_O.rotation.set(0, p[3] || 0, 0);
var s = p[4] || 1;
SPK_O.scale.set(s, s, s);
SPK_O.updateMatrix();
M.copy(SPK_O.matrix).multiply(norm).multiply(rel);
im.setMatrixAt(i, M);
if (leafy) {
SPK_C.setHex(p[5] !== undefined ? p[5] : 0xFFFFFF);
im.setColorAt(i, SPK_C);
}
});
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.raycast = function () { };
im.userData.spkOwn = true;
if (leafy)
im.userData.spkMat = true;
im.castShadow = false;
im.receiveShadow = true;
im.frustumCulled = false;
G.add(im);
});
if (then)
then(true);
});
},
function (G) {
if (!G)
return;
if (G.parent)
G.parent.remove(G);
G.traverse(function (m) {
try {
if (m.isInstancedMesh && m.userData.spkOwn && m.dispose)
m.dispose();
if (m.userData.spkMat && m.material && m.material.dispose)
m.material.dispose();
if (m.userData.spkFigGeo && m.geometry)
m.geometry.dispose();
if (m.userData.spkMine) {
if (m.geometry)
m.geometry.dispose();
if (m.material && m.material.dispose && !m.userData.spkShared)
m.material.dispose();
}
}
catch (e) { }
});
},
function (S) {
var uL = S.U - 16, a = SPK_LOOP.vIn, b = SPK_LOOP.vOut, rc = SPK_LOOP.rc, pts = [];
function line(u0, v0, u1, v1) { var n = Math.max(1, Math.ceil(Math.hypot(u1 - u0, v1 - v0) / 3)); for (var i = 0; i < n; i++)
pts.push([u0 + (u1 - u0) * i / n, v0 + (v1 - v0) * i / n]); }
function arc(cu, cv, t0, t1) { for (var i = 0; i < 6; i++) {
var t = t0 + (t1 - t0) * i / 6;
pts.push([cu + Math.cos(t) * rc, cv + Math.sin(t) * rc]);
} }
line(-uL + rc, a, uL - rc, a);
arc(uL - rc, a + rc, -Math.PI / 2, 0);
line(uL, a + rc, uL, b - rc);
arc(uL - rc, b - rc, 0, Math.PI / 2);
line(uL - rc, b, -uL + rc, b);
arc(-uL + rc, b - rc, Math.PI / 2, Math.PI);
line(-uL, b - rc, -uL, a + rc);
arc(-uL + rc, a + rc, Math.PI, Math.PI * 1.5);
pts.push(pts[0].slice());
return pts;
},
function (S) {
var U = S.U, uL = U - 16, gU = Math.round(U * 0.62), k = S.D.k, P = [];
P.push({ w: 4, pts: spkLoopPts(S) });
P.push({ w: 5, pts: [[0, SPK_R1 + 1], [0, SPK_MID.v + SPK_MID.rv - 1]] });
[-1, 1].forEach(function (sd) {
P.push({ w: 3, pts: [[sd * gU, SPK_R1 + 1], [sd * gU, SPK_LOOP.vOut]] });
P.push({ w: 3.5, pts: [[sd * (U + 1), SPK_MID.v], [sd * uL, SPK_MID.v]] });
var W = spkWing(k, sd);
if (W.ring) {
P.push({ w: 3.5, pts: [[sd * (SPK_MID.ru - 1), SPK_MID.v], [sd * (SPK_WING - W.ring[0]), SPK_MID.v]] });
P.push({ w: 3.5, pts: [[sd * (SPK_WING + W.ring[0]), SPK_MID.v], [sd * uL, SPK_MID.v]] });
if (W.box)
P.push({ w: 3, pts: [[sd * SPK_WING - W.ring[0], SPK_MID.v - W.ring[1]], [sd * SPK_WING + W.ring[0], SPK_MID.v - W.ring[1]], [sd * SPK_WING + W.ring[0], SPK_MID.v + W.ring[1]], [sd * SPK_WING - W.ring[0], SPK_MID.v + W.ring[1]], [sd * SPK_WING - W.ring[0], SPK_MID.v - W.ring[1]]] });
else
P.push({ w: 3, pts: spkEllPts(sd * SPK_WING, SPK_MID.v, W.ring[0], W.ring[1], 48) });
}
else
P.push({ w: 3.5, pts: [[sd * (SPK_MID.ru - 1), SPK_MID.v], [sd * uL, SPK_MID.v]] });
});
return P;
},
function (k, sd) {
if (k === "winter")
return sd < 0 ? { kind: "ice", ru: 24, rv: 16, ring: [27, 19] } : { kind: "market", ru: 26, rv: 16 };
if (k === "spring")
return sd < 0 ? { kind: "pond", ru: 22, rv: 14, ring: [25, 17] } : { kind: "tulips", ru: 26, rv: 18 };
if (k === "summer")
return sd < 0 ? { kind: "lake", ru: 24, rv: 16, ring: [27, 19] } : { kind: "sunflowers", ru: 24, rv: 16 };
return sd < 0 ? { kind: "maze", ru: 15.4, rv: 15.4, ring: [18, 18], box: true } : { kind: "pumpkins", ru: 24, rv: 16 };
},
function (S, A, pts, w, yo) {
var L = 0;
for (var i = 0; i < pts.length; i++) {
var p = pts[i], q = pts[Math.min(i + 1, pts.length - 1)], o = pts[Math.max(i - 1, 0)], du = q[0] - o[0], dv = q[1] - o[1], n = Math.hypot(du, dv) || 1, nu = -dv / n * w / 2, nv = du / n * w / 2;
if (i > 0)
L += Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]);
var l = spkW(S, p[0] + nu, p[1] + nv), r = spkW(S, p[0] - nu, p[1] - nv);
A.pos.push(l.x, spkY(l.x, l.z) + yo, l.z, r.x, spkY(r.x, r.z) + yo, r.z);
A.uv.push(0, L / 4, w / 4, L / 4);
if (i > 0) {
var b = A.n;
A.idx.push(b - 2, b, b - 1, b - 1, b, b + 1);
}
A.n += 2;
}
},
function (A, mat) {
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(A.pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(A.uv, 2));
g.setIndex(A.idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.receiveShadow = true;
spkMine(m);
m.userData.spkShared = true;
return m;
},
function (S, u0, u1, v0, v1, yo, mat, scale) {
var A = { pos: [], uv: [], idx: [], n: 0 }, nu = Math.max(1, Math.ceil((u1 - u0) / 8)), nv = Math.max(1, Math.ceil((v1 - v0) / 8)), sc = scale || 6;
for (var j = 0; j <= nv; j++)
for (var i = 0; i <= nu; i++) {
var u = u0 + (u1 - u0) * i / nu, v = v0 + (v1 - v0) * j / nv, p = spkW(S, u, v);
A.pos.push(p.x, spkY(p.x, p.z) + yo, p.z);
A.uv.push(u / sc, v / sc);
}
for (j = 0; j < nv; j++)
for (i = 0; i < nu; i++) {
var a = j * (nu + 1) + i, b = a + 1, c = a + nu + 1, d = c + 1;
A.idx.push(a, c, b, b, c, d);
}
return spkSurfMesh(A, mat);
},
function (S, cu, cv, ru, rv, yo, mat, scale) {
var A = { pos: [], uv: [], idx: [], n: 0 }, R = 6, N = 40, sc = scale || 6;
for (var j = 0; j <= R; j++)
for (var i = 0; i < N; i++) {
var t = i / N * Math.PI * 2, f = j / R, u = cu + Math.cos(t) * ru * f, v = cv + Math.sin(t) * rv * f, p = spkW(S, u, v);
A.pos.push(p.x, spkY(p.x, p.z) + yo, p.z);
A.uv.push(u / sc, v / sc);
}
for (j = 0; j < R; j++)
for (i = 0; i < N; i++) {
var a = j * N + i, b = j * N + (i + 1) % N, c = a + N, d = b + N;
A.idx.push(a, b, c, b, d, c);
}
return spkSurfMesh(A, mat);
},
function (S) {
var G = new THREE.Group();
G.name = "season park " + S.D.k;
scene.add(G);
var D = S.D, k = D.k, small = spkSmall(), gen = (SPK.gen = (SPK.gen || 0) + 1);
var P = { S: S, G: G, gen: gen, cc: [], cb: [], ce: [], glows: [], stalls: [], acts: [], anim: [], lamps: [], hunt: [], trees: 0, inst: 0, small: small, plat: null };
SPK.cur = P;
var alive = function () { return SPK.cur === P; };
function W(u, v) { return spkW(S, u, v); }
function at(u, v, dy) { var p = W(u, v); return [p.x, spkY(p.x, p.z) + (dy || 0), p.z, p.a]; }
var paths = spkPaths(S);
P.paths = paths;
var U = S.U, uL = U - 16, gU = Math.round(U * 0.62);
G.add(spkRect(S, -U, U, SPK_R0, SPK_R1, 0.03, spkSurfMat(spkGroundTex(D.ground), 1), 6));
var A = { pos: [], uv: [], idx: [], n: 0 };
paths.forEach(function (p) {
var B = { pos: [], uv: [], idx: [], n: 0 };
spkRibbon(S, B, p.pts, p.w, 0.07);
var base = A.n;
B.idx.forEach(function (i) { A.idx.push(i + base); });
A.pos = A.pos.concat(B.pos);
A.uv = A.uv.concat(B.uv);
A.n += B.n;
});
G.add(spkSurfMesh(A, spkSurfMat(spkPathTex(D.path), 2)));
G.add(spkEll(S, SPK_MID.u, SPK_MID.v, SPK_MID.ru, SPK_MID.rv, 0.09, spkSurfMat(spkGroundTex("paved"), 3), 3));
var gatesOut = [[0, 4.5], [-gU, 2.6], [gU, 2.6]], posts = [], rails = [], hedge = [], tops = [], pillars = [], caps = [];
function gap(u) { return gatesOut.some(function (g) { return Math.abs(u - g[0]) < g[1]; }); }
for (var u = -U; u <= U; u += 2.4) {
if (gap(u))
continue;
posts.push(at(u, SPK_R1));
var nx = Math.min(U, u + 2.4);
if (!gap(nx) && nx > u) {
var m = W(u + 1.2, SPK_R1), y = spkY(m.x, m.z);
[0.5, 1.05].forEach(function (h) { rails.push([m.x, y + h, m.z, spkOutRot(m.a), 2.4, 0.06, 0.06]); });
}
}
[-1, 1].forEach(function (sd) { for (var v = SPK_R0; v <= SPK_R1; v += 2.4) {
if (Math.abs(v - SPK_MID.v) < 3)
continue;
posts.push(at(sd * U, v));
if (v + 2.4 <= SPK_R1 && Math.abs(v + 2.4 - SPK_MID.v) >= 3) {
var m2 = W(sd * U, v + 1.2), y2 = spkY(m2.x, m2.z);
[0.5, 1.05].forEach(function (h) { rails.push([m2.x, y2 + h, m2.z, spkAlongRot(m2.a), 2.4, 0.06, 0.06]); });
}
} });
for (var hu = -U + 2; hu < U - 1; hu += 4) {
var hp = W(hu, SPK_R0 + 0.9), hy = spkY(hp.x, hp.z);
hedge.push([hp.x, hy, hp.z, spkOutRot(hp.a), 4.05, 1.5, 1.2, D.hedge]);
if (k === "winter")
tops.push([hp.x, hy + 1.5, hp.z, spkOutRot(hp.a), 4.1, 0.18, 1.3]);
}
var gp = [];
gatesOut.forEach(function (g) { gp.push([g[0] - g[1] - 0.5, SPK_R1, g[0] === 0 ? 3.6 : 2.8]); gp.push([g[0] + g[1] + 0.5, SPK_R1, g[0] === 0 ? 3.6 : 2.8]); });
[-1, 1].forEach(function (sd) { gp.push([sd * U, SPK_MID.v - 3.5, 2.8]); gp.push([sd * U, SPK_MID.v + 3.5, 2.8]); });
gp.forEach(function (q) { var p = W(q[0], q[1]), y = spkY(p.x, p.z); pillars.push([p.x, y, p.z, spkOutRot(p.a), 0.9, q[2], 0.9]); caps.push([p.x, y + q[2] + 0.25, p.z, 0, 0.55]); P.cc.push({ u: q[0], v: q[1], r: 0.75 }); });
var stone = spkMat("lam", 0xD8D0C0), railM = spkMat("lam", D.rail), lampM = spkMat("glow", D.lamp);
spkInst(G, spkGeo("railpost"), railM, posts);
spkBoxes(G, railM, rails);
spkBoxes(G, spkMat("lam", 0xFFFFFF), hedge, true);
if (tops.length)
spkBoxes(G, spkMat("lam", 0xF4F8FC), tops);
spkBoxes(G, stone, pillars);
spkInst(G, spkGeo("ball"), lampM, caps);
var mg = W(0, SPK_R1), my = spkY(mg.x, mg.z), arch = new THREE.Group();
arch.position.set(mg.x, my, mg.z);
arch.rotation.y = spkOutRot(mg.a);
G.add(arch);
var beam = spkMine(new THREE.Mesh(new THREE.BoxGeometry(11, 0.7, 0.7), stone));
beam.userData.spkShared = true;
beam.position.y = 4.1;
arch.add(beam);
[1, -1].forEach(function (f) { var sg = spkMine(new THREE.Mesh(new THREE.PlaneGeometry(7, 1.75), new THREE.MeshBasicMaterial({ map: spkSignTex(D.title, D.sub, "#F2D27A"), fog: true }))); sg.position.set(0, 5.25, f * 0.36); if (f < 0)
sg.rotation.y = Math.PI; arch.add(sg); });
P.board = { u: 6, v: SPK_R1 - 3 };
var bd = W(P.board.u, P.board.v), bdy = spkY(bd.x, bd.z), board = new THREE.Group();
board.position.set(bd.x, bdy, bd.z);
board.rotation.y = spkOutRot(bd.a) + Math.PI;
G.add(board);
var bdp = spkMine(new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.65), new THREE.MeshBasicMaterial({ map: spkSignTex("The park board", D.title, "#F2D27A"), fog: true, side: THREE.DoubleSide })));
bdp.position.y = 1.7;
board.add(bdp);
P.acts.push({ u: P.board.u, v: P.board.v, r: 2.6, txt: "📋 <b>" + D.title + "</b> · <b>press E</b> to read the park board", fn: function () { spkBoardCard(P); } });
var lamps = [], benches = [], loop = paths[0].pts, Ls = 0, nextLamp = 6, nextBench = 16, joins = [];
paths.slice(1).forEach(function (p) { joins.push(p.pts[0], p.pts[p.pts.length - 1]); });
var others = paths.slice(1);
function nearJoin(u, v, r) { return joins.some(function (j) { return Math.hypot(j[0] - u, j[1] - v) < r; }) || spkPathDist(others, u, v) < 2; }
for (var i = 1; i < loop.length; i++) {
var a0 = loop[i - 1], a1 = loop[i], sl = Math.hypot(a1[0] - a0[0], a1[1] - a0[1]);
Ls += sl;
var du = (a1[0] - a0[0]) / (sl || 1), dv = (a1[1] - a0[1]) / (sl || 1);
if (Ls >= nextLamp) {
nextLamp += small ? 26 : 19;
if (!nearJoin(a1[0] + dv * 3, a1[1] - du * 3, 6))
lamps.push([a1[0] + dv * 3, a1[1] - du * 3]);
}
if (Ls >= nextBench) {
nextBench += small ? 30 : 21;
if (!nearJoin(a1[0] - dv * 3.3, a1[1] + du * 3.3, 7))
benches.push([a1[0] - dv * 3.3, a1[1] + du * 3.3, a1[0], a1[1]]);
}
}
for (var av = SPK_R1 - 4; av > SPK_MID.v + SPK_MID.rv + 2; av -= small ? 9 : 7) {
lamps.push([-3.6, av]);
lamps.push([3.6, av]);
}
for (var t = 0; t < 8; t++) {
var th = t / 8 * Math.PI * 2 + Math.PI / 8, lu = Math.cos(th) * (SPK_MID.ru + 1.4), lv = SPK_MID.v + Math.sin(th) * (SPK_MID.rv + 1.4);
if (spkPathDist(paths.slice(1), lu, lv) > 1)
lamps.push([lu, lv]);
}
for (t = 0; t < 6; t++) {
var tb = t / 6 * Math.PI * 2 + Math.PI / 6, bu = Math.cos(tb) * (SPK_MID.ru - 1.8), bv = SPK_MID.v + Math.sin(tb) * (SPK_MID.rv - 1.8);
if (Math.abs(Math.sin(tb)) < 0.95 && Math.abs(Math.cos(tb)) < 0.95)
benches.push([bu, bv, SPK_MID.u, SPK_MID.v]);
}
P.lampUV = lamps;
var lp = [], lh = [], lc = [];
lamps.forEach(function (q, j) {
var p = W(q[0], q[1]), y = spkY(p.x, p.z);
lp.push([p.x, y, p.z, 0, 1]);
lh.push([p.x, y, p.z, 0, 1]);
lc.push([p.x, y, p.z, 0, 1]);
P.cc.push({ u: q[0], v: q[1], r: 0.25 });
var key = "spk:" + k + ":" + j;
P.glows.push(key);
if (typeof nightGlowSpot === "function")
nightGlowSpot(key, { x: p.x, y: y + 3.7, z: p.z, col: D.lamp, k: 0.9, r: 16, pri: 1.1 });
});
spkInst(G, spkGeo("post"), railM, lp);
spkInst(G, spkGeo("lamphead"), lampM, lh);
spkInst(G, spkGeo("lampcap"), railM, lc);
P.lampMat = lampM;
var bl = [];
benches.forEach(function (q) { var p = W(q[0], q[1]), f = W(q[2], q[3]); bl.push([p.x, spkY(p.x, p.z), p.z, spkFace(f.x - p.x, f.z - p.z), 1]); });
spkInst(G, spkGeo("bench"), spkMat("lam", k === "summer" ? 0xF4F0E8 : 0x6A4A2E), bl);
P.benches = bl.length;
spkLandmark(P, k);
[-1, 1].forEach(function (sd) { spkWingBuild(P, spkWing(k, sd), sd); });
if (k !== "winter")
D.stalls.forEach(function (st, j) { var sd = j ? 1 : -1; spkStall(P, st, sd * 9.5, 852, spkAlongRot(W(sd * 9.5, 852).a) + (sd > 0 ? Math.PI : 0), j); });
var keep = [{ u: 0, v: SPK_MID.v, ru: SPK_MID.ru + 3, rv: SPK_MID.rv + 3 }];
[-1, 1].forEach(function (sd) { var Wg = spkWing(k, sd), r = Wg.ring || [Wg.ru, Wg.rv]; keep.push({ u: sd * SPK_WING, v: SPK_MID.v, ru: r[0] + 3, rv: r[1] + 3 }); keep.push({ u: sd * 9.5, v: 852, ru: 4, rv: 4 }); });
Object.keys(SPK_SLOTS).forEach(function (s) { var q = SPK_SLOTS[s], big = "ABCD".indexOf(s) >= 0; keep.push({ u: q[0], v: q[1], ru: big ? 10 : 4.5, rv: big ? 8 : 4.5 }); });
keep.push({ u: P.board.u, v: P.board.v, ru: 3, rv: 3 });
(P.keepX || []).forEach(function (e) { keep.push(e); });
function clear(u, v, pad) {
if (Math.abs(u) > U - 3 || v < SPK_R0 + 3.4 || v > SPK_R1 - 3)
return false;
if (spkPathDist(paths, u, v) < (pad || 3.2))
return false;
for (var i = 0; i < keep.length; i++) {
var e = keep[i], x = (u - e.u) / e.ru, y = (v - e.v) / e.rv;
if (x * x + y * y < 1)
return false;
}
return true;
}
P.clear = clear;
var spots = [], cap = small ? 70 : 170, step = small ? 8 : 6;
for (var gu = -U + 4; gu < U - 3; gu += step)
for (var gv = SPK_R0 + 4; gv < SPK_R1 - 3; gv += step) {
var h = spkHash(Math.round(gu * 10) + S.i * 7919, Math.round(gv * 10)), ju = gu + ((h % 100) / 100 - 0.5) * step * 0.8, jv = gv + (((h >>> 8) % 100) / 100 - 0.5) * step * 0.8;
if (h % 10 < (small ? 6 : 7) && clear(ju, jv, 3.4))
spots.push([ju, jv, h]);
}
if (k === "spring")
for (var cu = -20; cu > -SPK_WING + 28; cu -= 6)
[-4.5, 4.5].forEach(function (o) { spots.unshift([cu, SPK_MID.v + o, spkHash(cu * 3, o * 5), 1]); });
spots.sort(function (a, b) { return ((b[3] || 0) - (a[3] || 0)) || ((a[2] >>> 3) % 997 - (b[2] >>> 3) % 997); });
spots = spots.slice(0, cap);
var tl = [], tl2 = [];
spots.forEach(function (q, j) {
var p = W(q[0], q[1]), y = spkY(p.x, p.z), h = q[2], s = 0.85 + (h % 40) / 100, col = D.leaves[(h >>> 4) % D.leaves.length];
var rec = [p.x, y, p.z, (h % 628) / 100, s, col];
if (k === "winter" && h % 5 === 0)
tl2.push(rec);
else
tl.push(rec);
P.cc.push({ u: q[0], v: q[1], r: 0.45 });
});
P.trees = spots.length;
P.treeSpots = spots;
if (k === "autumn") {
var piles = [];
spots.forEach(function (q, j) { if (j % 3)
return; var o = q[2] % 628 / 100, pu = q[0] + Math.cos(o) * 1.8, pv = q[1] + Math.sin(o) * 1.8; if (clear(pu, pv, 1))
piles.push(spkRec(P, pu, pv, -0.1, o, 1.6 + (q[2] % 30) / 30, [0xC8501E, 0xE08A28, 0xD86A2A][j % 3], 0.35)); });
spkInst(G, spkGeo("ball"), spkMat("lam", 0xFFFFFF), piles, true);
}
var file = { pine: "quaternius/ultimate-nature/pinetree_1.glb", blossom: "quaternius/ultimate-nature/commontree_1.glb", oak: "quaternius/ultimate-nature/commontree_3.glb", maple: "quaternius/ultimate-nature/commontree_1.glb" }[D.tree];
var tall = D.tree === "pine" ? 10.5 : 8.5;
spkModels(G, file, tall, tl, alive, function (ok) { if (ok || !alive())
return; spkFallbackTrees(G, D, tl); });
if (tl2.length)
spkModels(G, "quaternius/ultimate-nature/birchtree_dead_1.glb", 7.5, tl2, alive, function (ok) { if (ok || !alive())
return; spkFallbackTrees(G, D, tl2); });
var fl = [], cols = k === "winter" ? [0xF4F8FC] : k === "autumn" ? [0xE8A020, 0xC8501E, 0xF0D040, 0x9A2A2A] : k === "spring" ? [0xF8E060, 0xF4F4F4, 0xE87AA8, 0xB890E8] : [0xE83A3A, 0xF8D040, 0x8A6AE8, 0xF4F4F4, 0xF08A3A];
for (var fv = SPK_R1 - 5; fv > SPK_MID.v + SPK_MID.rv + 3; fv -= (small ? 1.0 : 0.7))
[-1, 1].forEach(function (sd) { for (var fo = 5.2; fo < 7.4; fo += (small ? 0.9 : 0.6)) {
var hh = spkHash(Math.round(fv * 10), Math.round(fo * 10) * sd), p = W(sd * fo, fv);
fl.push([p.x, spkY(p.x, p.z), p.z, (hh % 628) / 100, 0.8 + (hh % 30) / 100, cols[hh % cols.length]]);
} });
if (k === "winter") {
var dr = fl.filter(function (q, i) { return i % 7 === 0; }).map(function (q) { return [q[0], q[1], q[2], q[3], 1.4, 0xF4F8FC, 0.3]; });
spkInst(G, spkGeo("ball"), spkMat("lam", 0xF4F8FC), dr);
}
else {
spkInst(G, spkGeo("stem"), spkMat("lam", 0x3A7A2A), fl);
spkInst(G, spkGeo("bloom"), spkMat("lam", 0xFFFFFF), fl, true);
}
P.flowers = fl.length;
spkHuntPlace(P);
P.inst = 0;
G.traverse(function (m) { if (m.isInstancedMesh)
P.inst += m.count; });
SPK.builds++;
return P;
},
function () {
var P = SPK.cur;
if (!P)
return;
spkDrop(P.G);
P.glows.forEach(function (k) { if (typeof nightGlowSpot === "function")
nightGlowSpot(k, null); });
(P.own || []).forEach(function (x) { try {
x.dispose();
}
catch (e) { } });
if (SPK.ride && SPK.ride.P === P)
SPK.ride = null;
SPK.cur = null;
SPK.drops++;
spkPrompt(null);
},
function (P, st, u, v, rot, j) {
var S = P.S, p = spkW(S, u, v), y = spkY(p.x, p.z), g = new THREE.Group();
g.position.set(p.x, y, p.z);
g.rotation.y = rot;
P.G.add(g);
var wood = spkMat("lam", 0x6A4A2E), col = { spring: ["#F4A8C0", "#FFFFFF"], summer: ["#3A8AD8", "#FFFFFF"], autumn: ["#C8501E", "#F4E0B0"], winter: ["#B02A2A", "#FFFFFF"] }[P.S.D.k];
function box(w, h, d, m, x, yy, z) { var b = spkMine(new THREE.Mesh(spkGeo("unit"), m)); b.userData.spkMine = false; b.scale.set(w, h, d); b.position.set(x, yy, z); g.add(b); return b; }
box(3.6, 1.05, 0.8, wood, 0, 0, 1.1);
box(3.6, 2.6, 0.12, spkMat("lam", 0x2A2220), 0, 0, -1.45);
[[-1.8, 1.4], [1.8, 1.4], [-1.8, -1.4], [1.8, -1.4]].forEach(function (q) { box(0.14, 3, 0.14, wood, q[0], 0, q[1]); });
var can = spkMine(new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.35, 3.4), new THREE.MeshLambertMaterial({ map: spkStripeTex(col[0], col[1]) })));
can.position.set(0, 3.05, 0);
g.add(can);
var sg = spkMine(new THREE.Mesh(new THREE.PlaneGeometry(4.2, 1.05), new THREE.MeshBasicMaterial({ map: spkSignTex(st[0], st[1], col[0]), fog: true })));
sg.position.set(0, 3.75, 1.62);
g.add(sg);
var fx = p.x + Math.sin(rot) * 3.2, fz = p.z + Math.cos(rot) * 3.2, f = spkUV(S, fx, fz);
var c = Math.cos(rot), s = Math.sin(rot), q0 = spkUV(S, p.x, p.z);
P.cb.push({ u0: q0.u - 2.1, u1: q0.u + 2.1, v0: q0.v - 2.1, v1: q0.v + 2.1 });
P.stalls.push({ u: f.u, v: f.v, st: st });
P.acts.push({ u: f.u, v: f.v, r: 2.8, txt: st[2] + " <b>" + st[0] + "</b> · <b>press E</b>", fn: function () { spkStallCard(P, st); } });
var key = "spk:stall:" + j;
P.glows.push(key);
if (typeof nightGlowSpot === "function")
nightGlowSpot(key, { x: p.x, y: y + 2.6, z: p.z, col: 0xFFD8A0, k: 0.6, r: 9, pri: 1.6 });
},
function (P, k) {
var C = SPK_MID, small = P.small;
if (k === "winter") {
var T = [[5.4, 4.4, 1.0], [4.6, 4.0, 3.8], [3.8, 3.6, 6.4], [2.9, 3.2, 8.8], [2.0, 2.8, 11], [1.1, 2.4, 13]], parts = [], tr = new THREE.CylinderGeometry(0.6, 0.7, 1.6, 8);
tr.translate(0, 0.8, 0);
T.forEach(function (t) { var c = new THREE.ConeGeometry(t[0], t[1], 12); c.translate(0, t[2] + t[1] / 2, 0); parts.push(c); });
var tree = new THREE.Group();
tree.add(spkOwnMesh(P, spkMerge(parts), spkMat("lam", 0x1E4A2E)));
tree.add(spkOwnMesh(P, tr, spkMat("lam", 0x4A3020)));
spkPlace(P, tree, C.u, C.v, 0);
tree.children.forEach(function (m) { m.userData.spkShared = true; });
var bul = [], gar = [], R = wRand(7);
for (var i = 0; i < (small ? 60 : 110); i++) {
var t = T[Math.floor(R() * T.length)], f = 0.15 + R() * 0.7, an = R() * Math.PI * 2, rr = t[0] * (1 - f) + 0.1, p = spkW(P.S, C.u + Math.cos(an) * rr, C.v + Math.sin(an) * rr);
bul.push([p.x, spkY(p.x, p.z) + t[2] + f * t[1], p.z, 0, 2.2, SPK_BULBS[i % SPK_BULBS.length]]);
}
for (i = 0; i < (small ? 90 : 170); i++) {
var g = i / (small ? 90 : 170), y = 1.4 + g * 12.6, tt = T.filter(function (q) { return y >= q[2] && y <= q[2] + q[1]; })[0] || T[0], ff = (y - tt[2]) / tt[1], r2 = tt[0] * (1 - ff) + 0.05, a2 = g * Math.PI * 14, p2 = spkW(P.S, C.u + Math.cos(a2) * r2, C.v + Math.sin(a2) * r2);
gar.push([p2.x, spkY(p2.x, p2.z) + y, p2.z, 0, 1, 0xFFD890]);
}
spkInst(P.G, spkGeo("ball"), spkMat("glow", 0xFFFFFF), bul.map(function (q) { q[4] = 0.44; return q; }), true);
spkInst(P.G, spkGeo("bulb"), spkMat("glow", 0xFFD890), gar);
var star = spkOwnMesh(P, new THREE.OctahedronGeometry(1, 0), spkMat("glow", 0xFFE070));
star.userData.spkShared = true;
star.scale.set(0.9, 1.3, 0.35);
spkPlace(P, star, C.u, C.v, 15.9);
spkSprite(P, 0xFFE8A0, 7, C.u, C.v, 15.9);
P.anim.push(function (t) { var s = 1 + 0.06 * Math.sin(t * 1.4); star.scale.set(0.9 * s, 1.3 * s, 0.35 * s); });
var gifts = [], R2 = wRand(9);
for (i = 0; i < 18; i++) {
var ga = i / 18 * Math.PI * 2 + R2() * 0.2, gr = 6 + R2() * 1.4, w = 0.6 + R2() * 0.7, gp = spkW(P.S, C.u + Math.cos(ga) * gr, C.v + Math.sin(ga) * gr * 0.9);
gifts.push([gp.x, spkY(gp.x, gp.z), gp.z, R2() * 3, w, w * (0.6 + R2() * 0.6), w, SPK_BULBS[i % SPK_BULBS.length]]);
}
spkBoxes(P.G, spkMat("lam", 0xFFFFFF), gifts, true);
P.cc.push({ u: C.u, v: C.v, r: 5.6 });
P.acts.push({ u: C.u, v: C.v, r: 9.5, txt: "🎄 <b>The Great Yule Tree</b> · <b>press E</b>", fn: function () {
spkLandCard(P, "🎄 The Great Yule Tree", "Seventeen metres of fir, lit every night", ["The tree is dressed with " + bul.length + " glass baubles and a spiral of " + gar.length + " warm lights, and a star at the very top.", "Bringing an evergreen indoors at midwinter is an old custom across northern Europe: proof that something stays green and alive in the dark of the year.", "The presents round its foot are for looking at. Everybody tries to guess what is in the tall one."]);
} });
}
else if (k === "spring") {
var pole = spkOwnMesh(P, (function () { var g = new THREE.CylinderGeometry(0.2, 0.28, 14, 10); g.translate(0, 7, 0); return g; })(), spkMat("lam", 0xF4F0E4));
pole.userData.spkShared = true;
spkPlace(P, pole, C.u, C.v, 0);
var crown = spkOwnMesh(P, new THREE.TorusGeometry(0.95, 0.22, 6, 16), spkMat("lam", 0x4E8A40));
crown.userData.spkShared = true;
crown.rotation.x = Math.PI / 2;
var cg = new THREE.Group();
cg.add(crown);
spkPlace(P, cg, C.u, C.v, 13.2, 0);
var tip = spkOwnMesh(P, new THREE.SphereGeometry(0.4, 10, 8), spkMat("lam", 0xE8C040));
tip.userData.spkShared = true;
spkPlace(P, tip, C.u, C.v, 14.2);
var rib = [], rg = new THREE.Group(), cols = [0xE83A3A, 0xF8D040, 0x3A8AE8, 0xF4F4F4, 0xE87AA8, 0x5AD06A, 0xB890E8, 0xF08A3A, 0x3AC8C8, 0xD8A0E0, 0xA8E060, 0xF06A8A], L = Math.hypot(7.2, 13);
spkPlace(P, rg, C.u, C.v, 13.2, 0);
for (i = 0; i < 12; i++) {
var ra = i / 12 * Math.PI * 2;
rib.push([Math.sin(ra) * 0.9, 0, Math.cos(ra) * 0.9, ra, 1, cols[i], L, -Math.atan2(7.2, 13)]);
}
var rim = spkInst(rg, spkGeo("ribbon"), spkMat("lam", 0xFFFFFF, { side: THREE.DoubleSide }), rib, true);
if (rim)
rim.position.y = 0;
P.anim.push(function (t) { rg.rotation.y = t * 0.12; });
var ring = [];
for (i = 0; i < (small ? 60 : 120); i++) {
var ba = i / (small ? 60 : 120) * Math.PI * 2, br = 8.2 + (i % 3) * 0.35;
ring.push(spkRec(P, C.u + Math.cos(ba) * br, C.v + Math.sin(ba) * br * 0.92, 0, 0, 1.2, cols[i % cols.length]));
}
spkInst(P.G, spkGeo("stem"), spkMat("lam", 0x3A7A2A), ring);
spkInst(P.G, spkGeo("bloom"), spkMat("lam", 0xFFFFFF), ring, true);
P.cc.push({ u: C.u, v: C.v, r: 0.6 });
P.acts.push({ u: C.u, v: C.v, r: 10, txt: "🎀 <b>The Great Maypole</b> · <b>press E</b> to dance round it", fn: function () { spkRideStart(P, { label: "the Great Maypole", cu: C.u, cv: C.v, ru: 7.4, rv: 6.9, dy: 1.72, dur: 24, lookIn: true, done: "🎀 Round the Great Maypole and back. The ribbons are plaited a little tighter for your dance." }); } });
}
else if (k === "summer") {
var bs = new THREE.Group(), pl = new THREE.CylinderGeometry(6.5, 6.7, 0.5, 8);
pl.translate(0, 0.25, 0);
pl.rotateY(Math.PI / 8);
bs.add(spkOwnMesh(P, pl, spkMat("lam", 0xF0E8D8)));
var rf = new THREE.ConeGeometry(7.7, 2.8, 8, 1, true);
rf.rotateY(Math.PI / 8);
rf.translate(0, 5.0, 0);
var roofM = new THREE.MeshLambertMaterial({ map: spkStripeTex("#C83A3A", "#F8F4EC"), side: THREE.DoubleSide });
bs.add(spkOwnMesh(P, rf, roofM));
var fin = new THREE.SphereGeometry(0.35, 8, 6);
fin.translate(0, 6.6, 0);
bs.add(spkOwnMesh(P, fin, spkMat("lam", 0xE8C040)));
bs.children.forEach(function (m, j) { if (j !== 1)
m.userData.spkShared = true; });
spkPlace(P, bs, C.u, C.v, 0);
var cols2 = [];
for (i = 0; i < 8; i++) {
var ca = i / 8 * Math.PI * 2 + Math.PI / 8;
cols2.push(spkRec(P, C.u + Math.cos(ca) * 5.9, C.v + Math.sin(ca) * 5.9, 0.5, 0, 1));
P.cc.push({ u: C.u + Math.cos(ca) * 5.9, v: C.v + Math.sin(ca) * 5.9, r: 0.3 });
}
spkBoxes(P.G, spkMat("lam", 0xFAF8F2), cols2.map(function (q) { return [q[0], q[1], q[2], 0, 0.34, 3.2, 0.34]; }));
var poles = [], lights = [];
for (i = 0; i < 8; i++) {
var pa = i / 8 * Math.PI * 2, pu = C.u + Math.cos(pa) * 15.5, pv = C.v + Math.sin(pa) * 14.5;
if (spkPathDist(P.paths, pu, pv) < 1) {
pu = C.u + Math.cos(pa + 0.2) * 15.5;
pv = C.v + Math.sin(pa + 0.2) * 14.5;
}
poles.push(spkRec(P, pu, pv, 0, 0, 1.15));
P.cc.push({ u: pu, v: pv, r: 0.25 });
spkString(P, lights, [C.u + Math.cos(pa) * 7.4, C.v + Math.sin(pa) * 7.4, 3.7], [pu, pv, 4.1], small ? 9 : 14, 0.8, [0xFFE8A0, 0xFFB870, 0xFFF4D8]);
}
spkInst(P.G, spkGeo("post"), spkMat("lam", 0x2A2A2A), poles);
spkInst(P.G, spkGeo("bulb"), spkMat("glow", 0xFFFFFF), lights, true);
P.plat = { u: C.u, v: C.v, r: 6.4, h: 0.5 };
P.acts.push({ u: C.u, v: C.v, r: 9, txt: "🎺 <b>The Bandstand</b> · <b>press E</b> to see what the band is playing", fn: function () { spkBandCard(P); } });
var bk = "spk:band";
P.glows.push(bk);
if (typeof nightGlowSpot === "function") {
var bp = spkW(P.S, C.u, C.v);
nightGlowSpot(bk, { x: bp.x, y: spkY(bp.x, bp.z) + 4, z: bp.z, col: 0xFFE0A8, k: 1.6, r: 18, pri: 1.4 });
}
}
else {
var tb = [], tl = 16;
function seg(u0, u1, v, y, h, d, col) { var m = (u0 + u1) / 2, p = spkW(P.S, m, v); tb.push([p.x, spkY(p.x, p.z) + y, p.z, spkOutRot(p.a), Math.abs(u1 - u0), h, d, col]); }
seg(-tl / 2, tl / 2, C.v, 0.74, 0.1, 1.5, 0x8A5A30);
seg(-tl / 2, tl / 2, C.v, 0.84, 0.02, 1.1, 0xF0E6D0);
[-1.25, 1.25].forEach(function (o) { seg(-tl / 2, tl / 2, C.v + o, 0.42, 0.07, 0.4, 0x6A4220); });
for (var lu = -tl / 2 + 0.6; lu <= tl / 2; lu += 3)
[C.v - 0.6, C.v + 0.6].forEach(function (lv) { var p = spkW(P.S, lu, lv); tb.push([p.x, spkY(p.x, p.z), p.z, 0, 0.12, 0.74, 0.12, 0x5A3A1A]); });
spkBoxes(P.G, spkMat("lam", 0xFFFFFF), tb, true);
var gd = [], cd = [], R3 = wRand(13);
for (i = 0; i < (small ? 14 : 22); i++) {
var gu = -tl / 2 + 0.8 + R3() * (tl - 1.6), gv = C.v + (R3() - 0.5) * 0.8;
gd.push(spkRec(P, gu, gv, 0.86, R3() * 6, 0.28 + R3() * 0.2, [0xE8701A, 0xF0C030, 0xF4E8D0, 0x6A8A30, 0xC8501E][i % 5]));
}
for (i = 0; i < 9; i++)
cd.push(spkRec(P, -tl / 2 + 1 + i * (tl - 2) / 8, C.v, 1.0, 0, 1.3, 0xFFC870));
spkInst(P.G, spkGeo("pumpkin"), spkMat("lam", 0xFFFFFF), gd, true);
spkInst(P.G, spkGeo("bulb"), spkMat("glow", 0xFFFFFF), cd, true);
var cp = [[-9.5, C.v - 4.5], [9.5, C.v - 4.5], [9.5, C.v + 4.5], [-9.5, C.v + 4.5]], lan = [];
spkInst(P.G, spkGeo("post"), spkMat("lam", 0x3A2A1A), cp.map(function (q) { P.cc.push({ u: q[0], v: q[1], r: 0.25 }); return spkRec(P, q[0], q[1], 0, 0, 1.3); }));
[[0, 2], [1, 3], [0, 1], [2, 3], [0, 3], [1, 2]].forEach(function (e) { var a = cp[e[0]], b = cp[e[1]]; spkString(P, lan, [a[0], a[1], 4.7], [b[0], b[1], 4.7], small ? 7 : 11, 0.7, [0xFF8A30, 0xF8C040, 0xE8501E]); });
spkInst(P.G, spkGeo("ball"), spkMat("glow", 0xFFFFFF), lan.map(function (q) { q[4] = 0.5; q[6] = 1.3; return q; }), true);
P.cb.push({ u0: -tl / 2 - 0.4, u1: tl / 2 + 0.4, v0: C.v - 1.6, v1: C.v + 1.6 });
var fk = "spk:feast";
P.glows.push(fk);
if (typeof nightGlowSpot === "function") {
var fp = spkW(P.S, C.u, C.v);
nightGlowSpot(fk, { x: fp.x, y: spkY(fp.x, fp.z) + 4.2, z: fp.z, col: 0xFFB060, k: 1.6, r: 18, pri: 1.4 });
}
P.acts.push({ u: C.u, v: C.v, r: 8.5, txt: "🍂 <b>The Harvest Feast</b> · <b>press E</b> to sit down", fn: function () {
spkLandCard(P, "🍂 The Harvest Feast", "A long table, always laid", ["Bread from the first and last of the corn, apples, nuts, squashes from the patch and a jug of cider: the harvest in.", "At the far end a place is always laid for whoever is missing this year. Nobody sits there; everybody raises a cup to it.", "Under the lanterns after dark the table is the warmest place in the city."]);
} });
}
},
function (P, Wg, sd) {
var cu = sd * SPK_WING, cv = SPK_MID.v, small = P.small, S = P.S, i;
P.keepX = P.keepX || [];
if (Wg.kind === "ice" || Wg.kind === "pond" || Wg.kind === "lake") {
var tex = spkGroundTex(Wg.kind === "ice" ? "ice" : "water"), mat = spkSurfMat(tex, 3);
P.G.add(spkEll(S, cu, cv, Wg.ru, Wg.rv, 0.1, mat, Wg.kind === "ice" ? 10 : 7));
var rim = [], RR = wRand(17 + sd);
for (var t = 0; t < Math.PI * 2; t += (Wg.kind === "ice" ? 2.2 : 1.6) / Wg.ru) {
var ru = Wg.ru + 0.5, rv = Wg.rv + 0.5;
rim.push(spkRec(P, cu + Math.cos(t) * ru, cv + Math.sin(t) * rv, 0, RR() * 6, Wg.kind === "ice" ? 1.5 : 1 + RR() * 0.6, Wg.kind === "ice" ? 0xF4F8FC : [0x8A8478, 0x9A9488, 0x7A746A][Math.floor(RR() * 3)], Wg.kind === "ice" ? 0.32 : undefined));
}
spkInst(P.G, spkGeo(Wg.kind === "ice" ? "ball" : "rock"), spkMat("lam", 0xFFFFFF), rim, true);
if (Wg.kind !== "ice")
P.ce.push({ u: cu, v: cv, ru: Wg.ru - 0.2, rv: Wg.rv - 0.2 });
var bl = [];
for (i = 0; i < (small ? 4 : 8); i++) {
var ba = i / (small ? 4 : 8) * Math.PI * 2 + 0.3, bu = cu + Math.cos(ba) * (Wg.ring[0] + 3), bv = cv + Math.sin(ba) * (Wg.ring[1] + 3);
if (spkPathDist(P.paths.filter(function (p, j) { return j !== 0; }).slice(0), bu, bv) < 2.5 || bv < SPK_LOOP.vIn + 3 || bv > SPK_LOOP.vOut - 3)
continue;
var p = spkW(S, bu, bv), f = spkW(S, cu, cv);
bl.push([p.x, spkY(p.x, p.z), p.z, spkFace(f.x - p.x, f.z - p.z), 1]);
}
spkInst(P.G, spkGeo("bench"), spkMat("lam", 0x6A4A2E), bl);
if (Wg.kind === "ice") {
var sk = [], n = small ? 4 : 7;
for (i = 0; i < n; i++)
sk.push({ r: 0.45 + 0.45 * ((i * 37) % 10) / 10, sp: 0.08 + ((i * 13) % 7) / 80, ph: i * 1.3, col: SPK_BULBS[i % SPK_BULBS.length] });
function cyl(r0, r1, h, x, y, z, rx, rz) { var g = new THREE.CylinderGeometry(r0, r1, h, 8); if (rx)
g.rotateX(rx); if (rz)
g.rotateZ(rz); g.translate(x, y, z); return g; }
var coatG = spkMerge([cyl(0.2, 0.3, 0.75, 0, 1.12, 0), cyl(0.06, 0.055, 0.6, -0.3, 1.2, 0, 0, 0.5), cyl(0.06, 0.055, 0.6, 0.3, 1.2, 0, 0, -0.5)]);
var legG = spkMerge([cyl(0.075, 0.065, 0.8, -0.1, 0.42, 0, 0.25), cyl(0.075, 0.065, 0.8, 0.1, 0.42, 0, -0.2), spkBox(0.14, 0.08, 0.32, -0.1, 0.04, 0.06), spkBox(0.14, 0.08, 0.32, 0.1, 0.04, -0.04)]);
var headG = new THREE.SphereGeometry(0.14, 10, 8);
headG.translate(0, 1.66, 0);
var hatG = new THREE.SphereGeometry(0.15, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2);
hatG.translate(0, 1.7, 0);
var bobG = new THREE.SphereGeometry(0.05, 6, 4);
bobG.translate(0, 1.86, 0);
hatG = spkMerge([hatG, bobG]);
var parts = [[coatG, spkMat("lam", 0xFFFFFF), true], [legG, spkMat("lam", 0x2A2A34)], [headG, spkMat("lam", 0xE0B898)], [hatG, spkMat("lam", 0xFFFFFF), true]], ims = parts.map(function (q, qi) {
var m = new THREE.InstancedMesh(q[0], q[1], n);
m.userData.spkOwn = true;
m.userData.spkMine = true;
m.userData.spkShared = true;
m.raycast = function () { };
m.frustumCulled = false;
if (q[2]) {
sk.forEach(function (s, j) { SPK_C.setHex(qi ? SPK_BULBS[(j + 2) % SPK_BULBS.length] : s.col); m.setColorAt(j, SPK_C); });
m.instanceColor.needsUpdate = true;
}
P.G.add(m);
return m;
});
var figs = sk.map(function () { return new THREE.Object3D(); });
P.anim.push(function (tm) {
sk.forEach(function (s, j) {
var a = tm * s.sp + s.ph, u = cu + Math.cos(a) * Wg.ru * 0.85 * s.r + Math.cos(a) * 2, v = cv + Math.sin(a) * Wg.rv * 0.85 * s.r, p = spkW(S, u, v), u2 = cu + Math.cos(a + 0.05) * Wg.ru * 0.85 * s.r + Math.cos(a + 0.05) * 2, v2 = cv + Math.sin(a + 0.05) * Wg.rv * 0.85 * s.r, q = spkW(S, u2, v2), g = figs[j];
g.position.set(p.x, spkY(p.x, p.z) + 0.1, p.z);
g.rotation.set(0, spkFace(q.x - p.x, q.z - p.z), Math.sin(tm * 2 + j) * 0.12);
g.updateMatrix();
ims.forEach(function (m) { m.setMatrixAt(j, g.matrix); });
});
ims.forEach(function (m) { m.instanceMatrix.needsUpdate = true; });
});
P.acts.push({ u: cu, v: cv, ru: Wg.ru + 3, rv: Wg.rv + 3, txt: "⛸️ <b>The Frozen Lake</b> · <b>press E</b> to skate a lap", fn: function () { spkRideStart(P, { label: "the Frozen Lake", cu: cu, cv: cv, ru: Wg.ru - 4, rv: Wg.rv - 3.5, dy: 1.82, dur: 34, sway: 0.12, done: "⛸️ A whole lap of the Frozen Lake without falling over. Nearly." }); } });
}
else if (Wg.kind === "pond") {
var pads = [], ducks = [], reeds = [], R = wRand(23);
for (i = 0; i < (small ? 14 : 26); i++) {
var a = R() * Math.PI * 2, f = 0.3 + R() * 0.6;
pads.push(spkRec(P, cu + Math.cos(a) * Wg.ru * f, cv + Math.sin(a) * Wg.rv * f, 0.14, R() * 6, 0.8 + R() * 0.8, R() < 0.25 ? 0xF4C8D8 : 0x4E8A3A));
}
for (t = 0; t < Math.PI * 2; t += 0.09) {
if (R() < 0.45)
continue;
var rr = 0.92 + R() * 0.06;
reeds.push(spkRec(P, cu + Math.cos(t) * Wg.ru * rr, cv + Math.sin(t) * Wg.rv * rr, 0, R() * 6, 1, 0x5A7A30, 3 + R() * 2));
}
spkInst(P.G, spkGeo("pad"), spkMat("lam", 0xFFFFFF, { side: THREE.DoubleSide }), pads, true);
spkInst(P.G, spkGeo("stem"), spkMat("lam", 0x5A7A30), reeds);
var dn = small ? 6 : 10, dd = [];
for (i = 0; i < dn; i++)
dd.push({ a: R() * 6.28, r: 0.25 + R() * 0.6, sp: (R() - 0.5) * 0.12, col: i % 3 ? 0x7A6A4A : 0xF4F4EE });
var dIM = new THREE.InstancedMesh(spkGeo("duck"), spkMat("lam", 0xFFFFFF), dn);
dIM.userData.spkOwn = true;
dIM.raycast = function () { };
dIM.frustumCulled = false;
P.G.add(dIM);
dd.forEach(function (d, j) { SPK_C.setHex(d.col); dIM.setColorAt(j, SPK_C); });
dIM.instanceColor.needsUpdate = true;
P.anim.push(function (tm) {
dd.forEach(function (d, j) {
var a = d.a + tm * d.sp, p = spkW(S, cu + Math.cos(a) * Wg.ru * d.r, cv + Math.sin(a) * Wg.rv * d.r), b = a + (d.sp > 0 ? 0.05 : -0.05), q = spkW(S, cu + Math.cos(b) * Wg.ru * d.r, cv + Math.sin(b) * Wg.rv * d.r);
SPK_O.position.set(p.x, spkY(p.x, p.z) + 0.12 + Math.sin(tm * 1.7 + j) * 0.03, p.z);
SPK_O.rotation.set(0, spkFace(q.x - p.x, q.z - p.z), 0);
SPK_O.scale.set(1, 1, 1);
SPK_O.updateMatrix();
dIM.setMatrixAt(j, SPK_O.matrix);
});
dIM.instanceMatrix.needsUpdate = true;
});
P.acts.push({ u: cu, v: cv, ru: Wg.ru + 3, rv: Wg.rv + 3, txt: "🦆 <b>The Duck Pond</b> · <b>press E</b> to call the ducks over", fn: function () { dd.forEach(function (d) { d.sp *= -1; }); setStatus("🦆 The ducks turn round and come paddling over to see what you have. (Nothing, as it turns out. They forgive you.)"); } });
}
else {
var fb = new THREE.CylinderGeometry(2.6, 2.8, 0.7, 16);
fb.translate(0, 0.35, 0);
var jet = new THREE.CylinderGeometry(0.16, 0.3, 1, 8, 1, true);
jet.translate(0, 0.5, 0);
var basin = spkOwnMesh(P, fb, spkMat("lam", 0xD8D0C0));
basin.userData.spkShared = true;
spkPlace(P, basin, cu, cv, 0);
var jm = spkOwnMesh(P, jet, spkMat("basic", 0xEAF6FF, { op: 0.7 }));
jm.userData.spkShared = true;
spkPlace(P, jm, cu, cv, 0.7);
var sn = small ? 16 : 30, sIM = new THREE.InstancedMesh(spkGeo("bulb"), spkMat("basic", 0xF0FAFF, { op: 0.8 }), sn);
sIM.userData.spkOwn = true;
sIM.raycast = function () { };
sIM.frustumCulled = false;
P.G.add(sIM);
var c0 = spkW(S, cu, cv), y0 = spkY(c0.x, c0.z);
var bn = small ? 3 : 5, bIM = new THREE.InstancedMesh(spkGeo("swan"), spkMat("lam", 0xF8F6F0), bn);
bIM.userData.spkOwn = true;
bIM.raycast = function () { };
bIM.frustumCulled = false;
P.G.add(bIM);
P.anim.push(function (tm) {
var h = 6 + Math.sin(tm * 0.7) * 0.8;
jm.scale.set(1, h, 1);
for (var j = 0; j < sn; j++) {
var ph = ((tm * 0.55 + j / sn) % 1), a = j * 2.39, r = ph * 3.4, y = 0.7 + h * (1 - ph) * 0.9 + ph * (h * 0.4) - ph * ph * h * 0.9;
SPK_O.position.set(c0.x + Math.cos(a) * r, y0 + Math.max(0.2, y), c0.z + Math.sin(a) * r);
SPK_O.rotation.set(0, 0, 0);
SPK_O.scale.set(1.3, 1.3, 1.3);
SPK_O.updateMatrix();
sIM.setMatrixAt(j, SPK_O.matrix);
}
sIM.instanceMatrix.needsUpdate = true;
for (j = 0; j < bn; j++) {
var ba = tm * 0.035 + j / bn * Math.PI * 2, bu = cu + Math.cos(ba) * (Wg.ru - 7), bv = cv + Math.sin(ba) * (Wg.rv - 5), p = spkW(S, bu, bv), q = spkW(S, cu + Math.cos(ba + 0.05) * (Wg.ru - 7), cv + Math.sin(ba + 0.05) * (Wg.rv - 5));
SPK_O.position.set(p.x, spkY(p.x, p.z) + Math.sin(tm * 1.3 + j) * 0.05, p.z);
SPK_O.rotation.set(0, spkFace(q.x - p.x, q.z - p.z), 0);
SPK_O.scale.set(1, 1, 1);
SPK_O.updateMatrix();
bIM.setMatrixAt(j, SPK_O.matrix);
}
bIM.instanceMatrix.needsUpdate = true;
});
P.acts.push({ u: cu, v: cv, ru: Wg.ru + 3, rv: Wg.rv + 3, txt: "🦢 <b>The Fountain Lake</b> · <b>press E</b> to take a swan boat round", fn: function () { spkRideStart(P, { label: "the Fountain Lake", cu: cu, cv: cv, ru: Wg.ru - 11, rv: Wg.rv - 8, dy: 1.5, dur: 44, done: "🦢 Once round the Fountain Lake by swan boat, past the fountain twice. You are only slightly damp." }); } });
}
}
else if (Wg.kind === "market") {
var D = P.S.D, woods = [0x8A5A30, 0x6A4220, 0x9A6A3A, 0x7A4A28, 0x8A5030, 0x6A4A2E], ch = [], rf = [], ct = [];
D.stalls.forEach(function (st, j) {
var side = j < 3 ? -1 : 1, cuj = cu + (j % 3 - 1) * 15, cvj = cv + side * 8.2, p = spkW(S, cuj, cvj), y = spkY(p.x, p.z), rot = spkOutRot(p.a) + (side > 0 ? Math.PI : 0);
ch.push([p.x, y, p.z, rot, 4.2, 2.7, 3.2, woods[j]]);
rf.push([p.x, y, p.z, rot, 1, 0xF4F8FC]);
var fx = p.x + Math.sin(rot) * 1.75, fz = p.z + Math.cos(rot) * 1.75;
ct.push([fx, y, fz, rot, 3.6, 1.05, 0.5, 0x5A3A1E]);
var sg = spkMine(new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.9), new THREE.MeshBasicMaterial({ map: spkSignTex(st[0], st[1], "#F2D27A", "#3A1E14"), fog: true })));
sg.position.set(p.x + Math.sin(rot) * 1.62, y + 3.05, p.z + Math.cos(rot) * 1.62);
sg.rotation.y = rot;
P.G.add(sg);
var win = spkMine(new THREE.Mesh(new THREE.PlaneGeometry(3.4, 1.2), spkMat("glow", 0xE8A050)));
win.userData.spkShared = true;
win.position.set(p.x + Math.sin(rot) * 1.61, y + 1.75, p.z + Math.cos(rot) * 1.61);
win.rotation.y = rot;
P.G.add(win);
P.cb.push({ u0: cuj - 2.2, u1: cuj + 2.2, v0: cvj - 1.7, v1: cvj + 1.7 });
var f = spkUV(S, fx + Math.sin(rot) * 1.4, fz + Math.cos(rot) * 1.4);
P.acts.push({ u: f.u, v: f.v, r: 2.6, txt: st[2] + " <b>" + st[0] + "</b> · <b>press E</b>", fn: function () { spkStallCard(P, st); } });
var key = "spk:chalet:" + j;
P.glows.push(key);
if (typeof nightGlowSpot === "function")
nightGlowSpot(key, { x: fx, y: y + 2, z: fz, col: 0xFFC880, k: 1.1, r: 11, pri: 1.2 });
});
spkBoxes(P.G, spkMat("lam", 0xFFFFFF), ch, true);
spkBoxes(P.G, spkMat("lam", 0xFFFFFF), ct, true);
spkInst(P.G, spkGeo("roof"), spkMat("lam", 0xF4F8FC), rf);
var lights = [], ends = [];
[-1, 1].forEach(function (o) {
var a = [cu - 24, cv + o * 2.2, 3.8], b = [cu + 24, cv + o * 2.2, 3.8];
ends.push(spkRec(P, a[0], a[1], 0, 0, 1.05), spkRec(P, b[0], b[1], 0, 0, 1.05));
P.cc.push({ u: a[0], v: a[1], r: 0.25 }, { u: b[0], v: b[1], r: 0.25 });
for (var s2 = 0; s2 < 4; s2++)
spkString(P, lights, [a[0] + s2 * 12, a[1], 3.8], [a[0] + s2 * 12 + 12, a[1], 3.8], small ? 8 : 12, 0.5, [0xFFE0A0, 0xE83A3A, 0x5AD06A, 0xFFE0A0]);
});
spkInst(P.G, spkGeo("post"), spkMat("lam", 0x2A2A2A), ends);
spkInst(P.G, spkGeo("bulb"), spkMat("glow", 0xFFFFFF), lights, true);
}
else if (Wg.kind === "tulips") {
var beds = [], edge = [], tul = [], R4 = wRand(31), tc = [0xE83A3A, 0xF8D040, 0xF4F4F4, 0xE87AA8, 0xB890E8, 0xF08A3A, 0xD82A6A, 0xF8E8A0], sp = small ? 1.0 : 0.72;
for (var bi = 0; bi < 8; bi++) {
var bu = cu + (bi % 4 - 1.5) * 12.2, bv = cv + (bi < 4 ? -1 : 1) * 7.6, w = 10, d = 6.6;
P.G.add(spkRect(S, bu - w / 2, bu + w / 2, bv - d / 2, bv + d / 2, 0.06, spkSurfMat(spkGroundTex("field"), 2), 3));
[[bu, bv - d / 2, w, 0], [bu, bv + d / 2, w, 0], [bu - w / 2, bv, d, 1], [bu + w / 2, bv, d, 1]].forEach(function (e) { var p = spkW(S, e[0], e[1]); edge.push([p.x, spkY(p.x, p.z), p.z, e[3] ? spkAlongRot(p.a) : spkOutRot(p.a), e[2], 0.32, 0.3, 0x3A6A2A]); });
for (var tu = bu - w / 2 + 0.5; tu < bu + w / 2 - 0.3; tu += sp)
for (var tv = bv - d / 2 + 0.5; tv < bv + d / 2 - 0.3; tv += sp)
tul.push(spkRec(P, tu + (R4() - 0.5) * 0.2, tv + (R4() - 0.5) * 0.2, 0.05, R4() * 6, 1 + R4() * 0.25, tc[bi]));
}
spkBoxes(P.G, spkMat("lam", 0xFFFFFF), edge, true);
spkInst(P.G, spkGeo("stem"), spkMat("lam", 0x3A7A2A), tul);
spkInst(P.G, spkGeo("egg"), spkMat("lam", 0xFFFFFF), tul.map(function (q) { return [q[0], q[1] + 0.45, q[2], q[3], 0.75, q[5]]; }), true);
P.tulips = tul.length;
P.acts.push({ u: cu, v: cv, r: 8, txt: "🌷 <b>The Tulip Gardens</b> · <b>press E</b>", fn: function () { spkLandCard(P, "🌷 The Tulip Gardens", "Eight beds, eight colours, " + tul.length + " tulips", ["Tulips came to Europe from the Ottoman gardens in the 1500s; in the Dutch 'tulip mania' of the 1630s a single bulb could sell for more than a house.", "Walk between the beds along the gravel. Please do not pick them: the gardeners count."]); } });
}
else if (Wg.kind === "sunflowers") {
var sf = [], R5 = wRand(41), sp2 = small ? 2.0 : 1.35;
for (var fu = cu - Wg.ru; fu <= cu + Wg.ru; fu += sp2)
for (var fv = cv - Wg.rv; fv <= cv + Wg.rv; fv += sp2) {
if (Math.abs(fv - cv) < 2.8)
continue;
var ju = fu + (R5() - 0.5) * 0.5, jv = fv + (R5() - 0.5) * 0.5, p = spkW(S, ju, jv), q = spkW(S, ju, cv), s = 0.85 + R5() * 0.35;
sf.push([p.x, spkY(p.x, p.z), p.z, spkFace(q.x - p.x, q.z - p.z), s]);
}
P.G.add(spkRect(S, cu - Wg.ru - 1, cu + Wg.ru + 1, cv - Wg.rv - 1, cv - 2.4, 0.05, spkSurfMat(spkGroundTex("field"), 2), 4));
P.G.add(spkRect(S, cu - Wg.ru - 1, cu + Wg.ru + 1, cv + 2.4, cv + Wg.rv + 1, 0.05, spkSurfMat(spkGroundTex("field"), 2), 4));
spkInst(P.G, spkGeo("sunflower"), spkMat("lam", 0x4E7A2A), sf);
spkInst(P.G, spkGeo("sunhead"), spkMat("lam", 0xF8C820), sf);
spkInst(P.G, spkGeo("suneye"), spkMat("lam", 0x5A3A1A), sf);
P.sunflowers = sf.length;
var pu = sd * 102, bl2 = [], bk = [], R6 = wRand(43);
P.keepX.push({ u: pu, v: cv, ru: 7, rv: 14 });
for (i = 0; i < 5; i++) {
var bv2 = cv - 11 + i * 5.5 + (R6() - 0.5), bu2 = pu + (R6() - 0.5) * 3;
bl2.push(spkRec(P, bu2, bv2, 0.08, R6() * 0.6));
bk.push(spkRec(P, bu2 + 0.7, bv2 + 0.4, 0.08, R6() * 3));
}
var blM = spkSurfMat(spkCheckTex(), 3);
bl2.forEach(function (q) { var m = spkMine(new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.8), blM)); m.userData.spkShared = true; m.rotation.order = "YXZ"; m.rotation.set(-Math.PI / 2, q[3], 0); m.position.set(q[0], q[1], q[2]); P.G.add(m); });
spkBoxes(P.G, spkMat("lam", 0x9A6A30), bk.map(function (q) { return [q[0], q[1], q[2], q[3], 0.6, 0.4, 0.4]; }));
P.acts.push({ u: cu, v: cv, r: 6, txt: "🌻 <b>The Sunflower Field</b> · <b>press E</b>", fn: function () { spkLandCard(P, "🌻 The Sunflower Field", sf.length + " sunflowers, all taller than you", ["Young sunflowers turn to follow the sun across the sky; grown ones settle facing east.", "Walk the path through the middle, or step in among them and see how quickly you lose your way."]); } });
}
else if (Wg.kind === "maze") {
spkMaze(P, cu, cv);
}
else if (Wg.kind === "pumpkins") {
var pk = [], R7 = wRand(51), sp3 = small ? 2.5 : 1.75, pc = [0xE8701A, 0xF08A20, 0xD86010, 0xE87A1A, 0xF4E8D0, 0xC8A030];
P.G.add(spkRect(S, cu - Wg.ru - 1, cu + Wg.ru + 1, cv - Wg.rv - 1, cv - 2.4, 0.05, spkSurfMat(spkGroundTex("field"), 2), 4));
P.G.add(spkRect(S, cu - Wg.ru - 1, cu + Wg.ru + 1, cv + 2.4, cv + Wg.rv + 1, 0.05, spkSurfMat(spkGroundTex("field"), 2), 4));
for (var gu2 = cu - Wg.ru; gu2 <= cu + Wg.ru; gu2 += sp3)
for (var gv2 = cv - Wg.rv; gv2 <= cv + Wg.rv; gv2 += sp3) {
if (Math.abs(gv2 - cv) < 3.2 || R7() < 0.15)
continue;
pk.push(spkRec(P, gu2 + (R7() - 0.5) * 1.1, gv2 + (R7() - 0.5) * 1.1, 0, R7() * 6, 0.55 + R7() * 0.8, pc[Math.floor(R7() * pc.length)]));
}
spkInst(P.G, spkGeo("pumpkin"), spkMat("lam", 0xFFFFFF), pk, true);
spkInst(P.G, spkGeo("stem"), spkMat("lam", 0x4A5A20), pk.map(function (q) { return [q[0], q[1] + q[4] * 0.55, q[2], 0, 0.5]; }));
P.pumpkins = pk.length;
var sc = [], hats = [], heads = [];
[[-14, -9], [2, 10], [16, -8]].forEach(function (q) {
var u = cu + q[0], v = cv + q[1], p = spkW(S, u, v), y = spkY(p.x, p.z), r = spkOutRot(p.a);
sc.push([p.x, y, p.z, r, 0.14, 2.2, 0.14, 0x5A3A1E], [p.x, y + 1.55, p.z, r, 1.9, 0.12, 0.12, 0x5A3A1E], [p.x, y + 0.9, p.z, r, 0.7, 0.85, 0.35, [0x7A5A9A, 0x4A6A8A, 0xA84A2A][sc.length % 3]]);
heads.push([p.x, y + 2.1, p.z, r, 0.7, 0xE8C878]);
hats.push([p.x, y + 2.55, p.z, r, 1, 0x3A2A1A]);
P.cc.push({ u: u, v: v, r: 0.4 });
});
spkBoxes(P.G, spkMat("lam", 0xFFFFFF), sc, true);
spkInst(P.G, spkGeo("ball"), spkMat("lam", 0xFFFFFF), heads, true);
var hatG = new THREE.ConeGeometry(0.45, 0.6, 8);
hatG.translate(0, 0.3, 0);
var hatM = spkMine(new THREE.InstancedMesh(hatG, spkMat("lam", 0x3A2A1A), hats.length));
hatM.userData.spkShared = true;
hatM.userData.spkOwn = true;
hats.forEach(function (q, j) { SPK_O.position.set(q[0], q[1], q[2]); SPK_O.rotation.set(0, 0, 0); SPK_O.scale.set(1, 1, 1); SPK_O.updateMatrix(); hatM.setMatrixAt(j, SPK_O.matrix); });
P.G.add(hatM);
var cu2 = cu - Wg.ru + 4, cv2 = cv + 4.2, cpP = spkW(S, cu2, cv2), cy = spkY(cpP.x, cpP.z), crot = spkOutRot(cpP.a);
spkBoxes(P.G, spkMat("lam", 0x7A4A28), [[cpP.x, cy + 0.5, cpP.z, crot, 2.6, 0.7, 1.5]]);
var cpk = [];
for (i = 0; i < 9; i++) {
var ou = (i % 3 - 1) * 0.75, ov = (Math.floor(i / 3) - 1) * 0.4;
cpk.push(spkRec(P, cu2 + ou, cv2 + ov, 1.2, i, 0.55, pc[i % 4]));
}
spkInst(P.G, spkGeo("pumpkin"), spkMat("lam", 0xFFFFFF), cpk, true);
P.cb.push({ u0: cu2 - 1.4, u1: cu2 + 1.4, v0: cv2 - 0.9, v1: cv2 + 0.9 });
P.acts.push({ u: cu2, v: cv2 - 2, r: 3, txt: "🎃 <b>The Pumpkin Patch</b> · <b>press E</b> to pick a pumpkin", fn: function () { spkPickPumpkin(P); } });
}
},
function (P, cu, cv) {
var N = 7, cs = 4.4, u0 = cu - N * cs / 2, v0 = cv - N * cs / 2, R = wRand(777), seen = {}, Hw = [], Vw = [], S = P.S, i, j;
for (i = 0; i <= N; i++) {
Hw[i] = [];
Vw[i] = [];
for (j = 0; j <= N; j++) {
Hw[i][j] = true;
Vw[i][j] = true;
}
}
var stack = [[3, 3]];
seen["3,3"] = 1;
while (stack.length) {
var cur = stack[stack.length - 1], r = cur[0], c = cur[1], nb = [];
[[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) { var rr = r + d[0], cc = c + d[1]; if (rr >= 0 && rr < N && cc >= 0 && cc < N && !seen[rr + "," + cc])
nb.push([rr, cc, d]); });
if (!nb.length) {
stack.pop();
continue;
}
var n = nb[Math.floor(R() * nb.length)], dd = n[2];
if (dd[0] === 1)
Hw[r + 1][c] = false;
else if (dd[0] === -1)
Hw[r][c] = false;
else if (dd[1] === 1)
Vw[r][c + 1] = false;
else
Vw[r][c] = false;
seen[n[0] + "," + n[1]] = 1;
stack.push([n[0], n[1]]);
}
Hw[N][3] = false;
var bales = [], hay = [0xD8B860, 0xC8A850, 0xE0C470, 0xC0A048];
function wall(ua, va, ub, vb) {
var along = Math.abs(ub - ua) > 0.1;
for (var k = 0; k < 3; k++) {
var t = (k + 0.5) / 3, u = ua + (ub - ua) * t, v = va + (vb - va) * t, p = spkW(S, u, v), y = spkY(p.x, p.z), rot = along ? spkOutRot(p.a) : spkOutRot(p.a) + Math.PI / 2;
for (var L = 0; L < 2; L++)
bales.push([p.x, y + L * 0.9, p.z, rot, cs / 3 + 0.04, 0.9, 0.95, hay[(k + L + bales.length) % 4]]);
}
P.cb.push(along ? { u0: Math.min(ua, ub) - 0.25, u1: Math.max(ua, ub) + 0.25, v0: va - 0.55, v1: va + 0.55 } : { u0: ua - 0.55, u1: ua + 0.55, v0: Math.min(va, vb) - 0.25, v1: Math.max(va, vb) + 0.25 });
}
for (i = 0; i <= N; i++)
for (j = 0; j < N; j++) {
if (Hw[i][j])
wall(u0 + j * cs, v0 + i * cs, u0 + (j + 1) * cs, v0 + i * cs);
if (Vw[j][i])
wall(u0 + i * cs, v0 + j * cs, u0 + i * cs, v0 + (j + 1) * cs);
}
if (!SPK_MAT.hay)
SPK_MAT.hay = new THREE.MeshLambertMaterial({ map: spkHayTex() });
spkBoxes(P.G, SPK_MAT.hay, bales, true);
P.maze = { u0: u0, v0: v0, u1: u0 + N * cs, v1: v0 + N * cs, gu: u0 + 3.5 * cs, gv: v0 + 3.5 * cs, bales: bales.length };
var gp = spkW(S, P.maze.gu, P.maze.gv), gy = spkY(gp.x, gp.z);
spkInst(P.G, spkGeo("post"), spkMat("lam", 0x3A2A1A), [[gp.x, gy, gp.z, 0, 0.8]]);
spkInst(P.G, spkGeo("ball"), spkMat("lam", 0xD8B040), [[gp.x, gy + 2.9, gp.z, 0, 0.6]]);
P.cc.push({ u: P.maze.gu, v: P.maze.gv, r: 0.3 });
P.acts.push({ u: P.maze.gu, v: P.maze.gv, r: 2.2, txt: "🔔 <b>The middle of the Hay Maze!</b> · <b>press E</b> to ring the bell", fn: function () { spkMazeBell(P); } });
P.acts.push({ u: P.maze.gu, v: P.maze.v1 + 2.6, r: 2.4, txt: "🌾 <b>The Hay Maze</b> · <b>press E</b>", fn: function () { spkLandCard(P, "🌾 The Hay Maze", "Seven by seven, two bales high", ["Find your way to the bell in the middle and ring it. The maze times you from the moment you step in.", "It is the same maze for everybody, so you can race your friends."]); } });
},
function (P) {
var D = P.S.D, day = spkToday(), seed = P.S.i * 101;
for (var i = 0; i < day.length; i++)
seed = (seed * 31 + day.charCodeAt(i)) >>> 0;
var R = wRand(seed + 7), out = [], tries = 0, trees = P.treeSpots || [];
while (out.length < 10 && tries++ < 400) {
var u, v, y = 0.35;
if (trees.length && R() < 0.6) {
var t = trees[Math.floor(R() * trees.length)], a = R() * Math.PI * 2;
u = t[0] + Math.cos(a) * 1.3;
v = t[1] + Math.sin(a) * 1.3;
if (D.k === "summer") {
u = t[0] + Math.cos(a) * 0.9;
v = t[1] + Math.sin(a) * 0.9;
y = 3.6 + R();
}
}
else {
u = (R() * 2 - 1) * (P.S.U - 6);
v = SPK_R0 + 5 + R() * (SPK_R1 - SPK_R0 - 10);
if (D.k === "summer")
y = 0.5;
}
if (!P.clear(u, v, 0.8) && !(D.k === "summer" && y > 2))
continue;
if (out.some(function (o) { return Math.hypot(o.u - u, o.v - v) < 12; }))
continue;
out.push({ u: u, v: v, y: y, i: out.length });
}
P.hunt = out;
var geo = spkGeo({ winter: "star", spring: "egg", summer: "kite", autumn: "leaf" }[D.k]), mat = D.k === "winter" ? spkMat("glow", 0xFFFFFF) : spkMat("lam", 0xFFFFFF, { side: THREE.DoubleSide, em: 0x2A2A2A });
var im = new THREE.InstancedMesh(geo, mat, out.length || 1);
im.userData.spkOwn = true;
im.raycast = function () { };
im.frustumCulled = false;
P.G.add(im);
P.huntIM = im;
var cols = D.k === "spring" ? [0xF8D040, 0xE87AA8, 0x3A8AE8, 0x5AD06A, 0xB890E8, 0xF08A3A] : D.k === "summer" ? [0xFF5A5A, 0x3A8AE8, 0xF8D040, 0x5AD06A] : [D.find[3]];
out.forEach(function (h, j) { SPK_C.setHex(cols[j % cols.length]); im.setColorAt(j, SPK_C); });
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
spkHuntDraw(P, 0);
},
function (P, tm) {
var im = P.huntIM;
if (!im)
return;
var got = (spkMem().got[P.S.D.k] || []), k = P.S.D.k;
P.hunt.forEach(function (h, j) {
var p = spkW(P.S, h.u, h.v), y = spkY(p.x, p.z) + h.y, off = got.indexOf(j) >= 0;
SPK_O.position.set(p.x, y + (k === "autumn" ? Math.sin(tm * 1.5 + j) * 0.12 + 0.4 : k === "winter" ? 0.5 + Math.sin(tm + j) * 0.1 : 0), p.z);
SPK_O.rotation.set(k === "kite" ? 0 : (k === "autumn" ? 0.6 : 0), tm * 0.8 + j, k === "summer" ? 0.5 : 0);
var s = off ? 0.0001 : (k === "winter" ? 0.9 : 1.4);
SPK_O.scale.set(s, s, s);
SPK_O.updateMatrix();
im.setMatrixAt(j, SPK_O.matrix);
});
im.instanceMatrix.needsUpdate = true;
},
function (P, h) {
var m = spkMem(), k = P.S.D.k, F = P.S.D.find;
m.got[k] = m.got[k] || [];
if (m.got[k].indexOf(h.i) >= 0)
return;
m.got[k].push(h.i);
spkMemSave(m);
var n = m.got[k].length;
if (typeof playTone === "function")
try {
playTone(620 + n * 30, 0.2);
}
catch (e) { }
if (n >= P.hunt.length)
setStatus(F[2] + " <b>All ten " + F[1] + " in " + P.S.D.title + "!</b> The park keeper tips a hat to you. They will be hidden somewhere new tomorrow.");
else
setStatus(F[2] + " <b>A " + F[0] + "!</b> " + n + " of " + P.hunt.length + " found in " + P.S.D.title + " today.");
},
function (dt) {
var R = SPK.ride;
if (!R)
return;
var o = R.o;
if (!SPK.cur || SPK.cur !== R.P) {
SPK.ride = null;
return;
}
R.t += dt;
var f = Math.min(1, R.t / o.dur), a = R.a0 + f * Math.PI * 2, u = o.cu + Math.cos(a) * o.ru, v = o.cv + Math.sin(a) * o.rv, p = spkW(R.P.S, u, v), q = spkW(R.P.S, o.cu + Math.cos(a + 0.06) * o.ru, o.cv + Math.sin(a + 0.06) * o.rv);
camera.position.set(p.x, spkY(p.x, p.z) + o.dy + (o.sway ? Math.sin(R.t * 2.4) * 0.04 : 0), p.z);
if (typeof yaw !== "undefined") {
yaw = Math.atan2(-(q.x - p.x), -(q.z - p.z)) + (o.sway ? Math.sin(R.t * 1.2) * o.sway : 0);
if (typeof pitch !== "undefined")
pitch = -0.05;
camera.rotation.order = "YXZ";
camera.rotation.set(pitch, yaw, 0);
}
spkPrompt("<b>Riding round " + o.label + "</b> · <b>press E</b> to stop", function () { spkRideEnd(false); }, "ride");
if (f >= 1)
spkRideEnd(true);
},
function (P) {
var D = P.S.D, got = (spkMem().got[D.k] || []).length;
var rows = [["The park", "About " + (P.S.U * 2) + " by " + (SPK_R1 - SPK_R0) + " metres, inside the railings"], ["At the middle", D.landmark], ["The west wing", D.west], ["The east wing", D.east],
["Stalls", D.stalls.map(function (s) { return s[0]; }).join(", ")], ["Hidden today", got + " of " + (P.hunt.length || 10) + " " + D.find[1] + " found"]];
if (P.maze) {
var b = spkMazeBest();
if (b)
rows.push(["Your best in the maze", spkClock(b)]);
}
var notes = D.lines.concat(["Ten " + D.find[1] + " are hidden round the park every day: walk up to one and press E to pick it up.", "The gates: the main gate on the far temple street, a side gate either side of it, and a gate at each end."]);
worldCard(worldFacts("📋 " + D.title, D.sub, rows, notes), {});
},
function (P) {
var T = [["The Washington Post", "John Philip Sousa, 1889"], ["The Liberty Bell", "John Philip Sousa, 1893"], ["The Stars and Stripes Forever", "John Philip Sousa, 1896"], ["The Entertainer", "Scott Joplin, 1902"],
["Pomp and Circumstance, March No. 1", "Edward Elgar, 1901"], ["On the Beautiful Blue Danube", "Johann Strauss II, 1866"], ["Maple Leaf Rag", "Scott Joplin, 1899"], ["Under the Double Eagle", "J. F. Wagner, 1893"]];
var n = new Date(), i = Math.floor((n.getHours() * 60 + n.getMinutes()) / 10) % T.length;
worldCard(worldFacts("🎺 The Bandstand", "The Summer Garden's band", [["Playing now", T[i][0] + " (" + T[i][1] + ")"], ["Next", T[(i + 1) % T.length][0] + " (" + T[(i + 1) % T.length][1] + ")"]], ["The band plays the old marches and rags of the bandstand's heyday, a new piece every ten minutes.", "Step up onto the bandstand and stand with them, or take a bench and listen."]), {});
},
function (P) {
var m = spkMem();
if (m.pumpkin) {
setStatus("🎃 You have already picked your pumpkin today. They grow back by morning.");
return;
}
m.pumpkin = true;
spkMemSave(m);
var kinds = ["a round orange one", "a tall knobbly one", "a pale white ghost pumpkin", "a little striped gourd", "a great heavy one you can barely lift"];
setStatus("🎃 You pick " + kinds[Math.floor(Math.random() * kinds.length)] + " from the Pumpkin Patch.");
},
function (P) {
if (typeof playTone === "function")
try {
playTone(880, 0.5);
setTimeout(function () { playTone(660, 0.6); }, 250);
}
catch (e) { }
var M = SPK.maze, s = M && M.at ? (performance.now() - M.at) / 1000 : 0, best = spkMazeBest();
if (s > 3) {
var nb = !best || s < best;
if (nb)
try {
localStorage.setItem("spk_maze", String(Math.round(s)));
}
catch (e) { }
setStatus("🔔 <b>Ding!</b> You found the middle of the Hay Maze in " + spkClock(s) + (nb ? ", your best yet." : ". (Your best: " + spkClock(best) + ".)"));
}
else
setStatus("🔔 <b>Ding!</b> The bell rings out over the Autumn Garden.");
SPK.maze = null;
},
function (P, u, v) {
var S = P.S, U = S.U, R = 0.35;
if (Math.abs(u) > U + 1.5 || v < SPK_R0 - 1.5 || v > SPK_R1 + 1.5)
return false;
if (Math.abs(v - SPK_R1) < 0.12 + R && Math.abs(u) <= U + 0.2) {
var gU = Math.round(U * 0.62);
if (!(Math.abs(u) < 4.5 || Math.abs(u - gU) < 2.6 || Math.abs(u + gU) < 2.6))
return true;
}
if (Math.abs(Math.abs(u) - U) < 0.12 + R && v >= SPK_R0 && v <= SPK_R1 + 0.2 && Math.abs(v - SPK_MID.v) >= 2.8)
return true;
if (v > SPK_R0 + 0.3 - R && v < SPK_R0 + 1.5 + R && Math.abs(u) < U)
return true;
var i;
for (i = 0; i < P.cc.length; i++) {
var c = P.cc[i];
if (Math.abs(c.u - u) < c.r + R && Math.abs(c.v - v) < c.r + R && Math.hypot(c.u - u, c.v - v) < c.r + R)
return true;
}
for (i = 0; i < P.cb.length; i++) {
var b = P.cb[i];
if (u > b.u0 - R && u < b.u1 + R && v > b.v0 - R && v < b.v1 + R)
return true;
}
for (i = 0; i < P.ce.length; i++) {
var e = P.ce[i], x = (u - e.u) / (e.ru + R), y = (v - e.v) / (e.rv + R);
if (x * x + y * y < 1)
return true;
}
return false;
},
function () {
var P = SPK.cur;
if (!P)
return { built: null, builds: SPK.builds, drops: SPK.drops };
var meshes = 0;
P.G.traverse(function (m) { if (m.isMesh || m.isSprite)
meshes++; });
return { built: P.S.D.k, U: P.S.U, size: [P.S.U * 2, SPK_R1 - SPK_R0], inst: P.inst, meshes: meshes, trees: P.trees, lamps: (P.lampUV || []).length, benches: P.benches, flowers: P.flowers, acts: P.acts.length,
walls: P.cc.length + P.cb.length + P.ce.length, hunt: P.hunt.length, stalls: P.stalls.length, maze: P.maze ? P.maze.bales : 0, sunflowers: P.sunflowers || 0, pumpkins: P.pumpkins || 0, tulips: P.tulips || 0, builds: SPK.builds, drops: SPK.drops };
}
];
});
