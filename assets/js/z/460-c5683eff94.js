/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(460, function () {
return [
function (x, W, H, c1, c2, mortar, course, seed) {
x.fillStyle = mortar;
x.fillRect(0, 0, W, H);
var R = wRand(seed || 5), bh = course, bw = course * 2.9;
for (var r = 0, y = 0; y < H; r++, y += bh) {
var off = (r % 2) ? bw / 2 : 0;
for (var bx = -off; bx < W; bx += bw) {
var k = R();
x.fillStyle = k < 0.5 ? c1 : c2;
if (k > 0.9)
x.fillStyle = "#6A3A2A";
x.fillRect(bx + 1, y + 1, bw - 2, bh - 2);
x.fillStyle = "rgba(0,0,0," + (R() * 0.12) + ")";
x.fillRect(bx + 1, y + 1, bw - 2, bh - 2);
}
}
},
function (x, x0, y0, w, h, cols, rows, frame) {
x.fillStyle = frame || "#F4F2EC";
x.fillRect(x0 - 4, y0 - 4, w + 8, h + 8);
var g = x.createLinearGradient(0, y0, 0, y0 + h);
g.addColorStop(0, "#7E92A2");
g.addColorStop(0.5, "#34404C");
g.addColorStop(1, "#1E262E");
x.fillStyle = g;
x.fillRect(x0, y0, w, h);
x.fillStyle = "rgba(255,255,255,.08)";
x.fillRect(x0, y0, w * 0.4, h);
x.fillStyle = frame || "#F4F2EC";
var mid = y0 + h / 2;
x.fillRect(x0, mid - 3, w, 6);
for (var s = 0; s < 2; s++) {
var sy = s ? mid : y0, sh = h / 2;
for (var c = 1; c < cols; c++)
x.fillRect(x0 + c * w / cols - 1.2, sy, 2.4, sh);
for (var r = 1; r < rows; r++)
x.fillRect(x0, sy + r * sh / rows - 1.2, w, 2.4);
}
},
function () {
return dlnTex("georgian", 256, 256, function (x, W, H) {
dlnBricks(x, W, H, "#B89A6A", "#A88A5C", "#D8CCB4", 9, 21);
dlnNoise(x, W, H, 500, 0.18, 4);
var ww = W * 0.36, wx = (W - ww) / 2, wy = H * 0.18, wh = H * 0.62;
x.fillStyle = "#B24A32";
x.fillRect(wx - 8, wy - 16, ww + 16, 16);
for (var i = 0; i < 10; i++) {
x.fillStyle = "rgba(240,220,200,.35)";
x.fillRect(wx - 8 + i * (ww + 16) / 10, wy - 16, 1.4, 16);
}
dlnSash(x, wx, wy, ww, wh, 3, 2);
x.fillStyle = "#E4DED0";
x.fillRect(wx - 10, wy + wh + 2, ww + 20, 8);
x.fillStyle = "rgba(0,0,0,.25)";
x.fillRect(wx - 10, wy + wh + 10, ww + 20, 3);
}, 3.6, 3.3);
},
function () {
return dlnTex("barry", 256, 256, function (x, W, H) {
dlnBricks(x, W, H, "#A8422E", "#983A28", "#D4C8B4", 7, 33);
dlnNoise(x, W, H, 400, 0.15, 6);
x.fillStyle = "#E6E0D2";
x.fillRect(0, H - 20, W, 20);
x.fillStyle = "rgba(0,0,0,.18)";
x.fillRect(0, H - 20, W, 3);
for (var q = 0; q < H - 20; q += 26) {
x.fillStyle = "#E2DCCE";
x.fillRect(0, q, (q / 26) % 2 ? 16 : 26, 22);
x.fillRect(W - ((q / 26) % 2 ? 16 : 26), q, (q / 26) % 2 ? 16 : 26, 22);
}
var ww = W * 0.34, wx = (W - ww) / 2, wy = H * 0.2, wh = H * 0.58;
x.fillStyle = "#E8E2D4";
x.fillRect(wx - 16, wy - 14, ww + 32, wh + 28);
x.fillStyle = "#D4CCBC";
x.fillRect(wx - 9, wy - 8, ww + 18, wh + 16);
x.fillStyle = "#EEE8DA";
x.fillRect(wx - 24, wy - 30, ww + 48, 16);
x.fillStyle = "rgba(0,0,0,.22)";
x.fillRect(wx - 24, wy - 14, ww + 48, 4);
x.fillStyle = "#E8E2D4";
x.beginPath();
x.moveTo(wx - 20, wy - 30);
x.lineTo(wx + ww / 2, wy - 48);
x.lineTo(wx + ww + 20, wy - 30);
x.fill();
dlnSash(x, wx, wy, ww, wh, 2, 3, "#F2EEE6");
}, 4.4, 4.2);
},
function () {
return dlnTex("rustic", 256, 256, function (x, W, H) {
x.fillStyle = "#E4DED0";
x.fillRect(0, 0, W, H);
dlnNoise(x, W, H, 700, 0.14, 8, "90,80,60");
for (var y = 0; y < H; y += 32) {
x.fillStyle = "rgba(80,70,50,.4)";
x.fillRect(0, y, W, 3);
}
var ww = W * 0.34, wx = (W - ww) / 2, wy = H * 0.26, wh = H * 0.56;
x.fillStyle = "#D0C8B6";
x.beginPath();
x.arc(wx + ww / 2, wy, ww / 2 + 12, Math.PI, 0);
x.lineTo(wx + ww + 12, wy + wh + 6);
x.lineTo(wx - 12, wy + wh + 6);
x.fill();
x.save();
x.beginPath();
x.arc(wx + ww / 2, wy, ww / 2, Math.PI, 0);
x.lineTo(wx + ww, wy + wh);
x.lineTo(wx, wy + wh);
x.closePath();
x.clip();
dlnSash(x, wx, wy - ww / 2, ww, wh + ww / 2, 2, 3, "#F2EEE6");
x.restore();
x.fillStyle = "#C8BEAA";
for (var v = 0; v < 7; v++) {
var a = Math.PI + v * Math.PI / 6;
x.save();
x.translate(wx + ww / 2 + Math.cos(a) * (ww / 2 + 6), wy + Math.sin(a) * (ww / 2 + 6));
x.rotate(a + Math.PI / 2);
x.fillRect(-5, -7, 10, 14);
x.restore();
}
}, 4.4, 4.4);
},
function () {
return dlnTex("slate", 128, 128, function (x, W, H) {
x.fillStyle = "#4E545C";
x.fillRect(0, 0, W, H);
var R = wRand(12);
for (var y = 0; y < H; y += 16)
for (var s = ((y / 16) % 2) * 12; s < W; s += 24) {
x.fillStyle = "rgb(" + (70 + R() * 20 | 0) + "," + (76 + R() * 20 | 0) + "," + (86 + R() * 20 | 0) + ")";
x.fillRect(s + 1, y + 1, 22, 14);
x.fillStyle = "rgba(0,0,0,.35)";
x.fillRect(s, y + 14, 24, 2);
}
}, 1.6, 1.6);
},
function () {
return dlnTex("flags", 256, 256, function (x, W, H) {
x.fillStyle = "#9A9488";
x.fillRect(0, 0, W, H);
var R = wRand(14);
for (var y = 0; y < H; y += 64)
for (var s = ((y / 64) % 2) * 40; s < W + 80; s += 96) {
var gv = 140 + R() * 26 | 0;
x.fillStyle = "rgb(" + gv + "," + (gv - 4) + "," + (gv - 12) + ")";
x.fillRect(s + 2, y + 2, 92, 60);
}
dlnNoise(x, W, H, 900, 0.15, 15);
}, 3, 3);
},
function () {
return dlnTex("setts", 256, 256, function (x, W, H) {
x.fillStyle = "#3E3C3A";
x.fillRect(0, 0, W, H);
var R = wRand(16);
for (var y = 0; y < H; y += 16)
for (var s = ((y / 16) % 2) * 12; s < W; s += 24) {
var g = 88 + R() * 40 | 0;
x.fillStyle = "rgb(" + g + "," + (g - 4) + "," + (g - 8) + ")";
x.fillRect(s + 1.5, y + 1.5, 21, 13);
x.fillStyle = "rgba(255,255,255,.07)";
x.fillRect(s + 2, y + 2, 20, 3);
}
}, 2.4, 2.4);
},
function () {
return dlnTex("marble", 256, 256, function (x, W, H) {
for (var a = 0; a < 4; a++)
for (var b = 0; b < 4; b++) {
x.fillStyle = (a + b) % 2 ? "#1E1E22" : "#ECEAE4";
x.fillRect(a * 64, b * 64, 64, 64);
}
var R = wRand(17);
for (var i = 0; i < 60; i++) {
x.strokeStyle = "rgba(150,150,160," + (R() * 0.3) + ")";
x.lineWidth = 1;
x.beginPath();
var px = R() * W, py = R() * H;
x.moveTo(px, py);
x.bezierCurveTo(px + R() * 40, py + R() * 20, px + R() * 60, py - R() * 20, px + R() * 80, py + R() * 30);
x.stroke();
}
}, 1.2, 1.2);
},
function () {
return dlnTex("encaustic", 256, 256, function (x, W, H) {
var cols = ["#9A3A2A", "#D8C49A", "#1E1E22", "#2A4A7A"];
for (var a = 0; a < 4; a++)
for (var b = 0; b < 4; b++) {
var X = a * 64, Y = b * 64;
x.fillStyle = cols[(a + b) % 2 ? 0 : 1];
x.fillRect(X, Y, 64, 64);
x.fillStyle = cols[2];
x.beginPath();
x.moveTo(X + 32, Y + 6);
x.lineTo(X + 58, Y + 32);
x.lineTo(X + 32, Y + 58);
x.lineTo(X + 6, Y + 32);
x.fill();
x.fillStyle = cols[(a + b) % 2 ? 1 : 3];
x.beginPath();
x.arc(X + 32, Y + 32, 12, 0, 7);
x.fill();
x.fillStyle = cols[(a + b) % 2 ? 3 : 0];
for (var p = 0; p < 4; p++) {
var an = p * Math.PI / 2;
x.beginPath();
x.arc(X + 32 + Math.cos(an) * 20, Y + 32 + Math.sin(an) * 20, 4, 0, 7);
x.fill();
}
x.strokeStyle = "rgba(0,0,0,.4)";
x.lineWidth = 1.5;
x.strokeRect(X, Y, 64, 64);
}
}, 0.9, 0.9);
},
function () {
return dlnTex("wardwall", 256, 256, function (x, W, H) {
x.fillStyle = "#F0E8D4";
x.fillRect(0, 0, W, H);
dlnNoise(x, W, H, 200, 0.06, 18);
var d = H * 0.62;
for (var y = d; y < H; y += 16)
for (var s = 0; s < W; s += 16) {
x.fillStyle = (y - d) < 16 ? "#4E7A5E" : "#C8DCC4";
x.fillRect(s + 0.8, y + 0.8, 14.4, 14.4);
x.fillStyle = "rgba(255,255,255,.25)";
x.fillRect(s + 2, y + 2, 6, 3);
}
x.fillStyle = "#3E6A4E";
x.fillRect(0, d - 6, W, 6);
}, 2, 3);
},
function () {
return dlnTex("boards", 256, 256, function (x, W, H) {
var R = wRand(19);
for (var s = 0; s < W; s += 21) {
var g = R();
x.fillStyle = "rgb(" + (130 + g * 40 | 0) + "," + (88 + g * 30 | 0) + "," + (52 + g * 20 | 0) + ")";
x.fillRect(s, 0, 21, H);
x.fillStyle = "rgba(40,24,10,.5)";
x.fillRect(s, 0, 1.2, H);
var j = R() * H;
x.fillRect(s, j, 21, 1.2);
for (var k = 0; k < 6; k++) {
x.fillStyle = "rgba(60,36,16,.18)";
x.fillRect(s + R() * 20, 0, 1, H);
}
}
x.fillStyle = "rgba(255,240,210,.08)";
x.fillRect(0, 0, W, H);
}, 2.4, 2.4);
},
function () {
return dlnTex("oak", 256, 256, function (x, W, H) {
x.fillStyle = "#5A3A22";
x.fillRect(0, 0, W, H);
var R = wRand(20);
for (var i = 0; i < 80; i++) {
x.fillStyle = "rgba(30,18,8," + (R() * 0.25) + ")";
x.fillRect(R() * W, 0, 1 + R() * 2, H);
}
[[16, 16, W / 2 - 24, H / 2 - 24], [W / 2 + 8, 16, W / 2 - 24, H / 2 - 24], [16, H / 2 + 8, W / 2 - 24, H / 2 - 24], [W / 2 + 8, H / 2 + 8, W / 2 - 24, H / 2 - 24]].forEach(function (p) {
x.fillStyle = "rgba(0,0,0,.35)";
x.fillRect(p[0], p[1], p[2], p[3]);
x.fillStyle = "#6A4628";
x.fillRect(p[0] + 5, p[1] + 5, p[2] - 10, p[3] - 10);
x.fillStyle = "rgba(255,220,170,.10)";
x.fillRect(p[0] + 5, p[1] + 5, p[2] - 10, 4);
});
}, 1.2, 1.2);
},
function () {
return dlnTex("stars", 256, 256, function (x, W, H) {
x.fillStyle = "#1E2A5A";
x.fillRect(0, 0, W, H);
var R = wRand(22);
for (var i = 0; i < 26; i++) {
var px = R() * W, py = R() * H, r = 4 + R() * 5;
x.fillStyle = "#E8C860";
x.beginPath();
for (var p = 0; p < 10; p++) {
var a = p * Math.PI / 5 - Math.PI / 2, rr = p % 2 ? r * 0.42 : r;
x.lineTo(px + Math.cos(a) * rr, py + Math.sin(a) * rr);
}
x.fill();
}
}, 2, 2);
},
function () {
return dlnTex("planebark", 128, 256, function (x, W, H) {
x.fillStyle = "#8A8A6A";
x.fillRect(0, 0, W, H);
var R = wRand(28), c = ["#B8B490", "#6E6E52", "#D8D4B8", "#7A7A5A", "#A8A07A"];
for (var i = 0; i < 140; i++) {
x.fillStyle = c[(R() * c.length) | 0];
x.beginPath();
x.ellipse(R() * W, R() * H, 4 + R() * 14, 6 + R() * 20, R() * 3, 0, 7);
x.fill();
}
}, 1.2, 2.4);
},
function () {
return dlnTex("leaves", 256, 256, function (x, W, H) {
x.fillStyle = "#2E5222";
x.fillRect(0, 0, W, H);
var R = wRand(29), c = ["#3E6A2A", "#4E7A32", "#5E8A3A", "#2A4A1E", "#6E9A44", "#3A5E26"];
for (var i = 0; i < 1400; i++) {
var px = R() * W, py = R() * H, r = 3 + R() * 5;
x.fillStyle = c[(R() * c.length) | 0];
x.beginPath();
x.moveTo(px, py - r);
x.lineTo(px + r * 0.8, py);
x.lineTo(px, py + r);
x.lineTo(px - r * 0.8, py);
x.fill();
}
for (var j = 0; j < 300; j++) {
x.fillStyle = "rgba(230,240,180," + (R() * 0.2) + ")";
x.fillRect(R() * W, R() * H, 2, 2);
}
}, 2.2, 2.2);
},
function () {
return dlnTex("lawn", 256, 256, function (x, W, H) {
for (var s = 0; s < W; s += 64) {
x.fillStyle = (s / 64) % 2 ? "#5E8640" : "#6A9248";
x.fillRect(s, 0, 64, H);
}
var R = wRand(31);
for (var i = 0; i < 4000; i++) {
x.fillStyle = "rgba(" + (R() < 0.5 ? "40,70,20" : "140,170,90") + "," + (0.15 + R() * 0.25) + ")";
x.fillRect(R() * W, R() * H, 1, 2 + R() * 3);
}
}, 8, 8);
},
function () {
return dlnTex("sashin", 128, 256, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#8EB0D4");
g.addColorStop(0.65, "#C4D4DC");
g.addColorStop(0.8, "#8AA27A");
g.addColorStop(1, "#6A8A5A");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "#E8E6E0";
x.fillRect(0, 0, W, 8);
x.fillRect(0, H - 8, W, 8);
x.fillRect(0, 0, 8, H);
x.fillRect(W - 8, 0, 8, H);
x.fillRect(0, H / 2 - 5, W, 10);
for (var s = 0; s < 2; s++) {
x.fillRect(W / 2 - 2, s * H / 2, 4, H / 2);
for (var r = 1; r < 3; r++)
x.fillRect(0, s * H / 2 + r * H / 6 - 2, W, 4);
}
}, 1, 1);
},
function () {
return dlnTex("shop", 256, 256, function (x, W, H) {
x.fillStyle = "#2A3A2E";
x.fillRect(0, 0, W, H);
x.fillStyle = "#1E2A22";
x.fillRect(0, 0, W, 40);
x.fillStyle = "#D8B860";
x.fillRect(4, 36, W - 8, 3);
var g = x.createLinearGradient(0, 50, 0, H - 30);
g.addColorStop(0, "#8AA0AE");
g.addColorStop(1, "#2A3640");
x.fillStyle = g;
x.fillRect(14, 52, W * 0.6, H - 90);
var R = wRand(23), cols = ["#C83A3A", "#E8C850", "#3A6AA8", "#F0ECE4", "#6A8A3A", "#A86A3A"];
for (var i = 0; i < 16; i++) {
x.fillStyle = cols[(R() * cols.length) | 0];
x.fillRect(22 + R() * (W * 0.6 - 30), H - 80 + R() * 30, 8 + R() * 16, 8 + R() * 14);
}
x.fillStyle = "#1A1410";
x.fillRect(W * 0.68, 52, W * 0.26, H - 52);
x.fillStyle = "#3A2A1E";
x.fillRect(W * 0.7, 58, W * 0.22, H - 64);
x.fillStyle = "#5A4A3E";
x.fillRect(0, H - 34, W, 34);
}, 4, 4);
},
function (P, w, d, h, mat, x, y, z) {
var g = new THREE.Group();
g.position.set(x, y, z);
P.add(g);
var lower = h * 0.7, inset = Math.min(d, w) * 0.16, top = h - lower;
[-1, 1].forEach(function (k) { var s = dlnBox(g, w, 0.22, Math.hypot(inset, lower), mat, 0, lower / 2, k * (d / 2 - inset / 2)); s.rotation.x = k * (Math.PI / 2 - Math.atan2(lower, inset)); });
[-1, 1].forEach(function (k) { var s = dlnBox(g, Math.hypot(inset, lower), 0.22, d, mat, k * (w / 2 - inset / 2), lower / 2, 0); s.rotation.z = -k * (Math.PI / 2 - Math.atan2(lower, inset)); });
var w2 = w - inset * 2, d2 = d - inset * 2, half = d2 / 2, sl = Math.hypot(half, top), a = Math.atan2(top, half);
[-1, 1].forEach(function (k) { var s = dlnBox(g, w2, 0.2, sl, mat, 0, lower + top / 2, k * half / 2); s.rotation.x = k * a; });
return g;
},
function (P, x, z) {
var iron = dlnShine(0x1E2A22, 0.6, 0.5);
dlnCyl(P, 0.16, 0.22, 0.5, iron, x, 0.25, z, 10);
dlnCyl(P, 0.07, 0.1, 3.4, iron, x, 2.1, z, 10);
dlnBox(P, 0.7, 0.05, 0.05, iron, x, 3.2, z);
dlnCyl(P, 0.24, 0.14, 0.55, dlnGlow(0xFFE6B0), x, 4.05, z, 6);
var cap = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.3, 6), iron);
cap.position.set(x, 4.45, z);
P.add(cap);
},
function (P, x0, z0, x1, z1, h) {
h = h || 1.1;
var iron = dlnShine(0x1A1E1A, 0.55, 0.6), L = Math.hypot(x1 - x0, z1 - z0), n = Math.max(2, Math.round(L / (DLN.lite ? 0.5 : 0.16))), ry = Math.atan2(x1 - x0, z1 - z0);
var bar = dlnBox(P, 0.05, 0.05, L, iron, (x0 + x1) / 2, h - 0.1, (z0 + z1) / 2, ry);
dlnBox(P, 0.05, 0.05, L, iron, (x0 + x1) / 2, 0.15, (z0 + z1) / 2, ry);
var geo = new THREE.CylinderGeometry(0.012, 0.012, h, 4), tip = new THREE.ConeGeometry(0.028, 0.09, 4), g = [];
for (var i = 0; i <= n; i++) {
var u = i / n, px = x0 + (x1 - x0) * u, pz = z0 + (z1 - z0) * u;
var m = new THREE.Mesh(geo, iron);
m.position.set(px, h / 2, pz);
P.add(m);
var t = new THREE.Mesh(tip, iron);
t.position.set(px, h + 0.04, pz);
P.add(t);
}
},
function (lines, title, w, h, bg, fg) {
var t = wTex(512, Math.round(512 * h / w), function (x, W, H) {
x.fillStyle = bg || "#F2EAD6";
x.fillRect(0, 0, W, H);
x.strokeStyle = fg || "#3A2A1A";
x.lineWidth = 4;
x.strokeRect(10, 10, W - 20, H - 20);
x.lineWidth = 1.5;
x.strokeRect(18, 18, W - 36, H - 36);
x.fillStyle = fg || "#3A2A1A";
x.textAlign = "center";
x.textBaseline = "top";
x.font = "bold " + Math.round(H * 0.1) + "px Georgia";
x.fillText(title, W / 2, H * 0.08);
x.font = Math.round(H * 0.062) + "px Georgia";
lines.forEach(function (l, i) { x.fillText(l, W / 2, H * 0.28 + i * H * 0.11); });
});
return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: t }));
},
function (k, w, h) {
var key = "glass" + k;
var t = DLN.tex[key] || (DLN.tex[key] = wTex(128, 256, function (x, W, H) {
var R = wRand(30 + k), cols = ["#2A4AA8", "#B82A2A", "#E8C040", "#2A8A4A", "#7A3AA8", "#E8E0C8"];
x.fillStyle = "#1A1A1E";
x.fillRect(0, 0, W, H);
for (var y = 8; y < H - 8; y += 14)
for (var s = 8; s < W - 8; s += 14) {
x.fillStyle = cols[(R() * 4) | 0];
x.globalAlpha = 0.55;
x.fillRect(s + 1, y + 1, 12, 12);
}
x.globalAlpha = 1;
var cx = W / 2;
x.fillStyle = cols[k % 3 === 0 ? 4 : k % 3 === 1 ? 0 : 3];
x.beginPath();
x.moveTo(cx - 22, H * 0.86);
x.lineTo(cx - 14, H * 0.38);
x.lineTo(cx + 14, H * 0.38);
x.lineTo(cx + 22, H * 0.86);
x.fill();
x.fillStyle = "#F0D8B8";
x.beginPath();
x.arc(cx, H * 0.32, 10, 0, 7);
x.fill();
x.strokeStyle = "#E8C040";
x.lineWidth = 4;
x.beginPath();
x.arc(cx, H * 0.32, 15, 0, 7);
x.stroke();
if (k % 3 === 1) {
x.fillStyle = "#E8E0C8";
[-1, 1].forEach(function (sg) { x.beginPath(); x.moveTo(cx + sg * 10, H * 0.42); x.quadraticCurveTo(cx + sg * 46, H * 0.3, cx + sg * 36, H * 0.64); x.fill(); });
}
if (k % 3 === 0) {
x.fillStyle = "#F0D8B8";
x.beginPath();
x.arc(cx + 12, H * 0.24, 6, 0, 7);
x.fill();
x.fillStyle = "#E8C040";
x.fillRect(cx - 30, H * 0.4, 4, H * 0.5);
}
if (k % 3 === 2) {
x.fillStyle = "#F0D8B8";
[-16, 16].forEach(function (o) { x.beginPath(); x.arc(cx + o, H * 0.7, 6, 0, 7); x.fill(); });
}
x.strokeStyle = "#141418";
x.lineWidth = 2.4;
for (var l = 0; l < 16; l++) {
x.beginPath();
x.moveTo(R() * W, R() * H);
x.lineTo(R() * W, R() * H);
x.stroke();
}
x.lineWidth = 8;
x.strokeRect(0, 0, W, H);
x.beginPath();
x.arc(cx, 24, W / 2 - 4, Math.PI, 0);
x.stroke();
}));
var m = new THREE.MeshBasicMaterial({ map: t, fog: true });
return new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
},
function (o) {
var c = wfPick([0x2A2A30, 0x3A3A44, 0x4A4034, 0x2E3442], o.r);
return { ids: ["oz:shirt:long", "oz:collar:high:cravat", "oz:vest:cloth" + (o.r < 0.5 ? ":chain" : ""), "oz:coat:" + (o.r < 0.35 ? "frock" : "jacket") + ":cloth", "oz:trousers:" + (o.r < 0.3 ? "pinstripe" : "cloth"), "oz:boots"],
col: { shirt: 0xF8F6F0, collar: 0xFAFAF6, tie: wfPick([0x6A1A2A, 0x1A2A4A, 0x2A2A2A], o.r * 3 % 1), vest: c, coat: c, trou: o.r < 0.3 ? 0x2A2A30 : c }, shoes: 0x141010 };
},
function (o) {
var c = wfPick([0x5A6A8A, 0x7A5A6A, 0xE8E0D0, 0x6A7A5A, 0x3A3A4A, 0xC8B8D0], o.r);
return { ids: ["oz:bodice:long:cloth:buttons", "oz:skirt:ankle:0.18:cloth", "oz:collar:high:none"].concat(o.r < 0.3 ? ["oz:pelerine"] : []),
col: { dress: o.r > 0.6 ? 0xF6F2EA : c, skirt: c, trim: 0xF8F6F0, collar: 0xFAF8F4, cape: wfDark(c, 0.25) }, shoes: 0x2A1E16 };
},
function (o) {
var c = wfPick([0x5A4A3A, 0x4A4A4E, 0x3A4A5A], o.r);
return { ids: ["oz:shirt:long", "oz:collar:low:soft", "oz:vest:cloth", "oz:trousers:cloth", "oz:boots"].concat(o.r < 0.5 ? ["oz:coat:jacket:cloth"] : []),
col: { shirt: 0xE4DCCC, collar: 0xE4DCCC, tie: 0x6A2A2A, vest: c, coat: c, trou: wfDark(c, 0.2) }, shoes: 0x2A1E16 };
},
function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0x16161A, { r: 0.55 });
g.add(new THREE.Mesh(wfGeo("dlbowb", function () { var b = new THREE.CylinderGeometry(0.17, 0.17, 0.012, 22); return b; }), mt));
var cr = new THREE.Mesh(wfGeo("dlbowc", function () { return new THREE.SphereGeometry(0.115, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.5); }), mt);
cr.scale.set(1, 1.05, 1.06);
g.add(cr);
var bd = new THREE.Mesh(wfGeo("dlbowd", function () { return new THREE.CylinderGeometry(0.117, 0.117, 0.025, 16); }), wfMat(0x0A0A0C));
bd.position.y = 0.013;
g.add(bd);
add("Head", [0, 0.14, -0.01], g);
},
function (add, c) {
var g = new THREE.Group(), straw = wfMat(0xE8D49A, { r: 0.95 });
g.add(new THREE.Mesh(wfGeo("dlboab", function () { return new THREE.CylinderGeometry(0.2, 0.2, 0.012, 24); }), straw));
var cr = new THREE.Mesh(wfGeo("dlboac", function () { return new THREE.CylinderGeometry(0.115, 0.115, 0.08, 18); }), straw);
cr.position.y = 0.04;
g.add(cr);
var bd = new THREE.Mesh(wfGeo("dlboad", function () { return new THREE.CylinderGeometry(0.117, 0.117, 0.03, 18); }), wfMat(c || 0x1A2A5A));
bd.position.y = 0.025;
g.add(bd);
add("Head", [0, 0.14, -0.01], g);
},
function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0x2A2A34, { r: 0.9 });
var b = new THREE.Mesh(wfGeo("dllhb", function () { return new THREE.CylinderGeometry(0.3, 0.3, 0.014, 26); }), mt);
g.add(b);
var cr = new THREE.Mesh(wfGeo("dllhc", function () { return new THREE.CylinderGeometry(0.13, 0.14, 0.1, 18); }), mt);
cr.position.y = 0.05;
g.add(cr);
var fl = [0xE8A0B0, 0xF4F0E8, 0xC84A5A, 0xE8D080];
for (var i = 0; i < 5; i++) {
var f = new THREE.Mesh(wfGeo("dllhf", function () { return new THREE.SphereGeometry(0.035, 8, 6); }), wfMat(fl[i % 4]));
var a = i / 5 * Math.PI * 1.2 - 0.6;
f.position.set(Math.sin(a) * 0.15, 0.08, Math.cos(a) * 0.15);
g.add(f);
}
var pl = new THREE.Mesh(wfGeo("dllhp", function () { var s = new THREE.SphereGeometry(0.05, 8, 6); s.scale(0.6, 0.4, 2.6); return s; }), wfMat(0xF4F2EE));
pl.position.set(-0.1, 0.12, -0.06);
pl.rotation.x = 0.4;
g.add(pl);
g.rotation.x = -0.12;
add("Head", [0, 0.16, -0.01], g);
},
function (add) {
var m = new THREE.Mesh(wfGeo("dlncap", function () { return new THREE.SphereGeometry(0.135, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.42); }), wfMat(0xFCFCF8, { r: 1 }));
m.scale.set(1, 0.6, 1.1);
m.rotation.x = -0.35;
add("Head", [0, 0.12, -0.04], m);
var t = new THREE.Mesh(wfGeo("dlncapt", function () { return new THREE.BoxGeometry(0.16, 0.12, 0.01); }), wfMat(0xFCFCF8, { r: 1 }));
t.rotation.x = 0.3;
add("Head", [0, 0.04, -0.15], t);
},
function (add) {
var g = new THREE.Group(), w = wfMat(0xFCFCF8, { r: 1 });
var m = new THREE.Mesh(wfGeo("dlscap", function () { return new THREE.SphereGeometry(0.14, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.45); }), w);
m.scale.set(1, 0.7, 1.1);
g.add(m);
var fr = new THREE.Mesh(wfGeo("dlsfr", function () { return new THREE.TorusGeometry(0.14, 0.02, 6, 22); }), w);
fr.rotation.x = Math.PI / 2 + 0.3;
fr.position.set(0, 0.0, 0.02);
g.add(fr);
g.rotation.x = -0.3;
add("Head", [0, 0.11, -0.03], g);
},
function (add) {
var g = new THREE.Group(), mt = wfMat(0x141A2C, { r: 0.6 });
var d = new THREE.Mesh(wfGeo("dlpolh", function () { var p = []; for (var i = 0; i <= 12; i++) {
var t = i / 12;
p.push(new THREE.Vector2(0.14 * Math.sin(Math.PI * 0.5 * (1 - t)) + 0.02 * (1 - t) + (t > 0.9 ? 0 : 0.0), t * 0.26));
} return new THREE.LatheGeometry(p, 16); }), mt);
g.add(d);
var b = new THREE.Mesh(wfGeo("dlpolb", function () { return new THREE.CylinderGeometry(0.17, 0.17, 0.012, 20); }), mt);
g.add(b);
var s = new THREE.Mesh(wfGeo("dlpols", function () { return new THREE.CircleGeometry(0.035, 8); }), wfMat(0xD8D8E0, { r: 0.3, m: 0.8 }));
s.position.set(0, 0.11, 0.12);
s.rotation.x = -0.4;
g.add(s);
add("Head", [0, 0.1, -0.01], g);
},
function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0x4A4438, { r: 1 });
var t = new THREE.Mesh(wfGeo("dlfct", function () { return new THREE.SphereGeometry(0.14, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.4); }), mt);
t.scale.set(1.05, 0.55, 1.12);
g.add(t);
var p = new THREE.Mesh(wfGeo("dlfcp", function () { return new THREE.CylinderGeometry(0.1, 0.1, 0.012, 12, 1, false, -Math.PI / 2, Math.PI); }), mt);
p.position.set(0, -0.01, 0.1);
p.rotation.x = 0.12;
g.add(p);
add("Head", [0, 0.11, -0.005], g);
},
function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(wfGeo("dlpars", function () { return new THREE.CylinderGeometry(0.008, 0.008, 0.9, 5); }), wfMat(0x2A1A10)));
var c = new THREE.Mesh(wfGeo("dlparc", function () { return new THREE.ConeGeometry(0.42, 0.18, 12, 1, true); }), wfMat(0xF4EEF2, { r: 0.9 }));
c.material.side = THREE.DoubleSide;
c.position.y = 0.44;
g.add(c);
add("hand_r", [0, 0.25, 0.05], g);
},
function (add) {
var g = new THREE.Group();
var bk = new THREE.Mesh(wfGeo("dlfbk", function () { return new THREE.CylinderGeometry(0.2, 0.14, 0.14, 12, 1, true); }), wfMat(0x9A7A4A, { r: 1 }));
bk.material.side = THREE.DoubleSide;
g.add(bk);
var cols = [0xE84A6A, 0xF4F0F0, 0xB88AE0, 0xF0C040];
for (var i = 0; i < 9; i++) {
var f = new THREE.Mesh(wfGeo("dlfl", function () { return new THREE.SphereGeometry(0.04, 6, 5); }), wfMat(cols[i % 4]));
f.position.set(Math.cos(i) * 0.12, 0.08, Math.sin(i) * 0.12);
g.add(f);
}
add("hand_l", [0, -0.16, 0.04], g);
},
function () {
if (typeof WDR_COST === "undefined" || typeof OZ_WEAR === "undefined" || typeof wfMat !== "function" || typeof wfHashF !== "function")
return false;
if (WDR_COST.oz_dln)
return true;
OZ_WEAR.oz_dln = function (L, o) { var who = L._dl || "gent", r = wfHashF((L._dlSeed || "") + who), f = DLN_WEAR[who] || DLN_WEAR.gent; var x = f({ f: o.f, kid: o.kid, r: r }); return { ids: x.ids, col: x.col, shoes: x.shoes != null ? x.shoes : 0x2A1E16 }; };
WDR_COST.oz_dln = { rb: 1, ownHead: true, look: { hat: "none", role: "" }, props: function (add, c, E) {
var L = (E.spec && E.spec.look) || {}, who = L._dl || "gent", seed = L._dlSeed || "", hat = wfPick(DLN_HATS[who] || [null], wfHashF(seed + "hat")), held = wfPick(DLN_HELD[who] || [null], wfHashF(seed + "held"));
var hc = who === "lady" || who === "flowerseller" || who === "girl" ? wfPick([0x2A2A34, 0xF4EEE6, 0x5A3A4A, 0x1E2A4A, 0xE8D49A], wfHashF(seed + "hc")) : null;
if (hat && DLN_HAT[hat])
try {
DLN_HAT[hat](add, hc, E);
}
catch (e) { }
if (L._dlIn && held === "parasol")
held = null;
if (held && DLN_HELDF[held])
try {
DLN_HELDF[held](add);
}
catch (e) { }
} };
return true;
},
function (seed, who, o) {
o = o || {};
var kid = !!o.child || /^(boy|girl|newsboy|patient)$/.test(who) && o.child !== false;
var f = o.sex ? o.sex === "f" : /^(lady|nurse|sister|maid|flowerseller|girl|hilda|suffragist|landlady)$/.test(who) ? true : who === "patient" ? wfHashF(seed) < 0.5 : false;
var look = { _dl: who, _dlSeed: seed, sex: f ? "f" : "m", hat: "none" };
if (o.inside)
look._dlIn = 1;
if (o.beard && !f)
look.beard = o.beard;
if (o.hair != null)
look.hair = o.hair;
if (f) {
look.topKind = "dress";
look.bottomKind = "skirt";
}
var ok = dlnWearReady(), p = wPerson("dln_" + seed, ok ? { look: look, sex: look.sex, ozCos: "oz_dln", child: kid } : { look: { sex: look.sex }, sex: look.sex, child: kid });
p.userData.shkFlat = 1;
p.userData.dlnWho = who;
return p;
},
function (P, x0, x1, zf, dir, st, o) {
o = o || {};
var w = x1 - x0, cx = (x0 + x1) / 2, d = o.d || 14, h = st * 3.3 + (o.basement ? 0 : 0), zc = zf - dir * d / 2, X = dlnX;
var brick = dlnS("georgian", o.tint || 0xFFFFFF), plain = dlnS("stock", 0xFFFFFF);
dlnFace(P, w, h, brick, X(cx), h / 2, zf - dir * 0.15);
dlnBox(P, w, h, 0.3, plain, X(cx), h / 2, zf - dir * (d - 0.15));
[-1, 1].forEach(function (k) { dlnBox(P, 0.3, h, d, plain, X(k < 0 ? x0 + 0.15 : x1 - 0.15), h / 2, zc); });
dlnBox(P, w, 1.0, 0.3, brick, X(cx), h + 0.5, zf - dir * 0.15);
dlnBox(P, w + 0.1, 0.14, 0.42, dlnS("stone", 0xFFFFFF), X(cx), h + 1.06, zf - dir * 0.15);
dlnGable(P, w, d - 1.2, 2.6, dlnS("slate", 0xFFFFFF), X(cx), h, zc);
dlnBox(P, w, 0.22, 0.36, dlnS("stone", 0xFFFFFF), X(cx), 3.3, zf + dir * 0.02);
var houses = Math.max(1, Math.round(w / 10.8)), hw = w / houses;
for (var i = 0; i < houses; i++) {
var hx = x0 + hw * i, dx = hx + (i % 2 ? hw - 1.9 : 1.9), fz = zf + dir * 0.02;
dlnBox(P, 1.25, 2.5, 0.12, dlnC(i % 3 === 0 ? 0x1E3A2A : i % 3 === 1 ? 0x141416 : 0x3A1A1A), X(dx), 1.45, fz + dir * 0.05);
dlnBox(P, 1.65, 0.3, 0.2, dlnS("stone", 0xFFFFFF), X(dx), 2.85, fz + dir * 0.08);
[-1, 1].forEach(function (k) { dlnBox(P, 0.2, 2.7, 0.22, dlnS("stone", 0xFFFFFF), X(dx + k * 0.72), 1.45, fz + dir * 0.08); });
var fan = new THREE.Mesh(new THREE.CircleGeometry(0.6, 14, 0, Math.PI), dlnGlow(0xD8C890));
fan.position.set(X(dx), 2.72, fz + dir * 0.1);
if (dir < 0)
fan.rotation.y = Math.PI;
P.add(fan);
dlnBox(P, 1.4, 0.18, 1.6, dlnS("stone", 0xFFFFFF), X(dx), 0.09, zf + dir * 0.85);
dlnBox(P, 1.4, 0.18, 0.9, dlnS("stone", 0xFFFFFF), X(dx), 0.27, zf + dir * 0.45);
if (!o.noChimney) {
var cxm = X(hx + (i ? 0 : 0.6));
dlnBox(P, 1.2, 2.6, 2.8, plain, cxm, h + 1.3 + 1.2, zc);
for (var p = 0; p < 4; p++)
dlnCyl(P, 0.13, 0.15, 0.6, dlnC(0xA85A3A), cxm - 0.42 + p * 0.28, h + 4.1, zc, 6);
}
if (o.nums) {
var n = o.nums(i);
if (n != null) {
var s = wSign([String(n)], 0.32, 0.22, "#141416", "#D8B860");
s.position.set(X(dx), 2.2, fz + dir * 0.12);
if (dir < 0)
s.rotation.y = Math.PI;
P.add(s);
}
}
}
if (!o.noRail) {
dlnRail(P, X(x0 + 0.3), zf + dir * 1.7, X(x1 - 0.3), zf + dir * 1.7);
}
shkSolidBox(X(cx), zc, w, d, 0);
shkSolidBox(X(cx), zf + dir * 0.9, w, 1.6, 0);
},
function (P) {
var H = DLN_GOSH, X = dlnX, zf = H.z, d = H.d, zc = zf - d / 2, half = H.w / 2, gf = 4.4, up = 4.2, top = gf + up * 3, st = dlnS("stone", 0xFFFFFF), slate = dlnS("slate", 0xFFFFFF);
var rus = dlnS("rustic", 0xFFFFFF), barry = dlnS("barry", 0xFFFFFF), plain = dlnS("redbrick", 0xFFFFFF);
[[-half, -9], [9, half]].forEach(function (r) {
var w = r[1] - r[0], cx = (r[0] + r[1]) / 2;
dlnFace(P, w, gf, rus, X(cx), gf / 2, zf - 0.15);
dlnFace(P, w, up * 3, barry, X(cx), gf + up * 1.5, zf - 0.15);
});
dlnBox(P, H.w, top, 0.3, plain, X(0), top / 2, zf - d + 0.15);
[-1, 1].forEach(function (k) { dlnBox(P, 0.3, top, d, plain, X(k * half), top / 2, zc); });
var cz = zf + 1.6;
dlnFace(P, 18, gf, rus, X(0), gf / 2, cz - 0.15);
dlnFace(P, 18, up * 3, barry, X(0), gf + up * 1.5, cz - 0.15);
[-1, 1].forEach(function (k) { dlnBox(P, 0.3, top + up, 1.6, plain, X(k * 9), (top + up) / 2, zf + 0.8); });
dlnFace(P, 18, up, barry, X(0), top + up / 2, cz - 0.15);
[-1, 1].forEach(function (k) {
var px = k * (half - 4);
dlnFace(P, 8, gf, rus, X(px), gf / 2, zf + 0.85);
dlnFace(P, 8, up * 3, barry, X(px), gf + up * 1.5, zf + 0.85);
[-1, 1].forEach(function (s) { dlnBox(P, 0.3, top, 1.0, plain, X(px + s * 4), top / 2, zf + 0.5); });
for (var q = 0; q < top; q += 0.62) {
dlnBox(P, (q / 0.62) % 2 ? 0.5 : 0.8, 0.5, 0.34, st, X(px + k * 4 - k * 0.2), q + 0.25, zf + 1.02);
}
var rf = new THREE.Mesh(new THREE.ConeGeometry(6.2, 7, 4, 1), slate);
rf.rotation.y = Math.PI / 4;
rf.scale.set(1, 1, 0.9);
rf.position.set(X(px), top + 1.2 + 3.5, zc + 6);
P.add(rf);
dlnBox(P, 8.6, 1.2, d * 0.7, slate, X(px), top + 0.6, zc + 6);
for (var c = -1; c <= 1; c += 0.5)
dlnCyl(P, 0.03, 0.03, 0.9, dlnShine(0x1E2A22, 0.5, 0.6), X(px + c), top + 9, zc + 6, 4);
});
[[0, H.w + 0.6, zf], [0, 18.4, cz]].forEach(function (c) { dlnBox(P, c[1], 0.5, 0.8, st, X(c[0]), top + 0.1, c[2] + 0.2); dlnBox(P, c[1], 0.18, 0.6, st, X(c[0]), top + 0.42, c[2] + 0.1); });
for (var bx = -half + 1; bx < half - 1; bx += 0.5) {
if (Math.abs(bx) < 9.3)
continue;
var b = dlnCyl(P, 0.1, 0.14, 0.75, st, X(bx), top + 0.9, zf + 0.05, 8);
}
dlnBox(P, H.w, 0.18, 0.5, st, X(0), top + 1.34, zf + 0.05);
[gf, gf + up, gf + up * 2].forEach(function (y) { dlnBox(P, H.w + 0.4, 0.28, 0.5, st, X(0), y, zf + 0.06); dlnBox(P, 18.4, 0.28, 0.5, st, X(0), y, cz + 0.06); });
var nm = wSign(["THE HOSPITAL FOR SICK CHILDREN"], 16, 1.1, "#E6E0D2", "#5A4A3A");
nm.position.set(X(0), top + up + 0.75, cz + 0.02);
P.add(nm);
var yr = wSign(["MDCCCLXXV"], 4, 0.6, "#E6E0D2", "#5A4A3A");
yr.position.set(X(0), top + up * 0.45, cz + 0.02);
P.add(yr);
var ped = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 10.4, 3.2, 3, 1), st);
ped.rotation.z = Math.PI / 2;
ped.rotation.y = Math.PI / 2;
ped.scale.set(1, 1, 0.12);
var pg = new THREE.Group();
pg.position.set(X(0), top + up + 2.3, cz - 0.1);
P.add(pg);
var tri = new THREE.Shape();
tri.moveTo(-9.6, 0);
tri.lineTo(9.6, 0);
tri.lineTo(0, 3.0);
tri.lineTo(-9.6, 0);
var tg = new THREE.ExtrudeGeometry(tri, { depth: 0.6, bevelEnabled: false });
var tm = new THREE.Mesh(tg, st);
tm.position.z = -0.3;
pg.add(tm);
var ck = dlnCyl(pg, 0.62, 0.62, 0.12, dlnC(0xF4F0E4), 0, 1.3, 0.32, 24);
ck.rotation.x = Math.PI / 2;
[0, 1].forEach(function (h) { var hand = dlnBox(pg, 0.05, h ? 0.52 : 0.36, 0.02, dlnC(0x141416), 0, 1.3 + (h ? 0.22 : 0.15), 0.4); });
dlnMansard(P, H.w - 16, d - 0.6, 5.6, slate, X(0), top + 1.4, zc);
for (var dx = -half + 8; dx <= half - 8; dx += 4.4) {
if (Math.abs(dx) < 10)
continue;
var dg = new THREE.Group();
dg.position.set(X(dx), top + 3.0, zf - 1.6);
P.add(dg);
dlnBox(dg, 1.6, 2.0, 1.4, st, 0, 0, 0);
var sh = dlnBox(dg, 1.0, 1.3, 0.06, dlnGlow(0x3A4A58), 0, 0.1, 0.72);
var cap = new THREE.Mesh(new THREE.ConeGeometry(1.25, 0.9, 4), slate);
cap.rotation.y = Math.PI / 4;
cap.scale.set(1, 1, 0.7);
cap.position.y = 1.45;
dg.add(cap);
}
[-30, -18, 18, 30].forEach(function (cx) { dlnBox(P, 1.6, 4.4, 3.0, plain, X(cx), top + 1.4 + 5.6 + 0.8, zc); for (var p = 0; p < 4; p++)
dlnCyl(P, 0.14, 0.17, 0.7, dlnC(0xA85A3A), X(cx - 0.5 + p * 0.33), top + 1.4 + 5.6 + 3.3, zc, 6); });
var pz = cz + 2.4;
dlnBox(P, 9, 0.5, 4.2, st, X(0), 0.25, pz - 0.4);
dlnBox(P, 9.8, 0.25, 1.0, st, X(0), 0.12, pz + 1.9);
[-3.4, -1.15, 1.15, 3.4].forEach(function (cx) { dlnCyl(P, 0.3, 0.34, 4.0, st, X(cx), 2.5, pz + 0.9, 14); dlnBox(P, 0.8, 0.3, 0.8, st, X(cx), 0.65, pz + 0.9); dlnBox(P, 0.85, 0.3, 0.85, st, X(cx), 4.6, pz + 0.9); });
dlnBox(P, 8.6, 0.9, 4.4, st, X(0), 5.2, pz - 0.3);
dlnBox(P, 9, 0.25, 4.8, st, X(0), 5.75, pz - 0.3);
var pw = wSign(["HOSPITAL FOR SICK CHILDREN"], 6.4, 0.55, "#E6E0D2", "#3A2A1A");
pw.position.set(X(0), 5.2, pz + 1.92);
P.add(pw);
dlnBox(P, 2.6, 3.5, 0.14, dlnS("oak", 0xFFFFFF), X(0), 2.25, cz + 0.02);
var fan = new THREE.Mesh(new THREE.CircleGeometry(1.3, 16, 0, Math.PI), dlnGlow(0xE8D8A0));
fan.position.set(X(0), 4.0, cz + 0.05);
P.add(fan);
[-1, 1].forEach(function (k) { var lm = dlnCyl(P, 0.2, 0.14, 0.5, dlnGlow(0xFFE6B0), X(k * 2.2), 3.6, cz + 0.3, 6); });
dlnRail(P, X(-half), zf + 2.2, X(-6), zf + 2.2, 1.5);
dlnRail(P, X(6), zf + 2.2, X(half), zf + 2.2, 1.5);
[-6, 6, -half, half].forEach(function (gx) { dlnBox(P, 0.8, 2.2, 0.8, st, X(gx), 1.1, zf + 2.2); var b = new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 8), st); b.position.set(X(gx), 2.55, zf + 2.2); P.add(b); });
dlnPlane(P, H.w, 3.0, dlnS("flags", 0xC8C0B0), X(0), 0.03, zf + 0.9);
shkSolidBox(X(0), zc, H.w, d, 0);
shkSolidBox(X(-half / 2 - 3), zf + 1.0, half - 6, 2.2, 0);
shkSolidBox(X(half / 2 + 3), zf + 1.0, half - 6, 2.2, 0);
[-3.4, -1.15, 1.15, 3.4].forEach(function (cx) { shkSolid({ x: X(cx), z: pz + 0.9, r: 0.4 }); });
shkFloor(X(0), pz - 0.4, 4.5, 2.1, 0.5);
shkDoor("dln_hall", X(0), cz + 1.6, "The Hospital for Sick Children");
shkSpot(X(0), pz + 3.2, 4.5, "The Hospital for Sick Children", "read about it", function () { worldCard(worldFacts("The Hospital for Sick Children", "Great Ormond Street, Bloomsbury", [["Opened", "14 February 1852, in an old house (No. 49) with ten beds"], ["This building", "By Edward Middleton Barry, 1872 to 1875"], ["The chapel", "St Christopher's, opened with the building"], ["Kept going by", "Gifts, great and small"]], ["The first hospital for children in the English-speaking world.", "Go in by the porch: the hall porter will show you the wards, the chapel, the out-patients' hall, and the room where the hospital's story is told."])); });
},
function (P, R) {
var Q = DLN_QS, X = dlnX;
dlnPlane(P, Q.hw * 2, Q.hd * 2, dlnS("flags", 0xFFFFFF), X(Q.x), 0.02, Q.z);
var gr = dlnS("lawn", 0xFFFFFF);
dlnPlane(P, Q.hw * 2 - 6, Q.hd * 2 - 6, gr, X(Q.x), 0.035, Q.z);
var gravel = dlnS("gravel", 0xFFFFFF);
dlnPlane(P, 3, Q.hd * 2 - 6, gravel, X(Q.x), 0.04, Q.z);
dlnPlane(P, Q.hw * 2 - 6, 3, gravel, X(Q.x), 0.042, Q.z);
[[-1, 0], [1, 0]].forEach(function (s) { var x = Q.x + s[0] * Q.hw; dlnRail(P, X(x), Q.z - Q.hd, X(x), Q.z - 2.5); dlnRail(P, X(x), Q.z + 2.5, X(x), Q.z + Q.hd); });
[[0, -1], [0, 1]].forEach(function (s) { var z = Q.z + s[1] * Q.hd; dlnRail(P, X(Q.x - Q.hw), z, X(Q.x - 2.5), z); dlnRail(P, X(Q.x + 2.5), z, X(Q.x + Q.hw), z); });
var st = dlnS("stone", 0xFFFFFF);
dlnBox(P, 2.4, 0.4, 2.4, st, X(Q.x), 0.2, Q.z + 30);
dlnBox(P, 1.6, 2.0, 1.6, st, X(Q.x), 1.4, Q.z + 30);
var lead = dlnShine(0x6A7078, 0.6, 0.5), fig = new THREE.Group();
fig.position.set(X(Q.x), 2.4, Q.z + 30);
P.add(fig);
var robe = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.7, 14), lead);
robe.position.y = 0.85;
fig.add(robe);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), lead);
hd.position.y = 1.85;
fig.add(hd);
var cr = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.13, 0.14, 8), lead);
cr.position.y = 2.05;
fig.add(cr);
shkSolid({ x: X(Q.x), z: Q.z + 30, r: 1.4 });
shkSpot(X(Q.x), Q.z + 33, 3.2, "The lead statue", "read the plaque", function () { worldCard(worldFacts("The statue in Queen Square", "Lead, about 1775", [["Who", "A queen: most say Queen Charlotte, wife of King George III"], ["The square", "Laid out in the early 1700s and named for Queen Anne"]], ["Queen Square has long been a place of hospitals: the Hospital for Sick Children is round the corner in Great Ormond Street, and the National Hospital for the Paralysed and Epileptic stands on the square itself."])); });
var trees = [];
for (var i = 0; i < (DLN.lite ? 8 : 22); i++) {
var u = i / (DLN.lite ? 8 : 22), side = i % 4, px, pz;
if (side === 0) {
px = Q.x - Q.hw + 4;
pz = Q.z - Q.hd + 6 + u * (Q.hd * 2 - 12) * 4 % (Q.hd * 2 - 12);
}
else if (side === 1) {
px = Q.x + Q.hw - 4;
pz = Q.z - Q.hd + 6 + ((u * 4 + 0.5) % 1) * (Q.hd * 2 - 12);
}
else if (side === 2) {
pz = Q.z - Q.hd + 4;
px = Q.x - Q.hw + 6 + ((u * 4 + 0.25) % 1) * (Q.hw * 2 - 12);
}
else {
pz = Q.z + Q.hd - 4;
px = Q.x - Q.hw + 6 + ((u * 4 + 0.75) % 1) * (Q.hw * 2 - 12);
}
trees.push({ x: X(px), z: pz });
}
dlnPlanes(P, trees, R);
for (var b = 0; b < (DLN.lite ? 3 : 8); b++) {
var bz = Q.z - Q.hd + 14 + b * ((Q.hd * 2 - 28) / 7);
dlnBench(P, X(Q.x + 2.6), bz, -Math.PI / 2);
}
},
function (P, list, R) {
var bark = dlnS("planebark", 0xFFFFFF), lv = [dlnS("leaves", 0xFFFFFF), dlnS("leaves", 0xD8E8C8), dlnS("leaves", 0xB8C8A8)];
list.forEach(function (t, i) {
var h = t.h || (11 + R() * 5), g = new THREE.Group();
g.position.set(t.x, 0, t.z);
g.rotation.y = R() * 6.28;
P.add(g);
dlnCyl(g, 0.3, 0.42, h * 0.42, bark, 0, h * 0.21, 0, DLN.lite ? 6 : 9);
var limbs = DLN.lite ? 3 : 5;
for (var k = 0; k < limbs; k++) {
var a = k / limbs * Math.PI * 2 + R() * 0.6, tilt = 0.45 + R() * 0.35, L = h * (0.34 + R() * 0.12);
var lg = new THREE.Group();
lg.position.y = h * 0.4;
lg.rotation.y = a;
g.add(lg);
var arm = new THREE.Group();
arm.rotation.z = tilt;
lg.add(arm);
dlnCyl(arm, 0.12, 0.24, L, bark, 0, L / 2, 0, DLN.lite ? 5 : 7);
for (var c = 0; c < (DLN.lite ? 2 : 4); c++) {
var r = 1.5 + R() * 1.3, u = 0.55 + c * 0.18, m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, DLN.lite ? 0 : 1), lv[(i + k + c) % 3]);
m.position.set((R() - 0.5) * 1.2, L * u + r * 0.3, (R() - 0.5) * 1.2);
m.scale.set(1.15, 0.8, 1.15);
arm.add(m);
}
}
var top = new THREE.Mesh(new THREE.IcosahedronGeometry(2.4, DLN.lite ? 0 : 1), lv[i % 3]);
top.position.y = h * 0.92;
top.scale.set(1.3, 0.8, 1.3);
g.add(top);
shkSolid({ x: t.x, z: t.z, r: 0.55 });
});
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var w = dlnC(0x5A3A22), ir = dlnShine(0x1E2A22, 0.6, 0.5);
for (var s = 0; s < 4; s++)
dlnBox(g, 1.8, 0.04, 0.1, w, 0, 0.46, -0.18 + s * 0.12);
for (var s2 = 0; s2 < 3; s2++)
dlnBox(g, 1.8, 0.1, 0.03, w, 0, 0.62 + s2 * 0.13, -0.27);
[-0.8, 0.8].forEach(function (k) { dlnBox(g, 0.06, 0.9, 0.5, ir, k, 0.45, -0.06); });
},
function (P, R) {
var X = dlnX, shops = [["F. BALL", "BAKER"], ["H. GREEN", "CHEMIST"], ["THE LAMB", ""], ["J. COOK", "TOBACCONIST"], ["M. HART", "DRAPER"], ["DAIRY", "NEW MILK"], ["W. ROSE", "STATIONER"], ["S. LEVY", "BOOTMAKER"]];
[[-1, DLN_LCS.x - 6.5], [1, DLN_LCS.x + 6.5]].forEach(function (side, si) {
var dir = side[0], xf = side[1];
for (var i = 0; i < 14; i++) {
var z0 = -140 + i * 19, cz = z0 + 9.5;
if (Math.abs(cz) < 12 || Math.abs(cz + 150) < 14 || Math.abs(cz - 130) < 14)
continue;
var face = X(xf + dir * 0.15), ry = dir < 0 ? -Math.PI / 2 : Math.PI / 2;
var s = dlnBox(P, 19, 3.3, 0.3, dlnS("shop", si ? 0xC8D0C0 : 0xE0D0C0), face, 1.65, cz, ry);
dlnBox(P, 19, 6.6, 0.3, dlnS("georgian", 0xFFFFFF), face, 3.3 + 3.3, cz, ry);
dlnBox(P, 19, 0.8, 0.3, dlnS("coping", 0xFFFFFF), face, 10.3, cz, ry);
dlnBox(P, 14, 10, 19, dlnS("stock", 0xFFFFFF), X(xf + dir * 7.2), 5, cz);
dlnGable(P, 14, 18.6, 2.4, dlnS("slate", 0xFFFFFF), X(xf + dir * 7.2), 10, cz, Math.PI / 2);
var sh = shops[(i + si * 3) % shops.length], sg = wSign(sh[1] ? [sh[0], sh[1]] : [sh[0]], 5.6, 0.7, sh[0] === "THE LAMB" ? "#3A1E14" : "#1E2A22", sh[0] === "THE LAMB" ? "#E8C870" : "#E8E0C0");
sg.position.set(face - dir * 0.2, 3.0, cz - 4);
sg.rotation.y = ry + Math.PI;
P.add(sg);
if (sh[0] === "THE LAMB") {
var ln = dlnCyl(P, 0.26, 0.18, 0.6, dlnGlow(0xFFE6B0), face - dir * 0.9, 3.6, cz + 5, 6);
shkSpot(face - dir * 1.6, cz, 3.4, "The Lamb", "read about it", function () { worldCard(worldFacts("The Lamb", "A public house of Lamb's Conduit Street", [["The name", "From William Lamb, who in 1577 paid for a conduit bringing clean water here"], ["Inside", "Polished wood, etched glass and the little swivelling 'snob screens' at the bar, so the gentlemen need not be seen by the barmen"]], ["Doctors and nurses from the hospitals round about come here at the end of the day."])); });
}
shkSolidBox(X(xf + dir * 7.2), cz, 14.4, 19, 0);
}
});
},
function (P, x, z) {
var r = dlnShine(0xB01818, 0.45, 0.2);
dlnCyl(P, 0.28, 0.3, 1.3, r, x, 0.65, z, 14);
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.31, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), r);
cap.position.set(x, 1.3, z);
P.add(cap);
dlnBox(P, 0.28, 0.04, 0.06, dlnC(0x141414), x, 1.08, z + 0.28);
var sg = wSign(["G R"], 0.22, 0.14, "#B01818", "#E8C860");
sg.position.set(x, 0.9, z + 0.3);
P.add(sg);
shkSolid({ x: x, z: z, r: 0.35 });
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var body = dlnShine(0x141416, 0.35, 0.3), wheel = dlnShine(0x1E1A16, 0.6, 0.2), brass = dlnShine(0xC8A048, 0.3, 0.9);
dlnBox(g, 1.5, 1.6, 1.4, body, 0, 1.6, 0);
dlnBox(g, 1.5, 0.9, 0.12, dlnGlow(0x3A4A58), 0, 2.0, 0.72);
dlnBox(g, 1.6, 0.08, 1.5, body, 0, 2.45, 0.05);
[-0.85, 0.85].forEach(function (k) {
var w = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.05, 6, 24), wheel);
w.rotation.y = Math.PI / 2;
w.position.set(k, 0.88, -0.2);
g.add(w);
for (var s = 0; s < 12; s++) {
var sp = dlnBox(g, 0.03, 1.66, 0.03, wheel, k, 0.88, -0.2);
sp.rotation.x = s * Math.PI / 12;
}
});
dlnBox(g, 0.9, 0.1, 0.7, body, 0, 2.9, -1.0);
dlnBox(g, 0.1, 1.0, 0.1, body, 0, 2.4, -0.9);
[-0.6, 0.6].forEach(function (k) { dlnBox(g, 0.06, 0.06, 3.2, dlnC(0x2A2018), k, 1.2, 1.9); });
[-0.82, 0.82].forEach(function (k) { dlnCyl(g, 0.08, 0.06, 0.25, brass, k, 2.3, 0.8, 8); });
var hc = dlnC(0x4A3020), h = new THREE.Group();
h.position.set(0, 0, 3.0);
g.add(h);
var b = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.4, 12), hc);
[-0.7, 0.7].forEach(function (e) { var s2 = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 8), hc); s2.position.set(0, 1.45, e); h.add(s2); });
b.rotation.x = Math.PI / 2;
b.position.y = 1.45;
h.add(b);
[[-0.25, -0.55], [0.25, -0.55], [-0.25, 0.55], [0.25, 0.55]].forEach(function (l) { dlnCyl(h, 0.07, 0.06, 1.1, hc, l[0], 0.55, l[1], 6); dlnCyl(h, 0.08, 0.09, 0.1, dlnC(0x141414), l[0], 0.05, l[1], 6); });
var nk = dlnCyl(h, 0.18, 0.26, 0.9, hc, 0, 1.95, 0.85, 8);
nk.rotation.x = 0.7;
var hd = dlnBox(h, 0.26, 0.3, 0.6, hc, 0, 2.3, 1.25);
hd.rotation.x = 0.5;
var mane = dlnBox(h, 0.06, 0.5, 0.8, dlnC(0x1A1410), 0, 2.15, 0.75);
mane.rotation.x = 0.7;
dlnBox(h, 0.6, 0.12, 0.5, dlnC(0x1A1410), 0, 1.95, -0.1);
shkSolidBox(x, z + Math.cos(ry || 0) * 1.5, 2, 5.2, ry || 0);
},
function (P, R) {
var X = dlnX, road = dlnS("setts", 0xFFFFFF), pave = dlnS("flags", 0xFFFFFF), kerb = dlnS("stone", 0xCCC4B4);
var off = function (m) { m.material = m.material.clone(); m.material.polygonOffset = true; m.material.polygonOffsetFactor = -1; m.material.polygonOffsetUnits = -4; m.userData.keep = 1; return m; };
dlnPlane(P, DLN_R.hw * 2, DLN_R.hd * 2, dlnC(0x6A645A), X(0), 0, 0);
var strips = [[DLN_ST.x0 - 90, DLN_ST.x1 + 20, 0, "x"], [DLN_ST.x0 - 90, DLN_ST.x1 + 20, -150, "x"], [DLN_ST.x0 - 90, DLN_ST.x1 + 20, 130, "x"],
[-150, 130, DLN_LCS.x, "z"], [-150, 130, DLN_QS.x - DLN_QS.hw - 6, "z"], [-150, 130, DLN_QS.x + DLN_QS.hw + 6, "z"]];
strips.forEach(function (s) {
var L = s[1] - s[0], c = (s[0] + s[1]) / 2, along = s[3] === "x";
var rd = dlnPlane(P, along ? L : 9, along ? 9 : L, road, X(along ? c : s[2]), 0.02, along ? s[2] : c);
off(rd);
[-1, 1].forEach(function (k) {
var pv = dlnPlane(P, along ? L : 3, along ? 3 : L, pave, X(along ? c : s[2] + k * 6), 0.14, along ? s[2] + k * 6 : c);
pv.userData.keep = 1;
dlnBox(P, along ? L : 0.3, 0.15, along ? 0.3 : L, kerb, X(along ? c : s[2] + k * 4.6), 0.075, along ? s[2] + k * 4.6 : c);
});
});
shkFloor(X(0), 0, DLN_R.hw, DLN_R.hd, 0);
var nums = function (base, step) { return function (i) { return base + i * step; }; };
dlnTerrace(P, DLN_ST.x0, -DLN_GOSH.w / 2 - 6, -7.5, 1, 4, { nums: nums(30, 2) });
dlnTerrace(P, DLN_GOSH.w / 2 + 6, DLN_LCS.x - 21, -7.5, 1, 4, { nums: nums(54, 2) });
dlnTerrace(P, DLN_ST.x0, -30, 7.5, -1, 4, { nums: nums(25, 2) });
dlnTerrace(P, -14, DLN_LCS.x - 21, 7.5, -1, 4, { nums: nums(43, 2) });
var mw = dlnPlane(P, 16, 16, road, X(-22), 0.025, 16);
off(mw);
dlnTerrace(P, DLN_ST.x0 - 60, DLN_LCS.x - 21, -157.5, -1, 4, { noChimney: DLN.lite });
dlnTerrace(P, DLN_ST.x0 - 60, DLN_LCS.x - 21, -142.5, 1, 4, { noRail: DLN.lite, d: 12 });
dlnTerrace(P, DLN_ST.x0 - 60, DLN_LCS.x - 21, 137.5, -1, 4, { noRail: DLN.lite });
dlnTerrace(P, DLN_ST.x0 - 60, DLN_LCS.x - 21, 122.5, 1, 3, { d: 12 });
dlnTerrace(P, DLN_QS.x - DLN_QS.hw - 60, DLN_QS.x - DLN_QS.hw - 12, -160, 1, 4, {});
dlnHospital(P);
dlnQueenSquare(P, R);
dlnLambsConduit(P, R);
for (var lx = DLN_ST.x0 + 6; lx < DLN_ST.x1; lx += 24) {
dlnLamp(P, X(lx), -5.4);
dlnLamp(P, X(lx + 12), 5.4);
}
for (var lz = -140; lz < 120; lz += 26)
dlnLamp(P, X(DLN_LCS.x - 5.4), lz);
dlnPillarBox(P, X(-60), 5.6);
dlnPillarBox(P, X(DLN_LCS.x + 5.6), -30);
dlnTrough(P, X(DLN_LCS.x - 3.8), 60);
dlnHansom(P, X(DLN_PLACES.cab.x), DLN_PLACES.cab.z + 1.2, Math.PI / 2);
dlnHansom(P, X(DLN_PLACES.cab.x - 12), DLN_PLACES.cab.z + 1.2, Math.PI / 2);
shkSpot(X(DLN_PLACES.cab.x + 2.5), DLN_PLACES.cab.z - 0.5, 3.4, "The cab rank", "hail a hansom", function () { dlnCabCard(); });
var sgn = wSign(["GREAT ORMOND STREET", "W.C."], 3, 0.7, "#F2EEE4", "#141414");
sgn.position.set(X(DLN_ST.x1 - 24), 3.2, -7.0);
P.add(sgn);
var sg2 = wSign(["QUEEN SQUARE", "W.C."], 2.6, 0.6, "#F2EEE4", "#141414");
sg2.position.set(X(DLN_QS.x + DLN_QS.hw + 10.6), 3.2, -10);
sg2.rotation.y = Math.PI / 2;
P.add(sg2);
var sg3 = wSign(["LAMB'S CONDUIT STREET", "W.C."], 3.4, 0.7, "#F2EEE4", "#141414");
sg3.position.set(X(DLN_LCS.x - 6.4), 3.2, -20);
sg3.rotation.y = Math.PI / 2;
P.add(sg3);
},
function (R) {
var X = dlnX, crowd = function (n, x0, x1, z0, z1, kinds, o) {
if (DLN.lite)
n = Math.ceil(n * 0.4);
for (var i = 0; i < n; i++) {
var px = x0 + R() * (x1 - x0), pz = z0 + R() * (z1 - z0);
if (shkSolidAt(X(px), pz, 0))
continue;
var who = kinds[(R() * kinds.length) | 0], p = dlnPerson("f" + SHK.people.length + "_" + i, who);
p.position.set(X(px), 0.14, pz);
p.rotation.y = R() * 6.28;
SHK.live.add(p);
SHK.people.push({ g: p, wander: o && o.still ? null : { r: 8, sp: 0.5 + R() * 0.6 }, ground: 0.14 });
}
};
crowd(16, DLN_ST.x0, DLN_ST.x1 - 10, -6.6, -4.8, ["gent", "lady", "lady", "worker", "maid", "nurse", "girl", "boy"]);
crowd(16, DLN_ST.x0, DLN_ST.x1 - 10, 4.8, 6.6, ["gent", "lady", "worker", "maid", "gent", "girl", "boy", "lady"]);
crowd(10, DLN_LCS.x - 6.4, DLN_LCS.x - 4.8, -140, 110, ["gent", "lady", "worker", "maid"]);
crowd(10, DLN_LCS.x + 4.8, DLN_LCS.x + 6.4, -140, 110, ["gent", "lady", "worker", "lady"]);
crowd(12, DLN_QS.x - DLN_QS.hw + 6, DLN_QS.x + DLN_QS.hw - 6, DLN_QS.z - DLN_QS.hd + 6, DLN_QS.z + DLN_QS.hd - 6, ["lady", "maid", "girl", "boy", "gent", "nurse"]);
crowd(4, -6, 6, DLN_GOSH.z + 3.6, DLN_GOSH.z + 5, ["nurse", "lady", "girl", "sister"], { still: 1 });
dlnNamed("bobby", 40, 6, Math.PI);
dlnNamed("cabby", DLN_PLACES.cab.x + 2.2, DLN_PLACES.cab.z - 0.6, -Math.PI / 2);
dlnNamed("flowers", 7.5, DLN_GOSH.z + 5.2, Math.PI * 0.9);
dlnNamed("newsboy", DLN_LCS.x - 5.2, -4.6, -Math.PI * 0.75);
},
function (k, x, z, ry, o) {
var F = DLN_FOLK[k], p = dlnPerson("n_" + k, F.dress, { sex: F.sex, child: !!F.child, inside: !!(o && o.P && o.P !== SHK.live) });
p.position.set(dlnX(x), (o && o.y != null) ? o.y : 0.14, z);
p.rotation.y = ry || 0;
((o && o.P) || SHK.live).add(p);
var P = { g: p, key: "dln_" + k, wander: null, ground: (o && o.y != null) ? o.y : 0.14 };
SHK.people.push(P);
SHK.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet } });
return P;
},
function (g, cx, cz, Rm, o) {
var w = Rm.hw * 2, d = Rm.hd * 2, h = o.h || 6;
dlnBox(g, w, 0.3, d, o.floor, cx, -0.15, cz);
if (o.ceil !== false)
dlnBox(g, w, 0.3, d, o.ceil || dlnGlow(0xA8A090), cx, h + 0.15, cz);
var walls = [[w, 0.4, cx, cz - Rm.hd - 0.2], [w, 0.4, cx, cz + Rm.hd + 0.2], [0.4, d, cx - Rm.hw - 0.2, cz], [0.4, d, cx + Rm.hw + 0.2, cz]];
walls.forEach(function (W) { if (o.low) {
dlnBox(g, W[0], o.lowH, W[1], o.low, W[2], o.lowH / 2, W[3]);
dlnBox(g, W[0], h - o.lowH, W[1], o.wall, W[2], o.lowH + (h - o.lowH) / 2, W[3]);
}
else
dlnBox(g, W[0], h, W[1], o.wall, W[2], h / 2, W[3]); });
[[w, 0.5, cx, cz - Rm.hd + 0.05], [w, 0.5, cx, cz + Rm.hd - 0.05], [0.5, d, cx - Rm.hw + 0.05, cz], [0.5, d, cx + Rm.hw - 0.05, cz]].forEach(function (W) { dlnBox(g, W[0], 0.3, W[1], dlnC(0xF6F2E8), W[2], h - 0.15, W[3]); });
dlnBox(g, 2.0, 3.0, 0.16, dlnS("oak", 0xFFFFFF), cx, 1.5, cz + Rm.hd - 0.02);
dlnBox(g, 2.5, 0.3, 0.24, dlnC(0xF6F2E8), cx, 3.15, cz + Rm.hd - 0.05);
Rm.entry = { x: 0, z: cz + Rm.hd - 3.6, yaw: 0 };
shkSpot(cx, cz + Rm.hd - 1.4, 2.2, o.outName || "The way back to the hall", "go back", o.out || function () { shkGoIn("dln_hall"); });
},
function (g, x, y, z, ry, name, sub, col) {
var t = wTex(256, 320, function (c, W, H) {
var gr = c.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, "#3A3226");
gr.addColorStop(1, "#14100C");
c.fillStyle = gr;
c.fillRect(0, 0, W, H);
c.fillStyle = col || "#1E1E22";
c.beginPath();
c.moveTo(W * 0.18, H);
c.quadraticCurveTo(W * 0.2, H * 0.55, W * 0.5, H * 0.52);
c.quadraticCurveTo(W * 0.8, H * 0.55, W * 0.82, H);
c.fill();
c.fillStyle = "#F2EEE4";
c.beginPath();
c.moveTo(W * 0.42, H * 0.56);
c.lineTo(W * 0.5, H * 0.7);
c.lineTo(W * 0.58, H * 0.56);
c.fill();
c.fillStyle = "#D8B494";
c.beginPath();
c.ellipse(W * 0.5, H * 0.38, W * 0.13, H * 0.13, 0, 0, 7);
c.fill();
c.fillStyle = "#8A8478";
c.beginPath();
c.ellipse(W * 0.5, H * 0.29, W * 0.14, H * 0.06, 0, Math.PI, 0);
c.fill();
c.fillRect(W * 0.37, H * 0.29, W * 0.04, H * 0.12);
c.fillRect(W * 0.59, H * 0.29, W * 0.04, H * 0.12);
c.fillStyle = "rgba(255,230,180,.08)";
c.fillRect(0, 0, W * 0.35, H);
});
var fr = new THREE.Group();
fr.position.set(x, y, z);
fr.rotation.y = ry || 0;
g.add(fr);
dlnBox(fr, 1.5, 1.85, 0.08, dlnShine(0xC8A048, 0.35, 0.85), 0, 0, 0);
var p = new THREE.Mesh(new THREE.PlaneGeometry(1.28, 1.6), new THREE.MeshLambertMaterial({ map: t }));
p.position.z = 0.05;
fr.add(p);
var pl = wSign([name, sub || ""], 1.1, 0.24, "#C8A048", "#2A1E10");
pl.position.set(0, -1.12, 0.05);
fr.add(pl);
},
function (g, x, z, ry, R) {
var c = new THREE.Group();
c.position.set(x, 0, z);
c.rotation.y = ry || 0;
g.add(c);
var iron = dlnShine(0xF2F2EE, 0.4, 0.3);
[-0.45, 0.45].forEach(function (sx) { [-0.85, 0.85].forEach(function (sz) { dlnCyl(c, 0.025, 0.025, sz < 0 ? 1.15 : 0.9, iron, sx, sz < 0 ? 0.58 : 0.45, sz, 6); }); dlnCyl(c, 0.02, 0.02, 1.7, iron, sx, 0.45, 0, 6).rotation.x = Math.PI / 2; dlnCyl(c, 0.02, 0.02, 1.7, iron, sx, 0.8, 0, 6).rotation.x = Math.PI / 2; });
for (var b = 0; b < 9; b++) {
dlnCyl(c, 0.01, 0.01, 0.35, iron, -0.45 + b * 0.1125, 0.62, 0.85, 4);
dlnCyl(c, 0.01, 0.01, 0.7, iron, -0.45 + b * 0.1125, 0.8, -0.85, 4);
}
[0.85, -0.85].forEach(function (sz) { dlnCyl(c, 0.02, 0.02, 0.92, iron, 0, sz < 0 ? 1.15 : 0.8, sz, 6).rotation.z = Math.PI / 2; });
dlnBox(c, 0.86, 0.14, 1.62, dlnC(0xF4F2EC), 0, 0.52, 0);
dlnBox(c, 0.62, 0.1, 0.32, dlnC(0xFCFCF8), 0, 0.64, -0.6);
dlnBox(c, 0.9, 0.05, 1.05, dlnC(R() < 0.85 ? 0xB8242A : 0x2A4A8A), 0, 0.6, 0.25);
dlnBox(c, 0.92, 0.05, 0.2, dlnC(0xFCFCF8), 0, 0.62, -0.25);
if (R() < 0.6) {
var tb = R() < 0.6, tm = dlnC(tb ? 0xB8864A : 0xF0D8C0);
var b2 = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), tm);
b2.position.set(0.15, 0.72, -0.3);
c.add(b2);
var h2 = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 6), tm);
h2.position.set(0.15, 0.86, -0.3);
c.add(h2);
if (!tb) {
var dr = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.18, 8), dlnC(0xE87AA0));
dr.position.set(0.15, 0.7, -0.3);
c.add(dr);
}
}
dlnBox(c, 0.4, 0.6, 0.4, dlnS("oak", 0xD8C0A0), 0.75, 0.3, -0.6);
var cup = dlnCyl(c, 0.04, 0.035, 0.1, dlnC(0xF4F2EC), 0.75, 0.65, -0.6, 8);
var tag = wSign(["Cot " + (1 + ((x * 7 + z * 3) | 0) % 20)], 0.2, 0.12, "#FCFCF8", "#2A2A2A");
tag.position.set(0, 1.05, -0.88);
c.add(tag);
},
function (g, x, z, ry) {
var h = new THREE.Group();
h.position.set(x, 0, z);
h.rotation.y = ry || 0;
g.add(h);
var dap = dlnC(0xE8E2D4), spot = dlnC(0x3A3430), wood = dlnShine(0x7A2A1A, 0.4, 0.1);
[-0.25, 0.25].forEach(function (k) { var r = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.035, 6, 20, Math.PI * 0.6), wood); r.rotation.z = Math.PI * 0.7; r.rotation.y = Math.PI / 2; r.position.set(k, 1.0, 0); h.add(r); });
var b = dlnBox(h, 0.3, 0.32, 0.85, dap, 0, 0.78, 0);
for (var s = 0; s < 8; s++) {
var sp = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 4), spot);
sp.position.set((s % 2 ? 0.15 : -0.15), 0.8 + ((s * 7) % 3) * 0.06, -0.3 + s * 0.08);
h.add(sp);
}
var nk = dlnBox(h, 0.18, 0.42, 0.22, dap, 0, 1.05, 0.4);
nk.rotation.x = -0.5;
var hd = dlnBox(h, 0.16, 0.18, 0.36, dap, 0, 1.24, 0.58);
dlnBox(h, 0.05, 0.35, 0.3, dlnC(0x2A1E14), 0, 1.12, 0.32).rotation.x = -0.5;
dlnBox(h, 0.34, 0.06, 0.3, dlnC(0x8A1A1A), 0, 0.96, -0.05);
[[-0.11, -0.3], [0.11, -0.3], [-0.11, 0.3], [0.11, 0.3]].forEach(function (l) { dlnCyl(h, 0.035, 0.03, 0.42, dap, l[0], 0.5, l[1], 6); });
},
function (g, x, z, ry) {
var d = new THREE.Group();
d.position.set(x, 0, z);
d.rotation.y = ry || 0;
g.add(d);
dlnBox(d, 1.2, 0.5, 0.6, dlnS("oak", 0xFFFFFF), 0, 0.25, 0);
dlnBox(d, 1.0, 0.9, 0.5, dlnC(0xE8D8C0), 0, 0.95, 0);
var rf = new THREE.Mesh(new THREE.ConeGeometry(0.75, 0.4, 4), dlnC(0x7A3A2A));
rf.rotation.y = Math.PI / 4;
rf.scale.set(1, 1, 0.6);
rf.position.y = 1.6;
d.add(rf);
for (var r = 0; r < 2; r++)
for (var c = 0; c < 3; c++)
dlnBox(d, 0.18, 0.22, 0.02, dlnGlow(0xF0E0B0), -0.32 + c * 0.32, 0.75 + r * 0.38, 0.26);
dlnBox(d, 0.16, 0.3, 0.02, dlnC(0x1E3A2A), 0, 0.65, 0.261);
},
function (g, x, z, ry) {
var f = new THREE.Group();
f.position.set(x, 0, z);
f.rotation.y = ry || 0;
g.add(f);
var mb = dlnShine(0xE8E4DC, 0.25, 0.05);
dlnBox(f, 2.0, 1.4, 0.5, mb, 0, 0.7, 0);
dlnBox(f, 2.3, 0.12, 0.6, mb, 0, 1.46, 0.05);
dlnBox(f, 1.0, 0.9, 0.52, dlnC(0x141414), 0, 0.5, 0.02);
var glow = dlnBox(f, 0.7, 0.25, 0.3, dlnGlow(0xE87A3A), 0, 0.22, 0.12);
for (var b = 0; b < 9; b++)
dlnCyl(f, 0.012, 0.012, 0.9, dlnShine(0xC8A048, 0.3, 0.9), -0.6 + b * 0.15, 0.45, 0.75, 4);
dlnCyl(f, 0.014, 0.014, 1.3, dlnShine(0xC8A048, 0.3, 0.9), 0, 0.9, 0.75, 4).rotation.z = Math.PI / 2;
dlnCyl(f, 0.08, 0.08, 0.3, dlnShine(0xC8A048, 0.3, 0.9), -0.7, 1.67, 0.05, 8);
dlnCyl(f, 0.08, 0.08, 0.3, dlnShine(0xC8A048, 0.3, 0.9), 0.7, 1.67, 0.05, 8);
var clk = dlnBox(f, 0.4, 0.45, 0.2, dlnS("oak", 0xFFFFFF), 0, 1.75, 0.05);
},
function (g, cx, cz, R, Rm) {
dlnShell(g, cx, cz, Rm, { h: 7.2, floor: dlnS("marble", 0xFFFFFF), low: dlnS("oak", 0xFFFFFF), lowH: 2.4, wall: dlnC(0xEFE6D2), outName: "The front door", out: function () { shkGoOut("dln_hall"); } });
Rm.hello = "🏥 <b>The Hospital for Sick Children.</b> Marble underfoot, oak round the walls, and the smell of soap and polish. The porter's lodge is on your right; the great stair ahead goes up to the wards. The chapel is through the arch to the right, the out-patients' hall beyond it, and the room on the left tells the hospital's story.";
for (var bx = -Rm.hw + 3; bx < Rm.hw; bx += 3)
dlnBox(g, 0.3, 0.4, Rm.hd * 2, dlnGlow(0xB4AC9C), cx + bx, 6.85, cz);
for (var bz = -Rm.hd + 3; bz < Rm.hd; bz += 3)
dlnBox(g, Rm.hw * 2, 0.4, 0.3, dlnGlow(0xB4AC9C), cx, 6.85, cz + bz);
[[-6, -4], [6, -4], [-6, 4], [6, 4], [0, 0]].forEach(function (p) { dlnPendant(g, cx + p[0], 7.0, cz + p[1], 1.6); });
var st = dlnS("stone", 0xFFFFFF);
for (var s = 0; s < 12; s++)
dlnBox(g, 4.4, 0.18, 0.34, st, cx, 0.09 + s * 0.18, cz - Rm.hd + 7.5 - s * 0.34);
dlnBox(g, 6, 0.3, 2.6, st, cx, 2.2, cz - Rm.hd + 1.4);
[-1, 1].forEach(function (k) {
for (var b = 0; b < 12; b++)
dlnCyl(g, 0.04, 0.05, 0.85, dlnC(0xF2EEE4), cx + k * 2.25, 0.55 + b * 0.18, cz - Rm.hd + 7.5 - b * 0.34, 6);
var rail = dlnBox(g, 0.1, 0.08, 4.6, dlnS("oak", 0xFFFFFF), cx + k * 2.25, 1.4 + 1.05, cz - Rm.hd + 5.6);
rail.rotation.x = 0.49;
dlnBox(g, 0.24, 1.4, 0.24, dlnS("oak", 0xFFFFFF), cx + k * 2.25, 0.7, cz - Rm.hd + 7.7);
});
var lw = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 3.6), dlnWinMat());
lw.position.set(cx, 4.6, cz - Rm.hd + 0.03);
g.add(lw);
var la = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.16, 8, 20, Math.PI), dlnC(0xF2EEE4));
la.position.set(cx, 6.3, cz - Rm.hd + 0.1);
g.add(la);
[-1.6, 1.6].forEach(function (s2) { dlnBox(g, 0.3, 3.7, 0.24, dlnC(0xF2EEE4), cx + s2, 4.55, cz - Rm.hd + 0.1); });
[-4.2, 4.2].forEach(function (s2) { var gl = dlnGlass(s2 < 0 ? 1 : 2, 1.2, 2.6); gl.position.set(cx + s2, 4.4, cz - Rm.hd + 0.03); g.add(gl); });
var stairSign = wSign(["THE WARDS", "up the stair"], 2.2, 0.6, "#2A1E14", "#E8D8A8");
stairSign.position.set(cx, 2.95, cz - Rm.hd + 1.2 + 0.02);
stairSign.position.z = cz - Rm.hd + 2.75;
g.add(stairSign);
shkSolidBox(cx, cz - Rm.hd + 4.5, 4.6, 6.5, 0);
shkSpot(cx, cz - Rm.hd + 8.6, 2.6, "The stair up to the wards", "go up to a children's ward", function () { shkGoIn("dln_ward"); });
var lx = cx + Rm.hw - 3.2, lz = cz + 3;
dlnBox(g, 0.12, 2.6, 4, dlnS("oak", 0xFFFFFF), lx - 1.6, 1.3, lz);
dlnBox(g, 0.08, 1.2, 4, dlnGlow(0xC8D4DC), lx - 1.6, 2.1, lz);
dlnBox(g, 1.4, 1.0, 3.2, dlnS("oak", 0xFFFFFF), lx - 0.9, 0.5, lz);
dlnBox(g, 0.5, 0.04, 0.35, dlnC(0xE8E0CC), lx - 0.9, 1.03, lz - 0.6);
var bell = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), dlnShine(0xC8A048, 0.3, 0.9));
bell.position.set(lx - 0.9, 1.0, lz + 0.5);
g.add(bell);
shkSolidBox(lx - 0.9, lz, 1.6, 3.6, 0);
var lodge = wSign(["HALL PORTER", "Enquiries"], 1.4, 0.4, "#2A1E14", "#E8D8A8");
lodge.position.set(lx - 1.68, 2.9, lz);
lodge.rotation.y = -Math.PI / 2;
g.add(lodge);
var porter = dlnNamed("porter", 0, lz, -Math.PI / 2, { P: Rm.live, y: 0 });
porter.g.position.set(lx - 2.2, 0, lz);
var bd = dlnPanel(["In grateful memory of all who have given", "to this Hospital, great gifts and small,", "since its opening in 1852.", "", "Each name in gold is a child cared for."], "BENEFACTORS", 3.6, 2.4, "#1E2A22", "#D8B860");
bd.position.set(cx - Rm.hw + 0.06, 4.4, cz - 3);
bd.rotation.y = Math.PI / 2;
g.add(bd);
var bd2 = dlnPanel(["Dr Charles West, founder", "Charles Dickens, who spoke for it in 1858", "Edward Middleton Barry, architect", "and every nurse, doctor, porter and friend"], "WITH THANKS", 3.6, 2.4, "#1E2A22", "#D8B860");
bd2.position.set(cx - Rm.hw + 0.06, 4.4, cz + 3);
bd2.rotation.y = Math.PI / 2;
g.add(bd2);
dlnPortrait(g, cx + Rm.hw - 0.1, 4.6, cz - 4, -Math.PI / 2, "DR CHARLES WEST", "Founder, 1852");
dlnFireplace(g, cx - Rm.hw + 0.3, cz - 8, Math.PI / 2);
for (var bn = 0; bn < 2; bn++) {
var b = new THREE.Group();
b.position.set(cx - Rm.hw + 1.2, 0, cz + 7 - bn * 3);
b.rotation.y = Math.PI / 2;
g.add(b);
dlnBox(b, 2.2, 0.08, 0.5, dlnS("oak", 0xFFFFFF), 0, 0.45, 0);
dlnBox(b, 2.2, 0.6, 0.08, dlnS("oak", 0xFFFFFF), 0, 0.8, -0.22);
[-1, 1].forEach(function (k) { dlnBox(b, 0.08, 0.45, 0.5, dlnS("oak", 0xFFFFFF), k * 1.05, 0.22, 0); });
}
[[-Rm.hw + 1.2, -Rm.hd + 1.2], [Rm.hw - 1.2, -Rm.hd + 1.2], [-3.4, Rm.hd - 1.4], [3.4, Rm.hd - 1.4]].forEach(function (p) {
dlnCyl(g, 0.32, 0.24, 0.6, dlnShine(0x2A5A4A, 0.3, 0.1), cx + p[0], 0.3, cz + p[1], 10);
for (var l = 0; l < 7; l++) {
var lf = dlnBox(g, 0.12, 0.02, 1.0, dlnC(0x3A6A2A), cx + p[0], 0.95 + l * 0.05, cz + p[1]);
lf.rotation.y = l * 0.9;
lf.rotation.x = 0.5;
}
});
var box = new THREE.Group();
box.position.set(cx + 3.6, 0, cz + Rm.hd - 2.4);
g.add(box);
dlnBox(box, 0.12, 1.0, 0.12, dlnS("oak", 0xFFFFFF), 0, 0.5, 0);
dlnBox(box, 0.5, 0.5, 0.4, dlnS("oak", 0xFFFFFF), 0, 1.25, 0);
dlnBox(box, 0.2, 0.02, 0.04, dlnC(0x141414), 0, 1.51, 0);
var bs = wSign(["FOR THE CHILDREN"], 0.5, 0.14, "#2A1E14", "#E8D8A8");
bs.position.set(0, 1.25, 0.21);
box.add(bs);
shkSpot(cx + 3.6, cz + Rm.hd - 2.0, 1.8, "The collection box", "help the children", function () { dlnDonateCard(); });
var arch = function (x, z, ry, name, verb, k) {
var a = new THREE.Group();
a.position.set(x, 0, z);
a.rotation.y = ry;
g.add(a);
dlnBox(a, 2.4, 3.2, 0.1, dlnC(0x1E1812), 0, 1.6, 0);
var ar = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.14, 8, 18, Math.PI), dlnC(0xF2EEE4));
ar.position.y = 3.0;
a.add(ar);
[-1.35, 1.35].forEach(function (s) { dlnBox(a, 0.28, 3.0, 0.3, dlnC(0xF2EEE4), s, 1.5, 0); });
var t = wSign([name], 2.4, 0.36, "#2A1E14", "#E8D8A8");
t.position.set(0, 4.6, 0.06);
a.add(t);
shkSpot(x + Math.sin(ry) * 1.2, z + Math.cos(ry) * 1.2, 2.4, name, verb, function () { shkGoIn(k); });
};
arch(cx + Rm.hw - 0.1, cz - 6, -Math.PI / 2, "The Chapel of St Christopher", "go into the chapel", "dln_chapel");
arch(cx + Rm.hw - 0.1, cz + 8.2, -Math.PI / 2, "Out-patients", "go to the out-patients' hall", "dln_out");
arch(cx - Rm.hw + 0.1, cz + 0.0, Math.PI / 2, "The Hospital's Story", "see the hospital's story", "dln_story");
},
function (g, cx, cz, R, Rm) {
dlnShell(g, cx, cz, Rm, { h: 6.2, floor: dlnS("boards", 0xFFFFFF), wall: dlnS("wardwall", 0xFFFFFF), outName: "The stair down to the hall" });
Rm.hello = "🛏️ <b>A children's ward.</b> Long and full of light: tall windows down both sides, twenty white cots with red blankets, coal fires behind their brass guards, flowers down the middle, and toys everywhere. Nurse Price is reading aloud at the far end.";
var lite = DLN.lite, n = lite ? 6 : 10, step = (Rm.hd * 2 - 8) / n;
for (var i = 0; i < n; i++) {
var z = cz - Rm.hd + 4 + i * step + step / 2;
dlnCot(g, cx - Rm.hw + 1.2, z, Math.PI / 2, R);
dlnCot(g, cx + Rm.hw - 1.2, z, -Math.PI / 2, R);
shkSolidBox(cx - Rm.hw + 1.2, z, 1.8, 1.0, 0);
shkSolidBox(cx + Rm.hw - 1.2, z, 1.8, 1.0, 0);
if (i % 2 === 0)
[-1, 1].forEach(function (k) { var wn = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 3.2), dlnWinMat()); wn.position.set(cx + k * (Rm.hw - 0.03), 3.3, z + step / 2); wn.rotation.y = k < 0 ? Math.PI / 2 : -Math.PI / 2; g.add(wn); dlnBox(g, 0.16, 0.12, 1.8, dlnC(0xE8E4DC), cx + k * (Rm.hw - 0.06), 1.62, z + step / 2); });
}
for (var p = 0; p < (lite ? 3 : 5); p++)
dlnPendant(g, cx, 6.2, cz - Rm.hd + 6 + p * ((Rm.hd * 2 - 12) / (lite ? 2 : 4)), 1.6);
[-8, 8].forEach(function (dz) {
dlnBox(g, 1.2, 0.06, 5, dlnS("oak", 0xFFFFFF), cx, 0.78, cz + dz);
[-2.2, 2.2].forEach(function (e) { [-0.5, 0.5].forEach(function (s) { dlnBox(g, 0.08, 0.76, 0.08, dlnS("oak", 0xFFFFFF), cx + s, 0.38, cz + dz + e); }); });
dlnBox(g, 1.24, 0.02, 5.04, dlnC(0xFCFCF8), cx, 0.82, cz + dz);
for (var v = 0; v < 3; v++) {
var vz = cz + dz - 1.6 + v * 1.6;
dlnCyl(g, 0.08, 0.06, 0.25, dlnGlow(0xC8E0E8), cx, 0.95, vz, 8);
var cols = [0xE84A6A, 0xF4F0F0, 0xF0C040, 0xB88AE0];
for (var f = 0; f < 6; f++) {
var fl = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), dlnC(cols[(f + v) % 4]));
fl.position.set(cx + Math.cos(f) * 0.12, 1.15 + ((f * 3) % 2) * 0.06, vz + Math.sin(f) * 0.12);
g.add(fl);
}
}
shkSolidBox(cx, cz + dz, 1.4, 5.2, 0);
});
dlnFireplace(g, cx - Rm.hw + 0.3, cz, Math.PI / 2);
dlnFireplace(g, cx + Rm.hw - 0.3, cz, -Math.PI / 2);
var pz = cz - Rm.hd + 3.2;
dlnRockingHorse(g, cx - 3.2, pz + 1, 0.6);
dlnDollsHouse(g, cx + 3.2, pz - 0.8, -0.3);
var cup = new THREE.Group();
cup.position.set(cx, 0, cz - Rm.hd + 0.5);
g.add(cup);
dlnBox(cup, 2.4, 2.0, 0.5, dlnS("oak", 0xFFFFFF), 0, 1.0, 0);
var toys = [0xC83A3A, 0x3A6AC8, 0xE8C040, 0x3A8A4A, 0xF0ECE4, 0x8A4AA8];
for (var t = 0; t < 12; t++) {
var tb = dlnBox(cup, 0.22, 0.22, 0.22, dlnC(toys[t % 6]), -0.9 + (t % 6) * 0.36, 0.7 + ((t / 6) | 0) * 0.75, 0.2);
tb.rotation.y = t * 0.4;
}
var ark = new THREE.Group();
ark.position.set(cx - 1.2, 0, pz + 2.4);
g.add(ark);
dlnBox(ark, 1.0, 0.25, 0.4, dlnC(0x8A5A3A), 0, 0.13, 0);
dlnBox(ark, 0.6, 0.25, 0.3, dlnC(0xC84A3A), 0, 0.38, 0);
var rf = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.25, 4), dlnC(0x3A6A2A));
rf.rotation.y = Math.PI / 4;
rf.scale.set(1, 1, 0.6);
rf.position.y = 0.63;
ark.add(rf);
for (var bl = 0; bl < 8; bl++) {
var b2 = dlnBox(g, 0.1, 0.1, 0.1, dlnC(toys[bl % 6]), cx + 0.8 + (bl % 4) * 0.16, 0.05 + ((bl / 4) | 0) * 0.1, pz + 2.6);
b2.rotation.y = bl;
}
shkSolidBox(cx, cz - Rm.hd + 0.5, 2.4, 0.6, 0);
shkSolid({ x: cx - 3.2, z: pz + 1, r: 0.8 });
shkSolid({ x: cx + 3.2, z: pz - 0.8, r: 0.8 });
dlnBox(g, 1.6, 0.8, 0.8, dlnS("oak", 0xFFFFFF), cx + Rm.hw - 2.6, 0.4, cz + Rm.hd - 3);
dlnCyl(g, 0.12, 0.16, 0.4, dlnGlow(0xE8F0D0), cx + Rm.hw - 2.2, 1.0, cz + Rm.hd - 3, 10);
dlnBox(g, 0.4, 0.05, 0.3, dlnC(0x2A1A10), cx + Rm.hw - 2.9, 0.83, cz + Rm.hd - 3);
shkSolidBox(cx + Rm.hw - 2.6, cz + Rm.hd - 3, 1.8, 1.0, 0);
var sis = dlnNamed("sister", 0, 0, Math.PI, { P: Rm.live, y: 0 });
sis.g.position.set(cx + Rm.hw - 3.2, 0, cz + Rm.hd - 4.2);
var nur = dlnNamed("nurse", 0, 0, 0, { P: Rm.live, y: 0 });
nur.g.position.set(cx, 0, pz + 3.4);
nur.g.rotation.y = Math.PI;
var kids = lite ? 4 : 9;
for (var k = 0; k < kids; k++) {
var a = Math.PI * (0.2 + 0.6 * k / kids), kp = dlnPerson("ward" + k, "patient", { child: true });
kp.position.set(cx + Math.cos(a) * 2.4 - 1.2 + ((k % 2) ? 0.4 : 0), 0, pz + 3.4 - Math.sin(a) * 1.6 + (k > 5 ? 3.2 : 0));
kp.rotation.y = Math.atan2(cx - kp.position.x, pz + 3.4 - kp.position.z);
Rm.live.add(kp);
SHK.people.push({ g: kp, wander: null, ground: 0 });
}
shkSpot(cx, pz + 4.6, 2.6, "Nurse Price's story", "listen to the story", function () { dlnStoryTime(); });
shkSpot(cx, cz + 4, 3, "The ward", "look around", function () { worldCard(worldFacts("A children's ward, 1912", "Up the great stair", [["Cots", "Twenty, each with its own little locker and a card at its foot"], ["Light and air", "Tall windows on both sides, opened every day, for fresh air was the best medicine anyone knew"], ["Warmth", "A coal fire at each side, behind a brass guard"], ["Play", "Toys, a rocking horse, a dolls' house, and someone always ready to read aloud"], ["Who looks after them", "The ward sister, her nurses, and the doctors on their rounds"]], ["Mothers may come to sit with their children, and visitors bring flowers.", "Sister Dunn runs the ward; Nurse Price is reading Peter and Wendy aloud (it came out only last year)."])); });
},
function (g, cx, cz, R, Rm) {
dlnShell(g, cx, cz, Rm, { h: 7.6, floor: dlnS("encaustic", 0xFFFFFF), low: dlnShine(0x6A2A2A, 0.25, 0.1), lowH: 1.6, wall: dlnC(0xE8DCC0), ceil: dlnS("stars", 0xFFFFFF) });
Rm.hello = "⛪ <b>The Chapel of St Christopher.</b> Small, and the richest room in the building: marble columns, painted angels, gold mosaic shining in the apse, coloured glass, a ceiling of stars, and rows of little seats made for children.";
var gold = dlnShine(0xD8B048, 0.3, 0.9), mar = [dlnShine(0x3A6A5A, 0.15, 0.1), dlnShine(0x8A2A2A, 0.15, 0.1)];
[[-1, 0], [1, 0]].forEach(function (s) { dlnBox(g, 0.05, 0.12, Rm.hd * 2, gold, cx + s[0] * (Rm.hw - 0.02), 1.65, cz); dlnBox(g, 0.05, 0.12, Rm.hd * 2, gold, cx + s[0] * (Rm.hw - 0.02), 5.6, cz); });
for (var i = 0; i < 4; i++) {
var z = cz - Rm.hd + 4 + i * 4.6;
[-1, 1].forEach(function (k) {
var x = cx + k * (Rm.hw - 0.9);
dlnCyl(g, 0.2, 0.22, 4.2, mar[i % 2], x, 2.3, z, 14);
dlnBox(g, 0.6, 0.4, 0.6, gold, x, 4.6, z);
dlnBox(g, 0.6, 0.3, 0.6, dlnC(0xE8E0D0), x, 0.15, z);
shkSolid({ x: x, z: z, r: 0.35 });
if (i < 3) {
var ar = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.16, 8, 20, Math.PI), dlnC(0xF2EAD6));
ar.rotation.y = Math.PI / 2;
ar.position.set(x, 4.8, z + 2.3);
g.add(ar);
var gl = dlnGlass(i + (k > 0 ? 3 : 0), 1.0, 2.4);
gl.position.set(cx + k * (Rm.hw - 0.05), 3.6, z + 2.3);
gl.rotation.y = k < 0 ? Math.PI / 2 : -Math.PI / 2;
g.add(gl);
var ang = dlnGlass(1, 0.8, 1.2);
ang.material = ang.material.clone();
ang.position.set(cx + k * (Rm.hw - 0.06), 6.4, z + 2.3);
ang.rotation.y = k < 0 ? Math.PI / 2 : -Math.PI / 2;
g.add(ang);
}
});
}
var az = cz - Rm.hd + 0.2, ap = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 5.4, 24, 1, true, -Math.PI / 2, Math.PI), dlnS("mosaic", 0xFFFFFF));
ap.material = ap.material.clone();
ap.material.side = THREE.DoubleSide;
ap.scale.z = 0.3;
ap.position.set(cx, 2.7 + 0.6, az + 0.1);
g.add(ap);
var cap = new THREE.Mesh(new THREE.SphereGeometry(3.2, 24, 10, 0, Math.PI, 0, Math.PI / 2), dlnS("mosaic", 0xFFFFFF));
cap.material = ap.material;
cap.scale.set(1, 0.45, 0.3);
cap.position.set(cx, 6.0, az + 0.1);
g.add(cap);
var fig = dlnGlass(0, 1.4, 2.6);
fig.position.set(cx, 4.3, az + 1.08);
g.add(fig);
dlnBox(g, 6.8, 0.2, 3.8, dlnS("marble", 0xFFFFFF), cx, 0.1, az + 1.6);
dlnBox(g, 5.8, 0.2, 3.0, dlnS("marble", 0xFFFFFF), cx, 0.3, az + 1.2);
dlnBox(g, 2.6, 1.05, 0.9, dlnShine(0xF2EEE4, 0.2, 0.05), cx, 0.92, az + 1.4);
dlnBox(g, 2.8, 0.06, 1.0, dlnC(0xFAF8F2), cx, 1.47, az + 1.4);
dlnBox(g, 2.82, 0.4, 0.02, gold, cx, 1.25, az + 1.91);
dlnBox(g, 0.08, 0.8, 0.06, gold, cx, 1.92, az + 1.2);
dlnBox(g, 0.42, 0.08, 0.06, gold, cx, 2.1, az + 1.2);
[-0.9, 0.9].forEach(function (k) { dlnCyl(g, 0.05, 0.07, 0.5, gold, cx + k, 1.75, az + 1.2, 8); dlnCyl(g, 0.025, 0.025, 0.25, dlnC(0xFAF6E8), cx + k, 2.12, az + 1.2, 8); var fl = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), dlnGlow(0xFFD890)); fl.position.set(cx + k, 2.28, az + 1.2); g.add(fl); });
dlnRail(g, cx - 3, az + 3.6, cx + 3, az + 3.6, 0.75);
shkSolidBox(cx, az + 1.4, 6.8, 3.6, 0);
var rows = DLN.lite ? 4 : 6;
for (var r = 0; r < rows; r++) {
[-1, 1].forEach(function (k) {
var p = new THREE.Group();
p.position.set(cx + k * 2.0, 0, az + 5.2 + r * 1.3);
g.add(p);
dlnBox(p, 2.6, 0.06, 0.36, dlnS("oak", 0xFFFFFF), 0, 0.34, 0);
dlnBox(p, 2.6, 0.42, 0.05, dlnS("oak", 0xFFFFFF), 0, 0.55, 0.2);
[-1.25, 1.25].forEach(function (e) { dlnBox(p, 0.06, 0.7, 0.5, dlnS("oak", 0xFFFFFF), e, 0.35, 0.05); });
shkSolidBox(cx + k * 2.0, az + 5.2 + r * 1.3, 2.6, 0.5, 0);
});
}
for (var lp = 0; lp < 3; lp++)
dlnPendant(g, cx, 7.6, cz - 4 + lp * 5, 2.2);
var cs = new THREE.Group();
cs.position.set(cx + Rm.hw - 1.6, 0, cz + Rm.hd - 3);
Rm.live.add(cs);
dlnCyl(cs, 0.04, 0.05, 1.0, gold, 0, 0.5, 0, 8);
dlnCyl(cs, 0.5, 0.45, 0.06, gold, 0, 1.02, 0, 16);
DLN.candles = { g: cs, n: 0 };
shkSolid({ x: cx + Rm.hw - 1.6, z: cz + Rm.hd - 3, r: 0.6 });
shkSpot(cx + Rm.hw - 1.6, cz + Rm.hd - 2.0, 1.8, "The candle stand", "light a candle", function () { dlnLightCandle(); });
var ch = dlnNamed("chaplain", 0, 0, 0, { P: Rm.live, y: 0 });
ch.g.position.set(cx - 2.6, 0, az + 4.0);
ch.g.rotation.y = 0.5;
shkSpot(cx, cz + 1, 3, "The Chapel of St Christopher", "read about it", function () { worldCard(worldFacts("The Chapel of St Christopher", "Opened with the building in 1875", [["Architect", "Edward Middleton Barry"], ["Its saint", "St Christopher, who in the old story carried a child across a river"], ["Made for", "The children of the hospital, and their families: the seats are small, and low"], ["Inside", "Marble, painted angels, coloured glass, gold mosaic and a ceiling of stars"]], ["The chapel is still there today, and still in use: when the old building was taken down in the 1990s, the whole chapel was moved, all in one piece, into the new one."])); });
},
function (g, cx, cz, R, Rm) {
dlnShell(g, cx, cz, Rm, { h: 6.0, floor: dlnS("boards", 0xFFFFFF), low: dlnS("oak", 0xFFFFFF), lowH: 1.3, wall: dlnC(0xE8E0CC) });
Rm.hello = "📜 <b>The hospital's story.</b> From ten beds in an old house in 1852 to the great children's hospital of today: six panels round the walls, cases of things to see, and by the door, a stand where you can help.";
var spots = [[-1, -8], [-1, 0], [-1, 8], [1, -8], [1, 0], [1, 8]];
DLN_STORY.forEach(function (S, i) {
var p = spots[i], x = cx + p[0] * (Rm.hw - 0.06), z = cz + p[1];
var pn = dlnPanel(S.lines, S.title, 3.4, 2.4);
pn.position.set(x - p[0] * 0.1, 3.0, z);
pn.rotation.y = p[0] < 0 ? Math.PI / 2 : -Math.PI / 2;
g.add(pn);
dlnBox(g, 0.08, 2.6, 3.6, dlnShine(0xC8A048, 0.35, 0.85), x, 3.0, z);
shkSpot(x - p[0] * 1.6, z, 2.4, S.title, "read more", function () { worldCard(worldFacts(S.title, "The hospital's story", [], [S.lines.join(" ")].concat(S.more))); });
});
var cases = [["A nurse's cap and apron", "Starched white linen, as the nurses wear now in 1912."], ["A cot from 1852", "Small, iron, and painted white: one of the first ten."], ["Dickens's speech, 1858", "Printed afterwards and sold for the hospital."], ["Peter and Wendy, 1911", "J. M. Barrie's book, new last year. In 1929 he will give the hospital all his rights in Peter Pan."], ["Dr West's book", "On how to nurse sick children: for mothers and nurses alike."], ["A toy horse", "Given by a child who got well here."]];
cases.forEach(function (C, i) {
var z = cz - 8 + (i % 3) * 8, x = cx + (i < 3 ? -2.4 : 2.4);
dlnBox(g, 1.4, 0.9, 1.0, dlnS("oak", 0xFFFFFF), x, 0.45, z);
var gl = dlnBox(g, 1.3, 0.7, 0.9, new THREE.MeshLambertMaterial({ color: 0xE8F0F4, transparent: true, opacity: 0.25 }), x, 1.25, z);
var thing = [dlnC(0xFCFCF8), dlnC(0xF2F2EE), dlnC(0xE8E0CC), dlnC(0x2A4A2A), dlnC(0x6A2A1A), dlnC(0xB8864A)][i];
var t = dlnBox(g, 0.4, 0.25, 0.3, thing, x, 1.05, z);
t.rotation.y = 0.4;
shkSolidBox(x, z, 1.4, 1.0, 0);
shkSpot(x, z + (z < cz ? 1.2 : -1.2), 1.8, C[0], "look", function () { worldCard(worldFacts(C[0], "In the case", [], [C[1]])); });
});
var ds = new THREE.Group();
ds.position.set(cx - 3, 0, cz + Rm.hd - 2.4);
g.add(ds);
dlnBox(ds, 0.15, 1.0, 0.15, dlnS("oak", 0xFFFFFF), 0, 0.5, 0);
var top = dlnBox(ds, 0.9, 0.06, 0.6, dlnS("oak", 0xFFFFFF), 0, 1.05, 0);
top.rotation.x = -0.35;
var dsn = dlnPanel(["The hospital still cares for children today.", "If you would like to help,", "press E here."], "HELP THE CHILDREN", 1.5, 1.0, "#1E2A22", "#E8D8A8");
dsn.position.set(0, 1.9, -0.1);
ds.add(dsn);
shkSolid({ x: cx - 3, z: cz + Rm.hd - 2.4, r: 0.5 });
shkSpot(cx - 3, cz + Rm.hd - 1.6, 1.8, "Help the children of Great Ormond Street", "see how", function () { dlnDonateCard(); });
var gd = dlnNamed("guide", 0, 0, 0, { P: Rm.live, y: 0 });
gd.g.position.set(cx + 2, 0, cz + Rm.hd - 4);
gd.g.rotation.y = Math.PI;
for (var lp = 0; lp < 3; lp++)
dlnPendant(g, cx, 6.0, cz - 8 + lp * 8, 1.4);
},
function (g, cx, cz, R, Rm) {
dlnShell(g, cx, cz, Rm, { h: 6.0, floor: dlnS("boards", 0xFFFFFF), wall: dlnS("wardwall", 0xFFFFFF) });
Rm.hello = "🩺 <b>The out-patients' hall.</b> Rows of benches where mothers wait with their children to see the doctor; the doctor's table behind its screen; and at the far end the dispensary counter, with its shelves of bottles.";
var rows = DLN.lite ? 3 : 5;
for (var r = 0; r < rows; r++) {
[-1, 1].forEach(function (k) {
var b = new THREE.Group();
b.position.set(cx + k * 4.2, 0, cz + 1 + r * 2);
g.add(b);
dlnBox(b, 5, 0.08, 0.45, dlnS("oak", 0xFFFFFF), 0, 0.45, 0);
dlnBox(b, 5, 0.5, 0.06, dlnS("oak", 0xFFFFFF), 0, 0.8, 0.22);
[-2.3, 2.3].forEach(function (e) { dlnBox(b, 0.08, 0.45, 0.45, dlnS("oak", 0xFFFFFF), e, 0.22, 0); });
shkSolidBox(cx + k * 4.2, cz + 1 + r * 2, 5, 0.5, 0);
});
}
var fam = DLN.lite ? 3 : 7;
for (var f = 0; f < fam; f++) {
var k = f % 2 ? 1 : -1, rz = cz + 1.6 + (f % rows) * 2, x0 = cx + k * 4.2 - 1.5 + ((f * 1.3) % 3);
var m = dlnPerson("om" + f, f % 3 === 2 ? "worker" : "lady", { inside: 1 });
m.position.set(x0, 0, rz);
m.rotation.y = Math.PI;
Rm.live.add(m);
SHK.people.push({ g: m, wander: null, ground: 0 });
var c = dlnPerson("oc" + f, f % 2 ? "girl" : "boy", { child: true });
c.position.set(x0 + 0.55, 0, rz);
c.rotation.y = Math.PI;
Rm.live.add(c);
SHK.people.push({ g: c, wander: null, ground: 0 });
}
var dx = cx - Rm.hw + 3.5, dz = cz - Rm.hd + 5;
dlnBox(g, 2.0, 0.8, 1.0, dlnS("oak", 0xFFFFFF), dx, 0.4, dz);
dlnBox(g, 0.5, 0.05, 0.4, dlnC(0xF2EEE4), dx - 0.4, 0.83, dz);
dlnCyl(g, 0.12, 0.15, 0.4, dlnGlow(0xE8F0D0), dx + 0.6, 1.0, dz, 10);
for (var s = 0; s < 3; s++) {
var sc = dlnBox(g, 1.0, 1.8, 0.04, dlnC(0xE8E0CC), dx + 2.0, 0.95, dz - 1 + s * 0.95);
sc.rotation.y = Math.PI / 2 + (s % 2 ? 0.25 : -0.25);
}
var sca = new THREE.Group();
sca.position.set(dx, 0, dz + 2.4);
g.add(sca);
dlnBox(sca, 0.6, 0.8, 0.4, dlnS("oak", 0xFFFFFF), 0, 0.4, 0);
var pan = dlnCyl(sca, 0.32, 0.26, 0.1, dlnShine(0xD8D8DC, 0.3, 0.8), 0, 0.88, 0, 16);
dlnCyl(sca, 0.12, 0.12, 0.03, dlnShine(0xC8A048, 0.3, 0.9), 0.25, 0.82, 0.21, 12).rotation.x = Math.PI / 2;
shkSolidBox(dx, dz, 2.0, 1.0, 0);
shkSolidBox(dx + 2, dz, 0.6, 3, 0);
var doc = dlnNamed("doctor", 0, 0, 0, { P: Rm.live, y: 0 });
doc.g.position.set(dx, 0, dz - 1.0);
doc.g.rotation.y = 0;
var kz = cz - Rm.hd + 1.0, kx = cx + 3.5;
dlnBox(g, 6, 1.0, 0.8, dlnS("oak", 0xFFFFFF), kx, 0.5, kz + 2.2);
dlnBox(g, 6.1, 0.06, 0.9, dlnShine(0x3A2A1A, 0.25, 0.1), kx, 1.03, kz + 2.2);
dlnBox(g, 6, 3.6, 0.4, dlnS("oak", 0xFFFFFF), kx, 1.8, kz + 0.2);
var bc = [0x2A5A3A, 0x5A2A1A, 0x2A3A6A, 0xC8A048, 0xE8E4DC, 0x6A2A4A];
for (var sh = 0; sh < 4; sh++) {
dlnBox(g, 5.8, 0.04, 0.36, dlnS("oak", 0xD8C0A0), kx, 0.7 + sh * 0.8, kz + 0.45);
for (var b = 0; b < (DLN.lite ? 8 : 18); b++) {
var bt = dlnCyl(g, 0.06, 0.07, 0.24 + ((b * 3) % 3) * 0.05, dlnShine(bc[(b + sh) % 6], 0.15, 0.1), kx - 2.7 + b * (5.4 / (DLN.lite ? 7 : 17)), 0.86 + sh * 0.8, kz + 0.45, 8);
}
}
var ms = dlnShine(0xC8A048, 0.3, 0.9);
dlnCyl(g, 0.01, 0.01, 0.4, ms, kx - 1.6, 1.26, kz + 2.2, 4);
dlnBox(g, 0.5, 0.02, 0.02, ms, kx - 1.6, 1.45, kz + 2.2);
[-0.24, 0.24].forEach(function (o2) { dlnCyl(g, 0.1, 0.08, 0.03, ms, kx - 1.6 + o2, 1.32, kz + 2.2, 10); });
dlnCyl(g, 0.13, 0.09, 0.14, dlnC(0xF2EEE4), kx + 1.4, 1.13, kz + 2.2, 12);
var dsg = wSign(["DISPENSARY"], 2.4, 0.4, "#2A1E14", "#E8D8A8");
dsg.position.set(kx, 4.0, kz + 0.42);
g.add(dsg);
shkSolidBox(kx, kz + 1.2, 6.2, 2.2, 0);
var dp = dlnNamed("dispenser", 0, 0, 0, { P: Rm.live, y: 0 });
dp.g.position.set(kx + 0.5, 0, kz + 1.3);
dp.g.rotation.y = 0;
for (var lp = 0; lp < 3; lp++)
dlnPendant(g, cx, 6.0, cz - 7 + lp * 7, 1.4);
shkSpot(cx, cz + Rm.hd - 4, 3, "The out-patients' hall", "read about it", function () { worldCard(worldFacts("Out-patients", "Seen, helped, and sent home the same day", [["Who comes", "Mothers bring their children every morning, from all over London"], ["The doctor", "Sees each child in turn behind the screen"], ["The dispensary", "Makes up what the doctor orders, labelled twice"], ["The scales", "Every baby is weighed: a baby gaining weight is a baby getting well"]], ["Children who need to stay are taken up the stair to a ward."])); });
},
function () {
if (DLN.built || !SHK.G)
return;
DLN.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(1912), live0 = SHK.live;
var parts = [["bloomsbury", 0, 0, 320], ["queen", DLN_QS.x, DLN_QS.z, 140], ["lamb", DLN_LCS.x, -20, 200], ["north", 0, -150, 330], ["south", 0, 130, 330]];
var groups = {};
parts.forEach(function (p) { var g = new THREE.Group(); g.name = "dln-" + p[0]; SHK.G.add(g); groups[p[0]] = g; SHK.dist.push({ n: "dln-" + p[0], g: g, x: dlnX(p[1]), z: p[2], r: p[3] }); });
var all = new THREE.Group();
try {
dlnStreets(all, R);
}
catch (e) {
if (window.console)
console.warn("[darlings-london] streets", e);
}
try {
dlnFolk(R);
}
catch (e) {
if (window.console)
console.warn("[darlings-london] folk", e);
}
all.children.slice().forEach(function (m) {
var x = m.position.x - DLN_O.x, z = m.position.z, k = "bloomsbury";
if (x < DLN_QS.x + DLN_QS.hw + 12)
k = "queen";
else if (x > DLN_LCS.x - 14)
k = "lamb";
else if (z < -80)
k = "north";
else if (z > 80)
k = "south";
groups[k].add(m);
});
for (var k in groups) {
try {
ctnMerge(groups[k]);
groups[k].children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) {
if (window.console)
console.warn("[darlings-london] bake " + k, e);
}
}
SHK.live = live0;
DLN.built = true;
},
function (x, z) {
if (x < DLN_QS.x + DLN_QS.hw + 8)
return "Queen Square, Bloomsbury";
if (x > DLN_LCS.x - 10)
return "Lamb's Conduit Street, Bloomsbury";
if (z < -100)
return "Guilford Street, Bloomsbury";
if (z > 100)
return "Theobalds Road, Bloomsbury";
if (Math.abs(x) < DLN_GOSH.w / 2 && z < 0 && z > -30)
return "the Hospital for Sick Children, Great Ormond Street";
return "Great Ormond Street, Bloomsbury";
},
function (msg) {
dlnBuild();
var C = DLN_PLACES.cab;
shkMove(dlnX(C.x - 4), C.z + 0.5, shkYawTo(-1, 0), msg || "🎩 <b>London, 1912.</b> Great Ormond Street, Bloomsbury, on a summer afternoon. The big red building ahead on the right is the Hospital for Sick Children; Queen Square is at the far end of the street, Lamb's Conduit Street behind you.");
},
function () {
var b = worldBtn("hosp", "To the hospital's door", "A few yards up the street") + worldBtn("queen", "To Queen Square", "The garden at the west end") + worldBtn("lamb", "To Lamb's Conduit Street", "Shops, and the Lamb") +
worldBtn("back", "Back to Bankside, 1600", "\"Three hundred years upstream, guv'nor? That'll be extra.\"");
worldCard(worldFacts("🎩 A hansom cab", "Two wheels, one horse, and the cabman up behind", [], []) + b, {
hosp: function () { worldCard(null); shkMove(dlnX(0), DLN_GOSH.z + 6.5, Math.PI, "🏥 Before the Hospital for Sick Children. The porch is in front of you."); },
queen: function () { worldCard(null); shkMove(dlnX(DLN_QS.x + DLN_QS.hw + 6), DLN_QS.z + 4, shkYawTo(-1, 0), "🌳 <b>Queen Square.</b> Its railed garden and plane trees, and the old lead statue."); },
lamb: function () { worldCard(null); shkMove(dlnX(DLN_LCS.x), -30, 0, "🛍️ <b>Lamb's Conduit Street.</b> Shops all down both sides, and the Lamb."); },
back: function () { worldCard(null); dlnTo1600(); }
});
},
function () {
var u = dlnDonateUrl();
var notes = ["Great Ormond Street Hospital is still caring for children today: children from all over the country, many with the rarest and most difficult illnesses.", "It has always depended on gifts, great and small. Its charity helps pay for new equipment, research, and help for families staying with their children."];
var b = "";
if (u) {
b += "<div style='margin-top:8px'><a href='" + esc(u) + "' target='_blank' rel='noopener noreferrer' style='display:block;padding:9px 12px;border:1px solid #E8C870;border-radius:4px;background:rgba(232,200,112,.15);color:#FFE7B0;text-decoration:none;text-align:center;font-weight:600'>💛 Give to Great Ormond Street Hospital Charity</a></div>" +
"<div style='opacity:.75;font-size:12px;margin-top:6px'>This opens the hospital charity's own donation page in a new tab. Your gift goes straight to them. This game takes nothing, and is not connected with or endorsed by the hospital.</div>";
}
else
b += "<div style='opacity:.75;font-size:12px;margin-top:8px'>The way to give from here isn't open yet. You can always give through the hospital charity's own website.</div>";
worldCard(worldFacts("💛 Help the children of Great Ormond Street", "Then and now", [], notes) + b);
},
function () {
var show = function (paras) {
var html = "<div style='font:600 16px Georgia;color:#FFE7B0'>📖 Peter and Wendy</div><div style='opacity:.75;font-size:12px;margin-bottom:6px'>J. M. Barrie, 1911 · Nurse Price reads aloud</div>" +
"<div style='max-height:46vh;overflow:auto;font:14px/1.6 Georgia'>" + paras.map(function (p) { return "<p style='margin:0 0 9px'>" + esc(p) + "</p>"; }).join("") + "</div>";
var fns = {};
if (typeof nvbOpen === "function") {
html += worldBtn("nvb", "Read on in the Neverland book", "The whole of Peter and Wendy, walked through London and the Neverland");
fns.nvb = function () { worldCard(null); try {
nvbOpen();
}
catch (e) { } };
}
worldCard(html, fns);
};
if (DLN.pw)
return show(DLN.pw);
fetch("data/neverland/peter-and-wendy.json").then(function (r) { return r.json(); }).then(function (d) { var p = ((d.ch && d.ch[0] && d.ch[0].p) || []).slice(0, 5); DLN.pw = p; show(p); })
.catch(function () { show(["All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this."]); });
},
function () {
var C = DLN.candles;
if (!C)
return;
if (C.n >= 12) {
setStatus("🕯️ The stand is full of candles, all burning steadily. You stand a while with them.");
return;
}
var a = C.n / 12 * Math.PI * 2, r = 0.32, x = Math.cos(a) * r, z = Math.sin(a) * r;
dlnCyl(C.g, 0.02, 0.02, 0.18, dlnC(0xFAF6E8), x, 1.14, z, 6);
var fl = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 4), dlnGlow(0xFFD890));
fl.scale.y = 1.6;
fl.position.set(x, 1.27, z);
C.g.add(fl);
C.n++;
setStatus("🕯️ You light a candle, for all the children who have been cared for here, and all who are now. It burns steadily.");
},
function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0x4A4E58, { r: 0.95 });
var b = new THREE.Mesh(wfGeo("dlbon", function () { return new THREE.SphereGeometry(0.15, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.55); }), mt);
b.scale.set(1, 0.85, 1.12);
g.add(b);
var br = new THREE.Mesh(wfGeo("dlbonbr", function () { return new THREE.TorusGeometry(0.14, 0.03, 6, 20, Math.PI); }), mt);
br.rotation.set(-0.2, 0, 0);
br.position.set(0, 0.02, 0.04);
g.add(br);
var bw = new THREE.Mesh(wfGeo("dlbonbw", function () { return new THREE.BoxGeometry(0.1, 0.04, 0.02); }), wfMat(0xF4F2EE));
bw.position.set(0, -0.1, 0.13);
g.add(bw);
g.rotation.x = -0.15;
add("Head", [0, 0.1, -0.02], g);
},
function (add, c) {
var g = new THREE.Group(), mt = wfMat(c || 0x1E2A20, { r: 0.6 });
var t = new THREE.Mesh(wfGeo("dlpkt", function () { return new THREE.CylinderGeometry(0.135, 0.12, 0.09, 16); }), mt);
g.add(t);
var p = new THREE.Mesh(wfGeo("dlpkp", function () { return new THREE.CylinderGeometry(0.1, 0.1, 0.01, 12, 1, false, -Math.PI / 2, Math.PI); }), wfMat(0x0E0E0E, { r: 0.3 }));
p.position.set(0, -0.04, 0.08);
p.rotation.x = 0.15;
g.add(p);
var bd = new THREE.Mesh(wfGeo("dlpkb", function () { return new THREE.CylinderGeometry(0.122, 0.122, 0.025, 16); }), wfMat(0xC8A048, { m: 0.8, r: 0.35 }));
bd.position.y = -0.03;
g.add(bd);
add("Head", [0, 0.13, -0.01], g);
},
function (add) {
var g = new THREE.Group(), w = wfMat(0xF8F8FA, { r: 0.9 });
var t = new THREE.Mesh(wfGeo("dlsht", function () { return new THREE.CylinderGeometry(0.13, 0.12, 0.07, 18); }), w);
g.add(t);
var b = new THREE.Mesh(wfGeo("dlshb", function () { return new THREE.CylinderGeometry(0.17, 0.17, 0.012, 20); }), w);
b.position.y = -0.03;
g.add(b);
var bd = new THREE.Mesh(wfGeo("dlshd", function () { return new THREE.CylinderGeometry(0.122, 0.122, 0.025, 18); }), wfMat(0x1E2A5A));
bd.position.y = -0.015;
g.add(bd);
g.rotation.x = -0.25;
add("Head", [0, 0.15, -0.02], g);
},
function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(wfGeo("dlcrk", function () { return new THREE.CylinderGeometry(0.014, 0.016, 1.6, 6); }), wfMat(0x6A4A2A)));
var h = new THREE.Mesh(wfGeo("dlcrkh", function () { return new THREE.TorusGeometry(0.07, 0.013, 5, 12, Math.PI); }), wfMat(0x6A4A2A));
h.position.set(0.07, 0.8, 0);
g.add(h);
add("hand_r", [0, 0.3, 0.05], g);
},
function (add) {
var g = new THREE.Group(), cols = [0xD82A2A, 0x2A5AD8, 0xE8C82A, 0x2AA84A, 0xD86AB8, 0xF08A2A];
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2, b = new THREE.Mesh(wfGeo("dlbal", function () { return new THREE.SphereGeometry(0.16, 12, 10); }), wfMat(cols[i], { r: 0.3 }));
b.scale.y = 1.18;
b.position.set(Math.cos(a) * 0.22, 1.5 + (i % 2) * 0.22, Math.sin(a) * 0.22);
g.add(b);
var s = new THREE.Mesh(wfGeo("dlbals", function () { return new THREE.CylinderGeometry(0.002, 0.002, 1.5, 3); }), wfMat(0xE8E8E8));
s.position.set(Math.cos(a) * 0.11, 0.75, Math.sin(a) * 0.11);
s.rotation.z = -Math.cos(a) * 0.14;
s.rotation.x = Math.sin(a) * 0.14;
g.add(s);
}
add("hand_l", [0, 0, 0], g);
},
function () {
return dlnTex("water", 256, 256, function (x, W, H) {
var g = x.createLinearGradient(0, 0, W, H);
g.addColorStop(0, "#3A5A5E");
g.addColorStop(1, "#2A4A52");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
var R = wRand(77);
for (var i = 0; i < 260; i++) {
x.strokeStyle = "rgba(220,236,240," + (0.05 + R() * 0.12) + ")";
x.lineWidth = 1 + R();
var px = R() * W, py = R() * H, l = 8 + R() * 24;
x.beginPath();
x.moveTo(px, py);
x.quadraticCurveTo(px + l / 2, py - 2, px + l, py);
x.stroke();
}
}, 8, 8);
},
function () {
return dlnTex("meadow", 512, 512, function (x, W, H) {
x.fillStyle = "#5E7E3A";
x.fillRect(0, 0, W, H);
var R = wRand(41);
for (var i = 0; i < 9000; i++) {
var c = R();
x.fillStyle = c < 0.3 ? "rgba(40,70,20,.5)" : c < 0.6 ? "rgba(120,150,60,.45)" : c < 0.97 ? "rgba(80,110,40,.4)" : (R() < 0.5 ? "rgba(250,250,240,.9)" : "rgba(240,210,60,.9)");
x.fillRect(R() * W, R() * H, c > 0.97 ? 2.4 : 1.4, c > 0.97 ? 2.4 : 3 + R() * 3);
}
}, 6, 6);
},
function () {
return dlnTex("wren", 512, 512, function (x, W, H) {
dlnBricks(x, W, H, "#8A3A2A", "#A8503A", "#C8B8A0", 14, 61);
[0.14, 0.64].forEach(function (u) { var wx = u * W, wy = H * 0.18, ww = W * 0.22, wh = H * 0.56; x.fillStyle = "#C8603A"; x.fillRect(wx - 8, wy - 10, ww + 16, wh + 18); x.fillStyle = "#E8E0D0"; x.fillRect(wx - 4, wy - 4, ww + 8, wh + 8); dlnSash(x, wx, wy, ww, wh, 3, 4, "#F4F0E8"); });
}, 4, 4);
},
function () {
return dlnTex("kent", 1024, 512, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#8AA8C8");
g.addColorStop(0.6, "#C8C0A8");
g.addColorStop(1, "#A89878");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var c = 0; c < 5; c++) {
var cx = c * W / 4;
x.fillStyle = "#C8B890";
x.fillRect(cx - 14, 0, 28, H);
x.fillStyle = "rgba(0,0,0,.18)";
x.fillRect(cx + 8, 0, 6, H);
}
x.fillStyle = "#D8CCB0";
x.fillRect(0, H * 0.62, W, 14);
x.fillRect(0, H * 0.86, W, 16);
for (var b = 0; b < 64; b++) {
var bx = b * W / 64 + 4;
x.fillStyle = "#C8BC9C";
x.beginPath();
x.ellipse(bx + 4, H * 0.74, 4.5, H * 0.1, 0, 0, 7);
x.fill();
}
var R = wRand(1725), coats = ["#8A1A2A", "#2A3A6A", "#3A5A2A", "#6A4A2A", "#E8D8B8", "#4A2A5A"];
for (var p = 0; p < 14; p++) {
var px = 30 + p * (W - 60) / 13 + R() * 20, py = H * 0.36 + R() * 14;
x.fillStyle = coats[p % 6];
x.fillRect(px - 12, py, 24, H * 0.26);
x.fillStyle = "#E8C8A8";
x.beginPath();
x.arc(px, py - 8, 9, 0, 7);
x.fill();
x.fillStyle = R() < 0.6 ? "#E8E4DC" : "#5A3A22";
x.beginPath();
x.arc(px, py - 14, 10, Math.PI, 0);
x.fill();
}
x.font = "italic 15px Georgia";
x.fillStyle = "rgba(60,40,20,.75)";
x.fillText("the court of King George I, painted by William Kent", 20, H - 12);
}, 4, 2);
},
function () {
return dlnTex("cupola", 512, 512, function (x, W, H) {
x.fillStyle = "#2A3A7A";
x.fillRect(0, 0, W, H);
for (var r = 0; r < 8; r++)
for (var c = 0; c < 8; c++) {
var px = c * W / 8, py = r * H / 8;
x.fillStyle = "#1E2A62";
x.fillRect(px + 6, py + 6, W / 8 - 12, H / 8 - 12);
x.strokeStyle = "#D8B048";
x.lineWidth = 3;
x.strokeRect(px + 6, py + 6, W / 8 - 12, H / 8 - 12);
x.fillStyle = "#E8C860";
x.beginPath();
x.arc(px + W / 16, py + H / 16, 7, 0, 7);
x.fill();
}
}, 2, 2);
},
function () {
return dlnTex("damask", 256, 256, function (x, W, H) {
x.fillStyle = "#8A2A2E";
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(200,120,110,.35)";
for (var r = 0; r < 4; r++)
for (var c = 0; c < 4; c++) {
var px = c * 64 + 32 + (r % 2) * 32, py = r * 64 + 32;
x.beginPath();
x.ellipse(px, py, 14, 22, 0, 0, 7);
x.fill();
x.beginPath();
x.ellipse(px, py - 26, 6, 8, 0, 0, 7);
x.fill();
}
}, 1.2, 1.2);
},
function () {
return dlnTex("nurserypaper", 256, 256, function (x, W, H) {
x.fillStyle = "#EAE2D2";
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(140,170,200,.5)";
for (var r = 0; r < 6; r++)
for (var c = 0; c < 6; c++) {
var px = c * 44 + (r % 2) * 22, py = r * 44;
x.beginPath();
x.arc(px + 10, py + 10, 4, 0, 7);
x.fill();
x.fillStyle = "rgba(200,140,150,.5)";
x.beginPath();
x.arc(px + 28, py + 26, 3, 0, 7);
x.fill();
x.fillStyle = "rgba(140,170,200,.5)";
}
}, 1, 1);
},
function () {
return dlnTex("veined", 256, 256, function (x, W, H) {
x.fillStyle = "#EEEAE2";
x.fillRect(0, 0, W, H);
dlnNoise(x, W, H, 700, 0.06, 3);
var r = wRand(37);
x.lineWidth = 1;
for (var v = 0; v < 9; v++) {
x.strokeStyle = "rgba(120,118,124," + (0.12 + r() * 0.18) + ")";
x.beginPath();
var px = r() * W, py = r() * H;
x.moveTo(px, py);
for (var k = 0; k < 7; k++) {
px += (r() - 0.5) * 70;
py += r() * 50;
x.lineTo(px, py);
}
x.stroke();
}
});
},
function () {
return dlnTex("ivy", 256, 256, function (x, W, H) {
x.fillStyle = "#2E4A22";
x.fillRect(0, 0, W, H);
var R = wRand(61);
for (var i = 0; i < 900; i++) {
x.fillStyle = R() < 0.5 ? "rgba(70,110,50,.8)" : "rgba(40,70,30,.8)";
var px = R() * W, py = R() * H;
x.beginPath();
x.moveTo(px, py - 5);
x.lineTo(px + 5, py);
x.lineTo(px, py + 5);
x.lineTo(px - 5, py);
x.fill();
}
for (var j = 0; j < 40; j++) {
x.fillStyle = ["#E8D040", "#F4F0F0", "#C8A0E8", "#E86A8A"][j % 4];
x.beginPath();
x.arc(R() * W, R() * H, 2.5, 0, 7);
x.fill();
}
}, 2, 2);
},
function (P, x, z, R, h) {
h = h || (17 + R() * 5);
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = R() * 6.28;
P.add(g);
var bark = dlnS("planebark", 0x8A8478), lv = kgnLeafMats(), lite = DLN.lite;
dlnCyl(g, 0.36, 0.56, h * 0.5, bark, 0, h * 0.25, 0, lite ? 6 : 9);
var n = lite ? 4 : 7;
for (var k = 0; k < n; k++) {
var a = k / n * Math.PI * 2 + R() * 0.5, up = h * (0.45 + R() * 0.4), out = 2.2 + R() * 2.6, r = 2.4 + R() * 1.6;
var arm = dlnCyl(g, 0.12, 0.22, Math.hypot(out, up - h * 0.4), bark, Math.cos(a) * out / 2, h * 0.4 + (up - h * 0.4) / 2, Math.sin(a) * out / 2, lite ? 4 : 6);
arm.rotation.z = -Math.cos(a) * Math.atan2(out, up - h * 0.4);
arm.rotation.x = Math.sin(a) * Math.atan2(out, up - h * 0.4);
var m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, lite ? 0 : 1), lv[(k) % 3]);
m.position.set(Math.cos(a) * out, up + r * 0.3, Math.sin(a) * out);
m.scale.set(1.1, 0.9, 1.1);
g.add(m);
}
var top = new THREE.Mesh(new THREE.IcosahedronGeometry(3.2, lite ? 0 : 1), lv[1]);
top.position.y = h * 0.95;
top.scale.set(1.2, 1, 1.2);
g.add(top);
shkSolid({ x: x, z: z, r: 0.7 });
return g;
},
function (P, x, z, R, h, first) {
h = h || (11 + R() * 3);
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
var bark = dlnS("planebark", 0x6A6458), lv = kgnLeafMats(), lite = DLN.lite, cand = dlnC(0xF8F4EC), pink = dlnC(0xF4D8D8);
dlnCyl(g, 0.32, 0.5, h * 0.36, bark, 0, h * 0.18, 0, lite ? 6 : 8);
var dome = new THREE.Mesh(new THREE.SphereGeometry(h * 0.42, lite ? 8 : 14, lite ? 6 : 10), lv[(R() * 3) | 0]);
dome.position.y = h * 0.62;
dome.scale.set(1.05, 0.82, 1.05);
g.add(dome);
var n = lite ? 8 : (first ? 42 : 26);
for (var i = 0; i < n; i++) {
var a = R() * Math.PI * 2, el = R() * 1.2 - 0.15, rr = h * 0.42;
var c = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.55, 5), R() < 0.8 ? cand : pink);
c.position.set(Math.cos(a) * Math.cos(el) * rr * 1.05, h * 0.62 + Math.sin(el) * rr * 0.82, Math.sin(a) * Math.cos(el) * rr * 1.05);
g.add(c);
}
shkSolid({ x: x, z: z, r: 0.6 });
return g;
},
function (P, x, z, R, h) {
h = h || (13 + R() * 3);
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
var lite = DLN.lite;
dlnCyl(g, 0.26, 0.4, h * 0.4, dlnS("planebark", 0x7A7468), 0, h * 0.2, 0, lite ? 6 : 8);
for (var k = 0; k < (lite ? 2 : 4); k++) {
var m = new THREE.Mesh(new THREE.IcosahedronGeometry(h * 0.24 - k * 0.4, lite ? 0 : 1), kgnLeafMats()[k % 3]);
m.position.y = h * 0.45 + k * h * 0.15;
m.scale.set(1, 1.2, 1);
g.add(m);
}
shkSolid({ x: x, z: z, r: 0.5 });
return g;
},
function (P, x, z, R) {
var g = new THREE.Group();
g.position.set(x, 0, z);
P.add(g);
var lite = DLN.lite, bark = dlnC(0x7A7A74), lv = [dlnS("leaves", 0xC89A6A), dlnS("leaves", 0xA87A5A), dlnS("leaves", 0xD8B888)];
dlnCyl(g, 0.4, 0.6, 6, bark, 0, 3, 0, 8);
var n = lite ? 10 : 22;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, r = 4.6 + R() * 1.2;
var arm = dlnCyl(g, 0.06, 0.14, r, bark, Math.cos(a) * r / 2, 6.6, Math.sin(a) * r / 2, 4);
arm.rotation.z = -Math.cos(a) * 1.3;
arm.rotation.x = Math.sin(a) * 1.3;
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.4, 6.2, lite ? 5 : 7, 1, true), lv[i % 3]);
c.material.side = THREE.DoubleSide;
c.position.set(Math.cos(a) * (r + 0.3), 3.5, Math.sin(a) * (r + 0.3));
g.add(c);
}
var top = new THREE.Mesh(new THREE.SphereGeometry(4.2, lite ? 8 : 14, lite ? 6 : 10), lv[0]);
top.position.y = 7.4;
top.scale.set(1.4, 0.7, 1.4);
g.add(top);
shkSolid({ x: x, z: z, r: 0.7 });
return g;
},
function (P, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var wood = dlnC(0x2E4A2E), iron = dlnShine(0x1A1A1A, 0.6, 0.5);
for (var i = 0; i < 4; i++)
dlnBox(g, 1.9, 0.04, 0.09, wood, 0, 0.46, -0.18 + i * 0.11);
for (var j = 0; j < 3; j++) {
var b = dlnBox(g, 1.9, 0.09, 0.03, wood, 0, 0.62 + j * 0.13, -0.28);
b.rotation.x = -0.15;
}
[-0.85, 0.85].forEach(function (k) { dlnBox(g, 0.05, 0.46, 0.5, iron, k, 0.23, -0.05); dlnBox(g, 0.05, 0.5, 0.05, iron, k, 0.7, -0.3); });
shkSolidBox(x, z, 1.9, 0.6, ry || 0, 0.9);
return g;
},
function (col) {
var g = new THREE.Group(), b = dlnC(col || 0x8A6A4A), w = dlnC(0x2A6A3A);
var body = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 6), b);
body.scale.set(1, 0.62, 1.5);
body.position.y = 0.06;
g.add(body);
var h = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 6), col ? b : w);
h.position.set(0, 0.2, 0.19);
g.add(h);
var bk = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.09, 5), dlnC(0xE8B040));
bk.rotation.x = Math.PI / 2;
bk.position.set(0, 0.19, 0.29);
g.add(bk);
var t = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.12, 5), b);
t.rotation.x = -1.9;
t.position.set(0, 0.12, -0.25);
g.add(t);
g.userData.keep = 1;
return g;
},
function () {
var g = new THREE.Group(), w = dlnC(0xF8F8F4);
var body = new THREE.Mesh(new THREE.SphereGeometry(0.36, 10, 8), w);
body.scale.set(1, 0.6, 1.6);
body.position.y = 0.12;
g.add(body);
var n = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 6, 12, Math.PI * 0.75), w);
n.rotation.y = Math.PI / 2;
n.position.set(0, 0.42, 0.28);
g.add(n);
var h = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), w);
h.position.set(0, 0.66, 0.44);
g.add(h);
var bk = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.14, 5), dlnC(0xE87A2A));
bk.rotation.x = Math.PI / 2;
bk.position.set(0, 0.64, 0.55);
g.add(bk);
[-1, 1].forEach(function (k) { var wg = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), w); wg.scale.set(0.35, 0.5, 1.2); wg.position.set(k * 0.22, 0.26, -0.08); g.add(wg); });
g.userData.keep = 1;
return g;
},
function (col, size) {
var s = size || 1, g = new THREE.Group(), b = dlnC(col || 0x7A5A3A);
var body = new THREE.Mesh(new THREE.SphereGeometry(0.07 * s, 7, 5), b);
body.scale.set(1, 0.9, 1.4);
g.add(body);
var h = new THREE.Mesh(new THREE.SphereGeometry(0.045 * s, 7, 5), b);
h.position.set(0, 0.06 * s, 0.08 * s);
g.add(h);
var bk = new THREE.Mesh(new THREE.ConeGeometry(0.015 * s, 0.05 * s, 4), dlnC(0xD8A830));
bk.rotation.x = Math.PI / 2;
bk.position.set(0, 0.055 * s, 0.13 * s);
g.add(bk);
var t = dlnBox(g, 0.06 * s, 0.01 * s, 0.1 * s, b, 0, 0.01 * s, -0.11 * s);
t.rotation.x = 0.4;
var wl = new THREE.Group(), wr = new THREE.Group();
[wl, wr].forEach(function (W, k) { var m = dlnBox(W, 0.13 * s, 0.01 * s, 0.07 * s, b, (k ? 1 : -1) * 0.065 * s, 0, 0); W.position.set((k ? 1 : -1) * 0.04 * s, 0.02 * s, 0); g.add(W); });
g.userData.wings = [wl, wr];
g.userData.keep = 1;
return g;
},
function (R, shorn) {
var g = new THREE.Group(), wool = dlnC(shorn ? 0xF0EEE6 : 0xD8D2C0), face = dlnC(0x2A2420);
var b = new THREE.Mesh(new THREE.SphereGeometry(shorn ? 0.42 : 0.55, 10, 8), wool);
b.scale.set(1, 0.8, 1.45);
b.position.y = 0.8;
g.add(b);
var h = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 6), face);
h.scale.set(0.8, 0.9, 1.3);
h.position.set(0, 0.95, 0.72);
g.add(h);
[[-0.2, -0.4], [0.2, -0.4], [-0.2, 0.4], [0.2, 0.4]].forEach(function (l) { dlnCyl(g, 0.04, 0.035, 0.55, face, l[0], 0.28, l[1], 5); });
g.rotation.y = R ? R() * 6.28 : 0;
return g;
},
function () {
var g = new THREE.Group(), w = dlnC(0xF2EEE6), br = dlnC(0x9A5A2A);
var b = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.0, 10), br);
b.rotation.x = Math.PI / 2;
b.position.y = 0.7;
g.add(b);
var c = new THREE.Mesh(new THREE.SphereGeometry(0.33, 10, 8), w);
c.position.set(0, 0.72, 0.45);
g.add(c);
var h = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8), br);
h.position.set(0, 1.05, 0.68);
g.add(h);
var mz = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), w);
mz.position.set(0, 0.98, 0.86);
g.add(mz);
[[-0.18, -0.35], [0.18, -0.35], [-0.18, 0.35], [0.18, 0.35]].forEach(function (l) { dlnCyl(g, 0.08, 0.07, 0.5, w, l[0], 0.25, l[1], 6); });
var t = dlnCyl(g, 0.05, 0.08, 0.5, br, 0, 0.75, -0.7, 5);
t.rotation.x = -0.8;
return g;
},
function () {
var g = new THREE.Group(), c = dlnC(0xE8E2D4), d = dlnC(0x5A4A3A);
var b = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.85, 10), c);
b.rotation.x = Math.PI / 2;
b.position.y = 0.7;
g.add(b);
[-0.42, 0.42].forEach(function (e) { var s = new THREE.Mesh(new THREE.SphereGeometry(0.26, 8, 6), c); s.position.set(0, 0.7, e); g.add(s); });
var h = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 6), c);
h.scale.set(0.8, 0.9, 1.4);
h.position.set(0, 1.05, 0.65);
g.add(h);
[-1, 1].forEach(function (k) { var hr = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.25, 5), d); hr.position.set(k * 0.07, 1.24, 0.58); hr.rotation.x = -0.6; g.add(hr); });
var be = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.14, 5), c);
be.rotation.x = Math.PI;
be.position.set(0, 0.88, 0.82);
g.add(be);
[[-0.14, -0.35], [0.14, -0.35], [-0.14, 0.35], [0.14, 0.35]].forEach(function (l) { dlnCyl(g, 0.035, 0.03, 0.5, c, l[0], 0.25, l[1], 5); });
return g;
},
function (col) {
var g = new THREE.Group(), hull = dlnShine(col || 0xF4F2EC, 0.4, 0.1);
var h = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), hull);
h.scale.set(0.45, 0.5, 1.6);
g.add(h);
dlnBox(g, 0.26, 0.02, 0.9, dlnC(0xC8A878), 0, 0.0, 0);
dlnCyl(g, 0.008, 0.01, 1.1, dlnC(0x6A4A2A), 0, 0.55, 0.05, 5);
var s = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.9), dlnC(0xF8F4EA));
s.material.side = THREE.DoubleSide;
s.rotation.y = Math.PI / 2;
s.position.set(0, 0.55, -0.16);
g.add(s);
var j = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.6), dlnC(0xF8F4EA));
j.material.side = THREE.DoubleSide;
j.rotation.y = Math.PI / 2;
j.position.set(0, 0.4, 0.25);
g.add(j);
g.userData.keep = 1;
return g;
},
function (sail) {
var g = new THREE.Group(), out = dlnS("leaves", 0x7A9A5A), mud = dlnC(0x5A4028), twig = dlnC(0x6A5030);
var b = new THREE.Mesh(new THREE.SphereGeometry(0.85, 14, 8, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55), out);
b.material.side = THREE.DoubleSide;
b.scale.set(1, 0.7, 1.15);
g.add(b);
var inn = new THREE.Mesh(new THREE.SphereGeometry(0.78, 14, 8, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5), mud);
inn.material.side = THREE.DoubleSide;
inn.scale.set(1, 0.62, 1.12);
inn.position.y = 0.02;
g.add(inn);
var rim = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.12, 6, 24), twig);
rim.rotation.x = Math.PI / 2;
rim.scale.set(1, 1.15, 1);
rim.position.y = 0.02;
g.add(rim);
for (var i = 0; i < 14; i++) {
var a = i / 14 * Math.PI * 2, t = dlnBox(g, 0.03, 0.03, 0.5, twig, Math.cos(a) * 0.84, 0.04, Math.sin(a) * 0.96);
t.rotation.y = a + 0.8;
}
if (sail) {
dlnCyl(g, 0.02, 0.025, 1.8, dlnC(0x8A6A4A), 0, 0.9, 0.1, 5);
var s = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.1), dlnC(0xF8F6F0));
s.material.side = THREE.DoubleSide;
s.position.set(0, 1.1, -0.05);
g.add(s);
[-1, 1].forEach(function (k) { var sl = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.18), dlnC(0xF8F6F0)); sl.material.side = THREE.DoubleSide; sl.position.set(k * 0.55, 1.42, -0.05); g.add(sl); });
}
g.userData.keep = 1;
return g;
},
function (x, z) {
var P = KGN_POND;
if (Math.hypot(x - P.x, z - P.z) < P.r - 0.6)
return true;
if (x > KGN_LW.x0 + 0.6 && x < KGN_LW.x1 - 0.6 && z > KGN_LW.z0 + 0.6 && z < KGN_BR.z0)
return true;
if (z >= KGN_BR.z0 && z <= KGN_BR.z1 && x > KGN_LW.x0 && x < KGN_LW.x1)
return false;
return kgnInSerp(x, z, 0.6);
},
function (P) {
var X = kgX, W = KGN_R.hw * 2 + 40, D = KGN_R.hd * 2 + 40;
dlnPlane(P, W, D, dlnS("meadow", 0xFFFFFF), X(0), 0.0, 0);
var gravel = dlnS("gravel", 0xFFFFFF), sand = dlnS("sand", 0xFFFFFF);
dlnPlane(P, KGN_BW.hw * 2, KGN_BW.z1 - KGN_BW.z0, gravel, X(KGN_BW.x), 0.03, (KGN_BW.z0 + KGN_BW.z1) / 2);
var ways = [[-192, -200, "n"], [-192, 0, "w"], [-192, 150, "sw"], [0, -262, "nn"], [150, -262, "ne"], [250, -100, "e"], [250, 100, "se"], [40, 180, "s"]];
ways.forEach(function (w, i) {
var tx = w[0], tz = w[1], dx = tx - KGN_POND.x, dz = tz - KGN_POND.z, L = Math.hypot(dx, dz) - KGN_POND.r - 3, a = Math.atan2(dx, dz);
var cx = KGN_POND.x + Math.sin(a) * (KGN_POND.r + 3 + L / 2), cz = KGN_POND.z + Math.cos(a) * (KGN_POND.r + 3 + L / 2);
dlnPlane(P, 4, L, gravel, X(cx), 0.025, cz, a);
});
dlnPlane(P, 390, 4.5, gravel, X(5), 0.025, 180);
dlnPlane(P, 4.5, 170, gravel, X(-150), 0.025, -150);
dlnPlane(P, 4, 60, gravel, X(236), 0.025, -240 + 60 / 2 + 150);
dlnPlane(P, 4, KGN_LW.z1 - KGN_LW.z0, gravel, X(KGN_LW.x0 - 6), 0.025, (KGN_LW.z0 + KGN_LW.z1) / 2);
var R = wRand(19021);
for (var p = 0; p < (DLN.lite ? 3 : 6); p++) {
var x0 = -120 + R() * 280, z0 = -230 + R() * 120 * (p % 2 ? 1 : -1) + 120, x1 = KGN_POND.x + (R() - 0.5) * 20, z1 = KGN_POND.z + (z0 < 0 ? -KGN_POND.r - 2 : KGN_POND.r + 2);
var n = 8;
for (var s = 0; s < n; s++) {
var u0 = s / n, u1 = (s + 1) / n, ax = x0 + (x1 - x0) * u0 + (R() - 0.5) * 6, az = z0 + (z1 - z0) * u0, bx = x0 + (x1 - x0) * u1, bz = z0 + (z1 - z0) * u1;
var L2 = Math.hypot(bx - ax, bz - az);
dlnPlane(P, 0.6 + R() * 2.2, L2 + 0.6, sand, X((ax + bx) / 2), 0.02 + p * 0.0005, (az + bz) / 2, Math.atan2(bx - ax, bz - az));
}
}
shkFloor(X(0), 0, KGN_R.hw + 30, KGN_R.hd + 30, 0);
},
function (P) {
var X = kgX, wm = kgnWaterMat(), kerb = dlnS("stone", 0xD8D0C0);
var c = new THREE.Mesh(new THREE.CircleGeometry(KGN_POND.r, DLN.lite ? 32 : 64), wm);
c.rotation.x = -Math.PI / 2;
c.position.set(X(KGN_POND.x), 0.05, KGN_POND.z);
c.userData.keep = 1;
KGN.live.add(c);
var k = new THREE.Mesh(new THREE.TorusGeometry(KGN_POND.r, 0.3, 4, DLN.lite ? 48 : 96), kerb);
k.rotation.x = Math.PI / 2;
k.position.set(X(KGN_POND.x), 0.12, KGN_POND.z);
k.scale.z = 0.6;
P.add(k);
var lw = new THREE.Mesh(new THREE.PlaneGeometry(KGN_LW.x1 - KGN_LW.x0, KGN_BR.z1 - KGN_LW.z0), wm);
lw.rotation.x = -Math.PI / 2;
lw.position.set(X((KGN_LW.x0 + KGN_LW.x1) / 2), 0.05, (KGN_LW.z0 + KGN_BR.z1) / 2);
lw.userData.keep = 1;
KGN.live.add(lw);
[KGN_LW.x0, KGN_LW.x1].forEach(function (x) { dlnBox(P, 0.5, 0.3, KGN_LW.z1 - KGN_LW.z0, kerb, X(x), 0.12, (KGN_LW.z0 + KGN_LW.z1) / 2); });
dlnBox(P, KGN_LW.x1 - KGN_LW.x0, 0.3, 0.5, kerb, X((KGN_LW.x0 + KGN_LW.x1) / 2), 0.12, KGN_LW.z0);
var sh = new THREE.Shape();
KGN_SERP_PTS.forEach(function (p, i) { if (i)
sh.lineTo(p[0], p[1]);
else
sh.moveTo(p[0], p[1]); });
var sg = new THREE.ShapeGeometry(sh);
sg.rotateX(Math.PI / 2);
var pos = sg.attributes.position, uv = sg.attributes.uv;
for (var i = 0; i < pos.count; i++) {
uv.setXY(i, pos.getX(i) / 8, pos.getZ(i) / 8);
}
var sm = new THREE.Mesh(sg, wm);
sm.material.side = THREE.DoubleSide;
sm.position.set(X(0), 0.05, 0);
sm.userData.keep = 1;
KGN.live.add(sm);
var I = KGN_ISLE, mound = new THREE.Mesh(new THREE.SphereGeometry(I.r, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), dlnS("meadow", 0xC8D8B8));
mound.scale.y = 0.16;
mound.position.set(X(I.x), 0, I.z);
P.add(mound);
var R = wRand(1902);
for (var t = 0; t < (DLN.lite ? 3 : 6); t++) {
var a = t / 6 * Math.PI * 2 + 0.3;
kgnLime(P, X(I.x + Math.cos(a) * I.r * 0.5), I.z + Math.sin(a) * I.r * 0.5, R, 8 + R() * 3);
}
for (var s = 0; s < (DLN.lite ? 10 : 22); s++) {
var a2 = s / 22 * Math.PI * 2, sx = X(I.x + Math.cos(a2) * (I.r + 2.5)), sz = I.z + Math.sin(a2) * (I.r + 2.5);
dlnCyl(P, 0.07, 0.09, 1.4, dlnC(0x5A4A38), sx, 0.6, sz, 5);
if (s % 2 === 0) {
var b = kgnBird([0x3A3A3A, 0x7A5A3A, 0x5A6A7A, 0x1A1A1A][s % 4], 1.4);
b.position.set(sx, 1.4, sz);
b.rotation.y = -a2 + Math.PI / 2;
KGN.live.add(b);
KGN.birds.push({ g: b, perch: 1, t: R() * 6 });
}
}
shkFloor(X(I.x), I.z, I.r * 0.8, I.r * 0.8, 0.6);
shkSpot(X(I.x - I.r * 0.6), I.z - 2, 3, "The island's shore", "fly back across (as the birds do)", function () { shkMove(X(KGN_LW.x0 - 4), 112, null, "🕊️ You remember being a bird, just for a moment, and are across the water by the bridge."); }, 0.6);
var D = KGN.ducks;
for (var d = 0; d < (DLN.lite ? 8 : 18); d++) {
var dk = d % 5 === 0 ? kgnSwan() : kgnDuck(d % 3 === 0 ? 0x6A5A4A : null);
var onPond = d < (DLN.lite ? 5 : 11);
var st = { g: dk, a: R() * 6.28, r: onPond ? 8 + R() * (KGN_POND.r - 14) : 0, pond: onPond, sp: 0.05 + R() * 0.06, z: onPond ? 0 : KGN_LW.z0 + 20 + R() * (KGN_LW.z1 - KGN_LW.z0 - 40), x: onPond ? 0 : (KGN_LW.x0 + KGN_LW.x1) / 2 + (R() - 0.5) * 20 };
dk.position.y = 0.06;
KGN.live.add(dk);
D.push(st);
}
for (var y = 0; y < (DLN.lite ? 2 : 5); y++) {
var yc = kgnYacht([0xF4F2EC, 0x2A3A6A, 0x8A2A2A, 0x2A5A3A, 0xE8D8A8][y]);
yc.position.y = 0.08;
KGN.live.add(yc);
KGN.boats.push({ g: yc, a: R() * 6.28, r: 18 + R() * 28, sp: (R() < 0.5 ? -1 : 1) * (0.025 + R() * 0.02) });
}
},
function (P) {
var X = kgX, setts = dlnS("setts", 0xFFFFFF), flags = dlnS("flags", 0xFFFFFF);
dlnPlane(P, KGN_R.hw * 2 + 40, 16, setts, X(0), 0.04, -280);
dlnPlane(P, KGN_R.hw * 2 + 40, 6, flags, X(0), 0.06, -268.5);
dlnPlane(P, KGN_R.hw * 2 + 40, 16, setts, X(0), 0.04, 272);
dlnPlane(P, KGN_R.hw * 2 + 40, 6, flags, X(0), 0.06, 261);
var stucco = dlnS("georgian", 0xF4F0E6);
var RT = wRand(1851), slate = dlnS("slate", 0x8A8E96), coping = dlnC(0xB8B2A4), chim = dlnS("stock", 0xC8A888), pot = dlnC(0x9A5A3A);
[[-292.5, -1, "georgian", [0xF4F0E6, 0xEDE6D6, 0xF0EAE0, 0xE6DED0]], [292.5, 1, "georgian", [0xC88A6A, 0xB87A5E, 0xD09A7A, 0xA86A52]]].forEach(function (side) {
var fz = side[0], dir = side[1];
for (var bx = -KGN_R.hw - 20; bx < KGN_R.hw + 20;) {
var w = 12 + Math.floor(RT() * 4) * 4, h = 14 + Math.floor(RT() * 4) * 2, col = side[3][Math.floor(RT() * 4)], d = 12, cz = fz + dir * d / 2, cx = X(bx + w / 2);
var face = dlnS(side[2], col);
dlnBox(P, w - 0.2, h, d, face, cx, h / 2, cz);
dlnBox(P, w + 0.4, 0.5, 0.9, coping, cx, h - 0.6, fz - dir * 0.3);
dlnBox(P, w, 1.0, 0.4, coping, cx, h + 0.5, fz + dir * 0.1);
dlnGable(P, w - 0.4, d - 1.5, 2.6, slate, cx, h, cz, 0);
for (var c = 0; c < 2; c++) {
var chx = cx + (c ? 1 : -1) * (w / 2 - 1.2);
dlnBox(P, 1.4, 3.2, 0.9, chim, chx, h + 2.6, cz);
for (var q = 0; q < 3; q++)
dlnCyl(P, 0.13, 0.15, 0.6, pot, chx - 0.4 + q * 0.4, h + 4.4, cz, 6);
}
if (dir < 0) {
for (var dp = 0; dp < w / 6; dp++) {
var dx = cx - w / 2 + 3 + dp * 6;
dlnBox(P, 1.8, 0.25, 1.6, coping, dx, 3.6, fz + 0.9);
dlnCyl(P, 0.14, 0.14, 3.4, coping, dx - 0.7, 1.7, fz + 1.4, 8);
dlnCyl(P, 0.14, 0.14, 3.4, coping, dx + 0.7, 1.7, fz + 1.4, 8);
}
}
bx += w + (RT() < 0.15 ? 5 : 0);
}
});
var gN = [KGN_BW.x - 10, KGN_BW.x + 10], gS = [KGN_BW.x - 6, KGN_BW.x + 6];
dlnRail(P, X(-KGN_R.hw), KGN_N, X(gN[0]), KGN_N, 1.9);
dlnRail(P, X(gN[1]), KGN_N, X(KGN_R.hw), KGN_N, 1.9);
dlnRail(P, X(-KGN_R.hw), KGN_S, X(gS[0]), KGN_S, 1.9);
dlnRail(P, X(gS[1]), KGN_S, X(KGN_LW.x0 - 2), KGN_S, 1.9);
for (var x = -KGN_R.hw; x < KGN_R.hw; x += 4) {
if (x > gN[0] - 2 && x < gN[1] + 2)
continue;
shkSolidBox(X(x + 2), KGN_N, 4, 0.4, 0, 2);
}
for (var x2 = -KGN_R.hw; x2 < KGN_LW.x0 - 2; x2 += 4) {
if (x2 > gS[0] - 2 && x2 < gS[1] + 2)
continue;
shkSolidBox(X(x2 + 2), KGN_S, 4, 0.4, 0, 2);
}
var pier = function (x, z, lion) {
dlnBox(P, 1.3, 3.8, 1.3, dlnS("stone", 0xE0D8C8), X(x), 1.9, z);
dlnBox(P, 1.6, 0.3, 1.6, dlnS("stone", 0xD0C8B8), X(x), 3.95, z);
if (lion) {
var l = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 8), dlnShine(0x1A1A1A, 0.4, 0.6));
l.scale.set(0.8, 0.9, 1.4);
l.position.set(X(x), 4.5, z);
P.add(l);
var h = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), dlnShine(0x1A1A1A, 0.4, 0.6));
h.position.set(X(x), 4.85, z + 0.4);
P.add(h);
}
else {
var u = dlnCyl(P, 0.32, 0.22, 0.7, dlnS("stone", 0xE0D8C8), X(x), 4.45, z, 10);
}
shkSolidBox(X(x), z, 1.4, 1.4, 0, 4);
};
pier(gN[0], KGN_N, 1);
pier(gN[1], KGN_N, 1);
pier(gS[0], KGN_S, 0);
pier(gS[1], KGN_S, 0);
[[gN[0] + 0.7, -1], [gN[1] - 0.7, 1]].forEach(function (g) { var gg = new THREE.Group(); gg.position.set(X(g[0]), 0, KGN_N - 0.2); gg.rotation.y = g[1] * 1.45; P.add(gg); dlnRail(gg, 0, 0, g[1] * -8.6, 0, 3); });
KGN.gateN = [X(gN[0]), X(gN[1])];
var bd = dlnPanel(["The Gardens", "close at", "7 o'clock", "this evening", "By Order"], "KENSINGTON GARDENS", 1.4, 1.9, "#1E2A1E", "#F0E8D0");
bd.position.set(X(gN[1] + 3), 1.9, KGN_N + 0.4);
P.add(bd);
KGN.board = bd;
dlnCyl(P, 0.06, 0.06, 1.0, dlnC(0x1E2A1E), X(gN[1] + 3), 0.5, KGN_N + 0.35, 5);
shkSpot(X(gN[1] + 3), KGN_N + 2, 2.6, "The board at the gate", "read it", function () { kgnBoardCard(); });
var hs = new THREE.Group();
P.add(hs);
dlnHansom(hs, X(KGN_CAB.x), KGN_CAB.z + 1.2, Math.PI / 2);
shkSpot(X(KGN_CAB.x - 3), KGN_CAB.z + 3.6, 3.4, "The cab rank, Bayswater Road", "take a cab", function () { kgnCabCard(); });
for (var lx = -KGN_R.hw + 20; lx < KGN_R.hw; lx += 42) {
dlnLamp(P, X(lx), -266);
dlnLamp(P, X(lx), 259);
}
},
function (horse) {
var g = new THREE.Group(), red = dlnShine(0xA8201E, 0.45, 0.2), cream = dlnC(0xF0E6CC), dark = dlnC(0x1A1A1E), glass = dlnGlow(0x9AAAB4), wood = dlnC(0x6A4A2A);
var L = horse ? 5.2 : 6.4, bW = 2.2;
dlnBox(g, bW, 1.8, L, red, 0, 1.65, 0);
dlnBox(g, bW + 0.04, 0.7, L - 0.6, glass, 0, 1.9, -0.1);
dlnBox(g, bW + 0.06, 0.22, L + 0.04, cream, 0, 2.62, 0);
dlnBox(g, bW, 0.06, L, dark, 0, 2.76, 0);
dlnBox(g, 0.5, 0.45, L - 1, wood, 0, 3.0, 0);
[-1, 1].forEach(function (k) { dlnBox(g, 0.04, 0.7, L, dark, k * bW / 2, 3.1, 0); var ad = dlnPanel(["", ""], horse ? "BOVRIL" : "GENERAL", L - 0.4, 0.62, "#E8C840", "#8A1A1A"); ad.position.set(k * (bW / 2 + 0.02), 2.3, 0); ad.rotation.y = k * Math.PI / 2; g.add(ad); });
var st = dlnCyl(g, 0.5, 0.5, 1.6, dark, 0, 2.2, -L / 2 - 0.35, 8, true);
st.material = dlnShine(0x1A1A1E, 0.6, 0.4);
[-1, 1].forEach(function (k) { [L / 2 - 1, -L / 2 + 1].forEach(function (z) { var w = new THREE.Mesh(new THREE.CylinderGeometry(horse ? 0.55 : 0.5, horse ? 0.55 : 0.5, 0.18, 14), dark); w.rotation.z = Math.PI / 2; w.position.set(k * (bW / 2 + 0.05), horse ? 0.55 : 0.5, z); g.add(w); }); });
if (horse) {
[-0.5, 0.5].forEach(function (k) {
var hc = dlnC(k < 0 ? 0x5A3A22 : 0x3A2418), b = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 1.3, 10), hc);
b.rotation.x = Math.PI / 2;
b.position.set(k, 1.4, L / 2 + 2.2);
g.add(b);
var nk = dlnCyl(g, 0.15, 0.22, 0.8, hc, k, 1.85, L / 2 + 2.95, 8);
nk.rotation.x = 0.7;
var hd = dlnBox(g, 0.22, 0.26, 0.55, hc, k, 2.15, L / 2 + 3.3);
hd.rotation.x = 0.5;
[[-0.2, -0.45], [0.2, -0.45], [-0.2, 0.45], [0.2, 0.45]].forEach(function (l) { dlnCyl(g, 0.06, 0.05, 1.0, hc, k + l[0], 0.5, L / 2 + 2.2 + l[1], 5); });
});
}
else {
dlnBox(g, 1.8, 1.1, 1.4, red, 0, 1.1, L / 2 + 0.7);
dlnBox(g, 1.4, 0.5, 0.05, dlnC(0x2A2A2A), 0, 1.2, L / 2 + 1.41);
dlnBox(g, bW, 0.9, 0.1, glass, 0, 2.1, L / 2 - 0.05);
}
g.userData.keep = 1;
return g;
},
function () {
var R = wRand(1912 * 3), n = DLN.lite ? 3 : 7;
for (var i = 0; i < n; i++) {
var horse = i % 3 === 2, b = kgnBus(horse), north = i % 2 === 0;
b.position.set(kgX(-KGN_R.hw + R() * KGN_R.hw * 2), 0, north ? (i % 4 === 0 ? -283 : -277) : (i % 4 === 1 ? 269 : 275));
b.rotation.y = north ? (i % 4 === 0 ? Math.PI / 2 : -Math.PI / 2) : (i % 4 === 1 ? Math.PI / 2 : -Math.PI / 2);
KGN.live.add(b);
KGN.buses.push({ g: b, sp: (b.rotation.y > 0 ? 1 : -1) * (horse ? 3.2 : 5.4) });
}
for (var c = 0; c < (DLN.lite ? 1 : 3); c++) {
var hs = new THREE.Group();
dlnHansom(hs, 0, 0, 0);
hs.children.forEach(function (m) { m.userData.keep = 1; });
hs.userData.keep = 1;
hs.position.set(kgX(-200 + c * 160), 0, c % 2 ? -279 : 273);
hs.rotation.y = c % 2 ? -Math.PI / 2 : Math.PI / 2;
KGN.live.add(hs);
KGN.buses.push({ g: hs, sp: (c % 2 ? -1 : 1) * 2.6 });
}
},
function (P) {
var X = kgX, K = KGN_PAL, x0 = K.x - K.w / 2, x1 = K.x + K.w / 2, z0 = K.z - K.d / 2, z1 = K.z + K.d / 2, H = 14;
var brick = dlnS("wren", 0xFFFFFF), plain = dlnS("redbrick", 0xFFFFFF), stone = dlnS("stone", 0xE8E0D0), lead = dlnS("slate", 0x8A8E94);
dlnFace(P, K.d, H, brick, X(x1), H / 2, K.z, Math.PI / 2);
dlnFace(P, K.w, H, brick, X(K.x), H / 2, z1);
dlnFace(P, K.w, H, plain, X(K.x), H / 2, z0);
dlnFace(P, K.d, H, plain, X(x0), H / 2, K.z, Math.PI / 2);
dlnBox(P, K.w - 0.6, H - 0.4, K.d - 0.6, dlnC(0x7A3A2A), X(K.x), H / 2, K.z);
[[X(x1) + 0.2, K.z, 0.2, K.d + 0.6], [X(K.x), z1 + 0.2, K.w + 0.6, 0.2]].forEach(function (b) { [0.2, 4.6, 9.2].forEach(function (y) { dlnBox(P, b[2], 0.35, b[3], stone, b[0], y, b[1]); }); dlnBox(P, b[2] + 0.6, 0.7, b[3] + 0.6, stone, b[0], H + 0.35, b[1]); });
[[x1, z1], [x1, z0], [x0, z1]].forEach(function (c) { for (var y = 0.4; y < H; y += 0.9)
dlnBox(P, 1.0, 0.42, 1.0, stone, X(c[0]), y, c[1]); });
for (var z = z0 + 1; z < z1; z += 1.4)
dlnBox(P, 0.4, 1.0, 0.22, stone, X(x1) + 0.35, H + 1.2, z);
dlnBox(P, 0.5, 0.3, K.d, stone, X(x1) + 0.35, H + 1.85, K.z);
for (var x = x0 + 1; x < x1; x += 1.4)
dlnBox(P, 0.22, 1.0, 0.4, stone, X(x), H + 1.2, z1 + 0.35);
dlnBox(P, K.w, 0.3, 0.5, stone, X(K.x), H + 1.85, z1 + 0.35);
dlnFace(P, 18, 4, brick, X(K.x), H + 2.2, z1 - 0.4);
dlnBox(P, 18.6, 0.6, 0.8, stone, X(K.x), H + 4.4, z1 - 0.4);
[-7.5, -2.5, 2.5, 7.5].forEach(function (o) { dlnCyl(P, 0.5, 0.3, 1.4, stone, X(K.x + o), H + 5.4, z1 - 0.4, 10); var lid = new THREE.Mesh(new THREE.SphereGeometry(0.4, 10, 8), stone); lid.position.set(X(K.x + o), H + 6.3, z1 - 0.4); P.add(lid); });
dlnBox(P, 0.6, 5.2, 4.6, stone, X(x1) + 0.5, 2.6, K.z);
dlnBox(P, 0.62, 3.2, 2.2, dlnC(0x2A1A10), X(x1) + 0.55, 1.6, K.z);
var ped = dlnGable(P, 0.9, 5.2, 1.3, stone, X(x1) + 0.5, 5.2, K.z, Math.PI / 2);
for (var s = 0; s < 3; s++)
dlnBox(P, 1.2 - s * 0.3, 0.18, 6, stone, X(x1) + 1.0 + 0.6 - s * 0.3, 0.09 + s * 0.18, K.z);
shkDoor("kgn_stair", X(x1) + 2.2, K.z, "Kensington Palace: the State Apartments");
dlnBox(P, K.w - 2, 2, K.d - 2, lead, X(K.x), H + 1, K.z);
for (var c = 0; c < 8; c++) {
var cx = x0 + 4 + (c % 4) * (K.w - 8) / 3, cz = c < 4 ? z0 + 6 : z1 - 8;
dlnBox(P, 1.6, 3.4, 0.9, plain, X(cx), H + 3.2, cz);
dlnBox(P, 1.9, 0.3, 1.2, stone, X(cx), H + 5, cz);
}
var tx = X(K.x - 6), tz = z0 + 12;
dlnBox(P, 5, 6, 5, plain, tx, H + 3, tz);
dlnBox(P, 5.6, 0.5, 5.6, stone, tx, H + 6.2, tz);
var cup = dlnCyl(P, 1.6, 2.0, 3, dlnC(0xF0ECE0), tx, H + 8, tz, 8);
var dome = new THREE.Mesh(new THREE.SphereGeometry(1.7, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), dlnShine(0x5A7A6A, 0.5, 0.4));
dome.position.set(tx, H + 9.5, tz);
P.add(dome);
var face = new THREE.Mesh(new THREE.CircleGeometry(1.4, 24), dlnS("stars", 0x1A2A5A));
face.position.set(tx + 2.52, H + 3.6, tz);
face.rotation.y = Math.PI / 2;
P.add(face);
dlnCyl(P, 0.03, 0.03, 1.0, dlnShine(0xD8B048, 0.3, 0.9), tx + 2.55, H + 3.9, tz, 4);
shkSolidBox(X(K.x), K.z, K.w + 1, K.d + 1, 0, 20);
dlnRail(P, X(x1 + 3), z0 - 4, X(x1 + 3), K.z - 4, 1.4);
dlnRail(P, X(x1 + 3), K.z + 4, X(x1 + 3), z1 + 4, 1.4);
var sx = X(x1 + 12.5), sz = K.z, marble = dlnS("veined", 0xF4F2EE);
dlnBox(P, 4.4, 0.5, 4.4, stone, sx, 0.25, sz);
dlnBox(P, 2.8, 2.6, 2.8, stone, sx, 1.8, sz);
dlnBox(P, 3.2, 0.4, 3.2, stone, sx, 3.3, sz);
var robe = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.95, 0), new THREE.Vector2(0.9, 0.6), new THREE.Vector2(0.62, 1.6), new THREE.Vector2(0.4, 2.3), new THREE.Vector2(0.34, 2.6), new THREE.Vector2(0.18, 2.75)], 16), marble);
robe.position.set(sx, 3.5, sz);
P.add(robe);
var tr = dlnBox(P, 1.6, 0.3, 1.6, marble, sx - 0.6, 3.65, sz);
tr.rotation.y = 0.3;
var head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 10), marble);
head.position.set(sx, 6.45, sz);
P.add(head);
var crown = dlnCyl(P, 0.17, 0.2, 0.2, marble, sx, 6.7, sz, 10);
var sc = dlnCyl(P, 0.03, 0.03, 1.1, marble, sx + 0.42, 5.6, sz + 0.25, 6);
sc.rotation.z = 0.2;
[-1, 1].forEach(function (k) { var a = dlnCyl(P, 0.09, 0.12, 0.9, marble, sx + k * 0.42, 5.45, sz + 0.1, 8); a.rotation.z = k * 0.25; });
var pl = dlnPanel(["VICTORIA", "born in this palace", "24 May 1819", "by her daughter, Princess Louise"], "QUEEN", 1.4, 1.0, "#E8E0D0", "#3A3020");
pl.position.set(sx + 1.42, 1.9, sz);
pl.rotation.y = Math.PI / 2;
P.add(pl);
shkSolidBox(sx, sz, 4.4, 4.4, 0, 6);
shkSpot(sx + 3, sz, 3.5, "The Big Penny (the Queen's statue)", "look", function () { kgnTale("👑 The Big Penny and the Baby's Palace", KGN_TALES.penny, ["Kensington Palace: Queen Victoria was born here on 24 May 1819, and lived here until she was Queen. On 20 June 1837 she was woken early in the morning and told that the King was dead and she was Queen.", "The marble statue of her in her coronation robes was made by her daughter, Princess Louise, and put up in 1893."]); });
var gx = X(K.x + 4), gz = z0 - 34;
dlnPlane(P, 30, 18, dlnS("lawn", 0xFFFFFF), gx, 0.035, gz);
var pool = new THREE.Mesh(new THREE.PlaneGeometry(16, 6), kgnWaterMat());
pool.rotation.x = -Math.PI / 2;
pool.position.set(gx, 0.06, gz);
pool.userData.keep = 1;
KGN.live.add(pool);
dlnBox(P, 16.6, 0.4, 0.3, stone, gx, 0.2, gz - 3.15);
dlnBox(P, 16.6, 0.4, 0.3, stone, gx, 0.2, gz + 3.15);
dlnBox(P, 0.3, 0.4, 6.6, stone, gx - 8.15, 0.2, gz);
dlnBox(P, 0.3, 0.4, 6.6, stone, gx + 8.15, 0.2, gz);
shkSolidBox(gx, gz, 16.6, 6.6, 0, 0.5);
kgnFlowerBed(P, gx, gz - 6, 26, 1.6, 7);
kgnFlowerBed(P, gx, gz + 6, 26, 1.6, 8);
},
function (P, x, z, w, d, seed, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
dlnBox(g, w, 0.12, d, dlnC(0x4A3424), 0, 0.06, 0);
var R = wRand(seed || 5), cols = [0xE82A3A, 0xF4E040, 0xF4F0F0, 0x9A6AD8, 0xE87AB0, 0xF08A2A, 0x4A6AE8], n = Math.round(w * d * (DLN.lite ? 1.2 : 3.2));
var stem = dlnC(0x3A6A2A);
for (var i = 0; i < n; i++) {
var px = (R() - 0.5) * (w - 0.3), pz = (R() - 0.5) * (d - 0.3), h = 0.25 + R() * 0.25;
dlnBox(g, 0.025, h, 0.025, stem, px, 0.12 + h / 2, pz);
var f = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.11, 5), dlnC(cols[(R() * cols.length) | 0]));
f.rotation.x = Math.PI;
f.position.set(px, 0.12 + h + 0.04, pz);
g.add(f);
}
return g;
},
function (P) {
var X = kgX, cx = X(60), cz = 218, granite = dlnS("stone", 0xB8B0A8), red = dlnC(0x8A4A44), marble = dlnS("veined", 0xF4F2EC), gilt = dlnShine(0xD8B040, 0.28, 0.95), mosaic = dlnS("mosaic", 0xFFFFFF);
for (var s = 0; s < 8; s++) {
var w = 44 - s * 2.2;
dlnBox(P, w, 0.35, w, granite, cx, 0.175 + s * 0.35, cz);
shkFloor(cx, cz, w / 2, w / 2, (s + 1) * 0.35);
}
var top = 8 * 0.35;
dlnBox(P, 22, 3, 22, dlnS("veined", 0xEAE6DE), cx, top + 1.5, cz);
var fr = DLN_CANVAS.kent ? dlnS("kent", 0xF4F2EE) : marble;
[[0, 11.05, 0], [0, -11.05, Math.PI], [11.05, 0, Math.PI / 2], [-11.05, 0, -Math.PI / 2]].forEach(function (f) { var m = dlnBox(P, 21.4, 2.2, 0.12, fr, cx + f[0], top + 1.5, cz + f[1], f[2]); });
dlnBox(P, 22.6, 0.4, 22.6, granite, cx, top + 3.2, cz);
shkSolidBox(cx, cz, 22.4, 22.4, 0, top + 3.4);
[[-17, -17], [17, -17], [-17, 17], [17, 17]].forEach(function (c, i) {
var gx = cx + c[0], gz = cz + c[1];
dlnBox(P, 6, 1.6, 6, granite, gx, top - 1.6 + 0.8 + 0.35, gz);
var beast = new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 10), marble);
beast.scale.set(1, 0.9, 1.6);
beast.position.set(gx, top + 1.2, gz);
P.add(beast);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.7, 10, 8), marble);
hd.position.set(gx + (c[0] > 0 ? 0.6 : -0.6), top + 2.2, gz + (c[1] > 0 ? 2 : -2));
P.add(hd);
for (var f = 0; f < 4; f++) {
var a = f / 4 * Math.PI * 2 + 0.4, fx = gx + Math.cos(a) * 1.9, fz = gz + Math.sin(a) * 1.9;
var b = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.4, 0), new THREE.Vector2(0.32, 1.1), new THREE.Vector2(0.18, 1.5)], 10), marble);
b.position.set(fx, top, fz);
P.add(b);
var h = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), marble);
h.position.set(fx, top + 1.68, fz);
P.add(h);
}
shkSolidBox(gx, gz, 6, 6, 0, 3);
});
var cy = top + 3.4, H = 10;
[[-5, -5], [5, -5], [-5, 5], [5, 5]].forEach(function (c) {
for (var k = 0; k < 4; k++) {
var ox = (k % 2 ? 0.45 : -0.45), oz = (k < 2 ? 0.45 : -0.45);
dlnCyl(P, 0.32, 0.34, H, red, cx + c[0] + ox, cy + H / 2, cz + c[1] + oz, 10);
}
dlnBox(P, 2, 0.8, 2, gilt, cx + c[0], cy + H + 0.4, cz + c[1]);
var pin = new THREE.Mesh(new THREE.ConeGeometry(0.5, 4, 8), gilt);
pin.position.set(cx + c[0] * 1.05, cy + H + 8, cz + c[1] * 1.05);
P.add(pin);
});
[[0, -5.4, 0], [0, 5.4, Math.PI], [5.4, 0, -Math.PI / 2], [-5.4, 0, Math.PI / 2]].forEach(function (f) {
var g = new THREE.Group();
g.position.set(cx + f[0], cy + H, cz + f[1]);
g.rotation.y = f[2];
P.add(g);
dlnBox(g, 11.6, 1.2, 0.8, dlnS("veined", 0xEAE2D2), 0, 0.6, 0);
var tri = new THREE.Shape();
tri.moveTo(-5.6, 0);
tri.lineTo(0, 5.6);
tri.lineTo(5.6, 0);
tri.lineTo(-5.6, 0);
var tg = new THREE.ShapeGeometry(tri), tm = new THREE.Mesh(tg, mosaic);
tm.material.side = THREE.DoubleSide;
tm.position.set(0, 1.2, 0.42);
g.add(tm);
var arch = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.32, 6, 20, Math.PI), dlnS("veined", 0xEAE2D2));
arch.position.set(0, -3.4, 0.1);
g.add(arch);
[-1, 1].forEach(function (k) { var e = dlnBox(g, 0.4, 0.4, 7.9, gilt, k * 2.8, 4.0, 0.3); e.rotation.x = Math.PI / 2; e.rotation.y = k * 0.78; });
});
var sy = cy + H + 6;
dlnBox(P, 9, 2, 9, dlnS("veined", 0xEAE2D2), cx, sy, cz);
for (var t = 0; t < 4; t++) {
var r = 3.8 - t * 0.85, h = 4.5 - t * 0.6, y = sy + 1 + t * 4.6;
dlnCyl(P, r * 0.75, r, h, t % 2 ? gilt : dlnS("slate", 0x4A4E5A), cx, y + h / 2, cz, 8);
for (var a = 0; a < 8; a++) {
var ang = a / 8 * Math.PI * 2, f = new THREE.Mesh(new THREE.ConeGeometry(0.28, 1.3, 6), gilt);
f.position.set(cx + Math.cos(ang) * r * 0.95, y + 0.7, cz + Math.sin(ang) * r * 0.95);
P.add(f);
var hh = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), gilt);
hh.position.set(f.position.x, y + 1.48, f.position.z);
P.add(hh);
}
}
var spire = new THREE.Mesh(new THREE.ConeGeometry(0.9, 7, 8), gilt);
spire.position.set(cx, sy + 1 + 4 * 4.6 + 3.5, cz);
P.add(spire);
dlnBox(P, 0.25, 2.4, 0.25, gilt, cx, sy + 1 + 4 * 4.6 + 8, cz);
dlnBox(P, 1.3, 0.25, 0.25, gilt, cx, sy + 1 + 4 * 4.6 + 8.4, cz);
var px = cx, pz = cz, py = cy;
dlnBox(P, 3.2, 1.6, 3.2, granite, px, py + 0.8, pz);
var body = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(1.3, 0), new THREE.Vector2(1.25, 0.7), new THREE.Vector2(0.95, 1.5), new THREE.Vector2(0.7, 2.8), new THREE.Vector2(0.55, 3.4), new THREE.Vector2(0.2, 3.6)], 16), gilt);
body.position.set(px, py + 1.6, pz);
P.add(body);
var knees = dlnBox(P, 1.8, 0.7, 1.4, gilt, px, py + 2.6, pz + 0.9);
var head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 14, 10), gilt);
head.position.set(px, py + 5.5, pz + 0.1);
P.add(head);
var bk = dlnBox(P, 0.7, 0.1, 0.5, gilt, px + 0.4, py + 3.1, pz + 1.3);
bk.rotation.x = -0.6;
shkSpot(cx, cz + 24, 5, "The Albert Memorial", "look", function () { kgnTale("✨ The Albert Memorial", "The memorial to Prince Albert, Queen Victoria's husband, who died in 1861: by Sir George Gilbert Scott, finished in 1872, the Prince's statue put in place in 1875.", ["Under the canopy the Prince sits holding the catalogue of the Great Exhibition of 1851, which he did so much to bring about, in Hyde Park just across the road.", "Round the podium runs a frieze of 169 painters, poets, architects, sculptors and musicians of the world; at the corners of the steps are the four parts of the world, and higher up, groups for Agriculture, Manufactures, Commerce and Engineering.", "In 1912 the Prince is gilt all over, so he shines in the sun."]); });
},
function (P, R) {
var X = kgX, stone = dlnS("stone", 0xC4BEB2), marble = dlnS("veined", 0xDCD8D0);
var ix = X(268), iz = -246;
dlnPlane(P, 72, 30, dlnS("flags", 0xFFFFFF), ix, 0.035, iz);
[[-24, -6], [-8, -6], [8, -6], [24, -6], [-24, 6], [-8, 6], [8, 6], [24, 6]].forEach(function (b, i) {
if (i % 4 === 1 || i % 4 === 2) {
if (i > 3)
return;
}
var bx = ix + b[0], bz = iz + b[1];
dlnBox(P, 12, 0.6, 8, stone, bx, 0.3, bz);
var w = new THREE.Mesh(new THREE.PlaneGeometry(11, 7), kgnWaterMat());
w.rotation.x = -Math.PI / 2;
w.position.set(bx, 0.62, bz);
w.userData.keep = 1;
KGN.live.add(w);
var jet = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.18, 3, 8, 1, true), new THREE.MeshBasicMaterial({ color: 0xE0ECF0, transparent: true, opacity: 0.55, depthWrite: false }));
jet.position.set(bx, 2.1, bz);
jet.userData.keep = 1;
KGN.live.add(jet);
KGN.fount.push(jet);
shkSolidBox(bx, bz, 12, 8, 0, 0.7);
for (var u = 0; u < 4; u++) {
var ux = bx + (u % 2 ? 5.5 : -5.5), uz = bz + (u < 2 ? 3.5 : -3.5);
dlnCyl(P, 0.35, 0.22, 0.8, marble, ux, 1.0, uz, 10);
}
});
var rb = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 0.6, 24), stone);
rb.position.set(ix, 0.3, iz);
P.add(rb);
var rw = new THREE.Mesh(new THREE.CircleGeometry(4.6, 24), kgnWaterMat());
rw.rotation.x = -Math.PI / 2;
rw.position.set(ix, 0.62, iz);
rw.userData.keep = 1;
KGN.live.add(rw);
dlnCyl(P, 0.5, 0.9, 2.4, marble, ix, 1.6, iz, 12);
var bowl = dlnCyl(P, 1.6, 0.6, 0.5, marble, ix, 3.0, iz, 14);
shkSolid({ x: ix, z: iz, r: 5.2 });
for (var bx2 = -34; bx2 <= 34; bx2 += 1.2) {
dlnCyl(P, 0.1, 0.13, 0.8, stone, ix + bx2, 0.4, iz - 15, 6);
}
dlnBox(P, 70, 0.2, 0.5, stone, ix, 0.9, iz - 15);
shkSolidBox(ix, iz - 15, 70, 0.6, 0, 1);
var ax = X(222), az = -246;
dlnFace(P, 8, 6, dlnS("redbrick", 0xFFFFFF), ax - 4.2, 3, az, Math.PI / 2);
dlnFace(P, 8, 6, dlnS("redbrick", 0xFFFFFF), ax, 3, az - 4.2);
dlnFace(P, 8, 6, dlnS("redbrick", 0xFFFFFF), ax, 3, az + 4.2);
var half = new THREE.Mesh(new THREE.SphereGeometry(3.6, 16, 8, 0, Math.PI, 0, Math.PI / 2), dlnS("stone", 0xE8E0D0));
half.rotation.y = -Math.PI / 2;
half.position.set(ax - 4, 6, az);
P.add(half);
dlnBox(P, 0.8, 0.5, 7, dlnC(0x6A4A2A), ax - 3.5, 0.45, az);
dlnGable(P, 9.4, 9.4, 2.2, dlnS("stone", 0xE8E0D0), ax, 6, az, Math.PI / 2);
shkSolidBox(ax - 4.3, az, 0.6, 8.4, 0, 6);
shkSolidBox(ax, az - 4.3, 8.4, 0.6, 0, 6);
shkSolidBox(ax, az + 4.3, 8.4, 0.6, 0, 6);
var sx = X(KGN_LW.x0 - 11), sz = -52, bronze = dlnShine(0x6A5A3A, 0.45, 0.7), green = dlnShine(0x5A7A62, 0.5, 0.6);
dlnBox(P, 3.6, 0.5, 3.6, stone, sx, 0.25, sz);
var stump = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(1.5, 0), new THREE.Vector2(1.25, 0.6), new THREE.Vector2(1.0, 1.6), new THREE.Vector2(0.9, 2.4), new THREE.Vector2(0.95, 2.9), new THREE.Vector2(0.8, 3.1), new THREE.Vector2(0, 3.15)], 16), bronze);
stump.position.set(sx, 0.5, sz);
P.add(stump);
for (var f = 0; f < (DLN.lite ? 8 : 18); f++) {
var a = f * 2.4, h = 0.7 + f * 0.13, r = 1.45 - h * 0.18;
var fg = new THREE.Group();
fg.position.set(sx + Math.cos(a) * r, 0.5 + h, sz + Math.sin(a) * r);
fg.rotation.y = -a;
P.add(fg);
if (f % 3 === 0) {
var bod = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 6), f % 2 ? green : bronze);
bod.scale.set(1, 0.8, 1.3);
fg.add(bod);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), bronze);
hd.position.set(0, 0.12, 0.14);
fg.add(hd);
[-1, 1].forEach(function (k) { var e = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.16, 4), bronze); e.position.set(k * 0.04, 0.24, 0.12); fg.add(e); });
}
else {
var gown = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.4, 8), f % 2 ? green : bronze);
gown.position.y = 0.05;
fg.add(gown);
var hh = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), bronze);
hh.position.y = 0.3;
fg.add(hh);
[-1, 1].forEach(function (k) { var wg = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.3), bronze); wg.material = bronze; wg.position.set(k * 0.13, 0.18, -0.05); wg.rotation.y = k * 0.7; fg.add(wg); });
}
}
var py = 0.5 + 3.15, pg = new THREE.Group();
pg.position.set(sx, py, sz);
pg.rotation.y = -Math.PI / 2;
P.add(pg);
var gown2 = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.34, 0), new THREE.Vector2(0.3, 0.25), new THREE.Vector2(0.22, 0.7), new THREE.Vector2(0.18, 0.95), new THREE.Vector2(0.08, 1.02)], 12), bronze);
pg.add(gown2);
[-1, 1].forEach(function (k) { dlnCyl(pg, 0.05, 0.045, 0.35, bronze, k * 0.09, -0.1, 0.06, 6); });
var ph = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), bronze);
ph.position.y = 1.15;
pg.add(ph);
var hair = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), bronze);
hair.position.y = 1.17;
pg.add(hair);
var arm = dlnCyl(pg, 0.04, 0.045, 0.42, bronze, 0.18, 1.0, 0.12, 6);
arm.rotation.x = -1.0;
arm.rotation.z = 0.3;
var arm2 = dlnCyl(pg, 0.04, 0.045, 0.42, bronze, -0.2, 0.85, 0.02, 6);
arm2.rotation.z = -0.5;
for (var pp = 0; pp < 6; pp++) {
dlnCyl(pg, 0.012, 0.012, 0.12 - pp * 0.012, bronze, 0.04 + pp * 0.022, 1.08, 0.17, 4);
}
shkSolidBox(sx, sz, 3.6, 3.6, 0, 4);
var pl = dlnPanel(["by Sir George Frampton", "1912"], "PETER PAN", 0.9, 0.5, "#5A5040", "#E8E0C8");
pl.position.set(sx + 1.82, 0.35, sz);
pl.rotation.y = Math.PI / 2;
P.add(pl);
shkSpot(sx + 2.6, sz, 3.2, "The Peter Pan statue", "look", function () { kgnTale("🌿 The Peter Pan statue", "By Sir George Frampton. It was put up by the Long Water in the night of 30 April 1912, so that the children found it there on May morning, as if by magic, just where Peter landed in the book.", ["Peter stands on a tree-stump playing his pipe, and all up the stump fairies, rabbits, squirrels and mice are climbing to listen.", "J. M. Barrie paid for it himself, and chose the spot."]); });
kgnChestnut(P, X(KGN_LW.x0 - 14), 104, R, 13, true);
shkSpot(X(KGN_LW.x0 - 10), 104, 4, "The chestnut-tree near the bridge", "look", function () { kgnTale("🌸 The chestnut-tree near the bridge", KGN_TALES.chestnut, []); });
var bz = (KGN_BR.z0 + KGN_BR.z1) / 2, bx0 = KGN_LW.x0 - 14, bx1 = KGN_LW.x1 + 14, by = 4.2;
dlnBox(P, bx1 - bx0, 0.6, KGN_BR.z1 - KGN_BR.z0, stone, X((bx0 + bx1) / 2), by - 0.3, bz);
dlnPlane(P, bx1 - bx0, KGN_BR.z1 - KGN_BR.z0 - 1, dlnS("gravel", 0x9A9284), X((bx0 + bx1) / 2), by + 0.02, bz);
for (var a2 = 0; a2 < 5; a2++) {
var ax2 = KGN_LW.x0 + 3.5 + a2 * 7;
var arc = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.8, KGN_BR.z1 - KGN_BR.z0 + 0.2, 14, 1, true, Math.PI / 2, Math.PI), dlnC(0x2A3438));
arc.material.side = THREE.DoubleSide;
arc.rotation.x = Math.PI / 2;
arc.rotation.z = Math.PI / 2;
arc.scale.set(1, 1, 0.9);
arc.position.set(X(ax2), 1.2, bz);
P.add(arc);
if (a2 < 4) {
dlnBox(P, 1.2, by - 0.6, KGN_BR.z1 - KGN_BR.z0, stone, X(ax2 + 3.5), (by - 0.6) / 2, bz);
}
}
[KGN_BR.z0, KGN_BR.z1].forEach(function (z) {
dlnFace(P, KGN_LW.x1 - KGN_LW.x0, by - 0.6, stone, X((KGN_LW.x0 + KGN_LW.x1) / 2), (by - 0.6) / 2, z + (z === KGN_BR.z0 ? 0.15 : -0.15));
for (var bb = bx0; bb <= bx1; bb += 0.7)
dlnCyl(P, 0.09, 0.12, 0.9, stone, X(bb), by + 0.45, z, 6);
dlnBox(P, bx1 - bx0, 0.18, 0.4, stone, X((bx0 + bx1) / 2), by + 0.95, z);
shkSolidBox(X((bx0 + bx1) / 2), z, bx1 - bx0, 0.4, 0, by + 1.2);
});
for (var s = 0; s < 12; s++) {
var u = (s + 1) / 12, y = by * u;
shkFloor(X(bx0 - 13 + s + 0.5), bz, 0.5, (KGN_BR.z1 - KGN_BR.z0) / 2 - 0.5, y);
shkFloor(X(bx1 + 13 - s - 0.5), bz, 0.5, (KGN_BR.z1 - KGN_BR.z0) / 2 - 0.5, y);
}
shkFloor(X((bx0 + bx1) / 2), bz, (bx1 - bx0) / 2, (KGN_BR.z1 - KGN_BR.z0) / 2 - 0.5, by);
[-1, 1].forEach(function (k) { var rx = k < 0 ? bx0 - 6.5 : bx1 + 6.5, rm = dlnBox(P, 13.2, 0.3, KGN_BR.z1 - KGN_BR.z0, stone, X(rx), by / 2 - 0.1, bz); rm.rotation.z = k * Math.atan2(by, 13); });
for (var t = 0; t < (DLN.lite ? 6 : 14); t++)
kgnElm(P, X(300 + R() * 40), -230 + t * (340 / 14), R, 14 + R() * 4);
var dx = X(322), dz = -252;
dlnRail(P, dx - 6, dz - 5, dx + 6, dz - 5, 0.8);
dlnRail(P, dx - 6, dz + 5, dx + 6, dz + 5, 0.8);
dlnRail(P, dx - 6, dz - 5, dx - 6, dz + 5, 0.8);
dlnRail(P, dx + 6, dz - 5, dx + 6, dz + 5, 0.8);
for (var gv = 0; gv < (DLN.lite ? 6 : 14); gv++) {
var gx = dx - 4.5 + (gv % 5) * 2.2, gz = dz - 3.5 + Math.floor(gv / 5) * 3;
dlnBox(P, 0.6, 0.5 + ((gv * 7) % 4) * 0.08, 0.12, stone, gx, 0.3, gz);
dlnBox(P, 0.5, 0.06, 1.0, dlnC(0x4A6A3A), gx, 0.05, gz + 0.6);
}
shkSolidBox(dx, dz, 12, 10, 0, 1);
shkSpot(dx, dz + 7, 4, "The Dogs' Cemetery", "look", function () { kgnTale("🐕 The Dogs' Cemetery", KGN_TALES.dogs, ["A little cemetery by Victoria Gate where the gate-keeper buried the dogs of families who lived nearby, from 1881: each with its own small stone."]); });
var bush = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 1), dlnS("leaves", 0x9AB88A));
bush.position.set(X(300), 1.1, -214);
bush.scale.set(1.3, 0.8, 1.1);
P.add(bush);
var nest = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.05, 6, 12), dlnC(0xF2EEE6));
nest.rotation.x = Math.PI / 2;
nest.position.set(X(300.8), 1.45, -213.2);
P.add(nest);
shkSolid({ x: X(300), z: -214, r: 1.6 });
shkSpot(X(301.8), -212, 2.6, "The chaffinch's nest", "peep in", function () { kgnTale("🐦 The chaffinch's nest", "\"The nest is very sad. It is quite white, and the way we found it was wonderful ... instead of the ball we found a lovely nest made of the worsted, and containing four eggs ... But one day when we went, there were only two eggs in the nest, and the next time there were none.\"", ["It is empty now. A chaffinch flutters in the next bush and looks at you, and you leave her in peace."]); });
kgnBench(P, X(KGN_LW.x0 - 8.4), -190, Math.PI / 2);
kgnBench(P, X(KGN_LW.x0 - 8.4), -170, Math.PI / 2);
[[0, "W. St. M."], [1.1, "P. P. 1841"]].forEach(function (st) { dlnBox(P, 0.35, 0.42, 0.18, stone, X(205 + st[0]), 0.21, 40); });
shkSpot(X(205.5), 41.4, 2.2, "Two little stones", "look", function () { kgnTale("🪨 Two little stones", KGN_TALES.stones, []); });
},
function (P, R) {
var X = kgX, stone = dlnS("stone", 0xE0D8C8), wood = dlnC(0x6A4A30), green = dlnC(0x2E4A2E);
for (var z = KGN_BW.z0 + 10; z < KGN_BW.z1 - 6; z += DLN.lite ? 28 : 14) {
[-1, 1].forEach(function (k) { if (Math.abs(z - KGN_PAL.z) < 40 && k < 0)
return; kgnElm(P, X(KGN_BW.x + k * (KGN_BW.hw + 3.5)), z + (k > 0 ? 7 : 0), R); });
}
var cx = KGN_BW.x - (KGN_BW.hw + 3.5), cz = -192;
var hole = new THREE.Mesh(new THREE.CircleGeometry(0.9, 14), dlnC(0x4A3424));
hole.rotation.x = -Math.PI / 2;
hole.position.set(X(cx + 1.4), 0.04, cz + 0.8);
P.add(hole);
for (var d = 0; d < 5; d++) {
var m = new THREE.Mesh(new THREE.SphereGeometry(0.22, 6, 4), dlnC(0x5A4430));
m.scale.y = 0.4;
m.position.set(X(cx + 0.5 + Math.cos(d) * 1.5), 0.04, cz + 0.8 + Math.sin(d) * 1.5);
P.add(m);
}
shkSpot(X(cx + 1.6), cz + 0.8, 2.4, "Cecco's Tree", "dig for a penny", function () { kgnCecco(); });
kgnHut(P, KGN_BW.x + KGN_BW.hw + 3.6, -150, -Math.PI / 2, "kgn_marm", "Marmaduke Perry's little wooden house");
kgnHut(P, KGN_BW.x + KGN_BW.hw + 3.6, 150, -Math.PI / 2, "kgn_lost", "The Lost House");
var ls = dlnPanel(["Children who are lost", "should tell the keeper here"], "LOST HOUSE", 1.2, 0.6, "#1E3A26", "#F0E8D0");
ls.position.set(X(KGN_BW.x + KGN_BW.hw + 1.9), 2.6, 150);
ls.rotation.y = -Math.PI / 2;
P.add(ls);
var hump = new THREE.Mesh(new THREE.SphereGeometry(60, 24, 8, 0, Math.PI * 2, 0, 0.2), dlnS("gravel", 0xF0E8DC));
hump.scale.set(KGN_BW.hw / 60 * 1.1, 1.6, 1);
hump.position.set(X(KGN_BW.x), -94, 150);
hump.scale.y = 1;
for (var hs = 0; hs < 16; hs++) {
var u = hs / 15, hz = 110 + u * 80, hy = 0.06 + Math.sin(u * Math.PI) * 0.9;
shkFloor(X(KGN_BW.x), hz, KGN_BW.hw, 2.6, hy);
var seg = dlnPlane(P, KGN_BW.hw * 2, 5.4, dlnS("gravel", 0xFFFFFF), X(KGN_BW.x), hy, hz);
}
[110, 190].forEach(function (z, i) { [-1, 1].forEach(function (k) { dlnCyl(P, 0.08, 0.08, 1.4, dlnC(i ? 0xC82A2A : 0xF4F2EE), X(KGN_BW.x + k * (KGN_BW.hw - 0.5)), 0.7, z, 6); }); });
shkSpot(X(KGN_BW.x), 106, 4, "The top of the Hump", "race down the Hump", function () { kgnHumpRace(); });
shkSpot(X(KGN_BW.x), KGN_S - 3, 4, "Miss Mabel Grey's gate", "read the tale", function () { kgnTale("🎀 Miss Mabel Grey's gate", KGN_TALES.mabel, []); });
var fx0 = -330, fx1 = KGN_BW.x - KGN_BW.hw - 8, fz0 = -252, fz1 = -120;
dlnRail(P, X(fx0), fz1, X(fx1 - 30), fz1, 1.0);
dlnRail(P, X(fx1 - 26), fz1, X(fx1), fz1, 1.0);
dlnRail(P, X(fx1), fz0, X(fx1), fz1, 1.0);
for (var fz = fz0; fz < fz1; fz += 4)
shkSolidBox(X(fx1), fz + 2, 0.4, 4, 0, 1.2);
for (var fx = fx0; fx < fx1; fx += 4) {
if (fx > fx1 - 30 && fx < fx1 - 26)
continue;
shkSolidBox(X(fx + 2), fz1, 4, 0.4, 0, 1.2);
}
dlnPlane(P, fx1 - fx0, fz1 - fz0, dlnS("lawn", 0xFFFFFF), X((fx0 + fx1) / 2), 0.03, (fz0 + fz1) / 2);
shkSpot(X(fx1 - 28), fz1 + 2, 3, "The Figs", "look", function () { kgnTale("🎩 The Figs", KGN_TALES.figs, ["\"I tell you that cricket is called crickets here.\""]); });
for (var ft = 0; ft < (DLN.lite ? 3 : 7); ft++)
kgnLime(P, X(fx0 + 12 + R() * (fx1 - fx0 - 24)), fz0 + 10 + R() * (fz1 - fz0 - 20), R);
kgnLog(P, X(-280), -190, 0.4, 5.5);
for (var bz = -226; bz < -76; bz += 14) {
kgnFlowerBed(P, X(-154.5), bz, 2, 10, (bz * -7) | 0);
kgnFlowerBed(P, X(-145.5), bz, 2, 10, (bz * -3) | 0);
}
kgnWeepingBeech(P, X(-150), -244, R);
shkSpot(X(-150), -236, 4.5, "The weeping beech in the Baby Walk", "look", function () { kgnTale("🌳 The weeping beech", "\"He decided, rather sulkily, to go to sleep on the weeping beech in the Baby Walk.\"", ["Its branches come right down to the ground, so inside it is a green room. The birds who sleep in it flew away when Peter alighted, the first night."]); });
shkSpot(X(-150), -160, 4, "The Baby Walk", "look", function () { kgnTale("👶 The Baby Walk", KGN_TALES.babywalk, []); });
var px = -118, pz = -170;
dlnPlane(P, 30, 4, dlnS("gravel", 0xFFFFFF), X(px), 0.03, pz);
dlnPlane(P, 4, 4, dlnS("gravel", 0xFFFFFF), X(-133.5), 0.03, pz);
for (var t = 0; t < 4; t++) {
var tx = X(px - 11 + t * 7.2);
dlnBox(P, 1.6, 0.06, 0.9, dlnC(0xF4F2EC), tx, 0.76, pz - 3.2);
dlnBox(P, 1.5, 0.74, 0.8, wood, tx, 0.37, pz - 3.2);
dlnCyl(P, 0.13, 0.15, 0.2, dlnShine(0xC8C8C0, 0.3, 0.8), tx + 0.4, 0.9, pz - 3.2, 10);
shkSolidBox(tx, pz - 3.2, 1.6, 0.9, 0, 0.8);
kgnChestnut(P, tx, pz + 6, R, 10);
}
shkSpot(X(px), pz, 4, "Picnic Street", "have a picnic", function () { kgnPicnic(); });
var wx = X(-128), wz = -110;
dlnCyl(P, 1.1, 1.2, 0.9, stone, wx, 0.45, wz, 14);
var wt = new THREE.Mesh(new THREE.CircleGeometry(0.95, 14), kgnWaterMat());
wt.rotation.x = -Math.PI / 2;
wt.position.set(wx, 0.82, wz);
wt.userData.keep = 1;
KGN.live.add(wt);
[-1, 1].forEach(function (k) { dlnBox(P, 0.2, 2.2, 0.2, wood, wx + k * 1.0, 1.6, wz); });
dlnGable(P, 2.6, 1.6, 0.7, dlnS("slate", 0x6A6A70), wx, 2.7, wz, Math.PI / 2);
var bk = dlnCyl(P, 0.16, 0.14, 0.28, wood, wx, 1.6, wz, 8);
shkSolid({ x: wx, z: wz, r: 1.3 });
shkSpot(wx + 1.8, wz, 2.6, "St Govor's Well", "look into it", function () { kgnTale("⛲ St Govor's Well", KGN_TALES.well, ["It is dry now, mostly. Peter found his paddle near here: a child's spade, which he thought was a paddle."]); });
[[-88, -78], [-62, -40]].forEach(function (p, i) {
dlnPlane(P, 3, 20, dlnS("lawn", 0xC8D8B0), X(p[0]), 0.032, p[1], 0.4);
[-1, 1].forEach(function (k) { var sx = X(p[0] + Math.sin(0.4) * k * 10), sz = p[1] + Math.cos(0.4) * k * 10; for (var s = -1; s <= 1; s++)
dlnCyl(P, 0.02, 0.02, 0.7, dlnC(0xF0E8D0), sx + s * 0.1, 0.35, sz, 4); });
});
shkSpot(X(-75), -60, 5, "The cricket-pitches", "play cricket", function () { kgnCricket(); });
for (var sc = 0; sc < 7; sc++) {
var a = sc / 7 * Math.PI * 2;
kgnChestnut(P, X(-50 + Math.cos(a) * 11), -206 + Math.sin(a) * 11, R, 12);
}
kgnLime(P, X(-36), -196, R, 14);
var fb = new THREE.Mesh(new THREE.CircleGeometry(13, 32), dlnS("ivy", 0xFFFFFF));
fb.rotation.x = -Math.PI / 2;
fb.position.set(X(-112), 0.035, -60);
P.add(fb);
var rim = new THREE.Mesh(new THREE.TorusGeometry(13, 0.25, 4, 40), stone);
rim.rotation.x = Math.PI / 2;
rim.position.set(X(-112), 0.12, -60);
P.add(rim);
for (var fl = 0; fl < 6; fl++) {
var a2 = fl / 6 * Math.PI * 2;
kgnFlowerBed(P, X(-112 + Math.cos(a2) * 8), -60 + Math.sin(a2) * 8, 2.4, 1.4, 300 + fl, a2);
}
shkSpot(X(-112), -46, 5, "The Fairies' Basin", "look for fairies", function () { kgnFairyHunt(); });
for (var b = 0; b < (DLN.lite ? 8 : 20); b++) {
var bz2 = KGN_BW.z0 + 30 + b * (KGN_BW.z1 - KGN_BW.z0 - 60) / 20;
if (Math.abs(bz2 - 150) < 45)
continue;
kgnBench(P, X(KGN_BW.x + KGN_BW.hw + 1.4), bz2, -Math.PI / 2);
}
for (var b2 = 0; b2 < (DLN.lite ? 6 : 12); b2++) {
var a3 = b2 / 12 * Math.PI * 2 + 0.13;
kgnBench(P, X(KGN_POND.x + Math.cos(a3) * (KGN_POND.r + 6)), KGN_POND.z + Math.sin(a3) * (KGN_POND.r + 6), -a3 + Math.PI / 2);
}
kgnBench(P, X(KGN_BW.x + KGN_BW.hw + 1.4), -40, -Math.PI / 2);
shkSpot(X(KGN_POND.x), -KGN_POND.r - 4, 6, "The Round Pond", "sail a stick-boat", function () { kgnStickBoat(); });
shkSpot(X(KGN_POND.x + KGN_POND.r + 4), 0, 5, "The Round Pond's ducks", "feed the ducks", function () { kgnFeedDucks(); });
var sx0 = 80, sx1 = 160, sz0 = -210, sz1 = -120;
[[sx0, sz0, sx1, sz0], [sx0, sz1, sx1, sz1], [sx0, sz0, sx0, sz1], [sx1, sz0, sx1, sz1 - 12]].forEach(function (r) { kgnHurdles(P, r[0], r[1], r[2], r[3]); });
var pen = [118, -165];
kgnHurdles(P, pen[0] - 5, pen[1] - 4, pen[0] + 5, pen[1] - 4);
kgnHurdles(P, pen[0] - 5, pen[1] + 4, pen[0] + 5, pen[1] + 4);
kgnHurdles(P, pen[0] - 5, pen[1] - 4, pen[0] - 5, pen[1] + 4);
for (var sh = 0; sh < (DLN.lite ? 8 : 22); sh++) {
var s = kgnSheep(R, sh < 5);
s.position.set(X(sx0 + 6 + R() * (sx1 - sx0 - 12)), 0, sz0 + 6 + R() * (sz1 - sz0 - 12));
P.add(s);
shkSolid({ x: s.position.x, z: s.position.z, r: 0.8 });
}
shkSpot(X(sx1 + 3), sz1 - 6, 4, "The sheep, and the shearing", "watch the shearing", function () { kgnTale("🐑 The sheep and the shearing", KGN_TALES.sheep, ["\"The sheep are so frightened by the shearing that it makes them quite white and thin, and as soon as they are set free they begin to nibble the grass at once, quite anxiously, as if they feared that they would never be worth eating.\""]); });
shkSpot(X(KGN_LW.x0 - 3), 96, 4, "The water's edge, by the bridge", "send a paper boat to the island", function () { kgnPaperBoat(); });
shkSpot(X(KGN_LW.x0 - 3), 40, 4, "The Long Water", "peer over the edge", function () { kgnTale("🌊 The Serpentine", KGN_TALES.serp, [KGN_TALES.isle]); });
for (var fw = -180; fw < 200; fw += DLN.lite ? 40 : 20) {
kgnFlowerBed(P, X(fw), 176.4, 16, 1.6, 500 + fw);
kgnFlowerBed(P, X(fw), 183.6, 16, 1.6, 700 + fw);
}
var trees = DLN.lite ? 60 : 230;
for (var i = 0; i < trees; i++) {
var tx2 = -180 + R() * 420, tz2 = -250 + R() * 420;
if (kgnBusy(tx2, tz2))
continue;
var k2 = R();
if (k2 < 0.45)
kgnElm(P, X(tx2), tz2, R, 15 + R() * 6);
else if (k2 < 0.75)
kgnChestnut(P, X(tx2), tz2, R);
else
dlnPlanes(P, [{ x: X(tx2), z: tz2, h: 14 + R() * 5 }], R);
}
},
function (x, z) {
if (Math.hypot(x - KGN_POND.x, z - KGN_POND.z) < KGN_POND.r + 14)
return true;
if (x > KGN_LW.x0 - 18)
return true;
if (Math.abs(x - KGN_BW.x) < 20)
return true;
if (Math.abs(z - 180) < 10)
return true;
if (x > 70 && x < 170 && z > -215 && z < -115)
return true;
if (Math.hypot(x + 112, z + 60) < 18)
return true;
if (Math.hypot(x - 60, z - 218) < 30)
return true;
if (x > -140 && x < -95 && z > -180 && z < -155)
return true;
if (Math.abs(x + 150) < 6 && z < -70)
return true;
if (Math.hypot(x + 50, z + 206) < 16)
return true;
if (x > -100 && x < -50 && z > -95 && z < -25)
return true;
if (Math.hypot(x + 128, z + 110) < 4)
return true;
for (var i = 0; i < 8; i++) { }
return false;
},
function (P, x0, z0, x1, z1) {
var X = kgX, L = Math.hypot(x1 - x0, z1 - z0), ry = Math.atan2(x1 - x0, z1 - z0), n = Math.max(1, Math.round(L / 2)), wood = dlnC(0x8A6A44);
for (var i = 0; i < n; i++) {
var u = (i + 0.5) / n, cx = x0 + (x1 - x0) * u, cz = z0 + (z1 - z0) * u;
var g = new THREE.Group();
g.position.set(X(cx), 0, cz);
g.rotation.y = ry;
P.add(g);
for (var r = 0; r < 4; r++)
dlnBox(g, 0.05, 0.07, L / n, wood, 0, 0.25 + r * 0.24, 0);
[-1, 1].forEach(function (k) { dlnBox(g, 0.08, 1.1, 0.08, wood, 0, 0.55, k * L / n / 2); });
}
shkSolidBox(X((x0 + x1) / 2), (z0 + z1) / 2, 0.3, L, ry, 1.1);
},
function (P, x, z, ry, room, name) {
var X = kgX, g = new THREE.Group();
g.position.set(X(x), 0, z);
g.rotation.y = ry;
P.add(g);
var w = dlnS("boards", 0x7A5A3A), roof = dlnS("slate", 0x4A3A30);
dlnBox(g, 4, 2.6, 3.4, w, 0, 1.3, 0);
dlnGable(g, 4.2, 3.6, 1.1, roof, 0, 2.6, 0, 0);
dlnBox(g, 0.95, 1.9, 0.06, dlnC(0x2E4A2E), 0, 0.95, 1.72);
dlnBox(g, 0.7, 0.6, 0.06, dlnGlow(0xC8D0C8), 1.2, 1.6, 1.72);
var r = new THREE.Vector3(0, 0, 2.8).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry);
shkSolidBox(X(x), z, 4.2, 4.2, ry, 3);
shkDoor(room, X(x) + r.x, z + r.z, name);
},
function (col) {
var g = new THREE.Group(), body = dlnShine(col || 0x1E2A3A, 0.4, 0.2), wh = dlnShine(0x1A1A1A, 0.5, 0.4);
var b = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), body);
b.scale.set(0.75, 0.7, 1.2);
b.position.y = 0.78;
g.add(b);
var hood = new THREE.Mesh(new THREE.SphereGeometry(0.36, 10, 6, 0, Math.PI, 0, Math.PI / 2), body);
hood.rotation.y = Math.PI / 2;
hood.position.set(0, 0.8, -0.3);
g.add(hood);
[-1, 1].forEach(function (k) { [-0.35, 0.35].forEach(function (z) { var w = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.025, 4, 14), wh); w.rotation.y = Math.PI / 2; w.position.set(k * 0.3, 0.22, z); g.add(w); }); });
dlnBox(g, 0.5, 0.03, 0.03, wh, 0, 1.05, 0.75);
[-1, 1].forEach(function (k) { var h = dlnBox(g, 0.03, 0.03, 0.5, wh, k * 0.24, 0.95, 0.55); h.rotation.x = -0.5; });
g.userData.keep = 1;
g.userData.ozProp = 1;
return g;
},
function (k, x, z, ry, o) {
var F = KGN_FOLK[k], inside = !!(o && o.P && o.P !== SHK.live), p = dlnPerson("kg_" + k, F.dress, { sex: F.sex, child: !!F.child, inside: inside });
var y = (o && o.y != null) ? o.y : 0.14;
p.position.set(inside ? x : kgX(x), y, z);
p.rotation.y = ry || 0;
((o && o.P) || SHK.live).add(p);
var P = { g: p, key: "kgn_" + k, wander: o && o.wander ? { r: o.wander, sp: 0.5 } : null, ground: y };
SHK.people.push(P);
SHK.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet } });
return P;
},
function (R) {
var X = kgX, crowd = function (n, x0, x1, z0, z1, kinds, o) {
if (DLN.lite)
n = Math.ceil(n * 0.4);
for (var i = 0; i < n; i++) {
var px = x0 + R() * (x1 - x0), pz = z0 + R() * (z1 - z0);
if (shkSolidAt(X(px), pz, 0) || kgnWater(px, pz))
continue;
var who = kinds[(R() * kinds.length) | 0], p = dlnPerson("kg" + SHK.people.length + "_" + i, who);
p.position.set(X(px), 0.14, pz);
p.rotation.y = R() * 6.28;
SHK.live.add(p);
if (who === "nanny" && R() < 0.8) {
var pr = kgnPram([0x1E2A3A, 0x3A3A3A, 0x4A2A2A, 0xE8E2D4][(R() * 4) | 0]);
pr.position.set(0, 0, 0.9);
p.add(pr);
}
if ((who === "boy" || who === "sailorboy") && R() < 0.4)
p.add(kgnHoop());
SHK.people.push({ g: p, wander: o && o.still ? null : { r: o && o.r || 10, sp: 0.4 + R() * 0.5 }, ground: 0.14 });
}
};
crowd(30, KGN_BW.x - KGN_BW.hw + 1, KGN_BW.x + KGN_BW.hw - 1, KGN_BW.z0 + 10, KGN_BW.z1 - 10, ["nanny", "nanny", "lady", "gent", "oldgent", "sailorboy", "girl", "boy", "lady", "nanny"], { r: 14 });
crowd(14, -153, -147, -226, -76, ["nanny", "nanny", "nanny", "lady"], { r: 6 });
crowd(18, KGN_POND.x - KGN_POND.r - 8, KGN_POND.x + KGN_POND.r + 8, KGN_POND.z - KGN_POND.r - 8, KGN_POND.z + KGN_POND.r + 8, ["sailorboy", "boy", "girl", "sailorboy", "gent", "nanny", "lady"], { r: 8 });
crowd(10, -320, -250, -245, -130, ["girl", "sailorboy", "nanny", "lady", "girl"], { r: 8 });
crowd(12, -170, 200, 176, 184, ["lady", "lady", "gent", "oldgent", "nanny", "girl"], { r: 20 });
crowd(10, KGN_LW.x0 - 8, KGN_LW.x0 - 3, -220, 110, ["gent", "lady", "oldgent", "nanny", "sailorboy"], { r: 12 });
crowd(8, 236, 300, -256, -236, ["lady", "gent", "oldgent", "girl"], { r: 8 });
crowd(10, -300, 300, -270, -266, ["gent", "lady", "worker", "maid", "gent"], { r: 16 });
crowd(6, -80, -60, -60, -50, ["boy", "sailorboy", "boy", "girl"], { r: 4, still: 1 });
kgnNamed("balloon", KGN_BW.x + 13, -266, Math.PI);
kgnNamed("pc", KGN_BW.x - 30, -267, 0, { wander: 12 });
kgnNamed("captain", KGN_BW.x + 2, -120, Math.PI * 0.9);
kgnNamed("irene", KGN_BW.x - 2, -117, Math.PI);
kgnNamed("david", KGN_BW.x, -114, Math.PI * 1.1);
var dog = kgnDog();
dog.position.set(X(KGN_BW.x + 3.5), 0, -116);
dog.rotation.y = Math.PI;
SHK.live.add(dog);
KGN.porthos = dog;
kgnNamed("salford", KGN_LW.x0 - 9.6, -190, -Math.PI / 2, { y: 0.14 });
kgnNamed("shepherd", 121, -165, Math.PI * 0.5);
kgnNamed("yacht", KGN_POND.x + 18, -KGN_POND.r - 2.6, Math.PI * 0.1);
kgnNamed("angela", -70, -46, Math.PI * 0.6);
kgnNamed("nanny", -150, -120, 0, { wander: 30 });
},
function () {
if (KGN.built || !SHK.G)
return;
DLN.lite = KGN.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(1906), live0 = SHK.live;
KGN.live = new THREE.Group();
KGN.live.name = "kgn-live";
SHK.G.add(KGN.live);
var parts = [["kgn-west", -270, -60, 170], ["kgn-broad", -200, 40, 260], ["kgn-mid", -40, -80, 230], ["kgn-east", 290, -60, 260], ["kgn-south", 60, 190, 220]];
var groups = {};
parts.forEach(function (p) { var g = new THREE.Group(); g.name = p[0]; SHK.G.add(g); groups[p[0]] = g; SHK.dist.push({ n: p[0], g: g, x: kgX(p[1]), z: p[2], r: p[3] }); });
var all = new THREE.Group();
[[kgnGround, "ground"], [kgnEdges, "edges"], [kgnPalace, "palace"], [kgnAlbert, "albert"], [kgnEast, "east"], [kgnMiddle, "middle"]].forEach(function (f) { try {
f[0](all, R);
}
catch (e) {
if (window.console)
console.warn("[kensington] " + f[1], e);
} });
try {
kgnWaters(all);
}
catch (e) {
if (window.console)
console.warn("[kensington] water", e);
}
try {
kgnRoads();
}
catch (e) {
if (window.console)
console.warn("[kensington] roads", e);
}
try {
kgnFolk(R);
}
catch (e) {
if (window.console)
console.warn("[kensington] folk", e);
}
all.children.slice().forEach(function (m) {
var x = m.position.x - kgX(0), z = m.position.z, k;
if (x < -215 && z < 120)
k = "kgn-west";
else if (x < -160)
k = "kgn-broad";
else if (x > 190)
k = "kgn-east";
else if (z > 140)
k = "kgn-south";
else
k = "kgn-mid";
if (m.geometry && m.geometry.parameters && m.geometry.parameters.width > 300) {
KGN.live.add(m);
return;
}
groups[k].add(m);
});
for (var k in groups) {
try {
ctnMerge(groups[k]);
groups[k].children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) {
if (window.console)
console.warn("[kensington] bake " + k, e);
}
}
try {
kgnNightBuild();
}
catch (e) {
if (window.console)
console.warn("[kensington] night", e);
}
SHK.live = live0;
KGN.built = true;
},
function (dt, t) {
if (!KGN.built)
return;
KGN.ducks.forEach(function (D) {
D.a += dt * D.sp;
if (D.pond) {
D.g.position.set(kgX(KGN_POND.x + Math.cos(D.a) * D.r), 0.06, KGN_POND.z + Math.sin(D.a) * D.r);
D.g.rotation.y = -D.a;
}
else {
D.g.position.set(kgX(D.x + Math.sin(D.a * 0.7) * 6), 0.06, D.z + Math.cos(D.a * 0.5) * 14);
D.g.rotation.y = D.a * 0.5;
}
});
KGN.boats.forEach(function (B) { B.a += dt * B.sp; B.g.position.set(kgX(KGN_POND.x + Math.cos(B.a) * B.r), 0.08, KGN_POND.z + Math.sin(B.a) * B.r); B.g.rotation.y = -B.a + (B.sp > 0 ? 0 : Math.PI); B.g.rotation.z = Math.sin(t * 0.8 + B.r) * 0.06; });
KGN.buses.forEach(function (B) { B.g.position.x += B.sp * dt; var lx = B.g.position.x - kgX(0); if (lx > KGN_R.hw + 30)
B.g.position.x = kgX(-KGN_R.hw - 30); if (lx < -KGN_R.hw - 30)
B.g.position.x = kgX(KGN_R.hw + 30); });
KGN.birds.forEach(function (B) { B.t += dt; var w = B.g.userData.wings; if (w) {
var f = B.perch ? Math.sin(B.t * 1.3) * 0.15 : Math.sin(B.t * 7) * 0.7;
w[0].rotation.z = f;
w[1].rotation.z = -f;
} });
KGN.fount.forEach(function (J, i) { J.scale.y = 1 + Math.sin(t * 1.1 + i) * 0.04; });
},
function (g, cx, cz, R, Rm) {
var h = 13, marble = dlnS("encaustic", 0xF4F2EE), stone = dlnS("stone", 0xE8E2D2), iron = dlnShine(0x1A1A1A, 0.5, 0.6), gilt = dlnShine(0xD8B048, 0.3, 0.9);
dlnShell(g, cx, cz, Rm, { floor: dlnS("marble", 0xFFFFFF), wall: new THREE.MeshLambertMaterial({ map: DLN_CANVAS.kent() }), low: stone, lowH: 4.2, h: h, ceil: dlnGlow(0x9AA8C0), outName: "The way out to the Broad Walk", out: function () { shkGoOut("kgn_stair"); } });
var ct = kgnPainted("stairsky", 512, 512, function (x, W, H) {
var gr = x.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, W * 0.6);
gr.addColorStop(0, "#E8EEF4");
gr.addColorStop(0.6, "#A8B8D0");
gr.addColorStop(1, "#C8B890");
x.fillStyle = gr;
x.fillRect(0, 0, W, H);
var Rr = wRand(9);
for (var i = 0; i < 12; i++) {
x.fillStyle = "rgba(255,255,255,.6)";
x.beginPath();
x.ellipse(Rr() * W, Rr() * H, 40 + Rr() * 40, 18 + Rr() * 14, Rr() * 3, 0, 7);
x.fill();
}
x.strokeStyle = "#B89850";
x.lineWidth = 18;
x.strokeRect(9, 9, W - 18, H - 18);
x.lineWidth = 4;
x.strokeRect(34, 34, W - 68, H - 68);
var cols = ["#8A1A2A", "#2A3A6A", "#E8D8B8", "#3A5A2A"];
for (var p = 0; p < 16; p++) {
var a = p / 16 * Math.PI * 2, px = W / 2 + Math.cos(a) * W * 0.38, py = H / 2 + Math.sin(a) * H * 0.38;
x.fillStyle = cols[p % 4];
x.beginPath();
x.arc(px, py, 13, 0, 7);
x.fill();
x.fillStyle = "#E8C8A8";
x.beginPath();
x.arc(px - Math.cos(a) * 14, py - Math.sin(a) * 14, 7, 0, 7);
x.fill();
}
});
var cp = new THREE.Mesh(new THREE.PlaneGeometry(Rm.hw * 2 - 0.6, Rm.hd * 2 - 0.6), new THREE.MeshBasicMaterial({ map: ct }));
cp.rotation.x = Math.PI / 2;
cp.position.set(cx, h - 0.02, cz);
g.add(cp);
var steps = 14, sh = 4.5 / steps;
for (var s = 0; s < steps; s++) {
var z = cz + Rm.hd - 4.4 - s * 0.62, y = (s + 1) * sh;
dlnBox(g, 2.6, y, 0.62, stone, cx - Rm.hw + 1.5, y / 2, z);
shkFloor(cx - Rm.hw + 1.5, z, 1.3, 0.31, y);
var b = dlnCyl(g, 0.02, 0.02, 1.0, iron, cx - Rm.hw + 2.8, y + 0.5, z, 4);
}
var rail = dlnBox(g, 0.06, 0.06, steps * 0.62 + 0.6, gilt, cx - Rm.hw + 2.8, 4.5 / 2 + 1.0, cz + Rm.hd - 4.4 - steps * 0.31);
rail.rotation.x = Math.atan2(4.5, steps * 0.62);
var lz0 = cz + Rm.hd - 4.4 - steps * 0.62;
dlnBox(g, Rm.hw * 2, 0.3, lz0 - (cz - Rm.hd), stone, cx, 4.35, (lz0 + cz - Rm.hd) / 2);
shkFloor(cx, (lz0 + cz - Rm.hd) / 2, Rm.hw - 0.3, (lz0 - (cz - Rm.hd)) / 2, 4.5);
for (var bx = -Rm.hw + 3.2; bx < Rm.hw; bx += 0.3)
dlnCyl(g, 0.02, 0.02, 1.0, iron, cx + bx, 5.0, lz0, 4);
dlnBox(g, Rm.hw * 2 - 3, 0.06, 0.06, gilt, cx + 1.5, 5.5, lz0);
shkSolidBox(cx + 1.5, lz0 + 0.3, Rm.hw * 2 - 3, 0.3, 0, 6);
[[-3.5, "kgn_cupola", "The Cupola Room"], [3.5, "kgn_birth", "Queen Victoria's rooms"]].forEach(function (d) {
dlnBox(g, 1.8, 3.2, 0.12, dlnS("oak", 0xFFFFFF), cx + d[0], 4.5 + 1.6, cz - Rm.hd + 0.08);
dlnBox(g, 2.3, 0.4, 0.2, gilt, cx + d[0], 4.5 + 3.4, cz - Rm.hd + 0.1);
var sp = shkSpot(cx + d[0], cz - Rm.hd + 1.4, 2.2, d[2], "go in", function () { shkGoIn(d[1]); }, 4.5);
});
dlnCyl(g, 0.03, 0.03, 4, gilt, cx, h - 2, cz, 4);
var ln = dlnCyl(g, 0.5, 0.35, 1.0, dlnGlow(0xFFEACC), cx, h - 4.5, cz, 6);
dlnCyl(g, 0.6, 0.5, 0.15, gilt, cx, h - 3.95, cz, 6);
Rm.hello = "<b>The King's Staircase, Kensington Palace.</b> Look up: King George the First's court is looking down at you over a painted balustrade, painted by William Kent about 1725. The stair goes up to the State Apartments.";
kgnNamed("warder", cx + 3, cz + Rm.hd - 5, Math.PI * 1.1, { P: Rm.live, y: 0.14 });
shkSpot(cx + 4, cz + 2, 3, "The painted walls", "look up at the court", function () { kgnTale("🎨 The King's Staircase", "William Kent painted these walls and the ceiling for King George I in about 1725.", ["All round, the court of George I looks over a painted balustrade between painted columns: the King's pages and grooms, his Turkish servants Mustapha and Mehemet, a Quaker, and Peter the Wild Boy, a boy found living wild in the woods of Hanover and brought to the court.", "Kent painted himself in the ceiling too, with his palette, looking down."]); });
},
function (g, cx, cz, R, Rm) {
var h = 11, gilt = dlnShine(0xD8B048, 0.3, 0.9), marble = dlnS("veined", 0xF0ECE4);
dlnShell(g, cx, cz, Rm, { floor: dlnS("oak", 0xFFFFFF), wall: dlnS("veined", 0xE8E0D0), low: dlnS("veined", 0xC8C0B0), lowH: 1.0, h: h, ceil: false, outName: "Back to the King's Staircase", out: function () { shkGoIn("kgn_stair"); } });
var dome = new THREE.Mesh(new THREE.SphereGeometry(Rm.hw, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ map: DLN_CANVAS.cupola(), color: 0xD8D4CC, side: THREE.BackSide }));
dome.scale.y = 0.45;
dome.position.set(cx, h, cz);
dome.userData.keep = 1;
g.add(dome);
var star = new THREE.Mesh(new THREE.CircleGeometry(1.4, 24), gilt);
star.rotation.x = Math.PI / 2;
star.position.set(cx, h + Rm.hw * 0.45 - 0.05, cz);
g.add(star);
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2, side = Math.floor(((a + Math.PI / 4) % (Math.PI * 2)) / (Math.PI / 2));
var px, pz, ry;
var t = (i % 3) / 3 - 0.33;
if (side === 0) {
px = cx + Rm.hw - 0.2;
pz = cz + t * Rm.hd * 1.6;
ry = -Math.PI / 2;
}
else if (side === 1) {
px = cx + t * Rm.hw * 1.6;
pz = cz + Rm.hd - 0.2;
ry = Math.PI;
}
else if (side === 2) {
px = cx - Rm.hw + 0.2;
pz = cz + t * Rm.hd * 1.6;
ry = Math.PI / 2;
}
else {
px = cx + t * Rm.hw * 1.6;
pz = cz - Rm.hd + 0.2;
ry = 0;
}
if (side === 1 && Math.abs(t) < 0.1)
continue;
dlnBox(g, 0.6, h - 1.6, 0.2, dlnS("veined", 0xD8D0C0), px, (h - 1.6) / 2 + 0.8, pz, ry);
dlnBox(g, 0.8, 0.4, 0.3, gilt, px, h - 0.6, pz, ry);
}
[[cx - Rm.hw + 0.3, cz, Math.PI / 2], [cx + Rm.hw - 0.3, cz, -Math.PI / 2], [cx, cz - Rm.hd + 0.3, 0]].forEach(function (n) {
var ng = new THREE.Group();
ng.position.set(n[0], 0, n[1]);
ng.rotation.y = n[2];
g.add(ng);
var half = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 3.2, 12, 1, true, -Math.PI / 2, Math.PI), dlnC(0x2A3A6A));
half.material.side = THREE.DoubleSide;
half.position.set(0, 3.6, 0);
ng.add(half);
dlnBox(ng, 1.0, 1.0, 0.6, marble, 0, 1.5, 0.2);
var st = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.35, 0), new THREE.Vector2(0.3, 0.9), new THREE.Vector2(0.2, 1.7), new THREE.Vector2(0.12, 1.9)], 10), gilt);
st.position.set(0, 2.0, 0.2);
ng.add(st);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), gilt);
hd.position.set(0, 4.05, 0.2);
ng.add(hd);
});
dlnFireplace(g, cx + Rm.hw - 0.6, cz + 3, -Math.PI / 2);
var ck = new THREE.Group();
ck.position.set(cx, 0, cz);
g.add(ck);
dlnBox(ck, 1.4, 1.1, 1.4, dlnS("oak", 0x5A3A22), 0, 0.55, 0);
dlnBox(ck, 1.1, 1.6, 1.1, dlnS("oak", 0x6A4A2A), 0, 1.9, 0);
[[0.48, 0.48], [-0.48, 0.48], [0.48, -0.48], [-0.48, -0.48]].forEach(function (c) { dlnCyl(ck, 0.07, 0.07, 1.6, gilt, c[0], 1.9, c[1], 8); });
var cd = new THREE.Mesh(new THREE.SphereGeometry(0.62, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), gilt);
cd.position.y = 2.75;
ck.add(cd);
var fc = new THREE.Mesh(new THREE.CircleGeometry(0.32, 20), dlnC(0xF4F0E4));
fc.position.set(0, 1.95, 0.56);
ck.add(fc);
shkSolidBox(cx, cz, 1.6, 1.6, 0, 3);
shkSpot(cx, cz + 2.2, 2.6, "The Cupola Room", "read about it", function () { kgnTale("👑 The Cupola Room", "The grandest of the State Apartments, made for King George I by William Kent in about 1722: a ceiling painted as a coffered dome of blue and gold, with the Garter star in the middle, and gilt Roman gods in the niches.", ["Here, on 24 June 1819, the month-old Princess was christened Alexandrina Victoria.", "The great clock in the middle, the \"Temple of the Four Grand Monarchies of the World\", was made for the Princess of Wales in the 1730s."]); });
Rm.hello = "<b>The Cupola Room.</b> Blue and gold above, gilt gods in their niches. The Princess Victoria was christened here, in June 1819.";
},
function (g, cx, cz, R, Rm) {
var h = 4.8, gilt = dlnShine(0xD8B048, 0.3, 0.9), wood = dlnS("oak", 0xFFFFFF);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("nurserypaper", 0xFFFFFF), low: dlnS("oak", 0xD8C8B0), lowH: 1.0, h: h, ceil: dlnGlow(0xD8D0C0), outName: "Back to the King's Staircase", out: function () { shkGoIn("kgn_stair"); } });
var bed = new THREE.Group();
bed.position.set(cx - Rm.hw + 1.4, 0, cz - 2);
g.add(bed);
dlnBox(bed, 1.4, 0.5, 2.0, dlnS("oak", 0x8A6A4A), 0, 0.35, 0);
dlnBox(bed, 1.3, 0.18, 1.9, dlnC(0xF8F6F0), 0, 0.68, 0);
[[0.65, 0.95], [-0.65, 0.95], [0.65, -0.95], [-0.65, -0.95]].forEach(function (p) { dlnCyl(bed, 0.04, 0.04, 2.2, dlnS("oak", 0x8A6A4A), p[0], 1.1, p[1], 6); });
dlnBox(bed, 1.5, 0.3, 2.1, dlnS("damask", 0xFFFFFF), 0, 2.25, 0);
var curt = dlnBox(bed, 0.04, 1.6, 2.0, dlnS("damask", 0xFFFFFF), 0.72, 1.3, 0);
shkSolidBox(cx - Rm.hw + 1.4, cz - 2, 1.6, 2.2, 0, 2.3);
var cs = new THREE.Group();
cs.position.set(cx + Rm.hw - 0.6, 0, cz - 1);
cs.rotation.y = -Math.PI / 2;
g.add(cs);
dlnBox(cs, 4.0, 0.9, 0.7, wood, 0, 0.45, 0);
var gl = dlnBox(cs, 3.9, 1.6, 0.6, new THREE.MeshBasicMaterial({ color: 0xE8F0F4, transparent: true, opacity: 0.18, depthWrite: false }), 0, 1.7, 0);
gl.userData.keep = 1;
dlnBox(cs, 4.0, 0.08, 0.7, wood, 0, 2.54, 0);
for (var sh = 0; sh < 2; sh++)
dlnBox(cs, 3.9, 0.03, 0.6, wood, 0, 1.0 + sh * 0.75, 0);
var dc = [0xC82A3A, 0x2A4AA8, 0xF4F0E8, 0x6A2A8A, 0xE8C040, 0x2A8A5A, 0xE87AA0, 0x1A1A1E];
for (var d = 0; d < 26; d++) {
var row = d < 13 ? 0 : 1, col = d % 13, dx = -1.75 + col * 0.29, dy = 1.03 + row * 0.75;
var robe = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.26, 8), dlnC(dc[(d * 5) % 8]));
robe.position.set(dx, dy + 0.13, 0);
cs.add(robe);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), dlnC(0xE8D0B0));
hd.position.set(dx, dy + 0.3, 0);
cs.add(hd);
var hr = new THREE.Mesh(new THREE.SphereGeometry(0.037, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.5), dlnC(0x2A1A10));
hr.position.set(dx, dy + 0.31, 0);
cs.add(hr);
}
shkSolidBox(cx + Rm.hw - 0.6, cz - 1, 0.8, 4.1, 0, 2.6);
dlnDollsHouse(g, cx + Rm.hw - 1.4, cz + 3.5, -Math.PI / 2);
dlnRockingHorse(g, cx - 1, cz + 3, 0.6);
var tb = new THREE.Group();
tb.position.set(cx, 0, cz - Rm.hd + 1.2);
g.add(tb);
dlnBox(tb, 1.6, 0.06, 0.8, wood, 0, 0.78, 0);
[[-0.7, -0.32], [0.7, -0.32], [-0.7, 0.32], [0.7, 0.32]].forEach(function (p) { dlnCyl(tb, 0.035, 0.03, 0.76, wood, p[0], 0.38, p[1], 6); });
var bk = dlnBox(tb, 0.5, 0.04, 0.36, dlnC(0xF4F0E4), 0, 0.83, 0.05);
dlnCyl(tb, 0.07, 0.08, 0.26, dlnShine(0xC8C8C0, 0.3, 0.8), 0.55, 0.94, -0.1, 8);
var cdl = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 4), dlnGlow(0xFFD890));
cdl.position.set(0.55, 1.1, -0.1);
tb.add(cdl);
shkSolidBox(cx, cz - Rm.hd + 1.2, 1.7, 0.9, 0, 1);
shkSpot(cx, cz - Rm.hd + 2.2, 2.2, "Her journal", "read the page for 20 June 1837", function () { kgnTale("📔 The Princess's journal, Tuesday 20 June 1837", "\"I was awoke at 6 o'clock by Mamma, who told me that the Archbishop of Canterbury and Lord Conyngham were here, and wished to see me. I got out of bed and went into my sitting-room (only in my dressing-gown), and alone, and saw them. Lord Conyngham then acquainted me that my poor Uncle, the King, was no more ... and consequently that I am Queen.\"", ["She was eighteen. That same morning, in this palace, she met her Privy Council for the first time.", "In Barrie's book, the children say people rang the bell and she came down in her nighty with a candle, and they all cried, \"Hail, Queen of England!\" David wondered how she knew where the matches were kept."]); });
shkSpot(cx + Rm.hw - 1.6, cz - 1, 2.4, "Her dolls", "look at them", function () { kgnTale("🪆 The Princess's dolls", "As a girl in this palace, Princess Victoria had a great many little wooden dolls, and with her governess, Baroness Lehzen, she dressed more than a hundred of them herself, as ladies of the court and characters from the opera and the ballet, and wrote down who each one was.", ["\"She was the most celebrated baby of the Gardens, and lived in the palace all alone, with ever so many dolls.\" (Barrie)"]); });
for (var w = -1; w <= 1; w += 2) {
var win = dlnBox(g, 1.6, 2.4, 0.1, dlnWinMat(), cx + w * 2.2, 2.4, cz - Rm.hd + 0.05);
}
dlnPendant(g, cx, h, cz, 0.8);
Rm.hello = "<b>Queen Victoria's rooms as a girl.</b> Her bed, her doll's house, her rocking horse, and the dolls she dressed herself.";
},
function (g, cx, cz, R, Rm) {
var h = 2.6, boards = dlnS("boards", 0xFFFFFF);
dlnShell(g, cx, cz, Rm, { floor: boards, wall: dlnS("boards", 0xC8B090), h: h, ceil: dlnGlow(0x8A7A60), outName: "Out to the Broad Walk", out: function () { shkGoOut("kgn_marm"); } });
dlnBox(g, Rm.hw * 2 - 0.4, 0.06, 0.5, dlnC(0x6A4A2A), cx, 0.5, cz - Rm.hd + 0.4);
dlnBox(g, Rm.hw * 2 - 0.4, 0.5, 0.06, dlnC(0x5A3A22), cx, 0.25, cz - Rm.hd + 0.62);
shkSolidBox(cx, cz - Rm.hd + 0.4, Rm.hw * 2, 0.6, 0, 0.6);
dlnCyl(g, 0.03, 0.03, 0.2, dlnC(0x3A2A1A), cx - 1.2, 1.9, cz - Rm.hd + 0.1, 4).rotation.x = Math.PI / 2;
var fr = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.9, 10), dlnC(0xF0D8E0));
fr.position.set(cx - 1.2, 1.4, cz - Rm.hd + 0.25);
g.add(fr);
var sash = dlnCyl(g, 0.2, 0.22, 0.08, dlnC(0x8AB8E8), cx - 1.2, 1.55, cz - Rm.hd + 0.25, 10);
var kn = dlnBox(g, 0.5, 0.06, 0.45, dlnC(0x2A3A6A), cx + 0.6, 0.56, cz - Rm.hd + 0.4);
dlnBox(g, 0.14, 0.02, 0.1, dlnC(0x1E2A4A), cx + 0.48, 0.6, cz - Rm.hd + 0.3);
shkSpot(cx, cz, 2, "Marmaduke Perry's little wooden house", "read the tale", function () { kgnTale("🏚️ Marmaduke Perry's little wooden house", KGN_TALES.marm, ["His sister's frock still hangs on the peg. The knickerbockers are on the bench (with pockets)."]); });
Rm.hello = "<b>The little wooden house where Marmaduke Perry hid.</b>";
},
function (g, cx, cz, R, Rm) {
var h = 2.8, wood = dlnS("oak", 0xFFFFFF);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("boards", 0xD8C8A8), h: h, ceil: dlnGlow(0x9A8A70), outName: "Out to the Hump", out: function () { shkGoOut("kgn_lost"); } });
dlnBox(g, 1.6, 0.06, 0.8, wood, cx + 1.4, 0.82, cz - 1.6);
dlnBox(g, 1.5, 0.8, 0.7, wood, cx + 1.4, 0.4, cz - 1.6);
var bk = dlnBox(g, 0.42, 0.05, 0.3, dlnC(0x2A3A2A), cx + 1.3, 0.88, cz - 1.6);
shkSolidBox(cx + 1.4, cz - 1.6, 1.7, 0.9, 0, 1);
dlnCyl(g, 0.32, 0.36, 0.8, dlnShine(0x1A1A1A, 0.6, 0.4), cx - 2.4, 0.4, cz - 2.2, 10);
dlnCyl(g, 0.06, 0.06, 2.0, dlnShine(0x1A1A1A, 0.6, 0.4), cx - 2.4, 1.8, cz - 2.2, 6);
dlnCyl(g, 0.13, 0.15, 0.18, dlnShine(0xC8C8C0, 0.3, 0.8), cx - 2.4, 0.9, cz - 2.2, 10);
shkSolid({ x: cx - 2.4, z: cz - 2.2, r: 0.5 });
var sh = new THREE.Group();
sh.position.set(cx - Rm.hw + 0.3, 0, cz + 0.6);
sh.rotation.y = Math.PI / 2;
g.add(sh);
for (var s = 0; s < 3; s++)
dlnBox(sh, 2.4, 0.04, 0.35, wood, 0, 0.8 + s * 0.5, 0);
var found = [[0xC82A2A, "ball"], [0x8A6A44, "hoop"], [0x2A5AA8, "spade"], [0xE8D8B0, "glove"], [0x4A8A3A, "ball"], [0xF4F0E8, "sash"]];
found.forEach(function (f, i) { var x = -0.9 + (i % 3) * 0.9, y = 0.84 + Math.floor(i / 3) * 0.5; var m = f[1] === "ball" ? new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), dlnC(f[0])) : f[1] === "hoop" ? new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.015, 4, 16), dlnC(f[0])) : new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.05, 0.12), dlnC(f[0])); m.position.set(x, y + 0.08, 0); sh.add(m); });
shkSolidBox(cx - Rm.hw + 0.3, cz + 0.6, 0.4, 2.4, 0, 2);
kgnBench(g, cx - 0.4, cz + 1.4, Math.PI);
var ls = dlnPanel(["Found: 1 ball (red)", "1 hoop, 1 glove", "1 spade (child's)", "Lost: Nobody, today"], "LOST & FOUND", 1.0, 0.8, "#F2EAD6", "#2A3A2A");
ls.position.set(cx + Rm.hw - 0.05, 1.7, cz);
ls.rotation.y = -Math.PI / 2;
g.add(ls);
kgnNamed("keeper", cx + 1.4, cz - 2.4, 0, { P: Rm.live, y: 0.14 });
shkSpot(cx, cz - 0.4, 2.2, "The Lost House", "tell the man you are lost", function () { kgnLost(); });
Rm.hello = "<b>The Lost House.</b> \"You tell the man that you are lost and then he finds you.\"";
},
function (g, cx, cz, R, Rm) {
var h = 3.4;
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("nurserypaper", 0xB8B8C8), h: h, ceil: dlnGlow(0x3A3A48), outName: "Back to the Gardens", out: function () { kgnBackToGardens(); } });
var bd = new THREE.Group();
bd.position.set(cx - 0.8, 0, cz - 1.6);
g.add(bd);
dlnBox(bd, 1.8, 0.5, 2.2, dlnS("oak", 0x8A6A4A), 0, 0.3, 0);
dlnBox(bd, 1.7, 0.22, 2.1, dlnC(0xF4F2EE), 0, 0.6, 0);
dlnBox(bd, 1.8, 1.1, 0.08, dlnS("oak", 0x8A6A4A), 0, 0.75, -1.1);
var rl = dlnBox(bd, 1.8, 0.08, 0.08, dlnS("oak", 0x8A6A4A), 0, 0.85, 1.12);
dlnBox(bd, 1.6, 0.25, 1.4, dlnC(0xD8D8E8), 0, 0.82, 0.25);
var pil = dlnBox(bd, 1.2, 0.16, 0.45, dlnC(0xFAFAF6), 0, 0.8, -0.75);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), dlnC(0xE8C8B0));
hd.position.set(0.1, 0.98, -0.7);
bd.add(hd);
var hair = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.6), dlnC(0x6A4428));
hair.position.set(0.1, 1.0, -0.74);
hair.rotation.x = -1.2;
bd.add(hair);
var hairs = dlnBox(bd, 0.5, 0.03, 0.35, dlnC(0x6A4428), -0.15, 0.9, -0.8);
var arm = dlnCyl(bd, 0.05, 0.05, 0.5, dlnC(0xF0E8E0), -0.25, 0.98, -0.3, 6);
arm.rotation.z = Math.PI / 2;
KGN.motherBed = bd;
shkSolidBox(cx - 0.8, cz - 1.6, 1.9, 2.4, 0, 1.2);
var dr = new THREE.Group();
dr.position.set(cx + Rm.hw - 0.45, 0, cz - 1.5);
dr.rotation.y = -Math.PI / 2;
g.add(dr);
dlnBox(dr, 1.2, 1.0, 0.5, dlnS("oak", 0xFFFFFF), 0, 0.5, 0);
for (var i = 0; i < 3; i++) {
dlnBox(dr, 1.1, 0.26, 0.02, dlnS("oak", 0xC8A880), 0, 0.2 + i * 0.31, 0.26);
dlnCyl(dr, 0.025, 0.025, 0.03, dlnShine(0xC8A048, 0.3, 0.9), 0, 0.2 + i * 0.31, 0.28, 6).rotation.x = Math.PI / 2;
}
shkSolidBox(cx + Rm.hw - 0.45, cz - 1.5, 0.6, 1.3, 0, 1.1);
var wx = cx, wz = cz - Rm.hd + 0.06;
var night = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.0), new THREE.MeshBasicMaterial({ map: (typeof nvbNight === "function" ? nvbNight() : null), color: 0x8090B8 }));
night.position.set(wx + 2.4, 1.9, wz + 0.02);
g.add(night);
var frame = dlnBox(g, 1.8, 0.1, 0.14, dlnC(0xF0ECE4), wx + 2.4, 0.88, wz + 0.05);
dlnBox(g, 1.8, 0.1, 0.14, dlnC(0xF0ECE4), wx + 2.4, 2.92, wz + 0.05);
var open = new THREE.Group();
g.add(open);
var sash = dlnBox(open, 0.85, 2.0, 0.06, dlnGlow(0xA8B4D0), wx + 2.4 - 1.2, 1.9, wz + 0.5);
sash.rotation.y = 0.9;
var bars = new THREE.Group();
g.add(bars);
for (var b = 0; b < 6; b++)
dlnCyl(bars, 0.02, 0.02, 2.0, dlnShine(0x1A1A1A, 0.5, 0.6), wx + 1.75 + b * 0.26, 1.9, wz + 0.12, 5);
dlnBox(bars, 1.6, 2.0, 0.04, dlnGlow(0x8A94B0), wx + 2.4, 1.9, wz + 0.08).material = new THREE.MeshBasicMaterial({ color: 0x9AA4C0, transparent: true, opacity: 0.35, depthWrite: false });
open.userData.keep = bars.userData.keep = 1;
Rm.live.add(open);
Rm.live.add(bars);
KGN.motherWin = { open: open, bars: bars };
var boy = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), dlnC(0xF0D8C0));
boy.position.set(-0.45, 0.95, -0.55);
bd.add(boy);
boy.visible = false;
KGN.motherBoy = boy;
boy.userData.keep = 1;
var nl = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), dlnGlow(0xFFD890));
nl.position.set(cx + Rm.hw - 0.45, 1.1, cz - 1.5);
g.add(nl);
shkSpot(cx - 0.8, cz - 0.2, 1.6, "The rail at the foot of the bed", "sit on it, as Peter did", function () { kgnTale("🛏️ At the foot of the bed", "\"Peter alighted softly on the wooden rail at the foot of the bed and had a good look at her. She lay with her head on her hand, and the hollow in the pillow was like a nest lined with her brown wavy hair.\"", []); });
shkSpot(cx + Rm.hw - 1.3, cz - 1.5, 1.6, "The chest of drawers", "open a drawer", function () { kgnTale("🧦 The drawers", "His old garments are still there, but he cannot remember how you put them on. \"The socks, for instance, were they worn on the hands or on the feet?\"", []); });
shkSpot(cx + 2.4, cz - Rm.hd + 1.2, 1.6, "The window", "look at it", function () { kgnTale(KGN.motherBars ? "🪟 The window, shut and barred" : "🪟 The window, wide open", KGN.motherBars ? "\"But the window was closed, and there were iron bars on it, and peering inside he saw his mother sleeping peacefully with her arm round another little boy.\"" : "\"The window was wide open, just as he knew it would be.\" Mother always keeps it open in the hope that he may fly back.", []); });
kgnMotherWindow(KGN.motherBars);
Rm.hello = "<b>A London house, at night.</b> A mother asleep, with her head on her hand.";
},
function (col, s, o) {
s = s || 1;
o = o || {};
var g = new THREE.Group(), gown = dlnC(col || 0xF4E8F8), skin = dlnC(0xF8E0D0);
var dress = new THREE.Mesh(new THREE.ConeGeometry(0.075 * s, 0.2 * s, 8), gown);
dress.position.y = 0.1 * s;
g.add(dress);
for (var p = 0; p < 5; p++) {
var a = p / 5 * Math.PI * 2, pt = new THREE.Mesh(new THREE.SphereGeometry(0.04 * s, 6, 4), gown);
pt.scale.set(1, 0.4, 1.6);
pt.position.set(Math.cos(a) * 0.06 * s, 0.04 * s, Math.sin(a) * 0.06 * s);
pt.rotation.y = -a;
g.add(pt);
}
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.035 * s, 8, 6), skin);
hd.position.y = 0.23 * s;
g.add(hd);
var hair = new THREE.Mesh(new THREE.SphereGeometry(0.038 * s, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.55), dlnC(o.hair || [0xE8C860, 0x6A4428, 0x2A1A10, 0xC86A2A][(col || 0) % 4]));
hair.position.y = 0.235 * s;
g.add(hair);
var wm = KGN.wingMat || (KGN.wingMat = new THREE.MeshBasicMaterial({ color: 0xE8F4FF, transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthWrite: false }));
var wl = new THREE.Mesh(new THREE.PlaneGeometry(0.12 * s, 0.16 * s), wm), wr = wl.clone();
wl.position.set(-0.06 * s, 0.16 * s, -0.03 * s);
wr.position.set(0.06 * s, 0.16 * s, -0.03 * s);
wl.rotation.y = 0.5;
wr.rotation.y = -0.5;
g.add(wl);
g.add(wr);
if (o.glow !== false) {
var gl = wGlow(o.glowCol || 0xFFF0D0, 0.5 * s, 0.5);
gl.position.y = 0.15 * s;
g.add(gl);
}
if (o.holly) {
var h = new THREE.Mesh(new THREE.ConeGeometry(0.02 * s, 0.3 * s, 4), dlnC(0x1E5A2A));
h.rotation.x = Math.PI / 2.4;
h.position.set(0.05 * s, 0.15 * s, 0.1 * s);
g.add(h);
}
if (o.lantern) {
var l = new THREE.Mesh(new THREE.SphereGeometry(0.05 * s, 8, 6), dlnGlow(0xFF9A3A));
l.position.set(0.07 * s, 0.22 * s, 0.05 * s);
g.add(l);
}
if (o.crown) {
var c = dlnCyl(g, 0.03 * s, 0.035 * s, 0.03 * s, dlnShine(0xE8C848, 0.3, 0.9), 0, 0.27 * s, 0, 8);
}
if (o.cap) {
var fc = new THREE.Mesh(new THREE.ConeGeometry(0.035 * s, 0.1 * s, 6), dlnC(0xE8D040));
fc.position.y = 0.3 * s;
g.add(fc);
}
g.userData.wings = [wl, wr];
g.userData.keep = 1;
return g;
},
function () {
var g = new THREE.Group(), c = dlnC(0xB8B0A8), b = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), c);
b.scale.set(0.8, 0.8, 1.6);
b.position.y = 0.11;
g.add(b);
var h = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 5), c);
h.position.set(0, 0.18, 0.13);
g.add(h);
[[-0.04, -0.07], [0.04, -0.07], [-0.04, 0.07], [0.04, 0.07]].forEach(function (l) { dlnCyl(g, 0.01, 0.01, 0.08, c, l[0], 0.04, l[1], 4); });
return g;
},
function () {
var N = new THREE.Group();
N.name = "kgn-night";
N.visible = false;
SHK.G.add(N);
KGN.nightG = N;
KGN.fairies = [];
var X = kgX, R = wRand(1183), lite = DLN.lite;
var px = X(-112), pz = -69, pal = new THREE.Group();
pal.position.set(px, 0, pz);
N.add(pal);
var glass = [0x6A8AFF, 0xFF6A8A, 0x6AFF9A, 0xFFD86A, 0xC86AFF, 0x6AE8FF];
for (var i = 0; i < (lite ? 7 : 15); i++) {
var a = i / 15 * Math.PI * 2, r = i === 0 ? 0 : 0.6 + (i % 3) * 0.35, w = 0.25 + R() * 0.25, h = 0.6 + R() * 1.4 + (i === 0 ? 1.2 : 0);
var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), new THREE.MeshBasicMaterial({ color: glass[i % 6], transparent: true, opacity: 0.72 }));
m.position.set(Math.cos(a) * r, h / 2, Math.sin(a) * r * 0.6);
pal.add(m);
var sp = new THREE.Mesh(new THREE.ConeGeometry(w * 0.75, w * 1.4, 4), new THREE.MeshBasicMaterial({ color: glass[(i + 2) % 6], transparent: true, opacity: 0.8 }));
sp.position.set(m.position.x, h + w * 0.7, m.position.z);
sp.rotation.y = Math.PI / 4;
pal.add(sp);
}
var pg = wGlow(0xE8E0FF, 4.5, 0.35);
pg.position.y = 1.2;
pal.add(pg);
var rx = X(-112), rz = -55, ring = new THREE.Mesh(new THREE.RingGeometry(3.2, 3.5, 40), new THREE.MeshBasicMaterial({ color: 0x9AD07A, transparent: true, opacity: 0.5, depthWrite: false }));
ring.rotation.x = -Math.PI / 2;
ring.position.set(rx, 0.06, rz);
N.add(ring);
for (var m2 = 0; m2 < (lite ? 8 : 16); m2++) {
var a2 = m2 / 16 * Math.PI * 2, mu = new THREE.Group();
mu.position.set(rx + Math.cos(a2) * 4.2, 0, rz + Math.sin(a2) * 4.2);
N.add(mu);
dlnCyl(mu, 0.02, 0.025, 0.08, dlnC(0xF4F0E4), 0, 0.04, 0, 6);
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), dlnC(0xE8DCC8));
cap.position.y = 0.08;
mu.add(cap);
}
for (var d = 0; d < (lite ? 12 : 36); d++) {
var f = kgnFairy(KGN_FAIRY_COLS[d % 8], 1);
N.add(f);
KGN.fairies.push({ g: f, k: "dance", a: d / (lite ? 12 : 36) * Math.PI * 2, r: 2.2 + (d % 3) * 0.45, cx: rx, cz: rz, ph: R() * 6 });
}
KGN.ring = { x: rx, z: rz };
var tx = X(-103), tz = -62;
dlnBox(N, 1.4, 0.02, 0.5, dlnC(0xFFFFFF), tx, 0.14, tz);
dlnCyl(N, 0.08, 0.1, 0.12, dlnC(0xE8DCC8), tx, 0.06, tz, 8);
for (var c = 0; c < 8; c++) {
var cg = new THREE.Mesh(new THREE.SphereGeometry(0.012, 5, 4), dlnGlow([0xE84A6A, 0xF4E040, 0xFFFFFF][c % 3]));
cg.position.set(tx - 0.6 + c * 0.17, 0.16, tz + (c % 2 ? 0.12 : -0.12));
N.add(cg);
}
var mab = kgnFairy(0xFFF4C8, 1.5, { crown: 1, glowCol: 0xFFF8E0 });
mab.position.set(tx - 0.85, 0.05, tz);
mab.rotation.y = Math.PI / 2;
N.add(mab);
KGN.fairies.push({ g: mab, k: "hover", y: 0.05, ph: 0 });
KGN.mab = mab;
var lc = kgnFairy(0x5A3A8A, 1.2);
lc.position.set(tx - 1.1, 0.05, tz + 0.3);
N.add(lc);
var dand = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), dlnC(0xF4F4F0));
dand.position.set(0.06, 0.35, 0.05);
lc.add(dand);
KGN.fairies.push({ g: lc, k: "hover", y: 0.05, ph: 1 });
var duke = kgnFairy(0xF4F4F0, 1.3, { glowCol: 0xFFFFFF });
duke.position.set(rx + 4.8, 0.05, rz - 1.5);
N.add(duke);
KGN.fairies.push({ g: duke, k: "hover", y: 0.05, ph: 2 });
KGN.duke = duke;
for (var cu = 0; cu < (lite ? 2 : 4); cu++) {
var cp = kgnFairy(0xFFD8D8, 0.9, { cap: 1 });
cp.position.set(rx + 5.6 + cu * 0.3, 0.05, rz + 1 + cu * 0.2);
N.add(cp);
KGN.fairies.push({ g: cp, k: "hover", y: 0.05, ph: 3 + cu });
}
for (var l = 0; l < (lite ? 6 : 16); l++) {
var lk = kgnFairy(0xE8C890, 1, { lantern: 1, glowCol: 0xFFB060 });
var lz = -226 + l * (150 / 16);
lk.position.set(X(-150 + (l % 2 ? 1.2 : -1.2)), 0.05, lz);
N.add(lk);
KGN.fairies.push({ g: lk, k: "walk", x: X(-150 + (l % 2 ? 1.2 : -1.2)), z0: -226, z1: -76, z: lz, sp: 0.6 + R() * 0.4, ph: R() * 6 });
}
for (var ln = 0; ln < (lite ? 4 : 10); ln++) {
var lg = new THREE.Group(), po = kgnPony(), rd = kgnFairy(0x8A2A2A, 0.8, { holly: 1, glow: false });
rd.position.y = 0.12;
lg.add(po);
lg.add(rd);
var lz2 = KGN_BW.z0 + 20 + ln * 1.2;
lg.position.set(X(KGN_BW.x + (ln % 2 ? 0.5 : -0.5)), 0, lz2);
N.add(lg);
KGN.fairies.push({ g: lg, k: "lancer", x: X(KGN_BW.x + (ln % 2 ? 0.5 : -0.5)), z: lz2, sp: 2.2 });
}
for (var s = 0; s < (lite ? 14 : 44); s++) {
var sx = -200 + R() * 300, sz = -240 + R() * 260;
if (kgnWater(sx, sz))
continue;
var sf = kgnFairy(KGN_FAIRY_COLS[s % 8], 0.9);
sf.position.set(X(sx), 0.05, sz);
N.add(sf);
KGN.fairies.push({ g: sf, k: "wander", x: X(sx), z: sz, ph: R() * 6, r: 3 + R() * 4 });
}
for (var w = 0; w < (lite ? 16 : 40); w++) {
var wx = w % 2 ? X(KGN_BW.x + KGN_BW.hw + 2) : X(-150 + ((w >> 1) % 2 ? 2.6 : -2.6)), wz = w % 2 ? KGN_BW.z0 + 20 + (w >> 1) * ((KGN_BW.z1 - KGN_BW.z0 - 40) / 20) : -226 + (w >> 1) * (150 / 20);
var lam = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), dlnGlow(0xFF9A3A));
lam.position.set(wx, 1.2 + (w % 3) * 0.3, wz);
N.add(lam);
}
var moon = new THREE.Mesh(new THREE.SphereGeometry(18, 16, 12), new THREE.MeshBasicMaterial({ color: 0xF4F0E0, fog: false }));
moon.position.set(X(-300), 260, -620);
N.add(moon);
var mg = wGlow(0xE8E8FF, 120, 0.25);
mg.position.copy(moon.position);
N.add(mg);
for (var st = 0; st < (lite ? 40 : 120); st++) {
var sx2 = X(KGN_POND.x + (R() - 0.5) * 90), sz2 = KGN_POND.z + (R() - 0.5) * 90;
if (Math.hypot(sx2 - X(KGN_POND.x), sz2 - KGN_POND.z) > KGN_POND.r - 2)
continue;
var ds = new THREE.Mesh(new THREE.CircleGeometry(0.08, 5), dlnGlow(0xE8ECFF));
ds.rotation.x = -Math.PI / 2;
ds.position.set(sx2, 0.07, sz2);
N.add(ds);
}
var tn = kgnThrushNest(true);
tn.position.set(X(KGN_LW.x0 + 3), 0.08, -40);
tn.rotation.y = Math.PI / 2;
N.add(tn);
KGN.nest = tn;
var hg = new THREE.Group();
hg.position.set(X(-282), 0, -186);
N.add(hg);
KGN.house = { g: hg, stage: 0, parts: [] };
var gt = kgnGoat();
gt.position.set(X(KGN_POND.x - KGN_POND.r - 10), 0, 20);
N.add(gt);
KGN.goat = gt;
gt.visible = false;
N.traverse(function (o) { o.userData.keep = 1; });
var mabP = { g: mab, key: "kgn_mab", wander: null, ground: 0.05 };
SHK.talk.push({ p: mabP, name: "Queen Mab", r: 2.6, t: { name: "Queen Mab", persona: KGN_ERA.replace("It is a summer's day", "It is night, after Lock-out Time,") + "You are Queen Mab, the queen of the fairies of Kensington Gardens, from J. M. Barrie's The Little White Bird (keep to the BOOK, never any film or play). You are tiny, proud, quick-tempered and grand. Your palace is built of many-coloured glass and the common fairies press their noses against it, which is why their noses are snubby. Peter Pan is your fairies' orchestra. The Duke of Christmas Daisies has a cold heart. Humans may not be in the Gardens after Lock-out, but this visitor seems harmless (perhaps a friend of Maimie Mannering's). You speak grandly and briefly.", greet: "A human! After Lock-out Time! ... Well. You may stay, since you are so very large and so very quiet. Do not tread on anyone." } });
},
function (n) {
var H = KGN.house;
if (!H)
return;
n = Math.max(0, Math.min(KGN_HOUSE.length, n));
while (H.parts.length) {
var p = H.parts.pop();
if (p.parent)
p.parent.remove(p);
}
H.stage = n;
var g = H.g, add = function (m) { m.userData.keep = 1; H.parts.push(m); if (!m.parent)
g.add(m); return m; };
var painted = n > 11, wall = dlnC(painted ? 0xF4E8D0 : 0xC8A878), trim = dlnC(painted ? 0x2E6A3A : 0x8A6A44);
if (n > 0)
add(dlnBox(g, 1.3, 0.55, 0.75, wall, 0, 0.28, 0));
if (n > 1) {
var rf = dlnGable(g, 1.4, 0.85, 0.35, dlnC(0x8A3A2A), 0, 0.55, 0, 0);
add(rf);
}
if (n > 2)
[-0.38, 0.38].forEach(function (x) { add(dlnBox(g, 0.2, 0.16, 0.02, dlnGlow(0xFFE8B0), x, 0.32, 0.38)); });
if (n > 3) {
add(dlnBox(g, 0.5, 0.03, 0.3, trim, 0.35, 0.05, 0.53));
[0.15, 0.55].forEach(function (x) { add(dlnBox(g, 0.02, 0.25, 0.02, trim, x, 0.17, 0.66)); });
}
if (n > 4)
add(dlnBox(g, 0.14, 0.26, 0.02, dlnC(0x5A2A1A), 0, 0.14, 0.38));
if (n > 5)
add(dlnBox(g, 0.1, 0.25, 0.1, dlnC(0x8A3A2A), 0.4, 0.82, -0.1));
if (n > 6) {
for (var i = 0; i < 3; i++) {
var sm = new THREE.Mesh(new THREE.SphereGeometry(0.06 + i * 0.025, 6, 5), new THREE.MeshBasicMaterial({ color: 0xD8DCE4, transparent: true, opacity: 0.5 - i * 0.12, depthWrite: false }));
sm.position.set(0.4 + i * 0.05, 1.02 + i * 0.12, -0.1);
add(sm);
}
}
if (n > 7) {
var gw = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 4), dlnGlow(0xC8FF8A));
gw.position.set(-0.2, 0.05, 0.5);
add(gw);
add(dlnCyl(g, 0.04, 0.03, 0.008, dlnC(0xF4F4F8), -0.2, 0.03, 0.5, 10));
}
if (n > 8)
add(dlnCyl(g, 0.008, 0.008, 0.012, dlnShine(0xD8B048, 0.3, 0.9), 0.05, 0.14, 0.395, 6));
if (n > 9) {
add(dlnBox(g, 0.06, 0.02, 0.02, dlnC(0x2A2A2A), 0.12, 0.02, 0.45));
add(dlnBox(g, 0.14, 0.006, 0.08, dlnC(0x8A4A3A), 0, 0.006, 0.46));
}
if (n > 10)
add(dlnCyl(g, 0.06, 0.06, 0.13, dlnC(0x6A4A2A), -0.62, 0.07, 0.3, 8));
if (n > 12)
add(dlnCyl(g, 0.008, 0.008, 0.4, dlnShine(0xB87A3A, 0.3, 0.8), -0.6, 0.3, -0.3, 5));
if (n > 13) {
add(kgnFlowerBed(g, 0.95, 0.2, 0.5, 0.5, 808));
var veg = dlnBox(g, 0.5, 0.03, 0.5, dlnC(0x3A2A1A), -1.0, 0.02, 0.2);
add(veg);
for (var v = 0; v < 9; v++)
add(dlnBox(g, 0.04, 0.06, 0.04, dlnC(0x4A8A3A), -1.18 + (v % 3) * 0.18, 0.06, 0.02 + Math.floor(v / 3) * 0.18));
}
if (n > 14)
for (var r = 0; r < 14; r++) {
var ro = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 4), dlnC(r % 2 ? 0xE84A6A : 0xC88AE8));
ro.position.set(-0.6 + (r % 7) * 0.2, 0.12 + Math.floor(r / 7) * 0.22, 0.385);
add(ro);
}
},
function (on, snow) {
KGN.night = !!on;
KGN.snow = !!(on && snow);
if (KGN.nightG)
KGN.nightG.visible = KGN.night;
if (KGN.board && KGN.board.material && KGN.board.material.map) { }
if (KGN.snowP)
KGN.snowP.visible = KGN.snow;
if (KGN.snow && !KGN.snowP)
kgnSnowMake();
try {
SHK.envKey = null;
}
catch (e) { }
},
function () {
var n = DLN.lite ? 500 : 1500, pos = new Float32Array(n * 3), R = wRand(77);
for (var i = 0; i < n; i++) {
pos[i * 3] = (R() - 0.5) * 60;
pos[i * 3 + 1] = R() * 20;
pos[i * 3 + 2] = (R() - 0.5) * 60;
}
var gm = new THREE.BufferGeometry();
gm.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var p = new THREE.Points(gm, new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.12, transparent: true, opacity: 0.85, depthWrite: false }));
p.userData.keep = 1;
p.frustumCulled = false;
SHK.G.add(p);
KGN.snowP = p;
},
function (dt, t) {
if (!KGN.night || !KGN.fairies)
return;
var tempo = KGN.tempo || 1;
KGN.fairies.forEach(function (F) {
var g = F.g, w = g.userData.wings;
if (w) {
var f = Math.sin(t * 5 + F.ph) * 0.35;
w[0].rotation.y = 0.5 + f;
w[1].rotation.y = -0.5 - f;
}
if (F.k === "dance") {
F.a += dt * 0.5 * tempo;
g.position.set(F.cx + Math.cos(F.a) * F.r, 0.05 + Math.abs(Math.sin(t * 2 * tempo + F.ph)) * 0.12, F.cz + Math.sin(F.a) * F.r);
g.rotation.y = -F.a;
}
else if (F.k === "hover")
g.position.y = F.y + Math.sin(t * 1.4 + F.ph) * 0.04;
else if (F.k === "walk") {
F.z += dt * F.sp;
if (F.z > F.z1)
F.z = F.z0;
g.position.set(F.x, 0.05 + Math.abs(Math.sin(t * 4 + F.ph)) * 0.05, F.z);
g.rotation.y = 0;
}
else if (F.k === "lancer") {
F.z += dt * F.sp;
if (F.z > KGN_BW.z1 - 10)
F.z = KGN_BW.z0 + 10;
g.position.set(F.x, Math.abs(Math.sin(t * 8)) * 0.03, F.z);
}
else if (F.k === "wander") {
g.position.set(F.x + Math.cos(t * 0.3 + F.ph) * F.r, 0.3 + Math.sin(t * 0.9 + F.ph) * 0.25, F.z + Math.sin(t * 0.3 + F.ph) * F.r);
g.rotation.y = -(t * 0.3 + F.ph);
}
});
if (KGN.goat && KGN.goat.visible && KGN.goatRide) {
var a = t * 0.05;
KGN.goat.position.set(kgX(KGN_POND.x + Math.cos(a) * (KGN_POND.r + 9)), 0, KGN_POND.z + Math.sin(a) * (KGN_POND.r + 9));
KGN.goat.rotation.y = -a;
}
if (KGN.snowP && KGN.snow) {
var L = worldLocal();
KGN.snowP.position.set(L.x, 0, L.z);
var p = KGN.snowP.geometry.attributes.position;
for (var i = 0; i < p.count; i++) {
var y = p.getY(i) - dt * 1.2;
if (y < 0)
y += 20;
p.setY(i, y);
}
p.needsUpdate = true;
}
},
function (title, quote, notes) {
var b = "<div style='font:600 16px Georgia;color:#FFE7B0'>" + esc(title) + "</div>" + (quote ? "<p style='font:italic 14px/1.55 Georgia;margin:8px 0'>" + esc(quote) + "</p>" : "") +
(notes && notes.length ? "<div style='font-size:13px;opacity:.9;line-height:1.5'>" + notes.map(function (n) { return "<p style='margin:5px 0'>" + esc(n) + "</p>"; }).join("") + "</div>" : "");
worldCard(b, {});
kgnReward("tale");
},
function () {
KGN.dig = (KGN.dig || 0) + 1;
var r = KGN.dig;
if (r < 3) {
setStatus("⛏️ You dig at the foot of Cecco's Tree, with your fingers and a stick. Nothing yet" + (r === 2 ? ", only a button and a worm. Keep digging." : ". \"There has been a good deal of excavation going on there ever since.\""));
if (typeof playTone === "function")
playTone(300, 0.05);
return;
}
KGN.dig = 0;
var two = Math.random() < 0.4;
worldCard("<div style='font:600 16px Georgia;color:#FFE7B0'>🪙 " + (two ? "Twopence!" : "A penny!") + "</div><p style='font:italic 14px/1.55 Georgia'>" + (two ? "Like Cecco himself: you were looking for a penny and you found twopence." : "An old penny with the old Queen's head on it, green from the ground. Somebody lost it, and now it's found.") + "</p>", {});
if (typeof playTone === "function")
playTone(980, 0.06);
kgnReward("cecco");
},
function () {
if (KGN.race)
return;
var L = kgnLocal();
if (Math.abs(L.z - 106) > 6)
return;
var R = wRand(Date.now() % 1000), boys = [];
for (var i = 0; i < 2; i++) {
var p = dlnPerson("kgrace" + i, i ? "sailorboy" : "boy");
p.position.set(kgX(KGN_BW.x + (i ? 3 : -3)), 0.14, 108);
p.rotation.y = Math.PI;
SHK.live.add(p);
boys.push({ g: p, sp: 5.0 + R() * 0.8 });
}
KGN.race = { t: 0, boys: boys, go: false, cd: 3 };
setStatus("🏁 <b>The Hump.</b> Two boys of the Broad Walk line up beside you. Three... two... one...");
},
function (dt) {
var Ra = KGN.race;
if (!Ra)
return;
var L = kgnLocal();
if (!Ra.go) {
Ra.cd -= dt;
if (Ra.cd <= 0) {
Ra.go = true;
setStatus("🏁 <b>Go!</b> Race down the Hump to the red posts!");
if (typeof playTone === "function")
playTone(880, 0.08);
}
return;
}
Ra.t += dt;
var lead = 0;
Ra.boys.forEach(function (B) { if (B.g.position.z < 194)
B.g.position.z += B.sp * dt; var u = (B.g.position.z - 110) / 80; B.g.position.y = 0.14 + Math.sin(Math.max(0, Math.min(1, u)) * Math.PI) * 0.9; B.g.rotation.y = Math.PI; lead = Math.max(lead, B.g.position.z); });
worldBanner("🏁 <b>Racing down the Hump</b> · " + Ra.t.toFixed(1) + " s" + (lead >= 194 ? " · a boy is home!" : ""));
if (L.z >= 192 && Math.abs(L.x - KGN_BW.x) < KGN_BW.hw + 2) {
var won = lead < 192;
kgnRaceEnd(won ? "🏆 <b>You win!</b> First to the red posts, in " + Ra.t.toFixed(1) + " seconds. \"Even though you had no intention of running you do run when you come to the Hump.\"" : "🏁 <b>Home!</b> In " + Ra.t.toFixed(1) + " seconds; the boys beat you, but only just. \"It is glorious fun racing down the Hump.\"", true);
return;
}
if (Ra.t > 40 || Math.abs(L.x - KGN_BW.x) > 40 || L.z < 80)
kgnRaceEnd("The race is off. The boys go back to their hoops.", false);
},
function () {
worldCard("<div style='font:600 16px Georgia;color:#FFE7B0'>🏠 The Lost House</div><p style='font:italic 14px/1.55 Georgia'>\"Often you stop when you have run about half-way down it, and then you are lost, but there is another little wooden house near here, called the Lost House, and so you tell the man that you are lost and then he finds you.\"</p>" +
worldBtn("lost", "\"Please, I am lost.\"", "Tell the man") + worldBtn("no", "Look at the things that have been found", ""), {
lost: function () { worldCard("<div style='font:600 16px Georgia;color:#FFE7B0'>🏠 Found!</div><p>The keeper writes your name in his big book, looks at you over his spectacles, looks out of the window, and then looks at you again.</p><p style='font:italic 14px Georgia'>\"Well now. Here you are. Found.\"</p><p>He shakes your hand very solemnly. You are not lost any more.</p>", {}); kgnReward("lost"); },
no: function () { worldCard("<div style='font:600 16px Georgia;color:#FFE7B0'>🏠 Lost and found</div><p>A red ball, a hoop, one glove (a lady's), a sash, and a child's spade. \"Peter found his paddle near St Govor's Well: a child's spade, which he thought was a paddle.\" This must be another one.</p>", {}); }
});
},
function () {
worldCard("<div style='font:600 16px Georgia;color:#FFE7B0'>🫖 Picnic Street</div><p>The kettle sings on its little spirit-stove. Bread and butter, a seed cake, and milk for the little ones. You hold out your mug...</p><p style='font:italic 14px Georgia'>... and a white chestnut-blossom drops into it, just as the book says it will.</p><p style='font-size:12px;opacity:.75'>\"Quite common children picnic here also, and the blossom falls into their mugs just the same.\"</p>", {});
kgnReward("picnic");
},
function () {
var balls = 6, runs = 0, ball = 0, pos = 0, dir = 0, live = false, timer = null, speed = 1;
var draw = function (msg) {
var b = "<div style='font:600 16px Georgia;color:#FFE7B0'>🏏 Cricket on the pitches</div><p style='font-size:13px'>Angela Clare is bowling. Press <b>Swing!</b> when the ball is in the gold box. " + (msg || "") + "</p>" +
"<div style='position:relative;height:26px;margin:8px 0;background:#3A5A2A;border-radius:4px'><div style='position:absolute;left:70%;width:14%;top:0;bottom:0;background:rgba(232,200,112,.45);border-left:2px solid #E8C870;border-right:2px solid #E8C870'></div>" +
"<div id='kgn-ball' style='position:absolute;left:" + (pos * 96) + "%;top:6px;width:14px;height:14px;border-radius:7px;background:#B82A2A'></div></div>" +
"<div style='font-size:13px'>Ball " + Math.min(ball + 1, balls) + " of " + balls + " · runs: <b>" + runs + "</b></div>";
b += worldBtn("swing", "Swing!", "") + worldBtn("stop", "Stop playing", "");
worldCard(b, { swing: swing, stop: function () { clearInterval(timer); worldCard(null); } });
};
var bowl = function () {
if (ball >= balls) {
clearInterval(timer);
var msg = runs >= 12 ? "A fine innings! Angela Clare says you'll do." : runs >= 6 ? "Not bad at all, against those yorkers." : "Angela Clare's yorkers were too much (they are too much for everybody).";
worldCard("<div style='font:600 16px Georgia;color:#FFE7B0'>🏏 Stumps!</div><p>You made <b>" + runs + "</b> runs off six balls. " + msg + "</p><p style='font-size:12px;opacity:.75'>\"Frequently the choosing of sides exhausts so much time that there is scarcely any cricket.\" Not today.</p>", {});
kgnReward("cricket");
return;
}
pos = 0;
live = true;
speed = 0.9 + Math.random() * 0.6;
};
var swing = function () {
if (!live)
return;
live = false;
var hit = pos > 0.7 && pos < 0.84, edge = pos > 0.64 && pos < 0.9;
var r = hit ? (Math.random() < 0.4 ? 4 : 2) : edge ? 1 : 0;
runs += r;
ball++;
draw(hit ? (r === 4 ? "Four! Right to the Round Pond." : "Two runs, well hit.") : edge ? "An edge: one run." : "Missed! Bowled her a yorker.");
setTimeout(bowl, 900);
};
timer = setInterval(function () {
if (!WLD.card || WLD.card.style.display !== "block") {
clearInterval(timer);
return;
}
if (!live)
return;
pos += 0.03 * speed;
var el = document.getElementById("kgn-ball");
if (el)
el.style.left = (Math.min(pos, 1) * 96) + "%";
if (pos > 1) {
live = false;
ball++;
draw("Missed! Clean bowled.");
setTimeout(bowl, 900);
}
}, 50);
bowl();
draw("");
},
function () {
if (KGN.stick)
return;
var b = kgnStickModel();
var L = kgnLocal(), a = Math.atan2(L.z - KGN_POND.z, L.x - KGN_POND.x);
KGN.stick = { g: b, a0: a, last: a, turned: 0, said: 0 };
KGN.live.add(b);
setStatus("⛵ <b>A stick-boat.</b> \"She is rather like a stick until she is in the water and you are holding the string.\" Now walk all the way round the Round Pond, and she will follow.");
},
function (dt, t) {
var S = KGN.stick;
if (!S)
return;
var L = kgnLocal(), d = Math.hypot(L.x - KGN_POND.x, L.z - KGN_POND.z), a = Math.atan2(L.z - KGN_POND.z, L.x - KGN_POND.x);
if (d > KGN_POND.r + 14) {
worldBanner("⛵ <b>The stick-boat</b> · the string has gone slack: come back to the edge of the pond");
return;
}
var da = a - S.last;
while (da > Math.PI)
da -= Math.PI * 2;
while (da < -Math.PI)
da += Math.PI * 2;
S.last = a;
S.turned += da;
var ba = a - Math.sign(S.turned || 1) * 0.08, br = KGN_POND.r - 4;
S.g.position.set(kgX(KGN_POND.x + Math.cos(ba) * br), 0.08, KGN_POND.z + Math.sin(ba) * br);
S.g.rotation.y = -ba + (S.turned > 0 ? Math.PI : 0);
S.g.rotation.z = Math.sin(t * 2) * 0.12;
var frac = Math.abs(S.turned) / (Math.PI * 2), n = Math.min(KGN_VOYAGE.length, Math.floor(frac * 5) + 1);
if (n > S.said) {
S.said = n;
setStatus("⛵ " + KGN_VOYAGE[n - 1]);
}
worldBanner("⛵ <b>The stick-boat</b> · round the Round Pond: " + Math.min(100, Math.round(frac * 100)) + "%");
if (frac >= 1) {
if (S.g.parent)
S.g.parent.remove(S.g);
KGN.stick = null;
worldCard("<div style='font:600 16px Georgia;color:#FFE7B0'>⛵ Home from the sea</div><p style='font:italic 14px/1.55 Georgia'>\"You know not, when it is time to go home, where you have been or what swelled your sails; your treasure-trove is all locked away in your hold, so to speak, which will be opened, perhaps, by another little boy many years afterward.\"</p>", {});
kgnReward("stickboat");
}
},
function () {
var pick = {}, step = function () {
var b = "<div style='font:600 16px Georgia;color:#FFE7B0'>📄 A paper boat for the island</div><p style='font:italic 13px/1.5 Georgia'>\"You may write what you want (boy or girl, dark or fair) on a piece of paper, and then twist it into the shape of a boat and slip it into the water, and it reaches Peter Pan's island after dark.\"</p>";
if (!pick.k) {
b += worldBtn("boy", "\"A boy, please\"", "") + worldBtn("girl", "\"A girl, please\"", "") + worldBtn("either", "\"Either, if it is a nice one\"", "");
}
else if (!pick.c) {
b += "<p>A " + pick.k + ". Dark or fair?</p>" + worldBtn("dark", "Dark", "") + worldBtn("fair", "Fair", "") + worldBtn("any", "Whichever Solomon thinks best", "");
}
worldCard(b, { boy: function () { pick.k = "boy"; step(); }, girl: function () { pick.k = "girl"; step(); }, either: function () { pick.k = "baby"; step(); }, dark: function () { pick.c = "dark"; launch(); }, fair: function () { pick.c = "fair"; launch(); }, any: function () { pick.c = "any"; launch(); } });
};
var launch = function () {
worldCard(null);
var g = new THREE.Group(), m = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.14, 4), dlnC(0xF8F6EE));
m.rotation.x = Math.PI;
m.scale.z = 2;
m.position.y = 0.07;
g.add(m);
g.userData.keep = 1;
g.position.set(kgX(KGN_LW.x0 + 1), 0.06, 96);
KGN.live.add(g);
KGN.paper = { g: g, t: 0 };
setStatus("📄 You fold the paper into a little boat, write \"" + (pick.k === "baby" ? "a nice one" : "a " + pick.c + " " + pick.k).replace("any ", "") + "\" on it, and slip it into the water. It sails off towards the bridge and the island beyond. Write your address clearly next time: Solomon has sent a lot of babies to the wrong house.");
kgnReward("paperboat");
};
step();
},
function (dt) { var P = KGN.paper; if (!P)
return; P.t += dt; var u = Math.min(1, P.t / 40), x = KGN_LW.x0 + 1 + (KGN_ISLE.x - KGN_ISLE.r - KGN_LW.x0 - 1) * u, z = 96 + (KGN_ISLE.z - 96) * u; P.g.position.set(kgX(x + Math.sin(P.t * 0.6) * 1.2), 0.06, z); P.g.rotation.y = Math.sin(P.t * 0.4) * 0.6; if (u >= 1) {
if (P.g.parent)
P.g.parent.remove(P.g);
KGN.paper = null;
} },
function () {
if (KGN.hunt) {
setStatus("🌷 Stare down the flowers: walk up to one in the Basin and press E, and stare (stand still) until it winks.");
return;
}
var R = wRand(Date.now() % 9973), H = { found: 0, need: 4, spots: [] };
KGN.hunt = H;
for (var i = 0; i < 9; i++) {
var a = i / 9 * Math.PI * 2 + R() * 0.3, r = 4 + R() * 6, x = kgX(-112 + Math.cos(a) * r), z = -60 + Math.sin(a) * r, isF = i % 2 === 0;
(function (isF, x, z, i) {
var col = [0xE82A3A, 0xF4E040, 0xF4F0F0, 0x9A6AD8, 0xE87AB0][i % 5], fl = new THREE.Group();
var st = dlnBox(fl, 0.03, 0.4, 0.03, dlnC(0x3A6A2A), 0, 0.2, 0);
var hd = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.16, 6), dlnC(col));
hd.rotation.x = Math.PI;
hd.position.y = 0.45;
fl.add(hd);
fl.position.set(x, 0.05, z);
fl.userData.keep = 1;
KGN.live.add(fl);
var S = shkSpot(x, z, 1.4, "A flower (" + ["a tulip", "a hyacinth", "a white tulip", "a crocus", "a sweet william"][i % 5] + ")", "stare it down", function () {
if (S.done)
return;
var L0 = worldLocal();
setStatus("👁️ You stare at it, and stare, and keep still...");
setTimeout(function () {
var L1 = worldLocal();
if (Math.hypot(L1.x - L0.x, L1.z - L0.z) > 0.6) {
setStatus("You moved, and it is only a flower again. Try once more, and keep still.");
return;
}
S.done = true;
if (isF) {
H.found++;
hd.material = dlnC(0xFFF0D0);
var gl = wGlow(0xFFF0D0, 0.6, 0.6);
gl.position.y = 0.5;
fl.add(gl);
setStatus("✨ <b>It winked!</b> That one is a fairy, pretending. (" + H.found + " of " + H.need + ")");
if (typeof playTone === "function")
playTone(1320, 0.05);
if (H.found >= H.need) {
kgnHuntEnd(true);
}
}
else
setStatus("It doesn't wink. Only a flower, or else a very good pretender.");
}, 3200);
});
H.spots.push({ S: S, g: fl });
})(isF, x, z, i);
}
setStatus("🌷 <b>The Fairies' Basin.</b> \"Most of them really are flowers, but some of them are fairies.\" Walk up to a flower and stare it down (press E and keep still) until it winks. Find four fairies.");
},
function (ok) {
var H = KGN.hunt;
KGN.hunt = null;
if (!H)
return;
setTimeout(function () { H.spots.forEach(function (s) { var j = SHK.spots.indexOf(s.S); if (j >= 0)
SHK.spots.splice(j, 1); if (s.g.parent)
s.g.parent.remove(s.g); }); }, ok ? 6000 : 0);
if (ok) {
worldCard("<div style='font:600 16px Georgia;color:#FFE7B0'>✨ Four fairies!</div><p style='font:italic 14px/1.55 Georgia'>\"After a long time they can't help winking, and then you know for certain that they are fairies.\"</p><p>They will rush home and tell their mothers they have had such an adventure.</p>", {});
kgnReward("fairies");
}
},
function (dt, t) {
kgnRaceTick(dt);
kgnStickTick(dt, t);
kgnPaperTick(dt);
if (KGN.feedT > 0) {
KGN.feedT -= dt;
var L = kgnLocal(), a = Math.atan2(L.z - KGN_POND.z, L.x - KGN_POND.x);
KGN.ducks.forEach(function (D) { if (!D.pond)
return; var da = a - D.a; while (da > Math.PI)
da -= Math.PI * 2; while (da < -Math.PI)
da += Math.PI * 2; D.a += da * dt * 0.6; D.r += (KGN_POND.r - 4 - D.r) * dt * 0.5; });
}
},
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "in:" + room : kgbArea(), Lc = worldLocal();
list.forEach(function (T) {
if (!(re ? re.test(T.name || "") : (T.name === name)))
return;
var p = T.p ? kgbLoc(T.p.g) : { x: T.x, z: T.z, y: T.y };
if (!p)
return;
var a = kgbAreaAt(p.x, p.z);
var P = { x: p.x, z: p.z, y: p.y != null ? p.y : 0, area: a };
if (room && a !== here)
return;
P.d = Math.hypot(P.x - Lc.x, P.z - Lc.z);
if (!out || (a === here && (out.area !== here || P.d < out.d)))
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
var W = kgbNamed(SHK.talk, at.who, at.room);
if (W)
return W;
var C0 = KGB_CH[kgbS().ch], d0 = C0 && C0.cast ? C0.cast.filter(function (d) { return d.name === at.who; })[0] : null;
if (d0 && d0.at !== at)
return kgbPos(d0.at);
}
if (at.spot) {
var Sp = kgbNamed(SHK.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.cast) {
var c = KGB.cast[at.cast], q = c && c.g && c.g.parent ? kgbLoc(c.g) : null;
if (q)
return { x: q.x, z: q.z, y: q.y, area: kgbAreaAt(q.x, q.z) };
}
if (at.room)
return kgbRoomPt(at.room, at.lx, at.lz);
if (at.at && KGN_PLACES[at.at]) {
var A = KGN_PLACES[at.at], ax = kgX(A.x + (at.dx || 0)), az = A.z + (at.dz || 0);
return { x: ax, z: az, y: shkGround(ax, az, 2), area: "kg" };
}
if (at.x != null) {
var x = kgX(at.x);
return { x: x, z: at.z, y: at.y != null ? at.y : shkGround(x, at.z, 2), area: kgbAreaAt(x, at.z), name: at.name };
}
return null;
},
function (P, area) {
if (!P)
return null;
if (P.area === area)
return { show: P, way: "" };
if (area.indexOf("in:") === 0) {
var D = SHK_ROOMS[area.slice(3)];
if (P.area.indexOf("in:") === 0 && D && D.out && D.out === (SHK_ROOMS[P.area.slice(3)] || {}).out)
return { show: kgbRoomExit(), way: " (through the doors)" };
return { show: kgbRoomExit(), way: " (go out)" };
}
var target = P, inn = "";
if (P.area.indexOf("in:") === 0) {
target = kgbRoomDoor((SHK_ROOMS[P.area.slice(3)] || {}).out || P.area.slice(3));
inn = " (go in)";
if (!target)
return { show: null, way: " (the book will take you)" };
}
if (target.area === area)
return { show: target, way: inn };
if (area === "gos") {
var c = DLN_PLACES.cab;
return { show: { x: dlnX(c.x), z: c.z, y: 0, area: "gos" }, way: " (the cab rank: a cab to Kensington Gardens)" };
}
if (area === "kg") {
return { show: { x: kgX(KGN_CAB.x), z: KGN_CAB.z, y: 0, area: "kg" }, way: " (the cab rank on Bayswater Road)" };
}
return { show: null, way: " (the 🎭 menu: London, 1912)" };
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
return (d >= 1000 ? (d / 1000).toFixed(1) + " km " : Math.round(d) + " m ") + w;
},
function () {
if (KGB.beam && KGB.beam.parent)
return KGB.beam;
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
SHK.G.add(g);
KGB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m, bk = dlnC;
switch (kind) {
case "crust":
m = wBox(0.12, 0.04, 0.08, wM(0xC8964A), 0, 0.02, 0, g);
break;
case "reed":
m = wBox(0.015, 0.5, 0.015, wM(0x9AA860), 0, 0.25, 0, g);
break;
case "twig":
m = wBox(0.02, 0.02, 0.5, wM(0x6A5030), 0, 0.02, 0, g);
break;
case "grass":
m = wBox(0.18, 0.06, 0.18, wM(0x7A9A4A), 0, 0.03, 0, g);
break;
case "mud":
m = wSph(0.1, wM(0x5A4028), 0, 0.05, 0, g, 8);
m.scale.y = 0.5;
break;
case "note":
m = wBox(0.18, 0.06, 0.1, wM(0xF4F0E4), 0, 0.03, 0, g);
break;
case "kite":
m = wBox(0.7, 0.02, 0.9, wM(0xF4F0E8), 0, 0.02, 0, g);
m.rotation.y = 0.7;
break;
case "hoop":
m = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.015, 4, 18), wM(0x8A6A44));
m.rotation.x = Math.PI / 2;
m.position.y = 0.02;
g.add(m);
break;
case "balloon":
m = wSph(0.2, wM(0xD82A2A), 0, 0.5, 0, g, 10);
wBox(0.004, 0.5, 0.004, wM(0xE8E8E8), 0, 0.2, 0, g);
break;
case "spade":
m = wBox(0.12, 0.02, 0.18, wM(0x8A8A90), 0, 0.02, 0, g);
wBox(0.025, 0.025, 0.4, wM(0x8A6A44), 0, 0.02, 0.28, g);
break;
case "letter":
m = wBox(0.16, 0.004, 0.11, wM(0xEAE0C4), 0, 0.01, 0, g);
break;
case "plank":
m = wBox(0.3, 0.02, 0.06, wM(0xC8A878), 0, 0.02, 0, g);
break;
case "brick":
m = wBox(0.08, 0.04, 0.04, wM(0xA84A3A), 0, 0.02, 0, g);
break;
case "seed":
m = wSph(0.03, wM(0x6A4A2A), 0, 0.03, 0, g, 6);
break;
case "rose":
m = wSph(0.05, wM(0xE84A6A), 0, 0.05, 0, g, 8);
break;
case "pail":
m = wCyl(0.1, 0.08, 0.16, wM(0x2A6AA8), 0, 0.08, 0, g, 10);
break;
case "thimble":
m = wCyl(0.012, 0.014, 0.02, wM(0xC8C8C8, { m: 0.8, r: 0.3 }), 0, 0.01, 0, g, 10);
break;
default: m = wSph(0.08, wM(0xE8E0D0, { e: 0x4A4A5A, ei: 0.4 }), 0, 0.12, 0, g, 10);
}
var gl = wGlow(0xE8FFE0, 0.55, 0.5);
gl.position.y = 0.28;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
return g;
},
function (kind, P, name, verb, onTake) {
if (!P)
return null;
var g = kgbItemMesh(kind);
g.position.set(P.x, (P.y || 0) + 0.02, P.z);
SHK.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = shkSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (KGB.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = SHK.spots.indexOf(I.S);
if (j >= 0)
SHK.spots.splice(j, 1);
KGB.items = KGB.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(980, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[kgb] take", e);
}
}, (P.y || 0));
I.S.kgb = 1;
KGB.items.push(I);
return I;
},
function (k) {
if (KGB.tuneKey === k)
return;
KGB.tuneKey = k;
var old = KGB.tune;
KGB.tune = null;
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
if (!k || !KGB_TUNES[k])
return;
try {
var A = new Audio(KGB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
KGB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (KGB.tune !== A) {
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
if (KGB.text)
return fn(KGB.text);
if (KGB.textWait) {
KGB.textWait.push(fn);
return;
}
KGB.textWait = [fn];
var done = function (B) { KGB.text = B; var w = KGB.textWait; KGB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/kensington/little-white-bird.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
kgbText(function (B) {
var T = B && B.ch && B.ch[i], C = KGB_CH[i];
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3><div style='max-height:58vh;overflow:auto'>" + T.p.map(kgbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); KGB.readOpen = 0; KGB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = kgbS(), C = KGB_CH[S.ch];
if (!C)
return;
KGB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
KGB.readAsk = 0;
KGB.readOpen = 1;
var T = B && B.ch && B.ch[ch];
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : "J. M. Barrie, The Little White Bird (1902)") + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:46vh;overflow:auto'>" + (T ? kgbOpening(T).map(kgbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); KGB.readOpen = 0; kgbStepDone(); }, all: function () { kgbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the Gardens");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Barrie's own words, all of it");
b += kgbKeeperBtns(fns);
worldCard(b, fns);
};
kgbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
KGB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); kgbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = kgbS(), C = KGB_CH[S.ch];
if (!C)
return;
kgnBuild();
kgbItemsClear();
kgbCastClear();
KGB.hold = 0;
try {
kgnNightSet(!!C.night, !!C.snow);
}
catch (e) { }
if (place && C.start)
kgbPlaceAt(C.start);
try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[kgb] setup", S.ch, e);
}
kgbTune(C.tune || null);
kgbStepBegin();
},
function () {
var b = kgbStep();
kgbItemsClear();
KGB.hold = 0;
KGB.puzOpen = 0;
if (!b)
return;
b._key = kgbKey();
try {
if (b.on)
b.on(kgbS().f);
}
catch (e) {
if (window.console)
console.warn("[kgb] on", e);
}
if (b.k === "read") {
kgbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { KGB.rew[k] = 0; });
if (b.k === "find")
kgbItemAdd(b.item, kgbPos(b.at), b.name, b.verb, function () { if (kgbKey() === b._key)
kgbStepDone(); });
if (b.k === "gather") {
var P = kgbPos(b.at), n = b.n || 3, sp = b.spread || 5, R = wRand(kgbS().ch * 97 + kgbS().s * 13 + 7);
KGB.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
Q.y = shkGround(Q.x, Q.z, (P.y || 0) + 0.5);
if (P.area === "kg") {
var lx = Q.x - kgX(0);
if (kgnWater(lx, Q.z) && !b.wet) {
Q.x = P.x + Math.cos(a) * 1.2;
Q.z = P.z + Math.sin(a) * 1.2;
}
}
kgbItemAdd(b.item, Q, b.name, b.verb, function () { if (kgbKey() !== b._key)
return; KGB.got++; try {
if (b.each)
b.each(KGB.got);
}
catch (e) { } if (KGB.got < n) {
kgbSay((b.eachSay || "Got one.") + " " + KGB.got + " of " + n + ".");
return;
} kgbStepDone(); });
}
}
if (b.h)
kgbSay("<b>" + esc(KGB_CH[kgbS().ch].t) + ".</b> " + b.h);
},
function (b) {
KGB.puzOpen = 1;
KGB.puzT = performance.now();
var k = kgbKey(), fns = {}, h = KGB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
kgbSay(b.yes);
if (kgbKey() === k)
kgbStepDone();
return;
}
kgbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (kgbKey() === k)
KGB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = kgbS(), C = KGB_CH[S.ch], b = kgbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[kgb] done", e);
}
if (b.say)
kgbSay(b.say);
S.s++;
if (window.KGB_LOG)
KGB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= KGB_CH.length - 1) {
S.done = 1;
S.s = 0;
kgbSave();
kgbItemsClear();
kgbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
kgbSave();
var nx = KGB_CH[S.ch];
setTimeout(function () { try {
kgbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[kgb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
kgbSave();
kgbStepBegin();
},
function () {
kgbTune("pipe");
try {
kgnNightSet(false);
}
catch (e) { }
var S = kgbS();
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>\"Oh, he has a joyful time! But he has still a vague memory that he was a human once, and it makes him especially kind to the house-swallows when they revisit the island.\"</p><p style='font-size:12px;opacity:.75'>J. M. Barrie, The Little White Bird</p><p>Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p><p style='font-size:13px'>Peter goes on, in the Neverland: Nurse Price reads Peter and Wendy aloud in the ward at Great Ormond Street, and the Neverland book has all of it.</p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; kgbSave(); kgbChapterBegin(true); } };
b += worldBtn("again", "Walk the Gardens again from the start", "The Grand Tour");
worldCard(b, fns);
},
function () {
var S = kgbS(), C = KGB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>J. M. Barrie · The Little White Bird (1902) · Peter Pan in Kensington Gardens (1906)</div><h3 style='margin:4px 0'>🍃 Peter Pan in Kensington Gardens</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((kgbStep() || {}).h || "") + "</p>";
else
b += "<p>Before he ever went to the Neverland, Peter Pan was a baby who flew out of the window when he was seven days old, back to Kensington Gardens. Walk the Gardens the way David and the old Captain did, then stay after Lock-out Time: the island of the birds, the Thrush's Nest, the fairies' ball, the Little House, and Peter's goat. Six chapters, Barrie's own.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: the Black Lion Gate", S.started ? "Back to where you were" : "Bayswater Road, a summer afternoon, 1912");
fns.go = function () { worldCard(null); kgbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; kgbSave(); kgbBegin(); };
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += kgbKeeperBtns(fns);
worldCard(b, fns);
},
function (c) {
var C = KGB.cast[c.key];
if (kgbCastLive(C))
return C;
var P = kgbPos(c.at);
if (!P)
return null;
var inside = P.area.indexOf("in:") === 0, parent = inside ? (SHK.rooms[P.area.slice(3)] || {}).live : (c.kind && c.kind !== "person" ? KGN.live : SHK.live);
if (!parent)
return null;
var px = P.x + (c.ox || 0), pz = P.z + (c.oz || 0), py = c.y != null ? c.y : shkGround(px, pz, (P.y || 0) + 0.5) + (c.kind === "person" || !c.kind ? 0.14 : 0), g;
if (!c.kind || c.kind === "person") {
g = dlnPerson("kgb_" + c.key, c.dress, { sex: c.sex, child: !!c.child, inside: inside });
}
else if (c.kind === "fairy")
g = kgnFairy(c.col || 0xF4E8F8, c.s || 1.4, c.o || {});
else if (c.kind === "crow")
g = kgnSolomon();
else if (c.kind === "bird")
g = kgnBird(c.col, c.s || 1.6);
else if (c.kind === "goat")
g = kgnGoat();
else if (c.kind === "swan")
g = kgnSwan();
else
g = new THREE.Group();
g.position.set(px, py, pz);
g.rotation.y = c.ry || 0;
if (c.lie) {
g.rotation.x = -Math.PI / 2;
g.position.y += 0.25;
}
parent.add(g);
var Q = { g: g, key: "kgb_" + c.key, wander: c.wander ? { r: c.wander, sp: 0.5 } : null, ground: py };
if (!c.kind || c.kind === "person")
SHK.people.push(Q);
if (c.name) {
var T = { p: Q, name: c.name, r: c.r || (c.kind && c.kind !== "person" ? 2.4 : 3.2), t: { name: c.name, persona: c.persona || KGN_ERA, greet: c.greet || "Hallo." } };
SHK.talk.push(T);
kgbWrapT(T);
}
KGB.cast[c.key] = { g: g, P: Q, c: c };
return KGB.cast[c.key];
},
function () {
var C = KGB_CH[kgbS().ch];
if (!C || !C.cast)
return;
var b = kgbStep() || {}, idx = kgbS().s;
C.cast.forEach(function (c) {
if (c.from != null && idx < c.from)
return;
if (c.until != null && idx >= c.until) {
if (KGB.cast[c.key])
kgbCastHide(c.key);
return;
}
if (kgbCastLive(KGB.cast[c.key]))
return;
var P = kgbPos(c.at);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
if (!SHK.rooms[P.area.slice(3)])
return;
}
else if (kgbDist(P, worldLocal()) > 300 && b.who !== c.name)
return;
kgbPerson(c);
});
},
function (T) {
if (!kgbActive() || !kgnZoneNow())
return false;
var b = kgbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = kgbKey();
worldPrompt(null);
var next = function () { if (kgbKey() === k)
kgbStepDone(); };
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
worldCard(KGB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
function (dt) {
if (!SHK.G || !SHK.built)
return;
KGB.wt += dt;
if (KGB.wt > 0.5) {
KGB.wt = 0;
kgbWrap();
if (kgbActive())
kgbCastTick();
}
var cardOpen = WLD.card && WLD.card.style.display === "block", busy = cardOpen || WLD.promptFn || SHK.moving || KGN.race || KGN.stick;
if (!kgbActive()) {
if (KGB.beam)
KGB.beam.visible = false;
if (!busy)
worldPrompt("🍃 <b>Peter Pan in Kensington Gardens</b> · <b>press E</b> to walk the book", kgbOpen);
return;
}
var S = kgbS(), b = kgbStep(), L = worldLocal(), t = SHK.t || 0, area = kgbAreaAt(L.x, L.z);
KGB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? kgbPos(b.at) : null, W = P ? kgbWayTo(P, area) : null, show = W && W.show, way = W ? W.way : "", bm = kgbBeam();
if (show && !SHK.moving) {
bm.visible = true;
var cd = kgbDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
var outside = area.indexOf("in:") !== 0;
bm.userData.col.visible = outside && cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = kgbWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !SHK.moving) {
var inArea = P && P.area === area, fd = P ? kgbDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (KGB.readAsk)
break;
if (!KGB.readOpen)
kgbChapterCard();
else {
KGB.readOpen = 0;
kgbStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null ? true : fd < (b.r || 6))) {
kgbStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
KGB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(KGB.hold, dt);
}
catch (e) { }
if (KGB.hold >= (b.sec || 8)) {
kgbStepDone();
return;
}
}
else
KGB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return KGB.rew[k]; })) {
kgbStepDone();
return;
}
break;
case "until": {
var ok = false;
try {
ok = b.test(S.f);
}
catch (e) { }
if (ok) {
kgbStepDone();
return;
}
break;
}
case "puzzle":
if ((!KGB.puzOpen || performance.now() - (KGB.puzT || 0) > 3000) && (!P || (inArea && fd < (b.r || 6))))
kgbPuzzleCard(b);
break;
}
}
if (!busy)
worldPrompt("🍃 <b>Peter Pan in Kensington Gardens</b> · <b>press E</b> for the book", kgbOpen);
var C = KGB_CH[S.ch], prog = b && b.k === "hold" && KGB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - KGB.hold)) + " s)" : b && b.k === "gather" ? " (" + (KGB.got || 0) + " of " + (b.n || 3) + ")" : "";
if (!KGN.race && !KGN.stick)
worldBanner("🍃 <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function (x, z) {
if (z < KGN_N - 1)
return "Bayswater Road, by the Black Lion Gate";
if (z > KGN_S + 1)
return "Kensington Road";
if (Math.hypot(x - KGN_ISLE.x, z - KGN_ISLE.z) < KGN_ISLE.r + 2)
return "the birds' island in the Serpentine";
if (z >= KGN_BR.z0 - 2 && z <= KGN_BR.z1 + 2 && x > KGN_LW.x0 - 14 && x < KGN_LW.x1 + 14)
return "the Serpentine bridge";
if (x > KGN_LW.x0 - 16 && z < -230)
return "the Italian Gardens, Kensington Gardens";
if (x > KGN_LW.x1)
return "beside the Long Water (Hyde Park's side)";
if (x > KGN_LW.x0 - 16)
return z > KGN_BR.z1 ? "by the Serpentine" : "by the Long Water, Kensington Gardens";
if (Math.hypot(x - KGN_POND.x, z - KGN_POND.z) < KGN_POND.r + 12)
return "the Round Pond, Kensington Gardens";
if (Math.abs(x - KGN_BW.x) < KGN_BW.hw + 4)
return z > 105 && z < 195 ? "the Hump, the Broad Walk" : "the Broad Walk, Kensington Gardens";
if (x < KGN_BW.x - KGN_BW.hw - 6 && z < -120)
return "the Figs";
if (x < KGN_BW.x - KGN_BW.hw - 6)
return "before Kensington Palace";
if (Math.abs(x + 150) < 8 && z < -70)
return "the Baby Walk";
if (Math.hypot(x + 112, z + 60) < 16)
return "the Fairies' Basin";
if (Math.hypot(x - 60, z - 218) < 30)
return "the Albert Memorial";
if (Math.abs(z - 180) < 6)
return "the Flower Walk";
if (x > 70 && x < 170 && z > -215 && z < -115)
return "the sheep's fold";
return "Kensington Gardens";
},
function () {
var b = worldBtn("gos", "To Great Ormond Street", "The hospital, Queen Square, Lamb's Conduit Street") + worldBtn("south", "To Miss Mabel Grey's gate", "Kensington Road, by the Albert Memorial") + worldBtn("north", "To the Black Lion Gate", "Bayswater Road") + worldBtn("back", "Back to Bankside, 1600", "\"Three hundred years upstream, guv'nor? That'll be extra.\"");
worldCard(worldFacts("🎩 A hansom cab", "On the Bayswater Road", [], []) + b, {
gos: function () { worldCard(null); dlnGo("🎩 <b>Great Ormond Street.</b> The cab sets you down at the rank."); },
south: function () { worldCard(null); shkMove(kgX(KGN_BW.x), KGN_S + 3, 0, "🎩 <b>Kensington Road.</b> Miss Mabel Grey's gate is in front of you; the Albert Memorial shines to the east."); },
north: function () { worldCard(null); kgnGo("gate"); },
back: function () { worldCard(null); dlnTo1600(); }
});
},
function () {
var b = "<p style='font:italic 13px/1.5 Georgia'>" + esc(KGN_TALES.board) + "</p>";
b += KGN.night ? worldBtn("day", "Wait for the Opening of the Gates", "Morning: \"a grating creak, followed by creak, creak, all round the Gardens\"") : worldBtn("night", "Stay after Lock-out Time", "Hide when the bell rings, as Maimie did, and see the fairies come out");
worldCard(worldFacts("🕖 The board at the gate", "When the Gardens close today", [], []) + b, {
night: function () { worldCard(null); kgnNightSet(true); setStatus("🔔 The bell rings, the keepers call \"All out!\", the gates clang shut. You stay. And then, all over the Gardens, the little lights come out. <b>It is Lock-out Time.</b>"); },
day: function () { worldCard(null); kgnNightSet(false); setStatus("🌅 Creak, creak, all round the Gardens: the Opening of the Gates. The fairies are flowers again."); }
});
},
function (sec) {
var V = KGN.voy;
if (!V) {
V = KGN.voy = { t0: performance.now(), said: 0 };
try {
kgbTune("pipe");
}
catch (e) { }
}
var u = Math.min(1, (performance.now() - V.t0) / 1000 / (window.SBK_FAST ? 2 : (sec || 36))), n = KGN_VOY.length - 1, f = u * n, i = Math.min(n - 1, Math.floor(f)), k = f - i, A = KGN_VOY[i], B = KGN_VOY[i + 1];
var x = A[0] + (B[0] - A[0]) * k, z = A[1] + (B[1] - A[1]) * k, bob = Math.sin(performance.now() / 420) * 0.05, hd = Math.atan2(-(B[0] - A[0]), -(B[1] - A[1]));
if (KGN.nest) {
KGN.nest.position.set(kgX(x), 0.08 + bob, z);
KGN.nest.rotation.y = hd;
}
camera.position.set(SHK.base + kgX(x), 0.5 + bob + 1.3, z);
if (!V.look) {
yaw = hd;
V.look = 1;
}
var msgs = [[0.02, "⛵ The nightgown fills. At first the boat turns round and round and drives you back to where you started..."], [0.2, "⛵ Peter shortens sail, taking in a sleeve; a contrary breeze, and then the wind is behind you."], [0.42, "🌉 Under the bridge! The arches go over your head, dark and dripping."], [0.62, "🌳 The Long Water, and Kensington Gardens beckoning on both sides."], [0.88, "🏝️ \"A jolly harbour\": the little bay. And there are lights along its shore."]];
msgs.forEach(function (m, j) { if (u >= m[0] && V.said <= j) {
V.said = j + 1;
setStatus(m[1]);
} });
if (u >= 1) {
KGN.voy = null;
if (KGN.nest) {
KGN.nest.position.set(kgX(KGN_LW.x0 + 3), 0.08, -40);
KGN.nest.rotation.y = Math.PI / 2;
}
shkMove(kgX(KGN_LW.x0 - 6), -40, Math.PI / 2, null);
return true;
}
return false;
},
function () {
var H = KGN.house;
if (!H)
return true;
var V = KGN.shrink;
if (!V)
V = KGN.shrink = { t0: performance.now() };
var u = Math.min(1, (performance.now() - V.t0) / 1000 / (window.SBK_FAST ? 1 : 9));
H.g.scale.setScalar(Math.max(0.02, 1 - u * 0.97));
if (u >= 1) {
KGN.shrink = null;
H.g.visible = false;
return true;
}
return false;
},
function (add) {
var g = new THREE.Group(), steel = wfMat(0xD8DAE0, { m: 0.85, r: 0.25 }), gilt = wfMat(0xD8B048, { m: 0.85, r: 0.3 });
var cap = new THREE.Mesh(wfGeo("wslgc", function () { return new THREE.SphereGeometry(0.135, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.55); }), steel);
cap.scale.set(1, 1.15, 1.08);
g.add(cap);
var peak = new THREE.Mesh(wfGeo("wslgp", function () { return new THREE.CylinderGeometry(0.15, 0.15, 0.01, 18, 1, false, -Math.PI * 0.35, Math.PI * 0.7); }), steel);
peak.position.set(0, -0.01, 0.02);
g.add(peak);
var spike = new THREE.Mesh(wfGeo("wslgs", function () { return new THREE.CylinderGeometry(0.012, 0.02, 0.07, 8); }), gilt);
spike.position.y = 0.17;
g.add(spike);
var pl = new THREE.Mesh(wfGeo("wslgpl", function () { return new THREE.ConeGeometry(0.06, 0.42, 8); }), wfMat(0xFAFAF8, { r: 1 }));
pl.rotation.x = Math.PI;
pl.position.set(0, 0.06, -0.1);
pl.rotation.z = 0.1;
g.add(pl);
add("Head", [0, 0.12, -0.01], g);
},
function (add) {
var g = new THREE.Group();
g.add(new THREE.Mesh(wfGeo("wspole", function () { return new THREE.CylinderGeometry(0.012, 0.014, 2.6, 6); }), wfMat(0x6A4A2A)));
var h = new THREE.Mesh(wfGeo("wspoleh", function () { return new THREE.CylinderGeometry(0.02, 0.02, 0.12, 6); }), wfMat(0xB8963A, { m: 0.8, r: 0.35 }));
h.position.y = 1.3;
g.add(h);
add("hand_r", [0, 0.4, 0.05], g);
},
function (add) {
var g = new THREE.Group();
var b = new THREE.Mesh(wfGeo("wsswd", function () { return new THREE.BoxGeometry(0.02, 0.95, 0.006); }), wfMat(0xE0E2E8, { m: 0.9, r: 0.2 }));
b.position.y = 0.5;
g.add(b);
var hl = new THREE.Mesh(wfGeo("wsswh", function () { return new THREE.TorusGeometry(0.05, 0.008, 5, 10, Math.PI); }), wfMat(0xD8B048, { m: 0.85, r: 0.3 }));
g.add(hl);
add("hand_r", [0, 0.02, 0.04], g);
},
function (x, cx, cy, w, h, glass, frame) {
x.fillStyle = frame || "#8A7A60";
x.beginPath();
x.moveTo(cx - w / 2 - 3, cy + h);
x.lineTo(cx - w / 2 - 3, cy + w * 0.4);
x.quadraticCurveTo(cx - w / 2 - 3, cy - w * 0.3, cx, cy - w * 0.55);
x.quadraticCurveTo(cx + w / 2 + 3, cy - w * 0.3, cx + w / 2 + 3, cy + w * 0.4);
x.lineTo(cx + w / 2 + 3, cy + h);
x.fill();
x.fillStyle = glass || "#2A3440";
x.beginPath();
x.moveTo(cx - w / 2, cy + h - 2);
x.lineTo(cx - w / 2, cy + w * 0.4);
x.quadraticCurveTo(cx - w / 2, cy - w * 0.25, cx, cy - w * 0.48);
x.quadraticCurveTo(cx + w / 2, cy - w * 0.25, cx + w / 2, cy + w * 0.4);
x.lineTo(cx + w / 2, cy + h - 2);
x.fill();
},
function () {
return dlnTex("perp", 256, 512, function (x, W, H) {
x.fillStyle = "#C8B48A";
x.fillRect(0, 0, W, H);
dlnNoise(x, W, H, 1600, 0.16, 51, "90,70,40");
x.strokeStyle = "rgba(90,70,40,.55)";
x.lineWidth = 2;
for (var i = 0; i <= 8; i++) {
x.beginPath();
x.moveTo(i * W / 8, 0);
x.lineTo(i * W / 8, H);
x.stroke();
}
for (var r = 0; r < 4; r++) {
var y0 = r * H / 4;
x.strokeStyle = "rgba(80,60,30,.6)";
x.lineWidth = 3;
x.beginPath();
x.moveTo(0, y0 + 4);
x.lineTo(W, y0 + 4);
x.stroke();
for (var k = 0; k < 8; k++) {
var cx = k * W / 8 + W / 16;
x.strokeStyle = "rgba(80,60,30,.35)";
x.lineWidth = 1.5;
x.beginPath();
x.moveTo(cx - 10, y0 + 30);
x.quadraticCurveTo(cx, y0 + 12, cx + 10, y0 + 30);
x.stroke();
}
}
var wx = W * 0.2, ww = W * 0.6, wy = H * 0.3, wh = H * 0.42;
x.fillStyle = "#7A6A4E";
x.fillRect(wx - 6, wy - 14, ww + 12, wh + 20);
for (var l = 0; l < 3; l++)
wsLancet(x, wx + ww * (l + 0.5) / 3, wy + 6, ww / 3 - 8, wh - 10, "#2E3A48", "#7A6A4E");
x.fillStyle = "#C8B48A";
x.fillRect(wx - 6, wy + wh * 0.5, ww + 12, 6);
x.fillStyle = "#B8A07A";
for (var s = 0; s < 2; s++) {
x.beginPath();
x.moveTo(W * (0.25 + s * 0.5) - 12, H * 0.86);
x.lineTo(W * (0.25 + s * 0.5) + 12, H * 0.86);
x.lineTo(W * (0.25 + s * 0.5) + 12, H * 0.92);
x.quadraticCurveTo(W * (0.25 + s * 0.5), H * 0.96, W * (0.25 + s * 0.5) - 12, H * 0.92);
x.fill();
}
}, 4, 8);
},
function () {
return dlnTex("perpplain", 256, 256, function (x, W, H) {
x.fillStyle = "#C4B086";
x.fillRect(0, 0, W, H);
dlnNoise(x, W, H, 1200, 0.16, 53, "90,70,40");
x.strokeStyle = "rgba(90,70,40,.5)";
x.lineWidth = 2;
for (var i = 0; i <= 4; i++) {
x.beginPath();
x.moveTo(i * W / 4, 0);
x.lineTo(i * W / 4, H);
x.stroke();
}
for (var k = 0; k < 4; k++) {
var cx = k * W / 4 + W / 8;
x.strokeStyle = "rgba(80,60,30,.4)";
x.beginPath();
x.moveTo(cx - 20, H * 0.3);
x.quadraticCurveTo(cx, H * 0.1, cx + 20, H * 0.3);
x.lineTo(cx + 20, H * 0.9);
x.moveTo(cx - 20, H * 0.3);
x.lineTo(cx - 20, H * 0.9);
x.stroke();
}
}, 3, 3);
},
function () {
return dlnTex("louvre", 256, 256, function (x, W, H) {
x.fillStyle = "#C8B48A";
x.fillRect(0, 0, W, H);
for (var l = 0; l < 2; l++) {
var cx = W * (0.27 + l * 0.46);
wsLancet(x, cx, H * 0.2, W * 0.3, H * 0.72, "#1A1814", "#B8963A");
x.strokeStyle = "rgba(200,170,90,.8)";
x.lineWidth = 3;
for (var y = H * 0.3; y < H * 0.9; y += 14) {
x.beginPath();
x.moveTo(cx - W * 0.14, y);
x.lineTo(cx + W * 0.14, y);
x.stroke();
}
}
}, 3, 5);
},
function () {
return dlnTex("dial", 512, 512, function (x, W, H) {
x.fillStyle = "#1A3A2E";
x.fillRect(0, 0, W, H);
var c = W / 2, r = W * 0.46;
x.fillStyle = "#F6F2E2";
x.beginPath();
x.arc(c, c, r, 0, Math.PI * 2);
x.fill();
x.strokeStyle = "#1A1A1A";
x.lineWidth = 2;
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2;
x.beginPath();
x.moveTo(c, c);
x.lineTo(c + Math.sin(a) * r, c - Math.cos(a) * r);
x.stroke();
}
for (var ring = 0; ring < 3; ring++) {
x.beginPath();
x.arc(c, c, r * (0.25 + ring * 0.22), 0, Math.PI * 2);
x.stroke();
}
x.fillStyle = "#2A2A2A";
x.beginPath();
x.arc(c, c, r * 0.86, 0, Math.PI * 2);
x.arc(c, c, r * 0.72, 0, Math.PI * 2, true);
x.fill();
x.fillStyle = "#D8B048";
x.font = "bold " + Math.round(W * 0.05) + "px Georgia";
x.textAlign = "center";
x.textBaseline = "middle";
var N = ["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
for (var n = 0; n < 12; n++) {
var a2 = n / 12 * Math.PI * 2;
x.save();
x.translate(c + Math.sin(a2) * r * 0.79, c - Math.cos(a2) * r * 0.79);
x.rotate(a2);
x.fillText(N[n], 0, 0);
x.restore();
}
for (var m = 0; m < 60; m++) {
var a3 = m / 60 * Math.PI * 2;
x.fillRect(c + Math.sin(a3) * r * 0.92 - 2, c - Math.cos(a3) * r * 0.92 - 2, 4, 4);
}
x.strokeStyle = "#D8B048";
x.lineWidth = 8;
x.beginPath();
x.arc(c, c, r, 0, Math.PI * 2);
x.stroke();
});
},
function () {
return dlnTex("abbeyst", 256, 512, function (x, W, H) {
x.fillStyle = "#A8A294";
x.fillRect(0, 0, W, H);
dlnNoise(x, W, H, 2600, 0.22, 61, "60,58,50");
x.strokeStyle = "rgba(70,66,56,.45)";
for (var y = 0; y < H; y += 20) {
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
for (var bx = (y / 20 % 2) * 20; bx < W; bx += 40) {
x.beginPath();
x.moveTo(bx, y);
x.lineTo(bx, y + 20);
x.stroke();
}
}
wsLancet(x, W * 0.5, H * 0.18, W * 0.36, H * 0.56, "#2A3038", "#6A665A");
x.strokeStyle = "#6A665A";
x.lineWidth = 4;
x.beginPath();
x.moveTo(W * 0.5, H * 0.12);
x.lineTo(W * 0.5, H * 0.74);
x.stroke();
}, 4, 8);
},
function () {
return dlnTex("portland", 256, 256, function (x, W, H) {
x.fillStyle = "#E4DED0";
x.fillRect(0, 0, W, H);
dlnNoise(x, W, H, 1400, 0.12, 71, "110,100,80");
x.strokeStyle = "rgba(120,110,90,.35)";
for (var y = 0; y < H; y += 32) {
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
}
var wx = W * 0.28, wy = H * 0.22, ww = W * 0.44, wh = H * 0.56;
x.fillStyle = "#C8C0AE";
x.fillRect(wx - 8, wy - 16, ww + 16, wh + 22);
dlnSash(x, wx, wy, ww, wh, 3, 4, "#F2EEE4");
x.fillStyle = "#D4CCBA";
x.beginPath();
x.moveTo(wx - 12, wy - 16);
x.lineTo(wx + ww / 2, wy - 36);
x.lineTo(wx + ww + 12, wy - 16);
x.fill();
}, 4, 4);
},
function () {
return dlnTex("yardbrick", 256, 256, function (x, W, H) {
dlnBricks(x, W, H, "#9A3A2A", "#B04A36", "#C8B8A0", 12, 73);
x.fillStyle = "#E4DED0";
x.fillRect(0, H * 0.46, W, H * 0.08);
x.fillRect(0, H * 0.96, W, H * 0.04);
dlnSash(x, W * 0.3, H * 0.1, W * 0.4, H * 0.32, 2, 3, "#F2EEE4");
dlnSash(x, W * 0.3, H * 0.6, W * 0.4, H * 0.32, 2, 3, "#F2EEE4");
}, 3, 3);
},
function () {
return dlnTex("thames", 256, 256, function (x, W, H) {
var g = x.createLinearGradient(0, 0, W, H);
g.addColorStop(0, "#4A5A54");
g.addColorStop(1, "#3E4E4A");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
var R = wRand(83);
for (var i = 0; i < 300; i++) {
x.strokeStyle = "rgba(210,220,210," + (0.04 + R() * 0.12) + ")";
x.lineWidth = 1 + R();
var px = R() * W, py = R() * H, l = 10 + R() * 30;
x.beginPath();
x.moveTo(px, py);
x.quadraticCurveTo(px + l / 2, py - 2, px + l, py);
x.stroke();
}
}, 10, 10);
},
function () {
return dlnTex("linenfold", 256, 256, function (x, W, H) {
x.fillStyle = "#6A4A2A";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 4; i++) {
var px = i * W / 4;
x.fillStyle = "#5A3E22";
x.fillRect(px + 6, 8, W / 4 - 12, H - 16);
for (var f = 0; f < 5; f++) {
var g = x.createLinearGradient(px + 10 + f * 10, 0, px + 18 + f * 10, 0);
g.addColorStop(0, "#7A5832");
g.addColorStop(1, "#4A3018");
x.fillStyle = g;
x.fillRect(px + 10 + f * 10, 16, 8, H - 32);
}
}
}, 2, 2);
},
function () {
return dlnTex("puginpaper", 256, 256, function (x, W, H) {
x.fillStyle = "#7A1E1E";
x.fillRect(0, 0, W, H);
x.fillStyle = "#C8963A";
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
var cx = i * 64 + (j % 2) * 32, cy = j * 64;
x.beginPath();
for (var p = 0; p < 8; p++) {
var a = p / 8 * Math.PI * 2, r = p % 2 ? 10 : 22;
x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
}
x.fill();
x.fillStyle = "#7A1E1E";
x.beginPath();
x.arc(cx, cy, 6, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#C8963A";
}
}, 2, 2);
},
function () {
return dlnTex("lozenge", 256, 256, function (x, W, H) {
x.fillStyle = "#E8E4DA";
x.fillRect(0, 0, W, H);
x.fillStyle = "#1E1E22";
for (var i = -1; i < 5; i++)
for (var j = -1; j < 5; j++) {
var cx = i * 64 + 32, cy = j * 64 + 32;
x.beginPath();
x.moveTo(cx, cy - 26);
x.lineTo(cx + 26, cy);
x.lineTo(cx, cy + 26);
x.lineTo(cx - 26, cy);
x.fill();
}
}, 2, 2);
},
function () {
return dlnTex("bakerpaper", 256, 256, function (x, W, H) {
x.fillStyle = "#6A5A3A";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(200,170,110,.35)";
x.lineWidth = 2;
for (var i = 0; i < 6; i++) {
x.beginPath();
x.moveTo(i * W / 5, 0);
for (var y = 0; y <= H; y += 16)
x.lineTo(i * W / 5 + Math.sin(y / 20) * 8, y);
x.stroke();
}
x.fillStyle = "rgba(200,170,110,.4)";
for (var j = 0; j < 10; j++) {
x.beginPath();
x.arc((j * 37) % W, (j * 71) % H, 6, 0, Math.PI * 2);
x.fill();
}
}, 2, 2);
},
function (title, quote, notes) {
var b = "<div style='font:600 16px Georgia;color:#FFE7B0'>" + esc(title) + "</div>" + (quote ? "<p style='font:italic 14px/1.55 Georgia;margin:8px 0'>" + esc(quote) + "</p>" : "") +
(notes && notes.length ? "<div style='font-size:13px;opacity:.9;line-height:1.5'>" + notes.map(function (n) { return "<p style='margin:5px 0'>" + esc(n) + "</p>"; }).join("") + "</div>" : "");
worldCard(b, {});
try {
WSM.read = (WSM.read || 0) + 1;
if (typeof wsbNote === "function")
wsbNote("tale", title);
}
catch (e) { }
},
function (P, x0, z0, x1, z1, y, mat, step, pin) {
var L = Math.hypot(x1 - x0, z1 - z0), ry = Math.atan2(x1 - x0, z1 - z0), n = Math.max(1, Math.round(L / (step || 2.4)));
dlnBox(P, 0.5, 0.9, L, mat, (x0 + x1) / 2, y + 0.45, (z0 + z1) / 2, ry);
dlnBox(P, 0.7, 0.16, L + 0.2, mat, (x0 + x1) / 2, y + 0.98, (z0 + z1) / 2, ry);
if (pin)
for (var i = 0; i <= n; i += DLN.lite ? 2 : 1) {
var u = i / n;
wsmPin(P, x0 + (x1 - x0) * u, y + 1, z0 + (z1 - z0) * u, pin, mat, 0.5);
}
},
function (P, cx, cz, w, d, h, front, ry, o) {
o = o || {};
var g = new THREE.Group();
g.position.set(cx, 0, cz);
g.rotation.y = ry || 0;
P.add(g);
var plain = o.plain || dlnS("stock", 0xFFFFFF), stone = o.stone || dlnS("portland", 0xFFFFFF);
dlnFace(g, w, h, front, 0, h / 2, d / 2 - 0.15);
dlnBox(g, w, h, 0.3, plain, 0, h / 2, -d / 2 + 0.15);
dlnBox(g, 0.3, h, d, o.ends || plain, -w / 2 + 0.15, h / 2, 0);
dlnBox(g, 0.3, h, d, o.ends || plain, w / 2 - 0.15, h / 2, 0);
dlnBox(g, w + 0.6, 0.5, 0.9, stone, 0, h + 0.1, d / 2);
dlnBox(g, w, 0.9, 0.3, stone, 0, h + 0.8, d / 2 - 0.1);
if (o.balus)
for (var bx = -w / 2 + 0.5; bx < w / 2; bx += DLN.lite ? 1.6 : 0.8)
dlnCyl(g, 0.1, 0.13, 0.7, stone, bx, h + 0.7, d / 2 + 0.05, 6);
if (o.base) {
dlnBox(g, w + 0.1, o.base, 0.4, stone, 0, o.base / 2, d / 2 + 0.05);
}
if (o.roof !== false)
dlnMansard(g, w - 0.4, d - 0.6, o.roof || 3.4, o.slate || dlnS("slate", 0xFFFFFF), 0, h + 0.2, 0);
if (o.door) {
dlnBox(g, 2.2, 3.4, 0.2, dlnC(o.doorCol || 0x1A1A1E), o.door, 1.7, d / 2 + 0.08);
dlnBox(g, 3, 0.4, 0.6, stone, o.door, 3.7, d / 2 + 0.2);
}
var c = Math.cos(ry || 0), s = Math.sin(ry || 0);
shkSolidBox(cx, cz, Math.abs(w * c) + Math.abs(d * s), Math.abs(w * s) + Math.abs(d * c), 0);
return g;
},
function (P, x, z, ry, title, lines, o) {
o = o || {};
var stone = dlnS("stone", 0xD8D2C4), bronze = dlnShine(o.col || 0x3A4A3E, 0.55, 0.55), g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var ph = o.ph || 3.4;
dlnBox(g, 3.4, 0.5, 3.4, stone, 0, 0.25, 0);
dlnBox(g, 2.4, ph, 2.4, stone, 0, 0.5 + ph / 2, 0);
dlnBox(g, 2.8, 0.4, 2.8, stone, 0, 0.7 + ph, 0);
var y0 = 0.9 + ph, robe = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.5, 0), new THREE.Vector2(0.46, 0.5), new THREE.Vector2(0.4, 1.2), new THREE.Vector2(0.44, 1.55), new THREE.Vector2(0.36, 1.85), new THREE.Vector2(0.18, 1.95)], DLN.lite ? 8 : 14), bronze);
robe.position.y = y0;
robe.scale.set(1.25, 1.25, 1.0);
g.add(robe);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), bronze);
hd.scale.set(1.25, 1.4, 1.25);
hd.position.y = y0 + 2.75;
g.add(hd);
[-1, 1].forEach(function (k) { var a = dlnCyl(g, 0.1, 0.12, 1.0, bronze, k * 0.55, y0 + 1.85, o.arm ? 0.2 : 0, 8); a.rotation.z = k * 0.18; if (o.arm && k > 0) {
a.rotation.x = -0.9;
a.position.y = y0 + 2.05;
a.position.z = 0.35;
} });
if (o.scroll) {
var sc = dlnCyl(g, 0.08, 0.08, 0.5, bronze, -0.6, y0 + 1.4, 0.25, 8);
sc.rotation.x = Math.PI / 2;
}
var pl = dlnPanel(lines.slice(0, 3), title, 1.9, 1.1, "#D8D2C4", "#2A2A2A");
pl.position.set(0, 0.5 + ph * 0.55, 1.22);
g.add(pl);
shkSolidBox(x, z, 3.4, 3.4, ry || 0, y0 + 3);
shkSpot(x + Math.sin(ry || 0) * 3.4, z + Math.cos(ry || 0) * 3.4, 3, title, "read", function () { wsmTale("🗽 " + title, null, lines); });
return g;
},
function (col, s) {
var hc = col && col.isMaterial ? col : dlnC(col || 0x2A1A12), h = new THREE.Group(), mane = dlnC(0x14100C);
var b = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.44, 1.5, 12), hc);
b.rotation.x = Math.PI / 2;
b.position.y = 1.45;
h.add(b);
[-0.75, 0.75].forEach(function (e) { var s2 = new THREE.Mesh(new THREE.SphereGeometry(0.46, 12, 8), hc); s2.position.set(0, 1.47, e); h.add(s2); });
[[-0.24, -0.62], [0.24, -0.62], [-0.24, 0.62], [0.24, 0.62]].forEach(function (l) { dlnCyl(h, 0.08, 0.06, 1.12, hc, l[0], 0.56, l[1], 6); dlnCyl(h, 0.08, 0.09, 0.1, dlnC(0x141414), l[0], 0.05, l[1], 6); });
var nk = dlnCyl(h, 0.2, 0.28, 1.0, hc, 0, 2.0, 0.95, 8);
nk.rotation.x = 0.65;
var hd = dlnBox(h, 0.28, 0.32, 0.66, hc, 0, 2.4, 1.38);
hd.rotation.x = 0.5;
var mn = dlnBox(h, 0.07, 0.55, 0.9, mane, 0, 2.2, 0.82);
mn.rotation.x = 0.65;
var tl = dlnCyl(h, 0.05, 0.12, 0.9, mane, 0, 1.15, -1.25, 6);
tl.rotation.x = -0.35;
[-0.1, 0.1].forEach(function (k) { var e = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.16, 4), hc); e.position.set(k, 2.66, 1.18); h.add(e); });
if (s)
h.scale.setScalar(s);
return h;
},
function (P) {
var X = wsX, Z = wsZ, flags = dlnS("flags", 0xFFFFFF), road = dlnS("setts", 0xB8B0A4), lawn = dlnS("lawn", 0xFFFFFF), gravel = dlnS("gravel", 0xFFFFFF);
var wW = WST_RIV.x0 - (WST_R.x0 - 40), D = WST_R.z1 - WST_R.z0 + 80;
dlnPlane(P, wW, D, flags, X((WST_R.x0 - 40 + WST_RIV.x0) / 2), 0.0, Z(0));
dlnPlane(P, WST_R.x1 + 40 - WST_RIV.x1, D, lawn, X((WST_RIV.x1 + WST_R.x1 + 40) / 2), 0.0, Z(0));
[[-26, 126, -52, -30], [-46, -18, -410, -90], [-136, -10, -104, -90], [-136, -120, -104, 28], [-26, -10, -104, 28], [-136, -10, 12, 28], [-270, -136, -96, -82], [-270, -136, 18, 34],
[-22, -6, 28, 330], [-90, 40, 332, 344], [118, 136, 290, 410], [-6, 118, 288, 300], [150, 166, -410, -56]].forEach(function (r) { dlnPlane(P, r[1] - r[0], r[3] - r[2], road, X((r[0] + r[1]) / 2), 0.02, Z((r[2] + r[3]) / 2)); });
var iron = dlnShine(0x5A5A5E, 0.4, 0.8);
[154.2, 155.6, 160.4, 161.8].forEach(function (x) { dlnBox(P, 0.08, 0.03, 354, iron, X(x), 0.04, Z(-233)); });
dlnPlane(P, WST_SQ.x1 - WST_SQ.x0, WST_SQ.z1 - WST_SQ.z0, lawn, X((WST_SQ.x0 + WST_SQ.x1) / 2), 0.03, Z((WST_SQ.z0 + WST_SQ.z1) / 2));
var sqL = Math.hypot(WST_SQ.x1 - WST_SQ.x0, WST_SQ.z1 - WST_SQ.z0), sqA = Math.atan2(WST_SQ.x1 - WST_SQ.x0, WST_SQ.z1 - WST_SQ.z0);
dlnPlane(P, 3, sqL, gravel, X(-73), 0.04, Z(-39), sqA);
dlnPlane(P, 3, sqL, gravel, X(-73), 0.04, Z(-39), -sqA);
dlnPlane(P, 40, 14, lawn, X(-250), 0.03, Z(4));
dlnPlane(P, 30, 22, lawn, X(-86), 0.03, Z(46));
dlnPlane(P, 46, 28, lawn, X(-180), 0.03, Z(110));
dlnPlane(P, 56, 40, dlnS("setts", 0xA8A090), X(30), 0.025, Z(-10));
dlnPlane(P, 40, 18, lawn, X(20), 0.03, Z(-20));
dlnPlane(P, 56, 90, dlnS("setts", 0xA8A090), X(30), 0.025, Z(160));
dlnPlane(P, 54, 200, lawn, X(68), 0.03, Z(-200));
dlnPlane(P, 30, 110, lawn, X(152), 0.03, Z(352));
dlnPlane(P, 40, 64, lawn, X(126), 0.03, Z(-260));
shkFloor(X((WST_R.x0 + WST_R.x1) / 2), Z(0), (WST_R.x1 - WST_R.x0) / 2 + 40, (WST_R.z1 - WST_R.z0) / 2 + 40, 0);
},
function (P) {
var X = wsX, Z = wsZ, granite = dlnS("stone", 0x9A968C), wy = -2.4, L = WST_R.z1 - WST_R.z0 + 120;
var wm = new THREE.MeshStandardMaterial({ color: 0x6A7A70, map: DLN_CANVAS.thames(), roughness: 0.22, metalness: 0.2 });
var w = new THREE.Mesh(new THREE.PlaneGeometry(WST_RIV.x1 - WST_RIV.x0 + 2, L), wm);
w.rotation.x = -Math.PI / 2;
w.position.set(X((WST_RIV.x0 + WST_RIV.x1) / 2), wy, Z(0));
w.userData.keep = 1;
WSM.live.add(w);
WSM.water = wm;
[WST_RIV.x0, WST_RIV.x1].forEach(function (x, k) {
dlnBox(P, 0.8, 3.2, L, granite, X(x + (k ? 0.4 : -0.4)), -1.4, Z(0));
dlnBox(P, 1.2, 0.3, L, dlnS("stone", 0xB8B2A4), X(x + (k ? 0.2 : -0.2)), 0.15, Z(0));
dlnPlane(P, 4, L, dlnC(0x4A4234), X(x + (k ? -2 : 2)), wy + 0.05, Z(0));
});
var iron = dlnShine(0x2A4A3A, 0.5, 0.5), parX = WST_RIV.x0 - 0.6;
dlnBox(P, 0.8, 1.0, WST_EMB.z1 - WST_EMB.z0, granite, X(parX), 0.5, Z((WST_EMB.z0 + WST_EMB.z1) / 2));
dlnBox(P, 0.8, 1.0, 410 - WST_BR.z1, granite, X(parX), 0.5, Z((WST_BR.z1 + 410) / 2) + 0);
shkSolidBox(X(parX), Z((WST_EMB.z0 + WST_EMB.z1) / 2), 0.8, WST_EMB.z1 - WST_EMB.z0, 0, 1.0);
for (var z = WST_EMB.z0 + 8; z < WST_EMB.z1; z += DLN.lite ? 44 : 22) {
var lx = X(parX);
dlnCyl(P, 0.3, 0.36, 0.4, iron, lx, 1.2, Z(z), 10);
dlnCyl(P, 0.1, 0.16, 2.6, iron, lx, 2.6, Z(z), 10);
if (!DLN.lite)
for (var d = 0; d < 2; d++) {
var dol = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.07, 6, 12, Math.PI * 1.4), iron);
dol.position.set(lx, 1.9 + d * 0.4, Z(z));
dol.rotation.set(Math.PI / 2, 0, d * Math.PI);
P.add(dol);
}
var gl = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8), dlnGlow(0xFFF0C8));
gl.position.set(lx, 4.15, Z(z));
P.add(gl);
dlnCyl(P, 0.12, 0.2, 0.2, iron, lx, 3.9, Z(z), 8);
}
var R = wRand(1870), trees = [];
for (var tz = WST_EMB.z0 + 12; tz < WST_EMB.z1 - 10; tz += DLN.lite ? 36 : 18)
trees.push({ x: X(148), z: Z(tz), h: 13 + R() * 3 });
for (var tz2 = 300; tz2 < 404; tz2 += DLN.lite ? 30 : 15)
trees.push({ x: X(144), z: Z(tz2), h: 13 + R() * 3 }), trees.push({ x: X(162), z: Z(tz2 + 7), h: 12 + R() * 3 });
dlnPlanes(P, trees, R);
var red = dlnS("redbrick", 0xFFFFFF), port = dlnS("portland", 0xFFFFFF);
for (var p = 0; p < (DLN.lite ? 4 : 7); p++) {
var pz = 20 + p * 40, px = WST_RIV.x1 + 24;
wsmBlock(P, X(px), Z(pz), 26, 16, 20, red, -Math.PI / 2, { ends: red, plain: red, roof: 4 });
dlnBox(P, 1.2, 22, 1.2, port, X(px - 8.6), 11, Z(pz - 8.6));
dlnBox(P, 1.2, 22, 1.2, port, X(px - 8.6), 11, Z(pz + 8.6));
}
dlnBox(P, 6, 6, 280, red, X(WST_RIV.x1 + 40), 3, Z(150));
var hd = dlnS("boards", 0x9A8460);
dlnBox(P, 0.2, 3.2, 190, hd, X(WST_RIV.x1 + 6), 1.6, Z(-150));
var bill = dlnPanel(["BEGUN 1909 · STONE LAID 1912", "Ralph Knott, architect"], "LONDON COUNTY HALL", 10, 2.4, "#E8DCC0", "#2A2420");
bill.position.set(X(WST_RIV.x1 + 5.8), 2, Z(-80));
bill.rotation.y = -Math.PI / 2;
P.add(bill);
var wood = dlnC(0x8A6E4A);
for (var s = 0; s < (DLN.lite ? 4 : 10); s++) {
var sz = -230 + s * 16;
[0, 8, 16].forEach(function (y) { dlnBox(P, 30, 0.2, 0.2, wood, X(WST_RIV.x1 + 22), y + 4, Z(sz)); });
dlnBox(P, 0.25, 24, 0.25, wood, X(WST_RIV.x1 + 8), 12, Z(sz));
dlnBox(P, 0.25, 24, 0.25, wood, X(WST_RIV.x1 + 36), 12, Z(sz));
}
dlnBox(P, 30, 10, 150, dlnS("portland", 0xD8D0C0), X(WST_RIV.x1 + 22), 5, Z(-150));
var jib = new THREE.Group();
jib.position.set(X(WST_RIV.x1 + 22), 0, Z(-150));
P.add(jib);
dlnBox(jib, 0.8, 30, 0.8, wood, 0, 15, 0);
var ar = dlnBox(jib, 24, 0.5, 0.5, wood, 7, 29, 0);
ar.rotation.z = 0.1;
shkSolidBox(X(WST_RIV.x1 + 23), Z(-150), 36, 200, 0);
shkSolidBox(X(WST_RIV.x1 + 24), Z(140), 30, 300, 0);
},
function () {
var g = new THREE.Group(), hull = dlnShine(0x1A1A1E, 0.5, 0.2), white = dlnC(0xF0ECE0), red = dlnShine(0xA82018, 0.5, 0.2), wood = dlnC(0x8A6A44);
dlnBox(g, 4.4, 1.6, 26, hull, 0, 0.6, 0);
var bow = dlnBox(g, 3.1, 1.6, 3.1, hull, 0, 0.6, 13);
bow.rotation.y = Math.PI / 4;
dlnBox(g, 4.6, 0.15, 26, wood, 0, 1.45, 0);
dlnBox(g, 3.4, 2.0, 10, white, 0, 2.5, -3);
dlnBox(g, 3.8, 0.15, 11, wood, 0, 3.6, -3);
dlnCyl(g, 0.55, 0.55, 4.4, red, 0, 4.8, 1, 12);
dlnBox(g, 1.16, 0.5, 1.16, dlnC(0x141414), 0, 7.1, 1);
[-1, 1].forEach(function (k) { var box = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 0.9, 14, 1, false, 0, Math.PI), white); box.rotation.z = Math.PI / 2; box.rotation.y = Math.PI / 2; box.position.set(k * 2.6, 1.4, 1); g.add(box); });
for (var i = 0; i < 10; i++)
dlnBox(g, 0.04, 0.9, 0.04, wood, (i % 2 ? 1 : -1) * 2.25, 2, -12 + i * 2.6);
return g;
},
function () {
var g = new THREE.Group(), hull = dlnShine(0x2A2018, 0.6, 0.1), sail = new THREE.MeshLambertMaterial({ color: 0x8A3A22, side: THREE.DoubleSide }), wood = dlnC(0x5A4028);
dlnBox(g, 4.6, 1.4, 22, hull, 0, 0.5, 0);
dlnBox(g, 4.7, 0.12, 22, wood, 0, 1.25, 0);
dlnCyl(g, 0.13, 0.16, 16, wood, 0, 9, 3, 8);
dlnCyl(g, 0.08, 0.1, 7, wood, 0, 5, -9, 6);
var sp = new THREE.Shape();
sp.moveTo(0, 0);
sp.lineTo(0, 13);
sp.lineTo(-7.5, 10);
sp.lineTo(-8.5, 0);
sp.lineTo(0, 0);
var s1 = new THREE.Mesh(new THREE.ShapeGeometry(sp), sail);
s1.rotation.y = Math.PI / 2;
s1.position.set(0, 2.2, 3);
g.add(s1);
var sp2 = new THREE.Shape();
sp2.moveTo(0, 0);
sp2.lineTo(0, 6);
sp2.lineTo(-3, 0);
sp2.lineTo(0, 0);
var s2 = new THREE.Mesh(new THREE.ShapeGeometry(sp2), sail);
s2.rotation.y = Math.PI / 2;
s2.position.set(0, 2, -9);
g.add(s2);
dlnBox(g, 4, 0.8, 6, dlnC(0x6A5030), 0, 1.6, -2);
return g;
},
function (P) {
var X = wsX, Z = wsZ, B = WST_BR, by = B.y, bz = (B.z0 + B.z1) / 2, bw = B.z1 - B.z0, x0 = WST_RIV.x0 - 18, x1 = WST_RIV.x1 + 16;
var granite = dlnS("stone", 0xA8A498), green = dlnShine(0x3A5A44, 0.5, 0.4), deck = dlnS("setts", 0x9A9284), gilt = dlnShine(0xC8A048, 0.3, 0.85);
dlnBox(P, x1 - x0, 0.7, bw, green, X((x0 + x1) / 2), by - 0.35, Z(bz));
dlnPlane(P, x1 - x0, bw - 4, deck, X((x0 + x1) / 2), by + 0.02, Z(bz));
[B.z0 + 1, B.z1 - 1].forEach(function (z) { dlnPlane(P, x1 - x0, 2, dlnS("flags", 0xC8C0B0), X((x0 + x1) / 2), by + 0.05, Z(z)); });
var span = (WST_RIV.x1 - WST_RIV.x0) / 7, wy = -2.4;
for (var a = 0; a < 7; a++) {
var ax = WST_RIV.x0 + span * (a + 0.5);
[B.z0 + 0.4, B.z1 - 0.4].forEach(function (z) {
var arc = new THREE.Mesh(new THREE.TorusGeometry(span / 2 - 1, 0.45, 6, DLN.lite ? 12 : 22, Math.PI), green);
arc.position.set(X(ax), wy + 0.2, Z(z));
arc.scale.set(1, (by - wy - 0.8) / (span / 2 - 1), 1);
P.add(arc);
dlnFace(P, span - 1, 0.9, green, X(ax), by - 1.0, Z(z), 0);
});
if (!DLN.lite)
for (var r = 1; r < 4; r++) {
var rib = new THREE.Mesh(new THREE.TorusGeometry(span / 2 - 1, 0.25, 4, 16, Math.PI), green);
rib.position.set(X(ax), wy + 0.2, Z(B.z0 + r * bw / 4));
rib.scale.set(1, (by - wy - 0.8) / (span / 2 - 1), 1);
P.add(rib);
}
if (a < 6) {
var px = WST_RIV.x0 + span * (a + 1);
dlnBox(P, 3.4, by - wy, bw + 3, granite, X(px), (by + wy) / 2 - 0.3, Z(bz));
[B.z0 - 1.8, B.z1 + 1.8].forEach(function (z) { var cw = new THREE.Mesh(new THREE.ConeGeometry(1.9, 2.4, 4), granite); cw.rotation.y = Math.PI / 4; cw.position.set(X(px), by - 1.8, Z(z)); P.add(cw); var cu = dlnBox(P, 2.6, 1.4, 1.6, granite, X(px), wy + 0.6, Z(z)); });
}
}
[B.z0 + 0.2, B.z1 - 0.2].forEach(function (z) {
dlnBox(P, x1 - x0, 1.1, 0.2, green, X((x0 + x1) / 2), by + 0.55, Z(z));
dlnBox(P, x1 - x0, 0.12, 0.4, green, X((x0 + x1) / 2), by + 1.15, Z(z));
if (!DLN.lite)
for (var q = x0 + 1.2; q < x1; q += 2.4) {
var qf = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.06, 4, 10), dlnShine(0x2A4434, 0.5, 0.4));
qf.position.set(X(q), by + 0.6, Z(z) + (z < bz ? -0.12 : 0.12));
P.add(qf);
}
shkSolidBox(X((x0 + x1) / 2), Z(z), x1 - x0, 0.4, 0, 1.3, by);
for (var lx = x0 + 6; lx < x1; lx += DLN.lite ? 26 : 13) {
dlnCyl(P, 0.14, 0.22, 4.2, green, X(lx), by + 2.1, Z(z), 8);
dlnBox(P, 1.6, 0.08, 0.08, green, X(lx), by + 4.1, Z(z));
[-0.8, 0, 0.8].forEach(function (o) { var lan = dlnCyl(P, 0.2, 0.14, 0.6, dlnGlow(0xFFE8B8), X(lx + o), by + 4.5 + (o ? 0 : 0.4), Z(z), 6); var cp = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.26, 6), green); cp.position.set(X(lx + o), by + 4.95 + (o ? 0 : 0.4), Z(z)); P.add(cp); });
}
});
var rw = bw / 2 - 0.5, n = 16, run = 24;
for (var s = 0; s < n; s++) {
var y = by * (s + 1) / n;
shkFloor(X(x0 - run + (s + 0.5) * run / n), Z(bz), run / n / 2 + 0.05, rw, y);
shkFloor(X(x1 + run - (s + 0.5) * run / n), Z(bz), run / n / 2 + 0.05, rw, y);
}
shkFloor(X((x0 + x1) / 2), Z(bz), (x1 - x0) / 2, rw, by);
[-1, 1].forEach(function (k) {
var rx = k < 0 ? x0 - run / 2 : x1 + run / 2, rm = dlnBox(P, run + 0.4, 0.4, bw, deck, X(rx), by / 2 - 0.15, Z(bz));
rm.rotation.z = k * Math.atan2(by, run);
[B.z0 + 0.25, B.z1 - 0.25].forEach(function (z) { var w = dlnBox(P, run, 1.1, 0.5, granite, X(rx), by / 2 + 0.5, Z(z)); w.rotation.z = k * Math.atan2(by, run); });
});
shkSpot(X(WST_RIV.x0 + span * 3.5), Z(B.z0 + 2), 4, "Upon Westminster Bridge", "read", function () { wsmSonnet(); }, by);
shkSpot(X(WST_RIV.x0 + 6), Z(B.z1 - 2), 4, "Westminster Bridge", "look", function () { wsmTale("🌉 Westminster Bridge", WST_TALES.bridge, []); }, by);
},
function () {
var S = (window.WSB_TEXT && WSB_TEXT.ch && WSB_TEXT.ch[0]) || null, p = S && S.p ? S.p : null;
var b = "<div style='font:600 16px Georgia;color:#FFE7B0'>🌅 Upon Westminster Bridge</div><div style='font-size:12px;opacity:.8'>William Wordsworth, 3 September 1802</div>";
b += p ? "<div style='font:italic 14px/1.6 Georgia;margin:8px 0'>" + p.map(function (l) { return esc(l); }).join("<br>") + "</div>" : "<p style='font:italic 14px/1.55 Georgia'>\"Earth has not anything to show more fair\"</p>";
worldCard(b, {});
try {
if (typeof wsbNote === "function")
wsbNote("tale", "sonnet");
}
catch (e) { }
},
function (P) {
var X = wsX, Z = wsZ, K = WST_PAL, H = 22, perp = dlnS("perp", 0xFFFFFF), plain = dlnS("perpplain", 0xFFFFFF), lead = dlnS("slate", 0x6A7076), iron = dlnShine(0x2A2E34, 0.5, 0.6), gilt = dlnShine(0xC8A048, 0.3, 0.85);
var len = K.z1 - K.z0, cz = (K.z0 + K.z1) / 2;
dlnFace(P, len, H, perp, X(K.x1), H / 2, Z(cz), Math.PI / 2);
dlnFace(P, len, H, plain, X(K.x0), H / 2, Z(cz), Math.PI / 2);
dlnFace(P, K.x1 - K.x0, H, perp, X((K.x0 + K.x1) / 2), H / 2, Z(K.z0), 0);
dlnFace(P, K.x1 - K.x0, H, plain, X((K.x0 + K.x1) / 2), H / 2, Z(K.z1), 0);
dlnBox(P, K.x1 - K.x0 - 0.8, 0.5, len - 0.8, dlnC(0x8A7A5E), X((K.x0 + K.x1) / 2), H - 0.4, Z(cz));
wsmParapet(P, X(K.x1 + 0.2), Z(K.z0), X(K.x1 + 0.2), Z(K.z1), H, plain, 4, DLN.lite ? 0 : 3.2);
wsmParapet(P, X(K.x0), Z(K.z0 - 0.2), X(K.x1), Z(K.z0 - 0.2), H, plain, 4, DLN.lite ? 0 : 3.2);
wsmParapet(P, X(K.x0 - 0.2), Z(K.z0), X(K.x0 - 0.2), Z(K.z1), H, plain, 6, 0);
[K.x1 - 14, K.x0 + (K.x1 - K.x0) / 2, K.x0 + 12].forEach(function (rx, i) {
dlnGable(P, len - 8, i === 1 ? 30 : 22, i === 1 ? 10 : 8, lead, X(rx), H, Z(cz), Math.PI / 2);
if (!DLN.lite)
for (var c = K.z0 + 6; c < K.z1 - 4; c += 1.2)
dlnBox(P, 0.06, 0.5, 0.06, iron, X(rx), H + (i === 1 ? 10 : 8) + 0.45, Z(c));
});
var nPav = [K.z0 + 8, K.z0 + 70, K.z0 + 150, K.z0 + 226, K.z1 - 10];
nPav.forEach(function (pz, i) {
var pw = i === 2 ? 26 : 16, ph = i === 2 ? 30 : 28, px = K.x1 + 2.5;
dlnFace(P, pw, ph, perp, X(px), ph / 2, Z(pz), Math.PI / 2);
dlnBox(P, 5, ph, pw, plain, X(px - 2.5), ph / 2, Z(pz));
[-1, 1].forEach(function (k) { dlnBox(P, 1.6, ph + 2, 1.6, plain, X(px + 0.2), (ph + 2) / 2, Z(pz + k * pw / 2)); wsmPin(P, X(px + 0.2), ph + 2, Z(pz + k * pw / 2), 6, plain, 1.0); });
wsmParapet(P, X(px + 0.3), Z(pz - pw / 2), X(px + 0.3), Z(pz + pw / 2), ph, plain, 2.8, DLN.lite ? 0 : 2.4);
var roof = wsmPyr(P, X(px - 6), ph, Z(pz), Math.min(pw / 2, 9), i === 2 ? 14 : 11, lead);
dlnCyl(P, 0.1, 0.1, 3, iron, X(px - 6), ph + (i === 2 ? 14 : 11) + 1.4, Z(pz), 6);
shkSolidBox(X(px - 2.5), Z(pz), 6, pw, 0);
});
dlnPlane(P, WST_RIV.x0 - K.x1 - 3.6, len, dlnS("flags", 0xD8D0C0), X((K.x1 + 3.6 + WST_RIV.x0) / 2), 0.035, Z(cz));
for (var t = K.z0 + 2; t < K.z1; t += DLN.lite ? 14 : 7) {
dlnBox(P, 0.5, 1.0, 0.5, plain, X(WST_RIV.x0 - 0.9), 0.5, Z(t));
}
dlnBox(P, 0.6, 0.16, len, plain, X(WST_RIV.x0 - 0.9), 1.08, Z(cz));
shkSolidBox(X((K.x0 + K.x1) / 2), Z(cz), K.x1 - K.x0 + 0.6, len + 0.6, 0);
var tx = X((K.x0 + K.x1) / 2), tz = Z(K.z0 + 140);
dlnCyl(P, 9, 9.5, 22, plain, tx, H + 11, tz, 8);
for (var o = 0; o < 8; o++) {
var a = o / 8 * Math.PI * 2 + Math.PI / 8;
wsmPin(P, tx + Math.cos(a) * 9.6, H + 22, tz + Math.sin(a) * 9.6, 7, plain, 0.9);
}
var sp = new THREE.Mesh(new THREE.ConeGeometry(8.6, 30, 8), plain);
sp.rotation.y = Math.PI / 8;
sp.position.set(tx, H + 22 + 15, tz);
P.add(sp);
dlnCyl(P, 0.18, 0.18, 4, gilt, tx, H + 54, tz, 6);
wsmVictoria(P);
wsmClockTower(P);
wsmHall(P);
wsmWestFront(P);
},
function (P) {
var X = wsX, Z = wsZ, V = WST_VIC, hw = V.w / 2, H = 78, perp = dlnS("perp", 0xFFFFFF), plain = dlnS("perpplain", 0xFFFFFF), lead = dlnS("slate", 0x6A7076), iron = dlnShine(0x2A2E34, 0.5, 0.6), gilt = dlnShine(0xC8A048, 0.3, 0.85);
var x = X(V.x), z = Z(V.z);
[[0, -hw, 0], [0, hw, 0], [-hw, 0, Math.PI / 2], [hw, 0, Math.PI / 2]].forEach(function (f) { dlnFace(P, V.w, H, perp, x + f[0], H / 2, z + f[1], f[2]); });
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) {
dlnCyl(P, 2.2, 2.4, H + 12, plain, x + c[0] * hw, (H + 12) / 2, z + c[1] * hw, 8);
var cap = new THREE.Mesh(new THREE.ConeGeometry(2.4, 7, 8), lead);
cap.position.set(x + c[0] * hw, H + 15.5, z + c[1] * hw);
P.add(cap);
dlnCyl(P, 0.06, 0.06, 2, gilt, x + c[0] * hw, H + 20, z + c[1] * hw, 4);
});
for (var y = 12; y < H; y += 16)
dlnBox(P, V.w + 0.8, 0.6, V.w + 0.8, plain, x, y, z);
wsmParapet(P, x - hw, z - hw - 0.2, x + hw, z - hw - 0.2, H, plain, 2.4, DLN.lite ? 0 : 2);
wsmParapet(P, x - hw, z + hw + 0.2, x + hw, z + hw + 0.2, H, plain, 2.4, DLN.lite ? 0 : 2);
wsmParapet(P, x - hw - 0.2, z - hw, x - hw - 0.2, z + hw, H, plain, 2.4, DLN.lite ? 0 : 2);
wsmParapet(P, x + hw + 0.2, z - hw, x + hw + 0.2, z + hw, H, plain, 2.4, DLN.lite ? 0 : 2);
wsmPyr(P, x, H, z, hw - 1, 6, lead);
var arch = new THREE.Mesh(new THREE.CircleGeometry(5, 20, 0, Math.PI), dlnC(0x2A2218));
arch.position.set(x, 10, z + hw + 0.18);
P.add(arch);
dlnBox(P, 10, 10, 0.2, dlnC(0x2A2218), x, 5, z + hw + 0.18);
dlnBox(P, 2, 1.6, 0.3, gilt, x, 15.8, z + hw + 0.3);
dlnCyl(P, 0.14, 0.2, 14, dlnC(0xE8E2D4), x, H + 13, z, 8);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(6, 3), new THREE.MeshLambertMaterial({ map: wsmUnionFlag(), side: THREE.DoubleSide }));
fl.position.set(x + 3.1, H + 18, z);
fl.userData.keep = 1;
WSM.live.add(fl);
WSM.flag = fl;
shkSolidBox(x, z, V.w + 2, V.w + 2, 0);
},
function () {
return dlnTex("unionflag", 240, 120, function (x, W, H) {
x.fillStyle = "#1E2E6A";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#FFFFFF";
x.lineWidth = H * 0.2;
x.beginPath();
x.moveTo(0, 0);
x.lineTo(W, H);
x.moveTo(W, 0);
x.lineTo(0, H);
x.stroke();
x.strokeStyle = "#C8102E";
x.lineWidth = H * 0.066;
x.beginPath();
x.moveTo(0, 0);
x.lineTo(W, H);
x.moveTo(W, 0);
x.lineTo(0, H);
x.stroke();
x.fillStyle = "#FFFFFF";
x.fillRect(W / 2 - H * 0.166, 0, H * 0.333, H);
x.fillRect(0, H / 2 - H * 0.166, W, H * 0.333);
x.fillStyle = "#C8102E";
x.fillRect(W / 2 - H * 0.1, 0, H * 0.2, H);
x.fillRect(0, H / 2 - H * 0.1, W, H * 0.2);
});
},
function (P) {
var X = wsX, Z = wsZ, C = WST_CLOCK, hw = C.w / 2, x = X(C.x), z = Z(C.z), perp = dlnS("perp", 0xFFFFFF), plain = dlnS("perpplain", 0xFFFFFF), louvre = dlnS("louvre", 0xFFFFFF);
var lead = dlnShine(0x3A4248, 0.55, 0.5), gilt = dlnShine(0xC8A048, 0.28, 0.9), iron = dlnShine(0x22262A, 0.5, 0.6), shaft = 54, dy = 58.5;
var faces = [[0, -1, Math.PI], [1, 0, Math.PI / 2], [0, 1, 0], [-1, 0, -Math.PI / 2]];
faces.forEach(function (f) { dlnFace(P, C.w, shaft, perp, x + f[0] * hw, shaft / 2, z + f[1] * hw, f[0] ? Math.PI / 2 : 0); });
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { dlnBox(P, 1.1, shaft + 18, 1.1, plain, x + c[0] * (hw + 0.2), (shaft + 18) / 2, z + c[1] * (hw + 0.2)); });
for (var y = 8; y < shaft; y += DLN.lite ? 16 : 8)
dlnBox(P, C.w + 0.7, 0.4, C.w + 0.7, plain, x, y, z);
dlnBox(P, C.w + 1.6, 2, C.w + 1.6, plain, x, 1, z);
dlnBox(P, C.w + 1.4, 10.5, C.w + 1.4, plain, x, shaft + 5.25, z);
var dialMat = new THREE.MeshBasicMaterial({ map: DLN_CANVAS.dial(), fog: true }), handMat = dlnShine(0x14181A, 0.5, 0.4);
WSM.hands = [];
faces.forEach(function (f) {
var g = new THREE.Group();
g.position.set(x + f[0] * (hw + 0.72), dy, z + f[1] * (hw + 0.72));
g.rotation.y = f[2];
WSM.live.add(g);
var d = new THREE.Mesh(new THREE.CircleGeometry(3.5, DLN.lite ? 24 : 48), dialMat);
d.position.z = 0.02;
g.add(d);
var fr = new THREE.Mesh(new THREE.TorusGeometry(3.55, 0.18, 6, DLN.lite ? 24 : 48), gilt);
g.add(fr);
var sq = new THREE.Mesh(new THREE.RingGeometry(3.75, 4.9, 4, 1), gilt);
sq.rotation.z = Math.PI / 4;
sq.position.z = -0.02;
sq.scale.set(1, 1, 1);
g.add(sq);
var hr = new THREE.Group(), mn = new THREE.Group();
hr.position.z = 0.1;
mn.position.z = 0.16;
g.add(hr);
g.add(mn);
var hb = new THREE.Mesh(new THREE.BoxGeometry(0.22, 2.1, 0.05), handMat);
hb.position.y = 0.9;
hr.add(hb);
var mb = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3.1, 0.05), handMat);
mb.position.y = 1.35;
mn.add(mb);
var tip = new THREE.Mesh(new THREE.CircleGeometry(0.22, 4), handMat);
tip.position.y = 1.95;
hr.add(tip);
var hub = new THREE.Mesh(new THREE.CircleGeometry(0.2, 12), gilt);
hub.position.z = 0.2;
g.add(hub);
var lat = dlnPanel(["DOMINE SALVAM FAC REGINAM NOSTRAM VICTORIAM PRIMAM"], "", 8, 0.7, "#1E2A3A", "#D8B048");
lat.position.set(0, -4.6, 0.05);
g.add(lat);
var gab = new THREE.Mesh(new THREE.ConeGeometry(3.4, 3.2, 3), gilt);
gab.rotation.z = 0;
gab.scale.set(1, 1, 0.12);
gab.position.set(0, 5.6, -0.3);
g.add(gab);
WSM.hands.push({ h: hr, m: mn });
});
var bt = shaft + 10.5;
faces.forEach(function (f) { dlnFace(P, C.w, 10, louvre, x + f[0] * (hw - 0.1), bt + 5, z + f[1] * (hw - 0.1), f[0] ? Math.PI / 2 : 0); });
dlnBox(P, C.w - 0.8, 10, C.w - 0.8, dlnC(0x2A241C), x, bt + 5, z);
dlnBox(P, C.w + 1, 0.6, C.w + 1, plain, x, bt + 10.3, z);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { wsmPin(P, x + c[0] * (hw + 0.2), shaft + 18, z + c[1] * (hw + 0.2), 16, lead, 1.2); });
var sp0 = bt + 10.6;
wsmPyr(P, x, sp0, z, hw, 8, lead);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { var rb = dlnBox(P, 0.2, 9.6, 0.2, gilt, x + c[0] * hw * 0.5, sp0 + 4, z + c[1] * hw * 0.5); rb.rotation.set(-c[1] * 0.62, 0, c[0] * 0.62); });
dlnBox(P, 4.2, 4.4, 4.2, iron, x, sp0 + 10, z);
var lamp = dlnBox(P, 3.2, 3.2, 3.2, new THREE.MeshBasicMaterial({ color: 0x6A5A3A, fog: true }), x, sp0 + 10, z);
P.remove(lamp);
WSM.live.add(lamp);
WSM.ayrton = lamp;
faces.forEach(function (f) { var gb = new THREE.Mesh(new THREE.ConeGeometry(2.1, 2.6, 3), gilt); gb.scale.set(1, 1, 0.1); gb.position.set(x + f[0] * 2.2, sp0 + 13.4, z + f[1] * 2.2); gb.rotation.y = f[2]; P.add(gb); });
wsmPyr(P, x, sp0 + 12.2, z, 2.4, 11, lead);
dlnCyl(P, 0.1, 0.14, 2.4, gilt, x, sp0 + 24, z, 6);
var orb = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 10), gilt);
orb.position.set(x, sp0 + 25.4, z);
P.add(orb);
dlnBox(P, 0.16, 1.6, 0.16, gilt, x, sp0 + 26.6, z);
dlnBox(P, 0.9, 0.16, 0.16, gilt, x, sp0 + 26.9, z);
shkSolidBox(x, z, C.w + 1.8, C.w + 1.8, 0);
dlnBox(P, 2.2, 3.6, 0.3, dlnC(0x2A1A10), x, 1.8, z - hw - 0.85);
var ar = new THREE.Mesh(new THREE.CircleGeometry(1.1, 12, 0, Math.PI), dlnC(0x2A1A10));
ar.position.set(x, 3.6, z - hw - 0.82);
ar.rotation.y = Math.PI;
P.add(ar);
shkDoor("ws_clock", x, z - hw - 4, "The Clock Tower: 334 steps to Big Ben");
shkSpot(x - 4.5, z - hw - 5, 3, "The Great Clock", "look", function () { wsmTale("🕰️ The Great Clock of Westminster", WST_TALES.clock, [WST_TALES.ayrton]); });
},
function (P) {
var X = wsX, Z = wsZ, W = WST_WH, w = W.x1 - W.x0, d = W.z1 - W.z0, cx = (W.x0 + W.x1) / 2, cz = (W.z0 + W.z1) / 2, H = 14, rag = dlnS("abbeyst", 0xC8C0AC), plain = dlnS("perpplain", 0xFFFFFF), lead = dlnS("slate", 0x6A7076);
dlnFace(P, d, H, rag, X(W.x0), H / 2, Z(cz), Math.PI / 2);
dlnFace(P, w, H, plain, X(cx), H / 2, Z(W.z1), 0);
dlnGable(P, d, w, 13, lead, X(cx), H, Z(cz), Math.PI / 2);
for (var bz = W.z0 + 6; bz < W.z1 - 2; bz += DLN.lite ? 16 : 8) {
dlnBox(P, 2.4, H - 2, 1.4, rag, X(W.x0 - 2.4), (H - 2) / 2, Z(bz));
var fb = dlnBox(P, 4.2, 0.8, 0.9, rag, X(W.x0 - 1.0), H - 0.6, Z(bz));
fb.rotation.z = -0.55;
wsmPin(P, X(W.x0 - 2.4), H - 2, Z(bz), 3, rag, 0.8);
}
var nz = Z(W.z0);
dlnFace(P, w, H, rag, X(cx), H / 2, nz, 0);
var gable = new THREE.Mesh(new THREE.ConeGeometry(w / 2 * 1.02, 13, 3), rag);
gable.scale.set(1, 1, 0.06);
gable.position.set(X(cx), H + 6.5, nz);
P.add(gable);
var win = new THREE.Mesh(new THREE.PlaneGeometry(10, 13), new THREE.MeshLambertMaterial({ map: DLN_CANVAS.perp(), color: 0x8A7A64 }));
win.position.set(X(cx), H + 0.5, nz - 0.2);
win.rotation.y = Math.PI;
P.add(win);
dlnBox(P, 6, 7, 0.8, rag, X(cx), 3.5, nz - 0.5);
dlnBox(P, 3.2, 5, 0.3, dlnC(0x2A1A10), X(cx), 2.5, nz - 0.95);
[W.x0 + 2.5, W.x1 - 2.5].forEach(function (tx) { dlnBox(P, 5, 26, 5, rag, X(tx), 13, nz + 1); wsmParapet(P, X(tx - 2.5), nz - 1.6, X(tx + 2.5), nz - 1.6, 26, rag, 1.6, DLN.lite ? 0 : 1.6); wsmPin(P, X(tx - 2.4), 26, nz - 1.4, 4, rag, 0.7); wsmPin(P, X(tx + 2.4), 26, nz - 1.4, 4, rag, 0.7); });
shkSolidBox(X(cx), Z(cz), w + 0.6, d + 0.6, 0);
shkSolidBox(X(W.x0 - 2.4), Z(cz), 2.6, d, 0);
shkDoor("ws_hall", X(cx), nz - 3, "Westminster Hall: the great north door");
var sx0 = W.x0, sx1 = WST_PAL.x0, sz0 = W.z1, sz1 = W.z1 + 26;
dlnFace(P, sz1 - sz0, H + 6, dlnS("perp", 0xFFFFFF), X(sx0), (H + 6) / 2, Z((sz0 + sz1) / 2), Math.PI / 2);
dlnFace(P, sx1 - sx0, H + 6, dlnS("perp", 0xFFFFFF), X((sx0 + sx1) / 2), (H + 6) / 2, Z(sz1), 0);
dlnBox(P, sx1 - sx0, H + 6, sz1 - sz0, dlnC(0x8A7A5E), X((sx0 + sx1) / 2), (H + 6) / 2 - 0.2, Z((sz0 + sz1) / 2));
dlnGable(P, sx1 - sx0, sz1 - sz0, 8, lead, X((sx0 + sx1) / 2), H + 6, Z((sz0 + sz1) / 2));
var big = new THREE.Mesh(new THREE.PlaneGeometry(8, 14), new THREE.MeshLambertMaterial({ map: DLN_CANVAS.perp(), color: 0x9A8A70 }));
big.position.set(X(sx0) - 0.2, 10, Z((sz0 + sz1) / 2));
big.rotation.y = -Math.PI / 2;
P.add(big);
dlnBox(P, 0.6, 5.5, 4, dlnC(0x2A1A10), X(sx0) - 0.3, 2.75, Z((sz0 + sz1) / 2));
shkSolidBox(X((sx0 + sx1) / 2), Z((sz0 + sz1) / 2), sx1 - sx0 + 0.6, sz1 - sz0 + 0.6, 0);
shkDoor("ws_hall", X(sx0 - 2.6), Z((sz0 + sz1) / 2), "St Stephen's Porch: the way in for visitors to the Gallery");
shkSpot(X(W.x0 - 6), Z(cz), 4, "Westminster Hall", "look", function () { wsmTale("🏛️ Westminster Hall", WST_TALES.hall, [WST_TALES.fire]); });
wsmStatue(P, X(W.x0 - 9), Z(cz + 20), -Math.PI / 2, "OLIVER CROMWELL", ["Lord Protector, 1653 to 1658, by Hamo Thornycroft, 1899.", "Set up here, below the level of the street, after Members argued for years about whether he should be honoured at all."], { arm: 1, ph: 2.4 });
},
function (P) {
var X = wsX, Z = wsZ, K = WST_PAL, perp = dlnS("perp", 0xFFFFFF), plain = dlnS("perpplain", 0xFFFFFF), lead = dlnS("slate", 0x6A7076);
var z0 = WST_WH.z1 + 26, z1 = WST_VIC.z - WST_VIC.w / 2;
dlnFace(P, z1 - z0, 22, perp, X(K.x0 - 0.3), 11, Z((z0 + z1) / 2), Math.PI / 2);
wsmParapet(P, X(K.x0 - 0.5), Z(z0), X(K.x0 - 0.5), Z(z1), 22, plain, 3.2, DLN.lite ? 0 : 2.6);
for (var bz = z0 + 8; bz < z1; bz += 24) {
dlnBox(P, 3, 28, 6, plain, X(K.x0 - 1.5), 14, Z(bz));
wsmPin(P, X(K.x0 - 1.5), 28, Z(bz), 6, plain, 1);
}
var bx = X(14), bz2 = Z(176), bronze = dlnShine(0x3A4A3E, 0.55, 0.55), stone = dlnS("stone", 0xD8D2C4), g = new THREE.Group();
g.position.set(bx, 0, bz2);
g.rotation.y = Math.PI / 2;
P.add(g);
dlnBox(g, 4.4, 0.5, 7.4, stone, 0, 0.25, 0);
dlnBox(g, 3.4, 3.6, 6.4, stone, 0, 2.3, 0);
dlnBox(g, 3.8, 0.4, 6.8, stone, 0, 4.3, 0);
var h = wsmHorse(bronze, 1.35);
h.position.y = 4.5;
g.add(h);
var body = dlnCyl(g, 0.32, 0.42, 1.3, bronze, 0, 7.4, -0.1, 10);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 10), bronze);
hd.position.set(0, 8.35, -0.1);
g.add(hd);
var cr = dlnCyl(g, 0.2, 0.24, 0.2, dlnShine(0xC8A048, 0.3, 0.85), 0, 8.62, -0.1, 8);
var arm = dlnCyl(g, 0.09, 0.1, 1.0, bronze, 0.42, 8.1, 0.1, 6);
arm.rotation.z = -0.4;
var sw = dlnBox(g, 0.06, 2.4, 0.12, bronze, 0.75, 9.4, 0.2);
sw.rotation.z = -0.2;
[-1, 1].forEach(function (k) { var lg = dlnCyl(g, 0.12, 0.1, 1.2, bronze, k * 0.5, 6.4, 0, 6); lg.rotation.z = k * 0.25; });
shkSolidBox(bx, bz2, 7.4, 4.4, 0, 9);
shkSpot(bx + 5, bz2, 3, "Richard Coeur de Lion", "read", function () { wsmTale("⚔️ King Richard the Lionheart", null, ["The bronze King Richard I on his horse, sword raised, is by Baron Carlo Marochetti, 1860.", "Richard reigned 1189 to 1199 and spent barely six months of it in England; he is here as a picture of a Crusader king and of valour."]); });
},
function (P, R) {
var X = wsX, Z = wsZ, S = WST_SQ;
wsmStatue(P, X(-110), Z(-80), Math.PI * 0.25, "GEORGE CANNING", ["Prime Minister, 1827. By Sir Richard Westmacott, 1832.", "He spoke for the freedom of the South American republics: \"I called the New World into existence, to redress the balance of the Old.\""], { scroll: 1 });
wsmStatue(P, X(-40), Z(-80), -Math.PI * 0.25, "SIR ROBERT PEEL", ["Prime Minister; founder of the Metropolitan Police in 1829 (they are 'Bobbies' and 'Peelers' after him).", "By Matthew Noble, 1876."]);
wsmStatue(P, X(-40), Z(0), -Math.PI * 0.75, "VISCOUNT PALMERSTON", ["Prime Minister twice; died in office at eighty, in 1865.", "By Thomas Woolner, 1876."]);
wsmStatue(P, X(-110), Z(0), Math.PI * 0.75, "THE EARL OF DERBY", ["Prime Minister three times. By Matthew Noble, 1874; the panels show him in Parliament."]);
wsmStatue(P, X(-73), Z(-24), Math.PI, "THE EARL OF BEACONSFIELD", ["Benjamin Disraeli, Prime Minister, novelist, Queen Victoria's favourite. By Mario Raggi, 1883.", "On Primrose Day, 19 April, the anniversary of his death, his statue is heaped with primroses, his flower."], { arm: 1, ph: 4 });
var fx = X(-30), fz = Z(-60), red = dlnS("redbrick", 0xC88A70), stone = dlnS("stone", 0xE0D8C8), enam = dlnShine(0x3A6A8A, 0.4, 0.2);
dlnCyl(P, 4.2, 4.4, 0.6, stone, fx, 0.3, fz, 8);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
dlnCyl(P, 0.22, 0.26, 5, red, fx + Math.cos(a) * 3.4, 3.1, fz + Math.sin(a) * 3.4, 8);
}
dlnCyl(P, 3.8, 3.8, 1.4, stone, fx, 6.2, fz, 8);
var sp = new THREE.Mesh(new THREE.ConeGeometry(3.9, 7, 8), enam);
sp.position.set(fx, 10.4, fz);
P.add(sp);
wsmPin(P, fx, 13.9, fz, 2, dlnShine(0xC8A048, 0.3, 0.85), 0.3);
dlnCyl(P, 1.4, 1.6, 0.9, stone, fx, 1.05, fz, 10);
shkSolid({ x: fx, z: fz, r: 4.2 });
shkSpot(fx + 5, fz, 3, "The Buxton Memorial Fountain", "look", function () { wsmTale("⛲ The Buxton Memorial Fountain", null, ["Put up in 1865 by Charles Buxton MP in memory of his father, Sir Thomas Fowell Buxton, and the others who worked to end slavery in the British Empire (the Act of 1833).", "It was a drinking fountain for people and horses: clean water, free, in the middle of Westminster."]); });
var trees = [];
for (var t = 0; t < (DLN.lite ? 6 : 14); t++) {
var u = t / (DLN.lite ? 6 : 14);
trees.push({ x: X(S.x0 + 3 + u * (S.x1 - S.x0 - 6)), z: Z(S.z0 + 3), h: 12 + R() * 4 });
trees.push({ x: X(S.x0 + 3 + u * (S.x1 - S.x0 - 6)), z: Z(S.z1 - 3), h: 12 + R() * 4 });
}
dlnPlanes(P, trees, R);
for (var lx = S.x0; lx <= S.x1; lx += DLN.lite ? 47 : 23.5) {
dlnLamp(P, X(lx), Z(S.z0 - 1));
dlnLamp(P, X(lx), Z(S.z1 + 1));
}
var port = dlnS("portland", 0xFFFFFF), geo = dlnS("georgian", 0xFFFFFF);
wsmBlock(P, X(20), Z(-74), 56, 40, 18, port, 0, { balus: 1 });
wsmBlock(P, X(70), Z(-74), 40, 40, 20, geo, 0, { roof: 4 });
var st = wsmBlock(P, X(112), Z(-66), 26, 20, 8, port, 0, { roof: false, balus: 1 });
var sg = dlnPanel(["DISTRICT RAILWAY · TRAINS TO THE CITY AND KENSINGTON"], "WESTMINSTER", 12, 1.6, "#F2EAD6", "#8A1A1A");
sg.position.set(X(112), 6.4, Z(-55.7));
P.add(sg);
var ring = new THREE.Mesh(new THREE.RingGeometry(0.9, 1.3, 24), dlnC(0xB01818));
ring.position.set(X(112), 4, Z(-55.6));
P.add(ring);
var bar = dlnPanel([""], "UNDERGROUND", 3.2, 0.5, "#1E2A6A", "#FFFFFF");
bar.position.set(X(112), 4, Z(-55.5));
P.add(bar);
dlnBox(P, 4, 3.4, 0.2, dlnC(0x2A2420), X(112), 1.7, Z(-55.8));
var sm = dlnS("abbeyst", 0xC8C0B0), lead = dlnS("slate", 0x6A7076), mx0 = -98, mx1 = -72, mz0 = 34, mz1 = 48;
dlnBox(P, mx1 - mx0, 12, mz1 - mz0, sm, X((mx0 + mx1) / 2), 6, Z((mz0 + mz1) / 2));
dlnGable(P, mx1 - mx0, mz1 - mz0, 6, lead, X((mx0 + mx1) / 2), 12, Z((mz0 + mz1) / 2));
wsmParapet(P, X(mx0), Z(mz0 - 0.2), X(mx1), Z(mz0 - 0.2), 12, sm, 2.2, 0);
dlnBox(P, 7, 26, 7, sm, X(mx0 - 3.5), 13, Z((mz0 + mz1) / 2));
wsmParapet(P, X(mx0 - 7), Z(37.3), X(mx0), Z(37.3), 26, sm, 1.4, DLN.lite ? 0 : 1.6);
wsmParapet(P, X(mx0 - 7), Z(44.7), X(mx0), Z(44.7), 26, sm, 1.4, DLN.lite ? 0 : 1.6);
[[-7, 37.3], [0, 37.3], [-7, 44.7], [0, 44.7]].forEach(function (c) { wsmPin(P, X(mx0 + c[0]), 26, Z(c[1]), 4, sm, 0.9); });
var cl = new THREE.Mesh(new THREE.CircleGeometry(1.2, 20), new THREE.MeshBasicMaterial({ map: DLN_CANVAS.dial(), fog: true }));
cl.position.set(X(mx0 - 3.5), 19, Z(mz0 + 3.5 - 4.2));
cl.rotation.y = Math.PI;
P.add(cl);
var ew = new THREE.Mesh(new THREE.PlaneGeometry(5, 7), wsmGlass(7));
ew.position.set(X(mx1) + 0.16, 6, Z((mz0 + mz1) / 2));
ew.rotation.y = Math.PI / 2;
P.add(ew);
dlnBox(P, 0.4, 3.6, 2.4, dlnC(0x2A1A10), X(mx0 - 7.1), 1.8, Z((mz0 + mz1) / 2));
shkSolidBox(X((mx0 + mx1) / 2 - 3.5), Z((mz0 + mz1) / 2), mx1 - mx0 + 7, mz1 - mz0, 0);
shkSpot(X(mx0 - 10), Z((mz0 + mz1) / 2), 3, "St Margaret's, Westminster", "look", function () { wsmTale("⛪ St Margaret's", WST_TALES.margaret, []); });
var bx = X(146), bz = Z(-60), br = dlnShine(0x2E3E34, 0.5, 0.6), gs = dlnS("stone", 0xC8C2B4), bg = new THREE.Group();
bg.position.set(bx, 0, bz);
bg.rotation.y = Math.PI / 2;
P.add(bg);
dlnBox(bg, 6, 0.6, 9, gs, 0, 0.3, 0);
dlnBox(bg, 4.6, 4, 7.6, gs, 0, 2.6, 0);
dlnBox(bg, 5.2, 0.5, 8.2, gs, 0, 4.85, 0);
[-0.9, 0.9].forEach(function (k) { var hh = wsmHorse(br, 1.15); hh.position.set(k, 5.1, 1.6); hh.rotation.x = -0.18; bg.add(hh); });
var ch = dlnBox(bg, 2.6, 1.2, 2.2, br, 0, 6.0, -1.6);
[-1.4, 1.4].forEach(function (k) { var wh = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.1, 6, 16), br); wh.rotation.y = Math.PI / 2; wh.position.set(k, 5.9, -1.8); bg.add(wh); var sc = dlnBox(bg, 1.2, 0.06, 0.2, br, k * 1.6, 5.9, -1.8); });
var q = dlnCyl(bg, 0.3, 0.42, 1.8, br, 0, 7.5, -1.4, 10);
var qh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), br);
qh.position.set(0, 8.6, -1.4);
bg.add(qh);
var spr = dlnCyl(bg, 0.03, 0.03, 3.2, br, 0.4, 8.6, -1.2, 4);
spr.rotation.z = -0.2;
[-0.6, 0.6].forEach(function (k) { var dd = dlnCyl(bg, 0.22, 0.3, 1.4, br, k, 7.0, -2.2, 8); var dh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), br); dh.position.set(k, 7.9, -2.2); bg.add(dh); });
shkSolidBox(bx, bz, 9, 6, 0, 9);
shkSpot(bx - 6, bz, 3.4, "Boadicea and her daughters", "read", function () { wsmTale("🛡️ Boadicea", WST_TALES.boadicea, []); });
},
function (P) {
var X = wsX, Z = wsZ, A = WST_AB, st = dlnS("abbeyst", 0xFFFFFF), lead = dlnS("slate", 0x6A6E74), plain = dlnS("abbeyst", 0xB8B2A4), nx0 = A.x0 + 14, nx1 = A.x1, zc = (A.z0 + A.z1) / 2, nw = 12, aw = 11, NH = 31, AH = 14;
[zc - nw / 2, zc + nw / 2].forEach(function (z) { dlnFace(P, nx1 - nx0, NH - AH, st, X((nx0 + nx1) / 2), AH + (NH - AH) / 2, Z(z), 0); });
dlnBox(P, nx1 - nx0, NH, nw - 0.4, dlnC(0x6A665A), X((nx0 + nx1) / 2), NH / 2, Z(zc));
dlnGable(P, nx1 - nx0, nw, 7, lead, X((nx0 + nx1) / 2), NH, Z(zc));
[zc - nw / 2 - aw / 2, zc + nw / 2 + aw / 2].forEach(function (z, k) {
var outer = k ? z + aw / 2 : z - aw / 2;
dlnFace(P, nx1 - nx0, AH, st, X((nx0 + nx1) / 2), AH / 2, Z(outer), 0);
var rf = dlnBox(P, nx1 - nx0, 0.3, aw + 1, lead, X((nx0 + nx1) / 2), AH + 2, Z(z));
rf.rotation.x = k ? -0.32 : 0.32;
dlnBox(P, nx1 - nx0, AH, aw - 0.4, dlnC(0x6A665A), X((nx0 + nx1) / 2), AH / 2, Z(z));
wsmParapet(P, X(nx0), Z(outer + (k ? 0.2 : -0.2)), X(nx1), Z(outer + (k ? 0.2 : -0.2)), AH, plain, 2.4, 0);
for (var bx = nx0 + 4; bx < nx1 - 2; bx += DLN.lite ? 14 : 7) {
dlnBox(P, 1.4, AH + 6, 2.6, plain, X(bx), (AH + 6) / 2, Z(outer + (k ? 1.3 : -1.3)));
wsmPin(P, X(bx), AH + 6, Z(outer + (k ? 1.3 : -1.3)), 5, plain, 1.0);
var fl = dlnBox(P, 0.9, 0.9, Math.hypot(aw + 1.3, NH - AH - 8), plain, X(bx), (AH + 6 + NH - 2) / 2, Z(z + (k ? 1.3 : -1.3) * 0.5));
fl.rotation.x = (k ? 1 : -1) * Math.atan2(NH - AH - 8, aw + 1.3);
}
});
var tx = -160, tw = 16, tz0 = A.z0 - 16, tz1 = A.z1 + 16;
dlnBox(P, tw, NH, tz1 - tz0, st, X(tx), NH / 2, Z((tz0 + tz1) / 2));
dlnGable(P, tw, tz1 - tz0, 7, lead, X(tx), NH, Z((tz0 + tz1) / 2), Math.PI / 2);
var nf = Z(tz0) - 0.16;
var gab = new THREE.Mesh(new THREE.ConeGeometry(tw / 2 * 1.05, 8, 3), st);
gab.scale.set(1, 1, 0.06);
gab.position.set(X(tx), NH + 4, nf);
P.add(gab);
var rose = new THREE.Mesh(new THREE.CircleGeometry(5, DLN.lite ? 16 : 32), wsmGlass(3));
rose.position.set(X(tx), NH - 8, nf - 0.05);
rose.rotation.y = Math.PI;
P.add(rose);
var rr = new THREE.Mesh(new THREE.TorusGeometry(5.1, 0.3, 6, 32), plain);
rr.position.set(X(tx), NH - 8, nf - 0.1);
P.add(rr);
for (var s = 0; s < 12; s++) {
var sp = dlnBox(P, 0.12, 10, 0.1, plain, X(tx), NH - 8, nf - 0.12);
sp.rotation.z = s / 12 * Math.PI;
}
[-1, 0, 1].forEach(function (k) { dlnBox(P, 3.4, 6, 1.6, plain, X(tx + k * 4.4), 3, nf - 0.8); var po = new THREE.Mesh(new THREE.ConeGeometry(1.9, 2.2, 3), plain); po.scale.set(1, 1, 0.4); po.position.set(X(tx + k * 4.4), 7.1, nf - 1.2); P.add(po); });
[-1, 1].forEach(function (k) { dlnBox(P, 2, NH + 8, 2, plain, X(tx + k * (tw / 2 + 0.4)), (NH + 8) / 2, nf + 0.6); wsmPin(P, X(tx + k * (tw / 2 + 0.4)), NH + 8, nf + 0.6, 6, plain, 1.2); });
dlnBox(P, 13, 8, 13, st, X(tx), NH + 4, Z(zc));
wsmParapet(P, X(tx - 6.5), Z(zc - 6.7), X(tx + 6.5), Z(zc - 6.7), NH + 8, plain, 2, DLN.lite ? 0 : 2);
wsmParapet(P, X(tx - 6.5), Z(zc + 6.7), X(tx + 6.5), Z(zc + 6.7), NH + 8, plain, 2, DLN.lite ? 0 : 2);
var wx = A.x0 + 7;
[A.z0 + 6, A.z1 - 6].forEach(function (z) {
dlnBox(P, 12, 56, 12, st, X(wx), 28, Z(z));
for (var y = 14; y < 56; y += 14)
dlnBox(P, 12.6, 0.6, 12.6, plain, X(wx), y, Z(z));
var bel = dlnFace(P, 12.2, 10, dlnS("louvre", 0xB8B0A0), X(wx - 0.1), 44, Z(z), 0);
dlnFace(P, 12.2, 10, dlnS("louvre", 0xB8B0A0), X(wx - 6.1), 44, Z(z), Math.PI / 2);
var cl = new THREE.Mesh(new THREE.CircleGeometry(2, 24), new THREE.MeshBasicMaterial({ map: DLN_CANVAS.dial(), fog: true }));
cl.position.set(X(wx - 6.2), 34, Z(z));
cl.rotation.y = -Math.PI / 2;
if (z < zc)
P.add(cl);
wsmParapet(P, X(wx - 6), Z(z - 6.2), X(wx + 6), Z(z - 6.2), 56, plain, 1.6, 0);
wsmParapet(P, X(wx - 6), Z(z + 6.2), X(wx + 6), Z(z + 6.2), 56, plain, 1.6, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { wsmPin(P, X(wx + c[0] * 5.6), 56, Z(z + c[1] * 5.6), 13, plain, 1.6); });
});
var wf = X(A.x0) - 0.2;
dlnFace(P, A.z1 - A.z0 - 24, 40, st, wf + 0.2, 20, Z(zc), Math.PI / 2);
var ww = new THREE.Mesh(new THREE.PlaneGeometry(8, 15), wsmGlass(5));
ww.position.set(wf - 0.05, 24, Z(zc));
ww.rotation.y = -Math.PI / 2;
P.add(ww);
var wa = new THREE.Mesh(new THREE.CircleGeometry(4, 16, 0, Math.PI), wsmGlass(5));
wa.position.set(wf - 0.05, 31.5, Z(zc));
wa.rotation.y = -Math.PI / 2;
P.add(wa);
dlnBox(P, 1.4, 9, 7, plain, wf - 0.6, 4.5, Z(zc));
dlnBox(P, 0.2, 6, 3.6, dlnC(0x3A2412), wf - 1.35, 3, Z(zc));
var da = new THREE.Mesh(new THREE.CircleGeometry(1.8, 14, 0, Math.PI), dlnC(0x3A2412));
da.position.set(wf - 1.36, 6, Z(zc));
da.rotation.y = -Math.PI / 2;
P.add(da);
var lx0 = nx1, lx1 = nx1 + 24;
dlnBox(P, lx1 - lx0, 24, 22, st, X((lx0 + lx1) / 2), 12, Z(zc));
dlnGable(P, lx1 - lx0, 22, 5, lead, X((lx0 + lx1) / 2), 24, Z(zc));
for (var t = lx0 + 3; t < lx1; t += DLN.lite ? 8 : 4) {
[-1, 1].forEach(function (k) { dlnCyl(P, 1, 1.1, 26, plain, X(t), 13, Z(zc + k * 11.6), 8); var dm = new THREE.Mesh(new THREE.SphereGeometry(1.1, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), plain); dm.scale.y = 1.8; dm.position.set(X(t), 26, Z(zc + k * 11.6)); P.add(dm); wsmPin(P, X(t), 27.8, Z(zc + k * 11.6), 2.4, plain, 0.4); });
}
shkSolidBox(X((A.x0 + lx1) / 2), Z(zc), lx1 - A.x0 + 1, A.z1 - A.z0 + 5, 0);
shkSolidBox(X(tx), Z((tz0 + tz1) / 2), tw + 1, tz1 - tz0 + 2, 0);
shkDoor("ws_abbey", wf - 4, Z(zc), "Westminster Abbey: the great west door");
shkDoor("ws_abbey", X(tx), nf - 4, "Westminster Abbey: Solomon's Porch, the north door");
shkSpot(wf - 6, Z(zc + 8), 3, "Westminster Abbey", "look", function () { wsmTale("⛪ Westminster Abbey", WST_TALES.abbey, []); });
var cx = X(A.x0 - 11), cz = Z(zc - 20), gr = dlnS("stone", 0xC8C0B0);
dlnBox(P, 3, 1.2, 3, gr, cx, 0.6, cz);
dlnCyl(P, 0.7, 0.8, 14, dlnS("redbrick", 0xB87A6A), cx, 8.2, cz, 12);
dlnBox(P, 1.8, 1.2, 1.8, gr, cx, 15.8, cz);
dlnCyl(P, 0.3, 0.4, 1.6, dlnS("stone", 0xE0D8C8), cx, 17.2, cz, 8);
shkSolid({ x: cx, z: cz, r: 1.6 });
},
function (P, R) {
var X = wsX, Z = wsZ, port = dlnS("portland", 0xFFFFFF), geo = dlnS("georgian", 0xFFFFFF), stock = dlnS("stock", 0xFFFFFF), stone = dlnS("stone", 0xFFFFFF), Wx = WST_WHL.x0, Ex = WST_WHL.x1;
wsmBlock(P, X(Wx - 36), Z(-150), 100, 70, 24, port, Math.PI / 2, { balus: 1, base: 4, roof: 5 });
for (var c = 0; c < 2; c++) {
var cz = Z(-110 - c * 76);
dlnBox(P, 6, 30, 6, port, X(Wx - 3), 15, cz);
wsmPyr(P, X(Wx - 3), 30, cz, 3.2, 4, dlnS("slate", 0xFFFFFF));
}
dlnPlane(P, 70, 8, dlnS("setts", 0xB8B0A4), X(Wx - 35), 0.025, Z(-206));
var dg = wsmBlock(P, X(Wx - 36), Z(-218), 60, 16, 14, dlnS("stock", 0xC8B8A8), 0, { roof: 3, plain: stock, stone: stone });
for (var d = 0; d < 3; d++) {
var dx = X(Wx - 60 + d * 12);
dlnBox(P, 1.3, 2.6, 0.12, dlnC(0x0E0E10), dx, 1.4, Z(-209.9));
dlnBox(P, 1.8, 0.3, 0.3, stone, dx, 2.85, Z(-209.8));
var fan = new THREE.Mesh(new THREE.CircleGeometry(0.62, 12, 0, Math.PI), dlnGlow(0xD8C890));
fan.position.set(dx, 2.72, Z(-209.82));
P.add(fan);
var n = wSign([String(10 + d)], 0.3, 0.2, "#0E0E10", "#E8E2D4");
n.position.set(dx, 2.1, Z(-209.82));
P.add(n);
var lp = dlnBox(P, 0.9, 0.12, 0.12, dlnShine(0x141414, 0.5, 0.6), dx, 3.4, Z(-209.5));
var lan = dlnCyl(P, 0.22, 0.16, 0.5, dlnGlow(0xFFE6B0), dx, 3.25, Z(-209.1), 6);
}
shkSpot(X(Wx - 60), Z(-205), 3, "No. 10 Downing Street", "look", function () { wsmTale("🚪 No. 10 Downing Street", WST_TALES.downing, ["The door is black, with a brass lion's-head knocker and the figures 10 in white; the house behind it is far bigger than it looks from the street."]); });
wsmBlock(P, X(Wx - 36), Z(-260), 72, 70, 20, port, Math.PI / 2, { balus: 1, base: 3.4, roof: 3 });
for (var col = 0; col < (DLN.lite ? 7 : 14); col++) {
dlnCyl(P, 0.45, 0.5, 12, stone, X(Wx + 1), 10, Z(-292 + col * (64 / (DLN.lite ? 7 : 14))), 10);
}
var hz = -330, hx = Wx - 24;
wsmBlock(P, X(hx), Z(hz), 40, 24, 16, port, Math.PI / 2, { roof: false, balus: 1 });
[-1, 1].forEach(function (k) { wsmBlock(P, X(hx - 8), Z(hz + k * 22), 22, 20, 12, port, Math.PI / 2, { roof: false, balus: 1 }); });
dlnBox(P, 1, 8, 7, dlnC(0x1A1612), X(hx + 12.2), 4, Z(hz));
var ha = new THREE.Mesh(new THREE.CircleGeometry(3.5, 14, 0, Math.PI), dlnC(0x1A1612));
ha.position.set(X(hx + 12.7), 8, Z(hz));
ha.rotation.y = Math.PI / 2;
P.add(ha);
dlnBox(P, 8, 6, 8, port, X(hx), 19, Z(hz));
var cl = new THREE.Mesh(new THREE.CircleGeometry(1.6, 24), new THREE.MeshBasicMaterial({ map: DLN_CANVAS.dial(), fog: true }));
cl.position.set(X(hx + 4.05), 19.5, Z(hz));
cl.rotation.y = Math.PI / 2;
P.add(cl);
dlnCyl(P, 2.4, 3, 4, port, X(hx), 24, Z(hz), 8);
var cup = new THREE.Mesh(new THREE.SphereGeometry(2.5, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), dlnS("slate", 0x8A8E94));
cup.position.set(X(hx), 26, Z(hz));
P.add(cup);
dlnCyl(P, 0.1, 0.1, 2.2, dlnShine(0xC8A048, 0.3, 0.85), X(hx), 29, Z(hz), 6);
WSM.troopers = [];
[-9, 9].forEach(function (k, i) {
var bx = X(Wx - 5), bz = Z(hz + k);
dlnBox(P, 3.4, 0.3, 4.8, stone, bx, 4.6, bz);
[-1, 1].forEach(function (s) { dlnBox(P, 3.4, 4.6, 0.3, port, bx, 2.3, bz + s * 2.3); });
dlnBox(P, 0.3, 4.6, 4.8, port, bx - 1.7, 2.3, bz);
var hh = wsmHorse(0x141010);
hh.position.set(bx + 0.3, 0, bz);
hh.rotation.y = Math.PI / 2;
WSM.live.add(hh);
var rider = dlnPerson("ws_lg" + i, "lifeguard", { sex: "m" });
rider.position.set(bx + 0.2, 1.02, bz);
rider.rotation.y = Math.PI / 2;
SHK.live.add(rider);
SHK.people.push({ g: rider, ground: 1.02 });
if (i === 0)
SHK.talk.push({ p: { g: rider }, name: WST_FOLK.trooper.name, r: 4, t: { name: WST_FOLK.trooper.name, persona: WST_FOLK.trooper.persona, greet: WST_FOLK.trooper.greet } });
shkSolidBox(bx, bz, 3.6, 5, 0);
});
shkSpot(X(Wx + 1), Z(hz), 3.4, "The Horse Guards", "look", function () { wsmTale("🐎 The Horse Guards", WST_TALES.guards, []); });
wsmBlock(P, X(Wx - 36), Z(-388), 40, 70, 20, port, Math.PI / 2, { balus: 1, base: 3 });
wsmBlock(P, X(Ex + 30), Z(-150), 96, 60, 20, geo, -Math.PI / 2, { base: 3.4, roof: 4 });
var hope = wsmBlock(P, X(Ex + 22), Z(-262), 40, 44, 17, dlnS("georgian", 0xF0E8DC), -Math.PI / 2, { base: 3.4, roof: 3.6, balus: 1 });
for (var h = 0; h < 4; h++) {
var hz2 = Z(-277 + h * 10);
dlnBox(P, 0.2, 2.8, 1.4, dlnC(h === 1 ? 0x1E2A3A : 0x141416), X(Ex) - 0.12, 1.6, hz2);
[-1, 1].forEach(function (k) { dlnCyl(P, 0.18, 0.2, 3.4, stone, X(Ex) - 0.6, 1.7, hz2 + k * 1.1, 10); });
dlnBox(P, 1.2, 0.4, 3, stone, X(Ex) - 0.6, 3.5, hz2);
dlnBox(P, 1.6, 0.18, 2.4, stone, X(Ex) - 1.0, 0.09, hz2);
}
shkDoor("ws_hope", X(Ex - 2.8), Z(-267), "Whitehall Terrace: the Right Honourable Trelawney Hope's house");
var bq = wsmBlock(P, X(Ex + 19), Z(-311), 34, 38, 18, port, -Math.PI / 2, { base: 5, roof: false, balus: 1 });
for (var bc = 0; bc < (DLN.lite ? 4 : 8); bc++) {
var bzz = Z(-322 + bc * (22 / (DLN.lite ? 3 : 7)));
dlnCyl(P, 0.32, 0.36, 6, stone, X(Ex) - 0.4, 8, bzz, 10);
dlnCyl(P, 0.28, 0.32, 6, stone, X(Ex) - 0.4, 14.4, bzz, 10);
}
shkSpot(X(Ex - 3), Z(-311), 3.4, "The Banqueting House", "look", function () { wsmTale("👑 The Banqueting House", WST_TALES.banqueting, []); });
wsmBlock(P, X(Ex + 30), Z(-375), 66, 60, 24, port, -Math.PI / 2, { base: 4, roof: 6 });
for (var lz = -400; lz < -95; lz += DLN.lite ? 40 : 20) {
dlnLamp(P, X(Wx - 1.2), Z(lz));
dlnLamp(P, X(Ex + 1.2), Z(lz + 10));
}
var sh = dlnS("boards", 0x2A4A34);
dlnBox(P, 3, 2.6, 6, sh, X(WST_CAB.x + 6), 1.3, Z(WST_CAB.z));
dlnGable(P, 3, 6, 1.1, dlnS("slate", 0xFFFFFF), X(WST_CAB.x + 6), 2.6, Z(WST_CAB.z), Math.PI / 2);
shkSolidBox(X(WST_CAB.x + 6), Z(WST_CAB.z), 3.2, 6.2, 0);
var nx = X(-30), nz = Z(-520);
dlnBox(P, 12, 4, 12, dlnS("stone", 0xC8C2B4), nx, 2, nz);
dlnCyl(P, 1.8, 2.1, 44, dlnS("stone", 0xD0CAB8), nx, 26, nz, 16);
dlnBox(P, 4, 3, 4, dlnShine(0x3A4A3E, 0.55, 0.55), nx, 49.5, nz);
dlnCyl(P, 0.4, 0.5, 4.2, dlnShine(0x3A4A3E, 0.55, 0.55), nx, 53, nz, 8);
},
function (P) {
var X = wsX, Z = wsZ, br = dlnS("yardbrick", 0xFFFFFF), port = dlnS("portland", 0xFFFFFF), slate = dlnS("slate", 0xFFFFFF), cx = 122, cz = -143, w = 48, d = 62, H = 22;
var g = wsmBlock(P, X(cx), Z(cz), d, w, H, br, Math.PI / 2, { plain: br, ends: br, stone: port, roof: 7, base: 5 });
dlnBox(P, w + 0.1, 5, d + 0.1, dlnS("stone", 0x8A847A), X(cx), 2.5, Z(cz));
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { var tx = X(cx + c[0] * w / 2), tz = Z(cz + c[1] * d / 2); dlnCyl(P, 3, 3, H + 4, br, tx, (H + 4) / 2, tz, DLN.lite ? 8 : 14); var cap = new THREE.Mesh(new THREE.ConeGeometry(3.4, 7, DLN.lite ? 8 : 14), slate); cap.position.set(tx, H + 7.5, tz); P.add(cap); });
[-1, 1].forEach(function (k) { dlnGable(P, 10, 4, 5, slate, X(cx + w / 2 - 2), H + 2, Z(cz + k * 14), Math.PI / 2); });
dlnBox(P, 0.3, 3.6, 2.6, dlnC(0x1A1A1E), X(cx + w / 2) + 0.1, 1.8, Z(cz + 6));
var lamp = dlnBox(P, 0.6, 0.8, 0.6, dlnGlow(0x7AA0FF), X(cx + w / 2) + 0.5, 4.2, Z(cz + 6));
shkDoor("ws_yard", X(cx + w / 2) + 2.6, Z(cz + 6), "New Scotland Yard: the Metropolitan Police");
shkSpot(X(cx + w / 2) + 3, Z(cz - 6), 3, "New Scotland Yard", "look", function () { wsmTale("👮 New Scotland Yard", WST_TALES.yard, []); });
},
function (P, R) {
var X = wsX, Z = wsZ, G = WST_GOD;
dlnTerrace(P, WST_X + G.x0, WST_X + G.x1, Z(G.z - 8), 1, 4, { tint: 0xD8B8A0, nums: function (i) { return 2 + 2 * i; } });
dlnTerrace(P, WST_X + G.x0, WST_X + G.x1, Z(G.z + 8), -1, 4, { tint: 0xC8A890, nums: function (i) { return 1 + 2 * i; } });
var hw = (G.x1 - G.x0) / Math.max(1, Math.round((G.x1 - G.x0) / 10.8)), lx = G.x0 + hw * 7 + hw - 1.9;
WSM.lucasDoor = { x: lx, z: G.z - 8 };
var lamp = dlnCyl(P, 0.2, 0.14, 0.5, dlnGlow(0xFFE6B0), X(lx), 3.4, Z(G.z - 7.4), 6);
shkDoor("ws_lucas", X(lx), Z(G.z - 5.2), "No. 16 Godolphin Street");
for (var l = G.x0 + 8; l < G.x1; l += DLN.lite ? 40 : 20)
dlnLamp(P, X(l), Z(G.z - 5.4));
shkSpot(X(G.x0 + 6), Z(G.z), 3, "Godolphin Street", "look", function () { wsmTale("🏠 Godolphin Street", null, ["\"One of those old-world and secluded rows of eighteenth-century houses which lie between the river and the Abbey, almost in the shadow of the great Tower of the Houses of Parliament.\"", "So Watson writes of it in The Second Stain. No. 16 is the house of Mr Eduardo Lucas, 'well known in society circles both on account of his charming personality and because he has the well-deserved reputation of being one of the best amateur tenors in the country'."]); });
var sx = 66, sz = 338, port = dlnS("portland", 0xE8E2D4);
dlnPlane(P, 48, 44, dlnS("setts", 0xA8A090), X(sx), 0.025, Z(sz));
dlnBox(P, 22, 16, 30, port, X(sx), 8, Z(sz));
dlnGable(P, 22, 30, 4, dlnS("slate", 0xFFFFFF), X(sx), 16, Z(sz), Math.PI / 2);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { var tx = X(sx + c[0] * 11), tz = Z(sz + c[1] * 15); dlnCyl(P, 2.2, 2.4, 22, port, tx, 11, tz, 8); var cap = new THREE.Mesh(new THREE.ConeGeometry(2.3, 4, 8), dlnS("slate", 0x8A8E94)); cap.position.set(tx, 24, tz); P.add(cap); dlnCyl(P, 0.08, 0.08, 1.6, dlnShine(0xC8A048, 0.3, 0.85), tx, 26.6, tz, 4); });
[-1, 1].forEach(function (k) { var pd = dlnGable(P, 0.6, 14, 3.2, port, X(sx), 16, Z(sz + k * 15.2), 0); for (var c = 0; c < 4; c++)
dlnCyl(P, 0.45, 0.5, 12, port, X(sx - 6 + c * 4), 6, Z(sz + k * 16.2), 10); });
shkSolidBox(X(sx), Z(sz), 24, 34, 0);
shkSpot(X(sx - 14), Z(sz), 3, "St John's, Smith Square", "look", function () { wsmTale("⛪ St John's, Smith Square", WST_TALES.smith, []); });
[[sx - 24, -1], [sx + 24, 1]].forEach(function (e) { dlnTerrace(P, WST_X + sx - 22, WST_X + sx + 22, Z(sz + e[1] * 24), -e[1], 4, { tint: 0xD0B098 }); });
for (var az = 120; az < 330; az += 24) {
var b = wsmBlock(P, X(-34), Z(az), 20, 14, 15, dlnS("georgian", 0xE0C8B0), Math.PI / 2, { roof: 3, base: 3.3 });
}
for (var bz = 310; bz < 400; bz += 22) {
dlnBench(P, X(160), Z(bz), -Math.PI / 2);
dlnLamp(P, X(166), Z(bz + 11));
}
dlnBox(P, 0.8, 1.0, 120, dlnS("stone", 0x9A968C), X(WST_RIV.x0 - 0.6), 0.5, Z(350));
shkSolidBox(X(WST_RIV.x0 - 0.6), Z(350), 0.8, 120, 0, 1.0);
dlnTerrace(P, WST_X - 260, WST_X - 100, Z(404), -1, 5, { tint: 0xC8A890, noRail: 1 });
dlnTerrace(P, WST_X - 100, WST_X + 30, Z(404), -1, 4, { tint: 0xD0B098, noRail: 1 });
for (var wz = -60; wz < 300; wz += 60)
wsmBlock(P, X(-262), Z(wz + 30), 58, 16, 20, dlnS("georgian", 0xD8C0A8), Math.PI / 2, { roof: 3, base: 3.3 });
},
function () {
var g = new THREE.Group(), red = dlnShine(0x7A1A1E, 0.45, 0.2), cream = dlnC(0xF0E6CC), dark = dlnC(0x1A1A1E), glass = dlnGlow(0x9AAAB4);
dlnBox(g, 2.2, 2.0, 10, red, 0, 1.5, 0);
dlnBox(g, 2.24, 0.8, 9, glass, 0, 1.95, 0);
dlnBox(g, 2.2, 0.2, 10.4, cream, 0, 2.6, 0);
dlnBox(g, 2.1, 1.2, 9.6, cream, 0, 3.3, 0);
dlnBox(g, 2.14, 0.6, 9.2, glass, 0, 3.4, 0);
dlnBox(g, 2.2, 0.12, 10, dark, 0, 3.96, 0);
[-1, 1].forEach(function (k) {
var sb = dlnPanel(["EMBANKMENT · BLACKFRIARS"], "L.C.C. TRAMWAYS", 6, 0.5, "#F0E6CC", "#7A1A1E");
sb.position.set(k * 1.13, 2.95, 0);
sb.rotation.y = k * Math.PI / 2;
g.add(sb);
for (var w = 0; w < 2; w++) {
var wh = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.12, 12), dark);
wh.rotation.z = Math.PI / 2;
wh.position.set(k * 0.85, 0.42, (w ? 2.8 : -2.8));
g.add(wh);
}
});
dlnBox(g, 1.6, 0.12, 0.8, dark, 0, 0.5, 5.4);
dlnBox(g, 1.6, 0.12, 0.8, dark, 0, 0.5, -5.4);
return g;
},
function () {
var X = wsX, Z = wsZ, live = WSM.live, R = wRand(1912);
for (var t = 0; t < (DLN.lite ? 1 : 2); t++) {
var tr = wsmTram();
live.add(tr);
WSM.trams.push({ g: tr, x: t ? 160.9 : 155, z: -380 + t * 150, dir: t ? 1 : -1, sp: 5.5 });
}
var loop = [[-32, -400], [-32, -96], [-128, -96], [-128, 20], [-18, 20], [-18, -41], [150, -41], [322, -41], [150, -41], [-18, -41], [-18, -96], [-32, -96]];
WSM.loop = loop;
var Ld = 0;
for (var i = 1; i < loop.length; i++)
Ld += Math.hypot(loop[i][0] - loop[i - 1][0], loop[i][1] - loop[i - 1][1]);
WSM.loopL = Ld;
for (var b = 0; b < (DLN.lite ? 3 : 6); b++) {
var bus = kgnBus(b % 3 === 2);
live.add(bus);
WSM.buses.push({ g: bus, s: b * Ld / (DLN.lite ? 3 : 6), sp: b % 3 === 2 ? 3.2 : 5, off: b % 2 ? 2.5 : -2.5 });
}
for (var c = 0; c < (DLN.lite ? 2 : 5); c++) {
var cg = new THREE.Group();
live.add(cg);
dlnHansom(cg, 0, 0, 0);
WSM.buses.push({ g: cg, s: (c + 0.5) * Ld / (DLN.lite ? 2 : 5), sp: 4.2, off: c % 2 ? -2 : 2, cab: 1 });
}
var st = wsmSteamer();
live.add(st);
WSM.boats.push({ g: st, x: 215, z: -300, sp: 3.0 });
for (var k = 0; k < (DLN.lite ? 1 : 2); k++) {
var bg = wsmBarge();
live.add(bg);
WSM.boats.push({ g: bg, x: 250 + k * 24, z: 120 - k * 260, sp: -1.2 - k * 0.4 });
}
for (var r = 0; r < (DLN.lite ? 2 : 4); r++)
dlnHansom(live, X(WST_CAB.x - 2), Z(WST_CAB.z - 10 - r * 7), Math.PI);
shkSpot(X(WST_CAB.x), Z(WST_CAB.z), 3.4, "The cab rank", "take a cab", function () { wsmCabCard(); });
},
function (k, x, z, ry, o) {
var F = WST_FOLK[k], inside = !!(o && o.P && o.P !== SHK.live), p = dlnPerson("ws_" + k, F.dress, { sex: F.sex, child: !!F.child, inside: inside });
var y = (o && o.y != null) ? o.y : 0.14;
p.position.set(inside ? x : wsX(x), y, inside ? z : wsZ(z));
p.rotation.y = ry || 0;
((o && o.P) || SHK.live).add(p);
var P = { g: p, key: "wsm_" + k, wander: o && o.wander ? { r: o.wander, sp: 0.5 } : null, ground: y };
SHK.people.push(P);
SHK.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet } });
return P;
},
function (R) {
var X = wsX, Z = wsZ, crowd = function (n, x0, x1, z0, z1, kinds, o) {
if (DLN.lite)
n = Math.ceil(n * 0.4);
for (var i = 0; i < n; i++) {
var px = x0 + R() * (x1 - x0), pz = z0 + R() * (z1 - z0);
if (shkSolidAt(X(px), Z(pz), 0) || wsmRiver(px, pz))
continue;
var who = kinds[(R() * kinds.length) | 0], p = dlnPerson("ws" + SHK.people.length + "_" + i, who);
p.position.set(X(px), 0.14, Z(pz));
p.rotation.y = R() * 6.28;
SHK.live.add(p);
SHK.people.push({ g: p, wander: o && o.still ? null : { r: o && o.r || 10, sp: 0.4 + R() * 0.5 }, ground: 0.14 });
}
};
var town = ["gent", "gent", "lady", "statesman", "gent", "lady", "clergy", "oldgent", "maid", "worker", "newsboy", "police"];
crowd(26, -52, -48, -400, -100, town, { r: 20 });
crowd(26, -16, -12, -400, -100, town, { r: 20 });
crowd(22, WST_SQ.x0, WST_SQ.x1, WST_SQ.z0, WST_SQ.z1, ["gent", "lady", "nanny", "statesman", "oldgent", "suffragist", "girl", "boy", "lady"], { r: 16 });
crowd(18, -30, 120, -60, -54, ["gent", "lady", "worker", "flowerseller", "newsboy", "police", "statesman"], { r: 18 });
crowd(16, WST_EMB.x0 + 1, WST_EMB.x1 - 1, -400, -70, ["gent", "lady", "nanny", "worker", "oldgent", "sailorboy", "girl"], { r: 22 });
crowd(14, -252, -244, 30, 110, ["lady", "gent", "clergy", "oldgent", "nanny", "girl"], { r: 10 });
crowd(10, -10, 58, -28, 8, ["statesman", "statesman", "gent", "police", "doorkeeper"], { r: 10 });
crowd(10, -80, 20, 325, 336, ["gent", "lady", "maid", "oldgent", "worker"], { r: 12 });
crowd(10, 140, 166, 300, 404, ["nanny", "lady", "girl", "boy", "oldgent", "sailorboy"], { r: 10 });
crowd(6, -12, 50, 110, 200, ["statesman", "gent", "police", "lady"], { r: 14 });
for (var b = 0; b < (DLN.lite ? 4 : 12); b++) {
var bx = WST_RIV.x0 - 10 + R() * (WST_RIV.x1 - WST_RIV.x0 + 20), bz = R() < 0.5 ? WST_BR.z0 + 1.2 : WST_BR.z1 - 1.2, who = ["gent", "lady", "worker", "gent", "oldgent", "flowerseller"][(R() * 6) | 0];
var p = dlnPerson("wsb_" + b, who);
p.position.set(X(bx), WST_BR.y + 0.14, Z(bz));
p.rotation.y = R() < 0.5 ? Math.PI / 2 : -Math.PI / 2;
SHK.live.add(p);
SHK.people.push({ g: p, ground: WST_BR.y + 0.14 });
}
wsmNamed("pc", 2, -24, -Math.PI / 2, { wander: 6 });
wsmNamed("verger", -252, 72, -Math.PI / 2);
wsmNamed("flowers", 132, -55.5, Math.PI);
wsmNamed("news", -22, -56, Math.PI * 0.75);
wsmNamed("suff", -60, -93, Math.PI);
wsmNamed("conductor", 156, -122, 0);
wsmNamed("lamps", 164, -250, Math.PI / 2, { wander: 30 });
var pc = dlnPerson("ws_no10", "police", { sex: "m" });
pc.position.set(X(WST_WHL.x0 - 58), 0.14, Z(-208.6));
SHK.live.add(pc);
SHK.people.push({ g: pc, ground: 0.14 });
},
function () {
if (WSM.built || !SHK.G)
return;
DLN.lite = WSM.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(1912), live0 = SHK.live;
WSM.live = new THREE.Group();
WSM.live.name = "wsm-live";
SHK.G.add(WSM.live);
WSM.trams = [];
WSM.boats = [];
WSM.buses = [];
WSM.hands = [];
var parts = [["wsm-palace", 110, 140, 240], ["wsm-river", 240, 0, 300], ["wsm-square", -120, 10, 190], ["wsm-white", -20, -260, 220], ["wsm-south", -60, 330, 170]];
var groups = {};
parts.forEach(function (p) { var g = new THREE.Group(); g.name = p[0]; SHK.G.add(g); groups[p[0]] = g; SHK.dist.push({ n: p[0], g: g, x: wsX(p[1]), z: wsZ(p[2]), r: p[3] }); });
var all = new THREE.Group();
SHK.G.add(all);
[[wsmGround, "ground"], [wsmRiverBuild, "river"], [wsmBridge, "bridge"], [wsmPalace, "palace"], [wsmSquare, "square"], [wsmAbbey, "abbey"], [wsmWhitehall, "whitehall"], [wsmYard, "yard"], [wsmSouth, "south"]].forEach(function (f) { try {
f[0](all, R);
}
catch (e) {
if (window.console)
console.warn("[westminster] " + f[1], e);
} });
try {
wsmTraffic();
}
catch (e) {
if (window.console)
console.warn("[westminster] traffic", e);
}
try {
wsmFolk(R);
}
catch (e) {
if (window.console)
console.warn("[westminster] folk", e);
}
SHK.G.remove(all);
all.children.slice().forEach(function (m) {
if (m.userData && m.userData.keep) {
WSM.live.add(m);
return;
}
var x = m.position.x - wsX(0), z = m.position.z - WST_Z, k;
if (m.geometry && m.geometry.parameters && (m.geometry.parameters.width > 300 || m.geometry.parameters.height > 300)) {
WSM.live.add(m);
return;
}
if (x > WST_RIV.x0 - 2)
k = "wsm-river";
else if (z < -96)
k = "wsm-white";
else if (z > 296)
k = "wsm-south";
else if (x > -4)
k = "wsm-palace";
else
k = "wsm-square";
groups[k].add(m);
});
for (var k in groups) {
try {
ctnMerge(groups[k]);
groups[k].children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) {
if (window.console)
console.warn("[westminster] bake " + k, e);
}
}
SHK.live = live0;
WSM.built = true;
wsmClockSet(true);
},
function (dt, t) {
if (!WSM.built)
return;
WSM.ct = (WSM.ct || 0) + dt;
if (WSM.ct > 1) {
WSM.ct = 0;
wsmClockSet();
}
if (WSM.ayrton) {
var lit = !!WSM.sitting;
WSM.ayrton.material.color.setHex(lit ? 0xFFF2C8 : 0x6A5A3A);
}
if (WSM.flag)
WSM.flag.rotation.y = Math.sin(t * 1.3) * 0.18;
WSM.trams.forEach(function (T) { T.z += T.dir * T.sp * dt; if (T.z > -60) {
T.z = -60;
T.dir = -1;
} if (T.z < -400) {
T.z = -400;
T.dir = 1;
} T.g.position.set(wsX(T.x), 0.05, wsZ(T.z)); T.g.rotation.y = T.dir > 0 ? 0 : Math.PI; });
WSM.buses.forEach(function (B) {
B.s += B.sp * dt;
var p = wsmLoopAt(B.s), q = wsmLoopAt(B.s + 2), a = Math.atan2(q.x - p.x, q.z - p.z), ox = Math.cos(a) * B.off, oz = -Math.sin(a) * B.off;
B.g.position.set(wsX(p.x + ox), wsmBridgeY(p.x + ox) + 0.02, wsZ(p.z + oz));
B.g.rotation.y = a + (B.cab ? Math.PI : 0);
});
WSM.boats.forEach(function (B) { B.z += B.sp * dt; if (B.z > 440)
B.z = -440; if (B.z < -440)
B.z = 440; B.g.position.set(wsX(B.x), -2.4, wsZ(B.z)); B.g.rotation.y = B.sp > 0 ? 0 : Math.PI; });
},
function (g, x, y, z, ry, w, h, mat) {
var d = new THREE.Group();
d.position.set(x, y || 0, z);
d.rotation.y = ry || 0;
g.add(d);
w = w || 2;
h = h || 3.2;
dlnBox(d, w, h, 0.16, mat || dlnS("oak", 0xFFFFFF), 0, h / 2, 0);
var a = new THREE.Mesh(new THREE.CircleGeometry(w / 2, 12, 0, Math.PI), mat || dlnS("oak", 0xFFFFFF));
a.position.set(0, h, 0.02);
d.add(a);
var fr = new THREE.Mesh(new THREE.TorusGeometry(w / 2 + 0.12, 0.1, 4, 14, Math.PI), dlnS("stone", 0xD8D0C0));
fr.position.set(0, h, 0.06);
d.add(fr);
return d;
},
function (g, cx, cz, R, Rm) {
var h = 9, stone = dlnS("perpplain", 0xC8BCA4), iron = dlnShine(0x1E1E20, 0.55, 0.6);
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0xFFFFFF), wall: stone, h: h, ceil: dlnGlow(0x3A3830), outName: "Out to Bridge Street", out: function () { shkGoOut("ws_clock"); } });
for (var s = 0; s < 28; s++) {
var a = s / 14 * Math.PI, r = Rm.hw - 1.0, y = 0.2 + s * 0.3;
var st = dlnBox(g, 1.6, 0.18, 0.7, stone, cx + Math.cos(a) * r, y, cz + Math.sin(a) * r);
st.rotation.y = -a;
}
dlnCyl(g, 0.9, 0.9, h, stone, cx, h / 2, cz, 12);
shkSolid({ x: cx, z: cz, r: 1.2 });
for (var b = 0; b < 9; b++)
dlnCyl(g, 0.02, 0.02, h - 1, iron, cx - 1.6 + b * 0.4, (h - 1) / 2 + 0.5, cz - Rm.hd + 0.5, 4);
var wt = dlnBox(g, 0.8, 1.4, 0.6, dlnShine(0x2A2A2E, 0.5, 0.6), cx - 0.4, 4.5, cz - Rm.hd + 0.9);
dlnCyl(g, 0.02, 0.02, 3, iron, cx - 0.4, 6.6, cz - Rm.hd + 0.9, 4);
for (var l = 0; l < 3; l++) {
var gl = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), dlnGlow(0xFFE2A8));
gl.position.set(cx + (l - 1) * 3.6, 2.6 + l * 2, cz + Rm.hd - 0.5);
g.add(gl);
}
var pl = dlnPanel(["The stair: 334 steps to the belfry,", "290 to the clock room.", "Mind the turns. Gas is lit at each landing."], "THE CLOCK TOWER", 2.4, 1.4, "#E8E0CC", "#2A2420");
pl.position.set(cx + Rm.hw - 0.05, 1.8, cz);
pl.rotation.y = -Math.PI / 2;
g.add(pl);
shkSpot(cx + Rm.hw - 1.4, cz - 2.6, 2.4, "Up the stair", "climb to the clock room (290 steps)", function () { shkGoIn("ws_clockrm"); });
Rm.hello = "<b>The foot of the Clock Tower.</b> A narrow stone stair winds up round the walls: 290 steps to the clock room, 334 to Big Ben.";
},
function (g, cx, cz, R, Rm) {
var h = 6, iron = dlnShine(0x2A3A34, 0.5, 0.6), brass = dlnShine(0xC8A048, 0.3, 0.85), stone = dlnS("perpplain", 0xC0B49C);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: stone, h: h, ceil: dlnGlow(0x4A443A), outName: "Down the stair", out: function () { shkGoIn("ws_clock"); } });
var back = DLN.tex.dialback || (DLN.tex.dialback = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#2A2A28";
x.fillRect(0, 0, W, H);
var gr = x.createRadialGradient(W / 2, H / 2, 10, W / 2, H / 2, W * 0.48);
gr.addColorStop(0, "#FFF6DE");
gr.addColorStop(1, "#E8DAB8");
x.fillStyle = gr;
x.beginPath();
x.arc(W / 2, H / 2, W * 0.47, 0, 7);
x.fill();
x.strokeStyle = "#2A2A28";
x.lineWidth = 5;
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2;
x.beginPath();
x.moveTo(W / 2, H / 2);
x.lineTo(W / 2 + Math.sin(a) * W * 0.47, H / 2 - Math.cos(a) * W * 0.47);
x.stroke();
}
for (var r = 1; r < 4; r++) {
x.beginPath();
x.arc(W / 2, H / 2, W * 0.12 * r, 0, 7);
x.stroke();
}
}));
[[0, -Rm.hd + 0.05, 0], [-Rm.hw + 0.05, 0, Math.PI / 2], [Rm.hw - 0.05, 0, -Math.PI / 2]].forEach(function (f) { var d = new THREE.Mesh(new THREE.CircleGeometry(2.6, 32), new THREE.MeshBasicMaterial({ map: back, fog: false })); d.position.set(cx + f[0], 3, cz + f[1]); d.rotation.y = f[2]; g.add(d); });
dlnBox(g, 4.6, 0.3, 1.4, iron, cx, 1.1, cz - 0.4);
[-2.2, 2.2].forEach(function (k) { dlnBox(g, 0.2, 1.0, 1.4, iron, cx + k, 0.5, cz - 0.4); });
[-1.5, 0, 1.5].forEach(function (tx, i) {
for (var w = 0; w < 3; w++) {
var wh = new THREE.Mesh(new THREE.CylinderGeometry(0.5 - w * 0.12, 0.5 - w * 0.12, 0.06, DLN.lite ? 14 : 24), i === 1 ? brass : iron);
wh.rotation.x = Math.PI / 2;
wh.position.set(cx + tx, 1.7 + w * 0.5, cz - 0.4 + (w - 1) * 0.25);
g.add(wh);
}
var drum = dlnCyl(g, 0.32, 0.32, 1.2, iron, cx + tx, 1.6, cz - 0.4, 14);
drum.rotation.x = Math.PI / 2;
});
[-1.5, 1.5].forEach(function (tx) { var fl = new THREE.Group(); fl.position.set(cx + tx, 3.3, cz - 0.4); g.add(fl); for (var v = 0; v < 2; v++) {
var vn = dlnBox(fl, 1.2, 0.4, 0.03, iron, 0, 0, 0);
vn.rotation.z = v * Math.PI / 2;
} });
var esc = dlnBox(g, 0.6, 0.6, 0.3, brass, cx, 3.2, cz - 0.4);
dlnCyl(g, 0.04, 0.04, 2.2, iron, cx, 4.1, cz - 0.4, 6);
shkSolidBox(cx, cz - 0.4, 4.8, 1.8, 0, 4);
var pg = new THREE.Group();
pg.position.set(cx, 2.6, cz + 1.5);
Rm.live.add(pg);
var rod = dlnBox(pg, 0.06, 3.6, 0.06, iron, 0, -1.8, 0);
var bob = dlnCyl(pg, 0.32, 0.32, 0.4, iron, 0, -3.6, 0, 16);
bob.rotation.x = Math.PI / 2;
var tray = dlnCyl(pg, 0.2, 0.2, 0.04, brass, 0, -1.0, 0, 10);
WSM.pend = pg;
var hole = dlnBox(g, 1.6, 0.04, 0.9, dlnC(0x0A0A0A), cx, 0.02, cz + 1.5);
dlnRail(g, cx - 1, cz + 1.0, cx + 1, cz + 1.0, 0.9);
dlnRail(g, cx - 1, cz + 2.0, cx + 1, cz + 2.0, 0.9);
shkSolidBox(cx, cz + 1.5, 1.8, 1.2, 0, 1);
dlnBox(g, 1.6, 0.8, 0.6, dlnS("oak", 0xFFFFFF), cx + Rm.hw - 1.0, 0.4, cz + 2.6);
var log = dlnBox(g, 0.4, 0.05, 0.3, dlnC(0x3A2A1A), cx + Rm.hw - 1.0, 0.83, cz + 2.6);
shkSolidBox(cx + Rm.hw - 1.0, cz + 2.6, 1.7, 0.7, 0, 1);
wsmNamed("keeper", cx + 2.4, cz + 1.6, -Math.PI * 0.6, { P: Rm.live, y: 0.14 });
shkSpot(cx, cz + 0.6, 2.2, "The Great Clock", "look at it going", function () { wsmTale("⚙️ The Great Clock", WST_TALES.clock, ["Its pendulum is thirteen feet long and swings once every two seconds. On its tray are old pennies: put one more on and the clock gains two-fifths of a second a day.", "It is wound by hand three times a week, and the striking trains take hours to wind."]); });
shkSpot(cx + Rm.hw - 1.4, cz - 2.6, 2.2, "Up again", "climb to the belfry (44 more steps)", function () { shkGoIn("ws_belfry"); });
Rm.hello = "<b>The clock room.</b> Behind the four dials, the Great Clock is going: tick... tock..., two seconds a beat. The dials glow on three walls.";
},
function (g, cx, cz, R, Rm) {
var h = 9, iron = dlnShine(0x2A2E30, 0.5, 0.6), bronze = dlnShine(0x6A5A3A, 0.4, 0.75), stone = dlnS("perpplain", 0xC0B49C);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("louvre", 0xFFFFFF), h: h, ceil: dlnGlow(0x2A2A28), outName: "Down to the clock room", out: function () { shkGoIn("ws_clockrm"); } });
[[0, -Rm.hd + 0.25, 0], [-Rm.hw + 0.25, 0, Math.PI / 2], [Rm.hw - 0.25, 0, -Math.PI / 2]].forEach(function (f) { var sky = new THREE.Mesh(new THREE.PlaneGeometry(Rm.hw * 2 - 1, 5), new THREE.MeshBasicMaterial({ color: 0x7A8A98, fog: false })); sky.position.set(cx + f[0] * 1.02, 4.5, cz + f[1] * 1.02); sky.rotation.y = f[2]; g.add(sky); });
[[-3, -3], [3, -3], [-3, 3], [3, 3]].forEach(function (c) { dlnBox(g, 0.3, 7.5, 0.3, iron, cx + c[0], 3.75, cz + c[1]); });
dlnBox(g, 6.6, 0.3, 0.3, iron, cx, 7.4, cz - 3);
dlnBox(g, 6.6, 0.3, 0.3, iron, cx, 7.4, cz + 3);
dlnBox(g, 0.3, 0.3, 6.6, iron, cx, 7.4, cz);
var bell = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.01, 3.4), new THREE.Vector2(0.9, 3.35), new THREE.Vector2(1.05, 3.0), new THREE.Vector2(1.1, 2.2), new THREE.Vector2(1.3, 1.4), new THREE.Vector2(1.6, 0.7), new THREE.Vector2(1.45, 0.55), new THREE.Vector2(1.38, 0.62)], DLN.lite ? 16 : 28), bronze);
bell.material.side = THREE.DoubleSide;
bell.position.set(cx, 3.2, cz);
g.add(bell);
dlnBox(g, 0.5, 0.6, 0.5, iron, cx, 6.9, cz);
var hm = new THREE.Group();
hm.position.set(cx + 1.9, 4.6, cz);
Rm.live.add(hm);
dlnBox(hm, 0.08, 0.08, 1.2, iron, 0, 0, 0).rotation.x = 0;
var head = dlnCyl(hm, 0.22, 0.22, 0.5, iron, -0.2, -0.7, 0, 10);
dlnBox(hm, 0.06, 1.4, 0.06, iron, 0, -0.4, 0);
WSM.hammer = hm;
shkSolid({ x: cx, z: cz, r: 2.0 });
[[-3.6, -3.6, 0.55], [3.6, -3.6, 0.7], [-3.6, 3.6, 0.8], [3.6, 3.6, 1.0]].forEach(function (q) {
var b = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.01, 1.6 * q[2]), new THREE.Vector2(0.45 * q[2], 1.55 * q[2]), new THREE.Vector2(0.55 * q[2], 1.0 * q[2]), new THREE.Vector2(0.8 * q[2], 0.3 * q[2]), new THREE.Vector2(0.72 * q[2], 0.25 * q[2])], 14), bronze);
b.material.side = THREE.DoubleSide;
b.position.set(cx + q[0], 5.0, cz + q[1]);
g.add(b);
dlnBox(g, 0.2, 0.2, 1.6, iron, cx + q[0], 5.0 + 1.6 * q[2] + 0.1, cz + q[1]);
});
var pl = dlnPanel(["THIS BELL WAS CAST BY GEORGE MEARS", "OF WHITECHAPEL FOR THE CLOCK", "OF THE HOUSES OF PARLIAMENT", "1858"], "BIG BEN", 2.4, 1.4, "#3A3022", "#D8B048");
pl.position.set(cx, 1.6, cz + 1.62);
g.add(pl);
shkSpot(cx, cz + 3.2, 2.6, "Big Ben", "look at the great bell", function () { wsmTale("🔔 Big Ben", WST_TALES.bell, [WST_TALES.quarters]); });
shkSpot(cx - Rm.hw + 1.4, cz + Rm.hd - 1.8, 2.2, "Wait for the hour", "stand by and hear it strike (stop your ears!)", function () { wsmStrike(); });
Rm.hello = "<b>The belfry.</b> Big Ben hangs in its iron frame, the four quarter bells round it. The wind comes through the louvres; all London is below.";
},
function (g, cx, cz, R, Rm) {
var h = 16, rag = dlnS("abbeyst", 0xD0C8B4), oak = dlnS("oak", 0x9A7A54), stone = dlnS("flags", 0xD8D0C0);
dlnShell(g, cx, cz, Rm, { floor: stone, wall: rag, h: h, ceil: false, outName: "Out to New Palace Yard", out: function () { shkGoOut("ws_hall"); } });
var n = DLN.lite ? 7 : 13;
for (var t = 0; t < n; t++) {
var z = cz - Rm.hd + 3 + t * (Rm.hd * 2 - 6) / (n - 1);
[-1, 1].forEach(function (k) {
var hb = dlnBox(g, 3.2, 0.6, 0.7, oak, cx + k * (Rm.hw - 1.6), h - 1.0, z);
var br = dlnBox(g, 0.5, 3.2, 0.6, oak, cx + k * (Rm.hw - 0.4), h - 2.4, z);
br.rotation.z = k * 0.5;
var rf = dlnBox(g, 0.6, Math.hypot(Rm.hw, 7.5), 0.6, oak, cx + k * Rm.hw / 2, h + 3.6, z);
rf.rotation.z = k * Math.atan2(Rm.hw, 7.5);
var ang = new THREE.Group();
ang.position.set(cx + k * (Rm.hw - 3.1), h - 1.6, z);
g.add(ang);
var bd = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.0, 8), dlnC(0xB89868));
ang.add(bd);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 6), dlnC(0xB89868));
hd.position.y = 0.6;
ang.add(hd);
var wg = dlnBox(ang, 0.06, 0.9, 0.5, dlnC(0xA88858), k * -0.25, 0.3, 0);
wg.rotation.z = k * 0.3;
var sh = dlnBox(ang, 0.3, 0.36, 0.06, dlnShine(0xC8A048, 0.35, 0.7), 0, -0.1, 0.3);
});
dlnBox(g, 0.6, 0.6, 0.6, oak, cx, h + 7.3, z);
}
[-1, 1].forEach(function (k) { var p = dlnBox(g, 0.3, Math.hypot(Rm.hw + 0.5, 7.7) + 0.3, Rm.hd * 2, dlnS("boards", 0x6A5034), cx + k * Rm.hw / 2, h + 3.8, cz); p.rotation.z = k * Math.atan2(Rm.hw, 7.5); });
var sw = new THREE.Mesh(new THREE.PlaneGeometry(9, 12), wsmGlass(6));
sw.position.set(cx, h + 1, cz - Rm.hd + 0.1);
g.add(sw);
for (var s = 0; s < 6; s++) {
dlnBox(g, Rm.hw * 2 - 4, 0.2, 0.5, stone, cx, 0.1 + s * 0.2, cz - Rm.hd + 5.5 - s * 0.5);
}
shkFloor(cx, cz - Rm.hd + 1.6, Rm.hw - 2, 1.6, 1.2);
for (var s2 = 0; s2 < 6; s2++)
shkFloor(cx, cz - Rm.hd + 5.5 - s2 * 0.5, Rm.hw - 2, 0.25, 0.2 * (s2 + 1));
[-1, 1].forEach(function (k) { for (var q = 0; q < 3; q++) {
var kx = cx + k * (Rm.hw - 0.6), kz = cz - Rm.hd + 10 + q * 20;
dlnBox(g, 0.6, 2.8, 1.4, dlnS("stone", 0xC8C0B0), kx, 3.6, kz);
var kg = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.8, 8), dlnS("stone", 0xD8D0C0));
kg.position.set(kx - k * 0.3, 3.4, kz);
g.add(kg);
var kh = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), dlnS("stone", 0xD8D0C0));
kh.position.set(kx - k * 0.3, 4.45, kz);
g.add(kh);
} });
[["Here stood Sir William Wallace, 1305", 10], ["Here was tried Sir Thomas More, 1535", 20], ["Here King Charles I was tried, January 1649", 30]].forEach(function (b, i) { var br = dlnPanel([b[0]], "", 3, 0.4, "#B8963A", "#2A1E10"); br.rotation.x = -Math.PI / 2; br.position.set(cx + (i % 2 ? 2 : -2), 0.03, cz + Rm.hd - b[1]); g.add(br); });
shkSpot(cx, cz - Rm.hd + 2.6, 2.6, "St Stephen's Hall and the Central Lobby", "go on up", wsmIn("ws_lobby"), 1.2);
shkSpot(cx + 2, cz + Rm.hd - 30, 3, "The plate of King Charles", "read", function () { wsmTale("⚖️ King Charles I tried here", null, ["In January 1649 King Charles I was tried here, in Westminster Hall, by the High Court of Justice set up by the Commons. He would not plead, saying no court had power over a king. He was beheaded outside the Banqueting House in Whitehall on 30 January 1649."]); });
shkSpot(cx - 3, cz, 3, "The roof", "look up", function () { wsmTale("🏛️ Westminster Hall", WST_TALES.hall, [WST_TALES.fire]); });
Rm.hello = "<b>Westminster Hall.</b> Look up: Richard II's oak roof, the angels on the hammer-beams, nine hundred years of stone round you. The steps at the far end go up to the Houses.";
},
function (g, cx, cz, R, Rm) {
var h = 14, gilt = dlnShine(0xD8B048, 0.3, 0.9), stone = dlnS("perpplain", 0xD8C8A8);
dlnShell(g, cx, cz, Rm, { floor: dlnS("encaustic", 0xFFFFFF), wall: stone, h: h, ceil: false, outName: "Back down to Westminster Hall", out: function () { shkGoIn("ws_hall"); } });
var vault = new THREE.Mesh(new THREE.SphereGeometry(Rm.hw * 1.3, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ map: DLN_CANVAS.puginpaper(), color: 0xC8A060, side: THREE.BackSide }));
vault.scale.y = 0.5;
vault.position.set(cx, h, cz);
vault.userData.keep = 1;
g.add(vault);
["ST GEORGE", "ST ANDREW", "ST DAVID", "ST PATRICK"].forEach(function (n, i) { var a = i * Math.PI / 2, m = dlnPanel(["of England", "of Scotland", "of Wales", "of Ireland"].slice(i, i + 1), n, 4, 3, "#2A3A6A", "#D8B048"); m.position.set(cx + Math.sin(a) * (Rm.hw - 0.1), h - 2.5, cz - Math.cos(a) * (Rm.hd - 0.1)); m.rotation.y = -a + (i === 0 ? 0 : 0); m.lookAt(cx, h - 2.5, cz); g.add(m); });
dlnCyl(g, 0.04, 0.04, 4, gilt, cx, h - 2, cz, 4);
var ch = new THREE.Group();
ch.position.set(cx, h - 5, cz);
g.add(ch);
var rg = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.08, 6, 24), gilt);
rg.rotation.x = Math.PI / 2;
ch.add(rg);
for (var c = 0; c < 12; c++) {
var a = c / 12 * Math.PI * 2;
var bl = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), dlnGlow(0xFFE8B8));
bl.position.set(Math.cos(a) * 1.6, 0.2, Math.sin(a) * 1.6);
ch.add(bl);
}
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { var sx = cx + p[0] * (Rm.hw - 1.6), sz = cz + p[1] * (Rm.hd - 1.6); dlnBox(g, 1.2, 1.4, 1.2, dlnS("veined", 0xFFFFFF), sx, 0.7, sz); var st = new THREE.Mesh(new THREE.ConeGeometry(0.4, 2.0, 10), dlnS("veined", 0xF0ECE4)); st.position.set(sx, 2.4, sz); g.add(st); var hd = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 6), dlnS("veined", 0xF0ECE4)); hd.position.set(sx, 3.55, sz); g.add(hd); shkSolidBox(sx, sz, 1.3, 1.3, 0, 4); });
wsmArchDoor(g, cx - Rm.hw + 0.1, 0, cz, Math.PI / 2, 2.4, 3.6);
wsmArchDoor(g, cx + Rm.hw - 0.1, 0, cz, -Math.PI / 2, 2.4, 3.6);
shkSpot(cx - Rm.hw + 1.4, cz, 2.2, "The Commons' corridor", "go through to the House of Commons (the Strangers' Gallery)", wsmIn("ws_commons"));
shkSpot(cx + Rm.hw - 1.4, cz, 2.2, "The Lords' corridor", "go through to the House of Lords", wsmIn("ws_lords"));
wsmNamed("doorkeeper", cx - Rm.hw + 2.2, cz + 2.2, Math.PI / 2, { P: Rm.live, y: 0.14 });
Rm.hello = "<b>The Central Lobby.</b> Here constituents wait to 'lobby' their Members. Left to the Commons, right to the Lords.";
},
function (g, cx, cz, R, Rm) {
var h = 12, oak = dlnS("linenfold", 0xFFFFFF), green = dlnS("green", 0xFFFFFF), gilt = dlnShine(0xD8B048, 0.3, 0.9), carpet = dlnC(0x2A4A30);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("perpplain", 0xB8A888), low: oak, lowH: 5, h: h, ceil: dlnS("linenfold", 0x8A7050), outName: "Back to the Central Lobby", out: function () { shkGoIn("ws_lobby"); } });
dlnPlane(g, 8.6, Rm.hd * 2 - 6, carpet, cx, 0.02, cz);
[-2.6, 2.6].forEach(function (x) { dlnPlane(g, 0.1, Rm.hd * 2 - 8, dlnC(0xA81818), cx + x, 0.03, cz); });
dlnBox(g, 2.4, 1.0, 5, dlnS("oak", 0x6A4A2A), cx, 0.5, cz - 4);
shkSolidBox(cx, cz - 4, 2.5, 5.1, 0, 1.1);
[-1, 1].forEach(function (k) { dlnBox(g, 0.5, 0.3, 0.7, dlnS("oak", 0x5A3A1A), cx + k * 0.9, 1.15, cz - 2.4); dlnBox(g, 0.45, 0.08, 0.6, gilt, cx + k * 0.9, 1.32, cz - 2.4); });
var mace = dlnCyl(g, 0.06, 0.06, 1.5, gilt, cx, 1.1, cz - 4, 8);
mace.rotation.x = Math.PI / 2;
var mh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), gilt);
mh.position.set(cx, 1.1, cz - 4.8);
g.add(mh);
var ch = new THREE.Group();
ch.position.set(cx, 0, cz - Rm.hd + 1.4);
g.add(ch);
dlnBox(ch, 1.8, 1.0, 1.2, green, 0, 0.5, 0);
dlnBox(ch, 1.8, 3.4, 0.3, dlnS("oak", 0x5A3A1A), 0, 1.7, -0.5);
var cn = dlnGable(ch, 2.2, 1.4, 1.2, dlnS("oak", 0x5A3A1A), 0, 4.2, -0.1, 0);
wsmPin(ch, -0.95, 3.4, -0.4, 1.4, dlnS("oak", 0x5A3A1A), 0.18);
wsmPin(ch, 0.95, 3.4, -0.4, 1.4, dlnS("oak", 0x5A3A1A), 0.18);
dlnBox(ch, 0.6, 0.08, 0.4, gilt, 0, 4.0, 0.05);
shkSolidBox(cx, cz - Rm.hd + 1.4, 2.2, 1.6, 0, 4);
[-1, 1].forEach(function (k) {
for (var r = 0; r < 5; r++) {
var bx = cx + k * (3.4 + r * 1.1), by = r * 0.35;
dlnBox(g, 0.8, 0.18, Rm.hd * 2 - 9, green, bx, by + 0.5, cz + 0.5);
dlnBox(g, 0.14, 0.6, Rm.hd * 2 - 9, green, bx + k * 0.4, by + 0.85, cz + 0.5);
dlnBox(g, 1.1, by + 0.4, Rm.hd * 2 - 9, dlnS("oak", 0x5A3A1A), bx, (by + 0.4) / 2, cz + 0.5);
}
shkSolidBox(cx + k * (3.4 + 2.2), cz + 0.5, 5.6, Rm.hd * 2 - 9, 0, 2.2);
});
[-1, 1].forEach(function (k) { dlnBox(g, 2.4, 0.4, Rm.hd * 2 - 4, dlnS("oak", 0x5A3A1A), cx + k * (Rm.hw - 1.2), 6.2, cz); dlnBox(g, 0.2, 1.0, Rm.hd * 2 - 4, oak, cx + k * (Rm.hw - 2.4), 6.9, cz); });
var grille = dlnBox(g, Rm.hw * 2 - 2, 1.4, 0.1, gilt, cx, 9.4, cz - Rm.hd + 0.6);
dlnBox(g, Rm.hw * 2, 0.4, 2, dlnS("oak", 0x5A3A1A), cx, 8.6, cz - Rm.hd + 1);
for (var lw = 0; lw < 4; lw++)
wsmWin(g, cx + (lw - 1.5) * 4.4, 9.4, cz + Rm.hd - 0.05, 0, 2, 3.4);
shkSpot(cx, cz - 1, 2.4, "The Table of the House", "look", function () { wsmTale("🟩 The House of Commons", WST_TALES.commons, ["The Ladies' Gallery is up behind the brass grille over the Speaker's Chair; ladies may watch, but only from behind it. Some suffragettes chained themselves to it in 1908."]); });
Rm.hello = "<b>The House of Commons.</b> Green benches, the Speaker's Chair, the Mace on the Table. The House is not sitting just now; you may walk on the floor today, as a visitor.";
},
function (g, cx, cz, R, Rm) {
var h = 13, red = dlnS("red", 0xFFFFFF), gilt = dlnShine(0xD8B048, 0.28, 0.95), oak = dlnS("linenfold", 0xFFFFFF);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("puginpaper", 0xFFFFFF), low: oak, lowH: 4.4, h: h, ceil: dlnS("puginpaper", 0xD8B080), outName: "Back to the Central Lobby", out: function () { shkGoIn("ws_lobby"); } });
dlnPlane(g, 8, Rm.hd * 2 - 6, dlnC(0x7A1A1E), cx, 0.02, cz);
var th = new THREE.Group();
th.position.set(cx, 0, cz - Rm.hd + 1.4);
g.add(th);
for (var s = 0; s < 3; s++)
dlnBox(th, 4 - s * 0.6, 0.2, 2 - s * 0.3, red, 0, 0.1 + s * 0.2, 0.2);
dlnBox(th, 1.2, 1.2, 0.9, red, 0, 1.2, 0);
dlnBox(th, 1.4, 2.8, 0.3, gilt, 0, 2.2, -0.4);
var cr = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.5, 8), gilt);
cr.position.set(0, 3.9, -0.4);
th.add(cr);
dlnBox(th, 5, 6, 0.2, gilt, 0, 4.2, -0.7);
for (var p = -2; p <= 2; p++)
wsmPin(th, p * 1.2, 7.2, -0.5, 2.2, gilt, 0.25);
var arms = dlnPanel(["DIEU ET MON DROIT"], "", 2, 1.2, "#7A1A1E", "#D8B048");
arms.position.set(0, 5.6, -0.55);
th.add(arms);
shkSolidBox(cx, cz - Rm.hd + 1.4, 4.2, 2.4, 0, 8);
var ws = dlnBox(g, 2.4, 0.8, 1.6, red, cx, 0.4, cz - Rm.hd + 5);
shkSolidBox(cx, cz - Rm.hd + 5, 2.5, 1.7, 0, 0.9);
[-1, 1].forEach(function (k) {
for (var r = 0; r < 4; r++) {
var bx = cx + k * (3 + r * 1.1), by = r * 0.35;
dlnBox(g, 0.8, 0.18, Rm.hd * 2 - 10, red, bx, by + 0.5, cz + 1);
dlnBox(g, 0.14, 0.6, Rm.hd * 2 - 10, red, bx + k * 0.4, by + 0.85, cz + 1);
dlnBox(g, 1.1, by + 0.4, Rm.hd * 2 - 10, dlnS("oak", 0x5A3A1A), bx, (by + 0.4) / 2, cz + 1);
}
shkSolidBox(cx + k * (3 + 1.7), cz + 1, 4.6, Rm.hd * 2 - 10, 0, 2);
for (var w = 0; w < 6; w++) {
var gl = new THREE.Mesh(new THREE.PlaneGeometry(2, 4), wsmGlass(w + k * 3 + 10));
gl.position.set(cx + k * (Rm.hw - 0.08), 8.6, cz - Rm.hd + 5 + w * 6.4);
gl.rotation.y = -k * Math.PI / 2;
g.add(gl);
}
});
for (var c = 0; c < 2; c++) {
var cl = new THREE.Group();
cl.position.set(cx, h - 3, cz - 6 + c * 14);
g.add(cl);
var rg = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.06, 6, 20), gilt);
rg.rotation.x = Math.PI / 2;
cl.add(rg);
for (var b = 0; b < 8; b++) {
var a = b / 8 * Math.PI * 2;
var bl = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), dlnGlow(0xFFE8B8));
bl.position.set(Math.cos(a) * 1.2, 0.15, Math.sin(a) * 1.2);
cl.add(bl);
}
dlnCyl(g, 0.03, 0.03, 3, gilt, cx, h - 1.5, cz - 6 + c * 14, 4);
}
shkSpot(cx, cz - Rm.hd + 6.6, 2.4, "The Throne and the Woolsack", "look", function () { wsmTale("🟥 The House of Lords", WST_TALES.lords, []); });
Rm.hello = "<b>The House of Lords.</b> Red leather, gold everywhere, the Throne under its canopy at the far end, the Woolsack before it.";
},
function (g, cx, cz, R, Rm) {
var h = 30, st = dlnS("abbeyst", 0xD8D0C0), purb = dlnShine(0x3A3A3A, 0.35, 0.1), gilt = dlnShine(0xD8B048, 0.3, 0.9);
dlnShell(g, cx, cz, Rm, { floor: dlnS("lozenge", 0xFFFFFF), wall: st, h: h, ceil: dlnC(0xC8C0B0), outName: "Out by the great west door", out: function () { shkGoOut("ws_abbey"); } });
var bays = DLN.lite ? 7 : 12, bl = (Rm.hd * 2 - 8) / bays;
for (var b = 0; b <= bays; b++) {
var z = cz + Rm.hd - 4 - b * bl;
[-1, 1].forEach(function (k) {
var px = cx + k * 5.6;
dlnCyl(g, 0.75, 0.8, 12, st, px, 6, z, 10);
if (!DLN.lite)
for (var m = 0; m < 4; m++) {
var a = m / 4 * Math.PI * 2;
dlnCyl(g, 0.12, 0.12, 12, purb, px + Math.cos(a) * 0.82, 6, z + Math.sin(a) * 0.82, 6);
}
shkSolid({ x: px, z: z, r: 0.95 });
if (b < bays) {
var ar = new THREE.Mesh(new THREE.TorusGeometry(bl / 2, 0.35, 4, DLN.lite ? 8 : 14, Math.PI), st);
ar.rotation.y = Math.PI / 2;
ar.position.set(px, 12, z - bl / 2);
ar.scale.set(1, 1.5, 1);
g.add(ar);
dlnBox(g, 0.6, h - 14, bl, st, px + k * 0.1, 14 + (h - 14) / 2, z - bl / 2);
var cw = new THREE.Mesh(new THREE.PlaneGeometry(bl - 1.6, 7), wsmGlass(b + (k > 0 ? 20 : 0)));
cw.position.set(cx + k * (Rm.hw - 0.06), h - 6, z - bl / 2);
cw.rotation.y = -k * Math.PI / 2;
g.add(cw);
}
});
var rib = new THREE.Mesh(new THREE.TorusGeometry(5.6, 0.18, 4, 16, Math.PI), st);
rib.position.set(cx, h - 6, z);
rib.scale.set(1, 1.0, 1);
g.add(rib);
}
var sz = cz - 2;
dlnBox(g, 11, 6, 1.2, st, cx, 3, sz);
dlnBox(g, 2.4, 3.2, 1.3, dlnC(0x2A1A10), cx, 1.6, sz);
dlnBox(g, 11.4, 0.5, 1.6, gilt, cx, 6.2, sz);
shkSolidBox(cx - 3.6, sz, 4, 1.3, 0, 7);
shkSolidBox(cx + 3.6, sz, 4, 1.3, 0, 7);
[-1, 1].forEach(function (k) { dlnBox(g, 1.4, 1.4, 14, dlnS("oak", 0x5A3A1A), cx + k * 4.2, 0.7, sz - 9); for (var p = 0; p < 7; p++)
wsmPin(g, cx + k * 4.6, 1.4, sz - 3 - p * 2, 2.4, dlnS("oak", 0x5A3A1A), 0.25); shkSolidBox(cx + k * 4.2, sz - 9, 1.5, 14, 0, 1.5); });
var cos = DLN.tex.cosmati || (DLN.tex.cosmati = wTex(256, 256, function (x, W, H) { x.fillStyle = "#2A2420"; x.fillRect(0, 0, W, H); var cols = ["#8A2A2A", "#2A5A3A", "#D8C8A0", "#3A3A6A", "#C8A048"]; for (var r = 6; r > 0; r--) {
x.fillStyle = cols[r % 5];
x.beginPath();
x.arc(W / 2, H / 2, r * 20, 0, 7);
x.fill();
} for (var c = 0; c < 4; c++) {
x.fillStyle = cols[c];
x.beginPath();
x.arc(c % 2 ? W * 0.15 : W * 0.85, c < 2 ? H * 0.15 : H * 0.85, 24, 0, 7);
x.fill();
} }));
var cp = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), new THREE.MeshLambertMaterial({ map: cos }));
cp.rotation.x = -Math.PI / 2;
cp.position.set(cx, 0.03, cz - Rm.hd + 12);
g.add(cp);
dlnBox(g, 3.6, 1.1, 1.2, dlnS("veined", 0xFFFFFF), cx, 0.55, cz - Rm.hd + 5.4);
dlnBox(g, 7, 6, 0.4, gilt, cx, 4, cz - Rm.hd + 4.4);
for (var a = 0; a < 5; a++)
wsmPin(g, cx - 2.8 + a * 1.4, 7, cz - Rm.hd + 4.3, 2, gilt, 0.3);
shkSolidBox(cx, cz - Rm.hd + 5, 7, 2.4, 0, 8);
var cc = new THREE.Group();
cc.position.set(cx + Rm.hw - 2.4, 0, cz - Rm.hd + 8);
cc.rotation.y = -Math.PI / 2;
g.add(cc);
var oak2 = dlnS("oak", 0x7A5A34);
dlnBox(cc, 1.0, 0.5, 0.8, dlnS("stone", 0xB89A7A), 0, 0.55, 0);
dlnBox(cc, 1.2, 0.1, 0.9, oak2, 0, 0.9, 0);
dlnBox(cc, 1.2, 2.4, 0.1, oak2, 0, 2.0, -0.42);
var pk = new THREE.Mesh(new THREE.ConeGeometry(0.62, 0.9, 3), oak2);
pk.scale.z = 0.15;
pk.position.set(0, 3.6, -0.42);
cc.add(pk);
[-0.55, 0.55].forEach(function (k) { dlnBox(cc, 0.1, 1.2, 0.9, oak2, k, 1.5, 0); wsmPin(cc, k, 2.6, -0.42, 0.8, oak2, 0.15); });
[[-0.45, 0.35], [0.45, 0.35], [-0.45, -0.35], [0.45, -0.35]].forEach(function (l) { var lion = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), dlnShine(0xC8A048, 0.35, 0.8)); lion.position.set(l[0], 0.15, l[1]); cc.add(lion); });
shkSolidBox(cx + Rm.hw - 2.4, cz - Rm.hd + 8, 1.2, 1.4, 0, 3.6);
shkSpot(cx + Rm.hw - 4.0, cz - Rm.hd + 8, 2.4, "The Coronation Chair", "look", function () { wsmTale("👑 The Coronation Chair", WST_TALES.chair, []); });
var poets = [["GEOFFREY CHAUCER", "died 1400"], ["EDMUND SPENSER", "1599"], ["BEN JONSON", "O RARE BEN JOHNSON"], ["JOHN DRYDEN", "1700"], ["SAMUEL JOHNSON", "1784"], ["CHARLES DICKENS", "1870"], ["ROBERT BROWNING", "1889"], ["ALFRED, LORD TENNYSON", "1892"], ["WILLIAM SHAKESPEARE", "monument 1740"]];
poets.forEach(function (p, i) { var row = i % 3, col = Math.floor(i / 3), slab = dlnPanel([p[1]], p[0], 1.6, 1.0, "#C8C0B0", "#2A2420"); slab.rotation.x = -Math.PI / 2; slab.position.set(cx - Rm.hw + 2 + row * 2, 0.035, cz + Rm.hd - 12 - col * 1.6); g.add(slab); });
var sh = new THREE.Group();
sh.position.set(cx - Rm.hw + 0.5, 0, cz + Rm.hd - 14);
sh.rotation.y = Math.PI / 2;
g.add(sh);
dlnBox(sh, 2.4, 1.4, 0.8, dlnS("veined", 0xFFFFFF), 0, 0.7, 0);
var fig = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.8, 10), dlnS("veined", 0xF4F2EE));
fig.position.set(0, 2.3, 0);
sh.add(fig);
var fh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), dlnS("veined", 0xF4F2EE));
fh.position.set(0, 3.4, 0);
sh.add(fh);
var scr = dlnPanel(["The cloud-capp'd tow'rs, the gorgeous palaces,", "the solemn temples, the great globe itself,", "yea, all which it inherit, shall dissolve"], "", 1.6, 0.9, "#E8E4DA", "#2A2420");
scr.position.set(0.7, 1.9, 0.3);
sh.add(scr);
shkSolidBox(cx - Rm.hw + 0.5, cz + Rm.hd - 14, 1, 2.6, 0, 4);
shkSpot(cx - Rm.hw + 3, cz + Rm.hd - 13, 3, "Poets' Corner", "read the stones", function () { wsmTale("🪶 Poets' Corner", WST_TALES.poets, []); });
for (var cl = 0; cl < 3; cl++) {
var c = new THREE.Group();
c.position.set(cx, h - 10, cz + Rm.hd - 12 - cl * 14);
g.add(c);
var ring = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.07, 6, 20), gilt);
ring.rotation.x = Math.PI / 2;
c.add(ring);
for (var k = 0; k < 10; k++) {
var a2 = k / 10 * Math.PI * 2, f = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 4), dlnGlow(0xFFD890));
f.position.set(Math.cos(a2) * 1.4, 0.2, Math.sin(a2) * 1.4);
c.add(f);
}
dlnCyl(g, 0.03, 0.03, 9, gilt, cx, h - 5.5, cz + Rm.hd - 12 - cl * 14, 4);
}
var ve = dlnPerson("ws_verger2", "clergy", { sex: "m", inside: true });
ve.position.set(cx + 3, 0.14, cz + Rm.hd - 6);
ve.rotation.y = Math.PI;
Rm.live.add(ve);
var VP = { g: ve, key: "wsm_verger2", ground: 0.14 };
SHK.people.push(VP);
SHK.talk.push({ p: VP, name: WST_FOLK.verger.name, r: 3.2, t: { name: WST_FOLK.verger.name, persona: WST_FOLK.verger.persona, greet: WST_FOLK.verger.greet } });
Rm.hello = "<b>Westminster Abbey.</b> The nave goes up and up to the stone vault; every King and Queen since 1066 was crowned at the far end. Poets' Corner is to your left as you go up.";
},
function (g, cx, cz, R, Rm) {
var h = 3.6, wood = dlnS("oak", 0xFFFFFF);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xC8A070), wall: dlnS("damask", 0xC8B8A0), low: dlnS("oak", 0x8A6A4A), lowH: 1.0, h: h, ceil: dlnGlow(0xC8C0B0), outName: "Out to Godolphin Street", out: function () { shkGoOut("ws_lucas"); } });
for (var i = -4; i <= 4; i++)
for (var j = -5; j <= 5; j++) {
if ((i + j) % 2)
dlnBox(g, 0.98, 0.02, 0.98, dlnS("oak", 0x9A7044), cx + i, 0.01, cz + j);
}
var dr = new THREE.Group();
dr.position.set(cx, 0.03, cz);
Rm.live.add(dr);
var rug = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.4), dlnS("damask", 0x8A3A2A));
rug.rotation.x = -Math.PI / 2;
dr.add(rug);
var stn = new THREE.Mesh(new THREE.CircleGeometry(0.42, 14), dlnC(0x4A1612));
stn.rotation.x = -Math.PI / 2;
stn.position.set(0.9, 0.004, -0.6);
stn.scale.set(1.3, 0.8, 1);
dr.add(stn);
WSM.drugget = dr;
var st2 = new THREE.Mesh(new THREE.CircleGeometry(0.4, 14), dlnC(0x4A1612));
st2.rotation.x = -Math.PI / 2;
st2.position.set(cx - 0.4, 0.025, cz + 0.9);
st2.scale.set(1.2, 0.85, 1);
Rm.live.add(st2);
WSM.stain2 = st2;
var lid = new THREE.Group();
lid.position.set(cx - 0.4, -0.005, cz + 0.4);
Rm.live.add(lid);
dlnBox(lid, 0.98, 0.04, 0.98, dlnS("oak", 0x9A7044), 0, 0, -0.49);
lid.children[0].position.z = -0.49;
WSM.lid = lid;
var hole = dlnBox(g, 0.9, 0.02, 0.9, dlnC(0x0A0806), cx - 0.4, 0.005, cz - 0.09);
dlnFireplace(g, cx + Rm.hw - 0.3, cz - 1, -Math.PI / 2);
[[-1.5, 1.6], [1.5, 1.8]].forEach(function (t, i) {
var tr = new THREE.Group();
tr.position.set(cx + t[0], 2.2, cz - Rm.hd + 0.1);
g.add(tr);
dlnCyl(tr, 0.3, 0.3, 0.06, dlnShine(0x8A7A5A, 0.4, 0.6), 0, 0, 0, 12).rotation.x = Math.PI / 2;
[-0.6, 0.6].forEach(function (a) { var sw = dlnBox(tr, 0.04, 1.4, 0.02, dlnShine(0xD8D8E0, 0.3, 0.9), 0, 0, 0.06); sw.rotation.z = a; });
});
var pn = new THREE.Group();
pn.position.set(cx - Rm.hw + 0.6, 0, cz - 2);
pn.rotation.y = Math.PI / 2;
g.add(pn);
dlnBox(pn, 1.5, 1.1, 0.6, dlnShine(0x1A1010, 0.3, 0.2), 0, 0.75, 0);
dlnBox(pn, 1.4, 0.04, 0.2, dlnC(0xF4F0E4), 0, 1.0, 0.2);
shkSolidBox(cx - Rm.hw + 0.6, cz - 2, 0.7, 1.6, 0, 1.4);
var ch = new THREE.Group();
ch.position.set(cx + 1.6, 0, cz + 2.4);
g.add(ch);
dlnBox(ch, 0.6, 0.45, 0.6, dlnC(0x5A1A1A), 0, 0.3, 0);
dlnBox(ch, 0.6, 0.7, 0.08, dlnC(0x5A1A1A), 0, 0.85, -0.28);
var fall = ch;
fall.rotation.z = 1.4;
fall.position.y = 0.3;
wsmWin(g, cx - 1.4, 1.9, cz + Rm.hd - 0.06, 0, 1.4, 2.2);
wsmWin(g, cx + 1.4, 1.9, cz + Rm.hd - 0.06, 0, 1.4, 2.2);
shkSpot(cx + 1.8, cz + 0.6, 2.2, "The drugget", "lift it and look under it", function () { wsmDrugget(); });
shkSpot(cx - 1.6, cz + 0.6, 2.0, "The loose block", "feel the blocks of the floor", function () { wsmLid(); });
Rm.hello = "<b>No. 16 Godolphin Street, the front room.</b> Polished wooden blocks in squares, a square of drugget in the middle, weapons on the walls.";
},
function (g, cx, cz, R, Rm) {
var h = 4.6, gilt = dlnShine(0xD8B048, 0.3, 0.9), wood = dlnS("oak", 0x6A4A2A);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("damask", 0xFFFFFF), low: dlnS("oak", 0xC8B8A0), lowH: 1.0, h: h, ceil: dlnGlow(0xE8E2D4), outName: "Out to Whitehall", out: function () { shkGoOut("ws_hope"); } });
dlnPlane(g, 6, 7, dlnS("damask", 0x6A2A3A), cx, 0.02, cz);
var bu = new THREE.Group();
bu.position.set(cx - Rm.hw + 0.6, 0, cz - 1.5);
bu.rotation.y = Math.PI / 2;
g.add(bu);
dlnBox(bu, 1.6, 1.0, 0.7, wood, 0, 0.5, 0);
dlnBox(bu, 1.6, 1.1, 0.4, wood, 0, 1.55, -0.15);
var bx = dlnBox(bu, 0.5, 0.22, 0.36, dlnC(0x1A2A4A), 0.3, 1.12, 0.1);
var lk = dlnBox(bu, 0.06, 0.06, 0.02, gilt, 0.3, 1.12, 0.29);
shkSolidBox(cx - Rm.hw + 0.6, cz - 1.5, 0.8, 1.7, 0, 2.2);
dlnFireplace(g, cx, cz - Rm.hd + 0.3, 0);
dlnPortrait(g, cx, 2.8, cz - Rm.hd + 0.06, 0, "The Duke of Belminster", "her father", "#1E1E22");
var tb = new THREE.Group();
tb.position.set(cx + Rm.hw - 1.2, 0, cz + 1);
g.add(tb);
dlnBox(tb, 1.2, 0.05, 0.7, wood, 0, 0.76, 0);
[[-0.5, -0.28], [0.5, -0.28], [-0.5, 0.28], [0.5, 0.28]].forEach(function (p) { dlnCyl(tb, 0.03, 0.03, 0.74, wood, p[0], 0.37, p[1], 6); });
dlnBox(tb, 0.3, 0.02, 0.22, dlnC(0xF6F2E8), 0, 0.8, 0);
shkSolidBox(cx + Rm.hw - 1.2, cz + 1, 1.3, 0.8, 0, 1);
[[-1.4, 1.2], [1.4, 1.2]].forEach(function (s) { var so = new THREE.Group(); so.position.set(cx + s[0], 0, cz + s[1]); g.add(so); dlnBox(so, 0.8, 0.45, 0.8, dlnC(0x3A4A6A), 0, 0.3, 0); dlnBox(so, 0.8, 0.6, 0.1, dlnC(0x3A4A6A), 0, 0.75, -0.35); shkSolidBox(cx + s[0], cz + s[1], 0.9, 0.9, 0, 1); });
var cl = new THREE.Group();
cl.position.set(cx, h - 0.6, cz);
g.add(cl);
var rg = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.03, 4, 16), gilt);
rg.rotation.x = Math.PI / 2;
cl.add(rg);
for (var b = 0; b < 6; b++) {
var a = b / 6 * Math.PI * 2, bl = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 4), dlnGlow(0xFFE8B8));
bl.position.set(Math.cos(a) * 0.6, 0.1, Math.sin(a) * 0.6);
cl.add(bl);
}
wsmWin(g, cx - 1.6, 2.2, cz + Rm.hd - 0.06, 0, 1.4, 2.6);
wsmWin(g, cx + 1.6, 2.2, cz + Rm.hd - 0.06, 0, 1.4, 2.6);
shkSpot(cx - Rm.hw + 1.8, cz - 1.5, 2.2, "The despatch-box", "look at the despatch-box in the bureau", function () { wsmTale("📦 The despatch-box", null, ["A dispatch-box of red leather and brass, the kind every Minister has, with the Royal cipher on the lid. Mr Hope keeps the key on his watch-chain; he had never thought anyone else had one."]); });
Rm.hello = "<b>The European Secretary's drawing-room, Whitehall Terrace.</b> His bureau stands by the wall; the despatch-box was kept in it.";
},
function (g, cx, cz, R, Rm) {
var h = 3.4, wood = dlnS("oak", 0x6A4A2A);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("bakerpaper", 0xFFFFFF), h: h, ceil: dlnGlow(0x8A8070), outName: "Down to the street, and a cab to Westminster", out: function () { wsmBakerOut(); } });
dlnPlane(g, 5, 5.5, dlnS("damask", 0x5A2A2A), cx, 0.02, cz);
dlnFireplace(g, cx, cz - Rm.hd + 0.3, 0);
var sl = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 6), dlnC(0x8A2A2A));
sl.rotation.z = Math.PI / 2;
sl.position.set(cx + 0.6, 1.58, cz - Rm.hd + 0.35);
g.add(sl);
var kn = dlnBox(g, 0.03, 0.2, 0.03, dlnShine(0xC8C8D0, 0.3, 0.9), cx - 0.6, 1.62, cz - Rm.hd + 0.4);
kn.rotation.z = 0.4;
for (var lt = 0; lt < 3; lt++)
dlnBox(g, 0.2, 0.14, 0.005, dlnC(0xF4F0E4), cx - 0.6 + lt * 0.05, 1.56, cz - Rm.hd + 0.39);
var vr = DLN.tex.vr || (DLN.tex.vr = wTex(128, 96, function (x, W, H) {
x.clearRect(0, 0, W, H);
x.fillStyle = "#1A1410";
var dots = function (pts) { pts.forEach(function (p) { x.beginPath(); x.arc(p[0], p[1], 3, 0, 7); x.fill(); }); };
for (var i = 0; i < 9; i++) {
dots([[10 + i * 3.5, 10 + i * 8], [48 - i * 3.5, 10 + i * 8]]);
}
for (var j = 0; j < 9; j++)
dots([[70, 10 + j * 8]]);
dots([[78, 10], [88, 14], [92, 24], [88, 34], [78, 38], [86, 50], [92, 62], [98, 74], [104, 82]]);
dots([[60, 82], [112, 82]]);
}));
var vm = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.75), new THREE.MeshBasicMaterial({ map: vr, transparent: true }));
vm.position.set(cx + Rm.hw - 0.04, 1.9, cz - 0.8);
vm.rotation.y = -Math.PI / 2;
g.add(vm);
[[-1.1, 0.4], [1.1, 0.4]].forEach(function (a, i) { var ch = new THREE.Group(); ch.position.set(cx + a[0], 0, cz - Rm.hd + 1.6 + a[1]); ch.rotation.y = i ? -0.5 : 0.5; g.add(ch); dlnBox(ch, 0.8, 0.45, 0.8, dlnC(i ? 0x5A3A2A : 0x2A3A2A), 0, 0.3, 0); dlnBox(ch, 0.8, 0.8, 0.14, dlnC(i ? 0x5A3A2A : 0x2A3A2A), 0, 0.85, -0.36); [-0.38, 0.38].forEach(function (k) { dlnBox(ch, 0.12, 0.3, 0.8, dlnC(i ? 0x5A3A2A : 0x2A3A2A), k, 0.6, 0); }); shkSolidBox(cx + a[0], cz - Rm.hd + 1.6 + a[1], 0.9, 0.9, 0, 1.2); });
var vio = new THREE.Group();
vio.position.set(cx - 1.6, 0.82, cz + 0.8);
g.add(vio);
var vb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), dlnShine(0x8A4A1A, 0.3, 0.2));
vb.scale.set(1, 0.25, 1.6);
vio.add(vb);
dlnBox(vio, 0.04, 0.02, 0.3, dlnC(0x1A1010), 0, 0.03, 0.38);
var ct = new THREE.Group();
ct.position.set(cx + Rm.hw - 0.8, 0, cz + 1.4);
g.add(ct);
dlnBox(ct, 0.8, 0.8, 1.8, dlnS("oak", 0x5A4030), 0, 0.4, 0);
for (var b = 0; b < 6; b++) {
var jar = dlnCyl(ct, 0.05, 0.05, 0.18, new THREE.MeshBasicMaterial({ color: [0xC8E0E8, 0xE8D8A8, 0xA8C8A8][b % 3], transparent: true, opacity: 0.6 }), -0.2 + (b % 2) * 0.3, 0.9, -0.6 + Math.floor(b / 2) * 0.5, 8);
}
shkSolidBox(cx + Rm.hw - 0.8, cz + 1.4, 0.9, 1.9, 0, 1);
var tb = dlnBox(g, 1.0, 0.75, 0.7, wood, cx - 1.6, 0.4, cz + 0.8);
shkSolidBox(cx - 1.6, cz + 0.8, 1.1, 0.8, 0, 1);
var bs = new THREE.Group();
bs.position.set(cx - Rm.hw + 0.3, 0, cz - 1.2);
bs.rotation.y = Math.PI / 2;
g.add(bs);
dlnBox(bs, 2.4, 2.4, 0.4, wood, 0, 1.2, 0);
for (var s = 0; s < 4; s++)
for (var bk = 0; bk < 10; bk++)
dlnBox(bs, 0.18, 0.42, 0.3, dlnC([0x5A1A1A, 0x1A3A2A, 0x2A2A4A, 0x6A4A1A][(s + bk) % 4]), -1.0 + bk * 0.22, 0.4 + s * 0.55, 0.1);
shkSolidBox(cx - Rm.hw + 0.3, cz - 1.2, 0.5, 2.5, 0, 2.4);
for (var w = -1; w <= 1; w++)
wsmWin(g, cx + w * 1.2, 1.8, cz + Rm.hd - 0.06, 0, 1.0, 2.2);
var lamp = dlnCyl(g, 0.12, 0.18, 0.3, dlnGlow(0xFFD898), cx - 1.6, 0.95, cz + 0.8, 8);
shkSpot(cx + Rm.hw - 0.8, cz - 0.8, 2, "The V.R. on the wall", "look", function () { wsmTale("🔫 The patriotic V.R.", null, ["Watson writes, in The Musgrave Ritual, that Holmes, \"in one of his queer humours, would sit in an arm-chair with his hair-trigger and a hundred Boxer cartridges and proceed to adorn the opposite wall with a patriotic V.R. done in bullet-pocks\".", "Watson did not approve, and nor did Mrs Hudson."]); });
Rm.hello = "<b>221B Baker Street, the sitting-room.</b> The fire, two armchairs, the Persian slipper on the mantel, papers everywhere.";
},
function (g, cx, cz, R, Rm) {
var h = 3.8, wood = dlnS("oak", 0x5A4030);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("stock", 0xC8C0B0), low: dlnS("oak", 0x6A5040), lowH: 1.2, h: h, ceil: dlnGlow(0xC8C0B0), outName: "Out to the Embankment", out: function () { shkGoOut("ws_yard"); } });
var dk = new THREE.Group();
dk.position.set(cx, 0, cz - Rm.hd + 1.6);
g.add(dk);
dlnBox(dk, 2.2, 0.8, 1.0, wood, 0, 0.4, 0);
dlnBox(dk, 2.3, 0.05, 1.1, dlnC(0x2A3A2A), 0, 0.83, 0);
for (var p = 0; p < 5; p++)
dlnBox(dk, 0.3, 0.03, 0.4, dlnC(0xF2EEE0), -0.7 + p * 0.35, 0.86 + p * 0.01, 0.1);
shkSolidBox(cx, cz - Rm.hd + 1.6, 2.4, 1.2, 0, 1);
var map = dlnPanel(["A DIVISION · WHITEHALL · WESTMINSTER", "B · C · D · E · F ... METROPOLITAN POLICE DISTRICT"], "LONDON", 3.4, 2.2, "#E8DCC0", "#3A2A1A");
map.position.set(cx - Rm.hw + 0.06, 2.0, cz);
map.rotation.y = Math.PI / 2;
g.add(map);
var fc = new THREE.Group();
fc.position.set(cx + Rm.hw - 0.5, 0, cz - 1);
fc.rotation.y = -Math.PI / 2;
g.add(fc);
dlnBox(fc, 2.4, 1.8, 0.6, wood, 0, 0.9, 0);
for (var d = 0; d < 12; d++)
dlnBox(fc, 0.5, 0.25, 0.02, dlnC(0x8A6A44), -0.9 + (d % 4) * 0.6, 0.3 + Math.floor(d / 4) * 0.55, 0.31);
shkSolidBox(cx + Rm.hw - 0.5, cz - 1, 0.7, 2.5, 0, 1.8);
wsmWin(g, cx - 1.4, 2, cz + Rm.hd - 0.06, 0, 1.4, 2.4);
wsmWin(g, cx + 1.4, 2, cz + Rm.hd - 0.06, 0, 1.4, 2.4);
dlnPendant(g, cx, h, cz, 0.6);
Rm.hello = "<b>New Scotland Yard, Inspector Lestrade's room.</b> Out of the window, the river.";
},
function () {
var D = WSM.drugget;
if (!D)
return;
WSM.drugUp = !WSM.drugUp;
D.rotation.y = WSM.drugUp ? Math.PI / 2 : 0;
D.position.x += (WSM.drugUp ? 2.6 : -2.6);
setStatus(WSM.drugUp ? "🩸 You turn the drugget back. On it, a dark stain; on the floor, a stain too, but not under the first one." : "You lay the drugget back as it was.");
},
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "in:" + room : wsbArea(), Lc = worldLocal();
list.forEach(function (T) {
if (!(re ? re.test(T.name || "") : (T.name === name)))
return;
var p = T.p ? wsbLoc(T.p.g) : { x: T.x, z: T.z, y: T.y };
if (!p)
return;
var a = wsbAreaAt(p.x, p.z);
var P = { x: p.x, z: p.z, y: p.y != null ? p.y : 0, area: a };
if (room && a !== here)
return;
P.d = Math.hypot(P.x - Lc.x, P.z - Lc.z);
if (!out || (a === here && (out.area !== here || P.d < out.d)))
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
var W = wsbNamed(SHK.talk, at.who, at.room);
if (W)
return W;
var C0 = WSB_CH[wsbS().ch], d0 = C0 && C0.cast ? C0.cast.filter(function (d) { return d.name === at.who; })[0] : null;
if (d0 && d0.at !== at)
return wsbPos(d0.at);
}
if (at.spot) {
var Sp = wsbNamed(SHK.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.cast) {
var c = WSB.cast[at.cast], q = c && c.g && c.g.parent ? wsbLoc(c.g) : null;
if (q)
return { x: q.x, z: q.z, y: q.y, area: wsbAreaAt(q.x, q.z) };
}
if (at.room)
return wsbRoomPt(at.room, at.lx, at.lz);
if (at.at && WST_PLACES[at.at]) {
var A = WST_PLACES[at.at], ax = wsX(A.x + (at.dx || 0)), az = wsZ(A.z + (at.dz || 0));
return { x: ax, z: az, y: shkGround(ax, az, 2), area: "ws" };
}
if (at.x != null) {
var x = wsX(at.x), z = wsZ(at.z);
return { x: x, z: z, y: at.y != null ? at.y : shkGround(x, z, 2), area: wsbAreaAt(x, z), name: at.name };
}
return null;
},
function (P, area) {
if (!P)
return null;
if (P.area === area)
return { show: P, way: "" };
if (area.indexOf("in:") === 0) {
var D = SHK_ROOMS[area.slice(3)];
if (P.area.indexOf("in:") === 0 && D && D.out && D.out === (SHK_ROOMS[P.area.slice(3)] || {}).out)
return { show: wsbRoomExit(), way: " (through the doors)" };
return { show: wsbRoomExit(), way: " (go out)" };
}
var target = P, inn = "";
if (P.area.indexOf("in:") === 0) {
target = wsbRoomDoor((SHK_ROOMS[P.area.slice(3)] || {}).out || P.area.slice(3));
inn = " (go in)";
if (!target)
return { show: null, way: " (the book will take you)" };
}
if (target.area === area)
return { show: target, way: inn };
if (area === "gos") {
var c = DLN_PLACES.cab;
return { show: { x: dlnX(c.x), z: c.z, y: 0, area: "gos" }, way: " (the cab rank: a cab to Westminster)" };
}
if (area === "kg") {
return { show: { x: kgX(KGN_CAB.x), z: KGN_CAB.z, y: 0, area: "kg" }, way: " (the cab rank on Bayswater Road: a cab to Westminster)" };
}
return { show: null, way: " (the 🎭 menu: London, 1912)" };
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
return (d >= 1000 ? (d / 1000).toFixed(1) + " km " : Math.round(d) + " m ") + w;
},
function () {
if (WSB.beam && WSB.beam.parent)
return WSB.beam;
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
SHK.G.add(g);
WSB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m, bk = dlnC;
switch (kind) {
case "crust":
m = wBox(0.12, 0.04, 0.08, wM(0xC8964A), 0, 0.02, 0, g);
break;
case "reed":
m = wBox(0.015, 0.5, 0.015, wM(0x9AA860), 0, 0.25, 0, g);
break;
case "twig":
m = wBox(0.02, 0.02, 0.5, wM(0x6A5030), 0, 0.02, 0, g);
break;
case "grass":
m = wBox(0.18, 0.06, 0.18, wM(0x7A9A4A), 0, 0.03, 0, g);
break;
case "mud":
m = wSph(0.1, wM(0x5A4028), 0, 0.05, 0, g, 8);
m.scale.y = 0.5;
break;
case "note":
m = wBox(0.18, 0.06, 0.1, wM(0xF4F0E4), 0, 0.03, 0, g);
break;
case "kite":
m = wBox(0.7, 0.02, 0.9, wM(0xF4F0E8), 0, 0.02, 0, g);
m.rotation.y = 0.7;
break;
case "hoop":
m = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.015, 4, 18), wM(0x8A6A44));
m.rotation.x = Math.PI / 2;
m.position.y = 0.02;
g.add(m);
break;
case "balloon":
m = wSph(0.2, wM(0xD82A2A), 0, 0.5, 0, g, 10);
wBox(0.004, 0.5, 0.004, wM(0xE8E8E8), 0, 0.2, 0, g);
break;
case "spade":
m = wBox(0.12, 0.02, 0.18, wM(0x8A8A90), 0, 0.02, 0, g);
wBox(0.025, 0.025, 0.4, wM(0x8A6A44), 0, 0.02, 0.28, g);
break;
case "letter":
m = wBox(0.16, 0.004, 0.11, wM(0xEAE0C4), 0, 0.01, 0, g);
break;
case "plank":
m = wBox(0.3, 0.02, 0.06, wM(0xC8A878), 0, 0.02, 0, g);
break;
case "brick":
m = wBox(0.08, 0.04, 0.04, wM(0xA84A3A), 0, 0.02, 0, g);
break;
case "seed":
m = wSph(0.03, wM(0x6A4A2A), 0, 0.03, 0, g, 6);
break;
case "rose":
m = wSph(0.05, wM(0xE84A6A), 0, 0.05, 0, g, 8);
break;
case "pail":
m = wCyl(0.1, 0.08, 0.16, wM(0x2A6AA8), 0, 0.08, 0, g, 10);
break;
case "thimble":
m = wCyl(0.012, 0.014, 0.02, wM(0xC8C8C8, { m: 0.8, r: 0.3 }), 0, 0.01, 0, g, 10);
break;
default: m = wSph(0.08, wM(0xE8E0D0, { e: 0x4A4A5A, ei: 0.4 }), 0, 0.12, 0, g, 10);
}
var gl = wGlow(0xE8FFE0, 0.55, 0.5);
gl.position.y = 0.28;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
return g;
},
function (kind, P, name, verb, onTake) {
if (!P)
return null;
var g = wsbItemMesh(kind);
g.position.set(P.x, (P.y || 0) + 0.02, P.z);
SHK.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = shkSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (WSB.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = SHK.spots.indexOf(I.S);
if (j >= 0)
SHK.spots.splice(j, 1);
WSB.items = WSB.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(980, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[wsb] take", e);
}
}, (P.y || 0));
I.S.wsb = 1;
WSB.items.push(I);
return I;
},
function (k) {
if (WSB.tuneKey === k)
return;
WSB.tuneKey = k;
var old = WSB.tune;
WSB.tune = null;
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
if (!k || !WSB_TUNES[k])
return;
try {
var A = new Audio(WSB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
WSB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (WSB.tune !== A) {
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
if (WSB.text)
return fn(WSB.text);
if (WSB.textWait) {
WSB.textWait.push(fn);
return;
}
WSB.textWait = [fn];
var done = function (B) { WSB.text = B; var w = WSB.textWait; WSB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/westminster/second-stain.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
wsbText(function (B) {
var C = WSB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3><div style='max-height:58vh;overflow:auto'>" + T.p.map(wsbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); WSB.readOpen = 0; WSB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = wsbS(), C = WSB_CH[S.ch];
if (!C)
return;
WSB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
WSB.readAsk = 0;
WSB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : (C.src || "Westminster, 1912: the true and the told")) + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:46vh;overflow:auto'>" + (T ? wsbOpening(T).map(wsbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); WSB.readOpen = 0; wsbStepDone(); }, all: function () { wsbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into Westminster");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", (C.txt ? "Conan Doyle's" : "Wordsworth's") + " own words, all of it");
b += wsbKeeperBtns(fns);
worldCard(b, fns);
};
wsbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
WSB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); wsbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = wsbS(), C = WSB_CH[S.ch];
if (!C)
return;
wsmBuild();
wsbItemsClear();
wsbCastClear();
WSB.hold = 0;
WSM.sitting = !!C.sitting;
if (place && C.start)
wsbPlaceAt(C.start);
try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[wsb] setup", S.ch, e);
}
wsbTune(C.tune || null);
wsbStepBegin();
},
function () {
var b = wsbStep();
wsbItemsClear();
WSB.hold = 0;
WSB.puzOpen = 0;
if (!b)
return;
b._key = wsbKey();
try {
if (b.on)
b.on(wsbS().f);
}
catch (e) {
if (window.console)
console.warn("[wsb] on", e);
}
if (b.k === "read") {
wsbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { WSB.rew[k] = 0; });
if (b.k === "find")
wsbItemAdd(b.item, wsbPos(b.at), b.name, b.verb, function () { if (wsbKey() === b._key)
wsbStepDone(); });
if (b.k === "gather") {
var P = wsbPos(b.at), n = b.n || 3, sp = b.spread || 5, R = wRand(wsbS().ch * 97 + wsbS().s * 13 + 7);
WSB.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
Q.y = shkGround(Q.x, Q.z, (P.y || 0) + 0.5);
if (P.area === "ws") {
var lq = wsLocal(Q.x, Q.z);
if (wsmRiver(lq.x, lq.z) && !b.wet) {
Q.x = P.x + Math.cos(a) * 1.2;
Q.z = P.z + Math.sin(a) * 1.2;
}
}
wsbItemAdd(b.item, Q, b.name, b.verb, function () { if (wsbKey() !== b._key)
return; WSB.got++; try {
if (b.each)
b.each(WSB.got);
}
catch (e) { } if (WSB.got < n) {
wsbSay((b.eachSay || "Got one.") + " " + WSB.got + " of " + n + ".");
return;
} wsbStepDone(); });
}
}
if (b.h)
wsbSay("<b>" + esc(WSB_CH[wsbS().ch].t) + ".</b> " + b.h);
},
function (b) {
WSB.puzOpen = 1;
WSB.puzT = performance.now();
var k = wsbKey(), fns = {}, h = WSB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
wsbSay(b.yes);
if (wsbKey() === k)
wsbStepDone();
return;
}
wsbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (wsbKey() === k)
WSB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = wsbS(), C = WSB_CH[S.ch], b = wsbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[wsb] done", e);
}
if (b.say)
wsbSay(b.say);
S.s++;
if (window.WSB_LOG)
WSB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= WSB_CH.length - 1) {
S.done = 1;
S.s = 0;
wsbSave();
wsbItemsClear();
wsbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
wsbSave();
var nx = WSB_CH[S.ch];
setTimeout(function () { try {
wsbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[wsb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
wsbSave();
wsbStepBegin();
},
function () {
wsbTune("violin");
var S = wsbS();
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>\"Holmes turned away smiling from the keen scrutiny of those wonderful eyes. 'We also have our diplomatic secrets,' said he and, picking up his hat, he turned to the door.\"</p><p style='font-size:12px;opacity:.75'>Arthur Conan Doyle, The Adventure of the Second Stain (1904)</p><p>Your keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return k.i; }).join(" ") + "</span></p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; wsbSave(); wsbChapterBegin(true); } };
b += worldBtn("again", "Walk Westminster again from the start", "The bridge at dawn");
worldCard(b, fns);
},
function () {
var S = wsbS(), C = WSB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Westminster, 1912 · William Wordsworth (1802) · Arthur Conan Doyle, The Second Stain (1904)</div><h3 style='margin:4px 0'>🕰️ Westminster and the Second Stain</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((wsbStep() || {}).h || "") + "</p>";
else
b += "<p>Westminster in the autumn of 1912: stand on the bridge at dawn where Wordsworth stood, climb the Clock Tower to Big Ben, sit in the Gallery, walk the Abbey and Whitehall. Then a letter goes missing from a despatch-box in Whitehall Terrace, a man is murdered in Godolphin Street, and two visitors climb the stair at 221B Baker Street: Sherlock Holmes's Second Stain, walked where it happens, with Conan Doyle's own words.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: Westminster Bridge at dawn", S.started ? "Back to where you were" : "Sunrise, the river, the City asleep");
fns.go = function () { worldCard(null); wsbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; wsbSave(); wsbBegin(); };
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += wsbKeeperBtns(fns);
worldCard(b, fns);
},
function (c) {
var C = WSB.cast[c.key];
if (wsbCastLive(C))
return C;
var P = wsbPos(c.at);
if (!P)
return null;
var inside = P.area.indexOf("in:") === 0, parent = inside ? (SHK.rooms[P.area.slice(3)] || {}).live : (c.kind && c.kind !== "person" ? WSM.live : SHK.live);
if (!parent)
return null;
var px = P.x + (c.ox || 0), pz = P.z + (c.oz || 0), py = c.y != null ? c.y : shkGround(px, pz, (P.y || 0) + 0.5) + (c.kind === "person" || !c.kind ? 0.14 : 0), g;
if (!c.kind || c.kind === "person") {
g = dlnPerson("wsb_" + c.key, c.dress, { sex: c.sex, child: !!c.child, inside: inside });
}
else if (c.kind === "thing" && c.make)
g = c.make();
else
g = new THREE.Group();
g.position.set(px, py, pz);
g.rotation.y = c.ry || 0;
if (c.lie) {
g.rotation.x = -Math.PI / 2;
g.position.y += 0.25;
}
parent.add(g);
var Q = { g: g, key: "wsb_" + c.key, wander: c.wander ? { r: c.wander, sp: 0.5 } : null, ground: py };
if (!c.kind || c.kind === "person")
SHK.people.push(Q);
if (c.name) {
var T = { p: Q, name: c.name, r: c.r || (c.kind && c.kind !== "person" ? 2.4 : 3.2), t: { name: c.name, persona: c.persona || WST_ERA, greet: c.greet || "Hallo." } };
SHK.talk.push(T);
wsbWrapT(T);
}
WSB.cast[c.key] = { g: g, P: Q, c: c };
return WSB.cast[c.key];
},
function () {
var C = WSB_CH[wsbS().ch];
if (!C || !C.cast)
return;
var b = wsbStep() || {}, idx = wsbS().s;
C.cast.forEach(function (c) {
if (c.from != null && idx < c.from)
return;
if (c.until != null && idx >= c.until) {
if (WSB.cast[c.key])
wsbCastHide(c.key);
return;
}
if (wsbCastLive(WSB.cast[c.key]))
return;
var P = wsbPos(c.at);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
if (!SHK.rooms[P.area.slice(3)])
return;
}
else if (wsbDist(P, worldLocal()) > 300 && b.who !== c.name)
return;
wsbPerson(c);
});
},
function (T) {
if (!wsbActive() || !wsZoneNow())
return false;
var b = wsbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = wsbKey();
worldPrompt(null);
var next = function () { if (wsbKey() === k)
wsbStepDone(); };
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
worldCard(WSB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
function (dt) {
if (!SHK.G || !SHK.built)
return;
WSB.wt += dt;
if (WSB.wt > 0.5) {
WSB.wt = 0;
wsbWrap();
if (wsbActive())
wsbCastTick();
}
var cardOpen = WLD.card && WLD.card.style.display === "block", busy = cardOpen || WLD.promptFn || SHK.moving;
if (!wsbActive()) {
if (WSB.beam)
WSB.beam.visible = false;
if (!busy)
worldPrompt("🕰️ <b>Westminster and the Second Stain</b> · <b>press E</b> to walk the book", wsbOpen);
return;
}
var S = wsbS(), b = wsbStep(), L = worldLocal(), t = SHK.t || 0, area = wsbAreaAt(L.x, L.z);
WSB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? wsbPos(b.at) : null, W = P ? wsbWayTo(P, area) : null, show = W && W.show, way = W ? W.way : "", bm = wsbBeam();
if (show && !SHK.moving) {
bm.visible = true;
var cd = wsbDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
var outside = area.indexOf("in:") !== 0;
bm.userData.col.visible = outside && cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = wsbWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !SHK.moving) {
var inArea = P && P.area === area, fd = P ? wsbDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (WSB.readAsk)
break;
if (!WSB.readOpen)
wsbChapterCard();
else {
WSB.readOpen = 0;
wsbStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null ? true : fd < (b.r || 6))) {
wsbStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
WSB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(WSB.hold, dt);
}
catch (e) { }
if (WSB.hold >= (b.sec || 8)) {
wsbStepDone();
return;
}
}
else
WSB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return WSB.rew[k]; })) {
wsbStepDone();
return;
}
break;
case "until": {
var ok = false;
try {
ok = b.test(S.f);
}
catch (e) { }
if (ok) {
wsbStepDone();
return;
}
break;
}
case "puzzle":
if ((!WSB.puzOpen || performance.now() - (WSB.puzT || 0) > 3000) && (!P || (inArea && fd < (b.r || 6))))
wsbPuzzleCard(b);
break;
}
}
if (!busy)
worldPrompt("🕰️ <b>Westminster and the Second Stain</b> · <b>press E</b> for the book", wsbOpen);
var C = WSB_CH[S.ch], prog = b && b.k === "hold" && WSB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - WSB.hold)) + " s)" : b && b.k === "gather" ? " (" + (WSB.got || 0) + " of " + (b.n || 3) + ")" : "";
worldBanner("🕰️ <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function (x, z) {
if (Math.hypot(x - WST_CAB.x, z - WST_CAB.z) < 14)
return "the cab rank, Whitehall";
if (x > WST_RIV.x0 && x < WST_RIV.x1)
return z >= WST_BR.z0 - 2 && z <= WST_BR.z1 + 2 ? "Westminster Bridge" : "on the Thames";
if (x >= WST_RIV.x1)
return z >= WST_BR.z0 - 2 && z <= WST_BR.z1 + 2 ? "Westminster Bridge, the Surrey side" : "the Albert Embankment, Lambeth";
if (z >= WST_BR.z0 - 2 && z <= WST_BR.z1 + 2 && x > -26)
return x > 120 ? "the foot of Westminster Bridge" : "Bridge Street";
if (x >= WST_EMB.x0 - 4 && z < WST_EMB.z1)
return "the Victoria Embankment";
if (x > 90 && x < 150 && z > -180 && z < -104)
return "New Scotland Yard";
if (Math.abs(x - WST_CLOCK.x) < 16 && Math.abs(z - WST_CLOCK.z) < 16)
return "the foot of the Clock Tower";
if (x > WST_PAL.x0 - 2 && x < WST_PAL.x1 + 10 && z > WST_PAL.z0 && z < WST_PAL.z1)
return "the Palace of Westminster";
if (x > -6 && x < WST_PAL.x0 && z > -30 && z < 14)
return "New Palace Yard";
if (x > -6 && x < WST_PAL.x0 && z >= WST_WH.z0 && z < WST_WH.z1)
return "by Westminster Hall";
if (x > -6 && x < WST_PAL.x0 && z >= WST_WH.z1 && z < 290)
return "Old Palace Yard";
if (x > 120 && z > 290)
return "Victoria Tower Gardens";
if (Math.abs(z - WST_GOD.z) < 14 && x > WST_GOD.x0 - 4 && x < WST_GOD.x1 + 4)
return "Godolphin Street";
if (x > 36 && x < 96 && z > 300 && z < 380)
return "Smith Square";
if (z > 290)
return "Millbank";
if (x >= WST_SQ.x0 - 16 && x <= WST_SQ.x1 + 16 && z >= WST_SQ.z0 - 14 && z <= WST_SQ.z1 + 16)
return "Parliament Square";
if (x < WST_AB.x1 + 28 && z > WST_SQ.z1 + 16 && z < 130)
return x < WST_AB.x0 + 4 ? "before the west front of Westminster Abbey" : "Westminster Abbey";
if (x < -60 && z > -104 && z < WST_SQ.z0)
return "Great George Street";
if (z < -200 && z > -226 && x < WST_WHL.x0)
return "Downing Street";
if (x >= WST_WHL.x0 - 14 && x <= WST_WHL.x1 + 4 && z < -90) {
if (z < -300 && z > -350)
return x < WST_WHL.x0 ? "the Horse Guards, Whitehall" : "Whitehall, by the Banqueting House";
if (z > -285 && z < -240 && x > WST_WHL.x0)
return "Whitehall Terrace";
return z > -140 ? "Parliament Street" : "Whitehall";
}
if (x > WST_WHL.x1 && z < -90)
return "Whitehall Gardens";
return "Westminster";
},
function () {
var b = worldBtn("baker", "To 221B Baker Street", "The sitting-room up the seventeen steps") + worldBtn("gos", "To Great Ormond Street", "The hospital, Queen Square") + worldBtn("kg", "To Kensington Gardens", "The Black Lion Gate, Bayswater Road") + worldBtn("god", "To Godolphin Street", "\"Almost in the shadow of the great Tower\"") + worldBtn("back", "Back to Bankside, 1600", "Three hundred years ago, by Old Father Thames");
worldCard(worldFacts("🎩 A hansom cab", "The rank in Whitehall, by the Square", [], []) + b, {
baker: function () { worldCard(null); shkGoIn("ws_baker"); },
gos: function () { worldCard(null); dlnGo("🎩 <b>Great Ormond Street.</b> The cab sets you down at the rank."); },
kg: function () { worldCard(null); kgnGo("gate", "🌳 <b>Kensington Gardens.</b> The Black Lion Gate, on the Bayswater Road."); },
god: function () { worldCard(null); wsmGo("god", "🏠 <b>Godolphin Street.</b> \"One of those old-world and secluded rows of eighteenth-century houses.\""); },
back: function () { worldCard(null); dlnTo1600(); }
});
},
function () {
try {
var d = document.createElement("div");
d.innerHTML = worldBtn("ws", "🕰️ To Westminster", "Whitehall, by Parliament Square, Big Ben, and the Abbey");
var b = d.querySelector("[data-w]");
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); worldCard(null); wsmGo("cab", "🕰️ <b>Westminster.</b> The cab sets you down in Whitehall, by Parliament Square. Big Ben is right ahead of you."); };
var card = WLD.card, first = card && card.querySelector("[data-w]:not([data-w=close])");
if (first)
first.parentNode.insertBefore(b, first);
else if (card)
card.appendChild(b);
}
catch (e) { }
},
function (title, quotes, notes, btns) {
var b = "<div style='font:600 16px Georgia;color:#FFE7B0'>" + esc(title) + "</div>" + (quotes || []).map(function (k) { var q = N14_Q[k] || k; return "<p style='font:italic 14px/1.55 Georgia;margin:8px 0'>" + esc(q) + "</p>"; }).join("") +
((quotes || []).length ? "<div style='font-size:11px;opacity:.65;margin-top:-2px'>J. M. Barrie, Peter and Wendy (1911)</div>" : "") +
(notes && notes.length ? "<div style='font-size:13px;opacity:.9;line-height:1.5'>" + notes.map(function (n) { return "<p style='margin:5px 0'>" + esc(n) + "</p>"; }).join("") + "</div>" : "");
var fns = {};
(btns || []).forEach(function (B) { b += worldBtn(B[0], B[1], B[2] || ""); fns[B[0]] = function () { worldCard(null); B[3](); }; });
worldCard(b, fns);
try {
N14.read = (N14.read || 0) + 1;
}
catch (e) { }
},
function (P) {
var X = n14X, flags = dlnS("flags", 0xFFFFFF), road = dlnS("setts", 0xB0A89C), lawn = dlnS("lawn", 0xFFFFFF), gravel = dlnS("gravel", 0xFFFFFF), F = N14_F, G = N14_G;
dlnPlane(P, N14_R.x1 - N14_R.x0 + 80, N14_R.z1 - N14_R.z0 + 80, flags, X(0), 0.0, 0);
[[-51, 51, -35, -26], [-51, 51, 26, 35], [42, 51, -35, 35], [-51, -42, -35, 35], [43.2, 54, -60, -35], [-54, -43.2, -60, -35], [43.2, 54, 35, 60], [-54, -43.2, 35, 60]].forEach(function (r) { dlnPlane(P, r[1] - r[0], r[3] - r[2], road, X((r[0] + r[1]) / 2), 0.02, (r[2] + r[3]) / 2); });
var kerb = dlnS("stone", 0xB8B4AC);
[[-43.2, 43.2, -35], [-43.2, 43.2, 35]].forEach(function (k) { dlnBox(P, k[1] - k[0], 0.12, 0.3, kerb, X((k[0] + k[1]) / 2), 0.06, k[2]); });
[[51, -35, 35], [-51, -35, 35]].forEach(function (k) { dlnBox(P, 0.3, 0.12, k[2] - k[1], kerb, X(k[0]), 0.06, (k[1] + k[2]) / 2); });
dlnPlane(P, G.hx * 2, G.hz * 2, lawn, X(0), 0.03, 0);
dlnPlane(P, G.hx * 2 - 2, 2.4, gravel, X(0), 0.04, -G.hz + 2.2);
dlnPlane(P, G.hx * 2 - 2, 2.4, gravel, X(0), 0.04, G.hz - 2.2);
dlnPlane(P, 2.4, G.hz * 2 - 2, gravel, X(-G.hx + 2.2), 0.04, 0);
dlnPlane(P, 2.4, G.hz * 2 - 2, gravel, X(G.hx - 2.2), 0.04, 0);
dlnPlane(P, G.hx * 2 - 4, 2.8, gravel, X(0), 0.045, 0);
dlnPlane(P, 2.8, G.hz * 2 - 4, gravel, X(0), 0.045, 0);
dlnPlane(P, 9, 9, gravel, X(0), 0.05, 0, Math.PI / 4);
shkFloor(X(0), 0, (N14_R.x1 - N14_R.x0) / 2 + 40, (N14_R.z1 - N14_R.z0) / 2 + 40, 0);
},
function (P, R) {
var X = n14X, G = N14_G, stone = dlnS("stone", 0xD8D0C0), iron = dlnShine(0x1A1E1A, 0.55, 0.6);
var gw = 2.4;
[[-1, 0], [1, 0]].forEach(function (s) { var z = s[0] * G.hz; dlnBox(P, G.hx * 2, 0.35, 0.4, stone, X(0), 0.17, z); dlnRail(P, X(-G.hx), z, X(-gw), z, 1.4); dlnRail(P, X(gw), z, X(G.hx), z, 1.4); });
[[-1, 0], [1, 0]].forEach(function (s) { var x = s[0] * G.hx; dlnBox(P, 0.4, 0.35, G.hz * 2, stone, X(x), 0.17, 0); dlnRail(P, X(x), -G.hz, X(x), -gw, 1.4); dlnRail(P, X(x), gw, X(x), G.hz, 1.4); });
[[0, -G.hz], [0, G.hz], [-G.hx, 0], [G.hx, 0]].forEach(function (g) { [-1, 1].forEach(function (k) { var px = g[1] ? g[0] + k * gw : g[0], pz = g[1] ? g[1] : k * gw; dlnBox(P, 0.4, 1.8, 0.4, stone, X(px), 0.9, pz); var ball = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8), stone); ball.position.set(X(px), 1.95, pz); P.add(ball); }); });
shkSolidBox(X(-(G.hx + gw) / 2), -G.hz, G.hx - gw, 0.5, 0);
shkSolidBox(X((G.hx + gw) / 2), -G.hz, G.hx - gw, 0.5, 0);
shkSolidBox(X(-(G.hx + gw) / 2), G.hz, G.hx - gw, 0.5, 0);
shkSolidBox(X((G.hx + gw) / 2), G.hz, G.hx - gw, 0.5, 0);
shkSolidBox(X(-G.hx), -(G.hz + gw) / 2, 0.5, G.hz - gw, 0);
shkSolidBox(X(-G.hx), (G.hz + gw) / 2, 0.5, G.hz - gw, 0);
shkSolidBox(X(G.hx), -(G.hz + gw) / 2, 0.5, G.hz - gw, 0);
shkSolidBox(X(G.hx), (G.hz + gw) / 2, 0.5, G.hz - gw, 0);
var tr = [];
[[-33, -17], [-14, -18], [14, -18], [33, -17], [-33, 17], [-14, 18], [14, 18], [33, 17], [-34, 0], [34, 0]].forEach(function (t, i) { if (DLN.lite && i % 2)
return; tr.push({ x: X(t[0]), z: t[1], h: 12 + R() * 5 }); });
dlnPlanes(P, tr, R);
var shrub = dlnS("leaves", 0x8AA078);
for (var sx = -G.hx + 4; sx < G.hx - 3; sx += DLN.lite ? 8 : 4) {
if (Math.abs(sx) < gw + 1)
continue;
[-1, 1].forEach(function (k) { var m = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, DLN.lite ? 0 : 1), shrub); m.scale.set(1.3, 0.8, 0.9); m.position.set(X(sx), 0.75, k * (G.hz - 1.4)); P.add(m); });
}
var gran = dlnS("stone", 0xB8B0A8), bronze = dlnShine(0x4A5A4E, 0.5, 0.6);
dlnCyl(P, 1.6, 1.8, 0.5, gran, X(0), 0.25, 0, DLN.lite ? 10 : 18);
dlnCyl(P, 1.3, 1.3, 0.06, dlnShine(0x5A6A6E, 0.1, 0.3), X(0), 0.5, 0, DLN.lite ? 10 : 18);
dlnCyl(P, 0.4, 0.55, 1.2, gran, X(0), 1.0, 0, 12);
var bowl = dlnCyl(P, 0.7, 0.45, 0.3, gran, X(0), 1.7, 0, 14);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { dlnCyl(P, 0.1, 0.1, 2.8, gran, X(c[0] * 1.15), 1.9, c[1] * 1.15, 8); });
dlnBox(P, 2.8, 0.3, 2.8, gran, X(0), 3.4, 0);
var cap = new THREE.Mesh(new THREE.ConeGeometry(2.0, 1.2, 4), dlnS("slate", 0x8A8E94));
cap.rotation.y = Math.PI / 4;
cap.position.set(X(0), 4.1, 0);
P.add(cap);
var cup = dlnCyl(P, 0.05, 0.04, 0.1, bronze, X(0.45), 1.9, 0, 8);
shkSolid({ x: X(0), z: 0, r: 2.0 });
[[-24, -20.4, 0], [24, -20.4, 0], [-24, 20.4, Math.PI], [24, 20.4, Math.PI], [-36.6, -8, Math.PI / 2], [36.6, 8, -Math.PI / 2]].forEach(function (b) { dlnBench(P, X(b[0]), b[1], b[2]); });
if (typeof kgnPram === "function") {
var pr = kgnPram(0x2A3A5A);
pr.position.set(X(-21.6), 0.02, -19.2);
pr.rotation.y = 0.4;
P.add(pr);
}
var hp = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.015, 6, 22), dlnShine(0x8A5A2A, 0.5, 0.1));
hp.position.set(X(8), 0.06, 6);
hp.rotation.x = Math.PI / 2;
P.add(hp);
shkSpot(X(0), 2.6, 3.2, "The fountain in the square's garden", "drink, and look round", function () { n14Tale("⛲ The garden in the square", ["nana", "school"], ["A railed garden in the middle of a Bloomsbury square, kept for the people of the houses round it: plane trees, laurels, a gravel walk and benches. This is where the nursemaids come with their perambulators, and where Nana watches them."]); });
},
function (P, R) {
var X = n14X, T = N14_T, F = N14_F, geo = dlnS("georgian", 0xFFFFFF);
dlnTerrace(P, N14_X + T.x0, N14_X + T.x1, F.n, 1, 4, { tint: 0xE0C4A4, nums: function (i) { return 10 + i; } });
dlnTerrace(P, N14_X + T.x0, N14_X + T.x1, F.s, -1, 4, { tint: 0xD8BCA0, nums: function (i) { return 30 - i; } });
wsmBlock(P, X(F.e + 7), 0, 43.2, 14, 13.2, geo, -Math.PI / 2, { roof: 3, base: 3.3 });
wsmBlock(P, X(F.w - 7), 0, 43.2, 14, 13.2, geo, Math.PI / 2, { roof: 3, base: 3.3 });
[[1, -1], [1, 1], [-1, -1], [-1, 1]].forEach(function (c) {
wsmBlock(P, X(c[0] * 61), c[1] * 39, 26, 14, 13.2, geo, c[0] > 0 ? -Math.PI / 2 : Math.PI / 2, { roof: 3, base: 3.3 });
wsmBlock(P, X(c[0] * 48.6), c[1] * 62, 14, 16, 13.2, geo, c[1] < 0 ? 0 : Math.PI, { roof: 3, base: 3.3 });
});
var stucco = dlnC(0xEAE2D0);
[[F.n, 1], [F.s, -1]].forEach(function (s) { for (var x = T.x0; x < T.x1; x += N14_HOUSE) {
dlnBox(P, N14_HOUSE - 0.2, 0.08, 0.06, dlnC(0xD0C8B4), X(x + N14_HOUSE / 2), 1.1, s[0] + s[1] * 0.04);
dlnBox(P, N14_HOUSE - 0.2, 0.08, 0.06, dlnC(0xD0C8B4), X(x + N14_HOUSE / 2), 2.2, s[0] + s[1] * 0.04);
} });
for (var lx = T.x0 + 6; lx < T.x1; lx += DLN.lite ? 24 : 12) {
dlnLamp(P, X(lx), F.n + 2.6);
dlnLamp(P, X(lx), F.s - 2.6);
}
[[-N14_G.hx - 1, -N14_G.hz - 1], [N14_G.hx + 1, -N14_G.hz - 1], [-N14_G.hx - 1, N14_G.hz + 1], [N14_G.hx + 1, N14_G.hz + 1]].forEach(function (l) { dlnLamp(P, X(l[0]), l[1]); });
dlnPillarBox(P, X(-47), -35.8);
n14Fourteen(P);
n14TwentySeven(P);
},
function (P) {
var X = n14X, z = N14_F.n, D = N14_DOOR, brass = dlnShine(0xC8A048, 0.3, 0.9), box = dlnS("oak", 0x6A4A2A), red = dlnC(0xC8242A), leaf = dlnC(0x3A6A2A);
[1.8, 5.4, 9.0].forEach(function (bx) {
dlnBox(P, 1.5, 0.3, 0.4, box, X(bx), 3.75, z + 0.3);
for (var f = 0; f < (DLN.lite ? 3 : 6); f++) {
var g = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 5), f % 2 ? red : leaf);
g.position.set(X(bx - 0.6 + f * 0.24), 4.0 + (f % 2) * 0.05, z + 0.3);
P.add(g);
}
});
dlnBox(P, 0.06, 0.5, 0.4, dlnShine(0x1A1A1A, 0.5, 0.5), X(D.x), 3.25, z + 0.4);
dlnCyl(P, 0.16, 0.12, 0.4, dlnGlow(0xFFE6B0), X(D.x), 3.0, z + 0.6, 6);
dlnCyl(P, 0.07, 0.07, 0.02, brass, X(D.x), 1.7, z + 0.12, 10).rotation.x = Math.PI / 2;
dlnBox(P, 0.3, 0.06, 0.03, brass, X(D.x), 1.1, z + 0.12);
var W = N14_NUR, nw = DLN.tex.n14nur || (DLN.tex.n14nur = wTex(128, 192, function (x, Wd, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#F8D898");
g.addColorStop(1, "#C88A4A");
x.fillStyle = g;
x.fillRect(0, 0, Wd, H);
x.fillStyle = "rgba(120,60,40,.35)";
x.fillRect(0, H * 0.72, Wd, H * 0.28);
x.fillStyle = "#6A8AB0";
x.fillRect(0, 0, 22, H);
x.fillRect(Wd - 22, 0, 22, H);
x.fillStyle = "rgba(255,255,255,.55)";
for (var i = 0; i < 3; i++) {
x.fillRect(30 + i * 28, H * 0.56, 16, 10);
}
x.strokeStyle = "#F4F0E8";
x.lineWidth = 5;
x.strokeRect(2, 2, Wd - 4, H - 4);
x.beginPath();
x.moveTo(Wd / 2, 0);
x.lineTo(Wd / 2, H);
x.moveTo(0, H / 2);
x.lineTo(Wd, H / 2);
x.stroke();
}));
var pane = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 2.05), new THREE.MeshBasicMaterial({ map: nw, fog: true }));
pane.position.set(X(W.x), W.y, z + 0.06);
P.add(pane);
var leafG = dlnBox(P, 0.62, 2.0, 0.04, dlnGlow(0xB8C8D8), X(W.x + 0.95), W.y, z + 0.35);
leafG.rotation.y = -0.9;
dlnBox(P, 1.6, 0.1, 0.35, dlnC(0xF4F0E8), X(W.x), W.y - 1.08, z + 0.15);
shkDoor("n14_hall", X(D.x), z + 3.0, "No. 14: the Darlings' front door");
shkSpot(X(D.x + 7.2), z + 2.6, 2.4, "The area steps of No. 14", "go down to the kitchen door", function () { shkGoIn("n14_kitchen"); });
shkSpot(X(W.x), z + 8.5, 4, "No. 14's nursery window, up at the top", "look up", function () { n14Tale("🪟 The nursery window, three floors up", ["floors", "tape", "ablaze", "open"], ["The night nursery is at the top of the house, on the second floor above the street. Its window is a casement that opens outward, and it is always left open now, for the children."], [["go", "Go in, and up to the nursery", "The front door, then the stairs", function () { shkGoIn("n14_night"); }]]); });
shkSpot(X(D.x - 3.2), z + 3.4, 2.4, "No. 14", "read the brass plate", function () { n14Tale("🏠 No. 14", ["fourteen", "neighbours", "position"], ["Barrie gives the Darlings' house a number but never a street. It stands here on a quiet Bloomsbury square: a tall brick house of four floors over a basement, with an area, railings and a fanlight, exactly like its neighbours, which is how Mr Darling likes it."]); });
},
function (P) {
var X = n14X, z = N14_F.s, D = N14_27, red = dlnC(0x9A1A1E), stripe = DLN.mats.n14awn || (DLN.mats.n14awn = new THREE.MeshLambertMaterial({ map: wTex(64, 64, function (x, W, H) { for (var i = 0; i < 8; i++) {
x.fillStyle = i % 2 ? "#F4F0E6" : "#2A4A3A";
x.fillRect(i * 8, 0, 8, H);
} }), side: THREE.DoubleSide })), pole = dlnShine(0xC8A048, 0.3, 0.85);
dlnPlane(P, 1.6, 4.6, red, X(D.x), 0.06, z - 2.4);
var aw = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 4.6, 14, 1, true, -Math.PI / 2, Math.PI), stripe);
aw.rotation.x = Math.PI / 2;
aw.rotation.z = Math.PI;
aw.position.set(X(D.x), 2.6, z - 2.4);
P.add(aw);
[[-1, -4.6], [1, -4.6], [-1, -0.4], [1, -0.4]].forEach(function (p) { dlnCyl(P, 0.04, 0.04, 2.6, pole, X(D.x + p[0] * 1.15), 1.3, z + p[1], 6); });
var lit = dlnGlow(0xFFE2A0);
[-9, -5.4, -1.8].forEach(function (bx) { [1.68, 4.98].forEach(function (y) { if (Math.abs(bx - D.x) < 0.5 && y < 3)
return; dlnBox(P, 1.3, 2.05, 0.05, lit, X(bx), y, z - 0.06); }); });
shkDoor("n27_dining", X(D.x), z - 3.0, "No. 27");
shkSpot(X(D.x + 4), z - 6.5, 3, "Before No. 27", "look across at No. 14", function () { n14Tale("🎩 No. 27, a few yards distant", ["n27", "accepted", "burst"], ["No. 27 stands straight across the garden from No. 14: the houses here are numbered round the square, as many London squares are."]); });
},
function () {
var X = n14X, live = N14.live, C = N14_CAB;
for (var r = 0; r < (DLN.lite ? 1 : 2); r++)
dlnHansom(live, X(C.x - 5), C.z - 6 - r * 7, Math.PI);
var green = dlnC(0x2A4A30), roof = dlnS("slate", 0x6A7068), sg = new THREE.Group();
sg.position.set(X(46.5), 0, 10);
live.add(sg);
dlnBox(sg, 2.6, 2.6, 5.4, green, 0, 1.5, 0);
var rf = dlnGable(sg, 2.8, 5.6, 1.1, roof, 0, 2.8, 0, Math.PI / 2);
for (var w = 0; w < 3; w++) {
dlnBox(sg, 0.05, 0.7, 0.9, dlnGlow(0xE8DCB0), -1.32, 1.8, -1.6 + w * 1.6);
dlnBox(sg, 0.05, 0.7, 0.9, dlnGlow(0xE8DCB0), 1.32, 1.8, -1.6 + w * 1.6);
}
dlnCyl(sg, 0.12, 0.12, 0.8, dlnC(0x3A3A3A), 0, 3.9, 1.6, 8);
shkSolidBox(X(46.5), 10, 2.8, 5.6, 0);
var sign = dlnPanel(["Cabmen only"], "CABMEN'S SHELTER", 2.4, 0.7, "#2A4A30", "#F0E6C8");
sign.position.set(X(46.5), 2.85, 12.75);
live.add(sign);
shkSpot(X(C.x), C.z + 3, 3.4, "The cab rank", "take a cab", function () { n14CabCard(); });
var loop = [[-46.5, -30.5], [46.5, -30.5], [46.5, 30.5], [-46.5, 30.5], [-46.5, -30.5]];
N14.loop = loop;
var Ld = 0;
for (var i = 1; i < loop.length; i++)
Ld += Math.hypot(loop[i][0] - loop[i - 1][0], loop[i][1] - loop[i - 1][1]);
N14.loopL = Ld;
for (var c = 0; c < (DLN.lite ? 1 : 3); c++) {
var cg = new THREE.Group();
live.add(cg);
dlnHansom(cg, 0, 0, 0);
N14.cabs.push({ g: cg, s: c * Ld / 3, sp: 3.6 });
}
},
function (k, x, z, ry, o) {
var F = N14_FOLK[k], p = dlnPerson("n14_" + k, F.dress, { sex: F.sex });
p.position.set(n14X(x), 0.02, z);
p.rotation.y = ry || 0;
SHK.live.add(p);
var P = { g: p, key: "n14_" + k, wander: o && o.wander ? { r: o.wander, sp: 0.45 } : null, ground: 0.02 };
SHK.people.push(P);
SHK.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet } });
return P;
},
function (R) {
var X = n14X, crowd = function (n, x0, x1, z0, z1, kinds, o) {
if (DLN.lite)
n = Math.ceil(n * 0.4);
for (var i = 0; i < n; i++) {
var px = x0 + R() * (x1 - x0), pz = z0 + R() * (z1 - z0);
if (shkSolidAt(X(px), pz, 0))
continue;
var who = kinds[(R() * kinds.length) | 0], p = dlnPerson("n14f" + SHK.people.length + "_" + i, who);
p.position.set(X(px), 0.02, pz);
p.rotation.y = R() * 6.28;
SHK.live.add(p);
SHK.people.push({ g: p, wander: o && o.still ? null : { r: o && o.r || 8, sp: 0.35 + R() * 0.4 }, ground: 0.02 });
}
};
crowd(8, -42, 42, -37.4, -35.6, ["gent", "lady", "maid", "oldgent", "newsboy", "nanny", "gent"], { r: 14 });
crowd(8, -42, 42, 35.6, 37.4, ["gent", "lady", "maid", "oldgent", "lady", "worker"], { r: 14 });
crowd(10, -36, 36, -20, 20, ["nanny", "nanny", "girl", "boy", "sailorboy", "lady", "oldgent", "girl"], { r: 9 });
crowd(4, 51.4, 53.6, -30, 30, ["gent", "worker", "maid", "cabby"], { r: 10 });
crowd(4, -53.6, -51.4, -30, 30, ["lady", "gent", "oldgent", "maid"], { r: 10 });
if (typeof kgnPram === "function")
for (var n = 0; n < (DLN.lite ? 1 : 3); n++) {
var a = n / 3 * Math.PI * 2, px = Math.cos(a) * 30, pz = Math.sin(a) * 17;
var nm = dlnPerson("n14nm_" + n, "nanny", { sex: "f" });
nm.position.set(X(px), 0.02, pz);
nm.rotation.y = a;
SHK.live.add(nm);
SHK.people.push({ g: nm, ground: 0.02 });
var pr = kgnPram([0x1E2A3A, 0x3A2A2A, 0x2A3A2A][n]);
pr.position.set(X(px + Math.sin(a) * 0.9), 0.02, pz + Math.cos(a) * 0.9);
pr.rotation.y = a;
SHK.live.add(pr);
}
n14Named("pc", 20, -36.2, Math.PI / 2, { wander: 18 });
n14Named("lamps", -20, -35.4, 0.4, { wander: 20 });
n14Named("nursemaid", -23, -18.6, 0.3);
n14Named("organ", -12, -35.6, Math.PI);
n14Named("butler", N14_27.x + 1.2, N14_F.s - 1.2, Math.PI);
n14Named("cabman", N14_CAB.x - 1, N14_CAB.z + 1.6, -Math.PI / 2);
var og = new THREE.Group();
og.position.set(X(-13.4), 0, -35.6);
SHK.live.add(og);
dlnBox(og, 0.9, 0.7, 0.5, dlnShine(0x6A1A1A, 0.4, 0.2), 0, 1.0, 0);
dlnBox(og, 0.95, 0.06, 0.55, dlnShine(0xC8A048, 0.3, 0.85), 0, 1.38, 0);
dlnBox(og, 0.86, 0.5, 0.02, dlnC(0xE8D49A), 0, 1.0, -0.26);
dlnCyl(og, 0.03, 0.03, 0.7, dlnC(0x2A1A10), 0, 0.33, 0, 6);
var hd = dlnBox(og, 0.04, 0.3, 0.04, dlnC(0x2A1A10), 0.5, 1.05, 0);
N14.handle = og;
shkSpot(X(-13.4), -33.4, 2.4, "The barrel organ", "turn the handle", function () { N14.organT = 40; n14TuneSet("organ"); setStatus("🎶 You turn the handle, and the barrel organ plays: a tune pinned on its wooden barrel, for the whole square."); });
shkSpot(X(-20), -33.6, 2.2, "The lamp-post", "look up at it", function () { n14Tale("🏮 A lamp of the square", ["stars"], ["Gas lamps like this are lit one by one at dusk by the lamplighter with his long pole, and put out at dawn. On a clear night, the stars come out over the chimney pots of the square."]); });
},
function () {
if (N14.built || !SHK.G)
return;
DLN.lite = N14.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(1414), live0 = SHK.live;
N14.live = new THREE.Group();
N14.live.name = "n14-live";
SHK.G.add(N14.live);
N14.cabs = [];
var all = new THREE.Group();
SHK.G.add(all);
[[n14Ground, "ground"], [n14Garden, "garden"], [n14Houses, "houses"]].forEach(function (f) { try {
f[0](all, R);
}
catch (e) {
if (window.console)
console.warn("[no. 14] " + f[1], e);
} });
try {
n14Traffic();
}
catch (e) {
if (window.console)
console.warn("[no. 14] traffic", e);
}
try {
n14Folk(R);
}
catch (e) {
if (window.console)
console.warn("[no. 14] folk", e);
}
SHK.G.remove(all);
var g = new THREE.Group();
g.name = "n14-square";
SHK.G.add(g);
all.children.slice().forEach(function (m) { if (m.userData && m.userData.keep) {
N14.live.add(m);
return;
} g.add(m); });
try {
ctnMerge(g);
g.children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) {
if (window.console)
console.warn("[no. 14] bake", e);
}
SHK.dist.push({ n: "n14-square", g: g, x: n14X(0), z: 0, r: 110 });
SHK.live = live0;
N14.built = true;
},
function (dt, t) {
if (!N14.built)
return;
N14.cabs.forEach(function (B) {
B.s += B.sp * dt;
var p = n14LoopAt(B.s), q = n14LoopAt(B.s + 2), a = Math.atan2(q.x - p.x, q.z - p.z);
B.g.position.set(n14X(p.x), 0.02, p.z);
B.g.rotation.y = a + Math.PI;
});
if (N14.organT > 0) {
N14.organT -= dt;
if (N14.handle)
N14.handle.rotation.y = Math.sin(t * 0.3) * 0.02;
if (N14.organT <= 0 && N14.tuneKey === "organ")
n14TuneSet(null);
}
},
function () { return dlnTex("n14tiles", 256, 256, function (x, W, H) { for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
x.fillStyle = (i + j) % 2 ? "#1A1A1E" : "#EEEAE0";
x.fillRect(i * 64, j * 64, 64, 64);
} x.strokeStyle = "rgba(120,110,100,.4)"; x.lineWidth = 1; for (var k = 0; k <= 4; k++) {
x.beginPath();
x.moveTo(k * 64, 0);
x.lineTo(k * 64, H);
x.moveTo(0, k * 64);
x.lineTo(W, k * 64);
x.stroke();
} }, 1.2, 1.2); },
function () {
return dlnTex("n14rose", 256, 256, function (x, W, H) {
x.fillStyle = "#F0E4DC";
x.fillRect(0, 0, W, H);
var R = wRand(31);
for (var i = 0; i < 26; i++) {
var cx = R() * W, cy = R() * H;
x.fillStyle = "rgba(200,110,120,.55)";
x.beginPath();
x.arc(cx, cy, 7, 0, 7);
x.fill();
x.fillStyle = "rgba(230,160,170,.7)";
x.beginPath();
x.arc(cx - 2, cy - 2, 4, 0, 7);
x.fill();
x.fillStyle = "rgba(110,150,100,.6)";
x.beginPath();
x.ellipse(cx + 9, cy + 5, 7, 3, 0.5, 0, 7);
x.fill();
}
}, 1.4, 1.4);
},
function () {
return dlnTex("n14turkey", 256, 256, function (x, W, H) {
x.fillStyle = "#7A1E1E";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#1E2A4A";
x.lineWidth = 14;
x.strokeRect(10, 10, W - 20, H - 20);
x.strokeStyle = "#D8B870";
x.lineWidth = 4;
x.strokeRect(26, 26, W - 52, H - 52);
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
var cx = 48 + i * 53, cy = 48 + j * 53;
x.fillStyle = (i + j) % 2 ? "#D8B870" : "#2A3A6A";
x.beginPath();
x.moveTo(cx, cy - 16);
x.lineTo(cx + 16, cy);
x.lineTo(cx, cy + 16);
x.lineTo(cx - 16, cy);
x.fill();
}
}, 3, 3);
},
function () {
var b = worldBtn("draw", "The first floor: Mrs Darling's drawing-room", "Where the screens are kept for first Thursdays") + worldBtn("bed", "The second floor: Mr and Mrs Darling's bedroom", "") + worldBtn("dress", "The second floor: Mr Darling's dressing-room", "Where the tie will not tie") +
worldBtn("day", "The top floor: the day nursery", "The nursery piano, the toys, Michael's bath") + worldBtn("night", "The top floor: the night nursery", "Three beds, the kennel, and the window") + worldBtn("hall", "Down to the hall", "") + worldBtn("kit", "Down to the kitchen", "Below stairs, with Liza");
worldCard(worldFacts("🪜 The stairs of No. 14", "Up and down the house", [], ["\"" + N14_Q.stair + "\""]) + b, { draw: function () { worldCard(null); shkGoIn("n14_drawing"); }, bed: function () { worldCard(null); shkGoIn("n14_bed"); }, dress: function () { worldCard(null); shkGoIn("n14_dress"); },
day: function () { worldCard(null); shkGoIn("n14_day"); }, night: function () { worldCard(null); shkGoIn("n14_night"); }, hall: function () { worldCard(null); shkGoIn("n14_hall"); }, kit: function () { worldCard(null); shkGoIn("n14_kitchen"); } });
},
function (g, x, z, w, d, h, mat, cloth) {
var t = new THREE.Group();
t.position.set(x, 0, z);
g.add(t);
h = h || 0.76;
dlnBox(t, w, 0.05, d, mat, 0, h, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { dlnCyl(t, 0.035, 0.03, h, mat, c[0] * (w / 2 - 0.08), h / 2, c[1] * (d / 2 - 0.08), 6); });
if (cloth)
dlnBox(t, w + 0.2, 0.02, d + 0.2, cloth, 0, h + 0.035, 0);
shkSolidBox(x, z, w, d, 0);
return t;
},
function (g, x, z, ry, col) {
var c = new THREE.Group();
c.position.set(x, 0, z);
c.rotation.y = ry || 0;
g.add(c);
var m = dlnC(col);
dlnBox(c, 2.0, 0.42, 0.85, m, 0, 0.25, 0);
dlnBox(c, 2.0, 0.6, 0.18, m, 0, 0.75, -0.36);
[-1, 1].forEach(function (k) { var a = dlnCyl(c, 0.16, 0.16, 0.85, m, k * 0.95, 0.55, 0, 10); a.rotation.x = Math.PI / 2; });
for (var b = 0; b < 3; b++) {
var bt = new THREE.Mesh(new THREE.SphereGeometry(0.03, 5, 4), dlnC(0x3A2A20));
bt.position.set(-0.6 + b * 0.6, 0.85, -0.26);
c.add(bt);
}
shkSolidBox(x, z, ry ? 0.9 : 2.1, ry ? 2.1 : 0.9, 0);
return c;
},
function (g, x, z, ry, mat, w, h) {
var c = new THREE.Group();
c.position.set(x, 0, z);
c.rotation.y = ry || 0;
g.add(c);
w = w || 1.3;
h = h || 2.2;
dlnBox(c, w, h, 0.6, mat, 0, h / 2, 0);
dlnBox(c, w + 0.1, 0.1, 0.66, mat, 0, h + 0.05, 0);
dlnBox(c, 0.02, h - 0.3, 0.02, dlnC(0x2A1A10), 0, h / 2, 0.31);
[-1, 1].forEach(function (k) { dlnBox(c, w / 2 - 0.12, h - 0.5, 0.02, dlnC(0x5A3A24), k * w / 4, h / 2 + 0.05, 0.31); var kn = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 5), dlnShine(0xC8A048, 0.3, 0.9)); kn.position.set(k * 0.06, h / 2, 0.33); c.add(kn); });
shkSolidBox(x, z, ry ? 0.7 : w + 0.1, ry ? w + 0.1 : 0.7, 0);
return c;
},
function (g, x, y, z, ry, w, h, cols) {
var t = wTex(96, 120, function (c, W, H) {
c.fillStyle = "#C8A050";
c.fillRect(0, 0, W, H);
var gr = c.createLinearGradient(0, 8, 0, H - 8);
gr.addColorStop(0, cols[0]);
gr.addColorStop(1, cols[1]);
c.fillStyle = gr;
c.fillRect(8, 8, W - 16, H - 16);
c.fillStyle = cols[2];
c.beginPath();
c.ellipse(W / 2, H * 0.66, W * 0.3, H * 0.16, 0, 0, 7);
c.fill();
});
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: t }));
m.position.set(x, y, z);
m.rotation.y = ry || 0;
g.add(m);
return m;
},
function (g, x, y, z) {
var brass = dlnShine(0xC8A048, 0.3, 0.9);
dlnCyl(g, 0.02, 0.02, 0.8, brass, x, y - 0.4, z, 5);
dlnCyl(g, 0.3, 0.3, 0.03, brass, x, y - 0.8, z, 12);
for (var a = 0; a < 4; a++) {
var gx = x + Math.cos(a * Math.PI / 2) * 0.3, gz = z + Math.sin(a * Math.PI / 2) * 0.3;
var gl = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), dlnGlow(0xFFEAC0));
gl.position.set(gx, y - 0.7, gz);
g.add(gl);
}
},
function (g, cx, cz, R, Rm) {
var h = 3.8, wood = dlnS("oak", 0xC8A07A), dark = dlnS("oak", 0x6A4A2A), brass = dlnShine(0xC8A048, 0.3, 0.9);
dlnShell(g, cx, cz, Rm, { floor: dlnS("n14tiles", 0xFFFFFF), wall: dlnS("n14stripe", 0xFFFFFF), low: dlnS("oak", 0x8A5A34), lowH: 1.0, h: h, ceil: dlnC(0xF2EEE4), outName: "The front door, out to the square", out: function () { n14Go("door", "🏠 <b>Out on the square.</b> The front door of No. 14 shuts behind you with a brass click."); } });
var fan = new THREE.Mesh(new THREE.CircleGeometry(0.9, 16, 0, Math.PI), dlnGlow(0xF0E2B8));
fan.position.set(cx, 3.05, cz + Rm.hd - 0.12);
fan.rotation.y = Math.PI;
g.add(fan);
for (var s = 0; s < 14; s++) {
var sy = 0.18 + s * 0.19, sz = cz + 2.6 - s * 0.28;
dlnBox(g, 1.2, 0.06, 0.3, wood, cx - Rm.hw + 0.6, sy, sz);
dlnBox(g, 1.2, sy, 0.28, dlnC(0xF2EEE4), cx - Rm.hw + 0.6, sy / 2, sz);
if (!DLN.lite || s % 2 === 0)
dlnCyl(g, 0.02, 0.02, 0.85, dlnC(0xF6F4EE), cx - Rm.hw + 1.18, sy + 0.45, sz, 5);
}
var rail = dlnBox(g, 0.07, 0.07, 4.2, dark, cx - Rm.hw + 1.18, 2.1, cz + 0.75);
rail.rotation.x = 0.6;
dlnCyl(g, 0.07, 0.08, 1.1, dark, cx - Rm.hw + 1.18, 0.55, cz + 2.75, 8);
var nw = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), dark);
nw.position.set(cx - Rm.hw + 1.18, 1.15, cz + 2.75);
g.add(nw);
dlnBox(g, 1.2, 0.12, 1.8, wood, cx - Rm.hw + 0.6, 2.9, cz - 1.9);
shkSolidBox(cx - Rm.hw + 0.6, cz + 0.6, 1.3, 4.4, 0);
var hs = new THREE.Group();
hs.position.set(cx + Rm.hw - 0.45, 0, cz + 3.2);
g.add(hs);
dlnCyl(hs, 0.05, 0.06, 1.9, dark, 0, 0.95, 0, 8);
[0, 1, 2, 3].forEach(function (a) { var p = dlnBox(hs, 0.32, 0.04, 0.04, dark, Math.cos(a * Math.PI / 2) * 0.14, 1.78, Math.sin(a * Math.PI / 2) * 0.14); p.rotation.y = a * Math.PI / 2; });
var top = dlnCyl(hs, 0.1, 0.1, 0.18, dlnShine(0x0E0E10, 0.3, 0.3), 0.12, 1.92, 0, 12);
dlnCyl(hs, 0.16, 0.16, 0.012, dlnShine(0x0E0E10, 0.3, 0.3), 0.12, 1.83, 0, 14);
var um = dlnCyl(hs, 0.04, 0.02, 0.85, dlnC(0x141418), 0.0, 0.45, 0.18, 6);
um.rotation.x = 0.12;
dlnBox(hs, 0.4, 0.9, 0.12, dlnC(0x2A2A34), -0.12, 1.3, -0.12);
dlnBox(hs, 0.5, 0.06, 0.3, dlnC(0x2A1A10), 0, 0.04, 0.12);
shkSolid({ x: cx + Rm.hw - 0.45, z: cz + 3.2, r: 0.35 });
n14Table(g, cx + Rm.hw - 0.35, cz - 0.6, 0.5, 1.2, 0.82, dark);
var tray = dlnCyl(g, 0.16, 0.16, 0.02, dlnShine(0xE0E0E4, 0.2, 0.95), cx + Rm.hw - 0.35, 0.86, cz - 0.8, 14);
for (var c = 0; c < 3; c++)
dlnBox(g, 0.08, 0.005, 0.12, dlnC(0xF8F6F0), cx + Rm.hw - 0.37 + c * 0.01, 0.875 + c * 0.005, cz - 0.8 + c * 0.02);
dlnCyl(g, 0.1, 0.07, 0.14, dlnShine(0x3A6A8A, 0.2, 0.1), cx + Rm.hw - 0.35, 0.9, cz - 0.35, 10);
for (var f = 0; f < 6; f++) {
var fl = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 5), dlnC([0xF4F0F0, 0xE8A0B0, 0xF0D060][f % 3]));
fl.position.set(cx + Rm.hw - 0.35 + Math.cos(f) * 0.08, 1.02, cz - 0.35 + Math.sin(f) * 0.08);
g.add(fl);
}
var mir = dlnBox(g, 0.04, 1.0, 0.8, dlnShine(0xC8D4DC, 0.05, 0.9), cx + Rm.hw - 0.03, 1.6, cz - 0.6);
dlnBox(g, 0.05, 1.1, 0.9, dlnS("oak", 0xB88A3A), cx + Rm.hw - 0.01, 1.6, cz - 0.6);
var bar = dlnCyl(g, 0.12, 0.12, 0.03, dlnShine(0xC8A048, 0.3, 0.85), cx + Rm.hw - 0.04, 1.6, cz + 1.6, 16);
bar.rotation.z = Math.PI / 2;
dlnBox(g, 0.03, 0.9, 0.16, dark, cx + Rm.hw - 0.03, 1.25, cz + 1.6);
var ck = new THREE.Group();
ck.position.set(cx + Rm.hw - 0.3, 0, cz - 3.4);
g.add(ck);
dlnBox(ck, 0.4, 2.1, 0.4, dark, 0, 1.05, 0);
var face = dlnCyl(ck, 0.15, 0.15, 0.02, dlnC(0xF4F0E0), -0.21, 1.75, 0, 16);
face.rotation.z = Math.PI / 2;
shkSolidBox(cx + Rm.hw - 0.3, cz - 3.4, 0.45, 0.45, 0);
n14Gasolier(g, cx, h, cz + 1);
n14Gasolier(g, cx, h, cz - 3.6);
dlnBox(g, 0.1, 2.4, 1.1, dlnS("oak", 0x7A4A2A), cx + Rm.hw - 0.04, 1.2, cz + 5.2);
dlnBox(g, 0.1, 2.4, 1.1, dlnC(0x2A4A2A), cx - Rm.hw + 0.04, 1.2, cz - 5.4);
shkSpot(cx + Rm.hw - 0.9, cz + 5.2, 1.6, "The dining-room door", "go in", n14Rm("n14_dining"));
shkSpot(cx - Rm.hw + 0.9, cz - 5.4, 1.6, "The green baize door", "go down to the kitchen", n14Rm("n14_kitchen"));
shkSpot(cx - Rm.hw + 1.5, cz + 3.3, 1.8, "The stairs", "go up", function () { n14Upstairs(); });
shkSpot(cx + Rm.hw - 0.9, cz + 3.2, 1.6, "Mr Darling's hat", "look", function () { n14Tale("🎩 Mr Darling's hat", ["hat", "won"], []); });
shkSpot(cx + Rm.hw - 0.9, cz - 0.8, 1.6, "The silver card tray", "look", function () { n14Tale("📨 Cards on the hall table", ["knock", "accepted"], ["Callers leave their cards on the silver tray. Among them is an invitation from No. 27, across the square, to dine on Friday."]); });
Rm.hello = "<b>The hall of No. 14.</b> Black and white tiles, the stair going up on your left, Mr Darling's silk hat on its stand. The dining-room is on the right; the green baize door at the back goes down to the kitchen.";
},
function (g, cx, cz, R, Rm) {
var h = 3.6, maho = dlnS("oak", 0x7A3A22), cloth = dlnC(0xFAF8F2), silver = dlnShine(0xE0E0E4, 0.2, 0.95);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x9A6A44), wall: dlnS("damask", 0xFFFFFF), low: dlnS("oak", 0x5A2E1A), lowH: 1.0, h: h, ceil: dlnC(0xF4F0E6), outName: "Back to the hall", out: n14Rm("n14_hall") });
dlnPlane(g, 5.4, 4, dlnS("n14turkey", 0xFFFFFF), cx, 0.02, cz - 0.4);
n14Table(g, cx, cz - 0.4, 1.2, 2.6, 0.76, maho, cloth);
[[-0.85, -1.0, Math.PI / 2], [-0.85, 0.2, Math.PI / 2], [0.85, -1.0, -Math.PI / 2], [0.85, 0.2, -Math.PI / 2], [0, -2.1, 0], [0, 1.3, Math.PI]].forEach(function (c) { n14Chair(g, cx + c[0], cz + c[1], c[2], maho, dlnC(0x6A1A1E)); });
[-1.2, 0.4].forEach(function (z) { dlnCyl(g, 0.05, 0.07, 0.32, silver, cx, 0.95, cz + z, 10); var fl = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 4), dlnGlow(0xFFE2A0)); fl.position.set(cx, 1.14, cz + z); g.add(fl); });
for (var p = 0; p < 4; p++) {
var pl = dlnCyl(g, 0.13, 0.13, 0.015, dlnC(0xF6F6F2), cx + (p < 2 ? -0.35 : 0.35), 0.8, cz - 1.0 + (p % 2) * 1.2, 14);
}
var sb = new THREE.Group();
sb.position.set(cx + Rm.hw - 0.35, 0, cz - 0.4);
g.add(sb);
dlnBox(sb, 0.6, 0.95, 2.2, maho, 0, 0.48, 0);
dlnBox(sb, 0.66, 0.05, 2.3, maho, 0, 0.98, 0);
dlnBox(sb, 0.04, 0.8, 2.2, dlnShine(0xC8D4DC, 0.05, 0.9), 0.28, 1.5, 0);
[-0.5, 0, 0.5].forEach(function (z) { dlnCyl(sb, 0.06, 0.08, 0.26, dlnShine(0xD8E0E8, 0.05, 0.4), -0.05, 1.14, z, 10); });
shkSolidBox(cx + Rm.hw - 0.35, cz - 0.4, 0.7, 2.3, 0);
dlnFireplace(g, cx - Rm.hw + 0.3, cz - 0.4, Math.PI / 2);
shkSolidBox(cx - Rm.hw + 0.3, cz - 0.4, 0.6, 2.2, 0);
dlnPortrait(g, cx - Rm.hw + 0.05, 2.4, cz - 0.4, Math.PI / 2, "A gentleman of the City", "Mr Darling's father, 1870", "#1E1E22");
[-2.2, 0, 2.2].forEach(function (x) { wsmWin(g, cx + x, 1.7, cz - Rm.hd + 0.06, 0, 1.3, 2.1); dlnBox(g, 0.45, 2.6, 0.08, dlnC(0x6A1A1E), cx + x - 0.95, 1.8, cz - Rm.hd + 0.12); dlnBox(g, 0.45, 2.6, 0.08, dlnC(0x6A1A1E), cx + x + 0.95, 1.8, cz - Rm.hd + 0.12); });
n14Gasolier(g, cx, h, cz - 0.4);
var bk = dlnBox(g, 0.42, 0.03, 0.3, dlnC(0xF4EEDC), cx, 0.81, cz + 0.9);
dlnBox(g, 0.02, 0.04, 0.3, dlnC(0x6A2A1A), cx, 0.82, cz + 0.9);
dlnCyl(g, 0.006, 0.006, 0.16, dlnC(0x2A4A2A), cx + 0.12, 0.83, cz + 0.85, 4).rotation.z = Math.PI / 2;
shkSpot(cx, cz + 1.6, 1.6, "Mr Darling's account book", "read the sums", function () { n14Tale("🧮 Mr Darling's sums", ["edge", "sums", "mumps"], ["Whether the Darlings could keep each baby was decided here, with a pencil and a piece of paper. Wendy just got through, \"with mumps reduced to twelve six, and the two kinds of measles treated as one.\""]); });
shkSpot(cx - Rm.hw + 1.2, cz - 0.4, 1.6, "The fireplace", "warm your hands", function () { n14Tale("🔥 The dining-room fire", ["stocks", "position"], []); });
Rm.hello = "<b>The dining-room.</b> Red walls, mahogany, the table laid for supper. Mr Darling's account book lies open at the end, with the pencil.";
},
function (g, cx, cz, R, Rm) {
var h = 3.8, wood = dlnS("oak", 0x8A5A34), gilt = dlnShine(0xC8A048, 0.3, 0.85);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xB08A60), wall: dlnS("n14rose", 0xFFFFFF), low: dlnC(0xF2EEE4), lowH: 0.9, h: h, ceil: dlnC(0xF8F4EC), outName: "The stairs", out: function () { n14Upstairs(); } });
dlnPlane(g, 6.4, 5, dlnS("n14turkey", 0xE8D8D0), cx, 0.02, cz - 0.2);
n14Sofa(g, cx - 2.6, cz - 0.4, Math.PI / 2, 0x8A5A6A);
n14Arm(g, cx + 0.4, cz - 0.4, -Math.PI / 2, 0x6A8A7A);
n14Arm(g, cx - 0.4, cz - 2.8, 0.2, 0x6A8A7A);
n14Table(g, cx - 1.2, cz - 0.4, 0.6, 1.0, 0.5, wood);
var tea = dlnCyl(g, 0.08, 0.1, 0.16, dlnShine(0xF4F2F0, 0.2, 0.2), cx - 1.2, 0.6, cz - 0.6, 12);
for (var c = 0; c < 3; c++)
dlnCyl(g, 0.04, 0.03, 0.05, dlnShine(0xF4F2F0, 0.2, 0.2), cx - 1.1, 0.55, cz - 0.3 + c * 0.14, 10);
for (var s = 0; s < 4; s++) {
var sc = dlnBox(g, 0.62, 1.8, 0.04, dlnS("damask", 0xE8D0B0), cx + Rm.hw - 0.6 - s * 0.55, 0.95, cz - Rm.hd + 0.5 + (s % 2) * 0.2);
sc.rotation.y = (s % 2 ? 0.5 : -0.5);
}
var dk = new THREE.Group();
dk.position.set(cx + Rm.hw - 0.45, 0, cz + 1.6);
dk.rotation.y = -Math.PI / 2;
g.add(dk);
dlnBox(dk, 1.1, 0.76, 0.55, wood, 0, 0.38, 0);
dlnBox(dk, 1.1, 0.5, 0.3, wood, 0, 1.0, -0.14);
for (var p = 0; p < 5; p++)
dlnBox(dk, 0.18, 0.12, 0.02, dlnC(0xF2EEE0), -0.4 + p * 0.2, 0.9, -0.0);
dlnBox(dk, 0.4, 0.04, 0.28, dlnC(0x3A5A3A), 0.1, 0.79, 0.08);
n14Chair(g, cx + Rm.hw - 1.1, cz + 1.6, Math.PI / 2, wood, dlnC(0x6A8A7A));
shkSolidBox(cx + Rm.hw - 0.45, cz + 1.6, 0.6, 1.15, 0);
for (var b = 0; b < 4; b++) {
var bx = dlnBox(g, 0.3 - b * 0.06, 0.12 - b * 0.02, 0.22 - b * 0.04, dlnShine([0x8A1A1A, 0x1A1A1A, 0x8A6A1A, 0x2A4A2A][b], 0.3, 0.2), cx - 2.2, 0.6 + b * 0.1, cz + 2.4);
bx.rotation.y = b * 0.3;
}
n14Table(g, cx - 2.2, cz + 2.4, 0.5, 0.5, 0.52, wood);
dlnFireplace(g, cx - Rm.hw + 0.3, cz + 1.0, Math.PI / 2);
shkSolidBox(cx - Rm.hw + 0.3, cz + 1.0, 0.6, 2.2, 0);
var mr = dlnBox(g, 0.04, 1.3, 1.4, dlnShine(0xC8D4DC, 0.05, 0.9), cx - Rm.hw + 0.03, 2.5, cz + 1.0);
dlnBox(g, 0.05, 1.45, 1.55, gilt, cx - Rm.hw + 0.01, 2.5, cz + 1.0);
[-2.6, 0, 2.6].forEach(function (x) { wsmWin(g, cx + x, 1.9, cz - Rm.hd + 0.06, 0, 1.3, 2.4); dlnBox(g, 0.4, 2.9, 0.08, dlnC(0x7A8A6A), cx + x - 0.95, 2.0, cz - Rm.hd + 0.12); dlnBox(g, 0.4, 2.9, 0.08, dlnC(0x7A8A6A), cx + x + 0.95, 2.0, cz - Rm.hd + 0.12); });
[[cx + Rm.hw - 0.6, cz - 1.4], [cx - Rm.hw + 0.7, cz - Rm.hd + 0.7]].forEach(function (p) { dlnCyl(g, 0.25, 0.2, 0.4, dlnShine(0x3A6A8A, 0.3, 0.1), p[0], 0.2, p[1], 12); for (var l = 0; l < 7; l++) {
var lf = dlnBox(g, 0.08, 0.02, 0.9, dlnC(0x3A6A2A), p[0], 0.9, p[1]);
lf.rotation.y = l * 0.9;
lf.rotation.x = 0.6;
} shkSolid({ x: p[0], z: p[1], r: 0.35 }); });
n14Pic(g, cx + 1.2, 2.3, cz + Rm.hd - 0.05, Math.PI, 0.7, 0.9, ["#B8C8D8", "#E8DCC0", "#5A7A4A"]);
n14Pic(g, cx + Rm.hw - 0.05, 2.3, cz - 1.6, -Math.PI / 2, 0.6, 0.75, ["#E8D0B8", "#C8A888", "#8A5A4A"]);
n14Gasolier(g, cx, h, cz - 0.2);
shkSpot(cx + Rm.hw - 1.2, cz + 1.6, 1.6, "Mrs Darling's writing-desk", "look at the house books", function () { n14Tale("📒 The house books", ["books"], []); });
shkSpot(cx + Rm.hw - 1.2, cz - Rm.hd + 1.2, 1.8, "The screens", "look", function () { n14Tale("🪟 The screens of first Thursdays", ["screens"], ["\"First Thursdays\" are the afternoons when Mrs Darling is at home to callers; the screens are kept here for them."]); });
shkSpot(cx - 1.6, cz + 2.4, 1.6, "The nest of Eastern boxes", "open them, one inside the other", function () { n14Tale("📦 The tiny boxes", ["boxes"], []); });
shkSpot(cx, cz - 0.2, 2.4, "The middle of the rug", "dance", function () { n14Tale("💃 The romps", ["dances"], []); setStatus("💃 You pirouette across the drawing-room rug, as wildly as Mrs Darling."); });
Rm.hello = "<b>Mrs Darling's drawing-room</b>, on the first floor, over the square: rose-papered walls, the folding screens, her writing-desk, and the fire.";
},
function (g, cx, cz, R, Rm) {
var h = 3.4, brass = dlnShine(0xC8A048, 0.3, 0.85), wood = dlnS("oak", 0x7A4A2A);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xA87A50), wall: dlnS("n14trellis", 0xFFFFFF), low: dlnC(0xF2EEE4), lowH: 0.9, h: h, ceil: dlnC(0xF8F4EC), outName: "The stairs", out: function () { n14Upstairs(); } });
dlnPlane(g, 4, 3, dlnS("n14turkey", 0xD8C8D8), cx, 0.02, cz);
var bd = new THREE.Group();
bd.position.set(cx, 0, cz - 2.4);
g.add(bd);
dlnBox(bd, 1.6, 0.4, 2.0, dlnC(0xF8F6F0), 0, 0.45, 0);
dlnBox(bd, 1.66, 0.08, 1.6, dlnC(0xE8E4F0), 0, 0.68, 0.2);
[-0.45, 0.45].forEach(function (x) { dlnBox(bd, 0.6, 0.15, 0.35, dlnC(0xFCFCFA), x, 0.75, -0.75); });
[[-0.8, -1.0, 1.4], [0.8, -1.0, 1.4], [-0.8, 1.0, 1.0], [0.8, 1.0, 1.0]].forEach(function (p) { dlnCyl(bd, 0.03, 0.03, p[2], brass, p[0], p[2] / 2, p[1], 6); var k = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), brass); k.position.set(p[0], p[2] + 0.03, p[1]); bd.add(k); });
for (var r = 0; r < 3; r++) {
dlnCyl(bd, 0.015, 0.015, 1.6, brass, 0, 0.7 + r * 0.22, -1.0, 5).rotation.z = Math.PI / 2;
dlnCyl(bd, 0.015, 0.015, 1.6, brass, 0, 0.5 + r * 0.2, 1.0, 5).rotation.z = Math.PI / 2;
}
shkSolidBox(cx, cz - 2.4, 1.7, 2.1, 0);
var dt = new THREE.Group();
dt.position.set(cx + Rm.hw - 0.35, 0, cz + 0.8);
dt.rotation.y = -Math.PI / 2;
g.add(dt);
dlnBox(dt, 1.1, 0.72, 0.5, wood, 0, 0.36, 0);
var gl = dlnBox(dt, 0.6, 0.8, 0.03, dlnShine(0xC8D4DC, 0.05, 0.9), 0, 1.2, -0.15);
dlnBox(dt, 0.68, 0.88, 0.02, wood, 0, 1.2, -0.17);
for (var b = 0; b < 4; b++)
dlnCyl(dt, 0.03, 0.03, 0.08, dlnShine([0xD8E0F0, 0xE8C8D8, 0xC8E8D8, 0xF0E0B0][b], 0.1, 0.3), -0.4 + b * 0.14, 0.76, 0.05, 8);
shkSolidBox(cx + Rm.hw - 0.35, cz + 0.8, 0.55, 1.15, 0);
n14Ward(g, cx - Rm.hw + 0.35, cz + 0.6, Math.PI / 2, wood, 1.5, 2.3);
var ws = new THREE.Group();
ws.position.set(cx - Rm.hw + 0.35, 0, cz - 1.2);
ws.rotation.y = Math.PI / 2;
g.add(ws);
dlnBox(ws, 0.9, 0.75, 0.45, wood, 0, 0.38, 0);
dlnBox(ws, 0.95, 0.04, 0.5, dlnS("marble", 0xFFFFFF), 0, 0.77, 0);
dlnCyl(ws, 0.2, 0.12, 0.1, dlnC(0xF4F2F0), 0, 0.84, 0, 14);
dlnCyl(ws, 0.08, 0.1, 0.28, dlnC(0xF4F2F0), 0, 0.98, 0, 12);
shkSolidBox(cx - Rm.hw + 0.35, cz - 1.2, 0.5, 0.95, 0);
n14Chair(g, cx + 1.4, cz - 2.6, -0.6, wood, dlnC(0x8A6A9A));
wsmWin(g, cx, 1.7, cz - Rm.hd + 0.06, 0, 1.3, 2.1);
[-1, 1].forEach(function (k) { dlnBox(g, 0.45, 2.5, 0.08, dlnC(0x8A9AB8), cx + k * 0.95, 1.7, cz - Rm.hd + 0.12); });
n14Pic(g, cx - 1.6, 2.2, cz - Rm.hd + 0.05, 0, 0.5, 0.62, ["#D8E0F0", "#F0E8D8", "#C88A9A"]);
dlnPendant(g, cx, h, cz, 0.8);
shkSpot(cx + 1.0, cz - 1.3, 1.6, "The edge of the bed", "sit, and do the sums", function () { n14Tale("🛏️ The edge of Mrs Darling's bed", ["edge", "sums"], []); });
shkSpot(cx + Rm.hw - 1.1, cz + 0.8, 1.6, "Mrs Darling's dressing-table", "look", function () { n14Tale("💍 The necklace and the bracelet", ["Then Mrs. Darling had come in, wearing her white evening-gown. She had dressed early because Wendy so loved to see her in her evening-gown, with the necklace George had given her. She was wearing Wendy's bracelet on her arm; she had asked for the loan of it."], []); });
Rm.hello = "<b>Mr and Mrs Darling's bedroom</b>: the brass bed, the dressing-table with her glass, the wardrobe, the wash-stand.";
},
function (g, cx, cz, R, Rm) {
var h = 3.4, wood = dlnS("oak", 0x6A3A22);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x9A6A44), wall: dlnS("n14stripe", 0xD8D0C0), low: dlnS("oak", 0x6A3A22), lowH: 0.9, h: h, ceil: dlnC(0xF4F0E6), outName: "The stairs", out: function () { n14Upstairs(); } });
var ws = new THREE.Group();
ws.position.set(cx - Rm.hw + 0.35, 0, cz - 0.8);
ws.rotation.y = Math.PI / 2;
g.add(ws);
dlnBox(ws, 0.9, 0.75, 0.45, wood, 0, 0.38, 0);
dlnBox(ws, 0.95, 0.04, 0.5, dlnS("marble", 0xFFFFFF), 0, 0.77, 0);
dlnCyl(ws, 0.2, 0.12, 0.1, dlnC(0xF4F2F0), -0.15, 0.84, 0, 14);
var mb = dlnCyl(ws, 0.04, 0.05, 0.18, dlnShine(0x3A6A3A, 0.1, 0.3), 0.28, 0.88, 0.05, 10);
dlnCyl(ws, 0.015, 0.015, 0.04, dlnC(0x6A4A2A), 0.28, 0.99, 0.05, 6);
var shav = dlnBox(ws, 0.4, 0.5, 0.03, dlnShine(0xC8D4DC, 0.05, 0.9), 0, 1.3, -0.2);
shkSolidBox(cx - Rm.hw + 0.35, cz - 0.8, 0.5, 0.95, 0);
n14Ward(g, cx + Rm.hw - 0.35, cz - 1.4, -Math.PI / 2, wood, 1.2, 2.3);
var ch = new THREE.Group();
ch.position.set(cx, 0, cz - Rm.hd + 0.35);
g.add(ch);
dlnBox(ch, 1.2, 0.95, 0.5, wood, 0, 0.48, 0);
for (var d = 0; d < 3; d++)
dlnBox(ch, 1.1, 0.24, 0.02, dlnS("oak", 0x7A4A2A), 0, 0.2 + d * 0.28, 0.26);
dlnCyl(ch, 0.1, 0.1, 0.08, dlnC(0x6A4A2A), -0.35, 1.0, 0, 12);
var tie = dlnBox(ch, 0.34, 0.02, 0.07, dlnC(0xFAFAF8), 0.15, 0.97, 0.02);
tie.rotation.y = 0.7;
var tie2 = dlnBox(ch, 0.22, 0.02, 0.06, dlnC(0xFAFAF8), 0.3, 0.975, -0.05);
tie2.rotation.y = -0.5;
shkSolidBox(cx, cz - Rm.hd + 0.35, 1.25, 0.55, 0);
var vs = new THREE.Group();
vs.position.set(cx + Rm.hw - 0.5, 0, cz + 1.0);
g.add(vs);
dlnCyl(vs, 0.025, 0.03, 1.2, wood, 0, 0.6, 0, 6);
dlnBox(vs, 0.45, 0.04, 0.05, wood, 0, 1.15, 0);
dlnBox(vs, 0.36, 0.9, 0.03, dlnC(0x14141A), 0, 0.65, 0.04);
dlnBox(vs, 0.02, 0.85, 0.032, dlnC(0x0A0A0C), 0.08, 0.67, 0.045);
[-0.1, 0.12].forEach(function (x) { dlnBox(g, 0.1, 0.18, 0.28, dlnShine(0x0A0A0A, 0.3, 0.2), cx - 0.6 + x, 0.09, cz + Rm.hd - 0.6); });
wsmWin(g, cx + 0.6, 1.7, cz - Rm.hd + 0.06, 0, 1.0, 2.0);
dlnPendant(g, cx, h, cz, 0.7);
shkSpot(cx - Rm.hw + 1.0, cz - 0.8, 1.4, "The wash-stand", "look at the bottle", function () { n14Tale("💊 The medicine on the wash-stand", ["medicine"], ["It is \"that nasty, sticky, sweet kind,\" and the colour of milk."]); });
shkSpot(cx, cz - Rm.hd + 1.0, 1.4, "The white tie", "try to tie it", function () { n14Tale("🎀 The tie", ["tie", "bedpost"], []); setStatus("🎀 You try the tie round your neck. It will not tie."); });
shkSpot(cx + Rm.hw - 1.0, cz + 1.0, 1.3, "The new trousers", "look", function () { n14Tale("👖 The trousers with braid", ["braid"], []); });
Rm.hello = "<b>Mr Darling's dressing-room.</b> The wash-stand, the tall wardrobe, and on the chest of drawers a white tie that will not tie.";
},
function (g, cx, cz, R, Rm) {
var h = 3.4, wood = dlnS("oak", 0xC89A6A), white = dlnC(0xF4F0E8);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xC8A070), wall: dlnS("nurserypaper", 0xFFFFFF), low: white, lowH: 1.0, h: h, ceil: dlnC(0xFAF6EE), outName: "The stairs", out: function () { n14Upstairs(); } });
dlnPlane(g, 4.6, 3.6, dlnS("n14turkey", 0xC8D8E8), cx, 0.02, cz);
var pn = new THREE.Group();
pn.position.set(cx - Rm.hw + 0.35, 0, cz - 1.6);
pn.rotation.y = Math.PI / 2;
g.add(pn);
var wal = dlnS("oak", 0x5A3420);
dlnBox(pn, 1.45, 1.25, 0.55, wal, 0, 0.63, 0);
dlnBox(pn, 1.3, 0.05, 0.25, dlnC(0xF6F4EE), 0, 0.76, 0.36);
for (var k = 0; k < 12; k++)
dlnBox(pn, 0.03, 0.02, 0.12, dlnC(0x141414), -0.55 + k * 0.1, 0.79, 0.32);
dlnBox(pn, 1.45, 0.06, 0.62, wal, 0, 1.28, 0);
[-0.6, 0.6].forEach(function (x) { dlnCyl(pn, 0.02, 0.03, 0.12, dlnShine(0xC8A048, 0.3, 0.9), x, 1.1, 0.3, 6); });
dlnBox(pn, 0.5, 0.06, 0.3, wal, 0, 0.45, 0.75);
shkSolidBox(cx - Rm.hw + 0.35, cz - 1.6, 0.65, 1.5, 0);
var bt = new THREE.Group();
bt.position.set(cx + Rm.hw - 0.7, 0, cz - Rm.hd + 0.9);
g.add(bt);
var tin = dlnShine(0xE8E4DC, 0.3, 0.4);
var tub = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.45, 0.42, 18, 1, true), tin);
tub.scale.set(1.5, 1, 1);
tub.position.y = 0.21;
bt.add(tub);
var water = dlnCyl(bt, 0.5, 0.5, 0.01, dlnShine(0x9AB8C8, 0.05, 0.2), 0, 0.3, 0, 16);
water.scale.set(1.5, 1, 1);
var horse = new THREE.Group();
horse.position.set(-0.9, 0, 0.5);
bt.add(horse);
[-0.3, 0.3].forEach(function (x) { dlnBox(horse, 0.04, 1.1, 0.04, wood, x, 0.55, 0); });
dlnBox(horse, 0.64, 0.04, 0.04, wood, 0, 1.0, 0);
dlnBox(horse, 0.6, 0.5, 0.02, dlnC(0xF8F6F0), 0, 0.75, 0.03);
dlnCyl(bt, 0.12, 0.16, 0.45, dlnC(0xF4F2F0), 0.75, 0.22, 0.4, 12);
shkSolidBox(cx + Rm.hw - 0.7, cz - Rm.hd + 0.9, 1.6, 1.1, 0);
dlnFireplace(g, cx, cz - Rm.hd + 0.3, 0);
var fg = dlnBox(g, 1.4, 0.8, 0.03, dlnShine(0x2A2A2A, 0.6, 0.5), cx, 0.4, cz - Rm.hd + 1.0);
fg.material = new THREE.MeshLambertMaterial({ color: 0x3A3A3A, transparent: true, opacity: 0.5 });
shkSolidBox(cx, cz - Rm.hd + 0.55, 1.6, 1.0, 0);
dlnRockingHorse(g, cx + 1.6, cz + 1.8, -0.6);
shkSolid({ x: cx + 1.6, z: cz + 1.8, r: 0.6 });
dlnDollsHouse(g, cx + Rm.hw - 0.45, cz + 1.2, -Math.PI / 2);
shkSolidBox(cx + Rm.hw - 0.45, cz + 1.2, 0.7, 1.1, 0);
var ark = new THREE.Group();
ark.position.set(cx - 1.6, 0.02, cz + 2.6);
g.add(ark);
dlnBox(ark, 0.6, 0.16, 0.24, dlnC(0x8A5A2A), 0, 0.08, 0);
var rf = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.18, 0.16, 4), dlnC(0xC83A2A));
rf.position.y = 0.26;
rf.rotation.y = Math.PI / 4;
rf.scale.set(1.6, 1, 0.7);
ark.add(rf);
[0xE8C040, 0x3A6AB8, 0xC83A2A, 0x3A9A4A, 0xF0F0F0].forEach(function (c, i) { var b = dlnBox(g, 0.1, 0.1, 0.1, dlnC(c), cx - 0.6 + i * 0.13, 0.05 + (i === 4 ? 0.1 : 0), cz + 2.3 + (i % 2) * 0.1); b.rotation.y = i * 0.4; });
n14Ward(g, cx + Rm.hw - 0.35, cz - 0.6, -Math.PI / 2, dlnS("oak", 0xD8C8A8), 1.2, 1.8);
var peg = dlnBox(g, 0.6, 0.06, 0.06, wood, cx - Rm.hw + 0.04, 1.7, cz + 1.6);
var jt = dlnCyl(g, 0.09, 0.09, 0.16, dlnShine(0x0E0E10, 0.3, 0.3), cx - Rm.hw + 0.15, 1.78, cz + 1.7, 10);
dlnCyl(g, 0.14, 0.14, 0.01, dlnShine(0x0E0E10, 0.3, 0.3), cx - Rm.hw + 0.15, 1.7, cz + 1.7, 12);
n14Table(g, cx - 0.6, cz - 0.5, 1.0, 0.8, 0.58, wood, dlnC(0xD8E4F0));
[[-1.05, -0.5, Math.PI / 2], [0.05, -0.5, -Math.PI / 2], [-0.6, -1.1, 0]].forEach(function (c) { var ch = n14Chair(g, cx + c[0], cz + c[1], c[2], wood); ch.scale.setScalar(0.75); });
for (var m = 0; m < 3; m++) {
dlnBox(g, 0.12, 0.012, 0.012, dlnC(0x2A2A2A), cx + Rm.hw - 0.06, 0.9 + m * 0.18, cz + Rm.hd - 1.4);
}
wsmWin(g, cx + 1.4, 1.7, cz - Rm.hd + 0.06, 0, 1.2, 2.0);
for (var b = 0; b < 4; b++)
dlnCyl(g, 0.012, 0.012, 1.2, dlnC(0xF4F0E8), cx + 1.4 - 0.45 + b * 0.3, 1.4, cz - Rm.hd + 0.14, 4);
n14Pic(g, cx - 2.0, 2.2, cz - Rm.hd + 0.05, 0, 0.5, 0.6, ["#9AB8D8", "#D8C8A0", "#3A5A2A"]);
dlnPendant(g, cx, h, cz, 0.7);
dlnBox(g, 0.1, 2.2, 0.95, white, cx - Rm.hw + 0.04, 1.1, cz + 2.8);
shkSpot(cx - Rm.hw + 0.9, cz + 2.8, 1.4, "The door to the night nursery", "go through", n14Rm("n14_night"));
shkSpot(cx - Rm.hw + 1.2, cz - 1.6, 1.6, "The nursery piano", "play it", function () { n14TuneSet("piano", 60); n14Tale("🎹 The nursery piano", ["piano", "played"], ["You play, and the tune goes all through the house."]); });
shkSpot(cx + Rm.hw - 1.5, cz - Rm.hd + 1.6, 1.6, "Michael's bath", "look", function () { n14Tale("🛁 Michael's bath", ["bath", "wont", "thorough"], []); });
shkSpot(cx - 0.6, cz + 0.3, 1.6, "The nursery table and its cloth", "play at the Neverland", function () { n14Tale("🏝️ The Neverland, by day", ["chairs", "playing"], []); });
shkSpot(cx + Rm.hw - 1.2, cz + Rm.hd - 1.4, 1.4, "The marks on the door-post", "look", function () { n14Tale("📏 How tall", ["All children, except one, grow up."], ["Three pencil marks on the door-post, with dates: Wendy's, John's and Michael's heights, measured on their birthdays."]); });
Rm.hello = "<b>The day nursery</b>, at the top of the house: the nursery piano, the rocking horse, the dolls' house, and Michael's bath by the fire. The night nursery is through the door on your left.";
},
function (g, cx, cz, R, Rm) {
var sub = new THREE.Group();
sub.position.set(cx, 0, cz);
g.add(sub);
var Q = { k: "nursery", R: { w: 10, d: 8, h: 3.4, name: "the night nursery", night: 1 }, g: sub, solids: [], doors: [], lights: [] };
if (typeof nvbNursery === "function") {
try {
nvbNursery(Q);
}
catch (e) {
if (window.console)
console.warn("[no. 14] nursery", e);
}
}
Q.solids.forEach(function (s) { if (s.r)
shkSolid({ x: cx + s.x, z: cz + s.z, r: s.r });
else
shkSolidBox(cx + s.x, cz + s.z, s.hw * 2, s.hd * 2, 0); });
N14.nurseryQ = Q;
var N = typeof NVB_N !== "undefined" ? NVB_N : { window: [-2.2, -3.7], kennel: [3.8, 2.2], drawers: [4.4, -1.2], chair: [0.9, -2.5], door: [4.8, 3.6], beds: [[-3.2, 1.8], [-1.2, 2.8], [1.0, 2.8]] };
Rm.entry = { x: 2.5, z: cz + 3.3, yaw: Math.PI / 2 };
shkSpot(cx + N.door[0] - 0.5, cz + N.door[1], 1.4, "The door to the landing", "go out", function () { n14Upstairs(); });
shkSpot(cx + N.window[0], cz + N.window[1] + 1.0, 1.8, "The nursery window", "look out", function () { n14Window(); });
shkSpot(cx + N.kennel[0] - 0.9, cz + N.kennel[1], 1.5, "Nana's kennel", "look", function () { n14Tale("🐕 The kennel in the nursery", ["kennel", "milk"], ["\"The kennel was in the nursery\": Nana sleeps beside her charges."]); });
shkSpot(cx + N.drawers[0] - 0.8, cz + N.drawers[1], 1.4, "The chest of drawers", "open the top drawer", function () { n14Tale("🗄️ The top drawer", ["drawer"], ["Nothing in it now but the children's things, neatly folded."]); });
shkSpot(cx + N.chair[0], cz + N.chair[1] + 0.8, 1.4, "Mrs Darling's chair by the fire", "sit", function () { n14Tale("🪡 Mrs Darling's chair", ["tidy"], []); });
shkSpot(cx + N.beds[1][0], cz + N.beds[1][1] - 1.2, 1.6, "The three beds and their night-lights", "look", function () { n14Tale("🕯️ The night-lights", ["lights", "jane"], []); });
Rm.hello = "<b>The night nursery</b>, at the top of No. 14: three beds and their night-lights, Nana's kennel, the chest of drawers, Mrs Darling's chair by the fire, and the window, open.";
},
function (g, cx, cz, R, Rm) {
var h = 3.0, deal = dlnS("oak", 0xD8C8A8), black = dlnShine(0x1A1A1C, 0.5, 0.6), copper = dlnShine(0xC87A4A, 0.3, 0.85);
dlnShell(g, cx, cz, Rm, { floor: dlnS("flags", 0xC8C0B0), wall: dlnS("n14whitetile", 0xFFFFFF), low: dlnC(0x6A8AA0), lowH: 1.0, h: h, ceil: dlnC(0xE8E4DA), outName: "The stairs up to the hall", out: n14Rm("n14_hall") });
var rg = new THREE.Group();
rg.position.set(cx, 0, cz - Rm.hd + 0.45);
g.add(rg);
dlnBox(rg, 2.4, 0.95, 0.7, black, 0, 0.48, 0);
dlnBox(rg, 0.7, 0.5, 0.04, dlnShine(0x2A2A2C, 0.4, 0.6), -0.7, 0.5, 0.36);
dlnBox(rg, 0.7, 0.5, 0.04, dlnShine(0x2A2A2C, 0.4, 0.6), 0.7, 0.5, 0.36);
dlnBox(rg, 0.5, 0.35, 0.04, dlnGlow(0xE87A3A), 0, 0.45, 0.36);
dlnCyl(rg, 0.02, 0.02, 2.3, dlnShine(0xC8A048, 0.3, 0.9), 0, 0.8, 0.42, 6).rotation.z = Math.PI / 2;
dlnBox(rg, 2.8, 1.6, 0.3, dlnS("stock", 0xC8C0B0), 0, 1.75, -0.2);
for (var p = 0; p < 6; p++) {
var pan = dlnCyl(g, 0.13 + p * 0.02, 0.12 + p * 0.02, 0.12, copper, cx - 1.4 + p * 0.56, 2.2, cz - Rm.hd + 0.12, 14);
pan.rotation.x = Math.PI / 2;
}
var kettle = dlnCyl(g, 0.13, 0.15, 0.2, copper, cx - 0.4, 1.05, cz - Rm.hd + 0.45, 12);
shkSolidBox(cx, cz - Rm.hd + 0.45, 2.5, 0.8, 0);
var dr = new THREE.Group();
dr.position.set(cx + Rm.hw - 0.3, 0, cz + 0.2);
dr.rotation.y = -Math.PI / 2;
g.add(dr);
dlnBox(dr, 2.2, 0.9, 0.55, deal, 0, 0.45, 0);
dlnBox(dr, 2.2, 1.4, 0.25, deal, 0, 1.65, -0.15);
for (var s = 0; s < 2; s++) {
dlnBox(dr, 2.1, 0.03, 0.25, deal, 0, 1.25 + s * 0.45, -0.05);
for (var q = 0; q < 7; q++) {
var pl = dlnCyl(dr, 0.13, 0.13, 0.012, dlnS("marble", 0x7A9AD8), -0.9 + q * 0.3, 1.43 + s * 0.45, -0.12, 14);
pl.rotation.x = Math.PI / 2 - 0.15;
}
}
shkSolidBox(cx + Rm.hw - 0.3, cz + 0.2, 0.6, 2.25, 0);
n14Table(g, cx - 0.4, cz - 0.7, 1.8, 0.9, 0.8, deal);
dlnCyl(g, 0.26, 0.16, 0.2, dlnC(0xE8D8C0), cx - 0.6, 0.92, cz - 0.8, 16);
dlnCyl(g, 0.23, 0.23, 0.01, dlnC(0x4A2A1A), cx - 0.6, 1.0, cz - 0.8, 16);
var sp = dlnCyl(g, 0.012, 0.012, 0.4, dlnS("oak", 0xC8A070), cx - 0.55, 1.1, cz - 0.8, 5);
sp.rotation.z = 0.5;
dlnCyl(g, 0.1, 0.1, 0.06, dlnC(0x3A1A10), cx + 0.1, 0.84, cz - 0.6, 10);
dlnCyl(g, 0.11, 0.13, 0.18, dlnC(0xF4F0E6), cx + 0.35, 0.9, cz - 0.9, 10);
[[-1.5, -0.7, Math.PI / 2], [0.7, -0.7, -Math.PI / 2]].forEach(function (c) { n14Chair(g, cx + c[0], cz + c[1], c[2], deal); });
dlnBox(g, 1.1, 0.25, 0.55, dlnS("stone", 0xD0C8B8), cx - Rm.hw + 0.4, 0.8, cz - 1.4);
dlnBox(g, 0.1, 0.8, 0.1, deal, cx - Rm.hw + 0.4, 0.4, cz - 1.4);
var tap = dlnCyl(g, 0.025, 0.025, 0.25, dlnShine(0xC8A048, 0.3, 0.9), cx - Rm.hw + 0.15, 1.08, cz - 1.4, 6);
shkSolidBox(cx - Rm.hw + 0.4, cz - 1.4, 0.6, 1.15, 0);
wsmWin(g, cx - Rm.hw + 0.06, 1.9, cz - 1.4, Math.PI / 2, 1.1, 1.1);
var bb = new THREE.Group();
bb.position.set(cx + 1.4, 2.4, cz + Rm.hd - 0.06);
bb.rotation.y = Math.PI;
g.add(bb);
dlnBox(bb, 1.6, 0.4, 0.04, deal, 0, 0, 0);
["Dining", "Drawing", "Bedroom", "Nursery", "Front door"].forEach(function (n, i) { var b = dlnCyl(bb, 0.05, 0.05, 0.04, dlnShine(0xC8A048, 0.3, 0.9), -0.64 + i * 0.32, 0.05, 0.04, 8); b.rotation.x = Math.PI / 2; });
dlnBox(g, 0.1, 2.2, 0.95, dlnC(0x2A4A2A), cx - Rm.hw + 0.04, 1.1, cz + 2.6);
shkSpot(cx - Rm.hw + 0.9, cz + 2.6, 1.4, "The back door", "go out to the yard", n14Rm("n14_yard"));
dlnBox(g, 0.1, 2.2, 0.95, dlnC(0x2A2A30), cx + Rm.hw - 0.04, 1.1, cz - 3.4);
shkSpot(cx + Rm.hw - 0.9, cz - 3.4, 1.4, "The area door", "up the area steps to the square", function () { n14Go("door", "🏠 <b>Up the area steps,</b> through the gate in the railings, and out on the square."); });
dlnPendant(g, cx, h, cz, 0.6);
shkSpot(cx - 0.6, cz + 0.2, 1.6, "The pudding basin", "stir the puddings", function () { n14Tale("🍮 The Christmas puddings", ["puddings"], ["Every one in the house stirs the pudding and makes a wish: so goes the old English custom."]); setStatus("🍮 You stir the puddings, and make a wish."); });
shkSpot(cx + 1.4, cz + Rm.hd - 1.0, 1.4, "The bell board", "look", function () { n14Tale("🔔 The bells", ["servants", "midget"], ["A bell for every room: when one rings, the little brass flag beside its name swings."]); });
Rm.hello = "<b>The kitchen, below stairs.</b> The black-leaded range, the copper pans, the dresser of blue-and-white plates, and the pudding basin on the table. The back door goes out to the yard; the area door goes up to the square.";
},
function (g, cx, cz, R, Rm) {
var sub = new THREE.Group();
sub.position.set(cx, 0, cz);
g.add(sub);
var Q = { k: "yard", R: { w: 14, d: 10, h: 9, name: "the back yard of 14", night: 1, sky: 1 }, g: sub, solids: [], doors: [], lights: [] };
if (typeof nvbYard === "function") {
try {
nvbYard(Q);
}
catch (e) {
if (window.console)
console.warn("[no. 14] yard", e);
}
}
Q.solids.forEach(function (s) { if (s.r)
shkSolid({ x: cx + s.x, z: cz + s.z, r: s.r });
else
shkSolidBox(cx + s.x, cz + s.z, s.hw * 2, s.hd * 2, 0); });
Rm.entry = { x: -5.6 + 1.4, z: cz + 3.0, yaw: -Math.PI / 2 };
shkSpot(cx - 5.6, cz + 3.6, 1.6, "The back door", "go in to the kitchen", n14Rm("n14_kitchen"));
shkSpot(cx + 3, cz + 2.2, 1.8, "Nana's chain", "look", function () { n14Tale("⛓️ Nana's chain in the yard", ["yard", "danger", "chain"], []); });
Rm.hello = "<b>The back yard of No. 14,</b> under the stars: the flagstones, the kennel and its chain, the area steps, and up above, the nursery window.";
},
function (g, cx, cz, R, Rm) {
var h = 3.8, maho = dlnS("oak", 0x6A2E1A), cloth = dlnC(0xFCFAF4), silver = dlnShine(0xE0E0E4, 0.2, 0.95);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0x8A5A3A), wall: dlnS("damask", 0xA8C0B0), low: dlnS("oak", 0x4A2414), lowH: 1.0, h: h, ceil: dlnC(0xF4F0E6), outName: "The front door, out to the square", out: function () { n14Go("n27", "🎩 <b>Out on the square,</b> under No. 27's striped awning."); } });
dlnPlane(g, 7, 4.4, dlnS("n14turkey", 0xFFFFFF), cx, 0.02, cz - 0.6);
n14Table(g, cx, cz - 0.6, 4.4, 1.3, 0.76, maho, cloth);
var ep = dlnCyl(g, 0.25, 0.12, 0.4, silver, cx, 1.0, cz - 0.6, 12);
for (var f = 0; f < 8; f++) {
var fr = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), dlnC([0xC83A2A, 0xE8C040, 0x6A2A6A, 0x3A8A3A][f % 4]));
fr.position.set(cx + Math.cos(f) * 0.15, 1.25, cz - 0.6 + Math.sin(f) * 0.15);
g.add(fr);
}
[-1.6, 1.6].forEach(function (x) { dlnCyl(g, 0.06, 0.1, 0.5, silver, cx + x, 1.05, cz - 0.6, 10); [-0.15, 0, 0.15].forEach(function (o) { dlnCyl(g, 0.015, 0.015, 0.2, dlnC(0xFAF6E8), cx + x + o, 1.4, cz - 0.6, 5); var fl = new THREE.Mesh(new THREE.SphereGeometry(0.02, 5, 4), dlnGlow(0xFFE2A0)); fl.position.set(cx + x + o, 1.53, cz - 0.6); g.add(fl); }); });
for (var p = 0; p < 8; p++) {
var px = cx - 1.8 + (p % 4) * 1.2, pz = cz - 0.6 + (p < 4 ? -0.42 : 0.42);
dlnCyl(g, 0.13, 0.13, 0.015, dlnC(0xF8F8F4), px, 0.8, pz, 14);
dlnCyl(g, 0.03, 0.02, 0.12, dlnShine(0xE8F0F4, 0.05, 0.3), px + 0.2, 0.86, pz, 8);
}
var seats = [];
for (var s = 0; s < 8; s++) {
var sx = cx - 1.8 + (s % 4) * 1.2, sz = cz - 0.6 + (s < 4 ? -1.05 : 1.05);
n14Chair(g, sx, sz, s < 4 ? 0 : Math.PI, maho, dlnC(0x2A4A3A));
seats.push([sx, sz, s < 4 ? Math.PI : 0]);
}
seats.forEach(function (q, i) { if (DLN.lite && i % 2)
return; var who = i % 2 ? "eveninglady" : "doorkeeper", p = dlnPerson("n27g_" + i, who, { sex: i % 2 ? "f" : "m", inside: true }); p.position.set(q[0], 0.08, q[1] + (q[2] ? -0.05 : 0.05)); p.rotation.y = q[2]; p.userData.pose = "sit"; p.userData.seated = true; SHK.live.add(p); SHK.people.push({ g: p, ground: 0.08 }); });
var pm = dlnPerson("n27_maid", "maid", { sex: "f", inside: true });
pm.position.set(cx + 2.8, 0, cz + 1.4);
pm.rotation.y = -2.4;
SHK.live.add(pm);
SHK.people.push({ g: pm, ground: 0 });
var sb = new THREE.Group();
sb.position.set(cx + Rm.hw - 0.35, 0, cz - 0.6);
g.add(sb);
dlnBox(sb, 0.6, 0.95, 2.4, maho, 0, 0.48, 0);
dlnBox(sb, 0.66, 0.05, 2.5, maho, 0, 0.98, 0);
for (var d = 0; d < 3; d++)
dlnCyl(sb, 0.06, 0.08, 0.26, dlnShine(0xD8E0E8, 0.05, 0.4), -0.05, 1.14, -0.6 + d * 0.6, 10);
shkSolidBox(cx + Rm.hw - 0.35, cz - 0.6, 0.7, 2.5, 0);
dlnFireplace(g, cx - Rm.hw + 0.3, cz - 0.6, Math.PI / 2);
shkSolidBox(cx - Rm.hw + 0.3, cz - 0.6, 0.6, 2.2, 0);
[-2.6, 0, 2.6].forEach(function (x) { wsmWin(g, cx + x, 1.9, cz - Rm.hd + 0.06, 0, 1.3, 2.4); dlnBox(g, 0.45, 2.9, 0.08, dlnC(0x2A4A3A), cx + x - 0.95, 2.0, cz - Rm.hd + 0.12); dlnBox(g, 0.45, 2.9, 0.08, dlnC(0x2A4A3A), cx + x + 0.95, 2.0, cz - Rm.hd + 0.12); });
n14Gasolier(g, cx - 1.2, h, cz - 0.6);
n14Gasolier(g, cx + 1.2, h, cz - 0.6);
shkSpot(cx, cz + Rm.hd - 2.0, 2.0, "The dining-room door", "look", function () { n14Tale("🐕 The door Nana burst through", ["burst", "accepted"], ["It was here, in the middle of dinner, that the Darlings' dog came in with her paws up. The butler still tells it."]); });
Rm.hello = "<b>The dining-room of No. 27,</b> at dinner: candles, silver, the guests in evening dress. The Darlings dine here, a few yards from home.";
},
function (k) {
if (N14.tuneKey === k)
return;
N14.tuneKey = k;
var old = N14.tune;
N14.tune = null;
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
if (!k || !N14_TUNES[k])
return;
try {
var A = new Audio(N14_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
N14.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (N14.tune !== A) {
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
function (x, z) {
if (Math.hypot(x - N14_CAB.x, z - N14_CAB.z) < 12)
return "the cab rank on the square";
if (Math.abs(x) < N14_G.hx && Math.abs(z) < N14_G.hz)
return "the garden in the middle of the square";
if (z < N14_F.n + 8 && Math.abs(x - 5.4) < 6)
return "before No. 14, the Darlings' house";
if (z > N14_F.s - 8 && Math.abs(x - N14_27.x) < 6)
return "before No. 27";
if (Math.abs(z) > 35 && Math.abs(x) > 43)
return "a street off the square, Bloomsbury";
return "the Darlings' square, Bloomsbury";
},
function () {
var fns = {}, b = "<div style='font:600 16px Georgia;color:#FFE7B0'>🪟 The nursery window</div><p style='font:italic 14px/1.55 Georgia;margin:8px 0'>" + esc(N14_Q.open) + "</p><p style='font:italic 14px/1.55 Georgia;margin:8px 0'>" + esc(N14_Q.lights) + "</p>" +
"<div style='font-size:11px;opacity:.65'>J. M. Barrie, Peter and Wendy (1911)</div><p style='font-size:13px;opacity:.9'>Over the roofs of London, two stars hang low. The right-hand one is the way.</p>";
b += worldBtn("fly", "✨ Out of the window: second to the right, and straight on till morning", "To the Neverland");
fns.fly = function () { worldCard(null); n14FlyOut(); };
if (typeof nvbOpen === "function") {
b += worldBtn("book", "🧚 Peter and Wendy: the book", "All seventeen chapters, played, from this nursery to the Neverland and home");
fns.book = function () { worldCard(null); nvbOpen(); };
}
worldCard(b, fns);
},
function () {
try {
if (typeof spFlash === "function")
spFlash(0xFFE8C8);
}
catch (e) { }
setStatus("✨ <b>Second to the right, and straight on till morning.</b> Out of the window, over the chimney pots of London, toward the star...");
setTimeout(function () { try {
worldGo("neverland");
}
catch (e) {
if (window.console)
console.warn("[no. 14] fly", e);
} }, 700);
},
function (k, cx, cz) {
if (typeof NVB_CAST === "undefined" || typeof nvbPerson !== "function")
return;
Object.keys(N14_HOME).forEach(function (who, i) {
var H = N14_HOME[who], C = NVB_CAST[who];
if (H.room !== k || !C)
return;
var g = nvbPerson(4400 + i, C.role, { look: C.look, s: C.s });
g.position.set(cx + H.at[0], 0.02, cz + H.at[1]);
g.rotation.y = H.ry || 0;
SHK.live.add(g);
var P = { g: g, key: "n14h_" + who, ground: 0.02 };
SHK.people.push(P);
SHK.talk.push({ p: P, name: C.name, r: 2.6, t: { name: C.name, persona: (typeof NVB_BOOK !== "undefined" ? NVB_BOOK : "") + C.persona + " Just now you are at home at No. 14, in London, on an ordinary day before the adventure (or long after it); a visitor has come in.", greet: C.greet } });
});
if (k === "n14_day") {
var d = null;
try {
if (typeof ctuOne === "function")
d = ctuOne("dog", { k: 1.5 }, 11);
}
catch (e) { }
if (!d) {
d = new THREE.Group();
var bm = dlnC(0x1A1614), b = new THREE.Mesh(new THREE.SphereGeometry(0.45, 10, 8), bm);
b.scale.set(0.9, 0.8, 1.6);
b.position.y = 0.55;
d.add(b);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.25, 10, 8), bm);
hd.position.set(0, 0.85, 0.7);
d.add(hd);
}
d.position.set(cx + 2.6, 0.02, cz - 0.6);
d.rotation.y = -2.2;
SHK.live.add(d);
var P2 = { g: d, key: "n14h_nana", ground: 0.02 };
SHK.people.push(P2);
SHK.talk.push({ p: P2, name: "Nana", r: 2.6, t: { name: "Nana", persona: (typeof NVB_BOOK !== "undefined" ? NVB_BOOK : "") + "You are Nana, the Darlings' nurse, a prim Newfoundland dog. You answer only in dog: woofs, a wag, a look, a paw; and in what you do, which is always correct. You are on duty in the day nursery at No. 14.", greet: "(Nana looks you up and down, and decides you may stay. A single, dignified woof.)" } });
}
},
function () {
var b = worldBtn("gos", "To Great Ormond Street", "The hospital, a few streets away") + worldBtn("kg", "To Kensington Gardens", "Where the Darlings first met Nana") + (typeof wsmGo === "function" ? worldBtn("ws", "To Westminster", "Big Ben and the Houses of Parliament") : "") +
worldBtn("tale", "The kennel and the cab", "How Mr Darling went to the office") + worldBtn("back", "Back to Bankside, 1600", "Three hundred years upstream");
worldCard(worldFacts("🎩 A hansom cab", "The rank on the square, by the cabmen's shelter", [], []) + b, {
gos: function () { worldCard(null); dlnGo("🎩 <b>Great Ormond Street.</b> The cab sets you down at the rank, a few streets from the Darlings' square."); },
kg: function () { worldCard(null); if (typeof kgnGo === "function")
kgnGo("gate", "🌳 <b>Kensington Gardens.</b> The Black Lion Gate, on the Bayswater Road."); },
ws: function () { worldCard(null); wsmGo("cab"); },
tale: function () { worldCard(null); n14Tale("🐕 The kennel in the cab", ["cab", "crowds"], ["Sam Tuck, on this rank, says he loaded it on his own cab."]); },
back: function () { worldCard(null); dlnTo1600(); }
});
},
function () {
try {
var d = document.createElement("div");
d.innerHTML = worldBtn("n14", "🏠 To No. 14, the Darlings' house", "The quiet square in Bloomsbury");
var b = d.querySelector("[data-w]");
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); worldCard(null); n14Go("door", "🏠 <b>The Darlings' square.</b> The cab sets you down before No. 14: four floors of brick over the area railings, geraniums at the windows, and right at the top, the nursery window, open."); };
var card = WLD.card, first = card && card.querySelector("[data-w]:not([data-w=close])");
if (first)
first.parentNode.insertBefore(b, first);
else if (card)
card.appendChild(b);
}
catch (e) { }
},
function (title, quotes, notes, btns, src) {
var b = "<div style='font:600 16px Georgia;color:#FFE7B0'>" + esc(title) + "</div>" + (quotes || []).map(function (k) { var q = BKS_Q[k] || k; return "<p style='font:italic 14px/1.55 Georgia;margin:8px 0'>" + esc(q) + "</p>"; }).join("") +
((quotes || []).length ? "<div style='font-size:11px;opacity:.65;margin-top:-2px'>" + esc(src || "Arthur Conan Doyle") + "</div>" : "") +
(notes && notes.length ? "<div style='font-size:13px;opacity:.9;line-height:1.5'>" + notes.map(function (n) { return "<p style='margin:5px 0'>" + esc(n) + "</p>"; }).join("") + "</div>" : "");
var fns = {};
(btns || []).forEach(function (B) { b += worldBtn(B[0], B[1], B[2] || ""); fns[B[0]] = function () { worldCard(null); B[3](); }; });
worldCard(b, fns);
BKS.read++;
},
function (P) {
var X = bsX, Z = bsZ, flags = dlnS("flags", 0xFFFFFF), road = dlnS("setts", 0xB0A89C), kerb = dlnS("stone", 0xB8B4AC);
dlnPlane(P, BKS_R.x1 - BKS_R.x0 + 80, BKS_R.z1 - BKS_R.z0 + 80, flags, X(0), 0.0, Z(0));
dlnPlane(P, BKS_R.x1 - BKS_R.x0 + 40, 12, road, X(0), 0.02, Z(0));
[[-162, -146], [-66, -54], [54, 66], [150, 162]].forEach(function (c) { dlnPlane(P, c[1] - c[0], BKS_R.z1 - BKS_R.z0 + 80, road, X((c[0] + c[1]) / 2), 0.021, Z(0)); });
[[-146, -66], [-54, 54], [66, 150]].forEach(function (s) { [-6, 6].forEach(function (z) { dlnBox(P, s[1] - s[0], 0.12, 0.3, kerb, X((s[0] + s[1]) / 2), 0.06, Z(z)); }); });
[-40, 24, 100].forEach(function (x) { dlnPlane(P, 2.4, 11.6, dlnS("flags", 0xD8D4CC), X(x), 0.025, Z(0)); });
shkFloor(X(0), Z(0), (BKS_R.x1 - BKS_R.x0) / 2 + 40, (BKS_R.z1 - BKS_R.z0) / 2 + 40, 0);
},
function (text, w, h, bg, fg) {
var key = "bssign:" + text + ":" + bg + ":" + fg, W = 1024, H = Math.max(40, Math.min(512, Math.round(1024 * h / w)));
var t = DLN.tex[key] || (DLN.tex[key] = wTex(W, H, function (x) {
x.fillStyle = bg;
x.fillRect(0, 0, W, H);
x.strokeStyle = fg;
x.lineWidth = Math.max(2, H * 0.06);
x.strokeRect(H * 0.08, H * 0.08, W - H * 0.16, H - H * 0.16);
var fs = Math.round(H * 0.6);
x.font = "bold " + fs + "px Georgia";
var mw = x.measureText(text).width;
if (mw > W * 0.92) {
fs = Math.floor(fs * W * 0.92 / mw);
x.font = "bold " + fs + "px Georgia";
}
x.fillStyle = fg;
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(text, W / 2, H * 0.54);
}));
return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: t }));
},
function (cols) {
var key = "bswin:" + cols.join(",");
return DLN.tex[key] || (DLN.tex[key] = wTex(256, 128, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#F4DCA0");
g.addColorStop(1, "#A8783A");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
var R = wRand(cols.length * 31 + cols[0] % 97);
for (var s = 0; s < 3; s++) {
var y = H * 0.3 + s * H * 0.25;
x.fillStyle = "#5A3A1E";
x.fillRect(0, y, W, 4);
for (var i = 0; i < 14; i++) {
var c = cols[(i + s) % cols.length], hh = 8 + R() * 16, ww = 8 + R() * 10;
x.fillStyle = "#" + ("000000" + c.toString(16)).slice(-6);
x.fillRect(6 + i * 18, y - hh, ww, hh);
}
}
x.fillStyle = "rgba(255,255,255,.18)";
x.beginPath();
x.moveTo(0, 0);
x.lineTo(W * 0.3, 0);
x.lineTo(W * 0.1, H);
x.lineTo(0, H);
x.fill();
}));
},
function (P, x0, x1, zf, dir, name, col, goods) {
var X = bsX, Z = bsZ, w = x1 - x0, cx = (x0 + x1) / 2, z = zf + dir * 0.22, paint = dlnShine(col, 0.5, 0.1), gilt = dlnShine(0xD8B048, 0.3, 0.85), glass = new THREE.MeshBasicMaterial({ map: bsWinTex(goods || [0xC8A060]), fog: true });
dlnBox(P, w, 3.25, 0.3, paint, X(cx), 1.62, Z(zf + dir * 0.08));
dlnBox(P, w - 1.0, 2.0, 0.06, glass, X(cx), 1.55, Z(z + dir * 0.06));
for (var m = 0; m <= Math.round((w - 1.0) / 1.6); m++) {
var mx = x0 + 0.5 + m * (w - 1.0) / Math.max(1, Math.round((w - 1.0) / 1.6));
dlnBox(P, 0.06, 2.0, 0.08, paint, X(mx), 1.55, Z(z + dir * 0.08));
}
dlnBox(P, w - 1.0, 0.5, 0.1, paint, X(cx), 0.3, Z(z + dir * 0.05));
[x0 + 0.2, x1 - 0.2].forEach(function (px) { dlnBox(P, 0.4, 3.25, 0.45, paint, X(px), 1.62, Z(zf + dir * 0.2)); });
var sg = bsSign(name, w - 0.6, 0.55, "#141416", "#E8C860");
sg.position.set(X(cx), 2.95, Z(z + dir * 0.13));
if (dir < 0)
sg.rotation.y = Math.PI;
P.add(sg);
dlnBox(P, w + 0.1, 0.12, 0.5, gilt, X(cx), 3.3, Z(zf + dir * 0.25));
if (goods && !DLN.lite)
for (var k = 0; k < Math.floor((w - 1.2) / 0.5); k++) {
var gx = x0 + 0.8 + k * 0.5, gc = goods[k % goods.length];
var it = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.22 + (k % 3) * 0.1, 0.2), dlnC(gc));
it.position.set(X(gx), 0.72 + (k % 3) * 0.05, Z(z - dir * 0.12));
P.add(it);
}
},
function (P) {
var F = BKS_F, si = 0, num = function (base) { return function (i) { var n = base + 2 * i; return n === 221 ? "221B" : n; }; };
var nb = [201, 211, 231];
BKS_SEG.forEach(function (s, k) { dlnTerrace(P, BKS_X + s[0], BKS_X + s[1], bsZ(F.n), 1, 4, { tint: [0xE0C4A4, 0xD8BC9C, 0xE4C8A8][k], nums: num(nb[k]) }); });
var sb = [192, 210, 232];
BKS_SSEG.forEach(function (s, k) { dlnTerrace(P, BKS_X + s[0], BKS_X + s[1], bsZ(F.s), -1, 4, { tint: [0xD8BCA0, 0xE0C4A0, 0xD4B898][k], nums: num(sb[k]) }); });
var shopIn = function (segs, zf, dir, skip) {
segs.forEach(function (s) {
var n = Math.max(1, Math.round((s[1] - s[0]) / 10.8)), hw = (s[1] - s[0]) / n;
for (var i = 0; i < n; i++) {
var hx = s[0] + hw * i, door = hx + (i % 2 ? hw - 1.9 : 1.9);
if (skip && skip(hx, door))
continue;
if (DLN.lite && i % 2)
continue;
if ((i + si) % 3 === 2) {
si++;
continue;
}
var S = BKS_SHOPS[si % BKS_SHOPS.length];
si++;
if (i % 2)
bsShop(P, hx + 0.3, door - 1.1, zf, dir, S[0], S[1], S[2]);
else
bsShop(P, door + 1.1, hx + hw - 0.3, zf, dir, S[0], S[1], S[2]);
}
});
};
shopIn(BKS_SEG, F.n, 1, function (hx, door) { return Math.abs(door - BKS_221.x) < 1 || (hx < -118 + 11); });
shopIn(BKS_SSEG, F.s, -1, function (hx, door) { return Math.abs(hx + 5.4 - BKS_PO.x) < 6 || (hx < -150 + 11); });
bsShop(P, BKS_PO.x - 4.6, BKS_PO.x + 4.0, F.s, -1, "POST OFFICE · TELEGRAPHS · SAVINGS BANK", 0xA8201E, [0xF4F0E4]);
dlnPillarBox(P, bsX(BKS_PO.x + 5.6), bsZ(F.s - 1.4));
bsShop(P, -148.6, -131.0, F.s, -1, "THE BAKER STREET BAZAAR", 0x2A3A5A, [0xC8A060, 0xA82A2A, 0x2A6A3A, 0xE8E0D0]);
[[-60, -1], [-60, 1], [60, -1], [60, 1]].forEach(function (c) { wsmBlock(P, bsX(c[0]), bsZ(c[1] * 34), 12, 16, 13.2, dlnS("georgian", 0xFFFFFF), c[1] < 0 ? 0 : Math.PI, { roof: 3, base: 3.3 }); });
wsmBlock(P, bsX(-131), bsZ(26), 38, 22, 13.2, dlnS("georgian", 0xFFFFFF), Math.PI, { roof: 3, base: 3.3 });
wsmBlock(P, bsX(-172), bsZ(0), 10, 90, 13.2, dlnS("georgian", 0xD8C0A4), Math.PI / 2, { roof: 3, base: 3.3 });
for (var lx = -140; lx < 150; lx += DLN.lite ? 36 : 18) {
if (Math.abs(lx - BKS_CAB.x) < 4)
continue;
dlnLamp(P, bsX(lx), bsZ(-6.6));
dlnLamp(P, bsX(lx + 9), bsZ(6.6));
}
dlnPillarBox(P, bsX(-52), bsZ(-7.4));
dlnTrough(P, bsX(-24), bsZ(-6.9));
shkSpot(bsX(-24), bsZ(-8.4), 2.4, "The horse trough", "look", function () { bsTale("🐎 The horse trough", [], ["Put up by the Metropolitan Drinking Fountain and Cattle Trough Association, which since 1859 has given London's horses, dogs and people free clean water. Every cab-horse on the rank drinks here."]); });
shkSpot(bsX(-110), bsZ(-2), 3, "The smoke vent", "look down through the grating", function () { bsTale("💨 The vent in the road", [], ["Under your feet runs the Metropolitan Railway. When a train passes below, a warm breath of steam and coke smoke comes up through the iron grating, and the cab-horses shy at it."]); });
shkSpot(bsX(-140), bsZ(8.4), 3, "The Baker Street Bazaar", "look in at the windows", function () { bsTale("🛍️ The Baker Street Bazaar", [], ["A great hall of stalls selling everything from carriages to Berlin wool. Until 1884 it held Madame Tussaud's waxworks, before they moved round the corner to the Marylebone Road."]); });
bs221(P);
bsEarth(P);
bsPortman(P);
},
function (P) {
var X = bsX, Z = bsZ, z = BKS_F.n, D = BKS_221, brass = dlnShine(0xC8A048, 0.3, 0.9);
var lit = DLN.tex.bs221 || (DLN.tex.bs221 = wTex(128, 160, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#F6D89A");
g.addColorStop(1, "#C8864A");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "#E8DCC0";
x.fillRect(0, 0, W, H * 0.32);
x.strokeStyle = "rgba(120,90,60,.6)";
x.lineWidth = 2;
for (var i = 1; i < 6; i++) {
x.beginPath();
x.moveTo(0, i * H * 0.32 / 6);
x.lineTo(W, i * H * 0.32 / 6);
x.stroke();
}
x.fillStyle = "rgba(40,24,16,.55)";
x.beginPath();
x.ellipse(W * 0.62, H * 0.55, 13, 16, 0, 0, 7);
x.fill();
x.fillRect(W * 0.5, H * 0.62, 30, H * 0.4);
x.strokeStyle = "#F4F0E8";
x.lineWidth = 5;
x.strokeRect(2, 2, W - 4, H - 4);
x.beginPath();
x.moveTo(W / 2, 0);
x.lineTo(W / 2, H);
x.moveTo(0, H / 2);
x.lineTo(W, H / 2);
x.stroke();
}));
var m = new THREE.MeshBasicMaterial({ map: lit, fog: true });
[BKS_BOW.x - 1.8, BKS_BOW.x + 1.8].forEach(function (wx) {
var pn = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 2.3), m);
pn.position.set(X(wx), BKS_BOW.y, Z(z + 0.07));
P.add(pn);
dlnBox(P, 1.8, 0.12, 0.36, dlnS("stone", 0xFFFFFF), X(wx), BKS_BOW.y - 1.25, Z(z + 0.16));
});
dlnCyl(P, 0.05, 0.05, 0.04, brass, X(D.x + 0.75), 1.4, Z(z + 0.14), 10).rotation.x = Math.PI / 2;
dlnBox(P, 0.4, 0.2, 0.08, dlnC(0x1A1A1A), X(D.x - 0.95), 0.3, Z(z + 1.4));
shkDoor("bs_hall", X(D.x), Z(z + 3.0), "221B Baker Street");
shkSpot(X(BKS_BOW.x), Z(z + 6.0), 3.4, "The windows of 221B", "look up at the sitting-room", function () { bsTale("🪟 221B Baker Street", ["rooms", "woman"], ["Two broad windows on the first floor, over the street: the sitting-room Holmes and Watson shared, lit at all hours. Mrs Hudson, their landlady, lives below.", "The house numbers of Baker Street in Holmes's day stopped short of 221; Conan Doyle gave his detective an address that did not yet exist."], [], "Arthur Conan Doyle, A Study in Scarlet (1887); A Scandal in Bohemia (1891)"); });
},
function (P) {
var X = bsX, Z = bsZ, x = BKS_PO.x, z = -8.6, red = new THREE.MeshLambertMaterial({ color: 0x3A1E14, flatShading: true }), plank = dlnS("oak", 0x8A6A44);
dlnPlane(P, 6, 1.6, dlnC(0x4A2A1A), X(x), 0.03, Z(z));
for (var i = 0; i < (DLN.lite ? 3 : 7); i++) {
var h = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6 + ((i * 37) % 5) * 0.08, 1), red);
h.scale.set(1, 0.38, 0.8);
h.rotation.y = i;
h.position.set(X(x - 2.6 + i * 0.8), 0.15, Z(z + 1.1 + ((i * 13) % 3) * 0.15));
P.add(h);
}
[-1.2, 0, 1.2].forEach(function (k) { dlnBox(P, 1.6, 0.05, 0.3, plank, X(x + k * 1.6), 0.08, Z(z - 0.1)); });
var tr = new THREE.Group();
tr.position.set(X(x + 3.4), 0, Z(z));
P.add(tr);
dlnBox(tr, 1.4, 0.08, 0.08, plank, 0, 0.8, 0);
[-0.6, 0.6].forEach(function (k) { var l = dlnBox(tr, 0.06, 0.9, 0.06, plank, k, 0.42, 0.2); l.rotation.x = 0.3; var l2 = dlnBox(tr, 0.06, 0.9, 0.06, plank, k, 0.42, -0.2); l2.rotation.x = -0.3; });
dlnCyl(tr, 0.08, 0.08, 0.18, dlnGlow(0xE83020), 0, 0.95, 0, 8);
shkSolidBox(X(x), Z(z + 0.6), 6, 2.4, 0);
shkSpot(X(x), Z(z - 1.6), 2.6, "The thrown-up earth", "look at it", function () { bsTale("🟫 The red earth", ["earth"], ["The paviours have taken up the flagstones here to lay a pipe, and the earth thrown out is a reddish clay you will see nowhere else in the street. Watson walked through it on his way to the post-office, and it told Holmes where he had been."], [], "Arthur Conan Doyle, The Sign of the Four (1890)"); });
},
function (P) {
var X = bsX, Z = bsZ, S = BKS_STN, w = S.x1 - S.x0, d = S.z1 - S.z0, cx = (S.x0 + S.x1) / 2, cz = (S.z0 + S.z1) / 2, brick = dlnS("stock", 0xD8C8B0), stone = dlnS("stone", 0xE8E0D0), green = dlnShine(0x2A4A30, 0.5, 0.2);
wsmBlock(P, X(cx), Z(cz), w, d, 8.6, brick, 0, { roof: false, base: 1.2, balus: true });
for (var a = 0; a < 3; a++) {
var ax = cx - 7 + a * 7;
dlnBox(P, 2.6, 3.6, 0.2, dlnC(0x2A1E14), X(ax), 1.8, Z(S.z1 + 0.05));
var arch = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.3, 16, 1, false, 0, Math.PI), stone);
arch.rotation.x = Math.PI / 2;
arch.rotation.z = Math.PI / 2;
arch.position.set(X(ax), 3.6, Z(S.z1 + 0.1));
P.add(arch);
dlnBox(P, 2.2, 1.2, 0.06, dlnGlow(0xF0D8A0), X(ax), 4.6, Z(S.z1 + 0.05));
}
var sg = bsSign("METROPOLITAN RAILWAY", w - 2, 1.1, "#2A4A30", "#F0E6C8");
sg.position.set(X(cx), 6.4, Z(S.z1 + 0.2));
P.add(sg);
var sg2 = bsSign("BAKER STREET STATION", 12, 0.8, "#F0E6C8", "#2A4A30");
sg2.position.set(X(cx), 5.5, Z(S.z1 + 0.2));
P.add(sg2);
dlnBox(P, w - 2, 0.12, 3.0, green, X(cx), 3.9, Z(S.z1 + 1.6));
[-1, 1].forEach(function (k) { dlnCyl(P, 0.08, 0.1, 3.9, green, X(cx + k * (w / 2 - 1.6)), 1.95, Z(S.z1 + 2.9), 8); });
[[-120, 0], [-100, 0]].forEach(function (v) { dlnBox(P, 3.4, 0.06, 1.6, dlnShine(0x2A2A2E, 0.6, 0.5), X(v[0]), 0.04, Z(v[1])); for (var b = 0; b < 8; b++)
dlnBox(P, 0.06, 0.07, 1.5, dlnC(0x101012), X(v[0] - 1.5 + b * 0.43), 0.06, Z(v[1])); });
shkDoor("bs_station", X(cx), Z(S.z1 + 2.6), "Baker Street station: down to the trains");
shkSpot(X(cx - 9), Z(S.z1 + 3.4), 2.4, "The Metropolitan Railway", "read the notice", function () { bsTale("🚂 The Metropolitan Railway", [], ["Opened on the 10th of January 1863 from Paddington to Farringdon Street: the first underground railway in the world, dug under the New Road (the Marylebone Road) by cutting a trench and roofing it over.", "Its engines burn coke and are meant to keep their steam to themselves; in fact the stations are smoky, and the vents in the road let the smoke out. Baker Street's platforms are lit by daylight down shafts in the roof.", "Holmes and Watson use it: in The Red-Headed League they take \"the Underground as far as Aldersgate\"."]); });
},
function () {
var X = bsX, Z = bsZ, live = BKS.live, C = BKS_CAB;
for (var r = 0; r < (DLN.lite ? 1 : 3); r++)
dlnHansom(live, X(C.x - 4 - r * 7), Z(C.z), Math.PI / 2);
shkSpot(X(C.x), Z(-3.6), 3.4, "The cab rank", "take a cab", function () { bsCabCard(); });
var loop = [[-158, -2.8], [158, -2.8], [158, 2.8], [-158, 2.8], [-158, -2.8]];
BKS.loop = loop;
var Ld = 0;
for (var i = 1; i < loop.length; i++)
Ld += Math.hypot(loop[i][0] - loop[i - 1][0], loop[i][1] - loop[i - 1][1]);
BKS.loopL = Ld;
var n = DLN.lite ? 2 : 5;
for (var c = 0; c < n; c++) {
var cg = new THREE.Group();
live.add(cg);
dlnHansom(cg, 0, 0, 0);
BKS.cabs.push({ g: cg, s: c * Ld / n, sp: 4 + c % 2 });
}
if (typeof kgnBus === "function")
for (var b = 0; b < (DLN.lite ? 1 : 2); b++) {
var bus = kgnBus(true);
live.add(bus);
BKS.cabs.push({ g: bus, s: (b + 0.3) * Ld / 2, sp: 2.6 });
}
},
function (k, x, z, ry, o) {
var F = BKS_FOLK[k], p = dlnPerson("bs_" + k, F.dress, { sex: F.sex });
p.position.set(bsX(x), 0.02, bsZ(z));
p.rotation.y = ry || 0;
SHK.live.add(p);
var P = { g: p, key: "bs_" + k, wander: o && o.wander ? { r: o.wander, sp: 0.45 } : null, ground: 0.02 };
SHK.people.push(P);
SHK.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet } });
return P;
},
function (R) {
var X = bsX, Z = bsZ, crowd = function (n, x0, x1, z0, z1, kinds, o) {
if (DLN.lite)
n = Math.ceil(n * 0.4);
for (var i = 0; i < n; i++) {
var px = x0 + R() * (x1 - x0), pz = z0 + R() * (z1 - z0);
if (shkSolidAt(X(px), Z(pz), 0))
continue;
var who = kinds[(R() * kinds.length) | 0], p = dlnPerson("bsf" + SHK.people.length + "_" + i, who);
p.position.set(X(px), 0.02, Z(pz));
p.rotation.y = R() * 6.28;
SHK.live.add(p);
SHK.people.push({ g: p, wander: o && o.still ? null : { r: o && o.r || 10, sp: 0.35 + R() * 0.45 }, ground: 0.02 });
}
};
crowd(14, -140, 145, -9.4, -7.0, ["gent", "lady", "maid", "oldgent", "newsboy", "gent", "worker", "lady", "clergy"], { r: 16 });
crowd(14, -140, 145, 7.0, 9.4, ["gent", "lady", "maid", "oldgent", "lady", "worker", "gent", "nanny"], { r: 16 });
crowd(4, -158, -150, -30, 30, ["gent", "porter", "worker", "lady"], { r: 10 });
for (var u = 0; u < (DLN.lite ? 1 : 2); u++) {
var b = dlnPerson("bs_arab" + u, "bsarab", { child: true, sex: "m" });
b.position.set(X(-58 + u * 1.4), 0.02, Z(-8.6));
b.rotation.y = u ? 2 : -1;
SHK.live.add(b);
SHK.people.push({ g: b, wander: { r: 6, sp: 0.7 }, ground: 0.02 });
}
bsNamed("pc", 30, -8.2, Math.PI / 2, { wander: 30 });
bsNamed("porter", -136, -9.6, Math.PI);
bsNamed("muffin", 60, 7.8, -Math.PI / 2, { wander: 24 });
bsNamed("flower", -57.6, -9.2, 0.6);
bsNamed("cabman", BKS_CAB.x + 1.6, -4.8, -Math.PI / 2);
if (!DLN.lite) {
var tray = new THREE.Group();
SHK.live.add(tray);
BKS.tray = tray;
}
},
function () {
if (BKS.built || !SHK.G)
return;
DLN.lite = BKS.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(2211), live0 = SHK.live;
BKS.live = new THREE.Group();
BKS.live.name = "bs-live";
SHK.G.add(BKS.live);
BKS.cabs = [];
var all = new THREE.Group();
SHK.G.add(all);
[[bsGround, "ground"], [bsHouses, "houses"], [bsStation, "station"]].forEach(function (f) { try {
f[0](all, R);
}
catch (e) {
if (window.console)
console.warn("[baker street] " + f[1], e);
} });
try {
bsTraffic();
}
catch (e) {
if (window.console)
console.warn("[baker street] traffic", e);
}
try {
bsFolk(R);
}
catch (e) {
if (window.console)
console.warn("[baker street] folk", e);
}
SHK.G.remove(all);
var g = new THREE.Group();
g.name = "bs-street";
SHK.G.add(g);
all.children.slice().forEach(function (m) { if (m.userData && m.userData.keep) {
BKS.live.add(m);
return;
} g.add(m); });
try {
ctnMerge(g);
g.children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) {
if (window.console)
console.warn("[baker street] bake", e);
}
SHK.dist.push({ n: "bs-street", g: g, x: bsX(0), z: bsZ(0), r: 200 });
SHK.live = live0;
BKS.built = true;
},
function () {
return dlnTex("bspaper", 256, 256, function (x, W, H) {
x.fillStyle = "#C8B88A";
x.fillRect(0, 0, W, H);
var R = wRand(17);
for (var i = 0; i < 5; i++)
for (var j = 0; j < 5; j++) {
var cx = i * 52 + (j % 2) * 26, cy = j * 52;
x.fillStyle = "rgba(120,80,40,.35)";
x.beginPath();
x.moveTo(cx, cy - 12);
x.lineTo(cx + 9, cy);
x.lineTo(cx, cy + 12);
x.lineTo(cx - 9, cy);
x.fill();
}
dlnNoise(x, W, H, 300, 0.06, 21);
}, 1.2, 1.2);
},
function () {
var b = worldBtn("sit", "Up the seventeen steps: the sitting-room", "The fire, two armchairs, the Persian slipper, papers everywhere") + worldBtn("bed", "Up to Sherlock Holmes's bedroom", "Off the sitting-room") +
worldBtn("wat", "Up again: Dr Watson's room", "A floor higher, at the back") + worldBtn("kit", "Down to Mrs Hudson's kitchen", "Below stairs") + worldBtn("hall", "Down to the hall", "");
worldCard(worldFacts("🪜 The seventeen steps", "221B Baker Street", [], [BKS_Q.steps]) + b, { sit: function () { worldCard(null); shkGoIn("ws_baker"); }, bed: function () { worldCard(null); shkGoIn("bs_bed"); },
wat: function () { worldCard(null); shkGoIn("bs_watson"); }, kit: function () { worldCard(null); shkGoIn("bs_kitchen"); }, hall: function () { worldCard(null); shkGoIn("bs_hall"); } });
},
function (g, x, z, ry) {
var t = new THREE.Group();
t.position.set(x, 0, z);
t.rotation.y = ry || 0;
g.add(t);
var green = dlnShine(0x3A4A2A, 0.4, 0.3), black = dlnShine(0x141414, 0.5, 0.3), brass = dlnShine(0xC8A048, 0.3, 0.9), teak = dlnShine(0x7A4A24, 0.5, 0.1), red = dlnC(0x8A1E1A);
dlnBox(t, 2.4, 0.4, 9, black, 0, 0.9, 0);
var boil = dlnCyl(t, 0.75, 0.75, 5.2, green, 0, 2.0, 1.4, 16);
boil.rotation.x = Math.PI / 2;
dlnCyl(t, 0.28, 0.32, 1.0, black, 0, 3.1, 3.6, 10);
dlnCyl(t, 0.3, 0.34, 0.5, brass, 0, 2.95, 1.6, 10);
[-1, 1].forEach(function (k) { dlnBox(t, 0.5, 1.4, 4.4, green, k * 1.0, 1.8, 1.2); });
dlnBox(t, 2.6, 2.3, 2.2, green, 0, 2.1, -2.6);
dlnBox(t, 2.7, 0.12, 2.6, black, 0, 3.3, -2.6);
dlnBox(t, 0.06, 0.5, 0.6, dlnGlow(0xE8D8A8), 1.31, 2.6, -2.4);
dlnBox(t, 0.06, 0.5, 0.6, dlnGlow(0xE8D8A8), -1.31, 2.6, -2.4);
dlnBox(t, 2.4, 0.3, 0.12, red, 0, 0.9, 4.55);
[-1.15, 1.15].forEach(function (k) { [3.0, 1.0, -1.2, -3.0].forEach(function (wz, i) { var w = new THREE.Mesh(new THREE.CylinderGeometry(i < 2 ? 0.5 : 0.8, i < 2 ? 0.5 : 0.8, 0.12, 16), red); w.rotation.z = Math.PI / 2; w.position.set(k, i < 2 ? 0.5 : 0.8, wz); t.add(w); }); });
for (var c = 0; c < 3; c++) {
var cz0 = -9.5 - c * 9.4, cg = new THREE.Group();
cg.position.set(0, 0, cz0);
t.add(cg);
dlnBox(cg, 2.6, 2.4, 8.8, teak, 0, 2.0, 0);
dlnBox(cg, 2.7, 0.2, 9.0, dlnC(0x2A2A2A), 0, 3.3, 0);
for (var d = 0; d < 5; d++) {
[-1, 1].forEach(function (k) { dlnBox(cg, 0.04, 1.8, 1.3, dlnShine(0x5A3418, 0.5, 0.1), k * 1.31, 1.95, -3.4 + d * 1.7); dlnBox(cg, 0.05, 0.6, 0.9, dlnGlow(0xF0D8A0), k * 1.32, 2.4, -3.4 + d * 1.7); });
}
[-1.0, 1.0].forEach(function (k) { [-3, 3].forEach(function (wz) { var w = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.12, 14), black); w.rotation.z = Math.PI / 2; w.position.set(k * 1.15, 0.5, wz); cg.add(w); }); });
}
var sm = new THREE.MeshBasicMaterial({ color: 0xE8E8EC, transparent: true, opacity: 0.25, depthWrite: false });
for (var p = 0; p < (DLN.lite ? 2 : 6); p++) {
var s = new THREE.Mesh(new THREE.SphereGeometry(0.6 + p * 0.15, 8, 6), sm);
s.position.set((p % 2 ? 0.4 : -0.4), 3.6 + p * 0.45, 3.4 - p * 0.5);
t.add(s);
}
return t;
},
function (g, cx, cz, R, Rm) {
var h = 3.6, wood = dlnS("oak", 0x5A3A22), white = dlnC(0xF0ECE0), brass = dlnShine(0xC8A048, 0.3, 0.9);
dlnShell(g, cx, cz, Rm, { floor: dlnS("bslino", 0xFFFFFF), wall: dlnS("bspaper", 0xFFFFFF), low: dlnS("oak", 0x4A2E1A), lowH: 1.0, h: h, ceil: dlnC(0xE8E0D0), outName: "The front door, out to Baker Street", out: function () { bsGo("door", "🔎 <b>Out on Baker Street.</b> The door of 221B shuts behind you."); } });
var fan = new THREE.Mesh(new THREE.CircleGeometry(0.85, 16, 0, Math.PI), dlnGlow(0xE8D8A8));
fan.position.set(cx, 3.05, cz + Rm.hd - 0.12);
fan.rotation.y = Math.PI;
g.add(fan);
for (var s = 0; s < 17; s++) {
var sy = 0.19 + s * 0.19, sz = cz + 3.8 - s * 0.27;
dlnBox(g, 1.1, 0.05, 0.28, wood, cx - Rm.hw + 0.55, sy, sz);
dlnBox(g, 1.1, sy, 0.26, dlnC(0x3A2418), cx - Rm.hw + 0.55, sy / 2, sz);
dlnBox(g, 0.7, 0.06, 0.25, dlnC(0x7A2A2A), cx - Rm.hw + 0.55, sy + 0.03, sz);
dlnCyl(g, 0.008, 0.008, 0.75, brass, cx - Rm.hw + 0.55, sy + 0.04, sz - 0.12, 5).rotation.z = Math.PI / 2;
if (!DLN.lite || s % 2 === 0)
dlnCyl(g, 0.02, 0.02, 0.85, white, cx - Rm.hw + 1.08, sy + 0.45, sz, 5);
}
var rail = dlnBox(g, 0.07, 0.07, 5.4, wood, cx - Rm.hw + 1.08, 2.4, cz + 1.6);
rail.rotation.x = 0.61;
dlnCyl(g, 0.07, 0.08, 1.1, wood, cx - Rm.hw + 1.08, 0.55, cz + 3.9, 8);
var nw = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), wood);
nw.position.set(cx - Rm.hw + 1.08, 1.15, cz + 3.9);
g.add(nw);
dlnBox(g, 1.1, 0.12, 1.6, wood, cx - Rm.hw + 0.55, 3.32, cz - 1.6);
shkSolidBox(cx - Rm.hw + 0.55, cz + 1.0, 1.2, 6.4, 0);
var jet = dlnCyl(g, 0.06, 0.04, 0.16, dlnGlow(0xFFE2A0), cx - Rm.hw + 0.25, 3.0, cz - 2.2, 8);
var hs = new THREE.Group();
hs.position.set(cx + Rm.hw - 0.45, 0, cz + 2.6);
g.add(hs);
dlnCyl(hs, 0.05, 0.06, 1.9, wood, 0, 0.95, 0, 8);
[0, 1, 2, 3].forEach(function (a) { var p = dlnBox(hs, 0.32, 0.04, 0.04, wood, Math.cos(a * Math.PI / 2) * 0.14, 1.78, Math.sin(a * Math.PI / 2) * 0.14); p.rotation.y = a * Math.PI / 2; });
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), dlnC(0x6A5A44));
cap.position.set(0.12, 1.86, 0);
hs.add(cap);
dlnBox(hs, 0.42, 1.0, 0.14, dlnC(0x5A4A38), -0.1, 1.25, -0.12);
dlnCyl(hs, 0.16, 0.16, 0.5, dlnC(0x2A2A2A), 0, 0.25, 0.3, 10);
for (var u = 0; u < 3; u++)
dlnCyl(hs, 0.02, 0.015, 0.85, dlnC(0x141418), -0.05 + u * 0.05, 0.6, 0.3, 5);
shkSolid({ x: cx + Rm.hw - 0.45, z: cz + 2.6, r: 0.4 });
var tb = n14Table(g, cx + Rm.hw - 0.4, cz - 1.4, 0.5, 1.2, 0.82, wood);
dlnCyl(g, 0.18, 0.18, 0.02, dlnShine(0xE0E0E4, 0.2, 0.95), cx + Rm.hw - 0.4, 0.86, cz - 1.4, 14);
for (var l = 0; l < 3; l++)
dlnBox(g, 0.14, 0.01, 0.1, dlnC(0xF4F0E4), cx + Rm.hw - 0.4 + (l - 1) * 0.03, 0.88 + l * 0.005, cz - 1.4 + (l - 1) * 0.05);
var bar = dlnCyl(g, 0.12, 0.12, 0.05, wood, cx + Rm.hw - 0.06, 1.7, cz - 1.4, 14);
bar.rotation.z = Math.PI / 2;
dlnBox(g, 1.0, 2.2, 0.12, dlnS("oak", 0x5A3A22), cx + 0.8, 1.1, cz - Rm.hd + 0.08);
n14Gasolier(g, cx + 0.5, h, cz + 0.6);
shkSpot(cx - Rm.hw + 1.4, cz + 3.4, 2.2, "The seventeen steps", "go up (or down)", function () { bsStairs(); });
shkSpot(cx + 0.8, cz - Rm.hd + 1.2, 2.0, "The kitchen stair", "go down to Mrs Hudson's kitchen", function () { shkGoIn("bs_kitchen"); });
shkSpot(cx + Rm.hw - 0.8, cz - 1.4, 1.8, "The letters on the salver", "look", function () { bsTale("✉️ The morning's post", ["note"], ["The pink-tinted note-paper came by the last post: no signature, no address. Holmes held it up to the light and found the maker's mark woven in the paper."], [], "Arthur Conan Doyle, A Scandal in Bohemia (1891)"); });
Rm.hello = "<b>221B Baker Street: the hall.</b> Linoleum, a hat-stand, the salver of letters, and the stair: seventeen steps up to the sitting-room.";
},
function (g, cx, cz, R, Rm) {
var h = 3.3, wood = dlnS("oak", 0x4A3020), iron = dlnShine(0x1A1A1A, 0.5, 0.5);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("bspaper", 0xC8C0B0), h: h, ceil: dlnC(0xE0D8C8), outName: "The door, back to the sitting-room", out: function () { shkGoIn("ws_baker"); } });
var bd = new THREE.Group();
bd.position.set(cx - Rm.hw + 1.0, 0, cz - 1.3);
g.add(bd);
dlnBox(bd, 1.0, 0.35, 2.0, dlnC(0xF2EEE4), 0, 0.55, 0);
dlnBox(bd, 1.05, 0.1, 1.6, dlnC(0x6A2A2A), 0, 0.75, 0.2);
[-1, 1].forEach(function (k) { dlnBox(bd, 1.05, 0.06, 0.06, iron, 0, 1.1, k * 1.0); [-0.5, 0.5].forEach(function (x) { dlnCyl(bd, 0.025, 0.025, 1.1, iron, x, 0.55, k * 1.0, 6); }); });
shkSolidBox(cx - Rm.hw + 1.0, cz - 1.3, 1.1, 2.1, 0);
var ws = new THREE.Group();
ws.position.set(cx + Rm.hw - 0.4, 0, cz - 2.6);
g.add(ws);
dlnBox(ws, 0.5, 0.8, 0.9, wood, 0, 0.4, 0);
dlnBox(ws, 0.52, 0.04, 0.92, dlnC(0xF0ECE4), 0, 0.82, 0);
dlnCyl(ws, 0.16, 0.12, 0.12, dlnC(0xF4F2EC), 0, 0.9, 0, 12);
shkSolidBox(cx + Rm.hw - 0.4, cz - 2.6, 0.6, 1.0, 0);
var ch = new THREE.Group();
ch.position.set(cx + Rm.hw - 0.35, 0, cz - 0.6);
g.add(ch);
dlnBox(ch, 0.5, 1.0, 1.1, wood, 0, 0.5, 0);
for (var b = 0; b < 5; b++)
dlnCyl(ch, 0.04, 0.04, 0.16, new THREE.MeshBasicMaterial({ color: [0xC8E0E8, 0xE8D8A8, 0xA8C8A8][b % 3], transparent: true, opacity: 0.6 }), 0, 1.1, -0.4 + b * 0.2, 8);
shkSolidBox(cx + Rm.hw - 0.35, cz - 0.6, 0.6, 1.2, 0);
n14Ward(g, cx - Rm.hw + 0.4, cz + 1.6, Math.PI / 2, wood, 1.5, 2.2);
for (var p = 0; p < (DLN.lite ? 3 : 7); p++) {
var pz = cz - Rm.hd + 0.06, px = cx - 2.6 + p * 0.85;
n14Pic(g, px, 1.8 + (p % 2) * 0.35, pz, 0, 0.45, 0.6, ["#4A4440", "#1E1A18"]);
}
wsmWin(g, cx + 0.6, 1.8, cz + Rm.hd - 0.06, 0, 1.0, 2.0);
shkSpot(cx - Rm.hw + 1.2, cz + 1.6, 2.0, "The wardrobe of disguises", "open it", function () { bsTale("🎭 The wardrobe of disguises", [], ["An old pea-jacket and a seaman's scarf; a groom's ill-kempt coat and side-whiskers; the broad black hat and white tie of a Nonconformist clergyman; a wig of grey hair and a bundle of stage paint.", "Watson writes in A Scandal in Bohemia that, though he knew his friend's amazing powers in the use of disguises, he \"had to look three times before I was certain that it was indeed he\"."]); });
shkSpot(cx, cz - Rm.hd + 1.2, 2.0, "The pictures on the wall", "look at them", function () { bsTale("🖼️ The faces on the wall", [], ["Holmes keeps the faces of famous criminals about him: forgers, poisoners and the cleverest thieves in Europe, cut from the papers and framed. He says a man who knows the history of crime can very often solve a new one from an old."]); });
Rm.hello = "<b>Sherlock Holmes's bedroom.</b> An iron bed, chemicals on the chest of drawers, the wardrobe of disguises, and the walls hung with the faces of criminals.";
},
function (g, cx, cz, R, Rm) {
var h = 3.0, wood = dlnS("oak", 0x6A4A2A);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("n14stripe", 0xE8E0D0), h: h, ceil: dlnC(0xF0ECE0), outName: "The door, down to the hall", out: function () { shkGoIn("bs_hall"); } });
var bd = new THREE.Group();
bd.position.set(cx - Rm.hw + 1.0, 0, cz - 1.2);
g.add(bd);
dlnBox(bd, 1.0, 0.4, 2.0, dlnC(0xF4F2EC), 0, 0.55, 0);
dlnBox(bd, 1.05, 0.1, 1.5, dlnC(0x2A3A5A), 0, 0.78, 0.25);
dlnBox(bd, 1.05, 1.0, 0.08, wood, 0, 0.7, -1.0);
shkSolidBox(cx - Rm.hw + 1.0, cz - 1.2, 1.1, 2.1, 0);
n14Table(g, cx + Rm.hw - 0.55, cz - 1.6, 0.8, 1.2, 0.76, wood, dlnC(0x2A4A2A));
n14Chair(g, cx + Rm.hw - 1.2, cz - 1.6, Math.PI / 2, wood);
for (var n = 0; n < 3; n++)
dlnBox(g, 0.2, 0.03 + n * 0.01, 0.28, dlnC([0x6A1A1A, 0x1A3A2A, 0xF4F0E4][n]), cx + Rm.hw - 0.55, 0.8 + n * 0.03, cz - 1.9 + n * 0.25);
var bag = dlnBox(g, 0.4, 0.28, 0.2, dlnShine(0x1A1410, 0.4, 0.2), cx + Rm.hw - 0.4, 0.14, cz + 0.2);
dlnBox(g, 0.8, 0.5, 0.5, dlnShine(0x3A2A1A, 0.6, 0.2), cx - Rm.hw + 0.5, 0.25, cz + 1.2);
shkSolidBox(cx - Rm.hw + 0.5, cz + 1.2, 0.9, 0.6, 0);
n14Pic(g, cx - 0.6, 1.8, cz - Rm.hd + 0.06, 0, 0.9, 0.6, ["#8A6A3A", "#3A2A1A"]);
wsmWin(g, cx + 0.6, 1.7, cz - Rm.hd + 0.06, 0, 1.0, 1.8);
shkSpot(cx + Rm.hw - 0.9, cz - 1.6, 1.8, "Watson's notebook", "read the page", function () { bsTale("📓 SHERLOCK HOLMES: his limits", [], ["Watson's list, written in the first weeks they shared the rooms: 1. Knowledge of Literature, nil. 2. Philosophy, nil. 3. Astronomy, nil. 4. Politics, feeble. 5. Botany, variable: well up in belladonna, opium, and poisons generally. 6. Geology, practical, but limited. 7. Chemistry, profound. 8. Anatomy, accurate, but unsystematic. 9. Sensational Literature, immense. 10. Plays the violin well. 11. Is an expert singlestick player, boxer, and swordsman. 12. Has a good practical knowledge of British law.", "In despair, Watson threw it into the fire."], [], "Arthur Conan Doyle, A Study in Scarlet (1887)"); });
shkSpot(cx - 0.6, cz - Rm.hd + 1.2, 1.8, "The picture of the regiment", "look", function () { bsTale("🎖️ The Fifth Northumberland Fusiliers", [], ["Watson took his degree of Doctor of Medicine in 1878 and went out to India as an army surgeon. At the battle of Maiwand in Afghanistan a bullet struck his shoulder; his orderly, Murray, threw him across a pack-horse and brought him safe to the British lines. He came home to London with his health ruined and nine months to mend it, and met Holmes."]); });
Rm.hello = "<b>Dr Watson's room,</b> up a floor at the back: the bed, his writing table with the notebooks, his medical bag, his army trunk.";
},
function (g, cx, cz, R, Rm) {
var h = 3.0, wood = dlnS("oak", 0xC8A07A), dark = dlnS("oak", 0x5A3A22), copper = dlnShine(0xB8683A, 0.3, 0.85), iron = dlnShine(0x1A1A1A, 0.5, 0.6);
dlnShell(g, cx, cz, Rm, { floor: dlnS("bsflag", 0xFFFFFF), wall: dlnS("n14whitetile", 0xFFFFFF), low: dlnS("oak", 0x3A2A1A), lowH: 0.9, h: h, ceil: dlnC(0xE8E2D4), outName: "Up the kitchen stair to the hall", out: function () { shkGoIn("bs_hall"); } });
var rg = new THREE.Group();
rg.position.set(cx, 0, cz - Rm.hd + 0.45);
g.add(rg);
dlnBox(rg, 2.0, 1.0, 0.8, iron, 0, 0.5, 0);
dlnBox(rg, 0.7, 0.5, 0.05, dlnGlow(0xE87A30), 0, 0.45, 0.41);
dlnBox(rg, 2.2, 0.08, 0.9, iron, 0, 1.04, 0);
dlnCyl(rg, 0.15, 0.18, 0.25, dlnShine(0x2A2A2A, 0.4, 0.6), -0.5, 1.2, 0, 12);
dlnBox(rg, 2.4, 0.2, 0.4, dark, 0, 1.8, -0.2);
for (var c = 0; c < 5; c++) {
var pn = dlnCyl(rg, 0.14, 0.14, 0.12, copper, -0.8 + c * 0.4, 2.2, -0.25, 12);
}
shkSolidBox(cx, cz - Rm.hd + 0.45, 2.2, 0.9, 0);
var dr = new THREE.Group();
dr.position.set(cx - Rm.hw + 0.3, 0, cz - 0.4);
dr.rotation.y = Math.PI / 2;
g.add(dr);
dlnBox(dr, 2.0, 0.9, 0.5, dark, 0, 0.45, 0);
dlnBox(dr, 2.0, 1.2, 0.2, dark, 0, 1.6, -0.15);
for (var s = 0; s < 2; s++)
for (var p = 0; p < 6; p++)
dlnCyl(dr, 0.13, 0.13, 0.02, dlnC([0xF4F4F0, 0x3A5A9A][p % 2]), -0.8 + p * 0.32, 1.25 + s * 0.45, -0.06, 12).rotation.x = Math.PI / 2 - 0.2;
shkSolidBox(cx - Rm.hw + 0.3, cz - 0.4, 0.6, 2.1, 0);
n14Table(g, cx + 0.6, cz - 0.8, 1.6, 0.9, 0.78, wood);
var tray = dlnBox(g, 0.6, 0.03, 0.4, dlnShine(0xD8D8DC, 0.2, 0.9), cx + 0.4, 0.83, cz - 0.8);
dlnCyl(g, 0.08, 0.09, 0.15, dlnC(0xF4F4F0), cx + 0.25, 0.92, cz - 0.8, 10);
dlnCyl(g, 0.07, 0.07, 0.06, dlnC(0xF4F4F0), cx + 0.55, 0.88, cz - 0.9, 10);
var loaf = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), dlnC(0xC8904A));
loaf.scale.set(1.4, 0.8, 1);
loaf.position.set(cx + 1.1, 0.9, cz - 0.7);
g.add(loaf);
for (var b = 0; b < 4; b++) {
dlnBox(g, 0.04, 0.25, 0.04, dark, cx + Rm.hw - 0.06, 2.3, cz - 1.2 + b * 0.4);
var bl = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), dlnShine(0xC8A048, 0.3, 0.9));
bl.rotation.x = Math.PI;
bl.position.set(cx + Rm.hw - 0.12, 2.15, cz - 1.2 + b * 0.4);
g.add(bl);
}
var lb = bsSign("SITTING RM · 1st · 2nd · FRONT DOOR", 1.6, 0.14, "#2A1E14", "#E8D8A8");
lb.position.set(cx + Rm.hw - 0.05, 2.5, cz - 0.6);
lb.rotation.y = -Math.PI / 2;
g.add(lb);
n14Gasolier(g, cx, h, cz);
shkSpot(cx + Rm.hw - 0.6, cz - 0.6, 1.8, "The bells", "look at them", function () { bsTale("🔔 The bells", [], ["A bell for every room, on springs, each with its own wire through the walls. When the sitting-room bell rings at all hours, Mrs Hudson goes up: with the tray, with a card on the salver, or to say there is a gentleman to see Mr Holmes."]); });
Rm.hello = "<b>Mrs Hudson's kitchen,</b> below stairs: the range black-leaded and the fire in, copper pans, the dresser, the bells, and the tray laid for upstairs.";
},
function (g, cx, cz, R, Rm) {
var h = 8.0, brick = dlnS("bsbrick", 0xFFFFFF), stone = dlnS("stone", 0xD8D0C0), wood = dlnS("oak", 0x6A4A2A);
dlnShell(g, cx, cz, Rm, { floor: dlnS("bsflag", 0xFFFFFF), wall: brick, h: h, ceil: false, outName: "Up the stairs to Baker Street", out: function () { bsGo("station", "🚂 <b>Up from the trains.</b> Out of Baker Street station into the daylight."); } });
dlnBox(g, 4.6, 0.02, Rm.hd * 2 - 0.4, dlnC(0x3A3430), cx, 0.6, cz);
dlnBox(g, 4.6, 0.6, Rm.hd * 2, dlnC(0x2A2420), cx, 0.3, cz);
[-0.72, 0.72].forEach(function (k) { dlnBox(g, 0.08, 0.1, Rm.hd * 2 - 0.4, dlnShine(0x8A8A90, 0.3, 0.9), cx + k, 0.66, cz); });
for (var sl = -Rm.hd + 1; sl < Rm.hd; sl += DLN.lite ? 1.4 : 0.7)
dlnBox(g, 2.4, 0.06, 0.22, dlnC(0x4A3A2A), cx, 0.62, cz + sl);
[-1, 1].forEach(function (k) { dlnBox(g, 5.8, 0.9, Rm.hd * 2, stone, cx + k * 5.6, 0.45, cz); dlnBox(g, 0.3, 0.05, Rm.hd * 2, dlnC(0xE8E4D8), cx + k * 2.75, 0.92, cz); });
shkFloor(cx - 5.6, cz, 2.9, Rm.hd, 0.9);
shkFloor(cx + 5.6, cz, 2.9, Rm.hd, 0.9);
shkSolidBox(cx, cz, 4.4, Rm.hd * 2, 0);
for (var a = -Rm.hd + 2; a < Rm.hd; a += 4) {
var rib = new THREE.Mesh(new THREE.TorusGeometry(Rm.hw, 0.25, 4, 18, Math.PI), brick);
rib.position.set(cx, h - 1.5, cz + a);
g.add(rib);
}
var vault = new THREE.Mesh(new THREE.CylinderGeometry(Rm.hw, Rm.hw, Rm.hd * 2, 18, 1, true, -Math.PI / 2, Math.PI), new THREE.MeshLambertMaterial({ map: DLN_CANVAS.bsbrick(), side: THREE.BackSide }));
vault.rotation.x = Math.PI / 2;
vault.rotation.y = Math.PI;
vault.position.set(cx, h - 1.5, cz);
g.add(vault);
for (var sh = -Rm.hd + 5; sh < Rm.hd; sh += 10) {
dlnBox(g, 3.0, 0.1, 2.0, dlnGlow(0xF4F0E0), cx, h - 1.5 + Rm.hw - 0.2, cz + sh);
var beam = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 2.2, Rm.hw + 5, 10, 1, true), new THREE.MeshBasicMaterial({ color: 0xF8F4E0, transparent: true, opacity: 0.07, depthWrite: false, side: THREE.DoubleSide }));
beam.position.set(cx, (h - 1.5 + Rm.hw) / 2 + 0.5, cz + sh);
g.add(beam);
}
for (var r = -Rm.hd + 3; r < Rm.hd - 2; r += 6) {
[-1, 1].forEach(function (k) { dlnBox(g, 0.1, 3.0, 2.4, dlnC(0x4A3A2E), cx + k * (Rm.hw - 0.06), 2.4, cz + r); var lp = dlnCyl(g, 0.12, 0.08, 0.3, dlnGlow(0xFFE2A0), cx + k * (Rm.hw - 0.5), 3.4, cz + r + 3, 6); });
}
[-1, 1].forEach(function (k) {
[-Rm.hd + 8, 0, Rm.hd - 8].forEach(function (z) {
var nb = bsSign("BAKER STREET", 2.6, 0.5, "#F0E6C8", "#2A4A30");
nb.position.set(cx + k * (Rm.hw - 0.08), 3.0, cz + z);
nb.rotation.y = k < 0 ? Math.PI / 2 : -Math.PI / 2;
g.add(nb);
dlnBench(g, cx + k * (Rm.hw - 0.9), cz + z + 2, k < 0 ? Math.PI / 2 : -Math.PI / 2);
});
});
[["PEARS' SOAP", "#E8DCC0", "#3A2A6A"], ["BOVRIL", "#A8201E", "#F8F0E0"], ["COLMAN'S MUSTARD", "#E8C030", "#1A1A1A"], ["NESTLÉ'S MILK", "#2A3A6A", "#F0E6C8"]].forEach(function (A, i) { var ad = bsSign(A[0], 1.6, 0.9, A[1], A[2]); var k = i % 2 ? 1 : -1; ad.position.set(cx + k * (Rm.hw - 0.08), 2.0, cz - Rm.hd + 5 + i * 12); ad.rotation.y = k < 0 ? Math.PI / 2 : -Math.PI / 2; g.add(ad); });
bsTrain(g, cx, cz + 6, 0);
shkSpot(cx - 4.0, cz, 2.6, "The train for the City", "look at the engine", function () { bsTale("🚂 The Underground", [], ["A Metropolitan tank engine, built to condense its own steam into tanks on its sides so the tunnels stay clear (they do not, quite), and its train of gas-lit carriages: first, second and third class.", "From here the line runs east under the Marylebone and Euston Roads to King's Cross and the City, and west to Paddington. Holmes and Watson travel by the Underground as far as Aldersgate in The Red-Headed League."], [["up", "Up to Baker Street", "", function () { bsGo("station"); }]]); });
Rm.hello = "<b>Baker Street station,</b> the Metropolitan Railway: two platforms under a brick vault, daylight down the shafts, gas lamps, the smell of coke and steam, and a train standing in.";
},
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "in:" + room : bsbArea(), Lc = worldLocal();
list.forEach(function (T) {
if (!(re ? re.test(T.name || "") : (T.name === name)))
return;
var p = T.p ? bsbLoc(T.p.g) : { x: T.x, z: T.z, y: T.y };
if (!p)
return;
var a = bsbAreaAt(p.x, p.z);
var P = { x: p.x, z: p.z, y: p.y != null ? p.y : 0, area: a };
if (room && a !== here)
return;
P.d = Math.hypot(P.x - Lc.x, P.z - Lc.z);
if (!out || (a === here && (out.area !== here || P.d < out.d)))
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
var W = bsbNamed(SHK.talk, at.who, at.room);
if (W)
return W;
var C0 = BSB_CH[bsbS().ch], d0 = C0 && C0.cast ? C0.cast.filter(function (d) { return d.name === at.who; })[0] : null;
if (d0 && d0.at !== at)
return bsbPos(d0.at);
}
if (at.spot) {
var Sp = bsbNamed(SHK.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.cast) {
var c = BSB.cast[at.cast], q = c && c.g && c.g.parent ? bsbLoc(c.g) : null;
if (q)
return { x: q.x, z: q.z, y: q.y, area: bsbAreaAt(q.x, q.z) };
}
if (at.room)
return bsbRoomPt(at.room, at.lx, at.lz);
if (at.at && BKS_PLACES[at.at]) {
var A = BKS_PLACES[at.at], ax = bsX(A.x + (at.dx || 0)), az = bsZ(A.z + (at.dz || 0));
return { x: ax, z: az, y: shkGround(ax, az, 2), area: "bs" };
}
if (at.x != null) {
var x = bsX(at.x), z = bsZ(at.z);
return { x: x, z: z, y: at.y != null ? at.y : shkGround(x, z, 2), area: bsbAreaAt(x, z), name: at.name };
}
return null;
},
function (P, area) {
if (!P)
return null;
if (P.area === area)
return { show: P, way: "" };
if (area.indexOf("in:") === 0) {
var D = SHK_ROOMS[area.slice(3)];
if (P.area.indexOf("in:") === 0 && D && D.out && D.out === (SHK_ROOMS[P.area.slice(3)] || {}).out)
return { show: bsbRoomExit(), way: " (through the doors)" };
return { show: bsbRoomExit(), way: " (go out)" };
}
var target = P, inn = "";
if (P.area.indexOf("in:") === 0) {
target = bsbRoomDoor((SHK_ROOMS[P.area.slice(3)] || {}).out || P.area.slice(3));
inn = " (go in)";
if (!target)
return { show: null, way: " (the book will take you)" };
}
if (target.area === area)
return { show: target, way: inn };
if (area === "gos") {
var c = DLN_PLACES.cab;
return { show: { x: dlnX(c.x), z: c.z, y: 0, area: "gos" }, way: " (the cab rank: a cab to Baker Street)" };
}
if (area === "kg") {
return { show: { x: kgX(KGN_CAB.x), z: KGN_CAB.z, y: 0, area: "kg" }, way: " (the cab rank on Bayswater Road: a cab to Baker Street)" };
}
if (area === "ws") {
return { show: { x: wsX(WST_CAB.x), z: wsZ(WST_CAB.z), y: 0, area: "ws" }, way: " (the cab rank in Whitehall: a cab to Baker Street)" };
}
return { show: null, way: " (the 🎭 menu: London, 1912)" };
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
return (d >= 1000 ? (d / 1000).toFixed(1) + " km " : Math.round(d) + " m ") + w;
},
function () {
if (BSB.beam && BSB.beam.parent)
return BSB.beam;
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
SHK.G.add(g);
BSB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m, bk = dlnC;
switch (kind) {
case "crust":
m = wBox(0.12, 0.04, 0.08, wM(0xC8964A), 0, 0.02, 0, g);
break;
case "reed":
m = wBox(0.015, 0.5, 0.015, wM(0x9AA860), 0, 0.25, 0, g);
break;
case "twig":
m = wBox(0.02, 0.02, 0.5, wM(0x6A5030), 0, 0.02, 0, g);
break;
case "grass":
m = wBox(0.18, 0.06, 0.18, wM(0x7A9A4A), 0, 0.03, 0, g);
break;
case "mud":
m = wSph(0.1, wM(0x5A4028), 0, 0.05, 0, g, 8);
m.scale.y = 0.5;
break;
case "note":
m = wBox(0.18, 0.06, 0.1, wM(0xF4F0E4), 0, 0.03, 0, g);
break;
case "kite":
m = wBox(0.7, 0.02, 0.9, wM(0xF4F0E8), 0, 0.02, 0, g);
m.rotation.y = 0.7;
break;
case "hoop":
m = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.015, 4, 18), wM(0x8A6A44));
m.rotation.x = Math.PI / 2;
m.position.y = 0.02;
g.add(m);
break;
case "balloon":
m = wSph(0.2, wM(0xD82A2A), 0, 0.5, 0, g, 10);
wBox(0.004, 0.5, 0.004, wM(0xE8E8E8), 0, 0.2, 0, g);
break;
case "spade":
m = wBox(0.12, 0.02, 0.18, wM(0x8A8A90), 0, 0.02, 0, g);
wBox(0.025, 0.025, 0.4, wM(0x8A6A44), 0, 0.02, 0.28, g);
break;
case "letter":
m = wBox(0.16, 0.004, 0.11, wM(0xEAE0C4), 0, 0.01, 0, g);
break;
case "plank":
m = wBox(0.3, 0.02, 0.06, wM(0xC8A878), 0, 0.02, 0, g);
break;
case "brick":
m = wBox(0.08, 0.04, 0.04, wM(0xA84A3A), 0, 0.02, 0, g);
break;
case "seed":
m = wSph(0.03, wM(0x6A4A2A), 0, 0.03, 0, g, 6);
break;
case "rose":
m = wSph(0.05, wM(0xE84A6A), 0, 0.05, 0, g, 8);
break;
case "pail":
m = wCyl(0.1, 0.08, 0.16, wM(0x2A6AA8), 0, 0.08, 0, g, 10);
break;
case "thimble":
m = wCyl(0.012, 0.014, 0.02, wM(0xC8C8C8, { m: 0.8, r: 0.3 }), 0, 0.01, 0, g, 10);
break;
default: m = wSph(0.08, wM(0xE8E0D0, { e: 0x4A4A5A, ei: 0.4 }), 0, 0.12, 0, g, 10);
}
var gl = wGlow(0xE8FFE0, 0.55, 0.5);
gl.position.y = 0.28;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
return g;
},
function (kind, P, name, verb, onTake) {
if (!P)
return null;
var g = bsbItemMesh(kind);
g.position.set(P.x, (P.y || 0) + 0.02, P.z);
SHK.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = shkSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (BSB.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = SHK.spots.indexOf(I.S);
if (j >= 0)
SHK.spots.splice(j, 1);
BSB.items = BSB.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(980, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[bsb] take", e);
}
}, (P.y || 0));
I.S.bsb = 1;
BSB.items.push(I);
return I;
},
function (k) {
if (BSB.tuneKey === k)
return;
BSB.tuneKey = k;
var old = BSB.tune;
BSB.tune = null;
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
if (!k || !BSB_TUNES[k])
return;
try {
var A = new Audio(BSB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
BSB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (BSB.tune !== A) {
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
if (BSB.text)
return fn(BSB.text);
if (BSB.textWait) {
BSB.textWait.push(fn);
return;
}
BSB.textWait = [fn];
var done = function (B) { BSB.text = B; var w = BSB.textWait; BSB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/baker-street/holmes.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
bsbText(function (B) {
var C = BSB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3><div style='max-height:58vh;overflow:auto'>" + T.p.map(bsbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); BSB.readOpen = 0; BSB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = bsbS(), C = BSB_CH[S.ch];
if (!C)
return;
BSB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
BSB.readAsk = 0;
BSB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : (C.src || "Baker Street: the true and the told")) + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:46vh;overflow:auto'>" + (T ? bsbOpening(T).map(bsbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); BSB.readOpen = 0; bsbStepDone(); }, all: function () { bsbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into Baker Street");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Conan Doyle's own words, all of it");
b += bsbKeeperBtns(fns);
worldCard(b, fns);
};
bsbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
BSB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); bsbJump(i); }; });
return b + "</div>";
},
function () {
var b = bsbStep();
bsbItemsClear();
BSB.hold = 0;
BSB.puzOpen = 0;
if (!b)
return;
b._key = bsbKey();
try {
if (b.on)
b.on(bsbS().f);
}
catch (e) {
if (window.console)
console.warn("[bsb] on", e);
}
if (b.k === "read") {
bsbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { BSB.rew[k] = 0; });
if (b.k === "find")
bsbItemAdd(b.item, bsbPos(b.at), b.name, b.verb, function () { if (bsbKey() === b._key)
bsbStepDone(); });
if (b.k === "gather") {
var P = bsbPos(b.at), n = b.n || 3, sp = b.spread || 5, R = wRand(bsbS().ch * 97 + bsbS().s * 13 + 7);
BSB.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
Q.y = shkGround(Q.x, Q.z, (P.y || 0) + 0.5);
bsbItemAdd(b.item, Q, b.name, b.verb, function () { if (bsbKey() !== b._key)
return; BSB.got++; try {
if (b.each)
b.each(BSB.got);
}
catch (e) { } if (BSB.got < n) {
bsbSay((b.eachSay || "Got one.") + " " + BSB.got + " of " + n + ".");
return;
} bsbStepDone(); });
}
}
if (b.h)
bsbSay("<b>" + esc(BSB_CH[bsbS().ch].t) + ".</b> " + b.h);
},
function (b) {
BSB.puzOpen = 1;
BSB.puzT = performance.now();
var k = bsbKey(), fns = {}, h = BSB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
bsbSay(b.yes);
if (bsbKey() === k)
bsbStepDone();
return;
}
bsbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (bsbKey() === k)
BSB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = bsbS(), C = BSB_CH[S.ch], b = bsbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[bsb] done", e);
}
if (b.say)
bsbSay(b.say);
S.s++;
if (window.BSB_LOG)
BSB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= BSB_CH.length - 1) {
S.done = 1;
S.s = 0;
bsbSave();
bsbItemsClear();
bsbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
bsbSave();
var nx = BSB_CH[S.ch];
setTimeout(function () { try {
bsbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[bsb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
bsbSave();
bsbStepBegin();
},
function () {
bsbTune("violin");
var S = bsbS();
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>\"I have oysters and a brace of grouse, with something a little choice in white wines.--Watson, you have never yet recognized my merits as a housekeeper.\"</p><p style='font-size:12px;opacity:.75'>Arthur Conan Doyle, The Sign of the Four (1890)</p><p>You have walked Baker Street with Sherlock Holmes: the rooms taken, the Irregulars called, the red earth and the watch, the King in his mask and the voice in the street, the hat and the goose, and the hunt for the Aurora. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; bsbSave(); bsbChapterBegin(true); } };
b += worldBtn("again", "Walk Baker Street again from the start", "The rooms at 221B");
worldCard(b, fns);
},
function () {
var S = bsbS(), C = BSB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Arthur Conan Doyle · A Study in Scarlet (1887) · The Sign of the Four (1890) · The Adventures of Sherlock Holmes (1892)</div><h3 style='margin:4px 0'>🔎 221B Baker Street</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((bsbStep() || {}).h || "") + "</p>";
else
b += "<p>Two men take rooms together in Baker Street: a doctor home from the war, and a young man who knows a great deal about poisons and nothing about the stars. Walk the street and the house with them, in Conan Doyle's own words: the Irregulars, the red earth, the King in his mask, the hat and the goose, and the hunt down the river. Five chapters.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: the rooms at 221B", S.started ? "Back to where you were" : "\"A couple of comfortable bed-rooms and a single large airy sitting-room\"");
fns.go = function () { worldCard(null); bsbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; bsbSave(); bsbBegin(); };
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += bsbKeeperBtns(fns);
worldCard(b, fns);
},
function (c) {
var C = BSB.cast[c.key];
if (bsbCastLive(C))
return C;
var P = bsbPos(c.at);
if (!P)
return null;
var inside = P.area.indexOf("in:") === 0, parent = inside ? (SHK.rooms[P.area.slice(3)] || {}).live : (c.kind && c.kind !== "person" ? BKS.live : SHK.live);
if (!parent)
return null;
var px = P.x + (c.ox || 0), pz = P.z + (c.oz || 0), py = c.y != null ? c.y : shkGround(px, pz, (P.y || 0) + 0.5) + (c.kind === "person" || !c.kind ? 0.14 : 0), g;
if (!c.kind || c.kind === "person") {
g = dlnPerson("bsb_" + c.key, c.dress, { sex: c.sex, child: !!c.child, inside: inside });
}
else if (c.kind === "thing" && c.make)
g = c.make();
else
g = new THREE.Group();
g.position.set(px, py, pz);
g.rotation.y = c.ry || 0;
if (c.lie) {
g.rotation.x = -Math.PI / 2;
g.position.y += 0.25;
}
parent.add(g);
var Q = { g: g, key: "bsb_" + c.key, wander: c.wander ? { r: c.wander, sp: 0.5 } : null, ground: py };
if (!c.kind || c.kind === "person")
SHK.people.push(Q);
if (c.name) {
var T = { p: Q, name: c.name, r: c.r || (c.kind && c.kind !== "person" ? 2.4 : 3.2), t: { name: c.name, persona: c.persona || BKS_ERA, greet: c.greet || "Hallo." } };
SHK.talk.push(T);
bsbWrapT(T);
}
BSB.cast[c.key] = { g: g, P: Q, c: c };
return BSB.cast[c.key];
},
function () {
var C = BSB_CH[bsbS().ch];
if (!C || !C.cast)
return;
var b = bsbStep() || {}, idx = bsbS().s;
C.cast.forEach(function (c) {
if (c.from != null && idx < c.from)
return;
if (c.until != null && idx >= c.until) {
if (BSB.cast[c.key])
bsbCastHide(c.key);
return;
}
if (bsbCastLive(BSB.cast[c.key]))
return;
var P = bsbPos(c.at);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
if (!SHK.rooms[P.area.slice(3)])
return;
}
else if (bsbDist(P, worldLocal()) > 300 && b.who !== c.name)
return;
bsbPerson(c);
});
},
function (T) {
if (!bsbActive() || !bsZoneNow())
return false;
var b = bsbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = bsbKey();
worldPrompt(null);
var next = function () { if (bsbKey() === k)
bsbStepDone(); };
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
worldCard(BSB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
function (dt) {
if (!SHK.G || !SHK.built)
return;
BSB.wt += dt;
if (BSB.wt > 0.5) {
BSB.wt = 0;
bsbWrap();
if (bsbActive())
bsbCastTick();
}
var cardOpen = WLD.card && WLD.card.style.display === "block", busy = cardOpen || WLD.promptFn || SHK.moving;
if (!bsbActive()) {
if (BSB.beam)
BSB.beam.visible = false;
if (!busy)
worldPrompt("🔎 <b>221B Baker Street</b> · <b>press E</b> to walk the book", bsbOpen);
return;
}
var S = bsbS(), b = bsbStep(), L = worldLocal(), t = SHK.t || 0, area = bsbAreaAt(L.x, L.z);
BSB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? bsbPos(b.at) : null, W = P ? bsbWayTo(P, area) : null, show = W && W.show, way = W ? W.way : "", bm = bsbBeam();
if (show && !SHK.moving) {
bm.visible = true;
var cd = bsbDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
var outside = area.indexOf("in:") !== 0;
bm.userData.col.visible = outside && cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = bsbWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !SHK.moving) {
var inArea = P && P.area === area, fd = P ? bsbDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (BSB.readAsk)
break;
if (!BSB.readOpen)
bsbChapterCard();
else {
BSB.readOpen = 0;
bsbStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null ? true : fd < (b.r || 6))) {
bsbStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
BSB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(BSB.hold, dt);
}
catch (e) { }
if (BSB.hold >= (b.sec || 8)) {
bsbStepDone();
return;
}
}
else
BSB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return BSB.rew[k]; })) {
bsbStepDone();
return;
}
break;
case "until": {
var ok = false;
try {
ok = b.test(S.f);
}
catch (e) { }
if (ok) {
bsbStepDone();
return;
}
break;
}
case "puzzle":
if ((!BSB.puzOpen || performance.now() - (BSB.puzT || 0) > 3000) && (!P || (inArea && fd < (b.r || 6))))
bsbPuzzleCard(b);
break;
}
}
if (!busy)
worldPrompt("🔎 <b>221B Baker Street</b> · <b>press E</b> for the book", bsbOpen);
var C = BSB_CH[S.ch], prog = b && b.k === "hold" && BSB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - BSB.hold)) + " s)" : b && b.k === "gather" ? " (" + (BSB.got || 0) + " of " + (b.n || 3) + ")" : "";
worldBanner("🔎 <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function (x, z) {
if (Math.hypot(x - BKS_CAB.x, z - BKS_CAB.z) < 10)
return "the cab rank, Baker Street";
if (x < -146)
return "the Marylebone Road";
if (x > 150)
return x > 162 ? "Portman Square" : "the corner of Portman Square";
if (x >= -66 && x <= -54)
return "the corner of Dorset Street";
if (x >= 54 && x <= 66)
return "the corner of George Street";
if (x > BKS_STN.x0 - 4 && x < BKS_STN.x1 + 4 && z < -4)
return "Baker Street station";
if (Math.abs(x - BKS_221.x) < 6 && z < -4)
return "before 221B Baker Street";
if (Math.abs(x - BKS_PO.x) < 6)
return z > 0 ? "the post-office, Baker Street" : "the dug-up pavement, Baker Street";
return "Baker Street";
},
function () {
var b = worldBtn("gos", "To Great Ormond Street", "The hospital, Queen Square") + (typeof n14Go === "function" ? worldBtn("n14", "To No. 14, the Darlings' house", "The quiet square in Bloomsbury") : "") +
worldBtn("kg", "To Kensington Gardens", "The Black Lion Gate, Bayswater Road") + (typeof wsmGo === "function" ? worldBtn("ws", "To Westminster", "Whitehall, Big Ben, the Abbey") : "") +
worldBtn("tale", "The hansom cab", "What Holmes says about cabs") + worldBtn("back", "Back to Bankside, 1600", "Three hundred years ago, by Old Father Thames");
worldCard(worldFacts("🎩 A hansom cab", "The rank in Baker Street", [], []) + b, {
gos: function () { worldCard(null); dlnGo("🎩 <b>Great Ormond Street.</b> The cab sets you down at the rank."); },
n14: function () { worldCard(null); n14Go("door"); },
kg: function () { worldCard(null); if (typeof kgnGo === "function")
kgnGo("gate", "🌳 <b>Kensington Gardens.</b> The Black Lion Gate, on the Bayswater Road."); },
ws: function () { worldCard(null); wsmGo("cab"); },
tale: function () { worldCard(null); bsTale("🎩 Cabs", [], ["A hansom is a two-wheeled cab for two, the driver perched up behind with the reins over the roof, the fare talking to him through a trap-door. A shilling a mile.", "Holmes takes cabs everywhere, and never the first one that offers: in The Final Problem he tells Watson never to take the first cab that offers, nor the second."]); },
back: function () { worldCard(null); dlnTo1600(); }
});
},
function () {
try {
var d = document.createElement("div");
d.innerHTML = worldBtn("bs", "🔎 To Baker Street", "221B, the station, and the shops");
var b = d.querySelector("[data-w]");
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); worldCard(null); bsGo("door", "🔎 <b>Baker Street.</b> The cab sets you down before No. 221B: a black door under a fanlight, and up on the first floor, two broad windows."); };
var card = WLD.card, first = card && card.querySelector("[data-w]:not([data-w=close])");
if (first)
first.parentNode.insertBefore(b, first);
else if (card)
card.appendChild(b);
}
catch (e) { }
},
function (k, cx, cz) {
if (k === "bs_hall") {
var b = dlnPerson("bs_billy", "porter", { child: true, sex: "m", inside: true });
b.position.set(cx + 1.6, 0.02, cz + 0.4);
b.rotation.y = -1.8;
SHK.live.add(b);
var PB = { g: b, key: "bs_billy", ground: 0.02 };
SHK.people.push(PB);
SHK.talk.push({ p: PB, name: "Billy, the page", r: 2.4, t: { name: "Billy, the page", persona: "You are Billy, the young page in buttons at 221B Baker Street, who answers the door and carries up the cards, from Arthur Conan Doyle's books. You are sharp and proud of Mr Holmes, and you never tell a visitor more than you should. " + BKS_ERA, greet: "Mr Holmes is upstairs, sir. Shall I take up your card?" } });
return;
}
if (k === "bs_station") {
var R = wRand(77);
for (var i = 0; i < (DLN.lite ? 3 : 8); i++) {
var side = i % 2 ? 1 : -1, who = ["gent", "lady", "worker", "oldgent", "maid", "clergy", "gent", "lady"][i], q = dlnPerson("bs_pass" + i, who, { inside: true });
q.position.set(cx + side * (5.0 + R() * 1.2), 0.92, cz - 24 + i * 6 + R() * 2);
q.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
SHK.live.add(q);
SHK.people.push({ g: q, ground: 0.92 });
}
var pt = dlnPerson("bs_guard", "porter", { inside: true, sex: "m" });
pt.position.set(cx - 5.2, 0.92, cz + 12);
pt.rotation.y = Math.PI;
SHK.live.add(pt);
var PG = { g: pt, key: "bs_guard", ground: 0.92 };
SHK.people.push(PG);
SHK.talk.push({ p: PG, name: "The guard", r: 2.6, t: { name: "The guard", persona: "You are the guard of a Metropolitan Railway train standing at Baker Street, with your flag, whistle and watch. " + BKS_FOLK.porter.persona, greet: "Mind the doors! Train for King's Cross, Farringdon Street and Moorgate Street!" } });
return;
}
if (k !== "bs_kitchen")
return;
var p = dlnPerson("bs_hudson", "landlady", { sex: "f", inside: true });
p.position.set(cx - 0.8, 0.02, cz + 0.4);
p.rotation.y = 0.6;
SHK.live.add(p);
var P = { g: p, key: "bs_hudson", ground: 0.02 };
SHK.people.push(P);
SHK.talk.push({ p: P, name: "Mrs Hudson, in her kitchen", r: 2.6, t: { name: "Mrs Hudson", persona: (typeof BKS_HUDSON !== "undefined" ? BKS_HUDSON : BKS_ERA) + " Just now you are in your kitchen, getting the tray ready for upstairs.", greet: "Oh! You gave me a turn. Mr Holmes's breakfast is nearly ready, if you are going up." } });
},
function (title, quotes, notes, btns, src) {
var b = "<div style='font:600 16px Georgia;color:#FFE7B0'>" + esc(title) + "</div>" + (quotes || []).map(function (k) { var q = PML_Q[k] || k; return "<p style='font:italic 14px/1.55 Georgia;margin:8px 0'>" + esc(q) + "</p>"; }).join("") +
((quotes || []).length ? "<div style='font-size:11px;opacity:.65;margin-top:-2px'>" + esc(src || "Jules Verne, Around the World in Eighty Days (1873), translated by George Makepeace Towle") + "</div>" : "") +
(notes && notes.length ? "<div style='font-size:13px;opacity:.9;line-height:1.5'>" + notes.map(function (n) { return "<p style='margin:5px 0'>" + esc(n) + "</p>"; }).join("") + "</div>" : "");
var fns = {};
(btns || []).forEach(function (B) { b += worldBtn(B[0], B[1], B[2] || ""); fns[B[0]] = function () { worldCard(null); B[3](); }; });
worldCard(b, fns);
PML.read++;
},
function () {
return dlnTex("pmpalazzo", 256, 288, function (x, W, H) {
x.fillStyle = "#E2DCCC";
x.fillRect(0, 0, W, H);
dlnNoise(x, W, H, 1200, 0.12, 81, "110,100,80");
x.strokeStyle = "rgba(120,110,90,.3)";
for (var y = 0; y < H; y += 36) {
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
}
var ww = W * 0.32, wx = (W - ww) / 2, wy = H * 0.24, wh = H * 0.56;
x.fillStyle = "#D6CEBC";
x.fillRect(wx - 18, wy - 12, ww + 36, wh + 24);
x.fillStyle = "#C8BEA8";
x.fillRect(wx - 10, wy - 6, ww + 20, wh + 12);
x.fillStyle = "#EAE4D6";
x.fillRect(wx - 30, wy - 30, ww + 60, 14);
x.beginPath();
x.moveTo(wx - 30, wy - 30);
x.quadraticCurveTo(wx + ww / 2, wy - 62, wx + ww + 30, wy - 30);
x.fill();
x.fillStyle = "rgba(0,0,0,.2)";
x.fillRect(wx - 30, wy - 16, ww + 60, 3);
[wx - 26, wx + ww + 18].forEach(function (cx) { x.fillStyle = "#DCD4C2"; x.fillRect(cx, wy - 16, 8, 30); });
dlnSash(x, wx, wy, ww, wh, 2, 4, "#F2EEE4");
x.fillStyle = "#DCD4C2";
x.fillRect(wx - 22, wy + wh + 8, ww + 44, 12);
x.fillStyle = "#CFC6B2";
for (var b = 0; b < 7; b++)
x.fillRect(wx - 16 + b * (ww + 32) / 7, wy + wh + 20, 8, 18);
x.fillStyle = "#E8E2D4";
x.fillRect(0, H - 14, W, 14);
x.fillStyle = "rgba(0,0,0,.16)";
x.fillRect(0, H - 14, W, 3);
}, 4.4, 5);
},
function () {
return dlnTex("pmattic", 256, 232, function (x, W, H) {
x.fillStyle = "#E0DACA";
x.fillRect(0, 0, W, H);
dlnNoise(x, W, H, 1000, 0.12, 83, "110,100,80");
x.strokeStyle = "rgba(120,110,90,.3)";
for (var y = 0; y < H; y += 36) {
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
}
var ww = W * 0.3, wx = (W - ww) / 2, wy = H * 0.28, wh = H * 0.44;
x.fillStyle = "#CEC6B2";
x.fillRect(wx - 12, wy - 12, ww + 24, wh + 24);
dlnSash(x, wx, wy, ww, wh, 2, 2, "#F2EEE4");
}, 4.4, 4);
},
function () {
return dlnTex("pmstucco", 256, 256, function (x, W, H) {
x.fillStyle = "#EFE6D2";
x.fillRect(0, 0, W, H);
dlnNoise(x, W, H, 700, 0.08, 85, "120,100,70");
x.strokeStyle = "rgba(150,130,100,.25)";
for (var y = 0; y < H; y += 40) {
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
}
var ww = W * 0.34, wx = (W - ww) / 2, wy = H * 0.2, wh = H * 0.6;
x.fillStyle = "#E2D8C2";
x.fillRect(wx - 14, wy - 14, ww + 28, wh + 22);
x.fillStyle = "#F6EEDC";
x.fillRect(wx - 22, wy - 30, ww + 44, 14);
dlnSash(x, wx, wy, ww, wh, 3, 3, "#FAF6EC");
x.fillStyle = "#E6DCC6";
x.fillRect(wx - 18, wy + wh + 6, ww + 36, 8);
}, 4.4, 4.4);
},
function () {
return dlnTex("pmfrieze", 512, 64, function (x, W, H) {
x.fillStyle = "#C8D4DC";
x.fillRect(0, 0, W, H);
var R = wRand(91);
for (var i = 0; i < 26; i++) {
var fx = 8 + i * 19.4;
x.fillStyle = "#F4F2EC";
x.beginPath();
x.ellipse(fx, H * 0.3, 3.4, 4.4, 0, 0, 7);
x.fill();
x.fillRect(fx - 4, H * 0.38, 8, H * 0.36);
if (i % 4 === 1) {
x.beginPath();
x.ellipse(fx + 8, H * 0.55, 11, 6, 0, 0, 7);
x.fill();
}
x.fillRect(fx - 4 + (R() * 3 | 0), H * 0.72, 3, H * 0.2);
x.fillRect(fx + 1, H * 0.72, 3, H * 0.2);
}
x.fillStyle = "rgba(0,0,0,.18)";
x.fillRect(0, 0, W, 3);
x.fillRect(0, H - 3, W, 3);
}, 8, 1);
},
function () {
return dlnTex("pmgothic", 128, 256, function (x, W, H) {
x.fillStyle = "#DCD6C8";
x.fillRect(0, 0, W, H);
dlnNoise(x, W, H, 500, 0.14, 87, "90,80,60");
x.fillStyle = "#B8B0A0";
x.beginPath();
x.moveTo(W * 0.18, H * 0.92);
x.lineTo(W * 0.18, H * 0.4);
x.quadraticCurveTo(W * 0.2, H * 0.14, W * 0.5, H * 0.08);
x.quadraticCurveTo(W * 0.8, H * 0.14, W * 0.82, H * 0.4);
x.lineTo(W * 0.82, H * 0.92);
x.fill();
x.fillStyle = "#8A8478";
x.beginPath();
x.ellipse(W * 0.5, H * 0.42, W * 0.12, H * 0.06, 0, 0, 7);
x.fill();
x.fillRect(W * 0.38, H * 0.48, W * 0.24, H * 0.4);
x.fillStyle = "#EAE4D6";
x.fillRect(0, H * 0.94, W, H * 0.06);
}, 1.2, 3);
},
function (P) {
var X = pmlX, Z = pmlZ, flags = dlnS("flags", 0xFFFFFF), road = dlnS("setts", 0xB0A89C), kerb = dlnS("stone", 0xB8B4AC), R = PML_R;
dlnPlane(P, R.x1 - R.x0 + 80, R.z1 - R.z0 + 80, flags, X((R.x0 + R.x1) / 2), 0.0, Z((R.z0 + R.z1) / 2));
dlnPlane(P, 380, 14, road, X(10), 0.02, Z(0));
dlnPlane(P, 6.4, 104, road, X(107), 0.021, Z(-60));
dlnPlane(P, 196, 6.6, road, X(32), 0.021, Z(-119.6));
dlnPlane(P, 30, 40, road, X(212), 0.021, Z(0));
[[-176, 100], [114, 196]].forEach(function (s) { [-7, 7].forEach(function (z) { dlnBox(P, s[1] - s[0], 0.12, 0.3, kerb, X((s[0] + s[1]) / 2), 0.06, Z(z)); }); });
[103.8, 110.2].forEach(function (x) { dlnBox(P, 0.3, 0.12, 96, kerb, X(x), 0.06, Z(-60)); });
[-116.3, -122.9].forEach(function (z) { dlnBox(P, 186, 0.12, 0.3, kerb, X(32), 0.06, Z(z)); });
[-60, 20, 107].forEach(function (x) { dlnPlane(P, 2.4, 13.6, dlnS("flags", 0xD8D4CC), X(x), 0.025, Z(0)); });
shkFloor(X((R.x0 + R.x1) / 2), Z((R.z0 + R.z1) / 2), (R.x1 - R.x0) / 2 + 40, (R.z1 - R.z0) / 2 + 40, 0);
},
function (P, x0, x1, zf, dir, name, col, goods) {
var X = pmlX, Z = pmlZ, w = x1 - x0, cx = (x0 + x1) / 2, z = zf + dir * 0.22, paint = dlnShine(col, 0.5, 0.1), gilt = dlnShine(0xD8B048, 0.3, 0.85), glass = new THREE.MeshBasicMaterial({ map: bsWinTex(goods || [0xC8A060]), fog: true });
dlnBox(P, w, 3.25, 0.3, paint, X(cx), 1.62, Z(zf + dir * 0.08));
dlnBox(P, w - 1.0, 2.0, 0.06, glass, X(cx), 1.55, Z(z + dir * 0.06));
for (var m = 0, n = Math.max(1, Math.round((w - 1.0) / 1.6)); m <= n; m++)
dlnBox(P, 0.06, 2.0, 0.08, paint, X(x0 + 0.5 + m * (w - 1.0) / n), 1.55, Z(z + dir * 0.08));
dlnBox(P, w - 1.0, 0.5, 0.1, paint, X(cx), 0.3, Z(z + dir * 0.05));
[x0 + 0.2, x1 - 0.2].forEach(function (px) { dlnBox(P, 0.4, 3.25, 0.45, paint, X(px), 1.62, Z(zf + dir * 0.2)); });
var sg = bsSign(name, w - 0.6, 0.55, "#141416", "#E8C860");
sg.position.set(X(cx), 2.95, Z(z + dir * 0.13));
if (dir < 0)
sg.rotation.y = Math.PI;
P.add(sg);
dlnBox(P, w + 0.1, 0.12, 0.5, gilt, X(cx), 3.3, Z(zf + dir * 0.25));
if (goods && !DLN.lite)
for (var k = 0; k < Math.floor((w - 1.2) / 0.5); k++) {
var it = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.22 + (k % 3) * 0.1, 0.2), dlnC(goods[k % goods.length]));
it.position.set(X(x0 + 0.8 + k * 0.5), 0.72 + (k % 3) * 0.05, Z(z - dir * 0.12));
P.add(it);
}
},
function (P, x0, x1, o) {
var X = pmlX, Z = pmlZ, zf = PML_F.s, w = x1 - x0, cx = (x0 + x1) / 2, d = o.d || 28, y = 0, stone = dlnS("stone", o.tint || 0xE8E2D4), back = dlnS("stock", 0xFFFFFF);
o.tiers.forEach(function (T) { dlnFace(P, w, T[1], dlnS(T[0], o.tint || 0xFFFFFF), X(cx), y + T[1] / 2, Z(zf + 0.15)); dlnBox(P, w + 0.2, 0.3, 0.5, stone, X(cx), y + T[1], Z(zf - 0.05)); y += T[1]; });
var h = y;
dlnBox(P, w, h, 0.3, back, X(cx), h / 2, Z(zf + d - 0.15));
[x0 + 0.15, x1 - 0.15].forEach(function (ex) { dlnBox(P, 0.3, h, d, o.ends || stone, X(ex), h / 2, Z(zf + d / 2)); });
dlnBox(P, w + 1.6, o.corn || 1.2, 1.6, stone, X(cx), h + (o.corn || 1.2) / 2, Z(zf - 0.5));
dlnBox(P, w, 0.3, d, dlnC(0x5A5A60), X(cx), h + 0.4, Z(zf + d / 2));
if (o.balus)
for (var bx = x0 + 0.6; bx < x1; bx += DLN.lite ? 1.6 : 0.8)
dlnCyl(P, 0.12, 0.15, 0.8, stone, X(bx), h + (o.corn || 1.2) + 0.4, Z(zf - 0.4), 6);
if (o.frieze) {
var fz = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.6, 1.0), new THREE.MeshLambertMaterial({ map: DLN_CANVAS.pmfrieze() }));
fz.rotation.y = Math.PI;
fz.position.set(X(cx), h - 0.7, Z(zf - 0.02));
P.add(fz);
}
if (o.cols) {
var gr = dlnShine(o.cols, 0.35, 0.2);
for (var c = x0 + 2.2; c < x1 - 1; c += 4.4)
dlnCyl(P, 0.32, 0.36, o.tiers[1][1] - 0.4, gr, X(c), o.tiers[0][1] + o.tiers[1][1] / 2, Z(zf - 0.4), 12);
}
var dx = o.door != null ? o.door : cx;
if (o.porch) {
for (var k = -1; k <= 1; k += 2)
for (var q = 0; q < (o.pair ? 2 : 1); q++)
dlnCyl(P, 0.32, 0.36, 4.6, stone, X(dx + k * (1.9 + q * 0.9)), 2.3, Z(zf - 2.2), 12);
dlnBox(P, o.pair ? 6.4 : 4.6, 0.9, 2.8, stone, X(dx), 5.05, Z(zf - 1.3));
}
dlnBox(P, 2.2, 3.6, 0.2, dlnC(o.doorCol || 0x1A1410), X(dx), 1.8, Z(zf - 0.06));
dlnBox(P, 3.0, 0.5, 0.6, stone, X(dx), 3.9, Z(zf - 0.3));
for (var s = 0; s < 3; s++)
dlnBox(P, 4.2 - s * 0.4, 0.16, 0.9 - s * 0.25, stone, X(dx), 0.08 + s * 0.16, Z(zf - 0.5 - 0.35 + s * 0.12));
if (o.lamps)
[-1.8, 1.8].forEach(function (k) { dlnCyl(P, 0.06, 0.08, 2.6, dlnShine(0x1E2A22, 0.6, 0.5), X(dx + k), 1.3, Z(zf - 1.0), 8); dlnCyl(P, 0.22, 0.14, 0.5, dlnGlow(0xFFE6B0), X(dx + k), 2.85, Z(zf - 1.0), 6); });
shkSolidBox(X(cx), Z(zf + d / 2), w, d, 0);
if (o.porch)
shkSolidBox(X(dx), Z(zf - 1.3), o.pair ? 6.4 : 4.6, 2.8, 0);
if (o.name)
shkSpot(X(dx), Z(zf - (o.porch ? 3.6 : 1.6)), 2.6, o.name, o.verb || "look", o.fn || function () { pmlTale(o.icon + " " + o.name, o.quotes || [], o.notes || []); });
return h;
},
function (P) {
var X = pmlX, Z = pmlZ, F = PML_F, si = 0;
wsmBlock(P, X(-143), Z(F.n - 13), 66, 26, 15, dlnS("georgian", 0xD8C0A4), 0, { roof: 3.4, base: 1.2, door: 0, doorCol: 0x1E2A22 });
shkSpot(X(-143), Z(F.n + 1.8), 3, "The War Office", "look", function () { pmlTale("🎖️ The War Office", [], ["The War Office keeps house in a straggle of old mansions on the north side of Pall Mall, Cumberland House the chief of them, with soldiers and clerks going in and out all day. A great new building was always promised and never begun."]); });
[[-110, 100], [114, 196]].forEach(function (s, k) { dlnTerrace(P, PML_X + s[0], PML_X + s[1], Z(F.n), 1, 4, { tint: [0xE0C4A4, 0xD8BC9C][k] }); });
[[-110, 100], [114, 196]].forEach(function (s) {
var n = Math.max(1, Math.round((s[1] - s[0]) / 10.8)), hw = (s[1] - s[0]) / n;
for (var i = 0; i < n; i++) {
var hx = s[0] + hw * i, door = hx + (i % 2 ? hw - 1.9 : 1.9);
if (DLN.lite && i % 2)
continue;
if (Math.abs(hx - 66.84) < 1 || (i + si) % 4 === 3) {
si++;
continue;
}
var S = PML_SHOPS[si % PML_SHOPS.length];
si++;
if (i % 2)
pmlShop(P, hx + 0.3, door - 1.1, F.n, 1, S[0], S[1], S[2]);
else
pmlShop(P, door + 1.1, hx + hw - 0.3, F.n, 1, S[0], S[1], S[2]);
}
});
pmlShop(P, 69.84, 77.6, F.n, 1, "H. GRAVES · PRINT SELLER · ILLUSTRATED LONDON NEWS", 0x1E2A3A, [0xF4F0E4, 0xE8D8B8, 0x2A2A2A]);
var pt = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.4), new THREE.MeshLambertMaterial({ map: pmlPortraitTex() }));
pt.position.set(X(73.7), 1.6, Z(F.n + 0.36));
P.add(pt);
shkSpot(X(73.7), Z(F.n + 3.4), 2.6, "The print-shop window", "look at the portraits", function () { pmlTale("🖼️ The print-shop window", ["ilnews"], ["Engravings of the famous and the talked-of hang in the window: a bishop, a prize-fighter, the Prince of Wales, and in the middle a calm gentleman with light whiskers, copied from a photograph at the Reform Club."]); });
pmlClub(P, -176, -132, { tiers: [["rustic", 4.2], ["pmstucco", 4.4], ["pmattic", 3.8]], tint: 0xEFE2C8, name: "The Oxford and Cambridge Club", icon: "🎓", notes: ["The club of the two universities, with reliefs of the Muses over its windows: Sir Robert Smirke's building of 1838."] });
pmlClub(P, -130, -84, { tiers: [["rustic", 4.2], ["pmpalazzo", 5], ["pmattic", 3.8]], tint: 0xF0E4D8, cols: 0x8A3A32, balus: true, name: "The Carlton Club", icon: "🏛️", notes: ["The club of the Conservatives, rebuilt in the 1850s after the library of St Mark's at Venice, its front lined with polished red Peterhead granite columns: the newest and showiest front in Pall Mall."] });
pmlClub(P, -82, -28, { tiers: [["rustic", 4.2], ["pmstucco", 4.4]], tint: 0xF2EAD8, corn: 0.9, name: "The Army and Navy Club", icon: "⚓", notes: ["'The Rag', where officers of both services dine. Its Venetian front was finished in 1851."] });
pmlReform(P);
pmlClub(P, 30, 64, { tiers: [["rustic", 4.2], ["pmpalazzo", 5]], tint: 0xF0E6D2, name: "The Travellers Club", icon: "🧭", notes: ["The Travellers, Barry's first palazzo (1832). No man may be a member who has not travelled at least five hundred miles from London in a straight line."] });
var ah = pmlClub(P, 66, 100, { tiers: [["rustic", 4.2], ["pmstucco", 6.2]], tint: 0xF4EEDC, frieze: 1, porch: 1, pair: 1, door: 83, name: "The Athenaeum", icon: "🦉", notes: ["The club of bishops, scientists and men of letters, built by Decimus Burton in 1830, with a copy of the Parthenon's frieze running round under its cornice and a gilt Pallas Athena over the porch.", "Mr Charles Darwin and Mr Charles Dickens were both members."] });
var pal = new THREE.Group();
pal.position.set(X(83), 5.5, Z(F.s - 1.6));
P.add(pal);
var gilt = dlnShine(0xD8B048, 0.3, 0.85);
var robe = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.4, 0), new THREE.Vector2(0.36, 0.6), new THREE.Vector2(0.3, 1.2), new THREE.Vector2(0.2, 1.5)], 10), gilt);
pal.add(robe);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), gilt);
hd.position.y = 1.7;
pal.add(hd);
var sp = dlnCyl(pal, 0.02, 0.02, 2.2, gilt, 0.42, 1.2, 0, 5);
dlnCyl(pal, 0.25, 0.25, 0.06, gilt, -0.36, 0.9, 0.1, 12).rotation.z = Math.PI / 2;
pmlClub(P, 114, 150, { tiers: [["rustic", 4.2], ["pmstucco", 6.2]], tint: 0xF0E8D6, porch: 1, pair: 1, door: 132, balus: true, name: "The United Service Club", icon: "🎖️", notes: ["Nash's club for senior officers of the Army and Navy (1828), with its double porch of columns. Old admirals and generals sit in its windows watching Pall Mall."] });
dlnTerrace(P, PML_X + 152, PML_X + 196, Z(F.s), -1, 4, { tint: 0xDCC0A0 });
pmlShop(P, 155.0, 162.7, F.s, -1, "SOUTH EASTERN RAILWAY · BOOKING OFFICE", 0x2A3A5A, [0xF0E6C8, 0x2A3A5A]);
pmlShop(P, 177.0, 184.7, F.s, -1, "A. DENT · CHRONOMETER MAKER", 0x1A1A22, [0xC8A048, 0xF4F0E4, 0x2A2A2A]);
shkSpot(X(181), Z(F.s - 3.4), 2.4, "The chronometer maker's window", "look", function () { pmlTale("⏱️ Chronometers", ["chronometer"], ["Ships' chronometers in brass-bound boxes, gold watches and regulators: clocks that keep Greenwich time to a second a day at sea. A gentleman who lives by the minute buys his watch here."]); });
for (var lx = -170; lx < 196; lx += DLN.lite ? 36 : 18) {
if (Math.abs(lx - 107) < 8)
continue;
dlnLamp(P, X(lx), Z(-10.6));
dlnLamp(P, X(lx + 9), Z(10.6));
}
dlnPillarBox(P, X(40), Z(-10.2));
dlnTrough(P, X(-40), Z(-7.6));
pmlYork(P);
pmlPalace(P);
},
function (P) {
var X = pmlX, Z = pmlZ, F = PML_F, x0 = PML_RC.x0, x1 = PML_RC.x1;
pmlClub(P, x0, x1, { tiers: [["rustic", 4.4], ["pmpalazzo", 5], ["pmattic", 4]], tint: 0xEAE4D6, corn: 1.6, door: PML_RC.door, lamps: 1, d: 34 });
shkSpot(X(PML_RC.door), Z(F.s - 1.8), 2.6, "The Reform Club", "go in", function () { pmlReformGo(); });
shkSpot(X(PML_RC.door - 9), Z(F.s - 3.6), 2.8, "The front of the Reform", "look", function () { pmlTale("🃏 The Reform Club", ["member", "barings"], ["Built by Sir Charles Barry in 1841 for the Liberals, in the manner of a Roman palace: nine bays of stone, and inside a great saloon under a glass roof, with galleries round it.", "Mr Phileas Fogg comes here every day at the same minute, breakfasts and dines at the same table, reads the Times, the Standard and the Morning Chronicle, plays whist, and goes home at midnight."]); });
},
function (P) {
var X = pmlX, Z = pmlZ, st = dlnS("stone", 0xD8D0C0), gr = dlnS("stone", 0xB8B4AA);
dlnBox(P, 12, 0.2, 24, dlnS("flags", 0xFFFFFF), X(107), 0.02, Z(22));
dlnBox(P, 7, 3, 7, gr, X(107), 1.5, Z(36));
dlnCyl(P, 1.8, 2.0, 30, st, X(107), 3 + 15, Z(36), 20);
dlnBox(P, 4.8, 1.2, 4.8, st, X(107), 33.6, Z(36));
dlnCyl(P, 1.2, 1.4, 2.4, st, X(107), 35.4, Z(36), 14);
var duke = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.9, 0), new THREE.Vector2(0.8, 1.6), new THREE.Vector2(0.6, 3.2), new THREE.Vector2(0.4, 3.6)], 10), dlnShine(0x3A4A3E, 0.55, 0.55));
duke.position.set(X(107), 36.6, Z(36));
P.add(duke);
var dh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), dlnShine(0x3A4A3E, 0.55, 0.55));
dh.position.set(X(107), 40.6, Z(36));
P.add(dh);
dlnRail(P, X(101.5), Z(31), X(112.5), Z(31), 1.2);
shkSolidBox(X(107), Z(36), 8, 8, 0);
dlnPlane(P, 80, 60, dlnS("lawn", 0xFFFFFF), X(107), 0.03, Z(70));
var tr = [];
[-28, -10, 8, 26].forEach(function (dx, i) { if (DLN.lite && i % 2)
return; tr.push({ x: X(107 + dx), z: Z(52 + (i % 2) * 14), h: 15 }); });
dlnPlanes(P, tr, wRand(1872));
shkSpot(X(107), Z(28.6), 3, "The Duke of York's Column", "read the stone", function () { pmlTale("🗼 The Duke of York's Column", [], ["Frederick, Duke of York, Commander-in-Chief of the Army, stands on top in bronze, 124 feet up: put there in 1834, paid for by stopping one day's pay from every soldier. Londoners say he is so high to be out of reach of his creditors.", "Below, the steps go down to the Mall and St James's Park."]); });
},
function (P) {
var X = pmlX, Z = pmlZ, br = dlnS("redbrick", 0xFFFFFF), st = dlnS("stone", 0xD8D0C0), x = -188;
var g = new THREE.Group();
g.position.set(X(x), 0, Z(0));
P.add(g);
dlnBox(g, 6, 14, 13, br, 0, 7, 0);
dlnBox(g, 0.3, 6.4, 4.6, dlnC(0x1A1410), 3.05, 3.2, 0);
var arch = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.3, 0.4, 14, 1, false, 0, Math.PI), dlnC(0x1A1410));
arch.rotation.z = -Math.PI / 2;
arch.rotation.y = Math.PI / 2;
arch.position.set(3.0, 6.4, 0);
g.add(arch);
[-1, 1].forEach(function (k) { dlnCyl(g, 3.0, 3.2, 19, br, 0.5, 9.5, k * 7.6, 8); for (var m = 0; m < 8; m++) {
var a = m / 8 * Math.PI * 2;
dlnBox(g, 0.9, 1.0, 0.5, br, 0.5 + Math.cos(a) * 2.8, 19.5, k * 7.6 + Math.sin(a) * 2.8, -a);
} });
for (var b = -5; b <= 5; b += 1.4)
dlnBox(g, 0.5, 1.0, 0.8, br, 3.0, 14.5, b);
var ck = new THREE.Mesh(new THREE.CircleGeometry(1.4, 24), new THREE.MeshLambertMaterial({ map: pmlClockTex() }));
ck.rotation.y = Math.PI / 2;
ck.position.set(3.2, 11.6, 0);
g.add(ck);
[-1, 1].forEach(function (k) { dlnBox(g, 4, 9, 14, br, 1, 4.5, k * 17); dlnBox(g, 1.2, 2.6, 1.2, dlnC(0x6A1A1A), 5.2, 1.3, k * 5.4); });
shkSolidBox(X(x + 1), Z(0), 8, 46, 0);
shkSpot(X(x + 6), Z(0), 3.4, "St James's Palace", "look", function () { pmlTale("👑 St James's Palace", [], ["Henry VIII's palace, built in the 1530s: its red-brick gatehouse with the two turrets and the clock closes the west end of Pall Mall.", "The Court is still 'the Court of St James's', and ambassadors are sent to it; but the Queen lives at Buckingham Palace across the park, and at Windsor."]); });
},
function () {
return DLN.tex.pmclock || (DLN.tex.pmclock = wTex(128, 128, function (x, W, H) {
x.fillStyle = "#1E2A4A";
x.beginPath();
x.arc(64, 64, 62, 0, 7);
x.fill();
x.strokeStyle = "#D8B048";
x.lineWidth = 4;
x.stroke();
x.fillStyle = "#D8B048";
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2;
x.fillRect(64 + Math.sin(a) * 50 - 2, 64 - Math.cos(a) * 50 - 5, 4, 10);
}
x.lineWidth = 5;
x.beginPath();
x.moveTo(64, 64);
x.lineTo(64, 24);
x.moveTo(64, 64);
x.lineTo(92, 70);
x.stroke();
}));
},
function () {
return DLN.tex.pmport || (DLN.tex.pmport = wTex(160, 200, function (c, W, H) {
c.fillStyle = "#F2EEE2";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#2A2A2A";
c.lineWidth = 3;
c.strokeRect(8, 8, W - 16, H - 16);
c.fillStyle = "#2A2A2E";
c.beginPath();
c.moveTo(W * 0.2, H * 0.88);
c.quadraticCurveTo(W * 0.22, H * 0.56, W * 0.5, H * 0.54);
c.quadraticCurveTo(W * 0.78, H * 0.56, W * 0.8, H * 0.88);
c.fill();
c.fillStyle = "#FAFAF6";
c.beginPath();
c.moveTo(W * 0.44, H * 0.56);
c.lineTo(W * 0.5, H * 0.68);
c.lineTo(W * 0.56, H * 0.56);
c.fill();
c.fillStyle = "#E8D8C8";
c.beginPath();
c.ellipse(W * 0.5, H * 0.4, W * 0.13, H * 0.12, 0, 0, 7);
c.fill();
c.fillStyle = "#C8A870";
c.beginPath();
c.ellipse(W * 0.5, H * 0.3, W * 0.14, H * 0.05, 0, Math.PI, 0);
c.fill();
c.fillRect(W * 0.36, H * 0.36, W * 0.05, H * 0.12);
c.fillRect(W * 0.59, H * 0.36, W * 0.05, H * 0.12);
c.fillStyle = "#2A2A2A";
c.font = "bold 13px Georgia";
c.textAlign = "center";
c.fillText("MR PHILEAS FOGG", W / 2, H * 0.95);
}));
},
function (P) {
var X = pmlX, Z = pmlZ, F = PML_F, st = dlnS("pmstucco", 0xFFFFFF);
wsmBlock(P, X(88), Z(-61), 68, 24, 15.4, st, Math.PI / 2, { roof: 3, base: 3.3, balus: true });
wsmBlock(P, X(126), Z(-61), 68, 24, 15.4, st, -Math.PI / 2, { roof: 3, base: 3.3, balus: true });
for (var lz = -100; lz < -16; lz += DLN.lite ? 28 : 14) {
dlnLamp(P, X(101.6), Z(lz));
dlnLamp(P, X(112.4), Z(lz + 7));
}
var rs = bsSign("REGENT STREET", 3.2, 0.5, "#F2EEE4", "#1A1A1A");
rs.position.set(X(100.85), 3.6, Z(-20));
rs.rotation.y = Math.PI / 2;
P.add(rs);
dlnTerrace(P, PML_X - 64, PML_X + 128, Z(F.rn), 1, 4, { tint: 0xDCC2A2, nums: function (i) { return i + 1; } });
[[-64, 100], [114, 128]].forEach(function (s, k) { dlnTerrace(P, PML_X + s[0], PML_X + s[1], Z(F.rs), -1, 4, { tint: 0xD4B898, nums: function (i) { return k ? 36 - i : 34 - i; } }); });
[[-39.67, -32.3, F.rn, 1], [53.63, 61.0, F.rn, 1], [-17.27, -9.63, F.rs, -1], [70.2, 77.8, F.rs, -1]].forEach(function (s, i) { if (DLN.lite && i % 2)
return; var T = PML_TAILORS[i]; pmlShop(P, s[0], s[1], s[2], s[3], T[0], T[1], T[2]); });
var sr = bsSign("SAVILLE ROW · W.", 3.2, 0.5, "#F2EEE4", "#1A1A1A");
sr.position.set(X(98), 3.6, Z(F.rs - 0.2));
sr.rotation.y = Math.PI;
P.add(sr);
wsmBlock(P, X(-76), Z(-119.5), 36, 24, 16, dlnS("portland", 0xF0EADC), Math.PI / 2, { roof: 4, base: 4, balus: true });
wsmBlock(P, X(140), Z(-119.5), 36, 24, 14, dlnS("georgian", 0xD8C0A4), -Math.PI / 2, { roof: 3, base: 3.3 });
shkSpot(X(-61), Z(-119.5), 3, "Burlington Gardens", "look", function () { pmlTale("🎓 Burlington Gardens", [], ["Across the end of Saville Row stands the new building of the University of London, finished in 1870, with statues of great men along its front: Newton, Bentham, Milton, Harvey and more."]); });
for (var sx = -58; sx < 126; sx += DLN.lite ? 40 : 20) {
dlnLamp(P, X(sx), Z(-112));
dlnLamp(P, X(sx + 10), Z(-127.2));
}
pml7(P);
},
function (P) {
var X = pmlX, Z = pmlZ, z = PML_F.rn, D = PML_7, brass = dlnShine(0xC8A048, 0.3, 0.9);
dlnCyl(P, 0.05, 0.05, 0.04, brass, X(D.x + 0.75), 1.4, Z(z + 0.14), 10).rotation.x = Math.PI / 2;
dlnBox(P, 0.26, 0.06, 0.04, brass, X(D.x), 1.1, Z(z + 0.15));
shkDoor("pm_hall", X(D.x), Z(z + 3.4), "No. 7, Saville Row");
shkSpot(X(D.x + 4.5), Z(z + 5.0), 3.2, "The house of Phileas Fogg", "look at it", function () { pmlTale("🏠 No. 7, Saville Row", ["home", "exact"], ["Saville Row is Verne's spelling; Londoners write Savile Row. Richard Brinsley Sheridan, the playwright of The School for Scandal, did die in this street, in 1816.", "Not sumptuous, but exceedingly comfortable: four storeys of brick, the area railings, the brass bell-pull, and inside one master and one servant who must never be late."]); });
},
function (P) {
var X = pmlX, Z = pmlZ, st = dlnS("stone", 0xE0D8C8), gth = dlnS("pmgothic", 0xFFFFFF);
wsmBlock(P, X(242), Z(0), 80, 26, 22, dlnS("portland", 0xF0E8DA), -Math.PI / 2, { roof: 5, base: 4.4, balus: true });
wsmBlock(P, X(212), Z(-42), 32, 24, 14, dlnS("georgian", 0xD8C0A4), 0, { roof: 3, base: 3.3 });
wsmBlock(P, X(212), Z(42), 32, 24, 14, dlnS("georgian", 0xD4B898), Math.PI, { roof: 3, base: 3.3 });
for (var a = -1; a <= 1; a++) {
dlnBox(P, 0.2, 3.8, 3.0, dlnC(0x2A1E14), X(228.9), 1.9, Z(a * 6));
dlnBox(P, 0.06, 1.2, 2.6, dlnGlow(0xF0D8A0), X(228.85), 4.4, Z(a * 6));
}
var sg = bsSign("CHARING CROSS · SOUTH EASTERN RAILWAY", 26, 1.2, "#2A3A5A", "#F0E6C8");
sg.position.set(X(228.75), 6.3, Z(0));
sg.rotation.y = -Math.PI / 2;
P.add(sg);
var hs = bsSign("CHARING CROSS HOTEL", 14, 1.0, "#F0E6C8", "#2A3A5A");
hs.position.set(X(228.75), 19.0, Z(0));
hs.rotation.y = -Math.PI / 2;
P.add(hs);
var green = dlnShine(0x2A3A4A, 0.5, 0.3);
dlnBox(P, 4, 0.14, 30, green, X(226.8), 4.6, Z(0));
dlnBox(P, 3.8, 0.04, 29.6, new THREE.MeshBasicMaterial({ color: 0xD8E4E8, transparent: true, opacity: 0.35, depthWrite: false }), X(226.8), 4.7, Z(0));
[-14, -5, 5, 14].forEach(function (z) { dlnCyl(P, 0.1, 0.12, 4.6, green, X(225), 2.3, Z(z), 8); });
shkDoor("pm_cx", X(226.4), Z(0), "Charing Cross station: the booking hall");
var g = new THREE.Group();
g.position.set(X(208), 0, Z(0));
P.add(g);
for (var s = 0; s < 3; s++)
dlnCyl(g, 3.4 - s * 0.4, 3.4 - s * 0.4, 0.4, st, 0, 0.2 + s * 0.4, 0, 8);
var t1 = dlnCyl(g, 2.0, 2.0, 5.2, gth, 0, 1.2 + 2.6, 0, 8);
dlnCyl(g, 2.3, 2.3, 0.4, st, 0, 6.6, 0, 8);
for (var p = 0; p < 8; p++) {
var a2 = p / 8 * Math.PI * 2 + Math.PI / 8;
var pn = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.6, 4), st);
pn.position.set(Math.cos(a2) * 2.2, 7.6, Math.sin(a2) * 2.2);
g.add(pn);
var fig = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.26, 1.3, 8), st);
fig.position.set(Math.cos(a2) * 1.15, 7.6, Math.sin(a2) * 1.15);
g.add(fig);
var fh = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), st);
fh.position.set(Math.cos(a2) * 1.15, 8.35, Math.sin(a2) * 1.15);
g.add(fh);
}
dlnCyl(g, 1.4, 1.4, 3.4, gth, 0, 8.5, 0, 8);
dlnCyl(g, 1.6, 1.6, 0.3, st, 0, 10.3, 0, 8);
dlnCyl(g, 0.9, 1.0, 3.0, gth, 0, 11.9, 0, 8);
for (var q = 0; q < 8; q++) {
var a3 = q / 8 * Math.PI * 2;
var pk = new THREE.Mesh(new THREE.ConeGeometry(0.14, 1.3, 4), st);
pk.position.set(Math.cos(a3) * 1.2, 13.9, Math.sin(a3) * 1.2);
g.add(pk);
}
var spire = new THREE.Mesh(new THREE.ConeGeometry(0.9, 6, 8), st);
spire.position.set(0, 16.4, 0);
g.add(spire);
dlnBox(g, 0.14, 1.2, 0.14, st, 0, 20, 0);
dlnBox(g, 0.7, 0.14, 0.14, st, 0, 20.2, 0);
shkSolidBox(X(208), Z(0), 6.8, 6.8, 0);
shkSpot(X(203), Z(0), 3, "The Eleanor Cross", "look", function () { pmlTale("✝️ Charing Cross", [], ["When Queen Eleanor died in 1290, King Edward I set up a stone cross at each place her coffin rested on the way to Westminster Abbey; the last was here, at the village of Charing. Parliament's men pulled it down in 1647.", "This one is new: Edward Middleton Barry's copy, put up in 1865 before his hotel over the station. All distances from London are measured from Charing Cross."]); });
},
function () {
var X = pmlX, Z = pmlZ, live = PML.live, C = PML_CAB, S = PML_SCAB;
for (var r = 0; r < (DLN.lite ? 1 : 3); r++)
dlnHansom(live, X(C.x - 4 - r * 7), Z(C.z), Math.PI / 2);
dlnHansom(live, X(S.x - 4), Z(S.z), Math.PI / 2);
if (!DLN.lite)
dlnHansom(live, X(S.x - 11), Z(S.z), Math.PI / 2);
shkSpot(X(C.x), Z(-3.6), 3.4, "The cab rank", "take a cab", function () { pmlCabCard(); });
shkSpot(X(S.x), Z(-117.6), 3.2, "The cab rank in Saville Row", "take a cab", function () { pmlCabCard(); });
var loop = [[-176, -3.2], [196, -3.2], [196, 3.2], [-176, 3.2], [-176, -3.2]];
PML.loop = loop;
var Ld = 0;
for (var i = 1; i < loop.length; i++)
Ld += Math.hypot(loop[i][0] - loop[i - 1][0], loop[i][1] - loop[i - 1][1]);
PML.loopL = Ld;
var n = DLN.lite ? 2 : 6;
for (var c = 0; c < n; c++) {
var cg = new THREE.Group();
live.add(cg);
dlnHansom(cg, 0, 0, 0);
PML.cabs.push({ g: cg, s: c * Ld / n, sp: 4 + c % 2 });
}
if (typeof kgnBus === "function")
for (var b = 0; b < (DLN.lite ? 1 : 2); b++) {
var bus = kgnBus(true);
live.add(bus);
PML.cabs.push({ g: bus, s: (b + 0.3) * Ld / 2, sp: 2.6 });
}
},
function (k, x, z, ry, o) {
var F = PML_FOLK[k], p = dlnPerson("pm_" + k, F.dress, { sex: F.sex, child: !!F.child });
p.position.set(pmlX(x), 0.02, pmlZ(z));
p.rotation.y = ry || 0;
SHK.live.add(p);
var P = { g: p, key: "pm_" + k, wander: o && o.wander ? { r: o.wander, sp: 0.45 } : null, ground: 0.02 };
SHK.people.push(P);
SHK.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet } });
return P;
},
function (R) {
var X = pmlX, Z = pmlZ, crowd = function (n, x0, x1, z0, z1, kinds, o) {
if (DLN.lite)
n = Math.ceil(n * 0.4);
for (var i = 0; i < n; i++) {
var px = x0 + R() * (x1 - x0), pz = z0 + R() * (z1 - z0);
if (shkSolidAt(X(px), Z(pz), 0))
continue;
var who = kinds[(R() * kinds.length) | 0], p = dlnPerson("pmf" + SHK.people.length + "_" + i, who);
p.position.set(X(px), 0.02, Z(pz));
p.rotation.y = R() * 6.28;
SHK.live.add(p);
SHK.people.push({ g: p, wander: o && o.still ? null : { r: o && o.r || 10, sp: 0.35 + R() * 0.45 }, ground: 0.02 });
}
};
crowd(16, -170, 190, -10.6, -8.0, ["gent", "gent", "lady", "oldgent", "clergy", "gent", "worker", "lady", "newsboy"], { r: 16 });
crowd(16, -170, 190, 8.0, 10.6, ["gent", "gent", "oldgent", "gent", "lady", "clergy", "gent"], { r: 16 });
crowd(5, 102, 112, -100, -20, ["gent", "lady", "maid", "gent"], { r: 20 });
crowd(7, -58, 124, -127, -112.5, ["gent", "maid", "worker", "gent", "lady", "oldgent"], { r: 14 });
crowd(8, 196, 226, -26, 26, ["gent", "porter", "lady", "worker", "porter", "gent", "clergy"], { r: 9 });
pmlNamed("pc", 30, -8.6, Math.PI / 2, { wander: 30 });
pmlNamed("porter", PML_RC.door + 2.2, 10.4, Math.PI);
pmlNamed("sweep", 20, -6.4, 0.4);
pmlNamed("news", 64, -9.2, Math.PI * 0.9);
pmlNamed("flower", -30, 9.6, Math.PI);
pmlNamed("cabman", PML_CAB.x + 1.6, -5.0, -Math.PI / 2);
pmlNamed("broker", PML_PLACES.change.x, -9.6, Math.PI * 0.2);
},
function () {
if (PML.built || !SHK.G)
return;
DLN.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(1872), live0 = SHK.live;
PML.live = new THREE.Group();
PML.live.name = "pm-live";
SHK.G.add(PML.live);
PML.cabs = [];
var all = new THREE.Group();
SHK.G.add(all);
[[pmlGround, "ground"], [pmlStreet, "pall mall"], [pmlSaville, "saville row"], [pmlCharing, "charing cross"]].forEach(function (f) { try {
f[0](all, R);
}
catch (e) {
if (window.console)
console.warn("[pall mall] " + f[1], e);
} });
try {
pmlTraffic();
}
catch (e) {
if (window.console)
console.warn("[pall mall] traffic", e);
}
try {
pmlFolk(R);
}
catch (e) {
if (window.console)
console.warn("[pall mall] folk", e);
}
SHK.G.remove(all);
var g = new THREE.Group();
g.name = "pm-street";
SHK.G.add(g);
all.children.slice().forEach(function (m) { if (m.userData && m.userData.keep) {
PML.live.add(m);
return;
} g.add(m); });
try {
ctnMerge(g);
g.children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) {
if (window.console)
console.warn("[pall mall] bake", e);
}
SHK.dist.push({ n: "pm-street", g: g, x: pmlX(20), z: pmlZ(-50), r: 240 });
SHK.live = live0;
PML.built = true;
},
function (add) {
var g = new THREE.Group(), w = new THREE.Mesh(wfGeo("pmbabyw", function () { return new THREE.SphereGeometry(0.13, 10, 8); }), wfMat(0xB8A890, { r: 0.95 }));
w.scale.set(1, 0.85, 1.8);
g.add(w);
var h = new THREE.Mesh(wfGeo("pmbabyh", function () { return new THREE.SphereGeometry(0.07, 10, 8); }), wfMat(0xE0B898, { r: 0.8 }));
h.position.set(0, 0.06, 0.2);
g.add(h);
add("hand_r", [0, -0.02, 0.1], g);
},
function () {
return dlnTex("pmpaper", 256, 256, function (x, W, H) {
x.fillStyle = "#3E5A4A";
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(216,184,96,.4)";
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
var cx = i * 64 + (j % 2) * 32 + 16, cy = j * 64 + 32;
x.beginPath();
x.ellipse(cx, cy, 9, 18, 0, 0, 7);
x.fill();
x.fillRect(cx - 1, cy - 26, 2, 52);
}
dlnNoise(x, W, H, 300, 0.06, 33);
}, 1.0, 1.0);
},
function () { return dlnTex("pmrose", 256, 256, function (x, W, H) { x.fillStyle = "#F0E2D8"; x.fillRect(0, 0, W, H); var R = wRand(37); for (var i = 0; i < 14; i++) {
var cx = R() * W, cy = R() * H;
x.fillStyle = "rgba(176,72,88,.45)";
x.beginPath();
x.arc(cx, cy, 7, 0, 7);
x.fill();
x.fillStyle = "rgba(90,130,80,.45)";
x.beginPath();
x.ellipse(cx + 10, cy + 6, 6, 3, 0.6, 0, 7);
x.fill();
} }, 0.8, 0.8); },
function () {
return DLN.tex.pmdials || (DLN.tex.pmdials = wTex(256, 320, function (x, W, H) {
x.fillStyle = "#1E140C";
x.fillRect(0, 0, W, H);
x.fillStyle = "#C8A048";
x.fillRect(6, 6, W - 12, H - 12);
x.fillStyle = "#F4EEDC";
x.fillRect(14, 14, W - 28, H - 28);
var dial = function (cx, cy, r, n, lab, hand) {
x.strokeStyle = "#2A1E14";
x.lineWidth = 2;
x.beginPath();
x.arc(cx, cy, r, 0, 7);
x.stroke();
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
x.fillStyle = "#2A1E14";
x.fillRect(cx + Math.sin(a) * (r - 6) - 1, cy - Math.cos(a) * (r - 6) - 3, 2, 6);
}
x.lineWidth = 3;
x.beginPath();
x.moveTo(cx, cy);
x.lineTo(cx + Math.sin(hand) * (r - 10), cy - Math.cos(hand) * (r - 10));
x.stroke();
x.font = "bold 11px Georgia";
x.textAlign = "center";
x.fillText(lab, cx, cy + r + 13);
};
dial(W / 2, 96, 70, 12, "HOURS · MINUTES", 0.6);
dial(52, 214, 28, 60, "SECONDS", 2.2);
dial(128, 214, 28, 7, "DAYS", 4.1);
dial(204, 214, 28, 12, "MONTHS", 5.2);
dial(W / 2, 276, 18, 10, "YEARS", 1.0);
}));
},
function () {
return DLN.tex.pmprog || (DLN.tex.pmprog = wTex(256, 320, function (x, W, H) {
x.fillStyle = "#F6F0E0";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#3A2A1A";
x.lineWidth = 3;
x.strokeRect(8, 8, W - 16, H - 16);
x.fillStyle = "#2A1E14";
x.textAlign = "center";
x.font = "bold 18px Georgia";
x.fillText("No. 7, SAVILLE ROW", W / 2, 40);
x.font = "italic 13px Georgia";
x.fillText("the daily routine", W / 2, 60);
x.textAlign = "left";
x.font = "13px Georgia";
[["8.00", "Mr Fogg rises"], ["8.23", "Tea and toast"], ["9.37", "Shaving-water (86°)"], ["9.40", "The toilet"], ["11.30", "Mr Fogg leaves for the Reform"], ["12.00", "Midnight: he retires"]].forEach(function (r, i) { x.fillText(r[0], 22, 96 + i * 34); x.fillText(r[1], 78, 96 + i * 34); x.fillStyle = "rgba(60,40,20,.3)"; x.fillRect(22, 104 + i * 34, W - 44, 1); x.fillStyle = "#2A1E14"; });
}));
},
function () {
var b = worldBtn("fogg", "Up to Mr Fogg's rooms", "The armchair, the great clock, the numbered wardrobe") + worldBtn("aouda", "Up to the second-floor front room", "Set apart for a guest") +
worldBtn("pass", "Up under the roof: Passepartout's room", "The electric clock, the speaking-tubes, the gas") + worldBtn("hall", "Down to the hall", "");
worldCard(worldFacts("🪜 The stair", "No. 7, Saville Row", [], [PML_Q.snail]) + b, { fogg: function () { worldCard(null); shkGoIn("pm_fogg"); }, aouda: function () { worldCard(null); shkGoIn("pm_aouda"); },
pass: function () { worldCard(null); shkGoIn("pm_pass"); }, hall: function () { worldCard(null); shkGoIn("pm_hall"); } });
},
function (g, x, z, ry) {
var t = new THREE.Group();
t.position.set(x, 0, z);
t.rotation.y = ry || 0;
g.add(t);
var green = dlnShine(0x2A4A34, 0.4, 0.3), black = dlnShine(0x141414, 0.5, 0.3), brass = dlnShine(0xC8A048, 0.3, 0.9), copper = dlnShine(0xB8683A, 0.3, 0.85), teak = dlnShine(0x6A3A1E, 0.5, 0.1), red = dlnC(0x8A1E1A);
dlnBox(t, 2.4, 0.4, 9, black, 0, 0.95, 0);
var boil = dlnCyl(t, 0.8, 0.8, 5.4, green, 0, 2.15, 1.2, 16);
boil.rotation.x = Math.PI / 2;
for (var bd = 0; bd < 4; bd++) {
var band = dlnCyl(t, 0.82, 0.82, 0.08, brass, 0, 2.15, -1.2 + bd * 1.6, 16);
band.rotation.x = Math.PI / 2;
}
dlnCyl(t, 0.28, 0.34, 1.2, black, 0, 3.3, 3.5, 12);
dlnCyl(t, 0.36, 0.3, 0.25, copper, 0, 3.95, 3.5, 12);
dlnCyl(t, 0.32, 0.36, 0.6, brass, 0, 3.1, 1.0, 12);
dlnBox(t, 2.5, 2.0, 1.6, green, 0, 2.2, -2.6);
dlnBox(t, 2.6, 0.12, 2.2, black, 0, 3.25, -2.5);
dlnBox(t, 2.4, 0.3, 0.12, red, 0, 1.0, 4.55);
[-1.15, 1.15].forEach(function (k) { [3.4, 2.0].forEach(function (wz) { var w = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.12, 16), red); w.rotation.z = Math.PI / 2; w.position.set(k, 0.5, wz); t.add(w); }); [0.3, -2.2].forEach(function (wz) { var w = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.12, 20), red); w.rotation.z = Math.PI / 2; w.position.set(k, 1.0, wz); t.add(w); }); });
var tn = new THREE.Group();
tn.position.set(0, 0, -6.4);
t.add(tn);
dlnBox(tn, 2.5, 1.6, 4.6, green, 0, 1.7, 0);
dlnBox(tn, 2.3, 0.4, 3.8, dlnC(0x1A1A1A), 0, 2.7, 0.2);
[-1.1, 1.1].forEach(function (k) { [-1.4, 0, 1.4].forEach(function (wz) { var w = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.12, 14), black); w.rotation.z = Math.PI / 2; w.position.set(k, 0.5, wz); tn.add(w); }); });
for (var c = 0; c < (DLN.lite ? 2 : 4); c++) {
var cg = new THREE.Group();
cg.position.set(0, 0, -14.2 - c * 9.2);
t.add(cg);
dlnBox(cg, 2.6, 2.4, 8.6, teak, 0, 2.0, 0);
var rf = dlnCyl(cg, 1.4, 1.4, 8.7, dlnC(0x3A3A3A), 0, 3.0, 0, 12, false);
rf.rotation.x = Math.PI / 2;
rf.scale.set(1, 1, 0.25);
for (var d = 0; d < 4; d++) {
[-1, 1].forEach(function (k) { dlnBox(cg, 0.04, 1.8, 1.4, dlnShine(0x4A2810, 0.5, 0.1), k * 1.31, 1.95, -3.0 + d * 2.0); dlnBox(cg, 0.05, 0.6, 1.0, dlnGlow(0xF0D8A0), k * 1.32, 2.4, -3.0 + d * 2.0); });
}
if (c < 2)
[-1, 1].forEach(function (k) { var cr = bsSign("1", 0.3, 0.3, "#6A3A1E", "#D8B048"); cr.position.set(k * 1.33, 1.5, -1.0); cr.rotation.y = k * Math.PI / 2; cg.add(cr); });
[-1.0, 1.0].forEach(function (k) { [-2.8, 2.8].forEach(function (wz) { var w = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.12, 14), black); w.rotation.z = Math.PI / 2; w.position.set(k * 1.15, 0.5, wz); cg.add(w); }); });
}
var sm = new THREE.MeshBasicMaterial({ color: 0xE8E8EC, transparent: true, opacity: 0.22, depthWrite: false });
for (var p = 0; p < (DLN.lite ? 2 : 6); p++) {
var s = new THREE.Mesh(new THREE.SphereGeometry(0.7 + p * 0.18, 8, 6), sm);
s.position.set((p % 2 ? 0.4 : -0.4), 4.4 + p * 0.5, 3.4 - p * 0.6);
t.add(s);
}
return t;
},
function (g, cx, cz, R, Rm) {
var h = 3.9, wood = dlnS("oak", 0x4A2E1A), white = dlnC(0xF0ECE0), brass = dlnShine(0xC8A048, 0.3, 0.9);
dlnShell(g, cx, cz, Rm, { floor: dlnS("pmchequer", 0xFFFFFF), wall: dlnS("pmplain", 0xFFFFFF), low: dlnS("oak", 0x3A2414), lowH: 1.0, h: h, ceil: dlnC(0xECE6D8), outName: "The street-door, out to Saville Row", out: function () { pmlGo("door", "🏠 <b>Out in Saville Row.</b> The street-door of No. 7 shuts behind you, double-locked."); } });
var fan = new THREE.Mesh(new THREE.CircleGeometry(0.85, 16, 0, Math.PI), dlnGlow(0xE8D8A8));
fan.position.set(cx, 3.15, cz + Rm.hd - 0.12);
fan.rotation.y = Math.PI;
g.add(fan);
for (var s = 0; s < 18; s++) {
var sy = 0.2 + s * 0.2, sz = cz + 4.4 - s * 0.27;
dlnBox(g, 1.1, 0.05, 0.28, wood, cx - Rm.hw + 0.55, sy, sz);
dlnBox(g, 1.1, sy, 0.26, dlnC(0x2A1A10), cx - Rm.hw + 0.55, sy / 2, sz);
dlnBox(g, 0.7, 0.06, 0.25, dlnC(0x2A3A5A), cx - Rm.hw + 0.55, sy + 0.03, sz);
if (!DLN.lite || s % 2 === 0)
dlnCyl(g, 0.02, 0.02, 0.85, white, cx - Rm.hw + 1.08, sy + 0.45, sz, 5);
}
var rail = dlnBox(g, 0.07, 0.07, 5.8, wood, cx - Rm.hw + 1.08, 2.5, cz + 2.0);
rail.rotation.x = 0.63;
shkSolidBox(cx - Rm.hw + 0.55, cz + 1.6, 1.2, 6.8, 0);
n14Table(g, cx + Rm.hw - 0.4, cz - 0.8, 0.5, 1.2, 0.82, wood);
dlnCyl(g, 0.18, 0.18, 0.02, dlnShine(0xE0E0E4, 0.2, 0.95), cx + Rm.hw - 0.4, 0.86, cz - 0.8, 14);
var lb = dlnBox(g, 0.36, 0.5, 0.24, dlnShine(0x3A2414, 0.4, 0.2), cx + Rm.hw - 0.2, 1.3, cz + 2.4);
dlnBox(g, 0.28, 0.04, 0.02, brass, cx + Rm.hw - 0.33, 1.45, cz + 2.4);
var hs = new THREE.Group();
hs.position.set(cx + Rm.hw - 0.45, 0, cz + 4.0);
g.add(hs);
dlnCyl(hs, 0.05, 0.06, 1.9, wood, 0, 0.95, 0, 8);
dlnCyl(hs, 0.11, 0.11, 0.2, dlnC(0x141414), 0.12, 1.96, 0, 12);
dlnCyl(hs, 0.17, 0.17, 0.02, dlnC(0x141414), 0.12, 1.86, 0, 14);
shkSolid({ x: cx + Rm.hw - 0.45, z: cz + 4.0, r: 0.4 });
var bar = dlnCyl(g, 0.12, 0.12, 0.05, wood, cx + Rm.hw - 0.06, 1.7, cz + 0.8, 14);
bar.rotation.z = Math.PI / 2;
dlnCyl(g, 0.03, 0.03, 2.8, brass, cx - Rm.hw + 0.08, 2.4, cz - 3.2, 6);
var mp = dlnCyl(g, 0.06, 0.03, 0.12, brass, cx - Rm.hw + 0.14, 1.4, cz - 3.2, 10);
mp.rotation.z = Math.PI / 2;
dlnBox(g, 1.0, 2.3, 0.12, dlnS("oak", 0x5A3A22), cx + 0.8, 1.15, cz - Rm.hd + 0.08);
n14Gasolier(g, cx + 0.5, h, cz + 0.6);
shkSpot(cx - Rm.hw + 1.4, cz + 4.0, 2.2, "The stair", "go up", function () { pmlStairs(); });
shkSpot(cx + Rm.hw - 0.8, cz + 2.4, 1.8, "The letter-box", "look inside", function () { var gb = false; try {
var S = pmbS();
gb = S.started && !S.done && S.ch === 3;
}
catch (e) { } pmlTale("✉️ The letter-box", gb ? ["bill"] : [], gb ? ["A long envelope from the gas company, among eighty days of circulars."] : ["Nothing but a circular. Mr Fogg's letters go to the club, and he answers none of them."]); });
shkSpot(cx - Rm.hw + 0.6, cz - 3.2, 1.6, "The speaking-tube", "listen", function () { pmlTale("🔊 The speaking-tube", ["tubes"], ["A brass mouthpiece in the wall with a whistle in it: blow down it, and the whistle sounds at the other end, two floors up. Then you talk, and your voice comes out of the wall upstairs."]); });
Rm.hello = "<b>No. 7, Saville Row: the hall.</b> Black and white marble, the stair, the hat-stand, the letter-box; quiet as a church, and every clock in the house beating the same second.";
},
function (g, cx, cz, R, Rm) {
var h = 3.8, wood = dlnS("oak", 0x5A3418), brass = dlnShine(0xC8A048, 0.3, 0.9);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("pmpaper", 0xFFFFFF), low: dlnS("oak", 0x3A2414), lowH: 0.9, h: h, ceil: dlnC(0xEEE8DA), outName: "The door, down the stair to the hall", out: function () { shkGoIn("pm_hall"); } });
var rug = dlnBox(g, 4.4, 0.02, 3.4, dlnS("n14turkey", 0xFFFFFF), cx - 0.4, 0.01, cz - 0.6);
dlnFireplace(g, cx + Rm.hw - 0.3, cz - 1.0, -Math.PI / 2);
shkSolidBox(cx + Rm.hw - 0.3, cz - 1.0, 0.7, 2.3, 0);
var ck = new THREE.Group();
ck.position.set(cx - 0.6, 0, cz - Rm.hd + 0.35);
g.add(ck);
dlnBox(ck, 1.2, 2.6, 0.5, wood, 0, 1.3, 0);
var face = new THREE.Mesh(new THREE.PlaneGeometry(0.98, 1.22), new THREE.MeshLambertMaterial({ map: pmlDialsTex() }));
face.position.set(0, 1.95, 0.26);
ck.add(face);
dlnBox(ck, 1.3, 0.2, 0.6, wood, 0, 2.7, 0);
var pend = dlnCyl(ck, 0.12, 0.12, 0.03, brass, 0, 0.9, 0.26, 14);
pend.rotation.x = Math.PI / 2;
shkSolidBox(cx - 0.6, cz - Rm.hd + 0.35, 1.3, 0.6, 0);
n14Arm(g, cx - 0.6, cz - Rm.hd + 3.0, Math.PI, 0x2A3A2A);
n14Table(g, cx - 2.2, cz - 0.2, 1.2, 0.8, 0.76, wood, dlnC(0x2A3A2A));
n14Chair(g, cx - 2.2, cz + 0.6, Math.PI, wood);
dlnBox(g, 0.22, 0.06, 0.3, dlnC(0x8A1E1A), cx - 2.0, 0.82, cz - 0.3);
dlnBox(g, 0.2, 0.02, 0.1, dlnC(0xF0ECE4), cx - 2.5, 0.8, cz - 0.1);
dlnCyl(g, 0.02, 0.02, 1.4, dlnC(0x8A2A2A), cx + Rm.hw - 0.1, 1.7, cz + 1.0, 5);
dlnBox(g, 0.08, 0.18, 0.08, brass, cx + Rm.hw - 0.12, 0.95, cz + 1.0);
wsmWin(g, cx - Rm.hw + 0.06, 1.9, cz - 1.6, Math.PI / 2, 1.1, 2.2);
[-1, 1].forEach(function (k) { dlnBox(g, 0.06, 2.3, 0.6, dlnS("oak", 0xD8CCB4), cx - Rm.hw + 0.1, 1.9, cz - 1.6 + k * 0.85); });
var bd = new THREE.Group();
bd.position.set(cx + 2.6, 0, cz + 2.8);
g.add(bd);
dlnBox(bd, 1.4, 0.4, 2.0, dlnC(0xF4F2EC), 0, 0.55, 0);
dlnBox(bd, 1.45, 0.1, 1.5, dlnC(0x2A2A4A), 0, 0.78, 0.25);
dlnBox(bd, 1.45, 1.2, 0.08, wood, 0, 0.8, -1.0);
shkSolidBox(cx + 2.6, cz + 2.8, 1.5, 2.1, 0);
for (var sc = 0; sc < 3; sc++) {
var pn = dlnBox(g, 0.7, 1.8, 0.04, dlnC(0x3A2A1A), cx + 1.2 + sc * 0.66, 0.95, cz + 1.5);
pn.rotation.y = sc % 2 ? 0.3 : -0.3;
}
var ec = dlnBox(g, 0.32, 0.4, 0.18, dlnShine(0x2A1A10, 0.4, 0.2), cx + Rm.hw - 0.2, 1.2, cz + 2.6);
var ef = new THREE.Mesh(new THREE.CircleGeometry(0.12, 16), dlnC(0xF4EEDC));
ef.position.set(cx + Rm.hw - 0.3, 1.24, cz + 2.6);
ef.rotation.y = -Math.PI / 2;
g.add(ef);
n14Ward(g, cx - Rm.hw + 0.4, cz + 2.6, Math.PI / 2, wood, 1.8, 2.3);
for (var n = 0; n < 6; n++) {
var tg = bsSign(String(n + 1), 0.16, 0.12, "#F4F0E4", "#2A1E14");
tg.position.set(cx - Rm.hw + 0.72, 1.0 + n * 0.18, cz + 2.0 + n * 0.22);
tg.rotation.y = Math.PI / 2;
g.add(tg);
}
n14Gasolier(g, cx, h, cz - 0.4);
shkSpot(cx - 0.6, cz - Rm.hd + 1.6, 2.0, "The great clock", "look at its dials", function () { pmlTale("🕰️ The clock", ["clock"], ["Six dials in one case: hours and minutes on the great face, and below it the seconds, the day of the week, the month, and the year. Mr Fogg sits before it every morning until it says half-past eleven, and then he goes."]); });
shkSpot(cx - Rm.hw + 1.2, cz + 2.6, 2.0, "The numbered wardrobe", "open it", function () { pmlTale("👔 The wardrobe", ["wardrobe"], ["Coats, waistcoats and trousers hang in order, each with its number on a little card; the boots below have numbers too. Passepartout lays them out by the calendar."]); });
shkSpot(cx - 2.2, cz + 1.2, 1.8, "Mr Fogg's table", "look", function () { pmlTale("📕 Bradshaw", ["bradshaw"], ["There is no study in this house, and not one book except this: the timetables of every steamer and railway on the Continent."]); });
Rm.hello = "<b>Mr Fogg's rooms.</b> The armchair set squarely before the clock that tells the years; the fire; the numbered wardrobe; the bed behind its screen. No books at all.";
},
function (g, cx, cz, R, Rm) {
var h = 3.0, wood = dlnS("oak", 0x7A5A3A), brass = dlnShine(0xC8A048, 0.3, 0.9), iron = dlnShine(0x1A1A1A, 0.5, 0.5);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("n14stripe", 0xE8E0D0), h: h, ceil: dlnC(0xF2EEE4), outName: "The door, down to the hall", out: function () { shkGoIn("pm_hall"); } });
var bd = new THREE.Group();
bd.position.set(cx - Rm.hw + 0.9, 0, cz - 1.0);
g.add(bd);
dlnBox(bd, 0.95, 0.35, 1.95, dlnC(0xF2EEE4), 0, 0.52, 0);
dlnBox(bd, 1.0, 0.1, 1.5, dlnC(0x6A2A2A), 0, 0.73, 0.2);
[-1, 1].forEach(function (k) { dlnBox(bd, 1.0, 0.06, 0.06, iron, 0, 1.0, k * 0.98); [-0.47, 0.47].forEach(function (x) { dlnCyl(bd, 0.025, 0.025, 1.0, iron, x, 0.5, k * 0.98, 6); }); });
shkSolidBox(cx - Rm.hw + 0.9, cz - 1.0, 1.0, 2.0, 0);
var mt = new THREE.Group();
mt.position.set(cx + 0.6, 0, cz - Rm.hd + 0.25);
g.add(mt);
dlnBox(mt, 1.6, 1.1, 0.35, dlnC(0xE8E4DC), 0, 0.55, 0);
dlnBox(mt, 0.7, 0.7, 0.36, dlnC(0x141414), 0, 0.4, 0.02);
dlnBox(mt, 1.8, 0.08, 0.45, dlnC(0xE8E4DC), 0, 1.14, 0.04);
dlnBox(mt, 0.34, 0.42, 0.18, dlnShine(0x2A1A10, 0.4, 0.2), 0, 1.4, 0);
var ef = new THREE.Mesh(new THREE.CircleGeometry(0.13, 16), dlnC(0xF4EEDC));
ef.position.set(0, 1.44, 0.1);
mt.add(ef);
var pc = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.78), new THREE.MeshLambertMaterial({ map: pmlProgTex() }));
pc.position.set(0, 2.15, -0.1);
mt.add(pc);
shkSolidBox(cx + 0.6, cz - Rm.hd + 0.25, 1.8, 0.5, 0);
dlnBox(g, 0.06, 0.06, 0.4, brass, cx - Rm.hw + 0.2, 1.9, cz + 0.4);
dlnCyl(g, 0.03, 0.04, 0.12, brass, cx - Rm.hw + 0.38, 1.98, cz + 0.4, 8);
var fl = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.18, 8), dlnGlow(0x6AB8FF));
fl.position.set(cx - Rm.hw + 0.38, 2.12, cz + 0.4);
fl.userData.keep = 1;
Rm.live.add(fl);
PML.gas = fl;
fl.visible = pmlGasLit();
var fl2 = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.1, 8), dlnGlow(0xFFE2A0));
fl2.position.set(0, 0.08, 0);
fl.add(fl2);
for (var t = 0; t < 2; t++) {
dlnCyl(g, 0.025, 0.025, 1.4, brass, cx + Rm.hw - 0.08, 2.2, cz + 1.2 + t * 0.3, 6);
var mp = dlnCyl(g, 0.05, 0.025, 0.1, brass, cx + Rm.hw - 0.14, 1.5, cz + 1.2 + t * 0.3, 10);
mp.rotation.z = Math.PI / 2;
}
var bb = bsSign("BELLS · DRAWING RM · BED RM · HALL", 1.0, 0.2, "#2A1E14", "#E8D8A8");
bb.position.set(cx + Rm.hw - 0.06, 2.3, cz + 0.4);
bb.rotation.y = -Math.PI / 2;
g.add(bb);
n14Table(g, cx + Rm.hw - 0.45, cz - 1.6, 0.6, 0.9, 0.78, wood);
dlnCyl(g, 0.15, 0.12, 0.12, dlnC(0xF4F2EC), cx + Rm.hw - 0.45, 0.88, cz - 1.6, 12);
var wt = dlnCyl(g, 0.06, 0.06, 0.025, dlnShine(0xD8D8DC, 0.25, 0.95), cx + Rm.hw - 0.45, 0.8, cz - 1.3, 14);
wsmWin(g, cx - 0.6, 1.7, cz - Rm.hd + 0.06, 0, 0.9, 1.4);
shkSpot(cx + 0.6, cz - Rm.hd + 1.2, 1.8, "The programme over the clock", "read it", function () { pmlTale("📋 The programme of the house", ["programme", "tubes"], ["From eight in the morning, when Mr Fogg rises, to midnight, when he retires, every minute is written down. Passepartout has learned it by heart."]); });
shkSpot(cx - Rm.hw + 0.9, cz + 0.6, 1.6, "The gas burner", "look at it", function () { pmlTale("🔥 The gas burner", pmlGasLit() ? ["gas", "expense"] : [], pmlGasLit() ? ["It has been burning since the night they left: day and night, at Passepartout's own expense."] : ["A plain brass bracket and a fishtail burner. Turned off."]); });
shkSpot(cx + Rm.hw - 0.6, cz + 1.4, 1.6, "The speaking-tubes", "listen", function () { pmlTale("🔊 Bells and tubes", ["tubes"], []); });
Rm.hello = "<b>Passepartout's room,</b> up under the roof: an iron bed, the electric clock on the mantel beating the same second as his master's, the speaking-tubes, and the programme of the house.";
},
function (g, cx, cz, R, Rm) {
var h = 3.4, wood = dlnS("oak", 0x6A3A1E), brass = dlnShine(0xC8A048, 0.3, 0.9);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("pmrose", 0xFFFFFF), h: h, ceil: dlnC(0xF4F0E8), outName: "The door, down to the hall", out: function () { shkGoIn("pm_hall"); } });
dlnBox(g, 4.4, 0.02, 3.6, dlnS("n14turkey", 0xFFFFFF), cx, 0.01, cz - 0.6);
var bd = new THREE.Group();
bd.position.set(cx - Rm.hw + 1.0, 0, cz - Rm.hd + 1.3);
g.add(bd);
dlnBox(bd, 1.5, 0.45, 2.0, dlnC(0xF6F2EA), 0, 0.55, 0);
dlnBox(bd, 1.55, 0.1, 1.5, dlnC(0x7A1A2A), 0, 0.82, 0.25);
[-0.72, 0.72].forEach(function (x) { [-0.95, 0.95].forEach(function (z) { dlnCyl(bd, 0.04, 0.04, 2.3, wood, x, 1.15, z, 8); }); });
dlnBox(bd, 1.55, 0.12, 2.0, dlnC(0x7A1A2A), 0, 2.3, 0);
dlnBox(bd, 0.04, 1.6, 1.9, dlnC(0xD8B048), -0.76, 1.5, 0);
shkSolidBox(cx - Rm.hw + 1.0, cz - Rm.hd + 1.3, 1.6, 2.1, 0);
dlnFireplace(g, cx + Rm.hw - 0.3, cz - 0.6, -Math.PI / 2);
shkSolidBox(cx + Rm.hw - 0.3, cz - 0.6, 0.7, 2.3, 0);
n14Arm(g, cx + Rm.hw - 1.6, cz - 1.9, -Math.PI * 0.75, 0x5A2A3A);
n14Arm(g, cx + Rm.hw - 1.6, cz + 0.7, -Math.PI * 0.25, 0x2A3A2A);
var dt = new THREE.Group();
dt.position.set(cx - Rm.hw + 0.35, 0, cz + 1.6);
dt.rotation.y = Math.PI / 2;
g.add(dt);
dlnBox(dt, 1.1, 0.75, 0.5, wood, 0, 0.38, 0);
dlnBox(dt, 0.7, 0.9, 0.05, dlnShine(0xE0E4E8, 0.1, 0.95), 0, 1.25, -0.2);
shkSolidBox(cx - Rm.hw + 0.35, cz + 1.6, 0.6, 1.2, 0);
dlnCyl(g, 0.06, 0.1, 0.3, brass, cx - Rm.hw + 0.35, 0.9, cz + 1.3, 10);
var lf = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 6), dlnGlow(0xFFD890));
lf.position.set(cx - Rm.hw + 0.35, 1.08, cz + 1.3);
g.add(lf);
wsmWin(g, cx + 0.4, 1.8, cz - Rm.hd + 0.06, 0, 1.1, 2.0);
n14Gasolier(g, cx, h, cz);
for (var v = 0; v < 5; v++) {
var fl = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), dlnC([0xE8E0F0, 0xD84A6A, 0xF4D84A][v % 3]));
fl.position.set(cx + Rm.hw - 0.25 + ((v % 2) * 0.06), 1.62 + v * 0.02, cz - 1.3 + v * 0.12);
g.add(fl);
}
shkSpot(cx - Rm.hw + 0.9, cz + 1.6, 1.6, "The brass lamp", "look", function () { pmlTale("🪔 A lamp from Bombay", [], ["A little brass lamp, the one thing of her own that came with her from India, bought in the bazaar at Bombay: a young Parsee lady, educated in the English manner, rescued by Mr Fogg and Passepartout from a terrible death in the forest of Bundelcund."]); });
Rm.hello = "<b>The second-floor front room,</b> set apart for a guest: the curtained bed, the fire with a chair either side, a dressing-table, flowers, and a little brass lamp.";
},
function (g, cx, cz, R, Rm) {
var h = 8, brick = dlnS("stock", 0xFFFFFF), stone = dlnS("stone", 0xD8D0C0), wood = dlnS("oak", 0x6A4A2A), iron = dlnShine(0x2A3A4A, 0.5, 0.4);
dlnShell(g, cx, cz, Rm, { floor: dlnS("bsflag", 0xFFFFFF), wall: brick, h: h, ceil: false, outName: "Out to the forecourt and the Cross", out: function () { pmlGo("station", "🚂 <b>Out of Charing Cross station.</b> The Eleanor Cross before you, and the Strand roaring beyond."); } });
var bz = cz + Rm.hd - 10, ox = cx - Rm.hw + 4.8, lw = 2.8, rw = Rm.hw * 2 - 6.8;
dlnBox(g, lw, h, 0.4, stone, cx - Rm.hw + lw / 2, h / 2, bz - 0.2);
dlnBox(g, rw, h, 0.4, stone, cx + Rm.hw - rw / 2, h / 2, bz - 0.2);
dlnBox(g, 4, h - 4.5, 0.4, stone, ox, 4.5 + (h - 4.5) / 2, bz - 0.2);
shkSolidBox(cx - Rm.hw + lw / 2, bz - 0.2, lw, 0.5, 0);
shkSolidBox(cx + Rm.hw - rw / 2, bz - 0.2, rw, 0.5, 0);
var ar = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 0.5, 16, 1, false, 0, Math.PI), stone);
ar.rotation.x = Math.PI / 2;
ar.rotation.z = Math.PI / 2;
ar.position.set(ox, 4.5, bz - 0.2);
g.add(ar);
for (var w = 0; w < 4; w++) {
var wx = cx - Rm.hw + 2 + w * 2.2;
dlnBox(g, 1.6, 1.4, 0.1, dlnC(0x1A1410), wx, 1.6, cz + Rm.hd - 0.25);
dlnBox(g, 1.2, 0.8, 0.06, dlnGlow(0xF0D8A0), wx, 1.75, cz + Rm.hd - 0.32);
var ws = bsSign(["FIRST CLASS", "FIRST CLASS", "SECOND", "THIRD"][w], 1.4, 0.24, "#2A3A5A", "#F0E6C8");
ws.position.set(wx, 2.6, cz + Rm.hd - 0.32);
ws.rotation.y = Math.PI;
g.add(ws);
}
var bo = bsSign("BOOKING OFFICE · DOVER · FOLKESTONE · PARIS", 8, 0.5, "#2A3A5A", "#F0E6C8");
bo.position.set(cx - Rm.hw + 5.3, 3.3, cz + Rm.hd - 0.32);
bo.rotation.y = Math.PI;
g.add(bo);
var bk = new THREE.Group();
bk.position.set(cx + Rm.hw - 1.2, 0, cz + Rm.hd - 5);
g.add(bk);
dlnBox(bk, 1.6, 1.0, 3.4, wood, 0, 0.5, 0);
for (var q = 0; q < 10; q++)
dlnBox(bk, 0.25, 0.03, 0.32, dlnC([0xF4F0E4, 0xC83A2A, 0x2A4A8A][q % 3]), -0.4 + (q % 2) * 0.5, 1.02 + ((q / 2) | 0) * 0.01, -1.4 + ((q / 2) | 0) * 0.6);
dlnBox(bk, 1.8, 0.14, 3.6, dlnC(0x2A4A2A), 0, 2.6, 0);
shkSolidBox(cx + Rm.hw - 1.2, cz + Rm.hd - 5, 1.8, 3.6, 0);
var bks = bsSign("BOOKSTALL · NEWSPAPERS", 3.2, 0.4, "#2A4A2A", "#F0E6C8");
bks.position.set(cx + Rm.hw - 2.05, 2.9, cz + Rm.hd - 5);
bks.rotation.y = -Math.PI / 2;
g.add(bks);
bz -= 0.4;
var pz0 = cz - Rm.hd, pl = bz - pz0, pc = (bz + pz0) / 2;
dlnBox(g, 9.6, 0.9, pl, stone, cx - Rm.hw + 4.8, 0.45, pc);
dlnBox(g, 0.3, 0.05, pl, dlnC(0xE8E4D8), cx - Rm.hw + 9.45, 0.92, pc);
shkFloor(cx - Rm.hw + 4.8, pc, 4.8, pl / 2, 0.9);
dlnBox(g, 8.2, 0.6, pl, dlnC(0x2A2420), cx + 0.7, 0.3, pc);
[-1.2, 2.6].forEach(function (tx) {
for (var sl = pz0 + 1; sl < bz; sl += DLN.lite ? 1.4 : 0.7)
dlnBox(g, 2.4, 0.06, 0.22, dlnC(0x4A3A2A), cx + tx, 0.62, sl);
[-0.72, 0.72].forEach(function (k) { dlnBox(g, 0.08, 0.1, pl, dlnShine(0x8A8A90, 0.3, 0.9), cx + tx + k, 0.66, pc); });
});
dlnBox(g, 8.2, 0.9, pl, stone, cx + 8.9, 0.45, pc);
dlnBox(g, 0.3, 0.05, pl, dlnC(0xE8E4D8), cx + 4.95, 0.92, pc);
shkSolidBox(cx + 4.8, pc, Rm.hw * 2 - 9.6, pl, 0);
for (var st = 0; st < 4; st++) {
var sz = bz + 2.0 - st * 0.4, sy = 0.22 + st * 0.22;
dlnBox(g, 4, sy, 0.4, stone, ox, sy / 2, sz);
shkFloor(ox, sz, 2, 0.2, sy);
}
shkFloor(ox, bz + 0.35, 2, 0.55, 0.9);
dlnBox(g, 4, 0.9, 0.7, stone, ox, 0.45, bz + 0.35);
[-1, 1].forEach(function (k) { shkSolidBox(ox + k * 2.15, bz + 1.2, 0.3, 2.2, 0); });
var rr = Rm.hw + 0.4;
for (var a = pz0 + 3; a < bz; a += DLN.lite ? 12 : 6) {
var rib = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.18, 4, 20, Math.PI), iron);
rib.position.set(cx, h - 1, a);
g.add(rib);
}
var glass = new THREE.Mesh(new THREE.CylinderGeometry(rr, rr, pl, 20, 1, true, -Math.PI / 2, Math.PI), new THREE.MeshBasicMaterial({ color: 0xC8D4DC, transparent: true, opacity: 0.32, side: THREE.DoubleSide, depthWrite: false }));
glass.rotation.x = Math.PI / 2;
glass.rotation.y = Math.PI;
glass.position.set(cx, h - 1, pc);
g.add(glass);
for (var lp = pz0 + 4; lp < bz - 2; lp += 8) {
dlnCyl(g, 0.07, 0.09, 3.2, iron, cx - Rm.hw + 8.6, 2.5, lp, 8);
dlnCyl(g, 0.22, 0.14, 0.5, dlnGlow(0xFFE6B0), cx - Rm.hw + 8.6, 4.3, lp, 6);
dlnBench(g, cx - Rm.hw + 1.2, lp + 2, Math.PI / 2);
}
var cl = new THREE.Mesh(new THREE.CircleGeometry(0.7, 24), new THREE.MeshLambertMaterial({ map: pmlClockTex() }));
cl.position.set(cx - Rm.hw + 4.8, 5.2, bz - 0.75);
cl.rotation.y = Math.PI;
g.add(cl);
var cl2 = cl.clone();
cl2.rotation.y = 0;
cl2.position.z = bz - 0.65;
g.add(cl2);
[["DOVER · CALAIS · PARIS", "#2A3A5A", "#F0E6C8"], ["THE CONTINENTAL MAIL", "#A8201E", "#F8F0E0"], ["SOUTH EASTERN RAILWAY", "#2A4A30", "#F0E6C8"]].forEach(function (A, i) { var ad = bsSign(A[0], 3, 0.6, A[1], A[2]); ad.position.set(cx - Rm.hw + 0.08, 2.6, pz0 + 8 + i * 16); ad.rotation.y = Math.PI / 2; g.add(ad); });
var bar = new THREE.Group();
bar.position.set(cx - Rm.hw + 3.2, 0.9, bz - 12);
g.add(bar);
dlnBox(bar, 1.0, 0.1, 1.8, wood, 0, 0.5, 0);
dlnBox(bar, 0.8, 0.5, 0.6, dlnShine(0x3A2A1A, 0.6, 0.2), 0, 0.8, -0.4);
dlnBox(bar, 0.6, 0.4, 0.5, dlnC(0x5A3A22), 0, 0.75, 0.4);
[-0.5, 0.5].forEach(function (k) { var wl = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.08, 12), dlnC(0x2A1E14)); wl.rotation.z = Math.PI / 2; wl.position.set(k, 0.25, 0.5); bar.add(wl); });
shkSolidBox(cx - Rm.hw + 3.2, bz - 12, 1.1, 1.9, 0);
pmlTrain(g, cx - 1.2, cz - 26, Math.PI);
shkSpot(cx - Rm.hw + 3.6, cz + Rm.hd - 2.2, 2.2, "The booking office", "buy a ticket", function () { pmlTale("🎫 The booking office", [], ["First class to Paris by Dover and Calais: two pounds eighteen shillings, and the mail train leaves at a quarter before nine in the evening. The tickets are little cards of pasteboard, printed and dated in a press by the window."]); });
shkSpot(cx - Rm.hw + 8.0, cz - 14, 2.6, "The Dover mail", "look at the train", function () { pmlTale("🚂 The Continental mail", [], ["A South Eastern express engine, polished green and brass with a copper-capped chimney, its tender piled with coal, and four carriages: the mail van and three of first class, the doors with the company's crest. From Charing Cross over the river, through Sydenham and the hop-gardens of Kent, to the boat at Dover."]); });
shkSpot(cx + Rm.hw - 2.4, cz + Rm.hd - 5, 2.0, "The bookstall", "look", function () { pmlTale("📚 The bookstall", [], ["Newspapers, railway novels in yellow covers, Bradshaw's guide, and this week the Illustrated London News: everyone on the platform is reading about the wager made at the Reform."]); });
Rm.hello = "<b>Charing Cross station.</b> The booking hall, its ticket windows lit, and through the arch the platform under the great curved roof of iron and glass, the mail train standing in for Dover.";
},
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "in:" + room : pmbArea(), Lc = worldLocal();
list.forEach(function (T) {
if (!(re ? re.test(T.name || "") : (T.name === name)))
return;
var p = T.p ? pmbLoc(T.p.g) : { x: T.x, z: T.z, y: T.y };
if (!p)
return;
var a = pmbAreaAt(p.x, p.z);
var P = { x: p.x, z: p.z, y: p.y != null ? p.y : 0, area: a };
if (room && a !== here)
return;
P.d = Math.hypot(P.x - Lc.x, P.z - Lc.z);
if (!out || (a === here && (out.area !== here || P.d < out.d)))
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
var W = pmbNamed(SHK.talk, at.who, at.room);
if (W)
return W;
var C0 = PMB_CH[pmbS().ch], d0 = C0 && C0.cast ? C0.cast.filter(function (d) { return d.name === at.who; })[0] : null;
if (d0 && d0.at !== at)
return pmbPos(d0.at);
}
if (at.spot) {
var Sp = pmbNamed(SHK.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.cast) {
var c = PMB.cast[at.cast], q = c && c.g && c.g.parent ? pmbLoc(c.g) : null;
if (q)
return { x: q.x, z: q.z, y: q.y, area: pmbAreaAt(q.x, q.z) };
}
if (at.room)
return pmbRoomPt(at.room, at.lx, at.lz);
if (at.at && PML_PLACES[at.at]) {
var A = PML_PLACES[at.at], ax = pmlX(A.x + (at.dx || 0)), az = pmlZ(A.z + (at.dz || 0));
return { x: ax, z: az, y: shkGround(ax, az, 2), area: "pm" };
}
if (at.x != null) {
var x = pmlX(at.x), z = pmlZ(at.z);
return { x: x, z: z, y: at.y != null ? at.y : shkGround(x, z, 2), area: pmbAreaAt(x, z), name: at.name };
}
return null;
},
function (P, area) {
if (!P)
return null;
if (P.area === area)
return { show: P, way: "" };
if (area.indexOf("in:") === 0) {
var D = SHK_ROOMS[area.slice(3)];
if (P.area.indexOf("in:") === 0 && D && D.out && D.out === (SHK_ROOMS[P.area.slice(3)] || {}).out)
return { show: pmbRoomExit(), way: " (through the doors)" };
return { show: pmbRoomExit(), way: " (go out)" };
}
var target = P, inn = "";
if (P.area.indexOf("in:") === 0) {
target = pmbRoomDoor((SHK_ROOMS[P.area.slice(3)] || {}).out || P.area.slice(3));
inn = " (go in)";
if (!target)
return { show: null, way: " (the book will take you)" };
}
if (target.area === area)
return { show: target, way: inn };
if (area === "gos") {
var c = DLN_PLACES.cab;
return { show: { x: dlnX(c.x), z: c.z, y: 0, area: "gos" }, way: " (the cab rank: a cab to Pall Mall)" };
}
if (area === "kg") {
return { show: { x: kgX(KGN_CAB.x), z: KGN_CAB.z, y: 0, area: "kg" }, way: " (the cab rank on Bayswater Road: a cab to Pall Mall)" };
}
if (area === "ws") {
return { show: { x: wsX(WST_CAB.x), z: wsZ(WST_CAB.z), y: 0, area: "ws" }, way: " (the cab rank in Whitehall: a cab to Pall Mall)" };
}
if (area === "bs") {
return { show: { x: bsX(BKS_CAB.x), z: bsZ(BKS_CAB.z), y: 0, area: "bs" }, way: " (the cab rank in Baker Street: a cab to Pall Mall)" };
}
return { show: null, way: " (the 🎭 menu: London, 1912)" };
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
return (d >= 1000 ? (d / 1000).toFixed(1) + " km " : Math.round(d) + " m ") + w;
},
function () {
if (PMB.beam && PMB.beam.parent)
return PMB.beam;
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
SHK.G.add(g);
PMB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m, bk = dlnC;
switch (kind) {
case "crust":
m = wBox(0.12, 0.04, 0.08, wM(0xC8964A), 0, 0.02, 0, g);
break;
case "reed":
m = wBox(0.015, 0.5, 0.015, wM(0x9AA860), 0, 0.25, 0, g);
break;
case "twig":
m = wBox(0.02, 0.02, 0.5, wM(0x6A5030), 0, 0.02, 0, g);
break;
case "grass":
m = wBox(0.18, 0.06, 0.18, wM(0x7A9A4A), 0, 0.03, 0, g);
break;
case "mud":
m = wSph(0.1, wM(0x5A4028), 0, 0.05, 0, g, 8);
m.scale.y = 0.5;
break;
case "note":
m = wBox(0.18, 0.06, 0.1, wM(0xF4F0E4), 0, 0.03, 0, g);
break;
case "kite":
m = wBox(0.7, 0.02, 0.9, wM(0xF4F0E8), 0, 0.02, 0, g);
m.rotation.y = 0.7;
break;
case "hoop":
m = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.015, 4, 18), wM(0x8A6A44));
m.rotation.x = Math.PI / 2;
m.position.y = 0.02;
g.add(m);
break;
case "balloon":
m = wSph(0.2, wM(0xD82A2A), 0, 0.5, 0, g, 10);
wBox(0.004, 0.5, 0.004, wM(0xE8E8E8), 0, 0.2, 0, g);
break;
case "spade":
m = wBox(0.12, 0.02, 0.18, wM(0x8A8A90), 0, 0.02, 0, g);
wBox(0.025, 0.025, 0.4, wM(0x8A6A44), 0, 0.02, 0.28, g);
break;
case "letter":
m = wBox(0.16, 0.004, 0.11, wM(0xEAE0C4), 0, 0.01, 0, g);
break;
case "plank":
m = wBox(0.3, 0.02, 0.06, wM(0xC8A878), 0, 0.02, 0, g);
break;
case "brick":
m = wBox(0.08, 0.04, 0.04, wM(0xA84A3A), 0, 0.02, 0, g);
break;
case "seed":
m = wSph(0.03, wM(0x6A4A2A), 0, 0.03, 0, g, 6);
break;
case "rose":
m = wSph(0.05, wM(0xE84A6A), 0, 0.05, 0, g, 8);
break;
case "pail":
m = wCyl(0.1, 0.08, 0.16, wM(0x2A6AA8), 0, 0.08, 0, g, 10);
break;
case "shirt":
m = wBox(0.32, 0.06, 0.26, wM(0xF8F6F0), 0, 0.03, 0, g);
wBox(0.1, 0.02, 0.04, wM(0xFAFAF6), 0, 0.07, 0.1, g);
break;
case "bond":
m = wBox(0.22, 0.004, 0.15, wM(0xE8DCB8), 0, 0.01, 0, g);
wBox(0.18, 0.005, 0.03, wM(0x6A4A2A), 0, 0.012, -0.04, g);
break;
case "thimble":
m = wCyl(0.012, 0.014, 0.02, wM(0xC8C8C8, { m: 0.8, r: 0.3 }), 0, 0.01, 0, g, 10);
break;
default: m = wSph(0.08, wM(0xE8E0D0, { e: 0x4A4A5A, ei: 0.4 }), 0, 0.12, 0, g, 10);
}
var gl = wGlow(0xE8FFE0, 0.55, 0.5);
gl.position.y = 0.28;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
return g;
},
function (kind, P, name, verb, onTake) {
if (!P)
return null;
var g = pmbItemMesh(kind);
g.position.set(P.x, (P.y || 0) + 0.02, P.z);
SHK.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = shkSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (PMB.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = SHK.spots.indexOf(I.S);
if (j >= 0)
SHK.spots.splice(j, 1);
PMB.items = PMB.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(980, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[pmb] take", e);
}
}, (P.y || 0));
I.S.pmb = 1;
PMB.items.push(I);
return I;
},
function (k) {
if (PMB.tuneKey === k)
return;
PMB.tuneKey = k;
var old = PMB.tune;
PMB.tune = null;
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
if (!k || !PMB_TUNES[k])
return;
try {
var A = new Audio(PMB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
PMB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (PMB.tune !== A) {
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
if (PMB.text)
return fn(PMB.text);
if (PMB.textWait) {
PMB.textWait.push(fn);
return;
}
PMB.textWait = [fn];
var done = function (B) { PMB.text = B; var w = PMB.textWait; PMB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/pall-mall/eighty-days.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
pmbText(function (B) {
var C = PMB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3><div style='max-height:58vh;overflow:auto'>" + T.p.map(pmbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); PMB.readOpen = 0; PMB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = pmbS(), C = PMB_CH[S.ch];
if (!C)
return;
PMB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
PMB.readAsk = 0;
PMB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : (C.src || "Pall Mall: the true and the told")) + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:46vh;overflow:auto'>" + (T ? pmbOpening(T).map(pmbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); PMB.readOpen = 0; pmbStepDone(); }, all: function () { pmbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into Pall Mall");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Verne's own words, all of it");
b += pmbKeeperBtns(fns);
worldCard(b, fns);
};
pmbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
PMB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); pmbJump(i); }; });
return b + "</div>";
},
function () {
var b = pmbStep();
pmbItemsClear();
PMB.hold = 0;
PMB.puzOpen = 0;
if (!b)
return;
b._key = pmbKey();
try {
if (b.on)
b.on(pmbS().f);
}
catch (e) {
if (window.console)
console.warn("[pmb] on", e);
}
if (b.k === "read") {
pmbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { PMB.rew[k] = 0; });
if (b.k === "find")
pmbItemAdd(b.item, pmbPos(b.at), b.name, b.verb, function () { if (pmbKey() === b._key)
pmbStepDone(); });
if (b.k === "gather") {
var P = pmbPos(b.at), n = b.n || 3, sp = b.spread || 5, R = wRand(pmbS().ch * 97 + pmbS().s * 13 + 7);
PMB.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
Q.y = shkGround(Q.x, Q.z, (P.y || 0) + 0.5);
pmbItemAdd(b.item, Q, b.name, b.verb, function () { if (pmbKey() !== b._key)
return; PMB.got++; try {
if (b.each)
b.each(PMB.got);
}
catch (e) { } if (PMB.got < n) {
pmbSay((b.eachSay || "Got one.") + " " + PMB.got + " of " + n + ".");
return;
} pmbStepDone(); });
}
}
if (b.h)
pmbSay("<b>" + esc(PMB_CH[pmbS().ch].t) + ".</b> " + b.h);
},
function (b) {
PMB.puzOpen = 1;
PMB.puzT = performance.now();
var k = pmbKey(), fns = {}, h = PMB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
pmbSay(b.yes);
if (pmbKey() === k)
pmbStepDone();
return;
}
pmbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (pmbKey() === k)
PMB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = pmbS(), C = PMB_CH[S.ch], b = pmbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[pmb] done", e);
}
if (b.say)
pmbSay(b.say);
S.s++;
if (window.PMB_LOG)
PMB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= PMB_CH.length - 1) {
S.done = 1;
S.s = 0;
pmbSave();
pmbItemsClear();
pmbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
pmbSave();
var nx = PMB_CH[S.ch];
setTimeout(function () { try {
pmbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[pmb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
pmbSave();
pmbStepBegin();
},
function () {
pmbTune(null);
pmbOnce("quarters");
var S = pmbS();
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>" + esc(PML_Q.nothing) + "</p><p style='font-style:italic'>" + esc(PML_Q.truly) + "</p><p style='font-size:12px;opacity:.75'>Jules Verne, Around the World in Eighty Days (1873), translated by George Makepeace Towle</p><p>You have kept house at No. 7, Saville Row: Passepartout's first morning and the clock that tells the years, the carpet-bag and the beggar-woman at Charing Cross, London betting on a man like a race-horse, the ruined homecoming and the gas, and the run to the Reform with ten minutes left. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; pmbSave(); pmbChapterBegin(true); } };
b += worldBtn("again", "Walk it again from the start", "No. 7, Saville Row, the 2nd of October 1872");
worldCard(b, fns);
},
function () {
var S = pmbS(), C = PMB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Jules Verne · Around the World in Eighty Days (1873) · translated by George Makepeace Towle</div><h3 style='margin:4px 0'>🎩 Seven, Saville Row</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((pmbStep() || {}).h || "") + "</p>";
else
b += "<p>A gentleman of the Reform Club who lives by the clock, and a new French servant who wanted a quiet life. On the 2nd of October 1872 Mr Phileas Fogg bets twenty thousand pounds that he can go round the world in eighty days, and leaves that night. Walk his London with them, in Verne's own words: the house in Saville Row, the station at Charing Cross, Pall Mall betting on him, and the evening he comes home. Five chapters.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: No. 7, Saville Row", S.started ? "Back to where you were" : "\"Mr. Phileas Fogg lived, in 1872, at No. 7, Saville Row\"");
fns.go = function () { worldCard(null); pmbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; pmbSave(); pmbBegin(); };
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += pmbKeeperBtns(fns);
worldCard(b, fns);
},
function (c) {
var C = PMB.cast[c.key];
if (pmbCastLive(C))
return C;
var P = pmbPos(c.at);
if (!P)
return null;
var inside = P.area.indexOf("in:") === 0, parent = inside ? (SHK.rooms[P.area.slice(3)] || {}).live : (c.kind && c.kind !== "person" ? PML.live : SHK.live);
if (!parent)
return null;
var px = P.x + (c.ox || 0), pz = P.z + (c.oz || 0), py = c.y != null ? c.y : shkGround(px, pz, (P.y || 0) + 0.5) + (c.kind === "person" || !c.kind ? 0.14 : 0), g;
if (!c.kind || c.kind === "person") {
g = dlnPerson("pmb_" + c.key, c.dress, { sex: c.sex, child: !!c.child, inside: inside });
}
else if (c.kind === "thing" && c.make)
g = c.make();
else
g = new THREE.Group();
g.position.set(px, py, pz);
g.rotation.y = c.ry || 0;
if (c.lie) {
g.rotation.x = -Math.PI / 2;
g.position.y += 0.25;
}
parent.add(g);
var Q = { g: g, key: "pmb_" + c.key, wander: c.wander ? { r: c.wander, sp: 0.5 } : null, ground: py };
if (!c.kind || c.kind === "person")
SHK.people.push(Q);
if (c.name) {
var T = { p: Q, name: c.name, r: c.r || (c.kind && c.kind !== "person" ? 2.4 : 3.2), t: { name: c.name, persona: c.persona || PML_ERA, greet: c.greet || "Hallo." } };
SHK.talk.push(T);
pmbWrapT(T);
}
PMB.cast[c.key] = { g: g, P: Q, c: c };
return PMB.cast[c.key];
},
function () {
var C = PMB_CH[pmbS().ch];
if (!C || !C.cast)
return;
var b = pmbStep() || {}, idx = pmbS().s;
C.cast.forEach(function (c) {
if (c.from != null && idx < c.from)
return;
if (c.until != null && idx >= c.until) {
if (PMB.cast[c.key])
pmbCastHide(c.key);
return;
}
if (pmbCastLive(PMB.cast[c.key]))
return;
var P = pmbPos(c.at);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
if (!SHK.rooms[P.area.slice(3)])
return;
}
else if (pmbDist(P, worldLocal()) > 300 && b.who !== c.name)
return;
pmbPerson(c);
});
},
function (T) {
if (!pmbActive() || !pmZoneNow())
return false;
var b = pmbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = pmbKey();
worldPrompt(null);
var next = function () { if (pmbKey() === k)
pmbStepDone(); };
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
worldCard(PMB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
function (dt) {
if (!SHK.G || !SHK.built)
return;
PMB.wt += dt;
if (PMB.wt > 0.5) {
PMB.wt = 0;
pmbWrap();
if (pmbActive())
pmbCastTick();
}
var cardOpen = WLD.card && WLD.card.style.display === "block", busy = cardOpen || WLD.promptFn || SHK.moving;
if (!pmbActive()) {
if (PMB.beam)
PMB.beam.visible = false;
if (!busy)
worldPrompt("🎩 <b>Seven, Saville Row</b> · <b>press E</b> to walk the book", pmbOpen);
return;
}
var S = pmbS(), b = pmbStep(), L = worldLocal(), t = SHK.t || 0, area = pmbAreaAt(L.x, L.z);
PMB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? pmbPos(b.at) : null, W = P ? pmbWayTo(P, area) : null, show = W && W.show, way = W ? W.way : "", bm = pmbBeam();
if (show && !SHK.moving) {
bm.visible = true;
var cd = pmbDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
var outside = area.indexOf("in:") !== 0;
bm.userData.col.visible = outside && cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = pmbWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !SHK.moving) {
var inArea = P && P.area === area, fd = P ? pmbDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (PMB.readAsk)
break;
if (!PMB.readOpen)
pmbChapterCard();
else {
PMB.readOpen = 0;
pmbStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null ? true : fd < (b.r || 6))) {
pmbStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
PMB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(PMB.hold, dt);
}
catch (e) { }
if (PMB.hold >= (b.sec || 8)) {
pmbStepDone();
return;
}
}
else
PMB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return PMB.rew[k]; })) {
pmbStepDone();
return;
}
break;
case "until": {
var ok = false;
try {
ok = b.test(S.f);
}
catch (e) { }
if (ok) {
pmbStepDone();
return;
}
break;
}
case "puzzle":
if ((!PMB.puzOpen || performance.now() - (PMB.puzT || 0) > 3000) && (!P || (inArea && fd < (b.r || 6))))
pmbPuzzleCard(b);
break;
}
}
if (!busy)
worldPrompt("🎩 <b>Seven, Saville Row</b> · <b>press E</b> for the book", pmbOpen);
var C = PMB_CH[S.ch], prog = b && b.k === "hold" && PMB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - PMB.hold)) + " s)" : b && b.k === "gather" ? " (" + (PMB.got || 0) + " of " + (b.n || 3) + ")" : "";
worldBanner("🎩 <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var g = new THREE.Group(), wk = dlnShine(0x1A1A1E, 0.5, 0.3), rug = dlnC(0x5A2A2A);
dlnBox(g, 0.8, 0.5, 1.0, wk, 0, 0.55, 0.1);
dlnBox(g, 0.8, 0.9, 0.14, wk, 0, 1.0, -0.42);
var hood = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.6, 12, 1, true, -Math.PI / 2, Math.PI), wk);
hood.rotation.z = Math.PI / 2;
hood.rotation.y = Math.PI / 2;
hood.position.set(0, 1.45, -0.25);
g.add(hood);
dlnBox(g, 0.82, 0.5, 0.5, rug, 0, 0.62, 0.45);
[-0.45, 0.45].forEach(function (k) { var w = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.03, 6, 18), wk); w.rotation.y = Math.PI / 2; w.position.set(k, 0.34, -0.1); g.add(w); });
var fw = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.025, 6, 14), wk);
fw.rotation.y = Math.PI / 2;
fw.position.set(0, 0.16, 0.8);
g.add(fw);
dlnCyl(g, 0.015, 0.015, 1.0, wk, 0, 0.6, 1.2, 5).rotation.x = 0.9;
return g;
},
function (x, z) {
if (z < -108)
return Math.abs(x - PML_7.x) < 6 ? "before No. 7, Saville Row" : x < -58 ? "Burlington Gardens" : "Saville Row";
if (x > 100 && x < 114 && z < -12)
return "Regent Street";
if (x > 100 && x < 114 && z > 12)
return "the Duke of York's Column";
if (x > 196)
return "Charing Cross";
if (x < -168)
return "before St James's Palace";
if (Math.hypot(x - PML_CAB.x, z - PML_CAB.z) < 10)
return "the cab rank, Pall Mall";
if (x > PML_RC.x0 && x < PML_RC.x1 && z > 4)
return "before the Reform Club";
return "Pall Mall";
},
function () {
var L = worldLocal(), here = pmlLocal(L.x, L.z), inRow = here.z < -100;
var b = (inRow ? worldBtn("pm", "To Pall Mall", "The clubs, the Reform") : worldBtn("sr", "To Saville Row", "No. 7, the house of Phileas Fogg")) + worldBtn("cx", "To Charing Cross", "The station and the Cross") +
worldBtn("gos", "To Great Ormond Street", "The hospital, Queen Square") + (typeof bsGo === "function" ? worldBtn("bs", "To Baker Street", "221B") : "") + (typeof n14Go === "function" ? worldBtn("n14", "To No. 14, the Darlings' house", "The quiet square in Bloomsbury") : "") +
worldBtn("kg", "To Kensington Gardens", "The Black Lion Gate, Bayswater Road") + (typeof wsmGo === "function" ? worldBtn("ws", "To Westminster", "Whitehall, Big Ben, the Abbey") : "") +
worldBtn("tale", "The hansom cab", "A shilling a mile") + worldBtn("back", "Back to Bankside, 1600", "Three hundred years ago, by Old Father Thames");
worldCard(worldFacts("🎩 A hansom cab", inRow ? "The rank in Saville Row" : "The rank in Pall Mall", [], []) + b, {
pm: function () { worldCard(null); pmlGo("cab", "🎩 <b>Pall Mall.</b> The cab sets you down at the rank, among the clubs."); },
sr: function () { worldCard(null); pmlGo("door", "🏠 <b>Saville Row.</b> The cab sets you down before No. 7."); },
cx: function () { worldCard(null); pmlGo("cross", "🚂 <b>Charing Cross.</b> The Cross before you, the hotel and the station behind it."); },
gos: function () { worldCard(null); dlnGo("🎩 <b>Great Ormond Street.</b> The cab sets you down at the rank."); },
bs: function () { worldCard(null); bsGo("door"); }, n14: function () { worldCard(null); n14Go("door"); },
kg: function () { worldCard(null); if (typeof kgnGo === "function")
kgnGo("gate", "🌳 <b>Kensington Gardens.</b> The Black Lion Gate, on the Bayswater Road."); },
ws: function () { worldCard(null); wsmGo("cab"); },
tale: function () { worldCard(null); pmlTale("🎩 Cabs", ["hundred"], ["A hansom is a two-wheeled cab for two, the driver perched up behind with the reins over the roof. A shilling a mile; a hundred pounds, once, for ten minutes from Saville Row to Pall Mall."]); },
back: function () { worldCard(null); dlnTo1600(); }
});
},
function () {
try {
var d = document.createElement("div");
d.innerHTML = worldBtn("pml", "🎩 To Pall Mall and Saville Row", "The clubs, the Reform, No. 7, Charing Cross");
var b = d.querySelector("[data-w]");
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); worldCard(null); pmlGo("cab", "🎩 <b>Pall Mall.</b> The cab sets you down among the clubs: the Reform's stone front across the way."); };
var card = WLD.card, first = card && card.querySelector("[data-w]:not([data-w=close])");
if (first)
first.parentNode.insertBefore(b, first);
else if (card)
card.appendChild(b);
}
catch (e) { }
},
function () {
var fin = false;
try {
var b = pmbStep();
fin = !!(pmbActive() && b && b.reform);
}
catch (e) { }
var can = typeof vrnGo === "function" && typeof VRN_KEY !== "undefined" && typeof WORLDS !== "undefined" && WORLDS[VRN_KEY] && typeof vrnEnter === "function";
if (!can) {
if (fin)
pmbStepDone();
else
pmlTale("🃏 The Reform Club", ["member"], ["Members only, and the hall porter knows every one of them."]);
return;
}
pmlReformDoor();
setStatus("🃏 <b>The Reform Club.</b> The hall porter opens the door: marble, mahogany and silence.");
var ok = vrnGo({});
if (ok === false) {
if (fin)
pmbStepDone();
return;
}
setTimeout(function () {
try {
if (WLD.on === VRN_KEY)
vrnEnter("reform");
}
catch (e) {
if (window.console)
console.warn("[pall mall] reform", e);
}
if (fin)
setTimeout(function () { try {
pmbStepDone();
}
catch (e) { } }, 1100);
}, 150);
},
function (k, cx, cz) {
if (k === "pm_hall") {
var p = dlnPerson("pm_homepass", "pmpass", { sex: "m", inside: true });
p.position.set(cx + 0.9, 0.02, cz - 0.6);
p.rotation.y = -0.5;
SHK.live.add(p);
var P = { g: p, key: "pm_homepass", ground: 0.02 }, T = { p: P, name: "Passepartout, at home", r: 2.6, t: { name: "Passepartout", persona: PML_PASS + " Just now you are at home in the hall of No. 7, Saville Row, brushing your master's coats; Mr Fogg is at the Reform until midnight.", greet: "Bonjour! Monsieur is at the club. He comes home at midnight exactly: not a minute before, not a minute after." } };
SHK.people.push(P);
SHK.talk.push(T);
(PML.home = PML.home || []).push({ P: P, T: T, on: true });
return;
}
if (k !== "pm_cx")
return;
var R = wRand(1873), z0 = cz - 34;
for (var i = 0; i < (DLN.lite ? 4 : 10); i++) {
var who = ["gent", "lady", "porter", "oldgent", "maid", "clergy", "gent", "lady", "porter", "worker"][i], q = dlnPerson("pm_pass" + i, who, { inside: true });
q.position.set(cx - 12 + R() * 7.4, 0.92, z0 + 6 + i * 5 + R() * 2);
q.rotation.y = R() * 6.28;
SHK.live.add(q);
SHK.people.push({ g: q, ground: 0.92 });
}
for (var j = 0; j < (DLN.lite ? 2 : 5); j++) {
var h = dlnPerson("pm_hall" + j, ["gent", "lady", "worker", "gent", "lady"][j], { inside: true });
h.position.set(cx - 6 + j * 3.2, 0.02, cz + 28 + (j % 2) * 2);
h.rotation.y = Math.PI + (j - 2) * 0.3;
SHK.live.add(h);
SHK.people.push({ g: h, ground: 0.02 });
}
var ins = dlnPerson("pm_insp", "pmguard", { inside: true, sex: "m" });
ins.position.set(cx - 6.2, 0.92, z0 + 42);
ins.rotation.y = 0;
SHK.live.add(ins);
var PI2 = { g: ins, key: "pm_insp", ground: 0.92 };
SHK.people.push(PI2);
SHK.talk.push({ p: PI2, name: "The platform inspector", r: 2.6, t: { name: "The platform inspector", persona: "You are the platform inspector of the South Eastern Railway at Charing Cross in 1872: brass buttons, a peaked cap, a watch you trust more than the station clock. The night mail goes to Dover for the boat to Calais at a quarter before nine; the line crosses the river by the Hungerford Bridge. " + PML_ERA, greet: "Dover mail, platform one, a quarter before nine. Paris tomorrow morning, if the sea's kind." } });
var bc = dlnPerson("pm_bookman", "gent", { inside: true, sex: "m" });
bc.position.set(cx + 13 - 2.4, 0.02, cz + 29);
bc.rotation.y = Math.PI / 2;
SHK.live.add(bc);
var PB = { g: bc, key: "pm_bookman", ground: 0.02 };
SHK.people.push(PB);
SHK.talk.push({ p: PB, name: "Mr Josiah Cole, bookstall clerk", r: 2.4, t: { name: "Mr Josiah Cole", persona: "You keep the railway bookstall at Charing Cross in 1872: newspapers, railway novels in yellow covers, Bradshaw's guide, Punch and the Illustrated London News. " + PML_ERA, greet: "Paper for the journey, sir? Bradshaw? The Illustrated has the gentleman of the wager this week." } });
},
function () {
if (!PML.home)
return;
var act = false;
try {
var S = pmbS();
act = !!(S.started && !S.done);
}
catch (e) { }
PML.home.forEach(function (H) {
if (act && H.on) {
H.on = false;
H.P.g.visible = false;
SHK.talk = SHK.talk.filter(function (t) { return t !== H.T; });
SHK.people = SHK.people.filter(function (p) { return p !== H.P; });
}
else if (!act && !H.on && H.P.g.parent) {
H.on = true;
H.P.g.visible = true;
SHK.talk.push(H.T);
SHK.people.push(H.P);
}
});
},
function (title, quotes, notes, btns, src) {
var b = "<div style='font:600 16px Georgia;color:#FFE7B0'>" + esc(title) + "</div>" + (quotes || []).map(function (k) { var q = LWL_Q[k] || k; return "<p style='font:italic 14px/1.55 Georgia;margin:8px 0'>" + esc(q) + "</p>"; }).join("") +
((quotes || []).length ? "<div style='font-size:11px;opacity:.65;margin-top:-2px'>" + esc(src || "Arthur Conan Doyle, The Lost World (1912)") + "</div>" : "") +
(notes && notes.length ? "<div style='font-size:13px;opacity:.9;line-height:1.5'>" + notes.map(function (n) { return "<p style='margin:5px 0'>" + esc(n) + "</p>"; }).join("") + "</div>" : "");
var fns = {};
(btns || []).forEach(function (B) { b += worldBtn(B[0], B[1], B[2] || ""); fns[B[0]] = function () { worldCard(null); B[3](); }; });
worldCard(b, fns);
LWL.read++;
try {
lwbNote("tale", title);
}
catch (e) { }
},
function () {
return dlnTex("lwoffice", 256, 264, function (x, W, H) {
x.fillStyle = "#A8503A";
x.fillRect(0, 0, W, H);
dlnNoise(x, W, H, 1600, 0.16, 141, "60,20,10");
x.strokeStyle = "rgba(230,220,200,.25)";
for (var y = 0; y < H; y += 8) {
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
}
x.fillStyle = "#E2D8C2";
x.fillRect(0, 0, W, 18);
x.fillRect(0, H - 14, W, 14);
var ww = W * 0.3, wx = (W - ww) / 2, wy = H * 0.22, wh = H * 0.58;
x.fillStyle = "#E8DECA";
x.fillRect(wx - 10, wy - 14, ww + 20, 14);
x.beginPath();
x.moveTo(wx - 10, wy - 14);
x.quadraticCurveTo(wx + ww / 2, wy - 40, wx + ww + 10, wy - 14);
x.fill();
dlnSash(x, wx, wy, ww, wh, 2, 3, "#F2EEE4");
x.fillStyle = "#E2D8C2";
x.fillRect(wx - 12, wy + wh, ww + 24, 10);
}, 4.2, 4.4);
},
function () {
return dlnTex("lwterra", 256, 300, function (x, W, H) {
x.fillStyle = "#D8A078";
x.fillRect(0, 0, W, H);
dlnNoise(x, W, H, 900, 0.1, 143, "120,60,30");
var ww = W * 0.42, wx = (W - ww) / 2, wy = H * 0.26, wh = H * 0.6;
x.fillStyle = "#E8C4A0";
x.fillRect(wx - 14, wy, ww + 28, wh + 10);
x.beginPath();
x.arc(W / 2, wy, ww / 2 + 14, Math.PI, 0);
x.fill();
x.fillStyle = "#2A2A30";
x.beginPath();
x.arc(W / 2, wy, ww / 2, Math.PI, 0);
x.fill();
x.fillRect(wx, wy, ww, wh);
x.strokeStyle = "#F4ECDC";
x.lineWidth = 3;
for (var i = 1; i < 3; i++) {
x.beginPath();
x.moveTo(wx + i * ww / 3, wy - ww / 2);
x.lineTo(wx + i * ww / 3, wy + wh);
x.stroke();
}
for (var j = 1; j < 5; j++) {
x.beginPath();
x.moveTo(wx, wy + j * wh / 5);
x.lineTo(wx + ww, wy + j * wh / 5);
x.stroke();
}
x.fillStyle = "rgba(255,236,190,.35)";
x.fillRect(wx + 4, wy + 4, ww - 8, wh - 8);
x.fillStyle = "#C88860";
x.fillRect(0, H - 16, W, 16);
}, 4.6, 6);
},
function () {
return dlnTex("lwtimber", 256, 256, function (x, W, H) {
x.fillStyle = "#F2EAD8";
x.fillRect(0, 0, W, H);
x.fillStyle = "#1E1814";
for (var i = 0; i <= 4; i++)
x.fillRect(i * W / 4 - 5, 0, 10, H);
for (var j = 0; j <= 2; j++)
x.fillRect(0, j * H / 2 - 6, W, 12);
for (var k = 0; k < 4; k++) {
x.save();
x.translate(k * W / 4 + W / 8, H * 0.25);
x.rotate(0.7);
x.fillRect(-4, -30, 8, 60);
x.restore();
x.save();
x.translate(k * W / 4 + W / 8, H * 0.25);
x.rotate(-0.7);
x.fillRect(-4, -30, 8, 60);
x.restore();
}
x.fillStyle = "#C8D8E0";
for (var w = 0; w < 4; w++) {
x.fillRect(w * W / 4 + 12, H * 0.58, W / 4 - 24, H * 0.32);
}
x.strokeStyle = "#3A3A3A";
x.lineWidth = 1;
for (var w2 = 0; w2 < 4; w2++)
for (var q = 0; q < 6; q++) {
x.beginPath();
x.moveTo(w2 * W / 4 + 12 + q * (W / 4 - 24) / 5, H * 0.58);
x.lineTo(w2 * W / 4 + 12 + q * (W / 4 - 24) / 5, H * 0.9);
x.stroke();
}
}, 6, 4);
},
function () {
return dlnTex("lwgothic", 256, 320, function (x, W, H) {
x.fillStyle = "#D8D0BE";
x.fillRect(0, 0, W, H);
dlnNoise(x, W, H, 1100, 0.14, 147, "90,80,60");
x.strokeStyle = "rgba(110,100,80,.35)";
for (var y = 0; y < H; y += 22) {
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
}
[W * 0.25, W * 0.75].forEach(function (cx) {
x.fillStyle = "#B8B0A0";
x.beginPath();
x.moveTo(cx - 30, H * 0.86);
x.lineTo(cx - 30, H * 0.36);
x.quadraticCurveTo(cx - 28, H * 0.16, cx, H * 0.1);
x.quadraticCurveTo(cx + 28, H * 0.16, cx + 30, H * 0.36);
x.lineTo(cx + 30, H * 0.86);
x.fill();
x.fillStyle = "#3A3A44";
x.beginPath();
x.moveTo(cx - 22, H * 0.84);
x.lineTo(cx - 22, H * 0.38);
x.quadraticCurveTo(cx - 20, H * 0.2, cx, H * 0.15);
x.quadraticCurveTo(cx + 20, H * 0.2, cx + 22, H * 0.38);
x.lineTo(cx + 22, H * 0.84);
x.fill();
x.strokeStyle = "#D8D0BE";
x.lineWidth = 3;
x.beginPath();
x.moveTo(cx, H * 0.15);
x.lineTo(cx, H * 0.84);
x.moveTo(cx - 22, H * 0.5);
x.lineTo(cx + 22, H * 0.5);
x.stroke();
});
}, 5, 6);
},
function (P) {
var X = lwlX, Z = lwlZ, flags = dlnS("flags", 0xFFFFFF), road = dlnS("setts", 0xA8A49C), wood = dlnS("setts", 0x7A6A58), kerb = dlnS("stone", 0xB8B4AC), R = LWL_R;
dlnPlane(P, R.x1 - R.x0 + 80, R.z1 - R.z0 + 80, flags, X((R.x0 + R.x1) / 2), 0.0, Z((R.z0 + R.z1) / 2));
dlnPlane(P, 300, 13, wood, X(-15), 0.02, Z(0));
dlnPlane(P, 130, 13, wood, X(190), 0.02, Z(0));
[-6.5, 6.5].forEach(function (z) { dlnBox(P, 262, 0.12, 0.3, kerb, X(-17), 0.06, Z(z)); });
dlnPlane(P, 170, 9, road, X(0), 0.02, Z(-130));
[-125.5, -134.5].forEach(function (z) { dlnBox(P, 160, 0.12, 0.3, kerb, X(0), 0.06, Z(z)); });
dlnPlane(P, 124, 6.4, road, X(0), 0.021, Z(125.3));
[122.1, 128.5].forEach(function (z) { dlnBox(P, 118, 0.12, 0.3, kerb, X(0), 0.06, Z(z)); });
dlnPlane(P, 128, 8.4, road, X(0), 0.021, Z(240));
[235.8, 244.2].forEach(function (z) { dlnBox(P, 120, 0.12, 0.3, kerb, X(0), 0.06, Z(z)); });
dlnPlane(P, 150, 24, dlnS("lawn", 0xFFFFFF), X(0), 0.03, Z(-110));
dlnPlane(P, 150, 2.4, dlnS("gravel", 0xFFFFFF), X(0), 0.035, Z(-118));
shkFloor(X((R.x0 + R.x1) / 2), Z((R.z0 + R.z1) / 2), (R.x1 - R.x0) / 2 + 60, (R.z1 - R.z0) / 2 + 40, 0);
},
function (P, x0, x1, zf, dir, name, col, goods) {
var X = lwlX, Z = lwlZ, w = x1 - x0, cx = (x0 + x1) / 2, z = zf + dir * 0.22, paint = dlnShine(col, 0.5, 0.1), gilt = dlnShine(0xD8B048, 0.3, 0.85), glass = new THREE.MeshBasicMaterial({ map: bsWinTex(goods || [0xC8A060]), fog: true });
dlnBox(P, w, 3.25, 0.3, paint, X(cx), 1.62, Z(zf + dir * 0.08));
dlnBox(P, w - 1.0, 2.0, 0.06, glass, X(cx), 1.55, Z(z + dir * 0.06));
for (var m = 0, n = Math.max(1, Math.round((w - 1.0) / 1.6)); m <= n; m++)
dlnBox(P, 0.06, 2.0, 0.08, paint, X(x0 + 0.5 + m * (w - 1.0) / n), 1.55, Z(z + dir * 0.08));
dlnBox(P, w - 1.0, 0.5, 0.1, paint, X(cx), 0.3, Z(z + dir * 0.05));
[x0 + 0.2, x1 - 0.2].forEach(function (px) { dlnBox(P, 0.4, 3.25, 0.45, paint, X(px), 1.62, Z(zf + dir * 0.2)); });
var sg = bsSign(name, w - 0.6, 0.55, "#141416", "#E8C860");
sg.position.set(X(cx), 2.95, Z(z + dir * 0.13));
if (dir < 0)
sg.rotation.y = Math.PI;
P.add(sg);
dlnBox(P, w + 0.1, 0.12, 0.5, gilt, X(cx), 3.3, Z(zf + dir * 0.25));
if (goods && !DLN.lite)
for (var k = 0; k < Math.floor((w - 1.2) / 0.5); k++) {
var it = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.22 + (k % 3) * 0.1, 0.2), dlnC(goods[k % goods.length]));
it.position.set(X(x0 + 0.8 + k * 0.5), 0.72 + (k % 3) * 0.05, Z(z - dir * 0.12));
P.add(it);
}
},
function (P, x0, x1, zf, dir, name, o) {
o = o || {};
var X = lwlX, Z = lwlZ, w = x1 - x0, cx = (x0 + x1) / 2, d = o.d || 22, st = o.st || 5, h = st * 4.4, front = dlnS(o.tex || "lwoffice", o.tint || 0xFFFFFF), stone = dlnS("stone", 0xE8E2D4), back = dlnS("stock", 0xFFFFFF);
var g = new THREE.Group();
g.position.set(X(cx), 0, Z(zf));
if (dir > 0)
g.rotation.y = 0;
else
g.rotation.y = Math.PI;
P.add(g);
dlnFace(g, w, h - 4.4, front, 0, 4.4 + (h - 4.4) / 2, -0.15);
dlnBox(g, w, 4.4, 0.4, stone, 0, 2.2, -0.2);
dlnBox(g, w, h, 0.3, back, 0, h / 2, -d + 0.15);
[-1, 1].forEach(function (k) { dlnBox(g, 0.3, h, d, back, k * (w / 2 - 0.15), h / 2, -d / 2); });
dlnBox(g, w + 0.8, 0.7, 1.0, stone, 0, h + 0.35, -0.3);
dlnBox(g, w, 0.3, d, dlnC(0x4A4A50), 0, h + 0.4, -d / 2);
for (var b = 0; b < st; b++)
dlnBox(g, w + 0.1, 0.24, 0.4, stone, 0, 4.4 + b * 4.4, 0.02);
var dx = o.door != null ? o.door - cx : 0, glass = dlnShine(0x2A3440, 0.15, 0.6);
for (var p = -w / 2 + 0.6; p <= w / 2 - 0.5; p += w / Math.max(2, Math.round(w / 5)))
dlnBox(g, 0.7, 4.4, 0.6, dlnShine(0x5A4A4A, 0.4, 0.2), p, 2.2, 0.1);
dlnBox(g, w - 1.2, 2.8, 0.08, glass, 0, 1.9, 0.06);
dlnBox(g, 2.4, 3.6, 0.2, dlnC(o.doorCol || 0x1E1A16), dx, 1.8, 0.12);
dlnBox(g, 3.2, 0.6, 0.7, stone, dx, 3.9, 0.3);
dlnBox(g, 2.0, 0.6, 0.08, dlnGlow(0xF0D8A0), dx, 3.3, 0.24);
if (name) {
var sg = bsSign(name, Math.min(w - 1, name.length * 0.42), 0.9, o.signBg || "#141416", o.signFg || "#E8C860");
sg.position.set(0, h - 0.9, 0.12);
g.add(sg);
}
if (o.roof !== false)
dlnMansard(g, w - 0.6, d - 1, o.roof || 3, dlnS("slate", 0xFFFFFF), 0, h + 0.4, -d / 2);
shkSolidBox(X(cx), Z(zf - dir * d / 2), w, d, 0);
return { g: g, h: h };
},
function (P, R) {
var X = lwlX, Z = lwlZ, F = LWL_F, si = 0;
lwlLawCourts(P);
lwlDunstan(P);
[[-72, -42.6], [-37.4, -12], [64, 112]].forEach(function (s, k) { dlnTerrace(P, LWL_X + s[0], LWL_X + s[1], Z(F.n), 1, 5, { tint: [0xD0B090, 0xD8B898, 0xC8A888][k] }); });
[[-72, -42.6], [-37.4, -12], [64, 112]].forEach(function (s) {
var n = Math.max(1, Math.round((s[1] - s[0]) / 10.8)), hw = (s[1] - s[0]) / n;
for (var i = 0; i < n; i++) {
var hx = s[0] + hw * i, door = hx + (i % 2 ? hw - 1.9 : 1.9);
if (DLN.lite && i % 2)
continue;
var S = LWL_FSHOPS[si % LWL_FSHOPS.length];
si++;
if (i % 2)
lwlShop(P, hx + 0.3, door - 1.1, F.n, 1, S[0], S[1], S[2]);
else
lwlShop(P, door + 1.1, hx + hw - 0.3, F.n, 1, S[0], S[1], S[2]);
}
});
lwlCheese(P);
var gz = lwlOffice(P, -10, 30, F.n, 1, "THE DAILY GAZETTE", { door: LWL_GAZ.x, st: 5, d: 24, signBg: "#1A1A1E", signFg: "#F0D070" });
var gc = new THREE.Group();
gc.position.set(X(LWL_GAZ.x), 0, Z(F.n + 0.6));
P.add(gc);
var brass = dlnShine(0xC8A048, 0.3, 0.9);
dlnCyl(gc, 0.75, 0.75, 0.2, dlnShine(0x1A1A1E, 0.4, 0.4), 0, 5.4, 0.3, 20).rotation.x = Math.PI / 2;
var cf = new THREE.Mesh(new THREE.CircleGeometry(0.62, 24), new THREE.MeshLambertMaterial({ map: pmlClockTex() }));
cf.position.set(0, 5.4, 0.42);
gc.add(cf);
[-3.6, 3.6].forEach(function (k, i) { var bl = dlnPanel(i ? ["SCIENTIFIC MEETING", "UPROAR AT THE INSTITUTE", "SPECIAL REPORT"] : ["LATE FINAL", "THE AMAZON MYSTERY", "PROFESSOR'S CLAIM"], "DAILY GAZETTE", 1.6, 2.2, "#F4ECD8", "#141416"); bl.position.set(k, 1.6, 0.04); gc.add(bl); });
shkDoor("lw_gaz", X(LWL_GAZ.x), Z(F.n + 3.2), "The Daily Gazette");
shkSpot(X(LWL_GAZ.x + 6), Z(F.n + 3.4), 2.6, "The Daily Gazette's bills", "read them", function () { lwlTale("📰 The Daily Gazette", ["mcardle"], ["A morning paper of Fleet Street: five floors of reporters' rooms, sub-editors, the composing-room under the roof and the machine-room in the basement, where the rotary presses run all night. Sir George Beaumont is the chief; Mr McArdle the news editor; and Mr Edward Dunn Malone, three-and-twenty, the junior reporter."]); });
var tg = lwlOffice(P, 32, 62, F.n, 1, "THE DAILY TELEGRAPH", { door: 47, st: 5, d: 24, tex: "portland", tint: 0xF0EADC, signBg: "#F2EEE4", signFg: "#1A1A1A" });
for (var c = 0; c < 4; c++)
dlnCyl(P, 0.34, 0.38, 8.4, dlnS("stone", 0xE8E2D4), X(38 + c * 6), 4.4 + 4.2, Z(F.n + 0.5), 12);
shkSpot(X(47), Z(F.n + 3.2), 2.6, "The Daily Telegraph", "look", function () { lwlTale("📰 The Daily Telegraph", ["blundell"], ["The biggest paper in the world, they say: its stone front and columns put up in 1882. Its man Blundell went to interview Professor Challenger, and came back with his head broken."]); });
lwlPrinceHenry(P);
lwlOffice(P, -134, -118, F.s, -1, "CHILD & CO. · BANKERS", { door: -126, st: 4, d: 18, tex: "portland", tint: 0xEDE6D6, signBg: "#F2EEE4", signFg: "#1A1A1A" });
shkSpot(X(-126), Z(F.s - 3.2), 2.4, "Child's bank", "look", function () { lwlTale("🏦 Child and Co.", [], ["Number One, Fleet Street: the oldest bank in London, kept by the Child family since the days of King Charles the Second, at the sign of the Marigold. Nell Gwynn banked here."]); });
[[-116, -70], [-52, -8], [16, 112]].forEach(function (s, k) { dlnTerrace(P, LWL_X + s[0], LWL_X + s[1], Z(F.s), -1, 5, { tint: [0xCCAA88, 0xD4B494, 0xC4A484][k] }); });
[[-116, -70], [-52, -8], [16, 112]].forEach(function (s) {
var n = Math.max(1, Math.round((s[1] - s[0]) / 10.8)), hw = (s[1] - s[0]) / n;
for (var i = 0; i < n; i++) {
var hx = s[0] + hw * i, door = hx + (i % 2 ? hw - 1.9 : 1.9);
if (DLN.lite && i % 2)
continue;
var S = LWL_FSHOPS[(si + 3) % LWL_FSHOPS.length];
si++;
if (i % 2)
lwlShop(P, hx + 0.3, door - 1.1, F.s, -1, S[0], S[1], S[2]);
else
lwlShop(P, door + 1.1, hx + hw - 0.3, F.s, -1, S[0], S[1], S[2]);
}
});
lwlOffice(P, -68, -54, F.s, -1, "HOARE & CO.", { door: -61, st: 4, d: 18, tex: "portland", tint: 0xEAE2D0, signBg: "#F2EEE4", signFg: "#1A1A1A" });
var bt = new THREE.Group();
bt.position.set(X(-61), 4.0, Z(F.s - 1.0));
P.add(bt);
var bot = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.01, 0), new THREE.Vector2(0.4, 0.05), new THREE.Vector2(0.46, 0.5), new THREE.Vector2(0.3, 0.8), new THREE.Vector2(0.14, 1.0), new THREE.Vector2(0.14, 1.2)], 12), dlnShine(0xC8A048, 0.3, 0.85));
bt.add(bot);
shkSpot(X(-61), Z(F.s - 3.2), 2.4, "Hoare's bank", "look", function () { lwlTale("🏦 Hoare and Co.", [], ["Another bank of the old goldsmiths, here since 1690, still kept by the Hoare family: its sign, a gilt leather bottle, hangs over the door."]); });
lwlOffice(P, -6, 14, F.s, -1, "PUNCH", { door: 4, st: 4, d: 18, signBg: "#B8201E", signFg: "#F8F0E0" });
shkSpot(X(4), Z(F.s - 3.2), 2.4, "The office of Punch", "look", function () { lwlTale("😄 Punch", [], ["The London Charivari, the comic weekly, round the corner in Bouverie Street: Mr Punch and his dog Toby on the cover every Wednesday, and the famous dinner round the Punch Table where the cartoon is chosen."]); });
lwlTempleBar(P);
lwlBride(P);
lwlLudgate(P);
for (var lx = -140; lx < 110; lx += DLN.lite ? 40 : 20) {
if (Math.abs(lx - LWL_GAZ.x) < 4)
continue;
dlnLamp(P, X(lx), Z(-9.6));
dlnLamp(P, X(lx + 10), Z(9.6));
}
dlnPillarBox(P, X(-6), Z(-9.4));
dlnPillarBox(P, X(70), Z(9.4));
var cs = new THREE.Group();
cs.position.set(X(-100), 0, Z(8.2));
P.add(cs);
dlnBox(cs, 2.8, 1.6, 1.4, dlnShine(0x3A2A4A, 0.5, 0.1), 0, 1.2, 0);
dlnBox(cs, 3.0, 0.12, 1.8, dlnC(0x2A1E14), 0, 2.1, 0);
dlnCyl(cs, 0.08, 0.08, 0.9, dlnC(0x141414), 0.9, 2.5, 0, 6);
dlnCyl(cs, 0.22, 0.22, 0.5, dlnShine(0xC8A048, 0.3, 0.9), -0.4, 2.45, 0.3, 10);
[-1, 1].forEach(function (k) { var w = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.08, 14), dlnC(0x5A2A1A)); w.rotation.x = Math.PI / 2; w.position.set(k * 0.9, 0.4, 0.72); cs.add(w); });
var csn = bsSign("COFFEE · 1d.", 2.4, 0.4, "#F4ECD8", "#3A2A4A");
csn.position.set(0, 1.75, -0.71);
csn.rotation.y = Math.PI;
cs.add(csn);
shkSolidBox(X(-100), Z(8.2), 3, 1.6, 0);
},
function (P) {
var X = lwlX, Z = lwlZ, F = LWL_F, st = dlnS("stone", 0xD8D0BE);
var g = wsmBlock(P, X(-124), Z(F.n - 15), 44, 30, 17, dlnS("lwgothic", 0xFFFFFF), 0, { roof: 5, base: 1.6 });
for (var k = -2; k <= 2; k++) {
var pn = new THREE.Mesh(new THREE.ConeGeometry(0.7, 4, 4), st);
pn.position.set(X(-124 + k * 10), 17 + 2, Z(F.n - 0.2));
P.add(pn);
}
var tw = new THREE.Group();
tw.position.set(X(-104), 0, Z(F.n - 4));
P.add(tw);
dlnBox(tw, 6, 30, 6, dlnS("lwgothic", 0xFFFFFF), 0, 15, 0);
var sp = new THREE.Mesh(new THREE.ConeGeometry(4.2, 9, 4), dlnS("slate", 0xFFFFFF));
sp.rotation.y = Math.PI / 4;
sp.position.y = 34.5;
tw.add(sp);
shkSolidBox(X(-104), Z(F.n - 4), 6.4, 6.4, 0);
shkSpot(X(-118), Z(F.n + 2.4), 3, "The Royal Courts of Justice", "look", function () { lwlTale("⚖️ The Law Courts", [], ["George Edmund Street's great Gothic palace of the law, opened by Queen Victoria in 1882: a thousand rooms, three miles of corridors, and a hall like a cathedral. Barristers in wigs and gowns hurry across to the Temple."]); });
wsmBlock(P, X(-158), Z(0), 46, 20, 16, dlnS("georgian", 0xD0B494), Math.PI / 2, { roof: 3, base: 3.3 });
},
function (P) {
var X = lwlX, Z = lwlZ, F = LWL_F, st = dlnS("stone", 0xD4CCB8), gilt = dlnShine(0xD8B048, 0.3, 0.85), blue = dlnShine(0x1E2A4A, 0.5, 0.3);
wsmBlock(P, X(-84), Z(F.n - 12), 18, 24, 12, dlnS("lwgothic", 0xEAE2D0), 0, { roof: false, base: 1.2 });
var tw = new THREE.Group();
tw.position.set(X(-80), 0, Z(F.n - 4));
P.add(tw);
dlnBox(tw, 5.6, 20, 5.6, st, 0, 10, 0);
dlnCyl(tw, 2.6, 2.8, 7, st, 0, 23.5, 0, 8);
dlnCyl(tw, 2.9, 2.9, 0.6, st, 0, 27.3, 0, 8);
for (var p = 0; p < 8; p++) {
var a = p / 8 * Math.PI * 2;
var pn = new THREE.Mesh(new THREE.ConeGeometry(0.3, 2, 4), st);
pn.position.set(Math.cos(a) * 2.7, 28.6, Math.sin(a) * 2.7);
tw.add(pn);
}
shkSolidBox(X(-80), Z(F.n - 4), 6, 6, 0);
var ck = new THREE.Group();
ck.position.set(X(-87), 0, Z(F.n));
P.add(ck);
dlnBox(ck, 0.4, 0.4, 3.6, blue, 0, 6.6, 1.6);
dlnBox(ck, 1.8, 1.8, 0.4, blue, 0, 6.6, 3.3);
[3.1, 3.52].forEach(function (z, i) { var f = new THREE.Mesh(new THREE.CircleGeometry(0.75, 24), new THREE.MeshLambertMaterial({ map: pmlClockTex() })); f.position.set(0, 6.6, z); if (!i)
f.rotation.y = Math.PI; ck.add(f); });
dlnBox(ck, 4.4, 4.0, 1.4, st, 0, 10.2, 0.7);
dlnBox(ck, 3.6, 3.2, 0.2, dlnC(0x1A1A1E), 0, 10.0, 1.42);
[-1, 1].forEach(function (k) {
var gi = new THREE.Group();
gi.position.set(k * 0.95, 8.5, 1.1);
ck.add(gi);
var body = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.4, 1.8, 10), gilt);
body.position.y = 0.9;
gi.add(body);
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), gilt);
hd.position.y = 2.0;
gi.add(hd);
var club = dlnCyl(gi, 0.05, 0.1, 1.2, gilt, k * -0.35, 1.6, 0.2, 6);
club.rotation.z = k * 0.6;
var bl = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), gilt);
bl.position.set(k * -0.5, 2.6, 0);
gi.add(bl);
});
shkSpot(X(-87), Z(F.n + 3.4), 2.8, "St Dunstan's clock", "look up at it", function () { lwlTale("🕰️ St Dunstan's giants", [], ["The first public clock in London with a minute hand, hung out over Fleet Street in 1671 to thank God the Great Fire stopped three doors away. Every quarter, two gilt giants with clubs (Gog and Magog, Londoners call them) turn their heads and strike the bells.", "The church behind is new, built in 1831 when Fleet Street was widened, with its lantern tower like a crown."]); });
},
function (P) {
var X = lwlX, Z = lwlZ, F = LWL_F, x = -40;
dlnBox(P, 3, 0.3, 6, dlnS("flags", 0xC8C0B0), X(x), 0.03, Z(F.n - 2));
dlnBox(P, 0.3, 9, 6, dlnS("stock", 0xFFFFFF), X(x - 1.6), 4.5, Z(F.n - 2.5));
dlnBox(P, 0.3, 9, 6, dlnS("stock", 0xFFFFFF), X(x + 1.6), 4.5, Z(F.n - 2.5));
dlnBox(P, 3.4, 4, 0.3, dlnS("redbrick", 0xFFFFFF), X(x), 7, Z(F.n + 0.1));
var ar = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.3, 14, 1, false, 0, Math.PI), dlnS("stone", 0xD8D0C0));
ar.rotation.x = Math.PI / 2;
ar.rotation.z = Math.PI / 2;
ar.position.set(X(x), 5, Z(F.n + 0.1));
P.add(ar);
var cs = bsSign("YE OLDE CHESHIRE CHEESE", 3.0, 0.5, "#141416", "#E8C860");
cs.position.set(X(x), 5.9, Z(F.n + 0.3));
P.add(cs);
var wc = bsSign("WINE OFFICE COURT", 2.0, 0.3, "#F2EEE4", "#1A1A1A");
wc.position.set(X(x - 1.44), 3.2, Z(F.n + 0.1));
wc.rotation.y = Math.PI / 2;
P.add(wc);
dlnBox(P, 3, 3.4, 0.2, dlnS("oak", 0x3A2414), X(x), 1.7, Z(F.n - 5.4));
dlnBox(P, 1.6, 0.9, 0.1, dlnGlow(0xF0C880), X(x + 0.6), 1.9, Z(F.n - 5.3));
dlnCyl(P, 0.2, 0.14, 0.5, dlnGlow(0xFFE2A0), X(x), 3.0, Z(F.n - 4.8), 6);
shkSolidBox(X(x), Z(F.n - 5.6), 3, 0.6, 0);
shkSpot(X(x), Z(F.n + 0.5), 2.2, "Ye Olde Cheshire Cheese", "look up the court", function () { lwlTale("🍺 Ye Olde Cheshire Cheese", [], ["Up the narrow court, a chop-house rebuilt after the Great Fire of 1666: sawdust on the floor, settles by the fire, steak and kidney pudding, and Dr Johnson's chair kept in the corner. Reporters and printers eat here between editions."]); });
},
function (P) {
var X = lwlX, Z = lwlZ, F = LWL_F, x0 = -146, x1 = -136, cx = (x0 + x1) / 2, tim = dlnS("lwtimber", 0xFFFFFF), dark = dlnC(0x1E1814);
var g = new THREE.Group();
g.position.set(X(cx), 0, Z(F.s));
P.add(g);
dlnBox(g, 10, 4.2, 0.4, dlnS("stone", 0xD8D0C0), 0, 2.1, 0.2);
dlnBox(g, 3.2, 3.6, 0.5, dark, 0, 1.8, 0);
dlnFace(g, 10.8, 8, tim, 0, 8.2, -0.4);
dlnBox(g, 11, 0.3, 1.4, dark, 0, 4.3, -0.4);
dlnGable(g, 10.8, 10, 3.4, dlnS("slate", 0x8A6A5A), 0, 12.2, 4.6, 0);
[-2.6, 2.6].forEach(function (k) { dlnBox(g, 2.6, 3, 0.8, tim, k, 7.4, -0.9); });
dlnBox(g, 0.4, 12, 10, dlnS("stock", 0xFFFFFF), -5.2, 6, 5);
dlnBox(g, 0.4, 12, 10, dlnS("stock", 0xFFFFFF), 5.2, 6, 5);
var gs = bsSign("INNER TEMPLE", 2.4, 0.4, "#1A1A1E", "#E8C860");
gs.position.set(0, 3.85, -0.06);
gs.rotation.y = Math.PI;
g.add(gs);
shkSolidBox(X(cx), Z(F.s + 5), 11, 10, 0);
shkSpot(X(cx), Z(F.s - 3), 2.6, "Prince Henry's Room", "look", function () { lwlTale("🏚️ Prince Henry's Room", [], ["The gatehouse to the Inner Temple, a timber house built in 1610 with its oriel windows hanging over Fleet Street: one of the few houses the Great Fire spared. Its first-floor room has a plaster ceiling with the Prince of Wales's feathers, for Prince Henry, King James's son."]); });
},
function (P) {
var X = lwlX, Z = lwlZ, st = dlnS("portland", 0xE8E2D4), bronze = dlnShine(0x2A3A30, 0.5, 0.6), x = -118;
var g = new THREE.Group();
g.position.set(X(x), 0, Z(0));
P.add(g);
dlnBox(g, 3.6, 0.6, 2.4, st, 0, 0.3, 0);
dlnBox(g, 2.8, 6.4, 1.8, st, 0, 3.6, 0);
dlnBox(g, 3.2, 0.6, 2.2, st, 0, 7.1, 0);
dlnBox(g, 2.0, 1.6, 1.4, st, 0, 8.2, 0);
[-1, 1].forEach(function (k) { var n = dlnBox(g, 1.0, 2.0, 0.2, dlnC(0x6A2A2A), 0, 3.6, k * 0.92); var f = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.32, 1.5, 10), dlnShine(0xF0EADC, 0.5, 0.1)); f.position.set(0, 3.6, k * 1.0); g.add(f); });
var dr = new THREE.Group();
dr.position.y = 9.0;
g.add(dr);
var bd = dlnCyl(dr, 0.32, 0.42, 1.5, bronze, 0, 0.9, 0, 10);
bd.rotation.x = 0.25;
var hd = dlnBox(dr, 0.32, 0.36, 0.6, bronze, 0, 1.8, 0.3);
hd.rotation.x = 0.4;
var tl = dlnCyl(dr, 0.08, 0.2, 1.6, bronze, 0, 0.4, -0.7, 6);
tl.rotation.x = -1.0;
[-1, 1].forEach(function (k) { var w = dlnBox(dr, 0.06, 1.0, 1.1, bronze, k * 0.55, 1.6, -0.2); w.rotation.z = k * 0.5; w.rotation.x = -0.3; });
var sh = dlnBox(dr, 0.7, 0.85, 0.08, dlnShine(0xE8E4DC, 0.4, 0.2), 0, 1.05, 0.5);
shkSolidBox(X(x), Z(0), 3.8, 2.6, 0);
shkSpot(X(x + 3), Z(0), 3, "The Temple Bar Memorial", "look up at the dragon", function () { lwlTale("🐉 Temple Bar", [], ["Here the City of London begins. Wren's stone gateway stood across Fleet Street for two hundred years; it was taken down stone by stone in 1878 because the traffic could not get through, and this pedestal was put up in its place, with the City's dragon rearing on top.", "When the King comes into the City, he stops here and the Lord Mayor offers him the sword."]); });
},
function (P) {
var X = lwlX, Z = lwlZ, st = dlnS("portland", 0xF0EADC), g = new THREE.Group();
g.position.set(X(40), 0, Z(48));
P.add(g);
dlnBox(g, 9, 26, 9, st, 0, 13, 0);
var y = 26, w = 8;
for (var t = 0; t < 5; t++) {
var h = 5.2 - t * 0.5;
dlnCyl(g, w / 2, w / 2 + 0.2, 0.5, st, 0, y + 0.25, 0, 8);
for (var a = 0; a < 8; a++) {
var an = a / 8 * Math.PI * 2;
dlnCyl(g, 0.18, 0.2, h - 0.5, st, Math.cos(an) * (w / 2 - 0.4), y + h / 2, Math.sin(an) * (w / 2 - 0.4), 6);
}
dlnCyl(g, w / 2 - 0.9, w / 2 - 0.9, h - 0.6, dlnC(0x3A3A44), 0, y + h / 2, 0, 8);
y += h;
w -= 1.2;
}
var ob = new THREE.Mesh(new THREE.ConeGeometry(1.1, 10, 8), st);
ob.position.y = y + 5;
g.add(ob);
var vane = dlnCyl(g, 0.06, 0.06, 2, dlnShine(0xD8B048, 0.3, 0.9), 0, y + 11, 0, 5);
shkSpot(X(40), Z(9.2), 3, "St Bride's spire", "look up", function () { lwlTale("💒 St Bride's", [], ["Up the lane behind the houses: Wren's church of the printers and the newspaper men, its spire of five storeys of open arches climbing to a point, two hundred and twenty-six feet: the tallest Wren ever built. A baker on Ludgate Hill copied it for a wedding cake, and every wedding cake since has had tiers."]); });
},
function (P) {
var X = lwlX, Z = lwlZ, iron = dlnShine(0x2A3A4A, 0.5, 0.4), st = dlnS("portland", 0xEDE6D6), x = 118;
dlnBox(P, 4, 1.8, 40, iron, X(x), 7.4, Z(0));
dlnBox(P, 4.4, 0.3, 40, iron, X(x), 8.4, Z(0));
for (var z = -18; z <= 18; z += DLN.lite ? 6 : 3)
dlnBox(P, 0.2, 1.6, 0.2, iron, X(x - 2.1), 7.4, Z(z));
[-1, 1].forEach(function (k) { dlnBox(P, 4.6, 6.5, 2, dlnS("stock", 0xFFFFFF), X(x), 3.25, Z(k * 8.6)); });
var lc = bsSign("LONDON CHATHAM & DOVER RAILWAY", 14, 0.9, "#1E2A3A", "#F0E6C8");
lc.position.set(X(x - 2.15), 7.4, Z(0));
lc.rotation.y = -Math.PI / 2;
P.add(lc);
[-1, 1].forEach(function (k) { wsmBlock(P, X(150), Z(k * 22), 60, 20, 18, dlnS("lwoffice", 0xFFFFFF), k < 0 ? 0 : Math.PI, { roof: 3 }); });
var g = new THREE.Group();
g.position.set(X(320), 0, Z(0));
P.add(g);
dlnBox(g, 60, 30, 90, st, 0, 15, 0);
[-1, 1].forEach(function (k) { var t = new THREE.Group(); t.position.set(-34, 0, k * 22); g.add(t); dlnBox(t, 10, 46, 10, st, 0, 23, 0); dlnCyl(t, 3.4, 4, 10, st, 0, 51, 0, 10); var tc = new THREE.Mesh(new THREE.ConeGeometry(2.6, 7, 10), st); tc.position.y = 59.5; t.add(tc); });
dlnCyl(g, 20, 20, 16, st, 0, 38, 0, 24);
for (var c = 0; c < (DLN.lite ? 12 : 24); c++) {
var a = c / (DLN.lite ? 12 : 24) * Math.PI * 2;
dlnCyl(g, 0.8, 0.9, 14, st, Math.cos(a) * 21.5, 38, Math.sin(a) * 21.5, 8);
}
dlnCyl(g, 18, 19, 8, st, 0, 50, 0, 24);
var dome = new THREE.Mesh(new THREE.SphereGeometry(18, DLN.lite ? 16 : 28, DLN.lite ? 8 : 14, 0, Math.PI * 2, 0, Math.PI / 2), dlnShine(0x8A9AA0, 0.6, 0.3));
dome.scale.y = 1.3;
dome.position.y = 54;
g.add(dome);
dlnCyl(g, 3, 3.4, 10, st, 0, 82, 0, 12);
var ball = new THREE.Mesh(new THREE.SphereGeometry(1.4, 14, 10), dlnShine(0xD8B048, 0.3, 0.9));
ball.position.y = 89;
g.add(ball);
dlnBox(g, 0.5, 4, 0.5, dlnShine(0xD8B048, 0.3, 0.9), 0, 92, 0);
dlnBox(g, 2.4, 0.5, 0.5, dlnShine(0xD8B048, 0.3, 0.9), 0, 92.6, 0);
shkSolidBox(X(x), Z(0), 4.6, 40, 0);
shkSpot(X(106), Z(0), 4, "Ludgate Circus", "look up the hill", function () { lwlTale("⛪ Ludgate Hill", [], ["The railway crosses on its iron bridge, black with smoke, its trains to Dover and the Continent rumbling overhead; and over it, at the top of Ludgate Hill, Wren's dome of St Paul's, with the golden ball and cross three hundred and sixty-five feet up."]); });
},
function (P, x0, x1, zf, o) {
o = o || {};
var X = lwlX, Z = lwlZ, w = x1 - x0, cx = (x0 + x1) / 2, d = 16, h = o.h || 11.4, st = dlnS("pmstucco", o.tint || 0xFFFFFF), stone = dlnS("stone", 0xF2ECDC), dx = o.door != null ? o.door : x0 + 2.6;
dlnFace(P, w, h, o.curtains ? dlnS("stone", o.tint || 0xF4ECDC) : st, X(cx), h / 2, Z(zf - 0.15));
dlnBox(P, w, h, 0.3, dlnS("stock", 0xFFFFFF), X(cx), h / 2, Z(zf - d + 0.15));
[-1, 1].forEach(function (k) { dlnBox(P, 0.3, h, d, dlnS("stock", 0xFFFFFF), X(k < 0 ? x0 + 0.15 : x1 - 0.15), h / 2, Z(zf - d / 2)); });
dlnBox(P, w + 0.6, 0.6, 0.9, stone, X(cx), h + 0.1, Z(zf - 0.1));
for (var bx = x0 + 0.5; bx < x1; bx += DLN.lite ? 1.6 : 0.8)
dlnCyl(P, 0.1, 0.13, 0.7, stone, X(bx), h + 0.75, Z(zf), 6);
dlnGable(P, w - 1, d - 1, 2.8, dlnS("slate", 0xFFFFFF), X(cx), h + 0.4, Z(zf - d / 2));
dlnBox(P, w, 0.3, 0.4, stone, X(cx), 3.6, Z(zf + 0.05));
[-1, 1].forEach(function (k) { dlnCyl(P, 0.22, 0.26, 3.4, stone, X(dx + k * 1.3), 1.0 + 1.7, Z(zf + 2.0), 12); });
dlnBox(P, 3.4, 0.5, 2.6, stone, X(dx), 4.65, Z(zf + 1.0));
dlnBox(P, 3.6, 0.2, 2.8, stone, X(dx), 4.95, Z(zf + 1.0));
for (var s = 0; s < 5; s++)
dlnBox(P, 3.0, 0.2, 2.4 - s * 0.4, stone, X(dx), 0.1 + s * 0.2, Z(zf + 1.2 - s * 0.2));
dlnBox(P, 1.3, 2.6, 0.12, dlnC(o.doorCol || 0x1A1A1E), X(dx), 2.3, Z(zf + 0.08));
var fan = new THREE.Mesh(new THREE.CircleGeometry(0.62, 14, 0, Math.PI), dlnGlow(0xD8C890));
fan.position.set(X(dx), 3.6, Z(zf + 0.12));
P.add(fan);
dlnRail(P, X(x0 + 0.3), Z(zf + 3.4), X(dx - 1.6), Z(zf + 3.4));
dlnRail(P, X(dx + 1.6), Z(zf + 3.4), X(x1 - 0.3), Z(zf + 3.4));
if (o.curtains)
for (var wx = x0 + 2.4; wx < x1 - 1.6; wx += 3.4) {
if (Math.abs(wx - dx) < 2.2)
continue;
[[1.9, 2.4], [6.0, 2.6], [9.6, 2.0]].forEach(function (W, j) {
var wy = W[0] + W[1] / 2;
dlnBox(P, 1.6, W[1] + 0.3, 0.14, stone, X(wx), wy, Z(zf + 0.02));
dlnBox(P, 1.2, W[1], 0.06, dlnShine(0x1A2228, 0.2, 0.6), X(wx), wy, Z(zf + 0.08));
[-1, 1].forEach(function (k) { dlnBox(P, 0.42, W[1] - 0.1, 0.05, dlnC(0x6A1824), X(wx + k * 0.38), wy - 0.05, Z(zf + 0.12)); });
dlnBox(P, 1.24, 0.26, 0.07, dlnC(0x4A1018), X(wx), wy + W[1] / 2 - 0.13, Z(zf + 0.13));
dlnBox(P, 0.04, W[1], 0.03, dlnC(0xF2EEE4), X(wx), wy, Z(zf + 0.1));
dlnBox(P, 1.2, 0.04, 0.03, dlnC(0xF2EEE4), X(wx), wy, Z(zf + 0.1));
dlnBox(P, 1.8, 0.12, 0.3, stone, X(wx), W[0] - 0.08, Z(zf + 0.15));
if (j === 1) {
var tri = new THREE.Shape();
tri.moveTo(-0.95, 0);
tri.lineTo(0.95, 0);
tri.lineTo(0, 0.5);
tri.lineTo(-0.95, 0);
var pd = new THREE.Mesh(new THREE.ExtrudeGeometry(tri, { depth: 0.22, bevelEnabled: false }), stone);
pd.position.set(X(wx), wy + W[1] / 2 + 0.16, Z(zf + 0.02));
P.add(pd);
}
});
}
shkSolidBox(X(cx), Z(zf - d / 2), w, d, 0);
shkSolidBox(X(x0 + (dx - 1.6 - x0) / 2), Z(zf + 1.7), dx - 1.6 - x0, 3.4, 0);
shkSolidBox(X(dx + 1.6 + (x1 - dx - 1.6) / 2), Z(zf + 1.7), x1 - dx - 1.6, 3.4, 0);
},
function (P, R) {
var X = lwlX, Z = lwlZ, F = LWL_F;
[[-76, -54, -72], [-52, -30, -34], [-28, -10, -24.6], [20, 40, 23], [42, 60, 56], [62, 80, 65]].forEach(function (v, i) { lwlVilla(P, v[0], v[1], F.en, { door: v[2], tint: [0xFFF6E6, 0xF4EADA, 0xFFF2E0, 0xF0E6D4, 0xFFF4E4, 0xF6ECDC][i] }); });
lwlVilla(P, -8, 18, F.en, { door: LWL_CH.x, h: 13, curtains: 1, tint: 0xF8F0E2, doorCol: 0x1E2A22 });
shkDoor("lw_hall", X(LWL_CH.x), Z(F.en + 2.6), "Professor Challenger's house");
shkSpot(X(LWL_CH.x + 4.6), Z(F.en + 4.6), 2.8, "The Professor's house", "look at it", function () { lwlTale("🏛️ Enmore Park", ["portico"], ["The steps down from the portico are the ones reporters come down head first. Three pound fifteen each, the Professor says, is what the magistrates charge him."]); });
dlnRail(P, X(-76), Z(-122.6), X(-2), Z(-122.6));
dlnRail(P, X(2), Z(-122.6), X(76), Z(-122.6));
shkSolidBox(X(0), Z(-110), 152, 24, 0);
var tr = [];
[-64, -40, -16, 12, 36, 60].forEach(function (dx, i) { if (DLN.lite && i % 2)
return; tr.push({ x: X(dx), z: Z(-110 + (i % 2) * 6), h: 13 }); });
dlnPlanes(P, tr, wRand(1912));
[-50, -10, 30].forEach(function (dx) { kgnBench(P, X(dx), Z(-120.4), Math.PI); });
shkSpot(X(-30), Z(-124.2), 2.4, "The garden railings", "look in", function () { lwlTale("🌳 Enmore Park", [], ["A private garden for the houses round it, its gate locked, a key for each household: lawns, plane trees and gravel walks, nursemaids and perambulators in the morning. Kensington is quiet, rich and new: the museums at South Kensington are a walk away."]); });
dlnTerrace(P, LWL_X - 76, LWL_X + 76, Z(-96), -1, 4, { tint: 0xE8D8C0 });
[-1, 1].forEach(function (k) { wsmBlock(P, X(k * 84), Z(-130), 24, 14, 12, dlnS("pmstucco", 0xFFFFFF), k < 0 ? Math.PI / 2 : -Math.PI / 2, { roof: 3, base: 3.6, balus: true }); });
for (var lx = -70; lx < 76; lx += DLN.lite ? 36 : 18) {
dlnLamp(P, X(lx), Z(-135.6 + 0.2));
dlnLamp(P, X(lx + 9), Z(-124.4));
}
dlnPillarBox(P, X(30), Z(-124.6));
},
function (P, R) {
var X = lwlX, Z = lwlZ, F = LWL_F, st = dlnS("portland", 0xF0EADC), stone = dlnS("stone", 0xE8E2D4);
var g = wsmBlock(P, X(-8), Z(F.vn - 15), 44, 30, 16, dlnS("pmpalazzo", 0xFFFFFF), 0, { roof: false, base: 4.2, balus: true });
for (var c = 0; c < 4; c++)
dlnCyl(P, 0.5, 0.56, 9.6, stone, X(-14.6 + c * 4.4), 4.2 + 4.8, Z(F.vn + 1.6), 14);
dlnBox(P, 16, 1.2, 2.6, stone, X(-8), 14.4, Z(F.vn + 1.0));
var pd = new THREE.Mesh(new THREE.CylinderGeometry(9.2, 9.2, 2.4, 3, 1), stone);
pd.rotation.z = Math.PI / 2;
pd.rotation.y = Math.PI / 2;
pd.scale.set(1, 0.34, 1);
pd.position.set(X(-8), 16.4, Z(F.vn + 1.0));
P.add(pd);
var zs = bsSign("ZOOLOGICAL INSTITUTE", 12, 0.9, "#E8E2D4", "#2A2A2A");
zs.position.set(X(-8), 13.2, Z(F.vn + 0.06));
P.add(zs);
dlnBox(P, 3.2, 4.0, 0.3, dlnC(0x1E1A16), X(LWL_ZI.x), 2.0 + 0.6, Z(F.vn + 0.08));
var arch = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 0.5, 16, 1, false, 0, Math.PI), stone);
arch.rotation.x = Math.PI / 2;
arch.rotation.z = Math.PI / 2;
arch.position.set(X(LWL_ZI.x), 4.6, Z(F.vn + 0.2));
P.add(arch);
for (var s = 0; s < 4; s++)
dlnBox(P, 8, 0.15, 1.6 - s * 0.3, stone, X(LWL_ZI.x), 0.08 + s * 0.15, Z(F.vn + 0.8 - s * 0.15));
[-1, 1].forEach(function (k) { dlnCyl(P, 0.06, 0.08, 2.6, dlnShine(0x1E2A22, 0.6, 0.5), X(LWL_ZI.x + k * 3), 1.3, Z(F.vn + 1.2), 8); dlnCyl(P, 0.22, 0.14, 0.5, dlnGlow(0xFFF0D0), X(LWL_ZI.x + k * 3), 2.85, Z(F.vn + 1.2), 6); });
var bill = dlnPanel(["MR PERCIVAL WALDRON", "THE RECORD OF THE AGES", "8.30 p.m."], "LECTURE TONIGHT", 1.5, 2.0, "#F4ECD8", "#2A1A10");
bill.position.set(X(LWL_ZI.x + 5.4), 1.7, Z(F.vn + 0.2));
P.add(bill);
shkSolidBox(X(-8), Z(F.vn + 1.6), 17, 1.2, 0);
shkDoor("lw_inst", X(LWL_ZI.x), Z(F.vn + 3.0), "The Zoological Institute's Hall");
shkSpot(X(LWL_ZI.x + 5.4), Z(F.vn + 3.0), 2.2, "The lecture bill", "read it", function () { lwlTale("🦕 Tonight at the Institute", ["waldron"], ["Members and their friends; students admitted to the gallery and the back benches. Professor Challenger is not on the bill, but everybody has heard he is coming."]); });
dlnTerrace(P, LWL_X - 56, LWL_X - 32, Z(F.vn), 1, 4, { tint: 0xD8BC9C });
dlnTerrace(P, LWL_X + 16, LWL_X + 56, Z(F.vn), 1, 4, { tint: 0xD0B494 });
lwlShop(P, 38, 50, F.vn, 1, "THE BODLEY HEAD · JOHN LANE", 0x2A3A2A, [0xE8D8A8, 0x6A1A1A, 0x1A3A2A, 0x2A2A5A]);
lwlShop(P, -52, -40, F.vn, 1, "E. GOODE · TAXIDERMIST", 0x3A2A1A, [0x8A6A4A, 0x5A4A3A, 0xC8B890]);
shkSpot(X(44), Z(F.vn + 3), 2.4, "The Bodley Head", "look in", function () { lwlTale("📚 The Bodley Head", [], ["John Lane's bookshop and publishing house in Vigo Street, at the sign of Sir Thomas Bodley's head: the publisher of the young poets of the nineties and the new writers since."]); });
var A = LWL_AL.x, z = F.vs;
dlnTerrace(P, LWL_X - 56, LWL_X + 14, Z(z), -1, 4, { tint: 0xD4B898 });
dlnTerrace(P, LWL_X + 30, LWL_X + 56, Z(z), -1, 4, { tint: 0xDCC0A0 });
var ga = new THREE.Group();
ga.position.set(X(A), 0, Z(z));
P.add(ga);
[-1, 1].forEach(function (k) { dlnBox(ga, 2.2, 8, 8, dlnS("stock", 0xFFFFFF), k * 5.8, 4, 4); dlnCyl(ga, 0.3, 0.34, 5, stone, k * 2.2, 2.5, 0.2, 12); });
dlnBox(ga, 6.4, 0.8, 1.4, stone, 0, 5.4, 0.2);
var gp = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.6, 1.2, 3, 1), stone);
gp.rotation.z = Math.PI / 2;
gp.rotation.y = Math.PI / 2;
gp.scale.set(1, 0.3, 1);
gp.position.set(0, 6.4, 0.2);
ga.add(gp);
dlnBox(ga, 4.4, 0.3, 10, dlnC(0x3A3A40), 0, 4.6, 5.4);
dlnBox(ga, 4.4, 0.1, 10, dlnS("flags", 0xC8C4BC), 0, 0.04, 5.4);
for (var cz = 1; cz < 10; cz += 2.4)
[-2.0, 2.0].forEach(function (k) { dlnCyl(ga, 0.08, 0.1, 4.4, dlnShine(0x1E2A22, 0.6, 0.5), k, 2.2, cz, 8); });
dlnBox(ga, 4.4, 4.6, 0.3, dlnS("stock", 0xFFFFFF), 0, 2.3, 10.4);
var as = bsSign("ALBANY", 2.4, 0.45, "#1A1A1E", "#E8C860");
as.position.set(0, 5.4, -0.52);
as.rotation.y = Math.PI;
ga.add(as);
shkSolidBox(X(A - 5.8), Z(z + 4), 2.2, 8, 0);
shkSolidBox(X(A + 5.8), Z(z + 4), 2.2, 8, 0);
shkSolidBox(X(A), Z(z + 10.4), 4.4, 0.4, 0);
shkDoor("lw_albany", X(A), Z(z + 1.0), "The Albany: Lord John Roxton's rooms");
shkSpot(X(A - 3.6), Z(z - 1.6), 2.4, "The Albany", "look", function () { lwlTale("🗝️ The Albany", ["vigo"], ["Chambers for bachelor gentlemen since 1803, in a great house off Piccadilly and two long ranges behind it, joined by a covered walk to this gate in Vigo Street. Byron lived here, and Macaulay. Lord John Roxton lives here now."]); });
[-1, 1].forEach(function (k) { wsmBlock(P, X(k * 62), Z(125), 16, 12, 13, dlnS("georgian", 0xD8C0A4), k < 0 ? Math.PI / 2 : -Math.PI / 2, { roof: 3, base: 3.3 }); });
for (var lx = -50; lx < 56; lx += DLN.lite ? 40 : 20) {
dlnLamp(P, X(lx), Z(121.0));
dlnLamp(P, X(lx + 10), Z(129.6));
}
},
function (P, R) {
var X = lwlX, Z = lwlZ, F = LWL_F, stone = dlnS("stone", 0xE8E2D4), st = dlnS("portland", 0xF0EADC);
var q = wsmBlock(P, X(15), Z(F.ln - 18), 58, 36, 22, dlnS("lwterra", 0xFFFFFF), 0, { roof: 4, base: 4.6, balus: true });
var qs = bsSign("QUEEN'S HALL", 14, 1.4, "#E8C8A0", "#3A1A10");
qs.position.set(X(15), 18.6, Z(F.ln + 0.04));
P.add(qs);
dlnBox(P, 24, 0.25, 3.2, dlnShine(0x2A3A2A, 0.5, 0.4), X(LWL_QH.x), 4.6, Z(F.ln + 1.6));
for (var k = -1; k <= 1; k += 2)
dlnCyl(P, 0.08, 0.1, 4.6, dlnShine(0x2A3A2A, 0.5, 0.4), X(LWL_QH.x + k * 11.6), 2.3, Z(F.ln + 3.0), 8);
for (var d = -2; d <= 2; d++) {
dlnBox(P, 2.4, 3.4, 0.2, dlnC(0x2A1E14), X(LWL_QH.x + d * 4.4), 1.7, Z(F.ln + 0.08));
dlnBox(P, 2.0, 0.7, 0.06, dlnGlow(0xF0D8A0), X(LWL_QH.x + d * 4.4), 3.0, Z(F.ln + 0.2));
}
[["THE ZOOLOGICAL INSTITUTE", "REPORT OF THE COMMITTEE", "OF INVESTIGATION"], ["PROMENADE CONCERTS", "MR HENRY J. WOOD", "AND THE QUEEN'S HALL ORCHESTRA"]].forEach(function (L, i) { var b = dlnPanel(L, i ? "QUEEN'S HALL" : "GREAT MEETING", 1.8, 2.4, "#F4ECD8", "#2A1A10"); b.position.set(X(LWL_QH.x + (i ? 14.6 : -14.6)), 1.7, Z(F.ln + 0.2)); P.add(b); });
shkDoor("lw_queens", X(LWL_QH.x), Z(F.ln + 3.4), "The Queen's Hall");
shkSpot(X(LWL_QH.x - 14.6), Z(F.ln + 3.2), 2.4, "The bills of the Queen's Hall", "read them", function () { lwlTale("🎻 The Queen's Hall", [], ["Built in 1893 to hold nearly three thousand people, the best concert-hall in London: Mr Henry Wood conducts the Promenade Concerts here every summer, a shilling to stand in the arena. Great meetings are held here too, and tonight the Zoological Institute hears the report of the expedition from South America."]); });
dlnTerrace(P, LWL_X - 56, LWL_X - 16, Z(F.ln), 1, 4, { tint: 0xDCC2A2 });
wsmBlock(P, X(52), Z(F.ln - 10), 12, 20, 14, dlnS("pmstucco", 0xFFFFFF), 0, { roof: 3, base: 3.6 });
wsmBlock(P, X(22), Z(F.ls + 16), 70, 32, 24, dlnS("lwoffice", 0xFFFFFF), Math.PI, { roof: 4, base: 4.4, door: 0 });
var lh = bsSign("THE LANGHAM HOTEL", 12, 1.0, "#F2EEE4", "#1A1A1A");
lh.position.set(X(22), 21, Z(F.ls - 0.05));
lh.rotation.y = Math.PI;
P.add(lh);
lwlSouls(P);
[-1, 1].forEach(function (k) { wsmBlock(P, X(k * 66), Z(240), 16, 12, 14, dlnS("pmstucco", 0xFFFFFF), k < 0 ? Math.PI / 2 : -Math.PI / 2, { roof: 3, base: 3.6 }); });
for (var lx = -52; lx < 58; lx += DLN.lite ? 40 : 20) {
dlnLamp(P, X(lx), Z(234.4));
dlnLamp(P, X(lx + 10), Z(245.6));
}
dlnPillarBox(P, X(-4), Z(245.4));
},
function (P) {
var X = lwlX, Z = lwlZ, st = dlnS("portland", 0xF2ECDE), g = new THREE.Group();
g.position.set(X(-38), 0, Z(LWL_F.ls + 5));
P.add(g);
dlnCyl(g, 5.4, 5.6, 0.8, st, 0, 0.4, 0, 20);
for (var c = 0; c < (DLN.lite ? 8 : 12); c++) {
var a = c / (DLN.lite ? 8 : 12) * Math.PI * 2;
dlnCyl(g, 0.32, 0.36, 8, st, Math.cos(a) * 4.8, 4.8, Math.sin(a) * 4.8, 10);
}
dlnCyl(g, 3.6, 3.6, 8, dlnC(0xD8D0C0), 0, 4.8, 0, 16);
dlnCyl(g, 5.4, 5.4, 1.2, st, 0, 9.4, 0, 20);
dlnCyl(g, 3.4, 3.6, 4, st, 0, 12, 0, 16);
for (var r = 0; r < 12; r++) {
var a2 = r / 12 * Math.PI * 2;
dlnCyl(g, 0.2, 0.22, 5, st, Math.cos(a2) * 3.0, 16.5, Math.sin(a2) * 3.0, 8);
}
dlnCyl(g, 3.2, 3.2, 0.6, st, 0, 19.3, 0, 16);
var sp = new THREE.Mesh(new THREE.ConeGeometry(2.8, 22, 16), st);
sp.position.y = 30.6;
g.add(sp);
dlnBox(g, 0.1, 1.4, 0.1, dlnShine(0xD8B048, 0.3, 0.9), 0, 42.3, 0);
dlnBox(g, 14, 13, 20, dlnS("pmstucco", 0xFFFFFF), 0, 6.5, 14);
shkSolidBox(X(-38), Z(LWL_F.ls + 5), 11.4, 11.4, 0);
shkSolidBox(X(-38), Z(LWL_F.ls + 19), 14, 20, 0);
shkSpot(X(-38), Z(LWL_F.ls - 1.8), 3, "All Souls' church", "look up", function () { lwlTale("⛪ All Souls', Langham Place", [], ["John Nash built it in 1824 to close the view at the top of his Regent Street: a round porch of Ionic columns, and above it a ring of columns carrying a spire as sharp as a candle-snuffer. People laughed at it then; they love it now."]); });
},
function (P, x, z, ry, col) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
P.add(g);
var body = dlnShine(col || 0x5A1A1E, 0.4, 0.3), black = dlnShine(0x141414, 0.45, 0.3), brass = dlnShine(0xC8A048, 0.3, 0.9), glass = dlnShine(0x9AAAB4, 0.1, 0.6);
dlnBox(g, 1.5, 0.25, 3.6, black, 0, 0.55, 0);
dlnBox(g, 1.0, 0.7, 1.0, body, 0, 0.95, 1.3);
dlnBox(g, 1.04, 0.08, 1.04, black, 0, 1.32, 1.3);
dlnBox(g, 0.9, 0.66, 0.08, brass, 0, 0.95, 1.83);
dlnBox(g, 1.4, 0.5, 0.6, body, 0, 0.9, 0.5);
dlnBox(g, 1.3, 0.06, 0.5, dlnC(0x2A1E14), 0, 1.2, 0.5);
dlnBox(g, 1.3, 0.5, 0.04, glass, 0, 1.5, 0.82);
dlnBox(g, 1.5, 1.3, 1.6, body, 0, 1.3, -0.8);
dlnBox(g, 1.54, 0.12, 1.64, black, 0, 2.0, -0.8);
[-1, 1].forEach(function (k) { dlnBox(g, 0.04, 0.5, 0.7, glass, k * 0.76, 1.5, -0.8); });
var meter = dlnBox(g, 0.18, 0.24, 0.12, brass, 0.6, 1.35, 0.82);
var flag = dlnBox(g, 0.04, 0.3, 0.14, dlnC(0xB82020), 0.66, 1.62, 0.82);
[[-0.72, 1.2], [0.72, 1.2], [-0.72, -1.1], [0.72, -1.1]].forEach(function (p) { var w = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.07, 6, 16), black); w.rotation.y = Math.PI / 2; w.position.set(p[0], 0.4, p[1]); g.add(w); var hub = dlnCyl(g, 0.1, 0.1, 0.12, brass, p[0], 0.4, p[1], 8); hub.rotation.z = Math.PI / 2; });
[-0.4, 0.4].forEach(function (k) { dlnCyl(g, 0.12, 0.12, 0.14, brass, k, 1.0, 1.9, 10).rotation.x = Math.PI / 2; });
return g;
},
function () {
var X = lwlX, Z = lwlZ, live = LWL.live, Pc = LWL_PIECES;
["f", "e", "v", "l"].forEach(function (k, i) {
var c = Pc[k].cab;
lwlTaxi(live, X(c.x - 4), Z(c.z), Math.PI / 2, [0x5A1A1E, 0x1E3A2A, 0x2A2A3A, 0x5A1A1E][i]);
if (!DLN.lite) {
lwlTaxi(live, X(c.x - 9.5), Z(c.z), Math.PI / 2, [0x1E3A2A, 0x5A1A1E, 0x5A1A1E, 0x1E2A3A][i]);
dlnHansom(live, X(c.x - 15), Z(c.z), Math.PI / 2);
}
shkSpot(X(c.x), Z(c.z + (k === "v" ? 1.8 : k === "l" ? 2.2 : 2.6)), 3.2, "The cab rank, " + Pc[k].name, "take a cab", function () { lwlCabCard(); });
});
var loops = { f: [[-140, -3.6], [180, -3.6], [180, 3.6], [-140, 3.6], [-140, -3.6]], e: [[-76, -131.6], [76, -131.6], [76, -128.4], [-76, -128.4], [-76, -131.6]], l: [[-58, 238], [58, 238], [58, 242], [-58, 242], [-58, 238]] };
LWL.loops = {};
Object.keys(loops).forEach(function (k) { var L = loops[k], Ld = 0; for (var i = 1; i < L.length; i++)
Ld += Math.hypot(L[i][0] - L[i - 1][0], L[i][1] - L[i - 1][1]); LWL.loops[k] = { L: L, len: Ld }; });
var add = function (k, g, n, i, sp, flip) { live.add(g); LWL.cabs.push({ g: g, k: k, s: i * LWL.loops[k].len / n, sp: sp, flip: flip ? Math.PI : 0 }); };
var nf = DLN.lite ? 3 : 8;
for (var c = 0; c < nf; c++) {
var g;
if (c % 4 === 1 && typeof kgnBus === "function")
g = kgnBus(false);
else if (c % 4 === 3) {
g = new THREE.Group();
dlnHansom(g, 0, 0, 0);
}
else {
g = new THREE.Group();
lwlTaxi(g, 0, 0, 0, [0x5A1A1E, 0x1E3A2A, 0x2A2A3A][c % 3]);
}
add("f", g, nf, c, c % 4 === 3 ? 3.6 : 5 + c % 2, c % 4 === 3);
}
var ge = new THREE.Group();
lwlTaxi(ge, 0, 0, 0, 0x1E3A2A);
add("e", ge, 1, 0, 4.4);
var nl = DLN.lite ? 1 : 3;
for (var l = 0; l < nl; l++) {
var gl;
if (l === 1 && typeof kgnBus === "function")
gl = kgnBus(false);
else {
gl = new THREE.Group();
lwlTaxi(gl, 0, 0, 0, l ? 0x2A2A3A : 0x5A1A1E);
}
add("l", gl, nl, l, 4.2);
}
},
function (k) {
var F = LWL_FOLK[k], p = dlnPerson("lw_" + k, F.dress, { sex: F.sex, child: !!F.child });
p.position.set(lwlX(F.x), 0.02, lwlZ(F.z));
p.rotation.y = F.ry || 0;
SHK.live.add(p);
var P = { g: p, key: "lw_" + k, wander: F.wander ? { r: F.wander, sp: 0.45 } : null, ground: 0.02 };
SHK.people.push(P);
SHK.talk.push({ p: P, name: F.name, r: 3.2, t: { name: F.name, persona: F.persona, greet: F.greet } });
return P;
},
function (R) {
var X = lwlX, Z = lwlZ, crowd = function (n, x0, x1, z0, z1, kinds, o) {
if (DLN.lite)
n = Math.ceil(n * 0.4);
for (var i = 0; i < n; i++) {
var px = x0 + R() * (x1 - x0), pz = z0 + R() * (z1 - z0);
if (shkSolidAt(X(px), Z(pz), 0))
continue;
var who = kinds[(R() * kinds.length) | 0], p = dlnPerson("lwf" + SHK.people.length + "_" + i, who);
p.position.set(X(px), 0.02, Z(pz));
p.rotation.y = R() * 6.28;
SHK.live.add(p);
SHK.people.push({ g: p, wander: o && o.still ? null : { r: o && o.r || 10, sp: 0.35 + R() * 0.45 }, ground: 0.02 });
}
};
crowd(18, -140, 108, -10.2, -7.4, ["gent", "bowler", "worker", "lady", "gent", "newsboy", "clergy", "gent", "worker"], { r: 16 });
crowd(16, -140, 108, 7.4, 10.2, ["gent", "worker", "lady", "gent", "bowler", "oldgent"], { r: 16 });
crowd(6, -74, 74, -136.4, -133.6, ["lady", "gent", "maid", "nanny", "gent"], { r: 14 });
crowd(5, -74, 74, -125.6, -123.6, ["lady", "maid", "oldgent", "gent"], { r: 14 });
crowd(9, -54, 54, 120.8, 122.0, ["gent", "gent", "bowler", "lady", "oldgent", "clergy"], { r: 10 });
crowd(5, -54, 54, 128.6, 129.8, ["gent", "lady", "gent"], { r: 10 });
crowd(10, -56, 56, 234.0, 235.6, ["gent", "lady", "gent", "oldgent", "lady", "bowler"], { r: 12 });
crowd(7, -56, 56, 244.4, 246.0, ["lady", "gent", "maid", "gent"], { r: 12 });
Object.keys(LWL_FOLK).forEach(function (k) { try {
lwlNamed(k);
}
catch (e) { } });
},
function () {
if (LWL.built || !SHK.G)
return;
DLN.lite = !!SHK.lite;
DLN.G = SHK.G;
var R = wRand(1912), live0 = SHK.live;
LWL.live = new THREE.Group();
LWL.live.name = "lw-live";
SHK.G.add(LWL.live);
LWL.cabs = [];
var parts = [["f", [lwlGround, lwlFleet], "fleet street", 0, 0, 200], ["e", [lwlEnmore], "enmore park", 0, -120, 110], ["v", [lwlVigo], "vigo street", 0, 126, 80], ["l", [lwlLangham], "langham place", 0, 240, 90]];
parts.forEach(function (Pt) {
var all = new THREE.Group();
SHK.G.add(all);
Pt[1].forEach(function (f) { try {
f(all, R);
}
catch (e) {
if (window.console)
console.warn("[lost world] " + Pt[2], e);
} });
SHK.G.remove(all);
var g = new THREE.Group();
g.name = "lw-" + Pt[0];
SHK.G.add(g);
all.children.slice().forEach(function (m) { if (m.userData && m.userData.keep) {
LWL.live.add(m);
return;
} g.add(m); });
try {
ctnMerge(g);
g.children.forEach(function (m) { if (m.isMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
}
catch (e) {
if (window.console)
console.warn("[lost world] bake", e);
}
SHK.dist.push({ n: "lw-" + Pt[0], g: g, x: lwlX(Pt[3]), z: lwlZ(Pt[4]), r: Pt[5] });
});
try {
lwlTraffic();
}
catch (e) {
if (window.console)
console.warn("[lost world] traffic", e);
}
try {
lwlFolk(R);
}
catch (e) {
if (window.console)
console.warn("[lost world] folk", e);
}
SHK.live = live0;
LWL.built = true;
},
function () {
return dlnTex("lwredpaper", 256, 256, function (x, W, H) {
x.fillStyle = "#6A1A1E";
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(216,168,96,.28)";
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
var cx = i * 64 + (j % 2) * 32 + 16, cy = j * 64 + 32;
x.beginPath();
x.moveTo(cx, cy - 18);
x.lineTo(cx + 10, cy);
x.lineTo(cx, cy + 18);
x.lineTo(cx - 10, cy);
x.fill();
}
dlnNoise(x, W, H, 300, 0.06, 151);
}, 1.0, 1.0);
},
function () { return dlnTex("lwslate", 256, 256, function (x, W, H) { x.fillStyle = "#4A4A4E"; x.fillRect(0, 0, W, H); x.strokeStyle = "rgba(20,20,20,.45)"; x.lineWidth = 2; for (var i = 0; i < 4; i++) {
x.beginPath();
x.moveTo(i * 64, 0);
x.lineTo(i * 64, H);
x.stroke();
x.beginPath();
x.moveTo(0, i * 64);
x.lineTo(W, i * 64);
x.stroke();
} dlnNoise(x, W, H, 700, 0.1, 159); }, 2, 2); },
function () {
return DLN.tex.lwsketch || (DLN.tex.lwsketch = wTex(256, 192, function (c, W, H) {
c.fillStyle = "#EEE6D0";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#5A4A3A";
c.lineWidth = 2;
c.strokeRect(6, 6, W - 12, H - 12);
c.fillStyle = "#9AB878";
c.fillRect(10, H * 0.62, W - 20, H * 0.3);
c.fillStyle = "#A8483A";
c.beginPath();
c.moveTo(10, H * 0.62);
for (var i = 0; i <= 12; i++)
c.lineTo(10 + i * (W - 20) / 12, H * (0.22 + ((i * 37) % 5) * 0.012));
c.lineTo(W - 10, H * 0.62);
c.fill();
c.strokeStyle = "rgba(60,20,10,.45)";
c.lineWidth = 1;
for (var k = 0; k < 20; k++) {
c.beginPath();
c.moveTo(14 + k * 12, H * 0.25);
c.lineTo(14 + k * 12, H * 0.6);
c.stroke();
}
c.fillStyle = "#8A3A2A";
c.beginPath();
c.moveTo(W * 0.72, H * 0.62);
c.lineTo(W * 0.76, H * 0.3);
c.lineTo(W * 0.82, H * 0.62);
c.fill();
c.fillStyle = "#3A6A2A";
c.beginPath();
c.ellipse(W * 0.77, H * 0.24, 16, 10, 0, 0, 7);
c.fill();
c.fillStyle = "#2A2A2A";
c.font = "italic 11px Georgia";
c.fillText("the plateau: from the south-east", 14, H - 12);
}));
},
function () {
return DLN.tex.lwbeast || (DLN.tex.lwbeast = wTex(256, 192, function (c, W, H) {
c.fillStyle = "#EEE6D0";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#5A4A3A";
c.lineWidth = 2;
c.strokeRect(6, 6, W - 12, H - 12);
c.fillStyle = "#7A8A5A";
c.beginPath();
c.ellipse(W * 0.52, H * 0.56, W * 0.26, H * 0.17, 0, 0, 7);
c.fill();
c.fillRect(W * 0.34, H * 0.62, 10, H * 0.24);
c.fillRect(W * 0.62, H * 0.62, 10, H * 0.24);
c.beginPath();
c.moveTo(W * 0.28, H * 0.56);
c.lineTo(W * 0.14, H * 0.48);
c.lineTo(W * 0.16, H * 0.56);
c.fill();
c.beginPath();
c.moveTo(W * 0.76, H * 0.56);
c.lineTo(W * 0.94, H * 0.7);
c.lineTo(W * 0.78, H * 0.62);
c.fill();
c.fillStyle = "#A8483A";
for (var i = 0; i < 9; i++) {
c.beginPath();
c.moveTo(W * (0.32 + i * 0.045), H * 0.42);
c.lineTo(W * (0.34 + i * 0.045), H * (0.28 - (i % 2) * 0.04));
c.lineTo(W * (0.36 + i * 0.045), H * 0.42);
c.fill();
}
c.fillStyle = "#3A6A2A";
c.fillRect(W * 0.86, H * 0.12, 6, H * 0.74);
c.beginPath();
c.ellipse(W * 0.87, H * 0.12, 22, 10, 0, 0, 7);
c.fill();
c.fillStyle = "#2A2A2A";
c.fillRect(W * 0.1, H * 0.76, 4, 12);
c.beginPath();
c.arc(W * 0.1 + 2, H * 0.74, 3, 0, 7);
c.fill();
c.font = "italic 11px Georgia";
c.fillText("sketched from the life", 14, H - 12);
}));
},
function () {
return DLN.tex.lwslide || (DLN.tex.lwslide = wTex(256, 192, function (c, W, H) {
c.fillStyle = "#F8F4E8";
c.fillRect(0, 0, W, H);
c.fillStyle = "#2A2A2A";
c.font = "bold 16px Georgia";
c.textAlign = "center";
c.fillText("THE RECORD OF THE AGES", W / 2, 26);
var cols = ["#C8A060", "#A87848", "#8A5A38", "#6A4A30", "#4A3A28"], labs = ["Quaternary", "Tertiary", "Cretaceous", "Jurassic", "Triassic"];
c.font = "12px Georgia";
for (var i = 0; i < 5; i++) {
c.fillStyle = cols[i];
c.fillRect(30, 40 + i * 28, W - 60, 26);
c.fillStyle = "#F8F4E8";
c.fillText(labs[i], W / 2, 57 + i * 28);
}
}));
},
function (spread) {
var g = new THREE.Group(), skin = dlnShine(0x5A5650, 0.75, 0.1), mem = new THREE.MeshLambertMaterial({ color: 0x6A5E54, side: THREE.DoubleSide }), eye = dlnGlow(0xFF3A1E), tooth = dlnC(0xF0ECDC);
var body = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 8), skin);
body.scale.set(0.8, 0.9, 1.6);
body.position.y = 0.9;
g.add(body);
var neck = dlnCyl(g, 0.08, 0.12, 0.5, skin, 0, 1.15, 0.45, 8);
neck.rotation.x = -0.8;
var head = new THREE.Group();
head.position.set(0, 1.32, 0.72);
g.add(head);
var sk = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.9, 8), skin);
sk.rotation.x = Math.PI / 2;
sk.position.z = 0.38;
head.add(sk);
var crest = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.5, 6), skin);
crest.rotation.x = -Math.PI / 2 - 0.4;
crest.position.set(0, 0.08, -0.2);
head.add(crest);
[-1, 1].forEach(function (k) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 5), eye); e.position.set(k * 0.07, 0.05, 0.02); head.add(e); for (var t = 0; t < 6; t++) {
var th = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.05, 4), tooth);
th.position.set(k * 0.03, -0.04, 0.12 + t * 0.08);
th.rotation.x = Math.PI;
head.add(th);
} });
var tail = dlnCyl(g, 0.02, 0.07, 0.9, skin, 0, 0.8, -0.75, 6);
tail.rotation.x = -1.4;
[-1, 1].forEach(function (k) { dlnCyl(g, 0.03, 0.04, 0.55, skin, k * 0.12, 0.48, -0.1, 6); });
g.userData.wings = [];
[-1, 1].forEach(function (k) {
var w = new THREE.Group();
w.position.set(k * 0.2, 1.0, 0.1);
g.add(w);
var bone = dlnCyl(w, 0.025, 0.035, 1.6, skin, k * 0.8, 0, 0.1, 6);
bone.rotation.z = Math.PI / 2;
var shp = new THREE.Shape();
shp.moveTo(0, 0.15);
shp.lineTo(k * 1.6, 0.12);
shp.lineTo(k * 1.4, -0.2);
shp.lineTo(k * 0.6, -0.5);
shp.lineTo(0, -0.4);
shp.lineTo(0, 0.15);
var m = new THREE.Mesh(new THREE.ShapeGeometry(shp), mem);
m.rotation.x = -Math.PI / 2;
w.add(m);
g.userData.wings.push({ g: w, k: k });
});
lwlPteroFold(g, !spread);
return g;
},
function () {
var b = worldBtn("down", "Down to the machine-room", "The rotary presses, the reels of paper") + worldBtn("stay", "Stay in the reporters' room", "");
worldCard(worldFacts("🪜 The Gazette's stair", "Down past the composing-room", [], ["The stair smells of ink and hot metal: up under the roof the compositors set the type by hand and by Linotype machine; down in the basement the presses wait for the formes."]) + b, { down: function () { worldCard(null); shkGoIn("lw_press"); }, stay: function () { worldCard(null); } });
},
function (g, cx, cz, R, Rm) {
var h = 3.5, wood = dlnS("oak", 0x5A3418), brass = dlnShine(0xC8A048, 0.3, 0.9);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("n14rose", 0xFFFFFF), low: dlnS("oak", 0x4A2E1A), lowH: 0.9, h: h, ceil: dlnC(0xF2EEE4), outName: "The front door: out to the Camberwell tram", out: function () { lwlGo("gazette", "🚋 <b>Fleet Street.</b> The Camberwell tram, then the Embankment, and on foot up to the Gazette's lit door."); } });
dlnBox(g, 5.4, 0.02, 4.6, dlnS("n14turkey", 0xFFFFFF), cx, 0.01, cz - 0.4);
wsmWin(g, cx - Rm.hw + 0.06, 1.7, cz - 1.4, Math.PI / 2, 1.6, 2.2);
[-1, 1].forEach(function (k) { var c = dlnBox(g, 0.14, 2.9, 0.8, dlnC(0x9A1A1E), cx - Rm.hw + 0.16, 1.5, cz - 1.4 + k * 1.1); });
dlnBox(g, 0.2, 0.3, 2.8, dlnC(0x7A1418), cx - Rm.hw + 0.16, 3.05, cz - 1.4);
var pi = new THREE.Group();
pi.position.set(cx + 1.2, 0, cz - Rm.hd + 0.4);
g.add(pi);
dlnBox(pi, 1.5, 1.3, 0.6, dlnShine(0x1A0E08, 0.3, 0.2), 0, 0.65, 0);
dlnBox(pi, 1.36, 0.06, 0.24, dlnC(0xF4F0E4), 0, 0.76, 0.38);
for (var k = 0; k < 12; k++)
dlnBox(pi, 0.05, 0.03, 0.12, dlnC(0x141414), -0.6 + k * 0.11, 0.8, 0.34);
dlnBox(pi, 0.6, 0.4, 0.04, dlnC(0xF4F0E4), 0, 1.1, 0.3);
[-0.5, 0.5].forEach(function (x) { dlnCyl(pi, 0.04, 0.04, 0.2, brass, x, 1.4, 0.2, 6); });
shkSolidBox(cx + 1.2, cz - Rm.hd + 0.45, 1.6, 0.8, 0);
dlnCyl(g, 0.03, 0.03, 1.6, brass, cx - 0.2, 0.8, cz - Rm.hd + 0.8, 6);
var sh = dlnCyl(g, 0.18, 0.34, 0.32, dlnC(0xD8A070), cx - 0.2, 1.7, cz - Rm.hd + 0.8, 12, true);
var bl = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), dlnGlow(0xFFE2B0));
bl.position.set(cx - 0.2, 1.62, cz - Rm.hd + 0.8);
g.add(bl);
n14Sofa(g, cx - 1.2, cz - Rm.hd + 1.4, 0, 0x6A2A3A);
n14Arm(g, cx + Rm.hw - 1.2, cz + 0.6, -Math.PI / 2, 0x3A4A2A);
dlnFireplace(g, cx + Rm.hw - 0.3, cz - 1.2, -Math.PI / 2);
shkSolidBox(cx + Rm.hw - 0.3, cz - 1.2, 0.7, 2.3, 0);
[[0.0, 0x2A5A2A], [1.0, 0x3A6A3A]].forEach(function (p) { dlnCyl(g, 0.18, 0.14, 0.36, dlnC(0x8A4A2A), cx - Rm.hw + 0.5, 0.18, cz + 1.2 + p[0], 10); var lf = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 6), dlnC(p[1])); lf.scale.set(1, 1.3, 1); lf.position.set(cx - Rm.hw + 0.5, 0.9, cz + 1.2 + p[0]); g.add(lf); });
n14Pic(g, cx + 0.4, 2.2, cz + Rm.hd - 0.05, Math.PI, 0.7, 0.9, ["#6A8AAA", "#A8B8A0", "#3A5A3A"]);
n14Pic(g, cx + Rm.hw - 0.05, 2.2, cz + 1.8, -Math.PI / 2, 0.6, 0.8, ["#C8A878", "#8A6A4A", "#4A3A2A"]);
dlnPendant(g, cx, h, cz - 0.4, 0.6);
shkSpot(cx - Rm.hw + 0.9, cz - 1.4, 1.8, "The red curtain", "look", function () { lwlTale("🟥 The red curtain", ["curtain"], ["Gladys Hungerton's father's house in Streatham, the Chestnuts: a little villa in a garden, a long way out on the tram."]); });
shkSpot(cx + 1.2, cz - Rm.hd + 1.3, 1.6, "The piano", "look", function () { lwlTale("🎹 The piano", [], ["An upright piano in rosewood with brass candle-sconces, songs open on the stand: \"The Rosary\" and a waltz from the Gaiety."]); });
shkSpot(cx + Rm.hw - 1.6, cz + 0.6, 1.6, "The deep arm-chair", "look", function () { lwlTale("💺 The deep arm-chair", [], ["Ned Malone's chair, three evenings a week, by Mr Hungerton's fire."]); });
Rm.hello = "<b>The Chestnuts, Streatham.</b> Gladys Hungerton's drawing-room: the red curtain, the piano, the shaded standard lamp, the fire, and a deep arm-chair.";
},
function (g, cx, cz, R, Rm) {
var h = 4.2, wood = dlnS("oak", 0x6A4A2A), dark = dlnS("oak", 0x3A2414), brass = dlnShine(0xC8A048, 0.3, 0.9), glass = new THREE.MeshBasicMaterial({ color: 0xC8D8E0, transparent: true, opacity: 0.22, depthWrite: false });
dlnShell(g, cx, cz, Rm, { floor: dlnS("lwlino", 0xFFFFFF), wall: dlnS("lwcream", 0xE8E0C8), low: dlnS("oak", 0x5A3A22), lowH: 1.2, h: h, ceil: dlnC(0xEEE8D8), outName: "The stair down and out: Fleet Street", out: function () { lwlGo("gazette", "📰 <b>Fleet Street.</b> Out past the commissionaire into the roar of the street."); } });
for (var r = 0; r < 2; r++)
for (var d = 0; d < 3; d++) {
var dx = cx - 4.2 + d * 3.0, dz = cz + 1.6 + r * 3.2;
n14Table(g, dx, dz, 1.6, 0.8, 0.78, wood);
n14Chair(g, dx, dz + 0.8, Math.PI, dark);
var tw = new THREE.Group();
tw.position.set(dx - 0.2, 0.8, dz - 0.05);
g.add(tw);
dlnBox(tw, 0.42, 0.16, 0.34, dlnShine(0x141414, 0.4, 0.4), 0, 0.08, 0);
dlnBox(tw, 0.46, 0.06, 0.06, dlnShine(0x2A2A2A, 0.4, 0.6), 0, 0.2, -0.08);
dlnBox(tw, 0.3, 0.24, 0.01, dlnC(0xF8F6F0), 0, 0.32, -0.12);
dlnCyl(g, 0.02, 0.02, 0.32, brass, dx + 0.55, 0.96, dz - 0.2, 5);
var ls = dlnCyl(g, 0.06, 0.16, 0.12, dlnShine(0x2A5A3A, 0.4, 0.2), dx + 0.55, 1.14, dz - 0.2, 10, true);
var lb = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 5), dlnGlow(0xFFF0C8));
lb.position.set(dx + 0.55, 1.1, dz - 0.2);
g.add(lb);
dlnCyl(g, 0.005, 0.005, 0.2, dlnC(0x6A6A6A), dx + 0.4, 0.9, dz + 0.2, 4);
for (var p = 0; p < 4; p++)
dlnBox(g, 0.2, 0.005, 0.28, dlnC(0xF4F0E4), dx + 0.1 + p * 0.02, 0.79 + p * 0.006, dz + 0.15);
}
var ph = new THREE.Group();
ph.position.set(cx - Rm.hw + 0.25, 0, cz + 4);
g.add(ph);
dlnBox(ph, 0.4, 2.0, 2.6, wood, 0, 1.5, 0);
for (var i = 0; i < 5; i++)
for (var j = 0; j < 6; j++)
dlnBox(ph, 0.02, 0.28, 0.36, dlnC(0x2A1A10), 0.2, 0.7 + i * 0.35, -1.1 + j * 0.42);
shkSolidBox(cx - Rm.hw + 0.25, cz + 4, 0.5, 2.7, 0);
var tel = new THREE.Group();
tel.position.set(cx - Rm.hw + 0.08, 1.5, cz + 1.0);
g.add(tel);
dlnBox(tel, 0.1, 0.5, 0.3, dark, 0, 0, 0);
dlnCyl(tel, 0.05, 0.05, 0.14, dlnShine(0x141414, 0.4, 0.3), 0.08, 0.12, 0, 8).rotation.z = Math.PI / 2;
dlnCyl(tel, 0.03, 0.04, 0.18, dlnShine(0x141414, 0.4, 0.3), 0.1, -0.04, 0.18, 8);
var ck = new THREE.Mesh(new THREE.CircleGeometry(0.4, 24), new THREE.MeshLambertMaterial({ map: pmlClockTex() }));
ck.position.set(cx, 3.2, cz + Rm.hd - 0.06);
ck.rotation.y = Math.PI;
g.add(ck);
var fr = new THREE.Group();
fr.position.set(cx + Rm.hw - 0.3, 0, cz + 3.0);
g.add(fr);
dlnBox(fr, 0.4, 1.4, 2.4, wood, 0, 0.7, 0);
for (var f = 0; f < 6; f++)
dlnBox(fr, 0.5, 0.03, 0.36, dlnC(0xEDE6D2), 0, 1.45 + f * 0.04, -0.9 + f * 0.36);
shkSolidBox(cx + Rm.hw - 0.3, cz + 3.0, 0.5, 2.5, 0);
var pz = cz - 2.0;
dlnBox(g, 9.2, 1.1, 0.12, dark, cx - 2.4, 0.55, pz);
dlnBox(g, 2.4, 1.1, 0.12, dark, cx + 5.8, 0.55, pz);
dlnBox(g, 9.2, h - 1.1, 0.04, glass, cx - 2.4, 1.1 + (h - 1.1) / 2, pz);
dlnBox(g, 2.4, h - 1.1, 0.04, glass, cx + 5.8, 1.1 + (h - 1.1) / 2, pz);
dlnBox(g, 2.8, h - 2.6, 0.04, glass, cx + 3.2, 2.6 + (h - 2.6) / 2, pz);
for (var m = -7; m <= 7; m += 1.6) {
if (m > 1.8 && m < 4.6)
continue;
dlnBox(g, 0.06, h, 0.14, dark, cx + m, h / 2, pz);
}
dlnBox(g, Rm.hw * 2, 0.12, 0.16, dark, cx, h - 0.06, pz);
shkSolidBox(cx - 2.4, pz, 9.2, 0.3, 0);
shkSolidBox(cx + 5.8, pz, 2.4, 0.3, 0);
var nm = bsSign("NEWS EDITOR", 1.2, 0.24, "#F2EEE4", "#1A1A1A");
nm.position.set(cx + 3.2, 2.4, pz + 0.04);
g.add(nm);
n14Table(g, cx + 0.4, cz - 5.2, 2.2, 1.1, 0.8, dark, dlnC(0x2A3A2A));
n14Chair(g, cx + 0.4, cz - 6.2, 0, dark);
for (var q = 0; q < 8; q++)
dlnBox(g, 0.24, 0.01, 0.32, dlnC(0xF4F0E4), cx - 0.4 + q * 0.2, 0.82 + q * 0.008, cz - 5.2 + ((q % 3) - 1) * 0.18);
dlnCyl(g, 0.12, 0.12, 0.06, dlnShine(0x2A2A2A, 0.4, 0.6), cx + 1.2, 0.84, cz - 5.0, 10);
n14Arm(g, cx - 2.6, cz - 4.6, Math.PI * 0.3, 0x5A3A2A);
var map = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.0), new THREE.MeshLambertMaterial({ map: lwlWorldMapTex() }));
map.position.set(cx, 2.4, cz - Rm.hd + 0.06);
g.add(map);
var bc = new THREE.Group();
bc.position.set(cx - Rm.hw + 0.3, 0, cz - 5.4);
g.add(bc);
dlnBox(bc, 0.5, 2.4, 2.2, dark, 0, 1.2, 0);
for (var s = 0; s < 4; s++)
for (var b = 0; b < 9; b++)
dlnBox(bc, 0.3, 0.4, 0.2, dlnC([0x6A1A1A, 0x1A3A2A, 0x2A2A5A, 0x5A4A1A][(s + b) % 4]), 0.12, 0.35 + s * 0.55, -0.9 + b * 0.22);
shkSolidBox(cx - Rm.hw + 0.3, cz - 5.4, 0.6, 2.3, 0);
dlnPendant(g, cx - 2.4, h, cz + 3.2, 0.8);
dlnPendant(g, cx + 2.4, h, cz + 3.2, 0.8);
dlnPendant(g, cx + 0.4, h, cz - 5.2, 0.8);
dlnBox(g, 1.6, 0.06, 2.2, dlnC(0x1A1A1A), cx + Rm.hw - 1.0, 0.02, cz + 0.4);
var st = bsSign("MACHINE ROOM ↓", 1.4, 0.24, "#1A1A1A", "#E8E0C8");
st.position.set(cx + Rm.hw - 0.06, 2.0, cz + 0.4);
st.rotation.y = -Math.PI / 2;
g.add(st);
shkSpot(cx + Rm.hw - 1.0, cz + 0.4, 1.6, "The stair to the machine-room", "go down", function () { lwlGazStairs(); });
shkSpot(cx + 0.4, cz - 4.0, 2.0, "Mr McArdle's desk", "look", function () { lwlTale("🗞️ The news editor's room", ["mcardle", "blank"], ["Proofs, telegrams from the agencies, the night's list of stories, and on the wall the map of the world with its last blank spaces."]); });
shkSpot(cx - 4.2, cz + 2.6, 1.6, "Your desk", "sit at it", function () { lwlTale("⌨️ A reporter's desk", ["colliery"], ["A typewriter, a spike for copy, a paste-pot, and the green lamp. Mr Malone's: the junior's, nearest the draught."]); });
shkSpot(cx - Rm.hw + 0.7, cz + 1.0, 1.4, "The telephone", "listen", function () { lwlTale("☎️ The telephone", [], ["Central exchange, the police courts, the hospitals, Scotland Yard, the House of Commons press gallery: everything comes to a newspaper by wire and telephone now, day and night."]); });
Rm.hello = "<b>The Daily Gazette: the reporters' room.</b> Typewriters clacking under green lamps, the telephone ringing, copy on the spikes; at the end, behind the glass, Mr McArdle's room.";
},
function (g, cx, cz, R, Rm) {
var h = 5.2, iron = dlnShine(0x2A2E34, 0.45, 0.6), steel = dlnShine(0x8A8E94, 0.3, 0.85), paper = dlnC(0xF2EEE2), green = dlnShine(0x2A4A3A, 0.5, 0.4);
dlnShell(g, cx, cz, Rm, { floor: dlnS("lwslate", 0xFFFFFF), wall: dlnS("stock", 0xE8E4DC), h: h, ceil: dlnC(0xD8D4CC), outName: "The stair, back up to the reporters' room", out: function () { shkGoIn("lw_gaz"); } });
LWL.rollers = [];
[-4.2, 3.4].forEach(function (px, pi) {
var P = new THREE.Group();
P.position.set(cx + px, 0, cz - 1.4);
g.add(P);
[-1, 1].forEach(function (k) { dlnBox(P, 0.3, 3.2, 5.6, green, k * 1.4, 1.6, 0); });
dlnBox(P, 3.1, 0.3, 5.6, green, 0, 3.3, 0);
for (var r = 0; r < 5; r++) {
var cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 2.6, 16), r % 2 ? steel : dlnShine(0x141414, 0.4, 0.5));
cyl.rotation.z = Math.PI / 2;
cyl.position.set(0, 0.9 + (r % 2) * 1.2, -2.0 + r * 1.0);
cyl.userData.keep = 1;
P.add(cyl);
LWL.rollers.push(cyl);
}
var reel = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 2.4, 20), paper);
reel.rotation.z = Math.PI / 2;
reel.position.set(0, 0.8, 3.6);
P.add(reel);
dlnBox(P, 2.4, 0.01, 2.6, paper, 0, 1.7, 2.2).rotation.x = -0.6;
for (var s = 0; s < 10; s++)
dlnBox(P, 0.6, 0.02, 0.4, paper, 0, 0.5 + s * 0.025, -3.6);
shkSolidBox(cx + px, cz - 1.4 + 0.6, 3.2, 7.4, 0);
});
var sh = dlnCyl(g, 0.06, 0.06, Rm.hw * 2 - 0.4, steel, cx, h - 0.5, cz - 1.4, 8);
sh.rotation.z = Math.PI / 2;
[-4.2, 3.4].forEach(function (px) { dlnBox(g, 0.12, h - 3.4, 0.02, dlnC(0x3A2A1A), cx + px + 1.2, 3.3 + (h - 3.4) / 2, cz - 1.4); });
for (var r2 = 0; r2 < 5; r2++) {
var rl = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 1.2, 18), paper);
rl.position.set(cx - Rm.hw + 0.8, 0.6 + ((r2 / 3) | 0) * 1.2, cz + 2.0 + (r2 % 3) * 1.3);
g.add(rl);
}
shkSolidBox(cx - Rm.hw + 0.8, cz + 3.3, 1.3, 3.9, 0);
[0, 1].forEach(function (t) { dlnCyl(g, 0.4, 0.4, 1.0, dlnShine(0x141414, 0.4, 0.4), cx + Rm.hw - 0.6, 0.5, cz + 2.6 + t * 1.0, 12); });
shkSolidBox(cx + Rm.hw - 0.6, cz + 3.1, 0.9, 2, 0);
var ch = dlnBox(g, 1.2, 0.06, 3.0, steel, cx + Rm.hw - 1.4, 1.2, cz - 4.6);
ch.rotation.x = 0.3;
for (var b = 0; b < 6; b++)
dlnBox(g, 0.6, 0.3, 0.4, paper, cx + Rm.hw - 1.4, 0.15 + ((b / 2) | 0) * 0.3, cz - Rm.hd + 0.6 + (b % 2) * 0.45);
for (var l = -1; l <= 1; l++)
dlnPendant(g, cx + l * 5, h, cz - 1.4, 0.9);
var sg = bsSign("DAILY GAZETTE · MACHINE ROOM · NO SMOKING", 4.4, 0.4, "#F2EEE4", "#1A1A1A");
sg.position.set(cx, 3.6, cz - Rm.hd + 0.06);
g.add(sg);
shkSpot(cx - 4.2, cz + 2.4, 2.2, "The presses", "watch them", function () { lwlTale("🗞️ The rotary presses", [], ["Two Hoe rotary presses, fed from great reels of paper four miles long: the curved plates of type cast in metal and clamped round the cylinders, printing both sides at once, cutting and folding, forty thousand copies an hour. When the presses start, the whole building trembles."]); });
var stone = dlnShine(0x5A5E62, 0.25, 0.2);
dlnBox(g, 2.2, 0.9, 1.1, dlnS("oak", 0x4A3020), cx - 0.4, 0.45, cz - Rm.hd + 1.2);
dlnBox(g, 2.3, 0.08, 1.2, stone, cx - 0.4, 0.94, cz - Rm.hd + 1.2);
[-0.5, 0.4].forEach(function (fx) { dlnBox(g, 0.8, 0.05, 0.6, dlnShine(0x8A8478, 0.4, 0.7), cx - 0.4 + fx, 1.0, cz - Rm.hd + 1.2); dlnBox(g, 0.84, 0.07, 0.64, dlnC(0x3A3A3A), cx - 0.4 + fx, 0.99, cz - Rm.hd + 1.2); });
shkSolidBox(cx - 0.4, cz - Rm.hd + 1.2, 2.3, 1.2, 0);
shkSpot(cx - 0.4, cz - Rm.hd + 2.4, 1.8, "The composing stone", "look", function () { lwlTale("🔩 The composing stone", [], ["A smooth slab of stone on an oak frame: the columns of type, set by the Linotype machines upstairs, are laid out here in the iron frame called a chase, locked tight with wedges called quoins, and proofed. Then the forme goes to the foundry, a curved metal plate is cast from it, and the plate is clamped round a cylinder of the press."]); });
shkSpot(cx + Rm.hw - 1.4, cz - Rm.hd + 1.6, 1.8, "The first edition", "take one", function () { lwlTale("📰 The first edition", [], ["Damp from the press, the ink still soft: the bundles go up the chute to the vans in the yard, and the vans race for the railway stations to catch the night mails."]); });
Rm.hello = "<b>The Gazette's machine-room.</b> Two rotary presses under the shafting and the electric lamps, reels of paper as tall as a man, and the smell of hot ink.";
},
function (g, cx, cz, R, Rm) {
var h = 4.4, wood = dlnS("oak", 0x5A3A1E), dark = dlnS("oak", 0x3A2414), brass = dlnShine(0xC8A048, 0.3, 0.9);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("lwredpaper", 0xFFFFFF), low: dlnS("oak", 0x3A2414), lowH: 1.3, h: h, ceil: dlnC(0xE8E0CC), outName: "Out to Adelphi Terrace, and a cab", out: function () { lwlGo("cab", "🚕 <b>Fleet Street.</b> A taxicab from Adelphi Terrace, along the Strand and through Temple Bar."); } });
dlnBox(g, 6, 0.02, 5, dlnS("n14turkey", 0xFFFFFF), cx - 1, 0.01, cz - 1);
dlnFireplace(g, cx - Rm.hw + 0.3, cz - 1.2, Math.PI / 2);
shkSolidBox(cx - Rm.hw + 0.3, cz - 1.2, 0.7, 2.3, 0);
n14Arm(g, cx - Rm.hw + 1.8, cz - 2.6, Math.PI * 0.35, 0x5A2A1A);
n14Arm(g, cx - Rm.hw + 1.8, cz + 0.2, Math.PI * 0.65, 0x2A3A2A);
n14Arm(g, cx - 0.4, cz - 3.4, -Math.PI * 0.2, 0x5A2A1A);
n14Table(g, cx + 2.6, cz + 0.6, 1.2, 4.4, 0.78, dark, dlnC(0xF4F2EC));
for (var c = 0; c < 4; c++) {
n14Chair(g, cx + 1.8, cz - 1.0 + c * 1.1, Math.PI / 2, dark);
n14Chair(g, cx + 3.4, cz - 1.0 + c * 1.1, -Math.PI / 2, dark);
}
n14Table(g, cx - 1.6, cz + 3.6, 1.4, 0.7, 0.76, dark, dlnC(0x2A4A2A));
n14Chair(g, cx - 1.6, cz + 4.3, Math.PI, dark);
dlnBox(g, 0.24, 0.005, 0.32, dlnC(0xF4F0E4), cx - 1.8, 0.775, cz + 3.6);
dlnCyl(g, 0.05, 0.06, 0.06, dlnShine(0x141414, 0.3, 0.6), cx - 1.2, 0.8, cz + 3.4, 8);
wsmWin(g, cx + Rm.hw - 0.06, 2.0, cz - 2.4, -Math.PI / 2, 1.6, 2.4);
for (var p = 0; p < 10; p++) {
var pw = p % 2 ? 0.6 : 0.8;
n14Pic(g, p < 5 ? cx - 4 + p * 1.9 : cx + Rm.hw - 0.05, 2.6 + (p % 2) * 0.3, p < 5 ? cz - Rm.hd + 0.05 : cz + 1.6 + (p - 5) * 0.9, p < 5 ? 0 : -Math.PI / 2, pw, pw * 1.1, [["#E8E0C8", "#C8B898", "#2A2A2A"], ["#D8C8A8", "#A89878", "#5A2A1A"], ["#E0D8C0", "#B8A888", "#2A3A5A"]][p % 3]);
}
var bm = dlnBox(g, 0.7, 0.05, 0.12, dlnS("oak", 0x7A5A3A), cx, 3.7, cz + Rm.hd - 0.08);
bm.rotation.z = 0.4;
[-0.9, 0.9].forEach(function (k) { var sp = dlnCyl(g, 0.02, 0.02, 1.8, dlnS("oak", 0x6A4A2A), cx + k, 3.6, cz + Rm.hd - 0.1, 5); sp.rotation.z = k * 0.9; });
n14Gasolier(g, cx - 1, h, cz - 1);
n14Gasolier(g, cx + 2.6, h, cz + 0.6);
shkSpot(cx - 1.6, cz + 2.8, 1.6, "The writing-table", "sit and write", function () { lwlTale("✒️ The writing-table", ["idsentence"], ["Club paper with the club's address at the top, a steel pen, and the ink. A letter written from here looks as if it came from a man of science, not a man of the press."]); });
shkSpot(cx + Rm.hw - 1.0, cz - 2.4, 1.8, "The window over the river", "look out", function () { lwlTale("🌊 Adelphi Terrace", ["adelphi"], ["The Savage Club, a club of writers, artists, actors and men of science, has its rooms in the Adam brothers' Adelphi Terrace, looking over the Embankment gardens to the Thames, the lights of the trams and the Shot Tower across the water."]); });
shkSpot(cx - Rm.hw + 1.4, cz - 1.2, 1.8, "The fire", "warm yourself", function () { lwlTale("🔥 The club fire", ["tarp"], []); });
Rm.hello = "<b>The Savage Club: the big room.</b> The fire and its arm-chairs, the long table laid for supper, the members' drawings thick on the red walls, a writing-table, and a window over the river.";
},
function (g, cx, cz, R, Rm) {
var h = 3.8, wood = dlnS("oak", 0x3A2414), brass = dlnShine(0xC8A048, 0.3, 0.9), marble = dlnShine(0x141416, 0.15, 0.4);
dlnShell(g, cx, cz, Rm, { floor: dlnS("pmchequer", 0xFFFFFF), wall: dlnS("lwgreenpaper", 0xFFFFFF), low: dlnS("oak", 0x3A2414), lowH: 1.1, h: h, ceil: dlnC(0xEEE6D4), outName: "The front door, out to Enmore Park", out: function () { lwlGo("enmore", "🏛️ <b>Enmore Park.</b> Down the steps from the portico (on your feet, this time)."); } });
dlnBox(g, 1.4, 0.02, Rm.hd * 2 - 1, dlnC(0x6A1A1E), cx, 0.01, cz);
var pd = new THREE.Group();
pd.position.set(cx + Rm.hw - 0.5, 0, cz - Rm.hd + 0.6);
g.add(pd);
dlnBox(pd, 0.6, 0.2, 0.6, marble, 0, 0.1, 0);
dlnCyl(pd, 0.2, 0.24, 1.8, marble, 0, 1.1, 0, 12);
dlnBox(pd, 0.5, 0.14, 0.5, marble, 0, 2.07, 0);
shkSolidBox(cx + Rm.hw - 0.5, cz - Rm.hd + 0.6, 0.7, 0.7, 0);
dlnBox(g, 0.12, 2.6, 1.2, wood, cx - Rm.hw + 0.06, 1.3, cz + 0.4);
dlnBox(g, 0.14, 0.3, 1.5, dlnC(0xF2EEE4), cx - Rm.hw + 0.07, 2.75, cz + 0.4);
dlnBox(g, 1.2, 2.6, 0.12, wood, cx - 0.6, 1.3, cz - Rm.hd + 0.06);
dlnBox(g, 1.5, 0.3, 0.14, dlnC(0xF2EEE4), cx - 0.6, 2.75, cz - Rm.hd + 0.07);
var hs = new THREE.Group();
hs.position.set(cx + Rm.hw - 0.3, 0, cz + 2.4);
g.add(hs);
dlnBox(hs, 0.4, 2.2, 1.2, wood, 0, 1.1, 0);
dlnBox(hs, 0.06, 0.8, 0.6, dlnShine(0xD8DCE0, 0.1, 0.95), -0.2, 1.6, 0);
dlnCyl(hs, 0.16, 0.16, 0.24, dlnC(0x141414), -0.1, 2.3, -0.3, 12);
dlnCyl(hs, 0.24, 0.24, 0.02, dlnC(0x141414), -0.1, 2.19, -0.3, 14);
shkSolidBox(cx + Rm.hw - 0.3, cz + 2.4, 0.5, 1.3, 0);
dlnBox(g, 0.08, 0.12, 0.06, brass, cx - Rm.hw + 0.04, 1.4, cz - 2.0);
n14Pic(g, cx - Rm.hw + 0.04, 2.3, cz - 2.6, Math.PI / 2, 0.9, 0.7, ["#3A5A3A", "#8A6A3A", "#2A3A2A"]);
n14Gasolier(g, cx, h, cz + 1);
n14Gasolier(g, cx, h, cz - 3);
shkSpot(cx - 0.6, cz - Rm.hd + 1.4, 1.6, "The study door", "go in", function () { shkGoIn("lw_study"); });
shkSpot(cx + Rm.hw - 1.0, cz - Rm.hd + 1.4, 1.6, "The black marble pedestal", "look", function () { lwlTale("⚫ The pedestal", ["pedestal"], []); });
shkSpot(cx - Rm.hw + 0.6, cz + 0.4, 1.6, "The dining-room door", "look", function () { lwlTale("🚪 The dining-room", [], ["Mrs Challenger waits in here for the visitors, to warn them before they go down the passage."]); });
Rm.hello = "<b>Professor Challenger's hall.</b> A long passage of green and black and white; the dining-room door; the study door at the end; and in the corner, a very tall thin pedestal of black marble.";
},
function (g, cx, cz, R, Rm) {
var h = 3.8, wood = dlnS("oak", 0x4A2E1A), dark = dlnS("oak", 0x2E1C10), brass = dlnShine(0xC8A048, 0.3, 0.9), bone = dlnC(0xE8DCC0), glass = new THREE.MeshBasicMaterial({ color: 0xD8E4E8, transparent: true, opacity: 0.2, depthWrite: false });
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("lwgreenpaper", 0xFFFFFF), low: dlnS("oak", 0x3A2414), lowH: 1.0, h: h, ceil: dlnC(0xE8E0CC), outName: "The door, back down the passage", out: function () { shkGoIn("lw_hall"); } });
dlnBox(g, 5, 0.02, 4, dlnS("n14turkey", 0xFFFFFF), cx, 0.01, cz - 0.6);
var T = new THREE.Group();
T.position.set(cx, 0, cz - 1.6);
g.add(T);
dlnBox(T, 2.8, 0.1, 1.4, dark, 0, 0.78, 0);
[-1.3, 1.3].forEach(function (x) { [-0.6, 0.6].forEach(function (z) { dlnBox(T, 0.1, 0.76, 0.1, dark, x, 0.38, z); }); });
dlnBox(T, 1.0, 0.2, 1.2, dark, -0.9, 0.62, 0);
for (var b = 0; b < 14; b++) {
var bk = dlnBox(T, 0.3, 0.06 + (b % 3) * 0.03, 0.22, dlnC([0x6A1A1A, 0x1A3A2A, 0x2A2A5A, 0x5A4A1A, 0x3A2A1A][b % 5]), -1.1 + (b % 7) * 0.34, 0.86 + ((b / 7) | 0) * 0.08, -0.4 + ((b * 3) % 4) * 0.1);
bk.rotation.y = (b % 3 - 1) * 0.3;
}
for (var m = 0; m < 3; m++) {
var mp = dlnBox(T, 0.7, 0.005, 0.5, dlnC([0xE8DCB8, 0xDCD0B0, 0xF0E8D0][m]), 0.6 - m * 0.2, 0.84 + m * 0.003, 0.2 + m * 0.05);
mp.rotation.y = m * 0.4;
}
dlnBox(T, 0.4, 0.06, 0.22, dlnShine(0x141414, 0.3, 0.5), 0.9, 0.86, -0.4);
dlnCyl(T, 0.04, 0.05, 0.06, dlnShine(0x141414, 0.3, 0.6), 0.85, 0.92, -0.4, 8);
var cb = dlnBox(T, 0.18, 0.03, 0.04, bone, 0.95, 0.9, -0.36);
cb.rotation.y = 0.3;
dlnBox(T, 0.3, 0.08, 0.2, dlnS("oak", 0x8A5A2A), 1.1, 0.87, 0.2);
var sb = dlnBox(T, 0.3, 0.03, 0.22, dlnC(0x6A5A3A), 0.3, 0.85, 0.4);
sb.rotation.y = -0.2;
shkSolidBox(cx, cz - 1.6, 2.9, 1.5, 0);
var ch = new THREE.Group();
ch.position.set(cx, 0, cz - 2.8);
g.add(ch);
dlnCyl(ch, 0.06, 0.06, 0.4, dlnShine(0x2A2A2A, 0.4, 0.6), 0, 0.2, 0, 8);
dlnCyl(ch, 0.3, 0.3, 0.1, dlnC(0x3A1A10), 0, 0.48, 0, 14);
dlnBox(ch, 0.6, 0.5, 0.08, dlnC(0x3A1A10), 0, 0.8, -0.28);
[[-1, -Math.PI / 2], [1, Math.PI / 2]].forEach(function (s) {
var bc = new THREE.Group();
bc.position.set(cx + s[0] * (Rm.hw - 0.25), 0, cz - 0.4);
bc.rotation.y = s[1];
g.add(bc);
dlnBox(bc, 3.6, 3.2, 0.5, wood, 0, 1.6, 0);
for (var r = 0; r < 6; r++)
for (var k = 0; k < 16; k++) {
if (DLN.lite && k % 2)
continue;
dlnBox(bc, 0.2, 0.36 + (k % 3) * 0.04, 0.04, dlnC([0x6A1A1A, 0x1A3A2A, 0x2A2A5A, 0x5A4A1A, 0x3A2A1A, 0x7A6A4A][(r + k) % 6]), -1.6 + k * 0.21, 0.32 + r * 0.52, 0.24);
}
shkSolidBox(cx + s[0] * (Rm.hw - 0.25), cz - 0.4, 0.6, 3.7, 0);
});
var cs = new THREE.Group();
cs.position.set(cx + 2.2, 0, cz + Rm.hd - 1.0);
g.add(cs);
dlnBox(cs, 1.6, 0.9, 0.6, wood, 0, 0.45, 0);
dlnBox(cs, 1.6, 1.0, 0.6, glass, 0, 1.4, 0);
for (var s2 = 0; s2 < 4; s2++) {
var sk = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), bone);
sk.scale.set(1, 0.9, 1.25);
sk.position.set(-0.55 + s2 * 0.36, 1.06, 0);
cs.add(sk);
var jw = dlnBox(cs, 0.14, 0.05, 0.14, bone, -0.55 + s2 * 0.36, 0.96, 0.06);
}
shkSolidBox(cx + 2.2, cz + Rm.hd - 1.0, 1.7, 0.7, 0);
var gl = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), new THREE.MeshLambertMaterial({ map: lwlWorldMapTex() }));
gl.position.set(cx - 2.2, 1.1, cz + Rm.hd - 1.2);
g.add(gl);
dlnCyl(g, 0.04, 0.12, 0.8, wood, cx - 2.2, 0.4, cz + Rm.hd - 1.2, 8);
var sa = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.6), new THREE.MeshLambertMaterial({ map: lwlSAmericaTex() }));
sa.position.set(cx - 0.2, 2.3, cz - Rm.hd + 0.05);
g.add(sa);
wsmWin(g, cx + 1.6, 1.9, cz - Rm.hd + 0.06, 0, 1.0, 2.0);
[-1, 1].forEach(function (k) { dlnBox(g, 0.5, 2.8, 0.1, dlnC(0x5A1420), cx + 1.6 + k * 0.7, 1.7, cz - Rm.hd + 0.12); });
n14Arm(g, cx - 1.4, cz + 0.6, Math.PI * 0.8, 0x5A2A1A);
n14Gasolier(g, cx, h, cz - 0.8);
shkSpot(cx + 0.3, cz - 0.6, 1.6, "Maple White's sketch-book", "turn the pages", function () { lwlTale("📒 Maple White's sketch-book", ["folio", "jimmy"], ["Then come Indians, a fat priest, alligators: and then the cliffs, and then the creature."], [["cliffs", "The next page: the cliffs", "", function () { lwlSketchCard(0); }], ["beast", "The next page: the creature", "", function () { lwlSketchCard(1); }]]); });
shkSpot(cx + 0.9, cz - 0.9, 1.4, "The bone on the inkstand", "pick it up", function () { lwlTale("🦴 The bone", ["inkstand", "clavicle"], ["About six inches long, thicker than a thumb, straight, with dried cartilage at one end: not a fossil, but recent."]); });
shkSpot(cx - 1.0, cz - 0.8, 1.4, "The Professor's table", "look", function () { lwlTale("🗺️ The broad table", ["record", "recreations"], ["Books, maps, diagrams, proofs of a paper for the Zoological Congress, a cigar-box of real San Juan Colorado, a lens, and an inkstand with a curved bone on it."]); });
shkSpot(cx + 2.2, cz + Rm.hd - 1.8, 1.6, "The cases of skulls", "look", function () { lwlTale("💀 The skulls", [], ["\"Some Observations Upon a Series of Kalmuck Skulls\": the Professor's first famous paper, and the skulls themselves in their glass case, measured and numbered in white ink. He measures every head he meets, by eye if he must."]); });
Rm.hello = "<b>Professor Challenger's study.</b> Books to the ceiling, a broad table buried in maps and diagrams, a rotating chair behind it, the curtains drawn; skulls in a glass case, and on the inkstand a curved bone.";
},
function (g, cx, cz, R, Rm) {
var h = 9, wood = dlnS("oak", 0x6A4A2A), dark = dlnS("oak", 0x3A2414), green = dlnC(0x2A4A3A);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("lwcream", 0xE8DCC0), low: dlnS("oak", 0x4A2E1A), lowH: 1.4, h: h, ceil: dlnC(0xE8E0CC), outName: "Out through the arched door to Vigo Street", out: function () { lwlGo("inst", "🦕 <b>Vigo Street.</b> Out into the crowd of students on the pavement."); } });
var pz = cz - Rm.hd + 3.4;
dlnBox(g, Rm.hw * 2, 1.0, 6.8, dark, cx, 0.5, pz);
shkFloor(cx, pz, Rm.hw, 3.4, 1.0);
for (var s = 0; s < 3; s++) {
dlnBox(g, 4, 0.33 * (s + 1), 0.4, dark, cx - Rm.hw + 3, 0.33 * (s + 1) / 2, pz + 3.6 + (2 - s) * 0.4);
shkFloor(cx - Rm.hw + 3, pz + 3.6 + (2 - s) * 0.4, 2, 0.2, 0.33 * (s + 1));
}
var plat = new THREE.Group();
plat.position.y = 1.0;
g.add(plat);
n14Table(plat, cx, pz + 0.6, 8, 1.0, 0.8, wood, dlnC(0x2A4A3A));
for (var c = 0; c < 9; c++)
n14Chair(plat, cx - 4 + c * 1.0, pz - 0.4, 0, dark);
var lect = new THREE.Group();
lect.position.set(cx + 5.6, 1.0, pz + 2.0);
g.add(lect);
dlnBox(lect, 0.8, 1.2, 0.6, wood, 0, 0.6, 0);
dlnBox(lect, 0.9, 0.06, 0.7, wood, 0, 1.22, 0).rotation.x = -0.3;
var scr = new THREE.Mesh(new THREE.PlaneGeometry(6, 4.5), new THREE.MeshBasicMaterial({ map: lwlSlideTex(), fog: false }));
scr.position.set(cx, 5.2, cz - Rm.hd + 0.08);
g.add(scr);
dlnBox(g, 6.4, 0.2, 0.2, dark, cx, 7.55, cz - Rm.hd + 0.12);
var zi = bsSign("THE ZOOLOGICAL INSTITUTE", 8, 0.6, "#2A4A3A", "#E8D8A8");
zi.position.set(cx, 8.2, cz - Rm.hd + 0.08);
g.add(zi);
for (var r = 0; r < 9; r++) {
var bz = pz + 6 + r * 1.6, by = r > 5 ? (r - 5) * 0.45 : 0;
[-1, 1].forEach(function (k) { dlnBox(g, Rm.hw - 2.0, 0.08, 0.45, wood, cx + k * (Rm.hw / 2 + 0.5), 0.48 + by, bz); dlnBox(g, Rm.hw - 2.0, 0.5, 0.06, wood, cx + k * (Rm.hw / 2 + 0.5), 0.8 + by, bz + 0.24); if (by)
dlnBox(g, Rm.hw - 2.0, by, 1.6, dark, cx + k * (Rm.hw / 2 + 0.5), by / 2, bz); });
}
[-1, 1].forEach(function (k) { shkSolidBox(cx + k * (Rm.hw / 2 + 0.5), pz + 6 + 5 * 1.6 / 2 + 0.8, Rm.hw - 2.0, 6 * 1.6, 0); });
for (var r2 = 6; r2 < 9; r2++) {
var bz2 = pz + 6 + r2 * 1.6, by2 = (r2 - 5) * 0.45;
[-1, 1].forEach(function (k) { shkFloor(cx + k * (Rm.hw / 2 + 0.5), bz2, (Rm.hw - 2.0) / 2, 0.8, by2); });
}
var ln = new THREE.Group();
ln.position.set(cx, 0, pz + 19);
g.add(ln);
dlnCyl(ln, 0.06, 0.08, 1.4, dlnShine(0x2A2A2A, 0.4, 0.6), 0, 0.7, 0, 8);
dlnBox(ln, 0.5, 0.5, 0.7, dlnShine(0x1A1A1E, 0.4, 0.6), 0, 1.6, 0);
dlnCyl(ln, 0.1, 0.12, 0.3, dlnShine(0xC8A048, 0.3, 0.9), 0, 1.6, -0.5, 10).rotation.x = Math.PI / 2;
shkSolidBox(cx, pz + 19, 0.8, 0.9, 0);
for (var w = 0; w < 4; w++)
[-1, 1].forEach(function (k) { wsmWin(g, cx + k * (Rm.hw - 0.06), 4.6, cz - Rm.hd + 6 + w * 7, k * -Math.PI / 2, 1.8, 4.2); });
["Sir Joseph Banks", "Professor Owen", "Mr Darwin"].forEach(function (n, i) { dlnPortrait(g, cx - Rm.hw + 0.06, 5.6, cz - Rm.hd + 9.5 + i * 7, Math.PI / 2, n, "President", 0x3A2A1A); });
for (var l = 0; l < 3; l++)
dlnPendant(g, cx, h, cz - Rm.hd + 8 + l * 9, 1.6);
shkSpot(cx, pz + 3.8, 2.4, "The platform", "look", function () { lwlTale("🎓 The platform", ["broughams", "tile", "toe"], []); });
shkSpot(cx - Rm.hw + 3, pz + 5.2, 2.0, "The steps up to the platform", "look", function () { lwlTale("🪜 The platform steps", ["welcome"], []); });
shkSpot(cx, cz - Rm.hd + 6.4, 2.4, "The lantern screen", "look", function () { lwlTale("🖼️ The lantern screen", ["inaudible"], ["A white sheet on a roller, and on it, from the magic lantern at the back, the slides of the lecture: the rocks of the ages one upon another, and the beasts of each."]); });
shkSpot(cx - 2.0, pz + 11, 2.2, "Your seat", "sit down", function () { lwlTale("💺 Your seat", ["boiling"], ["Halfway back, on the end of a bench: the press seat, with your notebook on your knee."]); });
Rm.hello = "<b>The Zoological Institute's Hall.</b> The platform with its long green table and the professors' chairs, the lantern screen, benches filling up, and the students already roaring at the back.";
},
function (g, cx, cz, R, Rm) {
var h = 3.8, wood = dlnS("oak", 0x4A2E1A), gilt = dlnShine(0xD8B048, 0.3, 0.85), black = dlnShine(0x141414, 0.25, 0.4), horn = dlnC(0xD8CCAA), hide = [0x6A4A2A, 0x3A2A1A, 0x8A6A4A, 0x2A2420];
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("lwredpaper", 0xE0C0B0), low: dlnS("oak", 0x3A2414), lowH: 1.2, h: h, ceil: dlnC(0xF0E0D0), outName: "Out along the covered walk to Vigo Street", out: function () { lwlGo("albany", "🗝️ <b>Vigo Street.</b> Out under the Albany's gate."); } });
dlnBox(g, 6, 0.02, 5.6, dlnC(0x8A1A1E), cx, 0.01, cz - 0.4);
[[-2, 1.8, 0xE8E0D0], [2.4, -2.6, 0x6A4A2A], [0.8, 2.6, 0x3A5A6A]].forEach(function (f) { var r = dlnBox(g, 1.4, 0.03, 0.9, dlnC(f[2]), cx + f[0], 0.025, cz + f[1]); r.rotation.y = f[0] * 0.3; });
var T = new THREE.Group();
T.position.set(cx, 0, cz - 0.4);
g.add(T);
dlnBox(T, 1.4, 0.06, 0.9, black, 0, 0.74, 0);
dlnBox(T, 1.44, 0.04, 0.94, gilt, 0, 0.7, 0);
[-0.62, 0.62].forEach(function (x) { [-0.38, 0.38].forEach(function (z) { var l = dlnCyl(T, 0.03, 0.05, 0.7, black, x, 0.35, z, 6); l.rotation.z = x > 0 ? -0.12 : 0.12; dlnCyl(T, 0.04, 0.04, 0.06, gilt, x * 1.08, 0.04, z, 6); }); });
dlnCyl(T, 0.3, 0.3, 0.02, dlnShine(0xE0E0E4, 0.2, 0.95), -0.3, 0.78, 0, 16);
dlnBox(T, 0.3, 0.24, 0.2, dlnShine(0xC8C8CC, 0.2, 0.9), 0.3, 0.88, 0);
dlnCyl(T, 0.06, 0.07, 0.32, dlnShine(0xA8D0D8, 0.1, 0.6), 0.55, 0.93, 0.2, 10);
dlnBox(T, 0.24, 0.08, 0.16, dlnS("oak", 0x8A5A2A), -0.5, 0.81, 0.25);
shkSolidBox(cx, cz - 0.4, 1.5, 1.0, 0);
n14Arm(g, cx - 1.2, cz + 0.6, Math.PI * 0.75, 0x5A2A1A);
n14Arm(g, cx + 1.2, cz + 0.6, -Math.PI * 0.75, 0x2A3A2A);
dlnFireplace(g, cx, cz - Rm.hd + 0.3, 0);
shkSolidBox(cx, cz - Rm.hd + 0.3, 2.3, 0.7, 0);
[[0x1A2A5A, 0.5], [0xE87A9A, -0.5]].forEach(function (o) { var oar = dlnBox(g, 0.08, 3.2, 0.04, dlnC(o[0]), cx, 2.3, cz - Rm.hd + 0.1); oar.rotation.z = o[1]; var bl = dlnBox(g, 0.24, 0.6, 0.03, dlnC(o[0]), cx - Math.sin(o[1]) * 1.5, 2.3 + Math.cos(o[1]) * 1.5, cz - Rm.hd + 0.1); bl.rotation.z = o[1]; });
[-1, 1].forEach(function (k) { var f = dlnCyl(g, 0.006, 0.006, 1.0, dlnShine(0xD8D8DC, 0.2, 0.9), cx + k * 1.4, 1.9, cz - Rm.hd + 0.1, 4); f.rotation.z = k * 0.3; dlnBox(g, 0.18, 0.16, 0.12, dlnC(0x7A1A1A), cx + k * 0.9, 1.4, cz - Rm.hd + 0.1); });
var rh = new THREE.Group();
rh.position.set(cx, 3.25, cz - Rm.hd + 0.35);
g.add(rh);
var head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 10), dlnC(0x8A8478));
head.scale.set(0.9, 0.8, 1.5);
head.position.z = 0.3;
rh.add(head);
var hn = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.5, 8), horn);
hn.position.set(0, 0.3, 0.8);
hn.rotation.x = 0.4;
rh.add(hn);
var hn2 = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.26, 8), horn);
hn2.position.set(0, 0.2, 0.5);
rh.add(hn2);
var lip = dlnBox(rh, 0.4, 0.08, 0.18, dlnC(0x7A746A), 0, -0.24, 0.86);
lip.rotation.x = 0.3;
[-1, 1].forEach(function (k) { var ear = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 6), dlnC(0x8A8478)); ear.position.set(k * 0.3, 0.3, 0.05); rh.add(ear); });
dlnBox(rh, 0.8, 0.8, 0.1, wood, 0, 0, -0.08);
var heads = 0;
[[-1, Math.PI / 2], [1, -Math.PI / 2]].forEach(function (s) {
for (var i = 0; i < 4; i++) {
if (DLN.lite && i % 2)
continue;
var hg = new THREE.Group();
hg.position.set(cx + s[0] * (Rm.hw - 0.12), 2.5, cz - 3.4 + i * 1.9);
hg.rotation.y = s[1];
g.add(hg);
heads++;
dlnBox(hg, 0.4, 0.5, 0.06, wood, 0, 0, 0);
var hh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), dlnC(hide[i % 4]));
hh.scale.set(0.8, 0.9, 1.4);
hh.position.z = 0.2;
hg.add(hh);
[-1, 1].forEach(function (k) { var hr = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.6 + (i % 2) * 0.3, 5), horn); hr.position.set(k * 0.12, 0.38, 0.1); hr.rotation.z = -k * (0.2 + (i % 3) * 0.3); hg.add(hr); });
}
});
var gc = new THREE.Group();
gc.position.set(cx + Rm.hw - 0.35, 0, cz + 2.6);
gc.rotation.y = -Math.PI / 2;
g.add(gc);
dlnBox(gc, 1.8, 2.4, 0.5, wood, 0, 1.2, 0);
dlnBox(gc, 1.6, 2.0, 0.02, dlnC(0x2A1A10), 0, 1.3, 0.22);
for (var r = 0; r < 8; r++) {
dlnCyl(gc, 0.02, 0.02, 1.4, dlnShine(0x2A2A30, 0.3, 0.8), -0.7 + r * 0.2, 1.5, 0.18, 6);
dlnBox(gc, 0.08, 0.5, 0.06, dlnS("oak", 0x7A4A2A), -0.7 + r * 0.2, 0.6, 0.18);
}
shkSolidBox(cx + Rm.hw - 0.35, cz + 2.6, 0.6, 1.9, 0);
for (var p = 0; p < 5; p++)
n14Pic(g, cx - 3.6 + p * 1.8, 3.0, cz + Rm.hd - 0.05, Math.PI, 0.6, 0.5, [["#C8B8A0", "#8A6A4A", "#3A2A1A"], ["#E8D8E0", "#C8A8B8", "#6A3A4A"], ["#A8B878", "#6A7A4A", "#5A3A1A"], ["#F0D890", "#C8A060", "#8A6A4A"]][p % 4]);
[[-3.2, -2.2], [3.2, -2.2], [-3.2, 2.8]].forEach(function (lp) { dlnCyl(g, 0.02, 0.03, 1.4, dlnShine(0xC8A048, 0.3, 0.9), cx + lp[0], 0.7, cz + lp[1], 6); dlnCyl(g, 0.18, 0.3, 0.3, dlnGlow(0xFF9A8A), cx + lp[0], 1.5, cz + lp[1], 12, true); });
var pinkL = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), dlnGlow(0xFFB0A0));
pinkL.position.set(cx, h - 0.6, cz - 0.4);
g.add(pinkL);
shkSpot(cx, cz - Rm.hd + 1.6, 1.8, "The white rhinoceros", "look up", function () { lwlTale("🦏 The white rhinoceros", ["rhino", "oar"], []); });
shkSpot(cx + Rm.hw - 1.2, cz + 2.6, 1.8, "The gun-cupboard", "open it", function () { lwlTale("🔫 The gun-cupboard", ["organ", "axite"], []); });
shkSpot(cx, cz + 0.6, 1.6, "The Louis Quinze table", "look", function () { lwlTale("🪑 The Louis Quinze table", ["quinze"], []); });
Rm.hello = "<b>Lord John Roxton's rooms at the Albany.</b> The pink radiance of tinted lamps; heads of beasts all round the walls, the white rhinoceros over the mantel, crossed oars, foils, a gun-cupboard, and a black-and-gold table.";
},
function (g, cx, cz, R, Rm) {
var h = 14, wood = dlnS("oak", 0x6A4A2A), gilt = dlnShine(0xD8B048, 0.3, 0.85), cream = dlnC(0xF0E6D2), red = dlnC(0x8A1A1E);
dlnShell(g, cx, cz, Rm, { floor: dlnS("boards", 0xFFFFFF), wall: dlnS("lwcream", 0xF0E2C8), low: dlnS("oak", 0x5A3A22), lowH: 1.6, h: h, ceil: dlnC(0xE8DCC4), outName: "Out through the doors to Langham Place", out: function () { lwlGo("queens", "🎻 <b>Langham Place.</b> Out under the canopy into the crowd."); } });
var pz = cz - Rm.hd + 4.4;
dlnBox(g, Rm.hw * 2, 1.6, 8.8, wood, cx, 0.8, pz);
shkFloor(cx, pz, Rm.hw, 4.4, 1.6);
for (var t = 0; t < 3; t++) {
dlnBox(g, Rm.hw * 2 - 8, 0.4, 1.0, wood, cx, 1.8 + t * 0.4, pz - 3.9 + t * 1.0 - 3 * 0);
}
dlnBox(g, 14, 0.3, 3.0, dlnC(0x2A1E14), cx, 0.05, pz + 6.0);
dlnBox(g, 14, 0.9, 0.14, wood, cx, 0.45, pz + 7.5);
for (var oc = 0; oc < 10; oc++)
n14Chair(g, cx - 5.4 + oc * 1.2, pz + 5.6 + (oc % 2) * 0.8, 0, wood);
shkSolidBox(cx, pz + 7.5, 14, 0.3, 0);
var org = new THREE.Group();
org.position.set(cx, 1.6, cz - Rm.hd + 0.6);
g.add(org);
dlnBox(org, 12, 7, 1.0, wood, 0, 3.5, 0);
for (var p = 0; p < (DLN.lite ? 14 : 28); p++) {
var ph = 2.4 + Math.abs(Math.sin(p * 0.55)) * 4.2, px = -5.6 + p * (11.2 / ((DLN.lite ? 14 : 28) - 1));
dlnCyl(org, 0.16, 0.16, ph, gilt, px, 7 + ph / 2, 0.4, 10);
}
var oname = bsSign("QUEEN'S HALL", 6, 0.6, "#2A1E14", "#E8C860");
oname.position.set(0, 6.6, 0.52);
org.add(oname);
var qp = new THREE.Group();
qp.position.y = 1.6;
g.add(qp);
n14Table(qp, cx, pz + 2.0, 6, 1.0, 0.8, wood, dlnC(0x2A4A3A));
for (var c = 0; c < 8; c++)
n14Chair(qp, cx - 3.5 + c * 1.0, pz + 1.0, 0, wood);
for (var r = 0; r < (DLN.lite ? 8 : 14); r++)
for (var k = -1; k <= 1; k += 2) {
var rz = pz + 10 + r * 1.9;
if (rz > cz + Rm.hd - 3)
continue;
var row = new THREE.Group();
row.position.set(cx + k * (Rm.hw / 2 + 0.6), 0, rz);
g.add(row);
dlnBox(row, Rm.hw - 3, 0.1, 0.5, red, 0, 0.46, 0);
dlnBox(row, Rm.hw - 3, 0.5, 0.08, red, 0, 0.75, 0.24);
dlnBox(row, Rm.hw - 3, 0.46, 0.06, dlnC(0x3A2A1A), 0, 0.23, -0.2);
}
[-1, 1].forEach(function (k) { shkSolidBox(cx + k * (Rm.hw / 2 + 0.6), pz + 10 + ((DLN.lite ? 8 : 14) - 1) * 1.9 / 2, Rm.hw - 3, ((DLN.lite ? 8 : 14) - 1) * 1.9 + 0.6, 0); });
[[-1, 0], [1, 0]].forEach(function (s) {
var gx = cx + s[0] * (Rm.hw - 2.2);
dlnBox(g, 4.4, 0.4, Rm.hd * 2 - 12, wood, gx, 6.0, cz + 4);
dlnBox(g, 0.2, 1.0, Rm.hd * 2 - 12, gilt, gx - s[0] * 2.2, 6.7, cz + 4);
for (var q = 0; q < 5; q++)
dlnCyl(g, 0.12, 0.14, 6, dlnShine(0x2A2A30, 0.4, 0.6), gx - s[0] * 2.0, 3, cz - Rm.hd + 12 + q * 7, 8);
shkSolidBox(gx - s[0] * 2.0, cz + 4, 0.4, Rm.hd * 2 - 12, 0);
});
dlnBox(g, Rm.hw * 2, 0.4, 4.4, wood, cx, 6.0, cz + Rm.hd - 2.2);
dlnBox(g, Rm.hw * 2 - 8.8, 1.0, 0.2, gilt, cx, 6.7, cz + Rm.hd - 4.4);
for (var w = 0; w < 5; w++)
[-1, 1].forEach(function (k) { var wz = cz - Rm.hd + 8 + w * 8, open = k < 0 && w === 0; wsmWin(g, cx + k * (Rm.hw - 0.06), 10.4, wz, k * -Math.PI / 2, 2.4, 3.6); if (open) {
var sash = dlnBox(g, 0.08, 1.6, 2.2, dlnS("oak", 0xD8CCB4), cx + k * (Rm.hw - 0.3), 11.6, wz);
sash.rotation.z = 0.5;
LWL.qWin = { x: cx + k * (Rm.hw - 0.2), y: 10.4, z: wz };
} });
for (var ch = 0; ch < 3; ch++) {
var cy = h - 2.2, czz = cz - Rm.hd + 12 + ch * 13;
dlnCyl(g, 0.02, 0.02, 2, gilt, cx, h - 1, czz, 4);
dlnCyl(g, 1.0, 0.6, 0.5, gilt, cx, cy, czz, 16, true);
for (var a = 0; a < 8; a++) {
var an = a / 8 * Math.PI * 2, bl = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), dlnGlow(0xFFF2D8));
bl.position.set(cx + Math.cos(an) * 1.0, cy + 0.3, czz + Math.sin(an) * 1.0);
g.add(bl);
}
}
LWL.qRoom = { cx: cx, cz: cz, pz: pz, hw: Rm.hw, hd: Rm.hd };
shkSpot(cx, pz + 5.4, 2.6, "The platform", "look", function () { lwlTale("🎻 The platform", ["four", "durham"], []); });
shkSpot(cx - Rm.hw + 2.4, cz - Rm.hd + 9.6, 2.4, "The open window", "look up", function () { lwlTale("🪟 The window", ["window"], ["A tall window high in the side wall, its sash pushed up for air: the Hall is packed and the gas and the people make it hot."]); });
shkSpot(cx, cz - Rm.hd + 3.0, 2.0, "The organ", "look up", function () { lwlTale("🎹 The organ", [], ["The Queen's Hall organ, its gilt pipes rising behind the platform: Mr Wood's orchestra plays in front of it all summer at the Promenade Concerts."]); });
Rm.hello = "<b>The Queen's Hall.</b> The platform under the gilt organ pipes, the orchestra's well before it, the arena of red seats, the galleries round three sides, the chandeliers; and high in the wall, windows open for the heat.";
},
function () {
return DLN.tex.lwworld || (DLN.tex.lwworld = wTex(256, 160, function (c, W, H) {
c.fillStyle = "#C8D8DC";
c.fillRect(0, 0, W, H);
c.fillStyle = "#E8D8A8";
[[40, 40, 30, 22], [60, 90, 14, 30], [128, 40, 18, 14], [136, 80, 22, 30], [190, 46, 40, 20], [214, 110, 18, 10]].forEach(function (e) { c.beginPath(); c.ellipse(e[0], e[1], e[2], e[3], 0, 0, 7); c.fill(); });
c.fillStyle = "#F4F0E4";
c.beginPath();
c.ellipse(62, 96, 7, 10, 0, 0, 7);
c.fill();
c.beginPath();
c.ellipse(140, 92, 8, 9, 0, 0, 7);
c.fill();
c.strokeStyle = "#5A4A3A";
c.strokeRect(1, 1, W - 2, H - 2);
}));
},
function () {
return DLN.tex.lwsam || (DLN.tex.lwsam = wTex(160, 220, function (c, W, H) {
c.fillStyle = "#D8E4E8";
c.fillRect(0, 0, W, H);
c.fillStyle = "#E8D8A8";
c.beginPath();
c.moveTo(60, 10);
c.lineTo(110, 30);
c.lineTo(150, 70);
c.lineTo(120, 120);
c.lineTo(90, 170);
c.lineTo(75, 210);
c.lineTo(65, 170);
c.lineTo(55, 110);
c.lineTo(30, 60);
c.closePath();
c.fill();
c.strokeStyle = "#3A6A9A";
c.lineWidth = 2;
c.beginPath();
c.moveTo(40, 55);
c.quadraticCurveTo(80, 60, 140, 62);
c.stroke();
c.strokeStyle = "#A83A2A";
c.lineWidth = 1;
c.beginPath();
c.arc(78, 78, 8, 0, 7);
c.stroke();
c.fillStyle = "#2A2A2A";
c.font = "bold 12px Georgia";
c.fillText("SOUTH AMERICA", 30, 200);
c.font = "italic 9px Georgia";
c.fillText("?", 74, 82);
}));
},
function (i) {
var t = i ? lwlBeastTex() : lwlSketchTex(), url = "";
try {
url = t.image.toDataURL("image/png");
}
catch (e) { }
var b = "<div style='font:600 16px Georgia;color:#FFE7B0'>" + (i ? "🦕 The creature" : "⛰️ The cliffs") + "</div>" + (url ? "<img src='" + url + "' style='width:100%;max-width:360px;border-radius:6px;margin:8px 0'>" : "") +
"<p style='font:italic 14px/1.55 Georgia;margin:8px 0'>" + esc(i ? LWL_Q.creature : LWL_Q.cliffs) + "</p><div style='font-size:11px;opacity:.65'>Arthur Conan Doyle, The Lost World (1912), chapter IV</div>";
worldCard(b, {});
},
function (x, z) { var Z = shkZoneAt(x, z == null ? 0 : z); if (Z === "inside") {
var k = shkRoomAtX(x, z);
return "in:" + (k || "?");
} if (Z === "1912")
return lwlIn(x, z) ? "lw:" + lwlPiece(lwlLocal(x, z).z) : (typeof pmlIn === "function" && pmlIn(x, z)) ? "pm" : (typeof bsIn === "function" && bsIn(x, z)) ? "bs" : (typeof wsIn === "function" && wsIn(x, z)) ? "ws" : kgIn(x, z) ? "kg" : "gos"; return "1600"; },
function (list, name, room) {
var re = name instanceof RegExp ? name : null, out = null, here = room ? "in:" + room : lwbArea(), Lc = worldLocal();
list.forEach(function (T) {
if (!(re ? re.test(T.name || "") : (T.name === name)))
return;
var p = T.p ? lwbLoc(T.p.g) : { x: T.x, z: T.z, y: T.y };
if (!p)
return;
var a = lwbAreaAt(p.x, p.z);
var P = { x: p.x, z: p.z, y: p.y != null ? p.y : 0, area: a };
if (room && a !== here)
return;
P.d = Math.hypot(P.x - Lc.x, P.z - Lc.z);
if (!out || (a === here && (out.area !== here || P.d < out.d)))
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
var W = lwbNamed(SHK.talk, at.who, at.room);
if (W)
return W;
var C0 = LWB_CH[lwbS().ch], d0 = C0 && C0.cast ? C0.cast.filter(function (d) { return d.name === at.who; })[0] : null;
if (d0 && d0.at !== at)
return lwbPos(d0.at);
}
if (at.spot) {
var Sp = lwbNamed(SHK.spots, at.spot, at.room);
if (Sp)
return Sp;
}
if (at.cast) {
var c = LWB.cast[at.cast], q = c && c.g && c.g.parent ? lwbLoc(c.g) : null;
if (q)
return { x: q.x, z: q.z, y: q.y, area: lwbAreaAt(q.x, q.z) };
}
if (at.room)
return lwbRoomPt(at.room, at.lx, at.lz);
if (at.at && LWL_PLACES[at.at]) {
var A = LWL_PLACES[at.at], ax = lwlX(A.x + (at.dx || 0)), az = lwlZ(A.z + (at.dz || 0));
return { x: ax, z: az, y: shkGround(ax, az, 2), area: "lw:" + lwlPiece(A.z + (at.dz || 0)) };
}
if (at.x != null) {
var x = lwlX(at.x), z = lwlZ(at.z);
return { x: x, z: z, y: at.y != null ? at.y : shkGround(x, z, 2), area: lwbAreaAt(x, z), name: at.name };
}
return null;
},
function (P, area) {
if (!P)
return null;
if (P.area === area)
return { show: P, way: "" };
if (area.indexOf("in:") === 0) {
var D = SHK_ROOMS[area.slice(3)];
if (P.area.indexOf("in:") === 0 && D && D.out && D.out === (SHK_ROOMS[P.area.slice(3)] || {}).out)
return { show: lwbRoomExit(), way: " (through the doors)" };
return { show: lwbRoomExit(), way: " (go out)" };
}
var target = P, inn = "";
if (P.area.indexOf("in:") === 0) {
target = lwbRoomDoor((SHK_ROOMS[P.area.slice(3)] || {}).out || P.area.slice(3));
inn = " (go in)";
if (!target)
return { show: null, way: " (the book will take you)" };
}
if (target.area === area)
return { show: target, way: inn };
var to = target.area.indexOf("lw:") === 0 ? LWL_PIECES[target.area.slice(3)].name : "London", cw = " (the cab rank: a cab to " + to + ")";
if (area.indexOf("lw:") === 0) {
var pc = LWL_PIECES[area.slice(3)].cab;
return { show: { x: lwlX(pc.x), z: lwlZ(pc.z), y: 0, area: area }, way: cw };
}
if (area === "gos") {
var c = DLN_PLACES.cab;
return { show: { x: dlnX(c.x), z: c.z, y: 0, area: "gos" }, way: cw };
}
if (area === "kg") {
return { show: { x: kgX(KGN_CAB.x), z: KGN_CAB.z, y: 0, area: "kg" }, way: " (the cab rank on Bayswater Road: a cab to " + to + ")" };
}
if (area === "ws") {
return { show: { x: wsX(WST_CAB.x), z: wsZ(WST_CAB.z), y: 0, area: "ws" }, way: " (the cab rank in Whitehall: a cab to " + to + ")" };
}
if (area === "bs") {
return { show: { x: bsX(BKS_CAB.x), z: bsZ(BKS_CAB.z), y: 0, area: "bs" }, way: " (the cab rank in Baker Street: a cab to " + to + ")" };
}
if (area === "pm" && typeof PML_CAB !== "undefined") {
return { show: { x: pmlX(PML_CAB.x), z: pmlZ(PML_CAB.z), y: 0, area: "pm" }, way: " (the cab rank in Pall Mall: a cab to " + to + ")" };
}
return { show: null, way: " (the 🎭 menu: London, 1912)" };
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
return (d >= 1000 ? (d / 1000).toFixed(1) + " km " : Math.round(d) + " m ") + w;
},
function () {
if (LWB.beam && LWB.beam.parent)
return LWB.beam;
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
SHK.G.add(g);
LWB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m, bk = dlnC;
switch (kind) {
case "crust":
m = wBox(0.12, 0.04, 0.08, wM(0xC8964A), 0, 0.02, 0, g);
break;
case "reed":
m = wBox(0.015, 0.5, 0.015, wM(0x9AA860), 0, 0.25, 0, g);
break;
case "twig":
m = wBox(0.02, 0.02, 0.5, wM(0x6A5030), 0, 0.02, 0, g);
break;
case "grass":
m = wBox(0.18, 0.06, 0.18, wM(0x7A9A4A), 0, 0.03, 0, g);
break;
case "mud":
m = wSph(0.1, wM(0x5A4028), 0, 0.05, 0, g, 8);
m.scale.y = 0.5;
break;
case "note":
m = wBox(0.18, 0.06, 0.1, wM(0xF4F0E4), 0, 0.03, 0, g);
break;
case "kite":
m = wBox(0.7, 0.02, 0.9, wM(0xF4F0E8), 0, 0.02, 0, g);
m.rotation.y = 0.7;
break;
case "hoop":
m = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.015, 4, 18), wM(0x8A6A44));
m.rotation.x = Math.PI / 2;
m.position.y = 0.02;
g.add(m);
break;
case "balloon":
m = wSph(0.2, wM(0xD82A2A), 0, 0.5, 0, g, 10);
wBox(0.004, 0.5, 0.004, wM(0xE8E8E8), 0, 0.2, 0, g);
break;
case "spade":
m = wBox(0.12, 0.02, 0.18, wM(0x8A8A90), 0, 0.02, 0, g);
wBox(0.025, 0.025, 0.4, wM(0x8A6A44), 0, 0.02, 0.28, g);
break;
case "letter":
m = wBox(0.16, 0.004, 0.11, wM(0xEAE0C4), 0, 0.01, 0, g);
break;
case "plank":
m = wBox(0.3, 0.02, 0.06, wM(0xC8A878), 0, 0.02, 0, g);
break;
case "brick":
m = wBox(0.08, 0.04, 0.04, wM(0xA84A3A), 0, 0.02, 0, g);
break;
case "seed":
m = wSph(0.03, wM(0x6A4A2A), 0, 0.03, 0, g, 6);
break;
case "rose":
m = wSph(0.05, wM(0xE84A6A), 0, 0.05, 0, g, 8);
break;
case "pail":
m = wCyl(0.1, 0.08, 0.16, wM(0x2A6AA8), 0, 0.08, 0, g, 10);
break;
case "shirt":
m = wBox(0.32, 0.06, 0.26, wM(0xF8F6F0), 0, 0.03, 0, g);
wBox(0.1, 0.02, 0.04, wM(0xFAFAF6), 0, 0.07, 0.1, g);
break;
case "bond":
m = wBox(0.22, 0.004, 0.15, wM(0xE8DCB8), 0, 0.01, 0, g);
wBox(0.18, 0.005, 0.03, wM(0x6A4A2A), 0, 0.012, -0.04, g);
break;
case "thimble":
m = wCyl(0.012, 0.014, 0.02, wM(0xC8C8C8, { m: 0.8, r: 0.3 }), 0, 0.01, 0, g, 10);
break;
default: m = wSph(0.08, wM(0xE8E0D0, { e: 0x4A4A5A, ei: 0.4 }), 0, 0.12, 0, g, 10);
}
var gl = wGlow(0xE8FFE0, 0.55, 0.5);
gl.position.y = 0.28;
g.add(gl);
g.userData.glow = gl;
g.userData.keep = 1;
return g;
},
function (kind, P, name, verb, onTake) {
if (!P)
return null;
var g = lwbItemMesh(kind);
g.position.set(P.x, (P.y || 0) + 0.02, P.z);
SHK.G.add(g);
var I = { g: g, P: P, name: name || kind, kind: kind };
I.S = shkSpot(P.x, P.z, 1.6, I.name, verb || "pick it up", function () {
if (LWB.items.indexOf(I) < 0)
return;
if (g.parent)
g.parent.remove(g);
var j = SHK.spots.indexOf(I.S);
if (j >= 0)
SHK.spots.splice(j, 1);
LWB.items = LWB.items.filter(function (x) { return x !== I; });
if (typeof playTone === "function")
playTone(980, 0.05);
try {
onTake && onTake(I);
}
catch (e) {
if (window.console)
console.warn("[lwb] take", e);
}
}, (P.y || 0));
I.S.lwb = 1;
LWB.items.push(I);
return I;
},
function (k) {
if (LWB.tuneKey === k)
return;
LWB.tuneKey = k;
var old = LWB.tune;
LWB.tune = null;
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
if (!k || !LWB_TUNES[k])
return;
try {
var A = new Audio(LWB_TUNES[k]);
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
LWB.tune = A;
var v = window.SBK_VOL != null ? window.SBK_VOL : 0.26, fi = setInterval(function () { try {
if (LWB.tune !== A) {
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
if (LWB.text)
return fn(LWB.text);
if (LWB.textWait) {
LWB.textWait.push(fn);
return;
}
LWB.textWait = [fn];
var done = function (B) { LWB.text = B; var w = LWB.textWait; LWB.textWait = null; w.forEach(function (f) { try {
f(B);
}
catch (e) { } }); };
try {
fetch("data/lost-world/lost-world.json").then(function (r) { return r.json(); }).then(done).catch(function () { done(null); });
}
catch (e) {
done(null);
}
},
function (i) {
lwbText(function (B) {
var C = LWB_CH[i], T = B && B.ch && C && C.txt != null ? B.ch[C.txt] : null;
if (!T)
return;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T.src) + "</div><h3 style='margin:4px 0'>" + (i + 1) + ". " + esc(C.t) + "</h3><div style='max-height:58vh;overflow:auto'>" + T.p.map(lwbPara).join("") + "</div>";
var fns = { back: function () { worldCard(null); LWB.readOpen = 0; LWB.readAsk = 0; } };
b += worldBtn("back", "Close the book", "");
worldCard(b, fns);
});
},
function () {
var S = lwbS(), C = LWB_CH[S.ch];
if (!C)
return;
LWB.readAsk = 1;
var ch = S.ch;
var done = false, show = function (B) {
if (done)
return;
done = true;
LWB.readAsk = 0;
LWB.readOpen = 1;
var T = B && B.ch && C.txt != null ? B.ch[C.txt] : null;
var b = "<div style='font-size:12px;opacity:.7'>" + esc(T ? T.src : (C.src || "The Lost World: the true and the told")) + "</div><h3 style='margin:4px 0'>" + (ch + 1) + ". " + esc(C.t) + "</h3>" + (C.words ? "<p style='margin:6px 0'>" + esc(C.words) + "</p>" : "") + "<div style='max-height:46vh;overflow:auto'>" + (T ? lwbOpening(T).map(lwbPara).join("") : "") + "</div>";
var fns = { go: function () { worldCard(null); LWB.readOpen = 0; lwbStepDone(); }, all: function () { lwbReadAll(ch); } };
b += worldBtn("go", "▶ Begin", C.intro || "Into the story");
if (T)
b += worldBtn("all", "📜 Read the whole chapter", "Conan Doyle's own words, all of it");
b += lwbKeeperBtns(fns);
worldCard(b, fns);
};
lwbText(show);
setTimeout(function () { show(null); }, 9000);
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
LWB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); lwbJump(i); }; });
return b + "</div>";
},
function () {
var b = lwbStep();
lwbItemsClear();
LWB.hold = 0;
LWB.puzOpen = 0;
if (!b)
return;
b._key = lwbKey();
try {
if (b.on)
b.on(lwbS().f);
}
catch (e) {
if (window.console)
console.warn("[lwb] on", e);
}
if (b.k === "read") {
lwbChapterCard();
return;
}
if (b.k === "reward")
[].concat(b.kind).forEach(function (k) { LWB.rew[k] = 0; });
if (b.k === "find")
lwbItemAdd(b.item, lwbPos(b.at), b.name, b.verb, function () { if (lwbKey() === b._key)
lwbStepDone(); });
if (b.k === "gather") {
var P = lwbPos(b.at), n = b.n || 3, sp = b.spread || 5, R = wRand(lwbS().ch * 97 + lwbS().s * 13 + 7);
LWB.got = 0;
if (P)
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), Q = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r, area: P.area };
Q.y = shkGround(Q.x, Q.z, (P.y || 0) + 0.5);
lwbItemAdd(b.item, Q, b.name, b.verb, function () { if (lwbKey() !== b._key)
return; LWB.got++; try {
if (b.each)
b.each(LWB.got);
}
catch (e) { } if (LWB.got < n) {
lwbSay((b.eachSay || "Got one.") + " " + LWB.got + " of " + n + ".");
return;
} lwbStepDone(); });
}
}
if (b.h)
lwbSay("<b>" + esc(LWB_CH[lwbS().ch].t) + ".</b> " + b.h);
},
function (b) {
LWB.puzOpen = 1;
LWB.puzT = performance.now();
var k = lwbKey(), fns = {}, h = LWB_H + esc(b.title) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.html + "</div>";
b.answers.forEach(function (a, i) {
h += worldBtn("a" + i, a, "");
fns["a" + i] = function () {
worldCard(null);
if (i === b.right) {
if (b.yes)
lwbSay(b.yes);
if (lwbKey() === k)
lwbStepDone();
return;
}
lwbSay("✗ " + ((b.why && b.why[i]) || "Not that one. Think again."));
setTimeout(function () { if (lwbKey() === k)
LWB.puzOpen = 0; }, 2500);
};
});
worldCard(h, fns);
},
function () {
var S = lwbS(), C = LWB_CH[S.ch], b = lwbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[lwb] done", e);
}
if (b.say)
lwbSay(b.say);
S.s++;
if (window.LWB_LOG)
LWB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
if (S.ch >= LWB_CH.length - 1) {
S.done = 1;
S.s = 0;
lwbSave();
lwbItemsClear();
lwbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
lwbSave();
var nx = LWB_CH[S.ch];
setTimeout(function () { try {
lwbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[lwb]", e);
} }, window.SBK_FAST ? 10 : 2600);
return;
}
lwbSave();
lwbStepBegin();
},
function () {
lwbTune(null);
lwbOnce("quarters");
var S = lwbS();
var b = "<h3 style='margin:4px 0'>The book closes</h3><p style='font-style:italic'>" + esc(LWL_Q.notyet) + "</p><p style='font-size:12px;opacity:.75'>Arthur Conan Doyle, The Lost World (1912)</p><p>You have sat by the red curtain at Streatham, faced the Professor in his study, shouted at the Institute, sat in the pink radiance of the Albany, and seen a pterodactyl loose in the Queen's Hall. The plateau itself is its own tale world, a door from the Hall of Doors.</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; lwbSave(); lwbChapterBegin(true); } };
b += worldBtn("again", "Walk it again from the start", "The Chestnuts, Streatham, an evening in 1911");
if (typeof ctsEnter === "function") {
b += worldBtn("plat", "🦕 To the plateau", "The Lost World's own tale world");
fns.plat = function () { worldCard(null); lwbPlateau(); };
}
worldCard(b, fns);
},
function () {
var S = lwbS(), C = LWB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>Arthur Conan Doyle · The Lost World (1912)</div><h3 style='margin:4px 0'>🦕 Challenger's London</h3>";
if (S.done)
b += "<p>You have walked the whole book. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>" + (S.ch + 1) + ". " + esc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + esc((lwbStep() || {}).h || "") + "</p>";
else
b += "<p>A young reporter on the Daily Gazette is in love with a girl who will only marry a hero. His editor sends him to interview the most quarrelsome man of science in London, Professor George Edward Challenger, who says he has seen living dinosaurs in South America. Walk Ned Malone's London in Conan Doyle's own words: Streatham, Fleet Street, Enmore Park, the Zoological Institute, the Albany, and the night the expedition came home to the Queen's Hall.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: the Chestnuts, Streatham", S.started ? "Back to where you were" : "\"Mr. Hungerton, her father, really was the most tactless person upon earth\"");
fns.go = function () { worldCard(null); lwbBegin(); };
}
else {
b += worldBtn("again", "Walk it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; lwbSave(); lwbBegin(); };
}
if (typeof ctsEnter === "function") {
b += worldBtn("plat", "🦕 The plateau itself", "The Lost World's own tale world (its own door)");
fns.plat = function () { worldCard(null); lwbPlateau(); };
}
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + esc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += lwbKeeperBtns(fns);
worldCard(b, fns);
},
function (c) {
var C = LWB.cast[c.key];
if (lwbCastLive(C))
return C;
var P = lwbPos(c.at);
if (!P)
return null;
var inside = P.area.indexOf("in:") === 0, parent = inside ? (SHK.rooms[P.area.slice(3)] || {}).live : (c.kind && c.kind !== "person" ? LWL.live : SHK.live);
if (!parent)
return null;
var px = P.x + (c.ox || 0), pz = P.z + (c.oz || 0), py = c.y != null ? c.y : shkGround(px, pz, (P.y || 0) + 0.5) + (c.kind === "person" || !c.kind ? 0.14 : 0), g;
if (!c.kind || c.kind === "person") {
g = dlnPerson("lwb_" + c.key, c.dress, { sex: c.sex, child: !!c.child, inside: inside, beard: c.beard, hair: c.hair, age: c.age });
if (c.scale)
g.scale.set(c.scale[0], c.scale[1], c.scale[2]);
}
else if (c.kind === "thing" && c.make)
g = c.make();
else
g = new THREE.Group();
g.position.set(px, py, pz);
g.rotation.y = c.ry || 0;
if (c.lie) {
g.rotation.x = -Math.PI / 2;
g.position.y += 0.25;
}
parent.add(g);
var Q = { g: g, key: "lwb_" + c.key, wander: c.wander ? { r: c.wander, sp: 0.5 } : null, ground: py };
if (!c.kind || c.kind === "person")
SHK.people.push(Q);
if (c.name) {
var T = { p: Q, name: c.name, r: c.r || (c.kind && c.kind !== "person" ? 2.4 : 3.2), t: { name: c.name, persona: c.persona || LWL_ERA, greet: c.greet || "Hallo." } };
SHK.talk.push(T);
lwbWrapT(T);
}
LWB.cast[c.key] = { g: g, P: Q, c: c };
return LWB.cast[c.key];
},
function () {
var C = LWB_CH[lwbS().ch];
if (!C || !C.cast)
return;
var b = lwbStep() || {}, idx = lwbS().s;
C.cast.forEach(function (c) {
if (c.from != null && idx < c.from)
return;
if (c.until != null && idx >= c.until) {
if (LWB.cast[c.key])
lwbCastHide(c.key);
return;
}
if (lwbCastLive(LWB.cast[c.key]))
return;
var P = lwbPos(c.at);
if (!P)
return;
if (P.area.indexOf("in:") === 0) {
if (!SHK.rooms[P.area.slice(3)])
return;
}
else if (lwbDist(P, worldLocal()) > 300 && b.who !== c.name)
return;
lwbPerson(c);
});
},
function (T) {
if (!lwbActive() || !lwZoneNow())
return false;
var b = lwbStep();
if (!b || b.k !== "talk")
return false;
var ok = b.who instanceof RegExp ? b.who.test(T.name || "") : T.name === b.who;
if (!ok)
return false;
var k = lwbKey();
worldPrompt(null);
var next = function () { if (lwbKey() === k)
lwbStepDone(); };
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
worldCard(LWB_H + esc(b.card[0]) + "</div><div style='opacity:.92;margin:6px 0;line-height:1.5'>" + b.card[1] + "</div>" + worldBtn("go", b.card[2] || "▶ Go on", ""), fns);
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
function (dt) {
if (!SHK.G || !SHK.built)
return;
LWB.wt += dt;
if (LWB.wt > 0.5) {
LWB.wt = 0;
lwbWrap();
if (lwbActive())
lwbCastTick();
}
var cardOpen = WLD.card && WLD.card.style.display === "block", busy = cardOpen || WLD.promptFn || SHK.moving;
if (!lwbActive()) {
if (LWB.beam)
LWB.beam.visible = false;
if (!busy)
worldPrompt("🦕 <b>Challenger's London</b> · <b>press E</b> to walk the book", lwbOpen);
return;
}
var S = lwbS(), b = lwbStep(), L = worldLocal(), t = SHK.t || 0, area = lwbAreaAt(L.x, L.z);
LWB.items.forEach(function (I, i) { var gl = I.g.userData.glow; if (gl)
gl.material.opacity = 0.35 + 0.2 * Math.sin(t * 2.5 + i); });
var P = b && b.at && b.k !== "read" ? lwbPos(b.at) : null, W = P ? lwbWayTo(P, area) : null, show = W && W.show, way = W ? W.way : "", bm = lwbBeam();
if (show && !SHK.moving) {
bm.visible = true;
var cd = lwbDist(show, L);
bm.position.set(show.x, show.y || 0, show.z);
var outside = area.indexOf("in:") !== 0;
bm.userData.col.visible = outside && cd > 14;
bm.userData.col.scale.set(1, 60, 1);
bm.userData.col.position.y = 30;
bm.userData.ring.material.opacity = 0.38 + 0.18 * Math.sin(t * 2.6);
bm.userData.spark.position.y = (b.k === "talk" ? 2.2 : 1.2) + Math.sin(t * 1.8) * 0.12;
way = lwbWay(show, L) + way;
}
else
bm.visible = false;
if (b && !cardOpen && !SHK.moving) {
var inArea = P && P.area === area, fd = P ? lwbDist(P, L) : 1e9;
switch (b.k) {
case "read":
if (LWB.readAsk)
break;
if (!LWB.readOpen)
lwbChapterCard();
else {
LWB.readOpen = 0;
lwbStepDone();
return;
}
break;
case "go":
if (P && inArea && (b.at.room && b.at.lx == null ? true : fd < (b.r || 6))) {
lwbStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
LWB.hold += dt * (window.SBK_FAST ? 8 : 1);
if (b.tick)
try {
b.tick(LWB.hold, dt);
}
catch (e) { }
if (LWB.hold >= (b.sec || 8)) {
lwbStepDone();
return;
}
}
else
LWB.hold = 0;
break;
case "reward":
if ([].concat(b.kind).some(function (k) { return LWB.rew[k]; })) {
lwbStepDone();
return;
}
break;
case "until": {
var ok = false;
try {
ok = b.test(S.f);
}
catch (e) { }
if (ok) {
lwbStepDone();
return;
}
break;
}
case "puzzle":
if ((!LWB.puzOpen || performance.now() - (LWB.puzT || 0) > 3000) && (!P || (inArea && fd < (b.r || 6))))
lwbPuzzleCard(b);
break;
}
}
if (!busy)
worldPrompt("🦕 <b>Challenger's London</b> · <b>press E</b> for the book", lwbOpen);
var C = LWB_CH[S.ch], prog = b && b.k === "hold" && LWB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - LWB.hold)) + " s)" : b && b.k === "gather" ? " (" + (LWB.got || 0) + " of " + (b.n || 3) + ")" : "";
worldBanner("🦕 <b>" + (S.ch + 1) + ". " + esc(C ? C.t : "") + "</b> · " + (b && b.h ? b.h : "") + prog + (way ? " · <i>" + way + "</i>" : ""));
},
function () {
var g = new THREE.Group(), w = dlnS("oak", 0xA8865A), dk = dlnC(0x5A3A1E);
dlnBox(g, 1.1, 0.9, 0.9, w, 0, 0.45, 0);
[-0.3, 0, 0.3].forEach(function (y) { dlnBox(g, 1.12, 0.06, 0.92, dk, 0, 0.45 + y, 0); });
for (var i = 0; i < 6; i++)
dlnBox(g, 0.08, 0.08, 0.04, dlnC(0x1A1A1A), -0.45 + i * 0.18, 0.75, 0.46);
var lid = dlnBox(g, 1.12, 0.05, 0.92, w, 0, 0.92, 0);
g.userData.lid = lid;
return g;
},
function (next) { worldCard(lxH("🌀 A Catharine-wheel") + lxQs("catharine", "steps") + lxSrc("III"), {}); setTimeout(function () { worldCard(null); lwlGo("enmore", "🌀 <b>Enmore Park.</b> Down the front steps in a back somersault, and into the gutter. The Professor springs up, spluttering."); next(); }, window.SBK_FAST ? 20 : 3800); },
function () { lwlPteroPerch(false); lwlAfterMove(function () { if (typeof pmlGo === "function")
pmlGo("cab", "🎉 <b>Pall Mall.</b> Down Regent Street and along past the clubs, shoulder-high above a hundred thousand people.");
else
lwlGo("albany"); setTimeout(function () { lwlAfterMove(function () { lwlGo("albany", "🌙 <b>Vigo Street.</b> Along Pall Mall, up St James's Street and Piccadilly: the crowd carries you all the way to the Albany's gate."); }); }, window.SBK_FAST ? 400 : 9000); }); },
function (x, z) {
var k = lwlPiece(z), Pc = LWL_PIECES[k], c = Pc.cab;
if (Math.hypot(x - c.x, z - c.z) < 10)
return "the cab rank, " + Pc.name;
if (k === "f") {
if (x < -110)
return "by Temple Bar, Fleet Street";
if (x > 92)
return "Ludgate Circus";
if (Math.abs(x - LWL_GAZ.x) < 8 && z < 0)
return "before the Daily Gazette, Fleet Street";
return "Fleet Street";
}
if (k === "e") {
if (Math.abs(x - LWL_CH.x) < 10 && z < -128)
return "before Professor Challenger's house, Enmore Park";
return "Enmore Park, Kensington";
}
if (k === "v") {
if (Math.abs(x - LWL_ZI.x) < 8 && z < 126)
return "before the Zoological Institute, Vigo Street";
if (Math.abs(x - LWL_AL.x) < 6 && z > 126)
return "the Albany's gate, Vigo Street";
return "Vigo Street";
}
if (Math.abs(x - LWL_QH.x) < 14 && z < 240)
return "before the Queen's Hall, Langham Place";
if (x < -26)
return "by All Souls', Langham Place";
return "Langham Place";
},
function () {
var L = worldLocal(), here = lwlIn(L.x, L.z) ? lwlPiece(lwlLocal(L.x, L.z).z) : "f", Pc = LWL_PIECES, b = "", fns = {};
[["f", "gazette", "📰"], ["e", "enmore", "🏛️"], ["v", "inst", "🦕"], ["l", "queens", "🎻"]].forEach(function (o) {
if (o[0] === here)
return;
b += worldBtn("p" + o[0], o[2] + " To " + Pc[o[0]].name, Pc[o[0]].sub);
fns["p" + o[0]] = function () { worldCard(null); lwlGo(o[1], o[2] + " <b>" + esc(Pc[o[0]].name) + ".</b> The taxi sets you down: " + esc(LWL_PLACES[o[1]].name) + "."); };
});
b += worldBtn("sav", "🍽️ To the Savage Club", "Adelphi Terrace, over the river");
fns.sav = function () { worldCard(null); shkGoIn("lw_savage"); };
b += worldBtn("str", "🚋 To Streatham, by the tram", "The Chestnuts: Gladys Hungerton's");
fns.str = function () { worldCard(null); shkGoIn("lw_chest"); };
b += worldBtn("gos", "To Great Ormond Street", "The hospital, Queen Square");
fns.gos = function () { worldCard(null); dlnGo("🚕 <b>Great Ormond Street.</b> The taxi sets you down at the rank."); };
if (typeof pmlGo === "function") {
b += worldBtn("pm", "🎩 To Pall Mall", "The clubs, the Reform, Charing Cross");
fns.pm = function () { worldCard(null); pmlGo("cab"); };
}
if (typeof bsGo === "function") {
b += worldBtn("bs", "To Baker Street", "221B");
fns.bs = function () { worldCard(null); bsGo("door"); };
}
if (typeof n14Go === "function") {
b += worldBtn("n14", "To No. 14, the Darlings' house", "The quiet square in Bloomsbury");
fns.n14 = function () { worldCard(null); n14Go("door"); };
}
if (typeof kgnGo === "function") {
b += worldBtn("kg", "To Kensington Gardens", "The Black Lion Gate, Bayswater Road");
fns.kg = function () { worldCard(null); kgnGo("gate", "🌳 <b>Kensington Gardens.</b> The Black Lion Gate, on the Bayswater Road."); };
}
if (typeof wsmGo === "function") {
b += worldBtn("ws", "To Westminster", "Whitehall, Big Ben, the Abbey");
fns.ws = function () { worldCard(null); wsmGo("cab"); };
}
b += worldBtn("tale", "The taxicab", "Eightpence the first mile");
fns.tale = function () { worldCard(null); lwlTale("🚕 Taxicabs", [], ["The motor taxicab came to London in 1907 and has nearly beaten the horse already: a little French Unic or a Napier with a meter on the side that ticks up eightpence for the first mile. There are still hansoms on the ranks, for the old gentlemen who will not trust a motor."]); };
if (typeof dlnTo1600 === "function") {
b += worldBtn("back", "Back to Bankside, 1600", "Three hundred years ago, by Old Father Thames");
fns.back = function () { worldCard(null); dlnTo1600(); };
}
worldCard(worldFacts("🚕 A taxicab", "The rank in " + Pc[here].name, [], []) + b, fns);
},
function () {
try {
var d = document.createElement("div");
d.innerHTML = worldBtn("lwl", "🦕 To Fleet Street and the Lost World's London", "The Gazette, Enmore Park, the Institute, the Queen's Hall");
var b = d.querySelector("[data-w]");
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); worldCard(null); lwlGo("cab", "📰 <b>Fleet Street, 1912.</b> The taxi sets you down at the rank: the Gazette's clock across the way, St Dunstan's giants striking the hour."); };
var card = WLD.card, first = card && card.querySelector("[data-w]:not([data-w=close])");
if (first)
first.parentNode.insertBefore(b, first);
else if (card)
card.appendChild(b);
}
catch (e) { }
},
function (k, seed, dress, x, y, z, ry, o) {
o = o || {};
var p = dlnPerson(seed, dress, { sex: o.sex, inside: true, beard: o.beard, hair: o.hair });
p.position.set(x, y, z);
p.rotation.y = ry || 0;
if (o.scale)
p.scale.set(o.scale[0], o.scale[1], o.scale[2]);
SHK.live.add(p);
var P = { g: p, key: seed, ground: y, wander: o.wander ? { r: o.wander, sp: 0.4 } : null };
SHK.people.push(P);
return P;
},
function (k, cx, cz) {
var R = wRand(1912 + k.length * 7), home = function (P, T) { (LWL.home = LWL.home || []).push({ P: P, T: T, on: true }); };
if (k === "lw_study") {
var P = lwlHomeOne(k, "lw_homegec", "lwchall", cx, 0.02, cz - 2.6, 0, { sex: "m", beard: "full", hair: 0x141414, scale: [1.18, 0.9, 1.18] });
home(P, lwlHomeTalk(P, "Professor Challenger, at home", LWL_GEC + " Just now you are at your table in your study at Enmore Park, working on the proofs of a paper for the Zoological Congress, and you resent the interruption.", "Well? What now? You have exactly five minutes, sir.", { r: 3.4 }));
return;
}
if (k === "lw_hall") {
var A = lwlHomeOne(k, "lw_homeaus", "lwaustin", cx + 0.8, 0.02, cz + 3.2, Math.PI, { sex: "m" });
home(A, lwlHomeTalk(A, "Austin", "You are Austin, Professor Challenger's servant at Enmore Park, from Arthur Conan Doyle's The Lost World (the book only, never any film): swarthy, dried-up, in a pilot jacket and leather gaiters; you speak very little, dryly, and nothing your master does surprises you. " + LWL_ERA, "Expected?"));
return;
}
if (k === "lw_albany") {
var J = lwlHomeOne(k, "lw_homejohn", "lwtweed", cx - 1.4, 0.02, cz + 1.2, Math.PI * 0.75, { sex: "m", beard: "short", hair: 0x9A3A1A });
home(J, lwlHomeTalk(J, "Lord John Roxton, at home", LWL_JOHN + " Just now you are at home in your rooms at the Albany, cleaning a rifle.", "Hallo, young fellah! Sit down. Whisky? Soda? What?", { r: 3.2 }));
return;
}
if (k === "lw_chest") {
var G = lwlHomeOne(k, "lw_homeglad", "lwgladys", cx - 3.2, 0.02, cz - 1.4, Math.PI / 2, { sex: "f", hair: 0x1A120C });
home(G, lwlHomeTalk(G, "Miss Gladys Hungerton", LWL_GLAD, "Good evening. Father is out at his Masonic meeting."));
return;
}
if (k === "lw_gaz") {
[[-4.2, 2.4], [-1.2, 5.6], [1.8, 2.4]].forEach(function (q, i) { if (DLN.lite && i)
return; var p = lwlHomeOne(k, "lw_rep" + i, ["lwgrey", "lwcheck", "lwzambo"][i], cx + q[0], 0.02, cz + q[1] + 0.8, Math.PI, { sex: "m" }); });
var M = lwlHomeOne(k, "lw_homemca", "lwmcardle", cx + 1.6, 0.02, cz - 4.2, 0, { sex: "m", hair: 0xA84A1E });
home(M, lwlHomeTalk(M, "Mr McArdle, news editor", LWL_MCA, "Ah. Ye've something for me? No? Then off wi' ye: there's a paper to get out.", { r: 3.2 }));
return;
}
if (k === "lw_press") {
for (var i = 0; i < (DLN.lite ? 2 : 4); i++)
lwlHomeOne(k, "lw_mach" + i, "lwmachine", cx + [-1.8, 1.0, -6.4, 5.8][i], 0.02, cz - 3.0 + i * 1.6, R() * 6.28, { sex: "m", wander: 1.2 });
return;
}
if (k === "lw_savage") {
[[-4.2, -2.4, 0.9], [-4.2, 0.6, 2.2], [1.4, 0.2, 1.57], [3.8, 1.8, -1.57]].forEach(function (q, i) { if (DLN.lite && i > 1)
return; lwlHomeOne(k, "lw_sav" + i, ["lwcheck", "lwgrey", "lwsummer", "lwtweed"][i], cx + q[0], 0.02, cz + q[1], q[2], { sex: "m", beard: i === 2 ? "full" : i === 3 ? "mustache" : null }); });
return;
}
if (k === "lw_inst" || k === "lw_queens") {
var D = LWL_ROOMS[k], n = DLN.lite ? 8 : k === "lw_queens" ? 28 : 22, kinds = ["gent", "lady", "gent", "oldgent", "bowler", "gent", "lady", "clergy"];
for (var j = 0; j < n; j++) {
var side = j % 2 ? 1 : -1, x = cx + side * (2.8 + R() * (D.hw - 5)), z = k === "lw_queens" ? cz - 8 + R() * (D.hd + 4) : cz - 6 + R() * 14;
var who = kinds[(R() * kinds.length) | 0], q = dlnPerson("lw_aud" + k + j, who, { inside: true });
q.position.set(x, shkGround(x, z, 1) + 0.0, z);
q.rotation.y = Math.PI + (R() - 0.5) * 0.6;
SHK.live.add(q);
SHK.people.push({ g: q, ground: q.position.y });
}
}
},
function () {
if (!LWL.home)
return;
var act = false;
try {
var S = lwbS();
act = !!(S.started && !S.done);
}
catch (e) { }
LWL.home.forEach(function (H) {
if (act && H.on) {
H.on = false;
H.P.g.visible = false;
SHK.talk = SHK.talk.filter(function (t) { return t !== H.T; });
SHK.people = SHK.people.filter(function (p) { return p !== H.P; });
}
else if (!act && !H.on && H.P.g.parent) {
H.on = true;
H.P.g.visible = true;
SHK.talk.push(H.T);
SHK.people.push(H.P);
}
});
},
function (dt, t) {
var F = LWL.ptero, g = F && F.g;
if (!g || !g.parent) {
LWL.ptero = null;
return;
}
F.t += dt * (window.SBK_FAST ? 6 : 1);
var Q = LWL.qRoom, W = LWL.qWin || { x: Q.cx - Q.hw, y: 10, z: Q.cz - Q.hd + 8 }, cxx = Q.cx, czz = Q.cz - 4, rr = Math.min(Q.hw - 3, 10), u = F.t, up = 1.6, lap = 7, pos, ang;
if (u < up) {
var k = u / up;
pos = { x: F.x0 + (cxx + rr - F.x0) * k, y: F.y0 + (9 - F.y0) * k, z: F.z0 + (czz - F.z0) * k };
ang = Math.atan2(cxx + rr - F.x0, czz - F.z0);
}
else if (u < up + lap * 2) {
var a = (u - up) / lap * Math.PI * 2;
pos = { x: cxx + Math.cos(a) * rr, y: 9 + Math.sin(a * 1.5) * 0.8, z: czz - Math.sin(a) * rr };
ang = Math.atan2(-Math.sin(a), -Math.cos(a));
}
else {
var s = Math.min(1, (u - up - lap * 2) / 2.4), sx = cxx + rr, sz = czz;
pos = { x: sx + (W.x - sx) * s, y: 9 + (W.y - 9) * s, z: sz + (W.z - sz) * s };
ang = Math.atan2(W.x - sx, W.z - sz);
if (s >= 1) {
g.visible = false;
LWL.ptero = null;
return;
}
}
g.position.set(pos.x, pos.y, pos.z);
g.rotation.set(0, ang, 0);
var fl = Math.sin(t * 5.5) * 0.5;
(g.userData.wings || []).forEach(function (Wg) { Wg.g.rotation.z = Wg.k * fl; });
}
];
});
