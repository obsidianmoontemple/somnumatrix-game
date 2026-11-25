/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(409, function () {
"use strict";
return [
function (K, x, z, feet) {
var f = feet === undefined || feet === null ? 1e9 : feet, best = null, i, F;
for (i = 0; i < K.floors.length; i++) {
F = K.floors[i];
if (x >= F.x0 && x <= F.x1 && z >= F.z0 && z <= F.z1 && F.y <= f + 0.75 && (best === null || F.y > best))
best = F.y;
}
for (i = 0; i < K.ramps.length; i++) {
F = K.ramps[i];
if (x < F.x0 || x > F.x1 || z < F.z0 || z > F.z1)
continue;
var a = F.axis === "x" ? x : z, t = Math.max(0, Math.min(1, (a - F.a0) / (F.a1 - F.a0))), y = F.y0 + (F.y1 - F.y0) * t;
if (y <= f + 0.75 && (best === null || y > best))
best = y;
}
for (i = 0; i < (K.rooms || []).length; i++) {
F = K.rooms[i];
if (x < F.x0 || x > F.x1 || z < F.z0 || z > F.z1)
continue;
var rt = F.y + F.h + 0.3;
if (rt <= f + 0.75 && f >= rt - 0.4 && (best === null || rt > best + 0.5))
best = rt;
}
return best;
},
function (K, x, z, lo, hi) {
var best = null, i, F, under = gldGroundIn(K, x, z, hi);
for (i = 0; i < K.floors.length; i++) {
F = K.floors[i];
if (x >= F.x0 && x <= F.x1 && z >= F.z0 && z <= F.z1 && F.y > lo && F.y <= hi + 0.02 && (best === null || F.y > best))
best = F.y;
}
for (i = 0; i < K.ramps.length; i++) {
F = K.ramps[i];
if (x < F.x0 || x > F.x1 || z < F.z0 || z > F.z1)
continue;
var a = F.axis === "x" ? x : z, t = Math.max(0, Math.min(1, (a - F.a0) / (F.a1 - F.a0))), y = F.y0 + (F.y1 - F.y0) * t;
if (y > lo && y <= hi + 0.02 && (best === null || y > best))
best = y;
}
if (under !== null && under > lo && under <= hi + 0.02 && (best === null || under > best))
best = under;
return best;
},
function (K) {
if (typeof camera === "undefined")
return;
var P = camera.position, L = worldLocal(), feet = L.y - 1.72, top = gldCeilAt(K, L.x, L.z, feet);
if (top !== null && feet + 1.85 > top) {
var f = top - 1.86;
P.y = f + 1.72;
feet = f;
if (typeof flyY !== "undefined")
flyY = f;
if (typeof flyVz !== "undefined" && flyVz > 0)
flyVz = 0;
}
var H = K.hold;
if (H && feet < H.feet - 0.03 && Math.abs(L.x - H.x) < 3 && Math.abs(L.z - H.z) < 3) {
var s = gldSurfaceIn(K, L.x, L.z, feet + 0.03, H.feet);
if (s !== null) {
P.y = s + 1.72;
feet = s;
if (typeof flyY !== "undefined" && flyY < s)
flyY = s;
if (typeof flyVz !== "undefined" && flyVz < 0)
flyVz = 0;
}
}
K.hold = { x: L.x, z: L.z, feet: feet };
},
function (dir, a, b, c, y, h, t, mat, opens, o) {
o = o || {};
opens = (opens || []).filter(Boolean).slice().sort(function (p, q) { return p.at - q.at; });
var lo = Math.min(a, b), hi = Math.max(a, b), cur = lo;
function seg(s0, s1, y0, y1, solid) {
if (s1 - s0 < 0.02 || y1 - y0 < 0.02)
return;
var mid = (s0 + s1) / 2, len = s1 - s0, hh = y1 - y0;
if (dir === "x")
gldBox(len, hh, t, mat, mid, y0 + hh / 2, c);
else
gldBox(t, hh, len, mat, c, y0 + hh / 2, mid);
if (solid) {
if (dir === "x")
gldSolid(mid, c, len / 2, t / 2, y0, hh);
else
gldSolid(c, mid, t / 2, len / 2, y0, hh);
}
}
opens.forEach(function (O) {
var s0 = Math.max(lo, O.at - O.w / 2), s1 = Math.min(hi, O.at + O.w / 2), sill = O.sill || 0, top = Math.min(h, sill + (O.h || 2.6)), yb = y + sill;
seg(cur, s0, y, y + h, true);
seg(s0, s1, y + top, y + h, false);
if (sill > 0)
seg(s0, s1, y, yb, true);
if (O.glass) {
var gm = gldMat(0xA8C8D8, null, { op: 0.25 });
if (dir === "x")
gldBox(s1 - s0, top - sill, 0.04, gm, (s0 + s1) / 2, yb + (top - sill) / 2, c);
else
gldBox(0.04, top - sill, s1 - s0, gm, c, yb + (top - sill) / 2, (s0 + s1) / 2);
if (dir === "x")
gldSolid((s0 + s1) / 2, c, (s1 - s0) / 2, t / 2, yb, top - sill);
else
gldSolid(c, (s0 + s1) / 2, t / 2, (s1 - s0) / 2, yb, top - sill);
}
var dp = o.deep || t + 0.6, fr = o.frameMat || gldMat(0x2A1E16, "wood"), fh = top - sill;
if (!O.bare) {
if (dir === "x") {
gldBox(0.16, fh, dp, fr, s0 - 0.08, yb + fh / 2, c);
gldBox(0.16, fh, dp, fr, s1 + 0.08, yb + fh / 2, c);
gldBox(s1 - s0 + 0.32, 0.2, dp, fr, (s0 + s1) / 2, yb + fh + 0.1, c);
}
else {
gldBox(dp, fh, 0.16, fr, c, yb + fh / 2, s0 - 0.08);
gldBox(dp, fh, 0.16, fr, c, yb + fh / 2, s1 + 0.08);
gldBox(dp, 0.2, s1 - s0 + 0.32, fr, c, yb + fh + 0.1, (s0 + s1) / 2);
}
}
if (!O.glass && !sill) {
if (dir === "x") {
gldFloor(s0, c - 0.9, s1, c + 0.9, yb);
gldBox(s1 - s0, 0.1, dp, o.stepMat || gldMat(0x3A3028, "stone"), (s0 + s1) / 2, yb - 0.05, c);
}
else {
gldFloor(c - 0.9, s0, c + 0.9, s1, yb);
gldBox(dp, 0.1, s1 - s0, o.stepMat || gldMat(0x3A3028, "stone"), c, yb - 0.05, (s0 + s1) / 2);
}
}
cur = s1;
});
seg(cur, hi, y, y + h, true);
if (o.skirt !== false) {
var sk = o.skirtMat || gldMat(0x2A2018, "wood");
if (dir === "x")
gldBox(hi - lo, 0.2, t + 0.04, sk, (lo + hi) / 2, y + 0.1, c);
else
gldBox(t + 0.04, 0.2, hi - lo, sk, c, y + 0.1, (lo + hi) / 2);
}
},
function (R) {
var ins = R.inset === undefined ? 0.3 : R.inset;
R = Object.assign({}, R, { x0: R.x0 + ins, x1: R.x1 - ins, z0: R.z0 + ins, z1: R.z1 - ins });
var y = R.y || 0, h = R.h || 4.2, t = R.t || 0.35, D = R.doors || {}, sk = R.skip || "";
var fl = R.floor || gldMat(0x6A4A2A, "wood"), wl = R.wall || gldMat(0xD8CCB0, "plaster"), ce = R.ceil === null ? null : (R.ceil || gldMat(0xE0D6C0, "plaster"));
var w = R.x1 - R.x0, d = R.z1 - R.z0, cx = (R.x0 + R.x1) / 2, cz = (R.z0 + R.z1) / 2;
if (R.floor !== null) {
gldBox(w, 0.3, d, fl, cx, y - 0.15, cz);
gldFloor(R.x0, R.z0, R.x1, R.z1, y);
}
if (ce)
gldBox(w, 0.3, d, ce, cx, y + h + 0.15, cz);
if (R.beams && ce) {
var bm = R.beamMat || gldMat(0x3A2614, "wood");
for (var bx = R.x0 + 1.6; bx < R.x1 - 0.8; bx += 2.4)
gldBox(0.26, 0.32, d, bm, bx, y + h - 0.16, cz);
}
var o = { frameMat: R.frameMat, skirtMat: R.skirtMat, skirt: R.skirt };
if (sk.indexOf("n") < 0)
gldWall("x", R.x0, R.x1, R.z0, y, h, t, wl, D.n, o);
if (sk.indexOf("s") < 0)
gldWall("x", R.x0, R.x1, R.z1, y, h, t, wl, D.s, o);
if (sk.indexOf("w") < 0)
gldWall("z", R.z0, R.z1, R.x0, y, h, t, wl, D.w, o);
if (sk.indexOf("e") < 0)
gldWall("z", R.z0, R.z1, R.x1, y, h, t, wl, D.e, o);
var rec = { x0: R.x0, z0: R.z0, x1: R.x1, z1: R.z1, y: y, h: h, name: R.name || "", key: R.key || "", rank: R.rank || 0 };
GLK.rooms.push(rec);
return { x0: R.x0, z0: R.z0, x1: R.x1, z1: R.z1, cx: cx, cz: cz, w: w, d: d, y: y, h: h, rec: rec };
},
function (x, y, z, r, n, parent) {
var P = parent || gldP(), ir = gldMat(0x1A1816, "metal"), g = gldGroup(x, y, z, 0, P);
var ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.04, 6, gldSeg(28)), ir);
ring.rotation.x = Math.PI / 2;
g.add(ring);
gldCyl(0.015, 1.4, ir, 0, 0.7, 0, g, 4);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
gldCyl(0.012, r, ir, Math.cos(a) * r / 2, 0.25, Math.sin(a) * r / 2, g, 4).rotation.z = Math.PI / 2.6;
gldCandle(Math.cos(a) * r, 0.02, Math.sin(a) * r, 1, g);
}
return g;
},
function (o) {
var y = o.y || 0, w = o.w || 2, h = o.h || 2.6, dir = o.dir, f = o.face || 1, nx = dir === "z" ? f : 0, nz = dir === "x" ? f : 0;
var px = dir === "x" ? o.at : o.c, pz = dir === "x" ? o.c : o.at, ry = dir === "x" ? (f > 0 ? 0 : Math.PI) : (f > 0 ? Math.PI / 2 : -Math.PI / 2);
var leaf = gldGroup(px + nx * 0.2, y, pz + nz * 0.2, ry), K = GLK;
leaf.userData.keep = 1;
if (o.kind === "rags") {
var cols = [0x6A5A4A, 0x7A6A5A, 0x5A4A3A, 0x8A7A6A, 0x4A4038, 0x6A6050];
for (var r = 0; r < 3; r++)
for (var c = 0; c < Math.round(w / 0.9); c++) {
var bw = 0.86, bx = -w / 2 + 0.45 + c * 0.9 + (r % 2) * 0.12, by = 0.42 + r * 0.84;
var b = gldBox(bw, 0.8, 0.7, gldCloth(cols[(r * 3 + c) % cols.length], 0x2A2018, 0), bx, by, 0, leaf);
b.rotation.z = ((r * 7 + c * 3) % 5 - 2) * 0.02;
gldBox(0.02, 0.82, 0.72, gldMat(0x8A7A50, null), bx - 0.2, by, 0, leaf);
gldBox(0.02, 0.82, 0.72, gldMat(0x8A7A50, null), bx + 0.2, by, 0, leaf);
}
}
else if (o.kind === "loom") {
var wd = gldMat(0x4A3420, "wood");
gldBox(0.14, h, 0.14, wd, -w / 2, h / 2, 0, leaf);
gldBox(0.14, h, 0.14, wd, w / 2, h / 2, 0, leaf);
gldBox(w + 0.2, 0.14, 0.14, wd, 0, h - 0.1, 0, leaf);
gldBox(w + 0.2, 0.16, 0.3, wd, 0, 0.5, 0.1, leaf);
gldCyl(0.08, w, wd, 0, h - 0.4, 0.05, leaf, 10).rotation.z = Math.PI / 2;
gldCyl(0.12, w, gldCloth(0x4A1A3A, 0x1A0A14, 0), 0, 0.9, 0.15, leaf, 12).rotation.z = Math.PI / 2;
var th = gldMat(0xD8D0E0, null), half = [gldGroup(0, 0, 0, 0, leaf), gldGroup(0, 0, 0, 0, leaf)];
for (var i = 0; i < (GLD.lite ? 18 : 40); i++) {
var tx = -w / 2 + 0.15 + i * (w - 0.3) / ((GLD.lite ? 18 : 40) - 1);
gldBox(0.008, h - 1.4, 0.008, th, tx, (h - 1.4) / 2 + 0.95, 0.04, half[tx < 0 ? 0 : 1]);
}
leaf.userData.halves = half;
gldBox(w - 0.2, (h - 1.4) * 0.5, 0.02, gldCanvasMat("loomcloth", 128, 128, function (x, W, H) {
x.fillStyle = "#3A1A2E";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C8A8D8";
x.lineWidth = 2;
for (var k = 0; k < 8; k++) {
x.beginPath();
x.arc(W / 2, H / 2, 8 + k * 8, 0, 6.3);
x.stroke();
}
for (var q = 0; q < 8; q++) {
x.beginPath();
x.moveTo(W / 2, H / 2);
x.lineTo(W / 2 + Math.cos(q / 8 * 6.28) * 70, H / 2 + Math.sin(q / 8 * 6.28) * 70);
x.stroke();
}
}), 0, 1.25, 0.03, leaf);
}
else if (o.kind === "bookcase") {
var bw2 = gldMat(0x3A2614, "wood");
gldBox(w, h, 0.42, bw2, 0, h / 2, 0, leaf);
for (var s = 0; s < 5; s++) {
var yy = 0.35 + s * (h - 0.5) / 5;
gldBox(w - 0.1, 0.04, 0.38, gldMat(0x2A1A0E, "wood"), 0, yy, 0.04, leaf);
for (var bk = 0; bk < Math.floor((w - 0.2) / 0.09); bk++) {
var bh = 0.22 + ((bk * 7 + s * 3) % 5) * 0.03;
gldBox(0.07, bh, 0.26, gldMat([0x5A1A1A, 0x1A2A4A, 0x2A3A1A, 0x4A3A1A, 0x2A1A1A][(bk + s * 2) % 5], null), -w / 2 + 0.14 + bk * 0.09, yy + 0.02 + bh / 2, 0.08, leaf);
}
}
}
else if (o.kind === "barrel") {
var tw = gldMat(0x7A5434, "wood"), r = Math.min(w, h) / 2, ir = GLD_IRON();
var tun = gldCyl(r, 1.0, tw, 0, r, -0.25, leaf, 20, r);
tun.rotation.x = Math.PI / 2;
[-0.62, -0.25, 0.12].forEach(function (dz) { var hp = new THREE.Mesh(new THREE.TorusGeometry(r + 0.01, 0.035, 5, 24), ir); hp.position.set(0, r, dz); leaf.add(hp); });
var hd = gldCyl(r - 0.04, 0.03, gldMat(0x8A6440, "wood"), 0, r, 0.27, leaf, 20);
hd.rotation.x = Math.PI / 2;
for (var st = -3; st <= 3; st++)
gldBox(0.02, Math.sqrt(Math.max(0.01, r * r - (st * r / 3.6) * (st * r / 3.6))) * 1.9, 0.02, gldMat(0x4A3420, null), st * r / 3.6, r, 0.29, leaf);
gldCyl(0.07, 0.06, gldMat(0x3A2A1A, "wood"), 0, r * 0.45, 0.31, leaf, 8).rotation.x = Math.PI / 2;
gldBox(w + 0.2, 0.25, 0.9, gldMat(0x3A2A1A, "wood"), 0, 0.12, -0.2, leaf);
gldBox(w, h, 0.1, o.back || gldMat(0x3A2A1A, "wood"), 0, h / 2, -0.8, leaf);
}
else {
gldBox(w, h, 0.12, gldMat(0x3A2A1A, "wood"), 0, h / 2, 0, leaf);
for (var p = 0; p < 3; p++)
for (var q2 = 0; q2 < 2; q2++)
gldBox(w / 2 - 0.25, h / 3 - 0.25, 0.04, gldMat(0x4A3424, "wood"), (q2 - 0.5) * w / 2, h / 6 + p * h / 3, 0.07, leaf);
}
var sol = dir === "x" ? gldSolid(o.at, o.c, w / 2, 0.35, y, h) : gldSolid(o.c, o.at, 0.35, w / 2, y, h);
var S = { id: o.id, kind: o.kind, leaf: leaf, sol: sol, open: false, amt: 0, x: px + nx * 0.9, z: pz + nz * 0.9, y: y, w: w, h: h, dir: dir, name: o.name, when: o.when, solids: K.solids, after: o.after };
K.secrets.push(S);
gldSpot(S.x, S.z, 1.7, o.hint || "Something about this", "look closer", function () { gldSecretTry(S); }, { y: y, when: function () { return !S.open; } });
return S;
},
function (S) {
if (S.when) {
var why = S.when();
if (why) {
gldSay(why);
return;
}
}
S.open = true;
var i = S.solids.indexOf(S.sol);
if (i >= 0)
S.solids.splice(i, 1);
gldSay("🗝️ <b>A way through.</b> " + gldEsc(S.name) + " opens.");
if (typeof playTone === "function")
playTone(120, 0.5);
if (S.after)
try {
S.after();
}
catch (e) { }
},
function (dt, list) {
list.forEach(function (S) {
var want = S.open ? 1 : 0;
if (Math.abs(S.amt - want) < 0.001)
return;
S.amt += (want - S.amt) * Math.min(1, dt * 2.2);
var a = S.amt, L = S.leaf;
if (S.kind === "loom" && L.userData.halves) {
L.userData.halves[0].position.x = -a * (S.w * 0.45);
L.userData.halves[1].position.x = a * (S.w * 0.45);
L.userData.p0 = L.userData.p0 || { x: L.position.x, z: L.position.z };
var sx = (S.dir === "x" ? 1 : 0), sz = (S.dir === "z" ? 1 : 0);
L.position.x = L.userData.p0.x + sx * a * (S.w + 0.3);
L.position.z = L.userData.p0.z + sz * a * (S.w + 0.3);
return;
}
var sx2 = (S.dir === "x" ? 1 : 0), sz2 = (S.dir === "z" ? 1 : 0);
L.userData.p0 = L.userData.p0 || { x: L.position.x, z: L.position.z };
L.position.x = L.userData.p0.x + sx2 * a * (S.w + 0.15);
L.position.z = L.userData.p0.z + sz2 * a * (S.w + 0.15);
});
},
function (x, y, z, ry, w, d, o) {
o = o || {};
var g = gldPiece(x, y, z, ry, o.parent), m = o.mat || gldW(o.wood || "oak"), h = o.h || 0.78;
gldBox(w, 0.06, d, m, 0, h - 0.03, 0, g);
if (o.trestle) {
[-1, 1].forEach(function (s) { gldBox(0.1, h - 0.06, d * 0.8, m, s * (w / 2 - 0.3), (h - 0.06) / 2, 0, g); gldBox(0.14, 0.08, d * 0.9, m, s * (w / 2 - 0.3), 0.04, 0, g); });
gldBox(w - 0.7, 0.08, 0.08, m, 0, 0.3, 0, g);
}
else {
[[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (q) { gldCyl(0.035, h - 0.06, m, q[0] * (w / 2 - 0.08), (h - 0.06) / 2, q[1] * (d / 2 - 0.08), g, 8); });
gldBox(w - 0.16, 0.08, 0.03, m, 0, h - 0.1, d / 2 - 0.08, g);
gldBox(w - 0.16, 0.08, 0.03, m, 0, h - 0.1, -d / 2 + 0.08, g);
}
gldSolidIn(g, 0, 0, w / 2, d / 2, h);
return g;
},
function (x, y, z, ry, o) {
o = o || {};
var g = gldPiece(x, y, z, ry), m = o.mat || gldW(o.wood || "dark");
gldBox(0.46, 0.05, 0.44, m, 0, 0.46, 0, g);
[[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (q) { gldCyl(0.022, 0.45, m, q[0] * 0.2, 0.225, q[1] * 0.19, g, 6); });
gldCyl(0.024, 0.62, m, -0.2, 0.77, -0.19, g, 6);
gldCyl(0.024, 0.62, m, 0.2, 0.77, -0.19, g, 6);
for (var i = 0; i < 3; i++)
gldBox(0.4, 0.05, 0.025, m, 0, 0.66 + i * 0.17, -0.19, g);
if (o.cushion)
gldBox(0.42, 0.05, 0.4, gldCloth(o.cushion, 0x1A1010, 0), 0, 0.5, 0, g);
gldSolidIn(g, 0, 0, 0.25, 0.25, 0.5);
return g;
},
function (x, y, z, s, parent) {
s = s || 1;
var g = gldPiece(x, y, z, 0, parent), w = gldW("oak"), ir = GLD_IRON();
gldCyl(0.3 * s, 0.9 * s, w, 0, 0.45 * s, 0, g, 14, 0.27 * s);
var top = gldCyl(0.33 * s, 0.42 * s, w, 0, 0.67 * s, 0, g, 14, 0.3 * s);
top.scale.y = 1;
var bot = gldCyl(0.3 * s, 0.42 * s, w, 0, 0.23 * s, 0, g, 14, 0.33 * s);
[0.08, 0.36, 0.56, 0.84].forEach(function (h) { gldCyl(h < 0.5 ? 0.3 * s + (h - 0.08) * 0.11 : 0.33 * s - (h - 0.56) * 0.11, 0.03 * s, ir, 0, h * s, 0, g, 14); });
gldCyl(0.28 * s, 0.02, gldW("dark"), 0, 0.9 * s, 0, g, 14);
gldRoundIn(g, 0.33 * s, 0.9 * s);
return g;
},
function (x, y, z, ry, s, parent) {
s = s || 1;
var g = gldPiece(x, y, z, ry, parent), w = gldW("pale"), d = gldW("oak"), e = 0.7 * s;
gldBox(e, e, e, w, 0, e / 2, 0, g);
[-1, 1].forEach(function (a) { [-1, 1].forEach(function (b) { gldBox(0.06 * s, e + 0.01, 0.06 * s, d, a * (e / 2 - 0.02), e / 2, b * (e / 2 - 0.02), g); }); });
gldBox(e * 1.3, 0.06 * s, 0.02, d, 0, e / 2, e / 2 + 0.01, g).rotation.z = 0.78;
gldSolidIn(g, 0, 0, e / 2, e / 2, e);
return g;
},
function (x, y, z, ry, col) {
var g = gldPiece(x, y, z, ry), w = gldMat(col || 0x4A2A14, "wood"), ir = GLD_BRASS();
gldBox(1.0, 0.5, 0.56, w, 0, 0.25, 0, g);
var lid = gldCyl(0.28, 1.0, w, 0, 0.5, 0, g, 12);
lid.rotation.z = Math.PI / 2;
lid.scale.set(1, 1, 0.55);
[-0.38, 0, 0.38].forEach(function (px) { gldBox(0.05, 0.52, 0.58, ir, px, 0.27, 0, g); });
gldBox(0.1, 0.12, 0.04, ir, 0, 0.44, 0.29, g);
gldSolidIn(g, 0, 0, 0.5, 0.3, 0.7);
return g;
},
function (x, y, z, ry, w, h, what, o) {
o = o || {};
var g = gldPiece(x, y, z, ry), m = gldW(o.wood || "dark"), n = o.n || 4;
gldBox(w, h, 0.04, m, 0, h / 2, -0.18, g);
gldBox(0.05, h, 0.4, m, -w / 2, h / 2, 0, g);
gldBox(0.05, h, 0.4, m, w / 2, h / 2, 0, g);
for (var s = 0; s < n; s++) {
var yy = 0.3 + s * (h - 0.4) / (n - 1 || 1);
gldBox(w, 0.04, 0.4, m, 0, yy, 0, g);
var cnt = Math.floor((w - 0.2) / 0.22), seed = s * 7 + (o.seed || 0);
for (var i = 0; i < cnt; i++) {
var px = -w / 2 + 0.16 + i * (w - 0.3) / Math.max(1, cnt - 1), k = (i * 13 + seed * 5) % 7;
if (what === "jars") {
gldCyl(0.06, 0.16 + k * 0.012, gldMat([0x8AA890, 0xC8B890, 0x9A6A4A, 0x6A8AA8, 0xD8C8A0][k % 5], null, { op: 0.85 }), px, yy + 0.1, 0, g, 8);
gldCyl(0.065, 0.03, gldW("dark"), px, yy + 0.2 + k * 0.012, 0, g, 8);
}
else if (what === "bottles") {
gldCyl(0.04, 0.2, gldMat([0x2A4A2A, 0x4A1A2A, 0x2A2A4A, 0x6A4A1A][k % 4], null, { phong: 80 }), px, yy + 0.12, 0, g, 8);
gldCyl(0.012, 0.08, gldMat(0x2A2A2A, null), px, yy + 0.26, 0, g, 5);
}
else if (what === "bolts") {
var b = gldCyl(0.09, 0.36, gldCloth([0x8A2A2A, 0x2A4A7A, 0x3A6A3A, 0xC8A040, 0x6A3A6A, 0xD8D0C0][k % 6], 0x1A1A1A, 0), px, yy + 0.11, 0, g, 10);
b.rotation.x = Math.PI / 2;
}
else if (what === "pots") {
var p = gldSph(0.09 + k * 0.006, gldMat([0xA8643A, 0x8A5030, 0xC88A5A, 0x6A7A8A][k % 4], "tile"), px, yy + 0.1, 0, g, 10);
p.scale.y = 1.2;
}
else if (what === "books" || what === "ledgers") {
var bh = what === "ledgers" ? 0.32 : 0.22 + k * 0.02;
for (var q = 0; q < 3; q++)
gldBox(0.05, bh, 0.26, gldMat(what === "ledgers" ? [0x3A1A0A, 0x1A2A1A, 0x4A2A1A][q] : [0x5A1A1A, 0x1A2A4A, 0x2A3A1A, 0x4A3A1A, 0x2A1A2A][(k + q) % 5], null), px - 0.06 + q * 0.06, yy + 0.02 + bh / 2, 0.02, g);
}
else if (what === "ingots") {
for (var q2 = 0; q2 < 2; q2++)
gldBox(0.16, 0.05, 0.07, gldMat([0x8A8A88, 0xB87333, 0xC8A040, 0x6A6A70][k % 4], "metal", { phong: 60 }), px, yy + 0.05 + q2 * 0.05, (q2 - 0.5) * 0.08, g);
}
else if (what === "tools") {
gldBox(0.03, 0.22, 0.03, gldW("oak"), px, yy + 0.11, 0, g);
gldBox(0.12, 0.05, 0.05, GLD_IRON(), px, yy + 0.24, 0, g);
}
}
}
gldSolidIn(g, 0, 0, w / 2, 0.24, h);
return g;
},
function (x, y, z, ry, w, d, col, col2, col3) {
var hx = function (c) { return "#" + ("000000" + c.toString(16)).slice(-6); };
var m = gldCanvasMat("rug|" + col + "|" + col2 + "|" + col3, 256, 192, function (c, W, H) {
c.fillStyle = hx(col);
c.fillRect(0, 0, W, H);
c.strokeStyle = hx(col2);
c.lineWidth = 14;
c.strokeRect(10, 10, W - 20, H - 20);
c.lineWidth = 3;
c.strokeStyle = hx(col3 || col2);
c.strokeRect(26, 26, W - 52, H - 52);
c.fillStyle = hx(col2);
c.beginPath();
c.ellipse(W / 2, H / 2, 48, 34, 0, 0, 6.3);
c.fill();
c.fillStyle = hx(col3 || col);
c.beginPath();
c.ellipse(W / 2, H / 2, 26, 18, 0, 0, 6.3);
c.fill();
for (var i = 0; i < 10; i++) {
c.fillStyle = hx(col3 || col2);
c.fillRect(40 + i * (W - 80) / 9, H / 2 - 3, 6, 6);
}
});
var r = gldPlane(w, d, m, x, y + 0.012, z, 0);
r.rotation.x = -Math.PI / 2;
r.rotation.z = ry || 0;
return r;
},
function (c, W, H) {
[[-1, 0.42], [1, 0.56]].forEach(function (q) {
var x = W / 2 + q[0] * 16, y = H * q[1];
c.beginPath();
c.ellipse(x, y, 20, 25, 0, 0, 6.3);
c.fill();
c.save();
c.globalCompositeOperation = "destination-out";
c.beginPath();
c.arc(x - 7, y - 6, 4, 0, 6.3);
c.arc(x + 7, y - 6, 4, 0, 6.3);
c.fill();
c.beginPath();
c.arc(x, y + (q[0] < 0 ? 6 : 14), 8, q[0] < 0 ? 0.2 : 3.4, q[0] < 0 ? 2.9 : 6.0);
c.lineWidth = 3;
c.stroke();
c.restore();
});
},
function (c, W, H) { c.beginPath(); c.moveTo(W * 0.2, H * 0.55); c.lineTo(W * 0.8, H * 0.55); c.lineTo(W * 0.68, H * 0.66); c.lineTo(W * 0.32, H * 0.66); c.fill(); c.lineWidth = 3; for (var i = 0; i < 3; i++) {
c.beginPath();
c.moveTo(W * 0.2, H * (0.72 + i * 0.05));
c.quadraticCurveTo(W * 0.35, H * (0.69 + i * 0.05), W * 0.5, H * (0.72 + i * 0.05));
c.quadraticCurveTo(W * 0.65, H * (0.75 + i * 0.05), W * 0.8, H * (0.72 + i * 0.05));
c.stroke();
} c.fillRect(W / 2 - 2, H * 0.25, 4, H * 0.3); c.beginPath(); c.moveTo(W / 2 + 3, H * 0.27); c.lineTo(W * 0.72, H * 0.5); c.lineTo(W / 2 + 3, H * 0.5); c.fill(); },
function (x, y, z, ry, o) {
o = o || {};
var g = gldPiece(x, y, z, ry), st = o.mat || gldMat(0x8A8070, "stone"), bk = gldMat(0x14100C, null);
gldBox(2.4, 0.2, 0.6, st, 0, 1.5, 0.1, g);
gldBox(0.45, 1.4, 0.5, st, -1.0, 0.7, 0, g);
gldBox(0.45, 1.4, 0.5, st, 1.0, 0.7, 0, g);
gldBox(1.6, 1.3, 0.1, bk, 0, 0.65, -0.2, g);
gldBox(2.8, o.h || 2.2, 0.4, st, 0, 1.6 + ((o.h || 2.2) / 2), -0.1, g);
gldBox(1.2, 0.06, 0.3, GLD_IRON(), 0, 0.15, 0.05, g);
for (var l = 0; l < 3; l++) {
var lg = gldCyl(0.07, 0.9, gldMat(0x3A2614, "bark"), 0, 0.24 + l * 0.05, 0.05 - l * 0.05, g, 6);
lg.rotation.z = Math.PI / 2;
}
gldFlame(-0.15, 0.3, 0.05, 2.6, 0xFF8A30, g);
gldFlame(0.2, 0.3, 0, 2.2, 0xFFA040, g);
if (o.candles)
[-0.9, 0.9].forEach(function (p) { gldCandle(p, 1.62, 0.1, 1.2, g); });
gldSolidIn(g, 0, 0, 1.3, 0.4, 1.6);
return g;
},
function (x, y, z, ry, o) {
o = o || {};
var g = gldTable(x, y, z, ry, 2.0, 0.8, { wood: "pale", h: 0.86 }), ir = GLD_IRON(), w = gldW("oak");
gldBox(0.22, 0.14, 0.16, ir, -0.85, 0.95, 0.32, g);
gldCyl(0.015, 0.3, ir, -0.85, 0.95, 0.45, g, 5).rotation.x = Math.PI / 2;
gldBox(1.9, 0.5, 0.04, w, 0, 1.15, -0.42, g);
[-0.7, -0.4, -0.1, 0.2, 0.5, 0.8].forEach(function (px, i) { gldBox(0.03, 0.22, 0.02, w, px, 1.15, -0.38, g); gldBox(i % 2 ? 0.12 : 0.04, i % 2 ? 0.04 : 0.1, 0.03, ir, px, 1.28, -0.38, g); });
gldBox(0.5, 0.06, 0.12, gldW("pale"), 0.3, 0.92, 0, g);
gldBox(0.16, 0.06, 0.06, ir, -0.2, 0.92, 0.1, g);
for (var i = 0; i < 6; i++) {
var sv = gldBox(0.12, 0.01, 0.03, gldMat(0xD8B880, null), -0.5 + i * 0.17, 0.895, 0.15 + (i % 3) * 0.08, g);
sv.rotation.y = i;
}
return g;
},
function (x, y, z, ry) {
var g = gldPiece(x, y, z, ry), w = gldW("dark"), ir = GLD_IRON();
gldBox(2.0, 0.12, 0.36, w, 0, 0.9, 0, g);
[-0.85, 0.85].forEach(function (px) { gldBox(0.12, 0.9, 0.3, w, px, 0.45, 0, g); });
gldBox(0.24, 0.3, 0.24, w, -0.7, 1.1, 0, g);
gldBox(0.2, 0.26, 0.2, w, 0.6, 1.08, 0, g);
var wk = gldCyl(0.06, 1.1, gldMat(0xC8A070, "wood"), -0.05, 1.15, 0, g, 10);
wk.rotation.z = Math.PI / 2;
wk.userData.keep = 1;
GLK.spin.push({ m: wk, ax: "x", sp: 0 });
var wh = gldCyl(0.45, 0.06, w, -0.95, 0.5, 0.3, g, 16);
wh.rotation.x = Math.PI / 2;
gldBox(0.6, 0.04, 0.3, ir, 0.1, 0.98, 0.2, g);
gldSolidIn(g, 0, 0, 1.05, 0.4, 1.2);
return g;
},
function (x, y, z, ry, col) {
var g = gldPiece(x, y, z, ry), w = gldW("oak"), wd = 1.6, h = 1.9;
[-1, 1].forEach(function (s) { gldBox(0.1, h, 0.1, w, s * wd / 2, h / 2, -0.5, g); gldBox(0.1, 1.0, 0.1, w, s * wd / 2, 0.5, 0.5, g); gldBox(0.08, 0.08, 1.1, w, s * wd / 2, 1.0, 0, g); gldBox(0.08, 0.08, 1.1, w, s * wd / 2, 0.15, 0, g); });
gldBox(wd + 0.1, 0.1, 0.1, w, 0, h, -0.5, g);
var wb = gldCyl(0.07, wd, w, 0, h - 0.2, -0.5, g, 10);
wb.rotation.z = Math.PI / 2;
var cb = gldCyl(0.1, wd, gldCloth(col || 0x8A2A2A, 0x2A1010, 0), 0, 0.95, 0.5, g, 12);
cb.rotation.z = Math.PI / 2;
var th = gldMat(0xE8E0D0, null);
for (var i = 0; i < (GLD.lite ? 10 : 24); i++)
gldBox(0.006, 0.01, 1.0, th, -wd / 2 + 0.1 + i * (wd - 0.2) / ((GLD.lite ? 10 : 24) - 1), 0.95 + (i % 2) * 0.04, 0, g).rotation.x = -0.75;
gldBox(wd - 0.2, 0.02, 0.5, gldCloth(col || 0x8A2A2A, 0xC8A040, 0), 0, 0.9, 0.28, g);
gldBox(wd - 0.1, 0.5, 0.04, w, 0, 1.35, -0.05, g);
gldBench(0, 0, 0.95, 0, 1.0, g);
gldSolidIn(g, 0, 0, wd / 2 + 0.1, 0.6, h);
return g;
},
function (x, y, z, ry) {
var g = gldPiece(x, y, z, ry), w = gldW("oak"), cl = gldMat(0x9A6A4A, null);
gldBox(1.0, 0.06, 0.9, w, 0, 0.62, 0, g);
[[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (q) { gldBox(0.06, 0.62, 0.06, w, q[0] * 0.45, 0.31, q[1] * 0.4, g); });
var wh = gldCyl(0.28, 0.05, gldMat(0x5A5450, "stone"), 0, 0.68, 0, g, 18);
wh.userData.keep = 1;
GLK.spin.push({ m: wh, ax: "y", sp: 0 });
var pot = gldCyl(0.12, 0.22, cl, 0, 0.82, 0, g, 14, 0.16);
pot.userData.keep = 1;
GLK.spin.push({ m: pot, ax: "y", sp: 0 });
gldCyl(0.35, 0.05, gldMat(0x4A4440, "stone"), 0, 0.1, 0, g, 16);
gldBox(0.4, 0.04, 0.3, w, 0, 0.62, 0.55, g);
gldStool(0, 0, -0.7, g);
gldSolidIn(g, 0, 0, 0.55, 0.5, 0.9);
return g;
},
function (x, y, z, ry) {
var g = gldPiece(x, y, z, ry), br = gldMat(0x8A4A30, "brick");
var b = gldCyl(1.0, 2.0, br, 0, 1.0, 0, g, 16, 1.1);
var d = gldSph(1.0, br, 0, 2.0, 0, g, 16);
d.scale.y = 0.6;
gldBox(0.7, 0.8, 0.1, gldGlowM(0xFF7A2A), 0, 0.6, 1.05, g);
gldBox(0.9, 0.12, 0.25, br, 0, 1.06, 1.0, g);
gldCyl(0.18, 1.6, br, 0, 2.8, 0, g, 10);
gldFlame(0, 0.25, 0.9, 2, 0xFF8A30, g);
gldRoundIn(g, 1.2, 3.4);
return g;
},
function (x, y, z, ry) {
var g = gldPiece(x, y, z, ry), br = gldMat(0x6A4A3A, "brick"), ir = GLD_IRON();
gldBox(2.2, 1.6, 1.6, br, 0, 0.8, 0, g);
var dm = gldSph(1.1, br, 0, 1.6, 0, g, 14);
dm.scale.set(1, 0.55, 0.75);
[-0.55, 0.55].forEach(function (px) { gldCyl(0.22, 0.08, gldGlowM(0xFFB040), px, 1.0, 0.8, g, 14).rotation.x = Math.PI / 2; });
gldCyl(0.2, 2.0, br, 0, 2.6, -0.3, g, 10);
for (var i = 0; i < 3; i++) {
var p = gldCyl(0.015, 1.5, ir, 1.3, 1.0, -0.4 + i * 0.25, g, 5);
p.rotation.z = 0.25;
}
gldBox(0.8, 0.06, 0.5, gldMat(0x5A5A5A, "metal"), -1.6, 0.85, 0, g);
gldBox(0.06, 0.85, 0.06, ir, -1.9, 0.42, 0.2, g);
gldBox(0.06, 0.85, 0.06, ir, -1.3, 0.42, -0.2, g);
gldSph(0.08, gldGlowM(0xFF9A40), -1.6, 0.95, 0, g, 8);
gldSolidIn(g, 0, 0, 1.15, 0.85, 2.2);
return g;
},
function (x, y, z, ry) {
var g = gldPiece(x, y, z, ry), w = gldW("red"), br = GLD_BRASS();
gldBox(1.2, 0.06, 0.6, w, 0, 0.92, 0, g);
gldBox(1.2, 0.9, 0.05, w, 0, 0.45, -0.28, g);
[-0.58, 0.58].forEach(function (px) { gldBox(0.05, 0.9, 0.6, w, px, 0.45, 0, g); });
gldBox(0.3, 0.04, 0.12, w, 0, 0.92, 0.34, g);
gldBox(0.9, 0.02, 0.4, gldMat(0x2A2A2A, "metal"), 0, 0.85, 0.05, g);
gldCyl(0.02, 0.5, br, 0.4, 1.2, -0.15, g, 6);
var lp = gldCyl(0.08, 0.12, br, 0.4, 1.45, -0.05, g, 10, 0.04);
lp.rotation.x = 0.5;
gldSph(0.05, gldGlowM(0xFFF0C0), 0.4, 1.42, 0, g, 8);
[[-0.2, 0xC8203A], [0, 0x2040C8], [0.15, 0x20A050], [0.28, 0xE8E8F8]].forEach(function (q) { gldSph(0.018, gldMat(q[1], null, { phong: 120, spec: 0xFFFFFF }), q[0], 0.96, 0.1, g, 8); });
gldCyl(0.03, 0.02, br, -0.35, 0.96, 0.12, g, 10);
gldBox(0.1, 0.03, 0.05, GLD_IRON(), -0.05, 0.95, -0.05, g);
gldStool(0, 0, 0.7, g);
gldSolidIn(g, 0, 0, 0.62, 0.36, 1.0);
return g;
},
function (x, y, z, ry, w, fill) {
var g = gldPiece(x, y, z, ry), wd = gldW("dark"), gl = gldMat(0xC8E0E8, null, { op: 0.22 });
gldBox(w, 0.8, 0.6, wd, 0, 0.4, 0, g);
gldBox(w, 0.5, 0.6, gl, 0, 1.05, 0, g);
gldBox(w + 0.04, 0.04, 0.64, wd, 0, 1.31, 0, g);
[-1, 1].forEach(function (s) { gldBox(0.04, 0.5, 0.62, wd, s * w / 2, 1.05, 0, g); });
if (fill)
try {
fill(g, w);
}
catch (e) { }
gldSolidIn(g, 0, 0, w / 2, 0.32, 1.33);
return g;
},
function (x, y, z, ry) {
var g = gldPiece(x, y, z, ry), br = gldMat(0x5A3A2A, "brick"), ir = GLD_IRON();
gldBox(1.8, 0.8, 1.3, br, 0, 0.4, 0, g);
gldBox(1.2, 0.08, 0.8, gldGlowM(0xFF6A1A), 0, 0.82, 0.05, g);
for (var i = 0; i < (GLD.lite ? 4 : 10); i++)
gldSph(0.07, gldGlowM([0xFF8A2A, 0xFFB040, 0xE84A10][i % 3]), -0.45 + (i % 5) * 0.22, 0.86, -0.15 + Math.floor(i / 5) * 0.3, g, 6);
var hood = gldCyl(0.35, 1.2, gldMat(0x3A3634, "metal"), 0, 1.9, -0.1, g, 4, 1.05);
hood.rotation.y = Math.PI / 4;
gldCyl(0.3, 2.4, br, 0, 3.6, -0.2, g, 10);
gldFlame(-0.2, 0.85, 0.1, 2.2, 0xFF7A2A, g);
gldFlame(0.25, 0.85, -0.05, 1.8, 0xFFA040, g);
var bl = gldPiece(1.35, 0, 0.1, 0, g);
var bel = gldCyl(0.3, 0.9, gldMat(0x4A2A14, "wood"), 0, 0.75, 0, bl, 3, 0.05);
bel.rotation.z = Math.PI / 2;
bel.scale.set(1, 1, 0.35);
gldBox(0.06, 0.9, 0.06, ir, 0.2, 0.45, 0, bl);
gldCyl(0.02, 0.6, gldW("oak"), -0.45, 1.05, 0, bl, 5).rotation.z = Math.PI / 2;
var rack = gldPiece(-1.05, 0, 0.4, 0, g);
for (var t = 0; t < 4; t++) {
var tg = gldCyl(0.012, 0.9, ir, 0, 0.75, t * 0.12 - 0.18, rack, 5);
tg.rotation.x = 0.15;
}
gldSolidIn(g, 0, 0, 0.95, 0.7, 1.0);
gldSolidIn(g, 1.35, 0.1, 0.5, 0.25, 1.0);
return g;
},
function (x, y, z, ry, parent) {
var g = gldPiece(x, y, z, ry, parent), ir = gldMat(0x3A3A3C, "metal", { phong: 50 });
gldCyl(0.3, 0.55, gldMat(0x5A3A20, "bark"), 0, 0.28, 0, g, 12);
gldBox(0.3, 0.16, 0.22, ir, 0, 0.62, 0, g);
gldBox(0.66, 0.14, 0.24, ir, 0.04, 0.76, 0, g);
var horn = gldCyl(0.0, 0.3, ir, -0.42, 0.78, 0, g, 10, 0.11);
horn.rotation.z = Math.PI / 2;
gldBox(0.04, 0.04, 0.04, gldMat(0x1A1A1A, null), 0.25, 0.84, 0, g);
var hm = gldPiece(0.15, 0.86, 0.06, 0.6, g);
gldCyl(0.015, 0.32, gldW("oak"), 0, 0.01, 0.16, hm, 5).rotation.x = Math.PI / 2;
gldBox(0.12, 0.05, 0.05, GLD_IRON(), 0, 0.01, 0, hm);
gldRoundIn(g, 0.42, 0.85);
return g;
},
function (x, y, z, ry, w, what) {
var g = gldPiece(x, y, z, ry), wd = gldW("dark"), st = gldMat(0xC8C8D0, "metal", { phong: 90 }), ir = GLD_IRON();
gldBox(w, 0.08, 0.1, wd, 0, 1.9, 0, g);
gldBox(w, 0.08, 0.1, wd, 0, 0.9, 0, g);
[-1, 1].forEach(function (s) { gldBox(0.08, 1.2, 0.1, wd, s * w / 2, 1.4, 0, g); });
var n = Math.floor(w / 0.28);
for (var i = 0; i < n; i++) {
var px = -w / 2 + 0.2 + i * (w - 0.4) / Math.max(1, n - 1);
if (what === "shoes") {
for (var r = 0; r < 3; r++) {
var t = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.012, 4, 10, Math.PI * 1.4), ir);
t.position.set(px, 1.0 + r * 0.3, 0.07);
t.rotation.z = -Math.PI * 0.2;
g.add(t);
}
}
else if (what === "tongs") {
var tg = gldBox(0.025, 0.9, 0.02, ir, px, 1.35, 0.07, g);
tg.rotation.z = (i % 2 ? 0.06 : -0.06);
gldBox(0.08, 0.06, 0.04, ir, px, 1.82, 0.07, g);
}
else {
var k = i % 3;
if (k === 0) {
gldBox(0.05, 0.85, 0.012, st, px, 1.4, 0.07, g);
gldBox(0.2, 0.03, 0.04, GLD_BRASS(), px, 0.98, 0.07, g);
gldCyl(0.02, 0.18, gldMat(0x3A2014, null), px, 0.86, 0.07, g, 6);
}
else if (k === 1) {
gldCyl(0.018, 1.1, wd, px, 1.35, 0.07, g, 6);
gldBox(0.2, 0.16, 0.015, st, px + 0.08, 1.82, 0.07, g);
}
else {
gldCyl(0.015, 1.3, wd, px, 1.45, 0.07, g, 6);
var tip = gldCyl(0, 0.2, st, px, 2.2, 0.07, g, 6, 0.04);
}
}
}
gldSolidIn(g, 0, 0, w / 2, 0.12, 2.2);
return g;
},
function (x, y, z, ry, col) {
var g = gldPiece(x, y, z, ry), st = gldMat(col || 0xB8BCC4, "metal", { phong: 90 }), wd = gldW("dark");
gldCyl(0.25, 0.06, wd, 0, 0.03, 0, g, 12);
gldCyl(0.03, 1.4, wd, 0, 0.7, 0, g, 6);
var ch = gldCyl(0.2, 0.55, st, 0, 1.25, 0, g, 14, 0.17);
ch.scale.z = 0.75;
gldSph(0.13, st, 0, 1.68, 0, g, 12);
gldBox(0.44, 0.1, 0.2, st, 0, 1.5, 0, g);
[-1, 1].forEach(function (s) { var p = gldSph(0.1, st, s * 0.25, 1.48, 0, g, 10); p.scale.set(1.2, 0.7, 1); gldCyl(0.05, 0.4, st, s * 0.27, 1.25, 0, g, 8); });
var ts = gldCyl(0.22, 0.25, st, 0, 0.92, 0, g, 14, 0.25);
ts.scale.z = 0.75;
gldRoundIn(g, 0.35, 1.8);
return g;
},
function (x, y, z, ry, w, o) {
o = o || {};
var g = gldPiece(x, y, z, ry), wd = gldW(o.wood || "dark"), top = o.top || gldMat(0x2A2018, "marble", { phong: 60 });
gldBox(w, 1.0, 0.6, wd, 0, 0.5, 0, g);
gldBox(w + 0.1, 0.06, 0.7, top, 0, 1.03, 0, g);
for (var i = 0; i < Math.floor(w / 0.8); i++)
gldBox(0.6, 0.6, 0.02, gldW("oak"), -w / 2 + 0.5 + i * 0.8, 0.5, 0.31, g);
gldSolidIn(g, 0, 0, w / 2 + 0.05, 0.35, 1.05);
return g;
},
function (x, y, z, ry, o) {
o = o || {};
var g = gldTable(x, y, z, ry, 1.5, 0.75, { wood: "red" }), br = GLD_BRASS();
gldBox(0.5, 0.02, 0.36, gldMat(0xEDE4CC, null), 0, 0.79, 0.05, g);
gldBox(0.02, 0.03, 0.36, gldMat(0x3A1A0A, null), 0, 0.8, 0.05, g);
gldCyl(0.03, 0.05, gldMat(0x1A1A2A, null), 0.45, 0.81, -0.15, g, 8);
var q = gldBox(0.01, 0.2, 0.01, gldMat(0xEAE6E0, null), 0.47, 0.9, -0.15, g);
q.rotation.z = -0.3;
if (o.coin !== false)
for (var i = 0; i < 5; i++)
gldCyl(0.025, 0.01, gldMat(0xD8B040, "metal", { phong: 90 }), -0.5 + (i % 2) * 0.06, 0.79 + Math.floor(i / 2) * 0.01 + i * 0.004, -0.18, g, 10);
if (o.scales) {
gldCyl(0.006, 0.3, br, -0.35, 0.93, 0.15, g, 4);
gldBox(0.3, 0.006, 0.006, br, -0.35, 1.07, 0.15, g);
[-0.5, -0.2].forEach(function (px) { gldCyl(0.05, 0.01, br, px, 0.98, 0.15, g, 10); });
}
if (o.lamp) {
gldCyl(0.06, 0.02, br, 0.55, 0.79, 0.2, g, 10);
gldCyl(0.05, 0.14, gldMat(0xFFE8B0, null, { op: 0.5 }), 0.55, 0.87, 0.2, g, 10);
gldFlame(0.55, 0.82, 0.2, 0.8, 0xFFC070, g);
}
return g;
},
function (key, col) {
return gldCanvasMat("map|" + key, 256, 192, function (c, W, H) {
c.fillStyle = col || "#E8DCB8";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#6A4A2A";
c.lineWidth = 2;
var s = 0;
for (var k = 0; k < key.length; k++)
s = (s * 31 + key.charCodeAt(k)) % 997;
c.fillStyle = "#C8B888";
c.beginPath();
c.moveTo(20, 40 + s % 30);
for (var i = 0; i < 12; i++)
c.lineTo(20 + i * 18, 40 + ((s * (i + 3)) % 60));
c.lineTo(W - 20, H - 30);
c.lineTo(20, H - 20);
c.closePath();
c.fill();
c.stroke();
c.setLineDash([4, 3]);
c.strokeStyle = "#8A2A1A";
c.beginPath();
c.moveTo(30, H - 40);
c.bezierCurveTo(90, 30, 160, H - 30, W - 30, 50);
c.stroke();
c.setLineDash([]);
c.strokeStyle = "#2A2A4A";
c.beginPath();
c.arc(W - 40, H - 40, 18, 0, 6.3);
c.stroke();
for (var q = 0; q < 8; q++) {
c.beginPath();
c.moveTo(W - 40, H - 40);
c.lineTo(W - 40 + Math.cos(q * 0.785) * (q % 2 ? 12 : 24), H - 40 + Math.sin(q * 0.785) * (q % 2 ? 12 : 24));
c.stroke();
}
});
},
function (x, y, z) {
var g = gldPiece(x, y, z, 0), br = GLD_BRASS(), wd = gldW("dark");
for (var i = 0; i < 3; i++) {
var a = i / 3 * 6.283;
var l = gldCyl(0.025, 0.8, wd, Math.cos(a) * 0.22, 0.4, Math.sin(a) * 0.22, g, 6);
l.rotation.z = Math.cos(a) * 0.2;
l.rotation.x = -Math.sin(a) * 0.2;
}
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.02, 6, gldSeg(28)), br);
ring.position.y = 1.15;
g.add(ring);
var gb = gldSph(0.36, gldCanvasMat("globe", 256, 128, function (c, W, H) { c.fillStyle = "#3A6A8A"; c.fillRect(0, 0, W, H); c.fillStyle = "#C8B070"; for (var k = 0; k < 9; k++) {
c.beginPath();
c.ellipse((k * 53) % W, 30 + (k * 37) % 70, 18 + (k % 4) * 8, 10 + (k % 3) * 6, k, 0, 6.3);
c.fill();
} }), 0, 1.15, 0, g, 20);
gb.userData.keep = 1;
GLK.spin.push({ m: gb, ax: "y", sp: 0.08 });
gldRoundIn(g, 0.42, 1.6);
return g;
},
function (x, y, z, ry, o) {
o = o || {};
var g = gldPiece(x, y, z, ry), wd = gldW(o.wood || "dark");
gldBox(1.0, 0.35, 2.0, wd, 0, 0.25, 0, g);
gldBox(0.94, 0.16, 1.9, gldMat(0xEDE6D8, null), 0, 0.5, 0, g);
gldBox(0.94, 0.08, 1.2, gldCloth(o.col || 0x6A2A2A, 0x1A1010, o.border || 0), 0, 0.6, 0.32, g);
gldBox(0.6, 0.12, 0.3, gldMat(0xF4F0E8, null), 0, 0.62, -0.75, g);
gldBox(1.0, 0.9, 0.08, wd, 0, 0.55, -1.0, g);
if (o.curtain) {
[-1, 1].forEach(function (s) { gldBox(0.06, 2.1, 0.06, wd, s * 0.48, 1.05, -0.98, g); gldBox(0.06, 2.1, 0.06, wd, s * 0.48, 1.05, 0.98, g); gldBox(0.02, 1.9, 1.9, gldCloth(o.curtain, 0x101010, 0), s * 0.5, 1.1, 0, g); });
gldBox(1.0, 0.08, 2.0, wd, 0, 2.1, 0, g);
}
gldSolidIn(g, 0, 0, 0.5, 1.0, o.curtain ? 2.2 : 0.7);
return g;
},
function (x, y, z, ry, o) {
o = o || {};
var g = gldPiece(x, y, z, ry), m = o.mat || gldMat(0x1A1418, "wood", { phong: 40 }), cl = gldCloth(o.col || 0x4A1A4A, 0x1A0A1A, o.trim || 0xB8923A);
gldBox(1.0, 0.5, 0.8, m, 0, 0.25, 0, g);
gldBox(0.9, 0.1, 0.7, cl, 0, 0.55, 0.02, g);
gldBox(1.0, 2.4, 0.14, m, 0, 1.4, -0.38, g);
gldBox(0.82, 1.6, 0.04, cl, 0, 1.35, -0.3, g);
[-1, 1].forEach(function (s) { gldBox(0.12, 0.4, 0.8, m, s * 0.5, 0.75, 0, g); gldSph(0.08, GLD_BRASS(), s * 0.5, 0.98, 0.36, g, 8); gldSph(0.1, GLD_BRASS(), s * 0.48, 2.65, -0.38, g, 8); });
gldSolidIn(g, 0, 0, 0.55, 0.45, 1.0);
return g;
},
function (s, col, mark, parent) {
var g = new THREE.Group(), bd = gldMat(col || 0x18141C, null, { phong: 60, spec: 0x4A3A5A }), ey = gldGlowM(0xC8303A);
var ab = gldSph(0.5 * s, bd, 0, 0.45 * s, -0.45 * s, g, 12);
ab.scale.set(1, 0.8, 1.25);
gldSph(0.3 * s, bd, 0, 0.42 * s, 0.22 * s, g, 10);
for (var e = 0; e < (GLD.lite ? 2 : 6); e++)
gldSph(0.045 * s, ey, (e % 2 ? 1 : -1) * (0.06 + 0.05 * Math.floor(e / 2)) * s, 0.55 * s - Math.floor(e / 2) * 0.03 * s, 0.48 * s - Math.floor(e / 2) * 0.02 * s, g, 5);
if (mark) {
var mk = gldSph(0.14 * s, gldGlowM(mark), 0, 0.81 * s, -0.5 * s, g, 8);
mk.scale.set(1, 0.2, 1.4);
}
var legs = [];
for (var side = -1; side <= 1; side += 2)
for (var i = 0; i < 4; i++) {
var hip = new THREE.Group();
hip.position.set(side * 0.2 * s, 0.42 * s, (0.32 - i * 0.14) * s);
hip.rotation.y = side * (0.5 + i * 0.45 - 0.9) + (side < 0 ? Math.PI : 0);
g.add(hip);
var up = gldCyl(0.035 * s, 0.6 * s, bd, 0.3 * s, 0.18 * s, 0, hip, 5, 0.03 * s);
up.rotation.z = -1.0;
var kn = new THREE.Group();
kn.position.set(0.55 * s, 0.34 * s, 0);
hip.add(kn);
var lo = gldCyl(0.028 * s, 0.75 * s, bd, 0.2 * s, -0.32 * s, 0, kn, 5, 0.012 * s);
lo.rotation.z = 0.55;
legs.push({ hip: hip, ph: i * 0.8 + (side > 0 ? 0 : 1.6) });
}
g.userData.legs = legs;
if (parent)
parent.add(g);
return g;
},
function (s, col, parent) {
var g = new THREE.Group(), bd = gldMat(col || 0x3A2A18, null, { phong: 70 });
var b = gldSph(0.3 * s, bd, 0, 0.18 * s, 0, g, 10);
b.scale.set(0.8, 0.45, 1.5);
var prev = g, py = 0.2 * s, pz = -0.4 * s;
for (var i = 0; i < 6; i++) {
var sg = gldSph((0.11 - i * 0.01) * s, bd, 0, py, pz, g, 8);
py += 0.12 * s;
pz -= 0.06 * s - i * 0.03 * s;
}
var st = gldCyl(0, 0.16 * s, gldMat(0x1A1008, null), 0, py + 0.02 * s, pz + 0.1 * s, g, 6, 0.04 * s);
st.rotation.x = 2.2;
[-1, 1].forEach(function (sd) {
var cl = gldSph(0.12 * s, bd, sd * 0.3 * s, 0.15 * s, 0.55 * s, g, 8);
cl.scale.set(0.7, 0.5, 1.4);
gldCyl(0.03 * s, 0.3 * s, bd, sd * 0.22 * s, 0.15 * s, 0.35 * s, g, 5).rotation.x = Math.PI / 2;
for (var l = 0; l < 4; l++) {
var lg = gldCyl(0.02 * s, 0.35 * s, bd, sd * 0.3 * s, 0.1 * s, (0.2 - l * 0.15) * s, g, 4);
lg.rotation.z = sd * 1.1;
}
});
if (parent)
parent.add(g);
return g;
},
function (s, col, band, parent) {
var g = new THREE.Group(), pts = [], n = 14;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 3;
pts.push(new THREE.Vector3(Math.sin(a) * 0.35 * s * (1 - i / n * 0.3), 0.06 * s + (i > n - 4 ? (i - (n - 4)) * 0.06 * s : 0), (i / n - 0.5) * 1.4 * s));
}
var hx = function (c) { return "#" + ("000000" + c.toString(16)).slice(-6); };
var m = gldCanvasMat("snake|" + col + "|" + band, 64, 256, function (c, W, H) { c.fillStyle = hx(col || 0x4A5A2A); c.fillRect(0, 0, W, H); c.fillStyle = hx(band || 0x1A1A10); for (var y = 0; y < H; y += 24) {
c.fillRect(0, y, W, 8);
} c.globalAlpha = 0.25; c.fillStyle = "#fff"; for (var y2 = 0; y2 < H; y2 += 6)
for (var x = 0; x < W; x += 6)
if ((x + y2) % 12 === 0)
c.fillRect(x, y2, 3, 3); });
var tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), GLD.lite ? 16 : 40, 0.06 * s, GLD.lite ? 5 : 8, false), m);
g.add(tube);
var e = pts[n - 1], hd = gldSph(0.09 * s, m, e.x, e.y, e.z + 0.05 * s, g, 8);
hd.scale.set(1, 0.6, 1.5);
if (!GLD.lite)
[-1, 1].forEach(function (sd) { gldSph(0.018 * s, gldGlowM(0xE8C020), e.x + sd * 0.05 * s, e.y + 0.03 * s, e.z + 0.1 * s, g, 5); });
if (parent)
parent.add(g);
return g;
},
function (x, y, z, ry, kind, o) {
o = o || {};
var g = gldPiece(x, y, z, ry), wd = gldW("black"), gl = gldMat(0xC8E8E0, null, { op: 0.18 }), br = GLD_BRASS();
gldBox(1.3, 0.85, 0.75, wd, 0, 0.42, 0, g);
gldBox(1.2, 0.08, 0.66, gldMat(kind === "snake" ? 0x3A4A2A : 0xC8A870, kind === "snake" ? "grass" : "sand"), 0, 0.9, 0, g);
gldBox(1.22, 0.7, 0.68, gl, 0, 1.22, 0, g);
gldBox(1.3, 0.05, 0.76, wd, 0, 1.6, 0, g);
[[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (q) { gldBox(0.04, 0.72, 0.04, br, q[0] * 0.61, 1.22, q[1] * 0.34, g); });
gldSph(0.14, gldMat(0x6A6460, "stone"), 0.35, 0.95, 0.1, g, 8).scale.y = 0.6;
var br2 = gldCyl(0.025, 0.8, gldMat(0x4A3020, "bark"), -0.2, 1.05, 0, g, 5);
br2.rotation.z = 1.2;
var c = gldGroup(0, 0.94, 0, 0, g), cr = null;
c.userData.keep = 1;
if (kind === "spider")
cr = gldSpider(0.18, o.col || 0x1A1418, o.mark || 0xC8203A, c);
else if (kind === "scorpion")
cr = gldScorpion(0.28, o.col || 0x4A3418, c);
else if (kind === "snake")
cr = gldSnake(0.5, o.col || 0x3A5A2A, o.band || 0x1A1A10, c);
if (cr) {
cr.rotation.y = (o.face || 0.4);
GLK.fx.push({ kind: kind, g: cr, ph: Math.random() * 10 });
}
gldLantern(0.5, 1.66, -0.25, 0x9AE0B0, 0, g);
gldBox(0.4, 0.12, 0.02, gldCanvasMat("tag|" + (o.label || kind), 128, 40, function (cc, W, H) { cc.fillStyle = "#E8DCC0"; cc.fillRect(0, 0, W, H); cc.fillStyle = "#2A1A10"; cc.font = "bold 15px Georgia"; cc.textAlign = "center"; cc.fillText(o.label || kind, W / 2, 26); }), 0, 0.7, 0.38, g);
gldSolidIn(g, 0, 0, 0.66, 0.4, 1.62);
return g;
},
function (x, y, z, ry, w) {
var g = gldPiece(x, y, z, ry), st = gldMat(0x3A3438, "stone"), gl = gldMat(0xC8E8E0, null, { op: 0.16 });
gldBox(w, 0.6, 1.0, st, 0, 0.3, 0, g);
gldBox(w - 0.2, 0.06, 0.8, gldMat(0x2A2018, "earth"), 0, 0.62, 0, g);
var n = Math.floor(w / 0.35);
for (var i = 0; i < n; i++) {
var px = -w / 2 + 0.3 + i * (w - 0.5) / Math.max(1, n - 1), k = i % 3;
if (k === 0) {
gldCyl(0.012, 0.8, gldMat(0x2A5A2A, null), px, 1.05, 0, g, 4);
for (var b = 0; b < 5; b++) {
var bl = gldCyl(0.035, 0.07, gldMat(0xA84A9A, null), px + 0.03 * ((b % 2) * 2 - 1), 0.9 + b * 0.1, 0.02, g, 6, 0.015);
bl.rotation.z = Math.PI;
}
}
else if (k === 1) {
var bu = gldSph(0.14, gldMat(0x1A3A1A, "foliage"), px, 0.78, 0.1, g, 8);
bu.scale.y = 0.7;
for (var q = 0; q < 4; q++)
gldSph(0.025, gldMat(0x2A0A2A, null, { phong: 100 }), px - 0.06 + q * 0.04, 0.82, 0.22, g, 5);
}
else {
for (var m = 0; m < 3; m++) {
gldCyl(0.012, 0.1, gldMat(0xE8E0D0, null), px + m * 0.06 - 0.06, 0.7, -0.15, g, 4);
var cp = gldSph(0.05, gldMat(0xD8D0B8, null), px + m * 0.06 - 0.06, 0.76, -0.15, g, 8);
cp.scale.y = 0.45;
}
}
}
gldBox(w, 0.9, 1.0, gl, 0, 1.08, 0, g);
gldSolidIn(g, 0, 0, w / 2, 0.52, 1.5);
return g;
},
function (x, y, z, ry) {
var g = gldPiece(x, y, z, ry);
gldBox(0.08, 1.6, 0.08, gldW("dark"), 0, 0.8, -0.1, g);
var t = gldCyl(0.45, 0.12, gldCanvasMat("target", 128, 128, function (c, W, H) { var cols = ["#E8DCC0", "#2A2A2A", "#E8DCC0", "#8A1A1A", "#E8DCC0", "#1A1A1A"]; for (var i = 0; i < 6; i++) {
c.fillStyle = cols[i];
c.beginPath();
c.arc(W / 2, H / 2, 62 - i * 10, 0, 6.3);
c.fill();
} }), 0, 1.5, 0, g, 20);
t.rotation.x = Math.PI / 2;
for (var d = 0; d < 3; d++) {
var dt = gldCyl(0.006, 0.14, GLD_IRON(), -0.1 + d * 0.1, 1.55 - d * 0.08, 0.1, g, 4);
dt.rotation.x = Math.PI / 2;
}
gldSolidIn(g, 0, 0, 0.45, 0.15, 2.0);
return g;
},
function (x, y, z, ry) {
var g = gldPiece(x, y, z, ry), wd = gldW("oak"), br = GLD_BRASS(), ir = GLD_IRON();
gldBox(2.2, 1.2, 0.08, wd, 0, 1.4, 0, g);
gldBox(2.3, 0.08, 0.16, wd, 0, 2.04, 0.02, g);
for (var i = 0; i < 10; i++) {
var px = -0.9 + (i % 5) * 0.45, py = 1.65 - Math.floor(i / 5) * 0.5;
gldBox(0.22, 0.28, 0.05, i % 3 ? br : ir, px, py, 0.05, g);
gldBox(0.03, 0.08, 0.02, gldMat(0x0A0806, null), px, py - 0.03, 0.08, g);
gldCyl(0.025, 0.02, gldMat(0x0A0806, null), px, py + 0.04, 0.08, g, 8).rotation.x = Math.PI / 2;
}
gldTable(0, 0, 0.6, 0, 2.0, 0.5, { wood: "dark", h: 0.9, parent: g });
gldSolidIn(g, 0, 0, 1.1, 0.1, 2.1);
return g;
},
function (x, y, z, ry) {
var g = gldPiece(x, y, z, ry), cl = gldCloth(0x3A2A20, 0x1A1008, 0), br = GLD_BRASS();
gldCyl(0.25, 0.05, gldW("dark"), 0, 0.03, 0, g, 10);
gldCyl(0.03, 1.0, gldW("dark"), 0, 0.55, 0, g, 6);
var t = gldCyl(0.2, 0.7, cl, 0, 1.35, 0, g, 12, 0.26);
t.scale.z = 0.7;
gldSph(0.12, gldMat(0xC8B8A0, null), 0, 1.82, 0, g, 10);
for (var i = 0; i < (GLD.lite ? 6 : 14); i++) {
var a = i / (GLD.lite ? 6 : 14) * 6.283;
gldSph(0.025, br, Math.cos(a) * 0.22, 1.1 + (i % 3) * 0.2, Math.sin(a) * 0.16, g, 6);
}
gldBox(0.12, 0.1, 0.04, gldMat(0x5A3A1A, null), 0.12, 1.2, 0.17, g);
gldRoundIn(g, 0.3, 1.9);
return g;
},
function (x0, z0, x1, z1, y, h, axis) {
var br = gldMat(0x6A4434, "brick"), len = axis === "x" ? (x1 - x0) : (z1 - z0), n = Math.max(1, Math.floor(len / 4)), span = axis === "x" ? (z1 - z0) : (x1 - x0);
var R = span / 2 - 0.25, sy = 0.55, py = y + h - 0.12 - R * sy;
for (var i = 0; i <= n; i++) {
var at = (axis === "x" ? x0 : z0) + 0.3 + i * (len - 0.6) / n;
var arch = new THREE.Mesh(new THREE.TorusGeometry(R, 0.22, 6, gldSeg(16), Math.PI), br);
arch.scale.y = sy;
if (axis === "x") {
arch.position.set(at, py, (z0 + z1) / 2);
arch.rotation.y = Math.PI / 2;
}
else
arch.position.set((x0 + x1) / 2, py, at);
gldP().add(arch);
[-1, 1].forEach(function (sd) { var off = sd * R; if (axis === "x")
gldBox(0.45, py - y, 0.45, br, at, y + (py - y) / 2, (z0 + z1) / 2 + off);
else
gldBox(0.45, py - y, 0.45, br, (x0 + x1) / 2 + off, y + (py - y) / 2, at); });
}
},
function (x, y, z, ry, s, horn, parent) {
var g = gldPiece(x, y, z, ry, parent), bn = gldMat(0xE0D6C0, null);
gldBox(0.5 * s, 0.6 * s, 0.06, gldW("dark"), 0, 0, 0, g);
var sk = gldSph(0.17 * s, bn, 0, 0.02 * s, 0.15 * s, g, 10);
sk.scale.set(1, 0.85, 1.3);
gldSph(0.03 * s, gldMat(0x0A0806, null), -0.06 * s, 0.06 * s, 0.33 * s, g, 5);
gldSph(0.03 * s, gldMat(0x0A0806, null), 0.06 * s, 0.06 * s, 0.33 * s, g, 5);
if (horn)
[-1, 1].forEach(function (sd) { var h = gldCyl(0.0, 0.35 * s, bn, sd * 0.15 * s, 0.2 * s, 0.08 * s, g, 6, 0.04 * s); h.rotation.z = -sd * 0.9; });
return g;
},
function (t, list) {
for (var i = 0; i < list.length; i++) {
var F = list[i], g = F.g;
if (F.kind === "spider" && g.userData.legs) {
var mv = Math.sin(t * 0.3 + F.ph) > 0.6;
g.userData.legs.forEach(function (L) { L.hip.rotation.x = mv ? Math.sin(t * 6 + L.ph) * 0.15 : 0; });
if (mv)
g.rotation.y += 0.004;
}
else if (F.kind === "snake")
g.rotation.y = Math.sin(t * 0.15 + F.ph) * 0.4;
else if (F.kind === "scorpion")
g.position.x = Math.sin(t * 0.2 + F.ph) * 0.12;
}
},
function (G, seed, x, z, ry, o) {
o = o || {};
var y = o.y || 0, sex = o.sex;
if (!sex) {
try {
sex = randomLook("w_gld_" + seed, "human").sex === "f" ? "f" : "m";
}
catch (e) {
sex = gldHash(seed) % 2 ? "f" : "m";
}
}
var g = gldFigure(seed, { title: o.title, sex: sex, look: o.look });
if (g) {
g.position.set(x, y, z);
g.rotation.y = ry || 0;
g.userData.keep = 1;
GLK.F.add(g);
}
var h = gldHash(seed), name = o.name || ((sex === "f" ? GLD_FN : GLD_MN)[h % GLD_FN.length] + " " + GLD_LN[(h >>> 7) % GLD_LN.length]);
var P = { g: g, G: G, seed: seed, x: x, z: z, y: y, name: name, sex: sex, age: o.age || (19 + (h >>> 11) % 44), title: o.title || "member of the guild", doing: o.doing || "at work", master: !!o.master, outsider: o.outsider || "",
wan: o.wander ? { r: o.wander, hx: x, hz: z, tx: x, tz: z, wait: Math.random() * 5 } : null };
GLK.people.push(P);
P.sol = gldRound(x, z, 0.32, y, 1.8);
P.spot = gldSpot(x, z, o.master ? 2.6 : 2.2, "💬 " + name + " · " + P.title, "talk", function () { gldTalk(P); }, { y: y });
return P;
},
function (dt, K) {
K.people.forEach(function (P) {
if (!P.g || !P.wan)
return;
var u = P.wan, g = P.g;
if (u.wait > 0) {
u.wait -= dt;
return;
}
var dx = u.tx - g.position.x, dz = u.tz - g.position.z, d = Math.hypot(dx, dz);
if (d < 0.25) {
u.wait = 3 + Math.random() * 7;
var a = Math.random() * 6.283, r = Math.random() * u.r, tx = u.hx + Math.cos(a) * r, tz = u.hz + Math.sin(a) * r;
if (!worldSolidAt(K.solids.filter(function (s) { return s !== P.sol; }), tx, tz, P.y) && gldInRoom(K, tx, tz, P.y)) {
u.tx = tx;
u.tz = tz;
}
return;
}
var st = Math.min(d, 0.9 * dt);
g.position.x += dx / d * st;
g.position.z += dz / d * st;
g.rotation.y = Math.atan2(dx, dz);
if (P.sol) {
P.sol.x = g.position.x;
P.sol.z = g.position.z;
}
if (P.spot) {
P.spot.x = g.position.x;
P.spot.z = g.position.z;
}
});
},
function (P) {
var G = P.G, C = gldCfg(), S = C.guilds[G.k] || {}, M = G.master || {}, mine = gldMine(G.k), work = GLD.me && GLD.me.work;
var L = [];
if (P.outsider) {
return "You are " + P.name + ", " + P.age + ", " + P.title + " at " + P.outsider + " in Somnucor. Right now you are " + P.doing + ". You are an ordinary, hard-working person with your own life, opinions and worries; speak as yourself. " +
"You know nothing about any guild of thieves, assassins or smugglers, or anything hidden in this building; if anyone asks, you laugh it off or look puzzled. " +
"Never say you are an AI or a character in a game. Hold a real conversation: answer what was just said, vary your replies, and ask something back when it suits you.";
}
if (P.master) {
L.push((S.persona && S.persona.trim()) ? S.persona.trim() : M.persona);
L.push("You are " + P.age + " years old. Your guild: " + G.name + " (" + G.about + ") Its house: " + G.where + ".");
L.push("The guild's ranks, lowest first: " + G.ranks.join(", ") + ". What each rank opens: " + G.ranks.map(function (r, i) { return r + " (" + G.opens[i] + ")"; }).join("; ") + ".");
L.push("The work the guild gives out (on the board in the hall): " + (G.jobs || []).map(function (J) { return J.n + (J.m ? " (" + J.m + " minutes)" : "") + ", from " + G.ranks[J.r - 1]; }).join("; ") + ". All work is real and done in real time where it happens; nothing is instant.");
}
else {
L.push("You are " + P.name + ", " + P.age + ", a " + P.title + " of " + G.name + " in Somnucor (" + G.about + "). Right now you are " + P.doing + ". You have your own life, opinions and worries; speak as yourself. " +
"Your guild master is " + M.name + ", " + M.title + "; speak of them as a member would.");
}
if (mine)
L.push("The dreamer talking to you is a member of the guild, rank " + G.ranks[mine.rank - 1] + (mine.rank < 5 ? " (" + Math.max(0, GLD_XP[mine.rank] - mine.xp) + " more standing to the next rank)" : "") + "." + (work && work.guild === G.k ? " They are on the job: " + (gldJob(work.job) || {}).n + "." : ""));
else
L.push("The dreamer talking to you is not a member. " + (P.master ? "Anyone may join by asking you; the guild is free to join and a dreamer may belong to two chartered guilds at once." : "If they want to join, the guild master is the one to ask."));
if (!G.open)
L.push("This is a hidden guild. Never give the way in to anyone outside it, never say where its house is to a stranger, and keep the guild's secrets in character. The guild's work is story and play in the game only: never explain how any real crime, lock, poison or weapon works, and refuse in character if asked.");
L.push("Never say you are an AI or a character in a game. Refuse anything sexual, any real harm and any real instructions for weapons, explosives, poisons or drugs in character. Hold a real conversation: answer what was just said, remember what was said before, vary your replies, and ask something back when it suits you.");
if (C.notes)
L.push("The Keeper asks this of every guild: " + C.notes);
if (S.notes)
L.push("The Keeper asks this of " + G.name + ": " + S.notes);
return L.join(" ");
},
function (P) {
if (typeof openTalk !== "function")
return;
if (!gldCfg().talk && !gldKeeper()) {
gldSay("🗣️ " + gldEsc(P.name) + " nods to you and goes on with the work. (The Keeper has asked the guilds' people to rest their voices for now.)");
return;
}
var key = "wtalk:gld:" + P.G.k + ":" + P.name, c = null, persona = gldPersona(P);
(store.characters || []).forEach(function (x) { if (x.wKey === key)
c = x; });
var C = camera.position;
if (!c) {
c = { id: (typeof uid === "function" ? uid() : "w" + Date.now()), wKey: key, archetype: "human", name: P.name, aka: [], details: [persona], sessions: [store.session], awake: true, log: [],
x: C.x, z: C.z, primary: true, src: { name: "stated" }, role: null, shift: null, routine: null, home: null, work: null, anchor: { x: C.x, z: C.z }, born: "", doing: P.doing, visible: false };
if (store.characters)
store.characters.push(c);
}
c.details[0] = persona;
c.doing = P.doing;
c.ftkSex = P.sex;
c.ftkAge = P.age;
c.stfTitle = P.title;
c.stfPlace = P.G.name;
c.x = C.x;
c.z = C.z;
c.visible = false;
c.gld = P.G.k;
if (P.g && typeof wlx === "function")
P.g.rotation.y = Math.atan2(wlx(C.x) - P.g.position.x, C.z - P.g.position.z);
worldPrompt(null);
openTalk(c);
},
function (force) {
if (!gldOnline()) {
var L = gldLocal();
GLD.me = { ok: true, local: true, guilds: L.guilds, work: L.work || null, adult: gldAdult() };
return Promise.resolve(GLD.me);
}
if (GLD.meAsk)
return GLD.meAsk;
if (!force && GLD.me && Date.now() - GLD.meAt < 60000)
return Promise.resolve(GLD.me);
GLD.meAsk = cityRpc("guild_hall_me", {}).then(function (d) { GLD.meAsk = null; GLD.meAt = Date.now(); if (d && d.ok) {
GLD.me = d;
d.guilds = d.guilds || {};
} return GLD.me; })
.catch(function (e) { GLD.meAsk = null; GLD.meAt = Date.now(); if (rpcMissing(e)) {
GLD.noServer = true;
return gldMeFetch();
} return GLD.me; });
return GLD.meAsk;
},
function (G) {
var why = gldMayJoin(G);
if (why) {
gldSay("🛡️ " + why);
return;
}
if (!gldOnline()) {
var L = gldLocal();
L.guilds[G.k] = { xp: 0, joined: Date.now() };
gldLocalSave();
GLD.me = null;
return gldMeFetch().then(function () { gldJoined(G); });
}
cityRpc("guild_hall_join", { p_guild: G.k }).then(function (d) { if (!d || !d.ok) {
gldSay("🛡️ " + gldEsc((d && d.say) || "The roll would not take your name."));
return;
} GLD.me = null; GLD.meAt = 0; gldMeFetch(true).then(function () { gldJoined(G); }); })
.catch(function (e) { if (rpcMissing(e)) {
GLD.noServer = true;
return gldJoin(G);
} gldSay("🛡️ The roll would not take your name just now. Try again in a moment."); });
},
function (G) {
if (gldMine(G.k))
return "You are already on the roll of " + G.name + ".";
if (!G.open && !gldOk18(G))
return "The book has no page for you.";
var n = Object.keys((GLD.me && GLD.me.guilds) || {}).length;
if (n >= 2 && !gldKeeper())
return "You already belong to two chartered guilds. Leave one first (at its roll).";
return "";
},
function (G) {
if (GLD.me && GLD.me.work && GLD.me.work.guild === G.k)
gldDrop(true);
if (!gldOnline()) {
var L = gldLocal();
delete L.guilds[G.k];
gldLocalSave();
GLD.me = null;
gldMeFetch();
worldCard(null);
gldSay("Your name is struck from the roll of " + gldEsc(G.name) + ". Your standing is kept if you come back.");
return;
}
cityRpc("guild_hall_leave", { p_guild: G.k }).then(function () { GLD.meAt = 0; gldMeFetch(true); worldCard(null); gldSay("Your name is struck from the roll of " + gldEsc(G.name) + ". Your standing is kept if you come back."); }).catch(function () { });
},
function (G) {
gldMeFetch().then(function () {
var m = gldMine(G.k), b = "", fns = {}, rows = [];
rows.push(["The guild", G.about]);
rows.push(["The house", G.where]);
rows.push(["Ranks", G.ranks.map(function (r, i) { return (i + 1) + ". " + r; }).join(" · ")]);
if (m) {
rows.push(["You", G.ranks[m.rank - 1] + (m.rank < 5 ? " · " + m.xp + " of " + GLD_XP[m.rank] + " standing to " + G.ranks[m.rank] : " · the highest rank")]);
rows.push(["Open to you", G.opens.slice(0, m.rank).join("; ")]);
b += worldBtn("board", "The board: take work", "");
fns.board = function () { gldBoard(G); };
b += worldBtn("leave", "Strike my name from the roll", "your standing is kept");
fns.leave = function () { gldLeave(G); };
}
else {
var why = gldMayJoin(G);
if (!why) {
b += worldBtn("join", "Sign the roll", "free · you start as " + G.ranks[0]);
fns.join = function () { gldJoin(G); };
}
else
rows.push(["", why]);
}
var notes = ["All of the guild's work is real, done where it is done, in real minutes. Walk away and it stops."];
notes.push(GLD.me && GLD.me.local ? "The guild's books are kept on this device for now, and pay nothing yet." : "Gold for the work goes to dreamers who pay their dues and are 18 or over. Everyone earns standing and rank.");
if (!G.open)
notes.push("The guild is 18 and over only, and no outsider is ever told where it is.");
worldCard(worldFacts(G.icon + " The roll of " + G.name, (G.master ? G.master.name + ", " + G.master.title : ""), rows, notes) + b, fns);
});
},
function (G) {
gldMeFetch().then(function () {
var m = gldMine(G.k), rk = gldRankHere(G.k), W = GLD.me && GLD.me.work, b = "", fns = {};
if (!m && !gldKeeper()) {
worldCard(worldFacts(G.icon + " The board of " + G.name, "work for members", [["", gldMayJoin(G) ? gldMayJoin(G) : "Sign the roll first: the great book by " + (G.master ? G.master.name : "the master") + "."]], []));
return;
}
if (W) {
var J = gldJob(W.job) || { n: W.job };
b += "<div style='margin:6px 0;padding:8px;border:1px solid #C8A040;border-radius:4px'><b>Now:</b> " + gldEsc(J.n) + " · " + gldEsc(gldWorkLine(W)) + "</div>";
b += worldBtn("go", "Show me where", "the place, and the way");
fns.go = function () { worldCard(null); gldShowWay(W); };
b += worldBtn("drop", "Give this work up", "what is done so far is lost");
fns.drop = function () { gldDrop(); worldCard(null); };
}
(G.jobs || []).forEach(function (J) {
var ok = rk >= J.r, busy = !!W, sub = (J.m ? J.m + " minutes · " : "") + J.xp + " standing" + (J.g ? " · " + J.g + " gold" : "") + " · " + (ok ? J.how : "from " + G.ranks[J.r - 1]);
if (!ok || busy) {
b += "<div style='margin:6px 0;padding:7px 10px;border:1px solid rgba(143,180,232,.25);border-radius:4px;opacity:.55'><b>" + gldEsc(J.n) + "</b><div style='font-size:12px'>" + gldEsc(sub) + "</div></div>";
return;
}
b += worldBtn("j_" + J.id, gldEsc(J.n), gldEsc(sub));
fns["j_" + J.id] = function () { gldStart(G, J); };
});
worldCard(worldFacts(G.icon + " The board of " + G.name, m ? "you are " + G.ranks[m.rank - 1] : "the Keeper", [], []) + b, fns);
});
},
function (W) {
var J = gldJob(W.job) || {}, need = (+W.need || 0), sec = (+W.secs || 0);
if (J.at === "mark")
return "marks: " + (W.hits || 0) + " of " + (W.target && W.target.n || 1) + " · " + (W.target ? W.target.name + " in " + W.target.worldName : "");
var where = W.place ? ("at " + W.place) : (J.at && J.at.indexOf("hall:") === 0 ? "in the hall" : "");
return Math.floor(sec / 60) + " of " + Math.round(need / 60) + " minutes · " + where;
},
function (G, J) {
worldCard(null);
if (J.at === "lift" || J.at === "pocket") {
if (!gldOnline()) {
gldSay("🗝️ The Uncle shakes his head. \"Not yet, Sparrow. The city isn't listening yet, and a job nobody notices is no job at all.\" (The Keeper has one last step to take before the city can answer a theft.)");
return;
}
}
var go = function (W) { GLD.me.work = W; GLD.beatT = 0; gldWorkBegun(G, J, W); };
if (!gldOnline()) {
var L = gldLocal(), W = { id: Date.now(), guild: G.k, job: J.id, secs: 0, need: J.m * 60, place: gldPickPlace(J), started: Date.now() };
if (J.at === "mark")
W.target = gldPickMark(J);
L.work = W;
gldLocalSave();
return go(W);
}
var mk = J.at === "mark" ? gldPickMark(J) : null;
cityRpc("guild_work_start", { p_guild: G.k, p_job: J.id, p_target: mk }).then(function (d) {
if (!d || !d.ok) {
gldSay(G.icon + " " + gldEsc((d && d.say) || "The board will not give you that work just now."));
return;
}
go(d.work);
}).catch(function (e) { if (rpcMissing(e)) {
GLD.noServer = true;
return gldStart(G, J);
} gldSay(G.icon + " The board will not give you that work just now. Try again in a moment."); });
},
function (J) {
var L = (J.places || []).filter(function (p) { return store.workplaceAt && store.workplaceAt[p]; });
if (J.at === "case" || J.at === "lift" || J.at === "pocket")
L = ["The General Store", "The Toy Shop", "The Jeweller's", "The Tailor's", "The Greengrocer's", "The Florist's"].filter(function (p) { return store.workplaceAt && store.workplaceAt[p]; });
return L.length ? L[Math.floor(Math.random() * L.length)] : "";
},
function (J) {
var out = [];
try {
if (typeof DGB_WHERE !== "undefined" && typeof dgrLevelOf === "function")
Object.keys(DGB_WHERE).forEach(function (w) { var lv = dgrLevelOf(w); if (lv >= J.lv) {
(DGB_WHERE[w] || []).forEach(function (kind) { var K = typeof DGB_KINDS !== "undefined" && DGB_KINDS[kind]; if (K)
out.push({ world: w, kind: kind, name: K.name, worldName: (typeof dgrNameOf === "function" ? dgrNameOf(w).split(":")[0] : w), n: J.n2 || 1 }); });
} });
}
catch (e) { }
return out.length ? out[Math.floor(Math.random() * out.length)] : null;
},
function (G, J, W) {
var at = J.at || "";
if (at.indexOf("hall:") === 0) {
var st = GLK && GLD.k === G.k && GLD.K && GLD.K.stations[at.slice(5)];
gldSay(G.icon + " <b>" + gldEsc(J.n) + ".</b> " + gldEsc(J.how) + " Go to " + gldEsc(st ? st.name : "the work") + " and press E. " + J.m + " minutes; walk away and it stops.");
}
else if (at === "mark") {
var T = W.target;
gldSay(G.icon + " <b>" + gldEsc(J.n) + ".</b> " + (T ? "Your mark: <b>" + gldEsc(T.name) + "</b> in <b>" + gldEsc(T.worldName) + "</b>" + (T.n > 1 ? " (three of them)" : "") + ". Bring it down within two hours." : "There is no Dangerous place open to a mark right now. Give the work back at the board."));
}
else {
gldSay(G.icon + " <b>" + gldEsc(J.n) + ".</b> " + gldEsc(J.how) + " At <b>" + gldEsc(W.place || "") + "</b>: " + J.m + " minutes there. Follow the pointer.");
gldShowWay(W);
}
gldHudDraw();
},
function (W) {
var J = gldJob(W.job) || {};
if (W.place && typeof showTheWay === "function") {
if (typeof WLD !== "undefined" && WLD.on && GLD.k)
gldSay("Leave the hall and follow the pointer to <b>" + gldEsc(W.place) + "</b>.");
showTheWay(W.place);
return;
}
if ((J.at || "").indexOf("hall:") === 0) {
var G = GLD_BY[W.guild];
if (GLD.k !== W.guild) {
gldGo(G, "in");
}
else {
var st = GLD.K && GLD.K.stations[J.at.slice(5)];
if (st)
gldSay("📍 " + gldEsc(st.name) + ": " + gldEsc(st.where || "in the hall"));
}
}
},
function (quiet) {
var W = GLD.me && GLD.me.work;
if (!W)
return;
GLD.me.work = null;
GLD.at = false;
if (typeof guideTo !== "undefined" && guideTo && W.place && guideTo.key === W.place)
guideTo = null;
if (!gldOnline()) {
var L = gldLocal();
L.work = null;
gldLocalSave();
}
else
cityRpc("guild_work_drop", {}).catch(function () { });
if (!quiet)
gldSay("The work is given back to the board.");
gldHudDraw();
},
function (W) {
var J = gldJob(W.job) || {}, at = J.at || "";
if (at.indexOf("hall:") === 0) {
if (typeof WLD === "undefined" || WLD.on !== "gld_" + W.guild || !GLD.K)
return false;
var st = GLD.K.stations[at.slice(5)];
if (!st)
return false;
var L = worldLocal();
return Math.hypot(L.x - st.x, L.z - st.z) < st.r && Math.abs(L.y - 1.72 - st.y) < 1.5 && GLD.atBench === at.slice(5);
}
if (!W.place || (typeof WLD !== "undefined" && WLD.on))
return false;
var wp = store.workplaceAt && store.workplaceAt[W.place];
if (!wp)
return false;
if (store.inside) {
var s = (store.objects || []).filter(function (o) { return o.id === store.inside; })[0];
return !!s && (s.workplace === W.place || Math.hypot(s.x - wp.x, s.z - wp.z) < 4);
}
var P = camera.position;
return Math.hypot(P.x - wp.x, P.z - wp.z) < 34;
},
function (W) {
if (!gldOnline()) {
var L = gldLocal();
if (L.work)
L.work.secs = W.secs;
gldLocalSave();
if (W.secs >= W.need)
gldDone(W, { xp: (gldJob(W.job) || {}).xp || 0, gold: 0, local: true });
return;
}
if (GLD.beatBusy)
return;
GLD.beatBusy = true;
cityRpc("guild_work_beat", { p_id: W.id, p_here: true }).then(function (d) {
GLD.beatBusy = false;
if (!d || !d.ok) {
if (d && d.gone) {
GLD.me.work = null;
gldHudDraw();
}
return;
}
if (d.done)
gldDone(W, d);
else if (GLD.me.work && GLD.me.work.id === W.id) {
GLD.me.work.secs = Math.max(+d.secs || 0, 0);
}
}).catch(function () { GLD.beatBusy = false; });
},
function (W, d) {
var G = GLD_BY[W.guild] || {}, J = gldJob(W.job) || {}, before = gldMine(W.guild);
GLD.me.work = null;
GLD.at = false;
GLD.atBench = null;
if (d.local) {
var L = gldLocal();
L.work = null;
var m = L.guilds[W.guild];
if (m)
m.xp = (+m.xp || 0) + (d.xp || 0);
gldLocalSave();
}
else if (GLD.me.guilds && GLD.me.guilds[W.guild])
GLD.me.guilds[W.guild].xp = d.total !== undefined ? d.total : (+GLD.me.guilds[W.guild].xp || 0) + (d.xp || 0);
var after = gldMine(W.guild), up = before && after && after.rank > before.rank;
if (typeof guideTo !== "undefined" && guideTo && W.place && guideTo.key === W.place)
guideTo = null;
var line = G.icon + " <b>Done: " + gldEsc(J.n) + ".</b> +" + (d.xp || 0) + " standing" + (d.gold ? " · <b>+" + d.gold + " gold</b>" : "") + (d.note ? " · " + gldEsc(d.note) : "");
if (up)
line += "<br>⭐ <b>You are now " + gldEsc(G.ranks[after.rank - 1]) + ".</b> Open to you now: " + gldEsc(G.opens[after.rank - 1]) + ".";
gldSay(line);
if (typeof playTone === "function")
playTone(up ? 660 : 440, 0.3);
if (J.at === "hall:masterpiece")
try {
var Lm = gldLocal();
Lm.masterpiece = Lm.masterpiece || {};
Lm.masterpiece[W.guild] = Date.now();
gldLocalSave();
}
catch (e) { }
gldHudDraw();
},
function () {
var W = GLD.me && GLD.me.work;
if (!GLD.hud) {
if (!W)
return;
var h = document.createElement("div");
h.id = "gld-hud";
h.style.cssText = "position:fixed;left:10px;top:64px;z-index:43;background:rgba(14,10,6,.86);border:1px solid #C8A040;border-radius:6px;padding:6px 10px;font:12.5px var(--sans,system-ui);color:#F4ECD8;max-width:min(300px,calc(100vw - 24px));pointer-events:auto;cursor:pointer";
h.onclick = function () { var W2 = GLD.me && GLD.me.work; if (W2)
gldBoard(GLD_BY[W2.guild]); };
document.body.appendChild(h);
GLD.hud = h;
}
if (!W) {
GLD.hud.style.display = "none";
return;
}
var G = GLD_BY[W.guild] || {}, J = gldJob(W.job) || {}, html = (G.icon || "") + " <b>" + gldEsc(J.n || "") + "</b><br>" + gldEsc(gldWorkLine(W)) + (GLD.at ? " · <span style='color:#9FE09A'>working</span>" : "");
if (GLD.hud.dataset.h !== html) {
GLD.hud.dataset.h = html;
GLD.hud.innerHTML = html;
}
GLD.hud.style.display = "block";
},
function (key) {
var W = GLD.me && GLD.me.work, J = W && gldJob(W.job);
if (!W || !J || J.at !== "hall:" + key) {
var G = GLD_BY[GLD.k], mine = (G.jobs || []).filter(function (j) { return j.at === "hall:" + key; })[0];
gldSay("⚒️ " + (mine ? "This is where the guild does <b>" + gldEsc(mine.n) + "</b>. Take that work from the board first." : "Nothing for you to do here just now."));
return;
}
if (GLD.atBench === key) {
GLD.atBench = null;
gldSay("You set the work down. It waits for you.");
return;
}
GLD.atBench = key;
gldSay("⚒️ <b>" + gldEsc(J.n) + ".</b> You set to work. Stay at it; press E again to stop.");
},
function (W) {
W.hits = (W.hits || 0) + 1;
var n = (W.target && W.target.n) || 1;
gldSay("🕷️ <b>A mark brought down.</b> " + W.hits + " of " + n + ".");
if (!gldOnline()) {
var L = gldLocal();
if (L.work)
L.work.hits = W.hits;
gldLocalSave();
if (W.hits >= n)
gldDone(W, { xp: (gldJob(W.job) || {}).xp || 0, gold: 0, local: true });
return;
}
cityRpc("guild_mark_hit", { p_id: W.id }).then(function (d) { if (d && d.ok && d.done)
gldDone(W, d); }).catch(function () { });
},
function (axis, a0, a1, w0, w1, y0, y1, mat) {
mat = mat || gldW("dark");
var n = Math.max(2, Math.round(Math.abs(y1 - y0) / 0.18)), lo = Math.min(w0, w1), hi = Math.max(w0, w1), wd = hi - lo, mid = (lo + hi) / 2;
if (axis === "x")
gldRampAt(Math.min(a0, a1), lo, Math.max(a0, a1), hi, "x", a0, y0, a1, y1);
else
gldRampAt(lo, Math.min(a0, a1), hi, Math.max(a0, a1), "z", a0, y0, a1, y1);
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, s0 = a0 + (a1 - a0) * t0, s1 = a0 + (a1 - a0) * t1, yy = y0 + (y1 - y0) * ((i + 0.5) / n), len = Math.abs(s1 - s0), c = (s0 + s1) / 2, base = Math.min(y0, y1);
var top = Math.max(y0 + (y1 - y0) * t0, y0 + (y1 - y0) * t1), hh = Math.max(0.05, top - base);
if (axis === "x")
gldBox(len, hh, wd, mat, c, base + hh / 2 - 0.02, mid);
else
gldBox(wd, hh, len, mat, mid, base + hh / 2 - 0.02, c);
var under = Math.min(y0 + (y1 - y0) * t0, y0 + (y1 - y0) * t1) - base;
if (under > 0.25) {
if (axis === "x")
gldSolid(c, mid, len / 2, wd / 2, base, under - 0.05);
else
gldSolid(mid, c, wd / 2, len / 2, base, under - 0.05);
}
}
var rl = gldMat(0x2A1A10, "wood"), L = Math.hypot(a1 - a0, y1 - y0), ang = Math.atan2(y1 - y0, a1 - a0);
[lo + 0.05, hi - 0.05].forEach(function (w) {
var r = gldBox(axis === "x" ? L : 0.06, 0.06, axis === "x" ? 0.06 : L, rl, 0, 0, 0);
if (axis === "x") {
r.position.set((a0 + a1) / 2, (y0 + y1) / 2 + 0.95, w);
r.rotation.z = ang;
}
else {
r.position.set(w, (y0 + y1) / 2 + 0.95, (a0 + a1) / 2);
r.rotation.x = -ang;
}
});
},
function (G, dir, at, c, y, w, rank, room) {
var frame = gldGroup(dir === "x" ? at : c, y, dir === "x" ? c : at, dir === "x" ? 0 : Math.PI / 2), leaf = gldGroup(-w / 2 + 0.05, 0, 0, 0, frame), wd = gldMat(0x3A2416, "wood"), hw = (w - 0.1) / 2;
gldBox(w - 0.1, 2.5, 0.08, wd, hw, 1.25, 0, leaf);
for (var i = 0; i < 4; i++)
gldBox(0.06, 2.4, 0.1, gldMat(0x2A1A10, "wood"), 0.2 + i * (w - 0.5) / 3, 1.25, 0, leaf);
gldBox(0.06, 0.06, 0.12, GLD_BRASS(), w - 0.35, 1.1, 0.05, leaf);
[0.5, 2.0].forEach(function (h) { gldBox(w - 0.2, 0.06, 0.1, GLD_IRON(), hw, h, 0.02, leaf); });
frame.userData.keep = 1;
var sol = dir === "x" ? gldSolid(at, c, w / 2, 0.3, y, 2.6) : gldSolid(c, at, 0.3, w / 2, y, 2.6);
var T = { leaf: leaf, sol: sol, rank: rank, G: G, open: false, amt: 0, dir: dir, w: w, room: room, solids: GLK.solids };
(GLK.gates = GLK.gates || []).push(T);
[-1, 1].forEach(function (s) { gldSpot(dir === "x" ? at : c + s * 0.9, dir === "x" ? c + s * 0.9 : at, 1.4, "🚪 " + room, "try the door", function () { gldGateTry(T); }, { y: y, when: function () { return !T.open; } }); });
return T;
},
function (G, x, z, y, ry) {
var g = gldPiece(x, y || 0, z, ry || 0), wd = gldW("dark");
gldCyl(0.06, 1.0, wd, 0, 0.5, 0, g, 8);
gldCyl(0.3, 0.06, wd, 0, 0.03, 0, g, 10);
var t = gldBox(0.6, 0.05, 0.45, wd, 0, 1.08, 0, g);
t.rotation.x = -0.35;
var bk = gldBox(0.5, 0.06, 0.38, gldMat(0xEDE4CC, null), 0, 1.13, 0.0, g);
bk.rotation.x = -0.35;
gldBox(0.02, 0.07, 0.38, gldMat(0x5A1A1A, null), 0, 1.15, 0, g).rotation.x = -0.35;
gldCandle(0.36, 1.0, -0.1, 1, g);
gldRoundIn(g, 0.35, 1.3);
var P = gldToRoot(g, 0, 0, 0.7);
gldSpot(P.x, P.z, 1.6, "📖 The roll of " + G.name, "read it", function () { gldRoll(G); }, { y: y || 0 });
},
function (G, x, z, y, ry, col) {
var g = gldPiece(x, y || 0, z, ry || 0), wd = gldW("oak");
gldBox(1.8, 1.2, 0.06, gldMat(0x9A7A4A, "wood"), 0, 1.6, 0, g);
gldBox(1.9, 0.08, 0.1, wd, 0, 2.24, 0.02, g);
gldBox(1.9, 0.08, 0.1, wd, 0, 0.96, 0.02, g);
for (var i = 0; i < 7; i++) {
var p = gldBox(0.32, 0.4, 0.01, gldMat([0xF0E8D4, 0xE8DCC0, 0xF4F0E4][i % 3], null), -0.65 + (i % 4) * 0.42, 1.85 - Math.floor(i / 4) * 0.55, 0.04, g);
p.rotation.z = ((i * 7) % 5 - 2) * 0.04;
gldSph(0.02, gldMat(col || 0xA82A2A, null), -0.65 + (i % 4) * 0.42, 2.02 - Math.floor(i / 4) * 0.55, 0.05, g, 5);
}
gldSign(["THE BOARD", "work for the guild"], 1.4, 0.3, "#2A1A10", "#F0E0B0", 0, 2.45, 0.06, 0, g);
var P = gldToRoot(g, 0, 0, 0.9);
gldSpot(P.x, P.z, 1.8, "📋 The board of " + G.name, "take work", function () { gldBoard(G); }, { y: y || 0 });
},
function (x, y, z, ry, w, h, seed, kind) {
var g = gldPiece(x, y, z, ry), hs = gldHash(seed), k = kind || ["portrait", "ship", "land"][hs % 3];
var m = gldCanvasMat("paint|" + k + "|" + (hs % 7), 128, 160, function (c, W, H) {
function rnd(i) { return ((hs >>> i) & 255) / 255; }
if (k === "portrait") {
var bg = c.createLinearGradient(0, 0, 0, H);
bg.addColorStop(0, "#2A2218");
bg.addColorStop(1, "#120E0A");
c.fillStyle = bg;
c.fillRect(0, 0, W, H);
var coat = ["#1A1A2A", "#3A1A14", "#14281A", "#2A2A2A"][hs % 4];
c.fillStyle = coat;
c.beginPath();
c.moveTo(18, H);
c.quadraticCurveTo(W / 2, 78, W - 18, H);
c.fill();
c.fillStyle = "#E8E0D0";
c.fillRect(W / 2 - 8, 96, 16, 10);
var sk = ["#E0B890", "#C08860", "#8A5A3A", "#F0C8A8"][(hs >>> 3) % 4];
c.fillStyle = sk;
c.beginPath();
c.ellipse(W / 2, 70, 20, 26, 0, 0, 6.3);
c.fill();
c.fillStyle = ["#3A2A1A", "#888078", "#1A120A", "#6A4A2A"][(hs >>> 5) % 4];
c.beginPath();
c.ellipse(W / 2, 52, 22, 13, 0, 3.2, 6.2);
c.fill();
c.fillStyle = "#2A1A10";
c.fillRect(W / 2 - 9, 66, 5, 3);
c.fillRect(W / 2 + 4, 66, 5, 3);
c.fillStyle = "rgba(120,60,40,0.6)";
c.fillRect(W / 2 - 5, 84, 10, 2);
}
else if (k === "ship") {
var sky = c.createLinearGradient(0, 0, 0, H * 0.6);
sky.addColorStop(0, "#5A6A7A");
sky.addColorStop(1, "#C8B898");
c.fillStyle = sky;
c.fillRect(0, 0, W, H * 0.62);
c.fillStyle = "#2A3A4A";
c.fillRect(0, H * 0.62, W, H);
c.strokeStyle = "rgba(220,220,200,0.35)";
for (var i = 0; i < 8; i++) {
c.beginPath();
c.moveTo(rnd(i) * W, H * 0.66 + i * 7);
c.lineTo(rnd(i) * W + 20, H * 0.66 + i * 7);
c.stroke();
}
c.fillStyle = "#3A2414";
c.beginPath();
c.moveTo(30, H * 0.6);
c.lineTo(98, H * 0.6);
c.lineTo(88, H * 0.68);
c.lineTo(40, H * 0.68);
c.fill();
c.fillStyle = "#2A1A10";
c.fillRect(52, 40, 2, 58);
c.fillRect(74, 48, 2, 50);
c.fillStyle = "#E8E0C8";
c.fillRect(40, 46, 26, 22);
c.fillRect(42, 72, 24, 18);
c.fillRect(66, 54, 20, 18);
c.fillRect(68, 76, 18, 14);
}
else {
var s2 = c.createLinearGradient(0, 0, 0, H * 0.6);
s2.addColorStop(0, "#7A9AB0");
s2.addColorStop(1, "#E8D8B0");
c.fillStyle = s2;
c.fillRect(0, 0, W, H);
c.fillStyle = "#5A6A4A";
c.beginPath();
c.moveTo(0, H * 0.55);
c.quadraticCurveTo(W * 0.35, H * 0.35, W * 0.7, H * 0.55);
c.lineTo(W, H * 0.5);
c.lineTo(W, H);
c.lineTo(0, H);
c.fill();
c.fillStyle = "#3A4A2A";
c.beginPath();
c.moveTo(0, H * 0.7);
c.quadraticCurveTo(W * 0.6, H * 0.55, W, H * 0.72);
c.lineTo(W, H);
c.lineTo(0, H);
c.fill();
c.fillStyle = "#2A3A1A";
for (var j = 0; j < 5; j++) {
var tx = 10 + rnd(j) * 100;
c.beginPath();
c.arc(tx, H * 0.68, 8 + rnd(j + 2) * 6, 0, 6.3);
c.fill();
}
c.fillStyle = "#C8C0A8";
c.fillRect(W * 0.62, H * 0.5, 10, 8);
c.fillStyle = "#6A2A1A";
c.beginPath();
c.moveTo(W * 0.6, H * 0.5);
c.lineTo(W * 0.62 + 5, H * 0.44);
c.lineTo(W * 0.66 + 4, H * 0.5);
c.fill();
}
});
var fr = GLD_BRASS();
gldBox(w + 0.2, h + 0.2, 0.06, fr, 0, 0, 0.0, g);
gldPlane(w, h, m, 0, 0, 0.035, 0, g);
gldBox(w + 0.2, 0.06, 0.1, fr, 0, h / 2 + 0.1, 0.03, g);
gldBox(w + 0.2, 0.06, 0.1, fr, 0, -h / 2 - 0.1, 0.03, g);
return g;
},
function (dir, a, b, c, y, h, face, mat) {
var m = mat || gldMat(0x4A2E1A, "wood"), lo = Math.min(a, b), hi = Math.max(a, b), cc = c + face * 0.2, n = Math.max(1, Math.round((hi - lo) / 1.2));
if (dir === "x")
gldBox(hi - lo, h, 0.06, m, (lo + hi) / 2, y + h / 2, cc);
else
gldBox(0.06, h, hi - lo, m, cc, y + h / 2, (lo + hi) / 2);
for (var i = 0; i <= n; i++) {
var s = lo + i * (hi - lo) / n;
if (dir === "x")
gldBox(0.08, h, 0.1, m, s, y + h / 2, cc + face * 0.03);
else
gldBox(0.1, h, 0.08, m, cc + face * 0.03, y + h / 2, s);
}
if (dir === "x")
gldBox(hi - lo, 0.08, 0.14, m, (lo + hi) / 2, y + h, cc + face * 0.03);
else
gldBox(0.14, 0.08, hi - lo, m, cc + face * 0.03, y + h, (lo + hi) / 2);
},
function (G) {
var wl = gldMat(0xC8B898, "plaster"), bm = gldMat(0x3A2614, "wood"), fl = gldMat(0x7A5434, "wood"), st = gldMat(0x8A8070, "stone"), tile = gldMat(0xA8643A, "floortile");
var day = 0xF4ECD0;
function frameX(x0, x1, z, y, h, face) { for (var x = x0 + 0.8; x < x1 - 0.4; x += 1.8)
gldBox(0.18, h, 0.06, bm, x, y + h / 2, z + face * 0.2); gldBox(x1 - x0, 0.16, 0.06, bm, (x0 + x1) / 2, y + h * 0.55, z + face * 0.2); }
function frameZ(z0, z1, x, y, h, face) { for (var z = z0 + 0.8; z < z1 - 0.4; z += 1.8)
gldBox(0.06, h, 0.18, bm, x + face * 0.2, y + h / 2, z); gldBox(0.06, 0.16, z1 - z0, bm, x + face * 0.2, y + h * 0.55, (z0 + z1) / 2); }
var E = gldRoom({ x0: -5, z0: 2, x1: 5, z1: 10, h: 4.4, floor: st, wall: wl, beams: true, name: "the entrance hall",
doors: { s: [{ at: 0, w: 2.2, h: 3 }], n: [{ at: 0, w: 2.6, h: 3.2 }], w: [{ at: 6, w: 1.8, h: 2.6 }], e: [{ at: 6, w: 1.8, h: 2.6 }] } });
frameX(-4.7, 4.7, 2.3, 0, 4.4, 1);
frameX(-4.7, 4.7, 9.7, 0, 4.4, -1);
gldRug(0, 0, 6, 0, 3.2, 5, 0x6A2A1A, 0xC8A040, 0x2A3A5A);
gldSign(["THE ARTISANS' GUILD OF SOMNUCOR", "chartered by the city", "woodwork · weaving · tailoring · pottery · glass · jewels"], 3.2, 0.9, "#2A1A0E", "#F0DCA8", 0, 3.3, 2.62, 0);
gldCase(-3.4, 0, 4.6, Math.PI / 2, 1.6, function (g) { gldCyl(0.12, 0.3, gldMat(0x3A6A9A, null, { op: 0.75, phong: 120 }), 0, 1.0, 0, g, 14, 0.06); gldSph(0.06, gldMat(0xD8B040, "metal", { phong: 100 }), 0.45, 0.85, 0, g, 10); });
gldCase(3.4, 0, 4.6, -Math.PI / 2, 1.6, function (g) { var b = gldSph(0.15, gldMat(0xA8643A, "tile"), -0.3, 0.95, 0, g, 12); b.scale.y = 1.3; gldBox(0.4, 0.04, 0.28, gldCloth(0x8A2A3A, 0xC8A040, 0), 0.35, 0.83, 0, g); });
for (var p = 0; p < 4; p++) {
gldCyl(0.03, 0.18, gldW("dark"), -4.55, 1.9, 7.3 + p * 0.5, null, 5).rotation.z = Math.PI / 2;
}
gldBox(0.04, 0.9, 0.7, gldCloth(0x2A3A2A, 0x101810, 0), -4.5, 1.4, 7.8);
gldLantern(0, 3.6, 6, 0xFFC070, 0.6);
gldExit(G, 0, 9.2, 0, "The front door, out to the Commons");
var J = gldRoom({ x0: -16, z0: 2, x1: -5, z1: 10, h: 4.2, floor: fl, wall: wl, beams: true, name: "the joinery shop", doors: { e: [{ at: 6, w: 1.8, h: 2.6 }],
s: gldWins([gldWin("x", -12, 9.7, 0, 1.6, 1.8, 1.1, 1, day), gldWin("x", -8, 9.7, 0, 1.6, 1.8, 1.1, 1, day)]) } });
gldLathe(-13.4, 0, 4, 0);
gldStation("lathe", -13.4, 4.8, 0, "the lathe", "in the joinery shop, west of the entrance hall");
gldWorkbench(-9.5, 0, 3.5, 0);
gldWorkbench(-9, 0, 8.2, Math.PI);
gldShelves(-15.4, 0, 7, Math.PI / 2, 2.8, 2.2, "tools", { seed: 3 });
for (var t = 0; t < 6; t++) {
var pl = gldBox(0.12, 0.08, 2.6, gldMat([0xC8A070, 0x9A7A50, 0x6A4A2A][t % 3], "wood"), -7 + t * 0.15, 0.1 + Math.floor(t / 3) * 0.1, 6, null);
pl.rotation.y = 0.05 * t;
}
gldChair(-11, 0, 6.2, 0.3, { wood: "pale" });
gldSunPatch(-10, 0, 7.5, 4, 2.5, day);
gldPerson(G, "art_join", -11.2, 4.9, Math.PI, { title: "journeyman joiner", doing: "planing a tabletop", wander: 1.5 });
var Wv = gldRoom({ x0: 5, z0: 2, x1: 16, z1: 10, h: 4.2, floor: fl, wall: wl, beams: true, name: "the weaving room", doors: { w: [{ at: 6, w: 1.8, h: 2.6 }],
s: gldWins([gldWin("x", 8, 9.7, 0, 1.6, 1.8, 1.1, 1, day), gldWin("x", 12, 9.7, 0, 1.6, 1.8, 1.1, 1, day)]) } });
gldLoom(9, 0, 4.2, 0, 0x8A2A2A);
gldStation("loom", 9, 5.4, 0, "the great loom", "in the weaving room, east of the entrance hall");
gldLoom(13.4, 0, 4.2, 0, 0x2A4A7A);
gldShelves(15.4, 0, 6.5, -Math.PI / 2, 3.0, 2.2, "bolts", { seed: 5 });
var wh = gldPiece(12.5, 0, 8.2, Math.PI * 0.8);
var wheel = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.03, 6, gldSeg(22)), gldW("oak"));
wheel.position.set(0, 0.9, 0);
wh.add(wheel);
wheel.userData.keep = 1;
GLK.spin.push({ m: wheel, ax: "z", sp: 0.6 });
gldBox(0.1, 0.6, 0.5, gldW("oak"), 0, 0.3, 0, wh);
gldCyl(0.02, 0.5, gldW("oak"), 0, 0.75, 0.3, wh, 5);
gldStool(0, 0, 0.8, wh);
gldRoundIn(wh, 0.5, 1.3);
gldTable(7, 0, 8.4, 0, 1.6, 0.8, { wood: "pale" });
for (var b = 0; b < 3; b++) {
var bo = gldCyl(0.1, 0.5, gldCloth([0xC8A040, 0x6A3A6A, 0x2A6A4A][b], 0x101010, 0), 6.5 + b * 0.45, 0.9, 8.4, null, 10);
bo.rotation.x = Math.PI / 2;
}
gldPerson(G, "art_weave", 13.6, 5.4, Math.PI, { title: "master weaver", sex: "f", doing: "weaving a blue cloth", wander: 0 });
var H = gldRoom({ x0: -12, z0: -16, x1: 12, z1: 2, h: 8, floor: fl, wall: wl, beams: false, name: "the Great Hall",
doors: { s: [{ at: 0, w: 2.6, h: 3.2 }], w: [{ at: -10, w: 1.8, h: 2.6 }, { at: -1, w: 1.6, h: 2.6 }], e: [{ at: -10, w: 1.8, h: 2.6 }, { at: -1, w: 1.8, h: 2.6 }],
n: gldWins([gldWin("x", -6, -15.7, 0, 1.8, 3.6, 3.4, -1, day), gldWin("x", 6, -15.7, 0, 1.8, 3.6, 3.4, -1, day)]) } });
frameX(-11.7, 11.7, -15.7, 0, 8, 1);
frameZ(-15.7, 1.7, -11.7, 0, 8, 1);
frameZ(-15.7, 1.7, 11.7, 0, 8, -1);
for (var tz = -14.5; tz <= 0.5; tz += 3) {
gldBox(23.4, 0.32, 0.3, bm, 0, 7.2, tz);
[-1, 1].forEach(function (s) { var br = gldBox(0.3, 2.6, 0.28, bm, s * 10.6, 6.0, tz); br.rotation.z = s * 0.5; gldBox(1.4, 0.3, 0.3, bm, s * 11.0, 5.0, tz); });
gldBox(0.3, 1.4, 0.3, bm, 0, 7.9, tz);
}
[-6, 0, 6].forEach(function (x) { gldBox(0.24, 0.24, 17.4, bm, x, 7.5, -7); });
gldTable(-4.5, 0, -6, 0, 1.2, 9, { trestle: true });
gldTable(4.5, 0, -6, 0, 1.2, 9, { trestle: true });
[-1, 1].forEach(function (s) { gldBench(-4.5 + s * 0.95, 0, -6, Math.PI / 2, 8.4); gldBench(4.5 + s * 0.95, 0, -6, Math.PI / 2, 8.4); });
[-9, -6, -3].forEach(function (z, i) { gldCandle(-4.5, 0.78, z, 1.3); gldCandle(4.5, 0.78, z + 1, 1.3); gldBox(0.5, 0.02, 0.3, gldMat(0xEDE6D8, null), -4.5, 0.79, z + 1.4); var cup = gldCyl(0.05, 0.12, gldMat(0x8A8A88, "metal", { phong: 80 }), 4.5, 0.84, z - 0.6, null, 8, 0.04); });
gldDais(-5, -15.7, 5, -12.4, 0.4, gldMat(0x5A3A20, "wood"));
gldThrone(0, 0.4, -14.8, 0, { mat: gldW("dark"), col: 0x6A2A1A, trim: 0xC8A040 });
gldRug(0, 0, -6, 0, 3, 12, 0x6A2A1A, 0xC8A040, 0x2A3A5A);
gldFireplace(-11.4, 0, -6, Math.PI / 2, { candles: true });
gldChandelier(0, 5.6, -10, 1.2, 8);
gldChandelier(0, 5.6, -3, 1.2, 8);
[["Woodworkers", 0x5A3A1A, 0xE8C890], ["Weavers", 0x2A3A6A, 0xE8D8B0], ["Tailors", 0x6A1A2A, 0xF0DCA8]].forEach(function (r, i) { gldBanner(-11.5, 4.0, -12 + i * 4.5, Math.PI / 2, 1.3, 2.6, r[1], r[2], "hand"); gldSign([r[0].toUpperCase()], 1.4, 0.3, "#1A120A", "#F0DCA8", -11.45, 3.6, -12 + i * 4.5, Math.PI / 2); });
[["Potters", 0x8A4A2A, 0xF0E0C0], ["Glassblowers", 0x1A4A5A, 0xD8F0F0], ["Jewellers", 0x3A1A4A, 0xE8C850]].forEach(function (r, i) { gldBanner(11.5, 4.0, -12 + i * 4.5, -Math.PI / 2, 1.3, 2.6, r[1], r[2], "hand"); gldSign([r[0].toUpperCase()], 1.4, 0.3, "#1A120A", "#F0DCA8", 11.45, 3.6, -12 + i * 4.5, -Math.PI / 2); });
gldBanner(0, 4.6, -15.6, 0, 2.2, 3.2, 0x6A2A1A, 0xC8A040, "hand");
gldSunPatch(-6, 0, -12.5, 2, 4, day);
gldSunPatch(6, 0, -12.5, 2, 4, day);
var M = G.master;
gldPerson(G, "master", 1.6, -13.6, 0, { name: M.name, sex: M.sex, age: M.age, title: M.title, look: M.look, master: true, doing: "looking over an apprentice's dovetails at the Warden's table", y: 0.4 });
gldRollBook(G, -2.2, -13.4, 0.4, Math.PI * 0.1);
gldNoticeBoard(G, -8.6, 1.5, 0, Math.PI, 0xA82A2A);
gldPerson(G, "art_app1", -3.4, -3, Math.PI / 2, { title: "apprentice joiner", doing: "eating bread and cheese at the long table" });
gldPerson(G, "art_tail", 6.5, -1.5, Math.PI, { title: "tailor of the guild", doing: "crossing the hall with a bolt of wool", wander: 4 });
gldRoom({ x0: -20, z0: -16, x1: -12, z1: -4, h: 4.2, floor: tile, wall: gldMat(0xE0D2B4, "plaster"), beams: true, name: "the pottery", doors: { e: [{ at: -10, w: 1.8, h: 2.6 }],
w: gldWins([gldWin("z", -12, -19.7, 0, 1.6, 1.8, 1.1, -1, day)]) } });
gldPotWheel(-17.5, 0, -7, Math.PI / 2);
gldStation("wheel", -16.9, -7, 0, "the potter's wheel", "in the pottery, west of the Great Hall");
gldPotWheel(-17.5, 0, -10.4, Math.PI / 2);
gldKiln(-17.2, 0, -14, 0);
gldShelves(-12.6, 0, -6, -Math.PI / 2, 3.0, 2.2, "pots", { seed: 2 });
gldShelves(-14.5, 0, -4.6, Math.PI, 2.2, 2.0, "pots", { seed: 9 });
gldBarrel(-19.3, 0, -4.8, 0.9);
gldSack(-19.3, 0, -5.8, 0x8A6A4A);
gldPerson(G, "art_pot", -15.4, -10.6, Math.PI / 2, { title: "potter", doing: "wedging clay", wander: 0 });
gldRoom({ x0: -20, z0: -4, x1: -12, z1: 2, h: 4.2, floor: gldMat(0x2A2228, "marble", { phong: 60 }), wall: gldMat(0x3A2A3A, "plaster"), name: "the jeweller's room", doors: { e: [{ at: -1, w: 1.6, h: 2.6 }] } });
gldGate(G, "z", -1, -11.65, 0, 1.6, 3, "The jeweller's room");
gldJewelBench(-17.6, 0, -2.9, 0);
gldStation("jewel", -17.6, -2.1, 0, "the jeweller's bench", "in the jeweller's room, off the Great Hall (Craftsmen and above)");
gldCase(-15.0, 0, 0.9, Math.PI, 1.8, function (g) { [[-0.5, 0xC8203A], [-0.15, 0x20A050], [0.2, 0x2040C8], [0.55, 0xE8E8F8]].forEach(function (q) { var r = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.012, 6, 14), GLD_BRASS()); r.position.set(q[0], 0.86, 0); g.add(r); gldSph(0.025, gldMat(q[1], null, { phong: 120, spec: 0xFFFFFF }), q[0], 0.92, 0, g, 8); }); });
gldChest(-19.2, 0, 0.8, Math.PI / 2, 0x2A1A10);
gldLantern(-16, 3.4, -1, 0xFFE0B0, 0.4);
gldRoom({ x0: 12, z0: -16, x1: 20, z1: -4, h: 4.2, floor: st, wall: gldMat(0xD8CCB0, "brick"), ceil: null, name: "the glass room", doors: { w: [{ at: -10, w: 1.8, h: 2.6 }] } });
gldBox(8, 0.18, 12, gldMat(0xE0D6C0, "plaster"), 16, 4.29, -10);
gldGate(G, "z", -10, 12.35, 0, 1.8, 2, "The glass room");
gldGlassFurnace(17.6, 0, -13, 0);
gldStation("glass", 15.6, -11, 0, "the glory hole of the furnace", "in the glass room, east of the Great Hall (Journeymen and above)");
gldShelves(19.4, 0, -7.6, -Math.PI / 2, 3.6, 2.2, "bottles", { seed: 4 });
gldTable(14.6, 0, -6, 0, 1.6, 0.8, { mat: gldMat(0x5A5A5A, "metal") });
for (var v = 0; v < 4; v++)
gldCyl(0.06, 0.24, gldMat([0x3A8AC8, 0x48A868, 0xC8A030, 0xA83A6A][v], null, { op: 0.6, phong: 120 }), 14.0 + v * 0.4, 0.92, -6, null, 10, 0.03);
gldPerson(G, "art_glass", 16.2, -9.4, Math.PI * 0.75, { title: "glassblower", doing: "turning a gather of glass on the pipe", wander: 0 });
gldRoom({ x0: 12, z0: -4, x1: 20, z1: 2, h: 8.6, floor: fl, wall: wl, name: "the stair", doors: { w: [{ at: -1, w: 1.8, h: 2.6 }], n: [{ at: 19, w: 1.3, h: 2.5, sill: 4.4, bare: true }] } });
gldStair("x", 13.2, 18.2, -3.4, -1.2, 0, 4.4);
gldFloor(18.2, -3.6, 19.7, -0.8, 4.4);
gldBox(1.5, 0.2, 2.8, fl, 18.95, 4.3, -2.2);
gldFloor(18.3, -4.4, 19.7, -3.4, 4.4);
gldBox(1.4, 0.2, 1.0, fl, 19.0, 4.3, -3.9);
gldBox(1.5, 4.2, 2.8, gldMat(0x5A4030, "wood"), 18.95, 2.1, -2.2);
gldSolid(18.95, -2.2, 0.78, 1.42, 0, 4.25);
gldBox(5.6, 0.06, 0.06, gldMat(0x2A1A10, "wood"), 15.7, 5.45, -0.9);
gldLantern(15, 6.8, 0, 0xFFC070, 0.6);
gldRoom({ x0: 12, z0: -16, x1: 20, z1: -3.7, y: 4.4, h: 3.8, floor: fl, wall: wl, beams: true, name: "the masterpiece gallery", doors: { s: [{ at: 19, w: 1.3, h: 2.5 }], w: [] } });
gldGate(G, "x", 19, -4.05, 4.4, 1.3, 4, "The masterpiece gallery");
for (var gx = 0; gx < 4; gx++) {
var art = gldCanvasMat("mp" + gx, 128, 96, function (gx) {
return function (c, W, H) {
c.fillStyle = ["#3A2A1A", "#1A2A3A", "#2A1A2A", "#1A3A2A"][gx];
c.fillRect(0, 0, W, H);
c.strokeStyle = "#C8A040";
c.lineWidth = 8;
c.strokeRect(4, 4, W - 8, H - 8);
c.fillStyle = ["#C88A4A", "#8AB8D8", "#C87A9A", "#9AC88A"][gx];
for (var i = 0; i < 6; i++) {
c.beginPath();
c.arc(20 + i * 17, H / 2 + Math.sin(i + gx) * 18, 10 + gx * 2, 0, 6.3);
c.fill();
}
};
}(gx));
gldPlane(1.4, 1.05, art, 12.4, 4.4 + 1.9, -14.5 + gx * 2.5, Math.PI / 2);
}
gldCase(16, 4.4, -14.6, 0, 2.4, function (g) {
var ch = gldPiece(-0.6, 0.8, 0, 0.4, g);
gldBox(0.2, 0.02, 0.2, gldW("red"), 0, 0.12, 0, ch);
for (var q = 0; q < 4; q++)
gldBox(0.015, 0.12, 0.015, gldW("red"), (q % 2 - 0.5) * 0.17, 0.06, (Math.floor(q / 2) - 0.5) * 0.17, ch);
var vs = gldCyl(0.08, 0.32, gldMat(0x3A8AC8, null, { op: 0.7, phong: 120 }), 0.1, 0.98, 0, g, 14, 0.05);
var rg = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.015, 6, 14), GLD_BRASS());
rg.position.set(0.7, 0.86, 0);
g.add(rg);
});
gldStation("masterpiece", 16, -12.8, 4.4, "the masterpiece bench", "in the masterpiece gallery, up the stair (Master Craftsmen and above)");
gldWorkbench(16, 4.4, -11.6, Math.PI);
gldWall("x", 12.3, 19.7, -8.6, 4.4, 3.8, 0.2, wl, [{ at: 15.25, w: 1.6, h: 2.5 }]);
GLK.rooms.push({ x0: 12.3, z0: -8.5, x1: 19.7, z1: -4.0, y: 4.4, h: 3.8, name: "the Warden's study", key: "", rank: 4 });
gldDesk(14.2, 4.4, -6, Math.PI / 2, { lamp: true, coin: false });
gldChair(13.4, 4.4, -6, Math.PI / 2, { cushion: 0x6A2A1A });
gldBookcase(19.4, 4.4, -6.5, -Math.PI / 2, 2.4, 2.6);
gldRug(16.4, 4.4, -6.4, 0, 3, 3, 0x2A3A5A, 0xC8A040, 0x6A2A1A);
gldLantern(16, 4.4 + 3.0, -11, 0xFFC070, 0.3);
gldLantern(16, 4.4 + 3.0, -6, 0xFFC070, 0.3);
return { front: { x: 0, z: 8.6, yaw: 0 }, in: { x: 0, z: -2, yaw: 0 }, master: { x: 0, z: -10.6, yaw: 0 }, gallery: { x: 16, z: -7.5, y: 4.4, yaw: 0 } };
},
function (G) {
var st = gldMat(0x6A625A, "stone"), dk = gldMat(0x4A4440, "stone"), br = gldMat(0x5A3A2A, "brick"), fl = gldMat(0x5A5450, "paving"), wd = gldMat(0x4A3020, "wood"), pn = gldMat(0x5A3A20, "wood");
gldRoom({ x0: -5, z0: 4, x1: 5, z1: 10, h: 4.5, floor: fl, wall: st, ceil: gldMat(0x3A3028, "wood"), beams: true, beamMat: gldW("dark"), name: "the porch",
doors: { s: [{ at: 0, w: 2.6, h: 3.2 }], n: [{ at: 0, w: 3, h: 3.4 }] } });
gldSign(["THE WORSHIPFUL COMPANY OF SMITHS", "by the hammer and hand all arts do stand"], 3.6, 0.8, "#1A1412", "#F0C890", 0, 3.4, 4.62, 0);
gldBanner(-3.8, 1.0, 4.6, 0, 1.2, 2.4, 0x2A2420, 0xE88A3A, "hammers");
gldBanner(3.8, 1.0, 4.6, 0, 1.2, 2.4, 0x2A2420, 0xE88A3A, "hammers");
gldArmourStand(-3.6, 0, 8, Math.PI / 2);
gldArmourStand(3.6, 0, 8, -Math.PI / 2, 0x8A8A90);
gldBench(-4.2, 0, 6.2, Math.PI / 2, 1.8);
gldLantern(0, 3.6, 7, 0xFFB060, 0.5);
gldExit(G, 0, 9.2, 0, "The doors, out to the Market Ring");
gldRoom({ x0: -14, z0: -12, x1: 14, z1: 4, h: 7, floor: fl, wall: br, ceil: gldMat(0x2A2420, "wood"), name: "the forge floor",
doors: { s: [{ at: 0, w: 3, h: 3.4 }], w: [{ at: -4, w: 2.2, h: 3 }], e: [{ at: -4, w: 2.2, h: 3 }], n: [{ at: 1.5, w: 2.2, h: 3 }] } });
for (var tz = -10.5; tz <= 3; tz += 3.4) {
gldBox(27.4, 0.4, 0.4, gldW("dark"), 0, 6.6, tz);
}
[-9, -3.5, 6].forEach(function (x, i) { gldForgeHearth(x, 0, -10.6, 0); });
gldStation("hearth", -3.5, -8.9, 0, "the middle hearth", "on the forge floor, the middle of the three hearths");
[[-8.5, -5.5], [-3, -5.5], [3, -5], [8.5, -5.5]].forEach(function (p, i) { gldAnvil(p[0], 0, p[1], i * 0.7); });
gldStation("anvil", -3, -4.4, 0, "the master's anvil", "on the forge floor, the second anvil from the west");
gldTrough(-6, 0, -7.6, 0);
gldTrough(2, 0, -7.6, 0);
gldRack(-13.4, 0, -2, Math.PI / 2, 3.6, "tongs");
gldRack(13.4, 0, 0, -Math.PI / 2, 3.0, "tongs");
gldShelves(13.4, 0, -8.8, -Math.PI / 2, 3.2, 2.2, "ingots", { seed: 4 });
var ch = gldSph(1.3, gldMat(0x141210, null), 11.5, -0.3, 2.4, null, 10);
ch.scale.y = 0.45;
gldRound(11.5, 2.4, 1.3, 0, 0.6);
gldBarrel(-12.6, 0, 2.6, 1);
gldBarrel(-11.8, 0, 3.0, 0.9);
gldLantern(-6, 5.4, -2, 0xFFB060, 1.2);
gldLantern(6, 5.4, -2, 0xFFB060, 1.2);
gldNoticeBoard(G, -6.5, 3.55, 0, Math.PI, 0xE88A3A);
gldPerson(G, "smi_1", -8.6, -8.6, Math.PI, { title: "smith of the Company", doing: "drawing out a bar at the west hearth", wander: 0 });
gldPerson(G, "smi_2", 6.2, -8.6, Math.PI, { title: "journeyman smith", doing: "tending the east hearth", wander: 0 });
gldPerson(G, "smi_3", 4.2, -3.6, -Math.PI / 2, { title: "striker", doing: "swinging the sledge for a master", wander: 2 });
gldPerson(G, "smi_4", -1, 1.5, 0, { title: "apprentice smith", sex: "f", doing: "carrying a scuttle of coal", wander: 5 });
gldRoom({ x0: -24, z0: -12, x1: -14, z1: 4, h: 5, floor: gldMat(0x6A5A3A, "earth"), wall: st, beams: true, beamMat: gldW("dark"), name: "the farrier's bay", doors: { e: [{ at: -4, w: 2.2, h: 3 }] } });
gldGate(G, "z", -4, -14.35, 0, 2.2, 2, "The farrier's bay");
gldRack(-23.4, 0, -4, Math.PI / 2, 4, "shoes");
gldAnvil(-19, 0, -6, 0.3);
gldForgeHearth(-19, 0, -10.8, 0);
[[-21, -1], [-17, -1], [-21, 2.2], [-17, 2.2]].forEach(function (p) { gldCyl(0.12, 2.2, gldW("dark"), p[0], 1.1, p[1], null, 8); gldRound(p[0], p[1], 0.16, 0, 2.2); });
[-1, 2.2].forEach(function (z) { gldBox(4.2, 0.14, 0.14, gldW("dark"), -19, 1.5, z); });
gldCyl(0.1, 0.6, GLD_IRON(), -19, 0.3, 0.6, null, 8);
for (var h = 0; h < 4; h++) {
if (typeof gldHayBale === "function")
gldHayBale(-22.6, Math.floor(h / 2) * 0.47, 1.5 + (h % 2) * 0.62, (h % 3 - 1) * 0.08);
else {
var hy = gldBox(1.0, 0.5, 0.6, gldMat(0xC8A850, null), -22.6, 0.25 + Math.floor(h / 2) * 0.5, 1.5 + (h % 2) * 0.7);
hy.rotation.y = h * 0.2;
}
}
gldSolid(-22.6, 1.85, 0.6, 0.8, 0, 1);
gldPerson(G, "smi_far", -19.6, -3.6, 0.3, { title: "farrier", doing: "rasping a hoof by the stocks", wander: 0 });
gldRoom({ x0: 14, z0: -12, x1: 24, z1: 4, h: 5, floor: fl, wall: dk, name: "the proving room", doors: { w: [{ at: -4, w: 2.2, h: 3 }] } });
gldGate(G, "z", -4, 14.35, 0, 2.2, 3, "The proving room");
var pp = gldPiece(19, 0, -8, 0);
gldCyl(0.3, 1.6, gldMat(0x4A3420, "bark"), 0, 0.8, 0, pp, 12);
gldBox(0.5, 0.12, 0.5, GLD_IRON(), 0, 1.66, 0, pp);
gldRound(19, -8, 0.4, 0, 1.7);
gldStation("proof", 19, -6.6, 0, "the proving post", "in the proving room (Smiths and above)");
gldArmourStand(16, 0, -10.8, 0);
gldArmourStand(22, 0, -10.8, 0, 0x9A9AA0);
gldArmourStand(16, 0, 2.6, Math.PI, 0xC8C0B0);
gldRack(23.4, 0, -3, -Math.PI / 2, 4, "weapons");
gldTable(19, 0, 1.6, 0, 2, 0.9, { wood: "dark" });
for (var bl = 0; bl < 3; bl++) {
gldBox(0.05, 0.012, 0.9, gldMat(0xC8C8D0, "metal", { phong: 100 }), 18.4 + bl * 0.5, 0.79, 1.6);
gldBox(0.18, 0.05, 0.05, GLD_BRASS(), 18.4 + bl * 0.5, 0.8, 1.1);
}
gldLantern(19, 3.8, -3, 0xFFD0A0, 0.4);
gldRoom({ x0: -10, z0: -24, x1: 10, z1: -12, h: 6, floor: gldMat(0x5A3A20, "wood"), wall: pn, ceil: gldMat(0x3A2614, "wood"), beams: true, beamMat: gldW("dark"), name: "the Company's hall",
doors: { s: [{ at: 1.5, w: 2.2, h: 3 }], e: [{ at: -18, w: 1.8, h: 2.6 }] } });
for (var px = -9.4; px < 9.5; px += 1.6) {
gldBox(1.4, 2.4, 0.04, gldMat(0x6A4428, "wood"), px, 1.4, -23.62);
}
gldTable(0, 0, -17.5, 0, 7, 1.4, { wood: "dark" });
for (var c = 0; c < 6; c++) {
gldChair(-2.6 + c * 1.05, 0, -16.4, Math.PI, { cushion: 0x6A2A1A });
gldChair(-2.6 + c * 1.05, 0, -18.6, 0, { cushion: 0x6A2A1A });
}
gldThrone(0, 0.4, -22.8, 0, { mat: gldW("dark"), col: 0x2A2420, trim: 0xE88A3A });
gldDais(-3, -23.7, 3, -21.4, 0.4, gldMat(0x3A2614, "wood"));
gldFireplace(-9.6, 0, -18, Math.PI / 2, { candles: true, mat: dk });
gldCase(6.6, 0, -23.3, 0, 3.2, function (g) { for (var i = 0; i < 6; i++) {
var cp = gldCyl(0.08 + (i % 3) * 0.02, 0.22 + (i % 2) * 0.1, GLD_BRASS(), -1.3 + i * 0.52, 0.95, 0, g, 12, 0.05);
gldSph(0.06, GLD_BRASS(), -1.3 + i * 0.52, 1.1 + (i % 2) * 0.1, 0, g, 8);
} });
gldBanner(0, 3.2, -23.6, 0, 2.2, 2.6, 0x2A2420, 0xE88A3A, "hammers");
gldChandelier(0, 4.6, -17.5, 1.4, 10);
gldRug(0, 0, -17.5, 0, 8.5, 3.6, 0x4A1A14, 0xE88A3A, 0x1A1412);
gldPlane(2.4, 3.2, gldCanvasMat("smithroll", 128, 170, function (x, W, H) {
x.fillStyle = "#2A1A10";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C8A040";
x.lineWidth = 4;
x.strokeRect(4, 4, W - 8, H - 8);
x.fillStyle = "#E8C890";
x.font = "bold 11px Georgia";
x.textAlign = "center";
x.fillText("MASTERS OF THE COMPANY", W / 2, 20);
x.font = "9px Georgia";
["J. Hammond", "R. Dunstan", "E. Wayland", "T. Cartwright", "M. Ironside", "A. Ferrier", "W. Steel", "H. Bellows", "O. Tempest", "B. Crane"].forEach(function (n, i) { x.fillText(n, W / 2, 38 + i * 12.5); });
}), 9.6, 1.8, -15.5, -Math.PI / 2);
var M = G.master;
gldPerson(G, "master", 1.5, -21.4, 0, { name: M.name, sex: M.sex, age: M.age, title: M.title, look: M.look, master: true, doing: "reading the day's book of work by the fire", y: 0.4 });
gldRollBook(G, -1.8, -21.0, 0.4, 0.2);
gldRoom({ x0: 10, z0: -24, x1: 22, z1: -12, h: 5, floor: fl, wall: br, name: "the armourer's hearth", doors: { w: [{ at: -18, w: 1.8, h: 2.6 }] } });
gldGate(G, "z", -18, 10.35, 0, 1.8, 4, "The armourer's hearth");
gldForgeHearth(16, 0, -22.6, 0);
gldAnvil(14, 0, -18, 0.4);
gldArmourStand(19.5, 0, -17, -Math.PI / 2, 0xB8BCC4);
gldStation("armour", 17, -17.6, 0, "the armourer's stand", "in the armourer's hearth room, off the Company's hall (Master Smiths and above)");
gldShelves(21.4, 0, -14, -Math.PI / 2, 3, 2, "ingots", { seed: 7 });
gldLantern(16, 3.6, -15, 0xFFB060, 0.4);
return { front: { x: 0, z: 8.6, yaw: 0 }, in: { x: 0, z: 0, yaw: 0 }, master: { x: 1.5, z: -15, yaw: 0 }, forge: { x: 0, z: -1, yaw: 0 } };
},
function (G) {
var mb = gldMat(0xCFC6B6, "marble", { phong: 20 }), mf = gldMat(0xC8C0B0, "marble", { phong: 60 }), dk = gldMat(0x2A2A30, "marble", { phong: 60 }), wd = gldMat(0x5A3A20, "wood"), gd = GLD_BRASS(), pl = gldMat(0xD8CCB0, "plaster");
var navy = 0x2A3A5A, gold = 0xE8C850;
gldRoom({ x0: -5, z0: 6, x1: 5, z1: 12, h: 5, floor: mf, wall: mb, ceil: pl, name: "the vestibule", doors: { s: [{ at: 0, w: 2.6, h: 3.4 }], n: [{ at: 0, w: 3, h: 3.6 }] } });
[-3.6, 3.6].forEach(function (x) { gldCyl(0.35, 5, mb, x, 2.5, 8.8, null, 16, 0.38); gldRound(x, 8.8, 0.4, 0, 5); });
gldSign(["THE MERCHANT VENTURERS OF SOMNUCOR", "honest weight · fair price · safe passage"], 3.8, 0.8, "#1A2A3A", "#F0E0A8", 0, 3.9, 6.62, 0);
gldRug(0, 0, 9, 0, 2.4, 4.4, navy, gold, 0x6A1A1A);
gldLantern(0, 4.0, 9, 0xFFE0A0, 0.5);
gldExit(G, 0, 11.2, 0, "The doors, out to the Civic Ring");
gldRoom({ x0: -14, z0: -14, x1: 14, z1: 6, h: 9, floor: dk, wall: mb, ceil: pl, name: "the trading floor",
doors: { s: [{ at: 0, w: 3, h: 3.6 }], w: [{ at: -4, w: 2.2, h: 3 }], e: [{ at: -8, w: 2, h: 3 }, { at: 2, w: 2, h: 3 }] } });
for (var ix = -6; ix < 6; ix++)
for (var iz = -7; iz < 3; iz++)
if ((ix + iz) % 2 === 0)
gldBox(2, 0.02, 2, mf, ix * 2.3 + 1.15, 0.01, iz * 2 + 0.6);
for (var cx = -12; cx <= 12; cx += 4)
gldBox(0.3, 0.5, 19.4, gldMat(0xC8BCA0, "plaster"), cx, 8.7, -4);
for (var cz = -13; cz <= 5; cz += 3)
gldBox(27.4, 0.5, 0.3, gldMat(0xC8BCA0, "plaster"), 0, 8.7, cz);
[-8, 8].forEach(function (x) { for (var z = -10; z <= 2; z += 4) {
gldCyl(0.45, 8.4, mb, x, 4.2, z, null, 18, 0.5);
gldBox(1.2, 0.4, 1.2, mf, x, 0.2, z);
gldBox(1.2, 0.4, 1.2, mf, x, 8.6, z);
gldRound(x, z, 0.55, 0, 9);
} });
var bdm = gldCanvasMat("prices", 512, 256, function (c, W, H) {
c.fillStyle = "#1A2420";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#C8A040";
c.lineWidth = 8;
c.strokeRect(4, 4, W - 8, H - 8);
c.fillStyle = "#F0E8D0";
c.font = "bold 22px Georgia";
c.textAlign = "center";
c.fillText("TODAY'S PRICES ON THE FLOOR", W / 2, 34);
c.font = "16px Georgia";
c.textAlign = "left";
[["Iron ore, the load", "12"], ["Oak, the plank", "4"], ["Wool, the bale", "18"], ["Silk, the bolt", "64"], ["Glass, the crate", "22"], ["Salt fish, the barrel", "15"], ["Lamp oil, the cask", "9"], ["Copper, the ingot", "11"], ["Spice of the south, the jar", "40"], ["Paper, the ream", "6"]].forEach(function (r, i) {
var x = i < 5 ? 30 : 270, y = 70 + (i % 5) * 34;
c.fillStyle = "#E8DCC0";
c.fillText(r[0], x, y);
c.fillStyle = "#F0C860";
c.fillText(r[1] + " g", x + 180, y);
});
});
gldPlane(9, 4.5, bdm, 0, 4.8, -13.42, 0);
gldBox(9.4, 0.2, 0.3, wd, 0, 2.5, -13.38);
gldDais(-5, -13.7, 5, -10.6, 0.5, gldMat(0x3A2A20, "wood"));
var bt = gldPiece(0, 0, -4, 0);
gldCyl(1.6, 0.08, wd, 0, 0.86, 0, bt, 24);
gldCyl(1.62, 0.05, gd, 0, 0.9, 0, bt, 24);
gldCyl(0.3, 0.86, wd, 0, 0.43, 0, bt, 12);
gldRound(0, -4, 1.65, 0, 0.95);
for (var s = 0; s < 6; s++) {
var a = s / 6 * 6.283;
gldChair(Math.cos(a) * 2.2, 0, -4 + Math.sin(a) * 2.2, Math.atan2(-Math.cos(a), -Math.sin(a)), { wood: "red", cushion: navy });
}
gldStation("floor", 0, -1.6, 0, "the bargain table", "in the middle of the trading floor");
[[-10.8, -6], [10.8, -6], [-10.8, 1], [10.8, 1]].forEach(function (p, i) { gldDesk(p[0], 0, p[1], i % 2 ? -Math.PI / 2 : Math.PI / 2, { scales: true }); gldChair(p[0] + (i % 2 ? 0.9 : -0.9), 0, p[1], i % 2 ? -Math.PI / 2 : Math.PI / 2, { wood: "red" }); });
gldBanner(-13.5, 3.5, -4, Math.PI / 2, 1.4, 3, navy, gold, "scales");
gldBanner(13.5, 3.5, -4.6, -Math.PI / 2, 1.4, 3, navy, gold, "scales");
gldBanner(0, 7.6, -13.45, 0, 2, 1.4, navy, gold, "scales");
var wn = gldMat(0x3A2414, "wood", { phong: 30 });
[[-13.5, -5.3], [-2.7, 5.5]].forEach(function (q) { gldWainscot("z", q[0], q[1], -13.7, 0, 1.3, 1, wn); });
[[-13.5, -9.2], [-6.8, 0.8], [3.2, 5.5]].forEach(function (q) { gldWainscot("z", q[0], q[1], 13.7, 0, 1.3, -1, wn); });
gldWainscot("x", -13.5, 13.5, -13.7, 0, 1.3, 1, wn);
[[-13.5, -1.7], [1.7, 13.5]].forEach(function (q) { gldWainscot("x", q[0], q[1], 5.7, 0, 1.3, -1, wn); });
[[-10.5, "portrait"], [1.8, "ship"]].forEach(function (q, i) { gldPainting(-13.45, 4.4, q[0], Math.PI / 2, 1.7, 2.1, "mer_w" + i, q[1]); });
[[-11.4, "ship"], [4.6, "portrait"]].forEach(function (q, i) { gldPainting(13.45, 4.4, q[0], -Math.PI / 2, 1.5, 1.9, "mer_e" + i, q[1]); });
[[-8.5, "land"], [-4, "portrait"], [4, "portrait"], [11.5, "ship"]].forEach(function (q, i) { gldPainting(q[0], 4.4, 5.45, Math.PI, 1.5, 1.9, "mer_s" + i, q[1]); });
[-7.5, -1.5, 4].forEach(function (z) { gldSconce(-13.47, 2.9, z, Math.PI / 2); });
[-5, -0.5, 5].forEach(function (z) { gldSconce(13.47, 2.9, z, -Math.PI / 2); });
[-11, -6.5, 6.5, 11].forEach(function (x) { gldSconce(x, 2.9, -13.47, 0); });
gldChandelier(0, 6.6, -6, 1.8, 12);
gldChandelier(0, 6.6, 1, 1.6, 10);
gldRug(0, 0, -4, 0, 6, 6, 0x6A1A1A, gold, navy);
var M = G.master;
gldPerson(G, "master", 2.0, -12.0, 0, { name: M.name, sex: M.sex, age: M.age, title: M.title, look: M.look, master: true, doing: "reading the shipping news with a pencil behind her ear", y: 0.5 });
gldRollBook(G, -2.2, -11.8, 0.5, 0.15);
gldNoticeBoard(G, 8.5, 5.55, 0, Math.PI, 0x2A3A5A);
gldPerson(G, "mer_1", -5, -2, 0.5, { title: "factor of the Venturers", doing: "haggling over the price of wool", wander: 3 });
gldPerson(G, "mer_2", 4.6, 0.6, -0.8, { title: "merchant", sex: "f", doing: "reading a bill of lading", wander: 3 });
gldPerson(G, "mer_3", -10.2, 1, Math.PI / 2, { title: "clerk of the floor", doing: "chalking a new price on a slate", wander: 0 });
gldRoom({ x0: -24, z0: -14, x1: -14, z1: 6, h: 4.6, floor: gldMat(0x5A3A20, "wood"), wall: pl, ceil: gldMat(0x4A3020, "wood"), beams: true, beamMat: gldW("dark"), name: "the counting house",
doors: { e: [{ at: -4, w: 2.2, h: 3 }], s: [{ at: -15.6, w: 1.5, h: 2.6 }] } });
for (var r = 0; r < 3; r++)
for (var cc = 0; cc < 2; cc++) {
gldDesk(-21.4 + cc * 4, 0, -10 + r * 4, 0, { scales: cc === 1, lamp: true });
gldChair(-21.4 + cc * 4, 0, -9.2 + r * 4, Math.PI, { wood: "red" });
}
gldStation("ledger", -17.4, -1.2, 0, "a clerk's desk with the day's takings", "in the counting house, west of the trading floor");
gldShelves(-23.4, 0, -4, Math.PI / 2, 6, 2.6, "ledgers", { n: 5, wood: "dark" });
gldChest(-23.2, 0, 3.6, Math.PI / 2, 0x2A1A10);
gldChest(-23.2, 0, 4.9, Math.PI / 2, 0x3A2414);
gldPerson(G, "mer_clerk", -21.4, -5.2, Math.PI, { title: "chief clerk", doing: "totting up a column of figures", wander: 0 });
gldLantern(-19, 3.8, -4, 0xFFE0A0, 0.4);
gldGate(G, "x", -15.6, 5.65, 0, 1.5, 4, "The stair to the strongroom");
gldRoom({ x0: -24, z0: 6, x1: -14, z1: 12, y: -4, h: 8, floor: gldMat(0x4A4440, "stone"), wall: gldMat(0x5A5450, "stone"), name: "the strongroom stair",
doors: { n: [{ at: -15.6, w: 1.5, h: 2.6, sill: 4, bare: true }], w: [{ at: 9, w: 1.6, h: 2.6 }] } });
gldFloor(-16.4, 6.0, -14.6, 8.0, 0);
gldBox(1.8, 0.25, 2.0, gldMat(0x4A4440, "stone"), -15.5, -0.12, 7.0);
gldBox(1.8, 3.8, 0.3, gldMat(0x4A4440, "stone"), -15.5, -2.1, 7.9);
gldSolid(-15.5, 7.0, 0.95, 1.0, -4, 3.85);
gldStair("x", -16.4, -22.6, 7.2, 9.4, 0, -4, gldMat(0x5A5450, "stone"));
gldLantern(-19, 1.5, 11, 0xFFC080, 0.6);
gldRoom({ x0: -34, z0: 5, x1: -24, z1: 13, y: -4, h: 3.4, floor: gldMat(0x3A3A3C, "stone"), wall: gldMat(0x6A6A6E, "metal"), ceil: gldMat(0x4A4A4E, "metal"), name: "the strongroom", doors: { e: [{ at: 9, w: 1.6, h: 2.6 }] } });
var vd = gldPiece(-24.6, -4, 10.2, 0.9);
gldCyl(1.2, 0.4, gldMat(0x8A8A90, "metal", { phong: 90 }), 0, 1.3, 0, vd, 24).rotation.x = Math.PI / 2;
for (var bo = 0; bo < 6; bo++) {
var a2 = bo / 6 * 6.283;
gldCyl(0.08, 0.5, GLD_BRASS(), Math.cos(a2) * 0.85, 1.3 + Math.sin(a2) * 0.85, 0, vd, 8).rotation.x = Math.PI / 2;
}
for (var k = 0; k < 4; k++)
gldChest(-32.8, -4, 6.4 + k * 1.6, Math.PI / 2, 0x2A2A2E);
gldShelves(-29, -4, 12.4, Math.PI, 5, 2.4, "ingots", { seed: 11 });
gldLantern(-29, -1.4, 9, 0xFFE0A0, 0.2);
gldRoom({ x0: 14, z0: -14, x1: 24, z1: -3, h: 5, floor: gldMat(0x5A3A20, "wood"), wall: gldMat(0x2A3A4A, "plaster"), ceil: gldMat(0x3A2614, "wood"), beams: true, beamMat: gldW("dark"), name: "the map room", doors: { w: [{ at: -8, w: 2, h: 3 }] } });
gldGate(G, "z", -8, 14.35, 0, 2, 3, "The map room");
gldMapTable(19, 0, -8.6, 0, 3, 2, "venturers");
gldStation("maps", 19, -6.9, 0, "the chart table", "in the map room (Venturers and above)");
gldGlobe(22.4, 0, -12.4);
["north", "south", "east", "west"].forEach(function (k2, i) { gldPlane(2.2, 1.6, gldMapMat("wall-" + k2, "#E0D0A8"), 23.6, 2.4, -12.4 + i * 2.4, -Math.PI / 2); });
gldShelves(14.6, 0, -12, Math.PI / 2, 2.6, 2.2, "books", { n: 5 });
gldLantern(19, 3.8, -8.6, 0xFFE0A0, 0.4);
gldRoom({ x0: 14, z0: -3, x1: 24, z1: 6, h: 5, floor: gldMat(0x4A2A18, "wood"), wall: gldMat(0x5A2A2A, "plaster"), ceil: pl, name: "the Governor's rooms", doors: { w: [{ at: 2, w: 2, h: 3 }] } });
gldGate(G, "z", 2, 14.35, 0, 2, 4, "The Governor's rooms");
gldDesk(20, 0, -0.4, -Math.PI / 2, { lamp: true, scales: true });
gldChair(21, 0, -0.4, -Math.PI / 2, { cushion: navy });
gldFireplace(23.4, 0, 3.4, -Math.PI / 2, { candles: true, mat: mb });
gldBookcase(16, 0, -2.4, 0, 3, 2.8);
[[17, 3.4], [18.8, 4.6]].forEach(function (p, i) { gldChair(p[0], 0, p[1], i ? Math.PI * 1.2 : Math.PI * 0.6, { cushion: 0x6A1A1A }); });
gldRug(19.5, 0, 1.5, 0, 5, 4.4, 0x2A1A3A, gold, 0x6A1A1A);
gldPlane(1.6, 2.0, gldCanvasMat("governor-portrait", 96, 128, function (x, W, H) { x.fillStyle = "#2A1A14"; x.fillRect(0, 0, W, H); x.strokeStyle = "#C8A040"; x.lineWidth = 6; x.strokeRect(3, 3, W - 6, H - 6); x.fillStyle = "#C89A7A"; x.beginPath(); x.ellipse(W / 2, 46, 16, 20, 0, 0, 6.3); x.fill(); x.fillStyle = "#2A3A5A"; x.fillRect(22, 70, 52, 50); }), 14.4, 2.6, 2, Math.PI / 2);
return { front: { x: 0, z: 10.6, yaw: 0 }, in: { x: 0, z: 3, yaw: 0 }, master: { x: 1, z: -7, yaw: 0 }, strong: { x: -28, z: 9, y: -4, yaw: -Math.PI / 2 } };
},
function (G) {
var br = gldMat(0x6A4434, "brick"), dbr = gldMat(0x4A3428, "brick"), fl = gldMat(0x4A4038, "paving"), bd = gldMat(0x3A2E26, "wood");
var y = -5;
function hidden() { return gldOk18(G) ? "" : "Just bales of old rags, stacked to the rafters. They smell of damp."; }
gldRoom({ x0: -4, z0: 4, x1: 4, z1: 10, h: 3.4, floor: gldMat(0x5A5048, "concrete"), wall: br, ceil: gldMat(0x3A3028, "wood"), beams: true, beamMat: gldW("dark"), name: "the back store",
doors: { s: [{ at: 0.6, w: 1.3, h: 2.3 }], n: [{ at: 0, w: 2.6, h: 2.5, bare: true }] } });
gldSecret({ id: "rags", kind: "rags", dir: "x", at: 0, c: 4.3, face: 1, w: 2.6, h: 2.5, name: "The bales on the back wall", hint: "The rag bales against the back wall", when: hidden });
[[-3, 4.9], [3, 4.9]].forEach(function (p) { for (var r = 0; r < 3; r++) {
gldBox(1.1, 0.8, 0.7, gldCloth([0x6A5A4A, 0x5A4A3A, 0x7A6A5A][r], 0x2A2018, 0), p[0], 0.42 + r * 0.84, p[1]);
} gldSolid(p[0], p[1], 0.6, 0.4, 0, 2.6); });
gldTable(-1.6, 0, 7.6, 0.1, 2.0, 0.9, { wood: "oak", trestle: true });
for (var i = 0; i < 6; i++) {
var rg = gldBox(0.4, 0.08, 0.3, gldCloth([0x8A3A2A, 0xD8D0C0, 0x3A4A6A, 0x6A6A3A][i % 4], 0x1A1A1A, 0), -2.3 + i * 0.28, 0.83, 7.6 + ((i * 7) % 3 - 1) * 0.15);
rg.rotation.y = i * 0.5;
}
var sc = gldPiece(2.6, 0, 7.8, -0.3);
gldCyl(0.05, 1.2, GLD_IRON(), 0, 0.6, 0, sc, 6);
gldBox(0.6, 0.03, 0.03, GLD_IRON(), 0, 1.2, 0, sc);
gldCyl(0.18, 0.03, GLD_BRASS(), -0.3, 0.95, 0, sc, 10);
gldCyl(0.18, 0.03, GLD_BRASS(), 0.3, 0.95, 0, sc, 10);
gldRoundIn(sc, 0.3, 1.3);
gldSack(3.2, 0, 5.8, 0x6A5A40);
gldSack(2.6, 0, 5.4, 0x5A4A30);
gldBarrel(-3.3, 0, 9.2, 0.8);
gldLantern(0, 2.6, 7, 0xFFB050, 0.4);
gldPerson(G, "jem", -1.6, 8.6, Math.PI, { name: "Jem Rowe", sex: "m", age: 63, title: "the yard-hand", outsider: "the Rag and Bone Yard", doing: "sorting rags into cloth and wool" });
gldExit(G, 0.6, 9.2, 0, "The door, out to the alley");
gldRoom({ x0: -2, z0: -5, x1: 2, z1: 4, y: y, h: 9, floor: fl, wall: dbr, name: "the stair down", doors: { s: [{ at: 0, w: 2.6, h: 2.5, sill: 5, bare: true }], n: [{ at: 0, w: 1.8, h: 2.5 }] } });
gldStair("z", 3.3, -4.4, -1.4, 1.4, 0, y, gldMat(0x5A5048, "stone"));
gldSolid(0, 3.55, 1.4, 0.2, y, 4.85);
gldLantern(1.2, -1.6, -2, 0xFFB050, 0.3);
gldRoom({ x0: -10, z0: -21, x1: 10, z1: -5, y: y, h: 3.8, floor: fl, wall: br, ceil: gldMat(0x5A3A2A, "brick"), name: "the Counting Cellar",
doors: { s: [{ at: 0, w: 1.8, h: 2.5 }], w: [{ at: -13, w: 1.8, h: 2.5 }], e: [{ at: -17, w: 1.8, h: 2.5 }, { at: -9, w: 1.8, h: 2.5 }], n: [{ at: 0, w: 1.8, h: 2.5 }] } });
gldVaults(-9.7, -20.7, 9.7, -5.3, y, 3.8, "x");
gldTable(0, y, -13, 0, 8, 1.4, { wood: "dark", trestle: true });
[-1, 1].forEach(function (s) { gldBench(0, y, -13 + s * 1.0, 0, 7.4); });
[-3, -1, 1, 3].forEach(function (x, i) { gldCandle(x, y + 0.78, -13 + (i % 2 ? 0.3 : -0.3), 1.3); });
gldCyl(0.22, 0.02, gldMat(0xC8C8D0, "metal", { phong: 100 }), -2.2, y + 0.8, -12.7, null, 18);
gldCyl(0.04, 0.4, gldMat(0xC8C8D0, "metal", { phong: 100 }), 2.4, y + 0.98, -13.2, null, 8);
gldCyl(0.04, 0.4, gldMat(0xC8C8D0, "metal", { phong: 100 }), 2.7, y + 0.98, -13.3, null, 8);
var pt = gldBox(0.5, 0.4, 0.03, gldCanvasMat("haul-pic", 64, 52, function (x, W, H) { x.fillStyle = "#3A5A3A"; x.fillRect(0, 0, W, H); x.fillStyle = "#C8A040"; x.fillRect(0, 0, W, 4); x.fillRect(0, H - 4, W, 4); x.fillStyle = "#E8D8A0"; x.beginPath(); x.arc(W * 0.7, H * 0.35, 7, 0, 6.3); x.fill(); }), 0.6, y + 1.0, -13.4);
pt.rotation.x = -0.3;
gldBox(0.14, 0.1, 0.08, gldMat(0x5A3A1A, null), -0.9, y + 0.83, -12.8);
gldThrone(2.35, y, -19.8, 0, { mat: gldW("dark"), col: 0x3A2A1A, trim: 0x8A6A3A });
gldPlane(4.6, 0.9, gldCanvasMat("rules", 256, 52, function (x, W, H) { x.fillStyle = "#1A140E"; x.fillRect(0, 0, W, H); x.strokeStyle = "#8A6A3A"; x.lineWidth = 3; x.strokeRect(2, 2, W - 4, H - 4); x.fillStyle = "#E8D8B0"; x.font = "bold 13px Georgia"; x.textAlign = "center"; x.fillText("NEVER THE POOR · NEVER A HOME · NEVER ANYONE HURT", W / 2, 32); }), 0, y + 2.7, -20.6, 0);
gldBanner(0.7, y + 0.9, -20.6, 0, 1.1, 1.8, 0x2A2018, 0xC8A050, "key");
gldBanner(4.0, y + 0.9, -20.6, 0, 1.1, 1.8, 0x2A2018, 0xC8A050, "key");
gldShelves(-9.4, y, -8, Math.PI / 2, 3, 2.2, "bottles", { seed: 6 });
gldBarrel(9, y, -6.2, 0.9);
gldBarrel(8.2, y, -6.0, 0.8);
gldCrate(-8.8, y, -19.6, 0.3, 0.9);
gldLantern(-5, y + 2.6, -9, 0xFFB050, 0.6);
gldLantern(5, y + 2.6, -17, 0xFFB050, 0.6);
var M = G.master;
gldPerson(G, "master", 3.6, -19.2, 0, { name: M.name, sex: M.sex, age: M.age, title: M.title, look: M.look, master: true, doing: "counting out the week's shares into little cloth bags", y: y });
gldRollBook(G, 0.6, -18.8, y, 0.2);
gldNoticeBoard(G, -6.5, -5.55, y, Math.PI, 0x8A6A3A);
gldPerson(G, "thf_1", -2.6, -10, 0.8, { title: "Lightfinger of the Quiet Hands", sex: "f", doing: "telling a story about a very surprised watchmaker", y: y, wander: 2.5 });
gldPerson(G, "thf_2", 3.2, -8, -0.6, { title: "Sparrow of the Quiet Hands", doing: "practising a coin walk across his knuckles", y: y, wander: 2 });
gldRoom({ x0: -20, z0: -21, x1: -10, z1: -5, y: y, h: 3.6, floor: fl, wall: dbr, ceil: gldMat(0x4A3028, "wood"), beams: true, beamMat: gldW("dark"), name: "the practice room", doors: { e: [{ at: -13, w: 1.8, h: 2.5 }], n: [{ at: -15, w: 1.6, h: 2.5 }] } });
gldLockBoard(-15, y, -6.2, Math.PI);
gldStation("locks", -15, -7.8, y, "the lock boards", "in the practice room, west of the Counting Cellar");
gldBellDummy(-16, y, -15, 0.4);
gldBellDummy(-13.4, y, -17.6, -0.6);
gldStation("dummy", -15.3, -13.8, y, "the bell dummy", "in the practice room");
for (var d = 0; d < 3; d++) {
var df = gldPiece(-19.4, y, -9 - d * 3, Math.PI / 2);
gldBox(1.2, 2.3, 0.1, bd, 0, 1.15, 0, df);
gldBox(1.4, 0.12, 0.2, gldW("dark"), 0, 2.36, 0, df);
[-1, 1].forEach(function (s) { gldBox(0.12, 2.4, 0.2, gldW("dark"), s * 0.66, 1.2, 0, df); });
gldBox(0.12, 0.16, 0.06, GLD_BRASS(), 0.4, 1.0, 0.07, df);
gldSolidIn(df, 0, 0, 0.75, 0.15, 2.4);
}
gldLantern(-15, y + 2.5, -11, 0xFFB050, 0.3);
gldPerson(G, "thf_3", -12.6, -12, Math.PI / 2, { title: "Shadow of the Quiet Hands", doing: "timing a Sparrow at the lock boards", y: y, wander: 1.5 });
gldRoom({ x0: -20, z0: -31, x1: -10, z1: -21, y: y, h: 3.2, floor: fl, wall: dbr, ceil: gldMat(0x4A3028, "wood"), name: "the bunks", doors: { s: [{ at: -15, w: 1.6, h: 2.5 }] } });
[[-19, -28.6], [-19, -25.6], [-11, -28.6], [-11, -25.6]].forEach(function (p, i) { gldBed(p[0], y, p[1], i < 2 ? Math.PI / 2 : -Math.PI / 2, { col: [0x4A3A2A, 0x3A4A3A, 0x5A3A3A, 0x3A3A5A][i] }); gldChest(p[0] + (i < 2 ? 1.4 : -1.4), y, p[1] + 1.3, i < 2 ? Math.PI / 2 : -Math.PI / 2, 0x3A2414); });
gldLantern(-15, y + 2.3, -27, 0xFFB050, 0.2);
gldRoom({ x0: 10, z0: -21, x1: 20, z1: -13, y: y, h: 3.4, floor: gldMat(0x4A3020, "wood"), wall: br, ceil: gldMat(0x3A2614, "wood"), beams: true, beamMat: gldW("dark"), name: "the fence's shop", doors: { w: [{ at: -17, w: 1.8, h: 2.5 }] } });
gldCounter(15, y, -17, Math.PI / 2, 4.4, { wood: "dark" });
gldStation("fence", 13.6, -17, y, "the fence's counter", "in the fence's shop, east of the Counting Cellar");
gldShelves(19.4, y, -17, -Math.PI / 2, 6, 2.6, "bottles", { seed: 13 });
gldShelves(15, y, -20.4, 0, 4, 2.4, "pots", { seed: 12 });
var cl = gldPiece(17.6, y, -14.0, Math.PI);
gldBox(0.5, 1.9, 0.4, gldW("dark"), 0, 0.95, 0, cl);
gldCyl(0.16, 0.04, GLD_BRASS(), 0, 1.5, 0.21, cl, 18).rotation.x = Math.PI / 2;
gldSolidIn(cl, 0, 0, 0.3, 0.25, 1.9);
gldPerson(G, "fence", 16.8, -17, -Math.PI / 2, { name: "Tilda Garrow", sex: "f", age: 57, title: "the fence of the Quiet Hands", doing: "looking at a silver spoon through a glass", y: y });
gldLantern(15, y + 2.5, -17, 0xFFC070, 0.2);
gldRoom({ x0: 10, z0: -13, x1: 20, z1: -5, y: y, h: 3.4, floor: fl, wall: dbr, ceil: gldMat(0x4A3028, "wood"), name: "the map room", doors: { w: [{ at: -9, w: 1.8, h: 2.5 }] } });
gldGate(G, "z", -9, 10.35, y, 1.8, 3, "The map room");
gldPlane(6.4, 2.6, gldCanvasMat("citymap", 256, 128, function (x, W, H) {
x.fillStyle = "#E0D0A8";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#5A3A1A";
var cx = W / 2, cy = H / 2 + 4;
for (var r = 1; r <= 8; r++) {
x.lineWidth = r === 4 ? 2 : 1;
x.beginPath();
x.ellipse(cx, cy, r * 15, r * 7, 0, 0, 6.3);
x.stroke();
}
for (var a = 0; a < 8; a++) {
x.beginPath();
x.moveTo(cx, cy);
x.lineTo(cx + Math.cos(a * 0.785 + 0.19) * 122, cy + Math.sin(a * 0.785 + 0.19) * 58);
x.stroke();
}
x.fillStyle = "#A82A1A";
for (var p = 0; p < 14; p++) {
var aa = p * 1.7, rr = 20 + (p * 23) % 100;
x.beginPath();
x.arc(cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr * 0.47, 2.5, 0, 6.3);
x.fill();
}
}), 19.6, y + 1.8, -9, -Math.PI / 2);
gldMapTable(14.6, y, -9, 0, 2.2, 1.4, "warrens");
gldChair(14.6, y, -7.8, Math.PI, { wood: "dark" });
gldLantern(14.6, y + 2.4, -9, 0xFFC070, 0.2);
gldRoom({ x0: -10, z0: -31, x1: 10, z1: -21, y: y, h: 3.4, floor: gldMat(0x4A2A18, "wood"), wall: gldMat(0x5A3A2A, "plaster"), ceil: gldMat(0x3A2614, "wood"), beams: true, beamMat: gldW("dark"), name: "the Uncle's rooms", doors: { s: [{ at: 0, w: 1.8, h: 2.5 }] } });
gldGate(G, "x", 0, -20.65, y, 1.8, 4, "The Uncle's rooms");
gldDesk(-4, y, -28, 0, { lamp: true, coin: true });
gldChair(-4, y, -27, Math.PI, { cushion: 0x3A2A1A });
gldBookcase(-9.4, y, -26, Math.PI / 2, 2.4, 2.6);
gldFireplace(0, y, -30.6, 0, { candles: true, mat: dbr });
gldBed(6.6, y, -28.4, 0, { col: 0x3A2A3A, curtain: 0x2A1A2A });
gldChest(4.4, y, -30.1, 0, 0x3A2414);
[[3, -24], [-2.6, -24.6]].forEach(function (p, i) { gldChair(p[0], y, p[1], i ? 0.6 : -0.6, { cushion: 0x5A1A1A }); });
gldRug(0, y, -26, 0, 6, 4, 0x3A1A14, 0x8A6A3A, 0x1A140E);
gldCase(8.8, y, -22.4, Math.PI, 1.4, function (g) { gldBox(0.3, 0.4, 0.2, gldMat(0x6A4A2A, "wood"), -0.3, 0.95, 0, g); gldSph(0.06, gldMat(0xE8E8F8, null, { phong: 120, spec: 0xFFFFFF }), 0.3, 0.88, 0, g, 8); });
return { front: { x: 0.6, z: 8.6, yaw: 0 }, in: { x: 0, z: -7, y: y, yaw: 0 }, master: { x: 2.35, z: -16, y: y, yaw: 0 }, practice: { x: -12.6, z: -14, y: y, yaw: -Math.PI / 2 } };
},
function (G) {
var y = -6, st = gldMat(0x4E4858, "stone"), dst = gldMat(0x302C38, "stone", { phong: 20 }), bl = gldMat(0x14121A, "marble", { phong: 70 }), vio = 0xC890FF, amb = 0xFFB050, silk = 0x3A1A3A;
function hidden() { return gldOk18(G) ? "" : "A great loom, warped with black silk. A fine piece of work, and nothing more."; }
function drape(x, yy, z, ry, w, h, col) { var g = gldPiece(x, yy, z, ry); for (var i = 0; i < Math.round(w / 0.5); i++) {
var f = gldBox(0.52, h, 0.04, gldCloth(col || silk, 0x0A0410, 0), -w / 2 + 0.26 + i * 0.5, h / 2, (i % 2) * 0.08, g);
f.rotation.y = (i % 2 ? 0.18 : -0.18);
} gldBox(w + 0.2, 0.08, 0.08, GLD_BRASS(), 0, h + 0.04, 0.04, g); return g; }
function brazier(x, z, yy, col) {
var g = gldPiece(x, yy, z, 0);
for (var i = 0; i < 3; i++) {
var a = i / 3 * 6.283, l = gldCyl(0.03, 1.0, GLD_IRON(), Math.cos(a) * 0.22, 0.5, Math.sin(a) * 0.22, g, 5);
l.rotation.z = Math.cos(a) * 0.25;
l.rotation.x = -Math.sin(a) * 0.25;
}
gldCyl(0.42, 0.24, gldMat(0x1A1818, "metal"), 0, 1.05, 0, g, 14, 0.26);
gldFlame(0, 1.15, 0, 3.4, col, g);
gldRoundIn(g, 0.45, 1.3);
}
gldRoom({ x0: -4, z0: 2, x1: 4, z1: 10, h: 3.4, floor: gldMat(0x4A3428, "wood"), wall: gldMat(0x8A7A6A, "plaster"), ceil: gldMat(0x3A2A20, "wood"), beams: true, beamMat: gldW("dark"), name: "the silk-weaver's shop",
doors: { s: [{ at: 2.6, w: 1.3, h: 2.5 }], n: [{ at: -0.5, w: 2.4, h: 2.6, bare: true }] } });
gldSecret({ id: "loom", kind: "loom", dir: "x", at: -0.5, c: 2.3, face: 1, w: 2.4, h: 2.6, name: "The great loom", hint: "The great loom on the back wall", when: hidden });
gldLoom(-2.6, 0, 6.8, Math.PI / 2, 0x4A1A3A);
gldCounter(1.8, 0, 6.6, -Math.PI / 2, 2.6, { wood: "dark" });
gldShelves(3.4, 0, 3.6, -Math.PI / 2, 2.2, 2.2, "bolts", { seed: 21 });
for (var i = 0; i < 4; i++) {
var bo = gldCyl(0.1, 0.6, gldCloth([0x4A1A3A, 0xA88AC8, 0x1A1A2A, 0xD8C8E8][i], 0x101010, 0), 1.6, 1.12, 5.9 + i * 0.4, null, 10);
bo.rotation.z = Math.PI / 2;
}
gldLantern(0, 2.6, 6, 0xFFD0B0, 0.4);
gldWeb(-3.6, 2.9, 2.7, Math.PI / 4, 0.6, 0.2);
gldPerson(G, "moth", 1.0, 6.6, Math.PI / 2, { name: "Agatha Moth", sex: "f", age: 71, title: "the silk-weaver", outsider: "her own silk shop in the High Ring", doing: "measuring a length of violet silk for a customer" });
gldExit(G, 2.6, 9.2, 0, "The door, out to the lane");
gldRoom({ x0: -2, z0: -8, x1: 1, z1: 2, y: y, h: 10, floor: dst, wall: st, name: "the stair down", doors: { s: [{ at: -0.5, w: 2.4, h: 2.6, sill: 6, bare: true }], n: [{ at: -0.5, w: 1.8, h: 2.6 }] } });
gldStair("z", 1.3, -7.3, -1.5, 0.5, 0, y, gldMat(0x2A2630, "stone"));
gldSolid(-0.5, 1.55, 1.2, 0.2, y, 5.85);
gldLantern(0.4, -2.6, -3, vio, 0.3);
gldWeb(-1.4, -1.0, -2, Math.PI / 2, 0.8, 0.3);
gldRoom({ x0: -12, z0: -26, x1: 12, z1: -8, y: y, h: 7, floor: bl, wall: st, ceil: dst, name: "the Web Gallery",
doors: { s: [{ at: -0.5, w: 1.8, h: 2.6 }], w: [{ at: -17, w: 2, h: 2.8 }], e: [{ at: -14, w: 2, h: 2.8 }, { at: -23, w: 2, h: 2.8 }], n: [{ at: 4, w: 2, h: 2.8 }] } });
var fw = gldPlane(14, 14, gldCanvasMat("floorweb", 256, 256, function (c, W, H) {
c.fillStyle = "#0E0C12";
c.fillRect(0, 0, W, H);
c.strokeStyle = "#5A4E6A";
c.lineWidth = 1.4;
var cx = W / 2, cy = H / 2;
for (var i = 0; i < 16; i++) {
var a = i / 16 * 6.283;
c.beginPath();
c.moveTo(cx, cy);
c.lineTo(cx + Math.cos(a) * 128, cy + Math.sin(a) * 128);
c.stroke();
}
for (var r = 10; r < 128; r += 11) {
c.beginPath();
for (var k = 0; k <= 16; k++) {
var a2 = k / 16 * 6.283;
var px = cx + Math.cos(a2) * r, py = cy + Math.sin(a2) * r;
if (!k)
c.moveTo(px, py);
else
c.lineTo(px, py);
}
c.stroke();
}
c.fillStyle = "#6A3A8A";
c.beginPath();
c.arc(cx, cy, 8, 0, 6.3);
c.fill();
}), 0, y + 0.02, -17, 0);
fw.rotation.x = -Math.PI / 2;
[[-8, -12, 0.4, 4], [8, -12, -0.4, 4], [-8, -23, -0.5, 3.6], [8, -23, 0.5, 3.6], [0, -17, 0, 5.5]].forEach(function (q, i) { if (i === 4)
gldWeb(q[0], y + 6.7, q[1], 0, q[3], Math.PI / 2);
else
gldWeb(q[0], y + 5.4, q[1], q[2], q[3], 0.9); });
[-4, 3].forEach(function (x) { var pl = gldPiece(x, y, -10, 0); gldBox(1.6, 0.9, 1.6, dst, 0, 0.45, 0, pl); var sp = gldSpider(1.4, 0x16141C, vio, pl); sp.position.y = 0.9; sp.rotation.y = Math.PI; gldSolidIn(pl, 0, 0, 0.9, 0.9, 2.2); });
[-11.6, 11.6].forEach(function (x, i) { for (var z = -23; z <= -11; z += 6) {
drape(x, y, z, i ? -Math.PI / 2 : Math.PI / 2, 2.6, 5.4, [silk, 0x1A0A1A, 0x2A1A3A][Math.abs(z) % 3]);
} });
gldBanner(-6, y + 3.0, -25.6, 0, 1.4, 3, 0x14101A, vio, "spider");
gldBanner(-2, y + 3.0, -25.6, 0, 1.4, 3, 0x14101A, vio, "spider");
brazier(-9, -20, y, vio);
brazier(9, -20, y, amb);
brazier(-9, -13, y, amb);
brazier(9, -13, y, vio);
gldDais(-9, -25.7, -1, -22.6, 0.5, bl);
gldThrone(-5, y + 0.5, -24.8, 0, { mat: gldMat(0x0E0C12, "wood", { phong: 60 }), col: 0x2A0A2A, trim: 0x8A7AA0 });
gldTable(3.6, y, -17, 0, 1.4, 6, { mat: gldMat(0x0E0C12, "wood", { phong: 60 }) });
gldBox(1.5, 0.02, 6.1, gldCloth(0x1A0A1A, 0x3A1A3A, 0x8A7AA0), 3.6, y + 0.79, -17);
[-19, -17, -15].forEach(function (z) { gldCandle(3.6, y + 0.8, z, 1.4); });
[[2.4, -19], [4.8, -15]].forEach(function (p, i) { gldChair(p[0], y, p[1], i ? -Math.PI / 2 : Math.PI / 2, { wood: "black", cushion: 0x2A0A2A }); });
for (var lx = -8; lx <= 8; lx += 8)
gldLantern(lx, y + 4.6, -17, lx ? amb : vio, 1.0);
var M = G.master;
gldPerson(G, "master", -3.2, -23.6, 0, { name: M.name, sex: M.sex, age: M.age, title: M.title, look: M.look, master: true, doing: "stroking Needle, the little black spider on her shoulder, and watching the door", y: y + 0.5 });
if (GLK.people.length) {
var Mp = GLK.people[GLK.people.length - 1];
if (Mp.g) {
var nd = gldSpider(0.12, 0x0A0A0E, vio);
nd.position.set(0.2, 1.5, 0);
Mp.g.add(nd);
}
}
gldRollBook(G, -7.4, -22.8, y + 0.5, 0.3);
gldNoticeBoard(G, -6.6, -8.55, y, Math.PI, 0x8A3AA8);
gldPerson(G, "spd_1", 6, -12, -0.7, { title: "Fang of the Spider Guild", sex: "f", doing: "oiling a slim black blade", y: y, wander: 3 });
gldPerson(G, "spd_2", -6, -15, 0.8, { title: "Silkwalker of the Spider Guild", doing: "winding fine black cord on a spool", y: y, wander: 2.5 });
gldRoom({ x0: -28, z0: -24, x1: -12, z1: -10, y: y, h: 4.4, floor: dst, wall: st, ceil: dst, name: "the dart gallery", doors: { e: [{ at: -17, w: 2, h: 2.8 }] } });
[-21, -18.8, -15.2, -13].forEach(function (z) { gldTarget(-27.2, y, z, Math.PI / 2); });
gldBox(0.1, 0.02, 13, gldMat(0x8A7AA0, null), -17, y + 0.015, -17);
gldStation("darts", -16, -17, y, "the throwing line", "in the dart gallery, west of the Web Gallery");
var dr = gldPiece(-13.2, y, -11, Math.PI);
gldBox(1.6, 1.0, 0.3, gldW("black"), 0, 1.2, 0, dr);
for (var d = 0; d < 12; d++) {
var dt = gldCyl(0.008, 0.2, GLD_IRON(), -0.7 + d * 0.13, 1.4, 0.12, dr, 4);
}
gldSolidIn(dr, 0, 0, 0.8, 0.2, 1.8);
[[-24, -11], [-20, -23]].forEach(function (p) { var dm = gldPiece(p[0], y, p[1], 0); gldCyl(0.03, 2.4, gldW("black"), 0, 1.2, 0, dm, 6); var bd = gldCyl(0.2, 0.8, gldCloth(0x2A1A2A, 0x0A0410, 0), 0, 1.6, 0, dm, 10, 0.24); gldSph(0.13, gldCloth(0x2A1A2A, 0x0A0410, 0), 0, 2.15, 0, dm, 10); gldRoundIn(dm, 0.3, 2.3); });
gldLantern(-20, y + 3.4, -17, amb, 0.5);
gldWeb(-27.5, y + 3.6, -23.5, Math.PI / 4, 0.9, 0.3);
gldRoom({ x0: 12, z0: -20, x1: 26, z1: -8, y: y, h: 4.4, floor: gldMat(0x1A1A16, "stone"), wall: gldMat(0x1E2A22, "stone"), ceil: dst, name: "the venom garden", doors: { w: [{ at: -14, w: 2, h: 2.8 }] } });
gldGate(G, "z", -14, 12.35, y, 2, 2, "The venom garden");
[["spider", "Black widow", { mark: 0xC8203A }], ["scorpion", "Deathstalker", { col: 0xC8A848 }], ["snake", "Saw-scaled viper", { col: 0x8A6A3A, band: 0x3A2A1A }], ["spider", "Funnel-web", { col: 0x2A2028, mark: 0 }], ["snake", "Banded krait", { col: 0x1A1A1A, band: 0xE8D040 }], ["scorpion", "Emperor scorpion", { col: 0x101418 }]].forEach(function (q, i) {
var o = q[2];
o.label = q[1];
var x = i < 3 ? 13.4 : 24.6, z = -18.4 + (i % 3) * 3.6;
gldTerrarium(x, y, z, i < 3 ? Math.PI / 2 : -Math.PI / 2, q[0], o);
});
gldPoisonBed(19, y, -16.6, 0, 5);
gldPoisonBed(19, y, -11.6, 0, 5);
gldTable(19, y, -9.2, 0, 2, 0.7, { wood: "black" });
[-0.5, 0.4].forEach(function (dx) { gldBox(0.12, 0.03, 0.3, gldMat(0x2A4A2A, null), 19 + dx, y + 0.8, -9.2); });
gldLantern(16, y + 3.4, -14, 0x9AE0B0, 0.4);
gldLantern(22, y + 3.4, -14, 0x9AE0B0, 0.4);
gldStation("garden", 19, -14.1, y, "the venom garden's beds and cases", "in the venom garden (Silkwalkers and above)");
gldPerson(G, "spd_3", 21.6, -14, Math.PI / 2, { title: "Venom keeper of the Spider Guild", doing: "feeding the funnel-web with long tongs", y: y });
gldRoom({ x0: 12, z0: -32, x1: 26, z1: -20, y: y, h: 6, floor: gldMat(0x0A0A0C, "stone"), wall: st, ceil: dst, name: "the silk beam", doors: { w: [{ at: -23, w: 2, h: 2.8 }] } });
var hi = y + 1.4;
gldStair("x", 13.0, 15.5, -24.2, -21.8, y, hi, dst);
gldFloor(15.5, -28, 16.6, -21, hi);
gldBox(1.1, 1.4, 7, dst, 16.05, y + 0.7, -24.5);
gldSolid(16.05, -24.5, 0.55, 3.5, y, 1.35);
gldFloor(16.6, -26.25, 22.6, -25.75, hi);
gldBox(6.0, 0.12, 0.5, gldW("black"), 19.6, hi - 0.06, -26);
gldFloor(22.6, -28, 24.6, -24, hi);
gldBox(2, 1.4, 4, dst, 23.6, y + 0.7, -26);
gldSolid(23.6, -26, 1.0, 2.0, y, 1.35);
var net = gldPlane(6, 5, gldWebMat(), 19.6, y + 0.15, -26, 0);
net.rotation.x = -Math.PI / 2;
gldStation("beam", 19.6, -26, hi, "the silk beam", "in the silk beam room, off the Web Gallery", 1.2);
gldLantern(19.6, y + 4.6, -26, vio, 0.4);
gldLantern(14, y + 4.2, -30.5, amb, 0.4);
gldLantern(25, y + 4.2, -21.5, amb, 0.4);
brazier(13.4, -21, y, amb);
brazier(25, -31, y, vio);
gldWeb(25.4, y + 4, -31.5, -Math.PI / 4, 1.2, 0.2);
gldRoom({ x0: -8, z0: -38, x1: 8, z1: -26, y: y, h: 6, floor: bl, wall: st, ceil: dst, name: "the Matron's inner hall", doors: { s: [{ at: 4, w: 2, h: 2.8 }], w: [{ at: -32, w: 2, h: 2.8 }], e: [{ at: -35, w: 1.8, h: 2.6 }] } });
gldGate(G, "x", 4, -25.65, y, 2, 4, "The Matron's inner hall");
[-7.6, 7.6].forEach(function (x, i) { drape(x, y, -32, i ? -Math.PI / 2 : Math.PI / 2, 8, 5.2, i ? 0x2A0A2A : silk); });
gldDais(-4, -37.7, 4, -34.4, 0.7, bl);
gldThrone(0, y + 0.7, -36.8, 0, { mat: gldMat(0x0E0C12, "wood", { phong: 60 }), col: 0x3A0A3A, trim: 0x8A7AA0 });
gldBox(6, 4.2, 0.05, gldGlowM(0x2A1040), 0, y + 3.0, -37.6);
gldWeb(0, y + 3.0, -37.5, 0, 2.2, 0);
gldTerrarium(-5.6, y, -36.6, 0, "spider", { label: "Needle's kin", mark: vio });
gldDesk(4.6, y, -30, Math.PI / 2, { lamp: true, coin: false });
gldChair(3.8, y, -30, Math.PI / 2, { wood: "black", cushion: 0x3A0A3A });
gldRug(0, y, -31, 0, 6, 6, 0x1A0A1A, 0x8A7AA0, 0x3A0A3A);
brazier(-3.5, -29, y, vio);
brazier(3.5, -33, y, amb);
brazier(-6.6, -36.6, y, amb);
brazier(6.6, -36.6, y, vio);
gldLantern(0, y + 5, -31, amb, 0.6);
gldRoom({ x0: -22, z0: -38, x1: -8, z1: -26, y: y, h: 5, floor: dst, wall: st, ceil: dst, name: "the trophy hall", doors: { e: [{ at: -32, w: 2, h: 2.8 }] } });
for (var t = 0; t < 6; t++) {
gldTrophy(-20 + t * 2.2, y + 2.6, -37.6, 0, 1.1 + (t % 3) * 0.25, t % 2 === 0);
gldTrophy(-20 + t * 2.2, y + 2.6, -26.4, Math.PI, 1.0 + (t % 2) * 0.3, t % 3 === 0);
}
gldRack(-21.4, y, -32, Math.PI / 2, 4, "weapons");
gldBench(-15, y, -32, 0, 4);
gldLantern(-15, y + 3.6, -32, amb, 0.3);
gldPlane(3.2, 1.2, gldCanvasMat("marks", 192, 72, function (x, W, H) { x.fillStyle = "#120E16"; x.fillRect(0, 0, W, H); x.strokeStyle = "#8A7AA0"; x.lineWidth = 3; x.strokeRect(2, 2, W - 4, H - 4); x.fillStyle = "#D8C8E8"; x.font = "bold 13px Georgia"; x.textAlign = "center"; x.fillText("PATIENCE · PRECISION · SILENCE", W / 2, 42); }), -8.6, y + 3.4, -32, -Math.PI / 2);
gldRoom({ x0: 8, z0: -44, x1: 20, z1: -32, y: y, h: 3.6, floor: dst, wall: st, ceil: dst, name: "the members' cells", doors: { w: [{ at: -35, w: 1.8, h: 2.6 }] } });
[[10.4, -42], [13.8, -42], [17.2, -42], [17.2, -35.4]].forEach(function (p, i) { gldBed(p[0], y, p[1], i < 3 ? 0 : -Math.PI / 2, { wood: "black", col: 0x1A0A1A, curtain: [0x2A0A2A, 0x1A1020, 0x3A1A3A, 0x2A0A2A][i], border: 0x8A7AA0 }); });
gldChest(11.8, y, -33.2, Math.PI, 0x14101A);
gldLantern(14, y + 2.8, -38, vio, 0.2);
return { front: { x: 2.6, z: 8.6, yaw: 0 }, in: { x: -0.5, z: -11, y: y, yaw: 0 }, master: { x: -3, z: -19.5, y: y, yaw: 0 }, garden: { x: 15, z: -14, y: y, yaw: -Math.PI / 2 }, beam: { x: 15, z: -23, y: y, yaw: -Math.PI / 2 } };
},
function (x0, x1, y, z, n) {
var cols = [0x6A8A4A, 0x8A9A5A, 0x5A7A3A, 0x9A8AA8, 0xC8B85A, 0x7A9A6A];
for (var i = 0; i < n; i++) {
var x = x0 + (x1 - x0) * (i + 0.5) / n, g = gldPiece(x, y, z, i * 0.7);
gldBox(0.01, 0.3, 0.01, gldMat(0xC8B890, null), 0, -0.15, 0, g);
var b = gldCyl(0.09, 0.42, gldMat(cols[i % cols.length], "foliage"), 0, -0.5, 0, g, 6, 0.02);
b.rotation.x = Math.PI;
}
},
function (x, y, z, ry) {
var g = gldPiece(x, y, z, ry), cu = gldMat(0xB8703A, "metal", { phong: 80 }), br = gldMat(0x5A3A2A, "brick");
gldBox(1.0, 0.7, 1.0, br, 0, 0.35, 0, g);
gldBox(0.4, 0.25, 0.06, gldGlowM(0xFF8A3A, 0.7), 0, 0.3, 0.51, g);
gldFlame(0, 0.25, 0.3, 0.8, 0xFF9A40, g);
gldSph(0.42, cu, 0, 1.05, 0, g, 14);
gldCyl(0.12, 0.4, cu, 0, 1.55, 0, g, 10, 0.18);
var nk = gldCyl(0.05, 1.2, cu, 0.45, 1.85, 0, g, 8);
nk.rotation.z = -1.1;
gldCyl(0.28, 0.8, gldMat(0x6A4A2A, "wood"), 1.05, 0.4, 0, g, 12);
gldCyl(0.07, 0.28, gldMat(0x9AB8A8, null, { op: 0.6 }), 1.05, 0.94, 0.38, g, 8);
gldSolidIn(g, 0.4, 0, 1.0, 0.55, 1.4);
return g;
},
function (G) {
var wl = gldMat(0xE0D8C8, "plaster"), fl = gldMat(0xB8A890, "floortile"), wd = gldMat(0x7A5A3A, "wood"), st = gldMat(0x9A9080, "stone"), green = 0x4A6A3A, cream = 0xE8E0C8;
gldRoom({ x0: -5, z0: 4, x1: 5, z1: 10, h: 4.2, floor: fl, wall: wl, ceil: gldMat(0xF0E8D8, "plaster"), beams: true, beamMat: gldW("oak"), name: "the entrance",
doors: { s: [{ at: 0, w: 2.6, h: 3.2 }], n: [{ at: 0, w: 3, h: 3.2 }] } });
gldSign(["THE HEALERS AND HERBALISTS", "rest · water · a kind word"], 3.8, 0.8, "#2A3A22", "#F0E8C8", 0, 3.4, 4.62, 0);
gldCounter(-3.0, 0, 7.2, Math.PI / 2, 3.0, { wood: "oak" });
gldShelves(-4.4, 0, 7.2, Math.PI / 2, 3.0, 2.4, "jars", { seed: 31 });
gldBench(3.8, 0, 7, Math.PI / 2, 2.4);
gldRug(0, 0, 7, 0, 2.2, 4, green, cream, 0x6A4A2A);
gldLantern(0, 3.4, 7, 0xFFF0D0, 0.4);
gldPerson(G, "hea_door", -3.4, 8.6, Math.PI / 2, { title: "apothecary's apprentice", sex: "f", doing: "wrapping a jar of salve for a customer", wander: 0 });
gldExit(G, 0, 9.2, 0, "The door, out to the Civic Ring");
gldRoom({ x0: -12, z0: -10, x1: 12, z1: 4, h: 6, floor: wd, wall: wl, ceil: gldMat(0xF0E8D8, "plaster"), beams: true, beamMat: gldW("oak"), name: "the Healers' hall",
doors: { s: [{ at: 0, w: 3, h: 3.2 }], w: [{ at: -3, w: 2.2, h: 3 }], e: [{ at: -3, w: 2.2, h: 3 }], n: [{ at: 0, w: 2.6, h: 3.2 }].concat(gldWins([gldWin("x", -7, -9.7, 0, 1.6, 2.4, 1.2, -1), gldWin("x", 7, -9.7, 0, 1.6, 2.4, 1.2, -1)])) } });
for (var bx = -10.4; bx <= 10.5; bx += 2.4)
gldHerbBunches(bx - 0.9, bx + 0.9, 5.6, -1.5, 4);
gldTable(0, 0, -3, 0, 7, 1.3, { wood: "oak" });
for (var c = 0; c < 5; c++) {
gldChair(-2.8 + c * 1.4, 0, -1.9, Math.PI, { cushion: green });
gldChair(-2.8 + c * 1.4, 0, -4.1, 0, { cushion: green });
}
for (var j = 0; j < 6; j++) {
var jr = gldCyl(0.1, 0.22, gldMat([0x9AB8A8, 0xC8A86A, 0x6A8A5A][j % 3], null, { op: 0.75 }), -2.5 + j, 0.89, -3, null, 8);
}
gldShelves(-11.4, 0, -7, Math.PI / 2, 3.4, 2.6, "jars", { seed: 32 });
gldShelves(11.4, 0, 1.4, -Math.PI / 2, 3.0, 2.6, "bottles", { seed: 33 });
gldFireplace(11.6, 0, -7, -Math.PI / 2, { candles: true, mat: st });
gldBanner(-6, 3.2, -9.6, 0, 1.6, 2.4, green, cream, "herb");
gldBanner(6, 3.2, -9.6, 0, 1.6, 2.4, green, cream, "herb");
gldPainting(-11.45, 3.6, 1.2, Math.PI / 2, 1.4, 1.8, "hea_p1", "portrait");
gldPainting(-3, 4.2, 3.45, Math.PI, 1.6, 1.2, "hea_p2", "land");
gldChandelier(0, 4.6, -3, 1.4, 10);
gldThrone(-9, 0, -8.6, Math.PI / 4, { mat: gldW("oak"), col: green, trim: 0xC8A040 });
var M = G.master;
gldPerson(G, "master", -7.6, -7.6, Math.PI / 4, { name: M.name, sex: M.sex, age: M.age, title: M.title, look: M.look, master: true, doing: "sorting a basket of fresh-cut feverfew" });
gldRollBook(G, -6.0, -9.0, 0, 0.2);
gldNoticeBoard(G, 5.5, 3.55, 0, Math.PI, green);
gldPerson(G, "hea_1", 3, -6, 0.4, { title: "nurse", sex: "f", doing: "rolling clean bandages", wander: 3 });
gldPerson(G, "hea_2", -3, 0.5, -0.6, { title: "herbalist", doing: "labelling jars of dried leaf", wander: 3 });
gldRoom({ x0: -22, z0: -10, x1: -12, z1: 4, h: 4.6, floor: fl, wall: wl, ceil: gldMat(0xD8D0C0, "plaster"), beams: true, beamMat: gldW("oak"), name: "the still room", doors: { e: [{ at: -3, w: 2.2, h: 3 }] } });
gldStill(-19.5, 0, -7.4, 0);
gldStation("still", -17, -6.4, 0, "the still", "in the still room, west of the Healers' hall");
gldWorkbench(-21.2, 0, -2, Math.PI / 2, { tools: false });
gldShelves(-17, 0, 3.4, Math.PI, 4, 2.4, "jars", { seed: 34 });
gldShelves(-21.4, 0, 1.6, Math.PI / 2, 2.2, 2.2, "bottles", { seed: 35 });
for (var m = 0; m < 3; m++) {
var mt = gldPiece(-21.1, 0.86, -3.4 + m * 0.6, 0);
gldCyl(0.14, 0.16, st, 0, 0.08, 0, mt, 10, 0.1);
gldCyl(0.025, 0.28, gldMat(0x8A7A6A, null), 0.04, 0.24, 0, mt, 6).rotation.z = 0.4;
}
gldHerbBunches(-21, -13, 4.1, -1, 6);
gldLantern(-17, 3.6, -3, 0xFFE8C0, 0.3);
gldPerson(G, "hea_still", -18.6, -5.6, Math.PI, { title: "stillroom maid", sex: "f", doing: "watching the still drip, a jar in her hand", wander: 1 });
gldRoom({ x0: 12, z0: -10, x1: 24, z1: 4, h: 5, floor: fl, wall: wl, ceil: gldMat(0xF0E8D8, "plaster"), name: "the infirmary", doors: { w: [{ at: -3, w: 2.2, h: 3 }], e: gldWins([gldWin("z", -7, 23.7, 0, 1.4, 2.2, 1.1, 1), gldWin("z", 1, 23.7, 0, 1.4, 2.2, 1.1, 1)]) } });
gldGate(G, "z", -3, 12.35, 0, 2.2, 2, "The infirmary");
[-8.2, -5, 1.2].forEach(function (z, i) { gldBed(22.4, 0, z, -Math.PI / 2, { wood: "pale", col: 0xF0EEE8, border: green }); gldBed(14.2, 0, z + 0.4, Math.PI / 2, { wood: "pale", col: 0xF0EEE8, border: green }); });
for (var sc = 0; sc < 2; sc++) {
var scr = gldPiece(22, 0, -6.6 + sc * 4, 0);
gldBox(1.6, 1.7, 0.04, gldCloth(cream, 0xB8B0A0, 0), 0, 1.0, 0, scr);
gldBox(1.7, 0.04, 0.06, gldW("pale"), 0, 1.86, 0, scr);
}
gldTable(18, 0, -1.8, 0, 1.4, 0.7, { wood: "pale" });
gldStation("ward", 18, -3, 0, "the infirmary beds", "in the infirmary, east of the Healers' hall (Nurses and above)");
gldLantern(18, 3.8, -3, 0xFFF0D0, 0.4);
gldPerson(G, "hea_pat", 14.6, -4.6, Math.PI / 2, { title: "a dreamer resting", doing: "lying back, feeling much better", wander: 0 });
gldRoom({ x0: -12, z0: -28, x1: 12, z1: -10, h: 5, floor: gldMat(0x7A6A50, "paving"), wall: gldMat(0xB8A890, "brick"), ceil: null, name: "the physic garden",
doors: { s: [{ at: 0, w: 2.6, h: 3.2 }], e: [{ at: -17, w: 2.2, h: 3 }], w: [{ at: -17, w: 2.2, h: 3 }] } });
var sky = gldPlane(23.4, 17.4, gldWinMat(), 0, 5.3, -19, 0);
sky.rotation.x = Math.PI / 2;
[[-7, -14], [-7, -19.5], [-7, -25], [7, -14], [7, -19.5], [7, -25]].forEach(function (p, i) { gldHerbBed(p[0], 0, p[1], 0, 6, 2.8, i); });
var wl2 = gldPiece(0, 0, -19.5, 0);
gldCyl(1.0, 0.9, st, 0, 0.45, 0, wl2, 16);
gldCyl(0.8, 0.02, gldMat(0x2A4A5A, null, { phong: 90 }), 0, 0.85, 0, wl2, 16);
[-0.9, 0.9].forEach(function (x) { gldBox(0.12, 2, 0.12, gldW("dark"), x, 1.4, 0, wl2); });
gldBox(2, 0.12, 0.12, gldW("dark"), 0, 2.4, 0, wl2);
gldRoundIn(wl2, 1.05, 1);
var sd = gldPiece(0, 0, -25.8, 0);
gldCyl(0.25, 1.0, st, 0, 0.5, 0, sd, 10);
gldCyl(0.4, 0.04, GLD_BRASS(), 0, 1.02, 0, sd, 16);
gldBox(0.02, 0.25, 0.3, GLD_BRASS(), 0, 1.15, 0, sd);
gldRoundIn(sd, 0.4, 1.1);
gldBench(-11.2, 0, -19.5, Math.PI / 2, 2.4);
gldBench(11.2, 0, -19.5, -Math.PI / 2, 2.4);
for (var t = 0; t < 4; t++) {
var tr = gldPiece(t < 2 ? -10.6 : 10.6, 0, t % 2 ? -26.6 : -11.6, 0);
gldCyl(0.12, 1.6, gldMat(0x5A4030, "bark"), 0, 0.8, 0, tr, 7);
var cr = gldSph(0.9, gldMat(0x4A7A3A, "foliage"), 0, 2.2, 0, tr, 9);
cr.scale.y = 0.85;
gldRoundIn(tr, 0.2, 2);
}
gldSunPatch(0, 0, -19, 10, 8, 0xFFF0C8);
gldStation("garden", -3.4, -14, 0, "the herb beds", "in the physic garden, behind the Healers' hall");
gldPerson(G, "hea_gard", 3.6, -22.4, -0.5, { title: "gardener", doing: "cutting comfrey into a trug", wander: 3 });
gldRoom({ x0: 12, z0: -26, x1: 22, z1: -10, h: 4.4, floor: wd, wall: gldMat(0xC8C0A8, "plaster"), ceil: gldMat(0xD8D0C0, "plaster"), beams: true, beamMat: gldW("oak"), name: "the herbarium", doors: { w: [{ at: -17, w: 2.2, h: 3 }] } });
gldGate(G, "z", -17, 12.35, 0, 2.2, 3, "The herbarium");
[-24, -20.4, -13.6].forEach(function (z) { gldShelves(21.4, 0, z, -Math.PI / 2, 3, 2.6, "books", { seed: Math.round(-z) }); });
var pr = gldPiece(16, 0, -14, 0);
gldTable(0, 0, 0, 0, 2.2, 1.0, { wood: "dark", parent: pr });
gldBox(0.7, 0.3, 0.5, gldW("dark"), 0, 0.95, 0, pr);
gldCyl(0.03, 0.6, GLD_IRON(), 0, 1.3, 0, pr, 6);
gldBox(0.5, 0.04, 0.04, GLD_IRON(), 0, 1.6, 0, pr);
for (var hs = 0; hs < 4; hs++) {
gldBox(0.4, 0.005, 0.5, gldMat(0xEEE6D0, null), -0.8 + hs * 0.5 + (hs > 1 ? 0.3 : 0), 0.8, 0.1, pr);
}
gldStation("herbarium", 16, -15.4, 0, "the pressing table", "in the herbarium, off the physic garden (Herbalists and above)");
gldDesk(16, 0, -22, 0, { lamp: true });
gldChair(16, 0, -21.2, Math.PI, {});
gldLantern(16, 3.6, -18, 0xFFF0D0, 0.3);
gldRoom({ x0: -22, z0: -26, x1: -12, z1: -10, h: 4.4, floor: wd, wall: gldMat(0x5A6A4A, "plaster"), ceil: gldMat(0x4A3424, "wood"), beams: true, beamMat: gldW("dark"), name: "the Physician's study", doors: { e: [{ at: -17, w: 2.2, h: 3 }] } });
gldGate(G, "z", -17, -12.35, 0, 2.2, 4, "The Physician's study");
gldBookcase(-21.5, 0, -20, Math.PI / 2, 3, 2.8);
gldBookcase(-21.5, 0, -15, Math.PI / 2, 3, 2.8);
gldDesk(-17, 0, -24.4, 0, { lamp: true });
gldChair(-17, 0, -23.6, Math.PI, { cushion: green });
gldGlobe(-14, 0, -24);
gldRug(-17, 0, -18, 0, 4, 4, 0x3A4A2A, cream, 0x6A2A1A);
gldChair(-15, 0, -15, -0.6, { cushion: green });
gldChair(-19, 0, -15, 0.6, { cushion: green });
gldPainting(-17, 2.4, -10.55, Math.PI, 1.2, 1.5, "hea_p3", "portrait");
gldLantern(-17, 3.6, -18, 0xFFE8C0, 0.3);
return { front: { x: 0, z: 8.6, yaw: 0 }, in: { x: 0, z: 1, yaw: 0 }, master: { x: -4, z: -5, yaw: Math.PI / 4 + Math.PI }, garden: { x: 0, z: -12, yaw: 0 } };
},
function (x, y, z, ry, seed) {
var g = gldPiece(x, y, z, ry), wd = gldW("dark");
[[-0.5, -0.3], [0.5, -0.3], [-0.5, 0.3], [0.5, 0.3]].forEach(function (q) { gldBox(0.06, 0.8, 0.06, wd, q[0], 0.4, q[1], g); });
var top = gldBox(1.1, 0.05, 0.7, wd, 0, 0.92, 0, g);
top.rotation.x = -0.3;
var pg = gldBox(0.4, 0.01, 0.5, gldMat(0xEEE6D0, null), -0.2, 0.96, 0.02, g);
pg.rotation.x = -0.3;
var pg2 = gldBox(0.4, 0.01, 0.5, gldMat(0xE8DCC0, null), 0.25, 0.97, 0.02, g);
pg2.rotation.x = -0.3;
gldCyl(0.04, 0.06, gldMat(0x101018, null), 0.45, 0.86, -0.28, g, 8);
var q = gldBox(0.01, 0.3, 0.03, gldMat(0xEEEAE0, null), 0.46, 1.0, -0.28, g);
q.rotation.z = 0.3;
gldStool(0, y, 0.7, g);
gldSolidIn(g, 0, 0, 0.58, 0.38, 1.0);
return g;
},
function (G) {
var wl = gldMat(0x8A6A4A, "wood"), pl = gldMat(0xD8CCB0, "plaster"), fl = gldMat(0x5A3A20, "wood"), dk = gldMat(0x3A2614, "wood"), rd = 0x5A1A1A, gold = 0xC8A040;
gldRoom({ x0: -4, z0: 4, x1: 4, z1: 9, h: 4.2, floor: gldMat(0x2A2A30, "floortile"), wall: pl, ceil: pl, name: "the hall", doors: { s: [{ at: 0, w: 2.2, h: 3 }], n: [{ at: 0, w: 2.4, h: 3 }] } });
gldSign(["THE SCRIVENERS AND SCHOLARS", "the word kept is the world kept"], 3.2, 0.7, "#2A1A10", "#E8D8A8", 0, 3.3, 4.62, 0);
gldWainscot("z", 4.5, 8.5, -3.7, 0, 1.2, 1, dk);
gldWainscot("z", 4.5, 8.5, 3.7, 0, 1.2, -1, dk);
gldPainting(-3.45, 2.4, 6.5, Math.PI / 2, 1.0, 1.3, "scr_h1", "portrait");
gldPainting(3.45, 2.4, 6.5, -Math.PI / 2, 1.0, 1.3, "scr_h2", "land");
gldLantern(0, 3.4, 6.5, 0xFFE0A0, 0.4);
gldExit(G, 0, 8, 0, "The door, out to the High Ring");
gldRoom({ x0: -10, z0: -8, x1: 10, z1: 4, h: 7, floor: fl, wall: wl, ceil: gldMat(0x4A3020, "wood"), beams: true, beamMat: dk, name: "the reading room",
doors: { s: [{ at: 0, w: 2.4, h: 3 }], w: [{ at: -2, w: 2, h: 2.8 }], e: [{ at: -2, w: 2, h: 2.8 }], n: [{ at: 6, w: 2, h: 2.6, bare: true }] } });
[-7, -3, 3].forEach(function (x) { gldBookcase(x, 0, -7.5, 0, 3.4, 3.2); gldBookcase(x, 3.4, -7.5, 0, 3.4, 3.2); });
[-6, 2].forEach(function (z) { gldBookcase(-9.5, 0, z, Math.PI / 2, 3, 3.2); gldBookcase(9.5, 0, z, -Math.PI / 2, 3, 3.2); });
gldBox(19.2, 0.12, 0.12, GLD_BRASS(), 0, 3.5, -7.0);
gldBox(19.2, 0.2, 0.8, dk, 0, 3.3, -7.3);
gldSecret({ id: "stacks", kind: "bookcase", dir: "x", at: 6, c: -7.7, face: 1, w: 2, h: 2.6, name: "The tall bookcase", hint: "The tall bookcase in the corner",
when: function () { return gldRankHere(G.k) >= 4 ? "" : "A tall bookcase, crammed with dull law reports. It does not move for you."; } });
[-3.6, 3.6].forEach(function (x) {
gldTable(x, 0, -2.5, 0, 3.2, 1.2, { wood: "dark" });
[-1, 1].forEach(function (s) { gldChair(x - 0.9, 0, -2.5 + s * 0.9, s > 0 ? Math.PI : 0, { cushion: rd }); gldChair(x + 0.9, 0, -2.5 + s * 0.9, s > 0 ? Math.PI : 0, { cushion: rd }); });
[-0.9, 0.9].forEach(function (o) { var lp = gldPiece(x + o, 0.78, -2.5, 0); gldCyl(0.06, 0.3, GLD_BRASS(), 0, 0.15, 0, lp, 8); gldCyl(0.16, 0.12, gldGlowM(0x3A6A3A, 0.9), 0, 0.36, 0, lp, 10, 0.2); gldFlame(0, 0.28, 0, 0.4, 0xFFD890, lp); });
});
gldRug(0, 0, -2.5, 0, 12, 4, rd, gold, 0x1A1A2A);
gldGlobe(8, 0, 2.8);
gldChandelier(0, 5.4, -2.5, 1.4, 10);
gldDesk(-6.5, 0, 2.6, Math.PI, { lamp: true });
gldThrone(-6.5, 0, 1.6, 0, { mat: dk, col: rd, trim: gold });
var M = G.master;
gldPerson(G, "master", -5, 1.8, Math.PI, { name: M.name, sex: M.sex, age: M.age, title: M.title, look: M.look, master: true, doing: "turning the pages of a very old book with a bone folder" });
gldRollBook(G, -3, 3.2, 0, Math.PI + 0.2);
gldNoticeBoard(G, 4.5, 3.55, 0, Math.PI, 0x5A1A1A);
gldStation("reading", 3.6, -1.2, 0, "the reading tables", "in the reading room");
gldPerson(G, "scr_1", 3.6, -3.6, 0, { title: "reader", sex: "f", doing: "reading by the green lamp, a finger on the line", wander: 0 });
gldPerson(G, "scr_2", -7, -5.6, Math.PI, { title: "archivist", doing: "shelving books from a trolley", wander: 3 });
gldRoom({ x0: -20, z0: -8, x1: -10, z1: 4, h: 4.6, floor: fl, wall: pl, ceil: pl, beams: true, beamMat: dk, name: "the copying room",
doors: { e: [{ at: -2, w: 2, h: 2.8 }], w: gldWins([gldWin("z", -5, -19.7, 0, 1.4, 2, 1.0, -1), gldWin("z", 1, -19.7, 0, 1.4, 2, 1.0, -1)]) } });
[[-17.5, -5.5], [-14, -5.5], [-17.5, -1], [-14, -1], [-17.5, 2.4]].forEach(function (p, i) { gldCopyDesk(p[0], 0, p[1], Math.PI, "cd" + i); });
gldStation("copy", -14, -0.0, 0, "the copying desks", "in the copying room, west of the reading room");
gldShelves(-10.6, 0, -6.4, -Math.PI / 2, 2.6, 2.4, "ledgers", { seed: 41 });
gldLantern(-15, 3.6, -2, 0xFFE0A0, 0.4);
gldPerson(G, "scr_3", -17.5, -4.8, Math.PI, { title: "copyist", doing: "copying an old charter, letter by careful letter", wander: 0 });
gldRoom({ x0: 10, z0: -8, x1: 20, z1: 4, h: 4.6, floor: fl, wall: gldMat(0x2A3A4A, "plaster"), ceil: dk, beams: true, beamMat: dk, name: "the map room", doors: { w: [{ at: -2, w: 2, h: 2.8 }] } });
gldGate(G, "z", -2, 10.35, 0, 2, 3, "The map room");
gldMapTable(15, 0, -2, 0, 3.2, 2, "scrmap");
gldStation("maps", 15, -0.4, 0, "the map table", "in the map room (Archivists and above)");
gldPlane(4, 2.6, gldMapMat("scrwall", 0xE0D0A8), 15, 2.4, -7.45, 0);
gldGlobe(18.6, 0, 2.6);
gldShelves(19.4, 0, -5, -Math.PI / 2, 3, 2.4, "books", { seed: 42 });
gldLantern(15, 3.6, -2, 0xFFE0A0, 0.3);
gldRoom({ x0: 2, z0: -20, x1: 12, z1: -8, h: 4.4, floor: dk, wall: gldMat(0x4A3424, "wood"), ceil: dk, name: "the sealed stacks", doors: { s: [{ at: 6, w: 2, h: 2.6, bare: true }] } });
[4.0, 8.6].forEach(function (x) { gldBookcase(x, 0, -14.5, Math.PI / 2, 5, 3.4); gldBookcase(x + 0.45, 0, -14.5, -Math.PI / 2, 5, 3.4); gldSolid(x + 0.22, -14.5, 0.45, 2.5, 0, 3.4); });
gldBookcase(11.5, 0, -14, -Math.PI / 2, 6, 3.4);
var mb = gldPiece(6.3, 0, -19, 0);
gldTable(0, 0, 0, 0, 2.4, 0.9, { wood: "dark", parent: mb });
gldBox(0.6, 0.12, 0.4, gldMat(rd, null), -0.5, 0.85, 0, mb);
gldBox(0.3, 0.25, 0.25, gldW("oak"), 0.6, 0.9, 0, mb);
gldCyl(0.02, 0.5, GLD_IRON(), 0.6, 1.25, 0, mb, 6);
gldStation("stacks", 6.3, -17.8, 0, "the mending table", "in the sealed stacks, behind the tall bookcase (Scholars and above)");
gldCandle(5.4, 0.78, -19, 1.2);
gldLantern(7, 3.4, -13, 0xFFD890, 0.2);
return { front: { x: 0, z: 7.8, yaw: 0 }, in: { x: 0, z: 2, yaw: 0 }, master: { x: -5, z: 0, yaw: Math.PI }, stacks: { x: 6, z: -10, yaw: 0 } };
},
function (x, y, z, ry) {
var g = gldPiece(x, y, z, ry), wd = gldMat(0x8A5A2A, "wood", { phong: 40 });
var pil = gldBox(0.08, 1.5, 0.08, wd, -0.4, 0.75, 0, g);
var nk = gldBox(0.9, 0.08, 0.08, wd, 0.02, 1.48, 0, g);
nk.rotation.z = -0.25;
var sb = gldBox(0.12, 1.5, 0.14, wd, 0.4, 0.8, 0, g);
sb.rotation.z = 0.3;
for (var i = 0; i < 9; i++) {
var sx = -0.3 + i * 0.075;
gldBox(0.006, 1.0 - i * 0.06, 0.006, gldMat(0xE8E0C0, null), sx, 0.75 + i * 0.02, 0, g);
}
gldRoundIn(g, 0.5, 1.6);
return g;
},
function (x, y, z, ry, w, seed) {
var g = gldPiece(x, y, z, ry), ir = GLD_IRON();
[-w / 2, w / 2].forEach(function (s) { gldBox(0.05, 1.8, 0.05, ir, s, 0.9, 0, g); });
gldBox(w, 0.04, 0.04, ir, 0, 1.8, 0, g);
var cols = [0x8A1A2A, 0x2A3A8A, 0xD8A040, 0x1A5A3A, 0x5A1A5A, 0xE8E0D0, 0x1A1A1A];
for (var i = 0; i < Math.floor(w / 0.28); i++) {
var c = gldBox(0.06, 1.1, 0.5, gldCloth(cols[(i + seed) % cols.length], 0x101010, 0), -w / 2 + 0.2 + i * 0.28, 1.2, 0, g);
c.rotation.y = ((i * 5) % 3 - 1) * 0.15;
}
gldSolidIn(g, 0, 0, w / 2, 0.3, 1.9);
return g;
},
function (G) {
var wl = gldMat(0xD8B890, "plaster"), tl = gldMat(0xA86A4A, "floortile"), wd = gldMat(0x6A3A1A, "wood"), dk = gldW("dark"), red = 0x8A1A1A, gold = 0xD8A040;
gldRoom({ x0: -5, z0: 6, x1: 5, z1: 12, h: 4.5, floor: tl, wall: wl, ceil: gldMat(0x5A2A1A, "wood"), beams: true, beamMat: dk, name: "the entrance", doors: { s: [{ at: 0, w: 2.6, h: 3.2 }], n: [{ at: 0, w: 3, h: 3.4 }] } });
gldSign(["THE BARDS AND PLAYERS", "all the world's a stage"], 3.6, 0.8, "#3A0A0A", "#F0D8A0", 0, 3.6, 6.62, 0);
[-1, 1].forEach(function (s) {
gldPlane(1.4, 2.2, gldCanvasMat("bill" + s, 96, 150, function (x, W, H) {
x.fillStyle = "#E8DCC0";
x.fillRect(0, 0, W, H);
x.fillStyle = "#8A1A1A";
x.font = "bold 13px Georgia";
x.textAlign = "center";
x.fillText(s < 0 ? "TONIGHT" : "THIS WEEK", W / 2, 22);
x.fillStyle = "#1A1A1A";
x.font = "11px Georgia";
(s < 0 ? ["A Midsummer", "Night's", "Dream", "by W. Shakespeare", "", "at the eighth bell"] : ["The Ballads", "of the Border", "", "Tales by the", "fire, Thursday"]).forEach(function (l, i) { x.fillText(l, W / 2, 46 + i * 16); });
}), s * 4.6, 2.0, 9, s < 0 ? Math.PI / 2 : -Math.PI / 2);
});
gldLantern(0, 3.6, 9, 0xFFC890, 0.4);
gldExit(G, 0, 11.2, 0, "The doors, out to the Riad Quarter");
gldRoom({ x0: -14, z0: -18, x1: 14, z1: 6, h: 9, floor: gldMat(0x8A7A60, "paving"), wall: wl, ceil: null, name: "the courtyard playhouse",
doors: { s: [{ at: 0, w: 3, h: 3.4 }], w: [{ at: -6, w: 2.2, h: 3 }], e: [{ at: -6, w: 2.2, h: 3 }], n: [{ at: 10.5, w: 2, h: 2.8 }] } });
var sky = gldPlane(27.4, 23.4, gldWinMat(), 0, 9.3, -6, 0);
sky.rotation.x = Math.PI / 2;
[3.4, 6.2].forEach(function (gy) {
gldBox(27.2, 0.9, 0.22, gldMat(0x6A1A1A, "wood"), 0, gy, 5.55);
[-1, 1].forEach(function (s) { gldBox(0.22, 0.9, 22.6, gldMat(0x6A1A1A, "wood"), s * 13.55, gy, -6.2); });
for (var gx = -12.5; gx <= 12.6; gx += 2.5)
gldBox(0.12, 0.12, 0.3, GLD_BRASS(), gx, gy + 0.48, 5.5);
});
for (var px = -13; px <= 13.1; px += 3.25) {
if (Math.abs(px) < 2)
continue;
gldBox(0.24, 7.2, 0.24, dk, px, 3.6, 5.45);
gldSolid(px, 5.45, 0.14, 0.14, 0, 7.2);
}
gldBox(27.2, 0.05, 0.05, gldMat(0x4A3A2A, null), 0, 8.45, -3);
gldDais(-8.6, -18, 8.6, -12.4, 1.0, gldMat(0x5A3A1A, "wood"));
gldSolid(0, -15.2, 8.6, 2.8, 0, 0.95);
gldStair("z", -10.0, -12.4, -1.3, 1.3, 0, 1.0, gldMat(0x4A2A14, "wood"));
gldBox(0.8, 7, 0.8, gldMat(0x8A5A2A, "wood"), -8.2, 4.5, -12.8);
gldBox(0.8, 7, 0.8, gldMat(0x8A5A2A, "wood"), 8.2, 4.5, -12.8);
gldBox(17.2, 1.2, 0.8, gldMat(0x8A5A2A, "wood"), 0, 8.0, -12.8);
gldSolid(-8.2, -12.8, 0.4, 0.4, 0, 8);
gldSolid(8.2, -12.8, 0.4, 0.4, 0, 8);
gldSign(["ALL THE WORLD'S A STAGE"], 6, 0.7, "#3A0A0A", "#F0C860", 0, 7.9, -12.35, 0);
[-1, 1].forEach(function (s) { for (var f = 0; f < 5; f++) {
var cu = gldBox(0.5, 6, 0.1, gldCloth(red, 0x3A0A0A, 0), s * (7.6 - f * 0.45), 4.0, -13.2 + (f % 2) * 0.12, null);
cu.rotation.y = (f % 2 ? 0.2 : -0.2);
} });
gldPlane(16.4, 6.4, gldCanvasMat("backdrop", 256, 100, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#1A2A4A");
g.addColorStop(1, "#5A6A8A");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "#E8E0C0";
x.beginPath();
x.arc(200, 24, 12, 0, 6.3);
x.fill();
x.fillStyle = "#1A3A2A";
for (var i = 0; i < 12; i++) {
x.beginPath();
x.arc(10 + i * 22, H - 6, 18 + (i % 3) * 6, 0, 6.3);
x.fill();
}
x.fillStyle = "rgba(255,255,220,0.8)";
for (var k = 0; k < 30; k++)
x.fillRect((k * 53) % W, (k * 29) % 50, 1.5, 1.5);
}), 0, 4.2, -17.3, 0);
gldStation("stage", 0, -15, 1.0, "the stage", "on the playhouse stage");
for (var fl = -6; fl <= 6; fl += 3)
gldCandle(fl, 1.0, -12.8, 1.4);
for (var rw = 0; rw < 4; rw++)
[-1, 1].forEach(function (s) { gldBench(s * 5, 0, -7 + rw * 2.6, 0, 6.4); });
for (var lx = -10; lx <= 10; lx += 5)
gldLantern(lx, 7.6, -3, [0xFFC890, 0xFF9A5A, 0xFFE0A0][Math.abs(lx / 5) % 3], 0.6);
gldBanner(-13.25, 4.6, -1, Math.PI / 2, 1.2, 2.4, red, gold, "mask");
gldBanner(13.25, 4.6, -1, -Math.PI / 2, 1.2, 2.4, red, gold, "mask");
gldSunPatch(0, 0, -3, 12, 10, 0xFFF0C8);
var M = G.master;
gldPerson(G, "master", 3.6, -9.6, Math.PI, { name: M.name, sex: M.sex, age: M.age, title: M.title, look: M.look, master: true, doing: "calling the players to their places, a fiddle under one arm" });
gldRollBook(G, 9.6, -9.4, 0, -0.5);
gldNoticeBoard(G, -8.5, 5.55, 0, Math.PI, red);
gldPerson(G, "bar_1", -2.4, -15.6, 0, { y: 1.0, title: "player", sex: "f", doing: "running her lines in the middle of the stage", wander: 2 });
gldPerson(G, "bar_2", 2.6, -14.4, -0.4, { y: 1.0, title: "player", doing: "practising a stage fall, again", wander: 2 });
gldPerson(G, "bar_3", -7, -1, 0.6, { title: "prompter", sex: "f", doing: "following the script with a pencil", wander: 0 });
gldRoom({ x0: -24, z0: -12, x1: -14, z1: 0, h: 4.6, floor: wd, wall: gldMat(0x6A2A1A, "plaster"), ceil: gldMat(0x3A1A0A, "wood"), beams: true, beamMat: dk, name: "the music room", doors: { e: [{ at: -6, w: 2.2, h: 3 }] } });
gldHarp(-22.6, 0, -10.4, 0.5);
gldDrum(-21, 0, -1.2, 1.2);
gldDrum(-20, 0, -1.6, 0.8, 0x2A3A6A);
gldLute(-23.4, 0.9, -6, Math.PI / 2);
gldTable(-23.2, 0, -6, Math.PI / 2, 2, 0.7, { wood: "dark" });
for (var st = 0; st < 4; st++)
gldStool(-19 + (st % 2) * 1.6, 0, -8 + Math.floor(st / 2) * 2.4);
var mu = gldPiece(-18, 0, -6.5, 0);
gldCyl(0.03, 1.2, GLD_IRON(), 0, 0.6, 0, mu, 6);
var sh = gldBox(0.5, 0.35, 0.02, gldMat(0xEEE6D0, null), 0, 1.25, 0.05, mu);
sh.rotation.x = -0.3;
gldRoundIn(mu, 0.2, 1.3);
gldStation("music", -18.6, -6.4, 0, "the music stands", "in the music room, off the courtyard");
gldLantern(-19, 3.6, -6, 0xFFC890, 0.3);
gldPerson(G, "bar_mus", -20.6, -9.6, 0.5, { title: "bard", doing: "tuning a fiddle by ear", wander: 0 });
gldRoom({ x0: 14, z0: -12, x1: 24, z1: 0, h: 4.6, floor: wd, wall: wl, ceil: gldMat(0x3A1A0A, "wood"), beams: true, beamMat: dk, name: "the wardrobe", doors: { w: [{ at: -6, w: 2.2, h: 3 }] } });
gldGate(G, "z", -6, 14.35, 0, 2.2, 3, "The wardrobe");
gldCostumeRail(19, 0, -11, 0, 5, 0);
gldCostumeRail(19, 0, -1.2, 0, 5, 3);
gldCostumeRail(23, 0, -6, Math.PI / 2, 4, 5);
[[16, -9, 0x8A1A2A], [16, -3, 0x2A3A8A]].forEach(function (q) { gldArmourStand(q[0], 0, q[1], Math.PI / 2, q[2]); });
gldTable(19.4, 0, -6, 0, 2.2, 1.0, { wood: "oak" });
for (var b = 0; b < 3; b++)
gldBox(0.4, 0.1, 0.6, gldCloth([0xD8A040, 0x5A1A5A, 0xE8E0D0][b], 0x1A1A1A, 0), 18.6 + b * 0.7, 0.83, -6);
gldStation("wardrobe", 19.4, -4.8, 0, "the cutting table", "in the wardrobe, off the courtyard (Bards and above)");
gldLantern(19, 3.6, -6, 0xFFE0B0, 0.3);
gldRoom({ x0: 4, z0: -30, x1: 17, z1: -18, h: 4.4, floor: wd, wall: gldMat(0x3A5A3A, "plaster"), ceil: gldMat(0x2A1A0A, "wood"), name: "the green room", doors: { s: [{ at: 10.5, w: 2, h: 2.8 }] } });
gldGate(G, "x", 10.5, -18.35, 0, 2, 4, "The green room");
gldRug(10.5, 0, -24, 0, 6, 5, 0x1A3A1A, gold, red);
gldChair(8.4, 0, -24, Math.PI / 2, { cushion: red });
gldChair(12.6, 0, -24, -Math.PI / 2, { cushion: red });
gldTable(10.5, 0, -24, 0, 1.6, 0.9, { wood: "dark" });
for (var mi = 0; mi < 3; mi++) {
gldBox(1.0, 1.3, 0.04, gldMat(0xC8D0D8, null, { phong: 120 }), 6 + mi * 2.2, 1.7, -29.45);
gldBox(1.2, 0.08, 0.4, gldW("dark"), 6 + mi * 2.2, 0.85, -29.3);
for (var bl = 0; bl < 4; bl++)
gldSph(0.04, gldGlowM(0xFFF0C8), 5.55 + mi * 2.2 + bl * 0.3, 2.45, -29.4, null, 6);
}
gldDesk(15.6, 0, -21, -Math.PI / 2, { lamp: true });
gldCostumeRail(15.8, 0, -27.4, -Math.PI / 2, 2.4, 2);
gldLantern(10.5, 3.4, -24, 0xFFE0B0, 0.3);
return { front: { x: 0, z: 10.6, yaw: 0 }, in: { x: 0, z: 3, yaw: 0 }, master: { x: 3.6, z: -6, yaw: 0 }, stage: { x: 0, z: -14, y: 1.0, yaw: Math.PI }, yard: { x: 0, z: -3, yaw: 0 } };
},
function (x, y, z, ry, s) {
var g = gldPiece(x, y, z, ry), wd = gldMat(0x7A4A22, "wood", { phong: 60 });
s = s || 1;
gldBox(0.3 * s, 1.0 * s, 0.3 * s, gldW("dark"), 0, 0.5 * s, 0, g);
var w = gldGroup(0, 1.3 * s, 0.22 * s, 0, g);
var rim = new THREE.Mesh(new THREE.TorusGeometry(0.62 * s, 0.05 * s, 6, 22), wd);
w.add(rim);
gldCyl(0.1 * s, 0.14 * s, GLD_BRASS(), 0, 0, 0, w, 10).rotation.x = Math.PI / 2;
for (var i = 0; i < 8; i++) {
var a = i / 8 * 6.283, sp = gldGroup(0, 0, 0, 0, w);
sp.rotation.z = a;
gldBox(0.04 * s, 0.92 * s, 0.04 * s, wd, 0, 0.46 * s, 0, sp);
gldBox(0.06 * s, 0.22 * s, 0.06 * s, wd, 0, 1.0 * s, 0, sp);
}
gldRoundIn(g, 0.4 * s, 1.9 * s);
return g;
},
function (x, y, z, ry, s) {
var g = gldPiece(x, y, z, ry), hull = gldMat(0x3A2414, "wood", { phong: 50 }), sl = gldMat(0xEDE4CC, null);
s = s || 1;
var h = gldBox(0.34 * s, 0.26 * s, 1.4 * s, hull, 0, 0.2 * s, 0, g);
gldBox(0.36 * s, 0.04 * s, 1.42 * s, gldMat(0xC8A040, null), 0, 0.3 * s, 0, g);
gldBox(0.3 * s, 0.18 * s, 0.3 * s, hull, 0, 0.38 * s, -0.55 * s, g);
[-0.35, 0.05, 0.45].forEach(function (mz, i) {
var mh = (i === 1 ? 1.2 : 0.95) * s;
gldCyl(0.015 * s, mh, gldW("dark"), 0, 0.3 * s + mh / 2, mz * s, g, 5);
for (var k = 0; k < 3; k++)
gldBox(0.4 * s - k * 0.06 * s, 0.22 * s, 0.01, sl, 0, 0.45 * s + k * 0.28 * s, mz * s, g);
});
gldBox(0.01, 0.01, 1.6 * s, gldMat(0x2A2018, null), 0, 1.3 * s, 0.1 * s, g);
return g;
},
function (x, y, z, ry, s) {
var g = gldPiece(x, y, z, ry), ir = GLD_IRON();
s = s || 1;
gldBox(0.12 * s, 2.0 * s, 0.12 * s, ir, 0, 1.1 * s, 0, g);
gldBox(1.2 * s, 0.1 * s, 0.1 * s, ir, 0, 2.0 * s, 0, g);
var arm = new THREE.Mesh(new THREE.TorusGeometry(0.6 * s, 0.07 * s, 6, 14, Math.PI), ir);
arm.rotation.z = Math.PI;
arm.position.y = 0.65 * s;
g.add(arm);
[-1, 1].forEach(function (k) { var fl = gldBox(0.24 * s, 0.3 * s, 0.06 * s, ir, k * 0.6 * s, 0.75 * s, 0, g); fl.rotation.z = k * 0.5; });
var r = new THREE.Mesh(new THREE.TorusGeometry(0.12 * s, 0.03 * s, 5, 10), ir);
r.position.y = 2.2 * s;
g.add(r);
gldSolidIn(g, 0, 0, 0.7 * s, 0.2 * s, 2.3 * s);
return g;
},
function (G) {
var wl = gldMat(0x7A6A5A, "wood"), pl = gldMat(0xDCD4C4, "plaster"), dk = gldMat(0x2A2018, "wood"), deck = gldMat(0x8A6A44, "wood"), nav = 0x1A2A4A, cream = 0xE8E0C8, gold = 0xC8A040;
gldRoom({ x0: -5, z0: 4, x1: 5, z1: 10, h: 4.4, floor: deck, wall: pl, ceil: dk, beams: true, beamMat: dk, name: "the entrance", doors: { s: [{ at: 0, w: 2.6, h: 3.2 }], n: [{ at: 0, w: 3, h: 3.2 }] } });
gldSign(["THE MARINERS' GUILD", "fair winds and following seas"], 3.6, 0.8, "#1A2A4A", "#E8E0C8", 0, 3.4, 4.62, 0);
gldAnchor(-3.8, 0, 6.2, 0.4, 0.9);
gldRopeCoil(3.8, 0, 6, 1.1);
gldPainting(4.45, 2.2, 8, -Math.PI / 2, 1.4, 1.0, "mar_e1", "ship");
gldLantern(0, 3.4, 7, 0xFFE0A0, 0.4);
gldExit(G, 0, 9.2, 0, "The door, out to the quay");
gldRoom({ x0: -12, z0: -10, x1: 12, z1: 4, h: 6.4, floor: deck, wall: wl, ceil: gldMat(0x3A2A1A, "wood"), beams: true, beamMat: dk, name: "the quarterdeck hall",
doors: { s: [{ at: 0, w: 3, h: 3.2 }], w: [{ at: -3, w: 2.2, h: 3 }], e: [{ at: -3, w: 2.2, h: 3 }], n: gldWins([{ at: 0, w: 2, h: 2.8, sill: 0.7 }, gldWin("x", -9.5, -9.7, 0, 1.8, 2.2, 1.6, -1), gldWin("x", 9.5, -9.7, 0, 1.8, 2.2, 1.6, -1)]) } });
var rose = gldPlane(5, 5, gldCanvasMat("rose", 160, 160, function (x, W, H) {
x.fillStyle = "#8A6A44";
x.fillRect(0, 0, W, H);
var cx = W / 2, cy = H / 2;
x.strokeStyle = "#C8A040";
x.lineWidth = 2;
x.beginPath();
x.arc(cx, cy, 70, 0, 6.3);
x.stroke();
for (var i = 0; i < 16; i++) {
var a = i / 16 * 6.283, r = i % 4 === 0 ? 70 : (i % 2 ? 36 : 52);
x.fillStyle = i % 2 ? "#1A2A4A" : "#E8E0C8";
x.beginPath();
x.moveTo(cx, cy);
x.lineTo(cx + Math.cos(a - 0.12) * 14, cy + Math.sin(a - 0.12) * 14);
x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
x.lineTo(cx + Math.cos(a + 0.12) * 14, cy + Math.sin(a + 0.12) * 14);
x.fill();
}
x.fillStyle = "#E8E0C8";
x.font = "bold 14px Georgia";
x.textAlign = "center";
x.fillText("N", cx, 14);
}), 0, 0.02, -2, 0);
rose.rotation.x = -Math.PI / 2;
gldDais(-12, -9.7, 12, -6.2, 0.7, deck);
gldSolid(0, -7.95, 11.7, 1.75, 0, 0.65);
[-8, 8].forEach(function (sx) { gldStair("z", -4.6, -6.2, sx - 1, sx + 1, 0, 0.7, dk); });
for (var rx = -11.5; rx <= 11.6; rx += 0.8) {
if (Math.abs(rx + 8) < 1.2 || Math.abs(rx - 8) < 1.2)
continue;
gldBox(0.08, 0.8, 0.08, dk, rx, 1.1, -6.25);
}
[[-11.6, -9.2], [-6.8, -2.8], [2.8, 6.8], [9.2, 11.6]].forEach(function (q) { gldBox(q[1] - q[0], 0.1, 0.16, gldMat(0x5A3A1A, "wood", { phong: 60 }), (q[0] + q[1]) / 2, 1.55, -6.25); gldSolid((q[0] + q[1]) / 2, -6.25, (q[1] - q[0]) / 2, 0.1, 0.7, 1.0); });
gldShipWheel(0, 0.7, -8.2, 0, 1.3);
gldCyl(0.3, 6.4, gldMat(0x7A5A3A, "wood"), 5, 3.2, -1, null, 12);
gldSolid(5, -1, 0.32, 0.32, 0, 6.4);
var sp = gldCyl(0.1, 7, gldMat(0x6A4A2A, "wood"), 5, 4.6, -1, null, 8);
sp.rotation.z = Math.PI / 2;
gldCyl(0.3, 6.4, gldCloth(cream, 0x8A8070, 0), 5, 4.3, -1, null, 10).rotation.z = Math.PI / 2;
gldRopeCoil(5.8, 0, -0.2, 0.8);
gldPlane(3.2, 2.2, gldCanvasMat("knots", 192, 132, function (x, W, H) {
x.fillStyle = "#2A3A4A";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C8A040";
x.lineWidth = 3;
x.strokeRect(3, 3, W - 6, H - 6);
x.strokeStyle = "#E8D8B0";
x.lineWidth = 3;
for (var i = 0; i < 6; i++) {
var cx = 32 + (i % 3) * 64, cy = 40 + Math.floor(i / 3) * 56;
x.beginPath();
x.arc(cx, cy, 12, 0, 5.4);
x.stroke();
x.beginPath();
x.moveTo(cx - 20, cy + 18);
x.bezierCurveTo(cx - 6, cy, cx + 6, cy + 24, cx + 20, cy + 10);
x.stroke();
}
x.fillStyle = "#E8D8B0";
x.font = "bold 11px Georgia";
x.textAlign = "center";
x.fillText("BOWLINE · HITCH · BEND · SPLICE", W / 2, H - 10);
}), -11.45, 2.4, -1, Math.PI / 2);
gldStation("knots", -10.2, -1, 0, "the knot board", "in the quarterdeck hall");
gldTable(-6, 0, 1.6, 0, 1.8, 0.9, { wood: "dark" });
gldModelShip(-6, 0.8, 1.6, Math.PI / 2, 0.9);
var bell = gldPiece(10.8, 0, 1.6, 0);
gldBox(0.1, 2.2, 0.1, dk, 0, 1.1, 0, bell);
gldBox(0.8, 0.1, 0.1, dk, -0.35, 2.2, 0, bell);
gldCyl(0.18, 0.32, GLD_BRASS(), -0.6, 1.9, 0, bell, 12, 0.08);
gldSolidIn(bell, 0, 0, 0.2, 0.2, 2.3);
gldBanner(-11.5, 4.2, -3, Math.PI / 2, 1.2, 2.4, nav, cream, "anchor");
gldBanner(11.5, 4.2, -3, -Math.PI / 2, 1.2, 2.4, nav, cream, "anchor");
[[-6, -1], [6, -1], [0, -6]].forEach(function (p) { gldLantern(p[0], 5.2, p[1], 0xFFE0A0, 0.6); });
var M = G.master;
gldPerson(G, "master", -2.4, -8, 0, { name: M.name, sex: M.sex, age: M.age, title: M.title, look: M.look, master: true, doing: "standing by the wheel, one hand on a spoke, reading the weather through the stern windows", y: 0.7 });
gldRollBook(G, 9.6, 3.4, 0, Math.PI);
gldNoticeBoard(G, -8.5, 3.55, 0, Math.PI, nav);
gldPerson(G, "mar_1", -9.4, -2.2, Math.PI / 2, { title: "deckhand", sex: "f", doing: "practising a bowline with her eyes shut", wander: 0 });
gldPerson(G, "mar_2", 3, 1.4, -0.8, { title: "able seaman", doing: "splicing a rope's end, whistling", wander: 2 });
gldRoom({ x0: -36, z0: -6, x1: -12, z1: 0, h: 3.8, floor: gldMat(0x6A5A44, "wood"), wall: pl, ceil: dk, beams: true, beamMat: dk, name: "the rope walk",
doors: { e: [{ at: -3, w: 2.2, h: 3 }], s: gldWins([gldWin("x", -30, -0.3, 0, 1.4, 1.2, 1.4, 1), gldWin("x", -22, -0.3, 0, 1.4, 1.2, 1.4, 1)]) } });
var jack = gldPiece(-34.8, 0, -3, Math.PI / 2);
gldBox(1.6, 1.6, 0.3, dk, 0, 0.8, 0, jack);
var wh = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.06, 6, 18), gldMat(0x7A4A22, "wood"));
wh.position.set(0, 1.2, 0.2);
jack.add(wh);
for (var hk = 0; hk < 3; hk++)
gldCyl(0.03, 0.3, GLD_IRON(), -0.3 + hk * 0.3, 1.2, 0.4, jack, 6).rotation.x = Math.PI / 2;
gldSolidIn(jack, 0, 0, 0.85, 0.25, 1.8);
[-3.4, -3, -2.6].forEach(function (z) { gldBox(19, 0.03, 0.03, gldMat(0xC8AA7A, null), -24.5, 1.2, z); });
for (var tx = -30; tx <= -16; tx += 7) {
gldBox(0.12, 1.3, 1.4, dk, tx, 0.65, -3);
gldSolid(tx, -3, 0.1, 0.7, 0, 1.3);
}
gldRopeCoil(-14.2, 0, -5, 1.2);
gldRopeCoil(-15.4, 0, -5.1, 0.9);
gldRack(-24, 0, -5.6, 0, 3, "dark");
gldStation("rope", -20, -1.4, 0, "the rope walk", "in the rope walk, west of the quarterdeck hall");
gldLantern(-28, 2.8, -3, 0xFFE0A0, 0.2);
gldLantern(-18, 2.8, -3, 0xFFE0A0, 0.2);
gldPerson(G, "mar_rw", -27, -1.4, -Math.PI / 2, { title: "ropemaker", doing: "walking backward down the walk, paying out yarn", wander: 4 });
gldRoom({ x0: 12, z0: -10, x1: 26, z1: 4, h: 5.6, floor: gldMat(0xA89070, "wood"), wall: pl, ceil: gldMat(0x5A4A3A, "wood"), beams: true, beamMat: dk, name: "the sail loft",
doors: { w: [{ at: -3, w: 2.2, h: 3 }], e: gldWins([gldWin("z", -6, 25.7, 0, 1.6, 2.2, 1.2, 1), gldWin("z", 0, 25.7, 0, 1.6, 2.2, 1.2, 1)]) } });
gldGate(G, "z", -3, 12.35, 0, 2.2, 3, "The sail loft");
var sail = gldPlane(9, 7, gldCanvasMat("sailcloth", 128, 100, function (x, W, H) {
x.fillStyle = "#E8E0C8";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C8BEA4";
x.lineWidth = 1;
for (var i = 0; i < W; i += 10) {
x.beginPath();
x.moveTo(i, 0);
x.lineTo(i, H);
x.stroke();
}
x.strokeStyle = "#8A7A5A";
x.lineWidth = 3;
x.strokeRect(2, 2, W - 4, H - 4);
x.fillStyle = "#C8BEA4";
x.fillRect(60, 40, 18, 14);
}), 19.6, 0.03, -3, 0);
sail.rotation.x = -Math.PI / 2;
gldBox(10, 0.04, 0.04, gldMat(0x8A7A5A, null), 19.6, 4.9, -9.2);
var hs = gldPlane(8, 3.4, gldCloth(cream, 0x8A8070, 0), 19.6, 3.1, -9.25, 0);
[[14.4, 2.4], [24.6, 2.4]].forEach(function (p) { gldBench(p[0], 0, p[1], Math.PI / 2, 2.4); });
gldTable(24.4, 0, -5, Math.PI / 2, 2.2, 0.8, { wood: "oak" });
for (var nd = 0; nd < 3; nd++)
gldCyl(0.02, 0.16, GLD_IRON(), 24.2, 0.86, -5.6 + nd * 0.4, null, 5);
gldStation("sails", 19.6, -0.6, 0, "the sail loft floor", "in the sail loft (Bosuns and above)");
gldLantern(17, 4.4, -3, 0xFFE8C0, 0.3);
gldLantern(22, 4.4, -3, 0xFFE8C0, 0.3);
gldPerson(G, "mar_sl", 21.6, -3.6, -Math.PI / 2, { title: "sailmaker", sex: "f", doing: "kneeling on the canvas, a palm on her hand and a needle going in and out", wander: 0 });
var cy = 0.7;
gldRoom({ x0: -6, z0: -22, x1: 6, z1: -10, y: cy, h: 4.0, floor: dk, wall: gldMat(0x2A3A4A, "plaster"), ceil: dk, beams: true, beamMat: dk, name: "the chart room", doors: { s: [{ at: 0, w: 2, h: 2.8 }] } });
gldGate(G, "x", 0, -10.35, cy, 2, 4, "The chart room");
gldMapTable(0, cy, -16, 0, 4, 2.4, "marchart");
gldStation("charts", 0, -14.4, cy, "the chart table", "in the chart room, up on the quarterdeck (Pilots and above)");
gldPlane(5, 3, gldMapMat("marwall", 0xD8CCA8), 0, cy + 2.3, -21.45, 0);
gldGlobe(-4.4, cy, -12.2);
gldShelves(5.4, cy, -16, -Math.PI / 2, 3.2, 2.4, "books", { seed: 52 });
var ch = gldPiece(-5.2, cy, -17, Math.PI / 2);
for (var dr = 0; dr < 5; dr++)
gldBox(2, 0.22, 0.9, dk, 0, 0.15 + dr * 0.26, 0, ch);
gldSolidIn(ch, 0, 0, 1, 0.45, 1.4);
gldCyl(0.1, 0.5, GLD_BRASS(), -1, cy + 0.95, -16.6, null, 8).rotation.z = Math.PI / 2.4;
gldLantern(0, cy + 3.0, -16, 0xFFE0A0, 0.3);
return { front: { x: 0, z: 8.6, yaw: 0 }, in: { x: 0, z: 1, yaw: 0 }, master: { x: -2, z: -4.6, yaw: 0 }, charts: { x: 0, z: -12, y: 0.7, yaw: 0 } };
},
function (x, y, z, ry, col) {
var g = gldPiece(x, y, z, ry), hull = gldMat(col || 0x3A4A3A, "wood", { phong: 30 }), in2 = gldMat(0x6A5034, "wood");
var sh = new THREE.Shape();
sh.moveTo(0, -2.2);
sh.quadraticCurveTo(0.95, -1.2, 0.9, 0.6);
sh.quadraticCurveTo(0.8, 1.8, 0, 2.0);
sh.quadraticCurveTo(-0.8, 1.8, -0.9, 0.6);
sh.quadraticCurveTo(-0.95, -1.2, 0, -2.2);
var m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.55, bevelEnabled: false }), hull);
m.rotation.x = -Math.PI / 2;
m.position.y = -0.25;
g.add(m);
var fl = new THREE.Mesh(new THREE.ShapeGeometry(sh), in2);
fl.rotation.x = -Math.PI / 2;
fl.position.y = 0.25;
fl.scale.set(0.88, 0.92, 1);
g.add(fl);
[-0.6, 0.5].forEach(function (dz) { gldBox(1.6, 0.05, 0.3, in2, 0, 0.42, dz, g); });
[-1, 1].forEach(function (s) { var oar = gldBox(0.06, 0.04, 3.0, gldW("oak"), s * 0.5, 0.5, 0.2, g); oar.rotation.y = s * 0.12; });
gldBale(0, 0.25, 1.2, 0.2, 0.7, 0x6A5A3A);
return g;
},
function (G) {
var y = -6, rk = gldMat(0x4A443C, "stone"), drk = gldMat(0x34302A, "stone", { phong: 15 }), wet = gldMat(0x2A2A28, "stone", { phong: 60 }), wd = gldMat(0x5A4028, "wood"), dk = gldW("dark"), amb = 0xFFB860;
function hidden() { return gldOk18(G) ? "" : "A great tun of cider, bunged tight. It sounds full to the brim."; }
gldRoom({ x0: -4, z0: 2, x1: 4, z1: 10, h: 3.6, floor: gldMat(0x5A4A38, "wood"), wall: gldMat(0x6A5A4A, "brick"), ceil: gldMat(0x3A2A1C, "wood"), beams: true, beamMat: dk, name: "the cooper's store",
doors: { s: [{ at: 2.4, w: 1.6, h: 2.6 }], n: [{ at: -1, w: 2.6, h: 2.6, bare: true }] } });
gldSecret({ id: "tun", kind: "barrel", back: gldMat(0x6A5A4A, "brick"), dir: "x", at: -1, c: 2.3, face: 1, w: 2.6, h: 2.6, name: "The great tun", hint: "The great tun against the back wall", when: hidden });
for (var b = 0; b < 5; b++)
gldBarrel(-3.3 + (b % 2) * 0.7, 0, 4 + Math.floor(b / 2) * 0.75, 0.9);
gldBarrel(-3.0, 0.81, 4.4, 0.8);
gldBarrel(3.2, 0, 3.2, 1.0);
gldWorkbench(1.6, 0, 6.6, -Math.PI / 2);
for (var sv = 0; sv < 6; sv++) {
var st = gldBox(0.1, 1.1, 0.03, gldW("oak"), 3.4, 0.55, 5.4 + sv * 0.14);
st.rotation.z = 0.18;
}
[0, 1, 2].forEach(function (i) { var hp = new THREE.Mesh(new THREE.TorusGeometry(0.34 + i * 0.04, 0.02, 5, 18), GLD_IRON()); hp.position.set(3.6, 1.6 + i * 0.04, 8.2); hp.rotation.y = Math.PI / 2; gldP().add(hp); });
gldSign(["J. TREGARTHEN", "cooper · casks mended"], 2.4, 0.6, "#2A2018", "#E8D8B0", -1.6, 2.7, 9.4, Math.PI);
gldLantern(0, 2.8, 6, 0xFFD0A0, 0.4);
gldPerson(G, "cooper", 0.2, 7.4, Math.PI / 2, { name: "Ned Tregarthen", sex: "m", age: 57, title: "the cooper", outsider: "his own cooper's store on the quay", doing: "driving a hoop down a cask with a mallet" });
gldExit(G, 2.4, 9.2, 0, "The door, out to the quay");
gldRoom({ x0: -2.5, z0: -8, x1: 0.5, z1: 2, y: y, h: 10, floor: drk, wall: rk, name: "the stair down", doors: { s: [{ at: -1, w: 2.6, h: 2.6, sill: 6, bare: true }], n: [{ at: -1, w: 1.8, h: 2.6 }] } });
gldStair("z", 1.3, -7.3, -2, 0, 0, y, gldMat(0x3A342C, "stone"));
gldSolid(-1, 1.55, 1.3, 0.2, y, 5.85);
gldLantern(-0.1, -2.4, -3, amb, 0.3);
gldRoom({ x0: -14, z0: -30, x1: 14, z1: -8, y: y, h: 8, floor: wet, wall: rk, ceil: drk, name: "the sea cave",
doors: { s: [{ at: -1, w: 1.8, h: 2.6 }], w: [{ at: -14, w: 2, h: 2.8 }], e: [{ at: -14, w: 2, h: 2.8 }] } });
for (var i = 0; i < 8; i++)
[-13.3, 13.3].forEach(function (sx, k) { var lz = -10.2 - i * 1.25; if (Math.abs(lz + 14) < 1.8)
return; var lump = gldSph(0.7 + ((i * 3 + k) % 4) * 0.22, drk, sx, y + 0.3, lz, null, 7); lump.scale.y = 0.7; gldRound(sx, lz, 0.6, y, 0.7); });
for (var t = 0; t < (GLD.lite ? 10 : 22); t++) {
var tx = -12 + ((t * 7) % 25), tz = -10 - ((t * 5) % 19), th = 0.6 + ((t * 3) % 5) * 0.3;
gldCyl(0.22 + ((t % 3) * 0.06), th, drk, tx, y + 8 - 0.3 - th / 2, tz, null, 6, 0.0);
}
var wat = gldPlane(27.4, 8.4, gldMat(0x0A1A24, null, { phong: 120, op: 0.92 }), 0, y + 0.03, -25.5, 0);
wat.rotation.x = -Math.PI / 2;
var glint = gldPlane(10, 4, gldGlowM(0x2A4A6A, 0.25), 7, y + 0.05, -27, 0);
glint.rotation.x = -Math.PI / 2;
glint.material.depthWrite = false;
[[-13.7, -1.9], [1.9, 13.7]].forEach(function (q) { var cx = (q[0] + q[1]) / 2, hw = (q[1] - q[0]) / 2; gldBox(q[1] - q[0], 0.25, 0.4, rk, cx, y + 0.12, -21.1); gldSolid(cx, -25.5, hw, 4.3, y, 1.4); });
gldDais(-1.8, -29.6, 1.8, -21.2, 0.3, wd);
for (var pl = -29; pl <= -21.5; pl += 0.6)
gldBox(3.6, 0.02, 0.04, gldMat(0x2A1E12, null), 0, y + 0.31, pl);
for (var pz = -29; pz <= -22; pz += 3.5)
[-1.8, 1.8].forEach(function (px) { gldCyl(0.12, 1.6, wd, px, y + 0.5, pz, null, 8); gldSolid(px, pz, 0.13, 0.13, y, 1.4); });
gldRowBoat(4.4, y + 0.15, -25.6, 0.08);
gldRowBoat(-4.6, y + 0.15, -26.2, -0.12, 0x4A2A1A);
gldBox(0.02, 0.02, 2.6, gldMat(0xB89A6A, null), 3.1, y + 0.6, -25);
gldStation("boat", 0, -27.4, y + 0.3, "the landing stage", "in the sea cave, out on the landing stage");
gldPlane(9, 4.6, gldCanvasMat("seamouth", 192, 96, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#0A1428");
g.addColorStop(0.6, "#1A2A4A");
g.addColorStop(0.62, "#0A1A2A");
g.addColorStop(1, "#04080E");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "#E8E0C0";
x.beginPath();
x.arc(150, 20, 8, 0, 6.3);
x.fill();
x.fillStyle = "rgba(232,224,192,0.35)";
for (var i = 0; i < 8; i++)
x.fillRect(140 + (i % 2) * 6, 62 + i * 4, 24 - i * 2, 1.5);
x.fillStyle = "#FFF";
for (var k = 0; k < 40; k++)
x.fillRect((k * 47) % W, (k * 13) % 54, 1, 1);
x.fillStyle = "#FFD890";
x.fillRect(40, 56, 3, 2);
}), 7, y + 2.3, -29.6, 0);
[[2.2, 0], [11.8, 0]].forEach(function (q) { var rkk = gldBox(1.6, 4.8, 0.8, drk, q[0], y + 2.4, -29.4); rkk.rotation.z = (q[0] < 7 ? 0.08 : -0.08); });
gldBox(11, 1.2, 0.8, drk, 7, y + 4.9, -29.4);
gldTable(-7, y, -12.6, 0, 2.6, 1.2, { wood: "dark" });
gldPlane(1.4, 0.9, gldMapMat("tidechart", 0xD8CCA8), -7, y + 0.79, -12.6, 0).rotation.x = -Math.PI / 2;
gldCandle(-8, y + 0.78, -12.4, 1.2);
gldBox(0.4, 0.3, 0.3, GLD_BRASS(), -6.1, y + 0.93, -12.8);
[[-8.4, -11.4, 0], [-5.6, -13.8, Math.PI]].forEach(function (p) { gldChair(p[0], y, p[1], p[2], { wood: "dark", cushion: 0x5A2A1A }); });
[[-12, -17, 0.2], [-10.8, -17.6, 0.6], [-12, -18.3, 0], [10.6, -11.2, 0.3], [11.6, -12.2, 0.1]].forEach(function (p, i) { gldBale(p[0], y, p[1], p[2], 1, [0x8A7A5A, 0x6A5A3A, 0x7A6A4A][i % 3]); });
gldBale(-11.6, y + 0.6, -17.4, 0.4, 0.9);
gldCrate(10.8, y, -16.4, 0.2, 1.0);
gldCrate(10.8, y + 1.0, -16.4, 0.5, 0.8);
gldBarrel(12.4, y, -15, 1.0);
gldBarrel(12.4, y, -16.2, 1.0);
gldSack(-4, y, -19.2, 0x6A5A40);
gldSack(-3.3, y, -19.6, 0x5A4A30);
gldPlane(3.6, 2.4, gldWebMat(), -13.5, y + 2.6, -14, Math.PI / 2);
gldPlane(3.2, 2.0, gldWebMat(), 13.5, y + 3.0, -18.6, -Math.PI / 2);
[[-6, -12], [6, -12], [-6, -19], [6, -19], [0, -22]].forEach(function (p, i) { gldLantern(p[0], y + 5.2, p[1], amb, i === 4 ? 1.6 : 1.4); });
gldBanner(-2, y + 4.0, -8.6, Math.PI, 1.2, 2.2, 0x1A2A3A, 0xE8C890, "boat");
var M = G.master;
gldPerson(G, "master", -7, -14.2, Math.PI, { name: M.name, sex: M.sex, age: M.age, title: M.title, look: M.look, master: true, doing: "leaning on the table over the tide chart, a gold ring glinting in one ear", y: y });
gldRollBook(G, -9.6, -12.6, y, Math.PI / 2);
gldNoticeBoard(G, 3.2, -8.55, y, Math.PI, 0x2A3A4A);
gldPerson(G, "smu_1", 0.6, -24, Math.PI, { title: "oarsman", doing: "coiling the painter on the landing stage", y: y + 0.3, wander: 0 });
gldPerson(G, "smu_2", 8.8, -13.2, -0.6, { title: "tide-runner", sex: "f", doing: "shouldering a bale and grinning", y: y, wander: 2 });
gldRoom({ x0: 14, z0: -20, x1: 24, z1: -8, y: y, h: 4, floor: drk, wall: rk, ceil: drk, name: "the hidden store", doors: { w: [{ at: -14, w: 2, h: 2.8 }], n: [{ at: 19, w: 2, h: 2.6 }] } });
for (var r = 0; r < 4; r++) {
gldBale(16 + r * 1.0, y, -9.2, 0, 1, [0x8A7A5A, 0x6A3A2A, 0x5A6A4A, 0x7A6A4A][r]);
gldBale(16 + r * 1.0, y + 0.6, -9.2, 0.1, 0.9);
}
for (var c2 = 0; c2 < 3; c2++) {
gldCrate(23, y, -11 + c2 * -1.6, 0, 1.0);
gldCrate(23, y + 1.0, -11 + c2 * -1.6, 0.3, 0.8);
}
[[16, -18.6], [17, -18.6]].forEach(function (p) { gldBarrel(p[0], y, p[1], 1.0); });
gldShelves(21.5, y, -19.3, 0, 3.2, 2.4, "jars", { seed: 61 });
gldStation("store", 19, -14, y, "the hidden store", "in the hidden store, east off the sea cave");
gldLantern(19, y + 3.2, -14, amb, 0.2);
gldRoom({ x0: -24, z0: -20, x1: -14, z1: -8, y: y, h: 3.8, floor: wd, wall: rk, ceil: drk, beams: true, beamMat: dk, name: "the tally room", doors: { e: [{ at: -14, w: 2, h: 2.8 }] } });
gldGate(G, "z", -14, -14.35, y, 2, 3, "The tally room");
gldDesk(-19, y, -11.2, Math.PI, { lamp: true });
gldChair(-19, y, -12.2, 0, { wood: "dark", cushion: 0x5A2A1A });
gldShelves(-23.4, y, -14, Math.PI / 2, 3.4, 2.4, "ledgers", { seed: 62 });
gldChest(-20, y, -19.2, 0, 0x3A2A1A);
gldChest(-17.8, y, -19.2, 0, 0x4A2A14);
var sc = gldPiece(-16.2, y, -17, 0);
gldTable(0, 0, 0, 0, 1.4, 0.8, { wood: "dark", parent: sc });
gldCyl(0.03, 0.6, GLD_BRASS(), 0, 1.08, 0, sc, 6);
gldBox(0.7, 0.03, 0.03, GLD_BRASS(), 0, 1.38, 0, sc);
[-0.33, 0.33].forEach(function (dx) { gldCyl(0.12, 0.03, GLD_BRASS(), dx, 1.12, 0, sc, 10); });
gldStation("tally", -19, -13.2, y, "the tally desk", "in the tally room, west off the sea cave (Landers and above)");
gldLantern(-19, y + 3, -14, amb, 0.2);
gldRoom({ x0: 14, z0: -32, x1: 24, z1: -20, y: y, h: 3.6, floor: wd, wall: gldMat(0x5A4028, "wood"), ceil: gldMat(0x3A2A1A, "wood"), beams: true, beamMat: dk, name: "the Captain's cabin", doors: { s: [{ at: 19, w: 2, h: 2.6 }] } });
gldGate(G, "x", 19, -20.35, y, 2, 4, "The Captain's cabin");
gldBed(22.6, y, -29.6, 0, { wood: "dark", col: 0x1A2A3A, curtain: 0x3A2A1A, border: 0xC8A040 });
gldChest(16, y, -31.2, 0, 0x2A1A10);
gldDesk(16, y, -25, Math.PI / 2, { lamp: true });
gldChair(17, y, -25, -Math.PI / 2, { wood: "dark", cushion: 0x5A2A1A });
gldRug(19, y, -26, 0, 4, 3, 0x3A1A1A, 0xC8A040, 0x1A2A3A);
gldModelShip(16, y + 0.55, -31.2, Math.PI / 2, 0.5);
gldBox(3, 1.4, 0.05, gldGlowM(0x2A3A5A, 0.9), 19, y + 2.0, -31.48);
for (var pn = 0; pn < 4; pn++)
gldBox(0.06, 1.4, 0.08, dk, 17.5 + pn * 1.0, y + 2.0, -31.44);
var tel = gldCyl(0.06, 0.9, GLD_BRASS(), 23.4, y + 1.4, -22, null, 10, 0.04);
tel.rotation.z = 1.2;
gldPainting(23.45, y + 2.0, -24.4, -Math.PI / 2, 1.2, 0.9, "smu_c1", "ship");
gldLantern(19, y + 2.8, -26, amb, 0.2);
return { front: { x: 2.4, z: 8.6, yaw: 0 }, in: { x: -1, z: -11, y: y, yaw: 0 }, master: { x: -7, z: -16.4, y: y, yaw: Math.PI }, boat: { x: 0, z: -22.4, y: y + 0.3, yaw: 0 }, store: { x: 16, z: -14, y: y, yaw: -Math.PI / 2 } };
},
function (G) {
var L = worldLocal(), under = L.y - 1.72 < -1, n = gldNight(), k = n ? 0.82 : 1;
if (GLD.mats.win && Date.now() - (GLD.winAt || 0) > 5000) {
GLD.winAt = Date.now();
GLD.mats.win.color.setHex(gldSkyCol());
}
if (G.k === "spider")
return { top: 0x06040A, low: 0x0C0812, fogD: 0.012, fog: 0x0A0810, sun: 0.3, sunCol: 0xC8A8FF, sunDir: [0.2, 0.9, 0.3], hemi: under ? 1.45 : 0.95 * k, hemiCol: under ? 0xD8CCE8 : 0xE8E0D8, hemiGround: 0x2A2030, stars: 0 };
if (G.k === "thieves")
return { top: 0x080604, low: 0x100C08, fogD: 0.012, fog: 0x0E0A08, sun: 0.3, sunCol: 0xFFC890, sunDir: [0.2, 0.9, 0.3], hemi: under ? 1.1 : 0.95 * k, hemiCol: 0xF0D8B8, hemiGround: 0x3A2A1A, stars: 0 };
if (G.k === "smugglers")
return { top: 0x04080C, low: 0x0A1218, fogD: 0.012, fog: 0x0A1218, sun: 0.3, sunCol: 0xFFC890, sunDir: [0.2, 0.9, 0.3], hemi: under ? 1.35 : 0.95 * k, hemiCol: under ? 0xD8E0E8 : 0xF0E0C8, hemiGround: 0x1A2A30, stars: 0 };
if (G.k === "smiths")
return { top: 0x0E0A08, low: 0x1A120C, fogD: 0.006, fog: 0x1A120C, sun: 0.4, sunCol: 0xFFC8A0, sunDir: [0.2, 0.9, 0.3], hemi: 1.0 * k, hemiCol: 0xFFE0C8, hemiGround: 0x4A3428, stars: 0 };
return { top: 0x1A1610, low: 0x2A2418, fogD: 0.004, fog: 0x2A2418, sun: 0.42 * k, sunCol: 0xFFF0D8, sunDir: [0.2, 0.9, 0.3], hemi: 0.92 * k, hemiCol: 0xFFF2E0, hemiGround: 0x5A4A3A, stars: 0 };
},
function (G, W) {
GLD.G = W;
GLD.lite = gldLite();
GLD.geos = {};
var K = GLD.K = gldCtx();
K.F = W;
GLK = K;
GLD.k = G.k;
var fn = window[GLD_BUILD[G.k]];
try {
GLD_AT[G.k] = fn ? fn(G) || {} : {};
}
catch (e) {
if (window.console)
console.warn("[city-guilds] build", G.k, e);
GLD_AT[G.k] = GLD_AT[G.k] || { front: { x: 0, z: 8, yaw: 0 } };
}
try {
if (typeof gwBake === "function")
gwBake(W);
}
catch (e) {
if (window.console)
console.warn("[city-guilds] bake", e);
}
W.traverse(function (o) { if (!o.isSprite)
o.raycast = function () { }; });
GLD.built = G.k;
GLD.builtCfg = JSON.stringify(gldCfg().guilds[G.k] || {});
},
function () {
for (var k in GLD.mats) {
var m = GLD.mats[k];
if (m && m.map && m.map.isCanvasTexture)
try {
m.map.dispose();
}
catch (e) { }
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var g in GLD.geos) {
try {
GLD.geos[g].dispose();
}
catch (e) { }
}
GLD.mats = {};
GLD.geos = {};
GLD.K = null;
GLD.G = null;
GLD.built = "";
GLK = null;
GLD.k = "";
GLD.atBench = null;
},
function (G, dt) {
var K = GLD.K;
if (!K || GLD.k !== G.k)
return;
GLK = K;
GLD.t += dt;
var t = GLD.t;
gldHold(K);
try {
gldFlamesTick(t, K.flames);
gldSecretsTick(dt, K.secrets);
gldGatesTick(dt, K);
gldPeopleTick(dt, K);
gldCreaturesTick(t, K.fx);
var working = !!GLD.atBench;
K.spin.forEach(function (S) { var sp = S.sp || (working ? 3 : 0); if (sp)
S.m.rotation[S.ax] += dt * sp; });
}
catch (e) {
if (!GLD.e1) {
GLD.e1 = 1;
if (window.console)
console.warn("[city-guilds] tick", e);
}
}
var L = worldLocal(), feet = L.y - 1.72, r = gldRoomAt(K, L.x, L.z, feet), nm = r ? r.name : "";
var label = G.open ? G.name : (feet < -1 || gldRankHere(G.k) ? G.name : gldCover(G, "label"));
worldBanner("<b>" + G.icon + " " + gldEsc(label) + "</b>" + (nm ? " · " + gldEsc(nm) : ""));
GLD.pt += dt;
if (GLD.pt < 0.15)
return;
GLD.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
if (GLD.myFn && WLD.promptFn === GLD.myFn)
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
K.spots.forEach(function (s) {
if (Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1 || Math.abs(feet - s.y) > 2.2)
return;
if (s.when && !s.when())
return;
var d = Math.hypot(L.x - s.x, L.z - s.z);
if (d < s.r && d / s.r < bd) {
bd = d / s.r;
best = s;
}
});
if (best) {
var fn = best.fn;
GLD.myFn = fn;
worldPrompt("<b>" + best.name + "</b> · <b>press E</b> to " + gldEsc(best.verb), fn);
}
else if (GLD.myFn && WLD.promptFn === GLD.myFn) {
worldPrompt(null);
GLD.myFn = null;
}
},
function () {
gldMeFetch().then(function () {
var b = "", fns = {}, k = gldKeeper();
var rows = [["Your guilds", Object.keys((GLD.me && GLD.me.guilds) || {}).map(function (g) { var G = GLD_BY[g], m = gldMine(g); return G ? G.name + " (" + G.ranks[m.rank - 1] + ")" : g; }).join(", ") || "none yet (you may belong to two)"]];
GLD_GUILDS.forEach(function (G) {
if (!G.open && !k && !gldMine(G.k))
return;
var sub = G.where + (G.built ? "" : " · coming soon");
if (!G.built) {
b += "<div style='margin:6px 0;padding:7px 10px;border:1px solid rgba(143,180,232,.25);border-radius:4px;opacity:.55'><b>" + G.icon + " " + gldEsc(G.name) + "</b><div style='font-size:12px'>" + gldEsc(sub) + "</div></div>";
return;
}
b += worldBtn("w_" + G.k, G.icon + " " + gldEsc(G.name) + (G.open ? "" : " (hidden)"), gldEsc(sub) + " · take me to its door");
fns["w_" + G.k] = function () { worldCard(null); gldToDoor(G); };
if (k || gldMine(G.k)) {
b += worldBtn("g_" + G.k, "&nbsp;&nbsp;↳ Go straight in", "");
fns["g_" + G.k] = function () { worldCard(null); gldGo(G, G.open ? "front" : "in"); };
}
});
var W = GLD.me && GLD.me.work;
if (W) {
b = worldBtn("cur", "Your work now: " + gldEsc((gldJob(W.job) || {}).n || ""), gldEsc(gldWorkLine(W))) + b;
fns.cur = function () { worldCard(null); gldShowWay(W); };
}
worldCard(worldFacts("🛡️ The guilds of Somnucor", "the city's chartered guilds, each in its own house", rows, ["Walk in, talk to the master, sign the roll. The work is real, in real minutes. Gold for dues-payers 18 and over."]) + b, fns);
});
},
function (G) {
try {
if (typeof WLD !== "undefined" && WLD.on)
worldHome("");
}
catch (e) { }
try {
if (typeof inSomnucorNow === "function" && !inSomnucorNow() && typeof somnucorRealm === "function" && somnucorRealm() && typeof visitRealm === "function")
visitRealm(somnucorRealm().id);
}
catch (e) { }
setTimeout(function () {
var D = gldCityDoor(G);
if (!D)
return;
if (typeof setWalk === "function")
setWalk(true);
camera.position.set(D.x, (typeof terrainY === "function" ? terrainY(D.x, D.z) : 0) + 1.72, D.z);
yaw = D.yaw;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
gldSay(G.icon + " <b>" + gldEsc(G.open ? G.name : "The door") + "</b> is before you. Press E to go in.");
}, 400);
},
function (G, w, h, y, z, face, o) {
o = o || {};
var wl = gldMat(G.col.wall, "plaster"), bm = gldMat(G.col.beam, "wood");
gldBox(w, h, 0.4, wl, 0, y + h / 2, z);
for (var x = -w / 2 + 0.3; x <= w / 2 - 0.2; x += 2.0)
gldBox(0.22, h, 0.1, bm, x, y + h / 2, z + face * 0.24);
gldBox(w, 0.24, 0.12, bm, 0, y + 0.12, z + face * 0.25);
gldBox(w, 0.24, 0.12, bm, 0, y + h - 0.12, z + face * 0.25);
gldBox(w, 0.18, 0.1, bm, 0, y + h * 0.5, z + face * 0.25);
if (o.braces)
for (var b = -w / 2 + 1.3; b < w / 2 - 1; b += 4) {
var br = gldBox(0.16, h * 0.62, 0.08, bm, b, y + h * 0.25, z + face * 0.27);
br.rotation.z = 0.6;
}
},
function (G) {
var w = G.pos.w, d = G.pos.d, st = gldMat(0x8A8070, "stone"), roof = gldMat(G.col.roof, "shingle"), bm = gldMat(G.col.beam, "wood");
gldBox(w, 0.6, d, st, 0, 0.3, 0);
gldTimberWall(G, w, 5, 0.6, d / 2 - 0.2, 1, { braces: true });
gldBox(w + 0.6, 0.3, 0.9, bm, 0, 5.75, d / 2 + 0.2);
gldTimberWall(G, w + 0.6, 4, 5.9, d / 2 + 0.35, 1, { braces: false });
gldBox(w, 9.3, d - 1, gldMat(G.col.wall, "plaster"), 0, 5.25, -0.5);
gldPitchRoof(w, d + 0.6, 9.9, 6, roof, "z");
[-1, 1].forEach(function (s) { gldBox(1.6, 3.2, 1.6, gldMat(0x6A4A3A, "brick"), s * (w / 2 - 3), 14.0, -2); });
for (var i = 0; i < 6; i++) {
var x = -w / 2 + 3 + i * (w - 6) / 5;
if (Math.abs(x) < 2.5)
continue;
gldLitWindow(x, 2.0, d / 2 + 0.02, 1.4, 2.0, 0, 0xFFD890);
gldLitWindow(x, 6.9, d / 2 + 0.6, 1.4, 1.8, 0, 0xFFD890);
}
gldBox(3.4, 4, 0.4, gldMat(0x2A1E14, "wood"), 0, 2.6, d / 2 + 0.02);
gldDoorLeaves(2.6, 3.4, d / 2 + 0.12, 0x4A2A14);
var ar = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.18, 6, 16, Math.PI), bm);
ar.position.set(0, 4.0, d / 2 + 0.24);
gldP().add(ar);
gldSign(["THE ARTISANS' GUILD", "of Somnucor · all are welcome"], 5.6, 1.2, "#2A1A0E", "#F0DCA8", 0, 5.0, d / 2 + 0.5, 0);
[-1, 1].forEach(function (s) { gldBanner(s * 4.2, 6.2, d / 2 + 0.9, 0, 1.3, 2.8, 0x6A2A1A, 0xC8A040, "hand"); gldLantern(s * 2.2, 3.2, d / 2 + 0.5, 0xFFC070, 0); });
var br = gldPiece(w / 2 - 1.6, 4.6, d / 2 + 0.4, 0);
gldBox(0.08, 0.08, 1.6, GLD_IRON(), 0, 0, 0.8, br);
gldBox(1.0, 0.8, 0.06, gldBannerMat(0x2A3A5A, 0xE8C890, "hand"), 0, -0.55, 1.2, br);
[-9, -5, 5, 9].forEach(function (bx) { gldBench(bx, 0.6, d / 2 + 2.0, Math.PI, 2.2); });
gldBarrel(w / 2 - 0.8, 0, d / 2 + 1.2, 0.9);
gldCrate(-w / 2 + 1, 0, d / 2 + 1.2, 0.3, 0.9);
return [{ x: 0, z: 0, hw: w / 2 + 0.4, hd: d / 2 + 0.5, h: 16 }];
},
function (G) {
var w = G.pos.w, d = G.pos.d, st = gldMat(G.col.wall, "stone"), dk = gldMat(0x4A4440, "stone"), roof = gldMat(G.col.roof, "slate");
gldBox(w, 0.5, d, dk, 0, 0.25, 0);
gldBox(w, 8, d, st, 0, 4.5, 0);
for (var x = -w / 2; x <= w / 2; x += w / 6)
gldBox(0.8, 8.2, 0.6, dk, x, 4.6, d / 2 + 0.1);
gldPitchRoof(w, d, 8.5, 5, roof, "z");
[-1, 1].forEach(function (s) { gldBox(2.2, 9, 2.2, gldMat(0x5A3A2A, "brick"), s * (w / 2 - 4), 9.5, -3); gldBox(2.6, 0.4, 2.6, dk, s * (w / 2 - 4), 14.1, -3); gldBox(1.2, 0.2, 1.2, gldGlowM(0xFF7A2A, 0.6), s * (w / 2 - 4), 14.35, -3); });
var ar = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.35, 8, 18, Math.PI), dk);
ar.position.set(0, 4.5, d / 2 + 0.2);
gldP().add(ar);
gldBox(4.8, 4.5, 0.2, gldMat(0x2A1A10, null), 0, 2.75, d / 2 + 0.02);
gldDoorLeaves(4.4, 4.5, d / 2 + 0.14, 0x3A2414);
gldBox(4.0, 1.8, 0.08, gldGlowM(0xFF8A3A, 0.55), 0, 5.6, d / 2 + 0.08);
for (var i = 0; i < 4; i++) {
var wx = -w / 2 + 3 + i * (w - 6) / 3;
if (Math.abs(wx) < 3.5)
continue;
gldLitWindow(wx, 2.2, d / 2 + 0.05, 1.4, 2.4, 0, 0xFFA060);
}
gldSign(["THE WORSHIPFUL COMPANY OF SMITHS", "smiths · armourers · farriers"], 7, 1.3, "#1A1412", "#F0C890", 0, 7.6, d / 2 + 0.35, 0);
[-1, 1].forEach(function (s) { gldBanner(s * 6.5, 5.0, d / 2 + 0.6, 0, 1.5, 3.0, 0x2A2420, 0xE88A3A, "hammers"); gldAnvil(s * 4.2, 0.5, d / 2 + 1.5, s * 0.4); });
gldTrough(-w / 2 + 2.5, 0.5, d / 2 + 1.6, 0);
gldRack(w / 2 - 2.8, 0.5, d / 2 + 0.6, 0, 2.4, "shoes");
return [{ x: 0, z: 0, hw: w / 2 + 0.5, hd: d / 2 + 0.4, h: 14 }];
},
function (G) {
var w = G.pos.w, d = G.pos.d, br = gldMat(G.col.wall, "brick"), roof = gldMat(G.col.roof, "metalroof");
gldBox(w, 3.6, d, br, 0, 1.8, 0);
var rf = gldBox(w + 0.6, 0.12, d + 0.8, roof, 0, 3.75, 0);
rf.rotation.x = 0.08;
gldBox(1.3, 2.3, 0.12, gldMat(0x3A3026, "wood"), 0.6, 1.15, d / 2 + 0.05);
gldBox(1.1, 0.06, 0.06, GLD_IRON(), 0.6, 1.6, d / 2 + 0.13);
gldLitWindow(-1.6, 1.4, d / 2 + 0.02, 0.8, 0.7, 0, 0x6A5030);
gldBarrel(-w / 2 - 0.6, 0, d / 2 - 0.5, 0.8);
gldCrate(w / 2 + 0.6, 0, d / 2 - 1.2, 0.5, 0.8);
gldCrate(w / 2 + 0.6, 0.7 * 0.8, d / 2 - 1.2, 0.2, 0.6);
gldSack(-w / 2 - 0.5, 0, d / 2 + 0.6, 0x6A5A40);
gldSack(-w / 2 - 1.0, 0, d / 2 + 1.0, 0x5A4A30);
gldBox(0.06, 2.6, 0.06, gldW("dark"), -w / 2 - 0.3, 1.3, d / 2 + 3.5);
gldBox(0.06, 2.6, 0.06, gldW("dark"), w / 2 + 3, 1.3, d / 2 + 3.5);
gldBox(w / 2 + 3.3 + w / 2, 0.01, 0.01, gldMat(0xD8D0C0, null), (w / 2 + 3 - w / 2 - 0.3) / 2, 2.5, d / 2 + 3.5);
[[-1.5, 0x8A3A2A], [-0.4, 0xD8D0C0], [0.8, 0x3A4A6A], [2.0, 0xE8E0D0]].forEach(function (q) { gldBox(0.7, 0.9, 0.02, gldCloth(q[1], 0x1A1A1A, 0), q[0], 2.02, d / 2 + 3.5); });
var cat = gldPiece(-w / 2 + 0.6, 3.7, d / 2 - 0.6, 0.8);
var cb = gldSph(0.14, gldMat(0x2A2420, null), 0, 0.12, 0, cat, 8);
cb.scale.set(0.8, 0.8, 1.5);
gldSph(0.09, gldMat(0x2A2420, null), 0, 0.24, 0.2, cat, 8);
[-1, 1].forEach(function (s) { gldCyl(0.0, 0.06, gldMat(0x2A2420, null), s * 0.05, 0.32, 0.22, cat, 4, 0.03); });
var tl = gldCyl(0.02, 0.35, gldMat(0x2A2420, null), 0, 0.1, -0.3, cat, 5);
tl.rotation.x = 1.2;
gldLantern(-0.5, 2.6, d / 2 + 0.3, 0xFFB050, 0);
return [{ x: 0, z: 0, hw: w / 2 + 0.2, hd: d / 2 + 0.2, h: 4 }];
},
function (G) {
var w = G.pos.w, d = G.pos.d, wl = gldMat(G.col.wall, "plaster"), bm = gldMat(G.col.beam, "wood"), roof = gldMat(G.col.roof, "shingle"), red = 0x8A1A1A, gold = 0xD8A040;
gldBox(w, 0.4, d, gldMat(0x8A7A60, "paving"), 0, 0.2, 0);
gldBox(w - 4, 8, d - 4, wl, 0, 4.4, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) {
var x = q[0] * (w / 2 - 2.2), z = q[1] * (d / 2 - 2.2);
gldCyl(2.4, 10, wl, x, 5.4, z, null, 16);
var cap = gldCyl(2.8, 2.6, roof, x, 11.7, z, null, 16, 0.1);
gldFlagPole(x, 13.0, z, 3.2, [red, 0x2A3A8A, gold, 0x1A5A3A][(q[0] + 1) + (q[1] + 1) / 2], 0xF0E0C0, "mask");
});
gldBox(w - 4, 0.6, d - 4, bm, 0, 8.7, 0);
for (var i = 0; i < 10; i++) {
var cx = -w / 2 + 5 + i * (w - 10) / 9;
gldBox(1.0, 0.9, 0.6, wl, cx, 9.45, d / 2 - 2);
}
gldBox(4, 4.2, 0.2, gldMat(0x2A1A10, null), 0, 2.5, d / 2 - 1.95);
gldDoorLeaves(3.4, 3.8, d / 2 - 1.85, 0x5A1A1A);
var aw = gldPiece(0, 4.6, d / 2 - 1.6, 0);
for (var s2 = 0; s2 < 8; s2++) {
var st = gldBox(0.75, 0.05, 2.2, gldCloth(s2 % 2 ? red : 0xF0E0C0, 0x3A0A0A, 0), -2.6 + s2 * 0.75, 0, 1.0, aw);
st.rotation.x = 0.35;
}
gldSign(["THE BARDS AND PLAYERS", "the playhouse of the Riad Quarter"], 7, 1.2, "#3A0A0A", "#F0D8A0", 0, 6.4, d / 2 - 1.75, 0);
[-1, 1].forEach(function (s) {
gldPlane(1.4, 2.0, gldCanvasMat("billout" + s, 96, 140, function (x, W, H) {
x.fillStyle = "#E8DCC0";
x.fillRect(0, 0, W, H);
x.fillStyle = "#8A1A1A";
x.font = "bold 12px Georgia";
x.textAlign = "center";
x.fillText(s < 0 ? "TONIGHT" : "ALL WEEK", W / 2, 20);
x.fillStyle = "#1A1A1A";
x.font = "11px Georgia";
(s < 0 ? ["Twelfth", "Night", "", "W. Shakespeare", "", "the eighth bell"] : ["Songs and", "Ballads of", "the Old", "Country", "", "the sixth bell"]).forEach(function (l, i) { x.fillText(l, W / 2, 42 + i * 15); });
}), s * 4.0, 2.4, d / 2 - 1.88, 0);
gldLitWindow(s * 8.5, 2.0, d / 2 - 1.98, 1.4, 2.2, 0, 0xFFC890);
gldLitWindow(s * 8.5, 5.6, d / 2 - 1.98, 1.4, 1.8, 0, 0xFFC890);
gldLantern(s * 2.6, 3.8, d / 2 - 1.4, 0xFFC890, 0);
});
gldBench(-7, 0.4, d / 2 + 0.8, Math.PI, 2.4);
gldBench(7, 0.4, d / 2 + 0.8, Math.PI, 2.4);
gldDrum(10.8, 0.4, d / 2 + 0.6, 1.0);
var B = [];
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { B.push({ x: q[0] * (w / 2 - 2.2), z: q[1] * (d / 2 - 2.2), hw: 2.4, hd: 2.4, h: 13 }); });
B.push({ x: 0, z: 0, hw: w / 2 - 1.8, hd: d / 2 - 1.8, h: 10 });
return B;
},
function (G) {
var w = G.pos.w, d = G.pos.d, st = gldMat(0x6A6460, "stone"), tw = gldMat(G.col.wall, "wood"), roof = gldMat(G.col.roof, "slate"), nav = 0x1A2A4A, cream = 0xE8E0C8;
gldBox(w, 3, d, st, 0, 1.5, 0);
gldBox(w, 6, d, tw, 0, 6, 0);
for (var x = -w / 2 + 0.5; x <= w / 2; x += 1.0)
gldBox(0.04, 6, 0.06, gldMat(0x1E1A16, null), x, 6, d / 2 + 0.02);
gldBox(w + 0.4, 0.3, d + 0.4, gldMat(0x2A3A4A, "wood"), 0, 9.1, 0);
gldPitchRoof(w, d, 9.2, 5, roof, "z");
gldBox(3.2, 4, 0.2, gldMat(0x1E1A16, null), 0, 2.0, d / 2 + 0.02);
gldDoorLeaves(2.8, 3.6, d / 2 + 0.12, 0x2A3A4A);
for (var i = 0; i < 6; i++) {
var px = -w / 2 + 3 + i * (w - 6) / 5;
if (Math.abs(px) < 3)
continue;
var ph = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.12, 6, 16), GLD_BRASS());
ph.position.set(px, 6.2, d / 2 + 0.1);
gldP().add(ph);
var gl = new THREE.Mesh(new THREE.CircleGeometry(0.6, 16), gldGlowM(0xFFE0A0, 0.9));
gl.position.set(px, 6.2, d / 2 + 0.06);
gldP().add(gl);
gldLitWindow(px, 1.0, d / 2 + 0.02, 1.2, 1.6, 0, 0xFFE0A0);
}
var fh = gldPiece(0, 4.6, d / 2 + 0.3, 0);
gldBox(0.5, 0.9, 0.4, gldMat(0xE8E0C8, "wood"), 0, 0.5, 0.2, fh).rotation.x = 0.35;
gldSph(0.2, gldMat(0xE8E0C8, "wood"), 0, 1.15, 0.45, fh, 10);
gldBox(0.7, 0.25, 0.6, gldMat(0xC8A040, "wood"), 0, 0.0, 0.15, fh);
gldSign(["THE MARINERS' GUILD", "pilots · crews · the rope walk"], 6, 1.1, "#1A2A4A", "#E8E0C8", 0, 7.6, d / 2 + 0.08, 0);
[-1, 1].forEach(function (s) { gldBanner(s * 4.2, 3.4, d / 2 + 0.12, 0, 1.2, 2.4, nav, cream, "anchor"); gldLantern(s * 2.0, 3.4, d / 2 + 0.5, 0xFFE0A0, 0); });
gldAnchor(-w / 2 + 2.6, 0, d / 2 + 1.4, 0.3, 1.3);
gldRopeCoil(w / 2 - 2.6, 0, d / 2 + 1.4, 1.3);
gldBarrel(w / 2 - 4.2, 0, d / 2 + 1.2, 1.0);
gldFlagPole(w / 2 - 1.2, 14.2, -2, 4.2, nav, cream, "anchor");
return [{ x: 0, z: 0, hw: w / 2 + 0.2, hd: d / 2 + 0.2, h: 15 }];
},
function (G) {
var w = G.pos.w, d = G.pos.d, tw = gldMat(0x2A2620, "wood"), roof = gldMat(G.col.roof, "metalroof");
gldBox(w, 0.3, d, gldMat(0x5A5450, "stone"), 0, 0.15, 0);
gldBox(w, 4, d, tw, 0, 2.3, 0);
for (var x = -w / 2 + 0.3; x <= w / 2; x += 0.6)
gldBox(0.04, 4, 0.05, gldMat(0x1A1612, null), x, 2.3, d / 2 + 0.02);
var rf = gldBox(w + 0.6, 0.12, d + 0.8, roof, 0, 4.4, 0);
rf.rotation.x = 0.07;
gldBox(1.6, 2.6, 0.12, gldMat(0x4A3A2A, "wood"), 2.4, 1.6, d / 2 + 0.05);
gldSph(0.05, GLD_IRON(), 1.8, 1.5, d / 2 + 0.14, null, 8);
gldLitWindow(-2, 1.4, d / 2 + 0.02, 1.4, 1.0, 0, 0xFFC870);
gldSign(["J. TREGARTHEN", "cooper · casks mended"], 2.6, 0.6, "#2A2018", "#E8D8B0", -1.4, 3.4, d / 2 + 0.1, 0);
for (var b = 0; b < 6; b++)
gldBarrel(-w / 2 - 0.6, (b > 3 ? 0.81 : 0), d / 2 - 1.2 - (b % 4) * 0.75, 0.9);
gldBarrel(w / 2 + 0.6, 0, d / 2 - 0.6, 1.0);
gldCrate(w / 2 + 0.7, 0, d / 2 - 2.0, 0.3, 0.9);
gldLantern(0.6, 3.0, d / 2 + 0.5, 0xFFC070, 0);
return [{ x: 0, z: 0, hw: w / 2 + 0.2, hd: d / 2 + 0.2, h: 4.6 }, { x: -w / 2 - 0.6, z: d / 2 - 2.3, hw: 0.4, hd: 1.6, h: 1.6 }, { x: w / 2 + 0.65, z: d / 2 - 1.3, hw: 0.45, hd: 1.2, h: 1.0 }];
},
function (rm, doors) {
var W = [], real = doors.filter(function (d) { return !d.win; });
real.forEach(function (d, i) {
var o = { x: d.x, z: d.z };
if (Math.abs(d.z - rm.z0) < 0.01)
o = { x: d.x, z: rm.z1 };
else if (Math.abs(d.z - rm.z1) < 0.01)
o = { x: d.x, z: rm.z0 };
else if (Math.abs(d.x - rm.x0) < 0.01)
o = { x: rm.x1, z: d.z };
else
o = { x: rm.x0, z: d.z };
W.push([d, o, 0.85]);
for (var j = i + 1; j < real.length; j++)
W.push([d, real[j], 0.85]);
});
return W;
},
function (K, keep, x, z, y, r, doors, ways) {
if (ways)
for (var w = 0; w < ways.length; w++)
if (gldSwkSegD(x, z, ways[w][0], ways[w][1]) < ways[w][2] + Math.min(r, 0.9) * 0.7)
return GLD_SWK_WHY("way");
var pts = [[0, 0], [r, 0], [-r, 0], [0, r], [0, -r], [r * 0.7, r * 0.7], [-r * 0.7, r * 0.7], [r * 0.7, -r * 0.7], [-r * 0.7, -r * 0.7]];
for (var i = 0; i < pts.length; i++) {
var px = x + pts[i][0], pz = z + pts[i][1];
if (!gldSwkFloorAt(K, px, pz, y))
return GLD_SWK_WHY("floor");
if (worldSolidAt(K.solids, px, pz, y + 0.3))
return GLD_SWK_WHY("solid");
}
if (gldSwkNearRamp(K, x, z, r + 1.2))
return GLD_SWK_WHY("ramp");
for (var k = 0; k < keep.length; k++) {
var q = keep[k];
if (q.y !== undefined && Math.abs(q.y - y) > 1.5)
continue;
if (Math.hypot(q.x - x, q.z - z) < (q.r || 0) + r + 0.4)
return GLD_SWK_WHY("keep");
}
for (var d = 0; d < doors.length; d++) {
var D = doors[d];
if (D.win)
continue;
if (Math.hypot(D.x - x, D.z - z) < D.w / 2 + r + 1.4)
return GLD_SWK_WHY("door");
}
return true;
},
function (rm) {
var out = [], D = rm.doors || {};
var win = function (o) { return !!(o && o.sill && o.sill > 0.4); };
(D.n || []).forEach(function (o) { out.push({ x: o.at, z: rm.z0, w: o.w || 1.6, win: win(o) }); });
(D.s || []).forEach(function (o) { out.push({ x: o.at, z: rm.z1, w: o.w || 1.6, win: win(o) }); });
(D.w || []).forEach(function (o) { out.push({ x: rm.x0, z: o.at, w: o.w || 1.6, win: win(o) }); });
(D.e || []).forEach(function (o) { out.push({ x: rm.x1, z: o.at, w: o.w || 1.6, win: win(o) }); });
return out;
},
function (kind, x, y, z, ry, h, seed) {
var p = kind.split(":"), what = p[1];
if (p[0] === "shelf")
return gldShelves(x, y, z, ry, 1.5, Math.min(2.2, h), what, { n: 4, seed: seed });
if (p[0] === "rack")
return gldRack(x, y, z, ry, 1.5, what);
if (kind === "barrel") {
gldBarrel(x - 0.35, y, z, 1);
gldBarrel(x + 0.38, y, z + 0.05, 0.9);
if (seed % 2)
gldBarrel(x, y + 0.9, z, 0.8);
return;
}
if (kind === "crates") {
gldCrate(x - 0.4, y, z, 0.1, 1);
gldCrate(x + 0.4, y, z, -0.2, 0.9);
gldCrate(x - 0.3, y + 0.7, z, 0.4, 0.8);
return;
}
if (kind === "sacks") {
var cs = [0x9A8A60, 0xB0A070, 0x8A7A50];
for (var i = 0; i < 4; i++)
gldSack(x - 0.6 + i * 0.4, y, z + (i % 2) * 0.15, cs[i % 3]);
return;
}
if (kind === "chest")
return gldChest(x, y, z, ry);
if (kind === "coal") {
gldBarrel(x - 0.4, y, z, 1);
gldCrate(x + 0.4, y, z, 0.3, 0.9);
gldSack(x + 0.4, y + 0.63, z, 0x3A3632);
return;
}
if (kind === "rope") {
var rm = gldMat(0xB49A68, "canvas");
for (var c = 0; c < 3; c++) {
var t = new THREE.Mesh(new THREE.TorusGeometry(0.32 - c * 0.04, 0.07, 6, gldSeg(16)), rm);
t.rotation.x = Math.PI / 2;
t.position.set(x + (c - 1) * 0.75, y + 0.07, z);
GLK.F.add(t);
gldRound(x + (c - 1) * 0.75, z, 0.38, y, 0.2);
}
gldCrate(x, y + 0.14, z, 0, 0.6);
return;
}
},
function (kind, x, y, z, ry, seed, key) {
if (kind === "bench") {
gldWorkbench(x, y, z, ry);
gldStool(x + Math.sin(ry) * 0.9, y, z + Math.cos(ry) * 0.9);
return 1.6;
}
if (kind === "anvil") {
gldAnvil(x, y, z, ry);
gldTrough(x + Math.cos(ry) * 1.3, y, z - Math.sin(ry) * 1.3, ry);
return 1.6;
}
if (kind === "desk") {
gldDesk(x, y, z, ry);
gldChair(x + Math.sin(ry) * 0.75, y, z + Math.cos(ry) * 0.75, ry + Math.PI);
return 1.3;
}
if (kind === "chart") {
gldMapTable(x, y, z, ry, 1.8, 1.1, key);
return 1.4;
}
if (kind === "bed") {
gldBed(x, y, z, ry);
return 1.4;
}
if (kind === "stack") {
gldCrate(x - 0.4, y, z - 0.3, 0.2, 1);
gldCrate(x + 0.42, y, z - 0.25, -0.3, 1);
gldCrate(x, y + 0.7, z - 0.3, 0.5, 0.9);
gldBarrel(x + 0.1, y, z + 0.55, 1);
gldSack(x - 0.55, y, z + 0.45, 0xA89868);
return 1.2;
}
if (kind === "sacks") {
for (var i = 0; i < 6; i++)
gldSack(x - 0.5 + (i % 3) * 0.5, y + (i > 2 ? 0.42 : 0), z - 0.2 + (i % 2) * 0.3, [0x9A8A60, 0xB0A070][i % 2]);
gldSolid(x, z, 0.85, 0.45, y, 0.9);
return 1.0;
}
if (kind === "pots") {
var t = gldTable(x, y, z, ry, 1.6, 0.8, { wood: "pale" });
var cl = gldMat(0xA8643A, "floortile");
for (var p = 0; p < 5; p++)
gldCyl(0.09 + (p % 3) * 0.03, 0.18 + (p % 2) * 0.1, cl, -0.6 + p * 0.3, 0.87 + (0.09 + (p % 2) * 0.05), 0, t, 10, 0.07);
gldStool(x + Math.sin(ry) * 0.8, y, z + Math.cos(ry) * 0.8);
return 1.3;
}
if (kind === "herbs") {
var t2 = gldTable(x, y, z, ry, 1.6, 0.8, { wood: "pale" });
var hb = gldMat(0x5A7A3A, "leaf"), jr = gldMat(0x8A9AA0, null, { phong: 60 });
for (var q = 0; q < 6; q++) {
if (q % 2)
gldCyl(0.06, 0.16, jr, -0.6 + q * 0.24, 0.86, 0.15, t2, 8);
else
gldSph(0.1, hb, -0.6 + q * 0.24, 0.84, -0.1, t2, 6);
}
gldStool(x + Math.sin(ry) * 0.8, y, z + Math.cos(ry) * 0.8);
return 1.3;
}
if (kind === "cards") {
var t3 = gldTable(x, y, z, ry, 1.1, 1.1, { wood: "dark" });
var cd = gldMat(0xEDE4CC, null);
for (var c = 0; c < 5; c++) {
var b = gldBox(0.07, 0.005, 0.1, cd, -0.25 + c * 0.12, 0.79, (c % 2) * 0.1, t3);
b.rotation.y = c * 0.6;
}
gldCyl(0.05, 0.12, gldMat(0x6A4A2A, "wood"), 0.3, 0.84, -0.25, t3, 8);
[0, 1, 2].forEach(function (s) { var a = ry + s * 2.1; gldStool(x + Math.sin(a) * 0.95, y, z + Math.cos(a) * 0.95); });
return 1.5;
}
var t4 = gldTable(x, y, z, ry, 1.8, 0.9, { wood: "oak" });
var m = gldMat(0xEDE4CC, null), w = gldW("dark");
gldBox(0.3, 0.04, 0.22, m, -0.5, 0.8, 0, t4);
gldBox(0.24, 0.18, 0.24, w, 0.4, 0.87, 0.1, t4);
gldCyl(0.06, 0.16, gldMat(0x7A6A50, null), 0.0, 0.86, -0.2, t4, 8);
gldBench(x + Math.sin(ry) * 0.8, y, z + Math.cos(ry) * 0.8, ry, 1.4);
return 1.5;
},
function (G, A) {
var K = GLK, T = GLD_SWEEP[G.k];
if (!K || !T)
return;
var lite = !!GLD.lite, seed = gldHash("sweep" + G.k), n = 0, ppl = 0, maxP = lite ? 3 : 7, maxN = lite ? 40 : 90;
var keep = [];
["front", "in", "master"].forEach(function (k) { var p = A && A[k]; if (p && typeof p.x === "number")
keep.push({ x: p.x, z: p.z, r: 1.0, y: p.y }); });
K.spots.forEach(function (s) { keep.push({ x: s.x, z: s.z, r: /^🚪/.test(s.name || "") ? 1.4 : 0.5, y: s.y }); });
K.people.forEach(function (p) { keep.push({ x: p.x, z: p.z, r: 0.5, y: p.y }); });
var rooms = K.rooms.slice();
rooms.forEach(function (rm, ri) {
if (!rm.doors)
return;
var y = rm.y || 0, h = rm.h || 4, doors = gldSwkDoors(rm), ways = gldSwkWays(rm, doors), wi = 0, ii = 0;
var walls = [
{ a0: rm.x0, a1: rm.x1, c: rm.z0 + 0.5, ax: "x", ry: 0, s: "n" }, { a0: rm.x0, a1: rm.x1, c: rm.z1 - 0.5, ax: "x", ry: Math.PI, s: "s" },
{ a0: rm.z0, a1: rm.z1, c: rm.x0 + 0.5, ax: "z", ry: Math.PI / 2, s: "w" }, { a0: rm.z0, a1: rm.z1, c: rm.x1 - 0.5, ax: "z", ry: -Math.PI / 2, s: "e" }
];
walls.forEach(function (W) {
if ((rm.skip || "").indexOf(W.s) >= 0)
return;
for (var a = W.a0 + 1.2; a <= W.a1 - 1.2 && n < maxN; a += 1.9) {
var x = W.ax === "x" ? a : W.c, z = W.ax === "x" ? W.c : a;
wi++;
if (lite && (wi % 2))
continue;
if (((seed >>> (wi % 13)) & 7) === 0)
continue;
var ok = true;
var ox = Math.sin(W.ry) * 0.3, oz = Math.cos(W.ry) * 0.3;
for (var s = -0.8; s <= 0.8; s += 0.4) {
var px = (W.ax === "x" ? x + s : x) + ox, pz = (W.ax === "x" ? z : z + s) + oz;
if (!gldSwkFloorAt(K, px, pz, y)) {
ok = GLD_SWK_WHY("wfloor");
break;
}
if (worldSolidAt(K.solids, px, pz, y + 0.3)) {
ok = GLD_SWK_WHY("wsolid");
break;
}
}
if (!ok)
continue;
var fx = x + Math.sin(W.ry) * 0.9, fz = z + Math.cos(W.ry) * 0.9;
if (worldSolidAt(K.solids, fx, fz, y + 0.3)) {
GLD_SWK_WHY("wfront");
continue;
}
if (gldSwkNearRamp(K, x, z, 1.4))
continue;
var bad = false;
var underWin = false;
for (var d = 0; d < doors.length; d++) {
var D = doors[d];
var dd = Math.hypot(D.x - x, D.z - z);
if (D.win) {
if (dd < D.w / 2 + 0.9)
underWin = true;
}
else if (dd < D.w / 2 + 1.3) {
bad = true;
break;
}
}
for (var k = 0; k < keep.length && !bad; k++) {
var q = keep[k];
if (q.y !== undefined && Math.abs(q.y - y) > 1.5)
continue;
if (Math.hypot(q.x - x, q.z - z) < (q.r || 0) + 0.9)
bad = true;
}
for (var wy = 0; wy < ways.length && !bad; wy++)
if (gldSwkSegD(fx, fz, ways[wy][0], ways[wy][1]) < ways[wy][2])
bad = true;
if (bad) {
GLD_SWK_WHY("wkeep");
continue;
}
var kind = T.wall[(wi + ri * 3) % T.wall.length];
if (underWin && /^(shelf|rack)/.test(kind))
kind = ["crates", "barrel", "sacks", "chest"][wi % 4];
try {
gldSwkWallPiece(kind, x, y, z, W.ry, h - 0.5, seed + wi);
n++;
}
catch (e) { }
if (ppl < maxP && (wi % 4) === 1) {
var qx = x + Math.sin(W.ry) * 1.15, qz = z + Math.cos(W.ry) * 1.15, qok = gldSwkFloorAt(K, qx, qz, y) && !worldSolidAt(K.solids, qx, qz, y + 0.3);
for (var wq = 0; wq < ways.length && qok; wq++)
if (gldSwkSegD(qx, qz, ways[wq][0], ways[wq][1]) < ways[wq][2])
qok = false;
if (qok) {
var wh = T.who[ppl % T.who.length];
try {
gldPerson(G, "swk" + G.k + ppl, qx, qz, W.ry + Math.PI, { y: y, title: wh[0], doing: wh[1] });
keep.push({ x: qx, z: qz, r: 0.5, y: y });
ppl++;
}
catch (e) { }
}
}
if (T.pics && h > 3.2 && kind.indexOf("shelf") < 0 && kind.indexOf("rack") < 0 && (wi % 3) === 0) {
var bx = x - Math.sin(W.ry) * 0.32, bz = z - Math.cos(W.ry) * 0.32;
try {
if (wi % 2)
gldPainting(bx, y + 2.2, bz, W.ry, 1.0, 0.75, "swk" + G.k + wi);
else
gldBanner(bx, y + h - 0.6, bz, W.ry, 0.8, 0, [0x7A2A20, 0x2A3A6A, 0x2A5A3A, 0x5A2A5A][seed % 4], 0xD8B860, 0);
}
catch (e) { }
}
}
});
var step = 2.5;
for (var gx = rm.x0 + 2.1, ix = 0; gx <= rm.x1 - 2.1; gx += step, ix++)
for (var gz = rm.z0 + 2.1, iz = 0; gz <= rm.z1 - 2.1; gz += step, iz++) {
if ((ix + iz + ri) % 2)
continue;
ii++;
if (lite && (ii % 2))
continue;
var jx = gx + ((gldHash(G.k + gx + "," + gz) % 100) / 100 - 0.5) * 0.8, jz = gz + ((gldHash(G.k + gz + "," + gx) % 100) / 100 - 0.5) * 0.8;
if (n >= maxN || !gldSwkClear(K, keep, jx, jz, y, 1.3, doors, ways))
continue;
var kind2 = T.isle[(ii + ri) % T.isle.length], ry = ((ii * 7 + ri) % 4) * Math.PI / 2;
var r;
try {
r = gldSwkIsle(kind2, jx, y, jz, ry, seed + ii, G.k);
n++;
}
catch (e) {
continue;
}
keep.push({ x: jx, z: jz, r: r || 1.2, y: y });
if (ppl < maxP && kind2 !== "stack" && kind2 !== "bed") {
var px2 = jx - Math.sin(ry) * 1.0, pz2 = jz - Math.cos(ry) * 1.0;
if (!worldSolidAt(K.solids, px2, pz2, y + 0.3) && gldSwkFloorAt(K, px2, pz2, y)) {
var who = T.who[ppl % T.who.length];
try {
gldPerson(G, "swk" + G.k + ppl, px2, pz2, ry, { y: y, title: who[0], doing: who[1] });
ppl++;
}
catch (e) { }
}
}
}
for (var hx = rm.x0 + 1.7, kx = 0; hx <= rm.x1 - 1.7; hx += 2.3, kx++)
for (var hz = rm.z0 + 1.7, kz = 0; hz <= rm.z1 - 1.7; hz += 2.3, kz++) {
if (n >= maxN)
break;
if ((kx + kz) % 2 === 0)
continue;
if (lite && ((kx + kz + ri) % 4 === 1))
continue;
var sx = hx + ((gldHash("s" + G.k + hx + "," + hz) % 100) / 100 - 0.5) * 0.6, sz = hz + ((gldHash("t" + G.k + hz + "," + hx) % 100) / 100 - 0.5) * 0.6;
if (!gldSwkClear(K, keep, sx, sz, y, 1.0, doors, ways))
continue;
var sm = (T.small || ["barrel", "crates", "sacks", "basket"])[(kx * 3 + kz + ri) % 4];
try {
if (sm === "barrel") {
gldBarrel(sx, y, sz, 0.95);
if (kx % 2)
gldSack(sx + 0.45, y, sz + 0.2, 0xA89868);
}
else if (sm === "crates") {
gldCrate(sx, y, sz, 0.3, 0.85);
gldCrate(sx + 0.05, y + 0.6, sz, -0.2, 0.7);
}
else if (sm === "sacks") {
gldSack(sx - 0.25, y, sz, 0x9A8A60);
gldSack(sx + 0.25, y, sz + 0.1, 0xB0A070);
gldSack(sx, y + 0.38, sz + 0.05, 0x8A7A50);
gldRound(sx, sz, 0.5, y, 0.8);
}
else {
gldStool(sx, y, sz);
gldCyl(0.2, 0.3, gldMat(0xA08850, "canvas"), sx + 0.45, y + 0.15, sz, null, 10, 0.16);
}
keep.push({ x: sx, z: sz, r: 0.6, y: y });
n++;
}
catch (e) { }
}
});
GLD.sweepStat = GLD.sweepStat || {};
GLD.sweepStat[G.k] = n + " pieces, " + ppl + " people";
},
function (list, x, z, feet) {
for (var i = 0; i < list.length; i++) {
var s = list[i];
if (s.h !== undefined && feet > (s.b || 0) + s.h - 0.3)
continue;
if (s.b !== undefined && feet + 1.7 < s.b)
continue;
var dx = x - s.x, dz = z - s.z;
if (s.r !== undefined) {
if (dx * dx + dz * dz < (s.r + 0.05) * (s.r + 0.05))
return true;
continue;
}
var c = Math.cos(-(s.rot || 0)), sn = Math.sin(-(s.rot || 0)), lx = dx * c + dz * sn, lz = -dx * sn + dz * c;
if (Math.abs(lx) < s.hw + 0.05 && Math.abs(lz) < s.hd + 0.05)
return true;
}
return false;
},
function (x, z, y, r) {
var K = GLK;
if (!K)
return gldR2Why("nok", x, z);
y = y || 0;
r = r || 0.5;
var q = r * 0.6, pts = [[0, 0], [q, 0], [-q, 0], [0, q], [0, -q]];
for (var i = 0; i < pts.length; i++) {
var px = x + pts[i][0], pz = z + pts[i][1];
if (!gldSwkFloorAt(K, px, pz, y))
return gldR2Why("floor", x, z);
if (gldR2Solid(K.solids, px, pz, y + 0.3))
return gldR2Why("solid" + i, x, z);
}
for (var s = 0; s < K.spots.length; s++) {
var S = K.spots[s];
if (S.y !== undefined && Math.abs(S.y - y) > 1.5)
continue;
if (Math.hypot(S.x - x, S.z - z) < (/^🚪/.test(S.name || "") ? 1.6 : 0.6) + r)
return gldR2Why("spot " + S.name, x, z);
}
for (var p = 0; p < K.people.length; p++) {
var P = K.people[p];
if (P.y !== undefined && Math.abs(P.y - y) > 1.5)
continue;
if (Math.hypot(P.x - x, P.z - z) < 0.6 + r)
return gldR2Why("person", x, z);
}
return true;
},
function (x, z, y, r, fn, slide) {
var C = [];
slide = slide || "";
GLD_R2_TRY.forEach(function (a) { if (slide.indexOf("x") >= 0 || !a)
C.push([x + a, z]); if (slide.indexOf("z") >= 0 && a)
C.push([x, z + a]); });
for (var i = 0; i < C.length; i++) {
if (!gldR2Ok(C[i][0], C[i][1], y, r))
continue;
try {
fn(C[i][0], C[i][1]);
GLD.r2n = (GLD.r2n || 0) + 1;
return true;
}
catch (e) {
gldR2Why("err " + e.message, x, z);
return false;
}
}
GLD.r2skip = (GLD.r2skip || 0) + 1;
return false;
},
function (x, y, z, s, kind, pot) {
var g = gldPiece(x, y, z, 0);
s = s || 1;
var pm = gldMat(pot || 0xA8643A, "tile");
gldCyl(0.26 * s, 0.5 * s, pm, 0, 0.25 * s, 0, g, 14, 0.2 * s);
gldCyl(0.28 * s, 0.05 * s, pm, 0, 0.5 * s, 0, g, 14);
var lf = gldMat(kind === "fern" ? 0x3A6A2A : 0x2E5A26, "leaf");
if (kind === "fern") {
for (var i = 0; i < 9; i++) {
var a = i / 9 * 6.283, f = gldBox(0.12 * s, 0.03 * s, 0.7 * s, lf, Math.sin(a) * 0.22 * s, 0.68 * s, Math.cos(a) * 0.22 * s, g);
f.rotation.y = a;
f.rotation.x = -0.55;
}
}
else {
gldCyl(0.03 * s, 0.7 * s, gldW("dark"), 0, 0.85 * s, 0, g, 6);
var c = gldSph(0.38 * s, lf, 0, 1.38 * s, 0, g, 12);
c.scale.y = 1.1;
if (kind === "orange")
for (var o = 0; o < 7; o++) {
var oa = o * 2.4;
gldSph(0.05 * s, gldMat(0xE88A2A, null), Math.sin(oa) * 0.33 * s, 1.3 * s + ((o % 3) - 1) * 0.15 * s, Math.cos(oa) * 0.33 * s, g, 6);
}
}
gldRoundIn(g, 0.3 * s, 1.6 * s);
return g;
},
function (x, y, z, ry) {
var g = gldPiece(x, y, z, ry), wd = gldW("dark");
gldBox(0.4, 0.06, 0.4, wd, 0, 0.03, 0, g);
gldBox(0.12, 1.0, 0.12, wd, 0, 0.55, 0, g);
var top = gldBox(0.6, 0.05, 0.45, wd, 0, 1.1, 0, g);
top.rotation.x = -0.35;
var bk = gldBox(0.54, 0.04, 0.38, gldMat(0xEDE4CC, null), 0, 1.14, 0.01, g);
bk.rotation.x = -0.35;
gldRoundIn(g, 0.35, 1.3);
return g;
},
function (x, y, z) {
var g = gldPiece(x, y, z, 0), wd = gldMat(0x6A4A2A, "wood", { phong: 50 });
gldCyl(0.42, 0.12, wd, 0, 0.06, 0, g, 12);
gldCyl(0.3, 0.75, wd, 0, 0.5, 0, g, 12, 0.36);
gldCyl(0.4, 0.14, wd, 0, 0.94, 0, g, 12);
for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.283, b = gldBox(0.06, 0.06, 1.4, gldMat(0x8A6A44, "wood"), Math.sin(a) * 0.7, 0.92, Math.cos(a) * 0.7, g);
b.rotation.y = a;
}
gldRoundIn(g, 0.5, 1.0);
return g;
},
function (x, y, z, ry) {
var g = gldPiece(x, y, z, ry), wd = gldW("dark");
[0, 2.09, 4.19].forEach(function (a) { var l = gldBox(0.04, 1.3, 0.04, wd, Math.sin(a) * 0.25, 0.62, Math.cos(a) * 0.25, g); l.rotation.x = Math.cos(a) * 0.2; l.rotation.z = -Math.sin(a) * 0.2; });
var t = gldCyl(0.05, 1.0, GLD_BRASS(), 0, 1.32, 0, g, 10, 0.07);
t.rotation.x = Math.PI / 2 - 0.25;
gldRoundIn(g, 0.35, 1.5);
return g;
},
function (x0, x1, y, z, seed) {
var cols = [0xC82A2A, 0xE8D8A0, 0x2A3A8A, 0xD8B040, 0x1A1A1A, 0x2A6A3A], n = Math.floor((x1 - x0) / 0.55);
gldBox(x1 - x0, 0.015, 0.015, gldMat(0x2A2018, null), (x0 + x1) / 2, y, z);
for (var i = 0; i < n; i++) {
var fx = x0 + 0.3 + i * 0.55, sag = Math.sin(i / (n - 1) * Math.PI) * 0.35;
gldBox(0.34, 0.34, 0.01, gldMat(cols[(i + seed) % cols.length], null), fx, y - 0.2 - sag, z);
}
},
function (G) {
gldR2Put(3.95, 8.4, 0, 0.5, function (x, z) { gldBench(x, 0, z, -Math.PI / 2, 1.8); }, "z");
gldR2Put(-2.7, 9.2, 0, 0.35, function (x, z) { gldR2Plant(x, 0, z, 0.9, "bay"); }, "x");
gldR2Put(2.7, 9.2, 0, 0.35, function (x, z) { gldR2Plant(x, 0, z, 0.9, "bay"); }, "x");
gldR2Put(4.1, 3.2, 0, 0.45, function (x, z) { gldShelves(4.4, 0, z, -Math.PI / 2, 1.2, 2.0, "pots", { seed: 61 }); }, "z");
gldR2Put(-4.1, 3.2, 0, 0.45, function (x, z) { gldShelves(-4.4, 0, z, Math.PI / 2, 1.2, 2.0, "bolts", { seed: 62 }); }, "z");
gldR2Door(G, -2.4, 3.4, 0.4, "hall porter", "checking names against the guild roll");
},
function (G) {
gldR2Put(3.95, 5.8, 0, 0.5, function (x, z) { gldRack(4.45, 0, z, -Math.PI / 2, 1.8, "weapons"); }, "z");
gldR2Put(2.8, 5.4, 0, 0.45, function (x, z) { gldCyl(0.3, 0.55, gldW("dark"), x, 0.27, z, null, 10, 0.34); gldAnvil(x, 0.55, z, 0.3); gldRound(x, z, 0.45, 0, 1.0); }, "xz");
gldR2Put(-4.1, 9.2, 0, 0.45, function (x, z) { gldBarrel(x, 0, z, 0.9); for (var i = 0; i < 5; i++) {
var b = gldCyl(0.02, 1.1, GLD_IRON(), x + (i - 2) * 0.06, 1.2, z + ((i * 3) % 3 - 1) * 0.05, null, 5);
b.rotation.z = (i - 2) * 0.06;
} }, "xz");
gldR2Put(4.1, 9.2, 0, 0.45, function (x, z) { gldCrate(x, 0, z, 0.2, 0.85); gldCrate(x, 0.6, z, -0.3, 0.65); }, "xz");
gldR2Door(G, -2.4, 5.4, 0.5, "doorward", "keeping the Company's door, a leather apron over his coat", "m");
},
function (G) {
gldR2Put(3.9, 9.1, 0, 0.35, function (x, z) { gldR2Plant(x, 0, z, 0.9, "fern", 0x8A6A4A); }, "xz");
gldR2Put(4.1, 4.8, 0, 0.35, function (x, z) { gldR2Plant(x, 0, z, 0.9, "fern", 0x8A6A4A); }, "xz");
try {
gldHerbBunches(-2, 2, 3.7, 5.2, 6);
}
catch (e) { }
gldR2Put(-1.9, 4.9, 0, 0.4, function (x, z) { gldBarrel(x, 0, z, 0.7); gldSack(x + 0.5, 0, z + 0.1, 0xB0A070); }, "x");
gldR2Door(G, 2.9, 6.0, -1.2, "a mother", "waiting with a coughing child wrapped in a shawl", "f");
},
function (G) {
gldR2Put(-3.2, 7.6, 0, 0.45, function (x, z) { gldBench(-3.3, 0, z, Math.PI / 2, 1.4); }, "z");
gldR2Put(3.1, 7.9, 0, 0.45, function (x, z) { gldShelves(3.45, 0, z, -Math.PI / 2, 1.2, 1.7, "ledgers", { seed: 71 }); }, "z");
gldR2Put(2.4, 5.2, 0, 0.4, function (x, z) { gldR2Lectern(x, 0, z, -0.6); }, "xz");
gldR2Door(G, -2.2, 5.2, 0.5, "porter of the Scriveners", "asking every visitor to sign the register");
},
function (G) {
gldBanner(-3.8, 1.0, 6.6, 0, 1.2, 2.4, 0x6A1A1A, 0xD8B060, 0);
gldBanner(3.8, 1.0, 6.6, 0, 1.2, 2.4, 0x6A1A1A, 0xD8B060, 0);
gldR2Put(3.95, 10.9, 0, 0.5, function (x, z) { gldBench(x, 0, z, -Math.PI / 2, 1.6); }, "z");
gldR2Put(-4.0, 10.9, 0, 0.45, function (x, z) { gldDrum(x, 0, z, 0.9, 0x6A1A1A); gldDrum(x + 0.6, 0, z + 0.3, 0.6, 0x2A3A6A); }, "xz");
gldR2Put(-4.0, 7.1, 0, 0.6, function (x, z) { gldCostumeRail(-4.15, 0, z, Math.PI / 2, 1.3, 3); }, "z");
gldR2Door(G, 2.6, 7.6, -0.5, "a player in half-costume", "handing out tonight's playbills", "f");
},
function (G) {
gldR2Put(3.95, 8.4, 0, 0.5, function (x, z) { gldBench(x, 0, z, -Math.PI / 2, 1.8); }, "z");
gldR2Put(-4.0, 8.8, 0, 0.5, function (x, z) { gldChest(x, 0, z, Math.PI / 2, 0x2A3A4A); }, "xz");
gldR2Put(-4.1, 5.0, 0, 0.45, function (x, z) { gldBarrel(x, 0, z, 0.9); }, "xz");
gldR2Put(2.6, 5.1, 0, 0.4, function (x, z) { gldR2Binnacle(x, 0, z); }, "xz");
gldR2Door(G, -2.3, 5.4, 0.6, "mate of the watch", "signing on hands for the morning tide");
gldR2Put(-6, -1.2, 0, 0.8, function (x, z) { gldR2Capstan(x, 0, z); }, "xz");
[-5, -3.4, 3.4].forEach(function (x0, i) { gldR2Put(x0, -5.3, 0, 0.45, function (x, z) { gldChest(x, 0, z, 0, [0x3A2A1A, 0x2A3A4A, 0x5A2A1A][i]); }, "xz"); });
gldR2Put(1.6, -8.2, 0.7, 0.35, function (x, z) { gldR2Binnacle(x, 0.7, z); }, "x");
gldR2Flags(-11, 11, 5.6, -2.2, 0);
gldR2Flags(-11, 11, 5.4, 1.8, 3);
gldR2Put(9.2, -4.4, 0, 0.45, function (x, z) { gldBarrel(x, 0, z, 0.9); gldBarrel(x + 0.7, 0, z + 0.2, 0.8); }, "xz");
var cy = 0.7;
gldRug(0, cy, -16, 0, 5.6, 3.6, 0x1A2A4A, 0xC8A040, 0x6A1A1A);
gldR2Put(3.9, -12.6, cy, 0.6, function (x, z) { gldDesk(x, cy, z, -Math.PI / 2, { lamp: true }); gldChair(x - 0.8, cy, z, Math.PI / 2, { cushion: 0x1A2A4A }); }, "xz");
gldR2Put(-3.6, -20.2, cy, 0.45, function (x, z) { gldR2Scope(x, cy, z, 0.5); }, "xz");
gldR2Put(3.6, -20.4, cy, 0.5, function (x, z) { gldChest(x, cy, z, 0, 0x2A3A4A); }, "xz");
gldR2Put(-1.8, -20.6, cy, 0.4, function (x, z) { gldR2Plant(x, cy, z, 0.8, "fern", 0x2A3A4A); }, "xz");
},
function (list) {
var n = 0, q = list.map(function (g) { var r = g.index ? g.toNonIndexed() : g; if (!r.attributes.normal)
r.computeVertexNormals(); n += r.attributes.position.count; return r; });
var P = new Float32Array(n * 3), N = new Float32Array(n * 3), o = 0;
q.forEach(function (g) { P.set(g.attributes.position.array, o * 3); N.set(g.attributes.normal.array, o * 3); o += g.attributes.position.count; });
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(P, 3));
G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
return G;
},
function () {
if (GLD_ARM)
return GLD_ARM;
var L = GLD.lite, s = L ? 8 : 14, M = [], S = [];
function cyl(r0, r1, h, x, y, z, rx, rz, sc) { var g = new THREE.CylinderGeometry(r0, r1, h, s, 1, false); if (sc)
g.scale(sc[0], sc[1], sc[2]); if (rx)
g.rotateX(rx); if (rz)
g.rotateZ(rz); g.translate(x, y, z); return g; }
function sph(r, x, y, z, sc, th) { var g = new THREE.SphereGeometry(r, s, Math.max(5, s * 0.6 | 0), 0, Math.PI * 2, 0, th || Math.PI); if (sc)
g.scale(sc[0], sc[1], sc[2]); g.translate(x, y, z); return g; }
var pr = [[0.15, 0], [0.19, 0.05], [0.205, 0.16], [0.215, 0.3], [0.22, 0.4], [0.2, 0.48], [0.12, 0.53]].map(function (p) { return new THREE.Vector2(p[0], p[1]); });
var bp = new THREE.LatheGeometry(pr, s);
bp.scale(1.05, 1, 0.72);
bp.translate(0, 1.0, 0);
M.push(bp);
var rg = new THREE.BoxGeometry(0.02, 0.36, 0.03);
rg.rotateX(-0.1);
rg.translate(0, 1.22, 0.155);
M.push(rg);
M.push(cyl(0.085, 0.12, 0.09, 0, 1.56, 0));
M.push(sph(0.125, 0, 1.72, 0, [0.95, 1.12, 1.08]));
var vz = new THREE.SphereGeometry(0.128, s, 6, -Math.PI * 0.45, Math.PI * 0.9, Math.PI * 0.42, Math.PI * 0.4);
vz.scale(1, 1.1, 1.14);
vz.translate(0, 1.7, 0.004);
M.push(vz);
M.push(cyl(0.012, 0.012, 0.22, 0, 1.86, -0.01, Math.PI / 2, 0, [1, 1, 1]));
var cr = new THREE.BoxGeometry(0.018, 0.05, 0.24);
cr.translate(0, 1.86, -0.01);
M.push(cr);
[-1, 1].forEach(function (d) {
for (var l = 0; l < 3; l++)
M.push(sph(0.13 - l * 0.012, d * (0.23 + l * 0.012), 1.47 - l * 0.055, 0, [1.05, 0.62, 1.05], Math.PI * 0.55));
M.push(cyl(0.055, 0.05, 0.26, d * 0.27, 1.27, 0, 0, d * 0.08));
M.push(sph(0.06, d * 0.285, 1.12, 0.01, [1, 1, 1.15]));
M.push(cyl(0.05, 0.045, 0.24, d * 0.29, 0.98, 0.04, -0.25, 0));
var gt = new THREE.BoxGeometry(0.08, 0.12, 0.07);
gt.translate(d * 0.295, 0.83, 0.07);
M.push(gt);
});
for (var k = 0; k < 3; k++) {
M.push(cyl(0.2 + k * 0.012, 0.212 + k * 0.012, 0.055, 0, 0.97 - k * 0.05, 0, 0, 0, [1.05, 1, 0.74]));
}
[-1, 1].forEach(function (d) { var ts = new THREE.BoxGeometry(0.16, 0.17, 0.02); ts.rotateX(0.12); ts.translate(d * 0.1, 0.78, 0.15); M.push(ts); });
S.push(cyl(0.21, 0.21, 0.035, 0, 1.015, 0, 0, 0, [1.06, 1, 0.75]));
[-1, 1].forEach(function (d) { var b = new THREE.BoxGeometry(0.03, 0.02, 0.36); b.translate(d * 0.14, 1.53, 0); S.push(b); });
var sl = new THREE.BoxGeometry(0.17, 0.018, 0.03);
sl.translate(0, 1.745, 0.128);
S.push(sl);
var sl2 = new THREE.BoxGeometry(0.008, 0.06, 0.03);
sl2.translate(0, 1.68, 0.138);
S.push(sl2);
GLD_ARM = { metal: gldMergeGeo(M), strap: gldMergeGeo(S) };
return GLD_ARM;
},
function (x, y, z, ry, col) {
var g = gldPiece(x, y, z, ry), st = gldMat(col || 0x8E929A, "metal", { phong: 90 }), wd = gldW("dark"), A = gldArmGeo();
gldBox(0.6, 0.06, 0.09, wd, 0, 0.03, 0, g);
gldBox(0.09, 0.06, 0.6, wd, 0, 0.03, 0, g);
gldCyl(0.03, 0.9, wd, 0, 0.5, 0, g, 6);
g.add(new THREE.Mesh(A.metal, st));
g.add(new THREE.Mesh(A.strap, gldMat(0x3A2416, null)));
gldRoundIn(g, 0.35, 1.9);
return g;
},
function () {
if (GLD.mats && GLD.mats.__straw)
return GLD.mats.__straw;
var c = document.createElement("canvas");
c.width = c.height = GLD.lite ? 128 : 256;
var x = c.getContext("2d"), W = c.width;
x.fillStyle = "#B8964A";
x.fillRect(0, 0, W, W);
var r = 7;
function rnd() { r = (r * 16807) % 2147483647; return r / 2147483647; }
for (var i = 0; i < (GLD.lite ? 900 : 2600); i++) {
var px = rnd() * W, py = rnd() * W, a = (rnd() - 0.5) * 0.9, l = 6 + rnd() * 22, t = rnd();
x.strokeStyle = t < 0.3 ? "#8A6A30" : t < 0.7 ? "#D2B060" : "#E8CC80";
x.lineWidth = 0.8 + rnd() * 1.4;
x.beginPath();
x.moveTo(px, py);
x.lineTo(px + Math.cos(a) * l, py + Math.sin(a) * l);
x.stroke();
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1.4, 1);
var m = new THREE.MeshLambertMaterial({ map: t, color: 0xFFFFFF });
(GLD.mats = GLD.mats || {}).__straw = m;
return m;
},
function (x, y, z, ry, parent) {
var g = gldPiece(x, y, z, ry, parent), m = gldStrawMat(), tw = gldMat(0x6A5030, null);
var b = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.46, 0.56), m);
b.position.y = 0.23;
g.add(b);
[-0.25, 0.25].forEach(function (o) { var t = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.47, 0.57), tw); t.position.set(o, 0.23, 0); g.add(t); });
return g;
}
];
});
