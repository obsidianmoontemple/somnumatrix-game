/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(455, function () {
"use strict";
return [
function () {
var by = {}, out = [];
WM_NODES.forEach(function (N) { by[N.k] = N; });
var ringN = { city: 0, hall: 0 };
WM_NODES.forEach(function (N) { if (N.at && N.at.ring)
ringN[N.at.ring]++; });
function place(N, depth) {
if (N._p)
return N._p;
if (depth > 6)
return { x: 0, y: 0 };
var a = N.at, p;
if (Array.isArray(a))
p = { x: a[0], y: a[1] };
else if (a.ring) {
var c = a.ring === "city" ? WM_CITY : WM_HALL, R = a.ring === "city" ? 385 : 335, n = ringN[a.ring] || 1, t = -Math.PI / 2 + a.i * Math.PI * 2 / n;
p = { x: c.x + Math.cos(t) * R, y: c.y + Math.sin(t) * R };
}
else if (a.orbit) {
var t2 = a.a * Math.PI / 180;
p = { x: WM_SUN.x + Math.cos(t2) * a.orbit, y: WM_SUN.y + Math.sin(t2) * a.orbit };
}
else if (a.sat && by[a.sat]) {
var q = place(by[a.sat], depth + 1), t3 = a.a * Math.PI / 180;
p = { x: q.x + Math.cos(t3) * a.d, y: q.y + Math.sin(t3) * a.d };
}
else
p = { x: WM_W / 2, y: WM_H - 40 };
N._p = p;
return p;
}
WM_NODES.forEach(function (N) { N._p = null; });
WM_NODES.forEach(function (N) {
var p = place(N, 0);
var r = N.planet ? N.planet.r + 6 : N.big ? 58 : (N.at && N.at.sat) ? 26 : 34;
out.push({ N: N, k: N.k, x: p.x, y: p.y, r: r, sat: !!(N.at && N.at.sat), par: N.at && N.at.sat || null });
});
var extra = 0;
if (typeof DGR_WORLDS !== "undefined")
DGR_WORLDS.forEach(function (r) {
if (by[r[0]])
return;
var N = { k: r[0], n: String(r[1]).replace(/\s*\(.*$/, ""), s: String(r[1]), e: "✦", c: "#C9A868", how: "Ask about it in the city: it is new." };
out.push({ N: N, k: N.k, x: 1240 + extra * 150, y: 2050, r: 28, also: 1 });
extra++;
});
return out;
},
function () {
var rnd = wmRandom(90210), D = { waves: [], stars: [], trees: [], hills: [], clouds: [], lands: {} };
for (var i = 0; i < 520; i++)
D.waves.push([rnd() * WM_W, rnd() * WM_H, 10 + rnd() * 16]);
WM_REGIONS.forEach(function (R) {
var cx = R[2] + R[4] / 2, cy = R[3] + R[5] / 2;
if (R[6] === "land")
D.lands[R[0]] = wmBlob(cx, cy, R[4] / 2, R[5] / 2, rnd, 0.06, 64);
if (R[6] === "mist")
D.lands[R[0]] = wmBlob(cx, cy, R[4] / 2, R[5] / 2, rnd, 0.05, 64);
if (R[6] === "deep")
D.lands[R[0]] = wmBlob(cx, cy, R[4] / 2, R[5] / 2, rnd, 0.05, 56);
if (R[6] === "cloud")
for (var c = 0; c < 70; c++) {
var a = rnd() * Math.PI * 2, d = Math.sqrt(rnd());
D.clouds.push([cx + Math.cos(a) * d * R[4] * 0.48, cy + Math.sin(a) * d * R[5] * 0.42, 40 + rnd() * 70]);
}
});
D.lands.city = wmBlob(WM_CITY.x, WM_CITY.y, 520, 500, rnd, 0.05, 72);
var pos = WM.pos;
function clear(x, y, m) { for (var i = 0; i < pos.length; i++) {
var P = pos[i];
if (Math.hypot(P.x - x, P.y - y) < P.r + m)
return false;
} return true; }
["stories", "far", "city"].forEach(function (k) {
var L = D.lands[k], xs = L.map(function (p) { return p[0]; }), ys = L.map(function (p) { return p[1]; });
var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
for (var t = 0; t < (k === "city" ? 110 : 150); t++) {
var x = x0 + rnd() * (x1 - x0), y = y0 + rnd() * (y1 - y0);
if (!wmInPoly(L, x, y) || !clear(x, y, 46))
continue;
if (k === "city" && Math.hypot(x - WM_CITY.x, y - WM_CITY.y) < 150)
continue;
if (rnd() < 0.32)
D.hills.push([x, y, 14 + rnd() * 14]);
else
D.trees.push([x, y, 5 + rnd() * 5]);
}
});
var S = WM_REGIONS.filter(function (R) { return R[0] === "space"; })[0];
for (var s = 0; s < 760; s++)
D.stars.push([S[2] + rnd() * S[4], S[3] + rnd() * S[5], rnd() < 0.08 ? 2.4 : rnd() < 0.3 ? 1.5 : 0.9, 0.35 + rnd() * 0.65]);
return D;
},
function (g, s) {
var D = WM.deco, pos = WM.pos;
var sea = g.createLinearGradient(0, 0, 0, WM_H);
sea.addColorStop(0, "#16384A");
sea.addColorStop(0.5, "#1C4A5E");
sea.addColorStop(1, "#12303E");
g.fillStyle = sea;
g.fillRect(0, 0, WM_W, WM_H);
g.strokeStyle = "rgba(190,230,240,0.13)";
g.lineWidth = 1.6;
D.waves.forEach(function (w) { g.beginPath(); g.arc(w[0], w[1], w[2], Math.PI * 1.15, Math.PI * 1.85); g.stroke(); });
WM_REGIONS.forEach(function (R) { wmRegion(g, R, s); });
wmLand(g, D.lands.city, "#6E9A52", "#4E7A3A");
wmRoutes(g, s);
g.setLineDash([3, 9]);
g.lineWidth = 2;
g.strokeStyle = "rgba(255,236,190,0.45)";
g.beginPath();
g.arc(WM_CITY.x, WM_CITY.y, 385, 0, Math.PI * 2);
g.stroke();
g.strokeStyle = "rgba(230,210,255,0.45)";
g.beginPath();
g.arc(WM_HALL.x, WM_HALL.y, 335, 0, Math.PI * 2);
g.stroke();
g.setLineDash([]);
g.lineWidth = 1.6;
g.strokeStyle = "rgba(255,240,200,0.45)";
pos.forEach(function (P) { if (!P.par)
return; var Q = wmNodeOf(P.par); if (!Q)
return; g.beginPath(); g.moveTo(Q.x, Q.y); g.lineTo(P.x, P.y); g.stroke(); });
wmCityEmblem(g, WM_CITY.x, WM_CITY.y, 150);
pos.forEach(function (P) { if (P.k !== "city")
wmNodeDraw(g, P, s); });
pos.forEach(function (P) { wmLabel(g, P, s); });
if (typeof wmsDraw === "function")
wmsDraw(g, s);
wmCompass(g, 2150, 1520, 70);
wmTitle(g);
},
function (g, L, a, b) {
g.save();
wmPath(g, L);
g.shadowColor = "rgba(0,0,0,0.35)";
g.shadowBlur = 24;
g.fillStyle = a;
g.fill();
g.restore();
g.save();
wmPath(g, L);
g.clip();
var xs = L.map(function (p) { return p[0]; }), ys = L.map(function (p) { return p[1]; });
var cx = (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2, cy = (Math.min.apply(null, ys) + Math.max.apply(null, ys)) / 2, rr = Math.max.apply(null, xs) - cx;
var gr = g.createRadialGradient(cx, cy - rr * 0.2, rr * 0.1, cx, cy, rr * 1.1);
gr.addColorStop(0, "rgba(255,248,220,0.28)");
gr.addColorStop(1, "rgba(0,0,0,0.12)");
g.fillStyle = gr;
g.fillRect(cx - rr * 1.3, cy - rr * 1.3, rr * 2.6, rr * 2.6);
g.restore();
wmPath(g, L);
g.lineWidth = 7;
g.strokeStyle = "rgba(232,214,160,0.85)";
g.stroke();
wmPath(g, L);
g.lineWidth = 2;
g.strokeStyle = b;
g.stroke();
},
function (g, R, s) {
var D = WM.deco, k = R[6], x = R[2], y = R[3], w = R[4], h = R[5];
if (k === "land") {
wmLand(g, D.lands[R[0]], R[0] === "stories" ? "#8AA85E" : "#7A9A54", "#4E6A3A");
D.hills.forEach(function (H) { if (H[0] < x || H[0] > x + w || H[1] < y || H[1] > y + h)
return; wmHill(g, H[0], H[1], H[2]); });
D.trees.forEach(function (T) { if (T[0] < x || T[0] > x + w || T[1] < y || T[1] > y + h)
return; wmTree(g, T[0], T[1], T[2]); });
}
else if (k === "mist") {
var L = D.lands[R[0]];
g.save();
wmPath(g, L);
g.clip();
var gr = g.createRadialGradient(WM_HALL.x, WM_HALL.y, 30, WM_HALL.x, WM_HALL.y, 520);
gr.addColorStop(0, "#5A4A8A");
gr.addColorStop(0.6, "#3A3A6A");
gr.addColorStop(1, "#26305A");
g.fillStyle = gr;
g.fillRect(x - 60, y - 60, w + 120, h + 120);
g.restore();
wmPath(g, L);
g.lineWidth = 3;
g.strokeStyle = "rgba(200,180,255,0.55)";
g.stroke();
for (var i = 0; i < 14; i++) {
var t = -Math.PI / 2 + i * Math.PI * 2 / 14;
g.strokeStyle = "rgba(255,236,190,0.16)";
g.lineWidth = 10;
g.beginPath();
g.moveTo(WM_HALL.x + Math.cos(t) * 70, WM_HALL.y + Math.sin(t) * 70);
g.lineTo(WM_HALL.x + Math.cos(t) * 300, WM_HALL.y + Math.sin(t) * 300);
g.stroke();
}
}
else if (k === "cloud") {
var cx = x + w / 2, cy = y + h / 2;
var gl = g.createRadialGradient(cx, cy, 10, cx, cy, w * 0.6);
gl.addColorStop(0, "rgba(255,244,200,0.75)");
gl.addColorStop(1, "rgba(255,244,200,0)");
g.fillStyle = gl;
g.fillRect(x - w * 0.2, y - h * 0.3, w * 1.4, h * 1.6);
g.save();
g.globalAlpha = 0.18;
g.fillStyle = "#FFF4D0";
for (var r = 0; r < 16; r++) {
var a = r / 16 * Math.PI * 2;
g.beginPath();
g.moveTo(cx, cy);
g.lineTo(cx + Math.cos(a - 0.05) * w * 0.62, cy + Math.sin(a - 0.05) * h * 0.75);
g.lineTo(cx + Math.cos(a + 0.05) * w * 0.62, cy + Math.sin(a + 0.05) * h * 0.75);
g.fill();
}
g.restore();
D.clouds.forEach(function (C) {
var cg = g.createRadialGradient(C[0], C[1] - C[2] * 0.3, C[2] * 0.1, C[0], C[1], C[2]);
cg.addColorStop(0, "rgba(255,255,255,0.95)");
cg.addColorStop(0.7, "rgba(246,240,255,0.7)");
cg.addColorStop(1, "rgba(230,230,250,0)");
g.fillStyle = cg;
g.beginPath();
g.arc(C[0], C[1], C[2], 0, Math.PI * 2);
g.fill();
});
}
else if (k === "deep") {
var L2 = D.lands[R[0]];
g.save();
wmPath(g, L2);
g.shadowColor = "rgba(0,0,0,0.5)";
g.shadowBlur = 30;
g.fillStyle = "#2A1614";
g.fill();
g.restore();
g.save();
wmPath(g, L2);
g.clip();
var em = g.createRadialGradient(x + w / 2, y + h * 0.85, 20, x + w / 2, y + h * 0.7, w * 0.6);
em.addColorStop(0, "rgba(255,110,40,0.55)");
em.addColorStop(1, "rgba(80,20,10,0)");
g.fillStyle = em;
g.fillRect(x, y, w, h);
g.fillStyle = "#1A0C0A";
var rr = wmRandom(77);
for (var st = 0; st < 34; st++) {
var sx = x + rr() * w, sw = 10 + rr() * 22, sh = 26 + rr() * 60;
g.beginPath();
g.moveTo(sx - sw, y - 10);
g.lineTo(sx + sw, y - 10);
g.lineTo(sx, y + sh);
g.fill();
}
g.restore();
wmPath(g, L2);
g.lineWidth = 3;
g.strokeStyle = "rgba(255,120,60,0.55)";
g.stroke();
}
else if (k === "space") {
g.save();
wmRound(g, x, y, w, h, 40);
var sp = g.createLinearGradient(x, y, x + w, y + h);
sp.addColorStop(0, "#0A0C24");
sp.addColorStop(0.6, "#120E30");
sp.addColorStop(1, "#1E1028");
g.shadowColor = "rgba(0,0,0,0.6)";
g.shadowBlur = 30;
g.fillStyle = sp;
g.fill();
g.restore();
g.save();
wmRound(g, x, y, w, h, 40);
g.clip();
[[x + w * 0.3, y + h * 0.25, 320, "rgba(120,80,200,0.22)"], [x + w * 0.7, y + h * 0.55, 280, "rgba(60,120,200,0.18)"], [x + w * 0.4, y + h * 0.8, 260, "rgba(200,80,140,0.14)"]].forEach(function (n) {
var ng = g.createRadialGradient(n[0], n[1], 10, n[0], n[1], n[2]);
ng.addColorStop(0, n[3]);
ng.addColorStop(1, "rgba(0,0,0,0)");
g.fillStyle = ng;
g.fillRect(n[0] - n[2], n[1] - n[2], n[2] * 2, n[2] * 2);
});
D.stars.forEach(function (S) { g.fillStyle = "rgba(255,255,255," + S[3] + ")"; g.fillRect(S[0], S[1], S[2], S[2]); });
var sg = g.createRadialGradient(WM_SUN.x, WM_SUN.y, 40, WM_SUN.x, WM_SUN.y, 520);
sg.addColorStop(0, "#FFF6C8");
sg.addColorStop(0.35, "rgba(255,190,80,0.9)");
sg.addColorStop(1, "rgba(255,120,40,0)");
g.fillStyle = sg;
g.beginPath();
g.arc(WM_SUN.x, WM_SUN.y, 520, 0, Math.PI * 2);
g.fill();
g.lineWidth = 1.6;
g.strokeStyle = "rgba(200,210,255,0.28)";
g.setLineDash([2, 8]);
WM.pos.forEach(function (P) { var a = P.N.at; if (a && a.orbit) {
g.beginPath();
g.arc(WM_SUN.x, WM_SUN.y, a.orbit, 0, Math.PI * 2);
g.stroke();
} });
g.setLineDash([]);
g.restore();
wmRound(g, x, y, w, h, 40);
g.lineWidth = 3;
g.strokeStyle = "rgba(170,180,255,0.5)";
g.stroke();
}
var ty = k === "space" ? y + 56 : k === "deep" ? y + h - 26 : k === "mist" ? y + 18 : y + 44, tx = x + w / 2;
if (R[0] === "heavens")
ty = y + 20;
g.save();
g.font = "bold 40px " + WM_SERIF;
g.textAlign = "center";
g.textBaseline = "middle";
var nm = R[1].toUpperCase().split("").join(String.fromCharCode(8202));
if (WM.obst) {
var mw = g.measureText(nm).width;
WM.obst.push([tx - mw / 2 - 6, ty - 26, tx + mw / 2 + 6, ty + 26]);
}
g.lineWidth = 7;
g.strokeStyle = k === "cloud" ? "rgba(120,90,30,0.55)" : "rgba(10,10,20,0.75)";
g.strokeText(nm, tx, ty);
g.fillStyle = k === "cloud" ? "#FFF8E0" : k === "deep" ? "#FFB890" : k === "space" ? "#C8D0FF" : k === "mist" ? "#E8DCFF" : "#FFF2D0";
g.fillText(nm, tx, ty);
g.restore();
if (R[0] === "heavens")
wmRealmsText(g);
},
function (g) {
var H = wmNodeOf("heavens");
if (!H)
return;
g.save();
g.font = "italic 14px " + WM_SERIF;
g.textAlign = "center";
g.textBaseline = "middle";
g.fillStyle = "rgba(110,80,20,0.9)";
var L = (typeof HVN_REALMS !== "undefined" && HVN_REALMS.length) ? HVN_REALMS.map(function (r) { return r.name; }).filter(Boolean).slice(0, 24) : WM_HEAVEN_REALMS;
L.forEach(function (t, i) {
var side = i % 2 ? 1 : -1, j = Math.floor(i / 2), row = j % 6, col = Math.floor(j / 6);
var x = H.x + side * (175 + col * 215), y = H.y - 90 + row * 34;
g.fillText(t, x, y);
});
g.restore();
},
function (g, x, y, r) {
g.fillStyle = "#6A7A4A";
g.beginPath();
g.moveTo(x - r * 1.4, y + r * 0.5);
g.lineTo(x, y - r);
g.lineTo(x + r * 1.4, y + r * 0.5);
g.closePath();
g.fill();
g.fillStyle = "#9AA87A";
g.beginPath();
g.moveTo(x - r * 0.25, y - r * 0.6);
g.lineTo(x, y - r);
g.lineTo(x + r * 0.5, y - r * 0.3);
g.lineTo(x + r * 0.1, y - r * 0.45);
g.closePath();
g.fill();
},
function (g, cx, cy, R) {
var rings = typeof ATL_RINGS !== "undefined" && ATL_RINGS.length ? ATL_RINGS : [{ E: 140, col: 0xBDB6A8 }, { S: 160, E: 330, col: 0xC4BCAA }, { S: 350, E: 640, col: 0x5E9048 }, { S: 660, E: 960, col: 0x5A8A4C }, { S: 980, E: 1180, col: 0xC8B492 }, { S: 1200, E: 1500, col: 0x6A9A4E }, { S: 1520, E: 1720, col: 0x74644E }, { S: 1740, E: 2100, col: 0x7C9A4C }, { S: 2160, E: 3000, col: 0x2A2230 }];
var outer = rings[rings.length - 1].E || 3000, sc = R / outer;
g.save();
g.shadowColor = "rgba(0,0,0,0.45)";
g.shadowBlur = 20;
g.fillStyle = "#3A3040";
g.beginPath();
g.arc(cx, cy, R, 0, Math.PI * 2);
g.fill();
g.restore();
g.fillStyle = "#4C86B0";
g.beginPath();
g.arc(cx, cy, (rings[rings.length - 1].S || 2160) * sc, 0, Math.PI * 2);
g.fill();
for (var i = rings.length - 2; i >= 0; i--) {
var c = rings[i].col;
g.fillStyle = "rgb(" + ((c >> 16) & 255) + "," + ((c >> 8) & 255) + "," + (c & 255) + ")";
g.beginPath();
g.arc(cx, cy, rings[i].E * sc, 0, Math.PI * 2);
g.fill();
if (i > 0) {
g.fillStyle = "#4C86B0";
g.beginPath();
g.arc(cx, cy, (rings[i].S || 0) * sc, 0, Math.PI * 2);
g.fill();
}
}
g.strokeStyle = "rgba(255,248,230,0.85)";
g.lineWidth = 2;
for (var k = 0; k < 8; k++) {
var a = k / 8 * Math.PI * 2 + 0.19;
g.beginPath();
g.moveTo(cx + Math.cos(a) * 10, cy + Math.sin(a) * 10);
g.lineTo(cx + Math.cos(a) * R * 0.7, cy + Math.sin(a) * R * 0.7);
g.stroke();
}
var tg = g.createRadialGradient(cx, cy, 2, cx, cy, 30);
tg.addColorStop(0, "#FFF4C0");
tg.addColorStop(1, "rgba(255,220,120,0)");
g.fillStyle = tg;
g.beginPath();
g.arc(cx, cy, 30, 0, Math.PI * 2);
g.fill();
g.fillStyle = "#E8C860";
g.beginPath();
g.arc(cx, cy, 7, 0, Math.PI * 2);
g.fill();
g.lineWidth = 5;
g.strokeStyle = "#C9A868";
g.beginPath();
g.arc(cx, cy, R + 3, 0, Math.PI * 2);
g.stroke();
g.lineWidth = 1.5;
g.strokeStyle = "#6A5020";
g.beginPath();
g.arc(cx, cy, R + 6, 0, Math.PI * 2);
g.stroke();
},
function (g, s) {
WM_ROUTES.forEach(function (Rt) {
var T = wmNodeOf(Rt[1]);
if (!T)
return;
var F = Rt[3] ? wmNodeOf(Rt[3]) : null, a = F || WM_CITY, dx = T.x - a.x, dy = T.y - a.y, d = Math.hypot(dx, dy);
if (d < 1)
return;
var off = F ? F.r + 10 : 160, sx = a.x + dx / d * off, sy = a.y + dy / d * off, ex = T.x - dx / d * (T.r + 10), ey = T.y - dy / d * (T.r + 10);
var mx = (sx + ex) / 2 - dy * 0.12, my = (sy + ey) / 2 + dx * 0.12;
g.save();
g.lineWidth = 5;
g.strokeStyle = "rgba(20,16,10,0.45)";
g.setLineDash([2, 12]);
g.lineCap = "round";
g.beginPath();
g.moveTo(sx, sy);
g.quadraticCurveTo(mx, my, ex, ey);
g.stroke();
g.lineWidth = 3;
g.strokeStyle = Rt[0] === "heavens" ? "#FFF4C8" : Rt[0] === "below" ? "#FF9A6A" : "#F2D890";
g.stroke();
g.restore();
if (14 * s < 7)
return;
var lx = Rt[4] || 0.25 * sx + 0.5 * mx + 0.25 * ex, ly = Rt[5] || 0.25 * sy + 0.5 * my + 0.25 * ey;
g.save();
g.font = "italic 15px " + WM_SERIF;
g.textAlign = "center";
g.textBaseline = "middle";
var w = g.measureText(Rt[2]).width + 16;
if (WM.obst)
WM.obst.push([lx - w / 2 - 4, ly - 17, lx + w / 2 + 4, ly + 17]);
g.fillStyle = "rgba(250,242,220,0.92)";
wmRound(g, lx - w / 2, ly - 13, w, 26, 12);
g.fill();
g.lineWidth = 1.2;
g.strokeStyle = "#8A6A30";
g.stroke();
g.fillStyle = "#3A2A10";
g.fillText(Rt[2], lx, ly + 1);
g.restore();
});
},
function (g, P, s) {
var N = P.N, r = P.r, x = P.x, y = P.y;
g.save();
if (N.planet) {
var pl = N.planet, pr = pl.r;
var gl = g.createRadialGradient(x, y, pr * 0.8, x, y, pr * 1.9);
gl.addColorStop(0, "rgba(255,255,255,0.18)");
gl.addColorStop(1, "rgba(255,255,255,0)");
g.fillStyle = gl;
g.beginPath();
g.arc(x, y, pr * 1.9, 0, Math.PI * 2);
g.fill();
if (pl.ring) {
g.strokeStyle = pl.ring;
g.lineWidth = pr * 0.22;
g.globalAlpha = 0.85;
g.beginPath();
g.ellipse(x, y, pr * 1.75, pr * 0.5, -0.35, Math.PI, Math.PI * 2);
g.stroke();
g.globalAlpha = 1;
}
var bg = g.createRadialGradient(x - pr * 0.4, y - pr * 0.45, pr * 0.1, x, y, pr * 1.05);
bg.addColorStop(0, "#FFFFFF");
bg.addColorStop(0.18, pl.col);
bg.addColorStop(1, "#101018");
g.fillStyle = bg;
g.beginPath();
g.arc(x, y, pr, 0, Math.PI * 2);
g.fill();
if (pl.band || pl.land) {
g.save();
g.beginPath();
g.arc(x, y, pr, 0, Math.PI * 2);
g.clip();
g.globalAlpha = 0.45;
if (pl.band) {
g.fillStyle = pl.band;
for (var b = -2; b <= 2; b++)
g.fillRect(x - pr, y + b * pr * 0.36 - pr * 0.07, pr * 2, pr * 0.13);
}
if (pl.land) {
g.globalAlpha = 0.8;
g.fillStyle = pl.land;
g.beginPath();
g.ellipse(x - pr * 0.3, y - pr * 0.1, pr * 0.38, pr * 0.5, 0.4, 0, Math.PI * 2);
g.fill();
g.beginPath();
g.ellipse(x + pr * 0.42, y + pr * 0.25, pr * 0.3, pr * 0.22, -0.3, 0, Math.PI * 2);
g.fill();
}
g.restore();
}
if (pl.ring) {
g.strokeStyle = pl.ring;
g.lineWidth = pr * 0.22;
g.globalAlpha = 0.9;
g.beginPath();
g.ellipse(x, y, pr * 1.75, pr * 0.5, -0.35, 0, Math.PI);
g.stroke();
g.globalAlpha = 1;
}
}
else {
g.shadowColor = "rgba(0,0,0,0.5)";
g.shadowBlur = 12;
g.shadowOffsetY = 4;
g.fillStyle = "#7A5A20";
g.beginPath();
g.arc(x, y, r, 0, Math.PI * 2);
g.fill();
g.shadowColor = "transparent";
var rim = g.createLinearGradient(x, y - r, x, y + r);
rim.addColorStop(0, "#FFE8A0");
rim.addColorStop(0.5, "#C9A048");
rim.addColorStop(1, "#8A6420");
g.fillStyle = rim;
g.beginPath();
g.arc(x, y, r, 0, Math.PI * 2);
g.fill();
var inr = r * 0.84, ig = g.createRadialGradient(x - inr * 0.35, y - inr * 0.4, inr * 0.1, x, y, inr);
ig.addColorStop(0, "#FFFFFF");
ig.addColorStop(0.22, N.c || "#888");
ig.addColorStop(1, wmShade(N.c || "#888", 0.45));
g.fillStyle = ig;
g.beginPath();
g.arc(x, y, inr, 0, Math.PI * 2);
g.fill();
if (N.big) {
g.lineWidth = 2;
g.strokeStyle = "rgba(255,240,200,0.8)";
g.beginPath();
g.arc(x, y, r + 6, 0, Math.PI * 2);
g.stroke();
}
if (r * s >= 6) {
g.font = Math.round(inr * 1.05) + "px " + WM_EMOJI;
g.textAlign = "center";
g.textBaseline = "middle";
g.fillText(N.e || "✦", x, y + inr * 0.06);
}
}
var lv = wmLevel(N.k);
if (lv !== null && r * s >= 5) {
var a = Math.PI * 0.25, px = x + Math.cos(a) * r * 0.92, py = y + Math.sin(a) * r * 0.92, pr2 = Math.max(6, r * 0.2);
g.fillStyle = "#1A1410";
g.beginPath();
g.arc(px, py, pr2 + 2, 0, Math.PI * 2);
g.fill();
g.fillStyle = (typeof DGR_COL !== "undefined" && DGR_COL[lv]) || "#8FDCA4";
g.beginPath();
g.arc(px, py, pr2, 0, Math.PI * 2);
g.fill();
}
if (WM.sel === P.k) {
g.lineWidth = 5;
g.strokeStyle = "#FFFFFF";
g.beginPath();
g.arc(x, y, r + 9, 0, Math.PI * 2);
g.stroke();
g.lineWidth = 2;
g.strokeStyle = "#2A6AE8";
g.stroke();
}
if (WM.here === P.k) {
g.lineWidth = 5;
g.strokeStyle = "#E8303A";
g.setLineDash([8, 6]);
g.beginPath();
g.arc(x, y, r + 15, 0, Math.PI * 2);
g.stroke();
g.setLineDash([]);
}
g.restore();
},
function (g, P, s) {
var N = P.N, fs = P.k === "city" ? 34 : N.big ? 24 : P.sat ? 15 : 18;
if (fs * s < 7.5)
return;
var L = wmLines(N.n), y = P.y + (P.k === "city" ? 172 : P.r + 16 + (N.planet && N.planet.ring ? 6 : 0));
g.save();
g.font = "bold " + fs + "px " + WM_SERIF;
g.textAlign = "center";
g.textBaseline = "top";
var dark = !!(N.planet || P.y < 520 && P.x > 1140 && P.x < 2060);
L.forEach(function (t, i) {
var yy = y + i * fs * 1.12;
g.lineWidth = Math.max(3, fs * 0.28);
g.lineJoin = "round";
g.strokeStyle = dark ? "rgba(10,10,30,0.85)" : "rgba(20,14,6,0.82)";
if (P.y < 520 && P.x > 1140 && P.x < 2060)
g.strokeStyle = "rgba(90,64,20,0.75)";
g.strokeText(t, P.x, yy);
g.fillStyle = N.secret ? "#C8C0D8" : "#FFF6DE";
g.fillText(t, P.x, yy);
});
if (WM.here === P.k) {
g.font = "bold " + Math.round(fs * 0.8) + "px " + WM_SERIF;
var yh = P.y - P.r - 34;
g.lineWidth = 4;
g.strokeStyle = "#FFFFFF";
g.strokeText("● You are here", P.x, yh);
g.fillStyle = "#C8202A";
g.fillText("● You are here", P.x, yh);
}
g.restore();
},
function (g, x, y, r) {
g.save();
g.translate(x, y);
g.fillStyle = "rgba(250,240,210,0.92)";
g.beginPath();
g.arc(0, 0, r, 0, Math.PI * 2);
g.fill();
g.lineWidth = 3;
g.strokeStyle = "#8A6A30";
g.stroke();
g.lineWidth = 1;
g.beginPath();
g.arc(0, 0, r * 0.82, 0, Math.PI * 2);
g.stroke();
for (var i = 0; i < 8; i++) {
var a = i * Math.PI / 4, L = i % 2 ? r * 0.5 : r * 0.78;
g.save();
g.rotate(a);
g.fillStyle = i === 0 ? "#B8303A" : "#3A2A10";
g.beginPath();
g.moveTo(0, -L);
g.lineTo(r * 0.11, 0);
g.lineTo(-r * 0.11, 0);
g.closePath();
g.fill();
g.fillStyle = i === 0 ? "#E8606A" : "#8A7040";
g.beginPath();
g.moveTo(0, -L);
g.lineTo(r * 0.11, 0);
g.lineTo(0, 0);
g.closePath();
g.fill();
g.restore();
}
g.font = "bold 20px " + WM_SERIF;
g.textAlign = "center";
g.textBaseline = "middle";
g.fillStyle = "#3A2A10";
g.fillText("N", 0, -r - 14);
g.restore();
},
function (g) {
var x = WM_W / 2, y = 56, w = 760, h = 84;
g.save();
g.shadowColor = "rgba(0,0,0,0.5)";
g.shadowBlur = 16;
var bg = g.createLinearGradient(0, y - h / 2, 0, y + h / 2);
bg.addColorStop(0, "#F6ECD0");
bg.addColorStop(1, "#E2D0A4");
g.fillStyle = bg;
wmRound(g, x - w / 2, y - h / 2, w, h, 16);
g.fill();
g.restore();
g.lineWidth = 3;
g.strokeStyle = "#8A6A30";
wmRound(g, x - w / 2, y - h / 2, w, h, 16);
g.stroke();
g.lineWidth = 1;
wmRound(g, x - w / 2 + 7, y - h / 2 + 7, w - 14, h - 14, 11);
g.stroke();
g.textAlign = "center";
g.textBaseline = "middle";
g.font = "bold 40px " + WM_SERIF;
g.fillStyle = "#3A2410";
g.fillText("The Atlas of All Worlds", x, y - 10);
g.font = "italic 17px " + WM_SERIF;
g.fillStyle = "#6A4A20";
g.fillText("Every world of SomnuMatrix on one map · " + wmCount() + " worlds" + (WM.stories && WM.stories.length ? " · " + wmsCount("story") + " stories · " + wmsCount("guild") + " guilds" : ""), x, y + 24);
},
function () {
var minS = Math.min(WM.vw / WM_W, WM.vh / WM_H) * 0.9, maxS = 4;
WM.s = Math.max(minS, Math.min(maxS, WM.s));
var mw = WM_W * WM.s, mh = WM_H * WM.s;
if (mw <= WM.vw)
WM.ox = (WM.vw - mw) / 2;
else
WM.ox = Math.min(40, Math.max(WM.vw - mw - 40, WM.ox));
if (mh <= WM.vh)
WM.oy = (WM.vh - mh) / 2;
else
WM.oy = Math.min(40, Math.max(WM.vh - mh - 40, WM.oy));
},
function () {
if (WM.fast)
return WM.fast;
var k = Math.min(0.75, 2400 / WM_W), c = document.createElement("canvas");
c.width = Math.round(WM_W * k);
c.height = Math.round(WM_H * k);
var g = c.getContext("2d");
g.scale(k, k);
try {
wmDraw(g, k * 1.6);
}
catch (e) {
if (window.console)
console.warn("[world-maps]", e);
}
WM.fast = c;
WM.fastS = k;
return c;
},
function (sharp) {
if (!WM.open || !WM.g)
return;
if (sharp)
WM.sharpGen = WM.gen;
var g = WM.g, d = WM.dpr;
g.setTransform(d, 0, 0, d, 0, 0);
g.fillStyle = "#0E2430";
g.fillRect(0, 0, WM.vw, WM.vh);
g.save();
g.translate(WM.ox, WM.oy);
g.scale(WM.s, WM.s);
if (!sharp) {
var f = wmFastPicture();
g.imageSmoothingEnabled = true;
g.drawImage(f, 0, 0, WM_W, WM_H);
}
else {
try {
wmDraw(g, WM.s);
}
catch (e) {
if (window.console)
console.warn("[world-maps]", e);
}
}
g.restore();
},
function (px, py) {
var mx = (px - WM.ox) / WM.s, my = (py - WM.oy) / WM.s, best = null, bd = 1e9;
WM.pos.forEach(function (P) { var r = (P.k === "city" ? 160 : P.r) + 8 / WM.s, d = Math.hypot(P.x - mx, P.y - my); if (d < r && d < bd) {
bd = d;
best = P;
} });
if (!best && WM.tags && WM.s >= 0.7)
WM.tags.forEach(function (T) { if (mx >= T.x && mx <= T.x + T.w && my >= T.y && my <= T.y + T.h)
best = T.P; });
return best;
},
function () {
if (document.getElementById("wmap-css"))
return;
var s = document.createElement("style");
s.id = "wmap-css";
s.textContent =
"#wmap{position:fixed;inset:0;z-index:70;background:#0E2430;color:#F2E6C8;font:14px var(--sans,sans-serif);touch-action:none;user-select:none;-webkit-user-select:none}" +
"#wmap canvas{position:absolute;inset:0;width:100%;height:100%;cursor:grab;touch-action:none}" +
"#wmap .wm-bar{position:absolute;top:max(10px,env(safe-area-inset-top,0px));right:10px;display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;z-index:2}" +
"#wmap .wm-b{background:rgba(16,14,10,.88);border:1px solid #C9A868;color:#F2E6C8;border-radius:4px;padding:7px 12px;font:14px var(--sans,sans-serif);cursor:pointer;min-width:38px}" +
"#wmap .wm-b:hover{background:#3A2E14}" +
"#wmap .wm-card{position:absolute;left:12px;bottom:max(12px,env(safe-area-inset-bottom,0px));width:min(380px,calc(100vw - 24px));max-height:46vh;overflow:auto;background:rgba(250,242,222,.97);color:#2A1E0E;border:2px solid #8A6A30;border-radius:8px;padding:12px 14px;box-shadow:0 6px 30px rgba(0,0,0,.5);display:none;z-index:3}" +
"#wmap .wm-card h3{margin:0 0 4px;font:bold 20px Georgia,serif;color:#3A2410}" +
"#wmap .wm-card .wm-s{font:italic 14px Georgia,serif;color:#5A4220;margin-bottom:8px}" +
"#wmap .wm-card .wm-h{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#8A6A30;margin-top:8px}" +
"#wmap .wm-card .wm-x{float:right;background:none;border:1px solid #8A6A30;border-radius:3px;color:#3A2410;cursor:pointer;padding:2px 8px;margin-left:8px}" +
"#wmap .wm-list{position:absolute;right:10px;top:calc(max(10px,env(safe-area-inset-top,0px)) + 46px);bottom:12px;width:min(330px,calc(100vw - 20px));overflow:auto;background:rgba(14,12,10,.95);border:1px solid #C9A868;border-radius:6px;padding:8px 12px;display:none;z-index:3}" +
"#wmap .wm-list h4{margin:10px 0 4px;font:bold 15px Georgia,serif;color:#E8C878}" +
"#wmap .wm-li{display:block;width:100%;text-align:left;background:none;border:0;border-bottom:1px solid #2A2620;color:#F2E6C8;padding:6px 2px;cursor:pointer;font:14px var(--sans,sans-serif)}" +
"#wmap .wm-li:hover{background:#2A2214}" +
"#wmap .wm-help{position:absolute;left:12px;top:max(12px,env(safe-area-inset-top,0px));background:rgba(16,14,10,.8);border:1px solid #6A5A3A;border-radius:4px;padding:6px 10px;font-size:12.5px;color:#E8DCC0;z-index:2;max-width:46vw}" +
"#wmap .wms-g{font:bold 12px Georgia,serif;color:#6A2A18;margin:8px 0 2px}" +
"#wmap .wms-s{padding:4px 6px;border-bottom:1px solid #E2D0A4;font-size:13px;line-height:1.3}" +
"#wmap .wms-s i{color:#6A5030;font-size:12px}#wmap .wms-w{font-size:12px;color:#5A4A30}" +
"#wmap .wms-off{opacity:.62}#wmap .wms-on{background:#F4D88A;border-radius:4px}" +
"@media (max-width:700px),(max-height:500px){#wmap .wm-help{display:none}#wmap .wm-b{padding:6px 9px;font-size:13px}}";
document.head.appendChild(s);
},
function (focus) {
if (WM.open) {
if (focus) {
var F = wmNodeOf(focus);
if (F) {
WM.sel = F.k;
wmCard(F);
wmCenterOn(F, 0.9);
}
}
return;
}
wmCss();
if (document.exitPointerLock && document.pointerLockElement)
try {
document.exitPointerLock();
}
catch (e) { }
var el = document.createElement("div");
el.id = "wmap";
el.innerHTML = "<canvas></canvas><div class='wm-help'>Drag to move · wheel or two fingers to come closer · tap a world</div>" +
"<div class='wm-bar'><button class='wm-b' data-a='list' type='button'>All worlds</button><button class='wm-b' data-a='stories' type='button'>📚 Stories</button><button class='wm-b' data-a='guilds' type='button'>⚒️ Guilds</button><button class='wm-b' data-a='city' type='button'>🏙️ City map</button>" +
"<button class='wm-b' data-a='in' type='button' title='Closer'>+</button><button class='wm-b' data-a='out' type='button' title='Further'>−</button>" +
"<button class='wm-b' data-a='fit' type='button' title='The whole map'>⤢</button><button class='wm-b' data-a='close' type='button'>Close</button></div>" +
"<div class='wm-card'></div><div class='wm-list'></div>";
document.body.appendChild(el);
["keydown", "keyup"].forEach(function (k) { el.addEventListener(k, function (e) { if (e.code !== "Escape")
e.stopPropagation(); }); });
WM.el = el;
WM.cv = el.querySelector("canvas");
WM.g = WM.cv.getContext("2d");
WM.open = true;
WM.pos = wmNodes();
WM.deco = wmDeco();
try {
WM.stories = typeof wmsGather === "function" ? wmsGather() : [];
WM.tags = WM.stories.length ? wmsTags() : [];
}
catch (e) {
WM.stories = [];
WM.tags = [];
if (window.console)
console.warn("[world-maps]", e);
}
WM.sel = null;
WM.ptr = {};
WM.pinch = null;
WM.drag = null;
try {
WM.here = typeof dgrWhere === "function" ? dgrWhere() : "city";
}
catch (e) {
WM.here = "city";
}
if (WM.here === "gr_moon")
WM.here = "moon";
wmResize();
wmFit();
el.querySelector(".wm-bar").addEventListener("click", function (e) {
var a = e.target && e.target.getAttribute && e.target.getAttribute("data-a");
if (!a)
return;
if (a === "close")
wmClose();
else if (a === "in")
wmZoomAt(WM.vw / 2, WM.vh / 2, 1.4);
else if (a === "out")
wmZoomAt(WM.vw / 2, WM.vh / 2, 1 / 1.4);
else if (a === "fit") {
wmFit();
wmDirty();
}
else if (a === "list")
wmList(!WM.list);
else if (a === "stories")
wmsList(WM.slist !== "story", "story");
else if (a === "guilds")
wmsList(WM.slist !== "guild", "guild");
else if (a === "city") {
wmClose();
if (typeof wcmOpen === "function")
wcmOpen();
}
});
var cv = WM.cv;
cv.addEventListener("pointerdown", function (e) {
cv.setPointerCapture && cv.setPointerCapture(e.pointerId);
WM.ptr[e.pointerId] = { x: e.clientX, y: e.clientY };
var ids = Object.keys(WM.ptr);
WM.moved = false;
if (ids.length === 1)
WM.drag = { x: e.clientX, y: e.clientY, ox: WM.ox, oy: WM.oy, sx: e.clientX, sy: e.clientY };
else if (ids.length === 2) {
var a = WM.ptr[ids[0]], b = WM.ptr[ids[1]];
WM.pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s: WM.s, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2, ox: WM.ox, oy: WM.oy };
WM.drag = null;
WM.moved = true;
}
cv.style.cursor = "grabbing";
});
cv.addEventListener("pointermove", function (e) {
if (!WM.ptr[e.pointerId])
return;
WM.ptr[e.pointerId] = { x: e.clientX, y: e.clientY };
var ids = Object.keys(WM.ptr);
if (WM.pinch && ids.length >= 2) {
var a = WM.ptr[ids[0]], b = WM.ptr[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y), P = WM.pinch;
var ns = P.s * d / Math.max(1, P.d), mx = (P.mx - P.ox) / P.s, my = (P.my - P.oy) / P.s, cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
WM.s = ns;
WM.ox = cx - mx * ns;
WM.oy = cy - my * ns;
wmClampView();
wmDirty();
return;
}
if (WM.drag) {
var dx = e.clientX - WM.drag.x, dy = e.clientY - WM.drag.y;
if (Math.hypot(e.clientX - WM.drag.sx, e.clientY - WM.drag.sy) > 6)
WM.moved = true;
WM.ox = WM.drag.ox + dx;
WM.oy = WM.drag.oy + dy;
wmClampView();
wmDirty();
}
});
var up = function (e) {
var had = !!WM.ptr[e.pointerId];
delete WM.ptr[e.pointerId];
if (had && !WM.moved && WM.drag && e.type === "pointerup") {
var r = cv.getBoundingClientRect(), P = wmHit(e.clientX - r.left, e.clientY - r.top);
WM.sel = P ? P.k : null;
wmCard(P);
wmPaint(true);
}
if (Object.keys(WM.ptr).length < 2)
WM.pinch = null;
if (!Object.keys(WM.ptr).length) {
WM.drag = null;
cv.style.cursor = "grab";
}
else if (Object.keys(WM.ptr).length === 1) {
var id = Object.keys(WM.ptr)[0], q = WM.ptr[id];
WM.drag = { x: q.x, y: q.y, ox: WM.ox, oy: WM.oy, sx: q.x, sy: q.y };
}
};
cv.addEventListener("pointerup", up);
cv.addEventListener("pointercancel", up);
cv.addEventListener("wheel", function (e) { e.preventDefault(); var r = cv.getBoundingClientRect(); wmZoomAt(e.clientX - r.left, e.clientY - r.top, Math.pow(1.0015, -e.deltaY)); }, { passive: false });
WM.onResize = function () { var s0 = WM.s, w0 = WM.vw, h0 = WM.vh; wmResize(); WM.ox += (WM.vw - w0) / 2; WM.oy += (WM.vh - h0) / 2; WM.s = s0; wmClampView(); wmPaint(true); };
addEventListener("resize", WM.onResize);
wmPaint(true);
if (focus) {
var F2 = wmNodeOf(focus);
if (F2) {
WM.sel = F2.k;
wmCard(F2);
wmCenterOn(F2, 0.9);
}
}
},
function (P) {
var c = WM.el && WM.el.querySelector(".wm-card");
if (!c)
return;
if (!P) {
c.style.display = "none";
return;
}
var N = P.N, lv = wmLevel(N.k), h = [];
h.push("<button class='wm-x' type='button'>✕</button><h3>" + esc((N.e ? N.e + " " : "") + N.n) + "</h3><div class='wm-s'>" + esc(N.s || "") + "</div>");
if (lv !== null && typeof DGR_NAME !== "undefined")
h.push("<div><span style='display:inline-block;width:11px;height:11px;border-radius:50%;background:" + ((typeof DGR_COL !== "undefined" && DGR_COL[lv]) || "#8FDCA4") + ";border:1px solid #2A1E0E;vertical-align:-1px'></span> " + esc((typeof DGR_ICON !== "undefined" ? DGR_ICON[lv] + " " : "") + DGR_NAME[lv]) + "</div>");
if (N.how) {
h.push("<div class='wm-h'>How to get there</div><div>" + esc(N.how) + "</div>");
}
if (WM.here === N.k)
h.push("<div style='margin-top:8px;color:#B8202A;font-weight:bold'>● You are here</div>");
if (typeof wmsCardHtml === "function")
h.push(wmsCardHtml(N.k));
if (N.k === "city")
h.push("<button class='wm-b' data-c='city' type='button' style='margin-top:10px;background:#3A2E14'>🏙️ Open the city map</button>");
c.innerHTML = h.join("");
c.style.display = "block";
c.querySelector(".wm-x").onclick = function () { WM.sel = null; wmCard(null); wmPaint(true); };
var cb = c.querySelector("[data-c='city']");
if (cb)
cb.onclick = function () { wmClose(); if (typeof wcmOpen === "function")
wcmOpen(); };
},
function (on) {
WM.list = on;
var L = WM.el && WM.el.querySelector(".wm-list");
if (!L)
return;
if (!on) {
if (!WM.slist)
L.style.display = "none";
return;
}
WM.slist = false;
var seen = {}, h = ["<div style='font:bold 17px Georgia,serif;color:#F2E6C8'>Every world (" + wmCount() + ")</div><div style='font-size:12px;color:#B8AC90'>Tap one to find it on the map.</div>"];
WM_LIST_GROUPS.forEach(function (G) {
var rows = WM.pos.filter(function (P) { return !seen[P.k] && !P.N.nolist && G[1](P); });
if (!rows.length)
return;
rows.forEach(function (P) { seen[P.k] = 1; });
h.push("<h4>" + esc(G[0]) + " <span style='font:12px sans-serif;color:#9A8E70'>(" + rows.length + ")</span></h4>");
rows.forEach(function (P) { h.push("<button class='wm-li' type='button' data-k='" + esc(P.k) + "'>" + esc((P.N.e || "🪐") + " " + P.N.n) + (WM.here === P.k ? " <b style='color:#FF8A8A'>● here</b>" : "") + "</button>"); });
});
var rest = WM.pos.filter(function (P) { return !seen[P.k] && !P.N.nolist; });
if (rest.length) {
h.push("<h4>More</h4>");
rest.forEach(function (P) { h.push("<button class='wm-li' type='button' data-k='" + esc(P.k) + "'>" + esc((P.N.e || "🪐") + " " + P.N.n) + "</button>"); });
}
L.innerHTML = h.join("");
L.style.display = "block";
L.querySelectorAll(".wm-li").forEach(function (b) {
b.onclick = function () {
var P = wmNodeOf(b.getAttribute("data-k"));
if (!P)
return;
WM.sel = P.k;
wmCard(P);
if (WM.vw < 700)
wmList(false);
wmCenterOn(P, Math.max(0.8, WM.s));
};
});
},
function () {
if (!WM.open)
return;
WM.open = false;
clearTimeout(WM.idleT);
if (WM.raf)
cancelAnimationFrame(WM.raf);
WM.raf = 0;
if (WM.onResize)
removeEventListener("resize", WM.onResize);
if (WM.el && WM.el.parentNode)
WM.el.parentNode.removeChild(WM.el);
if (WM.fast) {
WM.fast.width = 0;
WM.fast.height = 0;
}
WM.el = null;
WM.cv = null;
WM.g = null;
WM.fast = null;
WM.deco = null;
WM.pos = null;
WM.ptr = {};
WM.list = false;
WM.slist = false;
WM.stories = null;
WM.tags = null;
},
function (g) {
var s = WCM.s, R = ATL_RINGS, P = WCM.P, boxes = [];
function free(x0, y0, x1, y1) { for (var i = 0; i < boxes.length; i++) {
var b = boxes[i];
if (x0 < b[2] && x1 > b[0] && y0 < b[3] && y1 > b[1])
return false;
} boxes.push([x0, y0, x1, y1]); return true; }
function scr(x, z) { return [WCM.ox + x * s, WCM.oy + z * s]; }
g.save();
g.textAlign = "center";
g.textBaseline = "middle";
g.lineJoin = "round";
for (var i = 0; i < R.length; i++) {
var Ri = R[i], mid = i === 0 ? Ri.E * 0.62 : (Ri.S + Ri.E) / 2, fs = Math.max(11, Math.min(30, (Ri.E - (Ri.S || 0)) * s * 0.32));
if (i === 0 && Ri.E * s < 60)
continue;
var name = (i ? i + ". " : "") + Ri.name, ang = -Math.PI / 2;
g.font = "bold " + fs + "px " + WM_SERIF;
var tw = g.measureText(name).width, span = tw / Math.max(1, mid * s);
if (span > Math.PI * 0.9)
continue;
var a0 = ang - span / 2, cx = WCM.ox, cy = WCM.oy, acc = 0;
for (var c = 0; c < name.length; c++) {
var ch = name[c], cw = g.measureText(ch).width, aa = a0 + (acc + cw / 2) / (mid * s);
acc += cw;
var x = cx + Math.cos(aa) * mid * s, y = cy + Math.sin(aa) * mid * s;
g.save();
g.translate(x, y);
g.rotate(aa + Math.PI / 2);
g.lineWidth = 4;
g.strokeStyle = Ri.k === "wilds" ? "rgba(0,0,0,0.8)" : "rgba(255,250,235,0.85)";
g.strokeText(ch, 0, 0);
g.fillStyle = Ri.k === "wilds" ? "#E8D8F8" : "#3A2A14";
g.fillText(ch, 0, 0);
g.restore();
}
var pt = scr(0, -mid);
boxes.push([pt[0] - tw / 2, pt[1] - fs, pt[0] + tw / 2, pt[1] + fs]);
}
if (s > 0.45)
P.lots.forEach(function (L) {
var c = WCM_LOT[L.k];
if (!c)
return;
var p = scr(L.x, L.z), fs = Math.min(22, Math.max(11, s * 14));
if (p[0] < -30 || p[1] < -30 || p[0] > WCM.vw + 30 || p[1] > WCM.vh + 30)
return;
if (!free(p[0] - fs / 2, p[1] - fs / 2, p[0] + fs / 2, p[1] + fs / 2))
return;
g.font = fs + "px " + WM_EMOJI;
g.fillText(c[1], p[0], p[1]);
});
var show = P.names.filter(function (N) { return N.pri === 3 ? s > 0.28 : N.pri === 2 ? s > 0.4 : s > 0.7; });
show.sort(function (a, b) { return b.pri - a.pri; });
if (WCM.pick)
show.unshift({ n: WCM.pick.name, x: WCM.pick.x, z: WCM.pick.z, pri: 9, pick: 1 });
show.forEach(function (N) {
var p = scr(N.x, N.z);
if (p[0] < -80 || p[1] < -30 || p[0] > WCM.vw + 80 || p[1] > WCM.vh + 30)
return;
var fs = N.pick ? 16 : N.pri === 3 ? 13 : N.pri === 2 ? 12.5 : 12;
g.font = (N.pri === 1 ? "italic " : "bold ") + fs + "px " + WM_SERIF;
var w = g.measureText(N.n).width;
if (!free(p[0] - w / 2 - 4, p[1] - fs * 0.7, p[0] + w / 2 + 4, p[1] + fs * 0.7) && !N.pick)
return;
var col = N.pick ? "#1E4AA8" : N.pri === 3 ? "#5A1A10" : N.pri === 2 ? "#2A2A4A" : "#3A3020";
if (N.pri !== 1 || N.pick) {
g.fillStyle = "#FFFFFF";
g.beginPath();
g.arc(p[0], p[1] + fs * 0.95, N.pick ? 6 : 3.2, 0, Math.PI * 2);
g.fill();
g.fillStyle = col;
g.beginPath();
g.arc(p[0], p[1] + fs * 0.95, N.pick ? 4.5 : 2.2, 0, Math.PI * 2);
g.fill();
}
g.lineWidth = 3.5;
g.strokeStyle = "rgba(255,252,240,0.92)";
g.strokeText(N.n, p[0], p[1]);
g.fillStyle = col;
g.fillText(N.n, p[0], p[1]);
});
if (wcmHereXY()) {
var Y = wcmHereXY(), q = scr(Y.x, Y.z);
g.save();
g.translate(q[0], q[1]);
g.rotate(Y.h);
g.fillStyle = "rgba(200,30,40,0.25)";
g.beginPath();
g.arc(0, 0, 22, 0, Math.PI * 2);
g.fill();
g.fillStyle = "#C8202A";
g.strokeStyle = "#FFFFFF";
g.lineWidth = 2.5;
g.beginPath();
g.moveTo(0, -14);
g.lineTo(9, 10);
g.lineTo(0, 5);
g.lineTo(-9, 10);
g.closePath();
g.fill();
g.stroke();
g.restore();
g.font = "bold 14px " + WM_SERIF;
g.lineWidth = 4;
g.strokeStyle = "#FFFFFF";
g.strokeText("You are here", q[0], q[1] + 30);
g.fillStyle = "#C8202A";
g.fillText("You are here", q[0], q[1] + 30);
}
var nx = 34, ny = WCM.vh - 74;
g.fillStyle = "rgba(250,240,210,0.92)";
g.beginPath();
g.arc(nx, ny, 22, 0, Math.PI * 2);
g.fill();
g.strokeStyle = "#8A6A30";
g.lineWidth = 2;
g.stroke();
g.fillStyle = "#B8303A";
g.beginPath();
g.moveTo(nx, ny - 17);
g.lineTo(nx + 7, ny + 4);
g.lineTo(nx - 7, ny + 4);
g.closePath();
g.fill();
g.font = "bold 12px " + WM_SERIF;
g.fillStyle = "#3A2A10";
g.fillText("N", nx, ny + 12);
var mPer = [10, 20, 50, 100, 200, 500, 1000].filter(function (m) { return m * s >= 60; })[0] || 1000, L = mPer * s, sx = 16, sy = WCM.vh - 22;
g.fillStyle = "rgba(250,240,210,0.9)";
g.fillRect(sx - 6, sy - 18, L + 50, 26);
g.strokeStyle = "#3A2A10";
g.lineWidth = 2;
g.beginPath();
g.moveTo(sx, sy - 6);
g.lineTo(sx, sy);
g.lineTo(sx + L, sy);
g.lineTo(sx + L, sy - 6);
g.stroke();
g.font = "12px " + WM_SERIF;
g.textAlign = "left";
g.fillStyle = "#3A2A10";
g.fillText((mPer >= 1000 ? mPer / 1000 + " km" : mPer + " m"), sx + L + 6, sy - 4);
g.restore();
},
function () {
try {
if (typeof camera === "undefined" || !camera || !ATLC)
return null;
if (typeof WLD !== "undefined" && WLD.on)
return null;
if (store.inside)
return null;
if ((store.here || 0) !== ((somnucorRealm() || {}).id))
return null;
var x = camera.position.x - ATLC.x, z = camera.position.z - ATLC.z;
if (x * x + z * z > WCM_R * WCM_R)
return null;
return { x: x, z: z, h: -(typeof yaw === "number" ? yaw : 0) };
}
catch (e) {
return null;
}
},
function () {
if (WCM.fast)
return WCM.fast;
var px = 2048, k = px / (WCM_R * 2), c = document.createElement("canvas");
c.width = px;
c.height = px;
var g = c.getContext("2d");
g.translate(px / 2, px / 2);
g.scale(k, k);
try {
wcmDraw(g, k);
}
catch (e) {
if (window.console)
console.warn("[world-maps] city", e);
}
WCM.fast = c;
WCM.fastK = k;
return c;
},
function (sharp) {
if (!WCM.open || !WCM.g)
return;
if (sharp)
WCM.sharpGen = WCM.gen;
var g = WCM.g, d = WCM.dpr;
g.setTransform(d, 0, 0, d, 0, 0);
g.fillStyle = "#10202A";
g.fillRect(0, 0, WCM.vw, WCM.vh);
g.save();
g.translate(WCM.ox, WCM.oy);
g.scale(WCM.s, WCM.s);
if (!sharp || WCM.s <= WCM.fastK * 1.05) {
var f = wcmFastPicture();
g.drawImage(f, -WCM_R, -WCM_R, WCM_R * 2, WCM_R * 2);
}
else {
g.beginPath();
g.rect((-WCM.ox) / WCM.s, (-WCM.oy) / WCM.s, WCM.vw / WCM.s, WCM.vh / WCM.s);
g.clip();
try {
wcmDraw(g, WCM.s, { hi: WCM.ring });
}
catch (e) {
if (window.console)
console.warn("[world-maps] city", e);
}
}
g.restore();
if (sharp)
try {
wcmLabels(g);
}
catch (e) {
if (window.console)
console.warn("[world-maps] labels", e);
}
},
function () {
if (document.getElementById("wcm-css"))
return;
var s = document.createElement("style");
s.id = "wcm-css";
s.textContent =
"#wcm{position:fixed;inset:0;z-index:70;background:#10202A;color:#F2E6C8;font:14px var(--sans,sans-serif);touch-action:none;user-select:none;-webkit-user-select:none}" +
"#wcm canvas{position:absolute;inset:0;width:100%;height:100%;cursor:grab;touch-action:none}" +
"#wcm .wc-bar{position:absolute;top:max(10px,env(safe-area-inset-top,0px));left:12px;display:flex;gap:6px;flex-wrap:wrap;z-index:2;max-width:calc(100vw - 24px)}" +
"#wcm .wc-b{background:rgba(16,14,10,.88);border:1px solid #C9A868;color:#F2E6C8;border-radius:4px;padding:7px 12px;font:14px var(--sans,sans-serif);cursor:pointer;min-width:38px}" +
"#wcm .wc-b:hover{background:#3A2E14}" +
"#wcm .wc-t{font:bold 19px Georgia,serif;color:#F6ECD0;padding:6px 10px;background:rgba(16,14,10,.75);border-radius:4px}" +
"#wcm .wc-side{position:absolute;right:10px;top:max(10px,env(safe-area-inset-top,0px));bottom:12px;width:320px;background:rgba(14,12,10,.99);border:1px solid #C9A868;border-radius:6px;display:flex;flex-direction:column;z-index:3}" +
"#wcm .wc-side input{margin:10px;padding:8px;border-radius:4px;border:1px solid #6A5A3A;background:#1A1814;color:#F2E6C8;font:14px var(--sans,sans-serif)}" +
"#wcm .wc-l{flex:1;overflow:auto;padding:0 12px 10px}" +
"#wcm .wc-l h4{margin:10px 0 2px;font:bold 15px Georgia,serif;color:#E8C878}" +
"#wcm .wc-l .wc-ab{font-size:12px;color:#A89C80;margin-bottom:4px}" +
"#wcm .wc-l .wc-h{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#C9A868;margin:6px 0 2px}" +
"#wcm .wc-p{display:inline-block;margin:2px 4px 2px 0;padding:3px 8px;border:1px solid #33363F;border-radius:3px;cursor:pointer;font-size:13px;background:#171920;color:#E8E4DA}" +
"#wcm .wc-p.on{border-color:#E8C878;background:#3A2E14}" +
"#wcm .wc-where{position:absolute;left:12px;bottom:46px;max-width:min(520px,calc(100vw - 24px));background:rgba(250,242,222,.96);color:#2A1E0E;border:2px solid #8A6A30;border-radius:6px;padding:8px 12px;display:none;z-index:2;font-size:14px}" +
"@media (max-width:700px),(max-height:500px){#wcm .wc-b{padding:6px 9px;font-size:13px}#wcm .wc-t{font-size:16px}}" +
"@media (max-width:700px){#wcm .wc-side{left:10px;width:auto;top:auto;height:44vh}#wcm .wc-where{bottom:calc(44vh + 22px)}#wcm .wc-b{padding:6px 9px;font-size:13px}#wcm .wc-t{font-size:16px}}";
document.head.appendChild(s);
},
function (opt) {
opt = opt || {};
if (WCM.open)
return;
if (!wcmReady()) {
if (typeof worldCard === "function" && typeof worldFacts === "function")
try {
worldCard(worldFacts("🗺️ The map of Somnucor", "", [], ["The city map opens in Somnucor. The Atlas of All Worlds opens anywhere."]), {});
return;
}
catch (e) { }
if (typeof toast === "function")
try {
toast("The city map opens in Somnucor.");
}
catch (e) { }
return;
}
wmClose();
wcmCss();
if (document.exitPointerLock && document.pointerLockElement)
try {
document.exitPointerLock();
}
catch (e) { }
var el = document.createElement("div");
el.id = "wcm";
el.innerHTML = "<canvas></canvas><div class='wc-bar'><span class='wc-t'>Somnucor</span>" +
"<button class='wc-b' data-a='in' type='button' title='Closer'>+</button><button class='wc-b' data-a='out' type='button' title='Further'>−</button>" +
"<button class='wc-b' data-a='me' type='button'>📍 Me</button><button class='wc-b' data-a='fit' type='button' title='The whole city'>⤢</button>" +
"<button class='wc-b' data-a='list' type='button'>Places</button><button class='wc-b' data-a='atlas' type='button'>🌍 All worlds</button>" +
"<button class='wc-b' data-a='close' type='button'>Close</button></div><div class='wc-where'></div>" +
"<div class='wc-side'><input type='search' placeholder='Find a place…' aria-label='Find a place'><div class='wc-l'></div></div>";
document.body.appendChild(el);
["keydown", "keyup"].forEach(function (k) { el.addEventListener(k, function (e) { if (e.code !== "Escape")
e.stopPropagation(); }); });
WCM.el = el;
WCM.cv = el.querySelector("canvas");
WCM.g = WCM.cv.getContext("2d");
WCM.open = true;
WCM.pick = null;
WCM.ptr = {};
WCM.list = !(innerWidth < 700 || innerHeight < 500);
WCM.ring = opt.ring !== undefined ? opt.ring : null;
WCM.P = wcmGather();
el.querySelector(".wc-side").style.display = WCM.list ? "flex" : "none";
wcmResize();
wcmFit();
var Y = wcmHereXY();
if (Y && opt.me !== false)
wcmCenter(Y.x, Y.z, Math.max(WCM.s, 0.5));
wcmListFill("");
el.querySelector("input").addEventListener("input", function (e) { wcmListFill(e.target.value || ""); });
el.querySelector(".wc-bar").addEventListener("click", function (e) {
var a = e.target && e.target.getAttribute && e.target.getAttribute("data-a");
if (!a)
return;
if (a === "close")
wcmClose();
else if (a === "in")
wcmZoomAt(WCM.vw / 2, WCM.vh / 2, 1.5);
else if (a === "out")
wcmZoomAt(WCM.vw / 2, WCM.vh / 2, 1 / 1.5);
else if (a === "fit") {
wcmFit();
wcmClamp();
wcmDirty();
}
else if (a === "me") {
var Y2 = wcmHereXY();
if (Y2)
wcmCenter(Y2.x, Y2.z, 1);
else
wcmWhere("You are not in the city's streets just now.");
}
else if (a === "list") {
WCM.list = !WCM.list;
el.querySelector(".wc-side").style.display = WCM.list ? "flex" : "none";
}
else if (a === "atlas") {
wcmClose();
wmOpen();
}
});
var cv = WCM.cv;
cv.addEventListener("pointerdown", function (e) {
cv.setPointerCapture && cv.setPointerCapture(e.pointerId);
WCM.ptr[e.pointerId] = { x: e.clientX, y: e.clientY };
var ids = Object.keys(WCM.ptr);
WCM.moved = false;
if (ids.length === 1)
WCM.drag = { x: e.clientX, y: e.clientY, ox: WCM.ox, oy: WCM.oy, sx: e.clientX, sy: e.clientY };
else if (ids.length === 2) {
var a = WCM.ptr[ids[0]], b = WCM.ptr[ids[1]];
WCM.pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s: WCM.s, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2, ox: WCM.ox, oy: WCM.oy };
WCM.drag = null;
WCM.moved = true;
}
cv.style.cursor = "grabbing";
});
cv.addEventListener("pointermove", function (e) {
if (!WCM.ptr[e.pointerId])
return;
WCM.ptr[e.pointerId] = { x: e.clientX, y: e.clientY };
var ids = Object.keys(WCM.ptr);
if (WCM.pinch && ids.length >= 2) {
var a = WCM.ptr[ids[0]], b = WCM.ptr[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y), P = WCM.pinch;
var ns = P.s * d / Math.max(1, P.d), mx = (P.mx - P.ox) / P.s, my = (P.my - P.oy) / P.s;
WCM.s = ns;
WCM.ox = (a.x + b.x) / 2 - mx * ns;
WCM.oy = (a.y + b.y) / 2 - my * ns;
wcmClamp();
wcmDirty();
return;
}
if (WCM.drag) {
if (Math.hypot(e.clientX - WCM.drag.sx, e.clientY - WCM.drag.sy) > 6)
WCM.moved = true;
WCM.ox = WCM.drag.ox + e.clientX - WCM.drag.x;
WCM.oy = WCM.drag.oy + e.clientY - WCM.drag.y;
wcmClamp();
wcmDirty();
}
});
var up = function (e) {
var had = !!WCM.ptr[e.pointerId];
delete WCM.ptr[e.pointerId];
if (had && !WCM.moved && WCM.drag && e.type === "pointerup") {
var r = cv.getBoundingClientRect();
wcmTap(e.clientX - r.left, e.clientY - r.top);
}
if (Object.keys(WCM.ptr).length < 2)
WCM.pinch = null;
if (!Object.keys(WCM.ptr).length) {
WCM.drag = null;
cv.style.cursor = "grab";
}
else if (Object.keys(WCM.ptr).length === 1) {
var q = WCM.ptr[Object.keys(WCM.ptr)[0]];
WCM.drag = { x: q.x, y: q.y, ox: WCM.ox, oy: WCM.oy, sx: q.x, sy: q.y };
}
};
cv.addEventListener("pointerup", up);
cv.addEventListener("pointercancel", up);
cv.addEventListener("wheel", function (e) { e.preventDefault(); var r = cv.getBoundingClientRect(); wcmZoomAt(e.clientX - r.left, e.clientY - r.top, Math.pow(1.0015, -e.deltaY)); }, { passive: false });
WCM.onResize = function () { wcmResize(); wcmClamp(); wcmPaint(true); };
addEventListener("resize", WCM.onResize);
wcmPaint(true);
},
function (n, x, z) {
WCM.pick = { name: n, x: x, z: z };
var ri = typeof rmapRingAt === "function" ? rmapRingAt(x + ATLC.x, z + ATLC.z) : null, Y = wcmHereXY(), h = "<b>" + esc(n) + "</b>" + (ri !== null && ri !== undefined ? " on " + esc(ATL_RINGS[ri].name) : "");
if (Y) {
var dx = x - Y.x, dz = z - Y.z, d = Math.hypot(dx, dz), b = typeof bearingOf === "function" ? bearingOf(dx, dz) : 0, pt = typeof pointOf === "function" ? String(pointOf(b)) : "";
var dirs = { N: "north", NE: "north-east", E: "east", SE: "south-east", S: "south", SW: "south-west", W: "west", NW: "north-west" };
h += ": about " + (d < 1000 ? Math.round(d / 10) * 10 + " m" : (d / 1000).toFixed(1) + " km") + (d > 15 && pt ? " to the " + esc(dirs[pt] || pt.toLowerCase()) : "") + " from you.";
}
wcmWhere(h, true);
wcmPaint(true);
if (WCM.el)
WCM.el.querySelectorAll(".wc-p").forEach(function (p) { p.classList.toggle("on", p.getAttribute("data-n") === n); });
},
function (q) {
var L = WCM.el && WCM.el.querySelector(".wc-l");
if (!L)
return;
q = String(q || "").toLowerCase().trim();
var by = {}, R = ATL_RINGS, H = [];
WCM.P.names.forEach(function (N) { if (q && N.n.toLowerCase().indexOf(q) < 0)
return; (by[N.ring] || (by[N.ring] = { work: [], land: [], area: [] }))[N.kind].push(N); });
var lotN = {};
WCM.P.lots.forEach(function (Lt) { lotN[Lt.k] = (lotN[Lt.k] || 0) + 1; });
var Y = wcmHereXY(), hereRing = Y && typeof rmapRingAt === "function" ? rmapRingAt(Y.x + ATLC.x, Y.z + ATLC.z) : null;
R.forEach(function (Ri, i) {
var B = by[i];
if (q && !B)
return;
H.push("<h4>" + (i ? i + ". " : "") + esc(Ri.name) + (hereRing === i ? " <span style='color:#FF8A8A;font:12px sans-serif'>● you are here</span>" : "") + "</h4>");
if (!q) {
var ab = (typeof RMAP_ABOUT !== "undefined" && RMAP_ABOUT[Ri.k]) || "";
if (Ri.k === "temples") {
ab = "Temple Row: the Temple of the Obsidian Moon, the churches, and the city's life between them: " +
Object.keys(lotN).filter(function (k) { return k !== "gate"; }).map(function (k) { return lotN[k] + " " + ({ cafe: "cafés", shop: "shops", park: "parks", plaza: "plazas", museum: "museums", lido: "lidos", cinema: "cinemas", library: "libraries", playground: "playgrounds", hotel: "hotels", garden: "gardens" }[k] || k); }).join(", ") + ".";
}
if (ab)
H.push("<div class='wc-ab'>" + esc(ab) + "</div>");
}
if (!B)
return;
[["work", "Workplaces and services"], ["land", "Landmarks"], ["area", "Streets, quarters and markets"]].forEach(function (T) {
var A = B[T[0]].slice().sort(function (a, b) { return a.n.replace(/^The /, "").localeCompare(b.n.replace(/^The /, "")); });
if (!A.length)
return;
H.push("<div class='wc-h'>" + T[1] + "</div>" + A.map(function (N) { return "<span class='wc-p' data-n='" + esc(N.n) + "' data-x='" + N.x.toFixed(1) + "' data-z='" + N.z.toFixed(1) + "'>" + esc(N.n) + "</span>"; }).join(""));
});
});
if (!H.length)
H.push("<div class='wc-ab' style='margin-top:10px'>Nothing by that name.</div>");
L.innerHTML = H.join("");
L.querySelectorAll(".wc-p").forEach(function (p) {
p.onclick = function () {
var x = +p.getAttribute("data-x"), z = +p.getAttribute("data-z");
wcmPick(p.getAttribute("data-n"), x, z);
wcmCenter(x, z, Math.max(WCM.s, 0.9));
};
});
},
function () {
if (!WCM.open)
return;
WCM.open = false;
clearTimeout(WCM.idleT);
if (WCM.raf)
cancelAnimationFrame(WCM.raf);
WCM.raf = 0;
if (WCM.onResize)
removeEventListener("resize", WCM.onResize);
if (WCM.el && WCM.el.parentNode)
WCM.el.parentNode.removeChild(WCM.el);
if (WCM.fast) {
WCM.fast.width = 0;
WCM.fast.height = 0;
}
WCM.el = null;
WCM.cv = null;
WCM.g = null;
WCM.fast = null;
WCM.P = null;
WCM.ptr = {};
WCM.pick = null;
},
function () {
if (typeof worldCard !== "function" || typeof worldBtn !== "function") {
wmOpen();
return;
}
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🗺️ Maps</div><div style='opacity:.8;font-size:12.5px;margin:2px 0 8px'>Two maps, always up to date.</div>", fns = {};
h += worldBtn("all", "🌍 The Atlas of All Worlds", "Every world on one map, and how to get to each");
fns.all = function () { worldCard(null); wmOpen(); };
h += worldBtn("city", "🏙️ The map of Somnucor", "Every ring, street and building, and every place by name");
fns.city = function () { worldCard(null); wcmOpen(); };
worldCard(h, fns);
},
function () {
var out = [], seen = {};
function add(S) { if (seen[S.id])
return; seen[S.id] = 1; out.push(S); }
try {
if (typeof CT_TALES !== "undefined")
CT_TALES.forEach(function (T) {
var sh = /^sh_/.test(T.id), vn = /^vn_/.test(T.id);
add({ id: "ct:" + T.id, t: T.t || T.id, by: T.by || "", where: T.where || "", host: wmsHostKey(T.host), kind: sh ? "Acted in the Globe's own world" : vn ? "Played out in Verne's world" : "A story you can step into", live: true });
});
}
catch (e) { }
try {
if (typeof SHK_PLAYS !== "undefined")
SHK_PLAYS.forEach(function (p) {
if (p[5] && seen["ct:" + p[5]])
return;
add({ id: "shk:" + p[0], t: p[0], by: "William Shakespeare, " + p[1], where: "Read it at the Folio Library, Stationers' Hall", host: "bard", kind: "In the Folio Library (" + p[2] + ")", live: false, about: p[3] });
});
}
catch (e) { }
try {
if (typeof GMM_TALES !== "undefined")
GMM_TALES.forEach(function (T) {
add({ id: "gmm:" + T[0], t: T[2], by: "The Brothers Grimm, tale " + T[0] + " (" + T[1] + ")", where: "In the Grimm Wood", host: "grimm", kind: "A Grimm tale", live: true, about: T[3] });
});
}
catch (e) { }
try {
if (typeof OVY_CH !== "undefined")
OVY_CH.forEach(function (C, i) {
var isle = (typeof SEA_BY !== "undefined" && SEA_BY[C.at] && (SEA_BY[C.at].n || SEA_BY[C.at].name)) || String(C.at || "").replace(/^./, function (x) { return x.toUpperCase(); });
add({ id: "ovy:" + C.k, t: (i + 1) + ". " + C.title, by: "Homer, the Odyssey, " + C.book, where: "On the Endless Sea, at " + isle.replace(/^The /, "the ") + (C.goal ? ": " + C.goal : ""), host: "sea", kind: C.part === 2 ? "The Odyssey, part two: the son's search" : "The Odyssey: the long way home from Troy", live: true });
});
}
catch (e) { }
try {
if (typeof EVB_TALES !== "undefined")
EVB_TALES.forEach(function (T) {
add({ id: "evb:" + T.t, t: T.t, by: T.by || "", where: "Faerie, in the Fairy Castle", host: "faerie", kind: "Told in the Fairy Castle", live: true });
});
}
catch (e) { }
try {
if (typeof SHC_TALES !== "undefined")
SHC_TALES.forEach(function (T) {
add({ id: "shc:" + T.n, t: T.n, by: T.by || "", where: "Samhain Night, at the Storyteller's Fire", host: "samhain", kind: "At the Storyteller's Fire", live: true });
});
}
catch (e) { }
try {
if (typeof DAV_QUESTS !== "undefined")
Object.keys(DAV_QUESTS).forEach(function (k) {
var Q = DAV_QUESTS[k];
add({ id: "dav:" + k, t: Q.name, by: "Leonardo da Vinci's Italy", where: Q.what || "", host: "davinci", kind: "Leonardo's quests", live: true });
});
}
catch (e) { }
WMS_OZ.forEach(function (B, i) {
var n = i + 1, built = n === 1 ? typeof OZ_BOOK !== "undefined" : typeof window["OZ_B" + n + "_BOOK"] !== "undefined";
add({ id: "oz:" + n, t: B[0], by: "L. Frank Baum, " + B[1] + " (book " + n + " of 14)", where: built ? "In the Land of Oz, in costume, chapter by chapter" : "Coming to the Land of Oz", host: "oz", kind: built ? "An Oz book you can play" : "An Oz book still to come", live: built });
});
if (wmNodeOf("guildlands"))
WM_NODES.forEach(function (N) { if (/^gld_/.test(N.k))
add({ id: "g:" + N.k, cat: "guild", t: N.secret ? "A hidden guild house" : N.n, by: N.secret ? "" : N.s || "", where: N.secret ? "Its door is one of the game's secrets" : "Its own hall, on the map around the Guildlands", host: "guildlands", kind: "The guild halls", live: true }); });
if (wmNodeOf("guildlands")) {
add({ id: "g:hands", cat: "guild", t: "The Guild of Hands", by: "The Guildhall in Anvilmere, and the Board of Masters", where: "The Guildlands: Anvilmere, the Guild town", host: "guildlands", kind: "The Guild of Hands", live: true });
try {
if (typeof HND_SKILLS !== "undefined")
HND_SKILLS.forEach(function (S) {
add({ id: "g:hnd_" + S.k, cat: "guild", t: (S.icon ? S.icon + " " : "") + S.name, by: S.gather ? "a gathering craft" : "a making craft", where: S.gather ? "Its lodge at the edge of its own country, in the Guildlands" : "Its workshop and master in Anvilmere", host: "guildlands", kind: "The Guild of Hands' crafts", live: true });
});
}
catch (e) { }
}
if (typeof MNG !== "undefined" && wmNodeOf("guildlands"))
add({ id: "g:miners", cat: "guild", t: "The Miners' Guild", by: "contracts, the week's table and the ranks, Trammer to Deep Master", where: "At every mine: the Deepdelve Mines and the Deep Workings below, and each world's own mine", host: "guildlands", kind: "Guilds out in the worlds", live: true });
if (wmNodeOf("guildlands") && typeof udHeight === "function")
add({ id: "g:ferry", cat: "guild", t: "The Ferry Guild", by: "boats lent free from Pell's Boat Shed", where: "On the shore of the Sunless Sea", host: "guildlands", kind: "Guilds out in the worlds", live: true });
if (wmNodeOf("guildlands"))
add({ id: "g:decor", cat: "guild", t: "The Decorators' Guild", by: "a Head decorator and the Decorators, real posts with real hours", where: "In the Commons: they dress the city for each season", host: "guildlands", kind: "Guilds out in the worlds", live: true });
try {
if (typeof NVB_CH !== "undefined" && NVB_CH.length && wmNodeOf("neverland"))
NVB_CH.forEach(function (C, i) {
add({ id: "nvb:" + i, t: (i + 1) + ". " + C.t, by: "J. M. Barrie, Peter and Wendy (1911)", where: "Neverland, and the Darlings' nursery", host: "neverland", kind: "Peter and Wendy, all " + NVB_CH.length + " chapters", live: true });
});
}
catch (e) { }
if (wmNodeOf("neverland") && !(typeof NVB_CH !== "undefined" && NVB_CH.length))
add({ id: "nl:peter", t: "Peter and Wendy", by: "J. M. Barrie, 1911", where: "Neverland: second to the right, and straight on till morning", host: "neverland", kind: "A story you can step into", live: true });
return out;
},
function () {
var c = document.createElement("canvas").getContext("2d"), by = wmsByHost(), boxes = [], tags = [];
WM.pos.forEach(function (P) {
var fs = P.k === "city" ? 34 : P.N.big ? 24 : P.sat ? 15 : 18, L = wmLines(P.N.n), w = 0;
c.font = "bold " + fs + "px " + WM_SERIF;
L.forEach(function (t) { w = Math.max(w, c.measureText(t).width); });
var ly = P.y + (P.k === "city" ? 172 : P.r + 16);
boxes.push([P.x - P.r - 4, P.y - P.r - 4, P.x + P.r + 4, P.y + P.r + 4]);
boxes.push([P.x - w / 2 - 4, ly - 2, P.x + w / 2 + 4, ly + L.length * fs * 1.12 + 4]);
});
boxes.push([WM_W / 2 - 390, 10, WM_W / 2 + 390, 104]);
boxes.push([2060, 1430, 2240, 1610]);
try {
var dc = document.createElement("canvas");
dc.width = 64;
dc.height = 42;
var dg = dc.getContext("2d");
dg.scale(0.02, 0.02);
WM.obst = [];
wmDraw(dg, 1);
boxes = boxes.concat(WM.obst);
dc.width = 0;
}
catch (e) { }
WM.obst = null;
function hits(b) { for (var i = 0; i < boxes.length; i++) {
var o = boxes[i];
if (b[0] < o[2] && b[2] > o[0] && b[1] < o[3] && b[3] > o[1])
return true;
} return false; }
Object.keys(by).sort(function (a, b) { return by[b].length - by[a].length; }).forEach(function (k) {
var P = wmNodeOf(k);
if (!P)
return;
var L = by[k], fs = 11, lh = 13.5, R = P.k === "city" ? 160 : P.r;
var ly = P.y + (P.k === "city" ? 172 : P.r + 16) + wmLines(P.N.n).length * 20 + 6;
for (var show = Math.min(L.length, 4); show >= 0; show--) {
var lines = [wmapHead(L)];
L.slice(0, show).forEach(function (S) { var t = S.t; if (t.length > 30)
t = t.slice(0, 28) + "…"; lines.push(t); });
if (L.length > show)
lines.push(show ? "and " + (L.length - show) + " more · tap" : "tap to see them");
c.font = "bold " + fs + "px " + WM_SERIF;
var w = 0;
lines.forEach(function (t) { w = Math.max(w, c.measureText(t).width); });
w += 16;
var h = lines.length * lh + 10;
var tries = [[P.x + R + 10, P.y - h / 2], [P.x - R - 10 - w, P.y - h / 2], [P.x - w / 2, ly], [P.x - w / 2, P.y - R - 10 - h], [P.x + R + 6, P.y - R], [P.x - R - 6 - w, P.y - R], [P.x + R + 6, P.y + R - h], [P.x - R - 6 - w, P.y + R - h],
[P.x + R + 6, P.y + R + 4], [P.x - R - 6 - w, P.y + R + 4], [P.x + R + 6, P.y - R - h - 4], [P.x - R - 6 - w, P.y - R - h - 4], [P.x + w * 0.6, ly], [P.x - w * 1.6, ly]];
var near = tries.length;
for (var d = R + 20; d <= R + 200; d += 15)
for (var q = 0; q < 16; q++) {
var an = q * Math.PI / 8;
tries.push([P.x + Math.cos(an) * (d + w / 2) - w / 2, P.y + Math.sin(an) * (d + h / 2) - h / 2]);
}
for (var i = 0; i < tries.length; i++) {
var x = tries[i][0], y = tries[i][1], bx = [x, y, x + w, y + h];
if (x < 6 || y < 6 || x + w > WM_W - 6 || y + h > WM_H - 6 || hits(bx))
continue;
boxes.push(bx);
tags.push({ k: k, x: x, y: y, w: w, h: h, lines: lines, P: P, far: i >= near });
return;
}
}
});
return tags;
},
function (g, s) {
if (!WM.stories || !WM.stories.length)
return;
var by = wmsByHost();
WM.pos.forEach(function (P) {
var L = by[P.k];
if (!L || P.r * s < 5)
return;
var R = P.k === "city" ? 150 : P.r, a = P.N.planet ? -Math.PI * 0.25 : -Math.PI * 0.75, x = P.x + Math.cos(a) * R * 0.95, y = P.y + Math.sin(a) * R * 0.95, br = Math.max(10, P.r * 0.32);
g.save();
g.fillStyle = "#2A1A08";
g.beginPath();
g.arc(x, y, br + 2.5, 0, Math.PI * 2);
g.fill();
g.fillStyle = "#F4E6C0";
g.beginPath();
g.arc(x, y, br, 0, Math.PI * 2);
g.fill();
g.fillStyle = "#6A2A18";
g.font = "bold " + Math.round(br * 1.05) + "px " + WM_SERIF;
g.textAlign = "center";
g.textBaseline = "middle";
g.fillText(String(L.length), x, y + 1);
g.restore();
});
if (s < 0.7 || !WM.tags)
return;
WM.tags.forEach(function (T) {
var P = T.P, R = P.k === "city" ? 150 : P.r, cx = Math.max(T.x, Math.min(P.x, T.x + T.w)), cy = Math.max(T.y, Math.min(P.y, T.y + T.h)), dd = Math.hypot(cx - P.x, cy - P.y);
if (T.far && dd > R + 20) {
g.save();
g.lineCap = "round";
g.beginPath();
g.moveTo(P.x + (cx - P.x) / dd * (R + 4), P.y + (cy - P.y) / dd * (R + 4));
g.lineTo(cx, cy);
g.strokeStyle = "rgba(20,14,6,0.8)";
g.lineWidth = 5;
g.stroke();
g.strokeStyle = "#F4D88A";
g.lineWidth = 2.4;
g.setLineDash([6, 5]);
g.stroke();
g.restore();
}
g.save();
g.shadowColor = "rgba(0,0,0,0.45)";
g.shadowBlur = 8;
g.shadowOffsetY = 2;
g.fillStyle = "rgba(248,238,210,0.95)";
wmRound(g, T.x, T.y, T.w, T.h, 6);
g.fill();
g.restore();
g.save();
g.lineWidth = 1.2;
g.strokeStyle = "#8A6A30";
wmRound(g, T.x, T.y, T.w, T.h, 6);
g.stroke();
g.textAlign = "left";
g.textBaseline = "top";
T.lines.forEach(function (t, i) {
var last = i === T.lines.length - 1 && / · tap$|^tap to see/.test(t);
g.font = (i === 0 ? "bold " : last ? "italic " : "") + "11px " + WM_SERIF + "," + WM_EMOJI;
g.fillStyle = i === 0 ? "#6A2A18" : last ? "#7A6040" : "#2A1E0E";
g.fillText(i === 0 || last ? t : "· " + t, T.x + 8, T.y + 6 + i * 13.5);
});
g.restore();
});
},
function (k) {
var L = wmsByHost()[k];
if (!L || !L.length)
return "";
var groups = {}, order = [];
L.forEach(function (S) { if (!groups[S.kind]) {
groups[S.kind] = [];
order.push(S.kind);
} groups[S.kind].push(S); });
var h = ["<div class='wm-h'>" + esc(wmapHead(L)) + "</div>"];
order.forEach(function (kd) {
if (order.length > 1)
h.push("<div class='wms-g'>" + esc(kd) + " (" + groups[kd].length + ")</div>");
groups[kd].forEach(function (S) {
h.push("<div class='wms-s" + (S.live ? "" : " wms-off") + "' data-s='" + esc(S.id) + "'><b>" + esc(S.t) + "</b>" + (S.by ? " <i>" + esc(S.by) + "</i>" : "") +
(S.where ? "<div class='wms-w'>" + esc(S.where) + "</div>" : "") + "</div>");
});
});
return h.join("");
},
function (on, cat) {
cat = cat || "story";
WM.slist = on ? cat : false;
var L = WM.el && WM.el.querySelector(".wm-list");
if (!L)
return;
if (!on) {
if (!WM.list)
L.style.display = "none";
return;
}
WM.list = false;
var by = wmsByHost(cat), keys = Object.keys(by).sort(function (a, b) { var A = wmNodeOf(a), B = wmNodeOf(b); return (A ? A.N.n : a).localeCompare(B ? B.N.n : b); });
var h = ["<div style='font:bold 17px Georgia,serif;color:#F2E6C8'>" + (cat === "guild" ? "Every guild" : "Every story") + " (" + wmsCount(cat) + ")</div><div style='font-size:12px;color:#B8AC90'>Each in the world it is found in. Tap one to find it.</div>"];
keys.forEach(function (k) {
var P = wmNodeOf(k);
if (!P)
return;
h.push("<h4>" + esc((P.N.e || "") + " " + P.N.n) + " <span style='font:12px sans-serif;color:#9A8E70'>(" + by[k].length + ")</span></h4>");
by[k].forEach(function (S) { h.push("<button class='wm-li wms-li' type='button' data-k='" + esc(k) + "' data-s='" + esc(S.id) + "'" + (S.live ? "" : " style='color:#B8AC90'") + ">" + esc(S.t) + "</button>"); });
});
L.innerHTML = h.join("");
L.style.display = "block";
L.querySelectorAll(".wms-li").forEach(function (b) {
b.onclick = function () {
var P = wmNodeOf(b.getAttribute("data-k"));
if (!P)
return;
WM.sel = P.k;
wmCard(P);
wmsLight(b.getAttribute("data-s"));
if (WM.vw < 700)
wmsList(false, cat);
wmCenterOn(P, Math.max(0.9, WM.s));
};
});
}
];
});
