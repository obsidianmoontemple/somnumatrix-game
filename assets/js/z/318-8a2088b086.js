/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(318, function () {
"use strict";
return [
function (spec) {
if (!spec || !spec.city || (spec.archetype !== "palace" && spec.archetype !== "castle"))
return null;
var wk = (typeof workplaceKeyOf === "function") ? workplaceKeyOf(spec) : null;
if (wk && !/^lot:/.test(String(wk)))
return null;
var p = esPlot(spec);
if (!p)
return null;
if (p.name === "The Crown Estate")
return "crown";
return spec.archetype;
},
function (g) {
var S = {};
S.hall = { x0: -g.hx, x1: g.hx, z0: g.Z - g.hd, z1: g.Z };
S.spine = { x0: -g.s, x1: g.s, z0: g.g1, z1: g.Z - g.hd };
S.gallery = { x0: -g.X, x1: g.X, z0: g.g0, z1: g.g1 };
S.c4 = { x0: -g.c, x1: g.c, z0: -g.Z, z1: g.g0 };
[1, -1].forEach(function (sd) {
var k = sd > 0 ? "r" : "l";
function R(a, b, z0, z1) { return { x0: Math.min(sd * a, sd * b), x1: Math.max(sd * a, sd * b), z0: z0, z1: z1 }; }
S[k + "1i"] = R(g.hx, g.x1, g.Z - g.hd, g.Z);
S[k + "1o"] = R(g.x1, g.X, g.Z - g.hd, g.Z);
S[k + "2i"] = R(g.s, g.xi, g.m, g.Z - g.hd);
S[k + "2o"] = R(g.xi, g.X, g.m, g.Z - g.hd);
S[k + "3i"] = R(g.s, g.xi, g.g1, g.m);
S[k + "3o"] = R(g.xi, g.X, g.g1, g.m);
S[k + "4i"] = R(g.c, g.x4, -g.Z, g.g0);
S[k + "4o"] = R(g.x4, g.X, -g.Z, g.g0);
});
return S;
},
function (T, L) {
var S = esGrid(T.g), F = T.plan[L], out = [];
function push(o) { out.push(o); return o; }
Object.keys(F).forEach(function (key) {
var q = F[key];
if (key === "hall" || key === "spine" || key === "gallery") {
var R = S[key];
push({ k: q.k, n: q.n, x0: R.x0, x1: R.x1, z0: R.z0, z1: R.z1, open: true, doors: [], slot: key, tint: q.tint });
return;
}
if (q.merge) {
var M = null, ds = [];
q.merge.forEach(function (sl) { var r = S[sl]; M = M ? { x0: Math.min(M.x0, r.x0), x1: Math.max(M.x1, r.x1), z0: Math.min(M.z0, r.z0), z1: Math.max(M.z1, r.z1) } : { x0: r.x0, x1: r.x1, z0: r.z0, z1: r.z1 }; });
q.merge.forEach(function (sl) {
var r = S[sl], s = esSlotDoor(sl), d = esDoor(r, s);
var c = s === "w" ? r.x0 : s === "e" ? r.x1 : s === "n" ? r.z0 : r.z1, onEdge = s === "w" ? c === M.x0 : s === "e" ? c === M.x1 : s === "n" ? c === M.z0 : c === M.z1;
if (onEdge)
ds.push(d);
});
push({ k: q.k, n: q.n, x0: M.x0, x1: M.x1, z0: M.z0, z1: M.z1, doors: (q.doors || ds).map(function (d) { return esDoor(M, d.s, d.at); }), slot: key, tint: q.tint });
return;
}
var R0 = S[key];
if (!R0)
return;
var s0 = esSlotDoor(key);
var base = { x0: R0.x0, x1: R0.x1, z0: R0.z0, z1: R0.z1 };
if (q.split) {
var horizDoor = s0 === "n" || s0 === "s", t = q.at || 0.5, parts = q.parts;
if (q.split === "across") {
var rs = [];
if (!horizDoor) {
var zc = base.z0 + (base.z1 - base.z0) * t;
rs = [{ x0: base.x0, x1: base.x1, z0: base.z0, z1: zc }, { x0: base.x0, x1: base.x1, z0: zc, z1: base.z1 }];
}
else {
var inner = key.charAt(0) === "l" ? base.x1 : base.x0, outer = key.charAt(0) === "l" ? base.x0 : base.x1, xc = inner + (outer - inner) * t;
rs = [{ x0: Math.min(inner, xc), x1: Math.max(inner, xc), z0: base.z0, z1: base.z1 }, { x0: Math.min(xc, outer), x1: Math.max(xc, outer), z0: base.z0, z1: base.z1 }];
}
parts.forEach(function (p, i) { var r = rs[i]; push({ k: p.k, n: p.n, x0: r.x0, x1: r.x1, z0: r.z0, z1: r.z1, doors: [esDoor(r, s0)], slot: key + "." + i, tint: p.tint }); });
}
else {
var near, far, mid, farDoor;
if (s0 === "w") {
mid = base.x0 + (base.x1 - base.x0) * t;
near = { x0: base.x0, x1: mid, z0: base.z0, z1: base.z1 };
far = { x0: mid, x1: base.x1, z0: base.z0, z1: base.z1 };
farDoor = "w";
}
else if (s0 === "e") {
mid = base.x1 - (base.x1 - base.x0) * t;
near = { x0: mid, x1: base.x1, z0: base.z0, z1: base.z1 };
far = { x0: base.x0, x1: mid, z0: base.z0, z1: base.z1 };
farDoor = "e";
}
else if (s0 === "n") {
mid = base.z0 + (base.z1 - base.z0) * t;
near = { x0: base.x0, x1: base.x1, z0: base.z0, z1: mid };
far = { x0: base.x0, x1: base.x1, z0: mid, z1: base.z1 };
farDoor = "n";
}
else {
mid = base.z1 - (base.z1 - base.z0) * t;
near = { x0: base.x0, x1: base.x1, z0: mid, z1: base.z1 };
far = { x0: base.x0, x1: base.x1, z0: base.z0, z1: mid };
farDoor = "s";
}
var nd = esDoor(near, s0), fd;
if (horizDoor) {
var fx = (far.x0 + far.x1) / 2 + ((far.x1 - far.x0) / 2 - 1.3) * (key.charAt(0) === "l" ? -1 : 1);
fd = { s: farDoor, at: fx };
}
else
fd = { s: farDoor, at: far.z0 + 1.4 };
push({ k: parts[0].k, n: parts[0].n, x0: near.x0, x1: near.x1, z0: near.z0, z1: near.z1, doors: [nd], slot: key + ".0", tint: parts[0].tint });
push({ k: parts[1].k, n: parts[1].n, x0: far.x0, x1: far.x1, z0: far.z0, z1: far.z1, doors: [fd], slot: key + ".1", tint: parts[1].tint });
}
return;
}
var doors = q.doors ? q.doors.map(function (d) { return esDoor(base, d.s, d.at); }) : [esDoor(base, s0)];
(q.more || []).forEach(function (d) { doors.push(esDoor(base, d.s, d.at)); });
push({ k: q.k, n: q.n, x0: base.x0, x1: base.x1, z0: base.z0, z1: base.z1, doors: doors, slot: key, tint: q.tint });
});
return out;
},
function (key, size, tile, fn) {
if (ES_TEX[key])
return ES_TEX[key];
if (typeof document === "undefined")
return null;
var c = document.createElement("canvas");
c.width = c.height = size;
var x = c.getContext("2d");
if (!x)
return null;
try {
fn(x, size, size);
}
catch (e) {
return null;
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(1 / tile, 1 / tile);
if (typeof renderer !== "undefined" && renderer && renderer.capabilities)
t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
return (ES_TEX[key] = t);
},
function () {
return esCanvas("damask", 256, 1.1, function (x, W, H) {
x.fillStyle = "#E4E0D8";
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(150,140,128,.32)";
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++) {
var cx = W / 4 + i * W / 2 + (j % 2) * W / 4, cy = H / 4 + j * H / 2;
x.beginPath();
x.moveTo(cx, cy - 50);
x.bezierCurveTo(cx + 38, cy - 28, cx + 32, cy + 20, cx, cy + 50);
x.bezierCurveTo(cx - 32, cy + 20, cx - 38, cy - 28, cx, cy - 50);
x.fill();
x.beginPath();
x.arc(cx, cy - 62, 6, 0, 7);
x.fill();
x.beginPath();
x.arc(cx, cy + 62, 6, 0, 7);
x.fill();
}
});
},
function () {
return esCanvas("coffer", 256, 2.4, function (x, W, H) {
x.fillStyle = "#D4D0C8";
x.fillRect(0, 0, W, H);
x.fillStyle = "#E6E2DA";
x.fillRect(20, 20, W - 40, H - 40);
x.strokeStyle = "rgba(150,130,90,.55)";
x.lineWidth = 6;
x.strokeRect(18, 18, W - 36, H - 36);
x.strokeStyle = "rgba(120,110,100,.3)";
x.lineWidth = 2;
x.strokeRect(30, 30, W - 60, H - 60);
x.fillStyle = "rgba(150,130,90,.45)";
x.beginPath();
x.arc(W / 2, H / 2, 16, 0, 7);
x.fill();
});
},
function () {
return esCanvas("carpet", 256, 1.6, function (x, W, H) {
x.fillStyle = "#D8D4CE";
x.fillRect(0, 0, W, H);
var R = typeof rng === "function" ? rng(4711) : Math.random;
for (var i = 0; i < 2600; i++) {
var v = 200 + ((R() * 40) | 0);
x.fillStyle = "rgba(" + v + "," + v + "," + v + ",.5)";
x.fillRect(R() * W, R() * H, 2, 2);
}
x.strokeStyle = "rgba(150,145,140,.25)";
x.lineWidth = 2;
for (var j = 0; j < 4; j++)
for (var k = 0; k < 4; k++) {
var cx = j * 64 + 32, cy = k * 64 + 32;
x.beginPath();
x.moveTo(cx, cy - 12);
x.lineTo(cx + 12, cy);
x.lineTo(cx, cy + 12);
x.lineTo(cx - 12, cy);
x.closePath();
x.stroke();
}
});
},
function () {
return esCanvas("herring", 256, 1.6, function (x, W, H) {
var cols = ["#B89A78", "#A88A68", "#C4A684", "#9E8262"];
x.fillStyle = "#A88A68";
x.fillRect(0, 0, W, H);
for (var i = -4; i < 12; i++)
for (var j = 0; j < 10; j++) {
x.save();
x.translate(i * 32 + (j % 2) * 16, j * 32);
x.rotate((j % 2 ? -1 : 1) * Math.PI / 4);
x.fillStyle = cols[(i * 7 + j * 3 + 40) % 4];
x.fillRect(0, 0, 44, 14);
x.strokeStyle = "rgba(60,40,24,.4)";
x.strokeRect(0, 0, 44, 14);
x.restore();
}
});
},
function (col, surf, o) {
o = o || {};
var key = col + "|" + (surf || "") + "|" + (o.e || 0) + "|" + (o.op || 1) + "|" + (o.side || 0);
if (ES_MAT[key])
return ES_MAT[key];
var m = new THREE.MeshLambertMaterial({ color: col });
if (o.side)
m.side = THREE.DoubleSide;
if (o.e)
m.emissive = new THREE.Color(o.e);
if (o.op !== undefined && o.op < 1) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
var t = null;
if (surf && ES_PAT[surf])
t = ES_PAT[surf]();
else if (surf && typeof texOf === "function")
t = texOf(surf);
if (t) {
m.map = t;
m.userData.bwSurf = 1;
}
m.userData.wsfSkip = 1;
return (ES_MAT[key] = m);
},
function (r, T) {
var f = ES_FINISH[r.k] || ES_FINISH.corridor;
if (T && T.stone && (r.open || /drawing|music|library|office|billiards|morning|cards|dining/.test(r.k)))
f = { f: r.open ? "stone" : f.f, fc: r.open ? 0xA8A096 : f.fc, w: r.open ? 0xA8A092 : f.w, p: r.open ? "stone" : f.p, t: f.t === 0xB0925A ? 0x6A5038 : f.t, c: r.open ? null : f.c };
if (r.tint)
f = { f: f.f, fc: f.fc, w: r.tint, p: f.p, t: f.t, c: f.c };
return f;
},
function (list, X, Z) {
var Hm = {}, Vm = {};
function add(map, c, a, b) { var k = c.toFixed(2); (map[k] = map[k] || { c: c, iv: [] }).iv.push([Math.min(a, b), Math.max(a, b)]); }
list.forEach(function (r) { if (r.open)
return; add(Hm, r.z0, r.x0, r.x1); add(Hm, r.z1, r.x0, r.x1); add(Vm, r.x0, r.z0, r.z1); add(Vm, r.x1, r.z0, r.z1); });
add(Hm, -Z, -X, X);
add(Hm, Z, -X, X);
add(Vm, -X, -Z, Z);
add(Vm, X, -Z, Z);
function merge(map) {
Object.keys(map).forEach(function (k) {
var e = map[k];
e.iv.sort(function (a, b) { return a[0] - b[0]; });
var out = [];
e.iv.forEach(function (v) { var l = out[out.length - 1]; if (l && v[0] <= l[1] + 0.01)
l[1] = Math.max(l[1], v[1]);
else
out.push([v[0], v[1]]); });
e.iv = out;
});
}
merge(Hm);
merge(Vm);
return { h: Hm, v: Vm };
},
function (list) {
var out = [];
list.forEach(function (r) {
(r.doors || []).forEach(function (d) {
var o = d.s === "w" || d.s === "e" ? "v" : "h", c = d.s === "w" ? r.x0 : d.s === "e" ? r.x1 : d.s === "n" ? r.z0 : r.z1;
if (!out.some(function (q) { return q.o === o && Math.abs(q.c - c) < 0.01 && Math.abs(q.at - d.at) < 0.5; }))
out.push({ o: o, c: c, at: d.at, w: 1.8 });
});
});
return out;
},
function (A) {
var T = A.plan.estate, g = T.g, X = g.X, Z = g.Z, W = 2 * X, D = 2 * Z, H = A.H, F = A.FLOOR, lite = esLite();
A.size(W, D);
var run = A.run(), decor = [], rooms = [];
var flights = [];
for (var L0 = 0; L0 < A.levels - 1; L0++) {
var sx = (L0 % 2 ? 1 : -1) * T.stairX, zh = T.stairZ;
flights.push({ L: L0, x: sx, zh: zh, z0: zh - 0.25, z1: zh + run + 0.25, x0: sx - 1.25, x1: sx + 1.25 });
A.keepouts.push({ level: L0, x: sx, z: zh + run / 2, hw: 1.6, hd: run / 2 + 1.0 });
A.keepouts.push({ level: L0 + 1, x: sx, z: zh + run / 2, hw: 1.6, hd: run / 2 + 1.0 });
}
for (var L = 0; L < A.levels; L++) {
A.level(L);
var y0 = L * F, grp = new THREE.Group();
grp.name = "es-decor-" + L;
grp.userData.esLevel = L;
A.root.add(grp);
decor.push(grp);
var list = esRooms(T, L), lines = esLines(list, X, Z), ways = esDoorways(list);
if (L === 0)
ways.push({ o: "h", c: Z, at: 0, w: 2.2, front: true });
["h", "v"].forEach(function (o) {
var map = o === "h" ? lines.h : lines.v;
Object.keys(map).forEach(function (k) {
var e = map[k];
e.iv.forEach(function (v) {
var gaps = ways.filter(function (d) { return d.o === o && Math.abs(d.c - e.c) < 0.01 && d.at > v[0] + 0.6 && d.at < v[1] - 0.6; });
var gw = gaps.some(function (d) { return d.front; }) ? 2.2 : 1.8;
if (o === "h")
A.wall(v[0], e.c, v[1], e.c, gaps.map(function (d) { return d.at; }), gw);
else
A.wall(e.c, v[0], e.c, v[1], gaps.map(function (d) { return d.at; }), gw);
});
});
});
var up = flights.filter(function (f) { return f.L === L; })[0], down = flights.filter(function (f) { return f.L === L - 1; })[0];
list.forEach(function (r) {
r.L = L;
r.y0 = y0;
r.fin = esFin(r, T);
try {
esFinish(grp, r, y0, H, lines, ways, T, up, down);
}
catch (e) {
if (window.console)
console.warn("[estates] finish", r.n, e);
}
esWindows(A, r, X, Z, y0, L);
esLightsFor(A, r, y0);
rooms.push(r);
});
list.forEach(function (r) {
try {
esFurnish(A, r, L, T, { up: up, down: down, H: H, lite: lite, ways: ways, grp: grp, y0: y0 });
}
catch (e) {
if (window.console)
console.warn("[estates] furnish", r.n, e);
}
});
if (L > 0)
A.slab(L, W, D, y0 - 0.06);
}
flights.forEach(function (f) { A.stairs(f.x, f.zh, f.L, 1.8); });
A.level(0);
ES.last = { rooms: rooms, decor: decor, T: T, flights: flights, X: X, Z: Z };
return { W: W, D: D, exitZ: Z };
},
function (G, r, y0, H, lines, ways, T, up, down) {
var f = r.fin, inset = 0.105;
var x0 = r.x0, x1 = r.x1, z0 = r.z0, z1 = r.z1;
var floorMat = esMat(f.fc, ES_FLOORSURF[f.f] || "wood");
var cut = down && down.x1 > x0 && down.x0 < x1 && down.z1 > z0 && down.z0 < z1 ? down : null;
function floorRect(a0, a1, b0, b1) { if (a1 - a0 < 0.05 || b1 - b0 < 0.05)
return; esQuad(G, floorMat, a1 - a0, b1 - b0, (a0 + a1) / 2, y0 + 0.004, (b0 + b1) / 2, 0, -Math.PI / 2).userData.esPart = "f"; }
if (!cut)
floorRect(x0, x1, z0, z1);
else {
floorRect(x0, x1, z0, Math.max(z0, cut.z0));
floorRect(x0, x1, Math.min(z1, cut.z1), z1);
floorRect(x0, Math.max(x0, cut.x0), Math.max(z0, cut.z0), Math.min(z1, cut.z1));
floorRect(Math.min(x1, cut.x1), x1, Math.max(z0, cut.z0), Math.min(z1, cut.z1));
}
var climb = up && up.x1 > x0 && up.x0 < x1 && up.z1 > z0 && up.z0 < z1;
if (!climb) {
var cm = f.c === "coffer" ? esMat(0xD8D0C0, "coffer") : esMat(0xD6D0C6, "plaster");
esQuad(G, cm, x1 - x0, z1 - z0, (x0 + x1) / 2, y0 + H - 0.004, (z0 + z1) / 2, 0, Math.PI / 2);
}
var wm = esMat(f.w, f.p === "plaster" ? "plaster" : f.p === "wood" ? "wood" : f.p === "tile" ? "floortile" : f.p === "stone" ? "stone" : f.p === "marble" ? "marble" : f.p), tm = esMat(f.t, f.t === 0xB0925A || f.t === 0xB8985A || f.t === 0xA88A52 ? null : "wood", { e: (f.t === 0xB0925A || f.t === 0xB8985A || f.t === 0xA88A52) ? 0x1A1206 : 0 }), sk = esMat(typeof shade === "function" ? shade(f.t, -0.25) : f.t, "wood");
var edges = [{ o: "h", c: z0, a: x0, b: x1, n: 1 }, { o: "h", c: z1, a: x0, b: x1, n: -1 }, { o: "v", c: x0, a: z0, b: z1, n: 1 }, { o: "v", c: x1, a: z0, b: z1, n: -1 }];
edges.forEach(function (E) {
esCovered(lines, E.o, E.c, E.a, E.b).forEach(function (seg) {
var cuts = ways.filter(function (d) { return d.o === E.o && Math.abs(d.c - E.c) < 0.01 && d.at > seg[0] && d.at < seg[1]; }).sort(function (p, q) { return p.at - q.at; });
var at = seg[0], pieces = [];
cuts.forEach(function (d) { var a = d.at - d.w / 2, b = d.at + d.w / 2; if (a > at)
pieces.push([at, a, 0, H]); pieces.push([a, b, 2.3, H, d]); at = b; });
if (at < seg[1])
pieces.push([at, seg[1], 0, H]);
pieces.forEach(function (p) {
var len = p[1] - p[0];
if (len < 0.04)
return;
var mid = (p[0] + p[1]) / 2, hh = p[3] - p[2], yc = y0 + p[2] + hh / 2, off = E.c + E.n * inset;
var ry = E.o === "h" ? (E.n > 0 ? 0 : Math.PI) : (E.n > 0 ? Math.PI / 2 : -Math.PI / 2);
(E.o === "h" ? esQuad(G, wm, len, hh, mid, yc, off, ry) : esQuad(G, wm, len, hh, off, yc, mid, ry)).userData.esPart = "w";
var t2 = E.c + E.n * (inset + 0.02);
if (!p[4]) {
if (E.o === "h") {
esBox(G, sk, len, 0.2, 0.04, mid, y0 + 0.1, t2);
esBox(G, tm, len, 0.16, 0.07, mid, y0 + H - 0.08, E.c + E.n * (inset + 0.035));
}
else {
esBox(G, sk, 0.04, 0.2, len, t2, y0 + 0.1, mid);
esBox(G, tm, 0.07, 0.16, len, E.c + E.n * (inset + 0.035), y0 + H - 0.08, mid);
}
}
else {
var d = p[4], cm2 = E.c + E.n * (inset + 0.03);
if (E.o === "h") {
esBox(G, tm, 0.12, 2.36, 0.06, d.at - d.w / 2 - 0.06, y0 + 1.18, cm2);
esBox(G, tm, 0.12, 2.36, 0.06, d.at + d.w / 2 + 0.06, y0 + 1.18, cm2);
esBox(G, tm, d.w + 0.36, 0.14, 0.07, d.at, y0 + 2.37, cm2);
esBox(G, tm, len, 0.16, 0.07, mid, y0 + H - 0.08, E.c + E.n * (inset + 0.035));
}
else {
esBox(G, tm, 0.06, 2.36, 0.12, cm2, y0 + 1.18, d.at - d.w / 2 - 0.06);
esBox(G, tm, 0.06, 2.36, 0.12, cm2, y0 + 1.18, d.at + d.w / 2 + 0.06);
esBox(G, tm, 0.07, 0.14, d.w + 0.36, cm2, y0 + 2.37, d.at);
esBox(G, tm, 0.07, 0.16, len, E.c + E.n * (inset + 0.035), y0 + H - 0.08, mid);
}
}
});
});
});
ways.forEach(function (d) {
var onIt = d.o === "h" ? (Math.abs(d.c - z0) < 0.01 || Math.abs(d.c - z1) < 0.01) && d.at > x0 && d.at < x1 : (Math.abs(d.c - x0) < 0.01 || Math.abs(d.c - x1) < 0.01) && d.at > z0 && d.at < z1;
if (!onIt || r.open)
return;
var th = esMat(0xB8AE9E, "marble");
if (d.o === "h")
esBox(G, th, d.w, 0.02, 0.26, d.at, y0 + 0.012, d.c);
else
esBox(G, th, 0.26, 0.02, d.w, d.c, y0 + 0.012, d.at);
});
},
function (A, r, X, Z, y0, L) {
var big = !/kitchen|scullery|laundry|pantry|wine|bath|ensuite|cloak|changing|staffbath|boxroom|linen|sauna|cinema/.test(r.k);
var step = esLite() ? 7 : 4.2;
function along(a, b, fn) { var len = b - a, n = Math.max(1, Math.floor(len / step)); for (var i = 0; i < n; i++) {
var t = a + len * (i + 0.5) / n;
fn(t);
} }
if (r.k === "cinema" || r.k === "wine")
return;
if (Math.abs(r.x1 - X) < 0.01)
along(r.z0 + 1.2, r.z1 - 1.2, function (t) { A.windows.push({ x: X - 0.12, z: t, ry: -Math.PI / 2, y: y0, big: big }); });
if (Math.abs(r.x0 + X) < 0.01)
along(r.z0 + 1.2, r.z1 - 1.2, function (t) { A.windows.push({ x: -X + 0.12, z: t, ry: Math.PI / 2, y: y0, big: big }); });
if (Math.abs(r.z0 + Z) < 0.01)
along(r.x0 + 1.2, r.x1 - 1.2, function (t) { A.windows.push({ x: t, z: -Z + 0.12, ry: 0, y: y0, big: big }); });
if (Math.abs(r.z1 - Z) < 0.01)
along(r.x0 + 1.2, r.x1 - 1.2, function (t) { if (L === 0 && Math.abs(t) < 2.6)
return; A.windows.push({ x: t, z: Z - 0.12, ry: Math.PI, y: y0, big: big }); });
},
function (k) {
if (ES.size[k])
return ES.size[k];
var s = [1, 1, 1, 0];
try {
if (FURN[k]) {
var o = FURN[k](), b = new THREE.Box3().setFromObject(o);
if (!b.isEmpty())
s = [b.max.x - b.min.x, b.max.z - b.min.z, b.max.y, b.min.y, b.max.z, b.min.z];
o.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); });
}
}
catch (e) { }
return (ES.size[k] = s);
},
function (A, r, ctx) {
var d0 = (r.doors && r.doors[0]) || { s: "s", at: (r.x0 + r.x1) / 2 };
var s = d0.s, ix0 = r.x0 + 0.12, ix1 = r.x1 - 0.12, iz0 = r.z0 + 0.12, iz1 = r.z1 - 0.12, xc = (ix0 + ix1) / 2, zc = (iz0 + iz1) / 2, w, d, th, map, inv;
if (s === "w") {
w = ix1 - ix0;
d = iz1 - iz0;
th = 0;
map = function (u, v) { return [ix0 + u, zc + v]; };
inv = function (x, z) { return [x - ix0, z - zc]; };
}
else if (s === "e") {
w = ix1 - ix0;
d = iz1 - iz0;
th = Math.PI;
map = function (u, v) { return [ix1 - u, zc - v]; };
inv = function (x, z) { return [ix1 - x, zc - z]; };
}
else if (s === "n") {
w = iz1 - iz0;
d = ix1 - ix0;
th = -Math.PI / 2;
map = function (u, v) { return [xc - v, iz0 + u]; };
inv = function (x, z) { return [z - iz0, xc - x]; };
}
else {
w = iz1 - iz0;
d = ix1 - ix0;
th = Math.PI / 2;
map = function (u, v) { return [xc + v, iz1 - u]; };
inv = function (x, z) { return [iz1 - z, x - xc]; };
}
var doors = [];
(ctx.ways || []).forEach(function (q) {
var px = q.o === "h" ? q.at : q.c, pz = q.o === "h" ? q.c : q.at;
if (px < r.x0 - 0.05 || px > r.x1 + 0.05 || pz < r.z0 - 0.05 || pz > r.z1 + 0.05)
return;
var onEdge = q.o === "h" ? (Math.abs(q.c - r.z0) < 0.01 || Math.abs(q.c - r.z1) < 0.01) : (Math.abs(q.c - r.x0) < 0.01 || Math.abs(q.c - r.x1) < 0.01);
if (onEdge)
doors.push({ x: px, z: pz, w: q.w });
});
var H = ctx.H, X = (typeof HW !== "undefined" && HW.x) || null;
function clear(k, x, z) {
if (/rug_|carpet|redrunner/.test(k))
return true;
var sz = esSize(k);
if (sz[3] > 1.6)
return true;
var rad = Math.max(sz[0], sz[1]) / 2;
for (var i = 0; i < doors.length; i++) {
var q = doors[i];
if (Math.hypot(x - q.x, z - q.z) < q.w / 2 + 0.55 + rad * 0.75)
return false;
}
return true;
}
var taken = [];
function room(k, x, z, rot) {
if (/rug_|carpet|redrunner/.test(k))
return true;
var sz = esSize(k);
if (sz[3] > 0.3 || sz[2] < 0.05)
return true;
var c = Math.abs(Math.cos(rot)), sn = Math.abs(Math.sin(rot)), hw = (c * sz[0] + sn * sz[1]) * 0.4, hd = (sn * sz[0] + c * sz[1]) * 0.4;
for (var i = 0; i < taken.length; i++) {
var t = taken[i];
if (Math.abs(x - t.x) < hw + t.hw && Math.abs(z - t.z) < hd + t.hd)
return false;
}
taken.push({ x: x, z: z, hw: hw, hd: hd });
return true;
}
function P(k, u, v, f) {
if (!k || !FURN[k])
return false;
var p = map(u, v);
if (!clear(k, p[0], p[1]))
return false;
var rot = (typeof f === "number" ? f : (ES_FACE[f || "+v"] || 0)) + th;
if (!room(k, p[0], p[1], rot))
return false;
if (X && X.solidify)
X.solidify(k);
A.put(k, p[0], p[1], rot);
return true;
}
P.w = w;
P.d = d;
P.B = -d / 2;
P.F = d / 2;
P.H = H;
P.lite = !!ctx.lite;
P.r = r;
P.doors = doors.map(function (q) { var l = inv(q.x, q.z); return { u: l[0], v: l[1] }; });
P.door = P.doors.length ? P.doors.filter(function (q) { return q.u < 0.5; })[0] || P.doors[0] : { u: 0, v: 0 };
P.small = function (k, u, v, f) { if (!P.lite)
return P(k, u, v, f); return false; };
P.on = function (k, h, u, v, f) { if (P.lite || !X)
return false; return P(X.on(k, h), u, v, f); };
P.wall = function (side, k, t, lift) {
if (!k || !FURN[k])
return false;
var sz = esSize(k), back = -(sz[5] === undefined ? -sz[1] / 2 : sz[5]) + 0.03;
if (lift && X)
k = X.on(k, lift);
if (side === "B")
return P(k, t, -d / 2 + back, "+v");
if (side === "F")
return P(k, t, d / 2 - back, "-v");
if (side === "far")
return P(k, w - back, t, "-u");
return P(k, back, t, "+u");
};
P.row = function (side, k, a, b, step) { for (var t = a; t <= b + 0.01; t += step)
P.wall(side, k, t); };
P.ceil = function (k, u, v) { if (!k || !FURN[k] || !X)
return false; var sz = esSize(k), lift = Math.round((H - 0.04 - sz[2]) * 100) / 100; return P(lift > 0.05 ? X.on(k, lift) : k, u, v, 0); };
P.face = function (u, v, tu, tv) { return Math.atan2(tu - u, tv - v); };
P.spot = function (u, v, name) { var p = map(u, v); A.spots.push({ x: p[0], z: p[1], room: String(name || r.n).replace(/^The /, "").toLowerCase(), level: ctx.L }); };
P.solid = function (u, v, hw, hd, h) { var p = map(u, v), sw = (s === "n" || s === "s"); A.solid(p[0], p[1], sw ? hd : hw, sw ? hw : hd, h); };
P.map = map;
P.th = th;
return P;
},
function (P, cu, cv, o) {
o = o || {};
var sofa = o.sofa || esFab(o.design ? "kf_loungedesignsofa" : "kf_loungesofa");
P(esRug(o.rug || 0), cu, cv, "+v");
if (o.alongU) {
P(sofa, cu - 1.4, cv, "+u");
P(esWd("kf_tablecoffee"), cu, cv, "+u");
P(esFab("kf_loungechair"), cu + 0.1, cv - 1.6, P.face(0, -1.6, 0, 0));
P(esPk("kf_loungechair", [HW.p.fab2, HW.p.fab]), cu + 0.1, cv + 1.6, P.face(0, 1.6, 0, 0));
if (o.four)
P(sofa, cu + 1.5, cv, "-u");
return;
}
P(sofa, cu, cv - 1.35, "+v");
P(esWd("kf_tablecoffee"), cu, cv, "+v");
P(esFab("kf_loungechair"), cu - 1.65, cv + 0.1, "+u");
P(esPk("kf_loungechair", [HW.p.fab2, HW.p.fab]), cu + 1.65, cv + 0.1, "-u");
if (o.four)
P(sofa, cu, cv + 1.4, "-v");
P.on(esMt("kf_lamproundtable"), 0.94, cu - 1.6, cv - 1.3, "+v");
},
function (P, cu, cv, n, o) {
o = o || {};
var tk = o.cloth ? esWd("kf_tablecloth") : esWd("kf_table"), ck = o.chair || esWd("kf_chaircushion") || esWd("kf_chair");
var per = Math.max(1, Math.ceil(n / 4)), len = per * 1.6;
for (var i = 0; i < per; i++) {
var vu = cu - len / 2 + 0.8 + i * 1.6;
P(tk, vu, cv, 0);
if (!o.noChairs) {
P(ck, vu - 0.4, cv - 0.75, "+v");
P(ck, vu + 0.4, cv - 0.75, "+v");
P(ck, vu - 0.4, cv + 0.75, "-v");
P(ck, vu + 0.4, cv + 0.75, "-v");
}
}
if (!o.noChairs && !o.noEnds) {
P(ck, cu - len / 2 - 0.45, cv, "+u");
P(ck, cu + len / 2 + 0.45, cv, "-u");
}
return len;
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", esSt("qf_fireplace"), 0);
P.small(esWd("clock_mantel"), w - 0.3, 0, "-u");
P(esRug(0), w - 3.3, 0, "+u");
P(esFab("kf_loungedesignsofa"), w - 3.3, -1.4, "+v");
P(esPk("kf_loungedesignsofa", [HW.p.fab2, HW.p.fab]), w - 3.3, 1.4, "-v");
P(esWd("kf_tablecoffee"), w - 3.3, 0, "+u");
P(esFab("kf_loungechair"), w - 5.1, 0, "+u");
P(esWd("kf_sidetable"), w - 1.2, -2.4, "+v");
P.on(esMt("kf_lamproundtable"), 0.94, w - 1.2, -2.4, "+v");
P(esWd("kf_sidetable"), w - 1.2, 2.4, "-v");
P.on(esMt("kf_lamproundtable"), 0.94, w - 1.2, 2.4, "-v");
if (P.d > 10) {
esSalon(P, 2.9, B + 2.6, { rug: 2, design: true });
esSalon(P, 2.9, F - 2.6, { rug: 3 });
}
else
esSalon(P, 2.6, F - 2.4, { rug: 2 });
P.wall("B", "esconsole", w * 0.5);
P.wall("F", "displaycase", w * 0.5);
P.wall("B", esWd("clock_grandfather"), w - 1.0);
esArts(P, "B", 2, 1.2, w - 2);
esArts(P, "F", 2, 1.2, w - 2);
P.wall("far", esFab("qf_curtainsdouble"), -P.d / 2 + 1.4);
P.wall("far", esFab("qf_curtainsdouble"), P.d / 2 - 1.4);
esPlants(P);
P(esMt("kf_lamproundfloor"), w - 0.4, B + 0.4, 0);
P.ceil(esMt("qf_lightchandelier"), w - 3.3, 0);
if (P.d > 10) {
P.ceil("chandelier", 2.9, B + 2.6);
P.ceil("chandelier", 2.9, F - 2.6);
}
P.spot(w - 5, 1.5);
P.spot(3, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P("piano", w - 2.4, 0, "-u");
P(esWd("kf_chaircushion"), w - 1.6, 0.1, "-u");
P("esharp", w - 1.2, B + 1.4, "+u");
P("esstand", w - 3.6, B + 1.6, P.face(w - 3.6, B + 1.6, w - 2, 0));
P(esWd("kf_chaircushion"), w - 3.4, B + 2.2, P.face(w - 3.4, B + 2.2, w - 2, 0));
P("esstand", w - 3.6, F - 1.6, P.face(w - 3.6, F - 1.6, w - 2, 0));
P(esWd("kf_chaircushion"), w - 3.4, F - 2.2, P.face(w - 3.4, F - 2.2, w - 2, 0));
for (var i = -2; i <= 2; i++)
P(esWd("kf_chaircushion"), w - 5.6, i * 0.85, "+u");
if (w > 9)
for (var j = -2; j <= 2; j++)
P(esWd("kf_chaircushion"), w - 6.6, j * 0.85 + 0.42, "+u");
P(esRug(4), w - 4, 0, "+u");
P.wall("B", esFab("kf_loungedesignsofa"), 2.6);
P.wall("F", esFab("kf_loungedesignsofa"), 2.6);
P.wall("B", "displaycase", w - 4.5);
P.wall("F", esWd("kf_bookcasecloseddoors"), w - 4.5);
esArts(P, "B", 2, 1.2, w - 1.5);
esArts(P, "F", 1, w - 3, w - 0.6);
P.ceil(esMt("qf_lightchandelier"), w - 2.6, 0);
P.ceil(esMt("qf_lightchandelier"), 2.6, 0);
esPlants(P);
P.spot(w - 5.6, 1.3);
P.spot(2.5, -1);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
for (var u = 1.0; u < w - 0.6; u += 1.7) {
P.wall("B", "esbookcase", u);
P.wall("F", "esbookcase", u);
}
for (var v = B + 1.0; v < F - 0.6; v += 1.7)
P.wall("far", "esbookcase", v);
P.wall("door", "esbookcase", B + 1.0);
P.wall("door", "esbookcase", F - 1.0);
P("esreading", w * 0.52, 0, "+u");
P(esWd("kf_chaircushion"), w * 0.52 - 0.6, -0.8, "+v");
P(esWd("kf_chaircushion"), w * 0.52 + 0.6, -0.8, "+v");
P(esWd("kf_chaircushion"), w * 0.52 - 0.6, 0.8, "-v");
P(esWd("kf_chaircushion"), w * 0.52 + 0.6, 0.8, "-v");
P(esRug(1), w * 0.52, 0, "+u");
P(esFab("kf_loungechairrelax"), w - 1.6, B + 1.7, P.face(w - 1.6, B + 1.7, w - 3, B + 2.6));
P(esFab("kf_loungechairrelax"), w - 1.6, F - 1.7, P.face(w - 1.6, F - 1.7, w - 3, F - 2.6));
P(esMt("kf_lamproundfloor"), w - 0.9, B + 0.9, 0);
P(esMt("kf_lamproundfloor"), w - 0.9, F - 0.9, 0);
P("esglobe", w * 0.52 - 2.3, B + 1.6, 0);
P(esWd("kf_desk"), 2.0, F - 1.5, "-v");
P(esPk("kf_chairdesk", ["black", "navy"]), 2.0, F - 2.2, "+v");
P.on(esMt("kf_lamproundtable"), 0.79, 2.4, F - 1.4, "-v");
P.ceil(esMt("qf_lightchandelier"), w * 0.52, 0);
P.spot(w * 0.52, 1.6);
P.spot(w - 2.5, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P(esWd("kf_desk"), w - 1.4, 0, "-u");
P(esPk("kf_chairdesk", ["black", "navy"]), w - 0.8, 0, "-u");
P(esWd("kf_chaircushion"), w - 2.6, -0.6, "+u");
P(esWd("kf_chaircushion"), w - 2.6, 0.6, "+u");
P.on(esMt("kf_lamproundtable"), 0.79, w - 1.3, -0.5, "-u");
P.wall("far", esWd("kf_bookcaseclosedwide"), B + 1.3);
P.wall("far", esWd("kf_bookcaseclosedwide"), F - 1.3);
P("maptable", w * 0.4, 0, 0);
P(esRug(2), w * 0.4, 0, "+u");
P.wall("B", "filecabinet", 1.4);
P.wall("B", "filecabinet", 2.1);
P.wall("B", "filecabinet", 2.8);
P.wall("F", esFab("kf_loungesofa"), w * 0.45);
P(esWd("kf_tablecoffee"), w * 0.45, F - 1.6, "-v");
P.wall("B", esWd("clock_grandfather"), w - 1.2);
esArts(P, "B", 1, w * 0.45, w * 0.7);
esArts(P, "F", 1, 1.2, 2.6);
esPlants(P);
P.ceil(esMt("qf_lightchandelier"), w * 0.5, 0);
P.spot(w - 2, 1.4);
P.spot(w * 0.4, 1.6);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P("esbilliard", w * 0.45, 0, "+u");
P(esRug(5), w * 0.45, 0, "+u");
P.ceil(esMt("qf_lightceiling1"), w * 0.45 - 0.8, 0);
P.ceil(esMt("qf_lightceiling1"), w * 0.45 + 0.8, 0);
P.wall("B", "escuerack", w * 0.45);
P.wall("far", "esbar", 0);
P(esWd("kf_stoolbar"), w - 1.7, -0.7, "+u");
P(esWd("kf_stoolbar"), w - 1.7, 0, "+u");
P(esWd("kf_stoolbar"), w - 1.7, 0.7, "+u");
P(esFab("kf_loungechair"), 1.5, F - 1.4, P.face(1.5, F - 1.4, w * 0.45, 0));
P(esFab("kf_loungechair"), 2.8, F - 1.0, P.face(2.8, F - 1.0, w * 0.45, 0));
P(esWd("kf_sidetable"), 2.1, F - 0.4, "-v");
P("escardtable", w - 2.0, F - 1.6, 0);
[0, 1, 2, 3].forEach(function (i) { var a = i * Math.PI / 2 + 0.78, cu = w - 2.0 + Math.cos(a) * 0.85, cv = F - 1.6 + Math.sin(a) * 0.85; P(esWd("kf_chaircushion"), cu, cv, P.face(cu, cv, w - 2.0, F - 1.6)); });
esArts(P, "F", 1, w * 0.35, w * 0.6);
P.wall("B", esWd("clock_grandfather"), 1.2);
P.spot(w * 0.45, 1.4);
P.spot(w - 2.2, -1.2);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P("espalm", w - 1.0, B + 1.0, 0);
P("espalm", w - 1.0, F - 1.0, 0);
P("espalm", 1.2, B + 1.0, 0);
P("espalm", 1.2, F - 1.0, 0);
for (var v = B + 2.2; v < F - 2; v += 1.6) {
P("plant", w - 0.6, v, 0);
}
for (var u = 2.6; u < w - 2; u += 1.8) {
P("flowerbucket", u, B + 0.5, 0);
P("flowerbucket", u, F - 0.5, 0);
}
P(esPk("qf_tableroundlarge", ["white", "pine", "oak"]), w * 0.5, 0, 0);
[0, 1, 2, 3].forEach(function (i) { var a = i * Math.PI / 2 + 0.4, cu = w * 0.5 + Math.cos(a) * 1.25, cv = Math.sin(a) * 1.25; P(esPk("kf_chaircushion", ["sage", "ivory", "dove"]), cu, cv, P.face(cu, cv, w * 0.5, 0)); });
P(esPk("kf_loungechairrelax", ["sage", "ivory"]), w * 0.5, B + 2.4, "+v");
P(esPk("kf_loungechairrelax", ["sage", "ivory"]), w * 0.5, F - 2.4, "-v");
P.ceil(esMt("qf_lightceiling2"), w * 0.5, 0);
P.spot(w * 0.5, 1.8);
P.spot(2.6, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
esSalon(P, w * 0.55, 0, { rug: 1, design: true, four: true });
P.wall("far", "esconsole", 0);
P.wall("far", esFab("qf_curtainsdouble"), B + 1.4);
P.wall("far", esFab("qf_curtainsdouble"), F - 1.4);
P.wall("B", esFab("kf_loungedesignsofa"), w * 0.5);
P.wall("F", esFab("kf_loungedesignsofa"), w * 0.5);
P.wall("B", "esbust", 1.2);
P.wall("F", "esbust", 1.2);
P("espalm", w - 1.0, B + 1.0, 0);
P("espalm", w - 1.0, F - 1.0, 0);
esArts(P, "B", 1, w * 0.6, w - 1.4);
esArts(P, "F", 1, w * 0.6, w - 1.4);
P.ceil(esMt("qf_lightchandelier"), w * 0.55, 0);
P.spot(w * 0.55, 2.4);
P.spot(2, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F, n = Math.max(2, Math.round(P.d / 6));
for (var i = 0; i < n; i++) {
var v = B + P.d * (i + 0.5) / n;
P.ceil("chandelier", w * 0.5, v);
}
P("piano", w * 0.5, F - 1.6, "-v");
P(esWd("kf_chaircushion"), w * 0.5 + 0.1, F - 0.85, "-v");
P("esharp", w - 1.4, F - 1.5, "-v");
P("esstand", w - 2.4, F - 2.2, "-v");
P("esstand", 1.6, F - 2.2, "-v");
P.wall("B", esWd("kf_tablecloth"), w * 0.5 - 0.8);
P.wall("B", esWd("kf_tablecloth"), w * 0.5 + 0.8);
P.on("candles", 0.62, w * 0.5 - 0.8, B + 0.5, "+v");
P.on("candles", 0.62, w * 0.5 + 0.8, B + 0.5, "+v");
for (var v2 = B + 3; v2 < F - 3; v2 += 1.1) {
P.wall("far", esWd("kf_chaircushion"), v2);
}
for (var v3 = B + 3; v3 < F - 3; v3 += 1.1) {
if (Math.abs(v3 - P.door.v) > 2)
P.wall("door", esWd("kf_chaircushion"), v3);
}
P("espalm", 0.9, B + 0.9, 0);
P("espalm", w - 0.9, B + 0.9, 0);
P("espalm", 0.9, F - 0.9, 0);
P("espalm", w - 0.9, F - 0.9, 0);
P(esSt("qf_columnround1"), w * 0.5 - 2.2, B + 0.5, 0);
P(esSt("qf_columnround1"), w * 0.5 + 2.2, B + 0.5, 0);
P.spot(w * 0.5, 0);
P.spot(w * 0.4, B + 4);
P.spot(w * 0.6, F - 4);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P(esRug(0), w * 0.5, 0, "+u");
P("feasttable", w * 0.5, -P.d * 0.18, 0);
P("feasttable", w * 0.5, P.d * 0.18, 0);
for (var s = -1; s <= 1; s += 2)
for (var k = -2; k <= 2; k++) {
P(esWd("kf_chaircushion"), w * 0.5 - 1.75, s * P.d * 0.18 + k * 1.2, "+u");
P(esWd("kf_chaircushion"), w * 0.5 + 1.75, s * P.d * 0.18 + k * 1.2, "-u");
}
P.wall("far", "fireplace", 0);
P.wall("far", "hallbanner", B + 2.5);
P.wall("far", "hallbanner", F - 2.5);
P.wall("B", "armourstand", w * 0.3);
P.wall("B", "armourstand", w * 0.7);
P.wall("F", "armourstand", w * 0.3);
P.wall("F", "armourstand", w * 0.7);
P.wall("B", "esorgan", w * 0.5);
P.ceil("ironchandelier", w * 0.5, -P.d * 0.18);
P.ceil("ironchandelier", w * 0.5, P.d * 0.18);
P.spot(w * 0.5, 0);
P.spot(w * 0.3, B + 3);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P(esPk("qf_tableroundlarge", ["white", "oak"]), w * 0.6, 0, 0);
[0, 1, 2, 3, 4, 5].forEach(function (i) { var a = i * Math.PI / 3, cu = w * 0.6 + Math.cos(a) * 1.3, cv = Math.sin(a) * 1.3; P(esWd("kf_chaircushion"), cu, cv, P.face(cu, cv, w * 0.6, 0)); });
P(esRug(3), w * 0.6, 0, "+u");
P.wall("far", esFab("kf_loungesofa"), B + P.d * 0.28);
P.wall("far", esWd("kf_sidetabledrawers"), F - 1.3);
P.wall("B", esWd("kf_desk"), w - 1.6);
P(esPk("kf_chairdesk", [HW.p.fab, "ivory"]), w - 1.6, B + 1.2, "-v");
P.wall("F", esWd("kf_bookcasecloseddoors"), w * 0.5);
esArts(P, "B", 1, 1.2, w * 0.5);
P("plant", 0.6, B + 0.6, 0);
P("plant", w - 0.6, F - 0.6, 0);
P.ceil(esMt("qf_lightchandelier"), w * 0.6, 0);
P.spot(w * 0.6, 2);
P.spot(2, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", esWd("kf_coatrackstanding"), B + 0.9);
P.wall("far", esWd("kf_coatrackstanding"), B + 1.9);
P.wall("B", esWd("kf_benchcushion"), w * 0.45);
P.wall("F", esSt("kf_toilet"), w - 0.8);
P.wall("F", esSt("kf_bathroomsink"), w - 2.2);
P.wall("F", esMt("qf_bathroommirror1"), w - 2.2);
P.wall("far", esPk("qf_bathroomtowel", ["white", "ivory"]), F - 1.8);
P("plant", 1.0, F - 0.6, 0);
P.spot(w * 0.4, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F, spots = [[w * 0.35, -P.d * 0.24], [w * 0.35, P.d * 0.24], [w * 0.75, -P.d * 0.24]];
spots.forEach(function (c) { P("escardtable", c[0], c[1], 0); [0, 1, 2, 3].forEach(function (i) { var a = i * Math.PI / 2 + 0.78, cu = c[0] + Math.cos(a) * 0.85, cv = c[1] + Math.sin(a) * 0.85; P(esWd("kf_chaircushion"), cu, cv, P.face(cu, cv, c[0], c[1])); }); });
P("eschess", w * 0.75, P.d * 0.24, 0);
P(esWd("kf_chaircushion"), w * 0.75, P.d * 0.24 - 0.65, "+v");
P(esWd("kf_chaircushion"), w * 0.75, P.d * 0.24 + 0.65, "-v");
P.wall("far", esWd("qf_drawer1"), 0);
P.on("candles", 0.68, w - 0.35, 0, "-u");
esArts(P, "B", 2);
esArts(P, "F", 1, 1.2, w * 0.5);
P.ceil(esMt("qf_lightchandelier"), w * 0.35, -P.d * 0.24);
P.ceil(esMt("qf_lightchandelier"), w * 0.35, P.d * 0.24);
P.spot(w * 0.55, 0);
P.spot(w * 0.35, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F, seats = w > 11 ? 16 : 12;
P(esRug(0), w * 0.52, 0, "+u");
var len = esTable(P, w * 0.52, 0, seats, { cloth: true });
P.on("candles", 0.62, w * 0.52 - len / 4, 0, "+u");
P.on("candles", 0.62, w * 0.52 + len / 4, 0, "+u");
P.ceil(esMt("qf_lightchandelier"), w * 0.52 - len / 4, 0);
P.ceil(esMt("qf_lightchandelier"), w * 0.52 + len / 4, 0);
P.wall("far", esSt("qf_fireplace"), 0);
P.wall("B", esWd("qf_drawer1"), w * 0.35);
P.wall("B", esWd("qf_drawer1"), w * 0.7);
P.on("candles", 0.68, w * 0.35, B + 0.35, "+v");
P.wall("F", esWd("kf_bookcasecloseddoors"), w * 0.4);
P.wall("F", esWd("kf_bookcasecloseddoors"), w * 0.4 + 0.9);
P.wall("F", esWd("clock_grandfather"), w - 1.0);
esArts(P, "B", 2, 1.2, w - 1.2);
esArts(P, "F", 1, w * 0.55, w - 1.6);
P("plant", 0.6, B + 0.6, 0);
P("plant", w - 0.6, B + 0.6, 0);
P.spot(w * 0.52, 1.6);
P.spot(w * 0.52, -1.6);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
for (var u = 1.2; u < w - 0.8; u += 0.9)
P.wall("B", esWd("kf_bookcasecloseddoors"), u);
for (var u2 = 1.6; u2 < w - 1.2; u2 += 0.88) {
P.wall("F", esWd("kf_kitchencabinetdrawer"), u2);
}
P.wall("F", esWd("kf_kitchensink"), w - 1.2);
P(esWd("kf_table"), w * 0.5, 0, "+u");
P(esWd("kf_chair"), w * 0.5 - 0.9, 0, "+u");
P("footchest", w - 0.7, 0, "-u");
P("esbellboard", 0, 0, 0) && 0;
P.wall("far", "esbellboard", 0);
P.wall("far", esWd("kf_coatrack"), F - 1.0);
P.spot(w * 0.5, 1.2);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
var run = ["kf_kitchencabinetdrawer", "kf_kitchensink", "kf_kitchencabinet", "kf_kitchencabinetdrawer", "kf_kitchensink", "kf_kitchencabinet", "kf_kitchencabinetdrawer", "kf_kitchencabinet", "kf_kitchencabinetdrawer", "kf_kitchencabinet"];
var u = 1.4, i = 0;
while (u < w - 1.4 && i < run.length) {
P.wall("B", esWd(run[i]), u);
if (!P.lite)
P.wall("B", esWd("kf_kitchencabinetupper"), u);
u += 0.88;
i++;
}
P.wall("B", esWd("kf_kitchenfridgebuiltin"), w - 0.6);
P.wall("far", "oven", 0);
P.wall("far", "herbrack", B + 1.6);
P.wall("far", esWd("kf_kitchenfridgebuiltin"), F - 0.9);
P("esisland", w * 0.55, B + 2.6, "+u");
P(esWd("kf_stoolbar"), w * 0.55 - 0.8, B + 3.5, "-v");
P(esWd("kf_stoolbar"), w * 0.55, B + 3.5, "-v");
P(esWd("kf_stoolbar"), w * 0.55 + 0.8, B + 3.5, "-v");
esTable(P, w * 0.45, F - 1.8, 8, {});
P.wall("F", "butcherblock", 1.4);
P.wall("F", esWd("kf_bookcasecloseddoors"), w - 1.2);
P.small(esWd("clock_wall"), 1.4, F - 0.1, "-v");
P.spot(w * 0.55, 0);
P.spot(w - 2, B + 2);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
var len = Math.min(w - 3.2, 7);
P("longtable", w * 0.5, 0, Math.PI / 2 + 0 * P.th);
for (var k = -1; k <= 1; k++) {
P(esWd("kf_bench"), w * 0.5 + k * 1.5, -1.3, "+v");
P(esWd("kf_bench"), w * 0.5 + k * 1.5, 1.3, "-v");
}
P(esWd("kf_chair"), w * 0.5 - 2.6, 0, "+u");
P(esWd("kf_chair"), w * 0.5 + 2.6, 0, "-u");
P.wall("far", "fireplace", 0);
P.wall("B", esWd("kf_bookcasecloseddoors"), w * 0.4);
P.wall("B", esWd("kf_bookcasecloseddoors"), w * 0.4 + 0.9);
P.wall("F", esWd("clock_grandfather"), w - 1.0);
P.wall("F", "esbellboard", w * 0.45);
P.spot(w * 0.5, 2.2);
P.spot(w * 0.3, -2.2);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
for (var v = B + 0.9; v < F - 0.8; v += 0.88)
P.wall("far", esWd(Math.round((v - B) / 0.88) % 2 ? "kf_kitchensink" : "kf_kitchencabinet"), v);
P.wall("B", esPk("qf_shelflarge", ["white", "pine", "oak"]), w * 0.45);
P.wall("F", esPk("qf_shelflarge", ["white", "pine", "oak"]), w * 0.45);
P(esWd("kf_table"), w * 0.4, 0, "+u");
P("barrel", 1.2, B + 0.7, 0);
P.spot(w * 0.5, 1.2);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "wglaundry", B + 1.3);
P.wall("far", "wglaundry", F - 1.3);
P("esironing", w * 0.5, B + 1.4, "+v");
P(esWd("kf_table"), w * 0.5, F - 1.4, "+u");
P.wall("B", esPk("qf_shelflarge", ["white", "pine"]), w * 0.75);
P.wall("F", esPk("qf_shelflarge", ["white", "pine"]), w * 0.75);
P("crates", 1.2, F - 0.9, 0);
P.spot(w * 0.5, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P(esWd("kf_desk"), w - 1.0, 0, "-u");
P(esWd("kf_chair"), w - 1.7, 0, "+u");
P.on(esMt("kf_lamproundtable"), 0.79, w - 0.9, 0.5, "-u");
P.wall("B", "keyrack", w * 0.5);
P.wall("B", esWd("kf_bookcasecloseddoors"), w - 1.1);
P.wall("F", esWd("kf_bookcasecloseddoors"), w - 1.1);
P.wall("F", esWd("kf_bookcasecloseddoors"), w - 2.0);
P(esFab("kf_loungechair"), w * 0.4, F - 1.2, "-v");
P(esWd("kf_sidetable"), w * 0.4 + 0.9, F - 0.4, "-v");
P(esRug(2), w * 0.45, 0, "+u");
P.wall("B", esWd("clock_wall"), 1.4);
P.spot(w * 0.5, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
for (var u = 1.3; u < w - 0.7; u += 1.35) {
P.wall("B", "eswinerack", u);
P.wall("F", "eswinerack", u);
}
for (var v = B + 1.4; v < F - 1.2; v += 1.35)
P.wall("far", "eswinerack", v);
P("barrel", w * 0.5, -0.9, 0);
P("barrel", w * 0.5, 0.9, 0);
P(esWd("kf_table"), w * 0.45, 0, "+u");
P.on("candles", 0.62, w * 0.45, 0, "+u");
P.spot(w * 0.4, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "fourposter", 0);
P.wall("far", esWd("qf_nightstand1"), -1.75);
P.wall("far", esWd("qf_nightstand1"), 1.75);
P.on(esMt("kf_lamproundtable"), 0.55, w - 0.4, -1.75, "-u");
P.on(esMt("kf_lamproundtable"), 0.55, w - 0.4, 1.75, "-u");
P("footchest", w - 3.0, 0, "-u");
P(esRug(3), w - 2.5, 0, "+u");
P.ceil(esMt("qf_lightchandelier"), w - 2.6, 0);
P.wall("B", esSt("qf_fireplace"), w * 0.38);
P(esFab("kf_loungechair"), w * 0.38 - 0.9, B + 2.0, P.face(w * 0.38 - 0.9, B + 2.0, w * 0.38, B + 0.4));
P(esPk("kf_loungechair", [HW.p.fab2, HW.p.fab]), w * 0.38 + 0.9, B + 2.0, P.face(w * 0.38 + 0.9, B + 2.0, w * 0.38, B + 0.4));
P(esWd("kf_tablecoffee"), w * 0.38, B + 1.6, "+v");
P.wall("F", esFab("kf_loungedesignsofa"), w * 0.45);
P.wall("F", esWd("kf_desk"), w - 1.2);
P(esPk("kf_chairdesk", [HW.p.fab, "ivory"]), w - 1.2, F - 1.1, "+v");
P.wall("far", esFab("qf_curtainsdouble"), B + 1.2);
P.wall("far", esFab("qf_curtainsdouble"), F - 1.2);
esArts(P, "B", 1, 1.2, w * 0.25);
esArts(P, "F", 1, 1.2, w * 0.3);
P("plant", 0.6, B + 0.6, 0);
P(esMt("kf_lamproundfloor"), w - 0.5, F - 0.5, 0);
P.spot(w - 3.4, 1.3);
P.spot(w * 0.38, B + 2.8);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
for (var u = 1.4; u < w - 0.8; u += 1.4) {
P.wall("B", "wardrobe", u);
P.wall("F", "wardrobe", u);
}
P.wall("far", "wallmirror", -0.6);
P.wall("far", "wallmirror", 0.6);
P(esWd("qf_drawer1"), w * 0.5, 0, "+u");
P(esFab("kf_benchcushion"), w * 0.5 + 1.2, 0, "-u");
P(esRug(4), w * 0.5, 0, "+u");
P.ceil(esMt("qf_lightceiling1"), w * 0.5, 0);
P.spot(w * 0.35, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P("esbathfree", w * 0.55, 0, "+v");
P(esRug(5), w * 0.55, 1.4, "+u");
P.ceil("chandelier", w * 0.55, 0);
P.wall("B", "esbasinrow", w * 0.55);
P.wall("F", "esshower", w - 1.0);
P.wall("F", esSt("kf_toilet"), w - 2.6);
P.wall("far", esPk("qf_bathroomtowel", ["white", "ivory"]), -0.8);
P.wall("far", esPk("qf_bathroomtowel", ["white", "ivory"]), 0.8);
P(esFab("kf_loungechair"), w - 1.0, B + 1.4, "-u");
P("espalm", w - 0.9, F - 2.4, 0);
P("plant", 1.2, B + 0.6, 0);
P.spot(w * 0.4, -1.6);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
esSalon(P, w * 0.55, 0, { rug: 2, design: true });
P.wall("far", esWd("kf_desk"), 0);
P(esPk("kf_chairdesk", [HW.p.fab2, "ivory"]), w - 1.2, 0, "+u");
P.on(esMt("kf_lamproundtable"), 0.79, w - 0.4, 0.5, "-u");
P.wall("B", esWd("kf_bookcasecloseddoors"), w * 0.4);
P.wall("B", esWd("kf_bookcasecloseddoors"), w * 0.4 + 0.9);
P.wall("F", "esconsole", w * 0.5);
P.wall("B", "piano", w - 1.6);
esArts(P, "F", 2, 1.2, w - 1.2);
P("plant", 0.6, B + 0.6, 0);
P("plant", w - 0.6, F - 0.6, 0);
P.ceil(esMt("qf_lightchandelier"), w * 0.55, 0);
P.spot(w * 0.55, 2);
},
function (P) {
var w = P.w, B = P.B, F = P.F, X = esX();
if (X && X.ROOM && X.ROOM.bedroom && P.w < 9 && P.d < 9) {
X.ROOM.bedroom(P);
P.spot(P.w * 0.4, 0);
return;
}
P.wall("far", esFab("qf_bedking"), 0);
P.wall("far", esWd("qf_nightstand1"), -1.35);
P.wall("far", esWd("qf_nightstand1"), 1.35);
P.on(esMt("kf_lamproundtable"), 0.55, w - 0.4, -1.35, "-u");
P.on(esMt("kf_lamproundtable"), 0.55, w - 0.4, 1.35, "-u");
P(esRug(3), w - 2.2, 0, "+u");
P("footchest", w - 2.7, 0, "-u");
P.wall("B", "wardrobe", w * 0.45);
P.wall("B", esWd("qf_drawer1"), w * 0.45 + 1.5);
P.wall("F", esWd("kf_desk"), w * 0.5);
P(esPk("kf_chairdesk", [HW.p.fab, "ivory"]), w * 0.5, F - 1.1, "+v");
P(esFab("kf_loungechair"), 1.6, B + 1.2, P.face(1.6, B + 1.2, w * 0.5, 0));
P(esMt("kf_lamproundfloor"), 0.9, B + 0.5, 0);
esArts(P, "far", 1, -P.d / 2 + 0.6, -1.9);
P.ceil(esMt("qf_lightchandelier"), w * 0.5, 0);
P.spot(w * 0.4, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F, X = esX();
if (P.d >= P.w) {
P.wall("far", esSt("kf_bathtub"), 0);
P.wall("B", esSt("kf_toilet"), w * 0.5);
P.wall("F", esSt("kf_bathroomsink"), w * 0.5);
P.wall("F", esMt("qf_bathroommirror1"), w * 0.5);
P.wall("B", esPk("qf_bathroomtowel", ["white", "ivory"]), w - 0.6);
P.small("plant", 0.6, F - 0.6, 0);
}
else {
P.wall("far", esSt("kf_bathtub"), B + 1.2);
P.wall("far", esSt("kf_bathroomsink"), 0.4);
P.wall("far", esMt("qf_bathroommirror1"), 0.4);
P.wall("far", esSt("kf_toilet"), F - 0.8);
P.wall("B", esPk("qf_bathroomtowel", ["white", "ivory"]), w * 0.5);
}
P.spot(w * 0.35, 0);
},
function (P, A) {
var w = P.w, B = P.B, F = P.F;
var tvp = P.map(w - 0.35, 0), rp = P.map(w - 0.45, 1.4);
A.tv(tvp[0], tvp[1], ES_FACE["-u"] + P.th, rp[0], rp[1], ES_FACE["-u"] + P.th);
P(esRug(1), w - 3.2, 0, "+u");
P(esFab("kf_loungesofacorner") || esFab("kf_loungesofa"), w - 4.8, 0, "+u");
P(esFab("kf_loungesofa"), w - 3.2, -1.7, "+v");
P(esFab("kf_loungesofa"), w - 3.2, 1.7, "-v");
P(esWd("kf_tablecoffee"), w - 3.2, 0, "+u");
P.wall("B", esWd("kf_bookcaseclosedwide"), w * 0.35);
P.wall("B", "esbookcase", w * 0.35 + 1.8);
P("eschess", 2.0, F - 1.4, 0);
P(esWd("kf_chaircushion"), 2.0, F - 2.05, "+v");
P(esWd("kf_chaircushion"), 2.0, F - 0.75, "-v");
P(esWd("kf_tableround") || esWd("kf_table"), w * 0.45, F - 1.5, 0);
P(esWd("kf_chair"), w * 0.45 - 0.8, F - 1.5, "+u");
P(esWd("kf_chair"), w * 0.45 + 0.8, F - 1.5, "-u");
esArts(P, "F", 1, w * 0.6, w - 1);
P("plant", 0.6, B + 0.6, 0);
P(esMt("kf_lamproundfloor"), w - 0.5, B + 0.5, 0);
P.ceil(esMt("qf_lightchandelier"), w - 3.2, 0);
P.spot(w - 3.2, 2.6);
P.spot(2.4, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
var cribs = 0;
[["far", -1.2], ["far", 1.2], ["B", w * 0.72], ["B", w * 0.45], ["F", w * 0.72]].forEach(function (c) { if (cribs < 2 && P.wall(c[0], "crib", c[1]))
cribs++; });
P(esRug(5), w * 0.5, 0.4, "+u");
P("toys", w * 0.5, 0.8, 0);
P.small(esPk("kf_bear", ["cream", "pink", "sky", "tan"]), w * 0.45, 0.2, "-u");
P.wall("B", esWd("kf_sidetabledrawers"), w * 0.22);
P.on(esPk("qf_bathroomtowel", ["white", "blush"]), 0.8, w * 0.22, B + 0.35, "+v");
P(esFab("kf_loungechairrelax"), w - 1.4, F - 1.4, P.face(w - 1.4, F - 1.4, w * 0.6, 0));
P(esWd("kf_sidetable"), w - 0.6, F - 2.3, "-u");
P.wall("F", esWd("kf_bookcaseopenlow"), w * 0.45);
P.wall("F", "footchest", w * 0.25);
P.wall("F", "wardrobe", w * 0.62);
P(esPk("kf_pillow", ["sky", "blush", "mustard"]), w * 0.38, -0.9, "+u");
P(esPk("kf_pillow", ["teal", "sage"]), w * 0.62, -0.9, "-u");
esArts(P, "B", 1, w * 0.3, w * 0.42);
P.wall("far", esPk("qf_curtainsdouble", ["blush", "sage", "sky", HW.p.fab2]), B + 0.9);
P.wall("far", esPk("qf_curtainsdouble", ["blush", "sage", "sky", HW.p.fab2]), F - 0.9);
P("plant", 0.6, B + 0.6, 0);
P.ceil(esMt("qf_lightceiling2"), w * 0.5, 0);
P.spot(w * 0.5, 1.6);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", esFab("kf_bedsingle"), B + 1.4);
P.wall("far", esWd("qf_nightstand1"), B + 2.4);
P.on(esMt("kf_lamproundtable"), 0.55, w - 0.4, B + 2.4, "-u");
P.wall("B", "wardrobe", w * 0.45);
P.wall("F", esWd("kf_desk"), w * 0.5);
P(esWd("kf_chair"), w * 0.5, F - 1.1, "+v");
P(esFab("kf_loungechair"), w * 0.5, 0.8, "-u");
P(esRug(2), w * 0.55, 0, "+u");
P.wall("F", esWd("kf_bookcaseopenlow"), w - 1.2);
esArts(P, "far", 1, 0.6, P.d / 2 - 0.8);
P.spot(w * 0.4, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "blackboard", 0);
P(esWd("kf_desk"), w - 1.6, 0, "-u");
for (var i = 0; i < 2; i++)
for (var j = -1; j <= 1; j += 2)
P("schooldesk", w - 3.6 - i * 1.5, j * 1.1, "-u");
P.wall("B", "esdollhouse", w * 0.4);
P.wall("B", esWd("kf_bookcaseopenlow"), 1.6);
P.wall("F", esWd("kf_bookcaseopenlow"), 1.6);
P.wall("F", "footchest", w * 0.4);
P("toys", 2.2, 0, 0);
P(esRug(4), 2.6, 0, "+u");
P(esPk("kf_pillow", ["sky", "blush", "mustard"]), 1.6, -0.8, "+u");
P(esPk("kf_pillow", ["teal", "sage"]), 1.6, 0.8, "+u");
P.ceil(esMt("qf_lightceiling2"), w * 0.5, 0);
P.spot(w * 0.5, 0);
P.spot(2, 1.6);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", esPk("kf_bedsingle", [HW.p.fab2, "teal", "sky", "blush"]), B + 1.6);
P.wall("far", esWd("qf_nightstand1"), B + 2.8);
P.on(esMt("kf_lamproundtable"), 0.55, w - 0.4, B + 2.8, "-u");
P.small(esPk("kf_bear", ["tan", "brown", "pink", "sky"]), w - 0.5, B + 1.0, "-u");
P.wall("F", esWd("kf_desk"), w * 0.5);
P(esPk("kf_chairdesk", [HW.p.fab, "navy"]), w * 0.5, F - 1.1, "+v");
P.wall("B", "wardrobe", w * 0.4);
P.wall("F", esWd("kf_bookcaseopenlow"), w * 0.5 + 1.6);
P("toys", w * 0.45, 0.6, 0);
P("footchest", w - 2.6, B + 1.0, "+v");
P(esRug(4), w * 0.5, 0, "+u");
esArts(P, "far", 1, 0.4, P.d / 2 - 0.8);
P.spot(w * 0.45, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", esSt("kf_bathtub"), 0);
P.wall("B", esSt("kf_toilet"), w * 0.55);
P.wall("F", esSt("kf_bathroomsink"), w * 0.4);
P.wall("F", esSt("kf_bathroomsink"), w * 0.4 + 0.8);
P.wall("F", esMt("qf_bathroommirror1"), w * 0.4 + 0.4);
P.wall("B", esPk("qf_bathroomtowel", ["sky", "blush", "white"]), w * 0.3);
P.wall("B", esPk("qf_shelfsmall1", ["white"]), w - 1.2);
P(esRug(5), w * 0.5, 0, "+u");
P.spot(w * 0.4, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", esSt("kf_bathtub"), -1.0);
P.wall("far", "esshower", 1.4);
P.wall("B", "esbasinrow", w * 0.5);
P.wall("F", esSt("kf_toilet"), w * 0.6);
P.wall("F", esPk("qf_bathroomtowel", ["white", "ivory"]), w * 0.35);
P(esRug(5), w * 0.5, 0, "+u");
P("plant", 0.6, F - 0.6, 0);
P.spot(w * 0.4, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
for (var u = 1.2; u < w - 0.6; u += 1.7) {
P.wall("B", esPk("qf_shelflarge", ["white", "pine", "oak"]), u);
}
P.wall("far", esWd("kf_bookcasecloseddoors"), -0.45);
P.wall("far", esWd("kf_bookcasecloseddoors"), 0.45);
P(esWd("kf_table"), w * 0.5, F - 1.4, "+u");
P("esironing", w * 0.5, 0.4, "+v");
P.spot(w * 0.4, 0.6);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "essewing", 0);
P(esWd("kf_chair"), w - 1.2, 0, "+u");
P("dressform", w * 0.5, B + 1.0, "+v");
P("dressform", w * 0.5 + 1, B + 1.0, "+v");
P.wall("F", esPk("qf_shelflarge", ["white", "pine"]), w * 0.5);
P.wall("F", "wallmirror", w - 1.2);
P(esRug(2), w * 0.45, 0, "+u");
P(esFab("kf_loungechair"), 1.6, F - 1.2, "+u");
P.spot(w * 0.4, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
for (var u = 1.4; u < w - 0.8; u += 1.0)
P.wall("B", "esarcade", u);
P("esfoos", w * 0.4, 0, "+u");
P("escardtable", w * 0.75, -1.6, 0);
[0, 1, 2, 3].forEach(function (i) { var a = i * Math.PI / 2 + 0.78, cu = w * 0.75 + Math.cos(a) * 0.85, cv = -1.6 + Math.sin(a) * 0.85; P(esWd("kf_chaircushion"), cu, cv, P.face(cu, cv, w * 0.75, -1.6)); });
P("eschess", w * 0.75, 1.6, 0);
P(esWd("kf_chaircushion"), w * 0.75, 0.95, "+v");
P(esWd("kf_chaircushion"), w * 0.75, 2.25, "-v");
P.wall("F", esFab("kf_loungesofa"), w * 0.45);
P.wall("F", "esbookcase", w - 1.4);
P.wall("far", "wgtv", 0);
P(esFab("kf_loungechair"), w - 2.4, -0.6, "+u");
P(esRug(1), w * 0.4, 0, "+u");
P.ceil(esMt("qf_lightceiling1"), w * 0.4, 0);
P.ceil(esMt("qf_lightceiling1"), w * 0.75, 0);
P.spot(w * 0.5, 0);
P.spot(2, 1.6);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "esscreen", 0);
var rows = Math.max(2, Math.min(4, Math.floor((w - 5) / 1.6))), seats = Math.max(3, Math.min(6, Math.floor((P.d - 2.4) / 0.95)));
for (var rI = 0; rI < rows; rI++)
for (var s = 0; s < seats; s++) {
var v = (s - (seats - 1) / 2) * 0.95;
if (Math.abs(v - P.door.v) < 1.3 && rI === rows - 1)
continue;
P("esrecliner", w - 4.6 - rI * 1.55, v, "+u");
}
P.wall("B", esWd("kf_sidetable"), w * 0.4);
P.wall("F", esWd("kf_sidetable"), w * 0.4);
P.wall("B", esMt("kf_lampwall"), w * 0.6);
P.wall("F", esMt("kf_lampwall"), w * 0.6);
P.spot(w - 5, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "wgtreadmill", B + 1.4);
P.wall("far", "wgtreadmill", B + 2.6);
P.wall("far", "esbike", F - 1.4);
P.wall("far", "esbike", F - 2.4);
P.wall("B", "esweights", w * 0.5);
for (var u = 1.5; u < w - 1; u += 1.0)
P.wall("F", "wallmirror", u);
P(esWd("kf_bench"), w * 0.5, 0, "+u");
P(esRug(5), w * 0.35, 0.4, "+u");
P.wall("B", "wgwatercooler", 1.3);
P.spot(w * 0.5, 1.2);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "essauna", 0);
P("essaunastove", w - 2.6, B + 0.6, "+v");
P.wall("B", "esshower", 1.6);
P.wall("F", esWd("kf_bench"), w * 0.4);
P.wall("F", esWd("kf_bench"), w * 0.4 + 1.3);
P.wall("B", esPk("qf_bathroomtowel", ["white", "ivory"]), w * 0.45);
P.wall("B", esPk("qf_bathroomtowel", ["white", "ivory"]), w * 0.45 + 0.7);
P.spot(w * 0.45, 0);
},
function (P, A, ctx) {
var w = P.w, B = P.B, F = P.F, along = w >= P.d;
var pl = along ? Math.min(w - 6, 18) : Math.min(P.d - 5, 16), pw = along ? Math.min(P.d - 4.6, 6) : Math.min(w - 4.6, 6), cu = along ? w * 0.5 + 0.6 : w * 0.5, cv = along ? (P.d > 8 ? 0.9 : 0) : 0, G = ctx.grp, y0 = ctx.y0;
var c = P.map(cu, cv), rot = P.th + (along ? Math.PI / 2 : 0), rim = esMat(0xD4CEC4, "marble"), water = esMat(0x4E8E9E, null, { op: 0.72 }), bed = esMat(0x7AAAB8, "floortile");
var g = new THREE.Group();
g.position.set(c[0], y0, c[1]);
g.rotation.y = rot;
G.add(g);
esBox(g, bed, pw, 0.06, pl, 0, 0.03, 0);
esBox(g, water, pw, 0.02, pl, 0, 0.46, 0);
esBox(g, rim, pw + 0.8, 0.55, 0.4, 0, 0.275, -pl / 2 - 0.2);
esBox(g, rim, pw + 0.8, 0.55, 0.4, 0, 0.275, pl / 2 + 0.2);
esBox(g, rim, 0.4, 0.55, pl, -pw / 2 - 0.2, 0.275, 0);
esBox(g, rim, 0.4, 0.55, pl, pw / 2 + 0.2, 0.275, 0);
for (var st = 0; st < 3; st++)
esBox(g, rim, 1.6, 0.14 * (st + 1), 0.32, 0, 0.07 * (st + 1), pl / 2 - 0.16 - st * 0.32);
if (along)
P.solid(cu, cv, pl / 2 + 0.4, pw / 2 + 0.4, 0.6);
else
P.solid(cu, cv, pw / 2 + 0.4, pl / 2 + 0.4, 0.6);
if (along) {
for (var u = cu - pl / 2 + 1.2; u < cu + pl / 2 - 0.5; u += 2.2)
P("eslounger", u, cv - pw / 2 - 1.5, "+v");
}
else
for (var v = -pl / 2 + 1.2; v < pl / 2 - 0.5; v += 2.2)
P("eslounger", 1.4, v, "+u");
P.wall("far", esPk("qf_shelflarge", ["white"]), F - 1.0);
P("espalm", w - 0.9, F - 0.9, 0);
P("espalm", w - 0.9, B + 0.9, 0);
P("espalm", 0.9, F - 0.9, 0);
P("espalm", 0.9, B + 0.9, 0);
P.spot(1.6, B + 1.2);
P.spot(w - 1.2, B + 1.4);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P("estelescope", w - 1.8, 0, "-u");
P("esglobe", w * 0.45, B + 1.6, 0);
P("maptable", w * 0.45, 0.8, 0);
P(esFab("kf_loungechairrelax"), w - 3.2, B + 1.4, P.face(w - 3.2, B + 1.4, w, 0));
P(esFab("kf_loungechairrelax"), w - 3.2, F - 1.4, P.face(w - 3.2, F - 1.4, w, 0));
P.wall("B", esWd("kf_bookcaseclosedwide"), w * 0.7);
P.wall("F", esWd("kf_desk"), w * 0.4);
P(esWd("kf_chair"), w * 0.4, F - 1.1, "+v");
esArts(P, "B", 1, 1.2, w * 0.45);
esArts(P, "F", 1, w * 0.6, w - 1);
P(esRug(4), w * 0.45, 0.4, "+u");
P.spot(w * 0.5, -1);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("B", "eslockers", w * 0.35);
P.wall("B", "eslockers", w * 0.35 + 2.1);
P(esWd("kf_bench"), w * 0.5, B + 1.4, "+v");
P.wall("far", "esshower", B + 1.2);
P.wall("far", "esshower", B + 2.4);
P.wall("far", "esshower", F - 1.2);
P.wall("F", "esbasinrow", w * 0.45);
P.wall("F", esPk("qf_bathroomtowel", ["white"]), w - 1.6);
P.spot(w * 0.4, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P("esmassage", w * 0.4, -P.d * 0.22, "+u");
P("esmassage", w * 0.4, P.d * 0.22, "+u");
P.wall("far", esPk("qf_shelflarge", ["white", "pine"]), 0);
P.wall("B", esSt("kf_bathroomsink"), w - 1.2);
P.wall("F", esFab("kf_loungechair"), w - 1.2);
P("plant", 0.6, B + 0.6, 0);
P("plant", w - 0.6, F - 0.6, 0);
P(esRug(2), w * 0.4, 0, "+u");
P.spot(w * 0.5, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
esSalon(P, w * 0.6, B + 2.4, { rug: 1 });
P.wall("B", "wgtv", w * 0.6);
esTable(P, w * 0.55, F - 2.0, 6, {});
P.wall("far", esWd("kf_kitchencabinet"), -0.45);
P.wall("far", esWd("kf_kitchensink"), 0.45);
P.wall("far", esWd("kf_kitchenfridgebuiltin"), 1.4);
P.wall("F", "esbookcase", 1.4);
P.wall("B", esWd("clock_wall"), 1.2);
P.spot(w * 0.5, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", esFab("kf_beddouble"), B + 2.2);
P.wall("far", esWd("qf_nightstand1"), B + 0.7);
P.wall("B", "wardrobe", w - 1.2);
esSalon(P, w * 0.4, F - 2.6, { rug: 2 });
P.wall("F", esWd("kf_desk"), w - 1.4);
P(esWd("kf_chair"), w - 1.4, F - 1.1, "+v");
P.wall("B", esWd("kf_bookcasecloseddoors"), w * 0.35);
esArts(P, "B", 1, 1.2, w * 0.25);
P.spot(w * 0.4, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F, wide = P.d > 4.4;
P.wall("far", esFab("kf_bedsingle"), wide ? B + 1.1 : 0);
if (wide)
P.wall("far", esFab("kf_bedsingle"), F - 1.1);
P.wall(wide ? "B" : "far", esWd("qf_nightstand1"), wide ? w - 1.8 : B + 0.5);
P.wall("B", "wardrobe", w * 0.4);
P.wall("F", esWd("kf_desk"), w * 0.4);
P(esWd("kf_chair"), w * 0.4, F - 1.0, "+v");
P(esRug(3), w * 0.6, 0, "+u");
P.spot(w * 0.45, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
var run = ["kf_kitchencabinetdrawer", "kf_kitchensink", "kf_kitchencabinet", "kf_kitchenstove", "kf_kitchencabinetdrawer", "kf_kitchencabinet"];
for (var i = 0; i < run.length; i++)
P.wall("far", esWd(run[i]), B + 1.2 + i * 0.88);
P.wall("far", esWd("kf_kitchenfridgebuiltin"), B + 1.2 + run.length * 0.88 + 0.1);
esTable(P, w * 0.45, 0, 8, {});
P.wall("B", esWd("kf_bookcasecloseddoors"), w * 0.4);
P.spot(w * 0.45, 1.8);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P("treasel", w - 1.6, -1.2, "-u");
P("treasel", w - 1.6, 1.4, "-u");
P(esWd("kf_stoolbar"), w - 2.5, -1.2, "+u");
P(esWd("kf_stoolbar"), w - 2.5, 1.4, "+u");
P(esWd("kf_table"), w * 0.45, 0, "+u");
P.wall("B", esPk("qf_shelflarge", ["white", "pine"]), w * 0.45);
P.wall("F", esFab("kf_loungesofa"), w * 0.45);
esArts(P, "B", 2, 1.2, w * 0.35);
esArts(P, "F", 1, w * 0.65, w - 1);
P(esRug(5), w * 0.45, 0, "+u");
P.spot(w * 0.4, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
for (var u = 1.4; u < w - 0.8; u += 1.6) {
P.wall("B", "armourstand", u);
P.wall("F", "weaponrack", u);
}
P.wall("far", "hallbanner", -1.5);
P.wall("far", "hallbanner", 1.5);
P.wall("far", "displaycase", 0);
P("footchest", w * 0.5, 0, "+u");
P.ceil("ironchandelier", w * 0.5, 0);
P.spot(w * 0.45, 0);
},
function (P) {
var w = P.w, B = P.B, F = P.F;
P.wall("far", "esaltar", 0);
for (var u = 2.2; u < w - 2.4; u += 1.25) {
P("espew", u, -1.7, "+u");
P("espew", u, 1.7, "+u");
}
P.wall("B", "candles", w - 1.4);
P.wall("F", "candles", w - 1.4);
P.wall("far", "hallbanner", -2.2);
P.wall("far", "hallbanner", 2.2);
P.ceil("ironchandelier", w * 0.5, 0);
P.spot(w * 0.4, 0);
},
function (P, A, ctx) {
var r = P.r, up = ctx.up, front = r.z1, put = function (k, x, z, rot) { if (k && FURN[k]) {
var X = esX();
if (X && X.solidify)
X.solidify(k);
A.put(k, x, z, rot || 0);
} };
var cx = 0, X0 = r.x0, X1 = r.x1, sx = up ? up.x : -4;
put("redrunner", 0, front - 6, 0);
var ox = -sx > 0 ? X1 : X0, sgn = ox > 0 ? -1 : 1;
put("esconsole", ox + sgn * 0.35, front - 6, sgn > 0 ? Math.PI / 2 : -Math.PI / 2);
put("wallmirror", ox + sgn * 0.16, front - 6, sgn > 0 ? Math.PI / 2 : -Math.PI / 2);
put(esWd("clock_grandfather"), ox + sgn * 0.35, front - 9.2, sgn > 0 ? Math.PI / 2 : -Math.PI / 2);
put("esbust", ox + sgn * 0.5, front - 2.4, 0);
put("esbust", ox + sgn * 0.5, r.z0 + 1.6, 0);
put("espalm", X0 + 0.9, front - 0.9, 0);
put("espalm", X1 - 0.9, front - 0.9, 0);
put(esWd("kf_coatrackstanding"), sx, front - 1.0, 0);
put(esWd("kf_benchcushion"), sx, front - 2.3, Math.PI / 2 * Math.sign(-sx));
put(esArt(ES_ART++), ox + sgn * 0.14, front - 11, sgn > 0 ? Math.PI / 2 : -Math.PI / 2);
var X = esX(), ch = X ? X.on("chandelier", Math.round((ctx.H - 0.04 - 3.2) * 100) / 100) : "chandelier";
put(ch, 0, front - 5, 0);
put(ch, 0, r.z0 + 2.2, 0);
A.spots.push({ x: 0, z: front - 4, room: "great hall", level: ctx.L });
},
function (P, A, ctx) {
var r = P.r, front = r.z1, put = function (k, x, z, rot) { if (k && FURN[k])
A.put(k, x, z, rot || 0); };
var sx = ctx.up ? ctx.up.x : -4, ox = -sx > 0 ? r.x1 : r.x0, sgn = ox > 0 ? -1 : 1;
put("redrunner", 0, front - 6, 0);
[front - 2.5, front - 5.5, front - 8.5].forEach(function (z) { put("armourstand", ox + sgn * 0.6, z, sgn > 0 ? Math.PI / 2 : -Math.PI / 2); });
put("hallbanner", ox + sgn * 0.1, front - 4, sgn > 0 ? Math.PI / 2 : -Math.PI / 2);
put("hallbanner", ox + sgn * 0.1, front - 7, sgn > 0 ? Math.PI / 2 : -Math.PI / 2);
put("fireplace", 0, r.z0 + 0.5, 0);
put("ironchandelier", 0, front - 5, 0);
put("brazier", r.x0 + 1, front - 1, 0);
put("brazier", r.x1 - 1, front - 1, 0);
A.spots.push({ x: 0, z: front - 4, room: "great hall", level: ctx.L });
},
function (P, A, ctx) {
var r = P.r, put = function (k, x, z, rot) { if (k && FURN[k])
A.put(k, x, z, rot || 0); };
var holes = [ctx.up, ctx.down].filter(Boolean), busy = function (x, z) { return holes.some(function (h) { return x > h.x0 - 1 && x < h.x1 + 1 && z > h.z0 - 1 && z < h.z1 + 1; }); };
if (!busy(0, r.z1 - 1.2))
put(esWd("kf_benchcushion") || esWd("kf_bench"), 0, r.z1 - 0.5, Math.PI);
[[r.x0 + 0.6, r.z1 - 0.6], [r.x1 - 0.6, r.z1 - 0.6]].forEach(function (p) { if (!busy(p[0], p[1]))
put("espalm", p[0], p[1], 0); });
put(esArt(ES_ART++), r.x0 + 0.16, r.z0 + 2.6, Math.PI / 2);
put(esArt(ES_ART++), r.x1 - 0.16, r.z0 + 2.6, -Math.PI / 2);
put("esbust", r.x0 + 0.5, r.z0 + 0.6, 0);
put("esbust", r.x1 - 0.5, r.z0 + 0.6, 0);
var X = esX();
put(X ? X.on("chandelier", Math.round((ctx.H - 0.04 - 3.2) * 100) / 100) : "chandelier", 0, (r.z0 + r.z1) / 2, 0);
A.spots.push({ x: 0, z: r.z0 + 1.4, room: "landing", level: ctx.L });
},
function (P, A, ctx) {
var r = P.r, put = function (k, x, z, rot) { if (k && FURN[k])
A.put(k, x, z, rot || 0); };
var len = r.z1 - r.z0, n = Math.max(1, Math.floor(len / 4)), ways = ctx.ways || [];
function nearDoor(x, z) { return ways.some(function (q) { var px = q.o === "h" ? q.at : q.c, pz = q.o === "h" ? q.c : q.at; return Math.hypot(px - x, pz - z) < 1.8; }); }
put("redrunner", 0, (r.z0 + r.z1) / 2, 0);
for (var i = 0; i < n; i++) {
var z = r.z0 + len * (i + 0.5) / n;
if (!nearDoor(r.x0, z))
put(esArt(ES_ART++), r.x0 + 0.16, z, Math.PI / 2);
if (!nearDoor(r.x1, z))
put(esArt(ES_ART++), r.x1 - 0.16, z, -Math.PI / 2);
if (i % 2 === 0) {
if (!nearDoor(r.x0, z + 2))
put("esbust", r.x0 + 0.45, z + 2, 0);
}
else if (!nearDoor(r.x1, z + 2))
put(esWd("kf_benchcushion") || esWd("kf_bench"), r.x1 - 0.45, z + 2, -Math.PI / 2);
put(esMt("qf_lightceiling1") ? esX().on(esMt("qf_lightceiling1"), Math.round((ctx.H - 0.04 - 3.15) * 100) / 100) : "lamp", 0, z, 0);
}
A.spots.push({ x: 0, z: (r.z0 + r.z1) / 2, room: "gallery", level: ctx.L });
},
function (P, A, ctx) {
var r = P.r, put = function (k, x, z, rot) { if (k && FURN[k])
A.put(k, x, z, rot || 0); };
var len = r.z1 - r.z0, n = Math.max(1, Math.floor(len / 4)), ways = ctx.ways || [];
function nearDoor(x, z) { return ways.some(function (q) { var px = q.o === "h" ? q.at : q.c, pz = q.o === "h" ? q.c : q.at; return Math.hypot(px - x, pz - z) < 1.8; }); }
put("redrunner", 0, (r.z0 + r.z1) / 2, 0);
for (var i = 0; i < n; i++) {
var z = r.z0 + len * (i + 0.5) / n;
if (!nearDoor(r.x0, z))
put("armourstand", r.x0 + 0.6, z, Math.PI / 2);
if (!nearDoor(r.x1, z))
put("hallbanner", r.x1 - 0.1, z, -Math.PI / 2);
put("wallsconce", r.x0 + 0.05, z + 2, Math.PI / 2);
}
A.spots.push({ x: 0, z: (r.z0 + r.z1) / 2, room: "gallery", level: ctx.L });
},
function (P, A, ctx) {
var r = P.r, put = function (k, x, z, rot) { if (k && FURN[k])
A.put(k, x, z, rot || 0); };
var ways = ctx.ways || [], len = r.x1 - r.x0, n = Math.max(2, Math.floor(len / 5)), zc = (r.z0 + r.z1) / 2;
function nearDoor(x, z) { return ways.some(function (q) { var px = q.o === "h" ? q.at : q.c, pz = q.o === "h" ? q.c : q.at; return Math.hypot(px - x, pz - z) < 1.8; }); }
for (var i = 0; i < n; i++) {
var x = r.x0 + len * (i + 0.5) / n;
if (Math.abs(x) < r.z1 - r.z0)
continue;
if (!nearDoor(x, r.z0))
put(esArt(ES_ART++), x, r.z0 + 0.16, 0);
if (i % 2 && !nearDoor(x, r.z1))
put("esconsole", x, r.z1 - 0.35, Math.PI);
var X = esX(), lk = esMt("qf_lightceiling1");
if (X && lk)
put(X.on(lk, Math.round((ctx.H - 0.04 - 3.15) * 100) / 100), x, zc, 0);
}
put("espalm", r.x0 + 0.7, zc, 0);
put("espalm", r.x1 - 0.7, zc, 0);
A.spots.push({ x: r.x0 + 3, z: zc, room: "corridor", level: ctx.L });
},
function (spec) {
ES.last = null;
var I = esMakeInterior0.apply(this, arguments), E = ES.last;
if (!I || !E)
return I;
ES.last = null;
I.ce = { rooms: E.rooms, decor: E.decor, T: E.T };
I.floorNames = E.T.floors.slice(0, I.levels || E.T.levels);
try {
esRestyle(I, spec, E.decor);
}
catch (e) {
if (window.console)
console.warn("[estates] restyle", e);
}
E.decor.forEach(function (g) { try {
if (typeof ppBake === "function")
ppBake(g);
}
catch (e) { } });
ES.room = null;
ES.said = "";
return I;
},
function (I, spec, decor) {
if (typeof rsyLookFor !== "function" || typeof rsyKeyOf !== "function")
return 0;
var L = rsyLookFor(I.wpKey || rsyKeyOf(spec));
if (!L)
return 0;
var wantWall = !!(L.inWall || L.inFin), wantFloor = !!(L.floorCol || L.floor);
if (!wantWall && !wantFloor)
return 0;
var IX = typeof RSY_INTEX !== "undefined" ? RSY_INTEX : {}, FC = typeof RSY_FLCOL !== "undefined" ? RSY_FLCOL : {}, FT = typeof RSY_FLTEX !== "undefined" ? RSY_FLTEX : {}, MC = typeof MATCOLOR !== "undefined" ? MATCOLOR : {};
var safe = function (c) { return typeof rsySafe === "function" ? rsySafe(c, 0.78) : c; };
var wCol = L.inWall ? safe(L.inWall) : (L.inFin && L.inFin !== "paint" && MC[IX[L.inFin]]) ? MC[IX[L.inFin]] : null;
var wTex = L.inFin && IX[L.inFin] && typeof texOf === "function" ? texOf(IX[L.inFin]) : null;
var fCol = L.floorCol ? safe(L.floorCol) : (L.floor && FC[L.floor]) ? FC[L.floor] : null;
var fTex = L.floor && FT[L.floor] && typeof texOf === "function" ? texOf(FT[L.floor]) : null;
var made = new Map(), n = 0;
decor.forEach(function (g) {
g.traverse(function (o) {
var w = o.userData && o.userData.esPart;
if (!o.isMesh || !w)
return;
if (w === "w" && (!wantWall || (wCol === null && !wTex && L.inFin !== "paint")))
return;
if (w === "f" && (!wantFloor || (fCol === null && !fTex && L.floor !== "carpet")))
return;
var key = o.material.uuid + w, m = made.get(key);
if (!m) {
m = o.material.clone();
var col = w === "w" ? wCol : fCol, t = w === "w" ? wTex : fTex;
if (col !== null)
m.color.setHex(col);
if (t) {
m.map = t;
m.needsUpdate = true;
}
else if ((w === "w" && L.inFin === "paint") || (w === "f" && L.floor === "carpet")) {
m.map = null;
m.needsUpdate = true;
}
made.set(key, m);
}
o.material = m;
n++;
});
});
return n;
}
];
});
