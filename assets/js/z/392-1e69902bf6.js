/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(392, function () {
"use strict";
return [
function (u, v) {
if (Math.abs(u + 0.05) < 0.09 && v > 0.6 && v < 0.95)
return 2;
if ((u * u) / (0.97 * 0.97) + ((v + 0.02) * (v + 0.02)) / (0.68 * 0.68) >= 1)
return 0;
var au = Math.abs(u), dy = v - 0.02;
if (dy > 0 && dy < 0.3 && Math.abs(au - 0.38) < (0.3 - dy) * 0.75)
return 0;
if (au < 0.1 && v > -0.16 && v < -0.02)
return 0;
var q = (u / 0.62) * (u / 0.62), lo = -0.56 + 0.3 * q, hi = -0.3 + 0.28 * q;
if (au < 0.62 && v > lo && v < hi && !(au < 0.12 && v > hi - 0.12) && !(Math.abs(au - 0.34) < 0.07 && v < lo + 0.1))
return 0;
return Math.abs(au - 0.45) < 0.035 ? 0 : 1;
},
function (u, v) {
var moon = u * u + v * v < 0.9 * 0.9;
var x = u + 0.05, y = v + 0.2;
var body = (x * x) / (0.32 * 0.32) + ((y + 0.25) * (y + 0.25)) / (0.42 * 0.42) < 1, head = x * x + (y - 0.35) * (y - 0.35) < 0.22 * 0.22;
var ears = y > 0.45 && y < 0.68 && Math.abs(Math.abs(x) - 0.13) < (0.68 - y) * 0.45, tail = Math.abs(u - 0.38 - 0.08 * Math.sin(v * 6)) < 0.05 && v > -0.8 && v < -0.05;
if (body || head || ears || tail)
return (head && Math.abs(Math.abs(x) - 0.08) < 0.04 && Math.abs(y - 0.36) < 0.04) ? 3 : 0;
return moon ? 1 : 0;
},
function (u, v) {
var au = Math.abs(u);
if (Math.abs(au) < 0.12 && v < -0.7 && v > -0.95)
return 3;
if ((u * u + (v - 0.86) * (v - 0.86)) < 0.13 * 0.13)
return 2;
var tiers = [[0.75, 0.2, 0.32], [0.35, -0.25, 0.6], [-0.05, -0.7, 0.85]];
for (var i = 0; i < tiers.length; i++) {
var t = tiers[i];
if (v <= t[0] && v >= t[1] && au <= (t[0] - v) / (t[0] - t[1]) * t[2] + 0.04) {
var b = Math.round(u * 7) + Math.round(v * 9);
return (b % 5 === 0 && au < (t[0] - v) / (t[0] - t[1]) * t[2] - 0.06) ? 3 : 1;
}
}
return 0;
},
function (look) {
var C = NLT_COLS, R = NLT_ROWS, g = [], r, c;
for (r = 0; r < R; r++) {
g.push(new Array(C).fill(0));
}
if (!look)
return g;
if (look.pic === "paint" && Array.isArray(look.paint)) {
for (r = 0; r < R; r++) {
var row = String(look.paint[r] || "");
for (c = 0; c < C; c++) {
var n = row.charCodeAt(c) - 48;
g[r][c] = (n >= 1 && n <= 3) ? n : 0;
}
}
return g;
}
var icon = NLT_ICON[look.pic], txt = nltText(look.text), side = Math.round(C / NLT_ASPECT), top = 2;
if (icon) {
var r0 = txt ? 6 : Math.round((R - side * 1.6) / 2), big = txt ? 1 : 1.6, hh = Math.round(side * big), ww = Math.round(C * Math.min(1, big));
for (r = 0; r < hh; r++)
for (c = 0; c < C; c++) {
var u = ((c + 0.5) / C * 2 - 1) * (C / ww), v = 1 - (r + 0.5) / hh * 2;
if (Math.abs(u) > 1)
continue;
var k = 0;
try {
k = icon(u, v) | 0;
}
catch (e) { }
if (k && r0 + r < R)
g[r0 + r][c] = k;
}
top = r0 + hh + 6;
}
if (txt) {
var lh = 14, gap = 1, sx = 4, n = txt.length, room = Math.floor((R - top - 2) / (lh + gap));
for (var i = 0; i < Math.min(n, room); i++) {
var f = NLT_FONT[txt[i]];
if (!f)
continue;
for (r = 0; r < 7; r++)
for (c = 0; c < 5; c++)
if (f[r * 5 + c] === "1")
for (var dy = 0; dy < 2; dy++)
for (var dx = 0; dx < sx; dx++) {
var gr = top + i * (lh + gap) + r * 2 + dy, gc = Math.floor((C - 5 * sx) / 2) + c * sx + dx;
if (gr < R && gc >= 0 && gc < C)
g[gr][gc] = icon ? 3 : 1;
}
}
}
return g;
},
function (cv, look, office, px) {
px = px || 6;
var py = Math.round(px * NLT_ASPECT), C = NLT_COLS, R = NLT_ROWS, g = nltGrid(look), cx = cv.getContext("2d"), wc = (look && look.wc) || ["#FFD27A", "#FFFFFF", "#FFE8A0"];
cv.width = C * px;
cv.height = R * py;
cx.fillStyle = "#0A0E16";
cx.fillRect(0, 0, cv.width, cv.height);
var pic = look && look.pic && look.pic !== "none";
for (var r = 0; r < R; r++)
for (var c = 0; c < C; c++) {
var k = g[r][c], col;
if (k)
col = wc[k - 1] || wc[0];
else {
var h = ((r * 73856093) ^ (c * 19349663)) >>> 0;
col = (!pic || office) && h % (pic ? 11 : 4) === 0 ? (h % 3 ? "#6A5A3A" : "#3A4A5A") : "#151C28";
}
cx.fillStyle = col;
cx.fillRect(c * px + 1, r * py + 1, px - 2, py - (px > 4 ? 3 : 2));
}
return cv;
}
];
});
