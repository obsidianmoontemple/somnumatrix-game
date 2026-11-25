/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(312, function () {
"use strict";
return [
function (col, o) {
o = o || {};
var k = col + "|" + (o.e || 0) + "|" + (o.op || 1) + "|" + (o.ds ? 1 : 0) + "|" + (o.b ? 1 : 0) + "|" + (o.map || "");
if (FL_MAT[k])
return FL_MAT[k];
var m = o.b ? new THREE.MeshBasicMaterial({ color: col }) : new THREE.MeshLambertMaterial({ color: col });
if (o.e !== undefined && !o.b)
m.emissive = new THREE.Color(o.e);
if (o.op !== undefined && o.op < 1) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
if (o.map && FL_TEX[o.map])
m.map = FL_TEX[o.map]();
FL_MAT[k] = m;
return m;
},
function (w, h, d, mat, x, y, z, G, tile) {
var g = new THREE.BoxGeometry(w, h, d), uv = g.attributes.uv, t = tile || 2;
var sz = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
for (var f = 0; f < 6; f++)
for (var v = 0; v < 4; v++) {
var i = f * 4 + v;
uv.setXY(i, uv.getX(i) * sz[f][0] / t, uv.getY(i) * sz[f][1] / t);
}
return wMesh(g, mat, x, y, z, G);
},
function () {
return flCanvasTex("carpet", 256, function (x, W, H) {
x.fillStyle = "#6A7458";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(201,168,104,.45)";
x.lineWidth = 3;
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++) {
var cx = W / 4 + i * W / 2, cy = H / 4 + j * H / 2;
x.beginPath();
x.moveTo(cx, cy - 40);
x.quadraticCurveTo(cx + 30, cy, cx, cy + 40);
x.quadraticCurveTo(cx - 30, cy, cx, cy - 40);
x.stroke();
x.fillStyle = "rgba(226,196,196,.55)";
x.beginPath();
x.arc(cx, cy, 9, 0, 7);
x.fill();
}
x.strokeStyle = "rgba(226,196,196,.3)";
x.lineWidth = 2;
for (var k = 0; k <= 4; k++) {
x.beginPath();
x.moveTo(k * W / 2, 0);
x.lineTo(k * W / 2 - W, H);
x.stroke();
x.beginPath();
x.moveTo(k * W / 2 - W, 0);
x.lineTo(k * W / 2, H);
x.stroke();
}
});
},
function () {
return flCanvasTex("rosecarpet", 256, function (x, W, H) {
x.fillStyle = "#B88C8E";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
var cx = W / 8 + i * W / 4 + (j % 2) * W / 8, cy = H / 8 + j * H / 4;
x.fillStyle = "rgba(236,214,206,.45)";
for (var p = 0; p < 5; p++) {
var a = p / 5 * 6.283;
x.beginPath();
x.arc(cx + Math.cos(a) * 7, cy + Math.sin(a) * 7, 6, 0, 7);
x.fill();
}
x.fillStyle = "rgba(201,168,104,.7)";
x.beginPath();
x.arc(cx, cy, 4, 0, 7);
x.fill();
}
});
},
function () {
return flCanvasTex("damask", 256, function (x, W, H) {
x.fillStyle = "#CFC6B4";
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(180,168,140,.5)";
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++) {
var cx = W / 4 + i * W / 2 + (j % 2) * W / 4, cy = H / 4 + j * H / 2;
x.beginPath();
x.moveTo(cx, cy - 52);
x.bezierCurveTo(cx + 40, cy - 30, cx + 34, cy + 20, cx, cy + 52);
x.bezierCurveTo(cx - 34, cy + 20, cx - 40, cy - 30, cx, cy - 52);
x.fill();
x.fillStyle = "rgba(201,168,104,.3)";
x.beginPath();
x.arc(cx, cy, 10, 0, 7);
x.fill();
x.fillStyle = "rgba(180,168,140,.5)";
}
x.fillStyle = "rgba(201,168,104,.4)";
x.fillRect(0, 0, W, 3);
});
},
function () {
return flCanvasTex("pinkdamask", 256, function (x, W, H) {
x.fillStyle = "#D6B4B4";
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(230,208,200,.6)";
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++) {
var cx = W / 4 + i * W / 2 + (j % 2) * W / 4, cy = H / 4 + j * H / 2;
x.beginPath();
x.moveTo(cx, cy - 48);
x.bezierCurveTo(cx + 36, cy - 26, cx + 30, cy + 18, cx, cy + 48);
x.bezierCurveTo(cx - 30, cy + 18, cx - 36, cy - 26, cx, cy - 48);
x.fill();
}
x.strokeStyle = "rgba(176,180,196,.6)";
x.lineWidth = 2;
x.strokeRect(1, 1, W - 2, H - 2);
});
},
function () {
return flCanvasTex("marble", 256, function (x, W, H) {
x.fillStyle = "#D0CAC0";
x.fillRect(0, 0, W, H);
var R = wRand(77);
x.strokeStyle = "rgba(140,130,120,.3)";
for (var i = 0; i < 14; i++) {
x.lineWidth = 0.6 + R() * 1.6;
x.beginPath();
var px = R() * W, py = 0;
x.moveTo(px, py);
for (var s = 0; s < 8; s++) {
px += (R() - 0.5) * 50;
py += H / 8;
x.lineTo(px, py);
}
x.stroke();
}
x.strokeStyle = "rgba(120,110,100,.22)";
x.lineWidth = 2;
x.strokeRect(0, 0, W, H);
});
},
function () {
return flCanvasTex("parquet", 256, function (x, W, H) {
var cols = ["#6A4430", "#7A5038", "#5E3C2A", "#704834"];
for (var i = 0; i < 8; i++)
for (var j = 0; j < 8; j++) {
x.fillStyle = cols[(i + j * 3) % 4];
if ((i + j) % 2)
x.fillRect(i * 32, j * 32, 32, 16), x.fillRect(i * 32, j * 32 + 16, 32, 16);
else
x.fillRect(i * 32, j * 32, 16, 32), x.fillRect(i * 32 + 16, j * 32, 16, 32);
}
x.strokeStyle = "rgba(30,18,10,.35)";
for (var k = 0; k <= 16; k++) {
x.beginPath();
x.moveTo(k * 16, 0);
x.lineTo(k * 16, H);
x.stroke();
}
});
},
function () {
return flCanvasTex("coffer", 256, function (x, W, H) {
x.fillStyle = "#BCB2A0";
x.fillRect(0, 0, W, H);
x.fillStyle = "#D2CAB8";
x.fillRect(18, 18, W - 36, H - 36);
x.strokeStyle = "rgba(201,168,104,.75)";
x.lineWidth = 5;
x.strokeRect(16, 16, W - 32, H - 32);
x.fillStyle = "rgba(201,168,104,.6)";
x.beginPath();
x.arc(W / 2, H / 2, 14, 0, 7);
x.fill();
});
},
function () {
return flCanvasTex("stone", 128, function (x, W, H) {
x.fillStyle = "#7A7680";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(40,36,44,.4)";
x.lineWidth = 2;
for (var j = 0; j < 4; j++) {
x.beginPath();
x.moveTo(0, j * 32);
x.lineTo(W, j * 32);
x.stroke();
for (var i = 0; i < 3; i++) {
var ox = (j % 2) * 21 + i * 42;
x.beginPath();
x.moveTo(ox, j * 32);
x.lineTo(ox, j * 32 + 32);
x.stroke();
}
}
});
},
function (G, x0, x1, z0, z1, o) {
o = o || {};
var h = o.h || 5, gaps = o.gaps || [], skip = o.skip || [];
flWalls(G, x0, x1, z0, z1, h, o.wall || flM(0xD8D0C2, { map: "damask" }), gaps, o.tile || 3, skip, o.trim !== false ? { rail: Math.min(h - 0.3, 3.7), skirt: o.skirt || 0x4A3A2A } : null);
flPlane(x1 - x0, z1 - z0, o.floor || flM(0xD8D0C2, { map: "carpet" }), (x0 + x1) / 2, 0.01, (z0 + z1) / 2, G, o.ftile || 3);
if (o.ceil !== false && !o.out)
flPlane(x1 - x0, z1 - z0, o.ceil || flM(0xD8D0C2, { map: "coffer", e: 0x1E1A14 }), (x0 + x1) / 2, h, (z0 + z1) / 2, G, o.ctile || 4, true);
FL.walk.push({ x0: x0, x1: x1, z0: z0, z1: z1, y: 0 });
var R = { name: o.name || "", x0: x0, x1: x1, z0: z0, z1: z1, h: h, where: o.where || "wed", hemi: o.hemi, out: !!o.out };
FL.rooms.push(R);
if (o.gate)
FL.gates.push({ x0: x0 + 0.25, x1: x1 - 0.25, z0: z0 + 0.25, z1: z1 - 0.25, need: o.gate, name: o.name });
return R;
},
function (G, x0, x1, z0, z1, h, mat, gaps, tile, skip, trim) {
var t = 0.3, gold = flM(0xB8945A, { e: 0x1A1208 }), gold2 = flM(0xC9A868, { e: 0x1A1208 }), sk = trim ? flM(trim.skirt) : null;
skip = skip || [];
function side(s, a0, a1, fixed, alongX, inward) {
var cuts = gaps.filter(function (g) { return g.s === s; }).map(function (g) { return [g.c - g.w / 2, g.c + g.w / 2, g.h || 3.4]; }).sort(function (a, b) { return a[0] - b[0]; });
var segs = [], at = a0;
cuts.forEach(function (c) { if (c[0] > at)
segs.push([at, c[0]]); at = Math.max(at, c[1]); });
if (at < a1)
segs.push([at, a1]);
var own = skip.indexOf(s) < 0;
segs.forEach(function (sg) {
var L = sg[1] - sg[0], mid = (sg[0] + sg[1]) / 2;
if (L < 0.05)
return;
if (own) {
if (alongX) {
flTBox(L, h, t, mat, mid, h / 2, fixed, G, tile);
flSolid(mid, fixed, L / 2, t / 2);
}
else {
flTBox(t, h, L, mat, fixed, h / 2, mid, G, tile);
flSolid(fixed, mid, t / 2, L / 2);
}
}
if (trim) {
var o = fixed + inward * 0.18;
if (alongX) {
flBox(L, 0.22, 0.06, sk, mid, 0.11, o, G);
flBox(L, 0.07, 0.05, gold, mid, trim.rail, o, G);
}
else {
flBox(0.06, 0.22, L, sk, o, 0.11, mid, G);
flBox(0.05, 0.07, L, gold, o, trim.rail, mid, G);
}
}
});
if (trim)
cuts.forEach(function (c) {
var a = c[1] - c[0];
if (c[2] + 0.1 >= trim.rail)
return;
var o = fixed + inward * 0.18, m = (c[0] + c[1]) / 2;
if (alongX)
flBox(a, 0.07, 0.05, gold, m, trim.rail, o, G);
else
flBox(0.05, 0.07, a, gold, o, trim.rail, m, G);
});
if (!own)
return;
cuts.forEach(function (c) {
var L = c[1] - c[0], mid = (c[0] + c[1]) / 2, dh = c[2];
if (h > dh + 0.1) {
if (alongX)
flTBox(L, h - dh, t, mat, mid, dh + (h - dh) / 2, fixed, G, tile);
else
flTBox(t, h - dh, L, mat, fixed, dh + (h - dh) / 2, mid, G, tile);
}
if (alongX) {
flBox(0.18, dh, 0.42, gold2, c[0], dh / 2, fixed, G);
flBox(0.18, dh, 0.42, gold2, c[1], dh / 2, fixed, G);
flBox(L + 0.36, 0.2, 0.42, gold2, mid, dh, fixed, G);
}
else {
flBox(0.42, dh, 0.18, gold2, fixed, dh / 2, c[0], G);
flBox(0.42, dh, 0.18, gold2, fixed, dh / 2, c[1], G);
flBox(0.42, 0.2, L + 0.36, gold2, fixed, dh, mid, G);
}
});
}
side("n", x0, x1, z0, true, 1);
side("s", x0, x1, z1, true, -1);
side("w", z0, z1, x0, false, 1);
side("e", z0, z1, x1, false, -1);
},
function () {
var R = FL.room, fam = FL.where === "fam";
if (R && R.out)
return { top: 0x6A8AB0, low: 0xB8C4C8, fog: 0xA8B4B4, fogD: 0.0022, sun: 0.62, sunCol: 0xFFF2E0, sunDir: [0.4, 0.85, 0.3],
hemi: 0.78, hemiCol: 0xF4F0E4, hemiGround: 0x5A6A44, stars: 0 };
return { top: 0x3A3A44, low: 0x2A2A30, fog: fam ? 0x3A342C : 0x34302A, fogD: 0.0035, sun: 0.35, sunCol: 0xFFF0E0, sunDir: [0.3, 0.9, 0.2],
hemi: R && R.hemi ? R.hemi : 1.12, hemiCol: fam ? 0xFFF2E2 : 0xFFF4EA, hemiGround: 0x5A5040, stars: 0 };
},
function (x, z, feet) {
var y = null;
for (var i = 0; i < FL.walk.length; i++) {
var w = FL.walk[i];
if (flIn(w, x, z)) {
y = w.y;
break;
}
}
if (y === null)
return 0;
for (var j = 0; j < FL.pads.length; j++) {
var p = FL.pads[j];
if (flIn(p, x, z) && (feet === undefined || feet > p.h - 0.75))
y = Math.max(y, p.h);
}
for (var k = 0; k < FL.ramps.length; k++) {
var q = FL.ramps[k];
if (!flIn(q, x, z))
continue;
var f = q.axis === "x" ? (x - q.x0) / (q.x1 - q.x0) : (z - q.z0) / (q.z1 - q.z0);
y = Math.max(y, q.h0 + (q.h1 - q.h0) * f);
}
return y;
},
function (x, z, feet) {
var inside = false;
for (var i = 0; i < FL.walk.length; i++) {
if (flIn(FL.walk[i], x, z)) {
inside = true;
break;
}
}
if (!inside)
return true;
if (worldSolidAt(FL.solids, x, z, feet))
return true;
for (var g = 0; g < FL.gates.length; g++) {
var G = FL.gates[g];
if (flIn(G, x, z) && !flAllowed(G.need)) {
if (Date.now() - FL.gateSaid > 4000) {
FL.gateSaid = Date.now();
setStatus("<b>" + esc(G.name) + ".</b> " + FL_NEED_SAY[G.need]);
}
return true;
}
}
return false;
},
function (G, x, z, ry, col, o) {
o = o || {};
var g = flPiece(G, x, z, ry), f = flM(col || FLC.purple), gd = o.silver ? flSilver() : flGold();
flBox(0.52, 0.12, 0.5, f, 0, 0.48, 0, g);
flBox(0.5, 0.78, 0.1, f, 0, 0.95, -0.22, g);
flBox(0.56, 0.06, 0.12, gd, 0, 1.36, -0.22, g);
if (!FL.lite) {
for (var b = 0; b < 3; b++)
flSph(0.025, gd, -0.15 + b * 0.15, 1.0, -0.165, g, 5);
}
[[-0.22, -0.2], [0.22, -0.2], [-0.22, 0.2], [0.22, 0.2]].forEach(function (p) { flCyl(0.025, 0.02, 0.44, gd, p[0], 0.22, p[1], g, 5); });
if (o.solid)
flPS(x, z, 0.28, 0.28, ry, 1);
return g;
},
function (G, x, z, ry, col) {
var g = flPiece(G, x, z, ry), f = flM(col || FLC.rose), gd = flGold();
flBox(0.9, 0.36, 0.82, f, 0, 0.36, 0.02, g);
flBox(0.9, 1.0, 0.22, f, 0, 0.95, -0.36, g);
flBox(0.2, 0.55, 0.82, f, -0.4, 0.6, 0.02, g);
flBox(0.2, 0.55, 0.82, f, 0.4, 0.6, 0.02, g);
flBox(0.26, 0.3, 0.22, f, -0.4, 1.32, -0.3, g);
flBox(0.26, 0.3, 0.22, f, 0.4, 1.32, -0.3, g);
flBox(0.72, 0.1, 0.6, flM(FLC.blush), 0, 0.58, 0.08, g);
[[-0.38, -0.32], [0.38, -0.32], [-0.38, 0.36], [0.38, 0.36]].forEach(function (p) { flCyl(0.035, 0.025, 0.18, gd, p[0], 0.09, p[1], g, 6); });
flPS(x, z, 0.5, 0.46, ry, 1.2);
return g;
},
function (G, x, z, ry, col, len, o) {
o = o || {};
len = len || 2.4;
var g = flPiece(G, x, z, ry), f = flM(col || FLC.purple), gd = flGold(), cu = flM(o.cush || FLC.pink);
flBox(len, 0.4, 0.95, f, 0, 0.38, 0, g);
flBox(len, 0.75, 0.24, f, 0, 0.92, -0.38, g);
if (!FL.lite)
flBox(len * 0.5, 0.18, 0.22, f, 0, 1.36, -0.38, g);
flBox(0.24, 0.6, 0.95, f, -len / 2, 0.6, 0, g);
flBox(0.24, 0.6, 0.95, f, len / 2, 0.6, 0, g);
var n = Math.max(2, Math.round(len / 0.8));
for (var i = 0; i < n; i++) {
var cx = -len / 2 + 0.3 + (len - 0.6) * (i + 0.5) / n;
flBox((len - 0.6) / n - 0.04, 0.14, 0.72, flM(FLC.blush), cx, 0.65, 0.06, g);
if (!FL.lite && i % 2 === 0)
flBox(0.38, 0.38, 0.12, cu, cx, 0.95, -0.22, g);
}
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { flCyl(0.04, 0.03, 0.18, gd, p[0] * (len / 2 - 0.1), 0.09, p[1] * 0.38, g, 6); });
flPS(x, z, len / 2 + 0.12, 0.5, ry, 1.2);
return g;
},
function (G, x, z, ry, col) {
var g = flPiece(G, x, z, ry), f = flM(col || FLC.rose), gd = flGold();
flBox(0.75, 0.36, 1.9, f, 0, 0.36, 0, g);
var b = flBox(0.75, 0.7, 0.5, f, 0, 0.75, -0.75, g);
b.rotation.x = 0.45;
flBox(0.12, 0.4, 1.0, f, -0.36, 0.6, -0.4, g);
[[-0.3, -0.85], [0.3, -0.85], [-0.3, 0.85], [0.3, 0.85]].forEach(function (p) { flCyl(0.035, 0.025, 0.18, gd, p[0], 0.09, p[1], g, 6); });
flPS(x, z, 0.42, 1.0, ry, 1);
return g;
},
function (G, x, z, r, o) {
o = o || {};
var g = flPiece(G, x, z, 0), y = o.y || 0.76;
if (o.cloth !== false) {
flCyl(r + 0.05, r + 0.22, y - 0.02, flM(o.cloth || FLC.blush), 0, y / 2, 0, g, 20);
flCyl(r + 0.06, r + 0.06, 0.04, flM(o.top || FLC.cream), 0, y, 0, g, 20);
}
else {
flCyl(r, r, 0.05, flM(o.top || FLC.wood), 0, y, 0, g, 20);
flCyl(0.07, 0.12, y - 0.05, flGold(), 0, (y - 0.05) / 2, 0, g, 8);
flCyl(0.35, 0.4, 0.05, flGold(), 0, 0.03, 0, g, 12);
}
if (o.posy !== false && !FL.lite) {
flCyl(0.05, 0.06, 0.14, flSilver(), 0, y + 0.08, 0, g, 8);
flSph(0.1, flM(FLC.pink), 0, y + 0.2, 0, g, 8);
flSph(0.07, flM(FLC.rose), 0.07, y + 0.2, 0.05, g, 6);
}
flSolidR(x, z, r + 0.15, 1);
return g;
},
function (G, x, z, w, d, ry, o) {
o = o || {};
var g = flPiece(G, x, z, ry), y = o.y || 0.76;
if (o.cloth !== false) {
flBox(w + 0.1, y - 0.06, d + 0.1, flM(o.cloth || FLC.blush), 0, (y - 0.06) / 2, 0, g);
flBox(w + 0.12, 0.06, d + 0.12, flM(o.top || FLC.cream), 0, y - 0.03, 0, g);
if (o.runner)
flBox(w * 0.9, 0.01, d * 0.35, flM(o.runner), 0, y + 0.005, 0, g);
}
else {
flBox(w, 0.06, d, flM(o.top || FLC.wood), 0, y, 0, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { flBox(0.07, y, 0.07, flGold(), p[0] * (w / 2 - 0.1), y / 2, p[1] * (d / 2 - 0.1), g); });
}
flPS(x, z, w / 2 + 0.06, d / 2 + 0.06, ry, 1);
return g;
},
function (G, x, z, ry, o) {
o = o || {};
var g = flPiece(G, x, z, ry), w = o.w || 1.2, d = o.d || 0.65;
flBox(w, 0.05, d, flM(0xD8D0E0, { op: 0.5 }), 0, 0.45, 0, g);
flBox(w - 0.1, 0.03, d - 0.1, flGold(), 0, 0.12, 0, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { flCyl(0.025, 0.025, 0.44, flGold(), p[0] * (w / 2 - 0.06), 0.22, p[1] * (d / 2 - 0.06), g, 6); });
if (!FL.lite) {
flBox(0.25, 0.06, 0.18, flM(FLC.rose), 0.2, 0.5, 0, g);
flCyl(0.06, 0.05, 0.16, flSilver(), -0.3, 0.55, 0, g, 8);
flSph(0.08, flM(FLC.pink), -0.3, 0.68, 0, g, 6);
}
flPS(x, z, w / 2, d / 2, ry, 0.6);
return g;
},
function (G, x, y, z, s, o) {
o = o || {};
s = s || 1;
var g = flPiece(G, x, z, 0, y), gd = flGold(), cr = flCrystal();
flCyl(0.02, 0.02, 1.2 * s, gd, 0, 0.6 * s, 0, g, 4);
var tiers = o.tiers || 3;
for (var t = 0; t < tiers; t++) {
var r = (0.5 + t * 0.42) * s, ty = -t * 0.38 * s, n = FL.lite ? 8 + t * 4 : 12 + t * 8;
var ring = wMesh(new THREE.TorusGeometry(r, 0.03 * s, 5, FL.lite ? 16 : 28), gd, 0, ty, 0, g);
ring.rotation.x = Math.PI / 2;
for (var i = 0; i < n; i++) {
var a = i / n * 6.283;
var d = flMesh(new THREE.OctahedronGeometry(0.06 * s, 0), cr, Math.cos(a) * r, ty - 0.14 * s, Math.sin(a) * r, g);
d.scale.y = 1.8;
if (i % 3 === 0)
flCyl(0.025 * s, 0.03 * s, 0.12 * s, flM(0xF0E2D0, { e: 0x6A5A40 }), Math.cos(a) * r, ty + 0.08 * s, Math.sin(a) * r, g, 5);
}
}
flSph(0.16 * s, cr, 0, -tiers * 0.4 * s, 0, g, 8);
var glow = wGlow(0xFFE2C8, 3.2 * s, 0.42);
glow.position.set(x, y - 0.4 * s, z);
G.add(flKeep(glow));
var nGl = FL.lite ? 2 : 5;
for (var k = 0; k < nGl; k++) {
var a2 = k / nGl * 6.283 + 0.4, rr = (0.5 + (k % tiers) * 0.42) * s, sp = wGlow(0xFFF4FF, 0.35 * s, 0.0);
sp.position.set(x + Math.cos(a2) * rr, y - (k % tiers) * 0.38 * s - 0.16 * s, z + Math.sin(a2) * rr);
G.add(flKeep(sp));
FL.twinkle.push({ m: sp, ph: k * 1.7 + x * 0.13, sp: 0.5 + ((k * 7) % 5) * 0.08, max: 0.55 });
}
return g;
},
function (G, x, y, z, ry) {
var g = flPiece(G, x, z, ry, y), gd = flGold();
flBox(0.14, 0.3, 0.05, gd, 0, 0, 0, g);
flCyl(0.02, 0.02, 0.24, gd, 0, 0.04, 0.12, g, 4).rotation.x = Math.PI / 2;
flCyl(0.09, 0.06, 0.16, flM(0xF0D8E0, { e: 0x5A4048 }), 0, 0.14, 0.22, g, 10);
var gl = wGlow(0xFFD8C8, 1.1, 0.35);
gl.position.set(0, 0.18, 0.24);
g.add(flKeep(gl));
return g;
},
function (G, x, y, z) {
var g = flPiece(G, x, z, 0, y), gd = flGold();
flCyl(0.02, 0.08, 0.4, gd, 0, 0.2, 0, g, 6);
for (var i = -1; i <= 1; i++) {
flCyl(0.02, 0.02, 0.18, flM(FLC.cream), i * 0.13, 0.5, 0, g, 5);
var f = flSph(0.025, flOwn(0xFFC070), i * 0.13, 0.62, 0, g, 5);
FL.flames.push({ m: flKeep(f), ph: i * 1.3 + x });
}
flBox(0.3, 0.02, 0.02, gd, 0, 0.4, 0, g);
return g;
},
function (G, x, z, kind, s) {
s = s || 1;
var g = flPiece(G, x, z, 0), pot = kind === "palm" ? flGold() : flSilver();
flCyl(0.28 * s, 0.2 * s, 0.5 * s, pot, 0, 0.25 * s, 0, g, 10);
flCyl(0.27 * s, 0.27 * s, 0.04 * s, flM(0x3A2A20), 0, 0.5 * s, 0, g, 10);
if (kind === "palm") {
flCyl(0.05 * s, 0.07 * s, 1.3 * s, flM(0x6A5030), 0, 1.15 * s, 0, g, 6);
for (var i = 0; i < (FL.lite ? 5 : 8); i++) {
var a = i / 8 * 6.283, l = flBox(0.12 * s, 0.02, 1.1 * s, flM(0x3A6A3E), Math.cos(a) * 0.4 * s, 1.75 * s, Math.sin(a) * 0.4 * s, g);
l.rotation.y = -a + Math.PI / 2;
l.rotation.x = 0.5;
}
}
else if (kind === "roses") {
flSph(0.42 * s, flM(0x3A5A38), 0, 0.85 * s, 0, g, 10);
for (var j = 0; j < (FL.lite ? 6 : 14); j++) {
var b = j / 14 * 6.283, h = 0.7 + ((j * 5) % 7) * 0.06;
flSph(0.08 * s, flM(j % 3 ? FLC.pink : FLC.rose), Math.cos(b) * 0.36 * s, h * s, Math.sin(b) * 0.36 * s, g, 6);
}
}
else if (kind === "orchid") {
flCyl(0.01, 0.01, 0.6 * s, flM(0x3A5A38), 0, 0.8 * s, 0, g, 4);
for (var k = 0; k < 5; k++)
flSph(0.06 * s, flM(k % 2 ? FLC.lilac : 0xE8D0E8), 0.04 * k * s, (0.9 + k * 0.06) * s, 0, g, 6);
}
else {
flSph(0.45 * s, flM(0x3A6A3E), 0, 0.9 * s, 0, g, 8);
}
flSolidR(x, z, 0.32 * s, 1.5);
return g;
},
function (seed) {
if (FL_ART[seed])
return FL_ART[seed];
var R = wRand(flHash("art" + seed)), kind = seed % 4;
var t = wTex(256, 200, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
var skies = [["#6A4A8A", "#D8A8C0"], ["#3A2A5A", "#B87AA8"], ["#8A6AA8", "#E8C8C8"], ["#4A3A6A", "#C898B8"]][kind];
g.addColorStop(0, skies[0]);
g.addColorStop(1, skies[1]);
x.fillStyle = g;
x.fillRect(0, 0, W, H);
if (kind === 0 || kind === 2) {
for (var i = 0; i < 40; i++) {
x.fillStyle = "rgba(" + (160 + R() * 80 | 0) + "," + (60 + R() * 60 | 0) + "," + (110 + R() * 60 | 0) + ",.8)";
x.beginPath();
x.arc(R() * W, H * 0.55 + R() * H * 0.45, 6 + R() * 12, 0, 7);
x.fill();
}
x.fillStyle = "rgba(50,90,60,.6)";
for (var j = 0; j < 30; j++) {
x.beginPath();
x.ellipse(R() * W, H * 0.7 + R() * H * 0.3, 10, 4, R() * 3, 0, 7);
x.fill();
}
}
else if (kind === 1) {
x.fillStyle = "rgba(232,200,150,.7)";
x.beginPath();
x.arc(W * 0.7, H * 0.4, 16, 0, 7);
x.fill();
x.fillStyle = "rgba(60,40,90,.8)";
x.fillRect(0, H * 0.6, W, H * 0.4);
x.fillStyle = "rgba(232,200,150,.3)";
x.fillRect(W * 0.62, H * 0.62, W * 0.16, H * 0.3);
x.fillStyle = "rgba(30,20,50,.8)";
x.beginPath();
x.moveTo(0, H * 0.6);
x.lineTo(W * 0.25, H * 0.35);
x.lineTo(W * 0.45, H * 0.6);
x.fill();
}
else {
x.fillStyle = "rgba(201,168,104,.8)";
x.fillRect(W * 0.42, H * 0.6, W * 0.16, H * 0.32);
for (var k = 0; k < 12; k++) {
x.fillStyle = ["#E8B8CC", "#C87AA0", "#F0D8E0"][k % 3];
x.beginPath();
x.arc(W * 0.5 + (R() - 0.5) * 90, H * 0.38 + (R() - 0.5) * 70, 14 + R() * 8, 0, 7);
x.fill();
}
}
});
return (FL_ART[seed] = t);
},
function (G, x, y, z, ry, w, h) {
var g = flPiece(G, x, z, ry, y);
if (!FL_WINTEX)
FL_WINTEX = wTex(256, 256, function (c, W, H) {
var gr = c.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, "#3A2A6A");
gr.addColorStop(0.6, "#A06A98");
gr.addColorStop(1, "#3A4A3A");
c.fillStyle = gr;
c.fillRect(0, 0, W, H);
var R = wRand(31);
c.fillStyle = "rgba(240,230,210,.7)";
for (var i = 0; i < 20; i++) {
c.fillRect(R() * W, R() * H * 0.4, 1.5, 1.5);
}
c.fillStyle = "rgba(40,60,40,.9)";
for (var j = 0; j < 14; j++) {
c.beginPath();
c.arc(j * 20 + R() * 10, H * 0.82, 18 + R() * 14, 0, 7);
c.fill();
}
c.strokeStyle = "rgba(220,200,180,.8)";
c.lineWidth = 6;
c.strokeRect(0, 0, W, H);
c.beginPath();
c.moveTo(W / 2, 0);
c.lineTo(W / 2, H);
c.moveTo(0, H / 2);
c.lineTo(W, H / 2);
c.stroke();
});
wMesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: FL_WINTEX, color: 0xB8A8C0 }), 0, 0, 0.02, g);
flBox(w + 0.2, 0.1, 0.15, flM(FLC.cream), 0, -h / 2 - 0.05, 0.08, g);
var dr = flM(FLC.velvet), sh = flM(FLC.pink, { op: 0.5 });
flBox(w * 0.3, h + 0.6, 0.12, dr, -w / 2 - 0.05, 0.1, 0.18, g);
flBox(w * 0.3, h + 0.6, 0.12, dr, w / 2 + 0.05, 0.1, 0.18, g);
if (!FL.lite) {
flBox(w * 0.9, h, 0.02, sh, 0, 0, 0.12, g);
flBox(0.08, 0.08, 0.16, flGold(), -w / 2, -0.2, 0.24, g);
flBox(0.08, 0.08, 0.16, flGold(), w / 2, -0.2, 0.24, g);
}
flBox(w + 0.9, 0.45, 0.22, dr, 0, h / 2 + 0.4, 0.18, g);
flBox(w + 0.95, 0.08, 0.24, flGold(), 0, h / 2 + 0.18, 0.2, g);
return g;
},
function (G, x, z, h, o) {
o = o || {};
var g = flPiece(G, x, z, 0);
flCyl(0.42, 0.46, h - 0.8, flM(o.col || 0xD8CCD4, { map: "marble" }), 0, (h - 0.8) / 2 + 0.4, 0, g, 16);
flBox(1.0, 0.4, 1.0, flM(0xC8BCC6, { map: "marble" }), 0, 0.2, 0, g);
flBox(1.0, 0.4, 1.0, flGold(), 0, h - 0.2, 0, g);
if (!FL.lite)
wMesh(new THREE.TorusGeometry(0.46, 0.06, 6, 18), flGold(), 0, h - 0.5, 0, g).rotation.x = Math.PI / 2;
flSolidR(x, z, 0.55, h);
return g;
},
function (G, x, z, ry) {
var g = flPiece(G, x, z, ry), mb = flM(0xD8CCD4, { map: "marble" });
flBox(2.4, 1.4, 0.5, mb, 0, 0.7, 0, g);
flBox(1.3, 0.9, 0.52, flM(0x1A1018), 0, 0.48, 0.01, g);
flBox(2.7, 0.14, 0.62, mb, 0, 1.45, 0.02, g);
flBox(2.6, 0.06, 0.04, flGold(), 0, 1.36, 0.27, g);
for (var i = 0; i < 3; i++) {
var f = flSph(0.16, flOwn(0xFF9A50, 0.85), -0.3 + i * 0.3, 0.32, 0.06, g, 6);
FL.flames.push({ m: flKeep(f), ph: i * 1.9 + x, big: 1 });
}
flBox(0.9, 0.1, 0.25, flM(0x4A2A1A), 0, 0.12, 0.05, g);
flMirror(G, x + Math.sin(ry) * 0.08, 2.7, z + Math.cos(ry) * 0.08, ry, 1.6, 1.6);
if (!FL.lite) {
flCandelabra(G, x - Math.cos(ry) * 0.9 + Math.sin(ry) * 0.1, 1.52, z + Math.sin(ry) * 0.9 + Math.cos(ry) * 0.1);
flVase(G, x + Math.cos(ry) * 0.9 + Math.sin(ry) * 0.1, 1.52, z - Math.sin(ry) * 0.9 + Math.cos(ry) * 0.1, 0.9);
}
flPS(x, z, 1.3, 0.4, ry, 1.5);
return g;
},
function (G, x, z, ry, w, h) {
w = w || 2;
h = h || 2.6;
var g = flPiece(G, x, z, ry), wd = flM(FLC.walnut);
flBox(w, h, 0.4, wd, 0, h / 2, 0, g);
var cols = [0x8A2A4A, 0x3A2A6A, 0x2A5A4A, 0xA88A4A, 0x6A3A6A, 0x4A3A2A];
for (var s = 0; s < 5; s++) {
var sy = 0.35 + s * (h - 0.5) / 5;
flBox(w - 0.1, 0.03, 0.36, flM(0x2A1810), 0, sy, 0.04, g);
if (!FL.lite) {
var bx = -w / 2 + 0.12;
while (bx < w / 2 - 0.15) {
var bw = 0.05 + ((bx * 97 | 0) % 3) * 0.02;
flBox(bw, 0.28, 0.24, flM(cols[((bx * 31 | 0) + s) % cols.length]), bx + bw / 2, sy + 0.15, 0.06, g);
bx += bw + 0.01;
}
}
else
flBox(w - 0.2, 0.26, 0.24, flM(cols[s % cols.length]), 0, sy + 0.14, 0.06, g);
}
flBox(w + 0.1, 0.08, 0.44, flGold(), 0, h, 0, g);
flPS(x, z, w / 2, 0.25, ry, h);
return g;
},
function (G, x, z, ry) {
var g = flPiece(G, x, z, ry), bk = flM(0x1A1018), gd = flGold();
var sh = new THREE.Shape();
sh.moveTo(-0.75, 0);
sh.lineTo(0.75, 0);
sh.lineTo(0.75, -1.0);
sh.quadraticCurveTo(0.7, -2.0, 0.1, -2.2);
sh.quadraticCurveTo(-0.6, -2.0, -0.75, -1.2);
sh.lineTo(-0.75, 0);
var body = wMesh(new THREE.ExtrudeGeometry(sh, { depth: 0.35, bevelEnabled: false }), bk, 0, 0.7, 0, g);
body.rotation.x = -Math.PI / 2;
var lid = wMesh(new THREE.ExtrudeGeometry(sh, { depth: 0.03, bevelEnabled: false }), bk, 0, 1.08, 0, g);
lid.rotation.x = -Math.PI / 2 - 0.6;
flBox(1.5, 0.1, 0.25, flM(0xE0D8CC), 0, 0.88, 0.12, g);
for (var k = 0; k < 14; k++)
flBox(0.04, 0.03, 0.12, bk, -0.65 + k * 0.1, 0.94, 0.08, g);
[[-0.6, 0], [0.6, 0], [0, -1.9]].forEach(function (p) { flCyl(0.05, 0.04, 0.7, bk, p[0], 0.35, p[1], g, 6); });
flBox(0.9, 0.06, 0.4, flM(FLC.velvet), 0, 0.5, 0.75, g);
flBox(0.8, 0.5, 0.36, bk, 0, 0.25, 0.75, g);
flPS(x + Math.sin(ry) * -1, z + Math.cos(ry) * -1, 0.8, 1.3, ry, 1.2);
return g;
},
function (G, x, z, s) {
s = s || 1;
var g = flPiece(G, x, z, 0), mb = flM(0xC8A8B8, { map: "marble" }), gd = flGold();
flCyl(3 * s, 3.2 * s, 0.6, mb, 0, 0.3, 0, g, 28);
flCyl(2.8 * s, 2.8 * s, 0.05, flM(0x8A9AC8, { e: 0x1A2238, op: 0.85 }), 0, 0.56, 0, g, 28);
flCyl(0.35 * s, 0.5 * s, 1.6 * s, mb, 0, 1.2 * s, 0, g, 12);
flCyl(1.3 * s, 0.8 * s, 0.3 * s, mb, 0, 2.0 * s, 0, g, 20);
flCyl(0.2 * s, 0.3 * s, 0.9 * s, mb, 0, 2.6 * s, 0, g, 10);
flCyl(0.6 * s, 0.4 * s, 0.2 * s, mb, 0, 3.1 * s, 0, g, 16);
flSph(0.22 * s, gd, 0, 3.4 * s, 0, g, 10);
var sheet = flCyl(1.25 * s, 1.35 * s, 1.3 * s, flOwn(0xB8C8E8, 0.22), 0, 1.3 * s, 0, g, 20);
sheet.material.side = THREE.DoubleSide;
flKeep(sheet);
var sheet2 = flCyl(0.58 * s, 0.62 * s, 0.9 * s, flOwn(0xB8C8E8, 0.22), 0, 2.65 * s, 0, g, 16);
sheet2.material.side = THREE.DoubleSide;
flKeep(sheet2);
FL.water.push({ m: sheet, ph: 0 }, { m: sheet2, ph: 1.3 });
for (var i = 0; i < (FL.lite ? 3 : 8); i++) {
var a = i / 8 * 6.283;
flSph(0.12 * s, flM(FLC.pink), Math.cos(a) * 2.3 * s, 0.62, Math.sin(a) * 2.3 * s, g, 6);
}
flSolidR(x, z, 3.2 * s, 1.2);
return g;
},
function (G, x, z, ry, w) {
w = w || 3;
var g = flPiece(G, x, z, ry), wd = flM(FLC.wood);
flBox(w, 2.4, 0.6, wd, 0, 1.2, -0.05, g);
flBox(w - 0.2, 2.1, 0.02, flM(0xC8D0E8, { op: 0.2 }), 0, 1.25, 0.26, g);
for (var s = 0; s < 3; s++) {
var sy = 0.4 + s * 0.7;
flBox(w - 0.2, 0.03, 0.5, flM(0xD8D0E0, { op: 0.5 }), 0, sy, 0, g);
for (var t = 0; t < Math.floor(w / 0.6); t++) {
var tx = -w / 2 + 0.4 + t * 0.6, m = (t + s) % 3 === 0 ? flSilver() : flGold();
flCyl(0.06, 0.09, 0.06, m, tx, sy + 0.04, 0, g, 8);
flCyl(0.02, 0.02, 0.12, m, tx, sy + 0.13, 0, g, 6);
flCyl(0.12, 0.05, 0.16, m, tx, sy + 0.27, 0, g, 10);
}
}
flPS(x, z, w / 2, 0.35, ry, 2.4);
return g;
},
function (G, x0, z0, x1, z1, n) {
n = n || 3;
var col = flM(FLC.velvet);
for (var i = 0; i < n; i++) {
var f = i / (n - 1), x = x0 + (x1 - x0) * f, z = z0 + (z1 - z0) * f;
flCyl(0.05, 0.08, 0.95, flGold(), x, 0.48, z, G, 8);
flSph(0.07, flGold(), x, 0.98, z, G, 8);
flCyl(0.18, 0.18, 0.04, flGold(), x, 0.02, z, G, 10);
if (i < n - 1) {
var nx = x0 + (x1 - x0) * (i + 1) / (n - 1), nz = z0 + (z1 - z0) * (i + 1) / (n - 1), L = Math.hypot(nx - x, nz - z);
var r = flCyl(0.03, 0.03, L, col, (x + nx) / 2, 0.82, (z + nz) / 2, G, 5);
r.rotation.z = Math.PI / 2;
r.rotation.y = -Math.atan2(nz - z, nx - x);
}
}
},
function (G, x, z, w, ry, o) {
o = o || {};
var g = flPiece(G, x, z, ry);
flBox(w, 1.05, 0.7, flM(o.col || FLC.cream), 0, 0.53, 0, g);
flBox(w + 0.1, 0.06, 0.8, flM(o.top || 0xD8CCD4, { map: "marble" }), 0, 1.08, 0, g);
flBox(w, 0.08, 0.04, flGold(), 0, 0.95, 0.36, g);
flBox(w, 0.06, 0.04, flGold(), 0, 0.12, 0.36, g);
if (o.panel)
for (var i = 0; i < Math.floor(w / 0.9); i++)
flBox(0.6, 0.6, 0.02, flM(o.panel), -w / 2 + 0.45 + i * 0.9, 0.55, 0.36, g);
flPS(x, z, w / 2 + 0.05, 0.4, ry, 1.2);
return g;
},
function (G, x, z, w, ry) {
var g = flPiece(G, x, z, ry);
flBox(w, 0.9, 0.8, flM(FLC.cream), 0, 0.45, 0, g);
flBox(w, 0.6, 0.8, flM(0xE0E8F0, { op: 0.2 }), 0, 1.2, 0, g);
flBox(w + 0.04, 0.04, 0.84, flGold(), 0, 1.52, 0, g);
var cakes = [[FLC.pink, FLC.cream], [0x6A3A2A, 0xE8D8C8], [FLC.lilac, FLC.cream], [0xE8D0A0, 0xE8B8C8], [FLC.blush, FLC.rose]];
for (var i = 0; i < Math.floor(w / 0.5); i++) {
var c = cakes[i % cakes.length], cx = -w / 2 + 0.3 + i * 0.5;
flCyl(0.16, 0.16, 0.14, flM(c[0]), cx, 0.98, 0, g, 12);
flCyl(0.16, 0.16, 0.04, flM(c[1]), cx, 1.07, 0, g, 12);
if (!FL.lite)
flSph(0.03, flM(0xA02040), cx, 1.11, 0, g, 5);
}
flPS(x, z, w / 2, 0.42, ry, 1.5);
return g;
},
function (G, x, y, z) {
var g = flPiece(G, x, z, 0, y), sv = flSilver();
flCyl(0.01, 0.01, 0.45, sv, 0, 0.22, 0, g, 4);
[0.05, 0.2, 0.35].forEach(function (h, i) { flCyl(0.16 - i * 0.04, 0.16 - i * 0.04, 0.01, sv, 0, h, 0, g, 12); if (!FL.lite)
for (var k = 0; k < 4; k++) {
var a = k / 4 * 6.283;
flBox(0.05, 0.03, 0.05, flM([FLC.pink, 0xE8D0A0, FLC.lilac][i]), Math.cos(a) * (0.1 - i * 0.03), h + 0.02, Math.sin(a) * (0.1 - i * 0.03), g);
} });
return g;
},
function (G, x, z, ry, o) {
o = o || {};
var w = o.w || 2.2, L = o.l || 2.3, g = flPiece(G, x, z, ry), gd = flGold(), f = flM(o.col || FLC.purple);
flBox(w, 0.45, L, flM(FLC.walnut), 0, 0.25, 0, g);
flBox(w - 0.06, 0.25, L - 0.1, flM(FLC.cream), 0, 0.6, 0.02, g);
flBox(w + 0.02, 0.1, L * 0.62, flM(o.quilt || FLC.rose), 0, 0.74, L * 0.18, g);
flBox(w + 0.06, 0.36, 0.04, flM(o.quilt || FLC.rose), 0, 0.6, L * 0.49, g);
for (var i = 0; i < (FL.lite ? 2 : 4); i++)
flBox(w / 2.4, 0.22, 0.4, flM(i % 2 ? FLC.blush : FLC.pink), -w / 4 + ((i % 2) * w / 2), 0.86 + ((i / 2 | 0)) * 0.1, -L / 2 + 0.35 + ((i / 2 | 0)) * 0.18, g);
flBox(w + 0.3, 1.7, 0.18, f, 0, 1.25, -L / 2 - 0.05, g);
flBox(w + 0.4, 0.1, 0.22, gd, 0, 2.12, -L / 2 - 0.05, g);
if (!FL.lite)
for (var b = 0; b < 12; b++)
flSph(0.03, gd, -w / 2 + 0.2 + (b % 6) * (w - 0.4) / 5, 1.0 + (b / 6 | 0) * 0.5, -L / 2 + 0.05, g, 4);
if (o.canopy) {
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { flCyl(0.05, 0.05, 2.9, gd, p[0] * (w / 2 + 0.1), 1.45, p[1] * (L / 2 + 0.05), g, 6); });
flBox(w + 0.4, 0.12, L + 0.3, flM(FLC.velvet), 0, 2.9, 0, g);
var dr = flM(FLC.blush, { op: 0.55, ds: true });
[[-1], [1]].forEach(function (p) { flBox(0.04, 2.4, L * 0.4, dr, p[0] * (w / 2 + 0.15), 1.65, -L / 2 + 0.4, g); flBox(0.04, 2.4, L * 0.4, dr, p[0] * (w / 2 + 0.15), 1.65, L / 2 - 0.4, g); });
}
flBox(w * 0.7, 0.42, 0.42, flM(FLC.blush), 0, 0.25, L / 2 + 0.4, g);
flPS(x + Math.sin(ry) * 0.1, z + Math.cos(ry) * 0.1, w / 2 + 0.15, L / 2 + 0.25, ry, 1);
[-1, 1].forEach(function (sd) {
var lx = sd * (w / 2 + 0.45), c = Math.cos(ry), s = Math.sin(ry), wx = x + lx * c + (-L / 2 + 0.4) * s, wz = z - lx * s + (-L / 2 + 0.4) * c;
var t = flPiece(G, wx, wz, ry);
flBox(0.55, 0.6, 0.45, flM(FLC.cream), 0, 0.3, 0, t);
flBox(0.58, 0.03, 0.48, gd, 0, 0.61, 0, t);
flCyl(0.08, 0.1, 0.3, gd, 0, 0.78, 0, t, 8);
flCyl(0.12, 0.2, 0.24, flM(FLC.blush, { e: 0x4A3038 }), 0, 1.04, 0, t, 12);
flSolid(wx, wz, 0.3, 0.25, ry, 0.8);
});
return g;
},
function (G, x, z, ry) {
var g = flPiece(G, x, z, ry);
flBox(1.4, 0.06, 0.5, flM(FLC.cream), 0, 0.78, 0, g);
flBox(0.4, 0.75, 0.48, flM(FLC.cream), -0.5, 0.38, 0, g);
flBox(0.4, 0.75, 0.48, flM(FLC.cream), 0.5, 0.38, 0, g);
flBox(1.44, 0.03, 0.52, flGold(), 0, 0.81, 0, g);
var m = wMesh(new THREE.CircleGeometry(0.5, 24), flM(0xA8B0C8, { e: 0x2A2E3A }), 0, 1.45, -0.2, g);
wMesh(new THREE.TorusGeometry(0.5, 0.04, 6, 24), flGold(), 0, 1.45, -0.2, g);
if (!FL.lite) {
for (var i = 0; i < 5; i++)
flCyl(0.025, 0.03, 0.08 + i % 2 * 0.04, [flM(FLC.pink), flGold(), flSilver(), flM(FLC.lilac), flM(FLC.rose)][i], -0.4 + i * 0.14, 0.86, 0.05, g, 6);
flVase(G, x, 0.82, z, 0.6);
}
flPouf(G, x + Math.sin(ry) * 0.7, z + Math.cos(ry) * 0.7);
flPS(x, z, 0.72, 0.27, ry, 1.2);
return g;
},
function (G, x, z, ry) {
var g = flPiece(G, x, z, ry), p = flM(0xE2D8DE), gd = flGold();
var tub = flCyl(0.75, 0.6, 0.62, p, 0, 0.48, 0, g, 20);
tub.scale.z = 1.9;
flCyl(0.68, 0.68, 0.02, flM(0xB8C8E0, { op: 0.7 }), 0, 0.72, 0, g, 20).scale.z = 1.9;
[[-0.5, -1], [0.5, -1], [-0.5, 1], [0.5, 1]].forEach(function (q) { flSph(0.08, gd, q[0], 0.1, q[1], g, 6); });
flCyl(0.02, 0.02, 0.4, gd, 0, 0.95, -1.25, g, 5);
flPS(x, z, 0.8, 1.4, ry, 0.9);
return g;
},
function (G, x, z, ry, n) {
n = n || 1;
var g = flPiece(G, x, z, ry), w = 1.2 * n;
flBox(w, 0.85, 0.55, flM(FLC.cream), 0, 0.43, 0, g);
flBox(w + 0.06, 0.06, 0.6, flM(0xD8CCD4, { map: "marble" }), 0, 0.88, 0, g);
for (var i = 0; i < n; i++) {
var bx = -w / 2 + 0.6 + i * 1.2;
flCyl(0.22, 0.18, 0.08, flM(0xE6DEE4), bx, 0.88, 0.02, g, 14);
flCyl(0.015, 0.015, 0.25, flGold(), bx, 1.0, -0.2, g, 4);
flMirror(G, x + Math.cos(ry) * bx - Math.sin(ry) * 0.3, 1.7, z - Math.sin(ry) * bx - Math.cos(ry) * 0.3, ry, 0.9, 1.0);
}
flPS(x, z, w / 2, 0.3, ry, 1);
return g;
},
function (G, x, z, ry, o) {
o = o || {};
var w = o.w || 2.2, g = flPiece(G, x, z, ry), gd = flGold(), wd = flM(o.col || FLC.cream);
flBox(w, 0.08, 1.0, wd, 0, 0.78, 0, g);
flBox(w + 0.06, 0.03, 1.06, gd, 0, 0.83, 0, g);
flBox(0.6, 0.72, 0.95, wd, -w / 2 + 0.32, 0.37, 0, g);
flBox(0.6, 0.72, 0.95, wd, w / 2 - 0.32, 0.37, 0, g);
for (var i = 0; i < 3; i++) {
flBox(0.5, 0.18, 0.02, flM(FLC.blush), -w / 2 + 0.32, 0.6 - i * 0.22, 0.48, g);
flBox(0.5, 0.18, 0.02, flM(FLC.blush), w / 2 - 0.32, 0.6 - i * 0.22, 0.48, g);
}
flBox(w - 1.3, 0.1, 0.02, gd, 0, 0.7, 0.49, g);
if (!FL.lite) {
flBox(0.5, 0.02, 0.36, flM(0x3A1A4A), 0, 0.83, 0.1, g);
flCyl(0.04, 0.04, 0.12, gd, 0.7, 0.88, -0.2, g, 6);
flBox(0.32, 0.04, 0.24, flM(0xE6DCE4), -0.6, 0.84, 0.05, g);
flCyl(0.07, 0.09, 0.32, gd, -w / 2 + 0.25, 0.98, -0.3, g, 8);
flCyl(0.14, 0.22, 0.24, flM(FLC.blush, { e: 0x4A3038 }), -w / 2 + 0.25, 1.22, -0.3, g, 12);
}
flPS(x, z, w / 2 + 0.05, 0.55, ry, 1);
return g;
},
function (G, x, z, ry, col) {
var g = flPiece(G, x, z, ry), f = flM(col || FLC.velvet), gd = flGold();
flBox(0.75, 0.14, 0.7, f, 0, 0.52, 0, g);
flBox(0.75, 1.3, 0.16, f, 0, 1.25, -0.3, g);
var crown = flBox(0.85, 0.14, 0.2, gd, 0, 1.95, -0.3, g);
flBox(0.12, 0.3, 0.6, gd, -0.4, 0.75, 0, g);
flBox(0.12, 0.3, 0.6, gd, 0.4, 0.75, 0, g);
flCyl(0.04, 0.04, 0.45, gd, 0, 0.25, 0, g, 6);
flCyl(0.35, 0.35, 0.04, gd, 0, 0.03, 0, g, 10);
if (!FL.lite)
for (var b = 0; b < 9; b++)
flSph(0.03, gd, -0.25 + (b % 3) * 0.25, 0.9 + (b / 3 | 0) * 0.32, -0.21, g, 4);
flPS(x, z, 0.42, 0.4, ry, 1.3);
return g;
},
function (G, x, z, ry, w) {
var g = flPiece(G, x, z, ry);
for (var s = 0; s < 4; s++) {
flBox(w, 0.04, 0.6, flSilver(), 0, 0.2 + s * 0.55, 0, g);
for (var b = 0; b < Math.floor(w / 0.6); b++)
flBox(0.5, 0.4, 0.5, flM([0xC8A888, 0xB89878, FLC.pink, FLC.lav][(b + s) % 4]), -w / 2 + 0.3 + b * 0.6, 0.42 + s * 0.55, 0, g);
}
[-1, 1].forEach(function (sd) { flBox(0.04, 2.3, 0.6, flSilver(), sd * w / 2, 1.15, 0, g); });
flPS(x, z, w / 2, 0.32, ry, 2.3);
return g;
},
function (G, x, z, w, ry) {
var g = flPiece(G, x, z, ry);
flBox(w, 0.9, 0.65, flM(FLC.cream), 0, 0.45, 0, g);
flBox(w + 0.04, 0.05, 0.68, flM(0xD8CCD4, { map: "marble" }), 0, 0.92, 0, g);
flBox(w, 0.75, 0.38, flM(FLC.cream), 0, 1.95, -0.14, g);
for (var i = 0; i < Math.floor(w / 0.6); i++) {
flSph(0.02, flGold(), -w / 2 + 0.3 + i * 0.6, 0.7, 0.33, g, 4);
flSph(0.02, flGold(), -w / 2 + 0.3 + i * 0.6, 1.7, 0.06, g, 4);
}
flPS(x, z, w / 2, 0.35, ry, 1);
return g;
},
function (G, x, z, ry) {
var g = flPiece(G, x, z, ry);
flBox(1.2, 0.9, 0.68, flM(0x8A2A4A), 0, 0.45, 0, g);
flBox(1.22, 0.05, 0.7, flM(0x1A1018), 0, 0.92, 0, g);
for (var i = 0; i < 4; i++)
wMesh(new THREE.TorusGeometry(0.1, 0.015, 4, 12), flSilver(), -0.28 + (i % 2) * 0.56, 0.96, -0.15 + (i / 2 | 0) * 0.3, g).rotation.x = Math.PI / 2;
flBox(1.0, 0.4, 0.02, flM(0x2A2028), 0, 0.45, 0.35, g);
flBox(0.9, 0.04, 0.04, flGold(), 0, 0.72, 0.37, g);
flBox(1.3, 0.6, 0.7, flSilver(), 0, 2.0, -0.1, g);
flPS(x, z, 0.62, 0.36, ry, 1);
return g;
},
function (G, x, z, ry) {
var g = flPiece(G, x, z, ry), gd = flGold();
flBox(0.25, 0.15, 0.4, gd, 0, 0.08, 0, g);
flBox(0.12, 1.7, 0.12, gd, 0, 0.95, -0.15, g);
var arc = wMesh(new THREE.TorusGeometry(0.55, 0.05, 6, 16, Math.PI * 0.9), gd, 0.1, 1.45, 0, g);
arc.rotation.y = Math.PI / 2;
for (var i = 0; i < 8; i++)
flBox(0.005, 1.2 - i * 0.1, 0.005, flM(0xE8E0D0), 0, 0.85, 0.02 + i * 0.06, g);
flSolidR(x, z, 0.4, 1.8);
return g;
},
function () {
return flCanvasTex("lawn", 256, function (x, W, H) {
x.fillStyle = "#5A7A44";
x.fillRect(0, 0, W, H);
var R = wRand(41);
for (var i = 0; i < 2600; i++) {
var g = 70 + R() * 60 | 0;
x.fillStyle = "rgba(" + (g - 20) + "," + (g + 40) + "," + (g - 30) + ",.5)";
x.fillRect(R() * W, R() * H, 1, 2 + R() * 3);
}
x.fillStyle = "rgba(90,120,70,.18)";
for (var s = 0; s < 8; s++)
x.fillRect(0, s * 32, W, 16);
});
},
function () {
return flCanvasTex("play", 256, function (x, W, H) {
var cols = ["#8AA8C4", "#C4A86A", "#9AB48A", "#C49090"];
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
x.fillStyle = cols[(i + j) % 4];
x.fillRect(i * 64, j * 64, 64, 64);
}
x.strokeStyle = "rgba(40,40,40,.25)";
x.lineWidth = 2;
for (var k = 0; k <= 4; k++) {
x.beginPath();
x.moveTo(k * 64, 0);
x.lineTo(k * 64, H);
x.moveTo(0, k * 64);
x.lineTo(W, k * 64);
x.stroke();
}
});
},
function () {
return flCanvasTex("brick", 256, function (x, W, H) {
x.fillStyle = "#8A7466";
x.fillRect(0, 0, W, H);
var R = wRand(61);
for (var r = 0; r < 8; r++)
for (var c = 0; c < 5; c++) {
var ox = (r % 2) * 26;
var v = (R() * 30 | 0);
x.fillStyle = "rgb(" + (150 + v) + "," + (96 + v / 2 | 0) + "," + (80 + v / 3 | 0) + ")";
x.fillRect(ox + c * 52 + 2 - 26, r * 32 + 2, 48, 28);
x.fillRect(ox + c * 52 + 2 + 234, r * 32 + 2, 48, 28);
}
});
},
function (G, x, z, ry, len) {
len = len || 4;
var g = flPiece(G, x, z, ry), wd = flM(FLC.oak);
flBox(len, 0.08, 0.5, wd, 0, 0.46, 0, g);
flBox(len, 0.7, 0.07, wd, 0, 0.85, -0.24, g);
flBox(len, 0.06, 0.12, wd, 0, 1.22, -0.24, g);
[-1, 1].forEach(function (s) { flBox(0.08, 0.95, 0.6, wd, s * len / 2, 0.48, -0.02, g); });
if (!FL.lite)
flBox(len - 0.2, 0.04, 0.42, flM(FLC.sage), 0, 0.51, 0.02, g);
if (!FL.lite) {
flSph(0.12, flM(0xE0D8CC), len / 2 + 0.05, 1.0, 0.1, g, 6);
flSph(0.07, flM(0x6A8A5A), len / 2 + 0.05, 0.9, 0.1, g, 5);
}
flPS(x, z, len / 2, 0.35, ry, 1.2);
return g;
},
function (G, x, z, ry) {
var g = flPiece(G, x, z, ry), mb = flM(0xD0CAC0, { map: "marble" });
flBox(2.6, 1.0, 1.0, mb, 0, 0.5, 0, g);
flBox(2.8, 0.08, 1.1, flM(0xD8D0C2), 0, 1.02, 0, g);
flBox(2.9, 0.02, 0.4, flM(FLC.gold), 0, 1.07, 0, g);
flCandelabra(G, x + Math.cos(ry) * -1.0, 1.06, z - Math.sin(ry) * -1.0);
flCandelabra(G, x + Math.cos(ry) * 1.0, 1.06, z - Math.sin(ry) * 1.0);
flVase(G, x, 1.06, z, 1.4);
flPS(x, z, 1.4, 0.55, ry, 1.1);
return g;
},
function (G, x, z, ry, w, h) {
w = w || 2.6;
h = h || 2.8;
var g = flPiece(G, x, z, ry), gd = flGold(), leaf = flM(0x4E6E44);
[-1, 1].forEach(function (s) { flCyl(0.05, 0.05, h, gd, s * w / 2, h / 2, 0, g, 6); });
var a = wMesh(new THREE.TorusGeometry(w / 2, 0.06, 6, FL.lite ? 12 : 24, Math.PI), gd, 0, h, 0, g);
var n = FL.lite ? 10 : 26;
for (var i = 0; i < n; i++) {
var f = i / (n - 1), ang = Math.PI * f, px = Math.cos(ang) * w / 2, py = h + Math.sin(ang) * w / 2;
if (i % 2 === 0)
flSph(0.16, leaf, px, py, 0, g, 6);
flSph(0.11, flM(i % 3 === 0 ? FLC.pink : i % 3 === 1 ? 0xE0D8CC : FLC.blush), px + 0.05, py + 0.04, 0.08, g, 6);
}
for (var j = 0; j < (FL.lite ? 4 : 10); j++) {
var s2 = j % 2 ? 1 : -1, yy = 0.3 + (j >> 1) * 0.5;
flSph(0.14, leaf, s2 * w / 2, yy, 0, g, 6);
flSph(0.09, flM(j % 3 ? FLC.pink : 0xE0D8CC), s2 * w / 2 + 0.06, yy + 0.08, 0.08, g, 5);
}
flSolidR(x + Math.cos(ry) * w / 2, z - Math.sin(ry) * w / 2, 0.15, h);
flSolidR(x - Math.cos(ry) * w / 2, z + Math.sin(ry) * w / 2, 0.15, h);
return g;
},
function (G, x, z, ry) {
var g = flPiece(G, x, z, ry), wd = flM(FLC.walnut), gd = flGold(), pipe = flM(0xB8B0A0, { e: 0x18160E });
flBox(1.8, 1.1, 0.9, wd, 0, 0.55, 0, g);
flBox(1.6, 0.06, 0.4, flM(0xD8D0C2), 0, 1.0, 0.25, g);
flBox(1.6, 0.06, 0.3, flM(0x2A2420), 0, 1.12, 0.05, g);
flBox(1.2, 0.08, 0.4, flM(FLC.velvet), 0, 0.48, 0.85, g);
flBox(1.1, 0.42, 0.36, wd, 0, 0.21, 0.85, g);
var n = FL.lite ? 7 : 15;
for (var i = 0; i < n; i++) {
var f = i / (n - 1) - 0.5, hh = 2.2 + Math.cos(f * Math.PI) * 1.6;
flCyl(0.07, 0.07, hh, pipe, f * 2.6, 1.4 + hh / 2, -0.55, g, 8);
flCyl(0.075, 0.04, 0.12, gd, f * 2.6, 1.4 + 0.5, -0.55, g, 8);
}
flBox(3.0, 0.3, 0.4, wd, 0, 1.3, -0.55, g);
flPS(x, z, 1.5, 0.8, ry, 2.5);
return g;
},
function (seed) {
if (FL_GLASS[seed])
return FL_GLASS[seed];
var R = wRand(flHash("glass" + seed));
return (FL_GLASS[seed] = wTex(128, 256, function (x, W, H) {
x.fillStyle = "#2A2A30";
x.fillRect(0, 0, W, H);
var cols = ["#7A9AB8", "#B8A060", "#9AB088", "#B88088", "#A898B8", "#C8B8A0"];
for (var j = 0; j < 10; j++)
for (var i = 0; i < 5; i++) {
x.fillStyle = cols[(R() * cols.length) | 0];
x.fillRect(4 + i * 24, 4 + j * 25, 22, 23);
}
x.fillStyle = "rgba(232,214,180,.85)";
x.beginPath();
x.arc(W / 2, H * 0.32, 24, 0, 7);
x.fill();
x.fillStyle = "#C88890";
for (var p = 0; p < 6; p++) {
var a = p / 6 * 6.283;
x.beginPath();
x.arc(W / 2 + Math.cos(a) * 12, H * 0.32 + Math.sin(a) * 12, 8, 0, 7);
x.fill();
}
x.strokeStyle = "#1A1A1E";
x.lineWidth = 3;
for (var k = 0; k <= 5; k++) {
x.beginPath();
x.moveTo(4 + k * 24 - 1, 0);
x.lineTo(4 + k * 24 - 1, H);
x.stroke();
}
for (var m = 0; m <= 10; m++) {
x.beginPath();
x.moveTo(0, 4 + m * 25 - 1);
x.lineTo(W, 4 + m * 25 - 1);
x.stroke();
}
x.beginPath();
x.moveTo(0, 40);
x.quadraticCurveTo(W / 2, -20, W, 40);
x.lineTo(W, 0);
x.lineTo(0, 0);
x.fillStyle = "#2A2A30";
x.fill();
}));
},
function (G, x, y, z, ry, w, h, seed) {
var g = flPiece(G, x, z, ry, y);
wMesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: flGlassTex(seed || 0), color: 0xC8C0B4 }), 0, 0, 0.02, g);
flBox(w + 0.2, 0.12, 0.18, flM(0xB8B0A0, { map: "stone" }), 0, -h / 2 - 0.06, 0.06, g);
flBox(0.14, h, 0.18, flM(0xB8B0A0, { map: "stone" }), -w / 2 - 0.07, 0, 0.06, g);
flBox(0.14, h, 0.18, flM(0xB8B0A0, { map: "stone" }), w / 2 + 0.07, 0, 0.06, g);
return g;
},
function (G, x, y, z, s) {
s = s || 1;
var g = flPiece(G, x, z, 0, y), ic = flM(0xDCD2C4), rib = flM(FLC.sage);
var yb = 0;
[[0.42, 0.3], [0.32, 0.28], [0.22, 0.26]].forEach(function (t) {
flCyl(t[0] * s, t[0] * s, t[1] * s, ic, 0, yb + t[1] * s / 2, 0, g, 20);
flCyl(t[0] * s + 0.005, t[0] * s + 0.005, 0.03 * s, rib, 0, yb + 0.04 * s, 0, g, 20);
if (!FL.lite)
for (var k = 0; k < 6; k++) {
var a = k / 6 * 6.283;
flSph(0.03 * s, flM(FLC.pink), Math.cos(a) * t[0] * s, yb + t[1] * s, Math.sin(a) * t[0] * s, g, 5);
}
yb += t[1] * s;
});
flSph(0.06 * s, flM(FLC.pink), 0, yb + 0.04 * s, 0, g, 6);
flSph(0.05 * s, flM(0xE0D8CC), 0.05 * s, yb + 0.03 * s, 0.03 * s, g, 5);
flCyl(0.5 * s, 0.5 * s, 0.02, flSilver(), 0, 0, 0, g, 20);
return g;
},
function (G, x, z, w, d) {
var g = flPiece(G, x, z, 0);
for (var i = 0; i < Math.round(w); i++)
for (var j = 0; j < Math.round(d); j++)
flBox(1, 0.03, 1, flM((i + j) % 2 ? 0x5A4030 : 0xB89A70), -w / 2 + 0.5 + i, 0.025, -d / 2 + 0.5 + j, g);
flBox(w + 0.2, 0.035, 0.1, flGold(), 0, 0.03, -d / 2, g);
flBox(w + 0.2, 0.035, 0.1, flGold(), 0, 0.03, d / 2, g);
flBox(0.1, 0.035, d, flGold(), -w / 2, 0.03, 0, g);
flBox(0.1, 0.035, d, flGold(), w / 2, 0.03, 0, g);
return g;
},
function (G, x, z, ry, w) {
w = w || 8;
var g = flPiece(G, x, z, ry), wd = flM(FLC.walnut), bk = flM(0x1A1A1E), gd = flGold();
flBox(w, 0.6, 4, wd, 0, 0.3, 0, g);
flBox(w + 0.1, 0.04, 4.1, flM(0x3A2A20), 0, 0.62, 0, g);
flBox(w, 0.04, 0.08, gd, 0, 0.6, 2, g);
flCyl(0.32, 0.32, 0.4, flM(0xD8D0C2), -1.8, 0.84, -0.6, g, 14).rotation.x = Math.PI / 2;
flCyl(0.18, 0.18, 0.18, flM(0xD8D0C2), -2.3, 1.0, -0.3, g, 12);
flCyl(0.18, 0.18, 0.18, flM(0xD8D0C2), -1.3, 1.0, -0.3, g, 12);
flCyl(0.24, 0.24, 0.01, gd, -2.6, 1.6, -0.9, g, 14);
flCyl(0.01, 0.01, 1.0, flSilver(), -2.6, 1.1, -0.9, g, 4);
flBox(1.3, 0.08, 0.4, bk, 1.4, 1.5, -0.4, g);
flBox(1.2, 0.02, 0.2, flM(0xD8D0C2), 1.4, 1.55, -0.32, g);
flBox(0.04, 0.85, 0.04, flSilver(), 1.0, 1.05, -0.4, g);
flBox(0.04, 0.85, 0.04, flSilver(), 1.8, 1.05, -0.4, g);
var bs = flPiece(g, 2.8, -1.1, 0.2, 0.6);
var body = flSph(0.42, flM(0x7A4A2A), 0, 0.6, 0, bs, 10);
body.scale.set(0.8, 1.25, 0.35);
flBox(0.06, 1.3, 0.06, flM(0x2A1A10), 0, 1.6, 0, bs);
[-0.4, 0.6].forEach(function (mx) { flCyl(0.012, 0.012, 1.5, flSilver(), mx, 1.35, 0.9, g, 4); flSph(0.05, bk, mx, 2.12, 0.9, g, 6); flCyl(0.18, 0.18, 0.02, bk, mx, 0.62, 0.9, g, 10); });
flPS(x, z, w / 2, 2, ry, 0.6);
return g;
},
function (G, x, z, w, ry) {
var g = flPiece(G, x, z, ry), wd = flM(FLC.walnut);
flBox(w, 1.1, 0.7, wd, 0, 0.55, 0, g);
flBox(w + 0.1, 0.06, 0.85, flM(0xD0CAC0, { map: "marble" }), 0, 1.12, 0, g);
flBox(w, 0.05, 0.05, flGold(), 0, 0.2, 0.38, g);
flBox(w, 2.2, 0.4, wd, 0, 1.6, -1.4, g);
if (!FL.lite)
for (var s = 0; s < 2; s++)
for (var i = 0; i < Math.floor(w / 0.25); i++) {
var c = [0x5A7A4A, 0x8A5A2A, 0xB8A870, 0x6A2A2A, 0xA8B8C0][(i + s) % 5];
flCyl(0.04, 0.04, 0.28, flM(c, { op: 0.85 }), -w / 2 + 0.2 + i * 0.25, 1.65 + s * 0.55, -1.25, g, 6);
}
flPS(x, z, w / 2, 0.45, ry, 1.2);
return g;
},
function (G, x, z, ry, col) {
var g = flPiece(G, x, z, ry), c = flM(col || 0xDCD2C4);
flCyl(0.12, 0.12, 0.04, flGold(), 0, 0.02, 0, g, 10);
flCyl(0.015, 0.015, 0.6, flGold(), 0, 0.3, 0, g, 4);
var skirt = flCyl(0.12, 0.62, 1.0, c, 0, 0.95, 0, g, 18);
flCyl(0.15, 0.12, 0.45, c, 0, 1.65, 0, g, 12);
flSph(0.1, flM(0xC8C0B4), 0, 1.98, 0, g, 8);
if (!FL.lite)
for (var i = 0; i < 8; i++) {
var a = i / 8 * 6.283;
flSph(0.03, flM(FLC.blush), Math.cos(a) * 0.4, 0.75, Math.sin(a) * 0.4, g, 4);
}
flSolidR(x, z, 0.6, 1.8);
return g;
},
function (G, x, z, ry, w, suits) {
var g = flPiece(G, x, z, ry);
flBox(w, 0.04, 0.04, flGold(), 0, 1.85, 0, g);
[-1, 1].forEach(function (s) { flBox(0.04, 1.85, 0.04, flGold(), s * w / 2, 0.93, 0, g); });
for (var i = 0; i < Math.floor(w / 0.45); i++) {
var c = suits ? [0x2A2A34, 0x3A3A44, 0x4A4A40, 0x5A5048][i % 4] : [0xDCD2C4, 0xD8CCB8, 0xDCC8C2, 0xD2CABA][i % 4];
flBox(0.36, suits ? 1.0 : 1.35, 0.3, flM(c), -w / 2 + 0.3 + i * 0.45, suits ? 1.25 : 1.08, 0, g);
}
flPS(x, z, w / 2, 0.25, ry, 1.9);
return g;
},
function (G, x, z, w, ry) {
var g = flPiece(G, x, z, ry);
flBox(w, 0.9, 0.7, flM(FLC.walnut), 0, 0.45, 0, g);
flBox(w, 0.35, 0.7, flM(0xD8E0E8, { op: 0.22 }), 0, 1.08, 0, g);
flBox(w - 0.1, 0.02, 0.6, flM(FLC.velvet), 0, 0.91, 0, g);
flBox(w + 0.04, 0.03, 0.74, flGold(), 0, 1.26, 0, g);
var n = FL.lite ? 4 : Math.floor(w / 0.18);
for (var i = 0; i < n; i++) {
var rx = -w / 2 + 0.15 + i * (w - 0.3) / Math.max(1, n - 1);
var r = wMesh(new THREE.TorusGeometry(0.03, 0.008, 5, 12), i % 3 ? flGold() : flSilver(), rx, 0.95, (i % 2 ? 0.12 : -0.1), g);
r.rotation.x = Math.PI / 2.4;
if (i % 2 === 0 && !FL.lite) {
var gm = flSph(0.012, flM(0xE0E8F0, { e: 0x3A4048 }), rx, 0.985, (i % 2 ? 0.12 : -0.1), g, 5);
}
}
if (!FL.lite) {
var gl = wGlow(0xFFF4E0, 0.5, 0.0);
gl.position.set(x, 1.0, z);
G.add(flKeep(gl));
FL.twinkle.push({ m: gl, ph: x * 0.7, sp: 0.45, max: 0.4 });
}
flPS(x, z, w / 2, 0.4, ry, 1.3);
return g;
},
function (G, x, z, r) {
r = r || 3;
var g = flPiece(G, x, z, 0), wh = flM(0xD2CABA), rf = flM(0x6A7A6A);
flCyl(r + 0.3, r + 0.4, 0.4, flM(0xC8C0B0, { map: "stone" }), 0, 0.2, 0, g, 8);
for (var i = 0; i < 8; i++) {
var a = i / 8 * 6.283 + 0.39;
flCyl(0.08, 0.08, 2.8, wh, Math.cos(a) * r, 1.8, Math.sin(a) * r, g, 6);
if (i % 2 && !FL.lite)
flBox(0.05, 0.8, 2.2, wh, Math.cos(a) * r, 0.85, Math.sin(a) * r, g).rotation.y = -a;
}
var roof = flCyl(0.2, r + 0.6, 1.4, rf, 0, 3.9, 0, g, 8);
flSph(0.18, flGold(), 0, 4.7, 0, g, 6);
for (var j = 0; j < 8; j++) {
var a2 = j / 8 * 6.283 + 0.39;
if (j % 2 === 0)
flSolidR(x + Math.cos(a2) * r, z + Math.sin(a2) * r, 0.2, 2.8);
}
FL.pads.push({ x0: x - r, x1: x + r, z0: z - r, z1: z + r, h: 0.4 });
return g;
},
function (G, x, z, ry) {
var g = flPiece(G, x, z, ry), wh = flM(0xB0A898);
flBox(0.46, 0.05, 0.44, wh, 0, 0.46, 0, g);
flBox(0.46, 0.5, 0.04, wh, 0, 0.74, -0.2, g);
[[-0.2, -0.18], [0.2, -0.18], [-0.2, 0.18], [0.2, 0.18]].forEach(function (p) { flCyl(0.018, 0.018, 0.46, wh, p[0], 0.23, p[1], g, 4); });
if (!FL.lite)
flSph(0.07, flM(FLC.pink), 0.24, 0.85, -0.2, g, 5);
return g;
},
function (G, x, z, ry, quilt) {
var g = flPiece(G, x, z, ry), wd = flM(FLC.pine);
flBox(1.0, 0.35, 1.9, wd, 0, 0.2, 0, g);
flBox(0.96, 0.18, 1.84, flM(0xD8D0C2), 0, 0.45, 0, g);
flBox(1.02, 0.08, 1.2, flM(quilt || FLC.sky), 0, 0.56, 0.3, g);
flBox(0.6, 0.14, 0.36, flM(0xDCD2C4), 0, 0.6, -0.68, g);
flBox(1.08, 0.9, 0.08, wd, 0, 0.55, -0.95, g);
flBox(1.08, 0.5, 0.08, wd, 0, 0.35, 0.95, g);
if (!FL.lite) {
var b = flSph(0.12, flM(0x9A7A54), 0.25, 0.72, -0.5, g, 7);
flSph(0.07, flM(0x9A7A54), 0.25, 0.88, -0.5, g, 6);
}
flPS(x, z, 0.55, 1.0, ry, 0.9);
g.userData.furn = "bed";
return g;
},
function (G, x, z, ry) {
var g = flPiece(G, x, z, ry), wd = flM(FLC.pine);
[[-0.5, -0.95], [0.5, -0.95], [-0.5, 0.95], [0.5, 0.95]].forEach(function (p) { flBox(0.08, 2.0, 0.08, wd, p[0], 1.0, p[1], g); });
[0.35, 1.45].forEach(function (y, i) { flBox(1.0, 0.12, 1.9, wd, 0, y, 0, g); flBox(0.94, 0.14, 1.84, flM(0xD8D0C2), 0, y + 0.13, 0, g); flBox(0.98, 0.06, 1.2, flM(i ? FLC.butter : FLC.sage), 0, y + 0.22, 0.3, g); flBox(0.5, 0.1, 0.3, flM(0xDCD2C4), 0, y + 0.26, -0.7, g); });
for (var r = 0; r < 4; r++)
flBox(0.5, 0.04, 0.04, wd, 0, 0.55 + r * 0.3, 1.0, g);
flBox(1.0, 0.25, 0.06, wd, 0, 1.8, 0, g).rotation.y = Math.PI / 2;
flPS(x, z, 0.55, 1.0, ry, 2.0);
return g;
},
function (G, x, z, ry) {
var g = flPiece(G, x, z, ry), wd = flM(0xD2CABA);
flBox(0.75, 0.06, 1.3, wd, 0, 0.55, 0, g);
flBox(0.7, 0.1, 1.24, flM(0xDCD2C4), 0, 0.62, 0, g);
for (var i = 0; i < 9; i++) {
flBox(0.03, 0.6, 0.03, wd, -0.36, 0.85, -0.6 + i * 0.15, g);
flBox(0.03, 0.6, 0.03, wd, 0.36, 0.85, -0.6 + i * 0.15, g);
}
flBox(0.78, 0.05, 0.05, wd, 0, 1.15, -0.64, g);
flBox(0.78, 0.05, 0.05, wd, 0, 1.15, 0.64, g);
flBox(0.05, 0.05, 1.3, wd, -0.36, 1.15, 0, g);
flBox(0.05, 0.05, 1.3, wd, 0.36, 1.15, 0, g);
[[-0.36, -0.64], [0.36, -0.64], [-0.36, 0.64], [0.36, 0.64]].forEach(function (p) { flBox(0.06, 1.15, 0.06, wd, p[0], 0.58, p[1], g); });
if (!FL.lite) {
flCyl(0.01, 0.01, 0.6, wd, 0, 1.5, -0.5, g, 4);
for (var k = 0; k < 4; k++) {
var a = k / 4 * 6.283;
flSph(0.04, flM([FLC.butter, FLC.sky, FLC.pink, FLC.sage][k]), Math.cos(a) * 0.18, 1.62, -0.5 + Math.sin(a) * 0.18, g, 5);
}
}
flPS(x, z, 0.42, 0.7, ry, 1.2);
g.userData.furn = "crib";
return g;
},
function (G, x, z, ry) {
var g = flPiece(G, x, z, ry);
flBox(0.9, 0.5, 0.5, flM(FLC.sky), 0, 0.25, 0, g);
flBox(0.94, 0.06, 0.54, flM(FLC.butter), 0, 0.52, 0, g);
if (!FL.lite) {
flSph(0.12, flM(0xB86A5A), 0.2, 0.62, 0, g, 8);
flBox(0.18, 0.18, 0.18, flM(FLC.sage), -0.2, 0.64, 0.05, g);
flBox(0.14, 0.14, 0.14, flM(FLC.pink), -0.05, 0.62, -0.1, g);
}
flPS(x, z, 0.48, 0.28, ry, 0.6);
return g;
},
function (G, x, z, ry, n) {
var g = flPiece(G, x, z, ry), wd = flM(FLC.pine);
n = n || 4;
flBox(1.4, 0.05, 0.8, wd, 0, 0.55, 0, g);
[[-0.6, -0.32], [0.6, -0.32], [-0.6, 0.32], [0.6, 0.32]].forEach(function (p) { flBox(0.05, 0.55, 0.05, wd, p[0], 0.27, p[1], g); });
for (var i = 0; i < n; i++) {
var cx = (i % 2 ? 0.35 : -0.35), cz = (i < 2 ? -0.65 : 0.65);
var c = flPiece(g, cx, cz, i < 2 ? 0 : Math.PI);
flBox(0.32, 0.04, 0.3, flM([FLC.sky, FLC.butter, FLC.sage, FLC.pink][i % 4]), 0, 0.32, 0, c);
flBox(0.32, 0.32, 0.04, flM([FLC.sky, FLC.butter, FLC.sage, FLC.pink][i % 4]), 0, 0.5, -0.14, c);
}
if (!FL.lite) {
flBox(0.3, 0.01, 0.22, flM(0xDCD2C4), -0.3, 0.58, 0, g);
flBox(0.3, 0.01, 0.22, flM(0xDCD2C4), 0.3, 0.58, 0.05, g);
flCyl(0.04, 0.04, 0.12, flM(FLC.sky), 0, 0.64, 0, g, 6);
}
flPS(x, z, 0.75, 0.9, ry, 0.7);
return g;
},
function (G, x, z, ry) {
var g = flPiece(G, x, z, ry), fr = flM(0x5A7A8A), ch = flSilver();
[-1.8, 1.8].forEach(function (s) { var a = flBox(0.1, 2.7, 0.1, fr, s, 1.3, -0.7, g); a.rotation.x = -0.25; var b = flBox(0.1, 2.7, 0.1, fr, s, 1.3, 0.7, g); b.rotation.x = 0.25; });
flBox(3.8, 0.12, 0.12, fr, 0, 2.58, 0, g);
[-0.9, 0.9].forEach(function (sx) { flBox(0.02, 1.9, 0.02, ch, sx - 0.22, 1.62, 0, g); flBox(0.02, 1.9, 0.02, ch, sx + 0.22, 1.62, 0, g); flBox(0.5, 0.05, 0.2, flM(0x2A2A2A), sx, 0.66, 0, g); });
flSolid(x, z, 2, 1, ry, 2.6);
return g;
},
function (G, x, z, ry) {
var g = flPiece(G, x, z, ry), fr = flM(0x5A7A8A), sl = flM(FLC.butter);
flBox(1.0, 0.06, 1.0, fr, 0, 1.8, -1.4, g);
[[-0.45, -1.85], [0.45, -1.85], [-0.45, -0.95], [0.45, -0.95]].forEach(function (p) { flBox(0.08, 1.8, 0.08, fr, p[0], 0.9, p[1], g); });
for (var r = 0; r < 6; r++)
flBox(0.8, 0.04, 0.06, fr, 0, 0.3 + r * 0.3, -2.0, g);
var s = flBox(0.7, 0.05, 3.0, sl, 0, 1.0, 0.3, g);
s.rotation.x = 0.6;
flBox(0.05, 0.2, 3.0, sl, -0.36, 1.1, 0.3, g).rotation.x = 0.6;
flBox(0.05, 0.2, 3.0, sl, 0.36, 1.1, 0.3, g).rotation.x = 0.6;
flSolid(x, z, 0.6, 1.8, ry, 1.9);
return g;
},
function (G, x, z) {
var g = flPiece(G, x, z, 0), fr = flM(0xB86A5A);
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++)
flBox(0.06, 2.0, 0.06, fr, -1.2 + i * 0.8, 1.0, -1.2 + j * 0.8, g);
for (var h = 0; h < 4; h++) {
for (var k = 0; k < 4; k++) {
flBox(2.4, 0.05, 0.05, fr, 0, 0.5 + h * 0.5, -1.2 + k * 0.8, g);
flBox(0.05, 0.05, 2.4, fr, -1.2 + k * 0.8, 0.5 + h * 0.5, 0, g);
}
}
flSolid(x, z, 1.25, 1.25, 0, 2);
return g;
},
function (G, x, z) {
var g = flPiece(G, x, z, 0);
flCyl(1.4, 1.4, 0.12, flM(0x5A7A8A), 0, 0.35, 0, g, 18);
flCyl(0.1, 0.1, 0.35, flM(0x2A2A2A), 0, 0.17, 0, g, 6);
for (var i = 0; i < 4; i++) {
var a = i / 4 * 6.283;
flBox(0.05, 0.7, 0.05, flM(FLC.butter), Math.cos(a) * 1.0, 0.75, Math.sin(a) * 1.0, g);
}
flBox(2.0, 0.05, 0.05, flM(FLC.butter), 0, 1.1, 0, g);
flBox(0.05, 0.05, 2.0, flM(FLC.butter), 0, 1.1, 0, g);
FL.spin.push({ m: g, sp: 0.25, ax: "y" });
flSolidR(x, z, 1.45, 1.2);
return g;
},
function (G, x, z, ry, len) {
len = len || 1.8;
var g = flPiece(G, x, z, ry), wd = flM(FLC.oak), bk = flM(0x2A2A2A);
for (var i = 0; i < 3; i++)
flBox(len, 0.04, 0.12, wd, 0, 0.45, -0.15 + i * 0.15, g);
flBox(len, 0.12, 0.04, wd, 0, 0.75, -0.25, g);
flBox(len, 0.12, 0.04, wd, 0, 0.9, -0.25, g);
[-1, 1].forEach(function (s) { flBox(0.06, 0.9, 0.5, bk, s * (len / 2 - 0.1), 0.45, -0.05, g); });
flPS(x, z, len / 2, 0.3, ry, 0.9);
return g;
},
function (G) {
var mIvory = flM(0xD8D0C2, { map: "damask" }), mBlush = flM(0xD6B4B4, { map: "pinkdamask" }), mCarpet = flM(0xD8D0C2, { map: "carpet" }), mRose = flM(0xDCCCC4, { map: "rosecarpet" }), mMarble = flM(0xD0CAC0, { map: "marble" }), mParq = flM(0xD8CCBC, { map: "parquet" }), mTile = flM(0xD0C8BC, { map: "tile" }), mStone = flM(0xC0B8AC, { map: "stone" }), mStaffWall = flM(0xBCB8AC), mStaffFloor = flM(0x8A867A, { map: "lino" }), mBrick = flPhoto("brick", 0xC8B8A8, "brick"), gold = flGold();
var F = flWing(G, "foyer", -20, 20, 40, 60);
flRoom(F, -20, 20, 40, 60, { name: "the Foyer", h: 8, wall: mBlush, floor: mMarble, ftile: 2.5, where: "wed",
gaps: [{ s: "n", c: 0, w: 5, h: 4.6 }, { s: "w", c: 50, w: 3 }, { s: "e", c: 50, w: 3 }] });
flPlace("foyer", 0, 52, "The Foyer");
[-1.3, 1.3].forEach(function (dx) { flBox(2.4, 4.4, 0.2, flM(FLC.velvet), dx, 2.2, 59.75, F); flBox(0.08, 3.4, 0.24, gold, dx + (dx < 0 ? 1.0 : -1.0), 2.2, 59.7, F); for (var p = 0; p < 3; p++)
flBox(2.0, 0.08, 0.22, gold, dx, 1.1 + p * 1.15, 59.68, F); });
flBox(6, 0.45, 0.4, gold, 0, 4.62, 59.7, F);
flSign(F, ["THE EVERBLOOM", "Wedding House"], 5.2, 1.3, 0, 5.9, 59.7, Math.PI, "#3A3A30", "#E2CFA0");
flSpot({ x: 0, z: 57.5, r: 2.4, name: "The front doors: out to Somnucor", verb: "go out", fn: flGoOut });
flChandelier(F, 0, 7.2, 50, 1.5, { tiers: 3 });
flRug(F, 0, 50, 10, 8, 0, FLC.sage, FLC.gold);
flCounter(F, -12, 46, 6, 0, { col: FLC.cream, panel: FLC.blush });
flSign(F, ["WEDDING PLANNERS"], 3.6, 0.6, -12, 3.2, 40.35, 0, "#3A3A30", "#E2CFA0");
flVase(F, -14, 1.11, 46, 1.2);
flComputer(F, -10.5, 1.11, 45.9, Math.PI);
flSpot({ x: -12, z: 48, r: 2.6, name: "The planners' desk: weddings, bookings and the rooms", verb: "ask", fn: function () { fwOpen("wed"); } });
flStaff({ title: "Wedding planner", x: -12, z: 45, ry: 0, seed: "planner1", talk: "planner" });
flStaff({ title: "Wedding planner", x: -14.5, z: 45, ry: 0, seed: "planner2" });
flStaff({ title: "Receptionist", x: 12, z: 45, ry: 0, seed: "wreception", talk: "wreception" });
flCounter(F, 12, 46, 4, 0, { col: FLC.cream, panel: FLC.blush });
flSign(F, ["WELCOME"], 2.6, 0.6, 12, 3.2, 40.35, 0, "#3A3A30", "#E2CFA0");
flSpot({ x: 12, z: 48, r: 2.4, name: "The front desk: today's weddings and the way round", verb: "ask", fn: flWedDirectory });
flBoard(F, "today", 0, 3.2, 59.6, Math.PI, 4.4, 2.6);
[[-17, 57], [17, 57]].forEach(function (q) { flSofa(F, q[0], q[1], Math.PI, FLC.sage, 2.6); });
[[-18.6, 42], [18.6, 42], [-6, 58.6], [6, 58.6]].forEach(function (q) { flPlant(F, q[0], q[1], "roses", 1.1); });
for (var s = 0; s < 3; s++) {
flSconce(F, -19.75, 3.2, 44 + s * 6, Math.PI / 2);
flSconce(F, 19.75, 3.2, 44 + s * 6, -Math.PI / 2);
}
flPainting(F, -8, 3.6, 59.75, Math.PI, 2.4, 1.8, 2);
flPainting(F, 8, 3.6, 59.75, Math.PI, 2.4, 1.8, 0);
flStaff({ title: "Valet", x: 3.2, z: 58.4, ry: Math.PI, seed: "wvalet" });
flStaff({ title: "Security officer", x: -3.2, z: 58.4, ry: Math.PI, seed: "wsec1" });
var RC = flWing(G, "rings", -50, -20, 40, 60);
flRoom(RC, -50, -20, 40, 60, { name: "the Ring Counter", h: 5, wall: mIvory, floor: mCarpet, where: "wed", skip: ["e"],
gaps: [{ s: "e", c: 50, w: 3 }, { s: "w", c: 50, w: 2.6 }, { s: "n", c: -35, w: 3, h: 3.6 }] });
flPlace("rings", -35, 50, "The Ring Counter");
flRingCase(RC, -40, 46, 4, 0);
flRingCase(RC, -30, 46, 4, 0);
flRingCase(RC, -47, 52, 3, Math.PI / 2);
flSign(RC, ["THE RING COUNTER", "engagement rings and wedding bands"], 5, 1, -35, 3.4, 40.35, 0, "#3A3A30", "#E2CFA0");
flSpot({ x: -35, z: 48.2, r: 3, name: "The Ring Counter: engagement rings and wedding bands", verb: "look at the rings", fn: function () { fwShop("rings"); } });
flStaff({ title: "Jeweller", x: -35, z: 44.6, ry: 0, seed: "jeweller", talk: "jeweller" });
[[-44, 56], [-26, 56]].forEach(function (q) { flArmchair(RC, q[0], q[1], Math.PI, FLC.blush); });
flCoffeeTable(RC, -35, 56, 0);
flMirror(RC, -49.8, 2.2, 56, Math.PI / 2, 1.2, 1.8);
flChandelier(RC, -35, 4.4, 50, 0.9);
flDesk(RC, -27, 41.4, 0, { w: 2, col: FLC.walnut });
flCabinet(RC, -21.2, 42, -Math.PI / 2, 1.2, 1.6, 0x6A6A6A);
var RR = flWing(G, "roseroom", -70, -50, 40, 60);
flRoom(RR, -70, -50, 40, 60, { name: "the Rose Room", h: 5, wall: mBlush, floor: mParq, where: "wed", skip: ["e"], gaps: [{ s: "e", c: 50, w: 2.6 }] });
flPlace("roseroom", -60, 50, "The Rose Room");
flArch(RR, -60, 42.4, 0, 2.6, 2.7);
flBox(4, 0.25, 2.4, mMarble, -60, 0.125, 43, RR);
FL.pads.push({ x0: -62, x1: -58, z0: 41.8, z1: 44.2, h: 0.25 });
for (var rr = 0; rr < 3; rr++) {
flPew(RR, -64, 47 + rr * 1.6, Math.PI, 3);
flPew(RR, -56, 47 + rr * 1.6, Math.PI, 3);
}
flRectTable(RR, -60, 56, 6, 1.2, 0, { cloth: 0xD8D0C2, runner: FLC.sage });
for (var c = 0; c < 5; c++) {
flChair(RR, -62.4 + c * 1.2, 55.1, 0, FLC.sage);
flChair(RR, -62.4 + c * 1.2, 56.9, Math.PI, FLC.sage);
}
flSpot({ x: -60, z: 44.8, r: 2.4, name: "The Rose Room's arch: say your vows here", verb: "say your vows", fn: function () { fwVow("rose"); } });
flWindow(RR, -69.8, 2.4, 48, Math.PI / 2, 1.6, 2.0);
flWindow(RR, -69.8, 2.4, 55, Math.PI / 2, 1.6, 2.0);
flChandelier(RR, -60, 4.4, 50, 0.9);
[[-68.5, 41.5], [-51.5, 41.5]].forEach(function (q) { flPlant(RR, q[0], q[1], "roses", 1); });
var BQ = flWing(G, "boutique", 20, 50, 40, 60);
flRoom(BQ, 20, 50, 40, 60, { name: "the Bridal Boutique", h: 5, wall: mBlush, floor: mCarpet, where: "wed", skip: ["w"], gaps: [{ s: "w", c: 50, w: 3 }, { s: "e", c: 50, w: 2.6 }] });
flPlace("boutique", 35, 50, "The Bridal Boutique");
[[24, 43], [29, 43], [34, 43], [39, 43]].forEach(function (q, i) { flGown(BQ, q[0], q[1], 0, [0xDCD2C4, 0xD8CCB8, 0xDCC8C2, 0xD2CABA][i]); });
flGownRail(BQ, 46, 44, -Math.PI / 2, 5);
flGownRail(BQ, 46, 52, -Math.PI / 2, 4, true);
flCyl(1.4, 1.5, 0.3, mMarble, 35, 0.15, 53, BQ, 20);
FL.pads.push({ x0: 33.8, x1: 36.2, z0: 51.8, z1: 54.2, h: 0.3 });
[[-1.6, -1], [1.6, -1], [0, -1.9]].forEach(function (q) { flMirror(BQ, 35 + q[0], 1.6, 53 + q[1], Math.atan2(-q[0], -q[1]), 1.0, 2.2); });
flSofa(BQ, 28, 56, Math.PI, FLC.blush, 2.4);
flCoffeeTable(BQ, 28, 54.6, 0);
flArmchair(BQ, 24, 54.4, Math.PI / 2, FLC.sage);
flCounter(BQ, 42, 57, 3, Math.PI, { col: FLC.cream });
flVase(BQ, 42, 1.11, 57, 1);
flSign(BQ, ["THE BRIDAL BOUTIQUE", "gowns, suits, veils and flowers"], 5, 1, 35, 3.4, 40.35, 0, "#3A3A30", "#E2CFA0");
flSpot({ x: 42, z: 55.4, r: 2.6, name: "The boutique counter: bouquets, buttonholes and keepsakes", verb: "shop", fn: function () { fwShop("boutique"); } });
flStaff({ title: "Bridal consultant", x: 42, z: 58, ry: Math.PI, seed: "consultant", talk: "consultant" });
flStaff({ title: "Florist", x: 31, z: 45, ry: 0, seed: "wflorist", talk: "wflorist", wander: 3 });
flChandelier(BQ, 35, 4.4, 47, 1);
var RS = flWing(G, "rest", 50, 64, 40, 60);
flRoom(RS, 50, 64, 40, 60, { name: "the cloakroom and restrooms", h: 4.2, wall: mIvory, floor: mTile, where: "wed", skip: ["w"], gaps: [{ s: "w", c: 50, w: 2.6 }] });
flCounter(RS, 55, 54, 3, Math.PI / 2, { col: FLC.cream });
for (var k = 0; k < 7; k++)
flBox(0.45, 1.1, 0.08, flM([0x2A2A34, FLC.sage, 0x5A4A3A, FLC.blush][k % 4]), 62.6, 2.2, 51 + k * 0.9, RS);
flBox(0.06, 0.06, 7, gold, 62.8, 2.8, 54, RS);
flSign(RS, ["CLOAKROOM"], 2.4, 0.5, 63.8, 3.2, 54, -Math.PI / 2, "#3A3A30", "#E2CFA0");
[[50, 52.9], [54.1, 59.9], [61.1, 64]].forEach(function (q) { var L = q[1] - q[0], m = (q[0] + q[1]) / 2; flBox(L, 3, 0.15, mIvory, m, 1.5, 47.5, RS); flSolid(m, 47.5, L / 2, 0.1); });
flBox(0.15, 3, 7.5, mIvory, 57, 1.5, 43.75, RS);
flSolid(57, 43.75, 0.1, 3.75);
for (var st = 0; st < 2; st++) {
flStall(RS, 51.4 + st * 1.3, 41.2, 0);
flStall(RS, 58.4 + st * 1.3, 41.2, 0);
}
flBasin(RS, 54.5, 46.8, Math.PI, 2);
flBasin(RS, 61.5, 46.8, Math.PI, 2);
flSign(RS, ["LADIES"], 1.4, 0.4, 53.5, 2.6, 47.6, 0, "#3A3A30", "#E2CFA0");
flSign(RS, ["GENTLEMEN"], 1.6, 0.4, 61, 2.6, 47.6, 0, "#3A3A30", "#E2CFA0");
flStaff({ title: "Cloakroom attendant", x: 56.6, z: 54, ry: -Math.PI / 2, seed: "wcoat" });
var CH = flWing(G, "chapel", -20, 20, -10, 40);
flRoom(CH, -20, 20, -10, 40, { name: "the Everbloom Chapel", h: 11, wall: mIvory, floor: mStone, ftile: 2, where: "wed", skip: ["s"], hemi: 1.05,
gaps: [{ s: "s", c: 0, w: 5, h: 4.6 }, { s: "w", c: 15, w: 4, h: 4 }, { s: "e", c: 15, w: 4, h: 4 }, { s: "n", c: -14, w: 2, h: 2.8 }, { s: "n", c: 14, w: 2, h: 2.8 }], ceil: flM(0xC8C0B0, { map: "coffer", e: 0x16140E }), ctile: 3 });
flPlace("chapel", 0, 10, "The Everbloom Chapel");
flBox(2.4, 0.02, 38, flM(FLC.sage), 0, 0.025, 17, CH);
flBox(2.6, 0.015, 38, gold, 0, 0.02, 17, CH);
for (var r = 0; r < 12; r++) {
flPew(CH, -8, 6 + r * 2.4, Math.PI, 9);
flPew(CH, 8, 6 + r * 2.4, Math.PI, 9);
}
flBox(30, 0.45, 8, mMarble, 0, 0.225, -5.5, CH);
FL.pads.push({ x0: -15, x1: 15, z0: -9.5, z1: -1.5, h: 0.45 });
flRamp(-3, 3, -1.5, 0.3, 0.45, 0, "z");
flAltar(CH, 0, -7.6, 0);
flArch(CH, 0, -4, 0, 3.2, 3.2);
flSpot({ x: 0, z: -2.6, y: 0.45, r: 2.8, name: "The altar: say your vows", verb: "say your vows", fn: function () { fwVow("chapel"); } });
flStaff({ title: "Officiant", x: 0, z: -5.6, y: 0.45, ry: 0, seed: "officiant1", talk: "officiant" });
flOrgan(CH, -12, -6.5, Math.PI / 4);
flStaff({ title: "Organist", x: -11, z: -4.6, y: 0.45, ry: Math.PI + Math.PI / 4, seed: "organist", talk: "organist" });
flSpot({ x: -10.2, z: -3.6, y: 0.45, r: 2.2, name: "The organ", verb: "listen", fn: flOrganPlay });
for (var w = 0; w < 4; w++) {
flStained(CH, -19.8, 5.6, 4 + w * 9, Math.PI / 2, 2.2, 5.4, w);
flStained(CH, 19.8, 5.6, 4 + w * 9, -Math.PI / 2, 2.2, 5.4, w + 4);
}
var rose = wMesh(new THREE.CircleGeometry(3, FL.lite ? 16 : 32), new THREE.MeshBasicMaterial({ map: flGlassTex(9), color: 0xC8C0B4 }), 0, 7.6, -9.8, CH);
wMesh(new THREE.TorusGeometry(3, 0.18, 6, 32), flM(0xB8B0A0, { map: "stone" }), 0, 7.6, -9.78, CH);
for (var ch = 0; ch < 3; ch++)
flChandelier(CH, 0, 9.8, 6 + ch * 13, 1.0);
[[-14, -2], [14, -2], [-14, -8.6], [14, -8.6]].forEach(function (q) { flPlant(CH, q[0], q[1], "roses", 1.3); });
[[-6, -2.2], [6, -2.2]].forEach(function (q) { var g = flPiece(CH, q[0], q[1], 0, 0.45); flCyl(0.3, 0.36, 1.0, mMarble, 0, 0.5, 0, g, 12); flVase(CH, q[0], 1.45, q[1], 1.6); flSolidR(q[0], q[1], 0.4, 1.5); });
flStaff({ title: "Usher", x: -2, z: 37, ry: Math.PI, seed: "usher1" });
flStaff({ title: "Photographer", x: 4, z: 2, ry: Math.PI, seed: "photo1", talk: "photographer", wander: 3 });
var GH = flWing(G, "hall", -70, -20, -10, 40);
flRoom(GH, -70, -20, -10, 40, { name: "the Grand Hall", h: 9, wall: mBlush, floor: mParq, where: "wed", skip: ["e", "s"],
gaps: [{ s: "e", c: 15, w: 4, h: 4 }, { s: "s", c: -35, w: 3, h: 3.6 }, { s: "n", c: -45, w: 2.6 }] });
flPlace("hall", -45, 15, "The Grand Hall");
flBox(14, 0.3, 3, mParq, -45, 0.15, -6.5, GH);
FL.pads.push({ x0: -52, x1: -38, z0: -8, z1: -5, h: 0.3 });
flRectTable(GH, -45, -6.8, 10, 1, 0, { cloth: 0xD8D0C2, runner: FLC.sage, y: 1.06 });
for (var t = 0; t < 8; t++)
flChair(GH, -49.2 + t * 1.2, -7.8, 0, FLC.sage);
flRoundTable(GH, -33, -6, 0.7, { cloth: 0xD8D0C2 });
flWeddingCake(GH, -33, 0.8, -6, 1.2);
flSpot({ x: -33, z: -4.2, r: 2.2, name: "The cake", verb: "have a slice", fn: function () { if (typeof needsMenu === "function")
needsMenu(FL_WED);
else
fwShop("menu"); } });
flDanceFloor(GH, -45, 8, 12, 10);
flBandStage(GH, -66, 8, Math.PI / 2, 10);
FL.pads.push({ x0: -70, x1: -62, z0: 3, z1: 13, h: 0.6 });
flStaff({ title: "Band leader", x: -65, z: 8, y: 0.6, ry: Math.PI / 2, seed: "bandlead", talk: "band" });
flSpot({ x: -60.5, z: 8, r: 2.6, name: "The band: ask for a song", verb: "ask for a song", fn: flBandPlay });
var tables = [[-62, 24], [-52, 24], [-42, 24], [-32, 24], [-62, 33], [-52, 33], [-42, 33], [-32, 33], [-28, 6], [-28, 15]];
tables.forEach(function (q, i) { if (FL.lite && i % 3 === 2) {
flRoundTable(GH, q[0], q[1], 1.0, { cloth: 0xD8D0C2 });
return;
} flDiningRound(GH, q[0], q[1], 1.0, 8, FLC.sage, { cloth: 0xD8D0C2 }); });
flBar(GH, -45, 37.6, 8, Math.PI);
flStaff({ title: "Bartender", x: -45, z: 39, ry: Math.PI, seed: "wbar", talk: "wbar" });
flSpot({ x: -45, z: 35.8, r: 2.6, name: "The bar", verb: "order a drink", fn: function () { if (typeof needsMenu === "function")
needsMenu(FL_WED);
else
fwShop("menu"); } });
for (var hc = 0; hc < 3; hc++)
flChandelier(GH, -45, 8.2, 0 + hc * 14, 1.4, { tiers: 3 });
for (var hw = 0; hw < 4; hw++)
flWindow(GH, -69.8, 3.2, 20 + hw * 5, Math.PI / 2, 1.8, 3.2);
flStaff({ title: "Maître d'", x: -24, z: 30, ry: -Math.PI / 2, seed: "maitred", talk: "maitred" });
flStaff({ title: "Server", x: -50, z: 28, ry: 0, seed: "server1", wander: 6 });
flStaff({ title: "Server", x: -38, z: 20, ry: 0, seed: "server2", wander: 6 });
flStaff({ title: "Server", x: -56, z: 16, ry: 0, seed: "server3", wander: 5 });
flStaff({ title: "Server", x: -30, z: 30, ry: 0, seed: "server4", wander: 5 });
flSign(CH, ["THE GRAND HALL"], 3.4, 0.6, -19.75, 5, 15, Math.PI / 2, "#3A3A30", "#E2CFA0");
flSign(CH, ["THE GARDEN"], 3, 0.6, 19.75, 5, 15, -Math.PI / 2, "#3A3A30", "#E2CFA0");
var K = flWing(G, "kitchen", -70, -40, -40, -10);
flRoom(K, -70, -40, -40, -10, { name: "the kitchens", h: 4.2, wall: mStaffWall, floor: mStaffFloor, where: "wed", skip: ["s"], gate: "wstaff", trim: false,
gaps: [{ s: "s", c: -45, w: 2.6 }, { s: "e", c: -17.5, w: 2 }] });
flKitchenRun(K, -62, -39.4, 14, 0);
flStove(K, -66, -36, 0);
flStove(K, -63, -36, 0);
flStove(K, -60, -36, 0);
flFridge(K, -69.4, -30, Math.PI / 2);
flFridge(K, -69.4, -28.8, Math.PI / 2);
flIsland(K, -58, -26, 6, 1.4, 0);
flIsland(K, -58, -20, 6, 1.4, 0);
flRectTable(K, -46, -35, 3, 1.2, 0, { cloth: false, top: 0xD0CAC0 });
flWeddingCake(K, -46.6, 0.8, -35, 1);
flWeddingCake(K, -45.2, 0.8, -35, 0.8);
flSign(K, ["THE CAKE ROOM"], 2.4, 0.5, -46, 2.8, -39.7, 0, "#3A3A30", "#E2CFA0");
flShelves(K, -42, -29, -Math.PI / 2, 3);
flStaff({ title: "Banquet chef", x: -60, z: -33, ry: 0, seed: "wchef", talk: "chef" });
flStaff({ title: "Cake baker", x: -46, z: -33.4, ry: Math.PI, seed: "baker", talk: "baker" });
flStaff({ title: "Kitchen porter", x: -64, z: -24, ry: 0, seed: "wporter", wander: 4 });
var O1 = flWing(G, "staffroom", -40, -20, -25, -10);
flRoom(O1, -40, -20, -25, -10, { name: "the florist's workroom and staff room", h: 4.2, wall: mStaffWall, floor: mStaffFloor, where: "wed", skip: ["s", "w"], gate: "wstaff", trim: false,
gaps: [{ s: "w", c: -17.5, w: 2 }, { s: "n", c: -30, w: 2 }] });
flRectTable(O1, -34, -21, 4, 1.4, 0, { cloth: false, top: 0xA89A80 });
for (var fb = 0; fb < 5; fb++)
flVase(O1, -35.6 + fb * 0.8, 0.8, -21, 1.1);
flShelves(O1, -39.4, -17, Math.PI / 2, 3);
flLockers(O1, -24, -24.6, 0, 6);
flSofa(O1, -24, -11, Math.PI, FLC.sage, 2.4);
flKitchenRun(O1, -29, -10.6, 4, Math.PI);
flStaff({ title: "Housekeeper", x: -30, z: -14, ry: 0, seed: "wkeep", wander: 3 });
var O2 = flWing(G, "offices", -40, -20, -40, -25);
flRoom(O2, -40, -20, -40, -25, { name: "the offices and security", h: 4.2, wall: mStaffWall, floor: mCarpet, where: "wed", skip: ["s", "w"], gate: "wstaff", gaps: [{ s: "s", c: -30, w: 2 }] });
flDesk(O2, -35, -36, 0, { w: 2.2, col: FLC.walnut });
flBossChair(O2, -35, -37.4, 0, FLC.velvet);
flBookcase(O2, -39.6, -32, Math.PI / 2, 2, 2.4);
flFiling(O2, -21, -36, -Math.PI / 2, 2);
flSign(O2, ["GENERAL MANAGER"], 2.4, 0.5, -35, 2.9, -39.7, 0, "#3A3A30", "#E2CFA0");
flDesk(O2, -25, -30, Math.PI, { w: 2, col: 0x5A5A5A });
for (var cc = 0; cc < 3; cc++)
flComputer(O2, -26 + cc * 0.9, 0.84, -30.2, Math.PI);
flStaff({ title: "General manager", x: -35, z: -37.6, ry: 0, seed: "wmanager", talk: "wmanager" });
flStaff({ title: "Security officer", x: -25, z: -28.6, ry: Math.PI, seed: "wsec2" });
var BS = flWing(G, "bridal", -20, 0, -40, -10);
flRoom(BS, -20, 0, -40, -10, { name: "the bridal suite", h: 4.4, wall: mBlush, floor: mRose, where: "wed", skip: ["s", "w"], gate: "couple", gaps: [{ s: "s", c: -14, w: 2, h: 2.8 }] });
flVanity(BS, -14, -39.4, 0);
flVanity(BS, -8, -39.4, 0);
flGown(BS, -3, -36, -Math.PI / 2);
flGownRail(BS, -1, -28, -Math.PI / 2, 4);
flChaise(BS, -17, -28, Math.PI / 2, FLC.blush);
flSofa(BS, -10, -20, Math.PI, FLC.sage, 2.6);
flCoffeeTable(BS, -10, -21.4, 0);
flArmchair(BS, -14, -22, Math.PI / 2, FLC.blush);
[[-1.6, -38], [-19, -12]].forEach(function (q) { flPlant(BS, q[0], q[1], "orchid", 1.2); });
for (var m3 = 0; m3 < 3; m3++)
flMirror(BS, -19.8, 1.8, -36 + m3 * 3, Math.PI / 2, 1.2, 2.2);
flChandelier(BS, -10, 3.8, -28, 1);
flStaff({ title: "Hair and make-up artist", x: -11, z: -38, ry: 0, seed: "hair", talk: "hair" });
var GL = flWing(G, "groom", 0, 20, -40, -10);
flRoom(GL, 0, 20, -40, -10, { name: "the groom's lounge", h: 4.4, wall: mIvory, floor: mParq, where: "wed", skip: ["s", "w"], gate: "couple", gaps: [{ s: "s", c: 14, w: 2, h: 2.8 }] });
flSofa(GL, 10, -34, 0, FLC.velvet, 3);
flArmchair(GL, 6, -30, Math.PI / 2, FLC.velvet);
flArmchair(GL, 14, -30, -Math.PI / 2, FLC.velvet);
flCoffeeTable(GL, 10, -31, 0);
flBookcase(GL, 19.6, -24, -Math.PI / 2, 2.4, 2.6);
flGownRail(GL, 1, -24, Math.PI / 2, 4, true);
flMirror(GL, 0.2, 1.8, -34, Math.PI / 2, 1.2, 2.2);
flTV(GL, 10, 2.2, -39.75, 0, 2.4);
flFireplace(GL, 19.7, -34, -Math.PI / 2);
flRectTable(GL, 6, -15, 2, 1, 0, { cloth: false, top: FLC.walnut });
flChair(GL, 5.4, -14, Math.PI, FLC.velvet);
flChair(GL, 6.6, -14, Math.PI, FLC.velvet);
var GD = flWing(G, "garden", 20, 64, -30, 40);
flRoom(GD, 20, 64, -30, 40, { name: "the Everbloom Garden", h: 3.2, wall: mBrick, floor: flM(0x7A9A60, { map: "lawn" }), ftile: 4, where: "wed", out: true, trim: false, skip: ["w", "s"],
gaps: [{ s: "w", c: 15, w: 4, h: 4 }] });
flPlace("garden", 42, 5, "The Everbloom Garden");
flTBox(0.12, 11, 23, mBrick, 20.22, 5.5, 1.5, GD, 3);
flTBox(0.12, 11, 23, mBrick, 20.22, 5.5, 28.5, GD, 3);
flTBox(0.12, 7, 4, mBrick, 20.22, 7.5, 15, GD, 3);
flTBox(0.12, 4.4, 20, mBrick, 20.22, 2.2, -20, GD, 3);
flTBox(44, 5, 0.12, mBrick, 42, 2.5, 39.78, GD, 3);
flBox(0.9, 0.3, 50, flM(0x4A4A4E), 20.5, 11.1, 15, GD);
flPlane(3, 66, flM(0xB8AC98, { map: "gravel" }), 24.5, 0.02, 5, GD, 2);
flPlane(36, 3, flM(0xB8AC98, { map: "gravel" }), 42, 0.021, 15, GD, 2);
flArch(GD, 42, -22, 0, 3.2, 3.2);
flBox(6, 0.2, 3, mStone, 42, 0.1, -21.5, GD);
FL.pads.push({ x0: 39, x1: 45, z0: -23, z1: -20, h: 0.2 });
flSpot({ x: 42, z: -18.6, r: 2.6, name: "The rose arch: say your vows in the garden", verb: "say your vows", fn: function () { fwVow("garden"); } });
flStaff({ title: "Officiant", x: 42, z: -21.6, y: 0.2, ry: 0, seed: "officiant2" });
flBox(2, 0.02, 18, flM(0xA89C8C), 42, 0.03, -8, GD);
for (var gr = 0; gr < (FL.lite ? 5 : 8); gr++)
for (var gc = 0; gc < 5; gc++) {
flGardenChair(GD, 35.4 + gc * 1.0, -16 + gr * 1.6, Math.PI);
flGardenChair(GD, 44.6 + gc * 1.0, -16 + gr * 1.6, Math.PI);
}
flGazebo(GD, 56, 28, 3.2);
flBench(GD, 56, 23, 0, 2);
flFountain(GD, 42, 28, 0.8);
flHedge(GD, 30, -27, 16, 1.2, 1.4);
flHedge(GD, 54, -27, 16, 1.2, 1.4);
flHedge(GD, 62.6, 5, 1.2, 40, 1.4);
[[28, -6], [28, 22], [60, -12], [50, 36], [34, 36]].forEach(function (q) { flTree(GD, q[0], q[1], 1.1); });
[[30, 10], [54, 10], [30, 20], [54, 20]].forEach(function (q) { flPlant(GD, q[0], q[1], "roses", 1.3); });
[[26, -24], [26, 0], [26, 30], [60, 0], [60, 30]].forEach(function (q) { flLamp(GD, q[0], q[1]); });
flStaff({ title: "Gardener", x: 50, z: 12, ry: 0, seed: "wgarden", talk: "wgarden", wander: 6 });
},
function (G, kind, x, y, z, ry, w, h) {
var cv = document.createElement("canvas");
cv.width = 512;
cv.height = Math.round(512 * h / w);
var tex = new THREE.CanvasTexture(cv);
var g = flPiece(G, x, z, ry, y);
flBox(w + 0.3, h + 0.3, 0.1, flGold(), 0, 0, 0, g);
var face = wMesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, color: 0xD0C8BC }), 0, 0, 0.06, g);
flKeep(face);
var S = { kind: kind, cv: cv, tex: tex, sig: "" };
FL.screens.push(S);
flScreenDraw(S);
return S;
},
function (S) {
var W0 = (typeof FW !== "undefined" && FW.wed) || {}, F0 = (typeof FW !== "undefined" && FW.fam) || {};
var sig = S.kind === "today" ? JSON.stringify((W0.bookings || []).map(function (b) { return b.id + b.status; })) : JSON.stringify([(F0.waiting || []).length]);
if (sig === S.sig)
return;
S.sig = sig;
var x = S.cv.getContext("2d"), W = S.cv.width, H = S.cv.height;
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#3E4436");
g.addColorStop(1, "#2E3228");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C9A868";
x.lineWidth = 6;
x.strokeRect(8, 8, W - 16, H - 16);
x.textAlign = "center";
x.fillStyle = "#E2CFA0";
x.font = "bold " + Math.round(W / 14) + "px Georgia";
if (S.kind === "today") {
x.fillText("Weddings at the Everbloom", W / 2, W / 9 + 10);
x.fillStyle = "#E6DCCC";
x.font = Math.round(W / 26) + "px Georgia";
["The Chapel · for up to 120", "The Garden · vows under the rose arch", "The Rose Room · for up to 20", "The Grand Hall · receptions, the band and the dance floor",
"Book at the planners' desk, or in ☰ Menu, 💍 Family"].forEach(function (l, i) { x.fillText(l, W / 2, W / 9 + 30 + W / 18 * (i + 1)); });
}
else {
x.fillText("Hearthside Family House", W / 2, W / 9 + 10);
x.fillStyle = "#E6DCCC";
x.font = Math.round(W / 26) + "px Georgia";
var n = (F0.waiting || []).length;
[n ? n + " children are waiting for a family" : "Children are waiting for a family", "Fostering is free · adoption 300 to 500 gold in court fees",
"Carers are 21 and over, with a bedroom free", "Ask at reception, or ☰ Menu, 💍 Family"].forEach(function (l, i) { x.fillText(l, W / 2, W / 9 + 30 + W / 18 * (i + 1)); });
}
S.tex.needsUpdate = true;
},
function () {
var rows = Object.keys(FL_PLACES).filter(function (k) { return FL_PLACES[k].x < 500; }).map(function (k) { return worldBtn("go:" + k, "➡️ " + esc(FL_PLACES[k].name), null); }).join("");
var fns = {};
Object.keys(FL_PLACES).forEach(function (k) { fns["go:" + k] = function () { flShowWay(k); }; });
fns.book = function () { worldCard(null); fwOpen("wed"); };
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#F0DEB0'>The Everbloom Wedding House</div><div style='opacity:.85;margin:4px 0 8px'>Where would you like to go? An arrow on the banner points the way.</div>" +
rows + worldBtn("book", "💍 Book a wedding, or answer a proposal", null), fns);
},
function (G) {
var X = FL_FX;
var mWarm = flM(0xD4C8B0, { map: "plaster" }), mSage = flM(0xB8C0A8, { map: "plaster" }), mSky = flM(0xB8C4CC, { map: "plaster" }), mButter = flM(0xD8CCA0, { map: "plaster" }), mOak = flM(0xD0BCA0, { map: "parquet" }), mCarpet = flM(0xB8B4A4, { map: "carpet" }), mPlay = flM(0xD0CCC4, { map: "play" }), mLino = flM(0xC8C0B0, { map: "lino" }), mTile = flM(0xD0C8BC, { map: "tile" }), mBrick = flPhoto("brick", 0xC8B8A8, "brick"), gold = flGold();
var dk = "#3A3A30", lt = "#E2CFA0";
var L = flWing(G, "lobby", X - 20, X + 20, 40, 60);
flRoom(L, X - 20, X + 20, 40, 60, { name: "the lobby", h: 6, wall: mWarm, floor: mOak, where: "fam",
gaps: [{ s: "n", c: X, w: 4, h: 3.4 }, { s: "w", c: 50, w: 2.4 }, { s: "e", c: 50, w: 2.4 }] });
flPlace("lobby", X, 50, "The lobby and reception");
[-1.2, 1.2].forEach(function (dx) { flBox(2.2, 3.6, 0.2, flM(0x5A6A7A), X + dx, 1.8, 59.75, L); flBox(1.6, 1.6, 0.05, flM(0xA8B8C8, { op: 0.5 }), X + dx, 2.4, 59.62, L); });
flSign(L, ["HEARTHSIDE FAMILY HOUSE", "Somnucor Family Services"], 5.6, 1.2, X, 4.6, 59.7, Math.PI, dk, lt);
flSpot({ x: X, z: 57.5, r: 2.4, name: "The front doors: out to Somnucor", verb: "go out", fn: flGoOut });
flCounter(L, X, 46, 7, 0, { col: FLC.oak });
flComputer(L, X - 1.5, 1.11, 45.9, Math.PI);
flComputer(L, X + 1.5, 1.11, 45.9, Math.PI);
flSign(L, ["RECEPTION"], 2.6, 0.5, X, 3.2, 40.35, 0, dk, lt);
flSpot({ x: X, z: 48, r: 2.8, name: "Reception: fostering, adoption and the children waiting", verb: "ask", fn: function () { fwOpen("fam"); } });
flStaff({ title: "Receptionist", x: X - 1.5, z: 45, ry: 0, seed: "freception", talk: "freception" });
flStaff({ title: "Security officer", x: X + 3, z: 58.2, ry: Math.PI, seed: "fsec1" });
flBoard(L, "waiting", X - 12, 3, 40.35, 0, 5, 2.8);
flSofa(L, X - 14, 56, Math.PI, FLC.sage, 2.6);
flSofa(L, X + 14, 56, Math.PI, FLC.sage, 2.6);
flCoffeeTable(L, X - 14, 54.4, 0);
flCoffeeTable(L, X + 14, 54.4, 0);
flRug(L, X + 12, 48, 4, 3, 0, FLC.sky, FLC.butter);
flToyBox(L, X + 13.5, 47, 0);
flBlocks(L, X + 11, 48.6);
flCabinet(L, X - 19.5, 46, Math.PI / 2, 1.6, 1.2, FLC.oak);
flSign(L, ["ABOUT FOSTERING · ABOUT ADOPTION"], 3, 0.4, X - 19.75, 1.6, 46, Math.PI / 2, dk, lt);
[[X - 18.5, 58.5], [X + 18.5, 58.5]].forEach(function (q) { flPlant(L, q[0], q[1], "palm", 1); });
flPainting(L, X - 8, 3, 59.75, Math.PI, 2, 1.4, 0);
flPainting(L, X + 8, 3, 59.75, Math.PI, 2, 1.4, 2);
var CW = flWing(G, "caseworkers", X - 45, X - 20, 40, 60);
flRoom(CW, X - 45, X - 20, 40, 60, { name: "the caseworkers' office", h: 4, wall: mSage, floor: mCarpet, where: "fam", skip: ["e"], gate: "fstaff",
gaps: [{ s: "e", c: 50, w: 2.4 }, { s: "w", c: 50, w: 2 }] });
for (var d = 0; d < 4; d++) {
var dx = X - 41 + (d % 2) * 10, dz = 45 + (d > 1 ? 8 : 0);
flDesk(CW, dx, dz, 0, { w: 2, col: FLC.oak });
flComputer(CW, dx, 0.84, dz - 0.2, Math.PI);
flChair(CW, dx, dz + 0.9, Math.PI, FLC.sky);
flFiling(CW, dx + 2.2, dz - 0.2, 0, 1);
}
flWhiteboard(CW, X - 32, 2, 40.3, 0, 3);
flStaff({ title: "Social worker", x: X - 41, z: 44, ry: 0, seed: "sw1", talk: "social" });
flStaff({ title: "Social worker", x: X - 31, z: 44, ry: 0, seed: "sw2" });
flStaff({ title: "Social worker", x: X - 41, z: 52, ry: 0, seed: "sw3" });
flStaff({ title: "Social worker", x: X - 31, z: 52, ry: 0, seed: "sw4" });
var RCd = flWing(G, "records", X - 60, X - 45, 40, 60);
flRoom(RCd, X - 60, X - 45, 40, 60, { name: "the records room", h: 4, wall: mWarm, floor: mLino, where: "fam", skip: ["e"], gate: "fstaff", gaps: [{ s: "e", c: 50, w: 2 }], trim: false });
for (var f = 0; f < 5; f++) {
flFiling(RCd, X - 58, 42 + f * 3.4, Math.PI / 2, 2);
flFiling(RCd, X - 47, 42 + f * 3.4, -Math.PI / 2, 2);
}
flDesk(RCd, X - 52.5, 56, Math.PI, { w: 2, col: 0x6A6A6A });
flComputer(RCd, X - 52.5, 0.84, 56.2, 0);
flStaff({ title: "Records clerk", x: X - 52.5, z: 57.2, ry: Math.PI, seed: "clerk" });
var V = flWing(G, "visit", X + 20, X + 45, 40, 60);
flRoom(V, X + 20, X + 45, 40, 60, { name: "the visiting room", h: 4.4, wall: mButter, floor: mCarpet, where: "fam", skip: ["w"],
gaps: [{ s: "w", c: 50, w: 2.4 }, { s: "e", c: 50, w: 2.4 }] });
flPlace("visit", X + 32, 50, "The visiting room");
flSofa(V, X + 26, 44, 0, FLC.sage, 2.4);
flArmchair(V, X + 29, 46, -Math.PI / 2, FLC.sky);
flCoffeeTable(V, X + 26, 45.4, 0);
flKidTable(V, X + 38, 46, 0, 4);
flRug(V, X + 34, 55, 5, 3.4, 0, FLC.butter, FLC.sage);
flToyBox(V, X + 37, 57, Math.PI);
flBlocks(V, X + 33, 55);
flBookcase(V, X + 44.6, 52, -Math.PI / 2, 2, 1.6);
flWindow(V, X + 32, 2.4, 59.75, Math.PI, 2, 1.6);
flSpot({ x: X + 32, z: 50, r: 3.2, name: "The visiting room: meet a child", verb: "see who is waiting", fn: function () { fwOpen("fam", "waiting"); } });
flStaff({ title: "Family counsellor", x: X + 28, z: 56, ry: Math.PI / 2, seed: "counsel", talk: "counsellor" });
var RG = flWing(G, "registry", X + 45, X + 70, 40, 60);
flRoom(RG, X + 45, X + 70, 40, 60, { name: "the Registry Office", h: 5, wall: mWarm, floor: mOak, where: "fam", skip: ["w"], gaps: [{ s: "w", c: 50, w: 2.4 }] });
flPlace("registry", X + 57, 50, "The Registry Office");
flDesk(RG, X + 57, 43, 0, { w: 3, col: FLC.walnut });
flBossChair(RG, X + 57, 41.8, 0, FLC.velvet);
flBookcase(RG, X + 50, 40.6, 0, 3, 2.6);
flBookcase(RG, X + 64, 40.6, 0, 3, 2.6);
for (var rr = 0; rr < 3; rr++)
for (var rc = 0; rc < 4; rc++)
flChair(RG, X + 53 + rc * 2.6, 48 + rr * 2.2, Math.PI, FLC.sage);
flPlant(RG, X + 47, 42, "roses", 1);
flPlant(RG, X + 67, 42, "roses", 1);
flPainting(RG, X + 57, 3.2, 40.3, 0, 3, 1.6, 1);
flSign(RG, ["THE REGISTRY OFFICE", "marriages · divorces · the register"], 4.6, 1, X + 57, 4.2, 40.35, 0, dk, lt);
flSpot({ x: X + 57, z: 45, r: 2.8, name: "The registrar's desk: a civil wedding, the register, or a divorce", verb: "see the registrar", fn: function () { fwVow("registry"); } });
flStaff({ title: "Registrar", x: X + 57, z: 42.2, ry: 0, seed: "registrar", talk: "registrar" });
var C = flWing(G, "hall", X - 20, X + 20, 15, 40);
flRoom(C, X - 20, X + 20, 15, 40, { name: "the hall", h: 5, wall: mWarm, floor: mOak, where: "fam", skip: ["s"],
gaps: [{ s: "s", c: X, w: 4, h: 3.4 }, { s: "w", c: 28, w: 2.4 }, { s: "e", c: 28, w: 2.4 }, { s: "n", c: X, w: 4, h: 3.4 }] });
flBox(3, 0.02, 24, flM(FLC.sage), X, 0.025, 27.5, C);
for (var p = 0; p < 4; p++) {
flPainting(C, X - 19.8, 2.6, 19 + p * 6, Math.PI / 2, 1.6, 1.2, p);
flPainting(C, X + 19.8, 2.6, 19 + p * 6, -Math.PI / 2, 1.6, 1.2, p + 1);
}
for (var ph = 0; ph < 10; ph++) {
var px = X - 12 + ph * 2.6;
flBox(1.6, 1.1, 0.05, gold, px, 2.6, 15.3, C);
flBox(1.4, 0.9, 0.02, flM([0xB8C4CC, 0xD8CCA0, 0xB8C0A8, 0xD6B4B4][ph % 4]), px, 2.6, 15.34, C);
}
flSign(C, ["FAMILIES WE HAVE MADE"], 4, 0.5, X, 3.7, 15.35, 0, dk, lt);
flBench(C, X - 17, 24, Math.PI / 2, 2);
flBench(C, X + 17, 24, -Math.PI / 2, 2);
flStaff({ title: "House parent", x: X + 3, z: 30, ry: 0, seed: "hp1", talk: "houseparent", wander: 6 });
var T = flWing(G, "training", X - 60, X - 20, 15, 40);
flRoom(T, X - 60, X - 20, 15, 40, { name: "the training room", h: 4.4, wall: mSage, floor: mCarpet, where: "fam", skip: ["s", "e"], gaps: [{ s: "e", c: 28, w: 2.4 }] });
flPlace("training", X - 40, 28, "The training room");
flWhiteboard(T, X - 40, 2.2, 15.3, 0, 5);
flDesk(T, X - 40, 18.4, 0, { w: 2, col: FLC.oak });
for (var tr = 0; tr < 4; tr++)
for (var tc = 0; tc < 5; tc++)
flChair(T, X - 48 + tc * 4, 22 + tr * 4, Math.PI, FLC.sky);
flSign(T, ["PREPARING TO FOSTER", "a short course for new carers"], 4.4, 1, X - 40, 3.6, 15.35, 0, dk, lt);
flSpot({ x: X - 40, z: 21, r: 3, name: "The course for new carers", verb: "read the course notes", fn: flCourse });
flStaff({ title: "Fostering and adoption officer", x: X - 38, z: 17.6, ry: 0, seed: "fosterofficer", talk: "officer" });
var HS = flWing(G, "study", X + 20, X + 45, 15, 40);
flRoom(HS, X + 20, X + 45, 15, 40, { name: "the home study room", h: 4.2, wall: mButter, floor: mCarpet, where: "fam", skip: ["s", "w"], gaps: [{ s: "w", c: 28, w: 2.4 }, { s: "e", c: 22, w: 2 }] });
flPlace("study", X + 32, 28, "The home study room");
flRectTable(HS, X + 32, 27, 4, 1.6, 0, { cloth: false, top: FLC.oak });
for (var hs = 0; hs < 3; hs++) {
flChair(HS, X + 30.8 + hs * 1.2, 25.8, 0, FLC.sage);
flChair(HS, X + 30.8 + hs * 1.2, 28.2, Math.PI, FLC.sage);
}
flFiling(HS, X + 44.4, 20, -Math.PI / 2, 2);
flPlant(HS, X + 22, 38, "palm", 1);
flWindow(HS, X + 44.8, 2.4, 32, -Math.PI / 2, 1.8, 1.6);
flSpot({ x: X + 32, z: 30, r: 3, name: "The home study: will your home and your money take a child?", verb: "start the home study", fn: function () { fwOpen("fam", "study"); } });
flStaff({ title: "Social worker", x: X + 33, z: 25, ry: 0, seed: "sw5", talk: "study" });
var D = flWing(G, "director", X + 45, X + 70, 15, 40);
flRoom(D, X + 45, X + 70, 15, 40, { name: "the director's office", h: 4.2, wall: mSage, floor: mCarpet, where: "fam", skip: ["s", "w"], gate: "fstaff", gaps: [{ s: "w", c: 22, w: 2 }] });
flDesk(D, X + 57, 22, 0, { w: 2.6, col: FLC.walnut });
flBossChair(D, X + 57, 20.6, 0, FLC.velvet);
flBookcase(D, X + 69.6, 28, -Math.PI / 2, 3, 2.4);
flSofa(D, X + 57, 36, Math.PI, FLC.sage, 2.6);
flCoffeeTable(D, X + 57, 34.5, 0);
flArmchair(D, X + 52, 34, Math.PI / 2, FLC.sky);
flSign(D, ["DIRECTOR OF FAMILY SERVICES"], 3.6, 0.5, X + 57, 3, 15.35, 0, dk, lt);
flStaff({ title: "Director of Family Services", x: X + 57, z: 20.8, ry: 0, seed: "director", talk: "director" });
var CR = flWing(G, "common", X - 20, X + 20, -15, 15);
flRoom(CR, X - 20, X + 20, -15, 15, { name: "the common room", h: 4.6, wall: mButter, floor: mOak, where: "fam", skip: ["s"],
gaps: [{ s: "s", c: X, w: 4, h: 3.4 }, { s: "w", c: 0, w: 2.6 }, { s: "e", c: 0, w: 2.6 }, { s: "n", c: X, w: 3, h: 3 }] });
flPlace("common", X, 0, "The common room");
flSofa(CR, X - 8, -10, 0, FLC.sage, 3);
flSofa(CR, X - 12, -6, Math.PI / 2, FLC.sky, 2.4);
flCoffeeTable(CR, X - 8, -8, 0);
flTV(CR, X - 8, 1.8, -14.75, 0, 2.2);
flRug(CR, X - 8, -7, 6, 5, 0, FLC.butter, FLC.sage);
[[X + 6, -9, FLC.pink], [X + 8, -7, FLC.sky], [X + 10, -9, FLC.butter]].forEach(function (q) { flBeanbag(CR, q[0], q[1], q[2]); });
flBookcase(CR, X + 19.6, -8, -Math.PI / 2, 3, 1.8);
flBookcase(CR, X - 19.6, 8, Math.PI / 2, 3, 1.8);
flKidTable(CR, X + 8, 6, 0, 4);
flKidTable(CR, X - 6, 8, 0, 4);
flPiano(CR, X + 15, 11, Math.PI);
flWindow(CR, X - 10, 2.2, 14.75, Math.PI, 2, 1.6);
flWindow(CR, X + 10, 2.2, 14.75, Math.PI, 2, 1.6);
var DH = flWing(G, "dining", X - 60, X - 20, -15, 15);
flRoom(DH, X - 60, X - 20, -15, 15, { name: "the dining hall and kitchen", h: 4.6, wall: mWarm, floor: mLino, where: "fam", skip: ["s", "e"], gaps: [{ s: "e", c: 0, w: 2.6 }, { s: "n", c: X - 40, w: 2.4 }] });
flPlace("dining", X - 40, 0, "The dining hall");
for (var dt = 0; dt < 3; dt++) {
flRectTable(DH, X - 46, -4 + dt * 6, 5, 1.2, 0, { cloth: false, top: FLC.pine });
for (var ds = 0; ds < 4; ds++) {
flChair(DH, X - 48 + ds * 1.3, -4.9 + dt * 6, 0, [FLC.sky, FLC.butter, FLC.sage, FLC.pink][ds]);
flChair(DH, X - 48 + ds * 1.3, -3.1 + dt * 6, Math.PI, [FLC.pink, FLC.sage, FLC.butter, FLC.sky][ds]);
}
}
flKitchenRun(DH, X - 30, -14.4, 10, 0);
flStove(DH, X - 27, -11, 0);
flFridge(DH, X - 21, -12, -Math.PI / 2);
flIsland(DH, X - 30, -6, 4, 1.2, 0);
flCounter(DH, X - 30, 4, 6, Math.PI, { col: FLC.oak });
flSign(DH, ["THE KITCHEN"], 2.4, 0.5, X - 30, 3, -14.7, 0, dk, lt);
flStaff({ title: "Cook", x: X - 30, z: -12.6, ry: 0, seed: "fcook", talk: "cook" });
flSpot({ x: X - 30, z: 6, r: 2.6, name: "The serving hatch", verb: "see what is for tea", fn: function () { setStatus("<b>Tonight at Hearthside:</b> shepherd's pie, peas and gravy, and apple crumble with custard. The cook keeps a plate warm for anyone late back from school."); } });
var PR = flWing(G, "playroom", X + 20, X + 70, -15, 15);
flRoom(PR, X + 20, X + 70, -15, 15, { name: "the playroom", h: 4.6, wall: mSky, floor: mPlay, ftile: 4, where: "fam", skip: ["s", "w"], gaps: [{ s: "w", c: 0, w: 2.6 }, { s: "e", c: 0, w: 3, h: 3 }] });
flPlace("playroom", X + 45, 0, "The playroom");
flRug(PR, X + 30, -6, 6, 5, 0, FLC.butter, FLC.sky);
flBlocks(PR, X + 29, -6);
flBlocks(PR, X + 31, -5);
flToyBox(PR, X + 26, -13.6, 0);
flToyBox(PR, X + 34, -13.6, 0);
var pk = flPiece(PR, X + 42, -13.8, 0);
flBox(1.6, 0.8, 0.5, flM(FLC.pink), 0, 0.4, 0, pk);
flBox(1.6, 0.04, 0.5, flM(0xD0CAC0), 0, 0.82, 0, pk);
flCyl(0.1, 0.1, 0.02, flM(0x2A2A2A), -0.4, 0.84, 0, pk, 10);
flCyl(0.1, 0.1, 0.02, flM(0x2A2A2A), 0, 0.84, 0, pk, 10);
flSolid(X + 42, -13.8, 0.8, 0.3, 0, 0.9);
var dh = flPiece(PR, X + 50, -13.6, 0);
flBox(1.4, 1.2, 0.6, flM(0xD8CCA0), 0, 0.6, 0, dh);
var rf = flBox(1.5, 0.08, 0.7, flM(0xB86A5A), 0, 1.4, 0, dh);
rf.rotation.z = 0;
flBox(0.3, 0.3, 0.02, flM(0x8AA8C4), -0.35, 0.8, 0.31, dh);
flBox(0.3, 0.3, 0.02, flM(0x8AA8C4), 0.35, 0.8, 0.31, dh);
flSolid(X + 50, -13.6, 0.75, 0.35, 0, 1.4);
flBookcase(PR, X + 69.6, -10, -Math.PI / 2, 2.4, 1.4);
flBeanbag(PR, X + 66, -10, FLC.sage);
flBeanbag(PR, X + 66, -7, FLC.pink);
var es = flPiece(PR, X + 58, -12, 0.3);
flBox(0.8, 1.0, 0.04, flM(0xD8D0C2), 0, 1.2, 0, es);
flBox(0.04, 1.6, 0.04, flM(FLC.pine), -0.35, 0.8, 0.2, es);
flBox(0.04, 1.6, 0.04, flM(FLC.pine), 0.35, 0.8, 0.2, es);
flBox(8, 0.6, 6, flM(FLC.sky), X + 44, 0.3, 10, PR);
flBox(7.6, 0.02, 5.6, flM(FLC.butter), X + 44, 0.61, 10, PR);
FL.pads.push({ x0: X + 40, x1: X + 48, z0: 7, z1: 13, h: 0.6 });
flRamp(X + 40, X + 48, 5, 7, 0, 0.6, "z");
for (var bb = 0; bb < (FL.lite ? 6 : 16); bb++)
flSph(0.14, flM([FLC.sky, FLC.butter, FLC.pink, FLC.sage][bb % 4]), X + 41 + (bb % 8) * 0.8, 0.75, 8 + (bb >> 3) * 2.4, PR, 6);
flStaff({ title: "Play worker", x: X + 36, z: -4, ry: 0, seed: "playworker", talk: "play", wander: 6 });
flWindow(PR, X + 30, 2.2, 14.75, Math.PI, 2, 1.6);
flWindow(PR, X + 58, 2.2, 14.75, Math.PI, 2, 1.6);
var HW = flWing(G, "homework", X - 60, X - 20, -45, -15);
flRoom(HW, X - 60, X - 20, -45, -15, { name: "the homework room", h: 4.2, wall: mSage, floor: mCarpet, where: "fam", skip: ["s"], gaps: [{ s: "s", c: X - 40, w: 2.4 }, { s: "e", c: -30, w: 2.4 }] });
for (var hr = 0; hr < 3; hr++)
for (var hc = 0; hc < 3; hc++)
flKidTable(HW, X - 52 + hc * 8, -38 + hr * 7, 0, 4);
flWhiteboard(HW, X - 40, 2, -44.7, 0, 4);
flBookcase(HW, X - 59.6, -30, Math.PI / 2, 4, 2);
for (var cp = 0; cp < 3; cp++) {
flDesk(HW, X - 22, -40 + cp * 4, -Math.PI / 2, { w: 1.6, col: FLC.oak });
flComputer(HW, X - 21.8, 0.84, -40 + cp * 4, -Math.PI / 2);
}
flStaff({ title: "Homework tutor", x: X - 40, z: -43, ry: 0, seed: "tutor", talk: "tutor" });
var BR = flWing(G, "bedrooms", X - 20, X + 20, -45, -15);
flRoom(BR, X - 20, X + 20, -45, -15, { name: "the children's bedrooms", h: 4, wall: mButter, floor: mCarpet, where: "fam", skip: ["s", "w"], gate: "fstaff", gaps: [{ s: "s", c: X, w: 3, h: 3 }, { s: "w", c: -30, w: 2.4 }, { s: "e", c: -30, w: 2.4 }] });
[[X - 20, X - 3], [X + 3, X + 20]].forEach(function (side, si) {
for (var b = 0; b < 3; b++) {
var z0 = -45 + b * 10, zc = z0 + 5, wx = si ? X + 3 : X - 3;
if (b < 2) {
flBox(17, 4, 0.15, mButter, (side[0] + side[1]) / 2, 2, z0 + 10, BR);
flSolid((side[0] + side[1]) / 2, z0 + 10, 8.5, 0.08);
}
flBox(0.15, 4, 8, mButter, wx, 2, zc - 1, BR);
flSolid(wx, zc - 1, 0.08, 4);
if (b === 0 && si === 0) {
flCrib(BR, X - 17, -42, 0);
flCrib(BR, X - 14, -42, 0);
flToyBox(BR, X - 9, -43.6, 0);
}
else if ((b + si) % 2) {
flBunk(BR, (si ? X + 17 : X - 17), zc - 1, si ? -Math.PI / 2 : Math.PI / 2);
flKidBed(BR, (si ? X + 13 : X - 13), zc - 2.5, 0, [FLC.sky, FLC.butter, FLC.sage][b]);
}
else {
flKidBed(BR, (si ? X + 17 : X - 17), zc - 2.5, 0, [FLC.pink, FLC.sage, FLC.sky][b]);
flKidBed(BR, (si ? X + 13 : X - 13), zc - 2.5, 0, [FLC.butter, FLC.pink, FLC.sky][b]);
}
flWardrobe(BR, (si ? X + 19.6 : X - 19.6), zc + 3, si ? -Math.PI / 2 : Math.PI / 2, 1.2);
flRug(BR, (si ? X + 14 : X - 14), zc + 1, 3, 2, 0, [FLC.sky, FLC.butter, FLC.pink][b], FLC.sage);
}
});
flStaff({ title: "House parent", x: X, z: -30, ry: 0, seed: "hp2", wander: 8 });
flStaff({ title: "House parent", x: X + 1, z: -20, ry: Math.PI, seed: "hp3" });
var NB = flWing(G, "nurse", X + 20, X + 70, -45, -15);
flRoom(NB, X + 20, X + 70, -45, -15, { name: "the bathrooms and the nurse's room", h: 4, wall: mTile, floor: mTile, where: "fam", skip: ["s", "w"], gate: "fstaff", gaps: [{ s: "w", c: -30, w: 2.4 }], trim: false });
flBox(0.15, 4, 30, mTile, X + 45, 2, -30, NB);
flSolid(X + 45, -34, 0.08, 11);
flSolid(X + 45, -19.5, 0.08, 4.5);
for (var bt = 0; bt < 3; bt++) {
flBath(NB, X + 24 + bt * 5, -41, 0);
}
for (var sk = 0; sk < 2; sk++)
flBasin(NB, X + 28 + sk * 6, -16, Math.PI, 2);
flStall(NB, X + 40, -42, 0);
flStall(NB, X + 42, -42, 0);
flKidBed(NB, X + 52, -40, 0, 0xD8D0C2);
flKidBed(NB, X + 56, -40, 0, 0xD8D0C2);
flDesk(NB, X + 64, -24, -Math.PI / 2, { w: 1.8, col: 0xD0CAC0 });
flCabinet(NB, X + 69.6, -36, -Math.PI / 2, 1.6, 1.8, 0xD0CAC0);
flSign(NB, ["THE NURSE"], 2, 0.5, X + 57, 3, -44.7, 0, dk, lt);
flStaff({ title: "Children's nurse", x: X + 62, z: -24, ry: Math.PI / 2, seed: "cnurse", talk: "nurse" });
flStaff({ title: "Housekeeper", x: X + 30, z: -30, ry: 0, seed: "fkeep", wander: 5 });
var PG = flWing(G, "playground", X + 70, X + 115, -45, 60);
flRoom(PG, X + 70, X + 115, -45, 60, { name: "the playground", h: 2.2, wall: mBrick, floor: flM(0x7A9A60, { map: "lawn" }), ftile: 4, where: "fam", out: true, trim: false, skip: ["w"], gaps: [{ s: "w", c: 0, w: 3, h: 3 }] });
flPlace("playground", X + 92, 0, "The playground");
flTBox(0.12, 4.6, 43.5, mBrick, X + 70.22, 2.3, -23.25, PG, 3);
flTBox(0.12, 4.6, 58.5, mBrick, X + 70.22, 2.3, 30.75, PG, 3);
flTBox(0.12, 1.6, 3, mBrick, X + 70.22, 3.8, 0, PG, 3);
flPlane(30, 22, flM(0x6A6A70, { map: "stone" }), X + 92, 0.02, 0, PG, 3);
flSwings(PG, X + 84, -30, 0);
flSlide(PG, X + 100, -30, 0);
flClimber(PG, X + 92, -16);
flSandpit(PG, X + 80, -6, 4);
flRoundabout(PG, X + 104, -8);
flBench(PG, X + 76, 8, Math.PI / 2, 2);
flBench(PG, X + 76, 18, Math.PI / 2, 2);
for (var hp = 0; hp < 8; hp++)
flBox(0.9, 0.01, 0.9, flM(0x9A968E), X + 90 + (hp % 3 === 1 ? 0.5 : 0) * (hp % 2 ? 1 : -1), 0.03, 4 - hp * 1.0, PG);
var goal = flPiece(PG, X + 108, 8, -Math.PI / 2), gw = flM(0xA8A296);
flBox(0.1, 2, 0.1, gw, -2.5, 1, 0, goal);
flBox(0.1, 2, 0.1, gw, 2.5, 1, 0, goal);
flBox(5.1, 0.1, 0.1, gw, 0, 2, 0, goal);
for (var vg = 0; vg < 4; vg++) {
flBox(6, 0.3, 1.2, flM(0x5A4632), X + 92, 0.15, 30 + vg * 2, PG);
if (!FL.lite)
for (var vp = 0; vp < 8; vp++)
flSph(0.18, flM(0x4A7A3A), X + 89.4 + vp * 0.75, 0.4, 30 + vg * 2, PG, 5);
}
[[X + 75, -40], [X + 110, -40], [X + 75, 50], [X + 110, 50], [X + 110, 25]].forEach(function (q) { flTree(PG, q[0], q[1], 1.1); });
flStaff({ title: "Play worker", x: X + 90, z: -10, ry: 0, seed: "playworker2", wander: 10 });
},
function () {
worldCard(worldFacts("Preparing to foster", "The course for new carers", [
["Who can foster", "Grown-ups of 21 and over, single or married, whose dues are paid"],
["A bedroom", "Each child has a bedroom of their own; a baby or toddler can have the nursery"],
["Paying the way", "What you earn in two weeks must cover your rent, your bills, the keep of the children you have and the new child's keep"],
["The keep", "140 gold every two weeks for under-fives, 120 for 5 to 11, 160 for 12 to 17: food, clothes, school things"],
["Fostering", "Free. Care for the child (a meal, a story, homework, a game) at least every few days"],
["Adopting", "300 gold in court fees after fostering a week, or 500 to adopt straight away. Adoption is for good"],
["If things go wrong", "Unpaid keep (14 days past its date), no room, or no care: a letter first, then the child comes back here, safe"]
], ["The home study room, past the hall on the right, checks all of this for you before any child goes home."], ""), {});
},
function (f) {
var at = /Hearthside|Family Services|Registry/.test(f.persona) ? "Hearthside Family House" : "the Everbloom Wedding House";
return "You are " + f.name + ", " + f.persona + " Stay in character, keep replies short and kind, and never be crude. Never invent private facts about real players. " +
"If someone asks for something you cannot do, say who can or where in the game it is (" + at + ").";
},
function (title, fam) {
return fam ? "You are a member of staff at Hearthside Family House, Somnucor Family Services and the children's home: your post is " + title + ". You are kind, protective of the children, and know the house (the lobby, the home study room, the visiting room, the Registry Office, the children's wing and the playground). Keep replies short." :
"You are a member of staff at the Everbloom Wedding House in Somnucor: your post is " + title + ". You are friendly and proud of the house (the Chapel, the Garden, the Rose Room, the Grand Hall, the Ring Counter, the Bridal Boutique). Keep replies short.";
},
function (s, f) {
var by = { planner: "Congratulations! Shall we look at dates?", wreception: "Welcome to the Everbloom. Are you here for a wedding?", jeweller: "Come and look: the light catches them beautifully.",
consultant: "Hello! Gown, suit, or just dreaming today?", wflorist: "Smell these peonies. Aren't they something?", officiant: "Welcome. Take your time: this is a happy place.",
organist: "The Old Lady is in fine voice today.", photographer: "Don't mind me! Just be yourselves.", band: "Evening! Any requests for the first dance?", wbar: "What can I get you?",
maitred: "Good evening. May I show you to your table?", chef: "Mind the hot trays!", baker: "Lemon sponge today. Want a taste?", hair: "Sit down, breathe. You look wonderful already.",
wmanager: "Welcome. I hope everything is just right.", wgarden: "The roses on the arch are at their best this week.",
freception: "Hello, welcome to Hearthside. Are you thinking of fostering or adopting?", social: "Hello. How can I help?", study: "Shall we see whether your home is ready for a child?",
officer: "New carers' course starts whenever you're ready.", counsellor: "Hello. Come in, sit down.", registrar: "Good day. The register is open.", director: "Good afternoon. The children come first, here.",
houseparent: "Shh, the little ones are napping. Hello!", cook: "Hungry? There's always something in the oven.", play: "Want to join the game?", tutor: "Homework time! Who's stuck?", nurse: "Hello. Anyone poorly?" };
return (s.talk && by[s.talk]) || ("Hello. How can I help?");
},
function () {
FL.people = [];
FL.talk = [];
var lite = FL.lite;
FL.staffAt.forEach(function (s, i) {
if (lite && !s.talk && i % 2 === 1)
return;
try {
var f = s.talk && FL_FOLK[s.talk], fam = s.x > FL_FX * 0.5, g = wPerson("fl_" + s.seed, { title: s.title, place: fam ? FL_FAM : FL_WED, sex: f ? f.sex : undefined });
g.position.set(s.x, s.y || 0, s.z);
g.rotation.y = s.ry || 0;
var W = flWingAt(s.x, s.z);
(W ? W.g : FL.G).add(g);
var nm = flStaffName(s);
try {
var tg = makeTag(nm + " · " + s.title, false);
tg.position.y = 2.05;
g.add(tg);
}
catch (e) { }
var P = { g: g, title: s.title, x: s.x, z: s.z, y: s.y || 0, wander: s.wander ? { r: s.wander, sp: 0.8 } : null };
FL.people.push(P);
FL.talk.push({ p: P, name: nm, title: s.title, t: { name: nm, persona: f ? flPersona(f) : flGenericPersona(s.title, fam), greet: flGreet(s, f) } });
}
catch (e) {
if (window.console)
console.warn("[family] staff", e);
}
});
var R = wRand(4242), wi = 0;
var seats = lite ? [[-62, 24], [-42, 33]] : [[-62, 24], [-52, 24], [-42, 33], [-32, 24], [-52, 33]];
seats.forEach(function (q) {
for (var k = 0; k < (lite ? 2 : 4); k++) {
var a = k / 4 * 6.283 + 0.4, x = q[0] + Math.sin(a) * 1.5, z = q[1] + Math.cos(a) * 1.5;
try {
var g = wPerson("fl_guest" + (wi++), {});
g.position.set(x, 0.08, z);
g.rotation.y = a + Math.PI;
g.userData.seated = true;
g.userData.pose = "sit";
var W = flWingAt(x, z);
(W ? W.g : FL.G).add(g);
FL.people.push({ g: g, x: x, z: z, seated: true });
}
catch (e) { }
}
});
[[0, 50, 8], [0, 20, 10], [42, 5, 14], [-45, 15, 12], [35, 50, 6], [FL_FX, 50, 8], [FL_FX, 28, 8], [FL_FX + 45, 0, 10]].forEach(function (q) {
var n = lite ? 1 : 2;
for (var k = 0; k < n; k++) {
var x = q[0] + (R() - 0.5) * q[2], z = q[1] + (R() - 0.5) * q[2];
if (worldSolidAt(FL.solids, x, z, 0))
continue;
try {
var g = wPerson("fl_walk" + (wi++), {});
g.position.set(x, 0, z);
g.rotation.y = R() * 6.28;
var W = flWingAt(x, z);
(W ? W.g : FL.G).add(g);
FL.people.push({ g: g, x: x, z: z, wander: { r: q[2] * 0.6, sp: 0.7 } });
}
catch (e) { }
}
});
},
function (seed, c) {
var age = +c.age || 8, teen = age >= 13;
var g = wPerson("kid_" + seed, { child: !teen, sex: c.sex === "f" ? "f" : "m" });
var s = teen ? 0.88 + (age - 13) * 0.025 : age < 2 ? 0.5 : age < 5 ? 0.6 + (age - 2) * 0.04 : 0.72 + (age - 5) * 0.035;
if (!teen)
s = s / 0.78;
g.scale.multiplyScalar(Math.max(0.45, Math.min(1.25, s)));
return g;
},
function () {
if (!FL.built || !FL.G)
return;
var list = ((typeof FW !== "undefined" && FW.fam && FW.fam.waiting) || []).slice(0, FL.lite ? 8 : 16);
var sig = list.map(function (c) { return c.id; }).join(",");
if (sig === FL.kidSig)
return;
FL.kidSig = sig;
FL.kids.forEach(function (k) { if (k.g.parent)
k.g.parent.remove(k.g); var i = FL.talk.indexOf(k.T); if (i >= 0)
FL.talk.splice(i, 1); var j = FL.people.indexOf(k.P); if (j >= 0)
FL.people.splice(j, 1); });
FL.kids = [];
list.forEach(function (c, i) {
try {
var at = FL_KID_SPOTS[i % FL_KID_SPOTS.length], g = flKidFigure(c.id, c);
g.position.set(at[0], 0, at[1]);
g.rotation.y = (i * 1.7) % 6.28;
var W = flWingAt(at[0], at[1]);
(W ? W.g : FL.G).add(g);
var first = String(c.name || "").split(" ")[0];
try {
var tg = makeTag(first + ", " + c.age, false);
tg.position.y = c.age < 5 ? 1.2 : c.age < 13 ? 1.6 : 1.95;
g.add(tg);
}
catch (e) { }
var P = { g: g, x: at[0], z: at[1], wander: { r: c.age < 3 ? 1.5 : 4, sp: c.age < 5 ? 0.6 : 0.9 } };
var T = { p: P, name: first, title: c.age + " years old", kid: c, t: { name: c.name, greet: flKidGreet(c),
persona: "You are " + c.name + ", a child of " + c.age + " living at Hearthside Family House, the children's home in Somnucor, waiting for a family. You are " + c.nature + ". You like " + c.likes + ". " +
"Talk as a " + c.age + "-year-old would: simple words for a little one, more thought for an older child. Be warm and hopeful, and honest that you would like a family one day. " +
"Keep everything gentle and suitable for children. Never talk about anything frightening or grown-up, never ask for personal details, and never promise anything for the grown-ups. " +
"If someone wants to foster or adopt you, say they should ask the people at reception or in the home study room." } };
FL.people.push(P);
FL.talk.push(T);
FL.kids.push({ g: g, T: T, P: P, id: c.id });
}
catch (e) {
if (window.console)
console.warn("[family] child", e);
}
});
},
function (c) {
var f = String(c.name || "").split(" ")[0];
if (c.age < 3)
return "*" + f + " waves a chubby hand and giggles.*";
if (c.age < 7)
return "Hi! I'm " + f + ". I'm " + c.age + ". Do you want to play?";
if (c.age < 13)
return "Oh, hi. I'm " + f + ". Are you visiting?";
return "Hey. I'm " + f + ". You here about fostering?";
},
function (G) {
FL.G = G;
FL.lite = flLite();
FL.built = true;
FL.kidSig = null;
["solids", "walk", "pads", "ramps", "gates", "spots", "talk", "rooms", "wings", "people", "staffAt", "twinkle", "flames", "spin", "screens", "water", "kids", "tvs"].forEach(function (k) { FL[k] = []; });
flBuildWedding(G);
flBuildHearth(G);
FL.wings.forEach(function (W) { try {
if (typeof ppBake === "function")
ppBake(W.g);
}
catch (e) {
if (window.console)
console.warn("[family] bake", W.name, e);
} });
flPeople();
flKidsPaint();
},
function (opt) {
FL.lite = flLite();
FL.t = 0;
FL.guide = null;
FL.room = null;
FL.wingAt = 0;
var at = opt && opt.at === "fam" ? "fam" : "wed", A = FL_ARRIVE[at];
FL.where = at;
flPut(A.x, A.z, A.yaw);
if (typeof loadThings === "function")
try {
loadThings();
}
catch (e) { }
fwLoad(true).then(function () { flScreensAll(); flKidsPaint(); });
if (at === "fam")
setStatus("<b>Hearthside Family House.</b> Reception is straight ahead; the visiting room and the Registry Office to the right; the children's wing through the hall. The children waiting here would love to meet you.");
else
setStatus("<b>Welcome to the Everbloom Wedding House.</b> The Chapel is straight ahead, the Grand Hall off its left side and the Garden off its right. The Ring Counter is to your left, the Bridal Boutique to your right, and the planners' desk will book your day.");
if (typeof playTone === "function") {
setTimeout(function () { playTone(523, 0.3); }, 250);
setTimeout(function () { playTone(659, 0.3); }, 520);
setTimeout(function () { playTone(784, 0.45); }, 790);
}
},
function (dt) {
FL.t += dt;
var t = FL.t, L = worldLocal(), feet = camera.position.y - 1.72;
FL.where = L.x > FL_FX * 0.5 ? "fam" : "wed";
var R = flRoomAt(L.x, L.z);
if (R !== FL.room) {
FL.room = R;
if (typeof worldEnv === "function")
try {
worldEnv(flEnv());
}
catch (e) { }
}
FL.wingAt -= dt;
if (FL.wingAt <= 0) {
FL.wingAt = 0.3;
var far = FL.lite ? 40 : 56;
FL.wings.forEach(function (W) { var dx = Math.max(W.x0 - L.x, 0, L.x - W.x1), dz = Math.max(W.z0 - L.z, 0, L.z - W.z1); W.g.visible = Math.hypot(dx, dz) < far; });
}
for (var i = 0; i < FL.twinkle.length; i++) {
var tw = FL.twinkle[i], s = 0.5 + 0.5 * Math.sin(t * tw.sp + tw.ph);
tw.m.material.opacity = tw.max * s * s * s;
}
for (var f = 0; f < FL.flames.length; f++) {
var fl = FL.flames[f], k = 1 + 0.07 * Math.sin(t * 2.4 + fl.ph) + 0.04 * Math.sin(t * 3.7 + fl.ph * 2);
fl.m.scale.set(k, k * (fl.big ? 1.15 : 1.25), k);
}
for (var w = 0; w < FL.water.length; w++) {
var wa = FL.water[w];
wa.m.material.opacity = 0.18 + 0.05 * Math.sin(t * 0.8 + wa.ph);
wa.m.rotation.y += dt * 0.15;
}
for (var p = 0; p < FL.spin.length; p++) {
var sp = FL.spin[p];
if (sp.m)
sp.m.rotation[sp.ax || "y"] += dt * sp.sp;
}
flFiguresTick(dt, L);
FL.scrAt = (FL.scrAt || 0) - dt;
if (FL.scrAt <= 0) {
FL.scrAt = 3;
flScreensAll();
}
FL.slow = (FL.slow || 0) - dt;
if (FL.slow <= 0) {
FL.slow = 40;
fwLoad(false).then(function () { flKidsPaint(); });
}
var s = null, sd = 1e9;
for (var j = 0; j < FL.spots.length; j++) {
var q = FL.spots[j], qy = q.y || 0;
if (Math.abs(feet - qy) > 2.6)
continue;
var d = (L.x - q.x) * (L.x - q.x) + (L.z - q.z) * (L.z - q.z);
if (d < q.r * q.r && d < sd) {
sd = d;
s = q;
}
}
var tk = null, td = 1e9;
for (var m = 0; m < FL.talk.length; m++) {
var T = FL.talk[m], g = T.p.g;
if (!g.visible && !T.p.near)
continue;
var d2 = (L.x - g.position.x) * (L.x - g.position.x) + (L.z - g.position.z) * (L.z - g.position.z);
if (d2 < 3.2 * 3.2 && d2 < td) {
td = d2;
tk = T;
}
}
if (s && (!tk || sd <= td + 1))
worldPrompt("<b>" + esc(s.name) + "</b> · <b>press E</b>" + (s.verb ? " to " + esc(s.verb) : ""), s.fn);
else if (tk)
worldPrompt("<b>" + esc(tk.name) + "</b>, " + esc(tk.title) + " · <b>press E</b> to talk", function () { flTalk(tk); });
else
worldPrompt(null);
flBannerTick(L);
},
function (dt, L) {
FL.figAt = (FL.figAt || 0) - dt;
var cull = FL.figAt <= 0;
if (cull)
FL.figAt = 0.5;
var far = FL.lite ? 26 : 44;
FL.people.forEach(function (P) {
if (cull) {
var gx = P.g.position.x, gz = P.g.position.z;
P.near = Math.hypot(gx - L.x, gz - L.z) < far;
P.g.visible = P.near && !P.away;
}
if (P.near && P.wander)
wWander(P.g, dt, function (x, z) { return flGround(x, z, 0); }, { r: P.wander.r, sp: P.wander.sp || 0.8 });
});
},
function (L) {
var R = FL.room, fam = FL.where === "fam";
var h = "<b style='color:#F0DEB0'>" + (fam ? "👪 Hearthside Family House" : "💍 The Everbloom Wedding House") + "</b>" + (R && R.name ? " · " + esc(R.name.replace(/^the /, "The ")) : "");
var G = FL.guide;
if (G) {
var dx = G.x - L.x, dz = G.z - L.z, d = Math.hypot(dx, dz);
if (d < 4) {
FL.guide = null;
setStatus("<b>" + esc(G.name) + "</b> is right here.");
}
else {
var fx = -Math.sin(yaw), fz = -Math.cos(yaw), ang = Math.atan2(fx * dz - fz * dx, fx * dx + fz * dz);
var arrows = ["⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️"], idx = ((Math.round(ang / (Math.PI / 4)) % 8) + 8) % 8;
h += "<div style='font-size:15px'>" + arrows[idx] + " <b>" + esc(G.name) + "</b> · " + Math.round(d) + " m</div>";
}
}
worldBanner(h);
},
function (tab, sub) {
FW.open = true;
if (tab)
FW.tab = tab;
FW.sub = sub || null;
FW.say = "";
if (!flSigned()) {
FW.say = "Sign in first: marriage and families belong to dreamers with a place in Somnucor.";
fwPaint();
return;
}
fwPaint();
fwLoad(true);
if (typeof pfLoad === "function")
pfLoad(false).then(function () { if (FW.open)
fwPaint(); });
},
function (name, body, after) {
if (FW.acting)
return;
FW.acting = true;
FW.say = "…";
fwPaint();
return cityRpc(name, body).then(function (o) { FW.say = esc((o && o.say) || "Done."); if (o && o.study)
FW.study = o.study; if (after)
after(o); if (o && o.ok !== false && typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { } })
.catch(function (e) { FW.say = esc(fwErr(e)); }).then(function () { FW.acting = false; return fwLoad(true); }).then(function () { fwPaint(); });
},
function (act, label, o) {
o = o || {};
return "<button class='btn' data-fw='" + act + "'" + (o.id != null ? " data-id='" + esc(String(o.id)) + "'" : "") + (o.k != null ? " data-k='" + esc(String(o.k)) + "'" : "") +
(o.on ? " style='border-color:#C9A868;background:rgba(201,168,104,.22)'" : "") + (o.off ? " disabled style='opacity:.5'" : "") + ">" + label + "</button> ";
},
function () {
var h = "<div style='display:flex;align-items:center;gap:8px;margin-bottom:6px'><div style='font:600 18px var(--serif,Georgia);color:#F0DEB0;flex:1'>💍 Family</div>" + fwB("x", "✕ Close") + "</div>";
h += "<div>" + fwB("tab", "💍 Marriage", { k: "wed", on: FW.tab === "wed" }) + fwB("tab", "👪 Children", { k: "fam", on: FW.tab === "fam" }) + "</div>";
if (FW.say)
h += "<div style='margin:8px 0;padding:6px 9px;border:1px solid rgba(201,168,104,.5);border-radius:4px;color:#F4E6C0'>" + FW.say + "</div>";
if (!flSigned())
return h;
if (FW.missing && !FW.wed)
return h + fwDim("Marriage, weddings, fostering and adoption open soon. The Everbloom Wedding House and Hearthside Family House are open to look round now.") + fwB("goW", "💍 Visit the Everbloom") + fwB("goF", "👪 Visit Hearthside");
return h + (FW.tab === "fam" ? fwFamHtml() : fwWedHtml());
},
function () {
var W = FW.wed;
if (!W)
return fwDim("Reading the register…");
var h = "";
if (W.status === "single") {
if (W.may !== "ok")
return fwDim(esc(W.may)) + fwB("goW", "💍 Visit the Everbloom");
(W.asked || []).forEach(function (p) {
h += fwHead("💌 " + esc(p.name) + " has asked you to marry them") + (p.ring ? fwDim("With a " + esc(String(p.ring).toLowerCase()) + ".") : "") + (p.words ? fwDim("“" + esc(p.words) + "”") : "") +
fwB("yes", "💍 Yes!", { id: p.id }) + fwB("no", "Gently say no", { id: p.id });
});
(W.asking || []).forEach(function (p) { h += fwHead("You have asked " + esc(p.name)) + fwDim("Their answer comes to your phone.") + fwB("withdraw", "Take the question back", { id: p.id }); });
var fr = fwFriends();
h += fwHead("Propose");
h += fwDim("Ask one of your friends to marry you. Both of you must be grown-ups (18 and over) with your dues paid. A ring from the Ring Counter is lovely but not needed: it passes to them if they say yes.");
var rings = fwRings();
if (rings.length) {
h += "<div>" + fwB("ring", "No ring", { k: "", on: !FW.pick.ring });
var seen = {};
rings.forEach(function (r) { if (seen[r.archetype])
return; seen[r.archetype] = 1; h += fwB("ring", "💍 " + esc(r.name), { k: r.archetype, on: FW.pick.ring === r.archetype }); });
h += "</div>";
}
else
h += fwDim("No ring in your backpack yet: the Ring Counter at the Everbloom has them.");
h += "<input id='fw-words' maxlength='300' placeholder='A few words, if you like (optional)' style='width:100%;box-sizing:border-box;margin:6px 0;padding:7px;background:rgba(255,255,255,.06);color:inherit;border:1px solid rgba(201,168,104,.4);border-radius:4px' value='" + esc(FW.words || "") + "'>";
if (!fr.length)
h += fwDim("Add friends on your phone first (📱 Phone, Friends); then they appear here.");
fr.forEach(function (f) { h += fwB("propose", "💍 Ask " + esc(f.name || "a friend"), { id: f.id }); });
h += fwHead("Weddings you are invited to");
}
else if (W.status === "engaged") {
h += fwHead("💍 Engaged to " + esc(W.partner_name || "your love")) + fwDim("Since " + fwWhen(W.engaged_at) + (W.ring ? ". The ring: " + esc(W.ring) : "") + ".");
var bk = (W.bookings || [])[0];
if (bk && W.book2 && typeof fwBookedHtml === "function") {
h += fwBookedHtml(W, bk);
}
else if (bk) {
var v = (W.venues || []).filter(function (x) { return x.k === bk.venue; })[0] || { n: bk.venue };
h += fwHead(FW_VENUE_ICON[bk.venue] + " Your wedding: " + esc(v.n)) + fwDim(fwWhen(bk.starts_at) + " · " + esc(((W.packages || []).filter(function (p) { return p.k === bk.package; })[0] || {}).n || bk.package) +
(bk.guests && bk.guests.length ? " · guests: " + esc(bk.guests.join(", ")) : "") + ". On the day both of you come to " + esc(v.where || "the venue") + " (the doors open half an hour before) and each says I do at the altar, the arch or the registrar's desk.");
var said = bk.vows && Object.keys(bk.vows).length;
h += fwB("vow", "💍 Say “I do”", { id: bk.id }) + fwB("goVenue", "➡️ Go to the venue", { k: bk.venue }) + fwB("cancel", "Cancel the booking (half back)", { id: bk.id });
if (said)
h += fwDim("“I do” has been said by " + said + " of you.");
}
else if (W.book2 && typeof WDG_TIERS !== "undefined") {
h += fwBook2Html(W);
}
else {
h += fwHead("Book the wedding");
h += "<div>" + (W.venues || []).map(function (v) { return fwB("venue", FW_VENUE_ICON[v.k] + " " + esc(v.n), { k: v.k, on: FW.pick.venue === v.k }); }).join("") + "</div>";
var vv = (W.venues || []).filter(function (x) { return x.k === FW.pick.venue; })[0];
if (vv)
h += fwDim(esc(vv.note));
h += "<div>" + (W.packages || []).map(function (p) { return fwB("pkg", esc(p.n) + " · " + (p.price[FW.pick.venue] + W.licence) + " gold", { k: p.k, on: FW.pick.pkg === p.k }); }).join("") + "</div>";
var pk = (W.packages || []).filter(function (x) { return x.k === FW.pick.pkg; })[0];
if (pk)
h += fwDim(esc(pk.note) + " Up to " + pk.guests + " guests. The price includes the 60-gold licence.");
h += "<div>" + FW_WHEN.map(function (w, i) { return fwB("when", w[0], { k: i, on: FW.pick.when === i }); }).join("") + "</div>";
var fr2 = fwFriends();
if (fr2.length) {
h += fwDim("Guests (they get an invitation by post and on their phone):");
h += "<div>" + fr2.filter(function (f) { return f.id !== W.partner; }).map(function (f) { return fwB("guest", (FW.pick.guests.indexOf(f.id) >= 0 ? "✓ " : "") + esc(f.name || "a friend"), { id: f.id, on: FW.pick.guests.indexOf(f.id) >= 0 }); }).join("") + "</div>";
}
h += fwB("book", "📅 Book it");
}
h += fwB("end", "Break off the engagement");
}
else if (W.status === "married") {
h += fwHead("💞 Married to " + esc(W.partner_name || "your love")) + fwDim("Since " + fwWhen(W.married_at) + (W.venue ? ", at " + esc(((W.venues || []).filter(function (v) { return v.k === W.venue; })[0] || { n: W.venue }).n) : "") + ".");
var hm = W.home || {};
h += fwDim(hm.lot ? "Your home together: <b>" + esc(hm.name || "your home") + "</b>. Its door opens for you both, and you count as family for each other's cars." : "Neither of you has a home yet. The Land Office has homes to rent or buy; once either of you has one, you share it.");
var mine = ((typeof standing !== "undefined" && standing && standing.lots) || []).filter(function (l) { return l.lot_id; });
if (mine.length > 0)
h += mine.slice(0, 4).map(function (l) { return fwB("share", "🏡 Share " + esc(l.lot), { id: l.lot_id }); }).join("");
h += fwB("goF", "🏛️ The Registry Office (divorce)");
}
var inv = W.invited || [];
if (inv.length) {
inv.forEach(function (b) {
var vn = b.venue === "spot" ? ((b.spot && b.spot.name) || "a place of their choosing") : (((W.venues || []).filter(function (v) { return v.k === b.venue; })[0] || { n: b.venue }).n);
h += fwDim("💌 " + esc(b.couple) + ": " + fwWhen(b.starts_at) + " · " + esc(vn) + (b.culture && typeof wdgCulture === "function" ? " · " + esc(wdgCulture(b.culture).n) : "")) + (b.venue === "spot" ? fwB("goSpot", "➡️ Go to the wedding", { id: b.id }) : fwB("goVenue", "➡️ Go to the wedding", { k: b.venue }));
});
}
else if (W.status === "single")
h += fwDim("None just now.");
h += "<div style='margin-top:10px'>" + fwB("goW", "💍 Visit the Everbloom") + fwB("shop", "💍 The Ring Counter") + "</div>";
return h;
},
function () {
var F = FW.fam;
if (!F)
return fwDim("Asking Family Services…");
if (F.ok === false)
return fwDim(esc(F.say || "Not now."));
var h = "", hh = F.house || {}, mo = F.money || {};
h += fwHead("Your home");
h += fwDim(hh.lot ? ("<b>" + esc(hh.name || "Your home") + "</b>: " + hh.bedrooms + " bedroom" + (hh.bedrooms === 1 ? "" : "s") + (hh.nursery ? " and a nursery" : "") + ", " + hh.kids + " child" + (hh.kids === 1 ? "" : "ren") + " at home, " +
(hh.spare > 0 ? hh.spare + " bedroom" + (hh.spare === 1 ? "" : "s") + " free" : "no bedroom free") + (hh.nursery_free ? " (the nursery is free for a little one)" : "") + "." + (hh.spouse_name ? " You share it with " + esc(hh.spouse_name) + "." : "")) :
"You have no home of your own yet. A child needs a bedroom: the Land Office has homes to rent or buy.");
if (!F.keeper)
h += fwDim("The last two weeks" + (mo.two ? " (both of you)" : "") + ": earned <b>" + mo.income + "</b>, rent " + mo.rent + ", bills " + mo.bills + ", children's keep " + mo.kids + ": <b>" + mo.left + " left</b>. Gold in hand: " + mo.gold + "." + (mo.past_due > 0 ? " <b style='color:#E8A070'>" + mo.past_due + " gold of bills is past due.</b>" : ""));
var mine = F.mine || [];
if (mine.length) {
h += fwHead("Your children");
mine.forEach(function (c) {
h += "<div style='border-top:1px solid rgba(201,168,104,.25);padding-top:6px;margin-top:6px'><b>" + fwChildLine(c) + "</b>";
h += fwDim("Bond " + c.bond + " of 100 · happiness " + c.happy + " of 100" + (c.out ? " · walking with you" : " · at home") + (c.review ? " · <b style='color:#E8A070'>Family Services is worried (" + ({ money: "unpaid keep", room: "no bedroom", care: "needs your time" })[c.review] + ") until " + fwWhen(c.review_at) + "</b>" : ""));
h += fwB("care", "🍲 A meal", { id: c.id, k: "meal" }) + fwB("care", "📖 A story", { id: c.id, k: "story" }) + (c.age >= 5 ? fwB("care", "✏️ Homework", { id: c.id, k: "homework" }) : "") + fwB("care", "⚽ Play", { id: c.id, k: "play" }) + fwB("care", "🤗 A hug", { id: c.id, k: "hug" }) + (c.age < 8 ? fwB("care", "🛁 Bath time", { id: c.id, k: "bath" }) : "");
h += c.out ? fwB("care", "🏡 Stay at home", { id: c.id, k: "home" }) : fwB("care", "🚶 Walk with me", { id: c.id, k: "walk" });
if (c.status === "fostered") {
h += fwB("adopt", "❤️ Adopt " + esc(String(c.name).split(" ")[0]) + " (" + c.adopt_fee + " gold)", { id: c.id });
h += fwB("endask", "End the fostering", { id: c.id });
}
if (FW.endAsk === c.id)
h += "<div>" + fwDim("Are you sure? " + esc(String(c.name).split(" ")[0]) + " goes back to Hearthside with the caseworker.") + fwB("endyes", "Yes, end it", { id: c.id }) + fwB("endno", "No, keep caring", { id: c.id }) + "</div>";
h += "</div>";
});
}
(F.grown || []).forEach(function (g) { h += fwDim("🎓 " + esc(g.name) + " grew up and moved into a home of their own."); });
h += fwHead("Children waiting at Hearthside");
h += fwDim("To foster or adopt you must be 21 or over with dues paid, have a bedroom free (a little one can have the nursery), no bill past due, and over the last two weeks have earned more than your rent, your bills and the keep of your children with the new child's keep on top. Fostering is free; adopting costs 300 gold in court fees after a week of fostering, or 500 straight away.");
(F.waiting || []).forEach(function (c) {
var st = c.study || {}, open = FW.child === c.id;
h += "<div style='border-top:1px solid rgba(201,168,104,.25);padding-top:6px;margin-top:6px'><b>" + fwChildLine(c) + "</b>" + fwDim(esc(c.nature) + ". Likes " + esc(c.likes) + ".");
h += (st.ok ? "<span style='color:#9AD08A'>✓ Your home study passes</span> " : "<span style='color:#E8C070'>The home study finds something to put right</span> ") + fwB("checks", open ? "Hide the checks" : "See the checks", { id: c.id });
if (open && st.checks)
h += "<div style='margin:4px 0 2px'>" + st.checks.map(function (k) { return "<div style='font-size:12.5px'>" + (k.ok ? "✅ " : "❌ ") + esc(k.say) + "</div>"; }).join("") + "</div>";
h += "<div>" + fwB("foster", "🏡 Foster " + esc(String(c.name).split(" ")[0]), { id: c.id, off: !st.ok }) + fwB("adoptnow", "❤️ Adopt (500 gold)", { id: c.id, off: !st.ok }) + "</div></div>";
});
if (!(F.waiting || []).length)
h += fwDim("Every child has a family just now. New children arrive at Hearthside every so often.");
h += "<div style='margin-top:10px'>" + fwB("goF", "👪 Visit Hearthside") + "</div>";
return h;
},
function () {
var el = document.getElementById("fw-box");
if (!FW.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "fw-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(560px,calc(100vw - 32px));max-height:min(86vh,800px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(30,32,26,.97),rgba(12,13,10,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#D8CCB4);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", fwClick);
el.addEventListener("input", function (e) { if (e.target.id === "fw-words")
FW.words = e.target.value; });
document.body.appendChild(el);
}
var y = el.scrollTop;
el.innerHTML = fwHtml();
el.style.display = "block";
el.scrollTop = y;
},
function (where, venue) {
fwClose();
var at = where === "fam" || venue === "registry" ? "fam" : "wed";
var go = function () { var k = venue === "registry" ? "registry" : venue === "garden" ? "garden" : venue === "rose" ? "roseroom" : venue === "chapel" ? "chapel" : null; if (k)
setTimeout(function () { flShowWay(k); }, 400); };
if (typeof WLD !== "undefined" && WLD.on === "family") {
go();
return;
}
if (flKeeper() || typeof showTheWay !== "function") {
worldGo("family", { at: at });
go();
return;
}
showTheWay(at === "fam" ? FL_FAM : FL_WED);
},
function (e) {
var t = e.target.closest && e.target.closest("[data-fw]");
if (!t || t.disabled)
return;
var a = t.getAttribute("data-fw"), id = t.getAttribute("data-id"), k = t.getAttribute("data-k");
if (a === "x") {
fwClose();
return;
}
if (a === "tab") {
FW.tab = k;
FW.say = "";
fwPaint();
fwLoad(false);
return;
}
if (a === "goW") {
fwGo("wed");
return;
}
if (a === "goF") {
fwGo("fam");
return;
}
if (a === "goVenue") {
fwGo(k === "registry" ? "fam" : "wed", k);
return;
}
if (a === "shop") {
fwClose();
fwShop("rings");
return;
}
if (a === "ring") {
FW.pick.ring = k || "";
fwPaint();
return;
}
if (a === "propose") {
fwAct("wed_propose", { p_to: id, p_ring: FW.pick.ring || null, p_words: (FW.words || "").trim() || null }, function (o) { if (o && o.ok) {
FW.words = "";
if (typeof loadThings === "function")
loadThings();
} });
return;
}
if (a === "yes" || a === "no") {
fwAct("wed_answer", { p_id: +id, p_yes: a === "yes" }, function () { if (typeof loadThings === "function")
loadThings(); });
return;
}
if (a === "withdraw") {
fwAct("wed_withdraw", { p_id: +id });
return;
}
if (a === "venue") {
FW.pick.venue = k;
fwPaint();
return;
}
if (a === "pkg") {
FW.pick.pkg = k;
fwPaint();
return;
}
if (a === "when") {
FW.pick.when = +k;
fwPaint();
return;
}
if (a === "guest") {
var i = FW.pick.guests.indexOf(id);
if (i >= 0)
FW.pick.guests.splice(i, 1);
else
FW.pick.guests.push(id);
fwPaint();
return;
}
if (a === "book") {
var hrs = FW_WHEN[FW.pick.when][1], at = new Date(Date.now() + hrs * 3600000);
at.setSeconds(0, 0);
if (hrs >= 24)
at.setMinutes(0);
fwAct("wed_book", { p_venue: FW.pick.venue, p_package: FW.pick.pkg, p_at: at.toISOString(), p_guests: FW.pick.guests });
return;
}
if (a === "cancel") {
fwAct("wed_cancel", { p_booking: +id });
return;
}
if (typeof fwBook2Click === "function" && fwBook2Click(a, id, k))
return;
if (a === "vow") {
fwAct("wed_vow", { p_booking: +id }, function (o) { if (o && o.married)
fwCelebrate(); });
return;
}
if (a === "end") {
if (FW.endWed !== 1) {
FW.endWed = 1;
FW.say = "Press it again to be sure." + (FW.wed && FW.wed.status === "married" ? " A divorce is filed at the Registry Office (150 gold)." : "");
fwPaint();
return;
}
FW.endWed = 0;
fwAct("wed_end", {});
return;
}
if (a === "share") {
fwAct("wed_home", { p_lot: +id });
return;
}
if (a === "checks") {
FW.child = FW.child === +id ? null : +id;
fwPaint();
return;
}
if (a === "foster") {
fwAct("fam_apply", { p_child: +id, p_kind: "foster" }, function (o) { if (o && o.ok)
FW.child = null;
else
FW.child = +id; });
return;
}
if (a === "adoptnow" || a === "adopt") {
fwAct("fam_apply", { p_child: +id, p_kind: "adopt" });
return;
}
if (a === "care") {
fwAct("fam_care", { p_child: +id, p_act: k }, function (o) { if (o && o.ok && (k === "walk" || k === "home") && typeof fhLookSync === "function")
setTimeout(fhLookSync, 300); });
return;
}
if (a === "endask") {
FW.endAsk = +id;
fwPaint();
return;
}
if (a === "endno") {
FW.endAsk = null;
fwPaint();
return;
}
if (a === "endyes") {
FW.endAsk = null;
fwAct("fam_end", { p_child: +id });
return;
}
},
function () {
if (typeof playTone === "function")
[523, 659, 784, 1047, 784, 880, 1047].forEach(function (n, i) { setTimeout(function () { try {
playTone(n, 0.45);
}
catch (e) { } }, i * 380); });
try {
if (typeof scene === "undefined" || !scene)
return;
var g = new THREE.Group(), P = camera.position, m = new THREE.MeshBasicMaterial({ color: 0xE0BCC0, side: THREE.DoubleSide });
for (var i = 0; i < (flLite() ? 24 : 70); i++) {
var p = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.06), m);
p.position.set(P.x + (Math.random() - 0.5) * 10, P.y + 2 + Math.random() * 4, P.z + (Math.random() - 0.5) * 10);
p.rotation.set(Math.random() * 3, Math.random() * 3, 0);
p.userData.v = 0.3 + Math.random() * 0.3;
g.add(p);
}
scene.add(g);
var t0 = Date.now();
(function fall() {
var dt = 0.016;
g.children.forEach(function (p) { p.position.y -= p.userData.v * dt; p.rotation.x += dt * 0.8; p.position.x += Math.sin(Date.now() / 900 + p.position.z) * 0.004; });
if (Date.now() - t0 < 9000)
requestAnimationFrame(fall);
else
scene.remove(g);
})();
}
catch (e) { }
},
function (kind) {
if (!flSigned()) {
setStatus("Sign in to shop.");
return;
}
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#F0DEB0'>" + (kind === "rings" ? "The Ring Counter" : "The Bridal Boutique") + "</div><div style='opacity:.8'>Reading the cases…</div>", {});
catalogueRows().then(function (rows) {
var list = (rows || []).filter(function (r) { var a = r.archetype || ""; return kind === "rings" ? /^wed_(ring|band)_/.test(a) : /^wed_(bouquet|buttonhole|garter|album|guestbook|cake_topper)$/.test(a); });
var fns = {}, h = "<div style='font:600 17px var(--serif,Georgia);color:#F0DEB0'>" + (kind === "rings" ? "💍 The Ring Counter" : "🌸 The Bridal Boutique") + "</div>" +
"<div style='opacity:.8;margin:2px 0 8px'>" + (kind === "rings" ? "Engagement rings to propose with, and wedding bands. Everything goes into your backpack." : "Flowers, keepsakes and the little things for the day. Everything goes into your backpack.") + "</div>";
if (!list.length)
h += "<div style='opacity:.8'>" + (FW.missing ? "The cases are filled soon." : "Nothing in the cases just now.") + "</div>";
list.forEach(function (r) { h += worldBtn("buy:" + r.id, esc(r.name) + " · " + r.price + " gold", esc(r.note || "")); fns["buy:" + r.id] = function () { buyItem(r.id).then(function () { fwShop(kind); }); }; });
worldCard(h, fns);
}).catch(function () { worldCard("<div style='opacity:.8'>The cases are closed just now.</div>", {}); });
},
function (venue) {
fwLoad(true).then(function () {
var W = FW.wed || {}, bk = (W.bookings || []).filter(function (b) { return b.venue === venue; })[0];
if (bk) {
fwAct("wed_vow", { p_booking: bk.id }, function (o) { if (o && o.married)
fwCelebrate(); FW.open = true; FW.tab = "wed"; });
return;
}
if (venue === "registry" && W.status === "married") {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#F0DEB0'>🏛️ The registrar</div><div style='opacity:.85;margin:4px 0 8px'>" +
"“Good day. You are in the register as married to " + esc(W.partner_name || "your spouse") + ". If you wish to file for a divorce, the fee is 150 gold. Any children stay in the home they live in.”</div>" +
worldBtn("div", "File for a divorce (150 gold)", "this cannot be undone") + worldBtn("no", "Thank you, no", null), { div: function () { worldCard(null); fwOpen("wed"); FW.endWed = 1; fwAct("wed_end", {}); }, no: function () { worldCard(null); } });
return;
}
fwOpen("wed");
if (!FW.say)
FW.say = W.status === "engaged" ? "Book this room in the panel below, then come back on the day." : W.status === "married" ? "You are married already." : "First a proposal and a yes: then book the day here.";
fwPaint();
});
},
function () {
if (fnExempt())
return;
[["energy", FN.energy, "<b>You are getting tired.</b> Sleep in your bed at home, or take a room at the Somnucor Inn. Tap your bars for the way.", "<b>You are exhausted.</b> You walk slower until you sleep."],
["hygiene", FN.hygiene, "<b>You could do with a wash.</b> A bath or a shower at home, or at the Inn.", "<b>You really need a wash.</b> Colds catch you more easily when you are grubby."]].forEach(function (q) {
var v = q[1];
if (v == null)
return;
var b = v < 15 ? 2 : v < 30 ? 1 : 0, was = FN.said[q[0]] || 0;
FN.said[q[0]] = b;
if (b > was)
setStatus(b === 2 ? q[3] : q[2]);
});
},
function () {
if (!fnInside() || !INT.spec || typeof HW_HOMES === "undefined" || !HW_HOMES[INT.spec.archetype])
return false;
if (INT.spec.eyrie || (typeof WLD !== "undefined" && WLD && WLD.on))
return false;
if (typeof inSomnucorRealm === "function" && inSomnucorRealm())
return false;
if (typeof amVisiting === "function" && amVisiting())
return false;
if (typeof hlPlotOf === "function" && hlPlotOf(INT.spec))
return false;
var wk = typeof workplaceKeyOf === "function" ? workplaceKeyOf(INT.spec) : null;
return !(wk && !/^lot:/.test(wk));
},
function () {
if (!fnInside() || !INT.spec)
return false;
try {
if (fnEyrieMine() || fnDreamHome())
return true;
var pl = typeof hlPlotOf === "function" ? hlPlotOf(INT.spec) : null;
if (!pl)
return false;
if (typeof hlRow === "function") {
var r = hlRow(pl.name, pl.world);
if (r && (r.mine || r.open))
return true;
}
return !!(typeof standing !== "undefined" && standing && (standing.lots || []).some(function (l) { return l.lot === pl.name; }));
}
catch (e) {
return false;
}
},
function (k) {
if (!k)
return null;
var n = String(k).replace(/^hwup_\d+_/, ""), m = /^sg_[a-z]{2}_([a-z0-9]+)(_[a-z0-9]+)?$/.exec(n);
if (m)
n = m[1];
if (FN_BED.test(k) || FN_SLEEP2.test(n))
return { how: "sleep", k: /crib|cot|cradle/.test(n) ? "cot" : "bed" };
if (FN_WASH.test(k) || FN_WASH2.test(n))
return { how: "wash", k: /shower/.test(n) ? "shower" : /sink|basin|wash/.test(n) ? "basin" : /sauna/.test(n) ? "sauna" : "bath" };
if (FN_NAP.test(k) || FN_NAP2.test(n))
return { how: "nap", k: /recline/.test(n) ? "recliner" : /lounger/.test(n) ? "lounger" : /chaise/.test(n) ? "chaise" : /chair/.test(n) ? "armchair" : "sofa" };
return null;
},
function () {
if (!fnInside())
return null;
var P = camera.position, lv = (INT.level || 0), fy = lv * (INT.floor || 4), best = null, bd = 2.2;
INT.root.children.forEach(function (c) {
var f = fnFurnHow(c.userData && c.userData.furn);
if (!f)
return;
if (Math.abs(c.position.y - fy) > 1)
return;
var d = Math.hypot(P.x - (INT.ox + c.position.x), P.z - (INT.oz + c.position.z));
if (d < bd) {
bd = d;
best = f;
}
});
return best;
},
function (how, where) {
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("Sign in first.");
return;
}
cityRpc("needs_rest", { p_how: how, p_where: where || "home" }).then(function (o) {
if (!o)
return;
setStatus(esc(o.say || ""));
if (o.ok !== false && typeof needsGot === "function")
needsGot(Object.assign({ events: [] }, o));
if (o.ok !== false && how !== "stop" && typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
}).catch(function (e) { setStatus(esc(fwMissing(e) ? "Sleeping and washing open soon." : fwErr(e))); });
},
function () {
var key = fnWorldKey();
if (!key || typeof WHM === "undefined" || !WHM.homes || !WHM.homes[key])
return null;
var L = typeof worldLocal === "function" ? worldLocal() : null;
if (!L)
return null;
var plan = typeof WH_PLAN !== "undefined" ? WH_PLAN[key] : null, S = plan && typeof WH_STYLE !== "undefined" ? WH_STYLE[plan.style] : null;
if (!S)
return null;
var feet = L.y - 1.72, list = WHM.homes[key];
for (var i = 0; i < list.length; i++) {
var o = list[i];
if (Math.abs(feet - (o.floor || 0)) > 1.5)
continue;
var dx = L.x - o.x, dz = L.z - o.z, c = Math.cos(o.rot), s = Math.sin(o.rot), lx = dx * c - dz * s, lz = dx * s + dz * c;
var inside = S.style === "dome" ? Math.hypot(lx, lz) < (S.r || 3.5) - 0.2 : (Math.abs(lx) < S.w / 2 - 0.1 && Math.abs(lz) < S.d / 2 - 0.1);
if (inside)
return { o: o, S: S, key: key, lx: lx, lz: lz };
}
return null;
},
function (h) {
var world = h.key === "station" ? "station" : h.key;
var r = typeof hlRow === "function" ? hlRow(h.o.name, world) : null;
if (!r && typeof hlLoad === "function")
try {
hlLoad(false);
}
catch (e) { }
if (r && (r.mine || r.open))
return true;
return !!(typeof standing !== "undefined" && standing && (standing.lots || []).some(function (l) { return l.lot === h.o.name; }));
},
function () {
var show = null;
if (typeof walkMode !== "undefined" && walkMode && !(typeof store !== "undefined" && store.inside) && FN.energy != null && !fnExempt()) {
var h = fnWorldHomeHere();
if (h && fnWorldHomeMine(h)) {
var W = h.S.style === "dome" ? 6.4 : h.S.w, D = h.S.style === "dome" ? 6.4 : h.S.d;
var bed = Math.hypot(h.lx - (-W / 2 + 1.05), h.lz - (-D / 2 + 1.25)), basin = Math.hypot(h.lx - (-W / 2 + 0.35), h.lz - 0.2);
var how = basin < 1.3 ? "wash" : bed < 2 ? "sleep" : null;
if (how) {
if (FN.rest && (FN.rest === "wash") === (how === "wash"))
show = { html: "<b>" + (FN.rest === "wash" ? "Washing" : "Resting") + "</b> · <b>press E</b> (or tap here) to get up", fn: function () { fnRest("stop"); } };
else
show = how === "sleep" ? { html: "<b>Your bed</b> · <b>press E</b> (or tap here) to sleep · energy " + Math.round(FN.energy), fn: function () { fnRest("sleep", "home"); } } :
{ html: "<b>A basin</b> · <b>press E</b> (or tap here) to wash · hygiene " + Math.round(FN.hygiene), fn: function () { fnRest("wash", "home"); } };
}
}
}
if (show) {
FNW.fn = show.fn;
worldPrompt(show.html, show.fn);
}
else if (FNW.fn) {
if (WLD.promptFn === FNW.fn)
worldPrompt(null);
FNW.fn = null;
}
},
function (c) {
var f = String(c.name || "").split(" ")[0];
wTalk({ name: c.name, greet: c.age < 3 ? "*" + f + " holds up their arms to be picked up.*" : c.age < 7 ? "You're home! Can we play?" : c.age < 13 ? "Hi! Guess what happened today." : "Hey. Good day?",
persona: "You are " + c.name + ", " + c.age + " years old, " + (c.status === "adopted" ? "adopted" : "fostered") + " by the person you are talking to, and you live with them now. You are " + (c.nature || "a kind child") +
". Talk as a " + c.age + "-year-old would: simple words for a little one, more for an older child. You are glad of your home and fond of your carer (your bond is " + c.bond + " of 100: the higher, the closer and more trusting you are). " +
"Keep everything gentle and suitable for children; never talk about anything frightening or grown-up and never ask for personal details. You might mention school, friends, food you like or something you would like to do together." });
},
function (spec, at) {
var D = typeof doorWorld === "function" ? doorWorld(spec) : { x: camera.position.x, z: camera.position.z, out: { x: 0, z: 1 } };
var ox = D.x + D.out.x * 2.4, oz = D.z + D.out.z * 2.4, oy = (typeof terrainY === "function" ? (terrainY(ox, oz) || 0) : 0) + 1.72;
worldGo("family", { at: at, from: { here: store.here || 0, x: ox, y: oy, z: oz, yaw: Math.atan2(-D.out.x, -D.out.z), name: at === "fam" ? FL_FAM : FL_WED } });
}
];
});
