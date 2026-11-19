/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(448, function () {
return [
function (R) {
if (typeof DEITY === "undefined")
return [];
return Object.keys(DEITY).filter(function (k) { return R.trads.indexOf(DEITY[k].trad || "") >= 0; }).sort(function (a, b) {
var ta = R.trads.indexOf(DEITY[a].trad), tb = R.trads.indexOf(DEITY[b].trad);
return ta - tb || (DEITY[a].name < DEITY[b].name ? -1 : DEITY[a].name > DEITY[b].name ? 1 : 0);
});
},
function () {
if (HVN.realms.length)
return HVN.realms;
var list = [], GOLD = 2.399963;
HVN_REALMS.forEach(function (D) {
var keys = hvnDeities(D);
if (!keys.length)
return;
var sp = D.fit + 18, n = keys.length, r0 = D.fit + 32;
var R = { D: D, k: D.k, keys: keys, pal: [], i: list.length, sp: sp, c: sp / 1.5, r0: r0, ways: [] };
R.R = Math.round(r0 + R.c * Math.sqrt(n * 1.35 + 5) + D.fit / 2 + 28);
var g = HVN_GLOBE[D.k] || [0, 0], m = hvnGlobeXZ(g[0], g[1]);
R.x = R.sx = m.x;
R.z = R.sz = m.z;
list.push(R);
});
var court = { k: "court", x: 0, z: 0, R: 96, fixed: true, ways: [] };
function relax() {
var B = list.concat([court]);
for (var it = 0; it < 900; it++) {
var moved = false, pull = it < 600 ? 0.03 * (1 - it / 600) : 0;
if (pull)
list.forEach(function (R) { R.x += (R.sx - R.x) * pull; R.z += (R.sz - R.z) * pull; });
for (var i = 0; i < B.length; i++)
for (var j = i + 1; j < B.length; j++) {
var A = B[i], C = B[j], dx = C.x - A.x, dz = C.z - A.z, d = Math.hypot(dx, dz) || 1, need = A.R + C.R + 90;
if (d < need) {
var p = (need - d) / 2 + 0.5, ux = dx / d, uz = dz / d;
moved = true;
if (A.fixed) {
C.x += ux * p * 2;
C.z += uz * p * 2;
}
else if (C.fixed) {
A.x -= ux * p * 2;
A.z -= uz * p * 2;
}
else {
A.x -= ux * p;
A.z -= uz * p;
C.x += ux * p;
C.z += uz * p;
}
}
}
if (!moved && !pull)
break;
}
}
relax();
var joined = [court], left = list.slice(), pairs = [];
while (left.length) {
var best = null;
left.forEach(function (R, li) { joined.forEach(function (J) { var d = Math.hypot(R.x - J.x, R.z - J.z) - R.R - J.R; if (!best || d < best.d)
best = { d: d, R: R, J: J, li: li }; }); });
left.splice(best.li, 1);
joined.push(best.R);
pairs.push([best.J, best.R]);
best.R.from = best.J;
}
function ways() {
court.ways = [];
list.forEach(function (R) { R.ways = []; });
pairs.forEach(function (q) { var J = q[0], R = q[1]; R.inA = Math.atan2(J.z - R.z, J.x - R.x); R.ways.push(R.inA); J.ways.push(Math.atan2(R.z - J.z, R.x - J.x)); });
}
ways();
list.forEach(function (R) {
var n = R.keys.length, i = 0, far = 0, half = (R.D.fit * 0.62 + 9);
while (R.pal.length < n && i < 6000) {
var r = R.r0 + R.c * Math.sqrt(i + 0.5), a = i * GOLD + R.i * 0.7;
i++;
if (R.ways.some(function (w) { return Math.abs(hvnWrapA(a - w)) < (half + 4) / r; }))
continue;
var px = R.x + Math.cos(a) * r, pz = R.z + Math.sin(a) * r;
if (R.pal.some(function (P) { return Math.hypot(P.x - px, P.z - pz) < R.sp * 0.9; }))
continue;
R.pal.push({ key: R.keys[R.pal.length], x: px, z: pz, lx: px - R.x, lz: pz - R.z, a: a, ry: Math.atan2(R.x - px, R.z - pz), ring: 0, r: r, R: R });
far = Math.max(far, r);
}
var real = Math.round(far + R.D.fit / 2 + 30);
if (real > R.R) {
R.R = real;
R.grew = true;
}
HVN.byTrad[R.k] = R;
});
if (list.some(function (R) { return R.grew; })) {
relax();
ways();
}
list.forEach(function (R) { R.pal.forEach(function (P) { P.x = R.x + P.lx; P.z = R.z + P.lz; P.ph = P.a - R.inA; }); });
HVN.court = null;
HVN.courtWays = court.ways;
HVN.pairs = pairs;
HVN.roads = pairs.map(function (q) {
var J = q[0], R = q[1], b = Math.atan2(R.z - J.z, R.x - J.x), a = R.inA, jr = J === court ? 64 : J.R + 2;
return { x0: J.x + Math.cos(b) * jr, z0: J.z + Math.sin(b) * jr, x1: R.x + Math.cos(a) * (R.R + 2), z1: R.z + Math.sin(a) * (R.R + 2), to: R.k, from: J.k };
});
var x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
list.forEach(function (R) { x0 = Math.min(x0, R.x - R.R); x1 = Math.max(x1, R.x + R.R); z0 = Math.min(z0, R.z - R.R); z1 = Math.max(z1, R.z + R.R); });
HVN.box = { x0: x0 - 420, x1: x1 + 420, z0: z0 - 420, z1: z1 + 420 };
HVN.RR = 0;
HVN.bound = Math.max(-HVN.box.x0, HVN.box.x1, -HVN.box.z0, HVN.box.z1) * 1.5;
HVN.realms = list;
return list;
},
function (k) {
var key = "g" + k;
if (HVN_MAT[key])
return HVN_MAT[key];
var G = HVN_GROUND[k] || HVN_GROUND.cloud;
var t = hvnTex(key, function (x, W, H) {
x.fillStyle = G[0];
x.fillRect(0, 0, W, H);
hvnSpeck(x, W, H, 1500, G[1], 0.8, 2.6, k.length * 7 + 3);
if (k === "marble" || k === "cloud") {
x.strokeStyle = k === "marble" ? "rgba(150,140,130,.35)" : "rgba(220,200,160,.25)";
x.lineWidth = 2;
for (var i = 0; i <= 4; i++) {
x.beginPath();
x.moveTo(0, i * 64);
x.lineTo(W, i * 64);
x.stroke();
x.beginPath();
x.moveTo(i * 64, 0);
x.lineTo(i * 64, H);
x.stroke();
}
}
if (k === "terrace") {
x.strokeStyle = "rgba(90,80,60,.45)";
x.lineWidth = 3;
for (var j = 0; j < 8; j++) {
x.beginPath();
x.moveTo(0, j * 32);
x.lineTo(W, j * 32);
x.stroke();
}
}
});
t.repeat.set(1, 1);
var m = new THREE.MeshLambertMaterial({ map: t, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
m.userData.hvnShared = true;
if (k === "marble" || k === "cloud" || k === "snow" || k === "sand" || k === "beach")
m.userData.noReal = 1;
return (HVN_MAT[key] = m);
},
function (col, o) {
var key = "m" + col + (o ? JSON.stringify(o) : "");
if (HVN_MAT[key])
return HVN_MAT[key];
var m = o && o.vc ? new THREE.MeshLambertMaterial({ color: col, vertexColors: true }) : o && o.phong ? new THREE.MeshPhongMaterial({ color: col, shininess: o.phong }) : o && o.basic ? new THREE.MeshBasicMaterial({ color: col, transparent: !!o.op, opacity: o.op || 1, depthWrite: !o.op, fog: o.fog !== false }) : new THREE.MeshLambertMaterial({ color: col });
if (o && o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.6;
}
if (o && o.ds)
m.side = THREE.DoubleSide;
if (o && o.op && !o.basic) {
m.transparent = true;
m.opacity = o.op;
}
m.userData.hvnShared = true;
return (HVN_MAT[key] = m);
},
function (col) {
var key = "w" + col;
if (HVN_MAT[key])
return HVN_MAT[key];
var t = hvnTex(key, function (x, W, H) { x.fillStyle = "#" + ("00000" + col.toString(16)).slice(-6); x.fillRect(0, 0, W, H); hvnSpeck(x, W, H, 220, ["rgba(255,255,255,.25)", "rgba(255,255,255,.12)", "rgba(0,30,60,.2)"], 2, 8, col % 97); }, 4);
var m = new THREE.MeshPhongMaterial({ map: t, shininess: 100, specular: 0xBBDDEE, transparent: true, opacity: 0.9, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
m.userData.hvnShared = true;
return (HVN_MAT[key] = m);
},
function (parent, arch, x, z, ry, s, o) {
if (typeof KIT === "undefined" || !KIT[arch] || typeof build !== "function")
return null;
o = o || {};
var spec = { id: "hvn_" + arch + "_" + Math.round(x) + "_" + Math.round(z), archetype: arch, attrs: Object.assign({}, o.attrs || {}), x: 0, z: 0, rot: 0, solid: false, detail: hvnLite() ? 2 : 3, nights: [], city: true, hub: true };
if (s && s !== 1)
spec.attrs.s = s;
var g = null;
try {
g = build(spec);
}
catch (e) {
g = null;
}
if (!g)
return null;
if (o.tint !== undefined) {
var tc = new THREE.Color(o.tint);
g.traverse(function (m) { if (m.isMesh && m.material && m.material.color) {
m.material = m.material.clone();
m.material.userData.hvnMine = true;
m.material.color.lerp(tc, o.tk || 0.6);
} });
}
g.position.set(x, o.y || 0, z);
g.rotation.y = ry || 0;
g.userData.hvnKit = true;
parent.add(g);
if (o.solid !== false && !(typeof ATL_WALKTHROUGH !== "undefined" && ATL_WALKTHROUGH[arch]) && KIT[arch].cat !== "being") {
var sz = KIT[arch].size, sc = s || 1;
if (o.solid === "box")
(o.list || HVN.solids).push({ x: x, z: z, hw: sz[0] * sc / 2, hd: sz[2] * sc / 2, rot: ry || 0, h: sz[1] * sc });
else
(o.list || HVN.solids).push({ x: x, z: z, r: Math.max(0.4, Math.min(sz[0], sz[2]) * sc * 0.42) });
}
return g;
},
function (p, r0, r1, h, mat, x, y, z, seg) {
var k = "cyl" + (seg || 14), m = new THREE.Mesh(hvnGeo(k, function () { return new THREE.CylinderGeometry(0.5, 0.5, 1, seg || 14); }), mat);
m.scale.set(r0 * 2, h, r0 * 2);
m.position.set(x, y, z);
if (r1 !== r0) {
m.geometry = new THREE.CylinderGeometry(r0, r1, h, seg || 14);
m.scale.set(1, 1, 1);
m.userData.hvnMine = true;
}
p.add(m);
return m;
},
function (p, x0, z0, x1, z1, w, mat, y) {
var L = Math.hypot(x1 - x0, z1 - z0), geo = new THREE.PlaneGeometry(w, L, 1, Math.max(1, Math.round(L / 20)));
geo.rotateX(-Math.PI / 2);
var uv = geo.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * w / 12, uv.getY(i) * L / 12);
var m = new THREE.Mesh(geo, mat);
m.userData.hvnMine = true;
m.position.set((x0 + x1) / 2, y || 0.06, (z0 + z1) / 2);
m.rotation.y = Math.atan2(x1 - x0, z1 - z0);
p.add(m);
return m;
},
function (p, r, mat, x, z, y, inner) {
var g = inner ? new THREE.RingGeometry(inner, r, 64, 1) : new THREE.CircleGeometry(r, 64);
g.rotateX(-Math.PI / 2);
var uv = g.attributes.uv, pos = g.attributes.position;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, pos.getX(i) / 12, pos.getZ(i) / 12);
var m = new THREE.Mesh(g, mat);
m.position.set(x, y || 0.04, z);
m.userData.hvnMine = true;
p.add(m);
return m;
},
function (p, kind, x, z, s) {
var g = new THREE.Group();
g.position.set(x, 0, z);
s = s || 1;
g.scale.setScalar(s);
p.add(g);
if (kind === "sakura") {
hvnCyl(g, 0.25, 0.35, 3, hvnM(0x4A3428), 0, 1.5, 0, 8);
[[0, 4.2, 0, 2.4], [1.5, 3.8, 0.6, 1.8], [-1.4, 3.9, -0.5, 1.9], [0.3, 3.6, -1.5, 1.7], [-0.4, 3.7, 1.5, 1.7]].forEach(function (q, i) { hvnSph(g, q[3], hvnM(i % 2 ? 0xF6C8D6 : 0xF0B0C6), q[0], q[1], q[2], 0.75); });
}
else if (kind === "birch") {
hvnCyl(g, 0.16, 0.22, 7, hvnM(0xEDEAE2), 0, 3.5, 0, 8);
for (var b = 0; b < 5; b++)
hvnBox(g, 0.34, 0.06, 0.34, hvnM(0x2A2826), 0, 1 + b * 1.2, 0);
[[0, 7, 0, 1.8], [0.8, 6, 0.4, 1.4], [-0.7, 6.2, -0.3, 1.3]].forEach(function (q) { hvnSph(g, q[3], hvnM(0x8AB848), q[0], q[1], q[2], 1.2); });
}
else if (kind === "cypress") {
hvnCyl(g, 0.2, 0.25, 1.4, hvnM(0x4A3828), 0, 0.7, 0, 8);
var c = new THREE.Mesh(hvnGeo("cyp", function () { return new THREE.SphereGeometry(1, 10, 10); }), hvnM(0x2E5A2E));
c.scale.set(1, 4.4, 1);
c.position.y = 5;
g.add(c);
}
else if (kind === "olive") {
hvnCyl(g, 0.28, 0.4, 2.4, hvnM(0x6A5A48), 0, 1.2, 0, 8);
[[0, 3.2, 0, 2], [1.2, 2.9, 0.5, 1.4], [-1.1, 3, -0.4, 1.5]].forEach(function (q) { hvnSph(g, q[3], hvnM(0x8A9A6A), q[0], q[1], q[2], 0.7); });
}
else if (kind === "apple") {
hvnCyl(g, 0.25, 0.35, 2.6, hvnM(0x5A4030), 0, 1.3, 0, 8);
hvnSph(g, 2.4, hvnM(0x5A9A3A), 0, 3.8, 0, 0.8);
for (var a = 0; a < 9; a++) {
var t = a / 9 * Math.PI * 2;
hvnSph(g, 0.18, hvnM(0xC8302A), Math.cos(t) * 2, 3.4 + (a % 3) * 0.5, Math.sin(t) * 2);
}
}
else if (kind === "palm") {
var lean = 0.12, tm = hvnM(0x7A6248), rm = hvnM(0x5E4A36);
for (var q = 0; q < 6; q++) {
var yy = q * 1.25 + 0.62, sx = lean * yy * yy * 0.08, sg = hvnCyl(g, 0.26 - q * 0.02, 0.3 - q * 0.02, 1.25, tm, sx, yy, 0, 8);
sg.rotation.z = -lean * yy * 0.06;
hvnCyl(g, 0.31 - q * 0.02, 0.31 - q * 0.02, 0.12, rm, sx, yy - 0.55, 0, 8);
}
var top = 6 * 1.25, tx = lean * top * top * 0.08;
var fg = hvnGeo("frond", function () {
var n = 8, pos = [], idx = [];
for (var i = 0; i <= n; i++) {
var u = i / n, L = u * 4.6, y = 0.9 * u - 1.9 * u * u, w = 0.55 * Math.sin(Math.PI * Math.min(1, u * 1.1 + 0.05));
pos.push(-w, y - 0.12 * w, L, 0, y + 0.08, L, w, y - 0.12 * w, L);
if (i < n) {
var b = i * 3;
idx.push(b, b + 3, b + 1, b + 1, b + 3, b + 4, b + 1, b + 4, b + 2, b + 2, b + 4, b + 5);
}
}
var G2 = new THREE.BufferGeometry();
G2.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
G2.setIndex(idx);
G2.computeVertexNormals();
return G2;
});
var fm = hvnM(0x3E7A2E, { ds: 1 }), fm2 = hvnM(0x5A9238, { ds: 1 });
for (var f = 0; f < 10; f++) {
var fr = new THREE.Mesh(fg, f % 2 ? fm : fm2);
fr.position.set(tx, top, 0);
fr.rotation.y = f / 10 * Math.PI * 2 + (f % 2) * 0.2;
fr.rotation.x = -(f % 3) * 0.12;
g.add(fr);
}
for (var cn = 0; cn < 4; cn++) {
var ct = cn / 4 * Math.PI * 2;
hvnSph(g, 0.2, hvnM(0x6A4A26), tx + Math.cos(ct) * 0.3, top - 0.3, Math.sin(ct) * 0.3);
}
}
else if (kind === "cloud") {
[[0, 0, 0, 3], [2.6, -0.4, 0.6, 2.2], [-2.5, -0.3, -0.4, 2.4], [0.8, 0.8, -1.6, 2]].forEach(function (q) { hvnSph(g, q[3], hvnM(0xE4E4EC, { e: 0xC8C4BC, ei: 0.25 }), q[0], q[1], q[2], 0.6); });
}
g.traverse(function (o) { o.raycast = function () { }; });
return g;
},
function (p, x, z, h, r, rock, cap, seed) {
var g = new THREE.Group();
g.position.set(x, 0, z);
p.add(g);
var R = wRand(seed || 5);
for (var i = 0; i < 5; i++) {
var hh = h * (i ? 0.55 + R() * 0.3 : 1), rr = r * (i ? 0.5 + R() * 0.3 : 1), ox = i ? (R() - 0.5) * r * 1.1 : 0, oz = i ? (R() - 0.5) * r * 0.8 : 0;
var geo = new THREE.ConeGeometry(rr, hh, 11, 6), pos = geo.attributes.position;
for (var k = 0; k < pos.count; k++) {
var y = pos.getY(k), t = (y + hh / 2) / hh;
if (t > 0.98)
continue;
var n = wFbm(pos.getX(k) * 0.05 + i * 7, pos.getZ(k) * 0.05 + y * 0.03, seed + i, 3);
var s = 0.75 + n * 0.6;
pos.setX(k, pos.getX(k) * s);
pos.setZ(k, pos.getZ(k) * s);
pos.setY(k, y + (n - 0.5) * hh * 0.06);
}
geo.computeVertexNormals();
var cols = new Float32Array(pos.count * 3), cA = new THREE.Color(rock), cB = new THREE.Color(cap), c = new THREE.Color();
for (var q = 0; q < pos.count; q++) {
var tt = (pos.getY(q) + hh / 2) / hh;
c.copy(cA).lerp(cB, Math.max(0, Math.min(1, (tt - 0.58) * 4)));
cols[q * 3] = c.r;
cols[q * 3 + 1] = c.g;
cols[q * 3 + 2] = c.b;
}
geo.setAttribute("color", new THREE.BufferAttribute(cols, 3));
var m = new THREE.Mesh(geo, hvnM(0xFFFFFF, { vc: 1 }));
m.material.vertexColors = true;
m.position.set(ox, hh / 2 - 2, oz);
m.userData.hvnMine = true;
g.add(m);
}
for (var j = 0; j < 10; j++) {
var a = j / 10 * Math.PI * 2;
hvnSph(g, r * 0.22, hvnM(0xFFFFFF, { e: 0xF4F0E8, ei: 0.35 }), Math.cos(a) * r * 0.75, h * 0.32, Math.sin(a) * r * 0.6, 0.45);
}
return g;
},
function (p, x0, z0, x1, z1, w, H) {
var L = Math.hypot(x1 - x0, z1 - z0), cols = [0xE83A3A, 0xF08A2A, 0xF2D23A, 0x4AB84A, 0x3A8AE8, 0x4A4AB8, 0x8A4AC8], n = 40, g = new THREE.Group();
g.position.set(x0, 0, z0);
g.rotation.y = Math.atan2(x1 - x0, z1 - z0);
p.add(g);
cols.forEach(function (col, b) {
var pos = [], idx = [], x0b = -w / 2 + b * w / 7, x1b = x0b + w / 7;
for (var i = 0; i <= n; i++) {
var t = i / n, y = Math.sin(t * Math.PI) * H + 0.12, zz = t * L;
pos.push(x0b, y, zz, x1b, y, zz);
if (i < n) {
var a = i * 2;
idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
}
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
geo.setIndex(idx);
geo.computeVertexNormals();
var m = new THREE.Mesh(geo, hvnM(col, { basic: true, op: 0.85 }));
m.material.side = THREE.DoubleSide;
m.userData.hvnMine = true;
g.add(m);
});
return { x0: x0, z0: z0, x1: x1, z1: z1, w: w, H: H, L: L };
},
function (p, x, z, s) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.scale.setScalar(s || 1);
p.add(g);
var bark = hvnM(0x5A4632), R = wRand(31);
hvnCyl(g, 1.8, 3.4, 30, bark, 0, 15, 0, 14);
for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2, rt = new THREE.Mesh(hvnGeo("root", function () { return new THREE.CylinderGeometry(0.4, 1.4, 1, 8); }), bark);
rt.scale.set(1, 9, 1);
rt.position.set(Math.cos(a) * 4, 1.4, Math.sin(a) * 4);
rt.rotation.set(Math.sin(a) * 1.25, 0, -Math.cos(a) * 1.25);
g.add(rt);
}
for (var b = 0; b < 6; b++) {
var a2 = b / 6 * Math.PI * 2 + 0.3, br = new THREE.Mesh(hvnGeo("bough", function () { return new THREE.CylinderGeometry(0.35, 1, 1, 8); }), bark);
br.scale.set(1, 14, 1);
br.position.set(Math.cos(a2) * 5, 26, Math.sin(a2) * 5);
br.rotation.set(Math.sin(a2) * 1.0, 0, -Math.cos(a2) * 1.0);
g.add(br);
}
var n = 46, leaf = new THREE.InstancedMesh(hvnGeo("sph", function () { return new THREE.SphereGeometry(1, 14, 10); }), hvnM(0x3E7A34), n), o = new THREE.Object3D();
for (var k = 0; k < n; k++) {
var t = R() * Math.PI * 2, rr = 4 + R() * 14, y = 28 + R() * 12 - rr * 0.25, sc = 4 + R() * 3.5;
o.position.set(Math.cos(t) * rr, y, Math.sin(t) * rr);
o.scale.set(sc, sc * 0.7, sc);
o.updateMatrix();
leaf.setMatrixAt(k, o.matrix);
}
leaf.userData.hvnMine = true;
g.add(leaf);
var leaf2 = new THREE.InstancedMesh(hvnGeo("sph", function () { return new THREE.SphereGeometry(1, 14, 10); }), hvnM(0x5A9A44), 18);
for (var k2 = 0; k2 < 18; k2++) {
var t2 = R() * Math.PI * 2, r2 = 6 + R() * 12;
o.position.set(Math.cos(t2) * r2, 36 + R() * 6 - r2 * 0.2, Math.sin(t2) * r2);
o.scale.set(3.5, 2.6, 3.5);
o.updateMatrix();
leaf2.setMatrixAt(k2, o.matrix);
}
leaf2.userData.hvnMine = true;
g.add(leaf2);
return g;
},
function (R, G, list) {
var Q = { R: R, G: G, list: list, small: hvnLite(), roaded: false };
Q.p = function (r, ph) { var a = R.inA + ph; return { x: Math.cos(a) * r, z: Math.sin(a) * r, a: a }; };
Q.face = function (x, z) { return Math.atan2(-x, -z); };
Q.kit = function (arch, r, ph, s, o) {
o = o || {};
var p = Q.p(r, ph);
var ry = o.ry !== undefined ? o.ry : r < 0.5 ? Math.atan2(Math.cos(R.inA), Math.sin(R.inA)) : Q.face(p.x, p.z) + (o.turn || 0);
return hvnKit(G, arch, p.x, p.z, ry, s, { tint: o.tint, tk: o.tk, attrs: o.attrs, y: o.y, solid: o.solid === undefined ? true : o.solid, list: list });
};
Q.tree = function (kind, r, ph, s) { var p = Q.p(r, ph); var t = hvnTree(G, kind, p.x, p.z, s); if (kind !== "cloud")
list.push({ x: p.x, z: p.z, r: 0.45 * (s || 1) }); return t; };
Q.clear = function (x, z, room) {
var r = Math.hypot(x, z);
if (r > R.R - 6)
return false;
var a = Math.atan2(z, x);
if (R.ways.some(function (w) { return Math.abs(hvnWrapA(a - w)) < (6 + (room || 2)) / Math.max(r, 1); }))
return false;
return !R.pal.some(function (P) { return Math.hypot(P.lx - x, P.lz - z) < R.D.fit * 0.62 + 3 + (room || 2); });
};
Q.around = function (fn, every, off) {
var sp = every || 16, rnd = wRand(R.i * 131 + (every || 16) * 7), out = [], lim = Q.small ? 50 : 140;
for (var gx = -R.R; gx <= R.R; gx += sp)
for (var gz = -R.R; gz <= R.R; gz += sp) {
var x = gx + (rnd() - 0.5) * sp * 0.8, z = gz + (rnd() - 0.5) * sp * 0.8, r = Math.hypot(x, z);
if (r < Math.max(24, R.r0 - 12) || !Q.clear(x, z, 2))
continue;
out.push([r, Math.atan2(z, x) - R.inA]);
}
var k = Math.max(1, Math.ceil(out.length / lim));
for (var i = 0; i < out.length; i += k)
fn(out[i][0], out[i][1], i / k | 0, 0);
};
Q.gate = function (fn) { [-1, 1].forEach(function (sd) { fn(R.R - 10, sd * Math.min(0.22, 10 / R.R), sd); }); };
Q.road = function (mat, w) { Q.roaded = true; if (!mat.userData.toned) {
mat.userData.toned = 1;
mat.userData.noReal = 1;
mat.color.multiplyScalar(0.84);
} R.ways.forEach(function (a) { hvnStrip(G, Math.cos(a) * (R.R + 3), Math.sin(a) * (R.R + 3), Math.cos(a) * 12, Math.sin(a) * 12, w || 7, mat, 0.18); }); };
Q.flowers = function (cols, n, sz) {
n = Math.round((n || 700) * (Q.small ? 0.35 : 1));
var rnd = wRand(R.i * 17 + 3), pts = [];
for (var t = 0; t < n * 3 && pts.length < n; t++) {
var a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * (R.R - 8), x = Math.cos(a) * r, z = Math.sin(a) * r;
if (r < 16 || !Q.clear(x, z, 0))
continue;
pts.push([x, z]);
}
if (!pts.length)
return;
var im = new THREE.InstancedMesh(hvnGeo("bloom", function () { return new THREE.IcosahedronGeometry(1, 0); }), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), pts.length), o = new THREE.Object3D(), c = new THREE.Color();
im.material.userData.hvnMine = true;
pts.forEach(function (q, i) { var s = (sz || 0.22) * (0.7 + rnd() * 0.6); o.position.set(q[0], 0.12 + s * 0.6, q[1]); o.scale.set(s, s * 0.7, s); o.updateMatrix(); im.setMatrixAt(i, o.matrix); c.setHex(cols[i % cols.length]); im.setColorAt(i, c); });
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.userData.hvnMine = true;
G.add(im);
};
Q.wall = function (r, h, mat, crest) {
var n = Math.round(Math.PI * 2 * r / 7), segs = [];
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2;
if (R.ways.some(function (w) { return Math.abs(hvnWrapA(a - w)) < 12 / r; }))
continue;
segs.push(a);
}
var im = new THREE.InstancedMesh(hvnGeo("box", function () { return new THREE.BoxGeometry(1, 1, 1); }), mat, segs.length), o = new THREE.Object3D();
segs.forEach(function (a, i) { var x = Math.cos(a) * r, z = Math.sin(a) * r; o.position.set(x, h / 2, z); o.rotation.set(0, -a, 0); o.scale.set(1.6, h, Math.PI * 2 * r / n + 0.3); o.updateMatrix(); im.setMatrixAt(i, o.matrix); list.push({ x: x, z: z, r: 2.2 }); });
im.userData.hvnMine = true;
G.add(im);
if (crest) {
var im2 = new THREE.InstancedMesh(hvnGeo("box", function () { return new THREE.BoxGeometry(1, 1, 1); }), crest, segs.length * 2);
segs.forEach(function (a, i) { [0.25, -0.25].forEach(function (f, k) { var a2 = a + f * 7 / r; o.position.set(Math.cos(a2) * r, h + 0.5, Math.sin(a2) * r); o.rotation.set(0, -a2, 0); o.scale.set(1.7, 1, 1.4); o.updateMatrix(); im2.setMatrixAt(i * 2 + k, o.matrix); }); });
im2.userData.hvnMine = true;
G.add(im2);
}
};
return Q;
},
function (Q, r, ph, s) {
var p = Q.p(r, ph), g = new THREE.Group();
g.position.set(p.x, 0, p.z);
g.rotation.y = Q.face(p.x, p.z);
Q.G.add(g);
s = s || 1;
hvnSph(g, 9 * s, hvnM(0x5E9E42), 0, -3 * s, 0, 0.62);
var st = hvnM(0x8A8478);
hvnBox(g, 0.9 * s, 3.4 * s, 0.9 * s, st, -1.4 * s, 1.7 * s, 8.2 * s);
hvnBox(g, 0.9 * s, 3.4 * s, 0.9 * s, st, 1.4 * s, 1.7 * s, 8.2 * s);
hvnBox(g, 3.8 * s, 0.8 * s, 1 * s, st, 0, 3.6 * s, 8.2 * s);
hvnBox(g, 1.9 * s, 3 * s, 0.2 * s, hvnM(0x1A140E), 0, 1.5 * s, 8.3 * s);
Q.list.push({ x: p.x, z: p.z, r: 8.5 * s });
},
function (Q, r, ph) {
var p = Q.p(r, ph), g = new THREE.Group();
g.position.set(p.x, 0.3, p.z);
g.rotation.y = Q.face(p.x, p.z) + Math.PI / 2;
Q.G.add(g);
var wd = hvnM(0x6A4426);
hvnBox(g, 0.9, 0.6, 8, wd, 0, 0.3, 0);
hvnBox(g, 0.4, 0.3, 6, wd, 2.2, 0.15, 0);
[-1.5, 1.5].forEach(function (z) { hvnBox(g, 2.4, 0.12, 0.18, wd, 1.1, 0.55, z); });
Q.list.push({ x: p.x, z: p.z, r: 2.4 });
},
function (Q, r, ph, n) {
for (var i = 0; i < n; i++) {
var p = Q.p(r + (i % 3) * 9, ph + (Math.floor(i / 3) - 1) * 9 / r);
if (!Q.clear(p.x, p.z, 4))
continue;
var g = new THREE.Group();
g.position.set(p.x, 0, p.z);
g.rotation.y = Q.face(p.x, p.z);
Q.G.add(g);
hvnBox(g, 8, 0.3, 8, hvnM(0x7A6A48), 0, 0.15, 0);
hvnBox(g, 7.2, 0.06, 7.2, hvnWaterMat(0x6A9AA0), 0, 0.32, 0);
var im = new THREE.InstancedMesh(hvnGeo("sprout", function () { return new THREE.ConeGeometry(0.08, 0.6, 4); }), hvnM(0x7AB848), 49), o = new THREE.Object3D(), k = 0;
for (var a = 0; a < 7; a++)
for (var b = 0; b < 7; b++) {
o.position.set(-3 + a, 0.6, -3 + b);
o.updateMatrix();
im.setMatrixAt(k++, o.matrix);
}
im.userData.hvnMine = true;
g.add(im);
}
},
function (Q, r, ph, w, d, col) {
var p = Q.p(r, ph);
if (!Q.clear(p.x, p.z, Math.max(w, d) / 2))
return;
var g = new THREE.Group();
g.position.set(p.x, 0, p.z);
g.rotation.y = Q.face(p.x, p.z);
Q.G.add(g);
var n = Q.small ? 60 : 180, im = new THREE.InstancedMesh(hvnGeo("stalk", function () { return new THREE.ConeGeometry(0.22, 1.5, 5); }), hvnM(col || 0xD8B850), n), o = new THREE.Object3D(), rnd = wRand(Math.round(r * 7 + ph * 100));
for (var i = 0; i < n; i++) {
o.position.set((rnd() - 0.5) * w, 0.75, (rnd() - 0.5) * d);
o.rotation.set((rnd() - 0.5) * 0.2, 0, (rnd() - 0.5) * 0.2);
o.updateMatrix();
im.setMatrixAt(i, o.matrix);
}
im.userData.hvnMine = true;
g.add(im);
},
function (Q, x, z, n) {
var im = new THREE.InstancedMesh(hvnGeo("reed", function () { return new THREE.ConeGeometry(0.06, 2.4, 4); }), hvnM(0x6A9A44), n), o = new THREE.Object3D(), rnd = wRand(Math.round(x * 3 + z));
for (var i = 0; i < n; i++) {
o.position.set(x + (rnd() - 0.5) * 14, 1.1, z + (rnd() - 0.5) * 6);
o.rotation.set((rnd() - 0.5) * 0.3, 0, (rnd() - 0.5) * 0.3);
o.updateMatrix();
im.setMatrixAt(i, o.matrix);
}
im.userData.hvnMine = true;
Q.G.add(im);
},
function (Q) {
var p = Q.p(Q.R.R - 6, 0), g = new THREE.Group();
g.position.set(p.x, 0, p.z);
g.rotation.y = Q.face(p.x, p.z);
Q.G.add(g);
var gold = hvnM(0xD8B048, { phong: 90 });
[-9.5, 9.5].forEach(function (x) { hvnTree(g, "cloud", x + Math.sign(x) * 1.5, 0, 1.1); hvnTree(g, "cloud", x + Math.sign(x) * 1.5, 0, 0.8).position.y = 4; hvnCyl(g, 0.6, 0.7, 10, gold, x, 5, 0, 12); var c = Math.cos(g.rotation.y), sn = Math.sin(g.rotation.y); Q.list.push({ x: p.x + x * c, z: p.z - x * sn, r: 3 }); });
var arc = new THREE.Mesh(new THREE.TorusGeometry(9.5, 0.45, 10, 32, Math.PI), gold);
arc.position.y = 10;
arc.userData.hvnMine = true;
g.add(arc);
},
function (Q) {
Q.kit("plinth", 0, 0, 3, { tint: 0xF4F0E6 });
Q.kit("brazier", 0, 0, 2.2, { y: 2.6, solid: false });
Q.kit("tierfountain", 26, Math.PI, 1.4, { tint: 0xE8C870, tk: 0.35 });
for (var r = Q.R.R - 18; r > 30; r -= 16) {
Q.kit("herostatue", r, 10 / r, 1.2, { tint: 0xF2EEE4 });
Q.kit("herostatue", r, -10 / r, 1.2, { tint: 0xF2EEE4 });
}
hvnCloudGate(Q);
Q.around(function (r, ph, i) { Q.tree(i % 3 ? "cypress" : "olive", r, ph, i % 3 ? 1.1 : 1.2); if (i % 5 === 0)
Q.kit("brazier", r, ph + 0.03, 1.2, { tint: 0xD8B048, tk: 0.4 }); }, 15);
Q.flowers([0xFFFFFF, 0xB898E0, 0xF4E070, 0xE8A0C0], 800);
Q.road(hvnM(0xE8C878, { phong: 40 }), 8);
},
function (Q) {
Q.kit("ringarch", Q.R.R - 18, 0, 1.6, { tint: 0xF0E8D8, solid: false });
Q.kit("tierfountain", 28, Math.PI, 1.2);
var vc = new THREE.Group();
vc.position.set(0, 0, 0);
Q.G.add(vc);
var mb = hvnM(0xF0EADC, { phong: 20 });
hvnBox(vc, 4, 2, 4, mb, 0, 1, 0);
hvnCyl(vc, 1.1, 1.2, 18, mb, 0, 11, 0, 16);
hvnBox(vc, 2.6, 0.6, 2.6, mb, 0, 20.3, 0);
Q.kit("herostatue", 0, 0, 1.2, { tint: 0xD8B048, tk: 0.7, y: 20.6, solid: false });
Q.list.push({ x: 0, z: 0, r: 2.6 });
Q.around(function (r, ph, i) { Q.tree(i % 2 ? "cypress" : "olive", r, ph, 1.1); if (i % 3 === 0)
Q.kit("bannerpole", r, ph + 0.04, 1, { attrs: { c: 0xA8322B } }); }, 15);
Q.flowers([0xC83A3A, 0xFFFFFF, 0xE8C040], 500);
Q.road(hvnM(0xE8E0D0));
},
function (Q) {
var b0 = Q.p(Q.R.R + 80, 0), b1 = Q.p(Q.R.R - 6, 0);
Q.bridge = hvnRainbow(Q.G, b0.x, b0.z, b1.x, b1.z, 10, 10);
hvnWorldTree(Q.G, 0, 0, 1.25);
Q.list.push({ x: 0, z: 0, r: 5 });
Q.kit("moonpool", 26, 0.5, 1.2, { solid: false });
Q.around(function (r, ph, i) { if (i % 3 === 2)
Q.kit("runestone", r, ph, 1.2);
else
Q.kit("pine", r, ph, 1.3); if (i % 5 === 0)
Q.kit("brazier", r, ph + 0.05, 1.3); }, 14);
Q.flowers([0xFFFFFF, 0xA8C8F0, 0xF4E070], 400, 0.18);
Q.road(hvnM(0xA8B4C0));
},
function (Q) {
var a = Q.p(Q.R.R + 20, Math.PI / 2), b = Q.p(Q.R.R + 20, -Math.PI / 2);
hvnStrip(Q.G, a.x, a.z, b.x, b.z, 26, hvnWaterMat(0x2E7A9A), 0.17);
for (var k = 0; k < 14; k++) {
var t = (k + 0.5) / 14, x = a.x + (b.x - a.x) * t, z = a.z + (b.z - a.z) * t, nx = -(b.z - a.z), nz = b.x - a.x, nl = Math.hypot(nx, nz);
[1, -1].forEach(function (sd) { hvnReeds(Q, x + nx / nl * 16 * sd, z + nz / nl * 16 * sd, Q.small ? 14 : 40); });
}
[[0, 1.7], [0.32, 1.25], [-0.3, 0.95]].forEach(function (q, i) { var p = Q.p(Q.R.R + 90 + i * 14, Math.PI + q[0]); hvnKit(Q.G, "pyramid", p.x, p.z, 0, q[1], { solid: false }); });
Q.kit("obelisk", 16, 0.35, 1.3);
Q.kit("obelisk", 16, -0.35, 1.3);
for (var i = 0; i < 7; i++) {
var r = Q.R.R - 18 - i * 12;
if (r < 26)
break;
[12 / r, -12 / r].forEach(function (ph) { var p = Q.p(r, ph); Q0obelisk(Q.G, p.x, p.z); Q.list.push({ x: p.x, z: p.z, r: 0.9 }); });
}
Q.around(function (r, ph, i) { if (i % 4 === 0)
hvnField(Q, r, ph, 10, 10, 0xD8B850);
else if (i % 2)
Q.tree("palm", r, ph, 1.1);
else
Q.kit("reeds", r, ph, 1.4, { solid: false }); }, 16);
Q.flowers([0x3A8AD8, 0xFFFFFF, 0xF4D040], 350, 0.18);
Q.road(hvnM(0xD8C08A));
},
function (Q) {
var reed = hvnM(0xC8B070), green = hvnM(0x4E8A3A), brick = hvnM(0xD8BC88);
Q.kit("ziggurat", 0, 0, 2.1, { solid: "box", tint: 0xD8BC88, tk: 0.3 });
[0.4, 0.4 + Math.PI / 2, 0.4 + Math.PI, 0.4 - Math.PI / 2].forEach(function (ph) {
var a = Q.p(Q.R.R * 0.55, ph), b = Q.p(30, ph);
hvnStrip(Q.G, a.x, a.z, b.x, b.z, 3, hvnWaterMat(0x3A8AA8), 0.17);
Q.kit("reflectpool", Q.R.R * 0.55, ph, 1.0, { solid: false });
});
for (var i = 0; i < 8; i++) {
var p = Q.p(Q.R.R * 0.72, i * Math.PI / 4 + 0.2), hg = new THREE.Group();
hg.position.set(p.x, 0, p.z);
hg.rotation.y = Q.face(p.x, p.z) + Math.PI / 2;
Q.G.add(hg);
var arch = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 9, 12, 1, false, 0, Math.PI), reed);
arch.rotation.z = Math.PI / 2;
arch.rotation.y = Math.PI / 2;
arch.position.y = 0;
hg.add(arch);
hvnBox(hg, 6, 4, 0.3, brick, 0, 0.2, 4.5);
Q.list.push({ x: p.x, z: p.z, r: 4.6 });
}
Q.around(function (r, ph, i) { if (i % 3 === 0)
Q.kit("reeds", r, ph, 1.4, { solid: false });
else
Q.tree("palm", r, ph, 1.15); if (i % 6 === 0)
Q.kit("brazier", r, ph + 0.05, 1.3); }, 14);
Q.flowers([0xFFFFFF, 0xF4D040, 0x6A8AD8], 350, 0.18);
Q.road(hvnM(0xC8A878), 8);
},
function (Q) {
Q.kit("reflectpool", 0, 0, 1.6, { solid: false });
Q.kit("plinth", 16, Math.PI, 1.6, { tint: 0xE8DCC0 });
Q.kit("brazier", 16, Math.PI, 1.6, { y: 1.6, solid: false });
[0, Math.PI / 2, Math.PI, -Math.PI / 2].forEach(function (ph) {
var a = Q.p(12, ph + 0.4), b = Q.p(Q.R.R - 14, ph + 0.4);
hvnStrip(Q.G, a.x, a.z, b.x, b.z, 3, hvnWaterMat(0x3A8AB0), 0.17);
for (var r = 20; r < Q.R.R - 16; r += 12) {
var p1 = Q.p(r, ph + 0.4 + 5 / r), p2 = Q.p(r, ph + 0.4 - 5 / r);
if (Q.clear(p1.x, p1.z, 0))
Q.tree("cypress", r, ph + 0.4 + 5 / r, 1.0);
if (Q.clear(p2.x, p2.z, 0))
Q.tree("cypress", r, ph + 0.4 - 5 / r, 1.0);
}
});
Q.around(function (r, ph, i) { if (i % 2)
Q.kit("flowerbed", r, ph, 1.2, { solid: false, attrs: { c: 0xC0303A } });
else if (i % 3 === 0)
Q.kit("tierfountain", r, ph, 0.8); }, 18);
Q.flowers([0xC0303A, 0xE85A6A, 0xFFFFFF, 0xF4D040], 900);
Q.road(hvnM(0xE6D8B8));
},
function (Q) {
Q.kit("pond", 0, 0, 2.6, { solid: "circle" });
for (var l = 0; l < 16; l++) {
var t = l / 16 * Math.PI * 2;
hvnSph(Q.G, 0.6, hvnM(l % 2 ? 0xF4A8C4 : 0xFFFFFF), Math.cos(t) * 7, 0.4, Math.sin(t) * 6, 0.5);
}
var kp = Q.p(34, Math.PI), kt = hvnTree(Q.G, "apple", kp.x, kp.z, 2.4);
kt.traverse(function (m) { if (m.isMesh && m.material === hvnM(0xC8302A))
m.material = hvnM(0xE8B830, { phong: 100, e: 0x6A4A10, ei: 0.4 }); });
Q.list.push({ x: kp.x, z: kp.z, r: 1.2 });
Q.around(function (r, ph, i) { if (i % 2)
Q.kit("diyas", r, ph, 1.4, { solid: false });
else
Q.tree("palm", r, ph, 1.1); if (i % 5 === 0) {
var fa = ph + 0.04 + R.inA;
if (Q.clear(Math.cos(fa) * r, Math.sin(fa) * r, 12))
Q.kit("prayerflags", r, ph + 0.04, 1.2, { solid: false });
} }, 13);
Q.flowers([0xF4A020, 0xE84A2A, 0xF4D040, 0xFFFFFF], 900);
Q.road(hvnM(0xE8C878), 8);
},
function (Q) {
Q.kit("paifang", Q.R.R - 12, 0, 2.0, { solid: false });
Q.kit("koipond", 0, 0, 2.6, { solid: "circle" });
Q.kit("moongate", 26, Math.PI, 1.4);
for (var l = 0; l < 12; l++) {
var t = l / 12 * Math.PI * 2;
hvnSph(Q.G, 0.5, hvnM(l % 2 ? 0xF4B8C8 : 0xFFFFFF), Math.cos(t) * 9, 0.35, Math.sin(t) * 8, 0.5);
}
var pg = Q.p(Math.max(40, Q.R.r0 - 8), Math.PI * 0.65);
for (var k = 0; k < (Q.small ? 6 : 14); k++) {
var a = k * 2.4, rr = 4 + Math.sqrt(k) * 5, x = pg.x + Math.cos(a) * rr, z = pg.z + Math.sin(a) * rr;
if (!Q.clear(x, z, 0))
continue;
var tr = hvnTree(Q.G, "apple", x, z, 1.0);
tr.traverse(function (m) { if (m.isMesh && m.material === hvnM(0x5A9A3A))
m.material = hvnM(0xF2B8C8);
else if (m.isMesh && m.material === hvnM(0xC8302A))
m.material = hvnM(0xF0A070); });
Q.list.push({ x: x, z: z, r: 0.5 });
}
Q.around(function (r, ph, i) {
if (i % 4 === 0) {
var p = Q.p(r, ph), cg = new THREE.Group();
cg.position.set(p.x, 0, p.z);
Q.G.add(cg);
hvnCyl(cg, 0.05, 0.05, 1.6, hvnM(0x2A2826), 0, 0.8, 0, 5);
hvnSph(cg, 0.5, hvnM(0xFFFFFF), 0, 1.9, 0, 0.7);
hvnSph(cg, 0.18, hvnM(0xC8302A), 0.2, 2.5, 0);
hvnCyl(cg, 0.06, 0.06, 0.9, hvnM(0xFFFFFF), 0, 2.3, 0, 5);
}
else if (i % 3 === 0)
Q.kit("pine", r, ph, 1.1);
else if (i % 3 === 1)
Q.kit("lunarlanterns", r, ph, 1.1, { solid: false });
else
Q.kit("bonsai", r, ph, 1.6);
}, 13);
Q.flowers([0xF2B8C8, 0xFFFFFF, 0xE8C040], 600);
Q.road(hvnM(0xB8B0A0));
},
function (Q) {
for (var r = Q.R.R - 8; r > 24; r -= 12)
Q.kit("torii", r, 0, 1.3, { solid: false, tint: 0xC0392B, tk: 0.3 });
var a = Q.p(Q.R.R + 20, Math.PI * 0.25), b = Q.p(Q.R.R + 20, -Math.PI * 0.75);
hvnStrip(Q.G, a.x, a.z, b.x, b.z, 10, hvnWaterMat(0x3A7AAA), 0.17);
Q.kit("zengarden", 0, 0, 1.6, { solid: false });
hvnRiceFields(Q, Q.R.R - 30, Math.PI * 0.6, Q.small ? 3 : 6);
var cp = Q.p(Q.R.R - 18, Math.PI), cave = new THREE.Group();
cave.position.set(cp.x, 0, cp.z);
cave.rotation.y = Q.face(cp.x, cp.z);
Q.G.add(cave);
var rock = hvnM(0x6A665E);
hvnSph(cave, 9, rock, 0, 2, -2, 0.8);
hvnSph(cave, 6, rock, -6, 1, 1, 0.9);
hvnSph(cave, 6, rock, 6, 1, 1, 0.9);
hvnBox(cave, 4, 6, 1, hvnM(0x1A1612), 0, 3, 4.6);
var rope = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.32, 8, 20, Math.PI), hvnM(0xD8C890));
rope.position.set(0, 5.4, 5.2);
rope.rotation.z = Math.PI;
rope.userData.hvnMine = true;
cave.add(rope);
for (var z = 0; z < 5; z++)
hvnBox(cave, 0.3, 1.0, 0.05, hvnM(0xFFFFFF), -2.4 + z * 1.2, 4.4, 5.3);
Q.list.push({ x: cp.x, z: cp.z, r: 9 });
Q.around(function (r, ph, i) { if (i % 3 === 2)
Q.kit("lantern", r, ph, 1.6);
else
Q.tree("sakura", r, ph, 1.1); }, 12);
Q.flowers([0xF6C8D6, 0xFFFFFF, 0xF0B0C6], 900, 0.16);
},
function (Q) {
Q.kit("standingstones", 0, 0, 1.3, { solid: false });
var mounds = 0;
Q.around(function (r, ph, i) { if (i % 5 === 2 && mounds < (Q.small ? 2 : 5)) {
var p = Q.p(r, ph);
if (Q.clear(p.x, p.z, 8)) {
hvnMound(Q, r, ph, 0.9);
mounds++;
return;
}
} Q.tree("apple", r, ph, 1.0 + ((i * 5) % 3) * 0.12); }, 13);
Q.flowers([0xF4E070, 0xFFFFFF, 0xE8A0C0, 0xB898E0], 1100);
},
function (Q) {
Q.kit("pond", 0, 0, 3.2, { solid: "circle" });
Q.kit("cauldron", 22, Math.PI, 2.4);
Q.kit("mistbank", 30, Math.PI * 0.5, 1, { solid: false });
Q.around(function (r, ph, i) { if (i % 3 === 2)
Q.kit("runestone", r, ph, 1.0);
else
Q.kit("tree", r, ph, 1.2); }, 14);
Q.flowers([0xFFFFFF, 0xA8C8F0], 500, 0.18);
},
function (Q) {
for (var i = 0; i < 14; i++)
Q.kit("tree", 30, i / 14 * Math.PI * 2 + 0.2, 1.6);
Q.kit("brazier", 0, 0, 1.6);
for (var j = 0; j < 6; j++) {
var p = Q.p(16, j / 6 * Math.PI * 2);
hvnCyl(Q.G, 0.45, 0.5, 5, hvnM(0x6A4A30), p.x, 2.5, p.z, 8);
hvnSph(Q.G, 0.5, hvnM(0xD8E8A0), p.x, 5.3, p.z);
Q.list.push({ x: p.x, z: p.z, r: 0.6 });
}
Q.around(function (r, ph, i) { Q.kit("tree", r, ph, 1.3); }, 14);
Q.flowers([0xFFFFFF, 0xF4E070], 500, 0.18);
},
function (Q) {
hvnWorldTree(Q.G, 0, 0, 0.9);
Q.list.push({ x: 0, z: 0, r: 3.6 });
Q.kit("brazier", 24, Math.PI, 1.4);
var rb = wRand(5);
for (var k = 0; k < (Q.small ? 8 : 20); k++) {
var a = rb() * Math.PI * 2, r = 6 + rb() * 12;
hvnSph(Q.G, 0.35, hvnM(k % 3 ? 0xFFFFFF : 0x8A6A4A), Math.cos(a) * r, 28 + rb() * 8, Math.sin(a) * r, 0.6);
}
Q.around(function (r, ph, i) { Q.tree("birch", r, ph, 1.0 + ((i * 7) % 3) * 0.15); }, 10);
Q.flowers([0x4A7AD8, 0xFFFFFF, 0xF4E070, 0xC83A3A], 900);
},
function (Q) {
var a = Q.p(Q.R.R + 20, Math.PI * 0.6), b = Q.p(Q.R.R + 20, -Math.PI * 0.4);
hvnStrip(Q.G, a.x, a.z, b.x, b.z, 12, hvnWaterMat(0x5A8A6A), 0.17);
for (var j = 0; j < 8; j++) {
var p = Q.p(14, j / 8 * Math.PI * 2);
hvnCyl(Q.G, 0.4, 0.45, 4.2, hvnM(0x7A4A28), p.x, 2.1, p.z, 8);
hvnSph(Q.G, 0.55, hvnM(0xE8E0D0), p.x, 4.5, p.z);
Q.list.push({ x: p.x, z: p.z, r: 0.55 });
}
Q.around(function (r, ph, i) { Q.tree("palm", r, ph, 1.15); }, 12);
Q.flowers([0xF4D040, 0xE86A2A, 0xFFFFFF], 600);
},
function (Q) {
Q.kit("plinth", 0, 0, 2.2, { tint: 0xD8B048, tk: 0.7 });
var st = new THREE.Group();
st.position.set(0, 2.4, 0);
Q.G.add(st);
hvnBox(st, 1.2, 0.25, 0.6, hvnM(0xD8B048, { phong: 90 }), 0, 0.9, 0);
hvnCyl(st, 0.25, 0.35, 0.7, hvnM(0xD8B048, { phong: 90 }), 0, 0.4, 0, 10);
Q.around(function (r, ph, i) { if (i % 3 === 0)
Q.kit("bannerpole", r, ph, 1.1, { attrs: { c: [0xD8A020, 0x2E8A3A, 0xC0302A][i % 3] } });
else
Q.tree("palm", r, ph, 1.1); }, 12);
Q.flowers([0xF4D040, 0xE86A2A], 500);
},
function (Q) {
hvnCyl(Q.G, 0.35, 0.4, 8, hvnM(0xC8302A), 0, 4, 0, 10);
for (var b = 0; b < 4; b++)
hvnCyl(Q.G, 0.42, 0.42, 0.4, hvnM([0xE8D040, 0x2E6AB8, 0x2E8A3A, 0xFFFFFF][b]), 0, 1.5 + b * 1.6, 0, 10);
Q.list.push({ x: 0, z: 0, r: 0.6 });
var roof = new THREE.Mesh(hvnGeo("vroof", function () { return new THREE.ConeGeometry(9, 3, 16, 1, true); }), hvnM(0x8A6A3A, { ds: true }));
roof.position.y = 8.5;
Q.G.add(roof);
for (var k = 0; k < 8; k++) {
var t = k / 8 * Math.PI * 2;
hvnCyl(Q.G, 0.2, 0.2, 7, hvnM(0x6A4A2A), Math.cos(t) * 8, 3.5, Math.sin(t) * 8, 8);
Q.list.push({ x: Math.cos(t) * 8, z: Math.sin(t) * 8, r: 0.3 });
}
Q.kit("sigil", 0, 0, 1.6, { solid: false, y: 0.06 });
Q.around(function (r, ph, i) { Q.tree("palm", r, ph, 1.1); }, 12);
Q.flowers([0xE8D040, 0xC8302A, 0xFFFFFF], 500);
},
function (Q) {
Q.kit("ziggurat", 0, 0, 1.6, { solid: "box", tint: 0xC8B890, tk: 0.3 });
[Math.PI / 2, -Math.PI / 2, Math.PI].forEach(function (ph) { var a = Q.p(Q.R.R + 10, ph), b = Q.p(30, ph); hvnStrip(Q.G, a.x, a.z, b.x, b.z, 5, hvnWaterMat(0x3A7A6A), 0.17); });
Q.around(function (r, ph, i) { if (i % 3 === 0)
Q.tree("palm", r, ph, 1.1);
else if (i % 3 === 1)
Q.kit("flowerbed", r, ph, 1.2, { solid: false, attrs: { c: 0xF0A020 } });
else
Q.kit("cornstalk", r, ph, 1.4, { solid: false }); }, 11);
Q.flowers([0xF0A020, 0xE86A10, 0xF4D040], 1000);
Q.road(hvnM(0xB8A888));
},
function (Q) {
hvnWorldTree(Q.G, 0, 0, 0.95);
Q.list.push({ x: 0, z: 0, r: 3.6 });
for (var r = Q.R.R - 12; r > 26; r -= 14) {
Q.kit("obelisk", r, 10 / r, 0.45, { tint: 0xB8B098, tk: 0.6 });
Q.kit("obelisk", r, -10 / r, 0.45, { tint: 0xB8B098, tk: 0.6 });
}
var cn = Q.p(30, Math.PI * 0.7);
hvnCyl(Q.G, 9, 9.4, 1.2, hvnM(0x9A9480), cn.x, 0.5, cn.z, 28);
hvnCyl(Q.G, 8, 8, 0.1, hvnWaterMat(0x2A7A8A), cn.x, 1.0, cn.z, 28);
Q.list.push({ x: cn.x, z: cn.z, r: 9.4 });
Q.around(function (r, ph, i) { (i % 2 ? Q.tree("palm", r, ph, 1.3) : Q.kit("tree", r, ph, 1.3)); }, 10);
Q.flowers([0xE84A8A, 0xF4A020, 0xFFFFFF], 600);
},
function (Q) {
var sd = new THREE.Mesh(hvnGeo("sun", function () { return new THREE.CircleGeometry(4, 32); }), hvnM(0xE8B830, { phong: 100, e: 0x6A4A10, ei: 0.5 }));
var p0 = Q.p(6, Math.PI);
sd.position.set(p0.x, 7, p0.z);
sd.rotation.y = Math.atan2(-p0.x, -p0.z);
Q.G.add(sd);
Q.kit("plinth", 6, Math.PI, 2.2, { tint: 0x8A8478 });
Q.around(function (r, ph, i) { if (i % 2)
Q.kit("rock", r, ph, 1.2); }, 14);
Q.flowers([0xE84A2A, 0xF4D040, 0xB868D8], 500);
},
function (Q) {
for (var j = 0; j < 6; j++) {
var p = Q.p(12, j / 6 * Math.PI * 2), g = new THREE.Group();
g.position.set(p.x, 0, p.z);
g.rotation.y = Math.atan2(-p.x, -p.z);
Q.G.add(g);
hvnCyl(g, 0.6, 0.7, 3.6, hvnM(0x6A4426), 0, 1.8, 0, 10);
hvnBox(g, 0.9, 0.25, 0.1, hvnM(0xF0E8D8), 0, 2.6, 0.62);
hvnBox(g, 0.7, 0.2, 0.1, hvnM(0x2A1A10), 0, 2.0, 0.62);
Q.list.push({ x: p.x, z: p.z, r: 0.8 });
}
for (var c = 0; c < 4; c++)
hvnCanoe(Q, Q.R.R - 9, 0.5 + c * 0.25);
Q.around(function (r, ph, i) { Q.tree("palm", r, ph, 1.2); }, 11);
Q.flowers([0xE84A6A, 0xF4D040, 0xFFFFFF], 600);
},
function (Q) {
Q.kit("obsidianspire", 0, 0, 1.6, { solid: "circle" });
Q.around(function (r, ph, i) { if (i % 2)
Q.kit("obsidianspire", r, ph, 0.8);
else
Q.kit("spiritfire", r, ph, 1.2, { solid: false }); }, 14);
Q.road(hvnM(0x4A3E54));
},
function (d) {
var t = d.trad || "Greek", rc = null;
(d.icons || []).forEach(function (x) { var p = String(x).split(":"); if (p[0] === "robe" && typeof ICONCOL !== "undefined" && ICONCOL[p[1]] !== undefined)
rc = ICONCOL[p[1]]; });
if (rc === null)
rc = (typeof TRAD_ROBE !== "undefined" && TRAD_ROBE[t]) || 0xC9A868;
var base = (typeof PRECINCT !== "undefined" && PRECINCT[t] && PRECINCT[t].trim) || 0xE8E4DA;
var stone = (t === "Demonology" || t === "Qliphothic" || t === "Adversarial") ? 0x4A4048 : t === "Egyptian" || t === "Mesopotamian" ? 0xE6D2A8 : 0xEDE8DC;
var roof = blend(shade(rc, -0.15), base, 0.25);
if (stone !== 0x4A4048)
roof = blend(roof, 0xD8B048, 0.45);
return { c: blend(stone, rc, 0.22), rc: roof };
},
function (R, P, G, list) {
var d = DEITY[P.key];
if (!d)
return;
var arch = hvnPalaceArch(R, d), s = hvnPalaceScale(arch, R.D.fit), col = hvnPalaceCols(d), lx = P.x - R.x, lz = P.z - R.z;
var spec = { id: "hvn_pal_" + P.key, archetype: arch, label: (typeof tlHouseName === "function" ? tlHouseName(d) : d.name + "'s house"), attrs: { s: s, c: col.c, rc: col.rc }, x: 0, z: 0, rot: 0,
solid: false, detail: hvnLite() ? 2 : 3, nights: [], city: true, hub: true, deity: P.key, deityTemple: true, templerow: true };
var g = null;
try {
g = build(spec);
}
catch (e) {
if (window.console)
console.warn("[heavens] palace", P.key, e);
}
if (g) {
g.position.set(lx, 0, lz);
g.rotation.y = P.ry;
G.add(g);
}
var K = KIT[arch], hw = K.size[0] * s / 2, hd = K.size[2] * s / 2;
list.push({ x: lx, z: lz, hw: hw, hd: hd, rot: P.ry, h: K.size[1] * s });
var egypt = d.trad === "Egyptian";
if (egypt) {
var pg = new THREE.Group();
pg.position.set(lx, 0, lz);
pg.rotation.y = P.ry;
G.add(pg);
var sand = hvnM(0xE2CC98), band = hvnM(0x2E6A9A), tw = Math.max(5, hw * 0.6);
[-1, 1].forEach(function (sd) {
var ox = sd * (tw / 2 + 2.6), oz = hd + 3, t = new THREE.Mesh(hvnGeo("pylon", function () { return new THREE.CylinderGeometry(0.5 * 0.72, 0.5, 1, 4, 1); }), sand);
t.rotation.y = Math.PI / 4;
t.scale.set(tw * 1.414, 15, 5 * 1.414);
t.position.set(ox, 7.5, oz);
pg.add(t);
hvnBox(pg, tw * 0.8, 0.6, 4, band, ox, 15.2, oz);
var c = Math.cos(P.ry), sn = Math.sin(P.ry);
list.push({ x: lx + ox * c + oz * sn, z: lz - ox * sn + oz * c, hw: tw / 2, hd: 2.6, rot: P.ry });
Q0obelisk(pg, sd * (tw + 6), hd + 9);
var bx = sd * (tw + 6), bz = hd + 9;
list.push({ x: lx + bx * c + bz * sn, z: lz - bx * sn + bz * c, r: 0.9 });
});
}
var c2 = Math.cos(P.ry), s2 = Math.sin(P.ry), dl = { x: 0, z: hd + 0.7 };
try {
if (typeof doorWorld === "function") {
var Dw = doorWorld({ archetype: arch, attrs: { s: s }, x: 0, z: 0, rot: 0 });
if (Dw && isFinite(Dw.x) && isFinite(Dw.z)) {
dl = { x: Dw.x + Dw.out.x * 0.7, z: Dw.z + Dw.out.z * 0.7 };
}
}
}
catch (e) { }
var dx = P.x + dl.x * c2 + dl.z * s2, dz = P.z - dl.x * s2 + dl.z * c2;
var D = { src: "w", world: HVN.key, x: dx, z: dz, out: { x: s2, z: c2 }, theme: null, arch: arch, name: spec.label, doors: "the palace doors", y: 0, id: "evb_w_heavens_" + P.key, hvn: { key: P.key, s: s, ry: P.ry, bx: P.x, bz: P.z, c: col.c, rc: col.rc, realm: R.k } };
if (typeof EVB_WD !== "undefined") {
var L = EVB_WD[HVN.key] || (EVB_WD[HVN.key] = []);
if (!L.some(function (q) { return q.id === D.id; }))
L.push(D);
}
P.door = D;
var fz = hd + (egypt ? 12 : 3.5), fx = hw * 0.5 + 2.5;
P.front = { x: P.x + fz * s2 + fx * c2, z: P.z + fz * c2 - fx * s2 };
},
function (p, x, z) {
var o = new THREE.Mesh(hvnGeo("obel", function () { return new THREE.CylinderGeometry(0.35, 0.7, 1, 4, 1); }), hvnM(0xE8D4A0));
o.scale.set(1.414, 11, 1.414);
o.rotation.y = Math.PI / 4;
o.position.set(x, 5.5, z);
p.add(o);
var tip = new THREE.Mesh(hvnGeo("obtip", function () { return new THREE.ConeGeometry(0.35, 1, 4); }), hvnM(0xD8B048, { phong: 90 }));
tip.scale.set(1.414, 1.2, 1.414);
tip.rotation.y = Math.PI / 4;
tip.position.set(x, 11.6, z);
p.add(tip);
return o;
},
function (R) {
var G = new THREE.Group();
G.position.set(R.x, 0, R.z);
G.name = "heavens " + R.k;
HVN.G.add(G);
var list = [], B = { R: R, G: G, list: list, figs: {} };
HVN.curSolids = list;
var Qh = hvnHands(R, G, list);
try {
(HVN_SET[R.D.set] || function () { })(Qh);
}
catch (e) {
if (window.console)
console.warn("[heavens] set", R.k, e);
}
if (!Qh.roaded)
try {
Qh.road(hvnM(0xD8CCA8), 6);
}
catch (e) { }
R.pal.forEach(function (P) { try {
hvnPalace(R, P, G, list);
}
catch (e) {
if (window.console)
console.warn("[heavens] palace", P.key, e);
} });
HVN.curSolids = null;
list.forEach(function (s) { s.x += R.x; s.z += R.z; });
if (Qh.bridge) {
var Bq = Qh.bridge;
B.bridge = { x0: Bq.x0 + R.x, z0: Bq.z0 + R.z, x1: Bq.x1 + R.x, z1: Bq.z1 + R.z, w: Bq.w, H: Bq.H, L: Bq.L };
}
G.traverse(function (o) { o.raycast = function () { }; });
HVN.builds++;
return B;
},
function (B) {
if (!B)
return;
Object.keys(B.figs).forEach(function (k) { hvnFigDrop(B, k); });
if (B.G.parent)
B.G.parent.remove(B.G);
B.G.traverse(function (m) {
try {
var g = m.geometry;
if (g && g.dispose && !(g.userData && g.userData.shared) && !(typeof FIGGEO !== "undefined" && typeof ldShared === "function" && ldShared(g)))
g.dispose();
var ms = Array.isArray(m.material) ? m.material : (m.material ? [m.material] : []);
ms.forEach(function (mt) { if (mt && mt.userData && mt.userData.hvnMine && mt.dispose)
mt.dispose(); });
}
catch (e) { }
});
if (typeof EVB_WD !== "undefined" && EVB_WD[HVN.key])
EVB_WD[HVN.key] = EVB_WD[HVN.key].filter(function (D) { return !(D.hvn && D.hvn.realm === B.R.k); });
HVN.drops++;
},
function (B, P) {
var d = DEITY[P.key], g = null;
if (!d || !P.front)
return;
try {
if (d.dragon && typeof otmDragonFigure === "function" && typeof buildDragon === "function") {
g = otmDragonFigure(P.key, false);
}
else {
var sp = { id: "hvn_fig_" + P.key, archetype: "deity", deity: P.key, attrs: {}, nights: [], city: true, solid: false, detail: hvnLite() ? 2 : 3, name: d.name, label: d.name };
if (typeof lookOf === "function" && typeof deityLook === "function") {
lookOf(sp);
deityLook(sp, d);
}
g = build(sp);
}
}
catch (e) {
g = null;
}
if (!g)
return;
g.position.set(P.front.x - B.R.x, 0, P.front.z - B.R.z);
g.rotation.y = P.ry;
if (d.dragon)
g.scale.multiplyScalar(1.4);
g.traverse(function (o) { o.raycast = function () { }; });
B.G.add(g);
B.figs[P.key] = { g: g, P: P };
},
function (B, k) {
var F = B.figs[k];
if (!F)
return;
delete B.figs[k];
if (F.g.parent)
F.g.parent.remove(F.g);
F.g.traverse(function (m) { var g = m.geometry; if (!g || !g.dispose || (g.userData && g.userData.shared))
return; if (typeof FIGGEO !== "undefined" && typeof ldShared === "function" && ldShared(g))
return; try {
g.dispose();
}
catch (e) { } });
},
function (G) {
HVN.G = G;
HVN.lite = hvnLite();
HVN.solids = [];
HVN.spots = [];
HVN.cur = {};
HVN.t = 0;
if (typeof EVB_WD !== "undefined")
EVB_WD[HVN.key] = [];
var Rs = hvnLayout();
HVN.lp = null;
hvnLandBuild(G);
hvnRoadsBuild(G);
hvnWoodsBuild(G);
hvnCourt(G);
var gold = hvnM(0xE0BC58, { phong: 60 });
Rs.forEach(function (R) {
var a = R.inA, ex = R.x + Math.cos(a) * R.R, ez = R.z + Math.sin(a) * R.R;
var sp = new THREE.Group();
var sx = ex + Math.cos(a) * 6 + Math.cos(a + Math.PI / 2) * 7, sz = ez + Math.sin(a) * 6 + Math.sin(a + Math.PI / 2) * 7;
sp.position.set(sx, hvnLandH(sx, sz), sz);
sp.rotation.y = Math.atan2(Math.cos(a), Math.sin(a));
G.add(sp);
hvnCyl(sp, 0.18, 0.18, 9, gold, 0, 4.5, 0, 10);
hvnSph(sp, 0.4, gold, 0, 9.2, 0);
var sg = wSign([R.D.name, R.D.sub], 6, 2.2, R.k === "shadow" ? "#2A2430" : "#F6F0E0", R.k === "shadow" ? "#D8C8E8" : "#5A4010");
sg.position.set(0, 7, 0.1);
sg.userData.hvnMine = true;
sp.add(sg);
HVN.solids.push({ x: sx, z: sz, r: 0.4 });
HVN.spots.push({ x: sx, z: sz, r: 3.2, name: R.D.name, txt: "✨ <b>" + esc(R.D.name) + "</b> · <b>press E</b> to read the standard", fn: function () { hvnRealmCard(R); } });
var pl = new THREE.Mesh(hvnGeo("pill", function () { return new THREE.CylinderGeometry(2.4, 3.6, 220, 16, 1, true); }), hvnM(R.k === "shadow" ? 0x8A6AB8 : 0xFFF0C0, { basic: true, op: 0.14, fog: false }));
pl.position.set(R.x, 110, R.z);
G.add(pl);
});
var my = new THREE.PointLight(0xFFF4E0, 0.5, 30, 2);
G.add(my);
HVN.my = my;
G.traverse(function (o) { o.raycast = function () { }; });
HVN.built = true;
},
function (G) {
var C = new THREE.Group();
G.add(C);
HVN.court = C;
var marble = hvnGroundMat("marble");
hvnDisc(C, 62, marble, 0, 0, 0.1);
var gold = hvnM(0xD8B048, { phong: 90 }), white = hvnM(0xD0C8BA, { phong: 30 });
var gg = new THREE.Group();
gg.position.set(0, 0, 52);
C.add(gg);
[-6, 6].forEach(function (x) { hvnBox(gg, 1.6, 9, 1.6, white, x, 4.5, 0); hvnBox(gg, 2.1, 0.6, 2.1, gold, x, 9.3, 0); HVN.solids.push({ x: x, z: 52, r: 1.1 }); });
var arc = new THREE.Mesh(new THREE.TorusGeometry(6, 0.5, 10, 32, Math.PI), gold);
arc.position.set(0, 9.6, 0);
arc.userData.hvnMine = true;
gg.add(arc);
var gs = wSign(["THE HEAVENS", "the Court of Heaven"], 7, 1.6, "#F6F0E0", "#6A4A10");
gs.position.set(0, 12.6, 0);
gs.userData.hvnMine = true;
gg.add(gs);
HVN.spots.push({ x: 0, z: 55, r: 3.4, name: "The golden gate", txt: "☁️ <b>The golden gate</b> · <b>press E</b> to go back down the stair to Temple Row", fn: function () { hvnHome(); } });
var silver = hvnM(0xD8DCE8, { phong: 120, e: 0x8890A8, ei: 0.25 }), ml = new THREE.Group();
ml.position.set(0, 0, -46);
C.add(ml);
hvnCyl(ml, 5, 5.4, 0.3, silver, 0, 0.25, 0, 32);
[-3.4, 3.4].forEach(function (x) { hvnBox(ml, 0.9, 6.4, 0.9, silver, x, 3.2, -3); HVN.solids.push({ x: x, z: -49, r: 0.7 }); });
var marc = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.32, 10, 32, Math.PI), silver);
marc.position.set(0, 6.4, -3);
marc.userData.hvnMine = true;
ml.add(marc);
var moon = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.22, 8, 24, Math.PI * 1.3), hvnM(0xF0F2FA, { e: 0xC8D0F0, ei: 0.6 }));
moon.position.set(0, 8.4, -3);
moon.rotation.z = 0.6;
moon.userData.hvnMine = true;
ml.add(moon);
HVN.spots.push({ x: 0, z: -48.5, r: 2.6, only: function () { return !!HVN.moon; }, name: "The silver gate", txt: "🌙 <b>The silver gate</b> · <b>press E</b> to go back down the moon stair to the Temple", fn: function () { hvnMoonHome(); } });
hvnCyl(C, 7, 7.6, 1.0, white, 0, 0.5, 0, 32);
hvnCyl(C, 6.4, 6.4, 0.2, hvnWaterMat(0x7AC8F0), 0, 1.02, 0, 32);
hvnCyl(C, 1.2, 1.6, 3.6, gold, 0, 2.2, 0, 16);
var col = new THREE.Mesh(hvnGeo("lcol", function () { return new THREE.CylinderGeometry(0.6, 1.2, 14, 16, 1, true); }), hvnM(0xFFF2C0, { basic: true, op: 0.4 }));
col.position.set(0, 10, 0);
C.add(col);
HVN.col = col;
HVN.solids.push({ x: 0, z: 0, r: 7.8 });
var hs = new THREE.Group();
hs.position.set(0, 0, 24);
C.add(hs);
hvnBox(hs, 4, 2.6, 0.8, white, 0, 1.3, 0);
var hsg = wSign(["THE HERALD'S STONE", "press E: every country of heaven"], 3.6, 1.2, "#F6F0E0", "#5A4010");
hsg.position.set(0, 1.5, 0.42);
hsg.userData.hvnMine = true;
hs.add(hsg);
HVN.solids.push({ x: 0, z: 24, hw: 2.2, hd: 0.6, rot: 0 });
HVN.spots.push({ x: 0, z: 26, r: 3, name: "The Herald's stone", txt: "📜 <b>The Herald's stone</b> · <b>press E</b> for every country of heaven, and the way to each", fn: function () { hvnHeraldCard(); } });
var nc = HVN.lite ? 24 : 40;
for (var i = 0; i < nc; i++) {
var a = i / nc * Math.PI * 2;
var x = Math.cos(a) * 60, z = Math.sin(a) * 60;
if (z > 44 && Math.abs(x) < 10)
continue;
if ((HVN.courtWays || []).some(function (w) { return Math.abs(hvnWrapA(a - w)) < 0.13; }))
continue;
hvnCyl(C, 0.7, 0.8, 8, white, x, 4, z, 12);
hvnBox(C, 1.8, 0.5, 1.8, gold, x, 8.2, z);
HVN.solids.push({ x: x, z: z, r: 0.85 });
}
for (var k = 0; k < (HVN.lite ? 6 : 12); k++) {
var t = k / (HVN.lite ? 6 : 12) * Math.PI * 2 + 0.13;
hvnTree(C, "cloud", Math.cos(t) * 40, Math.sin(t) * 40, 1.1);
}
},
function (x, z, feet) {
var L = { x: x, z: z }, B = HVN.box;
if (!B || L.x < B.x0 + 40 || L.x > B.x1 - 40 || L.z < B.z0 + 40 || L.z > B.z1 - 40)
return true;
if (hvnLandH(L.x, L.z) < -0.7 && hvnRoadDeck(L.x, L.z) === null)
return true;
if (worldSolidAt(HVN.solids, L.x, L.z, feet || 0))
return true;
if (hvnTreeAt(L.x, L.z))
return true;
for (var k in HVN.cur) {
if (worldSolidAt(HVN.cur[k].list, L.x, L.z, feet || 0))
return true;
}
return false;
},
function (x, z) {
var lx = x;
for (var k in HVN.cur) {
var b = HVN.cur[k].bridge;
if (!b)
continue;
var dx = b.x1 - b.x0, dz = b.z1 - b.z0, t = ((lx - b.x0) * dx + (z - b.z0) * dz) / (b.L * b.L);
if (t < 0 || t > 1)
continue;
var px = b.x0 + dx * t, pz = b.z0 + dz * t;
if (Math.hypot(lx - px, z - pz) < b.w / 2)
return Math.max(hvnLandH(lx, z), Math.sin(t * Math.PI) * b.H + 0.12);
}
var d = hvnRoadDeck(lx, z);
if (d !== null)
return d;
return Math.max(hvnLandH(lx, z), -0.7);
},
function (dt) {
HVN.t += dt;
HVN.ct -= dt;
if (!HVN.built)
return;
if (typeof INT !== "undefined" && INT) {
if (!HVN.wasIn) {
HVN.wasIn = true;
worldBanner(null);
worldPrompt(null);
HVN.near = null;
}
return;
}
HVN.wasIn = false;
if (typeof stars !== "undefined" && stars)
stars.visible = false;
var L = worldLocal();
if (HVN.my)
HVN.my.position.set(L.x, L.y + 1.5, L.z);
if (HVN.col)
HVN.col.material.opacity = 0.32 + 0.08 * Math.sin(HVN.t * 0.7);
if (HVN.ct <= 0) {
HVN.ct = 0.5;
var cap = HVN.lite ? 1 : 2, near = [];
HVN.realms.forEach(function (R) { var d = Math.hypot(L.x - R.x, L.z - R.z) - R.R, keep = HVN.cur[R.k] ? 320 : 200; if (d < keep)
near.push([d, R]); });
near.sort(function (a, b) { return a[0] - b[0]; });
var want = {};
near.slice(0, cap).forEach(function (q) { want[q[1].k] = q[1]; });
for (var k in HVN.cur) {
if (!want[k]) {
hvnDropRealm(HVN.cur[k]);
delete HVN.cur[k];
}
}
for (var k2 in want) {
if (!HVN.cur[k2]) {
try {
HVN.cur[k2] = hvnBuildRealm(want[k2]);
}
catch (e) {
if (window.console && !HVN.warned) {
HVN.warned = true;
console.warn("[heavens] build", e);
}
}
break;
}
}
var fcap = HVN.lite ? 4 : 10, fr = HVN.lite ? 42 : 60;
for (var k3 in HVN.cur) {
var B = HVN.cur[k3], list = [];
B.R.pal.forEach(function (P) { if (!P.front)
return; var d = Math.hypot(P.front.x - L.x, P.front.z - L.z); if (d < (B.figs[P.key] ? fr + 25 : fr))
list.push([d, P]); });
list.sort(function (a, b) { return a[0] - b[0]; });
var keepF = {};
list.slice(0, fcap).forEach(function (q) { keepF[q[1].key] = q[1]; });
Object.keys(B.figs).forEach(function (k4) { if (!keepF[k4])
hvnFigDrop(B, k4); });
for (var k5 in keepF) {
if (!B.figs[k5]) {
hvnFigBuild(B, keepF[k5]);
break;
}
}
}
hvnBannerNow(L);
}
if (WLD.card && WLD.card.style.display === "block") {
return;
}
var best = null, bd = 1e9;
HVN.spots.forEach(function (s) { if (s.only && !s.only())
return; var d = Math.hypot(s.x - L.x, s.z - L.z); if (d < s.r && d < bd) {
bd = d;
best = s;
} });
for (var k6 in HVN.cur) {
var B2 = HVN.cur[k6];
Object.keys(B2.figs).forEach(function (key) {
var P = B2.figs[key].P, d = Math.hypot(P.front.x - L.x, P.front.z - L.z);
if (d < 3 && d < bd) {
bd = d;
var nm = DEITY[key].name;
best = { key: "fig:" + key, txt: "✨ <b>" + esc(nm) + "</b> · <b>press E</b> to speak with them", fn: function () { hvnTalk(key); } };
}
});
}
if (best) {
if (HVN.near !== (best.key || best.name)) {
HVN.near = best.key || best.name;
worldPrompt(best.txt, best.fn);
}
}
else if (HVN.near) {
HVN.near = null;
worldPrompt(null);
}
},
function (L) {
if (typeof INT !== "undefined" && INT) {
worldBanner(null);
return;
}
var where = null;
HVN.realms.forEach(function (R) { if (Math.hypot(L.x - R.x, L.z - R.z) < R.R + 10)
where = R; });
HVN.inRealm = where ? where.k : null;
worldBanner(where ? "✨ <b>" + esc(where.D.name) + "</b> · " + esc(where.D.sub) : "☁️ <b>The Heavens</b> · the Court of Heaven and the golden roads to every country");
},
function () {
var E = HVN_SKY, k = HVN.inRealm;
if (k && HVN_LIGHT[k])
E = HVN_LIGHT[k];
var dim = k === "shadow" ? 1 : 0.75, low = new THREE.Color(E.low).lerp(new THREE.Color(E.top), 0.25).getHex(), fog = new THREE.Color(E.fog).multiplyScalar(k === "shadow" ? 1 : 0.9).getHex();
return { top: E.top, low: low, fog: fog, fogD: E.fogD, sun: E.sun * (k === "shadow" ? 1 : 0.85), sunCol: E.sunCol, sunDir: [0.3, 0.85, 0.4], hemi: E.hemi * dim, hemiCol: k === "shadow" ? E.hemiCol : new THREE.Color(E.hemiCol).lerp(new THREE.Color(E.top), 0.45).getHex(), hemiGround: k === "shadow" ? E.hemiGround : new THREE.Color(E.hemiGround).multiplyScalar(0.6).getHex(), stars: 0 };
},
function (key) {
var d = DEITY[key];
if (!d || typeof openTalk !== "function")
return;
var wk = "hvn:" + key, c = null, P = camera.position;
(store.characters || []).forEach(function (x) { if (x.wKey === wk)
c = x; });
if (!c) {
c = { id: (typeof uid === "function" ? uid() : "w" + Date.now()), wKey: wk, archetype: d.dragon ? "dragon" : "deity", name: d.name, aka: [], details: [], sessions: [store.session], awake: true, log: [],
x: P.x, z: P.z, primary: true, src: { name: "stated" }, role: null, shift: null, routine: null, home: null, work: null, anchor: { x: P.x, z: P.z }, born: "", doing: "here", visible: false, city: true, deity: key };
if (store.characters)
store.characters.push(c);
}
c.deity = key;
c.x = P.x;
c.z = P.z;
c.visible = false;
worldPrompt(null);
HVN.near = null;
openTalk(c);
},
function () {
var b = "", fns = {};
hvnLayout().forEach(function (R) { var id = "r_" + R.k; b += worldBtn(id, "✨ " + R.D.name, R.D.sub + " · " + R.keys.length + (R.keys.length === 1 ? " palace" : " palaces")); fns[id] = function () { worldCard(null); hvnTo(R); }; });
b += worldBtn("home", "☁️ Back down to Temple Row", "The stair, and the city");
fns.home = function () { worldCard(null); hvnHome(); };
worldCard(worldFacts("📜 The Herald's stone", "Every country of heaven, and the way to each", [["Palaces", hvnLayout().reduce(function (n, R) { return n + R.keys.length; }, 0) + " powers, each in their own"], ["How to go", "Walk the golden road, or choose below to be set down at a country's gate"]], ["Each power's palace has their own house inside it: the image, the candles, the offerings and the service. They stand before their door themselves; press E to speak with them."]) + b, fns);
},
function (opt) {
opt = opt || {};
camera.position.set(HVN.base, 1.72, 45);
yaw = 0;
pitch = 0;
HVN.ct = 0;
HVN.near = null;
HVN.moon = opt.at === "moonstair";
if (HVN.moon) {
camera.position.set(HVN.base, 1.72, -40);
yaw = Math.PI;
pitch = 0;
setStatus("🌙 <b>The Heavens.</b> The moon stair from the Temple's roof ends at its silver landing, on the north side of the Court of Heaven. The silver gate behind you leads back down to the Temple.");
return;
}
if (opt.palace) {
var R = null, P = null;
hvnLayout().forEach(function (q) { q.pal.forEach(function (p) { if (p.key === opt.palace) {
R = q;
P = p;
} }); });
if (R)
hvnTo(R);
}
else if (opt.realm && HVN.byTrad[opt.realm])
hvnTo(HVN.byTrad[opt.realm]);
setStatus("☁️ <b>The Heavens.</b> You come up the last of the stair through the golden gate into the Court of Heaven. A golden road runs out to every country of the powers, each as its own people tell it: the Herald's stone, just ahead, names them all.");
},
function () {
var b = "", fns = {};
if (WLD.on !== HVN.key && !hvnMay())
return;
if (WLD.on === HVN.key) {
b += worldBtn("herald", "📜 Every country of heaven", "Choose one and be set down at its gate");
fns.herald = function () { worldCard(null); hvnHeraldCard(); };
b += worldBtn("home", "☁️ Back down to Temple Row", "");
fns.home = function () { worldCard(null); hvnHome(); };
}
else {
b += worldBtn("go", "☁️ Go up to the Heavens", "Arrive in the Court of Heaven");
fns.go = function () { worldCard(null); hvnGo({}); };
}
worldCard(worldFacts("☁️ The Heavens", "The palaces of every power the Atlas knows", [["Where", "Up the Stair to the Heavens on Temple Row"], ["Countries", String(hvnLayout().length)]], ["Olympos, Asgard over Bifröst, the Field of Reeds, Takamagahara, Tír na nÓg, Ọ̀run, Svarga on Meru and the rest: each power in their own palace, in their own country, and you may speak with them."]) + b, fns);
},
function () {
var L = hvnLayout(), cur = Object.keys(HVN.cur).map(function (k) { var B = HVN.cur[k], m = 0; B.G.traverse(function (o) { if (o.isMesh)
m++; }); return { k: k, meshes: m, walls: B.list.length, figs: Object.keys(B.figs).length }; });
return { realms: L.length, palaces: L.reduce(function (n, R) { return n + R.pal.length; }, 0), RR: Math.round(HVN.RR), bound: Math.round(HVN.bound), built: HVN.built, cur: cur, doors: (typeof EVB_WD !== "undefined" && EVB_WD[HVN.key] || []).length, builds: HVN.builds, drops: HVN.drops,
sizes: L.map(function (R) { return R.k + ":" + R.keys.length + "/" + Math.round(R.R); }).join(" ") };
},
function () {
if (HVN.lp)
return HVN.lp;
var P = { peaks: [], seas: [], lakes: [], rivers: [], pads: [] };
HVN.realms.forEach(function (R) {
var F = HVN_LANDF[R.k] || {};
function at(ang, d) { var a = R.inA + ang; return { x: R.x + Math.cos(a) * (R.R + d), z: R.z + Math.sin(a) * (R.R + d) }; }
(F.peaks || []).forEach(function (q) { var p = at(q[0], q[1]); P.peaks.push({ x: p.x, z: p.z, h: q[2], r: q[3], cap: q[4], cone: !!q[5], k: R.k }); });
(F.seas || []).forEach(function (q) { var p = at(q[0], 60 + q[1]); P.seas.push({ x: p.x, z: p.z, r: q[1] + 40 }); });
(F.lakes || []).forEach(function (q) { var p = at(q[0], q[1] + q[2] * 0.5); P.lakes.push({ x: p.x, z: p.z, r: q[2] }); });
(F.pads || []).forEach(function (q) { var p = at(q[0], q[1]); P.pads.push({ x: p.x, z: p.z, r: q[2] }); });
(F.river || []).forEach(function (ang) { var a = R.inA + ang; P.rivers.push({ x0: R.x - Math.cos(a) * (R.R + 700), z0: R.z - Math.sin(a) * (R.R + 700), x1: R.x + Math.cos(a) * (R.R + 700), z1: R.z + Math.sin(a) * (R.R + 700), w: 16, k: R.k }); });
});
return (HVN.lp = P);
},
function (x, z, o) {
var Rs = HVN.realms, LP = hvnLandPrep(), land = 0, flat = 0, near = null, ne = 1e9, wsum = 0, cr = 0, cg = 0, cb = 0;
var dc = Math.hypot(x, z) - 96;
land = Math.max(land, 1 - hvnSS(80, 360, dc));
flat = Math.max(flat, 1 - hvnSS(0, 70, dc));
if (o) {
var wc = Math.exp(-Math.max(0, dc) / 120) * 1.2;
HVN_C1.setHex(0xEDEAE2);
cr += HVN_C1.r * wc;
cg += HVN_C1.g * wc;
cb += HVN_C1.b * wc;
wsum += wc;
}
for (var i = 0; i < Rs.length; i++) {
var R = Rs[i], F = HVN_LANDF[R.k] || {}, e = Math.hypot(x - R.x, z - R.z) - R.R;
land = Math.max(land, 1 - hvnSS(F.island ? 40 : 70, F.island ? 150 : 330, e));
flat = Math.max(flat, 1 - hvnSS(0, 70, e));
if (e < ne) {
ne = e;
near = R;
}
if (o) {
var w = Math.exp(-Math.max(0, e) / 150);
if (e < 0)
w *= 1 + (-e) / 40;
var G = HVN_GROUND[R.D.ground] || HVN_GROUND.meadow;
HVN_C1.set(G[0]);
cr += HVN_C1.r * w;
cg += HVN_C1.g * w;
cb += HVN_C1.b * w;
wsum += w;
}
}
for (var p = 0; p < LP.pads.length; p++) {
var pd = Math.hypot(x - LP.pads[p].x, z - LP.pads[p].z) - LP.pads[p].r;
flat = Math.max(flat, 1 - hvnSS(0, 50, pd));
}
var n = wFbm(x * 0.0026, z * 0.0026, 11, 3);
land += (n - 0.47) * 0.5;
for (var s = 0; s < LP.seas.length; s++) {
var S = LP.seas[s], sd = Math.hypot(x - S.x, z - S.z);
if (sd < S.r * 1.3)
land -= (1 - hvnSS(S.r * 0.5, S.r * 1.3, sd)) * 1.4;
}
land = Math.max(0, Math.min(1, land));
var roadd = hvnRoadD(x, z), roadf = hvnSS(10, 90, roadd);
var hill = wFbm(x * 0.0065, z * 0.0065, 5, 4), rg = wFbm(x * 0.0032, z * 0.0032, 9, 4), ridge = 1 - (rg * 2 - 1) * (rg * 2 - 1);
var hl = hill * hill * 34 + Math.pow(ridge, 3) * 58, pk = 0, cap = null, pkf = 0;
for (var q = 0; q < LP.peaks.length; q++) {
var K = LP.peaks[q], t = Math.hypot(x - K.x, z - K.z) / K.r;
if (t > 1.8)
continue;
var v = K.cone ? Math.max(0, 1 - t * 0.85) * K.h * (t < 0.12 ? 0.92 : 1) * (0.96 + hill * 0.08) : K.h * Math.exp(-t * t * 2.4) * (0.8 + hill * 0.4 + Math.pow(ridge, 2) * 0.25);
if (v > pk) {
pk = v;
cap = K.cap;
pkf = K.h;
}
}
hl *= 0.2 + 0.8 * roadf;
pk *= 0.3 + 0.7 * roadf;
var up = (hl + pk) * (1 - flat), s1 = hvnSS(0.3, 0.55, land), s2 = hvnSS(0.48, 0.8, land);
var h = -9 * (1 - s1) + up * s2;
for (var l = 0; l < LP.lakes.length; l++) {
var Lk = LP.lakes[l], ld = Math.hypot(x - Lk.x, z - Lk.z);
if (ld < Lk.r * 1.4) {
var lf = 1 - hvnSS(Lk.r * 0.6, Lk.r * 1.4, ld);
h = h * (1 - lf) + (-4) * lf;
}
}
for (var r = 0; r < LP.rivers.length; r++) {
var Rv = LP.rivers[r], rd = hvnSegD(x, z, Rv);
if (rd < Rv.w * 2.4 && flat < 0.6) {
var rf = (1 - hvnSS(Rv.w * 0.5, Rv.w * 2.4, rd)) * (1 - flat / 0.6) * roadf;
h = h * (1 - rf) + Math.min(h, -3.2) * rf;
}
}
if (near && (HVN_LANDF[near.k] || {}).terraces && h > 3 && ne < 520) {
var st = 6, tq = Math.floor(h / st) * st + Math.min(st, (h % st) * 3) * 0.25;
h = h + (tq - h) * (1 - hvnSS(380, 520, ne));
}
if (!o)
return h;
HVN_C2.setRGB(cr / wsum, cg / wsum, cb / wsum);
var vn = wFbm(x * 0.02, z * 0.02, 3, 2) - 0.45;
HVN_C2.offsetHSL(0, 0, vn * 0.12);
if (h < 0.9 && flat < 0.5) {
HVN_C1.setHex(h < -1.2 ? 0x7A9A8A : 0xE2D2A2);
HVN_C2.lerp(HVN_C1, h < -1.2 ? 0.8 : hvnSS(0.9, -0.6, h));
}
var rock = hvnSS(22, 60, up) * (1 - flat);
if (rock > 0) {
HVN_C1.setHex(cap === "obsidian" ? 0x2A2430 : 0x8A8478);
HVN_C2.lerp(HVN_C1, rock * 0.85);
}
var line = cap ? pkf * 0.62 : 95, sn = hvnSS(line - 8, line + 10, h);
if (sn > 0) {
HVN_C1.setHex(cap === "gold" ? 0xF2C850 : cap === "lava" ? 0x3A2A26 : cap === "obsidian" ? 0x4A3E54 : 0xFAFAFC);
HVN_C2.lerp(HVN_C1, sn);
if (cap === "lava" && h > pkf * 0.86) {
HVN_C1.setHex(0xFF6A20);
HVN_C2.lerp(HVN_C1, hvnSS(pkf * 0.86, pkf * 0.9, h));
}
}
o.h = h;
o.r = HVN_C2.r;
o.g = HVN_C2.g;
o.b = HVN_C2.b;
o.flat = flat;
o.near = near;
o.ne = ne;
o.roadd = roadd;
o.up = up;
return h;
},
function (G) {
var B = HVN.box, step = HVN.lite ? 22 : 15, nx = Math.ceil((B.x1 - B.x0) / step) + 1, nz = Math.ceil((B.z1 - B.z0) / step) + 1;
var H = new Float32Array(nx * nz), pos = new Float32Array(nx * nz * 3), col = new Float32Array(nx * nz * 3), uv = new Float32Array(nx * nz * 2), o = {};
for (var j = 0; j < nz; j++)
for (var i = 0; i < nx; i++) {
var k = j * nx + i, x = B.x0 + i * step, z = B.z0 + j * step;
hvnLandAt(x, z, o);
H[k] = o.h;
pos[k * 3] = x;
pos[k * 3 + 1] = o.h;
pos[k * 3 + 2] = z;
col[k * 3] = o.r * HVN_LAND_TONE;
col[k * 3 + 1] = o.g * HVN_LAND_TONE;
col[k * 3 + 2] = o.b * HVN_LAND_TONE;
uv[k * 2] = x / 9;
uv[k * 2 + 1] = z / 9;
}
var idx = new (nx * nz > 65000 ? Uint32Array : Uint16Array)((nx - 1) * (nz - 1) * 6), c = 0;
for (var j2 = 0; j2 < nz - 1; j2++)
for (var i2 = 0; i2 < nx - 1; i2++) {
var a = j2 * nx + i2, b = a + 1, d = a + nx, e = d + 1;
idx[c++] = a;
idx[c++] = d;
idx[c++] = b;
idx[c++] = b;
idx[c++] = d;
idx[c++] = e;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.BufferAttribute(col, 3));
g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
g.setIndex(new THREE.BufferAttribute(idx, 1));
g.computeVertexNormals();
var tex = hvnTex("landdetail", function (x, W, Hh) { x.fillStyle = "#E8E8E8"; x.fillRect(0, 0, W, Hh); hvnSpeck(x, W, Hh, 2600, ["#FFFFFF", "#D4D4D4", "#F4F4F4", "#C8C8C8", "#E0E0E0"], 0.6, 2.2, 17); });
var m = new THREE.MeshLambertMaterial({ map: tex, vertexColors: true });
m.userData.hvnMine = true;
var mesh = new THREE.Mesh(g, m);
mesh.userData.hvnMine = true;
G.add(mesh);
HVN.land = { x0: B.x0, z0: B.z0, step: step, nx: nx, nz: nz, H: H };
var sea = new THREE.Mesh(new THREE.PlaneGeometry(B.x1 - B.x0 + 1600, B.z1 - B.z0 + 1600, 1, 1).rotateX(-Math.PI / 2), hvnSeaMat());
sea.position.set((B.x0 + B.x1) / 2, -1.2, (B.z0 + B.z1) / 2);
sea.userData.hvnMine = true;
G.add(sea);
var su = sea.geometry.attributes.uv;
for (var q = 0; q < su.count; q++)
su.setXY(q, su.getX(q) * (B.x1 - B.x0 + 1600) / 30, su.getY(q) * (B.z1 - B.z0 + 1600) / 30);
var per = 2 * ((B.x1 - B.x0) + (B.z1 - B.z0)) + 3200, nb = HVN.lite ? 70 : 160, bank = new THREE.InstancedMesh(hvnGeo("sph", function () { return new THREE.SphereGeometry(1, 14, 10); }), hvnM(0xFFFFFF, { e: 0xF0ECE4, ei: 0.4 }), nb), ob = new THREE.Object3D(), rr = wRand(77);
for (var b2 = 0; b2 < nb; b2++) {
var t = b2 / nb * per, X0 = B.x0 - 800, Z0 = B.z0 - 800, W2 = B.x1 - B.x0 + 1600, D2 = B.z1 - B.z0 + 1600, px, pz;
if (t < W2) {
px = X0 + t;
pz = Z0;
}
else if (t < W2 + D2) {
px = X0 + W2;
pz = Z0 + t - W2;
}
else if (t < 2 * W2 + D2) {
px = X0 + W2 - (t - W2 - D2);
pz = Z0 + D2;
}
else {
px = X0;
pz = Z0 + D2 - (t - 2 * W2 - D2);
}
var sc = 60 + rr() * 90;
ob.position.set(px + (rr() - 0.5) * 80, -sc * 0.12, pz + (rr() - 0.5) * 80);
ob.scale.set(sc, sc * 0.38, sc);
ob.updateMatrix();
bank.setMatrixAt(b2, ob.matrix);
}
bank.userData.hvnMine = true;
G.add(bank);
},
function () {
var key = "sea";
if (HVN_MAT[key])
return HVN_MAT[key];
var t = hvnTex(key, function (x, W, H) { x.fillStyle = "#3A86B0"; x.fillRect(0, 0, W, H); hvnSpeck(x, W, H, 260, ["rgba(255,255,255,.22)", "rgba(255,255,255,.1)", "rgba(10,40,80,.18)", "rgba(120,200,230,.2)"], 2, 9, 41); });
var m = new THREE.MeshPhongMaterial({ map: t, shininess: 120, specular: 0xCCE6F4, transparent: true, opacity: 0.86, depthWrite: false });
m.userData.hvnShared = true;
return (HVN_MAT[key] = m);
},
function (x, z) {
var L = HVN.land;
if (!L)
return 0;
var fx = (x - L.x0) / L.step, fz = (z - L.z0) / L.step;
if (fx < 0 || fz < 0 || fx >= L.nx - 1 || fz >= L.nz - 1)
return -9;
var i = Math.floor(fx), j = Math.floor(fz), u = fx - i, v = fz - j, a = L.H[j * L.nx + i], b = L.H[j * L.nx + i + 1], d = L.H[(j + 1) * L.nx + i], e = L.H[(j + 1) * L.nx + i + 1];
return u + v < 1 ? a + (b - a) * u + (d - a) * v : e + (d - e) * (1 - u) + (b - e) * (1 - v);
},
function (x, z) {
var L = HVN.roads || [];
for (var i = 0; i < L.length; i++) {
var S = L[i];
if (hvnSegD(x, z, S) < 4.2) {
var dx = S.x1 - S.x0, dz = S.z1 - S.z0, l = Math.hypot(dx, dz) || 1, ux = dx / l, uz = dz / l, t = (x - S.x0) * ux + (z - S.z0) * uz, cx = S.x0 + ux * t, cz = S.z0 + uz * t, px = -uz * 3.5, pz = ux * 3.5;
return Math.max(hvnLandH(x, z), hvnLandH(cx + px, cz + pz), hvnLandH(cx - px, cz - pz), hvnLandH(cx + px * 1.3, cz + pz * 1.3), hvnLandH(cx - px * 1.3, cz - pz * 1.3), 0) + 0.16;
}
}
return null;
},
function (G) {
var road = hvnM(0xC8B272);
road.userData.noReal = 1;
var gold = hvnM(0xE0BC58, { phong: 60 }), posts = [];
(HVN.roads || []).forEach(function (S) {
var L = Math.hypot(S.x1 - S.x0, S.z1 - S.z0), n = Math.max(2, Math.ceil(L / (HVN.lite ? 6 : 3))), ux = (S.x1 - S.x0) / L, uz = (S.z1 - S.z0) / L, px = -uz * 3.5, pz = ux * 3.5, pos = [], uv = [], idx = [];
for (var i = 0; i <= n; i++) {
var t = i / n, x = S.x0 + (S.x1 - S.x0) * t, z = S.z0 + (S.z1 - S.z0) * t, gh = hvnLandH(x, z), y = Math.max(gh, hvnLandH(x + px, z + pz), hvnLandH(x - px, z - pz), hvnLandH(x + px * 1.3, z + pz * 1.3), hvnLandH(x - px * 1.3, z - pz * 1.3), 0) + 0.18;
pos.push(x + px, y, z + pz, x - px, y, z - pz);
uv.push(0, t * L / 6, 7 / 6, t * L / 6);
if (i < n) {
var a = i * 2;
idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
}
if (gh < -0.4 && i % (HVN.lite ? 2 : 5) === 0) {
posts.push([x + px * 1.05, z + pz * 1.05, gh]);
posts.push([x - px * 1.05, z - pz * 1.05, gh]);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
if (g.attributes.normal.getY(0) < 0) {
for (var q = 0; q < idx.length; q += 3) {
var tt = idx[q + 1];
idx[q + 1] = idx[q + 2];
idx[q + 2] = tt;
}
g.setIndex(idx);
g.computeVertexNormals();
}
var m = new THREE.Mesh(g, road);
m.userData.hvnMine = true;
G.add(m);
});
if (posts.length) {
var im = new THREE.InstancedMesh(hvnGeo("cyl10", function () { return new THREE.CylinderGeometry(0.5, 0.5, 1, 10); }), gold, posts.length), o = new THREE.Object3D();
posts.forEach(function (p, i) { var hh = 1.1 - p[2]; o.position.set(p[0], p[2] + hh / 2, p[1]); o.scale.set(0.5, hh, 0.5); o.updateMatrix(); im.setMatrixAt(i, o.matrix); });
im.userData.hvnMine = true;
G.add(im);
}
},
function (kind) {
var dt = HVN.lite ? 0 : 1;
return hvnGeo("tree_" + kind + dt, function () {
var parts = [];
function add(geo, x, y, z, sx, sy, sz) { geo = geo.toNonIndexed(); geo.scale(sx || 1, sy || 1, sz || 1); geo.translate(x, y, z); parts.push(geo); }
if (kind === "conifer" || kind === "pine" || kind === "cedar") {
add(new THREE.ConeGeometry(2.6, 4.2, 9), 0, 3.6, 0);
add(new THREE.ConeGeometry(2.0, 3.6, 9), 0, 5.6, 0);
add(new THREE.ConeGeometry(1.3, 2.8, 9), 0, 7.4, 0);
}
else if (kind === "cypress")
add(new THREE.SphereGeometry(1, 10, 8), 0, 5, 0, 1.1, 4.2, 1.1);
else if (kind === "umbrella") {
add(new THREE.SphereGeometry(1, 12, 6), 0, 7.4, 0, 3.8, 1.2, 3.8);
}
else if (kind === "palm") {
for (var f = 0; f < 8; f++) {
var a = f / 8 * Math.PI * 2, fg = new THREE.ConeGeometry(0.45, 4.6, 4);
fg.rotateX(Math.PI / 2 + 0.5);
fg.translate(0, -0.4, 2.1);
fg.rotateY(a);
add(fg, 0, 7.6, 0);
}
}
else if (kind === "birch")
add(new THREE.SphereGeometry(1, 10, 8), 0, 6.6, 0, 1.7, 2.6, 1.7);
else if (kind === "jungle") {
add(new THREE.IcosahedronGeometry(1, dt), 0, 10.5, 0, 4.6, 1.9, 4.6);
add(new THREE.IcosahedronGeometry(1, dt), 1.6, 8.8, 0.8, 2.6, 1.4, 2.6);
}
else if (kind === "banyan") {
add(new THREE.IcosahedronGeometry(1, dt), 0, 6, 0, 5.2, 2.6, 5.2);
}
else if (kind === "dead") {
for (var b = 0; b < 4; b++) {
var bg = new THREE.CylinderGeometry(0.06, 0.16, 3, 5);
bg.rotateZ(0.8);
bg.translate(1.1, 0, 0);
bg.rotateY(b * 1.6);
add(bg, 0, 4.6 + b * 0.4, 0);
}
}
else if (kind === "cloudtree") {
add(new THREE.IcosahedronGeometry(1, dt), 0, 5.4, 0, 2.8, 2.0, 2.8);
add(new THREE.IcosahedronGeometry(1, dt), 1.4, 6.4, 0.6, 1.8, 1.4, 1.8);
}
else {
add(new THREE.IcosahedronGeometry(1, dt), 0, 5.2, 0, 2.9, 2.4, 2.9);
add(new THREE.IcosahedronGeometry(1, dt), 1.3, 4.5, 0.9, 1.9, 1.6, 1.9);
add(new THREE.IcosahedronGeometry(1, dt), -1.2, 4.7, -0.7, 1.8, 1.5, 1.8);
}
var n = 0;
parts.forEach(function (p) { n += p.attributes.position.count; });
var P = new Float32Array(n * 3), N = new Float32Array(n * 3), c = 0;
parts.forEach(function (p) { p.computeVertexNormals(); P.set(p.attributes.position.array, c * 3); N.set(p.attributes.normal.array, c * 3); c += p.attributes.position.count; p.dispose(); });
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(P, 3));
g.setAttribute("normal", new THREE.BufferAttribute(N, 3));
return g;
});
},
function (G) {
var B = HVN.box, R = wRand(901), cell = HVN.lite ? 18 : 9, max = HVN.lite ? 1500 : 9000, by = {}, o = {}, count = 0, buckets = {};
for (var z = B.z0 + cell / 2; z < B.z1 && count < max * 1.4; z += cell)
for (var x = B.x0 + cell / 2; x < B.x1; x += cell) {
var jx = x + (R() - 0.5) * cell * 0.9, jz = z + (R() - 0.5) * cell * 0.9;
var fr = wFbm(jx * 0.0042, jz * 0.0042, 21, 3);
if (fr < 0.36)
continue;
var h = hvnLandAt(jx, jz, null);
if (h < 0.6 || h > 78)
continue;
hvnLandAt(jx, jz, o);
if (o.flat > 0.25 || o.roadd < 9 || !o.near)
continue;
if (Math.hypot(jx, jz) < 180)
continue;
var Rn = o.near, F = HVN_LANDF[Rn.k] || {}, dens = (F.dens || 0.8) * (o.up > 40 ? 0.5 : 1);
if (R() > dens * hvnSS(0.36, 0.6, fr))
continue;
var kinds = F.trees || ["broad"], kind = kinds[Math.floor(R() * kinds.length)];
(by[kind] || (by[kind] = [])).push([jx, h, jz, 0.8 + R() * 0.6, R() * 6.28, R()]);
count++;
var bk = Math.floor(jx / 32) + ":" + Math.floor(jz / 32);
(buckets[bk] || (buckets[bk] = [])).push({ x: jx, z: jz, r: kind === "jungle" || kind === "banyan" ? 0.9 : 0.55 });
}
var ob = new THREE.Object3D(), c = new THREE.Color();
Object.keys(by).forEach(function (kind) {
var L = by[kind];
if (L.length > max)
L.length = max;
var tc = HVN_TREE_COL[kind] || HVN_TREE_COL.broad, th = hvnTrunkH(kind);
var trunk = new THREE.InstancedMesh(hvnGeo("trunk", function () { return new THREE.CylinderGeometry(0.22, 0.36, 1, 7).translate(0, 0.5, 0); }), hvnM(kind === "birch" ? 0xEDEAE2 : kind === "dead" ? 0x1E1A24 : kind === "palm" ? 0x7A6248 : 0x5A4632), L.length);
var crown = new THREE.InstancedMesh(hvnTreeGeo(kind), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), L.length);
crown.material.userData.hvnMine = true;
if (kind === "cloudtree") {
crown.material.emissive = new THREE.Color(0xF4E8C8);
crown.material.emissiveIntensity = 0.35;
}
L.forEach(function (t, i) {
ob.position.set(t[0], t[1] - 0.3, t[2]);
ob.rotation.set(0, t[4], 0);
ob.scale.set(t[3], t[3] * th, t[3]);
ob.updateMatrix();
trunk.setMatrixAt(i, ob.matrix);
ob.scale.set(t[3], t[3], t[3]);
ob.updateMatrix();
crown.setMatrixAt(i, ob.matrix);
c.setHex(tc[0]);
HVN_C1.setHex(tc[1]);
c.lerp(HVN_C1, t[5]);
c.offsetHSL(0, 0, (t[5] - 0.5) * 0.06);
crown.setColorAt(i, c);
});
if (crown.instanceColor)
crown.instanceColor.needsUpdate = true;
trunk.userData.hvnMine = true;
crown.userData.hvnMine = true;
trunk.frustumCulled = false;
crown.frustumCulled = false;
G.add(trunk);
G.add(crown);
});
HVN.treeB = buckets;
HVN.trees = count;
},
function (x, z) {
var T = HVN.treeB;
if (!T)
return false;
var bx = Math.floor(x / 32), bz = Math.floor(z / 32);
for (var i = -1; i <= 1; i++)
for (var j = -1; j <= 1; j++) {
var L = T[(bx + i) + ":" + (bz + j)];
if (!L)
continue;
for (var k = 0; k < L.length; k++) {
var t = L[k], dx = x - t.x, dz = z - t.z;
if (dx * dx + dz * dz < (t.r + 0.35) * (t.r + 0.35))
return true;
}
}
return false;
},
function (G) {
if (typeof swkTree !== "function" || !HVN.court)
return;
var C = HVN.court, ways = (HVN.courtWays || []).concat([Math.PI / 2, -Math.PI / 2]);
function clearA(a, w) { return !ways.some(function (v) { return Math.abs(hvnWrapA(a - v)) < (w || 0.22); }); }
var marble = swkM(0xE8E2D6, "marble"), gold = swkM(0xC8A040, "metal");
for (var i = 0; i < 16; i++) {
var a = i / 16 * Math.PI * 2 + 0.1;
if (!clearA(a, 0.3) || !swkKeep(i))
continue;
var x = Math.cos(a) * 30, z = Math.sin(a) * 30;
swkPlanter(C, x, z, 4.6, 2.2, { ry: -a + Math.PI / 2, stone: 0xE0D8CA, c: 0x4E7A3A, flowers: [0xF8F6F0, 0xF4E8B0, 0xF8F0F4, 0xE8D070] });
HVN.solids.push({ x: x, z: z, r: 1.6 });
}
for (var b = 0; b < 10; b++) {
var ba = b / 10 * Math.PI * 2 + 0.31;
if (!clearA(ba, 0.18) || !swkKeep(b))
continue;
var bx = Math.cos(ba) * 13, bz = Math.sin(ba) * 13, B = swkAt(C, bx, 0.1, bz, -ba - Math.PI / 2);
swkBox(B, 2.4, 0.12, 0.6, marble, 0, 0.46, 0);
[-0.9, 0.9].forEach(function (e) { swkBox(B, 0.3, 0.42, 0.5, marble, e, 0.21, 0); });
swkBox(B, 2.4, 0.06, 0.1, gold, 0, 0.54, 0.3);
HVN.solids.push({ x: bx, z: bz, r: 1.0 });
}
for (var l = 0; l < 20; l++) {
var la = l / 20 * Math.PI * 2;
if (!clearA(la, 0.12) || !swkKeep(l))
continue;
var lx = Math.cos(la) * 50, lz = Math.sin(la) * 50;
swkLamp(C, lx, lz, { y: 0.1, h: 3.8, post: 0xB8963A, c: 0xFFF0C8 });
HVN.solids.push({ x: lx, z: lz, r: 0.3 });
var ux = Math.cos(la + 0.08) * 56, uz = Math.sin(la + 0.08) * 56, U = swkAt(C, ux, 0.1, uz, 0);
swkCyl(U, 0.45, 0.3, 0.9, marble, 0, 0.45, 0, 14);
swkCyl(U, 0.5, 0.45, 0.12, gold, 0, 0.95, 0, 14);
var lb = swkBall(U, 0.7, swkM(0x4A6E36, "foliage"), 0, 1.55, 0, 1);
lb.scale.y = 1.2;
HVN.solids.push({ x: ux, z: uz, r: 0.6 });
}
var L = [], robes = [[0xF4F0E6, 0xF4F0E6], [0xF0E8D0, 0xD8C890], [0xE8E4F0, 0xF4F0E6], [0xD8B860, 0xF4F0E6]];
for (var n = 0; n < (swkLite() ? 9 : 18); n++) {
var r = swkR(n * 37 + 11), pa, tries = 0;
do {
pa = r() * Math.PI * 2;
} while (!clearA(pa, 0.2) && ++tries < 8);
var pr = 16 + r() * 30, rb = robes[n % robes.length];
L.push([Math.cos(pa) * pr, Math.sin(pa) * pr, r() * 6.28, n % 5 === 0 ? "pilgrim" : n % 7 === 0 ? "priest" : "", { walk: n % 3 === 0 ? 0 : 5, y: 0.1, child: n % 9 === 4, look: { top: rb[0], bottom: rb[1] } }]);
}
L.push([3, 26, Math.PI * 0.9, "pilgrim", { y: 0.1, look: { top: 0xF0E8D0 } }]);
L.push([-2.5, 27, Math.PI * 1.1, "", { y: 0.1, look: { top: 0xF4F0E6 } }]);
swkPeople(C, "hvn_court", L, function () { return 0.1; });
}
];
});
