/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(201, function () {
"use strict";
return [
function (force) {
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve();
if (!force && Date.now() - WR.at < 15000)
return Promise.resolve();
WR.at = Date.now();
var a = cityRpc("realty_board", {}).then(function (d) { WR.board = d || []; WR.missing = false; }).catch(function (e) {
WR.missing = true;
return cityRpc("lot_board", {}).then(function (rows) {
WR.board = (rows || []).filter(function (l) { return l.kind !== "district"; }).map(function (l) {
return { id: l.lot_id, name: l.name, quarter: l.quarter, kind: l.kind, world: "somnucor", price: l.price, rent: l.rent, for_sale: l.for_sale, to_let: l.to_let, held: l.held };
});
}).catch(function () { WR.board = []; });
});
var b = cityRpc("address_roll", {}).then(function (d) { WR.roll = d && d.ok ? d.lots : null; }).catch(function () { WR.roll = null; });
return Promise.all([a, b]).then(function () { wrPaint(true); });
},
function (g, S, W, D, seed) {
var R = wRand(seed), wood = wM(S.style === "spire" ? 0x3A2E44 : S.style === "cabin" || S.style === "dome" ? 0x9AA0AA : 0x6A4628), dark = wM(0x2A2018);
var rug = wBox(Math.min(2.6, W - 3), 0.02, Math.min(1.8, D - 3), wM(S.rug), 0.3, 0.02, 0.2, g);
var bx = -W / 2 + 1.05, bz = -D / 2 + 1.25;
wBox(1.5, 0.4, 2.1, wood, bx, 0.2, bz, g);
wBox(1.4, 0.18, 2, wM(0xF2EEE6), bx, 0.49, bz, g);
wBox(1.44, 0.06, 1.4, wM(S.quilt), bx, 0.6, bz + 0.3, g);
wBox(0.55, 0.14, 0.36, wM(0xFAF8F2), bx - 0.36, 0.64, bz - 0.74, g);
wBox(0.55, 0.14, 0.36, wM(0xFAF8F2), bx + 0.36, 0.64, bz - 0.74, g);
wBox(1.5, 0.9, 0.08, wood, bx, 0.6, bz - 1.04, g);
wBox(0.45, 0.5, 0.4, wood, bx + 1.05, 0.25, bz - 0.8, g);
var lm = wSph(0.12, wB(S.glow || 0xFFE0A0), bx + 1.05, 0.66, bz - 0.8, g, 10);
var tx = W / 2 - 1.3, tz = -0.2;
wBox(1.1, 0.06, 0.8, wood, tx, 0.74, tz, g);
[[-0.48, -0.33], [0.48, -0.33], [-0.48, 0.33], [0.48, 0.33]].forEach(function (q) { wBox(0.06, 0.72, 0.06, wood, tx + q[0], 0.36, tz + q[1], g); });
[-1, 1].forEach(function (s) {
var c = new THREE.Group();
c.position.set(tx, 0, tz + s * 0.75);
c.rotation.y = s > 0 ? Math.PI : 0;
g.add(c);
wBox(0.44, 0.05, 0.42, wood, 0, 0.45, 0, c);
wBox(0.44, 0.5, 0.05, wood, 0, 0.72, -0.2, c);
[[-0.19, -0.18], [0.19, -0.18], [-0.19, 0.18], [0.19, 0.18]].forEach(function (q) { wBox(0.04, 0.45, 0.04, wood, q[0], 0.22, q[1], c); });
});
wCyl(0.05, 0.04, 0.09, wM(0xF2EEE6), tx - 0.2, 0.82, tz, g, 8);
wCyl(0.14, 0.14, 0.02, wM(0xE8E4DC), tx + 0.2, 0.78, tz + 0.1, g, 12);
var sx = -W / 2 + 0.28, sz = D / 2 - 1.35;
wBox(0.4, 1.8, 1.1, wood, sx, 0.9, sz, g);
for (var k = 0; k < 3; k++)
for (var b = 0; b < 5; b++)
wBox(0.2, 0.24 + R() * 0.08, 0.12, wM([0x7A2A2A, 0x2A4A7A, 0x3A6A3A, 0xB89A5A, 0x5A3A6A][(b + k) % 5]), sx + 0.04, 0.42 + k * 0.55, sz - 0.4 + b * 0.2, g);
var fx = W / 2 - 1.2, fz = -D / 2 + 0.45;
if (S.feature === "hearth") {
wBox(1.8, 1.3, 0.6, wM(0x8A8A8E), fx, 0.65, fz, g);
wBox(1.1, 0.75, 0.3, wM(0x1A1412), fx, 0.45, fz + 0.18, g);
wBox(0.9, 0.35, 0.05, wB(0xE8722A), fx, 0.25, fz + 0.34, g);
var fg = wGlow(0xFF9A4A, 1.6, 0.55);
fg.position.set(fx, 0.4, fz + 0.5);
g.add(fg);
wBox(2, 0.1, 0.7, wood, fx, 1.35, fz + 0.05, g);
wBox(0.5, 2, 0.5, wM(0x8A8A8E), fx, 2.3, fz - 0.05, g);
var tr = wCone(0.5, 1.3, wM(0x1E5A2E), -W / 2 + 0.7, 0.85, D / 2 - 0.7, g, 8);
wCyl(0.08, 0.08, 0.25, wood, -W / 2 + 0.7, 0.12, D / 2 - 0.7, g, 6);
for (var o = 0; o < 6; o++) {
var a = o * 1.05;
wSph(0.05, wM([0xC8323A, 0xE8C27A, 0x3A6AB8][o % 3]), -W / 2 + 0.7 + Math.cos(a) * 0.3, 0.6 + o * 0.08, D / 2 - 0.7 + Math.sin(a) * 0.3, g, 6);
}
}
else if (S.feature === "chest") {
wBox(1.1, 0.55, 0.6, wM(0x6A4A2A), fx, 0.28, fz + 0.1, g);
wBox(1.12, 0.06, 0.62, wM(0xB8983A), fx, 0.57, fz + 0.1, g);
var hm = wCyl(0.02, 0.02, 2.6, wM(0xE8D8A8), fx - 0.2, 1.6, 0.6, g, 5);
hm.rotation.x = Math.PI / 2;
var sh = wSph(0.35, wM(0xE8C8B8), fx + 0.6, 0.95, fz + 0.15, g, 10);
sh.scale.set(1, 0.5, 0.8);
var ln = wBox(0.2, 0.3, 0.2, wB(0xFFD890), W / 2 - 0.3, 1.6, 0.6, g);
var lg = wGlow(0xFFD890, 1.2, 0.45);
lg.position.set(W / 2 - 0.4, 1.6, 0.6);
g.add(lg);
}
else if (S.feature === "amphora") {
[[0, 0], [0.55, 0.1]].forEach(function (q, i) { var am = wSph(0.3, wM(i ? 0xB8583A : 0xC8784A), fx + q[0], 0.5, fz + 0.15 + q[1], g, 12); am.scale.set(1, 1.4, 1); wCyl(0.08, 0.12, 0.25, wM(i ? 0xB8583A : 0xC8784A), fx + q[0], 0.98, fz + 0.15 + q[1], g, 10); });
var kl = wBox(2, 0.45, 0.8, wM(0xE8E0D0), 0.2, 0.25, -D / 2 + 0.7, g);
wBox(2, 0.4, 0.15, wM(0x8A6A4A), 0.2, 0.6, -D / 2 + 0.35, g);
var lp = wCyl(0.05, 0.12, 1.4, wM(0xB8983A), W / 2 - 0.4, 0.7, D / 2 - 0.6, g, 8);
var lg2 = wGlow(0xFFD890, 1, 0.5);
lg2.position.set(W / 2 - 0.4, 1.5, D / 2 - 0.6);
g.add(lg2);
}
else if (S.feature === "mushroom") {
[[0, 0, 1], [0.6, 0.2, 0.7], [-0.5, 0.15, 0.55]].forEach(function (q) { wCyl(0.06, 0.09, q[2], wM(0xD8D0E8), fx + q[0], q[2] / 2, fz + 0.3 + q[1], g, 6); var cp = wSph(0.28 * q[2] + 0.12, wB(0xB890FF), fx + q[0], q[2], fz + 0.3 + q[1], g, 10); cp.scale.y = 0.5; });
var mg = wGlow(0xB890FF, 2, 0.4);
mg.position.set(fx, 1, fz + 0.4);
g.add(mg);
wBox(1.6, 2.2, 0.05, wM(0x4A2A6A), bx, 1.6, -D / 2 + 0.18, g);
}
else if (S.feature === "garden") {
wBox(1.6, 1.6, 0.5, wM(0x9AA0AA), fx, 0.8, fz + 0.1, g);
for (var p = 0; p < 3; p++) {
wBox(1.5, 0.12, 0.45, wM(0x5A3A22), fx, 0.35 + p * 0.5, fz + 0.12, g);
for (var q2 = 0; q2 < 4; q2++)
wSph(0.1, wM(0x3A8A3A), fx - 0.55 + q2 * 0.37, 0.48 + p * 0.5, fz + 0.12, g, 6);
}
wBox(1.5, 0.04, 0.4, wB(0xE8D0FF), fx, 1.62, fz + 0.12, g);
}
else if (S.feature === "desk") {
wBox(1.3, 0.06, 0.6, wM(0x9AA0AA), fx, 0.74, fz + 0.1, g);
wBox(0.06, 0.72, 0.55, wM(0x7A808A), fx - 0.6, 0.37, fz + 0.1, g);
wBox(0.06, 0.72, 0.55, wM(0x7A808A), fx + 0.6, 0.37, fz + 0.1, g);
wBox(0.7, 0.45, 0.04, wM(0x1A1E26), fx, 1.05, fz - 0.1, g);
wBox(0.64, 0.38, 0.01, wB(0x6AB8E8), fx, 1.05, fz - 0.077, g);
}
var pfx = W < 7 ? bx : -0.6;
var pf = wBox(1.1, 0.75, 0.05, wood, pfx, 1.75, -D / 2 + 0.13, g);
wBox(0.95, 0.6, 0.02, wM([0x5A7A9A, 0x8A6A3A, 0x4A6A4A, 0x7A4A6A][seed % 4]), pfx, 1.75, -D / 2 + 0.16, g);
wBox(0.5, 0.3, 0.02, wM([0xE8C27A, 0xD8D8E8, 0xC8A060, 0xB890FF][seed % 4]), pfx - 0.15, 1.7, -D / 2 + 0.175, g);
if (S.feature !== "desk") {
var kx = W / 2 - 0.38, kz = D / 2 - 1.25;
wBox(0.6, 0.9, 1.5, wM(S.style === "spire" ? 0x3A3448 : S.style === "dome" ? 0xC8CCD4 : 0xB89A70), kx, 0.45, kz, g);
wBox(0.64, 0.05, 1.54, wM(S.style === "spire" ? 0x5A4A6A : 0xE8E4DC), kx, 0.92, kz, g);
wBox(0.4, 0.03, 0.42, wM(0x9AA0AA), kx, 0.95, kz - 0.4, g);
wCyl(0.02, 0.02, 0.3, wM(0x9AA0AA), kx + 0.22, 1.08, kz - 0.4, g, 6);
[[0.1, 0.25], [0.1, 0.55]].forEach(function (q) { wCyl(0.11, 0.11, 0.02, wM(0x1A1A1E), kx - q[0] + 0.1, 0.96, kz + q[1], g, 12); });
wCyl(0.12, 0.1, 0.14, wM(0x5A5A60), kx, 1.03, kz + 0.25, g, 10);
wBox(0.3, 0.6, 1.4, wM(S.style === "spire" ? 0x2A2434 : 0xB89A70), kx + 0.05, 1.9, kz, g);
}
var cl = wSph(0.16, wB(S.glow || 0xFFF0D0), 0, S.h - 0.25, 0, g, 10);
var cg = wGlow(S.glow || 0xFFE8C0, 2.6, 0.35);
cg.position.set(0, S.h - 0.35, 0);
g.add(cg);
},
function (S, seed) {
var g = new THREE.Group(), W = S.w, D = S.d, H = S.h, walls = [], wm = wM(S.wall), tm = wM(S.trim);
var floorM = wM(S.floor);
wBox(W + 0.5, 2.4, D + 0.5, wM(S.style === "cottage" ? 0x8A8A8E : S.style === "villa" ? 0xD8D0C0 : S.style === "spire" ? 0x24202C : 0x7A808A), 0, -1.2, 0, g);
wBox(W - 0.1, 0.06, D - 0.1, floorM, 0, 0.03, 0, g);
if (S.style === "dome") {
var Rr = S.r, N = 14, pw = 2 * Rr * Math.sin(Math.PI / N) + 0.08;
for (var i = 0; i < N; i++) {
var a = (i + 0.5) / N * Math.PI * 2;
if (i === N - 1 || i === 0)
continue;
var px = Math.sin(a) * Rr, pz = Math.cos(a) * Rr, p = wBox(pw, H, 0.2, wm, px, H / 2, pz, g);
p.rotation.y = a;
walls.push({ x: px, z: pz, hw: pw / 2, hd: 0.12, rot: a });
}
var dm = wMesh(new THREE.SphereGeometry(Rr + 0.1, 28, 10, 0, Math.PI * 2, 0, Math.PI / 2), wM(S.roof, { ds: true }), 0, H, 0, g);
dm.scale.y = 0.7;
var ring = wMesh(new THREE.TorusGeometry(Rr + 0.1, 0.12, 6, 32), tm, 0, H, 0, g);
ring.rotation.x = Math.PI / 2;
var al = new THREE.Group();
al.position.set(0, 0, Rr);
g.add(al);
wBox(0.25, 2.5, 1.6, tm, -1.05, 1.25, 0.6, al);
wBox(0.25, 2.5, 1.6, tm, 1.05, 1.25, 0.6, al);
wBox(2.35, 0.3, 1.6, tm, 0, 2.55, 0.6, al);
walls.push({ x: -1.05, z: Rr + 0.6, hw: 0.15, hd: 0.8 }, { x: 1.05, z: Rr + 0.6, hw: 0.15, hd: 0.8 });
whFurnish(g, S, 6.4, 6.4, seed);
return { g: g, walls: walls, hw: Rr, hd: Rr, door: Rr + 1.4 };
}
var t = 0.2, dg = 0.9;
walls.push({ x: 0, z: -D / 2, hw: W / 2, hd: t / 2 }, { x: -W / 2, z: 0, hw: t / 2, hd: D / 2 }, { x: W / 2, z: 0, hw: t / 2, hd: D / 2 }, { x: -(W / 2 + dg) / 2, z: D / 2, hw: (W / 2 - dg) / 2, hd: t / 2 }, { x: (W / 2 + dg) / 2, z: D / 2, hw: (W / 2 - dg) / 2, hd: t / 2 });
walls.forEach(function (s) { wBox(s.hw * 2, H, s.hd * 2, wm, s.x, H / 2, s.z, g); });
wBox(dg * 2, H - 2.3, t, wm, 0, 2.3 + (H - 2.3) / 2, D / 2, g);
var dr = wBox(0.06, 2.2, 1.7, wM(S.door), -dg + 0.05, 1.1, D / 2 - 0.85, g);
wBox(dg * 2 + 0.3, 0.14, t + 0.1, tm, 0, 2.32, D / 2, g);
wBox(0.14, 2.3, t + 0.1, tm, -dg - 0.07, 1.15, D / 2, g);
wBox(0.14, 2.3, t + 0.1, tm, dg + 0.07, 1.15, D / 2, g);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { wBox(0.3, H, 0.3, tm, q[0] * W / 2, H / 2, q[1] * D / 2, g); });
var glass = wB(S.style === "spire" ? 0xB890FF : S.style === "cabin" ? 0x0A0E18 : 0xFFE6A8, { op: 0.75 });
[[-W / 2, -0.6, Math.PI / 2], [W / 2, 0.9, Math.PI / 2], [W / 2 - 2.4, -D / 2, 0], [-W / 2 + 2.6, D / 2, 0]].forEach(function (q) {
var wx = q[0], wz = q[1];
var gl = wBox(q[2] ? 0.24 : 1.2, 1, q[2] ? 1.2 : 0.24, glass, wx, 1.6, wz, g);
wBox(q[2] ? 0.3 : 1.4, 0.1, q[2] ? 1.4 : 0.3, tm, wx, 1.05, wz, g);
wBox(q[2] ? 0.3 : 1.4, 0.1, q[2] ? 1.4 : 0.3, tm, wx, 2.15, wz, g);
});
wBox(W, 0.12, D, wM(S.style === "spire" ? 0x24202C : 0xE8E2D6), 0, H + 0.06, 0, g);
if (!S.flat) {
var rise = W / 2 * S.pitch, slope = Math.hypot(W / 2 + 0.5, rise), ang = Math.atan2(rise, W / 2 + 0.5), rm = wM(S.roof);
[-1, 1].forEach(function (s) {
var r = wBox(slope, 0.22, D + 0.9, rm, s * (W / 2 + 0.5) / 2, H + 0.12 + rise / 2, 0, g);
r.rotation.z = -s * ang;
var e = wBox(slope, 0.08, D + 0.95, wM(S.roofEdge), s * (W / 2 + 0.5) / 2, H + 0.02 + rise / 2, 0, g);
e.rotation.z = -s * ang;
});
var gs = new THREE.Shape();
gs.moveTo(-W / 2, 0);
gs.lineTo(W / 2, 0);
gs.lineTo(0, rise);
gs.lineTo(-W / 2, 0);
[-1, 1].forEach(function (s) { var gm = wMesh(new THREE.ShapeGeometry(gs), wM(S.wall, { ds: true }), 0, H + 0.12, s * (D / 2), g); });
if (S.style === "cottage") {
wBox(0.7, 2, 0.7, wM(0x8A8A8E), W / 2 - 1.2, H + rise * 0.6, -D / 2 + 0.45, g);
wBox(0.8, 0.12, 0.8, wM(0xF4F6FA), W / 2 - 1.2, H + rise * 0.6 + 1, -D / 2 + 0.45, g);
}
if (S.style === "spire") {
var sp = wCone(1.1, 4, wM(S.roof), 0, H + rise + 1.6, 0, g, 8);
var tip = wSph(0.25, wB(0xC890F0), 0, H + rise + 3.7, 0, g, 8);
}
}
var pl = wSph(0.1, wB(S.glow || 0xFFE0A0), dg + 0.45, 2.3, D / 2 + 0.2, g, 8);
whFurnish(g, S, W, D, seed);
return { g: g, walls: walls, hw: W / 2, hd: D / 2, door: D / 2 + 1.6 };
},
function (name) {
var r = (WHM.rows || []).filter(function (l) { return l.name === name; })[0];
if (!r)
return "Ask at the Land Office";
if (r.mine)
return "Yours";
if (r.held)
return "Taken";
var s = [];
if (r.for_sale && r.price != null)
s.push("For sale, " + Number(r.price).toLocaleString() + " gold");
if (r.to_let && r.rent != null)
s.push("to let, " + Number(r.rent).toLocaleString() + " a week");
return s.length ? s.join(", ") : "Off the market";
},
function (W, x, z, hw, hd, taken, P) {
var GR = P && P.gr || function (a, b) { return W.ground(a, b, 0); }, BL = P && P.bl || function (a, b, f) { return W.block(a, b, f); };
var best = null;
for (var pass = 0; pass < 2 && !best; pass++)
for (var ring = 0; ring <= (pass ? 16 : 10) && !best; ring++) {
var n = ring ? ring * 8 : 1;
for (var i = 0; i < n && !best; i++) {
var a = i / n * Math.PI * 2, px = x + Math.cos(a) * ring * 4, pz = z + Math.sin(a) * ring * 4, ok = true, lo = 1e9, hi = -1e9;
for (var u = -1; u <= 1 && ok; u += 0.5)
for (var v = -1; v <= 1.3 && ok; v += 0.5) {
var sx = px + u * (hw + 1), sz = pz + v * (hd + 1), h = GR(sx, sz);
if (!(h > -900) || (W.key === "sea" || W.key === "neverland") && h < 0.4) {
ok = false;
break;
}
if (BL(sx, sz, h)) {
ok = false;
break;
}
lo = Math.min(lo, h);
hi = Math.max(hi, h);
}
if (ok && hi - lo > (pass ? 2.6 : 1.6))
ok = false;
if (ok)
for (var k = 0; k < taken.length; k++)
if (Math.hypot(taken[k].x - px, taken[k].z - pz) < taken[k].r + Math.max(hw, hd) + 3) {
ok = false;
break;
}
if (ok)
best = { x: px, z: pz, lo: lo, hi: hi };
}
}
return best;
},
function (key, W, G, solids) {
var P = WH_PLAN[key], S = Object.assign({ style: P.style }, WH_STYLE[P.style]), list = [], taken = [];
P.lots.forEach(function (L, i) {
var hw = S.r || S.w / 2, hd = S.r || S.d / 2, at = whSpot(W, L[1], L[2], hw, hd, taken, P);
if (!at)
return;
var H = whHouse(S, i * 977 + key.length * 31 + 1), rot = Math.atan2(P.face.x - at.x, P.face.z - at.z), floor = at.hi + 0.15;
if (key === "station")
floor = 0;
H.g.position.set(at.x, floor, at.z);
H.g.rotation.y = rot;
G.add(H.g);
var c = Math.cos(rot), s = Math.sin(rot);
H.walls.forEach(function (w) { solids.push({ x: at.x + w.x * c + w.z * s, z: at.z - w.x * s + w.z * c, hw: w.hw, hd: w.hd, rot: rot + (w.rot || 0) }); });
var post = new THREE.Group();
post.position.set(H.hw * 0.45 + 1.9, 0, H.door + 0.2);
H.g.add(post);
wBox(0.12, 1.8, 0.12, wM(0x5A4030), -1.1, 0.9, 0, post);
wBox(0.12, 1.8, 0.12, wM(0x5A4030), 1.1, 0.9, 0, post);
var sg = whSignTex(L[0], whStatus(L[0]));
sg.position.set(0, 1.75, 0.07);
post.add(sg);
solids.push({ x: at.x + (H.hw * 0.45 + 1.9) * c + (H.door + 0.2) * s, z: at.z - (H.hw * 0.45 + 1.9) * s + (H.door + 0.2) * c, hw: 1.2, hd: 0.12, rot: rot });
var home = { key: key, name: L[0], x: at.x, z: at.z, rot: rot, hw: H.hw, hd: H.hd, door: H.door, floor: floor, sign: sg, line: null };
list.push(home);
taken.push({ x: at.x, z: at.z, r: Math.max(hw, hd) + 2.4 });
});
WHM.homes[key] = list;
return list;
},
function (key, x, z, h) {
var L = WHM.homes[key];
if (!L)
return h;
for (var i = 0; i < L.length; i++) {
var o = L[i], dx = x - o.x, dz = z - o.z;
if (Math.abs(dx) > o.door + 2 || Math.abs(dz) > o.door + 2)
continue;
var c = Math.cos(o.rot), s = Math.sin(o.rot), lx = dx * c - dz * s, lz = dx * s + dz * c;
if (Math.abs(lx) <= o.hw + 0.3 && Math.abs(lz) <= o.hd + 0.3)
return o.floor + 0.06;
if (Math.abs(lx) < 1.3 && lz > o.hd && lz < o.door + 0.6) {
var t = (lz - o.hd) / (o.door + 0.6 - o.hd);
return Math.max(h, (o.floor + 0.06) * (1 - t) + h * t);
}
}
return h;
}
];
});
