/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(280, function () {
"use strict";
return [
function (m) {
if (typeof modelMat === "function")
return modelMat(m);
var o = { color: m.color ? m.color.clone() : new THREE.Color(0xffffff), side: m.side };
if (m.map)
o.map = m.map;
if (m.transparent || m.opacity < 1) {
o.transparent = true;
o.opacity = m.opacity;
}
var n = new THREE.MeshLambertMaterial(o);
n.name = m.name || "";
return n;
},
function (file, cb) {
var F = SG.files[file];
if (F) {
if (F.scene)
cb(F);
else if (!F.bad)
F.wait.push(cb);
return;
}
F = SG.files[file] = { scene: null, bad: false, wait: [cb] };
sgLoader(function (L) {
L.load("assets/models/" + file, function (gl) {
var mats = {};
gl.scene.traverse(function (m) {
if (!m.isMesh)
return;
var conv = function (x) {
if (mats[x.uuid])
return mats[x.uuid];
var n = sgMat(x);
if (n.map && n.map.image && n.map.image.src) {
var src = n.map.image.src.replace(/^.*\//, "");
if (SG.tex[src] && SG.tex[src] !== n.map) {
n.map.dispose();
n.map = SG.tex[src];
}
else
SG.tex[src] = n.map;
}
return (mats[x.uuid] = n);
};
m.material = Array.isArray(m.material) ? m.material.map(conv) : conv(m.material);
m.castShadow = true;
m.receiveShadow = true;
});
F.scene = gl.scene;
var w = F.wait;
F.wait = [];
w.forEach(function (f) { try {
f(F);
}
catch (e) {
if (window.console)
console.warn("[shop goods]", file, e);
} });
}, undefined, function () { F.bad = true; F.wait = []; });
});
},
function (inner, it) {
var done = {};
inner.traverse(function (m) {
if (!m.isMesh)
return;
var conv = function (x) {
var col = it.m && it.m[x.name], glow = it.g && x.name === it.g;
if (col == null && !glow)
return x;
var key = x.uuid + ":" + (col == null ? "" : col) + (glow ? "g" : "");
if (done[key])
return done[key];
var n = SG.mat && SG.mat[key];
if (!n) {
n = x.clone();
if (col != null)
n.color.setHex(col);
if (glow) {
n.emissive = new THREE.Color(col != null ? col : 0xFFE8B0).multiplyScalar(0.45);
}
(SG.mat = SG.mat || {})[key] = n;
}
return (done[key] = n);
};
m.material = Array.isArray(m.material) ? m.material.map(conv) : conv(m.material);
});
},
function (it, o) {
o = o || {};
var g = new THREE.Group();
g.userData.sg = it.k;
g.name = "shop goods " + it.k;
var hold = new THREE.Group();
hold.position.y = o.noLift ? 0 : sgLift(it);
g.add(hold);
g.userData.sgHold = hold;
if (it.t) {
try {
hold.add(sgProc(it));
}
catch (e) {
if (window.console)
console.warn("[shop goods]", it.k, e);
}
return g;
}
var col = 0xB8A890;
if (it.m) {
for (var mk in it.m) {
col = it.m[mk];
break;
}
}
var ph = new THREE.Mesh(sgBoxGeo(), new THREE.MeshLambertMaterial({ color: col }));
ph.scale.set(Math.max(0.02, it.z[0]), Math.max(0.02, it.z[1]), Math.max(0.02, it.z[2]));
ph.position.y = it.z[1] / 2;
ph.userData.sgPh = 1;
hold.add(ph);
if (!sgModelsOn())
return g;
var file = SG_DATA.files[it.f];
sgFile(file, function (F) {
if (!F.scene || g.userData.sgDone)
return;
var inner = F.scene.clone();
sgDressModel(inner, it);
inner.scale.setScalar(it.x);
inner.position.set(it.o[0], it.o[1], it.o[2]);
hold.add(inner);
ph.visible = false;
g.userData.sgDone = 1;
if (o.onload)
try {
o.onload(g);
}
catch (e) { }
});
return g;
},
function (x, W, H, o) {
var R = sgRand(o.seed), st = o.style, i;
var sky = { sunset: ["#2A1E4A", "#E86A3A", "#F8C860"], sea: ["#7AA8D8", "#C8E0F0", "#E8F0F4"], mountains: ["#5A7AA8", "#A8C0D8", "#E0E8F0"], forest: ["#7AA0B8", "#C8D8C0", "#E8ECD8"],
night: ["#0A0E2A", "#1A2A5A", "#2A3A6A"], abstract: ["#E8E0D0", "#E8E0D0", "#E8E0D0"], bloom: ["#E8DCC0", "#D8C8A8", "#C8B890"], city: ["#3A2A5A", "#C8706A", "#F0B070"],
meadow: ["#8AB8E0", "#C8E0F0", "#F0F4E8"], storm: ["#2A2E3A", "#4A5260", "#6A7280"], dunes: ["#E8A050", "#F0C878", "#F8E0A8"], aurora: ["#060A1E", "#0E1E3A", "#1A2E4A"] }[st] || ["#888", "#AAA", "#CCC"];
var gr = x.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, sky[0]);
gr.addColorStop(0.6, sky[1]);
gr.addColorStop(1, sky[2]);
x.fillStyle = gr;
x.fillRect(0, 0, W, H);
function hills(y, amp, col, n) { x.fillStyle = col; x.beginPath(); x.moveTo(0, H); for (var k = 0; k <= n; k++) {
x.lineTo(k * W / n, y - Math.abs(Math.sin(k * 1.3 + R() * 3)) * amp - R() * amp * 0.4);
} x.lineTo(W, H); x.closePath(); x.fill(); }
if (st === "sunset" || st === "city") {
x.fillStyle = "#FFE8A0";
x.beginPath();
x.arc(W * (0.3 + R() * 0.4), H * 0.62, H * 0.12, 0, 7);
x.fill();
}
if (st === "sunset") {
hills(H * 0.72, H * 0.08, "#3A2A3A", 8);
x.fillStyle = "#2A3A5A";
x.fillRect(0, H * 0.78, W, H * 0.22);
for (i = 0; i < 12; i++) {
x.fillStyle = "rgba(255,200,120," + (0.3 + R() * 0.4) + ")";
x.fillRect(W * 0.3 + R() * W * 0.4, H * 0.8 + R() * H * 0.15, 4 + R() * 10, 1);
}
}
if (st === "sea") {
x.fillStyle = "#2A5A8A";
x.fillRect(0, H * 0.55, W, H * 0.45);
for (i = 0; i < 30; i++) {
x.fillStyle = "rgba(255,255,255," + (R() * 0.5) + ")";
x.fillRect(R() * W, H * 0.58 + R() * H * 0.4, 6 + R() * 12, 1);
}
for (i = 0; i < 1 + R() * 3; i++) {
var sx = R() * W, sy = H * 0.5 + R() * H * 0.1;
x.fillStyle = "#F4EEE0";
x.beginPath();
x.moveTo(sx, sy);
x.lineTo(sx + 8, sy - 18);
x.lineTo(sx + 10, sy);
x.fill();
x.fillStyle = "#5A3A2A";
x.fillRect(sx - 4, sy, 16, 3);
}
}
if (st === "mountains" || st === "aurora") {
if (st === "aurora") {
for (i = 0; i < 5; i++) {
x.strokeStyle = "rgba(" + (60 + R() * 80 | 0) + "," + (200 + R() * 55 | 0) + "," + (140 + R() * 80 | 0) + ",0.35)";
x.lineWidth = 6 + R() * 8;
x.beginPath();
x.moveTo(0, H * (0.15 + R() * 0.3));
x.bezierCurveTo(W * 0.3, H * R() * 0.5, W * 0.6, H * R() * 0.5, W, H * (0.1 + R() * 0.3));
x.stroke();
}
for (i = 0; i < 40; i++) {
x.fillStyle = "rgba(255,255,255," + R() + ")";
x.fillRect(R() * W, R() * H * 0.5, 1, 1);
}
}
x.fillStyle = st === "aurora" ? "#1A2A3A" : "#4A5A7A";
x.beginPath();
x.moveTo(0, H);
for (i = 0; i <= 6; i++) {
x.lineTo(i * W / 6 + R() * 10, i % 2 ? H * 0.35 + R() * H * 0.15 : H * 0.6 + R() * H * 0.1);
}
x.lineTo(W, H);
x.fill();
x.fillStyle = "#F4F8FC";
for (i = 1; i < 6; i += 2) {
var px = i * W / 6;
x.beginPath();
x.moveTo(px - 8, H * 0.47);
x.lineTo(px, H * 0.38);
x.lineTo(px + 8, H * 0.47);
x.fill();
}
hills(H * 0.85, H * 0.06, st === "aurora" ? "#E8F0F8" : "#3A5A3A", 10);
}
if (st === "forest" || st === "meadow") {
hills(H * 0.6, H * 0.1, st === "meadow" ? "#7AA850" : "#4A7A3A", 6);
hills(H * 0.75, H * 0.08, st === "meadow" ? "#9AC060" : "#3A6A30", 8);
var tn = st === "forest" ? 18 : 5;
for (i = 0; i < tn; i++) {
var tx = R() * W, ty = H * 0.6 + R() * H * 0.35, th = 10 + R() * 24;
x.fillStyle = "#4A3A2A";
x.fillRect(tx - 1, ty - th * 0.3, 3, th * 0.3);
x.fillStyle = ["#2A5A2A", "#3A6A30", "#1E4A28", "#5A8A3A"][i % 4];
x.beginPath();
x.moveTo(tx - th * 0.3, ty - th * 0.25);
x.lineTo(tx + 1, ty - th);
x.lineTo(tx + th * 0.3 + 2, ty - th * 0.25);
x.fill();
}
if (st === "meadow")
for (i = 0; i < 60; i++) {
x.fillStyle = ["#E8D040", "#F0F0F0", "#E05A5A", "#B080D0"][i % 4];
x.fillRect(R() * W, H * 0.7 + R() * H * 0.3, 2, 2);
}
}
if (st === "night") {
for (i = 0; i < 60; i++) {
x.fillStyle = "rgba(255,250,220," + (0.3 + R() * 0.7) + ")";
var r = R() * 1.6;
x.beginPath();
x.arc(R() * W, R() * H * 0.6, r, 0, 7);
x.fill();
}
x.fillStyle = "#F4ECC8";
x.beginPath();
x.arc(W * (0.2 + R() * 0.6), H * 0.22, H * 0.08, 0, 7);
x.fill();
for (i = 0; i < 6; i++) {
x.strokeStyle = "rgba(120,150,220,.4)";
x.lineWidth = 2;
x.beginPath();
x.arc(W * R(), H * R() * 0.5, 10 + R() * 30, 0, 3 + R() * 3);
x.stroke();
}
hills(H * 0.8, H * 0.1, "#0A0A14", 7);
for (i = 0; i < 8; i++) {
x.fillStyle = "#F8D060";
x.fillRect(R() * W, H * 0.82 + R() * H * 0.12, 2, 2);
}
}
if (st === "abstract") {
var pal = [["#C8302A", "#2A4A8A", "#E8C040", "#1A1A1A"], ["#E86A8A", "#3A8A8A", "#F0D8A0", "#2A2A4A"], ["#4A7A3A", "#D8A03A", "#8A3A5A", "#E8E0D0"]][o.seed % 3];
for (i = 0; i < 9; i++) {
x.fillStyle = pal[i % 4];
if (R() < 0.5)
x.fillRect(R() * W, R() * H, 10 + R() * W * 0.4, 10 + R() * H * 0.4);
else {
x.beginPath();
x.arc(R() * W, R() * H, 6 + R() * H * 0.25, 0, 7);
x.fill();
}
}
x.strokeStyle = "#1A1A1A";
x.lineWidth = 3;
for (i = 0; i < 4; i++) {
x.beginPath();
x.moveTo(R() * W, 0);
x.lineTo(R() * W, H);
x.stroke();
}
}
if (st === "bloom") {
x.fillStyle = "#8A6A4A";
x.fillRect(0, H * 0.82, W, H * 0.18);
var vx = W / 2, vy = H * 0.82;
x.fillStyle = ["#3A5A8A", "#C8A050", "#8A3A3A", "#E8E8E0"][o.seed % 4];
x.beginPath();
x.moveTo(vx - 14, vy);
x.lineTo(vx - 10, vy - 30);
x.lineTo(vx + 10, vy - 30);
x.lineTo(vx + 14, vy);
x.fill();
var fc = ["#D82A2A", "#F0C020", "#7A4AC0", "#F070A0"][o.seed % 4];
for (i = 0; i < 9; i++) {
var fx = vx + (R() - 0.5) * W * 0.5, fy = vy - 34 - R() * H * 0.45;
x.strokeStyle = "#3A6A2A";
x.lineWidth = 1.5;
x.beginPath();
x.moveTo(vx, vy - 30);
x.lineTo(fx, fy);
x.stroke();
x.fillStyle = fc;
for (var p = 0; p < 6; p++) {
x.beginPath();
x.arc(fx + Math.cos(p) * 5, fy + Math.sin(p) * 5, 4, 0, 7);
x.fill();
}
x.fillStyle = "#3A2A1A";
x.beginPath();
x.arc(fx, fy, 3, 0, 7);
x.fill();
}
}
if (st === "city") {
for (i = 0; i < 14; i++) {
var bw = 8 + R() * 14, bh = H * (0.2 + R() * 0.45), bx = i * W / 14;
x.fillStyle = sgMix(0x2A1E3A, 0x5A3A5A, R());
x.fillRect(bx, H - bh, bw, bh);
for (var wy = H - bh + 4; wy < H - 4; wy += 6)
for (var wx = bx + 2; wx < bx + bw - 2; wx += 5)
if (R() < 0.4) {
x.fillStyle = "#F8D070";
x.fillRect(wx, wy, 2, 2);
}
}
x.fillStyle = "#1A1426";
x.fillRect(W * 0.45, H * 0.15, W * 0.08, H * 0.85);
}
if (st === "storm") {
for (i = 0; i < 8; i++) {
x.fillStyle = "rgba(40,44,56,.6)";
x.beginPath();
x.arc(R() * W, R() * H * 0.4, 20 + R() * 30, 0, 7);
x.fill();
}
x.strokeStyle = "#F0F0FF";
x.lineWidth = 2;
x.beginPath();
var lx = W * (0.3 + R() * 0.4), ly = H * 0.2;
x.moveTo(lx, ly);
for (i = 0; i < 5; i++) {
lx += (R() - 0.5) * 20;
ly += H * 0.1;
x.lineTo(lx, ly);
}
x.stroke();
x.fillStyle = "#2A3A4A";
x.fillRect(0, H * 0.75, W, H * 0.25);
for (i = 0; i < 40; i++) {
x.strokeStyle = "rgba(200,210,230,.25)";
x.beginPath();
var rx = R() * W, ry = R() * H;
x.moveTo(rx, ry);
x.lineTo(rx - 3, ry + 10);
x.stroke();
}
}
if (st === "dunes") {
for (i = 0; i < 4; i++) {
x.fillStyle = ["#D89040", "#E0A050", "#C88038", "#E8B060"][i];
x.beginPath();
x.moveTo(0, H);
var by = H * (0.55 + i * 0.1);
x.quadraticCurveTo(W * R(), by - H * 0.15, W, by);
x.lineTo(W, H);
x.fill();
}
x.fillStyle = "#FFF4C8";
x.beginPath();
x.arc(W * 0.75, H * 0.25, H * 0.09, 0, 7);
x.fill();
if (o.seed % 2) {
x.fillStyle = "#3A6A3A";
x.fillRect(W * 0.2, H * 0.62, 3, 14);
x.beginPath();
x.arc(W * 0.2 + 1, H * 0.62, 9, 3.4, 6);
x.fill();
}
}
for (i = 0; i < 300; i++) {
x.fillStyle = "rgba(" + (R() < 0.5 ? "255,255,255" : "0,0,0") + "," + (R() * 0.06) + ")";
x.fillRect(R() * W, R() * H, 2, 1);
}
},
function (x, W, H, o) {
var R = sgRand(o.seed), A = sgHex(o.a), B = sgHex(o.b), D = sgMix(o.a, 0x000000, 0.35), L = sgMix(o.b, 0xffffff, 0.3), i, j;
x.fillStyle = A;
x.fillRect(0, 0, W, H);
if (o.pattern === "medallion") {
x.strokeStyle = B;
x.lineWidth = 6;
x.strokeRect(6, 6, W - 12, H - 12);
x.lineWidth = 2;
x.strokeRect(14, 14, W - 28, H - 28);
x.fillStyle = B;
x.beginPath();
x.ellipse(W / 2, H / 2, W * 0.22, H * 0.3, 0, 0, 7);
x.fill();
x.fillStyle = D;
x.beginPath();
x.ellipse(W / 2, H / 2, W * 0.14, H * 0.2, 0, 0, 7);
x.fill();
x.fillStyle = L;
x.beginPath();
x.ellipse(W / 2, H / 2, W * 0.06, H * 0.09, 0, 0, 7);
x.fill();
[[22, 22], [W - 22, 22], [22, H - 22], [W - 22, H - 22]].forEach(function (c) { x.fillStyle = B; x.beginPath(); x.arc(c[0], c[1], 9, 0, 7); x.fill(); });
}
else if (o.pattern === "stripes") {
for (i = 0; i < H; i += 12) {
x.fillStyle = (i / 12) % 2 ? B : D;
x.fillRect(0, i, W, 6);
}
x.fillStyle = L;
for (i = 0; i < H; i += 24)
x.fillRect(0, i + 8, W, 2);
}
else if (o.pattern === "checks") {
var n = 8;
for (i = 0; i < n; i++)
for (j = 0; j < n; j++)
if ((i + j) % 2) {
x.fillStyle = B;
x.fillRect(i * W / n, j * H / n, W / n, H / n);
}
x.strokeStyle = D;
x.lineWidth = 4;
x.strokeRect(2, 2, W - 4, H - 4);
}
else if (o.pattern === "diamonds") {
x.fillStyle = B;
for (i = 0; i < 5; i++)
for (j = 0; j < 4; j++) {
var cx = W * (i + 0.5) / 5, cy = H * (j + 0.5) / 4;
x.beginPath();
x.moveTo(cx, cy - H / 9);
x.lineTo(cx + W / 12, cy);
x.lineTo(cx, cy + H / 9);
x.lineTo(cx - W / 12, cy);
x.fill();
}
x.fillStyle = D;
for (i = 0; i < 5; i++)
for (j = 0; j < 4; j++) {
var dx = W * (i + 0.5) / 5, dy = H * (j + 0.5) / 4;
x.fillRect(dx - 3, dy - 3, 6, 6);
}
x.strokeStyle = B;
x.lineWidth = 5;
x.strokeRect(4, 4, W - 8, H - 8);
}
else if (o.pattern === "border") {
x.fillStyle = D;
x.fillRect(10, 10, W - 20, H - 20);
x.fillStyle = A;
x.fillRect(22, 22, W - 44, H - 44);
x.fillStyle = B;
for (i = 14; i < W - 14; i += 10) {
x.fillRect(i, 13, 5, 5);
x.fillRect(i, H - 18, 5, 5);
}
for (j = 14; j < H - 14; j += 10) {
x.fillRect(13, j, 5, 5);
x.fillRect(W - 18, j, 5, 5);
}
}
else {
for (j = 0; j < H; j += H / 6) {
for (i = 0; i < W; i += W / 8) {
x.fillStyle = ((i / (W / 8)) + (j / (H / 6))) % 2 < 1 ? B : D;
x.beginPath();
x.moveTo(i, j + H / 12);
x.lineTo(i + W / 16, j);
x.lineTo(i + W / 8, j + H / 12);
x.lineTo(i + W / 16, j + H / 6);
x.fill();
}
}
x.fillStyle = L;
for (j = 0; j < H; j += H / 6)
x.fillRect(0, j, W, 2);
}
for (i = 0; i < W; i += 2) {
x.fillStyle = "rgba(0,0,0," + (0.03 + R() * 0.04) + ")";
x.fillRect(i, 0, 1, H);
}
x.fillStyle = L;
for (i = 0; i < W; i += 3) {
x.fillRect(i, 0, 1, 3);
x.fillRect(i, H - 3, 1, 3);
}
},
function (it) {
var o = it.q, g = new THREE.Group();
function box(w, h, d, m, x, y, z) { var b = new THREE.Mesh(sgBoxGeo(), m); b.scale.set(w, h, d); b.position.set(x || 0, y || 0, z || 0); b.castShadow = true; g.add(b); return b; }
if (it.t === "painting") {
var t = sgCanvasTex(it.k, 160, Math.round(160 * o.h / o.w), function (x, W, H) { sgPainting(x, W, H, o); });
box(o.w + 0.1, o.h + 0.1, 0.05, sgLam(o.frame), 0, (o.h + 0.1) / 2, 0);
var pic = new THREE.Mesh(new THREE.PlaneGeometry(o.w, o.h), new THREE.MeshLambertMaterial({ map: t }));
pic.position.set(0, (o.h + 0.1) / 2, 0.027);
g.add(pic);
return g;
}
if (it.t === "rug") {
var rt = sgCanvasTex(it.k, 128, Math.round(128 * o.d / o.w), function (x, W, H) { sgRug(x, W, H, o); });
var rm = new THREE.Mesh(new THREE.BoxGeometry(o.w, 0.015, o.d), [sgLam(o.a), sgLam(o.a), new THREE.MeshLambertMaterial({ map: rt }), sgLam(o.a), sgLam(o.a), sgLam(o.a)]);
rm.position.y = 0.008;
rm.receiveShadow = true;
g.add(rm);
return g;
}
if (it.t === "clock") {
var W = sgLam(o.wood), Fm = sgLam(o.face), K = sgLam(0x1A1A1A), Gd = sgLam(0xC9A04A);
function face(r, y, z) {
var f = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.02, 24), Fm);
f.rotation.x = Math.PI / 2;
f.position.set(0, y, z);
g.add(f);
var rim = new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 6, 24), Gd);
rim.position.set(0, y, z + 0.01);
g.add(rim);
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2;
box(0.008, r * 0.15, 0.004, K, Math.sin(a) * r * 0.82, y + Math.cos(a) * r * 0.82, z + 0.012).rotation.z = -a;
}
box(0.012, r * 0.55, 0.004, K, 0, y + r * 0.25, z + 0.016);
var mh = box(0.01, r * 0.75, 0.004, K, r * 0.3, y + r * 0.15, z + 0.018);
mh.rotation.z = -1.2;
}
if (o.kind === "grandfather") {
box(0.5, 0.25, 0.34, W, 0, 0.125, 0);
box(0.42, 1.2, 0.28, W, 0, 0.85, 0);
box(0.52, 0.5, 0.34, W, 0, 1.7, 0);
box(0.56, 0.08, 0.38, W, 0, 1.99, 0);
box(0.24, 0.8, 0.01, new THREE.MeshLambertMaterial({ color: 0x1A1410 }), 0, 0.85, 0.142);
var pd = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.015, 16), Gd);
pd.rotation.x = Math.PI / 2;
pd.position.set(0, 0.62, 0.15);
g.add(pd);
box(0.012, 0.4, 0.01, Gd, 0, 0.84, 0.15);
face(0.16, 1.7, 0.175);
}
else if (o.kind === "mantel") {
box(0.4, 0.22, 0.16, W, 0, 0.11, 0);
var ar = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.16, 20, 1, false, 0, Math.PI), W);
ar.rotation.z = Math.PI / 2;
ar.rotation.y = Math.PI / 2;
ar.position.set(0, 0.22, 0);
g.add(ar);
box(0.44, 0.03, 0.18, W, 0, 0.015, 0);
face(0.09, 0.19, 0.085);
}
else if (o.kind === "wall") {
var rb = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.06, 28), W);
rb.rotation.x = Math.PI / 2;
rb.position.set(0, 0.2, 0);
g.add(rb);
face(0.17, 0.2, 0.035);
}
else {
box(0.28, 0.3, 0.16, W, 0, 0.2, 0);
var rf = box(0.2, 0.03, 0.2, sgLam(0x5A3A22), -0.08, 0.38, 0);
rf.rotation.z = 0.7;
var rf2 = box(0.2, 0.03, 0.2, sgLam(0x5A3A22), 0.08, 0.38, 0);
rf2.rotation.z = -0.7;
box(0.06, 0.06, 0.01, K, 0, 0.31, 0.082);
face(0.07, 0.2, 0.085);
[-0.04, 0.04].forEach(function (x) { box(0.025, 0.08, 0.025, Gd, x, 0.0, 0.03); });
}
return g;
}
return g;
},
function (sel, draft, pick) {
if (!sel || sel.querySelector("optgroup[data-sg]"))
return;
sel.style.maxWidth = "100%";
var mine = sgOwnedHome();
if (sgKeeper() && !mine.length)
mine = SG_DATA.goods.slice().sort(function (a, b) { return a.n < b.n ? -1 : 1; });
var plain = document.createElement("optgroup");
plain.label = "The house's own pieces";
Array.prototype.slice.call(sel.options).forEach(function (op) { plain.appendChild(op); });
if (mine.length) {
var og = document.createElement("optgroup");
og.label = "Bought in the shops";
og.setAttribute("data-sg", "1");
mine.forEach(function (it) {
var op = document.createElement("option");
op.value = it.k;
var used = (draft || []).filter(function (p) { return p.k === it.k; }).length, own = sgKeeper() ? 0 : sgOwned(it.k);
op.textContent = it.n + (own ? " (" + Math.max(0, own - used) + " of " + own + " to set out)" : "");
og.appendChild(op);
});
sel.appendChild(og);
}
sel.appendChild(plain);
if (pick && SG.by[pick])
sel.value = pick;
else if (mine.length && SG.pick)
sel.value = SG.pick;
},
function (k, draft) {
var it = SG.by[k];
if (!it || sgKeeper())
return true;
var own = sgOwned(k), used = (draft || []).filter(function (p) { return p.k === k; }).length;
if (used < own)
return true;
setStatus(own ? "<b>All " + own + " of your " + esc(it.n.toLowerCase()) + " are set out.</b> Buy another at " + esc(SG_DATA.shops[it.s]) + "." : "<b>You don't own that yet.</b> It is sold at " + esc(SG_DATA.shops[it.s]) + ".");
return false;
},
function (I) {
if (!I || !I.root)
return;
var kids = I.root.children, tops = [];
kids.forEach(function (c) { var h = sgTopOf(c); if (h > 0)
tops.push({ c: c, h: h }); });
kids.forEach(function (c) {
var it = c.userData && SG.by[c.userData.furn];
if (!it || it.a !== "table")
return;
var best = null, bd = 0.8;
tops.forEach(function (t) { if (t.c === c || Math.abs(t.c.position.y - c.position.y) > 0.5)
return; var d = Math.hypot(t.c.position.x - c.position.x, t.c.position.z - c.position.z); if (d < bd) {
bd = d;
best = t;
} });
var hold = c.userData.sgHold;
if (hold)
hold.position.y = best ? best.h : 0;
});
},
function (it) {
if (typeof bkpInDream === "function" && !bkpInDream())
return setStatus("<b>" + esc(it.n) + "</b>: set it out at home (<b>Rearrange your house</b>, or <b>Furnish your apartment</b> in the Eyrie), or open your backpack in one of your dreams.");
sgKit(it.k);
var P = camera.position, fx = -Math.sin(yaw), fz = -Math.cos(yaw);
var spec = { id: (typeof uid === "function" ? uid() : "sg" + Date.now()), archetype: it.k, label: it.n, attrs: {}, x: P.x + fx * 2.5, z: P.z + fz * 2.5, rot: yaw, solid: false, detail: 3, nights: [store.session], issued: true, realm: store.here || 0 };
store.objects.push(spec);
if (typeof addMesh === "function")
addMesh(spec);
save();
setStatus("<b>You set out the " + esc(it.n.toLowerCase()) + ".</b> It stays in this dream; it is still yours.");
},
function (it) {
SG.pick = it.k;
try {
if (typeof INT !== "undefined" && INT && INT.wpKey && /^lot:/.test(INT.wpKey) && typeof canArrange === "function" && canArrange(INT.wpKey)) {
if (typeof bkpClose === "function")
bkpClose();
if (!wpEditing)
startArranging();
else
paintArranger();
var s = document.getElementById("wp-kind");
if (s)
s.value = it.k;
return setStatus("<b>" + esc(it.n) + "</b> is chosen: walk to where you want it and press <b>Place here</b>, then <b>Save for everyone</b>.");
}
if (typeof eydInEyrie === "function" && eydInEyrie() && CORP.data && CORP.data.apartment && typeof eydStart === "function") {
if (typeof bkpClose === "function")
bkpClose();
if (!EYD.edit) {
if (eydHereNum() !== CORP.data.apartment)
eydGoHome(CORP.data.apartment);
eydStart(CORP.data.apartment);
}
else
eydPaint();
var s2 = document.getElementById("eyd-kind");
if (s2)
s2.value = it.k;
return setStatus("<b>" + esc(it.n) + "</b> is chosen: walk to where you want it and press <b>Place here</b>, then <b>Save</b>.");
}
}
catch (e) { }
if (typeof bkpClose === "function")
bkpClose();
setStatus("<b>Take it home.</b> Go into your house and press <b>Rearrange your house</b> (or <b>Furnish your apartment</b> in the Eyrie): the " + esc(it.n.toLowerCase()) + " is at the top of the list.");
if (typeof showTheWayHome === "function")
try {
showTheWayHome();
}
catch (e) { }
},
function (it, on) {
var W0 = WEAR[it.w];
if (!W0)
return;
var L = meLook(), lk = sgLookKey(W0.slot), ck = SG_DYE[W0.slot];
L.sgw = L.sgw || {};
L.sgwWas = L.sgwWas || {};
L.src = L.src || {};
var set = {};
if (on) {
if (!L.sgw[lk])
L.sgwWas[lk] = L[ck] === undefined ? null : L[ck];
set[lk] = it.w;
set[ck] = it.col;
L.sgw[lk] = it.k;
}
else {
set[lk] = W0.slot === "legs" ? "trousers" : W0.slot === "feet" ? "shoes" : null;
set[ck] = L.sgwWas[lk] === undefined ? null : L.sgwWas[lk];
delete L.sgw[lk];
delete L.sgwWas[lk];
}
Object.keys(set).forEach(function (k) { L[k] = set[k]; L.src[k] = "chosen"; });
try {
var od = dreamer().offDuty;
if (od && od.look)
Object.keys(set).forEach(function (k) { if (k in od.look)
od.look[k] = set[k]; });
}
catch (e) { }
if (typeof rebuildMe === "function")
rebuildMe();
save();
setStatus(on ? "<b>You put on the " + esc(it.n.toLowerCase()) + ".</b>" : "You take off the " + esc(it.n.toLowerCase()) + ".");
},
function (it, px) {
var key = it.w + ":" + it.col + ":" + px;
if (SG.icons[key])
return SG.icons[key];
var c = document.createElement("canvas");
c.width = c.height = px;
var x = c.getContext("2d"), S = px / 64, col = sgHex(it.col), dk = sgMix(it.col, 0x000000, 0.35), lt = sgMix(it.col, 0xffffff, 0.25);
x.scale(S, S);
x.lineJoin = "round";
x.lineWidth = 1.6;
x.strokeStyle = dk;
x.fillStyle = col;
function P(pts, close) { x.beginPath(); x.moveTo(pts[0], pts[1]); for (var i = 2; i < pts.length; i += 2)
x.lineTo(pts[i], pts[i + 1]); if (close !== false)
x.closePath(); x.fill(); x.stroke(); }
function E(cx, cy, rx, ry) { x.beginPath(); x.ellipse(cx, cy, rx, ry, 0, 0, 7); x.fill(); x.stroke(); }
var w = it.w;
if (/^(jacket|longcoat|suit|uniform|hoodie|sweater|tunic|kimono)$/.test(w)) {
var low = w === "longcoat" || w === "kimono" ? 58 : w === "tunic" ? 52 : 46;
P([20, 10, 26, 8, 32, 13, 38, 8, 44, 10, 56, 22, 52, 30, 46, 26, 46, low, 18, low, 18, 26, 12, 30, 8, 22]);
if (w === "suit" || w === "jacket" || w === "longcoat" || w === "uniform") {
x.fillStyle = w === "suit" ? "#F2F0EA" : lt;
P([28, 10, 32, 26, 36, 10]);
if (w === "suit") {
x.fillStyle = "#7A1E26";
P([31, 14, 33, 14, 34, 30, 32, 33, 30, 30]);
}
x.fillStyle = dk;
[22, 30, 38].forEach(function (y) { x.beginPath(); x.arc(32, y + 6, 1.3, 0, 7); x.fill(); });
}
if (w === "hoodie") {
x.fillStyle = dk;
P([24, 9, 32, 4, 40, 9, 36, 14, 28, 14]);
x.strokeStyle = lt;
x.beginPath();
x.moveTo(26, 36);
x.lineTo(38, 36);
x.stroke();
}
if (w === "sweater") {
x.strokeStyle = lt;
for (var r = 18; r < 46; r += 5) {
x.beginPath();
x.moveTo(20, r);
x.lineTo(44, r);
x.stroke();
}
}
if (w === "kimono") {
x.fillStyle = dk;
x.fillRect(18, 32, 28, 5);
x.strokeStyle = lt;
x.beginPath();
x.moveTo(26, 9);
x.lineTo(34, 30);
x.stroke();
}
if (w === "tunic") {
x.fillStyle = "#4A3220";
x.fillRect(18, 34, 28, 3);
}
}
else if (w === "vest") {
P([22, 8, 30, 12, 32, 30, 34, 12, 42, 8, 46, 20, 46, 48, 34, 48, 32, 44, 30, 48, 18, 48, 18, 20]);
x.fillStyle = lt;
[20, 27, 34, 41].forEach(function (y) { x.beginPath(); x.arc(33, y, 1.2, 0, 7); x.fill(); });
}
else if (w === "apron") {
P([24, 8, 40, 8, 40, 22, 48, 24, 46, 58, 18, 58, 16, 24, 24, 22]);
x.strokeStyle = lt;
x.strokeRect(26, 34, 12, 8);
}
else if (w === "cape" || w === "cloak") {
P([24, 10, 40, 10, 52, 56, 32, 60, 12, 56]);
if (w === "cloak") {
x.fillStyle = dk;
E(32, 12, 10, 8);
}
x.fillStyle = "#C9A04A";
x.beginPath();
x.arc(32, 12, 2, 0, 7);
x.fill();
}
else if (w === "backpack") {
x.beginPath();
x.roundRect ? x.roundRect(16, 12, 32, 42, 8) : x.rect(16, 12, 32, 42);
x.fill();
x.stroke();
x.fillStyle = dk;
x.fillRect(16, 20, 32, 8);
x.fillStyle = lt;
x.fillRect(22, 36, 20, 12);
x.strokeStyle = dk;
x.beginPath();
x.arc(32, 12, 8, 3.14, 0);
x.stroke();
}
else if (/^(cap|beanie|bandana|hood)$/.test(w)) {
x.beginPath();
x.arc(32, 38, 18, Math.PI, 0);
x.closePath();
x.fill();
x.stroke();
if (w === "cap") {
P([32, 38, 58, 38, 56, 44, 32, 42]);
}
if (w === "beanie") {
x.fillStyle = dk;
x.fillRect(14, 36, 36, 8);
x.fillStyle = lt;
x.beginPath();
x.arc(32, 18, 5, 0, 7);
x.fill();
}
if (w === "bandana") {
x.fillStyle = lt;
for (var b = 0; b < 6; b++) {
x.beginPath();
x.arc(22 + b * 4, 30 + (b % 2) * 4, 1.4, 0, 7);
x.fill();
}
P([46, 36, 54, 44, 48, 46], true);
}
}
else if (/^(brimmed|tophat|cowboy|wizard|witch)$/.test(w)) {
if (w === "tophat") {
x.fillRect(20, 12, 24, 30);
x.strokeRect(20, 12, 24, 30);
E(32, 44, 22, 5);
x.fillStyle = dk;
x.fillRect(20, 34, 24, 5);
}
else if (w === "wizard" || w === "witch") {
P([18, 48, 32, 6, 46, 48]);
E(32, 50, 24, 5);
x.fillStyle = w === "wizard" ? "#E8D060" : dk;
if (w === "wizard") {
[[28, 30], [36, 22], [34, 38]].forEach(function (s) { x.beginPath(); x.arc(s[0], s[1], 2, 0, 7); x.fill(); });
}
else
x.fillRect(22, 40, 20, 5);
}
else {
E(32, 44, 26, 7);
x.beginPath();
x.arc(32, 42, 13, Math.PI, 0);
x.fill();
x.stroke();
if (w === "cowboy") {
x.fillStyle = dk;
x.fillRect(19, 38, 26, 4);
}
else {
x.fillStyle = dk;
x.fillRect(19, 38, 26, 3);
}
}
}
else if (w === "scarf") {
P([14, 20, 50, 20, 50, 28, 40, 28, 42, 56, 34, 56, 32, 28, 14, 28]);
x.strokeStyle = lt;
[44, 50].forEach(function (y) { x.beginPath(); x.moveTo(34, y); x.lineTo(42, y); x.stroke(); });
}
else if (w === "bowtie") {
P([32, 32, 14, 20, 14, 44]);
P([32, 32, 50, 20, 50, 44]);
x.fillStyle = dk;
E(32, 32, 4, 5);
}
else if (w === "gloves") {
[[18, 1], [46, -1]].forEach(function (g) { var cx = g[0], f = g[1]; P([cx - 8, 56, cx - 8, 30, cx - 9 * f, 24, cx - 6, 26, cx - 6, 14, cx - 3, 14, cx - 3, 26, cx, 12, cx + 3, 12, cx + 3, 26, cx + 6, 14, cx + 9, 16, cx + 8, 30, cx + 8, 56]); });
}
else if (/^(trousers|jeans|shorts|skirt|kilt)$/.test(w)) {
if (w === "skirt" || w === "kilt") {
P([20, 12, 44, 12, 52, 52, 12, 52]);
if (w === "kilt") {
x.strokeStyle = lt;
for (var k = 16; k < 50; k += 6) {
x.beginPath();
x.moveTo(k, 14);
x.lineTo(k - 2, 52);
x.stroke();
}
x.strokeStyle = dk;
x.beginPath();
x.moveTo(14, 30);
x.lineTo(50, 30);
x.stroke();
}
}
else {
var bot = w === "shorts" ? 36 : 58;
P([18, 8, 46, 8, 48, bot, 35, bot, 32, 24, 29, bot, 16, bot]);
x.fillStyle = dk;
x.fillRect(18, 8, 28, 4);
if (w === "jeans") {
x.strokeStyle = "#D8A040";
x.beginPath();
x.moveTo(22, 16);
x.lineTo(28, 16);
x.moveTo(36, 16);
x.lineTo(42, 16);
x.stroke();
}
}
}
else if (/^(shoes|boots|heels|sneakers|sandals)$/.test(w)) {
[[8, 0], [34, 6]].forEach(function (o) {
var X = o[0], Y = o[1];
if (w === "boots")
P([X + 4, Y + 14, X + 14, Y + 14, X + 14, Y + 40, X + 26, Y + 46, X + 26, Y + 52, X + 4, Y + 52]);
else if (w === "heels") {
P([X + 2, Y + 40, X + 10, Y + 36, X + 26, Y + 46, X + 26, Y + 50, X + 12, Y + 50, X + 6, Y + 44, X + 5, Y + 52, X + 3, Y + 52]);
}
else if (w === "sandals") {
x.fillStyle = dk;
x.fillRect(X + 2, Y + 48, 24, 4);
x.fillStyle = col;
x.fillRect(X + 6, Y + 40, 4, 9);
x.fillRect(X + 16, Y + 42, 4, 7);
x.fillRect(X + 4, Y + 44, 20, 3);
}
else {
P([X + 2, Y + 38, X + 14, Y + 38, X + 26, Y + 44, X + 26, Y + 50, X + 2, Y + 50]);
if (w === "sneakers") {
x.fillStyle = "#F4F4F0";
x.fillRect(X + 2, Y + 48, 24, 4);
x.strokeStyle = "#F4F4F0";
x.beginPath();
x.moveTo(X + 10, Y + 40);
x.lineTo(X + 18, Y + 44);
x.stroke();
}
}
});
}
else {
E(32, 32, 18, 18);
}
return (SG.icons[key] = c.toDataURL());
},
function (it, px) {
px = px || 64;
if (it.kind === "wear")
return '<img alt="" src="' + sgWearIcon(it, px * 2) + '" style="width:' + px + 'px;height:' + px + 'px;display:block">';
var I = typeof SG_ICONS !== "undefined" && SG_ICONS[it.s];
if (I && !I.at) {
I.at = {};
var n0 = 0;
(SG.shop[it.s] || []).forEach(function (q) { if (q.kind === "home")
I.at[q.k] = n0++; });
}
if (!I || I.at[it.k] == null)
return '<span style="display:block;width:' + px + 'px;height:' + px + 'px;font-size:' + (px * 0.5) + 'px;line-height:' + px + 'px;text-align:center">📦</span>';
var n = I.at[it.k], cols = I.cols, k = px / I.cell;
return '<span style="display:block;width:' + px + 'px;height:' + px + 'px;background:url(assets/shop-icons/' + I.file + ') ' + (-(n % cols) * px) + 'px ' + (-Math.floor(n / cols) * px) + 'px/' + (cols * px) + 'px auto no-repeat"></span>';
},
function (force) {
if (SG.rows && !force)
return Promise.resolve(SG.rows);
if (typeof catalogueRows !== "function")
return Promise.resolve([]);
return catalogueRows().then(function (r) { SG.rows = Array.isArray(r) ? r : []; SG.rowBy = {}; SG.rows.forEach(function (q) { if (q && q.archetype)
SG.rowBy[q.archetype] = q; }); if (typeof SHOPC !== "undefined")
SHOPC.cat = SG.rows; return SG.rows; })
.catch(function () { SG.rows = null; return []; });
},
function () {
var el = document.getElementById("sgshop");
if (el)
return el;
el = document.createElement("div");
el.id = "sgshop";
el.style.cssText = "position:fixed;z-index:58;left:50%;top:50%;transform:translate(-50%,-50%);width:min(720px,calc(100vw - 20px));max-height:min(86vh,760px);display:none;flex-direction:column;" +
"background:linear-gradient(180deg,rgba(18,15,24,.98),rgba(9,8,12,.99));border:1px solid #8A7A4A;border-radius:8px;padding:12px 12px 10px;color:var(--bone,#C9BEA8);font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6)";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("keyup", function (e) { e.stopPropagation(); });
el.addEventListener("input", function (e) { if (e.target && e.target.id === "sg-q") {
SG.q = e.target.value;
SG.page = 1;
sgPaintList();
} });
el.addEventListener("click", function (e) {
var b = e.target.closest && e.target.closest("[data-sg]");
if (!b)
return;
var a = b.getAttribute("data-sg"), v = b.getAttribute("data-v");
if (a === "x")
return sgShopClose();
if (a === "pack") {
sgShopClose();
if (typeof bkpOpen === "function")
bkpOpen();
return;
}
if (a === "tab") {
SG.tab = v;
SG.page = 1;
sgPaintList();
return;
}
if (a === "more") {
SG.page++;
sgPaintList();
return;
}
if (a === "buy")
return sgBuy(v, b);
if (a === "look") {
var it = SG.by[v];
if (it)
sgLook(it);
return;
}
});
document.body.appendChild(el);
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!SG.open; }, close: sgShopClose });
return el;
},
function (name) {
SG.open = name;
SG.tab = "";
SG.q = "";
SG.page = 1;
SG.msg = "";
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
sgPaint();
sgIconsLoad(sgShopIndex(name));
sgRowsLoad().then(function () { sgPaintList(); });
if (typeof signedIn === "function" && signedIn() && typeof loadThings === "function")
loadThings().then(function () { if (SG.open)
sgPaintList(); });
},
function () {
var el = sgEl(), k = SG.open;
if (!k) {
el.style.display = "none";
return;
}
var goods = sgShopGoods(k), cats = sgCats(goods);
el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">' +
'<b style="font:500 17px var(--serif,Georgia);color:#F0E0B8">' + esc(k) + '</b>' +
'<span><button class="btn" data-sg="pack">🎒 Backpack</button> <button class="btn" data-sg="x">Close</button></span></div>' +
'<div id="sg-msg" style="margin:6px 0 4px;min-height:16px"></div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px">' +
'<input id="sg-q" type="search" placeholder="Search ' + goods.length + ' pieces…" style="flex:1;min-width:140px;background:rgba(0,0,0,.35);border:1px solid #5A5040;color:inherit;border-radius:4px;padding:6px 8px;font:inherit">' +
'</div>' +
'<div id="sg-tabs" style="display:flex;gap:5px;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;margin-bottom:8px;padding-bottom:2px">' +
['<button class="btn" data-sg="tab" data-v="" style="flex:none">All</button>'].concat(cats.map(function (c) { return '<button class="btn" data-sg="tab" data-v="' + esc(c) + '" style="flex:none;white-space:nowrap">' + esc(c) + '</button>'; })).join("") + '</div>' +
'<div id="sg-list" style="overflow-y:auto;-webkit-overflow-scrolling:touch;flex:1;min-height:120px"></div>';
el.style.display = "flex";
sgPaintList();
},
function () {
var el = document.getElementById("sg-list");
if (!el || !SG.open)
return;
var m = document.getElementById("sg-msg");
if (m)
m.innerHTML = SG.msg || "";
Array.prototype.forEach.call(document.querySelectorAll("#sg-tabs [data-v]"), function (b) { var on = b.getAttribute("data-v") === SG.tab; b.style.borderColor = on ? "#F0E0B8" : ""; b.style.color = on ? "#F0E0B8" : ""; });
var q = String(SG.q || "").toLowerCase().trim(), goods = sgShopGoods(SG.open).filter(function (it) {
return (!SG.tab || sgCat(it) === SG.tab) && (!q || it.n.toLowerCase().indexOf(q) > -1);
});
var per = SG.page * 36, show = goods.slice(0, per), rows = SG.rows, h = "";
if (!goods.length)
h = '<div style="color:var(--dim,#999);padding:10px">Nothing on these shelves matches.</div>';
h += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px">';
show.forEach(function (it) {
var r = SG.rowBy && SG.rowBy[it.k], price = r ? +r.price : it.p, own = sgOwned(it.k);
var act = !rows ? '<span style="color:var(--dim,#999)">…</span>' :
!r ? '<span style="color:var(--dim,#999);font-size:11px">Not in stock just now</span>' :
'<button class="btn" data-sg="buy" data-v="' + esc(it.k) + '">Buy</button>';
h += '<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:8px;display:flex;flex-direction:column;gap:6px">' +
'<div data-sg="look" data-v="' + esc(it.k) + '" style="display:flex;justify-content:center;cursor:pointer;background:radial-gradient(circle at 50% 40%,rgba(255,240,210,.14),rgba(0,0,0,0) 70%);border-radius:4px;padding:2px">' + sgIconHtml(it, 80) + '</div>' +
'<div style="font-size:12.5px;line-height:1.3;min-height:32px">' + esc(it.n) + '</div>' +
'<div style="display:flex;justify-content:space-between;align-items:center;gap:6px"><span style="white-space:nowrap;color:#F0E0B8">' + Number(price).toLocaleString() + ' gold</span>' + act + '</div>' +
(own ? '<div style="font-size:11px;color:#9AFFA0">You own ' + own + '</div>' : '') +
'</div>';
});
h += '</div>';
if (goods.length > per)
h += '<div style="text-align:center;margin:10px 0 4px"><button class="btn" data-sg="more">Show more (' + (goods.length - per) + ' more)</button></div>';
if (!SG.tab && !q && rows && typeof shopcRows === "function") {
var old = shopcRows(SG.open, rows.filter(function (r) { return !SG.by[r.archetype]; })).filter(function (r) { return SHOPC_SHELVES[SG.open] && ((SHOPC_SHELVES[SG.open].kind && SHOPC_SHELVES[SG.open].kind.test(String(r.kind || ""))) || (SHOPC_SHELVES[SG.open].name && SHOPC_SHELVES[SG.open].name.test(String(r.name || "")))); });
if (old.length) {
h += '<div style="margin:12px 0 4px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868">Also on the shelves</div>';
old.forEach(function (r) { h += '<div style="display:flex;justify-content:space-between;gap:10px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.06)"><span>' + esc(r.name) + '</span><span style="white-space:nowrap">' + Number(r.price).toLocaleString() + ' gold <button class="btn" data-sg="buy" data-v="#' + (+r.id) + '">Buy</button></span></div>'; });
}
}
el.innerHTML = h;
},
function (k, btn) {
if (!(typeof signedIn === "function" && signedIn())) {
SG.msg = "Sign in and join Somnucor to buy.";
return sgPaintList();
}
var r = k.charAt(0) === "#" ? (SG.rows || []).filter(function (q) { return +q.id === +k.slice(1); })[0] : (SG.rowBy && SG.rowBy[k]);
if (!r)
return;
var it = SG.by[r.archetype];
if (!confirm("Buy the " + r.name + " for " + Number(r.price).toLocaleString() + " gold? It's yours for good, in your backpack."))
return;
if (btn)
btn.disabled = true;
SG.msg = "Paying…";
sgPaintList();
Promise.resolve(buyItem(r.id, null)).then(function (o) {
SG.msg = o === "ok" ? "<b style='color:#9AFFA0'>Bought: " + esc(r.name) + ".</b> It is in your backpack" + (it && SG_ARMS[it.k] ? ": hold it from there (it fights in Ironfray too), or stand it at home." : it && it.kind === "home" ? ": set it out at home with Rearrange your house." : it && it.kind === "wear" ? ": wear it from there." : ".")
: "<span style='color:#FFB89A'>" + esc(String(o || "Not bought.")) + "</span>";
sgPaintList();
});
},
function (it) {
var el = document.getElementById("sg-look");
if (!el) {
el = document.createElement("div");
el.id = "sg-look";
el.style.cssText = "position:fixed;z-index:59;left:50%;top:50%;transform:translate(-50%,-50%);width:min(340px,calc(100vw - 30px));background:rgba(10,9,14,.98);border:1px solid #8A7A4A;border-radius:8px;padding:10px;color:var(--bone,#C9BEA8);font:13px var(--sans,system-ui);text-align:center";
el.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("[data-sgx]"))
sgLookClose(); });
document.body.appendChild(el);
}
var r = SG.rowBy && SG.rowBy[it.k];
el.innerHTML = '<div id="sg-look-pic" style="height:240px;display:flex;align-items:center;justify-content:center">' + sgIconHtml(it, 160) + '</div>' +
'<div style="font:500 15px var(--serif,Georgia);color:#F0E0B8;margin:6px 0 2px">' + esc(it.n) + '</div>' +
'<div style="color:var(--dim,#999);font-size:12px">' + esc(SG_DATA.shops[it.s]) + ' · ' + Number(r ? r.price : it.p).toLocaleString() + ' gold' + (it.z ? ' · ' + it.z[0].toFixed(1) + ' × ' + it.z[2].toFixed(1) + ' m, ' + it.z[1].toFixed(1) + ' m high' : '') + '</div>' +
'<div style="margin-top:8px"><button class="btn" data-sgx="1">Close</button></div>';
el.style.display = "block";
if (it.kind === "home")
sgSpin(it, document.getElementById("sg-look-pic"));
},
function (it, box) {
if (typeof renderer === "undefined" || !renderer || !box)
return;
if (SG.spin)
SG.spin.stop = 1;
var W = 240, H = 240, rt = new THREE.WebGLRenderTarget(W, H), sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 1, 0.05, 100);
sc.add(new THREE.HemisphereLight(0xFFF4E0, 0x4A4038, 0.95));
var dl = new THREE.DirectionalLight(0xFFFFFF, 0.7);
dl.position.set(3, 5, 4);
sc.add(dl);
var g = sgMesh(it, { noLift: true });
sc.add(g);
var cv = document.createElement("canvas");
cv.width = W;
cv.height = H;
cv.style.cssText = "width:240px;height:240px";
var cx = cv.getContext("2d"), px = new Uint8Array(W * H * 4), img = cx.createImageData(W, H);
var S = { stop: 0, t: 0 };
SG.spin = S;
function frame() {
if (S.stop || !box.isConnected) {
rt.dispose();
return;
}
var b = new THREE.Box3().setFromObject(g), sz = new THREE.Vector3(), c = new THREE.Vector3();
b.getSize(sz);
b.getCenter(c);
var R = Math.max(sz.x, sz.y, sz.z) * 1.7 + 0.1;
S.t += 0.012;
cam.position.set(c.x + Math.sin(S.t) * R, c.y + R * 0.45, c.z + Math.cos(S.t) * R);
cam.lookAt(c);
var was = renderer.getRenderTarget();
renderer.setRenderTarget(rt);
renderer.setClearColor(0x1A1720, 1);
renderer.clear();
renderer.render(sc, cam);
renderer.readRenderTargetPixels(rt, 0, 0, W, H, px);
renderer.setRenderTarget(was);
for (var y = 0; y < H; y++) {
img.data.set(px.subarray((H - 1 - y) * W * 4, (H - y) * W * 4), y * W * 4);
}
cx.putImageData(img, 0, 0);
if (!cv.parentNode) {
box.innerHTML = "";
box.appendChild(cv);
}
setTimeout(function () { requestAnimationFrame(frame); }, 60);
}
requestAnimationFrame(frame);
},
function (full) {
if (!sgArmsReady() || typeof bkpKept !== "function")
return;
var K = bkpKept(), have = {}, changed = false;
((typeof myThings !== "undefined" && myThings) || []).forEach(function (t) { if (t && SG_ARMS[t.archetype])
have["bw_" + sgArmKey(t.archetype)] = SG.by[t.archetype]; });
if (full)
for (var i = K.length - 1; i >= 0; i--) {
if (/^bw_sg[a-z]+$/.test(K[i].a) && !have[K[i].a]) {
K.splice(i, 1);
changed = true;
}
}
Object.keys(have).forEach(function (a) { if (!K.some(function (q) { return q.a === a; })) {
K.push({ id: a + "_k", a: a, name: have[a].n, from: SG_DATA.shops[have[a].s] });
changed = true;
} });
if (changed)
try {
save();
}
catch (e) { }
},
function (it) {
sgArmsSync();
var key = sgArmKey(it.k), a = "bw_" + key, q = bkpKept().filter(function (x) { return x.a === a; })[0];
if (typeof WLD !== "undefined" && WLD.on === "battle" && typeof bwEquip === "function" && q) {
bwEquip(key);
setStatus("<b>" + esc(it.n) + "</b> in hand.");
return;
}
if (typeof bkpHold === "function")
bkpHold(a, it.n, q ? { keptId: q.id } : {});
},
function (s, cell, cols) {
var goods = (SG.shop[s] || []).filter(function (q) { return q.kind === "home"; });
if (!goods.length)
return null;
var R2 = cell * 2, ren = SG.iconRen;
if (!ren) {
ren = SG.iconRen = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
ren.setPixelRatio(1);
ren.setSize(R2, R2);
ren.setClearColor(0x000000, 0);
}
var sheet = document.createElement("canvas"), rows = Math.ceil(goods.length / cols);
sheet.width = cols * cell;
sheet.height = rows * cell;
var sx = sheet.getContext("2d");
sx.imageSmoothingQuality = "high";
var sc = new THREE.Scene();
sc.add(new THREE.HemisphereLight(0xFFF6E8, 0x5A5048, 0.85));
var dl = new THREE.DirectionalLight(0xFFFFFF, 0.75);
dl.position.set(2, 4, 3);
sc.add(dl);
var cam = new THREE.PerspectiveCamera(28, 1, 0.01, 200), miss = [], hash = 0;
return new Promise(function (done) {
var i = 0;
function next() {
if (i >= goods.length) {
var url = sheet.toDataURL("image/webp", 0.82);
for (var c = 0; c < url.length; c += 97)
hash = (hash * 31 + url.charCodeAt(c)) >>> 0;
return done({ url: url, n: goods.length, name: SG_DATA.shops[s], miss: miss.length, missed: miss.slice(0, 6), v: hash.toString(36) });
}
var it = goods[i], n = i++, fin = false;
var g = sgMesh(it, { noLift: true, onload: function () { if (!fin) {
fin = true;
setTimeout(shoot, 0);
} } });
sc.add(g);
if (it.t) {
fin = true;
setTimeout(shoot, 0);
}
else
setTimeout(function () { if (!fin) {
fin = true;
miss.push(it.k);
shoot();
} }, 8000);
function shoot() {
var b = new THREE.Box3().setFromObject(g), sz = new THREE.Vector3(), c = new THREE.Vector3();
b.getSize(sz);
b.getCenter(c);
var az = it.a === "wall" ? 0.18 : 0.62, el = it.t === "rug" ? 0.95 : it.a === "wall" ? 0.12 : 0.42;
var rad = Math.max(0.05, sz.length() / 2), d = rad / Math.sin(cam.fov * Math.PI / 360) * 1.02;
cam.position.set(c.x + Math.sin(az) * Math.cos(el) * d, c.y + Math.sin(el) * d, c.z + Math.cos(az) * Math.cos(el) * d);
cam.near = d / 50;
cam.far = d * 4;
cam.updateProjectionMatrix();
cam.lookAt(c);
ren.render(sc, cam);
sx.drawImage(ren.domElement, 0, 0, R2, R2, (n % cols) * cell, Math.floor(n / cols) * cell, cell, cell);
sc.remove(g);
setTimeout(next, 0);
}
}
next();
});
}
];
});
