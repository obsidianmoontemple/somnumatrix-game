/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(347, function () {
"use strict";
return [
function (key) {
var k = String(key || "").toLowerCase();
if (/ice|frozen|pluto/.test(k))
return { rock: 0xA8C0D0, ceil: 0x8AA2B4, floor: 0x9AAEBC, ore: 0xDAF2FF, glint: 0x9AD8FF, cry: 0xBFE8FF };
if (/salt|pale|keystone|anorth/.test(k))
return { rock: 0xC8BCA8, ceil: 0xA89C88, floor: 0xA89C8A, ore: 0xF2ECDC, glint: 0xFFF2D0, cry: 0xF4F0FF };
if (/obsidian|basalt|graphite|fire|kiln/.test(k))
return { rock: 0x3C3634, ceil: 0x2C2826, floor: 0x3A3430, ore: 0x8A3A2A, glint: 0xFF8A40, cry: 0xFF7A3A };
if (/garnet|underworld|vent|depths/.test(k))
return { rock: 0x5A3A34, ceil: 0x44302A, floor: 0x4A3630, ore: 0xB0283A, glint: 0xFF6A7A, cry: 0xE0384E };
if (/crystal|shard|moonstone|faerie|void|elsewhere|stars/.test(k))
return { rock: 0x4A4458, ceil: 0x3A3448, floor: 0x423C4C, ore: 0xB89AF0, glint: 0xD8B8FF, cry: 0xC8A8FF };
if (/silver|mirror|metal|meteoric|nickel|space|orbital|scrap|wasteland/.test(k))
return { rock: 0x5A5A60, ceil: 0x46464C, floor: 0x4C4A4C, ore: 0xC8CCD8, glint: 0xE8F0FF, cry: 0xD8E4FF };
if (/deepdelve|stonehallow/.test(k))
return { rock: 0x6A5A4A, ceil: 0x4E4236, floor: 0x54483C, ore: 0xCCD4E0, glint: 0xB8D8FF, cry: 0xA8D0FF };
return { rock: 0x5E564C, ceil: 0x463F38, floor: 0x4A443C, ore: 0x8A6A3A, glint: 0xFFD890, cry: 0xC8B0FF };
},
function (R) {
var g = ((R && R.deep && R.deep.gather) || []).filter(function (x) { return /ore|coal|crystal|ice/.test(x.look || ""); }).map(function (x) { return x.k; });
if (!g.length)
g = ((R && R.deep && R.deep.gather) || []).map(function (x) { return x.k; });
if (g.indexOf("cr_ore") < 0)
g.push("cr_ore");
return g.slice(0, 4);
},
function (R, b) {
var key = R.name + ": " + b.n;
if (MG_SITES[key])
return MG_SITES[key];
var h = 0;
for (var i = 0; i < key.length; i++)
h = (h * 31 + key.charCodeAt(i)) >>> 0;
return (MG_SITES[key] = { key: key, name: b.n.replace(/^The /, "the "), short: b.n.replace(/^The /, "the "), kinds: mgRealmKinds(R), crystal: null, mount: "gr", realm: R.id, seed: h % 97 });
},
function (site, stage) {
var rects = [], seams = [], pillars = [], parts = [], side = (site.seed % 2) ? 1 : -1, cur = -12;
function R(x0, x1, z0, z1, h, part, o) { var r = Object.assign({ x0: x0, x1: x1, z0: z0, z1: z1, h: h, part: part }, o || {}); rects.push(r); return r; }
R(-2, 2, cur, 0, 4, -1, { name: "the mouth of the new workings" });
for (var i = 0; i < Math.min(stage, MG_SEQ.length); i++) {
var k = MG_SEQ[i], P = { i: i, k: k, z1: cur };
if (k === "drift") {
R(-2, 2, cur - 20, cur, 4, i);
cur -= 20;
}
else if (k === "seam") {
R(-2, 2, cur - 8, cur, 4, i);
var sx0 = side > 0 ? 0 : -10, sx1 = side > 0 ? 10 : 0;
R(sx0, sx1, cur - 7, cur - 1, 4, i, { side: side });
seams.push({ i: i, x: side * 8.4, z: cur - 4, face: side * 10, ax: "x", kind: mgSeamKind(site.kinds, site.crystal, i) });
P.side = side;
side = -side;
cur -= 8;
}
else if (k === "gallery") {
R(-9, 9, cur - 18, cur, 7, i);
[[-4.5, -5], [4.5, -5], [-4.5, -13], [4.5, -13]].forEach(function (q) { pillars.push({ x: q[0], z: cur + q[1], r: 1.3, h: 7 }); });
cur -= 18;
}
else if (k === "vug") {
R(-2, 2, cur - 9, cur, 4, i);
var vx0 = side > 0 ? 0 : -10, vx1 = side > 0 ? 10 : 0;
R(vx0, vx1, cur - 9, cur, 5, i, { side: side, vug: 1 });
seams.push({ i: i, x: side * 7.5, z: cur - 4.5, face: side * 10, ax: "x", kind: mgSeamKind(site.kinds, site.crystal, i), vug: 1 });
P.side = side;
side = -side;
cur -= 9;
}
else if (k === "stope") {
R(-2, 2, cur - 12, cur, 4, i);
var tx0 = side > 0 ? 0 : -14, tx1 = side > 0 ? 14 : 0;
R(tx0, tx1, cur - 12, cur, 10, i, { side: side, stope: 1 });
seams.push({ i: i, x: side * 12.4, z: cur - 6, face: side * 14, ax: "x", kind: mgSeamKind(site.kinds, site.crystal, i) });
P.side = side;
side = -side;
cur -= 12;
}
else if (k === "cavern") {
R(-15, 15, cur - 30, cur, 12, i, { cavern: 1 });
pillars.push({ x: 8, z: cur - 20, r: 4.4, h: 12, pool: 1 });
seams.push({ i: i, x: -12.6, z: cur - 15, face: -15, ax: "x", kind: mgSeamKind(site.kinds, site.crystal, i) });
cur -= 30;
}
P.z0 = cur;
parts.push(P);
}
R(-2, 2, cur - 6, cur, 4, -2, { face: 1 });
var face = cur - 6;
cur -= 6;
return { rects: rects, seams: seams, pillars: pillars, parts: parts, face: face, stage: Math.min(stage, MG_SEQ.length),
x0: -16, x1: 16, z0: face - 1, z1: 1 };
},
function (L, x, z) {
var ok = false;
for (var i = 0; i < L.rects.length; i++) {
var r = L.rects[i];
if (x > r.x0 + 0.45 && x < r.x1 - 0.45 && z > r.z0 + 0.45 && z < r.z1 - 0.45) {
ok = true;
break;
}
}
if (!ok)
return false;
for (var j = 0; j < L.pillars.length; j++) {
var p = L.pillars[j], dx = x - p.x, dz = z - p.z;
if (dx * dx + dz * dz < (p.r + 0.4) * (p.r + 0.4))
return false;
}
return true;
},
function (L, s) {
var X0 = Math.floor(L.x0), X1 = Math.ceil(L.x1), Z0 = Math.floor(L.z0), Z1 = Math.ceil(L.z1), W = X1 - X0, D = Z1 - Z0;
var H = new Int16Array(W * D);
L.rects.forEach(function (r) { for (var x = Math.max(X0, Math.floor(r.x0)); x < Math.min(X1, Math.ceil(r.x1)); x++)
for (var z = Math.max(Z0, Math.floor(r.z0)); z < Math.min(Z1, Math.ceil(r.z1)); z++) {
var k = (x - X0) * D + (z - Z0);
if (r.h > H[k])
H[k] = r.h;
} });
function h(x, z) { if (x < X0 || x >= X1 || z < Z0 || z >= Z1)
return 0; return H[(x - X0) * D + (z - Z0)]; }
var wall = { p: [], u: [], i: [], m: {} }, roof = { p: [], u: [], i: [], m: {} }, floor = { p: [], u: [], i: [], m: {} };
function vtx(B, x, y, z, flat, uv) {
var key = x + "," + y + "," + z;
if (B.m[key] !== undefined)
return B.m[key];
var q = flat ? [x, y, z] : mgPush(x, y, z, s);
B.p.push(q[0], q[1], q[2]);
B.u.push(uv[0], uv[1]);
return (B.m[key] = B.p.length / 3 - 1);
}
function quad(B, a, b, c, d, nx, ny, nz) {
var P = B.p, ax = P[a * 3], ay = P[a * 3 + 1], az = P[a * 3 + 2], ux = P[b * 3] - ax, uy = P[b * 3 + 1] - ay, uz = P[b * 3 + 2] - az, vx = P[c * 3] - ax, vy = P[c * 3 + 1] - ay, vz = P[c * 3 + 2] - az;
var cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
if (cx * nx + cy * ny + cz * nz >= 0)
B.i.push(a, b, c, a, c, d);
else
B.i.push(a, c, b, a, d, c);
}
for (var x = X0; x < X1; x++)
for (var z = Z0; z < Z1; z++) {
var hh = h(x, z);
if (!hh)
continue;
var f = [vtx(floor, x, 0, z, 1, [x / 2, z / 2]), vtx(floor, x + 1, 0, z, 1, [(x + 1) / 2, z / 2]), vtx(floor, x + 1, 0, z + 1, 1, [(x + 1) / 2, (z + 1) / 2]), vtx(floor, x, 0, z + 1, 1, [x / 2, (z + 1) / 2])];
quad(floor, f[0], f[1], f[2], f[3], 0, 1, 0);
var c = [vtx(roof, x, hh, z, 0, [x / 2, z / 2]), vtx(roof, x + 1, hh, z, 0, [(x + 1) / 2, z / 2]), vtx(roof, x + 1, hh, z + 1, 0, [(x + 1) / 2, (z + 1) / 2]), vtx(roof, x, hh, z + 1, 0, [x / 2, (z + 1) / 2])];
quad(roof, c[0], c[1], c[2], c[3], 0, -1, 0);
[[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (n) {
var nh = h(x + n[0], z + n[1]);
if (nh >= hh)
return;
var ex = n[0] > 0 ? x + 1 : x, ez = n[1] > 0 ? z + 1 : z, along = n[0] ? "z" : "x";
var p0 = along === "z" ? [ex, ez] : [ex, ez], p1 = along === "z" ? [ex, ez + 1] : [ex + 1, ez];
for (var y = nh; y < hh; y++) {
var a = vtx(wall, p0[0], y, p0[1], 0, [(p0[0] + p0[1]) / 2, y / 2]), b = vtx(wall, p1[0], y, p1[1], 0, [(p1[0] + p1[1]) / 2, y / 2]);
var cc = vtx(wall, p1[0], y + 1, p1[1], 0, [(p1[0] + p1[1]) / 2, (y + 1) / 2]), dd = vtx(wall, p0[0], y + 1, p0[1], 0, [(p0[0] + p0[1]) / 2, (y + 1) / 2]);
quad(wall, a, b, cc, dd, -n[0], 0, -n[1]);
}
});
}
function geo(B) { var g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(B.p, 3)); g.setAttribute("uv", new THREE.Float32BufferAttribute(B.u, 2)); g.setIndex(B.i); g.computeVertexNormals(); return g; }
return { wall: geo(wall), roof: geo(roof), floor: geo(floor) };
},
function (col, kind, o) {
o = o || {};
var k = col + "|" + (kind || "") + "|" + (o.e || 0) + "|" + (o.basic ? 1 : 0) + "|" + (o.ds ? 1 : 0);
if (MG_MATC[k])
return MG_MATC[k];
var m;
if (o.basic)
m = new THREE.MeshBasicMaterial({ color: col });
else {
m = new THREE.MeshLambertMaterial({ color: col });
var t = kind && typeof texOf === "function" ? texOf(kind) : null;
if (t)
m.map = t;
if (o.e) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.6;
}
}
if (o.ds)
m.side = THREE.DoubleSide;
m.userData.noPhoto = 1;
return (MG_MATC[k] = m);
},
function (G, r, h, mat, x, z, seed, y) {
var g = new THREE.CylinderGeometry(r * 0.85, r, h, 9, Math.max(2, Math.round(h / 1.2)));
var P = g.attributes.position;
for (var i = 0; i < P.count; i++) {
var px = P.getX(i), py = P.getY(i), pz = P.getZ(i), n = mgHash(Math.round(px * 3), Math.round(py * 2), Math.round(pz * 3), seed) - 0.5;
var sc = 1 + n * 0.35;
P.setX(i, px * sc);
P.setZ(i, pz * sc);
}
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.position.set(x, (y || 0) + h / 2, z);
G.add(m);
return m;
},
function (site, stage, o) {
o = o || {};
var L = mgLayout(site, stage), G = new THREE.Group(), lite = mgLite(), C = mgRock(site.key), s = site.seed || 7;
G.name = "mg-" + mgSlug(site.key);
var rock = mgMat(C.rock, "stone"), roof = mgMat(C.ceil, "stone"), floor = mgMat(C.floor, "earth");
var R = mgRockGeo(L, s);
[[R.wall, rock], [R.roof, roof], [R.floor, floor]].forEach(function (q) { var m = new THREE.Mesh(q[0], q[1]); m.userData.keep = 1; G.add(m); });
var wood = mgMat(0x6A4A2E, "wood"), iron = mgMat(0x3A3A40, "metal"), ore = mgMat(C.ore, "stone", { e: C.glint, ei: 0.18 }), spots = [], people = [];
var step = lite ? 8 : 4, lampEvery = lite ? 16 : 8;
L.rects.forEach(function (r) {
if (r.side || r.x1 - r.x0 > 4.5)
return;
for (var z = r.z1 - 2; z > r.z0 + 0.5; z -= step) {
mgBoxM(G, 0.26, r.h - 0.6, 0.26, wood, -1.6, (r.h - 0.6) / 2, z);
mgBoxM(G, 0.26, r.h - 0.6, 0.26, wood, 1.6, (r.h - 0.6) / 2, z);
mgBoxM(G, 3.5, 0.26, 0.3, wood, 0, r.h - 0.6, z);
if (Math.round(z) % lampEvery === 0 || Math.abs(z - (r.z1 - 2)) < 0.1)
mgLamp(G, 0.9, r.h - 1.05, z);
}
mgBoxM(G, 0.08, 0.08, r.z1 - r.z0, iron, -0.42, 0.05, (r.z0 + r.z1) / 2);
mgBoxM(G, 0.08, 0.08, r.z1 - r.z0, iron, 0.42, 0.05, (r.z0 + r.z1) / 2);
if (!lite)
for (var sl = r.z1 - 0.6; sl > r.z0; sl -= 1.2)
mgBoxM(G, 1.3, 0.06, 0.22, wood, 0, 0.03, sl);
});
var sg = typeof wSign === "function" ? wSign(["The New Workings", site.name.charAt(0).toUpperCase() + site.name.slice(1) + " · dug by its miners"], 2.6, 0.8, "#2A2018", "#E8D8A8") : null;
if (sg) {
sg.position.set(0, 3.1, -0.3);
sg.rotation.y = Math.PI;
G.add(sg);
}
mgLamp(G, -1.2, 2.9, -1.2);
if (!lite) {
var pl = new THREE.PointLight(0xFFC890, 0.9, 16, 1.6);
pl.position.set(0, 2.8, -4);
G.add(pl);
}
spots.push({ x: 0, z: -1.4, r: 2.2, kind: "back", label: "<b>The way back</b> · <b>press E</b> to go back to " + esc(o.backTo || "the mine") });
L.parts.forEach(function (P) {
var k = P.k, zc = (P.z0 + P.z1) / 2;
if (k === "gallery") {
L.pillars.filter(function (p) { return p.z < P.z1 && p.z > P.z0; }).forEach(function (p, j) { mgLump(G, p.r, p.h, rock, p.x, p.z, s + j); });
mgFurn(G, "minecart", -6.5, P.z1 - 3, Math.PI / 2);
mgFurn(G, "oreheap", 6.8, P.z0 + 3, 0.4);
if (!lite)
mgFurn(G, "oreheap", -7, P.z0 + 2.5, 1.6);
mgLamp(G, 0, 5.6, P.z1 - 9);
if (!lite) {
var gl = new THREE.PointLight(0xFFC890, 0.8, 22, 1.6);
gl.position.set(0, 5, P.z1 - 9);
G.add(gl);
}
}
if (k === "stope") {
var sx = P.side * 8;
for (var dy = 3; dy < 9; dy += 3) {
mgBoxM(G, 10, 0.2, 2.6, wood, sx, dy, zc - 3.5);
[-4.6, 4.6].forEach(function (q) { mgBoxM(G, 0.22, dy, 0.22, wood, sx + q, dy / 2, zc - 4.6); mgBoxM(G, 0.22, dy, 0.22, wood, sx + q, dy / 2, zc - 2.4); });
}
mgBoxM(G, 0.08, 8.6, 0.08, wood, sx - P.side * 3, 4.3, zc - 1.9);
mgBoxM(G, 0.08, 8.6, 0.08, wood, sx - P.side * 3 + 0.5, 4.3, zc - 1.9);
for (var ry = 0.4; ry < 8.6; ry += 0.4)
mgBoxM(G, 0.5, 0.05, 0.05, wood, sx - P.side * 3 + 0.25, ry, zc - 1.9);
mgLamp(G, sx, 7.6, zc);
if (!lite) {
var sl2 = new THREE.PointLight(0xFFC890, 0.7, 18, 1.6);
sl2.position.set(sx, 6, zc);
G.add(sl2);
}
}
if (k === "cavern") {
var pool = L.pillars.filter(function (p) { return p.pool; })[0];
if (pool) {
var wtr = new THREE.Mesh(new THREE.CircleGeometry(pool.r + 0.3, 32), mgMat(0x0A1A24, null, { e: 0x081820, ei: 0.4 }));
wtr.rotation.x = -Math.PI / 2;
wtr.position.set(pool.x, 0.04, pool.z);
G.add(wtr);
mgLump(G, pool.r + 0.7, 0.35, rock, pool.x, pool.z, s + 40, -0.2);
wtr.position.y = 0.16;
for (var bo = 0; bo < (lite ? 5 : 10); bo++) {
var ba = bo / (lite ? 5 : 10) * Math.PI * 2, bd = new THREE.Mesh(new THREE.DodecahedronGeometry(0.35 + mgHash(bo, 1, 1, s) * 0.45, 0), rock);
bd.position.set(pool.x + Math.cos(ba) * (pool.r + 0.5), 0.2, pool.z + Math.sin(ba) * (pool.r + 0.5));
bd.rotation.set(bo, bo * 2, 0);
G.add(bd);
}
}
var n = lite ? 10 : 26;
for (var t = 0; t < n; t++) {
var tx = -13 + mgHash(t, 1, 2, s) * 26, tz = P.z0 + 2 + mgHash(t, 3, 4, s) * 26, tl = 1 + mgHash(t, 5, 6, s) * 3.5;
var st = new THREE.Mesh(new THREE.ConeGeometry(0.35 + tl * 0.08, tl, 7), roof);
st.rotation.x = Math.PI;
st.position.set(tx, 12.2 - tl / 2, tz);
G.add(st);
}
if (!lite)
for (var gw = 0; gw < 14; gw++)
mgGlow(G, 0x8AE8D8, 1.4, 0.28, -12 + mgHash(gw, 7, 8, s) * 24, 11.2, P.z0 + 3 + mgHash(gw, 9, 1, s) * 24);
mgLamp(G, 0, 9, zc);
}
});
L.seams.forEach(function (S) {
var sg = Math.sign(S.face), M = S.vug ? mgMat(C.cry || C.glint, null, { e: C.cry || C.glint, ei: 0.35 }) : ore;
function wx(y, z) {
var y0 = Math.floor(y), z0 = Math.floor(z), fy = y - y0, fz = z - z0;
function d(yy, zz) { return yy <= 0 ? 0 : (mgHash(S.face, yy, zz, s) - 0.5) * 0.72; }
return S.face + (d(y0, z0) * (1 - fy) + d(y0 + 1, z0) * fy) * (1 - fz) + (d(y0, z0 + 1) * (1 - fy) + d(y0 + 1, z0 + 1) * fy) * fz;
}
var vy0 = 1.0 + mgHash(S.i, 2, 2, s) * 0.5, vy1 = 1.9 + mgHash(S.i, 3, 3, s) * 0.7;
if (S.i % 2) {
var vt = vy0;
vy0 = vy1;
vy1 = vt;
}
var band = mgMat(new THREE.Color(C.ore).multiplyScalar(0.55).getHex(), "stone", { e: C.glint, ei: 0.08 }), nb = lite ? 8 : 16;
for (var sb = 0; sb < nb; sb++) {
var bz2 = S.z - 2.6 + (sb + 0.5) * (5.2 / nb), by2 = vy0 + (vy1 - vy0) * (sb + 0.5) / nb;
var seg = mgBoxM(G, 0.12, 0.42 + mgHash(sb, S.i, 5, s) * 0.2, 5.2 / nb + 0.08, band, wx(by2, bz2) - sg * 0.01, by2, bz2);
seg.rotation.x = Math.atan2(vy1 - vy0, 5.2) * (-1);
}
for (var b = 0; b < (lite ? 7 : 14); b++) {
var f = (b + 0.5) / (lite ? 7 : 14), bz = S.z - 2.4 + f * 4.8, by = vy0 + (vy1 - vy0) * f + (mgHash(b, S.i, 1, s) - 0.5) * 0.4, br = 0.16 + mgHash(b, b, S.i, s) * 0.2;
var lump = new THREE.Mesh(new THREE.DodecahedronGeometry(br, 0), M);
lump.position.set(wx(by, bz) - sg * 0.04, by, bz);
lump.scale.set(0.6, 0.8, 1.2);
lump.rotation.set(b, b * 2, b * 3);
G.add(lump);
}
if (S.vug) {
for (var cq = 0; cq < (lite ? 10 : 26); cq++) {
var cl = 0.5 + mgHash(cq, 2, S.i, s) * 1.4, cr = new THREE.Mesh(new THREE.ConeGeometry(0.1 + cl * 0.07, cl, 6), M), w = cq % 3;
var cz = S.z - 3.6 + mgHash(cq, 1, 9, s) * 7.2, tilt = (mgHash(cq, 5, 3, s) - 0.5) * 0.8;
if (w === 0) {
var cy = 0.5 + mgHash(cq, 8, 2, s) * 3.4;
cr.position.set(wx(cy, cz) - sg * (cl / 2 - 0.2), cy, cz);
cr.rotation.set(tilt, 0, sg * Math.PI / 2);
}
else if (w === 1) {
cr.position.set(S.face - sg * (0.6 + mgHash(cq, 6, 1, s) * 5.5), cl / 2 - 0.1, cz);
cr.rotation.set(tilt, 0, tilt * 0.6);
}
else {
cr.position.set(S.face - sg * (0.6 + mgHash(cq, 6, 1, s) * 5.5), 5.3 - cl / 2, cz);
cr.rotation.set(Math.PI + tilt, 0, tilt * 0.6);
}
G.add(cr);
}
}
mgFurn(G, "oreheap", S.x - Math.sign(S.face) * 1.2, S.z + 2.2, S.i);
mgLamp(G, S.x - Math.sign(S.face) * 0.6, 2.9, S.z - 2.6);
S.glow = mgGlow(G, C.glint, 1.6, 0.35, S.x + Math.sign(S.face) * 0.9, 1.4, S.z);
var nm = MG_PART[MG_SEQ[S.i]].t;
spots.push({ x: S.x, z: S.z, r: 2.6, kind: "seam", seam: S, label: "<b>" + esc(nm) + "</b> · <b>press E</b> to " + (S.vug ? "prise out a crystal" : "work the seam") });
});
var fz = L.face;
mgBoxM(G, 4.2, 4, 0.6, mgMat(C.rock, "stone"), 0, 2, fz - 0.05);
for (var dh = 0; dh < 6; dh++)
mgCylM(G, 0.05, 0.05, 0.12, mgMat(0x1A1614), -1.2 + (dh % 3) * 1.2, 1.2 + Math.floor(dh / 3) * 1.4, fz + 0.3, 6).rotation.x = Math.PI / 2;
var drill = new THREE.Group();
drill.position.set(1.1, 0, fz + 1.4);
G.add(drill);
mgBoxM(drill, 0.1, 2, 0.1, iron, 0, 1, 0);
mgBoxM(drill, 0.1, 2, 0.1, iron, 0.6, 1, 0);
mgBoxM(drill, 0.9, 0.1, 0.4, iron, 0.3, 1.9, 0);
var bit = mgCylM(drill, 0.05, 0.05, 1.5, iron, 0.3, 1.4, -0.6, 6);
bit.rotation.x = Math.PI / 2;
mgFurn(G, "minecart", -0.9, fz + 3.6, 0);
mgLamp(G, -1.1, 3.1, fz + 1);
var nx = stage < MG_SEQ.length ? MG_PART[MG_SEQ[stage]] : null;
var fs = typeof wSign === "function" ? wSign(["The face", nx ? "Breaking through to " + nx.n : "Dug as far as it goes, for now"], 2.2, 0.7, "#2A2018", "#E8D8A8") : null;
if (fs) {
fs.position.set(-0.6, 3.25, fz + 0.3);
G.add(fs);
}
if (typeof wPerson === "function") {
try {
var boss = wPerson("mgboss_" + mgSlug(site.key), { sex: (s % 3) ? "m" : "f", title: "Shift boss", place: "a mine" });
boss.position.set(-1.0, 0, fz + 2.4);
boss.rotation.y = Math.PI * 0.85;
G.add(boss);
people.push(boss);
if (!lite) {
var dig = wPerson("mgdig_" + mgSlug(site.key), { sex: (s % 2) ? "f" : "m", title: "Miner", place: "a mine" });
dig.position.set(0.6, 0, fz + 0.9);
dig.rotation.y = Math.PI;
G.add(dig);
people.push(dig);
}
}
catch (e) { }
}
spots.push({ x: -1, z: fz + 2.6, r: 2.6, kind: "boss", label: "<b>The shift boss</b> · <b>press E</b> to ask how far they have dug" });
spots.push({ x: 0, z: fz + 1.2, r: 2, kind: "face", label: "<b>The face</b> · <b>press E</b> to look" });
return { g: G, L: L, spots: spots, people: people, stage: L.stage };
},
function (G, x, y, z, rot, name) {
var g = new THREE.Group(), wood = mgMat(0x6A4A2E, "wood");
mgBoxM(g, 0.34, 3.4, 0.34, wood, -1.45, 1.7, 0);
mgBoxM(g, 0.34, 3.4, 0.34, wood, 1.45, 1.7, 0);
mgBoxM(g, 3.6, 0.36, 0.4, wood, 0, 3.45, 0);
var dark = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 3.25), mgMat(0x050403, null, { basic: 1 }));
dark.position.set(0, 1.62, -0.12);
g.add(dark);
mgLamp(g, 1.2, 3.0, 0.4);
if (typeof wSign === "function") {
var s = wSign(["The New Workings", name], 2.6, 0.62, "#2A2018", "#E8D8A8");
s.position.set(0, 4.05, 0.22);
g.add(s);
}
g.position.set(x, y, z);
g.rotation.y = rot;
G.add(g);
return g;
},
function (A, key) {
var U = MG_UD[key], site = MG_SITES[key], D = mgUdDoor(key);
var M = mgBuild(site, mgStageOf(key), { backTo: D ? D.back : "the mine" });
M.g.position.set(U.ox, 0, U.oz);
A.g.add(M.g);
A.rects.length = 0;
A.solids.length = 0;
A.doorways = [];
M.L.rects.forEach(function (r) { A.rects.push({ x0: U.ox + r.x0, x1: U.ox + r.x1, z0: U.oz + r.z0, z1: U.oz + r.z1, y: 0, m: 0.45 }); });
M.L.pillars.forEach(function (p) { A.solids.push({ x: U.ox + p.x, z: U.oz + p.z, r: p.r }); });
(A.talk || []).forEach(function (T) { var i = UD.talkers.indexOf(T); if (i >= 0)
UD.talkers.splice(i, 1); });
A.talk = [];
M.spots.forEach(function (S) {
var T = { x: U.ox + S.x, z: U.oz + S.z, r: S.r, name: mgSpotName(S), verb: mgSpotVerb(S), fn: function () { mgSpot(S, { kind: "ud", key: key }); } };
A.talk.push(T);
if (A.built && UD.talkers.indexOf(T) < 0)
UD.talkers.push(T);
});
U.built = M;
U.stage = M.stage;
U.A = A;
},
function (I, site) {
var R = GR.R, S = mgRealmSite(R, site.b), x = I.X0 + 4.2, z = I.z1 - 7, g = new THREE.Group(), iron = mgMat(0x3A3A3E, "metal");
for (var i = 0; i < 4; i++)
mgBoxM(g, 0.09, 2.7, 0.09, iron, (i % 2 ? 0.95 : -0.95), 1.35, (i < 2 ? 0.95 : -0.95));
for (var b = 0; b < 7; b++)
mgBoxM(g, 0.035, 2.5, 0.035, iron, -0.9 + b * 0.3, 1.35, -0.95);
mgBoxM(g, 2, 0.1, 2, mgMat(0x5A4A3A, "wood"), 0, 0.05, 0);
mgBoxM(g, 2, 0.1, 2, iron, 0, 2.7, 0);
mgCylM(g, 0.05, 0.05, 4, iron, 0, 4.7, 0, 5);
var dk = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.8), mgMat(0x050404, null, { basic: 1 }));
dk.rotation.x = -Math.PI / 2;
dk.position.y = 0.11;
g.add(dk);
if (typeof wSign === "function") {
var sg = wSign(["The cage", "Down to the new workings"], 1.4, 0.5, "#2A2018", "#E8D8A8");
sg.position.set(0, 3.05, 0.98);
g.add(sg);
}
g.position.set(x, 0, z);
I.g.add(g);
I.solids.push({ x: x, z: z, hw: 1.0, hd: 1.0 });
I.spots.push({ x: x, z: z + 2.2, r: 2.2, label: "<b>The cage</b> · <b>press E</b> to go down to the new workings (dug by " + esc(S.name) + "'s miners)", fn: function () { mgGrGo(site); } });
site.mgCage = { x: x, z: z };
},
function (site) {
var m = mgGrMount(site), W = WORLDS[m.realm], I = site.I;
if (!W || !W.g || !I)
return null;
var st = mgStageOf(m.site.key);
if (m.M && m.stage === st)
return m;
if (m.M && m.M.g.parent)
m.M.g.parent.remove(m.M.g);
I.spots = I.spots.filter(function (s) { return !s.mg; });
var M = mgBuild(m.site, st, { backTo: "the Pithead Hall" });
M.g.position.set(m.ox, 0, m.oz);
M.g.userData.grIn = true;
M.g.visible = false;
W.g.add(M.g);
if (typeof ppBake === "function")
try {
ppBake(M.g, 40);
}
catch (e) { }
M.spots.forEach(function (S) { I.spots.push({ mg: 1, x: m.ox + S.x, z: m.oz + S.z, r: S.r, label: S.label, fn: function () { mgSpot(S, { kind: "gr", site: site }); } }); });
m.M = M;
m.stage = st;
return m;
},
function (site) {
var m = mgGrBuild(site), W = m && WORLDS[m.realm];
if (!m || !W)
return;
if (site.I)
site.I.g.visible = false;
m.M.g.visible = true;
camera.position.set(W.base + m.ox, 1.72, m.oz - 2.6);
yaw = 0;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
MG.cur = { kind: "gr", site: site, mount: m, key: m.site.key };
if (typeof playTone === "function")
try {
playTone(90, 1.0);
}
catch (e) { }
mgFirstSay(m.site.key);
},
function (site) {
var m = site.mg, W = m && WORLDS[m.realm];
if (!m || !W)
return;
if (m.M)
m.M.g.visible = false;
if (site.I)
site.I.g.visible = true;
var c = site.mgCage || { x: site.I.X0, z: site.I.z1 - 4 };
camera.position.set(W.base + c.x, 1.72, c.z + 2.6);
yaw = Math.PI;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
MG.cur = null;
if (typeof playTone === "function")
try {
playTone(120, 0.6);
}
catch (e) { }
if (typeof setStatus === "function")
setStatus("<b>Back up in the Pithead Hall.</b>");
},
function (key, say) {
var C = MG.cur;
if (MG_UD[key] && MG_UD[key].A && MG_UD[key].A.built)
mgUdRebuild(key);
try {
(typeof GR !== "undefined" && GR.sites || []).forEach(function (s) { if (s.mg && s.mg.site.key === key && s.mg.M) {
var vis = s.mg.M.g.visible;
s.mg.stage = -1;
mgGrBuild(s);
s.mg.M.g.visible = vis;
} });
}
catch (e) { }
if (C && C.kind === "gr" && C.mount)
C.mount = C.site.mg;
if (say) {
var st = mgStageOf(key), P = st ? MG_PART[MG_SEQ[st - 1]] : null, S = MG_SITES[key];
if (P)
mgSay("⛏️ <b>The miners have broken through!</b> " + esc((S ? S.name : key).replace(/^./, function (c) { return c.toUpperCase(); })) + " has " + esc(P.n) + " now: " + esc(P.d) + ". Go down and see it.");
}
},
function (job) {
if (MG.missing)
return;
mgRpc("mine_dig", { p_job: +job }).then(function (o) {
if (!o || !o.ok || !o.key)
return;
var before = mgStageOf(o.key);
MG.board[o.key] = { dug: +o.dug || 0, name: o.name || (MG.board[o.key] && MG.board[o.key].name) };
mgSave();
var after = mgStageOf(o.key);
if (after !== before) {
mgGrew(o.key, true);
return;
}
MG.digN++;
if (MG.digN === 1 || MG.digN % 5 === 0) {
var S = mgSteps(), nx = S[after], left = nx ? nx - (+o.dug || 0) : 0;
mgSay("⛏️ Your work dug <b>" + esc(o.name || "the mine") + "</b> on: " + (+o.dug) + " shifts' digging so far" + (nx ? ", " + left + " more to " + esc(MG_PART[MG_SEQ[after]].n) + "." : "."));
}
}).catch(function (e) { if (mgMissing(e))
MG.missing = true; });
},
function (key) {
var S = MG_SITES[key], st = mgStageOf(key), nm = S ? S.name : key;
mgLoad(false).then(function () { if (mgStageOf(key) !== st)
mgGrew(key, false); });
var h = "<b>The new workings of " + esc(nm) + ".</b> ";
if (!st)
h += "The miners have only just begun: the drift runs a little way in to the face. Every task a miner finishes on shift digs it further, and each part they break into stays dug, for everyone.";
else
h += "Dug by " + esc(nm) + "'s miners: " + st + " part" + (st === 1 ? "" : "s") + " so far, from the mouth to the face where they are working now. The seams can be worked by anyone.";
mgSay(h);
},
function (key, face) {
mgLoad(false);
var S = MG_SITES[key], dug = mgDug(key), st = mgStage(dug), steps = mgSteps(), nx = st < MG_SEQ.length ? MG_PART[MG_SEQ[st]] : null, left = nx ? steps[st] - dug : 0;
var nm = (S ? S.name : key), Nm = nm.charAt(0).toUpperCase() + nm.slice(1);
var h = "<div style='font:600 17px var(--serif,Georgia);color:#F2D8A0'>" + (face ? "The face" : "The shift boss") + " · " + esc(Nm) + "</div>";
h += "<p style='margin:6px 0;opacity:.9'>" + (face ? "Fresh-blasted rock, the drill holes in it, the cart waiting. " : "&ldquo;You want to know how far we've got? I'll tell you.&rdquo; ") +
"<b>" + dug + "</b> shifts' digging so far, " + st + " of " + MG_SEQ.length + " parts open.</p>";
if (nx)
h += "<p style='margin:6px 0'>Next: <b>" + esc(nx.n) + "</b>, " + esc(nx.d) + ". About <b>" + left + "</b> more tasks on shift to break through.</p>";
else
h += "<p style='margin:6px 0'>The great cavern is open: that is as far as these workings go, for now.</p>";
h += "<p style='margin:6px 0;opacity:.8;font-size:12.5px'>How it grows: every task a miner of " + esc(nm) + " finishes on shift digs it a little further, and the server keeps the count, so what one miner digs, everyone sees. Ask for work at the 📋 Hiring here board" + (MG_UD[key] ? "" : " in the Pithead Hall") + ".</p>";
if (MG.missing)
h += "<p style='margin:6px 0;color:#F0C080;font-size:12.5px'>The miners' tally opens soon.</p>";
var fns = {};
if (st > 0) {
h += worldBtn("parts", "What has been dug", "");
fns.parts = function () { mgPartsCard(key); };
}
if (!face) {
h += worldBtn("talk", "Talk with the shift boss", "");
fns.talk = function () { worldCard(null); mgBossTalk(key); };
}
if (mgKeeper()) {
if (nx) {
h += worldBtn("kopen", "Keeper: open " + nx.n + " now", "the count goes up to " + steps[st]);
fns.kopen = function () { mgKeeperSet(key, steps[st]); };
}
if (st > 0) {
h += worldBtn("kclose", "Keeper: close the last part", "the count goes back to " + (st > 1 ? steps[st - 2] : 0));
fns.kclose = function () { mgKeeperSet(key, st > 1 ? steps[st - 2] : 0); };
}
}
if (typeof worldCard === "function")
worldCard(h, fns);
},
function (key) {
var st = mgStageOf(key), h = "<div style='font:600 17px var(--serif,Georgia);color:#F2D8A0'>What has been dug</div><ol style='margin:8px 0 0 18px;padding:0'>";
for (var i = 0; i < st; i++) {
var P = MG_PART[MG_SEQ[i]];
h += "<li style='margin:3px 0'><b>" + esc(P.t) + "</b>: " + esc(P.d) + "</li>";
}
worldCard(h + "</ol>", {});
},
function (key) {
if (typeof wTalk !== "function")
return;
var S = MG_SITES[key], dug = mgDug(key), st = mgStage(dug), nx = st < MG_SEQ.length ? MG_PART[MG_SEQ[st]] : null, nm = S ? S.name : key;
var done = [];
for (var i = 0; i < st; i++)
done.push(MG_PART[MG_SEQ[i]].n);
wTalk({ name: "The shift boss of " + nm,
persona: "the shift boss at the working face of the new workings of " + nm + ": practical, proud of the crew, strict about safety (props, air, the warning horn), and glad of company. " +
"The miners have done " + dug + " tasks' digging here so far and broken into " + (done.length ? done.join(", ") : "nothing yet beyond the first drift") + ". " +
(nx ? "Next they will break into " + nx.n + " (" + nx.d + "), about " + (mgSteps()[st] - dug) + " more tasks away. " : "They have reached the great cavern, as far as the workings go for now. ") +
"You explain how real mining works (drilling, blasting safely, timbering a roof, hauling ore, ventilation, pumping water) in plain words. Anyone may work the seams; the ore goes into their backpack. Rare materials are only ever found, never sold. Keep it suitable for all ages.",
greet: "Mind the rails. You've come to see how far we've dug? " + (nx ? "We're " + (mgSteps()[st] - dug) + " tasks off " + nx.n + "." : "All the way to the great cavern, would you believe.") });
},
function (key, dug) {
mgRpc("keeper_mine_set", { p_key: key, p_dug: dug }).then(function (o) {
if (!o || !o.ok) {
mgSay(esc((o && o.say) || "That did not go through."));
return;
}
MG.board[key] = { dug: +o.dug || 0, name: (MG.board[key] && MG.board[key].name) || key };
mgSave();
worldCard(null);
mgGrew(key, false);
mgSay("<b>Done.</b> " + esc(o.say || ""));
}).catch(function (e) { mgSay(mgMissing(e) ? "Run the latest server update first." : esc((e && e.message) || String(e))); });
},
function (seam, key) {
if (MG.gathering)
return;
if (!mgSigned()) {
mgSay("Sign in to work the seam: what you find is kept against your account, in your backpack.");
return;
}
var S = MG_SITES[key] || (MG.cur && MG.cur.mount && MG.cur.mount.site);
if (!S)
return;
var id = mgSpotId(S, seam.i), now = Date.now(), until = +MG.picked[id] || 0;
if (until > now && !mgKeeper()) {
mgSay("You have had what this seam gives for now. Worth another go in " + Math.ceil((until - now) / 60000) + " minutes.");
return;
}
MG.gathering = true;
mgSay(seam.vug ? "You work a crystal loose from the rock…" : "You swing the pick at the seam…");
if (typeof playTone === "function")
try {
playTone(220, 0.12);
setTimeout(function () { playTone(260, 0.12); }, 500);
}
catch (e) { }
setTimeout(function () {
mgRpc("craft_gather", { p_spot: id }).then(function (o) {
MG.gathering = false;
if (o && o.ok) {
MG.picked[id] = Date.now() + (+o.regrow || 25) * 60000;
mgPickedSave();
var M = typeof grMatOf === "function" ? grMatOf(o.kind) : { name: o.kind, icon: "" };
mgSay("<b>" + (M.icon || "⛏️") + " +" + (+o.got || 1) + " " + esc(M.name || o.kind) + "</b>. It is in your 🎒 Backpack, under Materials: sell it to the city, or take it to a forge.");
if (typeof loadStock === "function")
try {
loadStock();
}
catch (e) { }
}
else {
if (o && o.wait) {
MG.picked[id] = Date.now() + o.wait * 60000;
mgPickedSave();
}
mgSay(esc((o && o.say) || "Nothing came of it."));
}
}).catch(function (e) { MG.gathering = false; mgSay(mgMissing(e) ? "The seams open with the next server update." : esc((e && e.message) || String(e))); });
}, 1300);
}
];
});
