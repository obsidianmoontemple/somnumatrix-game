/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(504, function () {
"use strict";
return [
function (kind) {
if (PBK.tex[kind])
return PBK.tex[kind];
if (typeof document === "undefined")
return null;
var N = pbkLite() ? 256 : 512, c = document.createElement("canvas");
c.width = c.height = N;
var x = c.getContext("2d");
if (!x)
return null;
var bw = N / 4, fh = N / 4, s = N / 512, seed = kind === "ruin" ? 7 : kind === "office" ? 3 : 1;
function rnd() { seed = (seed * 16807) % 2147483647; return (seed & 0xffff) / 65536; }
function rgb(v, a) { v = Math.max(0, Math.min(255, v | 0)); return "rgba(" + v + "," + v + "," + v + "," + (a === undefined ? 1 : a) + ")"; }
x.fillStyle = rgb(kind === "office" ? 226 : 232);
x.fillRect(0, 0, N, N);
for (var i = 0; i < N * N / (kind === "ruin" ? 40 : 70); i++) {
var v = rnd();
x.fillStyle = v < 0.5 ? rgb(150, 0.08) : rgb(255, 0.09);
x.fillRect(rnd() * N, rnd() * N, (1 + rnd() * 3) * s, (1 + rnd() * 3) * s);
}
for (var b = 0; b < 20; b++) {
x.fillStyle = rgb(rnd() < 0.5 ? 200 : 245, 0.10);
x.beginPath();
x.ellipse(rnd() * N, rnd() * N, (20 + rnd() * 60) * s, (10 + rnd() * 40) * s, 0, 0, Math.PI * 2);
x.fill();
}
if (kind !== "office") {
x.strokeStyle = rgb(160, 0.18);
x.lineWidth = 1 * s;
for (var y = 0; y < N; y += fh / 6) {
x.beginPath();
x.moveTo(0, y + 0.5);
x.lineTo(N, y + 0.5);
x.stroke();
}
}
for (var fl = 0; fl < 4; fl++) {
var y0 = fl * fh;
x.fillStyle = rgb(kind === "office" ? 120 : 246);
x.fillRect(0, y0 + fh - 7 * s, N, (kind === "office" ? 7 : 5) * s);
x.fillStyle = rgb(70, 0.35);
x.fillRect(0, y0 + fh - 2 * s, N, 2 * s);
if (kind === "office") {
var gy = y0 + fh * 0.12, gh = fh * 0.62, g = x.createLinearGradient(0, gy, 0, gy + gh);
g.addColorStop(0, "#9DB2C4");
g.addColorStop(0.45, "#4C5E70");
g.addColorStop(1, "#1E2832");
x.fillStyle = g;
x.fillRect(0, gy, N, gh);
for (var k = 0; k < N / (bw / 2); k++) {
var r = rnd();
if (r < 0.25) {
x.fillStyle = "rgba(240,226,190,0.30)";
x.fillRect(k * bw / 2 + 3 * s, gy + gh * 0.15, bw / 2 - 6 * s, gh * 0.8);
}
else if (r < 0.45) {
x.fillStyle = "rgba(20,24,30,0.35)";
x.fillRect(k * bw / 2, gy, bw / 2, gh);
}
}
x.fillStyle = "rgba(255,255,255,0.10)";
x.beginPath();
x.moveTo(0, gy + gh);
x.lineTo(N * 0.3, gy);
x.lineTo(N * 0.45, gy);
x.lineTo(N * 0.15, gy + gh);
x.fill();
x.fillStyle = rgb(90);
for (var m = 0; m <= N / (bw / 2); m++)
x.fillRect(m * bw / 2 - 2 * s, gy, 4 * s, gh);
x.fillRect(0, gy - 2 * s, N, 4 * s);
x.fillRect(0, gy + gh - 2 * s, N, 4 * s);
continue;
}
for (var bay = 0; bay < 4; bay++) {
var cx = bay * bw + bw / 2, ww = bw * 0.42, wh = fh * 0.56, wx = cx - ww / 2, wy = y0 + fh * 0.16, r2 = rnd();
if (kind === "ruin" && r2 < 0.12) {
x.fillStyle = rgb(26);
x.beginPath();
x.moveTo(wx - 10 * s, wy + wh + 12 * s);
for (var p = 0; p < 9; p++) {
var a = p / 8 * Math.PI;
x.lineTo(cx - Math.cos(a) * (ww * 0.75 + rnd() * 14 * s), wy + wh * 0.6 - Math.sin(a) * (wh * 0.75 + rnd() * 14 * s));
}
x.closePath();
x.fill();
continue;
}
x.fillStyle = rgb(250);
x.fillRect(wx - 5 * s, wy - 7 * s, ww + 10 * s, 6 * s);
x.fillRect(wx - 6 * s, wy + wh, ww + 12 * s, 6 * s);
x.fillStyle = rgb(60, 0.4);
x.fillRect(wx - 6 * s, wy + wh + 6 * s, ww + 12 * s, 2 * s);
x.fillStyle = rgb(110);
x.fillRect(wx, wy, ww, wh);
var ix = wx + 3 * s, iy = wy + 3 * s, iw = ww - 6 * s, ih = wh - 5 * s;
if (kind === "ruin" && r2 < 0.7) {
var sg = x.createLinearGradient(0, wy - fh * 0.45, 0, wy);
sg.addColorStop(0, "rgba(30,26,22,0)");
sg.addColorStop(1, "rgba(30,26,22,0.55)");
x.fillStyle = sg;
x.beginPath();
x.moveTo(wx - 4 * s, wy);
x.lineTo(wx + ww + 4 * s, wy);
x.lineTo(cx + ww * 0.2, wy - fh * 0.45);
x.lineTo(cx - ww * 0.3, wy - fh * 0.4);
x.fill();
x.fillStyle = rgb(22);
x.fillRect(ix, iy, iw, ih);
x.fillStyle = rgb(70);
for (var sh = 0; sh < 3; sh++) {
x.beginPath();
var sx0 = ix + rnd() * iw;
x.moveTo(sx0, iy);
x.lineTo(sx0 + 6 * s, iy);
x.lineTo(sx0 + 2 * s, iy + ih * 0.3 * rnd() + 6 * s);
x.fill();
}
continue;
}
var gg = x.createLinearGradient(0, iy, 0, iy + ih);
gg.addColorStop(0, "#A4B6C6");
gg.addColorStop(0.5, "#55667A");
gg.addColorStop(1, "#232B34");
x.fillStyle = gg;
x.fillRect(ix, iy, iw, ih);
if (kind !== "ruin") {
if (r2 < 0.3) {
x.fillStyle = ["rgba(200,170,130,0.75)", "rgba(150,60,50,0.7)", "rgba(230,224,206,0.8)"][(r2 * 10 | 0) % 3];
x.fillRect(ix, iy, iw * 0.3, ih);
x.fillRect(ix + iw * 0.7, iy, iw * 0.3, ih);
}
else if (r2 < 0.42) {
x.fillStyle = "rgba(250,214,150,0.55)";
x.fillRect(ix, iy + ih * 0.35, iw, ih * 0.65);
}
}
else {
x.fillStyle = "rgba(20,20,20,0.5)";
x.fillRect(ix, iy, iw, ih);
x.strokeStyle = "rgba(230,230,230,0.6)";
x.lineWidth = 1.2 * s;
x.beginPath();
x.moveTo(ix + iw * 0.2, iy);
x.lineTo(ix + iw * 0.6, iy + ih * 0.5);
x.lineTo(ix + iw * 0.4, iy + ih);
x.stroke();
}
x.strokeStyle = rgb(kind === "ruin" ? 150 : 245);
x.lineWidth = 3 * s;
x.strokeRect(ix, iy, iw, ih);
x.lineWidth = 2 * s;
x.beginPath();
x.moveTo(ix + iw / 2, iy);
x.lineTo(ix + iw / 2, iy + ih);
x.moveTo(ix, iy + ih / 2);
x.lineTo(ix + iw, iy + ih / 2);
x.stroke();
x.lineWidth = 1.2 * s;
x.beginPath();
x.moveTo(ix, iy + ih / 4);
x.lineTo(ix + iw, iy + ih / 4);
x.moveTo(ix, iy + ih * 3 / 4);
x.lineTo(ix + iw, iy + ih * 3 / 4);
x.stroke();
var rg = x.createLinearGradient(0, wy + wh + 6 * s, 0, wy + wh + fh * 0.3);
rg.addColorStop(0, "rgba(60,56,50,0.22)");
rg.addColorStop(1, "rgba(60,56,50,0)");
x.fillStyle = rg;
x.fillRect(wx, wy + wh + 6 * s, ww, fh * 0.3);
}
}
if (kind === "ruin") {
x.strokeStyle = "rgba(40,36,32,0.55)";
x.lineWidth = 1.4 * s;
for (var cr = 0; cr < 14; cr++) {
var px = rnd() * N, py = rnd() * N;
x.beginPath();
x.moveTo(px, py);
for (var q = 0; q < 6; q++) {
px += (rnd() - 0.5) * 30 * s;
py += rnd() * 24 * s;
x.lineTo(px, py);
}
x.stroke();
}
for (var sc = 0; sc < 6; sc++) {
var sx = rnd() * N, sy = rnd() * N, gr = x.createRadialGradient(sx, sy, 0, sx, sy, 60 * s);
gr.addColorStop(0, "rgba(24,20,18,0.45)");
gr.addColorStop(1, "rgba(24,20,18,0)");
x.fillStyle = gr;
x.fillRect(sx - 60 * s, sy - 60 * s, 120 * s, 120 * s);
}
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
try {
if (typeof renderer !== "undefined" && renderer.capabilities)
t.anisotropy = Math.min(pbkLite() ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
t.name = "pbk-" + kind;
PBK.tex[kind] = t;
return t;
},
function (kind, m) {
var key = kind + "|" + m.type + "|" + m.color.getHex() + "|" + (m.emissive ? m.emissive.getHex() : 0) + "|" + (m.vertexColors ? 1 : 0);
if (PBK.mats[key])
return PBK.mats[key];
var n = new THREE.MeshLambertMaterial({ color: m.color.clone(), map: pbkTex(kind), vertexColors: !!m.vertexColors });
if (m.emissive)
n.emissive.copy(m.emissive);
n.name = "pbk";
PBK.mats[key] = n;
return n;
},
function (o) {
if (!o.isMesh || o.isInstancedMesh || o.isSkinnedMesh || !o.visible)
return false;
var g = o.geometry;
if (!g || (g.type !== "BoxGeometry" && g.type !== "BoxBufferGeometry") || !g.parameters || !g.attributes.uv)
return false;
var m = o.material;
if (!m || Array.isArray(m) || m.transparent || m.name === "pbk")
return false;
if (m.map && !pbkPlainMap(m.map))
return false;
if (!(m.isMeshLambertMaterial || m.isMeshPhongMaterial || m.isMeshStandardMaterial))
return false;
if (m.emissive && (m.emissive.r + m.emissive.g + m.emissive.b) > 0.6)
return false;
if (m.color.r + m.color.g + m.color.b < 0.12)
return false;
var p = g.parameters;
if (p.widthSegments > 1 || p.heightSegments > 1 || p.depthSegments > 1)
return false;
o.getWorldScale(PBK_V);
var w = p.width * Math.abs(PBK_V.x), h = p.height * Math.abs(PBK_V.y), d = p.depth * Math.abs(PBK_V.z);
if (h < 4.5 || Math.min(w, d) < 3 || Math.max(w, d) > 260 || h > 400)
return false;
var e = o.matrixWorld.elements, upY = e[5] / Math.max(1e-6, Math.hypot(e[4], e[5], e[6]));
if (upY < 0.95)
return false;
return { w: w, h: h, d: d };
},
function (o, S, kind) {
var g = o.geometry.clone(), pos = g.attributes.position, nor = g.attributes.normal, uv = g.attributes.uv, p = o.geometry.parameters;
var hs = pbkHash((o.id * 2654435761) >>> 0), ou = (hs % 4) * 0.25, ov = ((hs >> 3) % 4) * 0.25;
var nW = Math.max(1, Math.round(S.w / PBK_BAY)), nD = Math.max(1, Math.round(S.d / PBK_BAY)), nH = Math.max(1, Math.round(S.h / PBK_FLOOR));
if (kind === "office")
nH = Math.max(1, Math.round(S.h / 3.8));
for (var i = 0; i < pos.count; i++) {
var nx = nor.getX(i), ny = nor.getY(i), nz = nor.getZ(i);
if (Math.abs(ny) > 0.5)
continue;
var lx = pos.getX(i) / p.width + 0.5, ly = pos.getY(i) / p.height + 0.5, lz = pos.getZ(i) / p.depth + 0.5, u;
if (Math.abs(nx) > 0.5)
u = (nx > 0 ? 1 - lz : lz) * nD;
else
u = (nz > 0 ? lx : 1 - lx) * nW;
uv.setXY(i, u / 4 + ou, ly * nH / 4 + ov);
}
uv.needsUpdate = true;
return g;
},
function (key, W) {
var G = W.g;
if (!G)
return;
var kind = PBK.kind[key] || "town", list = [], users = new Map();
G.updateMatrixWorld(true);
G.traverse(function (o) { if (o.geometry)
users.set(o.geometry, (users.get(o.geometry) || 0) + 1); var S = pbkIs(o); if (S)
list.push([o, S]); });
PBK.last = { key: key, kind: kind, found: list.length, done: 0 };
if (!list.length)
return;
pbkTex(kind);
var i = 0;
(function step() {
if (!G.parent && WLD.w !== W)
return;
var t0 = Date.now();
while (i < list.length && Date.now() - t0 < 6) {
var o = list[i][0], S = list[i][1], old = o.geometry, m = o.material;
i++;
try {
var F = pbkMat(kind, m);
o.geometry = pbkFace(o, S, kind);
o.material = [F, F, m, m, F, F];
if (users.get(old) === 1)
old.dispose();
PBK.last.done++;
}
catch (e) {
if (window.console)
console.warn("[plain-blocks]", e);
}
}
if (i < list.length)
setTimeout(step, 0);
})();
}
];
});
