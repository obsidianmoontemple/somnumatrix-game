/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(532, function () {
"use strict";
return [
function () {
return ghTexOf("gilt", function (x, W, H, r) {
var g = x.createLinearGradient(0, 0, W, H);
g.addColorStop(0, "#E9C66A");
g.addColorStop(0.35, "#C99A3A");
g.addColorStop(0.55, "#F2D88C");
g.addColorStop(0.8, "#B8862E");
g.addColorStop(1, "#E0B85A");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var i = 0; i < 160; i++) {
x.fillStyle = "rgba(" + (r() < 0.5 ? "255,236,170" : "140,96,30") + "," + (0.05 + r() * 0.1).toFixed(2) + ")";
x.fillRect(r() * W, r() * H, 20 + r() * 70, 20 + r() * 70);
}
ghSpeck(x, W, H, r, 2500, ["255,244,200", "120,80,20"], 0.05, 0.2, 1, 3);
}, 256);
},
function () {
return ghTexOf("panel", function (x, W, H, r) {
x.fillStyle = "#EFE4CC";
x.fillRect(0, 0, W, H);
ghSpeck(x, W, H, r, 3000, ["255,250,235", "200,186,160"], 0.05, 0.14, 1, 3);
function frame(a, b, c, d, lw, col) { x.strokeStyle = col; x.lineWidth = lw; x.strokeRect(a, b, c, d); }
frame(28, 40, W - 56, H * 0.58, 10, "#C89A3E");
frame(40, 52, W - 80, H * 0.58 - 24, 3, "#E8C870");
frame(28, H * 0.70, W - 56, H * 0.24, 10, "#C89A3E");
frame(40, H * 0.70 + 12, W - 80, H * 0.24 - 24, 3, "#E8C870");
x.strokeStyle = "#D4A84A";
x.lineWidth = 6;
x.beginPath();
x.arc(W / 2, H * 0.3, W * 0.14, 0, 7);
x.stroke();
x.lineWidth = 3;
for (var i = 0; i < 18; i++) {
var a = i / 18 * Math.PI * 2;
x.beginPath();
x.ellipse(W / 2 + Math.cos(a) * W * 0.14, H * 0.3 + Math.sin(a) * W * 0.14, 9, 4, a + 0.8, 0, 7);
x.stroke();
}
var sh = x.createLinearGradient(0, 0, W, 0);
sh.addColorStop(0, "rgba(120,90,40,.18)");
sh.addColorStop(0.5, "rgba(0,0,0,0)");
sh.addColorStop(1, "rgba(120,90,40,.18)");
x.fillStyle = sh;
x.fillRect(0, 0, W, H);
}, 256, 512);
},
function () {
return ghTexOf("damask", function (x, W, H, r) {
x.fillStyle = "#7A1420";
x.fillRect(0, 0, W, H);
ghSpeck(x, W, H, r, 2500, ["150,40,50", "60,8,14"], 0.1, 0.25, 1, 2);
x.fillStyle = "rgba(214,170,80,.55)";
for (var j = 0; j < 2; j++)
for (var i = 0; i < 2; i++) {
var cx = W * (0.25 + i * 0.5) + (j % 2) * W * 0.25, cy = H * (0.25 + j * 0.5);
x.save();
x.translate(cx, cy);
for (var k = 0; k < 4; k++) {
x.rotate(Math.PI / 2);
x.beginPath();
x.moveTo(0, 0);
x.bezierCurveTo(18, -20, 40, -8, 30, 22);
x.bezierCurveTo(20, 10, 8, 8, 0, 0);
x.fill();
}
x.beginPath();
x.ellipse(0, 0, 8, 26, 0, 0, 7);
x.fill();
x.beginPath();
x.ellipse(0, 0, 26, 8, 0, 0, 7);
x.fill();
x.restore();
}
}, 256);
},
function () {
return ghTexOf("parquet", function (x, W, H, r) {
x.fillStyle = "#8A5A2E";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 16; i++) {
var y0 = i * W / 16;
for (var k = 0; k < W; k += 3) {
x.fillStyle = "rgba(" + (r() < 0.5 ? "170,110,60" : "90,52,24") + ",0.18)";
x.fillRect(k, y0 + r() * W / 16, 3, 1 + r() * 2);
}
}
x.save();
x.translate(W / 2, H / 2);
x.rotate(Math.PI / 4);
for (var a = -W; a < W; a += W / 8) {
x.fillStyle = ((a / (W / 8)) | 0) % 2 ? "rgba(60,30,10,.16)" : "rgba(220,160,90,.10)";
x.fillRect(a, -W, W / 16, 2 * W);
}
x.restore();
x.strokeStyle = "rgba(40,20,6,.75)";
x.lineWidth = 3;
x.strokeRect(2, 2, W - 4, H - 4);
x.beginPath();
x.moveTo(0, 0);
x.lineTo(W, H);
x.moveTo(W, 0);
x.lineTo(0, H);
x.stroke();
x.lineWidth = 2;
x.strokeRect(W * 0.25, H * 0.25, W * 0.5, H * 0.5);
var g = x.createRadialGradient(W * 0.3, H * 0.3, 10, W * 0.3, H * 0.3, W * 0.7);
g.addColorStop(0, "rgba(255,220,170,.14)");
g.addColorStop(1, "rgba(0,0,0,0)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
}, 512);
},
function () {
return ghTexOf("checker", function (x, W, H, r) {
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++) {
var blk = (i + j) % 2;
x.fillStyle = blk ? "#1C1A1C" : "#EAE6DE";
x.fillRect(i * W / 2, j * H / 2, W / 2, H / 2);
for (var v = 0; v < 5; v++) {
x.strokeStyle = blk ? "rgba(190,180,170,.25)" : "rgba(120,116,120,.35)";
x.lineWidth = 0.6 + r() * 1.6;
x.beginPath();
var px = i * W / 2 + r() * W / 2, py = j * H / 2;
x.moveTo(px, py);
for (var s = 0; s < 8; s++) {
px += (r() - 0.5) * 40;
py += H / 16;
x.lineTo(px, py);
}
x.stroke();
}
}
x.strokeStyle = "rgba(90,80,70,.6)";
x.lineWidth = 2;
x.strokeRect(0, 0, W / 2, H / 2);
x.strokeRect(W / 2, H / 2, W / 2, H / 2);
}, 512);
},
function () {
return ghTexOf("coffer", function (x, W, H, r) {
x.fillStyle = "#E8DCC0";
x.fillRect(0, 0, W, H);
var g = x.createLinearGradient(0, 0, W, H);
g.addColorStop(0, "#B8862E");
g.addColorStop(0.5, "#E8C66A");
g.addColorStop(1, "#A87A28");
x.fillStyle = g;
x.fillRect(W * 0.12, H * 0.12, W * 0.76, H * 0.76);
x.fillStyle = "#5A1A20";
x.fillRect(W * 0.2, H * 0.2, W * 0.6, H * 0.6);
x.fillStyle = "#F2D27A";
x.beginPath();
x.arc(W / 2, H / 2, W * 0.13, 0, 7);
x.fill();
x.fillStyle = "#C89A3E";
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2;
x.beginPath();
x.ellipse(W / 2 + Math.cos(a) * W * 0.17, H / 2 + Math.sin(a) * W * 0.17, W * 0.045, W * 0.02, a, 0, 7);
x.fill();
}
x.strokeStyle = "#F6E2A0";
x.lineWidth = 4;
x.strokeRect(W * 0.12, H * 0.12, W * 0.76, H * 0.76);
}, 256);
},
function () {
return ghTexOf("dome", function (x, W, H, r) {
var g = x.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, W / 2);
g.addColorStop(0, "#F8E8C8");
g.addColorStop(0.55, "#8AB0D8");
g.addColorStop(0.8, "#5A80B8");
g.addColorStop(0.84, "#E8C060");
g.addColorStop(0.9, "#B8862E");
g.addColorStop(1, "#5A1A20");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var i = 0; i < 60; i++) {
var a = r() * Math.PI * 2, d = W * (0.12 + r() * 0.26);
x.fillStyle = "rgba(255,250,240," + (0.2 + r() * 0.35).toFixed(2) + ")";
x.beginPath();
x.ellipse(W / 2 + Math.cos(a) * d, H / 2 + Math.sin(a) * d, 16 + r() * 30, 8 + r() * 14, a, 0, 7);
x.fill();
}
var cols = ["#C83A3A", "#3A6AC8", "#E8B83A", "#7A3AA8", "#3A9A6A", "#E87AA0"];
for (var k = 0; k < 14; k++) {
var a2 = k / 14 * Math.PI * 2, d2 = W * 0.3;
x.save();
x.translate(W / 2 + Math.cos(a2) * d2, H / 2 + Math.sin(a2) * d2);
x.rotate(a2 + Math.PI / 2);
x.fillStyle = cols[k % 6];
x.beginPath();
x.ellipse(0, 6, 7, 16, 0.3, 0, 7);
x.fill();
x.fillStyle = "#F0D0B0";
x.beginPath();
x.arc(0, -12, 5, 0, 7);
x.fill();
x.restore();
}
x.strokeStyle = "#F2D27A";
x.lineWidth = 5;
for (var s = 0; s < 24; s++) {
var a3 = s / 24 * Math.PI * 2;
x.beginPath();
x.moveTo(W / 2 + Math.cos(a3) * W * 0.42, H / 2 + Math.sin(a3) * W * 0.42);
x.lineTo(W / 2 + Math.cos(a3) * W * 0.5, H / 2 + Math.sin(a3) * W * 0.5);
x.stroke();
}
}, 512, 512, true);
},
function () {
return ghTexOf("curtain", function (x, W, H, r) {
for (var i = 0; i < W; i++) {
var f = 0.5 + 0.5 * Math.sin(i / W * Math.PI * 2 * 6) + 0.15 * Math.sin(i / W * Math.PI * 2 * 17);
var c = Math.round(70 + f * 80);
x.fillStyle = "rgb(" + c + "," + Math.round(c * 0.12) + "," + Math.round(c * 0.16) + ")";
x.fillRect(i, 0, 1, H);
}
x.fillStyle = "#D8A848";
x.fillRect(0, H - 34, W, 10);
for (var k = 0; k < W; k += 6) {
x.fillStyle = k % 12 ? "#C8963A" : "#E8C060";
x.fillRect(k, H - 24, 3, 24);
}
}, 512, 512);
},
function () {
return ghTexOf("backdrop", function (x, W, H, r) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#0E1838");
g.addColorStop(0.6, "#3A4A7A");
g.addColorStop(1, "#1A2A2A");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
ghSpeck(x, W, H * 0.5, r, 300, ["255,250,230"], 0.4, 0.9, 1, 2.5);
x.fillStyle = "#F4ECD0";
x.beginPath();
x.arc(W * 0.72, H * 0.2, 30, 0, 7);
x.fill();
x.fillStyle = "#1A2A24";
for (var i = 0; i < 14; i++) {
var tx = r() * W;
x.beginPath();
x.ellipse(tx, H * 0.62, 40 + r() * 50, 90 + r() * 60, 0, 0, 7);
x.fill();
}
var hs = x.createLinearGradient(W * 0.08, 0, W * 0.28, 0);
hs.addColorStop(0, "#4A5270");
hs.addColorStop(0.7, "#7A82A0");
hs.addColorStop(1, "#5A6280");
x.fillStyle = hs;
x.fillRect(W * 0.08, H * 0.3, W * 0.2, H * 0.56);
x.strokeStyle = "rgba(30,36,56,.5)";
x.lineWidth = 1;
for (var sy = H * 0.3; sy < H * 0.86; sy += 10) {
x.beginPath();
x.moveTo(W * 0.08, sy);
x.lineTo(W * 0.28, sy);
x.stroke();
}
var wg = x.createRadialGradient(W * 0.18, H * 0.42, 4, W * 0.18, H * 0.42, 70);
wg.addColorStop(0, "rgba(255,200,110,.55)");
wg.addColorStop(1, "rgba(255,200,110,0)");
x.fillStyle = wg;
x.fillRect(W * 0.08, H * 0.3, W * 0.2, H * 0.3);
x.fillStyle = "#FFC870";
x.beginPath();
x.moveTo(W * 0.155, H * 0.5);
x.lineTo(W * 0.155, H * 0.38);
x.arc(W * 0.18, H * 0.38, W * 0.025, Math.PI, 0);
x.lineTo(W * 0.205, H * 0.5);
x.fill();
x.fillStyle = "#3A2A1A";
x.fillRect(W * 0.179, H * 0.36, 2, H * 0.14);
x.fillRect(W * 0.155, H * 0.43, W * 0.05, 2);
x.fillStyle = "#8A90A8";
x.fillRect(W * 0.12, H * 0.5, W * 0.12, 8);
for (var b = 0; b < 10; b++)
x.fillRect(W * 0.124 + b * W * 0.0125, H * 0.47, 3, H * 0.03);
x.fillRect(W * 0.12, H * 0.465, W * 0.12, 4);
x.fillStyle = "#1E3A22";
for (var iv = 0; iv < 260; iv++) {
var ix = W * 0.08 + r() * W * 0.06 * (iv % 2 ? 1 : 0.6) + (iv % 3 === 0 ? W * 0.15 : 0), iy = H * 0.86 - r() * H * 0.5 * r();
x.beginPath();
x.ellipse(ix, iy, 3 + r() * 4, 2 + r() * 3, r() * 3, 0, 7);
x.fill();
}
x.fillStyle = "#A8AEC4";
for (var c = 0; c < 6; c++)
x.fillRect(W * 0.5 + c * W * 0.05, H * 0.42, 10, H * 0.4);
x.beginPath();
x.moveTo(W * 0.48, H * 0.42);
x.lineTo(W * 0.79, H * 0.42);
x.lineTo(W * 0.635, H * 0.32);
x.fill();
x.fillStyle = "#2A3A2A";
x.fillRect(0, H * 0.86, W, H * 0.14);
ghSpeck(x, W, H, r, 400, ["220,90,120", "250,230,240"], 0.5, 0.9, 2, 4);
}, 1024, 512, true);
},
function () {
return ghTexOf("hedge", function (x, W, H, r) {
x.fillStyle = "#14301A";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 5200; i++) {
var px = r() * W, py = r() * H, s = 2 + r() * 5, l = r();
x.fillStyle = "rgb(" + Math.round(20 + l * 50) + "," + Math.round(50 + l * 70) + "," + Math.round(22 + l * 30) + ")";
x.beginPath();
x.ellipse(px, py, s, s * 0.45, r() * 3, 0, 7);
x.fill();
}
ghSpeck(x, W, H, r, 600, ["4,14,6"], 0.5, 0.9, 2, 5);
}, 256);
},
function () {
return ghTexOf("grass", function (x, W, H, r) {
x.fillStyle = "#2A4A22";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 7000; i++) {
var l = r();
x.strokeStyle = "rgba(" + Math.round(30 + l * 60) + "," + Math.round(70 + l * 80) + "," + Math.round(24 + l * 30) + ",0.7)";
x.lineWidth = 1;
var px = r() * W, py = r() * H;
x.beginPath();
x.moveTo(px, py);
x.lineTo(px + (r() - 0.5) * 3, py - 3 - r() * 5);
x.stroke();
}
ghSpeck(x, W, H, r, 90, ["250,250,240", "250,220,240", "240,220,120"], 0.5, 0.8, 1.5, 2.5);
}, 256);
},
function () {
return ghTexOf("gravel", function (x, W, H, r) {
x.fillStyle = "#B8AC94";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 3200; i++) {
var l = r();
x.fillStyle = "rgb(" + Math.round(150 + l * 80) + "," + Math.round(140 + l * 72) + "," + Math.round(120 + l * 64) + ")";
x.beginPath();
x.ellipse(r() * W, r() * H, 1.5 + r() * 2.5, 1 + r() * 2, r() * 3, 0, 7);
x.fill();
}
ghSpeck(x, W, H, r, 800, ["90,80,64"], 0.3, 0.6, 1, 2);
}, 256);
},
function () {
return ghTexOf("stone", function (x, W, H, r) {
x.fillStyle = "#E6DCC6";
x.fillRect(0, 0, W, H);
ghSpeck(x, W, H, r, 3000, ["250,244,230", "190,178,156"], 0.08, 0.2, 1, 3);
x.strokeStyle = "rgba(150,136,110,.55)";
x.lineWidth = 2;
for (var y = 0; y <= H; y += H / 4) {
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
var off = (y / (H / 4)) % 2 ? W / 4 : 0;
for (var xx = off; xx < W; xx += W / 2) {
x.beginPath();
x.moveTo(xx, y);
x.lineTo(xx, y + H / 4);
x.stroke();
}
}
}, 256);
},
function () {
return ghTexOf("wing", function (x, W, H, r) {
x.clearRect(0, 0, W, H);
var g = x.createLinearGradient(0, 0, W, H);
g.addColorStop(0, "rgba(200,240,255,.85)");
g.addColorStop(0.5, "rgba(255,210,250,.6)");
g.addColorStop(1, "rgba(255,240,200,.3)");
x.fillStyle = g;
x.beginPath();
x.moveTo(4, H / 2);
x.bezierCurveTo(W * 0.3, -H * 0.1, W * 1.05, H * 0.05, W * 0.96, H * 0.45);
x.bezierCurveTo(W * 0.9, H * 0.8, W * 0.3, H * 0.9, 4, H / 2);
x.fill();
x.strokeStyle = "rgba(255,255,255,.75)";
x.lineWidth = 1.5;
for (var i = 0; i < 6; i++) {
x.beginPath();
x.moveTo(6, H / 2);
x.quadraticCurveTo(W * 0.4, H * (0.2 + i * 0.1), W * (0.75 + r() * 0.2), H * (0.15 + i * 0.12));
x.stroke();
}
}, 128, 64, true);
},
function (key, col, map, o) {
o = o || {};
return ghMat(key, function () {
var m = new THREE.MeshLambertMaterial({ color: col, map: map || null });
if (o.e !== undefined)
m.emissive = new THREE.Color(o.e);
if (o.ds)
m.side = THREE.DoubleSide;
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.shine)
GH.gilt.push({ m: m, r: o.shine });
return m;
});
},
function () {
return ghTexOf("mirror", function (x, W, H) {
var g = x.createLinearGradient(0, 0, W, H);
g.addColorStop(0, "#5A5248");
g.addColorStop(0.45, "#8A7E6C");
g.addColorStop(0.55, "#A89A82");
g.addColorStop(1, "#4A4238");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
var b = x.createRadialGradient(W * 0.5, H * 0.3, 4, W * 0.5, H * 0.3, W * 0.7);
b.addColorStop(0, "rgba(255,230,170,.45)");
b.addColorStop(1, "rgba(255,220,150,0)");
x.fillStyle = b;
x.fillRect(0, 0, W, H);
for (var i = 0; i < 26; i++) {
var cx = (i * 37 % W), cy = H * 0.18 + (i * 53 % (H * 0.35)), r = 2 + (i % 3);
var c = x.createRadialGradient(cx, cy, 0, cx, cy, r * 3);
c.addColorStop(0, "rgba(255,245,210,.95)");
c.addColorStop(1, "rgba(255,220,150,0)");
x.fillStyle = c;
x.fillRect(cx - r * 3, cy - r * 3, r * 6, r * 6);
}
x.fillStyle = "rgba(40,30,20,.18)";
for (var j = 0; j < 60; j++)
x.fillRect((j * 71) % W, (j * 29) % H, 2 + (j % 4), 1 + (j % 2));
}, 128, 256, true);
},
function (G, w, h, d, mat, x, y, z, u, ry) {
var g = new THREE.BoxGeometry(w, h, d);
if (u) {
var uv = g.attributes.uv, dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
for (var f = 0; f < 6; f++)
for (var k = 0; k < 4; k++) {
var i = f * 4 + k;
uv.setXY(i, uv.getX(i) * dims[f][0] / u, uv.getY(i) * dims[f][1] / u);
}
}
var m = wMesh(g, mat, x, y, z, G);
if (ry)
m.rotation.y = ry;
return m;
},
function (G, x0, x1, z0, z1, h, mat, gaps, u, v, noSolid) {
gaps = gaps || [];
var t = 0.3;
function side(s, a0, a1, fixed, alongX) {
var cuts = gaps.filter(function (g) { return g.s === s; }).map(function (g) { return [g.c - g.w / 2, g.c + g.w / 2, g.h || 3, g.y0 || 0]; }).sort(function (a, b) { return a[0] - b[0]; });
var at = a0;
function seg(p0, p1, y0, y1) {
var L = p1 - p0, mid = (p0 + p1) / 2, hh = y1 - y0;
if (L < 0.05 || hh < 0.05)
return;
var m = alongX ? ghPlane(G, L, hh, u || 3, v || h, mat, mid, y0 + hh / 2, fixed + (s === "n" ? t / 2 : -t / 2), s === "n" ? 0 : Math.PI) : ghPlane(G, L, hh, u || 3, v || h, mat, fixed + (s === "w" ? t / 2 : -t / 2), y0 + hh / 2, mid, s === "w" ? Math.PI / 2 : -Math.PI / 2);
return m;
}
cuts.forEach(function (c) {
if (c[0] > at) {
seg(at, c[0], 0, h);
if (!noSolid) {
var L = c[0] - at, mid = (at + c[0]) / 2;
if (alongX)
ppSolid(mid, fixed, L / 2, t / 2);
else
ppSolid(fixed, mid, t / 2, L / 2);
}
}
seg(c[0], c[1], c[2], h);
if (c[3] > 0) {
seg(c[0], c[1], 0, c[3]);
if (!noSolid) {
var Lc = c[1] - c[0], mc = (c[0] + c[1]) / 2;
if (alongX)
ppSolid(mc, fixed, Lc / 2, t / 2, 0, c[3]);
else
ppSolid(fixed, mc, t / 2, Lc / 2, 0, c[3]);
}
}
at = Math.max(at, c[1]);
});
if (at < a1) {
seg(at, a1, 0, h);
if (!noSolid) {
var L2 = a1 - at, m2 = (at + a1) / 2;
if (alongX)
ppSolid(m2, fixed, L2 / 2, t / 2);
else
ppSolid(fixed, m2, t / 2, L2 / 2);
}
}
}
side("n", x0, x1, z0, true);
side("s", x0, x1, z1, true);
side("w", z0, z1, x0, false);
side("e", z0, z1, x1, false);
},
function (G, x, z, alongX, w, h) {
var g = ghGold(), d = 0.5;
if (alongX) {
ghBox(G, 0.35, h, d, g, x - w / 2 - 0.17, h / 2, z);
ghBox(G, 0.35, h, d, g, x + w / 2 + 0.17, h / 2, z);
ghBox(G, w + 1, 0.5, d, g, x, h + 0.25, z);
ghSph0(G, 0.35, g, x, h + 0.75, z);
}
else {
ghBox(G, d, h, 0.35, g, x, h / 2, z - w / 2 - 0.17);
ghBox(G, d, h, 0.35, g, x, h / 2, z + w / 2 + 0.17);
ghBox(G, d, 0.5, w + 1, g, x, h + 0.25, z);
ghSph0(G, 0.35, g, x, h + 0.75, z);
}
},
function (seed, i, o) {
o = o || {};
var gown = (i % 2 === 0);
var look = gown ? { sex: "f", topKind: "dress", bottomKind: "skirt", layer: "none", top: GH_GOWNS[i % GH_GOWNS.length], bottom: GH_GOWNS[i % GH_GOWNS.length] }
: { sex: "m", layer: "suit", layerColor: [0x101014, 0x14182A, 0x1A1010, 0xF0ECE0][i % 4], top: 0xF4F0E8, bottom: 0x101014 };
Object.keys(o.look || {}).forEach(function (k) { look[k] = o.look[k]; });
return wPerson("gh_" + seed, { title: o.title, place: PP_KEYS.hall, look: look, sex: look.sex });
},
function () {
return ghTexOf("win", function (x, W, H, r) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#FFE6A8");
g.addColorStop(0.5, "#F0B860");
g.addColorStop(1, "#C8803A");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
var c = x.createRadialGradient(W / 2, H * 0.3, 2, W / 2, H * 0.3, W * 0.4);
c.addColorStop(0, "rgba(255,255,240,.95)");
c.addColorStop(1, "rgba(255,240,200,0)");
x.fillStyle = c;
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(90,50,20,.55)";
x.fillRect(W / 2 - 2, 0, 4, H);
for (var y = H / 5; y < H; y += H / 5)
x.fillRect(0, y, W, 3);
x.strokeStyle = "#5A3A18";
x.lineWidth = 6;
x.strokeRect(0, 0, W, H);
}, 64, 128, true);
},
function (G, x, y, z, s, ry) {
var g = ghGold(), S = new THREE.Group();
S.position.set(x, y, z);
S.rotation.y = ry || 0;
S.scale.setScalar(s);
G.add(S);
wCyl(0.32, 0.55, 1.6, g, 0, 0.8, 0, S, 10);
wCyl(0.22, 0.3, 0.7, g, 0, 1.9, 0, S, 10);
wSph(0.2, g, 0, 2.45, 0, S, 10);
var a = wCyl(0.07, 0.08, 0.9, g, 0.3, 2.6, 0, S, 6);
a.rotation.z = -0.5;
wMesh(new THREE.TorusGeometry(0.22, 0.04, 6, 16), g, 0.55, 3.1, 0, S);
[-1, 1].forEach(function (sd) { var w = wMesh(new THREE.ConeGeometry(0.35, 1.6, 4), g, sd * 0.25, 2.3, -0.25, S); w.rotation.z = sd * 0.5; w.rotation.x = -0.3; });
return S;
},
function (G, L, x, z, h) {
var br = ghLam("bronze", 0x4A3A22, null, { e: 0x0A0602 }), g = ghGold();
wCyl(0.35, 0.45, 0.6, br, x, 0.3, z, G, 10);
wCyl(0.1, 0.16, h, br, x, h / 2, z, G, 8);
wSph(0.16, g, x, h * 0.55, z, G, 8);
for (var k = 0; k < 5; k++) {
var a = k / 5 * Math.PI * 2, ox = k === 4 ? 0 : Math.cos(a) * 0.7, oz = k === 4 ? 0 : Math.sin(a) * 0.7, oy = k === 4 ? h + 0.55 : h + 0.1;
if (k < 4) {
var arm = wCyl(0.04, 0.04, 0.75, br, x + ox / 2, h, z + oz / 2, G, 5);
arm.rotation.z = Math.PI / 2;
arm.rotation.y = -a;
}
wSph(0.24, ghBasic("globe", 0xFFE8B8), x + ox, oy, z + oz, G, 10);
if (!GH.lite || k === 4) {
var gl = wGlow(0xFFD890, 1.8, 0.35);
gl.position.set(x + ox, oy, z + oz);
L.add(gl);
}
}
ppSolidR(x, z, 0.45);
},
function (G, x, z, s, seed, bulbs) {
var bark = ghLam("bark", 0x4A3A2A, null), rnd = ppRand(seed);
wCyl(0.22 * s, 0.32 * s, 3.2 * s, bark, x, 1.6 * s, z, G, 8);
var cols = [0x2E5A2A, 0x386A30, 0x2A5226, 0x40722E];
for (var c = 0; c < (GH.lite ? 4 : 9); c++) {
var a = rnd() * 6.28, d = rnd() * 1.4 * s, y = 3.4 * s + rnd() * 2.2 * s, r = (1.1 + rnd() * 0.8) * s;
var m = wMesh(ghLeafGeo(seed + c, r), ghLam("leaf" + (c % 4), cols[c % 4], null), x + Math.cos(a) * d, y, z + Math.sin(a) * d, G);
}
if (bulbs) {
for (var b = 0; b < (GH.lite ? 18 : 46); b++) {
var t = b / (GH.lite ? 18 : 46), a2 = t * Math.PI * 9, rr = (1.9 - t * 0.9) * s;
bulbs.push([x + Math.cos(a2) * rr, 3.2 * s + t * 3.6 * s, z + Math.sin(a2) * rr]);
}
}
ppSolidR(x, z, 0.4 * s);
},
function (G, L) {
GH.lite = ghLite();
GH.bulbs = [];
GH.people = [];
GH.players = [];
var stone = ghLam("stone", 0xFFFFFF, GH_TEX.stone()), gold = ghGold(), dark = ghLam("hdark", 0x2A2018, null), win = ghBasic("win", 0xFFFFFF, { map: ghWinTex() }), red = ghLam("carpet", 0x8A1420, GH_TEX.velvet());
var copper = ghLam("copper", 0x4E8A6E, null, { e: 0x0A1810 });
for (var i = -12; i <= 12; i++) {
if (Math.abs(i) < 3)
continue;
ppCyl(0.07, 0.07, 5, gold, i * 0.8, 2.5, -270, G, 6);
ppSph(0.14, gold, i * 0.8, 5.1, -270, G, 6);
}
ppBox(20, 0.3, 0.3, gold, 0, 4.7, -270, G);
ppSolid(-6, -270, 4, 0.2);
ppSolid(6, -270, 4, 0.2);
[-2.4, 2.4].forEach(function (x) { ghBox(G, 0.8, 6, 0.8, stone, x, 3, -270, 1); ppSolid(x, -270, 0.4, 0.4); ppSph(0.45, gold, x, 6.4, -270, G, 12); });
ppSign(G, ["THE GILDED HALL", "Opera · Ballroom · Banquet · The Fairy Garden"], 6.4, 1.4, 0, 6.5, -269.75, 0, "#1A1208", "#F2D08A");
if (PP.aupPave)
PP.aupPave.push({ x0: -36, x1: 36, z0: -294, z1: -268.5 });
ghPlane(G, 70, 23, 14, 4.6, ghLam("flags", 0xD8D0C4, GH_TEX.stone()), 0, 0.025, -280.6, 0, -Math.PI / 2);
ghPlane(G, 3.6, 18, 1.8, 1.8, red, 0, 0.045, -279, 0, -Math.PI / 2);
for (var sz = -272; sz >= -286; sz -= 3.5)
[-2.2, 2.2].forEach(function (sx) { wCyl(0.05, 0.08, 1, gold, sx, 0.5, sz, G, 6); wSph(0.09, gold, sx, 1.02, sz, G, 6); });
[-2.2, 2.2].forEach(function (sx) { ghBox(G, 0.05, 0.05, 14, ghLam("rope", 0xB0182A, null), sx, 0.85, -279); ppSolid(sx, -279, 0.08, 7); });
ghBox(G, 64, 15, 40, stone, 0, 7.5, -312, 4);
ppSolid(0, -312, 32, 20);
ghBox(G, 64.4, 0.6, 0.8, stone, 0, 5.7, -291.8, 2);
for (var a = 0; a < 7; a++) {
var ax = -24 + a * 8;
var ar = wMesh(ghArchGeo(4.6, 5.2), a === 3 ? dark : win, ax, 0, -291.85, G);
if (a !== 3) {
ghBox(G, 4.6, 0.12, 0.4, gold, ax, 1.1, -291.7);
}
ghBox(G, 0.5, 0.6, 0.5, gold, ax, 5.15, -291.6);
}
ghBox(G, 1.9, 4.2, 0.15, ghLam("bronzed", 0x5A3A1E, null, { e: 0x120804 }), -1, 2.1, -291.75);
ghBox(G, 1.9, 4.2, 0.15, ghLam("bronzed", 0x5A3A1E, null, { e: 0x120804 }), 1, 2.1, -291.75);
for (var st = 0; st < 6; st++)
[-1, 1].forEach(function (dx) { wSph(0.06, gold, dx * (0.6 + (st % 2) * 0.6), 0.8 + st * 0.6, -291.6, G, 6); });
for (var p = 0; p < 8; p++) {
var px = -28 + p * 8;
[-0.75, 0.75].forEach(function (o) { ghColumn(G, px + o, -290.8, 8.2, 0.38, stone, 6); });
if (p < 7) {
var wx = px + 4;
ghPlane(G, 2.6, 4.4, 2.6, 4.4, win, wx, 9.6, -291.84);
ghBox(G, 3.2, 0.3, 0.4, gold, wx, 12, -291.6);
ghBox(G, 3.2, 0.3, 0.4, stone, wx, 7.3, -291.6);
var oc = wMesh(new THREE.CircleGeometry(0.75, 20), win, wx, 13.3, -291.84, G);
wMesh(new THREE.TorusGeometry(0.85, 0.12, 6, 20), gold, wx, 13.3, -291.7, G);
}
}
ghBox(G, 65, 0.9, 1.6, stone, 0, 14.7, -291.6, 2);
ghBox(G, 65, 0.35, 1.7, gold, 0, 15.3, -291.55);
ghBox(G, 64, 2.6, 1.2, stone, 0, 16.8, -292, 2);
ppSign(G, ["THE GILDED HALL"], 18, 1.6, 0, 16.9, -291.35, 0, "#2A1E10", "#F2D08A");
[-30, 30].forEach(function (ex) {
ghBox(G, 8, 19, 3, stone, ex, 9.5, -292.5, 4);
ghBox(G, 8.4, 0.5, 3.4, gold, ex, 19.2, -292.5);
ghPlane(G, 2.4, 6, 2.4, 6, win, ex, 8, -290.98);
ghBox(G, 3, 0.4, 0.6, gold, ex, 11.2, -290.9);
ghStatue(G, ex, 19.4, -292.5, 1.5, 0);
ppSolid(ex, -292.5, 4, 1.5);
});
for (var bx = -25; bx <= 25; bx += 1.0)
wCyl(0.12, 0.12, 0.9, stone, bx, 18.6, -292.3, G, 6);
ghBox(G, 52, 0.25, 0.5, stone, 0, 19.1, -292.3);
[-20, -10, 10, 20].forEach(function (sx) { ghStatue(G, sx, 18.2, -292.6, 0.9, 0); });
var dome = wMesh(new THREE.SphereGeometry(13, GH.lite ? 16 : 28, 12, 0, Math.PI * 2, 0, Math.PI / 2), copper, 0, 15, -318, G);
dome.scale.y = 0.62;
wCyl(13.2, 13.2, 1.6, stone, 0, 15.6, -318, G, GH.lite ? 16 : 28);
for (var rb = 0; rb < 16; rb++) {
var ra = rb / 16 * Math.PI * 2, rib = wMesh(new THREE.TorusGeometry(13.05, 0.14, 4, 24, Math.PI / 2), gold, 0, 15, -318, G);
rib.scale.y = 0.62;
rib.rotation.y = ra;
}
wCyl(2, 2.4, 2.6, stone, 0, 24.2, -318, G, 12);
wMesh(new THREE.SphereGeometry(2.1, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), gold, 0, 25.5, -318, G);
ghStatue(G, 0, 27.3, -318, 1.4, 0);
var lyre = wMesh(new THREE.TorusGeometry(0.5, 0.08, 6, 16, Math.PI * 1.3), gold, 0, 31.2, -317.7, G);
lyre.rotation.z = Math.PI * 0.85;
[-6, 6].forEach(function (lx) { ghLantern(G, L, lx, -275, 4); ghLantern(G, L, lx, -286, 4); });
var bulbs = [];
[[-18, -280], [18, -280]].forEach(function (q, i) { ghLimeTree(G, q[0], q[1], 1.25, ppHash("ghlime" + i), bulbs); ghBox(G, 4.4, 0.5, 4.4, stone, q[0], 0.25, q[1], 2); });
[[-10, -288], [10, -288], [-26, -288], [26, -288]].forEach(function (q) { wCyl(0.7, 0.55, 0.9, gold, q[0], 0.45, q[1], G, 12); var cone = wMesh(new THREE.ConeGeometry(0.9, 2.8, GH.lite ? 8 : 12), ghLam("topiary", 0x5A9A4E, GH_TEX.hedge(), { e: 0x0C1A08 }), q[0], 2.3, q[1], G); ppSolidR(q[0], q[1], 0.75); });
ghBulbs(L, bulbs, "out");
[[-287.6, 0.15, 34], [-288.9, 0.3, 32], [-290.2, 0.45, 30]].forEach(function (q) { var zc = (-291.8 + q[0]) / 2; ghBox(G, q[2], q[1], q[0] + 291.8, stone, 0, q[1] / 2, zc, 2); ppPad(-q[2] / 2, q[2] / 2, -291.8, q[0], q[1]); });
ppSpot({ x: 0, z: -288.6, r: 2.6, name: "The Gilded Hall: go in (the opera, the ballroom, the banquet and the fairy garden)", fn: function () { ppGoIn("hall"); } });
PP.staffAt.push({ title: "Gilded Hall steward", place: PP_KEYS.hall, x: 3.4, z: -288.4, ry: Math.PI, seed: "hallsteward" });
},
function (G, pts, zone, col) {
if (!pts.length)
return null;
var im = new THREE.InstancedMesh(new THREE.SphereGeometry(0.06, 5, 3), new THREE.MeshBasicMaterial({ color: 0xFFFFFF, fog: false }), pts.length), m = new THREE.Matrix4(), c = new THREE.Color(col || 0xFFD89A);
pts.forEach(function (p, i) { m.makeTranslation(p[0], p[1], p[2]); im.setMatrixAt(i, m); im.setColorAt(i, c); });
im.userData.noCull = true;
im.frustumCulled = false;
G.add(ppKeep(im));
var B = { m: im, n: pts.length, col: c.clone(), ph: pts.map(function (p, i) { return (ppHash("b" + i + zone) % 1000) / 1000 * 6.28; }), zone: zone };
GH.bulbs.push(B);
return B;
},
function (G, L, x, y, z, s, hang) {
var g = ghGold(), lite = GH.lite, n = lite ? 10 : 16;
wCyl(0.05 * s, 0.05 * s, hang || 2, g, x, y + (hang || 2) / 2 + 0.8 * s, z, G, 6);
wSph(0.32 * s, g, x, y + 0.6 * s, z, G, 10);
wCyl(0.12 * s, 0.3 * s, 1.4 * s, g, x, y - 0.2 * s, z, G, 10);
wSph(0.22 * s, g, x, y - 1.1 * s, z, G, 10);
var tiers = [[1.0, 0.6], [1.7, 0], [2.3, -0.7]];
tiers.forEach(function (T, ti) {
var r = T[0] * s, ty = y + T[1] * s, ring = wMesh(new THREE.TorusGeometry(r, 0.05 * s, 5, lite ? 18 : 28), g, x, ty, z, G);
ring.rotation.x = Math.PI / 2;
var m = Math.round(n * (0.6 + ti * 0.25));
for (var k = 0; k < m; k++) {
var a = k / m * Math.PI * 2 + ti * 0.2, cx = x + Math.cos(a) * r, cz = z + Math.sin(a) * r;
GH.cand.push([cx, ty + 0.16 * s, cz]);
if (!lite || k % 2 === 0) {
for (var d = 1; d <= 3; d++)
GH.cry.push([cx, ty - 0.1 * s * d, cz]);
}
if (!lite) {
var a2 = (k + 1) / m * Math.PI * 2 + ti * 0.2, nx = x + Math.cos(a2) * r, nz = z + Math.sin(a2) * r;
for (var q = 1; q < 6; q++) {
var f = q / 6;
GH.cry.push([cx + (nx - cx) * f, ty - 0.05 * s - Math.sin(f * Math.PI) * 0.28 * s, cz + (nz - cz) * f]);
}
}
}
});
if (!lite)
for (var st = 0; st < 12; st++) {
var a3 = st / 12 * Math.PI * 2;
for (var p = 1; p < 6; p++) {
var f2 = p / 6;
GH.cry.push([x + Math.cos(a3) * 1.0 * s * f2, y + 0.6 * s + f2 * (0.0 - 0.6) * s + Math.sin(f2 * Math.PI) * 0.1, z + Math.sin(a3) * 1.0 * s * f2]);
}
}
var gl = wGlow(0xFFE2A8, 7 * s, 0.32);
gl.position.set(x, y, z);
L.add(gl);
PP.glows.push({ m: gl, base: 0.3, amp: 0.03, sp: 0.12, ph: x * 0.1 });
},
function (G) {
if (GH.cry.length) {
var im = new THREE.InstancedMesh(new THREE.OctahedronGeometry(0.055, 0), new THREE.MeshBasicMaterial({ color: 0xF4F8FF, transparent: true, opacity: 0.92, fog: false }), GH.cry.length), m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), sc = new THREE.Vector3(1, 1.8, 1), p = new THREE.Vector3();
GH.cry.forEach(function (c, i) { e.set(0, i * 0.7, 0); q.setFromEuler(e); p.set(c[0], c[1], c[2]); m.compose(p, q, sc); im.setMatrixAt(i, m); });
im.userData.noCull = true;
im.frustumCulled = false;
G.add(ppKeep(im));
}
if (GH.cand.length)
GH.candB = ghBulbs(G, GH.cand, "hall", 0xFFE6B0);
GH.cry = [];
GH.cand = [];
},
function (G, x, z, ry, y) {
var c = new THREE.Group();
c.position.set(x, y || 0, z);
c.rotation.y = ry || 0;
G.add(c);
var g = ghGold(), v = ghLam("velvet", 0xFFFFFF, GH_TEX.velvet());
ghBox(c, 0.48, 0.1, 0.46, v, 0, 0.48, 0);
ghBox(c, 0.46, 0.5, 0.06, v, 0, 0.8, -0.21);
ghBox(c, 0.5, 0.05, 0.08, g, 0, 1.07, -0.22);
[[-0.21, -0.19], [0.21, -0.19], [-0.21, 0.19], [0.21, 0.19]].forEach(function (p) { wCyl(0.025, 0.02, 0.46, g, p[0], 0.23, p[1], c, 5); });
return c;
},
function (G, L, x, z, r, n, flames) {
var cloth = ghLam("cloth", 0xF6F0E4, null), g = ghGold(), glass = ghLam("glass", 0xE8F2FF, null, { op: 0.45 }), rose = ghLam("rose", 0xC82A4A, null), leaf = ghLam("leaf0", 0x2E5A2A, null);
wCyl(r, r, 0.04, cloth, x, 0.76, z, G, GH.lite ? 16 : 28);
wCyl(r + 0.02, r * 0.95, 0.7, cloth, x, 0.41, z, G, GH.lite ? 16 : 28);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, cx = x + Math.cos(a) * (r + 0.42), cz = z + Math.sin(a) * (r + 0.42);
ghChair(G, cx, cz, -a - Math.PI / 2 + Math.PI, 0);
wCyl(0.15, 0.15, 0.015, g, x + Math.cos(a) * (r - 0.25), 0.785, z + Math.sin(a) * (r - 0.25), G, 12);
if (!GH.lite)
wCyl(0.03, 0.02, 0.18, glass, x + Math.cos(a + 0.2) * (r - 0.15), 0.87, z + Math.sin(a + 0.2) * (r - 0.15), G, 6);
}
wCyl(0.08, 0.14, 0.6, g, x, 1.08, z, G, 8);
for (var c = 0; c < 5; c++) {
var a2 = c / 5 * Math.PI * 2, ox = c === 4 ? 0 : Math.cos(a2) * 0.22, oz = c === 4 ? 0 : Math.sin(a2) * 0.22, oy = c === 4 ? 1.62 : 1.42;
wCyl(0.025, 0.025, 0.16, ghLam("wax", 0xF8F0E0, null), x + ox, oy, z + oz, G, 5);
if (flames !== false) {
var f = wSph(0.035, ppGlowMat(0xFFC060), x + ox, oy + 0.12, z + oz, L, 6);
PP.flames.push({ m: f, ph: c + x, small: 1 });
}
}
for (var fl = 0; fl < (GH.lite ? 3 : 7); fl++) {
var a3 = fl / 7 * Math.PI * 2;
wSph(0.07, fl % 3 ? rose : ghLam("rosew", 0xF4E8EC, null), x + Math.cos(a3) * 0.24, 0.86, z + Math.sin(a3) * 0.24, G, 6);
}
wSph(0.2, leaf, x, 0.84, z, G, 8);
ppSolidR(x, z, r + 0.25);
},
function (G) {
GH.lite = ghLite();
GH.fairies = [];
GH.water = [];
GH.envDone = false;
GH.cry = [];
GH.cand = [];
var R = new THREE.Group();
R.name = "pp-hall";
G.add(R);
var Lv = new THREE.Group();
G.add(Lv);
PP.rooms.hall = { g: R, live: Lv };
GH.R = R;
GH.L = Lv;
[ghFoyer, ghBallroom, ghBanquet, ghSideRooms, ghOpera, ghGarden, ghLabyrinth].forEach(function (f) { try {
f(R, Lv);
}
catch (e) {
console.warn("GH build " + (f.name || "?") + ": " + (e && e.stack || e));
} });
try {
ghSky(Lv);
ghCrystals(Lv);
}
catch (e) {
console.warn("GH build sky: " + (e && e.stack || e));
}
if (!GH.noBake)
ppBake(R);
},
function (R, L) {
var g = ghGold(), marble = ghLam("checker", 0xCCC6BC, GH_TEX.checker()), wall = ghLam("panel", 0xFFFFFF, GH_TEX.panel()), stone = ghLam("stone", 0xFFFFFF, GH_TEX.stone()), red = ghLam("carpet", 0x8A1420, GH_TEX.velvet()), coffer = ghLam("coffer", 0xFFFFFF, GH_TEX.coffer());
ppWalk(3478, 3522, 30, 64, "hall");
ghFloor(R, 3478, 3522, 30, 64, marble, 1.6);
ghCeil(R, 3478, 3522, 30, 64, 13, coffer, 3);
ghWalls(R, 3478, 3522, 30, 64, 13, wall, [{ s: "n", c: 3500, w: 6, h: 4.6 }, { s: "w", c: 61, w: 2.4 }, { s: "e", c: 61, w: 2.4 }, { s: "w", c: 32.6, w: 2.4, h: 8, y0: 5.2 }], 3, 6.5);
ghDoorFrame(R, 3500, 30.3, true, 6, 4.6);
ghDoorFrame(R, 3478.3, 61, false, 2.4, 3);
ghDoorFrame(R, 3521.7, 61, false, 2.4, 3);
ghBox(R, 4.4, 4.6, 0.2, ghLam("bronzed", 0x5A3A1E, null, { e: 0x120804 }), 3500, 2.3, 63.8);
ghBox(R, 5.2, 0.5, 0.4, g, 3500, 4.85, 63.7);
wMesh(new THREE.CircleGeometry(2.2, 24, 0, Math.PI), ghBasic("fan", 0x2A1A3A), 3500, 5.1, 63.85, R).rotation.y = Math.PI;
ghPlane(R, 3, 14, 1.5, 1.5, red, 3500, 0.04, 46, 0, -Math.PI / 2);
ppSpot({ x: 3500, z: 61.8, r: 2.2, name: "The front doors: back out to the Boulevard", fn: function () { ppGoOut("hall"); } });
ppRamp(3479, 3484, 35, 57, 5.2, 0, "z");
ppRamp(3516, 3521, 35, 57, 5.2, 0, "z");
PP.pads.push({ x0: 3478.4, x1: 3521.6, z0: 30.2, z1: 35.2, h: 5.2 });
[[3479, 3484], [3516, 3521]].forEach(function (S) {
var cx = (S[0] + S[1]) / 2;
for (var st = 0; st < 22; st++) {
var z1 = 57 - st, h = (st + 1) * 5.2 / 22;
ghBox(R, 5, 0.22, 1.02, stone, cx, h - 0.11, z1 - 0.5, 1);
}
ghPlane(R, 5, 22.6, 2, 2, red, cx, 0, 46, 0, 0).visible = false;
var ix = S[0] === 3479 ? 3484.15 : 3515.85;
for (var p = 0; p < 23; p++) {
var pz = 57 - p, py = p * 5.2 / 22;
wCyl(0.06, 0.07, 0.9, stone, ix, py + 0.45, pz, R, 6);
}
var rail = ghBox(R, 0.12, 0.1, 22.6, g, ix, 0.95 + 2.6, 46);
rail.rotation.x = Math.atan2(5.2, 22);
ghBox(R, 0.4, 1.2, 0.4, stone, ix, 0.6, 57.2);
wSph(0.25, g, ix, 1.35, 57.2, R, 10);
ppSolid(ix, 44, 0.15, 9);
ppSolid(cx, 35.25, 2.5, 0.15, 0, 4.6);
});
ghBox(R, 43.2, 0.4, 5, stone, 3500, 5.0, 32.7, 2);
ghFloor(R, 3478.5, 3521.5, 30.2, 35.2, red, 1.8, 5.2);
for (var b = 3484.5; b <= 3515.5; b += 0.5)
wCyl(0.05, 0.06, 0.85, g, b, 5.65, 35.05, R, 5);
ghBox(R, 31.5, 0.12, 0.18, g, 3500, 6.1, 35.05);
ppSolid(3500, 35.1, 15.8, 0.12, 0, 1.3, 4.5);
[3486, 3494, 3506, 3514].forEach(function (bx) { ghColumn(R, bx, 35.6, 5.0, 0.28, stone); ppSolidR(bx, 35.6, 0.35); });
ghDoorFrame(R, 3478.3, 32.6, false, 2.4, 2.8);
R.children.slice(-4).forEach(function (o) { o.position.y += 5.2; });
ppSign(R, ["THE GRAND TIER", "Boxes of the Opera House"], 2.4, 0.6, 3478.4, 8.8, 32.6, Math.PI / 2, "#2A0C12", "#F2D08A");
ghChandelier(R, L, 3500, 10.2, 48, 1.3, 1.6);
ghPool(R, 3500, 48, 12, 0, 0.55);
[[3490, 62], [3510, 62]].forEach(function (q) { ghColumn(R, q[0], q[1], 3.2, 0.18, stone); wSph(0.3, ghBasic("globe", 0xFFE8B8), q[0], 3.5, q[1], R, 10); var gl = wGlow(0xFFD890, 2.4, 0.4); gl.position.set(q[0], 3.5, q[1]); L.add(gl); ppSolidR(q[0], q[1], 0.3); });
[[3492, 46], [3508, 46]].forEach(function (q) { var s = ppSofa(R, q[0], q[1], q[0] < 3500 ? Math.PI / 2 : -Math.PI / 2, 0x8A1420, 2.6); });
var gb = document.createElement("canvas");
gb.width = 512;
gb.height = 256;
var gt = new THREE.CanvasTexture(gb);
wMesh(new THREE.PlaneGeometry(3, 1.5), new THREE.MeshBasicMaterial({ map: gt }), 3487, 2.2, 63.8, L).rotation.y = Math.PI;
PP.screens.push({ cv: gb, tex: gt, kind: "gather" });
ghBox(R, 3.4, 1.9, 0.12, g, 3487, 2.2, 63.88);
ppSpot({ x: 3487, z: 61.6, r: 2.2, name: "The gathering: when the twenty meet", fn: ppGatherCard });
PP.staffAt.push({ title: "Gilded Hall steward", place: PP_KEYS.hall, x: 3503.5, z: 60, ry: 0, seed: "hst2" });
PP.music.push({ k: "pp-hall", zone: "hall", x: 3500, z: -20, r: 60, C: { bpm: 84, band: true } });
ppWalk(3522, 3534, 40, 64, "hall");
ghFloor(R, 3522, 3534, 40, 64, marble, 1.6);
ghCeil(R, 3522, 3534, 40, 64, 5, coffer, 3);
ghWalls(R, 3522, 3534, 40, 64, 5, ghLam("damask", 0xFFFFFF, GH_TEX.damask()), [{ s: "w", c: 61, w: 2.4 }], 1.6, 1.6);
ghBox(R, 0.8, 1.1, 7, ghLam("mahog", 0x4A2414, null), 3532.6, 0.55, 56, 1);
ghBox(R, 1, 0.08, 7.2, ghLam("marbleTop", 0xF0ECE4, null), 3532.6, 1.14, 56);
ppSolid(3532.6, 56, 0.45, 3.5);
ppSpot({ x: 3530, z: 56, r: 2.4, name: "The cloakroom", fn: ppCoatCheck });
PP.staffAt.push({ title: "Banquet server", place: PP_KEYS.hall, x: 3533.4, z: 56, ry: -Math.PI / 2, seed: "cloak" });
ghBox(R, 7, 1.1, 0.8, ghLam("mahog", 0x4A2414, null), 3527, 0.55, 41.6, 1);
ghBox(R, 7.2, 0.08, 1, ghLam("marbleTop", 0xF0ECE4, null), 3527, 1.14, 41.6);
ppSolid(3527, 41.6, 3.5, 0.45);
for (var sh = 0; sh < 3; sh++) {
ghBox(R, 6.4, 0.05, 0.3, g, 3527, 1.6 + sh * 0.5, 40.3);
for (var bt = 0; bt < 10; bt++)
wCyl(0.04, 0.05, 0.3, ppM([0x2A5A2A, 0xE8D8A0, 0x8A1A2A, 0xF0F0E8][(bt + sh) % 4], { op: 0.85 }), 3524.2 + bt * 0.62, 1.8 + sh * 0.5, 40.3, R, 6);
}
ghBox(R, 6.6, 2.2, 0.08, ghMirror(), 3527, 2.4, 40.2);
ppSpot({ x: 3527, z: 44, r: 2.6, name: "The Crush Bar", fn: function () { ppMenu("gala", "The Crush Bar"); } });
PP.staffAt.push({ title: "Banquet server", place: PP_KEYS.hall, x: 3527, z: 40.9, ry: 0, seed: "crush" });
ghChandelier(R, L, 3528, 4.1, 52, 0.6, 0.4);
[[3525, 48], [3525, 52]].forEach(function (q) { ppTable(R, q[0], q[1], 0.5); });
},
function (R, L) {
var g = ghGold(), wall = ghLam("panel", 0xFFFFFF, GH_TEX.panel()), floor = ghLam("parquet", 0xFFFFFF, GH_TEX.parquet()), coffer = ghLam("coffer", 0xFFFFFF, GH_TEX.coffer()), mirror = ghMirror(), marble = ghLam("pink", 0xC88A8A, GH_TEX.stone());
ppWalk(3465, 3535, -30, 30, "hall");
ghFloor(R, 3465, 3535, -30, 30, floor, 2.4);
var doors = [-20, -10, 0, 10, 20].map(function (c) { return { s: "e", c: c, w: 3, h: 5.5 }; });
ghWalls(R, 3465, 3535, -30, 30, 14, wall, [{ s: "s", c: 3500, w: 6, h: 4.6 }, { s: "n", c: 3485, w: 3, h: 3.6 }, { s: "n", c: 3515, w: 3, h: 3.6 }].concat(doors), 3, 7);
ghCeil(R, 3467, 3533, -28, 28, 15.2, coffer, 3.5);
[[3500, -29, 70, 0], [3500, 29, 70, Math.PI]].forEach(function (c) { var m = ghPlane(R, c[2], 3, 6, 3, g, c[0], 14.1 + 0.6, c[1], c[3]); m.rotation.x = c[3] ? 0.9 : -0.9; });
[[3466, 0, 60, Math.PI / 2], [3534, 0, 60, -Math.PI / 2]].forEach(function (c) { var m = ghPlane(R, c[2], 3, 6, 3, g, c[0], 14.7, c[1], c[3]); m.rotation.order = "YXZ"; m.rotation.x = -0.9; });
ghBox(R, 70, 0.6, 0.5, g, 3500, 13.7, -29.7);
ghBox(R, 70, 0.6, 0.5, g, 3500, 13.7, 29.7);
ghBox(R, 0.5, 0.6, 60, g, 3465.3, 13.7, 0);
ghBox(R, 0.5, 0.6, 60, g, 3534.7, 13.7, 0);
for (var i = 0; i < 6; i++) {
var bz = -25 + i * 10;
var ar = wMesh(ghArchGeo(3.6, 8), mirror, 3465.2, 1.2, bz, R);
ar.rotation.y = Math.PI / 2;
var fr = wMesh(ghArchGeo(4.2, 8.5), g, 3465.17, 0.95, bz, R);
fr.rotation.y = Math.PI / 2;
ghBox(R, 0.3, 0.9, 1.3, g, 3465.3, 10, bz);
wSph(0.4, g, 3465.3, 10.8, bz, R, 10);
[-2.6, 2.6].forEach(function (o) { ghBox(R, 0.4, 0.15, 0.15, g, 3465.5, 4.2, bz + o); for (var c = 0; c < 3; c++)
GH.cand.push([3465.75, 4.45 + c * 0.12, bz + o + (c - 1) * 0.18]); var gl = wGlow(0xFFD8A0, 1.8, 0.3); gl.position.set(3466, 4.6, bz + o); L.add(gl); });
if (i < 5) {
var dz = -20 + i * 10;
var fan = wMesh(ghArchGeo(3, 2.6), ghLam("glassD", 0x9AB0D0, null, { op: 0.35, e: 0x101830 }), 3534.95, 5.5, dz, R);
fan.rotation.y = -Math.PI / 2;
ghDoorFrame(R, 3534.7, dz, false, 3, 5.5);
[-1, 1].forEach(function (sd) { var lf = ghBox(R, 1.5, 5.4, 0.08, ghLam("glassD", 0x9AB0D0, null, { op: 0.35, e: 0x101830 }), 3534.2 - 0.7, 2.7, dz + sd * (1.5 + 0.05)); lf.rotation.y = Math.PI / 2 + sd * 0.4; });
}
}
for (var p = 0; p < 7; p++) {
var pz = -30 + p * 10;
if (p === 0 || p === 6)
continue;
[3465.4, 3534.6].forEach(function (px) { ghBox(R, 0.5, 12, 1.1, marble, px, 6, pz, 1); ghBox(R, 0.6, 1.2, 1.3, g, px, 12.4, pz); ghBox(R, 0.6, 0.5, 1.3, g, px, 0.25, pz); });
}
[[3500, -16], [3500, 0], [3500, 16], [3480, -8], [3480, 8], [3520, -8], [3520, 8]].forEach(function (q, i) { var big = i < 3; ghChandelier(R, L, q[0], big ? 10.6 : 11.4, q[1], big ? 1.5 : 0.95, big ? 3.0 : 2.6); ghPool(R, q[0], q[1], big ? 14 : 9, 0, big ? 0.5 : 0.35); });
[-15, -5, 5, 15].forEach(function (z) {
[3468.5, 3531.5].forEach(function (x) {
wCyl(0.35, 0.5, 0.25, g, x, 0.12, z, R, 10);
wCyl(0.08, 0.12, 2.2, g, x, 1.3, z, R, 8);
wSph(0.18, g, x, 2.4, z, R, 8);
for (var c = 0; c < 7; c++) {
var a = c / 7 * Math.PI * 2, rr = c === 6 ? 0 : 0.42;
GH.cand.push([x + Math.cos(a) * rr, 2.7 + (c === 6 ? 0.3 : 0), z + Math.sin(a) * rr]);
}
var gl = wGlow(0xFFD8A0, 3, 0.3);
gl.position.set(x, 2.8, z);
L.add(gl);
ppSolidR(x, z, 0.5);
});
});
for (var c = -27; c <= 27; c += 2.4) {
if (Math.abs(c % 10) < 2 || Math.abs(Math.abs(c % 10) - 10) < 2)
continue;
ghChair(R, 3467.2, c, Math.PI / 2);
}
ghBox(R, 16, 0.8, 5, ghLam("mahog", 0x4A2414, null), 3500, 0.4, -27.5, 2);
ghBox(R, 16.2, 0.1, 0.15, g, 3500, 1.75, -25);
for (var rb = 3492.3; rb <= 3507.7; rb += 0.6)
wCyl(0.03, 0.03, 0.95, g, rb, 1.27, -25, R, 5);
ppPad(3492, 3508, -30, -25, 0.8);
PP.quartet = { x: 3500, y: 0.8, z: -27.6, n: GH.lite ? 4 : 8, spread: 1.8 };
ghBox(R, 3, 6, 0.3, ghLam("damask", 0xFFFFFF, GH_TEX.damask()), 3500, 4.4, -29.7, 1);
PP.floors.push({ zone: "hall", x0: 3478, x1: 3522, z0: -20, z1: 20, y: 0, name: "the ballroom floor: the waltz" });
GH.dancers = [];
var wr = ppRand(2323), nc = GH.lite ? 3 : 8;
for (var cp = 0; cp < nc; cp++) {
var ca = cp / nc * Math.PI * 2 + wr() * 0.4, cr = 6 + wr() * 9, cx = 3500 + Math.cos(ca) * cr, cz = Math.sin(ca) * cr * 0.9;
[0, 1].forEach(function (k) {
var gg = ghGuest("waltz" + cp + "_" + k, cp * 2 + (k ? 0 : 1)), ox = (k ? 0.32 : -0.32);
gg.position.set(cx + ox, 0, cz);
gg.rotation.y = k ? -Math.PI / 2 : Math.PI / 2;
L.add(gg);
GH.dancers.push({ g: gg, ph: wr(), lx: cx + ox, lz: cz, y: 0, face: gg.rotation.y, zone: "hall", sway: true });
});
}
ghBox(R, 0.9, 1.1, 8, ghLam("mahog", 0x4A2414, null), 3468.6, 0.55, 22, 1);
ghBox(R, 1.1, 0.08, 8.2, ghLam("marbleTop", 0xF0ECE4, null), 3468.6, 1.14, 22);
ppSolid(3468.6, 22, 0.5, 4);
for (var t = 0; t < 4; t++) {
var rr2 = 1 - t * 0.22;
for (var q = 0; q < Math.max(1, Math.round(rr2 * 7)); q++) {
var a2 = q / Math.max(1, Math.round(rr2 * 7)) * Math.PI * 2;
wCyl(0.06, 0.04, 0.16, ghLam("glass", 0xE8F2FF, null, { op: 0.45 }), 3468.6 + Math.cos(a2) * rr2 * 0.35, 1.26 + t * 0.17, 22 + Math.sin(a2) * rr2 * 0.35, R, 6);
}
}
ppSpot({ x: 3471, z: 22, r: 2.6, name: "The champagne bar", fn: function () { ppMenu("gala", "The champagne bar"); } });
PP.staffAt.push({ title: "Banquet server", place: PP_KEYS.hall, x: 3467.6, z: 20, ry: Math.PI / 2, seed: "bs2" });
ppSpot({ x: 3532.4, z: 0, r: 2.4, name: "The garden doors: the terrace, the Fairy Garden and the Labyrinth beyond", fn: function () { setStatus("<b>The Fairy Garden.</b> Walk on through the glass doors: the terrace, then the lime walks strung with fairy lights, the rose arbour, and at the far end the Labyrinth, where the fairies live."); } });
var gs = GH.lite ? 4 : 10;
for (var k = 0; k < gs; k++) {
var side = k % 2, x = side ? 3528 + (k % 3) : 3470 + (k % 3), z = -22 + ((k * 7) % 44);
var gp = ghGuest("ballg" + k, k);
gp.position.set(x, 0, z);
gp.rotation.y = side ? Math.PI / 2 : -Math.PI / 2;
L.add(gp);
GH.people.push({ g: gp, zone: "hall", x: x, z: z, wander: { r: 2 } });
}
},
function (R, L) {
var g = ghGold(), dam = ghLam("damask", 0xFFFFFF, GH_TEX.damask()), floor = ghLam("bcarpet", 0x9A2A2E, GH_TEX.damask()), coffer = ghLam("coffer", 0xFFFFFF, GH_TEX.coffer()), stone = ghLam("stone", 0xFFFFFF, GH_TEX.stone()), red = ghLam("carpet", 0x8A1420, GH_TEX.velvet());
ppWalk(3465, 3535, -84, -32, "hall");
ppWalk(3483, 3487, -32.2, -29.8, "hall");
ppWalk(3513, 3517, -32.2, -29.8, "hall");
ghFloor(R, 3465, 3535, -84, -32, floor, 1.6);
ghCeil(R, 3465, 3535, -84, -32, 12, coffer, 3);
ghPlane(R, 46, 6, 1.8, 1.8, red, 3500, 0.04, -70, 0, -Math.PI / 2);
ghWalls(R, 3465, 3535, -84, -32, 12, dam, [{ s: "s", c: 3485, w: 3, h: 3.6 }, { s: "s", c: 3515, w: 3, h: 3.6 }, { s: "w", c: -48, w: 2.4 }, { s: "w", c: -72, w: 2.4 }], 1.6, 1.6);
ghBox(R, 3, 0.3, 2.4, g, 3485, 3.7, -31);
ghBox(R, 3, 0.3, 2.4, g, 3515, 3.7, -31);
ghBox(R, 0.4, 3.6, 2.4, stone, 3483.3, 1.8, -31);
ghBox(R, 0.4, 3.6, 2.4, stone, 3486.7, 1.8, -31);
ghBox(R, 0.4, 3.6, 2.4, stone, 3513.3, 1.8, -31);
ghBox(R, 0.4, 3.6, 2.4, stone, 3516.7, 1.8, -31);
[[3500, -83.8, 70, true], [3500, -32.2, 70, true], [3465.2, -58, 52, false], [3534.8, -58, 52, false]].forEach(function (w) { if (w[3]) {
ghBox(R, w[2], 0.2, 0.2, g, w[0], 1.1, w[1]);
ghBox(R, w[2], 0.5, 0.4, g, w[0], 11.6, w[1]);
}
else {
ghBox(R, 0.2, 0.2, w[2], g, w[0], 1.1, w[1]);
ghBox(R, 0.4, 0.5, w[2], g, w[0], 11.6, w[1]);
} });
ghBox(R, 70, 1.1, 0.25, ghLam("wainscot", 0x5A2A1A, null), 3500, 0.55, -83.7);
ghBox(R, 0.25, 1.1, 52, ghLam("wainscot", 0x5A2A1A, null), 3534.7, 0.55, -58);
for (var p = 0; p < 8; p++) {
var px = 3469 + p * 9;
if (Math.abs(px - 3500) < 4)
continue;
ghBox(R, 1, 10.4, 0.4, g, px, 5.6, -83.6, 1);
}
ghBox(R, 6, 3.4, 1.4, ghLam("carrara", 0xF2EEE6, GH_TEX.stone()), 3500, 1.7, -83.2, 2);
ghBox(R, 3.2, 2.2, 0.6, ghLam("hearth", 0x140C08, null), 3500, 1.2, -82.6);
ghBox(R, 6.6, 0.3, 1.7, ghLam("carrara", 0xF2EEE6, GH_TEX.stone()), 3500, 3.5, -83.1, 2);
for (var f = 0; f < 6; f++) {
var fl = wMesh(new THREE.ConeGeometry(0.18 + f % 2 * 0.08, 0.8 + f % 3 * 0.25, 6), ppGlowMat([0xFF8A30, 0xFFB050, 0xFF6A20][f % 3]), 3498.8 + f * 0.48, 0.95, -82.4, L);
PP.flames.push({ m: fl, ph: f * 1.3 });
}
var fg = wGlow(0xFF9A40, 4, 0.4);
fg.position.set(3500, 1.2, -82);
L.add(fg);
PP.glows.push({ m: fg, base: 0.36, amp: 0.05, sp: 0.1 });
ppSolid(3500, -83, 3, 0.8);
ghBox(R, 4.6, 4, 0.1, ghMirror(), 3500, 6.2, -83.6);
ghBox(R, 5.2, 4.6, 0.06, g, 3500, 6.2, -83.66);
wSph(0.5, g, 3500, 8.6, -83.4, R, 10);
for (var pt = 0; pt < 4; pt++) {
var pz = -76 + pt * 13;
[3465.3, 3534.7].forEach(function (px, si) { ghBox(R, 0.15, 3.2, 2.4, g, px, 5.6, pz); var pic = ghPlane(R, 1.9, 2.7, 1.9, 2.7, ghLam("portrait" + ((pt + si) % 4), 0xFFFFFF, ghPortrait((pt + si) % 4)), px + (si ? -0.09 : 0.09), 5.6, pz, si ? -Math.PI / 2 : Math.PI / 2); });
}
var cloth = ghLam("cloth", 0xF6F0E4, null);
ghBox(R, 44, 0.06, 2.6, cloth, 3500, 0.8, -70);
ghBox(R, 43.6, 0.76, 2.2, ghLam("mahog", 0x4A2414, null), 3500, 0.39, -70);
ppSolid(3500, -70, 22, 1.3, 0, 1.2);
for (var s = 0; s < 20; s++) {
var side = s < 10 ? -1 : 1, sx = 3482 + (s % 10) * 4, sz = -70 + side * 1.75;
ghChair(R, sx, sz, side < 0 ? 0 : Math.PI);
ppSolid(sx, sz, 0.3, 0.3, 0, 1.2);
wCyl(0.2, 0.2, 0.015, g, sx, 0.84, -70 + side * 0.85, R, 14);
wCyl(0.03, 0.02, 0.2, ghLam("glass", 0xE8F2FF, null, { op: 0.45 }), sx + 0.3, 0.93, -70 + side * 0.7, R, 6);
var card = wSign(["No. " + (s + 1)], 0.3, 0.16, "#F8F0E0", "#8A6A2A");
card.position.set(sx, 0.92, -70 + side * 0.55);
card.rotation.y = side < 0 ? 0 : Math.PI;
R.add(card);
}
ghChair(R, 3523.6, -70, -Math.PI / 2);
ghBox(R, 0.7, 1.7, 0.08, g, 3524.0, 1.2, -70);
for (var cd = 0; cd < 9; cd++) {
var cx = 3484 + cd * 4;
wCyl(0.08, 0.12, 0.5, g, cx, 1.07, -70, R, 8);
for (var c = 0; c < 3; c++) {
var cl = wSph(0.035, ppGlowMat(0xFFC060), cx + (c - 1) * 0.22, 1.48, -70, L, 6);
PP.flames.push({ m: cl, ph: cd + c, small: 1 });
GH.cand.push([cx + (c - 1) * 0.22, 1.36, -70]);
}
if (!GH.lite)
for (var fl2 = 0; fl2 < 5; fl2++)
wSph(0.08, fl2 % 2 ? ghLam("rose", 0xC82A4A, null) : ghLam("rosew", 0xF4E8EC, null), cx + 2 + Math.cos(fl2) * 0.2, 0.9, -70 + Math.sin(fl2) * 0.2, R, 6);
}
ppSpot({ x: 3500, z: -66.6, r: 3, name: "The Table of Twenty: the Golden Gathering's banquet", fn: function () { ppMenu("hall", "The banquet of twenty"); } });
[[3474, -55], [3487, -55], [3500, -55], [3513, -55], [3526, -55], [3480, -43], [3493, -43], [3507, -43], [3520, -43]].forEach(function (q, i) { ghRoundTable(R, L, q[0], q[1], 1.1, GH.lite ? 6 : 8, !GH.lite || i % 3 === 0); });
ppSpot({ x: 3500, z: -49, r: 3.2, name: "Supper at the round tables", fn: function () { ppMenu("gala", "Supper in the Banquet Hall"); } });
for (var tt = 0; tt < 5; tt++) {
var rr = 2 - tt * 0.4;
for (var gq = 0; gq < Math.max(1, Math.round(rr * (GH.lite ? 5 : 8))); gq++) {
var a2 = gq / Math.max(1, Math.round(rr * (GH.lite ? 5 : 8))) * Math.PI * 2;
wCyl(0.1, 0.06, 0.25, ghLam("glass", 0xE8F2FF, null, { op: 0.45 }), 3528 + Math.cos(a2) * rr, 1.2 + tt * 0.3, -78 + Math.sin(a2) * rr, R, 6);
}
}
wCyl(2.2, 2.2, 1.05, ghLam("cloth", 0xF6F0E4, null), 3528, 0.52, -78, R, 20);
wCyl(2.25, 2.25, 0.1, g, 3528, 1.06, -78, R, 20);
ppSolidR(3528, -78, 2.3);
ppSpot({ x: 3524.4, z: -76, r: 2.4, name: "The fountain of sparkling wine and cider", fn: function () { ppMenu("gala", "The fountain"); } });
ghBox(R, 1.2, 1, 0.8, ghLam("mahog", 0x4A2414, null), 3531, 0.5, -40);
ppSolid(3531, -40, 0.6, 0.4);
ghBox(R, 0.9, 0.05, 0.6, ghLam("cloth", 0xF6F0E4, null), 3531, 1.03, -40);
ppSpot({ x: 3529, z: -40, r: 2, name: "The guest book: the twenty places", fn: ppGuestBook });
[[3488, -60], [3512, -60], [3500, -44]].forEach(function (q, i) { ghChandelier(R, L, q[0], 8.6, q[1], i < 2 ? 1.2 : 1.0, 2.8); ghPool(R, q[0], q[1], 11, 0, 0.4); });
PP.staffAt.push({ title: "Banquet server", place: PP_KEYS.hall, x: 3478, z: -64, ry: 0, seed: "bs1" }, { title: "Banquet server", place: PP_KEYS.hall, x: 3522, z: -48, ry: Math.PI, seed: "bs3" }, { title: "Banquet server", place: PP_KEYS.hall, x: 3500, z: -38, ry: Math.PI, seed: "bs4" });
var nd = GH.lite ? 4 : 10;
for (var d = 0; d < nd; d++) {
var T = [[3474, -55], [3487, -55], [3500, -55], [3513, -55], [3526, -55], [3480, -43], [3493, -43], [3507, -43], [3520, -43]][d % 9], a = (d * 2.4) % 6.28, x = T[0] + Math.cos(a) * 1.52, z = T[1] + Math.sin(a) * 1.52;
var gp = ghGuest("dine" + d, d + 1);
gp.position.set(x, 0.08, z);
gp.rotation.y = -a + Math.PI / 2 + Math.PI;
gp.rotation.y = Math.atan2(T[0] - x, T[1] - z);
gp.userData.seated = true;
gp.userData.pose = "sit";
L.add(gp);
GH.people.push({ g: gp, zone: "hall", x: x, z: z });
}
},
function (i) {
return ghTexOf("portrait" + i, function (x, W, H, r) {
var bg = ["#2A3A2A", "#3A2A1A", "#1A2238", "#3A1A24"][i];
x.fillStyle = bg;
x.fillRect(0, 0, W, H);
var v = x.createRadialGradient(W / 2, H * 0.4, 10, W / 2, H * 0.4, W * 0.8);
v.addColorStop(0, "rgba(255,230,180,.25)");
v.addColorStop(1, "rgba(0,0,0,.5)");
x.fillStyle = v;
x.fillRect(0, 0, W, H);
var dress = ["#8A1A2A", "#1A2A6A", "#E8D8B8", "#0E4A3A"][i];
x.fillStyle = dress;
x.beginPath();
x.moveTo(W * 0.2, H);
x.quadraticCurveTo(W * 0.25, H * 0.55, W * 0.5, H * 0.5);
x.quadraticCurveTo(W * 0.75, H * 0.55, W * 0.8, H);
x.fill();
x.fillStyle = "#E8C8A8";
x.beginPath();
x.ellipse(W / 2, H * 0.34, W * 0.12, H * 0.11, 0, 0, 7);
x.fill();
x.fillRect(W * 0.46, H * 0.42, W * 0.08, H * 0.08);
x.fillStyle = ["#3A2414", "#C8A050", "#1A1008", "#6A3A1A"][i];
x.beginPath();
x.ellipse(W / 2, H * 0.27, W * 0.14, H * 0.08, 0, Math.PI, 0);
x.fill();
x.fillStyle = "#F2E8D0";
x.beginPath();
x.arc(W / 2, H * 0.52, 3, 0, 7);
x.fill();
}, 128, 192, true);
},
function (R, L) {
var marble = ghLam("checker", 0xCCC6BC, GH_TEX.checker()), g = ghGold();
ppWalk(3441, 3465, -60, -36, "hall");
ghFloor(R, 3441, 3465, -60, -36, marble, 1.6);
ghCeil(R, 3441, 3465, -60, -36, 8, ppM(0x1A1438));
ghWalls(R, 3441, 3465, -60, -36, 8, ghLam("ivory", 0xF4ECE0, GH_TEX.stone()), [{ s: "e", c: -48, w: 2.4 }], 4, 4);
var sky = wTex(512, 256, function (x, W, H) {
var gg = x.createLinearGradient(0, 0, 0, H);
gg.addColorStop(0, "#120838");
gg.addColorStop(1, "#46205E");
x.fillStyle = gg;
x.fillRect(0, 0, W, H);
for (var i = 0; i < 300; i++) {
x.fillStyle = "rgba(255,250,255," + (0.3 + Math.random() * 0.7).toFixed(2) + ")";
x.fillRect(Math.random() * W, Math.random() * H * 0.8, 1.5, 1.5);
}
x.fillStyle = "#C8A8D8";
x.beginPath();
x.arc(W * 0.7, H * 0.35, 40, 0, 7);
x.fill();
x.strokeStyle = "rgba(240,210,250,.7)";
x.lineWidth = 6;
x.beginPath();
x.ellipse(W * 0.7, H * 0.35, 80, 18, -0.3, 0, 7);
x.stroke();
x.strokeStyle = "#C8A050";
x.lineWidth = 5;
for (var k = 1; k < 6; k++) {
x.beginPath();
x.moveTo(k * W / 6, 0);
x.lineTo(k * W / 6, H);
x.stroke();
}
});
var win = wMesh(new THREE.PlaneGeometry(22, 6), new THREE.MeshBasicMaterial({ map: sky }), 3441.2, 4.2, -48, R);
win.rotation.y = Math.PI / 2;
for (var o = 0; o < 4; o++) {
var ox = 3445 + o * 5;
wCyl(0.5, 0.4, 0.8, ghLam("terracotta", 0xC87A4A, null), ox, 0.4, -58, R, 10);
wMesh(ghLeafGeo(o + 40, 0.95), ghLam("leaf1", 0x386A30, null), ox, 1.7, -58, R);
for (var fz = 0; fz < 5; fz++)
wSph(0.1, ppM(0xFFA030), ox + Math.cos(fz) * 0.7, 1.6 + Math.sin(fz * 2) * 0.5, -58 + Math.sin(fz) * 0.7, R, 6);
ppSolidR(ox, -58, 0.6);
}
ppSofa(R, 3452, -38.5, Math.PI, 0xC9A868, 4);
ppSpot({ x: 3450, z: -48, r: 3, name: "The Orangery: the stars over Jubilee", fn: function () { ppRest("the Orangery"); } });
ppWalk(3441, 3465, -84, -62, "hall");
ghFloor(R, 3441, 3465, -84, -62, ppM(0x3A1A2A));
ghCeil(R, 3441, 3465, -84, -62, 5, ppM(0x2A1018));
ghWalls(R, 3441, 3465, -84, -62, 5, ppM(0x5A2A3A), [{ s: "e", c: -72, w: 2.4 }], 3, 5);
ppGate(3441, 3464.7, -84, -62, "keeper", "The Keeper's anteroom");
ppBox(3, 0.8, 1.4, ppM(0x5A3A20), 3450, 0.4, -78, R);
ppSolid(3450, -78, 1.5, 0.7);
ppBox(1, 2, 0.6, ppM(0x8A1A2A), 3450, 1, -81, R);
ppSpot({ x: 3450, z: -75.6, r: 2.2, name: "The Keeper's desk: set the date of the gathering", fn: ppGatherSet });
ghDoorFrame(R, 3464.7, -48, false, 2.4, 3);
ghDoorFrame(R, 3464.7, -72, false, 2.4, 3);
},
function () {
var O = ghOperaTonight();
worldCard(ppHead("Tonight at the Opera: " + O[0], O[1]) + "<div style='margin:6px 0'>" + esc(O[2]) + "</div>" +
"<div style='opacity:.8;font-size:12px'>The stalls are open to everyone, and the Grand Tier is up the foyer stair (the door at the top on your right as you face the ballroom). Drinks at the Crush Bar in the interval. All seven operas are public domain, sung every night of the week in turn.</div>");
},
function () {
if (GH.seatGeo)
return GH.seatGeo;
var parts = [new THREE.BoxGeometry(0.5, 0.14, 0.52).translate(0, 0.45, 0), new THREE.BoxGeometry(0.1, 0.62, 0.52).translate(0.24, 0.78, 0), new THREE.BoxGeometry(0.36, 0.38, 0.4).translate(0, 0.19, 0)];
var n = 0;
parts.forEach(function (p) { var q = p.index ? p.toNonIndexed() : p; parts[parts.indexOf(p)] = q; n += q.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), at = 0;
parts.forEach(function (p) { pos.set(p.attributes.position.array, at * 3); nor.set(p.attributes.normal.array, at * 3); at += p.attributes.position.count; });
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
g.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
g.computeBoundingSphere();
GH.seatGeo = g;
return g;
},
function (R, L) {
var g = ghGold(), dam = ghLam("damask", 0xFFFFFF, GH_TEX.damask()), red = ghLam("carpet", 0x8A1420, GH_TEX.velvet()), coffer = ghLam("coffer", 0xFFFFFF, GH_TEX.coffer()), stone = ghLam("stone", 0xFFFFFF, GH_TEX.stone()), velvet = ghLam("velvet", 0xFFFFFF, GH_TEX.velvet());
var X0 = 3390, X1 = 3478, Z0 = 31, Z1 = 96, H = 17;
ppWalk(X0, X1, Z0, Z1, "hall");
ghFloor(R, X0, X1, Z0, Z1, red, 1.8);
ghWalls(R, X0, X1, Z0, Z1, H, dam, [{ s: "e", c: 61, w: 2.4 }, { s: "e", c: 32.6, w: 2.4, h: 8, y0: 5.2 }], 1.6, 1.6);
ghCeil(R, X0, X1, Z0, Z1, H, coffer, 3.2);
var dm = wMesh(new THREE.CircleGeometry(19, GH.lite ? 24 : 48), ghLam("dome", 0xFFFFFF, GH_TEX.dome()), 3440, H - 0.05, 63.5, R);
dm.rotation.x = Math.PI / 2;
var dr = wMesh(new THREE.TorusGeometry(19, 0.4, 6, GH.lite ? 24 : 48), g, 3440, H - 0.3, 63.5, R);
dr.rotation.x = Math.PI / 2;
ghChandelier(R, L, 3440, 11.8, 63.5, 2.4, 3.2);
ghPool(R, 3440, 63.5, 26, 0, 0.42);
ghBox(R, 20, 1.2, 65, ghLam("boards", 0x6A4A2A, null), 3400, 0.6, 63.5, 1);
ppPad(X0, 3410, Z0, Z1, 1.2);
ghPlane(R, 58, 15, 58, 15, ghBasic("backdrop", 0xFFFFFF, { map: GH_TEX.backdrop() }), 3390.4, 8.7, 63.5, Math.PI / 2);
ghBox(R, 0.4, H, 10, g, 3410, H / 2, 36, 2);
ghBox(R, 0.4, H, 10, g, 3410, H / 2, 91, 2);
ghBox(R, 0.6, 4, 65, g, 3410, H - 2, 63.5, 2);
var arch = wMesh(new THREE.TorusGeometry(25, 0.6, 6, 40, Math.PI), g, 3410.3, 1.2, 63.5, R);
arch.rotation.y = Math.PI / 2;
arch.scale.set(1, 0.48, 1);
[[38, 7], [89, 7]].forEach(function (c) { var cu = ghPlane(R, c[1], 13.6, c[1], 13.6, ghLam("curtain", 0xFFFFFF, GH_TEX.curtain(), { ds: true }), 3410.8, 8.2, c[0], -Math.PI / 2); });
ghPlane(R, 46, 3.2, 46, 3.2, ghLam("curtain", 0xFFFFFF, GH_TEX.curtain(), { ds: true }), 3410.8, 13.6, 63.5, -Math.PI / 2);
ghBox(R, 0.5, 0.6, 54, g, 3410.9, 15.5, 63.5);
ghBox(R, 0.4, 2.4, 4, g, 3410.6, H - 1.6, 63.5);
wSph(0.8, g, 3410.6, H - 0.4, 63.5, R, 10);
for (var fl = 0; fl < (GH.lite ? 10 : 24); fl++) {
GH.cand.push([3409.7, 1.32, 40 + fl * (47 / (GH.lite ? 10 : 24))]);
}
ppSolid(3410.2, 63.5, 0.3, 32.5, 0, 4);
ghFloor(R, 3410.5, 3416, 40, 87, ghLam("pit", 0x1A1008, null), 2, 0.02);
ghBox(R, 0.15, 1, 47, ghLam("mahog", 0x4A2414, null), 3416, 0.5, 63.5, 1);
ghBox(R, 0.2, 0.08, 47.2, g, 3416, 1.04, 63.5);
ppSolid(3416, 63.5, 0.15, 23.5);
var nm = GH.lite ? 3 : 6;
for (var m = 0; m < nm; m++) {
var mz = 44 + m * (39 / nm), mp = wPerson("gh_orch" + m, { title: "Opera orchestra musician", place: PP_KEYS.hall, look: { layer: "suit", layerColor: 0x101014, top: 0xF4F0E8, bottom: 0x101014 } });
mp.position.set(3413, 0, mz);
mp.rotation.y = Math.PI / 2 * (m % 2 ? 1 : -1) * 0 + (-Math.PI / 2);
L.add(mp);
GH.players.push({ g: mp, part: "strings", ph: m * 0.7, zone: "hall", x: 3413, z: mz, bpm: 66 });
}
var cond = wPerson("gh_conductor", { title: "Conductor", place: PP_KEYS.hall, look: { layer: "suit", layerColor: 0x101014, top: 0xF4F0E8, bottom: 0x101014 } });
cond.position.set(3415, 0.3, 63.5);
cond.rotation.y = Math.PI / 2;
L.add(cond);
GH.players.push({ g: cond, part: "voice", ph: 0, zone: "hall", x: 3415, z: 63.5, bpm: 66 });
var cast = [[3403, 61, "Soprano", { sex: "f", layer: "robe", layerColor: 0xF0E8E0, top: 0xF0E8E0, bottom: 0xF0E8E0 }], [3403, 66, "Tenor", { sex: "m", layer: "longcoat", layerColor: 0x5A1A2A, top: 0xE8D8B8, bottom: 0x2A1A14 }],
[3397, 52, "Chorus singer", { sex: "f", layer: "robe", layerColor: 0x2A4A6A }], [3397, 56, "Chorus singer", { sex: "m", layer: "longcoat", layerColor: 0x3A2A1A }], [3397, 71, "Chorus singer", { sex: "f", layer: "robe", layerColor: 0x6A2A4A }], [3397, 75, "Chorus singer", { sex: "m", layer: "longcoat", layerColor: 0x2A3A2A }]];
cast.slice(0, GH.lite ? 2 : 4).forEach(function (c, i) { var p = wPerson("gh_cast" + i, { title: c[2], place: PP_KEYS.hall, look: c[3], sex: c[3].sex }); p.position.set(c[0], 1.2, c[1]); p.rotation.y = -Math.PI / 2 + (i < 2 ? (i ? 0.5 : -0.5) : 0); L.add(p); GH.players.push({ g: p, part: "voice", ph: i, zone: "hall", x: c[0], z: c[1], bpm: 66 }); });
PP.music.push({ k: "pp-opera", zone: "hall", x: 3420, z: 63.5, r: 44, C: { bpm: 66, band: true } });
var seats = [], rowsX = [];
for (var rx = 3420; rx <= 3459; rx += 1.15)
rowsX.push(rx);
rowsX.forEach(function (x, ri) { [[41, 60.6], [66.4, 86]].forEach(function (B) { for (var z = B[0]; z <= B[1]; z += 0.62)
seats.push([x, z]); ppSolid(x, (B[0] + B[1]) / 2, 0.3, (B[1] - B[0]) / 2 + 0.3, 0, 1.1); }); });
var im = new THREE.InstancedMesh(ghSeatGeo(), ghLam("seatvel", 0x9A1828, null), seats.length), mt = new THREE.Matrix4();
seats.forEach(function (s, i) { mt.makeTranslation(s[0], 0, s[1]); im.setMatrixAt(i, mt); });
im.userData.noCull = true;
im.frustumCulled = false;
R.add(ppKeep(im));
var na = GH.lite ? 6 : 22, rr = ppRand(808);
for (var a = 0; a < na; a++) {
var s = seats[(rr() * seats.length) | 0], p = ghGuest("opera" + a, a);
p.position.set(s[0] - 0.05, 0.08, s[1]);
p.rotation.y = -Math.PI / 2;
p.userData.seated = true;
p.userData.pose = "sit";
L.add(p);
GH.people.push({ g: p, zone: "hall", x: s[0], z: s[1] });
}
var carved = ghLam("carved", 0xF0C878, GH_TEX.panel(), { e: 0x1A1004, shine: 0.3 });
[[5.2, true], [9.2, false], [13, false]].forEach(function (T, ti) {
var y = T[0], d = ti === 0 ? 8 : 6;
var segs = [[3414, X1 - d, Z0, Z0 + d, "n"], [3414, X1 - d, Z1 - d, Z1, "s"], [X1 - d, X1, Z0, Z1, "e"]];
segs.forEach(function (S) {
var x0 = S[0], x1 = S[1], z0 = S[2], z1 = S[3], cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, w = x1 - x0, dd = z1 - z0;
ghBox(R, w, 0.4, dd, stone, cx, y - 0.2, cz, 2);
ghFloor(R, x0, x1, z0, z1, red, 1.8, y);
ghPlane(R, w, dd, 3, 3, ghLam("soffit", 0xF4E4C0, GH_TEX.coffer()), cx, y - 0.41, cz, 0, Math.PI / 2);
var fx, fz, along;
if (S[4] === "n") {
fz = z1;
along = true;
}
else if (S[4] === "s") {
fz = z0;
along = true;
}
else {
fx = x0;
along = false;
}
if (along) {
ghBox(R, w, 1.0, 0.25, carved, cx, y + 0.5, fz, 1);
ghBox(R, w, 0.14, 0.4, velvet, cx, y + 1.05, fz);
ghBox(R, w, 0.1, 0.32, g, cx, y + 0.02, fz);
var pd = T[1] ? 1.4 : dd, pcz = S[4] === "n" ? fz - pd / 2 : fz + pd / 2;
for (var px = x0 + 3; px < x1; px += 3) {
ghBox(R, 0.12, 2.6, pd, dam, px, y + 1.3, pcz, 1);
ghBox(R, 0.16, 0.12, pd + 0.04, g, px, y + 2.62, pcz);
}
}
else {
ghBox(R, 0.25, 1.0, dd, carved, fx, y + 0.5, cz, 1);
ghBox(R, 0.4, 0.14, dd, velvet, fx, y + 1.05, cz);
ghBox(R, 0.32, 0.1, dd, g, fx, y + 0.02, cz);
var pw = T[1] ? 1.4 : w;
for (var pz = z0 + 3; pz < z1; pz += 3) {
if (pz > z0 + d && pz < z1 - d) {
ghBox(R, pw, 2.6, 0.12, dam, fx + pw / 2, y + 1.3, pz, 1);
ghBox(R, pw + 0.04, 0.12, 0.16, g, fx + pw / 2, y + 2.62, pz);
}
}
}
if (!GH.lite || ti === 0)
for (var k = 0; k < (along ? w : dd); k += 3) {
var lx = along ? x0 + k + 1.5 : fx - 0.1, lz = along ? fz + (S[4] === "n" ? 0.15 : -0.15) : z0 + k + 1.5;
GH.cand.push([lx, y + 1.35, lz]);
}
if (T[1]) {
PP.pads.push({ x0: x0, x1: x1, z0: z0, z1: z1, h: y });
if (along)
ppSolid(cx, fz, w / 2, 0.2, 0, 1.3, y - 0.7);
else
ppSolid(fx, cz, 0.2, dd / 2, 0, 1.3, y - 0.7);
}
});
for (var b = 0; b < (GH.lite ? 3 : 9); b++) {
var bx = 3418 + b * 5.5, bz = b % 2 ? Z0 + d * 0.55 : Z1 - d * 0.55;
ghChair(R, bx, bz, b % 2 ? Math.PI : 0, y);
if (b % 4 === 0 && (!GH.lite || ti === 0)) {
var bp = ghGuest("box" + ti + "_" + b, b + ti);
bp.position.set(bx, y + 0.08, bz);
bp.rotation.y = b % 2 ? 0 : Math.PI;
bp.userData.seated = true;
bp.userData.pose = "sit";
L.add(bp);
GH.people.push({ g: bp, zone: "hall", x: bx, z: bz });
}
}
});
for (var cz2 = 38; cz2 <= 88; cz2 += 6.25) {
wCyl(0.16, 0.18, 5, g, X1 - 8.2, 2.5, cz2, R, 8);
ppSolidR(X1 - 8.2, cz2, 0.25);
}
for (var cx2 = 3420; cx2 <= 3466; cx2 += 6.5) {
[Z0 + 8.2, Z1 - 8.2].forEach(function (zz) { wCyl(0.16, 0.18, 5, g, cx2, 2.5, zz, R, 8); ppSolidR(cx2, zz, 0.25); });
}
ppSpot({ x: 3462, z: 63.5, r: 3, name: "Tonight at the Opera (the programme)", fn: ghOperaCard });
ppSpot({ x: 3470, z: 61, r: 2.4, name: "Tonight at the Opera (the programme)", fn: ghOperaCard });
PP.staffAt.push({ title: "Opera usher", place: PP_KEYS.hall, x: 3474, z: 58, ry: -Math.PI / 2, seed: "usher1" }, { title: "Opera usher", place: PP_KEYS.hall, x: 3472, z: 35, ry: Math.PI / 2, y: 5.2, seed: "usher2" });
[[Z0 + 6, 1], [Z1 - 6, -1]].forEach(function (B) { for (var t = 0; t < 3; t++) {
var by = 3 + t * 3.6;
ghBox(R, 3.4, 1, 0.25, g, 3413, by + 0.5, B[0] + B[1] * 3);
ghBox(R, 3.4, 0.14, 0.4, velvet, 3413, by + 1.05, B[0] + B[1] * 3);
ghBox(R, 3.6, 0.3, 3.6, stone, 3413, by, B[0] + B[1] * 1.4);
} });
},
function () {
return ghTexOf("water", function (x, W, H, r) {
x.fillStyle = "#1A3A4A";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 220; i++) {
x.strokeStyle = "rgba(" + (r() < 0.5 ? "160,210,230" : "255,230,170") + "," + (0.12 + r() * 0.25).toFixed(2) + ")";
x.lineWidth = 1 + r() * 2;
x.beginPath();
var px = r() * W, py = r() * H;
x.ellipse(px, py, 6 + r() * 20, 2 + r() * 4, 0, 0, 7);
x.stroke();
}
}, 256);
},
function (G, x0, x1, z0, z1, n, seed) {
var R = ppRand(seed), leaf = ghLam("roseleaf", 0x7AB062, GH_TEX.hedge(), { e: 0x0E2008 }), cols = [0xC81E3A, 0xE87A9A, 0xF6EEF0, 0xF0A070, 0xA0122A];
for (var i = 0; i < n; i++) {
var x = x0 + R() * (x1 - x0), z = z0 + R() * (z1 - z0), s = 0.42 + R() * 0.32;
wMesh(ghLeafGeo(seed + i, s), leaf, x, s * 0.7, z, G);
if (!GH.lite || i % 2 === 0)
for (var b = 0; b < (GH.lite ? 3 : 9); b++) {
var a = R() * 6.28;
wSph(0.05 + R() * 0.03, ghLam("bloom" + (b % 5), cols[(i + b) % 5], null, { e: 0x180808 }), x + Math.cos(a) * s * 0.8, s * 0.7 + R() * s * 0.6, z + Math.sin(a) * s * 0.8, G, 6);
}
}
},
function (G, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry;
G.add(g);
var w = ghLam("benchw", 0xE8E2D4, null), ir = ghLam("iron", 0x1A1A1E, null);
for (var s = 0; s < 4; s++)
ghBox(g, 1.8, 0.05, 0.1, w, 0, 0.46, -0.2 + s * 0.13);
for (var b = 0; b < 3; b++)
ghBox(g, 1.8, 0.08, 0.04, w, 0, 0.66 + b * 0.14, -0.28);
[-0.8, 0.8].forEach(function (o) { ghBox(g, 0.06, 0.9, 0.5, ir, o, 0.45, -0.05); });
PP.solids.push({ x: x, z: z, hw: 0.95, hd: 0.35, rot: ry, h: 1 });
},
function (G, x, z, ry, seed) {
var m = ghLam("carrara", 0xF2EEE6, GH_TEX.stone()), S = new THREE.Group();
S.position.set(x, 0, z);
S.rotation.y = ry;
G.add(S);
ghBox(S, 1.2, 1.4, 1.2, m, 0, 0.7, 0, 1);
ghBox(S, 1.4, 0.15, 1.4, m, 0, 1.47, 0);
wCyl(0.28, 0.42, 1.2, m, 0, 2.1, 0, S, 10);
wCyl(0.18, 0.24, 0.6, m, 0, 2.95, 0, S, 10);
wSph(0.16, m, 0, 3.4, 0, S, 10);
var arm = wCyl(0.05, 0.06, 0.7, m, 0.22, 3.2, 0.1, S, 6);
arm.rotation.z = -0.9 - (seed % 3) * 0.3;
wSph(0.12, ghLam("bloom0", 0xC81E3A, null), 0.5, 3.5, 0.12, S, 6);
ppSolidR(x, z, 0.8);
},
function (R, L) {
var g = ghGold(), stone = ghLam("stone", 0xFFFFFF, GH_TEX.stone()), grass = ghLam("grass", 0xFFFFFF, GH_TEX.grass()), gravel = ghLam("gravel", 0xFFFFFF, GH_TEX.gravel()), hedge = ghLam("hedge", 0xFFFFFF, GH_TEX.hedge()), box = ghLam("box", 0xB8D0A8, GH_TEX.hedge());
var bulbs = [], warm = [];
ppWalk(3535, 3640, -60, 60, "hall");
ghFloor(R, 3535, 3640, -60, 60, grass, 3);
var segs = [[-60, -21.5], [-18.5, -11.5], [-8.5, -1.5], [1.5, 8.5], [11.5, 18.5], [21.5, 60]];
segs.forEach(function (S) { ghPlane(R, S[1] - S[0], 14, 4, 4, stone, 3535.2, 7, (S[0] + S[1]) / 2, Math.PI / 2); });
[-20, -10, 0, 10, 20].forEach(function (dz) {
ghPlane(R, 3, 8.5, 3, 4, stone, 3535.2, 9.75, dz, Math.PI / 2);
ghDoorFrame(R, 3535.4, dz, false, 3, 5.5);
var gw = ghPlane(R, 3.2, 5.6, 3.2, 5.6, ghBasic("doorglow", 0xFFE0A8, { op: 0.18, add: true }), 3535.6, 2.8, dz, Math.PI / 2);
gw.userData.keep = 1;
GH.cand.push([3535.7, 6.4, dz]);
});
ppSolid(3535.2, -40.75, 0.2, 19.25);
ppSolid(3535.2, 40.75, 0.2, 19.25);
ghBox(R, 0.6, 0.6, 120, g, 3535.4, 13.7, 0);
ghBox(R, 0.8, 0.5, 120, stone, 3535.5, 14.25, 0, 2);
for (var bz = -58; bz <= 58; bz += 1)
wCyl(0.11, 0.11, 0.8, stone, 3535.6, 14.9, bz, R, 6);
ghBox(R, 0.5, 0.2, 120, stone, 3535.6, 15.4, 0, 2);
for (var u = -55; u <= 55; u += 10) {
wCyl(0.3, 0.45, 0.6, stone, 3535.6, 15.8, u, R, 10);
wSph(0.4, g, 3535.6, 16.3, u, R, 10);
}
for (var pz = -55; pz <= 55; pz += 5) {
if (Math.abs(pz) < 25 && Math.abs(pz % 10) < 1)
continue;
ghBox(R, 0.4, 12.4, 0.9, stone, 3535.4, 6.2, pz + 2.5, 1);
}
[-50, -40, 30, 40, 50].forEach(function (wz) { ghPlane(R, 2.4, 4.6, 2.4, 4.6, ghBasic("win", 0xFFFFFF, { map: ghWinTex() }), 3535.35, 4.4, wz, Math.PI / 2); ghBox(R, 0.2, 0.3, 3, g, 3535.4, 6.85, wz); });
ghFloor(R, 3535, 3551, -32, 32, ghLam("flags", 0xD8D0C0, GH_TEX.stone()), 2, 0.02);
for (var tb = -31.5; tb <= 31.5; tb += 0.7) {
if (Math.abs(tb) < 5)
continue;
wCyl(0.1, 0.12, 0.8, stone, 3551, 0.4, tb, R, 6);
}
[[-18.25, 26.5], [18.25, 26.5]].forEach(function (q) { ghBox(R, 0.4, 0.15, q[1], stone, 3551, 0.88, q[0]); ppSolid(3551, q[0], 0.2, q[1] / 2); });
[-32, -5, 5, 32].forEach(function (q) { ghBox(R, 0.7, 1.1, 0.7, stone, 3551, 0.55, q, 1); wCyl(0.32, 0.2, 0.5, stone, 3551, 1.35, q, R, 10); wMesh(ghLeafGeo(q + 7, 0.45), ghLam("roseleaf", 0x7AB062, GH_TEX.hedge(), { e: 0x0E2008 }), 3551, 1.8, q, R); wSph(0.09, ghLam("bloom0", 0xC81E3A, null), 3551.2, 2.0, q + 0.2, R, 6); wSph(0.09, ghLam("bloom1", 0xE87A9A, null), 3550.8, 1.95, q - 0.2, R, 6); });
[[3541, -26], [3546, -26], [3541, 26], [3546, 26], [3543.5, -14], [3543.5, 14]].forEach(function (q, i) { ppTable(R, q[0], q[1], 0.55); ghChair(R, q[0] - 0.9, q[1], Math.PI / 2); ghChair(R, q[0] + 0.9, q[1], -Math.PI / 2); if (!GH.lite || i < 2)
GH.cand.push([q[0], 0.78, q[1]]); });
[-30, -15, 15, 30].forEach(function (z) { wCyl(0.06, 0.08, 5, ghLam("iron", 0x1A1A1E, null), 3550, 2.5, z, R, 6); });
for (var s = 0; s < (GH.lite ? 4 : 8); s++) {
var z0 = -28 + s * 8, z1 = z0 + (s % 2 ? -12 : 12);
ghString(bulbs, [3536, 7, z0], [3550, 5, Math.max(-30, Math.min(30, z1))], 0.9, GH.lite ? 0.9 : 0.45);
}
ghFloor(R, 3551, 3640, -3, 3, gravel, 2, 0.02);
ghFloor(R, 3591, 3597, -56, 56, gravel, 2, 0.025);
ghFloor(R, 3551, 3640, -31, -25, gravel, 2, 0.02);
ghFloor(R, 3551, 3640, 25, 31, gravel, 2, 0.02);
[[3556, 3588, -22, -6], [3600, 3634, -22, -6], [3556, 3588, 6, 22], [3600, 3634, 6, 22]].forEach(function (B, bi) {
var cx = (B[0] + B[1]) / 2, cz = (B[2] + B[3]) / 2, w = B[1] - B[0], d = B[3] - B[2];
[[cx, B[2], w, 0.5, true], [cx, B[3], w, 0.5, true], [B[0], cz, d, 0.5, false], [B[1], cz, d, 0.5, false]].forEach(function (e) { if (e[4])
ghBox(R, e[2], 0.6, e[3], box, e[0], 0.3, e[1], 1.2);
else
ghBox(R, e[3], 0.6, e[2], box, e[0], 0.3, e[1], 1.2); });
var ring = wMesh(new THREE.TorusGeometry(Math.min(w, d) * 0.3, 0.25, 6, GH.lite ? 16 : 28), box, cx, 0.25, cz, R);
ring.rotation.x = Math.PI / 2;
ghRoses(R, B[0] + 1, B[1] - 1, B[2] + 1, B[3] - 1, GH.lite ? 14 : 54, 700 + bi * 50);
[[B[0], B[2]], [B[1], B[2]], [B[0], B[3]], [B[1], B[3]]].forEach(function (c) { wMesh(new THREE.ConeGeometry(0.7, 2.6, GH.lite ? 8 : 12), hedge, c[0], 1.3, c[1], R); ppSolidR(c[0], c[1], 0.6); });
ppSolid(cx, cz, w / 2, d / 2, 0, 0.8);
});
wCyl(5.2, 5.4, 0.8, stone, 3594, 0.4, 0, R, GH.lite ? 20 : 36);
var wt = ghWaterTex();
var wm = wMesh(new THREE.CircleGeometry(4.9, GH.lite ? 20 : 36), ghLam("water", 0x8AB8D0, wt, { op: 0.85, e: 0x0A1A24 }), 3594, 0.72, 0, R);
wm.rotation.x = -Math.PI / 2;
GH.water.push(wt);
wCyl(0.5, 0.8, 2.6, stone, 3594, 1.3, 0, R, 12);
wCyl(2.2, 1.4, 0.5, g, 3594, 2.6, 0, R, 20);
wCyl(0.3, 0.45, 1.6, stone, 3594, 3.6, 0, R, 10);
wCyl(1.2, 0.8, 0.35, g, 3594, 4.4, 0, R, 16);
wSph(0.45, g, 3594, 5.0, 0, R, 12);
var jet = wMesh(new THREE.ConeGeometry(1.8, 2.4, 16, 1, true), ghBasic("spray", 0xD8F0FF, { op: 0.22, ds: true }), 3594, 1.6, 0, L);
GH.spray = jet;
ppSolidR(3594, 0, 5.5);
ppSpot({ x: 3594, z: 6.6, r: 2.4, name: "The gilded fountain: toss a coin and make a wish", fn: function () { ghWish("the gilded fountain"); } });
var limes = [];
for (var lx = 3558; lx <= 3634; lx += GH.lite ? 12 : 8) {
[-34, 34].forEach(function (lz) { ghLimeTree(R, lx, lz, 1.2, ppHash("gl" + lx + lz), bulbs); limes.push([lx, lz]); });
}
for (var i2 = 0; i2 < limes.length - 2; i2++) {
var a = limes[i2], b = limes[i2 + 2];
ghString(bulbs, [a[0], 5.4, a[1]], [b[0], 5.4, b[1]], 0.8, GH.lite ? 0.9 : 0.45);
}
[3566, 3582, 3606, 3622].forEach(function (bx) { ghBench(R, bx, -24.2, 0); ghBench(R, bx, 24.2, Math.PI); });
for (var ax = 3604; ax <= 3638; ax += 3.4) {
var arc = wMesh(new THREE.TorusGeometry(2.6, 0.06, 5, GH.lite ? 10 : 18, Math.PI), ghGoldDark(), ax, 1.2, 0, R);
arc.rotation.y = Math.PI / 2;
[-2.6, 2.6].forEach(function (o) { wCyl(0.06, 0.06, 1.2, ghGoldDark(), ax, 0.6, o, R, 5); ppSolidR(ax, o, 0.12); });
for (var k = 0; k < (GH.lite ? 5 : 11); k++) {
var an = k / 10 * Math.PI;
var rx = ax, ry = 1.2 + Math.sin(an) * 2.6, rz = Math.cos(an) * 2.6;
wMesh(ghLeafGeo(k + ax, 0.32), ghLam("roseleaf", 0x7AB062, GH_TEX.hedge(), { e: 0x0E2008 }), rx, ry, rz, R);
for (var bl = 0; bl < (GH.lite ? 1 : 4); bl++) {
var ba = bl * 1.7 + k;
wSph(0.06, ghLam("bloom" + ((k + bl) % 5), [0xC81E3A, 0xE87A9A, 0xF6EEF0, 0xF0A070, 0xA0122A][(k + bl) % 5], null), rx + Math.cos(ba) * 0.32, ry + Math.sin(ba) * 0.22, rz + Math.sin(ba * 1.3) * 0.3, R, 6);
}
bulbs.push([rx - 0.2, ry - 0.1, rz]);
}
}
ghGazebo(R, L, 3572, -46, bulbs);
ppSpot({ x: 3572, z: -41.4, r: 3, name: "The tea pavilion", fn: function () { ppMenu("gala", "The tea pavilion"); } });
PP.staffAt.push({ title: "Banquet server", place: PP_KEYS.hall, x: 3574, z: -47, ry: Math.PI, seed: "tea" });
ghOak(R, 3620, 46, bulbs);
var sw = new THREE.Group();
sw.position.set(3620, 6.4, 41.4);
L.add(sw);
GH.swing = sw;
[-0.6, 0.6].forEach(function (o) { wCyl(0.02, 0.02, 5.6, ghLam("rope", 0xC8B890, null), o, -2.8, 0, sw, 4); });
ghBox(sw, 1.5, 0.08, 0.45, ghLam("benchw", 0xE8E2D4, null), 0, -5.6, 0);
for (var fl = 0; fl < (GH.lite ? 4 : 12); fl++)
wSph(0.08, ghLam("bloom" + (fl % 5), [0xC81E3A, 0xE87A9A, 0xF6EEF0, 0xF0A070, 0xA0122A][fl % 5], null), fl < 6 ? -0.6 : 0.6, -0.6 - (fl % 6) * 0.85, 0.02, sw, 6);
ppSpot({ x: 3620, z: 39, r: 2.4, name: "The swing under the old oak", fn: function () { GH.swingPush = 6; setStatus("<b>The swing under the old oak.</b> Up into the fairy lights and back, the whole garden swaying under you."); } });
ghMarbleStatue(R, 3594, -54, 0, 1);
ghMarbleStatue(R, 3594, 54, Math.PI, 2);
ghMarbleStatue(R, 3556, -50, Math.PI / 4, 3);
ghMarbleStatue(R, 3556, 50, -Math.PI / 4, 4);
for (var lp = 3560; lp <= 3600; lp += 10)
[-4.2, 4.2].forEach(function (o) { var ir = ghLam("iron", 0x1A1A1E, null); wCyl(0.06, 0.1, 3.2, ir, lp, 1.6, o, R, 6); wSph(0.24, ghBasic("globe", 0xFFE8B8), lp, 3.4, o, R, 10); var gl = wGlow(0xFFD890, 2.2, 0.32); gl.position.set(lp, 3.4, o); L.add(gl); ppSolidR(lp, o, 0.15); });
[[3588, -60, 104, true], [3588, 60, 104, true]].forEach(function (H) { ghBox(R, H[2], 3.4, 1.6, hedge, H[0], 1.7, H[1], 2); ppSolid(H[0], H[1], H[2] / 2, 0.8); });
[[-31, 58], [31, 58]].forEach(function (H) { var z0 = H[0] < 0 ? -60 : 4, z1 = H[0] < 0 ? -4 : 60; ghBox(R, 1.6, 3.4, z1 - z0, hedge, 3640, 1.7, (z0 + z1) / 2, 2); ppSolid(3640, (z0 + z1) / 2, 0.8, (z1 - z0) / 2); });
var ga = wMesh(new THREE.TorusGeometry(2.6, 0.14, 6, 20, Math.PI), g, 3640, 3.2, 0, R);
ga.rotation.y = Math.PI / 2;
[-2.6, 2.6].forEach(function (o) { wCyl(0.12, 0.14, 3.2, g, 3640, 1.6, o, R, 8); wSph(0.22, g, 3640, 3.3, o, R, 8); });
ppSign(R, ["THE LABYRINTH", "the fairies' garden · find the heart"], 3.6, 0.9, 3639.2, 6.3, 0, -Math.PI / 2, "#0E1A12", "#F2D08A");
ghBackdropTrees(R);
ghBulbs(L, bulbs, "garden");
PP.music.push({ k: "pp-garden", zone: "hall", x: 3600, z: 0, r: 40, C: { bpm: 60, band: true } });
var ng = GH.lite ? 4 : 10;
for (var p = 0; p < ng; p++) {
var x = 3556 + (p * 13) % 80, z = (p % 4 < 2 ? -28 : 28) + ((p % 3) - 1) * 1.2;
var gp = ghGuest("gard" + p, p + 2);
gp.position.set(x, 0, z);
gp.rotation.y = p % 2 ? Math.PI / 2 : -Math.PI / 2;
L.add(gp);
GH.people.push({ g: gp, zone: "hall", x: x, z: z, wander: { r: 4 } });
}
},
function (R, L, x, z, bulbs) {
var g = ghGold(), w = ghLam("benchw", 0xF4F0E8, null);
wCyl(5, 5.2, 0.5, ghLam("stone", 0xFFFFFF, GH_TEX.stone()), x, 0.25, z, R, 16);
PP.pads.push({ x0: x - 3.4, x1: x + 3.4, z0: z - 3.4, z1: z + 3.4, h: 0.5 });
for (var c = 0; c < 8; c++) {
var a = c / 8 * Math.PI * 2, cx = x + Math.cos(a) * 4.4, cz = z + Math.sin(a) * 4.4;
wCyl(0.14, 0.16, 3.6, w, cx, 2.3, cz, R, 8);
if (c !== 2)
ppSolidR(cx, cz, 0.2);
}
var dome = wMesh(new THREE.ConeGeometry(5.4, 2.6, 8), w, x, 5.4, z, R);
wSph(0.4, g, x, 6.9, z, R, 10);
wMesh(new THREE.TorusGeometry(5, 0.12, 4, 8), g, x, 4.1, z, R).rotation.x = Math.PI / 2;
for (var b = 0; b < (GH.lite ? 16 : 40); b++) {
var a2 = b / (GH.lite ? 16 : 40) * Math.PI * 2;
bulbs.push([x + Math.cos(a2) * 5, 4.0, z + Math.sin(a2) * 5]);
}
ppTable(R, x, z, 0.8, 0.5);
ghChair(R, x - 1.2, z, Math.PI / 2, 0.5);
ghChair(R, x + 1.2, z, -Math.PI / 2, 0.5);
wCyl(0.12, 0.1, 0.18, ghLam("china", 0xF8F4F0, null), x, 1.2, z, R, 8);
for (var c2 = 0; c2 < 4; c2++)
wCyl(0.05, 0.04, 0.06, ghLam("china", 0xF8F4F0, null), x + Math.cos(c2 * 1.6) * 0.45, 1.15, z + Math.sin(c2 * 1.6) * 0.45, R, 6);
ppSolidR(x, z, 1.0);
},
function (R, x, z, bulbs) {
var bark = ghLam("bark", 0x4A3A2A, null), rnd = ppRand(4242);
wCyl(0.9, 1.4, 7, bark, x, 3.5, z, R, 10);
var limbs = [[4, 6.2, 3], [-4, 6.6, 2], [1, 7, -5], [-2, 7.4, 4.5], [3, 7.2, -2]];
limbs.forEach(function (l, i) { var len = Math.hypot(l[0], l[2], 2), lm = wCyl(0.25, 0.5, len + 1, bark, x + l[0] / 2, l[1] - 0.5, z + l[2] / 2, R, 7); lm.rotation.z = -Math.atan2(l[0], 3); lm.rotation.x = Math.atan2(l[2], 3); });
for (var c = 0; c < (GH.lite ? 7 : 16); c++) {
var a = rnd() * 6.28, d = rnd() * 6, y = 7.5 + rnd() * 4;
wMesh(ghLeafGeo(c + 90, 2 + rnd() * 1.4), ghLam("leaf" + (c % 4), [0x2E5A2A, 0x386A30, 0x2A5226, 0x40722E][c % 4], null), x + Math.cos(a) * d, y, z + Math.sin(a) * d, R);
}
var br = wCyl(0.22, 0.3, 5, bark, x, 6.5, z - 3, R, 7);
br.rotation.x = Math.PI / 2;
for (var b = 0; b < (GH.lite ? 20 : 60); b++) {
var t = b / (GH.lite ? 20 : 60), a2 = t * Math.PI * 2 * 3, rr = 3 + t * 4;
bulbs.push([x + Math.cos(a2) * rr, 6.4 + Math.sin(t * 9) * 1.5 + t * 2, z + Math.sin(a2) * rr]);
}
ppSolidR(x, z, 1.3);
},
function (R) {
var m = ghLam("darkwood", 0x0E1A12, null), tr = ghLam("darktrunk", 0x1A140E, null), rnd = ppRand(99);
var spots = [];
for (var x = 3540; x <= 3780; x += GH.lite ? 18 : 10) {
spots.push([x, -72 - rnd() * 16]);
spots.push([x, 72 + rnd() * 16]);
}
for (var z = -60; z <= 60; z += GH.lite ? 18 : 10) {
spots.push([3756 + rnd() * 14, z]);
}
spots.forEach(function (s, i) { var h = 12 + rnd() * 10; wCyl(0.5, 0.7, h * 0.5, tr, s[0], h * 0.25, s[1], R, 6); wMesh(ghLeafGeo(i + 200, 4 + rnd() * 3), m, s[0], h * 0.7, s[1], R); if (!GH.lite)
wMesh(ghLeafGeo(i + 300, 3 + rnd() * 2), m, s[0] + 2, h * 0.9, s[1] + 1, R); });
for (var k = 0; k < 12; k++) {
var a = -Math.PI / 2 + (k / 11 - 0.5) * Math.PI * 1.6, hx = 3660 + Math.cos(a) * 420, hz = Math.sin(a) * 420;
var hill = wMesh(new THREE.SphereGeometry(120, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), ghLam("hill", 0x141E1E, null), hx, -20, hz, R);
hill.scale.y = 0.35 + rnd() * 0.3;
}
},
function (where) {
var lines = ["The coin turns over in the light and drops without a sound. A fairy darts down after it.", "Ripples run out to the rim. Somewhere in the hedges, someone laughs.", "Pixie dust rises off the water where the coin went in, gold and slow.", "The fairies go quiet for a moment, as if they are listening to your wish."];
GH.burst = (GH.burst || 0) + 60;
setStatus("<b>A wish at " + esc(where) + ".</b> " + lines[(Math.random() * lines.length) | 0]);
if (typeof playTone === "function") {
playTone(1046, 0.2);
setTimeout(function () { playTone(1318, 0.3); }, 160);
}
},
function () {
var N = GH_MAZE.n, R = ppRand(ppHash("gh-maze-1123")), E = [], S = [], seen = [];
for (var i = 0; i < N * N; i++) {
E.push(true);
S.push(true);
seen.push(false);
}
var st = [[0, 12]];
seen[12 * N + 0] = true;
while (st.length) {
var c = st[st.length - 1], x = c[0], z = c[1], nb = [];
[[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) { var nx = x + d[0], nz = z + d[1]; if (nx >= 0 && nx < N && nz >= 0 && nz < N && !seen[nz * N + nx])
nb.push([nx, nz, d]); });
if (!nb.length) {
st.pop();
continue;
}
var p = nb[(R() * nb.length) | 0], d2 = p[2];
if (d2[0] === 1)
E[z * N + x] = false;
else if (d2[0] === -1)
E[z * N + x - 1] = false;
else if (d2[1] === 1)
S[z * N + x] = false;
else
S[(z - 1) * N + x] = false;
seen[p[1] * N + p[0]] = true;
st.push([p[0], p[1]]);
}
for (var hz = 10; hz <= 14; hz++)
for (var hx = 10; hx <= 14; hx++) {
if (hx < 14)
E[hz * N + hx] = false;
if (hz < 14)
S[hz * N + hx] = false;
}
[[5, 6], [18, 8], [7, 19], [20, 17]].forEach(function (q) { E[q[1] * N + q[0]] = false; });
return { E: E, S: S };
},
function (R, L) {
var M = GH_MAZE, N = M.n, C = M.c, hedge = ghLam("hedge", 0xFFFFFF, GH_TEX.hedge()), top = ghLam("hedgetop", 0xB8D8A8, GH_TEX.hedge()), grass = ghLam("grass", 0xFFFFFF, GH_TEX.grass()), g = ghGold(), bulbs = [], cells = ghMazeCells(), H = 2.8, T = 0.9;
ppWalk(M.x0, M.x0 + N * C, M.z0, M.z0 + N * C, "hall");
ghFloor(R, M.x0, M.x0 + N * C, M.z0, M.z0 + N * C, grass, 3, 0.0);
var rnd = ppRand(321), nw = 0;
function wall(x0, z0, x1, z1) {
var cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, lx = Math.abs(x1 - x0) + T, lz = Math.abs(z1 - z0) + T;
ghBox(R, lx, H, lz, hedge, cx, H / 2, cz, 2);
ppSolid(cx, cz, lx / 2, lz / 2);
if (!GH.lite && rnd() < 0.55) {
var tw = wMesh(ghLeafGeo(nw, 0.7), top, cx + (rnd() - 0.5) * (lx - 1), H - 0.05, cz + (rnd() - 0.5) * (lz - 1), R);
}
if (rnd() < (GH.lite ? 0.12 : 0.32)) {
var n = Math.round(Math.max(lx, lz) / 0.6);
for (var i = 0; i <= n; i++) {
var f = i / n;
bulbs.push([x0 + (x1 - x0) * f, H + 0.12, z0 + (z1 - z0) * f]);
}
}
nw++;
}
for (var z = 0; z < N; z++)
for (var x = 0; x < N; x++) {
var X = M.x0 + x * C, Z = M.z0 + z * C;
if (cells.E[z * N + x] && !(x === N - 1 && false))
wall(X + C, Z, X + C, Z + C);
if (cells.S[z * N + x])
wall(X, Z + C, X + C, Z + C);
}
for (var k = 0; k < N; k++) {
wall(M.x0 + k * C, M.z0, M.x0 + (k + 1) * C, M.z0);
if (k !== 12)
wall(M.x0, M.z0 + k * C, M.x0, M.z0 + (k + 1) * C);
}
for (var lq = 0; lq < (GH.lite ? 10 : 28); lq++) {
var lx = M.x0 + ((lq * 7) % N) * C + C / 2, lz = M.z0 + ((lq * 11 + 3) % N) * C + C / 2;
if (Math.abs(lx - 3690) < 12 && Math.abs(lz) < 12)
continue;
wCyl(0.04, 0.05, 1.6, ghLam("iron", 0x1A1A1E, null), lx + 1.6, 0.8, lz, R, 5);
wSph(0.16, ghBasic("globe", 0xFFE8B8), lx + 1.6, 1.7, lz, R, 8);
GH.cand.push([lx + 1.6, 1.7, lz]);
ppSolidR(lx + 1.6, lz, 0.1);
}
ghBulbs(L, bulbs, "maze", 0xFFE0B0);
ghHeart(R, L);
ghFairies(L);
ppSpot({ x: 3642.5, z: 0, r: 2.2, name: "The Labyrinth: the fairies' garden", fn: function () { setStatus("<b>The Labyrinth.</b> Yew walls taller than you, fairy lights along their tops, and somewhere in the middle the heart of it: a rotunda, a love seat and a wishing fountain. Follow the fairies: they like the middle best."); } });
},
function (R, L) {
var cx = 3690, cz = 0, g = ghGold(), marble = ghLam("carrara", 0xF2EEE6, GH_TEX.stone()), bulbs = [];
ghFloor(R, cx - 10, cx + 10, cz - 10, cz + 10, ghLam("gravel", 0xFFFFFF, GH_TEX.gravel()), 2, 0.02);
var lawn = wMesh(new THREE.CircleGeometry(9, 32), ghLam("grass", 0xFFFFFF, GH_TEX.grass()), cx, 0.03, cz, R);
lawn.rotation.x = -Math.PI / 2;
var rx = cx, rz = cz - 2.5;
wCyl(4.2, 4.4, 0.45, marble, rx, 0.22, rz, R, 24);
PP.pads.push({ x0: rx - 3.2, x1: rx + 3.2, z0: rz - 3.2, z1: rz + 3.2, h: 0.45 });
for (var c = 0; c < 8; c++) {
var a = c / 8 * Math.PI * 2 + Math.PI / 8, px = rx + Math.cos(a) * 3.6, pz = rz + Math.sin(a) * 3.6;
ghColumn(R, px, pz, 4.8, 0.22, marble, 0.45);
if (Math.abs(Math.sin(a) - 1) > 0.2)
ppSolidR(px, pz, 0.3);
for (var b = 0; b < 6; b++)
bulbs.push([px + Math.cos(a + 1.57) * 0.25, 0.8 + b * 0.75, pz + Math.sin(a + 1.57) * 0.25]);
}
wCyl(4.1, 4.1, 0.6, marble, rx, 5.55, rz, R, 24);
var dm = wMesh(new THREE.SphereGeometry(4.1, GH.lite ? 16 : 28, 10, 0, Math.PI * 2, 0, Math.PI / 2), g, rx, 5.85, rz, R);
dm.scale.y = 0.6;
wSph(0.35, g, rx, 8.4, rz, R, 10);
for (var d = 0; d < (GH.lite ? 18 : 40); d++) {
var a2 = d / (GH.lite ? 18 : 40) * Math.PI * 2;
bulbs.push([rx + Math.cos(a2) * 4.15, 5.2, rz + Math.sin(a2) * 4.15]);
}
var ls = new THREE.Group();
ls.position.set(rx, 0.45, rz - 0.8);
R.add(ls);
var vel = ghLam("rosevel", 0xC8506A, GH_TEX.velvet());
ghBox(ls, 2.2, 0.45, 0.9, vel, 0, 0.25, 0);
var back = wMesh(new THREE.CylinderGeometry(1.3, 1.3, 1, 16, 1, true, -Math.PI * 0.35, Math.PI * 0.7), vel, 0, 0.75, 0.8, ls);
back.rotation.y = Math.PI;
[-1.15, 1.15].forEach(function (o) { wSph(0.28, vel, o, 0.55, 0, ls, 8); wSph(0.12, g, o, 0.85, 0, ls, 8); });
PP.solids.push({ x: rx, z: rz - 0.8, hw: 1.1, hd: 0.45, h: 1.4 });
for (var fl = 0; fl < (GH.lite ? 8 : 22); fl++) {
var a3 = Math.PI * (0.15 + fl / 22 * 0.7);
wSph(0.09, ghLam("bloom" + (fl % 5), [0xC81E3A, 0xE87A9A, 0xF6EEF0, 0xF0A070, 0xA0122A][fl % 5], null), rx + Math.cos(a3) * 1.35, 1.7 + Math.sin(fl) * 0.1, rz - 0.8 - Math.sin(a3) * 0.2 - 0.6, R, 6);
}
ppSpot({ x: rx, z: rz + 1.2, y: 0.45, r: 2.2, name: "The love seat at the heart of the Labyrinth", fn: function () {
GH.burst = (GH.burst || 0) + 90;
GH.heartFair = 8;
setStatus("<b>The love seat.</b> The fairies come in close and circle you both, slow, scattering gold. From here the whole Labyrinth is quiet except for the fountain.");
} });
var fx = cx, fz = cz + 6.5;
wCyl(2, 2.1, 0.7, marble, fx, 0.35, fz, R, 20);
var wt = ghWaterTex();
var wm = wMesh(new THREE.CircleGeometry(1.8, 20), ghLam("water", 0x8AB8D0, wt, { op: 0.85, e: 0x0A1A24 }), fx, 0.66, fz, R);
wm.rotation.x = -Math.PI / 2;
wCyl(0.25, 0.35, 1.6, marble, fx, 1.3, fz, R, 10);
ghStatue(R, fx, 2.1, fz, 0.55, Math.PI);
ppSolidR(fx, fz, 2.2);
ppSpot({ x: fx, z: fz - 2.9, r: 2, name: "The wishing fountain", fn: function () { ghWish("the heart of the Labyrinth"); } });
for (var r2 = 0; r2 < (GH.lite ? 14 : 30); r2++) {
var a4 = r2 / (GH.lite ? 14 : 30) * Math.PI * 2;
if (Math.abs(Math.cos(a4) + 1) < 0.12)
continue;
ghRoses(R, cx + Math.cos(a4) * 9.2 - 0.3, cx + Math.cos(a4) * 9.2 + 0.3, cz + Math.sin(a4) * 9.2 - 0.3, cz + Math.sin(a4) * 9.2 + 0.3, 1, 900 + r2);
}
for (var t = 0; t < (GH.lite ? 7 : 13); t++) {
var a5 = t / 13 * Math.PI * 2, tx = cx + 5 + Math.cos(a5) * 2.2, tz = cz + 3 + Math.sin(a5) * 2.2;
wCyl(0.05, 0.07, 0.3, ghLam("stalk", 0xF0E8D8, null), tx, 0.15, tz, R, 6);
var cap = wMesh(new THREE.SphereGeometry(0.16, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), ghLam("capglow", 0xE8A0D8, null, { e: 0x5A2A6A }), tx, 0.3, tz, R);
var gl = wGlow(0xD8A0FF, 0.8, 0.25);
gl.position.set(tx, 0.4, tz);
L.add(gl);
PP.glows.push({ m: gl, base: 0.22, amp: 0.06, sp: 0.08, ph: t });
}
ghBulbs(L, bulbs, "heart", 0xFFE8C0);
var hg = wGlow(0xFFE0B0, 14, 0.12);
hg.position.set(cx, 3, cz);
L.add(hg);
PP.glows.push({ m: hg, base: 0.11, amp: 0.03, sp: 0.06 });
},
function (L) {
var c = new THREE.Vector3(3660, 0, 0), S = new THREE.Group();
S.position.copy(c);
L.add(S);
S.userData.keep = 1;
var sky = wTex(16, 256, function (x, W, H) { var g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#0A0628"); g.addColorStop(0.45, "#1E0E44"); g.addColorStop(0.5, "#3A1E52"); g.addColorStop(1, "#1A0E26"); x.fillStyle = g; x.fillRect(0, 0, W, H); });
var dome = wMesh(new THREE.SphereGeometry(1300, 24, 16), new THREE.MeshBasicMaterial({ map: sky, side: THREE.BackSide, fog: false, depthWrite: false }), 0, 0, 0, S);
dome.renderOrder = -10;
var st = wPoints(GH.lite ? 700 : 1800, function () { var u = Math.random(), a = Math.random() * Math.PI * 2, r = 1200, s = Math.sqrt(1 - u * u); return [Math.cos(a) * s * r, u * r * 0.95 + 30, Math.sin(a) * s * r]; }, 0xF4ECFF, 1.5, false);
st.material.fog = false;
S.add(st);
var gp = new THREE.Group();
gp.position.set(260, 330, -1000);
S.add(gp);
var gt = wTex(256, 128, function (x, W, H) { for (var y = 0; y < H; y++) {
var v = y / H, b = Math.sin(v * 22 + Math.sin(v * 7) * 2) * 0.5 + 0.5;
x.fillStyle = "rgb(" + (150 + b * 80 | 0) + "," + (90 + b * 60 | 0) + "," + (170 + b * 50 | 0) + ")";
x.fillRect(0, y, W, 1);
} });
wMesh(new THREE.SphereGeometry(190, 32, 20), new THREE.MeshBasicMaterial({ map: gt, fog: false, color: 0xC8B8D8 }), 0, 0, 0, gp);
var ring = wMesh(new THREE.RingGeometry(250, 380, 64), new THREE.MeshBasicMaterial({ color: 0xE0C8E8, transparent: true, opacity: 0.45, side: THREE.DoubleSide, fog: false, depthWrite: false }), 0, 0, 0, gp);
ring.rotation.x = Math.PI / 2.4;
ring.rotation.y = 0.3;
[[-500, 420, -700, 34, 0xF0E8F8], [620, 260, -560, 20, 0xF8E0C8]].forEach(function (m) { wSph(m[3], new THREE.MeshBasicMaterial({ color: m[4], fog: false }), m[0], m[1], m[2], S, 20); var gl = wGlow(m[4], m[3] * 6, 0.25); gl.position.set(m[0], m[1], m[2]); S.add(gl); });
},
function () {
return ghTexOf("spark", function (x, W, H) {
var g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2);
g.addColorStop(0, "rgba(255,255,255,1)");
g.addColorStop(0.25, "rgba(255,240,200,.8)");
g.addColorStop(1, "rgba(255,220,150,0)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(255,255,255,.7)";
x.fillRect(W / 2 - 0.5, 4, 1, H - 8);
x.fillRect(4, H / 2 - 0.5, W - 8, 1);
}, 32, 32, true);
},
function (L) {
var lite = ghLite(), n = lite ? 10 : 34, rnd = ppRand(1717), wingMat = new THREE.MeshBasicMaterial({ map: GH_TEX.wing(), transparent: true, side: THREE.DoubleSide, depthWrite: false, fog: false });
var wg = new THREE.PlaneGeometry(0.26, 0.13).translate(0.13, 0, 0), wg2 = new THREE.PlaneGeometry(0.18, 0.1).translate(0.09, 0, 0);
GH.fairies = [];
for (var i = 0; i < n; i++) {
var col = GH_FAIRY_COLS[i % GH_FAIRY_COLS.length], F = new THREE.Group();
L.add(F);
wSph(0.045, ghBasic("fbody" + (i % 5), 0xFFF8F0, { fog: false }), 0, 0.05, 0, F, 8);
var dr = wMesh(new THREE.ConeGeometry(0.06, 0.16, 8), ghBasic("fdress" + (i % 5), col, { fog: false }), 0, -0.05, 0, F);
var gl = wGlow(col, lite ? 0.7 : 0.95, 0.6);
F.add(gl);
var wings = [];
[[1, wg, 0.02], [-1, wg, 0.02], [1, wg2, -0.05], [-1, wg2, -0.05]].forEach(function (w) {
var p = new THREE.Group();
p.position.set(0, 0.06 + w[2], -0.02);
F.add(p);
var m = new THREE.Mesh(w[1], wingMat);
m.rotation.z = (w[2] > 0 ? 0.35 : -0.3);
if (w[0] < 0) {
m.rotation.y = Math.PI;
}
p.add(m);
p.userData.side = w[0];
wings.push(p);
});
var home = i < n * 0.55 ? [3690, 0, 4 + rnd() * 8, 1.2 + rnd() * 3.2] : (i % 3 === 0 ? [3594, 0, 7 + rnd() * 5, 2 + rnd() * 2.5] : [3570 + rnd() * 60, (rnd() < 0.5 ? -28 : 28), 3 + rnd() * 5, 2.5 + rnd() * 2.5]);
GH.fairies.push({ g: F, w: wings, gl: gl, cx: home[0], cz: home[1], r: home[2], h: home[3], sp: (0.12 + rnd() * 0.18) * (rnd() < 0.5 ? -1 : 1), ph: rnd() * 6.28, fl: 7 + rnd() * 5, px: home[0], pz: home[1] });
}
var N = lite ? 260 : 900, pos = new Float32Array(N * 3), col = new Float32Array(N * 3), geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
var pm = new THREE.PointsMaterial({ size: lite ? 0.12 : 0.09, map: ghSparkTex(), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true, fog: false });
var pts = new THREE.Points(geo, pm);
pts.frustumCulled = false;
pts.userData.noCull = true;
L.add(ppKeep(pts));
var P = [];
for (var k = 0; k < N; k++) {
P.push({ age: rnd() * 5, life: 3 + rnd() * 4, vx: 0, vy: 0, vz: 0, x: 3690, y: -50, z: 0, c: [[1, 0.86, 0.5], [1, 0.75, 0.92], [0.9, 0.95, 1], [1, 0.95, 0.7]][k % 4] });
pos[k * 3 + 1] = -50;
}
GH.dust = { pts: pts, geo: geo, P: P, N: N, skip: 0 };
},
function (dt) {
var t = (GH.t += dt), L = worldLocal(), Z = PP.zone, lite = ghLite();
GH.twAt = (GH.twAt || 0) - dt;
if (GH.twAt <= 0) {
GH.twAt = lite ? 0.4 : 0.2;
var c = GH._c || (GH._c = new THREE.Color());
GH.bulbs.forEach(function (B) {
if (Z === "hall" ? B.zone === "out" : B.zone !== "out")
return;
if (!B.m.parent)
return;
for (var i = 0; i < B.n; i += (lite ? 2 : 1)) {
var k = 0.86 + 0.14 * Math.sin(t * 1.05 + B.ph[i]);
c.copy(B.col).multiplyScalar(k);
B.m.setColorAt(i, c);
if (lite && i + 1 < B.n)
B.m.setColorAt(i + 1, c);
}
if (B.m.instanceColor)
B.m.instanceColor.needsUpdate = true;
});
}
if (Z !== "hall")
return;
if (!GH.envDone && !lite && !GH.noReflect) {
GH.envWait = (GH.envWait || 0) + dt;
if (GH.envWait > 1.2) {
GH.envDone = true;
GH.envWait = 0;
ghReflect();
}
}
GH.water.forEach(function (w) { w.offset.x += dt * 0.018; w.offset.y += dt * 0.011; });
if (GH.spray)
GH.spray.scale.set(1, 1 + Math.sin(t * 0.9) * 0.06, 1);
if (GH.swing) {
GH.swingPush = Math.max(0, (GH.swingPush || 0) - dt * 0.5);
var amp = 0.06 + Math.min(0.42, GH.swingPush * 0.08);
GH.swing.rotation.x = Math.sin(t * 1.25) * amp;
}
var near = L.x > 3520 && ghIsOpen(Math.max(L.x, 3537), L.z);
if (!near)
return;
var heart = GH.heartFair = Math.max(0, (GH.heartFair || 0) - dt);
GH.fairies.forEach(function (F, i) {
var r = F.r, cx = F.cx, cz = F.cz, h = F.h;
if (heart > 0 && cx === 3690) {
var k = Math.min(1, heart / 2);
r = r * (1 - k) + 1.8 * k;
cz = cz * (1 - k) + (-3.3) * k;
h = h * (1 - k) + 1.7 * k;
}
var a = t * F.sp + F.ph, x = cx + Math.cos(a) * r + Math.sin(a * 2.3) * r * 0.18, z = cz + Math.sin(a) * r * 0.8 + Math.cos(a * 1.7) * r * 0.15, y = h + Math.sin(t * 0.8 + F.ph) * 0.45;
F.g.position.set(x, y, z);
F.g.rotation.y = Math.atan2(x - F.px, z - F.pz) + Math.PI;
F.px = x;
F.pz = z;
var fl = Math.sin(t * F.fl * 6.28 / 6 + F.ph);
F.w.forEach(function (w) { w.rotation.y = w.userData.side * (0.25 + fl * 0.55); });
});
var D = GH.dust;
if (!D)
return;
D.skip = (D.skip + 1) % (lite ? 2 : 1);
if (D.skip)
return;
var step = dt * (lite ? 2 : 1), pos = D.geo.attributes.position.array, col = D.geo.attributes.color.array, nf = GH.fairies.length, burst = GH.burst || 0;
for (var k = 0; k < D.N; k++) {
var p = D.P[k];
p.age += step;
if (p.age >= p.life) {
if (burst > 0) {
burst--;
ghDustSpawn(p, L.x + (Math.random() - 0.5) * 1.5, camera.position.y - 0.9, L.z + (Math.random() - 0.5) * 1.5, true);
}
else if (nf) {
var F = GH.fairies[(Math.random() * nf) | 0].g.position;
ghDustSpawn(p, F.x, F.y - 0.05, F.z, false);
}
}
p.vy -= (p.vy > -0.2 ? 0.08 : 0) * step;
p.x += p.vx * step + Math.sin(t * 0.7 + k) * 0.02 * step;
p.y += p.vy * step;
p.z += p.vz * step;
var f = Math.max(0, Math.sin(Math.PI * Math.min(1, p.age / p.life)));
pos[k * 3] = p.x;
pos[k * 3 + 1] = p.y;
pos[k * 3 + 2] = p.z;
col[k * 3] = p.c[0] * f;
col[k * 3 + 1] = p.c[1] * f;
col[k * 3 + 2] = p.c[2] * f;
}
GH.burst = burst;
D.geo.attributes.position.needsUpdate = true;
D.geo.attributes.color.needsUpdate = true;
},
function () {
try {
if (typeof renderer === "undefined" || !renderer || !THREE.CubeCamera || !THREE.WebGLCubeRenderTarget)
return;
if (GH.envRT) {
GH.envRT.dispose();
GH.envRT = null;
}
var rt = new THREE.WebGLCubeRenderTarget(128, { generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter }), cc = new THREE.CubeCamera(0.5, 400, rt);
var B = PP.g ? PP.g.getWorldPosition(new THREE.Vector3()) : new THREE.Vector3(PP.base, 0, 0);
cc.position.set(B.x + 3500, 6, B.z + 0);
scene.add(cc);
var lv = GH.L, was = lv ? lv.visible : false;
if (lv)
lv.visible = false;
try {
cc.update(renderer, scene);
}
finally {
if (lv)
lv.visible = was;
scene.remove(cc);
}
GH.envRT = rt;
GH.gilt.forEach(function (o) { o.m.envMap = rt.texture; o.m.combine = THREE.MixOperation; o.m.reflectivity = o.r; o.m.needsUpdate = true; });
}
catch (e) {
console.warn("gilded hall reflect", e);
}
}
];
});
