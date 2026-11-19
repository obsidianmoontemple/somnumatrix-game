/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(98, function () {
"use strict";
return [
function () {
var c = mdCanvas(512, 512), x = c.getContext("2d"), R = mdRand(7);
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++) {
var g = x.createLinearGradient(i * 256, j * 256, i * 256 + 256, j * 256 + 256);
var a = (i + j) % 2 ? ["#F4EEE6", "#E9E1D6"] : ["#FBF8F3", "#EFE8F2"];
g.addColorStop(0, a[0]);
g.addColorStop(1, a[1]);
x.fillStyle = g;
x.fillRect(i * 256, j * 256, 256, 256);
x.strokeStyle = "rgba(150,130,150,.16)";
x.lineWidth = 1.4;
for (var v = 0; v < 5; v++) {
x.beginPath();
var px = i * 256 + R() * 256, py = j * 256;
x.moveTo(px, py);
for (var s = 0; s < 8; s++) {
px += (R() - 0.5) * 60;
py += 32;
x.lineTo(px, py);
}
x.stroke();
}
}
x.strokeStyle = "#C9A868";
x.lineWidth = 3;
x.strokeRect(1.5, 1.5, 509, 509);
x.beginPath();
x.moveTo(256, 0);
x.lineTo(256, 512);
x.moveTo(0, 256);
x.lineTo(512, 256);
x.stroke();
[[0, 0], [256, 0], [0, 256], [256, 256], [512, 0], [0, 512], [512, 512], [256, 512], [512, 256]].forEach(function (p) {
x.fillStyle = "#D9A8C4";
x.beginPath();
x.moveTo(p[0], p[1] - 18);
x.lineTo(p[0] + 18, p[1]);
x.lineTo(p[0], p[1] + 18);
x.lineTo(p[0] - 18, p[1]);
x.closePath();
x.fill();
x.strokeStyle = "#C9A868";
x.lineWidth = 2;
x.stroke();
});
return c;
},
function () {
var c = mdCanvas(256, 256), x = c.getContext("2d");
var g = x.createLinearGradient(0, 0, 0, 256);
g.addColorStop(0, "#F3E9F2");
g.addColorStop(1, "#EADFD2");
x.fillStyle = g;
x.fillRect(0, 0, 256, 256);
x.fillStyle = "#E2D4C4";
x.fillRect(0, 0, 22, 256);
x.fillRect(234, 0, 22, 256);
x.fillStyle = "rgba(255,255,255,.5)";
for (var f = 0; f < 3; f++) {
x.fillRect(4 + f * 6, 0, 2, 256);
x.fillRect(238 + f * 6, 0, 2, 256);
}
x.strokeStyle = "#CDAE72";
x.lineWidth = 3;
x.strokeRect(40, 40, 176, 150);
x.lineWidth = 1.5;
x.strokeRect(50, 50, 156, 130);
x.fillStyle = "#D8C49A";
x.fillRect(0, 214, 256, 8);
x.fillStyle = "#BFA27A";
x.fillRect(0, 232, 256, 24);
return c;
},
function () {
var c = mdCanvas(256, 256), x = c.getContext("2d"), R = mdRand(11), cols = ["#F7C6DA", "#D9C4F6", "#BFDDF6", "#FFE7AE", "#C8F0DE", "#F9D9B8"];
x.fillStyle = "#2A2440";
x.fillRect(0, 0, 256, 256);
for (var i = 0; i < 4; i++)
for (var j = 0; j < 6; j++) {
var px = i * 64 + 4, py = j * 43 + 4;
x.fillStyle = cols[Math.floor(R() * cols.length)];
x.beginPath();
if (j === 0) {
x.moveTo(px, py + 38);
x.lineTo(px, py + 16);
x.quadraticCurveTo(px + 28, py - 10, px + 56, py + 16);
x.lineTo(px + 56, py + 38);
}
else
x.rect(px, py, 56, 35);
x.fill();
x.fillStyle = "rgba(255,255,255,.35)";
x.fillRect(px + 4, py + 4, 10, 26);
}
return c;
},
function (kind) {
var c = mdCanvas(384, 448), x = c.getContext("2d"), R = mdRand(31 + kind * 17), W = 384, H = 448;
var skies = [["#2B2A6B", "#7B5AA6", "#F2A7C3"], ["#13264F", "#3D6CA8", "#9FD7E8"], ["#3B1E4F", "#B65C8A", "#FFD0A0"]][kind % 3];
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, skies[0]);
g.addColorStop(0.6, skies[1]);
g.addColorStop(1, skies[2]);
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var s = 0; s < 70; s++) {
x.fillStyle = "rgba(255,250,230," + (0.4 + R() * 0.6) + ")";
var r = R() * 1.8 + 0.4;
x.beginPath();
x.arc(R() * W, R() * H * 0.6, r, 0, Math.PI * 2);
x.fill();
}
x.fillStyle = "#FFF4D6";
x.beginPath();
x.arc(W * 0.72, H * 0.2, 34, 0, Math.PI * 2);
x.fill();
x.fillStyle = skies[0];
x.globalAlpha = kind === 1 ? 0 : 0.92;
x.beginPath();
x.arc(W * 0.72 + 16, H * 0.2 - 8, 30, 0, Math.PI * 2);
x.fill();
x.globalAlpha = 1;
function cloud(cx, cy, w) { x.fillStyle = "rgba(255,240,250,.85)"; for (var k = 0; k < 6; k++) {
x.beginPath();
x.arc(cx + (k - 2.5) * w * 0.18, cy + Math.sin(k * 1.7) * w * 0.05, w * (0.12 + R() * 0.08), 0, Math.PI * 2);
x.fill();
} }
if (kind === 0) {
cloud(W * 0.25, H * 0.75, 150);
cloud(W * 0.8, H * 0.82, 120);
x.fillStyle = "#5B4A6E";
x.beginPath();
x.moveTo(W * 0.18, H * 0.58);
x.quadraticCurveTo(W * 0.5, H * 0.95, W * 0.82, H * 0.58);
x.closePath();
x.fill();
x.fillStyle = "#7FB08A";
x.fillRect(W * 0.18, H * 0.56, W * 0.64, 10);
x.fillStyle = "#F3E6F7";
[[0.32, 0.34, 26], [0.42, 0.24, 32], [0.52, 0.3, 28], [0.62, 0.38, 22], [0.47, 0.18, 18]].forEach(function (t) {
var bx = W * t[0], top = H * t[1], w = t[2];
x.fillRect(bx - w / 2, top, w, H * 0.57 - top);
x.beginPath();
x.moveTo(bx - w / 2 - 4, top);
x.lineTo(bx, top - w * 1.3);
x.lineTo(bx + w / 2 + 4, top);
x.closePath();
x.fill();
});
x.fillStyle = "#FFD98A";
for (var w2 = 0; w2 < 9; w2++)
x.fillRect(W * (0.3 + R() * 0.36), H * (0.3 + R() * 0.2), 4, 7);
}
else if (kind === 1) {
x.fillStyle = "#1D3E6E";
x.fillRect(0, H * 0.7, W, H * 0.3);
x.fillStyle = "rgba(255,244,214,.7)";
for (var k = 0; k < 10; k++)
x.fillRect(W * 0.72 - 30 + R() * 60, H * 0.72 + k * 12, 20 + R() * 30, 3);
x.fillStyle = "#A9C7EE";
x.beginPath();
x.ellipse(W * 0.38, H * 0.45, 90, 34, -0.15, 0, Math.PI * 2);
x.fill();
x.beginPath();
x.moveTo(W * 0.38 + 80, H * 0.43);
x.lineTo(W * 0.38 + 130, H * 0.33);
x.lineTo(W * 0.38 + 128, H * 0.5);
x.closePath();
x.fill();
x.fillStyle = "#E8F1FC";
x.beginPath();
x.ellipse(W * 0.36, H * 0.48, 70, 16, -0.15, 0, Math.PI);
x.fill();
x.fillStyle = "#22304E";
x.beginPath();
x.arc(W * 0.27, H * 0.44, 4, 0, Math.PI * 2);
x.fill();
cloud(W * 0.75, H * 0.6, 110);
}
else {
["#F6A6B6", "#FBC88E", "#FFF0A0", "#B8E6B0", "#A8CCF0", "#C8B0EE"].forEach(function (col, i) { x.strokeStyle = col; x.lineWidth = 12; x.beginPath(); x.arc(W / 2, H * 0.86, 150 - i * 12, Math.PI, 0); x.stroke(); });
x.fillStyle = "#6FA87A";
x.fillRect(0, H * 0.8, W, H * 0.2);
for (var f = 0; f < 7; f++) {
var fx = W * (0.08 + f * 0.14), fy = H * (0.66 + R() * 0.1);
x.strokeStyle = "#4F8A5A";
x.lineWidth = 4;
x.beginPath();
x.moveTo(fx, H);
x.lineTo(fx, fy);
x.stroke();
x.fillStyle = ["#F7B8D2", "#FFE08A", "#C9B6F2", "#FFFFFF"][f % 4];
for (var p = 0; p < 6; p++) {
x.beginPath();
x.arc(fx + Math.cos(p) * 12, fy + Math.sin(p) * 12, 9, 0, Math.PI * 2);
x.fill();
}
x.fillStyle = "#FFB347";
x.beginPath();
x.arc(fx, fy, 6, 0, Math.PI * 2);
x.fill();
}
cloud(W * 0.2, H * 0.3, 120);
cloud(W * 0.75, H * 0.4, 100);
}
return c;
},
function () {
var c = mdCanvas(128, 128), x = c.getContext("2d"), R = mdRand(5);
var g = x.createLinearGradient(0, 0, 0, 128);
g.addColorStop(0, "#7FC6E8");
g.addColorStop(1, "#5AA6D6");
x.fillStyle = g;
x.fillRect(0, 0, 128, 128);
x.strokeStyle = "rgba(255,255,255,.45)";
x.lineWidth = 2;
for (var i = 0; i < 14; i++) {
var y = R() * 128, xx = R() * 128;
x.beginPath();
x.moveTo(xx, y);
x.quadraticCurveTo(xx + 12, y - 4, xx + 26, y);
x.stroke();
}
return c;
},
function () {
var c = mdCanvas(128, 64), x = c.getContext("2d");
[[40, 38, 26], [64, 30, 30], [88, 38, 24], [64, 42, 26]].forEach(function (p) { var g = x.createRadialGradient(p[0], p[1], 0, p[0], p[1], p[2]); g.addColorStop(0, "rgba(255,248,255,.9)"); g.addColorStop(1, "rgba(255,240,255,0)"); x.fillStyle = g; x.beginPath(); x.arc(p[0], p[1], p[2], 0, Math.PI * 2); x.fill(); });
return c;
},
function () {
var c = mdCanvas(1024, 1024), x = c.getContext("2d"), C = 512;
x.clearRect(0, 0, 1024, 1024);
[[500, "#E9DDF2"], [470, "#C9A868"], [460, "#F7F0E6"], [330, "#BFD6EC"], [318, "#C9A868"]].forEach(function (r) { x.fillStyle = r[1]; x.beginPath(); x.arc(C, C, r[0], 0, Math.PI * 2); x.fill(); });
for (var k = 0; k < 16; k++) {
var a = k / 16 * Math.PI * 2, L = k % 2 ? 420 : 470, w = k % 2 ? 30 : 46;
x.fillStyle = k % 4 === 0 ? "#C9A868" : (k % 2 ? "#D9A8C4" : "#9A86C8");
x.beginPath();
x.moveTo(C, C);
x.lineTo(C + Math.cos(a - 0.5 * w / 200) * 200, C + Math.sin(a - 0.5 * w / 200) * 200);
x.lineTo(C + Math.cos(a) * L, C + Math.sin(a) * L);
x.lineTo(C + Math.cos(a + 0.5 * w / 200) * 200, C + Math.sin(a + 0.5 * w / 200) * 200);
x.closePath();
x.fill();
}
x.fillStyle = "#FFF4D6";
for (var s = 0; s < 24; s++) {
var b = s / 24 * Math.PI * 2;
x.beginPath();
x.arc(C + Math.cos(b) * 485, C + Math.sin(b) * 485, 7, 0, Math.PI * 2);
x.fill();
}
return c;
},
function () {
var c = mdCanvas(256, 256), x = c.getContext("2d"), C = 128, cols = ["#F7C6DA", "#D9C4F6", "#BFDDF6", "#FFE7AE", "#C8F0DE"];
x.fillStyle = "#2A2440";
x.beginPath();
x.arc(C, C, 127, 0, Math.PI * 2);
x.fill();
for (var r = 0; r < 3; r++)
for (var k = 0; k < 12; k++) {
var a = k / 12 * Math.PI * 2 + r * 0.26, d = 30 + r * 34;
x.fillStyle = cols[(k + r) % cols.length];
x.beginPath();
x.arc(C + Math.cos(a) * d, C + Math.sin(a) * d, 13 + r * 3, 0, Math.PI * 2);
x.fill();
}
x.fillStyle = "#FFE7AE";
x.beginPath();
x.arc(C, C, 18, 0, Math.PI * 2);
x.fill();
x.strokeStyle = "#C9A868";
x.lineWidth = 8;
x.beginPath();
x.arc(C, C, 122, 0, Math.PI * 2);
x.stroke();
return c;
},
function (lines, w, h, bg, fg, gold) {
var c = mdCanvas(w, h), x = c.getContext("2d");
x.fillStyle = bg;
x.fillRect(0, 0, w, h);
if (gold) {
x.strokeStyle = gold;
x.lineWidth = Math.max(3, h / 22);
x.strokeRect(x.lineWidth, x.lineWidth, w - 2 * x.lineWidth, h - 2 * x.lineWidth);
}
x.textAlign = "center";
x.textBaseline = "middle";
x.fillStyle = fg;
var n = lines.length;
lines.forEach(function (t, i) {
var big = i === 0, sz = big ? Math.round(h / (n > 1 ? 2.6 : 1.8)) : Math.round(h / (n + 2.2));
x.font = (big ? "700 " : "400 ") + sz + "px Georgia, serif";
while (x.measureText(t).width > w * 0.9 && sz > 10) {
sz -= 2;
x.font = (big ? "700 " : "400 ") + sz + "px Georgia, serif";
}
x.fillStyle = big ? fg : (gold || fg);
x.fillText(t, w / 2, n === 1 ? h / 2 : (big ? h * 0.4 : h * 0.4 + h * 0.22 * i + h * 0.08));
});
return mdTex(c);
},
function (a, b, seg, uvm) {
var P = [], U = [], N = [];
for (var i = 0; i < seg; i++) {
var t0 = i / seg * Math.PI * 2, t1 = (i + 1) / seg * Math.PI * 2;
var p = [[0, 0], [Math.cos(t1) * a, Math.sin(t1) * b], [Math.cos(t0) * a, Math.sin(t0) * b]];
p.forEach(function (q) { P.push(q[0], 0, q[1]); N.push(0, 1, 0); U.push(q[0] / uvm, -q[1] / uvm); });
}
return mdGeo(P, N, U);
},
function (P, N, U, a, b, c, d, ua, ub, uc, ud, want) {
var e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
var n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]], l = Math.hypot(n[0], n[1], n[2]) || 1;
n = [n[0] / l, n[1] / l, n[2] / l];
var flip = n[0] * want[0] + n[1] * want[1] + n[2] * want[2] < 0;
if (flip)
n = [-n[0], -n[1], -n[2]];
var tris = flip ? [[a, ua], [c, uc], [b, ub], [a, ua], [d, ud], [c, uc]] : [[a, ua], [b, ub], [c, uc], [a, ua], [c, uc], [d, ud]];
tris.forEach(function (t) { P.push(t[0][0], t[0][1], t[0][2]); N.push(n[0], n[1], n[2]); U.push(t[1][0], t[1][1]); });
},
function (ai, bi, ao, bo, seg, y, th) {
var top = { P: [], N: [], U: [] }, bot = { P: [], N: [], U: [] }, edge = { P: [], N: [], U: [] }, s = 0;
for (var i = 0; i < seg; i++) {
var t0 = i / seg * Math.PI * 2, t1 = (i + 1) / seg * Math.PI * 2;
var i0 = [Math.cos(t0) * ai, y, Math.sin(t0) * bi], i1 = [Math.cos(t1) * ai, y, Math.sin(t1) * bi], o0 = [Math.cos(t0) * ao, y, Math.sin(t0) * bo], o1 = [Math.cos(t1) * ao, y, Math.sin(t1) * bo];
var uv = function (p) { return [p[0] / 5, -p[2] / 5]; };
mdQuad(top.P, top.N, top.U, i0, o0, o1, i1, uv(i0), uv(o0), uv(o1), uv(i1), [0, 1, 0]);
var d = function (p) { return [p[0], p[1] - th, p[2]]; };
mdQuad(bot.P, bot.N, bot.U, d(i0), d(o0), d(o1), d(i1), uv(i0), uv(o0), uv(o1), uv(i1), [0, -1, 0]);
var ln = Math.hypot(i1[0] - i0[0], i1[2] - i0[2]);
mdQuad(edge.P, edge.N, edge.U, d(i0), d(i1), i1, i0, [s / 4, 0], [(s + ln) / 4, 0], [(s + ln) / 4, 1], [s / 4, 1], [-Math.cos(t0), 0, -Math.sin(t0)]);
s += ln;
}
return { top: mdGeo(top.P, top.N, top.U), bot: mdGeo(bot.P, bot.N, bot.U), edge: mdGeo(edge.P, edge.N, edge.U) };
},
function (ai, bi, ao, bo, seg, y, skip) {
var P = [], N = [], U = [];
for (var i = 0; i < seg; i++) {
var t0 = i / seg * Math.PI * 2, t1 = (i + 1) / seg * Math.PI * 2, tm = (t0 + t1) / 2;
if (skip && skip(Math.cos(tm) * ai, Math.sin(tm) * bi))
continue;
mdQuad(P, N, U, [Math.cos(t0) * ai, y, Math.sin(t0) * bi], [Math.cos(t0) * ao, y, Math.sin(t0) * bo], [Math.cos(t1) * ao, y, Math.sin(t1) * bo], [Math.cos(t1) * ai, y, Math.sin(t1) * bi], [0, 0], [1, 0], [1, 1], [0, 1], [0, 1, 0]);
}
return P.length ? mdGeo(P, N, U) : null;
},
function (a, b, seg, y0, y1, skip, uw, uh) {
var P = [], N = [], U = [], s = 0;
for (var i = 0; i < seg; i++) {
var t0 = i / seg * Math.PI * 2, t1 = (i + 1) / seg * Math.PI * 2;
var p0 = [Math.cos(t0) * a, 0, Math.sin(t0) * b], p1 = [Math.cos(t1) * a, 0, Math.sin(t1) * b], ln = Math.hypot(p1[0] - p0[0], p1[2] - p0[2]);
if (!(skip && skip((t0 + t1) / 2, (p0[0] + p1[0]) / 2, (p0[2] + p1[2]) / 2))) {
mdQuad(P, N, U, [p0[0], y0, p0[2]], [p1[0], y0, p1[2]], [p1[0], y1, p1[2]], [p0[0], y1, p0[2]], [s / (uw || 8), y0 / (uh || 8)], [(s + ln) / (uw || 8), y0 / (uh || 8)], [(s + ln) / (uw || 8), y1 / (uh || 8)], [s / (uw || 8), y1 / (uh || 8)], [-Math.cos(t0) / a, 0, -Math.sin(t0) / b]);
}
s += ln;
}
return P.length ? mdGeo(P, N, U) : null;
},
function (root, skip) {
root.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(root.matrixWorld).invert(), rel = new THREE.Matrix4(), nm = new THREE.Matrix3(), by = new Map();
(function walk(o) {
if (skip && skip.indexOf(o) >= 0)
return;
if (o.isMesh && !o.isInstancedMesh && !Array.isArray(o.material) && o.geometry && o.geometry.attributes.position) {
var l = by.get(o.material);
if (!l)
by.set(o.material, l = []);
l.push(o);
}
o.children.slice().forEach(walk);
})(root);
by.forEach(function (list, mat) {
if (list.length < 2)
return;
var n = 0, uvAll = list.every(function (m) { return !!m.geometry.attributes.uv; }), geos = [];
list.forEach(function (m) { var g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry; if (!g.attributes.normal)
g.computeVertexNormals(); geos.push(g); n += g.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = uvAll ? new Float32Array(n * 2) : null, o = 0, v = new THREE.Vector3();
list.forEach(function (m, k) {
var g = geos[k], P = g.attributes.position, N = g.attributes.normal, UV = g.attributes.uv;
rel.multiplyMatrices(inv, m.matrixWorld);
nm.getNormalMatrix(rel);
for (var i = 0; i < P.count; i++) {
v.fromBufferAttribute(P, i).applyMatrix4(rel);
pos[(o + i) * 3] = v.x;
pos[(o + i) * 3 + 1] = v.y;
pos[(o + i) * 3 + 2] = v.z;
v.fromBufferAttribute(N, i).applyMatrix3(nm).normalize();
nor[(o + i) * 3] = v.x;
nor[(o + i) * 3 + 1] = v.y;
nor[(o + i) * 3 + 2] = v.z;
if (uv) {
uv[(o + i) * 2] = UV.getX(i);
uv[(o + i) * 2 + 1] = UV.getY(i);
}
}
o += P.count;
if (g !== m.geometry)
g.dispose();
m.geometry.dispose();
m.parent.remove(m);
});
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
if (uv)
geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
geo.computeBoundingSphere();
var out = new THREE.Mesh(geo, mat);
out.matrixAutoUpdate = false;
out.renderOrder = list[0].renderOrder || (mat.transparent ? 2 : 0);
root.add(out);
});
},
function () {
var a = MALL.A + 4, b = MALL.B + 4, N = 4000, cum = new Float64Array(N + 1);
for (var i = 1; i <= N; i++) {
var t = i / N * Math.PI * 2, t0 = (i - 1) / N * Math.PI * 2;
cum[i] = cum[i - 1] + Math.hypot(a * (Math.cos(t) - Math.cos(t0)), b * (Math.sin(t) - Math.sin(t0)));
}
var S = cum[N], half = S / 2, END = 22, per = 7, gap = (half - 2 * END) / per, out = [];
function at(s) { s = ((s % S) + S) % S; var lo = 0, hi = N; while (hi - lo > 1) {
var m = (lo + hi) >> 1;
if (cum[m] < s)
lo = m;
else
hi = m;
} var f = (s - cum[lo]) / ((cum[hi] - cum[lo]) || 1); return (lo + f) / N * Math.PI * 2; }
function sOf(t) { t = ((t % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2); var f = t / (Math.PI * 2) * N, i = Math.floor(f); return cum[i] + (cum[Math.min(N, i + 1)] - cum[i]) * (f - i); }
for (var side = 0; side < 2; side++)
for (var k = 0; k < per; k++) {
var s = side * half + END + gap * (k + 0.5);
out.push({ s: s, t: at(s), side: side, k: k });
}
return { slots: out, S: S, at: at, sOf: sOf, gap: gap, half: half, END: END };
},
function () {
var VA = MALL.A - 12, VB = MALL.B - 12;
MD.VA = VA;
MD.VB = VB;
MD.OA = MALL.A + 4.5;
MD.OB = MALL.B + 4.5;
MD.ramps = [];
MD.lands = [];
MD.bridges = [];
MD.lifts = [];
MD.solid = [];
MD.rects = [];
[-1, 1].forEach(function (sg) {
var z0 = sg < 0 ? -46.5 : 43, z1 = sg < 0 ? -43 : 46.5, lz0 = sg < 0 ? -50.2 : 42.5, lz1 = sg < 0 ? -42.5 : 50.2;
var ax = sg < 0 ? [-38, -22] : [38, 22], bx = sg < 0 ? [16, 32] : [-16, -32];
MD.ramps.push({ xa: ax[0], xb: ax[1], z0: z0, z1: z1, h0: 0, h1: 8, sg: sg });
MD.ramps.push({ xa: bx[0], xb: bx[1], z0: z0, z1: z1, h0: 8, h1: 16, sg: sg });
var lh = function (x0, x1, h) { MD.lands.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: lz0, z1: lz1, h: h, sg: sg }); };
lh(ax[1], ax[1] + (ax[1] - ax[0]) / 16 * 6, 8);
lh(bx[0] - (bx[1] - bx[0]) / 16 * 6, bx[0], 8);
lh(bx[1], bx[1] + (bx[1] - bx[0]) / 16 * 6, 16);
});
[-60, 60].forEach(function (x) {
var ze = VB * Math.sqrt(1 - (x / VA) * (x / VA)) + 1;
[8, 16].forEach(function (h) { MD.bridges.push({ x: x, hw: 3, ze: ze, h: h }); });
MD.lifts.push({ x: x, z: 0, y: 0, to: null, v: 0, g: null });
});
},
function (lx, lz, out) {
out.length = 0;
out.push(0);
if (mdOnGallery(lx, lz)) {
out.push(8, 16);
}
for (var i = 0; i < MD.bridges.length; i++) {
var b = MD.bridges[i];
if (Math.abs(lx - b.x) <= b.hw && Math.abs(lz) <= b.ze) {
var r = Math.hypot(lx - b.x, lz);
if (r > 1.98)
out.push(b.h);
}
}
for (var j = 0; j < MD.lifts.length; j++) {
var L = MD.lifts[j], r2 = Math.hypot(lx - L.x, lz - L.z);
if (r2 < 5.2 && r2 > 1.98)
out.push(8, 16);
if (r2 < 2.08)
out.push(L.y);
}
for (var k = 0; k < MD.lands.length; k++) {
var d = MD.lands[k];
if (lx >= d.x0 && lx <= d.x1 && lz >= d.z0 && lz <= d.z1)
out.push(d.h);
}
for (var m = 0; m < MD.ramps.length; m++) {
var h = mdRampH(MD.ramps[m], lx, lz);
if (h !== null)
out.push(h);
}
return out;
},
function (lx, lz, feet) {
if (!mdInHall(lx, lz))
return true;
for (var i = 0; i < MD.solid.length; i++) {
var s = MD.solid[i];
if (feet > s.y1 || feet < s.y0 - 0.5)
continue;
if (Math.hypot(lx - s.x, lz - s.z) < s.r)
return true;
}
for (var j = 0; j < MD.rects.length; j++) {
var q = MD.rects[j];
if (feet > q.y1 || feet < q.y0 - 0.5)
continue;
if (lx > q.x0 && lx < q.x1 && lz > q.z0 && lz < q.z1)
return true;
}
for (var k = 0; k < MD.lifts.length; k++) {
var L = MD.lifts[k], dx = lx - L.x, dz = lz - L.z, r = Math.hypot(dx, dz);
if (r > 1.9 && r < 2.5 && Math.abs(dx) > 1.05)
return true;
}
var reach = feet + (typeof STEP_UP !== "undefined" ? STEP_UP : 0.62) + 0.02;
for (var m = 0; m < MD.ramps.length; m++) {
var h = mdRampH(MD.ramps[m], lx, lz);
if (h !== null && h > reach)
return true;
}
var P = camera.position, cur = mdSupport(P.x - MALL.cx, P.z - MALL.cz, feet);
if (feet - cur < 0.3 && mdSupport(lx, lz, feet) < feet - 0.8)
return true;
return false;
},
function (id, top, bottom) {
if (typeof buildFigure !== "function")
return null;
try {
var L = typeof randomLook === "function" ? randomLook("md_" + id, "human") : {};
if (top !== undefined && top !== null)
L.top = top;
if (bottom !== undefined && bottom !== null)
L.bottom = bottom;
var g = buildFigure({ id: "__md_" + id, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
g.traverse(function (m) { m.raycast = function () { }; });
return g;
}
catch (e) {
return null;
}
},
function (G) {
MD.slots = mdSlotsCalc();
mdPlan();
MD.walkers = [];
MD.idlers = [];
MD.spin = [];
MD.esc = [];
MD.water = [];
var A = MALL.A, B = MALL.B, VA = MD.VA, VB = MD.VB, FL = MD.FL, S = MD.slots;
var dyn = new THREE.Group();
G.add(dyn);
MD.dyn = dyn;
var gold = mdM(0xC9A868), cream = mdM(0xF4EEE6), white = mdM(0xFBF8F3), lilac = mdM(0xD9C8EE), bronze = mdM(0x8A6A3A);
var marbleTex = mdTex(mdMarble(), 1, 1), marble = mdT(0xFFFFFF, marbleTex);
var glassRail = mdGlass(0xB4D4EC, 0.46), hand = new THREE.MeshLambertMaterial({ color: 0xC9A060, side: THREE.DoubleSide });
var fl = new THREE.Mesh(mdDisc(MD.OA + 1, MD.OB + 1, 160, 5), marble);
fl.position.y = 0.02;
G.add(fl);
var rose = new THREE.Mesh(new THREE.CircleGeometry(26, 72), mdT(0xFFFFFF, mdTex(mdRoseTex())));
rose.material.transparent = true;
rose.rotation.x = -Math.PI / 2;
rose.position.y = 0.04;
G.add(rose);
var inl = new THREE.Mesh(mdBand(VA + 0.6, VB + 0.6, 160, 0, 0.05, null), gold);
G.add(inl);
var lineRing = new THREE.Mesh(new THREE.RingGeometry(0.985, 1, 160), gold);
lineRing.scale.set(VA - 1.5, VB - 1.5, 1);
lineRing.rotation.x = -Math.PI / 2;
lineRing.position.y = 0.045;
G.add(lineRing);
var fasc = mdT(0xFFFFFF, mdTex(mdFasciaTex(), 1, 1)), soffit = mdM(0xF1E8EE), cove = mdB(0xF6E2FF);
[1, 2, 3].forEach(function (L) {
var y = L * FL, r = mdRingSlab(VA, VB, MD.OA, MD.OB, 192, y, 0.75);
if (L < 3) {
G.add(new THREE.Mesh(r.top, marble));
}
else
G.add(new THREE.Mesh(r.top, cream));
G.add(new THREE.Mesh(r.bot, soffit));
G.add(new THREE.Mesh(r.edge, fasc));
var cv = mdBand(VA + 0.35, VB + 0.35, 192, y - 0.82, y - 0.76, null);
if (cv)
G.add(new THREE.Mesh(cv, cove));
});
var wallTex = mdTex(mdWallTex(), 1, 1), wallM = mdT(0xFFFFFF, wallTex);
for (var lv = 0; lv < 3; lv++) {
var y0 = lv * FL;
var shopAt = function (lvv) { return function (t) { var s = S.sOf(t); for (var i = 0; i < S.slots.length; i++) {
if (!mdIsShopSlot(lvv, i))
continue;
var d = Math.abs(s - S.slots[i].s);
d = Math.min(d, S.S - d);
if (d < 5.75)
return true;
} return false; }; };
var wl = mdBand(A + 4.3, B + 4.3, 480, y0, y0 + 7.25, shopAt(lv));
if (wl) {
var wm = new THREE.Mesh(wl, wallM);
wm.position.y = 0;
G.add(wm);
}
var wt = mdBand(A + 4.3, B + 4.3, 240, y0 + 7.25, y0 + FL, null);
if (wt)
G.add(new THREE.Mesh(wt, wallM));
}
var shell = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 3 * FL, 64, 1, true), new THREE.MeshLambertMaterial({ color: 0xE8DED2 }));
shell.scale.set(A + 16, 1, B + 16);
shell.position.y = 1.5 * FL;
G.add(shell);
var murals = [0, 1, 2].map(function (k) { return mdT(0xFFFFFF, mdTex(mdMuralTex(k)), true); });
var archShape = new THREE.Shape();
archShape.moveTo(-3, 0);
archShape.lineTo(3, 0);
archShape.lineTo(3, 3.6);
archShape.absarc(0, 3.6, 3, 0, Math.PI, false);
archShape.lineTo(-3, 0);
var archGeo = new THREE.ShapeGeometry(archShape, 24), au = archGeo.attributes.uv, ap = archGeo.attributes.position;
for (var q = 0; q < au.count; q++)
au.setXY(q, (ap.getX(q) + 3) / 6, ap.getY(q) / 6.6);
var sconce = mdB(0xFFF0C8), leaf = mdM(0x5E9A62), pot = mdM(0xEDE3F2), wood = mdM(0x8A5E3C), bloom = [mdM(0xF7B8D2), mdM(0xFFE08A), mdM(0xC9B6F2), mdM(0xFFFFFF)];
var muralN = 0;
for (var lv2 = 0; lv2 < 3; lv2++)
for (var gi = 0; gi < S.slots.length; gi++) {
var sa = S.slots[gi], sb = S.slots[(gi + 1) % S.slots.length];
if (sa.side !== sb.side)
continue;
var places = [(sa.s + sb.s) / 2];
places.forEach(function (sm) {
var t = S.at(sm), ex = Math.cos(t) * (A + 4.3), ez = Math.sin(t) * (B + 4.3), nx = Math.cos(t) / (A + 4.3), nz = Math.sin(t) / (B + 4.3), nl = Math.hypot(nx, nz);
nx /= nl;
nz /= nl;
var ry = Math.atan2(-nx, -nz), g = new THREE.Group();
g.position.set(ex - nx * 0.08, lv2 * FL, ez - nz * 0.08);
g.rotation.y = ry;
G.add(g);
var mu = new THREE.Mesh(archGeo, murals[(muralN++) % 3]);
mu.position.set(0, 0.5, 0.02);
g.add(mu);
var fr = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.16, 6, 24, Math.PI), gold);
fr.position.set(0, 4.1, 0.1);
g.add(fr);
mdBox(g, 0.32, 3.7, 0.3, gold, -3.1, 2.3, 0.1);
mdBox(g, 0.32, 3.7, 0.3, gold, 3.1, 2.3, 0.1);
mdBox(g, 6.6, 0.3, 0.4, gold, 0, 0.4, 0.15);
[-4.6, 4.6].forEach(function (sx) { mdBox(g, 0.12, 0.5, 0.12, bronze, sx, 5.3, 0.18); mdBall(g, 0.32, sconce, sx, 5.75, 0.32); });
mdBox(g, 2.6, 0.12, 0.7, wood, 0, 0.5, 2.6);
mdBox(g, 2.6, 0.6, 0.1, wood, 0, 0.85, 2.25);
[-1.1, 1.1].forEach(function (bx) { mdBox(g, 0.1, 0.5, 0.6, gold, bx, 0.25, 2.6); });
[-4.4, 4.4].forEach(function (px, pi) {
mdCyl(g, 0.7, 0.55, 0.8, 16, pot, px, 0.4, 1.4);
var f = mdBall(g, 0.8, leaf, px, 1.3, 1.4, 0.8);
for (var bb = 0; bb < 5; bb++)
mdBall(g, 0.18, bloom[(bb + pi + gi) % 4], px + Math.cos(bb * 1.3) * 0.55, 1.55 + Math.sin(bb * 2.1) * 0.2, 1.4 + Math.sin(bb * 1.3) * 0.55);
});
var w = function (lx, lz) { return [g.position.x + Math.cos(ry) * lx + Math.sin(ry) * lz, g.position.z - Math.sin(ry) * lx + Math.cos(ry) * lz]; };
var b1 = w(-0.7, 2.5), b2 = w(0.7, 2.5), p1 = w(-4.4, 1.4), p2 = w(4.4, 1.4);
[b1, b2].forEach(function (p) { MD.solid.push({ x: p[0], z: p[1], r: 0.85, y0: lv2 * FL, y1: lv2 * FL + 1 }); });
[p1, p2].forEach(function (p) { MD.solid.push({ x: p[0], z: p[1], r: 0.95, y0: lv2 * FL, y1: lv2 * FL + 1.5 }); });
});
}
[3, 10].forEach(function (k) {
var sl = S.slots[k], t = sl.t, ex = Math.cos(t) * (A + 4.3), ez = Math.sin(t) * (B + 4.3), nx = Math.cos(t) / (A + 4.3), nz = Math.sin(t) / (B + 4.3), nl = Math.hypot(nx, nz);
nx /= nl;
nz /= nl;
var ry = Math.atan2(-nx, -nz), g = new THREE.Group();
g.position.set(ex - nx * 0.08, 2 * FL, ez - nz * 0.08);
g.rotation.y = ry;
G.add(g);
var mu = new THREE.Mesh(archGeo, murals[(k === 3 ? 1 : 0)]);
mu.scale.set(1.6, 1.0, 1);
mu.position.set(0, 0.5, 0.02);
g.add(mu);
var fr = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.16, 6, 24, Math.PI), gold);
fr.scale.x = 1.6;
fr.position.set(0, 4.1, 0.1);
g.add(fr);
mdBox(g, 0.32, 3.7, 0.3, gold, -4.95, 2.3, 0.1);
mdBox(g, 0.32, 3.7, 0.3, gold, 4.95, 2.3, 0.1);
var sg = new THREE.Mesh(new THREE.PlaneGeometry(6, 0.9), new THREE.MeshBasicMaterial({ map: mdSignTex(["The Moonlit Terrace"], 512, 80, "#2A2440", "#FFF0C8", "#C9A868") }));
sg.position.set(0, 6.7, 0.1);
g.add(sg);
mdCyl(g, 0.05, 0.08, 1.2, 8, bronze, 0, 0.6, 3.4);
var tel = mdCyl(g, 0.12, 0.18, 1.3, 12, gold, 0, 1.35, 3.4);
tel.rotation.x = -0.9;
[-2.5, 2.5].forEach(function (bx) { mdBox(g, 2.6, 0.12, 0.7, wood, bx, 0.5, 1.6); mdBox(g, 2.6, 0.6, 0.1, wood, bx, 0.85, 1.25); });
var w = function (lx, lz) { return [g.position.x + Math.cos(ry) * lx + Math.sin(ry) * lz, g.position.z - Math.sin(ry) * lx + Math.cos(ry) * lz]; };
[w(0, 3.4), w(-2.5, 1.5), w(-3.4, 1.5), w(-1.6, 1.5), w(2.5, 1.5), w(3.4, 1.5), w(1.6, 1.5)].forEach(function (p, i) { MD.solid.push({ x: p[0], z: p[1], r: i ? 0.6 : 0.5, y0: 16, y1: 17 }); });
});
var waterTex = mdTex(mdWaterTex(), 3, 2), waterM = mdT(0xFFFFFF, waterTex, true);
MD.water.push(waterTex);
var roseWin = mdT(0xFFFFFF, mdTex(mdRoseWindowTex()), true);
for (var lv3 = 1; lv3 < 3; lv3++) {
var wg = new THREE.Group();
wg.position.set(-(A + 4.1), lv3 * FL, 0);
wg.rotation.y = Math.PI / 2;
G.add(wg);
var sheet = new THREE.Mesh(new THREE.PlaneGeometry(10, 6.4), waterM);
sheet.position.set(0, 3.5, 0.05);
wg.add(sheet);
mdBox(wg, 11, 0.5, 0.6, gold, 0, 6.9, 0.3);
mdBox(wg, 11, 0.7, 1.6, white, 0, 0.35, 0.8);
var pool = new THREE.Mesh(new THREE.PlaneGeometry(10.4, 1.2), waterM);
pool.rotation.x = -Math.PI / 2;
pool.position.set(0, 0.72, 0.8);
wg.add(pool);
MD.rects.push({ x0: -(A + 4.1), x1: -(A + 4.1) + 2, z0: -5.6, z1: 5.6, y0: lv3 * FL, y1: lv3 * FL + 1 });
var eg = new THREE.Group();
eg.position.set(A + 4.1, lv3 * FL, 0);
eg.rotation.y = -Math.PI / 2;
G.add(eg);
var rw = new THREE.Mesh(new THREE.CircleGeometry(3, 40), roseWin);
rw.position.set(0, 3.8, 0.05);
eg.add(rw);
var rr = new THREE.Mesh(new THREE.TorusGeometry(3.05, 0.22, 8, 40), gold);
rr.position.set(0, 3.8, 0.1);
eg.add(rr);
}
var wg0 = new THREE.Group();
wg0.position.set(-(A + 4.1), 0, 0);
wg0.rotation.y = Math.PI / 2;
G.add(wg0);
var sh0 = new THREE.Mesh(new THREE.PlaneGeometry(14, 6.6), waterM);
sh0.position.set(0, 3.6, 0.05);
wg0.add(sh0);
mdBox(wg0, 15, 0.5, 0.6, gold, 0, 7.0, 0.3);
var colM = mdM(0xF7F2EA), nCol = 40;
for (var c = 0; c < nCol; c++) {
var ct = (c + 0.5) / nCol * Math.PI * 2, cx = Math.cos(ct) * (VA - 1.4), cz = Math.sin(ct) * (VB - 1.4), bad = false;
MD.lands.concat(MD.ramps.map(function (r) { return { x0: Math.min(r.xa, r.xb), x1: Math.max(r.xa, r.xb), z0: r.z0, z1: r.z1 }; })).forEach(function (d) { if (cx > d.x0 - 3 && cx < d.x1 + 3 && cz > d.z0 - 3 && cz < d.z1 + 3)
bad = true; });
MD.bridges.forEach(function (b) { if (Math.abs(cx - b.x) < b.hw + 2.5)
bad = true; });
if (Math.abs(cz) < 8 && Math.abs(cx) > VA - 8)
bad = true;
if (bad)
continue;
mdCyl(G, 0.55, 0.62, 3 * FL, 16, colM, cx, 1.5 * FL, cz);
mdCyl(G, 0.95, 1.05, 0.5, 16, gold, cx, 0.25, cz);
[FL - 0.5, 2 * FL - 0.5, 3 * FL - 0.4].forEach(function (cy) { mdCyl(G, 0.85, 0.6, 0.6, 16, gold, cx, cy, cz); });
MD.solid.push({ x: cx, z: cz, r: 1.15, y0: 0, y1: 3 * FL });
}
function joined(lv, x, z) {
for (var i = 0; i < MD.lands.length; i++) {
var d = MD.lands[i];
if (d.h === lv * FL && x > d.x0 - 0.4 && x < d.x1 + 0.4 && z > d.z0 - 1 && z < d.z1 + 1)
return true;
}
for (var j = 0; j < MD.bridges.length; j++) {
var b = MD.bridges[j];
if (b.h === lv * FL && Math.abs(x - b.x) < b.hw + 0.3 && Math.abs(z) > b.ze - 3)
return true;
}
return false;
}
[1, 2].forEach(function (lv) {
var y = lv * FL, seg = 240;
var gl = mdBand(VA - 0.05, VB - 0.05, seg, y, y + 1.05, function (t, x, z) { return joined(lv, x, z); });
if (gl)
G.add(new THREE.Mesh(gl, glassRail));
var hr = mdBand(VA - 0.05, VB - 0.05, seg, y + 0.98, y + 1.12, function (t, x, z) { return joined(lv, x, z); });
if (hr)
G.add(new THREE.Mesh(hr, hand));
var ht = mdFlatRing(VA - 0.16, VB - 0.16, VA + 0.06, VB + 0.06, seg, y + 1.12, function (x, z) { return joined(lv, x, z); });
if (ht)
G.add(new THREE.Mesh(ht, hand));
var hb = mdBand(VA - 0.05, VB - 0.05, seg, y, y + 0.12, function (t, x, z) { return joined(lv, x, z); });
if (hb)
G.add(new THREE.Mesh(hb, hand));
for (var p = 0; p < seg; p += 3) {
var t = (p + 0.5) / seg * Math.PI * 2, px = Math.cos(t) * (VA - 0.05), pz = Math.sin(t) * (VB - 0.05);
if (joined(lv, px, pz))
continue;
mdBox(G, 0.08, 1.05, 0.08, hand, px, y + 0.52, pz);
}
for (var f = 0; f < 48; f++) {
var ft = (f + 0.25) / 48 * Math.PI * 2, fx = Math.cos(ft) * (VA + 0.6), fz = Math.sin(ft) * (VB + 0.6);
if (joined(lv, fx, fz))
continue;
mdBox(G, 1.2, 0.35, 0.5, pot, fx, y + 0.18, fz, Math.atan2(-Math.sin(ft) * VA, Math.cos(ft) * VB));
var vx = Math.cos(ft) * (VA - 0.25), vz = Math.sin(ft) * (VB - 0.25);
mdBall(G, 0.35, leaf, vx, y - 0.95, vz, 2.2);
mdBall(G, 0.28, leaf, vx + 0.3, y - 0.7, vz, 1.8);
mdBall(G, 0.14, bloom[f % 4], vx, y - 1.3, vz);
mdBall(G, 0.12, bloom[(f + 1) % 4], vx + 0.3, y - 0.5, vz);
}
});
var bridgeTop = marble;
MD.bridges.forEach(function (b) {
[-1, 1].forEach(function (s) {
var len = b.ze - 4.6, zc = s * (4.6 + len / 2);
var deck = mdBox(G, 2 * b.hw, 0.6, len, bridgeTop, b.x, b.h - 0.3, zc);
deck.material = bridgeTop;
mdBox(G, 2 * b.hw + 0.1, 0.12, len, gold, b.x, b.h - 0.66, zc);
mdBox(G, 2 * b.hw - 0.4, 0.06, len, cove, b.x, b.h - 0.63, zc);
var r0 = 4.3, r1 = b.ze - 1.4, rl = r1 - r0, rc = s * (r0 + r1) / 2;
[-1, 1].forEach(function (e) {
var x = b.x + e * (b.hw - 0.05);
var gp = mdBox(G, 0.04, 1.05, rl, glassRail, x, b.h + 0.52, rc);
gp.renderOrder = 2;
mdBox(G, 0.12, 0.1, rl, hand, x, b.h + 1.06, rc);
});
});
var pad = new THREE.Mesh(new THREE.RingGeometry(2.05, 5.2, 48), bridgeTop);
pad.rotation.x = -Math.PI / 2;
pad.position.set(b.x, b.h + 0.001, 0);
G.add(pad);
var pdS = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.2, 0.6, 48, 1, true), gold);
pdS.position.set(b.x, b.h - 0.3, 0);
G.add(pdS);
var pdB = new THREE.Mesh(new THREE.RingGeometry(2.05, 5.2, 48), soffit);
pdB.rotation.x = Math.PI / 2;
pdB.position.set(b.x, b.h - 0.6, 0);
G.add(pdB);
[[0.62, Math.PI - 1.24], [Math.PI + 0.62, Math.PI - 1.24]].forEach(function (r) {
var rg = new THREE.Mesh(new THREE.CylinderGeometry(5.15, 5.15, 1.05, 32, 1, true, r[0], r[1]), glassRail);
rg.position.set(b.x, b.h + 0.52, 0);
G.add(rg);
var rh = new THREE.Mesh(new THREE.CylinderGeometry(5.17, 5.17, 0.1, 32, 1, true, r[0], r[1]), hand);
rh.position.set(b.x, b.h + 1.06, 0);
G.add(rh);
});
});
MD.lifts.forEach(function (L, i) {
[0.79, 2.36, 3.93, 5.5].forEach(function (a) { mdCyl(G, 0.09, 0.09, 3 * FL + 2, 8, gold, L.x + Math.sin(a) * 2.25, 1.5 * FL + 1, L.z + Math.cos(a) * 2.25); });
mdCyl(G, 2.5, 2.5, 0.5, 24, gold, L.x, 3 * FL + 2, L.z);
var cr = mdCyl(G, 0.2, 2.3, 1.6, 24, gold, L.x, 3 * FL + 3, L.z);
mdBall(G, 0.45, sconce, L.x, 3 * FL + 4.1, L.z);
var ring0 = new THREE.Mesh(new THREE.RingGeometry(1.98, 2.6, 32), gold);
ring0.rotation.x = -Math.PI / 2;
ring0.position.set(L.x, 0.05, L.z);
G.add(ring0);
var car = new THREE.Group();
car.position.set(L.x, 0, L.z);
dyn.add(car);
L.g = car;
car.add(new THREE.Mesh(new THREE.CylinderGeometry(1.95, 1.95, 0.25, 32), gold)).position.y = -0.13;
var fl2 = new THREE.Mesh(new THREE.CircleGeometry(1.85, 32), marble);
fl2.rotation.x = -Math.PI / 2;
fl2.position.y = 0.01;
car.add(fl2);
[[0.6, Math.PI - 1.2], [Math.PI + 0.6, Math.PI - 1.2]].forEach(function (r) { var gw = new THREE.Mesh(new THREE.CylinderGeometry(1.95, 1.95, 2.7, 24, 1, true, r[0], r[1]), mdGlass(0xCFE6F4, 0.28)); gw.position.y = 1.4; car.add(gw); });
car.add(new THREE.Mesh(new THREE.CylinderGeometry(2.05, 2.05, 0.3, 32), gold)).position.y = 2.9;
var lamp = new THREE.Mesh(new THREE.CircleGeometry(1.2, 24), sconce);
lamp.rotation.x = Math.PI / 2;
lamp.position.y = 2.74;
car.add(lamp);
var rail = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.04, 6, 32), hand);
rail.rotation.x = Math.PI / 2;
rail.position.y = 1.1;
car.add(rail);
var ls = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.55), new THREE.MeshBasicMaterial({ map: mdSignTex(["Glass lift"], 256, 54, "#2A2440", "#FFF0C8", "#C9A868") }));
ls.position.set(0, 3.35, 0);
car.add(ls);
mdBack(ls);
});
var stepUp = mdStepTex(), steel = mdM(0xC8CCD2), dark = mdM(0x2E3238);
MD.ramps.forEach(function (r) {
var dx = r.xb - r.xa, run = Math.abs(dx), rise = r.h1 - r.h0, ang = Math.atan2(rise, run), L = Math.hypot(run, rise), dir = dx > 0 ? 1 : -1, zc = (r.z0 + r.z1) / 2, w = r.z1 - r.z0;
var g = new THREE.Group();
g.position.set((r.xa + r.xb) / 2, (r.h0 + r.h1) / 2, zc);
g.rotation.z = dir * ang;
G.add(g);
mdBox(g, L + 1.2, 1.0, w, steel, 0, -0.55, 0);
mdBox(g, L + 1.2, 1.1, 0.08, mdM(0xE2D8EA), 0, -0.5, w / 2 + 0.02);
mdBox(g, L + 1.2, 1.1, 0.08, mdM(0xE2D8EA), 0, -0.5, -w / 2 - 0.02);
mdBox(g, L, 0.08, 0.5, dark, 0, -0.02, 0);
[-1, 1].forEach(function (lane, li) {
var tx = mdTex(stepUp, L / 0.4, 1);
tx.repeat.set(L / 0.4, 1);
var mt = new THREE.MeshLambertMaterial({ map: tx });
var st = new THREE.Mesh(new THREE.PlaneGeometry(L, 1.25), mt);
st.rotation.x = -Math.PI / 2;
st.position.set(0, 0.01, lane * 0.95);
g.add(st);
MD.esc.push({ tex: tx, v: (li ? 1 : -1) * dir * 0.35 });
});
[-w / 2 + 0.05, -0.27, 0.27, w / 2 - 0.05].forEach(function (z) { var gp = mdBox(g, L, 0.95, 0.04, glassRail, 0, 0.5, z); gp.renderOrder = 2; mdBox(g, L + 0.6, 0.1, 0.14, dark, 0, 1.0, z); });
var foot = dir > 0 ? -L / 2 : L / 2;
mdBox(G, 1.4, 0.04, w, steel, r.xa - dir * 0.6, r.h0 + 0.02, zc);
mdBox(G, 1.4, 0.04, w, steel, r.xb + dir * 0.6, r.h1 + 0.02, zc);
var lvTo = r.h1 / FL, sg = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.6), new THREE.MeshBasicMaterial({ map: mdSignTex([["", "First floor", "Second floor"][lvTo] + "  ↑"], 256, 64, "#2A2440", "#FFF0C8", "#C9A868") }));
var pz = r.sg < 0 ? r.z0 - 0.45 : r.z1 + 0.45;
sg.position.set(r.xa - dir * 0.6, r.h0 + 2.6, pz);
sg.rotation.y = dir > 0 ? -Math.PI / 2 : Math.PI / 2;
G.add(sg);
mdBack(sg);
mdCyl(G, 0.05, 0.05, 2.6, 6, bronze, r.xa - dir * 0.6, r.h0 + 1.3, pz);
if (r.h0 > 0) {
var bedx = (r.xa + r.xb) / 2;
mdBox(G, run, 0.6, w + 0.6, pot, bedx, 0.3, zc);
for (var f = 0; f < 10; f++)
mdBall(G, 0.4, f % 3 ? leaf : bloom[f % 4], r.xa + dir * (f + 0.5) * run / 10, 0.85, zc + ((f % 2) - 0.5) * 1.2, 0.8);
}
});
MD.lands.forEach(function (d) {
var w = d.x1 - d.x0, dd = d.z1 - d.z0;
mdBox(G, w, 0.6, dd, marble, (d.x0 + d.x1) / 2, d.h - 0.3, (d.z0 + d.z1) / 2);
mdBox(G, w, 0.06, dd - 0.4, cove, (d.x0 + d.x1) / 2, d.h - 0.63, (d.z0 + d.z1) / 2);
var inner = d.sg < 0 ? d.z1 : d.z0, sg = d.sg;
var gp = mdBox(G, w, 1.05, 0.04, glassRail, (d.x0 + d.x1) / 2, d.h + 0.52, inner);
gp.renderOrder = 2;
mdBox(G, w, 0.1, 0.12, hand, (d.x0 + d.x1) / 2, d.h + 1.06, inner);
var ramp = MD.ramps.filter(function (r) {
var top = Math.abs(r.xb - d.x0) < 0.5 || Math.abs(r.xb - d.x1) < 0.5, foot = Math.abs(r.xa - d.x0) < 0.5 || Math.abs(r.xa - d.x1) < 0.5;
return (top && r.h1 === d.h) || (foot && r.h0 === d.h);
})[0];
var rampX = ramp ? ((Math.abs(ramp.xa - d.x0) < 0.5 || Math.abs(ramp.xb - d.x0) < 0.5) ? d.x0 : d.x1) : d.x0, farX = rampX === d.x0 ? d.x1 : d.x0;
var rail = function (x, za, zb) { var sp = Math.abs(zb - za); if (sp < 0.2)
return; var g3 = mdBox(G, 0.04, 1.05, sp, glassRail, x, d.h + 0.52, (za + zb) / 2); g3.renderOrder = 2; mdBox(G, 0.12, 0.1, sp, hand, x, d.h + 1.06, (za + zb) / 2); };
var edge = function (x) { return sg * VB * Math.sqrt(Math.max(0, 1 - (x / VA) * (x / VA))); };
rail(farX, inner, edge(farX));
if (ramp) {
var rin = sg < 0 ? ramp.z1 : ramp.z0, rout = sg < 0 ? ramp.z0 : ramp.z1;
rail(rampX, inner, rin);
rail(rampX, rout, edge(rampX));
}
});
var dTex = mdTex(mdGlassTex(), 14, 2), domeM = new THREE.MeshBasicMaterial({ map: dTex, transparent: true, opacity: 0.62, side: THREE.DoubleSide, depthWrite: false });
var dome = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 16, 0, Math.PI * 2, 0, Math.PI / 2), domeM);
dome.scale.set(VA, 28, VB);
dome.position.y = 3 * FL;
dome.renderOrder = 1;
G.add(dome);
for (var k = 0; k < 24; k++) {
var ph = k / 24 * Math.PI * 2, pts = [];
for (var q2 = 0; q2 <= 16; q2++) {
var ps = q2 / 16 * Math.PI / 2;
pts.push(new THREE.Vector3(Math.cos(ph) * Math.sin(ps) * VA, 3 * FL + Math.cos(ps) * 28, Math.sin(ph) * Math.sin(ps) * VB));
}
G.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, 0.22, 5, false), gold));
}
[0.35, 0.7].forEach(function (f) { var h = 28 * Math.sin(Math.acos(f)), rr = new THREE.Mesh(mdBand(VA * f, VB * f, 96, 3 * FL + h - 0.25, 3 * FL + h + 0.25, null), gold); G.add(rr); });
var corn = mdBand(VA - 0.1, VB - 0.1, 192, 3 * FL, 3 * FL + 1.2, null);
if (corn)
G.add(new THREE.Mesh(corn, gold));
mdCyl(G, 12.2, 12.6, 0.9, 64, white, 0, 0.45, 0);
mdCyl(G, 12.6, 12.6, 0.12, 64, gold, 0, 0.92, 0);
var wd = new THREE.Mesh(new THREE.CircleGeometry(11.8, 64), mdT(0xFFFFFF, waterTex));
wd.rotation.x = -Math.PI / 2;
wd.position.y = 0.8;
G.add(wd);
mdCyl(G, 1.0, 1.5, 9.5, 24, white, 0, 4.75, 0);
var falls = mdGlass(0xD8F0FF, 0.4);
[[6.2, 3.2], [4.0, 6.0], [2.2, 8.6]].forEach(function (t, i) {
mdCyl(G, t[0], t[0] * 0.35, 0.8, 40, white, 0, t[1], 0);
mdCyl(G, t[0] + 0.05, t[0] + 0.05, 0.1, 40, gold, 0, t[1] + 0.42, 0);
var wtop = new THREE.Mesh(new THREE.CircleGeometry(t[0] - 0.15, 40), mdT(0xFFFFFF, waterTex));
wtop.rotation.x = -Math.PI / 2;
wtop.position.y = t[1] + 0.38;
G.add(wtop);
var lower = i ? [3.2, 6.0][i - 1] + 0.38 : 0.8, fh = t[1] + 0.38 - lower, cas = new THREE.Mesh(new THREE.CylinderGeometry(t[0] - 0.05, t[0] + 0.35, fh, 40, 1, true), falls);
cas.position.y = lower + fh / 2;
G.add(cas);
});
var jet = new THREE.Mesh(new THREE.ConeGeometry(0.6, 3.2, 16, 1, true), mdGlass(0xE8F6FF, 0.5));
jet.position.y = 10.6;
dyn.add(jet);
MALL.jet = jet;
MD.solid.push({ x: 0, z: 0, r: 13.0, y0: 0, y1: 4 });
var crys = new THREE.Mesh(new THREE.OctahedronGeometry(1.7, 0), new THREE.MeshLambertMaterial({ color: 0xE6D2FF, emissive: 0x5A3E8A }));
crys.position.y = 16;
crys.scale.y = 1.6;
dyn.add(crys);
var orbit = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.08, 6, 48), gold);
orbit.position.y = 16;
orbit.rotation.x = 1.2;
dyn.add(orbit);
MD.spin.push({ o: crys, ry: 0.25 }, { o: orbit, rz: 0.12 });
var moon = new THREE.Shape(), R0 = 4.2, i1 = 1.397, o1 = 0.992;
moon.moveTo(Math.cos(o1) * R0, Math.sin(o1) * R0);
moon.absarc(0, 0, R0, o1, Math.PI * 2 - o1, false);
moon.absarc(1.68, 0, 3.57, Math.PI * 2 - i1, i1, true);
var mg = new THREE.ExtrudeGeometry(moon, { depth: 0.6, bevelEnabled: true, bevelThickness: 0.3, bevelSize: 0.25, bevelSegments: 3, curveSegments: 28 });
mg.translate(0, 0, -0.3);
var mo = new THREE.Mesh(mg, new THREE.MeshLambertMaterial({ color: 0xFFE9B8, emissive: 0x8A6A30 }));
mo.position.set(0, 38, 0);
dyn.add(mo);
MD.spin.push({ o: mo, ry: 0.05 });
mdCyl(dyn, 0.03, 0.03, 14, 4, bronze, 0, 46, 0);
var star = new THREE.Shape();
for (var sp = 0; sp < 10; sp++) {
var ra = sp % 2 ? 0.45 : 1.1, an = sp / 10 * Math.PI * 2 + Math.PI / 2;
if (sp)
star.lineTo(Math.cos(an) * ra, Math.sin(an) * ra);
else
star.moveTo(Math.cos(an) * ra, Math.sin(an) * ra);
}
var stg = new THREE.ExtrudeGeometry(star, { depth: 0.25, bevelEnabled: false }), stm = new THREE.MeshLambertMaterial({ color: 0xFFF2C0, emissive: 0x9A8040 }), R = mdRand(21);
for (var si = 0; si < 14; si++) {
var sa2 = si / 14 * Math.PI * 2, st2 = new THREE.Mesh(stg, stm), rad = 9 + R() * 12;
st2.position.set(Math.cos(sa2) * rad * 1.6, 27 + R() * 14, Math.sin(sa2) * rad * 0.9);
st2.scale.setScalar(0.8 + R() * 0.9);
dyn.add(st2);
MD.spin.push({ o: st2, ry: 0.3 + R() * 0.3, bob: R() * 6.28, y: st2.position.y });
}
var lanG = new THREE.SphereGeometry(0.5, 12, 9), lanCols = [0xFFD9A0, 0xF7C6DA, 0xD9C4F6, 0xBFE6F6, 0xFFF0C8], NL = 56;
var lan = new THREE.InstancedMesh(lanG, new THREE.MeshBasicMaterial({ color: 0xFFFFFF }), NL);
lan.frustumCulled = false;
MD.lan = { m: lan, p: [] };
var M4 = new THREE.Matrix4();
for (var li2 = 0; li2 < NL; li2++) {
var la = R() * Math.PI * 2, lr = 0.25 + R() * 0.6, p = { x: Math.cos(la) * VA * lr * 0.9, z: Math.sin(la) * VB * lr * 0.9, y: 12 + R() * 22, ph: R() * 6.28, s: 0.7 + R() * 0.6 };
if (Math.hypot(p.x, p.z) < 14 && p.y < 20)
p.y += 10;
MD.lan.p.push(p);
M4.makeScale(p.s, p.s * 1.25, p.s);
M4.setPosition(p.x, p.y, p.z);
lan.setMatrixAt(li2, M4);
lan.setColorAt(li2, new THREE.Color(lanCols[li2 % lanCols.length]));
}
lan.instanceMatrix.needsUpdate = true;
if (lan.instanceColor)
lan.instanceColor.needsUpdate = true;
dyn.add(lan);
var cloudM = new THREE.SpriteMaterial({ map: mdTex(mdCloudTex()), transparent: true, opacity: 0.6, depthWrite: false });
MD.clouds = [];
for (var ci = 0; ci < 9; ci++) {
var sp2 = new THREE.Sprite(cloudM), ca = ci / 9 * Math.PI * 2;
sp2.scale.set(20, 10, 1);
sp2.position.set(Math.cos(ca) * VA * 0.55, 30 + R() * 10, Math.sin(ca) * VB * 0.55);
dyn.add(sp2);
MD.clouds.push({ o: sp2, a: ca, r: 0.45 + R() * 0.2, y: sp2.position.y });
}
[[1, "The World Mall", "shops of the waking world, in the land of dreams"], [-1, "Welcome, dreamer", "the World Mall · three floors · forty shops"]].forEach(function (b) {
var tx = mdSignTex([b[1], b[2]], 1024, 220, "#2A2440", "#FFF0C8", "#C9A868"), m = new THREE.Mesh(new THREE.PlaneGeometry(20, 4.3), new THREE.MeshBasicMaterial({ map: tx }));
m.position.set(b[0] * (VA - 14), 2 * FL + 3.6, 0);
m.rotation.y = b[0] > 0 ? -Math.PI / 2 : Math.PI / 2;
G.add(m);
mdBack(m);
mdBox(G, 0.25, 0.25, 20.6, gold, b[0] * (VA - 14), 2 * FL + 5.8, 0);
mdBox(G, 0.25, 0.25, 20.6, gold, b[0] * (VA - 14), 2 * FL + 1.4, 0);
[-9.6, 9.6].forEach(function (z) { mdCyl(G, 0.03, 0.03, FL + 4 - 5.8, 4, bronze, b[0] * (VA - 14), (2 * FL + 5.8 + 3 * FL + 4) / 2, z); });
});
var trunk = mdM(0x6A4A3A), canopy = [mdM(0xF6B8D0), mdM(0xFFF0F6), mdM(0xD8B8F0), mdM(0xF9D0E6)], R2 = mdRand(77);
[[-34, -14], [-34, 14], [34, -14], [34, 14], [-82, -30], [-82, 30], [82, -30], [82, 30], [-20, -34], [20, -34]].forEach(function (p, i) {
mdCyl(G, 3.2, 3.4, 0.8, 24, white, p[0], 0.4, p[1]);
mdCyl(G, 3.25, 3.25, 0.1, 24, gold, p[0], 0.82, p[1]);
var soil = new THREE.Mesh(new THREE.CircleGeometry(3.0, 24), mdM(0x6E9A5A));
soil.rotation.x = -Math.PI / 2;
soil.position.set(p[0], 0.84, p[1]);
G.add(soil);
mdCyl(G, 0.3, 0.45, 4.2, 8, trunk, p[0], 2.9, p[1]);
for (var c2 = 0; c2 < 6; c2++) {
var a = c2 / 6 * Math.PI * 2 + R2(), d = c2 ? 1.6 : 0;
mdBall(G, 1.6 + R2() * 0.6, canopy[(c2 + i) % 4], p[0] + Math.cos(a) * d, 5.6 + R2() * 1.2 + (c2 ? 0 : 0.9), p[1] + Math.sin(a) * d, 0.75);
}
for (var f2 = 0; f2 < 10; f2++) {
var fa = f2 / 10 * Math.PI * 2;
mdBall(G, 0.28, bloom[f2 % 4], p[0] + Math.cos(fa) * 2.4, 1.0, p[1] + Math.sin(fa) * 2.4);
}
MD.solid.push({ x: p[0], z: p[1], r: 3.7, y0: 0, y1: 7 });
});
var dx0 = -74, staffTop = 0x5A3E7A, staffBot = 0x23202E;
var desk = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 1.1, 40, 1, true, Math.PI * 0.2, Math.PI * 1.6), white);
desk.position.set(dx0, 0.55, 0);
desk.rotation.y = Math.PI / 2;
G.add(desk);
var dtop = new THREE.Mesh(new THREE.RingGeometry(2.4, 3.15, 40, 1, Math.PI * 0.2, Math.PI * 1.6), gold);
dtop.rotation.x = -Math.PI / 2;
dtop.position.set(dx0, 1.12, 0);
G.add(dtop);
[[-0.8, 0.9], [0.8, 0.9]].forEach(function (s) { mdBox(G, 0.6, 0.4, 0.05, dark, dx0 - 2.3, 1.42, s[0], Math.PI / 2); mdBox(G, 0.52, 0.32, 0.02, mdB(0x9FD0F0), dx0 - 2.27, 1.42, s[0], Math.PI / 2); });
var infoM = new THREE.MeshBasicMaterial({ map: mdSignTex(["Information", "ask us anything"], 512, 112, "#2A2440", "#FFF0C8", "#C9A868") });
[-1, 1].forEach(function (f) { var info = new THREE.Mesh(new THREE.PlaneGeometry(5, 1.1), infoM); info.position.set(dx0 + f * 0.02, 4.6, 0); info.rotation.y = f * Math.PI / 2; G.add(info); });
[-2.3, 2.3].forEach(function (z) { mdCyl(G, 0.03, 0.03, FL * 3, 4, bronze, dx0, 4.6 + FL * 1.5, z); });
MD.solid.push({ x: dx0, z: 0, r: 3.5, y0: 0, y1: 2 });
mdStaff(dyn, "info1", staffTop, staffBot, dx0 - 1.5, 0, -0.9, -Math.PI / 2, 0.5);
mdStaff(dyn, "info2", staffTop, staffBot, dx0 - 1.5, 0, 0.9, -Math.PI / 2, 0.5);
MD.dirC = mdCanvas(768, 1024);
MD.dirTex = mdTex(MD.dirC);
var dirM = new THREE.MeshBasicMaterial({ map: MD.dirTex });
[[dx0, -7, Math.PI / 2, 0], [dx0, 7, Math.PI / 2, 0], [VA - 10, -9, -Math.PI / 2, 0], [VA - 10, 9, -Math.PI / 2, 0], [0, -(VB + 5.5), 0, 1], [0, VB + 5.5, Math.PI, 1], [0, -(VB + 5.5), 0, 2], [0, VB + 5.5, Math.PI, 2]].forEach(function (b) {
var g = new THREE.Group();
g.position.set(b[0], b[3] * FL, b[1]);
g.rotation.y = b[2];
G.add(g);
mdBox(g, 2.2, 3.2, 0.3, gold, 0, 1.9, 0);
var face = new THREE.Mesh(new THREE.PlaneGeometry(1.95, 2.6), dirM);
face.position.set(0, 2.0, 0.16);
g.add(face);
var back = new THREE.Mesh(new THREE.PlaneGeometry(1.95, 2.6), dirM);
back.position.set(0, 2.0, -0.16);
back.rotation.y = Math.PI;
g.add(back);
mdBox(g, 1.2, 0.3, 0.6, gold, 0, 0.15, 0);
MD.solid.push({ x: b[0], z: b[1], r: 1.2, y0: b[3] * FL, y1: b[3] * FL + 3 });
});
mdDirectory();
var cz0 = 26;
mdBox(G, 12, 1.1, 1.0, white, 0, 0.55, cz0 + 6);
mdBox(G, 12.2, 0.08, 1.2, gold, 0, 1.14, cz0 + 6);
mdBox(G, 12, 2.2, 0.6, wood, 0, 1.1, cz0 + 8.6);
for (var sh = 0; sh < 3; sh++)
mdBox(G, 11.6, 0.06, 0.5, gold, 0, 0.9 + sh * 0.6, cz0 + 8.4);
for (var cu = 0; cu < 14; cu++)
mdCyl(G, 0.09, 0.07, 0.16, 8, [white, mdM(0xF7C6DA), mdM(0xBFDDF6)][cu % 3], -5 + cu * 0.75, 1.0 + (cu % 3) * 0.6 + 0.08, cz0 + 8.35);
mdBox(G, 1.2, 0.7, 0.6, steel, -3, 1.53, cz0 + 6);
mdBox(G, 1.0, 0.12, 0.4, dark, -3, 1.35, cz0 + 5.75);
var case1 = mdBox(G, 2.6, 0.8, 0.8, mdGlass(0xE6F4FA, 0.35), 2.5, 1.58, cz0 + 6);
case1.renderOrder = 2;
for (var pk = 0; pk < 8; pk++)
mdCyl(G, 0.14, 0.16, 0.14, 10, [mdM(0xF7B8D2), mdM(0xFFE08A), mdM(0x8A5E3C), white][pk % 4], 1.6 + pk * 0.26, 1.3, cz0 + 6);
var menu = new THREE.Mesh(new THREE.PlaneGeometry(6, 1.6), new THREE.MeshBasicMaterial({ map: mdSignTex(["The Cloud Café", "cloud tea · moon cakes · stardust cocoa"], 768, 200, "#3A2A4A", "#FFF0C8", "#C9A868") }));
menu.position.set(0, 3.4, cz0 + 8.95);
menu.rotation.y = Math.PI;
G.add(menu);
mdBack(menu);
MD.rects.push({ x0: -6.5, x1: 6.5, z0: cz0 + 5.3, z1: cz0 + 9.2, y0: 0, y1: 3 });
mdStaff(dyn, "barista", 0xF4EEE6, 0x3A2A20, -3, 0, cz0 + 7.3, Math.PI, 0.9);
mdStaff(dyn, "cashier", 0xF4EEE6, 0x3A2A20, 2.2, 0, cz0 + 7.3, Math.PI, 0.6);
var parasol = [mdM(0xF7C6DA), mdM(0xD9C4F6), mdM(0xBFDDF6), mdM(0xFFE7AE)], seated = 0;
[[-7, -2], [0, -3], [7, -2], [-7, -8], [7, -8], [0, -9]].forEach(function (p, i) {
var tx2 = p[0], tz = cz0 + p[1];
mdCyl(G, 0.75, 0.75, 0.06, 20, white, tx2, 0.76, tz);
mdCyl(G, 0.06, 0.08, 0.75, 8, gold, tx2, 0.38, tz);
mdCyl(G, 0.4, 0.4, 0.04, 16, gold, tx2, 0.02, tz);
mdCyl(G, 0.04, 0.04, 2.6, 6, gold, tx2, 1.6, tz);
var um = new THREE.Mesh(new THREE.ConeGeometry(1.7, 0.6, 16, 1, true), parasol[i % 4]);
um.position.set(tx2, 2.9, tz);
um.material.side = THREE.DoubleSide;
G.add(um);
[0, Math.PI * 0.66, Math.PI * 1.33].forEach(function (a, j) {
var chx = tx2 + Math.sin(a) * 1.15, chz = tz + Math.cos(a) * 1.15;
mdBox(G, 0.5, 0.06, 0.5, wood, chx, 0.46, chz, a);
mdBox(G, 0.5, 0.5, 0.06, wood, chx + Math.sin(a) * 0.24, 0.72, chz + Math.cos(a) * 0.24, a);
if ((i * 3 + j) % 4 === 0 && seated < 5) {
seated++;
mdSeat(dyn, "cafe" + i + "_" + j, chx, 0.5, chz, a + Math.PI);
}
MD.solid.push({ x: chx, z: chz, r: 0.4, y0: 0, y1: 1 });
});
MD.solid.push({ x: tx2, z: tz, r: 0.85, y0: 0, y1: 1 });
if (i === 1) {
mdCyl(G, 0.05, 0.06, 0.2, 8, white, tx2 + 0.2, 0.88, tz);
mdCyl(G, 0.05, 0.06, 0.2, 8, white, tx2 - 0.3, 0.88, tz + 0.1);
}
});
var kinds = [["Moonbeam Sweets", 0xF7B8D2], ["Dream Teas", 0xBFE6C6], ["Star Charts", 0xBFDDF6], ["Cloud Floss", 0xF9D9F0], ["Lantern Gifts", 0xFFE7AE], ["Pearl & Shell", 0xE6E0F6], ["Sky Kites", 0xC8E8F8], ["Wish Candles", 0xFBD8B8]];
var kpos = [[-34, -28, 0], [34, 28, 0], [-48, 22, 0], [48, -22, 0]];
[Math.PI * 0.2, Math.PI * 0.8, Math.PI * 1.2, Math.PI * 1.8].forEach(function (t, i) { kpos.push([Math.cos(t) * (VA + 4), Math.sin(t) * (VB + 4), i < 2 ? 1 : 2, t]); });
kpos.forEach(function (p, i) {
var k = kinds[i], g = new THREE.Group(), y = p[2] * FL;
g.position.set(p[0], y, p[1]);
var face = p[3] !== undefined ? Math.atan2(Math.cos(p[3]) / VA, Math.sin(p[3]) / VB) : Math.atan2(-p[0], -p[1]);
g.rotation.y = face;
G.add(g);
var col = mdM(k[1]);
mdBox(g, 2.6, 1.0, 1.3, col, 0, 0.6, 0);
mdBox(g, 2.8, 0.08, 1.5, gold, 0, 1.12, 0);
[-1, 1].forEach(function (s) { var wh = mdCyl(g, 0.25, 0.25, 0.12, 14, dark, s * 1.0, 0.25, 0.68); wh.rotation.x = Math.PI / 2; });
[[-1.3, -0.7], [1.3, -0.7], [-1.3, 0.7], [1.3, 0.7]].forEach(function (q) { mdCyl(g, 0.04, 0.04, 1.4, 6, gold, q[0], 1.8, q[1]); });
for (var st = 0; st < 6; st++) {
var cb = mdBox(g, 0.48, 0.08, 1.7, st % 2 ? white : col, -1.2 + st * 0.48, 2.6, 0, 0, 0, 0.12);
}
for (var gd = 0; gd < 7; gd++)
mdBall(g, 0.13, [mdM(0xF7B8D2), mdM(0xFFE08A), mdM(0xC9B6F2), white][gd % 4], -1.0 + gd * 0.33, 1.28, 0.3);
var ks = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.5), new THREE.MeshBasicMaterial({ map: mdSignTex([k[0]], 384, 72, "#2A2440", "#FFF0C8", "#C9A868") }));
ks.position.set(0, 2.95, 0.78);
g.add(ks);
mdBack(ks);
mdStaff(dyn, "kiosk" + i, k[1], 0x2A2440, p[0] - Math.sin(face) * 1.05, y, p[1] - Math.cos(face) * 1.05, face, 0.7);
MD.solid.push({ x: p[0], z: p[1], r: 1.9, y0: y, y1: y + 3 });
});
var cart = new THREE.Group();
mdBox(cart, 0.6, 0.7, 0.9, mdM(0xE8E0F0), 0, 0.45, 0);
mdBox(cart, 0.5, 0.1, 0.5, mdM(0x6A8ABF), 0, 0.85, 0.1);
mdCyl(cart, 0.02, 0.02, 1.2, 4, bronze, 0.2, 1.2, -0.3);
cart.position.set(0.3, 0, 0.9);
mdWalker(dyn, "clean1", 0x2E7A78, 0x23272F, 80, 40, 0, 0.3, 0.7, cart);
mdWalker(dyn, "clean2", 0x2E7A78, 0x23272F, 108, 60, FL, 2.4, -0.6, cart.clone());
mdWalker(dyn, "guard1", 0x3A1E24, 0x1A1C22, 107, 59, 2 * FL, 4.0, 0.9);
mdWalker(dyn, "guard2", 0x3A1E24, 0x1A1C22, 84, 42, 0, 3.5, -1.0);
var shoppers = [[86, 44, 0, 0.1, 1.1], [86, 44, 0, 3.3, 1.0], [66, 38, 0, 1.6, -1.1], [66, 38, 0, 4.7, -1.0], [107, 59, FL, 1.1, 1.05], [107, 59, FL, 4.4, -1.1], [110, 62, FL, 2.8, 0.95], [107, 59, 2 * FL, 0.6, -1.0], [110, 62, 2 * FL, 3.0, 1.1], [109, 61, 2 * FL, 5.2, 1.0]];
shoppers.forEach(function (s, i) { mdWalker(dyn, "shopper" + i, null, null, s[0], s[1], s[2], s[3], s[4]); });
mdSeat(dyn, "bench1", -34, 0.5, -19, 0);
mdSeat(dyn, "bench2", 34, 0.5, 19, Math.PI);
[[-34, -19.6, 0], [34, 19.6, Math.PI]].forEach(function (b) { var gb = new THREE.Group(); gb.position.set(b[0], 0, b[1]); gb.rotation.y = b[2]; G.add(gb); mdBox(gb, 2.6, 0.12, 0.7, wood, 0, 0.5, 0); mdBox(gb, 2.6, 0.6, 0.1, wood, 0, 0.85, -0.35); MD.solid.push({ x: b[0], z: b[1], r: 1.3, y0: 0, y1: 1 }); });
mdStaff(dyn, "guard3", 0x3A1E24, 0x1A1C22, -86, 0, 7, Math.PI / 2, 0.2);
var hl = new THREE.HemisphereLight(0xFFF2F8, 0xD8C8D8, 0.62);
hl.position.set(0, 40, 0);
G.add(hl);
mdBake(G, [dyn]);
},
function () {
if (!MD.dirC)
return;
var x = MD.dirC.getContext("2d"), W = 768, H = 1024;
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#2A2440");
g.addColorStop(1, "#3A2A4A");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C9A868";
x.lineWidth = 8;
x.strokeRect(8, 8, W - 16, H - 16);
x.fillStyle = "#FFF0C8";
x.textAlign = "center";
x.font = "700 44px Georgia, serif";
x.fillText("The World Mall", W / 2, 66);
x.font = "400 22px Georgia, serif";
x.fillStyle = "#C9A868";
x.fillText("directory · you can find every shop here", W / 2, 100);
var col = function (cx, top, title, from, to, skip) {
x.textAlign = "left";
x.fillStyle = "#F7C6DA";
x.font = "700 26px Georgia, serif";
x.fillText(title, cx, top);
var y = top + 34;
x.font = "400 19px Georgia, serif";
for (var n = from; n <= to; n++) {
var st = typeof mallStoreAt === "function" ? mallStoreAt(n) : null;
x.fillStyle = st ? "#FFF0C8" : "#9A90A8";
var nm = st ? String(st.name) : "to let";
while (x.measureText(nm).width > 290 && nm.length > 4)
nm = nm.slice(0, -2);
x.fillText(n + "  " + nm, cx, y);
y += 27;
}
return y;
};
col(40, 150, "Ground floor", 1, 14);
var y1 = col(40, 580, "First floor", 15, 28);
var y2 = col(404, 150, "Second floor", 29, 40);
x.textAlign = "left";
x.fillStyle = "#F7C6DA";
x.font = "700 26px Georgia, serif";
x.fillText("Also here", 404, y2 + 30);
x.font = "400 19px Georgia, serif";
x.fillStyle = "#FFF0C8";
["The Underground · west end", "The Grand Arcade · east end", "Information · by the Underground", "The Cloud Café · by the fountain", "Glass lifts · on the bridges", "The Moonlit Terraces · 2nd floor"].forEach(function (t, i) { x.fillText(t, 404, y2 + 64 + i * 27); });
if (MD.dirTex)
MD.dirTex.needsUpdate = true;
},
function (dt) {
if (!MALL.g || !MALL.g.visible)
return;
MD.t += dt;
var t = MD.t;
MD.esc.forEach(function (e) { e.tex.offset.x = (e.tex.offset.x + e.v * dt) % 1; });
MD.water.forEach(function (w) { w.offset.y = (w.offset.y - dt * 0.12) % 1; });
MD.spin.forEach(function (s) { if (s.ry)
s.o.rotation.y += s.ry * dt; if (s.rz)
s.o.rotation.z += s.rz * dt; if (s.bob !== undefined)
s.o.position.y = s.y + Math.sin(t * 0.5 + s.bob) * 0.6; });
if (MD.lan) {
var L = MD.lan;
if (((t * 10) | 0) % 2 === 0) {
L.p.forEach(function (p, i) { var s = p.s; MD_M4.makeScale(s, s * 1.25, s); MD_M4.setPosition(p.x + Math.sin(t * 0.1 + p.ph) * 1.5, p.y + Math.sin(t * 0.35 + p.ph) * 0.8, p.z + Math.cos(t * 0.1 + p.ph) * 1.5); L.m.setMatrixAt(i, MD_M4); });
L.m.instanceMatrix.needsUpdate = true;
}
}
(MD.clouds || []).forEach(function (c) { c.a += dt * 0.008; c.o.position.set(Math.cos(c.a) * MD.VA * c.r, c.y, Math.sin(c.a) * MD.VB * c.r); });
MD.walkers.forEach(function (w) {
w.ph += w.v * dt / Math.max(20, (w.a + w.b) / 2);
var x = Math.cos(w.ph) * w.a, z = Math.sin(w.ph) * w.b, s = w.v > 0 ? 1 : -1;
w.g.position.set(x, w.y, z);
w.g.rotation.y = Math.atan2(-Math.sin(w.ph) * w.a * s, Math.cos(w.ph) * w.b * s);
var lm = w.g.userData.limbs, sw = Math.sin(t * 5.2 + w.ph * 30) * 0.45;
if (lm) {
if (lm.ll)
lm.ll.rotation.x = sw;
if (lm.rl)
lm.rl.rotation.x = -sw;
if (lm.la)
lm.la.rotation.x = -sw * 0.6;
if (lm.ra)
lm.ra.rotation.x = sw * 0.6;
}
});
MD.idlers.forEach(function (d) {
var lm = d.g.userData.limbs;
d.g.rotation.y = d.face + Math.sin(t * 0.4 + d.ph) * 0.25;
if (lm) {
if (lm.la)
lm.la.rotation.x = -0.5 - Math.sin(t * 1.6 * d.busy + d.ph) * 0.35 * d.busy;
if (lm.ra)
lm.ra.rotation.x = -0.5 - Math.sin(t * 1.6 * d.busy + d.ph + 1.4) * 0.35 * d.busy;
}
});
mdLiftTick(dt);
var feet = camera.position.y - 1.72, lv = mdLevel(feet);
if (!MD.ride && walkMode && Math.abs(feet - lv * MD.FL) < 0.08 && lv !== MD.lvl) {
MD.lvl = lv;
setStatus("<b>The World Mall</b> · " + MD_LV[lv].toLowerCase() + ": shops " + ["1 to 14", "15 to 28", "29 to 40"][lv] + ". Escalators and the glass lifts on the bridges go up and down.");
}
},
function (L) {
var el = mallEl();
MALL.open = true;
if (document.exitPointerLock)
document.exitPointerLock();
var here = mdLevel(camera.position.y - 1.72);
el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:16px">Glass lift</b><button class="btn" id="mall-x">Close</button></div>' +
'<p style="color:var(--dim);line-height:1.6;margin:8px 0">Which floor? You are on ' + MD_LV[here].toLowerCase() + '.</p><div style="display:flex;gap:8px;flex-wrap:wrap">' +
[0, 1, 2].map(function (n) { return '<button class="btn" data-lv="' + n + '"' + (n === here ? ' disabled style="opacity:.5"' : '') + '>' + MD_LV[n].replace(/^The /, "") + (n ? ' · shops ' + (n === 1 ? '15-28' : '29-40') : ' · shops 1-14') + '</button>'; }).join("") + '</div>';
el.style.display = "block";
document.getElementById("mall-x").onclick = mallClose;
Array.prototype.forEach.call(el.querySelectorAll("[data-lv]"), function (b) { b.onclick = function () { mallClose(); mdLiftGo(L, +b.getAttribute("data-lv")); }; });
},
function (dt) {
var R = MD.ride;
MD.lifts.forEach(function (L) { if (L.g)
L.g.position.y = L.y; });
if (!R)
return;
var L = R.L, P = camera.position;
if (R.stage === 0) {
var want = R.from * MD.FL, d = want - L.y, st = Math.sign(d) * Math.min(Math.abs(d), 4 * dt);
L.y += st;
if (Math.abs(want - L.y) < 0.01) {
L.y = want;
R.stage = 1;
R.t = 0;
R.sx = P.x;
R.sz = P.z;
}
}
else if (R.stage === 1) {
if (!R.t) {
R.sx = P.x;
R.sz = P.z;
}
R.t += dt / 0.8;
var k = Math.min(1, R.t), e = k * k * (3 - 2 * k);
P.x = R.sx + (MALL.cx + L.x - R.sx) * e;
P.z = R.sz + (MALL.cz + L.z - R.sz) * e;
if (k >= 1) {
R.stage = 2;
R.t = 0;
R.y0 = L.y;
setStatus("Going to " + MD_LV[R.to].toLowerCase() + "…");
}
}
else if (R.stage === 2) {
var tot = Math.abs(R.to * MD.FL - R.y0) / 2.6;
R.t += dt / Math.max(0.5, tot);
var k2 = Math.min(1, R.t), e2 = k2 * k2 * (3 - 2 * k2);
L.y = R.y0 + (R.to * MD.FL - R.y0) * e2;
if (k2 >= 1) {
L.y = R.to * MD.FL;
MD.ride = null;
MD.lvl = -1;
}
}
if (L.g)
L.g.position.y = L.y;
},
function (u, st) {
var have = MD.keepers[u.i];
if (!st) {
if (have) {
if (have.parent)
have.parent.remove(have);
MD.idlers = MD.idlers.filter(function (d) { return d.g !== have; });
delete MD.keepers[u.i];
}
return;
}
if (have && have.userData.mdFor === st.name)
return;
if (have) {
if (have.parent)
have.parent.remove(have);
MD.idlers = MD.idlers.filter(function (d) { return d.g !== have; });
}
var lx = u.ex + u.nx * 8.3, lz = u.ez + u.nz * 8.3;
var g = mdStaff(MD.dyn, "unit" + u.i + String(st.name).replace(/[^A-Za-z]/g, "").slice(0, 12), st.color || 0x2A2440, 0x23202E, lx, u.y, lz, u.ry, 0.6);
if (g) {
g.userData.mdFor = st.name;
MD.keepers[u.i] = g;
}
},
function (g) {
var skip = [g.userData.sign].concat(g.userData.frames || []);
g.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(g.matrixWorld).invert(), rel = new THREE.Matrix4(), nm = new THREE.Matrix3(), list = [];
g.children.slice().forEach(function (m) {
if (skip.indexOf(m) >= 0 || !m.isMesh)
return;
var mt = m.material;
if (mt && mt.isMeshLambertMaterial && !mt.map && !mt.transparent && mt.side === THREE.FrontSide)
list.push(m);
});
if (list.length < 2)
return;
var n = 0, geos = list.map(function (m) { var q = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry; n += q.attributes.position.count; return q; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), col = new Float32Array(n * 3), o = 0, v = new THREE.Vector3();
list.forEach(function (m, k) {
var q = geos[k], P = q.attributes.position, N = q.attributes.normal, c = m.material.color;
rel.multiplyMatrices(inv, m.matrixWorld);
nm.getNormalMatrix(rel);
for (var i = 0; i < P.count; i++) {
v.fromBufferAttribute(P, i).applyMatrix4(rel);
pos.set([v.x, v.y, v.z], (o + i) * 3);
v.fromBufferAttribute(N, i).applyMatrix3(nm).normalize();
nor.set([v.x, v.y, v.z], (o + i) * 3);
col.set([c.r, c.g, c.b], (o + i) * 3);
}
o += P.count;
if (q !== m.geometry)
q.dispose();
m.geometry.dispose();
m.material.dispose();
g.remove(m);
});
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
geo.computeBoundingSphere();
var out = new THREE.Mesh(geo, MD.vc || (MD.vc = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, vertexColors: true })));
out.userData.mdBaked = true;
g.add(out);
},
function (g) {
if (!MD.hoardM) {
var c = mdCanvas(512, 256), x = c.getContext("2d"), gr = x.createLinearGradient(0, 0, 0, 256);
gr.addColorStop(0, "#3A2E66");
gr.addColorStop(0.65, "#8A6AB0");
gr.addColorStop(1, "#F2B8CE");
x.fillStyle = gr;
x.fillRect(0, 0, 512, 256);
var R = mdRand(9);
for (var i = 0; i < 60; i++) {
x.fillStyle = "rgba(255,248,230," + (0.4 + R() * 0.6) + ")";
x.beginPath();
x.arc(R() * 512, R() * 150, R() * 1.6 + 0.5, 0, Math.PI * 2);
x.fill();
}
x.fillStyle = "rgba(255,240,250,.8)";
[[90, 210, 40], [130, 200, 50], [170, 214, 36], [360, 214, 40], [410, 204, 52], [450, 216, 34]].forEach(function (p) { x.beginPath(); x.arc(p[0], p[1], p[2], 0, Math.PI * 2); x.fill(); });
x.textAlign = "center";
x.fillStyle = "#FFF0C8";
x.font = "700 40px Georgia, serif";
x.fillText("Coming soon", 256, 92);
x.font = "400 22px Georgia, serif";
x.fillStyle = "#F7E2EE";
x.fillText("a shop of the waking world is on its way", 256, 132);
x.strokeStyle = "#C9A868";
x.lineWidth = 6;
x.strokeRect(3, 3, 506, 250);
MD.hoardM = new THREE.MeshBasicMaterial({ map: mdTex(c) });
MD.hoardG = new THREE.PlaneGeometry(3.4, 3.6);
}
[-3, 3].forEach(function (cx) { var m = new THREE.Mesh(MD.hoardG, MD.hoardM); m.position.set(cx, 2.15, -0.25); m.userData.mdShared = true; g.add(m); });
}
];
});
