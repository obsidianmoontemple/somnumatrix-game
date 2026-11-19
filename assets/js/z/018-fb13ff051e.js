/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(18, function () {
"use strict";
return [
function (x, N, r) {
var rows = 6, h = N / rows;
for (var j = 0; j < rows; j++) {
x.fillStyle = grey(200 + (r() - 0.5) * 36);
x.fillRect(0, j * h, N, h);
x.strokeStyle = grey(150);
x.globalAlpha = 0.35;
for (var k = 0; k < 5; k++) {
x.beginPath();
var yy = j * h + r() * h;
x.moveTo(0, yy);
for (var s = 0; s <= 8; s++)
x.lineTo(s * N / 8, yy + Math.sin(s + r() * 3) * 2);
x.stroke();
}
x.globalAlpha = 1;
x.fillStyle = grey(110);
x.fillRect(0, j * h, N, 2);
}
},
function (x, N, r) {
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
var gr = x.createLinearGradient(i * 64, j * 64, i * 64 + 64, j * 64 + 64);
var b = 190 + r() * 40;
gr.addColorStop(0, grey(b + 25));
gr.addColorStop(1, grey(b - 20));
x.fillStyle = gr;
x.fillRect(i * 64, j * 64, 64, 64);
}
x.fillStyle = grey(95);
for (var k = 0; k <= 4; k++) {
x.fillRect(k * 64 - 2, 0, 4, N);
x.fillRect(0, k * 64 - 2, N, 4);
}
},
function (x, N, r) {
x.fillStyle = grey(236);
x.fillRect(0, 0, N, N);
x.strokeStyle = grey(170);
x.lineWidth = 1.3;
for (var i = 0; i < 9; i++) {
x.globalAlpha = 0.25 + r() * 0.3;
x.beginPath();
var px = r() * N, py = 0;
x.moveTo(px, py);
while (py < N) {
px += (r() - 0.5) * 30;
py += 10 + r() * 16;
x.lineTo(px, py);
}
x.stroke();
}
x.globalAlpha = 1;
},
function (x, N, r) {
x.fillStyle = grey(140);
x.fillRect(0, 0, N, N);
for (var j = 0; j < 9; j++)
for (var i = -1; i < 9; i++) {
var cx = i * 32 + ((j % 2) ? 16 : 0) + 16, cy = j * 30;
var gr = x.createRadialGradient(cx, cy, 2, cx, cy, 20);
gr.addColorStop(0, grey(232));
gr.addColorStop(1, grey(176));
x.fillStyle = gr;
x.beginPath();
x.arc(cx, cy + 8, 16, 0, Math.PI);
x.fill();
x.fillRect(cx - 16, cy - 8, 32, 16);
}
},
function (x, N, r) {
x.fillStyle = grey(196);
x.fillRect(0, 0, N, N);
for (var i = 0; i < 3600; i++) {
x.fillStyle = grey(150 + r() * 105);
x.globalAlpha = 0.45;
x.beginPath();
x.arc(r() * N, r() * N, 0.8 + r() * 1.8, 0, 7);
x.fill();
}
for (var k = 0; k < 24; k++) {
x.fillStyle = grey(170 + r() * 60);
x.globalAlpha = 0.12;
x.beginPath();
x.arc(r() * N, r() * N, 20 + r() * 50, 0, 7);
x.fill();
}
x.globalAlpha = 1;
},
function (kind) {
if (TEXCACHE[kind])
return TEXCACHE[kind];
if (!PAINT[kind] || typeof document === "undefined")
return null;
var c = document.createElement("canvas");
c.width = c.height = 256;
var x = c.getContext("2d");
if (!x)
return null;
try {
PAINT[kind](x, 256, rng(hash(kind)));
}
catch (e) {
return null;
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
var tile = TILE[kind] || 2;
if (t.repeat && t.repeat.set)
t.repeat.set(1 / tile, 1 / tile);
t.anisotropy = (renderer && renderer.capabilities && renderer.capabilities.getMaxAnisotropy) ? Math.min(8, renderer.capabilities.getMaxAnisotropy()) : 4;
TEXCACHE[kind] = t;
return t;
}
];
});
