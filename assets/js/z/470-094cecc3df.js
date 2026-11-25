/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(470, function () {
return [
function (x, W, H, rows, cols, base, vary, mortar, seed, moss) {
x.fillStyle = mortar;
x.fillRect(0, 0, W, H);
var R = wRand(seed || 5), bh = H / rows;
for (var r = 0; r < rows; r++) {
var off = (r % 2) * (W / cols) / 2, y = r * bh;
for (var c = -1; c <= cols; c++) {
var bx = c * W / cols + off, bw = W / cols, v = Math.round((R() - 0.5) * vary);
var b = base.map(function (q) { return Math.max(0, Math.min(255, q + v)); });
x.fillStyle = "rgb(" + b.join(",") + ")";
x.fillRect(bx + 2, y + 2, bw - 4, bh - 4);
var gr = x.createLinearGradient(0, y, 0, y + bh);
gr.addColorStop(0, "rgba(255,255,255,.05)");
gr.addColorStop(1, "rgba(0,0,0,.22)");
x.fillStyle = gr;
x.fillRect(bx + 2, y + 2, bw - 4, bh - 4);
}
}
poeNz(x, W, H, 4000, 0.25, seed + 1);
if (moss) {
x.fillStyle = "rgba(46,60,30,.35)";
for (var m = 0; m < 60; m++)
x.fillRect(R() * W, H * 0.6 + R() * H * 0.4, 4 + R() * 14, 2 + R() * 5);
}
},
function (x, W, H) {
poeBlocks(x, W, H, 6, 2, [52, 50, 48], 22, "#121110", 13, true);
x.strokeStyle = "rgba(10,8,6,.7)";
x.lineWidth = 6;
x.beginPath();
x.moveTo(W * 0.2, H);
x.lineTo(W * 0.2, H * 0.42);
x.quadraticCurveTo(W * 0.2, H * 0.12, W * 0.5, H * 0.05);
x.quadraticCurveTo(W * 0.8, H * 0.12, W * 0.8, H * 0.42);
x.lineTo(W * 0.8, H);
x.stroke();
x.strokeStyle = "rgba(120,110,96,.18)";
x.lineWidth = 2;
x.stroke();
poeStain(x, W, H, 6, 14, "6,8,4", 0.4);
},
function (x, W, H) {
x.fillStyle = "#2A1C16";
x.fillRect(0, 0, W, H);
var R = wRand(15), bh = H / 26, bw = bh * 3.1;
for (var r = 0, y = 0; y < H; r++, y += bh) {
var off = (r % 2) ? bw / 2 : 0;
for (var bx = -off; bx < W; bx += bw) {
var k = R();
x.fillStyle = k < 0.45 ? "#5E3426" : k < 0.85 ? "#4A2A20" : "#6E4232";
x.fillRect(bx + 1, y + 1, bw - 2, bh - 2);
}
}
poeNz(x, W, H, 3000, 0.3, 16);
poeStain(x, W, H, 10, 17, "10,14,8", 0.35);
},
function (x, W, H) {
x.fillStyle = "#3A0E1C";
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(120,40,60,.55)";
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++) {
var cx = i * W / 2 + W / 4, cy = j * H / 2 + H / 4;
x.beginPath();
x.ellipse(cx, cy, W * 0.08, H * 0.17, 0, 0, 7);
x.fill();
for (var k = 0; k < 6; k++) {
var a = k / 6 * Math.PI * 2;
x.beginPath();
x.ellipse(cx + Math.cos(a) * W * 0.12, cy + Math.sin(a) * H * 0.12, W * 0.05, H * 0.02, a, 0, 7);
x.fill();
}
}
x.fillStyle = "rgba(200,150,60,.12)";
for (var s = 0; s < 2; s++)
x.fillRect(s * W / 2, 0, 2, H);
poeNz(x, W, H, 2000, 0.2, 18);
poeStain(x, W, H, 3, 19, "0,0,0", 0.3);
},
function (x, W, H) {
x.fillStyle = "#2A2418";
x.fillRect(0, 0, W, H);
var R = wRand(20);
for (var i = 0; i < 14; i++) {
x.fillStyle = ["rgba(60,50,30,.7)", "rgba(40,50,40,.7)", "rgba(80,40,30,.6)", "rgba(30,30,40,.7)"][i % 4];
x.beginPath();
x.ellipse(R() * W, H * 0.3 + R() * H * 0.6, 30 + R() * 80, 20 + R() * 60, 0, 0, 7);
x.fill();
}
x.strokeStyle = "rgba(150,120,70,.35)";
x.lineWidth = 8;
x.strokeRect(8, 8, W - 16, H - 16);
for (var y = 0; y < H; y += 3) {
x.fillStyle = "rgba(0,0,0," + (0.05 + (y % 6 ? 0 : 0.08)) + ")";
x.fillRect(0, y, W, 1);
}
},
function (x, W, H) {
x.fillStyle = "#2E1C12";
x.fillRect(0, 0, W, H);
var R = wRand(21);
for (var g = 0; g < 40; g++) {
x.strokeStyle = "rgba(0,0,0," + (0.1 + R() * 0.15) + ")";
x.beginPath();
var yy = R() * H;
x.moveTo(0, yy);
x.bezierCurveTo(W / 3, yy + R() * 10, W * 2 / 3, yy - R() * 10, W, yy);
x.stroke();
}
x.fillStyle = "rgba(0,0,0,.35)";
x.fillRect(W * 0.1, H * 0.08, W * 0.8, H * 0.84);
x.fillStyle = "#3A2416";
x.fillRect(W * 0.13, H * 0.11, W * 0.74, H * 0.78);
x.strokeStyle = "rgba(200,150,90,.22)";
x.lineWidth = 3;
x.strokeRect(W * 0.13, H * 0.11, W * 0.74, H * 0.78);
},
function (x, W, H) {
x.fillStyle = "#1A100A";
x.fillRect(0, 0, W, H);
var R = wRand(22), cols = ["#5A1814", "#1A2440", "#24402A", "#5A4A1C", "#3A1A40", "#6A5A48", "#2A2622", "#4A2A14"];
for (var row = 0; row < 5; row++) {
var y = row * H / 5, px = 4;
while (px < W - 4) {
var bw = 7 + R() * 16, bh = H / 5 - 14 - R() * 16, lean = R() < 0.05;
x.save();
x.translate(px, y + H / 5 - 8);
if (lean)
x.rotate(-0.2);
x.fillStyle = cols[(R() * cols.length) | 0];
x.fillRect(0, -bh, bw - 1, bh);
x.fillStyle = "rgba(210,170,90,.55)";
x.fillRect(2, -bh + 6, bw - 5, 2);
x.fillRect(2, -bh * 0.3, bw - 5, 2);
x.fillStyle = "rgba(0,0,0,.25)";
x.fillRect(bw - 3, -bh, 2, bh);
x.restore();
px += bw + (lean ? 6 : 0);
}
x.fillStyle = "#2E1C10";
x.fillRect(0, y + H / 5 - 8, W, 8);
x.fillStyle = "rgba(0,0,0,.4)";
x.fillRect(0, y, W, 4);
}
x.fillStyle = "#24160C";
x.fillRect(0, 0, 6, H);
x.fillRect(W - 6, 0, 6, H);
},
function (x, W, H) {
x.fillStyle = "#5A4C38";
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(90,74,50,.6)";
for (var i = 0; i < 4; i++)
x.fillRect(i * W / 4 + W / 16, 0, W / 14, H);
x.fillStyle = "rgba(140,120,80,.3)";
for (var j = 0; j < 5; j++)
for (i = 0; i < 4; i++) {
x.beginPath();
x.arc(i * W / 4 + W / 8, j * H / 5 + H / 10, 7, 0, 7);
x.fill();
}
poeStain(x, W, H, 6, 23, "40,30,16", 0.35);
poeNz(x, W, H, 2000, 0.18, 24);
},
function (x, W, H) {
x.fillStyle = "#C8BC9C";
x.fillRect(0, 0, W, H);
var R = wRand(25);
for (var i = 0; i < 40; i++) {
var cx = R() * W, cy = R() * H;
x.fillStyle = "rgba(120,60,60,.5)";
x.beginPath();
x.arc(cx, cy, 4, 0, 7);
x.fill();
x.strokeStyle = "rgba(70,100,60,.6)";
x.beginPath();
x.moveTo(cx, cy);
x.lineTo(cx + 6, cy + 9);
x.stroke();
}
poeStain(x, W, H, 4, 26, "80,60,30", 0.2);
},
function (x, W, H) {
x.fillStyle = "#7A7262";
x.fillRect(0, 0, W, H);
poeNz(x, W, H, 5000, 0.2, 27);
poeStain(x, W, H, 9, 28, "40,34,24", 0.3);
x.strokeStyle = "rgba(30,24,16,.4)";
x.lineWidth = 1.2;
var R = wRand(29);
for (var i = 0; i < 6; i++) {
var px = R() * W, py = R() * H;
x.beginPath();
x.moveTo(px, py);
for (var k = 0; k < 7; k++) {
px += (R() - 0.5) * 40;
py += R() * 28;
x.lineTo(px, py);
}
x.stroke();
}
},
function (x, W, H) {
x.fillStyle = "#6A4028";
x.fillRect(0, 0, W, H);
for (var r = 0; r < 2; r++)
for (var c = 0; c < 2; c++) {
var g = x.createLinearGradient(c * W / 2, r * H / 2, c * W / 2 + W / 2, r * H / 2 + H / 2);
g.addColorStop(0, "#8A5432");
g.addColorStop(1, "#4A2C1A");
x.fillStyle = g;
x.fillRect(c * W / 2 + 2, r * H / 2 + 2, W / 2 - 4, H / 2 - 4);
x.fillStyle = "#2A1A10";
for (var k = 0; k < 6; k++) {
x.beginPath();
x.arc(c * W / 2 + 8 + k * (W / 2 - 16) / 5, r * H / 2 + 8, 3, 0, 7);
x.fill();
x.beginPath();
x.arc(c * W / 2 + 8 + k * (W / 2 - 16) / 5, r * H / 2 + H / 2 - 8, 3, 0, 7);
x.fill();
}
}
poeStain(x, W, H, 10, 34, "40,110,90", 0.45);
},
function (x, W, H) {
x.fillStyle = "#A89070";
x.fillRect(0, 0, W, H);
var R = wRand(35);
for (var i = 0; i < 18; i++) {
x.fillStyle = ["rgba(90,110,130,.35)", "rgba(150,80,60,.3)", "rgba(80,110,70,.3)", "rgba(200,170,110,.35)"][i % 4];
x.beginPath();
x.ellipse(R() * W, R() * H, 40 + R() * 90, 30 + R() * 70, R() * 3, 0, 7);
x.fill();
}
x.strokeStyle = "rgba(120,90,40,.6)";
x.lineWidth = 10;
x.strokeRect(20, 20, W - 40, H - 40);
poeStain(x, W, H, 10, 36, "60,40,20", 0.35);
poeNz(x, W, H, 4000, 0.2, 37);
},
function (x, W, H) {
x.fillStyle = "#5A4A2A";
x.fillRect(0, 0, W, H);
var g = x.createLinearGradient(0, 0, W, H);
g.addColorStop(0, "#7A8288");
g.addColorStop(0.5, "#3E4448");
g.addColorStop(1, "#5A6268");
x.fillStyle = g;
x.fillRect(W * 0.1, H * 0.08, W * 0.8, H * 0.6);
x.strokeStyle = "#C8A050";
x.lineWidth = 8;
x.strokeRect(W * 0.1, H * 0.08, W * 0.8, H * 0.6);
x.fillStyle = "#3A2416";
x.fillRect(0, H * 0.72, W, H * 0.28);
x.strokeStyle = "rgba(200,160,80,.4)";
x.lineWidth = 3;
x.strokeRect(W * 0.08, H * 0.76, W * 0.84, H * 0.2);
},
function (x, W, H) {
x.fillStyle = "#22160E";
x.fillRect(0, 0, W, H);
var R = wRand(39);
for (var i = 0; i < 8; i++) {
var y = i * H / 8, c = 34 + Math.round(R() * 18);
x.fillStyle = "rgb(" + (c + 16) + "," + c + "," + (c - 12) + ")";
x.fillRect(0, y + 1, W, H / 8 - 2);
x.strokeStyle = "rgba(0,0,0,.25)";
for (var g = 0; g < 5; g++) {
x.beginPath();
x.moveTo(0, y + 5 + g * 11);
x.bezierCurveTo(W / 3, y + 3 + g * 11 + R() * 5, W * 2 / 3, y + 8 + g * 11, W, y + 5 + g * 11);
x.stroke();
}
x.fillStyle = "rgba(0,0,0,.6)";
x.fillRect((R() * W) | 0, y, 3, H / 8);
x.fillStyle = "#0E0A06";
x.fillRect(R() * W, y + H / 16, 4, 4);
}
},
function (x, W, H) {
x.fillStyle = "#2A1A10";
x.fillRect(0, 0, W, H);
var R = wRand(41);
for (var i = 0; i < 10; i++) {
var y = i * H / 10, c = 40 + Math.round(R() * 20);
x.fillStyle = "rgb(" + (c + 22) + "," + (c + 6) + "," + (c - 14) + ")";
x.fillRect(0, y + 1, W, H / 10 - 2);
x.strokeStyle = "rgba(0,0,0,.2)";
for (var g = 0; g < 4; g++) {
x.beginPath();
x.moveTo(0, y + 4 + g * 12);
x.bezierCurveTo(W / 3, y + 2 + g * 12 + R() * 5, W * 2 / 3, y + 7 + g * 12, W, y + 4 + g * 12);
x.stroke();
}
x.fillStyle = "rgba(0,0,0,.5)";
x.fillRect((R() * W) | 0, y, 2, H / 10);
}
x.fillStyle = "rgba(255,240,210,.05)";
x.fillRect(0, 0, W, H);
},
function (x, W, H) {
x.fillStyle = "#3A0C10";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#1A0408";
x.lineWidth = 14;
x.strokeRect(16, 16, W - 32, H - 32);
x.strokeStyle = "rgba(180,130,60,.4)";
x.lineWidth = 3;
x.strokeRect(30, 30, W - 60, H - 60);
x.fillStyle = "rgba(20,30,60,.6)";
x.beginPath();
x.ellipse(W / 2, H / 2, W * 0.22, H * 0.22, 0, 0, 7);
x.fill();
x.fillStyle = "rgba(170,120,50,.4)";
for (var k = 0; k < 12; k++) {
var a = k / 12 * Math.PI * 2;
x.beginPath();
x.ellipse(W / 2 + Math.cos(a) * W * 0.3, H / 2 + Math.sin(a) * H * 0.3, 10, 22, a, 0, 7);
x.fill();
}
poeNz(x, W, H, 4000, 0.2, 42);
},
function (x, W, H) {
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++) {
x.fillStyle = (i + j) % 2 ? "#1A1818" : "#B4AEA2";
x.fillRect(i * W / 2, j * H / 2, W / 2, H / 2);
}
x.strokeStyle = "rgba(110,100,90,.35)";
var R = wRand(43);
for (var v = 0; v < 16; v++) {
x.beginPath();
x.moveTo(R() * W, R() * H);
x.quadraticCurveTo(R() * W, R() * H, R() * W, R() * H);
x.stroke();
}
x.fillStyle = "rgba(0,0,0,.18)";
x.fillRect(0, 0, W, H);
},
function (x, W, H) {
x.fillStyle = "#2A180C";
x.fillRect(0, 0, W, H);
var R = wRand(44), s = W / 8;
for (var i = -1; i < 9; i++)
for (var j = -1; j < 9; j++) {
var c = 60 + Math.round(R() * 24);
x.fillStyle = "rgb(" + (c + 20) + "," + (c) + "," + (c - 26) + ")";
x.save();
x.translate(i * s, j * s);
x.rotate((i + j) % 2 ? Math.PI / 4 : -Math.PI / 4);
x.fillRect(-s * 0.7, -s * 0.17, s * 1.4, s * 0.32);
x.restore();
}
x.fillStyle = "rgba(255,230,190,.06)";
x.fillRect(0, 0, W, H);
},
function (x, W, H) {
x.fillStyle = "#141210";
x.fillRect(0, 0, W, H);
var R = wRand(49), n = 9;
for (var r = 0; r < n; r++)
for (var c = 0; c < n; c++) {
var v = 48 + Math.round(R() * 26);
x.fillStyle = "rgb(" + v + "," + (v - 2) + "," + (v - 6) + ")";
x.beginPath();
x.ellipse(c * W / n + W / n / 2 + (r % 2) * W / n / 2, r * H / n + H / n / 2, W / n * 0.44, H / n * 0.4, R(), 0, 7);
x.fill();
x.fillStyle = "rgba(255,255,255,.07)";
x.beginPath();
x.ellipse(c * W / n + W / n / 2 + (r % 2) * W / n / 2 - 3, r * H / n + H / n / 2 - 3, W / n * 0.2, H / n * 0.15, 0, 0, 7);
x.fill();
}
},
function (x, W, H) {
x.fillStyle = "#1E1C16";
x.fillRect(0, 0, W, H);
poeNz(x, W, H, 9000, 0.3, 51);
var R = wRand(52);
for (var i = 0; i < 260; i++) {
x.strokeStyle = "rgba(" + (60 + R() * 30 | 0) + "," + (56 + R() * 24 | 0) + ",36,.5)";
x.beginPath();
var px = R() * W, py = R() * H;
x.moveTo(px, py);
x.lineTo(px + (R() - 0.5) * 5, py - 6 - R() * 8);
x.stroke();
}
poeStain(x, W, H, 14, 53, "6,6,4", 0.4);
},
function (x, W, H) {
x.fillStyle = "#1A120C";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#3A2618";
x.lineWidth = 10;
for (var i = 0; i <= 4; i++) {
x.beginPath();
x.moveTo(i * W / 4, 0);
x.lineTo(i * W / 4, H);
x.moveTo(0, i * H / 4);
x.lineTo(W, i * H / 4);
x.stroke();
}
x.strokeStyle = "rgba(170,120,60,.25)";
x.lineWidth = 2;
for (i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
x.beginPath();
x.arc(i * W / 4 + W / 8, j * H / 4 + H / 8, W / 16, 0, 7);
x.stroke();
}
},
function (x, W, H) {
x.fillStyle = "#2A2622";
x.fillRect(0, 0, W, H);
poeNz(x, W, H, 6000, 0.3, 65);
var R = wRand(66);
for (var i = 0; i < 120; i++) {
var cx = R() * W, cy = R() * H, r = 4 + R() * 30, g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
g.addColorStop(0, "rgba(230,230,220,.55)");
g.addColorStop(1, "rgba(230,230,220,0)");
x.fillStyle = g;
x.fillRect(cx - r, cy - r, r * 2, r * 2);
}
poeStain(x, W, H, 8, 67, "10,10,6", 0.4);
},
function (x, W, H) {
x.fillStyle = "#120E0A";
x.fillRect(0, 0, W, H);
var R = wRand(68), row, i, y;
for (row = 0; row < 8; row++) {
y = row * H / 8 + H / 16;
if (row % 3 === 1) {
for (i = 0; i < 7; i++) {
var cx = i * W / 7 + W / 14 + (R() - 0.5) * 4, sh = 150 + R() * 40 | 0;
x.fillStyle = "rgb(" + sh + "," + (sh - 14) + "," + (sh - 44) + ")";
x.beginPath();
x.ellipse(cx, y, 13, 14, 0, 0, 7);
x.fill();
x.fillStyle = "#0A0806";
x.beginPath();
x.ellipse(cx - 5, y - 1, 3.8, 4.6, 0, 0, 7);
x.ellipse(cx + 5, y - 1, 3.8, 4.6, 0, 0, 7);
x.fill();
x.fillRect(cx - 1, y + 4, 2, 3);
}
}
else {
for (i = 0; i < 20; i++) {
var bx = i * W / 20 + W / 40 + (R() - 0.5) * 3, by = y + (R() - 0.5) * 6, s2 = 120 + R() * 50 | 0;
x.fillStyle = "rgb(" + s2 + "," + (s2 - 12) + "," + (s2 - 38) + ")";
x.beginPath();
x.arc(bx - 2, by, 4.4, 0, 7);
x.arc(bx + 2, by + 1, 4.4, 0, 7);
x.fill();
}
}
}
poeNz(x, W, H, 600, 0.3, 69);
},
function (k) {
if (POE.tex[k])
return POE.tex[k];
var D = POE_TEX[k];
if (!D)
return null;
var px = POE.lite ? 256 : 512;
var t = wTex(px, px, D[1]);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / D[0], 1 / D[0]);
try {
t.anisotropy = Math.min(POE.lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
return (POE.tex[k] = t);
},
function (dt) {
POE.lcT = (POE.lcT || 0) - dt;
if (POE.lcT <= 0) {
POE.lcT = 0.4;
var cp = camera.position, V = new THREE.Vector3(), near = [];
POE.lights.forEach(function (F) { if (!F || !F.L.parent)
return; F.L.getWorldPosition(V); var d = V.distanceTo(cp); F._d = d; if (d < (F.L.distance || 20) + 30 && !F.out && F.k > 0.01)
near.push(F); F._on = false; });
near.sort(function (a, b) { return a._d - b._d; }).slice(0, POE.lite ? 3 : 6).forEach(function (F) { F._on = true; });
POE.lights.forEach(function (F) { if (F && F.L)
F.L.visible = !!F._on; });
}
POE.lights.forEach(function (F) {
if (!F || !F.L.parent)
return;
F.ph += dt;
var p = F.ph;
var w = F.steady ? 1 : 0.84 + 0.09 * Math.sin(p * 7.3) + 0.05 * Math.sin(p * 11.1 + 1.3) + 0.04 * Math.sin(p * 3.1 + F.k);
F.L.intensity = (F.out ? 0 : F.k) * w * (F.dim === undefined ? 1 : F.dim);
});
POE.flames.forEach(function (f) { f.ph += dt; var s = 1 + 0.12 * Math.sin(f.ph * 9.1) + 0.08 * Math.sin(f.ph * 5.7); f.m.scale.set(f.s * (1.5 - s * 0.5), f.s * s, f.s * (1.5 - s * 0.5)); f.m.visible = !f.out; });
},
function (P, x, y, z, s, light) {
s = s || 1;
var br = poeShine(0x8A6A34, 0.45, 0.8), g = poeGrp(P, x, y, z);
poeCyl(g, 0.12 * s, 0.16 * s, 0.05 * s, br, 0, 0.025 * s, 0, 10);
poeCyl(g, 0.02 * s, 0.03 * s, 0.5 * s, br, 0, 0.28 * s, 0, 8);
var arm = poeBox(g, 0.5 * s, 0.025 * s, 0.025 * s, br, 0, 0.52 * s, 0);
var arm2 = poeBox(g, 0.025 * s, 0.025 * s, 0.5 * s, br, 0, 0.52 * s, 0);
var F = [[0, 0], [0.24, 0], [-0.24, 0], [0, 0.24], [0, -0.24]].map(function (o) { poeCyl(g, 0.035 * s, 0.025 * s, 0.03 * s, br, o[0] * s, 0.55 * s, o[1] * s, 8); return poeCandle(g, o[0] * s, 0.56 * s, o[1] * s, 0.16 * s); });
var L = light === false ? null : poeLight(0xFFB060, 1.1, 9, x, y + 0.9 * s, z, P);
return { g: g, F: F, L: L };
},
function (P, x, y, z, k) {
var g = poeGrp(P, x, y, z), br = poeShine(0x9A7A3A, 0.4, 0.85);
poeCyl(g, 0.08, 0.1, 0.04, br, 0, 0.02, 0, 10);
poeCyl(g, 0.02, 0.025, 0.32, br, 0, 0.2, 0, 8);
poeSph(g, 0.07, br, 0, 0.38, 0, 10);
var sh = poeSph(g, 0.11, poeGlowM(0xFFE2B0), 0, 0.5, 0, 12);
sh.scale.y = 0.8;
var L = poeLight(0xFFD8A0, k || 0.9, 10, x, y + 0.55, z, P);
if (L)
L.steady = 1;
return { g: g, L: L };
},
function (P, x, y, z, ry, k) {
var g = poeGrp(P, x, y, z, ry), ir = poeShine(0x1A1A1A, 0.6, 0.7);
poeBox(g, 0.06, 0.3, 0.06, ir, 0, 0, 0.05);
var st = poeCyl(g, 0.03, 0.04, 0.5, poeC(0x3A2A1A), 0, 0.2, 0.2, 6);
st.rotation.x = -0.5;
var fl = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.32, 7), poeGlowM(0xFF8A30, 0.9));
fl.position.set(0, 0.55, 0.32);
g.add(fl);
POE.flames.push({ m: fl, s: 1, ph: Math.random() * 9 });
var gl = wGlow(0xFF8A30, 1.4, 0.5);
gl.position.set(0, 0.6, 0.32);
g.add(gl);
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
return poeLight(0xFF9040, k || 1.1, 11, x + s * 0.4, y + 0.7, z + c * 0.4, P);
},
function (P, x, z, ry, col, y, tall) {
var g = poeGrp(P, x, y || 0, z, ry), w = poeC(POE_WOOD), up = poeS("velvet", col || 0xFFFFFF);
poeBox(g, 0.5, 0.08, 0.48, up, 0, 0.47, 0);
[[-0.21, -0.2], [0.21, -0.2], [-0.21, 0.2], [0.21, 0.2]].forEach(function (o) { poeCyl(g, 0.022, 0.018, 0.45, w, o[0], 0.22, o[1], 6); });
poeBox(g, 0.5, tall ? 1.0 : 0.6, 0.06, w, 0, tall ? 1.0 : 0.8, -0.22);
poeBox(g, 0.42, tall ? 0.8 : 0.42, 0.02, up, 0, tall ? 0.98 : 0.8, -0.19);
if (tall) {
poeCone(g, 0.05, 0.16, w, -0.22, 1.58, -0.22);
poeCone(g, 0.05, 0.16, w, 0.22, 1.58, -0.22);
}
return g;
},
function (P, x, z, ry, col, y) {
var g = poeGrp(P, x, y || 0, z, ry), up = poeS("velvet", col || 0xFFFFFF), w = poeC(POE_WOOD);
poeBox(g, 0.8, 0.42, 0.75, up, 0, 0.32, 0);
poeBox(g, 0.8, 0.75, 0.18, up, 0, 0.85, -0.3);
poeBox(g, 0.14, 0.3, 0.7, up, -0.36, 0.6, 0);
poeBox(g, 0.14, 0.3, 0.7, up, 0.36, 0.6, 0);
[[-0.35, -0.32], [0.35, -0.32], [-0.35, 0.32], [0.35, 0.32]].forEach(function (o) { poeCyl(g, 0.03, 0.025, 0.12, w, o[0], 0.06, o[1], 6); });
return g;
},
function (P, x, z, w, d, h, ry, cloth, y) {
var g = poeGrp(P, x, y || 0, z, ry), m = poeS("oak", 0xC8A888);
poeBox(g, w, 0.06, d, m, 0, h, 0);
poeBox(g, w - 0.12, 0.1, d - 0.12, poeC(POE_WOOD), 0, h - 0.08, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (o) { poeCyl(g, 0.04, 0.03, h - 0.03, poeC(POE_WOOD), o[0] * (w / 2 - 0.08), (h - 0.03) / 2, o[1] * (d / 2 - 0.08), 8); });
if (cloth) {
poeBox(g, w + 0.1, 0.012, d + 0.1, poeC(cloth), 0, h + 0.036, 0);
poeBox(g, w + 0.1, 0.3, 0.012, poeC(cloth), 0, h - 0.12, d / 2 + 0.05);
poeBox(g, w + 0.1, 0.3, 0.012, poeC(cloth), 0, h - 0.12, -d / 2 - 0.05);
}
return g;
},
function (P, x, z, ry, y) {
var g = poeTable(P, x, z, 1.5, 0.75, 0.78, ry, null, y), m = poeC(POE_WOOD);
poeBox(g, 0.45, 0.66, 0.7, m, -0.5, 0.38, 0);
poeBox(g, 0.45, 0.66, 0.7, m, 0.5, 0.38, 0);
for (var i = 0; i < 3; i++)
poeSph(g, 0.02, poeShine(0xC8A050, 0.3, 0.9), -0.5, 0.2 + i * 0.2, 0.36, 6);
poeBox(g, 1.4, 0.35, 0.25, m, 0, 0.98, -0.24);
poeBox(g, 0.3, 0.02, 0.4, poeC(0xEDE4CC), 0.1, 0.82, 0.05).rotation.y = 0.2;
var ink = poeCyl(g, 0.03, 0.035, 0.05, poeShine(0x101010, 0.2, 0.1), -0.3, 0.84, 0.1, 8);
var q = poeBox(g, 0.01, 0.01, 0.26, poeC(0xF4F0E8), -0.28, 0.92, 0.08);
q.rotation.x = -0.8;
return g;
},
function (P, x, z, w, h, ry, y) {
var g = poeGrp(P, x, y || 0, z, ry), m = poeC(POE_WOOD);
poeBox(g, w, h, 0.42, m, 0, h / 2, -0.02);
var f = poeFace(g, w - 0.12, h - 0.3, poeS("books"), 0, h / 2 + 0.05, 0.2, 0);
poeBox(g, w + 0.12, 0.12, 0.5, m, 0, h + 0.06, 0);
poeBox(g, w + 0.06, 0.14, 0.48, m, 0, 0.07, 0);
try {
var ox = 0, oy = 0, oz = 0, q = P;
while (q && q !== POE.G && q.position) {
ox += q.position.x;
oy += q.position.y;
oz += q.position.z;
q = q.parent;
}
var r = ry || 0, fx = Math.sin(r), fz = Math.cos(r);
poeSpot(ox + x + fx * 0.9, oz + z + fz * 0.9, 1.5, "A shelf of Poe's works", "take down a volume and read", function () { poeShelf(0); }, oy + (y || 0));
}
catch (e) { }
return g;
},
function (P, x, z, ry, curtain, y) {
var g = poeGrp(P, x, y || 0, z, ry), m = poeC(POE_WOOD), cm = poeDS(poeS("velvet", curtain || 0xFFFFFF));
poeBox(g, 1.6, 0.5, 2.1, m, 0, 0.3, 0);
poeBox(g, 1.5, 0.2, 2.0, poeC(0xE8E2D4), 0, 0.62, 0);
poeBox(g, 1.55, 0.08, 1.4, poeC(curtain ? 0x3A1A1A : 0x8A7A6A), 0, 0.74, 0.3);
poeBox(g, 0.6, 0.14, 0.36, poeC(0xF0ECE4), -0.35, 0.78, -0.78);
poeBox(g, 0.6, 0.14, 0.36, poeC(0xF0ECE4), 0.35, 0.78, -0.78);
[[-0.78, -1.02], [0.78, -1.02], [-0.78, 1.02], [0.78, 1.02]].forEach(function (o) { poeCyl(g, 0.05, 0.06, 2.5, m, o[0], 1.25, o[1], 8); });
poeBox(g, 1.7, 0.18, 2.2, m, 0, 2.5, 0);
poeBox(g, 1.6, 1.1, 0.08, m, 0, 1.05, -1.04);
if (curtain) {
[[-0.82, 0, Math.PI / 2, 2.1], [0.82, 0, Math.PI / 2, 2.1], [0, -1.06, 0, 1.6]].forEach(function (c) { var p = poeFace(g, c[3], 2.2, cm, c[0], 1.35, c[1], c[2]); });
var fr = poeFace(g, 0.5, 2.2, cm, -0.6, 1.35, 1.06, 0);
var fr2 = poeFace(g, 0.5, 2.2, cm, 0.6, 1.35, 1.06, 0);
}
return g;
},
function (P, x, z, ry, lit, y) {
var g = poeGrp(P, x, y || 0, z, ry), st = poeS("stone", 0xB0A898), d = poeC(0x0A0806);
poeBox(g, 2.2, 1.5, 0.5, st, 0, 0.75, 0);
poeBox(g, 2.5, 0.14, 0.62, poeS("stone", 0xC8C0B0), 0, 1.55, 0.04);
poeBox(g, 1.1, 0.95, 0.52, d, 0, 0.5, 0.02);
poeBox(g, 1.6, 1.6, 0.3, st, 0, 2.4, -0.1);
poeBox(g, 0.9, 0.05, 0.3, poeShine(0x1A1A1A, 0.6, 0.6), 0, 0.15, 0.1);
var r = null;
if (lit !== false) {
for (var i = 0; i < 3; i++) {
var lg = poeCyl(g, 0.06, 0.07, 0.7, poeS("bark"), -0.15 + i * 0.15, 0.22, 0.12, 6);
lg.rotation.z = Math.PI / 2;
lg.rotation.y = 0.2 * i;
}
var em = poeGlowM(lit === "embers" ? 0xA83A10 : 0xFF7A20, 0.85);
for (var k = 0; k < (lit === "embers" ? 2 : 5); k++) {
var fl = new THREE.Mesh(new THREE.ConeGeometry(0.1, lit === "embers" ? 0.12 : 0.4, 6), em);
fl.position.set(-0.24 + k * 0.12, 0.38, 0.12);
g.add(fl);
POE.flames.push({ m: fl, s: 1, ph: k * 1.3 });
}
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
r = poeLight(lit === "embers" ? 0xC85020 : 0xFF8A40, lit === "embers" ? 0.6 : 1.3, lit === "embers" ? 7 : 12, x + s * 0.8, (y || 0) + 0.7, z + c * 0.8, P);
}
return { g: g, L: r };
},
function (P, x, z, ry, ebony, y) {
var g = poeGrp(P, x, y || 0, z, ry), m = ebony ? poeShine(0x0A0808, 0.35, 0.1) : poeC(POE_WOOD), s = ebony ? 1.8 : 1;
poeBox(g, 0.55 * s, 2.1 * s, 0.38 * s, m, 0, 1.05 * s, 0);
poeBox(g, 0.7 * s, 0.16 * s, 0.44 * s, m, 0, 2.18 * s, 0);
poeBox(g, 0.62 * s, 0.14 * s, 0.42 * s, m, 0, 0.07 * s, 0);
var face = poeCyl(g, 0.21 * s, 0.21 * s, 0.02, poeC(ebony ? 0xC8B88A : 0xE8E0C8), 0, 1.75 * s, 0.2 * s, 24);
face.rotation.x = Math.PI / 2;
var h1 = poeBox(g, 0.012 * s, 0.14 * s, 0.01, poeC(0x101010), 0, 1.8 * s, 0.215 * s), h2 = poeBox(g, 0.01 * s, 0.18 * s, 0.01, poeC(0x101010), 0.03 * s, 1.76 * s, 0.217 * s);
h2.rotation.z = -0.6;
var pd = new THREE.Group();
pd.position.set(0, 1.45 * s, 0.12 * s);
g.add(pd);
poeBox(pd, 0.012 * s, 0.8 * s, 0.012, poeShine(0xC8A050, 0.3, 0.9), 0, -0.4 * s, 0);
poeCyl(pd, 0.08 * s, 0.08 * s, 0.02, poeShine(0xC8A050, 0.3, 0.9), 0, -0.82 * s, 0.01, 16).rotation.x = Math.PI / 2;
POE.anim.push({ k: "pend", g: pd, a: 0.12, sp: ebony ? 1.6 : 2.6 });
return { g: g, pend: pd, hands: [h1, h2] };
},
function (P, x, y, z, ry, open) {
var g = poeGrp(P, x, y, z, ry), m = poeS("oak", 0x6A4A3A), sh = new THREE.Shape();
sh.moveTo(-0.26, -1.0);
sh.lineTo(0.26, -1.0);
sh.lineTo(0.36, 0.45);
sh.lineTo(0.26, 1.0);
sh.lineTo(-0.26, 1.0);
sh.lineTo(-0.36, 0.45);
sh.lineTo(-0.26, -1.0);
var geo = new THREE.ExtrudeGeometry(sh, { depth: 0.5, bevelEnabled: false });
geo.rotateX(-Math.PI / 2);
var b = new THREE.Mesh(geo, m);
g.add(b);
var lid = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.06, bevelEnabled: false }), m);
lid.geometry.rotateX(-Math.PI / 2);
lid.position.y = 0.5;
g.add(lid);
if (open) {
lid.position.set(0.45, 0.5, 0);
lid.rotation.z = -0.3;
poeBox(g, 0.5, 0.02, 1.8, poeC(0xE8E2D4), 0, 0.48, 0);
}
for (var i = 0; i < 3; i++)
poeBox(g, 0.8, 0.03, 0.05, poeShine(0x8A8A8A, 0.4, 0.9), 0, 0.3, -0.6 + i * 0.6);
g.userData.lid = lid;
return g;
},
function (P, x, y, z, s, lying) {
var g = poeGrp(P, x, y, z);
s = s || 1;
var b = poeCyl(g, 0.36 * s, 0.3 * s, 0.95 * s, poeS("oak", 0x9A7A5A), 0, 0.48 * s, 0, POE.lite ? 8 : 12);
[0.12, 0.48, 0.84].forEach(function (h) { poeCyl(g, (h === 0.48 ? 0.37 : 0.33) * s, (h === 0.48 ? 0.37 : 0.33) * s, 0.05 * s, poeShine(0x2A2A2A, 0.6, 0.6), 0, h * s, 0, POE.lite ? 8 : 12); });
if (lying) {
g.rotation.z = Math.PI / 2;
g.position.y = y + 0.36 * s;
}
return g;
},
function (P, x, z, ry, w, y) {
var g = poeGrp(P, x, y || 0, z, ry), m = poeC(0x2A1E14);
poeBox(g, w, 2.2, 0.12, m, 0, 1.1, -0.3);
for (var r = 0; r < 6; r++) {
poeBox(g, w, 0.04, 0.5, m, 0, 0.15 + r * 0.36, 0);
for (var c = 0; c < Math.floor(w / 0.14); c++)
if ((r * 7 + c * 3) % 11) {
var b = poeCyl(g, 0.04, 0.04, 0.3, poeShine(0x1A2A14, 0.2, 0.3), -w / 2 + 0.08 + c * 0.14, 0.22 + r * 0.36, 0, 6);
b.rotation.x = Math.PI / 2;
}
}
return g;
},
function (P, x, y, z, ry, s) {
var g = poeGrp(P, x, y, z, ry);
s = s || 1;
var bm = poeC(0xC8BCA0);
var c = poeSph(g, 0.1 * s, bm, 0, 0.1 * s, 0, 10);
c.scale.set(0.9, 1, 1.1);
poeBox(g, 0.11 * s, 0.06 * s, 0.08 * s, bm, 0, 0.03 * s, 0.06 * s);
var dk = poeC(0x0A0806);
poeSph(g, 0.025 * s, dk, -0.035 * s, 0.1 * s, 0.085 * s, 6);
poeSph(g, 0.025 * s, dk, 0.035 * s, 0.1 * s, 0.085 * s, 6);
poeBox(g, 0.015 * s, 0.02 * s, 0.01, dk, 0, 0.065 * s, 0.1 * s);
return g;
},
function (P, x, y, z, n, seed, w) {
var R = wRand(seed || 1), g = poeGrp(P, x, y, z), bm = poeC(0xB8AC90);
for (var i = 0; i < n; i++) {
var b = poeCyl(g, 0.018, 0.022, 0.3 + R() * 0.2, bm, (R() - 0.5) * (w || 1.2), 0.04 + R() * 0.25, (R() - 0.5) * (w || 1.2) * 0.5, 5);
b.rotation.set(R() * 3, R() * 3, Math.PI / 2 + R());
}
for (var k = 0; k < Math.ceil(n / 6); k++)
poeSkull(g, (R() - 0.5) * (w || 1.2), 0.08 + R() * 0.2, (R() - 0.5) * 0.4, R() * 6, 0.9 + R() * 0.2);
return g;
},
function (P, x0, y0, z0, x1, y1, z1, n) {
var g = poeGrp(P, 0, 0, 0), m = poeShine(0x2A2A2A, 0.55, 0.8);
for (var i = 0; i < n; i++) {
var t = i / (n - 1), l = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.008, 5, 10), m);
l.position.set(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t - Math.sin(t * Math.PI) * 0.25, z0 + (z1 - z0) * t);
l.rotation.set(i % 2 ? Math.PI / 2 : 0, Math.atan2(x1 - x0, z1 - z0), 0);
g.add(l);
}
return g;
},
function (P, x, y, z, ry, w, h, glass) {
var g = poeGrp(P, x, y, z, ry), st = poeS("stone", 0x9A9488), sh = new THREE.Shape();
sh.moveTo(-w / 2, 0);
sh.lineTo(-w / 2, h * 0.62);
sh.quadraticCurveTo(-w / 2, h * 0.92, 0, h);
sh.quadraticCurveTo(w / 2, h * 0.92, w / 2, h * 0.62);
sh.lineTo(w / 2, 0);
sh.lineTo(-w / 2, 0);
var gm = glass || POE.mats.winGlass || (POE.mats.winGlass = new THREE.MeshLambertMaterial({ color: 0x2A3448, emissive: 0x0A1020, map: poeLeadTex() }));
var pane = new THREE.Mesh(new THREE.ShapeGeometry(sh), gm);
g.add(pane);
poeBox(g, 0.12, h * 0.66, 0.2, st, -w / 2 - 0.06, h * 0.33, 0);
poeBox(g, 0.12, h * 0.66, 0.2, st, w / 2 + 0.06, h * 0.33, 0);
poeBox(g, w + 0.36, 0.14, 0.32, st, 0, -0.07, 0.06);
poeBox(g, 0.05, h * 0.95, 0.06, st, 0, h * 0.48, 0.02);
var top = new THREE.Mesh(new THREE.TorusGeometry(w * 0.56, 0.07, 5, 14, Math.PI), st);
top.position.y = h * 0.62;
top.scale.y = 0.7;
g.add(top);
return g;
},
function () {
if (POE.tex.lead)
return POE.tex.lead;
var t = wTex(128, 128, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#5A6A84");
g.addColorStop(1, "#1A2232");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.strokeStyle = "#0A0A0C";
x.lineWidth = 3;
for (var i = -8; i < 16; i++) {
x.beginPath();
x.moveTo(i * 16, 0);
x.lineTo(i * 16 + H, H);
x.stroke();
x.beginPath();
x.moveTo(i * 16, H);
x.lineTo(i * 16 + H, 0);
x.stroke();
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(2, 3);
return (POE.tex.lead = t);
},
function (P, x, y, z, ry, w, h, shut) {
var g = poeGrp(P, x, y, z, ry), fr = poeC(0xD8D0C0);
poeBox(g, w + 0.16, 0.08, 0.14, fr, 0, h / 2 + 0.04, 0);
poeBox(g, w + 0.16, 0.08, 0.2, fr, 0, -h / 2 - 0.04, 0.03);
poeBox(g, 0.08, h, 0.14, fr, -w / 2 - 0.04, 0, 0);
poeBox(g, 0.08, h, 0.14, fr, w / 2 + 0.04, 0, 0);
poeFace(g, w, h, POE.mats.sashGlass || (POE.mats.sashGlass = new THREE.MeshLambertMaterial({ color: 0x1A2230, emissive: 0x060A12 })), 0, 0, -0.02, 0);
poeBox(g, w, 0.05, 0.06, fr, 0, 0, 0.02);
for (var i = 1; i < 3; i++)
poeBox(g, 0.03, h, 0.05, fr, -w / 2 + i * w / 3, 0, 0.02);
if (shut) {
poeBox(g, w / 2, h, 0.05, poeC(0x2A2420), -w / 4, 0, 0.06);
poeBox(g, w / 2, h, 0.05, poeC(0x2A2420), w / 4, 0, 0.06);
}
return g;
},
function (P, x, z, ry, w, h, col, arch) {
var g = poeGrp(P, x, 0, z, ry), fr = poeS("stone", 0xA8A090), m = poeS("oak", col || 0x8A6A4A);
poeBox(g, 0.2, h + 0.2, 0.3, fr, -w / 2 - 0.1, (h + 0.2) / 2, 0);
poeBox(g, 0.2, h + 0.2, 0.3, fr, w / 2 + 0.1, (h + 0.2) / 2, 0);
poeBox(g, w + 0.4, 0.24, 0.3, fr, 0, h + 0.12, 0);
var leaf = poeGrp(g, -w / 2, 0, 0);
poeBox(leaf, w, h, 0.08, m, w / 2, h / 2, 0);
for (var i = 0; i < 2; i++)
for (var j = 0; j < 3; j++)
poeBox(leaf, w * 0.36, h * 0.24, 0.02, poeC(0x1A100A), w / 2 + (i ? 1 : -1) * w * 0.22, h * 0.2 + j * h * 0.3, 0.05);
poeSph(leaf, 0.04, poeShine(0xC8A050, 0.3, 0.9), w - 0.12, h * 0.48, 0.07, 8);
g.userData.leaf = leaf;
return g;
},
function (P, x, y, z, ry) {
var g = poeGrp(P, x, y, z, ry), m = poeShine(0xE8E4DA, 0.5, 0.05);
poeBox(g, 0.42, 0.1, 0.32, m, 0, 0.05, 0);
var b = poeSph(g, 0.24, m, 0, 0.3, 0, 14);
b.scale.set(1.2, 0.75, 0.8);
var n = poeCyl(g, 0.07, 0.09, 0.16, m, 0, 0.52, 0, 10);
var h = poeSph(g, 0.13, m, 0, 0.68, 0.02, 14);
h.scale.set(0.85, 1.05, 0.95);
var hel = poeSph(g, 0.14, m, 0, 0.76, -0.02, 14);
hel.scale.set(0.9, 0.6, 1.05);
var cr = poeBox(g, 0.03, 0.12, 0.3, m, 0, 0.86, -0.02);
return g;
},
function (P, x, y, z, ry, s) {
s = s || 1;
var g = poeGrp(P, x, y, z, ry), m = poeShine(0x08080C, 0.45, 0.15);
var b = poeSph(g, 0.13 * s, m, 0, 0.16 * s, 0, 12);
b.scale.set(0.85, 0.85, 1.45);
var h = poeSph(g, 0.075 * s, m, 0, 0.3 * s, 0.12 * s, 12);
var bk = poeCone(g, 0.03 * s, 0.13 * s, poeShine(0x141414, 0.3, 0.3), 0, 0.29 * s, 0.22 * s);
bk.rotation.x = Math.PI / 2;
var tl = poeBox(g, 0.1 * s, 0.02 * s, 0.24 * s, m, 0, 0.11 * s, -0.22 * s);
tl.rotation.x = 0.4;
[-1, 1].forEach(function (k) {
var w = poeSph(g, 0.1 * s, m, k * 0.09 * s, 0.17 * s, -0.03 * s, 10);
w.scale.set(0.3, 0.7, 1.5);
var e = poeSph(g, 0.012 * s, poeGlowM(0xC83A10), k * 0.045 * s, 0.32 * s, 0.17 * s, 6);
var lg = poeCyl(g, 0.008 * s, 0.008 * s, 0.1 * s, poeC(0x101010), k * 0.04 * s, 0.04 * s, 0.02 * s, 4);
});
g.userData.head = h;
return g;
},
function (P, x, y, z, s, seed) {
var R = wRand(seed || 1), m = poeS("bark", 0x8A8478), t = poeGrp(P, x, y, z, R() * 6);
var tr = poeCyl(t, 0.16 * s, 0.4 * s, 6 * s, m, 0, 3 * s, 0, 6);
tr.rotation.z = (R() - 0.5) * 0.18;
for (var i = 0; i < (POE.lite ? 3 : 6); i++) {
var b = poeCyl(t, 0.03 * s, 0.11 * s, (2.2 + R() * 2.4) * s, m, 0, 0, 0, 4), a = R() * Math.PI * 2, up = 0.5 + R() * 0.7;
b.position.set(Math.cos(a) * 0.8 * s, (3.4 + R() * 2.6) * s, Math.sin(a) * 0.8 * s);
b.rotation.z = Math.cos(a) * up;
b.rotation.x = -Math.sin(a) * up;
}
poeSolid(x, z, 0.8 * s, 0.8 * s, y - 2, y + 8 * s);
return t;
},
function (P, x, y, z, ry, seed) {
var m = poeS("stone", 0xA0A098), k = seed % 3, s, g = poeGrp(P, x, y, z, ry);
if (k === 0) {
s = poeBox(g, 0.7, 1.0, 0.16, m, 0, 0.5, 0);
var tp = poeCyl(g, 0.35, 0.35, 0.16, m, 0, 1.0, 0, 12);
tp.rotation.x = Math.PI / 2;
}
else if (k === 1) {
poeBox(g, 0.16, 1.5, 0.16, m, 0, 0.75, 0);
poeBox(g, 0.8, 0.16, 0.16, m, 0, 1.1, 0);
}
else
poeBox(g, 0.9, 0.6, 0.22, m, 0, 0.3, 0);
g.rotation.z = ((seed * 37) % 10 - 5) * 0.02;
return g;
},
function (seed, x, z, ry, o, parent, y) {
o = o || {};
var p, name = (o.talk && o.talk.name) || o.name || "";
if (!o.noCos && typeof WDR_COST !== "undefined" && WDR_COST.oz_poe) {
var look = Object.assign({}, o.look || {});
look._pr = o.role || poeRoleOf(name, o.sex || look.sex || "m");
if (o.child)
look._pk = 1;
o = Object.assign({}, o, { ozCos: "oz_poe", look: look });
}
try {
p = wPerson("poe" + seed, o);
}
catch (e) {
p = new THREE.Group();
poeBox(p, 0.5, 1.7, 0.3, poeC(0x3A2A2A), 0, 0.85, 0);
}
if (o.s)
p.scale.multiplyScalar(o.s);
p.position.set(x, y === undefined ? poeGround(x, z) : y, z);
p.rotation.y = ry || 0;
p.userData.keep = 1;
(parent || POE.G).add(p);
var P = { g: p, y: p.position.y, o: o, name: name };
POE.people.push(P);
if (o.wander)
P.wander = o.wander;
if (o.talk || o.fn)
POE.talk.push({ p: P, r: o.r || 3, name: name, t: o.talk, fn: o.fn });
return P;
},
function (L, o) {
var r = L._pr || "gent", W = POE_WEAR[r] || POE_WEAR.gent;
if (typeof ozwFromLook !== "function")
return null;
var x = Object.assign({}, W.x), top = L.top != null ? L.top : 0x5A4A4A, lc = L.layerColor != null ? L.layerColor : null;
if (W.f) {
if (x.dress == null)
x.dress = top;
if (x.skirt == null)
x.skirt = L.bottom != null && L.topKind !== "dress" ? L.bottom : top;
if (r === "revelf" || r === "carnf") {
x.trim = 0xE8C860;
}
}
else {
if (x.coat && x.coatCol == null)
x.coatCol = lc != null ? lc : ozwDark(top, 0.1);
if (x.trou == null && L.bottom != null)
x.trou = ozwDark(L.bottom, 0.3);
if (!x.coat && x.shirt == null)
x.shirt = 0xF0ECE0;
if (x.vest == null && r === "reveller")
x.vest = ozwMix(top, 0xFFFFFF, 0.3);
}
var R = ozwFromLook(L, { f: !!W.f, kid: false, lk: "poe" }, x);
if (R && R.col) {
if (x.trim != null)
R.col.trim = x.trim;
if (!R.col.sash)
R.col.sash = r === "french" ? 0xC8202A : 0x6A1A1A;
if (!R.col.apron)
R.col.apron = 0xE8E2D4;
}
return R;
},
function (col, gold) {
var g = new THREE.Group(), m = poeWM(col, { r: 0.35 }), sh = new THREE.Mesh(new THREE.SphereGeometry(0.118, 16, 8, -Math.PI * 0.42, Math.PI * 0.84, Math.PI * 0.32, Math.PI * 0.2), m);
sh.material.side = THREE.DoubleSide;
g.add(sh);
if (gold) {
var t = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.006, 4, 16, Math.PI), poeWM(0xE8C040, { r: 0.2, m: 0.9 }));
t.rotation.x = -0.2;
t.position.set(0, 0.03, 0.05);
g.add(t);
}
return g;
},
function (add, c, E) {
var L = (E && E.spec && E.spec.look) || {}, r = String(L._pr || ""), g, m;
if (r === "gent" || r === "physician" || r === "dupin") {
if (L._hat !== "none")
add("Head", [0, 0.15, -0.01], poeTopHat(r === "dupin" ? 0x1A1820 : 0x0E0E10));
if (r === "dupin") {
var sp = new THREE.Group(), gm = poeWM(0x2A6A3A, { r: 0.1, m: 0.4 });
[-0.035, 0.035].forEach(function (o) { var l = new THREE.Mesh(new THREE.TorusGeometry(0.022, 0.004, 4, 12), gm); l.position.set(o, 0, 0); sp.add(l); });
add("Head", [0, 0.06, 0.115], sp);
}
return;
}
if (r === "police") {
var ph = poeTopHat(0x101010);
add("Head", [0, 0.15, -0.01], ph);
return;
}
if (r === "oldman") {
m = poeWM(0xE8E2D4, { r: 1 });
g = new THREE.Group();
var cap = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.3, 14, 1, true), m);
cap.material.side = THREE.DoubleSide;
cap.position.set(0, 0.1, -0.04);
cap.rotation.x = -0.5;
g.add(cap);
var tas = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 6), m);
tas.position.set(0, 0.2, -0.18);
g.add(tas);
add("Head", [0, 0.07, -0.01], g);
var ey = new THREE.Mesh(new THREE.SphereGeometry(0.017, 10, 8), new THREE.MeshBasicMaterial({ color: 0xA8C8E8, transparent: true, opacity: 0.85 }));
add("Head", [0.032, 0.062, 0.105], ey);
return;
}
if (r === "prince" || r === "reveller" || r === "revelf") {
var cols = [0xE8C040, 0x1A1A1A, 0xC81E2A, 0x2A5AC8, 0xF4F2EE, 0x6A2A8A], k = (L._seed | 0) % cols.length;
add("Head", [0, 0.06, 0.02], poeHalfMask(r === "prince" ? 0x8A1018 : cols[k], true));
if (r === "prince") {
var cr = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 18, 1, true), poeWM(0xE8C040, { r: 0.25, m: 0.9 }));
cr.material.side = THREE.DoubleSide;
add("Head", [0, 0.13, -0.01], cr);
}
else if (k % 2 === 0) {
var plume = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), poeWM(cols[(k + 2) % cols.length], { r: 0.9 }));
plume.scale.set(0.5, 2.4, 0.5);
add("Head", [0.06, 0.2, 0], plume);
}
return;
}
if (r === "death") {
var hood = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.62), poeWM(0xE0DCD0, { r: 1 }));
hood.material.side = THREE.DoubleSide;
hood.scale.set(1.05, 1.12, 1.18);
add("Head", [0, 0.08, -0.03], hood);
var face = new THREE.Mesh(new THREE.SphereGeometry(0.105, 14, 10, -Math.PI * 0.45, Math.PI * 0.9, Math.PI * 0.15, Math.PI * 0.6), poeWM(0xC8C2B0, { r: 0.8 }));
face.material.side = THREE.DoubleSide;
add("Head", [0, 0.04, 0.02], face);
var dk = poeWM(0x0A0606, { r: 1 });
[-0.035, 0.035].forEach(function (o) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 6), dk); e.scale.z = 0.4; add("Head", [o, 0.075, 0.11], e); });
if (L._blood) {
var bm = poeWM(0x7A0A0A, { r: 0.6 });
for (var i = 0; i < 6; i++) {
var b = new THREE.Mesh(new THREE.SphereGeometry(0.03 + i % 3 * 0.012, 8, 6), bm);
b.scale.z = 0.25;
add(i < 2 ? "Head" : "spine_03", i < 2 ? [(i ? -1 : 1) * 0.05, 0.0, 0.1] : [((i * 37) % 10 - 5) * 0.03, ((i * 13) % 10 - 5) * 0.04, 0.13], b);
}
}
return;
}
if (r === "monk") {
var hd = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.42, 14, 1, true), poeWM(0x0C0A0C, { r: 1 }));
hd.material.side = THREE.DoubleSide;
hd.position.set(0, 0.1, -0.03);
add("Head", [0, 0.06, -0.01], hd);
return;
}
if (r === "french") {
g = new THREE.Group();
m = poeWM(0x141418, { r: 0.8 });
var bc = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), m);
bc.scale.set(1.3, 0.55, 0.55);
bc.material.side = THREE.DoubleSide;
g.add(bc);
var ck = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.01, 12), poeWM(0xC8202A, { r: 0.6 }));
ck.rotation.x = Math.PI / 2;
ck.position.set(0.12, 0.06, 0.07);
g.add(ck);
add("Head", [0, 0.12, -0.01], g);
return;
}
if (r === "gendarme") {
g = new THREE.Group();
m = poeWM(0x101014, { r: 0.7 });
var b2 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), m);
b2.scale.set(0.55, 0.55, 1.3);
b2.material.side = THREE.DoubleSide;
g.add(b2);
add("Head", [0, 0.12, -0.01], g);
return;
}
if (r === "montresor") {
add("Head", [0, 0.06, 0.02], poeHalfMask(0x0A0A0C, false));
var mh = poeTopHat(0x0A0A0C);
mh.scale.set(1, 0.6, 1);
add("Head", [0, 0.15, -0.01], mh);
return;
}
if (r === "fortunato") {
g = new THREE.Group();
var cc = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.42, 16, 1, true), poeWM(0xC81E22, { r: 0.6 }));
cc.material.side = THREE.DoubleSide;
cc.position.y = 0.2;
cc.rotation.z = 0.25;
g.add(cc);
for (var bi = 0; bi < 3; bi++) {
var bell = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 6), poeWM(0xE8C040, { r: 0.2, m: 0.9 }));
bell.position.set(-0.06 + bi * 0.06, 0.03, 0.12);
g.add(bell);
}
var tip = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 6), poeWM(0xE8C040, { r: 0.2, m: 0.9 }));
tip.position.set(0.1, 0.41, 0);
g.add(tip);
add("Head", [0, 0.08, -0.01], g);
return;
}
if (r === "carnival" || r === "carnf") {
var kc = [0xF4F2EE, 0x1A1A1A, 0xC81E2A, 0xE8C040][(L._seed | 0) % 4];
add("Head", [0, 0.06, 0.02], poeHalfMask(kc, true));
if (r === "carnival" && ((L._seed | 0) % 3 === 0)) {
var tri = poeTopHat(0x101010);
tri.scale.set(1.1, 0.4, 1.1);
add("Head", [0, 0.15, -0.01], tri);
}
return;
}
if (r === "sailor") {
var tp = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.14, 0.08, 16), poeWM(0x1A1E2A, { r: 0.8 }));
add("Head", [0, 0.12, -0.01], tp);
return;
}
if (r === "lady" || r === "poorf") {
var bo = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), poeWM(r === "lady" ? 0x3A2A3A : 0xE8E2D4, { r: 1 }));
bo.material.side = THREE.DoubleSide;
bo.scale.set(1.05, 1, 1.2);
add("Head", [0, 0.1, -0.04], bo);
return;
}
if (r === "madeline" && L._blood) {
var bm2 = poeWM(0x7A0A0A, { r: 0.6 });
for (var j = 0; j < 8; j++) {
var s = new THREE.Mesh(new THREE.SphereGeometry(0.03 + j % 3 * 0.015, 8, 6), bm2);
s.scale.z = 0.25;
add("spine_03", [((j * 29) % 10 - 5) * 0.03, ((j * 17) % 10 - 5) * 0.05, 0.13], s);
}
return;
}
},
function (x, z) {
var h = wFbm(x * 0.004 + 11, z * 0.004 + 7, 5, 4) * 16 - 5;
h += Math.max(0, wFbm(x * 0.0016 + 3, z * 0.0016 + 9, 3, 2) - 0.55) * 60;
var ed = Math.max(Math.abs(x), Math.abs(z));
if (ed > 1100) {
var pd = Math.hypot(x - 470, z - 1150), pk = pd < 200 ? 0 : pd < 290 ? (pd - 200) / 90 : 1;
h += pk * Math.min(1, (ed - 1100) / 300) * (30 + wFbm(x * 0.006 + 5, z * 0.006 + 2, 3, 2) * 50);
}
for (var i = 0; i < POE_FLATS.length; i++) {
var F = POE_FLATS[i], k = poeSmooth(Math.hypot(x - F[0], z - F[1]), F[2] + 60);
if (k > 0)
h = h * (1 - k) + 0 * k;
}
var rd = poeRoadD(x, z);
if (rd < 18) {
var k2 = poeSmooth(rd, 18);
h = h * (1 - k2 * 0.85) + 0.05 * k2 * 0.85;
}
var t = poeTarnIn(x, z);
if (t < 1.6) {
var d = t < 1 ? -4.2 * (1 - t) - 0.8 : -0.8 * (1.6 - t) / 0.6;
if (t >= 1)
h = h * (t - 1) / 0.6 + d * (1 - (t - 1) / 0.6);
else
h = d;
}
return h;
},
function (G) {
var n = POE.lite ? 170 : 300, S = 3000;
var m = new THREE.MeshLambertMaterial({ map: poeTex("ground"), vertexColors: true });
var t = poeTex("ground");
t.repeat.set(1 / 4, 1 / 4);
var mesh = wGround(S, n, function (x, z) {
var h = poeLand(x, z), c = 0x6E6A5E;
var rd = poeRoadD(x, z);
if (rd < 3.4)
c = 0x8A8478;
else if (rd < 5)
c = 0x5E5A50;
var tn = poeTarnIn(x, z);
if (tn < 1.25)
c = 0x2A2A26;
var v = wNoise(x * 0.05, z * 0.05, 3);
c = v > 0.62 ? 0x5A5A48 : v < 0.3 ? 0x7A7262 : c;
if (h > 14)
c = 0x4E4C46;
return [h, c];
}, m);
var uv = mesh.geometry.attributes.uv;
for (var i = 0; i < uv.count; i++) {
uv.setXY(i, uv.getX(i) * S, uv.getY(i) * S);
}
uv.needsUpdate = true;
G.add(mesh);
POE.groundMesh = mesh;
var fm = poeS("flags", 0x9A948A);
POE_ROADS.forEach(function (P) {
for (var j = 0; j < P.length - 1; j++) {
var a = P[j], b = P[j + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), seg = Math.max(1, Math.round(L / 24));
for (var s = 0; s < seg; s++) {
var x0 = a[0] + (b[0] - a[0]) * s / seg, z0 = a[1] + (b[1] - a[1]) * s / seg, x1 = a[0] + (b[0] - a[0]) * (s + 1) / seg, z1 = a[1] + (b[1] - a[1]) * (s + 1) / seg, mx = (x0 + x1) / 2, mz = (z0 + z1) / 2;
var pl = poePlane(G, 5, L / seg + 0.4, fm, mx, 0, mz, Math.atan2(b[0] - a[0], b[1] - a[1]));
pl.position.y = Math.max(poeLand(mx, mz), poeLand(x0, z0), poeLand(x1, z1)) + 0.06;
}
}
});
var T = POE_AT.usher.tarn, wm = new THREE.MeshPhongMaterial({ color: 0x06080A, shininess: 120, specular: 0x6A7488, transparent: true, opacity: 0.94 });
var w = new THREE.Mesh(new THREE.CircleGeometry(1, 48), wm);
w.rotation.x = -Math.PI / 2;
w.scale.set(T.rx * 1.12, T.rz * 1.12, 1);
w.position.set(T.x, POE_WATER, T.z);
G.add(w);
POE.tarn = w;
},
function (G) {
var moon = new THREE.Mesh(new THREE.SphereGeometry(46, 24, 16), new THREE.MeshBasicMaterial({ color: 0xD8C8A0, fog: false }));
moon.position.set(1500, 700, -2300);
G.add(moon);
POE.moon = moon;
var halo = wGlow(0xA89A80, 520, 0.28);
halo.position.copy(moon.position);
G.add(halo);
var soft = wTex(256, 256, function (x, W, H) {
var r = wRand(77), i;
x.fillStyle = "#000";
x.fillRect(0, 0, W, H);
for (i = 0; i < 90; i++) {
var a = r() * 6.283, d = r() * W * 0.34, cx = W / 2 + Math.cos(a) * d, cy = H / 2 + Math.sin(a) * d, rr = 18 + r() * 46, gr = x.createRadialGradient(cx, cy, 0, cx, cy, rr);
gr.addColorStop(0, "rgba(255,255,255,.32)");
gr.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = gr;
x.fillRect(cx - rr, cy - rr, rr * 2, rr * 2);
}
});
POE.cloudTex = soft;
POE.clouds = [];
for (var c = 0; c < (POE.lite ? 5 : 9); c++) {
var R = wRand(500 + c), cx = (R() - 0.5) * 2400, cz = (R() - 0.5) * 2400;
var cl = new THREE.Mesh(new THREE.CircleGeometry(600 + R() * 300, 32), new THREE.MeshBasicMaterial({ color: 0x0A0A0E, transparent: true, opacity: 0.86, alphaMap: soft, side: THREE.DoubleSide, depthWrite: false }));
cl.rotation.x = Math.PI / 2;
cl.position.set(cx, 300 + R() * 80, cz);
G.add(cl);
POE.clouds.push(cl);
}
var fl = new THREE.Mesh(new THREE.CircleGeometry(1800, 40), new THREE.MeshBasicMaterial({ color: 0xC0C8E8, transparent: true, opacity: 0, alphaMap: soft, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
fl.rotation.x = Math.PI / 2;
fl.position.set(0, 290, 0);
G.add(fl);
POE.skyFlash = fl;
var mist = wPoints(POE.lite ? 260 : 700, function (i) { var r = wRand(900 + i), a = r() * 6.283, d = r() * 1150, x = Math.cos(a) * d, z = Math.sin(a) * d; return [x, poeLand(x, z) + 1 + r() * 3, z]; }, 0x7A7E90, 22, true);
mist.material.opacity = 0.13;
mist.material.map = (typeof dotTexture === "function") ? dotTexture() : null;
G.add(mist);
POE.mist = mist;
var n = POE.lite ? 600 : 1600, geo = new THREE.BufferGeometry(), pos = new Float32Array(n * 6);
for (var i = 0; i < n; i++) {
var x = (Math.random() - 0.5) * 80, y = Math.random() * 40, z = (Math.random() - 0.5) * 80;
pos.set([x, y, z, x + 0.05, y - 0.8, z], i * 6);
}
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var rain = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: 0x8A94AA, transparent: true, opacity: 0.35, depthWrite: false }));
rain.frustumCulled = false;
G.add(rain);
POE.rain = { m: rain, on: 0.6, t: 40 };
},
function (dt) {
var z = POE.zone, R = POE.room, base;
if (R)
base = R.envBlack || POE.black ? POE_ENV.black : R.env && POE_ENV[R.env] ? POE_ENV[R.env] : POE_ENV.inside;
else
base = z === "usher" ? POE_ENV.usher : z === "masque" ? POE_ENV.red : (z === "heart" || z === "morgue" || z === "cask" || z === "pit") ? POE_ENV.town : POE_ENV.land;
var E = {};
for (var k in base)
E[k] = base[k];
if (R && R.env && !(R.envBlack || POE.black)) {
if (R.fog)
E.fogD = R.fog;
}
else if (R && !(R.envBlack || POE.black)) {
E.hemi = 0.12 + 0.4 * (R.dark == null ? 0.5 : R.dark) * (POE.roomLit == null ? 1 : POE.roomLit);
if (R.fog)
E.fogD = R.fog;
}
var f = POE.storm.f || 0;
if (f > 0 && (!R || R.windows)) {
E.hemi += f * (R ? 0.7 : 1.2);
E.sun += f * (R ? 0 : 0.9);
E.hemiCol = 0xC8D0F0;
if (!R)
E.fog = 0x3A3E50;
}
return E;
},
function (dt) {
var S = POE.storm;
S.t -= dt;
if (S.t <= 0) {
S.f = 1;
S.t = 14 + Math.random() * 22;
if (typeof shnSfx === "function")
shnSfx("thunder", { delay: 0.6 + Math.random() * 2.2 });
if (POE.onStrike)
try {
POE.onStrike();
}
catch (e) { }
}
if (S.f > 0)
S.f = Math.max(0, S.f - dt * 0.9);
if (POE.skyFlash)
POE.skyFlash.material.opacity = Math.min(0.7, S.f * 0.75);
},
function (dt) {
var R = POE.rain;
if (!R)
return;
R.t -= dt;
if (R.t <= 0) {
R.on = R.on > 0.3 ? 0 : 0.4 + Math.random() * 0.6;
R.t = 50 + Math.random() * 80;
}
var want = POE.room ? 0 : R.on;
R.m.visible = want > 0.05;
R.m.material.opacity += (want * 0.38 - R.m.material.opacity) * Math.min(1, dt);
if (!R.m.visible)
return;
var L = worldLocal();
R.m.position.set(L.x, camera.position.y - 14, L.z);
var p = R.m.geometry.attributes.position, a = p.array, fall = dt * 26;
for (var i = 0; i < a.length; i += 6) {
a[i + 1] -= fall;
a[i + 4] -= fall;
if (a[i + 1] < 0) {
a[i + 1] += 40;
a[i + 4] += 40;
}
}
p.needsUpdate = true;
if (POE.sfxRain !== (want > 0.05)) {
POE.sfxRain = want > 0.05;
poeSfx(POE.sfxRain ? "rain" : "rainoff");
}
},
function (G) {
var g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: 0, z: 0, r: 200 });
var bm = poeShine(0x08080A, 0.3, 0.2), st = poeS("gothic", 0x6A6660);
for (var s = 0; s < 6; s++)
poeCyl(g, 46 - s * 5, 47 - s * 5, 1.2, st, 0, 0.6 + s * 1.2, 0, POE.lite ? 18 : 36);
poeSolid(0, 0, 94, 40, -2, 60);
poeSolid(0, 0, 40, 94, -2, 60);
poeSolid(0, 0, 70, 70, -2, 60);
var t = poeGrp(g, 0, 7.2, -6);
poeBox(t, 22, 10, 16, bm, 0, 5, 0);
poeBox(t, 22, 34, 4, bm, 0, 17, -6);
poeBox(t, 4, 16, 16, bm, -11, 8, 0);
poeBox(t, 4, 16, 16, bm, 11, 8, 0);
var sp = new THREE.Mesh(new THREE.ConeGeometry(3, 12, 4), bm);
sp.position.set(-9, 40, -6);
t.add(sp);
var sp2 = sp.clone();
sp2.position.x = 9;
t.add(sp2);
var sp3 = new THREE.Mesh(new THREE.ConeGeometry(4, 18, 4), bm);
sp3.position.set(0, 43, -6);
t.add(sp3);
poeSolid(0, -6, 24, 18, 6, 60);
var e = poeGrp(t, 0, 10, -1), rm = poeShine(0x050507, 0.9, 0.05);
var robe = poeCyl(e, 6, 9, 20, rm, 0, 10, 0, POE.lite ? 12 : 24);
var hood = poeSph(e, 4.6, rm, 0, 23, 1, POE.lite ? 12 : 20);
hood.scale.set(1, 1.15, 1.1);
var face = poeSph(e, 3.4, poeC(0x000000), 0, 22.5, 3.2, 16);
face.scale.set(1, 1.1, 0.4);
[-1.2, 1.2].forEach(function (o) { var ey = poeSph(e, 0.28, poeGlowM(0xB8C8FF), o, 23.2, 4.5, 8); var gl = wGlow(0x9AB0FF, 4, 0.5); gl.position.set(o, 23.2, 4.6); e.add(gl); });
[-1, 1].forEach(function (k) { var arm = poeCyl(e, 1.4, 2, 11, rm, k * 7, 9, 3, 10); arm.rotation.x = -1.2; arm.rotation.z = k * 0.1; });
POE.eidolon = e;
var signs = [[0, 58, 0, "The house of the Raven  ↓"], [42, -34, 0.9, "The House of Usher  ↗"], [52, 22, 1.9, "The old man's house  →"], [0, -58, Math.PI, "The abbey of Prince Prospero  ↑"], [-54, 14, -1.6, "Toledo  ←"], [-42, 40, -2.3, "The carnival  ↙"], [30, 52, 2.7, "Paris, the Barrière d’Enfer  ↘"]];
signs.forEach(function (S) {
var sg = poeGrp(g, S[0], poeLand(S[0], S[1]), S[1], S[2]);
poeCyl(sg, 0.08, 0.1, 3.4, poeShine(0x141414, 0.6, 0.7), 0, 1.7, 0, 6);
var p = wSign([S[3]], 2.8, 0.5, "#0C0C10", "#C8C0A8");
p.position.set(0, 3.1, 0.06);
sg.add(p);
});
for (var i = 0; i < 26; i++) {
var R = wRand(70 + i), ga = R() * 6.283, gd = 70 + R() * 60, gx = Math.cos(ga) * gd, gz = Math.sin(ga) * gd;
if (poeRoadD(gx, gz) < 8)
continue;
poeGrave(g, gx, poeLand(gx, gz), gz, R() * 6, i);
}
for (var j = 0; j < 14; j++) {
var R2 = wRand(110 + j), ta = R2() * 6.283, td = 100 + R2() * 80, tx = Math.cos(ta) * td, tz = Math.sin(ta) * td;
if (poeRoadD(tx, tz) < 10)
continue;
poeDeadTree(g, tx, poeLand(tx, tz), tz, 1 + R2() * 0.6, j + 3);
}
},
function (G) {
var g = new THREE.Group();
G.add(g);
var n = POE.lite ? 90 : 220;
for (var i = 0; i < n; i++) {
var R = wRand(3000 + i), x = (R() - 0.5) * 2300, z = (R() - 0.5) * 2300;
if (poeRoadD(x, z) < 12)
continue;
var near = false;
POE_FLATS.forEach(function (F) { if (Math.hypot(x - F[0], z - F[1]) < F[2] + 20)
near = true; });
if (near || poeTarnIn(x, z) < 1.4)
continue;
if (R() < 0.62)
poeDeadTree(g, x, poeLand(x, z), z, 0.8 + R() * 0.9, i);
else
poeRock(g, x, poeLand(x, z), z, 1 + R() * 2.6, i);
}
POE.roadLamps = [];
POE_ROADS.forEach(function (P, ri) {
for (var j = 0; j < P.length - 1; j++) {
var a = P[j], b = P[j + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n2 = Math.floor(L / 120);
for (var s = 1; s <= n2; s++) {
var t = s / (n2 + 1), x = a[0] + (b[0] - a[0]) * t + ((b[1] - a[1]) / L) * 4, z = a[1] + (b[1] - a[1]) * t - ((b[0] - a[0]) / L) * 4, y = poeLand(x, z);
var lg = poeGrp(g, x, y, z);
poeCyl(lg, 0.07, 0.1, 3.6, poeShine(0x101010, 0.6, 0.7), 0, 1.8, 0, 6);
var lan = poeBox(lg, 0.3, 0.4, 0.3, poeGlowM(0xD89A50), 0, 3.75, 0);
poeBox(lg, 0.38, 0.06, 0.38, poeShine(0x101010, 0.6, 0.7), 0, 4, 0);
var gl = wGlow(0xFFB060, 3, 0.45);
gl.position.set(0, 3.75, 0);
lg.add(gl);
POE.roadLamps.push({ x: x, y: y + 3.8, z: z });
poeSolid(x, z, 0.4, 0.4, y - 2, y + 4);
}
}
});
var LL = poeLight(0xFFB060, 0.9, 26, 0, 0, 0, G);
if (LL)
LL.steady = 1;
POE.lampLight = LL;
},
function () {
if (!POE.lampLight || !POE.roadLamps)
return;
var L = worldLocal(), best = null, bd = 1e9;
POE.roadLamps.forEach(function (p) { var d = Math.abs(p.x - L.x) + Math.abs(p.z - L.z); if (d < bd) {
bd = d;
best = p;
} });
if (best && bd < 90) {
POE.lampLight.L.position.set(best.x, best.y, best.z);
POE.lampLight.out = !!POE.room;
}
else
POE.lampLight.out = true;
},
function (kind, lit) {
var key = "win:" + kind + ":" + (lit ? 1 : 0);
if (POE.tex[key])
return POE.tex[key];
var t = wTex(128, 192, function (x, W, H) {
x.fillStyle = kind === "gothic" ? "#2A2620" : "#C8C0AE";
x.fillRect(0, 0, W, H);
var g = x.createLinearGradient(0, 0, 0, H);
if (lit) {
g.addColorStop(0, "#E8A858");
g.addColorStop(1, "#8A4A1A");
}
else {
g.addColorStop(0, "#3A4458");
g.addColorStop(0.6, "#141A24");
g.addColorStop(1, "#0A0C12");
}
x.fillStyle = g;
if (kind === "gothic") {
x.beginPath();
x.moveTo(10, H - 6);
x.lineTo(10, H * 0.36);
x.quadraticCurveTo(10, 8, W / 2, 6);
x.quadraticCurveTo(W - 10, 8, W - 10, H * 0.36);
x.lineTo(W - 10, H - 6);
x.fill();
x.strokeStyle = "#0A0A0A";
x.lineWidth = 2;
for (var i = -6; i < 12; i++) {
x.beginPath();
x.moveTo(i * 18, 0);
x.lineTo(i * 18 + H, H);
x.stroke();
x.beginPath();
x.moveTo(i * 18, H);
x.lineTo(i * 18 + H, 0);
x.stroke();
}
x.fillStyle = "#2A2620";
x.fillRect(W / 2 - 3, 10, 6, H);
}
else {
x.fillRect(10, 10, W - 20, H - 20);
x.fillStyle = "#C8C0AE";
x.fillRect(10, H / 2 - 4, W - 20, 8);
for (var c = 1; c < 3; c++)
x.fillRect(10 + c * (W - 20) / 3 - 2, 10, 4, H - 20);
for (var r = 1; r < 4; r++)
if (r !== 2)
x.fillRect(10, 10 + r * (H - 20) / 4 - 2, W - 20, 4);
if (kind === "shutter") {
x.fillStyle = "#2E3A30";
x.fillRect(0, 0, W * 0.24, H);
x.fillRect(W * 0.76, 0, W * 0.24, H);
x.fillStyle = "rgba(0,0,0,.4)";
for (var s = 0; s < H; s += 10) {
x.fillRect(0, s, W * 0.24, 3);
x.fillRect(W * 0.76, s, W * 0.24, 3);
}
}
}
if (lit) {
x.fillStyle = "rgba(40,20,10,.5)";
x.fillRect(W * 0.35, H * 0.3, W * 0.3, H * 0.5);
}
});
return (POE.tex[key] = t);
},
function (P, w, d, h, y, mat) {
var sh = new THREE.Shape();
sh.moveTo(-d / 2 - 0.4, 0);
sh.lineTo(0, h);
sh.lineTo(d / 2 + 0.4, 0);
sh.lineTo(-d / 2 - 0.4, 0);
var geo = new THREE.ExtrudeGeometry(sh, { depth: w + 0.6, bevelEnabled: false });
geo.translate(0, 0, -(w + 0.6) / 2);
geo.rotateY(Math.PI / 2);
var pa = geo.attributes.position, uv = geo.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, (pa.getX(i) + pa.getZ(i)) / 2, pa.getY(i) / 2);
uv.needsUpdate = true;
var r = new THREE.Mesh(geo, mat || poeS("slate"));
r.position.y = y;
P.add(r);
return r;
},
function (G, o) {
var g = poeGrp(G, o.x, o.y != null ? o.y : poeLand(o.x, o.z), o.z, o.ry || 0), w = o.w, d = o.d, h = o.h, wm = poeS(o.wall || "brick", o.col || 0xFFFFFF), fl = o.floors || Math.max(1, Math.round(h / 3.6));
poeBox(g, w, h, d, wm, 0, h / 2, 0);
poeBox(g, w + 0.3, 0.5, d + 0.3, poeS("stone", 0x8A847A), 0, 0.25, 0);
poeBox(g, w + 0.5, 0.35, d + 0.5, poeS("stone", 0xA8A090), 0, h - 0.1, 0);
for (var f = 1; f < fl; f++)
poeBox(g, w + 0.12, 0.16, d + 0.12, poeS("stone", 0x9A9284), 0, f * h / fl, 0);
if (o.roof !== "flat") {
poeRoof(g, w, d, o.roofH || Math.min(6, d * 0.45), h, poeS(o.roofMat || "slate"));
}
if (o.battle) {
for (var b = 0; b < Math.floor(w / 2.4); b++)
poeBox(g, 1.2, 1.2, 0.8, wm, -w / 2 + 1.2 + b * 2.4, h + 0.6, d / 2 - 0.4);
for (var b2 = 0; b2 < Math.floor(w / 2.4); b2++)
poeBox(g, 1.2, 1.2, 0.8, wm, -w / 2 + 1.2 + b2 * 2.4, h + 0.6, -d / 2 + 0.4);
}
if (o.chim) {
[-1, 1].forEach(function (k) { poeBox(g, 1.2, 3, 0.9, wm, k * (w / 2 - 1.6), h + (o.roofH || 3) * 0.6, 0); poeCyl(g, 0.18, 0.2, 0.6, poeC(0x4A3A30), k * (w / 2 - 1.6) - 0.25, h + (o.roofH || 3) * 0.6 + 1.7, 0, 6); poeCyl(g, 0.18, 0.2, 0.6, poeC(0x4A3A30), k * (w / 2 - 1.6) + 0.25, h + (o.roofH || 3) * 0.6 + 1.7, 0, 6); });
}
var bays = Math.max(1, Math.floor(w / (o.bay || 3.2))), kind = o.win || "sash", fh = h / fl, ww = o.winW || 1.15, wh = Math.min(fh * 0.6, o.winH || 2.0), lit = o.lit || [];
for (var f2 = 0; f2 < fl; f2++)
for (var bb = 0; bb < bays; bb++) {
var bx = -w / 2 + (bb + 0.5) * w / bays, by = f2 * fh + fh * 0.55;
if (f2 === 0 && o.door && Math.abs(bx - (o.door.ox || 0)) < (o.door.w || 1.4))
continue;
poeWin(g, bx, by, d / 2 + 0.02, 0, ww, wh, kind, lit.indexOf(f2 * bays + bb) >= 0);
poeWin(g, bx, by, -d / 2 - 0.02, Math.PI, ww, wh, kind, false);
}
if (d > 9)
for (var f3 = 0; f3 < fl; f3++)
for (var sb = 0; sb < Math.floor(d / 4); sb++) {
var sz = -d / 2 + (sb + 0.5) * d / Math.floor(d / 4);
poeWin(g, w / 2 + 0.02, f3 * fh + fh * 0.55, sz, Math.PI / 2, ww, wh, kind, false);
poeWin(g, -w / 2 - 0.02, f3 * fh + fh * 0.55, sz, -Math.PI / 2, ww, wh, kind, false);
}
if (o.door) {
var D = o.door, dw = D.w || 1.3, dh = D.h || 2.6, ox = D.ox || 0;
poeBox(g, dw + 0.5, dh + 0.4, 0.3, poeS("stone", 0xA8A090), ox, (dh + 0.4) / 2, d / 2 + 0.08);
poeBox(g, dw, dh, 0.1, poeS("oak", D.col || 0x5A3A2A), ox, dh / 2, d / 2 + 0.2);
poeSph(g, 0.05, poeShine(0xC8A050, 0.3, 0.9), ox + dw * 0.35, dh * 0.48, d / 2 + 0.27, 8);
poeBox(g, dw + 1, 0.2, 0.9, poeS("stone", 0x8A847A), ox, 0.1, d / 2 + 0.6);
if (D.lamp) {
var lp = poeBox(g, 0.3, 0.45, 0.3, poeGlowM(0xE8A050), ox + dw / 2 + 0.6, dh + 0.2, d / 2 + 0.35);
}
var c = Math.cos(o.ry || 0), s = Math.sin(o.ry || 0), fx = o.x + c * ox + s * (d / 2 + 1.4), fz = o.z - s * ox + c * (d / 2 + 1.4);
var key = D.key || D.to;
POE.exits["out:" + key] = { x: o.x + c * ox + s * (d / 2 + 2.6), z: o.z - s * ox + c * (d / 2 + 2.6), ry: (o.ry || 0) };
poeSpot(fx, fz, 2.2, D.name || "The door", "go in", function () { poeEnterRoom(D.to, "out:" + key); });
}
poeSolid(o.x, o.z, w + 0.6, d + 0.6, -2, h + 12, o.ry || 0);
return g;
},
function (P, x, z, y) {
var g = poeGrp(P, x, y == null ? poeLand(x, z) : y, z);
poeCyl(g, 0.06, 0.12, 3.4, poeShine(0x141414, 0.6, 0.7), 0, 1.7, 0, 8);
poeBox(g, 0.34, 0.5, 0.34, poeGlowM(0xE8B068), 0, 3.65, 0);
var cap = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.3, 4), poeShine(0x141414, 0.6, 0.7));
cap.position.y = 4.05;
cap.rotation.y = Math.PI / 4;
g.add(cap);
var gl = wGlow(0xFFB868, 3.2, 0.5);
gl.position.y = 3.65;
g.add(gl);
POE.roadLamps && POE.roadLamps.push({ x: x, y: g.position.y + 3.7, z: z });
poeSolid(x, z, 0.4, 0.4, -2, 5);
return g;
},
function (G) {
var A = POE_AT.raven, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x, z: A.z, r: 120 });
poeBuilding(g, { x: A.x, z: A.z, ry: Math.PI, w: 12, d: 22, h: 8, floors: 2, wall: "brick", col: 0x9A8A80, win: "shutter", lit: [4], chim: 1, door: { to: "chamber", name: "The door of the house of the Raven", key: "raven", lamp: 1 } });
var p = poeGrp(g, A.x, 0, A.z - 12.4);
[-1.6, 1.6].forEach(function (o) { poeCyl(p, 0.14, 0.16, 3, poeC(0xC8C2B2), o, 1.5, -0.4, 10); });
poeBox(p, 4.2, 0.2, 2, poeC(0x2A2420), 0, 3.1, -0.2);
for (var i = -6; i <= 6; i++) {
poeCyl(g, 0.02, 0.02, 1.3, poeShine(0x101010, 0.6, 0.7), A.x + i * 1.2, 0.65, A.z - 18, 4);
}
poeBox(g, 15, 0.05, 0.05, poeShine(0x101010, 0.6, 0.7), A.x, 1.25, A.z - 18);
poeDeadTree(g, A.x + 9, poeLand(A.x + 9, A.z - 22), A.z - 22, 1.4, 77);
poeStreetLamp(g, A.x - 3, A.z - 19.5);
var fp = poeGrp(g, A.x + 9, poeLand(A.x + 9, A.z - 42), A.z - 42, 0);
poeCyl(fp, 0.08, 0.1, 3.6, poeShine(0x141414, 0.6, 0.7), 0, 1.8, 0, 6);
[["PARIS · Barrière d’Enfer  →", 0, 3.3], ["The throne of NIGHT, the other tales  ↑", 0, 2.7]].forEach(function (S) { var p2 = wSign([S[0]], 3.2, 0.48, "#0C0C10", "#E0D4B0"); p2.position.set(0, S[2], 0.06); p2.rotation.y = S[1]; fp.add(p2); });
var fg = wGlow(0xFFB860, 3, 0.35);
fg.position.set(0, 3.9, 0.2);
fp.add(fg);
poeSolid(A.x + 9, A.z - 42, 0.4, 0.4, -2, 4);
poeSpot(A.x + 9, A.z - 40.5, 2.4, "The fingerpost: PARIS, the Barrière d’Enfer", "read it", function () { setStatus("🗼 <b>To Paris.</b> Follow the lamp-lit road east from this porch: it joins the road to the Barrière d’Enfer, the gate into Paris, 1841 (about 700 m). Or open the book (E) and choose <b>The way to Paris</b>."); });
},
function (G) {
var A = POE_AT.usher, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x, z: -520, r: 280 });
POE.usherG = g;
var stone = poeS("gothic", 0x8A847C), dark = poeS("stone", 0x6A665E);
POE.usherHalves = [];
[-1, 1].forEach(function (side) {
var h = poeGrp(g, A.x, 0, A.z);
POE.usherHalves.push(h);
var w = 28, cx = side * 14;
poeBox(h, w, 18, 26, stone, cx, 9, 0);
poeBox(h, w + 0.6, 0.6, 26.6, dark, cx, 18, 0);
for (var b = 0; b < 9; b++)
poeBox(h, 1.6, 1.6, 0.9, stone, cx - w / 2 + 1.5 + b * 3.2, 18.8, 12.6);
var tx = side * 30;
poeCyl(h, 5, 5.4, 28, stone, tx, 14, 2, POE.lite ? 10 : 18);
var cone = new THREE.Mesh(new THREE.ConeGeometry(6, 10, POE.lite ? 10 : 18), poeS("slate"));
cone.position.set(tx, 33, 2);
h.add(cone);
for (var k = 0; k < 3; k++)
poeWin(h, tx, 7 + k * 8, 7.45, 0, 1.2, 2.4, "gothic", false, false);
for (var f = 0; f < 3; f++)
for (var c = 0; c < 4; c++) {
var wx = cx - w / 2 + 3.5 + c * 7;
if (f === 0 && side === -1 && c === 3)
continue;
poeWin(h, wx, 3.4 + f * 5.4, 13.03, 0, 1.6, 3.2, "gothic", side === 1 && f === 1 && c === 0, false);
poeWin(h, wx, 3.4 + f * 5.4, -13.03, Math.PI, 1.6, 3.2, "gothic", false, false);
}
poeRoof(h, w, 26, 9, 18.4, poeS("slate", 0x8A8A90));
for (var m = 0; m < 14; m++) {
var fx = cx - w / 2 + 1 + m * 2, fu = poeBox(h, 0.08, 1 + ((m * 7) % 5) * 0.4, 0.08, poeC(0x3A4A2A), fx, 17.2 - ((m * 7) % 5) * 0.2, 13.2);
}
poeSolid(A.x + cx, A.z, w + 0.4, 26.6, -2, 40);
poeSolid(A.x + tx, A.z + 2, 11, 11, -2, 40);
});
var fz = poeGrp(g, A.x, 0, A.z + 13.1), fm = poeC(0x050404), pts = [[0, 26], [0.4, 22], [-0.3, 18], [0.5, 14], [-0.4, 10], [0.3, 6], [-0.2, 2], [0.2, 0]];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), s = poeBox(fz, 0.12, L, 0.06, fm, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0);
s.rotation.z = Math.atan2(b[0] - a[0], a[1] - b[1]);
}
POE.usherFissure = fz;
var ar = poeGrp(g, A.x, 0, A.z + 13);
poeBox(ar, 1.2, 7, 1.6, stone, -2.6, 3.5, 0.6);
poeBox(ar, 1.2, 7, 1.6, stone, 2.6, 3.5, 0.6);
var arch = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.6, 6, 16, Math.PI), stone);
arch.position.set(0, 7, 0.6);
ar.add(arch);
poeBox(ar, 4, 6.8, 0.2, poeS("oak", 0x4A3A2A), 0, 3.4, 0.2);
POE.exits["out:usher"] = { x: A.x, z: A.z + 19, ry: 0 };
poeSpot(A.x, A.door.z + 1.5, 2.6, "The Gothic archway of the hall", "go in", function () { poeEnterRoom("u_hall", "out:usher"); });
var C = A.causeway, cl = C.z0 - C.z1, cz = (C.z0 + C.z1) / 2;
poeBox(g, 4.4, 0.6, Math.abs(cl), poeS("flags", 0x7A766E), A.x, 0, cz);
poeFloor(A.x, cz, 4.2, Math.abs(cl), 0.3);
[-2.3, 2.3].forEach(function (o) { poeBox(g, 0.4, 0.9, Math.abs(cl), dark, A.x + o, 0.6, cz); poeSolid(A.x + o, cz, 0.4, Math.abs(cl), -3, 2); });
for (var t = 0; t < 28; t++) {
var R = wRand(400 + t), a = R() * 6.283, T = A.tarn, x = T.x + Math.cos(a) * T.rx * (1.15 + R() * 0.25), z = T.z + Math.sin(a) * T.rz * (1.15 + R() * 0.25);
if (Math.abs(x - A.x) < 8 && z > T.z)
continue;
var tr = poeDeadTree(g, x, poeLand(x, z), z, 0.9 + R() * 0.5, t + 40);
tr.traverse(function (o) { if (o.isMesh)
o.material = poeS("bark", 0xC8C4B8); });
}
for (var s = 0; s < 60; s++) {
var R2 = wRand(600 + s), a2 = R2() * 6.283, T2 = A.tarn, x2 = T2.x + Math.cos(a2) * T2.rx * (1.0 + R2() * 0.12), z2 = T2.z + Math.sin(a2) * T2.rz * (1.0 + R2() * 0.12);
var sg = poeBox(g, 0.05, 0.9 + R2(), 0.05, poeC(0x3A3A2A), x2, poeLand(x2, z2) + 0.5, z2);
sg.rotation.z = (R2() - 0.5) * 0.4;
}
POE.tarnBlock = true;
},
function (G) {
var A = POE_AT.heart, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x, z: A.z, r: 200 });
poePlane(g, 220, 14, poeS("cobbles", 0x8A8478), A.x, 0.04, A.z, 0);
poeFloor(A.x, A.z, 220, 14, 0.04);
[-8.5, 8.5].forEach(function (o) { poePlane(g, 220, 3, poeS("flags", 0x8A8478), A.x, 0.18, A.z + o, 0); poeBox(g, 220, 0.18, 0.25, poeS("stone", 0x8A847A), A.x, 0.09, A.z + o + (o < 0 ? 1.5 : -1.5)); });
var N = [[-70, "t_lodge", "A lodging house", 11, 0x7A6A60], [-30, null, null, 12, 0x6A5A52], [0, "t_house", "The old man's house", 12, 0x8A7A6E], [30, "t_neigh", "The neighbour's house", 11, 0x7A7068], [70, null, null, 12, 0x6E625A]];
N.forEach(function (H, i) {
var o = { x: A.x + H[0], z: A.z - 17, ry: 0, w: H[3], d: 12, h: 10, floors: 3, wall: "brick", col: H[4], win: "shutter", chim: 1, lit: i === 2 ? [] : [(i * 3) % 9] };
if (H[1])
o.door = { to: H[1], name: H[2], key: H[1], lamp: i === 2 };
else
o.door = { to: i === 1 ? "t_lodge" : "t_neigh", name: "A narrow house (a stair to the lodgers)", key: "x" + i };
poeBuilding(g, o);
});
var S = [[-50, "t_tavern", "The Black Horse tavern", 14, 0x6A5446], [0, "t_police", "The police office", 14, 0x8A8478], [50, null, null, 12, 0x7A6E62]];
S.forEach(function (H, i) {
var o = { x: A.x + H[0], z: A.z + 17, ry: Math.PI, w: H[3], d: 12, h: 10, floors: 3, wall: i === 1 ? "stone" : "brick", col: H[4], win: "sash", chim: 1, lit: [1, 4] };
o.door = { to: H[1] || "t_tavern", name: H[2] || "A house of rooms to let", key: H[1] || "ys" + i, lamp: true };
poeBuilding(g, o);
if (i === 0) {
var sg = wSign(["THE BLACK HORSE"], 2.6, 0.6, "#1A1410", "#D8C8A0");
sg.position.set(A.x + H[0], 4.2, A.z + 10.6);
sg.rotation.y = Math.PI;
g.add(sg);
}
if (i === 1) {
var sp = wSign(["POLICE"], 2.2, 0.5, "#101820", "#E8E0C8");
sp.position.set(A.x, 4.2, A.z + 10.6);
sp.rotation.y = Math.PI;
g.add(sp);
}
});
for (var l = -90; l <= 90; l += 30)
poeStreetLamp(g, A.x + l, A.z + (l % 60 ? -6.6 : 6.6), 0.18);
var cart = poeGrp(g, A.x - 40, 0.04, A.z + 3, 0.3);
poeBox(cart, 3, 0.15, 1.6, poeS("boards"), 0, 0.9, 0);
[-1, 1].forEach(function (k) { var wh = poeCyl(cart, 0.6, 0.6, 0.08, poeC(0x2A1E14), -0.6, 0.6, k * 0.9, 12); wh.rotation.x = Math.PI / 2; });
poeSolid(A.x - 40, A.z + 3, 3.2, 2, -2, 2);
poeCask(g, A.x - 54, 0.18, A.z + 9.4, 1);
poeCask(g, A.x - 53, 0.18, A.z + 9.6, 1);
poeBox(g, 2, 12, 40, poeS("brick", 0x6A5A52), A.x - 112, 6, A.z);
poeBox(g, 2, 12, 40, poeS("brick", 0x6A5A52), A.x + 112, 6, A.z);
poeSolid(A.x - 112, A.z, 2, 40, -2, 20);
poeSolid(A.x + 112, A.z, 2, 40, -2, 20);
POE.exits["out:heart"] = POE.exits["out:t_house"];
},
function (G) {
var A = POE_AT.masque, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x, z: A.z + 60, r: 320 });
var st = poeS("gothic", 0x7A746C);
var W = 200, D = 170, cz = A.z;
[[0, cz + D / 2, W, 0], [0, cz - D / 2, W, 0], [-W / 2, cz, D, 1], [W / 2, cz, D, 1]].forEach(function (s, i) {
var len = s[2], rot = s[3] ? Math.PI / 2 : 0;
if (i === 0) {
[-1, 1].forEach(function (k) { var seg = (len - 12) / 2; var b = poeBox(g, seg, 14, 3, st, s[0] + k * (6 + seg / 2), 7, s[1]); poeSolid(s[0] + k * (6 + seg / 2), s[1], seg, 3.4, -2, 20); for (var m = 0; m < seg / 3; m++)
poeBox(g, 1.4, 1.4, 3.2, st, s[0] + k * (6 + 1 + m * 3), 14.7, s[1]); });
}
else {
var bb = poeBox(g, len, 14, 3, st, s[0], 7, s[1], rot);
poeSolid(s[0], s[1], s[3] ? 3.4 : len, s[3] ? len : 3.4, -2, 20);
}
});
[-1, 1].forEach(function (k) { poeCyl(g, 4, 4.4, 22, st, A.x + k * 8, 11, cz + D / 2, 14); var c = new THREE.Mesh(new THREE.ConeGeometry(4.8, 7, 14), poeS("slate")); c.position.set(A.x + k * 8, 25.5, cz + D / 2); g.add(c); poeSolid(A.x + k * 8, cz + D / 2, 9, 9, -2, 30); });
var gate = poeGrp(g, A.x, 0, cz + D / 2);
for (var b = -5; b <= 5; b++)
poeCyl(gate, 0.07, 0.07, 10, poeShine(0x1A1A1A, 0.5, 0.8), b * 0.9, 5, 0, 6);
for (var r = 0; r < 4; r++)
poeBox(gate, 10, 0.2, 0.2, poeShine(0x1A1A1A, 0.5, 0.8), 0, 1.5 + r * 2.6, 0);
poeBox(gate, 0.6, 0.9, 0.4, poeGlowM(0xC85020), 0, 4.4, 0.3);
poeSolid(A.x, cz + D / 2, 12, 1, -2, 12);
POE.exits["out:masque"] = { x: A.x, z: A.gate.z + 6, ry: 0 };
poeSpot(A.x, A.gate.z + 3, 3, "The gates of the abbey", "go in (a guest of the Prince)", function () { poeEnterRoom("m_hall", "out:masque"); });
var ab = poeGrp(g, A.x, 0, cz - 10);
poeBox(ab, 90, 30, 60, st, 0, 15, 0);
poeRoof(ab, 90, 60, 16, 30, poeS("slate", 0x6A6A70));
for (var t = 0; t < 4; t++) {
var tx = -40 + t * 26.6;
poeCyl(ab, 4, 4, 44, st, tx, 22, 30, 12);
var cc = new THREE.Mesh(new THREE.ConeGeometry(5, 12, 12), poeS("slate"));
cc.position.set(tx, 50, 30);
ab.add(cc);
}
for (var f = 0; f < 3; f++)
for (var c2 = 0; c2 < 10; c2++)
poeWin(ab, -40 + c2 * 9, 6 + f * 9, 30.03, 0, 2, 4.4, "gothic", (c2 + f) % 3 === 0, false);
var cols = [0x2A4AD8, 0x7A2AB8, 0x2AA84A, 0xE87A1A, 0xF2F2F0, 0x9A4AE8, 0xC81010];
cols.forEach(function (col, i) { var wpane = poeFace(ab, 2.4, 6, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.75, fog: true }), 45.05, 12, -24 + i * 8, Math.PI / 2); });
var cots = [[-60, -830, 0.4], [50, -800, -0.5], [-30, -760, 0.2]];
cots.forEach(function (C, i) {
poeBuilding(g, { x: C[0], z: C[1], ry: C[2], w: 8, d: 6, h: 3.2, floors: 1, wall: "whitewash", col: 0xA8A090, roofMat: "rough", roofH: 2.6, win: "shutter", door: { to: "m_cot", name: "A cottage the Red Death emptied", key: "m_cot" + (i ? i : "") } });
if (i)
POE.exits["out:m_cot"] = POE.exits["out:m_cot"] || POE.exits["out:m_cot" + i];
});
POE.exits["out:m_cot"] = POE.exits["out:m_cot"] || POE.exits["out:m_cot1"];
var pc = poeGrp(g, 20, poeLand(20, -860), -860, 0.6);
poeBox(pc, 3.4, 0.2, 1.8, poeS("boards"), 0, 1, 0);
poeBox(pc, 3.4, 0.6, 0.08, poeS("boards"), 0, 1.3, 0.9);
poeBox(pc, 3.4, 0.6, 0.08, poeS("boards"), 0, 1.3, -0.9);
[-1, 1].forEach(function (k) { var wh = poeCyl(pc, 0.7, 0.7, 0.1, poeC(0x2A1E14), 0, 0.7, k * 1, 12); wh.rotation.x = Math.PI / 2; });
POE.plagueCart = pc;
poeSolid(20, -860, 3.6, 2.2, -2, 2);
for (var gr = 0; gr < 20; gr++) {
var R = wRand(800 + gr), gx = -80 + R() * 160, gz = -880 + R() * 100;
if (poeRoadD(gx, gz) < 6)
continue;
poeGrave(g, gx, poeLand(gx, gz), gz, R(), gr);
}
},
function (G) {
var A = POE_AT.pit, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x + 40, z: A.z, r: 200 });
poePlane(g, 90, 80, poeS("flags", 0xB0A890), A.x + 40, 0.05, A.z, 0);
poeFloor(A.x + 40, A.z, 90, 80, 0.05);
poeBuilding(g, { x: A.x, z: A.z, y: 0.05, ry: Math.PI / 2, w: 40, d: 30, h: 18, floors: 3, wall: "stone", col: 0xC8B898, roof: "flat", battle: 1, win: "shutter", door: { to: "p_court", name: "The doors of the House of the Inquisition", key: "pit", w: 2.6, h: 4.4, col: 0x3A2414 } });
var cr = poeGrp(g, A.x + 15.3, 12, A.z);
poeBox(cr, 0.3, 4, 0.6, poeC(0x141414), 0, 0, 0);
poeBox(cr, 0.3, 0.6, 2.6, poeC(0x141414), 0, 0.8, 0);
poeBuilding(g, { x: A.x + 78, z: A.z, y: 0.05, ry: -Math.PI / 2, w: 24, d: 12, h: 9, floors: 2, wall: "whitewash", col: 0xD8CCB0, roofMat: "tiles", roofH: 3, win: "shutter", lit: [2, 5], door: { to: "p_inn", name: "A posada on the plaza", key: "p_inn", lamp: true } });
var f = poeGrp(g, A.x + 40, 0.05, A.z);
poeCyl(f, 4, 4.2, 0.8, poeS("stone", 0xB0A890), 0, 0.4, 0, 20);
poeCyl(f, 0.5, 0.6, 2.4, poeS("stone", 0xB0A890), 0, 1.6, 0, 10);
poeCyl(f, 1.6, 1.2, 0.4, poeS("stone", 0xB0A890), 0, 2.8, 0, 14);
poeCyl(f, 3.7, 3.7, 0.1, poeShine(0x0A1218, 0.1, 0.3), 0, 0.75, 0, 20);
poeSolid(A.x + 40, A.z, 8.4, 8.4, -2, 1);
[[A.x + 40, A.z - 38, 0], [A.x + 40, A.z + 38, Math.PI]].forEach(function (W) { var wg = poeGrp(g, W[0], 0.05, W[1], W[2]); poeBox(wg, 90, 8, 2, poeS("stone", 0xB8AC94), 0, 4, 0); for (var c = 0; c < 12; c++) {
var arx = -40 + c * 7.3;
var ar = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.4, 5, 12, Math.PI), poeS("stone", 0xB8AC94));
ar.position.set(arx, 3, 1.1);
wg.add(ar);
} poeSolid(W[0], W[1], 90, 2.4, -2, 10); });
poeStreetLamp(g, A.x + 22, A.z - 12, 0.05);
poeStreetLamp(g, A.x + 22, A.z + 12, 0.05);
poeStreetLamp(g, A.x + 60, A.z + 20, 0.05);
},
function (G) {
var A = POE_AT.cask, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x, z: A.z, r: 200 });
poePlane(g, 100, 80, poeS("flags", 0xA89A80), A.x, 0.05, A.z - 10, 0);
poeFloor(A.x, A.z - 10, 100, 80, 0.05);
poeBuilding(g, { x: A.x, z: A.z + 28, y: 0.05, ry: Math.PI, w: 30, d: 20, h: 16, floors: 3, wall: "stone", col: 0xC8B8A0, roof: "flat", win: "shutter", lit: [1, 7], door: { to: "c_hall", name: "The palazzo of Montresor", key: "cask", w: 2.4, h: 3.8, col: 0x2A1A12, lamp: true } });
var arms = wSign(["NEMO ME IMPUNE LACESSIT"], 5, 0.6, "#1A140E", "#D8C890");
arms.position.set(A.x, 11, A.z + 17.6);
arms.rotation.y = Math.PI;
g.add(arms);
poeBuilding(g, { x: A.x - 42, z: A.z - 12, y: 0.05, ry: Math.PI / 2, w: 30, d: 12, h: 13, floors: 3, wall: "plaster", col: 0xD8A880, roofMat: "tiles", win: "shutter", lit: [2, 4, 8], door: { to: "c_wine", name: "A wine shop", key: "c_wine", lamp: true } });
poeBuilding(g, { x: A.x + 42, z: A.z - 12, y: 0.05, ry: -Math.PI / 2, w: 30, d: 12, h: 13, floors: 3, wall: "plaster", col: 0xC8B090, roofMat: "tiles", win: "shutter", lit: [1, 5], door: { to: "c_wine", name: "A house of the carnival (a stair to the dancing upstairs)", key: "c_wine2", lamp: true } });
var lc = [0xE84A2A, 0xE8C040, 0x3AA84A, 0x4A6AE8, 0xC84AC8];
for (var r = 0; r < 5; r++) {
var z = A.z - 40 + r * 14;
for (var k = 0; k < 9; k++) {
var x = A.x - 34 + k * 8.5, l = poeSph(g, 0.3, poeGlowM(lc[(r + k) % 5]), x, 8.2 - Math.sin(k / 8 * Math.PI) * 1.6, z, 8);
}
poeBox(g, 68, 0.02, 0.02, poeC(0x101010), A.x, 8, z);
}
[[-20, -30, 0.3], [18, -34, -0.3], [-8, -46, 0]].forEach(function (S) {
var s = poeGrp(g, A.x + S[0], 0.05, A.z + S[1], S[2]);
poeBox(s, 3.4, 1, 1.6, poeS("boards"), 0, 0.5, 0);
[-1.6, 1.6].forEach(function (o) { poeCyl(s, 0.06, 0.06, 2.6, poeC(0x3A2A1A), o, 1.3, 0.7, 6); poeCyl(s, 0.06, 0.06, 2.6, poeC(0x3A2A1A), o, 1.3, -0.7, 6); });
var aw = poeBox(s, 3.8, 0.08, 2, poeC([0xA8201A, 0x1A4A8A, 0x2A6A2A][(S[1] + 50) % 3 | 0]), 0, 2.7, 0);
aw.rotation.x = 0.15;
for (var m = 0; m < 6; m++)
poeSph(s, 0.12, poeShine([0xF4F2EE, 0x1A1A1A, 0xE8C040, 0xC81E2A][m % 4], 0.3, 0.3), -1.4 + m * 0.56, 1.15, 0.6, 8);
poeSolid(A.x + S[0], A.z + S[1], 3.6, 2, -2, 3, S[2]);
});
poeStreetLamp(g, A.x - 12, A.z + 12, 0.05);
poeStreetLamp(g, A.x + 12, A.z + 12, 0.05);
},
function (G) {
var A = POE_AT.morgue, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x + 40, z: A.z + 40, r: 260 });
var cx = A.x + 40, gz = A.z - 30;
poePlane(g, 14, 200, poeS("cobbles", 0x8A8478), cx, 0.04, A.z + 70, 0);
poeFloor(cx, A.z + 70, 14, 200, 0.04);
for (var l = 0; l <= 160; l += 32)
poeStreetLamp(g, cx + (l % 64 ? -6 : 6), A.z + 150 - l, 0.04);
var st = poeS("stone", 0xC8C0AC), dk = poeC(0x141414);
[-1, 1].forEach(function (s) {
poeBox(g, 120, 6, 1.4, st, cx + s * 68, 3, gz);
poeSolid(cx + s * 68, gz, 120, 1.6, -2, 8);
var P = poeGrp(g, cx + s * 16, 0, gz);
poeBox(P, 14, 9, 12, st, 0, 4.5, 0);
poeBox(P, 15, 0.8, 13, poeS("stone", 0xB8B0A0), 0, 9.2, 0);
poeBox(P, 13, 2.4, 11, poeS("slate", 0x5A5E66), 0, 10.8, 0);
for (var c = -1; c <= 1; c += 2) {
poeCyl(P, 0.7, 0.8, 7, st, c * 3.5, 3.5, 6.4, 12);
}
poeBox(P, 8.6, 1.2, 1.6, st, 0, 7.6, 6.4);
poeFace(P, 2.0, 3.2, poeGlowM(0xE8A858, 0.9), 0, 1.8, 6.05, 0);
poeSolid(cx + s * 16, gz, 14.4, 12.4, -2, 12);
});
var gt = poeGrp(g, cx, 0, gz);
for (var b = 0; b < 16; b++)
poeCyl(gt, 0.04, 0.04, 4.4, dk, -4.5 + b * 0.6, 2.2, 0, 5);
poeBox(gt, 9.6, 0.12, 0.12, dk, 0, 4.3, 0);
poeBox(gt, 9.6, 0.12, 0.12, dk, 0, 0.4, 0);
var sg = wSign(["BARRIÈRE D’ENFER · PARIS"], 6, 0.7, "#C8C0AC", "#2A2420");
sg.position.set(cx, 6.3, gz + 0.8);
g.add(sg);
var sg2 = wSign(["OCTROI DE PARIS"], 3.6, 0.5, "#C8C0AC", "#2A2420");
sg2.position.set(cx, 5.4, gz + 0.8);
g.add(sg2);
var gl = wGlow(0xFFB860, 6, 0.55);
gl.position.set(cx, 4.6, gz + 1.6);
g.add(gl);
POE.exits["out:dl_gate"] = { x: cx, z: gz + 4, ry: 0 };
poeSpot(cx, gz + 2.6, 3, "The Barrière d’Enfer: the gate into Paris, 1841", "go through, into Paris", function () { var E = POE_PAR_MON.enfer; poeEnterRoom("x_paris", "par:gate", { x: E[0], z: E[1] + 30, ry: 0 }); });
},
function (R, g) {
var w = R.w, d = R.d, h = R.h, wm = poeS(R.wall || "plaster", R.wallCol || POE_WALL_COL[R.wall] || 0xFFFFFF), fm = poeS(R.floor || "boards", R.floorCol || 0xFFFFFF);
var cm = R.ceil === "vault" ? poeS("vault", 0x9A9488) : R.ceil === "fretted" ? poeS("fretted") : R.ceil === "beams" ? poeS("beams") : R.ceil === "coffer" ? poeS("coffer") : R.ceil === "stone" ? poeS("stone", 0x8A847A) : poeS("plaster", 0xC8C0B0);
poePlane(g, w, d, fm, 0, 0, 0, 0);
var c = poePlane(g, w, d, cm, 0, h, 0, 0);
c.rotation.x = Math.PI;
var doors = (R.doors || []).map(function (D) { var P = poeDoorPos(R, D); return { D: D, P: P }; });
var dw = R.h > 8 ? 2.6 : 1.5, dh = R.h > 8 ? 4.2 : 2.7;
["n", "s", "e", "w"].forEach(function (side) {
var len = side === "n" || side === "s" ? w : d, cuts = doors.filter(function (q) { return q.D[0] === side; }).map(function (q) { return q.D[1]; }).sort(function (a, b) { return a - b; });
var ry = side === "n" ? 0 : side === "s" ? Math.PI : side === "e" ? -Math.PI / 2 : Math.PI / 2, wx = side === "e" ? w / 2 : side === "w" ? -w / 2 : 0, wz = side === "n" ? -d / 2 : side === "s" ? d / 2 : 0;
function piece(a, b, y0, y1) {
if (b - a < 0.01 || y1 - y0 < 0.01)
return;
var mid = (a + b) / 2, L = b - a;
if (side === "n" || side === "s")
poeFace(g, L, y1 - y0, wm, mid, (y0 + y1) / 2, wz, ry);
else
poeFace(g, L, y1 - y0, wm, wx, (y0 + y1) / 2, mid, ry);
}
var at = -len / 2;
cuts.forEach(function (o) { piece(at, o - dw / 2, 0, h); piece(o - dw / 2, o + dw / 2, dh, h); at = o + dw / 2; });
piece(at, len / 2, 0, h);
var sk = poeC(0x140C08), co = R.wall === "stone" || R.wall === "gothic" || R.wall === "copper" ? null : poeC(0x3A2E24);
if (side === "n" || side === "s") {
poeBox(g, w, 0.22, 0.05, sk, 0, 0.11, wz + (side === "n" ? 0.03 : -0.03));
if (co)
poeBox(g, w, 0.18, 0.12, co, 0, h - 0.09, wz + (side === "n" ? 0.06 : -0.06));
}
else {
poeBox(g, 0.05, 0.22, d, sk, wx + (side === "w" ? 0.03 : -0.03), 0.11, 0);
if (co)
poeBox(g, 0.12, 0.18, d, co, wx + (side === "w" ? 0.06 : -0.06), h - 0.09, 0);
}
});
R.doorAt = [];
doors.forEach(function (q, i) {
var P = q.P, D = q.D, fg = poeGrp(g, P.x, 0, P.z, P.ry), fr = R.wall === "stone" || R.wall === "gothic" || R.wall === "copper" ? poeS("stone", 0xA8A090) : poeC(0x2A1A10);
poeBox(fg, 0.16, dh + 0.16, 0.3, fr, -dw / 2 - 0.08, (dh + 0.16) / 2, 0);
poeBox(fg, 0.16, dh + 0.16, 0.3, fr, dw / 2 + 0.08, (dh + 0.16) / 2, 0);
poeBox(fg, dw + 0.32, 0.16, 0.3, fr, 0, dh + 0.08, 0);
var beyond = poeFace(fg, dw, dh, poeC(0x000000), 0, dh / 2, -0.2, 0);
beyond.material = POE.mats.blackBeyond || (POE.mats.blackBeyond = new THREE.MeshBasicMaterial({ color: 0x000000 }));
var leaf = poeGrp(fg, -dw / 2, 0, 0.05);
var lm = D[2] === "u_vault" || R.k === "u_vault" ? poeShine(0x2A2A2E, 0.5, 0.8) : poeS("oak", 0x6A4A34);
poeBox(leaf, dw, dh, 0.07, lm, dw / 2, dh / 2, 0);
for (var p = 0; p < 3; p++)
poeBox(leaf, dw * 0.7, dh * 0.22, 0.02, poeC(0x1A100A), dw / 2, dh * 0.2 + p * dh * 0.3, 0.045);
poeSph(leaf, 0.045, poeShine(0xC8A050, 0.3, 0.9), dw - 0.14, dh * 0.45, 0.07, 8);
leaf.rotation.y = -1.2;
R.doorAt.push({ D: D, P: P, leaf: leaf, frame: fg });
var wx2 = R.x + P.x + P.nx * 1.1, wz2 = P.z + P.nz * 1.1, lab = D[3] || "The door";
var S = poeSpot(wx2, wz2, 1.7, lab, D[2].indexOf("out:") === 0 ? "go out" : D[2] === "dark" ? "open it" : "go through", function () { poeDoorUse(R, D); }, 0);
S.roomDoor = D;
poeFloor(R.x + P.x + P.nx * 0.2, P.z + P.nz * 0.2, P.nx ? 1.0 : dw, P.nz ? 1.0 : dw, 0, true);
});
if (R.windows) {
var side = R.windows, n = Math.max(1, Math.round((side === "n" || side === "s" ? w : d) / 4));
for (var k = 0; k < n; k++) {
var o = -((side === "n" || side === "s" ? w : d) / 2) + (k + 0.5) * (side === "n" || side === "s" ? w : d) / n, wy = Math.min(h - 1.6, 1.1), wh = Math.min(h - wy - 0.5, 2.6);
if ((R.doors || []).some(function (D) { return D[0] === side && Math.abs(D[1] - o) < 1.6; }))
continue;
var px = side === "e" ? w / 2 - 0.03 : side === "w" ? -w / 2 + 0.03 : o, pz = side === "n" ? -d / 2 + 0.03 : side === "s" ? d / 2 - 0.03 : o, ry = side === "n" ? 0 : side === "s" ? Math.PI : side === "e" ? -Math.PI / 2 : Math.PI / 2;
if (R.wall === "gothic" || R.wall === "tapestry" || R.wall === "stone")
poeGothicWin(g, px, wy, pz, ry, 1.3, wh);
else {
poeSashWin(g, px, wy + wh / 2, pz, ry, 1.2, wh, false);
poeCurtains(g, px + (side === "e" ? -0.1 : side === "w" ? 0.1 : 0), wy + wh / 2 + 0.1, pz + (side === "n" ? 0.1 : side === "s" ? -0.1 : 0), ry, 1.9, wh + 0.6, 0x5A1A20);
}
}
}
poeFloor(R.x, 0, w - 0.8, d - 0.8, 0, true);
},
function (R, D) {
var lock = R.locked && R.locked[D[2]];
if (lock && !poeKeeper()) {
if (D[2].indexOf("out:") === 0 && poeActive()) {
poeLeaveAsk(D[2], lock);
return;
}
setStatus(lock);
if (typeof shnSfx === "function")
shnSfx("rattle");
return;
}
if (lock && poeKeeper())
setStatus("🔑 (Keeper) through a door the tale keeps shut for now.");
if (POE.onDoor) {
var r = false;
try {
r = POE.onDoor(R, D);
}
catch (e) { }
if (r)
return;
}
if (D[2] === "dark") {
setStatus("🚪 <b>Darkness there, and nothing more.</b>");
return;
}
if (D[2].indexOf("out:") === 0)
poeOutside(D[2]);
else
poeEnterRoom(D[2], R.k);
},
function (to, why) {
poeCard("The door out", (why ? "<p style='font-style:italic'>" + why + "</p>" : "") + "<p>The tale keeps you here until it is done. You may put the book down and go out; your place is kept, and you can carry on from the book (press E out in the land).</p>", [["Stay, and go on with the tale", "", null], ["Put the book down and go out", "Free to walk the land, and the road to Paris", function () { poePutDown(false, function () { poeOutside(to); }); }]]);
},
function (k) {
var R = POE_RX[k];
if (!R)
return null;
if (!R.g) {
var g = new THREE.Group();
g.position.set(R.x, 0, 0);
g.userData.room = 1;
POE.G.add(g);
R.g = g;
R.trig = [];
R.lightsIn = POE.lights.length;
var s0 = POE.spots.length, t0 = POE.talk.length;
try {
if (!R.custom)
poeShell(R, g);
var B = POE_RB[k];
if (B)
B(R, g);
}
catch (e) {
if (window.console)
console.warn("[poe] room " + k, e);
}
g.visible = false;
}
return R;
},
function (sec, mid, hold) {
if (!POE.veil) {
var v = document.createElement("div");
v.style.cssText = "position:fixed;inset:0;background:#000;opacity:0;pointer-events:none;z-index:40;transition:opacity .35s";
document.body.appendChild(v);
POE.veil = v;
}
var V = POE.veil;
POE.moving = true;
V.style.transition = "opacity " + sec + "s";
V.style.opacity = "1";
setTimeout(function () { try {
mid && mid();
}
catch (e) {
if (window.console)
console.warn("[poe] veil", e);
} setTimeout(function () { V.style.opacity = "0"; POE.moving = false; }, (hold || 0) * 1000 + 60); }, sec * 1000 + (window.POE_FAST ? 0 : 20));
},
function (k, from, at) {
var R = poeRoomGet(k);
if (!R)
return;
var Rwas = POE.room;
if (Rwas && Rwas.city && R !== Rwas && k === "x_cat" && Rwas.onLeave)
setTimeout(function () { if (POE.room === R)
try {
Rwas.onLeave();
}
catch (e) { } }, window.POE_FAST ? 60 : 500);
poeVeil(window.POE_FAST ? 0.01 : 0.35, function () {
POE.room = R;
POE.zone = "inside";
(R.trig || []).forEach(function (T) { T.done = false; });
R.t = 0;
poeShowOnly(R);
var P = null;
if (R.doorAt)
R.doorAt.forEach(function (q) { if (!P && (q.D[2] === from || (from && from.indexOf("out:") === 0 && q.D[2].indexOf("out:") === 0 && q.D[2] === from)))
P = q.P; });
if (!P && R.doorAt && from && from.indexOf("out:") === 0)
R.doorAt.forEach(function (q) { if (!P && q.D[2].indexOf("out:") === 0)
P = q.P; });
if (at) {
camera.position.set(POE.base + R.x + at.x, (at.y || 0) + 1.72, at.z);
yaw = at.ry || 0;
}
else if (P) {
camera.position.set(POE.base + R.x + P.x + P.nx * 1.6, 1.72, P.z + P.nz * 1.6);
yaw = Math.atan2(-P.nx, -P.nz);
}
else if (R.start) {
camera.position.set(POE.base + R.x + R.start.x, 1.72, R.start.z);
yaw = R.start.ry || 0;
}
else {
camera.position.set(POE.base + R.x, 1.72, R.d / 2 - 1.5);
yaw = 0;
}
pitch = 0;
if (typeof shnSfx === "function")
shnSfx("door");
if (R.onEnter)
try {
R.onEnter(from);
}
catch (e) {
if (window.console)
console.warn("[poe] enter " + k, e);
}
if (POE.onRoom)
try {
POE.onRoom(R, from);
}
catch (e) { }
});
},
function (to, at) {
var E0 = at || POE.exits[to];
if (E0 && (E0.par || E0.x >= POE_IN_X + 90000) && POE_RX.x_paris) {
var PR = POE_RX.x_paris;
POE.parPrev = POE.room;
poeEnterRoom("x_paris", to || "par:street", { x: E0.x - PR.x, z: E0.z, ry: (E0.ry || 0) + Math.PI });
return;
}
var E = at || POE.exits[to] || POE.exits["out:raven"] || { x: POE_AT.arrive.x, z: POE_AT.arrive.z, ry: Math.PI }, was = POE.room;
poeVeil(window.POE_FAST ? 0.01 : 0.35, function () {
POE.room = null;
poeShowOnly(null);
POE.zone = poeZoneAt(E.x, E.z);
camera.position.set(POE.base + E.x, poeGround(E.x, E.z, 1e4) + 1.72, E.z);
yaw = E.ry != null ? E.ry + Math.PI : 0;
pitch = 0;
if (typeof shnSfx === "function")
shnSfx("door");
if (was && was.onLeave)
try {
was.onLeave();
}
catch (e) { }
if (POE.onRoom)
try {
POE.onRoom(null, was && was.k);
}
catch (e) { }
});
},
function (kind, o) {
o = o || {};
if (window.POE_FAST && kind !== "heartoff" && kind !== "rainoff" && kind !== "windoff")
return;
if (!poeAcOk())
return;
var c = shnAc();
if (!c)
return;
var t = c.currentTime + (o.delay || 0), D = SHN_AU.out, R = SHN_AU.rev || SHN_AU.out, A = POE_AU;
function loopStop(k) { var L = A.loops[k]; if (L) {
try {
L.stop();
}
catch (e) { }
delete A.loops[k];
} }
try {
switch (kind) {
case "rain":
if (A.loops.rain)
break;
(function () {
var s = shnNoise(c, 4), f = c.createBiquadFilter(), g = c.createGain();
s.loop = true;
f.type = "bandpass";
f.frequency.value = 2600;
f.Q.value = 0.4;
s.connect(f);
f.connect(g);
g.connect(D);
g.gain.setValueAtTime(0.0001, t);
g.gain.exponentialRampToValueAtTime(0.09, t + 3);
s.start(t);
A.loops.rain = { stop: function () { var n = c.currentTime; g.gain.cancelScheduledValues(n); g.gain.setValueAtTime(g.gain.value, n); g.gain.exponentialRampToValueAtTime(0.0001, n + 2.5); s.stop(n + 2.6); } };
})();
break;
case "rainoff":
loopStop("rain");
break;
case "wind":
if (A.loops.wind)
break;
(function () {
var s = shnNoise(c, 6), f = c.createBiquadFilter(), g = c.createGain(), lf = c.createOscillator(), lg = c.createGain();
s.loop = true;
f.type = "lowpass";
f.frequency.value = 380;
f.Q.value = 3;
lf.frequency.value = 0.09;
lg.gain.value = 220;
lf.connect(lg);
lg.connect(f.frequency);
s.connect(f);
f.connect(g);
g.connect(D);
g.gain.setValueAtTime(0.0001, t);
g.gain.exponentialRampToValueAtTime(0.07, t + 4);
s.start(t);
lf.start(t);
A.loops.wind = { stop: function () { var n = c.currentTime; g.gain.cancelScheduledValues(n); g.gain.setValueAtTime(g.gain.value, n); g.gain.exponentialRampToValueAtTime(0.0001, n + 2); s.stop(n + 2.1); lf.stop(n + 2.1); } };
})();
break;
case "windoff":
loopStop("wind");
break;
case "tap":
for (var i = 0; i < (o.n || 3); i++)
shnNoiseHit(c, R, t + i * 0.32 + (i === 2 ? 0.12 : 0), 0.06, "bandpass", o.f || 900, 4, 0.32 * (o.k || 1), 0.004);
break;
case "lattice":
for (var j = 0; j < 4; j++)
shnNoiseHit(c, R, t + j * 0.28, 0.05, "bandpass", 2200, 6, 0.28, 0.003);
break;
case "flutter":
for (var fl = 0; fl < 10; fl++)
shnNoiseHit(c, R, t + fl * 0.06, 0.05, "bandpass", 600 + fl * 40, 1.5, 0.18, 0.01);
break;
case "nevermore":
shnNoiseHit(c, R, t, 0.32, "bandpass", 820, 5, 0.55, 0.02);
shnTone(c, R, "sawtooth", 360, t, 0.03, 0.12, 0.3, 260);
shnNoiseHit(c, R, t + 0.38, 0.42, "bandpass", 640, 5, 0.5, 0.02);
shnTone(c, R, "sawtooth", 300, t + 0.38, 0.03, 0.12, 0.4, 200);
break;
case "heart": {
var H = A.heart;
if (!H) {
H = A.heart = { k: o.k || 0.4, bpm: o.bpm || 60, on: true, next: c.currentTime + 0.1 };
(function beat() { if (!H.on)
return; var n = c.currentTime; if (H.next < n + 0.25) {
var tt = Math.max(H.next, n + 0.02);
shnTone(c, R, "sine", 58, tt, 0.01, 0.6 * H.k, 0.18, 40);
shnTone(c, R, "sine", 50, tt + 0.2, 0.01, 0.45 * H.k, 0.2, 34);
shnNoiseHit(c, D, tt, 0.06, "lowpass", 140, 1, 0.3 * H.k);
H.next = tt + 60 / H.bpm;
} setTimeout(beat, 90); })();
}
if (o.k != null)
H.k = o.k;
if (o.bpm != null)
H.bpm = o.bpm;
break;
}
case "heartoff":
if (A.heart) {
A.heart.on = false;
A.heart = null;
}
break;
case "chime":
[1, 2.01, 2.76, 4.1].forEach(function (k, ii) { shnTone(c, R, "sine", (o.f || 98) * k, t, 0.006, 0.32 / (ii + 1), 6 / (1 + ii * 0.6)); });
shnTone(c, D, "triangle", (o.f || 98) / 2, t, 0.01, 0.18, 4);
break;
case "swish":
shnNoiseHit(c, R, t, 0.7, "bandpass", o.f || 1800, 1.2, 0.22 * (o.k || 1), 0.25);
break;
case "rats":
for (var r2 = 0; r2 < (o.n || 8); r2++)
shnTone(c, R, "square", 2400 + Math.random() * 1800, t + r2 * 0.09 + Math.random() * 0.05, 0.005, 0.03, 0.07, 3000 + Math.random() * 1000);
for (var r3 = 0; r3 < 6; r3++)
shnNoiseHit(c, D, t + r3 * 0.13, 0.05, "highpass", 3000, 1, 0.08, 0.004);
break;
case "trowel":
shnNoiseHit(c, R, t, 0.25, "bandpass", 2600, 3, 0.18, 0.01);
shnNoiseHit(c, R, t + 0.3, 0.18, "bandpass", 1800, 2, 0.14, 0.01);
break;
case "stone":
shnNoiseHit(c, R, t, 0.18, "lowpass", 700, 1, 0.55, 0.003);
shnTone(c, R, "sine", 110, t, 0.003, 0.3, 0.25, 70);
break;
case "chain":
for (var ch = 0; ch < 7; ch++)
shnNoiseHit(c, R, t + ch * 0.08 + Math.random() * 0.04, 0.07, "bandpass", 2800 + Math.random() * 800, 6, 0.22, 0.003);
break;
case "bells":
for (var b = 0; b < 5; b++)
shnTone(c, R, "sine", 2600 + Math.random() * 900, t + b * 0.07, 0.002, 0.05 * (o.k || 1), 0.3);
break;
case "cough":
[0, 0.32, 0.62, 1.0].forEach(function (dd) { shnNoiseHit(c, R, t + dd, 0.22, "bandpass", 420, 1.4, 0.35, 0.01); });
break;
case "splash":
shnNoiseHit(c, R, t, 1.4, "lowpass", 900, 0.6, 0.35, 0.02);
shnTone(c, R, "sine", 160, t, 0.01, 0.12, 0.5, 90);
break;
case "shriek":
shnTone(c, R, "sawtooth", 1100, t, 0.05, 0.18, 1.6, 560, 0.4);
shnTone(c, R, "square", 1480, t + 0.05, 0.05, 0.06, 1.4, 700, 0.3);
shnNoiseHit(c, D, t, 1.4, "bandpass", 2400, 2, 0.22, 0.03);
break;
case "grating":
shnNoiseHit(c, R, t, 2.4, "bandpass", 340, 4, 0.45, 0.3);
shnTone(c, R, "sawtooth", 48, t, 0.4, 0.12, 2.2, 38, 0.6);
break;
case "clang":
[1, 2.7, 5.4].forEach(function (k, ii) { shnTone(c, R, "square", 160 * k, t, 0.003, 0.2 / (ii + 1), 2.6 / (ii + 1)); });
shnNoiseHit(c, R, t, 0.5, "highpass", 1800, 1, 0.4, 0.002);
break;
case "crash":
shnNoiseHit(c, D, t, 4.5, "lowpass", 200, 0.6, 1.0, 0.05);
shnTone(c, R, "sine", 38, t, 0.05, 0.9, 4, 26);
shnNoiseHit(c, R, t + 0.4, 3, "lowpass", 900, 0.5, 0.4, 0.2);
break;
case "trumpet":
[0, 0.35, 0.7].forEach(function (dd, ii) { [1, 1.5, 2].forEach(function (k) { shnTone(c, R, "sawtooth", (ii === 2 ? 392 : 330) * k / 2, t + dd, 0.04, 0.06, 0.5, null, 0.2); }); });
break;
case "ape":
shnTone(c, R, "sawtooth", 240, t, 0.05, 0.25, 0.9, 520, 0.3);
shnTone(c, R, "square", 380, t + 0.5, 0.04, 0.12, 0.6, 180);
shnNoiseHit(c, D, t, 1, "bandpass", 900, 1.5, 0.3, 0.02);
break;
case "sizzle":
shnNoiseHit(c, R, t, 1.6, "highpass", 3200, 0.7, 0.12, 0.3);
break;
case "laugh":
for (var la = 0; la < 5; la++)
shnTone(c, R, "triangle", 220 - la * 12, t + la * 0.18, 0.01, 0.12, 0.14, 180);
break;
case "dance": break;
default: if (typeof shnSfx === "function")
shnSfx(kind, o);
}
}
catch (e) { }
},
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "room:" + room : poeAreaNow();
list.forEach(function (T) {
var nm = T.name || "";
if (!(re ? re.test(nm) : (nm === name)))
return;
var x, z, y, rk = null;
if (T.p && T.p.g) {
x = T.p.g.position.x + (T.p.ox || 0);
z = T.p.g.position.z;
y = T.p.room ? 0 : T.p.g.position.y;
rk = T.p.room ? T.p.room.k : null;
if (!T.p.g.visible && !T.p.room)
return;
}
else {
x = T.x;
z = T.z;
y = T.y;
rk = x >= POE_IN_X - 1000 ? poeRoomAtX(x) : null;
}
var P = { x: x, z: z, y: y != null ? y : (rk || x >= POE_IN_X - 1000 ? 0 : poeLand(x, z)), area: rk ? "room:" + rk : "out", T: T };
if (room && P.area !== here)
return;
if (!out || P.area === here)
out = P;
});
return out;
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (at.who) {
var W = poeNamed(POE.talk, at.who, at.room);
if (W)
return W;
}
if (at.spot) {
var Sp = poeNamed(POE.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.room) {
var R = POE_RX[at.room];
if (!R)
return null;
return { x: R.x + (at.lx || 0), y: at.y || 0, z: at.lz != null ? at.lz : 0, area: "room:" + at.room };
}
if (at.x != null) {
var y = at.y != null ? at.y : poeGround(at.x, at.z);
return { x: at.x, y: y, z: at.z, area: "out" };
}
return null;
},
function (k) {
var seen = {}, q = [k], n = 0;
while (q.length && n++ < 12) {
var cur = q.shift();
if (seen[cur])
continue;
seen[cur] = 1;
var R = POE_RX[cur];
if (!R)
continue;
for (var i = 0; i < (R.doors || []).length; i++) {
var D = R.doors[i];
if (D[2].indexOf("out:") === 0) {
var E = POE.exits[D[2]];
if (E) {
var c = Math.cos(E.ry || 0), s = Math.sin(E.ry || 0);
return { x: E.x - s * 1.2, z: E.z - c * 1.2, y: poeGround(E.x, E.z), area: "out" };
}
}
else
q.push(D[2]);
}
}
return null;
},
function (fromK, toK) {
var R = POE_RX[fromK];
if (!R || !R.doorAt)
return null;
var prev = {}, q = [fromK], seen = {};
seen[fromK] = 1;
while (q.length) {
var cur = q.shift();
if (cur === toK)
break;
var C = POE_RX[cur];
if (!C)
continue;
(C.doors || []).forEach(function (D) { var nx = D[2].indexOf("out:") === 0 ? "out" : D[2]; if (nx === "dark" || seen[nx])
return; seen[nx] = 1; prev[nx] = cur; if (nx !== "out")
q.push(nx); });
}
var tgt = toK;
if (!prev[tgt] && tgt !== "out")
tgt = "out";
if (!prev[tgt])
return null;
while (prev[tgt] && prev[tgt] !== fromK)
tgt = prev[tgt];
var door = null;
R.doorAt.forEach(function (qd) { var nx = qd.D[2].indexOf("out:") === 0 ? "out" : qd.D[2]; if (!door && nx === tgt)
door = qd; });
if (!door)
return null;
return { x: R.x + door.P.x + door.P.nx * 0.9, z: door.P.z + door.P.nz * 0.9, y: 0, area: "room:" + fromK };
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
return Math.round(d) + " m " + w;
},
function () {
if (POEB.beam && POEB.beam.parent)
return POEB.beam;
var g = new THREE.Group();
var m = new THREE.MeshBasicMaterial({ color: 0xC8D4FF, transparent: true, opacity: 0.1, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.55, 1, 14, 1, true), m);
c.position.y = 0.5;
g.add(c);
g.userData.col = c;
var rm = new THREE.MeshBasicMaterial({ color: 0xB8C8FF, transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, side: THREE.DoubleSide });
var r = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.84, 32), rm);
r.rotation.x = -Math.PI / 2;
r.position.y = 0.05;
g.add(r);
g.userData.ring = r;
var s = wGlow(0xD8E0FF, 0.3, 0.55);
s.position.y = 1.2;
g.add(s);
g.userData.spark = s;
g.userData.keep = 1;
g.userData.keepVis = 1;
POE.G.add(g);
POEB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m;
switch (kind) {
case "book":
m = poeBox(g, 0.22, 0.06, 0.3, poeC(0x5A1A14), 0, 0.04, 0);
poeBox(g, 0.2, 0.05, 0.28, poeC(0xE8E0C8), 0.01, 0.04, 0);
break;
case "key":
m = poeCyl(g, 0.012, 0.012, 0.16, poeShine(0x8A7A4A, 0.4, 0.9), 0, 0.06, 0, 6);
m.rotation.z = Math.PI / 2;
break;
case "stone":
m = poeSph(g, 0.14, poeS("rough"), 0, 0.09, 0, 7);
m.scale.y = 0.7;
break;
case "brick":
m = poeBox(g, 0.3, 0.12, 0.16, poeS("rough", 0xC8C0B0), 0, 0.06, 0);
break;
case "bottle":
poeBottle(g, 0, 0, 0, 0x1A3A1A, true);
break;
case "torch":
m = poeCyl(g, 0.03, 0.04, 0.6, poeC(0x3A2A1A), 0, 0.04, 0, 6);
m.rotation.z = Math.PI / 2;
break;
case "paper":
m = poeBox(g, 0.22, 0.01, 0.3, poeC(0xEDE4CC), 0, 0.02, 0);
break;
case "hair":
m = poeSph(g, 0.07, poeC(0x5A3A1A), 0, 0.05, 0, 8);
m.scale.set(1.6, 0.4, 1);
break;
case "nail":
m = poeCyl(g, 0.008, 0.008, 0.12, poeShine(0x5A5A5A, 0.5, 0.8), 0, 0.03, 0, 5);
m.rotation.z = Math.PI / 2;
break;
case "ribbon":
m = poeBox(g, 0.3, 0.01, 0.04, poeC(0x2A1A1A), 0, 0.02, 0);
break;
case "whistle":
m = poeCyl(g, 0.014, 0.016, 0.12, poeShine(0xB8B0A0, 0.3, 0.9), 0, 0.02, 0, 8);
m.rotation.z = Math.PI / 2;
poeCyl(g, 0.02, 0.02, 0.03, poeShine(0xB8B0A0, 0.3, 0.9), 0.06, 0.03, 0, 8);
break;
case "meat":
m = poeSph(g, 0.1, poeC(0x8A3A2A), 0, 0.06, 0, 8);
m.scale.set(1.3, 0.6, 1);
break;
case "hem":
m = poeBox(g, 0.4, 0.01, 0.06, poeC(0x5A5248), 0, 0.02, 0);
break;
case "feather":
m = poeBox(g, 0.04, 0.01, 0.3, poeC(0x0A0A0E), 0, 0.03, 0);
break;
case "chair":
poeChair(g, 0, 0, 0, 0x6A2A2A);
break;
case "book":
m = poeBox(g, 0.2, 0.07, 0.28, poeC(0x4A1A14), 0, 0.9, 0);
poeBox(g, 0.18, 0.05, 0.27, poeC(0xD8D0B8), 0.012, 0.9, 0);
break;
case "flower":
poeCyl(g, 0.12, 0.08, 0.16, poeC(0xC8C0B0), 0, 0.08, 0, 10);
[0xC82A3A, 0xE8D8E8, 0xE8C040].forEach(function (c, i) { poeSph(g, 0.06, poeC(c), Math.cos(i * 2.1) * 0.07, 0.26, Math.sin(i * 2.1) * 0.07, 6); });
break;
case "candle":
poeCandle(g, 0, 0.9, 0, 0.22, true);
poeCyl(g, 0.05, 0.07, 0.9, poeC(0x2A1A10), 0, 0.45, 0, 6);
break;
case "wisp":
m = poeSph(g, 0.16, poeGlowM(0xE8D8FF, 0.35), 0, 1.3, 0, 8);
break;
case "trowel":
m = poeBox(g, 0.1, 0.01, 0.18, poeShine(0x9A9AA0, 0.3, 0.9), 0, 0.03, 0);
poeCyl(g, 0.018, 0.018, 0.12, poeC(0x4A3020), 0, 0.04, 0.14, 6).rotation.x = Math.PI / 2;
break;
case "pace":
m = new THREE.Group();
g.add(m);
break;
case "pistol":
m = poeBox(g, 0.04, 0.05, 0.26, poeShine(0x3A3A40, 0.4, 0.8), 0, 0.82, 0);
poeBox(g, 0.045, 0.12, 0.06, poeC(0x4A2A14), 0, 0.76, 0.12);
break;
case "stone":
m = poeBox(g, 0.36, 0.18, 0.3, poeS("stone", 0x8A8680), 0, 0.09, 0);
break;
case "coin":
m = poeCyl(g, 0.04, 0.04, 0.01, poeShine(0xE8C040, 0.2, 0.95), 0, 0.02, 0, 10);
break;
case "rag":
m = poeBox(g, 0.3, 0.01, 0.2, poeC(0x6A6258), 0, 0.02, 0);
break;
default: m = poeSph(g, 0.1, poeC(0xE8D8A8), 0, 0.15, 0, 10);
}
var gl = wGlow(0xD8E0FF, 0.5, 0.45);
gl.position.y = 0.3;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
g.userData.item = 1;
return g;
},
function (kind, P, name, verb, onTake) {
if (!P)
return null;
var g = poeItemMesh(kind);
g.position.set(P.x, (P.y || 0) + 0.02, P.z);
POE.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = poeSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (POEB.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = POE.spots.indexOf(I.S);
if (j >= 0)
POE.spots.splice(j, 1);
POEB.items = POEB.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(720, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[poe] take", e);
}
}, P.y);
I.S.book = 1;
POEB.items.push(I);
return I;
},
function (k) {
if (POEB.tuneKey === k)
return;
POEB.tuneKey = k;
var old = POEB.tune;
POEB.tune = null;
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
if (!k || !POE_TUNES[k] || window.POE_FAST)
return;
try {
var A = new Audio(POE_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
POEB.tune = A;
var v = window.POE_VOL != null ? window.POE_VOL : 0.26, fi = setInterval(function () { try {
if (POEB.tune !== A) {
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
if (POE_TXT.data)
return fn(POE_TXT.data);
POE_TXT.wait.push(fn);
if (POE_TXT.wait.length > 1)
return;
fetch("data/poe/tales.json").then(function (r) { return r.json(); }).then(function (d) { POE_TXT.data = d; var w = POE_TXT.wait; POE_TXT.wait = []; w.forEach(function (f) { try {
f(d);
}
catch (e) { } }); })
.catch(function () { var w = POE_TXT.wait; POE_TXT.wait = []; w.forEach(function (f) { try {
f(null);
}
catch (e) { } }); });
},
function (key) {
poeTextLoad(function (D) {
var T = D && D.tales && D.tales[key];
if (!T) {
setStatus("📖 The book could not be opened just now.");
return;
}
var P = T.p, page = 0, per = 6;
function show() {
var b = "<div style='font-size:12px;opacity:.7'>Edgar Allan Poe · " + poeEsc(T.year || "") + " · the Raven Edition</div><h3 style='margin:4px 0'>" + poeEsc(T.t) + "</h3><div style='max-height:52vh;overflow:auto;font-family:Georgia,serif;line-height:1.5'>";
P.slice(page * per, page * per + per).forEach(function (p) { b += "<p style='margin:6px 0'>" + poeEsc(p) + "</p>"; });
b += "</div><div style='font-size:12px;opacity:.7'>Page " + (page + 1) + " of " + Math.ceil(P.length / per) + "</div>";
var fns = {};
if (page > 0) {
b += worldBtn("prev", "◀ Back", "");
fns.prev = function () { page--; show(); };
}
if ((page + 1) * per < P.length) {
b += worldBtn("next", "Turn the page ▶", "");
fns.next = function () { page++; show(); };
}
worldCard(b, fns);
}
show();
});
},
function (fn) {
if (POE_WORKS.data)
return fn(POE_WORKS.data);
POE_WORKS.wait.push(fn);
if (POE_WORKS.wait.length > 1)
return;
fetch("data/poe/works.json").then(function (r) { return r.json(); }).then(function (d) { POE_WORKS.data = d; var w = POE_WORKS.wait; POE_WORKS.wait = []; w.forEach(function (f) { try {
f(d);
}
catch (e) { } }); })
.catch(function () { var w = POE_WORKS.wait; POE_WORKS.wait = []; w.forEach(function (f) { try {
f(null);
}
catch (e) { } }); });
},
function (vol) {
worldCard("<h3 style='margin:4px 0;font-family:Georgia,serif'>📚 The Works of Edgar Allan Poe</h3><div style='opacity:.7'>Taking the books down…</div>");
poeWorksLoad(function (D) {
if (!D) {
worldCard("<h3 style='margin:4px 0'>📚 The Works of Edgar Allan Poe</h3><p>The books would not come off the shelf just now. Try again in a moment.</p>");
return;
}
var W = D.works, b = "<h3 style='margin:4px 0;font-family:Georgia,serif'>📚 The Works of Edgar Allan Poe</h3><div style='font-size:12px;opacity:.7'>The Raven Edition, in five volumes. Take down any one and read.</div>", fns = {};
if (!vol) {
POE_VOLS.forEach(function (v, i) { b += worldBtn("v" + (i + 1), "Volume " + v, W.filter(function (w) { return w.v === i + 1; }).length + " works"); fns["v" + (i + 1)] = function () { poeShelf(i + 1); }; });
worldCard(b, fns);
return;
}
b += "<div style='margin:6px 0;font-weight:700'>Volume " + poeEsc(POE_VOLS[vol - 1]) + "</div><div style='max-height:56vh;overflow:auto'>";
W.forEach(function (w, i) { if (w.v !== vol)
return; b += worldBtn("w" + i, (w.poem ? "✒️ " : "📖 ") + poeEsc(w.t), ""); fns["w" + i] = function () { poeWorkRead(i, 0, vol); }; });
b += "</div>" + worldBtn("back", "◀ The other volumes", "");
fns.back = function () { poeShelf(0); };
worldCard(b, fns);
});
},
function (i, page, vol) {
var w = POE_WORKS.data && POE_WORKS.data.works[i];
if (!w)
return;
var P = w.p, per = w.poem ? 4 : 6, n = Math.max(1, Math.ceil(P.length / per));
var b = "<div style='font-size:12px;opacity:.7'>Edgar Allan Poe · the Raven Edition, volume " + w.v + "</div><h3 style='margin:4px 0;font-family:Georgia,serif'>" + poeEsc(w.t) + "</h3><div style='max-height:52vh;overflow:auto;font-family:Georgia,serif;line-height:1.5'>";
P.slice(page * per, page * per + per).forEach(function (p) { b += "<p style='margin:6px 0" + (w.poem ? ";white-space:pre-line" : "") + "'>" + poeEsc(p) + "</p>"; });
b += "</div><div style='font-size:12px;opacity:.7'>Page " + (page + 1) + " of " + n + "</div>";
var fns = {};
if (page > 0) {
b += worldBtn("prev", "◀ Back a page", "");
fns.prev = function () { poeWorkRead(i, page - 1, vol); };
}
if (page + 1 < n) {
b += worldBtn("next", "Turn the page ▶", "");
fns.next = function () { poeWorkRead(i, page + 1, vol); };
}
b += worldBtn("shelf", "Put it back on the shelf", "Choose another");
fns.shelf = function () { poeShelf(vol); };
worldCard(b, fns);
},
function (title, html, btns) {
var b = "<h3 style='margin:4px 0;font-family:Georgia,serif'>" + title + "</h3><div style='font-family:Georgia,serif;line-height:1.5'>" + html + "</div>", fns = {};
(btns || [["Go on", "", null]]).forEach(function (B, i) { b += worldBtn("b" + i, B[0], B[1] || ""); fns["b" + i] = function () { worldCard(null); if (B[2])
B[2](); }; });
worldCard(b, fns);
},
function () {
var S = poeBS(), C = POE_CH[S.ch];
if (!C)
return;
POEB.readAsk = 0;
POEB.readOpen = 1;
var b = "<div style='font-size:12px;opacity:.7'>Edgar Allan Poe" + (C.year ? " · " + C.year : "") + "</div><h3 style='margin:4px 0;font-family:Georgia,serif'>" + (S.ch + 1) + ". " + poeEsc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0;font-style:italic;font-family:Georgia,serif'>" + C.words + "</p>" : "");
if (C.warn)
b += "<p style='margin:6px 0;font-size:12px;opacity:.8'>" + poeA(C.warn[0], C.warn[1]) + "</p>";
var fns = { go: function () { worldCard(null); POEB.readOpen = 0; poeStepDone(); }, all: function () { poeTaleText(C.key); } };
b += worldBtn("go", "▶ Begin", C.intro || "");
if (C.key)
b += worldBtn("all", "📖 Read the whole tale", "Poe's own words, every one");
b += poeKeeperBtns(fns);
worldCard(b, fns);
},
function (fns) {
if (!poeKeeper())
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any tale</div><div>";
POE_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); poeJump(i); }; });
return b + "</div>";
},
function (place) {
var S = poeBS(), C = POE_CH[S.ch];
if (!C)
return;
if (S.paused) {
S.paused = 0;
poeSave();
}
poeItemsClear();
POEB.hold = 0;
POEB.puz = null;
POE.black = false;
POE.lock = null;
poeSfx("heartoff");
if (place && C.start)
poePlaceAt(C.start);
try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[poe] setup", S.ch, e);
}
poeTune(C.tune || null);
poeStepBegin();
},
function (st) {
if (st.room) {
poeEnterRoom(st.room, st.from || null, st.at || null);
return;
}
if (POE.room) {
poeOutside(null, { x: st.x, z: st.z, ry: (st.ry || 0) + Math.PI });
return;
}
camera.position.set(POE.base + st.x, poeGround(st.x, st.z, 1e4) + 1.72, st.z);
if (st.ry !== undefined)
yaw = st.ry;
pitch = 0;
POE.zone = poeZoneAt(st.x, st.z);
},
function () {
var b = poeStep();
poeItemsClear();
POEB.hold = 0;
POEB.still = 0;
if (!b)
return;
b._t0 = performance.now();
b._key = poeKey();
try {
if (b.on)
b.on(poeBS().f);
}
catch (e) {
if (window.console)
console.warn("[poe] on", e);
}
if (b.k === "read") {
poeChapterCard();
return;
}
if (b.k === "card") {
var k = poeKey();
poeCard(b.card[0], typeof b.card[1] === "function" ? b.card[1]() : b.card[1], (b.choices || [[b.card[2] || "Go on", "", null]]).map(function (B) { return [B[0], B[1], function () { if (poeKey() !== k)
return; if (B[2] === false) {
poeSay(B[3] || "No. Think again.");
setTimeout(function () { if (poeKey() === k)
poeStepBegin(); }, window.POE_FAST ? 5 : 1600);
return;
} if (typeof B[2] === "function")
B[2](); poeStepDone(); }]; }));
return;
}
if (b.k === "puzzle") {
POEB.puz = { b: b, k: poeKey() };
try {
b.start(poeBS().f, function () { if (poeKey() === b._key)
poeStepDone(); });
}
catch (e) {
if (window.console)
console.warn("[poe] puzzle", e);
}
}
if (b.k === "find")
poeItemAdd(b.item, poePos(b.at), b.name, b.verb, function () { if (poeKey() === b._key)
poeStepDone(); });
if (b.k === "gather") {
var P = poePos(b.at), n = b.n || 3, sp = b.spread || 4, R = wRand(poeBS().ch * 97 + poeBS().s * 13 + 7);
POEB.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
if (P.area === "out")
Q.y = poeGround(Q.x, Q.z);
else {
var RR = POE_RX[P.area.slice(5)];
if (!RR.custom) {
Q.x = Math.max(RR.x - RR.w / 2 + 0.7, Math.min(RR.x + RR.w / 2 - 0.7, Q.x));
Q.z = Math.max(-RR.d / 2 + 0.7, Math.min(RR.d / 2 - 0.7, Q.z));
}
Q.y = P.y || 0;
}
if (b.pts && b.pts[i]) {
Q.x = P.x + b.pts[i][0];
Q.z = P.z + b.pts[i][1];
}
poeItemAdd(b.item, Q, b.name, b.verb, function () { if (poeKey() !== b._key)
return; POEB.got++; if (POEB.got < n) {
poeSay((b.each || "One.") + " " + POEB.got + " of " + n + ".");
return;
} poeStepDone(); });
}
}
if (b.h)
poeSay("<b>" + poeEsc(POE_CH[poeBS().ch].t) + ".</b> " + (typeof b.h === "function" ? b.h() : b.h));
},
function () {
var S = poeBS(), C = POE_CH[S.ch], b = poeStep();
if (!b)
return;
POEB.puz = null;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[poe] done", e);
}
if (b.say)
poeSay(typeof b.say === "function" ? b.say() : b.say);
S.s++;
if (window.POE_LOG)
POE_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
var K = POE_KEEPS[C.key];
if (K && !S.keeps.some(function (k) { return k.k === K[0]; }))
S.keeps.push({ k: K[0], n: K[1], i: K[2], at: Date.now() });
try {
if (C.end)
C.end(S.f);
}
catch (e) { }
if (S.ch >= POE_CH.length - 1) {
S.done = 1;
S.s = 0;
poeSave();
poeItemsClear();
poeFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
poeSave();
var nx = POE_CH[S.ch];
setTimeout(function () { try {
poeChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[poe]", e);
} }, window.POE_FAST ? 10 : 3200);
return;
}
poeSave();
poeStepBegin();
},
function () {
poeTune("raven");
var S = poeBS();
var b = "<h3 style='margin:4px 0;font-family:Georgia,serif'>Out of SPACE, out of TIME</h3><p style='font-style:italic;font-family:Georgia,serif'>\"All that we see or seem is but a dream within a dream.\"</p><p>You have lived every tale in this part of Poe's Dream-Land, start to finish. Your keepsakes, one from every tale:</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + poeEsc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div><p style='font-size:12px;opacity:.8'>More of Poe's tales are coming to this land.</p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; poeSave(); poeChapterBegin(true); } };
b += worldBtn("again", "Live the tales again from the start", "The chamber, at midnight, in bleak December");
b += poeKeeperBtns(fns);
worldCard(b, fns);
},
function () {
var S = poeBS(), C = POE_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Edgar Allan Poe, 1809 to 1849</div><h3 style='margin:4px 0;font-family:Georgia,serif'>🪶 Poe's Dream-Land</h3>";
if (S.done)
b += "<p>You have lived every tale here. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + (S.ch + 1) + ". " + poeEsc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + (function () { var h = (poeStep() || {}).h; return typeof h === "function" ? h() : (h || ""); })() + "</p>";
else
b += "<p>Poe's tales of terror, each one lived from its first line to its last: the Raven, the House of Usher, the Tell-Tale Heart, the Masque of the Red Death, the Pit and the Pendulum, the Cask of Amontillado, the Murders in the Rue Morgue. Hours of play, at your own pace; your place is kept.</p><p style='font-size:12px;opacity:.8'>" + poeA("Grown-ups: this is horror as Poe wrote it. Blood, the dark, and worse.", "Players under 18 get the same tales and puzzles, told without the gore.") + "</p>";
if (S.started && !S.done && S.paused)
b += "<p style='font-size:12px;opacity:.8'>The book is closed; you are free to walk the land and Paris. Carry on when you like.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: midnight, in bleak December", S.started ? "Back to where you were" : "The Raven");
fns.go = function () { worldCard(null); poeBegin(); };
}
else {
b += worldBtn("again", "Live them again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; poeSave(); poeBegin(); };
}
if (S.started && !S.done && !S.paused) {
b += worldBtn("down", "Put the book down", "Walk out and go where you like; your place is kept");
fns.down = function () { worldCard(null); poePutDown(true); };
}
b += worldBtn("paris", "🗼 The way to Paris", "Straight to the Barrière d’Enfer, the gate into the city" + (S.started && !S.done && !S.paused ? " (the book is put down, your place kept)" : ""));
fns.paris = function () { worldCard(null); poeToParisGate(); };
POE_CH.forEach(function (C2, i) { if (!C2.key)
return; fns["t" + i] = function () { poeTaleText(C2.key); }; });
b += "<div style='margin-top:6px;font-size:12px'>📖 Read a tale: " + POE_CH.filter(function (C2) { return C2.key; }).map(function (C2) { return "<span data-w='t" + POE_CH.indexOf(C2) + "' role='button' style='text-decoration:underline;margin-right:8px'>" + poeEsc(C2.t) + "</span>"; }).join("") + "</div>";
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + poeEsc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += poeKeeperBtns(fns);
worldCard(b, fns);
},
function (walkOut, then) {
var S = poeBS();
if (S.started && !S.done) {
S.paused = 1;
poeSave();
}
poeItemsClear();
POEB.hold = 0;
POEB.still = 0;
POEB.puz = null;
POEB.readOpen = 0;
POE.lock = null;
POE.black = false;
poeSfx("heartoff");
if (POEB.beam)
POEB.beam.visible = false;
var R = POE.room;
if (then)
then();
else if (walkOut && R && !R.city) {
var Q = R.k === "chamber" ? null : poeRoomDoorOut(R.k);
poeOutside(Q ? null : "out:raven", Q ? { x: Q.x, z: Q.z, ry: Math.PI } : null);
}
poeSay("📕 <b>You close the book.</b> Your place is kept: press E out in the land (or the Menu) and choose Carry on. The road to Paris runs from the Raven's porch to the Barrière d’Enfer.");
},
function () {
var go = function () { var Gt = POE.exits["out:dl_gate"]; if (!Gt)
return; poeOutside(null, { x: Gt.x, z: Gt.z + 4, ry: Math.PI }); setTimeout(function () { poeSay("🗼 <b>The Barrière d’Enfer.</b> Paris, 1841, is through the gate ahead: press E at the gate."); }, window.POE_FAST ? 20 : 900); };
if (poeActive())
poePutDown(false, go);
else
go();
},
function (x, z) {
if (x >= POE_IN_X - 1000)
return "inside";
var A = POE_AT;
if (Math.hypot(x - A.usher.x, z - (-540)) < 260)
return "usher";
if (Math.hypot(x - A.masque.x, z - A.masque.z) < 260)
return "masque";
if (Math.hypot(x - A.heart.x, z - A.heart.z) < 150)
return "heart";
if (Math.hypot(x - A.pit.x - 40, z - A.pit.z) < 140)
return "pit";
if (Math.hypot(x - A.cask.x, z - A.cask.z) < 140)
return "cask";
if (Math.hypot(x - (A.morgue.x + 80), z - (A.morgue.z + 60)) < 240)
return "morgue";
if (Math.hypot(x, z) < 130)
return "throne";
return "land";
},
function (x, z, feet) {
if (POE.moving || POE.lock)
return true;
if (x >= POE_IN_X - 1000) {
if (poeSolidAt(x, z, feet))
return true;
if (POE.room && POE.room.block && POE.room.block(x, z))
return true;
return !poeInsideWalk(x, z);
}
var B = POE_BOUND;
if (x < B.x0 || x > B.x1 || z < B.z0 || z > B.z1)
return true;
if (poeTarnIn(x, z) < 1.02 && poeFloorAt(x, z, feet) === null)
return true;
return poeSolidAt(x, z, feet);
},
function (G) {
POE.G = G;
POE.lite = typeof LITE !== "undefined" && !!LITE;
POE.solids = [];
POE.floors = [];
POE.spots = [];
POE.talk = [];
POE.people = [];
POE.fx = [];
POE.lights = [];
POE.flames = [];
POE.districts = [];
POE.anim = [];
POE.cast = {};
POE.room = null;
POE.exits = {};
POE.roadLamps = [];
for (var k in POE_RX) {
POE_RX[k].g = null;
POE_RX[k].doorAt = null;
POE_RX[k].locked = null;
}
function step(name, fn) { try {
fn();
}
catch (e) {
if (window.console)
console.warn("[poe] " + name, e);
} }
step("terrain", function () { poeTerrain(G); });
step("sky", function () { poeSky(G); });
step("wilds", function () { poeWilds(G); });
step("throne", function () { poeThrone(G); });
step("raven", function () { poeRavenHouse(G); });
step("usher", function () { poeUsherOut(G); });
step("heart", function () { poeHeartStreet(G); });
step("abbey", function () { poeAbbeyOut(G); });
step("toledo", function () { poeToledoOut(G); });
step("carnival", function () { poeCarnivalOut(G); });
step("paris", function () { poeParisOut(G); });
step("catacombs", function () { if (typeof poeCatOut === "function")
poeCatOut(G); });
step("parisExits", function () { if (typeof poeParExits === "function")
poeParExits(); });
step("folk", function () { if (typeof poeFolk === "function")
poeFolk(G); });
var my = new THREE.PointLight(0xFFC890, 1.0, 13, 2);
G.add(my);
POE.my = { L: my, k: 1.0, ph: 0 };
POE.outside = G.children.filter(function (o) { return o !== my; });
POE.built = true;
},
function (opt) {
opt = opt || {};
var A = POE_AT.arrive;
POE.zone = "land";
POE.room = null;
POE.moving = false;
POE.lock = null;
POE.black = false;
poeShowOnly(null);
camera.position.set(POE.base + A.x, poeGround(A.x, A.z, 1e4) + 1.72, A.z);
yaw = A.ry;
pitch = 0;
poeSfx("wind");
var S = poeBS();
if (opt.book || POEB.pending) {
POEB.pending = 0;
S.started = 1;
setTimeout(function () { try {
poeChapterBegin(true);
}
catch (e) {
if (window.console)
console.warn("[poe] begin", e);
} }, window.POE_FAST ? 50 : 700);
}
else if (opt.tale) {
var i = -1;
POE_CH.forEach(function (C, j) { if (C.key === opt.tale)
i = j; });
if (i >= 0 && (!S.started || S.done || S.ch < i)) {
S.started = 1;
S.done = 0;
S.ch = i;
S.s = 0;
S.f = {};
poeSave();
setTimeout(function () { poeChapterBegin(true); }, 700);
}
else if (S.started && !S.done)
setTimeout(function () { poeChapterBegin(true); }, 700);
}
else if (S.started && !S.done && !S.paused) {
setTimeout(function () { try {
poeChapterBegin(true);
}
catch (e) { } }, 900);
}
setStatus("🪶 <b>" + POE_NAME + ".</b> <i>\"By a route obscure and lonely, haunted by ill angels only, where an Eidolon, named NIGHT, on a black throne reigns upright...\"</i> " + (S.started && !S.done && !S.paused ? "Your book is open where you left it." : S.started && !S.done ? "Your book is closed, your place kept. The road to Paris runs from this porch to the Barrière d’Enfer." : "Press E (when nothing else is near) to open the book of the tales. The road to Paris runs from this porch to the Barrière d’Enfer."));
},
function (dt) {
var L = worldLocal();
POE.t += dt;
if (!POE.built)
return;
poeFlickerTick(dt);
poeStormTick(dt);
poeRainTick(dt);
poeTrigTick();
poeAnimTick(dt);
if (POE.room && POE.room.tick)
try {
POE.room.tick(dt);
}
catch (e) { }
if (POE.lock && POE.lock.x != null) {
camera.position.x = POE.base + POE.lock.x;
camera.position.z = POE.lock.z;
if (POE.lock.y != null)
camera.position.y = POE.lock.y + 1.72;
if (POE.lock.yaw != null) {
yaw = POE.lock.yaw;
}
if (POE.lock.pitch != null)
pitch = POE.lock.pitch;
}
var lp = POE.lastP;
if (lp) {
var mv = Math.hypot(L.x - lp.x, L.z - lp.z);
POE.still = mv < 0.02 ? POE.still + dt : 0;
}
POE.lastP = { x: L.x, z: L.z };
if (!POE.room) {
var zone = poeZoneAt(L.x, L.z);
if (zone !== POE.zone) {
POE.zone = zone;
if (POE_ZONE_NAME[zone] && !poeActive())
setStatus("🪶 <b>" + POE_ZONE_NAME[zone] + ".</b>");
}
}
var M = POE.my;
if (M) {
M.ph += dt;
M.L.intensity = (POE.black || POE.dim ? 0 : M.k * (POE.room ? 1.05 : 0.8)) * (0.9 + 0.06 * Math.sin(M.ph * 7) + 0.04 * Math.sin(M.ph * 5.3));
M.L.distance = POE.room ? 11 : 16;
M.L.position.set(L.x - Math.sin(yaw) * 0.5 + Math.cos(yaw) * 0.3, camera.position.y - 0.2, L.z - Math.cos(yaw) * 0.5 - Math.sin(yaw) * 0.3);
}
POE.vt += dt;
if (POE.vt > 0.5) {
POE.vt = 0;
poeLampTick();
var far = POE.lite ? 600 : 1000;
if (!POE.room)
POE.districts.forEach(function (D) { var on = Math.hypot(L.x - D.x, L.z - D.z) < D.r + far; if (D.g.visible !== on)
D.g.visible = on; });
if (POE.eidolon) {
POE.eidolon.rotation.y = Math.atan2(L.x, L.z + 6) * 0.15;
}
}
POE.people.forEach(function (P) {
if (!P.wander || !P.g.visible)
return;
if (P.room && P.room !== POE.room)
return;
var px = P.g.position.x + (P.ox || 0), pz = P.g.position.z;
if (Math.abs(px - L.x) > 90 || Math.abs(pz - L.z) > 90)
return;
wWander(P.g, dt, function (x, z) { return P.room ? 0 : poeLand(x, z); }, P.wander);
});
try {
poeBookTick(dt);
}
catch (e) {
if (!POE.eb) {
POE.eb = 1;
if (window.console)
console.warn("[poe] book", e);
}
}
POE.pt += dt;
if (POE.pt < 0.15)
return;
POE.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
worldPrompt(null);
return;
}
if (POE.moving || POE.lock && POE.lock.noE) {
worldPrompt(null);
return;
}
var feet = camera.position.y - 1.72, best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
POE.talk.forEach(function (T) {
var p = T.p.g;
if (!p.visible || (T.p.room && T.p.room !== POE.room) || (!T.p.room && POE.room && !POE.room.city))
return;
var px = p.position.x + (T.p.ox || 0);
cand(px, p.position.z, T.r, function () { poeTalkUse(T); }, "<b>" + poeEsc(T.name) + "</b> · <b>press E</b>" + (T.t ? " to speak" : ""));
});
var bs = poeActive() && poeStep(), want = bs ? (bs.k === "spot" ? bs.spot : (bs.k === "gather" || bs.k === "find") ? bs.name : bs.at && typeof bs.at === "object" ? bs.at.spot : null) : null;
if (!want && bs && bs.k === "puzzle" && bs.at && typeof bs.at === "object" && bs.at.room && !bs.at.spot && POE.room && POE.room.k === bs.at.room) {
var Rw = POE.room, ax = Rw.x + (bs.at.lx || 0), az = bs.at.lz || 0;
POE.spots.forEach(function (s) { if (s.roomDoor && Math.hypot(s.x - ax, s.z - az) < 2.5)
want = s.name; });
}
POE.spots.forEach(function (s) {
if (s.off || (s.hide && s.hide()) || Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y !== undefined && s.y !== null ? s.y : s.x >= POE_IN_X - 1000 ? 0 : poeLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.4)
return;
var d = Math.hypot(L.x - s.x, L.z - s.z), wanted = want && (want instanceof RegExp ? want.test(s.name || "") : want === s.name);
if (wanted && d < s.r) {
if (bd > -1) {
bd = -1;
best = { fn: function () { poeSpotUse(s); }, html: "<b>" + poeEsc(s.name) + "</b> · <b>press E</b> to " + poeEsc(s.verb) };
}
return;
}
if (bd === -1)
return;
cand(s.x, s.z, s.r, function () { poeSpotUse(s); }, "<b>" + poeEsc(s.name) + "</b> · <b>press E</b> to " + poeEsc(s.verb));
});
if (typeof raNear === "function") {
var rn = null;
try {
rn = raNear();
}
catch (e) { }
if (rn) {
best = { fn: rn.fn, html: rn.html };
}
}
if (best)
worldPrompt(best.html, best.fn);
else if (!POE.lock)
worldPrompt("🪶 <b>" + (poeActive() ? "The book of the tales" : "Poe's Dream-Land") + "</b> · <b>press E</b> to " + (poeActive() ? "open the book" : "live the tales"), poeOpen);
else
worldPrompt(null);
},
function (T) {
var b = poeActive() && poeStep();
if (b && b.k === "talk") {
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (ok) {
var k = poeKey();
worldPrompt(null);
if (b.card) {
var C = b.card, html = typeof C[1] === "function" ? C[1]() : C[1];
poeCard(C[0], html, (b.choices || [[C[2] || "Go on", "", null]]).map(function (B) { return [B[0], B[1], function () { if (poeKey() !== k)
return; if (B[2] === false) {
poeSay(B[3] || "No. Think again.");
return;
} if (typeof B[2] === "function")
B[2](); poeStepDone(); }]; }));
}
else
poeStepDone();
return;
}
}
if (T.fn)
return T.fn();
if (T.t)
wTalk(T.t);
},
function (dt) {
var cardOpen = WLD.card && WLD.card.style.display === "block";
if (!poeActive()) {
if (POEB.beam)
POEB.beam.visible = false;
if (!POE.room && !poeActive())
worldBanner("🪶 <b>" + POE_NAME + "</b>" + (POE_ZONE_NAME[POE.zone] ? " · " + POE_ZONE_NAME[POE.zone] : ""));
else if (POE.room)
worldBanner("🪶 <b>" + POE_NAME + "</b> · " + (POE.room.banner ? POE.room.banner() : poeEsc(POE.room.n)));
return;
}
var S = poeBS(), b = poeStep(), L = worldLocal(), t = POE.t, area = poeAreaNow();
POEB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.3 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" && b.k !== "card" ? poePos(b.at) : null, show = null, way = "";
if (P) {
if (P.area === area)
show = P;
else if (area === "out" && P.area.indexOf("room:") === 0) {
show = poeRoomDoorOut(P.area.slice(5));
way = " (go in)";
}
else if (area !== "out") {
show = poeRoomWay(POE.room.k, P.area === "out" ? "out" : P.area.slice(5));
way = P.area === "out" ? " (go out)" : " (that way)";
}
}
if (show && show.x >= POE_IN_X + 90000 && area === "out" && !(POE.room && POE.room.city) && POE.exits["out:dl_gate"]) {
var Gt = POE.exits["out:dl_gate"];
show = { x: Gt.x, z: Gt.z, y: poeGround(Gt.x, Gt.z), area: "out" };
way = " (the Barrière into Paris)";
}
var bm = poeBeam();
if (show && !POE.moving && !POE.black && !b.noBeam) {
bm.visible = true;
var cd = poeDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
bm.userData.col.visible = show.area === "out" && cd > 14;
bm.userData.col.scale.set(1, 40, 1);
bm.userData.col.position.y = 20;
bm.userData.ring.material.opacity = 0.32 + 0.16 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = poeWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !POE.moving) {
var inArea = P && P.area === area, fd = P ? poeDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (!POEB.readOpen && !POEB.readAsk) {
POEB.readAsk = 1;
poeChapterCard();
}
else if (POEB.readOpen && !cardOpen) {
POEB.readOpen = 0;
poeStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null ? true : fd < (b.r || 4))) {
poeStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 5)) {
POEB.hold += dt;
if (POEB.hold >= (b.sec || 8)) {
poeStepDone();
return;
}
}
else
POEB.hold = 0;
break;
case "still":
if ((!P || inArea && fd < (b.r || 6)) && POE.still > 0.2) {
POEB.still += dt;
if (POEB.still >= (b.sec || 6)) {
poeStepDone();
return;
}
}
else if (POE.still < 0.2 && POEB.still > 0.6) {
POEB.still = 0;
if (b.moved)
try {
b.moved();
}
catch (e) { }
}
break;
case "until": {
var ok = false;
try {
ok = b.test(S.f, dt);
}
catch (e) { }
if (ok) {
poeStepDone();
return;
}
break;
}
case "puzzle":
if (POEB.puz && POEB.puz.b.tick)
try {
POEB.puz.b.tick(dt, S.f);
}
catch (e) { }
break;
}
}
var C = POE_CH[S.ch], prog = b && b.k === "hold" && POEB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - POEB.hold)) + " s)" : b && b.k === "still" && POEB.still > 0 ? " (hold still: " + Math.max(0, Math.ceil((b.sec || 6) - POEB.still)) + " s)" : b && b.k === "gather" ? " (" + (POEB.got || 0) + " of " + (b.n || 3) + ")" : "";
var extra = b && b.k === "puzzle" && POEB.puz && POEB.puz.b.bar ? POEB.puz.b.bar(S.f) : "";
worldBanner("🪶 <b>" + (S.ch + 1) + ". " + poeEsc(C ? C.t : "") + "</b> · " + (b && b.h ? (typeof b.h === "function" ? b.h() : b.h) : "") + prog + (extra ? " · " + extra : "") + (POE.room && POE.room.banner ? " · " + POE.room.banner() : "") + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
for (var k in POE.mats) {
var m = POE.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in POE.tex) {
var x = POE.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
POE.mats = {};
POE.tex = {};
POE.built = false;
POE.G = null;
POE.outside = null;
POE.skyFlash = null;
POE.rain = null;
POE.my = null;
POE.clouds = null;
POE.mist = null;
POE.moon = null;
POE.tarn = null;
POE.eidolon = null;
POE.usherHalves = null;
POE.usherFissure = null;
POE.usherG = null;
POE.plagueCart = null;
POE.cage = null;
POE.lampLight = null;
POE.groundMesh = null;
POE.cloudTex = null;
POE.solids = [];
POE.floors = [];
POE.spots = [];
POE.talk = [];
POE.people = [];
POE.lights = [];
POE.flames = [];
POE.districts = [];
POE.anim = [];
POE.cast = {};
POEB.beam = null;
POEB.items = [];
for (var r in POE_RX) {
POE_RX[r].g = null;
POE_RX[r].doorAt = null;
}
},
function (R, g) {
R.start = { x: 0.5, z: 2.6, ry: 0 };
var fp = poeFireplace(g, -R.w / 2 + 0.3, 0.5, Math.PI / 2, "embers");
R.fire = fp;
poeSolid(R.x - R.w / 2 + 0.5, 0.5, 1.0, 2.6, -1, 2);
var shelf = poeBox(g, 1.6, 0.12, 0.5, poeC(0x2A1A10), 0, 3.0, -R.d / 2 + 0.25);
R.bust = poeBust(g, 0, 3.06, -R.d / 2 + 0.28, 0);
var wg = poeGrp(g, R.w / 2 - 0.04, 0, 1.4, -Math.PI / 2);
poeSashWin(wg, 0, 2.0, 0, 0, 1.3, 2.0, false);
R.shutter = [poeBox(wg, 0.66, 2.0, 0.05, poeC(0x2A2420), -0.33, 2.0, 0.12), poeBox(wg, 0.66, 2.0, 0.05, poeC(0x2A2420), 0.33, 2.0, 0.12)];
R.curtain = poeCurtains(wg, 0, 2.1, 0.22, 0, 2.3, 2.9, 0x4A1A5A);
poeSpot(R.x + R.w / 2 - 1.2, 1.4, 1.7, "The window lattice", "fling open the shutter", function () { poeHook("lattice"); }, 0);
poeArmchair(g, 1.0, 1.6, Math.PI, 0x5A2A6A);
poeSolid(R.x + 1.0, 1.6, 0.9, 0.9, -1, 1.2);
poeSpot(R.x + 1.0, 1.0, 1.4, "The velvet-cushioned seat", "sink into it, facing the bird", function () { poeHook("cushion"); }, 0);
poeDesk(g, -2.6, -2.6, 0);
poeSolid(R.x - 2.6, -2.6, 1.6, 0.9, -1, 1.2);
var bk = poeBox(g, 0.32, 0.08, 0.24, poeC(0x4A1A14), -2.4, 0.86, -2.5);
bk.rotation.y = 0.3;
poeSpot(R.x - 2.6, -1.8, 1.4, "A quaint and curious volume of forgotten lore", "read it by the lamp", function () { poeHook("lore"); }, 0);
R.lamp = poeLamp(g, -3.1, 0.8, -2.8, 0.85);
poeBookcase(g, R.w / 2 - 0.25, -2.8, 1.8, 2.6, -Math.PI / 2);
poeBookcase(g, -R.w / 2 + 0.25, -2.8, 1.8, 2.6, Math.PI / 2);
poeSolid(R.x + R.w / 2 - 0.25, -2.8, 0.5, 1.9, -1, 3);
poeSolid(R.x - R.w / 2 + 0.25, -2.8, 0.5, 1.9, -1, 3);
poeRug(g, 0.3, 0.8, 4.2, 3.2, 0xFFFFFF);
poePainting(g, -R.w / 2 + 0.06, 2.2, -1.0, Math.PI / 2, 0.9, 1.2, function (x, W, H) {
x.fillStyle = "#1A1410";
x.fillRect(0, 0, W, H);
var gr = x.createRadialGradient(W / 2, H * 0.42, 4, W / 2, H * 0.42, W * 0.45);
gr.addColorStop(0, "#C8B8A0");
gr.addColorStop(1, "#2A2018");
x.fillStyle = gr;
x.beginPath();
x.ellipse(W / 2, H * 0.4, W * 0.22, H * 0.2, 0, 0, 7);
x.fill();
x.fillStyle = "#2A1A10";
x.beginPath();
x.ellipse(W / 2, H * 0.28, W * 0.28, H * 0.16, 0, Math.PI, 0);
x.fill();
x.fillStyle = "#3A2A3A";
x.fillRect(W * 0.24, H * 0.62, W * 0.52, H * 0.38);
x.fillStyle = "rgba(0,0,0,.55)";
x.fillRect(0, 0, W * 0.4, H);
}, "lenore");
poeSpot(R.x - R.w / 2 + 1.0, -1.0, 1.4, "A portrait, veiled in black crape", "look at it", function () { setStatus("🖼️ <i>\"...the rare and radiant maiden whom the angels name Lenore: nameless here for evermore.\"</i>"); }, 0);
poeClock(g, R.w / 2 - 0.4, -0.9, -Math.PI / 2);
poeSolid(R.x + R.w / 2 - 0.4, -0.9, 0.6, 0.6, -1, 2.4);
poeCandelabrum(g, 3.2, 0.8, 2.9, 0.9, false);
poeTable(g, 3.2, 2.9, 0.7, 0.7, 0.8, 0, 0x2A1A2A);
R.raven = poeRaven(g, R.w / 2 - 0.6, 2.1, 1.4, -Math.PI / 2, 1.4);
R.raven.visible = false;
},
function (P, x, z, ry) {
var g = poeGrp(P, x, 0, z, ry), st = poeShine(0x7A7A80, 0.35, 0.9);
poeBox(g, 0.5, 0.2, 0.4, poeS("stone", 0x8A847A), 0, 0.1, 0);
poeCyl(g, 0.08, 0.08, 0.8, st, -0.12, 0.6, 0, 8);
poeCyl(g, 0.08, 0.08, 0.8, st, 0.12, 0.6, 0, 8);
var t = poeCyl(g, 0.22, 0.17, 0.6, st, 0, 1.3, 0, 12);
poeSph(g, 0.14, st, 0, 1.78, 0, 10);
poeCyl(g, 0.06, 0.06, 0.6, st, -0.3, 1.3, 0, 8);
poeCyl(g, 0.06, 0.06, 0.6, st, 0.3, 1.3, 0, 8);
var sp = poeCyl(g, 0.015, 0.015, 2.4, poeC(0x3A2A1A), 0.36, 1.2, 0.05, 5);
poeCone(g, 0.04, 0.2, st, 0.36, 2.5, 0.05);
return g;
},
function (P, x, y, z, ry) {
var g = poeGrp(P, x, y, z, ry), sm = poeShine(0x7A1A1A, 0.6, 0.2), gm = poeShine(0xC8A050, 0.35, 0.85);
var sh = new THREE.Shape();
sh.moveTo(-0.4, 0.4);
sh.lineTo(0.4, 0.4);
sh.lineTo(0.4, -0.1);
sh.quadraticCurveTo(0.4, -0.5, 0, -0.65);
sh.quadraticCurveTo(-0.4, -0.5, -0.4, -0.1);
sh.lineTo(-0.4, 0.4);
var s = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.06, bevelEnabled: false }), sm);
g.add(s);
poeBox(g, 0.08, 0.9, 0.02, gm, 0, -0.1, 0.07);
poeBox(g, 0.6, 0.08, 0.02, gm, 0, 0.1, 0.07);
[-1, 1].forEach(function (k) { var sw = poeBox(g, 0.04, 1.5, 0.02, poeShine(0xB8B8C0, 0.25, 0.95), k * 0.5, -0.1, -0.04); sw.rotation.z = k * 0.6; });
return g;
},
function (R, g) {
[-6, 0, 6].forEach(function (z) { poeFace(g, 3.4, 6, poeDS(poeS("tapestry")), -R.w / 2 + 0.05, 4.4, z, Math.PI / 2); poeFace(g, 3.4, 6, poeDS(poeS("tapestry")), R.w / 2 - 0.05, 4.4, z - 0.01, -Math.PI / 2); });
[-6, 6].forEach(function (z) { poeTrophy(g, -R.w / 2 + 0.1, 8, z, Math.PI / 2); poeTrophy(g, R.w / 2 - 0.1, 8, z, -Math.PI / 2); });
[-8, -3, 3, 8].forEach(function (z) { poeArmour(g, -R.w / 2 + 1, z, Math.PI / 2); poeArmour(g, R.w / 2 - 1, z, -Math.PI / 2); poeSolid(R.x - R.w / 2 + 1, z, 0.8, 0.8, -1, 3); poeSolid(R.x + R.w / 2 - 1, z, 0.8, 0.8, -1, 3); });
var fp = poeFireplace(g, 0, -R.d / 2 + 0.3, 0, true);
fp.g.scale.set(1.6, 1.6, 1.4);
poeSolid(R.x, -R.d / 2 + 0.6, 3.6, 1.2, -1, 3);
poeTorch(g, -3.5, 3.6, -R.d / 2 + 0.1, 0, 1.2);
poeTorch(g, 3.5, 3.6, -R.d / 2 + 0.1, 0, 1.2);
[[-5, 6], [5, 6], [-5, -4], [5, -4]].forEach(function (p) { var st = poeGrp(g, p[0], 0, p[1]); poeCyl(st, 0.05, 0.1, 1.6, poeShine(0x3A3028, 0.5, 0.6), 0, 0.8, 0, 8); poeCandelabrum(st, 0, 1.6, 0, 1.1, false); poeSolid(R.x + p[0], p[1], 0.5, 0.5, -1, 2.6); });
poeLight(0xFFA050, 1.4, 22, R.x - 5, 3, 6, POE.G);
poeLight(0xFFA050, 1.2, 22, R.x + 5, 3, -4, POE.G);
poeTable(g, 0, 1, 1.4, 5, 0.82, 0, null);
for (var i = 0; i < 4; i++) {
poeChair(g, -1.1, -0.8 + i * 1.2, Math.PI / 2, 0x3A1418, 0, true);
poeChair(g, 1.1, -0.8 + i * 1.2, -Math.PI / 2, 0x3A1418, 0, true);
}
poeSolid(R.x, 1, 3.4, 5.6, -1, 1.2);
poeRug(g, 0, 6.6, 6, 4, 0xA89AA0);
POE.cast.valet = poeRoomPerson(R, "valet", -1.5, R.d / 2 - 3, Math.PI, { talk: { name: "The valet", persona: "A silent valet of the House of Usher in the 1830s, of stealthy step. He speaks only to lead the guest to his master.", greet: "This way, sir. The master awaits you." }, sex: "m", look: { skin: 0xE8CCB4, hair: 0x3A3A3A } });
POE.cast.physician = poeRoomPerson(R, "phys", 4.6, -R.d / 2 + 3.6, 0.6, { talk: { name: "The family physician", persona: "The family physician of the Ushers, 1830s: low cunning and perplexity in his face; he speaks little, evasively.", greet: "Good evening. You are the friend he wrote for. I hope... I hope you can help him." }, sex: "m", look: { skin: 0xE8CCB4, hair: 0x6A6A6A } });
},
function (R, g) {
var red = new THREE.MeshLambertMaterial({ color: 0x8A2020, emissive: 0x3A0808, map: poeLeadTex() });
for (var k = 0; k < 3; k++) {
poeGothicWin(g, -4 + k * 4, 5, -R.d / 2 + 0.04, 0, 1.0, 2.6, red);
}
[-5, 0, 5].forEach(function (z) { poeFace(g, 4, 7, poeDS(poeS("blackcloth")), -R.w / 2 + 0.05, 3.6, z, Math.PI / 2); poeFace(g, 4, 7, poeDS(poeS("blackcloth")), R.w / 2 - 0.05, 3.6, z, -Math.PI / 2); });
var sofa = poeGrp(g, 0, 0, -3.6);
poeBox(sofa, 2.6, 0.45, 0.9, poeS("velvet", 0x6A6070), 0, 0.32, 0);
poeBox(sofa, 2.6, 0.6, 0.22, poeS("velvet", 0x6A6070), 0, 0.8, -0.36);
poeBox(sofa, 0.25, 0.4, 0.9, poeS("velvet", 0x6A6070), -1.3, 0.65, 0);
poeSolid(R.x, -3.6, 2.8, 1.1, -1, 1.2);
POE.cast.roderick = poeRoomPerson(R, "roderick", 0.4, -2.8, Math.PI, { talk: { name: "Roderick Usher", persona: "Roderick Usher of the House of Usher (Poe, 1839): cadaverous complexion, large, liquid, luminous eyes, thin pallid lips, hair of web-like softness; morbid acuteness of the senses; a voice by turns tremulous and of energetic concision. He speaks of the fear, the house, and his sister Madeline.", greet: "You came. My friend... my only friend. I must perish in this deplorable folly." }, sex: "m", look: { skin: 0xF0E4D8, hair: 0x4A3A2A } });
for (var b = 0; b < 9; b++) {
var bk = poeBox(g, 0.3, 0.06, 0.22, poeC([0x5A1A14, 0x1A2440, 0x2A2622][b % 3]), -5 + b * 1.2, 0.04 + (b % 2) * 0.06, 1 + ((b * 7) % 5) - 2);
bk.rotation.y = b;
}
var lute = poeGrp(g, 2.6, 0.5, -3.4, 0.4);
var body = poeSph(lute, 0.22, poeShine(0x8A5A2A, 0.35, 0.2), 0, 0, 0, 12);
body.scale.set(1, 1.2, 0.4);
var nk = poeBox(lute, 0.06, 0.6, 0.04, poeC(0x3A2410), 0, 0.5, 0);
R.guitar = lute;
poeSpot(R.x + 2.6, -2.8, 1.4, "Roderick's guitar", "take it up, and hear his rhapsodies", function () { poeHook("guitar"); }, 0);
var easels = [[-4.5, 2, 0.4, "vault"], [-1.5, 4, 0, "idea"], [2.5, 4, -0.3, "idea2"]];
easels.forEach(function (E, i) {
var eg = poeGrp(g, E[0], 0, E[1], E[2] + Math.PI);
var w = poeC(0x3A2A1A);
[-0.4, 0.4].forEach(function (o) { var l = poeCyl(eg, 0.025, 0.025, 1.9, w, o, 0.95, 0, 5); l.rotation.z = o * 0.12; });
var bl = poeCyl(eg, 0.025, 0.025, 1.9, w, 0, 0.9, -0.4, 5);
bl.rotation.x = -0.25;
poePainting(eg, 0, 1.4, 0.06, 0, 1.0, 0.75, E[3] === "vault" ? function (x, W, H) {
x.fillStyle = "#0A0A0A";
x.fillRect(0, 0, W, H);
var g2 = x.createLinearGradient(0, H * 0.2, 0, H * 0.8);
g2.addColorStop(0, "#F4F0E0");
g2.addColorStop(1, "#C8C0A0");
x.fillStyle = g2;
x.beginPath();
x.moveTo(W * 0.02, H * 0.2);
x.lineTo(W * 0.98, H * 0.2);
x.lineTo(W * 0.62, H * 0.46);
x.lineTo(W * 0.62, H * 0.58);
x.lineTo(W * 0.98, H * 0.82);
x.lineTo(W * 0.02, H * 0.82);
x.lineTo(W * 0.38, H * 0.58);
x.lineTo(W * 0.38, H * 0.46);
x.closePath();
x.fill();
x.fillStyle = "rgba(255,250,220,.6)";
x.fillRect(W * 0.38, H * 0.46, W * 0.24, H * 0.12);
} : function (x, W, H) { x.fillStyle = i === 1 ? "#1A1A2A" : "#2A1A1A"; x.fillRect(0, 0, W, H); var r = wRand(i + 90); for (var s = 0; s < 30; s++) {
x.strokeStyle = "rgba(" + (120 + r() * 100 | 0) + "," + (60 + r() * 60 | 0) + "," + (80 + r() * 90 | 0) + ",.5)";
x.lineWidth = 1 + r() * 4;
x.beginPath();
x.moveTo(r() * W, r() * H);
x.bezierCurveTo(r() * W, r() * H, r() * W, r() * H, r() * W, r() * H);
x.stroke();
} }, "usherpaint" + i);
poeSolid(R.x + E[0], E[1], 1.1, 0.8, -1, 2);
poeSpot(R.x + E[0] + Math.sin(E[2] + Math.PI) * -1.2, E[1] + Math.cos(E[2] + Math.PI) * -1.2, 1.5, E[3] === "vault" ? "A painting: a vault, white, without outlet" : "One of Roderick's paintings", "look at it", function () { poeHook(E[3] === "vault" ? "painting-vault" : "painting"); }, 0);
});
poeCandelabrum(g, -1.6, 0, -3.4, 1.3);
poeTable(g, -1.6, -3.4, 0.7, 0.7, 0.75, 0, 0x1A1418);
poeLight(0xC84A3A, 0.6, 20, R.x, 7, -R.d / 2 + 1, POE.G);
},
function (R, g) {
for (var i = 0; i < 5; i++) {
poeBookcase(g, -R.w / 2 + 2 + i * 3, -R.d / 2 + 0.25, 2.6, 5.2, 0);
poeSolid(R.x - R.w / 2 + 2 + i * 3, -R.d / 2 + 0.25, 2.7, 0.5, -1, 5.4);
}
for (var j = 0; j < 3; j++) {
poeBookcase(g, R.w / 2 - 0.25, -3.5 + j * 3.6, 2.6, 5.2, -Math.PI / 2);
poeSolid(R.x + R.w / 2 - 0.25, -3.5 + j * 3.6, 0.5, 2.7, -1, 5.4);
}
poeTable(g, -1.5, 0.5, 3.2, 1.4, 0.8, 0, 0x2A1A14);
poeSolid(R.x - 1.5, 0.5, 3.4, 1.6, -1, 1.2);
poeChair(g, -2.6, 1.5, Math.PI, 0x3A1418, 0, true);
poeChair(g, -0.4, 1.5, Math.PI, 0x3A1418, 0, true);
R.lamp = poeLamp(g, -1.0, 0.83, 0.3, 1.0);
poeCandelabrum(g, -2.4, 0.83, 0.4, 0.8, false);
var ld = poeGrp(g, 2, 0, -R.d / 2 + 0.9, 0);
poeBox(ld, 0.06, 4.2, 0.06, poeC(0x3A2410), -0.3, 2.1, 0);
poeBox(ld, 0.06, 4.2, 0.06, poeC(0x3A2410), 0.3, 2.1, 0);
for (var r = 0; r < 9; r++)
poeBox(ld, 0.6, 0.04, 0.06, poeC(0x3A2410), 0, 0.3 + r * 0.45, 0);
ld.rotation.x = -0.15;
var gl = poeGrp(g, 4, 0, 3);
poeCyl(gl, 0.04, 0.25, 0.9, poeC(0x3A2410), 0, 0.45, 0, 8);
var sp = poeSph(gl, 0.35, poeS("parquet", 0xC8B080), 0, 1.2, 0, 16);
poeSolid(R.x + 4, 3, 0.8, 0.8, -1, 1.6);
poeSkull(g, -0.8, 0.83, 0.9, 2.6, 1.1);
poeFireplace(g, -R.w / 2 + 0.3, 3, Math.PI / 2, true);
poeSolid(R.x - R.w / 2 + 0.5, 3, 1.0, 2.6, -1, 2);
},
function (R, g) {
poeBed(g, -3, -3, 0, 0x2A1A2A);
poeSolid(R.x - 3, -3, 1.8, 2.4, -1, 2.6);
[-3, 3].forEach(function (z) { poeFace(g, 3, 4.6, poeDS(poeS("tapestry")), -R.w / 2 + 0.05, 3, z, Math.PI / 2); });
poeArmchair(g, 1.5, 2, Math.PI * 0.75, 0x3A2A3A);
poeTable(g, 0.6, 1.2, 0.8, 0.8, 0.75, 0, 0x1A1418);
R.lamp = poeLamp(g, 0.6, 0.79, 1.2, 0.9);
var bk = poeBox(g, 0.34, 0.1, 0.26, poeC(0x3A1410), 0.75, 0.82, 1.25);
bk.rotation.y = 0.4;
poeSolid(R.x + 0.6, 1.2, 1, 1, -1, 1.2);
poeRug(g, 0, 1, 4, 3, 0xB0A0A8);
poeFireplace(g, 0, -R.d / 2 + 0.3, 0, "embers");
poeSolid(R.x, -R.d / 2 + 0.6, 2.4, 1.2, -1, 2);
},
function (R, g) {
for (var i = 0; i < 6; i++) {
var z = -R.d / 2 + 4 + i * 7.5, ar = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.18, 5, 12, Math.PI), poeS("stone", 0x8A847A));
ar.position.set(0, 1.8, z);
g.add(ar);
}
for (var t = 0; t < 4; t++)
poeTorch(g, (t % 2 ? 1 : -1) * (R.w / 2 - 0.05), 1.8, -R.d / 2 + 6 + t * 11, t % 2 ? -Math.PI / 2 : Math.PI / 2, 0.9);
for (var d = 0; d < 20; d++) {
var dp = poeBox(g, 0.05, 0.02, 0.05, poeC(0x2A3A2A), (d % 3 - 1) * 1.2, 0.01, -R.d / 2 + d * 2.2);
}
R.fog = 0.06;
},
function (R, g) {
var tr = poeGrp(g, 0, 0, -1.6);
[-0.6, 0.6].forEach(function (o) { poeBox(tr, 0.1, 0.8, 0.1, poeC(0x2A1A10), -0.4, 0.4, o); poeBox(tr, 0.1, 0.8, 0.1, poeC(0x2A1A10), 0.4, 0.4, o); });
poeBox(tr, 1.0, 0.08, 1.6, poeC(0x2A1A10), 0, 0.8, 0);
poeSolid(R.x, -1.6, 1.2, 2.4, -1, 1.4);
R.coffin = poeCoffin(g, 0, 0.84, -1.6, 0, false);
R.coffin.visible = false;
poeTorch(g, -R.w / 2 + 0.06, 1.6, 1.5, Math.PI / 2, 0.8);
R.fog = 0.08;
},
function (R, g, cx, cz, w, d, h, wm, fm, cm, open) {
open = open || [];
poePlane(g, w, d, fm, cx, 0, cz, 0);
if (cm) {
var c = poePlane(g, w, d, cm, cx, h, cz, 0);
c.rotation.x = Math.PI;
}
["n", "s", "e", "w"].forEach(function (side) {
var len = side === "n" || side === "s" ? w : d, ry = side === "n" ? 0 : side === "s" ? Math.PI : side === "e" ? -Math.PI / 2 : Math.PI / 2;
var wx = side === "e" ? cx + w / 2 : side === "w" ? cx - w / 2 : cx, wz = side === "n" ? cz - d / 2 : side === "s" ? cz + d / 2 : cz;
var cuts = open.filter(function (o) { return o[0] === side; }).sort(function (a, b) { return a[1] - b[1]; }), at = -len / 2;
function piece(a, b, y0, y1) { if (b - a < 0.01)
return; var mid = (a + b) / 2; if (side === "n" || side === "s")
poeFace(g, b - a, y1 - y0, wm, wx + mid, (y0 + y1) / 2, wz, ry);
else
poeFace(g, b - a, y1 - y0, wm, wx, (y0 + y1) / 2, wz + mid, ry); }
cuts.forEach(function (o) { var ow = o[2] || 2, oh = o[3] || Math.min(h, 3); piece(at, o[1] - ow / 2, 0, h); if (oh < h)
piece(o[1] - ow / 2, o[1] + ow / 2, oh, h); at = o[1] + ow / 2; });
piece(at, len / 2, 0, h);
});
poeFloor(R.x + cx, cz, w - 0.7, d - 0.7, 0, true);
},
function (R, g) {
var st = poeGrp(g, -R.w / 2 + 0.8, 0, -R.d / 2 + 1);
for (var i = 0; i < 12; i++)
poeBox(st, 1.4, 0.2, 0.32, poeS("boards"), 0, 0.1 + i * 0.22, i * 0.3 * -1 + 0.2);
poeSolid(R.x - R.w / 2 + 0.8, -R.d / 2 + 1 - 1.5, 1.5, 4, -1, 4);
poeClock(g, R.w / 2 - 0.35, 5, -Math.PI / 2);
poeSolid(R.x + R.w / 2 - 0.35, 5, 0.6, 0.6, -1, 2.4);
var hs = poeGrp(g, R.w / 2 - 0.3, 0, -1.5, -Math.PI / 2);
poeBox(hs, 0.9, 2, 0.25, poeC(POE_WOOD), 0, 1, 0);
poeMirror(hs, 0, 1.4, 0.14, 0, 0.5, 0.6);
for (var k = 0; k < 3; k++)
poeCyl(hs, 0.02, 0.02, 0.15, poeShine(0xC8A050, 0.3, 0.9), -0.3 + k * 0.3, 1.85, 0.18, 6).rotation.x = Math.PI / 2;
poeSolid(R.x + R.w / 2 - 0.3, -1.5, 0.4, 1, -1, 2.2);
R.lamp = poeLamp(g, R.w / 2 - 0.4, 1.0, 2.5, 0.5);
poeTable(g, R.w / 2 - 0.4, 2.5, 0.5, 0.5, 0.95, 0, null);
poeSolid(R.x + R.w / 2 - 0.4, 2.5, 0.6, 0.6, -1, 1.2);
},
function (R, g) {
poeBed(g, -1.6, -1.8, Math.PI / 2, null);
poeSolid(R.x - 1.6, -1.8, 2.4, 1.8, -1, 2.6);
poeTable(g, 1.6, -2, 0.9, 0.6, 0.75, 0, null);
poeChair(g, 1.6, -1.3, Math.PI, 0x5A4A3A);
var dl = poeGrp(g, 1.6, 0.78, -2);
poeCyl(dl, 0.1, 0.11, 0.26, poeShine(0x2A2A2A, 0.5, 0.7), 0, 0.13, 0, 10);
poeCyl(dl, 0.06, 0.1, 0.08, poeShine(0x2A2A2A, 0.5, 0.7), 0, 0.3, 0, 10);
R.lantern = dl;
poeSpot(R.x + 1.6, -1.2, 1.4, "The dark lantern", "take it up", function () { poeHook("lantern"); }, 0);
poeSashWin(g, 0, 1.6, -R.d / 2 + 0.04, 0, 1.0, 1.4, true);
var bm = poeBox(g, 0.8, 0.02, 0.6, poeC(0x3A2A1A), 0.5, 0.01, 1.6);
},
function (R, g) {
R.bed = poeBed(g, 0.6, -2.2, 0, 0x2A2A30);
poeSolid(R.x + 0.6, -2.2, 1.8, 2.4, -1, 2.6);
[-1.8, 1.8].forEach(function (o) { poeSashWin(g, o, 1.6, -R.d / 2 + 0.04, 0, 1.0, 1.6, true); });
poeTable(g, -2.5, -2.6, 0.6, 0.5, 0.75, 0, null);
poeCandle(g, -2.5, 0.78, -2.6, 0.2, false);
var ch = poeChair(g, 2.5, 2, 0, 0x5A4A3A);
R.chairs = [ch];
R.planks = [];
for (var i = 0; i < 3; i++) {
var p = poeBox(g, 0.22, 0.03, 2.0, poeS("boards", 0xD8C8B0), -0.3 + i * 0.24, 0.015, 1.0);
R.planks.push(p);
}
R.under = poeBox(g, 0.7, 0.02, 2.0, poeC(0x050404), -0.06, -0.01, 1.0);
R.under.visible = false;
POE.cast.oldman = poeRoomPerson(R, "oldman", 0.6, -2.5, 0, { name: "The old man", talk: { name: "The old man", persona: "The old man of Poe's Tell-Tale Heart (1843): kind, harmless, never wronged anyone, with a pale blue eye with a film over it. He is fond of his lodger. He speaks gently, a little deaf, of the weather and his rheumatism.", greet: "Good morning, good morning! You slept well? I heard the death-watches in the wall again last night." }, sex: "m", look: { skin: 0xE8D2C0, hair: 0xE8E4DC, beard: 1 } });
},
function (R, g, seed, fire) {
var r = wRand(seed || 1);
poeFireplace(g, 0, -R.d / 2 + 0.3, 0, fire === false ? false : "embers");
poeSolid(R.x, -R.d / 2 + 0.6, 2.4, 1.2, -1, 2);
poeTable(g, 0, 0.6, 1.6, 1, 0.76, 0, [0x6A5A4A, 0xE8E2D4, 0x4A3A3A][seed % 3]);
poeSolid(R.x, 0.6, 1.8, 1.2, -1, 1.2);
for (var i = 0; i < 4; i++)
poeChair(g, i < 2 ? -0.6 + i * 1.2 : -1.2 + (i - 2) * 2.4, i < 2 ? 1.4 : 0.6, i < 2 ? Math.PI : (i === 2 ? Math.PI / 2 : -Math.PI / 2), 0x5A3A2A);
var dr = poeGrp(g, R.w / 2 - 0.3, 0, -1, -Math.PI / 2);
poeBox(dr, 1.6, 0.9, 0.5, poeC(POE_WOOD), 0, 0.45, 0);
poeBox(dr, 1.6, 1.2, 0.2, poeC(POE_WOOD), 0, 1.5, -0.15);
for (var p = 0; p < 4; p++) {
var pl = poeCyl(dr, 0.13, 0.13, 0.02, poeC(0xE8E4DC), -0.55 + p * 0.37, 1.5, -0.03, 14);
pl.rotation.x = Math.PI / 2;
}
poeSolid(R.x + R.w / 2 - 0.3, -1, 0.6, 1.7, -1, 2.2);
R.lamp = poeLamp(g, 0.2, 0.8, 0.5, 0.8);
poeRug(g, 0, 0.6, 3.2, 2.4, 0xC0B0A0);
if (R.w > 9)
poeBookcase(g, -R.w / 2 + 0.25, -1, 1.6, 2.2, Math.PI / 2);
},
function (R, g) {
poeParlour(R, g, 3);
POE.cast.neighbour = poeRoomPerson(R, "neigh", -1.6, 1.8, 0.4, { name: "The neighbour", talk: { name: "The neighbour", persona: "A woman of the 1840s, the neighbour of the old man in Poe's Tell-Tale Heart. In the night she heard a shriek from his house and sent for the police. She is frightened and tells it plainly.", greet: "Did you hear it? A shriek, in the night, from the old man's house. I've sent for the officers." }, sex: "f", look: { skin: 0xE8D0BC, hair: 0x5A4030 } });
},
function (R, g) {
poeParlour(R, g, 5, false);
var dk = poeDesk(g, 2.6, -2, 0);
poeSolid(R.x + 2.6, -2, 1.6, 0.9, -1, 1.2);
var rk = poeGrp(g, -R.w / 2 + 0.3, 0, 1, Math.PI / 2);
poeBox(rk, 2, 0.1, 0.2, poeC(POE_WOOD), 0, 1.8, 0);
for (var i = 0; i < 4; i++) {
var h = poeTopHat(0x101010);
h.position.set(-0.75 + i * 0.5, 1.92, 0.05);
rk.add(h);
}
POE.cast.sergeant = poeRoomPerson(R, "sgt", 2.6, -2.8, 0, { name: "A police officer", talk: { name: "A police officer", persona: "A police officer of the 1840s on night duty. A neighbour has reported a shriek. He is calm, a little bored, and polite.", greet: "A shriek, you say? We have the report. Three of us will call at the house." }, sex: "m", look: { skin: 0xE8CCB4, hair: 0x3A2A1A } });
},
function (R, g) {
poeParlour(R, g, 7, true);
var bar = poeGrp(g, -R.w / 2 + 1.4, 0, 0, Math.PI / 2);
poeBox(bar, 5, 1.1, 0.7, poeS("oak", 0x8A6A4A), 0, 0.55, 0);
for (var b = 0; b < 10; b++)
poeBottle(bar, -2 + b * 0.44, 1.1, -0.1, [0x1A3A1A, 0x3A1A10, 0x1A1A2A][b % 3]);
poeSolid(R.x - R.w / 2 + 1.4, 0, 0.9, 5.2, -1, 1.3);
for (var c = 0; c < 3; c++)
poeCask(g, -R.w / 2 + 0.5, 0, -3 + c * 1.0, 0.9, false);
poeRoomPerson(R, "tav1", -R.w / 2 + 2.6, 1.4, Math.PI / 2, { name: "The landlord", sex: "m", talk: { name: "The landlord", persona: "Landlord of the Black Horse tavern, 1840s, an American city street at night. Gruff but kind. He knows the old man up the street and his odd quiet lodger.", greet: "Late for it, friend. What'll it be? Mind, it's a cold night to be out." } }, R.g, 0).ox = R.x;
},
function (R, g) {
[-8, 0, 8].forEach(function (z) { poeFace(g, 3.6, 7, poeDS(poeS("velvet", 0xC8A060)), -R.w / 2 + 0.06, 5, z, Math.PI / 2); poeFace(g, 3.6, 7, poeDS(poeS("velvet", 0xC8A060)), R.w / 2 - 0.06, 5, z, -Math.PI / 2); });
for (var i = 0; i < 4; i++) {
var ch = poeGrp(g, -6 + i * 4, 8.4, 0);
poeCyl(ch, 1.4, 1.4, 0.1, poeShine(0xC8A050, 0.35, 0.85), 0, 0, 0, 16);
for (var c = 0; c < 8; c++) {
var a = c / 8 * Math.PI * 2;
poeCandle(ch, Math.cos(a) * 1.3, 0.05, Math.sin(a) * 1.3, 0.2);
}
poeCyl(ch, 0.02, 0.02, 3.6, poeC(0x1A1A1A), 0, 1.8, 0, 4);
}
poeLight(0xFFC070, 1.5, 30, R.x - 4, 7, 0, POE.G);
poeLight(0xFFC070, 1.5, 30, R.x + 4, 7, -6, POE.G);
[-6, 6].forEach(function (x) { poeTable(g, x, 2, 1.4, 10, 0.82, 0, 0xE8E0D0); poeSolid(R.x + x, 2, 1.6, 10.4, -1, 1.2); for (var k = 0; k < 10; k++) {
poeBottle(g, x + (k % 2 ? 0.4 : -0.4), 0.86, -2.6 + k * 1.1, 0x5A0A1A);
poeSph(g, 0.1, poeC([0xC82A1A, 0xE8C040, 0x5A2A8A][k % 3]), x, 0.92, -2.2 + k * 1.1, 8);
} });
var dais = poeBox(g, 8, 0.6, 3, poeS("oak", 0xA88A6A), 0, 0.3, -R.d / 2 + 2.4);
poeFloor(R.x, -R.d / 2 + 2.4, 8, 3, 0.6, true);
POE.masqFolk = [];
for (var p = 0; p < (POE.lite ? 10 : 22); p++) {
var x = -8 + (p % 6) * 3.2 + (p % 2) * 0.6, z = -8 + Math.floor(p / 6) * 4.2, f = p % 2 === 1;
var P = poeRoomPerson(R, "rev" + p, x, z, (p * 1.7) % 6.28, { name: f ? "A masker" : "A reveller", role: p === 0 ? "prince" : f ? "revelf" : "reveller", sex: f ? "f" : "m", fn: p === 0 ? null : function () { poeSay(["“To the dance! Outside is nothing to us.”", "“Have you seen the seventh room? I will not go in.”", "“Wine! And let the clock strike what it likes.”"][p % 3]); }, look: { _seed: p, top: [0xC81E2A, 0xE8C040, 0x2A5AC8, 0x2AA84A, 0x6A2A8A, 0xF4F2EE][p % 6] }, wander: { r: 3, sp: 0.6 } });
if (p === 0) {
P.g.position.set(0, 0, -6);
POE.masqFolk.prince = P;
}
POE.masqFolk.push(P);
}
POE.cast.prospero = POE.masqFolk.prince;
POE.cast.prospero.wander = null;
POE.talk.push({ p: POE.cast.prospero, r: 3, name: "Prince Prospero", t: { name: "Prince Prospero", persona: "Prince Prospero (Poe, 1842): happy and dauntless and sagacious; his dominions half depopulated by the Red Death, he has shut himself and a thousand friends in his castellated abbey. 'The external world could take care of itself. In the meantime it was folly to grieve, or to think.' Bold, fiery, barbaric in his tastes, amused by everything bizarre.", greet: "Welcome, welcome! Outside the Red Death may do as it likes. In here: the masquerade! Go through to the suite. Mind the clock." } });
},
function (R, g) {
var H = R.h;
R.cells = [];
POE_MASQ.forEach(function (M, i) {
var cx = -48 + i * 16, cz = i % 2 ? -4 : 4, col = M[0], black = i === 6;
var wm = black ? poeS("blackcloth") : poeS("velvet", col), fm = black ? poeS("blackcloth") : poeS("carpet", col), cm = black ? poeC(0x050404) : poeS("vault", col);
var op = [];
if (i > 0)
op.push(["w", -cz, 2.6, 3.2]);
else
op.push(["w", -cz, 2.6, 3.2]);
if (i < 6)
op.push(["e", -cz, 2.6, 3.2]);
poeCell(R, g, cx, cz, 14, 14, H, wm, fm, cm, op);
R.cells.push({ x: cx, z: cz, col: col, name: M[1] });
var gm = new THREE.MeshBasicMaterial({ color: black ? 0xA81010 : col, map: poeLeadTex(), fog: false });
R.cells[i].glass = gm;
[-1, 1].forEach(function (k) { var wg = poeGothicWin(g, cx, 2.4, cz + k * 6.96, k < 0 ? 0 : Math.PI, 1.4, 4.6, gm); });
var tri = poeGrp(g, cx, 0, cz - 7.6);
poeCyl(tri, 0.5, 0.3, 0.4, poeShine(0x3A2A1A, 0.5, 0.7), 0, 1.8, 0, 10);
var fl = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.9, 8), poeGlowM(0xFF8A30, 0.9));
fl.position.y = 2.4;
tri.add(fl);
var FL = { m: fl, s: 1, ph: i, out: true };
POE.flames.push(FL);
R.cells[i].brazier = FL;
fl.visible = false;
if (black) {
R.clock = poeClock(g, cx - 6.2, cz, Math.PI / 2, true);
poeSolid(R.x + cx - 6.2, cz, 1.6, 1.4, -1, 5);
}
else {
for (var d = 0; d < 3; d++) {
var dc = poeGrp(g, cx - 4 + d * 4, 0, cz + ((d * 5) % 3 - 1) * 3);
poeBox(dc, 0.5, 0.9, 0.5, poeShine(col, 0.4, 0.3), 0, 0.45, 0);
}
}
poeSpot(R.x + cx, cz - 5.6, 1.8, "The " + M[1] + " window", "look out at the brazier", function () { poeHook("brazier", i); }, 0);
});
for (var j = 0; j < 6; j++) {
var px = -48 + j * 16 + 8;
poePass(R, px, 0, 3.6, 2.4);
}
poePass(R, -48 - 7.6, 4, 2.4, 2.4);
R.doorAt = [{ D: ["w", 0, "m_hall", "The way back to the great hall"], P: { x: -48 - 7, z: 4, ry: Math.PI / 2, nx: 1, nz: 0 } }];
poeSpot(R.x - 48 - 6, 4, 1.6, "The way back to the great hall", "go through", function () { poeDoorUse(R, R.doorAt[0].D); }, 0);
R.light = poeLight(0xFFFFFF, 1.8, 26, R.x, 4, 0, POE.G, true);
if (R.light)
R.light.steady = 1;
R.start = { x: -52, z: 4, ry: -Math.PI / 2 };
R.onEnter = function () { poeSuiteTick(0); };
R.folk = [];
for (var p = 0; p < (POE.lite ? 8 : 16); p++) {
var ci = p % 6, C = R.cells[ci], f = p % 2 === 0;
R.folk.push(poeRoomPerson(R, "suite" + p, C.x - 4 + (p * 3) % 8, C.z - 3 + (p * 5) % 7, p, { name: f ? "A masker" : "A reveller", role: f ? "revelf" : "reveller", sex: f ? "f" : "m", look: { _seed: p + 3, top: [0xC81E2A, 0xE8C040, 0x2A5AC8, 0x2AA84A, 0x6A2A8A, 0xF4F2EE][p % 6] }, wander: { r: 3, sp: 0.7 } }));
}
},
function (dt) {
var R = POE_RX.m_suite;
if (!R || !R.g || POE.room !== R || !R.light)
return;
var L = worldLocal(), i = poeSuiteCell(R, L.x - R.x), C = R.cells[i];
var lit = !C.brazier.out, col = new THREE.Color(i === 6 ? 0xA81010 : C.col);
R.light.L.color.lerp(col, Math.min(1, (dt || 1) * 3));
R.light.k = lit ? 2.0 : 0.6;
R.light.L.position.set(R.x + C.x, 5, C.z);
R.cur = i;
},
function (R, g) {
poeParlour(R, g, 11, false);
var r = poeBox(g, 1.8, 0.4, 0.9, poeC(0x3A3028), -R.w / 2 + 1.2, 0.2, R.d / 2 - 1.0);
poeBox(g, 1.8, 0.05, 0.9, poeC(0xC8C0B0), -R.w / 2 + 1.2, 0.42, R.d / 2 - 1.0);
var sh = poeBox(g, 0.6, 0.25, 1.7, poeC(poeAdult() ? 0xC8B8B0 : 0xD8D2C8), -R.w / 2 + 1.2, 0.55, R.d / 2 - 1.0);
if (poeAdult()) {
for (var s = 0; s < 5; s++)
poeSph(g, 0.07, poeC(0x6A0A0A), -R.w / 2 + 1.0 + (s % 2) * 0.3, 0.68, R.d / 2 - 1.6 + s * 0.3, 6).scale.y = 0.2;
}
},
function (R, g, x, z, w, d, h, wm, fm, alongX) {
poePlane(g, w, d, fm, x, 0.01, z, 0);
var c = poePlane(g, w, d, wm, x, h, z, 0);
c.rotation.x = Math.PI;
if (alongX) {
poeFace(g, w, h, wm, x, h / 2, z - d / 2, 0);
poeFace(g, w, h, wm, x, h / 2, z + d / 2, Math.PI);
}
else {
poeFace(g, d, h, wm, x - w / 2, h / 2, z, Math.PI / 2);
poeFace(g, d, h, wm, x + w / 2, h / 2, z, -Math.PI / 2);
}
poeFloor(R.x + x, z, w, d, 0, true);
},
function (R, g) {
var bench = poeGrp(g, -R.w / 2 + 2.2, 0, 0);
poeBox(bench, 2.4, 0.5, 12, poeS("oak", 0x3A2A20), 0, 0.25, 0);
poeFloor(R.x - R.w / 2 + 2.2, 0, 2.4, 12, 0.5, true);
poeBox(bench, 1.1, 1.1, 11, poeS("blackcloth"), 0.9, 1.05, 0);
poeSolid(R.x - R.w / 2 + 3.1, 0, 1.2, 11.2, -1, 2.2);
R.candles = [];
for (var i = 0; i < 7; i++) {
var c = poeCandle(bench, 0.9, 1.6, -4.5 + i * 1.5, 0.9, true);
R.candles.push(c);
}
poeLight(0xFFE0B0, 1.3, 16, R.x - R.w / 2 + 3.4, 3, 0, POE.G);
R.judges = [];
for (var j = 0; j < 5; j++) {
var J = poeRoomPerson(R, "judge" + j, -R.w / 2 + 1.6, -4 + j * 2, Math.PI / 2 * -1, { name: j === 2 ? "The Inquisitor General" : "A black-robed judge", role: "monk", sex: "m", look: { _seed: j + 20, skin: 0xE8E0D8, hair: 0x8A8A8A } });
J.g.position.y = 0.5;
R.judges.push(J);
}
var cr = poeGrp(g, -R.w / 2 + 0.2, 6, 0, Math.PI / 2);
poeBox(cr, 0.3, 4, 0.2, poeC(0x1A1410), 0, 0, 0);
poeBox(cr, 2, 0.3, 0.2, poeC(0x1A1410), 0, 0.9, 0);
poeBox(g, 2, 0.1, 2, poeS("oak", 0x4A3A2A), 1, 0.05, 0);
[-1, 1].forEach(function (k) { poeBox(g, 2, 1, 0.1, poeS("oak", 0x4A3A2A), 1, 0.5, k); });
for (var b = 0; b < 4; b++) {
poeBox(g, 3.6, 0.5, 0.5, poeS("oak", 0x3A2A20), 4, 0.25, -9 + b * 6);
}
[-9, 9].forEach(function (z) { poeTorch(g, R.w / 2 - 0.2, 3, z, -Math.PI / 2, 0.7); });
},
function (R, g) {
poeParlour(R, g, 13, true);
poeRoomPerson(R, "inn1", -2.2, 1.6, 0.6, { name: "The innkeeper", sex: "f", talk: { name: "The innkeeper", persona: "A Spanish innkeeper in Toledo, 1808, as the French army nears the city. She is afraid of the Inquisition and speaks low about the men who go into its house and do not come out.", greet: "Hush. Not so loud. They took another last night. They say the French are a day's march off; pray they come." } }, R.g, 0).ox = R.x;
},
function (R, g) {
var S = 18, H = R.h, fm = poeS("flags", 0x8A8478), iron = new THREE.MeshLambertMaterial({ map: poeTex("copper"), color: 0x6A5A50, emissive: 0xFF2A00, emissiveIntensity: 0 });
R.S = S;
R.iron = iron;
poePlane(g, S + 8, S + 8, fm, 0, 0, 0, 0);
var c = poePlane(g, S + 8, S + 8, poeS("stone", 0x3A3A3A), 0, H, 0, 0);
c.rotation.x = Math.PI;
R.walls = [];
[["n", 0, -1, 0], ["s", 0, 1, Math.PI], ["e", 1, 0, -Math.PI / 2], ["w", -1, 0, Math.PI / 2]].forEach(function (W) {
var m = poeFace(g, S + 8, H, iron, W[1] * S / 2, H / 2, W[2] * S / 2, W[3]);
m.userData.n = [W[1], W[2]];
R.walls.push(m);
for (var k = 0; k < 3; k++) {
var f = poePic(m, 2.2, 3.2, function (x, PW, PH) {
x.fillStyle = "rgba(0,0,0,0)";
x.clearRect(0, 0, PW, PH);
x.strokeStyle = "#C8B8A0";
x.fillStyle = "#C8B8A0";
x.lineWidth = 5;
x.beginPath();
x.arc(PW / 2, PH * 0.2, PW * 0.16, 0, 7);
x.fill();
x.fillStyle = "#1A0A08";
x.beginPath();
x.arc(PW * 0.44, PH * 0.19, PW * 0.04, 0, 7);
x.arc(PW * 0.56, PH * 0.19, PW * 0.04, 0, 7);
x.fill();
x.beginPath();
x.moveTo(PW / 2, PH * 0.3);
x.lineTo(PW / 2, PH * 0.62);
x.stroke();
for (var r = 0; r < 5; r++) {
x.beginPath();
x.moveTo(PW * 0.3, PH * (0.36 + r * 0.05));
x.lineTo(PW * 0.7, PH * (0.36 + r * 0.05));
x.stroke();
}
x.beginPath();
x.moveTo(PW / 2, PH * 0.36);
x.lineTo(PW * 0.14, PH * 0.2);
x.moveTo(PW / 2, PH * 0.36);
x.lineTo(PW * 0.86, PH * 0.5);
x.moveTo(PW / 2, PH * 0.62);
x.lineTo(PW * 0.3, PH * 0.95);
x.moveTo(PW / 2, PH * 0.62);
x.lineTo(PW * 0.72, PH * 0.95);
x.stroke();
}, -5 + k * 5, -0.6, 0.03, 0, "fiend");
f.material.transparent = true;
}
});
R.size = S;
R.block = function (x, z) { var h = R.size / 2 - 0.5, lx = x - R.x; return Math.abs(lx) > h || Math.abs(z) > h; };
poeFloor(R.x, 0, S + 8, S + 8, 0, true);
R.pit = { x: 3, z: 0, r: 2.4 };
var rim = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.18, 6, 28), poeS("stone", 0x5A5A58));
rim.rotation.x = Math.PI / 2;
rim.position.set(3, 0.05, 0);
g.add(rim);
var hole = new THREE.Mesh(new THREE.CircleGeometry(2.4, 28), new THREE.MeshBasicMaterial({ color: 0x000000 }));
hole.rotation.x = -Math.PI / 2;
hole.position.set(3, 0.02, 0);
g.add(hole);
var fr = poeGrp(g, -5, 0, 0);
poeBox(fr, 0.9, 0.5, 2.1, poeS("oak", 0x5A4A3A), 0, 0.25, 0);
R.frame = fr;
R.frameAt = { x: -5, z: 0 };
R.straps = [];
for (var s = 0; s < 5; s++) {
var st = poeBox(fr, 1.0, 0.06, 0.08, poeC(0x6A5030), 0, 0.56, -0.8 + s * 0.4);
R.straps.push(st);
}
R.dish = poeGrp(g, -5.9, 0, 0.3);
poeCyl(R.dish, 0.22, 0.16, 0.06, poeC(0x8A6A4A), 0, 0.03, 0, 12);
poeSph(R.dish, 0.12, poeC(0x6A3A2A), 0, 0.1, 0, 8);
R.pitcher = poeGrp(g, -5.9, 0, -0.5);
poeCyl(R.pitcher, 0.1, 0.14, 0.3, poeC(0x8A6A4A), 0, 0.15, 0, 10);
var pv = poeGrp(g, -5, H, 0), rod = poeBox(pv, 0.08, 1, 0.08, poeShine(0x2A2A2A, 0.4, 0.8), 0, -0.5, 0);
var bl = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.035, 4, 20, Math.PI), poeShine(0xD8D8E0, 0.15, 0.95));
bl.rotation.z = Math.PI;
bl.scale.set(1, 1, 0.3);
pv.add(bl);
var wt = poeBox(pv, 0.3, 0.3, 0.2, poeShine(0x8A7A4A, 0.4, 0.8), 0, 0, 0);
R.pend = { pv: pv, rod: rod, blade: bl, wt: wt, len: 1.2, sw: 0.1, t: 0, on: false };
pv.visible = false;
var tm = poePic(g, 5, 5, function (x, PW, PH) {
x.fillStyle = "#3A3A38";
x.fillRect(0, 0, PW, PH);
x.strokeStyle = "#B8A888";
x.lineWidth = 6;
x.beginPath();
x.arc(PW / 2, PH * 0.3, PW * 0.1, 0, 7);
x.stroke();
x.beginPath();
x.moveTo(PW / 2, PH * 0.4);
x.lineTo(PW / 2, PH * 0.8);
x.moveTo(PW * 0.3, PH * 0.5);
x.lineTo(PW * 0.7, PH * 0.5);
x.stroke();
x.beginPath();
x.arc(PW * 0.72, PH * 0.34, PW * 0.2, 3.6, 5.6);
x.stroke();
}, -5, H - 0.03, 0, 0, "time");
tm.rotation.x = Math.PI / 2;
R.rats = [];
for (var r = 0; r < (POE.lite ? 14 : 30); r++) {
var rt = poeGrp(g, 3, 0, 0);
var bd = poeSph(rt, 0.09, poeC(0x2A2420), 0, 0.07, 0, 6);
bd.scale.set(1, 0.8, 2);
poeSph(rt, 0.012, poeGlowM(0xFF4030), 0.03, 0.1, -0.15, 4);
poeSph(rt, 0.012, poeGlowM(0xFF4030), -0.03, 0.1, -0.15, 4);
rt.visible = false;
R.rats.push({ g: rt, a: r * 0.7, d: 1 + ((r * 7) % 5) });
}
R.light = poeLight(0xC8B070, 0.0, 24, R.x, 3, 0, POE.G, true);
if (R.light)
R.light.steady = 1;
R.glow = poeLight(0xFF3A10, 0.0, 26, R.x, 2, 0, POE.G, true);
if (R.glow)
R.glow.steady = 1;
R.start = { x: -5, z: 1.6, ry: 0 };
R.envBlack = true;
R.doorAt = [];
},
function (dt) {
var R = POE_RX.p_dungeon;
if (!R || !R.g || POE.room !== R)
return;
var P = R.pend;
if (P && P.pv.visible) {
P.t += dt;
var a = Math.sin(P.t * (1.1 + P.sw)) * P.sw;
P.pv.rotation.x = a;
P.rod.scale.y = P.len;
P.rod.position.y = -P.len / 2;
P.blade.position.y = -P.len;
P.wt.position.y = -P.len + 0.3;
if (P.on && Math.abs(a) < 0.05 && !P.sw_s && P.sw > 0.3) {
P.sw_s = 1;
poeSfx("swish", { k: Math.min(1, P.len / 8) });
}
if (Math.abs(a) > P.sw * 0.6)
P.sw_s = 0;
}
R.rats.forEach(function (Q, i) {
if (!Q.g.visible)
return;
Q.a += dt * (0.6 + (i % 5) * 0.2);
var tx = R.ratAt ? R.ratAt.x + Math.cos(Q.a * 3 + i) * 0.5 : 3 + Math.cos(Q.a) * (2.8 + Q.d), tz = R.ratAt ? R.ratAt.z + Math.sin(Q.a * 2 + i) * 0.9 : Math.sin(Q.a) * (2.8 + Q.d);
Q.g.position.x += (tx - Q.g.position.x) * Math.min(1, dt * 2);
Q.g.position.z += (tz - Q.g.position.z) * Math.min(1, dt * 2);
Q.g.position.y = R.ratAt ? 0.55 : 0;
Q.g.rotation.y = Q.a;
});
},
function (R, g) {
poeTable(g, 0, 0, 3, 1.4, 0.8, 0, 0x5A0A1A);
poeSolid(R.x, 0, 3.2, 1.6, -1, 1.2);
for (var i = 0; i < 4; i++)
poeChair(g, -1 + i % 2 * 2, i < 2 ? -1.1 : 1.1, i < 2 ? 0 : Math.PI, 0x5A1A1A, 0, true);
poeCandelabrum(g, 0, 0.82, 0, 1, true);
[-5, 5].forEach(function (z, i) { var t = poeTorch(g, -R.w / 2 + 0.2, 2.4, z, Math.PI / 2, 0.9); if (i === 0)
R.flambeau = t; });
[-5, 5].forEach(function (z) { poePainting(g, R.w / 2 - 0.06, 3.4, z, -Math.PI / 2, 1.6, 2.2, function (x, W, H) { x.fillStyle = "#1A1410"; x.fillRect(0, 0, W, H); x.fillStyle = "#3A2418"; x.beginPath(); x.ellipse(W / 2, H * 0.8, W * 0.34, H * 0.3, 0, 0, 7); x.fill(); x.fillStyle = "#C8A888"; x.beginPath(); x.ellipse(W / 2, H * 0.36, W * 0.15, H * 0.14, 0, 0, 7); x.fill(); x.fillStyle = "#E8E0D0"; x.fillRect(W * 0.4, H * 0.5, W * 0.2, H * 0.06); x.fillStyle = "#0A0806"; x.fillRect(W * 0.42, H * 0.33, W * 0.05, H * 0.015); x.fillRect(W * 0.53, H * 0.33, W * 0.05, H * 0.015); }, "anc" + z); });
poePic(g, 2.2, 2.6, function (x, W, H) {
x.fillStyle = "#1A3A8A";
x.fillRect(0, 0, W, H);
x.fillStyle = "#D8B040";
x.beginPath();
x.ellipse(W * 0.5, H * 0.42, W * 0.2, H * 0.12, 0.2, 0, 7);
x.fill();
x.fillRect(W * 0.52, H * 0.14, W * 0.14, H * 0.26);
x.strokeStyle = "#2A8A3A";
x.lineWidth = 10;
x.beginPath();
x.moveTo(W * 0.1, H * 0.7);
x.bezierCurveTo(W * 0.4, H * 0.5, W * 0.5, H * 0.8, W * 0.68, H * 0.5);
x.stroke();
x.fillStyle = "#E8D8A0";
x.font = "bold " + Math.round(H * 0.07) + "px Georgia";
x.textAlign = "center";
x.fillText("NEMO ME IMPUNE", W / 2, H * 0.86);
x.fillText("LACESSIT", W / 2, H * 0.95);
}, 0, 4.6, -R.d / 2 + 0.05, 0, "arms");
poeSpot(R.x - R.w / 2 + 1.2, -5, 1.6, "A flambeau in its sconce", "take it", function () { poeHook("flambeau"); }, 0);
poeRug(g, 0, 0, 6, 4, 0x6A1A2A);
},
function (R, g) {
poeParlour(R, g, 15, false);
poeWineRack(g, -R.w / 2 + 0.3, -1, Math.PI / 2, 3);
poeWineRack(g, -R.w / 2 + 0.3, 2, Math.PI / 2, 2);
for (var c = 0; c < 3; c++)
poeCask(g, R.w / 2 - 1, 0, -2.4 + c * 1.2, 1, false);
poeRoomPerson(R, "vint", 1.8, 1.8, -0.6, { name: "The vintner", role: "carnival", sex: "m", talk: { name: "The vintner", persona: "An Italian vintner during the carnival, in Poe's Cask of Amontillado. Merry, a little drunk. He knows Fortunato prides himself on his connoisseurship in wine, and that Luchesi is his rival.", greet: "Amontillado? In the middle of the carnival? Ha! You have been imposed upon, signor. Ask Fortunato; or Luchesi, if you must." } }, R.g, 0).ox = R.x;
},
function (R, g) {
var H = R.h, nit = poeS("nitre"), bones = poeS("bones"), fl = poeS("earth", 0x4A4038), vt = poeS("stone", 0x4A4A48);
R.cells = [];
var names = ["the foot of the stair", "the first vault: casks and puncheons", "the walls of piled bones", "the vault of the Medoc", "the low arches", "the vault of the De Grâve", "the deep crypt"];
for (var i = 0; i < 7; i++) {
var cx = -54 + i * 18, cz = i % 2 ? -3 : 3, wm = i === 2 || i === 6 ? bones : nit, op = [];
if (i > 0)
op.push(["w", -cz, 2.2, 2.6]);
if (i < 6)
op.push(["e", -cz, 2.2, 2.6]);
if (i === 6)
op.push(["n", 3, 1.1, 2.0]);
poeCell(R, g, cx, cz, 16, 10, i === 4 ? 2.6 : H, wm, fl, vt, op);
R.cells.push({ x: cx, z: cz, n: names[i] });
if (i < 6)
poeTunnel(R, g, cx + 9, 0, 2, 2.2, 2.6, nit, fl, true);
for (var n = 0; n < 6; n++) {
var nx = cx - 7 + ((n * 37 + i * 11) % 14), nz = cz + (n % 2 ? -4.9 : 4.9);
poeFace(g, 1.2 + (n % 3) * 0.5, 1.4, poeGlowM(0xD8E0D8, 0.22), nx, H - 0.9, nz, n % 2 ? 0 : Math.PI);
}
if (i === 1 || i === 3 || i === 5) {
for (var c = 0; c < 5; c++)
poeCask(g, cx - 6 + c * 3, 0, cz + (i === 3 ? 4 : -4), 1.1, c % 2 === 0);
poeWineRack(g, cx - 2, cz + (i === 3 ? -4.6 : 4.6), i === 3 ? 0 : Math.PI, 4);
poeWineRack(g, cx + 3.5, cz + (i === 3 ? -4.6 : 4.6), i === 3 ? 0 : Math.PI, 3);
}
if (i === 2 || i === 4 || i === 6) {
for (var b = 0; b < 6; b++)
poeBonePile(g, cx - 6.5 + b * 2.6, 0, cz + (b % 2 ? -4.2 : 4.2), 8, i * 10 + b, 1.6);
for (var s = 0; s < 5; s++)
poeSkull(g, cx - 6 + s * 3, 1.2 + (s % 2) * 0.5, cz - 4.8, 0, 1);
}
if (i === 0) {
for (var t = 0; t < 8; t++)
poeBox(g, 2.2, 0.2, 0.4, poeS("stone", 0x5A5A58), cx - 7.4 + 0.0, 0.1 + t * 0.24, cz + 3.6 - t * 0.45);
}
}
var C3 = R.cells[3], C5 = R.cells[5];
for (var m = 0; m < 7; m++) {
poeBottle(g, C3.x - 3 + m * 0.3, 0.08, C3.z - 4.2, 0x2A1A10, true);
poeBottle(g, C5.x - 3 + m * 0.3, 0.08, C5.z + 4.2, 0x1A2A14, true);
}
poeSpot(R.x + C3.x - 2, C3.z - 3.6, 1.6, "A row of bottles of Medoc on the mould", "take one", function () { poeHook("medoc"); }, 0);
poeSpot(R.x + C5.x - 2, C5.z + 3.6, 1.6, "A flagon of De Grâve", "take it", function () { poeHook("degrave"); }, 0);
var C6 = R.cells[6], nx0 = C6.x + 3, nz0 = C6.z - 5;
R.niche = { x: nx0, z: nz0 - 0.75 };
var ng = poeGrp(g, nx0, 0, nz0);
poePlane(ng, 1.1, 1.5, fl, 0, 0.01, -0.75, 0);
poeFace(ng, 1.1, 2.1, poeS("stone", 0x6A6660), 0, 1.05, -1.5, 0);
poeFace(ng, 1.5, 2.1, poeS("stone", 0x6A6660), -0.55, 1.05, -0.75, Math.PI / 2);
poeFace(ng, 1.5, 2.1, poeS("stone", 0x6A6660), 0.55, 1.05, -0.75, -Math.PI / 2);
var cp = poePlane(ng, 1.1, 1.5, poeS("stone", 0x4A4A48), 0, 2.0, -0.75, 0);
cp.rotation.x = Math.PI;
[-0.3, 0.3].forEach(function (o) { var st = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.015, 5, 10), poeShine(0x3A3A3A, 0.5, 0.8)); st.position.set(o, 1.0, -1.46); ng.add(st); });
R.chain = poeChain(ng, -0.3, 1.0, -1.44, -0.1, 0.5, -1.3, 7);
R.tiers = [];
for (var tr = 0; tr < 11; tr++) {
var row = poeGrp(ng, 0, 0.095 + tr * 0.19, 0);
for (var q = 0; q < 3; q++)
poeBox(row, 0.36, 0.18, 0.3, poeS("stone", [0x8A8680, 0x7A7670, 0x94908A][(q + tr) % 3]), -0.37 + q * 0.37 + (tr % 2 ? 0.06 : -0.06), 0, 0);
row.visible = false;
R.tiers.push(row);
}
R.bonepile = poeGrp(g, nx0 + 2.2, 0, nz0 + 0.9);
poeBonePile(R.bonepile, 0, 0, 0, 26, 99, 2.2);
R.stones = poeGrp(g, nx0 + 2.2, 0, nz0 + 0.9);
for (var st2 = 0; st2 < 8; st2++)
poeBox(R.stones, 0.36, 0.18, 0.3, poeS("stone", 0x8A8680), (st2 % 4) * 0.4 - 0.6, 0.09 + Math.floor(st2 / 4) * 0.19, 0, 0.2 * st2);
R.stones.visible = false;
poeSpot(R.x + nx0 + 2.2, nz0 + 1.6, 1.6, "The pile of bones by the recess", "throw the bones aside", function () { poeHook("bones"); }, 0);
poeSpot(R.x + nx0, nz0 + 0.9, 1.5, "The recess", "work at the wall", function () { poeHook("wall"); }, 0);
var C0 = R.cells[0];
R.doorAt = [{ D: ["w", 0, "c_hall", "The long and winding staircase up"], P: { x: C0.x - 7, z: C0.z, ry: Math.PI / 2, nx: 1, nz: 0 } }];
poeSpot(R.x + C0.x - 6.6, C0.z + 2, 1.8, "The long and winding staircase up", "go up", function () { poeDoorUse(R, R.doorAt[0].D); }, 0);
R.start = { x: C0.x - 5, z: C0.z, ry: -Math.PI / 2 };
R.light = poeLight(0xFF9A40, 1.5, 13, R.x, 2, 0, POE.G, true);
R.far = poeLight(0xFF8030, 0.8, 9, R.x, 2, 0, POE.G, true);
R.fog = 0.07;
},
function (dt) {
var R = POE_RX.c_vaults;
if (!R || !R.g || POE.room !== R)
return;
var L = worldLocal();
if (R.light) {
R.light.L.position.set(L.x, 2.0, L.z);
R.light.k = (POE.vaultDim != null ? POE.vaultDim : 1) * 1.5;
}
var F = POE.cast.fortunato;
if (R.far && F && F.g.visible && F.room === R) {
R.far.L.position.set(R.x + F.g.position.x, 2, F.g.position.z);
R.far.k = 0.8;
}
else if (R.far)
R.far.k = 0;
R.cur = poeVaultCell(R, L.x - R.x);
},
function (R, g) {
poeFireplace(g, -R.w / 2 + 0.3, 0, Math.PI / 2, "embers");
poeSolid(R.x - R.w / 2 + 0.6, 0, 1.2, 2.4, -1, 2);
poeArmchair(g, -2.2, -1.4, Math.PI / 2 + 0.5, 0x3A4A3A);
poeArmchair(g, -2.2, 1.4, Math.PI / 2 - 0.5, 0x4A2A2A);
poeSolid(R.x - 2.2, -1.4, 0.9, 0.9, -1, 1);
poeSolid(R.x - 2.2, 1.4, 0.9, 0.9, -1, 1);
poeTable(g, 1.2, 0, 1.2, 1.8, 0.76, 0, 0x2A3A2A);
poeSolid(R.x + 1.2, 0, 1.4, 2, -1, 1.1);
poeCandle(g, 1.0, 0.78, -0.5, 0.26, true);
poeCandle(g, 1.4, 0.78, 0.5, 0.26, true);
poeLight(0xFFD8A0, 0.9, 9, R.x + 1.2, 1.6, 0, POE.G);
var np = poeBox(g, 0.5, 0.01, 0.7, poeC(0xD8D0B8), 1.1, 0.775, 0);
poeSpot(R.x + 1.2, 1.4, 1.5, "The Gazette des Tribunaux", "read the evening edition", function () { poeHook("gazette"); }, 0);
for (var s = 0; s < 6; s++)
poeBox(g, 0.3, 0.06 + s * 0.01, 0.22, poeC([0x5A1A1A, 0x1A3A2A, 0x2A2A5A][s % 3]), 3.6, 0.03 + s * 0.07, -3 + ((s * 3) % 4) * 0.2, s * 0.3);
poeRug(g, -0.5, 0, 5, 4, 0x4A3028);
POE.cast.dupin = poeRoomPerson(R, "dupin", -2.2, -1.4, Math.PI / 2 + 0.5, { name: "C. Auguste Dupin", role: "dupin", sex: "m", look: { skin: 0xE8D4C0, hair: 0x1A1410, specs: 1 }, talk: { name: "C. Auguste Dupin", persona: "C. Auguste Dupin (Poe, 1841): a young gentleman of an illustrious family reduced to poverty, living in seclusion in Paris, enamoured of the night, with a peculiar analytic ability. 'Most men, in respect to himself, wore windows in their bosoms.' Dry, exact, a little rich in voice when he analyses.", greet: "He is a very little fellow, that's true, and would do better for the Théâtre des Variétés. ...You were thinking of Chantilly, were you not?" } });
},
function (R, g) {
for (var i = 0; i < 14; i++)
poeBox(g, 1.6, 0.2, 0.34, poeS("boards"), -R.w / 2 + 0.9, 0.1 + i * 0.2, 3.6 - i * 0.5);
poeSolid(R.x - R.w / 2 + 0.9, 0.4, 1.7, 7, -1, 4);
poeBox(g, 0.08, 1, 7, poeC(POE_WOOD), -R.w / 2 + 1.74, 1.8, 0.4).rotation.x = 0.38;
poeLamp(g, R.w / 2 - 0.4, 1.3, 3, 0.6);
poeTable(g, R.w / 2 - 0.4, 3, 0.5, 0.5, 1.25, 0, null);
poeBox(g, 0.5, 0.02, 0.2, poeC(0x9A8060), 0.6, 0.02, -4.6, 0.5);
poeBox(g, 0.3, 0.02, 0.12, poeC(0x9A8060), -0.2, 0.02, -4.2, 1.1);
POE.cast.muset = poeRoomPerson(R, "muset", 1.2, 2.4, -0.6, { name: "Isidore Musèt, gendarme", role: "gendarme", sex: "m", look: { skin: 0xE8CCB4, hair: 0x2A1A10, beard: 1 } });
},
function (R, g) {
var bs = poeGrp(g, -R.w / 2 + 1.3, 0, 2.2);
poeBox(bs, 2.0, 0.4, 1.4, poeC(POE_WOOD), 0, 0.3, 0);
poeBox(bs, 0.1, 1.5, 1.4, poeC(POE_WOOD), -1, 0.75, 0);
poeSolid(R.x - R.w / 2 + 1.3, 2.2, 2.1, 1.5, -1, 1.6);
var mt = poeBox(g, 1.9, 0.24, 1.3, poeC(0xC8C0B0), 0.4, 0.12, 0.4, 0.5);
var ch = poeChair(g, 1.6, 2.6, 0.9, 0x5A3A2A);
var rz = poeGrp(g, 1.6, 0.5, 2.6);
poeBox(rz, 0.03, 0.01, 0.16, poeShine(0xC8C8D0, 0.2, 0.9), 0, 0, 0);
poeBox(rz, 0.035, 0.02, 0.12, poeC(0x1A1410), 0, 0, 0.13);
if (poeAdult())
poeBox(rz, 0.03, 0.011, 0.1, poeC(0x6A0A0A), 0, 0.001, -0.02);
poeFireplace(g, 0.5, -R.d / 2 + 0.3, 0, false);
poeSolid(R.x + 0.5, -R.d / 2 + 0.6, 2.4, 1.2, -1, 2);
for (var h = 0; h < 3; h++) {
var tr = poeBox(g, 0.04, 0.02, 0.5, poeC(0xB8B4AC), 0.2 + h * 0.25, 0.02, -R.d / 2 + 1.5, h * 0.6);
}
for (var n = 0; n < 4; n++)
poeCyl(g, 0.03, 0.03, 0.008, poeShine(0xE8C040, 0.2, 0.95), -0.6 + n * 0.22, 0.01, 1.9 + (n % 2) * 0.2, 10);
poeSph(g, 0.025, poeShine(0xE8A020, 0.1, 0.6), 0.6, 0.03, 2.1, 8);
for (var sp = 0; sp < 3; sp++)
poeBox(g, 0.03, 0.01, 0.2, poeShine(0xD8D8E0, 0.2, 0.95), -1.2 + sp * 0.12, 0.01, 0.2, sp * 0.4);
[0, 1].forEach(function (b) { var bg = poeSph(g, 0.2, poeC(0x8A7A5A), 1.2 + b * 0.5, 0.16, 1.0, 10); bg.scale.y = 0.8; });
var bu = poeGrp(g, R.w / 2 - 0.4, 0, -1.4, -Math.PI / 2);
poeBox(bu, 1.2, 1.1, 0.55, poeC(POE_WOOD), 0, 0.55, 0);
for (var d = 0; d < 3; d++)
poeBox(bu, 1.0, 0.22, 0.5, poeC(0x5A4030), 0, 0.25 + d * 0.3, 0.2 + d * 0.08);
poeSolid(R.x + R.w / 2 - 0.4, -1.4, 0.7, 1.3, -1, 1.2);
poeBox(g, 0.5, 0.4, 0.4, poeShine(0x2A2A2A, 0.6, 0.7), -R.w / 2 + 1.3, 0.2, 1.2);
R.win = [{ x: -R.w / 2 + 0.3, z: 2.2, n: "The window behind the head of the bedstead" }, { x: -R.w / 2 + 0.3, z: -1.6, n: "The other window" }];
R.win.forEach(function (W, i) { poeSashWin(g, -R.w / 2 + 0.05, 1.5, W.z, Math.PI / 2, 1.0, 1.6, false); poeSpot(R.x + W.x + (i === 0 ? 1.8 : 0.8), W.z + (i === 0 ? -1.0 : 0), 1.4, W.n, "examine the sash", function () { poeHook("win" + (i + 1)); }, 0); });
poeSpot(R.x + 0.5, -R.d / 2 + 1.6, 1.4, "The chimney", "look up it", function () { poeHook("chimney"); }, 0);
poeSpot(R.x + 0.5, -R.d / 2 + 2.4, 1.2, "The hearth", "look at what lies on it", function () { poeHook("hearth"); }, 0).off = true;
poeSpot(R.x + 1.6, 2.0, 1.3, "The chair with the razor", "look closely", function () { poeHook("razor"); }, 0);
poeSpot(R.x + 0.2, 1.4, 1.4, "The gold on the floor", "count it", function () { poeHook("gold"); }, 0);
poeSpot(R.x + R.w / 2 - 1.2, -1.4, 1.3, "The bureau", "look in the drawers", function () { poeHook("bureau"); }, 0);
R.lampL = poeLight(0xFFE8C0, 0.7, 10, R.x, 2.6, 0, POE.G);
},
function (R, g) {
for (var i = 0; i < 3; i++) {
poeBox(g, 1.8, 0.3, 0.9, poeC(POE_WOOD), -0.6, 0.15 + i * 0.32, -2 + i * 0.1, i * 0.2);
}
poeSolid(R.x - 0.6, -2, 1.9, 1.1, -1, 1.4);
for (var b = 0; b < 4; b++)
poeBox(g, 0.6, 0.5, 0.5, poeC([0x6A5A40, 0x5A4A3A][b % 2]), 1.2, 0.25 + Math.floor(b / 2) * 0.5, 1 + (b % 2) * 0.6, b * 0.2);
poeSolid(R.x + 1.2, 1.3, 0.8, 1.3, -1, 1.4);
poeSpot(R.x + R.w / 2 - 1.0, 0, 1.4, "The window over the paved yard", "look down", function () { poeHook("yard"); }, 0);
},
function (R, g) {
var W = [["Pauline Dubourg, laundress", "f", "poorf"], ["Pierre Moreau, tobacconist", "m", "french"], ["Henri Duval, silversmith", "m", "french"], ["Odenheimer, restaurateur", "m", "french"], ["William Bird, tailor", "m", "gent"], ["Alfonzo Garcio, undertaker", "m", "french"], ["Alberto Montani, confectioner", "m", "french"]];
R.wit = [];
W.forEach(function (w, i) {
var x = -3.6 + (i % 4) * 2.4, z = -2.4 + Math.floor(i / 4) * 3.2;
poeTable(g, x, z, 0.8, 0.8, 0.74, 0, 0xE8E0D0);
poeSolid(R.x + x, z, 0.9, 0.9, -1, 1.1);
poeChair(g, x, z - 0.8, 0, 0x3A2A1A);
poeChair(g, x, z + 0.8, Math.PI, 0x3A2A1A);
poeBottle(g, x + 0.2, 0.76, z, 0x1A3A1A);
R.wit.push(poeRoomPerson(R, "wit" + i, x + 0.9, z + 0.5, -1.2, { name: w[0], role: w[2], sex: w[1], look: { _seed: i + 40 } }));
});
var bar = poeGrp(g, R.w / 2 - 0.8, 0, 2.6, -Math.PI / 2);
poeBox(bar, 3, 1.1, 0.6, poeS("marble", 0xE8E0D8), 0, 0.55, 0);
for (var b = 0; b < 7; b++)
poeBottle(bar, -1.2 + b * 0.4, 1.1, 0, [0x1A3A1A, 0x5A2A10, 0x3A1A2A][b % 3]);
poeSolid(R.x + R.w / 2 - 0.8, 2.6, 0.8, 3.2, -1, 1.3);
[-2.5, 2.5].forEach(function (x) { var ch = poeGrp(g, x, R.h - 0.9, 0); for (var c = 0; c < 5; c++) {
var a = c / 5 * 6.283;
poeCandle(ch, Math.cos(a) * 0.4, 0, Math.sin(a) * 0.4, 0.14, true);
} poeCyl(ch, 0.42, 0.42, 0.03, poeShine(0xC8A050, 0.3, 0.9), 0, -0.02, 0, 12); poeLight(0xFFE0B0, 1.1, 12, R.x + x, R.h - 1.2, 0, POE.G); });
},
function (R, g) {
poeDesk(g, 0, -2.2, 0);
poeSolid(R.x, -2.2, 1.7, 0.9, -1, 1.1);
poeLamp(g, 0.5, 0.8, -2.2, 0.9);
poeBookcase(g, -R.w / 2 + 0.25, -1, 2.4, 3, Math.PI / 2);
poeBookcase(g, R.w / 2 - 0.25, -1, 2.4, 3, -Math.PI / 2);
for (var i = 0; i < 3; i++)
poeChair(g, -1.4 + i * 1.4, 0, Math.PI, 0x3A2A1A);
var cg = poeGrp(g, R.w / 2 - 1.6, 0, R.d / 2 - 1.6);
for (var b = 0; b < 9; b++)
poeCyl(cg, 0.025, 0.025, 2.6, poeShine(0x2A2A2A, 0.5, 0.8), -1.4 + b * 0.35, 1.3, -1.4, 6);
for (var b2 = 0; b2 < 8; b2++)
poeCyl(cg, 0.025, 0.025, 2.6, poeShine(0x2A2A2A, 0.5, 0.8), -1.4, 1.3, -1.4 + b2 * 0.35 + 0.35, 6);
poeSolid(R.x + R.w / 2 - 1.6, R.d / 2 - 3, 3.2, 0.2, -1, 3);
poeSolid(R.x + R.w / 2 - 3, R.d / 2 - 1.6, 0.2, 3.2, -1, 3);
POE.cast.lebon = poeRoomPerson(R, "lebon", R.w / 2 - 1.4, R.d / 2 - 1.4, -2.4, { name: "Adolphe Le Bon, in the cell", role: "french", sex: "m", look: { _seed: 61 } });
POE.cast.prefect = poeRoomPerson(R, "prefect", 0, -3, 0, { name: "G—, the Prefect of Police", role: "gendarme", sex: "m", look: { _seed: 62, beard: 1 }, talk: { name: "G—, the Prefect of Police", persona: "G—, Prefect of the Parisian police (Poe). Cunning but not profound: 'too cunning to be profound'. He dislikes Dupin's meddling but gives him permission. Pompous, a little sarcastic.", greet: "Monsieur Dupin's friend. The affair of the Rue Morgue is insoluble; so say the papers. We have our man, Le Bon. But look, if it amuses you." } });
},
function (R, g) {
var ct = poeGrp(g, 0, 0, -1.6);
poeBox(ct, 4, 1, 0.7, poeS("oak", 0x7A5A3A), 0, 0.5, 0);
poeSolid(R.x, -1.6, 4.2, 0.9, -1, 1.2);
for (var s = 0; s < 5; s++)
poeBox(ct, 0.4, 0.03 + s * 0.01, 0.3, poeC(0xD8D0B8), -1.5 + s * 0.7, 1.02, 0, s * 0.2);
poeLamp(g, 1.6, 1.02, -1.6, 0.9);
poeSpot(R.x, -0.4, 1.6, "The counter: advertisements taken for Le Monde", "hand in an advertisement", function () { poeHook("advert"); }, 0);
POE.cast.clerk = poeRoomPerson(R, "clerk", 0, -2.6, 0, { name: "The clerk of Le Monde", role: "french", sex: "m", look: { _seed: 70, specs: 1 }, talk: { name: "The clerk of Le Monde", persona: "A clerk in a Paris bookshop of 1841 who also takes in advertisements for Le Monde, a paper devoted to the shipping interest and much sought by sailors.", greet: "Books, monsieur? Or an advertisement for Le Monde? The sailors all read it." } });
},
function (x, W, H) {
x.fillStyle = "#A89C82";
x.fillRect(0, 0, W, H);
var R = wRand(171), y = 0, i;
while (y < H) {
var h = H / 8 + R() * H / 10, x0 = -R() * W / 3;
while (x0 < W) {
var w = W / 5 + R() * W / 3, sh = 150 + R() * 46 | 0;
x.fillStyle = "rgb(" + sh + "," + (sh - 10) + "," + (sh - 34) + ")";
x.fillRect(x0 + 2, y + 2, w - 4, h - 4);
x0 += w;
}
y += h;
}
poeNz(x, W, H, 3500, 0.1, 172);
poeNz(x, W, H, 2000, 0.1, 173, "255,244,214");
for (i = 0; i < 160; i++) {
x.strokeStyle = "rgba(60,50,36," + (0.1 + R() * 0.2) + ")";
x.lineWidth = 1;
var a = R() * W, b = R() * H;
x.beginPath();
x.moveTo(a, b);
x.lineTo(a + 10 + R() * 26, b + 6 + R() * 10);
x.stroke();
}
poeStain(x, W, H, 10, 174, "30,24,16", 0.35);
},
function (x, W, H) {
x.fillStyle = "#1E160E";
x.fillRect(0, 0, W, H);
var R = wRand(178), rows = 9, row, i;
function knob(cx, cy, r, sh) { var g = x.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r); g.addColorStop(0, "rgb(" + (sh + 30) + "," + (sh + 18) + "," + (sh - 14) + ")"); g.addColorStop(0.8, "rgb(" + (sh - 30) + "," + (sh - 44) + "," + (sh - 74) + ")"); g.addColorStop(1, "rgb(40,30,18)"); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); }
for (row = 0; row < rows; row++) {
var cy = (row + 0.5) * H / rows, sk = row === 2 || row === 6;
if (sk) {
for (i = 0; i < 7; i++) {
var cx = (i + 0.5) * W / 7, sh = 188 + R() * 34 | 0, r = W / 7 * 0.47;
knob(cx, cy - 2, r, sh);
x.fillStyle = "#120C06";
x.beginPath();
x.ellipse(cx - r * 0.38, cy - r * 0.05, r * 0.24, r * 0.28, 0, 0, 7);
x.ellipse(cx + r * 0.38, cy - r * 0.05, r * 0.24, r * 0.28, 0, 0, 7);
x.fill();
x.beginPath();
x.moveTo(cx, cy + r * 0.22);
x.lineTo(cx - r * 0.12, cy + r * 0.5);
x.lineTo(cx + r * 0.12, cy + r * 0.5);
x.fill();
x.fillStyle = "rgba(20,14,8,.8)";
for (var t = -2; t <= 2; t++)
x.fillRect(cx + t * r * 0.16 - 1, cy + r * 0.68, 1.5, r * 0.2);
}
}
else {
var n = 14, off = (row % 2) * W / n / 2;
for (i = -1; i <= n; i++) {
var cx2 = (i + 0.5) * W / n + off + (R() - 0.5) * 3, sh2 = 172 + R() * 50 | 0, r2 = W / n * (0.4 + R() * 0.12);
knob(cx2, cy + (R() - 0.5) * 3, r2, sh2);
if (R() < 0.5) {
x.fillStyle = "rgba(30,20,10,.55)";
x.beginPath();
x.arc(cx2, cy, r2 * 0.3, 0, 7);
x.fill();
}
}
}
}
poeNz(x, W, H, 3000, 0.2, 179);
},
function () {
var P = [], U = [], N = [];
return { quad: function (a, b, c, d, n, uw, uh) { P.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], a[0], a[1], a[2], c[0], c[1], c[2], d[0], d[1], d[2]); U.push(0, 0, uw, 0, uw, uh, 0, 0, uw, uh, 0, uh); for (var i = 0; i < 6; i++)
N.push(n[0], n[1], n[2]); },
mesh: function (mat, parent) { var g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(P), 3)); g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(U), 2)); g.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(N), 3)); var m = new THREE.Mesh(g, mat); m.frustumCulled = false; parent.add(m); return m; }, n: function () { return P.length / 18; } };
},
function (i) {
return function (x, W, H) {
x.fillStyle = "#8A8478";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#2A2420";
x.fillStyle = "#2A2420";
x.lineWidth = 5;
x.lineCap = "round";
function ln(a, b, c, d) { x.beginPath(); x.moveTo(W * a, H * b); x.lineTo(W * c, H * d); x.stroke(); }
function ci(a, b, r, f) { x.beginPath(); x.arc(W * a, H * b, W * r, 0, 7); f ? x.fill() : x.stroke(); }
function sn(a, b, c, d) { x.beginPath(); x.moveTo(W * a, H * b); x.bezierCurveTo(W * (a + 0.2), H * (b - 0.15), W * (c - 0.2), H * (d + 0.15), W * c, H * d); x.stroke(); ci(c, d, 0.025, true); }
if (i === 0) {
ci(0.5, 0.22, 0.08, false);
ln(0.5, 0.3, 0.5, 0.62);
ln(0.5, 0.62, 0.38, 0.9);
ln(0.5, 0.62, 0.62, 0.9);
ln(0.36, 0.42, 0.64, 0.42);
sn(0.15, 0.75, 0.42, 0.5);
sn(0.85, 0.8, 0.58, 0.55);
}
else if (i === 1) {
ln(0.5, 0.12, 0.5, 0.9);
ln(0.25, 0.32, 0.75, 0.32);
sn(0.3, 0.8, 0.62, 0.3);
}
else if (i === 2) {
for (var k = 0; k < 3; k++) {
ci(0.25 + k * 0.25, 0.55, 0.07, false);
ln(0.25 + k * 0.25, 0.55, 0.25 + k * 0.25, 0.4);
sn(0.2 + k * 0.25, 0.85, 0.33 + k * 0.2, 0.68);
}
}
else if (i === 3) {
ci(0.3, 0.25, 0.07, false);
ln(0.3, 0.32, 0.3, 0.7);
ln(0.3, 0.7, 0.2, 0.9);
ln(0.3, 0.7, 0.4, 0.9);
ln(0.22, 0.9, 0.14, 0.86);
ln(0.42, 0.5, 0.42, 0.2);
ci(0.72, 0.25, 0.07, false);
ln(0.72, 0.32, 0.7, 0.7);
ln(0.72, 0.14, 0.72, 0.08);
ln(0.66, 0.08, 0.78, 0.08);
ln(0.86, 0.2, 0.86, 0.9);
x.beginPath();
x.arc(W * 0.74, H * 0.2, W * 0.14, -0.6, 0.5);
x.stroke();
}
else if (i === 4) {
ln(0.1, 0.9, 0.5, 0.35);
ln(0.5, 0.35, 0.9, 0.9);
ln(0.5, 0.35, 0.5, 0.2);
ci(0.5, 0.15, 0.06, true);
ci(0.42, 0.2, 0.04, false);
ci(0.58, 0.2, 0.04, false);
sn(0.15, 0.6, 0.32, 0.5);
sn(0.85, 0.6, 0.68, 0.5);
}
else if (i === 5) {
ln(0.6, 0.9, 0.6, 0.25);
ci(0.6, 0.25, 0.16, false);
sn(0.3, 0.9, 0.5, 0.35);
ci(0.44, 0.4, 0.035, true);
ci(0.36, 0.55, 0.035, true);
ci(0.5, 0.3, 0.035, true);
ci(0.25, 0.88, 0.07, false);
}
else {
ci(0.25, 0.2, 0.07, false);
ln(0.25, 0.27, 0.25, 0.6);
ln(0.18, 0.13, 0.32, 0.13);
ln(0.25, 0.4, 0.45, 0.25);
ln(0.45, 0.25, 0.5, 0.1);
x.beginPath();
x.moveTo(W * 0.55, H * 0.9);
x.lineTo(W * 0.6, H * 0.6);
x.lineTo(W * 0.9, H * 0.6);
x.lineTo(W * 0.95, H * 0.9);
x.closePath();
x.stroke();
ci(0.68, 0.45, 0.06, true);
x.beginPath();
x.arc(W * 0.84, H * 0.45, W * 0.06, 1, 5);
x.stroke();
}
x.font = "bold " + Math.round(H * 0.1) + "px Georgia";
x.fillText(["I", "II", "III", "IV", "V", "VI", "VII"][i], W * 0.06, H * 0.12);
};
},
function (x, W, H) {
x.fillStyle = "#A2957A";
x.fillRect(0, 0, W, H);
var R = wRand(271), i;
poeNz(x, W, H, 9000, 0.16, 272);
poeNz(x, W, H, 4000, 0.14, 273, "240,226,190");
for (i = 0; i < 60; i++) {
x.strokeStyle = "rgba(50,40,26," + (0.12 + R() * 0.25) + ")";
x.lineWidth = 1 + R() * 1.5;
var a = R() * W, b = R() * H;
x.beginPath();
x.moveTo(a, b);
x.lineTo(a + (R() - 0.5) * W * 0.3, b + R() * H * 0.25);
x.lineTo(a + (R() - 0.5) * W * 0.4, b + R() * H * 0.5);
x.stroke();
}
for (i = 0; i < 240; i++) {
x.strokeStyle = "rgba(230,216,180," + (0.05 + R() * 0.12) + ")";
x.lineWidth = 1;
var c = R() * W, d = R() * H;
x.beginPath();
x.moveTo(c, d);
x.lineTo(c + 8 + R() * 14, d + 10 + R() * 16);
x.stroke();
}
poeStain(x, W, H, 12, 274, "30,24,16", 0.4);
},
function (tx, tz) {
var G = POE_GRS, k = tx + "_" + tz;
if (!G.has[k] || G.data[k] || G.loading[k])
return;
G.loading[k] = 1;
var im = new Image();
im.onload = function () { try {
var c = document.createElement("canvas");
c.width = c.height = G.T;
var x = c.getContext("2d", { willReadFrequently: true });
x.drawImage(im, 0, 0);
var d = x.getImageData(0, 0, G.T, G.T).data, n = G.T * G.T, a = new Uint8Array(n);
for (var i = 0; i < n; i++)
a[i] = Math.round(d[i * 4] / 30);
G.data[k] = a;
G.stamp++;
c.width = c.height = 1;
}
catch (e) {
if (window.console)
console.warn("[poe] quarry sheet " + k, e);
} G.loading[k] = 0; };
im.onerror = function () { G.loading[k] = 0; G.err = (G.err || 0) + 1; };
im.src = "assets/poe/grs/t_" + k + ".png";
},
function (sx, sz) { var best = null; [[0, -1, 0], [1, 0, -Math.PI / 2], [0, 1, Math.PI], [-1, 0, Math.PI / 2]].forEach(function (d) { for (var k = 1; k <= 8; k++) {
var t = poeGrsT(Math.floor(sx) + d[0] * k, Math.floor(sz) + d[1] * k);
if (t === -1)
return;
if (!(t === 1 || t === 2 || t === 7)) {
if (!best || k < best.k)
best = { k: k, x: Math.floor(sx) + 0.5 + d[0] * (k - 0.54), z: Math.floor(sz) + 0.5 + d[1] * (k - 0.54), ry: d[2] };
return;
}
} }); return best; },
function () {
var P = [], U = [], N = [];
return { q: function (a, b, c, d, n, u0, v0, u1, v1) { P.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], a[0], a[1], a[2], c[0], c[1], c[2], d[0], d[1], d[2]); U.push(u0, v0, u1, v0, u1, v1, u0, v0, u1, v1, u0, v1); for (var i = 0; i < 6; i++)
N.push(n[0], n[1], n[2]); },
mesh: function (mat, parent) { if (!P.length)
return null; var g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(P), 3)); g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(U), 2)); g.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(N), 3)); g.computeBoundingSphere(); var m = new THREE.Mesh(g, mat); parent.add(m); return m; } };
},
function (cx, cz) {
var G = POE_GRS, R = POE_RX.x_cat, C = G.CH, x0 = cx * C, z0 = cz * C, x, z, i;
var need = [[x0 - 1, z0 - 1], [x0 + C, z0 - 1], [x0 - 1, z0 + C], [x0 + C, z0 + C]], wait = false;
for (i = 0; i < 4; i++)
if (poeGrsT(need[i][0], need[i][1]) === -1)
wait = true;
if (wait)
return null;
var B = { m: poeGrsBatch(), r: poeGrsBatch(), h: poeGrsBatch(), o: poeGrsBatch(), f: poeGrsBatch(), c: poeGrsBatch() }, any = false, K = { cx: cx, cz: cz, g: null, boxes: [], falls: [], marks: [], pools: [] }, S = poeCS();
var D = [[0, -1], [0, 1], [1, 0], [-1, 0]];
for (z = z0; z < z0 + C; z++) {
var run = null, rh = 0;
for (x = x0; x <= x0 + C; x++) {
var t = x < x0 + C ? poeGrsT(x, z) : 0, op = t === 1 || t === 2 || t === 7, h = op ? poeGrsH(t) : 0;
if (run !== null && (!op || h !== rh)) {
var a = run - G.CX, b = x - G.CX, lz = z - G.CZ;
B.f.q([a, 0, lz + 1], [b, 0, lz + 1], [b, 0, lz], [a, 0, lz], [0, 1, 0], a / 2, (lz + 1) / 2, b / 2, lz / 2);
B.c.q([a, rh, lz], [b, rh, lz], [b, rh, lz + 1], [a, rh, lz + 1], [0, -1, 0], a / 2, lz / 2, b / 2, (lz + 1) / 2);
run = null;
}
if (!op)
continue;
any = true;
if (run === null) {
run = x;
rh = h;
}
var lx = x - G.CX, lzz = z - G.CZ, X0 = lx, X1 = lx + 1, Z0 = lzz, Z1 = lzz + 1;
for (i = 0; i < 4; i++) {
var d = D[i], nt = poeGrsT(x + d[0], z + d[1]), nop = nt === 1 || nt === 2 || nt === 7, y0 = 0, bt;
if (nop) {
var oh = poeGrsH(nt);
if (oh >= h - 0.05)
continue;
y0 = oh;
bt = B.m;
}
else
bt = nt === 6 ? B.o : nt === 3 ? B.r : nt === 4 ? B.h : (t === 1 ? B.r : B.m);
var pa = i === 0 ? [X0, Z0] : i === 1 ? [X1, Z1] : i === 2 ? [X1, Z0] : [X0, Z1], pb = i === 0 ? [X1, Z0] : i === 1 ? [X0, Z1] : i === 2 ? [X1, Z1] : [X0, Z0], u0 = (d[0] ? pa[1] : pa[0]) / 2, u1 = (d[0] ? pb[1] : pb[0]) / 2, sc = bt === B.h ? 2 : 1;
bt.q([pa[0], y0, pa[1]], [pb[0], y0, pb[1]], [pb[0], h, pb[1]], [pa[0], h, pa[1]], [-d[0], 0, -d[1]], u0 * sc, y0 / 2 * sc, u1 * sc, h / 2 * sc);
}
var hs = poeGrsHash(x, z);
if (t === 1 && hs % 47 === 0 && !G.fixed[x + "," + z]) {
var all = true;
for (var ax = -1; ax <= 1 && all; ax++)
for (var az = -1; az <= 1; az++)
if (poeGrsT(x + ax, z + az) !== 1) {
all = false;
break;
}
if (all) {
var p0 = lx + 0.14, p1 = lx + 0.86, q0 = lzz + 0.14, q1 = lzz + 0.86;
G.blk[x + "," + z] = 1;
B.m.q([p0, 0, q1], [p1, 0, q1], [p1, h, q1], [p0, h, q1], [0, 0, 1], 0, 0, 0.36, h / 2);
B.m.q([p1, 0, q0], [p0, 0, q0], [p0, h, q0], [p1, h, q0], [0, 0, -1], 0, 0, 0.36, h / 2);
B.m.q([p1, 0, q1], [p1, 0, q0], [p1, h, q0], [p1, h, q1], [1, 0, 0], 0, 0, 0.36, h / 2);
B.m.q([p0, 0, q0], [p0, 0, q1], [p0, h, q1], [p0, h, q0], [-1, 0, 0], 0, 0, 0.36, h / 2);
}
}
else if (hs % 640 === 1 && !G.fixed[x + "," + z])
K.boxes.push({ x: x, z: z, k: x + "," + z });
else if (t === 1 && hs % 900 === 2)
K.falls.push({ x: x + 0.5, z: z + 0.5, t: -1, cool: 0 });
if (t === 2 && hs % 61 === 5) {
for (i = 0; i < 4; i++) {
var nm = poeGrsT(x + D[i][0], z + D[i][1]);
if (nm === 5 || nm === 3 || nm === 4 || nm === 0) {
K.marks.push({ x: lx + 0.5 + D[i][0] * 0.47, z: lzz + 0.5 + D[i][1] * 0.47, ry: [0, Math.PI, -Math.PI / 2, Math.PI / 2][i], k: hs % 8 });
break;
}
}
}
else if (hs % 211 === 7)
K.pools.push({ x: lx + 0.5, z: lzz + 0.5, s: 0.5 + (hs % 5) * 0.12 });
}
}
if (!any) {
K.empty = 1;
return K;
}
var g = new THREE.Group();
R.g.add(g);
K.g = g;
B.m.mesh(poeCatMat("catstone", 0xFFFFFF), g);
B.r.mesh(poeCatMat("catrock", 0xFFFFFF), g);
B.h.mesh(poeCatMat("catstone", 0xB0A690), g);
B.o.mesh(poeCatMat("catbones", 0xFFFFFF), g);
B.f.mesh(poeCatMat("catfloor", 0xFFFFFF), g);
B.c.mesh(poeCatMat("catrock", 0x8E8472), g);
if (!G.boxGeo) {
G.boxGeo = new THREE.BoxGeometry(0.5, 0.3, 0.34);
G.boxMat = poeC(0x4A3A24);
G.endGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.22, 6);
G.endMat = poeC(0xE8E0C8);
G.rubGeo = new THREE.DodecahedronGeometry(0.3, 0);
G.rubMat = poeCatMat("catrock", 0xB8AE98);
}
K.boxes.forEach(function (b) { var bg = new THREE.Group(); bg.position.set(b.x + 0.5 - G.CX, 0, b.z + 0.5 - G.CZ); var m = new THREE.Mesh(G.boxGeo, G.boxMat); m.position.y = 0.15; bg.add(m); for (var j = 0; j < 3; j++) {
var e = new THREE.Mesh(G.endGeo, G.endMat);
e.position.set(-0.12 + j * 0.12, 0.38, 0);
bg.add(e);
} bg.visible = !S.caches[b.k]; g.add(bg); b.g = bg; });
if (!G.marks) {
G.marks = [["12 · G · 1781"], ["47 · G · 1783"], ["3 · G · 1779"], ["21 · H T · 1811"], ["8 · H T · 1813"], ["R. D’ENFER", "COTÉ DU LEVANT"], ["FAIT EN 1785"], ["AQUEDUC", "D’ARCUEIL"]].map(function (l) { return wSign(l, l.length > 1 ? 0.9 : 0.8, l.length > 1 ? 0.34 : 0.2, "#C8BEA4", "#3A2A20"); });
G.poolGeo = new THREE.CircleGeometry(1, 12);
G.poolGeo.rotateX(-Math.PI / 2);
G.poolMat = new THREE.MeshLambertMaterial({ color: 0x101818, transparent: true, opacity: 0.55 });
}
K.marks.forEach(function (q) { var s0 = G.marks[q.k], m = new THREE.Mesh(s0.geometry, s0.material); m.position.set(q.x, 1.45, q.z); m.rotation.y = q.ry; m.userData.keep = 1; g.add(m); });
if (!POE.lite)
K.pools.forEach(function (q) { var m = new THREE.Mesh(G.poolGeo, G.poolMat); m.position.set(q.x, 0.02, q.z); m.scale.setScalar(q.s); m.userData.keep = 1; g.add(m); });
K.falls.forEach(function (f) { for (var j = 0; j < 5; j++) {
var m = new THREE.Mesh(G.rubGeo, G.rubMat);
m.position.set(f.x - G.CX + Math.cos(j * 1.3) * 0.8, 0.1, f.z - G.CZ + Math.sin(j * 1.3) * 0.8);
m.rotation.set(j, j * 2, j * 3);
m.scale.setScalar(0.6 + (j % 3) * 0.3);
g.add(m);
} });
return K;
},
function (max) {
var G = POE_GRS, P = poeGrsHere(), C = G.CH, pcx = Math.floor(P.x / C), pcz = Math.floor(P.z / C), rad = POE.lite ? 1 : 2, made = 0, k, dx, dz;
for (var ring = 0; ring <= rad; ring++)
for (dz = -ring; dz <= ring; dz++)
for (dx = -ring; dx <= ring; dx++) {
if (Math.max(Math.abs(dx), Math.abs(dz)) !== ring)
continue;
k = (pcx + dx) + "," + (pcz + dz);
if (G.chunks[k] || made >= max)
continue;
var K = poeGrsChunk(pcx + dx, pcz + dz);
if (K) {
G.chunks[k] = K;
if (!K.empty)
made++;
}
}
for (k in G.chunks) {
var Q = G.chunks[k];
if (Math.abs(Q.cx - pcx) > rad + 1 || Math.abs(Q.cz - pcz) > rad + 1) {
poeGrsDrop(Q);
delete G.chunks[k];
}
}
var tx = Math.floor((P.x - G.X0) / G.T), tz = Math.floor((P.z - G.Z0) / G.T);
for (k in G.data) {
var q = k.split("_");
if (Math.abs(q[0] - tx) > 1 || Math.abs(q[1] - tz) > 1)
delete G.data[k];
}
return { cx: pcx, cz: pcz };
},
function (R, g) {
var G = POE_GRS, D = POE_GRS_D, lite = POE.lite, mo = poeCatMat("catbones", 0xFFFFFF);
poeFloor(R.x, 0, R.w, R.d, 0, true);
R.block = function (wx, wz) { var sx = wx - R.x + G.CX, sz = wz + G.CZ, r = 0.25; for (var a = -1; a <= 1; a += 2)
for (var b = -1; b <= 1; b += 2)
if (!poeGrsOpen(sx + a * r, sz + b * r))
return true; return !!G.blk[Math.floor(sx) + "," + Math.floor(sz)]; };
R.perm = [];
function perm(p, name, verb, hook, arg, make, r) {
var L = poeGrsL(p[0] + 0.5, p[1] + 0.5), o = { sx: p[0] + 0.5, sz: p[1] + 0.5, L: L, g: null, make: make };
R.perm.push(o);
if (name)
poeSpot(R.x + L.x, L.z, r || 2.1, name, verb, function () { poeCatHook(hook, arg); }, 0);
return o;
}
function sign(P, lines, x, y, z, ry, w, h) { var s = wSign(lines, w || 1.6, h || 0.6, "#1A1814", "#D8D0B8"); s.position.set(x, y, z); s.rotation.y = ry || 0; P.add(s); return s; }
function plaque(P, o, lines, w, h, y) { var W = poeGrsWall(o.sx, o.sz); if (!W)
return; sign(P, lines, W.x - o.sx, y || 1.6, W.z - o.sz, W.ry, w, h); }
function glow(P, col, y, s) { var q = wGlow(col, s || 1.8, 0.25); q.position.y = y || 1.4; P.add(q); return q; }
function stair(P) { poeCyl(P, 0.22, 0.22, 2.6, poeS("stone", 0x9A948A), 0, 1.3, 0, 10); for (var s = 0; s < 9; s++) {
var st = poeBox(P, 0.85, 0.14, 0.34, poeS("stone", 0x8A847A), Math.cos(s * 0.6) * 0.52, 0.1 + s * 0.27, Math.sin(s * 0.6) * 0.52);
st.rotation.y = -s * 0.6;
} }
D.stairs.forEach(function (s, i) { var nm = s[2] + (s[3] > 1 ? " (" + s[3] + ")" : ""); perm(s, i ? "The stair of " + nm : "The winding stair of ninety steps", "climb, or read the plan of the quarries", "stair", i, function (P, o) { stair(P); G.blk[s[0] + "," + s[1]] = 1; plaque(P, o, ["ESCALIER", s[2].toUpperCase()], 1.5, 0.5, 1.9); glow(P, 0xFFD8A0, 2.0, 1.2); }); });
var T = D.st;
perm(T.P, "The carvings of Port-Mahon", "look at them", "P", null, function (P, o) { var ls = poeS("stone", 0xD8D0BC); poeBox(P, 1.3, 0.5, 0.7, ls, 0, 0.25, 0); poeBox(P, 0.9, 0.5, 0.5, ls, -0.1, 0.75, 0); poeBox(P, 0.4, 0.9, 0.4, ls, 0.35, 1.1, 0); for (var t = 0; t < 3; t++)
poeCyl(P, 0.09, 0.11, 0.6 + t * 0.15, ls, -0.45 + t * 0.3, 1.2, 0.05, 8); for (var w = 0; w < 6; w++)
poeBox(P, 0.06, 0.1, 0.03, poeC(0x2A2420), -0.4 + w * 0.16, 0.7 + (w % 2) * 0.2, 0.26); G.blk[T.P[0] + "," + T.P[1]] = 1; plaque(P, o, ["QUARTIER DE CAZERNE", "PORT-MAHON · DÉCURE, 1777–1782"], 2.2, 0.5, 1.9); glow(P, 0xFFD8A0, 1.8); });
perm(T.B, "The quarrymen’s foot-bath", "look into the water", "B", null, function (P, o) { var wt = new THREE.Mesh(new THREE.CircleGeometry(0.85, 18), new THREE.MeshLambertMaterial({ color: 0x2A4A4A, transparent: true, opacity: 0.6 })); wt.rotation.x = -Math.PI / 2; wt.position.y = 0.03; P.add(wt); var rim = new THREE.Mesh(new THREE.RingGeometry(0.85, 1.0, 18), poeS("stone", 0x9A948A)); rim.rotation.x = -Math.PI / 2; rim.position.y = 0.04; P.add(rim); plaque(P, o, ["BAIN DE PIEDS", "DES CARRIERS"], 1.5, 0.5, 1.7); });
perm(T.A, "The door of the ossuary", "read the lintel", "A", null, function (P, o) {
var ax = 0, l = 0, r = 0, k;
for (k = 1; k < 6 && poeGrsOpen(o.sx - k, o.sz); k++)
l = k;
for (k = 1; k < 6 && poeGrsOpen(o.sx + k, o.sz); k++)
r = k;
var u = 0, d = 0;
for (k = 1; k < 6 && poeGrsOpen(o.sx, o.sz - k); k++)
u = k;
for (k = 1; k < 6 && poeGrsOpen(o.sx, o.sz + k); k++)
d = k;
var acr = (l + r) <= (u + d), a0 = acr ? l : u, a1 = acr ? r : d, hw = Math.min(1.6, Math.max(0.9, Math.min(a0, a1) + 0.3));
[-hw, hw].forEach(function (q) { var pl = poeGrp(P, acr ? q : 0, 0, acr ? 0 : q); poeBox(pl, 0.4, 2.2, 0.4, poeC(0x0E0E0E), 0, 1.1, 0); for (var e = 0; e < 3; e++) {
var lz = poeBox(pl, 0.22, 0.22, 0.02, poeC(0xE8E4D8), acr ? 0 : 0.21, 0.5 + e * 0.6, acr ? 0.21 : 0);
lz.rotation[acr ? "z" : "x"] = Math.PI / 4;
if (!acr)
lz.rotation.y = Math.PI / 2;
} });
var ar = wSign(["ARRÊTE!", "C’EST ICI L’EMPIRE DE LA MORT"], hw * 2, 0.5, "#0E0E0E", "#E8E4D8");
ar.position.set(0, 1.95, 0);
ar.rotation.y = acr ? 0 : Math.PI / 2;
ar.material = new THREE.MeshBasicMaterial({ map: ar.material.map, color: 0xB0A898, side: THREE.DoubleSide });
P.add(ar);
glow(P, 0xFFD0A0, 1.5, 2.2);
});
perm(T.I, "The bones of the Innocents", "read the tablet", "I", null, function (P, o) { plaque(P, o, ["OSSEMENTS DU CIMETIÈRE", "DES INNOCENTS", "DÉPOSÉS EN AVRIL 1786"], 1.7, 0.8, 1.5); glow(P, 0xE8D8B0, 1.5, 1.2); });
perm(T.S, "The fountain of the Samaritan woman", "read what is cut there", "S", null, function (P, o) { poeCyl(P, 0.42, 0.46, 0.7, mo, 0, 0.35, 0, 14); var w3 = new THREE.Mesh(new THREE.CircleGeometry(0.34, 14), new THREE.MeshLambertMaterial({ color: 0x1A3030 })); w3.rotation.x = -Math.PI / 2; w3.position.y = 0.71; P.add(w3); for (var k = 0; k < (lite ? 4 : 6); k++)
poeSkull(P, Math.cos(k * 1.047) * 0.42, 0.72, Math.sin(k * 1.047) * 0.42, -k * 1.047 + Math.PI / 2, 0.8); G.blk[T.S[0] + "," + T.S[1]] = 1; plaque(P, o, ["FONTAINE DE LA SAMARITAINE", "1810"], 1.9, 0.5, 1.8); glow(P, 0xC8E0E0, 1.6); });
perm(T.G, "The tomb of Gilbert", "read the verse", "G", null, function (P, o) { poeBox(P, 0.95, 0.4, 0.6, poeS("stone", 0xB8B0A0), 0, 0.2, 0); poeBox(P, 0.8, 0.5, 0.5, poeS("stone", 0xC8C0B0), 0, 0.65, 0); poeBox(P, 0.9, 0.1, 0.58, poeS("stone", 0xA8A090), 0, 0.95, 0); G.blk[T.G[0] + "," + T.G[1]] = 1; plaque(P, o, ["AU BANQUET DE LA VIE,", "INFORTUNÉ CONVIVE,", "J’APPARUS UN JOUR,", "ET JE MEURS."], 1.7, 0.9, 1.5); glow(P, 0xFFD0A0, 1.5); });
perm(T.C, "The altar of the Sacellum", "stand before it", "C", null, function (P, o) { poeBox(P, 0.95, 0.9, 0.6, poeS("stone", 0xC8C0B0), 0, 0.45, 0); poeBox(P, 1.0, 0.1, 0.7, poeS("stone", 0xB8B0A0), 0, 0.95, 0); poeBox(P, 0.07, 0.6, 0.07, poeC(0x1A1410), 0, 1.3, 0); poeBox(P, 0.36, 0.07, 0.07, poeC(0x1A1410), 0, 1.42, 0); poeCandle(P, -0.36, 1.0, 0, 0.24, true); poeCandle(P, 0.36, 1.0, 0, 0.24, true); G.blk[T.C[0] + "," + T.C[1]] = 1; plaque(P, o, ["CRYPTE DU SACELLUM"], 1.8, 0.36, 1.9); glow(P, 0xFFC890, 1.5, 2); });
perm(T.L, "The sepulchral lamp", "light your candle at it", "L", null, function (P, o) { poeCyl(P, 0.2, 0.28, 0.9, poeS("stone", 0xA8A090), 0, 0.45, 0, 10); poeCyl(P, 0.36, 0.18, 0.3, poeS("stone", 0xB8B0A0), 0, 1.05, 0, 12); poeFlame(P, 0, 1.32, 0, 1.5, 0xFFB050); G.blk[T.L[0] + "," + T.L[1]] = 1; plaque(P, o, ["LAMPE SÉPULCRALE"], 1.6, 0.36, 1.9); glow(P, 0xFFB060, 1.5, 2.6); });
perm(T.T, "The rotunda of the tibias", "walk round it", "T", null, function (P, o) { poeCyl(P, 0.48, 0.4, 2.7, mo, 0, 1.35, 0, lite ? 10 : 16); poeCyl(P, 0.56, 0.56, 0.4, mo, 0, 1.35, 0, lite ? 10 : 16); [0.8, 2.0].forEach(function (yy) { for (var k = 0; k < (lite ? 5 : 8); k++) {
var an = k / (lite ? 5 : 8) * 6.283;
poeSkull(P, Math.cos(an) * 0.5, yy, Math.sin(an) * 0.5, -an + Math.PI / 2, 0.9);
} }); G.blk[T.T[0] + "," + T.T[1]] = 1; plaque(P, o, ["CRYPTE DE LA PASSION"], 1.8, 0.36, 1.9); glow(P, 0xFFD0A0, 1.6); });
perm(T.X, "The stair up to the Rue de la Tombe-Issoire", "climb out into the night", "out", null, function (P, o) { stair(P); G.blk[T.X[0] + "," + T.X[1]] = 1; plaque(P, o, ["SORTIE", "RUE DE LA TOMBE-ISSOIRE"], 1.6, 0.5, 1.9); glow(P, 0xFFD8A0, 2.0, 1.2); });
[[-338, 812, ["OÙ EST-ELLE, LA MORT?", "TOUJOURS FUTURE OU PASSÉE.", "À PEINE EST-ELLE PRÉSENTE,", "QUE DÉJÀ ELLE N’EST PLUS."]], [-312, 842, ["PENSEZ LE MATIN QUE VOUS", "N’IREZ PEUT-ÊTRE PAS JUSQU’AU SOIR,", "ET AU SOIR QUE VOUS N’IREZ", "PEUT-ÊTRE PAS JUSQU’AU MATIN."]], [-296, 812, ["HEUREUX CELUI QUI A TOUJOURS", "DEVANT LES YEUX L’HEURE DE SA MORT", "ET QUI SE DISPOSE TOUS LES JOURS", "À MOURIR."]], [-280, 846, ["QUOCUMQUE INGREDERIS,", "SEQUITUR MORS", "CORPORIS UMBRA."]], [-304, 872, ["MEMORIAE MAJORUM", "OSSA ARIDA,", "AUDITE VERBUM DOMINI."]]].forEach(function (q) { perm([q[0], q[1]], null, null, null, null, function (P, o) { for (var r = 0; r < 12; r++) {
var a = r * 2.4, sx = o.sx + Math.round(Math.cos(a) * r * 0.7), sz = o.sz + Math.round(Math.sin(a) * r * 0.7);
if (poeGrsOpen(sx, sz)) {
var W = poeGrsWall(sx, sz);
if (W) {
sign(P, q[2], W.x - o.sx, 1.5, W.z - o.sz, W.ry, 1.7, 0.9);
return;
}
}
} }); });
POE_GRS_NAMES.forEach(function (n) { perm([n[1], n[2]], null, null, null, null, function (P, o) { for (var r = 0; r < 60; r++) {
var a = r * 2.4, sx = o.sx + Math.round(Math.cos(a) * r), sz = o.sz + Math.round(Math.sin(a) * r);
if (poeGrsOpen(sx, sz)) {
var W = poeGrsWall(sx, sz);
if (W) {
sign(P, [n[0].replace(/^the /, "").toUpperCase()], W.x - o.sx, 1.7, W.z - o.sz, W.ry, Math.min(2.6, 0.5 + n[0].length * 0.075), 0.34);
return;
}
}
} }); });
R.figs = [];
D.fig.forEach(function (c, i) { perm(c, "A carved stone from the arch of Nicolas Flamel", "look at the figure", "fig", i, function (P) { var pic = poePic(P, 0.7, 0.86, poeCatFigPic(i), 0, 0.85, 0, 0, "catfig" + i); pic.rotation.x = -0.5; pic.material.side = THREE.DoubleSide; poeBox(P, 0.8, 0.45, 0.4, poeS("stone", 0x8A847A), 0, 0.22, -0.16); glow(P, 0xE8C870, 1.2, 1.6); G.blk[c[0] + "," + c[1]] = 1; }, 1.9); });
perm(D.H, "The tomb of Philibert Aspairt", "read the stone", "H", null, function (P, o) { poeBox(P, 0.9, 1.4, 0.2, poeS("stone", 0xB8B0A0), 0, 0.7, 0); var hsn = wSign(["À LA MÉMOIRE DE", "PHILIBERT ASPAIRT", "PERDU DANS CETTE CARRIÈRE", "LE III NOVEMBRE MDCCXCIII", "RETROUVÉ ONZE ANS APRÈS", "ET INHUMÉ EN LA MÊME PLACE", "LE XXX AVRIL MDCCCIV"], 0.84, 1.1, "#B8B0A0", "#1A1814"); hsn.position.set(0, 0.76, 0.11); P.add(hsn); var h2 = hsn.clone(); h2.position.z = -0.11; h2.rotation.y = Math.PI; P.add(h2); G.blk[D.H[0] + "," + D.H[1]] = 1; glow(P, 0xC8D0E0, 1.5, 1.4); });
perm(D.K, "The cellar of the Chartreux", "look at what he was looking for", "K", null, function (P) { poeCask(P, 0, 0, 0, 0.7, false); for (var kb = 0; kb < 5; kb++)
poeBottle(P, -0.5 + kb * 0.25, 0, 0.55, 0x2A6A2A); G.blk[D.K[0] + "," + D.K[1]] = 1; glow(P, 0xC8E0B0, 1.2, 1.2); });
R.fdoor = perm(D.F, "A door of stone, cut with the letters N and F", "lay your hand on it", "F", null, function (P) { poeBox(P, 0.9, 2.0, 0.2, poeS("stone", 0x6A645C), 0, 1.0, 0); var nf = wSign(["N · F"], 0.6, 0.3, "#6A645C", "#E8C870"); nf.position.set(0, 1.5, 0.11); P.add(nf); var nf2 = nf.clone(); nf2.position.z = -0.11; nf2.rotation.y = Math.PI; P.add(nf2); glow(P, 0xE8C870, 1.2, 2.4); G.blk[D.F[0] + "," + D.F[1]] = 1; }, 2.2);
R.dyn = poeSpot(1e9, 0, 1.6, "A box of candle-ends", "take them", function () { if (R.dynBox)
poeCatHook("cache", R.dynBox); }, 0);
var drop = poeGrp(g, 0, 7, 0);
for (var d = 0; d < 5; d++)
poeRock(drop, Math.cos(d * 1.3) * 0.5, 0, Math.sin(d * 1.3) * 0.5, 0.25 + (d % 2) * 0.2, d + 9);
drop.visible = false;
R.drop = drop;
R.light = poeLight(0xFFD2A0, 1.35, 13, R.x, 1.6, 0, POE.G, true);
var gh = poeGrp(g, 0, 0, 0);
var gm = new THREE.MeshBasicMaterial({ color: 0x9AB0C8, transparent: true, opacity: 0.22, depthWrite: false });
var gb = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.7, 10), gm);
gb.position.y = 0.85;
gh.add(gb);
var ghd = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), gm);
ghd.position.y = 1.78;
gh.add(ghd);
var ggl = wGlow(0x8AA8D0, 1.8, 0.25);
ggl.position.y = 1.2;
gh.add(ggl);
gh.visible = false;
R.ghost = { g: gh, t: 20 };
R.fog = 0.075;
R.tick = poeCatTick;
R.banner = poeCatBanner;
var E = D.stairs[0];
R.start = { x: E[0] + 1.8 - G.CX, z: E[1] + 0.5 - G.CZ, ry: -Math.PI / 2 };
R.onEnter = function (from) {
var S = poeCS();
POE.dim = true;
if (S.candle < 25)
S.candle = 60;
R.outT = 0;
R.pT = 0;
R.wasIn = null;
if (from === "x_flamel")
poeGrsStand(D.F);
else if (from === "plan" && D.stairs[S.stair])
poeGrsStand(D.stairs[S.stair]);
else {
S.stair = 0;
poeGrsStand(E);
}
poeGrsAround(99);
poeSfx("windoff");
poeSfx("rainoff");
if (!S.seen.E) {
S.seen.E = 1;
poeCatHook("E");
}
};
R.onLeave = function () { POE.dim = false; POE.black = false; R.ghost.g.visible = false; for (var k in G.chunks) {
poeGrsDrop(G.chunks[k]);
} G.chunks = {}; G.data = {}; };
var t0 = Math.floor((E[0] - G.X0) / G.T), t1 = Math.floor((E[1] - G.Z0) / G.T);
poeGrsLoad(t0, t1);
},
function (p) {
var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]], best = dirs[0], R = POE_RX.x_cat;
R.standP = null;
for (var i = 0; i < dirs.length; i++) {
var d = dirs[i], t = poeGrsT(p[0] + d[0], p[1] + d[1]), t2 = poeGrsT(p[0] + d[0] * 2, p[1] + d[1] * 2);
if (t === -1) {
R.standP = p;
break;
}
if ((t === 1 || t === 2 || t === 7) && (t2 === 1 || t2 === 2 || t2 === 7)) {
best = d;
break;
}
}
poeGrsPut(p[0] + 0.5 + best[0] * 1.25, p[1] + 0.5 + best[1] * 1.25, Math.atan2(best[0], best[1]));
},
function (why) {
var S = poeCS(), s = POE_GRS_D.stairs[S.stair || 0] || POE_GRS_D.stairs[0];
S.lost = (S.lost || 0) + 1;
S.candle = 45;
poeSave();
poeVeil(poeSec(1.6), function () { POE.black = false; poeGrsStand(s); poeGrsAround(99); }, poeSec(1.2));
poeCard("Lost", (why || "<p>Your candle is out. You feel along the wall. You call. The quarries swallow it.</p>") + "<p style='font-style:italic'>Philibert Aspairt went down by a stair like yours in 1793 with one candle. They found him eleven years after, a few yards from a way out, and knew him by his keys.</p>" + poeNote("Someone’s lantern finds you, hours on. You are set down again at the foot of the last stair you passed, with a fresh candle-end."));
},
function (dt) {
var R = POE_RX.x_cat, G = POE_GRS, D = POE_GRS_D, S = poeCS(), P = poeGrsHere(), L = worldLocal(), oss = poeGrsInOss(P);
if (POE.moving)
return;
if (R.standP && poeGrsT(R.standP[0], R.standP[1]) !== -1)
poeGrsStand(R.standP);
var at = poeGrsAround(1);
R.pT -= dt;
if (R.pT <= 0) {
R.pT = 0.5;
R.perm.forEach(function (o) { var d = Math.abs(o.sx - P.x) + Math.abs(o.sz - P.z); if (d < 110 && !o.g && poeGrsT(o.sx, o.sz) !== -1 && poeGrsT(o.sx + 8, o.sz + 8) !== -1 && poeGrsT(o.sx - 8, o.sz - 8) !== -1) {
o.g = poeGrp(R.g, o.L.x, 0, o.L.z);
try {
o.make(o.g, o);
}
catch (e) {
if (window.console)
console.warn("[poe] quarry thing", e);
}
} if (o.g)
o.g.visible = d < 110; });
D.stairs.forEach(function (s, i) { if (Math.abs(s[0] - P.x) < 4 && Math.abs(s[1] - P.z) < 4 && S.stair !== i) {
S.stair = i;
} });
var nb = null, nd = 2.2;
for (var k in G.chunks) {
var K = G.chunks[k];
if (Math.abs(K.cx - at.cx) > 1 || Math.abs(K.cz - at.cz) > 1 || !K.boxes)
continue;
K.boxes.forEach(function (b) { if (S.caches[b.k])
return; var d = Math.hypot(b.x + 0.5 - P.x, b.z + 0.5 - P.z); if (d < nd) {
nd = d;
nb = b;
} });
}
if (nb) {
R.dyn.x = R.x + nb.x + 0.5 - G.CX;
R.dyn.z = nb.z + 0.5 - G.CZ;
R.dynBox = nb.k;
R.dynG = nb.g;
}
else {
R.dyn.x = 1e9;
R.dynBox = null;
}
}
var rate = oss ? 100 / 780 : 100 / 420;
if (window.POE_FAST)
rate = 0;
S.candle = Math.max(0, S.candle - dt * rate);
if (R.light) {
R.light.L.position.set(L.x, 1.5, L.z);
R.light.k = S.candle <= 0 ? 0 : (0.35 + 0.95 * Math.min(1, S.candle / 35));
R.light.L.distance = 13;
}
if (S.candle <= 0) {
POE.black = true;
R.outT = (R.outT || 0) + dt;
if (R.outT > 1 && !R.warned) {
R.warned = 1;
poeSay("🕯 Your candle is out. The dark is whole. Find light, or be lost.");
poeSfx("heart", { k: 0.5, bpm: 96 });
}
if (R.outT > 22) {
R.outT = 0;
R.warned = 0;
poeSfx("heartoff");
poeCatLost();
return;
}
}
else {
if (POE.black) {
POE.black = false;
poeSfx("heartoff");
}
R.outT = 0;
R.warned = 0;
if (S.candle < 15 && !R.low) {
R.low = 1;
poeSay("🕯 Your candle is guttering.");
}
if (S.candle > 20)
R.low = 0;
}
if (R.wasIn !== null && R.wasIn !== oss) {
if (oss)
poeSay("Bones on either hand, stacked to the roof. The ossuary.");
else
poeSay("You leave the bones behind. The old quarries. " + (S.figs.length ? "" : "They say the stones of Flamel’s arch lie out here, one to a quarter."));
}
R.wasIn = oss;
for (var ck in G.chunks) {
var Kc = G.chunks[ck];
if (!Kc.falls || Math.abs(Kc.cx - at.cx) > 1 || Math.abs(Kc.cz - at.cz) > 1)
continue;
Kc.falls.forEach(function (F) {
F.cool = Math.max(0, F.cool - dt);
var d = Math.hypot(P.x - F.x, P.z - F.z);
if (F.t < 0 && F.cool <= 0 && d < 2.2 && !R.fall) {
F.t = 0;
R.fall = F;
poeSfx("stone");
poeSay("Grit sifts down on you. The roof is working. <b>Move!</b>");
}
if (F.t >= 0) {
F.t += dt;
if (F.t > 2.6 && !F.fell) {
F.fell = 1;
R.drop.visible = true;
R.drop.position.set(F.x - G.CX, 2.6, F.z - G.CZ);
poeSfx("crash");
}
if (F.fell) {
R.drop.position.y = Math.max(0.2, R.drop.position.y - dt * 9);
if (R.drop.position.y <= 0.21 && !F.hit) {
F.hit = 1;
if (d < 1.9 && !window.POE_FAST) {
S.candle = Math.max(0, S.candle - 45);
poeSfx("shriek", { k: 0.4 });
poeSay("The roof comes down. You are thrown clear, bruised, your candle " + (S.candle > 0 ? "half gone." : "out."));
}
}
}
if (F.t > 9) {
F.t = -1;
F.fell = 0;
F.hit = 0;
R.drop.visible = false;
F.cool = 60;
if (R.fall === F)
R.fall = null;
}
}
});
}
if (R.fall && R.fall.t < 0)
R.fall = null;
var Gh = R.ghost;
Gh.t -= dt;
if (!oss && S.candle > 0 && !Gh.g.visible && Gh.t <= 0) {
var a = Math.random() * 6.283, gx = P.x + Math.cos(a) * 14, gz = P.z + Math.sin(a) * 14;
Gh.g.position.set(gx - G.CX, 0, gz - G.CZ);
Gh.g.visible = true;
Gh.life = 30;
poeSfx("chain", { k: 0.3 });
Gh.t = 45;
}
if (Gh.g.visible) {
var dxg = P.x - G.CX - Gh.g.position.x, dzg = P.z - G.CZ - Gh.g.position.z, gd = Math.hypot(dxg, dzg), sp = (S.tomb ? 0.8 : 1.25) * dt;
Gh.life -= dt;
if (gd > 0.01) {
Gh.g.position.x += dxg / gd * sp;
Gh.g.position.z += dzg / gd * sp;
}
Gh.g.position.y = 0.1 + Math.sin(POE.t * 1.7) * 0.06;
if (oss || S.candle <= 0 || Gh.life <= 0) {
Gh.g.visible = false;
Gh.t = 30;
}
else if (gd < 1.3) {
Gh.g.visible = false;
Gh.t = 90;
if (S.tomb) {
var nxt = poeCatNextFig();
if (nxt)
poeSay("He stops before you. Keys chink. He lifts an arm: <b>" + poeGrsDir(nxt[0] - P.x, nxt[1] - P.z) + "</b>, " + Math.round(Math.hypot(nxt[0] - P.x, nxt[1] - P.z) / 10) * 10 + " metres as the crow flies. Then he is gone.");
else
poeSay("He stops before you. Keys chink. Then he is gone.");
}
else {
S.candle = 0;
poeSfx("wind");
poeWait(1.5, function () { poeSfx("windoff"); });
poeSay("A cold breath, and the chink of keys. Your candle is out.");
}
}
}
},
function () {
var P = poeGrsHere(), ch = P.z < -2000, fx = ch ? (P.x + 4000) / 2000 : (P.x + 3800) / 6600, fz = ch ? (P.z + 3600) / 1200 : (P.z + 1800) / 4200, w = poeGrsWhere(P);
poeCard("The plan of the quarries", "<div style='position:relative;line-height:0'><img src='assets/poe/grs/" + (ch ? "plan-chaillot" : "plan") + ".jpg' style='width:100%;border:1px solid #5A4A30' alt='The quarries under Paris'><div style='position:absolute;left:" + (fx * 100).toFixed(2) + "%;top:" + (fz * 100).toFixed(2) + "%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#C02020;border:2px solid #FFF'></div></div>" + poeNote("The red mark is where you stand" + (w ? ", beneath " + w : "") + ". North is up. " + (ch ? "These are the quarries of Chaillot, across the river." : "From the Rue de Dantzig in the west to the Salpêtrière in the east: nearly five kilometres. The ossuary is the knot below the middle.") + " Drawn from the Atlas souterrain de la ville de Paris, 1859, and the Plan des Catacombes, 1857; the outer workings from later surveys made on foot. The thin straight lines in the south, at the Porte d’Orléans, Montsouris and below the Place d’Italie, are only the main galleries, laid from hand sketches and placed to within about fifty metres."), [["Close the plan", "", null]]);
},
function (q) {
var D = POE_GRS_D, names = [], seen = {}, btn = [];
if (q == null) {
D.stairs.forEach(function (s) { if (!seen[s[2]]) {
seen[s[2]] = 1;
names.push(s[2]);
} });
names.forEach(function (n) { var c = D.stairs.filter(function (s) { return s[2] === n; }).length; btn.push([n, c > 1 ? c + " stairs" : "", function () { if (c > 1)
poeGrsStairs(n);
else
poeGrsGo(D.stairs.findIndex(function (s) { return s[2] === n; })); }]); });
poeCard("Another stair", "<p>Up to the street, across Paris in the dark, and down again by another stair of the Inspection. The workings do not all join underground: some can only be reached this way.</p>", btn);
return;
}
D.stairs.forEach(function (s, i) { if (s[2] === q)
btn.push([q + " · stair " + s[3], "", function () { poeGrsGo(i); }]); });
poeCard(q, "<p>Which stair?</p>", btn);
},
function (k, i) {
var S = poeCS(), R = POE_RX.x_cat, first = !S.seen[k + (i == null ? "" : i)];
S.seen[k + (i == null ? "" : i)] = 1;
if (first && "PBASGCT".indexOf(k) >= 0 && k.length === 1)
poeCatLight(12, null);
switch (k) {
case "E":
poeCard("The Catacombs of Paris", "<p>Ninety steps down from the Barrière d’Enfer, and the city is gone. Sixty feet of stone overhead. What lies before you is the old quarries as the Inspection surveyed them, gallery for gallery, under all the left bank from the Barrière de Vaugirard to the Salpêtrière: a hundred and forty kilometres of them, at their true length. Nobody has walked them all.</p><p>The <b>ossuary</b> lies to the south, better than a kilometre off by the gallery that follows the aqueduct of Arcueil. At the foot of every stair hangs the <b>plan of the quarries</b>.</p>" + poeNote("🕯 Your candle burns down, and faster outside the ossuary, where the air is foul. If it goes out, you are lost. The sepulchral lamp in the ossuary will light it again; so will the candle-ends the workmen left in their boxes."));
break;
case "stair": {
var st = POE_GRS_D.stairs[i];
S.stair = i;
poeSave();
poeCard(i ? "The stair of " + st[2] : "The stair of the Barrière d’Enfer", "<p>A winding stair of stone, and the Inspection’s plan in a frame at its foot.</p>", [["Read the plan of the quarries", "Where you stand, and the whole of the workings", function () { poeGrsPlan(); }], ["Go by another stair", "Up, across Paris, and down again somewhere else", function () { poeGrsStairs(); }], ["Climb up to the street", "Out into the night, in the street above", function () { poeParStairUp(); }]]);
break;
}
case "up":
poeOutside("out:x_cat");
break;
case "out":
poeOutside("out:x_exit");
break;
case "P":
poeCard("The carvings of Port-Mahon", "<p>A quarryman named Décure, who had been a soldier of Louis XV and a prisoner of the English in the fortress of Port-Mahon on Minorca, came down here every day for five years, from 1777 to 1782, in his dinner hour, and cut the fortress out of the rock from memory. When it was done he set about cutting a stair to it, and the roof fell on him.</p>");
break;
case "B":
poeCard("The quarrymen’s foot-bath", "<p>The first men to break into this place did not see the water until they stood in it: it is so clear, and so still. The quarrymen used it to mix their mortar. The Inspection dug it out as a well in 1810.</p>");
break;
case "A":
poeCard("The door of the ossuary", "<p style='font-size:17px;font-style:italic;text-align:center'>“Arrête! C’est ici l’empire de la Mort.”</p><p style='text-align:center'>Stop! This is the empire of Death.</p><p>Beyond this lintel lie the bones of some six million Parisians, carried here by night in black-draped carts, with priests chanting behind, from 1786 on, when the cemeteries of the city could hold no more.</p>");
break;
case "I":
poeCard("The bones of the Innocents", "<p>The first bones laid here came from the cemetery of the Saints-Innocents, beside the markets, in April 1786. Its charnel-houses were pulled down with it.</p><p>On one arch of those charnel-houses a rich scrivener named <b>Nicolas Flamel</b> had caused strange figures to be painted, in 1407: and the people said he had learned from an old book how to make gold, and how not to die. The stones of the arch came down here with the bones. Seven of them are carved. They were scattered through the old quarries, one to a quarter.</p>" + poeNote("Find the seven carved stones, out in the old quarries. The porter will point the way, if you have been kind to him. Then find the door marked N · F."));
break;
case "S":
poeCard("The fountain of the Samaritan woman", "<p>A well, dug in 1810 to drain the works, walled round with bones. It is named for the words cut beside it, which Christ spoke to the woman at the well:</p><p style='font-style:italic'>“Whosoever drinketh of this water shall thirst again: but whosoever drinketh of the water that I shall give him shall never thirst.”</p>");
break;
case "G":
poeCard("The tomb of Gilbert", "<p>A pillar holding up the roof, dressed as a sarcophagus. They call it the tomb of the poet Gilbert, who died at twenty-nine, in 1780, because of the verse of his that is cut on it:</p><p style='font-style:italic'>“Au banquet de la vie, infortuné convive,<br>J’apparus un jour, et je meurs.”</p><p>At the banquet of life, an unhappy guest, I appeared one day, and I die.</p>");
break;
case "C":
poeCard("The crypt of the Sacellum", "<p>An altar, copied from an antique one found on the banks of the Rhône. Mass was said here for the dead of the Revolution, whose bones lie behind these walls with the rest: no names, no ranks.</p>");
break;
case "L":
poeCatLight(100, null);
poeSfx("sizzle");
poeCard("The sepulchral lamp", "<p>The first thing ever set up in the ossuary: a stone cup in which the quarrymen kept a fire burning, to draw the air through the galleries. It burns still.</p>" + poeNote("🕯 Your candle is lit afresh, whole."));
break;
case "T":
poeCard("The rotunda of the tibias", "<p>A pillar that holds up the roof, dressed as a great barrel of shin-bones and skulls. In 1897, long after this night, a hundred Parisians will come down here in secret at midnight, with an orchestra, and hear the Danse Macabre played to the dead.</p>");
break;
case "H":
if (!S.tomb && S.candle > 25) {
poeCard("The tomb of Philibert Aspairt", "<p>“To the memory of Philibert Aspairt, lost in this quarry on the third of November 1793, found eleven years after, and buried in the same place on the thirtieth of April 1804.”</p><p>He was porter of the Val-de-Grâce. He went down by the hospital stair, they think to find the cellar of the Chartreux and its liqueur. His candle went out.</p>", [["Leave him a light: set a candle-end on the stone", "It will cost you a fifth of your own", function () { S.candle = Math.max(5, S.candle - 20); S.tomb = 1; poeSave(); poeSfx("chime", { k: 0.3 }); poeSay("You set the light on his stone. Somewhere in the quarries, the chink of keys stops."); }], ["Leave him in the dark", "", null]]);
}
else
poeCard("The tomb of Philibert Aspairt", "<p>“Lost in this quarry on the third of November 1793, found eleven years after.”</p>" + (S.tomb ? poeNote("Your light burns on his stone. He will not put yours out now; he may show you the way.") : ""));
break;
case "K":
poeCard("The cellar of the Chartreux", "<p>Casks, and green bottles in the dust: the liqueur of the Carthusian monks, whose convent stood overhead. This is what the porter came for. He passed within a few galleries of it.</p>");
break;
case "cache":
if (!i || S.caches[i]) {
poeSay("An empty box.");
break;
}
S.caches[i] = 1;
if (R.dynG)
R.dynG.visible = false;
R.dyn.x = 1e9;
R.dynBox = null;
poeCatLight(50, "Candle-ends. Your light is good for a while longer.");
break;
case "fig": {
var F = POE_CAT_FIG[i];
if (i === 6 && !poeAdult())
F = ["A king with a great falchion, and soldiers about him; and a great vessel, wherein the Sun and the Moon came to bathe themselves", F[1]];
if (S.figs.indexOf(i) < 0) {
S.figs.push(i);
poeSave();
poeSfx("chime", { k: 0.4 });
}
poeCard("A stone of the arch · " + ["I", "II", "III", "IV", "V", "VI", "VII"][i], "<p>Cut in the stone, as Flamel says he found it painted in the book of Abraham the Jew, “" + F[1] + "”:</p><p style='font-style:italic'>" + F[0] + ".</p>" + poeNote(S.figs.length >= 7 ? "That is all seven. Now the door: N · F, at the far end of the workings under the Faubourg Saint-Jacques." : "Stones found: " + S.figs.length + " of 7."));
break;
}
case "F":
if (S.flamel) {
poeEnterRoom("x_flamel", "x_cat");
break;
}
if (S.figs.length < 7 && !poeKeeper()) {
poeCard("A door of stone", "<p>N · F. Seven hollows are cut round the letters, each the shape of a small tablet. " + (S.figs.length ? "You know " + S.figs.length + " of the figures that belong in them." : "You do not know what belongs in them.") + "</p>" + poeNote("Find the seven carved stones of the arch first."));
break;
}
poeCatDoor(0);
break;
}
},
function (n) {
var S = poeCS(), ord = [0, 1, 2], ask = ["The book had thrice seven leaves, and every seventh leaf was a painted figure with no writing. Which figure was upon the <b>first</b> of the seventh leaves?", "And upon the <b>second</b> seventh leaf?", "And upon the <b>last</b>?"];
if (n >= 3) {
S.flamel = 1;
poeSave();
poeSfx("grating");
poeCard("The door turns", "<p>The stone turns on a pin, as lightly as a page.</p>", [["Go in", "", function () { poeEnterRoom("x_flamel", "x_cat"); }]]);
return;
}
var opts = [0, 1, 2, 3 + n].map(function (i) { return [(POE_CAT_FIG[i][0].length > 64 ? POE_CAT_FIG[i][0].slice(0, 62) + "…" : POE_CAT_FIG[i][0]), "", function () { if (i === ord[n])
poeCatDoor(n + 1);
else {
poeSay("The stone is still. Not that figure.");
var S2 = poeCS();
S2.candle = Math.max(0, S2.candle - 6);
} }]; });
var Rr = wRand(n * 13 + 5);
opts.sort(function () { return Rr() - 0.5; });
poeCard("The door of Nicolas Flamel", "<p>" + ask[n] + "</p>", opts);
},
function (R, g) {
var fu = poeGrp(g, -R.w / 2 + 1.4, 0, -R.d / 2 + 1.4);
poeCyl(fu, 0.8, 0.9, 1.4, poeS("brick", 0x9A6A4A), 0, 0.7, 0, 12);
poeCyl(fu, 0.5, 0.8, 0.7, poeS("brick", 0x9A6A4A), 0, 1.75, 0, 12);
var fg = wGlow(0xFF7A20, 1.6, 0.7);
fg.position.set(0.5, 0.6, 0.5);
fu.add(fg);
poeFlame(fu, 0.62, 0.45, 0.62, 1.2, 0xFF8A30);
poeLight(0xFF8A40, 1.5, 11, R.x - R.w / 2 + 2.2, 1.2, -R.d / 2 + 2.2, POE.G);
poeSolid(R.x - R.w / 2 + 1.4, -R.d / 2 + 1.4, 2, 2, -1, 3);
poeTable(g, 2, -2.6, 3, 1.1, 0.85, 0, null);
poeSolid(R.x + 2, -2.6, 3.2, 1.3, -1, 1.2);
[[0.9, 0x6AC8A0], [1.6, 0xC84A3A], [2.4, 0xE8C040], [3.1, 0x8A6AC8]].forEach(function (a, i) { var al = poeGrp(g, a[0], 0.87, -2.6); var gm = new THREE.MeshLambertMaterial({ color: a[1], transparent: true, opacity: 0.6, emissive: a[1], emissiveIntensity: 0.25 }); poeSph(al, 0.16, gm, 0, 0.17, 0, 12); poeCyl(al, 0.03, 0.05, 0.3, gm, 0, 0.42, 0, 8); if (i % 2) {
var nk = poeCyl(al, 0.02, 0.02, 0.4, gm, 0.16, 0.5, 0, 6);
nk.rotation.z = 1.1;
} });
poeBookcase(g, R.w / 2 - 0.25, 1, 3, 3.4, -Math.PI / 2);
poeSolid(R.x + R.w / 2 - 0.25, 1, 0.5, 3.1, -1, 3.6);
var bk = poeGrp(g, -1.2, 0, 1.2);
poeBox(bk, 0.5, 1.1, 0.4, poeC(POE_WOOD), 0, 0.55, 0);
var lf = poeBox(bk, 0.62, 0.05, 0.46, poeShine(0xC8A050, 0.3, 0.8), 0, 1.16, 0);
lf.rotation.x = 0.3;
var pg = poeBox(bk, 0.56, 0.02, 0.4, poeC(0xE8DCC0), 0, 1.2, 0.01);
pg.rotation.x = 0.3;
poeSolid(R.x - 1.2, 1.2, 0.7, 0.6, -1, 1.4);
poeSpot(R.x - 1.2, 2.0, 1.4, "The book of Abraham the Jew", "look, and do not touch", function () { poeCard("The book of Abraham the Jew", poeNote("As Flamel described it:") + "<p style='font-style:italic'>“A gilded Book, very old and large. It was not of paper nor parchment, as other books be, but was only made of delicate rinds (as it seemed unto me) of tender young trees. The cover of it was of brass, well bound, all engraven with letters or strange figures… It contained thrice seven leaves.”</p><p>He bought it for two florins.</p>"); }, 0);
var ch = poeGrp(g, 0, R.h - 1.1, 0);
poeCyl(ch, 0.7, 0.7, 0.05, poeShine(0x6A5A30, 0.4, 0.8), 0, 0, 0, 14);
for (var c = 0; c < 6; c++) {
var a2 = c / 6 * 6.283;
poeCandle(ch, Math.cos(a2) * 0.62, 0.03, Math.sin(a2) * 0.62, 0.2, true);
}
poeLight(0xFFD8A0, 1.2, 12, R.x, R.h - 1.4, 0, POE.G);
poeRug(g, 0, 1.5, 5, 4, 0x6A2A2A);
poeArmchair(g, 3, 2.6, -2.2, 0x3A2A4A);
poeSolid(R.x + 3, 2.6, 0.9, 0.9, -1, 1);
POE.cast.flamel = poeRoomPerson(R, "flamel", -0.2, -1.2, 0.3, { name: "Nicolas Flamel", role: "monk", sex: "m", look: { _seed: 140, skin: 0xE8D8C8, hair: 0xE8E8E8, beard: 1 }, fn: function () { poeFlamelTalk(); } });
POE.cast.pernelle = poeRoomPerson(R, "pernelle", 2.6, 1.8, -2.0, { name: "Dame Pernelle", role: "poorf", sex: "f", look: { _seed: 141, skin: 0xE8D8C8, hair: 0xD8D8D8 }, talk: { name: "Dame Pernelle", persona: "Pernelle, wife of Nicolas Flamel the scrivener of Paris. She helped him in the Great Work; she is said to have died in 1397, and he in 1418, but both graves were found empty. Now it is the 1840s and they live quietly under Paris. Warm, sharp, practical, amused by the legend; she speaks of charity, hospitals and churches they endowed, and warns visitors about the quarries.", greet: "A visitor! And with every one of his fingers. Sit. You will want something hot; it is a long way back to the stair." } });
R.onEnter = function () { POE.dim = false; var S = poeCS(); S.candle = 100; poeSave(); };
R.start = { x: 0, z: R.d / 2 - 2, ry: 0 };
},
function () {
var S = poeCS(), first = S.flamel < 2;
var h = "<p>“You have read my arch. Few do; fewer walk so far in the dark to do it.”</p><p>“I was a scrivener by the church of Saint-Jacques-de-la-Boucherie. In the year 1357 there fell into my hands, for two florins, a gilded book of thrice seven leaves. One and twenty years I could not read it. I carried its figures to Saint James of Compostela, and coming home through León I met a physician, Master Canches, who knew them at sight. He died at Orléans before he saw the book. I worked three years more.”</p><p style='font-style:italic'>“Finally, I found that which I desired… This was upon a Monday, the 17 of January about noon, in my house, Pernelle only being present, in the year of the restoring of mankind 1382.”</p><p>“We founded fourteen hospitals with it, built three chapels, and enriched seven churches. Then we thought it best to be buried.”</p>";
var btn = [["“And the house in the Rue de Montmorency?”", "", function () { poeCard("Nicolas Flamel", "<p>“Standing yet, I am told: the one I built in 1407 to lodge poor labourers, who paid their rent in two prayers a day. Read the front of it when you are above.”</p>"); }]];
if (first)
btn.unshift(["Hold out your hand", "He has something for you", function () { S.flamel = 2; var B = poeBS(); if (!B.keeps.some(function (k) { return k.k === "poe_powder"; }))
B.keeps.push({ k: "poe_powder", n: "A grain of the red powder of projection, from Nicolas Flamel", i: "🜚", at: Date.now() }); poeSave(); poeSfx("chime"); poeCard("A grain of the red powder", "<p>He tips one grain, heavy and red, into a twist of paper, and closes your hand on it.</p><p>“It will make you no gold, one grain. Keep it to remember that you walked so far into the dark and came back.”</p>" + poeNote("🜚 A keepsake for your Backpack.")); }]);
poeCard("Nicolas Flamel", h, btn);
},
function () {
var G = POE_GRS, D = POE_GRS_D, keys = Object.keys(G.has);
return new Promise(function (done) {
var t0 = Date.now();
keys.forEach(function (k) { var q = k.split("_"); poeGrsLoad(+q[0], +q[1]); });
var iv = setInterval(function () {
var n = keys.filter(function (k) { return G.data[k]; }).length;
if (n < keys.length && Date.now() - t0 < 60000)
return;
clearInterval(iv);
var bad = [], open = 0, hall = 0;
if (n < keys.length)
bad.push("sheets loaded " + n + " of " + keys.length);
keys.forEach(function (k) { var d = G.data[k]; if (!d)
return; for (var i = 0; i < d.length; i++) {
var t = d[i];
if (t === 1 || t === 2 || t === 7) {
open++;
if (t === 1)
hall++;
}
} });
function chk(p, nm) { if (!poeGrsOpen(p[0] + 0.5, p[1] + 0.5))
bad.push(nm + " is in the rock"); }
D.stairs.forEach(function (s, i) { chk(s, "stair " + i); });
for (var k in D.st)
chk(D.st[k], "station " + k);
D.fig.forEach(function (c, i) { chk(c, "stone " + (i + 1)); });
chk(D.F, "Flamel's door");
chk(D.H, "Aspairt");
chk(D.K, "the cellar");
if (D.fig.length !== 7)
bad.push("stones " + D.fig.length);
var walk = null;
if (!POE.lite && n === keys.length) {
var NX = G.NX, NZ = G.NZ, T = G.T, seen = new Uint8Array(NX * NZ), q = new Int32Array(open + 8), h = 0, e = 0, dist = new Int32Array(1);
var op = function (ix, iz) { if (ix < 0 || iz < 0 || ix >= NX || iz >= NZ)
return false; var d = G.data[((ix / T) | 0) + "_" + ((iz / T) | 0)]; if (!d)
return false; var t = d[(iz % T) * T + (ix % T)]; return t === 1 || t === 2 || t === 7; };
var s0 = D.stairs[0], i0 = (s0[1] - G.Z0) * NX + (s0[0] - G.X0);
seen[i0] = 1;
q[e++] = i0;
while (h < e) {
var c = q[h++], cx = c % NX, cz = (c / NX) | 0;
if (cx + 1 < NX && !seen[c + 1] && op(cx + 1, cz)) {
seen[c + 1] = 1;
q[e++] = c + 1;
}
if (cx > 0 && !seen[c - 1] && op(cx - 1, cz)) {
seen[c - 1] = 1;
q[e++] = c - 1;
}
if (!seen[c + NX] && op(cx, cz + 1)) {
seen[c + NX] = 1;
q[e++] = c + NX;
}
if (cz > 0 && !seen[c - NX] && op(cx, cz - 1)) {
seen[c - NX] = 1;
q[e++] = c - NX;
}
}
walk = e;
var rc = function (p, nm) { if (!seen[(p[1] - G.Z0) * NX + (p[0] - G.X0)])
bad.push("cannot walk to " + nm); };
for (var k2 in D.st)
rc(D.st[k2], "station " + k2);
rc(D.F, "Flamel's door");
}
done({ bad: bad, sheets: n, open: open, halls: hall, stairs: D.stairs.length, fromEnfer: walk });
}, 200);
});
},
function (G) {
var groups = {}, n = 0;
POE_FOLK.forEach(function (F, i) {
if (POE.lite && i % 2)
return;
var A = POE_AT[F[0]];
if (!A)
return;
var g = groups[F[0]];
if (!g) {
g = groups[F[0]] = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x, z: A.z, r: 240 });
}
var x = A.x + F[1], z = A.z + F[2];
poePerson("folk" + i, x, z, (i * 1.9) % 6.28, { name: F[3], role: F[4], sex: F[5], r: 2.6, look: { _seed: 300 + i, top: [0xC81E2A, 0xE8C040, 0x2A5AC8, 0x2AA84A, 0x6A2A8A, 0x8A5A3A][i % 6] }, wander: F[6] ? { r: F[6], sp: 0.7 } : null,
fn: function () { poeCard(F[3], "<p>" + poeA(F[7], F[8] || F[7]) + "</p>"); } }, g);
n++;
});
return n;
},
function (tx, tz) {
var G = POE_PAR, k = tx + "_" + tz;
if (!G.has[k] || G.data[k] || G.loading[k])
return;
G.loading[k] = 1;
var im = new Image();
im.onload = function () { try {
var c = document.createElement("canvas");
c.width = c.height = G.T;
var x = c.getContext("2d", { willReadFrequently: true });
x.drawImage(im, 0, 0);
var d = x.getImageData(0, 0, G.T, G.T).data, n = G.T * G.T, a = new Uint8Array(n);
for (var i = 0; i < n; i++)
a[i] = Math.round(d[i * 4] / 30);
G.data[k] = a;
G.stamp++;
c.width = c.height = 1;
}
catch (e) {
if (window.console)
console.warn("[poe] paris sheet " + k, e);
} G.loading[k] = 0; };
im.onerror = function () { G.loading[k] = 0; G.err++; };
im.src = "assets/poe/par/t_" + k + ".png";
},
function (key, w, h, fn) {
if (POE.tex[key])
return POE.tex[key];
var a = poeParCanvas(w, h), b = poeParCanvas(w, h), xa = a.getContext("2d"), xb = b.getContext("2d");
xb.fillStyle = "#000";
xb.fillRect(0, 0, w, h);
fn(xa, xb, w, h);
var ta = new THREE.CanvasTexture(a), tb = new THREE.CanvasTexture(b);
[ta, tb].forEach(function (t) { t.wrapS = t.wrapT = THREE.RepeatWrapping; try {
t.anisotropy = Math.min(POE.lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { } });
return (POE.tex[key] = { map: ta, glow: tb });
},
function (x, W, H, mPx, col, seed) {
var R = wRand(seed);
x.fillStyle = col;
x.fillRect(0, 0, W, H);
var ch = 0.42 * mPx, y = 0, row = 0;
while (y < H) {
var off = (row % 2) * 0.6 * mPx, cw = 1.2 * mPx;
for (var cx = -off; cx < W; cx += cw) {
var sh = (R() - 0.5) * 18;
x.fillStyle = "rgba(" + (sh > 0 ? "255,250,235," : "20,16,10,") + (Math.abs(sh) / 140) + ")";
x.fillRect(cx + 1, y + 1, cw - 2, ch - 2);
x.fillStyle = "rgba(40,34,26,.22)";
x.fillRect(cx, y, 1, ch);
}
x.fillStyle = "rgba(40,34,26,.28)";
x.fillRect(0, y, W, 1);
y += ch;
row++;
}
poeNz(x, W, H, Math.round(W * H / 90), 0.08, seed + 1);
poeNz(x, W, H, Math.round(W * H / 160), 0.06, seed + 2, "255,248,230");
for (var i = 0; i < W / 14; i++) {
var sx = R() * W, len = H * (0.2 + R() * 0.6), g = x.createLinearGradient(0, 0, 0, len);
g.addColorStop(0, "rgba(30,26,20,.16)");
g.addColorStop(1, "rgba(30,26,20,0)");
x.fillStyle = g;
x.fillRect(sx, 0, 2 + R() * 5, len);
}
var g2 = x.createLinearGradient(0, H * 0.75, 0, H);
g2.addColorStop(0, "rgba(20,16,10,0)");
g2.addColorStop(1, "rgba(20,16,10,.25)");
x.fillStyle = g2;
x.fillRect(0, 0, W, H);
},
function (x, e, X, Y, w, h, R, lit, shut, col) {
x.fillStyle = "rgba(250,244,228,.55)";
x.fillRect(X - w * 0.12, Y - h * 0.1, w * 1.24, h * 1.16);
x.fillStyle = "rgba(60,50,38,.35)";
x.fillRect(X - w * 0.12, Y + h * 1.04, w * 1.24, h * 0.05);
x.fillStyle = "#E8E0CC";
x.fillRect(X - w * 0.16, Y + h, w * 1.32, h * 0.06);
x.fillStyle = "#D8D0BC";
x.fillRect(X - w * 0.1, Y - h * 0.13, w * 1.2, h * 0.06);
if (shut) {
x.fillStyle = col;
x.fillRect(X, Y, w, h);
x.fillStyle = "rgba(0,0,0,.35)";
for (var s = Y + 3; s < Y + h; s += Math.max(3, h / 22))
x.fillRect(X, s, w, 1.5);
x.fillStyle = "rgba(0,0,0,.5)";
x.fillRect(X + w / 2 - 1, Y, 2, h);
return;
}
var g = x.createLinearGradient(X, Y, X + w, Y + h);
if (lit) {
g.addColorStop(0, "#F8C878");
g.addColorStop(1, "#B86A28");
}
else {
g.addColorStop(0, "#3A4658");
g.addColorStop(0.5, "#141C28");
g.addColorStop(1, "#0A0E14");
}
x.fillStyle = g;
x.fillRect(X, Y, w, h);
if (lit) {
var cw = w * (0.18 + R() * 0.12);
x.fillStyle = ["#6A1A1A", "#2A3A5A", "#5A4A2A", "#3A2A3A", "#E8E0C8"][(R() * 5) | 0];
x.fillRect(X, Y, cw, h);
x.fillRect(X + w - cw, Y, cw, h);
if (R() < 0.25) {
x.fillStyle = "rgba(30,16,8,.75)";
var px = X + w * (0.35 + R() * 0.3);
x.beginPath();
x.arc(px, Y + h * 0.42, w * 0.09, 0, 7);
x.fill();
x.fillRect(px - w * 0.13, Y + h * 0.5, w * 0.26, h * 0.5);
}
var ge = e.createLinearGradient(X, Y, X, Y + h);
ge.addColorStop(0, "#B07838");
ge.addColorStop(1, "#6A3A12");
e.fillStyle = ge;
e.fillRect(X + cw, Y, w - 2 * cw, h);
}
else {
x.fillStyle = "rgba(160,180,210,.10)";
x.beginPath();
x.moveTo(X, Y);
x.lineTo(X + w * 0.5, Y);
x.lineTo(X, Y + h * 0.6);
x.fill();
}
x.fillStyle = "#D8D0BC";
x.fillRect(X + w / 2 - 1.5, Y, 3, h);
for (var r = 1; r < 4; r++)
x.fillRect(X, Y + r * h / 4 - 1, w, 2);
x.strokeStyle = "#D8D0BC";
x.lineWidth = 3;
x.strokeRect(X, Y, w, h);
x.fillStyle = col;
x.fillRect(X - w * 0.5, Y, w * 0.44, h);
x.fillRect(X + w * 1.06, Y, w * 0.44, h);
x.fillStyle = "rgba(0,0,0,.35)";
for (var s2 = Y + 3; s2 < Y + h; s2 += Math.max(3, h / 22)) {
x.fillRect(X - w * 0.5, s2, w * 0.44, 1.5);
x.fillRect(X + w * 1.06, s2, w * 0.44, 1.5);
}
},
function (k) {
var S = POE.lite ? 512 : 1024;
return poeParTexPair("parUp" + k, S, S, function (x, e, W, H) {
var m = W / 12, R = wRand(900 + k * 17);
poeParStone(x, W, H, m, ["#D8CDB4", "#CFC3A6", "#C8C0B0"][k], 910 + k);
var sc = POE_PAR_SHUT[(k * 2 + 1) % POE_PAR_SHUT.length];
for (var f = 0; f < 4; f++)
for (var b = 0; b < 4; b++) {
var fy = H - (f + 1) * 3 * m, hh = (f === 1 ? 2.35 : f === 3 ? 1.7 : 2.05) * m, X = b * 3 * m + 0.95 * m, Y = fy + 3 * m - 0.62 * m - hh, lit = R() < 0.32, sh = !lit && R() < 0.28;
poeParWindow(x, e, X, Y, 1.1 * m, hh, R, lit, sh, sc);
if (f !== 1)
poeParRail(x, X - 0.05 * m, Y + hh - 0.52 * m, 1.2 * m, 0.5 * m);
}
x.fillStyle = "rgba(240,232,214,.55)";
for (var f2 = 0; f2 < 4; f2++)
x.fillRect(0, H - f2 * 3 * m - 0.16 * m, W, 0.12 * m);
});
},
function (k) {
var S = POE.lite ? 512 : 1024;
return poeParTexPair("parGf" + k, S, Math.round(S * 4.4 / 12), function (x, e, W, H) {
var m = W / 12, R = wRand(950 + k * 31);
poeParStone(x, W, H, m, ["#C8BCA2", "#C0B498", "#B8B0A0"][k % 3], 960 + k);
for (var r = 0; r < H; r += 0.55 * m) {
x.fillStyle = "rgba(30,24,16,.35)";
x.fillRect(0, r, W, 2);
}
for (var b = 0; b < 4; b++) {
var X = b * 3 * m, kind = (k * 4 + b) % 7;
if (kind === 2) {
x.fillStyle = "#E0D6BE";
x.fillRect(X + 0.25 * m, H - 4.0 * m, 2.5 * m, 4.0 * m);
x.fillStyle = "#2A1C12";
x.beginPath();
x.moveTo(X + 0.45 * m, H);
x.lineTo(X + 0.45 * m, H - 2.9 * m);
x.arc(X + 1.5 * m, H - 2.9 * m, 1.05 * m, Math.PI, 0);
x.lineTo(X + 2.55 * m, H);
x.fill();
x.fillStyle = "#3A2A1C";
for (var p = 0; p < 3; p++) {
x.fillRect(X + 0.6 * m, H - (0.4 + p * 0.9) * m - 0.7 * m, 0.75 * m, 0.7 * m);
x.fillRect(X + 1.65 * m, H - (0.4 + p * 0.9) * m - 0.7 * m, 0.75 * m, 0.7 * m);
}
x.fillStyle = "#C8A050";
x.fillRect(X + 1.45 * m, H - 1.6 * m, 0.1 * m, 0.1 * m);
x.fillStyle = "#000";
x.fillRect(X + 1.49 * m, H - 3.0 * m, 0.02 * m, 3.0 * m);
continue;
}
if (kind === 5) {
poeParWindow(x, e, X + 0.95 * m, H - 3.4 * m, 1.1 * m, 1.8 * m, R, R() < 0.3, false, POE_PAR_SHUT[b % 6]);
continue;
}
var fc = ["#2A3A2A", "#4A1A1A", "#1A1A22", "#3A2A1A", "#2A2A3A", "#5A4A1A"][(k + b) % 6], name = POE_PAR_SHOPS[(k * 5 + b * 3) % POE_PAR_SHOPS.length];
x.fillStyle = fc;
x.fillRect(X + 0.12 * m, H - 3.75 * m, 2.76 * m, 3.75 * m);
x.fillStyle = "#C8A050";
x.fillRect(X + 0.12 * m, H - 3.75 * m, 2.76 * m, 0.06 * m);
x.fillRect(X + 0.12 * m, H - 3.1 * m, 2.76 * m, 0.04 * m);
x.font = "bold " + Math.round(0.36 * m) + "px Georgia";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillStyle = "#E8C870";
x.fillText(name, X + 1.5 * m, H - 3.42 * m, 2.6 * m);
var lit = R() < 0.7, gx = X + 0.3 * m, gy = H - 2.9 * m, gw = 1.45 * m, gh = 2.0 * m, g = x.createLinearGradient(gx, gy, gx, gy + gh);
if (lit) {
g.addColorStop(0, "#F8D08A");
g.addColorStop(1, "#C07A30");
}
else {
g.addColorStop(0, "#2A3240");
g.addColorStop(1, "#0A0E14");
}
x.fillStyle = g;
x.fillRect(gx, gy, gw, gh);
if (lit) {
var ge = e.createLinearGradient(gx, gy, gx, gy + gh);
ge.addColorStop(0, "#C89850");
ge.addColorStop(1, "#80501C");
e.fillStyle = ge;
e.fillRect(gx, gy, gw, gh);
for (var i = 0; i < 9; i++) {
x.fillStyle = ["#8A4A1A", "#E8D8B0", "#6A2A1A", "#C8A050", "#3A5A3A"][(i + b) % 5];
x.fillRect(gx + 0.1 * m + (i % 3) * 0.45 * m, gy + 0.5 * m + Math.floor(i / 3) * 0.55 * m, 0.32 * m, 0.3 * m);
}
}
x.fillStyle = fc;
for (var c = 1; c < 3; c++)
x.fillRect(gx + c * gw / 3 - 1, gy, 2, gh);
x.fillRect(gx, gy + gh / 2 - 1, gw, 2);
x.fillStyle = "#1A120C";
x.fillRect(X + 1.95 * m, H - 2.9 * m, 0.8 * m, 2.9 * m);
x.fillStyle = lit ? "#D8A060" : "#1A2230";
x.fillRect(X + 2.05 * m, H - 2.75 * m, 0.6 * m, 1.1 * m);
if (lit) {
e.fillStyle = "#8A5A26";
e.fillRect(X + 2.05 * m, H - 2.75 * m, 0.6 * m, 1.1 * m);
}
}
x.fillStyle = "rgba(240,232,214,.6)";
x.fillRect(0, 0, W, 0.14 * m);
});
},
function () {
var S = POE.lite ? 512 : 1024;
return poeParTexPair("parMan", S, Math.round(S * 3 / 12), function (x, e, W, H) {
var m = W / 12, R = wRand(977);
x.fillStyle = "#2A2E36";
x.fillRect(0, 0, W, H);
for (var y = 0; y < H; y += 0.18 * m) {
for (var xx = ((y / (0.18 * m)) % 2) * 0.12 * m; xx < W; xx += 0.24 * m) {
var s = 36 + R() * 22 | 0;
x.fillStyle = "rgb(" + s + "," + (s + 4) + "," + (s + 12) + ")";
x.beginPath();
x.ellipse(xx, y + 0.12 * m, 0.11 * m, 0.1 * m, 0, 0, Math.PI);
x.fill();
}
}
for (var b = 0; b < 4; b++) {
var X = b * 3 * m + 1.0 * m, Y = H * 0.18, w = 1.0 * m, h = H * 0.62, lit = R() < 0.35;
x.fillStyle = "#C8C0AE";
x.fillRect(X - 0.15 * m, Y - 0.1 * m, w + 0.3 * m, h + 0.15 * m);
x.beginPath();
x.moveTo(X - 0.25 * m, Y);
x.lineTo(X + w / 2, Y - 0.4 * m);
x.lineTo(X + w + 0.25 * m, Y);
x.fill();
var g = x.createLinearGradient(X, Y, X, Y + h);
if (lit) {
g.addColorStop(0, "#F0C070");
g.addColorStop(1, "#A86020");
e.fillStyle = "#7A5020";
e.fillRect(X, Y, w, h);
}
else {
g.addColorStop(0, "#2A3442");
g.addColorStop(1, "#0A0C12");
}
x.fillStyle = g;
x.fillRect(X, Y, w, h);
x.fillStyle = "#C8C0AE";
x.fillRect(X + w / 2 - 1, Y, 2, h);
x.fillRect(X, Y + h / 2 - 1, w, 2);
}
x.fillStyle = "#E0D8C4";
x.fillRect(0, H - 0.12 * m, W, 0.12 * m);
});
},
function () { return POE.tex.parBal || (POE.tex.parBal = wTex(512, 64, function (x, W, H) { x.clearRect(0, 0, W, H); x.strokeStyle = "#0E0E0E"; x.lineWidth = 4; x.strokeRect(2, 4, W - 4, H - 6); x.lineWidth = 3; x.beginPath(); for (var i = 6; i < W; i += 12) {
x.moveTo(i, 4);
x.lineTo(i, H - 2);
} x.stroke(); x.lineWidth = 2; x.beginPath(); for (var j = 0; j < W; j += 24) {
x.moveTo(j + 22, H * 0.5);
x.arc(j + 12, H * 0.5, 10, 0, 7);
} x.stroke(); }, [1, 1])); },
function (x, W, H) { x.fillStyle = "#A89C88"; x.fillRect(0, 0, W, H); poeNz(x, W, H, 9000, 0.12, 981); var R = wRand(982); for (var i = 0; i < 5; i++) {
x.fillStyle = "rgba(40,34,26,.18)";
x.fillRect(R() * W, 0, W * 0.06, H);
} for (var j = 0; j < 3; j++) {
x.strokeStyle = "rgba(60,50,40,.3)";
x.lineWidth = 6;
x.beginPath();
var a = R() * W;
x.moveTo(a, H);
x.lineTo(a + W * 0.2, H * 0.4);
x.lineTo(a + W * 0.4, H);
x.stroke();
} poeStain(x, W, H, 8, 983, "30,24,16", 0.3); },
function (x, W, H) { x.fillStyle = "#1A1A1A"; x.fillRect(0, 0, W, H); var R = wRand(986), r = 0; for (var y = 0; y < H; y += H / 12) {
for (var xx = -(r % 2) * W / 16; xx < W; xx += W / 8) {
var s = 70 + R() * 40 | 0;
x.fillStyle = "rgb(" + s + "," + (s - 4) + "," + (s - 10) + ")";
x.beginPath();
x.ellipse(xx + W / 16, y + H / 24, W / 16 - 2, H / 24 - 2, 0, 0, 7);
x.fill();
x.fillStyle = "rgba(255,250,240,.06)";
x.fillRect(xx + W / 16 - 4, y + 3, 8, 3);
}
r++;
} poeNz(x, W, H, 3000, 0.2, 987); poeStain(x, W, H, 10, 988, "6,6,4", 0.4); },
function (x, W, H) { x.fillStyle = "#2A3020"; x.fillRect(0, 0, W, H); var R = wRand(993); for (var i = 0; i < 9000; i++) {
var g = 40 + R() * 50 | 0;
x.fillStyle = "rgba(" + (g - 10) + "," + (g + 14) + "," + (g - 20) + ",.6)";
x.fillRect(R() * W, R() * H, 1 + R() * 2, 3 + R() * 5);
} for (var j = 0; j < 14; j++) {
x.fillStyle = "rgba(150,140,110,.18)";
x.beginPath();
x.ellipse(R() * W, R() * H, 20 + R() * 60, 8 + R() * 20, R() * 3, 0, 7);
x.fill();
} },
function (x, W, H) { x.fillStyle = "#2A1A10"; x.fillRect(0, 0, W, H); x.fillStyle = "#3A2618"; for (var i = 0; i < 2; i++)
for (var j = 0; j < 3; j++)
x.fillRect(W * (0.1 + i * 0.45), H * (0.06 + j * 0.31), W * 0.35, H * 0.26); x.fillStyle = "#C8A050"; x.beginPath(); x.arc(W * 0.5, H * 0.5, W * 0.04, 0, 7); x.fill(); x.fillStyle = "#000"; x.fillRect(W * 0.49, 0, W * 0.02, H); },
function (k, col) {
var key = "par" + k + (col || "");
if (POE.mats[key])
return POE.mats[key];
var m;
if (POE_PAR_TEX[k]) {
var D = POE_PAR_TEX[k], px = POE.lite ? 256 : 512, t = wTex(px, px, D[1]);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
try {
t.anisotropy = Math.min(POE.lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
m = new THREE.MeshLambertMaterial({ map: t, color: col || 0xFFFFFF });
m.userData.rep = D[0];
if (k === "setts" || k === "quayflag" || k === "garden" || k === "court") {
m.emissiveMap = t;
m.emissive = new THREE.Color(0x3A342C);
}
}
else if (k.indexOf("up") === 0 || k.indexOf("gf") === 0 || k === "man") {
var P = k === "man" ? poeParMansard() : k.indexOf("up") === 0 ? poeParUpper(+k.slice(2)) : poeParGround(+k.slice(2));
m = new THREE.MeshLambertMaterial({ map: P.map, emissiveMap: P.glow, emissive: 0xFFFFFF, color: col || 0xFFFFFF });
}
else if (k === "water")
m = new THREE.MeshPhongMaterial({ color: 0x081014, specular: 0x4A5866, shininess: 90 });
else if (k === "bal") {
m = new THREE.MeshLambertMaterial({ map: poeParBalTex(), transparent: true, alphaTest: 0.4, side: THREE.DoubleSide });
}
else if (k === "lamp")
m = new THREE.MeshBasicMaterial({ color: 0xFFC870 });
else if (k === "iron")
m = new THREE.MeshLambertMaterial({ color: 0x101010 });
return (POE.mats[key] = m);
},
function () {
var P = [], U = [], N = [];
return { q: function (a, b, c, d, n, u0, v0, u1, v1) { P.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], a[0], a[1], a[2], c[0], c[1], c[2], d[0], d[1], d[2]); U.push(u0, v0, u1, v0, u1, v1, u0, v0, u1, v1, u0, v1); for (var i = 0; i < 6; i++)
N.push(n[0], n[1], n[2]); },
n: function () { return P.length; },
mesh: function (mat, parent) { if (!P.length)
return null; var g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(P), 3)); g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(U), 2)); g.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(N), 3)); g.computeBoundingSphere(); var m = new THREE.Mesh(g, mat); parent.add(m); return m; } };
},
function (B, x, y, z, w, h, d, us) {
us = us || 1;
var x0 = x - w / 2, x1 = x + w / 2, z0 = z - d / 2, z1 = z + d / 2, y1 = y + h;
poeParWall(B, [x0, z1], [x1, z1], y, y1, [0, 1], us, us);
poeParWall(B, [x1, z0], [x0, z0], y, y1, [0, -1], us, us);
poeParWall(B, [x1, z1], [x1, z0], y, y1, [1, 0], us, us);
poeParWall(B, [x0, z0], [x0, z1], y, y1, [-1, 0], us, us);
B.q([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], [0, 1, 0], x0 / us, z1 / us, x1 / us, z0 / us);
},
function (x, z, lx, lz, T) {
var D = POE_PAR_D, opp = [1, 0, 3, 2], tn = [0, 1, 2, 3].map(function (i) { return T(x + D[i][0], z + D[i][1]); });
function op(v) { return v === 0 || v === 3 || v === 4; }
var P = [[0, 2], [0, 3], [1, 2], [1, 3]];
for (var k = 0; k < 4; k++) {
var a = P[k][0], b = P[k][1];
if (!op(tn[a]) || !op(tn[b]) || tn[opp[a]] !== 1 || tn[opp[b]] !== 1)
continue;
if (!op(T(x + D[a][0] + D[b][0], z + D[a][1] + D[b][1])))
continue;
var Ea = poeParEdge(lx, lz, a), Eb = poeParEdge(lx, lz, b), sh = null, qa = null, qb = null;
Ea.forEach(function (p) { Eb.forEach(function (q) { if (p[0] === q[0] && p[1] === q[1])
sh = p; }); });
Ea.forEach(function (p) { if (p !== sh && !(p[0] === sh[0] && p[1] === sh[1]))
qa = p; });
Eb.forEach(function (p) { if (!(p[0] === sh[0] && p[1] === sh[1]))
qb = p; });
var s = Math.SQRT1_2, n = [(D[a][0] + D[b][0]) * s, (D[a][1] + D[b][1]) * s], r = [n[1], -n[0]], p0 = qa, p1 = qb;
if ((p1[0] - p0[0]) * r[0] + (p1[1] - p0[1]) * r[1] < 0) {
p0 = qb;
p1 = qa;
}
var far = [sh[0] === lx ? lx + 1 : lx, sh[1] === lz ? lz + 1 : lz];
function up(A, B, C, y) { var u = [B[0] - A[0], B[1] - A[1]], v = [C[0] - A[0], C[1] - A[1]], c = u[1] * v[0] - u[0] * v[1]; return c > 0 ? [[A[0], y, A[1]], [B[0], y, B[1]], [C[0], y, C[1]]] : [[A[0], y, A[1]], [C[0], y, C[1]], [B[0], y, B[1]]]; }
var water = tn[a] === 3 && tn[b] === 3;
return { a: a, b: b, n: n, E: [p0, p1], water: water, tri: up(qa, sh, qb, water ? -3.1 : 0), roof: up(qa, far, qb, poeParH(x, z) + (POE_PAR.rise || 2.6)) };
}
return null;
},
function (cx, cz) {
var G = POE_PAR, R = POE_RX.x_paris, C = G.CH, x0 = cx * C, z0 = cz * C, x, z, i, t;
var wait = false;
[[x0 - 1, z0 - 1], [x0 + C, z0 - 1], [x0 - 1, z0 + C], [x0 + C, z0 + C]].forEach(function (p) { if (poeParRaw(p[0], p[1]) === -1)
wait = true; });
if (wait)
return null;
var K = { cx: cx, cz: cz, g: null, doors: [], lamps: [], trees: [] }, any = false, lite = POE.lite;
G.ox = x0;
G.oz = z0;
var B = { st: poeParBatch(), br: poeParBatch(), ct: poeParBatch(), gd: poeParBatch(), wt: poeParBatch(), qw: poeParBatch(), qf: poeParBatch(), ar: poeParBatch(), pw: poeParBatch(), zn: poeParBatch(), mn: poeParBatch(), bl: poeParBatch(), cn: poeParBatch(), dr: poeParBatch(), ir: poeParBatch(), lp: poeParBatch(),
up: [poeParBatch(), poeParBatch(), poeParBatch()], gf: [poeParBatch(), poeParBatch(), poeParBatch(), poeParBatch()] };
function T(a, b) { var v = poeParT(a, b); return v === -1 ? 2 : v; }
for (z = z0; z < z0 + C; z++) {
var run = null, rk = -1;
for (x = x0; x <= x0 + C; x++) {
t = x < x0 + C ? T(x, z) : -9;
var k = t === 1 ? -1 : t;
if (run !== null && k !== rk) {
var a = run - x0, b = x - x0, lz = z - z0, y = rk === 3 ? -3.1 : 0.0, BB = rk === 0 ? B.st : rk === 4 ? B.br : rk === 3 ? B.wt : B.gd, sc = rk === 2 ? 4 : rk === 3 ? 8 : 2;
BB.q([a, y, lz + 1], [b, y, lz + 1], [b, y, lz], [a, y, lz], [0, 1, 0], (x0 + run) / sc, -(z0 + z + 1) / sc, (x0 + x) / sc, -(z0 + z) / sc);
run = null;
}
if (k === -1 || k === -9)
continue;
any = true;
if (run === null) {
run = x;
rk = k;
}
}
}
for (z = z0; z < z0 + C; z++)
for (x = x0; x < x0 + C; x++) {
t = T(x, z);
var lx = x - x0, lz = z - z0;
if (t === 1) {
any = true;
var h = poeParH(x, z), cap = h + (POE_PAR.rise || 2.6), pl = poeParPlot(x, z), up = B.up[pl % 3], gf = B.gf[(pl >>> 3) % 4];
var cut = poeParCut(x, z, lx, lz, T);
if (cut) {
var gy = cut.water ? -3.1 : 0;
(cut.water ? B.wt : B.st).q(cut.tri[0].concat(), cut.tri[1], cut.tri[2], cut.tri[2], [0, 1, 0], 0, 0, 0.5, 0.5);
}
for (i = 0; i < 4; i++) {
if (cut && (i === cut.a || i === cut.b)) {
if (i !== cut.a)
continue;
}
var d = cut && i === cut.a ? cut.n : POE_PAR_D[i], nt = T(x + POE_PAR_D[i][0], z + POE_PAR_D[i][1]), E = cut && i === cut.a ? cut.E : poeParEdge(lx, lz, i), n = d;
if (nt === 1) {
var nh = poeParH(x + d[0], z + d[1]), ncap = nh + (POE_PAR.rise || 2.6);
if (ncap >= cap - 0.01)
continue;
if (h > ncap) {
poeParWall(B.pw, E[0], E[1], ncap, h, n, 6, 6);
poeParMansardQ(B.mn, E, h, n);
}
else
poeParWall(B.pw, E[0], E[1], ncap, cap, n, 6, 6);
continue;
}
var y0 = nt === 3 ? -3.1 : 0, front = nt === 0 || nt === 4 || nt === 3;
if (front) {
poeParWall(gf, E[0], E[1], y0, POE_PAR_GF, n, 12, 4.4, 0);
poeParWall(up, E[0], E[1], POE_PAR_GF, h, n, 12, 12, POE_PAR_GF);
if (!POE.era) {
var o = [n[0] * 0.32, n[1] * 0.32], A0 = [E[0][0] + o[0], E[0][1] + o[1]], A1 = [E[1][0] + o[0], E[1][1] + o[1]];
poeParWall(B.pw, A0, A1, h - 0.42, h, n, 2, 2);
B.pw.q([E[1][0], h - 0.42, E[1][1]], [E[0][0], h - 0.42, E[0][1]], [A0[0], h - 0.42, A0[1]], [A1[0], h - 0.42, A1[1]], [0, -1, 0], 0, 0, 1, 0.3);
var by = POE_PAR_GF + 3.0, ob = [n[0] * 0.55, n[1] * 0.55], B0 = [E[0][0] + ob[0], E[0][1] + ob[1]], B1 = [E[1][0] + ob[0], E[1][1] + ob[1]];
B.pw.q([E[1][0], by, E[1][1]], [E[0][0], by, E[0][1]], [B0[0], by, B0[1]], [B1[0], by, B1[1]], [0, -1, 0], 0, 0, 1, 0.5);
B.pw.q([B0[0], by + 0.12, B0[1]], [B1[0], by + 0.12, B1[1]], [E[1][0], by + 0.12, E[1][1]], [E[0][0], by + 0.12, E[0][1]], [0, 1, 0], 0, 0, 1, 0.5);
poeParWall(B.pw, B0, B1, by, by + 0.12, n, 2, 2);
poeParWall(B.bl, B0, B1, by + 0.12, by + 1.05, n, 12, 0.93, by + 0.12);
}
var hs = poeParHash(x * 3 + i, z * 7);
if (nt === 0 && hs % 11 === 0) {
var c0 = [E[0][0] * 0.15 + E[1][0] * 0.85 + n[0] * 0.04, E[0][1] * 0.15 + E[1][1] * 0.85 + n[1] * 0.04], c1 = [E[0][0] * 0.85 + E[1][0] * 0.15 + n[0] * 0.04, E[0][1] * 0.85 + E[1][1] * 0.15 + n[1] * 0.04];
var big = hs % 3 === 0;
poeParWall(B.dr, c0, c1, 0, big ? 3.6 : 2.7, n, 0.7 * (big ? 1.2 : 1), big ? 3.6 : 2.7);
K.doors.push({ x: x + 0.5 + n[0] * 1.1, z: z + 0.5 + n[1] * 1.1, ry: Math.atan2(n[0], n[1]), seed: hs, h: h, big: big });
}
else if (nt === 0 && hs % 23 === 5) {
var lpx = x + 0.5 + n[0] * 1.1 - x0, lpz = z + 0.5 + n[1] * 1.1 - z0, ly = 4.9;
poeParBox(B.ir, lpx - n[0] * 0.55, ly + 0.55, lpz - n[1] * 0.55, Math.abs(n[0]) * 1.1 + 0.06, 0.06, Math.abs(n[1]) * 1.1 + 0.06);
poeParBox(B.lp, lpx, ly, lpz, 0.32, 0.5, 0.32);
poeParBox(B.ir, lpx, ly + 0.5, lpz, 0.42, 0.1, 0.42);
K.lamps.push([lpx, ly + 0.25, lpz]);
}
poeParMansardQ(B.mn, E, h, n);
}
else {
poeParWall(up, E[0], E[1], y0, h, n, 12, 12, 0);
poeParMansardQ(B.mn, E, h, n);
}
}
if (cut)
B.zn.q(cut.roof[0], cut.roof[1], cut.roof[2], cut.roof[2], [0, 1, 0], 0, 0, 0.33, 0.33);
else
B.zn.q([lx, cap, lz + 1], [lx + 1, cap, lz + 1], [lx + 1, cap, lz], [lx, cap, lz], [0, 1, 0], x / 3, -(z + 1) / 3, (x + 1) / 3, -z / 3);
var ph = poeParHash(Math.floor((x + 3) / 9) * 5 + 1, Math.floor((z + 5) / 9) * 3 + 2);
if (((x + 3) % 9 + 9) % 9 === 4 && ((z + 5) % 9 + 9) % 9 === (ph % 5) + 2 && T(x + 1, z) === 1 && T(x - 1, z) === 1 && T(x, z + 1) === 1 && T(x, z - 1) === 1) {
poeParBox(B.pw, lx + 0.5, cap, lz + 0.5, 1.6, 1.7, 0.9, 6);
for (var cp = 0; cp < 3; cp++)
poeParBox(B.ir, lx - 0.1 + cp * 0.6, cap + 1.7, lz + 0.5, 0.22, 0.45, 0.22);
}
continue;
}
if (t === 3)
continue;
for (i = 0; i < 4; i++) {
var d2 = POE_PAR_D[i];
if (T(x + d2[0], z + d2[1]) !== 3)
continue;
var E2 = poeParEdge(lx, lz, i);
if (t === 4)
poeParWall(B.ar, E2[0], E2[1], -3.1, 0, d2, 8, 8, -3.1);
else
poeParWall(B.qw, E2[0], E2[1], -3.1, 0, d2, 4, 4, -3.1);
var o2 = [-d2[0] * 0.45, -d2[1] * 0.45], P0 = [E2[0][0] + o2[0], E2[0][1] + o2[1]], P1 = [E2[1][0] + o2[0], E2[1][1] + o2[1]];
poeParWall(B.qw, E2[0], E2[1], 0, 1.0, d2, 4, 4, 0);
poeParWall(B.qw, P1, P0, 0, 1.0, [-d2[0], -d2[1]], 4, 4, 0);
B.br.q([P0[0], 1.0, P0[1]], [E2[0][0], 1.0, E2[0][1]], [E2[1][0], 1.0, E2[1][1]], [P1[0], 1.0, P1[1]], [0, 1, 0], 0, 0, 1, 0.3);
K.wall = 1;
}
var hs2 = poeParHash(x, z);
if (t === 2 && hs2 % 97 === 0 && !(typeof poeParNoTree === "function" && poeParNoTree(x, z)) && T(x + 2, z) === 2 && T(x - 2, z) === 2 && T(x, z + 2) === 2 && T(x, z - 2) === 2)
K.trees.push([x + 0.5 - x0, z + 0.5 - z0, hs2]);
else if (t === 0 && hs2 % 997 === 3 && T(x + 3, z) === 0 && T(x - 3, z) === 0 && T(x, z + 3) === 0 && T(x, z - 3) === 0) {
poeParBox(B.ir, lx + 0.5, 0, lz + 0.5, 0.16, 3.6, 0.16);
poeParBox(B.lp, lx + 0.5, 3.6, lz + 0.5, 0.36, 0.5, 0.36);
poeParBox(B.ir, lx + 0.5, 4.1, lz + 0.5, 0.46, 0.12, 0.46);
K.lamps.push([lx + 0.5, 3.85, lz + 0.5]);
}
}
G.ox = G.oz = 0;
if (!any) {
K.empty = 1;
return K;
}
var g = new THREE.Group();
g.position.set(x0, 0, z0);
R.g.add(g);
K.g = g;
B.st.mesh(poeParMat("setts"), g);
B.br.mesh(poeParMat("quayflag", 0xC8C0B0), g);
B.gd.mesh(poeParMat("garden"), g);
var wm = B.wt.mesh(poeParMat("water"), g);
B.qw.mesh(poeParMat("quaywall"), g);
B.ar.mesh(poeParMat("arches"), g);
B.pw.mesh(poeParMat("party"), g);
B.zn.mesh(poeParMat("zinc"), g);
B.mn.mesh(poeParMat("man"), g);
K.det = [B.bl.mesh(poeParMat("bal"), g), B.dr.mesh(poeParMat("door"), g), B.ir.mesh(poeParMat("iron"), g), B.lp.mesh(poeParMat("lamp"), g)].filter(Boolean);
B.up.forEach(function (b, j) { b.mesh(poeParMat("up" + j, [0xFFFFFF, 0xF0E4CC, 0xE0DCD4][j]), g); });
B.gf.forEach(function (b, j) { b.mesh(poeParMat("gf" + j), g); });
if (K.trees.length) {
if (!G.treeGeo) {
G.treeGeo = new THREE.CylinderGeometry(0.22, 0.32, 4.2, 6);
G.treeGeo.translate(0, 2.1, 0);
G.crownGeo = new THREE.IcosahedronGeometry(2.8, 1);
G.crownGeo.translate(0, 6.2, 0);
G.treeMat = poeC(0x2A2218);
G.crownMat = new THREE.MeshLambertMaterial({ color: 0x1E2A18 });
}
var n = K.trees.length, tr = new THREE.InstancedMesh(G.treeGeo, G.treeMat, n), cr = new THREE.InstancedMesh(G.crownGeo, G.crownMat, n), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S3 = new THREE.Vector3(), V = new THREE.Vector3();
K.trees.forEach(function (q, j) { var s = 0.8 + (q[2] % 7) * 0.08; V.set(q[0], 0, q[1]); S3.set(s, s * (0.9 + (q[2] % 5) * 0.06), s); M.compose(V, Q, S3); tr.setMatrixAt(j, M); cr.setMatrixAt(j, M); });
tr.userData.keepGeo = cr.userData.keepGeo = 1;
g.add(tr);
g.add(cr);
K.det.push(tr, cr);
}
if (K.lamps.length) {
var pts = wPoints(K.lamps.length, function (j) { return K.lamps[j]; }, 0xFFB860, lite ? 3.0 : 3.6, true);
pts.material.map = typeof softGlow === "function" ? softGlow() : null;
pts.material.blending = THREE.AdditiveBlending;
pts.material.opacity = 0.8;
g.add(pts);
}
return K;
},
function (B, E, h, n) {
var ins = POE_PAR.ins || 1.5, rise = POE_PAR.rise || 2.6, p0 = E[0], p1 = E[1], q0 = [p0[0] - n[0] * ins, p0[1] - n[1] * ins], q1 = [p1[0] - n[0] * ins, p1[1] - n[1] * ins], ox = POE_PAR.ox || 0, oz = POE_PAR.oz || 0, u0 = ((p0[0] + ox) * n[1] - (p0[1] + oz) * n[0]) / 12, u1 = ((p1[0] + ox) * n[1] - (p1[1] + oz) * n[0]) / 12, ny = 0.5, nn = 0.86;
B.q([p0[0], h, p0[1]], [p1[0], h, p1[1]], [q1[0], h + rise, q1[1]], [q0[0], h + rise, q0[1]], [n[0] * nn, ny, n[1] * nn], u0, 0, u1, 1);
},
function (max) {
var G = POE_PAR, P = poeParHere(), C = G.CH, pcx = Math.floor(P.x / C), pcz = Math.floor(P.z / C), rad = POE.lite ? 1 : 2, made = 0, k, dx, dz;
for (var ring = 0; ring <= rad; ring++)
for (dz = -ring; dz <= ring; dz++)
for (dx = -ring; dx <= ring; dx++) {
if (Math.max(Math.abs(dx), Math.abs(dz)) !== ring)
continue;
k = (pcx + dx) + "," + (pcz + dz);
if (G.chunks[k] || made >= max)
continue;
var K = poeParChunk(pcx + dx, pcz + dz);
if (K) {
G.chunks[k] = K;
if (!K.empty)
made++;
}
}
for (k in G.chunks) {
var Q = G.chunks[k];
if (Math.abs(Q.cx - pcx) > rad + 1 || Math.abs(Q.cz - pcz) > rad + 1) {
poeParDrop(Q);
delete G.chunks[k];
}
}
var tx = Math.floor((P.x - G.X0) / G.T), tz = Math.floor((P.z - G.Z0) / G.T);
if (!POE.ndView)
for (k in G.data) {
var q = k.split("_");
if (Math.abs(q[0] - tx) > 1 || Math.abs(q[1] - tz) > 1)
delete G.data[k];
}
return made;
},
function (R, g) {
var lite = POE.lite, st = poeParLit(poeS("stone", 0xD8D0BC)), dk = poeParLit(poeS("stone", 0x9A9284)), lead = poeShine(0x2A2E34, 0.6, 0.5), gold = poeShine(0xD8A848, 0.3, 0.85), bronze = poeShine(0x3A3A2A, 0.5, 0.7), seg = lite ? 14 : 24;
function grp(p, ry) { var q = poeGrp(g, p[0], 0, p[1], ry || 0); return q; }
function solid(p, w, d, h, ry) { poeSolid(R.x + p[0], p[1], w, d, -2, h, ry || 0); }
function dome(P, r, y, mat, sx) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.round(seg / 2), 0, Math.PI * 2, 0, Math.PI / 2), mat); m.position.y = y; if (sx)
m.scale.y = sx; P.add(m); return m; }
function colRing(P, r, y, h, n, cr) { for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
poeCyl(P, cr, cr * 1.1, h, st, Math.cos(a) * r, y + h / 2, Math.sin(a) * r, 8);
} }
function lantern(P, y, s) { poeCyl(P, 1.2 * s, 1.4 * s, 3 * s, st, 0, y + 1.5 * s, 0, 10); var c = new THREE.Mesh(new THREE.ConeGeometry(1.3 * s, 3 * s, 10), lead); c.position.y = y + 4.5 * s; P.add(c); poeSph(P, 0.4 * s, gold, 0, y + 6.2 * s, 0, 8); }
function glow(P, x, y, z, col, s) { var q = wGlow(col || 0xFFB860, s || 3, 0.7); q.position.set(x, y, z); P.add(q); }
(function () { var C = POE_PAR_MON.nd, F = POE_PAR_MON.ndFront, a = Math.atan2(C[1] - F[1], C[0] - F[0]), q = grp(C, -a); poeNdOutside(R, q, C, a, solid); solid(C, 128, 50, 70, -a); })();
(function () {
var P = grp(POE_PAR_MON.pantheon, 0);
poeBox(P, 84, 30, 34, st, 0, 15, 0);
poeBox(P, 34, 30, 84, st, 0, 15, 0);
poeBox(P, 20, 22, 36, st, -50, 11, 0);
for (var c = 0; c < 6; c++)
poeCyl(P, 0.9, 1.0, 19, st, -59, 9.5, -12.5 + c * 5, 10);
var pd = poeRoof(P, 8, 36, 5, 19, st);
pd.rotation.y = Math.PI / 2;
pd.position.x = -57;
poeCyl(P, 17, 17, 6, st, 0, 33, 0, seg);
poeCyl(P, 13.5, 13.5, 16, st, 0, 44, 0, seg);
if (!lite)
colRing(P, 15.5, 36, 13, 24, 0.7);
poeCyl(P, 16.5, 16.5, 1.4, st, 0, 49.7, 0, seg);
poeCyl(P, 12.5, 12.5, 6, st, 0, 53, 0, seg);
dome(P, 12.5, 56, lead);
lantern(P, 68, 1.4);
solid(POE_PAR_MON.pantheon, 86, 86, 80);
})();
(function () {
var P = grp(POE_PAR_MON.invalides, 0);
poeBox(P, 50, 26, 50, st, 0, 13, 0);
poeCyl(P, 15, 15, 22, st, 0, 37, 0, seg);
if (!lite)
colRing(P, 16.2, 26, 18, 20, 0.7);
var dm = dome(P, 15, 48, gold, 1.35);
poeCyl(P, 3, 3.4, 8, gold, 0, 72, 0, 12);
var sp = new THREE.Mesh(new THREE.ConeGeometry(1.6, 12, 10), gold);
sp.position.y = 82;
P.add(sp);
poeSph(P, 0.7, gold, 0, 88.5, 0, 8);
solid(POE_PAR_MON.invalides, 52, 52, 90);
})();
[[POE_PAR_MON.valdegrace, 9, 22, lead], [POE_PAR_MON.sorbonne, 6, 18, lead]].forEach(function (D) { var P = grp(D[0], 0), r = D[1]; poeBox(P, r * 3, D[2], r * 3, st, 0, D[2] / 2, 0); poeCyl(P, r, r, r * 1.3, st, 0, D[2] + r * 0.65, 0, seg); dome(P, r, D[2] + r * 1.3, D[3], 1.2); lantern(P, D[2] + r * 2.5, r / 9); solid(D[0], r * 3, r * 3, D[2] + r * 3); });
(function () {
var P = grp(POE_PAR_MON.stsulpice, 0);
poeBox(P, 100, 30, 26, st, 6, 15, 0);
poeBox(P, 100, 20, 44, st, 6, 10, 0);
var rf = poeRoof(P, 100, 26, 7, 30, lead);
rf.position.x = 6;
poeBox(P, 14, 32, 58, st, -50, 16, 0);
for (var c = 0; c < 8; c++)
poeCyl(P, 0.8, 0.9, 13, st, -57.5, 6.5, -24.5 + c * 7, 10);
for (var c2 = 0; c2 < 8; c2++)
poeCyl(P, 0.7, 0.8, 11, st, -57.5, 20, -24.5 + c2 * 7, 10);
[-1, 1].forEach(function (s) { poeBox(P, 12, 22, 12, st, -50, 43, s * 22); poeCyl(P, 5.5, 5.5, 10, st, -50, 59, s * 22, 16); poeCyl(P, 4.5, 4.8, 4, st, -50, 66, s * 22, 16); });
solid(POE_PAR_MON.stsulpice, 116, 58, 70);
})();
(function () { var P = grp(POE_PAR_MON.stjacques, 0), gt = poeS("gothic", 0xC0B8A4); poeBox(P, 10, 46, 10, gt, 0, 23, 0); [-1, 1].forEach(function (a) { [-1, 1].forEach(function (b) { poeBox(P, 1.6, 50, 1.6, gt, a * 5, 25, b * 5); poeCone(P, 0.9, 4, gt, a * 5, 52, b * 5); }); }); solid(POE_PAR_MON.stjacques, 12, 12, 52); })();
(function () {
var P = grp(POE_PAR_MON.observatory, 0);
poeBox(P, 44, 22, 24, st, 0, 11, 0);
[-1, 1].forEach(function (s) { poeBox(P, 10, 24, 10, st, s * 21, 12, 4); });
poeCyl(P, 5, 5, 4, st, 0, 24, 0, 16);
dome(P, 5, 26, lead);
solid(POE_PAR_MON.observatory, 46, 28, 30);
var sg = wSign(["OBSERVATOIRE ROYAL"], 8, 0.9, "#C8C0AC", "#2A2420");
sg.position.set(0, 9, -12.1);
sg.rotation.y = Math.PI;
P.add(sg);
})();
(function () {
var E = POE_PAR_MON.enfer;
[-1, 1].forEach(function (s) {
var P = grp([E[0] + s * 26, E[1]], 0);
poeBox(P, 14, 9, 14, st, 0, 4.5, 0);
poeBox(P, 15, 1.4, 15, dk, 0, 9.7, 0);
for (var f = 0; f < 12; f++)
poeBox(P, 0.8, 1.0, 0.3, poeC(0x5A5244), -6 + f * 1.1, 8.3, -7.1);
for (var c = 0; c < 4; c++)
poeCyl(P, 0.45, 0.5, 6, st, -4.5 + c * 3, 3, -7.6, 10);
poeBox(P, 15, 0.8, 1.6, st, 0, 6.4, -7.6);
solid([E[0] + s * 26, E[1]], 15, 16, 12);
var sg = wSign([s < 0 ? "BARRIÈRE D’ENFER · ENTRÉE DES CATACOMBES" : "BARRIÈRE D’ENFER · OCTROI DE PARIS"], 8, 0.6, "#C8C0AC", "#2A2420");
sg.position.set(0, 8.0, -7.25);
sg.rotation.y = Math.PI;
P.add(sg);
glow(P, -3.5, 4.5, -8, 0xFFB860, 3);
glow(P, 3.5, 4.5, -8, 0xFFB860, 3);
});
var dr = poeFace(g, 1.6, 2.8, poeC(0x0E0C0A), E[0] - 26, 1.4, E[1] - 7.05, Math.PI);
poeSpot(R.x + E[0] - 26, E[1] - 8.6, 2.4, "The stair down to the Catacombs (Barrière d’Enfer)", "go down", function () { poeEnterRoom("x_cat", "out:x_cat"); }, 0);
})();
(function () {
var V = grp(POE_PAR_MON.vendome, 0);
poeBox(V, 6, 5, 6, bronze, 0, 2.5, 0);
poeCyl(V, 1.8, 1.9, 36, bronze, 0, 23, 0, 16);
poeBox(V, 3.6, 1.2, 3.6, bronze, 0, 41.6, 0);
poeCyl(V, 0.9, 0.9, 1.6, bronze, 0, 43, 0, 10);
poeParStatue(V, 43.8, 1.9, bronze);
solid(POE_PAR_MON.vendome, 6.4, 6.4, 45);
var J = grp(POE_PAR_MON.july, 0);
poeCyl(J, 5, 5, 3, st, 0, 1.5, 0, 20);
poeBox(J, 6, 6, 6, bronze, 0, 6, 0);
poeCyl(J, 1.9, 2.0, 38, bronze, 0, 28, 0, 16);
for (var r = 0; r < 4; r++)
poeCyl(J, 2.2, 2.2, 0.5, gold, 0, 14 + r * 9, 0, 16);
poeCyl(J, 2.4, 2.4, 1.5, bronze, 0, 47.5, 0, 16);
var gn = poeSph(J, 0.9, gold, 0, 51, 0, 10);
poeCone(J, 0.7, 2.8, gold, 0, 49.6, 0);
var wg = poeBox(J, 3.2, 1.2, 0.12, gold, 0, 51.3, 0);
wg.rotation.z = 0.3;
solid(POE_PAR_MON.july, 10, 10, 52);
var O = grp(POE_PAR_MON.obelisk, 0);
poeBox(O, 4.2, 4, 4.2, st, 0, 2, 0);
var ob = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.75, 22.8, 4), poeS("stone", 0xC8A890));
ob.rotation.y = Math.PI / 4;
ob.position.y = 15.4;
O.add(ob);
var py = new THREE.Mesh(new THREE.ConeGeometry(1.3, 1.8, 4), poeS("stone", 0xC8A890));
py.rotation.y = Math.PI / 4;
py.position.y = 27.7;
O.add(py);
solid(POE_PAR_MON.obelisk, 5, 5, 30);
var H = grp(POE_PAR_MON.henri4, 0);
poeBox(H, 4, 4, 7, st, 0, 2, 0);
var hb = poeGrp(H, 0, 4, 0);
poeBox(hb, 1.2, 1.4, 3.2, bronze, 0, 2.2, 0);
[[-0.4, -1.2], [0.4, -1.2], [-0.4, 1.2], [0.4, 1.2]].forEach(function (l) { poeCyl(hb, 0.16, 0.14, 1.6, bronze, l[0], 0.8, l[1], 6); });
var nk = poeBox(hb, 0.6, 1.4, 0.7, bronze, 0, 3.2, -1.6);
nk.rotation.x = -0.5;
poeBox(hb, 0.5, 0.6, 1.0, bronze, 0, 3.8, -2.1);
poeParStatue(hb, 2.6, 1.1, bronze);
solid(POE_PAR_MON.henri4, 4.4, 7.4, 10);
[V, J, O, H].forEach(function (M) { glow(M, 0, 5, 4, 0xFFB860, 4); });
})();
},
function (R, g) {
var lite = POE.lite, A = POE_PAR_AT;
poeFloor(R.x + 500, -2250, 9000, 7500, 0, true);
R.env = "town";
R.fog = lite ? 0.03 : 0.018;
R.city = 1;
R.block = function (wx, wz) { var sx = wx - R.x, sz = wz, r = 0.25; for (var a = -1; a <= 1; a += 2)
for (var b = -1; b <= 1; b += 2) {
var t = poeParT(sx + a * r, sz + b * r);
if (t === -1 || !poeParWalk(t))
return true;
} return false; };
var c0 = g.children.length;
poeParMonuments(R, g);
for (var k in POE_PAR_DOORS) {
(function (k) {
var D = A[k];
if (!D)
return;
var to = k === "r_cafe2" ? "r_cafe" : k, E = POE.exits["out:" + k], n = D.n, ex = D.b[0] + 0.5 + n[0] * 0.56, ez = D.b[1] + 0.5 + n[1] * 0.56, ry = Math.atan2(n[0], n[1]);
var dg = poeGrp(g, ex, 0, ez, ry);
poeBox(dg, 1.9, 3.3, 0.3, poeS("stone", 0xD8D0BC), 0, 1.65, -0.1);
poeBox(dg, 1.5, 3.0, 0.1, poeS("oak", k === "r_pref" ? 0x3A3A4A : 0x4A2A1A), 0, 1.5, 0.05);
poeBox(dg, 0.4, 0.55, 0.4, poeGlowM(0xFFC070), 1.25, 3.2, 0.35);
var sg = wSign([k === "r_dupin" ? "RUE DUNÔT · 33" : k === "r_house" || k === "r_cafe" || k === "r_cafe2" ? "RUE MORGUE" : k === "r_pref" ? "PRÉFECTURE DE POLICE" : "LIBRAIRIE · RUE MONTMARTRE"], 2.6, 0.42, "#E8E4D8", "#1A1814");
sg.position.set(0, 3.9, 0.12);
dg.add(sg);
poeSpot(R.x + D.b[0] + 0.5 + n[0] * 1.6, D.b[1] + 0.5 + n[1] * 1.6, 2.3, POE_PAR_DOORS[k], "go in", function () { poeEnterRoom(to, "out:" + k); }, 0);
})(k);
}
if (POE.rod) {
var rod = POE.rod;
poeCyl(g, 0.03, 0.03, 19, poeShine(0x5A5A5A, 0.4, 0.8), rod.x - R.x, 9.5, rod.z, 6);
poeSpot(rod.x + rod.n[0] * 0.9, rod.z + rod.n[1] * 0.9, 1.8, "The lightning-rod", "look at it closely", function () { poeHook("rod"); }, 0);
}
(function () {
var M = POE_PAR_MON.menagerie, jg = poeGrp(g, M[0], 0, M[1]);
poePlane(jg, 40, 30, poeS("earth", 0xB0A080), 0, 0.03, 4, 0);
var cage = poeGrp(jg, 0, 0.05, 6);
poeBox(cage, 8, 0.3, 6, poeS("stone", 0xA8A090), 0, 0.15, 0);
for (var cb = 0; cb < 14; cb++) {
poeCyl(cage, 0.05, 0.05, 4, poeShine(0x1A1A1A, 0.5, 0.8), -4 + cb * 0.6, 2.2, 3, 5);
poeCyl(cage, 0.05, 0.05, 4, poeShine(0x1A1A1A, 0.5, 0.8), -4 + cb * 0.6, 2.2, -3, 5);
}
poeBox(cage, 8.2, 0.2, 6.2, poeShine(0x1A1A1A, 0.5, 0.8), 0, 4.2, 0);
poeSolid(R.x + M[0], M[1] + 6, 8.4, 6.4, -2, 5);
POE.cage.g = cage;
var sg = wSign(["JARDIN DU ROI · LA MÉNAGERIE"], 4, 0.6, "#1A1E14", "#E8E0C0");
sg.position.set(0, 3, -9);
jg.add(sg);
var gl = wGlow(0xFFB860, 4, 0.6);
gl.position.set(0, 4, -8);
jg.add(gl);
})();
(function () {
var D = A.flamel;
if (!D)
return;
var n = D.n, ry = Math.atan2(n[0], n[1]), fg = poeGrp(g, D.b[0] + 0.5 + n[0] * 0.62, 0, D.b[1] + 0.5 + n[1] * 0.62, ry), ds = poeS("stone", 0xA8A090);
poeBox(fg, 9, 12, 0.5, ds, 0, 6, -0.2);
for (var p = 0; p < 4; p++) {
poeBox(fg, 0.6, 12, 0.4, ds, -4.2 + p * 2.8, 6, 0.1);
}
for (var w = 0; w < 3; w++) {
poeFace(fg, 1.2, 1.6, poeGlowM(w === 1 ? 0xE8A858 : 0x1A1E24), -2.8 + w * 2.8, 7.2, 0.06, 0);
poeFace(fg, 1.2, 1.6, poeGlowM(0x1A1E24), -2.8 + w * 2.8, 10, 0.06, 0);
}
poeBox(fg, 1.6, 2.8, 0.12, poeS("oak", 0x3A2414), -2.8, 1.4, 0.05);
poeBox(fg, 1.6, 2.8, 0.12, poeS("oak", 0x3A2414), 2.8, 1.4, 0.05);
poeFace(fg, 2.4, 2.6, poeGlowM(0xE8A858), 0, 1.4, 0.05, 0);
var ins = wSign(["NOUS HOMES ET FEMES LABOUREURS DEMOURANS OU PORCHE DE CESTE MAISON QUI FU FAITE EN L’AN DE GRACE MIL QUATRE CENS ET SEPT", "SOMES TENUS CHASCUN EN DROIT SOY DIRE TOUS LES JOURS UNE PATENOSTRE ET UN AVE MARIA EN PRIANT DIEU QUE SA GRACE FACE PARDON AUS POVRES PESCHEURS TRESPASSEZ. AMEN"], 8.6, 0.9, "#A8A090", "#2A2018");
ins.position.set(0, 3.4, 0.32);
fg.add(ins);
var nf = wSign(["N · F"], 0.9, 0.5, "#A8A090", "#2A2018");
nf.position.set(-2.8, 5.1, 0.32);
fg.add(nf);
var nf2 = nf.clone();
nf2.position.x = 2.8;
fg.add(nf2);
var sg = wSign(["RUE DE MONTMORENCY · 51"], 2.6, 0.42, "#E8E4D8", "#1A1814");
sg.position.set(4.4, 4.6, 0.34);
fg.add(sg);
var gl = wGlow(0xFFB860, 3.5, 0.6);
gl.position.set(0, 3.2, 1.2);
fg.add(gl);
poeSpot(R.x + D.b[0] + 0.5 + n[0] * 1.8, D.b[1] + 0.5 + n[1] * 1.8, 2.6, "The house of Nicolas Flamel (51 Rue de Montmorency, 1407)", "go in", function () { poeParHouseEnter({ x: D.b[0] + 0.5 + n[0] * 1.6, z: D.b[1] + 0.5 + n[1] * 1.6, ry: ry, seed: 1407, kind: "flamel" }); }, 0);
POE.exits["out:par_flamel"] = poeParExit(D.b[0], D.b[1], n);
})();
(function () {
var D = A.morgue;
if (!D)
return;
var n = D.n, ry = Math.atan2(n[0], n[1]), mg = poeGrp(g, D.b[0] + 0.5 + n[0] * 0.56, 0, D.b[1] + 0.5 + n[1] * 0.56, ry);
poeBox(mg, 2.2, 3.2, 0.12, poeC(0x1A1A1A), 0, 1.6, 0.05);
var sg = wSign(["LA MORGUE"], 2.4, 0.5, "#E8E4D8", "#1A1814");
sg.position.set(0, 3.8, 0.12);
mg.add(sg);
poeSpot(R.x + D.b[0] + 0.5 + n[0] * 1.6, D.b[1] + 0.5 + n[1] * 1.6, 2.3, "The Morgue (Marché-Neuf)", "go in", function () { poeParHouseEnter({ x: D.b[0] + 0.5 + n[0] * 1.6, z: D.b[1] + 0.5 + n[1] * 1.6, ry: ry, seed: 1804, kind: "morgue" }); }, 0);
})();
R.mons = g.children.slice(c0);
(A.stairs || []).forEach(function (p, i) {
if (!i)
return;
var sg = poeGrp(g, p[0] + 0.5, 0, p[1] + 0.5);
poeBox(sg, 1.3, 0.06, 1.3, poeShine(0x2A2622, 0.7, 0.6), 0, 0.03, 0);
poeBox(sg, 1.1, 0.02, 0.06, poeC(0x141210), 0, 0.07, 0);
if (!lite) {
var gl = wGlow(0xFFB860, 1.4, 0.5);
gl.position.set(0, 1.2, 0);
sg.add(gl);
}
poeSpot(R.x + p[0] + 0.5, p[1] + 0.5, 1.6, "A stair of the Inspection des Carrières (down to the quarries)", "go down", function () { var S = poeCS(); S.stair = i; poeSave(); poeEnterRoom("x_cat", "plan"); }, 0);
});
R.plights = [];
for (var i = 0; i < (lite ? 2 : 4); i++) {
var L = new THREE.PointLight(0xFFB868, 0, 26, 2);
L.position.set(0, 4, 0);
g.add(L);
R.plights.push(L);
}
R.dspot = poeSpot(1e9, 0, 1.8, "A house of Paris", "go in", function () { if (R.dnear)
poeParHouseEnter(R.dnear); }, 0);
R.tick = poeParTick;
R.banner = function () { var P = poeParHere(), w = poeParWhere(P); return "Paris, 1841 · near " + (w || "the Seine") + (R.dnear ? " · No. " + (1 + R.dnear.seed % 120) : ""); };
R.start = { x: POE_PAR_MON.enfer[0], z: POE_PAR_MON.enfer[1] - 18, ry: 0 };
R.onEnter = function (from) { var pv = POE.parPrev; POE.parPrev = null; if (pv && pv !== R && pv.onLeave)
try {
pv.onLeave();
}
catch (e) { } POE.dim = false; POE.black = false; R.lt = 0; poeParAround(99); poeSfx("rainoff"); if (typeof poeParFolkStart === "function")
poeParFolkStart(R); var S = poeParS(); if (!S.seen) {
S.seen = 1;
poeSave();
poeCard("Paris, 1841", "<p>The city as Poe knew it, at its true size: every street and every house front from the great survey of Th. Jacoubet (1827 to 1836). Every door opens. The tale of the Rue Morgue walks these streets.</p><p>Dupin’s house is in the Faubourg Saint-Germain. The Rue Morgue is in the Quartier Saint-Roch. Nicolas Flamel’s house is at 51 Rue de Montmorency. Under your feet are the Catacombs: their stair is in the western pavilion of the Barrière d’Enfer, and every stair of the quarries comes up in its own street.</p>", [["Walk on", ""]]);
} };
R.onLeave = function () { R.plights.forEach(function (L) { L.intensity = 0; }); if (typeof poeParFolkStop === "function")
poeParFolkStop(); for (var k in POE_PAR.chunks) {
poeParDrop(POE_PAR.chunks[k]);
} POE_PAR.chunks = {}; POE_PAR.data = {}; };
},
function (dt) {
var R = POE_RX.x_paris, G = POE_PAR;
if (POE.room !== R)
return;
poeParAround(1);
R.lt = (R.lt || 0) - dt;
if (R.lt > 0)
return;
R.lt = 0.35;
var P = poeParHere();
var lamps = [], best = null, bd = 2.6 * 2.6;
for (var k in G.chunks) {
var K = G.chunks[k];
if (!K.g)
continue;
var ox = K.cx * G.CH, oz = K.cz * G.CH;
if (Math.abs(ox + G.CH / 2 - P.x) < 60 && Math.abs(oz + G.CH / 2 - P.z) < 60)
K.lamps.forEach(function (l) { var d = (ox + l[0] - P.x) * (ox + l[0] - P.x) + (oz + l[2] - P.z) * (oz + l[2] - P.z); lamps.push([d, ox + l[0], l[1], oz + l[2]]); });
K.doors.forEach(function (D) { var d = (D.x - P.x) * (D.x - P.x) + (D.z - P.z) * (D.z - P.z); if (d < bd) {
bd = d;
best = D;
} });
}
var far = POE.lite ? 150 : 240;
(R.mons || []).forEach(function (m) { var dx = m.position.x - P.x, dz = m.position.z - P.z; m.visible = dx * dx + dz * dz < far * far; });
for (var kk in G.chunks) {
var KK = G.chunks[kk];
if (KK.g) {
var cx2 = KK.cx * G.CH + G.CH / 2 - P.x, cz2 = KK.cz * G.CH + G.CH / 2 - P.z, d2 = cx2 * cx2 + cz2 * cz2;
KK.g.visible = d2 < (POE.lite ? 78 * 78 : 104 * 104);
var nearD = d2 < (POE.lite ? 44 * 44 : 62 * 62);
(KK.det || []).forEach(function (m) { m.visible = nearD; });
}
}
lamps.sort(function (a, b) { return a[0] - b[0]; });
R.plights.forEach(function (L, i) { var q = lamps[i]; if (q && q[0] < 70 * 70) {
L.position.set(q[1], q[2] - 0.3, q[3]);
L.intensity = POE.lite ? 1.6 : 1.3;
}
else
L.intensity = 0; });
R.dnear = best;
if (best) {
R.dspot.x = R.x + best.x;
R.dspot.z = best.z;
R.dspot.name = poeParHouseName(best);
}
else
R.dspot.x = 1e9;
},
function (R) {
var M = R.mine || {};
["spots", "floors", "solids", "people", "lights", "anim", "flames"].forEach(function (k) { if (M[k] && M[k].length)
POE[k] = POE[k].filter(function (o) { return M[k].indexOf(o) < 0; }); });
if (M.people && M.people.length)
POE.talk = POE.talk.filter(function (T) { return M.people.indexOf(T.p) < 0; });
while (R.g.children.length) {
var c = R.g.children[0];
R.g.remove(c);
c.traverse(function (o) { if (o.geometry && !o.userData.keepGeo)
o.geometry.dispose(); });
}
R.mine = { spots: [], floors: [], solids: [], people: [], lights: [], anim: [], flames: [] };
},
function (R, D, f) {
poeParHouseClear(R);
var I = poeParHouseInfo(D), g = R.g, M = R.mine, lite = POE.lite, rnd = wRand(I.seed * 7 + f * 131 + 3), kind = D.kind || "house";
var n0 = { flames: POE.flames.length, anim: POE.anim.length, spots: POE.spots.length, floors: POE.floors.length, solids: POE.solids.length, people: POE.people.length, lights: POE.lights.length };
var top = kind === "morgue" ? 0 : kind === "flamel" ? 1 : I.nf - 1, garret = kind === "house" && f === top, cls = f === 0 ? 0 : garret ? 6 : Math.min(5, f);
R.h = garret ? 2.7 : f === 1 ? 4.2 : f === 0 ? 4.0 : 3.4;
R.wall = kind === "morgue" ? "whitewash" : kind === "flamel" ? "stone" : f === 0 ? (I.shop ? "panel" : "stone") : f === 1 ? "damask" : f === 2 ? "stripe" : f <= 4 ? "sprig" : "whitewash";
R.wallCol = kind === "flamel" ? 0xB8B0A0 : f === 1 ? 0xE8D8C8 : f === 2 ? 0xD8D0C0 : f <= 4 ? 0xD0C8B8 : 0xC8C0B0;
R.floor = kind === "morgue" ? "tiles" : kind === "flamel" ? (f ? "boards" : "flags") : f === 0 ? (I.shop ? "boards" : "flags") : f <= 2 ? "parquet" : "boards";
R.ceil = kind === "flamel" ? "beams" : garret ? "beams" : f === 1 ? "coffer" : "plaster";
R.doors = [];
poeShell(R, g);
poeFloor(R.x, 0, R.w - 0.7, R.d - 0.7, 0, true);
var hw = R.w / 2, hd = R.d / 2;
var winN = kind === "morgue" ? 0 : 3;
for (var w = 0; w < winN; w++) {
var wx = -3.6 + w * 3.6;
if (f === 0 && w === 2)
continue;
var wy = garret ? 1.5 : 1.9, wh = garret ? 1.0 : (f === 1 ? 2.6 : 2.0), wg = poeGrp(g, wx, wy, hd - 0.04, Math.PI);
poeFace(wg, 1.2, wh, poeGlowM(0x1A2234), 0, 0, 0.01, 0);
poeBox(wg, 1.36, 0.08, 0.12, poeC(0xE8E0D0), 0, wh / 2, 0);
poeBox(wg, 1.36, 0.08, 0.12, poeC(0xE8E0D0), 0, -wh / 2, 0);
poeBox(wg, 0.05, wh, 0.06, poeC(0xE8E0D0), 0, 0, 0.02);
poeBox(wg, 1.2, 0.04, 0.06, poeC(0xE8E0D0), 0, wh * 0.2, 0.02);
var lg = wGlow(0xFFB860, 0.6, 0.5);
lg.position.set(0.3 - rnd() * 0.6, -0.2 + rnd() * 0.5, -0.2);
wg.add(lg);
if (f >= 1 && f <= 3)
poeCurtains(g, wx, wy + 0.1, hd - 0.12, Math.PI, 1.7, wh + 0.5, f === 1 ? 0x6A1A1A : f === 2 ? 0x3A4A2A : 0x8A7A5A);
}
var st = poeGrp(g, -hw + 1.0, 0, -hd + 0.4), wood = poeS("oak", 0x6A4A2A);
if (f < top)
for (var s = 0; s < 10; s++)
poeBox(st, 1.4, 0.3 * (s + 1), 0.3, wood, 0, 0.15 * (s + 1), 2.75 - s * 0.3);
else
poeBox(st, 1.4, 0.1, 1.4, wood, 0, 0.05, 1.0);
poeBox(st, 0.06, 1.0, 3.2, poeShine(0x1A1A1A, 0.5, 0.7), 0.75, 0.9 + (f < top ? 1.4 : 0), 0.2);
poeSolid(R.x - hw + 1.0, -hd + 1.8, 1.5, 3.1, -1, R.h);
var dn = f === 0 ? null : f - 1, upF = f < top ? f + 1 : null;
if (upF != null)
poeSpot(R.x - hw + 2.2, -hd + 2.6, 1.6, "The stair, up to " + POE_PAR_FLOOR[Math.min(6, upF === top && kind === "house" ? 6 : upF)], "go up", function () { poeParHouseFloor(upF, true); }, 0);
if (dn != null)
poeSpot(R.x - hw + 2.2, -hd + 3.4, 1.6, "The stair, down to " + POE_PAR_FLOOR[dn], "go down", function () { poeParHouseFloor(dn, false); }, 0);
if (f === 0) {
var dg = poeGrp(g, 3.6, 0, hd - 0.05, Math.PI);
poeBox(dg, 1.6, 2.9, 0.1, poeS("oak", 0x3A2414), 0, 1.45, 0);
poeFace(dg, 1.0, 0.5, poeGlowM(0x1A2234), 0, 2.5, -0.06, 0);
poeSpot(R.x + 3.6, hd - 1.0, 1.6, "The street door", "go out into the street", function () { poeParHouseOut(); }, 0);
}
var lamp = f === 1 ? 0xFFD8A0 : 0xFFB868;
var LL = poeLight(lamp, kind === "morgue" ? 1.4 : f === 1 ? 2.4 : 2.0, 16, 0, R.h - 1.0, 0, g, true);
if (LL)
LL.L.decay = 1.6;
var fill = new THREE.PointLight(lamp, 0.7, 15, 1.6);
fill.position.set(3, 2, 2);
g.add(fill);
function solid(x, z, w, d, h) { poeSolid(R.x + x, z, w, d, -1, h || 1.2); }
function person(i, x, z, ry, slot) {
var row = POE_PAR_WHO[cls] || POE_PAR_WHO[5], W = row[(slot != null ? slot : i) % row.length], sex = W[2], R2 = wRand(I.seed + f * 17 + i * 5);
var first = POE_PAR_FIRST[sex][Math.floor(R2() * POE_PAR_FIRST[sex].length)], last = POE_PAR_LAST[Math.floor(R2() * POE_PAR_LAST.length)], name = W[0] + " " + (W[0] === "Monsieur" && R2() < 0.5 ? last : first + " " + last);
if (f === 0 && I.shop && i === 0)
W = ["Monsieur", "gent", "m", "the " + I.shop.toLowerCase() + " keeper on the ground floor", "his trade (" + I.shop.toLowerCase() + "), his customers, the price of things, the gossip of the street"];
var P = poeRoomPerson(R, "ph" + I.seed + "_" + f + "_" + i, x, z, ry, { role: W[1], sex: sex, talk: { name: name, persona: name + ", " + W[3] + ", in house No. " + I.no + " near " + I.quarter + ", Paris, in the spring of 1841 (the time of Poe's Murders in the Rue Morgue). Night: the house is lit by oil lamps and candles. Speaks as a Parisian of that year and station, warmly or wearily, in English with a little French; talks about " + W[4] + "; knows the streets of the quarter; has heard of the dreadful murders in the Rue Morgue in the Quartier Saint-Roch. Never mentions anything after 1841.", greet: POE_PAR_GREET[(I.seed + f + i) % POE_PAR_GREET.length] } });
return P;
}
if (kind === "flamel")
poeParFlamelRich(R, g, f, person, solid);
else if (kind === "morgue")
poeParMorgueRoom(R, g, person, solid);
else if (f === 0 && I.shop) {
poeParShop(R, g, I, rnd, person, solid);
poeParShopDress(R, g, I, rnd);
}
else if (f === 0)
poeParLodgeRich(R, g, I, rnd, person, solid);
else
poeParFlatRich(R, g, cls, rnd, person, solid, garret);
["spots", "floors", "solids", "people", "lights", "anim", "flames"].forEach(function (k) { M[k] = POE[k].slice(n0[k]); });
R.banner = function () {
var H = POE.parHouse;
if (!H)
return "A house of Paris";
var I2 = poeParHouseInfo(H.D);
if (H.D.kind === "flamel")
return "The house of Nicolas Flamel, 51 Rue de Montmorency · " + (H.f ? "the upper room" : "the hall of the poor lodgers");
if (H.D.kind === "morgue")
return "The Morgue, Marché-Neuf";
return "House No. " + I2.no + ", near " + I2.quarter + " · " + POE_PAR_FLOOR[H.f === top ? 6 : Math.min(5, H.f)];
};
},
function (R, g, I, rnd, person, solid) {
var k = POE_PAR_SHOPKIND[I.shop] || "goods", hw = R.w / 2, hd = R.d / 2;
var c = poeGrp(g, 0.5, 0, -0.6);
poeBox(c, 5, 1.0, 0.8, poeS("oak", 0x5A3A1A), 0, 0.5, 0);
poeBox(c, 5.2, 0.06, 0.95, poeShine(0x2A1A10, 0.4, 0.1), 0, 1.03, 0);
solid(0.5, -0.6, 5.2, 1.0);
for (var s = 0; s < 3; s++) {
var sh = poeGrp(g, -0.5 + s * 2.6, 0, -hd + 0.3);
var cm = poeS("oak", 0x4A2A14);
poeBox(sh, 2.4, 2.8, 0.05, cm, 0, 1.4, -0.2);
poeBox(sh, 0.06, 2.8, 0.45, cm, -1.2, 1.4, 0);
poeBox(sh, 0.06, 2.8, 0.45, cm, 1.2, 1.4, 0);
poeBox(sh, 2.5, 0.1, 0.5, cm, 0, 2.85, 0);
for (var r = 0; r < 4; r++) {
poeBox(sh, 2.3, 0.04, 0.42, poeC(0x3A2010), 0, 0.4 + r * 0.7, 0.02);
for (var j = 0; j < 7; j++) {
var x = -1.0 + j * 0.33, y = 0.42 + r * 0.7;
if (k === "bread")
poeSph(sh, 0.12, poeC(0xB8803A), x, y + 0.1, 0.05, 8).scale.set(1.4, 0.7, 1);
else if (k === "wine" || k === "cafe")
poeBottle(sh, x, y, 0.05, [0x1A3A1A, 0x3A0A0A, 0x2A2A10][j % 3]);
else if (k === "books")
poeBox(sh, 0.06 + 0.04 * ((j + r) % 3), 0.3, 0.24, poeC([0x6A1A1A, 0x1A2A4A, 0x3A2A1A, 0x2A4A2A][(j + r) % 4]), x, y + 0.15, 0.05);
else if (k === "jars")
poeCyl(sh, 0.08, 0.09, 0.24, poeShine([0xE8E4DA, 0x2A4A6A, 0x6A3A1A][(j + r) % 3], 0.2, 0.1), x, y + 0.12, 0.05, 8);
else if (k === "clocks") {
if (j % 2 === 0)
poeClock(sh, x, 0.05, 0, false, y).g.scale.setScalar(0.25);
}
else
poeBox(sh, 0.22, 0.18 + 0.1 * ((j * 3 + r) % 3), 0.25, poeC([0x8A6A4A, 0xC8B898, 0x5A4A3A, 0xA8988A][(j + r) % 4]), x, y + 0.12, 0.05);
}
}
}
if (k === "cafe") {
for (var t = 0; t < 3; t++) {
poeTable(g, -3.6 + t * 3.0, 2.6, 1.0, 0.8, 0.74, 0, 0xE8E4DA);
poeChair(g, -3.6 + t * 3.0, 3.4, Math.PI, 0x6A1A1A);
poeChair(g, -3.6 + t * 3.0, 1.8, 0, 0x6A1A1A);
solid(-3.6 + t * 3.0, 2.6, 1.0, 0.8);
}
poeMirror(g, -hw + 0.06, 2.2, 0, Math.PI / 2, 2.4, 1.6);
}
else {
poeCask(g, -hw + 0.8, 0, 2.8, 0.9);
poeBox(g, 0.9, 0.7, 0.6, poeS("oak", 0x6A4A2A), hw - 1.0, 0.35, 2.6);
solid(hw - 1.0, 2.6, 0.9, 0.6);
}
[[0.9, 0.6], [-1.2, 0.5]].forEach(function (q) { poeLamp(g, q[0], 1.06, -0.6 + q[1] * 0); });
var sg = wSign([I.shop], 2.6, 0.42, "#1A1814", "#E8D8A8");
sg.position.set(0.5, 3.2, -hd + 0.08);
g.add(sg);
person(0, 0.5, -1.6, 0);
person(1, -1.6, 1.2, Math.PI * 0.8, rnd() < 0.5 ? 1 : 2);
},
function (R, g, person, solid) {
var hw = R.w / 2, hd = R.d / 2;
poeBox(g, R.w - 0.4, 1.0, 0.1, poeS("oak", 0x3A2A1A), 0, 0.5, 0.6);
poeBox(g, R.w - 0.4, 1.6, 0.04, poeGlowM(0x8A9AA8, 0.18), 0, 1.8, 0.6);
solid(0, 0.6, R.w - 0.4, 0.2, 2.6);
for (var s = 0; s < 4; s++) {
var sx = -4.2 + s * 2.8, sl = poeGrp(g, sx, 0, -2.6, 0.12);
poeBox(sl, 1.0, 0.8, 2.1, poeS("marble", 0x9A9A94), 0, 0.4, 0);
var sh = poeBox(sl, 0.8, 0.22, 1.8, poeC(0xD8D8D0), 0, 0.9, 0);
sh.scale.y = 1;
poeSph(sl, 0.16, poeC(0xD8D8D0), 0, 0.95, -0.75, 8);
}
for (var c = 0; c < 6; c++) {
var cg = poeGrp(g, -5 + c * 2, 2.6, -hd + 0.15);
poeBox(cg, 0.04, 0.04, 0.2, poeC(0x1A1A1A), 0, 0, 0.1);
poeBox(cg, 0.6, 1.0, 0.06, poeC([0x3A3A4A, 0x5A4A3A, 0x2A2A2A, 0x6A5A4A][c % 4]), 0, -0.55, 0.15);
}
poeSpot(R.x, 1.6, 2.2, "The partition of the Morgue", "look through", function () { poeCard("The Morgue", "<p>Behind the partition the unknown dead of the Seine lie on their slabs under sheets, a little water running over the stone; their clothes hang on the wall above them, so that some passer-by may know a coat or a shawl. All Paris comes here: workmen, mothers, the curious. Most go out without a word.</p>"); }, 0);
var P = poeRoomPerson(R, "morgueKeeper", 3.6, 2.6, Math.PI, { role: "servant", sex: "m", talk: { name: "The keeper of the Morgue", persona: "The keeper (greffier) of the Paris Morgue at the Marché-Neuf on the Île de la Cité, 1841. Calm, tired, matter-of-fact, kind to the grieving. He records the unknown dead taken from the Seine and shows them behind the partition so they can be recognised; he hangs their clothes on the wall. He has heard all about the Rue Morgue murders and the Gazette des Tribunaux. Never jokes about the dead. Never mentions anything after 1841.", greet: "Good evening. If you have come to look for someone, take your time. If you have come only to look, be quiet." } });
person(1, -2.4, 3.0, Math.PI * 0.9, 1);
},
function (R) {
var F = POE_PAR_F;
if (F.list.length) {
F.on = true;
F.list.forEach(function (W) { W.P.g.visible = true; W.t = 0; });
return;
}
var n = POE.lite ? 5 : 10;
F.on = true;
for (var i = 0; i < n; i++) {
var D = POE_PAR_FOLK[i % POE_PAR_FOLK.length], sex = D[2];
var P = poeRoomPerson(R, "pf" + i, 1e5, 0, 0, { role: D[1], sex: sex, r: 2.6, look: { _seed: 500 + i }, talk: { name: D[0], persona: D[0] + ": " + D[3] + ", in the streets of Paris at night in the spring of 1841 (the time of Poe's Murders in the Rue Morgue). Speaks as a Parisian of that year and station, in English with a little French, briefly, as one does to a stranger in the street; talks about " + D[4] + ". Knows the quarters of Paris well and can give directions to the great places (Notre-Dame, the Palais-Royal, the Louvre, the Jardin des Plantes, the Barrière d'Enfer where the Catacombs are entered). Never mentions anything after 1841.", greet: D[5] } });
var W = { P: P, i: i, dir: null, t: 0, sp: 0.9 + (i % 5) * 0.12, carry: null };
if (D[0] === "A lamplighter" || D[0] === "A rag-picker") {
var lan = poeGrp(P.g, 0.28, 0.95, 0.15);
poeBox(lan, 0.12, 0.18, 0.12, poeShine(0x1A1A1A, 0.6, 0.6), 0, 0, 0);
poeSph(lan, 0.05, poeGlowM(0xFFC070), 0, 0, 0, 6);
var gl = wGlow(0xFFB860, 0.9, 0.7);
lan.add(gl);
}
if (D[0] === "A water-carrier") {
[-0.45, 0.45].forEach(function (o) { poeCyl(P.g, 0.16, 0.13, 0.3, poeS("oak", 0x6A4A2A), o, 0.7, 0, 8); });
poeBox(P.g, 1.0, 0.05, 0.06, poeS("oak", 0x5A3A1A), 0, 1.45, 0);
}
F.list.push(W);
}
},
function (W, P, near) {
for (var tries = 0; tries < 24; tries++) {
var a = Math.random() * 6.283, r = (near ? 8 : 28) + Math.random() * (near ? 30 : 26), x = Math.floor(P.x + Math.cos(a) * r) + 0.5, z = Math.floor(P.z + Math.sin(a) * r) + 0.5;
if (poeParT(x, z) !== 0)
continue;
var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(function (d) { return poeParT(x + d[0] * 2, z + d[1] * 2) === 0 && poeParT(x + d[0] * 4, z + d[1] * 4) === 0; });
if (!dirs.length)
continue;
W.dir = dirs[Math.floor(Math.random() * dirs.length)];
W.P.g.position.set(x, 0, z);
W.P.g.rotation.y = Math.atan2(W.dir[0], W.dir[1]);
W.t = 0;
return true;
}
return false;
},
function (dt) {
var F = POE_PAR_F, R = POE_RX.x_paris;
if (!F.on || POE.room !== R)
return;
var P = poeParHere(), L = worldLocal(), talkNear = null;
F.list.forEach(function (W, i) {
var g = W.P.g, x = g.position.x, z = g.position.z, d = Math.hypot(x - P.x, z - P.z);
g.visible = d < (POE.lite ? 36 : 52);
if (!W.dir || d > 75) {
if (!poeParFolkPlace(W, P, !W.dir))
g.position.x = 1e5;
return;
}
if (d < 2.4) {
g.rotation.y = Math.atan2(P.x - x, P.z - z);
return;
}
W.t += dt;
var nx = x + W.dir[0] * W.sp * dt, nz = z + W.dir[1] * W.sp * dt, ahead = poeParT(nx + W.dir[0] * 1.2, nz + W.dir[1] * 1.2);
if (ahead !== 0 || Math.random() < dt * 0.04) {
var opts = [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(function (q) { return !(q[0] === -W.dir[0] && q[1] === -W.dir[1]) && poeParT(x + q[0] * 2, z + q[1] * 2) === 0; });
if (!opts.length)
opts = [[-W.dir[0], -W.dir[1]]];
W.dir = opts[Math.floor(Math.random() * opts.length)];
g.rotation.y = Math.atan2(W.dir[0], W.dir[1]);
return;
}
g.position.x = nx;
g.position.z = nz;
g.position.y = Math.abs(Math.sin(W.t * W.sp * 5.2)) * 0.035;
});
},
function (x, W, H) { var G = x.createLinearGradient(0, 0, 0, H * 0.6); G.addColorStop(0, "#6A8AA8"); G.addColorStop(1, "#E8C890"); x.fillStyle = G; x.fillRect(0, 0, W, H); x.fillStyle = "#4A5A3A"; x.beginPath(); x.moveTo(0, H * 0.62); for (var i = 0; i <= 8; i++)
x.lineTo(W * i / 8, H * (0.55 + 0.08 * Math.sin(i * 1.7))); x.lineTo(W, H); x.lineTo(0, H); x.fill(); x.fillStyle = "#2A3A22"; for (var t = 0; t < 5; t++) {
x.beginPath();
x.arc(W * (0.1 + t * 0.2), H * (0.5 + 0.05 * (t % 2)), H * 0.09, 0, 7);
x.fill();
} x.fillStyle = "#8AA8C0"; x.fillRect(0, H * 0.8, W, H * 0.06); },
function (x, W, H) { x.fillStyle = "#1A140E"; x.fillRect(0, 0, W, H); x.fillStyle = "#6A1A1A"; x.fillRect(W * 0.1, H * 0.7, W * 0.8, H * 0.08); x.fillStyle = "#C8A040"; x.beginPath(); x.arc(W * 0.35, H * 0.6, H * 0.12, 0, 7); x.fill(); x.fillStyle = "#8A2A1A"; x.beginPath(); x.arc(W * 0.55, H * 0.62, H * 0.1, 0, 7); x.fill(); x.fillStyle = "#3A5A2A"; x.beginPath(); x.arc(W * 0.7, H * 0.58, H * 0.08, 0, 7); x.fill(); x.fillStyle = "#D8D0B8"; x.fillRect(W * 0.2, H * 0.35, W * 0.07, H * 0.35); },
function (x, W, H) { var G = x.createLinearGradient(0, 0, 0, H); G.addColorStop(0, "#2A3A5A"); G.addColorStop(0.6, "#C87A4A"); G.addColorStop(1, "#3A2A1A"); x.fillStyle = G; x.fillRect(0, 0, W, H); x.fillStyle = "#1A1410"; x.fillRect(W * 0.15, H * 0.45, W * 0.06, H * 0.4); x.fillRect(W * 0.6, H * 0.4, W * 0.25, H * 0.45); x.beginPath(); x.moveTo(W * 0.58, H * 0.4); x.lineTo(W * 0.725, H * 0.25); x.lineTo(W * 0.87, H * 0.4); x.fill(); x.fillStyle = "#E8C070"; x.fillRect(W * 0.68, H * 0.55, W * 0.04, H * 0.06); },
function (x, W, H) { var G = x.createLinearGradient(0, 0, 0, H); G.addColorStop(0, "#3A3020"); G.addColorStop(1, "#14100A"); x.fillStyle = G; x.fillRect(0, 0, W, H); x.fillStyle = "#2A3A5A"; x.beginPath(); x.ellipse(W * 0.5, H * 0.95, W * 0.32, H * 0.42, 0, 0, 7); x.fill(); x.fillStyle = "#E8D0B0"; x.beginPath(); x.ellipse(W * 0.5, H * 0.42, W * 0.12, H * 0.17, 0, 0, 7); x.fill(); x.fillStyle = "#6A4A2A"; x.beginPath(); x.ellipse(W * 0.5, H * 0.3, W * 0.15, H * 0.1, 0, 0, 7); x.fill(); x.fillStyle = "#F0ECE4"; x.fillRect(W * 0.43, H * 0.58, W * 0.14, H * 0.07); },
function (x, W, H) { x.fillStyle = "#E8E0C8"; x.fillRect(0, 0, W, H); x.strokeStyle = "#3A2A1A"; x.lineWidth = 2; for (var i = 0; i < 14; i++) {
x.beginPath();
x.moveTo(W * 0.05, H * (0.1 + i * 0.06));
x.lineTo(W * (0.4 + 0.5 * ((i * 7) % 5) / 5), H * (0.1 + i * 0.06));
x.stroke();
} x.fillStyle = "#3A2A1A"; x.fillRect(W * 0.55, H * 0.15, W * 0.35, H * 0.45); x.fillStyle = "#C8B088"; x.fillRect(W * 0.58, H * 0.18, W * 0.29, H * 0.39); },
function (R, g, col, h) {
var hw = R.w / 2, hd = R.d / 2, m = poeS("panel", col), rail = poeC(0x2A1A10);
h = h || 1.0;
poeBox(g, R.w - 0.1, h, 0.04, m, 0, h / 2, -hd + 0.03);
poeBox(g, R.w - 0.1, 0.06, 0.07, rail, 0, h, -hd + 0.05);
poeBox(g, R.w - 0.1, h, 0.04, m, 0, h / 2, hd - 0.03);
poeBox(g, R.w - 0.1, 0.06, 0.07, rail, 0, h, hd - 0.05);
poeBox(g, 0.04, h, R.d - 0.1, m, hw - 0.03, h / 2, 0);
poeBox(g, 0.07, 0.06, R.d - 0.1, rail, hw - 0.05, h, 0);
poeBox(g, 0.04, h, R.d - 0.1, m, -hw + 0.03, h / 2, 0);
poeBox(g, 0.07, 0.06, R.d - 0.1, rail, -hw + 0.05, h, 0);
},
function (g, x, y, z, ry) {
var s = poeGrp(g, x, y, z, ry), br = poeShine(0xB8903A, 0.35, 0.85);
poeBox(s, 0.12, 0.22, 0.04, br, 0, 0, 0.02);
poeBox(s, 0.4, 0.03, 0.03, br, 0, -0.05, 0.14);
[-0.18, 0.18].forEach(function (o) { poeCyl(s, 0.05, 0.04, 0.04, br, o, -0.02, 0.14, 8); poeCyl(s, 0.02, 0.02, 0.18, poeC(0xF0E8D8), o, 0.09, 0.14, 6); poeFlame(s, o, 0.21, 0.14, 1.4); });
var gl = wGlow(0xFFC070, 0.9, 0.75);
gl.position.set(0, 0.2, 0.2);
s.add(gl);
return s;
},
function (g, y, rich, lite) {
var c = poeGrp(g, 0, y, 0), br = poeShine(0xC89A3A, 0.3, 0.9);
poeCyl(c, 0.015, 0.015, 0.9, br, 0, 0.45, 0, 6);
if (rich) {
var n = lite ? 6 : 10;
poeCyl(c, 0.6, 0.6, 0.04, br, 0, 0, 0, 24, true);
poeCyl(c, 0.36, 0.36, 0.04, br, 0, 0.25, 0, 20, true);
poeSph(c, 0.12, br, 0, 0.05, 0, 10);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, cx = Math.cos(a) * 0.6, cz = Math.sin(a) * 0.6;
poeCyl(c, 0.02, 0.02, 0.16, poeC(0xF0E8D8), cx, 0.1, cz, 6);
poeFlame(c, cx, 0.21, cz, 1.3);
if (!lite)
poeSph(c, 0.03, poeShine(0xE8F0F8, 0.05, 0.2), cx * 0.8, -0.12, cz * 0.8, 6);
}
var gl = wGlow(0xFFD090, 2.6, 0.6);
c.add(gl);
}
else {
poeCyl(c, 0.18, 0.12, 0.22, br, 0, -0.05, 0, 10);
var sh = poeSph(c, 0.16, poeGlowM(0xFFE2B0), 0, 0.18, 0, 12);
sh.scale.y = 0.8;
var gl2 = wGlow(0xFFC880, 1.4, 0.6);
gl2.position.y = 0.15;
c.add(gl2);
}
return c;
},
function (g, x, y, z, s) {
s = s || 1;
var v = poeGrp(g, x, y, z);
poeCyl(v, 0.07 * s, 0.05 * s, 0.22 * s, poeShine([0x2A4A8A, 0xE8E4DA, 0x8A2A1A][Math.abs(Math.round(x * 7)) % 3], 0.15, 0.2), 0, 0.11 * s, 0, 10);
var cols = [0xE83A4A, 0xF0E0E8, 0xE8C040, 0xC83AA8, 0xF0F0F0];
for (var i = 0; i < 9; i++) {
var a = i * 2.4, r = 0.05 + 0.05 * (i % 3);
poeCyl(v, 0.006, 0.006, 0.25 * s, poeC(0x2A5A2A), Math.cos(a) * r * 0.5, 0.3 * s, Math.sin(a) * r * 0.5, 4);
poeSph(v, 0.045 * s, poeC(cols[i % cols.length]), Math.cos(a) * r, (0.38 + 0.06 * (i % 3)) * s, Math.sin(a) * r, 6);
}
for (var l = 0; l < 4; l++) {
var lf = poeSph(v, 0.05 * s, poeC(0x2A5A2A), Math.cos(l * 1.6) * 0.09, 0.3 * s, Math.sin(l * 1.6) * 0.09, 6);
lf.scale.set(1.4, 0.4, 0.8);
}
return v;
},
function (g, x, z, s) {
s = s || 1;
var p = poeGrp(g, x, 0, z);
poeCyl(p, 0.22 * s, 0.16 * s, 0.4 * s, poeS("rough", 0xA85A3A), 0, 0.2 * s, 0, 10);
poeCyl(p, 0.2 * s, 0.2 * s, 0.02, poeC(0x2A1A10), 0, 0.4 * s, 0, 10);
for (var i = 0; i < 11; i++) {
var a = i * 2.3, lf = poeSph(p, 0.16 * s, poeC(i % 3 ? 0x2A5A2A : 0x3A6A2A), Math.cos(a) * 0.18 * s, (0.6 + 0.12 * (i % 4)) * s, Math.sin(a) * 0.18 * s, 6);
lf.scale.set(1.6, 0.5, 0.8);
lf.rotation.y = a;
}
return p;
},
function (g, x, z, ry, col) {
var s = poeGrp(g, x, 0, z, ry), up = poeS("velvet", col), w = poeC(POE_WOOD);
poeBox(s, 2.0, 0.42, 0.8, up, 0, 0.38, 0);
poeBox(s, 2.0, 0.6, 0.16, up, 0, 0.75, -0.34);
[-1, 1].forEach(function (k) { poeBox(s, 0.16, 0.3, 0.8, up, k * 0.98, 0.65, 0); });
for (var i = 0; i < 4; i++)
poeCyl(s, 0.03, 0.025, 0.18, w, (i < 2 ? -0.9 : 0.9), 0.09, (i % 2 ? 0.3 : -0.3), 6);
poeBox(s, 0.4, 0.36, 0.12, poeS("velvet", 0xD8C8A0), -0.6, 0.72, -0.2);
return s;
},
function (g, x, z, ry, col) {
var a = poeGrp(g, x, 0, z, ry), m = poeS("oak", col || 0x5A3A1A);
poeBox(a, 1.3, 2.2, 0.6, m, 0, 1.1, 0);
poeBox(a, 1.45, 0.14, 0.68, m, 0, 2.27, 0);
poeBox(a, 0.02, 1.9, 0.02, poeC(0x1A0E08), 0, 1.15, 0.31);
[-1, 1].forEach(function (k) { poeBox(a, 0.5, 1.6, 0.03, poeS("oak", 0x6A4A2A), k * 0.32, 1.15, 0.31); poeSph(a, 0.025, poeShine(0xC8A050, 0.3, 0.9), k * 0.06, 1.15, 0.34, 6); });
return a;
},
function (g, x, z, ry, rich) {
var s = poeGrp(g, x, 0, z, ry), m = poeS("oak", rich ? 0x3A2010 : 0x6A4A2A);
poeBox(s, 1.8, 0.9, 0.5, m, 0, 0.45, 0);
poeBox(s, 1.9, 0.05, 0.56, poeShine(0x2A1A10, 0.3, 0.1), 0, 0.92, 0);
for (var d = 0; d < 3; d++) {
poeBox(s, 0.5, 0.6, 0.02, poeS("oak", rich ? 0x4A2A14 : 0x7A5A3A), -0.58 + d * 0.58, 0.45, 0.26);
}
[-0.6, -0.4, 0.5].forEach(function (o, i) { poeBottle(s, o, 0.95, 0, [0x6A1A1A, 0x8A6A1A, 0x2A4A2A][i]); });
poeCyl(s, 0.18, 0.14, 0.06, poeShine(0xD8D8D0, 0.2, 0.8), 0.05, 0.98, 0, 14);
for (var f = 0; f < 4; f++)
poeSph(s, 0.05, poeC([0xC83A2A, 0xE8C040, 0x8AA83A, 0xC8602A][f]), 0.05 + Math.cos(f * 1.6) * 0.07, 1.04, Math.sin(f * 1.6) * 0.07, 8);
if (rich)
poeCandle(s, 0.75, 0.95, 0, 0.22, true);
return s;
},
function (g, x, z, ry) {
var w = poeGrp(g, x, 0, z, ry);
poeBox(w, 0.8, 0.8, 0.45, poeS("oak", 0x7A5A3A), 0, 0.4, 0);
poeBox(w, 0.84, 0.04, 0.5, poeS("marble", 0xE8E4DA), 0, 0.82, 0);
poeCyl(w, 0.2, 0.12, 0.1, poeShine(0xF0ECE4, 0.15, 0.1), 0, 0.89, 0, 14);
poeCyl(w, 0.07, 0.09, 0.28, poeShine(0xF0ECE4, 0.15, 0.1), 0.24, 0.98, 0, 10);
poeBox(w, 0.5, 0.6, 0.03, poeC(0xF0ECE0), 0, 0.55, 0.24);
poeMirror(w, 0, 1.4, -0.2, 0, 0.5, 0.6);
return w;
},
function (g, x, z, ry) {
var s = poeGrp(g, x, 0, z, ry), ir = poeShine(0x1A1A1A, 0.5, 0.6);
poeBox(s, 0.7, 0.7, 0.6, ir, 0, 0.45, 0);
for (var i = 0; i < 4; i++)
poeCyl(s, 0.03, 0.03, 0.12, ir, (i < 2 ? -0.3 : 0.3), 0.06, (i % 2 ? 0.24 : -0.24), 6);
poeFace(s, 0.3, 0.18, poeGlowM(0xFF7A20, 0.9), 0, 0.38, 0.31, 0);
poeCyl(s, 0.08, 0.08, 2.2, ir, 0, 1.9, -0.1, 8);
poeCyl(s, 0.16, 0.18, 0.18, poeShine(0x6A4A2A, 0.4, 0.6), 0.15, 0.89, 0.1, 10);
var gl = wGlow(0xFF8A30, 0.8, 0.6);
gl.position.set(0, 0.4, 0.4);
s.add(gl);
return s;
},
function (g, x, y, z) {
var b = poeGrp(g, x, y, z), br = poeShine(0xC8A050, 0.3, 0.9);
poeCyl(b, 0.18, 0.18, 0.02, br, 0, 0, 0, 12);
poeCyl(b, 0.18, 0.18, 0.35, poeShine(0xC8A050, 0.3, 0.9), 0, 0.18, 0, 12, true);
poeSph(b, 0.18, br, 0, 0.36, 0, 10).scale.y = 0.5;
poeCyl(b, 0.006, 0.006, 0.6, br, 0, 0.75, 0, 4);
var bird = poeSph(b, 0.05, poeC(0xE8D040), 0, 0.12, 0, 8);
bird.scale.set(1, 0.9, 1.5);
return b;
},
function (g, x, z, w, d, y, rich, n) {
var t = poeGrp(g, x, y, z), plate = poeShine(0xF0ECE4, 0.2, 0.1), gl = poeShine(0xD8E8F0, 0.05, 0.3);
n = n || 4;
for (var i = 0; i < n; i++) {
var side = i % 2 ? 1 : -1, px = -w / 2 + 0.4 + Math.floor(i / 2) * (w - 0.8) / Math.max(1, Math.ceil(n / 2) - 1 || 1), pz = side * (d / 2 - 0.22);
poeCyl(t, 0.12, 0.1, 0.02, plate, px, 0.01, pz, 14);
if (rich)
poeCyl(t, 0.03, 0.025, 0.12, gl, px + 0.16, 0.06, pz - side * 0.06, 8);
poeBox(t, 0.02, 0.005, 0.16, poeShine(0xC8C8C0, 0.3, 0.9), px - 0.17, 0.01, pz);
}
if (rich) {
poeCandelabrum(t, 0, 0.0, 0, 0.8, false);
poeCyl(t, 0.16, 0.12, 0.14, plate, 0.6, 0.07, 0, 14);
}
else {
var lf = poeSph(t, 0.16, poeC(0xB8803A), 0.3, 0.06, 0, 10);
lf.scale.set(1.8, 0.6, 0.8);
poeCyl(t, 0.18, 0.14, 0.12, poeS("rough", 0x8A5A3A), -0.3, 0.06, 0, 12);
poeBottle(t, 0, 0.0, 0.1, 0x3A0A0A);
}
return t;
},
function (g, x, y, z, ry, w, fill) {
var s = poeGrp(g, x, y, z, ry);
poeBox(s, w, 0.04, 0.25, poeS("oak", 0x5A3A1A), 0, 0, 0.12);
poeBox(s, 0.03, 0.18, 0.18, poeC(POE_WOOD), -w / 2 + 0.1, -0.1, 0.08);
poeBox(s, 0.03, 0.18, 0.18, poeC(POE_WOOD), w / 2 - 0.1, -0.1, 0.08);
for (var i = 0; i < Math.floor(w / 0.22); i++) {
var px = -w / 2 + 0.15 + i * 0.22;
if (fill === "crock") {
if (i % 2)
poeCyl(s, 0.08, 0.06, 0.18, poeShine([0xE8E4DA, 0x2A4A8A, 0xA85A3A][i % 3], 0.2, 0.1), px, 0.11, 0.12, 10);
else {
var pl = poeCyl(s, 0.11, 0.11, 0.015, poeShine(0xE8E4DA, 0.2, 0.1), px, 0.13, 0.06, 14);
pl.rotation.x = 1.3;
}
}
else if (fill === "jars")
poeCyl(s, 0.06, 0.07, 0.2, poeShine([0x2A5A2A, 0x8A6A1A, 0x6A1A1A, 0xD8E0E8][i % 4], 0.1, 0.3), px, 0.12, 0.12, 8);
else
poeBox(s, 0.05, 0.2, 0.16, poeC([0x6A1A1A, 0x1A2A4A, 0x3A2A1A, 0x2A4A2A][i % 4]), px, 0.12, 0.12);
}
return s;
},
function (g, x, z, rich) {
poeFireplace(g, x, z, 0, true);
var c = poeClock(g, x, z + 0.2, 0, false, 1.62);
c.g.scale.setScalar(0.22);
[-0.8, 0.8].forEach(function (o) { poeCyl(g, 0.04, 0.05, 0.24, poeShine(0xC8A050, 0.3, 0.9), x + o, 1.74, z + 0.15, 8); poeCandle(g, x + o, 1.86, z + 0.15, 0.16, true); });
if (rich) {
poeMirror(g, x, 2.75, z + 0.08, 0, 1.4, 1.1);
poeParVase(g, x - 0.45, 1.62, z + 0.15, 0.8);
}
else
poeParPic(g, x, 2.6, z + 0.08, 0, 0.9, 0.7, 0);
},
function (R, g, cls, rnd, person, solid, garret) {
var hw = R.w / 2, hd = R.d / 2, lite = POE.lite, k = Math.floor(rnd() * 5);
if (cls === 1) {
poeParWainscot(R, g, 0x4A2A14, 1.1);
poeRug(g, 0.8, -0.2, 7.4, 5.6, 0x8A2A2A);
if (!lite)
poeRug(g, 0.8, -0.2, 6.6, 4.8, 0xB89A6A, 0.008);
poeParMantel(g, 1.6, -hd + 0.3, true);
poeArmchair(g, 0.2, -2.6, 0.6, 0xA83A2A);
poeArmchair(g, 3.0, -2.6, -0.6, 0xA83A2A);
poeParSofa(g, 1.6, -0.6, Math.PI, 0x7A1A2A);
solid(1.6, -0.6, 2.1, 0.9);
poeTable(g, 1.6, -1.7, 1.0, 0.6, 0.5, 0, null);
poeCyl(g, 0.12, 0.1, 0.02, poeShine(0xF0ECE4, 0.2, 0.1), 1.4, 0.52, -1.7, 12);
poeCyl(g, 0.06, 0.07, 0.14, poeShine(0xF0ECE4, 0.2, 0.1), 1.75, 0.58, -1.7, 10);
var pi = poeGrp(g, hw - 0.9, 0, 1.8, -Math.PI / 2);
poeBox(pi, 1.6, 0.9, 0.7, poeShine(0x1A0E08, 0.3, 0.1), 0, 0.75, 0);
poeBox(pi, 1.5, 0.05, 0.2, poeC(0xF0ECE4), 0, 1.2, 0.3);
poeBox(pi, 1.5, 0.3, 0.05, poeShine(0x1A0E08, 0.3, 0.1), 0, 1.35, -0.32);
for (var l = 0; l < 3; l++)
poeCyl(pi, 0.04, 0.04, 0.7, poeShine(0x1A0E08, 0.3, 0.1), -0.7 + l * 0.7, 0.35, 0, 6);
poeBox(pi, 0.5, 0.28, 0.04, poeC(0xF0E8D8), 0.2, 1.62, -0.28);
poeChair(g, hw - 1.8, 1.8, Math.PI / 2, 0x7A1A2A);
solid(hw - 0.9, 1.8, 0.8, 1.7);
poeBookcase(g, hw - 0.3, -2.8, 1.8, 2.6, -Math.PI / 2);
solid(hw - 0.3, -2.8, 0.5, 1.8);
poeParPlant(g, hw - 0.6, hd - 0.7, 1.2);
poeParPlant(g, -hw + 0.7, hd - 0.7, 1.1);
poeTable(g, -3.0, 1.6, 1.4, 0.7, 0.76, Math.PI / 2, 0xE8E0D0);
solid(-3.0, 1.6, 0.8, 1.4);
poeParVase(g, -3.0, 0.78, 1.6, 1.2);
poeChair(g, -2.2, 1.6, -Math.PI / 2, 0x7A1A2A);
poeChair(g, -3.0, 2.6, Math.PI, 0x7A1A2A);
poeParPic(g, -hw + 0.06, 2.5, 0.2, Math.PI / 2, 1.6, 1.1, k);
poeParPic(g, hw - 0.06, 2.6, -0.4, -Math.PI / 2, 1.2, 0.9, k + 1);
poeParPic(g, -1.6, 2.6, -hd + 0.06, 0, 1.0, 1.3, 3);
poeParSconce(g, -0.2, 2.1, -hd + 0.06, 0);
poeParSconce(g, 3.4, 2.1, -hd + 0.06, 0);
poeParSconce(g, -hw + 0.06, 2.1, -1.6, Math.PI / 2);
poeParChandelier(g, R.h - 1.1, true, lite).position.x = 1.2;
person(0, 0.6, -1.4, Math.PI * 0.75);
person(1, 2.8, -1.6, -Math.PI * 0.75);
if (rnd() < 0.7)
person(2, hw - 2.6, 3.0, -Math.PI * 0.75);
return;
}
if (cls === 2) {
poeParWainscot(R, g, 0x5A3A1A, 1.0);
poeRug(g, 0.6, 0.2, 5.6, 4.4, 0x2A4A3A);
poeParMantel(g, 1.6, -hd + 0.3, false);
poeTable(g, 0.6, 0.6, 2.4, 1.1, 0.76, 0, 0xF0ECE4);
solid(0.6, 0.6, 2.4, 1.1);
poeParLaid(g, 0.6, 0.6, 2.4, 1.1, 0.77, true, 6);
for (var c2 = 0; c2 < 3; c2++) {
poeChair(g, -0.2 + c2 * 0.8, 1.45, Math.PI, 0x3A4A2A);
poeChair(g, -0.2 + c2 * 0.8, -0.25, 0, 0x3A4A2A);
}
poeParSideboard(g, hw - 0.35, 0.6, -Math.PI / 2, true);
solid(hw - 0.35, 0.6, 0.6, 1.9);
poeDesk(g, -3.2, 2.6, Math.PI);
solid(-3.2, 2.6, 1.6, 0.8);
poeChair(g, -3.2, 1.8, 0, 0x3A2A1A);
poeParBooks(g, -3.6, 0.8, 2.6, 6);
poeCandle(g, -2.7, 0.8, 2.6, 0.2, true);
poeBookcase(g, -hw + 0.3, 0.6, 2.2, 2.6, Math.PI / 2);
solid(-hw + 0.3, 0.6, 0.5, 2.2);
poeClock(g, hw - 0.4, -2.6, -Math.PI / 2, false);
poeParPlant(g, hw - 0.6, hd - 0.7, 1);
poeParPic(g, hw - 0.06, 2.4, 2.6, -Math.PI / 2, 1.0, 0.8, k);
poeParPic(g, -0.8, 2.4, -hd + 0.06, 0, 0.9, 0.7, k + 2);
poeParPic(g, -hw + 0.06, 2.6, 3.2, Math.PI / 2, 0.8, 1.0, 4);
poeParSconce(g, -hw + 0.06, 2.0, -1.0, Math.PI / 2);
poeParSconce(g, 3.6, 2.0, -hd + 0.06, 0);
poeParChandelier(g, R.h - 0.9, false, lite).position.x = 0.6;
person(0, -3.2, 1.4, 0);
person(1, 1.4, 2.2, Math.PI);
return;
}
poeParPartition(R, g, solid);
if (cls === 3) {
poeRug(g, -1.8, 1.0, 4, 3, 0x6A4A3A);
poeTable(g, -1.8, 1.0, 1.6, 0.9, 0.76, 0, 0xE8E0D0);
solid(-1.8, 1.0, 1.6, 0.9);
poeParLaid(g, -1.8, 1.0, 1.6, 0.9, 0.77, false, 4);
poeChair(g, -2.4, 1.7, Math.PI, 0x5A4A3A);
poeChair(g, -1.2, 1.7, Math.PI, 0x5A4A3A);
poeChair(g, -2.4, 0.3, 0, 0x5A4A3A);
poeChair(g, -1.2, 0.3, 0, 0x5A4A3A);
poeParStove(g, -1.6, -hd + 0.5, 0);
solid(-1.6, -hd + 0.5, 0.8, 0.7);
poeParShelf(g, -hw + 0.15, 1.7, 1.4, Math.PI / 2, 1.6, "crock");
poeParShelf(g, -hw + 0.15, 1.2, 1.4, Math.PI / 2, 1.6, "jars");
poeParSideboard(g, 1.2, 2.9, -Math.PI / 2, false);
solid(1.2, 2.9, 0.6, 1.9);
poeParPegs(g, 0.2, -hd + 0.06, 0);
poeParBasket(g, -0.6, -hd + 0.5);
poeParBirdcage(g, -3.6, 2.3, hd - 0.8);
poeParVase(g, -1.8, 0.77, 1.25, 0.7);
poeParPic(g, -hw + 0.06, 2.4, -0.6, Math.PI / 2, 0.7, 0.5, k);
poeClock(g, -4.2, hd - 0.4, Math.PI, false);
solid(-4.2, hd - 0.4, 0.6, 0.4);
poeParSconce(g, -hw + 0.06, 1.9, 3.0, Math.PI / 2);
poeParChandelier(g, R.h - 0.8, false, lite).position.x = -1.8;
poeBed(g, hw - 1.3, -hd + 1.4, 0, 0x6A8AA8);
solid(hw - 1.3, -hd + 1.4, 1.6, 2.2);
poeParChest(g, hw - 1.3, -hd + 2.8, Math.PI, 0x7A5A3A);
var cr = poeGrp(g, 2.8, 0, -4.2, 0.3);
poeBox(cr, 0.9, 0.35, 0.5, poeS("oak", 0x8A6A4A), 0, 0.35, 0);
poeBox(cr, 0.8, 0.12, 0.42, poeC(0xF0ECE4), 0, 0.5, 0);
poeBox(cr, 0.9, 0.04, 0.04, poeS("oak", 0x8A6A4A), 0, 0.05, 0.2);
poeBox(cr, 0.9, 0.04, 0.04, poeS("oak", 0x8A6A4A), 0, 0.05, -0.2);
poeParArmoire(g, hw - 0.35, 1.0, -Math.PI / 2, 0x6A4A2A);
solid(hw - 0.35, 1.0, 0.7, 1.4);
poeParWashstand(g, hw - 0.35, 3.4, -Math.PI / 2);
solid(hw - 0.35, 3.4, 0.5, 0.9);
poeRug(g, 4.0, -0.6, 2.2, 1.6, 0x2A4A6A);
poeChair(g, 2.4, 2.4, 0.6, 0x5A4A3A);
poeParPic(g, 4.0, 2.1, -hd + 0.06, 0, 0.6, 0.5, k + 1);
poeParSconce(g, hw - 0.06, 1.9, -1.6, -Math.PI / 2);
var cl = poeLight(0xFFC078, 1.0, 8, 4.0, R.h - 0.8, 0, g, false);
person(0, -1.8, 2.2, Math.PI);
person(1, -3.2, -0.4, 0.6);
if (rnd() < 0.6)
person(2, 3.4, -2.0, Math.PI * 0.8);
return;
}
if (cls <= 5) {
poeRug(g, -1.8, 0.8, 3.4, 2.4, 0x5A4A3A);
poeTable(g, -1.8, hd - 1.4, 2.0, 0.9, 0.78, 0, null);
solid(-1.8, hd - 1.4, 2.0, 0.9);
poeChair(g, -1.8, hd - 2.3, 0, 0x4A3A2A);
poeCandle(g, -1.1, 0.8, hd - 1.4, 0.18, true);
for (var b = 0; b < 5; b++)
poeBox(g, 0.32, 0.03, 0.42, poeS("velvet", [0xE8E0D0, 0x8A2A2A, 0x2A3A6A, 0x3A6A3A, 0xC8A040][b]), -2.4 + b * 0.26, 0.8 + b * 0.012, hd - 1.4);
for (var bo = 0; bo < 4; bo++) {
var bolt = poeCyl(g, 0.09, 0.09, 0.9, poeS("velvet", [0x6A1A3A, 0x1A3A6A, 0xC8B898, 0x2A5A3A][bo]), -hw + 0.6, 0.1 + bo * 0.18, 1.0, 10);
bolt.rotation.z = Math.PI / 2;
}
poeParDressForm(g, -4.4, 2.6, [0x6A1A3A, 0x2A3A6A, 0x3A5A3A][k % 3]);
var wb = poeGrp(g, -1.8, 0, -hd + 0.6);
poeBox(wb, 2.0, 0.9, 0.7, poeS("oak", 0x8A6A4A), 0, 0.45, 0);
poeBox(wb, 0.5, 0.3, 0.4, poeC(0x9A8A7A), -0.4, 1.05, 0);
poeBox(wb, 0.3, 0.04, 0.05, poeShine(0x8A8A8A, 0.4, 0.8), 0.4, 0.93, 0.1);
poeBox(wb, 0.12, 0.12, 0.25, poeS("oak", 0x5A3A1A), 0.6, 0.96, -0.1);
for (var tl = 0; tl < 6; tl++)
poeBox(wb, 0.03, 0.3, 0.02, poeShine(0x6A6A6A, 0.4, 0.8), -0.8 + tl * 0.3, 1.6, -0.33);
solid(-1.8, -hd + 0.6, 2.0, 0.7);
poeParStove(g, 0.6, -hd + 0.5, 0);
solid(0.6, -hd + 0.5, 0.8, 0.7);
poeParShelf(g, 1.45, 1.7, 2.6, -Math.PI / 2, 1.6, "crock");
poeParShelf(g, 1.45, 1.2, 2.6, -Math.PI / 2, 1.6, "jars");
poeParLaundry(g, -4, 1.0, 2.4, -1.6);
poeCask(g, -hw + 0.6, 0, 3.8, 0.5);
poeParBasket(g, -0.2, 1.6);
poeParPegs(g, -hw + 0.06, -0.6, Math.PI / 2);
poeParPic(g, -1.8, 2.3, -hd + 0.06, 0, 0.6, 0.5, k);
poeParSconce(g, -hw + 0.06, 1.9, 2.4, Math.PI / 2);
poeParChandelier(g, R.h - 0.8, false, lite).position.x = -1.8;
poeBed(g, hw - 1.3, -hd + 1.4, 0, 0xA85A3A);
solid(hw - 1.3, -hd + 1.4, 1.6, 2.2);
poeParChest(g, hw - 1.3, -hd + 2.8, Math.PI);
poeParWashstand(g, hw - 0.35, 2.8, -Math.PI / 2);
solid(hw - 0.35, 2.8, 0.5, 0.9);
poeParArmoire(g, hw - 0.35, 0.4, -Math.PI / 2, 0x7A5A3A);
solid(hw - 0.35, 0.4, 0.7, 1.4);
poeRug(g, 4.0, 0.4, 2.0, 1.4, 0x8A3A2A);
poeParPlant(g, 2.6, hd - 0.6, 0.7);
poeChair(g, 2.4, -2.0, 0.8, 0x4A3A2A);
poeParPic(g, 4.0, 2.0, -hd + 0.06, 0, 0.5, 0.6, 3);
poeParSconce(g, hw - 0.06, 1.9, -1.4, -Math.PI / 2);
poeLight(0xFFC078, 1.0, 8, 4.0, R.h - 0.8, 0, g, false);
person(0, -1.8, hd - 2.6, Math.PI);
person(1, -1.8, -hd + 1.5, Math.PI);
return;
}
var sl = poeFace(g, R.w, 2.4, poeS("beams", 0x8A7A6A), 0, R.h - 0.6, hd - 1.0, Math.PI);
sl.rotation.x = -0.9;
poeRug(g, -1.8, 0, 3, 2.2, 0xA84A3A);
poeTable(g, -1.8, -0.4, 1.2, 0.7, 0.74, 0, null);
solid(-1.8, -0.4, 1.2, 0.7);
poeChair(g, -1.8, 0.3, Math.PI, 0x4A3A2A);
poeCandle(g, -1.4, 0.76, -0.4, 0.12, true);
poeParBooks(g, -2.1, 0.76, -0.5, 5);
poeBox(g, 0.3, 0.01, 0.22, poeC(0xF0E8D8), -1.7, 0.765, -0.3);
poeCyl(g, 0.03, 0.03, 0.06, poeC(0x101010), -1.45, 0.79, -0.2, 8);
for (var bb = 0; bb < 12; bb++)
poeBox(g, 0.22, 0.06, 0.3, poeC([0x6A1A1A, 0x1A2A4A, 0x3A2A1A, 0x8A6A2A][bb % 4]), -3.6 + (bb % 3) * 0.3, 0.03 + Math.floor(bb / 3) * 0.06, -1.6);
poeParShelf(g, -hw + 0.15, 1.5, 0.4, Math.PI / 2, 1.8, "books");
poeParEasel(g, -4.2, 1.6, 0.6);
poeParStove(g, 0.5, -hd + 0.5, 0);
solid(0.5, -hd + 0.5, 0.8, 0.7);
var ft = poeGrp(g, -1.8, 0, 2.6);
poeTable(ft, 0, 0, 1.0, 0.6, 0.72, 0, null);
for (var fl = 0; fl < 14; fl++)
poeSph(ft, 0.06, poeC([0xE84A5A, 0xF0E0E0, 0xE8C040, 0xC83AA8][fl % 4]), -0.4 + (fl % 7) * 0.13, 0.77, -0.15 + Math.floor(fl / 7) * 0.3, 6);
solid(-1.8, 2.6, 1.0, 0.6);
poeChair(g, -1.8, 1.9, 0, 0x4A3A2A);
poeParVase(g, -1.4, 0.74, 2.4, 0.8);
poeParPegs(g, -0.4, -hd + 0.06, 0);
poeParPic(g, -hw + 0.06, 1.6, 2.6, Math.PI / 2, 0.5, 0.4, k);
poeParChandelier(g, R.h - 0.7, false, lite).position.x = -1.8;
poeBed(g, hw - 1.2, -hd + 1.3, 0, 0x3A6A8A);
solid(hw - 1.2, -hd + 1.3, 1.6, 2.2);
poeParChest(g, hw - 1.2, -hd + 2.7, Math.PI, 0x5A3A1A);
poeParWashstand(g, hw - 0.35, 1.0, -Math.PI / 2);
solid(hw - 0.35, 1.0, 0.5, 0.9);
poeParLaundry(g, 2.4, 5.6, 1.7, 2.4);
poeParPlant(g, 2.4, hd - 1.4, 0.6);
poeRug(g, 4.0, -0.6, 1.8, 1.2, 0x6A5A2A);
poeParPic(g, 4.0, 1.8, -hd + 0.06, 0, 0.4, 0.5, 4);
poeParSconce(g, hw - 0.06, 1.7, -1.6, -Math.PI / 2);
poeLight(0xFFC078, 0.9, 7, 4.0, R.h - 0.6, 0, g, false);
person(0, -1.8, 0.9, Math.PI);
if (rnd() < 0.7)
person(1, 3.4, 0.0, Math.PI * 0.7);
},
function (R, g, solid) {
var hd = R.d / 2, X = 1.6, m = poeS(R.wall, R.wallCol), dado = poeS("panel", 0x6A5A3A), L = hd - 0.7, c = (hd + 0.7) / 2;
[-1, 1].forEach(function (s) { poeBox(g, 0.14, R.h, L, m, X, R.h / 2, s * c); poeBox(g, 0.18, 1.0, L, dado, X, 0.5, s * c); solid(X, s * c, 0.2, L, R.h); });
poeBox(g, 0.14, R.h - 2.3, 1.4, m, X, 2.3 + (R.h - 2.3) / 2, 0);
var fr = poeS("oak", 0x4A2A14);
poeBox(g, 0.2, 2.3, 0.1, fr, X, 1.15, -0.7);
poeBox(g, 0.2, 2.3, 0.1, fr, X, 1.15, 0.7);
poeBox(g, 0.2, 0.12, 1.5, fr, X, 2.32, 0);
},
function (g, x, z, ry) {
var p = poeGrp(g, x, 1.75, z, ry);
poeBox(p, 1.2, 0.1, 0.04, poeS("oak", 0x5A3A1A), 0, 0, 0.02);
[[-0.4, 0x2A2A3A, 0.9], [0, 0x8A2A2A, 0.6], [0.4, 0x4A3A2A, 0.8]].forEach(function (q) { poeCyl(p, 0.015, 0.015, 0.1, poeC(POE_WOOD), q[0], 0, 0.08, 6).rotation.x = Math.PI / 2; var c = poeBox(p, 0.42, q[2], 0.1, poeS("velvet", q[1]), q[0], -q[2] / 2, 0.12); });
poeCyl(p, 0.14, 0.16, 0.18, poeC(0x1A1A1A), 0.4, 0.12, 0.14, 12);
poeCyl(p, 0.24, 0.24, 0.02, poeC(0x1A1A1A), 0.4, 0.03, 0.14, 14);
return p;
},
function (g, x, z, ry) {
var e = poeGrp(g, x, 0, z, ry), w = poeC(0x6A4A2A);
[-0.3, 0.3].forEach(function (o) { var l = poeBox(e, 0.04, 1.9, 0.04, w, o, 0.95, 0); l.rotation.z = -o * 0.2; });
var bk = poeBox(e, 0.04, 1.8, 0.04, w, 0, 0.9, -0.4);
bk.rotation.x = -0.25;
poeBox(e, 0.8, 0.04, 0.08, w, 0, 0.75, 0.04);
poePainting(e, 0, 1.2, 0.06, 0, 0.7, 0.85, POE_PAR_PAINT[2], "parPaint2");
return e;
},
function (R, g, I, rnd, person, solid) {
var hw = R.w / 2, hd = R.d / 2, lite = POE.lite;
poeParWainscot(R, g, 0x5A3A1A, 1.2);
var lg = poeGrp(g, hw - 2.4, 0, -1.0);
poeBox(lg, 3.6, 2.6, 0.1, poeS("panel", 0xC8B8A0), 0, 1.3, 1.6);
poeFace(lg, 1.0, 0.8, poeGlowM(0xE8A858, 0.85), 0, 1.5, 1.66, 0);
poeTable(lg, 0, -0.3, 1.0, 0.7, 0.74, 0, 0xC8B8A0);
poeChair(lg, -0.4, 0.5, Math.PI, 0x5A3A2A);
poeCandle(lg, 0.2, 0.76, -0.3, 0.2, true);
poeBox(lg, 1.6, 1.8, 0.3, poeS("oak", 0x5A3A1A), 0, 0.9, -1.5);
for (var k = 0; k < 12; k++) {
poeBox(lg, 0.02, 0.02, 0.04, poeShine(0x8A6A2A, 0.4, 0.8), -0.6 + (k % 6) * 0.24, 1.25 + Math.floor(k / 6) * 0.3, -1.32);
poeBox(lg, 0.06, 0.12, 0.01, poeShine(0xC8A050, 0.3, 0.9), -0.6 + (k % 6) * 0.24, 1.17 + Math.floor(k / 6) * 0.3, -1.31);
}
for (var lt = 0; lt < 10; lt++)
poeBox(lg, 0.14, 0.1, 0.01, poeC(0xF0E8D8), -0.7 + (lt % 5) * 0.3, 0.55 + Math.floor(lt / 5) * 0.3, -1.34);
poeParStove(lg, 1.3, -1.0, 0);
poeParBirdcage(lg, -0.9, 2.0, 0.4);
poeParPlant(lg, 1.4, 0.9, 0.8);
solid(hw - 2.4, 0.6, 3.6, 0.2);
poeRug(g, -0.6, 0, 2.6, 6.0, 0x8A3A2A);
poeMirror(g, -hw + 0.06, 2.0, 0.8, Math.PI / 2, 1.0, 1.4);
poeParPlant(g, -hw + 0.6, hd - 0.7, 1.2);
poeParPlant(g, hw - 0.6, hd - 0.7, 1.2);
poeParPic(g, -hw + 0.06, 2.2, -1.2, Math.PI / 2, 1.2, 0.9, 0);
poeParSconce(g, -hw + 0.06, 2.1, 2.4, Math.PI / 2);
poeParSconce(g, 0.6, 2.1, -hd + 0.06, 0);
poeParChandelier(g, R.h - 1.0, false, lite).position.x = -0.6;
var bn = poeGrp(g, -hw + 0.5, 0, -0.4, Math.PI / 2);
poeBox(bn, 2.0, 0.08, 0.45, poeS("oak", 0x4A2A14), 0, 0.45, 0);
poeBox(bn, 2.0, 0.6, 0.06, poeS("oak", 0x4A2A14), 0, 0.8, -0.2);
for (var l = 0; l < 4; l++)
poeBox(bn, 0.06, 0.45, 0.06, poeC(POE_WOOD), -0.9 + l * 0.6, 0.22, 0);
solid(-hw + 0.5, -0.4, 0.5, 2.0);
var us = poeGrp(g, -hw + 0.5, 0, 2.2);
poeCyl(us, 0.16, 0.14, 0.6, poeShine(0x2A4A6A, 0.2, 0.2), 0, 0.3, 0, 12, true);
for (var u = 0; u < 4; u++) {
var st = poeCyl(us, 0.015, 0.015, 0.9, poeC([0x1A1A1A, 0x5A3A1A, 0x1A1A1A, 0x6A1A1A][u]), Math.cos(u * 1.6) * 0.06, 0.55, Math.sin(u * 1.6) * 0.06, 6);
st.rotation.z = 0.12 * (u % 2 ? 1 : -1);
}
var bu = poeGrp(g, -1.8, 0, -hd + 0.6);
poeCyl(bu, 0.22, 0.26, 1.2, poeS("marble", 0xE8E4DA), 0, 0.6, 0, 14);
var hd2 = poeSph(bu, 0.2, poeS("marble", 0xF0ECE4), 0, 1.55, 0, 12);
hd2.scale.y = 1.2;
poeBox(bu, 0.4, 0.25, 0.25, poeS("marble", 0xF0ECE4), 0, 1.32, 0);
solid(-1.8, -hd + 0.6, 0.6, 0.6);
poeCask(g, 1.4, 0, -hd + 0.7, 0.8);
poeParBasket(g, 0.6, -hd + 0.6);
poeParPegs(g, -hw + 0.06, 1.0, Math.PI / 2);
poeLight(0xFFC078, 0.9, 9, -1.0, R.h - 1.0, 2.5, g, false);
person(0, hw - 2.2, -0.8, Math.PI, 1);
if (rnd() < 0.6)
person(1, -1.2, 2.0, Math.PI * 0.7, 2);
},
function (R, g, I, rnd) {
var hw = R.w / 2, hd = R.d / 2, lite = POE.lite;
poeParWainscot(R, g, 0x4A2A14, 1.0);
poeParChandelier(g, R.h - 1.0, false, lite).position.x = 0.5;
poeParSconce(g, -hw + 0.06, 2.2, 0, Math.PI / 2);
poeParSconce(g, hw - 0.06, 2.2, 0, -Math.PI / 2);
poeParVase(g, -1.4, 1.06, -0.6, 0.9);
poeParPlant(g, -hw + 0.6, hd - 0.7, 1);
poeParPic(g, hw - 0.06, 2.4, 1.6, -Math.PI / 2, 0.9, 0.7, Math.floor(rnd() * 5));
var k = POE_PAR_SHOPKIND[I.shop] || "goods", c = poeGrp(g, 0.5, 1.06, -0.6), br = poeShine(0xC8A050, 0.3, 0.9);
poeCyl(c, 0.02, 0.03, 0.4, br, 1.6, 0.2, 0, 8);
poeBox(c, 0.6, 0.02, 0.02, br, 1.6, 0.4, 0);
[-0.3, 0.3].forEach(function (o) { poeCyl(c, 0.12, 0.08, 0.03, br, 1.6 + o, 0.25, 0, 12); });
for (var w = 0; w < 4; w++)
poeCyl(c, 0.03 - w * 0.004, 0.03 - w * 0.004, 0.05, br, 2.0 + w * 0.07, 0.025, 0.15, 8);
poeBox(c, 0.4, 0.22, 0.3, poeS("oak", 0x3A2010), -0.2, 0.11, -0.1);
for (var j = 0; j < 3; j++)
poeCyl(c, 0.08, 0.09, 0.26, poeShine(0xD8E8F0, 0.05, 0.3), 0.4 + j * 0.25, 0.13, 0.15, 10);
for (var j2 = 0; j2 < 3; j2++)
poeSph(c, 0.05, poeC([0xE84A5A, 0xE8C040, 0x8AC83A][j2]), 0.4 + j2 * 0.25, 0.08, 0.15, 6);
if (k === "bread") {
for (var b = 0; b < 3; b++) {
var bk = poeCyl(c, 0.28, 0.22, 0.14, poeS("rough", 0x9A7A4A), -1.3 + b * 0.6, 0.07, 0.05, 12, true);
for (var l = 0; l < 3; l++) {
var lf = poeSph(c, 0.08, poeC([0xB8803A, 0xA8702A, 0xC89048][l]), -1.3 + b * 0.6 + (l - 1) * 0.1, 0.16, 0.05, 8);
lf.scale.set(2.2, 0.8, 1);
lf.rotation.y = l;
}
}
}
else if (k === "cafe" || k === "wine") {
for (var gl = 0; gl < 5; gl++)
poeCyl(c, 0.035, 0.03, 0.12, poeShine(0xD8E8F0, 0.05, 0.3), -1.4 + gl * 0.2, 0.06, 0.2, 8);
poeBottle(c, -0.4, 0, 0.2, 0x2A4A1A);
}
else if (k === "books") {
for (var bb = 0; bb < 4; bb++)
poeParBooks(c, -1.4 + bb * 0.35, 0, 0.1, 3, 0.3);
}
else {
for (var bx = 0; bx < 4; bx++)
poeBox(c, 0.3, 0.12, 0.22, poeC([0xC8B898, 0x8A6A4A, 0x6A1A2A, 0x2A3A5A][bx]), -1.5 + bx * 0.36, 0.06 + 0.0, 0.1);
}
poeChair(g, -3.4, 1.4, 0.5, 0x6A1A1A);
poeChair(g, -4.4, 1.0, 0.2, 0x6A1A1A);
poeLight(0xFFD098, 1.0, 9, 0.5, 2.6, -3.4, g, false);
if (!POE.lite) {
for (var hg = 0; hg < 5; hg++) {
var hh = poeGrp(g, -1.8 + hg * 1.2, R.h - 0.5, -hd + 1.0);
poeCyl(hh, 0.005, 0.005, 0.4, poeC(0x8A7A5A), 0, -0.2, 0, 4);
if (k === "bread")
poeSph(hh, 0.12, poeC(0xB8803A), 0, -0.5, 0, 8).scale.set(1, 1.6, 1);
else if (k === "wine" || k === "cafe")
poeSph(hh, 0.12, poeC(0x8A2A1A), 0, -0.5, 0, 8).scale.set(1, 1.8, 1);
else
poeCone(hh, 0.12, 0.3, poeC([0x6A1A2A, 0x2A3A5A, 0xC8B898][hg % 3]), 0, -0.55, 0);
}
}
},
function (R, g, f, person, solid) {
var hw = R.w / 2, hd = R.d / 2, lite = POE.lite, oak = poeS("oak", 0x5A3A1A);
for (var b = 0; b < 5; b++) {
poeBox(g, 0.35, 0.35, R.d - 0.1, poeS("oak", 0x3A2414), -4.8 + b * 2.4, R.h - 0.18, 0);
}
for (var h = 0; h < (lite ? 8 : 16); h++) {
var hx = -4.8 + (h % 5) * 2.4 + 0.3 * ((h * 3) % 2 ? 1 : -1), hz = -3.6 + Math.floor(h / 5) * 2.2, hb = poeGrp(g, hx, R.h - 0.4, hz);
poeCyl(hb, 0.005, 0.005, 0.3, poeC(0x8A7A5A), 0, -0.15, 0, 4);
poeCyl(hb, 0.03, 0.03, 0.06, poeC(0x8A6A3A), 0, -0.32, 0, 6);
if (h % 4 === 3) {
for (var on = 0; on < 5; on++)
poeSph(hb, 0.06, poeC(0xB8803A), Math.cos(on * 1.3) * 0.05, -0.4 - on * 0.07, Math.sin(on * 1.3) * 0.05, 6);
}
else
for (var sp = 0; sp < 7; sp++) {
var a2 = sp * 0.9, st2 = poeSph(hb, 0.035, poeC([0x4A5A2A, 0x6A6A3A, 0x5A4A2A][h % 3]), Math.cos(a2) * 0.04, -0.5, Math.sin(a2) * 0.04, 5);
st2.scale.set(1, 5, 1);
st2.rotation.z = Math.cos(a2) * 0.15;
st2.rotation.x = Math.sin(a2) * 0.15;
}
}
if (f === 0) {
poeParWainscot(R, g, 0x4A2A14, 1.2);
poeRug(g, 0.6, 0.2, 6, 3.2, 0x7A2A1A);
var hg = poeGrp(g, 1.4, 0, -hd + 0.4);
poeBox(hg, 3.4, 0.25, 1.0, poeS("stone", 0xA8A090), 0, 0.12, 0.2);
poeBox(hg, 0.5, 2.4, 0.9, poeS("stone", 0xA8A090), -1.45, 1.2, 0.1);
poeBox(hg, 0.5, 2.4, 0.9, poeS("stone", 0xA8A090), 1.45, 1.2, 0.1);
poeBox(hg, 3.6, 0.6, 1.1, poeS("stone", 0xB8B0A0), 0, 2.6, 0.1);
poeBox(hg, 2.4, 2.2, 0.1, poeC(0x0A0806), 0, 1.2, -0.3);
for (var lg = 0; lg < 4; lg++) {
var l = poeCyl(hg, 0.08, 0.09, 0.8, poeS("bark"), -0.3 + lg * 0.2, 0.32, 0.1, 6);
l.rotation.z = Math.PI / 2;
l.rotation.y = 0.3 * lg;
}
var em = poeGlowM(0xFF7A20, 0.9);
for (var fl = 0; fl < 6; fl++) {
var fm = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.55, 6), em);
fm.position.set(-0.4 + fl * 0.16, 0.62, 0.12);
hg.add(fm);
POE.flames.push({ m: fm, s: 1, ph: fl * 1.1 });
}
poeBox(hg, 0.04, 1.4, 0.04, poeShine(0x1A1A1A, 0.6, 0.6), 0, 1.6, 0.1);
var pot = poeSph(hg, 0.32, poeShine(0x1A1A1A, 0.5, 0.6), 0, 0.95, 0.15, 12);
pot.scale.y = 0.8;
poeCyl(hg, 0.28, 0.28, 0.02, poeC(0x6A4A2A), 0, 1.18, 0.15, 12);
var gl = wGlow(0xFF8A30, 3.2, 0.75);
gl.position.set(0, 0.8, 0.6);
hg.add(gl);
poeLight(0xFF8A40, 1.8, 13, 1.4, 0.9, -hd + 1.4, g, true);
poeBox(g, 3.6, 0.08, 0.3, oak, 1.4, 2.95, -hd + 1.0);
[0, 1, 2, 3].forEach(function (i) { poeCyl(g, 0.1, 0.08, 0.22, poeShine([0x8A8A8A, 0xA85A3A, 0xE8E4DA, 0x6A6A6A][i], 0.3, 0.5), 0.2 + i * 0.8, 3.1, -hd + 1.0, 10); });
poeTable(g, 0.6, 0.6, 4.6, 1.1, 0.78, 0, null);
solid(0.6, 0.6, 4.6, 1.1);
for (var bn = 0; bn < 2; bn++) {
poeBox(g, 4.6, 0.45, 0.35, oak, 0.6, 0.23, bn ? 1.45 : -0.25);
solid(0.6, bn ? 1.45 : -0.25, 4.6, 0.35, 0.5);
}
var t = poeGrp(g, 0.6, 0.79, 0.6);
for (var p = 0; p < 8; p++) {
var px = -1.9 + (p % 4) * 1.25, pz = p < 4 ? -0.35 : 0.35;
poeCyl(t, 0.11, 0.07, 0.06, poeS("rough", 0x9A6A4A), px, 0.03, pz, 10);
poeCyl(t, 0.04, 0.035, 0.1, poeShine(0x8A8A8A, 0.3, 0.6), px + 0.2, 0.05, pz, 8);
}
var loaf = poeSph(t, 0.16, poeC(0xB8803A), -0.6, 0.07, 0, 10);
loaf.scale.set(1.8, 0.6, 0.9);
var loaf2 = poeSph(t, 0.13, poeC(0xA8702A), 1.2, 0.06, 0, 10);
loaf2.scale.set(1.6, 0.6, 0.9);
poeCyl(t, 0.2, 0.16, 0.18, poeShine(0x3A2A1A, 0.4, 0.3), 0.3, 0.09, 0, 12);
poeBottle(t, -1.4, 0, 0.05, 0x3A0A0A);
poeBottle(t, 1.8, 0, -0.05, 0x3A0A0A);
poeCandle(t, -0.2, 0, 0.1, 0.26, true);
poeCandle(t, 1.0, 0, -0.1, 0.26, true);
for (var ap = 0; ap < 5; ap++)
poeSph(t, 0.05, poeC([0xC83A2A, 0x8AA83A, 0xE8C040][ap % 3]), -1.0 + ap * 0.08, 0.05, -0.1 + (ap % 2) * 0.08, 8);
for (var k = 0; k < 3; k++) {
poeBed(g, -hw + 1.2, -0.6 + k * 2.0, Math.PI / 2, [0x8A2A2A, 0x2A4A6A, 0x6A5A2A][k]);
poeParChest(g, -hw + 2.5, -0.6 + k * 2.0, Math.PI / 2, 0x5A3A1A);
}
solid(-hw + 1.2, 1.4, 2.2, 6.0);
var ng = poeGrp(g, hw - 0.06, 0, -1.0, -Math.PI / 2);
poeBox(ng, 1.0, 1.5, 0.15, poeS("stone", 0xC8C0AC), 0, 2.0, 0.05);
poeBox(ng, 0.8, 1.2, 0.05, poeC(0x2A3A6A), 0, 2.0, 0.12);
var vg = poeGrp(ng, 0, 1.4, 0.25);
poeCone(vg, 0.17, 0.8, poeShine(0xE8E4F0, 0.4, 0.1), 0, 0.45, 0);
poeSph(vg, 0.08, poeShine(0xE8D8C8, 0.4, 0.1), 0, 0.9, 0);
poeCone(vg, 0.12, 0.35, poeShine(0x3A5AA8, 0.4, 0.1), 0, 0.75, 0);
poeCyl(ng, 0.05, 0.04, 0.1, poeShine(0x8A2A1A, 0.2, 0.2), 0, 1.3, 0.3, 8);
poeFlame(ng, 0, 1.4, 0.3, 1.2);
var vgl = wGlow(0xFFB860, 1.0, 0.7);
vgl.position.set(0, 1.5, 0.4);
ng.add(vgl);
var ins = wSign(["“We, labouring men and women, living in the porch of this house, made in the year of grace 1407,", "are bound each of us to say every day a Paternoster and an Ave Maria, praying God", "that His grace may pardon poor sinners departed. Amen.”"], 5, 0.7, "#E8DCC0", "#2A2018");
ins.scale.setScalar(0.8);
ins.position.set(-2.6, 2.7, -hd + 0.08);
g.add(ins);
poeParSconce(g, -hw + 0.06, 2.2, 0.4, Math.PI / 2);
poeParSconce(g, hw - 0.06, 2.0, 2.6, -Math.PI / 2);
poeParChandelier(g, R.h - 1.1, false, lite).position.set(0.6, R.h - 1.1, 0.6);
poeParShelf(g, hw - 0.15, 1.6, 1.6, -Math.PI / 2, 2.0, "crock");
poeCask(g, hw - 0.7, 0, 3.6, 0.8);
poeCask(g, hw - 1.6, 0, 3.8, 0.8);
poeParPlant(g, -1.4, hd - 0.6, 0.8);
var cat = poeGrp(g, 2.4, 0, -hd + 1.6, 0.6), cm = poeC(0x3A2A1A);
var cb = poeSph(cat, 0.16, cm, 0, 0.13, 0, 10);
cb.scale.set(1, 0.8, 1.6);
poeSph(cat, 0.09, cm, 0, 0.2, 0.26, 8);
poeCone(cat, 0.03, 0.07, cm, -0.05, 0.3, 0.27);
poeCone(cat, 0.03, 0.07, cm, 0.05, 0.3, 0.27);
poeRoomPerson(R, "flamelLodger", 1.2, 1.9, Math.PI, { role: "workman", sex: "m", talk: { name: "An old lodger of the Flamel house", persona: "An old porter who lodges in the house built by Nicolas Flamel at 51 Rue de Montmorency, Paris, 1841. Flamel built it in 1407 so that poor labourers could live in it for nothing but two prayers a day for the dead, as the carved inscription on the front says. He knows the legends: Flamel and his wife Pernelle, the book of Abraham the Jew, the red powder, the arch at the Cemetery of the Innocents (whose bones are now in the Catacombs), the rumour that Flamel never died. He is pious, cheerful and a little superstitious. Never mentions anything after 1841.", greet: "You read the stones outside? Then you know the rent here: two prayers a day. Sit, there is soup, and the fire is warm." } });
poeRoomPerson(R, "flamelLodger2", -0.4, -0.6, 0.2, { role: "poorf", sex: "f", talk: { name: "A lodger's wife, ladling soup", persona: "A poor washerwoman who lodges with her husband in Nicolas Flamel's old house at 51 Rue de Montmorency, Paris, 1841. Warm, talkative, tired. She serves the soup to the lodgers, says her two prayers a day for the rent, and has heard that a gentleman in black is sometimes seen on the stair at night who looks like the old carving of Flamel. Never mentions anything after 1841.", greet: "Bonsoir! Sit, sit, there is enough for one more. Say your prayer first, that is the rent." } });
if (!lite)
poeRoomPerson(R, "flamelLodger3", 2.4, 1.9, Math.PI * 1.1, { role: "workman", sex: "m", talk: { name: "A young mason from the Limousin", persona: "A young mason from the Limousin who lodges in Flamel's house at 51 Rue de Montmorency while working on the buildings of Paris in 1841. Cheerful, homesick, proud of his trade; he works on the new fortifications and the Hôtel de Ville. Never mentions anything after 1841.", greet: "Evening! You are not from the quarter. Neither am I: the Limousin. We masons build all of Paris." } });
return;
}
poeParWainscot(R, g, 0x3A2414, 1.2);
poeRug(g, 0.4, 0, 6, 4.4, 0x6A1A2A);
if (!lite)
poeRug(g, 0.4, 0, 5.2, 3.6, 0x2A3A6A, 0.008);
poeDesk(g, 0, -1.4, 0);
solid(0, -1.4, 1.6, 0.8);
poeChair(g, 0, -0.6, Math.PI, 0x6A1A1A);
var desk = poeGrp(g, 0, 0.8, -1.4);
poeBox(desk, 0.6, 0.02, 0.42, poeC(0xE8DCB8), -0.2, 0.01, 0.05);
poeBox(desk, 0.02, 0.06, 0.42, poeC(0x8A6A3A), -0.2, 0.03, 0.05);
poeCyl(desk, 0.04, 0.04, 0.06, poeC(0x101010), 0.35, 0.03, 0.1, 8);
poeCyl(desk, 0.004, 0.004, 0.25, poeC(0xF0F0F0), 0.37, 0.12, 0.12, 4);
poeParBooks(desk, 0.5, 0, -0.15, 4);
poeCandelabrum(g, 0.65, 0.8, -1.35, 0.8, true);
var at = poeGrp(g, hw - 1.4, 0, -hd + 1.0);
poeBox(at, 1.2, 1.1, 1.0, poeS("brick", 0x8A4A2A), 0, 0.55, 0);
poeCyl(at, 0.4, 0.5, 0.9, poeS("brick", 0x8A4A2A), 0, 1.55, 0, 12);
poeFace(at, 0.5, 0.35, poeGlowM(0xFF6A10, 0.95), 0, 0.4, 0.51, 0);
var alb = poeSph(at, 0.2, poeShine(0xC8E0E8, 0.05, 0.2), 0, 2.2, 0, 12);
poeCyl(at, 0.03, 0.02, 0.6, poeShine(0xC8E0E8, 0.05, 0.2), 0.3, 2.35, 0, 8).rotation.z = -1.0;
poeSph(at, 0.12, poeShine(0x8AC8A0, 0.05, 0.2), 0.65, 1.4, 0, 10);
var ag = wGlow(0xFF6A20, 2.2, 0.7);
ag.position.set(0, 0.5, 0.8);
at.add(ag);
poeLight(0xFF7A30, 1.4, 10, hw - 1.4, 0.8, -hd + 1.9, g, true);
solid(hw - 1.4, -hd + 1.0, 1.3, 1.1);
poeTable(g, hw - 1.2, 0.6, 1.8, 0.8, 0.8, Math.PI / 2, null);
solid(hw - 1.2, 0.6, 0.9, 1.8);
var wt = poeGrp(g, hw - 1.2, 0.81, 0.6);
for (var j = 0; j < 9; j++)
poeCyl(wt, 0.05 + 0.02 * (j % 3), 0.06, 0.12 + 0.06 * (j % 3), poeShine([0x6A1A1A, 0x1A5A3A, 0xC8A040, 0x8AB8C8, 0x3A2A6A][j % 5], 0.05, 0.3), -0.25 + (j % 3) * 0.25, 0.08, -0.6 + Math.floor(j / 3) * 0.5, 8);
var mortar = poeCyl(wt, 0.1, 0.08, 0.12, poeS("stone", 0x9A9284), 0.2, 0.06, 0.7, 10);
poeBookcase(g, -hw + 0.3, 0.4, 2.6, 2.8, Math.PI / 2);
solid(-hw + 0.3, 0.4, 0.5, 2.6);
poeParShelf(g, -1.6, 2.0, -hd + 0.15, 0, 2.4, "jars");
poeParShelf(g, -1.6, 1.5, -hd + 0.15, 0, 2.4, "books");
var glb = poeGrp(g, -2.6, 0, 2.4);
poeCyl(glb, 0.04, 0.12, 0.9, poeC(POE_WOOD), 0, 0.45, 0, 8);
poeSph(glb, 0.3, poeS("oldpaper", 0xD8C8A0), 0, 1.15, 0, 16);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.015, 6, 24), poeShine(0xC8A050, 0.3, 0.9));
ring.position.y = 1.15;
ring.rotation.x = 0.4;
glb.add(ring);
poeParChest(g, 1.8, hd - 0.6, Math.PI, 0x4A2A14);
poeBed(g, -hw + 1.3, 3.7, Math.PI / 2, 0x6A1A2A);
solid(-hw + 1.3, 3.7, 2.2, 1.6);
poePainting(g, 0, 2.3, -hd + 0.08, 0, 2.2, 1.4, function (x, W, H) { x.fillStyle = "#2A2418"; x.fillRect(0, 0, W, H); x.strokeStyle = "#C8A858"; x.lineWidth = 4; x.beginPath(); x.arc(W * 0.3, H * 0.5, H * 0.3, 0, 7); x.stroke(); x.beginPath(); x.moveTo(W * 0.6, H * 0.8); x.lineTo(W * 0.75, H * 0.2); x.lineTo(W * 0.9, H * 0.8); x.closePath(); x.stroke(); x.fillStyle = "#A83A2A"; x.beginPath(); x.arc(W * 0.3, H * 0.5, H * 0.1, 0, 7); x.fill(); x.fillStyle = "#C8A858"; x.font = "bold " + Math.round(H * 0.08) + "px serif"; x.fillText("ABRAHAM · PERNELLE · NICOLAS", W * 0.08, H * 0.95); }, "parFlamelFig");
[[-hw + 0.06, 2.4, 2.6, Math.PI / 2], [hw - 0.06, 2.4, 2.6, -Math.PI / 2]].forEach(function (q, i) {
var tp = poePainting(g, q[0], q[1], q[2], q[3], 1.6, 2.0, function (x, W, H) {
var G = x.createLinearGradient(0, 0, 0, H);
G.addColorStop(0, i ? "#2A3A1A" : "#3A1A1A");
G.addColorStop(1, "#14100A");
x.fillStyle = G;
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C8A858";
x.lineWidth = 3;
x.strokeRect(W * 0.06, H * 0.05, W * 0.88, H * 0.9);
x.fillStyle = i ? "#8AA83A" : "#C83A2A";
x.beginPath();
if (i) {
x.moveTo(W * 0.5, H * 0.15);
x.lineTo(W * 0.5, H * 0.8);
x.lineWidth = 6;
x.strokeStyle = "#C8A858";
x.stroke();
x.beginPath();
x.ellipse(W * 0.5, H * 0.35, W * 0.18, H * 0.06, 0.6, 0, 7);
x.fillStyle = "#8AA83A";
x.fill();
}
else {
x.arc(W * 0.5, H * 0.4, W * 0.22, 0, 7);
x.fill();
x.fillStyle = "#E8E0D0";
x.beginPath();
x.arc(W * 0.5, H * 0.7, W * 0.14, 0, 7);
x.fill();
}
}, "parFlamelTap" + i);
});
poeParSconce(g, -hw + 0.06, 2.0, -1.4, Math.PI / 2);
poeParSconce(g, 1.8, 2.0, -hd + 0.06, 0);
poeParChandelier(g, R.h - 1.0, false, lite).position.set(0, R.h - 1.0, -0.4);
poeRoomPerson(R, "flamelScribe", -1.2, -0.4, 0.5, { role: "gent", sex: "m", talk: { name: "An old scholar who keeps Flamel's room", persona: "An old antiquary and copyist who rents the upper room of Nicolas Flamel's house at 51 Rue de Montmorency, Paris, 1841, and keeps it as Flamel left it: the desk, the books, the little furnace. He has spent his life on Flamel: the scrivener's shop by Saint-Jacques-la-Boucherie, Pernelle, the book of Abraham the Jew bought for two florins, the journey to Santiago, the hieroglyphic figures on the arch at the Cemetery of the Innocents, the houses and hospitals Flamel built, the tomb-slab now kept at the Saint-Jacques tower. He half believes Flamel never died and walks below in the quarries. Gentle, learned, delighted by a visitor. Never mentions anything after 1841.", greet: "A visitor! Come in, come in, mind the furnace. This was his room, you know. I keep it as he left it." } });
poeSpot(R.x, -0.6, 1.6, "Nicolas Flamel's writing-desk", "look at it", function () { poeCard("Nicolas Flamel's desk", "<p>The scrivener's desk, worn by six lifetimes of elbows. A manuscript lies open on it, the ink not quite dry. Someone has scratched into the wood, very small, the figures from his book: a serpent on a cross, a flowering desert, the slaughter of the innocents, and two lovers in red and white. Under them, in a late hand: <i>He is not dead. He walks below.</i></p><p>Flamel himself is in the Catacombs, behind his door. Go down any stair of the quarries to find him.</p>"); }, 0);
poeSpot(R.x + hw - 1.4, -hd + 2.2, 1.6, "The furnace of the work", "look into it", function () { poeCard("The athanor", "<p>The brick furnace is warm. Somebody tends it still: the coals are banked, the glass vessel over it holds a little red earth that does not burn away. On a slip of paper tucked into the bricks, in the same late hand: <i>Patience, and the fire of the lamp.</i></p>"); }, 0);
},
function (s, y0, r, n) {
r = r || s * 0.8;
n = n || 8;
var cl = -s / 2 + r, ta = Math.acos(Math.max(-1, Math.min(1, (s / 2 - r) / r))), P = [];
for (var i = 0; i <= n; i++) {
var t = Math.PI + (ta - Math.PI) * i / n;
P.push([cl + r * Math.cos(t), y0 + r * Math.sin(t)]);
}
for (var j = 1; j <= n; j++) {
var t2 = (Math.PI - ta) * (1 - j / n);
P.push([-cl + r * Math.cos(t2), y0 + r * Math.sin(t2)]);
}
return P;
},
function (len, h, th, opens, mat) {
var S = new THREE.Shape(), low = opens.filter(function (o) { return !o.y && !o.c; }).sort(function (a, b) { return a.x - b.x; });
S.moveTo(-len / 2, 0);
low.forEach(function (o) { S.lineTo(o.x - o.w / 2, 0); poeNdArchPts(o.w, o.h, o.r, 6).forEach(function (p) { S.lineTo(o.x + p[0], p[1]); }); S.lineTo(o.x + o.w / 2, 0); });
S.lineTo(len / 2, 0);
S.lineTo(len / 2, h);
S.lineTo(-len / 2, h);
S.lineTo(-len / 2, 0);
opens.forEach(function (o) {
if (!o.y && !o.c)
return;
var H = new THREE.Path();
if (o.c) {
H.absarc(o.x, o.y, o.c, 0, Math.PI * 2, true);
}
else {
H.moveTo(o.x - o.w / 2, o.y);
poeNdArchPts(o.w, o.y + o.h, o.r, 6).forEach(function (p) { H.lineTo(o.x + p[0], p[1]); });
H.lineTo(o.x + o.w / 2, o.y);
H.lineTo(o.x - o.w / 2, o.y);
}
S.holes.push(H);
});
var g = new THREE.ExtrudeGeometry(S, { depth: th, bevelEnabled: false, curveSegments: POE.lite ? 10 : 20 });
g.translate(0, 0, -th / 2);
return new THREE.Mesh(g, mat);
},
function (s, b, y0, r, th, mat) {
var S = new THREE.Shape(), out = poeNdArchPts(s + 2 * b, y0, (r || s * 0.8) + b, 8), inn = poeNdArchPts(s, y0, r || s * 0.8, 8).reverse();
S.moveTo(out[0][0], out[0][1]);
out.forEach(function (p) { S.lineTo(p[0], p[1]); });
inn.forEach(function (p) { S.lineTo(p[0], p[1]); });
S.lineTo(out[0][0], out[0][1]);
var g = new THREE.ExtrudeGeometry(S, { depth: th, bevelEnabled: false });
g.translate(0, 0, -th / 2);
return new THREE.Mesh(g, mat);
},
function (root) {
root.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(root.matrixWorld).invert(), by = {}, kill = [];
root.traverse(function (o) {
if (!o.isMesh || o.isInstancedMesh || o.userData.nomerge || !o.geometry || !o.material || o.material.isMeshBasicMaterial)
return;
var A = o.geometry.attributes;
if (!A.uv || !A.normal)
return;
var k = o.material.uuid;
(by[k] || (by[k] = { m: o.material, l: [] })).l.push(o);
});
function cat(A) { var n = 0; A.forEach(function (a) { n += a.length; }); var r = new Float32Array(n), o = 0; A.forEach(function (a) { r.set(a, o); o += a.length; }); return r; }
for (var k in by) {
var L = by[k].l;
if (L.length < 2)
continue;
var P = [], N = [], U = [];
L.forEach(function (o) {
var g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone(), M = new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld);
g.applyMatrix4(M);
P.push(g.attributes.position.array);
N.push(g.attributes.normal.array);
U.push(g.attributes.uv.array);
g.dispose();
kill.push(o);
});
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(cat(P), 3));
G.setAttribute("normal", new THREE.BufferAttribute(cat(N), 3));
G.setAttribute("uv", new THREE.BufferAttribute(cat(U), 2));
G.computeBoundingSphere();
var mm = new THREE.Mesh(G, by[k].m);
root.add(mm);
}
kill.forEach(function (o) { if (o.parent)
o.parent.remove(o); if (!o.userData.keepGeo)
o.geometry.dispose(); });
},
function () {
var t = poeNdCanvasTex("ndAshlar", POE.lite ? 256 : 512, POE.lite ? 256 : 512, function (x, W, H) {
var R = wRand(4701), m = W / 4.4;
x.fillStyle = "#D4CCB8";
x.fillRect(0, 0, W, H);
for (var r = 0; r < 8; r++) {
var y = r * 0.55 * m, off = (r % 2) * 0.55 * m;
for (var c = -1; c < 5; c++) {
var bx = c * 1.1 * m + off, v = R();
x.fillStyle = "rgba(" + (200 + v * 30 | 0) + "," + (192 + v * 28 | 0) + "," + (170 + v * 30 | 0) + ",1)";
x.fillRect(bx + 1, y + 1, 1.1 * m - 2, 0.55 * m - 2);
if (R() < 0.25) {
x.fillStyle = "rgba(90,80,60," + (0.05 + R() * 0.12) + ")";
x.fillRect(bx + 1, y + 1, 1.1 * m - 2, 0.55 * m - 2);
}
}
x.fillStyle = "rgba(80,70,54,.55)";
x.fillRect(0, y, W, 2);
for (var c2 = -1; c2 < 5; c2++)
x.fillRect(c2 * 1.1 * m + off, y, 2, 0.55 * m);
}
poeNz(x, W, H, Math.round(W * H / 30), 0.12, 4702);
poeNz(x, W, H, Math.round(W * H / 60), 0.08, 4703, "255,250,236");
poeStain(x, W, H, 6, 4704, "60,54,40", 0.18);
}, true);
t.repeat.set(1 / 4.4, 1 / 4.4);
return t;
},
function (key, w, h, fn, rep) {
if (POE.tex[key])
return POE.tex[key];
var c = poeParCanvas(w, h), x = c.getContext("2d");
fn(x, w, h);
var t = new THREE.CanvasTexture(c);
if (rep) {
t.wrapS = t.wrapT = THREE.RepeatWrapping;
}
try {
t.anisotropy = Math.min(POE.lite ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
return (POE.tex[key] = t);
},
function () {
return poeNdCanvasTex("ndGlass", 128, 320, function (x, W, H) {
var R = wRand(4401);
x.fillStyle = "#0A1A5A";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 700; i++) {
x.fillStyle = ["#1A3A9A", "#0A2A7A", "#2A4AAA", "#14246A"][i % 4];
x.fillRect(R() * W, R() * H, 6 + R() * 10, 6 + R() * 10);
}
x.fillStyle = "#8A1A1A";
x.fillRect(0, 0, 12, H);
x.fillRect(W - 12, 0, 12, H);
for (var b = 0; b < H; b += 16) {
x.fillStyle = b % 32 ? "#C8A020" : "#2A8A4A";
x.fillRect(2, b + 4, 8, 8);
x.fillRect(W - 10, b + 4, 8, 8);
}
for (var m = 0; m < 4; m++) {
var cy = 40 + m * 76;
x.fillStyle = "#9A1A1A";
x.beginPath();
x.arc(W / 2, cy, 32, 0, 7);
x.fill();
x.fillStyle = "#1A2A8A";
x.beginPath();
x.arc(W / 2, cy, 26, 0, 7);
x.fill();
x.fillStyle = ["#E8C850", "#2A8A3A", "#E8E0D0", "#C83A2A"][m];
x.beginPath();
x.ellipse(W / 2 - 6, cy + 4, 6, 13, 0, 0, 7);
x.fill();
x.fillStyle = "#E8D0B0";
x.beginPath();
x.arc(W / 2 - 6, cy - 12, 5, 0, 7);
x.fill();
x.fillStyle = "#C8A030";
x.beginPath();
x.arc(W / 2 - 6, cy - 12, 8, 0, 7);
x.globalAlpha = 0.5;
x.fill();
x.globalAlpha = 1;
x.fillStyle = ["#2A8A3A", "#C83A2A", "#8A2A8A", "#E8C850"][m];
x.beginPath();
x.ellipse(W / 2 + 8, cy + 6, 6, 12, 0, 0, 7);
x.fill();
x.fillStyle = "#E8D0B0";
x.beginPath();
x.arc(W / 2 + 8, cy - 8, 4.5, 0, 7);
x.fill();
}
x.strokeStyle = "#0A0806";
x.lineWidth = 3;
for (var gy = 0; gy < H; gy += 38) {
x.beginPath();
x.moveTo(0, gy);
x.lineTo(W, gy);
x.stroke();
}
x.beginPath();
x.moveTo(W / 2, 0);
x.lineTo(W / 2, H);
x.lineWidth = 1.5;
x.stroke();
for (var k = 0; k < 160; k++) {
x.strokeStyle = "rgba(10,8,6,.7)";
x.lineWidth = 1;
x.beginPath();
var a = R() * W, c = R() * H;
x.moveTo(a, c);
x.lineTo(a + (R() - 0.5) * 30, c + (R() - 0.5) * 30);
x.stroke();
}
});
},
function (n, key) {
return poeNdCanvasTex(key || "ndRose" + n, POE.lite ? 256 : 512, POE.lite ? 256 : 512, function (x, W, H) {
var R = wRand(4500 + n), c = W / 2, rr = W / 2;
x.fillStyle = "#000";
x.fillRect(0, 0, W, H);
x.save();
x.beginPath();
x.arc(c, c, rr * 0.99, 0, 7);
x.clip();
for (var i = 0; i < 2600; i++) {
var a = R() * 7, d = Math.sqrt(R()) * rr;
x.fillStyle = ["#1A3A9A", "#0A2A7A", "#9A1A2A", "#2A4AAA", "#C83A2A", "#E8B830", "#2A7A4A", "#6A1A6A"][Math.floor(R() * (d > rr * 0.5 ? 8 : 5))];
x.fillRect(c + Math.cos(a) * d - 4, c + Math.sin(a) * d - 4, 8, 8);
}
x.strokeStyle = "#0A0806";
for (var ring = 1; ring <= 4; ring++) {
x.lineWidth = ring === 4 ? 10 : 6;
x.beginPath();
x.arc(c, c, rr * ring / 4.2, 0, 7);
x.stroke();
}
for (var s = 0; s < n; s++) {
var t = s / n * Math.PI * 2;
x.lineWidth = 5;
x.beginPath();
x.moveTo(c + Math.cos(t) * rr * 0.24, c + Math.sin(t) * rr * 0.24);
x.lineTo(c + Math.cos(t) * rr, c + Math.sin(t) * rr);
x.stroke();
var mx = c + Math.cos(t + Math.PI / n) * rr * 0.62, my = c + Math.sin(t + Math.PI / n) * rr * 0.62;
x.lineWidth = 4;
x.beginPath();
x.arc(mx, my, rr * 0.1, 0, 7);
x.stroke();
var mx2 = c + Math.cos(t + Math.PI / n) * rr * 0.86, my2 = c + Math.sin(t + Math.PI / n) * rr * 0.86;
x.beginPath();
x.arc(mx2, my2, rr * 0.07, 0, 7);
x.stroke();
}
x.fillStyle = "#1A2A8A";
x.beginPath();
x.arc(c, c, rr * 0.2, 0, 7);
x.fill();
x.fillStyle = "#E8C850";
x.beginPath();
x.arc(c, c, rr * 0.12, 0, 7);
x.fill();
x.fillStyle = "#E8D8C0";
x.beginPath();
x.arc(c, c - rr * 0.05, rr * 0.04, 0, 7);
x.fill();
x.fillStyle = "#2A3A9A";
x.beginPath();
x.ellipse(c, c + rr * 0.05, rr * 0.045, rr * 0.08, 0, 0, 7);
x.fill();
x.restore();
});
},
function () {
return poeNdCanvasTex("ndFront", POE.lite ? 512 : 1024, POE.lite ? 538 : 1076, function (x, W, H) {
var m = W / 41, R = wRand(4601);
function py(v) { return H - v * m; }
function px(u) { return (u + 20.5) * m; }
x.fillStyle = "#C8C0AC";
x.fillRect(0, 0, W, H);
for (var cy = 0; cy < 43; cy += 0.55) {
var row = Math.round(cy / 0.55);
x.fillStyle = "rgba(70,62,50,.35)";
x.fillRect(0, py(cy), W, 1.2);
for (var cx = (row % 2) * 0.55; cx < 41; cx += 1.1) {
x.fillRect(cx * m, py(cy + 0.55), 1, 0.55 * m);
var s = R();
if (s < 0.3) {
x.fillStyle = "rgba(255,250,235," + (0.05 + 0.08 * s) + ")";
x.fillRect(cx * m + 1, py(cy + 0.55) + 1, 1.1 * m - 2, 0.55 * m - 2);
}
x.fillStyle = "rgba(70,62,50,.35)";
}
}
poeNz(x, W, H, Math.round(W * H / 40), 0.1, 4602);
poeNz(x, W, H, Math.round(W * H / 80), 0.08, 4603, "255,248,230");
[[16.6, 0.5], [21.7, 0.6], [32.6, 0.5], [42.6, 0.4]].forEach(function (b) { x.fillStyle = "#E0D8C4"; x.fillRect(0, py(b[0] + b[1]), W, b[1] * m); x.fillStyle = "rgba(30,24,16,.55)"; x.fillRect(0, py(b[0]), W, 0.3 * m); });
x.fillStyle = "#5A5244";
x.fillRect(0, py(21.6), W, (21.6 - 17.1) * m);
x.fillStyle = "rgba(20,16,10,.5)";
for (var k = 0; k < 28; k++) {
var u = -20.5 + 0.73 + k * 1.465;
x.fillRect(px(u) - 0.4 * m, py(21.2), 0.8 * m, 4 * m);
}
[[-13.5, 6.5], [0, 7.5], [13.5, 6.5]].forEach(function (P, i) {
var w = P[1] + 3, sp = i === 1 ? 6.2 : 5.6;
for (var a = 0; a < 5; a++) {
var s = w + 0.9 + a * 0.55, pts = poeNdArchPts(s, sp, s * 0.8, 14);
x.strokeStyle = a % 2 ? "rgba(60,52,40,.6)" : "rgba(240,232,214,.5)";
x.lineWidth = a % 2 ? 2 : 4;
x.beginPath();
pts.forEach(function (p, j) { var X = px(P[0] + p[0]), Y = py(p[1]); if (j)
x.lineTo(X, Y);
else
x.moveTo(X, Y); });
x.stroke();
for (var f = 0; f < pts.length; f += 2) {
x.fillStyle = "rgba(70,60,46,.5)";
x.beginPath();
x.ellipse(px(P[0] + pts[f][0]), py(pts[f][1]), 0.12 * m, 0.22 * m, 0, 0, 7);
x.fill();
}
}
for (var j = 0; j < 4; j++)
[-1, 1].forEach(function (sd) { var u = P[0] + sd * (w / 2 + 0.5 + j * 0.42); x.fillStyle = "rgba(90,80,64,.7)"; x.fillRect(px(u) - 0.15 * m, py(4.6), 0.3 * m, 2.6 * m); x.fillStyle = "rgba(200,190,170,.6)"; x.fillRect(px(u) - 0.16 * m, py(4.7), 0.32 * m, 0.12 * m); });
});
for (var b = 0; b < 6; b++) {
var u2 = -20 + b * 0.75;
[u2, -u2 - 0.75].forEach(function (uu) { var pts = poeNdArchPts(0.55, 26, 0.45, 6); x.strokeStyle = "rgba(60,52,40,.5)"; x.lineWidth = 2; x.beginPath(); x.moveTo(px(uu + 0.375 - 0.275), py(22.5)); pts.forEach(function (p) { x.lineTo(px(uu + 0.375 + p[0]), py(p[1])); }); x.lineTo(px(uu + 0.375 + 0.275), py(22.5)); x.stroke(); });
}
x.strokeStyle = "rgba(60,52,40,.6)";
x.lineWidth = 0.5 * m;
x.beginPath();
x.arc(px(0), py(26), 5.6 * m, 0, 7);
x.stroke();
x.strokeStyle = "rgba(240,232,214,.45)";
x.lineWidth = 0.25 * m;
x.beginPath();
x.arc(px(0), py(26), 6.1 * m, 0, 7);
x.stroke();
x.fillStyle = "#4A4438";
x.fillRect(0, py(40), W, (40 - 33.1) * m);
for (var st = 0; st < 70; st++) {
var sx = R() * W, sy = py(16.6 + Math.floor(R() * 4) * 8.6), L = (2 + R() * 9) * m, G = x.createLinearGradient(0, sy, 0, sy + L);
G.addColorStop(0, "rgba(30,26,20,.32)");
G.addColorStop(1, "rgba(30,26,20,0)");
x.fillStyle = G;
x.fillRect(sx, sy, (0.2 + R() * 0.9) * m, L);
}
poeStain(x, W, H, 40, 4604, "40,34,24", 0.25);
var Gb = x.createLinearGradient(0, py(4), 0, H);
Gb.addColorStop(0, "rgba(40,34,24,0)");
Gb.addColorStop(1, "rgba(40,34,24,.35)");
x.fillStyle = Gb;
x.fillRect(0, py(4), W, 4 * m);
});
},
function (x, W, H) {
var G = x.createLinearGradient(0, 0, 0, H);
G.addColorStop(0, "#3A2A1A");
G.addColorStop(1, "#120C08");
x.fillStyle = G;
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(232,200,120,.5)";
x.beginPath();
x.arc(W * 0.5, H * 0.2, W * 0.3, 0, 7);
x.fill();
[[0.3, 0x8A1A1A], [0.5, 0x1A3A8A], [0.7, 0x6A5A2A]].forEach(function (f, i) { x.fillStyle = "#" + f[1].toString(16).padStart(6, "0"); x.beginPath(); x.ellipse(W * f[0], H * 0.72, W * 0.09, H * 0.22, 0, 0, 7); x.fill(); x.fillStyle = "#E8C8A0"; x.beginPath(); x.arc(W * f[0], H * 0.47, W * 0.04, 0, 7); x.fill(); x.strokeStyle = "#E8C850"; x.lineWidth = 3; x.beginPath(); x.arc(W * f[0], H * 0.47, W * 0.06, 0, 7); x.stroke(); });
},
function (x, W, H) {
x.fillStyle = "#1A140E";
x.fillRect(0, 0, W, H);
var G = x.createRadialGradient(W * 0.5, H * 0.55, 5, W * 0.5, H * 0.55, W * 0.5);
G.addColorStop(0, "rgba(255,220,150,.8)");
G.addColorStop(1, "rgba(255,220,150,0)");
x.fillStyle = G;
x.fillRect(0, 0, W, H);
x.fillStyle = "#1A3A8A";
x.beginPath();
x.ellipse(W * 0.4, H * 0.7, W * 0.1, H * 0.18, 0, 0, 7);
x.fill();
x.fillStyle = "#E8E0D0";
x.fillRect(W * 0.45, H * 0.6, W * 0.14, H * 0.06);
x.fillStyle = "#E8C8A0";
x.beginPath();
x.arc(W * 0.4, H * 0.5, W * 0.04, 0, 7);
x.fill();
x.fillStyle = "#6A3A1A";
x.beginPath();
x.ellipse(W * 0.7, H * 0.72, W * 0.08, H * 0.17, 0, 0, 7);
x.fill();
},
function (x, W, H) {
var G = x.createLinearGradient(0, 0, 0, H);
G.addColorStop(0, "#5A6A8A");
G.addColorStop(0.5, "#C8A070");
G.addColorStop(1, "#2A1E14");
x.fillStyle = G;
x.fillRect(0, 0, W, H);
x.fillStyle = "#8A1A1A";
x.beginPath();
x.ellipse(W * 0.5, H * 0.68, W * 0.12, H * 0.26, 0, 0, 7);
x.fill();
x.fillStyle = "#E8C8A0";
x.beginPath();
x.arc(W * 0.5, H * 0.38, W * 0.05, 0, 7);
x.fill();
x.strokeStyle = "#E8C850";
x.lineWidth = 4;
x.beginPath();
x.arc(W * 0.5, H * 0.38, W * 0.08, 0, 7);
x.stroke();
for (var i = 0; i < 6; i++) {
x.fillStyle = ["#2A3A6A", "#5A4A2A", "#3A5A3A"][i % 3];
x.beginPath();
x.ellipse(W * (0.1 + i * 0.16), H * 0.9, W * 0.06, H * 0.12, 0, 0, 7);
x.fill();
}
},
function (R, q, C, a, solidW) {
var lite = POE.lite, gt = poeNdStone(0xFFFFFF, 0x7A7466), dk = poeNdStone(0xB8B0A0, 0x5A5448), lead = poeShine(0x3A3E46, 0.55, 0.5), front = poeNdFrontM(), glassL = poeNdGlassM(false, "lancet"), seg = lite ? 14 : 24, dark = poeC(0x14120E);
var arch = poeGrp(q, 0, 0, 0);
var F = -67, wf = poeNdWall(41, 43, 2.6, [{ x: -13.5, w: 9.5, h: 5.6 }, { x: 0, w: 10.5, h: 6.2 }, { x: 13.5, w: 9.5, h: 5.6 }, { x: 0, y: 26, c: 4.9 }, { x: -13.6, w: 4.2, y: 22.8, h: 4.5 }, { x: 13.6, w: 4.2, y: 22.8, h: 4.5 }], front);
poeNdPut(arch, wf, F + 1.3, 0, 0, -Math.PI / 2);
[[-13.5, 6.5, 5.6], [0, 7.5, 6.2], [13.5, 6.5, 5.6]].forEach(function (P, i) {
for (var r = 0; r < 5; r++) {
var s = P[1] + 2.4 - r * 0.6;
poeNdPut(arch, poeNdRing(s, 0.32, P[2], s * 0.8, 0.5, r % 2 ? dk : gt), F + 0.3 + r * 0.5, 0, P[0], -Math.PI / 2);
[-1, 1].forEach(function (sd) { var col = poeCyl(arch, 0.18, 0.2, P[2], r % 2 ? gt : dk, F + 0.3 + r * 0.5, P[2] / 2, P[0] + sd * (s / 2 + 0.1), 8); if (!lite && r < 3) {
var fig = poeCyl(arch, 0.22, 0.26, 1.6, dk, F - 0.1 + r * 0.5, 3.4, P[0] + sd * (s / 2 + 0.1), 8);
} });
}
var D = F + 3.2, ap = poeNdApex(P[1], P[2], P[1] * 0.8);
poeBox(arch, 0.3, P[2] - 0.6, P[1], poeS("oak", 0x3A2414), D, (P[2] - 0.6) / 2, P[0]);
poeBox(arch, 0.4, 0.6, P[1], dk, D - 0.1, P[2] - 0.3, P[0]);
var ty = poeNdWall(P[1], ap - P[2] + 0.01, 0.3, [], dk);
poeNdPut(arch, ty, D - 0.15, P[2], P[0], -Math.PI / 2);
for (var tier = 0; tier < 3; tier++) {
var n = 7 - tier * 2, wd = P[1] * (0.85 - tier * 0.22);
for (var f = 0; f < n; f++) {
var fz = P[0] - wd / 2 + wd * (f + 0.5) / n;
poeCyl(arch, 0.16, 0.2, 0.9, gt, D - 0.45, P[2] + 0.6 + tier * 1.15, fz, 6);
poeSph(arch, 0.11, gt, D - 0.45, P[2] + 1.15 + tier * 1.15, fz, 6);
}
}
poeBox(arch, 0.6, P[2] - 0.6, 0.7, dk, D - 0.4, (P[2] - 0.6) / 2, P[0]);
poeCyl(arch, 0.25, 0.3, 1.0, dk, D - 0.6, P[2] - 0.1, P[0], 8);
});
[-19.2, -7.2, 7.2, 19.2].forEach(function (z) { poeBox(arch, 3.0, 43, 2.6, gt, F - 1.2, 21.5, z); poeBox(arch, 3.4, 0.5, 3.0, dk, F - 1.2, 16.8, z); poeBox(arch, 3.4, 0.5, 3.0, dk, F - 1.2, 32.8, z); });
var gk = poeNdWall(41, 4.6, 0.7, (function () { var o = []; for (var k = 0; k < 28; k++)
o.push({ x: -20.5 + 0.73 + k * 1.465, w: 1.05, h: 3.3, r: 0.6 }); return o; })(), gt);
poeNdPut(arch, gk, F - 0.15, 17.1, 0, -Math.PI / 2);
poeBox(arch, 1.4, 0.35, 41, dk, F - 0.4, 17.0, 0);
for (var k2 = 0; k2 < 28; k2 += lite ? 3 : 1)
poeBox(arch, 0.5, 0.5 + ((k2 * 7) % 3) * 0.2, 0.5, dk, F + 0.35, 17.4, -20.5 + 0.73 + k2 * 1.465);
var gw = new THREE.Mesh(new THREE.CircleGeometry(4.9, seg * 2), poeNdGlassM(false, "west"));
gw.position.set(F + 2.4, 26, 0);
gw.rotation.y = -Math.PI / 2;
arch.add(gw);
[4.9, 3.3, 1.3].forEach(function (r) { var t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.22, 6, seg * 2), gt); t.position.set(F + 1.6, 26, 0); t.rotation.y = Math.PI / 2; arch.add(t); });
for (var sp = 0; sp < 12; sp++) {
var b = poeBox(arch, 0.25, 3.6, 0.25, gt, F + 1.6, 26, 0);
b.rotation.x = sp * Math.PI / 12;
b.position.set(F + 1.6, 26 + Math.cos(sp * Math.PI / 6) * 3.1 * 0, 0);
var bb = poeBox(arch, 0.22, 2.1, 0.22, gt, F + 1.6, 26 + Math.cos(sp * Math.PI / 6) * 2.3, Math.sin(sp * Math.PI / 6) * 2.3);
bb.rotation.x = -sp * Math.PI / 6;
}
[-13.6, 13.6].forEach(function (z) { poeFace(arch, 4.2, 8.2, glassL, F + 2.4, 25.8, z, -Math.PI / 2); });
var gv = poeNdWall(41, 6.6, 0.6, (function () { var o = []; for (var k = 0; k < 34; k++)
o.push({ x: -20.5 + 0.6 + k * 1.21, w: 0.8, h: 5.0, r: 0.5 }); return o; })(), gt);
poeNdPut(arch, gv, F - 0.2, 33.2, 0, -Math.PI / 2);
poeBox(arch, 1.4, 0.4, 41, dk, F - 0.3, 33.1, 0);
var gg = poeNdWall(41, 5.4, 0.8, (function () { var o = []; for (var k = 0; k < 24; k++)
o.push({ x: -20.5 + 0.85 + k * 1.7, w: 1.1, h: 3.6, r: 0.66 }); return o; })(), gt);
poeNdPut(arch, gg, F + 0.9, 43, 0, -Math.PI / 2);
poeBox(arch, 11, 5.4, 13, dark, F + 7.5, 45.7, 0);
poeBox(arch, 12, 0.5, 42, dk, F + 6, 43.0, 0);
[-13.75, 13.75].forEach(function (z) {
var tw = poeGrp(arch, F + 6.5, 48.4, z);
poeBox(tw, 11.5, 20.6, 11.5, dark, 0, 10.3, 0);
[[0, -6.75, 0], [0, 6.75, Math.PI], [-6.75, 0, -Math.PI / 2], [6.75, 0, Math.PI / 2]].forEach(function (s) {
var fc = poeNdWall(13.5, 20.6, 1.0, [{ x: -3.1, w: 3.2, y: 3.2, h: 10.5, r: 2.6 }, { x: 3.1, w: 3.2, y: 3.2, h: 10.5, r: 2.6 }], gt);
poeNdPut(tw, fc, s[0], 0, s[1], s[2]);
var fg = poeGrp(tw, s[0] * 0.9, 0, s[1] * 0.9, s[2]);
[-3.1, 3.1].forEach(function (o) { for (var l = 0; l < (lite ? 5 : 11); l++) {
var lv = poeBox(fg, 3.0, 0.08, 0.5, poeC(0x2A2420), o, 4.0 + l * (lite ? 2.2 : 1.0), 0);
lv.rotation.x = 0.5;
} });
});
[-1, 1].forEach(function (sx) { poeBox(tw, 0.9, 22, 0.9, gt, sx * 6.3, 10, -6.3); poeBox(tw, 0.9, 22, 0.9, gt, sx * 6.3, 10, 6.3); });
poeBox(tw, 14, 0.6, 14, dk, 0, 20.9, 0);
for (var bl = 0; bl < (lite ? 12 : 28); bl++) {
var t = bl / (lite ? 12 : 28), side = Math.floor(t * 4), u = (t * 4 - side) * 13 - 6.5;
var bx = side === 0 ? u : side === 1 ? 6.5 : side === 2 ? -u : -6.5, bz = side === 0 ? -6.5 : side === 1 ? u : side === 2 ? 6.5 : -u;
poeBox(tw, 0.3, 0.9, 0.3, gt, bx, 21.6, bz);
}
poeBox(tw, 14, 0.25, 14, dk, 0, 22.1, 0);
[-1, 1].forEach(function (cx) { [-1, 1].forEach(function (cz) { poeCone(tw, 0.5, 2.2, gt, cx * 6.6, 23.2, cz * 6.6); }); });
});
poeBox(arch, 9.6, 43, 41, gt, F + 8.3, 21.5, 0);
var gab = new THREE.Shape();
gab.moveTo(-7, 0);
gab.lineTo(7, 0);
gab.lineTo(0, 10);
gab.lineTo(-7, 0);
var gG = new THREE.ExtrudeGeometry(gab, { depth: 0.8, bevelEnabled: false });
var L0 = -54, L1 = 44, LL = L1 - L0, LC = (L0 + L1) / 2, bays = [];
for (var bx2 = L0 + 2.75; bx2 < L1; bx2 += 5.5)
if (bx2 < -4.5 || bx2 > 10.5)
bays.push(bx2);
function winRow(y, w, h, r) { return bays.map(function (bx) { return { x: bx - LC, w: w, y: y, h: h, r: r }; }); }
[-1, 1].forEach(function (s) {
var ry = s > 0 ? 0 : Math.PI;
poeNdPut(arch, poeNdWall(LL, 33, 1.2, winRow(21.6, 2.6, 5.2, 1.9), gt), LC, 0, s * 7, ry);
bays.forEach(function (bx) { poeFace(arch, 2.6, 7.2, glassL, bx, 25.6, s * 6.5, ry); });
poeNdPut(arch, poeNdWall(LL, 21, 1.0, winRow(13.4, 2.2, 3.4, 1.6), gt), LC, 0, s * 13.4, ry);
poeNdPut(arch, poeNdWall(LL, 12, 1.0, winRow(3.6, 3.4, 4.0, 2.4), gt), LC, 0, s * 20, ry);
if (!lite)
bays.forEach(function (bx) { poeFace(arch, 3.4, 6.0, glassL, bx, 6.4, s * 19.5, ry); });
var t1 = poeBox(arch, LL, 0.3, 6.8, lead, LC, 22.2, s * 10.2);
t1.rotation.x = s * 0.32;
var t2 = poeBox(arch, LL, 0.3, 7.6, lead, LC, 13.0, s * 16.7);
t2.rotation.x = s * 0.24;
bays.forEach(function (bx) {
var px = bx + 2.75;
if (px > -4.5 && px < 10.5)
return;
poeBox(arch, 1.6, 25, 2.6, gt, px, 12.5, s * 21.4);
poeCone(arch, 1.0, 4.5, dk, px, 27.2, s * 21.4);
poeBox(arch, 1.0, 8, 1.6, gt, px, 24, s * 13.8);
if (!lite)
poeCone(arch, 0.6, 3, dk, px, 29.5, s * 13.8);
var fl = poeNdFlyer(gt);
fl.position.set(px, 0, 0);
fl.rotation.y = s > 0 ? -Math.PI / 2 : Math.PI / 2;
arch.add(fl);
});
});
var nr = poeRoof(arch, LL, 14.4, 10.5, 33, lead);
nr.position.x = LC;
[-1, 1].forEach(function (s) {
poeNdPut(arch, poeNdWall(14, 33, 1.4, [{ x: 0, w: 4.2, h: 4.0 }, { x: 0, y: 20, c: 6.4 }, { x: -4.6, w: 1.6, y: 5, h: 9, r: 1.2 }, { x: 4.6, w: 1.6, y: 5, h: 9, r: 1.2 }], gt), 3, 0, s * 24, s > 0 ? 0 : Math.PI);
var rg = new THREE.Mesh(new THREE.CircleGeometry(6.4, seg * 2), poeNdGlassM(false, s > 0 ? "north" : "south"));
rg.position.set(3, 20, s * 23.6);
rg.rotation.y = s > 0 ? 0 : Math.PI;
arch.add(rg);
var rt = new THREE.Mesh(new THREE.TorusGeometry(6.4, 0.3, 6, seg * 2), gt);
rt.position.set(3, 20, s * 24.6);
arch.add(rt);
var rt2 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.22, 6, seg), gt);
rt2.position.set(3, 20, s * 24.5);
arch.add(rt2);
for (var sp2 = 0; sp2 < 24; sp2 += lite ? 2 : 1) {
var a2 = sp2 / 24 * Math.PI * 2, bar = poeBox(arch, 0.18, 3.8, 0.2, gt, 3 + Math.cos(a2) * 4.5, 20 + Math.sin(a2) * 4.5, s * 24.5);
bar.rotation.z = a2 - Math.PI / 2;
}
[-4.6, 4.6].forEach(function (o) { poeFace(arch, 1.6, 10, glassL, 3 + o, 10.5, s * 23.4, s > 0 ? 0 : Math.PI); });
poeBox(arch, 4.6, 4.4, 0.6, poeS("oak", 0x3A2414), 3, 2.2, s * 23.8);
var gb = new THREE.Mesh(gG, gt);
gb.position.set(3, 33, s * 24);
gb.rotation.y = s > 0 ? 0 : Math.PI;
arch.add(gb);
[-1, 1].forEach(function (e) { poeBox(arch, 2.0, 38, 2.4, gt, 3 + e * 7.6, 19, s * 24.4); poeCone(arch, 1.1, 5, dk, 3 + e * 7.6, 40.5, s * 24.4); });
});
poeBox(arch, 14, 33, 34, gt, 3, 16.5, 0);
var tr = poeRoof(arch, 48, 14.4, 10.5, 33, lead);
tr.rotation.y = Math.PI / 2;
tr.position.x = 3;
var A = poeGrp(arch, 44, 0, 0), ap1 = new THREE.Mesh(new THREE.CylinderGeometry(7.6, 7.6, 33, seg, 1, true, 0, Math.PI), poeDS(gt));
ap1.position.y = 16.5;
A.add(ap1);
var ap2 = new THREE.Mesh(new THREE.CylinderGeometry(20, 20, 12, seg * 2, 1, true, 0, Math.PI), poeDS(gt));
ap2.position.y = 6;
A.add(ap2);
var ar1 = new THREE.Mesh(new THREE.ConeGeometry(7.8, 10.5, seg, 1, true, 0, Math.PI), poeDS(lead));
ar1.position.y = 38.25;
A.add(ar1);
var ar2 = new THREE.Mesh(new THREE.CylinderGeometry(7.6, 20.6, 9, seg * 2, 1, true, 0, Math.PI), poeDS(lead));
ar2.position.y = 16.5;
A.add(ar2);
for (var ai = 0; ai < 9; ai++) {
var aa = -Math.PI / 2 + (ai + 0.5) * Math.PI / 9, ca = Math.cos(aa), sa = Math.sin(aa);
poeFace(A, 2.2, 6.4, glassL, ca * 7.65, 25, sa * 7.65, Math.PI / 2 - aa);
if (!lite)
poeFace(A, 2.8, 5.4, glassL, ca * 20.05, 6, sa * 20.05, Math.PI / 2 - aa);
var bt = poeBox(A, 2.6, 25, 1.6, gt, ca * 21.6, 12.5, sa * 21.6);
bt.rotation.y = -aa;
poeCone(A, 1.0, 4.5, dk, ca * 21.6, 27.2, sa * 21.6);
if (ai < 8) {
var fa = aa + Math.PI / 18, holder = poeGrp(A, 0, 0, 0, Math.PI / 2 - fa), f3 = poeNdFlyer(gt);
f3.rotation.y = -Math.PI / 2;
holder.add(f3);
}
}
if (!lite)
bays.forEach(function (bx) { [-1, 1].forEach(function (s) { var gy = poeBox(arch, 0.5, 0.4, 1.6, dk, bx + 2.75, 12.2, s * 21.2); }); });
poeNdMerge(arch);
[[-74, -12], [-74, 12], [-84, -5], [-84, 5]].forEach(function (p, i) { var lp = poeGrp(q, p[0], 0, p[1]); poeCyl(lp, 0.08, 0.12, 4.2, poeC(0x141414), 0, 2.1, 0, 8); poeBox(lp, 0.45, 0.6, 0.45, poeShine(0x1A1A1A, 0.6, 0.6), 0, 4.5, 0); poeBox(lp, 0.36, 0.46, 0.36, poeGlowM(0xFFD090), 0, 4.5, 0); var gl = wGlow(0xFFC070, 3.2, 0.75); gl.position.y = 4.5; lp.add(gl); if (i < 2)
poeLight(0xFFC078, 1.6, 24, p[0] + 3, 4.5, p[1], q, false); });
var ca2 = Math.cos(a), sa2 = Math.sin(a), ex = C[0] + ca2 * (F - 2.4), ez = C[1] + sa2 * (F - 2.4);
poeSpot(R.x + ex, ez, 3.2, "Notre-Dame de Paris (the Portal of the Last Judgment)", "go in", function () { poeNdEnter(); }, 0);
POE_ND.door = { x: ex, z: ez, ry: Math.atan2(-ca2, -sa2) };
solidW([C[0] + ca2 * (F + 6), C[1] + sa2 * (F + 6)], 13, 42, 70, -a);
},
function (mat) {
var k = "ndFlyer";
if (!POE.geo)
POE.geo = {};
var G = POE.geo[k];
if (!G) {
var S = new THREE.Shape();
S.moveTo(7.6, 31.4);
S.lineTo(20.6, 25.2);
S.lineTo(20.6, 22.6);
S.quadraticCurveTo(10.5, 22.8, 7.6, 28.0);
S.lineTo(7.6, 31.4);
G = new THREE.ExtrudeGeometry(S, { depth: 0.9, bevelEnabled: false, curveSegments: 10 });
G.translate(0, 0, -0.45);
POE.geo[k] = G;
}
var m = new THREE.Mesh(G, mat);
m.userData.keepGeo = 1;
return m;
},
function (R, g) {
var lite = POE.lite, st = poeNdStone(0xFFFFFF, 0x3A3428), st2 = poeNdStone(0xD8D0C0, 0x2E2A20), vault = poeDS(poeNdLit(poeS("vault", 0xE0D8C8), 0x5A5040)), rib = poeNdStone(0xB8B0A0, 0x2A2620), oak = poeS("oak", 0x4A2A14), gold = poeShine(0xD8A848, 0.3, 0.85), marble = poeShine(0xF0ECE4, 0.25, 0.05), glassL = poeNdGlassM(true, "lancet"), seg = lite ? 14 : 24;
R.banner = function () { return "Notre-Dame de Paris, 1841 · " + poeNdWhere(); };
var A = poeGrp(g, 0, 0, 0);
function solid(x, z, w, d, h, ry) { poeSolid(R.x + x, z, w, d, -1, h || 8, ry || 0); }
var fl = poePlane(A, 120, 48, poeS("flags", 0xC8C0B0), 4.5, 0, 0, 0);
poeFloor(R.x + 4.5, 0, 124, 52, 0, true);
for (var ts = 0; ts < (lite ? 6 : 14); ts++) {
var tx = -44 + ts * 6.1, tz = ts % 2 ? -9.5 : 9.5;
var tg = poeGrp(A, tx, 0.012, tz);
tg.rotation.x = -Math.PI / 2;
poePic(tg, 1.2, 2.2, function (x, W, H) { x.fillStyle = "#3A3630"; x.fillRect(0, 0, W, H); x.strokeStyle = "#9A9284"; x.lineWidth = 3; x.strokeRect(6, 6, W - 12, H - 12); x.fillStyle = "#B8B0A0"; x.font = "bold " + Math.round(W * 0.08) + "px serif"; x.textAlign = "center"; ["CY GIST", "NOBLE HOMME", "MAISTRE", "IEHAN", "DE PARIS", "PRIEZ DIEV", "POVR LVY"].forEach(function (t, i) { x.fillText(t, W / 2, H * (0.14 + i * 0.1)); }); x.beginPath(); x.moveTo(W / 2, H * 0.82); x.lineTo(W / 2, H * 0.95); x.moveTo(W * 0.42, H * 0.86); x.lineTo(W * 0.58, H * 0.86); x.stroke(); }, 0, 0, 0, 0, "ndTomb");
}
var L0 = -55, L1 = 44, LL = L1 - L0, LC = (L0 + L1) / 2, piers = [];
for (var px = -48.5; px <= -4.4; px += 5.5)
piers.push(px);
for (var px2 = 10.5; px2 <= 38.1; px2 += 5.5)
piers.push(px2);
var bayx = [];
piers.forEach(function (p, i) { if (i < piers.length - 1 && piers[i + 1] - p < 6)
bayx.push((p + piers[i + 1]) / 2); });
bayx.push(41.25);
function isX(x) { return x > -4.6 && x < 10.6; }
[-1, 1].forEach(function (s) {
var ry = s > 0 ? Math.PI : 0, z = s * 7;
var open = [];
bayx.forEach(function (bx) { if (isX(bx))
return; open.push({ x: bx - LC, w: 4.3, h: 7.6, r: 3.2 }); open.push({ x: bx - LC - 1.15, w: 1.5, y: 12.4, h: 3.6, r: 1.0 }); open.push({ x: bx - LC + 1.15, w: 1.5, y: 12.4, h: 3.6, r: 1.0 }); open.push({ x: bx - LC, w: 2.5, y: 20.4, h: 5.2, r: 1.8 }); });
open.push({ x: 3 - LC, w: 13.6, h: 16, r: 10.5 });
open.push({ x: -51.75 - LC, w: 4.3, h: 7.6, r: 3.2 });
poeNdPut(A, poeNdWall(LL, 34, 1.2, open, st), LC, 0, z, ry);
bayx.forEach(function (bx) { if (isX(bx))
return; poeFace(A, 2.5, 7.6, glassL, bx, 24.4, s * 7.55, ry); poeFace(A, 3.2, 4.6, poeC(0x2A2620), bx, 14.4, s * 7.7, ry); });
piers.forEach(function (p) {
if (isX(p))
return;
poeCyl(A, 0.68, 0.72, 7.4, st, p, 3.7, z, seg);
poeBox(A, 1.9, 0.55, 1.9, st2, p, 7.75, z);
poeCyl(A, 0.9, 0.7, 0.5, st2, p, 7.3, z, seg);
poeCyl(A, 0.95, 0.95, 0.3, st2, p, 0.15, z, seg);
if (!lite)
poeCyl(A, 0.16, 0.16, 16.4, st, p, 16.2, z - s * 0.72, 8);
solid(p, z, 1.5, 1.5, 34);
});
function segs(z, h, th, mk) { [[L0, -4.5], [10.5, L1]].forEach(function (S) { var c = (S[0] + S[1]) / 2, o = []; bayx.forEach(function (bx) { if (bx > S[0] && bx < S[1])
o.push(mk(bx - c)); }); poeNdPut(A, poeNdWall(S[1] - S[0], h, th, o, st), c, 0, z, ry); }); }
bayx.push(-51.75);
segs(s * 13.2, 10.2, 0.9, function (x) { return { x: x, w: 4.4, h: 5.8, r: 3.2 }; });
bayx.pop();
piers.forEach(function (p) { if (isX(p))
return; poeCyl(A, 0.5, 0.54, 5.8, st, p, 2.9, s * 13.2, seg); poeBox(A, 1.3, 0.45, 1.3, st2, p, 6.0, s * 13.2); solid(p, s * 13.2, 1.1, 1.1, 10); });
bayx.push(-51.75);
segs(s * 20.4, 10.2, 1.0, function (x) { return { x: x, w: 3.2, y: 2.8, h: 3.4, r: 2.3 }; });
bayx.pop();
bayx.forEach(function (bx) { if (!isX(bx))
poeFace(A, 3.2, 6.0, glassL, bx, 5.6, s * 20.85, ry); });
solid(-29.75, s * 20.6, 50.5, 1.2, 12);
solid(27.25, s * 20.6, 33.5, 1.2, 12);
[[L0, -4.5], [10.5, L1]].forEach(function (S) { var c = (S[0] + S[1]) / 2, w = S[1] - S[0]; poePlane(A, w, 6.2, vault, c, 10.2, s * 10.1, 0).rotation.x = Math.PI; poePlane(A, w, 7.2, vault, c, 10.2, s * 16.8, 0).rotation.x = Math.PI; });
bayx.forEach(function (bx, i) {
if (isX(bx))
return;
if (i % 1 === 0) {
var pw = poeBox(A, 0.7, 10.2, 2.6, st, bx + 2.75, 5.1, s * 19.0);
solid(bx + 2.75, s * 19.0, 0.8, 2.6, 10);
}
if (!lite || i % 2 === 0)
poeNdChapel(A, bx, s, i);
});
if (!lite)
piers.forEach(function (p) { if (isX(p))
return; var rb = poeBox(A, 0.35, 0.3, 13.2, rib, p, 10.05, s * 13.6); });
});
poeNdPut(A, poeNdWall(48, 34, 1.4, [{ x: -13.6, w: 4.4, h: 4.4 }, { x: 0, w: 5.4, h: 4.6 }, { x: 13.6, w: 4.4, h: 4.4 }, { x: 0, y: 24, c: 4.9 }], st), L0 - 0.7, 0, 0, Math.PI / 2);
[-13.6, 0, 13.6].forEach(function (z) { poeFace(A, z ? 4.4 : 5.4, 7.5, poeC(0x2A1A10), L0 - 1.2, 3.75, z, Math.PI / 2); });
solid(L0 - 1.6, 0, 1.6, 50, 34);
var rw = new THREE.Mesh(new THREE.CircleGeometry(4.9, seg * 2), poeNdGlassM(true, "west"));
rw.position.set(L0 - 1.3, 24, 0);
rw.rotation.y = Math.PI / 2;
A.add(rw);
[-1, 1].forEach(function (s) {
var ry = s > 0 ? Math.PI : 0;
poeNdPut(A, poeNdWall(14.4, 34, 1.4, [{ x: 0, w: 3.6, h: 3.6 }, { x: 0, y: 20, c: 6.4 }, { x: -4.6, w: 1.6, y: 5, h: 9, r: 1.2 }, { x: 4.6, w: 1.6, y: 5, h: 9, r: 1.2 }], st), 3, 0, s * 24.7, ry);
var rg = new THREE.Mesh(new THREE.CircleGeometry(6.4, seg * 2), poeNdGlassM(true, s > 0 ? "north" : "south"));
rg.position.set(3, 20, s * 25.3);
rg.rotation.y = ry;
A.add(rg);
[-4.6, 4.6].forEach(function (o) { poeFace(A, 1.6, 10, glassL, 3 + o, 10.5, s * 25.3, ry); });
solid(3, s * 25.6, 16, 1.4, 34);
[-4.5, 10.5].forEach(function (xx) { poeBox(A, 0.9, 34, 4.2, st, xx, 17, s * 22.6); solid(xx, s * 22.6, 1.0, 4.2, 34); poeCyl(A, 1.0, 1.05, 16, st, xx, 8, s * 7, seg); poeCyl(A, 0.6, 0.62, 10, st, xx, 5, s * 13.2, seg); solid(xx, s * 7, 2.1, 2.1, 34); solid(xx, s * 13.2, 1.3, 1.3, 10); });
});
var nv = poeNdRing(14, 0.5, 24, 10.5, LL, vault);
nv.position.set(LC, 0, 0);
nv.rotation.y = Math.PI / 2;
A.add(nv);
var tv = poeNdRing(14.2, 0.5, 24, 10.6, 48.8, vault);
tv.position.set(3, 0, 0);
A.add(tv);
piers.forEach(function (p) { if (isX(p))
return; var t = poeNdRing(13.6, 0.45, 24, 10.2, 0.5, rib); t.position.set(p, 0, 0); t.rotation.y = Math.PI / 2; A.add(t); });
if (!lite)
bayx.forEach(function (bx) { if (isX(bx))
return; [-1, 1].forEach(function (d) { var dr = poeNdRing(14.6, 0.3, 24, 10.5, 0.35, rib); dr.position.set(bx, 0, 0); dr.rotation.y = Math.PI / 2 + d * Math.atan2(5.5, 14); A.add(dr); }); });
var AP = poeGrp(A, 44, 0, 0);
for (var c = 0; c < 7; c++) {
var aa = -Math.PI / 2 + c * Math.PI / 6, cx = Math.cos(aa) * 7.2, cz = Math.sin(aa) * 7.2;
poeCyl(AP, 0.62, 0.66, 7.4, st, cx, 3.7, cz, seg);
poeBox(AP, 1.6, 0.5, 1.6, st2, cx, 7.7, cz);
solid(44 + cx, cz, 1.3, 1.3, 34);
var c2x = Math.cos(aa) * 13.4, c2z = Math.sin(aa) * 13.4;
poeCyl(AP, 0.5, 0.54, 5.8, st, c2x, 2.9, c2z, seg);
solid(44 + c2x, c2z, 1.1, 1.1, 10);
}
var up = new THREE.Mesh(new THREE.CylinderGeometry(7.6, 7.6, 16.2, seg, 1, true, 0, Math.PI), poeDS(st));
up.position.y = 16.1;
AP.add(up);
var hd = new THREE.Mesh(new THREE.SphereGeometry(7.6, seg, 10, Math.PI / 2, Math.PI, 0, Math.PI / 2), poeDS(st));
hd.position.y = 24.2;
hd.scale.y = 1.28;
AP.add(hd);
var amb = new THREE.Mesh(new THREE.RingGeometry(7.6, 20.4, seg * 2, 1, -Math.PI / 2, Math.PI), vault);
amb.rotation.x = Math.PI / 2;
amb.position.y = 10.2;
AP.add(amb);
var ow = new THREE.Mesh(new THREE.CylinderGeometry(20.4, 20.4, 10.2, seg * 2, 1, true, 0, Math.PI), poeDS(st));
ow.position.y = 5.1;
AP.add(ow);
for (var aw = 0; aw < 9; aw++) {
var a3 = -Math.PI / 2 + (aw + 0.5) * Math.PI / 9, ca = Math.cos(a3), sa = Math.sin(a3);
poeFace(AP, 2.4, 6.6, glassL, ca * 7.5, 24, sa * 7.5, -Math.PI / 2 - a3);
poeFace(AP, 2.8, 5.4, glassL, ca * 20.3, 5.6, sa * 20.3, -Math.PI / 2 - a3);
}
for (var aw2 = 0; aw2 < 26; aw2++) {
var a4 = -Math.PI / 2 + aw2 * Math.PI / 25;
solid(44 + Math.cos(a4) * 21.0, Math.sin(a4) * 21.0, 1.4, 3.0, 12, -a4);
}
var org = poeGrp(A, L0 + 3.6, 0, 0);
poeBox(org, 4.2, 0.6, 22, oak, 0, 8.2, 0);
poeBox(org, 0.3, 1.2, 22, oak, 1.9, 9.0, 0);
var orgArch = poeNdWall(22, 8, 1.0, [{ x: -6, w: 4.8, h: 4.4 }, { x: 6, w: 4.8, h: 4.4 }, { x: 0, w: 4.8, h: 4.4 }], st2);
poeNdPut(org, orgArch, 0, 0, 0, Math.PI / 2);
poeBox(org, 2.2, 9.5, 15, oak, -0.6, 13.2, 0);
poeBox(org, 2.6, 0.6, 15.6, gold, -0.4, 18.1, 0);
poeBox(org, 2.6, 0.5, 15.6, oak, -0.4, 8.7, 0);
[-6, -2.5, 2.5, 6].forEach(function (t) { poeCyl(org, 1.2, 1.2, 10.8, oak, 0.3, 13.9, t, 12); poeCone(org, 1.3, 1.6, oak, 0.3, 20.2, t); poeSph(org, 0.3, gold, 0.3, 21.2, t, 8); });
var pipe = poeShine(0xD8D8D0, 0.25, 0.95);
for (var pp = 0; pp < (lite ? 20 : 48); pp++) {
var t2 = -7 + pp * 14 / ((lite ? 20 : 48) - 1), ph = 3.2 + 2.6 * Math.abs(Math.sin(pp * 0.62));
poeCyl(org, 0.11, 0.11, ph, pipe, 0.95, 9.8 + ph / 2, t2, 8);
poeCone(org, 0.11, 0.25, pipe, 0.95, 9.7, t2);
}
[-9.7, -3, 3, 9.7].forEach(function (z) { solid(L0 + 3.6, z, 1.2, Math.abs(z) > 5 ? 2.6 : 1.2, 8); });
[-1, 1].forEach(function (s) {
for (var st3 = 0; st3 < (lite ? 10 : 20); st3++) {
var sx = 14 + st3 * 1.1 * (lite ? 2 : 1);
var stl = poeGrp(A, sx, 0, s * 5.6, s > 0 ? Math.PI : 0);
poeBox(stl, 1.0, 0.5, 0.6, oak, 0, 0.25, 0.1);
poeBox(stl, 1.0, 2.6, 0.1, poeS("panel", 0x4A2A14), 0, 1.3, -0.25);
poeBox(stl, 0.08, 1.0, 0.6, oak, 0.5, 0.75, 0.1);
}
poeBox(A, 23, 0.2, 1.3, oak, 24.5, 2.7, s * 5.9);
poeBox(A, 23, 0.5, 0.4, oak, 24.5, 0.25, s * 4.6);
solid(24.5, s * 5.6, 24, 1.2, 3);
var enc = poePainting(A, 27, 1.8, s * 7.7, s > 0 ? 0 : Math.PI, 22, 3.4, function (x, W, H) {
x.fillStyle = "#6A5A44";
x.fillRect(0, 0, W, H);
for (var p = 0; p < 10; p++) {
var X = p * W / 10;
x.fillStyle = "#2A3A6A";
x.fillRect(X + 4, 4, W / 10 - 8, H - 8);
x.strokeStyle = "#C8A040";
x.lineWidth = 3;
x.strokeRect(X + 4, 4, W / 10 - 8, H - 8);
for (var f = 0; f < 4; f++) {
x.fillStyle = ["#8A1A1A", "#C8A040", "#E8E0D0", "#2A6A3A"][(p + f) % 4];
x.beginPath();
x.ellipse(X + W / 10 * (0.2 + f * 0.2), H * 0.7, W / 10 * 0.07, H * 0.25, 0, 0, 7);
x.fill();
x.fillStyle = "#E8C8A0";
x.beginPath();
x.arc(X + W / 10 * (0.2 + f * 0.2), H * 0.38, W / 10 * 0.04, 0, 7);
x.fill();
}
}
}, "ndEnclosure");
});
var eg = poeGrp(A, 24, 0, 0);
poeCyl(eg, 0.25, 0.4, 1.3, gold, 0, 0.65, 0, 10);
var bird = poeSph(eg, 0.3, gold, 0, 1.55, 0, 10);
bird.scale.set(1.6, 0.7, 0.9);
[-1, 1].forEach(function (s) { var w = poeBox(eg, 0.7, 0.05, 0.5, gold, 0, 1.65, s * 0.35); w.rotation.x = s * 0.4; });
poeBox(eg, 0.5, 0.03, 0.7, poeC(0xE8DCC0), 0.1, 1.82, 0);
solid(24, 0, 0.8, 0.8, 2);
var S = poeGrp(A, 40.5, 0, 0);
for (var sp = 0; sp < 3; sp++)
poeBox(S, 3.2 - sp * 0.6, 0.2, 10 - sp * 1.6, poeS("marble", 0xE8E0D4), -sp * 0.3, 0.1 + sp * 0.2, 0);
solid(40.5, 0, 3.2, 10, 0.7);
poeBox(S, 1.4, 1.0, 3.6, poeS("marble", 0xD8D0C4), 0.2, 1.1, 0);
poeBox(S, 1.5, 0.06, 3.8, poeC(0xF0ECE4), 0.2, 1.63, 0);
poeBox(S, 0.05, 0.6, 3.6, gold, -0.52, 1.1, 0);
for (var cs = 0; cs < 6; cs++) {
var cz = -1.5 + cs * 0.6;
poeCyl(S, 0.05, 0.09, 0.9, gold, 0.55, 2.1, cz, 8);
poeCandle(S, 0.55, 2.55, cz, 0.3, true);
}
poeBox(S, 0.06, 1.2, 0.06, gold, 0.55, 2.4, 0);
poeBox(S, 0.06, 0.06, 0.6, gold, 0.55, 2.75, 0);
var vow = poeGrp(g, 0, 0, 0);
R.vow = vow;
var pie = poeGrp(vow, 45.5, 0, 0, -Math.PI / 2);
poeBox(pie, 3.2, 1.4, 2.0, poeS("marble", 0xD8D0C4), 0, 0.7, 0);
var vg = poeCone(pie, 0.9, 2.4, marble, 0, 2.6, 0);
var vh = poeSph(pie, 0.24, marble, 0, 3.9, 0.05, 12);
var vv = poeSph(pie, 0.34, marble, 0, 3.7, -0.08, 10);
vv.scale.set(1.1, 1.2, 0.8);
var body = poeCyl(pie, 0.18, 0.15, 1.9, marble, 0, 2.0, 0.55, 10);
body.rotation.z = Math.PI / 2.3;
poeSph(pie, 0.16, marble, -0.9, 2.25, 0.55, 10);
var glory = new THREE.Mesh(new THREE.CircleGeometry(2.6, seg), poeGlowM(0xE8B848, 0.35));
glory.position.set(0, 4.4, -0.8);
pie.add(glory);
for (var ry2 = 0; ry2 < 16; ry2++) {
var ray = poeBox(pie, 0.08, 2.6, 0.02, gold, 0, 4.4, -0.75);
ray.rotation.z = ry2 * Math.PI / 8;
ray.position.y = 4.4;
}
[-1, 1].forEach(function (s) {
var k = poeGrp(vow, 44.2, 0, s * 3.2, -Math.PI / 2);
poeBox(k, 1.0, 0.8, 1.0, poeS("marble", 0xD8D0C4), 0, 0.4, 0);
poeCone(k, 0.5, 1.2, marble, 0, 1.4, 0);
poeSph(k, 0.2, marble, 0, 2.1, 0, 10);
poeBox(k, 0.5, 0.5, 0.1, poeShine(0x2A3A8A, 0.3, 0.2), 0, 1.6, -0.3);
for (var an = 0; an < 3; an++) {
var ag = poeGrp(vow, 42 + an * 0.2, 0, s * (5.0 + an * 0.9), -Math.PI / 2);
poeCyl(ag, 0.18, 0.2, 0.9, poeShine(0x5A4A2A, 0.4, 0.7), 0, 1.6, 0, 8);
poeCone(ag, 0.25, 1.0, poeShine(0x5A4A2A, 0.4, 0.7), 0, 1.4, 0);
poeSph(ag, 0.13, poeShine(0x5A4A2A, 0.4, 0.7), 0, 2.2, 0, 8);
poeBox(ag, 0.05, 0.7, 0.5, poeShine(0x5A4A2A, 0.4, 0.7), 0.05, 2.0, -0.3);
}
});
solid(45.5, 0, 3.4, 9, 4);
var pu = poeGrp(A, -21.5, 0, 6.0, Math.PI);
poeCyl(pu, 0.2, 0.3, 2.2, oak, 0, 1.1, 0, 8);
poeCyl(pu, 0.8, 0.55, 1.1, poeS("panel", 0x4A2A14), 0, 2.7, 0, 8);
poeCyl(pu, 0.85, 0.85, 0.08, oak, 0, 3.27, 0, 8);
poeCyl(pu, 1.1, 1.1, 0.2, oak, 0, 5.4, 0.2, 8);
poeCone(pu, 0.5, 0.9, oak, 0, 5.95, 0.2);
poeSph(pu, 0.15, gold, 0, 6.5, 0.2, 8);
for (var sst = 0; sst < 6; sst++)
poeBox(pu, 0.8, 0.2, 0.4, oak, 0, 0.3 + sst * 0.36, 1.0 + sst * 0.25);
solid(-21.5, 6.0, 1.8, 1.8, 4);
var vm = poeGrp(A, 10.5, 0, -8.6, Math.PI);
poeBox(vm, 1.0, 1.6, 0.8, st2, 0, 0.8, 0);
poeCone(vm, 0.36, 1.8, poeShine(0xE8E4DA, 0.35, 0.05), 0, 2.5, 0);
poeSph(vm, 0.14, poeShine(0xE8DCC8, 0.35, 0.05), 0, 3.5, 0, 10);
poeSph(vm, 0.1, poeShine(0xE8DCC8, 0.35, 0.05), 0.12, 2.9, 0.18, 8);
poeCone(vm, 0.2, 0.3, gold, 0, 3.75, 0);
var cr = poeGrp(A, 9.0, 0, -9.4);
poeBox(cr, 2.0, 0.9, 0.6, poeShine(0x2A2A2A, 0.5, 0.6), 0, 0.45, 0);
for (var cdl = 0; cdl < (lite ? 10 : 24); cdl++) {
var cx2 = -0.9 + (cdl % 12) * 0.16, cz2 = -0.18 + Math.floor(cdl / 12) * 0.3;
poeCandle(cr, cx2, 0.9, cz2, 0.14 + 0.08 * ((cdl * 7) % 3), true);
}
var cg = wGlow(0xFFC070, 2.6, 0.65);
cg.position.set(0, 1.2, 0);
cr.add(cg);
solid(9.0, -9.4, 2.2, 0.8, 1.2);
[-13.6, 13.6].forEach(function (z) { var hb = poeGrp(A, L0 + 2.4, 0, z > 0 ? z - 3.2 : z + 3.2); poeCyl(hb, 0.16, 0.22, 0.9, st2, 0, 0.45, 0, 10); var sh = poeSph(hb, 0.42, poeShine(0xE8E0D0, 0.2, 0.1), 0, 1.0, 0, 12); sh.scale.y = 0.4; });
[[-38, -16.6], [-27, 16.6], [24, -16.6]].forEach(function (q, i) { var cf = poeGrp(A, q[0], 0, q[1], q[1] > 0 ? Math.PI : 0); poeBox(cf, 3.0, 2.9, 1.3, oak, 0, 1.45, 0); poeBox(cf, 1.0, 2.4, 0.05, poeS("velvet", 0x4A1A2A), 0, 1.3, 0.66); poeBox(cf, 3.2, 0.3, 1.5, oak, 0, 3.0, 0); solid(q[0], q[1], 3.0, 1.3, 3); });
for (var ch = 0; ch < (lite ? 3 : 6); ch++) {
var chx = -44 + ch * (lite ? 18 : 9), cG = poeGrp(A, chx, 12.5, 0);
poeCyl(cG, 0.02, 0.02, 21, poeC(0x1A1A1A), 0, 10.5, 0, 4);
var ring = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.06, 6, 24), poeShine(0x3A3A3A, 0.5, 0.7));
ring.rotation.x = Math.PI / 2;
cG.add(ring);
for (var cc = 0; cc < 12; cc += lite ? 2 : 1) {
var ca3 = cc / 12 * Math.PI * 2;
poeCandle(cG, Math.cos(ca3) * 1.4, 0.05, Math.sin(ca3) * 1.4, 0.22, true);
}
var cgl = wGlow(0xFFC880, 3.4, 0.55);
cgl.position.y = 0.3;
cG.add(cgl);
}
[[-34, 9, 0, 2.4, 44], [3, 12, 0, 2.4, 40], [36, 7, 0, 2.8, 34], [-12, 8, 0, 1.8, 34], [22, 8, 0, 1.8, 30], [-50, 7, 0, 1.4, 26]].forEach(function (q, i) { if (lite && i > 2)
return; var L = poeLight(0xFFC890, q[3], q[4], q[0], q[1], q[2], g, i < 3); if (L && L.L)
L.L.decay = 1.2; });
for (var ch2 = 0; ch2 < (lite ? 2 : 4); ch2++) {
var cx3 = 16 + ch2 * 7, cG2 = poeGrp(A, cx3, 9, 0);
poeCyl(cG2, 0.02, 0.02, 24, poeC(0x1A1A1A), 0, 12, 0, 4);
var ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.05, 6, 20), gold);
ring2.rotation.x = Math.PI / 2;
cG2.add(ring2);
for (var c4 = 0; c4 < 8; c4 += lite ? 2 : 1) {
var a5 = c4 / 8 * Math.PI * 2;
poeCandle(cG2, Math.cos(a5), 0.05, Math.sin(a5), 0.2, true);
}
var g4 = wGlow(0xFFC880, 3.0, 0.55);
g4.position.y = 0.3;
cG2.add(g4);
}
poeNdChairs(A, lite);
[[-26, -3.4], [-26, 3.4], [3, -3.6], [3, 3.6]].forEach(function (q, i) { solid(q[0] + (i < 2 ? 0 : 0), q[1], i < 2 ? 36 : 10, 4.6, 1.0); });
poeNdPeople(R, lite);
poeNdMerge(A);
poeNdMerge(vow);
poeSpot(R.x + L0 + 1.6, 0, 2.6, "The west doors, to the parvis", "go out", function () { poeNdOut(); }, 0);
poeSpot(R.x + 38.5, 0, 2.6, "The high altar and the Vow of Louis XIII", "look", function () { poeCard("The Vow of Louis XIII", "<p>In 1638 King Louis XIII put France under the protection of the Virgin and vowed a new high altar to Notre-Dame. His son built it: the Pietà of Nicolas Coustou, the Virgin with her dead Son across her knees, and on either side the two kings kneeling, Louis XIII offering his crown (by Guillaume Coustou) and Louis XIV (by Antoine Coysevox). Six angels of bronze hold the instruments of the Passion.</p><p>The Revolution made this church a Temple of Reason; it gave it back to God in 1802. Napoleon was crowned Emperor here in 1804.</p>"); }, 0);
poeSpot(R.x + L0 + 5.6, 0, 3.0, "The great organ of Clicquot (1783)", "listen", function () { poeCard("The great organ", "<p>François-Henri Clicquot rebuilt it in 1783: five keyboards and more than five thousand pipes, in the case of the old organ of 1733. It survived the Revolution because the organists played the airs of the Revolution on it.</p>"); }, 0);
poeSpot(R.x + 3, -20.5, 3.0, "The south rose (1260)", "look up", function () { poeCard("The south rose", "<p>Thirteen metres across, given by Saint Louis: Christ in the middle among the apostles, the martyrs and the wise virgins. At night it is almost black; the candles below find a little red and blue in it.</p>"); }, 0);
poeSpot(R.x + -46, -9.8, 2.4, "The stair of the north tower", "climb", function () { poeNdTower(); }, 0);
poeSpot(R.x + 27, -9.2, 2.6, "The carvings of the choir enclosure", "look", function () { poeCard("The choir enclosure", "<p>Jean Ravy and his nephew Jean le Bouteiller carved it in the fourteenth century: the life of Christ, painted and gilded, all round the choir. The canons of the eighteenth century pulled half of it down to open the choir; what is left runs along the north side and round the ambulatory.</p>"); }, 0);
},
function (P, bx, s, i) {
var c = poeGrp(P, bx, 0, s * 19.4, s > 0 ? Math.PI : 0);
poeBox(c, 2.0, 1.0, 0.8, poeS("marble", 0xD8D0C4), 0, 0.5, 0);
poeBox(c, 2.1, 0.05, 0.9, poeC(0xF0ECE4), 0, 1.02, 0);
poeCandle(c, -0.7, 1.05, 0, 0.3, true);
poeCandle(c, 0.7, 1.05, 0, 0.3, true);
poeBox(c, 0.05, 0.6, 0.05, poeShine(0xD8A848, 0.3, 0.85), 0, 1.35, 0);
if (i % 2 === 0)
poePainting(c, 0, 4.6, -0.3, 0, 2.6, 3.4, POE_ND_PAINT[i % POE_ND_PAINT.length], "ndMay" + (i % POE_ND_PAINT.length));
},
function (P, lite) {
var spots = [];
function block(x0, x1, z0, z1, ry) { for (var x = x0; x <= x1; x += 0.95)
for (var z = z0; z <= z1; z += 0.56)
spots.push([x, z, ry]); }
block(-44, -8, -5.6, -1.3, -Math.PI / 2);
block(-44, -8, 1.3, 5.6, -Math.PI / 2);
block(-2, 8, -5.6, -1.6, -Math.PI / 2);
block(-2, 8, 1.6, 5.6, -Math.PI / 2);
if (lite)
spots = spots.filter(function (p, i) { return i % 2 === 0; });
var parts = [[0.44, 0.04, 0.42, 0, 0.46, 0, poeS("rough", 0xC8A860)], [0.44, 0.5, 0.04, 0, 0.78, -0.19, poeS("oak", 0x6A4A2A)], [0.04, 0.46, 0.04, -0.19, 0.23, -0.18, poeC(0x5A3A1A)], [0.04, 0.46, 0.04, 0.19, 0.23, -0.18, poeC(0x5A3A1A)], [0.04, 0.46, 0.04, -0.19, 0.23, 0.18, poeC(0x5A3A1A)], [0.04, 0.46, 0.04, 0.19, 0.23, 0.18, poeC(0x5A3A1A)]];
var M = new THREE.Matrix4(), Q = new THREE.Quaternion(), V = new THREE.Vector3(), S1 = new THREE.Vector3(1, 1, 1), up = new THREE.Vector3(0, 1, 0);
parts.forEach(function (p) {
var geo = new THREE.BoxGeometry(p[0], p[1], p[2]), im = new THREE.InstancedMesh(geo, p[6], spots.length);
spots.forEach(function (s, i) { Q.setFromAxisAngle(up, s[2]); V.set(p[3], p[4], p[5]).applyQuaternion(Q); V.x += s[0]; V.z += s[1]; M.compose(V, Q, S1); im.setMatrixAt(i, M); });
im.instanceMatrix.needsUpdate = true;
im.userData.nomerge = 1;
P.add(im);
});
},
function (R, lite) { POE_ND_FOLK.forEach(function (F, i) { if (lite && i > 4)
return; poeRoomPerson(R, "nd" + i, F[0], F[1], F[2], { role: F[3], sex: F[4], talk: { name: F[5], persona: F[5] + ": " + F[6] + ", inside Notre-Dame de Paris on an evening in the spring of 1841. Speaks as a Parisian of that year and station, in English with a little French; talks about " + F[7] + ". Never mentions anything after 1841.", greet: F[8] } }); }); },
function () { poeCard("The towers of Notre-Dame", "<p>Three hundred and eighty-seven steps wind up the north tower in the dark, worn into hollows. At the top of the stair is the gallery between the two towers, and all of Paris at night below you: the river shining round the island, the lamps of the quays, the domes of the Panthéon and the Invalides, the black roofs going on for ever.</p><p>In the south tower hangs Emmanuel, the great bell of 1686, thirteen tons of bronze. Old Mathurin the ringer says that the stair remembers another ringer, long ago, in 1482.</p>"); },
function (n, a) {
var S = poeBS(), on = poeActive(), b = on ? poeStep() : null, C = on ? POE_CH[S.ch] : null, f;
try {
if (b && b.hooks && b.hooks[n])
return b.hooks[n](a, S.f);
if (C && C.hooks && C.hooks[n])
return C.hooks[n](a, S.f);
f = POE_LOOK[n];
if (typeof f === "function")
return f(a);
if (f)
poeCard(f[0], typeof f[1] === "function" ? f[1]() : f[1]);
}
catch (e) {
if (window.console)
console.warn("[poe] hook " + n, e);
}
},
function (R, D) {
var S = poeBS(), on = poeActive(), b = on ? poeStep() : null, C = on ? POE_CH[S.ch] : null;
if (b && b.door)
return b.door(R, D, S.f);
if (C && C.door)
return C.door(R, D, S.f);
if (D[2] === "dark") {
poeCard("The chamber door", poeQ("raven", "Deep into that darkness peering", 1) + poeNote("Darkness there, and nothing more."));
return true;
}
return false;
},
function (sec, fn) {
var k = poeKey();
if (window.POE_FAST) {
setTimeout(function () { if (poeKey() === k)
fn(); }, 4);
return null;
}
var A = poeEvery(function (dt) { A.t = (A.t || 0) + dt; if (A.t >= sec) {
if (poeKey() === k && WLD.on === POE_KEY)
try {
fn();
}
catch (e) {
if (window.console)
console.warn("[poe] wait", e);
}
return false;
} });
return A;
},
function (P, k, x, z, ry) {
if (!P)
return;
var i = POE.talk.length;
if (k) {
var R = poeRoomGet(k);
R.g.add(P.g);
P.ox = R.x;
P.room = R;
P.g.position.set(x, 0, z);
}
else {
POE.G.add(P.g);
P.ox = 0;
P.room = null;
P.g.position.set(x, poeGround(x, z), z);
}
if (ry != null)
P.g.rotation.y = ry;
P.g.visible = true;
P.y = P.g.position.y;
if (k && POE.room !== POE_RX[k]) { }
},
function (P, on, gap) {
if (!P)
return;
if (P.fol) {
poeStop(P.fol);
P.fol = null;
}
if (!on)
return;
gap = gap || 1.6;
P.fol = poeEvery(function (dt) {
if (!P.g || !P.g.parent)
return false;
var L = worldLocal(), R = POE.room;
if ((P.room || null) !== (R || null)) {
if (POE.moving)
return;
if (R)
poeMove(P, R.k, L.x - R.x + 0.8, L.z + 0.8, 0);
else
poeMove(P, null, L.x + 0.8, L.z + 0.8, 0);
return;
}
var px = P.g.position.x + (P.ox || 0), pz = P.g.position.z, dx = L.x - px, dz = L.z - pz, d = Math.hypot(dx, dz);
if (d > 30) {
P.g.position.x = L.x - (P.ox || 0) + 0.8;
P.g.position.z = L.z + 0.8;
return;
}
if (d > gap) {
var sp = Math.min(d - gap, dt * (d > 5 ? 3.2 : 1.6));
P.g.position.x += dx / d * sp;
P.g.position.z += dz / d * sp;
if (!P.room)
P.g.position.y = poeGround(P.g.position.x, P.g.position.z);
P.g.rotation.y = Math.atan2(dx, dz);
}
});
},
function (f) {
var R = poeRoomGet("chamber");
if (!R)
return;
var in_ = (poeBS().s >= 12);
R.raven.visible = in_;
if (in_) {
R.raven.position.set(0, 3.32, -R.d / 2 + 0.32);
R.raven.rotation.y = 0;
}
R.shutter.forEach(function (s, i) { s.rotation.y = in_ ? (i ? 1.9 : -1.9) : 0; });
poeRoomSpot("chamber", "ember", -R.w / 2 + 1.7, 0.5, 1.7, "The dying embers", "watch each ghost upon the floor", "ember");
poeRoomSpot("chamber", "curtain", R.w / 2 - 1.3, 2.8, 1.4, "The purple curtains", "stand and listen", "curtain");
var bird = poeRoomSpot("chamber", "bird", 0, -R.d / 2 + 1.9, 2.0, "The Raven, on the bust of Pallas", "speak to it", "bird");
if (bird)
bird.hide = function () { return !R.raven.visible; };
poeRoomSpot("chamber", "shadow", -1.2, 0.6, 1.3, "The shadow on the floor", "stand in it", "shadow");
poeSfx("rain");
POE.sfxRain = true;
},
function (R, D, f) { if (D[2] !== "dark") {
poeSay("The tapping is at the chamber door.");
return true;
} POE.black = true; poeSfx("wind"); poeCard("The chamber door, flung wide", "<p style='font-size:18px;font-style:italic;text-align:center'>Darkness there, and nothing more.</p>", [["Peer into the darkness", "", function () { var d = POEB.done; POEB.done = null; if (d)
d(); }]]); return true; },
function (f) {
var A = POE_AT.usher, s = poeBS().s;
if (!POE.usherDown || s < 60)
poeUsherRestore();
poeSpotOnce("u:tarn", A.x + 6, A.causeway.z0 + 4, 3, "The brink of the black and lurid tarn", "rein in your horse and look down", function () { poeHook("tarn"); });
poeSpotOnce("u:win", A.x - 14, A.z + 17, 3, "The vacant and eye-like windows", "look up at them", function () { poeHook("eyes"); });
poeSpotOnce("u:fungi", A.x + 15, A.z + 17, 3, "The minute fungi overspreading the whole exterior", "look closely", function () { poeHook("fungi"); });
poeSpotOnce("u:fissure", A.x + 3, A.z + 17, 2.4, "A barely perceptible fissure", "follow it with your eye, from the roof down", function () { poeHook("fissure"); });
var st = poeRoomGet("u_studio"), ch = poeRoomGet("u_chamber"), va = poeRoomGet("u_vault"), li = poeRoomGet("u_library");
poeRoomSpot("u_vault", "lid", 0, -0.2, 1.5, "The yet unscrewed lid of the coffin", "turn it aside and look upon the face of the tenant", "lid");
poeRoomSpot("u_chamber", "bed", -2.2, -1.6, 1.5, "Your bed", "lie down and try to sleep", "bed");
poeRoomSpot("u_chamber", "casement", ch.w / 2 - 1.1, 0, 1.6, "The casement", "go to it", "casement");
poeRoomSpot("u_chamber", "trist", 0.9, 2.0, 1.4, "The antique volume: the “Mad Trist” of Sir Launcelot Canning", "read it aloud to him", "trist");
poeRoomSpot("u_library", "shelf", -1, -li.d / 2 + 1.2, 2.2, "The shelves of the library", "look along them", "shelf");
var M = poeCast("madeline", "u_studio", 0, -st.d / 2 + 1.4, Math.PI / 2, { name: "The lady Madeline", role: "madeline", sex: "f", look: { skin: 0xF2E8E4, hair: 0x2A1A14, long: 1 } });
poeHide(M);
va.coffin.visible = s >= 38 && s < 60;
var Ro = POE.cast.roderick;
if (Ro) {
if (s < 46)
poeMove(Ro, "u_studio", -1.5, -2.2, 0.4);
poeLay(Ro, false);
}
poeLockDoor("u_hall", "u_passage", s < 36 ? "A stair goes down into the dark. Not yet." : null);
poeSfx("wind");
},
function (done) {
var H = POE.usherHalves || [], t = 0;
POE.usherDown = true;
poeSfx("crash");
if (POE.moon)
POE.moon.material.color.setHex(0xC81810);
POE.storm.t = 0.1;
poeEvery(function (dt) {
t += dt / poeSec(9);
var k = Math.min(1, t);
if (POE.usherFissure)
POE.usherFissure.scale.x = 1 + k * 40;
H.forEach(function (h, i) { h.rotation.z = (i ? -1 : 1) * k * 0.5; h.position.y = -k * k * 34; });
if (Math.random() < 0.04)
poeSfx("stone");
if (k >= 1) {
H.forEach(function (h) { h.visible = false; });
if (POE.usherFissure)
POE.usherFissure.visible = false;
poeSfx("splash");
done && done();
return false;
}
});
},
function () { var R = POE_RX.u_chamber, M = POE.cast.madeline, Ro = POE.cast.roderick; poeSfx("shriek"); var t = 0; poeEvery(function (dt) { t += dt / poeSec(1.6); var k = Math.min(1, t); M.g.position.x = (R.w / 2 - 0.9) + (Ro.g.position.x + 0.4 - (R.w / 2 - 0.9)) * k; M.g.position.z = Ro.g.position.z * k; if (k >= 1) {
poeLay(M, true);
poeLay(Ro, true);
return false;
} }); },
function (f) {
var R = poeRoomGet("t_room"), H = poeRoomGet("t_house"), M = poeRoomGet("t_mine"), s = poeBS().s;
poeRoomGet("t_tavern");
poeRoomGet("t_neigh");
poeRoomSpot("t_room", "planks", -0.06, 1.0, 1.4, "Three planks of the flooring", "work at them", "planks");
poeRoomSpot("t_room", "bedside", 0.6, -0.9, 1.3, "The old man's bed", "stand over it", "bedside");
poeRoomSpot("t_room", "treasures", -2.5, -1.9, 1.3, "The old man's treasures", "show them, secure, undisturbed", "treasures");
poeRoomSpot("t_mine", "mybed", -1.2, -0.6, 1.4, "Your own bed", "lie down till morning", "mybed");
if (!R.ray) {
R.ray = poeLight(0xFFE8B0, 0, 5, R.x + 0.6, 1.2, -2.6, POE.G, true);
if (R.ray)
R.ray.steady = 1;
R.eye = wGlow(0xB8D0FF, 0.5, 0);
R.eye.position.set(0.6, 0.95, -2.75);
R.g.add(R.eye);
}
var dead = s >= POE_HEART_DEAD;
R.planks.forEach(function (p) { p.visible = true; p.position.y = 0.015; });
R.under.visible = false;
if (POE.cast.oldman)
POE.cast.oldman.g.visible = !dead;
poeHeartNight(false);
["off1", "off2", "off3"].forEach(function (k) { poeHide(POE.cast[k]); });
},
function () {
POE.roomLit = 0.8;
POE.dim = false;
var H = POE_RX.t_house;
poeSfx("tap");
["off1", "off2", "off3"].forEach(function (k, i) { poeCast(k, "t_house", -0.8 + i * 0.8, 6.6, Math.PI, i === 0 ? { name: "An officer of the police", role: "police", sex: "m", look: { _seed: 80, beard: 1 }, talk: { name: "An officer of the police", persona: "A police officer of the 1840s, calling at four in the morning about a shriek a neighbour heard. Perfectly suave, patient, pleasant; he chats of familiar things.", greet: "A shriek was heard by a neighbour during the night. We have been deputed to search the premises." } } : { name: "An officer", role: "police", sex: "m", look: { _seed: 81 + i } }); });
},
function (f) {
var H = poeRoomGet("m_hall"), R = poeRoomGet("m_suite"), s = poeBS().s;
poeRoomGet("m_cot");
R.cells.forEach(function (C, i) { C.brazier.out = !(s > POE_MASQ_LIT); });
(R.folk || []).concat(POE.masqFolk || []).forEach(function (P) { poeLay(P, false); P.g.visible = true; if (P.wander0 === undefined)
P.wander0 = P.wander || null; P.wander = P.wander0; });
var C6 = R.cells[6];
poeRoomSpot("m_suite", "clock", C6.x - 4.6, C6.z, 1.8, "The gigantic clock of ebony", "stand before it", "clock");
poeRoomSpot("m_hall", "bolts", 0, H.d / 2 - 1.4, 2.4, "The bolts of the great gates", "weld them", "bolts");
poeRoomSpot("m_cot", "sheet", -H.w * 0 + (-POE_RX.m_cot.w / 2 + 1.9), POE_RX.m_cot.d / 2 - 1.4, 1.5, "What the pestilence left", "look", "sheet");
poeHide(POE.cast.death);
if (POE.cast.prospero) {
poeMove(POE.cast.prospero, "m_hall", 0, -6, 0);
poeLay(POE.cast.prospero, false);
}
POE.masqDim = 1;
},
function () {
var R = POE_RX.m_suite;
(R.folk || []).forEach(function (P) { P.wander = null; });
for (var i = 0; i < 12; i++)
(function (i) { poeWait(i * 1.0, function () { poeSfx("chime", { k: 1 }); }); })(i);
var C = R.cells[0];
poeCast("death", "m_suite", C.x - 3, C.z + 2, Math.PI / 2, { name: "A masked figure", role: "death", sex: "m", look: { skin: 0xD8D0C0, _blood: poeAdult() ? 1 : 0 }, s: 1.12 });
},
function (f) { var R = POE_RX.m_suite, D = POE.cast.death, t = 0, x0 = D.g.position.x, k0 = poeKey(); POE.deathWalk = poeEvery(function (dt) { var x1 = R.cells[6].x - 1.5; D.g.position.x = Math.min(x1, D.g.position.x + dt * (window.POE_FAST ? 60 : 1.5)); var ci = poeSuiteCell(R, D.g.position.x), nx = (D.g.position.x - (R.cells[ci].x)) / 8; D.g.position.z = Math.abs(nx) > 0.75 ? 0 : R.cells[ci].z * Math.min(1, (0.75 - Math.abs(nx)) * 4); D.g.rotation.y = Math.PI / 2; if (D.g.position.x >= x1) {
D.g.rotation.y = -Math.PI / 2;
return false;
} }); },
function () {
var S = POE.once && POE.once["m:seize"];
if (S)
S.off = true;
var R = POE_RX.m_suite, F = (R.folk || []).slice(), i = 0, k = poeKey();
poeSfx("windoff");
poeEvery(function (dt) { if (poeKey() !== k)
return false; i += dt / poeSec(0.7); while (F.length && i >= 1) {
i -= 1;
var P = F.shift();
P.wander = null;
poeLay(P, true);
} POE.masqDim = Math.max(0, POE.masqDim - dt / poeSec(11)); if (R.light)
R.light.dim = POE.masqDim; if (!F.length && POE.masqDim <= 0) {
R.cells.forEach(function (C) { C.brazier.out = true; });
return false;
} });
},
function (f) {
var R = poeRoomGet("p_dungeon"), C = poeRoomGet("p_court"), s = poeBS().s;
R.cx = 0;
R.block = function (x, z) { var h = R.size / 2 - 0.5, lx = x - R.x - (R.cx || 0); return Math.abs(lx) > h || Math.abs(z) > h; };
poeDunWalls(R, 18);
R.pend.pv.visible = false;
R.pend.len = 1.2;
R.pend.sw = 0.1;
R.pend.on = false;
R.ratAt = null;
R.rats.forEach(function (Q) { Q.g.visible = false; });
R.straps.forEach(function (s2) { s2.visible = true; });
poeDunState(s >= 4 && s < POE_PIT_LIGHT ? "dark" : s >= POE_PIT_FIRE ? "fire" : "dim");
poeRoomSpot("p_dungeon", "dish", -5.9, 0.9, 1.6, "The dish of meat, within reach of your left hand", "reach for it", "dish");
poeRoomSpot("p_dungeon", "frame", -5, 1.2, 1.7, "The low framework of wood", "work at the bandage", "frame");
poeRoomSpot("p_dungeon", "brink", 5.6, 0, 1.6, "The very brink of the pit", "feel about the masonry", "brink");
poeRoomSpot("p_dungeon", "pitcher", -5.9, -1.1, 1.4, "A loaf and a pitcher of water", "eat and drink with avidity", "pitcher");
poeHide(POE.cast.lasalle);
POE.onRoomPit = 1;
},
function () { poePitLie(); var R = POE_RX.p_dungeon, k = poeKey(), t = 0; R.ratAt = { x: -5, z: 0 }; poeSfx("rats"); poePendTo(8.25, 1.0, 20); poeEvery(function (dt) { if (poeKey() !== k)
return false; t += dt / poeSec(20); var n = Math.floor(t * 5); R.straps.forEach(function (s, i) { if (i < n)
s.visible = false; }); if (t >= 1)
return false; }); },
function (dt, f) {
var R = POE_RX.p_dungeon, L = worldLocal();
f.sz = Math.max(5.6, (f.sz || 18) - dt * (window.POE_FAST ? 80 : 0.21));
poeDunWalls(R, f.sz);
R.iron.emissiveIntensity = 0.5 + (18 - f.sz) / 12 * 0.9;
var h = f.sz / 2 - 0.55, lx = L.x - R.x - R.cx;
if (Math.abs(lx) > h)
camera.position.x = POE.base + R.x + R.cx + Math.sign(lx) * h;
if (Math.abs(L.z) > h)
camera.position.z = Math.sign(L.z) * h;
if (Math.random() < dt * 0.5)
poeSfx("grating", { k: 0.2 });
if (Math.hypot(L.x - R.x - R.pit.x, L.z - R.pit.z) < R.pit.r - 0.5 && f.sz > 6.2 && !window.POE_FAST) {
f.sz = Math.min(18, f.sz + 4);
poeSfx("shriek");
poeSay("You totter upon the brink, and fling yourself back. The walls press on.");
var a = Math.atan2(L.z, lx - 0) || 0;
camera.position.x = POE.base + R.x + R.pit.x + Math.cos(a) * (R.pit.r + 0.6);
camera.position.z = Math.sin(a) * (R.pit.r + 0.6);
}
if (f.sz <= 5.61) {
poeDoneNow();
}
},
function (f) {
var A = POE_AT.cask, V = poeRoomGet("c_vaults"), H = poeRoomGet("c_hall"), s = poeBS().s;
poeRoomGet("c_wine");
var F = poeCast("fortunato", null, A.x + 12, A.z - 14, -0.6, { name: "Fortunato", role: "fortunato", sex: "m", look: { _seed: 95, skin: 0xE8B8A0 }, talk: { name: "Fortunato", persona: "Fortunato (Poe, 1846): a man to be respected and even feared, who prides himself on his connoisseurship in wine. Tonight, at the carnival, he wears motley, a tight-fitting parti-striped dress and the conical cap and bells, and has been drinking much. Warm, loud, vain, with a bad cough.", greet: "My dear Montresor! Ha! You are luckily met!" } });
if (s < POE_CASK_MEET) {
poeMove(F, null, A.x + 12, A.z - 14, -0.6);
poeFollow(F, false);
}
else if (s < POE_CASK_CHAIN) {
poeFollow(F, true);
}
else {
poeFollow(F, false);
poeMove(F, "c_vaults", V.niche.x, V.niche.z - 0.3, 0);
}
V.tiers.forEach(function (t, i) { t.visible = s > POE_CASK_TIER[i]; });
V.bonepile.visible = true;
V.stones.visible = false;
V.bonepile.position.set(V.niche.x + 2.2, 0, V.niche.z + 1.65);
poeLockDoor("c_hall", "c_vaults", s < POE_CASK_TORCH && s >= POE_CASK_MEET ? "Take a flambeau from its sconce first." : null);
POE.vaultDim = 1;
},
function (P, x, z, ry, s) {
s = s || 1;
var g = poeGrp(P, x, 0, z, ry), m = poeS("rough", 0xB8742A), d = poeC(0x3A2A20);
var b = poeSph(g, 0.42 * s, m, 0, 0.95 * s, 0, 12);
b.scale.set(1.1, 1.25, 0.9);
var h = poeSph(g, 0.24 * s, m, 0, 1.62 * s, 0.1 * s, 12);
var f = poeSph(g, 0.15 * s, d, 0, 1.58 * s, 0.24 * s, 10);
f.scale.set(1, 1.1, 0.6);
[-1, 1].forEach(function (k) { var a = poeCyl(g, 0.09 * s, 0.07 * s, 1.25 * s, m, k * 0.5 * s, 0.82 * s, 0.05 * s, 8); a.rotation.z = k * 0.22; poeSph(g, 0.1 * s, d, k * 0.64 * s, 0.2 * s, 0.05 * s, 8); var l = poeCyl(g, 0.11 * s, 0.09 * s, 0.6 * s, m, k * 0.2 * s, 0.3 * s, 0, 8); poeSph(g, 0.025 * s, poeC(0x0A0806), k * 0.07 * s, 1.66 * s, 0.3 * s, 6); });
return g;
},
function (f) {
var A = POE_AT.morgue, s = poeBS().s, D = poeRoomGet("r_dupin"), SH = poeRoomGet("r_shop"), C = poeRoomGet("r_cafe"), PF = poeRoomGet("r_pref"), HO = poeRoomGet("r_house"), RM = poeRoomGet("r_room");
poeRoomGet("r_back");
poeCast("mignaud", "r_pref", -2.4, 0.8, 0.8, { name: "Jules Mignaud, banker", role: "gent", sex: "m", look: { _seed: 71, hair: 0xC8C8C8 } });
poeCast("dumas", "r_pref", -1.2, 1.8, 0.4, { name: "Paul Dumas, physician", role: "physician", sex: "m", look: { _seed: 72, specs: 1 } });
poeCast("etienne", "r_pref", 0.4, 1.9, -0.2, { name: "Alexandre Etienne, surgeon", role: "physician", sex: "m", look: { _seed: 73 } });
POE.people.forEach(function (P) { if (POE_WIT[P.name] != null && !P.tk) {
P.tk = 1;
POE.talk.push({ p: P, r: 2.6, name: P.name, fn: function () { poeCard(P.name, poeA(poeP("morgue", POE_WIT[P.name]), poeP("morgue", POE_WIT[P.name]))); } });
} });
var Du = POE.cast.dupin;
if (Du) {
poeFollow(Du, false);
if (s < 4)
poeMove(Du, "r_shop", 1.6, 0.8, -0.8);
else if (s < POE_MORGUE_OUT || s >= POE_MORGUE_HOME)
poeMove(Du, "r_dupin", -2.2, -1.4, Math.PI / 2 + 0.5);
else
poeFollow(Du, true, 2);
}
poeRoomSpot("r_dupin", "draw", 1.2, -1.5, 1.4, "Dupin's drawing of the bruises upon the throat", "lay your fingers in the impressions", "draw");
poeRoomSpot("r_dupin", "lock", 0, D.d / 2 - 1.2, 1.5, "The door of the room", "lock it, and put the key in your pocket", "lock");
var H = POE.once["r_room:hearth"];
POE.spots.forEach(function (S) { if (S.name === "The hearth")
S.off = false; });
poeHide(POE.cast.sailor);
if (POE.ape)
POE.ape.visible = s >= POE_MORGUE_APE;
if (!POE.ape && POE.cage) {
POE.ape = poeApe(POE.G, POE.cage.x, POE.cage.z, 0.4, 1.15);
POE.ape.userData.keepVis = 1;
POE.ape.position.y = poeGround(POE.cage.x, POE.cage.z);
POE.ape.visible = s >= POE_MORGUE_APE;
poeSpotOnce("r:cage", POE.cage.x, POE.cage.z + 3.2, 3, "The cage at the Jardin des Plantes", "look in", function () { poeHook("cage"); });
}
poeTune("paris");
},
function () { poeCard("The chimney", poeA(poeP("morgue", 33), "<p>Here the daughter was found, forced up the narrow aperture for a considerable distance, so firmly wedged that the united vigor of several persons was required to drag her down.</p>") + poeQ("morgue", "Think, too, how great must have been that strength", 1)); },
function (k) { poeSay(["", "The spring: identical in character with its neighbor.", "The nail: as stout as the other, and apparently fitted in the same manner, driven in nearly up to the head.", "You touch it; and the head, with about a quarter of an inch of the shank, comes off in your fingers."][k]); if (k === 3)
poeSfx("stone", { k: 0.1 }); },
function () { var D = POE_RX.r_dupin; poeSfx("tap"); poeCast("sailor", "r_dupin", 0.4, D.d / 2 - 1.8, Math.PI, { name: "The sailor", role: "sailor", sex: "m", look: { _seed: 99, skin: 0xC89A78, beard: 1 } }); POE.talk.push({ p: POE.cast.sailor, r: 3, name: "The sailor", fn: function () { poeSay("“Good evening.” French; the accent somewhat Neufchatelish."); } }); },
function (r, L) {
var g = new THREE.Group(), seed = L._seed | 0, m;
if (r === "m15" || r === "rich15" || r === "king15") {
var c = [0x3A1A1A, 0x1A2A3A, 0x2A2A1A, 0x4A1A2A, 0x1A1A1A][seed % 5];
m = poeWM(r === "king15" ? 0x2A2420 : c, { r: 0.9 });
var roll = new THREE.Mesh(new THREE.TorusGeometry(0.115, 0.045, 8, 18), m);
roll.rotation.x = Math.PI / 2;
g.add(roll);
var crown = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), m);
crown.position.y = 0.01;
g.add(crown);
if (r === "king15") {
var hb = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.012, 20), m);
hb.position.y = -0.01;
g.add(hb);
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2, im = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.03, 0.005), poeWM(0x8A8A90, { r: 0.4, m: 0.7 }));
im.position.set(Math.sin(a) * 0.125, 0.03, Math.cos(a) * 0.125);
im.rotation.y = a;
g.add(im);
}
}
else {
var tail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.32, 0.02), m);
tail.position.set(0.12, -0.12, -0.04);
tail.rotation.z = 0.2;
g.add(tail);
}
return [g, [0, 0.13, -0.01]];
}
if (r === "fleming") {
m = poeWM(0x101012, { r: 0.8 });
var hc = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.12, 0.14, 18), m);
hc.position.y = 0.06;
g.add(hc);
var br = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.012, 20), m);
g.add(br);
return [g, [0, 0.13, -0.01]];
}
if (r === "student") {
m = poeWM([0x1A1A1E, 0x3A1A1A, 0x1A2A1A][seed % 3], { r: 0.9 });
var cp = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.45), m);
cp.scale.set(1.15, 0.7, 1.15);
g.add(cp);
return [g, [0, 0.11, -0.01]];
}
if (r === "archer") {
m = poeWM(0x6A6A70, { r: 0.35, m: 0.85 });
var ir = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), m);
g.add(ir);
var bb = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.03, 20, 1, true), m);
bb.material.side = THREE.DoubleSide;
g.add(bb);
return [g, [0, 0.12, -0.01]];
}
if (r === "truand") {
m = poeWM([0x4A3A2A, 0x3A3A30, 0x5A2A1A][seed % 3], { r: 1 });
var rg = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.5), m);
rg.scale.set(1, 0.6, 1.1);
rg.rotation.z = 0.3;
g.add(rg);
return [g, [0, 0.11, -0.01]];
}
if (r === "cardinal") {
m = poeWM(0xA8101A, { r: 0.7 });
var gb = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.012, 24), m);
g.add(gb);
var gc = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.08, 18), m);
gc.position.y = 0.04;
g.add(gc);
return [g, [0, 0.14, -0.01]];
}
if (r === "lady15") {
m = poeWM([0xE8D8B0, 0x2A2A4A, 0x6A1A2A, 0x1A3A2A][seed % 4], { r: 0.5 });
var hn = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.62, 16), m);
hn.position.set(0, 0.22, -0.09);
hn.rotation.x = -0.55;
g.add(hn);
var vl = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.7), new THREE.MeshStandardMaterial({ color: 0xF4F2EE, transparent: true, opacity: 0.55, side: THREE.DoubleSide, roughness: 1 }));
vl.position.set(0, 0.1, -0.32);
vl.rotation.x = -0.25;
g.add(vl);
return [g, [0, 0.08, 0]];
}
if (r === "wife15" || r === "recluse") {
m = poeWM(r === "recluse" ? 0x4A4038 : 0xF0ECE2, { r: 1 });
var cf = new THREE.Mesh(new THREE.SphereGeometry(0.135, 14, 9, 0, Math.PI * 2, 0, Math.PI * 0.62), m);
cf.material.side = THREE.DoubleSide;
cf.scale.set(1.08, 1.06, 1.16);
g.add(cf);
var wp = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.14, 14, 1, true), m);
wp.material.side = THREE.DoubleSide;
wp.position.set(0, -0.16, 0);
g.add(wp);
return [g, [0, 0.06, -0.02]];
}
if (r === "canon15") {
m = poeWM(0x1A1A1A, { r: 0.9 });
var bt = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.11, 0.1, 4), m);
bt.rotation.y = Math.PI / 4;
bt.position.y = 0.04;
g.add(bt);
return [g, [0, 0.13, -0.01]];
}
return null;
},
function (add, L) {
var sk = poeWM(0xC89878, { r: 0.75 }), hair = poeWM(0xA83A1A, { r: 1 });
var hump = new THREE.Mesh(new THREE.SphereGeometry(0.26, 14, 10), poeWM(0x7A2A1A, { r: 0.95 }));
hump.scale.set(1.15, 1, 0.9);
add("spine_03", [0.06, 0.08, -0.2], hump);
var front = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), poeWM(0x7A2A1A, { r: 0.95 }));
front.scale.set(1.2, 0.8, 0.7);
add("spine_02", [0, 0.02, 0.15], front);
var wart = new THREE.Mesh(new THREE.SphereGeometry(0.042, 10, 8), sk);
wart.scale.set(1, 0.9, 0.7);
add("Head", [-0.035, 0.07, 0.1], wart);
var brow = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.016, 0.02), hair);
brow.rotation.z = 0.2;
add("Head", [0.035, 0.1, 0.11], brow);
for (var i = 0; i < 9; i++) {
var t = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.12, 5), hair);
var a = i / 9 * Math.PI * 2;
t.position.set(Math.sin(a) * 0.08, 0.17, Math.cos(a) * 0.06 - 0.02);
t.rotation.set(Math.cos(a) * 0.6, 0, -Math.sin(a) * 0.6);
add("Head", [t.position.x, t.position.y, t.position.z], t);
}
var tooth = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.04, 5), poeWM(0xE8E0C8, { r: 0.4 }));
tooth.rotation.x = Math.PI;
add("Head", [0.02, 0.0, 0.115], tooth);
if (L._tiara) {
var ti = new THREE.Group(), gm = poeWM(0xE8C040, { r: 0.35, m: 0.7 });
var tc = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.13, 0.34, 14), gm);
tc.position.y = 0.17;
ti.add(tc);
[0.06, 0.16, 0.26].forEach(function (y) { var rr = new THREE.Mesh(new THREE.TorusGeometry(0.11 - y * 0.18, 0.012, 4, 16), poeWM(0xC82A2A, { r: 0.5 })); rr.rotation.x = Math.PI / 2; rr.position.y = y; ti.add(rr); });
add("Head", [0, 0.15, -0.01], ti);
var cr = new THREE.Group(), st = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.8, 6), gm);
cr.add(st);
var hk = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.015, 5, 12, Math.PI * 1.4), gm);
hk.position.y = 0.95;
cr.add(hk);
add("hand_l", [0, 0.1, 0], cr);
}
},
function (R, key, x, z, ry, o) {
o = o || {};
var look = { _seed: 1467, skin: 0xC89878, hair: 0xA83A1A, hairStyle: "short", beard: 0, top: 0x7A2A1A, bottom: 0x4A3A2A, _tiara: o.tiara ? 1 : 0 };
var P = R ? poeCast(key, R, x, z, ry, { name: o.name || "Quasimodo", role: "quasi", sex: "m", s: 1.12, look: look, talk: o.talk || poeNdTalk("Quasimodo") }) : null;
if (P && P.g) {
P.g.scale.set(1.28, 0.98, 1.18);
}
return P;
},
function (P, x, z, ry) {
var g = poeGrp(P, x, 0, z, ry || 0), w = poeS("rough", 0xF2EEE6), gold = poeShine(0xE8C040, 0.25, 0.9);
var b = poeSph(g, 0.24, w, 0, 0.52, 0, 12);
b.scale.set(0.8, 0.8, 1.5);
var n = poeCyl(g, 0.07, 0.09, 0.3, w, 0, 0.68, 0.3, 8);
n.rotation.x = -0.7;
var h = poeSph(g, 0.1, w, 0, 0.84, 0.42, 10);
h.scale.set(0.8, 0.9, 1.3);
var sn = poeSph(g, 0.06, poeS("rough", 0xE8DCD0), 0, 0.8, 0.52, 8);
sn.scale.set(0.9, 0.8, 1.1);
poeSph(g, 0.015, poeC(0x1A1410), 0.05, 0.87, 0.47, 6);
poeSph(g, 0.015, poeC(0x1A1410), -0.05, 0.87, 0.47, 6);
[-1, 1].forEach(function (s) { var hr = poeCone(g, 0.025, 0.2, gold, s * 0.05, 0.98, 0.36); hr.rotation.x = -0.6; hr.rotation.z = -s * 0.25; var ear = poeBox(g, 0.1, 0.03, 0.05, w, s * 0.1, 0.86, 0.36); ear.rotation.z = s * 0.4; });
var beard = poeCone(g, 0.03, 0.1, poeS("rough", 0xE8E0D4), 0, 0.72, 0.5);
beard.rotation.x = Math.PI;
var col = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.015, 5, 14), gold);
col.position.set(0, 0.66, 0.26);
col.rotation.x = 1.0;
g.add(col);
[[-0.11, 0.22], [0.11, 0.22], [-0.11, -0.22], [0.11, -0.22]].forEach(function (q) { poeCyl(g, 0.03, 0.025, 0.36, w, q[0], 0.2, q[1], 6); poeCyl(g, 0.032, 0.03, 0.05, gold, q[0], 0.025, q[1], 6); });
var tl = poeCone(g, 0.03, 0.1, w, 0, 0.62, -0.36);
tl.rotation.x = -1.0;
g.userData.goat = 1;
return g;
},
function (name, extra) {
var D = POE_ND_WHO[name];
if (!D)
return { name: name, persona: name + ", a Parisian of the year 1482 in Victor Hugo's Notre-Dame de Paris. Speaks briefly, as a person of that year and station. " + (extra || "") + " Never mentions anything after 1482.", greet: "God keep you." };
return { name: name, persona: name + ": " + D[0] + ". Speaks as Hugo wrote them in Notre-Dame de Paris (1831), in English with a little French and Latin, briefly; talks about " + D[1] + ". " + (extra || "") + " Never mentions anything after 1482.", greet: D[2] };
},
function () {
if (ND_KING_GEO)
return ND_KING_GEO;
var V = function (a) { return a.map(function (p) { return new THREE.Vector2(p[0], p[1]); }); };
ND_KING_GEO = {
robe: new THREE.LatheGeometry(V([[0, 0], [0.44, 0], [0.43, 0.12], [0.38, 0.5], [0.32, 0.95], [0.27, 1.3], [0.25, 1.45], [0.29, 1.55], [0.25, 1.62], [0.1, 1.7], [0, 1.71]]), 14),
mantle: new THREE.LatheGeometry(V([[0.47, 0.06], [0.45, 0.4], [0.38, 0.9], [0.33, 1.3], [0.32, 1.5], [0.3, 1.6]]), 12, Math.PI * 0.62, Math.PI * 1.76),
ermine: new THREE.LatheGeometry(V([[0.475, 0.04], [0.47, 0.14]]), 12, Math.PI * 0.62, Math.PI * 1.76),
crown: new THREE.CylinderGeometry(0.135, 0.125, 0.09, 12, 1, true)
};
ND_KING_GEO.mantle.computeVertexNormals();
return ND_KING_GEO;
},
function (P, x, y, z, ry, rc, mc, s, lite) {
var G = ndKingGeo(), g = poeGrp(P, x, y, z, ry || 0), cl = poeS("cloth", rc), ml = poeS("cloth", mc), gold = poeShine(0xD8A838, 0.3, 0.9), skin = poeC(0xD8B898), hair = poeC(0x4A3424), wh = poeC(0xEEE8DC);
g.scale.setScalar(s || 1);
var r = new THREE.Mesh(G.robe, cl);
g.add(r);
var m = new THREE.Mesh(G.mantle, ml);
g.add(m);
var e = new THREE.Mesh(G.ermine, wh);
g.add(e);
poeBox(g, 0.62, 0.05, 0.05, gold, 0, 1.08, 0.24);
poeBox(g, 0.05, 0.62, 0.04, gold, 0, 0.75, 0.28);
[-1, 1].forEach(function (sd) { var ua = poeCyl(g, 0.075, 0.09, 0.42, cl, sd * 0.3, 1.38, 0.05, 7); ua.rotation.x = 0.25; var fa = poeCyl(g, 0.07, 0.075, 0.36, cl, sd * 0.29, 1.12, 0.2, 7); fa.rotation.x = 1.25; poeSph(g, 0.055, skin, sd * 0.29, 1.08, 0.38, 7); });
var sc = poeCyl(g, 0.022, 0.022, 1.25, gold, 0.29, 1.2, 0.4, 6);
poeSph(g, 0.05, gold, 0.29, 1.85, 0.4, 6);
if (!lite) {
[-1, 1].forEach(function (sd) { var lf = poeCone(g, 0.03, 0.12, gold, 0.29 + sd * 0.05, 1.86, 0.4); lf.rotation.z = -sd * 0.7; });
poeCone(g, 0.03, 0.14, gold, 0.29, 1.94, 0.4);
}
var hd = poeSph(g, 0.125, skin, 0, 1.84, 0.01, 10);
hd.scale.set(0.92, 1.1, 1);
var hr = poeSph(g, 0.135, hair, 0, 1.88, -0.03, 10);
hr.scale.set(1, 1, 0.95);
var bd = poeCone(g, 0.1, 0.2, hair, 0, 1.7, 0.07);
bd.rotation.x = Math.PI;
if (!lite) {
poeSph(g, 0.02, poeC(0x2A2018), -0.04, 1.86, 0.12, 5);
poeSph(g, 0.02, poeC(0x2A2018), 0.04, 1.86, 0.12, 5);
poeBox(g, 0.025, 0.06, 0.03, skin, 0, 1.82, 0.13);
}
var cr = new THREE.Mesh(G.crown, gold);
cr.position.set(0, 1.97, -0.01);
g.add(cr);
for (var f = 0; f < (lite ? 4 : 8); f++) {
var a = f / (lite ? 4 : 8) * Math.PI * 2, fl = poeCone(g, 0.03, 0.09, gold, Math.sin(a) * 0.13, 2.05, Math.cos(a) * 0.13 - 0.01);
}
return g;
},
function (b, cb) {
if (ND_TXT.b[b]) {
if (cb)
cb(ND_TXT.b[b]);
return;
}
var W = ND_TXT.wait[b] || (ND_TXT.wait[b] = []);
if (cb)
W.push(cb);
if (W.started)
return;
W.started = 1;
fetch("data/poe/nd/b" + b + ".json").then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); }).then(function (d) { ND_TXT.b[b] = d; var w = ND_TXT.wait[b]; ND_TXT.wait[b] = null; (w || []).forEach(function (f) { try {
f(d);
}
catch (e) { } }); })
.catch(function () { var w = ND_TXT.wait[b]; ND_TXT.wait[b] = null; (w || []).forEach(function (f) { try {
f(null);
}
catch (e) { } }); });
},
function (b, at) {
ndText(b, function (D) {
if (!D) {
setStatus("📖 Hugo's book could not be opened just now.");
return;
}
var P = D.p, per = 5, page = Math.max(0, Math.floor((at || 0) / per));
function show() {
var ch = null;
(D.ch || []).forEach(function (c) { if (c[0] <= page * per + per - 1)
ch = c; });
var h = "<div style='font-size:12px;opacity:.7'>Victor Hugo · Notre-Dame de Paris · 1831 · translated by Isabel F. Hapgood, 1888</div><h3 style='margin:4px 0;font-family:Georgia,serif'>" + poeEsc(D.t) + (ch ? " · " + poeEsc(ch[1]) : "") + "</h3><div style='max-height:50vh;overflow:auto;font-family:Georgia,serif;line-height:1.5'>";
P.slice(page * per, page * per + per).forEach(function (p) { h += "<p style='margin:6px 0'>" + poeEsc(p) + "</p>"; });
h += "</div><div style='font-size:12px;opacity:.7'>Page " + (page + 1) + " of " + Math.ceil(P.length / per) + "</div>";
var fns = {};
if (page > 0) {
h += worldBtn("prev", "◀ Back", "");
fns.prev = function () { page--; show(); };
}
if ((page + 1) * per < P.length) {
h += worldBtn("next", "Turn the page ▶", "");
fns.next = function () { page++; show(); };
}
if (D.ch && D.ch.length > 1) {
h += "<div style='margin-top:6px;font-size:12px'>Chapters: " + D.ch.map(function (c, i) { fns["c" + i] = function () { page = Math.floor(c[0] / per); show(); }; return "<span data-w='c" + i + "' role='button' style='text-decoration:underline;margin-right:8px'>" + (i + 1) + ". " + poeEsc(c[1]) + "</span>"; }).join("") + "</div>";
}
worldCard(h, fns);
}
show();
});
},
function (fns) {
if (!poeKeeper())
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any book of the novel</div><div>";
ND_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' title='" + poeEsc(C.t) + "' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + ND_ROMAN[i + 1] + "</span>"; fns["kj" + i] = function () { worldCard(null); poeJump(i); }; });
b += "<span data-w='kreset' role='button' style='display:inline-block;margin:2px 2px 2px 10px;padding:3px 7px;border:1px solid rgba(232,143,143,.6);border-radius:3px'>Reset the story</span>";
fns.kreset = function () { worldCard(null); var S = poeBS(); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; S.keeps = []; poeSave(); poeChapterBegin(true); };
return b + "</div>";
},
function (on) {
var was = POE.era;
POE.era = on ? 1482 : 0;
if (was === POE.era)
return;
for (var k in POE_PAR.chunks)
poeParDrop(POE_PAR.chunks[k]);
POE_PAR.chunks = {};
POE_PAR.rise = on ? 3.8 : 2.6;
POE_PAR.ins = on ? 1.6 : 1.5;
try {
poeNdEraRooms();
}
catch (e) {
if (window.console)
console.warn("[poe] era", e);
}
if (typeof poeParFolkEra === "function")
try {
poeParFolkEra();
}
catch (e) { }
},
function (t) {
POE.ndTime = t || "night";
var day = POE.ndTime !== "night";
if (POE.moon)
POE.moon.visible = !day || POE.ndTime === "dusk";
(POE.clouds || []).forEach(function (c) { c.material.color.setHex(day ? 0xD8D8DC : 0x0A0A0E); c.material.opacity = day ? 0.55 : 0.86; });
(POE.ndGlowMats || []).forEach(function (m) { m.emissiveIntensity = POE.ndTime === "day" ? 0.12 : POE.ndTime === "night" ? 1 : 0.5; });
},
function () {
ndText(0, function () {
var S = store.ndbook, more = S && S.started && !S.done;
poeCard("A word cut in the stone", "<p>In the darkest turn of the stair, where the light of your candle barely reaches, someone long ago cut a word into the wall by hand: <b style='font-size:20px;letter-spacing:3px'>" + ND_WORD + "</b></p>" + ndP(0, "These Greek capitals", 2) + poeNote("ΑΝΑΓΚΗ: Fate. Hugo found this word here, and built his book upon it."), [["Lay your hand on the word", more ? "Back to 1482, where you left the story" : "Paris, the sixth of January, 1482: the Feast of Kings and the Feast of Fools", function () { poeNdTo1482(); }], ["Go on up the stair", "Paris of 1841 from the towers", function () { poeNdTopGo(); }], ["Leave it", "", null]]);
});
},
function () {
ndText(0);
ndText(1);
poeVeil(window.POE_FAST ? 0.01 : 1.2, function () {
poeNdEra(true);
poeBookUse("nd");
var S = poeBS();
if (!S.started) {
S.started = 1;
S.ch = 0;
S.s = 0;
S.f = {};
}
poeSave();
if (S.done) {
poeEnterRoom("x_nd", "nd:stair", { x: -46, z: -8.2, ry: Math.PI });
setTimeout(function () { poeFinish(); }, 900);
return;
}
setTimeout(function () { try {
poeChapterBegin(true);
}
catch (e) {
if (window.console)
console.warn("[poe] nd begin", e);
} }, window.POE_FAST ? 20 : 400);
}, 0.6);
},
function () {
poeVeil(window.POE_FAST ? 0.01 : 1.2, function () {
poeItemsClear();
poeNdTime("night");
POE.ndView = 0;
poeNdEra(false);
poeBookUse("poe");
poeTune(null);
poeEnterRoom("x_nd", "nd:stair", { x: -46, z: -8.2, ry: Math.PI });
setTimeout(function () { setStatus("🔔 <b>1841.</b> The stair of the north tower of Notre-Dame. The word is still there in the dark corner: " + ND_WORD + "."); }, 900);
}, 0.6);
},
function (x, X, Y, w, h, R) {
x.fillStyle = "#3A2416";
x.fillRect(X, Y, w, h);
x.fillStyle = "rgba(255,220,170,.10)";
x.fillRect(X, Y, w, Math.max(1, h * 0.18));
x.fillStyle = "rgba(0,0,0,.35)";
x.fillRect(X, Y + h * 0.82, w, Math.max(1, h * 0.18));
x.strokeStyle = "rgba(20,10,4,.5)";
x.lineWidth = 1;
for (var i = 0; i < 3; i++) {
var o = R() * h;
x.beginPath();
if (w > h) {
x.moveTo(X, Y + o);
x.lineTo(X + w, Y + o + (R() - 0.5) * 2);
}
else {
x.moveTo(X + R() * w, Y);
x.lineTo(X + R() * w, Y + h);
}
x.stroke();
}
},
function (x, e, X, Y, w, h, R, lit, shut) {
x.fillStyle = "#2A1A10";
x.fillRect(X - w * 0.08, Y - h * 0.06, w * 1.16, h * 1.12);
if (shut) {
x.fillStyle = ["#5A3A22", "#4A3A2A", "#3A4A3A"][(R() * 3) | 0];
x.fillRect(X, Y, w, h);
x.fillStyle = "rgba(0,0,0,.4)";
for (var s = X + w / 5; s < X + w; s += w / 5)
x.fillRect(s, Y, 1.5, h);
x.fillStyle = "#1A1A1A";
x.fillRect(X, Y + h * 0.2, w, 2);
x.fillRect(X, Y + h * 0.78, w, 2);
return;
}
var g = x.createLinearGradient(X, Y, X, Y + h);
if (lit) {
g.addColorStop(0, "#F0C070");
g.addColorStop(1, "#A85A1C");
}
else {
g.addColorStop(0, "#56606A");
g.addColorStop(0.4, "#28303A");
g.addColorStop(1, "#14181E");
}
x.fillStyle = g;
x.fillRect(X, Y, w, h);
if (lit) {
var ge = e.createLinearGradient(X, Y, X, Y + h);
ge.addColorStop(0, "#A87030");
ge.addColorStop(1, "#5A3010");
e.fillStyle = ge;
e.fillRect(X, Y, w, h);
}
x.save();
x.beginPath();
x.rect(X, Y, w, h);
x.clip();
x.strokeStyle = lit ? "rgba(60,30,10,.75)" : "rgba(140,150,160,.45)";
x.lineWidth = 1.2;
var d = Math.max(5, w / 6);
for (var k = -h; k < w + h; k += d) {
x.beginPath();
x.moveTo(X + k, Y);
x.lineTo(X + k + h, Y + h);
x.stroke();
x.beginPath();
x.moveTo(X + k, Y + h);
x.lineTo(X + k + h, Y);
x.stroke();
}
x.restore();
x.fillStyle = "#2A1A10";
x.fillRect(X + w / 2 - 1.5, Y, 3, h);
x.fillRect(X, Y + h * 0.45, w, 3);
},
function (k) {
var S = POE.lite ? 512 : 1024;
return poeParTexPair("ndUp" + k, S, S, function (x, e, W, H) {
var m = W / 12, R = wRand(1482 + k * 13);
var plaster = ["#D4C298", "#E2D8C2", "#C9A78A"][k];
x.fillStyle = plaster;
x.fillRect(0, 0, W, H);
poeNz(x, W, H, Math.round(W * H / 70), 0.10, 1500 + k);
poeNz(x, W, H, Math.round(W * H / 150), 0.06, 1510 + k, "255,248,230");
for (var i = 0; i < W / 10; i++) {
var sx = R() * W, len = H * (0.1 + R() * 0.3), sy = R() * H, gg = x.createLinearGradient(0, sy, 0, sy + len);
gg.addColorStop(0, "rgba(60,46,30,.14)");
gg.addColorStop(1, "rgba(60,46,30,0)");
x.fillStyle = gg;
x.fillRect(sx, sy, 2 + R() * 6, len);
}
for (var f = 0; f < 4; f++) {
var y0 = H - (f + 1) * 3 * m, y1 = H - f * 3 * m;
var sg = x.createLinearGradient(0, y1 - 0.3 * m, 0, y1 + 0.5 * m);
sg.addColorStop(0, "rgba(0,0,0,.0)");
sg.addColorStop(0.35, "rgba(10,6,2,.45)");
sg.addColorStop(1, "rgba(10,6,2,0)");
if (f > 0) {
x.fillStyle = sg;
x.fillRect(0, y1 - 0.05 * m, W, 0.55 * m);
}
for (var b = 0; b < 4; b++) {
var X = b * 3 * m, lit = R() < 0.3, sh = !lit && R() < 0.3, style = (b + f + k) % 3;
poeNdCasement(x, e, X + 1.0 * m, y0 + 0.75 * m, 1.0 * m, 1.25 * m, R, lit, sh);
poeNdBeam(x, X, y0, 0.22 * m, 3 * m, R);
poeNdBeam(x, X + 0.82 * m, y0, 0.16 * m, 3 * m, R);
poeNdBeam(x, X + 2.02 * m, y0, 0.16 * m, 3 * m, R);
poeNdBeam(x, X + 0.82 * m, y0 + 0.6 * m, 1.36 * m, 0.14 * m, R);
poeNdBeam(x, X + 0.82 * m, y0 + 2.05 * m, 1.36 * m, 0.14 * m, R);
if (style === 0) {
poeNdBrace(x, X + 0.22 * m, y1 - 0.3 * m, X + 0.82 * m, y0 + 0.25 * m, 0.14 * m);
poeNdBrace(x, X + 2.18 * m, y0 + 0.25 * m, X + 3 * m, y1 - 0.3 * m, 0.14 * m);
}
else if (style === 1) {
[[X + 0.22 * m, X + 0.82 * m], [X + 2.18 * m, X + 3 * m]].forEach(function (p) { poeNdBrace(x, p[0], y1 - 0.3 * m, p[1], y0 + 1.4 * m, 0.12 * m); poeNdBrace(x, p[0], y0 + 1.4 * m, p[1], y1 - 0.3 * m, 0.12 * m); });
}
else {
[[X + 0.22 * m, X + 0.82 * m], [X + 2.18 * m, X + 3 * m]].forEach(function (p) { for (var hb = 0; hb < 3; hb++) {
var yy = y0 + 0.4 * m + hb * 0.8 * m;
poeNdBrace(x, p[0], yy + 0.5 * m, p[1], yy, 0.1 * m);
} });
}
if (R() < 0.25) {
x.fillStyle = "#5A3A1A";
x.fillRect(X + 0.95 * m, y0 + 2.05 * m, 1.1 * m, 0.18 * m);
x.fillStyle = ["#4A6A2A", "#C83A2A", "#6A7A3A"][(R() * 3) | 0];
for (var pl = 0; pl < 5; pl++) {
x.beginPath();
x.arc(X + 1.05 * m + pl * 0.22 * m, y0 + 2.02 * m, 0.09 * m, 0, 7);
x.fill();
}
}
}
poeNdBeam(x, 0, y1 - 0.3 * m, W, 0.3 * m, R);
poeNdBeam(x, 0, y0, W, 0.2 * m, R);
if (f > 0)
for (var j = 0; j < W; j += 0.6 * m) {
x.fillStyle = "#2E1C10";
x.fillRect(j, y1 - 0.02 * m, 0.18 * m, 0.16 * m);
}
}
poeNz(x, W, H, Math.round(W * H / 400), 0.05, 1520 + k);
});
},
function (k) {
var S = POE.lite ? 512 : 1024;
return poeParTexPair("ndGf" + k, S, Math.round(S * 4.4 / 12), function (x, e, W, H) {
var m = W / 12, R = wRand(1600 + k * 29);
x.fillStyle = ["#B8A888", "#C4B494", "#AC9C80", "#BCAE90"][k % 4];
x.fillRect(0, 0, W, H);
poeNz(x, W, H, Math.round(W * H / 60), 0.12, 1610 + k);
for (var r = 0; r < 3; r++)
for (var cx = -(r % 2) * 0.3 * m; cx < W; cx += 0.6 * m) {
var s = 96 + R() * 40 | 0;
x.fillStyle = "rgb(" + s + "," + (s - 6) + "," + (s - 16) + ")";
x.fillRect(cx + 1, H - (r + 1) * 0.22 * m + 1, 0.6 * m - 2, 0.22 * m - 2);
}
for (var b = 0; b < 4; b++) {
var X = b * 3 * m, kind = (k * 3 + b * 5) % 6;
poeNdBeam(x, X, 0, 0.26 * m, H, R);
poeNdBeam(x, X, 0.85 * m, 3 * m, 0.24 * m, R);
if (kind === 0 || kind === 3) {
var ix = X + 0.4 * m, iw = 2.3 * m, iy = 1.15 * m, ih = H - iy - 0.75 * m;
var g = x.createLinearGradient(0, iy, 0, iy + ih);
g.addColorStop(0, "#1A120C");
g.addColorStop(1, "#3A2A1A");
x.fillStyle = g;
x.fillRect(ix, iy, iw, ih);
var lit = R() < 0.55;
if (lit) {
var gl = x.createRadialGradient(ix + iw * 0.5, iy + ih * 0.4, 2, ix + iw * 0.5, iy + ih * 0.4, iw * 0.6);
gl.addColorStop(0, "rgba(240,170,80,.75)");
gl.addColorStop(1, "rgba(240,170,80,0)");
x.fillStyle = gl;
x.fillRect(ix, iy, iw, ih);
e.fillStyle = "rgba(150,90,30,.7)";
e.fillRect(ix + iw * 0.2, iy + ih * 0.15, iw * 0.6, ih * 0.5);
}
x.fillStyle = "#6A4A2A";
x.fillRect(ix - 0.1 * m, iy - 0.18 * m, iw + 0.2 * m, 0.2 * m);
x.fillStyle = "rgba(0,0,0,.35)";
x.fillRect(ix, iy + 0.02 * m, iw, 0.12 * m);
for (var w = 0; w < 10; w++) {
x.fillStyle = ["#C89048", "#E8DCC0", "#8A2A1A", "#4A6A3A", "#B8A070", "#5A4A6A"][(w + b + k) % 6];
var wx = ix + 0.1 * m + (w % 5) * 0.44 * m, wy = w < 5 ? H - 0.95 * m : iy + 0.35 * m + (R() * 0.5) * m;
if (w < 5) {
x.beginPath();
x.ellipse(wx + 0.15 * m, wy, 0.16 * m, 0.09 * m, 0, 0, 7);
x.fill();
}
else {
x.fillRect(wx, wy, 0.08 * m, 0.4 * m);
}
}
x.fillStyle = "#5A3A1E";
x.fillRect(ix - 0.1 * m, H - 0.82 * m, iw + 0.2 * m, 0.14 * m);
x.fillStyle = "rgba(0,0,0,.4)";
x.fillRect(ix - 0.1 * m, H - 0.68 * m, iw + 0.2 * m, 0.06 * m);
}
else if (kind === 1 || kind === 4) {
var dx = X + 0.75 * m, dw = 1.5 * m, top = 1.25 * m;
x.fillStyle = "#2A1C10";
x.beginPath();
x.moveTo(dx, H - 0.66 * m);
x.lineTo(dx, top + 0.6 * m);
x.quadraticCurveTo(dx, top, dx + dw / 2, top - 0.05 * m);
x.quadraticCurveTo(dx + dw, top, dx + dw, top + 0.6 * m);
x.lineTo(dx + dw, H - 0.66 * m);
x.fill();
x.fillStyle = "#4A3220";
for (var pk = 0; pk < 5; pk++)
x.fillRect(dx + pk * dw / 5 + 1, top + 0.3 * m, dw / 5 - 2, H - 0.96 * m - top);
x.fillStyle = "#1A1A1A";
[0.35, 0.75].forEach(function (t) { x.fillRect(dx, top + (H - 0.66 * m - top) * t, dw * 0.7, 0.05 * m); });
x.beginPath();
x.arc(dx + dw * 0.82, H - 1.6 * m, 0.05 * m, 0, 7);
x.fill();
}
else {
x.fillStyle = ["#5A4028", "#4A3A2A", "#5A4A30"][b % 3];
x.fillRect(X + 0.4 * m, 1.15 * m, 2.3 * m, H - 1.9 * m);
x.fillStyle = "rgba(0,0,0,.35)";
for (var sp = 0; sp < 7; sp++)
x.fillRect(X + 0.4 * m + sp * 0.33 * m, 1.15 * m, 1.4, H - 1.9 * m);
x.fillStyle = "#1A1A1A";
x.fillRect(X + 0.4 * m, 1.6 * m, 2.3 * m, 0.06 * m);
x.fillRect(X + 0.4 * m, H - 1.1 * m, 2.3 * m, 0.06 * m);
}
if (kind === 3 || kind === 4 || (kind === 0 && b % 2 === 0)) {
var nm = POE_ND_SIGNS[(k * 7 + b * 3) % POE_ND_SIGNS.length], sx = X + 0.35 * m, sy = 0.18 * m;
x.fillStyle = "#1A1A1A";
x.fillRect(sx, sy + 0.05 * m, 2.4 * m, 0.04 * m);
x.fillStyle = ["#8A1A1A", "#1A3A6A", "#2A4A2A", "#5A3A1A"][(k + b) % 4];
x.fillRect(sx + 0.25 * m, sy + 0.12 * m, 1.9 * m, 0.55 * m);
x.strokeStyle = "#C8A050";
x.lineWidth = 2;
x.strokeRect(sx + 0.25 * m, sy + 0.12 * m, 1.9 * m, 0.55 * m);
x.font = "bold " + Math.round(0.2 * m) + "px Georgia";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillStyle = "#E8C870";
x.fillText(nm, sx + 1.2 * m, sy + 0.4 * m, 1.8 * m);
}
}
poeNz(x, W, H, Math.round(W * H / 300), 0.06, 1630 + k);
});
},
function () {
var S = POE.lite ? 512 : 1024;
return poeParTexPair("ndRoof", S, Math.round(S / 4), function (x, e, W, H) {
var m = W / 12, R = wRand(1701);
x.fillStyle = "#5A3424";
x.fillRect(0, 0, W, H);
for (var y = 0; y < H; y += 0.2 * m) {
for (var xx = ((y / (0.2 * m)) % 2) * 0.11 * m; xx < W; xx += 0.22 * m) {
var r = 110 + R() * 50 | 0, gr = 58 + R() * 26 | 0;
x.fillStyle = "rgb(" + r + "," + gr + "," + (gr * 0.62 | 0) + ")";
x.beginPath();
x.ellipse(xx, y + 0.14 * m, 0.11 * m, 0.12 * m, 0, 0, Math.PI);
x.fill();
x.fillStyle = "rgba(0,0,0,.3)";
x.fillRect(xx - 0.11 * m, y + 0.14 * m, 0.22 * m, 1.5);
}
}
for (var mo = 0; mo < 60; mo++) {
x.fillStyle = "rgba(70,90,40," + (0.15 + R() * 0.3) + ")";
x.beginPath();
x.arc(R() * W, R() * H, 2 + R() * 0.25 * m, 0, 7);
x.fill();
}
for (var b = 0; b < 4; b++) {
if (R() < 0.55)
continue;
var X = b * 3 * m + 1.0 * m, Y = H * 0.3, w = 0.8 * m, h = H * 0.42, lit = R() < 0.35;
x.fillStyle = "#3A2416";
x.fillRect(X - 0.12 * m, Y - 0.08 * m, w + 0.24 * m, h + 0.12 * m);
x.beginPath();
x.moveTo(X - 0.25 * m, Y);
x.lineTo(X + w / 2, Y - 0.5 * m);
x.lineTo(X + w + 0.25 * m, Y);
x.fill();
poeNdCasement(x, e, X, Y, w, h, R, lit, false);
}
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "rgba(255,240,220,.06)");
g.addColorStop(1, "rgba(0,0,0,.25)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
});
},
function () {
if (POE.ndFlameT)
return POE.ndFlameT;
var c = document.createElement("canvas");
c.width = 64;
c.height = 128;
var x = c.getContext("2d");
for (var k = 0; k < 3; k++) {
var g = x.createRadialGradient(32, 100 - k * 10, 2, 32, 92 - k * 14, 58 - k * 12);
g.addColorStop(0, "rgba(255,250,220," + (0.9 - k * 0.2) + ")");
g.addColorStop(0.3, "rgba(255,190,80," + (0.7 - k * 0.15) + ")");
g.addColorStop(0.7, "rgba(220,80,20,.25)");
g.addColorStop(1, "rgba(120,20,0,0)");
x.fillStyle = g;
x.beginPath();
x.moveTo(32, 4 + k * 14);
x.bezierCurveTo(52 - k * 4, 44, 60 - k * 6, 96, 32, 124);
x.bezierCurveTo(4 + k * 6, 96, 12 + k * 4, 44, 32, 4 + k * 14);
x.fill();
}
var t = new THREE.CanvasTexture(c);
POE.ndFlameT = t;
return t;
},
function (x, W, H) { x.fillStyle = "#5A3424"; x.fillRect(0, 0, W, H); var R = wRand(1702); for (var y = 0; y < H; y += H / 16) {
for (var xx = ((y / (H / 16)) % 2) * W / 24; xx < W; xx += W / 12) {
var r = 110 + R() * 50 | 0, g = 58 + R() * 26 | 0;
x.fillStyle = "rgb(" + r + "," + g + "," + (g * 0.62 | 0) + ")";
x.beginPath();
x.ellipse(xx, y + H / 24, W / 24, H / 22, 0, 0, Math.PI);
x.fill();
}
} poeNz(x, W, H, 4000, 0.15, 1703); },
function (x, W, H) {
x.fillStyle = "#211B14";
x.fillRect(0, 0, W, H);
var R = wRand(1704), rows = 15, cols = 11, ch = H / rows, cw = W / cols;
for (var ry = 0; ry < rows; ry++)
for (var cx = 0; cx < cols; cx++) {
var X = (cx + (ry % 2) * 0.5 + (R() - 0.5) * 0.25) * cw, Y = (ry + (R() - 0.5) * 0.2) * ch + ch / 2, rw = cw * (0.36 + R() * 0.12), rh = ch * (0.34 + R() * 0.12), n = 7 + (R() * 3 | 0);
var t = R(), base = t < 0.5 ? [118, 104, 82] : t < 0.8 ? [96, 88, 74] : [132, 116, 90], dk = 0.72 + R() * 0.36;
for (var dup = -1; dup <= 1; dup++) {
var ox = dup * W;
if (X + ox < -cw || X + ox > W + cw)
continue;
x.beginPath();
for (var k = 0; k < n; k++) {
var a = k / n * Math.PI * 2, rr = 0.82 + R() * 0.3;
x.lineTo(X + ox + Math.cos(a) * rw * rr, Y + Math.sin(a) * rh * rr);
}
x.closePath();
var g = x.createRadialGradient(X + ox - rw * 0.25, Y - rh * 0.3, 1, X + ox, Y, Math.max(rw, rh) * 1.1);
g.addColorStop(0, "rgb(" + (base[0] * dk * 1.18 | 0) + "," + (base[1] * dk * 1.18 | 0) + "," + (base[2] * dk * 1.15 | 0) + ")");
g.addColorStop(0.7, "rgb(" + (base[0] * dk | 0) + "," + (base[1] * dk | 0) + "," + (base[2] * dk | 0) + ")");
g.addColorStop(1, "rgb(" + (base[0] * dk * 0.55 | 0) + "," + (base[1] * dk * 0.55 | 0) + "," + (base[2] * dk * 0.5 | 0) + ")");
x.fillStyle = g;
x.fill();
x.strokeStyle = "rgba(18,14,10,.75)";
x.lineWidth = 1.5;
x.stroke();
}
}
for (var p = 0; p < 4; p++) {
var px = R() * W, py = R() * H, pr = W * (0.05 + R() * 0.08), g2 = x.createRadialGradient(px, py, 1, px, py, pr);
g2.addColorStop(0, "rgba(34,28,20,.9)");
g2.addColorStop(0.75, "rgba(40,34,26,.55)");
g2.addColorStop(1, "rgba(40,32,22,0)");
x.fillStyle = g2;
x.beginPath();
x.ellipse(px, py, pr, pr * 0.6, R() * 3, 0, 7);
x.fill();
}
for (var s2 = 0; s2 < 140; s2++) {
x.strokeStyle = "rgba(150,120,60," + (0.15 + R() * 0.25) + ")";
x.lineWidth = 1;
var sx = R() * W, sy = R() * H, a2 = R() * 3;
x.beginPath();
x.moveTo(sx, sy);
x.lineTo(sx + Math.cos(a2) * (4 + R() * 8), sy + Math.sin(a2) * (4 + R() * 8));
x.stroke();
}
poeNz(x, W, H, 6000, 0.12, 1705);
},
function (R, g) {
var lite = POE.lite, st = poeParLit(poeS("stone", 0xD0C8B4)), dk = poeParLit(poeS("stone", 0x948C7E)), lead = poeShine(0x3A3E46, 0.55, 0.5), slate = poeShine(0x2A2E36, 0.6, 0.4), gold = poeShine(0xD8A848, 0.3, 0.85), oak = poeS("oak", 0x4A3220), seg = lite ? 10 : 16, out = [];
function grp(p, ry) { var q = poeGrp(g, p[0], 0, p[1], ry || 0); out.push(q); return poeNdMark(q, 1482); }
function solid(p, w, d, h, ry) { var S = poeSolid(R.x + p[0], p[1], w, d, -2, h, ry || 0); S.era = 1482; (R.ndSolids || (R.ndSolids = [])).push(S); S.off = !POE.era; return S; }
function tower(P, x, z, r, h, cone) { poeCyl(P, r, r * 1.04, h, st, x, h / 2, z, seg); if (cone) {
var c = poeCone(P, r * 1.15, r * 2.4, slate, x, h + r * 1.2, z);
}
else {
poeCyl(P, r * 1.08, r * 1.08, 1.2, dk, x, h + 0.6, z, seg);
for (var i = 0; i < (lite ? 6 : 10); i++) {
var a = i / (lite ? 6 : 10) * Math.PI * 2;
poeBox(P, 0.8, 1.0, 0.8, dk, x + Math.cos(a) * r, h + 1.7, z + Math.sin(a) * r);
}
} }
(function () {
var C = POE_PAR_MON.nd, F = POE_PAR_MON.ndFront, a = Math.atan2(C[1] - F[1], C[0] - F[0]), q = grp(C, -a), Fx = -67;
var sp = poeGrp(q, 3, 0, 0);
poeCyl(sp, 3.4, 3.6, 7, lead, 0, 46.5, 0, 8);
for (var p = 0; p < 8; p++) {
var pa = p / 8 * Math.PI * 2;
poeCone(sp, 0.5, 4.5, lead, Math.cos(pa) * 3.6, 52, Math.sin(pa) * 3.6);
poeBox(sp, 0.3, 7, 0.3, poeShine(0x5A5A60, 0.5, 0.6), Math.cos(pa) * 3.5, 46.5, Math.sin(pa) * 3.5);
}
var spire = new THREE.Mesh(new THREE.ConeGeometry(3.2, 40, 8), lead);
spire.position.y = 70;
sp.add(spire);
for (var rb = 0; rb < 8; rb++) {
var ra = (rb + 0.5) / 8 * Math.PI * 2, rib = poeBox(sp, 0.18, 40.5, 0.18, poeShine(0x6A6A70, 0.4, 0.7), Math.cos(ra) * 1.6, 70, Math.sin(ra) * 1.6);
rib.rotation.z = -Math.cos(ra) * 0.08;
rib.rotation.x = Math.sin(ra) * 0.08;
}
poeSph(sp, 0.55, gold, 0, 90.6, 0, 10);
poeBox(sp, 0.18, 2.6, 0.18, gold, 0, 92.2, 0);
poeBox(sp, 1.4, 0.18, 0.18, gold, 0, 92.6, 0);
var ck = poeSph(sp, 0.32, gold, 0, 93.8, 0, 8);
ck.scale.set(1.4, 1, 0.5);
var kings = poeGrp(q, 0, 0, 0), robes = [0x2A3A8A, 0x8A1A1A, 0x2A6A3A, 0x6A2A6A, 0xC89030], skin = poeC(0xD8B898);
for (var k = 0; k < 28; k++) {
var kz = -20.5 + 0.73 + k * 1.465, kg = poeGrp(kings, Fx - 0.05, 17.4, kz, -Math.PI / 2), rc = robes[k % 5];
ndKing(kg, 0, 0, 0, 0, rc, robes[(k + 2) % 5], 1.45, lite);
}
poeNdMerge(kings);
[[-13.5, 6.5, 5.6], [0, 7.5, 6.2], [13.5, 6.5, 5.6]].forEach(function (P) { var t = poeFace(q, P[1] * 0.9, 2.4, poeNdTympM(), Fx + 2.9, P[2] + 1.3, P[0], -Math.PI / 2); });
poeNdMark(q, 1482);
})();
(function () {
var A = ND_AT, pl = grp(A.pillory, 0.2);
poeBox(pl, 4.2, 3.2, 4.2, dk, 0, 1.6, 0);
for (var s = 0; s < 8; s++)
poeBox(pl, 1.0, 0.3, 0.6, dk, -2.6 - 0.0, 0.15 + s * 0.38, 1.6 - s * 0.42);
poeCyl(pl, 1.6, 1.6, 0.25, oak, 0, 3.35, 0, lite ? 12 : 20);
poeCyl(pl, 0.12, 0.12, 1.2, oak, 0, 3.9, 0, 6);
poeBox(pl, 4.4, 0.2, 4.4, st, 0, 3.25, 0);
solid(A.pillory, 4.6, 4.6, 3.4, 0.2);
R.ndPillory = pl;
var gb = grp(A.gibbet, 0.1);
poeBox(gb, 5, 1.2, 2, dk, 0, 0.6, 0);
[-1.8, 1.8].forEach(function (x) { poeBox(gb, 0.8, 5.5, 0.8, st, x, 3.95, 0); });
poeBox(gb, 4.6, 0.5, 0.5, oak, 0, 6.6, 0);
for (var c = 0; c < 3; c++)
poeCyl(gb, 0.02, 0.02, 1.4, poeShine(0x2A2A2A, 0.5, 0.8), -1.2 + c * 1.2, 5.7, 0, 4);
solid(A.gibbet, 5, 2, 7, 0.1);
var cr = grp(A.cross, 0);
poeBox(cr, 1.6, 0.6, 1.6, dk, 0, 0.3, 0);
poeCyl(cr, 0.22, 0.28, 4.8, st, 0, 3, 0, 8);
poeBox(cr, 1.6, 0.25, 0.25, st, 0, 4.6, 0);
solid(A.cross, 1.6, 1.6, 5);
var hp = grp(A.piliers, -Math.PI / 2);
poeBox(hp, 30, 13, 1.2, st, 0, 6.5, -6);
for (var p = 0; p < 9; p++) {
poeCyl(hp, 0.5, 0.55, 4.2, dk, -12 + p * 3, 2.1, -4.2, 10);
}
poeBox(hp, 30, 0.6, 3.0, dk, 0, 4.4, -4.8);
for (var w = 0; w < 8; w++) {
poeFace(hp, 1.2, 2.2, poeNdWinM(), -10.5 + w * 3, 7.4, -5.38, 0);
poeFace(hp, 1.2, 2.0, poeNdWinM(), -10.5 + w * 3, 11.2, -5.38, 0);
}
[-10, 0, 10].forEach(function (x) { var gab = poeRoof(hp, 10, 12, 6, 13, slate); gab.position.x = x; gab.rotation.y = Math.PI / 2; });
solid([A.piliers[0] + 6, A.piliers[1]], 12, 30, 14);
var sgn = wSign(["MAISON AUX PILIERS · PARLOIR AUX BOURGEOIS"], 6, 0.6, "#3A2E22", "#E8D8A8");
sgn.position.set(0, 5.2, -3.4);
hp.add(sgn);
var tr = grp(A.ratHole, Math.PI / 2);
poeBox(tr, 9, 12, 0.8, dk, -1.5, 6, -0.6);
var tw = poeCyl(tr, 1.8, 1.8, 16, dk, 3.6, 8, -1.8, seg);
poeCone(tr, 2.1, 4.5, slate, 3.6, 18.2, -1.8);
poeBox(tr, 0.9, 0.75, 0.12, poeC(0x050505), 0, 1.5, -0.16);
for (var gbar = 0; gbar < 5; gbar++)
poeCyl(tr, 0.025, 0.025, 0.8, poeShine(0x2A2A2A, 0.5, 0.8), -0.36 + gbar * 0.18, 1.5, -0.1, 4);
for (var hb = 0; hb < 3; hb++) {
var bb = poeCyl(tr, 0.025, 0.025, 0.95, poeShine(0x2A2A2A, 0.5, 0.8), 0, 1.25 + hb * 0.25, -0.1, 4);
bb.rotation.z = Math.PI / 2;
}
var tu = wSign(["TU, ORA."], 1.6, 0.32, "#8A8070", "#1A1610");
tu.position.set(0, 2.35, -0.14);
tr.add(tu);
var br = poeGrp(tr, -2.4, 0, 0.5);
poeBox(br, 0.7, 1.1, 0.5, oak, 0, 0.55, 0);
var bk = poeBox(br, 0.6, 0.06, 0.45, poeC(0xE8DCC0), 0, 1.14, 0);
bk.rotation.x = -0.3;
var rf = poeBox(br, 0.9, 0.06, 0.7, slate, 0, 1.9, -0.05);
rf.rotation.x = 0.4;
poeBox(br, 0.06, 0.9, 0.06, oak, -0.4, 1.5, 0.2);
poeBox(br, 0.06, 0.9, 0.06, oak, 0.4, 1.5, 0.2);
R.ndRat = tr;
})();
(function () {
var A = ND_AT, fg = grp(A.fire, 0), bark = poeS("oak", 0x3A2A1A), char = poeC(0x1A120C), ston = poeS("stone", 0x7A7268);
for (var st = 0; st < 14; st++) {
var a = st / 14 * Math.PI * 2;
poeSph(fg, 0.32, ston, Math.cos(a) * 2.3, 0.12, Math.sin(a) * 2.3, 6).scale.set(1, 0.6, 1.2);
}
for (var l = 0; l < (lite ? 10 : 18); l++) {
var a2 = l / (lite ? 10 : 18) * Math.PI * 2 + (l % 3) * 0.2, lg = poeCyl(fg, 0.07 + (l % 3) * 0.03, 0.11 + (l % 2) * 0.03, 3.0 + (l % 4) * 0.3, l % 2 ? bark : char, Math.cos(a2) * 0.75, 1.25, Math.sin(a2) * 0.75, 6);
lg.rotation.order = "YXZ";
lg.rotation.y = -a2 + Math.PI / 2;
lg.rotation.z = 0.45;
}
for (var e = 0; e < 6; e++) {
var lg2 = poeCyl(fg, 0.12, 0.12, 2.2, char, Math.cos(e) * 1.2, 0.12, Math.sin(e) * 1.2, 6);
lg2.rotation.z = Math.PI / 2;
lg2.rotation.y = e * 1.1;
}
var tex = ndFlameTex(), fl = [];
for (var f = 0; f < (lite ? 5 : 11); f++) {
var sm = new THREE.SpriteMaterial({ map: tex, color: [0xFFC880, 0xFFA050, 0xFF8030][f % 3], transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.55 }), sp = new THREE.Sprite(sm);
var r = f < 3 ? 0 : 0.35 + (f % 4) * 0.25, a3 = f * 2.4;
sp.position.set(Math.cos(a3) * r, 1.3 + (f < 3 ? 0.6 : 0) + (f % 3) * 0.3, Math.sin(a3) * r);
var w = f < 3 ? 2.4 : 1.3 + (f % 3) * 0.3;
sp.scale.set(w, w * 1.9, 1);
sp.userData.w = w;
sp.userData.y = sp.position.y;
fg.add(sp);
fl.push(sp);
}
var ember = wPoints(lite ? 24 : 60, function (j) { var R2 = wRand(900 + j); return [(R2() - 0.5) * 1.6, 1 + R2() * 4.5, (R2() - 0.5) * 1.6]; }, 0xFFA040, 0.09, true);
ember.material.blending = THREE.AdditiveBlending;
fg.add(ember);
fg.userData.ember = ember;
var gl = wGlow(0xFFA040, 9, 0.75);
gl.position.y = 1.6;
fg.add(gl);
R.ndFire = fg;
fg.userData.flames = fl;
fg.userData.ndShow = "fire";
})();
(function () {
var A = ND_AT, n = A.palaisN, ry = Math.atan2(n[0], n[1]), dg = grp([A.palais[0] + 0.5 + n[0] * 0.6, A.palais[1] + 0.5 + n[1] * 0.6], ry);
poeBox(dg, 7, 11, 0.8, st, 0, 5.5, -0.5);
var arch = poeNdWall(4.2, 6.4, 0.5, [{ x: 0, w: 2.6, h: 3.6 }], dk);
poeNdPut(dg, arch, 0, 0, 0.0, 0);
poeBox(dg, 2.5, 3.5, 0.1, poeS("oak", 0x3A2414), 0, 1.75, -0.1);
[-1, 1].forEach(function (s) { poeCyl(dg, 0.9, 1.0, 13, st, s * 3.6, 6.5, -0.3, seg); poeCone(dg, 1.1, 3.4, slate, s * 3.6, 14.7, -0.3); });
var sg = wSign(["LE PALAIS · LA GRAND'SALLE"], 3.6, 0.5, "#2A2A3A", "#E8D8A8");
sg.position.set(0, 4.4, 0.1);
dg.add(sg);
var gl = wGlow(0xFFB860, 3, 0.55);
gl.position.set(0, 3.6, 1);
dg.add(gl);
R.ndPalaisSpot = poeSpot(R.x + A.palais[0] + 0.5 + n[0] * 1.8, A.palais[1] + 0.5 + n[1] * 1.8, 2.6, "The Palais: the great hall", "go in", function () { if (POE.era)
poeEnterRoom("x_ndhall", "nd:palais"); }, 0);
R.ndPalaisSpot.off = !POE.era;
POE.exits["out:nd_palais"] = { x: R.x + A.palais[0] + 0.5 + n[0] * 2.2, z: A.palais[1] + 0.5 + n[1] * 2.2, ry: ry, par: 1 };
})();
(function () {
var A = ND_AT, C = A.miraclesClear, cm = grp([C[0], C[1]], 0);
poePlane(cm, C[2] * 2, C[3] * 2, poeS("earth", 0x5A4A38), 0, 0.02, 0);
[[-8, -3], [6, 4], [0, -5]].forEach(function (p, i) { var fg = poeGrp(cm, p[0], 0, p[1]); for (var l = 0; l < 5; l++) {
var lg = poeCyl(fg, 0.1, 0.12, 1.6, poeC(0x2A1A10), 0, 0.3, 0, 6);
lg.rotation.z = 1.1;
lg.rotation.y = l / 5 * Math.PI * 2;
} var fm = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.5, 8), poeGlowM(0xFF9030, 0.75)); fm.position.y = 0.8; fg.add(fm); var gl = wGlow(0xFF9040, 6, 0.7); gl.position.y = 1.0; fg.add(gl); if (i === 0)
poeLight(0xFF9040, 2.2, 22, C[0] + p[0], 1.6, C[1] + p[1], g, true); });
for (var b = 0; b < 6; b++) {
var bx = -12 + b * 4.5, bz = (b % 2 ? 7 : -7.5);
poeCyl(cm, 0.45, 0.5, 1.0, poeS("oak", 0x5A3A1E), bx, 0.5, bz, 10);
}
var th = poeGrp(cm, 9, 0, -3);
poeCyl(th, 0.6, 0.65, 1.3, poeS("oak", 0x5A3A1E), 0, 0.65, 0, 12);
R.ndClopinSeat = [C[0] + 9, C[1] - 3];
var gw = poeGrp(cm, -2, 0, 4);
[-1.4, 1.4].forEach(function (x) { poeBox(gw, 0.25, 3.6, 0.25, poeC(0x3A2A1A), x, 1.8, 0); poeBox(gw, 1.2, 0.12, 0.25, poeC(0x3A2A1A), x, 0.06, 0); });
poeBox(gw, 3.2, 0.22, 0.22, poeC(0x3A2A1A), 0, 3.5, 0);
var mq = poeGrp(gw, 0, 0, 0);
poeCyl(mq, 0.008, 0.008, 0.9, poeC(0x6A5A3A), 0, 3.0, 0, 4);
var mb = poeCyl(mq, 0.22, 0.26, 1.0, poeS("cloth", 0x8A2A1A), 0, 2.0, 0, 8);
poeSph(mq, 0.16, poeS("cloth", 0xC8B898), 0, 2.65, 0, 8);
for (var bl = 0; bl < (lite ? 8 : 16); bl++) {
var ba = bl / (lite ? 8 : 16) * Math.PI * 2, by = 1.6 + (bl % 4) * 0.25;
poeSph(mq, 0.04, poeShine(0xE8C040, 0.25, 0.9), Math.cos(ba) * 0.27, by, Math.sin(ba) * 0.27, 6);
}
poeCyl(gw, 0.25, 0.28, 0.55, poeS("oak", 0x5A3A1E), 0.0, 0.28, 0.5, 8);
R.ndMannequin = mq;
R.ndGallows = [C[0] - 2, C[1] + 4];
for (var hv = 0; hv < (lite ? 5 : 9); hv++) {
var side = hv % 2, hx = -14 + hv * 3.4, hz = side ? C[3] - 1.5 : -C[3] + 1.5, hg = poeGrp(cm, hx, 0, hz, side ? Math.PI : 0);
poeBox(hg, 3.0, 3.2 + hv % 3 * 0.5, 0.4, poeS("rough", 0x6A5A44), 0, 1.7, 0.6);
var rf = poeBox(hg, 3.4, 0.1, 2.0, poeS("rough", 0x4A3A28), 0, 3.6 + hv % 3 * 0.5, 0.0);
rf.rotation.x = -0.5;
poeBox(hg, 0.9, 1.8, 0.06, poeC(0x1A120C), 0.6, 0.9, 0.38);
}
R.ndMiracles = cm;
})();
(function () {
var A = ND_AT;
var ch = poeNdMark(grp(A.chatelet, 0.3), 1482, true);
poeBox(ch, 30, 16, 22, st, 0, 8, 0);
[[-14, -10], [14, -10], [-14, 10], [14, 10], [0, -11]].forEach(function (p) { tower(ch, p[0], p[1], 3.5, 22, true); });
var lv = poeNdMark(grp(A.louvre, 0.05), 1482, true);
poeBox(lv, 72, 14, 72, st, 0, 7, 0);
tower(lv, 0, 0, 7.5, 32, true);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
tower(lv, Math.cos(a) * 40, Math.sin(a) * 40, 3.6, 22, true);
}
var sc = poeNdMark(grp(A.chapelle, 0.05), 1482, true);
poeBox(sc, 33, 26, 11, st, 0, 13, 0);
var sr = poeRoof(sc, 33, 11, 9, 26, slate);
var scs = new THREE.Mesh(new THREE.ConeGeometry(1.6, 33, 8), gold);
scs.position.set(-4, 52, 0);
sc.add(scs);
poeCyl(sc, 1.8, 1.8, 6, lead, -4, 38, 0, 8);
var tp = poeNdMark(grp(A.temple, 0), 1482, true);
poeBox(tp, 15, 48, 15, dk, 0, 24, 0);
[[-7.5, -7.5], [7.5, -7.5], [-7.5, 7.5], [7.5, 7.5]].forEach(function (p) { tower(tp, p[0], p[1], 2.4, 50, true); });
var bs = poeNdMark(grp(A.bastille, -0.35), 1482, false);
poeBox(bs, 66, 22, 30, dk, 0, 11, 0);
[[-33, -15], [-11, -15], [11, -15], [33, -15], [-33, 15], [-11, 15], [11, 15], [33, 15]].forEach(function (p) { tower(bs, p[0], p[1], 7, 24, false); });
solid(A.bastille, 80, 44, 30, -0.35);
var sg = poeNdMark(grp(A.genevieve, 0), 1482, true);
poeBox(sg, 40, 20, 14, st, 0, 10, 0);
poeBox(sg, 9, 44, 9, st, 22, 22, 0);
poeCone(sg, 6.5, 14, slate, 22, 51, 0);
var gp = poeNdMark(grp(A.germain, 0), 1482, true);
poeBox(gp, 60, 22, 20, st, 0, 11, 0);
[[-28, 0], [20, -11], [20, 11]].forEach(function (p, i) { poeBox(gp, 8, i ? 34 : 42, 8, st, p[0], (i ? 34 : 42) / 2, p[1]); poeCone(gp, 5.8, i ? 10 : 16, slate, p[0], (i ? 34 : 42) + (i ? 5 : 8), p[1]); });
})();
return out;
},
function () {
var k = "ndWin";
if (POE.mats[k])
return POE.mats[k];
var t = wTex(64, 128, function (x, W, H) { x.fillStyle = "#3A3428"; x.fillRect(0, 0, W, H); x.fillStyle = "#1A2028"; x.beginPath(); x.moveTo(6, H); x.lineTo(6, H * 0.35); x.quadraticCurveTo(6, 6, W / 2, 4); x.quadraticCurveTo(W - 6, 6, W - 6, H * 0.35); x.lineTo(W - 6, H); x.fill(); x.strokeStyle = "#8A8070"; x.lineWidth = 3; x.beginPath(); x.moveTo(W / 2, 8); x.lineTo(W / 2, H); x.stroke(); x.beginPath(); x.arc(W / 2, H * 0.32, W * 0.18, 0, 7); x.stroke(); });
return (POE.mats[k] = new THREE.MeshLambertMaterial({ map: t }));
},
function () {
var k = "ndTymp";
if (POE.mats[k])
return POE.mats[k];
var t = wTex(256, 96, function (x, W, H) {
x.clearRect(0, 0, W, H);
x.fillStyle = "#1E3A8A";
x.beginPath();
x.moveTo(0, H);
x.lineTo(0, H * 0.45);
x.quadraticCurveTo(0, 0, W / 2, 0);
x.quadraticCurveTo(W, 0, W, H * 0.45);
x.lineTo(W, H);
x.fill();
var cols = ["#C8A040", "#8A1A1A", "#E8E0D0", "#2A6A3A", "#C8A040"];
for (var r = 0; r < 3; r++) {
var n = 9 - r * 3, y = H * (0.85 - r * 0.28);
for (var f = 0; f < n; f++) {
var fx = W * (0.5 + (f - (n - 1) / 2) * (0.95 / 9));
x.fillStyle = cols[(f + r) % 5];
x.beginPath();
x.ellipse(fx, y, W * 0.022, H * 0.11, 0, 0, 7);
x.fill();
x.fillStyle = "#E8C8A0";
x.beginPath();
x.arc(fx, y - H * 0.13, W * 0.012, 0, 7);
x.fill();
}
}
x.strokeStyle = "#D8B050";
x.lineWidth = 3;
x.beginPath();
x.moveTo(0, H * 0.45);
x.quadraticCurveTo(0, 0, W / 2, 0);
x.quadraticCurveTo(W, 0, W, H * 0.45);
x.stroke();
});
return (POE.mats[k] = new THREE.MeshLambertMaterial({ map: t, transparent: true, alphaTest: 0.4 }));
},
function (dt) {
var R = POE_RX.x_paris;
if (POE.room !== R)
return;
var P = poeParHere(), era = POE.era || 0, far = POE.ndView ? 4000 : (POE.lite ? 150 : 240);
(R.mons || []).forEach(function (m) { var e = m.userData.era; if (e === -1)
return; if (e !== era) {
m.visible = false;
return;
} if (e === 1482) {
if (m.userData.ndShow && !POE.ndShow[m.userData.ndShow]) {
m.visible = false;
return;
}
if (m.userData.ndFar && !POE.ndView) {
m.visible = false;
return;
}
var dx = m.position.x - P.x, dz = m.position.z - P.z;
m.visible = dx * dx + dz * dz < far * far;
} });
if (R.ndFire && R.ndFire.visible) {
R.ndFire.userData.flames.forEach(function (f, i) { var w = f.userData.w, s = 1 + 0.08 * Math.sin(POE.t * 2.1 + i * 1.7) + 0.05 * Math.sin(POE.t * 3.3 + i); f.scale.set(w * s, w * 1.9 * (1 + 0.1 * Math.sin(POE.t * 1.6 + i)), 1); f.position.y = f.userData.y + 0.08 * Math.sin(POE.t * 1.9 + i * 0.7); f.material.rotation = 0.06 * Math.sin(POE.t * 1.3 + i); });
var em = R.ndFire.userData.ember;
if (em) {
em.position.y = (POE.t * 0.9) % 1.5;
em.rotation.y = POE.t * 0.2;
}
}
if (POE.ndView && R.ndFarCity)
R.ndFarCity.visible = true;
},
function () {
var era = POE.era, R = POE_RX.x_paris;
if (R && R.g) {
(R.ndSolids || []).forEach(function (S) { S.off = !era; });
(R.spots1841 || []).forEach(function (S) { S.off = !!era; });
if (R.ndPalaisSpot)
R.ndPalaisSpot.off = !era;
}
var N = POE_RX.x_nd;
if (N && N.g) {
if (N.vow)
N.vow.visible = !era;
if (N.nd1482)
N.nd1482.visible = !!era;
(N.folk1841 || []).forEach(function (P) { P.g.visible = !era; });
(N.folk1482 || []).forEach(function (P) { P.g.visible = !!era; });
(N.ndSolids || []).forEach(function (S) { S.off = !era; });
}
},
function () {
var F = POE_PAR_F;
[0, 1482].forEach(function (e) { (F.byEra[e] || []).forEach(function (W) { W.P.g.visible = false; W.P.g.position.x = 1e5; W.dir = null; }); });
if (F.byEra[0] !== F.list && F.list === F.byEra[1482]) { }
var R = POE_RX.x_paris;
if (R && POE.room === R)
poeParFolkStart(R);
else
F.list = F.byEra[POE.era ? 1482 : 0];
},
function () {
var R = POE_RX.x_paris;
if (!R || R.ndTop)
return;
var c = poeNdTopAt(-60.5, 13.75), y = ND_TOP.y;
R.ndTop = { x: c[0], z: c[1] };
var f = poeFloor(R.x + c[0], c[1], 11.6, 11.6, y, true);
f.ndTop = 1;
R.ndTopFloor = f;
[[0, -5.9, 12.4, 0.5], [0, 5.9, 12.4, 0.5], [-5.9, 0, 0.5, 12.4], [5.9, 0, 0.5, 12.4]].forEach(function (s) { var S = poeSolid(R.x + c[0] + s[0], c[1] + s[1], s[2], s[3], y - 0.5, y + 1.6); (R.ndSolids || (R.ndSolids = [])).push(S); S.era = 1482; S.off = !POE.era; });
var tg = poeGrp(R.g, c[0], y, c[1]);
poeNdMark(tg, -1);
tg.visible = true;
poePlane(tg, 11.8, 11.8, poeShine(0x4A4E54, 0.6, 0.5), 0, 0.02, 0);
var hatch = poeBox(tg, 1.4, 0.25, 1.4, poeS("oak", 0x3A2414), -4.2, 0.12, -4.2);
R.ndTopSpot = poeSpot(R.x + c[0] - 4.2, c[1] - 4.2, 1.8, "The stair down the tower", "go down", function () { poeNdTopDown(); }, y);
R.ndTopG = tg;
},
function () {
var R = poeRoomGet("x_paris");
poeNdTopMake();
var c = R.ndTop;
POE.ndView = 1;
poeEnterRoom("x_paris", "nd:top", { x: c.x - 3, z: c.z, y: ND_TOP.y, ry: Math.PI * 0.5 });
setTimeout(function () { poeNdFarCity(); if (!poeActive())
setStatus("🔔 <b>The top of the north tower of Notre-Dame.</b> " + (POE.era ? "Paris of 1482 all round you." : "Paris of 1841 all round you.") + " The stair down is behind you, by the trap."); }, 900);
},
function () {
var R = POE_RX.x_paris;
if (!R || !R.g || R.ndFarCity)
return;
var C = R.ndTop || { x: POE_PAR_MON.nd[0], z: POE_PAR_MON.nd[1] }, G = POE_PAR, rad = POE.lite ? 650 : 1100, cell = POE.lite ? 10 : 6;
var need = [];
for (var tx = Math.floor((C.x - rad - G.X0) / G.T); tx <= Math.floor((C.x + rad - G.X0) / G.T); tx++)
for (var tz = Math.floor((C.z - rad - G.Z0) / G.T); tz <= Math.floor((C.z + rad - G.Z0) / G.T); tz++) {
if (G.has[tx + "_" + tz] && !G.data[tx + "_" + tz]) {
poeParLoad(tx, tz);
need.push(tx + "_" + tz);
}
}
if (need.some(function (k) { return !G.data[k]; })) {
R.ndFarWait = (R.ndFarWait || 0) + 1;
if (R.ndFarWait < 40)
setTimeout(poeNdFarCity, 250);
return;
}
R.ndFarWait = 0;
var P = [], Cl = [], col = new THREE.Color(), era = POE.era;
function quad(a, b, c, d, cc) { P.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], a[0], a[1], a[2], c[0], c[1], c[2], d[0], d[1], d[2]); for (var i = 0; i < 6; i++)
Cl.push(cc.r, cc.g, cc.b); }
function tri(a, b, c, cc) { P.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); for (var i = 0; i < 3; i++)
Cl.push(cc.r, cc.g, cc.b); }
var wall = new THREE.Color(era ? 0xB8A888 : 0xC8C0AC), wall2 = new THREE.Color(era ? 0x9A8A70 : 0xA8A090), roofA = new THREE.Color(era ? 0x7A4A34 : 0x3A3E46), roofB = new THREE.Color(era ? 0x5A3A2A : 0x2E3238), water = new THREE.Color(0x1A2430), street = new THREE.Color(era ? 0x4A4034 : 0x3A3832);
for (var z = C.z - rad; z < C.z + rad; z += cell) {
var run = -1;
for (var x = C.x - rad; x <= C.x + rad; x += cell) {
var d = Math.hypot(x - C.x, z - C.z), t = (x < C.x + rad && d < rad && d > 92) ? poeParRaw(x + cell / 2, z + cell / 2) : -9;
if (t === 1 && run < 0)
run = x;
if ((t !== 1 || x >= C.x + rad) && run >= 0) {
var x0 = run, x1 = x, hh = poeParH(x0, z) * (0.9 + ((Math.abs(x0 * 7 + z * 3) | 0) % 5) * 0.06), rr = (Math.abs(x0 * 13 + z) | 0) % 2 ? roofA : roofB;
quad([x0, 0, z + cell], [x1, 0, z + cell], [x1, hh, z + cell], [x0, hh, z + cell], wall);
quad([x1, 0, z], [x0, 0, z], [x0, hh, z], [x1, hh, z], wall2);
quad([x1, 0, z + cell], [x1, 0, z], [x1, hh, z], [x1, hh, z + cell], wall2);
quad([x0, 0, z], [x0, 0, z + cell], [x0, hh, z + cell], [x0, hh, z], wall2);
var rh = hh + (era ? cell * 0.75 : cell * 0.35);
quad([x0, hh, z + cell], [x1, hh, z + cell], [x1, rh, z + cell / 2], [x0, rh, z + cell / 2], rr);
quad([x1, hh, z], [x0, hh, z], [x0, rh, z + cell / 2], [x1, rh, z + cell / 2], rr);
tri([x0, hh, z], [x0, hh, z + cell], [x0, rh, z + cell / 2], wall2);
tri([x1, hh, z + cell], [x1, hh, z], [x1, rh, z + cell / 2], wall2);
run = -1;
}
}
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(P), 3));
geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(Cl), 3));
geo.computeVertexNormals();
var m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true }));
m.userData.era = -1;
R.g.add(m);
R.ndFarCity = m;
var gp = new THREE.Mesh(new THREE.PlaneGeometry(rad * 2.2, rad * 2.2), new THREE.MeshLambertMaterial({ color: street }));
gp.rotation.x = -Math.PI / 2;
gp.position.set(C.x, -0.15, C.z);
R.g.add(gp);
R.ndFarGround = gp;
},
function () {
return poeNdCanvasTex("ndHallVault", 512, 512, function (x, W, H) {
x.fillStyle = "#1E3A7A";
x.fillRect(0, 0, W, H);
var R = wRand(1482);
for (var i = 0; i < 1600; i++) {
x.fillStyle = "rgba(10,20,50," + (R() * 0.2) + ")";
x.fillRect(R() * W, R() * H, 3, 3);
}
x.strokeStyle = "#5A3A1A";
x.lineWidth = 10;
for (var p = 0; p <= W; p += W / 4) {
x.beginPath();
x.moveTo(p, 0);
x.lineTo(p, H);
x.stroke();
x.beginPath();
x.moveTo(0, p);
x.lineTo(W, p);
x.stroke();
}
x.fillStyle = "#E8C048";
for (var a = 0; a < 4; a++)
for (var b = 0; b < 4; b++) {
var cx = W / 8 + a * W / 4, cy = H / 8 + b * H / 4, s = W / 22;
x.beginPath();
x.ellipse(cx, cy - s * 0.6, s * 0.32, s * 0.9, 0, 0, 7);
x.fill();
[-1, 1].forEach(function (k) { x.beginPath(); x.ellipse(cx + k * s * 0.75, cy - s * 0.2, s * 0.25, s * 0.65, k * 0.7, 0, 7); x.fill(); });
x.fillRect(cx - s * 0.8, cy + s * 0.2, s * 1.6, s * 0.22);
x.beginPath();
x.moveTo(cx - s * 0.2, cy + s * 0.4);
x.lineTo(cx, cy + s * 1.0);
x.lineTo(cx + s * 0.2, cy + s * 0.4);
x.fill();
}
}, 1);
},
function () { return poeNdCanvasTex("ndCheck", 256, 256, function (x, W, H) { for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
var dark = (i + j) % 2;
x.fillStyle = dark ? "#1A1A1E" : "#E8E4DA";
x.fillRect(i * W / 4, j * H / 4, W / 4, H / 4);
var R = wRand(i * 7 + j);
for (var v = 0; v < 40; v++) {
x.strokeStyle = dark ? "rgba(120,120,130,.25)" : "rgba(140,130,120,.22)";
x.lineWidth = 1;
x.beginPath();
var sx = i * W / 4 + R() * W / 4, sy = j * H / 4 + R() * H / 4;
x.moveTo(sx, sy);
x.lineTo(sx + (R() - 0.5) * 30, sy + (R() - 0.5) * 30);
x.stroke();
}
} }, 1); },
function (i) {
return poeNdCanvasTex("ndGrim" + i, 256, 256, function (x, W, H) {
var R = wRand(900 + i * 31);
x.fillStyle = "#120E0A";
x.fillRect(0, 0, W, H);
var q = i === 5, sk = q ? "#C8906A" : ["#E0B898", "#D8A888", "#C8987A", "#E8C8A8", "#D0A080"][i % 5];
x.fillStyle = sk;
x.beginPath();
x.ellipse(W / 2, H / 2, W * (q ? 0.42 : 0.34), H * (q ? 0.46 : 0.42), 0, 0, 7);
x.fill();
x.fillStyle = "rgba(0,0,0,.2)";
x.beginPath();
x.ellipse(W / 2 + W * 0.08, H / 2 + H * 0.06, W * 0.3, H * 0.38, 0, 0, 7);
x.fill();
if (q) {
x.fillStyle = "#A83A1A";
for (var h = 0; h < 26; h++) {
x.beginPath();
x.moveTo(W * (0.12 + h * 0.03), H * 0.16);
x.lineTo(W * (0.14 + h * 0.03), H * 0.02 + R() * H * 0.06);
x.lineTo(W * (0.16 + h * 0.03), H * 0.16);
x.fill();
}
x.fillStyle = "#B8805A";
x.beginPath();
x.arc(W * 0.36, H * 0.4, W * 0.11, 0, 7);
x.fill();
x.fillStyle = "#A83A1A";
x.fillRect(W * 0.56, H * 0.3, W * 0.16, H * 0.04);
x.fillStyle = "#F0E8D8";
x.beginPath();
x.ellipse(W * 0.64, H * 0.39, W * 0.05, H * 0.03, 0, 0, 7);
x.fill();
x.fillStyle = "#2A1A10";
x.beginPath();
x.arc(W * 0.64, H * 0.39, W * 0.02, 0, 7);
x.fill();
x.fillStyle = "#B07A5A";
x.beginPath();
x.moveTo(W * 0.5, H * 0.4);
x.lineTo(W * 0.4, H * 0.6);
x.lineTo(W * 0.6, H * 0.6);
x.fill();
x.fillStyle = "#3A0E0A";
x.beginPath();
x.moveTo(W * 0.26, H * 0.68);
x.quadraticCurveTo(W * 0.5, H * 0.95, W * 0.74, H * 0.68);
x.quadraticCurveTo(W * 0.5, H * 0.78, W * 0.26, H * 0.68);
x.fill();
x.fillStyle = "#E8E0C8";
[[0.36, 0.7], [0.44, 0.73], [0.56, 0.73]].forEach(function (t) { x.fillRect(W * t[0], H * t[1], W * 0.04, H * 0.04); });
x.beginPath();
x.moveTo(W * 0.62, H * 0.7);
x.lineTo(W * 0.66, H * 0.58);
x.lineTo(W * 0.69, H * 0.71);
x.fill();
return;
}
var ey = H * (0.38 + R() * 0.06);
x.fillStyle = "#F4EEE4";
[-1, 1].forEach(function (k) { x.beginPath(); x.ellipse(W / 2 + k * W * 0.13, ey + (k > 0 ? R() * 8 : 0), W * (0.06 + R() * 0.04), H * (0.02 + R() * 0.06), 0, 0, 7); x.fill(); x.fillStyle = "#1A120C"; x.beginPath(); x.arc(W / 2 + k * W * 0.13 + (R() - 0.5) * 10, ey - H * 0.03, W * 0.02, 0, 7); x.fill(); x.fillStyle = "#F4EEE4"; });
x.strokeStyle = "#3A2418";
x.lineWidth = 5;
[-1, 1].forEach(function (k) { x.beginPath(); x.moveTo(W / 2 + k * W * 0.05, ey - H * 0.09); x.lineTo(W / 2 + k * W * 0.22, ey - H * (0.06 + R() * 0.12)); x.stroke(); });
x.fillStyle = "#B8806A";
x.beginPath();
x.ellipse(W / 2, H * 0.52, W * 0.05, H * 0.09, 0, 0, 7);
x.fill();
x.fillStyle = "#3A0E0A";
var mw = W * (0.12 + R() * 0.18), mh = H * (0.04 + R() * 0.16);
x.beginPath();
x.ellipse(W / 2 + (R() - 0.5) * 20, H * 0.7, mw, mh, (R() - 0.5) * 0.6, 0, 7);
x.fill();
x.fillStyle = "#C82A2A";
if (R() < 0.6) {
x.beginPath();
x.ellipse(W / 2, H * 0.74, mw * 0.35, mh * 0.6, 0, 0, 7);
x.fill();
}
}, 1);
},
function (R, g) {
var lite = POE.lite, st = poeNdStone(0xFFFFFF, 0x3A3428), dk = poeNdStone(0xB0A898, 0x2A2620), oak = poeS("oak", 0x4A2A14), gold = poeShine(0xD8A848, 0.3, 0.85), L = -36, Rr = 36, Z = 14, seg = lite ? 10 : 18;
R.banner = function () { return "The great hall of the Palais, 6 January 1482"; };
R.start = { x: 0, z: -12.4, ry: 0 };
var A = poeGrp(g, 0, 0, 0);
function solid(x, z, w, d, h) { poeSolid(R.x + x, z, w, d, -1, h || 6); }
var fl = poePlane(A, 72, 28, new THREE.MeshLambertMaterial({ map: poeNdCheckTex() }), 0, 0, 0);
fl.geometry.attributes.uv.array.forEach(function (v, i, a) { a[i] = v * (i % 2 ? 7 : 18); });
poeFloor(R.x, 0, 72, 28, 0, true);
[-1, 1].forEach(function (s) {
var opens = [];
for (var w = 0; w < 7; w++) {
var wx = -27 + w * 9;
if (s < 0 && Math.abs(wx) < 1)
opens.push({ x: 0, w: 4.2, h: 6.4 });
opens.push({ x: wx + 4.5 < Rr ? wx + 4.5 : wx - 4.5, w: 3.0, y: 7.5, h: 7.5, r: 2.0 });
}
poeNdPut(A, poeNdWall(72, 20, 1.2, opens, st), 0, 0, s * Z, 0);
for (var w2 = 0; w2 < 7; w2++) {
var gx = -27 + w2 * 9 + 4.5;
if (gx >= Rr)
gx -= 9;
poeFace(A, 3.0, 10, poeNdGlassM(true, "lancet"), gx, 12.3, s * (Z - 0.65), s > 0 ? Math.PI : 0);
}
});
poeNdPut(A, poeNdWall(28, 20, 1.2, [], st), L, 0, 0, Math.PI / 2);
poeNdPut(A, poeNdWall(28, 20, 1.2, [{ x: 0, y: 12, c: 2.2 }], st), Rr, 0, 0, -Math.PI / 2);
poeBox(A, 4.0, 6.2, 0.3, poeS("oak", 0x3A2414), 0, 3.1, -Z - 0.2);
for (var p = 0; p < 7; p++) {
var px = -27 + p * 9;
poeCyl(A, 1.0, 1.15, 11, st, px, 5.5, 0, seg);
poeCyl(A, 1.35, 1.35, 0.6, dk, px, 0.3, 0, seg);
poeCyl(A, 1.3, 1.1, 0.8, dk, px, 11.2, 0, seg);
solid(px, 0, 2.4, 2.4, 12);
}
var vm = new THREE.MeshLambertMaterial({ map: poeNdVaultTex(), side: THREE.DoubleSide, emissive: 0x1A2A4A, emissiveIntensity: 0.5 });
[-1, 1].forEach(function (s) { var vg = new THREE.CylinderGeometry(7.6, 7.6, 72, lite ? 12 : 20, 1, true, 0, Math.PI); var uv = vg.attributes.uv.array; for (var i = 0; i < uv.length; i += 2) {
uv[i] *= 4;
uv[i + 1] *= 14;
} var v = new THREE.Mesh(vg, vm); v.rotation.z = Math.PI / 2; v.position.set(0, 11.6, s * 7); v.scale.set(1, 1, 0.92); A.add(v); });
for (var rb = 0; rb < 9; rb++) {
var rx = L + rb * 9;
[-1, 1].forEach(function (s) { var t = new THREE.Mesh(new THREE.TorusGeometry(7.0, 0.18, 5, seg, Math.PI), dk); t.position.set(rx, 11.6, s * 7); t.rotation.y = Math.PI / 2; A.add(t); });
}
var kings = poeGrp(g, 0, 0, 0), robes = [0x2A3A8A, 0x8A1A1A, 0x2A6A3A, 0x6A2A6A, 0xC89030], n = 0;
[-1, 1].forEach(function (s) {
for (var k = 0; k < (lite ? 8 : 16); k++) {
var kx = -33 + k * (lite ? 9.4 : 4.4), kz = s * (Z - 1.0);
if (Math.abs(kx) < 3)
continue;
var kg = poeGrp(kings, kx, 5.6, kz, s > 0 ? Math.PI : 0);
n++;
poeBox(kg, 1.0, 0.35, 0.7, dk, 0, -0.2, 0);
var cb = poeCone(kg, 0.5, 0.7, dk, 0, -0.72, 0);
cb.rotation.x = Math.PI;
ndKing(kg, 0, 0, 0.05, 0, robes[n % 5], robes[(n + 2) % 5], 1.05, lite);
}
});
poeNdMerge(kings);
poeBox(A, 4.4, 1.0, 15, poeShine(0xE8E2D8, 0.3, 0.25), L + 4, 0.5, 0);
solid(L + 4, 0, 4.6, 15.2, 1.0);
var stg = poeGrp(g, L + 4, 0, 0);
poeBox(stg, 5, 0.2, 13, poeS("oak", 0x6A4A2A), 0, 2.6, 0);
for (var sp = 0; sp < 4; sp++)
poeBox(stg, 0.2, 1.6, 0.2, oak, -2.2 + sp * 1.5, 1.8, -6.2);
var tap = poeFace(stg, 13, 1.6, poeNdCanvasTex ? poeNdTapM() : oak, 2.45, 1.8, 0, Math.PI / 2);
var lad = poeGrp(stg, 2.9, 0, 4.6);
[-0.25, 0.25].forEach(function (o) { var r = poeBox(lad, 0.06, 2.9, 0.06, oak, 0, 1.4, o); r.rotation.z = 0.3; });
for (var rg = 0; rg < 6; rg++)
poeBox(lad, 0.06, 0.04, 0.5, oak, -0.4 + rg * 0.13, 0.3 + rg * 0.42, 0);
R.stage = stg;
poeFloor(R.x + L + 4, 0, 5, 13, 2.7, true).off = true;
R.actors = [["Jupiter", "m15", 0xC8A040], ["Labour", "m15", 0x6A5A3A], ["Clergy", "canon15", 0xF0ECE2], ["Nobility", "rich15", 0x8A1A1A], ["Merchandise", "m15", 0x2A4A6A]].map(function (a, i) { var P = poeRoomPerson(R, "ndact" + i, L + 4.4, -4.8 + i * 2.4, Math.PI / 2, { role: a[1], sex: "m", look: { _seed: 300 + i, top: a[2] } }); P.g.position.y = 2.7; P.y = 2.7; P.actor = a[0]; return P; });
var ch = poeGrp(g, Rr - 3, 0, 0);
poeBox(ch, 2.0, 1.0, 3.0, poeS("marble", 0xD8D0C4), 0.6, 0.5, 0);
poeCandle(ch, 0.6, 1.05, -1.0, 0.3, true);
poeCandle(ch, 0.6, 1.05, 1.0, 0.3, true);
var vg2 = poeGrp(ch, 1.2, 1.05, 0, -Math.PI / 2);
poeCone(vg2, 0.4, 1.4, poeS("marble", 0xE8E2D8), 0, 0.7, 0);
poeSph(vg2, 0.14, poeS("marble", 0xE8E2D8), 0, 1.5, 0, 10);
var kn = poeGrp(ch, 0.0, 0, 1.6, -Math.PI / 2);
poeBox(kn, 0.5, 0.5, 0.9, poeS("marble", 0xD8D0C4), 0, 0.25, 0);
poeCyl(kn, 0.25, 0.35, 0.9, poeS("marble", 0xE0D8CC), 0, 0.95, 0, 8);
poeSph(kn, 0.15, poeS("marble", 0xE0D8CC), 0, 1.55, 0, 8);
poeBox(A, 0.4, 7, 10, dk, Rr - 6.2, 3.5, -5.5);
poeBox(A, 0.4, 7, 10, dk, Rr - 6.2, 3.5, 5.5);
poeBox(A, 0.4, 3, 1, dk, Rr - 6.2, 8.5, 0);
var rose = new THREE.Mesh(new THREE.CircleGeometry(1.15, lite ? 16 : 24), poeNdGlassM(true, "west"));
rose.position.set(Rr - 6.45, 8.1, 0);
rose.rotation.y = -Math.PI / 2;
A.add(rose);
var rr = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.12, 5, 24), dk);
rr.position.set(Rr - 6.4, 8.1, 0);
rr.rotation.y = Math.PI / 2;
A.add(rr);
var face = new THREE.Mesh(new THREE.CircleGeometry(0.62, 20), new THREE.MeshBasicMaterial({ map: poeNdGrimTex(0) }));
face.position.set(Rr - 6.6, 8.1, 0.25);
face.rotation.y = -Math.PI / 2;
face.visible = false;
g.add(face);
R.grim = face;
var platf = poeGrp(g, Rr - 5.4, 0, 0.3);
poeBox(platf, 1.4, 6.6, 1.4, poeS("oak", 0x5A3A1E), 0, 3.3, 0);
var tb = poeGrp(g, 0, 0, Z - 3);
poeBox(tb, 14, 0.3, 4.6, poeS("oak", 0x6A4A2A), 0, 2.4, 0);
poeBox(tb, 14, 1.1, 0.12, poeS("velvet", 0xC8A040), 0, 3.1, -2.25);
for (var tp = 0; tp < 5; tp++)
poeCyl(tb, 0.12, 0.14, 2.4, gold, -6.8 + tp * 3.4, 1.2, -2.2, 8);
poeBox(tb, 14, 6, 0.12, poeS("velvet", 0xA8781E), 0, 5.6, 2.3);
poeBox(tb, 14.4, 0.3, 5, gold, 0, 8.7, 0);
var st2 = poeGrp(tb, -7.6, 0, 0);
for (var s3 = 0; s3 < 8; s3++)
poeBox(st2, 1.0, 0.3, 0.6, oak, 0, 0.15 + s3 * 0.3, -1.6 + s3 * 0.45);
poeFloor(R.x, Z - 3, 14, 4.6, 2.55, true);
solid(0, Z - 5.4, 14, 0.3, 3.6);
[-1, 1].forEach(function (s) { solid(s * 7.15, Z - 3, 0.3, 4.6, 3.6); });
[-27, -18, -9, 0].forEach(function (px, i) { if (i === 0)
return; var sg = poeGrp(g, px, 0, 0); for (var q = 0; q < 4; q++) {
var a = q * Math.PI / 2 + Math.PI / 4, bx = Math.cos(a) * 2.2, bz = Math.sin(a) * 2.2, b = poeGrp(sg, bx, 0, bz, -a);
poeBox(b, 1.6, 0.9, 0.7, poeS("oak", 0x6A4A2A), 0, 0.45, 0);
for (var gi = 0; gi < 4; gi++)
poeBox(b, 0.25, 0.15, 0.25, poeC([0xC89048, 0xE8DCC0, 0x8A2A1A, 0x4A6A3A][(gi + q) % 4]), -0.5 + gi * 0.33, 0.97, 0);
} solid(px, 0, 5, 5, 1.2); });
[9, 18, 27].forEach(function (px) { [-1, 1].forEach(function (s) { poeBox(A, 4, 0.45, 0.5, oak, px, 0.22, s * 1.8); }); });
[[-24, 9, 0, 2.0, 40], [0, 9, 0, 2.0, 40], [24, 9, 0, 1.8, 40], [-31, 4, 0, 1.4, 18]].forEach(function (q, i) { if (lite && i === 3)
return; var Lt = poeLight(0xFFF0D8, q[3], q[4], q[0], q[1], q[2], g, i < 2); if (Lt && Lt.L)
Lt.L.decay = 1.1; });
poeNdCrowd(g, R, lite);
poeNdMerge(A);
poeSpot(R.x + 0, -Z + 1.6, 2.6, "The great door of the Palais", "go out", function () { poeOutside("out:nd_palais"); }, 0);
poeSpot(R.x + L + 7.5, 0, 3.2, "The marble table and the stage of the mystery", "look", function () { poeHook("ndStage"); }, 0);
poeSpot(R.x + Rr - 7.4, 0, 2.6, "The chapel of Louis XI and the little rose window", "look", function () { poeHook("ndRose"); }, 0);
poeSpot(R.x + 0, Z - 6.2, 3.0, "The gilded tribune of the ambassadors", "look", function () { poeHook("ndTribune"); }, 0);
},
function () {
var k = "ndTap";
if (POE.mats[k])
return POE.mats[k];
var t = poeNdCanvasTex("ndTapT", 512, 64, function (x, W, H) { x.fillStyle = "#6A1A1A"; x.fillRect(0, 0, W, H); var R = wRand(55); for (var i = 0; i < 30; i++) {
x.fillStyle = ["#C8A040", "#2A4A2A", "#E8D8B0", "#1A2A5A"][i % 4];
x.beginPath();
x.ellipse(R() * W, R() * H, 6 + R() * 14, 4 + R() * 10, R() * 3, 0, 7);
x.fill();
} x.strokeStyle = "#C8A040"; x.lineWidth = 3; x.strokeRect(2, 2, W - 4, H - 4); }, 1);
return (POE.mats[k] = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }));
},
function (g, R, lite) {
var spots = [], Rn = wRand(1482), N = lite ? 14 : 40;
for (var i = 0; i < N * 6 && spots.length < N; i++) {
var x = -24 + Rn() * 48, z = -11 + Rn() * 22;
if (Math.abs(z) < 2.2 && Math.abs((x + 27) % 9) < 2.2)
continue;
if (Math.abs(x) < 2.5 && z < -9)
continue;
if (z > 8.5 && Math.abs(x) < 8)
continue;
if (Math.abs(x) < 4 && Math.abs(z) < 3)
continue;
if (spots.some(function (q) { return Math.hypot(q[0] - x, q[1] - z) < 1.2; }))
continue;
spots.push([x, z, Math.atan2(-(-30 - x), -(0 - z)) + (Rn() - 0.5) * 0.6]);
}
R.crowd = spots;
R.crowdP = spots.map(function (s, i) {
var D = ND_CROWD_ROLES[i % ND_CROWD_ROLES.length], talk = i % 4 === 0 ? poeNdTalk(D[2], "Talks about " + D[3] + ".") : null;
var P = poeRoomPerson(R, "ndh" + i, s[0], s[1], s[2], { role: D[0], sex: D[1], r: 2.2, look: { _seed: 1500 + i }, talk: talk });
P.g.position.y = 0;
P.y = 0;
return P;
});
},
function (R, g) {
var lite = POE.lite;
R.banner = function () { return "La Esmeralda's little room, the Cour des Miracles"; };
R.start = { x: 0, z: 1.6, ry: 0 };
var A = poeGrp(g, 0, 0, 0);
poePlane(A, 6, 5, poeS("boards", 0x6A4A2A), 0, 0, 0);
poeFloor(R.x, 0, 6, 5, 0, true);
[[0, -2.5, 0], [0, 2.5, Math.PI], [-3, 0, Math.PI / 2], [3, 0, -Math.PI / 2]].forEach(function (w, i) { poeFace(A, i < 2 ? 6 : 5, 3, poeS("rough", 0x8A7A64), w[0], 1.5, w[1], w[2]); });
var ce = poePlane(A, 6, 5, poeS("boards", 0x4A3A28), 0, 3, 0);
ce.rotation.x = Math.PI;
poeBox(A, 1.2, 0.75, 0.8, poeS("oak", 0x5A3A1E), -1.6, 0.37, -1.6);
poeBox(A, 1.6, 0.5, 0.9, poeS("oak", 0x4A2A14), 1.8, 0.25, -1.6);
poeBox(A, 1.5, 0.15, 0.85, poeS("cloth", 0x8A2A2A), 1.8, 0.55, -1.6);
poeBox(A, 0.9, 0.5, 0.6, poeS("oak", 0x5A3A1E), -2.2, 0.25, 1.6);
poeBox(A, 0.12, 0.12, 0.12, poeC(0x3A2A1A), -1.6, 0.8, -1.6);
poeCandle(A, -1.6, 0.86, -1.6, 0.25, true);
[0xC8A040, 0x8A2A1A].forEach(function (c, i) { poeBox(A, 0.5, 0.05, 0.4, poeS("cloth", c), -1.9 + i * 0.6, 0.77, -1.4); });
poeLight(0xFFC080, 2.2, 10, -1.6, 1.6, -1.4, g, true);
poeLight(0xE8A060, 0.9, 8, 1.2, 2.4, 1.2, g);
poeRug(A, 0, 0, 3.4, 2.4, 0x8A2A1A);
var hg = poeGrp(A, 1.8, 0, -2.47);
poeBox(hg, 1.8, 0.05, 0.05, poeC(0x3A2A1A), 0, 2.45, 0.04);
poeFace(hg, 1.7, 1.4, poeS("carpet", 0xC8402A), 0, 1.75, 0.03, 0);
var tb = poeGrp(A, -0.6, 1.7, -2.46);
var rim = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.06, 18, 1, true), poeS("oak", 0x8A5A2A));
rim.material.side = THREE.DoubleSide;
rim.rotation.x = Math.PI / 2;
tb.add(rim);
poeFace(tb, 0.36, 0.36, poeC(0xD8C8A0), 0, 0, 0.0, 0);
for (var j = 0; j < 5; j++) {
var aj = j / 5 * Math.PI * 2;
poeCyl(tb, 0.03, 0.03, 0.01, poeShine(0xD8B040, 0.3, 0.9), Math.cos(aj) * 0.2, Math.sin(aj) * 0.2, 0.03, 8).rotation.x = Math.PI / 2;
}
if (typeof poeParBasket === "function")
poeParBasket(A, -2.3, -1.9);
poeCyl(A, 0.1, 0.08, 0.3, poeS("earth", 0x9A5A3A), -2.5, 0.15, 1.0, 10);
poeBox(A, 0.4, 0.03, 0.3, poeS("cloth", 0xC8961E), -2.2, 0.53, 1.6);
R.goat = poeNdGoat(A, 1.6, -0.6, 0.4);
poeSpot(R.x + 0, 2.0, 1.6, "The door, to the Cour des Miracles", "go out", function () { var C = ND_AT.miraclesClear; poeOutside(null, { x: POE_RX.x_paris.x + C[0] + 6, z: C[1] + 6.5, ry: 0, par: 1 }); }, 0);
},
function (f) {
ndWarm(1);
POE.ndTime = "day";
poeNdTime("day");
POE.ndShow = {};
var R = poeRoomGet("x_ndhall");
poeCast("gringoire", "x_ndhall", -18.6, -2.6, -Math.PI / 2, { name: "Pierre Gringoire", role: "m15", sex: "m", look: { _seed: 1471, hair: 0xD8B878, top: 0x1A1A1E, bottom: 0x1A1A1E }, talk: poeNdTalk("Pierre Gringoire") });
poeCast("jehan", "x_ndhall", -9, 2.4, -Math.PI / 2, { name: "Jehan Frollo du Moulin", role: "student", sex: "m", look: { _seed: 1472, hair: 0xC89848, top: 0x3A1A1A }, talk: poeNdTalk("Jehan Frollo du Moulin") });
var cp = poeCast("coppenole", "x_ndhall", -2, 10.8, Math.PI, { name: "Master Jacques Coppenole", role: "fleming", sex: "m", r: 5, look: { _seed: 1473, hair: 0x5A4A3A, beard: "short", top: 0x3A2A1A }, talk: poeNdTalk("Master Jacques Coppenole") });
cp.g.position.y = 2.55;
cp.y = 2.55;
var cd = poeCast("cardinal", "x_ndhall", 2, 11.4, Math.PI, { name: "Monsieur the Cardinal", role: "cardinal", sex: "m", look: { _seed: 1474, hair: 0x9A9A9A }, talk: poeNdTalk("Monsieur the Cardinal de Bourbon") });
cd.g.position.y = 2.55;
cd.y = 2.55;
var rym = poeCast("rym", "x_ndhall", 4.4, 11.0, Math.PI, { name: "Guillaume Rym", role: "fleming", sex: "m", look: { _seed: 1475, hair: 0x3A3A3A }, talk: poeNdTalk("Guillaume Rym, pensioner of Ghent") });
rym.g.position.y = 2.55;
rym.y = 2.55;
var Q = poeNdQuasi("x_ndhall", "quasi", 27.4, 1.6, -Math.PI / 2, { tiara: true });
poeHide(Q);
},
function () { var E = POE.cast.esme, p = ND_ESME_WALK[ND_ESME_WALK.length - 1]; var Q = POE.cast.quasi; if (Q) {
poeMove(Q, "x_paris", p[0] + 1.2, p[1] - 1, Math.PI);
Q.g.visible = true;
} var F = POE.cast.frollo; if (F) {
poeMove(F, "x_paris", p[0] - 1.4, p[1] - 0.6, Math.PI);
F.g.visible = true;
} var Ph = POE.cast.phoebus; if (Ph) {
poeMove(Ph, "x_paris", p[0] + 0.6, p[1] + 3.2, Math.PI);
Ph.g.visible = true;
} poeSfx("shriek"); },
function (f) {
ndWarm(2);
poeNdTime("dusk");
POE.ndShow = { fire: 1 };
var n = ND_AT.palaisN;
ndGoPar(ND_AT.palais[0] + 0.5 + n[0] * 2.4, ND_AT.palais[1] + 0.5, -Math.PI / 2);
var E = poeCast("esme", "x_paris", 1169.5, -2212.5, 0.4, { name: "La Esmeralda", role: "gypsy", sex: "f", look: { _seed: 1466, hair: 0x1A1210, hairStyle: "long", skin: 0xD8A880, top: 0xC8961E, bottom: 0xB8202A }, talk: poeNdTalk("La Esmeralda") });
ndDance(E, true);
var R = POE_RX.x_paris;
ndGoatAt(R, 1171.2, -2213.8, -0.6);
poeCast("frollo", "x_paris", 1163.5, -2218.6, -2.6, { name: "Dom Claude Frollo", role: "priest15", sex: "m", look: { _seed: 1446, hair: 0x3A3028, _cowl: 1 }, talk: poeNdTalk("Dom Claude Frollo") });
poeHide(POE.cast.frollo);
var Q = poeNdQuasi("x_paris", "quasi", 1162, -2220, 0.5, { tiara: true });
poeHide(Q);
poeCast("phoebus", "x_paris", 1180, -2540, Math.PI, { name: "Captain Phoebus de Châteaupers", role: "archer", sex: "m", look: { _seed: 1460, hair: 0xC8A048, top: 0x8A1A1A }, talk: poeNdTalk("Captain Phoebus de Châteaupers") });
poeHide(POE.cast.phoebus);
var C = ND_AT.miraclesClear;
poeCast("clopin", "x_paris", C[0] + 9, C[1] - 3.8, Math.PI * 0.9, { name: "Clopin Trouillefou", role: "truand", sex: "m", look: { _seed: 1461, hair: 0x3A2A1A, beard: "full", top: 0x6A4A2A }, talk: poeNdTalk("Clopin Trouillefou") });
[["A truand of the Cour", "the truands, the argot, the King of Thunes, what happens to bourgeois who wander in here"], ["The Duke of Egypt", "the Egyptians (gypsies), their wanderings from Bohemia and Egypt, la Esmeralda whom they protect"], ["Mathias Hungadi Spicali", "the Galileans and the Hungarians, the Emperor of Galilee he is, the rules of the beggars' trade"], ["A vagabond woman", "the Cour des Miracles, her children, the gypsy girl, the watch who never come here"]].forEach(function (T, i) { var a = i / 4 * Math.PI * 2; poeCast("cour" + i, "x_paris", C[0] + Math.cos(a) * 6 - 2, C[1] + Math.sin(a) * 4, a + Math.PI, { name: T[0], role: i === 3 ? "wife15" : "truand", sex: i === 3 ? "f" : "m", look: { _seed: 1490 + i, beard: i === 1 ? "full" : 0 }, talk: poeNdTalk(T[0], "Talks about " + T[1] + ".") }); });
poeSpotOnce("nd:rat", R.x + ND_AT.ratHole[0] + 1.4, ND_AT.ratHole[1], 2, "The Rat-Hole", "look in at the grating", function () { poeHook("ndRat"); }, 0);
},
function () { poeCard("The rood screen and the old altar", ndP(3, "And who substituted for the ancient gothic altar", 1) + poeNote("Here, in 1482, the screen still closes the choir, its arches carved with the Passion and painted; behind it, the old altar with its gilded retable, its four posts and curtains, and the shrine of Saint Marcel raised high behind.")); },
function (R, g, o) {
var w = R.w, d = R.d, h = R.h, A = poeGrp(g, 0, 0, 0), wm = o.wall || poeS("stone", 0xA8A090), fm = o.floor || poeS("tiles", 0x8A6A4A);
poePlane(A, w, d, fm, 0, 0, 0);
poeFloor(R.x, 0, w, d, 0, true);
[[0, -d / 2, 0, w], [0, d / 2, Math.PI, w], [-w / 2, 0, Math.PI / 2, d], [w / 2, 0, -Math.PI / 2, d]].forEach(function (q) { poeFace(A, q[3], h, wm, q[0], h / 2, q[1], q[2]); });
if (o.ceil === "vault") {
var vm = poeDS(poeS("vault", 0x9A9284)), v = new THREE.Mesh(new THREE.CylinderGeometry(w / 2, w / 2, d, 16, 1, true, 0, Math.PI), vm);
v.rotation.z = Math.PI / 2;
v.rotation.y = Math.PI / 2;
v.position.set(0, h - w / 2 * 0.35, 0);
v.scale.set(0.35, 1, 1);
A.add(v);
poeFace(A, w, h, wm, 0, h / 2, -d / 2 + 0.01, 0);
}
else {
var cm = poePlane(A, w, d, o.ceilM || poeS("boards", 0x4A3424), 0, h, 0);
cm.rotation.x = Math.PI;
}
if (o.ceil === "beams")
for (var b = 0; b < Math.floor(w / 1.6); b++)
poeBox(A, 0.26, 0.28, d, poeS("oak", 0x3A2414), -w / 2 + 0.8 + b * 1.6, h - 0.14, 0);
return A;
},
function (P, x, y, z, r, col) {
var g = poeGrp(P, x, y, z), br = poeShine(col || 0x8A6A3A, 0.38, 0.85), pts = [[0, 1.38], [0.42, 1.36], [0.5, 1.3], [0.52, 1.18], [0.55, 0.9], [0.62, 0.55], [0.78, 0.25], [0.95, 0.06], [1.0, 0.0], [0.92, 0.0], [0.86, 0.08], [0.7, 0.28], [0.54, 0.6], [0.47, 0.95], [0.44, 1.2], [0, 1.25]].map(function (p) { return new THREE.Vector2(p[0] * r, p[1] * r); });
var b = new THREE.Mesh(new THREE.LatheGeometry(pts, POE.lite ? 16 : 28), br);
b.position.y = -1.38 * r;
g.add(b);
poeBox(g, 0.28 * r, 0.3 * r, 0.6 * r, poeShine(0x3A2A1A, 0.5, 0.7), 0, 0.1 * r, 0);
var cl = poeGrp(g, 0, -0.15 * r, 0);
poeCyl(cl, 0.04 * r, 0.05 * r, 1.0 * r, poeShine(0x2A2A2A, 0.5, 0.8), 0, -0.5 * r, 0, 8);
poeSph(cl, 0.13 * r, poeShine(0x2A2A2A, 0.5, 0.8), 0, -1.05 * r, 0, 10);
g.userData.clapper = cl;
return g;
},
function (R, g) {
var lite = POE.lite, oak = poeS("oak", 0x5A4028), dk = poeS("oak", 0x3A2818);
R.banner = function () { return "The belfry of the south tower, Notre-Dame, 1482"; };
R.start = { x: -4.4, z: 4.4, ry: Math.PI * 0.75 };
ndShell(R, g, { wall: poeS("stone", 0x9A9284), floor: poeS("boards", 0x6A5034), ceil: "beams", ceilM: poeS("boards", 0x3A2A1A) });
[[0, -6, 0], [0, 6, Math.PI], [-6, 0, Math.PI / 2], [6, 0, -Math.PI / 2]].forEach(function (q, i) {
var w = poeGrp(g, q[0], 0, q[1], q[2]);
poeFace(w, 2.4, 8.6, poeGlowM(0xDCE4EC, 0.85), 0, 8.2, 0.03, 0);
for (var s = 0; s < (lite ? 6 : 12); s++) {
var sl = poeBox(w, 2.5, 0.06, 0.5, poeS("slate", 0x5A5E66), 0, 4.3 + s * (lite ? 1.4 : 0.7), 0.22);
sl.rotation.x = 0.65;
}
poeBox(w, 0.3, 8.8, 0.4, poeS("stone", 0x8A8274), -1.35, 8.2, 0.1);
poeBox(w, 0.3, 8.8, 0.4, poeS("stone", 0x8A8274), 1.35, 8.2, 0.1);
});
poeLight(0xE8ECF4, 1.3, 26, 0, 9, 0, g, true);
poeLight(0xE8ECF4, 1.1, 16, -3, 3.5, 3, g, true);
poeLight(0xFFE0B0, 0.8, 14, 3, 3, -3, g);
var F = poeGrp(g, 0, 0, 0);
[[-3.4, -3.4], [3.4, -3.4], [-3.4, 3.4], [3.4, 3.4], [-3.4, 0], [3.4, 0]].forEach(function (p) { poeBox(F, 0.45, 11.5, 0.45, dk, p[0], 5.75, p[1]); });
[-3.4, 3.4].forEach(function (z) { poeBox(F, 7.4, 0.5, 0.5, dk, 0, 11.2, z); poeBox(F, 7.4, 0.4, 0.4, oak, 0, 3, z); var br1 = poeBox(F, 0.25, 4.2, 0.25, oak, -2, 9, z); br1.rotation.z = 0.7; var br2 = poeBox(F, 0.25, 4.2, 0.25, oak, 2, 9, z); br2.rotation.z = -0.7; });
[-3.4, 0, 3.4].forEach(function (x) { poeBox(F, 0.5, 0.5, 7.4, dk, x, 11.2, 0); });
var piv = poeGrp(g, 0, 10.6, -1.4);
R.marie = piv;
var M = ndBell(piv, 0, 0, 0, 2.1, 0x8A6A34);
R.marieBell = M;
poeBox(piv, 4.4, 0.6, 0.6, dk, 0, 0.35, 0);
var wh = poeGrp(piv, 3.0, 0.3, 0);
var rim = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.08, 6, lite ? 16 : 28), oak);
rim.rotation.y = Math.PI / 2;
wh.add(rim);
for (var sp = 0; sp < 6; sp++) {
var spk = poeBox(wh, 0.08, 2.8, 0.08, oak, 0, 0, 0);
spk.rotation.x = sp / 6 * Math.PI;
}
poeCyl(g, 0.03, 0.03, 9, poeC(0xA89878), 3.0, 5.2, -0.1, 6);
poeCyl(g, 0.03, 0.03, 9, poeC(0xA89878), 3.0, 5.2, -2.7, 6);
var jq = poeGrp(g, -1.6, 9.4, 3.0);
ndBell(jq, 0, 0, 0, 1.15, 0x7A6234);
R.jacq = jq;
poeSolid(R.x + 0, -1.4, 4.6, 4.6, 0, 9);
poeSolid(R.x - 1.6, 3.0, 2.6, 2.6, 0, 9);
poeBox(g, 3, 0.12, 1.6, oak, 0, 4.6, 1.6);
for (var r = 0; r < 8; r++)
poeBox(g, 0.9, 0.06, 0.06, oak, -1.2, 0.5 + r * 0.55, 2.4);
poeBox(g, 0.06, 4.6, 0.06, oak, -1.65, 2.3, 2.4);
poeBox(g, 0.06, 4.6, 0.06, oak, -0.75, 2.3, 2.4);
poeBox(g, 1.4, 0.04, 1.4, poeC(0x1A1410), 4.0, 0.02, -3.8);
poeSpot(R.x + 0, 1.4, 2.6, "Big Marie, the great bell", "lay your hand on her", function () { poeHook("ndMarie"); }, 0);
poeSpot(R.x - 4.6, 4.6, 1.6, "The stair, down the tower", "go down", function () { poeEnterRoom("x_nd", "nd:belfry", { x: -46, z: -8.2, ry: Math.PI }); }, 0);
},
function (R, g) {
var lite = POE.lite;
R.banner = function () { return "Dom Claude Frollo's cell, the cloister of Notre-Dame"; };
R.start = { x: 2.6, z: 2.0, ry: -Math.PI * 0.25 };
var A = ndShell(R, g, { wall: poeS("plaster", 0xC8BCA4), floor: poeS("tiles", 0x8A5A3A), ceil: "beams" });
poeBookcase(A, -2.6, -2.75, 2.6, 3.2, 0);
poeBookcase(A, 1.2, -2.75, 2.6, 3.2, 0);
poeBookcase(A, -3.75, 0.4, 2.4, 3.2, Math.PI / 2);
for (var b = 0; b < (lite ? 2 : 5); b++)
poeParBooks(A, -1.4 + b * 0.5, 0.8, -0.4, 6, b * 0.6);
var dk = poeDesk(A, -1.0, -0.4, 0);
poeArmchair(A, -1.0, 0.5, Math.PI, 0x5A1A1A);
poeLamp(A, -1.5, 0.78, -0.5);
poeLight(0xFFC070, 1.5, 9, -1.5, 1.4, -0.5, g, true);
poeCandle(A, -0.4, 0.78, -0.6, 0.2, true);
poeBox(A, 0.5, 0.03, 0.36, poeC(0xE8DCBE), -0.9, 0.79, -0.35);
poeBox(A, 0.42, 0.05, 0.3, poeC(0x5A2A1A), -0.3, 0.8, -0.2);
poeTable(A, 2.4, -1.8, 1.6, 0.8, 0.8, 0);
[0x1A3A1A, 0x3A1A10, 0xC8C0A8].forEach(function (c, i) { poeBottle(A, 1.9 + i * 0.35, 0.8, -1.9, c); });
poeSph(A, 0.12, poeShine(0xA8B8C0, 0.05, 0.1), 2.9, 0.95, -1.8, 10);
poeSph(A, 0.1, poeC(0xE8E0D0), 2.4, 0.9, -1.6, 8);
poeChair(A, 2.8, 1.4, Math.PI * 1.2, 0x3A2A1A);
poeChair(A, 1.8, 1.6, Math.PI * 0.9, 0x3A2A1A);
ndWords(A, ["MEDICINE IS THE DAUGHTER OF DREAMS.", "— JAMBLICUS"], 2.4, 2.9, 2.98, Math.PI, 2.6, 0.6);
ndWords(A, ["ΑΝΑΓΚΗ"], 3.98, 2.4, -1.0, -Math.PI / 2, 0.9, 0.3, "#B8AC94", "#4A1A10");
var win = poeGrp(A, 3.98, 0, 0.9, -Math.PI / 2);
poeFace(win, 1.5, 2.2, poeGlowM(0x4A5878, 1), 0, 1.9, 0.01, 0);
var nd = poeGrp(win, 0, 0.9, 0.02);
poeBox(nd, 0.5, 1.5, 0.01, poeC(0x14161C), -0.42, 0.75, 0);
poeBox(nd, 0.5, 1.5, 0.01, poeC(0x14161C), 0.42, 0.75, 0);
poeBox(nd, 1.34, 0.9, 0.01, poeC(0x14161C), 0, 0.45, 0);
poeSph(nd, 0.16, poeGlowM(0x6A6A8A, 1), 0, 0.55, 0.012, 10);
poeBox(win, 1.7, 0.12, 0.2, poeS("stone", 0x9A9488), 0, 0.8, 0.05);
poeBox(win, 0.1, 2.3, 0.1, poeC(0x2A1A10), 0, 1.9, 0.03);
poeSpot(R.x + 3.4, 0.9, 1.4, "The window, toward Notre-Dame", "look out", function () { poeHook("ndWindow"); }, 0);
poeSpot(R.x + 2.4, 2.4, 1.4, "The words over the guest's chair", "read", function () { poeHook("ndInscr"); }, 0);
poeSpot(R.x - 3.0, 2.4, 1.4, "The door, to the cloister", "go out", function () { var p = poeNdTopAt(20, 22); poeOutside(null, { x: POE_RX.x_paris.x + p[0], z: p[1], ry: 0, par: 1 }); }, 0);
},
function (R, g) {
var lite = POE.lite;
R.banner = function () { return POE.ndCourt || "The audience hall of the Châtelet, 1482"; };
R.start = { x: 0, z: 4.2, ry: 0 };
var A = ndShell(R, g, { wall: poeS("stone", 0x8A8274), floor: poeS("tiles", 0x6A4A3A), ceil: "vault" });
poeBox(A, 15, 0.35, 3.2, poeS("oak", 0x4A3020), 0, 0.17, -3.4);
var tb = poeBox(A, 6, 0.85, 1.2, poeS("flags", 0x2A3A8A), 0, 0.78, -3.0);
poeArmchair(A, 0, -3.9, 0, 0x2A3A8A, 0.35);
var bk = poeBox(A, 1.3, 2.6, 0.2, poeS("oak", 0x3A2414), 0, 1.9, -4.4);
poeArmchair(A, -1.8, -3.9, 0, 0x3A3A3A, 0.35);
poeArmchair(A, 1.8, -3.9, 0, 0x3A3A3A, 0.35);
ndWords(A, ["⚜ ⚜ ⚜"], 0, 3.4, -4.97, 0, 3.2, 0.6, "#2A3A8A", "#E8C860");
poeTable(A, -4.2, -1.2, 2.4, 1.0, 0.78, 0);
poeChair(A, -4.2, -0.4, Math.PI, 0x2A2A2A);
poeChair(A, -5.2, -0.4, Math.PI, 0x2A2A2A);
for (var p = 0; p < 4; p++)
poeBox(A, 0.3, 0.02, 0.4, poeC(0xE8DCBE), -5 + p * 0.5, 0.79, -1.2);
poeBox(A, 13, 0.9, 0.08, poeS("oak", 0x3A2414), 0, 0.45, 1.6);
for (var b = 0; b < 14; b++)
poeBox(A, 0.07, 0.9, 0.07, poeS("oak", 0x3A2414), -6.3 + b, 0.45, 1.6);
poeSolid(R.x + 0, 1.6, 13, 0.3, 0, 1.2);
poeSolid(R.x + 0, -3.0, 6.2, 1.4, 0, 1.2);
for (var l = 0; l < 3; l++)
poeCandelabrum(A, -4 + l * 4, 0.0, -4.6, 2.2, !lite && l === 1);
poeLight(0xFFC890, 1.5, 14, 0, 3.4, -2, g, true);
poeLight(0xFFC890, 0.9, 12, 0, 3.4, 3, g, true);
R.crowdP = [];
var n = lite ? 5 : 12;
for (var i = 0; i < n; i++) {
var D = ND_CROWD_ROLES[i % ND_CROWD_ROLES.length];
var P = poeRoomPerson(R, "ndc" + i, -6 + (i % 6) * 2.3 + (i > 5 ? 1 : 0), 2.6 + (i > 5 ? 1.4 : 0), Math.PI, { role: D[0], sex: D[1], look: { _seed: 1600 + i } });
R.crowdP.push(P);
}
poeSpot(R.x + 0, 4.4, 1.6, "The door of the hall", "go out", function () { if (POE.ndCourtExit)
POE.ndCourtExit();
else {
var G = ND_AT.greve;
ndGoPar(G[0] - 38, G[1] + 4, -Math.PI / 2);
} }, 0);
},
function (R, g) {
var lite = POE.lite;
R.banner = function () { return "The archdeacon's cell, the north tower, Notre-Dame"; };
R.start = { x: 2.6, z: 2.6, ry: -Math.PI * 0.75 };
var A = ndShell(R, g, { wall: poeS("rough", 0x8A8070), floor: poeS("tiles", 0x5A4232), ceil: "vault" });
var lines = [["ΑΝΑΓΚΗ"], ["ὕλη · ὑλή"], ["SOL · LUNA · MERCURIUS"], ["Mensis · Annus · Dies"], ["Jehova"], ["Amor · Ignis · Aqua"], ["ἀνάγκη"], ["Hermes · Trismegistus"]];
lines.forEach(function (L, i) { var side = i % 4, a = [0, Math.PI, Math.PI / 2, -Math.PI / 2][side], px = [0, 0, -3.48, 3.48][side], pz = [-3.48, 3.48, 0, 0][side], o = (i < 4 ? -1.6 : 1.4); ndWords(A, L, side < 2 ? o : px, 1.6 + (i % 3) * 0.8, side < 2 ? pz : o, a, 1.6, 0.34, "#7A7064", i === 0 ? "#5A0A0A" : "#1A1410"); });
var fu = poeGrp(A, -2.6, 0, -2.6);
poeBox(fu, 1.4, 1.0, 1.2, poeS("brick", 0x6A3A2A), 0, 0.5, 0);
poeCone(fu, 0.7, 1.4, poeS("brick", 0x5A2A1A), 0, 1.7, 0);
poeCyl(fu, 0.18, 0.18, 1.6, poeS("brick", 0x5A2A1A), 0, 3.1, 0, 8);
poeFace(fu, 0.5, 0.4, poeGlowM(0x5A1A08, 1), 0, 0.45, 0.61, 0);
poeDesk(A, 1.6, -2.8, 0);
poeSph(A, 0.12, poeC(0xD8CCB0), 1.2, 0.92, -2.7, 8);
poeLamp(A, 2.0, 0.78, -2.8);
poeLight(0xFFB060, 1.7, 9, 2.0, 1.4, -2.8, g, true);
poeLight(0xB8C8E0, 1.1, 9, 1.6, 2.4, -2.4, g, true);
poeLight(0xFF8A40, 0.9, 7, -2.4, 1.0, -1.8, g);
for (var c = 0; c < (lite ? 3 : 7); c++)
poeBottle(A, -0.6 + c * 0.28, 0.0, -3.2, [0x2A4A2A, 0x5A1A10, 0x1A2A4A][c % 3], c % 4 === 3);
poeTable(A, -2.6, 1.6, 1.4, 0.8, 0.8, Math.PI / 2);
poeSph(A, 0.16, poeShine(0xB0C0C8, 0.05, 0.1), -2.6, 1.0, 1.4, 10);
poeCyl(A, 0.03, 0.03, 0.5, poeShine(0xB0C0C8, 0.05, 0.1), -2.6, 1.2, 1.75, 6);
poeArmchair(A, 1.0, -1.6, Math.PI, 0x2A1A1A);
poeBookcase(A, 3.25, 0, 2.2, 2.6, -Math.PI / 2);
var w = poeGrp(A, 0, 0, -3.47, 0);
poeFace(w, 1.0, 1.6, poeGlowM(0x8AA0B8, 1), 1.6, 2.4, 0.01, 0);
var web = wSign([" "], 0.6, 0.6, "rgba(0,0,0,0)", "#DDD");
web.position.set(1.85, 2.95, 0.04);
w.add(web);
var wc = document.createElement("canvas");
wc.width = wc.height = 128;
var x = wc.getContext("2d");
x.strokeStyle = "rgba(230,230,230,.8)";
x.lineWidth = 1;
for (var s = 0; s < 10; s++) {
var a = s / 10 * Math.PI * 2;
x.beginPath();
x.moveTo(64, 64);
x.lineTo(64 + Math.cos(a) * 64, 64 + Math.sin(a) * 64);
x.stroke();
}
for (var rr = 8; rr < 64; rr += 8) {
x.beginPath();
for (var s2 = 0; s2 <= 10; s2++) {
var a2 = s2 / 10 * Math.PI * 2;
x.lineTo(64 + Math.cos(a2) * rr, 64 + Math.sin(a2) * rr);
}
x.stroke();
}
x.fillStyle = "#111";
x.beginPath();
x.arc(64, 64, 5, 0, 7);
x.fill();
x.beginPath();
x.arc(86, 48, 3, 0, 7);
x.fill();
var wt = new THREE.CanvasTexture(wc);
var wm = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.7), new THREE.MeshBasicMaterial({ map: wt, transparent: true, depthWrite: false }));
wm.position.set(1.85, 2.95, 0.05);
w.add(wm);
w.remove(web);
poeSpot(R.x + 1.6, -2.9, 1.4, "The spider's web at the window", "look", function () { poeHook("ndSpider"); }, 0);
poeSpot(R.x - 2.6, -1.6, 1.6, "The furnace of the archdeacon", "look", function () { poeHook("ndFurnace"); }, 0);
poeSpot(R.x + 0, -3.0, 1.2, "The word on the wall", "read", function () { poeHook("ndWordCell"); }, 0);
poeSpot(R.x + 2.8, 3.0, 1.4, "The door, to the stair", "go down", function () { poeEnterRoom("x_nd", "nd:cell", { x: -46, z: -8.2, ry: Math.PI }); }, 0);
},
function (R, g) {
var lite = POE.lite;
R.banner = function () { return "The Gondelaurier house, the parvis of Notre-Dame"; };
R.start = { x: -3.6, z: 2.6, ry: -Math.PI * 0.6 };
var A = ndShell(R, g, { wall: poeS("tapestry", 0xFFFFFF), floor: poeS("tiles", 0x8A4A3A), ceil: "beams", ceilM: poeS("panel", 0x6A4A2A) });
var fr = poeGrp(A, -1, 0, -1.2);
poeBox(fr, 3.4, 0.08, 1.4, poeS("oak", 0x5A3A1A), 0, 0.75, 0);
var tp = poePlane(fr, 3.2, 1.2, poeS("tapestry", 0xFFFFFF), 0, 0.8, 0);
[[-1.7, -0.7], [1.7, -0.7], [-1.7, 0.7], [1.7, 0.7]].forEach(function (p) { poeBox(fr, 0.08, 0.75, 0.08, poeS("oak", 0x5A3A1A), p[0], 0.37, p[1]); });
[-1.9, -0.1].forEach(function (x, i) { [-2.1, -0.3].forEach(function (z, j) { ndForm(A, x, z, 1.5, [0x8A2A3A, 0x2A4A8A, 0x6A2A6A, 0x2A6A4A][i * 2 + j]); }); });
poeRug(A, -1, -1.2, 4.6, 3.0, 0x8A3A2A);
poeRug(A, 2.6, 1.0, 2.4, 1.8, 0x2A3A6A);
[[-2.6, -3.96, 0], [2.6, -3.96, 0], [-5.46, 0.4, Math.PI / 2]].forEach(function (h, i) { var hg = poeGrp(A, h[0], 0, h[1], h[2]); poeBox(hg, 2.4, 0.06, 0.06, poeS("oak", 0x3A2414), 0, 3.3, 0.06); poeFace(hg, 2.2, 2.2, poeS("tapestry", [0xE8D8C0, 0xD8C8B0, 0xF0E0C8][i]), 0, 2.15, 0.04, 0); });
if (typeof poeParSideboard === "function")
poeParSideboard(A, -4.8, 1.6, Math.PI / 2, 1);
var cc = poeGrp(A, -1, 3.5, -1.2);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.03, 6, 24), poeShine(0x2A2A2A, 0.6, 0.7));
ring.rotation.x = Math.PI / 2;
cc.add(ring);
for (var cn = 0; cn < 8; cn++) {
var aa = cn / 8 * Math.PI * 2;
poeCandle(cc, Math.cos(aa) * 0.6, 0.02, Math.sin(aa) * 0.6, 0.18, !lite && cn % 2 === 0);
}
for (var ch = 0; ch < 3; ch++) {
var aa2 = ch / 3 * Math.PI * 2, cl = poeCyl(cc, 0.008, 0.008, 1.0, poeShine(0x2A2A2A, 0.6, 0.7), Math.cos(aa2) * 0.3, 0.5, Math.sin(aa2) * 0.3, 4);
cl.rotation.z = Math.cos(aa2) * 0.5;
cl.rotation.x = -Math.sin(aa2) * 0.5;
}
poeLight(0xFFC890, 1.1, 12, -1, 3.0, -1.2, g, true);
poeArmchair(A, 3.4, -2.6, -Math.PI * 0.25, 0x5A1A2A);
poeFireplace(A, 0, -3.75, 0, true);
poeLight(0xFFB070, 1.6, 10, 0, 1, -3, g, true);
poeParChest(A, -4.6, -2.8, 0, 0x5A3A1A);
poeBox(A, 0.9, 0.7, 0.5, poeS("oak", 0x4A2A14), 3.9, 0.35, 1.2);
for (var c = 0; c < 2; c++)
poeCandelabrum(A, 3.9, 0.7, 1.0 + c * 0.4, 1);
var bd = poeGrp(A, 5.48, 0, 0.8, -Math.PI / 2);
poeFace(bd, 1.8, 2.8, poeGlowM(0xA8B8C8, 0.85), 0, 1.5, 0.01, 0);
poeBox(bd, 0.1, 2.9, 0.12, poeS("oak", 0x3A2414), 0, 1.5, 0.05);
poeSpot(R.x + 4.8, 0.8, 1.6, "The balcony, over the parvis", "step out", function () { poeHook("ndBalcony"); }, 0);
poeSpot(R.x - 4.8, 2.6, 1.4, "The stair, down to the parvis", "go down", function () { var P = ndParvis && ndParvis(); if (P)
poeOutside(null, { x: P.x - 6, z: P.z + 18, ry: P.ry, par: 1 }); }, 0);
},
function (R, g) {
var lite = POE.lite;
R.banner = function () { return "La Falourdel's room, Pont Saint-Michel"; };
R.start = { x: -2.2, z: 1.8, ry: -Math.PI * 0.7 };
var A = ndShell(R, g, { wall: poeS("rough", 0x7A6A54), floor: poeS("boards", 0x5A4028), ceil: "beams" });
poeBed(A, 1.6, -1.2, 0, 0x5A2A2A);
poeTable(A, -1.4, -1.4, 1.0, 0.7, 0.75, 0);
poeCandle(A, -1.4, 0.75, -1.4, 0.2, true);
poeLight(0xFFB868, 1.3, 7, -1.4, 1.3, -1.4, g, true);
poeChair(A, -1.0, -0.7, Math.PI, 0x4A2A1A);
poeChair(A, -1.8, -0.7, Math.PI, 0x4A2A1A);
var cl = poeGrp(A, -2.7, 0, 0.8, Math.PI / 2);
poeBox(cl, 1.4, 2.2, 0.1, poeS("oak", 0x3A2414), 0, 1.1, 0);
poeBox(cl, 0.02, 2.0, 0.02, poeC(0x050505), 0.2, 1.1, 0.06);
var wi = poeGrp(A, 2.98, 0, 0.6, -Math.PI / 2);
poeFace(wi, 0.9, 1.0, poeGlowM(0x2A3448, 1), 0, 1.6, 0.01, 0);
poeBox(wi, 1.0, 0.08, 0.15, poeS("oak", 0x3A2414), 0, 1.08, 0.05);
poeSpot(R.x + 2.6, 0.6, 1.2, "The window, over the river", "look", function () { poeHook("ndRiverWin"); }, 0);
poeSpot(R.x - 2.5, 0.8, 1.2, "The closet door", "look", function () { poeHook("ndCloset"); }, 0);
},
function (R, g) {
var lite = POE.lite;
R.banner = function () { return "The torture chamber, under the Palais"; };
R.start = { x: 0, z: 3.2, ry: 0 };
var A = ndShell(R, g, { wall: poeS("stone", 0x5A5248), floor: poeS("tiles", 0x3A302A), ceil: "vault" });
var fu = poeGrp(A, -3.4, 0, -3.4);
poeBox(fu, 1.6, 1.2, 1.2, poeS("brick", 0x5A2A1A), 0, 0.6, 0);
poeFace(fu, 1.0, 0.5, poeGlowM(0xC8501A, 1), 0, 0.6, 0.61, 0);
poeLight(0xFF6A2A, 1.6, 10, -3.4, 1.2, -2.6, g, true);
poeBox(A, 2.0, 0.6, 0.9, poeS("velvet", 0x3A2414), 0.5, 0.3, -1.5);
for (var i = 0; i < 4; i++)
poeChain(A, -0.5 + i * 0.7, 0.6, -1.95, -0.5 + i * 0.7, 0.1, -2.3, 4);
poeTable(A, 3.2, -3.2, 1.4, 0.7, 0.8, 0);
poeBox(A, 2.8, 1.8, 0.15, poeS("oak", 0x2A1A10), 2.5, 1.6, -3.9);
poeArmchair(A, -1.6, 2.0, Math.PI * 0.9, 0x2A1A1A);
poeChair(A, 1.6, 2.0, -Math.PI * 0.9, 0x2A1A1A);
poeSpot(R.x + 0, 3.6, 1.4, "The low door", "go out", function () { if (POE.ndTortureExit)
POE.ndTortureExit();
else
poeEnterRoom("x_ndcourt", "nd:torture"); }, 0);
},
function (R, g) {
R.banner = function () { return "The pit of the Tournelle"; };
R.start = { x: 0, z: 0.8, ry: 0 };
var A = ndShell(R, g, { wall: poeS("nitre", 0x4A443C), floor: poeS("earth", 0x2A2420), ceil: "vault" });
for (var s = 0; s < 14; s++)
poeBox(A, 0.6, 0.04, 0.12, poeC(0x9A8A50), -1.2 + (s % 5) * 0.5, 0.02, -1 + ((s * 3) % 4) * 0.4).rotation.y = s;
poeChain(A, -1.98, 1.2, -0.6, -1.4, 0.1, -0.4, 6);
poeBox(A, 0.4, 0.4, 0.4, poeC(0x2A2420), 1.4, 0.2, 1.2);
poeLight(0x8A9AB0, 0.5, 6, 0, 3, 0, g, true);
poeSpot(R.x + 0, -1.4, 1.2, "The trap in the vault overhead", "look up", function () { poeHook("ndTrap"); }, 0);
},
function (R, g) {
var lite = POE.lite;
R.banner = function () { return "The cell of the sanctuary, Notre-Dame"; };
R.start = { x: -1.4, z: 1.2, ry: -Math.PI * 0.5 };
var A = ndShell(R, g, { wall: poeS("stone", 0xB0A898), floor: poeS("tiles", 0x8A7A64), ceil: "vault" });
poeBox(A, 1.0, 0.16, 2.0, poeS("oak", 0x4A3420), 1.4, 0.08, -0.8);
var mt = poeBox(A, 0.92, 0.16, 1.9, poeS("cloth", 0xB8A878), 1.4, 0.24, -0.8);
for (var sw = 0; sw < (lite ? 6 : 18); sw++) {
var sb = poeBox(A, 0.006, 0.006, 0.16 + (sw % 3) * 0.05, poeC(0xC8A850), 1.0 + ((sw * 37) % 9) * 0.09, 0.33, -1.7 + ((sw * 53) % 19) * 0.1);
sb.rotation.y = sw * 0.9;
}
poeBox(A, 0.9, 0.03, 1.4, poeS("cloth", 0xE8E2D2), 1.4, 0.335, -0.55);
var bl = poeBox(A, 0.94, 0.05, 0.7, poeS("cloth", 0x6A6458), 1.4, 0.36, -0.25);
bl.rotation.x = 0.05;
poeCyl(A, 0.11, 0.11, 0.8, poeS("cloth", 0xE0D8C8), 1.4, 0.42, -1.55, 10).rotation.z = Math.PI / 2;
var dr = poeBox(A, 0.5, 0.03, 0.8, poeS("cloth", 0xF2EEE4), 1.5, 0.4, 0.0);
dr.rotation.y = 0.2;
var pj = poeGrp(A, -1.8, 0, -1.6);
var pb = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [0.09, 0.0], [0.12, 0.1], [0.13, 0.2], [0.09, 0.32], [0.07, 0.36], [0.085, 0.4], [0.08, 0.41]].map(function (p) { return new THREE.Vector2(p[0], p[1]); }), lite ? 10 : 18), poeS("earth", 0x9A5A3A));
pj.add(pb);
var hn = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.012, 5, 10, Math.PI), poeS("earth", 0x9A5A3A));
hn.position.set(0.12, 0.26, 0);
hn.rotation.z = -Math.PI / 2;
pj.add(hn);
var bk = poeGrp(A, -1.3, 0, -1.55);
poeCyl(bk, 0.2, 0.16, 0.14, poeS("rough", 0xA8884A), 0, 0.07, 0, lite ? 10 : 16);
var lf = poeSph(bk, 0.13, poeC(0xC08A48), 0, 0.17, 0, 12);
lf.scale.set(1.2, 0.6, 0.9);
var bt = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.012, 5, 16, Math.PI), poeS("rough", 0x8A6A3A));
bt.position.y = 0.14;
bk.add(bt);
poeCyl(A, 0.04, 0.035, 0.08, poeS("earth", 0x8A4A2A), -1.55, 0.04, -1.25, 8);
poeLamp(A, -1.9, 1.12, -1.82);
poeLight(0xFFC080, 1.1, 6, -1.9, 1.4, -1.6, g, true);
var sh = poeBox(A, 1.6, 0.06, 0.35, poeS("stone", 0x9A9488), 0, 1.1, -1.82);
var cv = poeGrp(A, -0.45, 1.13, -1.82);
poeCyl(cv, 0.09, 0.06, 0.3, poeShine(0xD8E8F0, 0.05, 0.1), 0, 0.15, 0, 12);
R.vaseCrystal = cv;
for (var f = 0; f < 4; f++) {
var st = poeCyl(cv, 0.006, 0.006, 0.3, poeC(0x5A5A3A), 0.02 * (f - 1.5), 0.42, 0, 4);
st.rotation.z = 0.4 * (f - 1.5);
poeSph(cv, 0.03, poeC(0x6A5A40), 0.06 * (f - 1.5), 0.56, 0, 5);
}
var ev = poeGrp(A, 0.45, 1.13, -1.82);
poeCyl(ev, 0.1, 0.08, 0.28, poeS("earth", 0x9A5A3A), 0, 0.14, 0, 12);
R.vaseEarth = ev;
for (var f2 = 0; f2 < 5; f2++) {
var st2 = poeCyl(ev, 0.006, 0.006, 0.32, poeC(0x3A6A2A), 0.02 * (f2 - 2), 0.42, 0, 4);
st2.rotation.z = 0.3 * (f2 - 2);
poeSph(ev, 0.035, poeC([0xD8C840, 0xE8E0D0, 0xC84040][f2 % 3]), 0.07 * (f2 - 2), 0.58, 0, 6);
}
var wi = poeGrp(A, 0, 0, 1.98, Math.PI);
poeFace(wi, 0.8, 1.0, poeGlowM(0xB8C8D8, 1), 0, 1.7, 0.01, 0);
poeBox(wi, 0.06, 1.0, 0.06, poeC(0x2A2A2A), 0, 1.7, 0.03);
poeLight(0xD8E0E8, 1.0, 8, 0, 2.2, 1.4, g, true);
poeSpot(R.x + 0, -1.4, 1.3, "The two vases on the ledge", "look", function () { poeHook("ndVases"); }, 0);
poeSpot(R.x + 0, 1.6, 1.2, "The window, over the roofs of the aisle", "look out", function () { poeHook("ndRefugeWin"); }, 0);
poeSpot(R.x - 2.1, 0.2, 1.2, "The door, to the leads of the roof", "go out", function () { poeEnterRoom("x_nd", "nd:refuge", { x: -46, z: -8.2, ry: Math.PI }); }, 0);
},
function (R, g) {
var lite = POE.lite;
R.banner = function () { return "The retreat of Louis XI, the Bastille Saint-Antoine"; };
R.start = { x: -3.2, z: 2.6, ry: -Math.PI * 0.75 };
var A = ndShell(R, g, { wall: poeS("damask", 0x6A4A2A), floor: poeS("tiles", 0x6A4A3A), ceil: "beams", ceilM: poeS("panel", 0x5A3A1A) });
poeTable(A, 0.4, -1.8, 2.2, 1.1, 0.8, 0, 0x2A3A8A);
poeArmchair(A, 0.4, -2.8, 0, 0x8A1A1A);
for (var p = 0; p < (lite ? 2 : 6); p++)
poeBox(A, 0.3, 0.02, 0.4, poeC(0xE8DCBE), -0.3 + p * 0.3, 0.81, -1.6);
poeCandelabrum(A, 1.2, 0.8, -1.8, 1, !lite);
poeLight(0xFFC080, 1.4, 9, 0.4, 1.8, -1.6, g, true);
poeFireplace(A, -4.75, -1.2, Math.PI / 2, true);
var cg = poeGrp(A, 3.2, 0, 0.8);
var bars = poeShine(0x2A2A2A, 0.5, 0.8), oak = poeS("oak", 0x4A3020);
poeBox(cg, 2.4, 0.15, 2.4, oak, 0, 0.07, 0);
poeBox(cg, 2.4, 0.15, 2.4, oak, 0, 2.2, 0);
for (var b = 0; b < 9; b++) {
[[-1.15, -1.15 + b * 0.29], [1.15, -1.15 + b * 0.29]].forEach(function (q) { poeBox(cg, 0.06, 2.1, 0.06, b % 2 ? bars : oak, q[0], 1.12, q[1]); });
poeBox(cg, 0.06, 2.1, 0.06, b % 2 ? bars : oak, -1.15 + b * 0.29, 1.12, -1.15);
poeBox(cg, 0.06, 2.1, 0.06, b % 2 ? bars : oak, -1.15 + b * 0.29, 1.12, 1.15);
}
poeSolid(R.x + 3.2, 0.8, 2.5, 2.5, 0, 2.3);
poeSpot(R.x + 3.2, -0.8, 1.6, "The cage of wood and iron", "look", function () { poeHook("ndCage"); }, 0);
},
function () {
if (POE.ndBoneG)
return POE.ndBoneG;
var pts = [[0, 0], [0.05, 0.004], [0.075, 0.03], [0.07, 0.06], [0.042, 0.1], [0.032, 0.22], [0.03, 0.5], [0.032, 0.78], [0.04, 0.9], [0.068, 0.94], [0.08, 0.97], [0.05, 0.996], [0, 1]].map(function (p) { return new THREE.Vector2(p[0], p[1]); });
return (POE.ndBoneG = new THREE.LatheGeometry(pts, POE.lite ? 6 : 9));
},
function (P, x, y, z, s, jawOpen) {
var g = poeGrp(P, x, y, z), bm = ndBoneMat(), dk = poeC(0x140E0A);
s = s || 1;
var c = poeSph(g, 0.095 * s, bm, 0, 0.02 * s, -0.01 * s, 14);
c.scale.set(0.82, 0.92, 1.08);
var br = poeSph(g, 0.07 * s, bm, 0, -0.012 * s, 0.045 * s, 12);
br.scale.set(1.05, 0.75, 0.9);
[-1, 1].forEach(function (sd) { var e = poeSph(g, 0.024 * s, dk, sd * 0.032 * s, 0.0, 0.082 * s, 8); e.scale.z = 0.5; var ck = poeSph(g, 0.022 * s, bm, sd * 0.05 * s, -0.03 * s, 0.06 * s, 6); ck.scale.set(1, 0.7, 1.3); });
var n = poeSph(g, 0.013 * s, dk, 0, -0.032 * s, 0.092 * s, 6);
n.scale.set(0.8, 1.4, 0.5);
var j = poeGrp(g, 0, -0.05 * s, 0.02 * s);
j.rotation.x = jawOpen || 0.08;
var jw = poeSph(j, 0.05 * s, bm, 0, -0.02 * s, 0.035 * s, 10);
jw.scale.set(1.0, 0.45, 1.0);
poeBox(g, 0.06 * s, 0.012 * s, 0.012 * s, poeC(0xE0D6BC), 0, -0.052 * s, 0.085 * s);
return g;
},
function (P, o) {
o = o || {};
var g = poeGrp(P, 0, 0, 0), bm = ndBoneMat(), q = !!o.bent, sp = [];
for (var v = 0; v < (POE.lite ? 8 : 17); v++) {
var t = v / ((POE.lite ? 8 : 17) - 1), y = 0.95 + t * 0.45, x = q ? Math.sin(t * Math.PI) * 0.07 : 0, z = q ? -Math.sin(t * Math.PI * 0.9) * 0.12 : -0.01 * Math.sin(t * Math.PI * 2);
sp.push([x, y, z]);
var c = poeCyl(g, 0.024, 0.026, 0.018, bm, x, y, z, 8);
}
var top = sp[sp.length - 1], ch = [top[0], 1.18 + (q ? 0 : 0), q ? -0.06 : 0.0];
for (var r = 0; r < (POE.lite ? 5 : 10); r++) {
var y = 1.06 + r * 0.03, rr = 0.1 + Math.sin((r + 2) / 12 * Math.PI) * 0.055, hp = new THREE.Group(), m = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.007, 4, POE.lite ? 8 : 14, Math.PI * 1.72), bm);
m.rotation.x = Math.PI / 2;
hp.add(m);
hp.rotation.y = -2.04;
hp.position.set(ch[0], y, ch[2] + rr * 0.55);
hp.scale.set(1, 1, 0.72);
hp.rotation.z = q ? 0.18 : 0;
g.add(hp);
}
poeBox(g, 0.03, 0.2, 0.018, bm, ch[0], 1.2, ch[2] + 0.15);
var sh = q ? [[-0.17, 1.31, -0.05], [0.19, 1.36, -0.08]] : [[-0.17, 1.37, 0], [0.17, 1.37, 0]];
sh.forEach(function (a) { ndBone(g, [ch[0], 1.36, ch[2] + 0.08], a, 0.3); var bl = poeBox(g, 0.1, 0.13, 0.012, bm, a[0] * 0.7, a[1] - 0.08, a[2] - 0.07); bl.rotation.y = a[0] > 0 ? 0.4 : -0.4; });
var pv = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.035, 6, POE.lite ? 8 : 14), bm);
pv.rotation.x = Math.PI / 2 + 0.3;
pv.position.set(0, 0.94, 0.01);
pv.scale.set(1.25, 0.75, 1);
g.add(pv);
var hd = q ? [top[0] + 0.03, 1.43, top[2] + 0.06] : [0, 1.53, 0.02];
ndBone(g, top, [hd[0], hd[1] - 0.06, hd[2]], 0.35);
ndSkullHead(g, hd[0], hd[1], hd[2], q ? 1.08 : 0.96, o.jaw || 0.1).rotation.y = o.look || 0;
var arms = o.arms || [[[-0.2, 1.1, 0.02], [-0.22, 0.84, 0.04]], [[0.2, 1.1, 0.02], [0.22, 0.84, 0.04]]];
arms.forEach(function (A, i) {
var s0 = sh[i];
ndBone(g, s0, A[0], 0.48);
ndBone(g, A[0], A[1], 0.36);
var B = [A[0][0] - 0.012, A[0][1], A[0][2]];
ndBone(g, B, [A[1][0] - 0.012, A[1][1], A[1][2]], 0.28);
for (var f = 0; f < (POE.lite ? 2 : 4); f++) {
var d = [A[1][0] - A[0][0], A[1][1] - A[0][1], A[1][2] - A[0][2]], l = Math.hypot(d[0], d[1], d[2]) || 1;
var sp2 = (f - 1.5) * 0.012;
ndBone(g, [A[1][0] + sp2, A[1][1], A[1][2]], [A[1][0] + sp2 + d[0] / l * 0.09, A[1][1] + d[1] / l * 0.09, A[1][2] + d[2] / l * 0.09 + 0.01], 0.12);
}
});
var legs = o.legs || [[[-0.1, 0.5, 0.06], [-0.1, 0.08, 0.0]], [[0.1, 0.5, 0.06], [0.1, 0.08, 0.0]]];
legs.forEach(function (L, i) {
var h = [i ? 0.1 : -0.1, 0.92, 0.02], sh2 = q && i === 1 ? 0.08 : 0, K = [L[0][0] + (q ? (i ? 0.05 : -0.05) : 0), L[0][1] + sh2, L[0][2]], F = [L[1][0], L[1][1] + sh2, L[1][2]];
ndBone(g, h, K, 0.62);
ndBone(g, K, F, 0.5);
ndBone(g, [K[0] + 0.03, K[1], K[2] - 0.01], [F[0] + 0.03, F[1], F[2] - 0.01], 0.26);
poeSph(g, 0.032, bm, K[0], K[1], K[2] + 0.03, 6);
var ft = poeBox(g, 0.07, 0.035, 0.2, bm, F[0], F[1] - 0.04, F[2] + 0.07);
ft.rotation.x = L[2] || 0;
});
return g;
},
function (P, x, z, n, seed, w, d) {
var R = wRand(seed || 1), lb = new THREE.InstancedMesh(ndBoneGeo(), ndBoneMat(), n), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), E = new THREE.Euler(), S = new THREE.Vector3(), V = new THREE.Vector3();
for (var i = 0; i < n; i++) {
var u = R() * 2 - 1, v = R() * 2 - 1, rr = Math.sqrt(u * u + v * v);
if (rr > 1) {
u /= rr;
v /= rr;
}
var hgt = (1 - Math.min(1, u * u + v * v)) * 0.5 * (0.5 + R() * 0.5);
E.set(Math.PI / 2 + (R() - 0.5) * 0.7, R() * Math.PI * 2, (R() - 0.5) * 0.5);
Q.setFromEuler(E);
var L = 0.25 + R() * 0.25, k = 0.35 + R() * 0.25;
S.set(k, L, k);
V.set(x + u * w, 0.04 + hgt, z + v * d);
M.compose(V, Q, S);
lb.setMatrixAt(i, M);
}
P.add(lb);
var nk = Math.max(2, Math.round(n / 7));
for (var j = 0; j < nk; j++) {
var a = R() * Math.PI * 2, r2 = R() * 0.8;
var sk = ndSkullHead(P, x + Math.cos(a) * w * r2, 0.1 + (1 - r2) * 0.35, z + Math.sin(a) * d * r2, 0.95, 0.15 + R() * 0.3);
sk.rotation.set((R() - 0.5) * 0.8, R() * 6, (R() - 0.5) * 0.8);
}
return lb;
},
function (R, g) {
var lite = POE.lite;
R.banner = function () { return "The vault of Montfaucon"; };
R.start = { x: 0, z: 2.4, ry: 0 };
var A = ndShell(R, g, { wall: poeS("nitre", 0x7A7264), floor: poeS("earth", 0x5A4E40), ceil: "vault" });
[-2.2, 1.4].forEach(function (z) { poeBox(A, 0.7, 3.4, 0.7, poeS("stone", 0x6A6458), -4.1, 1.7, z); poeBox(A, 0.7, 3.4, 0.7, poeS("stone", 0x6A6458), 4.1, 1.7, z); poeBox(A, 8.9, 0.5, 0.6, poeS("stone", 0x6A6458), 0, 3.1, z); });
for (var st = 0; st < 5; st++)
poeBox(A, 1.6, 0.3 + st * 0.3, 0.32, poeS("stone", 0x6A6458), 0, (0.3 + st * 0.3) / 2, 3.0 + st * 0.32);
poeFace(A, 1.6, 1.4, poeGlowM(0xE8E4D8, 0.9), 0, 2.6, 4.48, Math.PI);
var heaps = lite ? [[-3, -3.3, 24], [3, -3.2, 24], [-3.3, 2.6, 18]] : [[-3.1, -3.3, 60], [0.4, -3.7, 44], [3.1, -3.0, 60], [-3.4, 0.2, 40], [3.5, 0.6, 40], [-3.0, 3.0, 30], [3.2, 3.2, 28]];
heaps.forEach(function (h, i) { ndBoneHeap(A, h[0], h[1], h[2], 40 + i, 0.85, 0.7); });
for (var c = 0; c < (lite ? 2 : 5); c++)
poeChain(A, -3.9 + c * 1.9, 2.8, -4.3, -3.7 + c * 1.9, 0.1, -3.9, 6);
var lad = poeGrp(A, 3.9, 0, -1.2, 0.2);
[-0.22, 0.22].forEach(function (x) { poeBox(lad, 0.06, 2.4, 0.06, poeS("oak", 0x3A2A1A), x, 1.2, 0); });
for (var k = 0; k < 6; k++)
poeBox(lad, 0.5, 0.05, 0.05, poeS("oak", 0x3A2A1A), 0, 0.3 + k * 0.36, 0);
lad.rotation.z = 0.35;
R.pair = poeGrp(A, 0, 0, -1.2);
R.pair.visible = false;
for (var gw = 0; gw < 5; gw++) {
var gown = poePlane(R.pair, 0.22 + gw % 2 * 0.1, 0.35 + gw % 3 * 0.1, poeS("cloth", 0x9A9282), -0.4 + gw * 0.28, 0.012 + gw * 0.002, 0.25 + (gw % 2) * 0.12);
gown.rotation.y = gw * 0.7;
}
var Es = poeGrp(R.pair, -0.55, 0.17, 0.17, Math.PI), Ei = poeGrp(Es, 0, 0, 0);
Ei.rotation.z = Math.PI / 2;
ndSkeleton(Ei, { look: -0.4, jaw: 0.05, arms: [[[-0.24, 1.12, 0.12], [-0.2, 0.95, 0.3]], [[0.14, 1.18, 0.24], [-0.02, 1.12, 0.4]]], legs: [[[-0.08, 0.52, 0.14], [-0.08, 0.1, 0.02]], [[0.1, 0.53, 0.16], [0.08, 0.12, 0.04, 0.3]]] });
var Qs = poeGrp(R.pair, -0.55, 0.19, -0.2, 0), Qi = poeGrp(Qs, 0, 0, 0);
Qi.rotation.z = -Math.PI / 2;
ndSkeleton(Qi, { bent: 1, look: 0.3, jaw: 0.2, arms: [[[-0.12, 1.22, 0.28], [0.06, 1.18, 0.46]], [[0.22, 1.12, 0.22], [0.08, 1.02, 0.42]]], legs: [[[-0.1, 0.5, 0.18], [-0.1, 0.1, 0.06]], [[0.1, 0.5, 0.2], [0.1, 0.12, 0.1]]] });
var bag = poeGrp(R.pair, 0.75, 0.04, 0.2);
for (var b = 0; b < 9; b++)
poeSph(bag, 0.012, poeShine(0x3A6A3A, 0.2, 0.3), -0.12 + b * 0.03, 0, Math.sin(b) * 0.03, 5);
var bg = poeBox(bag, 0.07, 0.02, 0.08, poeS("cloth", 0x2A5A3A), 0.18, 0.01, 0.02);
bg.rotation.y = 0.4;
R.pairBag = bag;
poeLamp(A, 0.9, 0.3, 3.6);
poeLight(0xFFC88A, 1.8, 10, 0.8, 1.0, 3.2, g, true);
poeLight(0xB8C4D8, 0.9, 10, 0, 3.0, 3.6, g, true);
poeLight(0xE0C8A0, 0.5, 5, 0, 2.2, -1.2, g, !lite);
poeLight(0xD8C8A8, 1.6, 14, 0, 3.0, -0.5, g, true);
poeLight(0xC8B898, 1.0, 9, -3, 2.4, -2.5, g);
poeSpot(R.x + 0, -0.4, 1.6, "The two skeletons", "look", function () { poeHook("ndPair"); }, 0);
poeSpot(R.x + 0, 4.0, 1.4, "The steps, up to the light", "go up", function () { var M = ND_AT.montfaucon; poeOutside(null, { x: POE_RX.x_paris.x + M[0], z: M[1] + 8, ry: 0, par: 1 }); }, 0);
},
function () { return ndP(4, "A moment later, the grave and learned Robert Mistricolle", 1) + ndP(4, "\"Foundling!\" he said", 1) + ndP(4, "\"It's not a wart,\" returned Master Robert", 1) + ndP(4, "\"The greatest misfortunes,\"", 1) + ndP(4, "\"My opinion is,\" exclaimed Jehanne de la Tarme", 1) + ndP(4, "\"A fine, flaming fagot,\"", 1); },
function (f) {
ndWarm(4);
poeNdTime("day");
POE.ndShow = {};
var R = poeRoomGet("x_nd");
if (!R.foundBed) {
var b = poeGrp(R.g, -50.5, 0, -6.6, 0);
R.foundBed = b;
var oak = poeS("oak", 0x4A3020);
poeBox(b, 1.8, 0.12, 1.0, oak, 0, 0.62, 0);
[[-0.8, -0.4], [0.8, -0.4], [-0.8, 0.4], [0.8, 0.4]].forEach(function (p) { poeBox(b, 0.1, 0.62, 0.1, oak, p[0], 0.31, p[1]); });
poeBox(b, 1.7, 0.1, 0.9, poeS("cloth", 0xB8A888), 0, 0.7, 0);
poeCyl(b, 0.22, 0.18, 0.08, poeShine(0x8A6A3A, 0.4, 0.8), 1.1, 0.9, 0, 12);
poeBox(b, 0.6, 0.25, 0.35, poeS("cloth", 0x8A7A5A), -0.3, 0.8, 0);
poeBox(b, 0.12, 0.12, 0.12, poeShine(0x3A3A3A, 0.5, 0.7), 1.1, 0.6, 0);
}
R.foundBed.visible = true;
poeSpotOnce("nd:foundbed", R.x - 50.5, -5.4, 2.0, "The foundlings' bed", "look", function () { poeCard("The wooden bed", ndP(4, "The sort of living being which lay upon that plank", 1)); }, 0);
[["agnes", "Agnes la Herme", -51.6, -5.0], ["jehanne", "Jehanne de la Tarme", -49.4, -5.2], ["henriette", "Henriette la Gaultière", -51.0, -7.9], ["gauchere", "Gauchère la Violette", -49.6, -7.8]].forEach(function (H, i) { poeCast(H[0], "x_nd", H[2], H[3], Math.atan2(-(-50.5 - H[2]), -(-6.6 - H[3])), { name: H[1], role: "wife15", sex: "f", look: { _seed: 1700 + i, top: 0x6A6A68, bottom: 0x6A6A68 }, talk: poeNdTalk(H[1], "An old Haudriette nun of 1467, one of the four bent over the foundlings' bed on Quasimodo Sunday; talks about the little monster on the bed, the foundlings, the hospital of the Haudriettes.") }); });
poeCast("mistricolle", "x_nd", -48.4, -4.4, -2.2, { name: "Master Robert Mistricolle", role: "rich15", sex: "m", look: { _seed: 1705, hair: 0x8A8A8A }, talk: poeNdTalk("Master Robert Mistricolle", "The king's protonotary in 1467, pompous and superstitious; talks about the foundling (a demon, he says), omens, the plague.") });
poeCast("frollo", "x_nd", -50.4, -4.2, -0.4, { name: "Dom Claude Frollo", role: "priest15", sex: "m", look: { _seed: 1446, hair: 0x3A3028 }, talk: poeNdTalk("Dom Claude Frollo") });
poeHide(POE.cast.frollo);
var Q = poeNdQuasi("x_ndbells", "quasi", 1.8, 2.6, Math.PI, {});
poeHide(Q);
},
function () { return ndP(5, "\"In truth, Monsieur le Docteur Coictier, I felt great joy", 1) + ndP(5, "\"How is your superb house in the Rue Saint-Andre", 1) + ndP(5, "\"Alas! Master Claude, all that masonry", 1) + ndP(5, "\"By the way,\" exclaimed Dom Claude, \"how is your royal patient?\"", 1) + ndP(5, "\"He payeth not sufficiently his physician,\"", 1); },
function (f) {
ndWarm(5);
poeNdTime("dusk");
POE.ndShow = {};
poeRoomGet("x_ndcanon");
poeCast("frollo", "x_ndcanon", -1.0, 0.5, Math.PI, { name: "Dom Claude Frollo", role: "priest15", sex: "m", look: { _seed: 1446, hair: 0x3A3028 }, talk: poeNdTalk("Dom Claude Frollo") });
POE.cast.frollo.g.visible = true;
poeCast("coictier", "x_ndcanon", 1.8, 1.6, Math.PI * 0.9, { name: "Jacques Coictier", role: "rich15", sex: "m", look: { _seed: 1710, hair: 0x5A4A3A, top: 0x6A1A1A }, talk: poeNdTalk("Jacques Coictier", "Physician to King Louis XI, about fifty, harsh and grasping; talks about his royal patient, his house in the Rue Saint-André-des-Arcs, his offices and their revenues, astrology (which he believes in).") });
poeCast("tourangeau", "x_ndcanon", 2.8, 1.4, Math.PI * 1.2, { name: "Gossip Tourangeau", role: "m15", sex: "m", look: { _seed: 1711, hair: 0x9A9A9A, top: 0x5A5A5A, bottom: 0x4A4A4A }, talk: poeNdTalk("Gossip Tourangeau", "An old man of about sixty in a shabby grey doublet with a hooked nose and flashing eyes under bushy brows, who says he is a burgher of Tours; in truth he is King Louis XI incognito, but never says so. Asks about alchemy, making gold, his sickness; says 'Pasque-dieu!'.") });
},
function (f) {
ndWarm(6);
poeNdTime("day");
POE.ndShow = {};
POE.ndCourt = "The audience hall of the Châtelet, 7 January 1482";
POE.ndCourtExit = null;
poeRoomGet("x_ndcourt");
poeCast("florian", "x_ndcourt", 0, -3.9, 0, { name: "Master Florian Barbedienne", role: "canon15", sex: "m", look: { _seed: 1720, hair: 0x9A9A9A, top: 0x1A1A1A }, talk: poeNdTalk("Master Florian Barbedienne", "The auditor of the Châtelet, deaf, who judges without hearing and hides his deafness; answers whatever he imagines was said.") });
POE.cast.florian.g.position.y = 0.35;
POE.cast.florian.y = 0.35;
poeCast("provost", "x_ndcourt", 1.8, -3.9, 0, { name: "Messire Robert d'Estouteville", role: "rich15", sex: "m", look: { _seed: 1721, hair: 0x6A5A4A, top: 0x2A3A8A }, talk: poeNdTalk("Messire Robert d'Estouteville", "Provost of Paris, knight, lord of Beyne, in a very bad temper this morning after the feast; talks about his offices, his wife Ambroise, the sergeants, the insolence of prisoners.") });
POE.cast.provost.g.position.y = 0.35;
POE.cast.provost.y = 0.35;
poeCast("jehan", "x_ndcourt", -3.2, 2.6, Math.PI, { name: "Jehan Frollo du Moulin", role: "student", sex: "m", look: { _seed: 1472, hair: 0xC89848, top: 0x3A1A1A }, talk: poeNdTalk("Jehan Frollo du Moulin") });
POE.cast.jehan.g.visible = true;
var Q = poeNdQuasi("x_ndcourt", "quasi", 0, -1.0, Math.PI, {});
poeHide(Q);
var G = ND_AT.greve, C = [[G[0] - 30, G[1] + 2, "mahiette", "Mahiette", "A woman of Reims visiting Paris with her little son Eustache, kind and talkative; she knew Paquette la Chantefleurie at Reims and tells her story; talks about Reims, the gypsies, her fear for her child."], [G[0] - 31.6, G[1] + 3.2, "oudarde", "Oudarde Musnier", "A plump and kind Parisian bourgeoise, wife of a merchant; talks about the Flemish ambassadors, the recluse of the Rat-Hole (Sister Gudule), charity."], [G[0] - 29, G[1] + 3.6, "gervaise", "Gervaise", "A curious Parisian bourgeoise, quick to argue; talks about the gypsies, the supper of the Flemings, the pillory."]];
C.forEach(function (c, i) { poeCast(c[2], "x_paris", c[0], c[1], -Math.PI / 2, { name: c[3], role: "wife15", sex: "f", look: { _seed: 1730 + i }, talk: poeNdTalk(c[3], c[4]) }); });
poeCast("eustache", "x_paris", G[0] - 30.6, G[1] + 1.1, -Math.PI / 2, { name: "Eustache", role: "m15", sex: "m", child: true, s: 0.62, look: { _seed: 1734 }, talk: poeNdTalk("Eustache", "Mahiette's little boy of about six, who wants to eat the cake meant for the recluse.") });
poeCast("esme", "x_paris", 1169.5, -2212.5, 0.4, { name: "La Esmeralda", role: "gypsy", sex: "f", look: { _seed: 1466, hair: 0x1A1210, hairStyle: "long", skin: 0xD8A880, top: 0xC8961E, bottom: 0xB8202A }, talk: poeNdTalk("La Esmeralda") });
poeHide(POE.cast.esme);
poeCast("frollo", "x_paris", 0, 0, 0, { name: "Dom Claude Frollo", role: "priest15", sex: "m", look: { _seed: 1446, hair: 0x3A3028 }, talk: poeNdTalk("Dom Claude Frollo") });
poeHide(POE.cast.frollo);
var R = POE_RX.x_paris;
poeSpotOnce("nd:rat", R.x + ND_AT.ratHole[0] + 1.4, ND_AT.ratHole[1], 2, "The Rat-Hole", "look in at the grating", function () { poeHook("ndRat"); }, 0);
},
function () {
if (POEC.palGeo === false)
return null;
try {
if (!POEC.palGeo) {
if (typeof crxMesh !== "function" || typeof crxMat !== "function") {
POEC.palGeo = false;
return null;
}
var B = "root", w = 0xE8E4DA, w2 = 0xD8D2C4, P = [
{ t: "e", c: [0, 0.22, 0], r: [0.52, 0.24, 0.3], bone: B, col: w },
{ t: "e", c: [0, 0.36, 0.05], r: [0.36, 0.2, 0.24], bone: B, col: w },
{ t: "e", c: [0, 0.33, 0.2], r: [0.24, 0.1, 0.06], rot: [0.3, 0, 0], bone: B, col: w2, k: 0.03 },
{ t: "c", a: [0, 0.45, 0], b: [0, 0.78, 0.03], r0: 0.13, r1: 0.11, bone: B, col: w },
{ t: "e", c: [0, 0.95, 0.03], r: [0.17, 0.21, 0.2], bone: B, col: w },
{ t: "e", c: [0, 0.87, 0.13], r: [0.1, 0.1, 0.1], bone: B, col: w, k: 0.05 },
{ t: "c", a: [0, 1.0, 0.2], b: [0, 0.91, 0.24], r0: 0.025, r1: 0.03, bone: B, col: w, k: 0.02 },
{ t: "e", c: [0, 0.86, 0.2], r: [0.045, 0.016, 0.02], bone: B, col: w2, k: 0.01 },
{ t: "e", c: [0, 0.8, 0.17], r: [0.05, 0.04, 0.04], bone: B, col: w, k: 0.03 },
{ t: "e", c: [0.06, 0.98, 0.17], r: [0.03, 0.012, 0.02], bone: B, col: w2, k: 0.01 },
{ t: "e", c: [-0.06, 0.98, 0.17], r: [0.03, 0.012, 0.02], bone: B, col: w2, k: 0.01 },
{ t: "e", c: [0, 0.86, -0.14], r: [0.1, 0.09, 0.08], bone: B, col: w2, k: 0.04 },
{ t: "e", c: [0, 1.1, -0.03], r: [0.2, 0.13, 0.24], bone: B, col: w2, k: 0.04 },
{ t: "e", c: [0.15, 1.0, 0.0], r: [0.04, 0.1, 0.12], bone: B, col: w2, k: 0.02 },
{ t: "e", c: [-0.15, 1.0, 0.0], r: [0.04, 0.1, 0.12], bone: B, col: w2, k: 0.02 },
{ t: "e", c: [0, 1.29, -0.08], r: [0.035, 0.16, 0.3], rot: [-0.2, 0, 0], bone: B, col: w2, k: 0.03 },
{ t: "e", c: [0, 1.18, -0.36], r: [0.03, 0.06, 0.12], rot: [0.6, 0, 0], bone: B, col: w2, k: 0.03 }
];
POEC.palGeo = crxMesh({ prims: P, bones: [[B, null, [0, 0, 0]]], col: w, k: 0.06, fine: 110 });
}
var m = new THREE.Mesh(POEC.palGeo, crxMat("flesh", {}));
m.userData.keepGeo = 1;
return m;
}
catch (e) {
if (window.console)
console.warn("[poe] pallas", e);
POEC.palGeo = false;
return null;
}
},
function () {
if (POEC.ravenGeo === false)
return null;
try {
if (!POEC.ravenGeo) {
if (typeof crxMesh !== "function" || typeof crxMat !== "function") {
POEC.ravenGeo = false;
return null;
}
var B = "root", k = 0x0C0C12, sh = 0x1E1C34, bk = 0x16161A, P = [
{ t: "e", c: [0, 0.2, 0], r: [0.085, 0.095, 0.17], rot: [-0.5, 0, 0], bone: B, col: k },
{ t: "e", c: [0, 0.22, 0.07], r: [0.08, 0.1, 0.09], bone: B, col: k },
{ t: "c", a: [0, 0.27, 0.09], b: [0, 0.33, 0.13], r0: 0.058, r1: 0.048, bone: B, col: k },
{ t: "e", c: [0, 0.365, 0.15], r: [0.052, 0.05, 0.068], rot: [0.1, 0, 0], bone: B, col: k },
{ t: "e", c: [0, 0.315, 0.175], r: [0.036, 0.04, 0.045], bone: B, col: k, k: 0.02 },
{ t: "e", c: [0, 0.295, 0.17], r: [0.03, 0.03, 0.04], bone: B, col: k, k: 0.02 },
{ t: "c", a: [0, 0.365, 0.2], b: [0, 0.35, 0.3], r0: 0.026, r1: 0.004, bone: B, col: bk, g: 0.55, k: 0.012 },
{ t: "c", a: [0, 0.37, 0.2], b: [0, 0.345, 0.295], r0: 0.02, r1: 0.003, bone: B, col: bk, g: 0.55, k: 0.01 },
{ t: "e", c: [0.04, 0.375, 0.185], r: [0.011, 0.011, 0.011], bone: B, col: 0x1A120C, g: 1, k: 0.004 },
{ t: "e", c: [-0.04, 0.375, 0.185], r: [0.011, 0.011, 0.011], bone: B, col: 0x1A120C, g: 1, k: 0.004 },
{ t: "e", c: [0.075, 0.22, -0.03], r: [0.03, 0.09, 0.2], rot: [-0.42, 0, -0.05], bone: B, col: sh, k: 0.02 },
{ t: "e", c: [-0.075, 0.22, -0.03], r: [0.03, 0.09, 0.2], rot: [-0.42, 0, 0.05], bone: B, col: sh, k: 0.02 },
{ t: "c", a: [0.065, 0.17, -0.14], b: [0.035, 0.115, -0.33], r0: 0.03, r1: 0.01, bone: B, col: sh, k: 0.015 },
{ t: "c", a: [-0.065, 0.17, -0.14], b: [-0.035, 0.115, -0.33], r0: 0.03, r1: 0.01, bone: B, col: sh, k: 0.015 },
{ t: "e", c: [0, 0.1, -0.33], r: [0.06, 0.013, 0.12], rot: [-0.42, 0, 0], bone: B, col: k, k: 0.02 },
{ t: "c", a: [0.03, 0.13, 0.03], b: [0.032, 0.025, 0.04], r0: 0.014, r1: 0.011, bone: B, col: bk, g: 0.3, k: 0.01 },
{ t: "c", a: [-0.03, 0.13, 0.03], b: [-0.032, 0.025, 0.04], r0: 0.014, r1: 0.011, bone: B, col: bk, g: 0.3, k: 0.01 }
];
[-1, 1].forEach(function (sd) {
[-0.35, 0, 0.35].forEach(function (a) { P.push({ t: "c", a: [sd * 0.032, 0.02, 0.04], b: [sd * 0.032 + Math.sin(a) * 0.05, 0.008, 0.04 + Math.cos(a) * 0.06], r0: 0.008, r1: 0.004, bone: B, col: bk, g: 0.4, k: 0.005 }); });
P.push({ t: "c", a: [sd * 0.032, 0.02, 0.04], b: [sd * 0.032, 0.008, -0.02], r0: 0.008, r1: 0.004, bone: B, col: bk, g: 0.4, k: 0.005 });
});
POEC.ravenGeo = crxMesh({ prims: P, bones: [[B, null, [0, 0, 0]]], col: k, k: 0.035, fine: 120, back: sh, backAmt: 0.35 });
}
var m = new THREE.Mesh(POEC.ravenGeo, crxMat("hide", {}));
m.userData.keepGeo = 1;
return m;
}
catch (e) {
if (window.console)
console.warn("[poe] raven", e);
POEC.ravenGeo = false;
return null;
}
},
function () { poeCast("charmolue", "x_ndcourt", -1.6, -1.4, Math.PI * 0.9, { name: "Master Jacques Charmolue", role: "canon15", sex: "m", look: { _seed: 1740, hair: 0x6A6A6A, top: 0x1A1A1A }, talk: poeNdTalk("Master Jacques Charmolue", "The king's procurator in the ecclesiastical court, soft-spoken, smiling, implacable; talks about the sorcery trial of the gypsy and her goat, procedure, the torture ('the question').") }); },
function (f) {
ndWarm(7);
poeNdTime("dusk");
POE.ndShow = {};
poeRoomGet("x_ndgondel");
poeCast("fleur", "x_ndgondel", -1.0, -0.3, Math.PI, { name: "Fleur-de-Lys de Gondelaurier", role: "lady15", sex: "f", look: { _seed: 1750, hair: 0xE0C080, top: 0xC8D8E8 }, talk: poeNdTalk("Fleur-de-Lys de Gondelaurier", "The betrothed of Captain Phoebus, a pretty noble girl, proud and a little jealous; talks about the tapestry of Neptune's grotto she is embroidering, her betrothed, the gypsy girl.") });
poeCast("aloise", "x_ndgondel", 3.4, -2.6, -Math.PI * 0.25, { name: "Madame Aloise de Gondelaurier", role: "lady15", sex: "f", look: { _seed: 1751, hair: 0xB8B0A8 }, talk: poeNdTalk("Madame Aloise de Gondelaurier", "A rich noble widow, mother of Fleur-de-Lys; talks about the marriage, her husband the late archer of the guard, coats of arms.") });
POE.cast.aloise.g.position.y = 0;
[["colombe", "Colombe de Gaillefontaine", -2.2, -2.1, 0], ["berangere", "Bérangère de Champchevrier", 0.2, -2.1, 0], ["christeuil", "Amelotte de Montmichel", -2.2, -0.3, Math.PI]].forEach(function (c, i) { poeCast(c[0], "x_ndgondel", c[2], c[3], c[4], { name: c[1], role: "lady15", sex: "f", child: i === 1, s: i === 1 ? 0.72 : 1, look: { _seed: 1752 + i }, talk: poeNdTalk(c[1], "A noble young lady visiting the Gondelaurier house in March 1482, embroidering the great tapestry; talks about fashions, the hôtels of Paris, the gypsy dancing on the parvis.") }); });
poeCast("phoebus", "x_ndgondel", 0.8, 0.6, -Math.PI / 2, { name: "Captain Phoebus de Châteaupers", role: "archer", sex: "m", look: { _seed: 1460, hair: 0xC8A048, top: 0x8A1A1A }, talk: poeNdTalk("Captain Phoebus de Châteaupers") });
POE.cast.phoebus.g.visible = true;
poeCast("esme", "x_ndgondel", 4.2, 0.6, -Math.PI / 2, { name: "La Esmeralda", role: "gypsy", sex: "f", look: { _seed: 1466, hair: 0x1A1210, hairStyle: "long", skin: 0xD8A880, top: 0xC8961E, bottom: 0xB8202A }, talk: poeNdTalk("La Esmeralda") });
poeHide(POE.cast.esme);
poeCast("gringoire", "x_nd", -40, 6, 0, { name: "Pierre Gringoire", role: "m15", sex: "m", look: { _seed: 1471, hair: 0xD8B878, top: 0x1A1A1E, bottom: 0x1A1A1E }, talk: poeNdTalk("Pierre Gringoire") });
POE.cast.gringoire.g.visible = true;
poeCast("frollo", "x_nd", -41, 5, Math.PI, { name: "Dom Claude Frollo", role: "priest15", sex: "m", look: { _seed: 1446, hair: 0x3A3028 }, talk: poeNdTalk("Dom Claude Frollo") });
POE.cast.frollo.g.visible = true;
poeCast("jehan", "x_ndcell", 2.2, 1.8, Math.PI * 1.2, { name: "Jehan Frollo du Moulin", role: "student", sex: "m", look: { _seed: 1472, hair: 0xC89848, top: 0x3A1A1A }, talk: poeNdTalk("Jehan Frollo du Moulin") });
POE.cast.jehan.g.visible = true;
ndCourtCast();
poeHide(POE.cast.charmolue);
var R = POE_RX.x_paris;
poeSpotOnce("nd:falourdel", R.x + ND_AT.michel[0], ND_AT.michel[1], 2.4, "La Falourdel's house, on the Pont Saint-Michel", "go up", function () { if (POE.era)
poeEnterRoom("x_ndfalour", "nd:michel"); }, 0);
},
function () { ndHide(["frollo"]); var E = POE.cast.esme; if (E) {
poeLay(E, false);
poeHide(E);
} poeEnterRoom("x_ndgondel", "nd:parvis"); poeNdTime("day"); var Ph = POE.cast.phoebus; if (Ph) {
poeMove(Ph, "x_ndgondel", 4.4, 0.4, -Math.PI / 2);
Ph.g.visible = true;
} var Fl = POE.cast.fleur; if (Fl) {
poeMove(Fl, "x_ndgondel", 4.4, 1.4, -Math.PI / 2);
Fl.g.visible = true;
} },
function (f) {
ndWarm(8);
poeNdTime("day");
POE.ndShow = {};
POE.ndCourt = "The Grand' Chambre of the Palais de Justice, 1482";
POE.ndCourtExit = function () { ndGoPar(ND_AT.palais[0] + 3, ND_AT.palais[1] + 0.5, -Math.PI / 2); };
POE.ndTortureExit = null;
poeRoomGet("x_ndcourt");
poeCast("president", "x_ndcourt", 0, -3.9, 0, { name: "The President of the court", role: "canon15", sex: "m", look: { _seed: 1760, hair: 0x9A9A9A, top: 0x8A1A1A }, talk: poeNdTalk("The President of the court", "President of the ecclesiastical court sitting in the Grand' Chambre, old and sleepy; talks about the trial of the gypsy for sorcery and murder.") });
POE.cast.president.g.position.y = 0.35;
POE.cast.president.y = 0.35;
ndCourtCast();
POE.cast.charmolue.g.visible = true;
poeCast("falourdel", "x_ndcourt", -1.0, 0.6, Math.PI, { name: "La Falourdel", role: "wife15", sex: "f", look: { _seed: 1761, hair: 0xC8C8C8, top: 0x4A3A2A }, talk: poeNdTalk("La Falourdel", "An old woman of the Pont Saint-Michel who lets her upper room by the night; a witness; talks about the monk, the captain, the gypsy, the dead leaf that turned into a crown in her drawer.") });
POE.cast.falourdel.g.visible = true;
poeCast("gringoire", "x_ndcourt", -4.6, 2.6, Math.PI, { name: "Pierre Gringoire", role: "m15", sex: "m", look: { _seed: 1471, hair: 0xD8B878, top: 0x1A1A1E, bottom: 0x1A1A1E }, talk: poeNdTalk("Pierre Gringoire") });
POE.cast.gringoire.g.visible = true;
poeCast("esme", "x_ndcourt", 0.6, -1.0, Math.PI, { name: "La Esmeralda", role: "gypsy", sex: "f", look: { _seed: 1466, hair: 0x1A1210, hairStyle: "long", skin: 0xD8A880, top: 0xC8961E, bottom: 0xB8202A }, talk: poeNdTalk("La Esmeralda") });
poeHide(POE.cast.esme);
poeCast("frollo", "x_ndpit", -0.6, 1.0, Math.PI, { name: "Dom Claude Frollo", role: "priest15", sex: "m", look: { _seed: 1446, hair: 0x3A3028, _cowl: 1 }, talk: poeNdTalk("Dom Claude Frollo") });
poeHide(POE.cast.frollo);
poeCast("phoebus", "x_ndgondel", 4.4, 0.4, -Math.PI / 2, { name: "Captain Phoebus de Châteaupers", role: "archer", sex: "m", look: { _seed: 1460, hair: 0xC8A048, top: 0x8A1A1A }, talk: poeNdTalk("Captain Phoebus de Châteaupers") });
poeHide(POE.cast.phoebus);
poeCast("fleur", "x_ndgondel", 4.4, 1.4, -Math.PI / 2, { name: "Fleur-de-Lys de Gondelaurier", role: "lady15", sex: "f", look: { _seed: 1750, hair: 0xE0C080, top: 0xC8D8E8 }, talk: poeNdTalk("Fleur-de-Lys de Gondelaurier") });
poeHide(POE.cast.fleur);
var Q = poeNdQuasi("x_paris", "quasi", 0, 0, 0, {});
poeHide(Q);
},
function () { return ndP(9, "There was something more plaintive than these words", 1) + ndP(9, "\"Never have I seen my ugliness as at the present moment.", 1) + ndP(9, "\"I understand,\" he replied. \"You ask me why I saved you.", 1) + poeNote("He holds out a little metal whistle. “Take it. When you want me, when you would have me come, and will not be too frightened at the sight of me, whistle. I can hear that.”"); },
function (f) {
ndWarm(9);
poeNdTime("night");
POE.ndShow = {};
poeRoomGet("x_ndrefuge");
poeCast("esme", "x_ndrefuge", 1.2, -0.6, Math.PI, { name: "La Esmeralda", role: "gypsy", sex: "f", look: { _seed: 1466, hair: 0x1A1210, hairStyle: "long", skin: 0xD8A880, top: 0xE8E0D0, bottom: 0xE8E0D0 }, talk: poeNdTalk("La Esmeralda", "Now in sanctuary in the little cell on the roof of Notre-Dame; still loves Phoebus and thinks of nothing else; pities Quasimodo but cannot look at him; frightened of the priest.") });
poeHide(POE.cast.esme);
var Q = poeNdQuasi("x_ndrefuge", "quasi", -1.9, 0.4, -Math.PI / 2, {});
poeHide(Q);
poeCast("frollo", "x_ndrefuge", -0.6, 0.2, 0, { name: "Dom Claude Frollo", role: "priest15", sex: "m", look: { _seed: 1446, hair: 0x3A3028 }, talk: poeNdTalk("Dom Claude Frollo") });
poeHide(POE.cast.frollo);
},
function (on) {
var R = poeRoomGet("x_paris"), lite = POE.lite;
if (!R.ndAs && on) {
var g = poeNdMark(poeGrp(R.g, 0, 0, 0), 1482);
g.userData.ndShow = "assault";
R.mons.push(g);
R.ndAs = g;
var P = ndParvis(), px = P.x - R.x, pz = P.z, fl = [];
g.userData.parvis = [px, pz];
for (var t = 0; t < (lite ? 10 : 26); t++) {
var Rn = wRand(2000 + t), x = px - 12 + Rn() * 26, z = pz - 14 + Rn() * 28, tg = poeGrp(g, x, 0, z);
poeCyl(tg, 0.04, 0.05, 1.9, poeC(0x3A2A1A), 0, 0.95, 0, 5);
var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: ndFlameTex(), color: 0xFFA040, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.6 }));
s.scale.set(0.6, 1.1, 1);
s.position.y = 2.2;
tg.add(s);
fl.push(s);
}
g.userData.flames = fl;
var bm = poeCyl(g, 0.35, 0.35, 9, poeS("oak", 0x5A4028), 0, 0, 0, 8);
bm.rotation.z = Math.PI / 2;
bm.visible = false;
g.userData.beam = bm;
var C = POE_PAR_MON.nd, Fr = POE_PAR_MON.ndFront, a = Math.atan2(C[1] - Fr[1], C[0] - Fr[0]);
g.userData.lead = [-6, 6].map(function (lz) { var p = poeNdTopAt(-68, lz), s = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.4, 43, 8, 1, true), poeGlowM(0xFFB040, 0.85)); s.position.set(p[0], 21.5, p[1]); s.visible = false; g.add(s); return s; });
var fire = [];
for (var f = 0; f < (lite ? 4 : 9); f++) {
var p2 = poeNdTopAt(-63, -9 + f * 2.2), s2 = new THREE.Sprite(new THREE.SpriteMaterial({ map: ndFlameTex(), color: 0xFF9030, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.7 }));
s2.scale.set(2.4, 4.4, 1);
s2.position.set(p2[0], 46, p2[1]);
s2.visible = false;
g.add(s2);
fire.push(s2);
}
g.userData.fire = fire;
var gl = wGlow(0xFF8030, 30, 0.5);
gl.position.set(poeNdTopAt(-62, 0)[0], 46, poeNdTopAt(-62, 0)[1]);
gl.visible = false;
g.add(gl);
g.userData.glow = gl;
var t0 = 0;
poeEvery(function (dt) { if (!g.parent)
return false; if (!g.visible)
return; t0 += dt; fl.forEach(function (s, i) { s.scale.y = 1.1 + 0.15 * Math.sin(t0 * 3 + i); }); fire.forEach(function (s, i) { s.scale.y = 4.4 + 0.5 * Math.sin(t0 * 2 + i); }); });
}
if (R.ndAs) {
POE.ndShow.assault = on ? 1 : 0;
}
},
function (k, on) {
var g = POE_RX.x_paris && POE_RX.x_paris.ndAs;
if (!g)
return;
var U = g.userData;
if (k === "beam" && U.beam) {
var P = U.parvis, b = U.beam;
b.visible = true;
var t = 0;
b.position.set(P[0] + 6, 44, P[1]);
poeEvery(function (dt) { t += dt; var y = Math.max(0.35, 44 - 4.9 * t * t * (window.POE_FAST ? 50 : 1)); b.position.y = y; if (y <= 0.35) {
poeSfx("crash");
return false;
} });
}
if (k === "lead" && U.lead)
U.lead.forEach(function (s) { s.visible = on; });
if (k === "fire" && U.fire) {
U.fire.forEach(function (s) { s.visible = on; });
U.glow.visible = on;
}
},
function (on) {
var P = ndParvis();
if (!P)
return;
var R = POE_RX.x_paris, px = P.x - R.x, pz = P.z, n = POE.lite ? 6 : 14;
for (var i = 0; i < n; i++) {
var k = "tru" + i;
if (on) {
var Rn = wRand(2100 + i), x = px - 10 + Rn() * 20, z = pz - 10 + Rn() * 20;
poeCast(k, "x_paris", x, z, P.ry + Math.PI + (Rn() - 0.5), { name: i ? "A truand" : "Clopin Trouillefou", role: "truand", sex: i % 5 === 4 ? "f" : "m", look: { _seed: 2200 + i }, talk: poeNdTalk(i ? "A truand of the Cour des Miracles" : "Clopin Trouillefou", "Storming Notre-Dame by night with the whole Cour des Miracles to carry off la Esmeralda before the Parliament can hang her; shouts, curses, brandishes a scythe or a pike.") });
POE.cast[k].g.visible = true;
}
else if (POE.cast[k])
poeHide(POE.cast[k]);
}
},
function (f) {
ndWarm(10);
poeNdTime("night");
POE.ndShow = { fire: 1 };
var C = ND_AT.miraclesClear;
poeCast("clopin", "x_paris", C[0] + 9, C[1] - 3.8, Math.PI * 0.9, { name: "Clopin Trouillefou", role: "truand", sex: "m", look: { _seed: 1461, hair: 0x3A2A1A, beard: "full", top: 0x6A4A2A }, talk: poeNdTalk("Clopin Trouillefou") });
POE.cast.clopin.g.visible = true;
poeCast("jehan", "x_paris", C[0] + 5, C[1] - 1, Math.PI, { name: "Jehan Frollo du Moulin", role: "archer", sex: "m", look: { _seed: 1472, hair: 0xC89848 }, talk: poeNdTalk("Jehan Frollo du Moulin", "Tonight drunk, in a suit of armour, marching with the truands on Notre-Dame; boasting, quoting Latin, shouting 'Long live mirth!'.") });
POE.cast.jehan.g.visible = true;
poeCast("louis", "x_ndbastille", 0.4, -2.8, 0, { name: "King Louis XI", role: "m15", sex: "m", look: { _seed: 1711, hair: 0x9A9A9A, top: 0x5A5A5A, bottom: 0x4A4A4A }, talk: poeNdTalk("King Louis XI", "King of France, sixty, ailing, miserly, cunning, devout in his own fashion; in his retreat in the Bastille, checking accounts; says 'Pasque-Dieu!'; once visited Dom Claude as 'Gossip Tourangeau'.") });
POE.cast.louis.g.visible = true;
poeCast("olivier", "x_ndbastille", -1.4, -1.8, Math.PI * 0.3, { name: "Master Olivier le Daim", role: "rich15", sex: "m", look: { _seed: 1770, hair: 0x3A3028 }, talk: poeNdTalk("Master Olivier le Daim", "The king's barber, sly and grasping; reads out the accounts; talks about the king's expenses.") });
POE.cast.olivier.g.visible = true;
poeCast("coppenole", "x_ndbastille", 2.0, -2.2, -Math.PI * 0.3, { name: "Master Jacques Coppenole", role: "fleming", sex: "m", look: { _seed: 1473, hair: 0x5A4A3A, beard: "short", top: 0x3A2A1A }, talk: poeNdTalk("Master Jacques Coppenole") });
POE.cast.coppenole.g.visible = true;
},
function (f) {
ndWarm(11);
poeNdTime("night");
POE.ndShow = {};
poeRoomGet("x_ndvault");
var V = POE_RX.x_ndvault;
if (V && V.pair)
V.pair.visible = false;
poeCast("esme", "x_paris", 0, 0, 0, { name: "La Esmeralda", role: "gypsy", sex: "f", look: { _seed: 1466, hair: 0x1A1210, hairStyle: "long", skin: 0xD8A880, top: 0xE8E0D0, bottom: 0xE8E0D0 }, talk: poeNdTalk("La Esmeralda") });
poeHide(POE.cast.esme);
poeCast("frollo", "x_paris", 0, 0, 0, { name: "Dom Claude Frollo", role: "priest15", sex: "m", look: { _seed: 1446, hair: 0x3A3028, _cowl: 1 }, talk: poeNdTalk("Dom Claude Frollo") });
poeHide(POE.cast.frollo);
poeCast("tristan", "x_paris", 0, 0, 0, { name: "Tristan l'Hermite", role: "archer", sex: "m", look: { _seed: 1780, hair: 0x5A5A5A, top: 0x2A2A2A }, talk: poeNdTalk("Tristan l'Hermite", "Provost of the marshals, the king's grim hangman-in-chief, hunting the gypsy at dawn with his archers; terse and pitiless.") });
poeHide(POE.cast.tristan);
var R = POE_RX.x_paris;
poeSpotOnce("nd:rat", R.x + ND_AT.ratHole[0] + 1.4, ND_AT.ratHole[1], 2, "The Rat-Hole", "look in at the grating", function () { poeHook("ndRat"); }, 0);
},
function (x, z, r) {
if (poeRoadD(x, z) < 4 + r)
return false;
var y = poeLand(x, z);
for (var a = 0; a < 6; a++) {
var px = x + Math.cos(a * 1.047) * r, pz = z + Math.sin(a * 1.047) * r;
if (poeSolidAt(px, pz, y + 0.3))
return false;
if (poeFloorAt(px, pz, y + 2) !== null)
return false;
if (Math.abs(poeLand(px, pz) - y) > 1)
return false;
}
if (typeof poeTarnIn === "function" && poeTarnIn(x, z) < 1.8)
return false;
return !poeSolidAt(x, z, y + 0.3);
},
function (P, x, z) {
var y = poeLand(x, z), g = poeGrp(P, x, y, z), ir = poeShine(0x1E1C1A, 0.6, 0.7);
poeCyl(g, 0.12, 0.16, 0.4, ir, 0, 0.2, 0, 8);
poeCyl(g, 0.05, 0.07, 3.4, ir, 0, 1.9, 0, 8);
poeBox(g, 0.34, 0.06, 0.34, ir, 0, 3.62, 0);
poeBox(g, 0.24, 0.42, 0.24, poeGlowM(0xFFD49A, 0.92), 0, 3.86, 0);
poeCone(g, 0.26, 0.24, ir, 0, 4.18, 0);
var gl = wGlow(0xFFB868, 3.4, 0.5);
gl.position.set(0, 3.86, 0);
g.add(gl);
poeSolid(x, z, 0.4, 0.4, y - 2, y + 4.2);
},
function (P, x, z, ry, stone) {
var y = poeLand(x, z), g = poeGrp(P, x, y, z, ry), m = stone ? poeS("stone", 0x9A948A) : poeC(POE_WOOD), ir = poeShine(0x1E1C1A, 0.6, 0.7);
poeBox(g, 1.7, 0.08, 0.45, m, 0, 0.45, 0);
if (!stone)
poeBox(g, 1.7, 0.4, 0.06, m, 0, 0.75, -0.2);
[-0.7, 0.7].forEach(function (s) { poeBox(g, stone ? 0.3 : 0.06, 0.45, 0.4, stone ? m : ir, s, 0.22, 0); });
poeSolid(x, z, 1.8, 0.6, y - 2, y + 1, ry);
},
function (P, x, z, n) {
var y = poeLand(x, z), m = poeC(0x5A3A22), hoop = poeShine(0x2A2622, 0.6, 0.6);
for (var i = 0; i < n; i++) {
var px = x + (i % 2) * 0.65, pz = z + Math.floor(i / 2) * 0.65;
poeCyl(P, 0.3, 0.3, 0.86, m, px, y + 0.43, pz, 10);
[0.14, 0.72].forEach(function (h) { poeCyl(P, 0.315, 0.315, 0.05, hoop, px, y + h, pz, 10); });
}
poeSolid(x + 0.3, z + 0.3, 1.4, 1.4, y - 2, y + 1);
},
function (P, x, z) {
var y = poeLand(x, z), st = poeS("stone", 0x8A847A), m = poeC(POE_WOOD);
poeCyl(P, 1.0, 1.05, 0.9, st, x, y + 0.45, z, 14);
poeCyl(P, 0.85, 0.85, 0.02, poeC(0x050608), x, y + 0.86, z, 14);
[-1, 1].forEach(function (s) { poeBox(P, 0.12, 1.7, 0.12, m, x + s * 0.88, y + 1.7, z); });
poeBox(P, 1.9, 0.12, 0.12, m, x, y + 2.55, z);
poeSolid(x, z, 2.2, 2.2, y - 2, y + 1.2);
},
function (P, cx, cz, r0, r1, n, seed) {
var R = wRand(seed);
n = POE.lite ? Math.ceil(n / 2) : n;
for (var i = 0, t = 0; i < n && t < n * 15; t++) {
var a = R() * 6.283, d = r0 + R() * (r1 - r0), x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
if (!poeSwFree(x, z, 0.5))
continue;
var f = R() < 0.45;
poePerson("sw" + seed + "_" + i, x, z, R() * 6.28, { sex: f ? "f" : "m", look: { _seed: seed + i, topKind: f ? "dress" : "robe", top: [0x2A2430, 0x3A2A2A, 0x22262E, 0x3A3428][i % 4], hat: f ? "hood" : "tophat", hatColor: 0x1A1A1E }, wander: { r: 7, sp: 0.6 } }, P);
i++;
}
},
function (G, cx, cz, o, seed) {
var P = new THREE.Group();
G.add(P);
POE.districts.push({ g: P, x: cx, z: cz, r: 260 });
var R = wRand(seed), lite = POE.lite, list = o.things, want = lite ? list.length : list.length * 2;
for (var i = 0, t = 0; i < want && t < want * 30; t++) {
var kind = list[i % list.length], a = R() * 6.283, d = o.r0 + R() * (o.r1 - o.r0), x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
if (!poeSwFree(x, z, kind === "well" ? 1.6 : 1.1))
continue;
var face = Math.atan2(cx - x, cz - z);
if (kind === "lamp")
poeSwLamp(P, x, z);
else if (kind === "bench")
poeSwBench(P, x, z, face, false);
else if (kind === "sbench")
poeSwBench(P, x, z, face, true);
else if (kind === "cask")
poeSwCask(P, x, z, 3);
else if (kind === "crates")
poeSwCrates(P, x, z, face);
else if (kind === "well")
poeSwWell(P, x, z);
else if (kind === "urn")
poeSwUrn(P, x, z);
i++;
}
var nL = 0;
POE_ROADS.forEach(function (rd) {
for (var k = 1; k < rd.length; k++) {
var a2 = rd[k - 1], b = rd[k], L = Math.hypot(b[0] - a2[0], b[1] - a2[1]);
for (var s = 0; s < L; s += 22) {
var px = a2[0] + (b[0] - a2[0]) * s / L, pz = a2[1] + (b[1] - a2[1]) * s / L;
if (Math.hypot(px - cx, pz - cz) > o.road)
continue;
if (lite && nL % 2) {
nL++;
continue;
}
var side = nL % 2 ? 1 : -1, nx = -(b[1] - a2[1]) / L * side * 5, nz = (b[0] - a2[0]) / L * side * 5;
nL++;
var lx = px + nx, lz = pz + nz;
if (poeSolidAt(lx, lz, poeLand(lx, lz) + 0.3) || poeFloorAt(lx, lz, poeLand(lx, lz) + 2) !== null)
continue;
poeSwLamp(P, lx, lz);
}
}
});
poeSwWalkers(P, cx, cz, o.r0, o.r1, o.folk || 5, seed + 7);
},
function (G) {
var A = POE_AT;
poeSwPlace(G, -756, 764, { r0: 10, r1: 45, road: 120, things: ["cask", "bench", "lamp", "crates", "cask", "bench", "lamp", "cask"], folk: 7 }, 1846);
poeSwPlace(G, A.heart.x, A.heart.z, { r0: 8, r1: 40, road: 130, things: ["lamp", "bench", "crates", "lamp", "bench", "well", "lamp"], folk: 6 }, 1843);
poeSwPlace(G, -979, 173, { r0: 10, r1: 40, road: 120, things: ["sbench", "well", "lamp", "sbench", "urn", "lamp"], folk: 4 }, 1842);
poeSwPlace(G, A.usher.x, A.usher.z + 100, { r0: 12, r1: 50, road: 140, things: ["lamp", "urn", "sbench", "lamp"], folk: 3 }, 1839);
poeSwPlace(G, 470, 1161, { r0: 8, r1: 40, road: 140, things: ["lamp", "bench", "crates", "lamp", "bench", "crates", "lamp"], folk: 6 }, 1841);
poeSwPlace(G, 22, -928, { r0: 10, r1: 45, road: 140, things: ["urn", "lamp", "sbench", "urn", "lamp", "sbench"], folk: 5 }, 1842);
poeSwPlace(G, 4, 533, { r0: 8, r1: 35, road: 90, things: ["lamp", "bench", "urn", "lamp"], folk: 4 }, 1845);
poeSwPlace(G, 463, 1024, { r0: 8, r1: 35, road: 60, things: ["bench", "crates", "lamp", "bench"], folk: 4 }, 1844);
},
function (parts) {
var n = 0, list = parts.map(function (p) { var g = p[0].index ? p[0].toNonIndexed() : p[0]; if (!g.attributes.normal)
g.computeVertexNormals(); n += g.attributes.position.count; return [g, new THREE.Color(p[1])]; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), col = new Float32Array(n * 3), o = 0;
list.forEach(function (q) { var g = q[0], P = g.attributes.position, N = g.attributes.normal, c = P.count; pos.set(P.array.subarray(0, c * 3), o * 3); nor.set(N.array.subarray(0, c * 3), o * 3); for (var i = 0; i < c; i++) {
col[(o + i) * 3] = q[1].r;
col[(o + i) * 3 + 1] = q[1].g;
col[(o + i) * 3 + 2] = q[1].b;
} o += c; });
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(pos, 3));
G.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
G.setAttribute("color", new THREE.BufferAttribute(col, 3));
G.computeBoundingSphere();
return G;
},
function (r, x, y, z) {
var g = new THREE.TorusGeometry(r, 0.035, 4, POE.lite ? 10 : 16);
g.rotateY(Math.PI / 2);
g.translate(x, y, z);
var parts = [[g, 0x2A1E14]];
for (var s = 0; s < (POE.lite ? 4 : 8); s++) {
var sp = new THREE.BoxGeometry(0.03, r * 2, 0.03);
sp.rotateX(s * Math.PI / (POE.lite ? 4 : 8));
sp.translate(x, y, z);
parts.push([sp, 0x3A2A1A]);
}
parts.push([poeLfC(0.07, 0.07, 0.12, 8, x, y, z, 0, Math.PI / 2), 0x1A1410]);
return parts;
},
function () {
if (POE_LF.fiacre)
return POE_LF;
var P;
P = [[poeLfB(1.5, 1.2, 1.9, 0, 1.45, 0), 0x1E1E1C], [poeLfB(1.52, 0.42, 1.92, 0, 1.08, 0), 0x8A6A1E], [poeLfB(1.3, 0.08, 2.1, 0, 2.1, 0), 0x141414], [poeLfB(0.06, 0.5, 0.7, 0.77, 1.55, 0), 0x3A4A5A], [poeLfB(0.06, 0.5, 0.7, -0.77, 1.55, 0), 0x3A4A5A],
[poeLfB(1.2, 0.5, 0.7, 0, 1.75, 1.25), 0x1E1E1C], [poeLfB(1.1, 0.1, 0.5, 0, 2.02, 1.3), 0x2A2018], [poeLfB(0.1, 0.06, 2.6, 0.45, 0.9, 2.1), 0x2A2018], [poeLfB(0.1, 0.06, 2.6, -0.45, 0.9, 2.1), 0x2A2018], [poeLfB(1.6, 0.12, 3.0, 0, 0.62, 0.3), 0x1A1410]];
[[0.75, 0.62, -0.75], [-0.75, 0.62, -0.75], [0.72, 0.45, 1.0], [-0.72, 0.45, 1.0]].forEach(function (w) { P = P.concat(poeLfWheel(w[1], w[0], w[1], w[2])); });
P.push([poeLfC(0.06, 0.06, 0.25, 6, 0.82, 2.0, 1.45), 0xFFD08A]);
P.push([poeLfC(0.06, 0.06, 0.25, 6, -0.82, 2.0, 1.45), 0xFFD08A]);
P.push([poeLfC(0.34, 0.34, 1.5, 10, 0, 1.35, 3.4, Math.PI / 2), 0x4A3220], [poeLfC(0.18, 0.26, 0.9, 8, 0, 1.85, 4.15, -0.7), 0x4A3220], [poeLfB(0.24, 0.26, 0.6, 0, 2.15, 4.55, 0.6), 0x3A2618], [poeLfC(0.28, 0.3, 0.12, 10, 0, 1.6, 4.0, -0.7), 0x1A1410], [poeLfC(0.05, 0.1, 0.7, 6, 0, 1.15, 2.55, 0.5), 0x1A1410]);
[[0.18, 2.85], [-0.18, 2.85], [0.18, 3.95], [-0.18, 3.95]].forEach(function (l) { P.push([poeLfC(0.06, 0.07, 1.05, 6, l[0], 0.55, l[1]), 0x3A2618]); });
POE_LF.fiacre = poeLfMerge(P);
P = [[poeLfB(1.5, 0.12, 2.8, 0, 0.95, 0), 0x6A4A2A], [poeLfB(0.08, 0.45, 2.8, 0.72, 1.2, 0), 0x5A3A1E], [poeLfB(0.08, 0.45, 2.8, -0.72, 1.2, 0), 0x5A3A1E], [poeLfB(0.08, 0.08, 2.4, 0.45, 0.5, 2.3, 0.38), 0x5A3A1E], [poeLfB(0.08, 0.08, 2.4, -0.45, 0.5, 2.3, 0.38), 0x5A3A1E]];
P = P.concat(poeLfWheel(0.85, 0.82, 0.85, -0.1), poeLfWheel(0.85, -0.82, 0.85, -0.1));
[[0.35, -0.8], [-0.35, -0.8], [0.35, 0.1], [-0.35, 0.1], [0, 0.9]].forEach(function (c) { P.push([poeLfC(0.3, 0.3, 0.7, 10, c[0], 1.35, c[1], 0, Math.PI / 2), 0x7A4A2A]); P.push([poeLfC(0.31, 0.31, 0.06, 10, c[0] + 0.22, 1.35, c[1], 0, Math.PI / 2), 0x2A2A2A]); });
POE_LF.cart = poeLfMerge(P);
P = [[poeLfB(0.9, 0.1, 1.7, 0, 0.75, 0), 0x6A4A2A], [poeLfB(0.06, 0.22, 1.7, 0.42, 0.86, 0), 0x5A3A1E], [poeLfB(0.06, 0.22, 1.7, -0.42, 0.86, 0), 0x5A3A1E], [poeLfB(0.05, 0.05, 1.0, 0.3, 0.7, 1.2), 0x5A3A1E], [poeLfB(0.05, 0.05, 1.0, -0.3, 0.7, 1.2), 0x5A3A1E], [poeLfB(0.05, 0.7, 0.05, 0.3, 0.35, -0.7), 0x5A3A1E], [poeLfB(0.05, 0.7, 0.05, -0.3, 0.35, -0.7), 0x5A3A1E]];
P = P.concat(poeLfWheel(0.38, 0.5, 0.38, 0.35), poeLfWheel(0.38, -0.5, 0.38, 0.35));
[[0x4A7A2A, -0.5], [0xC86A2A, 0], [0x8A2A2A, 0.5]].forEach(function (v) { P.push([poeLfB(0.75, 0.18, 0.45, 0, 0.92, v[1]), v[0]]); });
POE_LF.barrow = poeLfMerge(P);
P = [[poeLfB(2.6, 0.08, 1.2, 0, 0.85, 0), 0x7A5A3A], [poeLfB(0.08, 0.85, 1.0, 1.2, 0.42, 0), 0x5A3A1E], [poeLfB(0.08, 0.85, 1.0, -1.2, 0.42, 0), 0x5A3A1E]];
[[1.3, 0.6], [-1.3, 0.6], [1.3, -0.6], [-1.3, -0.6]].forEach(function (p) { P.push([poeLfC(0.035, 0.035, 2.4, 6, p[0], 1.2, p[1]), 0x3A2A1A]); });
P.push([poeLfB(3.0, 0.06, 1.8, 0, 2.45, 0, 0.12), 0xD8CCB0]);
[[0x6A9A3A, -0.9], [0xD8A02A, -0.3], [0xA82A2A, 0.3], [0xE0D8B8, 0.9]].forEach(function (v, i) { P.push([poeLfB(0.55, 0.22, 0.45, v[1], 1.0, -0.15), 0x6A4A2A]); P.push([poeLfB(0.5, 0.08, 0.4, v[1], 1.12, -0.15), v[0]]); });
[-0.8, 0.2, 1.0].forEach(function (x) { P.push([poeLfC(0.24, 0.18, 0.3, 8, x, 0.15, 0.8), 0x8A6A3A]); });
POE_LF.stall = poeLfMerge(P);
POE_LF.mat = new THREE.MeshLambertMaterial({ vertexColors: true });
return POE_LF;
},
function (k) {
var key = "lfAwn" + k;
if (POE.mats[key])
return POE.mats[key];
var C = [["#B83A2A", "#E8DCC0"], ["#2A4A6A", "#E0D8C4"], ["#3A5A2E", "#E4D8B8"], ["#8A2A3A", "#D8C8A4"]][k];
var t = wTex(128, 64, function (x, W, H) { for (var i = 0; i < 8; i++) {
x.fillStyle = C[i % 2];
x.fillRect(i * W / 8, 0, W / 8, H);
} x.fillStyle = "rgba(0,0,0,.18)"; x.fillRect(0, H * 0.82, W, H * 0.18); for (var j = 0; j < 300; j++) {
x.fillStyle = "rgba(0,0,0," + (Math.random() * 0.06) + ")";
x.fillRect(Math.random() * W, Math.random() * H, 2, 2);
} });
t.wrapS = t.wrapT = THREE.RepeatWrapping;
var m = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide });
return (POE.mats[key] = m);
},
function () {
if (POE.mats.lfWash)
return POE.mats.lfWash;
var t = wTex(256, 128, function (x, W, H) {
x.clearRect(0, 0, W, H);
x.strokeStyle = "#2A2420";
x.lineWidth = 2;
x.beginPath();
x.moveTo(0, 8);
x.quadraticCurveTo(W / 2, 16, W, 8);
x.stroke();
var cols = ["#E8E4DA", "#D8D0C0", "#B8C4D0", "#E0C8B8", "#C8B890", "#F0ECE4", "#9AA8B8"], X = 6, k = 0;
while (X < W - 20) {
var w = 18 + ((k * 37) % 30), c = cols[k % cols.length], y0 = 9 + Math.sin(X / W * Math.PI) * 7;
x.fillStyle = c;
if (k % 3 === 0) {
x.fillRect(X, y0, w, H * 0.55);
x.fillStyle = "rgba(0,0,0,.12)";
x.fillRect(X, y0 + H * 0.5, w, 3);
}
else if (k % 3 === 1) {
x.beginPath();
x.moveTo(X, y0);
x.lineTo(X + w, y0);
x.lineTo(X + w + 5, y0 + 12);
x.lineTo(X + w - 3, y0 + 14);
x.lineTo(X + w - 3, y0 + 44);
x.lineTo(X + 3, y0 + 44);
x.lineTo(X + 3, y0 + 14);
x.lineTo(X - 5, y0 + 12);
x.closePath();
x.fill();
}
else {
x.fillRect(X, y0, w * 0.4, 40);
x.fillRect(X + w * 0.55, y0, w * 0.4, 40);
x.fillRect(X, y0, w * 0.95, 10);
}
x.fillStyle = "#3A2A1A";
x.fillRect(X + 2, y0 - 3, 2, 5);
x.fillRect(X + w - 4, y0 - 3, 2, 5);
X += w + 6 + ((k * 13) % 10);
k++;
}
});
t.wrapS = THREE.RepeatWrapping;
var m = new THREE.MeshLambertMaterial({ map: t, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide });
return (POE.mats.lfWash = m);
},
function (K) {
if (!K || !K.g || K.empty)
return;
var G = POE_PAR, C = G.CH, x0 = K.cx * C, z0 = K.cz * C, lite = POE.lite, M = poeLfModels(), D = POE_PAR_D, x, z, i;
function T(a, b) { var v = poeParT(a, b); return v === -1 ? 2 : v; }
var aw = [poeParBatch(), poeParBatch(), poeParBatch(), poeParBatch()], ws = poeParBatch(), props = [], lamps = [], anyAw = false, anyWs = false, lg = new THREE.Group();
K.g.add(lg);
for (z = z0; z < z0 + C; z++)
for (x = x0; x < x0 + C; x++) {
var t = T(x, z), lx = x - x0, lz = z - z0;
if (t === 1) {
var pl = poeParPlot(x, z);
if (pl % 3 === 1 || (lite && pl % 2))
continue;
if (poeParCut(x, z, lx, lz, T))
continue;
var FL = POE_PAR_AT.flamel;
if (FL && Math.abs(x - FL.b[0]) < 8 && Math.abs(z - FL.b[1]) < 5)
continue;
for (i = 0; i < 4; i++) {
if (T(x + D[i][0], z + D[i][1]) !== 0)
continue;
var n = D[i], E = poeParEdge(lx, lz, i);
var y1 = 3.75, y2 = 3.05, o = 1.5, a0 = [E[0][0] + n[0] * 0.04, E[0][1] + n[1] * 0.04], a1 = [E[1][0] + n[0] * 0.04, E[1][1] + n[1] * 0.04], b0 = [E[0][0] + n[0] * o, E[0][1] + n[1] * o], b1 = [E[1][0] + n[0] * o, E[1][1] + n[1] * o], u0 = (x + z) % 8 / 8, B = aw[(pl >>> 4) % 4];
B.q([a0[0], y1, a0[1]], [a1[0], y1, a1[1]], [b1[0], y2, b1[1]], [b0[0], y2, b0[1]], [n[0] * 0.4, 0.9, n[1] * 0.4], u0, 0, u0 + 1 / 1.0 * 0.66, 0.82);
B.q([b0[0], y2, b0[1]], [b1[0], y2, b1[1]], [b1[0], y2 - 0.32, b1[1]], [b0[0], y2 - 0.32, b0[1]], [n[0], 0, n[1]], u0, 0.82, u0 + 0.66, 1);
anyAw = true;
}
continue;
}
if (t !== 0)
continue;
var hs = poeParHash(x * 5 + 3, z * 11 + 7);
if (hs % (lite ? 90 : 34) === 0)
for (i = 0; i < 2; i++) {
var d = D[i * 2], k1 = 0, k2 = 0;
for (var s = 1; s < 9; s++) {
if (T(x + d[0] * s, z + d[1] * s) === 1) {
k1 = s;
break;
}
}
for (s = 1; s < 9; s++) {
if (T(x - d[0] * s, z - d[1] * s) === 1) {
k2 = s;
break;
}
}
if (k1 && k2 && k1 + k2 <= 10 && k1 + k2 >= 4) {
var p0 = [lx + 0.5 + d[0] * (k1 - 0.5), lz + 0.5 + d[1] * (k1 - 0.5)], p1 = [lx + 0.5 - d[0] * (k2 - 0.5), lz + 0.5 - d[1] * (k2 - 0.5)], wy = 6.4 + (hs % 4) * 1.4, L = k1 + k2 - 1, nn = [d[1], -d[0]];
ws.q([p1[0], wy, p1[1]], [p0[0], wy, p0[1]], [p0[0], wy - 1.6, p0[1]], [p1[0], wy - 1.6, p1[1]], [nn[0], 0, nn[1]], 0, 1, L / 4, 0);
anyWs = true;
break;
}
}
if (hs % (lite ? 420 : 160) === 11) {
var wideX = T(x + 3, z) === 0 && T(x - 3, z) === 0, wideZ = T(x, z + 3) === 0 && T(x, z - 3) === 0, kerb = null;
for (i = 0; i < 4; i++) {
if (T(x + D[i][0] * 2, z + D[i][1] * 2) === 1 && T(x + D[i][0], z + D[i][1]) === 0) {
kerb = D[i];
break;
}
}
var kind = hs % 7 < 3 ? "fiacre" : hs % 7 < 5 ? "cart" : "barrow";
if (kerb && ((kerb[0] && wideZ) || (kerb[1] && wideX)))
props.push({ k: kind, x: lx + 0.5 + kerb[0] * 0.4, z: lz + 0.5 + kerb[1] * 0.4, ry: kerb[0] ? (hs % 2 ? 0 : Math.PI) : (hs % 2 ? Math.PI / 2 : -Math.PI / 2) });
}
else if (hs % (lite ? 700 : 260) === 29 && T(x + 5, z) === 0 && T(x - 5, z) === 0 && T(x, z + 5) === 0 && T(x, z - 5) === 0 && T(x + 4, z + 4) === 0 && T(x - 4, z - 4) === 0) {
props.push({ k: "stall", x: lx + 0.5, z: lz + 0.5, ry: (hs % 4) * Math.PI / 2 });
if (!lite && hs % 2)
props.push({ k: "barrow", x: lx + 2.5, z: lz + 1.5, ry: (hs % 3) });
}
else if (hs % (lite ? 500 : 190) === 41 && T(x + 2, z) === 0 && T(x - 2, z) === 0 && T(x, z + 2) === 0 && T(x, z - 2) === 0)
lamps.push([lx + 0.5, lz + 0.5]);
}
if (anyAw)
aw.forEach(function (B, j) { var m = B.mesh(poeLfAwnM(j), lg); if (m) {
m.material.map.repeat.set(1, 1);
} });
if (anyWs)
ws.mesh(poeLfWashM(), lg);
props.forEach(function (p) {
var m = new THREE.Mesh(M[p.k], M.mat);
m.position.set(p.x, 0, p.z);
m.rotation.y = p.ry;
m.userData.keepGeo = 1;
lg.add(m);
var r = p.k === "stall" ? 1.6 : p.k === "fiacre" ? 1.6 : 1.2;
poeLfSolid(x0 + p.x, z0 + p.z, r * 1.4, 3);
});
if (lamps.length) {
if (!POE_LF.post) {
POE_LF.post = poeLfMerge([[poeLfC(0.1, 0.16, 0.5, 8, 0, 0.25, 0), 0x1A1A18], [poeLfC(0.05, 0.07, 3.3, 8, 0, 2.1, 0), 0x1A1A18], [poeLfB(0.36, 0.06, 0.36, 0, 3.78, 0), 0x1A1A18], [poeLfC(0.2, 0.12, 0.5, 4, 0, 4.05, 0), 0xFFD49A], [poeLfC(0.02, 0.26, 0.24, 4, 0, 4.42, 0), 0x1A1A18]]);
}
lamps.forEach(function (l) { var m = new THREE.Mesh(POE_LF.post, M.mat); m.position.set(l[0], 0, l[1]); m.userData.keepGeo = 1; lg.add(m); poeLfSolid(x0 + l[0], z0 + l[1], 0.4, 4.4); });
var pts = wPoints(lamps.length, function (j) { return [lamps[j][0], 4.05, lamps[j][1]]; }, 0xFFB860, lite ? 3.0 : 3.6, true);
pts.material.map = typeof softGlow === "function" ? softGlow() : null;
pts.material.blending = THREE.AdditiveBlending;
pts.material.opacity = 0.8;
lg.add(pts);
}
},
function (K) {
if (!K || !K.g || K.empty)
return;
var G = POE_GRS, C = G.CH, x0 = K.cx * C, z0 = K.cz * C, lite = POE.lite, D = [[0, -1], [0, 1], [1, 0], [-1, 0]], x, z, i, nn = 0, nt = 0, flames = [], pools = [];
if (!G.cdGeo) {
G.cdGeo = new THREE.PlaneGeometry(0.8, 1.04);
G.cdMat = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, map: wTex(64, 96, function (x, W, H) {
x.clearRect(0, 0, W, H);
x.save();
x.beginPath();
x.moveTo(6, H);
x.lineTo(6, H * 0.35);
x.arc(W / 2, H * 0.35, W / 2 - 6, Math.PI, 0);
x.lineTo(W - 6, H);
x.closePath();
x.clip();
var g = x.createRadialGradient(W / 2, H * 0.8, 2, W / 2, H * 0.7, H * 0.75);
g.addColorStop(0, "rgba(255,214,140,1)");
g.addColorStop(0.35, "rgba(200,130,60,.95)");
g.addColorStop(0.75, "rgba(70,40,20,.95)");
g.addColorStop(1, "rgba(18,12,8,.95)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(10,8,6,.55)";
x.fillRect(0, 0, W, H * 0.22);
x.restore();
x.fillStyle = "#FFF4D0";
x.beginPath();
x.ellipse(W / 2, H * 0.72, 3, 7, 0, 0, 7);
x.fill();
x.fillStyle = "#E8E0C8";
x.fillRect(W / 2 - 4, H * 0.78, 8, H * 0.18);
}) });
G.cdLip = new THREE.BoxGeometry(0.88, 0.1, 0.34);
G.cdStone = poeCatMat("catstone", 0xC8BCA0);
G.cdCan = new THREE.CylinderGeometry(0.045, 0.05, 0.22, 8);
G.cdCanM = new THREE.MeshLambertMaterial({ color: 0xE8E0C8, emissive: 0x3A3020 });
G.cdFl = new THREE.SphereGeometry(0.032, 6, 5);
G.cdFl.scale(1, 1.8, 1);
G.cdFlM = new THREE.MeshBasicMaterial({ color: 0xFFD890 });
G.cdTab = {};
G.cdSkull = null;
}
for (z = z0; z < z0 + C; z++)
for (x = x0; x < x0 + C; x++) {
var t = poeGrsT(x, z);
if (!(t === 1 || t === 2 || t === 7))
continue;
var hs = poeGrsHash(x * 3 + 1, z * 5 + 2);
var oss = x > -420 && x < -225 && z > 770 && z < 905;
for (i = 0; i < 4; i++) {
var d = D[i], wt = poeGrsT(x + d[0], z + d[1]);
var stoneW = wt === 0 || wt === 3 || wt === 4 || wt === 5;
if (!(wt === 6 || (oss && wt !== 1 && wt !== 2 && wt !== 7 && wt !== -1) || stoneW))
continue;
if (G.fixed && G.fixed[x + "," + z])
break;
var wx = x - G.CX + 0.5 + d[0] * 0.5, wz = z - G.CZ + 0.5 + d[1] * 0.5, ry = Math.atan2(-d[0], -d[1]);
var near = false;
if (G.fixed)
for (var fx = -3; fx <= 3 && !near; fx++)
for (var fz = -3; fz <= 3; fz++)
if (G.fixed[(x + fx) + "," + (z + fz)]) {
near = true;
break;
}
if (near)
break;
if (hs % (lite ? (oss ? 13 : (stoneW ? 61 : 41)) : (oss ? 6 : (stoneW ? 23 : 17))) === 3 && nn < (lite ? (oss ? 6 : 3) : (oss ? 30 : 9))) {
nn++;
var g = new THREE.Group();
g.position.set(wx - d[0] * 0.02, 1.35, wz - d[1] * 0.02);
g.rotation.y = ry;
K.g.add(g);
var nic = new THREE.Mesh(G.cdGeo, G.cdMat);
nic.position.set(0, 0.06, 0.012);
g.add(nic);
var lip = new THREE.Mesh(G.cdLip, G.cdStone);
lip.position.set(0, -0.42, 0.07);
g.add(lip);
var cn = new THREE.Mesh(G.cdCan, G.cdCanM);
cn.position.set(0, -0.26, 0.08);
g.add(cn);
var fl = new THREE.Mesh(G.cdFl, G.cdFlM);
fl.position.set(0, -0.1, 0.08);
g.add(fl);
flames.push([wx - d[0] * 0.12, 1.25, wz - d[1] * 0.12]);
pools.push([wx - d[0] * 0.006, wz - d[1] * 0.006, ry]);
}
else if (!stoneW || oss)
if (hs % (lite ? 131 : (oss ? 23 : 53)) === 7 && nt < (lite ? 1 : (oss ? 4 : 2))) {
nt++;
var v = (hs >>> 3) % POE_CD_VERSES.length, s0 = G.cdTab[v] || (G.cdTab[v] = wSign(POE_CD_VERSES[v], 1.1, 0.2 + 0.14 * POE_CD_VERSES[v].length, "#D8D0BC", "#2A2018"));
var tb = new THREE.Mesh(s0.geometry, s0.material);
tb.position.set(wx - d[0] * 0.03, 1.55, wz - d[1] * 0.03);
tb.rotation.y = ry;
tb.userData.keep = 1;
K.g.add(tb);
var fr = new THREE.Mesh(G.cdLip, G.cdStone);
fr.scale.set(2.0, 1.0, 0.6);
fr.position.set(wx - d[0] * 0.06, 1.55 - 0.13 - 0.07 * POE_CD_VERSES[v].length, wz - d[1] * 0.06);
fr.rotation.y = ry;
K.g.add(fr);
}
break;
}
}
if (pools.length) {
if (!G.cdPoolGeo) {
G.cdPoolGeo = new THREE.PlaneGeometry(3.4, 3.0);
G.cdPoolM = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: lite ? 0.7 : 0.9, map: wTex(64, 64, function (x, W, H) { var gr = x.createRadialGradient(W / 2, H * 0.58, 1, W / 2, H * 0.58, W * 0.5); gr.addColorStop(0, "rgba(255,176,90,1)"); gr.addColorStop(0.4, "rgba(235,130,55,.5)"); gr.addColorStop(1, "rgba(200,100,40,0)"); x.fillStyle = gr; x.fillRect(0, 0, W, H); }) });
G.cdFloorGeo = new THREE.PlaneGeometry(3.0, 2.2);
G.cdFloorGeo.rotateX(-Math.PI / 2);
G.cdFloorGeo.translate(0, 0.02, 1.0);
}
var M = new THREE.Matrix4(), Q = new THREE.Quaternion(), V = new THREE.Vector3(), S1 = new THREE.Vector3(1, 1, 1), E = new THREE.Euler(), iw = new THREE.InstancedMesh(G.cdPoolGeo, G.cdPoolM, pools.length), ifl = new THREE.InstancedMesh(G.cdFloorGeo, G.cdPoolM, pools.length);
pools.forEach(function (p, j) { E.set(0, p[2], 0); Q.setFromEuler(E); V.set(p[0], 1.35, p[1]); M.compose(V, Q, S1); iw.setMatrixAt(j, M); V.set(p[0], 0, p[1]); M.compose(V, Q, S1); ifl.setMatrixAt(j, M); });
iw.renderOrder = 2;
ifl.renderOrder = 2;
K.g.add(iw);
K.g.add(ifl);
}
var pc = [];
for (z = z0; z < z0 + C; z++)
for (x = x0; x < x0 + C; x++) {
var tp = poeGrsT(x, z);
if (tp === 1 || tp === 2 || tp === 7 || tp === -1 || tp === 6)
continue;
var no = 0, hh = 0, mk = 0;
for (i = 0; i < 4; i++) {
var ot = poeGrsT(x + D[i][0], z + D[i][1]);
if (ot === 1 || ot === 2 || ot === 7) {
no++;
mk |= 1 << i;
hh = Math.max(hh, poeGrsH(ot));
}
}
if (no >= 2 && !(mk === 3 || mk === 12) && pc.length < (lite ? 20 : 90))
pc.push([x - G.CX + 0.5, z - G.CZ + 0.5, hh, mk]);
}
if (pc.length) {
if (!G.cdPierGeo) {
G.cdPierGeo = new THREE.BoxGeometry(1.12, 0.34, 1.12);
G.cdPierM = poeCatMat("catstone", 0xB8AE96);
}
var M2 = new THREE.Matrix4(), ip = new THREE.InstancedMesh(G.cdPierGeo, G.cdPierM, pc.length * 2);
pc.forEach(function (p, j) { M2.makeTranslation(p[0], 0.17, p[1]); ip.setMatrixAt(j * 2, M2); M2.makeTranslation(p[0], p[2] - 0.17, p[1]); ip.setMatrixAt(j * 2 + 1, M2); });
K.g.add(ip);
if (!lite) {
if (!G.cdBlkGeo) {
G.cdBlkGeo = new THREE.BoxGeometry(1, 1, 1);
G.cdBlkM = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: poeCatMat("catrock", 0xFFFFFF).map });
}
var bl = [], col = new THREE.Color();
pc.forEach(function (p, j) {
var hs2 = poeGrsHash(p[0] * 7 | 0, p[1] * 13 | 0);
for (var c = 0; c * 0.42 + 0.34 < p[2] - 0.34 && bl.length < 3000; c++) {
var y = 0.34 + c * 0.42 + 0.21;
for (var f = 0; f < 4; f++) {
var nx = [0, 0, 1, -1][f], nz = [-1, 1, 0, 0][f], tx = -nz, tz = nx;
if (!(p[3] & (1 << f)))
continue;
((c + f) % 2 ? [[-0.38, 0.22], [0, 0.48], [0.38, 0.22]] : [[-0.25, 0.47], [0.25, 0.47]]).forEach(function (b, q) { var o = b[0], w = b[1]; bl.push([p[0] + nx * 0.52 + tx * o, y, p[1] + nz * 0.52 + tz * o, f < 2 ? w : 0.1, f < 2 ? 0.1 : w, (hs2 + c * 5 + f * 3 + q) % 7]); });
}
}
});
if (bl.length) {
var ib = new THREE.InstancedMesh(G.cdBlkGeo, G.cdBlkM, bl.length), M3 = new THREE.Matrix4(), Q3 = new THREE.Quaternion(), S3 = new THREE.Vector3(), V3 = new THREE.Vector3();
bl.forEach(function (b, j) { V3.set(b[0], b[1], b[2]); S3.set(b[3], 0.38, b[4]); M3.compose(V3, Q3, S3); ib.setMatrixAt(j, M3); col.setRGB(0.78 + b[5] * 0.025, 0.74 + b[5] * 0.022, 0.64 + b[5] * 0.02); ib.setColorAt(j, col); });
K.g.add(ib);
}
}
}
if (!lite) {
if (!G.cdSkG) {
G.cdSkG = new THREE.SphereGeometry(0.105, 10, 8);
G.cdSkG.scale(0.9, 1.05, 1);
G.cdSkM = new THREE.MeshLambertMaterial({ map: wTex(128, 64, function (x, W, H) {
var gr = x.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, "#D8CCAA");
gr.addColorStop(1, "#8A7A5A");
x.fillStyle = gr;
x.fillRect(0, 0, W, H);
var fx = W * 0.25;
x.fillStyle = "#1A120A";
x.beginPath();
x.ellipse(fx - 8, H * 0.5, 5.5, 6.5, 0, 0, 7);
x.ellipse(fx + 8, H * 0.5, 5.5, 6.5, 0, 0, 7);
x.fill();
x.beginPath();
x.moveTo(fx, H * 0.6);
x.lineTo(fx - 3, H * 0.7);
x.lineTo(fx + 3, H * 0.7);
x.fill();
for (var t = -3; t <= 3; t++)
x.fillRect(fx + t * 2.4 - 0.8, H * 0.78, 1.4, H * 0.08);
}) });
}
var sk = [], hit = {};
for (z = z0; z < z0 + C; z++)
for (x = x0; x < x0 + C; x++) {
var t2 = poeGrsT(x, z);
if (!(t2 === 1 || t2 === 2 || t2 === 7))
continue;
if (G.fixed && G.fixed[x + "," + z])
continue;
for (i = 0; i < 4; i++) {
var d2 = D[i];
if (poeGrsT(x + d2[0], z + d2[1]) !== 6)
continue;
var cxw = x - G.CX + 0.5 + d2[0] * 0.44, czw = z - G.CZ + 0.5 + d2[1] * 0.44, ry2 = Math.atan2(-d2[0], -d2[1]), tx2 = -d2[1], tz2 = d2[0];
var nearN = false;
for (var q2 = 0; q2 < pools.length; q2++) {
if (Math.abs(pools[q2][0] - (cxw + d2[0] * 0.06)) < 0.6 && Math.abs(pools[q2][1] - (czw + d2[1] * 0.06)) < 0.6) {
nearN = true;
break;
}
}
[0.62, 1.92].forEach(function (y) { if (nearN && y > 1)
return; for (var s2 = 0; s2 < 4 && sk.length < 420; s2++) {
var o2 = -0.375 + s2 * 0.25;
sk.push([cxw + tx2 * o2, y, czw + tz2 * o2, ry2]);
} });
}
}
if (sk.length) {
var is = new THREE.InstancedMesh(G.cdSkG, G.cdSkM, sk.length), M4 = new THREE.Matrix4(), Q4 = new THREE.Quaternion(), S4 = new THREE.Vector3(1, 1, 1), V4 = new THREE.Vector3(), E4 = new THREE.Euler();
sk.forEach(function (p, j) { E4.set(0.08, p[3] + ((j * 37) % 9 - 4) * 0.04, 0); Q4.setFromEuler(E4); V4.set(p[0], p[1], p[2]); M4.compose(V4, Q4, S4); is.setMatrixAt(j, M4); });
K.g.add(is);
}
}
if (flames.length && typeof wPoints === "function") {
var pts = wPoints(flames.length, function (j) { return flames[j]; }, 0xFFB860, lite ? 1.4 : 1.9, true);
pts.material.map = typeof softGlow === "function" ? softGlow() : null;
pts.material.blending = THREE.AdditiveBlending;
pts.material.opacity = 0.85;
K.g.add(pts);
}
},
function (x, W, H) {
var R = wRand(171), rows = 5, rh = H / rows, r, i;
x.fillStyle = "#3A3226";
x.fillRect(0, 0, W, H);
for (r = 0; r < rows; r++) {
var y = r * rh, x0 = -(r % 2) * W / 6 - R() * W / 10;
while (x0 < W) {
var w = W / 4 + R() * W / 6, sh = 150 + R() * 40 | 0, j = 5;
x.fillStyle = "rgb(" + sh + "," + (sh - 10) + "," + (sh - 32) + ")";
x.fillRect(x0 + j, y + j, w - 2 * j, rh - 2 * j);
x.fillStyle = "rgba(255,246,220,.28)";
x.fillRect(x0 + j, y + j, w - 2 * j, 3);
x.fillStyle = "rgba(20,14,8,.4)";
x.fillRect(x0 + j, y + rh - j - 4, w - 2 * j, 4);
x.fillRect(x0 + w - j - 3, y + j, 3, rh - 2 * j);
x.strokeStyle = "rgba(70,58,40,.22)";
x.lineWidth = 1;
for (i = 0; i < w / 5; i++) {
var a = x0 + j + i * 5 + R() * 2;
x.beginPath();
x.moveTo(a, y + j + 2);
x.lineTo(a + rh * 0.35, y + rh - j - 2);
x.stroke();
}
x0 += w;
}
}
poeNz(x, W, H, 2500, 0.08, 172);
poeStain(x, W, H, 8, 174, "30,24,16", 0.28);
},
function (x, W, H) {
var R = wRand(271), i, r;
x.fillStyle = "#A39A84";
x.fillRect(0, 0, W, H);
poeNz(x, W, H, 7000, 0.14, 272);
poeNz(x, W, H, 3000, 0.12, 273, "240,230,200");
for (r = 0; r < 7; r++) {
var y = (r + 0.3 + R() * 0.4) * H / 7;
x.strokeStyle = "rgba(60,50,36,.4)";
x.lineWidth = 1.5 + R() * 1.5;
x.beginPath();
x.moveTo(0, y);
for (i = 1; i <= 8; i++)
x.lineTo(i * W / 8, y + (R() - 0.5) * 6);
x.stroke();
}
for (i = 0; i < 900; i++) {
var a = R() * W, b = R() * H, dir = ((b / (H / 9)) | 0) % 2 ? 1 : -1, L = 4 + R() * 8, an = dir * (0.5 + R() * 0.5);
x.strokeStyle = "rgba(50,40,28," + (0.1 + R() * 0.16) + ")";
x.lineWidth = 1 + R();
x.beginPath();
x.moveTo(a, b);
x.lineTo(a + Math.sin(an) * L, b + Math.cos(an) * L);
x.stroke();
x.strokeStyle = "rgba(250,240,214,.1)";
x.beginPath();
x.moveTo(a + 1.2, b);
x.lineTo(a + 1.2 + Math.sin(an) * L, b + Math.cos(an) * L);
x.stroke();
}
poeStain(x, W, H, 10, 274, "34,28,18", 0.3);
},
function (G) {
var A = POE_AT.morgue, cx = A.x + 40, gz = A.z - 30, lite = POE.lite, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: cx, z: gz, r: 300 });
var R = wRand(4401), trees = [];
for (var z = gz + 16; z < gz + 200; z += lite ? 20 : 11) {
[-1, 1].forEach(function (s) { poeBrTree(trees, cx + s * (10.5 + R() * 1.2), z + R() * 2, 0.85 + R() * 0.3); });
}
[[[22, 26], [180, 420], [330, 800], [420, 1000]], [[6, 506], [170, 640], [330, 800]]].forEach(function (rd) {
for (var k = 1; k < rd.length; k++) {
var a = rd[k - 1], b = rd[k], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
for (var t = 0; t < L; t += lite ? 24 : 13) {
var px = a[0] + (b[0] - a[0]) * t / L, pz = a[1] + (b[1] - a[1]) * t / L;
if (Math.hypot(px - cx, pz - gz) > 320)
continue;
[-1, 1].forEach(function (s) { poeBrTree(trees, px - (b[1] - a[1]) / L * s * 9, pz + (b[0] - a[0]) / L * s * 9, 0.8 + R() * 0.35); });
}
}
});
if (trees.length) {
var tg = new THREE.CylinderGeometry(0.2, 0.34, 5.0, 7);
tg.translate(0, 2.5, 0);
var cg = new THREE.IcosahedronGeometry(3.0, 1);
cg.scale(1, 1.25, 1);
cg.translate(0, 7.4, 0);
var cg2 = new THREE.IcosahedronGeometry(2.0, 1);
cg2.translate(1.4, 9.6, 0.6);
var leaf = null;
if (typeof poeR4Kit === "function") {
var K4 = poeR4Kit();
tg = K4.wood;
cg = K4.elm;
cg2 = null;
leaf = poeR4LeafMat(0x5A6E44, "elm");
}
var tr = new THREE.InstancedMesh(tg, poeS("bark", 0x3A3026) || poeC(0x2A2218), trees.length), cr = new THREE.InstancedMesh(cg, leaf || new THREE.MeshLambertMaterial({ color: 0x24321E }), trees.length), cr2 = cg2 ? new THREE.InstancedMesh(cg2, new THREE.MeshLambertMaterial({ color: 0x2A3A22 }), trees.length) : null, M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), V = new THREE.Vector3(), E = new THREE.Euler();
trees.forEach(function (q, j) { E.set(0, j * 1.7, 0); Q.setFromEuler(E); V.set(q[0], q[1], q[2]); S.set(q[3], q[3] * (0.9 + (j % 5) * 0.05), q[3]); M.compose(V, Q, S); tr.setMatrixAt(j, M); cr.setMatrixAt(j, M); if (cr2)
cr2.setMatrixAt(j, M); });
g.add(tr);
g.add(cr);
if (cr2)
g.add(cr2);
}
var Mo = poeLfModels();
[["cart", cx + 4.2, gz - 9, 0], ["cart", cx + 4.4, gz - 15, 0.05], ["fiacre", cx - 4.0, gz - 11, Math.PI], ["barrow", cx + 7.6, gz - 5, 0.6]].forEach(function (p, i) { if (lite && i === 1)
return; var y = poeLand(p[1], p[2]); var m = new THREE.Mesh(Mo[p[0]], Mo.mat); m.position.set(p[1], Math.max(y, 0.04), p[2]); m.rotation.y = p[3]; g.add(m); poeSolid(p[1], p[2], p[0] === "barrow" ? 1.2 : 2.0, p[0] === "fiacre" ? 6 : 3.4, -2, 3, p[3]); });
[[cx + 24, gz + 64, -Math.PI / 2, "AU BON COIN · VINS À 6 SOUS"], [cx - 25, gz + 132, Math.PI / 2, "GUINGUETTE DU GRAND VAINQUEUR"]].forEach(function (q, i) {
if (lite && i)
return;
var x = q[0], z = q[1], y = poeLand(x, z), P = poeGrp(g, x, y, z, q[2]), st = poeS("stone", 0xC8B898), sl = poeS("slate", 0x5A5E66);
poeBox(P, 12, 4.2, 8, st, 0, 2.1, 0);
poeBox(P, 12.6, 0.4, 8.6, poeS("stone", 0xA89880), 0, 4.3, 0);
var rf = poeBox(P, 12.4, 2.4, 6.2, sl, 0, 5.5, 0);
rf.scale.set(1, 1, 1);
for (var w = -1; w <= 1; w++) {
if (w === 0) {
poeFace(P, 1.4, 2.6, poeC(0x2A1A10), w * 3.6, 1.3, 4.02);
continue;
}
poeFace(P, 1.6, 1.6, poeGlowM(0xF0B860, 0.95), w * 3.6, 2.0, 4.02);
poeBox(P, 1.9, 0.12, 0.2, poeS("stone", 0xA89880), w * 3.6, 1.12, 4.1);
}
poeFace(P, 1.6, 1.6, poeGlowM(0xF0B860, 0.95), -5.6 + 0.1, 2.0, 4.02);
var sg = wSign([q[3]], 8, 0.6, "#2A1A10", "#E8D8B0");
sg.position.set(0, 3.6, 4.06);
P.add(sg);
poeBox(P, 5.0, 0.08, 1.6, poeC(0x3A2A1A), 0, 3.1, 4.8);
for (var v = 0; v < 8; v++)
poeSph(P, 0.32 + (v % 3) * 0.1, poeC(0x2E4A22), -2.2 + v * 0.62, 3.25, 4.5 + (v % 2) * 0.6, 6);
for (var tb = 0; tb < (lite ? 2 : 4); tb++) {
var tx = -4.4 + tb * 2.9, T = poeGrp(P, tx, 0, 7.2);
poeCyl(T, 0.5, 0.5, 0.06, poeC(0x5A3A1E), 0, 0.76, 0, 12);
poeCyl(T, 0.05, 0.07, 0.74, poeC(0x2A1A10), 0, 0.37, 0, 6);
poeBox(T, 1.2, 0.06, 0.3, poeC(0x5A3A1E), 0, 0.45, 0.85);
poeBox(T, 1.2, 0.06, 0.3, poeC(0x5A3A1E), 0, 0.45, -0.85);
poeCyl(T, 0.06, 0.07, 0.28, poeShine(0x1E3A1E, 0.4, 0.6), 0.1, 0.93, 0.1, 8);
poeCyl(T, 0.04, 0.035, 0.1, poeC(0xC8C0A8), -0.15, 0.84, -0.1, 8);
}
var gl = wGlow(0xFFB868, 6, 0.35);
gl.position.set(0, 2.2, 5.5);
P.add(gl);
poeSolid(x, z, q[2] ? 8.4 : 12.4, q[2] ? 12.4 : 8.4, -2, 7);
});
poeSwCask(g, cx + 9, gz - 3, 3);
poeSwCrates(g, cx - 9, gz - 4, 0.3);
poeSwCask(g, cx + 18, gz + 56, 3);
if (!lite) {
poeSwCrates(g, cx + 17, gz + 73, 1.2);
poeSwCask(g, cx - 18, gz + 140, 2);
}
poeSwWalkers(g, cx, gz - 18, 6, 26, 6, 1903);
poeSwWalkers(g, cx, gz + 80, 8, 40, 6, 1904);
},
function (G, cx, cz, r0, r1, n, seed) {
var R = wRand(seed), list = [];
n = POE.lite ? Math.ceil(n / 2) : n;
for (var t = 0; t < n * 12 && list.length < n; t++) {
var a = R() * 6.283, d = r0 + R() * (r1 - r0), x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
if (!poeR2Free(x, z, 1.2))
continue;
list.push([x, poeR2Y(x, z) + 0.035, z, 0.8 + R() * 2.2, 0.5 + R() * 0.5, R() * 3]);
}
if (!list.length)
return;
if (!POE.mats.r2pud)
POE.mats.r2pud = POE.lite ? new THREE.MeshLambertMaterial({ color: 0x1C222C }) : new THREE.MeshPhongMaterial({ color: 0x12161E, specular: 0x242A36, shininess: 40, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
if (!POE.r2pudG) {
POE.r2pudG = new THREE.CircleGeometry(1, 14);
POE.r2pudG.rotateX(-Math.PI / 2);
}
var im = new THREE.InstancedMesh(POE.r2pudG, POE.mats.r2pud, list.length), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), V = new THREE.Vector3(), E = new THREE.Euler();
list.forEach(function (p, i) { E.set(0, p[5], 0); Q.setFromEuler(E); V.set(p[0], p[1], p[2]); S.set(p[3], 1, p[3] * p[4]); M.compose(V, Q, S); im.setMatrixAt(i, M); });
G.add(im);
},
function (G, cx, cz, r0, r1, roles, n, seed, o) {
var R = wRand(seed);
o = o || {};
n = POE.lite ? Math.ceil(n / 2) : n;
for (var i = 0, t = 0; i < n && t < n * 20; t++) {
var a = R() * 6.283, d = r0 + R() * (r1 - r0), x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
if (!poeR2Free(x, z, 0.6))
continue;
var ro = roles[i % roles.length];
poePerson("r2" + seed + "_" + i, x, z, R() * 6.28, { name: ro[1], role: ro[0], sex: ro[2], look: { _seed: seed * 7 + i }, wander: o.still ? null : { r: o.wr || 6, sp: 0.55 }, r: 2.6, fn: ro[3] ? function (q) { return function () { poeCard(q[1], "<p>" + q[3] + "</p>"); }; }(ro) : null }, G);
i++;
}
},
function (G, a, b, y0, sag, cols) {
var L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.floor(L / 0.8), P = [], C = [], col = new THREE.Color();
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 0.75) / n, x0 = a[0] + (b[0] - a[0]) * t0, z0 = a[1] + (b[1] - a[1]) * t0, x1 = a[0] + (b[0] - a[0]) * t1, z1 = a[1] + (b[1] - a[1]) * t1, y0b = y0 - Math.sin(t0 * Math.PI) * sag, y1b = y0 - Math.sin(t1 * Math.PI) * sag, xm = (x0 + x1) / 2, zm = (z0 + z1) / 2, ym = (y0b + y1b) / 2 - 0.5;
P.push(x0, y0b, z0, x1, y1b, z1, xm, ym, zm);
col.setHex(cols[i % cols.length]);
for (var k = 0; k < 3; k++)
C.push(col.r, col.g, col.b);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(C, 3));
g.computeVertexNormals();
var m = new THREE.Mesh(g, POE.mats.r2bunt || (POE.mats.r2bunt = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide, emissive: 0x1A1410 })));
G.add(m);
poeBox(G, L, 0.02, 0.02, poeC(0x101010), (a[0] + b[0]) / 2, y0 - sag * 0.6, (a[1] + b[1]) / 2, Math.atan2(-(b[1] - a[1]), b[0] - a[0]));
},
function (G, x, z) {
var y = poeR2Y(x, z), g = poeGrp(G, x, y, z), ir = poeShine(0x1A1A1A, 0.6, 0.7);
for (var k = 0; k < 3; k++) {
var l = poeCyl(g, 0.04, 0.05, 1.2, ir, Math.cos(k * 2.09) * 0.32, 0.6, Math.sin(k * 2.09) * 0.32, 6);
l.rotation.z = Math.cos(k * 2.09) * 0.25;
l.rotation.x = -Math.sin(k * 2.09) * 0.25;
}
poeCyl(g, 0.55, 0.32, 0.36, ir, 0, 1.3, 0, 12);
poeCyl(g, 0.5, 0.5, 0.06, poeGlowM(0xFF7A2A), 0, 1.46, 0, 12);
for (var c = 0; c < 6; c++)
poeSph(g, 0.1, poeGlowM(0xFFB050), Math.cos(c) * 0.25, 1.52, Math.sin(c) * 0.25, 6);
var gl = wGlow(0xFF9040, 4.2, 0.55);
gl.position.y = 1.8;
g.add(gl);
poeSolid(x, z, 1.1, 1.1, -2, 2);
return g;
},
function (G, x, z, ry, k) {
if (!poeR2Free(x, z, 2))
return;
var g = poeGrp(G, x, poeR2Y(x, z), z, ry), wd = poeS("boards"), cl = [[0xA8201A, 0xE8D8B0], [0x1A3A6A, 0xE0D0A8], [0x2A5A2A, 0xE8D8B0], [0x5A1A5A, 0xE8C860]][k % 4];
poeBox(g, 3.2, 0.9, 1.4, wd, 0, 0.45, 0);
[-1.5, 1.5].forEach(function (o) { poeCyl(g, 0.05, 0.05, 2.8, poeC(0x3A2A1A), o, 1.4, 0.6, 6); poeCyl(g, 0.05, 0.05, 2.8, poeC(0x3A2A1A), o, 1.4, -0.6, 6); });
for (var s = 0; s < 6; s++) {
var a = poeBox(g, 0.6, 0.06, 1.9, poeC(cl[s % 2]), -1.5 + s * 0.6, 2.85, 0);
a.rotation.x = 0.12;
}
poeBox(g, 3.0, 0.04, 0.04, poeC(0x2A1A10), 0, 2.3, 0.72);
for (var m = 0; m < 7; m++) {
var mk = poeSph(g, 0.13, poeShine([0xF4F2EE, 0x1A1A1A, 0xE8C040, 0xC81E2A, 0x2A6AC8][(m + k) % 5], 0.3, 0.3), -1.35 + m * 0.45, 2.05, 0.74, 10);
mk.scale.set(1, 1.25, 0.45);
}
for (var b = 0; b < 5; b++)
poeSph(g, 0.1, poeShine([0xE8C040, 0xF4F2EE, 0xC81E2A][b % 3], 0.3, 0.4), -1.2 + b * 0.6, 0.98, 0.2, 8);
poeBox(g, 0.2, 0.3, 0.2, poeGlowM(0xFFC070), 1.3, 2.45, 0.72);
var gl = wGlow(0xFFB060, 2.2, 0.4);
gl.position.set(1.3, 2.45, 0.9);
g.add(gl);
poeSolid(x, z, 3.4, 1.8, -2, 3, ry);
},
function (G) {
var A = POE_AT.cask, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x, z: A.z, r: 200 });
var lite = POE.lite;
[[-26, 2, 1.3, 0], [25, 0, -1.3, 1], [-11, 11, 0.15, 2], [13, 12, -0.15, 3], [-29, -20, 0.4, 1], [29, -24, -0.4, 2]].forEach(function (S, i) { if (lite && i % 2)
return; poeR2MaskStall(g, A.x + S[0], A.z + S[1], S[2], S[3]); });
var bc = [0xC81E2A, 0xE8C040, 0x2A5AC8, 0x2AA84A, 0xF4F2EE, 0x8A2A8A];
[[[-40, -48], [40, -48]], [[-40, -30], [40, -30]], [[-40, -16], [40, -16]], [[-30, -50], [30, 8]], [[30, -50], [-30, 8]]].forEach(function (l, i) { if (lite && i > 2)
return; poeR2Bunting(g, [A.x + l[0][0], A.z + l[0][1]], [A.x + l[1][0], A.z + l[1][1]], 9.2, 1.6, bc); });
for (var p = 0; p < (lite ? 4 : 8); p++) {
var a = p / (lite ? 4 : 8) * 6.283, x = A.x + Math.cos(a) * 24, z = A.z - 2 + Math.sin(a) * 18;
if (!poeR2Free(x, z, 0.6))
continue;
var lg = poeGrp(g, x, poeR2Y(x, z), z);
poeCyl(lg, 0.06, 0.08, 3.2, poeC(0x2A1A10), 0, 1.6, 0, 6);
poeSph(lg, 0.34, poeGlowM([0xE84A2A, 0xE8C040, 0x3AA84A, 0x4A6AE8][p % 4]), 0, 3.4, 0, 10);
var gg = wGlow(0xFFB060, 2.6, 0.4);
gg.position.y = 3.4;
lg.add(gg);
poeSolid(x, z, 0.4, 0.4, -2, 4);
}
poeR2Folk(g, A.x, A.z - 4, 3, 24, [["carnival", "A masked reveller", "m", "“Tomorrow is Lent! Tonight, everyone is someone else.”"], ["carnf", "A lady in a mask", "f", "“Guess who I am. No? Good.”"], ["carnival", "A harlequin", "m", "“Motley and bells, like Fortunato. Everyone dresses as Fortunato this year.”"], ["carnf", "A masker in black", "f", "“The Montresor palazzo is dark tonight. Only the master is at home, they say.”"]], 18, 2401, { wr: 5 });
poeR2Puddles(g, A.x, A.z - 10, 8, 48, 18, 2402);
},
function (g, w, h, fl, kind, seed) {
var R = wRand(seed), tm = poeC(0x2A1E14), pl = poeS("plaster", [0xD8C8A8, 0xC8B898, 0xE0D0B0][seed % 3]), fh = h / fl, d = 6.04;
if (kind === 1) {
poeBox(g, w - 0.1, h - fh, 0.05, pl, 0, fh + (h - fh) / 2, d);
for (var f = 1; f <= fl; f++)
poeBox(g, w, 0.22, 0.12, tm, 0, f * fh - 0.05, d + 0.05);
var nb0 = Math.max(1, Math.floor(w / 3.2));
for (var b = 0; b <= nb0; b++) {
var bx = -w / 2 + b * w / nb0;
poeBox(g, 0.22, h - fh, 0.12, tm, bx, fh + (h - fh) / 2, d + 0.05);
if (b < nb0)
for (var f2 = 1; f2 < fl; f2++) {
var br = poeBox(g, 0.14, Math.hypot(0.75, fh) * 0.98, 0.1, tm, bx + 0.42, f2 * fh + fh / 2, d + 0.06);
br.rotation.z = -Math.atan2(0.75, fh);
var br2 = poeBox(g, 0.14, Math.hypot(0.75, fh) * 0.98, 0.1, tm, bx + w / nb0 - 0.42, f2 * fh + fh / 2, d + 0.06);
br2.rotation.z = Math.atan2(0.75, fh);
}
}
for (var f4 = 1; f4 < fl; f4++)
for (var b4 = 0; b4 < nb0; b4++)
poeWin(g, -w / 2 + (b4 + 0.5) * w / nb0, f4 * fh + fh * 0.55, d + 0.08, 0, 1.15, Math.min(fh * 0.6, 2.0), "sash", (b4 + f4 + seed) % 3 === 0, false);
}
else {
for (var q = 0; q < Math.floor(h / 0.8); q++) {
poeBox(g, q % 2 ? 0.6 : 0.9, 0.38, 0.08, poeS("stone", 0xB8B0A0), -w / 2 + 0.35, 0.2 + q * 0.8, d + 0.03);
poeBox(g, q % 2 ? 0.6 : 0.9, 0.38, 0.08, poeS("stone", 0xB8B0A0), w / 2 - 0.35, 0.2 + q * 0.8, d + 0.03);
}
}
var gw = Math.min(6, w * 0.5), gh = 3.2, sh = new THREE.Shape();
sh.moveTo(-gw / 2, 0);
sh.lineTo(0, gh);
sh.lineTo(gw / 2, 0);
sh.lineTo(-gw / 2, 0);
var ge = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 2.6, bevelEnabled: false }), kind === 1 ? pl : poeS("brick", 0x7A6A60));
ge.position.set(0, h, d - 2.6);
g.add(ge);
[-1, 1].forEach(function (s) { var rf = poeBox(g, Math.hypot(gw / 2, gh) + 0.4, 0.14, 3.0, poeS("slate", 0x5A5E66), s * gw / 4, h + gh / 2, d - 1.2); rf.rotation.z = -s * Math.atan2(gh, gw / 2); });
poeWin(g, 0, h + 1.1, d + 0.03, 0, 0.9, 1.3, "sash", seed % 2 === 0, false);
var bays = Math.max(1, Math.floor(w / 3.2));
for (var bb = 0; bb < bays; bb++) {
var bx2 = -w / 2 + (bb + 0.5) * w / bays;
poeBox(g, 1.3, 0.22, 0.3, poeC(0x3A2A1A), bx2, fh + 0.6, d + 0.25);
poeBox(g, 1.2, 0.16, 0.22, poeC(0x2A3A22), bx2, fh + 0.78, d + 0.25);
if (kind !== 1 && (bb + seed) % 2 === 0)
poeWin(g, bx2, fh + fh * 0.55, d + 0.08, 0, 1.15, Math.min(fh * 0.6, 2.0), "shutter", true, false);
if (kind !== 1 && (bb + seed) % 3 === 1)
poeWin(g, bx2, 2 * fh + fh * 0.55, d + 0.08, 0, 1.15, Math.min(fh * 0.6, 2.0), "shutter", true, false);
}
},
function (hg, w, d, h, fl, kind, seed) {
var tm = poeC(0x2A1E14), pl = poeS("plaster", [0xD8C8A8, 0xC8B898, 0xE0D0B0][seed % 3]), fh = h / fl;
[-1, 1].forEach(function (s) {
var e = poeGrp(hg, s * (w / 2 + 0.04), 0, 0, s * Math.PI / 2), bays = 2;
if (kind === 1) {
poeBox(e, d - 0.1, h - fh, 0.04, pl, 0, fh + (h - fh) / 2, 0);
for (var f = 1; f <= fl; f++)
poeBox(e, d, 0.22, 0.12, tm, 0, f * fh - 0.05, 0.04);
for (var b = 0; b <= 4; b++)
poeBox(e, 0.22, h - fh, 0.12, tm, -d / 2 + b * d / 4, fh + (h - fh) / 2, 0.04);
}
else
for (var q = 0; q < Math.floor(h / 0.8); q++) {
poeBox(e, q % 2 ? 0.6 : 0.9, 0.38, 0.08, poeS("stone", 0xB8B0A0), -d / 2 + 0.35, 0.2 + q * 0.8, 0.02);
poeBox(e, q % 2 ? 0.6 : 0.9, 0.38, 0.08, poeS("stone", 0xB8B0A0), d / 2 - 0.35, 0.2 + q * 0.8, 0.02);
}
for (var f2 = 0; f2 < fl; f2++)
for (var b2 = 0; b2 < bays; b2++)
poeWin(e, -d / 4 + b2 * d / 2, f2 * fh + fh * 0.55, 0.08, 0, 1.0, Math.min(fh * 0.55, 1.8), f2 ? "sash" : "shutter", (f2 + b2 + seed + (s > 0 ? 1 : 0)) % 3 === 0, false);
});
},
function (G) {
var A = POE_AT.heart, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x, z: A.z, r: 200 });
[[-70, 11], [-30, 12], [0, 12], [30, 11], [70, 12]].forEach(function (H, i) { var hg = poeGrp(g, A.x + H[0], 0, A.z - 17, 0); poeR2Front(hg, H[1], 10, 3, i % 2, i + 3); poeR2Ends(hg, H[1], 12, 10, 3, i % 2, i + 3); });
[[-50, 14], [0, 14], [50, 12]].forEach(function (H, i) { var hg = poeGrp(g, A.x + H[0], 0, A.z + 17, Math.PI); poeR2Front(hg, H[1], 10, 3, (i + 1) % 2, i + 11); poeR2Ends(hg, H[1], 12, 10, 3, (i + 1) % 2, i + 11); });
var lx = A.x + 30, lz = A.z - 6.6, lad = poeGrp(g, lx - 0.6, 0.18, lz + 0.9, 0);
for (var s = 0; s < 2; s++) {
var rl = poeBox(lad, 0.06, 3.8, 0.06, poeS("oak", 0x6A4A2A), s * 0.4 - 0.2, 1.9, 0);
rl.rotation.x = -0.25;
}
for (var r = 0; r < 9; r++)
poeBox(lad, 0.44, 0.04, 0.04, poeS("oak", 0x6A4A2A), 0, 0.3 + r * 0.4, -0.075 - r * 0.1);
poePerson("r2lamp", lx - 1.2, lz + 1.6, 2.6, { name: "The lamplighter", role: "workman", sex: "m", look: { _seed: 77 }, r: 2.6, fn: function () { poeCard("The lamplighter", "<p>“Evening. Every lamp in this street is mine, and I'm late with all of them. The old gentleman at the corner keeps his shutters fast: never a light. Odd.”</p>"); } }, g);
poeR2Folk(g, A.x, A.z, 4, 80, [["gent", "A gentleman in a greatcoat", "m", "“A cold night for walking. The watch says all is well.”"], ["lady", "A lady and her shawl", "f", "“We are only going as far as the corner.”"], ["poorf", "A servant girl with a basket", "f", "“Late bread for the house. Mistress can't sleep.”"], ["workman", "A carter, walking", "m", "“Lost a wheel at the end of the street. Nobody about to help.”"], ["police", "A constable", "m", "“Move along, if you please. Keep to the lamps.”"]], 10, 2403, { wr: 12 });
poeR2Puddles(g, A.x, A.z, 2, 90, 22, 2404);
},
function (G) {
var A = POE_AT.pit, g = poeGrp(G, A.x, 0.05, A.z, Math.PI / 2), gg = new THREE.Group();
G.add(gg);
POE.districts.push({ g: gg, x: A.x + 40, z: A.z, r: 200 });
POE.districts.push({ g: g, x: A.x, z: A.z, r: 200 });
var lite = POE.lite;
var st = poeS("stone", 0xC8B898), dk = poeS("stone", 0xA89878), ir = poeShine(0x141414, 0.6, 0.7), d = 15.05;
for (var a = 0; a < 8; a++) {
var ax = -17.5 + a * 5;
if (Math.abs(ax) < 3)
continue;
poeBox(g, 1.0, 4.6, 0.9, dk, ax - 2.5, 2.3, d + 0.4);
var ar = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.4, 5, lite ? 8 : 14, Math.PI), dk);
ar.position.set(ax, 4.4, d + 0.4);
g.add(ar);
poeFace(g, 3.8, 4.0, poeC(0x1A1612), ax, 2.2, d + 0.02, 0);
}
poeBox(g, 40, 0.5, 1.2, dk, 0, 6.4, d + 0.5);
poeBox(g, 40.6, 0.8, 1.0, dk, 0, 17.8, d + 0.4);
var bays = 12;
for (var b = 0; b < bays; b++) {
var bx = -20 + (b + 0.5) * 40 / bays;
poeBox(g, 2.0, 0.16, 0.9, dk, bx, 7.7, d + 0.45);
poeBox(g, 2.0, 0.05, 0.05, ir, bx, 8.75, d + 0.88);
for (var r = 0; r < 7; r++)
poeBox(g, 0.03, 1.0, 0.03, ir, bx - 0.9 + r * 0.3, 8.2, d + 0.88);
if (b % 2 === 0)
poeBox(g, 0.5, 11.5, 0.25, dk, bx - 40 / bays / 2, 12, d + 0.1);
}
var bg = poeGrp(g, 0, 18, d - 0.6);
poeBox(bg, 8, 8, 1.4, st, 0, 4, 0);
var tri = new THREE.Shape();
tri.moveTo(-4, 0);
tri.lineTo(0, 2.6);
tri.lineTo(4, 0);
tri.lineTo(-4, 0);
var tm = new THREE.Mesh(new THREE.ExtrudeGeometry(tri, { depth: 1.4, bevelEnabled: false }), st);
tm.position.set(0, 8, -0.7);
bg.add(tm);
[-1.8, 1.8].forEach(function (o) { poeFace(bg, 1.6, 3.2, poeC(0x14100C), o, 4.6, 0.72, 0); var ar2 = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.16, 4, 10, Math.PI), dk); ar2.position.set(o, 6.2, 0.74); bg.add(ar2); poeCyl(bg, 0.55, 0.32, 0.9, poeShine(0x6A5A2A, 0.4, 0.8), o, 5.4, 0.4, 10); });
poeBox(bg, 0.22, 1.6, 0.22, ir, 0, 11.4, 0);
poeBox(bg, 0.9, 0.22, 0.22, ir, 0, 11.7, 0);
var Mo = typeof poeLfModels === "function" ? poeLfModels() : null;
if (Mo)
[[A.x + 30, A.z - 22, 0], [A.x + 46, A.z - 24, 0.3], [A.x + 30, A.z + 24, Math.PI], [A.x + 50, A.z + 22, Math.PI - 0.2], [A.x + 58, A.z - 6, -Math.PI / 2]].forEach(function (p, i) { if (lite && i % 2)
return; if (!poeR2Free(p[0], p[1], 2.2))
return; var m = new THREE.Mesh(Mo[i % 3 === 2 ? "barrow" : "stall"], Mo.mat); m.position.set(p[0], 0.05, p[1]); m.rotation.y = p[2]; gg.add(m); poeSolid(p[0], p[1], 3.2, 2.4, -2, 3, p[2]); });
poeR2Folk(gg, A.x + 40, A.z, 7, 32, [["poorf", "A woman of Toledo selling oranges", "f", "“Naranjas, señor! The French buy everything but oranges.”"], ["french", "A French soldier, off duty", "m", "“Lasalle's men will be in by morning. Till then, wine.”"], ["monk", "A Dominican", "m", "“Pray for the souls within those walls.”"], ["workman", "A water-seller", "m", "“Agua fresca! From the Tagus, cold as a bishop.”"], ["lady", "A Toledan lady in mantilla", "f", "“Do not look at the door, señor.”"]], 10, 2405, { wr: 6 });
poeR2Puddles(gg, A.x + 40, A.z, 6, 44, 14, 2406);
},
function (G) {
var A = POE_AT.usher, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x, z: -520, r: 280 });
var lite = POE.lite, fz = A.z + 13.2, dark = poeC(0x060505);
var pts = [[0, 26], [0.6, 22.5], [-0.5, 18.6], [0.7, 14.6], [-0.6, 10.4], [0.5, 6.4], [-0.3, 2.6], [0.3, 0]];
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), s = poeBox(g, 0.34, L + 0.1, 0.08, dark, A.x + (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, fz);
s.rotation.z = Math.atan2(b[0] - a[0], a[1] - b[1]);
}
var stM = POE.mats.r2streak || (POE.mats.r2streak = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, map: wTex(32, 128, function (x, W, H) { var gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "rgba(10,14,8,.75)"); gr.addColorStop(1, "rgba(10,14,8,0)"); x.fillStyle = gr; for (var k = 0; k < 6; k++)
x.fillRect(k * 5 + Math.random() * 3, 0, 2 + Math.random() * 3, H * (0.5 + Math.random() * 0.5)); }) }));
for (var w = 0; w < (lite ? 8 : 18); w++) {
var wx = A.x - 42 + w * (84 / (lite ? 8 : 18)) + ((w * 37) % 5), sp = poeFace(g, 1.2, 5 + ((w * 13) % 5), stM, wx, 14 - ((w * 13) % 5) / 2, fz - 0.02, 0);
}
var R = wRand(2407);
for (var f = 0; f < (lite ? 10 : 24); f++) {
var x = A.x - 40 + R() * 80, z = fz + 0.6 + R() * 2.2;
if (Math.abs(x - A.x) < 4)
continue;
var bk = poeBox(g, 0.5 + R() * 0.8, 0.3 + R() * 0.4, 0.4 + R() * 0.6, poeS("gothic", 0x7A746C), x, poeLand(x, z) + 0.2, z);
bk.rotation.set(R() * 0.6, R() * 3, R() * 0.6);
}
[[-17.5, 14.2], [17.5, 3.4], [-3.5, 8.8]].forEach(function (q, k) { if (lite && k === 2)
return; poeFace(g, 1.4, 3.0, poeGlowM(0x7A5428, 0.4), A.x + q[0], q[1], fz - 0.08, 0); var gl = wGlow(0xC88840, 2.0, 0.12); gl.position.set(A.x + q[0], q[1], fz + 0.4); g.add(gl); });
if (!POE.mats.r2sedge)
POE.mats.r2sedge = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, transparent: true, alphaTest: 0.4, map: wTex(64, 64, function (x, W, H) { x.clearRect(0, 0, W, H); for (var k = 0; k < 22; k++) {
var bx = 4 + Math.random() * (W - 8);
x.strokeStyle = ["#4A4A2E", "#5A5432", "#3A3A26", "#6A6040"][k % 4];
x.lineWidth = 1.5 + Math.random();
x.beginPath();
x.moveTo(bx, H);
x.quadraticCurveTo(bx + (Math.random() - 0.5) * 10, H * 0.5, bx + (Math.random() - 0.5) * 18, H * (0.05 + Math.random() * 0.3));
x.stroke();
} }) });
var sg = new THREE.PlaneGeometry(1.6, 1.3);
sg.translate(0, 0.65, 0);
var sg2 = sg.clone();
sg2.rotateY(Math.PI / 2);
var sedge = gwMerge([sg.toNonIndexed(), sg2.toNonIndexed()]), T = A.tarn, n = lite ? 50 : 140, im = new THREE.InstancedMesh(sedge, POE.mats.r2sedge, n), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), V = new THREE.Vector3(), E = new THREE.Euler();
for (var k2 = 0; k2 < n; k2++) {
var an = R() * 6.283, rr = 1.06 + R() * 0.12, sx = T.x + Math.cos(an) * T.rx * rr, sz = T.z + Math.sin(an) * T.rz * rr;
if (Math.abs(sx - A.x) < 4)
sx += 8;
E.set(0, R() * 3, 0);
Q.setFromEuler(E);
V.set(sx, Math.max(poeLand(sx, sz), POE_WATER) - 0.05, sz);
var sc = 0.8 + R() * 0.7;
S.set(sc, sc, sc);
M.compose(V, Q, S);
im.setMatrixAt(k2, M);
}
g.add(im);
var rf = new THREE.Mesh(new THREE.PlaneGeometry(96, 56), new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, opacity: 0.55, fog: true, map: wTex(256, 160, function (x, W, H) {
x.clearRect(0, 0, W, H);
var gr = x.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, "rgba(60,66,84,.9)");
gr.addColorStop(1, "rgba(20,22,30,0)");
x.fillStyle = gr;
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(4,4,6,.95)";
x.fillRect(W * 0.2, 0, W * 0.6, H * 0.3);
x.beginPath();
x.moveTo(W * 0.2, H * 0.3);
x.lineTo(W * 0.5, H * 0.42);
x.lineTo(W * 0.8, H * 0.3);
x.fill();
[0.1, 0.9].forEach(function (t) { x.fillRect(W * t - 12, 0, 24, H * 0.45); x.beginPath(); x.moveTo(W * t - 14, H * 0.45); x.lineTo(W * t, H * 0.62); x.lineTo(W * t + 14, H * 0.45); x.fill(); });
x.fillStyle = "rgba(220,160,80,.6)";
x.fillRect(W * 0.68, H * 0.1, 4, 14);
x.fillRect(W * 0.28, H * 0.18, 3, 10);
}) }));
rf.rotation.x = -Math.PI / 2;
rf.position.set(A.x, POE_WATER + 0.03, A.z + 76);
if (typeof poeR3Reflect !== "function")
g.add(rf);
poeR2Folk(g, A.x, -330, 3, 24, [["servant", "A valet of the house", "m", "“The master sees no one. He has not left the house in years.”"], ["physician", "The family physician", "m", "“A peculiar malady. I am called, I go, I am not wanted. Good night.”"], ["poorf", "A woman gathering sedge", "f", "“Nothing grows right by that water, sir. Nothing.”"]], 4, 2417, { wr: 5 });
poeR2Puddles(g, A.x, -330, 4, 40, 12, 2408);
},
function (G) {
var A = POE_AT.masque, gz = A.z + 85, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x, z: gz, r: 200 });
var lite = POE.lite;
[[-4.5, gz + 9], [4.5, gz + 9], [-16, gz + 8], [16, gz + 8]].forEach(function (b, i) { if (lite && i > 1)
return; poeR2Brazier(g, A.x + b[0], b[1]); });
[-1, 1].forEach(function (k) {
var bn = poeFace(g, 2.4, 7, poeC(k < 0 ? 0x7A0A10 : 0x1A1A1E), A.x + k * 8, 15, gz + 4.45, 0);
var hem = poeBox(g, 2.6, 0.12, 0.12, poeShine(0xC8A040, 0.4, 0.8), A.x + k * 8, 18.6, gz + 4.5);
var dv = poeFace(g, 1.0, 1.0, poeC(0xC8A040), A.x + k * 8, 15.5, gz + 4.47, 0);
dv.rotation.z = Math.PI / 4;
});
var ar = new THREE.Mesh(new THREE.TorusGeometry(5.6, 0.7, 6, lite ? 10 : 18, Math.PI), poeS("gothic", 0x8A847C));
ar.position.set(A.x, 10.2, gz + 0.6);
g.add(ar);
poeBox(g, 1.2, 1.6, 1.4, poeS("gothic", 0x8A847C), A.x, 15.8, gz + 0.6);
var sh = poeGrp(g, A.x, 13.4, gz + 1.4);
poeBox(sh, 1.6, 2.0, 0.2, poeC(0x5A0A0A), 0, 0, 0);
var tp = new THREE.Mesh(new THREE.ConeGeometry(0.8, 0.9, 4), poeC(0x5A0A0A));
tp.rotation.set(Math.PI, Math.PI / 4, 0);
tp.scale.z = 0.15;
tp.position.y = -1.4;
sh.add(tp);
poeBox(sh, 0.3, 1.6, 0.25, poeShine(0xC8A040, 0.4, 0.8), 0, 0, 0.05);
poeBox(sh, 1.2, 0.3, 0.25, poeShine(0xC8A040, 0.4, 0.8), 0, 0.2, 0.05);
poeR2Folk(g, A.x, gz - 14, 2, 9, [["reveller", "A masked courtier", "m", "(He bows behind the bars and says nothing. The gate is welded.)"], ["revelf", "A lady of the court, masked", "f", "“The Prince has provided everything. You cannot come in. We cannot go out.”"]], lite ? 3 : 6, 2409, { wr: 3 });
poeR2Folk(g, A.x, gz + 30, 6, 26, [["workman", "A countryman watching the gate", "m", "“Music, in there. Music, while the country dies.”"], ["poorf", "A woman at the wall", "f", "“I knock every night. Nobody answers.”"]], 4, 2410, { wr: 6 });
poeR2Puddles(g, A.x, gz + 30, 8, 50, 14, 2411);
},
function (G) {
var A = POE_AT.raven, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x, z: A.z, r: 140 });
var lite = POE.lite, fz = A.z - 11;
poePlane(g, 2.2, 7, poeS("flags", 0x8A8478), A.x, poeLand(A.x, fz - 3.5) + 0.05, fz - 3.5, 0);
[-1, 1].forEach(function (s) {
for (var h = 0; h < 3; h++) {
poeBox(g, 2.0, 0.7, 0.7, poeC(0x1E2A1A), A.x + s * (2.6 + h * 2.1), poeLand(A.x, fz - 3) + 0.35, fz - 3.3);
poeBox(g, 2.0, 0.06, 0.7, poeC(0xDDE2E8), A.x + s * (2.6 + h * 2.1), poeLand(A.x, fz - 3) + 0.72, fz - 3.3);
}
for (var r = 0; r < (lite ? 3 : 6); r++) {
var rx = A.x + s * (2 + r * 1.1), rz = fz - 4.9 - (r % 2) * 0.6;
poeCyl(g, 0.02, 0.03, 0.9, poeC(0x2A1E14), rx, poeLand(rx, rz) + 0.45, rz, 4);
poeSph(g, 0.1, poeC(0x4A0E14), rx, poeLand(rx, rz) + 0.9, rz, 6);
}
});
if (!POE.mats.r2snow)
POE.mats.r2snow = new THREE.MeshLambertMaterial({ color: 0xE4E8F0, transparent: true, opacity: 0.85, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
var R = wRand(2412), sn = [];
for (var t = 0; t < (lite ? 30 : 80); t++) {
var a = R() * 6.283, d = 6 + R() * 30, x = A.x + Math.cos(a) * d, z = A.z + Math.sin(a) * d - 6;
if (Math.abs(x - A.x) < 7.5 && Math.abs(z - A.z) < 11.5)
continue;
if (poeRoadD(x, z) < 3.2)
continue;
sn.push([x, poeLand(x, z) + 0.03, z, 1.2 + R() * 2.6, R() * 3]);
}
if (!POE.r2pudG) {
POE.r2pudG = new THREE.CircleGeometry(1, 14);
POE.r2pudG.rotateX(-Math.PI / 2);
}
var im = new THREE.InstancedMesh(POE.r2pudG, POE.mats.r2snow, sn.length), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), V = new THREE.Vector3(), E = new THREE.Euler();
sn.forEach(function (p, i) { E.set(0, p[4], 0); Q.setFromEuler(E); V.set(p[0], p[1], p[2]); S.set(p[3], 1, p[3] * 0.7); M.compose(V, Q, S); im.setMatrixAt(i, M); });
g.add(im);
var tx = A.x - 8, tz = fz - 9;
poeDeadTree(g, tx, poeLand(tx, tz), tz, 1.3, 91);
var bough = poeCyl(g, 0.08, 0.12, 3.0, poeS("bark", 0x6A6458), tx + 1.2, poeLand(tx, tz) + 4.0, tz, 6);
bough.rotation.z = Math.PI / 2 - 0.2;
if (typeof poeRaven === "function")
poeRaven(g, tx + 2.0, poeLand(tx, tz) + 4.3, tz, -0.8, 2.4);
var pl = poeGrp(g, A.x, 0, fz - 1.4);
poeBox(pl, 0.36, 0.5, 0.36, poeGlowM(0xFFC070), 0, 2.7, 0);
poeCyl(pl, 0.02, 0.02, 0.3, poeC(0x101010), 0, 3.05, 0, 4);
var gl = wGlow(0xFFB060, 4.2, 0.55);
gl.position.y = 2.7;
pl.add(gl);
var pool = poePlane(g, 6, 5, POE.mats.r2pool || (POE.mats.r2pool = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, map: wTex(64, 64, function (x, W, H) { var gr = x.createRadialGradient(W / 2, H / 2, 1, W / 2, H / 2, W / 2); gr.addColorStop(0, "rgba(255,180,90,.55)"); gr.addColorStop(1, "rgba(255,160,80,0)"); x.fillStyle = gr; x.fillRect(0, 0, W, H); }) })), A.x, poeLand(A.x, fz - 2) + 0.08, fz - 2, 0);
poeR2Folk(g, A.x, A.z - 40, 6, 24, [["gent", "A neighbour, hurrying", "m", "“There is a bird at his window again. Black as a lawyer.”"], ["lady", "A widow in black", "f", "“He lost her, you know. Lenore. He has not slept since.”"]], 3, 2413, { wr: 6 });
},
function (G) {
var g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: 400, z: 900, r: 260 });
var lite = POE.lite;
[[388, 960, -12, 0.3], [372, 905, 14, -0.2], [352, 858, -16, 0.5], [318, 770, 16, 0.2]].forEach(function (c, i) {
if (lite && i === 3)
return;
var x = c[0] + c[2], z = c[1];
if (!poeR2Free(x, z, 5))
return;
poeBuilding(g, { x: x, z: z, ry: c[2] < 0 ? Math.PI / 2 : -Math.PI / 2, w: 8, d: 6, h: 3.4, floors: 1, wall: "whitewash", col: 0xC8C0AC, roofMat: "rough", roofH: 2.6, win: "shutter", lit: [0, 1], chim: i % 2 });
});
[[438, 986, 0.55, 1], [420, 958, 0.5, 0], [452, 958, -1.0, 1], [404, 986, 2.1, 0]].forEach(function (c, i) {
if (lite && i > 1)
return;
if (poeRoadD(c[0], c[1]) < 9 || !poeR2Free(c[0], c[1], 5))
return;
poeBuilding(g, { x: c[0], z: c[1], ry: c[2], w: 7, d: 5.5, h: 3.2, floors: 1, wall: "whitewash", col: 0xC8C0AC, roofMat: "rough", roofH: 2.4, win: "shutter", lit: [0, 1], chim: c[3] });
for (var f = 0; f < 5; f++) {
var fx = c[0] + Math.cos(c[2]) * (-5 + f * 2.5) + Math.sin(c[2]) * 5, fz = c[1] - Math.sin(c[2]) * (-5 + f * 2.5) + Math.cos(c[2]) * 5;
poeCyl(g, 0.06, 0.07, 1.1, poeS("oak", 0x5A4A3A), fx, poeLand(fx, fz) + 0.55, fz, 5);
if (f < 4) {
var rl = poeBox(g, 2.5, 0.07, 0.05, poeS("oak", 0x5A4A3A), fx + Math.cos(c[2]) * 1.25, poeLand(fx, fz) + 0.85, fz - Math.sin(c[2]) * 1.25, c[2]);
}
}
});
var cx = 444, cz = 1002;
if (poeRoadD(cx, cz) < 5) {
cx = 402;
cz = 944;
}
var cg = poeGrp(g, cx, poeLand(cx, cz), cz, 0.4);
poeBox(cg, 1.2, 0.5, 1.2, poeS("stone", 0x9A948A), 0, 0.25, 0);
poeBox(cg, 0.25, 3.6, 0.25, poeS("stone", 0x9A948A), 0, 2.2, 0);
poeBox(cg, 1.4, 0.25, 0.25, poeS("stone", 0x9A948A), 0, 3.2, 0);
poeSolid(cx, cz, 1.4, 1.4, -2, 4);
[[434, 930], [440, 936], [300, 820], [360, 880]].forEach(function (h, i) { if (lite && i % 2)
return; if (!poeR2Free(h[0], h[1], 2.5))
return; var hy = poeLand(h[0], h[1]); poeCyl(g, 1.8, 2.2, 2.2, poeC(0x8A7A4A), h[0], hy + 1.1, h[1], 10); var cn = new THREE.Mesh(new THREE.ConeGeometry(1.9, 1.8, 10), poeC(0x7A6A3E)); cn.position.set(h[0], hy + 3.1, h[1]); g.add(cn); poeSolid(h[0], h[1], 4, 4, -2, 4); });
var Mo = typeof poeLfModels === "function" ? poeLfModels() : null;
if (Mo && poeR2Free(426, 952, 2)) {
var m = new THREE.Mesh(Mo.cart, Mo.mat);
m.position.set(426, poeLand(426, 952), 952);
m.rotation.y = 2.6;
g.add(m);
poeSolid(426, 952, 2.6, 3.6, -2, 3, 2.6);
}
poeR2Folk(g, 380, 900, 4, 60, [["workman", "A carter going home", "m", "“Paris is behind you. Nothing ahead but Dream-Land, and the dark.”"], ["poorf", "A peasant woman with a lantern", "f", "“Mind the ditch. It's deeper than it looks.”"]], 5, 2414, { wr: 8 });
poeR2Puddles(g, 410, 930, 4, 80, 20, 2415);
},
function (G) {
var A = POE_AT;
[["carnival", poeR2Carnival], ["heart", poeR2Heart], ["toledo", poeR2Toledo], ["usher", poeR2Usher], ["abbey", poeR2Abbey], ["raven", poeR2Raven], ["road", poeR2Road]].forEach(function (q) { try {
q[1](G);
}
catch (e) {
if (window.console)
console.warn("[poe] r2 " + q[0], e);
} });
poeR2Puddles(G, A.morgue.x + 40, A.morgue.z + 60, 8, 60, 14, 2416);
poeR2Puddles(G, 470, 1110, 4, 60, 16, 2418);
},
function () {
if (POE.mats.r2rust)
return POE.mats.r2rust;
var t = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#CFC7B2";
x.fillRect(0, 0, W, H);
var R = wRand(381), rows = 4, rh = H / rows;
for (var r = 0; r < rows; r++) {
var y = r * rh;
x.fillStyle = "#6A6252";
x.fillRect(0, y + rh - 9, W, 9);
x.fillStyle = "#9A9280";
x.fillRect(0, y + rh - 12, W, 3);
x.fillStyle = "rgba(255,250,236,.5)";
x.fillRect(0, y, W, 3);
var bx = (r % 2) * W / 4;
for (var b = 0; b < 3; b++) {
var px = (bx + b * W / 2) % W;
x.fillStyle = "#7A7262";
x.fillRect(px, y, 3, rh - 9);
}
for (var i = 0; i < 260; i++) {
x.fillStyle = "rgba(90,80,60," + (R() * 0.12) + ")";
x.fillRect(R() * W, y + R() * (rh - 12), 2, 2);
}
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
var m = new THREE.MeshLambertMaterial({ map: t });
m.userData.rep = 1;
POE.mats.r2rust = typeof poeParLit === "function" ? poeParLit(m) : m;
return POE.mats.r2rust;
},
function (P, w, h, d, mat, y, z) {
var sh = new THREE.Shape();
sh.moveTo(-w / 2, 0);
sh.lineTo(0, h);
sh.lineTo(w / 2, 0);
sh.lineTo(-w / 2, 0);
var m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: d, bevelEnabled: false }), mat);
m.position.set(0, y, z - d / 2);
P.add(m);
[-1, 1].forEach(function (s) { var L = Math.hypot(w / 2, h) + 0.5, c = poeBox(P, L, 0.3, d + 0.3, mat, s * w / 4, y + h / 2 + 0.12, z); c.rotation.z = -s * Math.atan2(h, w / 2); });
poeBox(P, w + 0.6, 0.3, d + 0.3, mat, 0, y - 0.05, z);
return m;
},
function (R, g) {
var E = POE_PAR_MON.enfer, lite = POE.lite, st = poeParLit(poeS("stone", 0xD8D0BC)), dk = poeParLit(poeS("stone", 0x9A9284)), shade = poeC(0x2A2620), made = [];
[-1, 1].forEach(function (s) {
var P = poeGrp(g, E[0] + s * 26, 0, E[1], 0);
P.userData.era = 0;
made.push(P);
poeR2RustFace(P, 14.02, 5.7, 0, 3.15, -7.03, Math.PI);
poeR2RustFace(P, 14.02, 5.7, 0, 3.15, 7.03, 0);
poeR2RustFace(P, 14.02, 5.7, 7.03, 3.15, 0, Math.PI / 2);
poeR2RustFace(P, 14.02, 5.7, -7.03, 3.15, 0, -Math.PI / 2);
poeBox(P, 14.4, 0.5, 14.4, dk, 0, 0.25, 0);
poeBox(P, 14.3, 0.25, 14.3, st, 0, 6.1, 0);
[-1, 1].forEach(function (f) {
var z = f * 7.6;
for (var c = 0; c < 4; c++) {
var cx = -4.5 + c * 3;
if (f > 0)
poeCyl(P, 0.45, 0.5, 6, st, cx, 3, z, lite ? 8 : 12);
poeCyl(P, 0.68, 0.7, 0.35, dk, cx, 0.42, z, lite ? 8 : 12);
poeBox(P, 1.15, 0.32, 1.15, st, cx, 5.86, z);
poeBox(P, 1.0, 0.14, 1.0, dk, cx, 5.64, z);
if (!lite)
for (var b = 1; b <= 4; b++)
poeBox(P, 0.92, 0.32, 0.92, st, cx, b * 1.15, z);
}
if (f > 0)
poeBox(P, 15, 0.8, 1.6, st, 0, 6.4, z);
poeR2Pediment(P, 15, 2.2, 1.6, st, 6.95, z);
var wr = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.12, 6, lite ? 10 : 16), dk);
wr.position.set(0, 7.8, z + f * 0.82);
P.add(wr);
if (f < 0) {
var sg = wSign([s < 0 ? "BARRIÈRE D’ENFER · ENTRÉE DES CATACOMBES" : "BARRIÈRE D’ENFER · OCTROI DE PARIS"], 8, 0.6, "#C8C0AC", "#2A2420");
sg.position.set(0, 6.4, z - 0.82);
sg.rotation.y = Math.PI;
P.add(sg);
}
for (var st2 = 0; st2 < 3; st2++)
poeBox(P, 15 - st2 * 0.6, 0.15, 2.6 - st2 * 0.5, dk, 0, 0.075 + st2 * 0.15, z + f * (0.6 + st2 * 0.25));
});
[-1, 1].forEach(function (f) {
for (var w = 0; w < 2; w++) {
var wz = -3 + w * 6, lit = s > 0 && f < 0 && w === 0, wm = lit ? poeGlowM(0xE8B060) : shade;
var wf = poeFace(P, 1.6, 2.6, wm, f * 7.08, 3.0, wz, f * Math.PI / 2);
var ar = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.16, 4, lite ? 8 : 12, Math.PI), dk);
ar.position.set(f * 7.1, 4.3, wz);
ar.rotation.y = f * Math.PI / 2;
P.add(ar);
poeBox(P, 0.24, 0.2, 2.0, dk, f * 7.12, 1.6, wz);
if (lit) {
var gl = wGlow(0xFFB860, 3, 0.5);
gl.position.set(f * 7.6, 3, wz);
P.add(gl);
}
}
});
});
return made;
},
function (R, g) {
var D = POE_PAR_AT.flamel;
if (!D)
return [];
var n = D.n, ry = Math.atan2(n[0], n[1]), fg = poeGrp(g, D.b[0] + 0.5 + n[0] * 0.62, 0, D.b[1] + 0.5 + n[1] * 0.62, ry), lite = POE.lite;
fg.userData.era = -1;
var cs = poeParLit(poeS("stone", 0xB8B0A0)), dk = poeParLit(poeS("stone", 0x8A8274)), oak = poeS("oak", 0x3A2414);
poeBox(fg, 9.0, 0.16, 0.22, dk, 0, 3.94, 0.34);
poeBox(fg, 9.0, 0.16, 0.22, dk, 0, 2.86, 0.34);
poeBox(fg, 9.2, 0.08, 0.3, cs, 0, 4.06, 0.36);
[-4.2, -1.4, 1.4, 4.2].forEach(function (px, i) {
var F = poeGrp(fg, px, 4.2, 0.42, 0), angel = i === 0 || i === 3;
poeBox(F, 0.62, 0.2, 0.36, dk, 0, 0.1, 0);
var b = poeCyl(F, angel ? 0.14 : 0.16, 0.26, angel ? 1.05 : 0.8, cs, 0, angel ? 0.72 : 0.6, 0, 8);
poeSph(F, 0.13, cs, 0, angel ? 1.37 : 1.12, 0.02, 8);
if (angel) {
[-1, 1].forEach(function (k) { var w = poeBox(F, 0.08, 0.75, 0.42, cs, k * 0.2, 1.0, -0.08); w.rotation.z = k * 0.35; });
var sc = poeBox(F, 0.5, 0.14, 0.08, poeParLit(poeS("stone", 0xD0C8B8)), 0, 0.85, 0.2);
}
else {
poeBox(F, 0.22, 0.24, 0.14, cs, 0, 0.86, 0.2);
poeBox(F, 0.36, 0.14, 0.34, cs, 0, 0.24, 0.12);
}
var cn = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.6, 4), dk);
cn.rotation.y = Math.PI / 4;
cn.position.y = angel ? 1.95 : 1.7;
F.add(cn);
poeBox(F, 0.6, 0.1, 0.4, dk, 0, angel ? 1.62 : 1.38, 0);
});
var W = poeGrp(fg, 0, 1.4, 0.06, 0);
[-1.2, 1.2].forEach(function (x) { poeBox(W, 0.12, 2.7, 0.12, oak, x, 0, 0.06); });
[-1.3, 1.3].forEach(function (y) { poeBox(W, 2.5, 0.12, 0.12, oak, 0, y, 0.06); });
[-0.4, 0.4].forEach(function (x) { poeBox(W, 0.05, 2.5, 0.05, oak, x, 0, 0.08); });
poeBox(W, 2.4, 0.05, 0.05, oak, 0, 0.45, 0.08);
poeBox(W, 2.4, 0.05, 0.05, oak, 0, -0.35, 0.08);
poeBox(W, 2.6, 0.1, 0.34, oak, 0, -1.38, 0.16);
var bc = [0x5A1A14, 0x1A2A4A, 0x3A2A14, 0x2A3A1A, 0x6A4A1A];
for (var sh = 0; sh < 2; sh++)
for (var bk = 0; bk < (lite ? 6 : 11); bk++) {
var bx = -1.05 + bk * (2.1 / (lite ? 6 : 11)), h = 0.22 + ((bk * 7 + sh * 3) % 4) * 0.04;
poeBox(W, 0.13, h, 0.16, poeC(bc[(bk + sh) % 5]), bx, (sh ? 0.47 : -0.33) + h / 2, 0.02);
}
for (var j = 0; j < 3; j++) {
poeCyl(W, 0.09, 0.1, 0.26, poeShine([0x3A5A4A, 0x6A4A2A, 0x2A3A5A][j], 0.2, 0.3), -0.6 + j * 0.6, -1.2, 0.06, 8);
}
var br = poeBox(fg, 0.05, 0.05, 1.2, poeShine(0x141414, 0.6, 0.7), -4.3, 3.0 + 1.6, 0.9);
var sg = wSign(["N. FLAMEL", "ESCRIVAIN"], 1.0, 0.6, "#2A1E14", "#E8D8A8");
sg.position.set(-4.3, 4.2, 1.1);
sg.rotation.y = Math.PI / 2;
fg.add(sg);
var sg2 = sg.clone();
sg2.rotation.y = -Math.PI / 2;
fg.add(sg2);
var pool = poePlane(fg, 4.4, 3.2, POE.mats.r2fpool || (POE.mats.r2fpool = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.6, map: wTex(64, 64, function (x, W2, H2) { var gr = x.createRadialGradient(W2 / 2, H2 * 0.2, 1, W2 / 2, H2 * 0.3, W2 * 0.6); gr.addColorStop(0, "rgba(255,190,110,.7)"); gr.addColorStop(1, "rgba(255,160,80,0)"); x.fillStyle = gr; x.fillRect(0, 0, W2, H2); }) })), 0, 0.04, 1.7, 0);
if (!lite) {
var pl = new THREE.PointLight(0xFFB070, 0.9, 7, 2);
pl.position.set(0, 1.6, 1.2);
fg.add(pl);
}
return [fg];
},
function (x, W, H) {
x.fillStyle = "#34342C";
x.fillRect(0, 0, W, H);
poeNz(x, W, H, 9000, 0.25, 551);
poeNz(x, W, H, 4000, 0.18, 552, "200,200,170");
var R = wRand(553);
for (var i = 0; i < 900; i++) {
var px = R() * W, py = R() * H, sh = 50 + R() * 70 | 0;
x.strokeStyle = "rgba(" + sh + "," + (sh + 8) + "," + (sh - 14) + ",.55)";
x.lineWidth = 1;
x.beginPath();
x.moveTo(px, py);
x.lineTo(px + (R() - 0.5) * 6, py - 5 - R() * 9);
x.stroke();
}
for (var j = 0; j < 70; j++) {
x.fillStyle = "rgba(" + (110 + R() * 60 | 0) + "," + (104 + R() * 50 | 0) + ",90,.5)";
x.beginPath();
x.ellipse(R() * W, R() * H, 1 + R() * 2.5, 1 + R() * 1.8, R() * 3, 0, 7);
x.fill();
}
poeStain(x, W, H, 12, 554, "18,16,10", 0.35);
},
function (x, z, c0) {
var n = wNoise(x * 0.018 + 3, z * 0.018 + 5, 7), n2 = wNoise(x * 0.07, z * 0.07, 9), c;
c = n > 0.62 ? 0x5E6438 : n < 0.34 ? 0x5A4630 : 0x44602C;
if (n2 > 0.7)
c = 0x707040;
for (var i = 0; i < POE_R3_ZONES.length; i++) {
var Z = POE_R3_ZONES[i], d = Math.hypot(x - Z[0], z - Z[1]);
if (d > Z[2])
continue;
if (Z[3] === "snow")
c = n2 > 0.58 ? 0x6A7058 : 0xC4C8D0;
else if (Z[3] === "moss")
c = n2 > 0.5 ? 0x3E4834 : 0x55543E;
else if (Z[3] === "town")
c = d < Z[2] * 0.6 ? (n2 > 0.5 ? 0x463E34 : 0x3E3228) : (n2 > 0.5 ? 0x3E4A2C : 0x403628);
else if (Z[3] === "field")
c = n2 > 0.55 ? 0x5A5A3C : 0x56603E;
else
c = n2 > 0.6 ? 0x5A6644 : 0x4A5838;
break;
}
return c;
},
function (col) {
var k = "r3tuft" + col;
if (POE.mats[k])
return POE.mats[k];
if (!POE.r3tuftTex)
POE.r3tuftTex = wTex(64, 64, function (x, W, H) { x.clearRect(0, 0, W, H); for (var k2 = 0; k2 < 26; k2++) {
var bx = 6 + Math.random() * (W - 12), v = 150 + Math.random() * 90 | 0;
x.strokeStyle = "rgb(" + v + "," + v + "," + (v - 30) + ")";
x.lineWidth = 1.4 + Math.random();
x.beginPath();
x.moveTo(bx, H);
x.quadraticCurveTo(bx + (Math.random() - 0.5) * 8, H * 0.55, bx + (Math.random() - 0.5) * 20, H * (0.08 + Math.random() * 0.4));
x.stroke();
} });
return (POE.mats[k] = new THREE.MeshLambertMaterial({ color: col, map: POE.r3tuftTex, side: THREE.DoubleSide, transparent: true, alphaTest: 0.4 }));
},
function (G, cx, cz, r0, r1, n, col, seed) {
var R = wRand(seed), L = [];
n = POE.lite ? Math.ceil(n / 3) : n;
for (var t = 0; t < n * 3 && L.length < n; t++) {
var a = R() * 6.283, d = r0 + Math.sqrt(R()) * (r1 - r0), x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
if (poeRoadD(x, z) < 4 || poeTarnIn(x, z) < 1.15 || poeFloorAt(x, z, poeLand(x, z) + 2) !== null || poeSolidAt(x, z, poeLand(x, z) + 0.3))
continue;
L.push([x, poeLand(x, z), z, 0.45 + R() * 0.6, R() * 3]);
}
if (!L.length)
return;
if (!POE.r3tuftG) {
var a1 = new THREE.PlaneGeometry(1.1, 0.75);
a1.translate(0, 0.37, 0);
var a2 = a1.clone();
a2.rotateY(Math.PI / 2);
POE.r3tuftG = gwMerge([a1.toNonIndexed(), a2.toNonIndexed()]);
}
var im = new THREE.InstancedMesh(POE.r3tuftG, poeR3TuftMat(col), L.length), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), V = new THREE.Vector3(), E = new THREE.Euler();
L.forEach(function (p, i) { E.set(0, p[4], 0); Q.setFromEuler(E); V.set(p[0], p[1], p[2]); S.set(p[3], p[3], p[3]); M.compose(V, Q, S); im.setMatrixAt(i, M); });
G.add(im);
},
function () {
if (POE.r3tg)
return POE.r3tg;
var T = {};
T.trunk = new THREE.CylinderGeometry(0.22, 0.4, 5.6, 7);
T.trunk.translate(0, 2.8, 0);
var c1 = new THREE.IcosahedronGeometry(3.2, 1);
c1.scale(1, 1.2, 1);
c1.translate(0, 7.6, 0);
var c2 = new THREE.IcosahedronGeometry(2.2, 1);
c2.translate(1.6, 9.8, 0.5);
var c3 = new THREE.IcosahedronGeometry(2.0, 1);
c3.translate(-1.5, 8.8, -0.8);
T.elm = gwMerge([c1.toNonIndexed(), c2.toNonIndexed(), c3.toNonIndexed()]);
if (typeof poeR4Kit === "function") {
var K4 = poeR4Kit();
T.trunk = K4.wood;
T.elm = K4.elm;
T.yew = K4.yew;
T.leafy = 1;
}
var y1 = new THREE.ConeGeometry(2.6, 7.5, 8);
y1.translate(0, 6.2, 0);
var y2 = new THREE.ConeGeometry(2.0, 5, 8);
y2.translate(0, 9.4, 0);
T.yew = gwMerge([y1.toNonIndexed(), y2.toNonIndexed()]);
var br = [];
for (var b = 0; b < 7; b++) {
var g = new THREE.CylinderGeometry(0.05, 0.13, 3.2 - b * 0.2, 5);
g.translate(0, 1.6, 0);
g.rotateZ(0.6 + (b % 3) * 0.2);
g.rotateY(b * 0.9);
g.translate(0, 3.2 + b * 0.45, 0);
br.push(g.toNonIndexed());
}
T.dead = gwMerge(br);
return (POE.r3tg = T);
},
function (G, list) {
if (!list.length)
return;
var T = poeR3TreeGeos(), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), V = new THREE.Vector3(), E = new THREE.Euler();
var by = { elm: [], yew: [], dead: [] };
list.forEach(function (q) { by[q[4]].push(q); });
var trunk = new THREE.InstancedMesh(T.trunk, poeS("bark", 0x5A5046), list.length);
list.forEach(function (q, i) { E.set(0, i * 1.7, 0); Q.setFromEuler(E); V.set(q[0], q[1], q[2]); S.set(q[3], q[3] * (q[4] === "yew" ? (T.leafy ? 0.4 : 0.5) : 1), q[3]); M.compose(V, Q, S); trunk.setMatrixAt(i, M); });
G.add(trunk);
[["elm", T.leafy ? poeR4LeafMat(0x5A6E44, "elm") : new THREE.MeshLambertMaterial({ color: 0x26341F })], ["yew", T.leafy ? poeR4LeafMat(0x34442E, "yew") : new THREE.MeshLambertMaterial({ color: 0x121A12 })], ["dead", poeS("bark", 0x7A7468)]].forEach(function (k) {
var L = by[k[0]];
if (!L.length)
return;
var im = new THREE.InstancedMesh(T[k[0]], k[1], L.length);
L.forEach(function (q, i) { E.set(0, i * 2.3 + q[0], 0); Q.setFromEuler(E); V.set(q[0], q[1], q[2]); S.set(q[3], q[3], q[3]); M.compose(V, Q, S); im.setMatrixAt(i, M); });
G.add(im);
});
},
function (list, cx, cz, r0, r1, n, mix, seed, rx, zmax) {
var R = wRand(seed);
n = POE.lite ? Math.ceil(n * 0.45) : n;
rx = rx || 1;
for (var t = 0; t < n * 6 && n > 0; t++) {
var a = R() * 6.283, d = r0 + R() * (r1 - r0), x = cx + Math.cos(a) * d * rx, z = cz + Math.sin(a) * d;
if ((zmax != null && z > zmax) || poeRoadD(x, z) < 7 || poeTarnIn(x, z) < 1.3)
continue;
var ly = poeLand(x, z);
if (poeFloorAt(x, z, ly + 2) !== null || poeSolidAt(x, z, ly + 0.3) || poeSolidAt(x + 2.5, z, ly + 0.3) || poeSolidAt(x - 2.5, z, ly + 0.3) || poeSolidAt(x, z + 2.5, ly + 0.3) || poeSolidAt(x, z - 2.5, ly + 0.3))
continue;
var k = R(), kind = k < mix[0] ? "elm" : k < mix[0] + mix[1] ? "yew" : "dead";
list.push([x, poeLand(x, z), z, 0.8 + R() * 0.6, kind]);
poeSolid(x, z, 0.8, 0.8, -2, 6);
n--;
}
},
function () {
if (POE.mats.r3hedge)
return POE.mats.r3hedge;
var t = wTex(128, 64, function (x, W, H) { x.fillStyle = "#1E2A18"; x.fillRect(0, 0, W, H); for (var i = 0; i < 900; i++) {
var v = 30 + Math.random() * 60 | 0;
x.fillStyle = "rgb(" + (v - 6) + "," + (v + 16) + "," + (v - 14) + ")";
x.beginPath();
x.ellipse(Math.random() * W, Math.random() * H, 1.5 + Math.random() * 2.5, 1 + Math.random() * 1.5, Math.random() * 3, 0, 7);
x.fill();
} }, [1, 1]);
return (POE.mats.r3hedge = new THREE.MeshLambertMaterial({ map: t, color: 0xC8D0B8 }));
},
function (G, lines, seed) {
var R = wRand(seed), segs = [];
lines.forEach(function (L) {
var a = L[0], b = L[1], len = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.floor(len / 4.2), ry = Math.atan2(-(b[1] - a[1]), b[0] - a[0]);
for (var i = 0; i < n; i++) {
if (R() < 0.1)
continue;
var t = (i + 0.5) / n, x = a[0] + (b[0] - a[0]) * t, z = a[1] + (b[1] - a[1]) * t;
if (poeRoadD(x, z) < 5 || poeTarnIn(x, z) < 1.3 || poeSolidAt(x, z, poeLand(x, z) + 0.3) || poeFloorAt(x, z, poeLand(x, z) + 2) !== null)
continue;
segs.push([x, poeLand(x, z), z, ry, 1.3 + R() * 0.6]);
}
});
if (POE.lite)
segs = segs.filter(function (s, i) { return i % 2 === 0; });
if (!segs.length)
return;
if (!POE.r3hedgeG) {
var g = new THREE.BoxGeometry(4.3, 1, 1.3, 1, 1, 1);
g.translate(0, 0.5, 0);
var p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
if (p.getY(i) > 0.9)
p.setZ(i, p.getZ(i) * 0.7);
}
g.computeVertexNormals();
POE.r3hedgeG = g;
}
var im = new THREE.InstancedMesh(POE.r3hedgeG, poeR3HedgeMat(), segs.length), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), V = new THREE.Vector3(), E = new THREE.Euler();
segs.forEach(function (s, i) { E.set(0, s[3], 0); Q.setFromEuler(E); V.set(s[0], s[1] - 0.1, s[2]); S.set(1, s[4], 1); M.compose(V, Q, S); im.setMatrixAt(i, M); poeSolid(s[0], s[2], 4.3, 1.3, -2, 2, s[3]); });
G.add(im);
},
function (G, x0, z0, x1, z1, kind) {
var w = x1 - x0, d = z1 - z0, g = new THREE.PlaneGeometry(w, d, Math.ceil(w / 8), Math.ceil(d / 8));
g.rotateX(-Math.PI / 2);
var p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i) + (x0 + x1) / 2, z = p.getZ(i) + (z0 + z1) / 2;
p.setY(i, poeLand(x, z) + 0.07);
}
g.computeVertexNormals();
var uv = g.attributes.uv;
for (var j = 0; j < uv.count; j++)
uv.setXY(j, uv.getX(j) * w / 6, uv.getY(j) * d / 6);
var k = "r3field" + kind;
if (!POE.mats[k]) {
var t = wTex(128, 128, function (x, W, H) {
if (kind) {
x.fillStyle = "#6A6440";
x.fillRect(0, 0, W, H);
for (var r = 0; r < 16; r++) {
x.fillStyle = r % 2 ? "rgba(150,140,90,.6)" : "rgba(70,62,38,.5)";
x.fillRect(0, r * H / 16, W, H / 32);
}
poeNz(x, W, H, 3000, 0.25, 561, "220,210,150");
}
else {
x.fillStyle = "#3A3024";
x.fillRect(0, 0, W, H);
for (var r2 = 0; r2 < 12; r2++) {
var gr = x.createLinearGradient(0, r2 * H / 12, 0, (r2 + 1) * H / 12);
gr.addColorStop(0, "#5A4A36");
gr.addColorStop(0.5, "#2A2218");
gr.addColorStop(1, "#4A3C2C");
x.fillStyle = gr;
x.fillRect(0, r2 * H / 12, W, H / 12);
}
poeNz(x, W, H, 4000, 0.2, 562);
}
}, [1, 1]);
POE.mats[k] = new THREE.MeshLambertMaterial({ map: t, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
}
var m = new THREE.Mesh(g, POE.mats[k]);
m.position.set((x0 + x1) / 2, 0, (z0 + z1) / 2);
G.add(m);
return m;
},
function (G) {
var g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: 470, z: 1120, r: 300 });
var lite = POE.lite;
poeR3Field(g, 388, 1106, 438, 1146, 1);
poeR3Field(g, 496, 1110, 560, 1160, 0);
if (!lite)
poeR3Field(g, 500, 1166, 560, 1214, 1);
poeR3Hedges(g, [[[386, 1050], [448, 1050]], [[386, 1050], [386, 1148]], [[386, 1148], [440, 1148]], [[448, 1050], [448, 1100]], [[386, 1103], [446, 1103]], [[494, 1108], [562, 1108]], [[562, 1108], [562, 1216]], [[494, 1162], [562, 1162]], [[494, 1108], [494, 1150]], [[494, 1216], [562, 1216]]], 3901);
var fx = 414, fz = 1084;
if (poeR2Free(fx, fz, 7)) {
poeBuilding(g, { x: fx, z: fz, ry: Math.PI / 2, w: 12, d: 7, h: 5.2, floors: 2, wall: "whitewash", col: 0xC8C0A8, roofMat: "rough", roofH: 3, win: "shutter", lit: [1, 4, 6], chim: 1 });
var bg = poeGrp(g, fx - 4, poeLand(fx - 4, fz - 16), fz - 16, 0);
poeBox(bg, 14, 5, 8, poeS("boards", 0x5A4A3A), 0, 2.5, 0);
var sh = new THREE.Shape();
sh.moveTo(-4.6, 0);
sh.lineTo(0, 3.6);
sh.lineTo(4.6, 0);
sh.lineTo(-4.6, 0);
var rf = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 14.6, bevelEnabled: false }), poeS("rough", 0x6A5A44));
rf.rotation.y = Math.PI / 2;
rf.position.set(-7.3, 5, 0);
bg.add(rf);
poeFace(bg, 3.6, 4, poeC(0x1A140E), 0, 2, 4.02, 0);
poeSolid(fx - 4, fz - 16, 14.4, 8.4, -2, 9);
var hy = poeLand(fx + 14, fz - 14);
poeCyl(g, 2.4, 2.8, 3, poeC(0x8A7A4A), fx + 14, hy + 1.5, fz - 14, 12);
var cn = new THREE.Mesh(new THREE.ConeGeometry(2.6, 2.6, 12), poeC(0x7A6A3E));
cn.position.set(fx + 14, hy + 4.3, fz - 14);
g.add(cn);
poeSolid(fx + 14, fz - 14, 5.4, 5.4, -2, 6);
var Mo = typeof poeLfModels === "function" ? poeLfModels() : null;
if (Mo) {
var m = new THREE.Mesh(Mo.cart, Mo.mat);
m.position.set(fx + 9, poeLand(fx + 9, fz - 4), fz - 4);
m.rotation.y = 1.1;
g.add(m);
poeSolid(fx + 9, fz - 4, 2.6, 3.6, -2, 3, 1.1);
}
for (var f = 0; f < 8; f++) {
var px = fx + 6 + f * 2.5, pz = fz + 8;
poeCyl(g, 0.06, 0.07, 1.2, poeS("oak", 0x5A4A3A), px, poeLand(px, pz) + 0.6, pz, 5);
if (f < 7)
poeBox(g, 2.5, 0.07, 0.05, poeS("oak", 0x5A4A3A), px + 1.25, poeLand(px, pz) + 0.9, pz);
}
poeR2Folk(g, fx + 8, fz - 6, 2, 8, [["poorf", "The farmer's wife", "f", "“Bread and a bed, if you're walking to Paris. The inns at the Barrière cheat everybody.”"], ["workman", "A farmhand", "m", "“Ploughed it twice. Nothing will grow in it. Nothing ever does, here.”"]], 2, 3902, { wr: 4 });
}
var mx = 458.4, mz = 1146, my = poeLand(mx, mz), ms = poeGrp(g, mx, my, mz, Math.PI / 2);
poeBox(ms, 0.7, 1.2, 0.4, poeS("stone", 0xC8C0AC), 0, 0.45, 0);
poeCyl(ms, 0.35, 0.35, 0.4, poeS("stone", 0xC8C0AC), 0, 1.2, 0, 12).rotation.x = Math.PI / 2;
var lab = wSign(["PARIS", "1 L."], 0.5, 0.4, "#C8C0AC", "#2A2420");
lab.position.set(0, 0.8, 0.21);
ms.add(lab);
poeSolid(mx, mz, 0.6, 0.6, -2, 1.4);
poeR2Folk(g, 470, 1110, 1, 8, [["workman", "A carter walking by his horse", "m", "“Six sous a cask, at the Barrière. Every cask. Robbery.”"], ["poorf", "A market woman with her basket", "f", "“Eggs for the Halles. If they don't break, I eat this week.”"], ["gendarme", "A gendarme on his round", "m", "“Papers? No? Go on, then, but keep to the road.”"], ["gent", "A traveller on foot", "m", "“The diligence broke an axle at Montrouge. So I walk.”"], ["sailor", "A sailor going home", "m", "“Le Havre to Paris on foot. My boots are older than the King.”"]], 10, 3903, { wr: 14 });
poeR3Tufts(g, 470, 1120, 12, 120, 420, 0x5E6A44, 3904);
},
function (x, W, H) {
poeBlocks(x, W, H, 6, 2, [122, 120, 112], 34, "#3A3832", 13, true);
var R = wRand(571);
for (var i = 0; i < 26; i++) {
x.fillStyle = "rgba(" + (40 + R() * 20 | 0) + "," + (56 + R() * 20 | 0) + ",34," + (0.15 + R() * 0.2) + ")";
x.beginPath();
x.ellipse(R() * W, R() * H, 4 + R() * 16, 2 + R() * 10, R() * 3, 0, 7);
x.fill();
}
poeStain(x, W, H, 10, 572, "20,22,16", 0.3);
},
function () {
if (POE.mats.r3ivy)
return POE.mats.r3ivy;
var t = wTex(128, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = wRand(581);
for (var s = 0; s < 0; s++) {
var sx = 0, y = H;
x.strokeStyle = "#2A2416";
x.lineWidth = 2;
x.beginPath();
x.moveTo(sx, H);
for (var k = 0; k < 12; k++) {
sx += (R() - 0.5) * 18;
y -= H / 12 * (0.6 + R() * 0.6);
x.lineTo(sx, y);
}
x.stroke();
}
for (var s2 = 0; s2 < 9; s2++) {
var vx = W * (0.08 + R() * 0.84), vy = H, top = H * (0.05 + R() * 0.5);
while (vy > top) {
vx += (R() - 0.5) * 6;
vy -= 3 + R() * 3;
for (var l = 0; l < 3; l++) {
var v = 22 + R() * 40 | 0;
x.fillStyle = "rgb(" + (v - 6) + "," + (v + 12) + "," + (v - 12) + ")";
x.beginPath();
x.ellipse(vx + (R() - 0.5) * 22, vy + (R() - 0.5) * 8, 3 + R() * 3, 2 + R() * 2, R() * 3, 0, 7);
x.fill();
}
}
}
});
return (POE.mats.r3ivy = new THREE.MeshLambertMaterial({ map: t, transparent: true, alphaTest: 0.45, side: THREE.DoubleSide }));
},
function (G) {
var A = POE_AT.usher, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x, z: -560, r: 320 });
var lite = POE.lite, fz = A.z + 13.08, R = wRand(5701);
var old = [poeS("gothic", 0x8A847C), poeS("stone", 0x6A665E)], nw = [poeS("usher3", 0x9C9EA8), poeS("usher3", 0x868892)];
if (POE.usherG)
POE.usherG.traverse(function (o) { if (!o.isMesh)
return; var k = old.indexOf(o.material); if (k >= 0)
o.material = nw[k]; });
var iv = poeR3IvyMat();
[[-38, 10, 16], [-26, 6, 9], [-9, 5, 7], [6, 7, 12], [22, 5, 8], [36, 8, 14], [-30, 4, 20], [30, 5, 22]].forEach(function (q, i) {
if (lite && i % 2)
return;
var tw = i > 5, w = q[1], h = q[2], z = tw ? A.z + 2 + 5.25 : fz + 0.05;
var m = poeFace(g, w, h, iv, A.x + q[0], h / 2, z, 0);
if (tw)
m.position.z = A.z + 2 + 5.3;
});
var fm = poeC(0xB8A880);
for (var f = 0; f < (lite ? 10 : 26); f++) {
var x = A.x - 40 + R() * 80, y = 0.6 + R() * 4;
if (Math.abs(x - A.x) < 4)
continue;
var s = poeSph(g, 0.22 + R() * 0.18, fm, x, y, fz + 0.06, 8);
s.scale.set(1.2, 0.3, 0.8);
}
var st = poeS("usher3", 0xA8A8B4);
for (var b = 0; b < (lite ? 6 : 14); b++) {
var bx = A.x - 40 + R() * 80, k = poeBox(g, 1.0 + R() * 0.8, 0.5 + R() * 0.6, 0.8 + R() * 0.5, st, bx, 18.6 + R() * 0.4, A.z + 12.2 - R() * 2);
k.rotation.set(R() * 0.8, R() * 2, R() * 0.8);
}
for (var c = 0; c < 6; c++) {
var cx = A.x - 36 + c * 14 + R() * 4, cp = poeBox(g, 2.4 + R() * 2, 0.5, 0.9, st, cx, 18.3, A.z + 13.4);
cp.rotation.z = (R() - 0.5) * 0.35;
cp.rotation.x = 0.15;
}
if (POE.tarn && POE.tarn.material.specular) {
POE.tarn.material.specular.setHex(0x0E1016);
POE.tarn.material.shininess = 40;
POE.tarn.material.color.setHex(0x05070A);
}
try {
poeR3Reflect(g, A);
}
catch (e) {
if (window.console)
console.warn("[poe] r3 reflection", e);
}
poeR3Tufts(g, A.x, A.z + 10, 20, 120, 260, 0x7A7A58, 5702);
var tr = [];
poeR3Ring(tr, A.x, A.z - 20, 55, 150, 34, [0.1, 0.25, 0.65], 5703, 1, A.z + 2);
poeR3Trees(g, tr);
},
function (g, A) {
var NU = 14, NV = 12, X0 = -37, X1 = 37, Y1 = 40, zf = A.z + 13, yw = POE_WATER, g2 = new THREE.BufferGeometry(), pos = new Float32Array(NU * NV * 3), uv = new Float32Array(NU * NV * 2), idx = [];
for (var j = 0; j < NV; j++)
for (var i = 0; i < NU; i++) {
var k = j * NU + i;
uv[k * 2] = i / (NU - 1);
uv[k * 2 + 1] = j / (NV - 1);
if (i < NU - 1 && j < NV - 1) {
var a = k, b = k + 1, c = k + NU, d = k + NU + 1;
idx.push(a, c, b, b, c, d);
}
}
g2.setAttribute("position", new THREE.BufferAttribute(pos, 3));
g2.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
g2.setIndex(idx);
var tex = wTex(256, 256, function (x, W, H) {
var gr = x.createLinearGradient(0, H, 0, 0);
gr.addColorStop(0, "rgba(60,66,84,.0)");
gr.addColorStop(0.12, "rgba(70,78,100,.5)");
gr.addColorStop(1, "rgba(40,44,60,.3)");
x.fillStyle = gr;
x.fillRect(0, 0, W, H);
function X(u) { return (u - X0) / (X1 - X0) * W; }
function Y(y) { return H - y / Y1 * H; }
x.fillStyle = "rgba(6,6,8,.96)";
x.fillRect(X(-28), Y(18.6), X(28) - X(-28), H - Y(18.6));
for (var m = -27; m < 27; m += 3.2)
x.fillRect(X(m), Y(19.6), X(1.6) - X(0), Y(18) - Y(19.6));
x.beginPath();
x.moveTo(X(-28), Y(18.4));
x.lineTo(X(-20), Y(25));
x.lineTo(X(20), Y(25));
x.lineTo(X(28), Y(18.4));
x.fill();
[-30, 30].forEach(function (t) { x.fillRect(X(t - 5.2), Y(28), X(10.4) - X(0), H - Y(28)); x.beginPath(); x.moveTo(X(t - 6), Y(28)); x.lineTo(X(t), Y(38)); x.lineTo(X(t + 6), Y(28)); x.fill(); });
x.fillStyle = "rgba(200,140,70,.65)";
[[-17.5, 14.2], [17.5, 3.4], [-3.5, 8.8], [-14, 8.8]].forEach(function (w) { x.fillRect(X(w[0] - 0.6), Y(w[1] + 1.3), X(1.2) - X(0), Y(0) - Y(2.6)); });
x.strokeStyle = "rgba(0,0,0,.9)";
x.lineWidth = 2;
x.beginPath();
x.moveTo(X(0), Y(26));
x.lineTo(X(0.6), Y(20));
x.lineTo(X(-0.5), Y(13));
x.lineTo(X(0.5), Y(6));
x.lineTo(X(0), Y(0));
x.stroke();
for (var r = 0; r < 40; r++) {
x.fillStyle = "rgba(120,130,150,.12)";
x.fillRect(0, Math.random() * H, W, 1);
}
x.globalCompositeOperation = "destination-out";
[[0, 1], [W, -1]].forEach(function (e) { var fg = x.createLinearGradient(e[0], 0, e[0] + e[1] * W * 0.12, 0); fg.addColorStop(0, "rgba(0,0,0,1)"); fg.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = fg; x.fillRect(e[1] > 0 ? 0 : W * 0.88, 0, W * 0.12, H); });
x.globalCompositeOperation = "source-over";
});
var mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 1, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
var mesh = new THREE.Mesh(g2, mat);
mesh.frustumCulled = false;
mesh.renderOrder = 3;
g.add(mesh);
POE.r3refl = mesh;
var eye = new THREE.Vector3(), T = A.tarn;
mesh.onBeforeRender = function (ren, scene, cam) {
cam.getWorldPosition(eye);
g.worldToLocal(eye);
var h = eye.y - yw;
if (h < 0.2 || eye.z < zf + 4 || Math.abs(eye.x - A.x) > T.rx * 1.6) {
pos.fill(0);
g2.attributes.position.needsUpdate = true;
return;
}
for (var j = 0; j < NV; j++) {
var ym = yw - (j / (NV - 1)) * Y1 - 0.0;
for (var i = 0; i < NU; i++) {
var k = j * NU + i, px = A.x + X0 + (X1 - X0) * i / (NU - 1), t = h / (h + (yw - ym));
pos[k * 3] = eye.x + (px - eye.x) * t;
pos[k * 3 + 1] = yw + 0.04;
pos[k * 3 + 2] = eye.z + (zf - eye.z) * t;
}
}
g2.attributes.position.needsUpdate = true;
};
},
function (G) {
var lite = POE.lite, tr = [];
poeR3Ring(tr, -740, 780, 62, 120, 30, [0.75, 0.2, 0.05], 3911);
poeR3Tufts(G, -740, 780, 52, 110, 160, 0x5E6A44, 3912);
poeR3Ring(tr, 1000, 260, 42, 110, 60, [0.6, 0.3, 0.1], 3913, 1.7);
poeR3Tufts(G, 1000, 260, 26, 140, 180, 0x5E6A44, 3914);
poeR3Hedges(G, [[[880, 228], [880, 292]], [[900, 224], [1100, 224]], [[900, 296], [1100, 296]]], 3915);
poeR3Ring(tr, -960, 160, 70, 140, 30, [0.35, 0.6, 0.05], 3916);
poeR3Tufts(G, -960, 160, 60, 130, 140, 0x9A9468, 3917);
poeR3Ring(tr, 0, -1020, 140, 230, 40, [0.4, 0.45, 0.15], 3918);
poeR3Ring(tr, -130, -880, 8, 70, 22, [0.3, 0.5, 0.2], 3928);
poeR3Ring(tr, 140, -875, 8, 60, 14, [0.3, 0.5, 0.2], 3929);
poeR3Tufts(G, 0, -900, 10, 110, 240, 0x5E6A44, 3919);
poeR3Hedges(G, [[[-150, -905], [-40, -905]], [[40, -905], [150, -905]], [[-150, -905], [-150, -860]], [[150, -905], [150, -860]]], 3920);
poeR3Ring(tr, 0, 560, 38, 110, 30, [0.2, 0.4, 0.4], 3921);
poeR3Tufts(G, 0, 540, 14, 90, 160, 0xB8BCAA, 3922);
poeR3Hedges(G, [[[-30, 516], [-12, 516]], [[12, 516], [30, 516]], [[-30, 516], [-30, 580]], [[30, 516], [30, 580]]], 3923);
poeR3Ring(tr, 0, 0, 95, 170, 26, [0.4, 0.3, 0.3], 3924);
poeR3Ring(tr, 410, 960, 30, 110, 30, [0.7, 0.15, 0.15], 3925);
poeR3Tufts(G, 430, 990, 8, 110, 260, 0x5E6A44, 3926);
poeR3Hedges(G, [[[380, 1000], [440, 1012]], [[360, 980], [380, 1000]], [[470, 990], [520, 970]]], 3927);
poeR3Trees(G, tr);
try {
poeR3Road5(G);
}
catch (e) {
if (window.console)
console.warn("[poe] r3 road", e);
}
try {
poeR3Usher(G);
}
catch (e) {
if (window.console)
console.warn("[poe] r3 usher", e);
}
},
function (col, k) {
var key = "r4leaf" + k + col;
if (POE.mats[key])
return POE.mats[key];
if (!POE.r4leafTex)
POE.r4leafTex = {};
if (!POE.r4leafTex[k])
POE.r4leafTex[k] = wTex(128, 128, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = wRand(k === "yew" ? 811 : 812), n = k === "yew" ? 520 : 380;
for (var i = 0; i < n; i++) {
var a = R() * 6.283, d = Math.pow(R(), 0.7) * W * 0.46, px = W / 2 + Math.cos(a) * d, py = H / 2 + Math.sin(a) * d * 0.9, v = 150 + R() * 105 | 0;
x.fillStyle = "rgb(" + (v - 30) + "," + v + "," + (v - 60) + ")";
x.beginPath();
if (k === "yew")
x.ellipse(px, py, 1.2, 4, a, 0, 7);
else
x.ellipse(px, py, 3.2 + R() * 2, 2 + R() * 1.4, R() * 3, 0, 7);
x.fill();
}
x.strokeStyle = "rgba(60,44,30,.8)";
x.lineWidth = 1.5;
for (var b = 0; b < 6; b++) {
var a2 = R() * 6.283;
x.beginPath();
x.moveTo(W / 2, H / 2);
x.lineTo(W / 2 + Math.cos(a2) * W * 0.4, H / 2 + Math.sin(a2) * H * 0.4);
x.stroke();
}
});
return (POE.mats[key] = new THREE.MeshLambertMaterial({ color: col, map: POE.r4leafTex[k], alphaTest: 0.5, side: THREE.DoubleSide }));
},
function () {
if (POE.r4kit)
return POE.r4kit;
var K = {}, R = wRand(821), lite = POE.lite;
var w = [];
var tr = new THREE.CylinderGeometry(0.2, 0.42, 6.4, 7);
tr.translate(0, 3.2, 0);
w.push(tr.toNonIndexed());
for (var l = 0; l < 5; l++) {
var L = 3.2 + R() * 1.2, c = new THREE.CylinderGeometry(0.08, 0.17, L, 5);
c.translate(0, L / 2, 0);
c.rotateZ(0.55 + R() * 0.35);
c.rotateY(l * 1.256 + R() * 0.4);
c.translate(0, 4.4 + R() * 1.6, 0);
w.push(c.toNonIndexed());
}
K.wood = gwMerge(w);
var e = [], ne = lite ? 12 : 22;
for (var i = 0; i < ne; i++) {
var a = R() * 6.283, u = R() * 2 - 1, rr = Math.sqrt(1 - u * u);
poeR4Card(e, Math.cos(a) * rr * 3.4, 8.4 + u * 2.6, Math.sin(a) * rr * 3.4, 3.0 + R() * 1.2, a);
}
for (var j = 0; j < (lite ? 3 : 6); j++)
poeR4Card(e, (R() - 0.5) * 2, 8.2 + (R() - 0.5) * 2, (R() - 0.5) * 2, 3.4, R() * 6);
K.elm = gwMerge(e);
var y = [], ny = lite ? 12 : 20;
for (var k = 0; k < ny; k++) {
var t = k / ny, a3 = k * 2.4, r3 = (1 - t) * 2.6 + 0.4;
poeR4Card(y, Math.cos(a3) * r3, 2.4 + t * 7.6, Math.sin(a3) * r3, 2.6 - t * 1.0, a3);
}
K.yew = gwMerge(y);
return (POE.r4kit = K);
},
function (k) {
var key = "r4cov" + k;
if (POE.mats[key])
return POE.mats[key];
var t = wTex(128, 128, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = wRand(830 + k);
var base = [[70, 86, 48], [88, 80, 52], [52, 44, 32], [94, 98, 70]][k];
for (var i = 0; i < 700; i++) {
var a = R() * 6.283, d = Math.pow(R(), 0.6) * W * 0.48, px = W / 2 + Math.cos(a) * d, py = H / 2 + Math.sin(a) * d, v = (R() - 0.5) * 40;
x.fillStyle = "rgba(" + (base[0] + v | 0) + "," + (base[1] + v | 0) + "," + (base[2] + v | 0) + "," + (0.5 + R() * 0.5) * (1 - d / (W * 0.5)) + ")";
x.beginPath();
if (k === 2)
x.ellipse(px, py, 2 + R() * 3, 1.5 + R() * 2, R() * 3, 0, 7);
else {
x.ellipse(px, py, 0.8, 2.5 + R() * 3, R() * 0.6 - 0.3, 0, 7);
}
x.fill();
}
});
return (POE.mats[key] = new THREE.MeshLambertMaterial({ map: t, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
},
function (G, cx, cz, r, n, kinds, seed, o) {
o = o || {};
var R = wRand(seed);
n = POE.lite ? Math.ceil(n / 3) : n;
if (!POE.r4covG) {
POE.r4covG = new THREE.PlaneGeometry(1, 1);
POE.r4covG.rotateX(-Math.PI / 2);
}
var by = {};
for (var t = 0; t < n * 3 && n > 0; t++) {
var a = R() * 6.283, d = Math.sqrt(R()) * r, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
if (!o.onRoad && poeRoadD(x, z) < 3.5)
continue;
if (poeTarnIn(x, z) < 1.05)
continue;
var y = poeGround(x, z, 1e4);
if (poeSolidAt(x, z, y + 0.3))
continue;
var k = kinds[(R() * kinds.length) | 0];
(by[k] = by[k] || []).push([x, y + 0.03 + t * 0.00002, z, 2 + R() * 4, R() * 6]);
n--;
}
Object.keys(by).forEach(function (k) {
var L = by[k], im = new THREE.InstancedMesh(POE.r4covG, poeR4CoverMat(+k), L.length), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), V = new THREE.Vector3(), E = new THREE.Euler();
L.forEach(function (p, i) { E.set(0, p[4], 0); Q.setFromEuler(E); V.set(p[0], p[1], p[2]); S.set(p[3], 1, p[3] * (0.6 + ((i * 7) % 5) * 0.1)); M.compose(V, Q, S); im.setMatrixAt(i, M); });
im.renderOrder = 1;
G.add(im);
});
},
function (G) {
var A = POE_AT.usher, T = A.tarn, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: 620, z: -490, r: 200 });
var lite = POE.lite, R = wRand(841);
if (POE.tarn) {
var old = POE.tarn.material;
POE.tarn.material = new THREE.MeshLambertMaterial({ color: 0x07090C, transparent: true, opacity: 0.96 });
if (old && old.dispose)
old.dispose();
}
if (POE.mats.r2sedge) {
var sg = new THREE.PlaneGeometry(1.6, 1.6);
sg.translate(0, 0.8, 0);
var s2 = sg.clone();
s2.rotateY(Math.PI / 2);
var reed = gwMerge([sg.toNonIndexed(), s2.toNonIndexed()]), L = [];
for (var t = 0; t < (lite ? 260 : 700) && L.length < (lite ? 90 : 260); t++) {
var an = Math.PI * (0.55 + R() * 0.75), rr = 0.9 + R() * 0.32, x = T.x + Math.cos(an) * T.rx * rr, z = T.z + Math.sin(an) * T.rz * rr;
if (Math.abs(x - A.x) < 6)
continue;
if (Math.hypot(x - 600, z + 470) < 2.2)
continue;
L.push([x, Math.max(poeLand(x, z), POE_WATER) - 0.1, z, 0.9 + R() * 0.9, R() * 3]);
}
var im = new THREE.InstancedMesh(reed, POE.mats.r2sedge, L.length), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), V = new THREE.Vector3(), E = new THREE.Euler();
L.forEach(function (p, i) { E.set(0, p[4], 0); Q.setFromEuler(E); V.set(p[0], p[1], p[2]); S.set(p[3] * 0.8, p[3] * 1.3, p[3] * 0.8); M.compose(V, Q, S); im.setMatrixAt(i, M); });
g.add(im);
}
var bark = poeS("bark", 0xB8B4A8);
[[612, -486, 0.4, 9], [628, -512, 1.3, 7], [604, -498, 2.2, 5], [640, -540, 0.9, 8]].forEach(function (f, i) { if (lite && i > 1)
return; var y = Math.max(poeLand(f[0], f[1]), POE_WATER) + 0.2, c = poeCyl(g, 0.28, 0.42, f[3], bark, f[0], y, f[1], 7); c.rotation.set(0.08, f[2], Math.PI / 2); var b = poeCyl(g, 0.1, 0.16, 2.4, bark, f[0] + Math.cos(f[2]) * 1.5, y + 0.7, f[1] - Math.sin(f[2]) * 1.5, 5); b.rotation.set(0.6, f[2], 0.4); });
var dt = poeDeadTree(g, 616, poeLand(616, -478), -478, 1.4, 93);
dt.rotation.z = -0.22;
dt.traverse(function (o) { if (o.isMesh)
o.material = bark; });
var st = poeS("stone", 0x6E6A62);
for (var k = 0; k < (lite ? 8 : 20); k++) {
var an2 = Math.PI * (0.6 + R() * 0.6), x2 = T.x + Math.cos(an2) * T.rx * (0.98 + R() * 0.1), z2 = T.z + Math.sin(an2) * T.rz * (0.98 + R() * 0.1);
if (Math.hypot(x2 - 600, z2 + 470) < 2)
continue;
var rk = new THREE.Mesh(new THREE.DodecahedronGeometry(0.3 + R() * 0.6, 0), st);
rk.position.set(x2, Math.max(poeLand(x2, z2), POE_WATER) + 0.05, z2);
rk.rotation.set(R() * 3, R() * 3, R() * 3);
rk.scale.y = 0.6;
g.add(rk);
}
poeR4Cover(g, 606, -468, 22, lite ? 10 : 30, [2, 1, 0], 842);
poeR4Tufts(g, 600, -466, 1.5, 22, lite ? 40 : 140, 0x6A6A48, 843);
},
function (G) {
var A = POE_AT.morgue, cx = A.x + 40, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: cx, z: A.z + 70, r: 200 });
var lite = POE.lite;
var tex = wTex(256, 512, function (x, W, H) {
var R = wRand(851);
x.fillStyle = "#6A5E48";
x.fillRect(0, 0, W, H);
poeNz(x, W, H, 9000, 0.25, 852);
poeNz(x, W, H, 3000, 0.2, 853, "190,170,130");
var c0 = W * 0.32, c1 = W * 0.68, rows = 40;
for (var r = 0; r < rows; r++) {
var y = r * H / rows, off = (r % 2) * 9;
for (var c = c0 - off; c < c1; c += 18) {
var v = 100 + R() * 50 | 0;
x.fillStyle = "rgb(" + v + "," + (v - 4) + "," + (v - 12) + ")";
x.fillRect(Math.max(c0, c) + 1, y + 1, Math.min(17, c1 - Math.max(c0, c)) - 2, H / rows - 2);
}
}
[0.18, 0.26, 0.74, 0.82].forEach(function (u) { x.fillStyle = "rgba(24,20,14,.85)"; x.fillRect(W * u - 5, 0, 10, H); x.fillStyle = "rgba(40,48,60,.8)"; for (var p = 0; p < 5; p++) {
var py = R() * H;
x.fillRect(W * u - 4, py, 8, 20 + R() * 40);
} x.fillStyle = "rgba(140,130,100,.25)"; x.fillRect(W * u - 7, 0, 2, H); x.fillRect(W * u + 5, 0, 2, H); });
for (var s = 0; s < 220; s++) {
x.fillStyle = "rgba(" + (120 + R() * 60 | 0) + "," + (110 + R() * 50 | 0) + ",90,.55)";
x.beginPath();
x.arc(R() * W * 0.3 + (R() < 0.5 ? 0 : W * 0.7), R() * H, 1 + R() * 2, 0, 7);
x.fill();
}
}, [1, 25]);
var m = new THREE.MeshLambertMaterial({ map: tex, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
var p = poePlane(g, 14, 200, m, cx, 0.06, A.z + 70, 0);
var vm = poeR4CoverMat(0);
[-1, 1].forEach(function (s) { for (var z = A.z - 20; z < A.z + 170; z += 4.5) {
var x = cx + s * (8.2 + ((z * 7) % 3) * 0.4);
if (poeSolidAt(x, z, 0.3))
continue;
var v = poePlane(g, 4 + ((z * 3) % 2), 5.5, vm, x, poeLand(x, z) + 0.07, z, ((z * 13) % 7) * 0.2);
v.renderOrder = 1;
} });
poeR4Tufts(g, cx - 9, A.z + 100, 0, 4.5, lite ? 40 : 160, 0x6E7650, 854);
poeR4Tufts(g, cx + 9, A.z + 100, 0, 4.5, lite ? 40 : 160, 0x6E7650, 855);
poeR4Cover(g, cx - 14, A.z + 96, 14, lite ? 8 : 24, [0, 1, 0], 856);
poeR4Tufts(g, cx - 12, A.z + 100, 4, 16, lite ? 30 : 120, 0x6E7650, 857);
},
function (G) {
var A = POE_AT.masque, gz = A.z + 85, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: 20, z: gz + 40, r: 160 });
var lite = POE.lite;
var tm = poeR4CoverMat(2);
for (var i = 0; i < 12; i++) {
var t = i / 11, x = 44 - t * 36 + Math.sin(t * 5) * 2, z = gz + 44 - t * 40;
var pl = poePlane(g, 4.2, 4.4, tm, x, poeLand(x, z) + 0.06, z, 0.7);
pl.renderOrder = 1;
}
poeR4Cover(g, 25, gz + 30, 40, lite ? 14 : 46, [0, 1, 0, 3], 861);
poeR4Tufts(g, 25, gz + 35, 2, 40, lite ? 60 : 220, 0x667048, 862);
var tr = [];
if (typeof poeR3Ring === "function") {
poeR3Ring(tr, -40, gz + 26, 4, 26, lite ? 5 : 12, [0.55, 0.35, 0.1], 863);
poeR3Ring(tr, -75, gz + 40, 4, 30, lite ? 4 : 10, [0.5, 0.4, 0.1], 864);
poeR3Trees(g, tr);
}
},
function (G) {
var A = POE_AT.heart, g = new THREE.Group();
G.add(g);
POE.districts.push({ g: g, x: A.x + 130, z: A.z, r: 200 });
[[-20, 13, 0x6E625A, 0], [-4, 11, 0x7A6A60, 1], [13, 14, 0x6A5A52, 0], [26, 10, 0x7A7068, 1]].forEach(function (H, i) {
var x = A.x + 134, z = A.z + H[0];
poeBuilding(g, { x: x, z: z, ry: -Math.PI / 2, w: H[1], d: 10, h: i % 2 ? 9 : 11, floors: 3, wall: "brick", col: H[2], win: "shutter", chim: 1, lit: [(i * 2) % 9, (i * 5 + 1) % 9] });
var hg = poeGrp(g, x, 0, z, -Math.PI / 2);
if (typeof poeR2Front === "function") {
hg.position.x = x + 1;
poeR2Front(hg, H[1], i % 2 ? 9 : 11, 3, H[3], i + 21);
}
});
var tr = [];
if (typeof poeR3Ring === "function") {
poeR3Ring(tr, A.x + 178, A.z, 8, 34, POE.lite ? 8 : 20, [0.6, 0.3, 0.1], 871);
poeR3Trees(g, tr);
}
}
];
});
