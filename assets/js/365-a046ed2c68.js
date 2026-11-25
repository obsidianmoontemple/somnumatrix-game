/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var TGV = { on: false, prev: false, deco: null, cell: null, marks: null, hunt: null, near: null, pt: 0, warned: false, gen: 0, lite: false, keeper: null };
function tgvDay(y) { var d = new Date(y, 10, 1), w = d.getDay(), first = 1 + ((4 - w + 7) % 7); return new Date(y, 10, first + 21); }
function tgvSpan() {
var c = typeof cloudSetting === "function" ? cloudSetting("thanksgiving") : null, y = new Date().getFullYear(), T = tgvDay(y);
var a = new Date(T.getFullYear(), T.getMonth(), T.getDate() - 6), b = new Date(T.getFullYear(), T.getMonth(), T.getDate() + 5);
if (c && typeof c === "object") {
var f = Date.parse(c.from || ""), t = Date.parse(c.to || "");
if (f)
a = new Date(f);
if (t)
b = new Date(t);
}
return { from: a, to: b, day: T };
}
function tgvOn() {
if (typeof window !== "undefined" && window.TGV_OFF)
return false;
if (TGV.prev || (typeof window !== "undefined" && window.TGV_FORCE))
return true;
var c = typeof cloudSetting === "function" ? cloudSetting("thanksgiving") : null;
if (c && typeof c === "object") {
if (c.off)
return false;
if (c.force)
return true;
}
var S = tgvSpan(), n = Date.now();
return n >= S.from.getTime() && n < S.to.getTime();
}
function tgvCity() { return typeof inSomnucorNow === "function" && inSomnucorNow() && !(typeof WLD !== "undefined" && WLD.on) && typeof walkMode !== "undefined" && walkMode && typeof ATLC !== "undefined" && !!ATLC; }
function tgvLite() { return typeof LITE !== "undefined" && !!LITE; }
function tgvHash(a, b) { var h = ((a * 73856093) ^ (b * 19349663) ^ 0x5bd1e995) >>> 0; h = (h ^ (h >>> 13)) * 1274126177 >>> 0; return (h ^ (h >>> 16)) >>> 0; }
function tgvY(x, z) { return typeof terrainY === "function" ? terrainY(x, z) : 0; }
function tgvAt(r, a) { return { x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r }; }
function tgvData() { var d = store.tgv; if (!d || typeof d !== "object")
d = store.tgv = {}; if (!Array.isArray(d.got))
d.got = []; return d; }
function tgvSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
var TGV_PUMPKIN = [0xD8661A, 0xE07A22, 0xC9561A, 0xE89032, 0xEDE6D2, 0x8A9A88, 0xD9A867, 0xB8471A];
var TGV_BULB = [0xFFD9A0, 0xFFC870, 0xFFE6C0, 0xFFB858];
var TGV_FLAGS = [0xA8481E, 0xD89A2A, 0x7A1E14, 0x6A6A2A, 0xEADCB8];
var TGV_PIECES = [
["The golden heel", "the round foot of the staff, cast in gold"],
["The lower staff", "the first length of the staff, gilded oak"],
["The middle staff", "the second length, carved with wheat"],
["The upper staff", "the third length, carved with vines"],
["The plaited grip", "a grip of plaited wheat straw, bound in gold wire"],
["The oak leaf", "a gold oak leaf for the crown"],
["The maple leaf", "a red-gold maple leaf for the crown"],
["The ear of corn", "a little ear of corn in gold, husk and all"],
["The amber acorn", "an acorn carved from amber"],
["The sheaf band", "the gold band that ties the crown together"],
["The crown ring", "the open ring the leaves sit in"],
["The harvest moon stone", "a round orange stone, the colour of the harvest moon, that sits on top"]
];
var TGV_HUNT_N = TGV_PIECES.length;
var TGV_SCEPTER = { kind: "tgv_scepter", name: "The Thanksgiving Scepter", icon: "🌾", arm: "tgvscepter" };
var TGV_TEX = {};
function tgvTex(key, w, h, fn, rep) { if (TGV_TEX[key])
return TGV_TEX[key]; var t = wTex(w, h, fn, rep); if (typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding; return (TGV_TEX[key] = t); }
function tgvRnd(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function tgvStrawTex() {
return tgvTex("straw", 256, 128, function (x, W, H) {
var R = tgvRnd(7);
x.fillStyle = "#B8964E";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 2600; i++) {
var px = R() * W, py = R() * H, l = 4 + R() * 12, a = (R() - 0.5) * 0.9, t = R();
x.strokeStyle = t < 0.25 ? "#8A6A30" : t < 0.6 ? "#D2B46A" : t < 0.9 ? "#C4A258" : "#EAD69A";
x.lineWidth = 0.6 + R() * 1.1;
x.beginPath();
x.moveTo(px, py);
x.lineTo(px + Math.cos(a) * l, py + Math.sin(a) * l);
x.stroke();
}
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "rgba(0,0,0,0)");
g.addColorStop(1, "rgba(40,25,5,.25)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(90,70,40,.85)";
[0.28, 0.72].forEach(function (f) { x.fillRect(W * f - 2, 0, 3, H); });
});
}
function tgvLeaf(x, cx, cy, s, kind, col, vein, rot) {
x.save();
x.translate(cx, cy);
x.rotate(rot);
x.scale(s, s);
x.fillStyle = col;
x.beginPath();
if (kind === 0) {
var pts = [[0, -1], [0.18, -0.62], [0.48, -0.78], [0.4, -0.38], [0.92, -0.36], [0.66, -0.08], [0.82, 0.12], [0.36, 0.2], [0.3, 0.5], [0.06, 0.38], [0, 0.62]];
x.moveTo(0, -1);
pts.forEach(function (p) { x.lineTo(p[0], p[1]); });
for (var i = pts.length - 2; i >= 0; i--)
x.lineTo(-pts[i][0], pts[i][1]);
}
else if (kind === 1) {
x.moveTo(0, -0.95);
for (var k = 0; k <= 12; k++) {
var t = k / 12, y = -0.95 + t * 1.55, w = 0.22 + 0.28 * Math.sin(t * Math.PI) + 0.1 * Math.cos(t * Math.PI * 6);
x.lineTo(w, y);
}
for (k = 12; k >= 0; k--) {
t = k / 12;
y = -0.95 + t * 1.55;
w = 0.22 + 0.28 * Math.sin(t * Math.PI) + 0.1 * Math.cos(t * Math.PI * 6 + 0.6);
x.lineTo(-w, y);
}
}
else {
x.moveTo(0, -0.95);
x.quadraticCurveTo(0.6, -0.4, 0.42, 0.2);
x.quadraticCurveTo(0.2, 0.55, 0, 0.6);
x.quadraticCurveTo(-0.2, 0.55, -0.42, 0.2);
x.quadraticCurveTo(-0.6, -0.4, 0, -0.95);
}
x.closePath();
x.fill();
var g = x.createRadialGradient(0, -0.1, 0.05, 0, -0.1, 0.9);
g.addColorStop(0, "rgba(255,230,120,.25)");
g.addColorStop(1, "rgba(60,10,0,.35)");
x.fillStyle = g;
x.fill();
x.strokeStyle = vein;
x.lineWidth = 0.035;
x.beginPath();
x.moveTo(0, 0.85);
x.lineTo(0, -0.85);
if (kind === 0) {
x.moveTo(0, 0.1);
x.lineTo(0.7, -0.3);
x.moveTo(0, 0.1);
x.lineTo(-0.7, -0.3);
x.moveTo(0, 0.25);
x.lineTo(0.5, 0.12);
x.moveTo(0, 0.25);
x.lineTo(-0.5, 0.12);
}
else
for (var v = 0; v < 5; v++) {
var yy = -0.6 + v * 0.25;
x.moveTo(0, yy + 0.12);
x.lineTo(0.35, yy - 0.05);
x.moveTo(0, yy + 0.12);
x.lineTo(-0.35, yy - 0.05);
}
x.stroke();
x.restore();
}
var TGV_LEAFCOL = [["#B8321A", "#6A1A0C"], ["#D8661E", "#7A3010"], ["#E4A82A", "#8A5A10"], ["#8A3A1A", "#4A1A08"], ["#C8501C", "#6A240C"], ["#D9B23A", "#7A5A14"]];
function tgvLeafTex() {
return tgvTex("leaves", 256, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
[[0, 0], [1, 4], [2, 2], [1, 1]].forEach(function (q, i) { var c = TGV_LEAFCOL[q[1]]; tgvLeaf(x, (i % 2 + 0.5) * W / 2, (Math.floor(i / 2) + 0.5) * H / 2, W * 0.21, q[0], c[0], c[1], i * 0.7); });
});
}
function tgvWreathTex() {
return tgvTex("wreath", 256, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = tgvRnd(31), cx = W / 2, cy = H / 2;
x.strokeStyle = "#5A3A1A";
x.lineWidth = 18;
x.beginPath();
x.arc(cx, cy, 78, 0, 7);
x.stroke();
for (var i = 0; i < 70; i++) {
var a = R() * Math.PI * 2, r = 64 + R() * 30, c = TGV_LEAFCOL[Math.floor(R() * 6)];
tgvLeaf(x, cx + Math.cos(a) * r, cy + Math.sin(a) * r, 16 + R() * 10, Math.floor(R() * 3), c[0], c[1], a + Math.PI / 2 + (R() - 0.5));
}
for (var w = 0; w < 10; w++) {
var b = w / 10 * Math.PI * 2 + 0.3;
x.strokeStyle = "#D8B860";
x.lineWidth = 2;
x.beginPath();
x.moveTo(cx + Math.cos(b) * 72, cy + Math.sin(b) * 72);
x.lineTo(cx + Math.cos(b + 0.25) * 102, cy + Math.sin(b + 0.25) * 102);
x.stroke();
x.fillStyle = "#E2C470";
x.beginPath();
x.ellipse(cx + Math.cos(b + 0.25) * 100, cy + Math.sin(b + 0.25) * 100, 3, 8, b + 0.25 + Math.PI / 2, 0, 7);
x.fill();
}
[0.9, 2.4, 4.0, 5.3].forEach(function (b, k) {
var px = cx + Math.cos(b) * 82, py = cy + Math.sin(b) * 82, g = x.createRadialGradient(px - 4, py - 4, 2, px, py, 13);
g.addColorStop(0, k % 2 ? "#F4EAD0" : "#F29A3A");
g.addColorStop(1, k % 2 ? "#B8A888" : "#B4501A");
x.fillStyle = g;
x.beginPath();
x.ellipse(px, py, 13, 10, 0, 0, 7);
x.fill();
x.fillStyle = "#4A5A20";
x.fillRect(px - 1.5, py - 14, 3, 6);
});
function plaid(px, py, w, h) {
x.save();
x.beginPath();
x.rect(px, py, w, h);
x.clip();
x.fillStyle = "#9A1E16";
x.fillRect(px, py, w, h);
x.fillStyle = "rgba(20,10,10,.55)";
for (var s = 0; s < w; s += 10)
x.fillRect(px + s, py, 5, h);
for (s = 0; s < h; s += 10)
x.fillRect(px, py + s, w, 5);
x.restore();
}
x.save();
x.translate(cx, cy + 92);
plaid(-34, -12, 30, 22);
plaid(4, -12, 30, 22);
plaid(-8, -10, 16, 18);
plaid(-16, 6, 10, 34);
plaid(6, 6, 10, 34);
x.restore();
});
}
function tgvMumTex(n) {
var P = [["#B8461A", "#E8903A"], ["#5E1220", "#8E2834"], ["#D8A01A", "#F4D25A"], ["#C86A1E", "#F0B060"]][n % 4];
return tgvTex("mum" + n, 128, 128, function (x, W, H) {
var R = tgvRnd(n * 97 + 5);
x.fillStyle = "#3A4A1E";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 900; i++) {
var px = R() * W, py = R() * H, r = 1.5 + R() * 3.2;
x.fillStyle = R() < 0.12 ? "#5A6A2A" : (R() < 0.55 ? P[0] : P[1]);
x.beginPath();
x.ellipse(px, py, r, r * 0.6, R() * 3, 0, 7);
x.fill();
if (R() < 0.1) {
x.fillStyle = "#F8D870";
x.beginPath();
x.arc(px, py, 0.9, 0, 7);
x.fill();
}
}
});
}
function tgvShockTex() {
return tgvTex("shock", 128, 256, function (x, W, H) {
x.clearRect(0, 0, W, H);
var R = tgvRnd(13);
for (var i = 0; i < 140; i++) {
var px = R() * W, top = R() * H * 0.22, c = R();
x.strokeStyle = c < 0.3 ? "#9A7A44" : c < 0.7 ? "#C8A866" : c < 0.9 ? "#B8955A" : "#DCC48A";
x.lineWidth = 1.5 + R() * 3;
x.beginPath();
x.moveTo(px, H);
x.quadraticCurveTo(px + (R() - 0.5) * 20, H * 0.5, px + (R() - 0.5) * 34, top);
x.stroke();
}
x.fillStyle = "rgba(60,40,15,.6)";
x.fillRect(0, H * 0.52, W, 5);
});
}
var TGV_WINPICS = 6;
function tgvWinTex(n) {
return tgvTex("win" + n, 128, 160, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#FFE2A8");
g.addColorStop(0.7, "#F2B868");
g.addColorStop(1, "#C88A44");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
var r = x.createRadialGradient(W * 0.5, H * 0.35, 10, W * 0.5, H * 0.4, W);
r.addColorStop(0, "rgba(255,250,230,.35)");
r.addColorStop(1, "rgba(80,40,10,.45)");
x.fillStyle = r;
x.fillRect(0, 0, W, H);
var R = tgvRnd(n * 13 + 3);
if (n === 0) {
x.drawImage(tgvWreathTex().image, W / 2 - 52, H * 0.42 - 52, 104, 104);
}
else if (n === 1) {
for (var i = 0; i < 14; i++) {
var c = TGV_LEAFCOL[i % 6];
tgvLeaf(x, 6 + i * 9, 18 + Math.sin(i / 13 * Math.PI) * 18, 9, i % 3, c[0], c[1], i);
}
[[40, 138, 20, 0xD8661A], [74, 140, 14, 0xEDE6D2], [98, 142, 10, 0xD9A867]].forEach(function (p) { var col = "#" + ("00000" + p[3].toString(16)).slice(-6); x.fillStyle = col; x.beginPath(); x.ellipse(p[0], p[1], p[2], p[2] * 0.75, 0, 0, 7); x.fill(); x.fillStyle = "rgba(0,0,0,.18)"; x.fillRect(p[0] - 1, p[1] - p[2] * 0.75, 2, p[2] * 1.5); x.fillStyle = "#4A5A20"; x.fillRect(p[0] - 1.5, p[1] - p[2] * 0.75 - 6, 3, 7); });
}
else if (n === 2) {
x.fillStyle = "#F4EEDC";
x.fillRect(24, 30, 80, 96);
x.fillStyle = "rgba(200,190,160,.6)";
x.fillRect(54, 26, 20, 8);
var F = ["#C8321E", "#E88A1E", "#E8C21E", "#5A8A2A", "#8A4A1E"];
for (var f = 0; f < 5; f++) {
var a = -2.4 + f * 0.48;
x.fillStyle = F[f];
x.beginPath();
x.ellipse(64 + Math.cos(a) * 22, 88 + Math.sin(a) * 22, 7, 20, a + Math.PI / 2, 0, 7);
x.fill();
}
x.fillStyle = "#7A4A22";
x.beginPath();
x.ellipse(64, 92, 16, 18, 0, 0, 7);
x.fill();
x.beginPath();
x.arc(64, 70, 9, 0, 7);
x.fill();
x.fillStyle = "#E8A01E";
x.beginPath();
x.moveTo(64, 70);
x.lineTo(72, 73);
x.lineTo(64, 76);
x.fill();
x.fillStyle = "#C8201E";
x.beginPath();
x.ellipse(62, 79, 2.4, 5, 0, 0, 7);
x.fill();
x.fillStyle = "#222";
x.beginPath();
x.arc(61, 68, 1.4, 0, 7);
x.fill();
x.font = "bold 12px Georgia,serif";
x.textAlign = "center";
x.fillStyle = "#7A2A10";
x.fillText("thankful", 64, 120);
}
else if (n === 3) {
x.fillStyle = "#9A6A30";
x.beginPath();
x.moveTo(18, 96);
x.quadraticCurveTo(30, 150, 92, 138);
x.lineTo(96, 112);
x.quadraticCurveTo(52, 122, 18, 96);
x.fill();
x.strokeStyle = "rgba(60,30,10,.5)";
x.lineWidth = 1.5;
for (var b = 0; b < 6; b++) {
x.beginPath();
x.moveTo(26 + b * 11, 104 + b * 3);
x.lineTo(30 + b * 11, 134 - b * 1);
x.stroke();
}
[[96, 118, 14, "#D8661A"], [108, 132, 9, "#8A1E2A"], [90, 140, 8, "#E4C030"], [112, 112, 8, "#5A2A5A"], [104, 98, 9, "#C8321E"], [98, 148, 7, "#EDE6D2"]].forEach(function (p) { x.fillStyle = p[3]; x.beginPath(); x.arc(p[0], p[1], p[2], 0, 7); x.fill(); x.fillStyle = "rgba(255,255,255,.25)"; x.beginPath(); x.arc(p[0] - p[2] * 0.3, p[1] - p[2] * 0.3, p[2] * 0.35, 0, 7); x.fill(); });
x.fillStyle = "#E2C470";
for (var w = 0; w < 5; w++) {
x.save();
x.translate(110 + w * 2, 90 - w * 6);
x.rotate(-0.5 + w * 0.2);
x.fillRect(-1, -14, 2, 14);
x.beginPath();
x.ellipse(0, -18, 3, 7, 0, 0, 7);
x.fill();
x.restore();
}
}
else if (n === 4) {
x.fillStyle = "#3A2416";
x.fillRect(20, 44, 88, 52);
x.strokeStyle = "#D8B060";
x.lineWidth = 3;
x.strokeRect(24, 48, 80, 44);
x.font = "bold 15px Georgia,serif";
x.textAlign = "center";
x.fillStyle = "#F2DCA0";
x.fillText("GIVE", 64, 66);
x.fillText("THANKS", 64, 84);
[16, 112].forEach(function (cx) { x.fillStyle = "#F4ECD8"; x.fillRect(cx - 4, 110, 8, 34); var fg = x.createRadialGradient(cx, 104, 1, cx, 104, 14); fg.addColorStop(0, "rgba(255,250,200,1)"); fg.addColorStop(0.3, "rgba(255,190,90,.8)"); fg.addColorStop(1, "rgba(255,160,60,0)"); x.fillStyle = fg; x.beginPath(); x.arc(cx, 104, 14, 0, 7); x.fill(); });
}
else {
x.fillStyle = "#C8B8A0";
x.fillRect(0, 128, W, 32);
x.fillStyle = "#D88A30";
x.beginPath();
x.ellipse(46, 128, 30, 9, 0, 0, 7);
x.fill();
x.fillStyle = "#A85A1A";
x.beginPath();
x.ellipse(46, 126, 25, 6.5, 0, 0, 7);
x.fill();
x.strokeStyle = "#E8B060";
x.lineWidth = 3;
x.beginPath();
x.ellipse(46, 126, 27, 7.5, 0, 0, 7);
x.stroke();
x.fillStyle = "#5A6E8A";
x.beginPath();
x.moveTo(88, 128);
x.lineTo(112, 128);
x.lineTo(108, 96);
x.lineTo(92, 96);
x.fill();
for (var s = 0; s < 9; s++) {
var c2 = TGV_LEAFCOL[s % 6];
x.strokeStyle = "#5A3A1A";
x.lineWidth = 1;
x.beginPath();
x.moveTo(100, 98);
x.lineTo(84 + s * 4, 50 + R() * 20);
x.stroke();
tgvLeaf(x, 84 + s * 4, 50 + R() * 20, 8, s % 3, c2[0], c2[1], R() * 3);
}
}
x.fillStyle = "rgba(250,245,235,.9)";
x.fillRect(W / 2 - 2, 0, 4, H);
x.fillRect(0, H * 0.5 - 2, W, 4);
x.strokeStyle = "rgba(250,245,235,.9)";
x.lineWidth = 6;
x.strokeRect(0, 0, W, H);
var s2 = x.createLinearGradient(0, 0, W, H);
s2.addColorStop(0, "rgba(255,255,255,.12)");
s2.addColorStop(0.4, "rgba(255,255,255,0)");
x.fillStyle = s2;
x.fillRect(0, 0, W, H);
});
}
function tgvBannerTex(n) {
return tgvTex("banner" + n, 128, 1024, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, n % 2 ? "#5A1A0E" : "#6A3A12");
g.addColorStop(1, n % 2 ? "#3A0E08" : "#4A2408");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(0,0,0,.08)";
for (var y = 0; y < H; y += 3)
x.fillRect(0, y, W, 1);
x.fillStyle = "#D8A848";
x.fillRect(0, 0, W, 16);
x.fillRect(10, 0, 3, H);
x.fillRect(W - 13, 0, 3, H);
x.fillRect(0, H - 70, W, 4);
x.beginPath();
x.moveTo(0, H - 44);
x.lineTo(W / 2, H);
x.lineTo(W, H - 44);
x.lineTo(W, H);
x.lineTo(0, H);
x.fill();
x.save();
x.translate(W / 2, 190);
x.strokeStyle = "#E8C870";
x.lineWidth = 2;
for (var s = -6; s <= 6; s++) {
var a = s * 0.07;
x.beginPath();
x.moveTo(s * 1.5, 60);
x.lineTo(Math.sin(a) * 100, -50);
x.stroke();
x.fillStyle = "#F0D27A";
for (var k = 0; k < 6; k++) {
var px = Math.sin(a) * (100 - k * 7) * (1), py = -50 + k * 9 * Math.cos(a);
x.beginPath();
x.ellipse(px - 3, py, 2.6, 5, -0.5, 0, 7);
x.ellipse(px + 3, py, 2.6, 5, 0.5, 0, 7);
x.fill();
}
}
x.fillStyle = "#9A2A16";
x.fillRect(-16, 18, 32, 9);
x.restore();
x.save();
x.translate(W / 2, H / 2 + 110);
x.rotate(Math.PI / 2);
x.font = "bold 58px Georgia,serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillStyle = "#F0D088";
x.fillText(n % 2 ? "GIVE THANKS" : "SOMNUCOR", 0, 0);
x.restore();
for (var l = 0; l < 3; l++) {
var c = TGV_LEAFCOL[(l + n) % 6];
tgvLeaf(x, W / 2 + (l % 2 ? -14 : 14), H - 150 - l * 60, 20, 0, c[0], c[1], l * 0.6 - 0.3);
}
});
}
function tgvSignTex(title, sub) {
return tgvTex("sign" + title, 512, 128, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#5A3416");
g.addColorStop(1, "#3A200C");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(0,0,0,.12)";
for (var i = 0; i < H; i += 4)
x.fillRect(0, i, W, 1);
x.strokeStyle = "#D8A848";
x.lineWidth = 5;
x.strokeRect(6, 6, W - 12, H - 12);
hallText(x, title.toUpperCase(), W / 2, 50, W - 40, "bold 40px Georgia,serif", "#F0D088");
hallText(x, sub || "", W / 2, 96, W - 50, "italic 23px Georgia,serif", "#F4E6C8");
});
}
var TGV_GEO = {};
function tgvGeo(k) {
if (TGV_GEO[k])
return TGV_GEO[k];
var g, p, v = new THREE.Vector3(), i, a;
if (k === "pumpkin" || k === "squat") {
g = new THREE.SphereGeometry(0.5, 20, 12);
p = g.attributes.position;
var col = new Float32Array(p.count * 3), sq = k === "squat" ? 0.6 : 0.78;
for (i = 0; i < p.count; i++) {
v.fromBufferAttribute(p, i);
a = Math.atan2(v.z, v.x);
var c8 = Math.cos(a * 10), rib = 1 + 0.06 * c8, top = v.y > 0 ? 1 - 0.25 * Math.pow(1 - Math.min(1, Math.hypot(v.x, v.z) / 0.5), 3) : 1;
v.x *= rib;
v.z *= rib;
v.y *= sq * top;
p.setXYZ(i, v.x, v.y + 0.5 * sq, v.z);
var sh = 0.78 + 0.22 * (0.5 + 0.5 * c8);
col[i * 3] = sh;
col[i * 3 + 1] = sh * 0.97;
col[i * 3 + 2] = sh * 0.95;
}
g.setAttribute("color", new THREE.BufferAttribute(col, 3));
g.computeVertexNormals();
}
else if (k === "stem") {
g = new THREE.CylinderGeometry(0.03, 0.06, 0.18, 6);
g.rotateZ(0.25);
g.translate(0.02, 0.86, 0);
}
else if (k === "gourd") {
g = new THREE.LatheGeometry([[0, 0], [0.12, 0.02], [0.17, 0.1], [0.15, 0.2], [0.08, 0.3], [0.07, 0.42], [0.04, 0.5], [0, 0.52]].map(function (q) { return new THREE.Vector2(q[0], q[1]); }), 12);
g.rotateZ(1.25);
g.translate(0.2, 0.13, 0);
}
else if (k === "bale") {
g = new THREE.BoxGeometry(1.1, 0.46, 0.52);
g.translate(0, 0.23, 0);
}
else if (k === "shock") {
g = new THREE.CylinderGeometry(0.08, 0.46, 2.3, 9, 1, true);
g.translate(0, 1.15, 0);
}
else if (k === "mum") {
g = new THREE.SphereGeometry(0.34, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.6);
g.scale(1, 0.8, 1);
g.translate(0, 0.34, 0);
}
else if (k === "pot") {
g = new THREE.CylinderGeometry(0.26, 0.19, 0.36, 12);
g.translate(0, 0.18, 0);
}
else if (k === "leaf") {
g = new THREE.PlaneGeometry(0.22, 0.22);
g.rotateX(-Math.PI / 2);
g.translate(0, 0.015, 0);
}
else if (k === "wreath") {
g = new THREE.PlaneGeometry(0.95, 0.95);
}
else if (k === "win") {
g = new THREE.PlaneGeometry(1, 1);
}
else if (k === "bulb")
g = new THREE.SphereGeometry(0.07, 6, 4);
else if (k === "flame")
g = new THREE.SphereGeometry(0.1, 6, 4);
else if (k === "lantern") {
g = new THREE.CylinderGeometry(0.15, 0.18, 0.4, 6);
g.translate(0, 0.2, 0);
}
else if (k === "plane")
g = new THREE.PlaneGeometry(1, 1);
return (TGV_GEO[k] = g);
}
var TGV_MAT = {};
function tgvMat(k) {
if (TGV_MAT[k])
return TGV_MAT[k];
var m;
if (k === "pumpkin")
m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, vertexColors: true });
else if (k === "stem")
m = new THREE.MeshLambertMaterial({ color: 0x5A5A2A });
else if (k === "gourd")
m = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
else if (k === "bale")
m = new THREE.MeshLambertMaterial({ map: tgvStrawTex() });
else if (k === "shock")
m = new THREE.MeshLambertMaterial({ map: tgvShockTex(), transparent: true, alphaTest: 0.35, side: THREE.DoubleSide });
else if (/^mum/.test(k))
m = new THREE.MeshLambertMaterial({ map: tgvMumTex(+k.slice(3)) });
else if (k === "pot")
m = new THREE.MeshLambertMaterial({ color: 0xA8582E });
else if (k === "leaf")
m = new THREE.MeshLambertMaterial({ map: tgvLeafTex(), transparent: true, alphaTest: 0.45, side: THREE.DoubleSide });
else if (k === "wreath")
m = new THREE.MeshLambertMaterial({ map: tgvWreathTex(), transparent: true, alphaTest: 0.4, side: THREE.DoubleSide });
else if (/^win/.test(k)) {
m = new THREE.MeshBasicMaterial({ map: tgvWinTex(+k.slice(3)), color: 0xE0D4C0, fog: true });
m.toneMapped = false;
}
else if (k === "bulb")
m = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
else if (k === "flame")
m = new THREE.MeshBasicMaterial({ color: 0xFFC060 });
else if (k === "lantern")
m = new THREE.MeshLambertMaterial({ color: 0x2A2420, emissive: 0x5A3000 });
return (TGV_MAT[k] = m);
}
function tgvLeafGeo(q) {
var key = "leafq" + q;
if (TGV_GEO[key])
return TGV_GEO[key];
var g = tgvGeo("leaf").clone(), uv = g.attributes.uv, u0 = (q % 2) * 0.5, v0 = (1 - Math.floor(q / 2)) * 0.5 - 0.5 + 0.5;
v0 = q < 2 ? 0.5 : 0;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, u0 + uv.getX(i) * 0.5, v0 + uv.getY(i) * 0.5);
return (TGV_GEO[key] = g);
}
var TGV_O = new THREE.Object3D(), TGV_C = new THREE.Color();
function tgvInst(G, geo, mat, list, cols) {
if (!list.length)
return null;
var im = new THREE.InstancedMesh(geo, mat, list.length);
list.forEach(function (p, i) {
TGV_O.position.set(p[0], p[1], p[2]);
TGV_O.rotation.set(p[6] || 0, p[3] || 0, 0, "YXZ");
var s = p[4] || 1;
if (Array.isArray(s))
TGV_O.scale.set(s[0], s[1], s[2]);
else
TGV_O.scale.set(s, s, s);
TGV_O.updateMatrix();
im.setMatrixAt(i, TGV_O.matrix);
if (cols) {
TGV_C.setHex(p[5] !== undefined ? p[5] : 0xFFFFFF);
im.setColorAt(i, TGV_C);
}
});
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.raycast = function () { };
im.userData.tgvOwn = true;
im.userData.noCull = true;
im.castShadow = false;
im.receiveShadow = true;
G.add(im);
return im;
}
function tgvPumpkins(G, list) {
if (!list.length)
return;
var round = [], squat = [];
list.forEach(function (p, i) { var h = tgvHash(Math.round(p[0] * 7), Math.round(p[2] * 7)), c = p[5] !== undefined ? p[5] : TGV_PUMPKIN[h % TGV_PUMPKIN.length]; var q = [p[0], p[1], p[2], p[3], p[4], c]; ((h >>> 5) % 3 === 0 ? squat : round).push(q); });
tgvInst(G, tgvGeo("pumpkin"), tgvMat("pumpkin"), round, true);
tgvInst(G, tgvGeo("squat"), tgvMat("pumpkin"), squat, true);
tgvInst(G, tgvGeo("stem"), tgvMat("stem"), round.concat(squat.map(function (p) { return [p[0], p[1] - 0.18 * (p[4] || 1), p[2], p[3], p[4]]; })));
}
function tgvGourds(G, list) { tgvInst(G, tgvGeo("gourd"), tgvMat("gourd"), list.map(function (p, i) { return [p[0], p[1], p[2], p[3], p[4], [0xE8C840, 0x6A8A3A, 0xEDE0B8, 0xD88A2A][i % 4]]; }), true); }
function tgvMums(G, list) {
if (!list.length)
return;
tgvInst(G, tgvGeo("pot"), tgvMat("pot"), list);
[0, 1, 2, 3].forEach(function (n) { tgvInst(G, tgvGeo("mum"), tgvMat("mum" + n), list.filter(function (p, i) { return i % 4 === n; }).map(function (p) { return [p[0], p[1] + 0.26 * (p[4] || 1), p[2], p[3], p[4]]; })); });
}
function tgvLeaves(G, list) { [0, 1, 2, 3].forEach(function (q) { tgvInst(G, tgvLeafGeo(q), tgvMat("leaf"), list.filter(function (p, i) { return i % 4 === q; })); }); }
function tgvDrop(G) {
if (!G)
return;
if (G.parent)
G.parent.remove(G);
G.traverse(function (m) { try {
if (m.isInstancedMesh && m.userData.tgvOwn && m.dispose)
m.dispose();
if (m.userData.tgvMine) {
if (m.geometry)
m.geometry.dispose();
if (m.material && m.material.dispose)
m.material.dispose();
}
}
catch (e) { } });
}
function tgvStreets() { var out = []; if (typeof ATL_STREETS === "undefined")
return out; Object.keys(ATL_STREETS).forEach(function (k) { ATL_STREETS[k].forEach(function (r) { out.push(r); }); }); return out; }
function tgvNearStreet(r, pad) { var S = tgvStreets(); for (var i = 0; i < S.length; i++)
if (Math.abs(S[i] - r) < ATL_ROAD + (pad || 0))
return true; return false; }
function tgvBlocked(x, z) { return typeof blockedAt === "function" && blockedAt(x, z, 0); }
var TGV_GRASS = [[350, 640], [660, 960], [1200, 1500], [1740, 2100]];
function tgvDecoDrop() {
var D = TGV.deco;
if (!D)
return;
tgvDrop(D.g);
(D.glows || []).forEach(function (k) { if (typeof nightGlowSpot === "function")
nightGlowSpot(k, null); });
TGV.deco = null;
}
function tgvWindows(o) {
if (o.__tgvWin)
return o.__tgvWin;
var out = [];
try {
var def = KIT[o.archetype], a = o.attrs || {}, s = a.s || 1, parts = levelParts(def, o), body = typeof cvlBodyPart === "function" ? cvlBodyPart(parts) : null;
if (body && typeof cvlFrontWindows === "function") {
var r = o.rot || 0, cr = Math.cos(r), sr = Math.sin(r), sw = s * (a.w || 1), sd = s * (a.d || 1);
cvlFrontWindows(o, parts, body).slice(0, 6).forEach(function (w) {
var lx = w.x * sw, lz = (w.z + 0.16) * sd;
out.push({ x: o.x + lx * cr + lz * sr, z: o.z - lx * sr + lz * cr, y: w.y * s, w: w.w * sw * 0.86, h: w.h * s * 0.86, ry: r });
});
}
}
catch (e) { }
return (o.__tgvWin = out);
}
function tgvBody(o) {
if (o.__tgvBody !== undefined)
return o.__tgvBody;
var out = null;
try {
var def = KIT[o.archetype], a = o.attrs || {}, s = a.s || 1, parts = levelParts(def, o), body = typeof cvlBodyPart === "function" ? cvlBodyPart(parts) : null, door = typeof frontDoorOf === "function" ? frontDoorOf(parts) : null;
if (body) {
var sw = s * (a.w || 1);
out = { w: Math.min(40, body.s[0] * sw), h: Math.min(40, body.s[1] * s), cx: (body.p[0] - (door ? door.p[0] : body.p[0])) * sw };
}
}
catch (e) { }
return (o.__tgvBody = out);
}
function tgvDecoBuild(P) {
tgvDecoDrop();
var lite = tgvLite(), reach = lite ? 110 : 200, G = new THREE.Group();
G.name = "thanksgiving streets";
scene.add(G);
var gen = (TGV.gen = (TGV.gen || 0) + 1), D = TGV.deco = { g: G, gen: gen, glows: [] };
var dc = Math.hypot(P.x - ATLC.x, P.z - ATLC.z), ac = Math.atan2(P.z - ATLC.z, P.x - ATLC.x);
var bulbs = [], pump = [], gourd = [], bale = [], shock = [], mums = [], leaves = [], wreaths = [], wins = [[], [], [], [], [], []], lant = [];
function near(x, z) { return Math.hypot(x - P.x, z - P.z) <= reach; }
function add(L, x, z, rot, s, y) { L.push([x, (y !== undefined ? y : tgvY(x, z)), z, rot || 0, s || 1]); }
function drift(x, z, n, rad, seed) { var R = tgvRnd(seed), y0 = tgvY(x, z); for (var i = 0; i < n; i++) {
var a = R() * 6.283, r = Math.sqrt(R()) * rad, lx = x + Math.cos(a) * r, lz = z + Math.sin(a) * r, ly = tgvY(lx, lz);
if (Math.abs(ly - y0) > 0.4)
continue;
leaves.push([lx, ly + 0.01 + R() * 0.02, lz, R() * 6.283, 0.8 + R() * 0.6, undefined, (R() - 0.5) * 0.5]);
} }
var leafCap = lite ? 700 : 3600;
var fest = typeof festOn === "function" && festOn();
tgvStreets().forEach(function (rs) {
if (Math.abs(rs - dc) > reach + 20)
return;
[1, -1].forEach(function (side) {
var rk = rs + side * (ATL_ROAD + 1.5), span = reach / rk, step = lite ? 9 : 6, i0 = Math.ceil((ac - span) * rk / step), i1 = Math.floor((ac + span) * rk / step);
for (var i = i0; i <= i1; i++) {
var a = i * step / rk, x = ATLC.x + Math.cos(a) * rk, z = ATLC.z + Math.sin(a) * rk;
if (!near(x, z))
continue;
if (!atlClearAt(rk, a, 1, 1.5) || tgvBlocked(x, z))
continue;
var h = tgvHash(i, rs * 2 + (side > 0 ? 1 : 0)) % 100, rot = side > 0 ? rotIn(a) : rotOut(a), tx = -Math.sin(a), tz = Math.cos(a);
if (h < 30) {
add(bale, x, z, rot + Math.PI / 2);
add(pump, x + tx * 0.25, z + tz * 0.25, rot, 0.62, tgvY(x, z) + 0.46);
add(pump, x - tx * 0.6, z - tz * 0.6, rot, 0.85);
if (!lite)
add(gourd, x + tx * 0.75, z + tz * 0.75, rot * 3);
}
else if (h < 48) {
add(pump, x, z, rot, 0.9 + (h % 5) * 0.08);
add(pump, x + tx * 0.7, z + tz * 0.7, rot + 1, 0.6);
add(gourd, x - tx * 0.6, z - tz * 0.6, rot + 2);
}
else if (h < 62)
add(mums, x, z, rot, 1 + (h % 3) * 0.1);
else if (h < 72) {
add(shock, x, z, h);
add(pump, x + Math.cos(a + 1.4) * 0.9, z + Math.sin(a + 1.4) * 0.9, rot, 0.75);
}
if (leaves.length < leafCap && h % 2 === 0)
drift(x + Math.cos(a) * side * -0.9, z + Math.sin(a) * side * -0.9, lite ? 3 : 7, 1.6, h * 31 + i);
}
if (fest || typeof evtPolesAndBunting !== "function")
return;
var rp = rs + side * (ATL_ROAD + 0.9), ps = 14, j0 = Math.ceil((ac - span) * rp / ps), j1 = Math.floor((ac + span) * rp / ps), poles = [];
for (var j = j0; j <= j1; j++) {
var b = (j + 0.5) * ps / rp, px = ATLC.x + Math.cos(b) * rp, pz = ATLC.z + Math.sin(b) * rp;
poles.push(near(px, pz) && atlClearAt(rp, b, 1, 2) && !tgvBlocked(px, pz) ? [px, tgvY(px, pz), pz] : null);
}
try {
evtPolesAndBunting(G, poles, TGV_FLAGS, false);
}
catch (e) { }
});
});
if (typeof ATL_STAIRS !== "undefined")
ATL_STAIRS.forEach(function (s) {
var r0 = Math.max(146, dc - reach), r1 = dc + reach, st = lite ? 16 : 10;
for (var r = Math.ceil(r0 / st) * st; r <= r1; r += st) {
if (tgvNearStreet(r, 3))
continue;
[1, -1].forEach(function (side) {
var a = s.a + side * (s.half + 0.7) / r, x = ATLC.x + Math.cos(a) * r, z = ATLC.z + Math.sin(a) * r;
if (near(x, z) && !tgvBlocked(x, z)) {
if ((r / st) % 2)
add(mums, x, z, rotIn(a), 1.1);
else
add(pump, x, z, rotIn(a), 0.9);
}
});
}
});
var rid = ATLC.id, bl = [], lamps = [], obs = [];
store.objects.forEach(function (o) {
if (o.realm !== rid || !KIT[o.archetype])
return;
var dx = o.x - P.x, dz = o.z - P.z;
if (dx * dx + dz * dz > (reach + 30) * (reach + 30))
return;
var k = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1;
if (k.cat !== "being")
obs.push({ x: o.x, z: o.z, r: Math.max(k.size[0] * ((o.attrs && o.attrs.w) || 1), k.size[2] * ((o.attrs && o.attrs.d) || 1)) * s * 0.5 });
if (typeof PLANS !== "undefined" && PLANS[o.archetype] && o.archetype !== "somnucortower")
bl.push({ o: o, d: dx * dx + dz * dz });
else if (/^(ornatelamp|dimlamp|streetlight)$/.test(o.archetype))
lamps.push({ o: o, h: k.size[1] * s, d: dx * dx + dz * dz });
});
bl.sort(function (p, q) { return p.d - q.d; });
bl = bl.slice(0, lite ? 50 : 170);
bl.forEach(function (B, n) {
var o = B.o, W = o.__shcDoor || o.__tgvDoor;
if (!W) {
try {
W = o.__tgvDoor = doorWorld(o);
}
catch (e) {
return;
}
}
if (!W || !near(W.x, W.z))
return;
var ox = W.out.x, oz = W.out.z, sx = oz, sz = -ox, rot = Math.atan2(ox, oz), hx = tgvHash(Math.round(o.x), Math.round(o.z)), gy = tgvY(W.x, W.z);
var lx = W.x + ox * 0.45 + sx * 1.35, lz = W.z + oz * 0.45 + sz * 1.35, rx = W.x + ox * 0.45 - sx * 1.35, rz = W.z + oz * 0.45 - sz * 1.35;
if (!tgvBlocked(lx, lz)) {
add(mums, lx, lz, rot, 0.95);
if (hx % 2)
add(pump, lx + ox * 0.55, lz + oz * 0.55, rot, 0.55);
}
if (!tgvBlocked(rx, rz)) {
if (hx % 3 === 0)
add(shock, rx - sx * 0.3, rz - sz * 0.3, hx);
add(pump, rx, rz, rot, hx % 2 ? 0.7 : 0.9);
add(pump, rx + ox * 0.4 - sx * 0.5, rz + oz * 0.4 - sz * 0.5, rot + 1, 0.5);
if (!lite)
add(gourd, rx + ox * 0.6, rz + oz * 0.6, rot * 2);
}
wreaths.push([W.x - ox * 0.53, gy + 1.55, W.z - oz * 0.53, rot, 0.9]);
if (!lite || n < 30)
tgvWindows(o).forEach(function (w, i) { if (!near(w.x, w.z))
return; var k = (hx + i) % TGV_WINPICS; wins[k].push([w.x, tgvY(o.x, o.z) + w.y, w.z, w.ry, [w.w, w.h, 1]]); });
var Bd = tgvBody(o);
if (Bd && bulbs.length < (lite ? 1200 : 6000) && Bd.w > 2) {
var fx = W.x - ox * (0.6 - 0.12), fz = W.z - oz * (0.6 - 0.12), ey = gy + Math.min(Bd.h - 0.3, Math.max(2.9, Bd.h * 0.92)), nb2 = Math.max(4, Math.round(Bd.w / 0.55)), cu = Bd.cx;
for (var q = 0; q <= nb2; q++) {
var u = cu - Bd.w / 2 + 0.2 + (Bd.w - 0.4) * q / nb2, f = (q * 0.55) % 2.2 / 2.2, sag = Math.sin(f * Math.PI) * 0.3;
bulbs.push([fx + sx * u, ey - sag, fz + sz * u, 0, 1, TGV_BULB[(q + hx) % TGV_BULB.length]]);
}
}
if (leaves.length < leafCap && hx % 2 === 0)
drift(W.x + ox * 2.2, W.z + oz * 2.2, lite ? 3 : 8, 1.8, hx);
if (n < (lite ? 4 : 12)) {
var key = "tgv:d" + Math.round(o.x) + ":" + Math.round(o.z);
D.glows.push(key);
if (typeof nightGlowSpot === "function")
nightGlowSpot(key, { x: W.x + ox * 0.8, y: gy + 2.6, z: W.z + oz * 0.8, col: 0xFFC070, k: 0.8, r: 7, pri: 1.1 });
}
});
lamps.sort(function (p, q) { return p.d - q.d; });
lamps = lamps.slice(0, lite ? 40 : 140);
lamps.forEach(function (L, n) { var o = L.o, r = o.rot || 0; if (n % 2 === 0)
add(shock, o.x, o.z, n, 0.72);
else {
var x = o.x + Math.cos(r) * 0.55, z = o.z - Math.sin(r) * 0.55;
add(pump, x, z, r, 0.6);
} });
var clusters = 0, cap = lite ? 5 : 14;
function free(x, z, r) { if (tgvBlocked(x, z))
return false; for (var i = 0; i < obs.length; i++) {
var q = obs[i];
if (Math.hypot(q.x - x, q.z - z) < q.r + r)
return false;
} return true; }
TGV_GRASS.forEach(function (band) {
if (dc + reach < band[0] || dc - reach > band[1])
return;
for (var r = band[0] + 14; r < band[1] - 10; r += 26) {
if (tgvNearStreet(r, 9))
continue;
var span = reach / r, k0 = Math.ceil((ac - span) * r / 26), k1 = Math.floor((ac + span) * r / 26);
for (var k = k0; k <= k1; k++) {
var a = k * 26 / r, h = tgvHash(k, r), x = ATLC.x + Math.cos(a) * r, z = ATLC.z + Math.sin(a) * r;
if (!near(x, z))
continue;
if (h % 100 < 30 && leaves.length < leafCap && !tgvBlocked(x, z))
drift(x, z, lite ? 6 : 16, 3.5, h);
if (clusters >= cap || h % 100 >= 11 || !atlClearAt(r, a, 7, 3) || !free(x, z, 6))
continue;
clusters++;
var rot = rotIn(a), c = Math.cos(rot), s = Math.sin(rot), kind = (h >>> 8) % 3;
var at = function (u, v) { return [x + u * c + v * s, z - u * s + v * c]; };
if (kind === 0) {
[[-0.6, 0, 0], [0.6, 0, 0], [0, 0, 0.46]].forEach(function (b) { var p = at(b[0], b[1]); add(bale, p[0], p[1], rot, 1, tgvY(p[0], p[1]) + b[2]); });
var t1 = at(0, 0);
add(pump, t1[0], t1[1], rot, 0.8, tgvY(t1[0], t1[1]) + 0.92);
[[-1.4, 0.9], [1.3, 0.8], [0.2, 1.1], [-0.6, 1.3]].forEach(function (g, i) { var p = at(g[0], g[1]); add(i % 2 ? pump : gourd, p[0], p[1], rot + i, 0.7 + i * 0.12); });
var ps = at(-1.8, -0.4);
add(shock, ps[0], ps[1], h);
var ps2 = at(1.8, -0.4);
add(shock, ps2[0], ps2[1], h + 1);
}
else if (kind === 1) {
for (var q = 0; q < 10; q++) {
var p = at(-2 + (q % 5) * 1.0, (q < 5 ? -0.6 : 0.6) + ((q * 7) % 3 - 1) * 0.15);
add(pump, p[0], p[1], rot + q, 0.8 + ((q * 5) % 4) * 0.15);
}
var pb = at(0, -1.8);
add(bale, pb[0], pb[1], rot);
var pm = at(-1.4, 1.8);
add(mums, pm[0], pm[1], rot);
var pm2 = at(1.4, 1.8);
add(mums, pm2[0], pm2[1], rot);
}
else {
add(shock, x, z, h, 1.15);
for (var q2 = 0; q2 < 6; q2++) {
var la = q2 / 6 * Math.PI * 2, p3 = [x + Math.cos(la) * 1.3, z + Math.sin(la) * 1.3];
add(q2 % 2 ? mums : pump, p3[0], p3[1], la, q2 % 2 ? 1 : 0.7);
}
}
}
}
});
tgvPumpkins(G, pump);
tgvGourds(G, gourd);
tgvMums(G, mums);
tgvInst(G, tgvGeo("bale"), tgvMat("bale"), bale);
tgvInst(G, tgvGeo("shock"), tgvMat("shock"), shock.map(function (p) { return [p[0], p[1], p[2], p[3], p[4]]; }));
tgvInst(G, tgvGeo("wreath"), tgvMat("wreath"), wreaths);
wins.forEach(function (L, k) { tgvInst(G, tgvGeo("win"), tgvMat("win" + k), L); });
tgvLeaves(G, leaves);
tgvInst(G, tgvGeo("bulb"), tgvMat("bulb"), bulbs, true);
var nw = 0;
wins.forEach(function (L) { nw += L.length; });
D.counts = { bulbs: bulbs.length, pumpkins: pump.length, gourds: gourd.length, bales: bale.length, shocks: shock.length, mums: mums.length, leaves: leaves.length, wreaths: wreaths.length, windows: nw, doors: bl.length, lamps: lamps.length, clusters: clusters };
}
function tgvMine(m) { m.userData.tgvMine = true; m.raycast = function () { }; return m; }
function tgvPlazaObs() {
if (TGV.pobs)
return TGV.pobs;
var obs = [];
store.objects.forEach(function (o) {
if (o.realm !== ATLC.id || !KIT[o.archetype] || KIT[o.archetype].cat === "being")
return;
var d = Math.hypot(o.x - ATLC.x, o.z - ATLC.z);
if (d > 140)
return;
var k = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1;
obs.push({ x: o.x, z: o.z, r: Math.max(k.size[0] * ((o.attrs && o.attrs.w) || 1), k.size[2] * ((o.attrs && o.attrs.d) || 1)) * s * 0.5 });
});
try {
if (typeof festLayout === "function")
festLayout().forEach(function (q) { obs.push({ x: q.x, z: q.z, r: q.rad + 1 }); });
}
catch (e) { }
var sp = tgvAt(58, -Math.PI / 2);
obs.push({ x: sp.x, z: sp.z, r: 12 });
if (store.objects.length)
TGV.pobs = obs;
return obs;
}
function tgvHornSpot() {
if (TGV.horn)
return TGV.horn;
var obs = tgvPlazaObs(), got = null;
for (var k = 0; k < 160 && !got; k++) {
var a = Math.PI + 0.17 + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 0.02, R = [97, 104, 90][Math.floor(k / 80) % 3], p = tgvAt(R, a);
if (!atlClearAt(R, a, 4, 3))
continue;
var bad = false;
obs.forEach(function (o) { if (!bad && Math.hypot(o.x - p.x, o.z - p.z) < o.r + 4.5)
bad = true; });
if (!bad)
got = { x: p.x, z: p.z, a: a, r: R };
}
if (!got) {
var p2 = tgvAt(97, Math.PI + 0.17);
got = { x: p2.x, z: p2.z, a: Math.PI + 0.17, r: 97 };
}
if (TGV.pobs)
TGV.horn = got;
return got;
}
function tgvKeeperSpot() { var H = tgvHornSpot(), a = H.a + 9 / H.r, p = tgvAt(H.r, a); return { x: p.x, z: p.z, a: a, r: H.r }; }
function tgvHorn(G, x, z, rot, sc) {
var g = new THREE.Group();
g.position.set(x, tgvY(x, z), z);
g.rotation.y = rot;
g.scale.setScalar(sc);
G.add(g);
var pts = [];
for (var i = 0; i <= 24; i++) {
var t = i / 24, a = t * 2.6;
pts.push(new THREE.Vector3(Math.sin(a) * (1.6 - t * 0.6) * -1 - 0.1 * t, 0.05 + Math.pow(t, 1.6) * 1.9 - (t > 0.85 ? (t - 0.85) * 1.2 : 0), Math.cos(a) * (1.4 - t * 0.9) - 1.4));
}
var curve = new THREE.CatmullRomCurve3(pts), tube = new THREE.TubeGeometry(curve, 40, 1, 14, false), p = tube.attributes.position, v = new THREE.Vector3(), c = new THREE.Vector3();
for (var r = 0; r <= 40; r++) {
var t2 = r / 40, rad = 0.95 * Math.pow(1 - t2, 1.25) + 0.03;
curve.getPointAt(t2, c);
for (var s = 0; s <= 14; s++) {
var k = r * 15 + s;
v.fromBufferAttribute(p, k).sub(c).normalize().multiplyScalar(rad * (1 + 0.04 * Math.sin(s * 2.1 + r)));
p.setXYZ(k, c.x + v.x, c.y + v.y, c.z + v.z);
}
}
tube.computeVertexNormals();
var wick = tgvStrawTex().clone();
wick.needsUpdate = true;
wick.wrapS = wick.wrapT = THREE.RepeatWrapping;
wick.repeat.set(10, 2);
TGV.hornTex = wick;
var horn = tgvMine(new THREE.Mesh(tube, new THREE.MeshLambertMaterial({ map: wick, color: 0xB89060, side: THREE.DoubleSide })));
horn.castShadow = true;
g.add(horn);
var mouth = new THREE.Vector3();
curve.getPointAt(0, mouth);
var rim = tgvMine(new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.09, 6, 24), new THREE.MeshLambertMaterial({ color: 0x8A6A3A })));
var tan = curve.getTangentAt(0);
rim.position.copy(mouth);
rim.lookAt(mouth.clone().add(tan));
g.add(rim);
var M = new THREE.Matrix4();
g.updateMatrixWorld(true);
M.copy(g.matrixWorld);
function W(lx, ly, lz) { var q = new THREE.Vector3(lx, ly, lz).applyMatrix4(M); return q; }
var pk = [], gd = [], fr = [], R = tgvRnd(77), cols = [0xB8261A, 0xD8A02A, 0x8AA03A, 0x6A1E3A, 0xC8501A, 0x4A2A5A];
for (var n = 0; n < 26; n++) {
var a = (R() - 0.5) * 2.2, d = 0.4 + R() * 2.4, lx = Math.sin(a) * d * 0.9, lz = 0.4 + Math.cos(a) * d, q = W(lx, 0, lz), y = tgvY(q.x, q.z);
if (n < 9)
pk.push([q.x, y, q.z, R() * 6, (0.55 + R() * 0.5) * sc]);
else if (n < 16)
gd.push([q.x, y, q.z, R() * 6, (1.2 + R() * 0.8) * sc]);
else
fr.push([q.x, y + 0.08 * sc, q.z, 0, (0.9 + R() * 0.5) * sc, cols[n % cols.length]]);
}
for (var m = 0; m < 7; m++) {
var q2 = W((R() - 0.5) * 1.1, 0.15 + R() * 0.7, -0.2 + R() * 0.6);
(m % 2 ? fr : pk).push(m % 2 ? [q2.x, q2.y, q2.z, 0, 1.2 * sc, cols[m % cols.length]] : [q2.x, q2.y - 0.3 * sc, q2.z, R() * 6, 0.55 * sc]);
}
tgvPumpkins(G, pk);
tgvGourds(G, gd);
var fg = new THREE.SphereGeometry(0.12, 10, 8);
tgvMine(tgvInst(G, fg, new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), fr, true));
var gr = [];
[[-0.8, 0.1, 1.3], [0.9, 0.1, 1.6], [0.1, 0.55, 0.2]].forEach(function (b, bi) { for (var j = 0; j < 14; j++) {
var q3 = W(b[0] + (R() - 0.5) * 0.25, b[1] + 0.05 + Math.floor(j / 4) * 0.07, b[2] + (R() - 0.5) * 0.25);
gr.push([q3.x, q3.y, q3.z, 0, 0.5 * sc, bi % 2 ? 0x4A1E4A : 0x8AA03A]);
} });
tgvMine(tgvInst(G, new THREE.SphereGeometry(0.07, 6, 5), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), gr, true));
var wh = [];
for (var w = 0; w < 22; w++) {
var q4 = W((R() - 0.5) * 1.0, 0.3, 0.1 + (R() - 0.5) * 0.4);
wh.push([q4.x, q4.y, q4.z, R() * 6, [0.7 * sc, (1 + R() * 0.5) * sc, 0.7 * sc], 0xE2C470, (R() - 0.5) * 0.6]);
}
var wg = new THREE.CylinderGeometry(0.012, 0.012, 1.4, 3);
wg.translate(0, 0.7, 0);
var eg = new THREE.SphereGeometry(0.05, 5, 4);
eg.scale(1, 3, 1);
eg.translate(0, 1.48, 0);
var both = typeof THREE.BufferGeometryUtils !== "undefined" && THREE.BufferGeometryUtils.mergeBufferGeometries ? THREE.BufferGeometryUtils.mergeBufferGeometries([wg, eg.toNonIndexed ? eg : eg]) : null;
tgvMine(tgvInst(G, wg, new THREE.MeshLambertMaterial({ color: 0xD8B860 }), wh));
tgvMine(tgvInst(G, eg, new THREE.MeshLambertMaterial({ color: 0xE8C870 }), wh));
return g;
}
function tgvMarksDrop() { var M = TGV.marks; if (!M)
return; tgvDrop(M.g); (M.glows || []).forEach(function (k) { if (typeof nightGlowSpot === "function")
nightGlowSpot(k, null); }); if (TGV.hornTex) {
TGV.hornTex.dispose();
TGV.hornTex = null;
} TGV.marks = null; }
function tgvMarksBuild() {
tgvMarksDrop();
var G = new THREE.Group();
G.name = "thanksgiving tower and plaza";
scene.add(G);
var M = TGV.marks = { g: G, glows: [], wash: [] }, lite = tgvLite();
var cx = ATLC.x, cz = ATLC.z, y0 = tgvY(cx, cz);
var bgeo = new THREE.PlaneGeometry(4.6, 104), bl = [[], []];
[0, 1, 2, 3].forEach(function (f) {
var a = f * Math.PI / 2, nx = Math.sin(a), nz = Math.cos(a), tx = Math.cos(a), tz = -Math.sin(a);
[-12.4, 12.4].forEach(function (u, i) { bl[(f + i) % 2].push([cx + nx * 15.75 + tx * u, y0 + 100, cz + nz * 15.75 + tz * u, a, 1]); });
});
bl.forEach(function (L, n) { var m = new THREE.MeshLambertMaterial({ map: tgvBannerTex(n), side: THREE.DoubleSide }); var im = tgvInst(G, bgeo, m, L); if (im)
im.userData.tgvMine = true; });
var wr = [];
[0, 1, 2, 3].forEach(function (f) { var a = f * Math.PI / 2; wr.push([cx + Math.sin(a) * 15.85, y0 + 30, cz + Math.cos(a) * 15.85, a, 17]); });
tgvInst(G, tgvGeo("wreath"), tgvMat("wreath"), wr);
var wcv = document.createElement("canvas");
wcv.width = 8;
wcv.height = 256;
var wx = wcv.getContext("2d"), wgr = wx.createLinearGradient(0, 256, 0, 0);
wgr.addColorStop(0, "rgba(255,190,110,1)");
wgr.addColorStop(0.25, "rgba(255,170,90,.55)");
wgr.addColorStop(0.7, "rgba(255,150,80,.18)");
wgr.addColorStop(1, "rgba(255,140,70,0)");
wx.fillStyle = wgr;
wx.fillRect(0, 0, 8, 256);
var wtex = new THREE.CanvasTexture(wcv);
M.washTex = wtex;
var wmat = new THREE.MeshBasicMaterial({ map: wtex, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false });
M.washMat = wmat;
[0, 1, 2, 3].forEach(function (f) { var a = f * Math.PI / 2, m = new THREE.Mesh(new THREE.PlaneGeometry(31, 150), wmat); m.position.set(cx + Math.sin(a) * 16.05, y0 + 75, cz + Math.cos(a) * 16.05); m.rotation.y = a; m.raycast = function () { }; m.renderOrder = 2; m.userData.tgvMine = true; G.add(m); });
var fl = [];
[0, 1, 2, 3].forEach(function (f) { var a = f * Math.PI / 2; for (var k = -3; k <= 3; k++) {
if (k === 0)
continue;
var u = k * 4.2;
fl.push([cx + Math.sin(a) * 17.6 + Math.cos(a) * u, y0, cz + Math.cos(a) * 17.6 - Math.sin(a) * u, a, 1]);
} });
var lg = new THREE.BoxGeometry(0.7, 0.5, 0.6);
lg.translate(0, 0.25, 0);
var li = tgvInst(G, lg, new THREE.MeshLambertMaterial({ color: 0x2A2A2E, emissive: 0x3A2008 }), fl);
if (li)
li.userData.tgvMine = true;
var bulbs = [], ph = lite ? 2.2 : 1.2;
[0, 1, 2, 3].forEach(function (f) { var a = f * Math.PI / 4 * 2 + Math.PI / 4, R = 22.4; for (var y = 4; y < 150; y += ph)
bulbs.push([cx + Math.sin(a) * R, y0 + y, cz + Math.cos(a) * R, 0, 2, TGV_BULB[Math.floor(y / ph) % TGV_BULB.length]]); });
for (var s = 0; s < 4; s++) {
var a2 = s * Math.PI / 2, nx2 = Math.sin(a2), nz2 = Math.cos(a2), tx2 = Math.cos(a2), tz2 = -Math.sin(a2);
for (var sw = 0; sw < 4; sw++)
for (var q = 0; q <= (lite ? 8 : 16); q++) {
var f2 = q / (lite ? 8 : 16), u2 = -16 + sw * 8 + f2 * 8, sag = Math.sin(f2 * Math.PI) * 1.8;
bulbs.push([cx + nx2 * 18.8 + tx2 * u2, y0 + 147 - sag, cz + nz2 * 18.8 + tz2 * u2, 0, 2, TGV_BULB[(q + sw) % TGV_BULB.length]]);
}
}
tgvInst(G, tgvGeo("bulb"), tgvMat("bulb"), bulbs, true);
var fr = (typeof KIT !== "undefined" && KIT.tierfountain ? Math.max(KIT.tierfountain.size[0], KIT.tierfountain.size[2]) * 1.5 / 2 : 5) + 0.9, ring = [], mm = [], bb = [];
[0.78, 2.36, 3.93, 5.5].forEach(function (fa) {
var f = tgvAt(88, fa), n = lite ? 12 : 20;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, x = f.x + Math.cos(a) * fr, z = f.z + Math.sin(a) * fr;
(i % 2 ? mm : ring).push([x, tgvY(x, z), z, a + Math.PI / 2 + Math.PI, i % 2 ? 1.1 : 0.85 + ((i * 7) % 4) * 0.12]);
}
[0, 1, 2, 3].forEach(function (q) {
var a = q * Math.PI / 2 + fa + Math.PI / 4, R = fr + 2.4, bx = f.x + Math.cos(a) * R, bz = f.z + Math.sin(a) * R, yb = tgvY(bx, bz), ro = a + Math.PI / 2;
bb.push([bx, yb, bz, ro, 1]);
bb.push([bx + Math.cos(a) * 0.55, yb, bz + Math.sin(a) * 0.55, ro, 1]);
bb.push([bx + Math.cos(a) * 0.27, yb + 0.46, bz + Math.sin(a) * 0.27, ro, 1]);
ring.push([bx + Math.cos(a) * 0.27, yb + 0.92, bz + Math.sin(a) * 0.27, ro, 0.8]);
ring.push([bx + Math.cos(a + 1.4) * 1.1, yb, bz + Math.sin(a + 1.4) * 1.1, ro, 1.05]);
});
});
tgvPumpkins(G, ring);
tgvMums(G, mm);
tgvInst(G, tgvGeo("bale"), tgvMat("bale"), bb);
var H = tgvHornSpot();
tgvHorn(G, H.x, H.z, rotIn(H.a) + Math.PI, lite ? 2.3 : 2.6);
M.horn = { x: H.x, z: H.z };
M.glows.push("tgv:horn");
if (typeof nightGlowSpot === "function")
nightGlowSpot("tgv:horn", { x: H.x + Math.sin(rotIn(H.a)) * 3, y: tgvY(H.x, H.z) + 2.5, z: H.z + Math.cos(rotIn(H.a)) * 3, col: 0xFFB060, k: 1.6, r: 18, pri: 2 });
tgvKeeperBuild(G);
var obs = tgvPlazaObs(), rimM = [], rimP = [], poles = [], swag = [];
function clearAt(x, z, r) { for (var i = 0; i < obs.length; i++)
if (Math.hypot(obs[i].x - x, obs[i].z - z) < obs[i].r + r)
return false; return true; }
for (var ri = 0; ri < Math.PI * 2; ri += (lite ? 9 : 5) / 137) {
var rp = tgvAt(137, ri);
if (!atlClearAt(137, ri, 0.6, 0.5) || !clearAt(rp.x, rp.z, 0.8))
continue;
var k3 = Math.round(ri * 137 / 5);
(k3 % 2 ? rimP : rimM).push([rp.x, tgvY(rp.x, rp.z), rp.z, rotIn(ri), 1]);
}
for (var pi = 0; pi < Math.PI * 2 - 0.001; pi += 13 / 78) {
var pp = tgvAt(78, pi);
poles.push(atlClearAt(78, pi, 1, 1) && clearAt(pp.x, pp.z, 1.2) ? [pp.x, tgvY(pp.x, pp.z), pp.z] : null);
}
if (typeof evtPolesAndBunting === "function" && !(typeof festOn === "function" && festOn()))
try {
evtPolesAndBunting(G, poles, TGV_FLAGS, true);
}
catch (e) { }
var phh = typeof KIT !== "undefined" && KIT.hubpillar ? KIT.hubpillar.size[1] : 9;
for (var p12 = 0; p12 < 12; p12++) {
var a1 = (p12 / 12) * Math.PI * 2 + 0.13, a3 = ((p12 + 1) / 12) * Math.PI * 2 + 0.13, A = tgvAt(40.8, a1), B = tgvAt(40.8, a3);
for (var q5 = 1; q5 < 24; q5++) {
var f5 = q5 / 24;
swag.push([A.x + (B.x - A.x) * f5, y0 + phh * 0.85 - Math.sin(f5 * Math.PI) * 2.2, A.z + (B.z - A.z) * f5, 0, 1.6, TGV_BULB[q5 % TGV_BULB.length]]);
}
}
tgvMums(G, rimM);
tgvPumpkins(G, rimP);
tgvInst(G, tgvGeo("bulb"), tgvMat("bulb"), swag, true);
if (typeof ATL_STAIRS !== "undefined") {
var mains = ATL_STAIRS.filter(function (s) { return s.main; }), R = 136, pil = [], beam = [], tops = [], sh = [];
mains.forEach(function (s) {
var w = s.half + 0.3, rot2 = rotAlong(s.a);
[-1, 1].forEach(function (sd) { var p = tgvAt(R, s.a + sd * w / R), yy = tgvY(p.x, p.z); pil.push([p.x, yy, p.z, rot2, 1]); sh.push([p.x + Math.cos(s.a) * 0.6, yy, p.z + Math.sin(s.a) * 0.6, sd, 1.4]); });
var c = tgvAt(R, s.a), yc = tgvY(c.x, c.z);
beam.push([c.x, yc + 7.6, c.z, rotIn(s.a), 1]);
for (var k = -3; k <= 3; k++) {
var p2 = tgvAt(R, s.a + k * 2.3 / R);
tops.push([p2.x, yc + 8.1, p2.z, rotIn(s.a) + Math.PI, 0.9]);
}
});
var wood = new THREE.MeshLambertMaterial({ color: 0x5A3A22 });
var pm = tgvInst(G, new THREE.BoxGeometry(0.8, 8.2, 0.8).translate(0, 4.1, 0), wood, pil);
if (pm)
pm.userData.tgvMine = true;
var bm = tgvInst(G, new THREE.BoxGeometry(2 * (mains[0] ? mains[0].half : 8) + 1.6, 0.8, 0.7), wood, beam);
if (bm)
bm.userData.tgvMine = true;
tgvPumpkins(G, tops);
tgvInst(G, tgvGeo("shock"), tgvMat("shock"), sh);
var sm = new THREE.MeshBasicMaterial({ map: tgvSignTex("Thanksgiving in Somnucor", "the Scepter Hunt starts at the Great Cornucopia"), side: THREE.DoubleSide, fog: true }), sg = new THREE.PlaneGeometry(9, 2.25);
mains.forEach(function (s) { var c = tgvAt(R + 0.45, s.a), m = new THREE.Mesh(sg, sm); m.position.set(c.x, tgvY(c.x, c.z) + 6.3, c.z); m.rotation.y = rotIn(s.a); tgvMine(m); G.add(m); });
}
}
function tgvWashTick(dt) {
var M = TGV.marks;
if (!M || !M.washMat)
return;
var night = typeof cityHourNow === "function" && typeof isNightHour === "function" && isNightHour(cityHourNow()), want = night ? 0.55 : 0;
var o = M.washMat.opacity;
M.washMat.opacity = o + (want - o) * Math.min(1, dt * 0.4);
M.washMat.visible = M.washMat.opacity > 0.01;
}
function tgvLeafIcon(u, v) { return __ZC(365, 0, this, arguments, new.target); }
var TGV_TOWER_LOOK = { name: "Thanksgiving amber and gold", beams: ["#FFB45A", "#FF8A2A", "#FFE2A8", "#E0602A"], motion: "still", drift: true, bright: 2, pic: "tgvleaf", text: "THANKS", wc: ["#FF7A1E", "#C8321E", "#FFD25A"] };
function tgvTowerLights(on) {
if (typeof NLT_ICON !== "undefined" && !NLT_ICON.tgvleaf) {
NLT_ICON.tgvleaf = tgvLeafIcon;
if (typeof NLT_PIC_NAMES !== "undefined")
NLT_PIC_NAMES.tgvleaf = "Maple leaf (Thanksgiving)";
}
if (typeof nightLightsPush !== "function" || TGV.towerPushed === on)
return;
TGV.towerPushed = on;
nightLightsPush("thanksgiving", on ? TGV_TOWER_LOOK : null);
}
function tgvRingName(r) { if (typeof ATL_RINGS === "undefined")
return "the city"; for (var i = 0; i < ATL_RINGS.length; i++)
if (r >= ATL_RINGS[i].S - 10 && r < ATL_RINGS[i].E + 10)
return ATL_RINGS[i].name; return "the city"; }
function tgvWay(dx, dz) { return typeof compassWord === "function" && typeof bearingOfHeading === "function" ? compassWord(bearingOfHeading(Math.atan2(-dx, -dz))) : ""; }
function tgvHuntSpots() {
var yr = tgvSpan().day.getFullYear(), H = TGV.hunt;
if (H && H.yr === yr && H.L.length)
return H;
var rnd = wRand(yr * 7919 + 1126), bands = (typeof ATL_RINGS !== "undefined" ? ATL_RINGS : []).filter(function (R) { return R.k !== "plaza" && R.k !== "wilds" && !/plaza|wilds/i.test(R.name); }), L = [];
for (var n = 0; n < TGV_HUNT_N && bands.length; n++) {
var B = bands[n % bands.length], got = null;
for (var t = 0; t < 80 && !got; t++) {
var r = B.S + 10 + rnd() * (B.E - B.S - 20), a = rnd() * Math.PI * 2, p = tgvAt(r, a);
if (!atlClearAt(r, a, 1, 1) || tgvNearStreet(r, 1) || tgvBlocked(p.x, p.z))
continue;
if (L.some(function (q) { return Math.hypot(q.x - p.x, q.z - p.z) < 120; }))
continue;
got = { x: p.x, z: p.z, r: r, i: n };
}
if (got)
L.push(got);
}
H = TGV.hunt = { yr: yr, L: L, m: {} };
return H;
}
function tgvHuntLose(g) { if (g.parent)
g.parent.remove(g); try {
g.userData.glow.material.dispose();
}
catch (e) { } }
function tgvHuntDrop() { var H = TGV.hunt; if (!H)
return; for (var k in H.m)
tgvHuntLose(H.m[k]); H.m = {}; }
var TGV_GOLD = null;
function tgvGold() { return TGV_GOLD || (TGV_GOLD = new THREE.MeshPhongMaterial({ color: 0xD8A838, specular: 0xFFF0C0, shininess: 90, emissive: 0x3A2400 })); }
function tgvPieceMesh(i) { return __ZC(365, 1, this, arguments, new.target); }
function tgvHuntTick(dt, show) {
if (!show || typeof ATLC === "undefined" || !ATLC) {
tgvHuntDrop();
return null;
}
var H = tgvHuntSpots(), mine = tgvData(), P = camera.position, best = null, t = performance.now() / 1000;
if (mine.scepter) {
tgvHuntDrop();
return null;
}
H.L.forEach(function (s) {
var found = mine.got.indexOf(s.i) >= 0, d = Math.hypot(P.x - s.x, P.z - s.z), g = H.m[s.i];
if (found || d > 70) {
if (g) {
tgvHuntLose(g);
delete H.m[s.i];
}
return;
}
if (!g) {
g = tgvPieceMesh(s.i);
scene.add(g);
H.m[s.i] = g;
}
g.position.set(s.x, tgvY(s.x, s.z) + 1.0 + Math.sin(t * 1.1 + s.i) * 0.08, s.z);
g.rotation.y = t * 0.6 + s.i;
if (d < 2.8)
best = s;
});
return best;
}
function tgvHuntTake(s) { return __ZC(365, 2, this, arguments, new.target); }
function tgvKeeperBuild(G) {
var K = tgvKeeperSpot(), y = tgvY(K.x, K.z), rot = rotIn(K.a), g = new THREE.Group();
g.position.set(K.x, y, K.z);
g.rotation.y = rot;
g.name = "harvest keeper";
G.add(g);
var wood = new THREE.MeshLambertMaterial({ color: 0x6A4428 }), cloth = new THREE.MeshLambertMaterial({ color: 0xE8DCC0 });
function box(w, h, d, mat, x, yy, z) { var m = tgvMine(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)); m.position.set(x, yy, z); g.add(m); return m; }
box(3.2, 0.08, 1.1, wood, 0, 0.92, 0.9);
box(3.24, 0.5, 1.14, cloth, 0, 0.7, 0.9);
[[-1.5, 0.45], [1.5, 0.45], [-1.5, 1.35], [1.5, 1.35]].forEach(function (q) { box(0.08, 0.9, 0.08, wood, q[0], 0.45, q[1]); });
box(0.12, 3, 0.12, wood, -1.7, 1.5, -0.2);
box(0.12, 3, 0.12, wood, 1.7, 1.5, -0.2);
box(3.6, 0.14, 0.14, wood, 0, 3, -0.2);
var sign = tgvMine(new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.85), new THREE.MeshBasicMaterial({ map: tgvSignTex("The Harvest Keeper", "the Scepter Hunt: twelve parts, one Scepter"), fog: true })));
sign.position.set(0, 2.55, -0.13);
g.add(sign);
var W = new THREE.Matrix4();
g.updateMatrixWorld(true);
W.copy(g.matrixWorld);
var pk = [[-1.1, 0.96, 0.8], [-0.7, 0.96, 1.1], [1.2, 0.96, 0.75]].map(function (q, i) { var v = new THREE.Vector3(q[0], q[1], q[2]).applyMatrix4(W); return [v.x, v.y, v.z, i, 0.45]; });
tgvPumpkins(G, pk);
var mm = [[-2.2, 0, 1.2], [2.2, 0, 1.2]].map(function (q) { var v = new THREE.Vector3(q[0], q[1], q[2]).applyMatrix4(W); return [v.x, tgvY(v.x, v.z), v.z, 0, 1.1]; });
tgvMums(G, mm);
var stand = tgvMine(new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.12, 12), new THREE.MeshLambertMaterial({ color: 0x7A1E14 })));
stand.position.set(0, 1.02, 0.9);
g.add(stand);
try {
if (typeof wPerson === "function") {
var f = wPerson("tgvharvestkeeper", { title: "Farmer", sex: "f" });
f.position.set(0, 0, -0.05);
f.traverse(function (o) { o.raycast = function () { }; });
g.add(f);
}
}
catch (e) { }
TGV.keeperAt = { x: K.x + Math.sin(rot) * 2.2, z: K.z + Math.cos(rot) * 2.2 };
}
function tgvKeeperCard() { return __ZC(365, 3, this, arguments, new.target); }
function tgvMakeScepter() { return __ZC(365, 4, this, arguments, new.target); }
function tgvScepterModel() { return __ZC(365, 5, this, arguments, new.target); }
function tgvArmsReady() {
if (typeof BW_ARMS === "undefined" || typeof HELD === "undefined" || typeof ARMS === "undefined")
return false;
if (BW_ARMS[TGV_SCEPTER.arm])
return true;
var base = BW_ARMS.mace || BW_ARMS.longsword, A = {};
for (var p in base)
A[p] = base[p];
A.name = TGV_SCEPTER.name;
A.era = "Holiday honours";
A.held = "tgvScepter";
A.dmg = Math.round((A.dmg || 20) * 1.25);
A.reqLv = 5;
HELD.tgvScepter = tgvScepterModel;
BW_ARMS[TGV_SCEPTER.arm] = A;
ARMS["bw_" + TGV_SCEPTER.arm] = { held: "tgvScepter", shot: null, name: "thanksgiving scepter" };
return true;
}
(function () { var n = 0; (function go() { if (tgvArmsReady() || ++n > 40)
return; setTimeout(go, 1500); })(); })();
function tgvScepterOwned() { return (typeof bkpKept === "function" ? bkpKept() : []).some(function (q) { return q.a === "bw_" + TGV_SCEPTER.arm; }); }
function tgvScepterGive() {
tgvArmsReady();
if (typeof bkpKept !== "function" || tgvScepterOwned())
return;
bkpKept().push({ id: "bw_" + TGV_SCEPTER.arm + "_" + (typeof uid === "function" ? uid() : Date.now()), a: "bw_" + TGV_SCEPTER.arm, name: TGV_SCEPTER.name, from: "the Scepter Hunt, Thanksgiving " + new Date().getFullYear() });
tgvSave();
}
function tgvPrompt(html, fn, key) {
if (!html) {
if (TGV.near) {
TGV.near = null;
worldPromptCity(null);
}
return;
}
if (TGV.near !== key) {
TGV.near = key;
worldPromptCity(html, function () { worldPromptCity(null); TGV.near = null; fn(); });
}
}
function tgvCardOpen() { return typeof WLD !== "undefined" && WLD.card && WLD.card.style.display === "block"; }
function tgvTick(dt) {
var city = tgvCity(), season = tgvOn(), show = city && season, P = camera.position;
tgvTowerLights(season);
TGV.on = show;
TGV.lite = tgvLite();
if (!show) {
if (TGV.deco)
tgvDecoDrop();
if (TGV.marks)
tgvMarksDrop();
TGV.cell = null;
tgvHuntDrop();
if (TGV.near)
tgvPrompt(null);
return;
}
if (!TGV.marks)
tgvMarksBuild();
var cs = 80, cell = Math.round(P.x / cs) + ":" + Math.round(P.z / cs);
if (cell !== TGV.cell || !TGV.deco) {
TGV.cell = cell;
tgvDecoBuild(P);
}
tgvWashTick(dt);
var part = tgvHuntTick(dt, true);
if (!TGV.said) {
TGV.said = true;
setTimeout(function () { if (TGV.on)
setStatus("🍂 <b>Somnucor is dressed for Thanksgiving.</b> The Scepter Hunt starts with the Harvest Keeper, by the Great Cornucopia in the Tower Plaza."); }, 4000);
}
TGV.pt += dt;
if (TGV.pt < 0.15)
return;
TGV.pt = 0;
if (tgvCardOpen()) {
tgvPrompt(null);
return;
}
if (part) {
tgvPrompt("🌾 <b>" + esc(TGV_PIECES[part.i][0]) + "</b> · <b>press E</b> to take it", function () { tgvHuntTake(part); }, "part" + part.i);
return;
}
var K = TGV.keeperAt;
if (K && Math.hypot(P.x - K.x, P.z - K.z) < 3.4) {
tgvPrompt("🌾 <b>The Harvest Keeper</b> · <b>press E</b> to talk about the Scepter Hunt", tgvKeeperCard, "keeper");
return;
}
tgvPrompt(null);
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
tgvTick(dt);
}
catch (e) {
if (!TGV.warned) {
TGV.warned = true;
if (window.console)
console.warn("thanksgiving city:", e);
}
} };
})();
setTimeout(function () {
try {
if (!/[?&]ktgv=1/.test(location.search))
return;
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return;
clearInterval(iv);
TGV.prev = true;
TGV.cell = null;
setStatus("🍂 <b>Keeper preview:</b> Somnucor dressed for Thanksgiving, as dreamers see it in season. The Harvest Keeper's card turns the preview off.");
}, 1500);
}
catch (e) { }
}, 3000);
function tgvStats() { return { on: TGV.on, season: tgvOn(), deco: TGV.deco && TGV.deco.counts, marks: !!TGV.marks, hunt: TGV.hunt && TGV.hunt.L.length, got: tgvData().got.length, scepter: !!tgvData().scepter, owned: tgvScepterOwned(), tower: !!TGV.towerPushed }; }
