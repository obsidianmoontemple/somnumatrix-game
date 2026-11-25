/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(306, function () {
"use strict";
return [
function (force) {
if (!llSigned()) {
LL.state = LL.state || null;
return Promise.resolve(LL.state);
}
if (!force && Date.now() - LL.stateAt < 45000)
return Promise.resolve(LL.state);
LL.stateAt = Date.now();
return cityRpc("lounge_state", {}).then(function (o) { if (o && o.ok) {
LL.state = o;
LL.noSql = false;
} return LL.state; })
.catch(function (e) { if (llMissing(e))
LL.noSql = true; return LL.state; });
},
function (col, o) {
o = o || {};
var k = col + "|" + (o.e || 0) + "|" + (o.op || 1) + "|" + (o.ds ? 1 : 0) + "|" + (o.b ? 1 : 0) + "|" + (o.map || "");
if (LL_MAT[k])
return LL_MAT[k];
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
if (o.map && LL_TEX[o.map])
m.map = LL_TEX[o.map]();
LL_MAT[k] = m;
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
return llCanvasTex("carpet", 256, function (x, W, H) {
x.fillStyle = "#5A2872";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(201,168,104,.55)";
x.lineWidth = 3;
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++) {
var cx = W / 4 + i * W / 2, cy = H / 4 + j * H / 2;
x.beginPath();
x.moveTo(cx, cy - 40);
x.quadraticCurveTo(cx + 30, cy, cx, cy + 40);
x.quadraticCurveTo(cx - 30, cy, cx, cy - 40);
x.stroke();
x.fillStyle = "rgba(216,138,184,.6)";
x.beginPath();
x.arc(cx, cy, 9, 0, 7);
x.fill();
}
x.strokeStyle = "rgba(216,138,184,.35)";
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
return llCanvasTex("rosecarpet", 256, function (x, W, H) {
x.fillStyle = "#9A4A78";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
var cx = W / 8 + i * W / 4 + (j % 2) * W / 8, cy = H / 8 + j * H / 4;
x.fillStyle = "rgba(232,200,214,.45)";
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
return llCanvasTex("damask", 256, function (x, W, H) {
x.fillStyle = "#6A3482";
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(150,96,170,.55)";
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++) {
var cx = W / 4 + i * W / 2 + (j % 2) * W / 4, cy = H / 4 + j * H / 2;
x.beginPath();
x.moveTo(cx, cy - 52);
x.bezierCurveTo(cx + 40, cy - 30, cx + 34, cy + 20, cx, cy + 52);
x.bezierCurveTo(cx - 34, cy + 20, cx - 40, cy - 30, cx, cy - 52);
x.fill();
x.fillStyle = "rgba(201,168,104,.35)";
x.beginPath();
x.arc(cx, cy, 10, 0, 7);
x.fill();
x.fillStyle = "rgba(150,96,170,.55)";
}
x.fillStyle = "rgba(201,168,104,.4)";
x.fillRect(0, 0, W, 3);
});
},
function () {
return llCanvasTex("pinkdamask", 256, function (x, W, H) {
x.fillStyle = "#C88AAE";
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(232,196,214,.6)";
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
return llCanvasTex("marble", 256, function (x, W, H) {
x.fillStyle = "#D2C6CE";
x.fillRect(0, 0, W, H);
var R = wRand(77);
x.strokeStyle = "rgba(150,120,150,.35)";
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
x.strokeStyle = "rgba(120,90,120,.25)";
x.lineWidth = 2;
x.strokeRect(0, 0, W, H);
});
},
function () {
return llCanvasTex("parquet", 256, function (x, W, H) {
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
return llCanvasTex("coffer", 256, function (x, W, H) {
x.fillStyle = "#9A6E9E";
x.fillRect(0, 0, W, H);
x.fillStyle = "#C49CC4";
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
return llCanvasTex("stone", 128, function (x, W, H) {
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
llWalls(G, x0, x1, z0, z1, h, o.wall || llM(0xE8DCEC, { map: "damask" }), gaps, o.tile || 3, skip, o.trim !== false ? { rail: Math.min(h - 0.3, 3.7), skirt: o.skirt || 0x2A1030 } : null);
var fm = o.floor || llM(0xE8DCEC, { map: "carpet" });
if (o.holes)
LL.floorsLater.push({ G: G, x0: x0, x1: x1, z0: z0, z1: z1, mat: fm, y: o.fy || 0.01, t: o.ftile || 3 });
else
llPlane(x1 - x0, z1 - z0, fm, (x0 + x1) / 2, o.fy || 0.01, (z0 + z1) / 2, G, o.ftile || 3);
if (o.ceil !== false)
llPlane(x1 - x0, z1 - z0, o.ceil || llM(0xE8D4E8, { map: "coffer", e: 0x2A1430 }), (x0 + x1) / 2, h, (z0 + z1) / 2, G, o.ctile || 4, true);
LL.walk.push({ x0: x0, x1: x1, z0: z0, z1: z1, y: 0 });
var R = { name: o.name || "", x0: x0, x1: x1, z0: z0, z1: z1, h: h, where: o.where || "lounge", hemi: o.hemi, sky: o.sky, floor: o.floorNo, slot: o.slot };
LL.rooms.push(R);
if (o.gate)
LL.gates.push({ x0: x0 + 0.25, x1: x1 - 0.25, z0: z0 + 0.25, z1: z1 - 0.25, need: o.gate, name: o.name, slot: o.slot });
return R;
},
function (G, x0, x1, z0, z1, h, mat, gaps, tile, skip, trim) {
var t = 0.3, gold = llM(0xB8945A, { e: 0x1A1208 }), gold2 = llM(0xC9A868, { e: 0x1A1208 }), sk = trim ? llM(trim.skirt) : null;
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
llTBox(L, h, t, mat, mid, h / 2, fixed, G, tile);
llSolid(mid, fixed, L / 2, t / 2);
}
else {
llTBox(t, h, L, mat, fixed, h / 2, mid, G, tile);
llSolid(fixed, mid, t / 2, L / 2);
}
}
if (trim) {
var o = fixed + inward * 0.18;
if (alongX) {
llBox(L, 0.22, 0.06, sk, mid, 0.11, o, G);
llBox(L, 0.07, 0.05, gold, mid, trim.rail, o, G);
}
else {
llBox(0.06, 0.22, L, sk, o, 0.11, mid, G);
llBox(0.05, 0.07, L, gold, o, trim.rail, mid, G);
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
llBox(a, 0.07, 0.05, gold, m, trim.rail, o, G);
else
llBox(0.05, 0.07, a, gold, o, trim.rail, m, G);
});
if (!own)
return;
cuts.forEach(function (c) {
var L = c[1] - c[0], mid = (c[0] + c[1]) / 2, dh = c[2];
if (h > dh + 0.1) {
if (alongX)
llTBox(L, h - dh, t, mat, mid, dh + (h - dh) / 2, fixed, G, tile);
else
llTBox(t, h - dh, L, mat, fixed, dh + (h - dh) / 2, mid, G, tile);
}
if (alongX) {
llBox(0.18, dh, 0.42, gold2, c[0], dh / 2, fixed, G);
llBox(0.18, dh, 0.42, gold2, c[1], dh / 2, fixed, G);
llBox(L + 0.36, 0.2, 0.42, gold2, mid, dh, fixed, G);
}
else {
llBox(0.42, dh, 0.18, gold2, fixed, dh / 2, c[0], G);
llBox(0.42, dh, 0.18, gold2, fixed, dh / 2, c[1], G);
llBox(0.42, 0.2, L + 0.36, gold2, fixed, dh, mid, G);
}
});
}
side("n", x0, x1, z0, true, 1);
side("s", x0, x1, z1, true, -1);
side("w", z0, z1, x0, false, 1);
side("e", z0, z1, x1, false, -1);
},
function () {
var R = LL.room, house = LL.where === "house";
if (R && R.sky)
return { top: 0x5E7EC0, low: 0xC4A6BE, fog: 0xB49CB4, fogD: 0.0012, sun: 0.8, sunCol: 0xFFE8D4, sunDir: [0.35, 0.8, 0.45],
hemi: 0.78, hemiCol: 0xEEE4F0, hemiGround: 0x4A5A3A, stars: 0 };
return { top: 0x2A1236, low: 0x1E0E28, fog: house ? 0x2A1A2E : 0x24102E, fogD: 0.0035, sun: 0.35, sunCol: 0xFFE6F2, sunDir: [0.3, 0.9, 0.2],
hemi: R && R.hemi ? R.hemi : 1.12, hemiCol: house ? 0xFFF0F4 : 0xFFE8F6, hemiGround: 0x5A3A5A, stars: 0 };
},
function (x, z, feet) {
if (typeof llPoolY === "function") {
var py = llPoolY(x, z);
if (py !== null)
return Math.max(py, -1.05);
}
var y = null;
for (var i = 0; i < LL.walk.length; i++) {
var w = LL.walk[i];
if (llIn(w, x, z)) {
y = w.y;
break;
}
}
if (y === null)
return 0;
for (var j = 0; j < LL.pads.length; j++) {
var p = LL.pads[j];
if (llIn(p, x, z) && (feet === undefined || feet > p.h - 0.75))
y = Math.max(y, p.h);
}
for (var k = 0; k < LL.ramps.length; k++) {
var q = LL.ramps[k];
if (!llIn(q, x, z))
continue;
var f = q.axis === "x" ? (x - q.x0) / (q.x1 - q.x0) : (z - q.z0) / (q.z1 - q.z0);
y = Math.max(y, q.h0 + (q.h1 - q.h0) * f);
}
return y;
},
function (x, z, feet) {
var inside = false;
for (var i = 0; i < LL.walk.length; i++) {
if (llIn(LL.walk[i], x, z)) {
inside = true;
break;
}
}
if (!inside)
return true;
if (worldSolidAt(LL.solids, x, z, feet))
return true;
for (var g = 0; g < LL.gates.length; g++) {
var G = LL.gates[g];
if (llIn(G, x, z) && !llAllowed(G.need, G)) {
if (Date.now() - LL.gateSaid > 4000) {
LL.gateSaid = Date.now();
setStatus("<b>" + esc(typeof llGateName === "function" ? llGateName(G) : G.name) + ".</b> " + (G.need === "room" && typeof llRoomSay === "function" ? llRoomSay(G) : LL_NEED_SAY[G.need]));
}
return true;
}
}
if (typeof llWaterBlocks === "function" && llWaterBlocks(x, z))
return true;
return false;
},
function (G, x, z, ry, col, o) {
o = o || {};
var g = llPiece(G, x, z, ry), f = llM(col || LLC.purple), gd = o.silver ? llSilver() : llGold();
llBox(0.52, 0.12, 0.5, f, 0, 0.48, 0, g);
llBox(0.5, 0.78, 0.1, f, 0, 0.95, -0.22, g);
llBox(0.56, 0.06, 0.12, gd, 0, 1.36, -0.22, g);
if (!LL.lite) {
for (var b = 0; b < 3; b++)
llSph(0.025, gd, -0.15 + b * 0.15, 1.0, -0.165, g, 5);
}
[[-0.22, -0.2], [0.22, -0.2], [-0.22, 0.2], [0.22, 0.2]].forEach(function (p) { llCyl(0.025, 0.02, 0.44, gd, p[0], 0.22, p[1], g, 5); });
if (o.solid)
llPS(x, z, 0.28, 0.28, ry, 1);
return g;
},
function (G, x, z, ry, col) {
var g = llPiece(G, x, z, ry), f = llM(col || LLC.rose), gd = llGold();
llBox(0.9, 0.36, 0.82, f, 0, 0.36, 0.02, g);
llBox(0.9, 1.0, 0.22, f, 0, 0.95, -0.36, g);
llBox(0.2, 0.55, 0.82, f, -0.4, 0.6, 0.02, g);
llBox(0.2, 0.55, 0.82, f, 0.4, 0.6, 0.02, g);
llBox(0.26, 0.3, 0.22, f, -0.4, 1.32, -0.3, g);
llBox(0.26, 0.3, 0.22, f, 0.4, 1.32, -0.3, g);
llBox(0.72, 0.1, 0.6, llM(LLC.blush), 0, 0.58, 0.08, g);
[[-0.38, -0.32], [0.38, -0.32], [-0.38, 0.36], [0.38, 0.36]].forEach(function (p) { llCyl(0.035, 0.025, 0.18, gd, p[0], 0.09, p[1], g, 6); });
llPS(x, z, 0.5, 0.46, ry, 1.2);
return g;
},
function (G, x, z, ry, col, len, o) {
o = o || {};
len = len || 2.4;
var g = llPiece(G, x, z, ry), f = llM(col || LLC.purple), gd = llGold(), cu = llM(o.cush || LLC.pink);
llBox(len, 0.4, 0.95, f, 0, 0.38, 0, g);
llBox(len, 0.75, 0.24, f, 0, 0.92, -0.38, g);
if (!LL.lite)
llBox(len * 0.5, 0.18, 0.22, f, 0, 1.36, -0.38, g);
llBox(0.24, 0.6, 0.95, f, -len / 2, 0.6, 0, g);
llBox(0.24, 0.6, 0.95, f, len / 2, 0.6, 0, g);
var n = Math.max(2, Math.round(len / 0.8));
for (var i = 0; i < n; i++) {
var cx = -len / 2 + 0.3 + (len - 0.6) * (i + 0.5) / n;
llBox((len - 0.6) / n - 0.04, 0.14, 0.72, llM(LLC.blush), cx, 0.65, 0.06, g);
if (!LL.lite && i % 2 === 0)
llBox(0.38, 0.38, 0.12, cu, cx, 0.95, -0.22, g);
}
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { llCyl(0.04, 0.03, 0.18, gd, p[0] * (len / 2 - 0.1), 0.09, p[1] * 0.38, g, 6); });
llPS(x, z, len / 2 + 0.12, 0.5, ry, 1.2);
return g;
},
function (G, x, z, ry, col) {
var g = llPiece(G, x, z, ry), f = llM(col || LLC.rose), gd = llGold();
llBox(0.75, 0.36, 1.9, f, 0, 0.36, 0, g);
var b = llBox(0.75, 0.7, 0.5, f, 0, 0.75, -0.75, g);
b.rotation.x = 0.45;
llBox(0.12, 0.4, 1.0, f, -0.36, 0.6, -0.4, g);
[[-0.3, -0.85], [0.3, -0.85], [-0.3, 0.85], [0.3, 0.85]].forEach(function (p) { llCyl(0.035, 0.025, 0.18, gd, p[0], 0.09, p[1], g, 6); });
llPS(x, z, 0.42, 1.0, ry, 1);
return g;
},
function (G, x, z, r, o) {
o = o || {};
var g = llPiece(G, x, z, 0), y = o.y || 0.76;
if (o.cloth !== false) {
llCyl(r + 0.05, r + 0.22, y - 0.02, llM(o.cloth || LLC.blush), 0, y / 2, 0, g, 20);
llCyl(r + 0.06, r + 0.06, 0.04, llM(o.top || LLC.cream), 0, y, 0, g, 20);
}
else {
llCyl(r, r, 0.05, llM(o.top || LLC.wood), 0, y, 0, g, 20);
llCyl(0.07, 0.12, y - 0.05, llGold(), 0, (y - 0.05) / 2, 0, g, 8);
llCyl(0.35, 0.4, 0.05, llGold(), 0, 0.03, 0, g, 12);
}
if (o.posy !== false && !LL.lite) {
llCyl(0.05, 0.06, 0.14, llSilver(), 0, y + 0.08, 0, g, 8);
llSph(0.1, llM(LLC.pink), 0, y + 0.2, 0, g, 8);
llSph(0.07, llM(LLC.rose), 0.07, y + 0.2, 0.05, g, 6);
}
llSolidR(x, z, r + 0.15, 1);
return g;
},
function (G, x, z, w, d, ry, o) {
o = o || {};
var g = llPiece(G, x, z, ry), y = o.y || 0.76;
if (o.cloth !== false) {
llBox(w + 0.1, y - 0.06, d + 0.1, llM(o.cloth || LLC.blush), 0, (y - 0.06) / 2, 0, g);
llBox(w + 0.12, 0.06, d + 0.12, llM(o.top || LLC.cream), 0, y - 0.03, 0, g);
if (o.runner)
llBox(w * 0.9, 0.01, d * 0.35, llM(o.runner), 0, y + 0.005, 0, g);
}
else {
llBox(w, 0.06, d, llM(o.top || LLC.wood), 0, y, 0, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { llBox(0.07, y, 0.07, llGold(), p[0] * (w / 2 - 0.1), y / 2, p[1] * (d / 2 - 0.1), g); });
}
llPS(x, z, w / 2 + 0.06, d / 2 + 0.06, ry, 1);
return g;
},
function (G, x, z, ry, o) {
o = o || {};
var g = llPiece(G, x, z, ry), w = o.w || 1.2, d = o.d || 0.65;
llBox(w, 0.05, d, llM(0xD8D0E0, { op: 0.5 }), 0, 0.45, 0, g);
llBox(w - 0.1, 0.03, d - 0.1, llGold(), 0, 0.12, 0, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { llCyl(0.025, 0.025, 0.44, llGold(), p[0] * (w / 2 - 0.06), 0.22, p[1] * (d / 2 - 0.06), g, 6); });
if (!LL.lite) {
llBox(0.25, 0.06, 0.18, llM(LLC.rose), 0.2, 0.5, 0, g);
llCyl(0.06, 0.05, 0.16, llSilver(), -0.3, 0.55, 0, g, 8);
llSph(0.08, llM(LLC.pink), -0.3, 0.68, 0, g, 6);
}
llPS(x, z, w / 2, d / 2, ry, 0.6);
return g;
},
function (G, x, y, z, s, o) {
o = o || {};
s = s || 1;
var g = llPiece(G, x, z, 0, y), gd = llGold(), cr = llCrystal();
llCyl(0.02, 0.02, 1.2 * s, gd, 0, 0.6 * s, 0, g, 4);
var tiers = o.tiers || 3;
for (var t = 0; t < tiers; t++) {
var r = (0.5 + t * 0.42) * s, ty = -t * 0.38 * s, n = LL.lite ? 8 + t * 4 : 12 + t * 8;
var ring = wMesh(new THREE.TorusGeometry(r, 0.03 * s, 5, LL.lite ? 16 : 28), gd, 0, ty, 0, g);
ring.rotation.x = Math.PI / 2;
for (var i = 0; i < n; i++) {
var a = i / n * 6.283;
var d = llMesh(new THREE.OctahedronGeometry(0.06 * s, 0), cr, Math.cos(a) * r, ty - 0.14 * s, Math.sin(a) * r, g);
d.scale.y = 1.8;
if (i % 3 === 0)
llCyl(0.025 * s, 0.03 * s, 0.12 * s, llM(0xF0E2D0, { e: 0x6A5A40 }), Math.cos(a) * r, ty + 0.08 * s, Math.sin(a) * r, g, 5);
}
}
llSph(0.16 * s, cr, 0, -tiers * 0.4 * s, 0, g, 8);
var glow = wGlow(0xFFE2C8, 3.2 * s, 0.42);
glow.position.set(x, y - 0.4 * s, z);
G.add(llKeep(glow));
var nGl = LL.lite ? 2 : 5;
for (var k = 0; k < nGl; k++) {
var a2 = k / nGl * 6.283 + 0.4, rr = (0.5 + (k % tiers) * 0.42) * s, sp = wGlow(0xFFF4FF, 0.35 * s, 0.0);
sp.position.set(x + Math.cos(a2) * rr, y - (k % tiers) * 0.38 * s - 0.16 * s, z + Math.sin(a2) * rr);
G.add(llKeep(sp));
LL.twinkle.push({ m: sp, ph: k * 1.7 + x * 0.13, sp: 0.5 + ((k * 7) % 5) * 0.08, max: 0.55 });
}
return g;
},
function (G, x, y, z, ry) {
var g = llPiece(G, x, z, ry, y), gd = llGold();
llBox(0.14, 0.3, 0.05, gd, 0, 0, 0, g);
llCyl(0.02, 0.02, 0.24, gd, 0, 0.04, 0.12, g, 4).rotation.x = Math.PI / 2;
llCyl(0.09, 0.06, 0.16, llM(0xF0D8E0, { e: 0x5A4048 }), 0, 0.14, 0.22, g, 10);
var gl = wGlow(0xFFD8C8, 1.1, 0.35);
gl.position.set(0, 0.18, 0.24);
g.add(llKeep(gl));
return g;
},
function (G, x, y, z) {
var g = llPiece(G, x, z, 0, y), gd = llGold();
llCyl(0.02, 0.08, 0.4, gd, 0, 0.2, 0, g, 6);
for (var i = -1; i <= 1; i++) {
llCyl(0.02, 0.02, 0.18, llM(LLC.cream), i * 0.13, 0.5, 0, g, 5);
var f = llSph(0.025, llOwn(0xFFC070), i * 0.13, 0.62, 0, g, 5);
LL.flames.push({ m: llKeep(f), ph: i * 1.3 + x });
}
llBox(0.3, 0.02, 0.02, gd, 0, 0.4, 0, g);
return g;
},
function (G, x, z, kind, s) {
s = s || 1;
var g = llPiece(G, x, z, 0), pot = kind === "palm" ? llGold() : llSilver();
llCyl(0.28 * s, 0.2 * s, 0.5 * s, pot, 0, 0.25 * s, 0, g, 10);
llCyl(0.27 * s, 0.27 * s, 0.04 * s, llM(0x3A2A20), 0, 0.5 * s, 0, g, 10);
if (kind === "palm") {
llCyl(0.05 * s, 0.07 * s, 1.3 * s, llM(0x6A5030), 0, 1.15 * s, 0, g, 6);
for (var i = 0; i < (LL.lite ? 5 : 8); i++) {
var a = i / 8 * 6.283, l = llBox(0.12 * s, 0.02, 1.1 * s, llM(0x3A6A3E), Math.cos(a) * 0.4 * s, 1.75 * s, Math.sin(a) * 0.4 * s, g);
l.rotation.y = -a + Math.PI / 2;
l.rotation.x = 0.5;
}
}
else if (kind === "roses") {
llSph(0.42 * s, llM(0x3A5A38), 0, 0.85 * s, 0, g, 10);
for (var j = 0; j < (LL.lite ? 6 : 14); j++) {
var b = j / 14 * 6.283, h = 0.7 + ((j * 5) % 7) * 0.06;
llSph(0.08 * s, llM(j % 3 ? LLC.pink : LLC.rose), Math.cos(b) * 0.36 * s, h * s, Math.sin(b) * 0.36 * s, g, 6);
}
}
else if (kind === "orchid") {
llCyl(0.01, 0.01, 0.6 * s, llM(0x3A5A38), 0, 0.8 * s, 0, g, 4);
for (var k = 0; k < 5; k++)
llSph(0.06 * s, llM(k % 2 ? LLC.lilac : 0xE8D0E8), 0.04 * k * s, (0.9 + k * 0.06) * s, 0, g, 6);
}
else {
llSph(0.45 * s, llM(0x3A6A3E), 0, 0.9 * s, 0, g, 8);
}
llSolidR(x, z, 0.32 * s, 1.5);
return g;
},
function (seed) {
if (LL_ART[seed])
return LL_ART[seed];
var R = wRand(llHash("art" + seed)), kind = seed % 4;
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
return (LL_ART[seed] = t);
},
function (G, x, y, z, ry, w, h) {
var g = llPiece(G, x, z, ry, y);
if (!LL_WINTEX)
LL_WINTEX = wTex(256, 256, function (c, W, H) {
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
wMesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: LL_WINTEX, color: 0xB8A8C0 }), 0, 0, 0.02, g);
llBox(w + 0.2, 0.1, 0.15, llM(LLC.cream), 0, -h / 2 - 0.05, 0.08, g);
var dr = llM(LLC.velvet), sh = llM(LLC.pink, { op: 0.5 });
llBox(w * 0.3, h + 0.6, 0.12, dr, -w / 2 - 0.05, 0.1, 0.18, g);
llBox(w * 0.3, h + 0.6, 0.12, dr, w / 2 + 0.05, 0.1, 0.18, g);
if (!LL.lite) {
llBox(w * 0.9, h, 0.02, sh, 0, 0, 0.12, g);
llBox(0.08, 0.08, 0.16, llGold(), -w / 2, -0.2, 0.24, g);
llBox(0.08, 0.08, 0.16, llGold(), w / 2, -0.2, 0.24, g);
}
llBox(w + 0.9, 0.45, 0.22, dr, 0, h / 2 + 0.4, 0.18, g);
llBox(w + 0.95, 0.08, 0.24, llGold(), 0, h / 2 + 0.18, 0.2, g);
return g;
},
function (G, x, z, h, o) {
o = o || {};
var g = llPiece(G, x, z, 0);
llCyl(0.42, 0.46, h - 0.8, llM(o.col || 0xD8CCD4, { map: "marble" }), 0, (h - 0.8) / 2 + 0.4, 0, g, 16);
llBox(1.0, 0.4, 1.0, llM(0xC8BCC6, { map: "marble" }), 0, 0.2, 0, g);
llBox(1.0, 0.4, 1.0, llGold(), 0, h - 0.2, 0, g);
if (!LL.lite)
wMesh(new THREE.TorusGeometry(0.46, 0.06, 6, 18), llGold(), 0, h - 0.5, 0, g).rotation.x = Math.PI / 2;
llSolidR(x, z, 0.55, h);
return g;
},
function (G, x, z, ry) {
var g = llPiece(G, x, z, ry), mb = llM(0xD8CCD4, { map: "marble" });
llBox(2.4, 1.4, 0.5, mb, 0, 0.7, 0, g);
llBox(1.3, 0.9, 0.52, llM(0x1A1018), 0, 0.48, 0.01, g);
llBox(2.7, 0.14, 0.62, mb, 0, 1.45, 0.02, g);
llBox(2.6, 0.06, 0.04, llGold(), 0, 1.36, 0.27, g);
for (var i = 0; i < 3; i++) {
var f = llSph(0.16, llOwn(0xFF9A50, 0.85), -0.3 + i * 0.3, 0.32, 0.06, g, 6);
LL.flames.push({ m: llKeep(f), ph: i * 1.9 + x, big: 1 });
}
llBox(0.9, 0.1, 0.25, llM(0x4A2A1A), 0, 0.12, 0.05, g);
llMirror(G, x + Math.sin(ry) * 0.08, 2.7, z + Math.cos(ry) * 0.08, ry, 1.6, 1.6);
if (!LL.lite) {
llCandelabra(G, x - Math.cos(ry) * 0.9 + Math.sin(ry) * 0.1, 1.52, z + Math.sin(ry) * 0.9 + Math.cos(ry) * 0.1);
llVase(G, x + Math.cos(ry) * 0.9 + Math.sin(ry) * 0.1, 1.52, z - Math.sin(ry) * 0.9 + Math.cos(ry) * 0.1, 0.9);
}
llPS(x, z, 1.3, 0.4, ry, 1.5);
return g;
},
function (G, x, z, ry, w, h) {
w = w || 2;
h = h || 2.6;
var g = llPiece(G, x, z, ry), wd = llM(LLC.walnut);
llBox(w, h, 0.4, wd, 0, h / 2, 0, g);
var cols = [0x8A2A4A, 0x3A2A6A, 0x2A5A4A, 0xA88A4A, 0x6A3A6A, 0x4A3A2A];
for (var s = 0; s < 5; s++) {
var sy = 0.35 + s * (h - 0.5) / 5;
llBox(w - 0.1, 0.03, 0.36, llM(0x2A1810), 0, sy, 0.04, g);
if (!LL.lite) {
var bx = -w / 2 + 0.12;
while (bx < w / 2 - 0.15) {
var bw = 0.05 + ((bx * 97 | 0) % 3) * 0.02;
llBox(bw, 0.28, 0.24, llM(cols[((bx * 31 | 0) + s) % cols.length]), bx + bw / 2, sy + 0.15, 0.06, g);
bx += bw + 0.01;
}
}
else
llBox(w - 0.2, 0.26, 0.24, llM(cols[s % cols.length]), 0, sy + 0.14, 0.06, g);
}
llBox(w + 0.1, 0.08, 0.44, llGold(), 0, h, 0, g);
llPS(x, z, w / 2, 0.25, ry, h);
return g;
},
function (G, x, z, ry) {
var g = llPiece(G, x, z, ry), bk = llM(0x1A1018), gd = llGold();
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
llBox(1.5, 0.1, 0.25, llM(0xE0D8CC), 0, 0.88, 0.12, g);
for (var k = 0; k < 14; k++)
llBox(0.04, 0.03, 0.12, bk, -0.65 + k * 0.1, 0.94, 0.08, g);
[[-0.6, 0], [0.6, 0], [0, -1.9]].forEach(function (p) { llCyl(0.05, 0.04, 0.7, bk, p[0], 0.35, p[1], g, 6); });
llBox(0.9, 0.06, 0.4, llM(LLC.velvet), 0, 0.5, 0.75, g);
llBox(0.8, 0.5, 0.36, bk, 0, 0.25, 0.75, g);
llPS(x + Math.sin(ry) * -1, z + Math.cos(ry) * -1, 0.8, 1.3, ry, 1.2);
return g;
},
function (G, x, z, s) {
s = s || 1;
var g = llPiece(G, x, z, 0), mb = llM(0xC8A8B8, { map: "marble" }), gd = llGold();
llCyl(3 * s, 3.2 * s, 0.6, mb, 0, 0.3, 0, g, 28);
llCyl(2.8 * s, 2.8 * s, 0.05, llM(0x8A9AC8, { e: 0x1A2238, op: 0.85 }), 0, 0.56, 0, g, 28);
llCyl(0.35 * s, 0.5 * s, 1.6 * s, mb, 0, 1.2 * s, 0, g, 12);
llCyl(1.3 * s, 0.8 * s, 0.3 * s, mb, 0, 2.0 * s, 0, g, 20);
llCyl(0.2 * s, 0.3 * s, 0.9 * s, mb, 0, 2.6 * s, 0, g, 10);
llCyl(0.6 * s, 0.4 * s, 0.2 * s, mb, 0, 3.1 * s, 0, g, 16);
llSph(0.22 * s, gd, 0, 3.4 * s, 0, g, 10);
var sheet = llCyl(1.25 * s, 1.35 * s, 1.3 * s, llOwn(0xB8C8E8, 0.22), 0, 1.3 * s, 0, g, 20);
sheet.material.side = THREE.DoubleSide;
llKeep(sheet);
var sheet2 = llCyl(0.58 * s, 0.62 * s, 0.9 * s, llOwn(0xB8C8E8, 0.22), 0, 2.65 * s, 0, g, 16);
sheet2.material.side = THREE.DoubleSide;
llKeep(sheet2);
LL.water.push({ m: sheet, ph: 0 }, { m: sheet2, ph: 1.3 });
for (var i = 0; i < (LL.lite ? 3 : 8); i++) {
var a = i / 8 * 6.283;
llSph(0.12 * s, llM(LLC.pink), Math.cos(a) * 2.3 * s, 0.62, Math.sin(a) * 2.3 * s, g, 6);
}
llSolidR(x, z, 3.2 * s, 1.2);
return g;
},
function (G, x, z, ry, w) {
w = w || 3;
var g = llPiece(G, x, z, ry), wd = llM(LLC.wood);
llBox(w, 2.4, 0.6, wd, 0, 1.2, -0.05, g);
llBox(w - 0.2, 2.1, 0.02, llM(0xC8D0E8, { op: 0.2 }), 0, 1.25, 0.26, g);
for (var s = 0; s < 3; s++) {
var sy = 0.4 + s * 0.7;
llBox(w - 0.2, 0.03, 0.5, llM(0xD8D0E0, { op: 0.5 }), 0, sy, 0, g);
for (var t = 0; t < Math.floor(w / 0.6); t++) {
var tx = -w / 2 + 0.4 + t * 0.6, m = (t + s) % 3 === 0 ? llSilver() : llGold();
llCyl(0.06, 0.09, 0.06, m, tx, sy + 0.04, 0, g, 8);
llCyl(0.02, 0.02, 0.12, m, tx, sy + 0.13, 0, g, 6);
llCyl(0.12, 0.05, 0.16, m, tx, sy + 0.27, 0, g, 10);
}
}
llPS(x, z, w / 2, 0.35, ry, 2.4);
return g;
},
function (G, x0, z0, x1, z1, n) {
n = n || 3;
var col = llM(LLC.velvet);
for (var i = 0; i < n; i++) {
var f = i / (n - 1), x = x0 + (x1 - x0) * f, z = z0 + (z1 - z0) * f;
llCyl(0.05, 0.08, 0.95, llGold(), x, 0.48, z, G, 8);
llSph(0.07, llGold(), x, 0.98, z, G, 8);
llCyl(0.18, 0.18, 0.04, llGold(), x, 0.02, z, G, 10);
if (i < n - 1) {
var nx = x0 + (x1 - x0) * (i + 1) / (n - 1), nz = z0 + (z1 - z0) * (i + 1) / (n - 1), L = Math.hypot(nx - x, nz - z);
var r = llCyl(0.03, 0.03, L, col, (x + nx) / 2, 0.82, (z + nz) / 2, G, 5);
r.rotation.z = Math.PI / 2;
r.rotation.y = -Math.atan2(nz - z, nx - x);
}
}
},
function (G, x, z, w, ry, o) {
o = o || {};
var g = llPiece(G, x, z, ry);
llBox(w, 1.05, 0.7, llM(o.col || LLC.cream), 0, 0.53, 0, g);
llBox(w + 0.1, 0.06, 0.8, llM(o.top || 0xD8CCD4, { map: "marble" }), 0, 1.08, 0, g);
llBox(w, 0.08, 0.04, llGold(), 0, 0.95, 0.36, g);
llBox(w, 0.06, 0.04, llGold(), 0, 0.12, 0.36, g);
if (o.panel)
for (var i = 0; i < Math.floor(w / 0.9); i++)
llBox(0.6, 0.6, 0.02, llM(o.panel), -w / 2 + 0.45 + i * 0.9, 0.55, 0.36, g);
llPS(x, z, w / 2 + 0.05, 0.4, ry, 1.2);
return g;
},
function (G, x, z, w, ry) {
var g = llPiece(G, x, z, ry);
llBox(w, 0.9, 0.8, llM(LLC.cream), 0, 0.45, 0, g);
llBox(w, 0.6, 0.8, llM(0xE0E8F0, { op: 0.2 }), 0, 1.2, 0, g);
llBox(w + 0.04, 0.04, 0.84, llGold(), 0, 1.52, 0, g);
var cakes = [[LLC.pink, LLC.cream], [0x6A3A2A, 0xE8D8C8], [LLC.lilac, LLC.cream], [0xE8D0A0, 0xE8B8C8], [LLC.blush, LLC.rose]];
for (var i = 0; i < Math.floor(w / 0.5); i++) {
var c = cakes[i % cakes.length], cx = -w / 2 + 0.3 + i * 0.5;
llCyl(0.16, 0.16, 0.14, llM(c[0]), cx, 0.98, 0, g, 12);
llCyl(0.16, 0.16, 0.04, llM(c[1]), cx, 1.07, 0, g, 12);
if (!LL.lite)
llSph(0.03, llM(0xA02040), cx, 1.11, 0, g, 5);
}
llPS(x, z, w / 2, 0.42, ry, 1.5);
return g;
},
function (G, x, y, z) {
var g = llPiece(G, x, z, 0, y), sv = llSilver();
llCyl(0.01, 0.01, 0.45, sv, 0, 0.22, 0, g, 4);
[0.05, 0.2, 0.35].forEach(function (h, i) { llCyl(0.16 - i * 0.04, 0.16 - i * 0.04, 0.01, sv, 0, h, 0, g, 12); if (!LL.lite)
for (var k = 0; k < 4; k++) {
var a = k / 4 * 6.283;
llBox(0.05, 0.03, 0.05, llM([LLC.pink, 0xE8D0A0, LLC.lilac][i]), Math.cos(a) * (0.1 - i * 0.03), h + 0.02, Math.sin(a) * (0.1 - i * 0.03), g);
} });
return g;
},
function (G, x, z, ry, o) {
o = o || {};
var w = o.w || 2.2, L = o.l || 2.3, g = llPiece(G, x, z, ry), gd = llGold(), f = llM(o.col || LLC.purple);
llBox(w, 0.45, L, llM(LLC.walnut), 0, 0.25, 0, g);
llBox(w - 0.06, 0.25, L - 0.1, llM(LLC.cream), 0, 0.6, 0.02, g);
llBox(w + 0.02, 0.1, L * 0.62, llM(o.quilt || LLC.rose), 0, 0.74, L * 0.18, g);
llBox(w + 0.06, 0.36, 0.04, llM(o.quilt || LLC.rose), 0, 0.6, L * 0.49, g);
for (var i = 0; i < (LL.lite ? 2 : 4); i++)
llBox(w / 2.4, 0.22, 0.4, llM(i % 2 ? LLC.blush : LLC.pink), -w / 4 + ((i % 2) * w / 2), 0.86 + ((i / 2 | 0)) * 0.1, -L / 2 + 0.35 + ((i / 2 | 0)) * 0.18, g);
llBox(w + 0.3, 1.7, 0.18, f, 0, 1.25, -L / 2 - 0.05, g);
llBox(w + 0.4, 0.1, 0.22, gd, 0, 2.12, -L / 2 - 0.05, g);
if (!LL.lite)
for (var b = 0; b < 12; b++)
llSph(0.03, gd, -w / 2 + 0.2 + (b % 6) * (w - 0.4) / 5, 1.0 + (b / 6 | 0) * 0.5, -L / 2 + 0.05, g, 4);
if (o.canopy) {
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { llCyl(0.05, 0.05, 2.9, gd, p[0] * (w / 2 + 0.1), 1.45, p[1] * (L / 2 + 0.05), g, 6); });
llBox(w + 0.4, 0.12, L + 0.3, llM(LLC.velvet), 0, 2.9, 0, g);
var dr = llM(LLC.blush, { op: 0.55, ds: true });
[[-1], [1]].forEach(function (p) { llBox(0.04, 2.4, L * 0.4, dr, p[0] * (w / 2 + 0.15), 1.65, -L / 2 + 0.4, g); llBox(0.04, 2.4, L * 0.4, dr, p[0] * (w / 2 + 0.15), 1.65, L / 2 - 0.4, g); });
}
llBox(w * 0.7, 0.42, 0.42, llM(LLC.blush), 0, 0.25, L / 2 + 0.4, g);
llPS(x + Math.sin(ry) * 0.1, z + Math.cos(ry) * 0.1, w / 2 + 0.15, L / 2 + 0.25, ry, 1);
[-1, 1].forEach(function (sd) {
var lx = sd * (w / 2 + 0.45), c = Math.cos(ry), s = Math.sin(ry), wx = x + lx * c + (-L / 2 + 0.4) * s, wz = z - lx * s + (-L / 2 + 0.4) * c;
var t = llPiece(G, wx, wz, ry);
llBox(0.55, 0.6, 0.45, llM(LLC.cream), 0, 0.3, 0, t);
llBox(0.58, 0.03, 0.48, gd, 0, 0.61, 0, t);
llCyl(0.08, 0.1, 0.3, gd, 0, 0.78, 0, t, 8);
llCyl(0.12, 0.2, 0.24, llM(LLC.blush, { e: 0x4A3038 }), 0, 1.04, 0, t, 12);
llSolid(wx, wz, 0.3, 0.25, ry, 0.8);
});
return g;
},
function (G, x, z, ry) {
var g = llPiece(G, x, z, ry);
llBox(1.4, 0.06, 0.5, llM(LLC.cream), 0, 0.78, 0, g);
llBox(0.4, 0.75, 0.48, llM(LLC.cream), -0.5, 0.38, 0, g);
llBox(0.4, 0.75, 0.48, llM(LLC.cream), 0.5, 0.38, 0, g);
llBox(1.44, 0.03, 0.52, llGold(), 0, 0.81, 0, g);
var m = wMesh(new THREE.CircleGeometry(0.5, 24), llM(0xA8B0C8, { e: 0x2A2E3A }), 0, 1.45, -0.2, g);
wMesh(new THREE.TorusGeometry(0.5, 0.04, 6, 24), llGold(), 0, 1.45, -0.2, g);
if (!LL.lite) {
for (var i = 0; i < 5; i++)
llCyl(0.025, 0.03, 0.08 + i % 2 * 0.04, [llM(LLC.pink), llGold(), llSilver(), llM(LLC.lilac), llM(LLC.rose)][i], -0.4 + i * 0.14, 0.86, 0.05, g, 6);
llVase(G, x, 0.82, z, 0.6);
}
llPouf(G, x + Math.sin(ry) * 0.7, z + Math.cos(ry) * 0.7);
llPS(x, z, 0.72, 0.27, ry, 1.2);
return g;
},
function (G, x, z, ry) {
var g = llPiece(G, x, z, ry), p = llM(0xE2D8DE), gd = llGold();
var tub = llCyl(0.75, 0.6, 0.62, p, 0, 0.48, 0, g, 20);
tub.scale.z = 1.9;
llCyl(0.68, 0.68, 0.02, llM(0xB8C8E0, { op: 0.7 }), 0, 0.72, 0, g, 20).scale.z = 1.9;
[[-0.5, -1], [0.5, -1], [-0.5, 1], [0.5, 1]].forEach(function (q) { llSph(0.08, gd, q[0], 0.1, q[1], g, 6); });
llCyl(0.02, 0.02, 0.4, gd, 0, 0.95, -1.25, g, 5);
llPS(x, z, 0.8, 1.4, ry, 0.9);
return g;
},
function (G, x, z, ry, n) {
n = n || 1;
var g = llPiece(G, x, z, ry), w = 1.2 * n;
llBox(w, 0.85, 0.55, llM(LLC.cream), 0, 0.43, 0, g);
llBox(w + 0.06, 0.06, 0.6, llM(0xD8CCD4, { map: "marble" }), 0, 0.88, 0, g);
for (var i = 0; i < n; i++) {
var bx = -w / 2 + 0.6 + i * 1.2;
llCyl(0.22, 0.18, 0.08, llM(0xE6DEE4), bx, 0.88, 0.02, g, 14);
llCyl(0.015, 0.015, 0.25, llGold(), bx, 1.0, -0.2, g, 4);
llMirror(G, x + Math.cos(ry) * bx - Math.sin(ry) * 0.3, 1.7, z - Math.sin(ry) * bx - Math.cos(ry) * 0.3, ry, 0.9, 1.0);
}
llPS(x, z, w / 2, 0.3, ry, 1);
return g;
},
function (G, x, z, ry, o) {
o = o || {};
var w = o.w || 2.2, g = llPiece(G, x, z, ry), gd = llGold(), wd = llM(o.col || LLC.cream);
llBox(w, 0.08, 1.0, wd, 0, 0.78, 0, g);
llBox(w + 0.06, 0.03, 1.06, gd, 0, 0.83, 0, g);
llBox(0.6, 0.72, 0.95, wd, -w / 2 + 0.32, 0.37, 0, g);
llBox(0.6, 0.72, 0.95, wd, w / 2 - 0.32, 0.37, 0, g);
for (var i = 0; i < 3; i++) {
llBox(0.5, 0.18, 0.02, llM(LLC.blush), -w / 2 + 0.32, 0.6 - i * 0.22, 0.48, g);
llBox(0.5, 0.18, 0.02, llM(LLC.blush), w / 2 - 0.32, 0.6 - i * 0.22, 0.48, g);
}
llBox(w - 1.3, 0.1, 0.02, gd, 0, 0.7, 0.49, g);
if (!LL.lite) {
llBox(0.5, 0.02, 0.36, llM(0x3A1A4A), 0, 0.83, 0.1, g);
llCyl(0.04, 0.04, 0.12, gd, 0.7, 0.88, -0.2, g, 6);
llBox(0.32, 0.04, 0.24, llM(0xE6DCE4), -0.6, 0.84, 0.05, g);
llCyl(0.07, 0.09, 0.32, gd, -w / 2 + 0.25, 0.98, -0.3, g, 8);
llCyl(0.14, 0.22, 0.24, llM(LLC.blush, { e: 0x4A3038 }), -w / 2 + 0.25, 1.22, -0.3, g, 12);
}
llPS(x, z, w / 2 + 0.05, 0.55, ry, 1);
return g;
},
function (G, x, z, ry, col) {
var g = llPiece(G, x, z, ry), f = llM(col || LLC.velvet), gd = llGold();
llBox(0.75, 0.14, 0.7, f, 0, 0.52, 0, g);
llBox(0.75, 1.3, 0.16, f, 0, 1.25, -0.3, g);
var crown = llBox(0.85, 0.14, 0.2, gd, 0, 1.95, -0.3, g);
llBox(0.12, 0.3, 0.6, gd, -0.4, 0.75, 0, g);
llBox(0.12, 0.3, 0.6, gd, 0.4, 0.75, 0, g);
llCyl(0.04, 0.04, 0.45, gd, 0, 0.25, 0, g, 6);
llCyl(0.35, 0.35, 0.04, gd, 0, 0.03, 0, g, 10);
if (!LL.lite)
for (var b = 0; b < 9; b++)
llSph(0.03, gd, -0.25 + (b % 3) * 0.25, 0.9 + (b / 3 | 0) * 0.32, -0.21, g, 4);
llPS(x, z, 0.42, 0.4, ry, 1.3);
return g;
},
function (G, x, z, ry, w) {
var g = llPiece(G, x, z, ry);
for (var s = 0; s < 4; s++) {
llBox(w, 0.04, 0.6, llSilver(), 0, 0.2 + s * 0.55, 0, g);
for (var b = 0; b < Math.floor(w / 0.6); b++)
llBox(0.5, 0.4, 0.5, llM([0xC8A888, 0xB89878, LLC.pink, LLC.lav][(b + s) % 4]), -w / 2 + 0.3 + b * 0.6, 0.42 + s * 0.55, 0, g);
}
[-1, 1].forEach(function (sd) { llBox(0.04, 2.3, 0.6, llSilver(), sd * w / 2, 1.15, 0, g); });
llPS(x, z, w / 2, 0.32, ry, 2.3);
return g;
},
function (G, x, z, w, ry) {
var g = llPiece(G, x, z, ry);
llBox(w, 0.9, 0.65, llM(LLC.cream), 0, 0.45, 0, g);
llBox(w + 0.04, 0.05, 0.68, llM(0xD8CCD4, { map: "marble" }), 0, 0.92, 0, g);
llBox(w, 0.75, 0.38, llM(LLC.cream), 0, 1.95, -0.14, g);
for (var i = 0; i < Math.floor(w / 0.6); i++) {
llSph(0.02, llGold(), -w / 2 + 0.3 + i * 0.6, 0.7, 0.33, g, 4);
llSph(0.02, llGold(), -w / 2 + 0.3 + i * 0.6, 1.7, 0.06, g, 4);
}
llPS(x, z, w / 2, 0.35, ry, 1);
return g;
},
function (G, x, z, ry) {
var g = llPiece(G, x, z, ry);
llBox(1.2, 0.9, 0.68, llM(0x8A2A4A), 0, 0.45, 0, g);
llBox(1.22, 0.05, 0.7, llM(0x1A1018), 0, 0.92, 0, g);
for (var i = 0; i < 4; i++)
wMesh(new THREE.TorusGeometry(0.1, 0.015, 4, 12), llSilver(), -0.28 + (i % 2) * 0.56, 0.96, -0.15 + (i / 2 | 0) * 0.3, g).rotation.x = Math.PI / 2;
llBox(1.0, 0.4, 0.02, llM(0x2A2028), 0, 0.45, 0.35, g);
llBox(0.9, 0.04, 0.04, llGold(), 0, 0.72, 0.37, g);
llBox(1.3, 0.6, 0.7, llSilver(), 0, 2.0, -0.1, g);
llPS(x, z, 0.62, 0.36, ry, 1);
return g;
},
function (G, x, z, ry) {
var g = llPiece(G, x, z, ry), gd = llGold();
llBox(0.25, 0.15, 0.4, gd, 0, 0.08, 0, g);
llBox(0.12, 1.7, 0.12, gd, 0, 0.95, -0.15, g);
var arc = wMesh(new THREE.TorusGeometry(0.55, 0.05, 6, 16, Math.PI * 0.9), gd, 0.1, 1.45, 0, g);
arc.rotation.y = Math.PI / 2;
for (var i = 0; i < 8; i++)
llBox(0.005, 1.2 - i * 0.1, 0.005, llM(0xE8E0D0), 0, 0.85, 0.02 + i * 0.06, g);
llSolidR(x, z, 0.4, 1.8);
return g;
},
function (G) {
var mWall = llM(0xE8DCEC, { map: "damask" }), mPink = llM(0xC88AAE, { map: "pinkdamask" }), mCarpet = llM(0xE8DCEC, { map: "carpet" }), mRose = llM(0xF0E0EA, { map: "rosecarpet" }), mMarble = llM(0xD2C6CE, { map: "marble" }), mParq = llM(0xF0E4DC, { map: "parquet" }), mTile = llM(0xD4C8D0, { map: "tile" }), mCoffer = llM(0xE8D4E8, { map: "coffer", e: 0x2A1430 }), mStaffWall = llM(0xB8A8C0), mStaffFloor = llM(0x8A7A8A), mLav = llM(0xA898C0), gold = llGold();
var F = llWing(G, "foyer", -30, 30, 42, 65);
llRoom(F, -30, 30, 42, 65, { name: "the Grand Foyer", h: 9, wall: mPink, floor: mMarble, ftile: 2.5,
gaps: [{ s: "n", c: 0, w: 8, h: 4.2 }, { s: "w", c: 54, w: 3.6 }, { s: "e", c: 59, w: 3 }, { s: "e", c: 47, w: 3 }, { s: "s", c: 10, w: 3.6, h: 4.2 }], skip: ["n"] });
llPlace("foyer", 0, 56, "The Grand Foyer");
llSign(F, ["THE HOTEL & RESORT", "rooms · pools · gardens · spa · games"], 4.2, 1, 10, 5.0, 64.7, Math.PI, "#3A1A4A", "#E8CFA0");
[-1.4, 1.4].forEach(function (dx) { llBox(2.6, 4.6, 0.2, llM(LLC.velvet), dx, 2.3, 64.75, F); llBox(0.08, 3.6, 0.24, gold, dx + (dx < 0 ? 1.1 : -1.1), 2.3, 64.7, F); for (var p = 0; p < 3; p++)
llBox(2.2, 0.08, 0.22, gold, dx, 1.2 + p * 1.2, 64.68, F); });
llBox(6.4, 0.5, 0.4, gold, 0, 4.85, 64.7, F);
llSign(F, ["GIGI'S LOUNGE", "Welcome, darling"], 5.5, 1.3, 0, 6.2, 64.7, Math.PI, "#3A1A4A", "#E8CFA0");
llSpot({ x: 0, z: 62.4, r: 2.4, name: "The front doors: out to Somnucor", verb: "go out", fn: llGoOut });
llFountain(F, 0, 53, 1);
llChandelier(F, 0, 8.2, 53, 1.8, { tiers: 4 });
llChandelier(F, -18, 8.2, 53, 1.2);
llChandelier(F, 18, 8.2, 53, 1.2);
[[-8, 46], [8, 46], [-8, 60], [8, 60]].forEach(function (q) { llColumn(F, q[0], q[1], 9); });
llRug(F, 0, 53, 14, 14, 0, LLC.rose, LLC.gold);
llCounter(F, -22, 50, 6, Math.PI / 2, { col: LLC.cream, panel: LLC.blush });
llBox(0.1, 2.6, 7, llM(LLC.velvet), -29.6, 3, 50, F);
llSign(F, ["CONCIERGE"], 3, 0.6, -29.5, 4.8, 50, Math.PI / 2, "#3A1A4A", "#E8CFA0");
llVase(F, -22, 1.11, 52.4, 1.3);
llSpot({ x: -20.2, z: 50, r: 2.6, name: "The concierge: where would you like to go?", verb: "ask", fn: llConcierge });
llStaff({ title: "Concierge", x: -23.2, z: 50, ry: Math.PI / 2, seed: "concierge", talk: "concierge" });
llCounter(F, 22, 53, 5, -Math.PI / 2, { col: LLC.cream, panel: LLC.blush });
for (var c = 0; c < 10; c++)
llBox(0.5, 1.2, 0.08, llM([LLC.plum, LLC.rose, 0x2A2A3A, LLC.lav, 0x6A4A3A][c % 5]), 28.6, 2.2, 49 + c * 0.85, F);
llBox(0.06, 0.06, 9, gold, 28.8, 2.85, 53, F);
llSign(F, ["THE COAT ROOM"], 3, 0.6, 29.5, 4.4, 53, -Math.PI / 2, "#3A1A4A", "#E8CFA0");
llSpot({ x: 20.2, z: 53, r: 2.4, name: "The coat room", verb: "hand in your coat", fn: llCoat });
llStaff({ title: "Coat room attendant", x: 23.4, z: 53, ry: -Math.PI / 2, seed: "coat" });
llBoard(F, "tonight", -12, 3.2, 42.35, 0, 6, 3.4);
llBoard(F, "tourney", 12, 3.2, 42.35, 0, 6, 3.4);
llSpot({ x: -12, z: 44.6, r: 2.6, name: "Tonight at the Lounge", verb: "read", fn: llTonightCard });
llSpot({ x: 12, z: 44.6, r: 2.6, name: "The tournaments board", verb: "read", fn: llTourneyCard });
llCrestBoard(F, 0, 6.6, 42.4, 0);
[[-24, 62, 0.3], [24, 62, -0.3]].forEach(function (q) { llSofa(F, q[0], q[1], Math.PI + q[2], LLC.purple, 3.2); });
llSofa(F, -27.6, 44.5, Math.PI / 2, LLC.rose, 2.6);
llSofa(F, 27.6, 44, -Math.PI / 2, LLC.rose, 2.2);
[[-14, 62.6], [14, 62.6], [-28.4, 61], [28.4, 62.4]].forEach(function (q) { llPlant(F, q[0], q[1], "palm", 1.2); });
[[-6, 62.8], [6, 62.8]].forEach(function (q) { llPlant(F, q[0], q[1], "roses", 1.1); });
for (var s = 0; s < 4; s++) {
llSconce(F, -29.75, 3.4, 45 + s * 5, Math.PI / 2);
llSconce(F, 29.75, 3.4, 44 + s * 5.5, -Math.PI / 2);
}
llPainting(F, -20, 4.2, 64.75, Math.PI, 3, 2.2, 1);
llPainting(F, 20, 4.2, 64.75, Math.PI, 3, 2.2, 2);
llStaff({ title: "Valet", x: 3.4, z: 63.2, ry: Math.PI, seed: "valet1" });
llStaff({ title: "Doorman", x: -3.4, z: 63.2, ry: Math.PI, seed: "door1", talk: "doorman" });
var P = llWing(G, "promenade", -10, 10, -38, 42);
llSpot({ x: 0, z: 2, r: 3, name: "The Lounge directory: every room and what it is for", verb: "read", fn: llConcierge });
llRoom(P, -10, 10, -38, 42, { name: "the Grand Promenade", h: 7, wall: mWall, floor: mMarble, ftile: 2.5,
gaps: [{ s: "s", c: 0, w: 8, h: 4.2 }, { s: "n", c: 0, w: 8, h: 4.2 }, { s: "w", c: 22, w: 5, h: 4.2 }, { s: "w", c: -18, w: 5, h: 4.2 }, { s: "e", c: 22, w: 5, h: 4.2 }, { s: "e", c: -18, w: 5, h: 4.2 }] });
llPlace("promenade", 0, 2, "The Grand Promenade");
llBox(3, 0.02, 78, llM(LLC.velvet), 0, 0.025, 2, P);
llBox(3.3, 0.015, 78, gold, 0, 0.02, 2, P);
for (var k = 0; k < 5; k++)
llChandelier(P, 0, 6.4, -30 + k * 16, 1.0);
[[-9.8, Math.PI / 2], [9.8, -Math.PI / 2]].forEach(function (w) {
[32, 8, -4, -30].forEach(function (z, i) { llPainting(P, w[0] + (w[0] < 0 ? 0.08 : -0.08), 3.4, z, w[1], 2.4, 1.8, i + (w[0] < 0 ? 0 : 4)); });
[36, 12, 2, -8, -26, -34].forEach(function (z, i) { llSconce(P, w[0] + (w[0] < 0 ? 0.05 : -0.05), 3.0, z, w[1]); });
[28, -2, -32].forEach(function (z) { llSofa(P, w[0] + (w[0] < 0 ? 0.7 : -0.7), z, w[1], LLC.rose, 2.2); });
[16, -12].forEach(function (z) { llPlant(P, w[0] + (w[0] < 0 ? 0.8 : -0.8), z, "palm", 1.1); });
});
llSign(P, ["THE BINGO HALL"], 4, 0.7, -9.75, 4.9, 22, Math.PI / 2);
llSign(P, ["THE ROSE TEA ROOM"], 4, 0.7, -9.75, 4.9, -18, Math.PI / 2);
llSign(P, ["THE MAHJONG PARLOUR"], 4, 0.7, 9.75, 4.9, 22, -Math.PI / 2);
llSign(P, ["THE CARD SALON"], 4, 0.7, 9.75, 4.9, -18, -Math.PI / 2);
llSign(P, ["THE CROWN ROOM", "tournaments"], 4.4, 1.1, 0, 5.3, -37.75, 0);
[[-3.6, 30], [3.6, 30], [-3.6, -6], [3.6, -6]].forEach(function (q, i) {
var p = llPiece(P, q[0], q[1], 0);
llCyl(0.35, 0.4, 1.1, mMarble, 0, 0.55, 0, p, 12);
llCyl(0.42, 0.42, 0.06, gold, 0, 1.12, 0, p, 12);
if (i % 2)
llVase(P, q[0], 1.15, q[1], 1.4);
else {
llCyl(0.12, 0.18, 0.3, gold, q[0], 1.3, q[1], P, 10);
llCyl(0.22, 0.08, 0.3, gold, q[0], 1.6, q[1], P, 12);
}
llSolidR(q[0], q[1], 0.5, 1.2);
});
llStaff({ title: "Floor host", x: 3, z: 12, ry: -Math.PI / 2, seed: "floorhost", wander: 4 });
llStaff({ title: "Housekeeper", x: -4, z: -22, ry: 0, seed: "keep1", wander: 10 });
llBingoHall(G, { mWall: mWall, mCarpet: mCarpet, mMarble: mMarble, gold: gold });
llMahjongParlour(G, { mPink: mPink, mWall: mWall, mRose: mRose, gold: gold });
llTeaRoom(G, { mPink: mPink, mParq: mParq, gold: gold });
llCardSalon(G, { mWall: mWall, mCarpet: mCarpet, gold: gold });
llCrownRoom(G, { mWall: mWall, mCarpet: mCarpet, mMarble: mMarble, gold: gold });
llStaffWing(G, { mStaffWall: mStaffWall, mStaffFloor: mStaffFloor, mTile: mTile, gold: gold });
llSuite(G, { mPink: mPink, mRose: mRose, mMarble: mMarble, gold: gold });
llSouthRooms(G, { mPink: mPink, mWall: mWall, mTile: mTile, mMarble: mMarble, mCarpet: mCarpet, gold: gold });
},
function (G, kind, x, y, z, ry, w, h) {
var cv = document.createElement("canvas");
cv.width = 512;
cv.height = Math.round(512 * h / w);
var tex = new THREE.CanvasTexture(cv);
var g = llPiece(G, x, z, ry, y);
llBox(w + 0.3, h + 0.3, 0.1, llGold(), 0, 0, 0, g);
var face = wMesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, color: 0xD8D0D8 }), 0, 0, 0.06, g);
llKeep(face);
var S = { kind: kind, cv: cv, tex: tex, sig: "" };
LL.screens.push(S);
llScreenDraw(S);
return S;
},
function (G, x, y, z, ry) {
var t = wTex(512, 320, function (c, W, H) {
c.fillStyle = "#3A1A4A";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#C9A868";
c.lineWidth = 8;
c.strokeRect(10, 10, W - 20, H - 20);
for (var i = 0; i < 22; i++) {
var a = Math.PI * 0.15 + i / 21 * Math.PI * 1.7, cx = W / 2 + Math.cos(a) * 92, cy = 135 + Math.sin(a) * 92;
c.fillStyle = i % 2 ? "#C87AA0" : "#E8B8CC";
c.beginPath();
c.arc(cx, cy, 12, 0, 7);
c.fill();
c.fillStyle = "#4A7A4A";
c.beginPath();
c.ellipse(cx + 10, cy + 6, 8, 4, a, 0, 7);
c.fill();
}
c.fillStyle = "#E0C890";
c.font = "bold 130px Georgia";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText("G", W / 2, 140);
c.font = "italic 30px Georgia";
c.fillStyle = "#E8D8E0";
c.fillText("made with love, for our Grandmother", W / 2, 280);
});
var g = llPiece(G, x, z, ry, y);
llBox(5.2, 3.4, 0.1, llGold(), 0, 0, 0, g);
wMesh(new THREE.PlaneGeometry(5, 3.2), new THREE.MeshLambertMaterial({ map: t }), 0, 0, 0.06, g);
return g;
},
function (G, M) {
var B = llWing(G, "bingo", -80, -10, 2, 42);
llRoom(B, -80, -10, 2, 42, { name: "the Bingo Hall", h: 9, wall: M.mWall, floor: M.mCarpet,
gaps: [{ s: "e", c: 22, w: 5, h: 4.2 }, { s: "s", c: -55, w: 4 }], skip: ["e"] });
llPlace("bingo", -45, 26, "The Bingo Hall");
llBox(34, 1, 7, llM(LLC.plum), -45, 0.5, 5.6, B);
llBox(34.2, 0.08, 7.2, M.gold, -45, 1.02, 5.6, B);
llPad(-62, -28, 2, 9.1, 1);
llRamp(-48, -42, 9.1, 12, 1, 0, "z");
for (var st = 0; st < 4; st++)
llBox(6, 0.25, 0.72, llM(LLC.velvet), -45, 0.125 + st * 0.25, 11.6 - st * 0.72, B);
var drape = llM(LLC.velvet);
llBox(36, 9, 0.2, drape, -45, 4.5, 2.25, B);
for (var d = 0; d < 9; d++)
llBox(0.5, 8.8, 0.3, llM(d % 2 ? LLC.berry : LLC.velvet), -62 + d * 4.25, 4.5, 2.4, B);
llBox(36.5, 0.6, 0.5, M.gold, -45, 8.6, 2.6, B);
LL.bingoBoard = llBingoBoard(B, -45, 5.8, 2.6, 0, 22, 4.6);
LL.bingoBall = llBallScreen(B, -67.5, 4.4, 2.6, 0, 6, 3.4);
llBallScreen(B, -22.5, 4.4, 2.6, 0, 6, 3.4, true);
var cage = llBallCage(B, -51, 1, 6);
var pod = llPiece(B, -41, 6, 0, 1);
llBox(1.4, 1.2, 0.8, llM(LLC.cream), 0, 0.6, 0, pod);
llBox(1.5, 0.06, 0.9, M.gold, 0, 1.22, 0, pod);
llCyl(0.02, 0.02, 0.4, llSilver(), 0.3, 1.42, 0, pod, 5);
llSph(0.06, llM(0x2A2A30), 0.3, 1.65, 0, pod, 8);
llSolid(-41, 6, 0.8, 0.5, 0, 2.4, 1);
llSpot({ x: -41, z: 8.2, y: 1, r: 2.4, name: "The caller's podium", verb: "use", fn: llCallerCard });
llStaff({ title: "Bingo caller", x: -41, z: 5.2, y: 1, ry: 0, seed: "caller1", talk: "caller" });
llStaff({ title: "Bingo caller", x: -54, z: 5.6, y: 1, ry: 0.3, seed: "caller2" });
var cols = [-70, -57, -33, -20], rows = [15, 20.5, 26, 31.5, 37];
var card = llM(0xE8C8D8), daub = [llM(LLC.rose), llM(LLC.purple), llM(0x2A8A9A), llM(LLC.gold)];
rows.forEach(function (z, ri) {
cols.forEach(function (x, ci) {
llRectTable(B, x, z, 9, 1.1, 0, { cloth: ri % 2 ? LLC.plum : LLC.berry, top: LLC.cream, runner: LLC.gold });
for (var i = 0; i < 4; i++) {
var cx = x - 3.4 + i * 2.27;
llChair(B, cx, z - 1.05, 0, ri % 2 ? LLC.rose : LLC.purple);
llChair(B, cx, z + 1.05, Math.PI, ri % 2 ? LLC.rose : LLC.purple);
if (!LL.lite || i % 2 === 0) {
llBox(0.42, 0.01, 0.3, card, cx, 0.785, z - 0.3, B);
llBox(0.42, 0.01, 0.3, card, cx + 0.1, 0.785, z + 0.3, B);
llCyl(0.03, 0.035, 0.14, daub[(i + ci + ri) % 4], cx + 0.3, 0.85, z - 0.28, B, 6);
}
}
llSpot({ x: x, z: z - 1.9, r: 3.2, name: "A seat at the Bingo tables", verb: "play Bingo", fn: llBingoOpen });
llSpot({ x: x, z: z + 1.9, r: 3.2, name: "A seat at the Bingo tables", verb: "play Bingo", fn: llBingoOpen });
});
});
llCounter(B, -74, 40.2, 6, Math.PI, { col: LLC.cream, panel: LLC.blush });
llSign(B, ["BINGO CARDS", "free, every game"], 3.4, 1, -74, 3.6, 41.75, Math.PI);
llSpot({ x: -74, z: 38.2, r: 2.6, name: "The card desk: a card for the next game", verb: "take a card", fn: llBingoOpen });
llStaff({ title: "Bingo cashier", x: -74, z: 41.2, ry: Math.PI, seed: "bcash" });
llRectTable(B, -28, 9.6, 8, 1.2, 0, { cloth: LLC.velvet, top: LLC.cream });
for (var p = 0; p < 6; p++) {
var px = -31.2 + p * 1.3;
llBox(0.7, 0.45, 0.5, llM([LLC.pink, LLC.lilac, LLC.blush][p % 3]), px, 1.0, 9.6, B);
llSph(0.18, llM([LLC.rose, LLC.gold, LLC.silver][p % 3]), px, 1.38, 9.6, B, 8);
}
llSign(B, ["TONIGHT'S PRIZES"], 3, 0.6, -28, 2.2, 10.3, 0);
llSpot({ x: -28, z: 11.6, r: 2.4, name: "Tonight's prizes", verb: "look", fn: llPrizesCard });
for (var k = 0; k < 3; k++) {
llChandelier(B, -62, 8.2, 16 + k * 10, 1.2);
llChandelier(B, -28, 8.2, 16 + k * 10, 1.2);
}
for (var w = 0; w < 4; w++) {
llWindow(B, -79.8, 4, 10 + w * 9, Math.PI / 2, 2.4, 3.2);
}
[[-78.4, 4], [-78.4, 40], [-11.6, 40]].forEach(function (q) { llPlant(B, q[0], q[1], "palm", 1.2); });
for (var sc = 0; sc < 6; sc++)
llSconce(B, -10.25, 3.4, 6 + sc * 6, -Math.PI / 2);
llStaff({ title: "Bingo floor runner", x: -45, z: 24, ry: Math.PI, seed: "runner", wander: 12 });
var cart = llPiece(B, -14, 36, -Math.PI / 2);
llBox(1.6, 0.9, 0.8, llM(LLC.cream), 0, 0.6, 0, cart);
llBox(1.7, 0.05, 0.9, M.gold, 0, 1.06, 0, cart);
llBox(1.7, 0.05, 0.9, llM(LLC.pink), 0, 2.1, 0, cart);
[-0.7, 0.7].forEach(function (dx) { llCyl(0.02, 0.02, 1.1, M.gold, dx, 1.6, 0, cart, 4); });
llSolid(-14, 36, 0.5, 0.9, 0, 1.2);
llSpot({ x: -16, z: 36, r: 2.4, name: "The snack cart", verb: "buy a treat", fn: function () { llMenuCard("cart"); } });
llStaff({ title: "Tea room server", x: -13.2, z: 37.8, ry: -Math.PI / 2, seed: "cart" });
},
function (G, x, y, z, ry, w, h) {
var cv = document.createElement("canvas");
cv.width = 1024;
cv.height = Math.round(1024 * h / w);
var tex = new THREE.CanvasTexture(cv);
var g = llPiece(G, x, z, ry, y);
llBox(w + 0.4, h + 0.4, 0.12, llGold(), 0, 0, 0, g);
llKeep(wMesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, color: 0xE0D6E0 }), 0, 0, 0.07, g));
var S = { kind: "bingo", cv: cv, tex: tex, sig: "" };
LL.screens.push(S);
llScreenDraw(S);
return S;
},
function (G, x, y, z, ry, w, h, stats) {
var cv = document.createElement("canvas");
cv.width = 384;
cv.height = Math.round(384 * h / w);
var tex = new THREE.CanvasTexture(cv);
var g = llPiece(G, x, z, ry, y);
llBox(w + 0.3, h + 0.3, 0.1, llGold(), 0, 0, 0, g);
llKeep(wMesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, color: 0xE0D6E0 }), 0, 0, 0.06, g));
var S = { kind: stats ? "bingostats" : "ball", cv: cv, tex: tex, sig: "" };
LL.screens.push(S);
llScreenDraw(S);
return S;
},
function (G, x, y, z) {
var g = llPiece(G, x, z, 0, y);
llBox(1.2, 0.9, 0.8, llM(LLC.cream), 0, 0.45, 0, g);
llBox(1.3, 0.05, 0.9, llGold(), 0, 0.92, 0, g);
[-0.55, 0.55].forEach(function (dx) { llBox(0.06, 0.9, 0.06, llGold(), dx, 1.4, 0, g); });
var drum = new THREE.Group();
drum.position.set(0, 1.75, 0);
g.add(llKeep(drum));
for (var i = 0; i < 8; i++) {
var r = wMesh(new THREE.TorusGeometry(0.5, 0.015, 4, 20), llGold(), 0, 0, 0, drum);
r.rotation.y = i / 8 * Math.PI;
}
var R = wRand(17);
for (var b = 0; b < (LL.lite ? 6 : 14); b++)
llSph(0.07, llM([0xE8D8E0, LLC.pink, LLC.lilac, 0xE8D8A0][b % 4]), (R() - 0.5) * 0.6, (R() - 0.6) * 0.5, (R() - 0.5) * 0.6, drum, 6);
LL.spin.push({ m: drum, ax: "x", sp: 0.6 });
llSolid(x, z, 0.7, 0.5, 0, 2.4, y);
return g;
},
function (G, M) {
var Mj = llWing(G, "mahjong", 10, 80, 2, 42);
llRoom(Mj, 10, 80, 2, 42, { name: "the Mahjong Parlour", h: 7, wall: M.mPink, floor: M.mRose,
gaps: [{ s: "w", c: 22, w: 5, h: 4.2 }, { s: "s", c: 65, w: 4 }], skip: ["w"] });
llPlace("mahjong", 45, 22, "The Mahjong Parlour");
var mg = llPiece(Mj, 13, 22, Math.PI / 2);
var ring = wMesh(new THREE.TorusGeometry(2.8, 0.35, 8, 28), llM(LLC.berry), 0, 3, 0, mg);
llKeep(ring);
ring.userData.keep = 0;
wMesh(new THREE.TorusGeometry(3.15, 0.06, 6, 28), llGold(), 0, 3, 0, mg);
var tiles = llM(0xE6DCC8), back = llM(0x2A7A6A), felt = llM(0xE0D4E8, { map: "felt" });
for (var r = 0; r < 3; r++)
for (var c = 0; c < 4; c++) {
var x = 24 + c * 13, z = 10 + r * 11;
var t = llPiece(Mj, x, z, 0);
llBox(1.3, 0.06, 1.3, felt, 0, 0.78, 0, t);
llBox(1.42, 0.1, 1.42, llM(LLC.wood), 0, 0.72, 0, t);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { llBox(0.08, 0.7, 0.08, llGold(), p[0] * 0.6, 0.35, p[1] * 0.6, t); });
for (var s = 0; s < 4; s++) {
var a = s * Math.PI / 2, ox = Math.sin(a) * 0.42, oz = Math.cos(a) * 0.42;
var wall = llBox(0.66, 0.045, 0.06, tiles, ox, 0.84, oz, t);
wall.rotation.y = a;
if (!LL.lite) {
var w2 = llBox(0.66, 0.02, 0.06, back, ox, 0.875, oz, t);
w2.rotation.y = a;
}
var hand = llBox(0.5, 0.07, 0.03, tiles, Math.sin(a) * 0.58, 0.85, Math.cos(a) * 0.58, t);
hand.rotation.y = a;
}
llSolidR(x, z, 0.85, 1);
for (var k = 0; k < 4; k++) {
var b = k * Math.PI / 2;
llChair(Mj, x + Math.sin(b) * 1.25, z + Math.cos(b) * 1.25, b + Math.PI, k % 2 ? LLC.rose : LLC.purple);
}
llSpot({ x: x, z: z + 2.1, r: 2.4, name: "A Mahjong table", verb: "sit down to Mahjong", fn: llMahjongMenu });
llSpot({ x: x, z: z - 2.1, r: 2.4, name: "A Mahjong table", verb: "sit down to Mahjong", fn: llMahjongMenu });
}
for (var l = 0; l < (LL.lite ? 8 : 16); l++) {
var lx = 18 + (l % 8) * 8, lz = 8 + Math.floor(l / 8) * 24;
llCyl(0.01, 0.01, 1.2, llGold(), lx, 6.4, lz, Mj, 3);
var lan = llSph(0.45, llM(l % 2 ? LLC.pink : 0xC85A6A, { e: 0x4A2030 }), lx, 5.4, lz, Mj, 10);
lan.scale.y = 1.3;
llCyl(0.2, 0.2, 0.08, llGold(), lx, 5.95, lz, Mj, 8);
llCyl(0.2, 0.2, 0.08, llGold(), lx, 4.85, lz, Mj, 8);
}
for (var sc = 0; sc < 4; sc++) {
var sp = llPiece(Mj, 78, 8 + sc * 9, -Math.PI / 2);
for (var pn = 0; pn < 4; pn++) {
var pnl = llBox(0.9, 2.2, 0.05, llM(0xE8C8D0), -1.35 + pn * 0.9, 1.15, 0, sp);
pnl.rotation.y = (pn % 2 ? 0.25 : -0.25);
llBox(0.9, 0.06, 0.07, llGold(), -1.35 + pn * 0.9, 2.25, 0, sp).rotation.y = pnl.rotation.y;
}
llSolid(78, 8 + sc * 9, 0.3, 1.8, 0, 2.2);
}
var pool = llPiece(Mj, 70, 38, 0);
llBox(12, 0.5, 4.4, llM(0xC8A8B8, { map: "marble" }), 0, 0.25, 0, pool);
llBox(11.4, 0.05, 3.8, llM(0x4A7A9A, { e: 0x0A1A2A, op: 0.85 }), 0, 0.48, 0, pool);
for (var f = 0; f < (LL.lite ? 3 : 7); f++) {
var fish = llSph(0.16, llM(f % 2 ? 0xE87A3A : 0xE8D8D0), 0, 0.42, 0, Mj, 6);
fish.scale.set(1, 0.5, 2.2);
fish.position.set(70 + (f - 3) * 1.4, 0.42, 38);
LL.spin.push({ fish: llKeep(fish), cx: 70, cz: 38, r: 1 + f * 0.5, sp: 0.25 + f * 0.04, ph: f });
}
llSolid(70, 38, 6.1, 2.3, 0, 0.6);
llSign(Mj, ["THE MAHJONG PARLOUR", "tables, tiles and tea"], 5, 1.2, 45, 4.6, 2.25, 0, "#5A1A3A", "#F0D8A8");
llCounter(Mj, 45, 3.6, 6, 0, { col: LLC.cream, panel: LLC.blush });
llTeaSet(Mj, 43.6, 1.11, 3.6);
llTeaSet(Mj, 46.4, 1.11, 3.6);
llSpot({ x: 45, z: 5.8, r: 2.6, name: "The Mahjong host's desk: lessons and the house tables", verb: "ask", fn: llMahjongMenu });
llStaff({ title: "Mahjong host", x: 45, z: 2.8, ry: 0, seed: "mjhost", talk: "mahjong" });
llStaff({ title: "Mahjong host", x: 30, z: 15.4, ry: Math.PI, seed: "mjhost2", wander: 8 });
llPlant(Mj, 12, 4, "orchid", 1.5);
llPlant(Mj, 12, 40, "orchid", 1.5);
llPlant(Mj, 78.4, 3.6, "palm", 1.2);
for (var w = 0; w < 3; w++)
llPainting(Mj, 22 + w * 24, 3.6, 41.8, Math.PI, 2.6, 1.8, 8 + w);
LL.seated = LL.seated || [];
[[24, 10], [50, 21], [63, 32]].forEach(function (q, i) { for (var s2 = 0; s2 < (LL.lite ? 2 : 3); s2++) {
var b = s2 * Math.PI / 2 + Math.PI / 2;
LL.seated.push({ x: q[0] + Math.sin(b) * 1.2, z: q[1] + Math.cos(b) * 1.2, ry: b + Math.PI, seed: "mjp" + i + "_" + s2 });
} });
},
function (G, M) {
var T = llWing(G, "tea", -80, -10, -38, 2);
llRoom(T, -80, -10, -38, 2, { name: "the Rose Tea Room", h: 6, wall: M.mPink, floor: M.mParq, ceil: llM(0xE2C8D6, { map: "coffer" }),
gaps: [{ s: "e", c: -18, w: 5, h: 4.2 }, { s: "n", c: -68, w: 3 }], skip: ["e", "s"], hemi: 1.25 });
llPlace("tea", -45, -18, "The Rose Tea Room");
llCakeCase(T, -52, -34.6, 6, 0);
llCounter(T, -44, -34.6, 8, 0, { col: LLC.cream, panel: LLC.pink });
for (var i = 0; i < 4; i++) {
llTeaSet(T, -47 + i * 2, 1.11, -34.6);
}
llBox(18, 2.4, 0.3, llM(LLC.cream), -48, 3.4, -37.6, T);
for (var s = 0; s < 3; s++)
llBox(17, 0.05, 0.35, llGold(), -48, 2.4 + s * 0.7, -37.5, T);
for (var j = 0; j < 20; j++)
llCyl(0.08, 0.08, 0.22, llM([LLC.pink, 0x6A8A5A, LLC.lilac, 0xC8A060, LLC.rose][j % 5]), -56 + j * 0.85, 2.55 + (j % 3) * 0.7, -37.4, T, 8);
llSign(T, ["THE ROSE TEA ROOM", "tea, cakes and a little something"], 6, 1.4, -48, 5.1, -37.55, 0, "#E8C8D8", "#5A1A3A");
llSpot({ x: -46, z: -31.6, r: 3.4, name: "The tea counter", verb: "order", fn: function () { llMenuCard("tea"); } });
llStaff({ title: "Tea room host", x: -44, z: -36, ry: 0, seed: "teahost", talk: "tea" });
llStaff({ title: "Pastry chef", x: -52, z: -36.1, ry: 0, seed: "pastry1" });
var R = wRand(404);
for (var r = 0; r < 3; r++)
for (var c = 0; c < 5; c++) {
var x = -72 + c * 12 + (r % 2) * 4, z = -24 + r * 8;
llDiningRound(T, x, z, 0.75, 4, c % 2 ? LLC.rose : LLC.purple, { cloth: LLC.blush, top: LLC.cream });
if (!LL.lite || c % 2 === 0) {
llTieredStand(T, x, 0.8, z);
llTeaSet(T, x + 0.35, 0.8, z + 0.2);
}
}
llPiano(T, -16, -28, -Math.PI * 0.75);
llRug(T, -17, -28, 6, 6, 0, LLC.rose, LLC.gold);
llStaff({ title: "Pianist", x: -14.9, z: -26.9, ry: -Math.PI * 0.75 + Math.PI, seed: "pianist", talk: "pianist" });
llSpot({ x: -18, z: -24.6, r: 2.6, name: "The piano", verb: "ask for a tune", fn: llPianoCard });
for (var w = 0; w < 4; w++)
llWindow(T, -79.8, 3, -31 + w * 8.5, Math.PI / 2, 2.2, 2.6);
for (var k = 0; k < 3; k++)
llChandelier(T, -64 + k * 17, 5.6, -16, 1.0);
[[-78.4, -36.4], [-12, -36.4], [-12, 0.6], [-78.4, 0.6]].forEach(function (q) { llPlant(T, q[0], q[1], "roses", 1.2); });
llStaff({ title: "Tea room server", x: -60, z: -20, ry: 0, seed: "tea1", wander: 10 });
llStaff({ title: "Tea room server", x: -30, z: -12, ry: 0, seed: "tea2", wander: 10 });
LL.seated = LL.seated || [];
[[-72, -24], [-56, -16], [-36, -8], [-60, -8]].forEach(function (q, i) { for (var s2 = 0; s2 < (LL.lite ? 1 : 2); s2++) {
var a = s2 * Math.PI + 0.8;
LL.seated.push({ x: q[0] + Math.sin(a) * 1.25, z: q[1] + Math.cos(a) * 1.25, ry: a + Math.PI, seed: "tea" + i + "_" + s2 });
} });
},
function (G, M) {
var C = llWing(G, "cards", 10, 80, -38, 2);
llRoom(C, 10, 80, -38, 2, { name: "the Card Salon", h: 6, wall: M.mWall, floor: M.mCarpet,
gaps: [{ s: "w", c: -18, w: 5, h: 4.2 }, { s: "n", c: 38, w: 3 }], skip: ["w", "s"] });
llPlace("cards", 45, -18, "The Card Salon");
llFireplace(C, 79.6, -18, -Math.PI / 2);
llRug(C, 74, -18, 6, 8, 0, LLC.rose, LLC.gold);
llArmchair(C, 74, -21.5, -Math.PI / 2 - 0.4, LLC.rose);
llArmchair(C, 74, -14.5, -Math.PI / 2 + 0.4, LLC.rose);
llChaise(C, 71, -18, Math.PI / 2, LLC.purple);
llCoffeeTable(C, 73.6, -18, Math.PI / 2);
for (var b = 0; b < 4; b++) {
llBookcase(C, 22 + b * 3, -37.6, 0, 2.6, 3.2);
llBookcase(C, 58 + b * 3, -37.6, 0, 2.6, 3.2);
}
var felt = llM(0xE0D4E8, { map: "felt" }), card = llM(0xE6E0DA), red = llM(0xA02A4A), back = llM(LLC.purple);
for (var r = 0; r < 2; r++)
for (var c = 0; c < 4; c++) {
var x = 20 + c * 12, z = -28 + r * 12;
var t = llPiece(C, x, z, 0);
llCyl(1.0, 1.0, 0.06, felt, 0, 0.78, 0, t, 24);
llCyl(1.06, 1.06, 0.08, llGold(), 0, 0.74, 0, t, 24);
llCyl(0.1, 0.16, 0.72, llM(LLC.wood), 0, 0.36, 0, t, 8);
llCyl(0.45, 0.5, 0.05, llGold(), 0, 0.03, 0, t, 12);
for (var p = 0; p < 7; p++) {
llBox(0.12, 0.005, 0.17, back, -0.48 + p * 0.16, 0.815, -0.15, t);
llBox(0.12, 0.006, 0.17, p % 2 ? red : card, -0.48 + p * 0.16, 0.818, -0.05, t);
}
llBox(0.12, 0.01, 0.17, card, -0.4, 0.82, 0.45, t);
llBox(0.12, 0.01, 0.17, back, 0.4, 0.82, 0.45, t);
llSolidR(x, z, 1.15, 1);
llChair(C, x, z + 1.55, Math.PI, LLC.rose);
llChair(C, x, z - 1.55, 0, LLC.rose);
llSpot({ x: x, z: z + 2.3, r: 2.6, name: "A solitaire table", verb: "play cards", fn: llCardsMenu });
llSpot({ x: x, z: z - 2.3, r: 2.6, name: "A solitaire table", verb: "play cards", fn: llCardsMenu });
}
[[30, -6], [42, -6]].forEach(function (q, i) {
llRectTable(C, q[0], q[1], 1, 1, 0, { cloth: false, top: LLC.cream });
var bd = llPiece(C, q[0], q[1], 0);
for (var a = 0; a < 8; a++)
for (var b2 = 0; b2 < 8; b2++)
if ((a + b2) % 2)
llBox(0.1, 0.005, 0.1, llM(LLC.plum), -0.35 + a * 0.1, 0.795, -0.35 + b2 * 0.1, bd);
llChair(C, q[0], q[1] + 1, Math.PI, LLC.purple);
llChair(C, q[0], q[1] - 1, 0, LLC.purple);
llSpot({ x: q[0], z: q[1] + 1.8, r: 2.2, name: i ? "The draughts table" : "The chess table", verb: "play", fn: llCityGames });
});
var pk = llPiece(C, 58, -4, 0);
var ov = llCyl(1.5, 1.5, 0.08, felt, 0, 0.78, 0, pk, 28);
ov.scale.z = 0.6;
var rim = llCyl(1.6, 1.6, 0.1, llGold(), 0, 0.74, 0, pk, 28);
rim.scale.z = 0.6;
llCyl(0.3, 0.4, 0.72, llM(LLC.wood), 0, 0.36, 0, pk, 8);
for (var cc = 0; cc < 10; cc++)
llCyl(0.04, 0.04, 0.02 + (cc % 4) * 0.02, llM([LLC.rose, LLC.gold, 0x2A2A3A, LLC.silver][cc % 4]), -0.6 + cc * 0.13, 0.84, 0.25, pk, 8);
llSolid(58, -4, 1.7, 1.0, 0, 1);
for (var s = 0; s < 6; s++) {
var a2 = s / 6 * 6.283;
llChair(C, 58 + Math.sin(a2) * 2.1, -4 + Math.cos(a2) * 1.35, a2 + Math.PI, LLC.velvet);
}
llSpot({ x: 58, z: -1.4, r: 2.4, name: "The card table: Texas Hold'em", verb: "play", fn: llCityGames });
llStaff({ title: "Card dealer", x: 58, z: -5.8, ry: 0, seed: "dealer1", talk: "dealer" });
llStaff({ title: "Card dealer", x: 36, z: -16, ry: 0, seed: "dealer2", wander: 8 });
for (var k = 0; k < 3; k++)
llChandelier(C, 26 + k * 20, 5.6, -18, 1.0);
for (var w = 0; w < 3; w++)
llWindow(C, 24 + w * 20, 3, 1.7, Math.PI, 2.4, 2.6);
llPlant(C, 11.6, -36.4, "palm", 1.2);
llPlant(C, 78.4, 0.4, "palm", 1.2);
llPlant(C, 78.4, -36.4, "roses", 1.2);
llSign(C, ["THE CARD SALON", "solitaire · FreeCell · chess · draughts · Hold'em"], 6, 1.3, 45, 4.6, 1.7, Math.PI, "#3A1A4A", "#E8CFA0");
LL.seated = LL.seated || [];
[[20, -28], [44, -16], [56, -28]].forEach(function (q, i) { LL.seated.push({ x: q[0], z: q[1] + 1.45, ry: Math.PI, seed: "card" + i }); });
},
function (G, M) {
var K = llWing(G, "crown", -30, 30, -70, -38);
llRoom(K, -30, 30, -70, -38, { name: "the Crown Room", h: 9, wall: M.mWall, floor: M.mCarpet,
gaps: [{ s: "s", c: 0, w: 8, h: 4.2 }], skip: ["s"] });
llPlace("crown", 0, -50, "The Crown Room");
llBox(30, 1, 7, llM(LLC.plum), 0, 0.5, -66.4, K);
llBox(30.2, 0.08, 7.2, M.gold, 0, 1.02, -66.4, K);
llPad(-15, 15, -70, -62.8, 1);
llRamp(-3, 3, -62.8, -60, 1, 0, "z");
for (var st = 0; st < 4; st++)
llBox(6, 0.25, 0.7, llM(LLC.velvet), 0, 0.125 + st * 0.25, -60.4 - st * 0.7, K);
LL.leader = llBoard(K, "leader", 0, 5.4, -69.75, 0, 16, 6);
llBox(17, 0.5, 0.4, M.gold, 0, 8.75, -69.6, K);
llBossChair(K, -6, -66, 0, LLC.velvet);
llBossChair(K, 6, -66, 0, LLC.velvet);
llRectTable(K, 0, -65, 5, 1.1, 0, { cloth: LLC.velvet, top: LLC.cream, y: 1.76 });
[[-1.4, 1], [0, 0], [1.4, 2]].forEach(function (q) {
var m = q[1] === 0 ? llGold() : q[1] === 1 ? llSilver() : llM(0xB87A4A, { e: 0x1A0E06 }), sc = q[1] === 0 ? 1.4 : 1.1;
llCyl(0.12 * sc, 0.16 * sc, 0.12, m, q[0], 1.84, -65, K, 10);
llCyl(0.04, 0.04, 0.25 * sc, m, q[0], 2.0, -65, K, 6);
llCyl(0.22 * sc, 0.08, 0.34 * sc, m, q[0], 2.25, -65, K, 12);
});
llSpot({ x: 0, z: -60.6, y: 1, r: 3, name: "The tournament stage", verb: "see the winners", fn: llTourneyCard });
for (var t = 0; t < 3; t++) {
llTrophyCase(K, -29.4, -62 + t * 9, Math.PI / 2, 4);
llTrophyCase(K, 29.4, -62 + t * 9, -Math.PI / 2, 4);
}
llSpot({ x: -27.2, z: -53, r: 3, name: "The trophy cabinets", verb: "look", fn: llTrophyCard });
llSpot({ x: 27.2, z: -53, r: 3, name: "The trophy cabinets", verb: "look", fn: llTrophyCard });
for (var r = 0; r < 2; r++)
for (var c = 0; c < 4; c++) {
var x = -18 + c * 12, z = -54 + r * 8;
llRectTable(K, x, z, 3, 1.2, 0, { cloth: LLC.plum, top: LLC.cream, runner: LLC.gold });
llChair(K, x - 0.8, z + 1, Math.PI, LLC.rose);
llChair(K, x + 0.8, z + 1, Math.PI, LLC.rose);
llChair(K, x - 0.8, z - 1, 0, LLC.rose);
llChair(K, x + 0.8, z - 1, 0, LLC.rose);
llSpot({ x: x, z: z + 1.9, r: 2.6, name: "A tournament table", verb: "play in a tournament", fn: llTourneyCard });
}
llRope(K, -24, -58.4, -6, -58.4, 4);
llRope(K, 6, -58.4, 24, -58.4, 4);
llCounter(K, -22, -41, 6, Math.PI, { col: LLC.cream, panel: LLC.blush });
llSign(K, ["TOURNAMENT DESK"], 3.4, 0.6, -22, 2.4, -41.4, Math.PI);
llSpot({ x: -22, z: -43.2, r: 2.6, name: "The tournament desk", verb: "ask", fn: llTourneyDesk });
llStaff({ title: "Tournament director", x: -22, z: -40.2, ry: Math.PI, seed: "director", talk: "director" });
[[-12, -50], [12, -50]].forEach(function (q) { llColumn(K, q[0], -44, 9); });
for (var k = 0; k < 3; k++)
llChandelier(K, -16 + k * 16, 8.2, -52, 1.4, { tiers: 3 });
llPlant(K, -28.4, -39.6, "palm", 1.3);
llPlant(K, 28.4, -39.6, "palm", 1.3);
},
function (G, M) {
var S = llWing(G, "staff", -80, -30, -70, -38);
llRoom(S, -80, -56, -70, -38, { name: "the kitchen", h: 4, wall: M.mStaffWall, floor: M.mTile, ftile: 1, ceil: llM(0xD0C8D0), gate: "staff",
gaps: [{ s: "s", c: -68, w: 3 }, { s: "e", c: -46, w: 2.4 }], skip: ["s"], skirt: 0x6A5A6A });
llPlace("kitchen", -68, -54, "The kitchen");
llKitchenRun(S, -68, -69.4, 22, 0);
llStove(S, -74, -68.7, 0);
llStove(S, -71, -68.7, 0);
llFridge(S, -79.3, -62, Math.PI / 2);
llFridge(S, -79.3, -60, Math.PI / 2);
llIsland(S, -68, -56, 6, 1.6, 0);
llIsland(S, -68, -48, 6, 1.6, 0);
for (var i = 0; i < 6; i++)
llCyl(0.2, 0.18, 0.25, llSilver(), -70.5 + i, 1.08, -56, S, 10);
llKitchenRun(S, -79.4, -48, 10, Math.PI / 2);
llShelves(S, -56.6, -62, -Math.PI / 2, 5);
llShelves(S, -56.6, -56, -Math.PI / 2, 4);
llRectTable(S, -68, -41.4, 6, 1.2, 0, { cloth: false, top: 0xE6E0E8 });
[-70, -68, -66].forEach(function (x) { llTieredStand(S, x, 0.8, -41.4); });
llSpot({ x: -68, z: -52, r: 2.6, name: "The kitchen: bake for the tea room", verb: "work", fn: llWorkHere });
llStaff({ title: "Pastry chef", x: -66, z: -58, ry: 0, seed: "pastry2" });
llStaff({ title: "Kitchen porter", x: -74, z: -66.6, ry: Math.PI, seed: "porter" });
llRoom(S, -56, -30, -54, -38, { name: "the staff room", h: 4, wall: M.mStaffWall, floor: M.mStaffFloor, ceil: llM(0xD0C8D0), gate: "staff",
gaps: [{ s: "w", c: -46, w: 2.4 }, { s: "n", c: -50, w: 2.4 }, { s: "n", c: -42, w: 2.4 }, { s: "n", c: -34, w: 2.4 }], skip: ["w", "s", "e"], skirt: 0x6A5A6A });
llPlace("staff", -44, -46, "The staff room");
llLockers(S, -43, -39.4, Math.PI, 12);
llSofa(S, -36, -52.6, 0, LLC.lav, 2.4);
llRectTable(S, -48, -46, 2.4, 1.2, 0, { cloth: false, top: LLC.cream });
for (var c = 0; c < 4; c++)
llChair(S, -49 + c * 0.7 * (c < 2 ? 1 : 1), -46 + (c % 2 ? 1.1 : -1.1), c % 2 ? Math.PI : 0, LLC.lav);
llKitchenRun(S, -31, -46, 6, -Math.PI / 2);
llSign(S, ["STAFF ONLY"], 2, 0.5, -45, 2.6, -38.6, Math.PI, "#5A4A6A", "#F0E8F0");
llSpot({ x: -46, z: -44, r: 2.4, name: "The staff room: the rota and the openings", verb: "look", fn: llStaffBoard });
llStaff({ title: "General manager", x: -35, z: -50, ry: 0, seed: "gmbreak", wander: 3 });
llRoom(S, -56, -46, -70, -54, { name: "the security office", h: 4, wall: M.mStaffWall, floor: M.mStaffFloor, ceil: llM(0xD0C8D0), gate: "staff", gaps: [{ s: "s", c: -50, w: 2.4 }], skip: ["w", "s"], skirt: 0x6A5A6A });
llRectTable(S, -51, -68, 6, 1, 0, { cloth: false, top: 0x3A3A44 });
var cv = document.createElement("canvas");
cv.width = 256;
cv.height = 128;
var tx = new THREE.CanvasTexture(cv);
llKeep(wMesh(new THREE.PlaneGeometry(7, 2.6), new THREE.MeshBasicMaterial({ map: tx, color: 0xC8C0D0 }), -51, 2.4, -69.7, S));
LL.screens.push({ kind: "cctv", cv: cv, tex: tx, sig: "" });
llSpot({ x: -51, z: -65.6, r: 2.4, name: "The security desk: the cameras and the log", verb: "look", fn: llSecurityCard });
llStaff({ title: "Security officer", x: -51, z: -66.8, ry: Math.PI, seed: "sec1" });
llRoom(S, -46, -38, -70, -54, { name: "the general manager's office", h: 4, wall: llM(LLC.lilac), floor: M.mStaffFloor, ceil: llM(0xD0C8D0), gate: "staff", gaps: [{ s: "s", c: -42, w: 2.4 }], skip: ["w", "s"], skirt: 0x6A5A6A });
llDesk(S, -42, -66, 0, { w: 1.8 });
llBossChair(S, -42, -67.4, 0, LLC.purple);
llChair(S, -43, -63.8, Math.PI, LLC.rose);
llChair(S, -41, -63.8, Math.PI, LLC.rose);
llBookcase(S, -45.6, -62, Math.PI / 2, 2, 2.4);
llPainting(S, -42, 2.2, -69.75, 0, 1.6, 1.1, 5);
llCabinet(S, -38.6, -66, -Math.PI / 2, 1.6, 1.4, LLC.cream);
llCabinet(S, -38.6, -62.6, -Math.PI / 2, 1.6, 1.4, LLC.cream);
llSpot({ x: -42, z: -62, r: 2.4, name: "The general manager's desk", verb: "use", fn: llManagerCard });
llStaff({ title: "General manager", x: -42, z: -67.5, ry: 0, seed: "gm", talk: "manager" });
llRoom(S, -38, -30, -70, -54, { name: "the counting room and stock room", h: 4, wall: M.mStaffWall, floor: M.mStaffFloor, ceil: llM(0xD0C8D0), gate: "staff", gaps: [{ s: "s", c: -34, w: 2.4 }], skip: ["w", "s", "e"], skirt: 0x6A5A6A });
llShelves(S, -31, -62, -Math.PI / 2, 5);
llShelves(S, -34, -69.4, 0, 5);
var safe = llPiece(S, -36.6, -66, Math.PI / 2);
llBox(1.2, 1.5, 1, llM(0x5A5A64), 0, 0.75, 0, safe);
wMesh(new THREE.TorusGeometry(0.18, 0.03, 6, 16), llGold(), 0, 0.9, 0.52, safe);
llSolid(-36.6, -66, 0.6, 0.6, 0, 1.6);
llRectTable(S, -34, -59, 2, 1, 0, { cloth: false, top: LLC.cream });
llSpot({ x: -34, z: -57, r: 2.4, name: "The stock room: restock the prize shop and the tea room", verb: "work", fn: llWorkHere });
llStaff({ title: "Cashier", x: -34, z: -60.2, ry: 0, seed: "cashier" });
},
function (G, M) {
var U = llWing(G, "suite", 30, 80, -70, -38);
llRoom(U, 30, 46, -70, -38, { name: "GiGi's anteroom", h: 5, wall: M.mPink, floor: M.mRose, gate: "suite",
gaps: [{ s: "s", c: 38, w: 3 }, { s: "e", c: -54, w: 2.6 }], skip: ["s", "w"], hemi: 1.25 });
llPlace("suite", 38, -44, "GiGi's suite");
llDesk(U, 38, -60, 0, { w: 2, col: LLC.cream });
llChair(U, 38, -61.2, 0, LLC.rose);
llChaise(U, 31.6, -48, Math.PI / 2, LLC.rose);
llArmchair(U, 44, -45, -Math.PI / 2, LLC.lilac);
llPlant(U, 31, -68.8, "orchid", 1.4);
llPlant(U, 45, -68.8, "roses", 1.2);
llPainting(U, 38, 2.6, -69.75, 0, 2, 1.4, 3);
llSign(U, ["GIGI"], 2.6, 0.6, 46, 3.6, -54, -Math.PI / 2, "#5A1A3A", "#F0D8A8");
llChair(U, 37.2, -58.6, Math.PI, LLC.rose);
llChair(U, 38.8, -58.6, Math.PI, LLC.rose);
llSofa(U, 38, -39.4, Math.PI, LLC.purple, 3);
llCoffeeTable(U, 38, -42.2, 0, { w: 1.4, d: 0.7 });
llRug(U, 38, -42.6, 7, 5, 0, LLC.lilac, LLC.gold);
llVase(U, 38, 0.5, -42.2, 0.9);
llSpot({ x: 38, z: -44.6, r: 2.4, name: "The waiting sofa: wait to be shown in", verb: "sit and wait", fn: function () { llRest("GiGi's anteroom"); } });
llSpot({ x: 38, z: -57.8, r: 2.4, name: "GiGi's personal assistant", verb: "leave a message", fn: llAssistantCard });
llStaff({ title: "Personal assistant", x: 38, z: -61.3, ry: 0, seed: "pa", talk: "assistant" });
llRoom(U, 46, 70, -70, -38, { name: "GiGi's office", h: 5.5, wall: llM(0xF4E8F4, { map: "damask" }), floor: llM(0xE8DCEC, { map: "carpet" }),
gaps: [{ s: "w", c: -54, w: 2.6 }, { s: "e", c: -62, w: 2.4 }, { s: "e", c: -46, w: 2.4 }], skip: ["w", "s"], gate: "suite" });
llDesk(U, 58, -62, 0, { w: 2.8, col: 0xE6DCE4 });
llBossChair(U, 58, -63.6, 0, LLC.velvet);
llChair(U, 57, -59.6, Math.PI, LLC.rose, { solid: true });
llChair(U, 59, -59.6, Math.PI, LLC.rose, { solid: true });
llCrestBoard(U, 58, 3.2, -69.75, 0);
llSofa(U, 58, -41.2, Math.PI, LLC.rose, 3.2, { cush: LLC.gold });
llArmchair(U, 53.6, -45.4, Math.PI / 2 + 0.5, LLC.lilac);
llArmchair(U, 62.4, -45.4, -Math.PI / 2 - 0.5, LLC.lilac);
llCoffeeTable(U, 58, -45.2, 0, { w: 1.6, d: 0.8 });
llRug(U, 58, -45, 8, 6, 0, LLC.pink, LLC.gold);
llFireplace(U, 46.4, -48, Math.PI / 2);
llBookcase(U, 69.6, -54, -Math.PI / 2, 2.6, 3);
llCabinet(U, 69.6, -50, -Math.PI / 2, 1.4, 1.2, LLC.cream);
llWindow(U, 52, 3, -69.8, 0, 2.2, 2.6);
llWindow(U, 64, 3, -69.8, 0, 2.2, 2.6);
llChandelier(U, 58, 5, -54, 1.3, { tiers: 3 });
var cart = llPiece(U, 66, -58, -Math.PI / 2);
llBox(1, 0.04, 0.55, llGold(), 0, 0.85, 0, cart);
llBox(1, 0.04, 0.55, llGold(), 0, 0.35, 0, cart);
llTeaSet(U, 66, 0.88, -58);
llSolid(66, -58, 0.3, 0.55, 0, 1);
llVase(U, 59.2, 0.84, -61.7, 1.2);
llPlant(U, 47, -68.8, "palm", 1.3);
llPlant(U, 69, -39, "roses", 1.3);
llSpot({ x: 58, z: -60.4, r: 2.4, name: "GiGi's desk", verb: "sit at", fn: llOfficeCard });
llRug(U, 58, -61, 7, 5, 0, LLC.velvet, LLC.gold);
llCandelabra(U, 56.9, 0.8, -61.8);
llCandelabra(U, 60.4, 0.8, -61.8);
llRoundTable(U, 58, -52.5, 0.9, { cloth: false, top: LLC.wood });
llBox(1.5, 0.012, 1.5, llM(0xE0D4E8, { map: "felt" }), 58, 0.79, -52.5, U);
[[0, -1.5, 0], [0, 1.5, Math.PI], [-1.5, 0, Math.PI / 2], [1.5, 0, -Math.PI / 2]].forEach(function (c) { llChair(U, 58 + c[0], -52.5 + c[1], c[2], LLC.rose); });
llRug(U, 58, -52.5, 5, 5, Math.PI / 4, LLC.pink, LLC.silver);
llTrophyCase(U, 69.4, -67, -Math.PI / 2, 2.6);
llTrophyCase(U, 69.4, -41.6, -Math.PI / 2, 2.2);
llBoard(U, "tonight", 46.25, 2.6, -64.5, Math.PI / 2, 3.6, 2.2);
llBoard(U, "leader", 46.25, 2.6, -59.2, Math.PI / 2, 2.6, 2.2);
llPainting(U, 69.75, 2.8, -50.6, -Math.PI / 2, 1.8, 1.3, 31);
llPainting(U, 69.75, 2.8, -57.6, -Math.PI / 2, 1.6, 1.2, 32);
[49, 55, 61, 67].forEach(function (x) { llSconce(U, x, 3.1, -69.75, 0); });
llChaise(U, 50.4, -41, Math.PI, LLC.pink);
llHarp(U, 66.2, -42, Math.PI * 1.2);
llSideboard(U, 51.5, -69.5, 0, 2.2, LLC.cream);
llVase(U, 51.5, 0.92, -69.5, 1.1);
llSideboard(U, 64.5, -69.5, 0, 2.2, LLC.cream);
llTeaSet(U, 64.5, 0.92, -69.5);
llPlant(U, 69, -63.6, "roses", 1.2);
llPlant(U, 47, -39.2, "palm", 1.4);
llPlant(U, 62.8, -39, "roses", 1.1);
llChandelier(U, 58, 5, -44, 1, { tiers: 2 });
llChandelier(U, 58, 5, -63, 1, { tiers: 2 });
llSpot({ x: 58, z: -50.2, r: 2.2, name: "GiGi's own game table", verb: "play at", fn: llCardsMenu });
llSpot({ x: 68, z: -67, r: 2, name: "Her trophy cabinet", verb: "look in", fn: llTrophyCard });
llSpot({ x: 58, z: -43.2, r: 2.8, name: "The sofa by the fire", verb: "rest", fn: function () { llRest("GiGi's office"); } });
llRoom(U, 70, 80, -70, -54, { name: "GiGi's dressing room", h: 5, wall: M.mPink, floor: M.mMarble, ftile: 2, gate: "suite", gaps: [{ s: "w", c: -62, w: 2.4 }], skip: ["w"], hemi: 1.25 });
llVanity(U, 75, -69.2, 0);
llWardrobe(U, 79.4, -60, -Math.PI / 2, 2);
llWardrobe(U, 79.4, -57, -Math.PI / 2, 2);
llMirror(U, 70.25, 1.8, -58, Math.PI / 2, 1.2, 2.2);
llOttoman(U, 75, -62, LLC.pink, 0.6);
llChandelier(U, 75, 4.6, -62, 0.8, { tiers: 2 });
llSpot({ x: 75, z: -66.4, r: 2.2, name: "GiGi's vanity", verb: "freshen up", fn: function () { setStatus("<b>A touch of powder, a dab of scent.</b> The mirror lights are kind."); } });
llRoom(U, 70, 80, -54, -38, { name: "GiGi's private salon", h: 5, wall: llM(0xF4E8F4, { map: "damask" }), floor: M.mRose, gate: "suite", gaps: [{ s: "w", c: -46, w: 2.4 }], skip: ["w", "s", "n"] });
var mt = llPiece(U, 75, -46, 0);
llBox(1.3, 0.06, 1.3, llM(0xE0D4E8, { map: "felt" }), 0, 0.78, 0, mt);
llBox(1.42, 0.1, 1.42, llM(LLC.wood), 0, 0.72, 0, mt);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { llBox(0.08, 0.7, 0.08, llGold(), p[0] * 0.6, 0.35, p[1] * 0.6, mt); });
for (var s = 0; s < 4; s++) {
var a = s * Math.PI / 2;
var wl = llBox(0.66, 0.045, 0.06, llM(0xE6DCC8), Math.sin(a) * 0.42, 0.84, Math.cos(a) * 0.42, mt);
wl.rotation.y = a;
llChair(U, 75 + Math.sin(a) * 1.25, -46 + Math.cos(a) * 1.25, a + Math.PI, LLC.velvet);
}
llSolidR(75, -46, 0.85, 1);
llSpot({ x: 75, z: -43.6, r: 2.2, name: "GiGi's own Mahjong table", verb: "play", fn: llMahjongMenu });
llSpot({ x: 72, z: -50.5, r: 2, name: "GiGi's card table", verb: "play cards", fn: llCardsMenu });
llChandelier(U, 75, 4.6, -46, 0.8, { tiers: 2 });
},
function (G, M) {
var X = llWing(G, "treasure", -80, -30, 42, 65);
llRoom(X, -80, -30, 42, 65, { name: "the Treasure Box", h: 6, wall: M.mPink, floor: M.mMarble, ftile: 2.5,
gaps: [{ s: "e", c: 54, w: 3.6 }, { s: "n", c: -55, w: 4 }], skip: ["e", "n"], hemi: 1.2 });
llPlace("treasure", -55, 54, "The Treasure Box");
llCounter(X, -55, 46, 10, 0, { col: LLC.cream, panel: LLC.blush });
llSign(X, ["THE TREASURE BOX", "prizes and gifts"], 5, 1.2, -55, 4.2, 42.3, 0, "#5A1A3A", "#F0D8A8");
llSpot({ x: -55, z: 48.2, r: 3.2, name: "The Treasure Box counter: gifts to buy, and your prizes", verb: "shop", fn: llShopCard });
llStaff({ title: "Prize shop clerk", x: -57, z: 45.2, ry: 0, seed: "shop1", talk: "shop" });
llStaff({ title: "Prize shop clerk", x: -52, z: 45.2, ry: 0, seed: "shop2" });
for (var i = 0; i < 4; i++) {
var gc = llPiece(X, -74 + i * 10, 58, 0);
llBox(3, 0.9, 1.2, llM(LLC.cream), 0, 0.45, 0, gc);
llBox(3, 0.8, 1.2, llM(0xE0E8F0, { op: 0.2 }), 0, 1.3, 0, gc);
llBox(3.04, 0.04, 1.24, llGold(), 0, 1.72, 0, gc);
for (var k = 0; k < 5; k++)
llSph(0.14, llM([LLC.pink, LLC.lilac, LLC.gold, LLC.silver, LLC.rose][(k + i) % 5]), -1.1 + k * 0.55, 1.08, 0, gc, 8);
llSolid(-74 + i * 10, 58, 1.55, 0.65, 0, 1.8);
}
for (var s = 0; s < 4; s++) {
llShelves(X, -79.4, 46 + s * 5, Math.PI / 2, 4);
}
llChandelier(X, -55, 5.6, 54, 1.2);
llTrophyCase(X, -30.6, 50, -Math.PI / 2, 3);
llRectTable(X, -40, 52, 2.4, 1, 0, { cloth: LLC.blush, top: LLC.cream });
for (var rb = 0; rb < 3; rb++)
llBox(0.4, 0.3, 0.4, llM([LLC.pink, LLC.lilac, LLC.gold][rb]), -40.8 + rb * 0.8, 0.93, 52, X);
llSpot({ x: -40, z: 53.8, r: 2, name: "The gift-wrap table", verb: "have a gift wrapped", fn: function () { setStatus("<b>Posy Larkin wraps it in lilac tissue</b> with a silver ribbon and a little gold tag."); } });
llPlant(X, -32, 63.6, "roses", 1.2);
llPlant(X, -78.4, 63.6, "palm", 1.2);
var W = llWing(G, "powder", 30, 50, 42, 65);
llRoom(W, 30, 50, 53.5, 65, { name: "the ladies' powder room", h: 5, wall: M.mPink, floor: M.mTile, ftile: 1, gaps: [{ s: "w", c: 59, w: 3 }], skip: ["w"], hemi: 1.25 });
for (var st = 0; st < 4; st++)
llStall(W, 36 + st * 1.4, 63.9, Math.PI);
llBasin(W, 46, 63.9, Math.PI, 2);
llChaise(W, 48.6, 57, -Math.PI / 2, LLC.rose);
llMirror(W, 49.75, 1.8, 57, -Math.PI / 2, 1.2, 1.8);
llPlant(W, 32, 54.6, "orchid", 1.3);
llPlace("powder", 32.5, 57, "The powder rooms");
llVanity(W, 40, 54.2, 0);
llPouf(W, 40, 55.3);
llMirror(W, 40, 1.7, 53.75, 0, 1, 1.2);
llSpot({ x: 40, z: 56.4, r: 2, name: "The powder table", verb: "touch up", fn: function () { setStatus("<b>A soft light, a good mirror</b> and a little dish of hair pins. You look lovely."); } });
llSpot({ x: 44, z: 61, r: 2.4, name: "The washbasins", verb: "freshen up", fn: function () { setStatus("<b>You wash your hands</b> with rose soap and dry them on a warm towel."); } });
llStaff({ title: "Powder room attendant", x: 48.6, z: 62.4, ry: Math.PI, seed: "powder" });
llRoom(W, 30, 50, 42, 53.5, { name: "the gentlemen's cloakroom", h: 5, wall: llM(LLC.lav), floor: M.mTile, ftile: 1, gaps: [{ s: "w", c: 47, w: 3 }], skip: ["w", "s", "n"] });
for (var st2 = 0; st2 < 3; st2++)
llStall(W, 36 + st2 * 1.4, 42.9, 0);
llBasin(W, 45, 42.9, 0, 2);
llSpot({ x: 44, z: 46, r: 2.4, name: "The washbasins", verb: "freshen up", fn: function () { setStatus("<b>You wash your hands</b> and straighten your collar."); } });
llMirror(W, 45, 1.7, 42.25, 0, 1.6, 1);
llArmchair(W, 48.4, 48, -Math.PI / 2, LLC.velvet);
llBox(0.5, 0.25, 0.4, llM(LLC.wood), 47.5, 0.12, 48, W);
llSpot({ x: 47, z: 48, r: 2, name: "The shoe-shine chair", verb: "have your shoes shined", fn: function () { setStatus("<b>A brush, a cloth and a little polish.</b> Your shoes shine like the ballroom floor."); } });
var V = llWing(G, "conservatory", 50, 80, 42, 65);
llRoom(V, 50, 80, 42, 65, { name: "the Conservatory", h: 7, wall: llM(0xD8C8DC), floor: llM(0xD4C8D0, { map: "tile" }), ftile: 1.2, ceil: llM(0x6A5A8A, { op: 0.55 }),
gaps: [{ s: "n", c: 65, w: 4 }], skip: ["n", "w"], hemi: 1.3 });
llPlace("conservatory", 65, 54, "The Conservatory");
for (var b = 0; b < 6; b++)
llBox(0.12, 0.12, 23, llM(0xE0D8E4), 50 + b * 6, 6.9, 53.5, V);
for (var w = 0; w < 4; w++) {
llWindow(V, 79.8, 3.2, 45 + w * 5.5, -Math.PI / 2, 2.6, 3.6);
llWindow(V, 53 + w * 7, 3.2, 64.8, Math.PI, 2.6, 3.6);
}
[[54, 46], [58, 46], [62, 46], [54, 61], [60, 61], [76, 47], [76, 61]].forEach(function (q) { llPlant(V, q[0], q[1], "roses", 1.4); });
[[66, 46], [70, 46], [56, 54], [74, 54]].forEach(function (q) { llPlant(V, q[0], q[1], "orchid", 1.6); });
llPlant(V, 51.4, 63.4, "palm", 1.6);
llPlant(V, 78.4, 43.4, "palm", 1.6);
llDiningRound(V, 65, 54, 0.8, 3, LLC.lilac, { cloth: false, top: LLC.cream });
llTeaSet(V, 65, 0.8, 54);
llChaise(V, 72, 58, -Math.PI / 2, LLC.rose);
llSofa(V, 58, 63.4, Math.PI, LLC.lilac, 2.4);
var cage = llPiece(V, 70, 62, 0);
llCyl(0.02, 0.02, 1.4, llGold(), 0, 0.7, 0, cage, 4);
var dome = llSph(0.45, llM(LLC.gold, { op: 0.6, ds: true }), 0, 1.8, 0, cage, 10);
dome.scale.y = 1.3;
llSph(0.08, llM(0xE8D84A), 0, 1.7, 0, cage, 6);
llSolidR(70, 62, 0.4, 2);
llCounter(V, 76.6, 51, 4, -Math.PI / 2, { col: LLC.cream, panel: LLC.blush });
llSpot({ x: 74.4, z: 51, r: 2.4, name: "The florist: a buttonhole or a posy", verb: "ask", fn: function () { llMenuCard("florist"); } });
llStaff({ title: "Florist", x: 77.6, z: 51, ry: -Math.PI / 2, seed: "florist", talk: "florist" });
llSpot({ x: 65, z: 56.2, r: 2.4, name: "A table among the roses", verb: "rest", fn: function () { llRest("the Conservatory"); } });
},
function (G) {
var X = LL_HX, H = function (x) { return X + x; };
var mPink = llM(0xC88AAE, { map: "pinkdamask" }), mDam = llM(0xF4E8F4, { map: "damask" }), mLilac = llM(0xC8B4D4), mParq = llM(0xF0E4DC, { map: "parquet" }), mMarble = llM(0xD2C6CE, { map: "marble" }), mCarpet = llM(0xE8DCEC, { map: "carpet" }), mRose = llM(0xF0E0EA, { map: "rosecarpet" }), mTile = llM(0xD4C8D0, { map: "tile" }), mCeil = llM(0xE6D6E0, { map: "coffer" }), gold = llGold();
function room(W, x0, x1, z0, z1, o) { o.where = "house"; return llRoom(W, H(x0), H(x1), z0, z1, o); }
var F = llWing(G, "h-front", H(-40), H(40), 20, 40);
room(F, -12, 12, 20, 40, { name: "the rotunda hall", h: 8, wall: mPink, floor: mMarble, ftile: 2.5, ceil: mCeil,
gaps: [{ s: "w", c: 30, w: 3 }, { s: "e", c: 30, w: 3 }, { s: "n", c: 0, w: 6, h: 4 }], hemi: 1.3 });
llPlace("h-front", H(0), 34, "The rotunda hall");
[-1.3, 1.3].forEach(function (dx) { llBox(2.4, 4.2, 0.2, llM(LLC.velvet), H(dx), 2.1, 39.8, F); for (var p = 0; p < 3; p++)
llBox(2, 0.08, 0.22, gold, H(dx), 1 + p * 1.1, 39.7, F); });
llBox(5.6, 0.4, 0.3, gold, H(0), 4.4, 39.75, F);
llSpot({ x: H(0), z: 37.6, r: 2.4, name: "The front door: out to the Crescent", verb: "go out", fn: llGoOut });
for (var i = 0; i < 8; i++) {
var a = i / 8 * 6.283 + Math.PI / 8;
llColumn(F, H(Math.cos(a) * 8.5), 30 + Math.sin(a) * 7.2, 8);
}
llRug(F, H(0), 30, 10, 10, 0, LLC.rose, LLC.gold);
llRoundTable(F, H(0), 30, 1.3, { cloth: false, top: 0xD8CCD4, y: 0.85, posy: false });
var fl = llPiece(F, H(0), 30, 0, 0.9);
llCyl(0.3, 0.4, 0.6, llSilver(), 0, 0.3, 0, fl, 12);
for (var k = 0; k < (LL.lite ? 8 : 20); k++) {
var b = k / 20 * 6.283, h = 0.8 + ((k * 7) % 5) * 0.12;
llSph(0.16, llM([LLC.pink, LLC.rose, LLC.lilac, 0xE8D8E0][k % 4]), Math.cos(b) * (0.3 + (k % 3) * 0.15), h, Math.sin(b) * (0.3 + (k % 3) * 0.15), fl, 6);
}
llChandelier(F, H(0), 7.4, 30, 1.6, { tiers: 4 });
llPainting(F, H(-10), 3.4, 20.3, 0, 2.4, 1.8, 11);
llPainting(F, H(10), 3.4, 20.3, 0, 2.4, 1.8, 12);
llCrestBoard(F, H(0), 5.6, 20.3, 0);
llStaff({ title: "Butler", x: H(3.4), z: 36, ry: Math.PI, seed: "butler", talk: "butler", where: "house" });
llStaff({ title: "Florist and gardener", x: H(-2.4), z: 30, ry: Math.PI / 2, seed: "hgard", talk: "gardener", where: "house" });
room(F, -40, -12, 20, 40, { name: "the drawing room", h: 5, wall: mPink, floor: mParq, ceil: mCeil, gaps: [{ s: "e", c: 30, w: 3 }], skip: ["e"], hemi: 1.25 });
llFireplace(F, H(-39.6), 30, Math.PI / 2);
llSofa(F, H(-30), 24.2, 0, LLC.purple, 3.2);
llSofa(F, H(-30), 35.8, Math.PI, LLC.purple, 3.2);
llArmchair(F, H(-35), 30, Math.PI / 2, LLC.rose);
llArmchair(F, H(-25), 30, -Math.PI / 2, LLC.rose);
llCoffeeTable(F, H(-30), 30, 0, { w: 1.6, d: 0.9 });
llRug(F, H(-31), 30, 10, 9, 0, LLC.rose, LLC.gold);
llSideboard(F, H(-26), 39.6, Math.PI, 2.4, LLC.cream);
llTV(F, H(-22), 2, 39.75, Math.PI, 1.8);
llWindow(F, H(-34), 2.8, 20.25, 0, 2.2, 2.6);
llWindow(F, H(-20), 2.8, 20.25, 0, 2.2, 2.6);
llChandelier(F, H(-30), 4.6, 30, 1.0);
llPlant(F, H(-38.6), 21.4, "palm", 1.2);
llPlant(F, H(-14), 38.6, "roses", 1.1);
llPainting(F, H(-32), 2.8, 39.75, Math.PI, 2, 1.4, 13);
llSpot({ x: H(-30), z: 27.4, r: 2.6, name: "The drawing room sofa", verb: "sit and rest", fn: function () { llRest("the drawing room"); } });
llSpot({ x: H(-22), z: 37.4, r: 2.2, name: "The television", verb: "watch", fn: llTVCard });
room(F, 12, 40, 20, 40, { name: "the music room", h: 5.5, wall: mDam, floor: mParq, ceil: mCeil, gaps: [{ s: "w", c: 30, w: 3 }], skip: ["w"] });
llPiano(F, H(28), 33, Math.PI * 0.85);
llHarp(F, H(20), 24, 0.6);
llRug(F, H(26), 30, 9, 8, 0, LLC.pink, LLC.gold);
for (var c = 0; c < 5; c++) {
var ca = -0.9 + c * 0.45;
llChair(F, H(26 + Math.sin(ca) * 6), 30 - Math.cos(ca) * 6 + 6, ca + Math.PI, LLC.velvet);
}
llCabinet(F, H(39.6), 26, -Math.PI / 2, 2.4, 1.2, LLC.cream);
llWindow(F, H(26), 2.8, 20.25, 0, 2.4, 2.8);
llWindow(F, H(39.8), 2.8, 34, -Math.PI / 2, 2.2, 2.6);
llChandelier(F, H(26), 5, 30, 1.1);
llPlant(F, H(13.4), 38.6, "palm", 1.2);
llSpot({ x: H(26.4), z: 30.6, r: 2.6, name: "The grand piano", verb: "play", fn: function () { llPlayPiano(); } });
var M = llWing(G, "h-mid", H(-40), H(40), -40, 20);
room(M, -6, 6, -40, 20, { name: "the gallery", h: 5, wall: mDam, floor: mMarble, ftile: 2.5, ceil: mCeil,
gaps: [{ s: "s", c: 0, w: 6, h: 4 }, { s: "n", c: 0, w: 4 }, { s: "w", c: 10, w: 3 }, { s: "w", c: -10, w: 3 }, { s: "w", c: -30, w: 3 }, { s: "e", c: 10, w: 3 }, { s: "e", c: -10, w: 3 }, { s: "e", c: -30, w: 3 }], skip: ["s"] });
llBox(2.4, 0.02, 58, llM(LLC.velvet), H(0), 0.025, -10, M);
for (var g = 0; g < 4; g++)
llChandelier(M, H(0), 4.6, -34 + g * 16, 0.8, { tiers: 2 });
[[-5.8, Math.PI / 2], [5.8, -Math.PI / 2]].forEach(function (w, wi) {
[16, 0, -20, -36].forEach(function (z, zi) { llPainting(M, H(w[0] + (w[0] < 0 ? 0.1 : -0.1)), 2.8, z, w[1], 1.6, 2.0, 14 + zi + wi * 4); });
[4, -24].forEach(function (z) { llSideboard(M, H(w[0] + (w[0] < 0 ? 0.4 : -0.4)), z, w[1], 1.6, LLC.cream); });
});
llSpot({ x: H(0), z: -10, r: 3, name: "The gallery: the family pictures", verb: "look at the pictures", fn: function () { setStatus("<b>Paintings in gold frames</b> line the gallery: gardens, the sea, a summer evening. There is room at the end for new family photographs."); } });
llStaff({ title: "Housekeeper", x: H(1.5), z: -6, ry: 0, seed: "hkeep", talk: "housekeeper", where: "house", wander: 12 });
room(M, -40, -6, 0, 20, { name: "the dining room", h: 5, wall: mPink, floor: mParq, ceil: mCeil, gaps: [{ s: "e", c: 10, w: 3 }, { s: "n", c: -30, w: 2.6 }], skip: ["e", "s"], hemi: 1.2 });
llRectTable(M, H(-23), 10, 8, 1.6, 0, { cloth: LLC.cream, top: 0xE6DEE4, runner: LLC.rose });
for (var d = 0; d < 6; d++) {
var dx = H(-26.75 + d * 1.5);
llChair(M, dx, 8.6, 0, LLC.purple);
llChair(M, dx, 11.4, Math.PI, LLC.purple);
if (!LL.lite) {
llCyl(0.16, 0.16, 0.02, llM(0xF0E8EC), dx, 0.81, 9.1, M, 14);
llCyl(0.16, 0.16, 0.02, llM(0xF0E8EC), dx, 0.81, 10.9, M, 14);
}
}
llChair(M, H(-27.8), 10, Math.PI / 2, LLC.velvet);
llChair(M, H(-18.2), 10, -Math.PI / 2, LLC.velvet);
[-25, -21].forEach(function (x) { llCandelabra(M, H(x), 0.8, 10); llChandelier(M, H(x), 4.6, 10, 1.0); });
llSideboard(M, H(-23), 0.6, 0, 3, LLC.cream);
llCabinet(M, H(-39.6), 10, Math.PI / 2, 2.4, 2.4, LLC.cream);
llWindow(M, H(-23), 2.8, 19.75, Math.PI, 2.4, 2.6);
llPainting(M, H(-39.75), 2.8, 4, Math.PI / 2, 1.6, 1.2, 19);
llPlant(M, H(-38.6), 18.6, "orchid", 1.4);
llRug(M, H(-23), 10, 11, 5.4, 0, LLC.plum, LLC.gold);
llCabinet(M, H(-34), 19.6, Math.PI, 2.4, 2.4, LLC.cream);
llSpot({ x: H(-23), z: 13.2, r: 3.4, name: "The dining table", verb: "sit for dinner", fn: function () { setStatus("<b>The table is laid for twelve.</b> The cook sends up soup, a roast and a trifle; the candles burn low and steady."); } });
room(M, -40, -18, -20, 0, { name: "the kitchen", h: 4.2, wall: mLilac, floor: mTile, ftile: 1, ceil: llM(0xE6E0E8), gaps: [{ s: "s", c: -30, w: 2.6 }, { s: "e", c: -10, w: 2.6 }, { s: "n", c: -34, w: 2.4 }], skip: ["s"], hemi: 1.3 });
llKitchenRun(M, H(-29), -19.4, 20, 0);
llStove(M, H(-33), -18.7, 0);
llFridge(M, H(-39.3), -12, Math.PI / 2);
llIsland(M, H(-29), -10, 5, 1.6, 0);
for (var s = 0; s < 4; s++) {
var st = llPiece(M, H(-31 + s * 1.3), -8.4, 0);
llCyl(0.2, 0.2, 0.06, llM(LLC.rose), 0, 0.75, 0, st, 10);
llCyl(0.03, 0.03, 0.72, gold, 0, 0.36, 0, st, 5);
}
llShelves(M, H(-39.4), -17, Math.PI / 2, 3);
llSideboard(M, H(-39.6), -4.5, Math.PI / 2, 2.4, LLC.cream);
llSpot({ x: H(-29), z: -7.2, r: 2.6, name: "The kitchen", verb: "make a pot of tea", fn: function () { setStatus("<b>The kettle sings softly.</b> A pot of tea and a slice of lemon cake, just how she likes it."); } });
llStaff({ title: "Cook", x: H(-31), z: -17.6, ry: Math.PI, seed: "hcook", talk: "cook", where: "house" });
room(M, -18, -6, -20, 0, { name: "the breakfast room", h: 4.2, wall: mPink, floor: mParq, ceil: mCeil, gaps: [{ s: "e", c: -10, w: 3 }, { s: "w", c: -10, w: 2.6 }], skip: ["e", "w", "s"], hemi: 1.3 });
llDiningRound(M, H(-12), -10, 0.8, 4, LLC.rose, { cloth: LLC.blush });
llTeaSet(M, H(-12), 0.8, -10);
llWindow(M, H(-12), 2.6, -19.75, 0, 2.2, 2.4);
llPlant(M, H(-17), -18.6, "roses", 1.1);
llSideboard(M, H(-12), -0.6, Math.PI, 2, LLC.cream);
llSpot({ x: H(-12), z: -7.6, r: 2.2, name: "The breakfast table", verb: "have breakfast", fn: function () { setStatus("<b>Boiled eggs, toast and a pot of Earl Grey,</b> with the morning paper folded by the cup."); } });
room(M, -40, -28, -40, -20, { name: "the laundry and the butler's pantry", h: 4, wall: mLilac, floor: mTile, ftile: 1, ceil: llM(0xE6E0E8), gaps: [{ s: "s", c: -34, w: 2.4 }], skip: ["s"] });
for (var w = 0; w < 2; w++) {
var wm = llPiece(M, H(-38.8), -36 + w * 1.2, Math.PI / 2);
llBox(0.7, 0.9, 0.7, llM(0xE2DCE4), 0, 0.45, 0, wm);
wMesh(new THREE.CircleGeometry(0.22, 16), llM(0x8A9AB8), 0, 0.5, 0.36, wm);
llSolid(H(-38.8), -36 + w * 1.2, 0.36, 0.36, 0, 1);
}
llShelves(M, H(-34), -39.4, 0, 5);
llCabinet(M, H(-28.6), -30, -Math.PI / 2, 2, 2.2, LLC.cream);
llRectTable(M, H(-36), -30, 2.4, 1, Math.PI / 2, { cloth: false, top: LLC.cream });
var ib = llPiece(M, H(-33), -25, 0);
llBox(1.4, 0.04, 0.4, llM(LLC.blush), 0, 0.88, 0, ib);
llBox(0.04, 0.86, 0.3, llSilver(), 0, 0.43, 0, ib);
llSolid(H(-33), -25, 0.7, 0.2, 0, 1);
llRectTable(M, H(-31), -35, 2, 1, 0, { cloth: false, top: LLC.wood });
[-31.6, -31, -30.4].forEach(function (x) { llCandelabra(M, H(x), 0.8, -35); });
llSpot({ x: H(-31), z: -33, r: 2.2, name: "The butler's pantry: the silver", verb: "polish the silver", fn: function () { setStatus("<b>Ambrose polishes the candlesticks</b> until you can see your face in them."); } });
room(M, -28, -6, -40, -20, { name: "the blue guest room", h: 4.2, wall: llM(0xA8A0C8), floor: mCarpet, ceil: mCeil, gaps: [{ s: "e", c: -30, w: 3 }], skip: ["e", "w", "s"] });
llBed(M, H(-17), -37, 0, { w: 1.8, l: 2.2, col: LLC.lav, quilt: LLC.lilac });
llWardrobe(M, H(-27.4), -28, Math.PI / 2, 1.6);
llArmchair(M, H(-10), -24, -Math.PI * 0.75, LLC.lilac);
llWindow(M, H(-17), 2.6, -20.25, Math.PI, 2, 2.2);
llRug(M, H(-17), -32, 5, 4, 0, LLC.lilac, LLC.silver);
llPainting(M, H(-27.75), 2.4, -35, Math.PI / 2, 1.2, 0.9, 20);
[-19.1, -14.9].forEach(function (x) { llCabinet(M, H(x), -38.6, 0, 0.6, 0.7, LLC.cream); llCandelabra(M, H(x), 0.72, -38.6); });
llDesk(M, H(-8), -38.8, 0, { w: 1.4, col: LLC.cream });
llSpot({ x: H(-17), z: -34.4, r: 2.4, name: "The blue guest room bed", verb: "stay the night", fn: function () { llRest("the blue guest room"); } });
room(M, 6, 40, 0, 20, { name: "the library", h: 5, wall: mDam, floor: mParq, ceil: mCeil, gaps: [{ s: "w", c: 10, w: 3 }], skip: ["w", "s"] });
for (var bk = 0; bk < 6; bk++) {
llBookcase(M, H(9 + bk * 5), 0.4, 0, 2.6, 3.6);
}
for (var bk2 = 0; bk2 < 3; bk2++) {
llBookcase(M, H(39.6), 4 + bk2 * 5, -Math.PI / 2, 2.6, 3.6);
}
llFireplace(M, H(23), 19.6, Math.PI);
llArmchair(M, H(20), 15, Math.PI * 0.8, LLC.rose);
llArmchair(M, H(26), 15, -Math.PI * 0.8, LLC.rose);
llOttoman(M, H(23), 13.5, LLC.pink, 0.4);
llDesk(M, H(14), 8, Math.PI / 2, { w: 1.8, col: LLC.cream });
llChair(M, H(12.6), 8, Math.PI / 2, LLC.velvet);
var globe = llPiece(M, H(32), 9, 0);
llCyl(0.03, 0.2, 0.8, gold, 0, 0.4, 0, globe, 6);
llSph(0.35, llM(0x6A8AA8), 0, 1.15, 0, globe, 14);
llSolidR(H(32), 9, 0.4, 1.4);
llChandelier(M, H(23), 4.6, 10, 1.0);
llRug(M, H(23), 13, 8, 7, 0, LLC.plum, LLC.gold);
llSpot({ x: H(23), z: 12.4, r: 2.6, name: "The reading chairs", verb: "read a while", fn: llReadCard });
room(M, 6, 40, -20, 0, { name: "GiGi's games room", h: 5, wall: mPink, floor: mRose, ceil: mCeil, gaps: [{ s: "w", c: -10, w: 3 }], skip: ["w", "s"], hemi: 1.25 });
var mt = llPiece(M, H(16), -12, 0);
llBox(1.3, 0.06, 1.3, llM(0xE0D4E8, { map: "felt" }), 0, 0.78, 0, mt);
llBox(1.42, 0.1, 1.42, llM(LLC.wood), 0, 0.72, 0, mt);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { llBox(0.08, 0.7, 0.08, gold, p[0] * 0.6, 0.35, p[1] * 0.6, mt); });
for (var q = 0; q < 4; q++) {
var qa = q * Math.PI / 2;
var tw = llBox(0.66, 0.045, 0.06, llM(0xE6DCC8), Math.sin(qa) * 0.42, 0.84, Math.cos(qa) * 0.42, mt);
tw.rotation.y = qa;
llChair(M, H(16 + Math.sin(qa) * 1.25), -12 + Math.cos(qa) * 1.25, qa + Math.PI, LLC.velvet);
}
llSolidR(H(16), -12, 0.85, 1);
llSpot({ x: H(16), z: -9.6, r: 2.2, name: "Her Mahjong table", verb: "play Mahjong", fn: llMahjongMenu });
var ct = llPiece(M, H(26), -12, 0);
llCyl(0.95, 0.95, 0.06, llM(0xE0D4E8, { map: "felt" }), 0, 0.78, 0, ct, 24);
llCyl(1.0, 1.0, 0.08, gold, 0, 0.74, 0, ct, 24);
llCyl(0.1, 0.16, 0.72, llM(LLC.wood), 0, 0.36, 0, ct, 8);
for (var cp = 0; cp < 7; cp++)
llBox(0.12, 0.006, 0.17, llM(cp % 2 ? 0xA02A4A : 0xE6E0DA), H(0) - X + (-0.48 + cp * 0.16), 0.818, -0.05, ct);
llSolidR(H(26), -12, 1.1, 1);
llChair(M, H(26), -10.5, Math.PI, LLC.rose);
llChair(M, H(26), -13.5, 0, LLC.rose);
llSpot({ x: H(26), z: -9.6, r: 2.2, name: "Her card table", verb: "play cards", fn: llCardsMenu });
var bg = llPiece(M, H(35), -4, 0);
llBox(1.6, 0.8, 0.8, llM(LLC.cream), 0, 0.4, 0, bg);
llBox(1.7, 0.05, 0.9, gold, 0, 0.82, 0, bg);
llSolid(H(35), -4, 0.8, 0.4, 0, 1);
llBallCage(M, H(35), 0.85, -4.2);
llSpot({ x: H(35), z: -2.4, r: 2.2, name: "Her own Bingo set", verb: "play Bingo", fn: llBingoOpen });
llSofa(M, H(33), -18.6, 0, LLC.purple, 3);
llTV(M, H(39.75), 2.2, -12, -Math.PI / 2, 2.2);
llCoffeeTable(M, H(33), -15.8, 0);
llWindow(M, H(20), 2.8, -19.75, 0, 2.2, 2.6);
llChandelier(M, H(21), 4.6, -10, 1.0);
llPlant(M, H(7.4), -1.4, "palm", 1.2);
llPlant(M, H(38.6), -1.4, "roses", 1.1);
room(M, 6, 28, -40, -20, { name: "the rose guest room", h: 4.2, wall: mPink, floor: mCarpet, ceil: mCeil, gaps: [{ s: "w", c: -30, w: 3 }, { s: "e", c: -30, w: 2.4 }], skip: ["w", "s"] });
llBed(M, H(17), -37, 0, { w: 1.8, l: 2.2, col: LLC.rose, quilt: LLC.pink });
llWardrobe(M, H(27.4), -26, -Math.PI / 2, 1.6);
llVanity(M, H(10), -39.2, 0);
llWindow(M, H(17), 2.6, -20.25, Math.PI, 2, 2.2);
llRug(M, H(17), -32, 5, 4, 0, LLC.pink, LLC.gold);
[14.9, 19.1].forEach(function (x) { llCabinet(M, H(x), -38.6, 0, 0.6, 0.7, LLC.cream); llCandelabra(M, H(x), 0.72, -38.6); });
llArmchair(M, H(24), -24, Math.PI * 0.75, LLC.rose);
llSpot({ x: H(17), z: -34.4, r: 2.4, name: "The rose guest room bed", verb: "stay the night", fn: function () { llRest("the rose guest room"); } });
room(M, 28, 40, -40, -20, { name: "the guest bath", h: 4.2, wall: mLilac, floor: mTile, ftile: 1, ceil: llM(0xE6E0E8), gaps: [{ s: "w", c: -30, w: 2.4 }], skip: ["w", "s"], hemi: 1.3 });
llBath(M, H(36), -34, 0);
llBasin(M, H(34), -20.6, Math.PI, 1);
llStall(M, H(38.8), -24, -Math.PI / 2);
llMirror(M, H(34), 1.8, -20.25, Math.PI, 1, 1.2);
llCabinet(M, H(29), -38.6, 0, 1.2, 1.6, LLC.cream);
llChair(M, H(32), -37, 0, LLC.blush);
llSpot({ x: H(34), z: -22.6, r: 2, name: "The guest bath", verb: "freshen up", fn: function () { setStatus("<b>Warm towels and rose soap.</b> Everything a guest could need."); } });
var N = llWing(G, "h-north", H(-40), H(40), -70, -40);
room(N, -16, 16, -70, -40, { name: "GiGi's bedroom", h: 5.5, wall: mDam, floor: mCarpet, ceil: mCeil, gaps: [{ s: "s", c: 0, w: 4 }, { s: "e", c: -62, w: 2.6 }, { s: "e", c: -48, w: 2.6 }, { s: "w", c: -55, w: 2.6 }], skip: ["s"] });
llBed(N, H(0), -65.6, 0, { w: 2.6, l: 2.5, col: LLC.velvet, quilt: LLC.rose, canopy: true });
llRug(N, H(0), -60, 9, 8, 0, LLC.rose, LLC.gold);
llChaise(N, H(0), -55.4, Math.PI / 2, LLC.pink);
llFireplace(N, H(15.6), -56, -Math.PI / 2);
llArmchair(N, H(11), -58.6, Math.PI / 2 + 0.4, LLC.lilac);
llArmchair(N, H(11), -53.4, Math.PI / 2 - 0.4, LLC.lilac);
llWindow(N, H(-8), 3, -69.75, 0, 2, 2.8);
llWindow(N, H(8), 3, -69.75, 0, 2, 2.8);
llChandelier(N, H(0), 5, -58, 1.3, { tiers: 3 });
llTV(N, H(-15.75), 2.4, -62, Math.PI / 2, 2.4);
llPainting(N, H(-15.75), 2.8, -47, Math.PI / 2, 1.6, 1.2, 21);
llPlant(N, H(-14.6), -41.4, "roses", 1.2);
llPlant(N, H(14.6), -41.4, "orchid", 1.4);
[-1.95, 1.95].forEach(function (dx) { llCabinet(N, H(dx), -66.4, 0, 0.6, 0.7, LLC.cream); llCandelabra(N, H(dx), 0.72, -66.4); });
llOttoman(N, H(-0.6), -63.4, LLC.pink, 0.42);
llOttoman(N, H(0.6), -63.4, LLC.pink, 0.42);
llSideboard(N, H(-15.6), -50.5, Math.PI / 2, 2.6, LLC.cream);
llMirror(N, H(-15.75), 2.5, -50.5, Math.PI / 2, 1.6, 1.4);
llVase(N, H(-15.6), 0.92, -49.6, 1);
llVanity(N, H(10), -69.2, 0);
llDesk(N, H(-10), -68.6, 0, { w: 1.8, col: 0xE6DCE4 });
llChair(N, H(-10), -67.2, Math.PI, LLC.rose);
llChaise(N, H(-8), -44, Math.PI / 2, LLC.lilac);
llRug(N, H(-9), -44.5, 5, 4, 0, LLC.lilac, LLC.silver);
llCoffeeTable(N, H(-6.6), -44.5, 0, { w: 1, d: 0.6 });
[-12, -4, 4, 12].forEach(function (dx) { llSconce(N, H(dx), 3.1, -69.75, 0); });
llPainting(N, H(15.75), 3, -66, -Math.PI / 2, 1.6, 1.2, 22);
llPlant(N, H(14.6), -68.6, "palm", 1.3);
llPlant(N, H(-14.6), -68.6, "orchid", 1.2);
llSpot({ x: H(0), z: -62.4, r: 2.6, name: "Her bed", verb: "lie down a while", fn: function () { setStatus("<b>Soft as a cloud.</b> The pillows are plumped, the quilt is turned down, and the fire glows low."); } });
llStaff({ title: "Lady's maid", x: H(12), z: -44, ry: Math.PI, seed: "maid", talk: "maid", where: "house" });
room(N, 16, 40, -70, -55, { name: "GiGi's dressing room", h: 5, wall: mPink, floor: mMarble, ftile: 2, ceil: mCeil, gaps: [{ s: "w", c: -62, w: 2.6 }], skip: ["w"], hemi: 1.3 });
for (var wd = 0; wd < 4; wd++) {
llWardrobe(N, H(19 + wd * 5), -69.4, 0, 2.2);
}
llWardrobe(N, H(39.4), -61, -Math.PI / 2, 2.2);
llVanity(N, H(34), -56.2, Math.PI);
llIsland(N, H(27), -62, 4, 1.2, 0);
llMirror(N, H(16.3), 1.8, -58, Math.PI / 2, 1.2, 2.2);
llOttoman(N, H(22), -58.6, LLC.pink, 0.5);
llChandelier(N, H(28), 4.6, -62, 0.9, { tiers: 2 });
llSpot({ x: H(27), z: -59.6, r: 2.4, name: "Her wardrobes", verb: "choose an outfit", fn: function () { setStatus("<b>Rows of gowns, shawls and pearls.</b> The lady's maid has laid out the lilac silk for this evening."); } });
room(N, 16, 40, -55, -40, { name: "GiGi's bath", h: 5, wall: mLilac, floor: mMarble, ftile: 2, ceil: mCeil, gaps: [{ s: "w", c: -48, w: 2.6 }], skip: ["w", "n"], hemi: 1.3 });
llBath(N, H(30), -47, Math.PI / 2);
llBasin(N, H(24), -54.4, 0, 2);
llStall(N, H(38.8), -44, -Math.PI / 2);
llChaise(N, H(36), -52, Math.PI / 2, LLC.blush);
var shw = llPiece(N, H(37.5), -53, 0);
llBox(2.4, 2.4, 0.04, llM(0xD0D8E8, { op: 0.25 }), 0, 1.2, 1.2, shw);
llBox(0.04, 2.4, 2.4, llM(0xD0D8E8, { op: 0.25 }), -1.2, 1.2, 0, shw);
llSolid(H(37.5), -53, 1.2, 1.2, 0, 2.4);
llChandelier(N, H(30), 4.6, -47, 0.8, { tiers: 2 });
llPlant(N, H(17.4), -41.4, "orchid", 1.3);
llCabinet(N, H(39.4), -50, -Math.PI / 2, 1.4, 1.6, LLC.cream);
llMirror(N, H(24), 1.8, -54.75, 0, 1.6, 1.2);
llSpot({ x: H(30), z: -44.6, r: 2.4, name: "Her bath", verb: "run a warm bath", fn: function () { setStatus("<b>Warm water and rose petals.</b> The maid sets out a soft robe and slippers."); } });
room(N, -40, -16, -70, -40, { name: "her sitting room", h: 5, wall: mPink, floor: mRose, ceil: mCeil, gaps: [{ s: "e", c: -55, w: 2.6 }], skip: ["e", "s"], hemi: 1.25 });
llSofa(N, H(-28), -68.6, 0, LLC.purple, 3);
llArmchair(N, H(-33), -62, Math.PI / 2 + 0.3, LLC.rose);
llArmchair(N, H(-23), -62, -Math.PI / 2 - 0.3, LLC.rose);
llCoffeeTable(N, H(-28), -64.6, 0);
llTV(N, H(-28), 2.2, -40.25, Math.PI, 2.4);
llCabinet(N, H(-28), -40.6, Math.PI, 2.6, 0.7, LLC.cream);
llDesk(N, H(-36), -48, Math.PI / 2, { w: 1.6, col: LLC.cream });
llChair(N, H(-37.4), -48, Math.PI / 2, LLC.velvet);
var sew = llPiece(N, H(-20), -46, 0);
llBox(1, 0.05, 0.6, llM(LLC.cream), 0, 0.75, 0, sew);
llBox(0.4, 0.25, 0.2, llM(0xE6DCE4), 0, 0.9, 0, sew);
llSolid(H(-20), -46, 0.5, 0.3, 0, 1);
llBookcase(N, H(-39.6), -60, Math.PI / 2, 2.6, 3);
llWindow(N, H(-28), 3, -69.75, 0, 2.4, 2.8);
llChandelier(N, H(-28), 4.6, -56, 1.0);
llPlant(N, H(-17.4), -68.6, "roses", 1.2);
llSpot({ x: H(-28), z: -60.8, r: 2.6, name: "Her sitting room", verb: "put her feet up", fn: function () { llRest("her sitting room"); } });
llSpot({ x: H(-28), z: -42.6, r: 2.2, name: "The television", verb: "watch", fn: llTVCard });
},
function (f, title) {
return "You are " + f.name + ", " + f.persona + " The Lounge and the house were made for GiGi, the family's beloved grandmother: you call her " + LL_SHE + ", and speak of her with warmth and respect. " +
"She owns the place, hosts its games and plays whenever she likes. Never invent private facts about her life. Stay in character, keep replies short and kind, and never be crude.";
},
function (title) {
return "You are a member of staff at GiGi's Lounge, a plush game house in Somnucor done in plum, rose, gold and silver: your post is " + title + ". " +
"The Lounge was made for GiGi, the family's beloved grandmother, who owns and hosts it (you call her " + LL_SHE + "). You are friendly, proud of the place and know its rooms and games " +
"(Bingo, Mahjong, solitaire, FreeCell, tournaments, the tea room). Keep replies short and kind. Never invent private facts about her life.";
},
function () {
LL.people = [];
LL.talk = [];
var lite = LL.lite;
LL.staffAt.forEach(function (s, i) {
if (lite && !s.talk && i % 2 === 1)
return;
try {
var f = s.talk && LL_FOLK[s.talk], g = wPerson("ll_" + s.seed, { title: s.title, place: s.where === "house" ? LL_HOUSE : LL_KEY, sex: f ? f.sex : undefined });
g.position.set(s.x, s.y || 0, s.z);
g.rotation.y = s.ry || 0;
var W = llWingAt(s.x, s.z);
(W ? W.g : LL.G).add(g);
var nm = llStaffName(s);
try {
var tg = makeTag(nm + " · " + s.title + (f ? "" : " (stand-in)"), false);
tg.position.y = 2.05;
g.add(tg);
}
catch (e) { }
var P = { g: g, title: s.title, x: s.x, z: s.z, y: s.y || 0, wander: s.wander ? { r: s.wander, sp: 0.8 } : null };
LL.people.push(P);
LL.talk.push({ p: P, name: nm, title: s.title, t: { name: nm, persona: f ? llPersona(f, s.title) : llGenericPersona(s.title), greet: llGreet(s, f) } });
}
catch (e) {
if (window.console)
console.warn("[lounge] staff", e);
}
});
(LL.seated || []).forEach(function (q, i) {
if (lite && i % 2 === 1)
return;
try {
var g = wPerson("ll_guest_" + q.seed, {});
g.position.set(q.x, 0.08, q.z);
g.rotation.y = q.ry;
g.userData.seated = true;
g.userData.pose = "sit";
var W = llWingAt(q.x, q.z);
(W ? W.g : LL.G).add(g);
LL.people.push({ g: g, x: q.x, z: q.z, seated: true });
}
catch (e) { }
});
var walkers = [[0, 20, 6], [0, -20, 6], [-45, 26, 10], [45, 22, 8], [-45, -14, 8], [0, 54, 6], [0, -52, 8]].concat(LL.swWalk || []), R = wRand(808), wi = 0;
walkers.forEach(function (q) {
var n = lite ? 1 : 2;
for (var k = 0; k < n; k++) {
var x = q[0] + (R() - 0.5) * q[2], z = q[1] + (R() - 0.5) * q[2];
if (worldSolidAt(LL.solids, x, z, 0))
continue;
try {
var g = wPerson("ll_walk" + (wi++), {});
g.position.set(x, 0, z);
g.rotation.y = R() * 6.28;
var W = llWingAt(x, z);
(W ? W.g : LL.G).add(g);
LL.people.push({ g: g, x: x, z: z, wander: { r: q[2] * 0.6, sp: 0.7 } });
}
catch (e) { }
}
});
},
function (s, f) {
var nm = f ? f.name.split(" ")[0] : "";
var by = { concierge: "Good evening, and welcome to GiGi's Lounge. Where may I send you?", doorman: "Evening! Mind the step, and welcome in.",
caller: "Eyes down, darling! Got your card? The next game is never far off.", mahjong: "Pull up a chair. Shall I teach you, or shall we play?",
dealer: "Cards, my friend? Solitaire, FreeCell, or something with company?", tea: "Hello, lovely! The scones are warm and the rose tea is brewing.",
pianist: "Good evening. Is there anything you would like to hear?", director: "Welcome to the Crown Room. Today's deals are up on the board.",
manager: "Hello. Everything running smoothly, I hope?", assistant: "Good evening. " + LL_SHE + " may be busy; may I take a message?",
shop: "Welcome to the Treasure Box! Everything sparkly is on the left.", florist: "Smell those roses. Would you like a buttonhole?",
butler: "Good evening. Welcome to " + LL_SHE + "'s house.", housekeeper: "Wipe your feet, dear, and come in.", cook: "Hungry? There's always something in the oven.",
maid: "Good evening. The lilac silk is pressed and ready.", gardener: "Afternoon. The peonies are coming on beautifully." };
return (s.talk && by[s.talk]) || ("Hello. I'm " + (nm || "on duty here") + ". How can I help?");
},
function (G) {
LL.G = G;
LL.lite = llLite();
LL.built = true;
["solids", "walk", "pads", "ramps", "gates", "spots", "talk", "rooms", "wings", "people", "staffAt", "twinkle", "flames", "spin", "screens", "water", "seated", "tvs", "pools", "lakes", "ripples", "holes", "floorsLater", "floorSigns"].forEach(function (k) { LL[k] = []; });
llBuildLounge(G);
llBuildHouse(G);
llBuildResort(G);
llBuildFloors(G);
if (typeof llSweep23 === "function")
llSweep23(G);
LL.wings.forEach(function (W) { try {
if (typeof ppBake === "function")
ppBake(W.g);
}
catch (e) {
if (window.console)
console.warn("[lounge] bake", W.name, e);
} });
llPeople();
},
function (opt) {
LL.lite = llLite();
LL.t = 0;
LL.guide = null;
LL.room = null;
LL.wingAt = 0;
var at = opt && opt.at === "house" ? "house" : "lounge", A = LL_ARRIVE[at];
LL.where = at;
llPut(A.x, A.z, A.yaw);
llLoadState(true).then(function () { llScreensAll(); });
if (typeof llHotelLoad === "function")
llHotelLoad(true).then(function () { llScreensAll(); });
if (typeof loadThings === "function")
try {
loadThings();
}
catch (e) { }
if (typeof ahLoadBoard === "function")
try {
ahLoadBoard(true);
}
catch (e) { }
if (at === "house")
setStatus("<b>GiGi's House.</b> The rotunda, a great arrangement of roses, and the butler at the foot of the stairs. Back, or the front door, takes you out to the Crescent.");
else
setStatus("<b>Welcome to GiGi's Lounge.</b> Bingo to your left, Mahjong to your right, cards and tea beyond, tournaments in the Crown Room at the far end. The concierge has the way to everywhere. Back, or the doors, take you out to Somnucor.");
if (typeof playTone === "function") {
setTimeout(function () { playTone(523, 0.3); }, 250);
setTimeout(function () { playTone(659, 0.3); }, 520);
setTimeout(function () { playTone(784, 0.45); }, 790);
}
},
function (dt) {
LL.t += dt;
var t = LL.t, L = worldLocal(), feet = camera.position.y - 1.72;
LL.where = L.x > LL_HX - 100 ? "house" : "lounge";
var R = llRoomAt(L.x, L.z);
if (R !== LL.room) {
LL.room = R;
if (typeof worldEnv === "function")
try {
worldEnv(llEnv());
}
catch (e) { }
}
LL.wingAt -= dt;
if (LL.wingAt <= 0) {
LL.wingAt = 0.3;
var far = LL.lite ? 34 : 48;
LL.wings.forEach(function (W) { var dx = Math.max(W.x0 - L.x, 0, L.x - W.x1), dz = Math.max(W.z0 - L.z, 0, L.z - W.z1); W.g.visible = Math.hypot(dx, dz) < far; });
}
for (var i = 0; i < LL.twinkle.length; i++) {
var tw = LL.twinkle[i], s = 0.5 + 0.5 * Math.sin(t * tw.sp + tw.ph);
tw.m.material.opacity = tw.max * s * s * s;
}
for (var f = 0; f < LL.flames.length; f++) {
var fl = LL.flames[f], k = 1 + 0.07 * Math.sin(t * 2.4 + fl.ph) + 0.04 * Math.sin(t * 3.7 + fl.ph * 2);
fl.m.scale.set(k, k * (fl.big ? 1.15 : 1.25), k);
}
for (var w = 0; w < LL.water.length; w++) {
var wa = LL.water[w];
wa.m.material.opacity = 0.18 + 0.05 * Math.sin(t * 0.8 + wa.ph);
if (!wa.still)
wa.m.rotation.y += dt * 0.15;
}
for (var p = 0; p < LL.spin.length; p++) {
var sp = LL.spin[p];
if (sp.fish) {
var a = t * sp.sp + sp.ph;
sp.fish.position.set(sp.cx + Math.cos(a) * sp.r, 0.42, sp.cz + Math.sin(a) * sp.r * 0.5);
sp.fish.rotation.y = -a;
}
else if (sp.m) {
var spd = sp.sp * (sp.ax === "x" && LL.bingo && LL.bingo.live ? 1.8 : 1);
sp.m.rotation[sp.ax || "y"] += dt * spd;
}
}
llResortTick(dt, t);
llFiguresTick(dt, L);
LL.scrAt = (LL.scrAt || 0) - dt;
if (LL.scrAt <= 0) {
LL.scrAt = LL.lite ? 2 : 1;
llScreensAll();
(LL.tvs || []).forEach(function (tv) { if (tv.show)
llTVDraw(tv); });
}
LL.slow = (LL.slow || 0) - dt;
if (LL.slow <= 0) {
LL.slow = 25;
llLoadState(false);
if (typeof llHotelLoad === "function")
llHotelLoad(false);
if (typeof ahLoadBoard === "function")
try {
ahLoadBoard(false);
}
catch (e) { }
}
if (typeof llBingoTick === "function" && LLG.on !== "bingo")
try {
llBingoTick(dt, L);
}
catch (e) { }
if (!(typeof llGameOpen === "function" && llGameOpen())) {
var s = null, sd = 1e9;
for (var j = 0; j < LL.spots.length; j++) {
var q = LL.spots[j], qy = q.y || 0;
if (Math.abs(feet - qy) > 2.6)
continue;
var d = (L.x - q.x) * (L.x - q.x) + (L.z - q.z) * (L.z - q.z);
if (d < q.r * q.r && d < sd) {
sd = d;
s = q;
}
}
var tk = null, td = 1e9;
for (var m = 0; m < LL.talk.length; m++) {
var T = LL.talk[m], g = T.p.g;
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
worldPrompt("<b>" + esc(tk.name) + "</b>, " + esc(tk.title) + " · <b>press E</b> to talk", function () { llTalk(tk); });
else
worldPrompt(null);
}
else
worldPrompt(null);
llBannerTick(L);
},
function (dt, L) {
LL.figAt = (LL.figAt || 0) - dt;
var cull = LL.figAt <= 0;
if (cull)
LL.figAt = 0.5;
var far = LL.lite ? 26 : 44;
LL.people.forEach(function (P) {
if (cull) {
var gx = P.g.position.x, gz = P.g.position.z;
P.near = Math.hypot(gx - L.x, gz - L.z) < far;
P.g.visible = P.near;
}
if (P.near && P.wander)
wWander(P.g, dt, function (x, z) { return llGround(x, z, 0); }, { r: P.wander.r, sp: P.wander.sp || 0.8 });
});
},
function (L) {
var R = LL.room, house = LL.where === "house";
var up = !house && L.x > 490 ? (L.x > 650 ? 6 : LL.floor || 2) : 0;
var h = "<b style='color:#F2C8E0'>" + (house ? "🏡 GiGi's House" : "👑 GiGi's Lounge") + "</b>" + (up ? " · Floor " + up : "") + (R && R.name ? " · " + esc(R.name.replace(/^the /, "The ")) : "");
if (!house && LL.bingo && LL.bingo.game && typeof llBingoLine === "function") {
var bl = llBingoLine();
if (bl)
h += "<div style='font-size:12px;opacity:.9'>" + bl + "</div>";
}
var G = LL.guide;
if (G) {
var dx = G.x - L.x, dz = G.z - L.z, d = Math.hypot(dx, dz);
if (d < 4) {
LL.guide = null;
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
function (x, W, H, title) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#3A1A4A");
g.addColorStop(1, "#2A1236");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C9A868";
x.lineWidth = Math.max(4, W / 110);
x.strokeRect(8, 8, W - 16, H - 16);
x.strokeStyle = "rgba(216,138,184,.6)";
x.lineWidth = 2;
x.strokeRect(18, 18, W - 36, H - 36);
if (title) {
x.fillStyle = "#E8CFA0";
x.textAlign = "center";
x.font = "bold " + Math.round(W / 15) + "px Georgia";
x.fillText(title, W / 2, W / 11 + 14);
}
},
function (x, text, cx, y, maxW, lh, maxLines) {
var words = String(text || "").split(/\s+/), line = "", n = 0;
for (var i = 0; i < words.length; i++) {
var tryL = line ? line + " " + words[i] : words[i];
if (x.measureText(tryL).width > maxW && line) {
x.fillText(line, cx, y);
y += lh;
line = words[i];
if (++n >= (maxLines || 9) - 1) {
break;
}
}
else
line = tryL;
}
if (line)
x.fillText(line, cx, y);
return y + lh;
},
function (S) {
if (typeof llScreenDraw2 === "function" && llScreenDraw2(S))
return;
var st = LL.state || {}, B = LL.bingo || {}, sig;
if (S.kind === "tonight")
sig = JSON.stringify([st.notice, st.host_name, (B.game && B.game.id)]);
else if (S.kind === "tourney" || S.kind === "leader")
sig = JSON.stringify(st.tourneys || []);
else if (S.kind === "bingo" || S.kind === "ball" || S.kind === "bingostats")
sig = JSON.stringify([B.game && B.game.id, B.game && B.game.n, B.game && B.game.status, (B.game && B.game.winners || []).length]);
else if (S.kind === "cctv")
sig = String(Math.floor(LL.t / 4));
if (sig === S.sig)
return;
S.sig = sig;
var cv = S.cv, x = cv.getContext("2d"), W = cv.width, H = cv.height;
x.textBaseline = "alphabetic";
if (S.kind === "tonight") {
llPaper(x, W, H, "Tonight at the Lounge");
x.fillStyle = "#F2D8E6";
x.font = "italic " + Math.round(W / 26) + "px Georgia";
x.textAlign = "center";
var y = W / 11 + 14 + W / 16;
x.fillText("Your hostess: " + llHostName(), W / 2, y);
y += W / 18;
x.font = Math.round(W / 30) + "px Georgia";
x.fillStyle = "#E8CFA0";
if (st.notice) {
y = llWrap(x, "“" + st.notice + "”", W / 2, y + 6, W - 80, W / 26, 4);
}
x.fillStyle = "#F2D8E6";
x.font = Math.round(W / 32) + "px Georgia";
["Bingo all evening in the Bingo Hall", "Mahjong lessons and tables in the Parlour", "Solitaire, FreeCell and friendly tables in the Card Salon", "Today's Daily Deals in the Crown Room", "Tea, cakes and the piano in the Rose Tea Room"].forEach(function (l) { if (y < H - 30) {
x.fillText("✦ " + l, W / 2, y + 8);
y += W / 22;
} });
}
else if (S.kind === "tourney" || S.kind === "leader") {
llPaper(x, W, H, S.kind === "leader" ? "The Crown Room" : "Tournaments");
var T = (st.tourneys || []).slice(0, S.kind === "leader" ? 6 : 4), y2 = W / 11 + 14 + W / 18;
x.textAlign = "left";
if (!T.length) {
x.fillStyle = "#F2D8E6";
x.textAlign = "center";
x.font = Math.round(W / 28) + "px Georgia";
x.fillText(LL.noSql ? "Practice tables are open" : "Today's Daily Deals open at midnight", W / 2, y2 + 10);
}
T.forEach(function (q) {
if (y2 > H - 40)
return;
x.fillStyle = "#E8CFA0";
x.font = "bold " + Math.round(W / 30) + "px Georgia";
x.fillText((q.open ? "● " : "✓ ") + (q.title || llGameName(q.game)), 30, y2);
y2 += W / 26;
x.fillStyle = "#F2D8E6";
x.font = Math.round(W / 36) + "px Georgia";
var top = (q.top || []).slice(0, 3), medal = ["🥇", "🥈", "🥉"];
if (!top.length) {
x.fillText("   No times yet: be the first", 30, y2);
y2 += W / 30;
}
top.forEach(function (r, i) { x.fillText("   " + medal[i] + " " + String(r.name || "A dreamer").slice(0, 22) + "  " + llSecs(r.secs), 30, y2); y2 += W / 30; });
y2 += W / 60;
});
}
else if (S.kind === "bingo") {
x.fillStyle = "#2A1236";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C9A868";
x.lineWidth = 8;
x.strokeRect(6, 6, W - 12, H - 12);
var called = {}, G = B.game;
(G && G.calls || []).forEach(function (n) { called[n] = 1; });
var letters = "BINGO", rowH = (H - 40) / 5, colW = (W - 110) / 15;
for (var r = 0; r < 5; r++) {
x.fillStyle = "#D88AB8";
x.font = "bold " + Math.round(rowH * 0.6) + "px Georgia";
x.textAlign = "center";
x.fillText(letters[r], 50, 24 + r * rowH + rowH * 0.7);
for (var c = 0; c < 15; c++) {
var n = r * 15 + c + 1, cx2 = 95 + c * colW + colW / 2, cy = 24 + r * rowH + rowH / 2, on = called[n];
x.fillStyle = on ? "#E8C8A0" : "rgba(120,80,140,.55)";
x.beginPath();
x.arc(cx2, cy, Math.min(colW, rowH) * 0.42, 0, 7);
x.fill();
x.fillStyle = on ? "#3A1A4A" : "rgba(232,216,224,.55)";
x.font = (on ? "bold " : "") + Math.round(rowH * 0.32) + "px Georgia";
x.fillText(String(n), cx2, cy + rowH * 0.11);
}
}
}
else if (S.kind === "ball") {
x.fillStyle = "#2A1236";
x.fillRect(0, 0, W, H);
var G2 = B.game, last = G2 && G2.calls && G2.calls.length ? G2.calls[G2.calls.length - 1] : 0;
x.strokeStyle = "#C9A868";
x.lineWidth = 6;
x.strokeRect(5, 5, W - 10, H - 10);
x.textAlign = "center";
if (last) {
x.fillStyle = "#E8D0DC";
x.beginPath();
x.arc(W / 2, H / 2, H * 0.36, 0, 7);
x.fill();
x.strokeStyle = "#B85C8E";
x.lineWidth = 10;
x.stroke();
x.fillStyle = "#3A1A4A";
x.font = "bold " + Math.round(H * 0.13) + "px Georgia";
x.fillText("BINGO"[Math.floor((last - 1) / 15)], W / 2, H / 2 - H * 0.1);
x.font = "bold " + Math.round(H * 0.26) + "px Georgia";
x.fillText(String(last), W / 2, H / 2 + H * 0.17);
}
else {
x.fillStyle = "#E8CFA0";
x.font = "bold " + Math.round(H * 0.14) + "px Georgia";
x.fillText("Eyes down soon", W / 2, H / 2);
}
}
else if (S.kind === "bingostats") {
llPaper(x, W, H, null);
var G3 = B.game;
x.textAlign = "center";
x.fillStyle = "#E8CFA0";
x.font = "bold " + Math.round(W / 12) + "px Georgia";
x.fillText(G3 ? ("Game " + G3.id) : "Bingo", W / 2, H * 0.25);
x.fillStyle = "#F2D8E6";
x.font = Math.round(W / 18) + "px Georgia";
if (G3) {
x.fillText(({ line: "Any line", corners: "Four corners", x: "The X", full: "Full house" })[G3.pattern] || "", W / 2, H * 0.45);
x.fillText((G3.calls || []).length + " of 75 called", W / 2, H * 0.62);
var wn = (G3.winners || []).map(function (w) { return w.name; }).join(", ");
if (wn)
x.fillText("Winner: " + wn.slice(0, 30), W / 2, H * 0.8);
else
x.fillText("Hosted by " + (G3.host_name || "the house"), W / 2, H * 0.8);
}
}
else if (S.kind === "cctv") {
x.fillStyle = "#140E1A";
x.fillRect(0, 0, W, H);
x.font = "11px monospace";
x.textAlign = "left";
["FOYER", "BINGO", "MAHJONG", "TEA ROOM", "CARDS", "CROWN", "SHOP", "STAFF"].forEach(function (n, i) {
var cx3 = (i % 4) * (W / 4), cy3 = Math.floor(i / 4) * (H / 2);
x.fillStyle = "#2A2032";
x.fillRect(cx3 + 3, cy3 + 3, W / 4 - 6, H / 2 - 6);
x.fillStyle = "#7A5A8A";
for (var q = 0; q < 5; q++)
x.fillRect(cx3 + 10 + ((q * 23 + Math.floor(LL.t * 0.25 + i * 3)) % (W / 4 - 24)), cy3 + H / 4 + (q % 2) * 10, 5, 12);
x.fillStyle = "#E8C8E0";
x.fillText(n, cx3 + 8, cy3 + 16);
});
}
S.tex.needsUpdate = true;
},
function () {
if (LLG.el)
return LLG.el;
var e = document.createElement("div");
e.id = "ll-game";
e.style.cssText = "position:fixed;z-index:52;left:50%;top:50%;transform:translate(-50%,-50%);width:min(1000px,calc(100vw - 12px));height:min(760px,calc(100vh - 12px));" +
"display:none;flex-direction:column;background:linear-gradient(180deg,#3A1A4A,#24102E);border:2px solid #C9A868;border-radius:10px;box-shadow:0 16px 60px rgba(0,0,0,.6);" +
"color:#F2E4EC;font:13px var(--sans,system-ui);overflow:hidden";
e.innerHTML = "<div id='ll-g-head' style='display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding:7px 10px;border-bottom:1px solid rgba(201,168,104,.5)'></div>" +
"<div id='ll-g-msg' style='padding:4px 12px;min-height:18px;color:#F2C8E0'></div>" +
"<div id='ll-g-body' style='position:relative;flex:1;min-height:0'><canvas id='ll-g-cv' style='position:absolute;left:0;top:0;width:100%;height:100%;touch-action:none'></canvas>" +
"<div id='ll-g-list' style='position:absolute;inset:0;overflow:auto;padding:8px 12px;display:none'></div></div>";
document.body.appendChild(e);
LLG.el = e;
LLG.cv = e.querySelector("#ll-g-cv");
e.addEventListener("keydown", function (ev) { ev.stopPropagation(); });
LLG.cv.addEventListener("pointerdown", function (ev) {
if (!LLG.G || !LLG.G.tap)
return;
ev.preventDefault();
var r = LLG.cv.getBoundingClientRect();
LLG.G.tap(ev.clientX - r.left, ev.clientY - r.top);
llGameDraw();
});
e.addEventListener("click", function (ev) {
var b = ev.target && ev.target.closest ? ev.target.closest("[data-llg]") : null;
if (!b)
return;
var k = b.getAttribute("data-llg");
if (k === "close")
llGameClose();
else if (k === "list") {
LLG.list = !LLG.list;
llGameDraw();
}
else if (k.indexOf("mv") === 0) {
var M = LLG.mvs && LLG.mvs[+k.slice(2)];
if (M) {
M.fn();
llGameDraw();
}
}
else if (LLG.G && LLG.G.btn && LLG.G.btn[k]) {
LLG.G.btn[k]();
llGameDraw();
}
});
addEventListener("resize", function () { if (LLG.on)
llGameDraw(); });
if (!LLG.keyHook) {
LLG.keyHook = true;
addEventListener("keydown", function (ev) {
if (!LLG.on)
return;
if (ev.code === "Escape") {
llGameClose();
ev.preventDefault();
}
else if (!/INPUT|TEXTAREA|SELECT/.test((ev.target && ev.target.tagName) || ""))
ev.stopImmediatePropagation();
}, true);
}
return e;
},
function (G, opt) {
opt = opt || {};
llGameEl();
worldCard(null);
LLG.on = G.key;
LLG.G = G;
LLG.t0 = 0;
LLG.secs = 0;
LLG.moves = 0;
LLG.won = false;
LLG.tourney = opt.tourney || null;
LLG.msg = opt.msg || "";
LLG.cyc = null;
LLG.el.style.display = "flex";
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
llGameDraw();
},
function () {
if (!LLG.on || !LLG.G)
return;
var G = LLG.G, e = LLG.el, head = e.querySelector("#ll-g-head"), list = e.querySelector("#ll-g-list"), cv = LLG.cv;
var asList = LLG.list || llVR();
var hb = (G.head ? G.head() : []).map(function (b) { return "<button class='btn' data-llg='" + b[0] + "' style='padding:4px 9px'>" + b[1] + "</button>"; }).join("");
var hh = "<b style='font:600 16px var(--serif,Georgia);color:#F2D9A8;margin-right:6px'>" + esc(G.title) + "</b>" +
(LLG.tourney ? "<span style='color:#E8CFA0'>🏆 " + esc(LLG.tourney.title || "Tournament") + "</span>" : "") +
"<span style='margin-left:auto;opacity:.85'>⏱ " + llSecs(llClock()) + (G.noMoves ? "" : " · " + LLG.moves + " moves") + "</span>" + hb +
"<button class='btn' data-llg='list' style='padding:4px 9px'>" + (asList ? "🃏 Table" : "📋 Moves as a list") + "</button>" +
"<button class='btn' data-llg='close' style='padding:4px 9px'>✕ Close</button>";
if (head.dataset.h !== hh) {
head.dataset.h = hh;
head.innerHTML = hh;
}
var m = e.querySelector("#ll-g-msg");
if (m.dataset.h !== LLG.msg) {
m.dataset.h = LLG.msg;
m.innerHTML = LLG.msg;
}
if (asList) {
cv.style.display = "none";
list.style.display = "block";
var mv = G.moves ? G.moves() : [];
LLG.mvs = mv;
var h = "<div style='white-space:pre-wrap;line-height:1.5;margin-bottom:6px'>" + esc(G.text ? G.text() : "") + "</div>";
h += mv.length ? mv.map(function (q, i) { return "<button class='btn' data-llg='mv" + i + "' style='display:block;width:100%;text-align:left;margin:4px 0;padding:8px 10px'>" + esc(q.label) + "</button>"; }).join("")
: "<div style='opacity:.8'>No moves just now.</div>";
if (list.dataset.h !== h) {
list.dataset.h = h;
list.innerHTML = h;
}
return;
}
cv.style.display = "block";
list.style.display = "none";
var r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1), W = Math.max(200, r.width), H = Math.max(160, r.height);
if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) {
cv.width = Math.round(W * dpr);
cv.height = Math.round(H * dpr);
}
var x = cv.getContext("2d");
x.setTransform(dpr, 0, 0, dpr, 0, 0);
var bg = x.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, Math.max(W, H) * 0.7);
bg.addColorStop(0, "#5A2A6E");
bg.addColorStop(1, "#2E1238");
x.fillStyle = bg;
x.fillRect(0, 0, W, H);
LLG.hits = [];
G.draw(x, W, H);
},
function (game) {
if (LLG.won)
return;
LLG.won = true;
LLG.secs = llClock();
var t = llSecs(LLG.secs), T = LLG.tourney;
llSay("🌹 <b>Won, in " + t + "!</b> " + (T ? "Sending your time to the Crown Room…" : "Beautifully played."));
if (typeof playTone === "function") {
[523, 659, 784, 1047].forEach(function (f, i) { setTimeout(function () { playTone(f, 0.35); }, i * 180); });
}
if (T && T.id && llSigned())
cityRpc("lounge_score", { p_tourney: T.id, p_secs: LLG.secs, p_moves: LLG.moves }).then(function (o) {
llSay("🌹 <b>Won, in " + t + "!</b> " + esc((o && o.say) || "Your time is on the board."));
llLoadState(true).then(llScreensAll);
})
.catch(function (e) { llSay("🌹 <b>Won, in " + t + "!</b> " + llSoft(e)); });
else if (T && !llSigned())
llSay("🌹 <b>Won, in " + t + "!</b> Sign in to put your times on the tournament board.");
},
function (from, idx, dests, doMove, undo) {
var C = LLG.cyc, ds, n = 0;
if (C && C.at === LLG.moves && C.key === from.kind + ":" + (from.col || 0) + ":" + idx) {
undo();
from = C.from;
idx = C.idx;
ds = dests(from, idx);
n = (C.n + 1) % Math.max(1, ds.length);
}
else
ds = dests(from, idx);
if (!ds.length) {
llSay("That has nowhere to go just now.");
LLG.cyc = null;
return;
}
var landed = doMove(from, idx, ds[n]);
llSay(ds.length > 1 ? "Tap it again for the next place it could go." : "");
LLG.cyc = { key: landed, from: from, idx: idx, n: n, at: LLG.moves };
},
function (x, c, X, Y, w, h, sel) {
var r = Math.max(3, w * 0.08);
if (!c) {
llRound(x, X, Y, w, h, r);
x.strokeStyle = "rgba(232,207,160,.45)";
x.lineWidth = 1.5;
x.stroke();
return;
}
if (!c.up) {
llRound(x, X, Y, w, h, r);
x.fillStyle = "#6A3482";
x.fill();
x.strokeStyle = "#C9A868";
x.lineWidth = 1.5;
x.stroke();
x.save();
llRound(x, X + 3, Y + 3, w - 6, h - 6, r * 0.7);
x.clip();
x.strokeStyle = "rgba(232,200,160,.45)";
x.lineWidth = 1;
for (var k = -h; k < w + h; k += w / 5) {
x.beginPath();
x.moveTo(X + k, Y);
x.lineTo(X + k + h, Y + h);
x.stroke();
x.beginPath();
x.moveTo(X + k + h, Y);
x.lineTo(X + k, Y + h);
x.stroke();
}
x.restore();
return;
}
llRound(x, X, Y, w, h, r);
x.fillStyle = sel ? "#F6E2B8" : "#F2EAE4";
x.fill();
x.strokeStyle = sel ? "#C9A868" : "rgba(90,40,90,.55)";
x.lineWidth = sel ? 3 : 1.2;
x.stroke();
var col = llRed(c) ? "#B0306A" : "#2A1236", fs = Math.max(10, w * 0.27);
x.fillStyle = col;
x.textAlign = "left";
x.textBaseline = "top";
x.font = "bold " + fs + "px Georgia";
x.fillText(LL_RANK[c.r], X + w * 0.08, Y + h * 0.04);
x.font = fs * 0.9 + "px sans-serif";
x.fillText(LL_SUIT[c.s], X + w * 0.08, Y + h * 0.04 + fs * 0.95);
x.textAlign = "center";
x.textBaseline = "middle";
x.font = (w * 0.5) + "px sans-serif";
x.fillText(LL_SUIT[c.s], X + w * 0.55, Y + h * 0.6);
x.textBaseline = "alphabetic";
},
function (opt) {
opt = opt || {};
var seed = opt.seed || ((Math.random() * 1e9) | 0), three = !!opt.three;
var S = { stock: [], waste: [], found: [[], [], [], []], tab: [[], [], [], [], [], [], []] }, hist = [];
function deal() { var d = llShuffle(llDeck(), seed); for (var c = 0; c < 7; c++)
for (var r = 0; r <= c; r++) {
var k = d.pop();
k.up = r === c;
S.tab[c].push(k);
} S.stock = d; }
deal();
function snap() { hist.push(JSON.stringify(S)); if (hist.length > 300)
hist.shift(); }
function flip() { S.tab.forEach(function (t) { var l = t[t.length - 1]; if (l && !l.up)
l.up = true; }); }
function fTo(c) { var f = S.found[c.s]; return f.length === c.r - 1; }
function tTo(c, col) { var t = S.tab[col], l = t[t.length - 1]; if (!l)
return c.r === 13; return l.up && llRed(l) !== llRed(c) && l.r === c.r + 1; }
function won() { return S.found.every(function (f) { return f.length === 13; }); }
function after() { flip(); llMoved(); if (won())
llGameWon("klondike"); }
function draw() {
snap();
if (!S.stock.length) {
if (!S.waste.length) {
hist.pop();
return false;
}
S.stock = S.waste.reverse().map(function (c) { c.up = false; return c; });
S.waste = [];
llMoved();
return true;
}
for (var i = 0; i < (three ? 3 : 1) && S.stock.length; i++) {
var c = S.stock.pop();
c.up = true;
S.waste.push(c);
}
llMoved();
return true;
}
function dests(from, idx) {
var run = from.kind === "tab" ? S.tab[from.col].slice(idx) : [from.kind === "waste" ? S.waste[S.waste.length - 1] : S.found[from.col][S.found[from.col].length - 1]];
var c = run[0], out = [];
if (!c || !c.up)
return out;
if (run.length === 1 && from.kind !== "found" && fTo(c))
out.push({ kind: "found" });
for (var k = 0; k < 7; k++) {
if (from.kind === "tab" && from.col === k)
continue;
if (tTo(c, k))
out.push({ kind: "tab", col: k });
}
var seenEmpty = false;
out = out.filter(function (d) { if (d.kind !== "tab" || S.tab[d.col].length)
return true; if (seenEmpty)
return false; if (from.kind === "tab" && idx === 0)
return false; seenEmpty = true; return true; });
return out;
}
function move(from, idx, d) {
snap();
var run;
if (from.kind === "tab")
run = S.tab[from.col].splice(idx);
else if (from.kind === "waste")
run = [S.waste.pop()];
else
run = [S.found[from.col].pop()];
if (d.kind === "found")
S.found[run[0].s].push(run[0]);
else
S.tab[d.col] = S.tab[d.col].concat(run);
after();
}
function where(d) { return d.kind === "found" ? "found:" + (d.s || 0) + ":0" : d.kind === "cell" ? "cell:" + d.col + ":0" : "tab:" + d.col + ":" + S.tab[d.col].length; }
function tapCard(from, idx) {
llTapCycle(from, idx, dests, function (f, i, d) { var w = where(d.kind === "found" ? { kind: "found", s: (f.kind === "tab" ? S.tab[f.col][i] : f.kind === "waste" ? S.waste[S.waste.length - 1] : S.found[f.col][S.found[f.col].length - 1]).s } : d); move(f, i, d); return w; }, function () { if (hist.length) {
S = JSON.parse(hist.pop());
LLG.moves--;
} });
}
function auto() {
var any = true, n = 0;
while (any && n < 60) {
any = false;
n++;
if (S.waste.length && fTo(S.waste[S.waste.length - 1])) {
move({ kind: "waste" }, 0, { kind: "found" });
any = true;
continue;
}
for (var k = 0; k < 7; k++) {
var t = S.tab[k], l = t[t.length - 1];
if (l && l.up && fTo(l)) {
move({ kind: "tab", col: k }, t.length - 1, { kind: "found" });
any = true;
break;
}
}
}
}
function canAuto() { return !S.stock.length && S.tab.every(function (t) { return t.every(function (c) { return c.up; }); }); }
var G = { key: "klondike", title: "Klondike solitaire" + (three ? " (draw three)" : ""), seed: seed,
head: function () { var b = [["undo", "↶ Undo"], ["deal", "New deal"]]; if (canAuto() && !won())
b.unshift(["auto", "✨ Finish"]); return b; },
btn: { undo: function () { if (hist.length && !LLG.won) {
S = JSON.parse(hist.pop());
llMoved();
} },
deal: function () { llCardsGo(three ? "klondike3" : "klondike"); },
auto: function () { auto(); } },
draw: function (x, W, H) {
var cw = Math.min((W - 24) / 7.4, (H - 30) / 5.6), ch = cw * 1.42, gap = (W - 7 * cw) / 8, y0 = 10;
function cx(k) { return gap + k * (cw + gap); }
llDrawCard(x, S.stock.length ? { up: false } : null, cx(0), y0, cw, ch);
llHit(cx(0), y0, cw, ch, { kind: "stock" });
if (!S.stock.length) {
x.fillStyle = "rgba(232,207,160,.6)";
x.font = (cw * 0.35) + "px sans-serif";
x.textAlign = "center";
x.fillText("↻", cx(0) + cw / 2, y0 + ch * 0.6);
}
var ws = S.waste.slice(three ? -3 : -1);
ws.forEach(function (c, i) { var X = cx(1) + i * cw * 0.22; llDrawCard(x, c, X, y0, cw, ch); if (i === ws.length - 1)
llHit(X, y0, cw, ch, { kind: "waste" }); });
if (!ws.length)
llDrawCard(x, null, cx(1), y0, cw, ch);
for (var f = 0; f < 4; f++) {
var F = S.found[f], X2 = cx(3 + f);
llDrawCard(x, F[F.length - 1] || null, X2, y0, cw, ch);
if (!F.length) {
x.fillStyle = "rgba(232,207,160,.35)";
x.font = (cw * 0.45) + "px sans-serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(LL_SUIT[f], X2 + cw / 2, y0 + ch / 2);
x.textBaseline = "alphabetic";
}
else
llHit(X2, y0, cw, ch, { kind: "found", col: f });
}
var y1 = y0 + ch + gap * 1.2;
for (var k = 0; k < 7; k++) {
var T = S.tab[k], X3 = cx(k), y = y1, room = H - y1 - ch - 6, nd = 0, nu = 0;
T.forEach(function (c) { if (c.up)
nu++;
else
nd++; });
var fd = Math.min(ch * 0.12, room / Math.max(1, nd + nu)), fu = nu > 1 ? Math.min(ch * 0.3, (room - nd * fd) / (nu - 1)) : 0;
if (!T.length) {
llDrawCard(x, null, X3, y, cw, ch);
llHit(X3, y, cw, ch, { kind: "empty", col: k });
}
T.forEach(function (c, i) { llDrawCard(x, c, X3, y, cw, ch); llHit(X3, y, cw, i === T.length - 1 ? ch : (c.up ? fu : fd), { kind: "tab", col: k, idx: i }); y += c.up ? fu : fd; });
}
if (LLG.won) {
x.fillStyle = "rgba(42,18,54,.75)";
x.fillRect(0, H / 2 - 40, W, 80);
x.fillStyle = "#F2D9A8";
x.textAlign = "center";
x.font = "bold 30px Georgia";
x.fillText("🌹 Won in " + llSecs(LLG.secs) + " 🌹", W / 2, H / 2 + 10);
}
},
tap: function (px, py) {
if (LLG.won)
return;
var h = llHitAt(px, py);
if (!h)
return;
if (h.kind === "stock") {
draw();
llSay("");
return;
}
if (h.kind === "waste")
return tapCard({ kind: "waste" }, 0);
if (h.kind === "found")
return tapCard({ kind: "found", col: h.col }, 0);
if (h.kind === "tab") {
var c = S.tab[h.col][h.idx];
if (!c.up) {
if (h.idx === S.tab[h.col].length - 1) {
snap();
c.up = true;
llMoved();
}
return;
}
return tapCard({ kind: "tab", col: h.col }, h.idx);
}
},
text: function () {
var t = "Stock " + S.stock.length + " · Waste " + (S.waste.length ? llCardName(S.waste[S.waste.length - 1]) : "empty") + "\nHome: " + S.found.map(function (f, i) { return LL_SUIT[i] + (f.length ? LL_RANK[f.length] : "–"); }).join(" ") + "\n";
t += S.tab.map(function (T, i) {
var d = T.filter(function (c) { return !c.up; }).length, u = T.filter(function (c) { return c.up; }).map(llCardName).join(" ");
return (i + 1) + ": " + (d ? "▮×" + d + " " : "") + (u || (T.length ? "" : "empty"));
}).join("\n");
return t;
},
moves: function () {
var out = [];
if (LLG.won)
return [{ label: "New deal", fn: G.btn.deal }];
if (canAuto())
out.push({ label: "✨ Finish: send every card home", fn: auto });
function add(from, idx, label) { dests(from, idx).forEach(function (d) { out.push({ label: label + " → " + (d.kind === "found" ? "home" : "column " + (d.col + 1) + (S.tab[d.col].length ? "" : " (empty)")), fn: function () { move(from, idx, d); } }); }); }
if (S.waste.length)
add({ kind: "waste" }, 0, "Waste " + llCardName(S.waste[S.waste.length - 1]));
S.tab.forEach(function (T, k) {
T.forEach(function (c, i) {
if (c.up && (i === 0 || !T[i - 1].up))
add({ kind: "tab", col: k }, i, llCardName(c) + (i < T.length - 1 ? " and the cards on it" : "") + " from column " + (k + 1));
if (c.up && i === T.length - 1 && i > 0 && T[i - 1].up)
add({ kind: "tab", col: k }, i, llCardName(c) + " from column " + (k + 1));
});
});
out.push({ label: S.stock.length ? "Turn over from the stock" : "Turn the waste back into the stock", fn: function () { draw(); } });
if (hist.length)
out.push({ label: "↶ Undo", fn: G.btn.undo });
return out;
}
};
return G;
},
function (n) {
var seed = n >>> 0, d = [];
for (var i = 0; i < 52; i++)
d.push(i);
function rnd() { seed = (Math.imul(seed, 214013) + 2531011) & 0x7fffffff; return seed >>> 16; }
var tab = [[], [], [], [], [], [], [], []], suitMap = [3, 2, 1, 0];
for (var k = 52; k > 0; k--) {
var j = rnd() % k, c = d[j];
d[j] = d[k - 1];
tab[(52 - k) % 8].push({ s: suitMap[c % 4], r: Math.floor(c / 4) + 1, up: true });
}
return tab;
},
function (opt) {
opt = opt || {};
var deal = opt.seed ? ((opt.seed % 32000) + 1) : (1 + Math.floor(Math.random() * 32000));
var S = { cells: [null, null, null, null], found: [[], [], [], []], tab: llFreecellDeal(deal) }, hist = [];
function snap() { hist.push(JSON.stringify(S)); if (hist.length > 300)
hist.shift(); }
function won() { return S.found.every(function (f) { return f.length === 13; }); }
function fTo(c) { return S.found[c.s].length === c.r - 1; }
function freeCells() { return S.cells.filter(function (c) { return !c; }).length; }
function emptyCols(except) { var n = 0; S.tab.forEach(function (t, i) { if (!t.length && i !== except)
n++; }); return n; }
function isRun(T, idx) { for (var i = idx; i < T.length - 1; i++) {
var a = T[i], b = T[i + 1];
if (llRed(a) === llRed(b) || a.r !== b.r + 1)
return false;
} return true; }
function maxMove(toEmpty) { return (freeCells() + 1) * Math.pow(2, Math.max(0, emptyCols() - (toEmpty ? 1 : 0))); }
function dests(from, idx) {
var run = from.kind === "tab" ? S.tab[from.col].slice(idx) : [S.cells[from.col]], c = run[0], out = [];
if (!c)
return out;
if (from.kind === "tab" && !isRun(S.tab[from.col], idx))
return out;
if (run.length === 1 && fTo(c))
out.push({ kind: "found" });
var firstEmpty = -1;
for (var k = 0; k < 8; k++) {
if (from.kind === "tab" && from.col === k)
continue;
var T = S.tab[k], l = T[T.length - 1];
if (l) {
if (llRed(l) !== llRed(c) && l.r === c.r + 1 && run.length <= maxMove(false))
out.push({ kind: "tab", col: k });
}
else if (firstEmpty < 0 && !(from.kind === "tab" && idx === 0) && run.length <= maxMove(true)) {
firstEmpty = k;
}
}
if (firstEmpty >= 0)
out.push({ kind: "tab", col: firstEmpty });
if (run.length === 1 && from.kind === "tab") {
var fc = S.cells.indexOf(null);
if (fc >= 0)
out.push({ kind: "cell", col: fc });
}
return out;
}
function move(from, idx, d, quiet) {
if (!quiet)
snap();
var run = from.kind === "tab" ? S.tab[from.col].splice(idx) : [S.cells[from.col]];
if (from.kind === "cell")
S.cells[from.col] = null;
if (d.kind === "found")
S.found[run[0].s].push(run[0]);
else if (d.kind === "cell")
S.cells[d.col] = run[0];
else
S.tab[d.col] = S.tab[d.col].concat(run);
if (!quiet) {
llMoved();
autoHome();
if (won())
llGameWon("freecell");
}
}
function safe(c) {
if (!fTo(c))
return false;
if (c.r <= 2)
return true;
var red = llRed(c);
return S.found.every(function (f, s) { var r2 = (s === 1 || s === 2); return r2 === red || f.length >= c.r - 1; });
}
function autoHome() {
var any = true;
while (any) {
any = false;
for (var i = 0; i < 4; i++) {
var c = S.cells[i];
if (c && safe(c)) {
move({ kind: "cell", col: i }, 0, { kind: "found" }, true);
any = true;
}
}
for (var k = 0; k < 8; k++) {
var T = S.tab[k], l = T[T.length - 1];
if (l && safe(l)) {
move({ kind: "tab", col: k }, T.length - 1, { kind: "found" }, true);
any = true;
}
}
}
}
function where(d, c) { return d.kind === "found" ? "found:" + c.s + ":0" : d.kind === "cell" ? "cell:" + d.col + ":0" : "tab:" + d.col + ":" + S.tab[d.col].length; }
function tapCard(from, idx) {
if (from.kind === "tab" && !isRun(S.tab[from.col], idx)) {
llSay("Only a run of alternating colours moves together.");
return;
}
llTapCycle(from, idx, dests, function (f, i, d) { var c = f.kind === "tab" ? S.tab[f.col][i] : S.cells[f.col], w = where(d, c); move(f, i, d); return w; }, function () { if (hist.length) {
S = JSON.parse(hist.pop());
LLG.moves--;
} });
}
var G = { key: "freecell", title: "FreeCell · deal " + deal, seed: deal,
head: function () { return [["undo", "↶ Undo"], ["deal", "New deal"]]; },
btn: { undo: function () { if (hist.length && !LLG.won) {
S = JSON.parse(hist.pop());
llMoved();
} }, deal: function () { llCardsGo("freecell"); } },
draw: function (x, W, H) {
var cw = Math.min((W - 30) / 8.6, (H - 30) / 5.2), ch = cw * 1.42, gap = (W - 8 * cw) / 9, y0 = 10;
function cx(k) { return gap + k * (cw + gap); }
for (var i = 0; i < 4; i++) {
llDrawCard(x, S.cells[i], cx(i), y0, cw, ch);
if (S.cells[i])
llHit(cx(i), y0, cw, ch, { kind: "cell", col: i });
}
for (var f = 0; f < 4; f++) {
var F = S.found[f], X = cx(4 + f);
llDrawCard(x, F[F.length - 1] || null, X, y0, cw, ch);
if (!F.length) {
x.fillStyle = "rgba(232,207,160,.35)";
x.font = (cw * 0.45) + "px sans-serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(LL_SUIT[f], X + cw / 2, y0 + ch / 2);
x.textBaseline = "alphabetic";
}
}
var y1 = y0 + ch + gap * 1.3;
for (var k = 0; k < 8; k++) {
var T = S.tab[k], X2 = cx(k), y = y1, fu = T.length > 1 ? Math.min(ch * 0.3, (H - y1 - ch - 6) / (T.length - 1)) : 0;
if (!T.length)
llDrawCard(x, null, X2, y, cw, ch);
T.forEach(function (c, i) { llDrawCard(x, c, X2, y, cw, ch); llHit(X2, y, cw, i === T.length - 1 ? ch : fu, { kind: "tab", col: k, idx: i }); y += fu; });
}
if (LLG.won) {
x.fillStyle = "rgba(42,18,54,.75)";
x.fillRect(0, H / 2 - 40, W, 80);
x.fillStyle = "#F2D9A8";
x.textAlign = "center";
x.font = "bold 30px Georgia";
x.fillText("🌹 Won in " + llSecs(LLG.secs) + " 🌹", W / 2, H / 2 + 10);
}
},
tap: function (px, py) {
if (LLG.won)
return;
var h = llHitAt(px, py);
if (!h)
return;
if (h.kind === "cell")
return tapCard({ kind: "cell", col: h.col }, 0);
if (h.kind === "tab")
return tapCard({ kind: "tab", col: h.col }, h.idx);
},
text: function () {
return "Free cells: " + S.cells.map(function (c) { return c ? llCardName(c) : "–"; }).join(" ") + "\nHome: " + S.found.map(function (f, i) { return LL_SUIT[i] + (f.length ? LL_RANK[f.length] : "–"); }).join(" ") + "\n" +
S.tab.map(function (T, i) { return (i + 1) + ": " + (T.length ? T.map(llCardName).join(" ") : "empty"); }).join("\n");
},
moves: function () {
if (LLG.won)
return [{ label: "New deal", fn: G.btn.deal }];
var out = [];
function add(from, idx, label) { dests(from, idx).forEach(function (d) { out.push({ label: label + " → " + (d.kind === "found" ? "home" : d.kind === "cell" ? "a free cell" : "column " + (d.col + 1) + (S.tab[d.col].length ? "" : " (empty)")), fn: function () { move(from, idx, d); } }); }); }
S.cells.forEach(function (c, i) { if (c)
add({ kind: "cell", col: i }, 0, llCardName(c) + " from a free cell"); });
S.tab.forEach(function (T, k) { for (var i = 0; i < T.length; i++) {
if (isRun(T, i))
add({ kind: "tab", col: k }, i, llCardName(T[i]) + (i < T.length - 1 ? " and the " + (T.length - 1 - i) + " on it" : "") + " from column " + (k + 1));
} });
if (hist.length)
out.push({ label: "↶ Undo", fn: G.btn.undo });
return out;
}
};
return G;
},
function (t, w, h) {
var key = t + "|" + Math.round(w) + "|" + Math.round(h);
if (LL_TILEC[key])
return LL_TILEC[key];
var c = document.createElement("canvas"), dpr = Math.min(2, window.devicePixelRatio || 1);
c.width = Math.ceil(w * dpr);
c.height = Math.ceil(h * dpr);
var x = c.getContext("2d");
x.scale(dpr, dpr);
llRound(x, 0.5, 0.5, w - 1, h - 1, w * 0.12);
x.fillStyle = "#F4EEE2";
x.fill();
x.strokeStyle = "rgba(120,90,110,.5)";
x.lineWidth = 1;
x.stroke();
var cx = w / 2, cy = h / 2, s = Math.min(w, h);
x.textAlign = "center";
x.textBaseline = "middle";
if (t < 9) {
var n = t + 1, P = { 1: [[0, 0]], 2: [[0, -1], [0, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
6: [[-1, -1.2], [1, -1.2], [-1, 0], [1, 0], [-1, 1.2], [1, 1.2]], 7: [[-1, -1.3], [0, -1], [1, -0.7], [-1, 0.4], [1, 0.4], [-1, 1.3], [1, 1.3]], 8: [[-1, -1.4], [1, -1.4], [-1, -0.47], [1, -0.47], [-1, 0.47], [1, 0.47], [-1, 1.4], [1, 1.4]],
9: [[-1, -1.2], [0, -1.2], [1, -1.2], [-1, 0], [0, 0], [1, 0], [-1, 1.2], [0, 1.2], [1, 1.2]] }[n];
var r = n === 1 ? s * 0.3 : s * (n > 6 ? 0.1 : 0.12), sp = n === 1 ? 0 : w * 0.27, spy = h * 0.25;
P.forEach(function (p, i) {
var px = cx + p[0] * sp, py = cy + p[1] * spy;
x.fillStyle = n === 1 ? "#B0306A" : (i % 3 === 0 ? "#2A5A9A" : i % 3 === 1 ? "#2A7A4A" : "#B0306A");
x.beginPath();
x.arc(px, py, r, 0, 7);
x.fill();
x.fillStyle = "#F4EEE2";
x.beginPath();
x.arc(px, py, r * 0.45, 0, 7);
x.fill();
x.fillStyle = x.strokeStyle;
});
}
else if (t < 18) {
var b = t - 8;
if (b === 1) {
x.fillStyle = "#2A7A4A";
x.beginPath();
x.ellipse(cx, cy + h * 0.06, w * 0.2, h * 0.24, 0, 0, 7);
x.fill();
x.fillStyle = "#B0306A";
x.beginPath();
x.arc(cx, cy - h * 0.2, w * 0.12, 0, 7);
x.fill();
x.fillStyle = "#E8C870";
x.beginPath();
x.moveTo(cx + w * 0.1, cy - h * 0.22);
x.lineTo(cx + w * 0.24, cy - h * 0.18);
x.lineTo(cx + w * 0.1, cy - h * 0.15);
x.fill();
}
else {
var cols = b <= 3 ? b : b <= 6 ? 3 : 3, rows = Math.ceil(b / cols), bw = w * 0.11, bh = h * 0.62 / rows;
for (var i = 0; i < b; i++) {
var rr = Math.floor(i / cols), cc = i % cols, nInRow = Math.min(cols, b - rr * cols), px2 = cx + (cc - (nInRow - 1) / 2) * w * 0.24, py2 = cy + (rr - (rows - 1) / 2) * bh * 1.08;
x.fillStyle = (b === 5 || b === 7 || b === 9) && i === Math.floor(b / 2) ? "#B0306A" : "#2A7A4A";
llRound(x, px2 - bw / 2, py2 - bh * 0.45, bw, bh * 0.9, bw * 0.4);
x.fill();
x.fillStyle = "rgba(244,238,226,.7)";
x.fillRect(px2 - bw / 2, py2 - 1, bw, 2);
}
}
}
else if (t < 27) {
x.fillStyle = "#2A3A7A";
x.font = "bold " + (s * 0.42) + "px 'Noto Sans CJK SC','WenQuanYi Zen Hei','Microsoft YaHei',serif";
x.fillText(LL_NUMC[t - 18], cx, cy - h * 0.17);
x.fillStyle = "#B0306A";
x.font = "bold " + (s * 0.44) + "px 'Noto Sans CJK SC','WenQuanYi Zen Hei','Microsoft YaHei',serif";
x.fillText("萬", cx, cy + h * 0.2);
}
else if (t < 31) {
x.fillStyle = "#2A1236";
x.font = "bold " + (s * 0.62) + "px 'Noto Sans CJK SC','WenQuanYi Zen Hei','Microsoft YaHei',serif";
x.fillText(LL_WINDC[t - 27], cx, cy + h * 0.03);
}
else if (t === 31) {
x.fillStyle = "#B0306A";
x.font = "bold " + (s * 0.62) + "px 'Noto Sans CJK SC','WenQuanYi Zen Hei','Microsoft YaHei',serif";
x.fillText("中", cx, cy + h * 0.03);
}
else if (t === 32) {
x.fillStyle = "#2A7A4A";
x.font = "bold " + (s * 0.58) + "px 'Noto Sans CJK SC','WenQuanYi Zen Hei','Microsoft YaHei',serif";
x.fillText("發", cx, cy + h * 0.03);
}
else if (t === 33) {
x.strokeStyle = "#2A5A9A";
x.lineWidth = Math.max(2, w * 0.07);
x.strokeRect(w * 0.22, h * 0.2, w * 0.56, h * 0.6);
x.lineWidth = 1;
x.strokeRect(w * 0.3, h * 0.27, w * 0.4, h * 0.46);
}
else {
var fl = t < 38, q = fl ? LL_FLOWER[t - 34] : LL_SEASON[t - 38];
for (var p = 0; p < 5; p++) {
var a = p / 5 * 6.283;
x.fillStyle = fl ? "#D88AB8" : "#E8A050";
x.beginPath();
x.arc(cx + Math.cos(a) * w * 0.13, cy - h * 0.1 + Math.sin(a) * w * 0.13, w * 0.1, 0, 7);
x.fill();
}
x.fillStyle = "#C9A040";
x.beginPath();
x.arc(cx, cy - h * 0.1, w * 0.07, 0, 7);
x.fill();
x.fillStyle = fl ? "#8A2A6A" : "#2A5A2A";
x.font = "bold " + (s * 0.3) + "px 'Noto Sans CJK SC','WenQuanYi Zen Hei','Microsoft YaHei',serif";
x.fillText(q[1], cx, cy + h * 0.27);
}
x.fillStyle = "rgba(42,18,54,.75)";
x.font = "bold " + Math.max(8, s * 0.2) + "px sans-serif";
x.textAlign = "left";
x.textBaseline = "top";
var idx = t < 27 ? String(t % 9 + 1) : t < 31 ? "ESWN"[t - 27] : t < 34 ? ["R", "G", "W"][t - 31] : String(t < 38 ? t - 33 : t - 37);
x.fillText(idx, w * 0.07, h * 0.04);
return (LL_TILEC[key] = c);
},
function (x, t, X, Y, w, h, o) {
o = o || {};
var d = Math.max(2, w * 0.1);
llRound(x, X - d, Y + d, w, h, w * 0.12);
x.fillStyle = o.back ? "#3A1A4A" : "#8AB8A0";
x.fill();
llRound(x, X - d * 0.5, Y + d * 0.5, w, h, w * 0.12);
x.fillStyle = o.back ? "#5A2A6E" : "#E2D6C4";
x.fill();
if (o.back) {
llRound(x, X, Y, w, h, w * 0.12);
x.fillStyle = "#6A3482";
x.fill();
x.strokeStyle = "#C9A868";
x.lineWidth = 1.2;
x.stroke();
return;
}
x.drawImage(llTileFace(t, w, h), X, Y, w, h);
if (o.dim) {
llRound(x, X, Y, w, h, w * 0.12);
x.fillStyle = "rgba(40,20,50,.28)";
x.fill();
}
if (o.sel) {
llRound(x, X - 1, Y - 1, w + 2, h + 2, w * 0.12);
x.strokeStyle = "#E8B830";
x.lineWidth = 3;
x.stroke();
}
if (o.hint) {
llRound(x, X - 1, Y - 1, w + 2, h + 2, w * 0.12);
x.strokeStyle = "#D88AB8";
x.lineWidth = 3;
x.stroke();
}
},
function () {
var P = [], rows = [12, 8, 10, 12, 12, 10, 8, 12];
rows.forEach(function (L, r) { var c0 = (12 - L) / 2; for (var c = 0; c < L; c++)
P.push({ x: (c0 + c) * 2, y: r * 2, z: 0 }); });
P.push({ x: -2, y: 7, z: 0 }, { x: 24, y: 7, z: 0 }, { x: 26, y: 7, z: 0 });
for (var r1 = 1; r1 <= 6; r1++)
for (var c1 = 3; c1 <= 8; c1++)
P.push({ x: c1 * 2, y: r1 * 2, z: 1 });
for (var r2 = 2; r2 <= 5; r2++)
for (var c2 = 4; c2 <= 7; c2++)
P.push({ x: c2 * 2, y: r2 * 2, z: 2 });
for (var r3 = 3; r3 <= 4; r3++)
for (var c3 = 5; c3 <= 6; c3++)
P.push({ x: c3 * 2, y: r3 * 2, z: 3 });
P.push({ x: 11, y: 7, z: 4 });
return P;
},
function (T, i, alive) {
var a = T[i];
for (var j = 0; j < T.length; j++) {
if (j === i || !alive[j])
continue;
var b = T[j];
if (b.z === a.z + 1 && Math.abs(b.x - a.x) < 2 && Math.abs(b.y - a.y) < 2)
return false;
}
var L = false, R = false;
for (var k = 0; k < T.length; k++) {
if (k === i || !alive[k])
continue;
var c = T[k];
if (c.z !== a.z || Math.abs(c.y - a.y) >= 2)
continue;
if (c.x === a.x - 2)
L = true;
if (c.x === a.x + 2)
R = true;
}
return !(L && R);
},
function (seed) {
var R = wRand(seed), pairs = [];
for (var t = 0; t < 34; t++) {
pairs.push([t, t], [t, t]);
}
pairs.push([34, 35], [36, 37], [38, 39], [40, 41]);
for (var tries = 0; tries < 40; tries++) {
var T = llTurtle(), alive = T.map(function () { return true; }), left = T.length, ok = true, order = llShuffle(pairs.slice(), (R() * 1e9) | 0), pi = 0;
while (left > 0) {
var free = [];
for (var i = 0; i < T.length; i++)
if (alive[i] && llMjFree(T, i, alive))
free.push(i);
if (free.length < 2) {
ok = false;
break;
}
var a = free.splice(Math.floor(R() * free.length), 1)[0], b = free[Math.floor(R() * free.length)];
var p = order[pi++];
T[a].t = p[0];
T[b].t = p[1];
alive[a] = alive[b] = false;
left -= 2;
}
if (ok)
return T;
}
return null;
},
function (opt) {
opt = opt || {};
var seed = opt.seed || ((Math.random() * 1e9) | 0);
var T = llMjDeal(seed), alive = T.map(function () { return true; }), sel = -1, hint = null, hist = [], left = T.length;
var G = { key: "mjsol", title: "Mahjong solitaire", seed: seed,
head: function () { return [["hint", "💡 Hint"], ["undo", "↶ Undo"], ["shuffle", "🔀 Shuffle"], ["deal", "New deal"]]; },
btn: { hint: function () { var p = pairs(); if (!p.length) {
llSay("No pairs are free: shuffle the tiles, or undo.");
return;
} hint = p[0]; llSay("The two tiles in pink make a pair."); },
undo: function () { var h = hist.pop(); if (!h || LLG.won)
return; alive[h[0]] = alive[h[1]] = true; left += 2; sel = -1; hint = null; llMoved(); },
shuffle: function () {
var idx = [];
alive.forEach(function (a, i) { if (a)
idx.push(i); });
var faces = llShuffle(idx.map(function (i) { return T[i].t; }));
idx.forEach(function (i, k) { T[i].t = faces[k]; });
hist = [];
sel = -1;
hint = null;
llMoved();
llSay("The tiles are shuffled (undo starts afresh).");
},
deal: function () { llMahjongGo("mjsol"); } },
draw: function (x, W, H) {
var tw = Math.min((W - 20) / 15.2, (H - 20) / (8.6 * 1.3)), th = tw * 1.3, ox = (W - 15 * tw) / 2 + tw, oy = (H - 8 * th) / 2 + th * 0.1, lift = tw * 0.12;
var order = T.map(function (_, i) { return i; }).filter(function (i) { return alive[i]; }).sort(function (a, b) { return T[a].z - T[b].z || T[b].x - T[a].x || T[a].y - T[b].y; });
order.forEach(function (i) {
var q = T[i], X = ox + q.x * tw / 2 - q.z * lift, Y = oy + q.y * th / 2 - q.z * lift;
llDrawTile(x, q.t, X, Y, tw, th, { sel: i === sel, hint: hint && (hint[0] === i || hint[1] === i), dim: !llMjFree(T, i, alive) });
llHit(X, Y, tw, th, { i: i });
});
x.fillStyle = "#E8CFA0";
x.font = "13px Georgia";
x.textAlign = "left";
x.fillText(left + " tiles left · " + pairs().length + " pairs free", 10, H - 8);
if (LLG.won) {
x.fillStyle = "rgba(42,18,54,.75)";
x.fillRect(0, H / 2 - 40, W, 80);
x.fillStyle = "#F2D9A8";
x.textAlign = "center";
x.font = "bold 30px Georgia";
x.fillText("🌹 Cleared in " + llSecs(LLG.secs) + " 🌹", W / 2, H / 2 + 10);
}
},
tap: function (px, py) {
if (LLG.won)
return;
var h = llHitAt(px, py);
if (!h)
return;
var i = h.i;
if (!llMjFree(T, i, alive)) {
llSay("That tile is held: it needs a free side, left or right, and nothing on top.");
return;
}
if (sel < 0 || sel === i) {
sel = sel === i ? -1 : i;
llSay(sel < 0 ? "" : "Now tap its partner: " + llTileName(T[i].t) + ".");
return;
}
if (llTileMatch(T[sel].t, T[i].t))
take(sel, i);
else {
sel = i;
llSay("Those two don't match. Now: " + llTileName(T[i].t) + ".");
}
},
text: function () { var p = pairs(); return left + " tiles left. " + p.length + " pairs are free right now."; },
moves: function () {
if (LLG.won)
return [{ label: "New deal", fn: G.btn.deal }];
var out = pairs().map(function (p) { return { label: "Match " + llTileName(T[p[0]].t) + (T[p[0]].t === T[p[1]].t ? " with its twin" : " with " + llTileName(T[p[1]].t)), fn: function () { take(p[0], p[1]); } }; });
out.push({ label: "🔀 Shuffle the tiles", fn: G.btn.shuffle });
if (hist.length)
out.push({ label: "↶ Undo", fn: G.btn.undo });
return out;
}
};
function take(a, b) {
alive[a] = alive[b] = false;
left -= 2;
hist.push([a, b]);
sel = -1;
hint = null;
llMoved();
llSay("");
if (typeof playTone === "function")
playTone(740, 0.12);
if (!left)
llGameWon("mjsol");
else if (!pairs().length)
llSay("No pairs are free: shuffle the tiles, or undo.");
}
function pairs() {
var f = [];
for (var i = 0; i < T.length; i++)
if (alive[i] && llMjFree(T, i, alive))
f.push(i);
var out = [], seen = {};
for (var a = 0; a < f.length; a++)
for (var b = a + 1; b < f.length; b++) {
var k = Math.min(T[f[a]].t, T[f[b]].t) + "-" + Math.max(T[f[a]].t, T[f[b]].t);
if (!seen[k] && llTileMatch(T[f[a]].t, T[f[b]].t)) {
seen[k] = 1;
out.push([f[a], f[b]]);
}
}
return out;
}
return G;
},
function (c, need) {
if (need === 0)
return true;
var i = 0;
while (i < 34 && !c[i])
i++;
if (i >= 34)
return false;
if (c[i] >= 3) {
c[i] -= 3;
if (llMjSets(c, need - 1)) {
c[i] += 3;
return true;
}
c[i] += 3;
}
if (i < 27 && i % 9 <= 6 && c[i + 1] && c[i + 2]) {
c[i]--;
c[i + 1]--;
c[i + 2]--;
var ok = llMjSets(c, need - 1);
c[i]++;
c[i + 1]++;
c[i + 2]++;
if (ok)
return true;
}
return false;
},
function (tiles, melds) {
var need = 4 - melds.length;
if (tiles.length !== need * 3 + 2)
return false;
var c = llMjCounts(tiles);
for (var p = 0; p < 34; p++) {
if (c[p] >= 2) {
c[p] -= 2;
var ok = llMjSets(c, need);
c[p] += 2;
if (ok)
return true;
}
}
if (!melds.length && tiles.length === 14) {
var pairs = 0;
for (var q = 0; q < 34; q++) {
if (c[q] === 2)
pairs++;
else if (c[q])
return false;
}
if (pairs === 7)
return true;
}
return false;
},
function () {
var wall = [], S = { hands: [[], [], [], []], melds: [[], [], [], []], disc: [[], [], [], []], turn: 0, phase: "discard", drawn: -1, last: null, claim: null, wait: 0, over: null, log: "" };
for (var t = 0; t < 34; t++)
for (var k = 0; k < 4; k++)
wall.push(t);
llShuffle(wall);
for (var r = 0; r < 13; r++)
for (var p = 0; p < 4; p++)
S.hands[p].push(wall.pop());
S.hands.forEach(llMjSort);
S.drawn = wall.pop();
S.hands[0].push(S.drawn);
function say(t) { S.log = t; llSay(t); }
function name(p) { return LL_MJ_PLAYERS[p]; }
function next(p) { return (p + 1) % 4; }
function canSelfWin(p) { return llMjWins(S.hands[p], S.melds[p]); }
function discard(p, t) {
var i = S.hands[p].indexOf(t);
if (i < 0)
return;
S.hands[p].splice(i, 1);
llMjSort(S.hands[p]);
S.disc[p].push(t);
S.last = { p: p, t: t };
S.drawn = -1;
if (typeof playTone === "function")
playTone(p === 0 ? 520 : 440, 0.08);
if (p === 0)
llMoved();
claims(p, t);
}
function claims(p, t) {
var opts = [];
if (p !== 0) {
var me = S.hands[0], c = llMjCounts(me);
if (llMjWins(me.concat([t]), S.melds[0]))
opts.push("win");
if (c[t] >= 2)
opts.push("pung");
if (c[t] >= 3)
opts.push("kong");
if (next(p) === 0 && t < 27) {
var m = t % 9;
[[-2, -1], [-1, 1], [1, 2]].forEach(function (d) { var a = t + d[0], b = t + d[1]; if (m + d[0] >= 0 && m + d[1] <= 8 && c[a] && c[b])
opts.push("chow:" + a + "," + b); });
}
}
for (var k = 1; k < 4; k++) {
var q = (p + k) % 4;
if (q === 0 || q === p)
continue;
if (llMjWins(S.hands[q].concat([t]), S.melds[q]) && !opts.length) {
S.hands[q].push(t);
S.disc[p].pop();
return over(q, "on " + name(p) + "'s " + llTileName(t));
}
}
if (opts.length) {
S.phase = "claim";
S.claim = { p: p, t: t, opts: opts };
say(name(p) + " throws the <b>" + llTileName(t) + "</b>. You could " + opts.map(function (o) { return o.indexOf("chow") === 0 ? "chow" : o === "win" ? "call Mahjong" : o; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).join(", ") + ", or pass.");
return;
}
houseClaims(p, t);
}
function houseClaims(p, t) {
for (var k = 1; k < 4; k++) {
var q = (p + k) % 4;
if (q === 0 || q === p)
continue;
var c = llMjCounts(S.hands[q]);
if (c[t] >= 2 && (t >= 27 || Math.random() < 0.6)) {
take(q, p, t, c[t] >= 3 && Math.random() < 0.5 ? "kong" : "pung");
return;
}
}
var q2 = next(p);
if (q2 !== 0 && t < 27) {
var c2 = llMjCounts(S.hands[q2]), m = t % 9;
if (Math.random() < 0.35)
for (var d = -2; d <= 0; d++) {
var a = t + d, ok = m + d >= 0 && m + d + 2 <= 8;
if (!ok)
continue;
var need = [a, a + 1, a + 2].filter(function (v) { return v !== t; });
if (need.every(function (v) { return c2[v]; })) {
take(q2, p, t, "chow", need);
return;
}
}
}
S.turn = next(p);
S.phase = "draw";
S.wait = 0.7;
}
function take(q, p, t, kind, with2) {
S.disc[p].pop();
var tiles;
if (kind === "chow") {
with2.forEach(function (v) { S.hands[q].splice(S.hands[q].indexOf(v), 1); });
tiles = llMjSort(with2.concat([t]));
}
else {
var n = kind === "kong" ? 3 : 2;
for (var i = 0; i < n; i++)
S.hands[q].splice(S.hands[q].indexOf(t), 1);
tiles = new Array(n + 1).fill(t);
}
S.melds[q].push({ kind: kind, tiles: tiles });
S.turn = q;
say((q === 0 ? "You" : name(q)) + " " + (q === 0 ? "" : "calls ") + "<b>" + kind + "</b>" + (q === 0 ? " the " : " on the ") + llTileName(t) + ".");
if (kind === "kong") {
if (!wall.length)
return over(-1);
var d = wall.shift();
S.hands[q].push(d);
if (q === 0)
S.drawn = d;
}
S.phase = "discard";
S.wait = q === 0 ? 0 : 0.9;
if (q === 0 && canSelfWin(0))
say(S.log + " You can call <b>Mahjong</b>!");
}
function over(w, how) {
S.phase = "over";
S.over = { w: w };
if (w < 0) {
say("The wall is empty: a drawn hand. Nobody wins this time.");
return;
}
if (w === 0) {
llGameWon("mahjong");
say("🀄 <b>Mahjong!</b> You win" + (how ? " " + how : "") + ". Beautifully played.");
try {
var n = +(localStorage.getItem("ll.mj.wins") || 0) + 1;
localStorage.setItem("ll.mj.wins", n);
}
catch (e) { }
}
else
say("🀄 <b>" + name(w) + " calls Mahjong</b>" + (how ? " " + how : "") + ". Their hand is turned over for you to see.");
}
function houseTurn(q) {
if (S.phase === "draw") {
if (!wall.length)
return over(-1);
var d = wall.pop();
S.hands[q].push(d);
llMjSort(S.hands[q]);
if (canSelfWin(q))
return over(q, "from the wall");
S.phase = "discard";
S.wait = 0.8;
return;
}
if (S.phase === "discard") {
var h = S.hands[q], best = h[0], bu = 1e9;
h.forEach(function (t) { var u = llMjUse(h, t) + Math.random() * 0.2; if (u < bu) {
bu = u;
best = t;
} });
discard(q, best);
}
}
function myDraw() {
if (!wall.length)
return over(-1);
S.drawn = wall.pop();
S.hands[0].push(S.drawn);
S.phase = "discard";
say(canSelfWin(0) ? "You drew the <b>" + llTileName(S.drawn) + "</b>. You can call <b>Mahjong</b>!" : "You drew the <b>" + llTileName(S.drawn) + "</b>. Tap a tile to throw it.");
}
var G = { key: "mahjong", title: "Mahjong at the table", noMoves: false,
head: function () {
var b = [];
if (S.phase === "claim" && S.claim) {
var o = S.claim.opts;
if (o.indexOf("win") >= 0)
b.push(["cwin", "🀄 Mahjong!"]);
if (o.indexOf("pung") >= 0)
b.push(["cpung", "Pung"]);
if (o.indexOf("kong") >= 0)
b.push(["ckong", "Kong"]);
o.filter(function (v) { return v.indexOf("chow") === 0; }).forEach(function (v, i) { var ab = v.slice(5).split(",").map(Number); b.push(["cchow" + i, "Chow " + (ab[0] % 9 + 1) + "-" + (ab[1] % 9 + 1)]); });
b.push(["cpass", "Pass"]);
}
if (S.turn === 0 && S.phase === "discard" && canSelfWin(0))
b.push(["swin", "🀄 Mahjong!"]);
b.push(["deal", "New hand"]);
return b;
},
btn: { cwin: function () { var t = S.claim.t, p = S.claim.p; S.disc[p].pop(); S.hands[0].push(t); llMjSort(S.hands[0]); S.claim = null; over(0, "on " + name(p) + "'s " + llTileName(t)); },
cpung: function () { var c = S.claim; S.claim = null; take(0, c.p, c.t, "pung"); if (!canSelfWin(0))
say("You call <b>pung</b>. Now throw a tile."); },
ckong: function () { var c = S.claim; S.claim = null; take(0, c.p, c.t, "kong"); },
cpass: function () { var c = S.claim; S.claim = null; S.phase = "wait"; houseClaims(c.p, c.t); },
swin: function () { over(0, "from the wall"); },
deal: function () { llMahjongGo("mahjong"); } },
tick: function (dt) {
if (S.phase === "over" || S.phase === "claim")
return;
if (S.turn === 0) {
if (S.phase === "draw") {
S.wait -= dt;
if (S.wait <= 0) {
myDraw();
llGameDraw();
}
}
return;
}
S.wait -= dt;
if (S.wait > 0)
return;
houseTurn(S.turn);
llGameDraw();
},
draw: function (x, W, H) {
var tw = Math.min(W / 16.5, H / 7.2), th = tw * 1.32, me = S.hands[0];
var hand = me.slice(), drawnAt = -1;
if (S.drawn >= 0) {
var di = hand.lastIndexOf(S.drawn);
if (di >= 0) {
hand.splice(di, 1);
drawnAt = hand.length;
hand.push(S.drawn);
}
}
var X0 = 12, Y0 = H - th - 12;
hand.forEach(function (t, i) { var X = X0 + i * (tw + 2) + (i === drawnAt ? tw * 0.4 : 0); llDrawTile(x, t, X, Y0, tw, th, { sel: i === drawnAt }); llHit(X, Y0, tw, th, { t: t }); });
var mx = X0 + (hand.length + 0.8) * (tw + 2) + tw * 0.4;
S.melds[0].forEach(function (m) { m.tiles.forEach(function (t, j) { llDrawTile(x, t, mx + j * tw * 0.78, Y0 + th * 0.22, tw * 0.76, th * 0.76); }); mx += m.tiles.length * tw * 0.78 + 8; });
var sw = tw * 0.55, sh = th * 0.55;
[[1, W - sw - 14, H * 0.12, "v"], [2, W * 0.25, 10, "h"], [3, 10, H * 0.12, "v"]].forEach(function (q) {
var p = q[0], n = S.hands[p].length, show = S.phase === "over";
x.fillStyle = S.turn === p && S.phase !== "over" ? "#F2C8E0" : "#E8CFA0";
x.font = "bold 13px Georgia";
x.textAlign = q[3] === "v" && p === 1 ? "right" : "left";
x.fillText(name(p) + " · " + LL_WIND[p], q[3] === "v" && p === 1 ? W - 12 : q[1], q[3] === "h" ? q[2] + sh + 18 : q[2] - 6);
for (var i = 0; i < n; i++) {
var X = q[3] === "h" ? q[1] + i * (sw + 1) : q[1], Y = q[3] === "h" ? q[2] : q[2] + i * (sh * 0.62);
if (q[3] === "v" && Y > H * 0.7)
break;
llDrawTile(x, S.hands[p][i], X, Y, sw, sh, { back: !show });
}
var mxx = q[3] === "h" ? q[1] + n * (sw + 1) + 10 : q[1], myy = q[3] === "h" ? q[2] : Math.min(H * 0.7, q[2] + n * sh * 0.62) + 6;
S.melds[p].forEach(function (m) {
m.tiles.forEach(function (t, j) { if (q[3] === "h")
llDrawTile(x, t, mxx + j * sw * 0.8, myy, sw * 0.78, sh * 0.78);
else
llDrawTile(x, t, mxx, myy + j * sh * 0.6, sw * 0.78, sh * 0.78); });
if (q[3] === "h")
mxx += m.tiles.length * sw * 0.8 + 6;
else
myy += m.tiles.length * sh * 0.6 + 6;
});
});
var dw = tw * 0.5, dh = th * 0.5, cx0 = W * 0.2, cy0 = H * 0.24, per = Math.max(6, Math.floor((W * 0.6) / (dw + 1)));
[0, 1, 2, 3].forEach(function (p, row) {
var D = S.disc[p];
x.fillStyle = "rgba(232,207,160,.7)";
x.font = "11px Georgia";
x.textAlign = "right";
x.fillText(name(p), cx0 - 6, cy0 + row * (dh * 2.3) + dh * 0.7);
D.forEach(function (t, i) {
var X = cx0 + (i % per) * (dw + 1), Y = cy0 + row * (dh * 2.3) + Math.floor(i / per) * (dh + 1);
llDrawTile(x, t, X, Y, dw, dh, { hint: S.last && S.last.p === p && i === D.length - 1 && S.phase !== "over" });
});
});
x.fillStyle = "#E8CFA0";
x.font = "13px Georgia";
x.textAlign = "right";
x.fillText(wall.length + " tiles in the wall", W - 12, Y0 - 10);
if (S.turn === 0 && S.phase === "discard") {
x.textAlign = "left";
x.fillStyle = "#F2C8E0";
x.fillText("Your turn: tap a tile to throw it", 12, Y0 - 10);
}
},
tap: function (px, py) { if (!(S.turn === 0 && S.phase === "discard"))
return; var h = llHitAt(px, py); if (!h || h.t === undefined)
return; discard(0, h.t); },
text: function () {
var me = S.hands[0].slice();
var t = "Your hand: " + me.map(llTileShort).join(" ");
if (S.melds[0].length)
t += "\nYour sets: " + S.melds[0].map(function (m) { return m.tiles.map(llTileShort).join(""); }).join(" · ");
if (S.last)
t += "\nLast thrown: " + name(S.last.p) + ", " + llTileName(S.last.t);
t += "\nWall: " + wall.length + (S.log ? "\n" + String(S.log).replace(/<[^>]+>/g, "") : "");
return t + "\n(D dots, B bamboo, C characters; E S W N winds; Rd Gd Wd dragons)";
},
moves: function () {
var out = [], hb = G.head();
hb.forEach(function (b) { if (b[0] !== "deal")
out.push({ label: b[1], fn: G.btn[b[0]] || function () { var i = +b[0].slice(5); var v = S.claim.opts.filter(function (o) { return o.indexOf("chow") === 0; })[i]; var ab = v.slice(5).split(",").map(Number); var c = S.claim; S.claim = null; take(0, c.p, c.t, "chow", ab); } }); });
if (S.turn === 0 && S.phase === "discard") {
var seen = {};
S.hands[0].forEach(function (t) { if (seen[t])
return; seen[t] = 1; out.push({ label: "Throw the " + llTileName(t) + (t === S.drawn ? " (just drawn)" : ""), fn: function () { discard(0, t); } }); });
}
if (S.phase === "over")
out.push({ label: "New hand", fn: G.btn.deal });
return out;
}
};
for (var ci = 0; ci < 3; ci++)
(function (i) { G.btn["cchow" + i] = function () { var v = S.claim.opts.filter(function (o) { return o.indexOf("chow") === 0; })[i]; if (!v)
return; var ab = v.slice(5).split(",").map(Number); var c = S.claim; S.claim = null; take(0, c.p, c.t, "chow", ab); say("You call <b>chow</b>. Now throw a tile."); }; })(ci);
say(canSelfWin(0) ? "A heavenly hand! You can call <b>Mahjong</b> at once." : "You are East, and you begin: tap a tile to throw it.");
return G;
},
function (card, called, pattern) {
var on = function (i) { return card[i] === 0 || called.indexOf(card[i]) >= 0; }, all = function (a) { return a.every(on); };
if (pattern === "full")
return all([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
if (pattern === "corners")
return all([0, 4, 20, 24]);
if (pattern === "x")
return all([0, 6, 12, 18, 24, 4, 8, 16, 20]);
for (var r = 0; r < 5; r++)
if (all([0, 1, 2, 3, 4].map(function (c) { return r * 5 + c; })))
return true;
for (var c = 0; c < 5; c++)
if (all([0, 1, 2, 3, 4].map(function (r2) { return r2 * 5 + c; })))
return true;
return all([0, 6, 12, 18, 24]) || all([4, 8, 12, 16, 20]);
},
function () {
var B = LL.bingo || (LL.bingo = {});
if (B.practice) {
var P = B.practice, n = Math.max(0, Math.min(75, Math.floor((Date.now() - P.t0) / P.pace) + 1));
if (Date.now() < P.t0)
n = 0;
if (n >= 75)
P.done = true;
B.game = { id: "practice", pattern: P.pattern, calls: P.all.slice(0, n), status: P.done ? "done" : (n ? "playing" : "open"), winners: P.winners, host_name: P.host_name, practice: true, nextIn: Math.max(0, Math.ceil((P.t0 + n * P.pace - Date.now()) / 1000)) };
}
return B.game;
},
function () {
var B = LL.bingo || (LL.bingo = {});
if (B.practice || !llSigned() || LL.noSql) {
if (!B.practice)
B.practice = llBingoPractice();
llBingoNow();
return Promise.resolve(B);
}
if (B.busy)
return Promise.resolve(B);
B.busy = true;
return cityRpc("lounge_bingo_state", {}).then(function (o) {
B.busy = false;
if (o && o.ok) {
var was = B.game && B.game.calls ? B.game.calls.length : 0, wasId = B.game && B.game.id;
B.game = o.game || null;
B.card = o.card || null;
B.at = Date.now();
if (B.game && B.game.id === wasId && B.game.calls && B.game.calls.length > was)
llBallCalled(B.game.calls[B.game.calls.length - 1]);
B.live = !!(B.game && B.game.status === "playing");
}
return B;
})
.catch(function (e) { B.busy = false; if (llMissing(e)) {
LL.noSql = true;
B.practice = llBingoPractice();
llBingoNow();
} return B; });
},
function (n) {
var say = LL_CALLS[n] || llBallName(n);
if (typeof playTone === "function") {
playTone(660, 0.12);
setTimeout(function () { playTone(880, 0.18); }, 140);
}
if (LLG.on === "bingo")
llSay("🎱 <b>" + esc(llBallName(n)) + "</b>" + (LL_CALLS[n] ? ": " + esc(say) : ""));
else if (LL.room && LL.room.name === "the Bingo Hall")
setStatus("🎱 <b>" + esc(llBallName(n)) + "</b>" + (LL_CALLS[n] ? ": " + esc(say) : ""));
var B = LL.bingo;
if (B && B.auto && B.card)
llBingoMaybeShout();
},
function () {
var G = LL.bingo && LL.bingo.game;
if (!G)
return "";
var n = (G.calls || []).length;
if (G.status === "done")
return "🎱 Bingo: " + ((G.winners || []).length ? "won by " + esc(G.winners.map(function (w) { return w.name; }).join(", ")) : "the game is over") + " · the next one soon";
if (!n)
return "🎱 Bingo: eyes down soon, take a card (" + esc(LL_PATTERNS[G.pattern] || "") + ")";
return "🎱 Bingo · " + esc(LL_PATTERNS[G.pattern] || "") + " · ball " + n + ": <b>" + esc(llBallName(G.calls[n - 1])) + "</b>";
},
function (dt, L) {
var B = LL.bingo || (LL.bingo = {}), inHall = LL.room && LL.room.name === "the Bingo Hall", open = LLG.on === "bingo";
B.tAt = (B.tAt || 0) - dt;
if (B.tAt > 0)
return;
B.tAt = open ? 2.5 : inHall ? 6 : 30;
if (open || inHall || !B.game) {
if (B.practice) {
var before = (B.game && B.game.calls || []).length;
llBingoNow();
var now = (B.game.calls || []).length;
if (now > before)
llBallCalled(B.game.calls[now - 1]);
if (B.practice.done && Date.now() - (B.practice.doneAt || (B.practice.doneAt = Date.now())) > 12000) {
B.practice = llBingoPractice();
B.myCard = null;
}
}
else
llBingoLoad();
if (open)
llGameDraw();
}
},
function () {
var B = LL.bingo || (LL.bingo = {});
if (B.auto === undefined)
B.auto = true;
B.dab = B.dab || {};
if (B.practice && (B.practice.done || Date.now() - B.practice.t0 > B.practice.pace * 40)) {
B.practice = llBingoPractice();
B.myCard = null;
B.game = null;
}
llBingoLoad().then(function () {
var G = { key: "bingo", title: "Bingo", noMoves: true,
head: function () {
var g = B.game, b = [];
if (!llMyCard() && (!g || g.status !== "done"))
b.push(["take", "🎟 Take a card"]);
if (llMyCard())
b.push(["shout", "📣 BINGO!"]);
b.push(["auto", B.auto ? "Auto-dab: on" : "Auto-dab: off"]);
if (llCanHost() && !B.practice)
b.push(["host", "🎙 Call a game"]);
return b;
},
btn: { take: llBingoTake, shout: llBingoShout, auto: function () { B.auto = !B.auto; }, host: function () { llGameClose(true); llCallerCard(); } },
draw: function (x, W, H) { llBingoDraw(x, W, H); },
tap: function (px, py) { var h = llHitAt(px, py); if (!h || h.n === undefined)
return; var k = llBingoKey(); B.dab[k] = B.dab[k] || {}; B.dab[k][h.n] = !B.dab[k][h.n]; },
text: function () {
var g = B.game, c = llMyCard(), t = llBingoLine().replace(/<[^>]+>/g, "");
if (g && g.calls && g.calls.length)
t += "\nCalled: " + g.calls.slice(-10).map(llBallName).join(", ");
if (c) {
t += "\nYour card (" + (LL_PATTERNS[g && g.pattern] || "") + "): ";
for (var r = 0; r < 5; r++) {
t += "\n" + [0, 1, 2, 3, 4].map(function (cc) { var n = c[r * 5 + cc]; return n === 0 ? "★" : (g && g.calls && g.calls.indexOf(n) >= 0 ? "(" + n + ")" : String(n)); }).join(" ");
}
}
else
t += "\nTake a card to play: it is free.";
return t;
},
moves: function () { var out = []; G.head().forEach(function (b) { out.push({ label: b[1], fn: G.btn[b[0]] }); }); return out; },
close: function () { }
};
llGameStart(G, { msg: B.practice ? (llSigned() ? "A practice game, called right here: the hall's own games start soon." : "A practice game. Sign in to play with everyone in the hall and win prizes.") : "Cards are free. Prizes go into your backpack." });
});
},
function () {
var B = LL.bingo;
if (B.practice) {
if (B.practice.done) {
B.practice = llBingoPractice();
llBingoNow();
}
B.myCard = { id: B.practice.t0, card: llCardCols((Math.random() * 1e9) | 0) };
llSay("Your card is on the table. Eyes down!");
llGameDraw();
return;
}
cityRpc("lounge_bingo_join", {}).then(function (o) { if (o && o.card)
B.card = o.card; llSay(esc((o && o.say) || "Your card is on the table.")); llGameDraw(); })
.catch(function (e) { llSay(llSoft(e)); });
},
function () {
var B = LL.bingo, g = B.game, c = llMyCard();
if (!g || !c)
return;
if (B.practice) {
if (llCardWins(c, g.calls || [], g.pattern)) {
B.practice.done = true;
B.practice.winners = [{ name: "You" }];
llSay("🎉 <b>BINGO!</b> Delphine checks your card: a winner! (In a practice game there is no prize.)");
if (typeof playTone === "function")
[523, 659, 784, 1047].forEach(function (f, i) { setTimeout(function () { playTone(f, 0.3); }, i * 160); });
}
else
llSay("Delphine checks your card: not yet, darling. Keep your eyes down.");
return;
}
if (B.shoutBusy)
return;
B.shoutBusy = true;
cityRpc("lounge_bingo_claim", {}).then(function (o) {
B.shoutBusy = false;
llSay((o && o.won ? "🎉 " : "") + esc((o && o.say) || "…"));
if (o && o.won && typeof playTone === "function")
[523, 659, 784, 1047].forEach(function (f, i) { setTimeout(function () { playTone(f, 0.3); }, i * 160); });
llBingoLoad().then(llGameDraw);
})
.catch(function (e) { B.shoutBusy = false; llSay(llSoft(e)); });
},
function (x, W, H) {
var B = LL.bingo, g = B.game || {}, calls = g.calls || [], c = llMyCard(), k = llBingoKey(), dab = (B.dab && B.dab[k]) || {};
var cs = Math.min((W * 0.55 - 30) / 5, (H - 110) / 6), X0 = 20, Y0 = 40;
x.fillStyle = "#F2EAE4";
llRound(x, X0 - 10, Y0 - 34, cs * 5 + 20, cs * 6 + 20, 12);
x.fill();
"BINGO".split("").forEach(function (L2, i) { x.fillStyle = "#B0306A"; x.font = "bold " + (cs * 0.5) + "px Georgia"; x.textAlign = "center"; x.fillText(L2, X0 + i * cs + cs / 2, Y0 - 6); });
for (var r = 0; r < 5; r++)
for (var cc = 0; cc < 5; cc++) {
var i = r * 5 + cc, n = c ? c[i] : null, X = X0 + cc * cs, Y = Y0 + r * cs, called = n && calls.indexOf(n) >= 0, on = n === 0 || (n && (dab[n] || (B.auto && called)));
x.strokeStyle = "rgba(90,40,90,.5)";
x.lineWidth = 1;
x.strokeRect(X, Y, cs, cs);
if (!c)
continue;
x.fillStyle = "#2A1236";
x.font = (n === 0 ? "" : "bold ") + (cs * 0.38) + "px Georgia";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(n === 0 ? "★" : String(n), X + cs / 2, Y + cs / 2);
x.textBaseline = "alphabetic";
if (on) {
x.fillStyle = n === 0 ? "rgba(201,168,104,.5)" : "rgba(216,90,160,.55)";
x.beginPath();
x.arc(X + cs / 2, Y + cs / 2, cs * 0.4, 0, 7);
x.fill();
}
if (n)
llHit(X, Y, cs, cs, { n: n });
}
if (!c) {
x.fillStyle = "#6A3482";
x.font = "bold 18px Georgia";
x.textAlign = "center";
x.fillText("Take a card to play: it is free", X0 + cs * 2.5, Y0 + cs * 2.6);
}
var bx = W * 0.6, bw = W * 0.38;
x.textAlign = "center";
x.fillStyle = "#E8CFA0";
x.font = "bold 16px Georgia";
x.fillText((g.practice ? "Practice · " : "Game " + (g.id || "") + " · ") + (LL_PATTERNS[g.pattern] || ""), bx + bw / 2, 28);
var last = calls[calls.length - 1], br = Math.min(bw * 0.3, H * 0.17);
x.fillStyle = "#F2E4EC";
x.beginPath();
x.arc(bx + bw / 2, 40 + br + 10, br, 0, 7);
x.fill();
x.strokeStyle = "#B85C8E";
x.lineWidth = 6;
x.stroke();
x.fillStyle = "#3A1A4A";
x.font = "bold " + (br * 0.38) + "px Georgia";
x.fillText(last ? "BINGO"[Math.floor((last - 1) / 15)] : "", bx + bw / 2, 40 + br * 0.8);
x.font = "bold " + (br * 0.75) + "px Georgia";
x.fillText(last ? String(last) : "…", bx + bw / 2, 40 + br + 10 + br * 0.32);
x.fillStyle = "#F2D8E6";
x.font = "14px Georgia";
var y = 40 + br * 2 + 40;
x.fillText(g.status === "done" ? ((g.winners || []).length ? "Won by " + g.winners.map(function (w) { return w.name; }).join(", ") : "Game over") + " · next game soon" :
calls.length ? calls.length + " of 75 called" : "Eyes down soon", bx + bw / 2, y);
y += 24;
x.font = "13px Georgia";
x.fillStyle = "rgba(242,216,230,.85)";
var recent = calls.slice(-12).reverse();
for (var j = 0; j < recent.length; j++) {
var col = j % 4, row = Math.floor(j / 4);
x.fillText(llBallName(recent[j]), bx + bw * (0.14 + col * 0.24), y + row * 20);
}
if (g.host_name) {
x.fillStyle = "#E8CFA0";
x.fillText("Called by " + g.host_name, bx + bw / 2, H - 14);
}
},
function () {
var fns = { talk: function () { llTalkTo("caller"); } }, h = llHead("The caller's podium", "Delphine calls the house games. The hostess, the caller, the manager, the tournament director and the Keeper can call their own.");
if (llCanHost() && llSigned() && !LL.noSql) {
h += "<div style='margin:6px 0 2px'>Call a new game now (it ends the one in play):</div>";
Object.keys(LL_PATTERNS).forEach(function (p) { h += worldBtn("p_" + p, "🎙 " + LL_PATTERNS[p], p === "full" ? "every number on the card" : "a game for everyone in the hall"); fns["p_" + p] = function () { llBingoHost(p); }; });
h += "<div style='margin:6px 0 2px'>How fast the balls come:</div>" + worldBtn("slow", "Gentle: a ball every 9 seconds", LL.bingoPace === 9 ? "chosen" : "") + worldBtn("mid", "Lively: every 6 seconds", (LL.bingoPace || 6) === 6 ? "chosen" : "");
fns.slow = function () { LL.bingoPace = 9; llCallerCard(); };
fns.mid = function () { LL.bingoPace = 6; llCallerCard(); };
}
else
h += "<div>A house game runs all evening, one after another. Take a card at any table; it is free, and the prize goes into your backpack.</div>";
h += worldBtn("play", "🎟 Play Bingo", "your card at the table") + llTalkBtn("caller") + "<div id='ll-msg' style='margin-top:6px'></div>";
fns.play = llBingoOpen;
worldCard(h, fns);
},
function () {
worldCard(llHead("Tonight's prizes", "On the table by the stage, under glass.") +
"<div>Every Bingo winner takes a prize to their backpack: a rose-gold compact, a silk scarf, a box of violet creams, a crystal bud vase, a porcelain teacup, a velvet cushion, a string of pearls or a gilt photo frame (the caller draws which).</div>" +
"<div style='margin-top:6px'>Tournament winners take home a gold, silver or bronze trophy, and their name on the board in the Crown Room.</div>");
},
function () {
llLoadState(true).then(function () {
var fns = {}, h = llHead("Tournaments", "Everyone plays the same deal: the fastest time wins. Free to enter; the top three take home a trophy.");
var T = llTourneys().filter(function (q) { return q.open; });
if (LL.noSql || !llSigned())
h += "<div style='opacity:.85'>" + (llSigned() ? "The tournaments start soon." : "Sign in to play in the tournaments.") + " You can play today's deals for practice:</div>";
if (!T.length && !LL.noSql && llSigned())
h += "<div style='opacity:.85'>No tournament is open just now.</div>";
T.forEach(function (q) {
var mine = q.mine ? " · your best " + llSecs(q.mine) : "", top = (q.top || [])[0];
h += worldBtn("t" + q.id, "🏆 " + esc(q.title || llGameName(q.game)), esc(llGameName(q.game)) + " · closes " + llWhen(q.closes_at) + (top ? " · leading: " + esc(top.name) + " " + llSecs(top.secs) : "") + mine);
fns["t" + q.id] = function () { llTourneyPlay(q); };
});
if (LL.noSql || !llSigned())
["klondike", "freecell", "mjsol"].forEach(function (g) { h += worldBtn("p" + g, "Practise today's " + llGameName(g), "the same deal as everyone today"); fns["p" + g] = function () { llTourneyPlay({ game: g, seed: llDaySeed(g), title: "Today's deal (practice)" }); }; });
var done = llTourneys().filter(function (q) { return !q.open && (q.top || []).length; }).slice(0, 3);
if (done.length) {
h += "<div style='margin-top:8px;color:#E8CFA0'>Lately won</div>";
done.forEach(function (q) { h += "<div style='font-size:12.5px'>" + esc(q.title || llGameName(q.game)) + ": " + (q.top || []).slice(0, 3).map(function (r, i) { return ["🥇", "🥈", "🥉"][i] + " " + esc(r.name) + " " + llSecs(r.secs); }).join(" · ") + "</div>"; });
}
if (llCanHost()) {
h += worldBtn("desk", "🎀 Open or close a tournament", "at the tournament desk");
fns.desk = llTourneyDesk;
}
h += llTalkBtn("director") + "<div id='ll-msg' style='margin-top:6px'></div>";
fns.talk = function () { llTalkTo("director"); };
worldCard(h, fns);
});
},
function (q) {
worldCard(null);
var opt = { seed: q.seed, tourney: q.id ? q : null };
if (q.game === "klondike")
llGameStart(llKlondike(opt), { tourney: opt.tourney, msg: "Same deal for everyone. The clock starts with your first move." });
else if (q.game === "freecell")
llGameStart(llFreecell(opt), { tourney: opt.tourney, msg: "Same deal for everyone. The clock starts with your first move." });
else
llGameStart(llMjSol(opt), { tourney: opt.tourney, msg: "Same tiles for everyone. The clock starts with your first match." });
},
function () {
var fns = {}, h = llHead("The tournament desk", "Beatrice keeps the book.");
if (!llCanHost()) {
h += "<div>The hostess and the tournament director open tournaments here. Today's Daily Deals are open to everyone, in the Crown Room.</div>" + llTalkBtn("director");
fns.talk = function () { llTalkTo("director"); };
worldCard(h, fns);
return;
}
if (LL.noSql || !llSigned()) {
h += "<div>" + (llSigned() ? "Tournaments need the Lounge's server update (86)." : "Sign in first.") + "</div>";
worldCard(h, fns);
return;
}
h += "<div style='margin:4px 0'>Open a tournament: everyone gets the same deal, fastest time wins, the top three take a trophy to their backpack when it closes.</div>";
[["klondike", "Klondike"], ["freecell", "FreeCell"], ["mjsol", "Mahjong solitaire"]].forEach(function (g) {
[[1, "for an hour"], [3, "for three hours"], [24, "for a day"]].forEach(function (d) {
var k = "o_" + g[0] + "_" + d[0];
h += worldBtn(k, "Open " + g[1] + " " + d[1], null);
fns[k] = function () { llTourneyOpen(g[0], d[0]); };
});
});
llTourneys().filter(function (q) { return q.open && !q.daily; }).forEach(function (q) { h += worldBtn("c" + q.id, "🏁 Close “" + esc(q.title) + "” now", "and award the trophies"); fns["c" + q.id] = function () { llTourneyClose(q.id); }; });
h += "<div id='ll-msg' style='margin-top:6px'></div>";
worldCard(h, fns);
},
function (game, hours) {
var title = (llHost() ? llHostName() + "'s " : "The Lounge's ") + llGameName(game) + " tournament";
cityRpc("lounge_tourney_open", { p_game: game, p_title: title, p_hours: hours }).then(function (o) { llMsg(esc((o && o.say) || "Opened.")); return llLoadState(true); }).then(llScreensAll).catch(function (e) { llMsg(llSoft(e)); });
},
function () {
llLoadState(true).then(function () {
var h = llHead("The trophy cabinets", "Gold, silver and bronze, and the names of those who won them.");
var done = llTourneys().filter(function (q) { return !q.open && (q.top || []).length; });
if (!done.length)
h += "<div>The cabinets are waiting for their first winners. Today's Daily Deals are in the Crown Room.</div>";
done.slice(0, 8).forEach(function (q) { h += "<div style='margin:5px 0'><b>" + esc(q.title || llGameName(q.game)) + "</b><br>" + (q.top || []).slice(0, 3).map(function (r, i) { return ["🥇", "🥈", "🥉"][i] + " " + esc(r.name) + " " + llSecs(r.secs); }).join(" · ") + "</div>"; });
worldCard(h);
});
},
function () {
var fns = { k1: function () { llCardsGo("klondike"); }, k3: function () { llCardsGo("klondike3"); }, fc: function () { llCardsGo("freecell"); },
daily: llTourneyCard, friends: llCityGames, talk: function () { llTalkTo("dealer"); } };
worldCard(llHead("A card table", "Green-gold baize, a fresh deck, a little lamp.") +
worldBtn("k1", "🃏 Klondike solitaire", "the classic: turn one card at a time") +
worldBtn("k3", "🃏 Klondike, draw three", "for a harder game") +
worldBtn("fc", "🂡 FreeCell", "every card face up: think it through") +
worldBtn("daily", "🏆 Today's tournaments", "same deal for everyone, fastest time wins") +
worldBtn("friends", "♟ Chess, draughts or poker with other dreamers", "the city's own tables, friendly") +
llTalkBtn("dealer"), fns);
},
function () {
var fns = { table: function () { llMahjongGo("mahjong"); }, sol: function () { llMahjongGo("mjsol"); }, daily: llTourneyCard, learn: llMahjongLesson, talk: function () { llTalkTo("mahjong"); } };
worldCard(llHead("A Mahjong table", "Ivory tiles, a rosewood rack, the scent of jasmine tea.") +
worldBtn("table", "🀄 Mahjong at the table", "you and three house players: Dorothy, Mr. Abernathy and Rosalie") +
worldBtn("sol", "🀄 Mahjong solitaire", "the turtle: match pairs until the board is clear") +
worldBtn("daily", "🏆 Today's tournaments", "Mahjong solitaire, same tiles for everyone") +
worldBtn("learn", "📖 How to play", "Margot's lesson card") +
llTalkBtn("mahjong"), fns);
},
function () {
worldCard(llHead("Margot's lesson card", "Mahjong at the table, in a few lines.") +
"<div><b>The tiles.</b> Three suits numbered 1 to 9 (Dots, Bamboo and Characters), the four winds and the three dragons: four of each.</div>" +
"<div style='margin-top:5px'><b>The aim.</b> Fourteen tiles making four sets and a pair. A set is a <b>pung</b> (three the same) or a <b>chow</b> (three in a row in one suit). Seven pairs win too.</div>" +
"<div style='margin-top:5px'><b>A turn.</b> Draw a tile, then throw one. When someone throws a tile you need, you can call: <b>pung</b> (you hold two the same), <b>kong</b> (you hold three), or <b>chow</b> (only from the player before you). Then you throw one.</div>" +
"<div style='margin-top:5px'><b>Mahjong!</b> When the tile you draw, or one thrown, completes your hand, call it: the button lights up for you.</div>" +
"<div style='margin-top:5px'><b>Solitaire.</b> Match two free tiles that are the same. A tile is free when nothing lies on it and its left or right side is open.</div>");
},
function () {
var fns = { talk: function () { llTalkTo("concierge"); } }, h = llHead("The concierge", "“Where may I send you, darling?” An arrow will show you the way.");
[["bingo", "🎱 The Bingo Hall"], ["mahjong", "🀄 The Mahjong Parlour"], ["cards", "🃏 The Card Salon"], ["crown", "🏆 The Crown Room: tournaments"], ["tea", "🫖 The Rose Tea Room"],
["treasure", "🎁 The Treasure Box: gifts and prizes"], ["conservatory", "🌹 The Conservatory"], ["powder", "🪞 The powder rooms"], ["staff", "🔑 The staff wing (badge)"], ["suite", "👑 GiGi's suite"]].forEach(function (p) {
if (!LL_PLACES[p[0]])
return;
h += worldBtn("w_" + p[0], p[1], null);
fns["w_" + p[0]] = function () { llShowWay(p[0]); };
});
h += llTalkBtn("concierge");
worldCard(h, fns);
},
function () {
llLoadState(true).then(function () {
var st = LL.state || {}, fns = { bingo: function () { llShowWay("bingo"); }, daily: llTourneyCard };
worldCard(llHead("Tonight at the Lounge", "Your hostess: " + esc(llHostName())) +
(st.notice ? "<div style='margin:6px 0;padding:8px 10px;border-left:3px solid #C9A868;font-style:italic'>“" + esc(st.notice) + "”</div>" : "") +
"<div>Bingo all evening in the Bingo Hall · Mahjong lessons and tables in the Parlour · solitaire, FreeCell and friendly tables in the Card Salon · today's tournaments in the Crown Room · tea, cakes and the piano in the Rose Tea Room.</div>" +
worldBtn("bingo", "🎱 Show me the Bingo Hall", null) + worldBtn("daily", "🏆 Today's tournaments", null), fns);
});
},
function (k) {
var list = LL_MENU[k] || [], fns = {}, title = { tea: "The Rose Tea Room", cart: "The snack cart", florist: "The florist", dining: "The Magnolia Room", poolbar: "The Pink Parasol pool bar", minibar: "The minibar", roomservice: "Room service" }[k] || "The menu";
var h = llHead(title, k === "florist" ? "Grown in the Conservatory. It goes into your backpack." : "Paid in gold, and it feeds you as the city's food does.");
list.forEach(function (m) {
var fx = [];
if (m[3])
fx.push("food +" + m[3]);
if (m[4])
fx.push("drink +" + m[4]);
h += worldBtn("b:" + m[0], esc(m[1]) + " · " + m[2] + " gold", fx.join(" · "));
fns["b:" + m[0]] = function () { llBuy(m); };
});
if (k === "tea") {
h += llTalkBtn("tea");
fns.talk = function () { llTalkTo("tea"); };
}
if (k === "florist") {
h += llTalkBtn("florist");
fns.talk = function () { llTalkTo("florist"); };
}
if (k === "dining") {
h += llTalkBtn("maitre");
fns.talk = function () { llTalkTo("maitre"); };
}
if (k === "poolbar") {
h += llTalkBtn("poolbar");
fns.talk = function () { llTalkTo("poolbar"); };
}
if (k === "roomservice")
h += "<div style='opacity:.8;font-size:12px'>A waiter brings it up on a silver tray.</div>";
h += "<div id='ll-msg' style='margin-top:6px'></div>";
if (!llSigned())
h += "<div style='opacity:.75;font-size:12px'>Sign in to buy.</div>";
worldCard(h, fns);
},
function (m) {
if (!llSigned())
return llMsg("Sign in to buy.");
if (LL.buying)
return;
LL.buying = true;
llMsg("…");
cityRpc("lounge_buy", { p_item: m[0] }).then(function (o) {
LL.buying = false;
if (!o || o.ok === false)
return llMsg(esc((o && o.say) || "Not now."));
if (typeof needsGot === "function" && !m[5])
try {
needsGot(o);
}
catch (e) { }
llMsg("<b>" + esc(o.say || "Enjoy.") + "</b>" + (o.price ? " (" + o.price + " gold)" : ""));
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
if (m[5] && typeof loadThings === "function")
try {
loadThings();
}
catch (e) { }
}).catch(function (e) { LL.buying = false; llMsg(llSoft(e)); });
},
function () {
var fns = { w: function () { llTune("waltz"); setStatus("<b>Florian plays a waltz of his own</b>, soft and slow."); }, t: function () { llTune("tender"); setStatus("<b>Something tender.</b> The tea room hushes a little."); },
l: function () { llTune("lively"); setStatus("<b>Something lively!</b> A few feet tap under the tables."); }, talk: function () { llTalkTo("pianist"); } };
worldCard(llHead("The piano", "Florian takes requests.") + worldBtn("w", "A waltz", null) + worldBtn("t", "Something tender", null) + worldBtn("l", "Something lively", null) + llTalkBtn("pianist"), fns);
},
function () {
worldCard(llHead("The grand piano", "Lilac lacquer, ivory keys.") + worldBtn("w", "Play a waltz", null) + worldBtn("t", "Play something tender", null) + worldBtn("l", "Play something lively", null), { w: function () { llTune("waltz"); }, t: function () { llTune("tender"); }, l: function () { llTune("lively"); } });
},
function () {
var fns = {}, h = llHead("The library", "Rows of soft leather spines and a reading lamp.");
LL_BOOKS.forEach(function (b, i) { h += worldBtn("b" + i, "📖 " + esc(b[0]), esc(b[1])); fns["b" + i] = function () { setStatus("<b>You read a while from “" + esc(b[0]) + "”.</b> The lamp is warm and the chair is deep."); worldCard(null); }; });
worldCard(h, fns);
},
function () {
var fns = { off: function () { llTVOn(null); worldCard(null); } }, h = llHead("The television", "A soft picture, the volume low.");
LL_SHOWS.forEach(function (s, i) { h += worldBtn("s" + i, "📺 " + esc(s[0]), esc(s[1])); fns["s" + i] = function () { llTVOn(i); setStatus("<b>" + esc(s[0]) + "</b> is on: " + esc(s[1]) + "."); worldCard(null); }; });
h += worldBtn("off", "Turn it off", null);
worldCard(h, fns);
},
function (i) {
var L = worldLocal(), best = null, bd = 1e9;
(LL.tvs || []).forEach(function (t) { var d = Math.hypot(t.x - L.x, t.z - L.z); if (d < bd) {
bd = d;
best = t;
} });
if (!best)
return;
if (i === null) {
best.m.material.map = null;
best.m.material.color.setHex(0x2A2A44);
best.m.material.needsUpdate = true;
best.show = null;
return;
}
var S = LL_SHOWS[i], cv = best.cv || (best.cv = document.createElement("canvas"));
cv.width = 256;
cv.height = 144;
best.tex = best.tex || new THREE.CanvasTexture(cv);
best.show = S;
best.t = 0;
best.m.material.map = best.tex;
best.m.material.color.setHex(0xC8C0C8);
best.m.material.needsUpdate = true;
llTVDraw(best);
},
function (T) {
var S = T.show;
if (!S || !T.cv)
return;
var x = T.cv.getContext("2d"), W = 256, H = 144, t = (LL.t || 0) * 0.05;
var g = x.createLinearGradient(0, 0, W, H);
g.addColorStop(0, S[2][0]);
g.addColorStop(1, S[2][1]);
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.globalAlpha = 0.35;
for (var k = 0; k < 4; k++) {
x.fillStyle = S[2][k % 3];
x.beginPath();
x.arc(W * (0.5 + 0.35 * Math.sin(t + k * 1.7)), H * (0.5 + 0.3 * Math.cos(t * 0.8 + k)), 30 + k * 8, 0, 7);
x.fill();
}
x.globalAlpha = 1;
x.fillStyle = "rgba(242,232,236,.9)";
x.font = "bold 18px Georgia";
x.textAlign = "center";
x.fillText(S[0], W / 2, H - 16);
T.tex.needsUpdate = true;
},
function (msg) {
worldCard(llHead("The Treasure Box", "Gifts and keepsakes. Everything goes into your backpack.") + "<div style='opacity:.7'>Opening the cabinets…</div>");
var rowsP = typeof catalogueRows === "function" ? catalogueRows().catch(function () { return []; }) : Promise.resolve([]);
rowsP.then(function (rows) {
var list = (rows || []).filter(function (r) { return LL_SHOP.indexOf(r.archetype) >= 0; }).sort(function (a, b) { return LL_SHOP.indexOf(a.archetype) - LL_SHOP.indexOf(b.archetype); });
var fns = { talk: function () { llTalkTo("shop"); } }, h = llHead("The Treasure Box", "Gifts and keepsakes. Everything goes into your backpack. Bingo prizes and trophies are never sold: they are won.");
if (!list.length)
h += "<div style='opacity:.85'>The cabinets are being filled: they open soon.</div>";
list.forEach(function (r) { h += worldBtn("i" + r.id, esc(r.name) + " · " + (+r.price).toLocaleString() + " gold", esc(r.note || "")); fns["i" + r.id] = function () { llBuyThing(r); }; });
h += llTalkBtn("shop") + "<div id='ll-msg' style='margin-top:6px'>" + (msg || "") + "</div>";
if (!llSigned())
h += "<div style='opacity:.75;font-size:12px'>Sign in to buy.</div>";
worldCard(h, fns);
});
},
function () {
llLoadState(true).then(function () {
var st = LL.state || {}, fns = {}, can = llCanHost() && llSigned() && !LL.noSql;
var h = llHead(llHost() ? "Your desk, " + LL_SHE : "GiGi's desk", "Rosewood and gold leaf, a silver tea service, fresh peonies, and the Lounge's book.");
h += "<div>Hostess: <b>" + esc(llHostName()) + "</b>" + (st.notice ? "<br>On the board tonight: <i>“" + esc(st.notice) + "”</i>" : "") + "</div>";
if (can) {
h += worldBtn("notice", "📝 Write tonight's welcome", "it shows on the board in the Grand Foyer");
h += worldBtn("bingo", "🎙 Call a Bingo game", "from the caller's podium, or right from here");
h += worldBtn("tour", "🏆 Open or close a tournament", "and award the trophies");
fns.notice = llNoticeCard;
fns.bingo = llCallerCard;
fns.tour = llTourneyDesk;
}
else if (!llSigned())
h += "<div style='opacity:.8;margin-top:6px'>Sign in to use the desk.</div>";
else if (LL.noSql)
h += "<div style='opacity:.8;margin-top:6px'>The desk's book opens soon.</div>";
h += worldBtn("play", "🃏 Play a game at her own table", null) + worldBtn("staff", "👥 The staff and the rota", "who works here, and the openings");
fns.play = function () { worldCard(llHead("Her own tables", "Cards, Mahjong or Bingo, whenever she likes.") + worldBtn("c", "🃏 Cards", null) + worldBtn("m", "🀄 Mahjong", null) + worldBtn("b", "🎱 Bingo", null), { c: llCardsMenu, m: llMahjongMenu, b: llBingoOpen }); };
fns.staff = llStaffBoard;
if (llSigned() && (llHost() || llKeeper()) && typeof llOwnerCard === "function") {
h += worldBtn("books", "📒 The resort's books", "her pay as owner, her share of the takings, the hotel tonight");
fns.books = llOwnerCard;
}
h += "<div id='ll-msg' style='margin-top:6px'></div>";
worldCard(h, fns);
});
},
function () {
var cur = (LL.state && LL.state.notice) || "";
worldCard(llHead("Tonight's welcome", "A line or two for the board in the Grand Foyer (up to 200 letters).") +
"<textarea id='ll-notice' maxlength='200' rows='3' style='width:100%;box-sizing:border-box;background:#1E0E28;color:#F2E4EC;border:1px solid #C9A868;border-radius:4px;padding:6px;font:13px var(--sans,system-ui)'>" + esc(cur) + "</textarea>" +
worldBtn("save", "Put it on the board", null) + worldBtn("clear", "Clear the board", null) + "<div id='ll-msg' style='margin-top:6px'></div>", { save: function () { var e = document.getElementById("ll-notice"); llNoticeSet(e ? e.value : ""); }, clear: function () { llNoticeSet(""); } });
var ta = document.getElementById("ll-notice");
if (ta)
ta.addEventListener("keydown", function (ev) { ev.stopPropagation(); });
},
function () {
var fns = { talk: function () { llTalkTo("assistant"); }, msg: function () { if (typeof openPhone === "function")
try {
openPhone();
worldCard(null);
return;
}
catch (e) { } setStatus("Juniper writes it down in her neat hand and promises to pass it on."); } };
worldCard(llHead("GiGi's personal assistant", "Juniper keeps the diary, the messages and the door.") +
"<div>The suite beyond is " + LL_SHE + "'s own: her office, her dressing room and her private salon. It opens for her, her assistant, the general manager and the Keeper.</div>" +
worldBtn("msg", "✉️ Leave a message", "Juniper passes it on") + llTalkBtn("assistant"), fns);
},
function () {
var fns = { open: function () { worldCard(null); if (typeof ahOpen === "function")
ahOpen(LL_KEY); }, talk: function () { llTalkTo("manager"); } };
worldCard(llHead("The staff board", "The rota, the notices and the openings.") +
"<div>Fifty-three posts at the Lounge, the resort and " + LL_SHE + "'s house. At the resort: the hotel manager, the front desk, the night auditor, the bell desk, housekeeping and the laundry, the lifeguards and the pool bar, the spa, the gardeners and the swan boat, the Magnolia Room's kitchen and dining room, the orchestra, the harpist, events, the games hosts, yoga and engineering. At the Lounge: the general manager, her personal assistant, the concierge, the Bingo caller, the Mahjong host, card dealers, the tournament director, the tea room, the kitchen, security, housekeeping, the prize shop, the florist, the valets, the cashier, the pianist, and at the house a butler, a housekeeper, a cook, a gardener and a lady's maid.</div>" +
"<div style='margin-top:6px'>Only dues-payers hold posts. Your shift's tasks are on your work card: open it to clock in.</div>" +
worldBtn("open", "📋 See the openings and apply", null) + llTalkBtn("manager"), fns);
},
function () {
var fns = { staff: llStaffBoard, talk: function () { llTalkTo("manager"); }, desk: llTourneyDesk };
worldCard(llHead("The general manager's desk", "Ophelia's ledgers, the rota, and a bowl of pear drops.") +
worldBtn("staff", "👥 The staff and the openings", null) + (llCanHost() ? worldBtn("desk", "🏆 Tournaments", null) : "") + llTalkBtn("manager"), fns);
},
function (spec, at) {
var D = typeof doorWorld === "function" ? doorWorld(spec) : { x: camera.position.x, z: camera.position.z, out: { x: 0, z: 1 } };
var ox = D.x + D.out.x * 2.4, oz = D.z + D.out.z * 2.4, oy = (typeof terrainY === "function" ? (terrainY(ox, oz) || 0) : 0) + 1.72;
if (at === "house" && !llHouseOK()) {
llLoadState(true).then(function () {
if (llHouseOK())
return llGoIn(spec, at);
setStatus("<b>GiGi's House.</b> The butler opens the door a crack: “" + LL_SHE + "'s house is private, I'm afraid. Do call on her at the Lounge.”");
});
return;
}
worldGo("lounge", { at: at, from: { here: store.here || 0, x: ox, y: oy, z: oz, yaw: Math.atan2(-D.out.x, -D.out.z), name: at === "house" ? LL_HOUSE : LL_KEY } });
},
function (pane) {
pane.innerHTML = "Looking…";
Promise.all([cityRpc("lounge_state", {}).catch(function (e) { return { err: e }; }), cityRpc("admin_list_dreamers").catch(function () { return []; })]).then(function (r) {
var st = r[0] || {}, people = (r[1] || []).slice().sort(function (a, b) { return String(a.email || "").localeCompare(String(b.email || "")); });
if (st.err) {
pane.innerHTML = "<span style='color:#C0603A'>" + (llMissing(st.err) ? "This tab works soon." : esc(String(st.err.message || st.err))) + "</span>";
return;
}
var hp = llHousePlot();
pane.innerHTML = "<p style='color:var(--dim);line-height:1.6'>Name the <b>hostess of GiGi's Lounge</b>. She can call Bingo games, open and close tournaments and write the welcome board from her office, and her suite opens for her. " +
"The same step gives her <b>GiGi's House</b> on the Crescent" + (hp ? "" : " (the house appears once the city has been built on this device)") + ": assigned, never sold.</p>" +
"<p>Hostess now: <b>" + esc(st.host_name || "nobody yet") + "</b>" + (st.host_email ? " (" + esc(st.host_email) + ")" : "") + "</p>" +
"<select id='ll-kd-who' style='max-width:100%;padding:6px;margin:4px 0'><option value=''>Choose a dreamer…</option>" +
people.map(function (p) { return "<option value='" + esc(p.id) + "'>" + esc(p.email || p.id) + "</option>"; }).join("") + "</select> " +
"<button class='btn' id='ll-kd-set'>👑 Make her the hostess, and give her the house</button> " +
(st.host_name ? "<button class='btn' id='ll-kd-clear'>Clear the hostess</button>" : "") +
"<p style='color:var(--dim);font-size:12px;margin-top:10px'>Staff posts at the Lounge and the resort (3300-3353) are hired like any other: see Hiring and Positions & wages.</p>";
var set = pane.querySelector("#ll-kd-set"), clr = pane.querySelector("#ll-kd-clear");
set.onclick = function () {
var who = pane.querySelector("#ll-kd-who").value;
if (!who) {
kdMsg("Choose a dreamer first.", true);
return;
}
var p = llHousePlot();
cityRpc("keeper_lounge_host", { p_user: who, p_x: p ? p.x : null, p_z: p ? p.z : null }).then(function (o) { kdMsg((o && o.say) || "Done.", !(o && o.ok)); LL.stateAt = 0; llDeskPane(pane); if (typeof loadLots === "function")
try {
loadLots();
}
catch (e) { } })
.catch(function (e) { kdMsg(llMissing(e) ? "Run the latest server update first." : e.message, true); });
};
if (clr)
clr.onclick = function () { cityRpc("keeper_lounge_host", { p_user: null, p_x: null, p_z: null }).then(function (o) { kdMsg((o && o.say) || "Cleared."); LL.stateAt = 0; llDeskPane(pane); }).catch(function (e) { kdMsg(e.message, true); }); };
});
},
function (x, X, Y, w, h, label, hit, hot) {
llRound(x, X, Y, w, h, Math.min(10, h / 3));
x.fillStyle = hit ? (hot ? "#8A4AA6" : LTG_C.plum) : "rgba(80,40,96,.5)";
x.fill();
x.strokeStyle = hot ? LTG_C.rose : hit ? LTG_C.gold : "rgba(201,168,104,.35)";
x.lineWidth = hot ? 2.5 : 1.5;
x.stroke();
ltgT(x, label, X + w / 2, Y + h / 2 + 1, Math.min(15, h * 0.45), hit ? LTG_C.cream : "rgba(242,217,168,.5)", "center", true, w - 8);
if (hit)
llHit(X, Y, w, h, hit);
},
function (x, W, top, bot, title, lines, S, me, names, label) {
var bw = Math.min(W - 20, 460), sz = W < 480 ? 12 : 13, L = [];
lines.forEach(function (s) { L = L.concat(ltgLines(x, s, bw - 28, sz)); });
var bh = 44 + L.length * sz * 1.4 + (S.fin ? 10 : 52), bx = (W - bw) / 2, by = Math.max(top, (top + bot) / 2 - bh / 2);
ltgBox(x, bx, by, bw, bh);
ltgT(x, title, W / 2, by + 22, 16, LTG_C.cream, "center", true, bw - 20);
L.forEach(function (s, i) { ltgT(x, s, W / 2, by + 46 + i * sz * 1.4, sz, LTG_C.sand, "center", false, bw - 24); });
if (S.fin)
return;
var y = by + bh - 44;
if (S.turn === me)
ltgBtn(x, W / 2 - 90, y, 180, 34, label || "Deal the next hand", { m: { k: "next" } }, true);
else
ltgT(x, "Next: waiting for " + ltgWho(S.turn, me, names) + "…", W / 2, y + 17, 12, LTG_C.sand, "center", false, bw - 20);
},
function (x, W, at, o) {
var ow = o.ow, oh = o.oh, n = o.count, room = at === "T" ? W * 0.6 : W * 0.28, step = n > 1 ? Math.min(ow * (o.tile ? 1.1 : 0.3), (room - ow) / (n - 1)) : 0, fw = n ? ow + (n - 1) * step : 0, X, Y;
var lab = (o.act ? "▸ " : "") + o.name, col = o.act ? LTG_C.rose : LTG_C.sand;
if (at === "T") {
ltgT(x, lab + (o.info ? "  ·  " + o.info : ""), W / 2, 30, 13, col, "center", true, W - 20);
X = W / 2 - fw / 2;
Y = 40;
}
else {
var lf = at === "L", lx = lf ? 8 : W - 8;
Y = o.ly;
ltgT(x, lab, lx, Y, 13, col, lf ? "left" : "right", true, W * 0.3);
if (o.info)
ltgT(x, o.info, lx, Y + 15, 11, LTG_C.sand, lf ? "left" : "right", false, W * 0.3);
X = lf ? 8 : W - 8 - fw;
Y += 26;
}
for (var i = 0; i < n; i++) {
if (o.tile)
ltgTile(x, 0, 0, X + i * step, Y, ow, oh, { back: true });
else
llDrawCard(x, { up: false }, X + i * step, Y, ow, oh);
}
},
function (kind, seed, opt) {
opt = opt || {};
var sp = kind === "spades", TR = sp ? 0 : 1;
var S = { g: kind, to: opt.to || (sp ? 300 : 100), hand: 0, dealer: (seed >>> 0) % 4, phase: "", turn: 0, hands: [], trick: [], last: null, lastBy: -1, seen: [], won: [0, 0, 0, 0], pts: [0, 0, 0, 0],
broken: false, bids: [null, null, null, null], passed: [null, null, null, null], got: null, score: sp ? [0, 0] : [0, 0, 0, 0], bags: [0, 0], mv: 0, ev: "", say: null, res: null, fin: null };
var U = { at: -1, pick: [] };
function ui() { if (U.at !== S.mv)
U = { at: S.mv, pick: [] }; return U; }
function dir() { return [1, 3, 2, 0][S.hand % 4]; }
function isQ(c) { return c.s === 0 && c.r === 12; }
function worth(c) { return sp ? 0 : c.s === 1 ? 1 : isQ(c) ? 13 : 0; }
function holder(c) { for (var p = 0; p < 4; p++)
if (ltgAt(S.hands[p], c) >= 0)
return p; return 0; }
function deal() {
var d = llShuffle(llDeck(), ltgMix(seed, S.hand));
S.hands = [[], [], [], []];
for (var i = 0; i < 52; i++)
S.hands[(S.dealer + 1 + i) % 4].push(ltgCd(d[i]));
S.hands.forEach(function (h) { ltgSortH(h); });
S.trick = [];
S.last = null;
S.lastBy = -1;
S.seen = [];
S.won = [0, 0, 0, 0];
S.pts = [0, 0, 0, 0];
S.broken = false;
S.bids = [null, null, null, null];
S.passed = [null, null, null, null];
S.got = null;
S.res = null;
if (sp) {
S.phase = "bid";
S.turn = (S.dealer + 1) % 4;
S.say = { p: -9, t: "A fresh hand is dealt. Time to bid." };
}
else if (dir()) {
S.phase = "pass";
S.turn = 0;
S.say = { p: -9, t: "A fresh hand is dealt. Everyone passes three cards " + ["", "to the left", "across", "to the right"][dir()] + "." };
}
else {
begin();
S.say = { p: -9, t: "A fresh hand, and no passing this time." };
}
}
function begin() { S.phase = "play"; S.turn = sp ? (S.dealer + 1) % 4 : holder({ s: 3, r: 2 }); }
function cards(p) {
var h = S.hands[p];
if (S.phase !== "play" || S.turn !== p)
return [];
if (S.trick.length) {
var led = S.trick[0].c.s, f = h.filter(function (c) { return c.s === led; });
if (f.length)
return f;
if (!sp && S.seen.length < 4) {
var safe = h.filter(function (c) { return !worth(c); });
if (safe.length)
return safe;
}
return h.slice();
}
if (!sp && !S.seen.length)
return h.filter(function (c) { return c.s === 3 && c.r === 2; });
if (!S.broken) {
var nb = h.filter(function (c) { return c.s !== TR; });
if (nb.length)
return nb;
}
return h.slice();
}
function best(T) { var b = 0; for (var i = 1; i < T.length; i++) {
var a = T[i].c, c = T[b].c;
if ((a.s === c.s && ltgHi(a.r) > ltgHi(c.r)) || (sp && a.s === 0 && c.s !== 0))
b = i;
} return b; }
function boss(p, c) { for (var r = ltgHi(c.r) + 1; r <= 14; r++) {
var o = { s: c.s, r: r === 14 ? 1 : r };
if (ltgAt(S.seen, o) < 0 && ltgAt(S.hands[p], o) < 0)
return false;
} return true; }
function put(p, c) {
var h = S.hands[p];
h.splice(ltgAt(h, c), 1);
S.trick.push({ p: p, c: c });
S.seen.push(c);
S.ev = "";
S.say = null;
if (c.s === TR && !S.broken) {
S.broken = true;
S.say = { p: p, t: sp ? "Spades are broken: #" + p + " {play|plays} " + ltgThe(c) + "." : "Hearts are broken." };
}
if (S.trick.length < 4) {
S.turn = (p + 1) % 4;
return;
}
var w = best(S.trick), wp = S.trick[w].p, got = 0;
S.trick.forEach(function (t) { got += worth(t.c); });
S.won[wp]++;
S.pts[wp] += got;
S.say = { p: wp, t: "^" + wp + " {take|takes} the trick with " + ltgThe(S.trick[w].c) + (got ? " (and " + got + (got > 1 ? " points" : " point") + ")" : "") + "." };
S.last = S.trick;
S.lastBy = wp;
S.trick = [];
S.turn = wp;
S.ev = "trick";
if (!S.hands[0].length)
endHand();
}
function endHand() {
var done = false, w = [];
if (sp) {
S.res = [0, 1].map(function (t) {
var d = 0, bid = 0, took = 0, bags = 0, nils = [];
[t, t + 2].forEach(function (q) { if (S.bids[q] === 0) {
var ok = !S.won[q];
d += ok ? 100 : -100;
nils.push({ p: q, ok: ok });
bags += S.won[q];
}
else {
bid += S.bids[q];
took += S.won[q];
} });
if (bid > 0) {
if (took >= bid) {
d += 10 * bid + (took - bid);
bags += took - bid;
}
else
d -= 10 * bid;
}
else
bags += took;
S.bags[t] += bags;
var pen = 0;
while (S.bags[t] >= 10) {
S.bags[t] -= 10;
d -= 100;
pen++;
}
S.score[t] += d;
return { bid: bid, took: took, d: d, nils: nils, pen: pen, bags: bags };
});
var a = S.score[0], b = S.score[1];
if ((a >= S.to || b >= S.to || a <= -200 || b <= -200) && a !== b) {
done = true;
w = a > b ? [0, 2] : [1, 3];
}
}
else {
var moon = -1;
S.pts.forEach(function (v, p) { if (v === 26)
moon = p; });
var d2 = S.pts.map(function (v, p) { return moon < 0 ? v : p === moon ? 0 : 26; });
d2.forEach(function (v, p) { S.score[p] += v; });
S.res = { pts: S.pts.slice(), d: d2, moon: moon };
if (Math.max.apply(null, S.score) >= S.to) {
done = true;
w = ltgBest(S.score, true);
}
}
if (done) {
S.fin = { w: w };
S.phase = "over";
S.turn = -1;
S.ev = "over";
}
else {
S.phase = "done";
S.turn = S.lastBy;
S.ev = "hand";
}
}
function bidFor(p) {
var h = S.hands[p], by = [[], [], [], []];
h.forEach(function (c) { by[c.s].push(ltgHi(c.r)); });
var n0 = by[0].length, e = 0;
by[0].forEach(function (r) { if (r === 14)
e += 1;
else if (r === 13)
e += n0 >= 2 ? 1 : 0.4;
else if (r === 12)
e += n0 >= 3 ? 0.8 : 0.2; });
if (n0 > 3)
e += n0 - 3;
for (var s = 1; s < 4; s++) {
var L = by[s].length;
by[s].forEach(function (r) { if (r === 14)
e += L <= 5 ? 1 : 0.6;
else if (r === 13)
e += L >= 2 && L <= 5 ? 0.7 : 0.2;
else if (r === 12 && L >= 3 && L <= 4)
e += 0.25; });
if (L === 0)
e += Math.min(n0, 3) * 0.45;
else if (L === 1 && n0 >= 3)
e += 0.4;
}
var pt = (p + 2) % 4, high = h.some(function (c) { return ltgHi(c.r) === 14 || (c.s === 0 && c.r >= 11); });
if (e < 1.3 && !high && n0 <= 3 && S.bids[pt] !== 0)
return 0;
var b = Math.max(1, Math.min(13, Math.round(e)));
if (S.bids[pt])
b = Math.max(1, Math.min(b, 13 - S.bids[pt]));
return b;
}
function spAI(p) {
var L = cards(p);
if (L.length === 1)
return L[0];
var pt = (p + 2) % 4, nilMe = S.bids[p] === 0, nilPt = S.bids[pt] === 0, h = S.hands[p], bid = 0, took = 0;
function v(c) { return ltgHi(c.r) + (c.s === 0 ? 20 : 0); }
function lo(A) { return A.reduce(function (a, c) { return v(c) < v(a) ? c : a; }); }
function hi(A) { return A.reduce(function (a, c) { return v(c) > v(a) ? c : a; }); }
[p, pt].forEach(function (q) { if (S.bids[q] > 0) {
bid += S.bids[q];
took += S.won[q];
} });
var need = took < bid;
if (!S.trick.length) {
if (nilMe)
return lo(L);
var side = L.filter(function (c) { return c.s !== 0; }), bs = side.filter(function (c) { return boss(p, c); });
if (bs.length && (need || nilPt))
return hi(bs);
if (side.length) {
if (nilPt)
return hi(side);
var cnt = [0, 0, 0, 0];
h.forEach(function (c) { cnt[c.s]++; });
return side.reduce(function (a, c) { return cnt[c.s] > cnt[a.s] || (cnt[c.s] === cnt[a.s] && ltgHi(c.r) < ltgHi(a.r)) ? c : a; });
}
var sb = L.filter(function (c) { return boss(p, c); });
return sb.length ? hi(sb) : lo(L);
}
var T = S.trick, w = T[best(T)], led = T[0].c.s, last = T.length === 3;
function beats(c) { return (c.s === w.c.s && ltgHi(c.r) > ltgHi(w.c.r)) || (c.s === 0 && w.c.s !== 0); }
var win = L.filter(beats), lose = L.filter(function (c) { return !beats(c); });
if (nilMe)
return lose.length ? hi(lose) : (last ? hi(L) : lo(L));
var ptPlayed = T.some(function (t) { return t.p === pt; });
if (nilPt && (!ptPlayed || w.p === pt))
return win.length ? (last ? lo(win) : hi(win)) : lo(L);
if (w.p === pt && (last || boss(p, w.c)))
return lo(lose.length ? lose : L);
if (win.length && (need || !lose.length)) {
if (last)
return lo(win);
var fs = win.filter(function (c) { return c.s === led; });
if (fs.length) {
var b = fs.filter(function (c) { return boss(p, c); });
if (b.length)
return lo(b);
return T.length === 1 && lose.length ? lo(lose) : hi(fs);
}
return lo(win);
}
return lo(lose.length ? lose : L);
}
function passFor(p) {
var h = S.hands[p], cnt = [0, 0, 0, 0];
h.forEach(function (c) { cnt[c.s]++; });
function danger(c) {
var r = ltgHi(c.r);
if (c.s === 0)
return r === 12 ? (cnt[0] >= 5 ? 20 : 100) : r >= 13 ? (cnt[0] >= 5 ? 15 : 80) : r;
if (c.s === 1)
return r * 3;
return r * 2 + (cnt[c.s] <= 2 ? 12 : 0);
}
return h.slice().sort(function (a, b) { return danger(b) - danger(a) || a.s - b.s || a.r - b.r; }).slice(0, 3).map(ltgCd);
}
function hAI(p) {
var L = cards(p);
if (L.length === 1)
return L[0];
var h = S.hands[p], cnt = [0, 0, 0, 0];
h.forEach(function (c) { cnt[c.s]++; });
var qOut = !S.seen.some(isQ) && ltgAt(h, { s: 0, r: 12 }) < 0;
function r(c) { return ltgHi(c.r); }
function hi(A) { return A.reduce(function (a, c) { return r(c) > r(a) || (r(c) === r(a) && cnt[c.s] < cnt[a.s]) ? c : a; }); }
function lo(A) { return A.reduce(function (a, c) { return r(c) < r(a) ? c : a; }); }
if (!S.trick.length) {
var big = h.some(function (c) { return c.s === 0 && r(c) >= 12; }), lowSp = L.filter(function (c) { return c.s === 0 && r(c) < 12; });
if (qOut && !big && lowSp.length)
return hi(lowSp);
var sc = function (c) { return r(c) + (c.s === 1 ? 4 : 0) + (c.s === 0 && r(c) >= 12 ? 40 : 0) + cnt[c.s] * 0.6; };
return L.reduce(function (a, c) { return sc(c) < sc(a) ? c : a; });
}
var T = S.trick, led = T[0].c.s, w = T[best(T)].c;
if (L[0].s === led) {
var duck = L.filter(function (c) { return r(c) < r(w); });
if (duck.length)
return hi(duck);
var nq = L.filter(function (c) { return !isQ(c); }), pool = nq.length ? nq : L;
return T.length === 3 ? hi(pool) : lo(pool);
}
var q = L.filter(isQ);
if (q.length)
return q[0];
if (qOut) {
var bg = L.filter(function (c) { return c.s === 0 && r(c) >= 13; });
if (bg.length)
return hi(bg);
}
var hs = L.filter(function (c) { return c.s === 1; });
if (hs.length)
return hi(hs);
return hi(L);
}
function teamName(t, me, names, short) {
if (me >= 0 && me % 2 === t)
return short ? "Us" : "You & " + ltgWho((me + 2) % 4, me, names);
if (me >= 0 && short)
return "Them";
return ltgWho(t, me, names) + " & " + ltgWho(t + 2, me, names);
}
function scoreLine(me, names) {
if (sp)
return (me % 2 === 1 ? [1, 0] : [0, 1]).map(function (t) { return teamName(t, me, names, true) + " " + S.score[t] + (S.bags[t] ? " (" + S.bags[t] + (S.bags[t] > 1 ? " bags)" : " bag)") : ""); }).join("  ·  ") + "  ·  to " + S.to;
return [0, 1, 2, 3].map(function (p) { return ltgShort(ltgWho(p, me, names)) + " " + S.score[p]; }).join("  ·  ") + "  ·  to " + S.to;
}
function seatInfo(p) {
if (sp) {
var b = S.bids[p];
return (b === null ? (S.phase === "bid" ? "bidding…" : "") : b === 0 ? "Nil" : "bid " + b) + (S.phase === "bid" || b === null ? "" : ", won " + S.won[p]);
}
return S.score[p] + " pts" + (S.pts[p] ? " (+" + S.pts[p] + " this hand)" : "");
}
function resLines(me, names) {
if (!S.res)
return [];
if (sp)
return S.res.map(function (r, t) {
var s = teamName(t, me, names) + ": " + (r.bid ? "bid " + r.bid + ", took " + r.took : "no bid besides Nil") + " → " + (r.d >= 0 ? "+" : "") + r.d;
r.nils.forEach(function (n) { s += ". " + ltgWho(n.p, me, names) + (n.p === me ? "r" : "'s") + " Nil " + (n.ok ? "made it (+100)" : "failed (−100)"); });
if (r.bags)
s += ". " + r.bags + (r.bags > 1 ? " bags" : " bag");
if (r.pen)
s += ". Ten bags: −100";
return s + ".";
});
if (S.res.moon >= 0)
return [ltgWho(S.res.moon, me, names) + " shot the moon! Everyone else takes 26 points."];
return ["Points this hand: " + S.res.d.map(function (v, p) { return ltgShort(ltgWho(p, me, names)) + " " + v; }).join(", ") + "."];
}
function overSay(names) {
var w = S.fin.w;
if (sp)
return ltgWinSay([w[0], w[1]], names, ", " + S.score[w[0] % 2] + " to " + S.score[1 - w[0] % 2] + ".");
return ltgWinSay(w, names, " with " + S.score[w[0]] + " (lowest score).");
}
function doing() { return S.phase === "bid" ? "bid" : S.phase === "pass" ? "choose three cards to pass" : S.phase === "done" ? "deal the next hand" : "play a card"; }
var E = {
snap: function () { return ltgCopy(S); },
load: function (s) { S = ltgCopy(s); U = { at: -1, pick: [] }; },
turn: function () { return S.fin ? -1 : S.turn; },
legal: function (p) {
if (S.fin || p !== S.turn)
return [];
if (S.phase === "done")
return [{ m: { k: "next" }, label: "Deal the next hand" }];
if (S.phase === "bid") {
var b = [];
for (var i = 0; i <= 13; i++)
b.push({ m: { k: "bid", n: i }, label: i ? "Bid " + i : "Bid Nil (no tricks at all)" });
return b;
}
if (S.phase === "pass") {
var sg = passFor(p), u = ui(), out = [{ m: { k: "pass", c: sg }, label: "Pass the suggested three: " + ltgCards(sg) }];
if (u.pick.length === 3)
out.push({ m: { k: "pass", c: u.pick.slice() }, label: "Pass " + ltgCards(u.pick) });
S.hands[p].forEach(function (c) { var on = ltgAt(u.pick, c) >= 0; out.push({ ui: true, pick: ltgCd(c), label: (on ? "Put back " : "Choose ") + ltgThe(c) + (on ? "" : " to pass") }); });
return out;
}
return cards(p).map(function (c) { return { m: { k: "play", c: ltgCd(c) }, label: "Play " + ltgThe(c) }; });
},
play: function (p, m) {
if (!m || S.fin || p !== S.turn)
return false;
if (m.k === "pass") {
if (S.phase !== "pass" || !Array.isArray(m.c) || m.c.length !== 3)
return false;
var h = S.hands[p], ix = m.c.map(function (c) { return ltgAt(h, c); });
if (ix.some(function (i) { return i < 0; }) || ix[0] === ix[1] || ix[0] === ix[2] || ix[1] === ix[2])
return false;
S.passed[p] = m.c.map(ltgCd);
S.passed[p].forEach(function (c) { h.splice(ltgAt(h, c), 1); });
S.say = { p: p, t: "^" + p + " {have|has} passed three cards." };
S.ev = "";
if (p < 3)
S.turn = p + 1;
else {
S.got = [[], [], [], []];
for (var q = 0; q < 4; q++) {
var to = (q + dir()) % 4;
S.hands[to] = ltgSortH(S.hands[to].concat(S.passed[q]));
S.got[to] = S.passed[q];
}
begin();
S.say = { p: -9, t: "The cards have changed hands. The 2♣ leads." };
}
S.mv++;
return true;
}
if (!ltgFind(E.legal(p), m))
return false;
if (m.k === "next") {
S.hand++;
S.dealer = (S.dealer + 1) % 4;
S.ev = "";
deal();
}
else if (m.k === "bid") {
S.bids[p] = m.n;
S.ev = "";
S.say = { p: p, t: "^" + p + " {bid|bids} " + (m.n ? m.n : "Nil") + "." };
S.turn = (p + 1) % 4;
if (S.bids.every(function (b) { return b !== null; }))
begin();
}
else
put(p, ltgCd(m.c));
S.mv++;
return true;
},
ai: function (p) {
if (S.fin || p !== S.turn)
return null;
if (S.phase === "done")
return { k: "next" };
if (S.phase === "bid")
return { k: "bid", n: bidFor(p) };
if (S.phase === "pass")
return { k: "pass", c: passFor(p) };
return { k: "play", c: ltgCd(sp ? spAI(p) : hAI(p)) };
},
over: function (names) { return S.fin ? { winners: S.fin.w.slice(), say: overSay(names) } : null; },
pause: function () { return ltgPause(S.ev); },
pick: function (p, c) {
if (S.phase !== "pass" || S.turn !== p || !c)
return false;
var u = ui(), i = ltgAt(u.pick, c);
if (i >= 0)
u.pick.splice(i, 1);
else if (ltgAt(S.hands[p], c) >= 0) {
if (u.pick.length >= 3)
u.pick.shift();
u.pick.push(ltgCd(c));
}
else
return false;
return true;
},
status: function (me, names) { return ltgStatus(S, me, names, doing(), scoreLine(me, names), S.fin ? overSay(names) : ""); },
text: function (me, names) {
var t = [(sp ? "Spades" : "Hearts") + ", hand " + (S.hand + 1) + ", playing to " + S.to + "."];
t.push("Score: " + scoreLine(me, names).replace(/  ·  to \d+$/, "") + ".");
if (sp && S.phase !== "pass")
t.push("Bids: " + [0, 1, 2, 3].map(function (p) { return ltgWho(p, me, names) + " " + (S.bids[p] === null ? "–" : S.bids[p] === 0 ? "Nil" : S.bids[p]) + " (won " + S.won[p] + ")"; }).join(", ") + ".");
if (me >= 0)
t.push("Your hand: " + ltgSuits(S.hands[me]));
if (!sp && me >= 0 && S.got && S.got[me].length && S.seen.length < 4)
t.push("You were passed " + ltgCards(S.got[me]) + ".");
if (S.trick.length)
t.push("On the table: " + S.trick.map(function (q) { return ltgWho(q.p, me, names) + " " + llCardName(q.c); }).join(", ") + ".");
if (S.last)
t.push("Last trick: " + S.last.map(function (q) { return ltgWho(q.p, me, names) + " " + llCardName(q.c); }).join(", ") + ", taken by " + ltgWho(S.lastBy, me, names, true) + ".");
if (!sp)
t.push((S.broken ? "Hearts are broken." : "Hearts are not broken yet.") + " Points taken this hand: " + S.pts.map(function (v, p) { return ltgWho(p, me, names) + " " + v; }).join(", ") + ".");
else
t.push(S.broken ? "Spades are broken." : "Spades are not broken yet.");
if (S.phase === "done" || S.fin)
t = t.concat(resLines(me, names));
var nw = ltgNews(S.say, me, names);
if (nw)
t.push(nw);
t.push(S.fin ? "Game over. " + overSay(names) : S.turn === me ? "It's your turn: " + doing() + "." : ltgWho(S.turn, me, names) + " is next.");
return t.join("\n");
},
draw: function (x, W, H, me, names) {
var my = me < 0 ? 0 : me, u = ui(), hcw = Math.max(44, Math.min(84, W / 7.2, H / 6.4)), hch = hcw * 1.42, hy = H - hch - 8;
var ow = Math.max(13, Math.min(24, W / 28)), oh = ow * 1.42, top = 44 + oh, tcw = Math.max(36, Math.min(70, W / 8, H / 9)), tch = tcw * 1.42, cx = W / 2, cy = (top + hy - 40) / 2;
ltgT(x, scoreLine(me, names), W / 2, 13, 13, LTG_C.cream, "center", true, W - 16);
for (var rel = 1; rel < 4; rel++) {
var p = (my + rel) % 4;
ltgOpp(x, W, ["B", "L", "T", "R"][rel], { name: ltgWho(p, me, names), info: seatInfo(p), act: S.turn === p && !S.fin && S.phase !== "done", count: S.hands[p].length, ow: ow, oh: oh, ly: top + 16 });
}
var spot = [[0, 0.55], [-1.15, 0], [0, -0.55], [1.15, 0]];
var T = S.trick.length ? S.trick : (S.ev === "trick" && S.last ? S.last : null);
if (S.phase === "done" || S.fin)
ltgResult(x, W, top, hy - 30, S.fin ? "Game over: " + overSay(names) : "Hand " + (S.hand + 1) + " is over", resLines(me, names).concat([scoreLine(me, names)]), S, me, names);
else if (S.phase === "bid" && S.turn === me) {
var sug = bidFor(me), cols = W < 560 ? 7 : 14, gap = 6, bw = Math.min(48, (W - 24 - (cols - 1) * gap) / cols), bh = 34, rows = Math.ceil(14 / cols), tw = cols * bw + (cols - 1) * gap, bx = cx - tw / 2, by = cy - rows * (bh + gap) / 2 + 10;
ltgPara(x, "How many tricks do you think you'll take?", cx, by - 24, W - 30, 14, LTG_C.cream, true);
for (var i = 0; i < 14; i++)
ltgBtn(x, bx + (i % cols) * (bw + gap), by + Math.floor(i / cols) * (bh + gap), bw, bh, i ? String(i) : "Nil", { m: { k: "bid", n: i } }, i === sug);
ltgT(x, "The pink one is a fair guess for this hand.", cx, by + rows * (bh + gap) + 10, 11, LTG_C.sand, "center", false, W - 20);
}
else if (S.phase === "bid")
ltgPara(x, "Bidding: " + ltgWho(S.turn, me, names) + " is deciding…", cx, cy, W - 40, 14, LTG_C.sand);
else if (S.phase === "pass") {
if (S.turn === me) {
var to = (me + dir()) % 4, pw = Math.min(170, (W - 36) / 2);
ltgPara(x, "Choose three cards to pass " + ["", "to the left", "across", "to the right"][dir()] + ", to " + ltgWho(to, me, names) + ".", cx, cy - 34, Math.min(W - 30, 420), 14, LTG_C.cream, true);
ltgBtn(x, cx - pw - 6, cy, pw, 36, u.pick.length === 3 ? "Pass these three" : "Chosen " + u.pick.length + " of 3", u.pick.length === 3 ? { m: { k: "pass", c: u.pick.slice() } } : null, u.pick.length === 3);
ltgBtn(x, cx + 6, cy, pw, 36, "Choose for me", { ui: "sugg" });
}
else
ltgPara(x, (me >= 0 && S.passed[me] ? "Your three cards are passed. " : "") + "Waiting for " + ltgWho(S.turn, me, names) + " to choose cards to pass…", cx, cy, Math.min(W - 30, 420), 14, LTG_C.sand);
}
else if (T)
T.forEach(function (q) { var r = (q.p - my + 4) % 4; llDrawCard(x, ltgUp(q.c), cx + spot[r][0] * tcw - tcw / 2, cy + spot[r][1] * tch - tch / 2, tcw, tch, !S.trick.length && q.p === S.lastBy); });
else if (S.phase === "play")
ltgT(x, S.turn === me ? "Your lead" : ltgWho(S.turn, me, names) + " leads", cx, cy, 13, LTG_C.sand, "center", false, W - 20);
var h = S.hands[my], L = S.phase === "play" && S.turn === me ? cards(me) : [], n = h.length, step = n > 1 ? Math.min(hcw * 0.64, (W - 16 - hcw) / (n - 1)) : 0, x0 = (W - (hcw + (n - 1) * step)) / 2;
var passing = S.phase === "pass" && S.turn === me, fresh = !sp && S.got && me >= 0 && S.seen.length < 4 ? S.got[me] : [];
h.forEach(function (c, i) {
var ok = ltgAt(L, c) >= 0, pk = passing && ltgAt(u.pick, c) >= 0, X = x0 + i * step, Y = hy - (ok ? 8 : 0) - (pk ? 14 : 0);
if (me < 0) {
llDrawCard(x, { up: false }, X, Y, hcw, hch);
return;
}
llDrawCard(x, ltgUp(c), X, Y, hcw, hch, pk);
if (L.length && !ok)
ltgDim(x, X, Y, hcw, hch);
if (ltgAt(fresh, c) >= 0)
ltgT(x, "★", X + hcw * 0.8, Y + hcw * 0.16, Math.max(10, hcw * 0.2), LTG_C.pink, "center");
if (ok)
llHit(X, Y, hcw, hch, { m: { k: "play", c: ltgCd(c) } });
else if (passing)
llHit(X, Y, hcw, hch, { pick: ltgCd(c) });
});
var nw = ltgNews(S.say, me, names), mine = me < 0 ? "" : S.turn === me && S.phase === "play" ? (S.trick.length ? "Your turn: tap a card to play (bright cards may be played)" : "Your lead: tap a card") : sp && S.bids[me] !== null ? "You: " + seatInfo(me) : !sp ? "You: " + seatInfo(me) : "";
if (nw)
ltgT(x, nw, cx, hy - 44, 13, LTG_C.rose, "center", false, W - 16);
if (mine)
ltgT(x, mine, cx, hy - 24, 12, S.turn === me ? LTG_C.cream : LTG_C.sand, "center", S.turn === me, W - 16);
},
tap: function (px, py, me) {
var h = llHitAt(px, py);
if (!h || h.m)
return false;
if (h.pick)
return E.pick(me, h.pick);
if (h.ui === "sugg" && S.phase === "pass" && S.turn === me) {
ui().pick = passFor(me);
return true;
}
return false;
}
};
deal();
S.ev = "";
return E;
},
function (h) {
var n = h.length, M = [], i, a, b, c;
for (var r = 1; r <= 13; r++) {
var I = [];
for (i = 0; i < n; i++)
if (h[i].r === r)
I.push(i);
if (I.length === 4)
M.push(I.slice());
if (I.length >= 3)
for (a = 0; a < I.length; a++)
for (b = a + 1; b < I.length; b++)
for (c = b + 1; c < I.length; c++)
M.push([I[a], I[b], I[c]]);
}
for (var s = 0; s < 4; s++) {
var at = {};
for (i = 0; i < n; i++)
if (h[i].s === s)
at[h[i].r] = i;
for (var st = 1; st <= 11; st++) {
var R = [];
for (var q = st; q <= 13 && at[q] !== undefined; q++) {
R.push(at[q]);
if (R.length >= 3)
M.push(R.slice());
}
}
}
var bits = M.map(function (I) { return I.reduce(function (v, j) { return v | (1 << j); }, 0); }), memo = {}, pick = {};
function f(used) {
if (memo[used] !== undefined)
return memo[used];
var k = 0;
while (k < n && (used >> k & 1))
k++;
if (k >= n)
return (memo[used] = 0);
var bestV = ltgGinVal(h[k]) + f(used | (1 << k)), ch = -1;
for (var m = 0; m < M.length; m++)
if ((bits[m] >> k & 1) && !(bits[m] & used)) {
var v = f(used | bits[m]);
if (v < bestV) {
bestV = v;
ch = m;
}
}
pick[used] = ch;
return (memo[used] = bestV);
}
var dw = f(0), melds = [], dead = [], u = 0;
for (;;) {
var k2 = 0;
while (k2 < n && (u >> k2 & 1))
k2++;
if (k2 >= n)
break;
var ch2 = pick[u];
if (ch2 < 0) {
dead.push(h[k2]);
u |= 1 << k2;
}
else {
melds.push(M[ch2].map(function (j) { return h[j]; }));
u |= bits[ch2];
}
}
return { dw: dw, melds: melds, dead: dead };
},
function (h, melds) {
h = h.slice();
melds = melds.map(function (m) { return m.slice(); });
var laid = [], B;
for (;;) {
B = ltgGinBest(h);
var hit = null;
for (var i = 0; i < B.dead.length && !hit; i++)
for (var j = 0; j < melds.length; j++)
if (ltgGinFits(B.dead[i], melds[j])) {
hit = [B.dead[i], melds[j]];
break;
}
if (!hit)
break;
hit[1].push(hit[0]);
laid.push(hit[0]);
h.splice(ltgAt(h, hit[0]), 1);
}
return { best: B, laid: laid, melds: melds };
},
function (seed, opt) {
opt = opt || {};
var S = { g: "gin", to: opt.to || 100, hand: 0, first: (seed >>> 0) % 2, hands: [[], []], stock: [], pile: [], turn: 0, phase: "draw", took: null, score: [0, 0], mv: 0, ev: "", say: null, res: null, fin: null };
function deal() {
var d = llShuffle(llDeck(), ltgMix(seed, S.hand)).map(ltgCd);
S.hands = [[], []];
for (var i = 0; i < 20; i++)
S.hands[(S.first + i) % 2].push(d.pop());
S.hands.forEach(function (h) { ltgSortH(h, true); });
S.pile = [d.pop()];
S.stock = d;
S.turn = S.first;
S.phase = "draw";
S.took = null;
S.res = null;
S.say = { p: S.first, t: "A fresh hand. ^" + S.first + " {go|goes} first: draw from the stock, or take " + ltgThe(S.pile[0]) + "." };
}
function top() { return S.pile[S.pile.length - 1] || null; }
function settle(k) {
var d = 1 - k, K = ltgGinBest(S.hands[k]), gin = K.dw === 0, D, laid = [], km = K.melds;
if (gin)
D = ltgGinBest(S.hands[d]);
else {
var L = ltgGinLay(S.hands[d], K.melds);
D = L.best;
laid = L.laid;
km = L.melds;
}
var win, pts, under = false;
if (gin) {
win = k;
pts = D.dw + 25;
}
else if (D.dw <= K.dw) {
win = d;
pts = K.dw - D.dw + 25;
under = true;
}
else {
win = k;
pts = D.dw - K.dw;
}
S.score[win] += pts;
S.res = { k: k, gin: gin, under: under, win: win, pts: pts, kdw: K.dw, ddw: D.dw, km: km, kd: K.dead, dm: D.melds, dd: D.dead, laid: laid };
S.say = { p: win, t: gin ? "Gin! ^" + k + " {score|scores} " + pts + "." : under ? "Undercut! ^" + d + " {score|scores} " + pts + "." : "^" + k + " {knock|knocks} and {score|scores} " + pts + "." };
S.ev = "hand";
S.first = 1 - win;
if (S.score[win] >= S.to) {
S.fin = { w: [win] };
S.phase = "over";
S.turn = -1;
S.ev = "over";
}
else {
S.phase = "done";
S.turn = S.first;
}
}
function legal(p) {
if (S.fin || p !== S.turn)
return [];
if (S.phase === "done")
return [{ m: { k: "next" }, label: "Deal the next hand" }];
var out = [], h = S.hands[p];
if (S.phase === "draw") {
out.push({ m: { k: "stock" }, label: "Draw from the stock (" + S.stock.length + " left)" });
if (top())
out.push({ m: { k: "pile" }, label: "Take " + ltgThe(top()) + " from the discard pile" });
return out;
}
var kn = [];
h.forEach(function (c) {
if (ltgEq(c, S.took))
return;
out.push({ m: { k: "out", c: ltgCd(c) }, label: "Discard " + ltgThe(c) });
var dw = ltgGinBest(ltgWithout(h, c)).dw;
if (dw <= 10)
kn.push({ m: { k: "knock", c: ltgCd(c) }, label: dw ? "Knock with " + dw + ", discarding " + ltgThe(c) : "Go gin! Discard " + ltgThe(c), dw: dw });
});
return kn.concat(out);
}
function choose(p) {
var h = S.hands[p], bestC = null;
h.forEach(function (c) {
if (ltgEq(c, S.took))
return;
var rest = ltgWithout(h, c), dw = ltgGinBest(rest).dw, fr = rest.filter(function (x) { return x.r === c.r || (x.s === c.s && Math.abs(x.r - c.r) <= 2); }).length;
var sc = dw * 100 + fr * 10 - ltgGinVal(c) - c.s * 0.01;
if (!bestC || sc < bestC.sc)
bestC = { c: c, dw: dw, sc: sc };
});
return bestC;
}
function ai(p) {
if (S.fin || p !== S.turn)
return null;
if (S.phase === "done")
return { k: "next" };
if (S.phase === "draw") {
var t = top();
if (t && ltgGinBest(S.hands[p].concat([t])).melds.some(function (m) { return ltgAt(m, t) >= 0; }))
return { k: "pile" };
return { k: "stock" };
}
var b = choose(p);
return { k: b.dw <= 10 ? "knock" : "out", c: ltgCd(b.c) };
}
function resLines(me, names) {
var r = S.res;
if (!r)
return [];
if (r.wash)
return ["The stock ran down to two cards, so this hand is a wash: nobody scores."];
var K = ltgWho(r.k, me, names), D = ltgWho(1 - r.k, me, names);
if (r.gin)
return [K + " went gin! " + D + " had " + r.ddw + " in deadwood, plus 25 for gin: " + r.pts + " to " + ltgWho(r.win, me, names, true) + "."];
var dd = 1 - r.k;
var s = K + " knocked with " + r.kdw + ". " + D + (r.laid.length ? " laid off " + ltgCards(r.laid) + " and" : "") + " had " + r.ddw + ".";
return [s, r.under ? "Undercut! " + D + " " + ltgVb(dd, me, "score", "scores") + " " + (r.kdw - r.ddw) + " plus 25: " + r.pts + "." : K + " " + ltgVb(r.k, me, "score", "scores") + " " + r.pts + "."];
}
function scoreLine(me, names) { return [0, 1].map(function (p) { return ltgShort(ltgWho(p, me, names)) + " " + S.score[p]; }).join("  ·  ") + "  ·  to " + S.to; }
function overSay(names) { var w = S.fin.w[0]; return ltgWinSay([w], names, ", " + S.score[w] + " to " + S.score[1 - w] + "."); }
function doing() { return S.phase === "draw" ? "draw a card" : S.phase === "discard" ? "discard (or knock)" : "deal the next hand"; }
function row(x, groups, dead, laid, X, Y, cw) {
var ch = cw * 1.42;
groups.forEach(function (g) { g.forEach(function (c) { llDrawCard(x, ltgUp(c), X, Y, cw, ch, ltgAt(laid, c) >= 0); X += cw * 0.62; }); X += cw * 0.7; });
dead.forEach(function (c) { llDrawCard(x, ltgUp(c), X, Y, cw, ch); ltgDim(x, X, Y, cw, ch); X += cw * 0.62; });
}
var E = {
snap: function () { return ltgCopy(S); },
load: function (s) { S = ltgCopy(s); },
turn: function () { return S.fin ? -1 : S.turn; },
legal: function (p) { return legal(p).map(function (o) { return { m: o.m, label: o.label }; }); },
play: function (p, m) {
if (!m || S.fin || p !== S.turn || !ltgFind(legal(p), m))
return false;
var h = S.hands[p];
S.ev = "";
if (m.k === "next") {
S.hand++;
deal();
}
else if (m.k === "stock") {
h.push(S.stock.pop());
ltgSortH(h, true);
S.took = null;
S.phase = "discard";
S.say = { p: p, t: "^" + p + " {draw|draws} from the stock." };
}
else if (m.k === "pile") {
var t = S.pile.pop();
h.push(t);
ltgSortH(h, true);
S.took = t;
S.phase = "discard";
S.say = { p: p, t: "^" + p + " {take|takes} " + ltgThe(t) + "." };
}
else {
var c = ltgCd(m.c);
h.splice(ltgAt(h, c), 1);
S.pile.push(c);
S.took = null;
if (m.k === "knock")
settle(p);
else if (S.stock.length <= 2) {
S.res = { wash: true };
S.say = { p: -9, t: "Only two cards left in the stock: the hand is a wash." };
S.phase = "done";
S.turn = S.first;
S.ev = "hand";
}
else {
S.say = { p: p, t: "^" + p + " {discard|discards} " + ltgThe(c) + "." };
S.turn = 1 - p;
S.phase = "draw";
}
}
S.mv++;
return true;
},
ai: ai,
over: function (names) { return S.fin ? { winners: S.fin.w.slice(), say: overSay(names) } : null; },
pause: function () { return ltgPause(S.ev); },
status: function (me, names) { return ltgStatus(S, me, names, doing(), scoreLine(me, names), S.fin ? overSay(names) : ""); },
text: function (me, names) {
var t = ["Gin Rummy, hand " + (S.hand + 1) + ", playing to " + S.to + ".", "Score: " + scoreLine(me, names).replace(/  ·  to \d+$/, "") + "."];
if (me >= 0) {
var B = ltgGinBest(S.hands[me]);
t.push("Your hand: " + B.melds.map(function (m) { return "[" + m.map(llCardName).join(" ") + "]"; }).join(" ") + (B.dead.length ? (B.melds.length ? "  loose: " : "") + B.dead.map(llCardName).join(" ") : "") + ".");
t.push("Your deadwood: " + B.dw + (S.hands[me].length > 10 ? " (before you discard)" : "") + ".");
}
t.push("Discard pile: " + (top() ? llCardName(top()) + " on top" : "empty") + ". Stock: " + S.stock.length + " cards.");
if (me >= 0)
t.push(ltgWho(1 - me, me, names) + " holds " + S.hands[1 - me].length + " cards.");
if (S.phase === "done" || S.fin)
t = t.concat(resLines(me, names));
var nw = ltgNews(S.say, me, names);
if (nw)
t.push(nw);
t.push(S.fin ? "Game over. " + overSay(names) : S.turn === me ? "It's your turn: " + doing() + "." : ltgWho(S.turn, me, names) + " is next.");
return t.join("\n");
},
draw: function (x, W, H, me, names) {
var my = me < 0 ? 0 : me, op = 1 - my, cw = Math.max(42, Math.min(80, W / 7.6, H / 6.4)), ch = cw * 1.42, hy = H - ch - 8, cx = W / 2;
var ow = Math.max(13, Math.min(24, W / 28)), oh = ow * 1.42, top0 = 44 + oh, mid = (top0 + hy - 40) / 2;
ltgT(x, scoreLine(me, names), W / 2, 13, 13, LTG_C.cream, "center", true, W - 16);
ltgOpp(x, W, "T", { name: ltgWho(op, me, names), info: S.hands[op].length + " cards", act: S.turn === op && S.phase !== "done", count: S.hands[op].length, ow: ow, oh: oh });
var r = S.res;
if ((S.phase === "done" || S.fin) && r && !r.wash) {
var bw = Math.min(W - 20, 520), scw = Math.max(18, Math.min(46, (bw - 30) / 12.5)), sch = scw * 1.42, L = resLines(me, names), bh = 58 + 2 * (sch + 26) + L.length * 18 + (S.fin ? 6 : 48);
var bx = (W - bw) / 2, by = Math.max(top0, mid - bh / 2), y = by + 20;
ltgBox(x, bx, by, bw, bh);
ltgT(x, S.fin ? "Game over: " + overSay(names) : "Hand " + (S.hand + 1) + " is over", W / 2, y, 15, LTG_C.cream, "center", true, bw - 20);
y += 18;
ltgT(x, ltgWho(r.k, me, names) + (r.gin ? " (gin)" : " (knocked)"), bx + 12, y + 6, 12, LTG_C.sand, "left", true, bw - 24);
y += 14;
row(x, r.km, r.kd, r.laid, bx + 12, y, scw);
y += sch + 12;
ltgT(x, ltgWho(1 - r.k, me, names) + (r.laid.length ? " (laid-off cards shine on the melds above)" : ""), bx + 12, y + 6, 12, LTG_C.sand, "left", true, bw - 24);
y += 14;
row(x, r.dm, r.dd, [], bx + 12, y, scw);
y += sch + 14;
L.forEach(function (s) { ltgT(x, s, W / 2, y, 12, LTG_C.cream, "center", false, bw - 20); y += 18; });
if (!S.fin) {
if (S.turn === me)
ltgBtn(x, W / 2 - 90, by + bh - 42, 180, 34, "Deal the next hand", { m: { k: "next" } }, true);
else
ltgT(x, "Next: waiting for " + ltgWho(S.turn, me, names) + "…", W / 2, by + bh - 24, 12, LTG_C.sand, "center", false, bw - 20);
}
}
else if (S.phase === "done" || S.fin)
ltgResult(x, W, top0, hy - 30, S.fin ? "Game over" : "A wash", resLines(me, names).concat([scoreLine(me, names)]), S, me, names);
else {
var pc = Math.max(40, Math.min(72, W / 7, H / 8)), ph = pc * 1.42, py = mid - ph / 2 - 10, can = S.turn === me && S.phase === "draw", t = top();
llDrawCard(x, S.stock.length ? { up: false } : null, cx - pc - 10, py, pc, ph);
if (can)
llHit(cx - pc - 10, py, pc, ph, { m: { k: "stock" } });
ltgT(x, "Stock · " + S.stock.length, cx - pc / 2 - 10, py + ph + 12, 11, LTG_C.sand, "center");
if (S.pile.length > 1)
llDrawCard(x, ltgUp(S.pile[S.pile.length - 2]), cx + 14, py - 4, pc, ph);
llDrawCard(x, t ? ltgUp(t) : null, cx + 10, py, pc, ph, can);
if (can && t)
llHit(cx + 10, py, pc, ph, { m: { k: "pile" } });
ltgT(x, "Discards", cx + 10 + pc / 2, py + ph + 12, 11, LTG_C.sand, "center");
if (can)
ltgT(x, "Tap the stock or the discard pile", cx, py - 14, 12, LTG_C.rose, "center", true, W - 20);
if (S.turn === me && S.phase === "discard") {
var kn = legal(me).filter(function (o) { return o.m.k === "knock"; }).sort(function (a, b) { return a.dw - b.dw || ltgGinVal(b.m.c) - ltgGinVal(a.m.c); })[0];
if (kn)
ltgBtn(x, cx - 110, py + ph + 24, 220, 34, kn.dw ? "Knock (discard " + llCardName(kn.m.c) + ")" : "Gin! (discard " + llCardName(kn.m.c) + ")", { m: kn.m }, true);
}
}
var h = S.hands[my], B = ltgGinBest(h), groups = B.melds.map(function (m) { return ltgSortH(m.slice(), true); }), dead = ltgSortH(B.dead.slice(), true);
if (dead.length)
groups.push(dead);
var n = h.length, gw = cw * 0.3, step = n > 1 ? Math.min(cw * 0.62, (W - 16 - cw - (groups.length - 1) * gw) / (n - 1)) : 0, X = (W - (cw + (n - 1) * step + (groups.length - 1) * gw)) / 2;
var tap = S.turn === me && S.phase === "discard";
groups.forEach(function (g, gi) {
var gx = X;
g.forEach(function (c) {
if (me < 0)
llDrawCard(x, { up: false }, X, hy, cw, ch);
else {
llDrawCard(x, ltgUp(c), X, hy, cw, ch, ltgEq(c, S.took));
if (tap && !ltgEq(c, S.took))
llHit(X, hy, cw, ch, { m: { k: "out", c: ltgCd(c) } });
}
X += step;
});
if (me >= 0 && gi < B.melds.length) {
x.fillStyle = LTG_C.gold;
x.fillRect(gx, hy - 6, X - step + cw - gx, 3);
}
X += gw;
});
var nw = ltgNews(S.say, me, names);
if (nw)
ltgT(x, nw, cx, hy - 44, 13, LTG_C.rose, "center", false, W - 16);
if (me >= 0)
ltgT(x, tap ? "Your turn: tap a card to discard it · deadwood " + B.dw : "Your deadwood: " + B.dw + (n > 10 ? " (before discarding)" : ""), cx, hy - 22, 12, tap ? LTG_C.cream : LTG_C.sand, "center", tap, W - 16);
},
tap: function () { return false; }
};
deal();
S.ev = "";
return E;
},
function (x, a, b, X, Y, w, h, o) {
o = o || {};
var r = Math.min(w, h) * 0.16;
llRound(x, X, Y, w, h, r);
if (o.back) {
x.fillStyle = LTG_C.plum;
x.fill();
x.strokeStyle = LTG_C.gold;
x.lineWidth = 1.2;
x.stroke();
return;
}
x.fillStyle = o.sel ? "#F6E2B8" : "#F4EEE2";
x.fill();
x.strokeStyle = o.sel || o.hot ? (o.sel ? LTG_C.gold : LTG_C.pink) : "rgba(90,40,90,.55)";
x.lineWidth = o.sel || o.hot ? 3 : 1.2;
x.stroke();
var flat = w >= h, s = flat ? h / 2 : w / 2;
x.strokeStyle = "rgba(90,40,90,.5)";
x.lineWidth = 1;
x.beginPath();
if (flat) {
x.moveTo(X + w / 2, Y + h * 0.15);
x.lineTo(X + w / 2, Y + h * 0.85);
x.stroke();
ltgPips(x, a, X + w / 4, Y + h / 2, s);
ltgPips(x, b, X + w * 0.75, Y + h / 2, s);
}
else {
x.moveTo(X + w * 0.15, Y + h / 2);
x.lineTo(X + w * 0.85, Y + h / 2);
x.stroke();
ltgPips(x, a, X + w / 2, Y + h / 4, s);
ltgPips(x, b, X + w / 2, Y + h * 0.75, s);
}
if (o.dim)
ltgDim(x, X, Y, w, h);
},
function (seed, n, opt) {
opt = opt || {};
var S = { g: "dom", n: n, to: opt.to || 100, hand: 0, hands: [], bone: [], line: [], turn: 0, lead: -1, must: null, passes: 0, phase: "play", score: [], mv: 0, ev: "", say: null, res: null, fin: null };
for (var i0 = 0; i0 < n; i0++)
S.score.push(0);
var U = { at: -1, sel: null };
function ui() { if (U.at !== S.mv)
U = { at: S.mv, sel: null }; return U; }
function sortH(h) { return h.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; }); }
function deal() {
var T = [], a, b;
for (a = 0; a <= 6; a++)
for (b = a; b <= 6; b++)
T.push([a, b]);
var R = ltgRand(seed, S.hand);
for (var i = T.length - 1; i > 0; i--) {
var j = Math.floor(R() * (i + 1)), t = T[i];
T[i] = T[j];
T[j] = t;
}
var k = [0, 0, 7, 6, 5][n];
S.hands = [];
for (var p = 0; p < n; p++)
S.hands.push(sortH(T.splice(0, k)));
S.bone = T;
S.line = [];
S.passes = 0;
S.must = null;
S.phase = "play";
S.res = null;
if (S.lead < 0) {
var bestT = null, who = 0;
S.hands.forEach(function (h, q) {
h.forEach(function (t) {
var v = (t[0] === t[1] ? 100 : 0) + (t[0] + t[1]) * 2 + Math.max(t[0], t[1]) * 0.1;
if (!bestT || v > bestT.v) {
bestT = { t: t, v: v };
who = q;
}
});
});
S.must = bestT.t.slice();
S.turn = who;
S.say = { p: who, t: "^" + who + " {hold|holds} the " + ltgTn(S.must) + ", so {you set|sets} it down first." };
}
else {
S.turn = S.lead;
S.say = { p: S.lead, t: "A fresh hand. ^" + S.lead + " {lead|leads}." };
}
}
function ends() { return S.line.length ? [S.line[0][0], S.line[S.line.length - 1][1]] : null; }
function legal(p) {
if (S.fin || p !== S.turn)
return [];
if (S.phase === "done")
return [{ m: { k: "next" }, label: "Deal the next hand" }];
var h = S.hands[p], out = [], E2 = ends();
if (!E2) {
(S.must ? [S.must] : h).forEach(function (t) { out.push({ m: { k: "play", t: t.slice(), e: "L" }, label: "Set down the " + ltgTn(t) }); });
return out;
}
h.forEach(function (t) {
if (t[0] === E2[0] || t[1] === E2[0])
out.push({ m: { k: "play", t: t.slice(), e: "L" }, label: "Play the " + ltgTn(t) + (E2[0] === E2[1] ? "" : " on the left end (the " + E2[0] + ")") });
if ((t[0] === E2[1] || t[1] === E2[1]) && E2[0] !== E2[1])
out.push({ m: { k: "play", t: t.slice(), e: "R" }, label: "Play the " + ltgTn(t) + " on the right end (the " + E2[1] + ")" });
});
if (!out.length)
out.push(S.bone.length ? { m: { k: "draw" }, label: "Draw from the boneyard (" + S.bone.length + " left)" } : { m: { k: "pass" }, label: "Pass: nothing fits" });
return out;
}
function finish(win, how, pts) {
if (win >= 0) {
S.score[win] += pts;
S.lead = win;
}
else
S.lead = (S.turn + 1) % n;
S.res = { how: how, win: win, pts: pts, pips: S.hands.map(ltgPipSum) };
S.ev = "hand";
var top = Math.max.apply(null, S.score);
if (top >= S.to) {
S.fin = { w: ltgBest(S.score) };
S.phase = "over";
S.turn = -1;
S.ev = "over";
}
else {
S.phase = "done";
S.turn = S.lead;
}
}
function blocked() {
var pips = S.hands.map(ltgPipSum), lo = Math.min.apply(null, pips), w = ltgBest(pips, true), all = pips.reduce(function (a, b) { return a + b; }, 0);
if (w.length > 1) {
S.say = { p: -9, t: "Blocked, and a tie for the lightest hand: nobody scores." };
finish(-1, "tie", 0);
return;
}
var pts = ltgRound5(all - lo - lo);
S.say = { p: w[0], t: "The game is blocked. ^" + w[0] + " {have|has} the lightest hand and {score|scores} " + pts + "." };
finish(w[0], "block", pts);
}
function ai(p) {
var L = legal(p);
if (!L.length)
return null;
if (L[0].m.k !== "play")
return L[0].m;
var h = S.hands[p], E2 = ends(), best = null;
L.forEach(function (o) {
var t = o.m.t, nx = !E2 ? null : (o.m.e === "L" ? (t[0] === E2[0] ? t[1] : t[0]) : (t[0] === E2[1] ? t[1] : t[0]));
var fit = nx === null ? 0 : h.filter(function (q) { return !(q[0] === t[0] && q[1] === t[1]) && (q[0] === nx || q[1] === nx); }).length;
var v = (t[0] + t[1]) * 10 + (t[0] === t[1] ? 5 : 0) + fit;
if (!best || v > best.v)
best = { m: o.m, v: v };
});
return best.m;
}
function scoreLine(me, names) { return S.score.map(function (v, p) { return ltgShort(ltgWho(p, me, names)) + " " + v; }).join("  ·  ") + "  ·  to " + S.to; }
function overSay(names) { var w = S.fin.w; return ltgWinSay(w, names, " with " + S.score[w[0]] + "."); }
function resLines(me, names) {
var r = S.res;
if (!r)
return [];
var left = "Pips left: " + r.pips.map(function (v, p) { return ltgShort(ltgWho(p, me, names)) + " " + v; }).join(", ") + ".";
if (r.how === "out") {
var raw = r.pips.reduce(function (a, b) { return a + b; }, 0);
return [ltgWho(r.win, me, names) + " played the last tile!", left, ltgWho(r.win, me, names) + " " + ltgVb(r.win, me, "score", "scores") + " " + r.pts + (raw !== r.pts ? " (" + raw + ", to the nearest 5)." : ".")];
}
if (r.how === "tie")
return ["Nobody can play, and two hands tie for lightest.", left, "Nobody scores this hand."];
return ["Nobody can play: the game is blocked.", left, ltgWho(r.win, me, names) + " " + ltgVb(r.win, me, "have", "has") + " the lightest hand and " + ltgVb(r.win, me, "score", "scores") + " " + r.pts + "."];
}
function doing() { return S.phase === "done" ? "deal the next hand" : legal(S.turn)[0] && legal(S.turn)[0].m.k === "play" ? "play a tile" : "draw or pass"; }
var E = {
snap: function () { return ltgCopy(S); },
load: function (s) { S = ltgCopy(s); U = { at: -1, sel: null }; },
turn: function () { return S.fin ? -1 : S.turn; },
legal: legal,
play: function (p, m) {
var it = ltgFind(legal(p), m);
if (!it || S.fin)
return false;
m = it.m;
S.ev = "";
if (m.k === "next") {
S.hand++;
deal();
}
else if (m.k === "draw") {
S.hands[p].push(S.bone.pop());
sortH(S.hands[p]);
S.say = { p: p, t: "^" + p + " {draw|draws} from the boneyard." };
}
else if (m.k === "pass") {
S.passes++;
S.say = { p: p, t: "^" + p + " can't play, and {pass|passes}." };
S.turn = (p + 1) % n;
if (S.passes >= n)
blocked();
}
else {
var h = S.hands[p], t = m.t, E2 = ends();
for (var i = 0; i < h.length; i++)
if (h[i][0] === t[0] && h[i][1] === t[1]) {
h.splice(i, 1);
break;
}
if (!E2)
S.line.push([t[0], t[1]]);
else if (m.e === "L")
S.line.unshift(t[1] === E2[0] ? [t[0], t[1]] : [t[1], t[0]]);
else
S.line.push(t[0] === E2[1] ? [t[0], t[1]] : [t[1], t[0]]);
S.must = null;
S.passes = 0;
S.say = { p: p, t: "^" + p + " {play|plays} the " + ltgTn(t) + "." };
if (!h.length) {
var pts = ltgRound5(ltgPipSum([].concat.apply([], S.hands)));
S.say = { p: p, t: "Domino! ^" + p + " {play|plays} the last tile and {score|scores} " + pts + "." };
finish(p, "out", pts);
}
else
S.turn = (p + 1) % n;
}
S.mv++;
return true;
},
ai: ai,
over: function (names) { return S.fin ? { winners: S.fin.w.slice(), say: overSay(names) } : null; },
pause: function () { return ltgPause(S.ev); },
status: function (me, names) { return ltgStatus(S, me, names, doing(), scoreLine(me, names), S.fin ? overSay(names) : ""); },
text: function (me, names) {
var E2 = ends(), t = ["Dominoes, hand " + (S.hand + 1) + ", playing to " + S.to + ".", "Score: " + scoreLine(me, names).replace(/  ·  to \d+$/, "") + "."];
t.push(S.line.length ? "The line: " + S.line.map(function (q) { return q[0] + "|" + q[1]; }).join(" ") + "  (open ends: " + E2[0] + " on the left, " + E2[1] + " on the right)." : "The table is empty.");
if (me >= 0)
t.push("Your tiles: " + S.hands[me].map(function (q) { return q[0] + "|" + q[1]; }).join("  ") + " (" + ltgPipSum(S.hands[me]) + " pips).");
t.push("Tiles held: " + S.hands.map(function (h, p) { return ltgWho(p, me, names) + " " + h.length; }).join(", ") + ". Boneyard: " + S.bone.length + ".");
if (S.phase === "done" || S.fin)
t = t.concat(resLines(me, names));
var nw = ltgNews(S.say, me, names);
if (nw)
t.push(nw);
t.push(S.fin ? "Game over. " + overSay(names) : S.turn === me ? "It's your turn: " + doing() + "." : ltgWho(S.turn, me, names) + " is next.");
return t.join("\n");
},
draw: function (x, W, H, me, names) {
var my = me < 0 ? 0 : me, u = ui(), cx = W / 2, h = S.hands[my], nh = h.length;
ltgT(x, scoreLine(me, names) + "  ·  boneyard " + S.bone.length, W / 2, 13, 13, LTG_C.cream, "center", true, W - 16);
var ow = Math.max(10, Math.min(18, W / 34)), oh = ow * 2, top0 = 44 + oh;
for (var rel = 1; rel < n; rel++) {
var p = (my + rel) % n;
ltgOpp(x, W, ltgSpot(rel, n), { name: ltgWho(p, me, names), info: S.hands[p].length + " tiles · " + S.score[p], act: S.turn === p && S.phase === "play", count: S.hands[p].length, ow: ow, oh: oh, ly: top0 + 12, tile: true });
}
var tw = Math.max(24, Math.min(44, (W - 16) / Math.max(7, nh) - 5, H / 14)), th = tw * 2, per = Math.max(1, Math.floor((W - 16) / (tw + 5))), rows = Math.max(1, Math.ceil(nh / per)), hy = H - rows * (th + 6) - 4;
var L = S.turn === me && S.phase === "play" ? legal(me) : [], plays = L.filter(function (o) { return o.m.k === "play"; });
h.forEach(function (t, i) {
var r = Math.floor(i / per), inRow = Math.min(per, nh - r * per), X = (W - inRow * (tw + 5) + 5) / 2 + (i % per) * (tw + 5), Y = hy + r * (th + 6);
var mine = plays.filter(function (o) { return o.m.t[0] === t[0] && o.m.t[1] === t[1]; }), sel = u.sel && u.sel[0] === t[0] && u.sel[1] === t[1];
if (me < 0) {
ltgTile(x, 0, 0, X, Y, tw, th, { back: true });
return;
}
ltgTile(x, t[0], t[1], X, sel ? Y - 8 : Y, tw, th, { sel: sel, dim: plays.length > 0 && !mine.length });
if (mine.length === 1)
llHit(X, Y, tw, th, { m: mine[0].m });
else if (mine.length > 1)
llHit(X, Y, tw, th, { dsel: t.slice() });
});
var len = S.line.length, aTop = top0 + (n > 2 ? 40 : 8), aBot = hy - 60, lw = 60, per2 = 1, rows2 = 1;
for (; lw > 18; lw -= 2) {
per2 = Math.max(1, Math.floor((W - 24) / (lw + 3)));
rows2 = Math.max(1, Math.ceil(len / per2));
if (rows2 * (lw / 2 + 8) <= aBot - aTop)
break;
}
var lh = lw / 2, y0 = aTop + Math.max(0, (aBot - aTop - rows2 * (lh + 8)) / 2), E2 = ends(), endHot = S.turn === me && plays.length > 0;
if (S.phase === "play")
S.line.forEach(function (q, i) {
var r = Math.floor(i / per2), k = i % per2, inRow = Math.min(per2, len - r * per2), X, Y = y0 + r * (lh + 8), fwd = r % 2 === 0;
if (rows2 === 1)
X = (W - (inRow * (lw + 3) - 3)) / 2 + k * (lw + 3);
else
X = fwd ? 12 + k * (lw + 3) : W - 12 - lw - k * (lw + 3);
ltgTile(x, fwd ? q[0] : q[1], fwd ? q[1] : q[0], X, Y, lw, lh, { hot: endHot && (i === 0 || i === len - 1) });
});
if (!len && S.phase === "play")
ltgPara(x, S.turn === me ? "The table is empty: set down your " + (S.must ? ltgTn(S.must) : "first tile") + "." : "The table is empty. " + ltgWho(S.turn, me, names) + " sets down first.", cx, (aTop + aBot) / 2, W - 40, 14, LTG_C.sand);
var by = hy - 46;
if (S.phase === "done" || S.fin)
ltgResult(x, W, top0, hy - 30, S.fin ? "Game over: " + overSay(names) : "Hand " + (S.hand + 1) + " is over", resLines(me, names), S, me, names);
else if (L.length && L[0].m.k !== "play")
ltgBtn(x, cx - 100, by, 200, 34, L[0].m.k === "draw" ? "Draw a tile (" + S.bone.length + " left)" : "Pass: nothing fits", { m: L[0].m }, true);
else if (u.sel && E2) {
var bw = Math.min(190, (W - 30) / 2);
ltgBtn(x, cx - bw - 6, by, bw, 34, "◀ Left end (the " + E2[0] + ")", { m: { k: "play", t: u.sel.slice(), e: "L" } }, true);
ltgBtn(x, cx + 6, by, bw, 34, "Right end (the " + E2[1] + ") ▶", { m: { k: "play", t: u.sel.slice(), e: "R" } }, true);
}
else if (me >= 0 && S.turn === me)
ltgT(x, "Your turn: tap a bright tile to play it", cx, by + 17, 12, LTG_C.cream, "center", true, W - 16);
var nw = ltgNews(S.say, me, names);
if (nw)
ltgT(x, nw, cx, by - 12, 13, LTG_C.rose, "center", false, W - 16);
},
tap: function (px, py, me) {
var hh = llHitAt(px, py);
if (!hh || hh.m || !hh.dsel || S.turn !== me)
return false;
var u = ui();
u.sel = u.sel && u.sel[0] === hh.dsel[0] && u.sel[1] === hh.dsel[1] ? null : hh.dsel;
return true;
}
};
deal();
S.ev = "";
return E;
},
function (v) {
var c = [0, 0, 0, 0, 0, 0, 0], f, best = 0, pts = 0, ok = v.length > 0;
v.forEach(function (d) { c[d]++; });
if (v.length === 6) {
if (c[1] && c[2] && c[3] && c[4] && c[5] && c[6])
best = 1500;
var pairs = 0, even = true;
for (f = 1; f <= 6; f++) {
pairs += Math.floor(c[f] / 2);
if (c[f] % 2)
even = false;
}
if (even && pairs === 3)
best = Math.max(best, 1500);
}
for (f = 1; f <= 6; f++) {
var n = c[f];
if (!n)
continue;
if (n >= 3)
pts += (f === 1 ? 1000 : f * 100) * (n - 2);
else if (f === 1)
pts += 100 * n;
else if (f === 5)
pts += 50 * n;
else
ok = false;
}
return Math.max(best, ok ? pts : 0);
},
function (v) {
var n = v.length, c = [0, 0, 0, 0, 0, 0, 0], seen = {}, out = [];
v.forEach(function (d) { c[d]++; });
for (var mask = 1; mask < (1 << n); mask++) {
var I = [], vals = [], kc = [0, 0, 0, 0, 0, 0, 0], ok = true;
for (var i = 0; i < n; i++)
if (mask >> i & 1) {
I.push(i);
vals.push(v[i]);
kc[v[i]]++;
}
for (var f = 1; f <= 6; f++)
if (c[f] >= 3 && kc[f] && kc[f] < c[f])
ok = false;
if (!ok)
continue;
var key = vals.slice().sort().join("");
if (seen[key])
continue;
var pts = ltgFkScore(vals);
if (!pts)
continue;
seen[key] = 1;
out.push({ i: I, v: vals, pts: pts, key: key });
}
return out.sort(function (a, b) { return b.pts - a.pts || a.i.length - b.i.length || (a.key < b.key ? -1 : 1); });
},
function (v) {
var c = [0, 0, 0, 0, 0, 0, 0];
v.forEach(function (d) { c[d]++; });
if (v.length === 6 && c[1] === 1 && c[2] === 1 && c[3] === 1 && c[4] === 1 && c[5] === 1)
return "the straight";
var plain = 0, f;
for (f = 1; f <= 6; f++)
if (c[f] >= 3)
plain += (f === 1 ? 1000 : f * 100) * (c[f] - 2);
else if (f === 1)
plain += 100 * c[f];
else if (f === 5)
plain += 50 * c[f];
else if (c[f])
plain = -1e9;
if (v.length === 6 && plain < 1500)
return "three pairs";
var W = ["", "a", "two", "three", "four", "five", "six"], parts = [];
[1, 5, 2, 3, 4, 6].forEach(function (f2) { if (c[f2])
parts.push(W[c[f2]] + " " + f2 + (c[f2] > 1 ? "s" : "")); });
return ltgAnd(parts);
},
function (x, v, X, Y, s, o) {
o = o || {};
llRound(x, X, Y, s, s, s * 0.18);
x.fillStyle = o.sel ? "#F6E2B8" : "#F4EEE2";
x.fill();
x.strokeStyle = o.sel ? LTG_C.gold : "rgba(90,40,90,.55)";
x.lineWidth = o.sel ? 3.5 : 1.2;
x.stroke();
var r = s * 0.09, P = LTG_PIPS[v];
x.fillStyle = v === 1 ? "#B0306A" : LTG_C.ink;
P.forEach(function (p) { x.beginPath(); x.arc(X + s / 2 + p[0] * s * 0.27, Y + s / 2 + p[1] * s * 0.27, v === 1 ? r * 1.5 : r, 0, 7); x.fill(); });
if (o.dim)
ltgDim(x, X, Y, s, s);
},
function (seed, n, opt) {
opt = opt || {};
var S = { g: "fk", n: n, to: opt.to || 5000, score: [], on: [], turn: (seed >>> 0) % n, phase: "roll", tp: 0, left: 6, dice: [], aside: [], ri: 0, endBy: -1, mv: 0, ev: "", say: null, fd: null, fin: null };
for (var i0 = 0; i0 < n; i0++) {
S.score.push(0);
S.on.push(false);
}
var U = { at: -1, sel: [] };
function ui() { if (U.at !== S.mv)
U = { at: S.mv, sel: [] }; return U; }
function roll() {
var R = ltgRand(seed, 1000003 + S.ri);
S.ri++;
S.dice = [];
for (var i = 0; i < S.left; i++)
S.dice.push(1 + Math.floor(R() * 6));
S.ev = "roll";
S.phase = "pick";
if (!ltgFkKeeps(S.dice).length) {
var p = S.turn;
S.fd = { p: p, d: S.dice.slice(), lost: S.tp };
S.say = { p: p, t: "Farkle! Nothing scores" + (S.tp ? ", so #" + p + " {lose|loses} the " + ltgN(S.tp) + " from this turn." : ".") };
next();
if (!S.fin)
S.ev = "farkle";
}
}
function next() {
S.tp = 0;
S.left = 6;
S.dice = [];
S.aside = [];
S.phase = "roll";
S.turn = (S.turn + 1) % n;
if (S.endBy >= 0 && S.turn === S.endBy) {
S.fin = { w: ltgBest(S.score) };
S.turn = -1;
S.phase = "over";
S.ev = "over";
}
}
function keepOf(k) {
if (!Array.isArray(k) || !k.length || k.length > S.dice.length)
return null;
var seen = {}, vals = [];
for (var i = 0; i < k.length; i++) {
var j = k[i];
if (typeof j !== "number" || j % 1 || j < 0 || j >= S.dice.length || seen[j])
return null;
seen[j] = 1;
vals.push(S.dice[j]);
}
var pts = ltgFkScore(vals);
return pts ? { v: vals, pts: pts } : null;
}
function legal(p) {
if (S.fin || p !== S.turn)
return [];
if (S.phase === "roll")
return [{ m: { k: "roll", keep: [] }, label: "Roll six dice" }];
var out = [];
ltgFkKeeps(S.dice).forEach(function (K) {
var left = S.left - K.i.length, tot = S.tp + K.pts, d = ltgFkSay(K.v);
out.push({ m: { k: "roll", keep: K.i }, label: left ? "Keep " + d + " (" + tot + " so far), roll " + left + (left > 1 ? " dice" : " die") : "Keep " + d + " (hot dice!), roll all six again with " + tot });
if (S.on[p] || tot >= 500)
out.push({ m: { k: "bank", keep: K.i }, label: "Keep " + d + " and bank " + tot });
});
return out;
}
function shouldBank(p, tot, left) {
var me = S.score[p], lead = 0;
S.score.forEach(function (v, q) { if (q !== p && v > lead)
lead = v; });
if (S.endBy >= 0)
return me + tot > lead;
if (me + tot >= S.to)
return true;
return (left <= 2 && tot >= 300) || (left <= 3 && tot >= 350) || (left <= 4 && tot >= 1000) || (left <= 5 && tot >= 2000) || tot >= 3000;
}
function ai(p) {
var L = legal(p);
if (!L.length)
return null;
if (S.phase === "roll")
return L[0].m;
var C = { 6: 300, 5: 200, 4: 120, 3: 60, 2: 25, 1: 10 }, br = null, bb = null;
L.forEach(function (o) {
var pts = keepOf(o.m.keep).pts, left = S.left - o.m.keep.length || 6;
if (o.m.k === "roll") {
var v = pts + C[left];
if (!br || v > br.v)
br = { m: o.m, v: v, left: left };
}
else if (!bb || pts > bb.pts)
bb = { m: o.m, pts: pts };
});
if (bb && shouldBank(p, S.tp + bb.pts, br.left))
return bb.m;
return br.m;
}
function scoreLine(me, names) { return S.score.map(function (v, p) { return ltgShort(ltgWho(p, me, names)) + " " + ltgN(v); }).join("  ·  ") + "  ·  to " + ltgN(S.to); }
function overSay(names) { var w = S.fin.w; return ltgWinSay(w, names, " with " + ltgN(S.score[w[0]]) + "."); }
function doing() { return S.phase === "roll" ? "roll the dice" : "keep scoring dice, then roll or bank"; }
function selKeep() { var u = ui(); return u.sel.slice().sort(function (a, b) { return a - b; }); }
var E = {
snap: function () { return ltgCopy(S); },
load: function (s) { S = ltgCopy(s); U = { at: -1, sel: [] }; },
turn: function () { return S.fin ? -1 : S.turn; },
legal: legal,
play: function (p, m) {
if (!m || S.fin || p !== S.turn)
return false;
if (m.k === "roll" && S.phase === "roll") {
if (!Array.isArray(m.keep) || m.keep.length)
return false;
S.fd = null;
S.say = null;
roll();
S.mv++;
return true;
}
if (S.phase !== "pick" || (m.k !== "roll" && m.k !== "bank"))
return false;
var K = keepOf(m.keep);
if (!K)
return false;
var tot = S.tp + K.pts;
if (m.k === "bank") {
if (!S.on[p] && tot < 500)
return false;
S.score[p] += tot;
S.on[p] = true;
S.fd = null;
S.say = { p: p, t: "^" + p + " {bank|banks} " + ltgN(tot) + ", for " + ltgN(S.score[p]) + " in all." };
if (S.score[p] >= S.to && S.endBy < 0) {
S.endBy = p;
S.say.t += " That reaches " + ltgN(S.to) + ": everyone else has one last turn to beat it.";
}
next();
if (!S.fin)
S.ev = "";
}
else {
S.tp = tot;
S.aside = S.aside.concat(K.v);
S.left -= K.v.length;
S.fd = null;
S.say = { p: p, t: "^" + p + " {keep|keeps} " + ltgFkSay(K.v) + " (" + ltgN(tot) + " this turn)." };
if (!S.left) {
S.left = 6;
S.aside = [];
S.say = { p: p, t: "Hot dice! Every die scored: #" + p + " {roll|rolls} all six again, with " + ltgN(tot) + " riding." };
}
roll();
}
S.mv++;
return true;
},
ai: ai,
over: function (names) { return S.fin ? { winners: S.fin.w.slice(), say: overSay(names) } : null; },
pause: function () { return ltgPause(S.ev); },
status: function (me, names) { return ltgStatus(S, me, names, doing() + (S.tp ? " (" + ltgN(S.tp) + " this turn)" : ""), scoreLine(me, names), S.fin ? overSay(names) : ""); },
text: function (me, names) {
var t = ["Farkle, playing to " + ltgN(S.to) + ".", "Score: " + S.score.map(function (v, p) { return ltgWho(p, me, names) + " " + ltgN(v) + (S.on[p] ? "" : " (not on the board yet)"); }).join(", ") + "."];
if (S.endBy >= 0)
t.push("Last round! " + ltgWho(S.endBy, me, names) + " reached " + ltgN(S.to) + "; everyone else has one turn to beat " + ltgN(S.score[S.endBy]) + ".");
if (!S.fin) {
t.push((S.turn === me ? "Your" : ltgWho(S.turn, me, names) + "'s") + " turn: " + ltgN(S.tp) + " set aside so far" + (S.aside.length ? " (" + S.aside.join(" ") + ")" : "") + ".");
if (S.phase === "pick")
t.push("On the table: " + S.dice.join("  ") + ".");
}
if (S.fd)
t.push("The farkled roll: " + S.fd.d.join("  ") + ".");
var nw = ltgNews(S.say, me, names);
if (nw)
t.push(nw);
t.push("Scoring: a 1 is 100, a 5 is 50, three of a kind is 100 times the number (three 1s are 1,000), each extra one doubles it more; a straight or three pairs is 1,500.");
t.push(S.fin ? "Game over. " + overSay(names) : S.turn === me ? "It's your turn: " + doing() + "." : ltgWho(S.turn, me, names) + " is rolling.");
return t.join("\n");
},
draw: function (x, W, H, me, names) {
var u = ui(), cx = W / 2, pw = (W - 16 - (n - 1) * 6) / n;
for (var p = 0; p < n; p++) {
var X = 8 + p * (pw + 6), act = S.turn === p && !S.fin, win = S.fin && S.fin.w.indexOf(p) >= 0;
llRound(x, X, 6, pw, 48, 8);
x.fillStyle = act ? "rgba(138,74,166,.85)" : "rgba(36,14,46,.7)";
x.fill();
x.strokeStyle = act || win ? LTG_C.rose : LTG_C.gold;
x.lineWidth = act || win ? 2.5 : 1;
x.stroke();
ltgT(x, (win ? "🌹 " : "") + ltgWho(p, me, names), X + pw / 2, 20, 12, act ? LTG_C.rose : LTG_C.sand, "center", true, pw - 8);
ltgT(x, ltgN(S.score[p]) + (S.on[p] ? "" : " · needs 500"), X + pw / 2, 40, S.on[p] ? 17 : 12, LTG_C.cream, "center", true, pw - 8);
}
var y = 72;
if (S.endBy >= 0 && !S.fin) {
ltgT(x, "Last round! Beat " + ltgN(S.score[S.endBy]) + ".", cx, y, 13, LTG_C.rose, "center", true, W - 16);
y += 20;
}
ltgT(x, "1 = 100 · 5 = 50 · three alike = 100 × the number (1s: 1,000) · straight or three pairs = 1,500", cx, H - 12, W < 500 ? 9 : 11, LTG_C.sand, "center", false, W - 12);
if (S.fin) {
ltgResult(x, W, y, H - 60, "Game over", [overSay(names), scoreLine(me, names)], S, me, names);
return;
}
var ds = Math.max(40, Math.min(72, (W - 40) / 6.8, H / 7.5)), my2 = Math.max(y + 70, H * 0.42), sm = Math.max(20, ds * 0.45);
ltgT(x, (S.turn === me ? "Your turn" : ltgWho(S.turn, me, names) + "'s turn") + " · this turn: " + ltgN(S.tp), cx, y + 6, 14, LTG_C.cream, "center", true, W - 16);
if (S.aside.length) {
var ax = cx - (S.aside.length * (sm + 5) - 5) / 2;
ltgT(x, "set aside", cx, y + 24, 10, LTG_C.sand, "center");
S.aside.forEach(function (v, i) { ltgDie(x, v, ax + i * (sm + 5), y + 32, sm, { dim: true }); });
}
var D = S.ev === "farkle" && S.fd ? S.fd.d : S.dice, mineNow = S.turn === me && S.phase === "pick", dx = cx - (D.length * (ds + 10) - 10) / 2;
D.forEach(function (v, i) {
var sel = mineNow && u.sel.indexOf(i) >= 0, X = dx + i * (ds + 10), Y = my2 - (sel ? 14 : 0);
ltgDie(x, v, X, Y, ds, { sel: sel, dim: S.ev === "farkle" });
if (mineNow)
llHit(X, my2 - 14, ds, ds + 14, { die: i });
});
if (S.ev === "farkle" && S.fd)
ltgT(x, "Farkle!", cx, my2 + ds + 26, 26, LTG_C.pink, "center", true);
var by = my2 + ds + (S.ev === "farkle" ? 50 : 20), bw = Math.min(200, (W - 30) / 2);
var nw = ltgNews(S.say, me, names);
if (nw)
ltgPara(x, nw, cx, Math.min(H - 50, by + (mineNow || S.turn === me ? 90 : 10)), W - 24, 13, LTG_C.rose);
if (S.turn !== me)
return;
if (S.phase === "roll") {
ltgBtn(x, cx - bw / 2, by, bw, 40, "Roll six dice", { m: { k: "roll", keep: [] } }, true);
return;
}
var k = selKeep(), K = k.length ? keepOf(k) : null, left = K ? S.left - k.length : 0, tot = K ? S.tp + K.pts : 0, canBank = K && (S.on[me] || tot >= 500);
ltgT(x, !k.length ? "Tap the dice you'd like to keep (they must all score)" : K ? "Keeping " + ltgFkSay(K.v) + ": " + ltgN(K.pts) + (canBank || S.on[me] ? "" : " · you need 500 to bank your first score") : "Those dice don't all score", cx, by, 12, K ? LTG_C.cream : LTG_C.sand, "center", !!K, W - 16);
ltgBtn(x, cx - bw - 6, by + 16, bw, 38, K ? (left ? "Roll " + left + (left > 1 ? " dice" : " die") : "Hot dice! Roll all six") : "Roll the rest", K ? { m: { k: "roll", keep: k } } : null, !!K);
ltgBtn(x, cx + 6, by + 16, bw, 38, canBank ? "Bank " + ltgN(tot) : "Bank", canBank ? { m: { k: "bank", keep: k } } : null, false);
ltgBtn(x, cx - bw / 2, by + 60, bw, 30, "Help me choose", { ui: "help" });
},
tap: function (px, py, me) {
var h = llHitAt(px, py);
if (!h || h.m || S.turn !== me || S.phase !== "pick")
return false;
var u = ui();
if (h.die !== undefined) {
var i = u.sel.indexOf(h.die);
if (i >= 0)
u.sel.splice(i, 1);
else
u.sel.push(h.die);
return true;
}
if (h.ui === "help") {
var m = ai(me);
if (m)
u.sel = m.keep.slice();
return true;
}
return false;
}
};
S.ev = "";
return E;
},
function () {
return llCanvasTex("grass", 256, function (x, W, H) {
x.fillStyle = "#5E8A4E";
x.fillRect(0, 0, W, H);
var R = wRand(61);
for (var i = 0; i < 2600; i++) {
var g = 90 + R() * 70 | 0;
x.fillStyle = "rgba(" + (60 + R() * 40 | 0) + "," + g + "," + (50 + R() * 30 | 0) + ",.55)";
x.fillRect(R() * W, R() * H, 1, 2 + R() * 3);
}
x.fillStyle = "rgba(120,150,90,.18)";
for (var s = 0; s < 4; s++)
x.fillRect(0, s * 64, W, 32);
});
},
function () {
return llCanvasTex("trav", 256, function (x, W, H) {
x.fillStyle = "#E2D6C6";
x.fillRect(0, 0, W, H);
var R = wRand(63);
for (var j = 0; j < 4; j++)
for (var i = 0; i < 2; i++) {
var X = i * 128 + (j % 2) * 64, Y = j * 64;
x.fillStyle = "rgba(" + (220 + R() * 20 | 0) + "," + (206 + R() * 20 | 0) + "," + (186 + R() * 20 | 0) + ",1)";
x.fillRect(X + 2, Y + 2, 124, 60);
x.fillRect(X + 2 - 256, Y + 2, 124, 60);
}
for (var k = 0; k < 500; k++) {
x.fillStyle = "rgba(150,130,110,.18)";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1);
}
});
},
function () {
return llCanvasTex("pooltile", 128, function (x, W, H) {
x.fillStyle = "#5AB0C8";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(230,250,255,.35)";
x.lineWidth = 1.5;
for (var i = 0; i <= 8; i++) {
x.beginPath();
x.moveTo(i * 16, 0);
x.lineTo(i * 16, H);
x.stroke();
x.beginPath();
x.moveTo(0, i * 16);
x.lineTo(W, i * 16);
x.stroke();
}
});
},
function () {
return llCanvasTex("stonewall", 256, function (x, W, H) {
x.fillStyle = "#C8B8A8";
x.fillRect(0, 0, W, H);
var R = wRand(65);
for (var j = 0; j < 8; j++)
for (var i = 0; i < 5; i++) {
var X = i * 56 + (j % 2) * 28 - 28, c = 180 + R() * 30 | 0;
x.fillStyle = "rgb(" + c + "," + (c - 12) + "," + (c - 26) + ")";
x.fillRect(X + 2, j * 32 + 2, 52, 28);
}
x.fillStyle = "rgba(60,100,50,.55)";
for (var k = 0; k < 160; k++) {
var vx = (k * 37) % W, vy = H - ((k * 13) % 120);
x.beginPath();
x.arc(vx + R() * 6, vy, 3 + R() * 4, 0, 7);
x.fill();
}
});
},
function () {
return llCanvasTex("ripple", 256, function (x, W, H) {
x.fillStyle = "#6EC0D4";
x.fillRect(0, 0, W, H);
var R = wRand(66);
for (var i = 0; i < 70; i++) {
x.strokeStyle = "rgba(235,250,255," + (0.12 + R() * 0.18) + ")";
x.lineWidth = 1 + R() * 2;
var cx = R() * W, cy = R() * H, r = 8 + R() * 26;
x.beginPath();
x.ellipse(cx, cy, r, r * 0.35, 0, 0, 6.283);
x.stroke();
}
});
},
function () {
return llCanvasTex("lake", 256, function (x, W, H) {
x.fillStyle = "#4E7A8E";
x.fillRect(0, 0, W, H);
var R = wRand(67);
for (var i = 0; i < 60; i++) {
x.strokeStyle = "rgba(210,230,240," + (0.08 + R() * 0.14) + ")";
x.lineWidth = 1 + R() * 1.5;
var cx = R() * W, cy = R() * H, r = 10 + R() * 30;
x.beginPath();
x.ellipse(cx, cy, r, r * 0.3, 0, 0, 6.283);
x.stroke();
}
});
},
function (G, x, z, kind, s) {
s = s || 1;
var g = llPiece(G, x, z, 0), bark = llM(0x6A4E36), leaf = llM(0x3E6E40), leaf2 = llM(0x4E7E46);
if (kind === "palm") {
var h = 5.5 * s;
for (var i = 0; i < 5; i++) {
var seg = llCyl(0.16 * s, 0.2 * s, h / 5, bark, Math.sin(i * 0.5) * 0.12 * s, h / 10 + i * h / 5, 0, g, 6);
seg.rotation.z = 0.05 * i;
}
for (var f = 0; f < (LL.lite ? 5 : 9); f++) {
var a = f / 9 * 6.283, l = llBox(0.35 * s, 0.03, 2.6 * s, leaf, Math.cos(a) * 1.1 * s, h + 0.1, Math.sin(a) * 1.1 * s, g);
l.rotation.y = -a + Math.PI / 2;
l.rotation.x = 0.45;
}
llSph(0.3 * s, llM(0x5A4A2A), 0, h - 0.1, 0, g, 6);
llSolidR(x, z, 0.35 * s, 4);
}
else if (kind === "cypress") {
llCyl(0.12 * s, 0.15 * s, 0.8 * s, bark, 0, 0.4 * s, 0, g, 6);
var c = llCyl(0.05 * s, 0.75 * s, 5 * s, leaf, 0, 3.2 * s, 0, g, 10);
llSolidR(x, z, 0.6 * s, 4);
}
else if (kind === "blossom") {
llCyl(0.18 * s, 0.24 * s, 2.4 * s, bark, 0, 1.2 * s, 0, g, 7);
[[0, 3.2, 0, 1.5], [0.9, 2.8, 0.3, 1.1], [-0.8, 2.9, -0.4, 1.1], [0.2, 2.7, -0.9, 1.0], [-0.3, 3.0, 0.9, 1.0]].forEach(function (b, i) { llSph(b[3] * s, llM(i % 2 ? 0xE8B8CC : 0xF0CCDA), b[0] * s, b[1] * s, b[2] * s, g, LL.lite ? 6 : 9); });
llSolidR(x, z, 0.35 * s, 3);
}
else {
llCyl(0.2 * s, 0.28 * s, 2.6 * s, bark, 0, 1.3 * s, 0, g, 7);
[[0, 3.6, 0, 1.7], [1.0, 3.1, 0.4, 1.2], [-0.9, 3.2, -0.5, 1.3], [0.3, 3.0, -1.0, 1.1]].forEach(function (b, i) { llSph(b[3] * s, i % 2 ? leaf2 : leaf, b[0] * s, b[1] * s, b[2] * s, g, LL.lite ? 6 : 9); });
llSolidR(x, z, 0.4 * s, 3);
}
return g;
},
function (G, x, z, kind, s) {
s = s || 1;
var g = llPiece(G, x, z, 0), yew = llM(0x2E5A34, { map: "hedge" }), st = llM(0xD8CCBE, { map: "stonewall" });
llBox(1.1 * s, 0.7 * s, 1.1 * s, st, 0, 0.35 * s, 0, g);
llBox(1.2 * s, 0.08 * s, 1.2 * s, llM(0xC8BCAE), 0, 0.72 * s, 0, g);
if (kind === "cone")
llCyl(0.04 * s, 0.6 * s, 2.2 * s, yew, 0, 1.85 * s, 0, g, 10);
else if (kind === "ball")
llSph(0.7 * s, yew, 0, 1.4 * s, 0, g, 10);
else {
llCyl(0.05 * s, 0.05 * s, 1.1 * s, llM(0x5A4030), 0, 1.25 * s, 0, g, 5);
llSph(0.55 * s, yew, 0, 2.1 * s, 0, g, 10);
llSph(0.32 * s, yew, 0, 2.85 * s, 0, g, 8);
}
llSolidR(x, z, 0.62 * s, 2.5);
return g;
},
function (G, x, z, w, d, seed) {
var R = wRand(seed || llHash("rb" + x + z)), soil = llM(0x4A3626), leaf = llM(0x3A5E36), cols = [LLC.pink, LLC.rose, 0xE8C8D8, 0xC83A5A, 0xF0D8C0];
llBox(w, 0.12, d, soil, x, 0.06, z, G);
llBox(w + 0.3, 0.45, 0.3, llM(0x3A6A3C, { map: "hedge" }), x, 0.22, z - d / 2, G);
llBox(w + 0.3, 0.45, 0.3, llM(0x3A6A3C, { map: "hedge" }), x, 0.22, z + d / 2, G);
llBox(0.3, 0.45, d, llM(0x3A6A3C, { map: "hedge" }), x - w / 2, 0.22, z, G);
llBox(0.3, 0.45, d, llM(0x3A6A3C, { map: "hedge" }), x + w / 2, 0.22, z, G);
var n = Math.floor(w * d / (LL.lite ? 3.2 : 1.4));
for (var i = 0; i < n; i++) {
var px = x + (R() - 0.5) * (w - 0.8), pz = z + (R() - 0.5) * (d - 0.8);
llSph(0.32, leaf, px, 0.45, pz, G, 6);
llSph(0.12, llM(cols[i % cols.length]), px + 0.12, 0.72, pz, G, 5);
if (!LL.lite)
llSph(0.1, llM(cols[(i + 2) % cols.length]), px - 0.14, 0.68, pz + 0.1, G, 5);
}
llSolid(x, z, w / 2 + 0.15, d / 2 + 0.15, 0, 0.6);
},
function (G, x, z, ry, w) {
w = w || 3;
var g = llPiece(G, x, z, ry), iron = llM(0x2A2230);
[-w / 2, w / 2].forEach(function (dx) { llCyl(0.05, 0.05, 2.6, iron, dx, 1.3, 0, g, 5); llPS(x + Math.cos(ry) * dx, z - Math.sin(ry) * dx, 0.12, 0.12, ry, 2.6); });
var arc = wMesh(new THREE.TorusGeometry(w / 2, 0.05, 5, 16, Math.PI), iron, 0, 2.6, 0, g);
for (var i = 0; i < (LL.lite ? 6 : 14); i++) {
var a = i / 13 * Math.PI;
llSph(0.16, llM(i % 2 ? LLC.pink : 0x3A5E36), Math.cos(a) * w / 2, 2.6 + Math.sin(a) * w / 2, 0, g, 6);
}
for (var k = 0; k < (LL.lite ? 3 : 6); k++) {
llSph(0.18, llM(k % 2 ? LLC.rose : 0x3A5E36), -w / 2, 0.6 + k * 0.35, 0.05, g, 6);
llSph(0.18, llM(k % 2 ? 0x3A5E36 : LLC.pink), w / 2, 0.6 + k * 0.35, -0.05, g, 6);
}
return g;
},
function (G, x, z, ry) {
var g = llPiece(G, x, z, ry), wd = llM(0xA87850, { map: "deck" }), ir = llM(0xE6E0E6);
for (var i = 0; i < 3; i++)
llBox(1.8, 0.04, 0.12, wd, 0, 0.45, -0.18 + i * 0.17, g);
for (var j = 0; j < 3; j++)
llBox(1.8, 0.1, 0.03, wd, 0, 0.62 + j * 0.15, -0.3, g);
[-0.8, 0.8].forEach(function (dx) { llBox(0.05, 0.45, 0.5, ir, dx, 0.22, 0, g); llBox(0.05, 0.5, 0.05, ir, dx, 0.7, -0.3, g); llBox(0.05, 0.05, 0.5, ir, dx, 0.65, 0, g); });
llPS(x, z, 0.92, 0.32, ry, 0.9);
return g;
},
function (G, x, z, h) {
h = h || 3;
var g = llPiece(G, x, z, 0), ir = llM(0x2A2230);
llCyl(0.06, 0.08, h, ir, 0, h / 2, 0, g, 6);
llBox(0.32, 0.42, 0.32, llM(0xF0E0C8, { e: 0x5A4630 }), 0, h + 0.2, 0, g);
llCyl(0.02, 0.26, 0.18, ir, 0, h + 0.5, 0, g, 4);
var gl = wGlow(0xFFE4C0, 1.6, 0.32);
gl.position.set(x, h + 0.2, z);
G.add(llKeep(gl));
llSolidR(x, z, 0.15, h);
return g;
},
function (G, x, z, s) {
s = s || 1;
var g = llPiece(G, x, z, 0), st = llM(0xD8CCBE, { map: "marble" });
llBox(0.6 * s, 0.5 * s, 0.6 * s, st, 0, 0.25 * s, 0, g);
llCyl(0.42 * s, 0.2 * s, 0.6 * s, st, 0, 0.8 * s, 0, g, 12);
llCyl(0.45 * s, 0.45 * s, 0.06 * s, st, 0, 1.1 * s, 0, g, 12);
for (var i = 0; i < (LL.lite ? 4 : 9); i++) {
var a = i / 9 * 6.283;
llSph(0.13 * s, llM([LLC.pink, 0xE8D8E0, LLC.lilac][i % 3]), Math.cos(a) * 0.25 * s, 1.25 * s, Math.sin(a) * 0.25 * s, g, 6);
}
llSph(0.26 * s, llM(0x3A5E36), 0, 1.2 * s, 0, g, 7);
llSolidR(x, z, 0.4 * s, 1.2);
return g;
},
function (G, x, z, ry, s) {
s = s || 1;
var g = llPiece(G, x, z, ry), mb = llM(0xE6E0DC, { map: "marble" });
llBox(1.4 * s, 1.2 * s, 1.4 * s, mb, 0, 0.6 * s, 0, g);
llBox(1.6 * s, 0.12 * s, 1.6 * s, llM(0xD0C4C0), 0, 1.22 * s, 0, g);
llCyl(0.28 * s, 0.5 * s, 1.4 * s, mb, 0, 2.0 * s, 0, g, 10);
llCyl(0.18 * s, 0.26 * s, 0.6 * s, mb, 0, 3.0 * s, 0, g, 10);
llSph(0.17 * s, mb, 0, 3.48 * s, 0, g, 10);
var arm = llCyl(0.06 * s, 0.06 * s, 0.6 * s, mb, 0.25 * s, 2.7 * s, 0.15 * s, g, 5);
arm.rotation.z = 0.9;
llCyl(0.2 * s, 0.14 * s, 0.18 * s, mb, 0.5 * s, 2.5 * s, 0.2 * s, g, 10);
for (var i = 0; i < 5; i++)
llSph(0.05 * s, llM(LLC.pink), 0.45 * s + (i % 3) * 0.05 * s, 2.62 * s, 0.15 * s + (i % 2) * 0.08 * s, g, 5);
llSolidR(x, z, 0.85 * s, 2.4);
return g;
},
function (G, x, z, ry, col) {
var g = llPiece(G, x, z, ry), fr = llM(0xE8E2DA), cu = llM(col || LLC.blush);
llBox(0.7, 0.08, 1.9, fr, 0, 0.32, 0, g);
llBox(0.62, 0.08, 1.3, cu, 0, 0.4, 0.25, g);
var b = llBox(0.62, 0.08, 0.75, cu, 0, 0.62, -0.62, g);
b.rotation.x = -0.75;
[[-0.3, -0.85], [0.3, -0.85], [-0.3, 0.85], [0.3, 0.85]].forEach(function (p) { llBox(0.05, 0.3, 0.05, fr, p[0], 0.15, p[1], g); });
if (!LL.lite)
llBox(0.5, 0.03, 0.4, llM(0xF0EAE4), 0, 0.46, 0.6, g);
llPS(x, z, 0.36, 0.98, ry, 0.6);
return g;
},
function (G, x, z, ry, no) {
var g = llPiece(G, x, z, ry), post = llM(0xE8E2DA), drape = llM(0xF0E4EA, { op: 0.85, ds: true });
[[-1.8, -1.6], [1.8, -1.6], [-1.8, 1.6], [1.8, 1.6]].forEach(function (p) { llCyl(0.07, 0.07, 3, post, p[0], 1.5, p[1], g, 6); });
llBox(3.9, 0.12, 3.5, llM(0xF0E4EA, { map: "stripe" }), 0, 3.05, 0, g);
llBox(4.0, 0.35, 0.06, llM(LLC.rose), 0, 2.85, 1.78, g);
llBox(0.06, 2.6, 1.2, drape, -1.85, 1.6, 1.0, g);
llBox(0.06, 2.6, 1.2, drape, 1.85, 1.6, 1.0, g);
llBox(3.7, 2.6, 0.06, drape, 0, 1.6, -1.65, g);
llBox(2.6, 0.4, 1.9, llM(0xE8E2DA), 0, 0.25, -0.3, g);
llBox(2.5, 0.16, 1.8, llM(LLC.blush), 0, 0.53, -0.3, g);
for (var i = 0; i < (LL.lite ? 2 : 4); i++)
llBox(0.5, 0.42, 0.14, llM(i % 2 ? LLC.pink : LLC.lilac), -0.9 + i * 0.6, 0.82, -1.1, g);
llBox(0.7, 0.45, 0.5, llM(0xA87850, { map: "deck" }), 0, 0.22, 1.1, g);
llSign(g, ["CABANA " + no], 1.4, 0.36, 0, 2.6, 1.82, 0, "#6A3482", "#F4E8D0");
llPS(x + Math.sin(ry) * -0.3, z + Math.cos(ry) * -0.3, 1.4, 1.05, ry, 0.8);
[[-1.8, -1.6], [1.8, -1.6], [-1.8, 1.6], [1.8, 1.6]].forEach(function (p) { var c = Math.cos(ry), s = Math.sin(ry); llSolidR(x + p[0] * c + p[1] * s, z - p[0] * s + p[1] * c, 0.12, 3); });
return g;
},
function (G, x, z, ry) {
var g = llPiece(G, x, z, ry), w = llM(0xF0ECE8);
[[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]].forEach(function (p) { var l = llBox(0.08, 2.4, 0.08, w, p[0] * 0.8, 1.2, p[1] * 0.8, g); });
llBox(0.9, 0.08, 0.7, w, 0, 2.4, 0, g);
llBox(0.9, 0.7, 0.06, w, 0, 2.8, -0.35, g);
for (var r = 0; r < 4; r++)
llBox(0.7, 0.04, 0.06, w, 0, 0.4 + r * 0.5, 0.45, g);
llBox(1.2, 0.08, 1.0, llM(0xC83A4A), 0, 3.6, 0, g);
llCyl(0.02, 0.02, 1.0, w, 0, 3.1, 0, g, 4);
llPS(x, z, 0.6, 0.6, ry, 3);
return g;
},
function (x, z) {
var P = LL.pools;
if (!P || !P.length)
return null;
for (var i = 0; i < P.length; i++) {
var p = P[i], inside = false;
if (p.kind === "se")
inside = llSE(p.cx, p.cz, p.rx, p.rz, p.p, x, z) < 1;
else if (p.kind === "rect")
inside = x > p.x0 && x < p.x1 && z > p.z0 && z < p.z1;
else
inside = Math.hypot(x - p.cx, z - p.cz) < p.r;
if (!inside)
continue;
var y = -p.deep;
if (p.slope) {
var s = p.slope, f = s.axis === "x" ? (x - s.from) / (s.to - s.from) : (z - s.from) / (s.to - s.from);
if (f < 1)
y = -p.deep * Math.max(0, f);
}
return (p.y0 || 0) + y;
}
return null;
},
function (G, o) {
var pts, deep = o.deep || 1.3, y0 = o.y0 || 0;
if (o.kind === "se")
pts = llSEShape(o.cx, o.cz, o.rx, o.rz, o.p || 4, o.n || 64);
else if (o.kind === "rect")
pts = [[o.x0, o.z0], [o.x1, o.z0], [o.x1, o.z1], [o.x0, o.z1]];
else {
pts = [];
for (var i = 0; i < (o.n || 28); i++) {
var a = i / (o.n || 28) * 6.283;
pts.push([o.cx + Math.cos(a) * o.r, o.cz + Math.sin(a) * o.r]);
}
}
LL.holes.push(pts);
LL.pools.push({ kind: o.kind, cx: o.cx, cz: o.cz, rx: o.rx, rz: o.rz, p: o.p || 4, x0: o.x0, x1: o.x1, z0: o.z0, z1: o.z1, r: o.r, deep: deep - 0.1, slope: o.slope, y0: y0, name: o.name });
var pos = [], uv = [], n = pts.length, L = 0;
for (var k = 0; k < n; k++) {
var a2 = pts[k], b = pts[(k + 1) % n], seg = Math.hypot(b[0] - a2[0], b[1] - a2[1]);
pos.push(a2[0], y0 + 0.02, a2[1], b[0], y0 + 0.02, b[1], b[0], y0 - deep, b[1], a2[0], y0 + 0.02, a2[1], b[0], y0 - deep, b[1], a2[0], y0 - deep, a2[1]);
uv.push(L / 2, deep / 2, (L + seg) / 2, deep / 2, (L + seg) / 2, 0, L / 2, deep / 2, (L + seg) / 2, 0, L / 2, 0);
L += seg;
}
var gs = new THREE.BufferGeometry();
gs.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
gs.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
gs.computeVertexNormals();
var tileM = llM(0xD8F0F4, { map: "pooltile", ds: true });
wMesh(gs, tileM, 0, 0, 0, G);
var sh = new THREE.Shape();
sh.moveTo(pts[0][0], -pts[0][1]);
for (var j = 1; j < n; j++)
sh.lineTo(pts[j][0], -pts[j][1]);
sh.closePath();
var fg = new THREE.ShapeGeometry(sh);
var uvf = fg.attributes.uv;
for (var q = 0; q < uvf.count; q++)
uvf.setXY(q, uvf.getX(q) / 2, uvf.getY(q) / 2);
var fl = wMesh(fg, llM(0xC8E8F0, { map: "pooltile" }), 0, y0 - deep + 0.01, 0, G);
fl.rotation.x = -Math.PI / 2;
var wm = new THREE.MeshLambertMaterial({ color: o.col || 0x8ED0E0, map: LL_TEX.ripple().clone(), transparent: true, opacity: o.op || 0.62, depthWrite: false, side: THREE.DoubleSide, emissive: new THREE.Color(0x0E2A34) });
wm.map.wrapS = wm.map.wrapT = THREE.RepeatWrapping;
wm.map.needsUpdate = true;
wm.map.repeat.set(1 / 6, 1 / 6);
var wg = new THREE.ShapeGeometry(sh);
var uvw = wg.attributes.uv;
for (var r = 0; r < uvw.count; r++)
uvw.setXY(r, uvw.getX(r), uvw.getY(r));
var water = wMesh(wg, wm, 0, y0 - 0.16, 0, G);
water.rotation.x = -Math.PI / 2;
llKeep(water);
LL.ripples = LL.ripples || [];
LL.ripples.push({ m: water, sp: o.sp || 0.012 });
var cp = llM(0xEAE2D6, { map: "trav" });
for (var c = 0; c < n; c++) {
var p0 = pts[c], p1 = pts[(c + 1) % n], mx = (p0[0] + p1[0]) / 2, mz = (p0[1] + p1[1]) / 2, len = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
var nx = (p1[1] - p0[1]) / len, nz = -(p1[0] - p0[0]) / len;
var bx = llBox(len + 0.12, 0.08, 0.55, cp, mx + nx * 0.27 * (o.out || 1), y0 + 0.04, mz + nz * 0.27 * (o.out || 1), G);
bx.rotation.y = -Math.atan2(p1[1] - p0[1], p1[0] - p0[0]);
}
return water;
},
function (G, o) {
LL.lakes.push({ cx: o.cx, cz: o.cz, rx: o.rx, rz: o.rz, ok: o.ok || [] });
var hp = [];
for (var h = 0; h < 48; h++) {
var ha = h / 48 * 6.283;
hp.push([o.cx + Math.cos(ha) * o.rx, o.cz + Math.sin(ha) * o.rz]);
}
LL.holes.push(hp);
var g = new THREE.CircleGeometry(1, LL.lite ? 28 : 48);
var wm = new THREE.MeshLambertMaterial({ color: 0x8EB8C8, map: LL_TEX.lake().clone(), transparent: true, opacity: 0.85, depthWrite: false, emissive: new THREE.Color(0x0A1A24) });
wm.map.wrapS = wm.map.wrapT = THREE.RepeatWrapping;
wm.map.repeat.set(3, 4);
wm.map.needsUpdate = true;
var w = wMesh(g, wm, o.cx, -0.25, o.cz, G);
w.rotation.x = -Math.PI / 2;
w.scale.set(o.rx, o.rz, 1);
llKeep(w);
LL.ripples.push({ m: w, sp: 0.006 });
var bed = wMesh(new THREE.CircleGeometry(1, LL.lite ? 28 : 48), llM(0x3A5A4A), o.cx, -0.9, o.cz, G);
bed.rotation.x = -Math.PI / 2;
bed.scale.set(o.rx, o.rz, 1);
var n = LL.lite ? 24 : 44;
for (var i = 0; i < n; i++) {
var a = i / n * 6.283, x = o.cx + Math.cos(a) * o.rx, z = o.cz + Math.sin(a) * o.rz;
if ((o.ok || []).some(function (k) { return k.r === undefined && x > k.x0 - 1.2 && x < k.x1 + 1.2 && z > k.z0 - 1.2 && z < k.z1 + 1.2; }))
continue;
var st = llBox(1.6, 0.35, 0.7, llM(0xB8AC9C, { map: "stonewall" }), x, 0.05, z, G);
st.rotation.y = -a + Math.PI / 2;
if (!LL.lite && i % 3 === 0)
for (var r = 0; r < 4; r++)
llCyl(0.02, 0.02, 1.1, llM(0x6A8A4A), x + Math.cos(a) * 0.6 + (r - 1.5) * 0.15, 0.55, z + Math.sin(a) * 0.6, G, 3);
}
return w;
},
function (x, z) {
var K = LL.lakes;
if (!K || !K.length)
return false;
for (var i = 0; i < K.length; i++) {
var k = K[i], dx = (x - k.cx) / (k.rx - 0.6), dz = (z - k.cz) / (k.rz - 0.6);
if (dx * dx + dz * dz >= 1)
continue;
for (var j = 0; j < k.ok.length; j++) {
var o = k.ok[j];
if (o.r !== undefined ? Math.hypot(x - o.x, z - o.z) < o.r : (x > o.x0 && x < o.x1 && z > o.z0 && z < o.z1))
return false;
}
return true;
}
return false;
},
function (G, x, z, ry) {
var g = new THREE.Group();
g.position.set(x, -0.2, z);
g.rotation.y = ry || 0;
G.add(llKeep(g));
var wh = llM(0xF4F0F0), gd = llGold();
var hull = llSph(1, wh, 0, 0.35, 0, g, 12);
hull.scale.set(1.0, 0.45, 1.9);
llCyl(0.12, 0.16, 1.3, wh, 0, 1.0, -1.5, g, 8).rotation.x = 0.25;
llSph(0.2, wh, 0, 1.65, -1.7, g, 8);
var bk = llCyl(0.01, 0.07, 0.25, llM(0xE89A3A), 0, 1.62, -1.93, g, 6);
bk.rotation.x = -Math.PI / 2;
[-1, 1].forEach(function (sd) { var w = llSph(0.6, wh, sd * 0.75, 0.75, 0.4, g, 8); w.scale.set(0.25, 0.55, 1.2); });
llBox(1.2, 0.12, 0.5, llM(LLC.velvet), 0, 0.72, 0.5, g);
llBox(1.2, 0.5, 0.1, llM(LLC.velvet), 0, 0.95, 0.8, g);
llBox(1.25, 0.05, 0.12, gd, 0, 1.2, 0.8, g);
return g;
},
function () {
(LL.floorsLater || []).forEach(function (F) {
var sh = new THREE.Shape();
sh.moveTo(F.x0, -F.z0);
sh.lineTo(F.x1, -F.z0);
sh.lineTo(F.x1, -F.z1);
sh.lineTo(F.x0, -F.z1);
sh.closePath();
(LL.holes || []).forEach(function (H) {
if (!H.every(function (p) { return p[0] > F.x0 && p[0] < F.x1 && p[1] > F.z0 && p[1] < F.z1; }))
return;
var ph = new THREE.Path();
ph.moveTo(H[0][0], -H[0][1]);
for (var i = 1; i < H.length; i++)
ph.lineTo(H[i][0], -H[i][1]);
ph.closePath();
sh.holes.push(ph);
});
var g = new THREE.ShapeGeometry(sh), uv = g.attributes.uv;
for (var k = 0; k < uv.count; k++)
uv.setXY(k, uv.getX(k) / F.t, uv.getY(k) / F.t);
var m = wMesh(g, F.mat, 0, F.y, 0, F.G);
m.rotation.x = -Math.PI / 2;
});
LL.floorsLater = [];
},
function (dt, t) {
var R = LL.ripples || [];
for (var i = 0; i < R.length; i++) {
var m = R[i].m.material.map;
if (m) {
m.offset.x = (t * R[i].sp) % 1;
m.offset.y = (t * R[i].sp * 0.6) % 1;
}
}
var S = LL.spin;
for (var j = 0; j < S.length; j++) {
var s = S[j];
if (!s.swan)
continue;
var a = t * s.sp + s.ph;
s.swan.position.set(s.cx + Math.cos(a) * s.rx, -0.2, s.cz + Math.sin(a) * s.rz);
s.swan.rotation.y = -a + Math.PI;
}
if (typeof llSwanRideTick === "function")
llSwanRideTick(dt);
},
function (G, z, x0, x1, h, gaps, side) {
var st = llM(0xEDE4D8, { map: "trav" }), gd = llGold(), cuts = (gaps || []).map(function (g) { return [g[0] - g[1] / 2 - 0.2, g[0] + g[1] / 2 + 0.2]; }).sort(function (a, b) { return a[0] - b[0]; });
var segs = [], at = x0;
cuts.forEach(function (c) { if (c[0] > at)
segs.push([at, c[0]]); at = Math.max(at, c[1]); });
if (at < x1)
segs.push([at, x1]);
var oz = z + side * 0.2;
segs.forEach(function (s) {
var L = s[1] - s[0], m = (s[0] + s[1]) / 2;
if (L < 0.1)
return;
llTBox(L, h, 0.08, st, m, h / 2, oz, G, 4);
for (var wx = s[0] + 3; wx < s[1] - 2.5; wx += 6) {
var w = llBox(1.8, Math.min(3.4, h - 2.2), 0.06, llM(0xF2E2C8, { e: 0x6A5038 }), wx, 1.2 + Math.min(3.4, h - 2.2) / 2, oz + side * 0.05, G);
llBox(2.1, 0.14, 0.2, st, wx, 1.1, oz + side * 0.1, G);
llBox(2.1, 0.18, 0.12, gd, wx, 1.3 + Math.min(3.4, h - 2.2), oz + side * 0.08, G);
}
});
cuts.forEach(function (c) {
var L = c[1] - c[0], m = (c[0] + c[1]) / 2;
if (h > 4.6)
llTBox(L, h - 4.4, 0.08, st, m, 4.4 + (h - 4.4) / 2, oz, G, 4);
llBox(L + 0.6, 0.3, 0.3, gd, m, 4.45, oz + side * 0.1, G);
llBox(0.3, 4.4, 0.3, st, c[0] - 0.15, 2.2, oz + side * 0.1, G);
llBox(0.3, 4.4, 0.3, st, c[1] + 0.15, 2.2, oz + side * 0.1, G);
});
llBox(x1 - x0, 0.35, 0.5, st, (x0 + x1) / 2, h - 0.18, oz + side * 0.2, G);
llBox(x1 - x0, 0.12, 0.55, gd, (x0 + x1) / 2, h - 0.4, oz + side * 0.22, G);
},
function (G) {
var mPink = llM(0xC88AAE, { map: "pinkdamask" }), mWall = llM(0xE8DCEC, { map: "damask" }), mMarble = llM(0xD2C6CE, { map: "marble" }), mCarpet = llM(0xE8DCEC, { map: "carpet" }), mRose = llM(0xF0E0EA, { map: "rosecarpet" }), mParq = llM(0xF0E4DC, { map: "parquet" }), mTile = llM(0xD4C8D0, { map: "tile" }), mStaffWall = llM(0xB8A8C0), mStaffFloor = llM(0x8A7A8A), gold = llGold();
llHotelLobby(G, { mPink: mPink, mWall: mWall, mMarble: mMarble, gold: gold });
llBackOfHouse(G, { mStaffWall: mStaffWall, mStaffFloor: mStaffFloor, mTile: mTile });
llMagnolia(G, { mWall: mWall, mPink: mPink, mCarpet: mCarpet, mTile: mTile, mStaffWall: mStaffWall, gold: gold });
llBallroom(G, { mWall: mWall, mParq: mParq, mMarble: mMarble, gold: gold });
llGardens(G);
llPoolTerrace(G);
llPavilion(G, { mWall: mWall, mParq: mParq, gold: gold });
llSpa(G, { mPink: mPink, mMarble: mMarble, mTile: mTile, gold: gold });
var FW = llWing(G, "facade", -80, 250, 108, 112);
llFacade(FW, 110, -80, 4, 4.6, [], 1);
llFacade(FW, 110, 4, 80, 10, [[30, 6], [70, 6]], 1);
llFacade(FW, 110, 80, 150, 7, [[115, 6]], 1);
llFacade(FW, 110, 150, 190, 4.6, [], 1);
llFacade(FW, 110, 190, 250, 10, [[220, 6]], 1);
llFacade(FW, 230, 60, 130, 7, [[95, 5]], -1);
llFacade(FW, 230, 130, 250, 5, [[145, 5]], -1);
llFloorsLater();
},
function (G, M) {
var L = llWing(G, "lobby", 4, 80, 65, 110);
llUpper(L, 4, 65.3, 80, 65.3, 4.95, 10, M.mPink);
llRoom(L, 4, 80, 65, 110, { name: "the Hotel Lobby", h: 10, wall: M.mPink, floor: M.mMarble, ftile: 2.5,
gaps: [{ s: "n", c: 10, w: 3.6, h: 4.2 }, { s: "w", c: 72, w: 2.4 }, { s: "e", c: 88, w: 5, h: 4.4 }, { s: "s", c: 30, w: 6, h: 4.4 }, { s: "s", c: 70, w: 6, h: 4.4 }], skip: ["n"], hemi: 1.25 });
llPlace("hotel", 42, 90, "The Hotel Lobby: reception and the lifts");
llPlace("liftsup", 7, 88, "The lifts, up to the rooms");
llSign(L, ["THE HOTEL", "GiGi's Lounge · Hotel & Resort"], 6, 1.4, 42, 7.6, 65.4, 0, "#3A1A4A", "#E8CFA0");
llCounter(L, 54, 71.2, 16, 0, { col: LLC.cream, panel: LLC.blush, top: 0xD8CCD4 });
for (var c = 0; c < 10; c++)
for (var r = 0; r < 4; r++)
llBox(0.5, 0.4, 0.25, llM(LLC.walnut), 47.3 + c * 1.5, 1.6 + r * 0.48, 65.5, L);
for (var k = 0; k < 14; k++)
llBox(0.08, 0.12, 0.02, gold, 47.3 + (k % 10) * 1.5, 1.62 + ((k * 3) % 4) * 0.48, 65.65, L);
llCrestBoard(L, 54, 5.2, 65.4, 0);
llSign(L, ["RECEPTION"], 3.2, 0.6, 54, 3.6, 65.45, 0, "#3A1A4A", "#E8CFA0");
[48, 54, 60].forEach(function (x) { llBox(0.5, 0.32, 0.04, llM(0x241A30), x, 1.3, 71.0, L); llBox(0.06, 0.18, 0.06, llSilver(), x, 1.15, 71.0, L); });
llVase(L, 48.6, 1.11, 71.6, 1.2);
llVase(L, 61.4, 1.11, 71.6, 1.2);
llSpot({ x: 54, z: 73.4, r: 3.6, name: "Reception: book a room, or your stay", verb: "go to the desk", fn: function () { llFrontDesk(); } });
llStaff({ title: "Front desk agent", x: 51, z: 69.8, ry: 0, seed: "fd1", talk: "frontdesk" });
llStaff({ title: "Front desk agent", x: 57.5, z: 69.8, ry: 0, seed: "fd2" });
llCounter(L, 18, 70.5, 3, Math.PI / 2, { col: LLC.cream, panel: LLC.blush });
llSign(L, ["BELL DESK"], 2, 0.5, 16.4, 2.4, 70.5, Math.PI / 2, "#3A1A4A", "#E8CFA0");
[[13.5, 76], [15.5, 76.5]].forEach(function (q) {
var t = llPiece(L, q[0], q[1], 0.3);
llBox(1.2, 0.06, 0.7, llGold(), 0, 0.25, 0, t);
llBox(0.05, 1.6, 0.05, llGold(), -0.55, 1.05, 0, t);
llBox(0.05, 1.6, 0.05, llGold(), 0.55, 1.05, 0, t);
wMesh(new THREE.TorusGeometry(0.55, 0.03, 5, 16, Math.PI), llGold(), 0, 1.85, 0, t);
llBox(0.6, 0.45, 0.35, llM(0x6A3A2A), -0.2, 0.5, 0, t);
llBox(0.45, 0.6, 0.3, llM(LLC.plum), 0.3, 0.58, 0, t);
llSolid(q[0], q[1], 0.7, 0.45, 0.3, 1.8);
});
llSpot({ x: 20.5, z: 70.5, r: 2.4, name: "The bell desk", verb: "ask the bell captain", fn: function () { llBellDesk(); } });
llStaff({ title: "Bell captain", x: 17, z: 70.5, ry: Math.PI / 2, seed: "bellcap", talk: "bell" });
llStaff({ title: "Bellhop", x: 22, z: 80, ry: 0, seed: "bellhop1", wander: 8 });
llStaff({ title: "Doorman", x: 12.8, z: 66.6, ry: 0, seed: "door2" });
for (var i = 0; i < 4; i++) {
var lz = 82 + i * 6.5, lf = llPiece(L, 4.2, lz, Math.PI / 2);
llBox(2.6, 3.4, 0.12, llM(0xB8945A, { e: 0x1A1208 }), 0, 1.7, 0, lf);
llBox(0.04, 3.3, 0.14, llM(0x6A5030), 0, 1.7, 0.02, lf);
for (var p = 0; p < 3; p++) {
llBox(1.1, 0.04, 0.13, llM(0xE0C890), -0.62, 0.8 + p * 1.0, 0.02, lf);
llBox(1.1, 0.04, 0.13, llM(0xE0C890), 0.62, 0.8 + p * 1.0, 0.02, lf);
}
llBox(3.2, 0.5, 0.2, gold, 0, 3.65, 0.02, lf);
llBox(0.3, 0.5, 0.1, llM(LLC.cream), 1.7, 1.3, 0.06, lf);
llSpot({ x: 6.6, z: lz, r: 2.4, name: "The lifts: up to the guest floors", verb: "call the lift", fn: function () { llLiftCard(); } });
}
llSign(L, ["THE LIFTS", "floors 2 to 6"], 3.4, 0.9, 4.3, 6.2, 91.75, Math.PI / 2, "#3A1A4A", "#E8CFA0");
var ft = llPiece(L, 42, 90, 0);
llCyl(2.2, 2.2, 0.9, llM(0xD8CCD4, { map: "marble" }), 0, 0.45, 0, ft, 24);
llCyl(2.3, 2.3, 0.06, gold, 0, 0.92, 0, ft, 24);
llCyl(0.6, 0.8, 0.8, llSilver(), 0, 1.35, 0, ft, 14);
for (var f = 0; f < (LL.lite ? 12 : 30); f++) {
var a = f / 30 * 6.283, rr = 0.4 + (f % 3) * 0.35;
llSph(0.22, llM([LLC.pink, LLC.rose, 0xF0D8E4, LLC.lilac][f % 4]), Math.cos(a) * rr, 1.8 + ((f * 7) % 5) * 0.14, Math.sin(a) * rr, ft, 6);
}
llSolidR(42, 90, 2.4, 2.6);
llRug(L, 42, 90, 16, 14, 0, LLC.rose, LLC.gold);
[[0, -6, 0], [0, 6, Math.PI], [-6.5, 0, Math.PI / 2], [6.5, 0, -Math.PI / 2]].forEach(function (q) { llSofa(L, 42 + q[0], 90 + q[1], q[2], LLC.purple, 3.4); });
[[-5, -5], [5, -5], [-5, 5], [5, 5]].forEach(function (q) { llArmchair(L, 42 + q[0], 90 + q[1], Math.atan2(-q[0], -q[1]), LLC.lilac); });
llSpot({ x: 42, z: 83.2, r: 2.4, name: "The lobby sofas", verb: "sit a while", fn: function () { llRest("the Hotel Lobby"); } });
[[24, 78], [60, 78], [24, 102], [60, 102]].forEach(function (q) { llColumn(L, q[0], q[1], 10); });
llChandelier(L, 42, 9.2, 90, 2.0, { tiers: 4 });
llChandelier(L, 22, 9.2, 90, 1.3);
llChandelier(L, 64, 9.2, 90, 1.3);
llCounter(L, 75, 100, 4, -Math.PI / 2, { col: LLC.cream, panel: LLC.blush });
llSign(L, ["GUEST SERVICES", "the resort, the spa, the tables"], 3.6, 1, 79.6, 3.2, 100, -Math.PI / 2, "#3A1A4A", "#E8CFA0");
llSpot({ x: 72.6, z: 100, r: 2.6, name: "Guest services: everything to do at the resort", verb: "ask", fn: function () { llResortGuide(); } });
llStaff({ title: "Guest services host", x: 77.2, z: 100, ry: -Math.PI / 2, seed: "guestsvc", talk: "guestsvc" });
llBoard(L, "resort", 50, 3.4, 109.6, Math.PI, 5, 3);
llSpot({ x: 50, z: 106.6, r: 2.4, name: "What's on at the resort", verb: "read", fn: function () { llResortGuide(); } });
llBoard(L, "tables", 70, 3.4, 65.4, 0, 5, 3);
llSpot({ x: 72, z: 68.4, r: 2.2, name: "The Garden Pavilion: tables open now", verb: "read", fn: function () { llTablesLobby(null); } });
llSign(L, ["THE MAGNOLIA ROOM"], 4, 0.7, 79.7, 5.0, 88, -Math.PI / 2);
llSign(L, ["THE GARDENS"], 3.4, 0.6, 30, 5.0, 109.7, Math.PI);
llSign(L, ["THE POOL TERRACE"], 3.6, 0.6, 70, 5.0, 109.7, Math.PI);
llSign(L, ["GIGI'S LOUNGE ↑"], 3.2, 0.6, 10, 4.9, 65.35, 0);
[14, 40, 60].forEach(function (wx) { llWindow(L, wx, 4.2, 109.75, Math.PI, 2.4, 3.6); });
[[6, 66.6], [78.4, 66.6], [6, 108.4], [78.4, 108.4], [44.6, 108.6], [55.4, 108.6]].forEach(function (q) { llPlant(L, q[0], q[1], q[0] > 40 && q[0] < 60 ? "orchid" : "palm", 1.4); });
for (var s = 0; s < 5; s++) {
llSconce(L, 79.75, 3.6, 70 + s * 8, -Math.PI / 2);
}
[[14, 96], [14, 104]].forEach(function (q, i) { llChaise(L, q[0], q[1], Math.PI / 2, i ? LLC.rose : LLC.pink); });
LL.seated = LL.seated || [];
LL.seated.push({ x: 42, z: 84.2, ry: Math.PI, seed: "lob1" }, { x: 36.2, z: 91, ry: -Math.PI / 2, seed: "lob2" }, { x: 47.8, z: 89, ry: Math.PI / 2, seed: "lob3" });
},
function (G, M) {
var B = llWing(G, "boh", -80, 4, 65, 110), sw = { h: 4.2, wall: M.mStaffWall, floor: M.mStaffFloor, ceil: llM(0xD0C8D0), gate: "staff", skirt: 0x6A5A6A };
function room(x0, x1, z0, z1, o) { var q = {}; for (var k in sw)
q[k] = sw[k]; for (var k2 in o)
q[k2] = o[k2]; return llRoom(B, x0, x1, z0, z1, q); }
room(-20, 4, 65, 85, { name: "the hotel front office", gaps: [{ s: "s", c: -8, w: 2.4 }, { s: "w", c: 75, w: 2.4 }, { s: "e", c: 72, w: 2.4 }], skip: ["n", "e"] });
llPlace("frontoffice", -8, 75, "The front office (staff)");
[-16, -10, -4].forEach(function (x) { llDesk(B, x, 70, 0, { w: 1.8, col: LLC.cream }); llChair(B, x, 71.4, Math.PI, LLC.lav); llBox(0.6, 0.4, 0.04, llM(0x241A30), x, 1.12, 69.8, B); });
llCabinet(B, 1.5, 82, -Math.PI / 2, 2.4, 1.4, LLC.cream);
var safe = llPiece(B, -18.6, 82, Math.PI / 2);
llBox(1, 1.3, 0.9, llM(0x5A5A64), 0, 0.65, 0, safe);
llSolid(-18.6, 82, 0.5, 0.5, 0, 1.4);
var km = llPiece(B, -2, 80, 0);
llBox(0.5, 0.4, 0.4, llM(0xE6E0E8), 0, 1.0, 0, km);
llBox(1.2, 0.8, 0.6, llM(LLC.cream), 0, 0.4, 0, km);
llSolid(-2, 80, 0.6, 0.3, 0, 1.2);
llSpot({ x: -10, z: 73.2, r: 2.6, name: "The front office: arrivals, key cards and the night audit", verb: "work", fn: llWorkHere });
llSpot({ x: -2, z: 81.8, r: 2, name: "The key card machine", verb: "look", fn: function () { setStatus("<b>The key card machine</b> hums softly. Each card opens one room until its guest checks out; the housekeepers and the front desk carry master cards."); } });
llStaff({ title: "Night auditor", x: -10, z: 68.8, ry: 0, seed: "nightaud" });
room(-50, -20, 65, 85, { name: "the housekeeping office", gaps: [{ s: "s", c: -35, w: 2.4 }, { s: "w", c: 75, w: 2.4 }, { s: "e", c: 75, w: 2.4 }], skip: ["n", "e"] });
llPlace("housekeeping", -35, 75, "Housekeeping (staff)");
for (var s = 0; s < 4; s++)
llShelves(B, -48 + s * 4.5, 65.6, 0, 4);
[[-42, 78], [-37, 78], [-32, 78]].forEach(function (q) {
var c = llPiece(B, q[0], q[1], 0);
llBox(1.4, 0.9, 0.6, llM(LLC.lilac), 0, 0.6, 0, c);
llBox(1.4, 0.05, 0.65, llSilver(), 0, 1.07, 0, c);
for (var t = 0; t < 3; t++)
llBox(0.4, 0.25, 0.4, llM(0xF0EAEA), -0.45 + t * 0.45, 1.22, 0, c);
llBox(0.08, 0.9, 0.5, llSilver(), 0.75, 1.0, 0, c);
llSolid(q[0], q[1], 0.8, 0.35, 0, 1.4);
});
llDesk(B, -24, 82, -Math.PI / 2, { w: 1.6, col: LLC.cream });
llBossChair(B, -22.8, 82, -Math.PI / 2, LLC.lav);
var hb = llBoard(B, "rooms", -49.75, 2.2, 78, Math.PI / 2, 4, 2.2);
llSpot({ x: -46.8, z: 78, r: 2.4, name: "The board of rooms: who is staying, which rooms to make up", verb: "read", fn: function () { llRoomsBoardCard(); } });
llSpot({ x: -37, z: 80.4, r: 2.6, name: "The housekeeping carts: make up the rooms", verb: "work", fn: llWorkHere });
llStaff({ title: "Director of housekeeping", x: -24.4, z: 80, ry: -Math.PI / 2, seed: "dirhk", talk: "housekeep" });
llStaff({ title: "Room attendant", x: -40, z: 81, ry: Math.PI, seed: "ra1", wander: 5 });
room(-80, -50, 65, 85, { name: "the laundry", gaps: [{ s: "s", c: -65, w: 2.4 }, { s: "e", c: 75, w: 2.4 }], skip: ["n", "e"] });
for (var w = 0; w < 5; w++) {
var wm = llPiece(B, -77 + w * 2, 66, 0);
llBox(1.1, 1.4, 0.8, llM(0xE2DCE4), 0, 0.7, 0, wm);
wMesh(new THREE.CircleGeometry(0.32, 16), llM(0x8A9AB8), 0, 0.8, 0.41, wm);
llSolid(-77 + w * 2, 66, 0.55, 0.4, 0, 1.4);
}
for (var d = 0; d < 4; d++) {
var dr = llPiece(B, -79.4, 72 + d * 2.2, Math.PI / 2);
llBox(1.1, 1.4, 0.8, llM(0xD8D2DC), 0, 0.7, 0, dr);
wMesh(new THREE.CircleGeometry(0.3, 16), llM(0x3A3A44), 0, 0.85, 0.41, dr);
llSolid(-79.4, 72 + d * 2.2, 0.4, 0.55, 0, 1.4);
}
llRectTable(B, -62, 76, 6, 1.4, 0, { cloth: false, top: 0xE6E0E8 });
for (var fo = 0; fo < 6; fo++)
llBox(0.45, 0.12 + ((fo * 3) % 4) * 0.05, 0.35, llM(0xF0EAEA), -64.5 + fo, 0.88, 76, B);
var pr = llPiece(B, -54, 70, 0);
llBox(2.2, 1, 0.9, llSilver(), 0, 0.5, 0, pr);
llCyl(0.2, 0.2, 2, llM(0xE6E0E8), 0, 1.15, 0, pr, 10).rotation.z = Math.PI / 2;
llSolid(-54, 70, 1.1, 0.45, 0, 1.4);
llSpot({ x: -62, z: 78.4, r: 2.6, name: "The laundry: wash, press and fold", verb: "work", fn: llWorkHere });
llStaff({ title: "Laundry attendant", x: -62, z: 74.4, ry: 0, seed: "laund1" });
room(-80, 4, 85, 90, { name: "the service corridor", h: 3.6, gaps: [{ s: "n", c: -8, w: 2.4 }, { s: "n", c: -35, w: 2.4 }, { s: "n", c: -65, w: 2.4 }, { s: "s", c: -60, w: 2.4 }, { s: "s", c: -30, w: 2.4 }, { s: "s", c: -8, w: 2.4 }], skip: ["n", "s", "e"] });
room(-80, -40, 90, 110, { name: "engineering and stores", gaps: [{ s: "n", c: -60, w: 2.4 }, { s: "s", c: -60, w: 2.6 }], skip: [] });
llRectTable(B, -74, 96, 4, 1.2, 0, { cloth: false, top: 0x6A5A4A });
llShelves(B, -79.4, 103, Math.PI / 2, 5);
llShelves(B, -50, 109.4, Math.PI, 6);
var boil = llPiece(B, -46, 95, 0);
llCyl(1.1, 1.1, 2.6, llM(0x8A8A94), 0, 1.3, 0, boil, 14);
for (var pp = 0; pp < 4; pp++)
llCyl(0.1, 0.1, 3, llM(0xB87A4A), -1.4 + pp * 0.3, 1.6, -0.6, boil, 6);
llSolidR(-46, 95, 1.3, 2.6);
llSpot({ x: -70, z: 96, r: 2.6, name: "Engineering: the pool pumps, the lifts, a dripping tap", verb: "work", fn: llWorkHere });
llStaff({ title: "Hotel engineer", x: -74, z: 94.6, ry: 0, seed: "eng1" });
room(-40, -20, 90, 110, { name: "the luggage room", gaps: [{ s: "n", c: -30, w: 2.4 }], skip: ["w"] });
for (var lr = 0; lr < 3; lr++) {
llShelves(B, -38 + lr * 0, 95 + lr * 5, Math.PI / 2, 4);
}
llShelves(B, -22.6, 100, -Math.PI / 2, 6);
for (var lb = 0; lb < 6; lb++)
llBox(0.7, 0.5, 0.35, llM([0x6A3A2A, LLC.plum, 0x2A3A5A][lb % 3]), -34 + lb * 1.6, 0.25, 106, B);
room(-20, 4, 90, 110, { name: "the staff canteen", gaps: [{ s: "n", c: -8, w: 2.4 }], skip: ["w", "e"] });
llKitchenRun(B, -8, 109.4, 10, Math.PI);
for (var t2 = 0; t2 < 2; t2++) {
llRectTable(B, -14 + t2 * 10, 98, 3, 1.2, 0, { cloth: false, top: LLC.cream });
for (var c2 = 0; c2 < 4; c2++)
llChair(B, -15 + t2 * 10 + (c2 % 2) * 2, 98 + (c2 < 2 ? -1.1 : 1.1), c2 < 2 ? 0 : Math.PI, LLC.lav);
}
llLockers(B, -19.4, 96, Math.PI / 2, 10);
llSofa(B, 1.6, 100, -Math.PI / 2, LLC.lav, 2.6);
llSpot({ x: -8, z: 104, r: 2.6, name: "The staff canteen: the rota and the openings", verb: "look", fn: llStaffBoard });
},
function (G, M) {
var R = llWing(G, "magnolia", 80, 150, 65, 110);
llRoom(R, 80, 150, 65, 110, { name: "the Magnolia Room", h: 7, wall: M.mWall, floor: M.mCarpet, gaps: [{ s: "w", c: 88, w: 5, h: 4.4 }, { s: "e", c: 75, w: 2.4 }, { s: "s", c: 115, w: 6, h: 4.4 }], skip: ["w"], hemi: 1.15 });
llPlace("magnolia", 115, 88, "The Magnolia Room");
llSign(R, ["THE MAGNOLIA ROOM", "dinner, every evening"], 6, 1.4, 115, 5.2, 65.4, 0, "#3A1A4A", "#E8CFA0");
var md = llPiece(R, 85, 92, -Math.PI / 2);
llBox(1.1, 1.2, 0.6, llM(LLC.walnut), 0, 0.6, 0, md);
llBox(1.2, 0.05, 0.7, gold(), 0, 1.22, 0, md);
llBox(0.5, 0.04, 0.35, llM(0xF0EAE4), 0, 1.26, 0, md);
llSolid(85, 92, 0.35, 0.6, 0, 1.3);
function gold() { return M.gold; }
llSpot({ x: 86.6, z: 88, r: 2.8, name: "The maître d': a table for dinner", verb: "be seated", fn: function () { llMenuCard("dining"); } });
llStaff({ title: "Maître d'", x: 84.6, z: 93.6, ry: -Math.PI / 2, seed: "maitre", talk: "maitre" });
var R2 = wRand(91);
for (var r = 0; r < 3; r++)
for (var c = 0; c < 4; c++) {
var x = 96 + c * 14, z = 76 + r * 11;
llDiningRound(R, x, z, 0.85, 4, c % 2 ? LLC.rose : LLC.purple, { cloth: 0xF0EAE4, top: 0xF6F2EE });
if (!LL.lite) {
llCandelabra(R, x, 0.8, z);
llSph(0.12, llM(0xF4ECE4), x + 0.35, 0.95, z + 0.2, R, 6);
}
llSpot({ x: x, z: z + 1.9, r: 1.8, name: "A table in the Magnolia Room", verb: "order dinner", fn: function () { llMenuCard("dining"); } });
}
for (var b = 0; b < 4; b++) {
llSofa(R, 98 + b * 14, 66.2, 0, LLC.velvet, 4, { cush: LLC.gold });
llRectTable(R, 98 + b * 14, 67.8, 3, 0.9, 0, { cloth: 0xF0EAE4, top: 0xF6F2EE });
}
for (var w = 0; w < 4; w++)
llWindow(R, 90 + w * 16, 3, 109.75, Math.PI, 2.6, 3);
for (var k = 0; k < 3; k++)
llChandelier(R, 96 + k * 21, 6.4, 87, 1.3, { tiers: 3 });
llHarp(R, 142, 104, Math.PI * 1.25);
llRug(R, 141, 103, 5, 4, 0, LLC.rose, LLC.gold);
llStaff({ title: "Harpist", x: 141.2, z: 103.2, ry: Math.PI * 0.75, seed: "harpist", talk: "harpist" });
llSpot({ x: 139, z: 101, r: 2.4, name: "The harpist", verb: "ask for a piece", fn: function () { llPianoCard(); } });
llStaff({ title: "Restaurant server", x: 110, z: 82, ry: 0, seed: "srv1", wander: 10 });
llStaff({ title: "Restaurant server", x: 130, z: 94, ry: 0, seed: "srv2", wander: 10 });
[[82, 66.6], [148.4, 66.6], [82, 108.4], [148.4, 108.4]].forEach(function (q) { llPlant(R, q[0], q[1], "palm", 1.3); });
llSideboard(R, 149.4, 92, -Math.PI / 2, 3, LLC.cream);
LL.seated = LL.seated || [];
[[96, 76], [124, 87], [110, 98], [138, 76]].forEach(function (q, i) { for (var s = 0; s < (LL.lite ? 1 : 2); s++) {
var a = s * Math.PI + 0.6;
LL.seated.push({ x: q[0] + Math.sin(a) * 1.35, z: q[1] + Math.cos(a) * 1.35, ry: a + Math.PI, seed: "mag" + i + "_" + s });
} });
var K = llWing(G, "kitchen2", 150, 190, 65, 110);
llRoom(K, 150, 190, 65, 110, { name: "the Magnolia kitchen", h: 4.5, wall: M.mStaffWall, floor: M.mTile, ftile: 1, ceil: llM(0xD0C8D0), gate: "staff", gaps: [{ s: "w", c: 75, w: 2.4 }], skip: ["w", "e"], skirt: 0x6A5A6A, hemi: 1.2 });
llPlace("kitchen2", 170, 88, "The Magnolia kitchen (staff)");
llKitchenRun(K, 170, 65.6, 30, 0);
[158, 162, 166, 170].forEach(function (x) { llStove(K, x, 66.3, 0); });
llFridge(K, 189.3, 72, -Math.PI / 2);
llFridge(K, 189.3, 74, -Math.PI / 2);
llIsland(K, 166, 76, 10, 1.6, 0);
for (var p = 0; p < 6; p++)
llCyl(0.22, 0.2, 0.28, llSilver(), 162 + p * 1.6, 1.1, 76, K, 10);
llRectTable(K, 156, 84, 1.4, 6, 0, { cloth: false, top: 0xE6E0E8 });
for (var pl = 0; pl < 6; pl++)
llCyl(0.16, 0.16, 0.02, llM(0xF0ECE8), 156, 0.8, 81.6 + pl * 1, K, 12);
llSign(K, ["THE PASS"], 2, 0.5, 154, 2.6, 84, -Math.PI / 2, "#5A4A6A", "#F0E8F0");
llKitchenRun(K, 189.4, 94, 12, -Math.PI / 2);
llShelves(K, 180, 109.4, Math.PI, 6);
llShelves(K, 170, 109.4, Math.PI, 6);
llRectTable(K, 176, 90, 6, 1.4, 0, { cloth: false, top: 0xE6E0E8 });
[174, 176, 178].forEach(function (x) { llTieredStand(K, x, 0.8, 90); });
llSpot({ x: 166, z: 78.4, r: 3, name: "The kitchen: cook for the Magnolia Room", verb: "work", fn: llWorkHere });
llSpot({ x: 158, z: 84, r: 2.4, name: "The pass: send the plates out", verb: "work", fn: llWorkHere });
llStaff({ title: "Executive chef", x: 164, z: 74.2, ry: 0, seed: "exchef", talk: "chef" });
llStaff({ title: "Line cook", x: 160, z: 67.4, ry: Math.PI, seed: "cook1" });
llStaff({ title: "Line cook", x: 168, z: 67.4, ry: Math.PI, seed: "cook2" });
llStaff({ title: "Dishwasher", x: 188, z: 94, ry: -Math.PI / 2, seed: "dish1" });
},
function (G, M) {
var B = llWing(G, "ballroom", 190, 250, 65, 110);
llRoom(B, 190, 250, 65, 110, { name: "the Starlight Ballroom", h: 10, wall: M.mWall, floor: M.mParq, ftile: 2, gaps: [{ s: "w", c: 100, w: 2.4 }, { s: "s", c: 220, w: 6, h: 4.6 }], skip: [], hemi: 1.15 });
llPlace("ballroom", 220, 90, "The Starlight Ballroom");
llBox(24, 0.03, 20, llM(0xF0E0D0, { map: "parquet" }), 220, 0.03, 87, B);
llBox(24.4, 0.035, 0.2, M.gold, 220, 0.035, 77, B);
llBox(24.4, 0.035, 0.2, M.gold, 220, 0.035, 97, B);
for (var p = 0; p < 5; p++) {
var a = p / 5 * 6.283 - Math.PI / 2;
var ray = llBox(0.6, 0.04, 5, M.gold, 220 + Math.cos(a) * 2.5, 0.04, 87 + Math.sin(a) * 2.5, B);
ray.rotation.y = -a + Math.PI / 2;
}
llBox(10, 0.8, 14, llM(LLC.plum), 245, 0.4, 87, B);
llBox(10.2, 0.06, 14.2, M.gold, 245, 0.82, 87, B);
llPad(240, 250, 80, 94, 0.8);
llRamp(236, 240, 85, 89, 0, 0.8, "x");
llBox(0.2, 9, 16, llM(LLC.velvet), 249.7, 4.5, 87, B);
for (var d = 0; d < 6; d++)
llBox(0.3, 8.8, 0.5, llM(d % 2 ? LLC.berry : LLC.velvet), 249.5, 4.5, 80 + d * 2.8, B);
llSign(B, ["THE STARLIGHT ORCHESTRA"], 5, 0.7, 249.5, 6.4, 87, -Math.PI / 2, "#3A1A4A", "#E8CFA0");
llPiano(B, 246, 82, -Math.PI / 2);
llHarp(B, 247, 92, -Math.PI / 2);
[[243, 85], [243, 89], [246.5, 87]].forEach(function (q, i) { llChair(B, q[0], q[1], -Math.PI / 2, LLC.velvet); });
llStaff({ title: "Bandleader", x: 242.4, z: 87, y: 0.8, ry: -Math.PI / 2, seed: "bandldr", talk: "bandleader" });
llStaff({ title: "Ballroom musician", x: 244, z: 84.6, y: 0.8, ry: -Math.PI / 2, seed: "mus1" });
llStaff({ title: "Ballroom musician", x: 244, z: 89.4, y: 0.8, ry: -Math.PI / 2, seed: "mus2" });
llSpot({ x: 236.4, z: 87, r: 2.6, name: "The bandleader: request a dance", verb: "ask", fn: function () { llBandCard("ballroom"); } });
llSpot({ x: 220, z: 87, r: 5, name: "The dance floor", verb: "dance", fn: function () { llDance("the Starlight Ballroom"); } });
[[198, 72], [198, 82], [198, 92], [198, 102], [210, 104], [230, 104], [210, 70.5], [230, 70.5]].forEach(function (q, i) {
llDiningRound(B, q[0], q[1], 0.9, 5, i % 2 ? LLC.rose : LLC.purple, { cloth: 0xF0EAE4, top: 0xF6F2EE });
llSpot({ x: q[0] + 1.9, z: q[1], r: 1.8, name: "A ballroom table", verb: "sit out a dance", fn: function () { llRest("the Starlight Ballroom"); } });
});
for (var k = 0; k < 3; k++)
llChandelier(B, 206 + k * 14, 9, 87, 1.8, { tiers: 4 });
for (var m = 0; m < 4; m++) {
llMirror(B, 192 + m * 14 + 4, 3.4, 65.25, 0, 3, 4);
}
for (var w = 0; w < 3; w++)
llWindow(B, 198 + w * 10, 4, 109.75, Math.PI, 2.6, 4);
llSign(B, ["THE STARLIGHT BALLROOM", "tea dances · the evening ball · celebrations"], 7, 1.4, 220, 7.6, 65.3, 0, "#3A1A4A", "#E8CFA0");
llStaff({ title: "Events coordinator", x: 196, z: 66.6, ry: 0, seed: "events", talk: "events" });
llSpot({ x: 196, z: 68.6, r: 2.2, name: "The events coordinator: a party, a dance, a celebration", verb: "ask", fn: function () { llEventsCard(); } });
[[192, 108.4], [248.4, 66.6], [192, 66.6]].forEach(function (q) { llPlant(B, q[0], q[1], "palm", 1.4); });
},
function (G) {
var Y = llWing(G, "gardens", -80, 60, 110, 300);
llYard(Y, -80, 60, 110, 300, { name: "the Gardens", holes: true, gaps: [{ s: "e", c: 170, w: 8 }, { s: "e", c: 265, w: 4 }], skip: ["n"] });
llPlace("gardens", -45, 142, "The Gardens: the rose garden and the fountain");
var grav = llM(0xF0EAE0, { map: "gravel" });
llPath(Y, 26, 34, 110, 186, grav);
llPath(Y, -80, 60, 166, 174, grav);
llPath(Y, -48, -42, 110, 166, grav);
llPath(Y, -80, -10, 139, 145, grav);
llPath(Y, -12, -6, 174, 300, grav);
llPath(Y, -80, -12, 240, 246, grav);
llPath(Y, -12, 60, 261, 269, grav);
llFountain(Y, -45, 142, 1.5);
[[-64, 126], [-26, 126], [-64, 158], [-26, 158]].forEach(function (q, i) { llRoseBed(Y, q[0], q[1], 22, 18, 40 + i); });
[[-45, 121], [-45, 163]].forEach(function (q) { llRoseArch(Y, q[0], q[1], 0, 3.4); });
[[-56, 142], [-34, 142]].forEach(function (q) { llRoseArch(Y, q[0], q[1], Math.PI / 2, 3.4); });
[[-52, 136, Math.PI / 4], [-38, 136, -Math.PI / 4], [-52, 148, Math.PI * 0.75], [-38, 148, -Math.PI * 0.75]].forEach(function (q) { llBench(Y, q[0], q[1], q[2]); });
llSpot({ x: -45, z: 136, r: 3.6, name: "The rose garden", verb: "smell the roses", fn: function () { setStatus("<b>Old roses, sweet as jam,</b> and the fountain murmuring. A bee drifts by; somewhere a blackbird is singing."); } });
llSpot({ x: -52, z: 137.4, r: 1.6, name: "A garden bench", verb: "sit", fn: function () { llRest("the rose garden"); } });
llStaff({ title: "Head gardener", x: -60, z: 142, ry: Math.PI / 2, seed: "hgard2", talk: "headgardener" });
llStaff({ title: "Resort gardener", x: -30, z: 160, ry: 0, seed: "rgard1", wander: 8 });
[-78, -12].forEach(function (x) { for (var z = 114; z < 166; z += 8)
llTree(Y, x + (x < 0 && x < -40 ? 1.5 : -1.5), z, "cypress", 0.8); });
for (var t = 0; t < 6; t++) {
var tz = 118 + t * 9;
llTopiary(Y, 22, tz, t % 2 ? "ball" : "cone", 1);
llTopiary(Y, 38, tz, t % 2 ? "ball" : "cone", 1);
llLamp(Y, 25.2, tz + 4.5, 3);
llLamp(Y, 34.8, tz + 4.5, 3);
}
[[8, 124], [50, 124], [8, 150], [50, 150]].forEach(function (q, i) { llTree(Y, q[0], q[1], i % 2 ? "blossom" : "round", 1.2); });
llUrn(Y, 14, 114, 1.1);
llUrn(Y, 46, 114, 1.1);
var bs = llPiece(Y, 30, 190, 0), wh = llM(0xF2EEEA), rf = llM(LLC.plum);
llCyl(6.2, 6.4, 0.8, llM(0xEDE4D8, { map: "trav" }), 0, 0.4, 0, bs, 8);
llCyl(6.3, 6.3, 0.06, llGold(), 0, 0.82, 0, bs, 8);
for (var c = 0; c < 8; c++) {
var a = c / 8 * 6.283 + Math.PI / 8;
llCyl(0.12, 0.12, 3.6, wh, Math.cos(a) * 5.8, 2.6, Math.sin(a) * 5.8, bs, 6);
llSolidR(30 + Math.cos(a) * 5.8, 190 + Math.sin(a) * 5.8, 0.2, 4);
}
llCyl(0.3, 7, 2.2, rf, 0, 5.5, 0, bs, 8);
llCyl(7, 7, 0.3, llGold(), 0, 4.4, 0, bs, 8);
llSph(0.4, llGold(), 0, 6.8, 0, bs, 8);
llPad(24, 36, 184, 196, 0.8);
llRamp(28, 32, 178, 184, 0, 0.8, "z");
llStaff({ title: "Ballroom musician", x: 28, z: 192, y: 0.8, ry: Math.PI, seed: "bsm1" });
llStaff({ title: "Ballroom musician", x: 32, z: 192, y: 0.8, ry: Math.PI, seed: "bsm2" });
llSpot({ x: 30, z: 184.4, y: 0.8, r: 3.4, name: "The bandstand", verb: "ask for a tune", fn: function () { llBandCard("bandstand"); } });
llSpot({ x: 30, z: 179, r: 3, name: "The lawn by the bandstand", verb: "dance", fn: function () { llDance("the bandstand lawn"); } });
for (var dc = 0; dc < 6; dc++) {
var da = dc / 6 * Math.PI + Math.PI * 0.08;
llChair(Y, 30 + Math.cos(da) * 10, 190 - Math.sin(da) * 10 - 0, da + Math.PI / 2, LLC.cream);
}
llMaze(Y, -78, 180, 7, 8);
llLake(Y, { cx: 24, cz: 236, rx: 30, rz: 22, ok: [{ x0: -9, x1: 19, z0: 234.2, z1: 237.8 }, { x: 24, z: 236, r: 6.5 }] });
var isl = llPiece(Y, 24, 236, 0);
llCyl(6.5, 7, 0.5, llM(0x5E8A4E, { map: "grass" }), 0, 0.0, 0, isl, 20);
llCyl(3.6, 3.6, 0.4, llM(0xEDE4D8, { map: "trav" }), 0, 0.35, 0, isl, 8);
for (var gp = 0; gp < 6; gp++) {
var ga = gp / 6 * 6.283;
llCyl(0.1, 0.1, 3, llM(0xF2EEEA), Math.cos(ga) * 3.2, 2, Math.sin(ga) * 3.2, isl, 6);
llSolidR(24 + Math.cos(ga) * 3.2, 236 + Math.sin(ga) * 3.2, 0.15, 3);
}
llCyl(0.2, 4.2, 1.6, llM(0xF2EEEA), 0, 4.2, 0, isl, 6);
llBench(Y, 24, 238.4, Math.PI);
llBench(Y, 24, 233.6, 0);
llSpot({ x: 24, z: 236, r: 2.6, name: "The island gazebo", verb: "sit by the water", fn: function () { llRest("the island gazebo"); } });
llBridgeSeg(Y, -7, 0, 3, 1.1, 236, 4);
llBridgeSeg(Y, 3, 1.1, 9, 1.1, 236, 4);
llBridgeSeg(Y, 9, 1.1, 17.8, 0.25, 236, 4);
llRamp(-7, 3, 234, 238, 0, 1.1, "x");
llPad(3, 9, 234, 238, 1.1);
llRamp(9, 17.8, 234, 238, 1.1, 0.25, "x");
llPad(17.8, 30.2, 230, 242, 0.25);
llPad(21, 27, 233, 239, 0.55);
var dock = llPiece(Y, 24, 211, 0);
llBox(5, 0.3, 4, llM(0xA87850, { map: "deck" }), 0, 0.15, 0, dock);
for (var dp = 0; dp < 4; dp++)
llCyl(0.12, 0.12, 1.2, llM(0x6A4E36), -2.3 + (dp % 2) * 4.6, 0.4, -1.8 + (dp / 2 | 0) * 3.6, dock, 6);
LL.boatAt = { x: 24, z: 216 };
llPlace("lake", 24, 208, "The swan lake and the boathouse");
LL.boat = llSwanBoat(Y, 24, 216.5, Math.PI);
llSpot({ x: 24, z: 210, r: 3, name: "The swan boat: a ride round the lake", verb: "step aboard", fn: function () { llSwanRide(); } });
llStaff({ title: "Swan boat keeper", x: 21.4, z: 210, ry: Math.PI / 2, seed: "swankeep", talk: "swan" });
var bh = llPiece(Y, 44, 210, 0);
llBox(7, 3, 5, llM(0xF2EEEA), 0, 1.5, 0, bh);
var roof = llCyl(0.2, 5, 1.6, llM(LLC.plum), 0, 3.8, 0, bh, 4);
roof.rotation.y = Math.PI / 4;
llSolid(44, 210, 3.5, 2.5, 0, 3);
llSign(bh, ["THE BOATHOUSE"], 3, 0.5, 0, 2.4, -2.55, Math.PI, "#3A1A4A", "#E8CFA0");
for (var sw = 0; sw < (LL.lite ? 2 : 4); sw++) {
var swan = llSwanBoat(Y, 0, 0, 0);
swan.scale.setScalar(0.32);
LL.spin.push({ swan: swan, cx: 38, cz: sw % 2 ? 249 : 223, rx: 5, rz: 3, sp: 0.08 + sw * 0.01, ph: sw * 1.7 });
}
[[0, 212], [52, 262], [-4, 262], [50, 214]].forEach(function (q, i) { llTree(Y, q[0], q[1], i % 2 ? "round" : "blossom", 1.3); });
llPlace("lawns", -46, 256, "Croquet, bowls and the putting green");
var lawn = llM(0xD8F0C8, { map: "grass" });
llPlane(60, 46, lawn, -46, 0.02, 276, Y, 4);
[[-70, 262], [-60, 268], [-50, 262], [-40, 268], [-30, 262]].forEach(function (q) { var h = wMesh(new THREE.TorusGeometry(0.28, 0.025, 4, 10, Math.PI), llM(0xF2EEEA), q[0], 0.02, q[1], Y); });
llCyl(0.04, 0.04, 0.6, llM(0x2A2A30), -75, 0.3, 265, Y, 5);
llCyl(0.04, 0.04, 0.6, llM(0x2A2A30), -25, 0.3, 265, Y, 5);
for (var bl = 0; bl < 6; bl++)
llSph(0.18, llM([0x2A2A30, LLC.plum, 0x3A5A8A][bl % 3]), -60 + bl * 1.2, 0.18, 290, Y, 8);
llSph(0.06, llM(0xF2EEEA), -46, 0.06, 296, Y, 8);
var rack = llPiece(Y, -78, 276, Math.PI / 2);
llBox(2.2, 0.9, 0.5, llM(0xA87850, { map: "deck" }), 0, 0.45, 0, rack);
for (var ml = 0; ml < 5; ml++)
llCyl(0.03, 0.03, 0.9, llM(0x6A4E36), -0.8 + ml * 0.4, 1.1, 0, rack, 4);
llSolid(-78, 276, 0.3, 1.1, 0, 1);
llSpot({ x: -50, z: 265, r: 4, name: "The croquet lawn", verb: "play croquet", fn: function () { llLawnGame("croquet"); } });
llSpot({ x: -50, z: 290, r: 4, name: "The bowling green", verb: "bowl", fn: function () { llLawnGame("bowls"); } });
llSpot({ x: -30, z: 280, r: 3, name: "The putting green", verb: "play nine holes", fn: function () { llPuttGo(); } });
for (var ph = 0; ph < 3; ph++) {
llCyl(0.02, 0.02, 1.4, llM(0xF2EEEA), -34 + ph * 4, 0.7, 276 + ph * 3, Y, 4);
var fl = llBox(0.4, 0.26, 0.02, llM(LLC.rose), -33.8 + ph * 4, 1.25, 276 + ph * 3, Y);
}
[[-20, 250], [-20, 298], [-78, 250], [-78, 298]].forEach(function (q) { llLamp(Y, q[0], q[1], 3); });
[[-70, 252], [-60, 252], [-40, 252], [-30, 252]].forEach(function (q, i) { llBench(Y, q[0], q[1], 0); });
llStaff({ title: "Resort gardener", x: -46, z: 254, ry: 0, seed: "rgard2", wander: 10 });
for (var bz = 180; bz < 300; bz += 12) {
llTree(Y, 58, bz, "cypress", 0.8);
}
llStatue(Y, -12, 174, 0, 1.1);
},
function (G, x0, y0, x1, y1, z, w) {
var dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), a = Math.atan2(dy, dx), mx = (x0 + x1) / 2, my = (y0 + y1) / 2, wh = llM(0xF2EEEA);
llBox(L, 0.22, w, llM(0xA87850, { map: "deck" }), mx, my - 0.11, z, G).rotation.z = a;
[-1, 1].forEach(function (sd) {
llBox(L, 0.1, 0.12, wh, mx, my + 0.95, z + sd * (w / 2 - 0.06), G).rotation.z = a;
for (var i = 0; i <= Math.round(L / 1.6); i++) {
var f = i / Math.round(L / 1.6);
llBox(0.12, 1, 0.12, wh, x0 + dx * f, y0 + dy * f + 0.45, z + sd * (w / 2 - 0.06), G);
}
});
llSolid(mx, z - w / 2 + 0.06, Math.abs(dx) / 2, 0.08, 0, 3);
llSolid(mx, z + w / 2 - 0.06, Math.abs(dx) / 2, 0.08, 0, 3);
},
function (G, x0, z0, n, cs) {
var R = wRand(2026), seen = {}, walls = {}, k = function (i, j) { return i + "," + j; };
for (var i = 0; i <= n; i++)
for (var j = 0; j <= n; j++) {
walls["h" + i + "," + j] = 1;
walls["v" + i + "," + j] = 1;
}
var st = [[0, 0]];
seen[k(0, 0)] = 1;
while (st.length) {
var c = st[st.length - 1], nb = [];
[[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) { var a = c[0] + d[0], b = c[1] + d[1]; if (a >= 0 && b >= 0 && a < n && b < n && !seen[k(a, b)])
nb.push([a, b, d]); });
if (!nb.length) {
st.pop();
continue;
}
var p = nb[Math.floor(R() * nb.length)], d = p[2];
if (d[0] === 1)
delete walls["v" + (c[0] + 1) + "," + c[1]];
else if (d[0] === -1)
delete walls["v" + c[0] + "," + c[1]];
else if (d[1] === 1)
delete walls["h" + c[0] + "," + (c[1] + 1)];
else
delete walls["h" + c[0] + "," + c[1]];
seen[k(p[0], p[1])] = 1;
st.push([p[0], p[1]]);
}
delete walls["h" + Math.floor(n / 2) + ",0"];
var h = 2.6, t = 0.9;
Object.keys(walls).forEach(function (w) {
var hz = w[0] === "h", ij = w.slice(1).split(","), i2 = +ij[0], j2 = +ij[1];
if (hz) {
if (i2 >= n)
return;
var x = x0 + i2 * cs, z = z0 + j2 * cs;
llHedge(G, x - t / 2, z, x + cs + t / 2, z, h, t);
}
else {
if (j2 >= n)
return;
var x2 = x0 + i2 * cs, z2 = z0 + j2 * cs;
llHedge(G, x2, z2 - t / 2, x2, z2 + cs + t / 2, h, t);
}
});
var cx = x0 + (Math.floor(n / 2) + 0.5) * cs, cz = z0 + (Math.floor(n / 2) + 0.5) * cs;
var g = llPiece(G, cx, cz, 0);
llBox(1.2, 1, 1.2, llM(0xE6E0DC, { map: "marble" }), 0, 0.5, 0, g);
llCyl(0.03, 0.03, 0.8, llGold(), 0, 1.4, 0, g, 5);
for (var q = 0; q < 7; q++) {
var a = q / 7 * 6.283;
var pt = llSph(0.16, llGold(), Math.cos(a) * 0.15, 1.9, Math.sin(a) * 0.15, g, 6);
pt.scale.y = 0.7;
}
llSph(0.12, llGold(), 0, 2.0, 0, g, 6);
llSolidR(cx, cz, 0.8, 2);
llSpot({ x: cx, z: cz + 1.6, r: 2, name: "The heart of the maze: GiGi's gold rose", verb: "touch the rose", fn: function () { llMazeHeart(); } });
llPlace("maze", x0 + (Math.floor(n / 2) + 0.5) * cs, z0 - 3, "The hedge maze");
llSign(G, ["THE MAZE", "find GiGi's gold rose"], 3, 0.8, x0 + (Math.floor(n / 2) + 0.5) * cs + 3, 1.6, z0 - 1.5, Math.PI, "#2A4A2A", "#F0E8C8");
},
function (G) {
var P = llWing(G, "pool", 60, 250, 110, 230);
llYard(P, 60, 250, 110, 230, { name: "the Pool Terrace", holes: true, floor: llM(0xCDBFB2, { map: "trav" }), ftile: 4, skip: ["n", "w", "s"] });
llPlace("pool", 145, 130, "The Pool Terrace");
llPool(P, { kind: "se", cx: 145, cz: 170, rx: 40, rz: 24, p: 4, deep: 1.4, slope: { axis: "x", from: 105, to: 115 }, n: LL.lite ? 48 : 72, name: "the lagoon pool" });
llSpot({ x: 108, z: 170, r: 4, name: "The lagoon pool", verb: "swim", fn: function () { llSwim("the lagoon pool"); } });
var rock = llPiece(P, 160, 172, 0);
llSph(3, llM(0xB8AC9C, { map: "stonewall" }), 0, -0.6, 0, rock, 10).scale.y = 0.4;
llTree(P, 160, 172, "palm", 0.9);
llSolidR(160, 172, 3, 2);
llPool(P, { kind: "rect", x0: 200, x1: 240, z0: 118, z1: 132, deep: 1.6, slope: { axis: "x", from: 200, to: 203 }, name: "the lap pool" });
for (var ln = 1; ln < 4; ln++) {
var lr = llBox(39.6, 0.06, 0.08, llM(ln % 2 ? 0xC83A5A : 0xF2EEEA), 220, -0.14, 118 + ln * 3.5, P);
llKeep(lr);
}
llSpot({ x: 198, z: 125, r: 3, name: "The lap pool", verb: "swim lengths", fn: function () { llSwim("the lap pool"); } });
llPool(P, { kind: "circ", cx: 84, cz: 212, r: 7, deep: 0.5, n: 28, name: "the splash pool" });
var mush = llPiece(P, 84, 212, 0);
llCyl(0.2, 0.3, 1.4, llM(0xF2EEEA), 0, 0.2, 0, mush, 8);
llCyl(0.1, 1.4, 0.4, llM(LLC.pink), 0, 1.1, 0, mush, 14);
var spray = llCyl(1.3, 1.6, 0.9, llOwn(0xC8E8F4, 0.25), 0, 0.55, 0, mush, 16);
spray.material.side = THREE.DoubleSide;
llKeep(spray);
LL.water.push({ m: spray, ph: 0.4 });
llSolidR(84, 212, 0.4, 1.5);
llSpot({ x: 76, z: 212, r: 2.8, name: "The splash pool", verb: "splash about", fn: function () { setStatus("<b>Splash!</b> The mushroom fountain rains softly; the water is warm and only knee deep."); } });
[[214, 150], [226, 158]].forEach(function (q, i) {
var ht = llPiece(P, q[0], q[1], 0);
llCyl(2.6, 2.7, 0.8, llM(0xEDE4D8, { map: "trav" }), 0, 0.4, 0, ht, 20);
llCyl(2.3, 2.3, 0.04, llM(0x7EC8DC, { op: 0.75, e: 0x0E2A34 }), 0, 0.72, 0, ht, 20);
var st = llSph(1.8, llOwn(0xF4F0F4, 0.08), 0, 1.4, 0, ht, 10);
st.scale.y = 0.35;
llKeep(st);
LL.water.push({ m: st, ph: i * 2 });
llSolidR(q[0], q[1], 2.7, 0.8);
llSpot({ x: q[0] - 3.2, z: q[1], r: 2.2, name: "A hot tub", verb: "slip in", fn: function () { llSpaDo("hottub"); } });
});
var cols = [LLC.blush, LLC.lilac, 0xF0E2E8];
var n = 0;
for (var i = 0; i < (LL.lite ? 7 : 12); i++) {
var x = 108 + i * 6.5;
llLounger(P, x, 140, 0, cols[i % 3]);
llLounger(P, x + 2, 140, 0, cols[(i + 1) % 3]);
if (i % 2 === 0)
llParasol(P, x + 1, 138, i % 4 ? "s" : "m");
llLounger(P, x, 201, Math.PI, cols[(i + 2) % 3]);
llLounger(P, x + 2, 201, Math.PI, cols[i % 3]);
if (i % 2 === 1)
llParasol(P, x + 1, 203, i % 4 ? "m" : "s");
n++;
}
llSpot({ x: 130, z: 143, r: 3.4, name: "A sun lounger", verb: "lie in the sun", fn: function () { llRest("a sun lounger by the lagoon"); } });
llSpot({ x: 130, z: 198, r: 3.4, name: "A sun lounger", verb: "lie in the sun", fn: function () { llRest("a sun lounger by the lagoon"); } });
for (var cb = 0; cb < 4; cb++) {
llCabana(P, 243, 150 + cb * 13, -Math.PI / 2, cb + 1);
}
llSpot({ x: 238, z: 163, r: 3.4, name: "The cabanas", verb: "take a cabana", fn: function () { llCabanaCard(); } });
var bar = llPiece(P, 104, 121, 0);
llCyl(5, 5, 1.15, llM(0xA87850, { map: "deck" }), 0, 0.58, 0, bar, 16, true);
llCyl(5.2, 5.2, 0.08, llM(0xEDE4D8, { map: "trav" }), 0, 1.18, 0, bar, 16);
llCyl(3.6, 3.6, 1.1, llM(0xE8E2DA), 0, 0.55, 0, bar, 12);
for (var bp = 0; bp < 6; bp++) {
var ba = bp / 6 * 6.283;
llCyl(0.1, 0.1, 3.4, llM(0x6A4E36), Math.cos(ba) * 4.6, 1.7, Math.sin(ba) * 4.6, bar, 6);
}
llCyl(0.3, 7, 2.4, llM(0xC8A870), 0, 4.4, 0, bar, 12);
for (var bs = 0; bs < 10; bs++) {
var sa = bs / 10 * 6.283;
var sx = 104 + Math.cos(sa) * 6, sz = 121 + Math.sin(sa) * 6;
if (sz < 114)
continue;
llCyl(0.25, 0.25, 0.06, llM(LLC.rose), sx, 0.78, sz, P, 10);
llCyl(0.04, 0.04, 0.76, llGold(), sx, 0.38, sz, P, 5);
}
llSolidR(104, 121, 5.2, 1.2);
llSign(P, ["THE PINK PARASOL", "pool bar"], 3.6, 0.9, 104, 3.3, 126.1, 0, "#C87AA0", "#FFF4F8");
llSpot({ x: 104, z: 127.6, r: 2.6, name: "The Pink Parasol pool bar", verb: "order", fn: function () { llMenuCard("poolbar"); } });
llStaff({ title: "Pool bar attendant", x: 104, z: 124.4, ry: 0, seed: "pbar", talk: "poolbar" });
llGuardChair(P, 145, 198, Math.PI);
llStaff({ title: "Lifeguard", x: 145, z: 198, y: 2.45, ry: Math.PI, seed: "guard1", talk: "lifeguard" });
llStaff({ title: "Lifeguard", x: 206, z: 134.6, ry: Math.PI, seed: "guard2" });
var th = llPiece(P, 70, 122, Math.PI / 2);
llBox(4, 2.8, 3, llM(0xF2EEEA), 0, 1.4, 0, th);
llBox(4.4, 0.2, 3.6, llM(0xC87AA0, { map: "stripe" }), 0, 2.9, 0.2, th);
llBox(3.6, 1.0, 0.6, llM(0xE8E2DA), 0, 0.5, 1.7, th);
for (var tw = 0; tw < 6; tw++)
llBox(0.5, 0.25, 0.4, llM([0xF0EAEA, LLC.pink, LLC.lilac][tw % 3]), -1.3 + tw * 0.52, 1.12, 1.7, th);
llSolid(70, 122, 1.6, 2.2, 0, 2.9);
llSpot({ x: 73.6, z: 122, r: 2.4, name: "The towel hut", verb: "take a fresh towel", fn: function () { setStatus("<b>A thick rose-pink towel</b>, warm from the press. The attendant hands you a bottle of water too."); } });
llStaff({ title: "Pool attendant", x: 72.4, z: 125, ry: Math.PI / 2, seed: "pattend", wander: 6 });
llPlane(16, 12, llM(0xE8F0E0, { map: "grass" }), 226, 0.03, 212, P, 4);
for (var ym = 0; ym < 8; ym++)
llBox(0.7, 0.02, 1.9, llM([LLC.lilac, LLC.pink, 0x8ABCAA][ym % 3]), 220 + (ym % 4) * 3.6, 0.05, 208 + Math.floor(ym / 4) * 5, P);
llStaff({ title: "Yoga instructor", x: 232, z: 212, ry: -Math.PI / 2, seed: "yoga", talk: "yoga" });
llSpot({ x: 226, z: 212, r: 5, name: "The yoga lawn", verb: "join the class", fn: function () { llYoga(); } });
[[64, 114], [64, 226], [246, 114], [246, 226], [190, 114], [160, 114], [100, 226], [190, 226], [124, 226], [176, 140], [176, 201], [96, 150], [96, 190]].forEach(function (q, i) { llTree(P, q[0], q[1], "palm", 1 + ((i * 3) % 3) * 0.12); });
[[80, 140], [80, 180], [190, 186], [200, 200]].forEach(function (q, i) { llRoseBed(P, q[0], q[1], 6, 4, 90 + i); });
[[100, 140], [190, 140], [100, 201], [190, 201], [200, 145], [200, 195]].forEach(function (q) { llLamp(P, q[0], q[1], 3); });
llSign(P, ["THE ROSEWATER SPA →"], 3.6, 0.6, 145, 3.2, 229.7, Math.PI);
llSign(P, ["THE GARDEN PAVILION", "dominoes · spades · farkle · hearts · gin"], 5, 1, 95, 3.6, 229.7, Math.PI, "#3A1A4A", "#E8CFA0");
LL.seated = LL.seated || [];
},
function (G, M) {
var V = llWing(G, "pavilion", 60, 130, 230, 300);
llRoom(V, 60, 130, 230, 300, { name: "the Garden Pavilion", h: 7, wall: llM(0xF0E8EE, { map: "damask" }), floor: M.mParq, ftile: 2, ceil: llM(0xF0E4EC, { map: "coffer" }),
gaps: [{ s: "n", c: 95, w: 5 }, { s: "w", c: 265, w: 4 }], skip: ["w"], hemi: 1.3 });
llUpper(V, 60.3, 230, 60.3, 300, 4.15, 7, llM(0xF0E8EE, { map: "damask" }));
llPlace("pavilion", 95, 265, "The Garden Pavilion: dominoes, spades, farkle, hearts, gin");
llSign(V, ["THE GARDEN PAVILION", "table games, every day"], 6, 1.3, 95, 5.2, 299.6, Math.PI, "#3A1A4A", "#E8CFA0");
var felt = llM(0xE0D4E8, { map: "felt" }), wood = llM(LLC.walnut);
var T = [["spades", 70, 244, 4], ["spades", 82, 244, 4], ["spades", 94, 244, 4], ["hearts", 106, 244, 4], ["hearts", 118, 244, 4],
["dominoes", 70, 258, 4], ["dominoes", 82, 258, 4], ["dominoes", 94, 258, 4], ["gin", 106, 258, 2], ["gin", 118, 258, 2],
["farkle", 76, 272, 4], ["farkle", 92, 272, 4], ["farkle", 108, 272, 4]];
T.forEach(function (q) {
var g = llPiece(V, q[1], q[2], 0), game = q[0];
if (game === "farkle") {
llCyl(1.1, 1.1, 0.06, felt, 0, 0.78, 0, g, 24);
llCyl(1.16, 1.16, 0.1, llGold(), 0, 0.74, 0, g, 24);
llCyl(0.12, 0.18, 0.72, wood, 0, 0.36, 0, g, 8);
llCyl(0.5, 0.5, 0.06, wood, 0, 0.82, 0, g, 16);
for (var d = 0; d < 6; d++) {
var db = llBox(0.09, 0.09, 0.09, llM(0xF4F0EC), -0.25 + d * 0.1, 0.88, ((d * 7) % 3 - 1) * 0.12, g);
db.rotation.y = d * 0.7;
}
llSolidR(q[1], q[2], 1.2, 1);
}
else {
llBox(1.5, 0.06, 1.5, felt, 0, 0.78, 0, g);
llBox(1.62, 0.1, 1.62, wood, 0, 0.72, 0, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (p) { llBox(0.08, 0.7, 0.08, llGold(), p[0] * 0.68, 0.35, p[1] * 0.68, g); });
if (game === "dominoes") {
for (var t = 0; t < 7; t++)
llBox(0.08, 0.02, 0.16, llM(0xF4F0EC), -0.4 + t * 0.12, 0.82, 0.1 * (t % 2), g);
for (var t2 = 0; t2 < 7; t2++) {
llBox(0.08, 0.16, 0.04, llM(0xF4F0EC), -0.36 + t2 * 0.12, 0.89, 0.58, g);
}
}
else {
for (var c = 0; c < 4; c++)
llBox(0.12, 0.006, 0.17, llM(c % 2 ? 0xA02A4A : 0xE6E0DA), -0.2 + c * 0.14, 0.815, 0, g);
llBox(0.12, 0.04, 0.17, llM(LLC.purple), 0.5, 0.83, -0.5, g);
}
llSolidR(q[1], q[2], 0.95, 1);
}
var seats = q[3] === 2 ? [0, Math.PI] : [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
seats.forEach(function (a) { llChair(V, q[1] + Math.sin(a) * 1.3, q[2] + Math.cos(a) * 1.3, a + Math.PI, game === "farkle" ? LLC.rose : LLC.purple); });
var nm = { spades: "A Spades table", hearts: "A Hearts table", dominoes: "A dominoes table", gin: "A Gin Rummy table", farkle: "A Farkle table" }[game];
llSpot({ x: q[1], z: q[2] + 2.1, r: 2, name: nm, verb: "sit down", fn: function () { llTableMenu(game); } });
llSpot({ x: q[1], z: q[2] - 2.1, r: 2, name: nm, verb: "sit down", fn: function () { llTableMenu(game); } });
});
llCounter(V, 95, 297, 6, Math.PI, { col: LLC.cream, panel: LLC.blush });
llSpot({ x: 95, z: 294.6, r: 2.6, name: "The games host: open tables, rules and lessons", verb: "ask", fn: function () { llTablesLobby(null); } });
llStaff({ title: "Games host", x: 95, z: 298.2, ry: Math.PI, seed: "gameshost", talk: "gameshost" });
llStaff({ title: "Games host", x: 100, z: 252, ry: 0, seed: "gameshost2", wander: 10 });
llBoard(V, "tables", 128.6, 3.2, 265, -Math.PI / 2, 6, 3.6);
llSpot({ x: 126, z: 265, r: 2.6, name: "Tables open now", verb: "read", fn: function () { llTablesLobby(null); } });
for (var w = 0; w < 5; w++) {
llWindow(V, 62 + w * 14 + 6, 3.2, 299.75, Math.PI, 2.6, 3.2);
}
for (var w2 = 0; w2 < 3; w2++)
llWindow(V, 60.25, 3.2, 240 + w2 * 10, Math.PI / 2, 2.6, 3.2);
for (var k = 0; k < 3; k++)
llChandelier(V, 74 + k * 21, 6.4, 258, 1.1, { tiers: 3 });
llCakeCase(V, 121, 296, 4, Math.PI);
llCounter(V, 121, 292.4, 4, Math.PI, { col: LLC.cream, panel: LLC.pink });
llSpot({ x: 121, z: 290.2, r: 2.4, name: "The pavilion tea counter", verb: "order", fn: function () { llMenuCard("tea"); } });
[[62, 232], [128, 232], [62, 298], [128, 288]].forEach(function (q) { llPlant(V, q[0], q[1], "palm", 1.3); });
LL.seated = LL.seated || [];
[[82, 244], [94, 258], [92, 272], [118, 244]].forEach(function (q, i) { for (var s = 0; s < (LL.lite ? 1 : 2); s++) {
var a = s * Math.PI / 2 + Math.PI / 2;
LL.seated.push({ x: q[0] + Math.sin(a) * 1.25, z: q[1] + Math.cos(a) * 1.25, ry: a + Math.PI, seed: "pav" + i + "_" + s });
} });
},
function (G, M) {
var S = llWing(G, "spa", 130, 250, 230, 300), soft = llM(0xF4E8EE, { map: "damask" }), stone = llM(0xEDE4D8, { map: "trav" });
llRoom(S, 130, 160, 230, 250, { name: "the Rosewater Spa", h: 5, wall: soft, floor: M.mMarble, ftile: 2, gaps: [{ s: "n", c: 145, w: 5 }, { s: "e", c: 240, w: 3 }, { s: "s", c: 145, w: 3 }], skip: ["w"], hemi: 1.3 });
llPlace("spa", 145, 240, "The Rosewater Spa");
llCounter(S, 145, 246, 6, Math.PI, { col: LLC.cream, panel: LLC.blush });
llSign(S, ["THE ROSEWATER SPA"], 4.4, 0.8, 145, 3.6, 249.7, Math.PI, "#F4E2EA", "#6A3482");
llShelves(S, 131, 238, Math.PI / 2, 4);
llVase(S, 142.6, 1.11, 246, 1.1);
llVase(S, 147.4, 1.11, 246, 1.1);
llSpot({ x: 145, z: 243.6, r: 2.8, name: "Spa reception: treatments and the thermal rooms", verb: "ask", fn: function () { llSpaCard(); } });
llStaff({ title: "Spa receptionist", x: 145, z: 247.6, ry: Math.PI, seed: "spare" });
llStaff({ title: "Spa director", x: 136, z: 236, ry: Math.PI / 2, seed: "spadir", talk: "spa" });
[[152, 233], [156, 233]].forEach(function (q) { llRectTable(S, q[0], q[1], 1.4, 0.6, 0, { cloth: false, top: LLC.cream }); llChair(S, q[0], q[1] + 0.9, Math.PI, LLC.pink); llChair(S, q[0], q[1] - 0.9, 0, LLC.lav); });
llSpot({ x: 154, z: 235.6, r: 2.4, name: "The nail bar", verb: "have your nails done", fn: function () { llSpaDo("nails"); } });
llRoom(S, 160, 200, 230, 250, { name: "the relaxation room", h: 5, wall: soft, floor: llM(0xF0E0EA, { map: "rosecarpet" }), gaps: [{ s: "w", c: 240, w: 3 }, { s: "e", c: 240, w: 3 }], skip: ["w"], hemi: 1.2 });
for (var c = 0; c < 6; c++)
llChaise(S, 164 + c * 5.6, 247.8, 0, c % 2 ? LLC.lilac : LLC.blush);
var fw = llPiece(S, 180, 230.4, 0);
llBox(10, 3.4, 0.3, stone, 0, 1.7, 0, fw);
var sheet = llBox(9, 3, 0.05, llOwn(0xC8E0EC, 0.3), 0, 1.8, 0.2, fw);
llKeep(sheet);
LL.water.push({ m: sheet, ph: 2.2, still: 1 });
llBox(10, 0.4, 1.2, stone, 0, 0.2, 0.6, fw);
llSolid(180, 231, 5, 0.8, 0, 1.2);
llRectTable(S, 192, 240, 1.6, 0.8, 0, { cloth: false, top: LLC.cream });
llTeaSet(S, 192, 0.8, 240);
llSpot({ x: 180, z: 244, r: 4, name: "The relaxation room", verb: "lie back and rest", fn: function () { llRest("the relaxation room"); } });
llRoom(S, 200, 250, 230, 250, { name: "the changing rooms", h: 4.2, wall: llM(0xE8DCE6), floor: M.mTile, ftile: 1, gaps: [{ s: "w", c: 240, w: 3 }, { s: "s", c: 225, w: 3 }], skip: ["w"], hemi: 1.3 });
llLockers(S, 214, 230.6, 0, 14);
llLockers(S, 236, 230.6, 0, 10);
for (var sh = 0; sh < 5; sh++)
llStall(S, 240 + sh * 1.6 > 248 ? 247 : 202 + sh * 1.6, 249.3, Math.PI);
llBasin(S, 232, 249.4, Math.PI, 3);
llSpot({ x: 206, z: 246.6, r: 2.6, name: "The showers", verb: "take a hot shower", fn: function () { llSpaDo("shower"); } });
llSpot({ x: 220, z: 236, r: 2.6, name: "The lockers", verb: "change into a robe", fn: function () { setStatus("<b>A soft rose robe and slippers</b>, with GiGi's gold G on the pocket. Your things are safe in locker " + (10 + Math.floor(Math.random() * 80)) + "."); } });
llRoom(S, 130, 250, 250, 256, { name: "the treatment corridor", h: 3.8, wall: soft, floor: M.mMarble, ftile: 2,
gaps: [{ s: "n", c: 145, w: 3 }, { s: "n", c: 225, w: 3 }, { s: "s", c: 145, w: 2.4 }, { s: "s", c: 160, w: 2.4 }, { s: "s", c: 175, w: 2.4 }, { s: "s", c: 190, w: 2.4 }, { s: "s", c: 215, w: 4 }], skip: ["n", "s", "w"], hemi: 1.25 });
var treat = [["massage", "the rose massage room", 145], ["facial", "the facial room", 160], ["hotstone", "the hot stone room", 175], ["aroma", "the aromatherapy room", 190]];
treat.forEach(function (t, i) {
var x0 = 137.5 + i * 15, x1 = x0 + 15;
if (i === 0)
x0 = 130;
llRoom(S, x0, x1, 256, 300, { name: t[1], h: 3.8, wall: i % 2 ? llM(0xE8D8E6) : soft, floor: llM(0xE8DCEC, { map: "carpet" }), gaps: [{ s: "n", c: t[2], w: 2.4 }], skip: i === 3 ? ["w", "e"] : ["w"], hemi: 1.1 });
var tb = llPiece(S, t[2], 270, 0);
llBox(0.8, 0.1, 2.1, llM(0xF4ECEE), 0, 0.8, 0, tb);
llBox(0.7, 0.75, 0.12, llM(LLC.walnut), 0, 0.38, -0.9, tb);
llBox(0.7, 0.75, 0.12, llM(LLC.walnut), 0, 0.38, 0.9, tb);
llBox(0.4, 0.14, 0.3, llM(0xF0EAEA), 0, 0.92, -0.82, tb);
llSolid(t[2], 270, 0.45, 1.1, 0, 1);
llCabinet(S, x1 - 1, 262, -Math.PI / 2, 1.4, 1.0, LLC.cream);
llCandelabra(S, x1 - 1, 1.0, 262);
llPlant(S, x0 + 1.4, 298.4, "orchid", 1.2);
for (var cn = 0; cn < 5; cn++) {
var cf = llSph(0.03, llOwn(0xFFC070), x0 + 2 + cn * 0.4, 0.08, 298.6, S, 5);
LL.flames.push({ m: llKeep(cf), ph: cn + i });
}
llStaff({ title: "Spa therapist", x: t[2] + 1.2, z: 268, ry: -Math.PI / 2, seed: "ther" + i });
llSpot({ x: t[2], z: 266.6, r: 2.6, name: t[1].replace(/^the /, "The "), verb: "have a treatment", fn: function () { llSpaDo(t[0]); } });
});
llRoom(S, 197.5, 250, 256, 300, { name: "the thermal suite", holes: true, h: 5, wall: stone, floor: llM(0xEDE4D8, { map: "trav" }), ftile: 3, gaps: [{ s: "n", c: 215, w: 4 }], skip: [], hemi: 1.25 });
llPool(S, { kind: "rect", x0: 204, x1: 232, z0: 266, z1: 290, deep: 1.2, slope: { axis: "z", from: 266, to: 270 }, col: 0x9ED8E4, name: "the warm pool" });
llSpot({ x: 218, z: 263.4, r: 3, name: "The warm pool", verb: "float a while", fn: function () { llSpaDo("warmpool"); } });
var sau = llPiece(S, 243, 262, 0);
llBox(9.4, 3, 8, llM(0xB88858, { map: "deck" }), 0, 1.5, 0, sau);
llBox(1.2, 2.2, 0.1, llM(0x8A5A38), -3, 1.1, 4.02, sau);
llBox(0.8, 0.8, 0.06, llM(0xF0D8B8, { e: 0x5A3A1A }), 1.5, 1.8, 4.02, sau);
llSign(sau, ["SAUNA"], 1.6, 0.4, -3, 2.6, 4.06, 0, "#5A3A1A", "#F0D8B8");
llSolid(243, 262, 4.7, 4, 0, 3);
llSpot({ x: 240, z: 267.6, r: 2.4, name: "The sauna", verb: "step into the heat", fn: function () { llSpaDo("sauna"); } });
var stm = llPiece(S, 243, 288, 0);
llBox(9.4, 3, 8, llM(0xE0E8EE, { map: "pooltile" }), 0, 1.5, 0, stm);
llBox(1.2, 2.2, 0.06, llM(0xD0E0E8, { op: 0.6 }), -3, 1.1, -4.02, stm);
llSign(stm, ["STEAM ROOM"], 2, 0.4, -3, 2.6, -4.06, Math.PI, "#3A5A6A", "#F0F8FF");
llSolid(243, 288, 4.7, 4, 0, 3);
var puff = llSph(2.4, llOwn(0xF4F4F8, 0.07), 243, 3.4, 288, S, 10);
puff.scale.y = 0.4;
llKeep(puff);
LL.water.push({ m: puff, ph: 1 });
llSpot({ x: 240, z: 282.4, r: 2.4, name: "The steam room", verb: "breathe the eucalyptus", fn: function () { llSpaDo("steam"); } });
llPool(S, { kind: "circ", cx: 204, cz: 296, r: 2.4, deep: 1.2, n: 20, col: 0xB8E0EC, name: "the cold plunge" });
llSpot({ x: 207.4, z: 293, r: 2, name: "The cold plunge", verb: "take the plunge", fn: function () { setStatus("<b>Brrr!</b> Icy and bright. You come up tingling all over, and the warm pool feels twice as lovely after."); } });
for (var lg = 0; lg < 5; lg++)
llLounger(S, 236, 272 + lg * 2.2, -Math.PI / 2, LLC.blush);
for (var k2 = 0; k2 < 2; k2++)
llChandelier(S, 218, 4.6, 272 + k2 * 12, 0.9, { tiers: 2 });
llPlant(S, 199, 258, "palm", 1.4);
llPlant(S, 248.4, 298.4, "palm", 1.4);
},
function (G) {
LL.floor = LL.floor || 1;
var mCarpet = llM(0xE8DCEC, { map: "carpet" }), mRose = llM(0xF0E0EA, { map: "rosecarpet" }), mWall = llM(0xE8DCEC, { map: "damask" }), mPink = llM(0xC88AAE, { map: "pinkdamask" }), mTile = llM(0xE6E0E8, { map: "tile" }), mMarble = llM(0xD2C6CE, { map: "marble" }), mStaffWall = llM(0xB8A8C0), mStaffFloor = llM(0x8A7A8A);
var F = llWing(G, "floors", LL_FLOOR_X, 576, -14, 14), X = LL_FLOOR_X;
llRoom(F, X, X + 12, -6, 6, { name: "the lift lobby", h: 3.2, wall: mPink, floor: mMarble, ftile: 2, gaps: [{ s: "n", c: X + 6, w: 2.4 }, { s: "s", c: X + 6, w: 2.4 }], skip: ["e"], hemi: 1.2 });
llLiftDoors(F, X + 0.2, [-3.2, 3.2]);
llSpot({ x: X + 2.4, z: 0, r: 3, name: "The lifts", verb: "choose a floor", fn: function () { llLiftCard(); } });
var fs = llFloorSign(F, "lobby", 0, X + 11.8, 2.4, 0, -Math.PI / 2, 2.2, 0.9);
fs.big = true;
llPlant(F, X + 11, -5, "orchid", 1.1);
llPlant(F, X + 11, 5, "orchid", 1.1);
llSideboard(F, X + 6, -5.5, 0, 2, LLC.cream);
llVase(F, X + 6, 0.9, -5.5, 1);
llRoom(F, X, X + 12, -14, -6, { name: "the linen room", h: 3.2, wall: mStaffWall, floor: mStaffFloor, ceil: llM(0xD0C8D0), gate: "staff", skip: ["s", "e"], skirt: 0x6A5A6A });
for (var s = 0; s < 3; s++)
llShelves(F, X + 2.4 + s * 3.6, -13.4, 0, 3);
for (var t = 0; t < 6; t++)
llBox(0.5, 0.18 + (t % 3) * 0.06, 0.4, llM(0xF0EAEA), X + 1.6 + t * 0.6, 1.25, -13.3, F);
llSpot({ x: X + 6, z: -10, r: 3, name: "The linen room: fresh sheets and towels for the rooms", verb: "work", fn: llWorkHere });
llRoom(F, X, X + 12, 6, 14, { name: "the stairwell", h: 3.2, wall: llM(0xE6DCE6), floor: mMarble, ftile: 2, skip: ["n", "e"], hemi: 1.2 });
for (var st = 0; st < 8; st++)
llBox(1.6, 0.2, 0.32, llM(0xD8CCD4, { map: "marble" }), X + 1.2, 0.1 + st * 0.2, 7.2 + st * 0.32, F);
llBox(0.06, 1, 3, llGold(), X + 2.05, 1.4, 8.4, F);
llSolid(X + 1.2, 8.4, 0.9, 1.4, 0, 3);
llSpot({ x: X + 5, z: 10, r: 3, name: "The stairs", verb: "take the stairs", fn: function () { llLiftCard(true); } });
var gaps = [];
llRoomSlots().forEach(function (R) { gaps.push({ s: R.north ? "n" : "s", c: R.door, w: 1.4, h: 2.6 }); });
gaps.push({ s: "w", c: 0, w: 4 });
llRoom(F, X + 12, 576, -2, 2, { name: "the corridor", h: 3.2, wall: mWall, floor: mRose, ftile: 2, gaps: gaps, skip: ["w"], hemi: 1.25 });
for (var c = 0; c < 8; c++) {
llSconce(F, X + 16 + c * 8, 2.4, -1.8, 0);
llSconce(F, X + 16 + c * 8, 2.4, 1.8, Math.PI);
}
llRug(F, 544, 0, 60, 2.6, 0, LLC.rose, LLC.gold, 0.02);
llBox(0.6, 0.9, 0.4, llM(LLC.cream), 575.4, 0.45, 0, F);
llVase(F, 575.4, 0.9, 0, 1.2);
llSolid(575.4, 0, 0.4, 0.3, 0, 1);
llPainting(F, 575.8, 1.8, 0, -Math.PI / 2, 1.4, 1.0, 7);
llRoomSlots().forEach(function (R) { llGuestRoom(F, R, { mCarpet: mCarpet, mWall: mWall, mTile: mTile, mMarble: mMarble }); });
llPlace("floors", X + 6, 0, "The guest floors (by the lifts)");
llStaff({ title: "Room attendant", x: 540, z: 0.6, ry: Math.PI / 2, seed: "ra_fl", wander: 18 });
llBuildPenthouses(G, { mCarpet: mCarpet, mRose: mRose, mWall: mWall, mPink: mPink, mTile: mTile, mMarble: mMarble });
llFloorsLater();
llFloorSignsDraw();
},
function () {
var X = LL_FLOOR_X + 12, W = [9, 9, 9, 9, 14, 14], out = [], at = X;
W.forEach(function (w, i) { out.push({ k: i + 1, x0: at, x1: at + w, north: true, kind: LL_ROOM_KIND[i + 1] }); out.push({ k: i + 7, x0: at, x1: at + w, north: false, kind: LL_ROOM_KIND[i + 7] }); at += w; });
out.forEach(function (R) { R.door = R.x0 + (R.kind === "deluxe" ? 5.4 : 4.4); });
return out.sort(function (a, b) { return a.k - b.k; });
},
function (G, kind, k, x, y, z, ry, w, h) {
var cv = document.createElement("canvas");
cv.width = 256;
cv.height = Math.round(256 * h / w);
var tex = new THREE.CanvasTexture(cv), g = llPiece(G, x, z, ry, y);
llBox(w + 0.08, h + 0.08, 0.04, llGold(), 0, 0, 0, g);
llKeep(wMesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, color: 0xE0D8E0 }), 0, 0, 0.03, g));
var S = { cv: cv, tex: tex, kind: kind, k: k };
LL.floorSigns.push(S);
return S;
},
function () {
var f = LL.floor || 2;
if (f < 2 || f > 5)
f = 2;
(LL.rooms || []).forEach(function (R) { if (R.slot && R.x0 < 650)
R.name = R.name.replace(/^room \d+/, "room " + (f * 100 + R.slot)); });
(LL.floorSigns || []).forEach(function (S) {
var x = S.cv.getContext("2d"), W = S.cv.width, H = S.cv.height;
x.fillStyle = "#3A1A4A";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C9A868";
x.lineWidth = 6;
x.strokeRect(6, 6, W - 12, H - 12);
x.textAlign = "center";
x.fillStyle = "#E8CFA0";
if (S.kind === "lobby") {
x.font = "bold " + Math.round(H * 0.42) + "px Georgia";
x.fillText("Floor " + f, W / 2, H * 0.52);
x.font = Math.round(H * 0.18) + "px Georgia";
x.fillText("rooms " + (f * 100 + 1) + " to " + (f * 100 + 12), W / 2, H * 0.8);
}
else if (S.kind === "ph") {
x.font = "bold " + Math.round(H * 0.36) + "px Georgia";
x.fillText("The Penthouses", W / 2, H * 0.5);
x.font = Math.round(H * 0.18) + "px Georgia";
x.fillText("601 · 602", W / 2, H * 0.8);
}
else {
var no = S.k > 100 ? S.k : f * 100 + S.k;
x.font = "bold " + Math.round(H * 0.5) + "px Georgia";
x.fillText(String(no), W / 2, H * 0.58);
x.font = Math.round(H * 0.17) + "px Georgia";
x.fillText(S.k > 100 ? "Penthouse" : (LL_ROOM_KIND[S.k] === "deluxe" ? "Deluxe" : "Classic"), W / 2, H * 0.86);
}
S.tex.needsUpdate = true;
});
},
function (G, R, M) {
var s = R.north ? -1 : 1, x0 = R.x0, x1 = R.x1, deluxe = R.kind === "deluxe";
function Z(d) { return s * d; }
function RY(ry) { return s < 0 ? ry : Math.PI - ry; }
var cs = R.north ? "s" : "n", out = R.north ? "n" : "s", zA = Math.min(Z(2), Z(14)), zB = Math.max(Z(2), Z(14));
var name = "room " + R.k;
llRoom(G, x0, x1, zA, zB, { name: name, h: 3.2, wall: deluxe ? llM(0xF0E4EE, { map: "damask" }) : M.mWall, floor: M.mCarpet, gate: "room", slot: R.k, skip: R.k === 1 || R.k === 7 ? [cs] : [cs, "w"], hemi: 1.2,
ceil: llM(0xF0E4F0) });
var bw = deluxe ? 4.4 : 3.4, bd = deluxe ? 7 : 6, bz0 = Math.min(Z(2), Z(bd)), bz1 = Math.max(Z(2), Z(bd));
llRoom(G, x0, x0 + bw, bz0, bz1, { name: name + "'s bathroom", h: 3.2, wall: llM(0xF2EEF0, { map: "tile" }), tile: 1, floor: M.mTile, ftile: 1, fy: 0.02, ceil: false, skip: [cs, "w"], gaps: [{ s: "e", c: Z(3.4), w: 1.0, h: 2.4 }], skirt: 0xC8C0C8, gate: "room", slot: R.k });
llBath(G, x0 + bw / 2, Z(bd - 0.65), RY(Math.PI / 2));
llBasin(G, x0 + 0.45, Z(3.6), RY(Math.PI / 2));
llMirror(G, x0 + 0.2, 1.7, Z(3.6), RY(Math.PI / 2), 0.9, 1);
var wc = llPiece(G, x0 + bw - 0.5, Z(2.6), RY(-Math.PI / 2));
llBox(0.42, 0.42, 0.6, llM(0xF4F0F2), 0, 0.21, 0.05, wc);
llBox(0.44, 0.06, 0.5, llM(0xF4F0F2), 0, 0.45, 0.1, wc);
llBox(0.44, 0.4, 0.2, llM(0xF4F0F2), 0, 0.6, -0.22, wc);
llSolid(x0 + bw - 0.5, Z(2.6), 0.3, 0.35, 0, 0.9);
if (deluxe) {
var sh = llPiece(G, x0 + bw - 0.65, Z(bd - 0.7), 0);
llBox(1.1, 2.1, 0.04, llM(0xD8E8F0, { op: 0.35 }), 0, 1.05, s * 0.55, sh);
llBox(0.04, 2.1, 1.1, llM(0xD8E8F0, { op: 0.35 }), -0.55, 1.05, 0, sh);
llCyl(0.12, 0.12, 0.04, llSilver(), 0, 2.15, 0, sh, 10);
}
for (var tw = 0; tw < 3; tw++)
llBox(0.4, 0.12, 0.28, llM([0xF4F0F0, LLC.blush, 0xF4F0F0][tw]), x0 + bw - 0.3, 0.9 + tw * 0.14, Z(4.5), G);
llSpot({ x: x0 + bw / 2, z: Z(bd - 1.6), r: 1.6, name: "The bath", verb: "have a long hot bath", fn: function () { llHotelRest("wash"); } });
var bx = x1 - (deluxe ? 1.6 : 1.45), bz = Z(deluxe ? 10 : 9.6);
llBed(G, bx, bz, -Math.PI / 2, { w: deluxe ? 2.2 : 1.8, l: 2.2, col: deluxe ? LLC.velvet : LLC.purple, quilt: deluxe ? LLC.rose : LLC.blush, canopy: deluxe && !LL.lite });
llPainting(G, x1 - 0.2, 2.3, bz, -Math.PI / 2, 1.6, 0.8, R.k + 20);
llSpot({ x: bx - 1.8, z: bz, r: 1.8, name: "The bed", verb: "sleep", fn: function () { llHotelRest("sleep"); } });
var wx = (x0 + x1) / 2 + (deluxe ? 1.5 : 1);
llWindow(G, wx, 1.7, Z(13.75), RY(0), deluxe ? 3.2 : 2.4, 1.8);
llArmchair(G, x0 + bw + 0.8, Z(12.6), RY(Math.PI * 0.8), LLC.lilac);
if (deluxe) {
llSofa(G, x0 + 1.2, Z(10.5), RY(Math.PI / 2), LLC.blush, 2.4);
llCoffeeTable(G, x0 + 2.6, Z(10.5), RY(Math.PI / 2), { w: 1.1, d: 0.6 });
llWindow(G, wx - 5, 1.7, Z(13.75), RY(0), 2.4, 1.8);
}
llDesk(G, x0 + 0.6, Z(deluxe ? 13 : 9.6), RY(Math.PI / 2), { w: 1.4, col: LLC.cream });
llChair(G, x0 + 1.5, Z(deluxe ? 13 : 9.6), RY(-Math.PI / 2), LLC.lav);
llTV(G, x0 + 0.12, 1.65, Z(deluxe ? 8 : 9.6), RY(Math.PI / 2), deluxe ? 1.6 : 1.2);
llWardrobe(G, x1 - 0.4, Z(3.4), RY(-Math.PI / 2), 1.4);
var mb = llPiece(G, x0 + bw + 0.45, Z(6.4), RY(Math.PI / 2));
llBox(0.7, 0.85, 0.5, llM(LLC.walnut), 0, 0.43, 0, mb);
llBox(0.72, 0.04, 0.52, llGold(), 0, 0.87, 0, mb);
llBox(0.08, 0.24, 0.08, llM(0x6A2A3A), -0.2, 1.0, 0, mb);
llBox(0.08, 0.2, 0.08, llM(0xE8E0B8), 0.0, 0.98, 0, mb);
llSolid(x0 + bw + 0.45, Z(6.4), 0.3, 0.35, 0, 1);
llSpot({ x: x0 + bw + 1.4, z: Z(6.4), r: 1.4, name: "The minibar", verb: "open it", fn: function () { llMenuCard("minibar"); } });
llBox(0.2, 0.08, 0.16, llM(LLC.cream), x0 + 0.6, 0.82, Z((deluxe ? 13 : 9.6) - 0.4), G);
llSpot({ x: x0 + 1.6, z: Z((deluxe ? 13 : 9.6) - 0.9), r: 1.3, name: "The telephone: room service", verb: "ring down", fn: function () { llMenuCard("roomservice"); } });
llRug(G, (x0 + bw + x1) / 2 - 0.4, Z(9.6), deluxe ? 5 : 3.6, 3, 0, deluxe ? LLC.rose : LLC.lilac, LLC.gold, 0.02);
llPlant(G, x1 - 0.6, Z(13.2), "orchid", 1);
llFloorSign(G, "room", R.k, R.door + 1.15, 1.7, Z(1.86), R.north ? 0 : Math.PI, 0.42, 0.3);
llSpot({ x: R.door, z: Z(1.2), r: 1.2, name: "The door of room " + R.k, verb: "knock", fn: function () { llRoomDoor(R.k); } });
},
function (G, M) {
var X = LL_PH_X, P = llWing(G, "penthouse", X, 790, -30, 30);
llRoom(P, X, X + 12, -6, 6, { name: "the penthouse lobby", h: 4, wall: M.mPink, floor: M.mMarble, ftile: 2, skip: ["e"], hemi: 1.25 });
llTBox(0.3, 4, 4, M.mPink, X + 12, 2, 0, P, 3);
llSolid(X + 12, 0, 0.15, 2);
llLiftDoors(P, X + 0.2, [-3.2, 3.2]);
llSpot({ x: X + 2.4, z: 0, r: 3, name: "The lifts", verb: "choose a floor", fn: function () { llLiftCard(); } });
llFloorSign(P, "ph", 0, X + 11.8, 2.4, 0, -Math.PI / 2, 2.2, 0.9);
llChandelier(P, X + 6, 3.8, 0, 0.9);
llRug(P, X + 6, 0, 8, 8, 0, LLC.rose, LLC.gold, 0.02);
llPlant(P, X + 10.8, -5, "palm", 1.2);
llPlant(P, X + 10.8, 5, "palm", 1.2);
llStaff({ title: "Penthouse butler", x: X + 9, z: 0, ry: -Math.PI / 2, seed: "phbutler", talk: "phbutler" });
llPlace("penthouse", X + 6, 0, "The penthouse floor");
[1, 2].forEach(function (k) { llPenthouse(P, k, M); });
},
function (G, k, M) {
var s = k === 1 ? -1 : 1, X = LL_PH_X;
function Z(d) { return s * d; }
function RY(ry) { return s < 0 ? ry : Math.PI - ry; }
function ZR(d0, d1) { return [Math.min(Z(d0), Z(d1)), Math.max(Z(d0), Z(d1))]; }
var N = s < 0 ? "n" : "s", S = s < 0 ? "s" : "n", slot = k, nm = "Penthouse 60" + k;
function room(x0, x1, d0, d1, o) {
var zr = ZR(d0, d1), q = { h: 4.2, gate: "room", slot: slot, wall: M.mWall, floor: M.mCarpet, hemi: 1.2, ceil: llM(0xF0E4F0) };
for (var kk in o)
q[kk] = o[kk];
q.skip = (o.skip || []).map(function (c) { return c === "N" ? N : c === "S" ? S : c; });
q.gaps = (o.gaps || []).map(function (g) { return { s: g.s === "N" ? N : g.s === "S" ? S : g.s, c: g.d !== undefined ? Z(g.d) : g.c, w: g.w, h: g.h }; });
return llRoom(G, x0, x1, zr[0], zr[1], q);
}
room(X + 12, X + 42, 2, 18, { name: nm + ": the living room", wall: M.mPink, floor: M.mRose, gaps: [{ s: "w", d: 4, w: 2.4, h: 3 }, { s: "N", c: X + 21, w: 2.4 }, { s: "N", c: X + 40, w: 2.4 }, { s: "e", d: 7, w: 3 }] });
llChandelier(G, X + 27, 4, Z(10), 1.4, { tiers: 3 });
llSofa(G, X + 27, Z(13.5), RY(0), LLC.velvet, 4);
llSofa(G, X + 21.5, Z(10), RY(Math.PI / 2), LLC.blush, 3);
llSofa(G, X + 32.5, Z(10), RY(-Math.PI / 2), LLC.blush, 3);
llCoffeeTable(G, X + 27, Z(10), 0, { w: 2, d: 1 });
llRug(G, X + 27, Z(10), 12, 8, 0, LLC.rose, LLC.gold, 0.02);
llPiano(G, X + 38, Z(4.5), RY(Math.PI));
llFireplace(G, X + 27, Z(17.6), RY(0));
llTV(G, X + 27, 2.6, Z(17.7), RY(0), 2.2);
for (var w = 0; w < 2; w++)
llWindow(G, X + 18 + w * 12, 1.9, Z(2.25), RY(Math.PI), 2.4, 2);
llPainting(G, X + 12.2, 2.2, Z(12), RY(Math.PI / 2), 2, 1.4, 40 + k);
llSpot({ x: X + 27, z: Z(12), r: 3, name: "The penthouse sofas", verb: "put your feet up", fn: function () { llHotelRest("nap"); } });
llSpot({ x: X + 36, z: Z(5.4), r: 2, name: "The penthouse piano", verb: "play", fn: function () { llPlayPiano(); } });
llSpot({ x: X + 20, z: Z(4), r: 1.6, name: "The house telephone: room service", verb: "ring down", fn: function () { llMenuCard("roomservice"); } });
room(X + 42, X + 58, 2, 12, { name: nm + ": the dining room", skip: ["w"], gaps: [{ s: "N", c: X + 50, w: 2 }, { s: "e", d: 7, w: 2.4 }] });
llRectTable(G, X + 50, Z(7), 5, 1.6, 0, { cloth: 0xF0EAE4, top: 0xF6F2EE });
llCandelabra(G, X + 50, 0.8, Z(7));
for (var c = 0; c < 8; c++) {
var cx = X + 48 + (c % 4) * 1.3 - 0.95, side = c < 4 ? -1 : 1;
llChair(G, cx, Z(7) + side * 1.15, side < 0 ? 0 : Math.PI, LLC.velvet);
}
llChandelier(G, X + 50, 4, Z(7), 1);
llSideboard(G, X + 57.6, Z(4), RY(-Math.PI / 2), 2.4, LLC.cream);
room(X + 42, X + 58, 12, 18, { name: nm + ": the kitchen", skip: ["w", "S"], wall: llM(0xF0EAEE), floor: M.mTile, ftile: 1 });
llKitchenRun(G, X + 50, Z(17.6), 10, RY(0));
llFridge(G, X + 57.4, Z(14), RY(-Math.PI / 2));
llIsland(G, X + 49, Z(14.6), 4, 1.2, 0);
llSpot({ x: X + 49, z: Z(13.2), r: 2, name: "The penthouse kitchen", verb: "make a snack", fn: function () { llMenuCard("minibar"); } });
room(X + 58, X + 90, 2, 18, { name: nm + ": the master bedroom", skip: ["w"], wall: llM(0xF0E4EE, { map: "damask" }), gaps: [{ s: "N", c: X + 74, w: 2.4 }] });
llBed(G, X + 86.6, Z(12), -Math.PI / 2, { w: 2.4, l: 2.4, col: LLC.velvet, quilt: LLC.rose, canopy: !LL.lite });
llSpot({ x: X + 84, z: Z(12), r: 2, name: "The great bed", verb: "sleep", fn: function () { llHotelRest("sleep"); } });
llWardrobe(G, X + 59, Z(15), RY(Math.PI / 2), 2);
llVanity(G, X + 66, Z(17.5), RY(0));
llChaise(G, X + 70, Z(11), RY(-Math.PI / 2), LLC.blush);
llWindow(G, X + 66, 1.9, Z(2.25), RY(Math.PI), 3, 2);
llRug(G, X + 80, Z(11), 8, 6, 0, LLC.rose, LLC.gold, 0.02);
llChandelier(G, X + 80, 4, Z(10), 1);
room(X + 78, X + 90, 2, 9, { name: nm + ": the master bathroom", skip: ["e", "S"], wall: llM(0xF2EEF0, { map: "tile" }), floor: M.mMarble, ftile: 1.5, fy: 0.02, ceil: false, gaps: [{ s: "w", d: 5.5, w: 1.2, h: 2.6 }] });
var tub = llPiece(G, X + 84, Z(5.5), 0);
llCyl(1.4, 1.3, 0.6, llM(0xF4F0F2), 0, 0.3, 0, tub, 22);
llCyl(1.25, 1.25, 0.02, llM(0x9ED8E4, { op: 0.75 }), 0, 0.55, 0, tub, 22);
llCyl(0.04, 0.04, 0.9, llGold(), 1.2, 0.8, 0, tub, 6);
llSolidR(X + 84, Z(5.5), 1.35, 0.7);
llSpot({ x: X + 81.6, z: Z(5.5), r: 1.6, name: "The spa bath", verb: "sink into it", fn: function () { llHotelRest("wash"); } });
llBasin(G, X + 89.5, Z(7.6), RY(-Math.PI / 2), 2);
llMirror(G, X + 89.8, 1.7, Z(7.6), RY(-Math.PI / 2), 2, 1);
room(X + 12, X + 30, 18, 30, { name: nm + ": the second bedroom", skip: ["S"], wall: llM(0xEEE4F0, { map: "damask" }), gaps: [{ s: "e", d: 24, w: 1.2, h: 2.6 }] });
llBed(G, X + 21, Z(28.4), RY(0), { w: 2, l: 2.2, col: LLC.purple, quilt: LLC.lilac });
llSpot({ x: X + 21, z: Z(26), r: 1.6, name: "The bed", verb: "sleep", fn: function () { llHotelRest("sleep"); } });
llWindow(G, X + 12.25, 1.9, Z(24), RY(Math.PI / 2), 2.4, 1.8);
llDesk(G, X + 28.6, Z(20.5), RY(-Math.PI / 2), { w: 1.4, col: LLC.cream });
room(X + 30, X + 38, 18, 30, { name: nm + ": the second bathroom", skip: ["w", "S"], wall: llM(0xF2EEF0, { map: "tile" }), floor: M.mTile, ftile: 1, fy: 0.02, ceil: false });
llBath(G, X + 34, Z(28.8), RY(0));
llBasin(G, X + 37.5, Z(21), RY(-Math.PI / 2));
llSpot({ x: X + 34, z: Z(27), r: 1.6, name: "The bath", verb: "have a bath", fn: function () { llHotelRest("wash"); } });
var tz = ZR(18, 30);
llYard(G, X + 38, X + 90, tz[0], tz[1], { name: nm + ": the terrace", h: 1.1, holes: true, floor: llM(0xF2EAE0, { map: "trav" }), ftile: 3, skip: [S, "w"], gate: "room", slot: slot });
llFacade(G, Z(18), X + 38, X + 90, 4.2, [[X + 40, 2.4], [X + 74, 2.4]], s);
llPool(G, { kind: "circ", cx: X + 76, cz: Z(24), r: 2.8, deep: 1.2, n: 24, name: "the plunge pool" });
llSpot({ x: X + 72.6, z: Z(24), r: 1.8, name: "The plunge pool", verb: "take a dip", fn: function () { llSwim("your own plunge pool"); } });
for (var l = 0; l < 3; l++)
llLounger(G, X + 50 + l * 3, Z(26), RY(Math.PI), [LLC.blush, LLC.lilac, 0xF0E2E8][l]);
llParasol(G, X + 53, Z(28), "s");
llRectTable(G, X + 44, Z(23), 1.6, 1.6, 0, { cloth: false, top: 0xF2EEEA });
llChair(G, X + 43, Z(23), RY(Math.PI / 2), LLC.cream);
llChair(G, X + 45, Z(23), RY(-Math.PI / 2), LLC.cream);
[[X + 40, 29], [X + 88, 19.5], [X + 88, 29], [X + 62, 29]].forEach(function (q) { llTree(G, q[0], Z(q[1]), "cypress", 0.6); });
llRoseBed(G, X + 66, Z(21), 6, 2, 70 + k);
llSpot({ x: X + 60, z: Z(28), r: 3, name: "The penthouse terrace", verb: "take in the view", fn: function () { setStatus("<b>Somnucor below, all its lights coming on,</b> and the Lounge's gardens in pink and green under you. The air up here smells of roses."); } });
llFloorSign(G, "room", 600 + k, X + 12.2, 2.1, Z(6.6), RY(Math.PI / 2), 0.5, 0.34);
},
function (force) {
if (!llSigned())
return Promise.resolve(LL.hotel);
if (!force && LL.hotel.at && Date.now() - LL.hotel.at < 20000)
return Promise.resolve(LL.hotel);
LL.hotel.at = Date.now();
return cityRpc("lounge_hotel_state", {}).then(function (o) {
if (o && o.ok !== false) {
LL.hotel.stay = o.stay || null;
LL.hotel.taken = o.taken || [];
LL.hotel.prices = o.prices || null;
LL.hotel.owner = !!o.owner;
LL.hotel.loaded = true;
LL.hotel.noSql = false;
}
return LL.hotel;
}).catch(function (e) { if (llMissing(e))
LL.hotel.noSql = true; return LL.hotel; });
},
function (k) {
var no = (LL.floor || 2) * 100 + k, S = LL.hotel.stay;
if (S && +S.room === no)
return setStatus("<b>Your key card glows rose-gold</b> and the lock clicks open. Welcome back to room " + no + ".");
var busy = (LL.hotel.taken || []).indexOf(no) >= 0;
setStatus(busy ? "<b>A little sign on the handle: “Do not disturb”.</b> Someone is staying in room " + no + "." : "<b>Room " + no + " is made up and waiting.</b> Book it at reception in the Hotel Lobby.");
},
function () {
if (!llSigned())
return worldCard(llHead("Reception", "Welcome to GiGi's Lounge Hotel & Resort.") + "<div>Sign in to book a room.</div>" + llTalkBtn("frontdesk"), { talk: function () { llTalkTo("frontdesk"); } });
llHotelLoad(true).then(function (H) {
var S = H.stay, fns = { talk: function () { llTalkTo("frontdesk"); } }, h = llHead("Reception", "GiGi's Lounge Hotel & Resort: rooms on floors 2 to 5, the penthouses on 6.");
if (H.noSql) {
h += "<div>" + llHotelSoft({ message: "does not exist" }) + "</div>";
return worldCard(h + llTalkBtn("frontdesk"), fns);
}
if (S) {
var left = Math.max(0, Math.ceil((new Date(S.until).getTime() - Date.now()) / 3600000));
h += "<div>You are staying in <b>" + (+S.room > 600 ? "Penthouse " : "room ") + esc(String(S.room)) + "</b> (" + esc(LL_KIND_NAME[S.kind] || S.kind) + "), until " + esc(new Date(S.until).toLocaleString([], { weekday: "short", hour: "numeric", minute: "2-digit" })) +
" (about " + left + " hours).</div><div style='opacity:.85;font-size:12px'>Your key card opens your room. Sleep there to rest, bathe to freshen up, and the spa's thermal rooms are free to you.</div>";
h += worldBtn("way", "🧭 Show me the way to my room", "the arrow on the banner leads to the lifts");
h += worldBtn("more", "➕ Stay another night", S.free ? "on the house" : llHotelPrice(S.kind) + " gold");
h += worldBtn("out", "🔑 Check out", null);
fns.way = function () { llShowWay("liftsup"); };
fns.more = function () { llHotelCall("lounge_hotel_extend", { p_nights: 1 }); };
fns.out = function () { llHotelCall("lounge_hotel_checkout", {}); };
}
else {
h += "<div>Every room has its own bathroom, a minibar and room service by telephone. Sleep in your bed to rest, and the spa's thermal rooms are free to hotel guests.</div>";
[["classic", "🛏 A Classic room", "a queen bed, a bath, a desk and a view of the gardens"], ["deluxe", "🛏 A Deluxe room", "a king bed with a canopy, a sitting area, a bath and a shower"],
["penthouse", "👑 A Penthouse suite", "the whole of one side of the sixth floor: two bedrooms, a dining room, a piano, a terrace and a plunge pool"]].forEach(function (r) {
h += worldBtn("k:" + r[0], r[1] + " · " + llHotelPrice(r[0]) + " gold a night", r[2]);
fns["k:" + r[0]] = function () { llBookNights(r[0]); };
});
h += "<div style='opacity:.8;font-size:12px;margin-top:4px'>" + (H.taken || []).length + " rooms taken tonight.</div>";
}
h += llTalkBtn("frontdesk") + "<div id='ll-msg' style='margin-top:6px'></div>";
worldCard(h, fns);
});
},
function (kind) {
var fns = { back: llFrontDesk }, h = llHead("How many nights?", esc(LL_KIND_NAME[kind]) + ", " + llHotelPrice(kind) + " gold a night. A night is a real day.");
[1, 3, 7].forEach(function (n) { h += worldBtn("n" + n, n + (n === 1 ? " night" : " nights") + " · " + n * llHotelPrice(kind) + " gold", null); fns["n" + n] = function () { llHotelCall("lounge_hotel_book", { p_kind: kind, p_nights: n }); }; });
worldCard(h + worldBtn("back", "← Back", null) + "<div id='ll-msg' style='margin-top:6px'></div>", fns);
},
function (fn, args) {
if (LL.hotelBusy)
return;
LL.hotelBusy = true;
llMsg("…");
cityRpc(fn, args).then(function (o) {
LL.hotelBusy = false;
if (!o || o.ok === false)
return llMsg(esc((o && o.say) || "Not now."));
if (fn === "lounge_hotel_checkout" && LL.room && LL.room.slot && !(llKeeper() || llHost() || llHasJob(LL_HOTEL_JOBS)))
llGoFloor(1, true);
llHotelLoad(true).then(function () { llFrontDesk(); setTimeout(function () { llMsg("<b>" + esc(o.say || "Done.") + "</b>"); }, 30); });
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
if (typeof playTone === "function") {
playTone(659, 0.25);
setTimeout(function () { playTone(880, 0.35); }, 220);
}
}).catch(function (e) { LL.hotelBusy = false; llMsg(llHotelSoft(e)); });
},
function () {
worldCard(llHead("The bell desk", "The bell captain and the bellhops: luggage, directions, a taxi.") +
"<div>Your bags go up to your room ahead of you, and come down again when you check out. The lifts are on the west wall of the lobby; the gardens and the pool terrace are through the doors at the far side.</div>" +
worldBtn("taxi", "🚕 Call a taxi", "out front on the Market Ring") + worldBtn("guide", "🧭 Everything to do at the resort", null) + llTalkBtn("bell"), { taxi: function () { worldCard(null); if (typeof taxiOpen === "function")
try {
taxiOpen();
return;
}
catch (e) { } setStatus("The bell captain whistles a taxi to the door on the Market Ring."); }, guide: llResortGuide, talk: function () { llTalkTo("bell"); } });
},
function (stairs) {
var S = LL.hotel.stay, fns = {}, cur = LL.room && LL.room.x0 >= 490 ? (LL.room.x0 > 650 ? 6 : LL.floor) : 1;
var h = llHead(stairs ? "The stairs" : "The lift", "A soft chime, and the gold doors slide open." + (cur ? " You are on " + (cur === 1 ? "the lobby floor" : "floor " + cur) + "." : ""));
[[1, "The lobby", "reception, the restaurant, the ballroom, the gardens and the pools"], [2, "Floor 2", "rooms 201 to 212"], [3, "Floor 3", "rooms 301 to 312"], [4, "Floor 4", "rooms 401 to 412"], [5, "Floor 5", "rooms 501 to 512"], [6, "Floor 6: the penthouses", "601 and 602"]].forEach(function (f) {
if (f[0] === cur)
return;
var mine = S && Math.floor(+S.room / 100) === f[0];
h += worldBtn("f" + f[0], (mine ? "⭐ " : "") + f[1], (mine ? "your room is here · " : "") + f[2]);
fns["f" + f[0]] = function () { llGoFloor(f[0]); };
});
worldCard(h, fns);
},
function (f, quiet) {
worldCard(null);
if (typeof playTone === "function" && !quiet) {
playTone(784, 0.2);
setTimeout(function () { playTone(659, 0.3); }, 240);
}
if (f === 1) {
LL.floor = 1;
llPut(6.8, 88.5, -Math.PI / 2);
}
else if (f === 6) {
LL.floor = 6;
llPut(LL_PH_X + 3.2, 0, -Math.PI / 2);
}
else {
LL.floor = f;
llFloorSignsDraw();
llPut(LL_FLOOR_X + 3.2, 0, -Math.PI / 2);
}
LL.room = null;
if (quiet)
return;
var S = LL.hotel.stay, no = S ? +S.room : 0;
if (S && Math.floor(no / 100) === f) {
if (f === 6)
LL.guide = { x: LL_PH_X + 13, z: no === 601 ? -4 : 4, name: "Penthouse " + no };
else {
var R = llRoomSlots()[(no % 100) - 1];
LL.guide = { x: R.door, z: R.north ? -1 : 1, name: "Your room, " + no };
}
}
setStatus(f === 1 ? "<b>Ding.</b> The lobby: reception ahead, the gardens and the pools through the far doors." : f === 6 ? "<b>Ding.</b> The sixth floor: the penthouses. The butler bows." : "<b>Ding.</b> Floor " + f + ": rooms " + (f * 100 + 1) + " to " + (f * 100 + 12) + ", along the corridor.");
},
function (how) {
if (!llSigned())
return setStatus("Sign in first.");
if (how === "nap" && typeof togEmote === "function")
try {
togEmote("sit");
}
catch (e) { }
cityRpc("lounge_hotel_rest", { p_how: how }).then(function (o) {
if (!o)
return;
setStatus(esc(o.say || ""));
if (o.ok !== false && typeof needsGot === "function")
try {
needsGot(Object.assign({ events: [] }, o));
}
catch (e) { }
if (o.ok !== false && typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
}).catch(function (e) { setStatus(llHotelSoft(e)); });
},
function (S) {
if (S.kind !== "resort" && S.kind !== "rooms" && S.kind !== "tables")
return false;
var H = LL.hotel || {}, T = LL.tablesList || [];
var sig = S.kind === "resort" ? "r" : S.kind === "rooms" ? JSON.stringify(H.taken || []) : JSON.stringify(T.map(function (t) { return [t.id, t.game, t.seats, t.status]; }));
if (sig === S.sig)
return true;
S.sig = sig;
var cv = S.cv, x = cv.getContext("2d"), W = cv.width, Hh = cv.height;
x.textBaseline = "alphabetic";
if (S.kind === "resort") {
llPaper(x, W, Hh, "At the resort today");
x.fillStyle = "#F2D8E6";
x.textAlign = "center";
x.font = Math.round(W / 30) + "px Georgia";
var y = W / 11 + 14 + W / 14;
["The lagoon pool, the lap pool and the hot tubs: all day", "Yoga on the lawn by the pool terrace, mornings", "The Rosewater Spa: massage, facials, the sauna and the steam room",
"Dominoes, spades, farkle, hearts and gin in the Garden Pavilion", "The swan boat and the island gazebo on the lake", "The hedge maze: find GiGi's gold rose",
"Dinner in the Magnolia Room, the harp at dinner", "Dancing in the Starlight Ballroom, every evening"].forEach(function (l) { if (y < Hh - 24) {
x.fillText("✦ " + l, W / 2, y);
y += W / 21;
} });
}
else if (S.kind === "rooms") {
llPaper(x, W, Hh, "The rooms");
x.textAlign = "left";
x.font = Math.round(W / 28) + "px Georgia";
var tk = H.taken || [], y2 = W / 11 + 14 + W / 16;
[2, 3, 4, 5, 6].forEach(function (f) {
var on = tk.filter(function (n) { return Math.floor(n / 100) === f; });
x.fillStyle = "#E8CFA0";
x.fillText((f === 6 ? "Penthouses" : "Floor " + f) + ":", 30, y2);
x.fillStyle = "#F2D8E6";
x.fillText(on.length ? on.join(", ") + " occupied" : "all made up", W * 0.38, y2);
y2 += W / 14;
});
}
else {
llPaper(x, W, Hh, "The Garden Pavilion");
x.textAlign = "center";
x.font = Math.round(W / 28) + "px Georgia";
var y3 = W / 11 + 14 + W / 16;
if (!T.length) {
x.fillStyle = "#F2D8E6";
x.fillText("Every table is free. Sit down at one and the house deals you in.", W / 2, y3);
x.fillText("Your friends can join from the games host.", W / 2, y3 + W / 18);
}
T.slice(0, 7).forEach(function (t) { x.fillStyle = "#E8CFA0"; x.fillText((LTG[t.game] ? LTG[t.game].title : t.game) + " · " + String(t.host_name || "a guest").slice(0, 18) + " · " + (t.status === "open" ? "seats open" : "playing"), W / 2, y3); y3 += W / 17; });
}
S.tex.needsUpdate = true;
return true;
},
function () {
llHotelLoad(true).then(function (H) {
var tk = H.taken || [];
worldCard(llHead("The board of rooms", "Who to make up, floor by floor.") +
"<div>" + (tk.length ? "Occupied tonight: <b>" + tk.join(", ") + "</b>. Make those up while the guests are out, and fresh towels in all of them." : "No guests tonight: every room is made up and waiting.") + "</div>" +
"<div style='opacity:.85;font-size:12px;margin-top:4px'>Clock in on your work card; the linen rooms are by the lifts on every floor.</div>", {});
});
},
function () {
var fns = { talk: function () { llTalkTo("guestsvc"); } }, h = llHead("Everything to do at the resort", "Tap a place and an arrow on the banner shows you the way.");
LL_RESORT_WAYS.forEach(function (w) { if (!LL_PLACES[w[0]])
return; h += worldBtn("w:" + w[0], w[1], null); fns["w:" + w[0]] = function () { llShowWay(w[0]); }; });
worldCard(h + llTalkBtn("guestsvc"), fns);
},
function () {
var fns = { talk: function () { llTalkTo("spa"); } }, h = llHead("The Rosewater Spa", "Treatments by appointment (the therapists see you straight away); the thermal suite is free to everyone.");
LL_SPA.forEach(function (t) { if (t[0] === "hottub")
return; h += worldBtn("s:" + t[0], esc(t[1]) + (t[2] ? " · " + t[2] + " gold" : " · free"), t[3] + (t[2] ? " · half price for hotel guests" : "")); fns["s:" + t[0]] = function () { llSpaDo(t[0]); }; });
worldCard(h + llTalkBtn("spa") + "<div id='ll-msg' style='margin-top:6px'></div>", fns);
},
function (k) {
if (!llSigned())
return setStatus("Sign in first.");
if (LL.spaBusy)
return;
LL.spaBusy = true;
cityRpc("lounge_spa", { p_treat: k }).then(function (o) {
LL.spaBusy = false;
if (!o)
return;
var say = "<b>" + esc(o.say || "Lovely.") + "</b>" + (o.price ? " (" + o.price + " gold)" : "");
llMsg(say);
if (!document.getElementById("ll-msg"))
setStatus(say);
if (o.ok !== false && typeof needsGot === "function")
try {
needsGot(Object.assign({ events: [] }, o));
}
catch (e) { }
if (o.ok !== false && typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
}).catch(function (e) { LL.spaBusy = false; llMsg(llHotelSoft(e)); });
},
function () {
worldCard(llHead("The cabanas", "Rose-striped, with curtains, a daybed, fresh fruit and towels.") +
"<div>A cabana is yours for the day: lie down out of the sun, and the pool bar brings your order to you.</div>" +
worldBtn("take", "⛱ Take a cabana for the day · 30 gold", "energy +15 · half price for hotel guests") + worldBtn("bar", "🍹 Order from the pool bar", null) + "<div id='ll-msg' style='margin-top:6px'></div>", { take: function () { llSpaDo("cabana"); }, bar: function () { llMenuCard("poolbar"); } });
},
function (where) {
var who = where === "ballroom" ? "the Starlight Orchestra" : "the band on the bandstand";
worldCard(llHead(where === "ballroom" ? "The Starlight Orchestra" : "The bandstand", "Request a dance from " + who + ".") +
worldBtn("w", "🎻 A waltz", null) + worldBtn("t", "🎶 Something tender", null) + worldBtn("l", "🎺 Something lively", null) + worldBtn("d", "💃 Dance", null) + (where === "ballroom" ? llTalkBtn("bandleader") : ""), { w: function () { llTune("waltz"); }, t: function () { llTune("tender"); }, l: function () { llTune("lively"); }, d: function () { worldCard(null); llDance(where === "ballroom" ? "the Starlight Ballroom" : "the bandstand lawn"); }, talk: function () { llTalkTo("bandleader"); } });
},
function () {
var fns = { talk: function () { llTalkTo("events"); } }, can = llCanHost() && llSigned();
var h = llHead("Events at the resort", "Tea dances in the afternoon, the evening ball, and celebrations of every kind.");
h += "<div>The ballroom, the bandstand and the Garden Pavilion can all be booked for a party: a birthday, a wedding breakfast, an anniversary. Speak with the events coordinator and she sets it up.</div>";
if (can) {
h += worldBtn("notice", "📝 Announce it on the board", "tonight's welcome in the Grand Foyer");
fns.notice = llNoticeCard;
}
worldCard(h + llTalkBtn("events"), fns);
},
function (dt) {
var R = LL.ride;
if (!R || !LL.boat)
return;
R.t += dt;
var u = Math.min(1, R.t / R.len), sweep = u < 0.5 ? u * 2 : (1 - u) * 2, a = -Math.PI / 2 + Math.PI * sweep;
var rx = 18.5 + 5.5 * Math.cos(2 * Math.PI * u), rz = 14.5 + 2.5 * Math.cos(2 * Math.PI * u), cx = 24, cz = 236;
var x = cx + Math.cos(a) * rx, z = cz + Math.sin(a) * rz;
if (u < 0.04) {
var k = u / 0.04;
x = 24;
z = 216.5 + (219 - 216.5) * k;
}
var B = LL.boat;
var px = B.position.x, pz = B.position.z;
B.position.set(x, -0.2, z);
if (Math.hypot(x - px, z - pz) > 0.001)
B.rotation.y = Math.atan2(-(x - px), -(z - pz));
camera.position.set(LL.base + x, 1.45, z + 0.5);
if (u >= 1) {
LL.ride = null;
B.position.set(LL.boatAt.x, -0.2, 216.5);
B.rotation.y = Math.PI;
llPut(24, 209, Math.PI);
setStatus("🦢 <b>Back at the boathouse.</b> The keeper helps you ashore.");
}
},
function (say) {
var L = LL.lawn, n = L.kind === "croquet" ? 6 : 5, fns = {};
var title = L.kind === "croquet" ? "Croquet" : "Bowls", h = llHead(title, L.kind === "croquet" ? "Six hoops in order: tap the ball gently or strike it firmly." : "Five woods: roll them as close to the little white jack as you can.");
if (say)
h += "<div style='margin:4px 0'>" + say + "</div>";
h += "<div>" + (L.kind === "croquet" ? "Hoops through: " : "Points: ") + "<b>" + L.score + "</b> · shot " + Math.min(L.shot + 1, n) + " of " + n + "</div>";
if (L.shot < n) {
["gentle", "steady", "firm"].forEach(function (p) { h += worldBtn(p, ({ gentle: "A gentle tap", steady: "A steady stroke", firm: "A firm strike" })[p], null); fns[p] = function () { llLawnShot(p); }; });
}
else {
h += "<div style='margin-top:6px'><b>" + (L.score >= n - 1 ? "Splendid play!" : L.score >= n / 2 ? "A very good game." : "A lovely afternoon on the lawn.") + "</b></div>" + worldBtn("again", "Play again", null);
fns.again = function () { llLawnGame(L.kind); };
}
worldCard(h, fns);
},
function (p) {
var L = LL.lawn, r = Math.random(), want = ["gentle", "steady", "firm"][(L.shot * 7 + (L.kind === "croquet" ? 1 : 2)) % 3], good = p === want ? 0.75 : 0.35, say;
L.shot++;
if (L.kind === "croquet") {
if (r < good) {
L.score++;
say = "Click! Straight through the hoop.";
}
else
say = r < good + 0.3 ? "Just wide of the hoop." : "It rolls off into the daisies.";
}
else {
var pts = r < good * 0.6 ? 3 : r < good ? 2 : r < good + 0.25 ? 1 : 0;
L.score += pts;
say = ["It runs past the jack.", "Not bad: a point.", "Close! Two points.", "Kissing the jack: three points!"][pts];
}
if (typeof playTone === "function")
playTone(r < good ? 660 : 440, 0.18);
llLawnCard(say);
},
function (say) {
var P = LL.putt, fns = {}, h = llHead("The putting green", "Nine little holes, flags in rose pink. Fewest strokes wins.");
if (say)
h += "<div style='margin:4px 0'>" + say + "</div>";
h += "<div>Hole <b>" + Math.min(P.hole + 1, 9) + "</b> of 9 · strokes " + P.strokes + "</div>";
if (P.hole < 9) {
[["soft", "A soft putt"], ["mid", "A smooth putt"], ["hard", "A bold putt"]].forEach(function (b) { h += worldBtn(b[0], b[1], null); fns[b[0]] = function () { llPutt(b[0]); }; });
}
else {
h += "<div style='margin-top:6px'><b>" + P.strokes + " strokes" + (P.strokes <= 18 ? ": par or better!" : ".") + "</b></div>" + worldBtn("again", "Play again", null);
fns.again = llPuttGo;
}
worldCard(h, fns);
},
function (k) {
var P = LL.putt, dist = (P.dist === undefined ? P.dist = 2 + ((P.hole * 5) % 7) : P.dist), need = dist > 5 ? "hard" : dist > 2.5 ? "mid" : "soft", r = Math.random();
P.strokes++;
var hit = (k === need && r < 0.7) || (r < 0.18), say;
if (hit) {
say = "Plop! In the cup.";
P.hole++;
P.dist = undefined;
}
else {
P.dist = Math.max(0.6, dist * (k === need ? 0.3 : 0.6));
say = k === "hard" && need !== "hard" ? "Too strong: it runs past." : "Short, but closer: " + P.dist.toFixed(1) + " m to go.";
}
if (typeof playTone === "function")
playTone(hit ? 880 : 494, 0.15);
llPuttCard(say);
},
function () {
if (typeof playTone === "function") {
playTone(659, 0.3);
setTimeout(function () { playTone(988, 0.5); }, 260);
}
if (!llSigned())
return setStatus("<b>You found the heart of the maze!</b> Sign in, and the gold rose leaves a keepsake in your backpack once a day.");
cityRpc("lounge_maze", {}).then(function (o) {
setStatus("🌹 <b>" + esc((o && o.say) || "You found the heart of the maze!") + "</b>");
if (o && o.ok !== false && typeof loadThings === "function")
try {
loadThings();
}
catch (e) { }
}).catch(function (e) { setStatus("<b>You found the heart of the maze!</b> " + llHotelSoft(e)); });
},
function () {
cityRpc("lounge_owner_state", {}).then(function (o) {
if (!o || o.ok === false)
return worldCard(llHead("The resort's books", "") + "<div>" + esc((o && o.say) || "Not now.") + "</div>", {});
var h = llHead("The resort's books", LL_SHE + " owns GiGi's Lounge Hotel & Resort.");
h += "<div>Her pay as owner: <b>" + (+o.salary || 0).toLocaleString() + " gold a week</b>, paid like any salary when she clocks in.</div>";
h += "<div>Her share of the takings: <b>" + (+o.share_pct || 0) + "%</b> of everything sold at the Lounge and the resort (rooms, dinners, the spa, the shop), paid to her as it comes in.</div>";
h += "<div style='margin-top:6px'>Today's takings: <b>" + (+o.today || 0).toLocaleString() + " gold</b> · her share today: <b>" + (+o.share_today || 0).toLocaleString() + " gold</b></div>";
h += "<div>This week her share has come to <b>" + (+o.share_week || 0).toLocaleString() + " gold</b>. Guests in the hotel tonight: <b>" + (+o.guests || 0) + "</b>.</div>";
h += "<div style='opacity:.8;font-size:12px;margin-top:6px'>The Keeper can change her pay and her share on the admin page.</div>";
worldCard(h, {});
}).catch(function (e) { worldCard(llHead("The resort's books", "") + "<div>" + llHotelSoft(e) + "</div>", {}); });
},
function (game) {
var D = LTG[game];
if (!D)
return;
var fns = {}, h = llHead(D.title, esc(D.blurb));
h += worldBtn("house", "🃏 Play now, with the house", D.min === D.max ? "the house fills the other " + (D.max - 1) + (D.max === 2 ? " seat" : " seats") : "choose how many sit in");
h += worldBtn("open", "🪑 Open a table for friends", "they join from the games host or the board; the house fills any empty seat when you start");
h += worldBtn("join", "👥 Tables open now", null) + worldBtn("rules", "📖 How to play", null) + llTalkBtn("gameshost");
fns.house = function () { if (D.min === D.max)
return llTableLocal(game, D.max); llTableCount(game, function (n) { llTableLocal(game, n); }); };
fns.open = function () { if (D.min === D.max)
return llTableNew(game, D.max); llTableCount(game, function (n) { llTableNew(game, n); }); };
fns.join = function () { llTablesLobby(game); };
fns.rules = function () { llTableRules(game); };
fns.talk = function () { llTalkTo("gameshost"); };
worldCard(h + "<div id='ll-msg' style='margin-top:6px'></div>", fns);
},
function (game) {
var fns = {}, title = game ? LTG[game].title + " tables" : "The Garden Pavilion";
worldCard(llHead(title, "Looking for open tables…"), {});
llTablesLoad().then(function (T) {
var h = llHead(title, "Dominoes, Spades, Hearts, Gin Rummy and Farkle. The house sits in for any empty seat; nothing is played for gold.");
var list = (T || []).filter(function (t) { return !game || t.game === game; });
if (LL.tablesNoSql)
h += "<div style='opacity:.85'>Tables for friends open soon. You can play with the house right now.</div>";
else if (!list.length)
h += "<div style='opacity:.85'>No tables open just now. Open one and your friends can join.</div>";
list.forEach(function (t) {
var D = LTG[t.game];
if (!D)
return;
var seats = (t.seats || []), free = 0;
for (var i = 0; i < t.n; i++)
if (!seats[i])
free++;
var who = seats.filter(function (s) { return s; }).map(function (s) { return s.name; }).join(", ");
var k = "t" + t.id, open = t.status === "open" && free > 0;
h += worldBtn(k, (t.mine ? "⭐ " : "") + D.title + " · " + esc(String(t.host_name || "a guest")), (open ? free + " seat" + (free > 1 ? "s" : "") + " open" : t.status === "open" ? "full, about to start" : "playing: watch") + (who ? " · " + esc(who) : ""));
fns[k] = function () { if (t.mine)
return llTableJoin(t.id, null); if (open)
return llTableSit(t.id); llTableJoin(t.id, null); };
});
["dominoes", "spades", "farkle", "hearts", "gin"].forEach(function (g) { if (game && g !== game)
return; h += worldBtn("g:" + g, "🪑 " + LTG[g].title + ": sit down", esc(LTG[g].blurb)); fns["g:" + g] = function () { llTableMenu(g); }; });
h += llTalkBtn("gameshost") + "<div id='ll-msg' style='margin-top:6px'></div>";
fns.talk = function () { llTalkTo("gameshost"); };
worldCard(h, fns);
});
},
function () {
if (!llSigned()) {
LL.tablesList = [];
return Promise.resolve([]);
}
return cityRpc("lounge_table_list", {}).then(function (o) { LL.tablesNoSql = false; LL.tablesList = (o && o.tables) || []; llScreensAll(); return LL.tablesList; })
.catch(function (e) { if (llMissing(e))
LL.tablesNoSql = true; LL.tablesList = []; return []; });
},
function (game, n) {
if (!llSigned())
return llMsg("Sign in to open a table. You can play with the house right now.");
llMsg("…");
cityRpc("lounge_table_new", { p_game: game, p_seats: n }).then(function (o) {
if (!o || o.ok === false)
return llMsg(esc((o && o.say) || "Not now."));
llTableJoin(o.id, null);
}).catch(function (e) { llMsg(llMissing(e) ? "Tables for friends open soon. Play with the house in the meantime." : esc(String(e && e.message || e))); });
},
function (id, keep) {
cityRpc("lounge_table_get", { p_id: id, p_from: 0 }).then(function (o) {
if (!o || o.ok === false)
return llMsg(esc((o && o.say) || "That table has closed."));
var T = o.table;
llTableOpen({ game: T.game, id: T.id, seed: +T.seed, n: +T.n, seats: T.seats || [], me: o.me == null ? -1 : +o.me, status: T.status, host: !!o.host, moves: o.moves || [] });
}).catch(function (e) { llMsg(llSoft(e)); });
},
function (t) {
var D = LTG[t.game];
if (!D)
return;
LTT = { game: t.game, id: t.id, seed: t.seed, n: t.n, seats: t.seats, me: t.me, status: t.status, host: t.host, house: {}, q: [], qi: 0, ver: 0, wait: 0.6, poll: 0, idle: 0, E: null };
llTableNames();
if (t.status !== "open")
llTableBegin();
(t.moves || []).forEach(function (m) { LTT.q.push(m); });
llGameStart({ key: "table", title: D.title, noMoves: true,
draw: llTableDraw, tap: llTableTap, moves: llTableMoves, text: llTableText, head: llTableHead,
btn: { rules: function () { LTT.rules = !LTT.rules; LLG.list = LTT.rules; }, start: llTableStart, leave: function () { llGameClose(); } },
tick: llTableTick, close: llTableLeave }, { msg: llTableSay() });
if (t.id)
llScreensAll();
},
function () {
var T = LTT, R = wRand((T.seed >>> 0) || 1), pool = LTT_HOUSE.slice();
llShuffle(pool, (T.seed >>> 0) || 1);
T.names = [];
T.isHouse = [];
for (var i = 0; i < T.n; i++) {
var s = T.seats[i], h = !s || T.house[i];
T.isHouse[i] = h;
T.names[i] = i === T.me ? "You" : s && !T.house[i] ? String(s.name || "A guest") : pool[i % pool.length] + (T.id ? " (the house)" : "");
}
},
function () {
var T = LTT;
if (!T)
return "";
if (!T.E) {
var free = 0;
for (var i = 0; i < T.n; i++)
if (!T.seats[i])
free++;
return T.host ? "<b>Your table is open.</b> " + free + " seat" + (free === 1 ? "" : "s") + " free: friends join from the games host or the board in the pavilion. Press Start when you're ready." : "<b>Waiting for the host to start.</b>";
}
var o = T.E.over(T.names);
if (o)
return "<b>" + esc(o.say) + "</b> Thank you for playing.";
return T.E.status(T.me, T.names) + (T.me < 0 ? " <span style='opacity:.8'>(watching)</span>" : "");
},
function (x, W, H) {
var T = LTT;
if (!T)
return;
if (!T.E) {
x.fillStyle = "#F2D9A8";
x.textAlign = "center";
x.font = "600 20px Georgia";
x.fillText(LTG[T.game].title + ": waiting for players", W / 2, H * 0.28);
x.font = "16px Georgia";
for (var i = 0; i < T.n; i++) {
var s = T.seats[i];
x.fillStyle = s ? "#F2C8E0" : "rgba(242,200,224,.55)";
x.fillText("Seat " + (i + 1) + ": " + (s ? s.name + (i === T.me ? " (you)" : "") : "open (the house sits in if nobody comes)"), W / 2, H * 0.4 + i * 28);
}
return;
}
T.E.draw(x, W, H, T.me, T.names);
},
function (m) {
var T = LTT;
if (!T || !T.E || T.me < 0 || T.E.turn() !== T.me)
return;
if (T.qi < T.q.length)
return llSay("One moment: catching up with the table.");
if (!T.E.play(T.me, m))
return;
T.idle = 0;
llSay(llTableSay());
if (typeof playTone === "function")
playTone(587, 0.08);
if (!T.id)
return;
var ver = T.ver;
T.ver++;
T.q.push({ seat: T.me, m: m, mine: true });
T.qi = T.q.length;
cityRpc("lounge_table_move", { p_id: T.id, p_ver: ver, p_seat: T.me, p_move: m }).then(function (o) {
if (o && o.ok === false && LTT === T)
llTableResync(o.say);
}).catch(function () { if (LTT === T)
llTableResync(); });
},
function (say) {
var T = LTT;
if (!T || !T.id)
return;
cityRpc("lounge_table_get", { p_id: T.id, p_from: 0 }).then(function (o) {
if (!o || o.ok === false || LTT !== T)
return;
T.E = null;
T.house = {};
T.q = (o.moves || []).slice();
T.qi = 0;
T.ver = 0;
T.status = o.table.status;
T.seats = o.table.seats || T.seats;
if (T.status !== "open")
llTableBegin();
llTableNames();
if (say)
llSay(esc(say));
}).catch(function () { });
},
function (dt) {
var T = LTT;
if (!T)
return;
if (T.id) {
T.poll -= dt;
if (T.poll <= 0) {
T.poll = 2.5;
llTablePoll();
}
}
if (!T.E)
return;
if (T.E.over()) {
if (!T.doneSaid) {
T.doneSaid = true;
llSay(llTableSay());
llGameDraw();
if (T.id && T.host)
cityRpc("lounge_table_done", { p_id: T.id }).catch(function () { });
if (typeof playTone === "function") {
playTone(659, 0.3);
setTimeout(function () { playTone(880, 0.4); }, 300);
}
}
return;
}
while (T.qi < T.q.length && T.q[T.qi].m && T.q[T.qi].m.k === "house") {
T.house[T.q[T.qi].seat] = true;
T.qi++;
T.ver++;
llTableNames();
}
var behind = T.q.length - T.qi;
T.wait -= dt;
if (T.wait > 0 && behind < 6)
return;
var t = T.E.turn();
if (t < 0)
return;
if (T.isHouse[t]) {
var m = T.E.ai(t);
if (m && T.E.play(t, m)) {
T.wait = behind > 5 ? 0 : T.E.pause();
llSay(llTableSay());
llGameDraw();
}
return;
}
if (T.qi < T.q.length) {
var q = T.q[T.qi];
if (q.mine) {
T.qi++;
return;
}
if (+q.seat === t && T.E.play(t, q.m)) {
T.qi++;
T.ver++;
T.wait = behind > 5 ? 0 : Math.min(1.2, T.E.pause());
llSay(llTableSay());
llGameDraw();
}
else {
T.qi = T.q.length;
llTableResync("The table was out of step; it has caught up.");
}
return;
}
if (T.id && t !== T.me) {
T.idle += dt;
if (T.idle > 90 && !T.asked) {
T.asked = true;
cityRpc("lounge_table_house", { p_id: T.id, p_seat: t, p_ver: T.ver }).then(function () { T.asked = false; T.idle = 0; }).catch(function () { T.asked = false; });
}
}
else
T.idle = 0;
},
function () {
var T = LTT;
if (!T || T.polling)
return;
T.polling = true;
var from = T.q.length;
cityRpc("lounge_table_get", { p_id: T.id, p_from: from }).then(function (o) {
T.polling = false;
if (!o || o.ok === false || LTT !== T)
return;
var tb = o.table || {};
if (!T.E && tb.status !== "open") {
T.seats = tb.seats || T.seats;
llTableBegin();
}
if (!T.E) {
T.seats = tb.seats || T.seats;
llTableNames();
llSay(llTableSay());
llGameDraw();
return;
}
(o.moves || []).forEach(function (m) { T.q.push(m); });
if ((o.moves || []).length)
T.idle = 0;
}).catch(function () { T.polling = false; });
},
function (V) {
var lite = LL.lite;
[[94, 244, 58, 7, LLC.rose], [94, 258, 58, 7, LLC.plum], [92, 272, 46, 7, LLC.rose]].forEach(function (q) { llRug(V, q[0], q[1], q[2], q[3], 0, q[4], LLC.gold); });
[[76, 251], [100, 251], [112, 251], [76, 265], [100, 265], [112, 265], [84, 279], [100, 279]].forEach(function (q, i) { if (!lite || i % 2 === 0)
llPlant(V, q[0], q[1], i % 2 ? "roses" : "palm", i % 2 ? 1.1 : 1.2); });
for (var b = 0; b < (lite ? 2 : 4); b++)
llBookcase(V, 108 + b * 2.2, 230.4, 0, 2, 3.2);
llSolid(111.3, 230.6, 4.6, 0.3, 0, 3.2);
llRug(V, 116, 236, 10, 6, 0, LLC.berry, LLC.gold);
llSofa(V, 116, 233.6, 0, LLC.purple, 3);
llSofa(V, 116, 238.6, Math.PI, LLC.purple, 3);
llArmchair(V, 112, 236, Math.PI / 2, LLC.rose);
llArmchair(V, 120, 236, -Math.PI / 2, LLC.rose);
llCoffeeTable(V, 116, 236, 0);
llVase(V, 116, 0.47, 236, 0.8);
llSolid(116, 233.6, 1.6, 0.5, 0, 1);
llSolid(116, 238.6, 1.6, 0.5, 0, 1);
llSolidR(112, 236, 0.5, 1);
llSolidR(120, 236, 0.5, 1);
for (var t = 0; t < (lite ? 2 : 4); t++) {
var tx = 66 + (t % 2) * 6, tz = 286 + Math.floor(t / 2) * 6;
llRoundTable(V, tx, tz, 0.6);
llChair(V, tx, tz - 1.1, 0, LLC.lilac);
llChair(V, tx, tz + 1.1, Math.PI, LLC.lilac);
llSolidR(tx, tz, 0.7, 1);
if (!lite)
llTeaSet(V, tx, 0.78, tz);
}
for (var p = 0; p < (lite ? 3 : 6); p++)
llPainting(V, 62 + p * 11 + 5, 3.0, 230.2, 0, 2.2, 1.6, 40 + p);
for (var s = 0; s < (lite ? 2 : 4); s++) {
llSideboard(V, 129.4, 240 + s * 12, -Math.PI / 2, 2, LLC.cream);
llVase(V, 129.4, 0.88, 240 + s * 12, 1);
llSolid(129.4, 240 + s * 12, 0.3, 1, 0, 1);
}
[[70, 244], [106, 244], [70, 258], [106, 258], [76, 272], [108, 272]].forEach(function (q, i) { if (lite && i % 2)
return; var a = Math.PI / 2 + (i % 2) * Math.PI; LL.seated.push({ x: q[0] + Math.sin(a) * 1.25, z: q[1] + Math.cos(a) * 1.25, ry: a + Math.PI, seed: "pavx" + i }); });
},
function (K) {
var lite = LL.lite, steel = llSilver();
llIsland(K, 170, 98, 10, 1.6, 0);
for (var p = 0; p < (lite ? 3 : 6); p++) {
llCyl(0.24, 0.2, 0.22, steel, 166 + p * 1.6, 1.07, 98, K, 10);
}
llBox(10, 0.06, 0.06, steel, 170, 2.6, 98, K);
for (var h = 0; h < (lite ? 4 : 8); h++) {
llBox(0.02, 0.4, 0.02, steel, 166 + h * 1.15, 2.38, 98, K);
llCyl(0.18, 0.18, 0.06, llM(0x6A6A70), 166 + h * 1.15, 2.14, 98, K, 10);
}
llRectTable(K, 158, 100, 6, 1.4, 0, { cloth: false, top: 0xE8E4E8 });
llSolid(158, 100, 3, 0.7, 0, 1);
for (var c = 0; c < (lite ? 2 : 4); c++) {
llCyl(0.16, 0.16, 0.08, steel, 156 + c * 1.3, 0.82, 100.2, K, 12);
llCyl(0.03, 0.03, 0.4, llM(0xC8A878), 156.6 + c * 1.3, 0.81, 99.6, K, 6).rotation.z = Math.PI / 2;
}
llBox(8, 0.9, 0.8, steel, 183, 0.45, 108.8, K);
llSolid(183, 108.8, 4, 0.4, 0, 1);
for (var s = 0; s < 3; s++)
llBox(1.4, 0.05, 0.6, llM(0x8A8E98), 180.6 + s * 2.4, 0.92, 108.8, K);
llBox(2.2, 0.8, 1.2, steel, 186, 2.2, 108.6, K);
llBox(1.4, 1.8, 0.5, steel, 176.4, 0.9, 108.9, K);
for (var r = 0; r < 5; r++)
for (var q = 0; q < 5; q++)
llCyl(0.16, 0.16, 0.02, llM(0xF0ECE8), 175.9 + q * 0.25, 0.3 + r * 0.34, 108.9, K, 10);
for (var rk = 0; rk < (lite ? 1 : 3); rk++) {
var rx = 152 + rk * 2.2;
llBox(0.06, 1.8, 0.06, steel, rx - 0.3, 0.9, 106, K);
llBox(0.06, 1.8, 0.06, steel, rx + 0.3, 0.9, 106, K);
for (var tr = 0; tr < 6; tr++)
llBox(0.62, 0.03, 0.7, llM(0xC8C0B8), rx, 0.3 + tr * 0.26, 106, K);
llSolid(rx, 106, 0.35, 0.4, 0, 1.8);
}
llShelves(K, 150.6, 96, Math.PI / 2, 6);
llShelves(K, 150.6, 90, Math.PI / 2, 4);
llStaff({ title: "Pastry chef", x: 158, z: 101.6, ry: Math.PI, seed: "pastry1" });
llStaff({ title: "Prep cook", x: 170, z: 99.6, ry: Math.PI, seed: "prep1" });
if (!lite)
llStaff({ title: "Kitchen porter", x: 181, z: 107.2, ry: 0, seed: "porter1" });
},
function (G, x0, x1, z0, z1) {
var NX = Math.ceil(x1 - x0) + 1, NZ = Math.ceil(z1 - z0) + 1, occ = new Uint8Array(NX * NZ), path = new Uint8Array(NX * NZ);
var inv = new THREE.Matrix4(), M = new THREE.Matrix4(), b = new THREE.Box3(), c = new THREE.Color(), hsl = {};
G.updateMatrixWorld(true);
inv.copy(G.matrixWorld).invert();
function mark(a, bx, pad) {
var i0 = Math.max(0, Math.floor(bx.min.x - pad - x0)), i1 = Math.min(NX - 1, Math.ceil(bx.max.x + pad - x0)), j0 = Math.max(0, Math.floor(bx.min.z - pad - z0)), j1 = Math.min(NZ - 1, Math.ceil(bx.max.z + pad - z0));
for (var i = i0; i <= i1; i++)
for (var j = j0; j <= j1; j++)
a[i * NZ + j] = 1;
}
G.traverse(function (m) {
if (!m.isMesh || !m.geometry || !m.geometry.attributes.position)
return;
var g = m.geometry;
if (!g.boundingBox)
g.computeBoundingBox();
M.multiplyMatrices(inv, m.matrixWorld);
b.copy(g.boundingBox).applyMatrix4(M);
if (b.max.x < x0 || b.min.x > x1 || b.max.z < z0 || b.min.z > z1)
return;
var fx = b.max.x - b.min.x, fz = b.max.z - b.min.z, area = fx * fz;
if (b.max.y < 0.1) {
if (area > 3000 || (fx > 10 && fz > 10))
return;
var mt = Array.isArray(m.material) ? m.material[0] : m.material;
if (mt && mt.color) {
c.copy(mt.color);
c.getHSL(hsl);
if (hsl.h > 0.2 && hsl.h < 0.45 && hsl.s > 0.15)
return;
}
mark(path, b, 0.6);
return;
}
if (b.min.y > 3.2)
return;
if (area > 600 && (fx > 2 && fz > 2))
return;
mark(occ, b, 0.4);
});
return { occ: occ, path: path, NX: NX, NZ: NZ, x0: x0, z0: z0, x1: x1, z1: z1 };
},
function (O, x, z, r, inset) {
if (x - r < O.x0 + inset || x + r > O.x1 - inset || z - r < O.z0 + inset || z + r > O.z1 - inset)
return false;
for (var dx = -r; dx <= r; dx += 0.7)
for (var dz = -r; dz <= r; dz += 0.7) {
if (dx * dx + dz * dz > r * r + 0.3)
continue;
var i = Math.round(x + dx - O.x0), j = Math.round(z + dz - O.z0);
if (i < 0 || j < 0 || i >= O.NX || j >= O.NZ)
return false;
var k = i * O.NZ + j;
if (O.occ[k] || O.path[k])
return false;
if (typeof llBlocked === "function" && llBlocked(x + dx, z + dz, 0))
return false;
}
return true;
},
function (G, o) {
var lite = LL.lite, R = wRand(llHash("sw23" + o.name)), O = llSweepOcc(G, o.x0, o.x1, o.z0, o.z1), n = lite ? Math.ceil(o.n / 2) : o.n, made = 0, tries = 0;
LL.swWalk = LL.swWalk || [];
while (made < n && tries < n * 60) {
tries++;
var kind = o.kinds[Math.floor(R() * o.kinds.length)], K = LL_SWK[kind], x = o.x0 + R() * (o.x1 - o.x0), z = o.z0 + R() * (o.z1 - o.z0);
if (o.near && R() < 0.65) {
x = o.near[0] + (R() - 0.5) * 2 * o.nr;
z = o.near[1] + (R() - 0.5) * 2 * o.nr;
}
if (!llSweepFree(O, x, z, K.r, o.inset || 1.5))
continue;
if (K.byPath) {
var pd = llSweepPathD(O, x, z);
if (pd < K.r + 0.4 || pd > K.r + 3.5)
continue;
}
var W = llWingAt(x, z), P = W ? W.g : G, ry = K.byPath ? llSweepFace(O, x, z) : (Math.floor(R() * 4) * Math.PI / 2);
K.put(P, x, z, ry, R, o);
llSweepTake(O, x, z, K.r + 0.6);
made++;
}
for (var w = 0, wt = 0; w < (lite ? Math.ceil(o.walk / 2) : o.walk) && wt < 300; wt++) {
var wx = o.x0 + R() * (o.x1 - o.x0), wz = o.z0 + R() * (o.z1 - o.z0);
var ii = Math.round(wx - O.x0), jj = Math.round(wz - O.z0);
if (ii < 0 || jj < 0 || ii >= O.NX || jj >= O.NZ)
continue;
var kk = ii * O.NZ + jj;
if (O.occ[kk] || (o.outdoor && !O.path[kk]) || worldSolidAt(LL.solids, wx, wz, 0))
continue;
LL.swWalk.push([wx, wz, o.outdoor ? 8 : 5]);
w++;
}
(LL.swMade = LL.swMade || {})[o.name] = [made, tries];
return made;
},
function (P, x, z, ry, R) {
var g = llPiece(P, x, z, ry);
var cols = [LLC.purple, LLC.rose, LLC.plum, LLC.berry], c = cols[Math.floor(R() * cols.length)];
llRug(g, 0, 0, 6, 4.6, 0, R() < 0.5 ? LLC.rose : LLC.plum, LLC.gold);
llSofa(g, 0, -1.4, 0, c, 2.4);
llArmchair(g, -2.1, 0.4, Math.PI / 2, LLC.lilac);
llArmchair(g, 2.1, 0.4, -Math.PI / 2, LLC.lilac);
llCoffeeTable(g, 0, 0.2, 0);
llVase(g, 0, 0.47, 0.2, 0.7);
var s = Math.sin(ry), co = Math.cos(ry);
function W(lx, lz) { return [x + lx * co + lz * s, z - lx * s + lz * co]; }
var a = W(0, -1.4), b = W(-2.1, 0.4), d = W(2.1, 0.4);
llSolid(a[0], a[1], 1.3, 0.5, ry, 1);
llSolidR(b[0], b[1], 0.5, 1);
llSolidR(d[0], d[1], 0.5, 1);
llSolidR(x, z, 0.6, 0.5);
if (R() < 0.7)
LL.seated.push({ x: a[0], z: a[1], ry: ry, seed: "sw23s" + Math.round(x) + "_" + Math.round(z) });
},
function (G) {
LL.swWalk = [];
var R = [
{ name: "the Mahjong Parlour", x0: 10, x1: 80, z0: 2, z1: 42, n: 22, walk: 6, near: [33, 30], nr: 22, kinds: ["palm", "sofas", "tea", "tea", "side"] },
{ name: "the Garden Pavilion", x0: 60, x1: 130, z0: 230, z1: 300, n: 16, walk: 5, near: [106, 272], nr: 20, kinds: ["palm", "sofas", "tea", "side"] },
{ name: "the gallery", x0: 994, x1: 1006, z0: -40, z1: 20, n: 9, walk: 3, inset: 0.8, kinds: ["palm", "side", "tea"] },
{ name: "the Gardens", x0: -80, x1: 60, z0: 110, z1: 300, n: 60, walk: 12, near: [-27, 172], nr: 30, outdoor: true, kinds: ["bench", "bench", "urn", "tree", "roses", "statue"] },
{ name: "the Pool Terrace", x0: 60, x1: 250, z0: 110, z1: 230, n: 50, walk: 10, near: [228, 211], nr: 35, outdoor: false, inset: 2, kinds: ["lounge", "lounge", "lounge", "pots", "stable"] }
];
R.forEach(function (o) { try {
llSweepRoom(G, o);
}
catch (e) {
if (window.console)
console.warn("[lounge] sweep", o.name, e);
} });
}
];
});
