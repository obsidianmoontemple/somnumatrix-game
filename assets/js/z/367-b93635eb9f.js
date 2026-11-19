/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(367, function () {
return [
function (p, x, y, z, r, col) {
var k = r + "|" + col, G = GMM_LB[k];
if (!G) {
var geo = null, mat = null;
try {
if (typeof ctuInstGeo === "function" && typeof ctuLeafMat === "function") {
geo = ctuInstGeo("ball", { radius: r });
mat = ctuLeafMat(col);
}
}
catch (e) { }
if (!geo) {
geo = new THREE.IcosahedronGeometry(r, 2);
mat = gmmMat(null, col);
}
G = GMM_LB[k] = { geo: geo, mat: mat };
}
return gmmAdd(G.geo, G.mat, x, y, z, p);
},
function (w, h, d, kind, col, x, y, z, p, ry) {
var s = new THREE.Shape();
s.moveTo(-w / 2, 0);
s.lineTo(w / 2, 0);
s.lineTo(0, h);
s.lineTo(-w / 2, 0);
var g = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: false });
g.translate(0, 0, -d / 2);
var uv = g.attributes.uv;
if (uv) {
var P = g.attributes.position;
for (var i = 0; i < uv.count; i++) {
uv.setXY(i, (P.getX(i) + P.getZ(i)) / (TILE && TILE[kind] || 2.4), P.getY(i) / (TILE && TILE[kind] || 2.4));
}
}
return gmmAdd(g, gmmMat(kind, col), x, y, z, p, ry);
},
function (g, lx, lz) {
var c = Math.cos(g.rotation.y), s = Math.sin(g.rotation.y), P = g.position, q = g.parent;
var x = P.x + lx * c + lz * s, z = P.z - lx * s + lz * c;
while (q && q !== GMM.G && q.position) {
var c2 = Math.cos(q.rotation.y), s2 = Math.sin(q.rotation.y), nx = q.position.x + x * c2 + z * s2, nz = q.position.z - x * s2 + z * c2;
x = nx;
z = nz;
q = q.parent;
}
return { x: x, z: z };
},
function (x, z, feet) {
for (var i = 0; i < GMM.solids.length; i++) {
var S = GMM.solids[i];
if (S.off || feet >= S.y1 - 0.4 || feet + 1.7 <= S.y0)
continue;
if (S.round) {
if (Math.hypot(x - S.x, z - S.z) < S.r)
return true;
}
else if (Math.abs(x - S.x) < S.hw && Math.abs(z - S.z) < S.hd) {
if (S.lw === undefined)
return true;
var dx = x - S.x, dz = z - S.z;
if (Math.abs(dx * S.c - dz * S.s) < S.lw && Math.abs(dx * S.s + dz * S.c) < S.ld)
return true;
}
}
return false;
},
function (g, x, y, z, s) {
s = s || 1;
for (var i = 0; i < 5; i++) {
var a = i / 5 * Math.PI * 2, L = gmmC(0.08 * s, 0.1 * s, 1.2 * s, "bark", 0x4A3420, x + Math.cos(a) * 0.25 * s, y + 0.25 * s, z + Math.sin(a) * 0.25 * s, g, 6);
L.rotation.z = Math.cos(a) * 1.2;
L.rotation.x = -Math.sin(a) * 1.2;
}
[0xFF5A10, 0xFF9A20, 0xFFD050].forEach(function (c, j) {
var f = gmmAdd(new THREE.ConeGeometry((0.45 - j * 0.1) * s, (1.0 + j * 0.25) * s, 8), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending }), x + (j - 1) * 0.08 * s, y + (0.5 + j * 0.12) * s, z, g);
f.userData.keep = 1;
GMM.fx.push({ k: "flame", m: f, ph: j * 1.9, s: 1 });
});
var gl = wGlow(0xFF9A40, 4 * s, 0.5);
gl.position.set(x, y + 0.8 * s, z);
g.add(gl);
return gmmLight(0xFF9A50, 1.4, 14 * s, x, y + 1.2 * s, z, g);
},
function (sec, mid) {
if (!GMM.veil && typeof document !== "undefined") {
var v = document.createElement("div");
v.style.cssText = "position:fixed;inset:0;background:#0A0806;opacity:0;pointer-events:none;z-index:43;transition:opacity .35s";
document.body.appendChild(v);
GMM.veil = v;
}
var V = GMM.veil;
GMM.moving = true;
if (V) {
V.style.transition = "opacity " + (sec || 0.35) + "s";
V.style.opacity = "1";
}
setTimeout(function () { try {
mid && mid();
}
catch (e) {
if (window.console)
console.warn("[grimm] veil", e);
} setTimeout(function () { if (V)
V.style.opacity = "0"; GMM.moving = false; }, 80); }, (sec || 0.35) * 1000 + 30);
},
function (seed, x, z, ry, o, parent, y) {
o = o || {};
var p;
try {
p = wPerson("gmm" + seed, o);
}
catch (e) {
p = new THREE.Group();
gmmB(0.5, 1.7, 0.3, null, 0x6A5A4A, 0, 0.85, 0, p);
}
if (o.s)
p.scale.multiplyScalar(o.s);
p.position.set(x, y === undefined ? gmmGround(x, z) : y, z);
p.rotation.y = ry || 0;
p.userData.keep = 1;
(parent || GMM.D || GMM.G).add(p);
var P = { g: p, y: p.position.y, o: o };
GMM.people.push(P);
if (o.wander)
P.wander = o.wander;
if (o.talk || o.fn)
GMM.talk.push({ p: P, r: o.r || 3, name: o.talk ? o.talk.name : o.name, t: o.talk, fn: o.fn });
return P;
},
function (a, x, z, ry, k, seed, parent, y) {
var g = null;
try {
if (typeof ctuOne === "function")
g = ctuOne(a, { k: k || 1, white: a === "horse" && seed % 2 === 0 }, seed || 1);
}
catch (e) { }
if (!g) {
g = new THREE.Group();
var b = gmmS(0.4 * (k || 1), 0x7A6A5A, 0, 0.5 * (k || 1), 0, g);
b.scale.set(1, 0.8, 1.6);
}
g.position.set(x, y === undefined ? gmmGround(x, z) : y, z);
g.rotation.y = ry || 0;
g.userData.keep = 1;
(parent || GMM.D || GMM.G).add(g);
return g;
},
function (p, x, y, z, s) {
s = s || 1;
var g = gmmG(x, y, z, p), m = gmmShiny(0x4A8A2A, 40), b = gmmS(0.16 * s, 0, 0, 0.12 * s, 0, g);
b.material = m;
b.scale.set(1.1, 0.7, 1.3);
[-1, 1].forEach(function (k) {
var e = gmmS(0.05 * s, 0, k * 0.08 * s, 0.22 * s, 0.08 * s, g, 8);
e.material = gmmShiny(0x5A9A3A, 40);
var pu = gmmS(0.028 * s, 0, k * 0.09 * s, 0.235 * s, 0.12 * s, g, 6);
pu.material = gmmGlowM(0x101010);
var leg = gmmS(0.07 * s, 0, k * 0.15 * s, 0.06 * s, -0.08 * s, g, 8);
leg.material = m;
leg.scale.set(0.8, 0.6, 1.6);
});
var cr = gmmC(0.06 * s, 0.07 * s, 0.05 * s, null, 0xE8B830, 0, 0.26 * s, 0.02 * s, g, 8);
cr.material = gmmShiny(0xE8B830, 80);
g.userData.keep = 1;
return g;
},
function (p, x, y, z, s, col, neck, bill) {
s = s || 1;
var g = gmmG(x, y, z, p), m = col === 0xE8C040 ? gmmShiny(0xE8C040, 90) : gmmMat(null, col);
var b = gmmAdd(new THREE.SphereGeometry(0.2 * s, 14, 10), m, 0, 0.25 * s, 0, g);
b.scale.set(0.9, 0.8, 1.4);
var n = gmmAdd(new THREE.CylinderGeometry(0.05 * s, 0.07 * s, (neck || 0.25) * s, 8), m, 0, (0.38 + (neck || 0.25) * 0.4) * s, 0.16 * s, g);
n.rotation.x = 0.35;
var h = gmmAdd(new THREE.SphereGeometry(0.075 * s, 10, 8), m, 0, (0.38 + (neck || 0.25) * 0.85) * s, 0.22 * s, g);
var bk = gmmAdd(new THREE.ConeGeometry(0.03 * s, 0.12 * s, 6), gmmMat(null, bill || 0xE89A20), 0, (0.38 + (neck || 0.25) * 0.85) * s, 0.33 * s, g);
bk.rotation.x = Math.PI / 2;
var tl = gmmAdd(new THREE.ConeGeometry(0.08 * s, 0.18 * s, 6), m, 0, 0.3 * s, -0.28 * s, g);
tl.rotation.x = -Math.PI / 2 - 0.4;
g.userData.keep = 1;
return g;
},
function (p, x, y, z) {
var g = gmmG(x, y, z, p), m = gmmShiny(0x8A7A5A, 50), b = gmmAdd(new THREE.SphereGeometry(0.6, 16, 10), m, 0, 0, 0, g);
b.scale.set(1, 0.18, 1.5);
var t = gmmAdd(new THREE.ConeGeometry(0.4, 0.5, 8), m, 0, 0, -1.0, g);
t.rotation.x = -Math.PI / 2;
t.scale.set(1, 1, 0.2);
[-0.15, 0.15].forEach(function (o) { var e = gmmS(0.07, 0, o, 0.12, 0.55, g, 8); e.material = gmmGlowM(0xE8E0B0); var pu = gmmS(0.035, 0, o, 0.16, 0.6, g, 6); pu.material = gmmGlowM(0x101010); });
for (var i = 0; i < 14; i++) {
var sp = gmmS(0.05, 0xC85A1A, Math.sin(i * 2.1) * 0.4, 0.1, Math.cos(i * 1.3) * 0.8, g, 6);
sp.scale.y = 0.2;
}
g.userData.keep = 1;
return g;
},
function (p, x, y, z, ry, w, h, o) {
o = o || {};
var g = gmmG(x, y, z, p, ry), fr = o.frame || 0xE8E0D0;
if (o.cheap) {
gmmB(w + 0.16, h + 0.16, 0.06, null, fr, 0, 0, 0.0, g);
gmmB(w, h, 0.06, null, o.lit ? 0 : 0x2A3446, 0, 0, 0.02, g).material = o.lit ? gmmGlowM(o.lit) : gmmShiny(0x2A3446, 90);
gmmB(0.05, h, 0.08, null, fr, 0, 0, 0.03, g);
gmmB(w, 0.05, 0.08, null, fr, 0, h * 0.1, 0.03, g);
return g;
}
gmmB(w, h, 0.06, null, o.lit ? 0 : 0x2A3446, 0, 0, 0, g).material = o.lit ? gmmGlowM(o.lit) : gmmShiny(0x2A3446, 90);
gmmB(w + 0.16, 0.08, 0.12, null, fr, 0, h / 2, 0.03, g);
gmmB(w + 0.16, 0.08, 0.12, null, fr, 0, -h / 2, 0.03, g);
gmmB(0.08, h, 0.12, null, fr, -w / 2, 0, 0.03, g);
gmmB(0.08, h, 0.12, null, fr, w / 2, 0, 0.03, g);
gmmB(0.05, h, 0.08, null, fr, 0, 0, 0.04, g);
gmmB(w, 0.05, 0.08, null, fr, 0, h * 0.1, 0.04, g);
gmmB(w + 0.3, 0.07, 0.24, "stone", 0xB8B0A0, 0, -h / 2 - 0.06, 0.1, g);
if (o.shutters) {
gmmB(w * 0.5, h, 0.05, "wood", o.shutters, -w * 0.78, 0, 0.05, g);
gmmB(w * 0.5, h, 0.05, "wood", o.shutters, w * 0.78, 0, 0.05, g);
}
if (o.flowers === "box") {
gmmB(w, 0.2, 0.22, "wood", 0x5A3A22, 0, -h / 2 - 0.12, 0.24, g);
gmmB(w - 0.1, 0.12, 0.18, null, [0xD8283A, 0xE8B020, 0xC83A8A][(x * 7 + y * 3 | 0) % 3 + ((x * 7 + y * 3 | 0) % 3 < 0 ? 3 : 0)], 0, -h / 2 + 0.03, 0.26, g);
gmmB(w - 0.2, 0.08, 0.16, null, 0x3A6A2A, 0, -h / 2 - 0.03, 0.25, g);
}
else if (o.flowers) {
gmmB(w, 0.2, 0.22, "wood", 0x5A3A22, 0, -h / 2 - 0.12, 0.24, g);
for (var i = 0; i < 5; i++)
gmmS(0.07, [0xD8283A, 0xF0F0F0, 0xE8B020, 0xC83A8A][i % 4], -w / 2 + 0.12 + i * (w - 0.24) / 4, -h / 2 + 0.03, 0.26, g, 6);
}
return g;
},
function (p, x, y, z, ry, w, h, col, o) {
o = o || {};
var g = gmmG(x, y, z, p, ry);
gmmB(w + 0.4, h + 0.25, 0.3, "stone", o.frame || 0xA8A090, 0, (h + 0.25) / 2, -0.02, g);
var leaf = gmmB(w, h, 0.12, "wood", col || 0x5A3A22, 0, h / 2, 0.1, g);
gmmB(w, 0.07, 0.04, null, 0x1A1A1A, 0, h * 0.25, 0.18, g);
gmmB(w, 0.07, 0.04, null, 0x1A1A1A, 0, h * 0.75, 0.18, g);
gmmS(0.05, 0x8A7A4A, w * 0.35, h * 0.48, 0.2, g, 6);
if (o.arch) {
var a = gmmAdd(new THREE.CylinderGeometry(w / 2 + 0.2, w / 2 + 0.2, 0.3, 16, 1, false, 0, Math.PI), gmmMat("stone", o.frame || 0xA8A090), 0, h + 0.12, -0.02, g);
a.rotation.x = Math.PI / 2;
a.rotation.z = Math.PI / 2;
}
gmmB(w + 0.8, 0.16, 0.9, "stone", 0x9A9488, 0, 0.08, 0.5, g);
return g;
},
function (p, w, d, y, rh, kind, col, over, gableKind, gableCol) {
over = over || 0.5;
var half = d / 2 + over, slope = Math.hypot(half, rh), ang = Math.atan2(rh, half), g = gmmG(0, y, 0, p);
[-1, 1].forEach(function (s) { var r = gmmB(w + over * 2, 0.22, slope, kind, col, 0, rh / 2, s * half / 2, g); r.rotation.x = s * ang; });
gmmB(w + over * 2 + 0.1, 0.22, 0.3, kind, col, 0, rh + 0.05, 0, g);
gmmPrism(d, rh, 0.2, gableKind || "plaster", gableCol === undefined ? 0xE8DCC0 : gableCol, w / 2 - 0.1, 0, 0, g, Math.PI / 2);
gmmPrism(d, rh, 0.2, gableKind || "plaster", gableCol === undefined ? 0xE8DCC0 : gableCol, -w / 2 + 0.1, 0, 0, g, Math.PI / 2);
return g;
},
function (p, w, h, x, y, z, ry, col, dense, plain) {
var g = gmmG(x, y, z, p, ry), n = Math.max(2, Math.round(w / (plain ? 2.4 : dense ? 1.1 : 1.6))), c = col || 0x4A2E1A;
for (var i = 0; i <= n; i++)
gmmB(0.18, h, 0.08, "wood", c, -w / 2 + i * w / n, h / 2, 0, g);
gmmB(w + 0.1, 0.2, 0.1, "wood", c, 0, 0.1, 0, g);
gmmB(w + 0.1, 0.2, 0.1, "wood", c, 0, h - 0.1, 0, g);
gmmB(w + 0.1, 0.14, 0.08, "wood", c, 0, h * 0.42, 0, g);
for (var j = 0; j < n; j++) {
if (j % 2 && !dense || plain && j % 3)
continue;
var bx = -w / 2 + (j + 0.5) * w / n, L = Math.hypot(w / n, h * 0.42), br = gmmB(0.14, L, 0.07, "wood", c, bx, h * 0.21, 0.01, g);
br.rotation.z = (j % 2 ? 1 : -1) * Math.atan2(w / n, h * 0.42);
}
return g;
},
function (p, x, z, ry, o) {
o = o || {};
var w = o.w || 10, d = o.d || 8, fl = o.fl || 2, sh = 3.1, y0 = gmmGround(x, z), g = gmmG(x, y0, z, p, ry), pc = o.plaster || 0xE8DCC0, tc = o.timber || 0x4A2E1A;
gmmB(w, 0.9, d, "stone", 0x9A9284, 0, 0.15, 0, g);
for (var f = 0; f < fl; f++) {
var jut = f * 0.35, fw = w + jut * 2, fd = d + jut * 2, fy = 0.6 + f * sh;
gmmB(fw, sh, fd, "plaster", pc, 0, fy + sh / 2, 0, g);
[[fw, 0, fd / 2 + 0.05, 0], [fw, 0, -fd / 2 - 0.05, Math.PI], [fd, fw / 2 + 0.05, 0, Math.PI / 2], [fd, -fw / 2 - 0.05, 0, -Math.PI / 2]].forEach(function (s, si) { gmmTimbers(g, s[0], sh, s[1], fy, s[2], s[3], tc, o.dense, o.cheap && si > 0); });
if (f > 0)
gmmB(fw + 0.2, 0.25, fd + 0.2, "wood", tc, 0, fy, 0, g);
var nw = Math.max(1, Math.round(fw / 2.6));
for (var i = 0; i < nw; i++) {
var wx = -fw / 2 + (i + 0.5) * fw / nw;
if (f === 0 && Math.abs(wx - (o.door || 0)) < 1.2)
continue;
gmmWindow(g, wx, fy + sh * 0.55, fd / 2 + 0.12, 0, 0.9, 1.3, { shutters: o.shutters, flowers: f > 0 && i % 2 === 0 && (o.cheap ? (GMM.lite ? false : "box") : true), lit: o.lit && (i + f) % 3 === 0 ? 0xFFC878 : 0, cheap: o.cheap && GMM.lite });
gmmWindow(g, wx, fy + sh * 0.55, -fd / 2 - 0.12, Math.PI, 0.9, 1.3, { shutters: o.shutters, cheap: o.cheap });
}
var nd = Math.max(1, Math.round(fd / 3));
for (var k = 0; k < nd; k++) {
var wz = -fd / 2 + (k + 0.5) * fd / nd;
gmmWindow(g, fw / 2 + 0.12, fy + sh * 0.55, wz, Math.PI / 2, 0.8, 1.2, { shutters: o.shutters, cheap: o.cheap });
gmmWindow(g, -fw / 2 - 0.12, fy + sh * 0.55, wz, -Math.PI / 2, 0.8, 1.2, { shutters: o.shutters, cheap: o.cheap });
}
}
var top = 0.6 + fl * sh, jw = w + (fl - 1) * 0.7, jd = d + (fl - 1) * 0.7, rh = o.rh || jd * 0.75;
gmmGable(g, jw, jd, top, rh, o.roofKind || "tile", o.roof || 0x9A3A24, 0.6, "plaster", pc);
if (o.dormer !== false && jw > 8) {
var dg = gmmG(jw * 0.18, top + rh * 0.3, jd * 0.22, g);
gmmB(1.6, 1.6, 1.4, "plaster", pc, 0, 0.8, 0, dg);
gmmWindow(dg, 0, 0.8, 0.72, 0, 0.7, 0.9, {});
gmmGable(dg, 1.6, 1.4, 1.6, 0.8, o.roofKind || "tile", o.roof || 0x9A3A24, 0.2);
}
gmmB(0.9, rh + 2, 0.9, "brick", 0x8A4A3A, jw * 0.3, top + rh * 0.5 + 0.6, -jd * 0.15, g);
gmmB(1.1, 0.2, 1.1, "stone", 0x6A6460, jw * 0.3, top + rh + 1.6, -jd * 0.15, g);
var dx = o.door || 0;
gmmDoor(g, dx, 0.6, d / 2 + 0.05, 0, 1.3, 2.3, o.doorCol || 0x5A3A22, {});
if (o.sign) {
var sgn = wSign(o.sign, 2.4, 0.8, o.signBg || "#2A1A10", o.signFg || "#E8C890");
sgn.position.set(dx + 1.9, 3.3, d / 2 + 0.6);
sgn.rotation.y = Math.PI / 2;
g.add(sgn);
gmmB(1.4, 0.06, 0.06, null, 0x1A1A1A, dx + 1.2, 3.75, d / 2 + 0.6, g);
}
gmmSolidIn(g, 0, 0, w + (fl > 1 ? 0.7 : 0.2), d + (fl > 1 ? 0.7 : 0.2), -5, top + rh);
var dp = gmmTo(g, dx, d / 2 + 1.6);
return { g: g, door: dp, ry: ry, y: y0 + 0.6 };
},
function (p, x, z, ry, o) {
o = o || {};
var w = o.w || 8, d = o.d || 6, h = o.h || 2.8, y0 = gmmGround(x, z), g = gmmG(x, y0, z, p, ry);
gmmB(w + 0.3, 0.5, d + 0.3, "stone", 0x8A847A, 0, 0.1, 0, g);
if (o.walls === "log") {
for (var i = 0; i < 8; i++) {
[d / 2, -d / 2].forEach(function (zz) { var L = gmmC(0.18, 0.18, w + 0.6, "bark", 0x6A4A2E, 0, 0.45 + i * 0.32, zz, g, 8); L.rotation.z = Math.PI / 2; });
[w / 2, -w / 2].forEach(function (xx) { var L = gmmC(0.18, 0.18, d + 0.6, "bark", 0x6A4A2E, xx, 0.6 + i * 0.32, 0, g, 8); L.rotation.x = Math.PI / 2; });
}
gmmB(w - 0.2, h, d - 0.2, "wood", 0x5A3E26, 0, 0.4 + h / 2, 0, g);
}
else {
gmmB(w, h, d, o.walls === "stone" ? "stone" : "plaster", o.col || (o.walls === "stone" ? 0x9A9488 : 0xE4D8C0), 0, 0.35 + h / 2, 0, g);
if (o.walls !== "stone")
gmmTimbers(g, w, h, 0, 0.35, d / 2 + 0.05, 0, 0x4A2E1A);
}
gmmGable(g, w, d, 0.35 + h, o.rh || d * 0.7, o.roofKind || "thatch", o.roof || 0xB89858, 0.7, o.walls === "log" ? "wood" : (o.walls === "stone" ? "stone" : "plaster"), o.walls === "log" ? 0x5A3E26 : (o.walls === "stone" ? 0x9A9488 : (o.col || 0xE4D8C0)));
gmmB(0.8, (o.rh || d * 0.7) + 1.6, 0.8, "stone", 0x7A746A, -w * 0.3, 0.35 + h + (o.rh || d * 0.7) * 0.4, 0, g);
gmmDoor(g, o.door || 0, 0.35, d / 2 + 0.05, 0, 1.1, 2.0, o.doorCol || 0x4A3020, {});
[-w * 0.3, w * 0.3].forEach(function (wx) { if (Math.abs(wx - (o.door || 0)) < 1)
return; gmmWindow(g, wx, 0.35 + h * 0.58, d / 2 + 0.12, 0, 0.8, 0.9, { shutters: o.shutters || 0x3A5A3A, flowers: o.flowers, lit: o.lit }); });
gmmWindow(g, w / 2 + 0.12, 0.35 + h * 0.58, 0, Math.PI / 2, 0.7, 0.8, {});
gmmWindow(g, -w / 2 - 0.12, 0.35 + h * 0.58, 0, -Math.PI / 2, 0.7, 0.8, {});
gmmSolidIn(g, 0, 0, w + 0.4, d + 0.4, -5, h + 5);
var dp = gmmTo(g, o.door || 0, d / 2 + 1.5);
return { g: g, door: dp, ry: ry, y: y0 + 0.35 };
},
function (p, x, z, o) {
o = o || {};
var r = o.r || 3, h = o.h || 18, y0 = o.y !== undefined ? o.y : gmmGround(x, z), g = gmmG(x, y0, z, p);
gmmC(r * 1.12, r * 1.2, 1.2, "stone", 0x8A847A, 0, 0.6, 0, g, 18);
gmmC(r, r * 1.06, h, "stone", o.col || 0x9A9488, 0, h / 2, 0, g, 18);
gmmC(r * 1.2, r * 1.2, 0.6, "stone", 0x8A847A, 0, h, 0, g, 18);
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2;
gmmB(0.7, 0.8, 0.5, "stone", 0x8A847A, Math.cos(a) * r * 1.12, h + 0.7, Math.sin(a) * r * 1.12, g, -a);
}
gmmK(r * 1.35, o.rh || r * 2.6, "slate", o.roof || 0x4A505A, 0, h + 0.6 + (o.rh || r * 2.6) / 2, 0, g, 18);
if (o.slits !== false)
for (var k = 0; k < 4; k++) {
var b = k * 1.7;
gmmB(0.25, 0.9, 0.1, null, 0x1A1A1E, Math.sin(b) * (r + 0.01), h * (0.25 + k * 0.15), Math.cos(b) * (r + 0.01), g, b);
}
if (o.door) {
gmmDoor(g, 0, 0, r + 0.05, 0, 1.3, 2.4, 0x4A3020, { arch: 1 });
}
var TS = gmmRound(x, z, r * 1.2 + 0.2, -5, h + 5);
TS.y0 = y0 - 5;
TS.y1 = y0 + h + 5;
return { g: g, top: y0 + h, y: y0 };
},
function (p, x, y, z, r, col, k) {
var pts = [], n = 14;
for (var i = 0; i <= n; i++) {
var t = i / n, rr = r * (t < 0.55 ? (0.82 + 0.55 * Math.sin(t / 0.55 * Math.PI * 0.62)) : (1.2 * Math.pow(1 - (t - 0.55) / 0.45, 1.35) * 1.0));
pts.push(new THREE.Vector2(Math.max(0.02, rr), t * r * 2.6));
}
var m = gmmShiny(col || 0x5A9A84, 30), d = gmmAdd(new THREE.LatheGeometry(pts, k || 16), m, x, y, z, p);
gmmC(r * 0.22, r * 0.26, r * 0.7, null, col || 0x5A9A84, x, y + r * 2.6 + r * 0.3, z, p, 8);
gmmS(r * 0.2, col || 0x5A9A84, x, y + r * 3.25, z, p, 8);
gmmC(0.04, 0.06, r * 0.9, null, 0xD8B040, x, y + r * 3.7, z, p, 5);
return d;
},
function (p, x, z, ry, o) {
o = o || {};
var st = o.style || "rose", w = o.w || 60, d = o.d || 50, h = o.h || 10, y0 = gmmGround(x, z), g = gmmG(x, y0, z, p, ry), col = o.col || 0xA8A090, rf = o.roof || 0x3E4652;
var trim = st === "schloss" ? 0xC8B898 : (st === "gothic" ? 0x5A5A62 : 0x8A847A), wallK = st === "schloss" ? "plaster" : "stone";
function merlons(wg, L, yy, dep) { for (var i = 0; i < Math.floor(L / 2); i++)
if (i % 2 === 0)
gmmB(1, st === "gothic" ? 1.4 : 1, dep || 2.4, "stone", col, -L / 2 + 1 + i * 2, yy + 0.5, 0, wg); }
function wall(L, x0, z0, rot) {
var wg = gmmG(x0, 0, z0, g, rot);
gmmB(L, h, 2.2, "stone", col, 0, h / 2, 0, wg);
if (st === "schloss") {
gmmB(L, 0.5, 2.5, "stone", trim, 0, h, 0, wg);
gmmB(L, 0.8, 2.4, "stone", trim, 0, 0.4, 0, wg);
}
else {
gmmB(L, 0.3, 2.6, "stone", trim, 0, h, 0, wg);
merlons(wg, L, h);
if (st === "burg")
for (var b = 0; b < Math.floor(L / 9); b++)
gmmB(1.4, h * 0.9, 1.2, "stone", col, -L / 2 + 4.5 + b * 9, h * 0.45, -1.5, wg);
}
if (st === "gothic")
for (var b2 = 0; b2 < Math.floor(L / 7); b2++) {
gmmB(1.2, h, 1.3, "stone", col, -L / 2 + 3.5 + b2 * 7, h / 2, 1.6, wg);
gmmB(1.2, 1.2, 0.8, "stone", col, -L / 2 + 3.5 + b2 * 7, h + 0.2, 1.8, wg).rotation.x = 0.5;
}
if (st === "rose")
for (var v = 0; v < Math.floor(L / 5); v++) {
var vx = -L / 2 + 2.5 + v * 5 + ((v * 7) % 3 - 1), vh = h * (0.45 + ((v * 5) % 4) * 0.13);
var iv = gmmLeafBall(wg, vx, vh * 0.5, 1.3, 1.5, 0x2A4A22);
iv.scale.set(0.9, vh / 3.2, 0.35);
iv.userData.keep = 1;
for (var rr = 0; rr < 5; rr++) {
var ro = gmmS(0.2, [0xB81A2A, 0xD83A5A, 0xE8E0E0][rr % 3], vx - 0.8 + rr * 0.4, vh * (0.2 + rr * 0.15), 1.75, wg, 6);
ro.userData.keep = 1;
}
}
return wg;
}
var gw = 8, P = null, towersAt = [], zf = d / 2, fx = w / 2;
if (st === "rose") {
P = [];
for (var k0 = 0; k0 < 10; k0++) {
var a0 = Math.PI / 2 - Math.PI / 10 - k0 * Math.PI * 2 / 10;
P.push([Math.cos(a0) * w / 2, Math.sin(a0) * d / 2]);
}
towersAt = [1, 2, 3, 4, 5, 6, 7, 8];
}
else if (st === "gothic") {
P = [[w * 0.25, d / 2], [w / 2, d * 0.08], [w * 0.36, -d / 2], [-w * 0.36, -d / 2], [-w / 2, d * 0.08], [-w * 0.25, d / 2]];
towersAt = [1, 2, 3, 4];
}
else if (st === "burg") {
P = [[10, d / 2], [w / 2, d * 0.12], [w * 0.44, -d * 0.4], [-w * 0.08, -d / 2 - 4], [-w * 0.43, -d * 0.3], [-w / 2, d * 0.26]];
P.push([-10, d / 2]);
towersAt = [1, 2, 4];
}
function segWall(A, B) {
var dx = B[0] - A[0], dz = B[1] - A[1], L = Math.hypot(dx, dz);
if (L < 0.5)
return;
var mx = (A[0] + B[0]) / 2, mz = (A[1] + B[1]) / 2;
if (-dz * mx + dx * mz < 0) {
var t = A;
A = B;
B = t;
dx = -dx;
dz = -dz;
}
var wg = wall(L + 1.6, mx, mz, Math.atan2(-dz, dx));
gmmSolidIn(wg, 0, 0, L + 1.6, 2.4, -5, h + 2);
}
if (P) {
var n0 = P.length;
zf = P[0][1];
fx = Math.abs(P[0][0]);
for (var si = 0; si < n0 - 1; si++)
segWall(P[si], P[si + 1]);
var L0 = P[n0 - 1], R0 = P[0];
segWall(L0, [-gw / 2 - 3, zf]);
segWall([gw / 2 + 3, zf], R0);
towersAt.forEach(function (ti, ci) {
var c = P[ti], t = gmmG(c[0], 0, c[1], g), big = st === "gothic" && ti === 2, th = h + 6 + (st === "gothic" ? 6 : 0) + (big ? 12 : 0) - (st === "rose" && !big ? 2 : 0);
if (st === "rose") {
var tr = big ? 4.4 : 3;
gmmC(tr, tr + 0.4, th, "stone", col, 0, th / 2, 0, t, 18);
gmmC(tr + 0.5, tr + 0.5, 0.7, "stone", trim, 0, th, 0, t, 18);
gmmK(tr + 1, th * 0.7, "tile", rf, 0, th + th * 0.35 + 0.3, 0, t, 18);
for (var k = 0; k < 3; k++)
gmmLancet(t, Math.sin(k * 2.1) * (tr + 0.02), th * (0.45 + k * 0.17), Math.cos(k * 2.1) * (tr + 0.02), k * 2.1, 0.7, 1.3, { frame: trim, lit: o.lit && k === 1 ? 0xFFC070 : 0 });
}
else if (st === "gothic") {
var tw = big ? 9 : 6.5;
gmmB(tw, th, tw, "stone", col, 0, th / 2, 0, t);
gmmB(tw + 0.6, 0.6, tw + 0.6, "stone", trim, 0, th, 0, t);
var sp = gmmK(tw * 0.66, th * 1.1, "slate", rf, 0, th + th * 0.55 + 0.3, 0, t, 4);
sp.rotation.y = Math.PI / 4;
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { gmmC(0.8, 0.8, 3, "stone", col, q[0] * tw / 2, th + 1.2, q[1] * tw / 2, t, 8); gmmK(1, 4.5, "slate", rf, q[0] * tw / 2, th + 4.9, q[1] * tw / 2, t, 8); });
for (var k2 = 0; k2 < 3; k2++)
gmmLancet(t, 0, th * (0.35 + k2 * 0.2), tw / 2 + 0.02, 0, 0.8, 2, { frame: trim, lit: o.lit && k2 === 2 ? 0xD8A050 : 0 });
}
else {
var tb = ti === 2 ? 9 : 7;
gmmB(tb, th, tb, "stone", col, 0, th / 2, 0, t);
gmmB(tb + 0.6, 0.4, tb + 0.6, "stone", trim, 0, th, 0, t);
for (var m = 0; m < 4; m++) {
var mg = gmmG(0, 0, 0, t, m * Math.PI / 2);
for (var n = 0; n < Math.floor(tb / 2); n++)
gmmB(1.1, 1.3, 0.8, "stone", col, -tb / 2 + 1 + n * 2, th + 0.85, tb / 2 - 0.1, mg);
}
for (var k4 = 0; k4 < 4; k4++) {
var b = k4 * 1.57;
gmmB(0.3, 1.2, 0.1, null, 0x1A1A1E, Math.sin(b) * (tb / 2 + 0.02), th * (0.3 + k4 * 0.12), Math.cos(b) * (tb / 2 + 0.02), t, b);
}
}
if (o.flags && ci % 2 === 0) {
var fy = st === "rose" ? th + th * 0.7 + 0.6 : st === "gothic" ? th + th * 1.1 + 0.6 : th + 1.4;
gmmC(0.06, 0.06, 3, null, 0x3A3A3A, 0, fy + 1.5, 0, t, 5);
var fl = gmmB(1.6, 1, 0.04, null, o.flags, 0.8, fy + 2.4, 0, t);
fl.userData.keep = 1;
GMM.fx.push({ k: "flag", m: fl, ph: c[0] + c[1] });
}
var q = gmmTo(t, 0, 0);
var TS = gmmRound(q.x, q.z, st === "rose" ? (big ? 4.8 : 3.4) : (st === "gothic" ? (big ? 6.4 : 4.6) : 5.2), -5, th + 2);
TS.y0 = y0 - 5;
TS.y1 = y0 + th + 2;
});
var gtH = h + (st === "gothic" ? 8 : st === "burg" ? 7 : 4);
[-gw / 2 - 1.5, gw / 2 + 1.5].forEach(function (o2) {
var gt = gmmG(o2, 0, zf, g);
if (st === "rose") {
gmmC(1.9, 2.2, gtH, "stone", col, 0, gtH / 2, 0, gt, 14);
gmmK(2.5, 5, "tile", rf, 0, gtH + 2.5, 0, gt, 14);
}
else {
gmmB(3, gtH, st === "burg" ? 6 : 4, wallK, col, 0, gtH / 2, 0, gt);
gmmB(3.2, 0.3, 4.2, "stone", trim, 0, gtH, 0, gt);
if (st === "gothic") {
var sp2 = gmmK(2.4, 7, "slate", rf, 0, gtH + 3.6, 0, gt, 4);
sp2.rotation.y = Math.PI / 4;
}
else
for (var n2 = 0; n2 < 2; n2++)
gmmB(0.9, 1, 4.2, "stone", col, -0.8 + n2 * 1.6, gtH + 0.6, 0, gt);
}
gmmSolidIn(gt, 0, 0, 3.2, st === "burg" ? 6.4 : 4.4, -5, gtH + 2);
});
if (st === "burg") {
[-1, 1].forEach(function (sd) { var sw = gmmG(sd * (gw / 2 + 3 + (fx - gw / 2 - 3) / 2), 0, zf - 1.4, g); gmmB(fx - gw / 2 - 3, h + 4, 3, "stone", col, 0, (h + 4) / 2, 0, sw); gmmB(fx - gw / 2 - 2.6, 2.2, 3.6, "wood", 0x5A3A22, 0, h + 5.1, 0, sw); gmmPrism(fx - gw / 2 - 2.4, 1.6, 3.8, "tile", rf, 0, h + 6.2, 0, sw, 0).rotation.y = Math.PI / 2; gmmSolidIn(sw, 0, 0, fx - gw / 2 - 3, 3.2, -5, h + 6); });
}
var gh = Math.max(5.2, h - 4);
gmmB(gw + 6, h + 2.5 - gh, 4, wallK, col, 0, (gh + h + 2.5) / 2, zf, g);
[-1, 1].forEach(function (fz) { var av = gmmAdd(new THREE.TorusGeometry(gw / 2 + 0.1, 0.45, 6, 18, Math.PI), gmmMat("stone", trim), 0, gh - gw / 2 * 0.35, zf + fz * 2.05, g); av.scale.y = 0.35; });
[-1, 1].forEach(function (sd) {
var lf = gmmG(sd * gw / 2, 0, zf + 2.2, g, sd * 1.25);
gmmB(gw / 2 - 0.2, gh - 0.3, 0.25, "wood", 0x4A3020, -sd * (gw / 4 - 0.1), (gh - 0.3) / 2, 0, lf);
for (var sb = 0; sb < 4; sb++)
gmmB(gw / 2 - 0.2, 0.18, 0.06, null, 0x1A1A1A, -sd * (gw / 4 - 0.1), 0.8 + sb * (gh - 1.8) / 3, 0.15, lf);
});
}
else {
var ww = 9, wh = h + 3, wl = d - 6, wz = -d / 2 + wl / 2;
fx = w / 2 - ww;
zf = d / 2 - 6;
[-1, 1].forEach(function (sd) {
var wgp = gmmG(sd * (w / 2 - ww / 2), 0, wz, g);
gmmB(ww, wh, wl, "plaster", col, 0, wh / 2, 0, wgp);
gmmB(ww + 0.3, 0.5, wl + 0.3, "stone", trim, 0, wh, 0, wgp);
gmmB(ww + 0.3, 0.8, wl + 0.3, "stone", trim, 0, 0.4, 0, wgp);
var rg = gmmGable(wgp, wl, ww, wh, ww * 0.55, "slate", 0x3E4652, 0.4, "plaster", col);
rg.rotation.y = Math.PI / 2;
for (var wi = 0; wi < Math.floor(wl / 3.4); wi++)
for (var wf = 0; wf < 2; wf++) {
var wzz = -wl / 2 + 1.7 + wi * 3.4;
gmmWindow(wgp, -sd * (ww / 2 + 0.12), 2.6 + wf * (wh - 4) / 1.6, wzz, -sd * Math.PI / 2, 1, 2, { frame: trim, lit: o.lit && (wi + wf) % 4 === 1 ? 0xFFD090 : 0 });
gmmWindow(wgp, sd * (ww / 2 + 0.12), 2.6 + wf * (wh - 4) / 1.6, wzz, sd * Math.PI / 2, 1, 2, { frame: trim, cheap: 1 });
}
gmmSolidIn(wgp, 0, 0, ww + 0.4, wl + 0.4, -5, wh + 8);
[[wl / 2 + 0.5, 1], [-wl / 2 - 0.5, 0]].forEach(function (pz) {
var pv = gmmG(0, 0, pz[0], wgp), ph = wh + 5;
gmmB(ww + 2, ph, ww + 2, "plaster", col, 0, ph / 2, 0, pv);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { gmmB(0.8, ph, 0.8, "stone", trim, q[0] * (ww / 2 + 1), ph / 2, q[1] * (ww / 2 + 1), pv); });
gmmB(ww + 2.6, 0.6, ww + 2.6, "stone", trim, 0, ph, 0, pv);
gmmOnion(pv, 0, ph + 0.3, 0, pz[1] ? 3.6 : 3, rf);
for (var k3 = 0; k3 < 3; k3++)
gmmWindow(pv, 0, ph * (0.3 + k3 * 0.24), pz[1] ? ww / 2 + 1.06 : -(ww / 2 + 1.06), pz[1] ? 0 : Math.PI, 1.1, 1.9, { frame: trim, lit: o.lit && k3 === 1 ? 0xFFD090 : 0 });
if (o.flags && pz[1]) {
gmmC(0.06, 0.06, 3, null, 0x3A3A3A, 0, ph + 13, 0, pv, 5);
var fl = gmmB(1.6, 1, 0.04, null, o.flags, 0.8, ph + 13.9, 0, pv);
fl.userData.keep = 1;
GMM.fx.push({ k: "flag", m: fl, ph: sd });
}
var pq = gmmTo(pv, 0, 0);
var PS = gmmSolid(pq.x, pq.z, ww + 2.4, ww + 2.4, y0 - 5, y0 + ph + 12, gmmRotOf(g));
});
});
var bk = gmmG(0, 0, -d / 2 - 0.5, g);
gmmB(w - 2 * ww, 4, 1, "stone", col, 0, 2, 0, bk);
gmmB(w - 2 * ww, 0.3, 1.3, "stone", trim, 0, 4, 0, bk);
gmmSolidIn(bk, 0, 0, w - 2 * ww, 1.4, -5, 6);
[-1, 1].forEach(function (sd) {
var bl = gmmG(sd * (gw / 2 + 1.2 + (fx - gw / 2 - 1.2) / 2), 0, zf, g), L = fx - gw / 2 - 1.2;
gmmB(L, 0.3, 0.8, "stone", trim, 0, 0.15, 0, bl);
gmmB(L, 0.25, 0.8, "stone", trim, 0, 1.15, 0, bl);
for (var bi = 0; bi < Math.floor(L / 0.5); bi++)
gmmC(0.13, 0.16, 0.75, "stone", trim, -L / 2 + 0.25 + bi * 0.5, 0.68, 0, bl, 8);
gmmSolidIn(bl, 0, 0, L, 1, -5, 1.5);
var pr = gmmG(sd * (gw / 2 + 0.6), 0, zf, g);
gmmB(1.2, 4.2, 1.2, "stone", trim, 0, 2.1, 0, pr);
gmmB(1.5, 0.3, 1.5, "stone", trim, 0, 4.3, 0, pr);
gmmOnion(pr, 0, 4.45, 0, 0.45, rf);
gmmSolidIn(pr, 0, 0, 1.4, 1.4, -5, 6);
});
var pg = gmmG(0, 0, zf + 2, g);
[-1, 1].forEach(function (sd) { var lf = gmmG(sd * gw / 2, 0, 0, pg, sd * 1.4); for (var bi2 = 0; bi2 < 10; bi2++)
gmmB(0.05, 2.6, 0.05, null, 0x1A1A1A, -sd * (0.2 + bi2 * 0.38), 1.3, 0, lf); gmmB(gw / 2, 0.06, 0.06, null, 0x1A1A1A, -sd * gw / 4, 2.5, 0, lf); gmmB(gw / 2, 0.06, 0.06, null, 0x1A1A1A, -sd * gw / 4, 0.3, 0, lf); });
}
var kw = (o.keep && o.keep[0]) || 22, kd = (o.keep && o.keep[1]) || 16, kh = (o.keep && o.keep[2]) || 18, kz = -d / 2 + kd / 2 + (st === "rose" ? 7 : 4), kx = st === "burg" ? -Math.round(w * 0.12) : 0;
if (st === "schloss")
kw = w - 2 * 9;
var kg = gmmG(kx, 0, kz, g);
gmmB(kw, kh, kd, wallK, col, 0, kh / 2, 0, kg);
if (st === "schloss") {
[[-kw / 2, kd / 2], [kw / 2, kd / 2], [-kw / 2, -kd / 2], [kw / 2, -kd / 2]].forEach(function (q) { gmmB(1, kh, 1, "stone", trim, q[0], kh / 2, q[1], kg); });
for (var fl2 = 1; fl2 < 4; fl2++)
gmmB(kw + 0.3, 0.35, kd + 0.3, "stone", trim, 0, kh * fl2 / 4, 0, kg);
gmmGable(kg, kw, kd, kh, kd * 0.7, "slate", 0x3E4652, 0.4, "plaster", col);
[-1, 1].forEach(function (sd) { for (var s2 = 0; s2 < 5; s2++) {
var sw = kd * (1 - s2 / 5) + 0.4;
gmmB(0.6, kd * 0.7 / 5, sw, "plaster", col, sd * (kw / 2 + 0.1), kh + kd * 0.7 * (s2 + 0.5) / 5, 0, kg);
gmmB(0.8, 0.25, 1, "stone", trim, sd * (kw / 2 + 0.1), kh + kd * 0.7 * (s2 + 1) / 5, sw / 2 - 0.4, kg);
gmmB(0.8, 0.25, 1, "stone", trim, sd * (kw / 2 + 0.1), kh + kd * 0.7 * (s2 + 1) / 5, -sw / 2 + 0.4, kg);
} });
gmmOnion(kg, 0, kh + kd * 0.7 - 0.4, 0, 1.6, rf);
}
else if (st === "burg") {
var top = kh * 0.62;
gmmB(kw + 0.6, kh - top, kd + 0.6, "plaster", 0xE8DCC0, 0, top + (kh - top) / 2, 0, kg);
[[kw + 0.6, 0, kd / 2 + 0.35, 0], [kw + 0.6, 0, -kd / 2 - 0.35, Math.PI], [kd + 0.6, kw / 2 + 0.35, 0, Math.PI / 2], [kd + 0.6, -kw / 2 - 0.35, 0, -Math.PI / 2]].forEach(function (s3) { gmmTimbers(kg, s3[0], kh - top, s3[1], top, s3[2], s3[3], 0x3A2414, 1); });
gmmB(kw + 0.4, kh * 0.62, kd + 0.4, "stone", col, 0, kh * 0.31, 0, kg);
gmmGable(kg, kw + 0.6, kd + 0.6, kh, kd * 0.8, "tile", rf, 0.6, "plaster", 0xE8DCC0);
var bf = gmmG(kw / 2 + 3, 0, -kd / 2 + 2, kg);
gmmC(4, 4.4, kh + 12, "stone", col, 0, (kh + 12) / 2, 0, bf, 16);
for (var mm = 0; mm < 12; mm++) {
var a = mm / 12 * Math.PI * 2;
if (mm % 2)
gmmB(1, 1.2, 0.8, "stone", col, Math.cos(a) * 4.1, kh + 12.6, Math.sin(a) * 4.1, bf, -a);
}
var bq = gmmTo(bf, 0, 0);
var BS = gmmRound(bq.x, bq.z, 4.6, -5, kh + 14);
BS.y0 = y0 - 5;
BS.y1 = y0 + kh + 14;
}
else if (st === "gothic") {
gmmGable(kg, kw, kd, kh, kd * 1.1, "slate", rf, 0.4, "stone", col);
[[-kw / 2, kd / 2], [kw / 2, kd / 2], [-kw / 2, -kd / 2], [kw / 2, -kd / 2]].forEach(function (q) { var tg = gmmG(q[0], 0, q[1], kg); gmmC(1.6, 1.6, kh + 5, "stone", col, 0, (kh + 5) / 2, 0, tg, 10); var sp3 = gmmK(2, 8, "slate", rf, 0, kh + 9, 0, tg, 8); });
var ct = gmmG(0, kh + kd * 0.7, 0, kg);
gmmB(3, 4, 3, "stone", col, 0, 2, 0, ct);
gmmK(2.4, 9, "slate", rf, 0, 8.5, 0, ct, 4).rotation.y = Math.PI / 4;
}
else {
gmmGable(kg, kw, kd, kh, kd * 0.75, "tile", rf, 0.4, "stone", col);
var bt = gmmG(-kw / 2 - 2, 0, -kd / 2 + 3, kg);
gmmC(3.2, 3.6, kh + 16, "stone", col, 0, (kh + 16) / 2, 0, bt, 18);
gmmC(3.7, 3.7, 0.6, "stone", trim, 0, kh + 16, 0, bt, 18);
gmmK(4.2, 13, "tile", rf, 0, kh + 22.8, 0, bt, 18);
gmmLancet(bt, 0, kh + 12, 3.22, 0, 0.8, 1.4, { frame: trim, lit: 0xFFC070 });
var btq = gmmTo(bt, 0, 0);
var RS = gmmRound(btq.x, btq.z, 3.8, -5, kh + 18);
RS.y0 = y0 - 5;
RS.y1 = y0 + kh + 18;
}
for (var i = 0; i < Math.round(kw / 3); i++)
for (var f = 0; f < 3; f++) {
var wx = -kw / 2 + 1.5 + i * 3, wy = 4 + f * (kh - 6) / 2.2, lit = o.lit && (i + f) % 3 === 1 ? 0xFFC070 : 0;
if (st === "gothic" || st === "rose")
gmmLancet(kg, wx, wy, kd / 2 + 0.12, 0, 0.9, 2, { lit: lit, frame: trim });
else
gmmWindow(kg, wx, wy, kd / 2 + 0.12, 0, 1, st === "schloss" ? 2.2 : 1.6, { lit: lit, frame: trim, shutters: st === "burg" ? 0x5A2A1A : 0 });
}
for (var j = 0; j < Math.round(kd / 4); j++) {
[-1, 1].forEach(function (sd) { gmmWindow(kg, sd * (kw / 2 + 0.12), 6 + (j % 2) * 5, -kd / 2 + 2 + j * 4, sd * Math.PI / 2, 0.9, 1.6, { frame: trim }); });
}
gmmSolidIn(g, kx, kz, kw + 0.4, kd + 0.4, -5, kh + 10);
var dr = gmmDoor(kg, 0, 0, kd / 2 + 0.08, 0, 2.4, 3.6, 0x5A3A1E, { arch: 1, frame: trim });
if (st === "schloss" || st === "gothic") {
for (var s4 = 0; s4 < 4; s4++)
gmmB(5 - s4 * 0.4, 0.25, 0.9, "stone", trim, 0, 0.12 + s4 * 0.0, kd / 2 + 0.8 + s4 * 0.0, kg);
}
gmmB(gw, 0.2, zf - (kz + kd / 2), "paving", 0x9A9488, kx / 2, 0.05, (kz + kd / 2 + zf) / 2, g);
var cw = gmmTo(g, -Math.min(w / 4, fx - 2), (kz + kd / 2 + zf) / 2);
gmmWell(p, cw.x, cw.z, { ry: ry, roof: st === "schloss" ? 0x5A9A84 : 0x6A4A2E });
for (var bb = 0; bb < 4; bb++) {
var bp = gmmTo(g, fx - 4 - (bb % 2) * 1.3, zf - 6 - ((bb / 2) | 0) * 1.3);
gmmC(0.45, 0.4, 1.1, "wood", 0x6A4A2E, bp.x, y0 + 0.55, bp.z, p, 10);
}
var dp = gmmTo(g, kx, kz + kd / 2 + 1.8), gate = gmmTo(g, 0, zf + 4);
return { g: g, door: dp, gate: gate, ry: ry, y: y0, keepZ: kz, kd: kd };
},
function (p, x, z, o) {
o = o || {};
var y = gmmGround(x, z), g = gmmG(x, y, z, p, o.ry || 0);
gmmC(1.3, 1.4, 1.1, "stone", 0x9A9488, 0, 0.55, 0, g, 16);
gmmC(1.05, 1.05, 0.05, null, 0, 0, 0.9, 0, g, 16).material = gmmShiny(0x10202E, 90);
[-1.15, 1.15].forEach(function (xx) { gmmB(0.16, 2.6, 0.16, "wood", 0x5A3A22, xx, 1.6, 0, g); });
var rf = gmmGable(g, 2.8, 2.2, 2.9, 0.9, o.roofKind || "shingle", o.roof || 0x6A4A2E, 0.15, "wood", 0x5A3A22);
var ax = gmmC(0.08, 0.08, 2.3, "wood", 0x6A4A2E, 0, 2.2, 0, g, 8);
ax.rotation.z = Math.PI / 2;
gmmB(0.4, 0.05, 0.05, null, 0x2A2A2A, 1.3, 2.0, 0, g);
gmmC(0.18, 0.15, 0.3, "wood", 0x6A4A2E, 0.2, 1.5, 0, g, 8);
gmmC(0.01, 0.01, 0.7, null, 0x3A3A3A, 0.2, 1.95, 0, g, 4);
gmmRound(x, z, 1.5, -5, 2.5);
return g;
},
function (p, a, b, col, h) {
var dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz), n = Math.max(1, Math.round(L / 2.4)), ry = Math.atan2(-dz, dx);
for (var i = 0; i <= n; i++) {
var x = a[0] + dx * i / n, z = a[1] + dz * i / n;
gmmB(0.14, h || 1.2, 0.14, "wood", col || 0x6A5038, x, gmmGround(x, z) + (h || 1.2) / 2, z, p);
}
var mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2, my = gmmGround(mx, mz);
[0.4, 0.85].forEach(function (f) { gmmB(L, 0.1, 0.06, "wood", col || 0x6A5038, mx, my + (h || 1.2) * f, mz, p, ry); });
},
function (x, z) {
var L = gmmLandList(), best = null, bt = 9;
for (var i = 0; i < L.length; i++) {
var A = L[i], dx = x - A.x, dz = z - A.z;
if (Math.abs(dx) > A.R * 1.2 || Math.abs(dz) > A.R * 1.2)
continue;
var t = Math.hypot(dx, dz) / A.R;
if (t < bt) {
bt = t;
best = A;
}
}
if (!best) {
GMM_LK.k = null;
GMM_LK.w = 0;
GMM_LK.L = null;
return GMM_LK;
}
var edge = 0.92 + 0.2 * (wNoise(x * 0.006 + 3, z * 0.006 + 9, 2) - 0.5);
GMM_LK.k = best.k;
GMM_LK.L = best;
GMM_LK.w = bt >= edge ? 0 : bt < edge - 0.22 ? 1 : gmmSmooth(bt - (edge - 0.22), 0.22);
return GMM_LK;
},
function (x, z) {
var a = 0.35, u = x * Math.cos(a) + z * Math.sin(a), v = -x * Math.sin(a) + z * Math.cos(a), W = 46, H = 92, fu = u / W, fv = v / H, iu = Math.floor(fu), iv = Math.floor(fv);
return { id: gmmHash(iu, iv), edge: Math.min(fu - iu, 1 - (fu - iu)) * W < Math.min(fv - iv, 1 - (fv - iv)) * H ? Math.min(fu - iu, 1 - (fu - iu)) * W : Math.min(fv - iv, 1 - (fv - iv)) * H, row: (u * 0.9) % 2.2 };
},
function () {
if (GMM_POOLS)
return GMM_POOLS;
var P = [];
GMM_POOLS = P;
gmmLandList().forEach(function (A) {
if (A.k !== "marsh")
return;
var R = wRand(9100 + Math.round(A.x * 3 + A.z)), got = 0;
for (var t = 0; t < 60 && got < 9; t++) {
var a = R() * 6.283, d = A.pr + 20 + R() * (A.R * 0.8 - A.pr - 20), x = A.x + Math.cos(a) * d, z = A.z + Math.sin(a) * d, r = 4 + R() * 7;
if (gmmClearOf(x, z) < r + 18 || gmmRoadD(x, z) < r + 12)
continue;
if (P.some(function (Q) { return Math.hypot(Q.x - x, Q.z - z) < Q.r + r + 20; }))
continue;
var y = 1e9;
for (var q = 0; q < 12; q++) {
var qa = q * 0.5236;
y = Math.min(y, gmmLandRaw(x + Math.cos(qa) * (r + 8), z + Math.sin(qa) * (r + 8), true));
}
P.push({ x: x, z: z, r: r, y: y });
got++;
}
});
return P;
},
function (x, z, noPool) {
var h = gmmLandRaw0(x, z), L = gmmLandK(x, z);
if (L.k === "crag" && L.w > 0) {
var c = gmmClearOf(x, z);
if (c > 10) {
var ramp = Math.min(1, (c - 10) / 90), rn = 1 - Math.abs(2 * wNoise(x * 0.011 + 5, z * 0.011 + 2, 4) - 1);
h += L.w * ramp * (rn * rn * 26 + wNoise(x * 0.05, z * 0.05, 2) * 5);
}
}
else if (L.k === "marsh" && L.w > 0) {
h = h * (1 - 0.75 * L.w) + (GMM_CY["m" + L.L.key] === undefined ? (GMM_CY["m" + L.L.key] = gmmLandRaw0(L.L.x, L.L.z)) : GMM_CY["m" + L.L.key]) * 0.75 * L.w;
var p = noPool ? null : gmmPoolAt(x, z);
if (p) {
var k = gmmSmooth(Math.max(0, p.d - p.Q.r * 0.6), p.Q.r * 0.4 + 6);
h = h * (1 - k) + (p.Q.y - 1.0) * k;
}
}
return h;
},
function (x, z) {
var h = wFbm(x * 0.004 + 11, z * 0.004 + 7, 5, 4) * 14 - 6;
GMM_HILLS.forEach(function (H) { h += H[3] * gmmSmooth(Math.hypot(x - H[0], z - H[1]), H[2]); });
if (z > 800) {
var s = gmmShore(x);
if (z > s - 70) {
var t = Math.min(1, (z - (s - 70)) / 70);
h = h * (1 - t) + (0.5 + (s - z) * 0.02) * t;
}
if (z > s)
h = -(z - s) * 0.12 - 0.4;
}
var lk = Math.hypot(x - GMM_AT.lake.x, z - GMM_AT.lake.z);
if (lk < GMM_AT.lake.r + 30)
h = h * (1 - gmmSmooth(lk, GMM_AT.lake.r + 30)) + (-3.2) * gmmSmooth(lk, GMM_AT.lake.r + 30);
return h;
},
function (x, z) {
var h = gmmLandRaw(x, z), F = gmmFlats();
for (var i = 0; i < F.length; i++) {
var f = F[i], d = Math.hypot(x - f[0], z - f[1]);
if (d < f[2] + 40) {
var y = f[3] !== null ? f[3] : gmmCentre(f), k = gmmSmooth(Math.max(0, d - f[2] * 0.7), f[2] * 0.3 + 40);
h = h * (1 - k) + y * k;
}
}
var rd = gmmRoadD(x, z);
if (rd < 5)
h -= 0.25 * (1 - rd / 5);
var e = Math.max(0, Math.max(Math.abs(x), Math.abs(z)) - 1150);
h += e * e * 0.01;
return h;
},
function (x, z, h) {
var c = 0x5E7A3A, n = wNoise(x * 0.02, z * 0.02, 5);
if (gmmForestD(x, z) > 0.5)
c = n > 0.5 ? 0x4A5A2E : 0x54603A;
else
c = n > 0.5 ? 0x6A8A3E : 0x5E7E3A;
if (Math.max(Math.abs(x), Math.abs(z)) > 1150)
c = 0x3E4A2A;
else if (h > 30)
c = 0x6A6A5A;
else if (h > 22)
c = 0x5A6A42;
var L = gmmLandK(x, z);
if (L.w > 0)
c = gmmMix(c, gmmLandCol(L.k, x, z, h, n), L.w);
if (Math.hypot(x - GMM_AT.winter.x, z - GMM_AT.winter.z) < GMM_AT.winter.r + 90)
c = 0xC8D0D6;
if (z > gmmShore(x) - 30)
c = 0xC8B890;
if (Math.hypot(x, z) < GMM_AT.town.r - 10)
c = 0x8A8270;
var rd = gmmRoadD(x, z);
if (rd < 3.6)
c = 0x8A7458;
else if (rd < 5)
c = 0x76704A;
if (Math.hypot(x - GMM_AT.lake.x, z - GMM_AT.lake.z) < GMM_AT.lake.r + 4)
c = 0x5A5A3A;
return c;
},
function (k, x, z, h, n) {
var m = wNoise(x * 0.045 + 7, z * 0.045 + 1, 3);
if (k === "heath")
return m > 0.7 ? 0x9A8C6A : m > 0.42 ? (n > 0.5 ? 0x5A4650 : 0x64505A) : m > 0.25 ? 0x76684A : 0x5A5838;
if (k === "marsh") {
var p = gmmPoolAt(x, z);
if (p && p.d < p.Q.r + 5)
return 0x3A4430;
return m > 0.6 ? 0x8A845A : m > 0.35 ? 0x4E5A34 : 0x5A6A3A;
}
if (k === "crag")
return h > 18 || m > 0.6 ? (n > 0.5 ? 0x7E7C74 : 0x8E8A80) : m > 0.4 ? 0x6A6A58 : 0x56603E;
if (k === "fields") {
var F = gmmField(x, z);
if (F.edge < 3)
return 0x46562C;
var i = F.id;
return i < 0.3 ? 0xC8B060 : i < 0.5 ? 0xB0A050 : i < 0.7 ? 0x7A9A3E : i < 0.85 ? 0x6E5438 : 0x8AA048;
}
if (k === "pasture")
return m > 0.5 ? 0x74A43C : 0x6A983A;
if (k === "orchard")
return m > 0.55 ? 0x78A040 : 0x6A9038;
if (k === "oak")
return m > 0.5 ? 0x5A5432 : 0x4E5430;
if (k === "beech")
return m > 0.5 ? 0x7A6440 : 0x5E6234;
if (k === "vine") {
var r = ((z * 0.45) % 2 + 2) % 2;
return r < 0.7 ? 0x6A5A3E : (m > 0.5 ? 0x6A8A34 : 0x5E7A30);
}
if (k === "coast")
return m > 0.5 ? 0xD0C090 : 0xA8A060;
return 0x5E7A3A;
},
function (G) {
gmmPools();
var n = GMM.lite ? 170 : 250, S = 2500;
var mesh = wGround(S, n, function (x, z) { var h = gmmLand(x, z); return [h, gmmGroundCol(x, z, h)]; });
mesh.receiveShadow = true;
G.add(mesh);
GMM.ground = mesh;
var sm = new THREE.MeshPhongMaterial({ color: 0x2A6A7A, shininess: 80, specular: 0x8AA0B0, transparent: true, opacity: 0.92 });
var sea = new THREE.Mesh(new THREE.PlaneGeometry(2600, 500, 1, 1), sm);
sea.rotation.x = -Math.PI / 2;
sea.position.set(0, -1.0, 1250);
G.add(sea);
GMM.sea = sea;
var lm = new THREE.MeshPhongMaterial({ color: 0x1E3A42, shininess: 90, specular: 0x9AB0C0, transparent: true, opacity: 0.9 });
var lake = new THREE.Mesh(new THREE.CircleGeometry(GMM_AT.lake.r + 3, 48), lm);
lake.rotation.x = -Math.PI / 2;
lake.position.set(GMM_AT.lake.x, -0.8, GMM_AT.lake.z);
G.add(lake);
var pm = new THREE.MeshPhongMaterial({ color: 0x2A3A34, shininess: 100, specular: 0xA0B0B8, transparent: true, opacity: 0.9 });
gmmPools().forEach(function (Q) { var w = new THREE.Mesh(new THREE.CircleGeometry(Q.r + 7.5, 28), pm); w.rotation.x = -Math.PI / 2; w.position.set(Q.x, Q.y - 0.3, Q.z); G.add(w); });
},
function () {
var R = GMM.room, z = GMM.zone, base;
if (R)
base = GMM_ENV[R.env || "inside"] || GMM_ENV.inside;
else {
var lk = GMM_LANDS[z] && GMM_LANDS[z][0];
base = GMM_ENV[{ hansel: "wood", wood: "forest", winter: "winter", fisher: "shore", dwarfs: "mountain", coffin: "mountain" }[z] || { heath: "heath", marsh: "fen", crag: "mountain", fields: "meadow", pasture: "meadow", orchard: "meadow", oak: "oakwood", beech: "oakwood", vine: "vine" }[lk] || "day"];
}
var E = {};
for (var k in base)
E[k] = base[k];
if (z === "fisher" && !R && GMM.fish) {
var F = GMM_FISH[GMM.fish.st] || GMM_FISH[0];
E.top = F.sky;
E.low = F.low;
E.fog = F.low;
E.sun = F.sun;
}
if (GMM.snow > 0 && !R) {
E.hemi += 0.15;
E.fog = 0xE0E8F0;
}
return E;
},
function (G) {
var sun = new THREE.Mesh(new THREE.SphereGeometry(36, 20, 14), new THREE.MeshBasicMaterial({ color: 0xFFF4D8, fog: false }));
sun.position.set(1300, 800, 1000);
G.add(sun);
var halo = wGlow(0xFFE8B0, 220, 0.22);
halo.position.copy(sun.position);
G.add(halo);
var moon = new THREE.Mesh(new THREE.SphereGeometry(30, 20, 14), new THREE.MeshBasicMaterial({ color: 0xF0EEE0, fog: false }));
moon.position.set(-1500, 900, -1700);
G.add(moon);
GMM.moon = moon;
var soft = wTex(128, 128, function (x, W, H) { var g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.6, "rgba(255,255,255,.5)"); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H); });
var cm = new THREE.SpriteMaterial({ map: soft, color: 0xF4F6F8, transparent: true, opacity: 0.42, depthWrite: false, fog: false }), cm2 = new THREE.SpriteMaterial({ map: soft, color: 0xC8CED6, transparent: true, opacity: 0.35, depthWrite: false, fog: false });
var cg = new THREE.Group();
G.add(cg);
GMM.clouds = cg;
for (var i = 0; i < (GMM.lite ? 7 : 14); i++) {
var R = wRand(500 + i), a = R() * 6.283, rr = 120 + R() * 520, cx = Math.cos(a) * rr, cy = 560 + R() * 120, cz = Math.sin(a) * rr, n = 5 + (R() * 4 | 0);
for (var k = 0; k < n; k++) {
var sp = new THREE.Sprite(k % 3 === 2 ? cm2 : cm), w = 160 + R() * 200;
sp.scale.set(w, w * 0.32, 1);
sp.position.set(cx + (R() - 0.5) * 220, cy + (R() - 0.5) * 24, cz + (R() - 0.5) * 120);
cg.add(sp);
}
}
},
function (x, z) {
if (Math.abs(x) > 1230 || Math.abs(z) > 1230)
return 0;
if (z > gmmShore(x) - 40)
return 0;
var t = Math.hypot(x, z);
if (t < GMM_AT.town.r + 30)
return 0;
var F = gmmFlats();
for (var i = 0; i < F.length; i++) {
var f = F[i], d = Math.hypot(x - f[0], z - f[1]);
if (d < f[2] * 0.85)
return 0;
if (d < f[2] + 20)
return 0.15;
}
if (Math.hypot(x - GMM_AT.lake.x, z - GMM_AT.lake.z) < GMM_AT.lake.r + 10)
return 0;
if (GMM_POOLS) {
var pq = gmmPoolAt(x, z);
if (pq && pq.d < pq.Q.r + 2)
return 0;
}
if (Math.hypot(x - GMM_AT.winter.x, z - GMM_AT.winter.z) < 40)
return 0;
var rd = gmmRoadD(x, z);
if (rd < 6.5)
return 0;
var d = 0.55 + 0.45 * wNoise(x * 0.008, z * 0.008, 3);
if (rd < 14)
d *= 0.45;
if (t < GMM_AT.town.r + 90)
d *= 0.4;
var h = gmmLandRaw(x, z), edge = Math.max(Math.abs(x), Math.abs(z)) > 1150;
if (h > 34 && !edge)
d *= 0.3;
if (edge)
d = Math.max(d, 0.85);
var L = gmmLandK(x, z);
if (L.w > 0 && !edge) {
var k = L.k, dk = d;
if (k === "heath")
dk = d * 0.16;
else if (k === "pasture")
dk = d * 0.07;
else if (k === "orchard")
dk = 0.32;
else if (k === "vine")
dk = d * 0.06;
else if (k === "coast")
dk = d * 0.22;
else if (k === "fields") {
var F = gmmField(x, z);
dk = F.edge < 3 ? 0.55 : 0.01;
}
else if (k === "marsh") {
var p = gmmPoolAt(x, z);
dk = p && p.d < p.Q.r + 3 ? 0 : d * 0.5;
}
else if (k === "crag")
dk = h > 20 ? d * 0.25 : d * 0.6;
else if (k === "oak")
dk = d * 0.82;
d = d * (1 - L.w) + dk * L.w;
}
return d;
},
function (x, z, r) {
if (Math.hypot(x - GMM_AT.winter.x, z - GMM_AT.winter.z) < GMM_AT.winter.r + 180)
return "snow";
var h = gmmLandRaw(x, z);
var L = gmmLandK(x, z);
if (L.w > 0 && gmmHash(x, z) < L.w) {
var k = L.k;
if (k === "heath")
return r < 0.55 ? "birch" : "spruce";
if (k === "fields")
return r < 0.5 ? "oak" : r < 0.8 ? "beech" : "birch";
if (k === "pasture" || k === "orchard" || k === "vine")
return "oak";
if (k === "marsh")
return r < 0.7 ? "birch" : "oak";
if (k === "crag")
return r < 0.85 ? "spruce" : "birch";
if (k === "oak")
return r < 0.62 ? "oak" : r < 0.9 ? "beech" : "birch";
if (k === "beech")
return r < 0.78 ? "beech" : r < 0.9 ? "oak" : "birch";
if (k === "coast")
return "spruce";
}
if (h > 18 || z < -700)
return r < 0.82 ? "spruce" : "birch";
if (GMM_AT.hansel && Math.hypot(x - GMM_AT.hansel.x, z - GMM_AT.hansel.z) < 320)
return r < 0.5 ? "spruce" : "oak";
if (x > 300)
return r < 0.45 ? "spruce" : r < 0.8 ? "beech" : r < 0.94 ? "oak" : "birch";
return r < 0.55 ? "spruce" : r < 0.78 ? "beech" : r < 0.92 ? "oak" : "birch";
},
function (i, j) {
var C = gmmCell(), h = ((i * 73856093) ^ (j * 19349663)) >>> 0, R = wRand(h || 1), x = (i + 0.15 + 0.7 * R()) * C, z = (j + 0.15 + 0.7 * R()) * C, r = R();
if (r >= gmmForestD(x, z))
return null;
var k = gmmTreeKind(x, z, R()), s = 0.78 + 0.5 * R(), L = gmmLandK(x, z);
if (L.w > 0.5) {
if (L.k === "heath" && k === "spruce")
s *= 0.3;
else if (L.k === "heath")
s *= 0.7;
else if ((L.k === "orchard" || L.k === "vine") && k === "oak")
s *= 0.42;
else if (L.k === "coast")
s *= 0.55;
else if (L.k === "crag" && gmmLandRaw(x, z) > 20)
s *= 0.7;
else if (L.k === "oak" && k === "oak")
s *= 1.25;
else if (L.k === "pasture" && k === "oak")
s *= 1.3;
}
return { x: x, z: z, k: k, s: s, a: R() * 6.283 };
},
function (kind) {
var bark = [], core = [], leaf = [], M = function (x, y, z, sx, sy, sz, rx, rz) { var m = new THREE.Matrix4(); m.compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, 0, rz || 0)), new THREE.Vector3(sx || 1, sy || 1, sz || 1)); return m; };
function trunk(r0, r1, h, y, rx, rz, x, z) { bark.push({ geo: gmmMetre(new THREE.CylinderGeometry(r1, r0, h, 8)), m: M(x || 0, y + h / 2, z || 0, 1, 1, 1, rx, rz) }); }
function ball(x, y, z, r) { var ico = new THREE.IcosahedronGeometry(r, 0); core.push({ geo: ico, m: M(x, y, z, 0.78, 0.62, 0.78) }); leaf.push({ geo: ctuInstGeo("ball", { radius: r }), m: M(x, y, z, 1, 0.8, 1) }); }
function cone(y, r, h) { core.push({ geo: new THREE.ConeGeometry(r, h, 8), m: M(0, y, 0, 0.62, 0.92, 0.62) }); leaf.push({ geo: ctuInstGeo("cone", { radius: r * 1.08, height: h }), m: M(0, y, 0) }); }
var col = { oak: [0x5A4632, 0x3E6A2A], beech: [0x8A8478, 0x5A8A34], spruce: [0x4A3A2A, 0x2C4A2A], birch: [0xD8D4CA, 0x7AA244], snow: [0x4A3A2A, 0x5A6E62] }[kind];
if (kind === "oak") {
trunk(0.75, 0.5, 5, 0);
trunk(0.5, 0.32, 4, 4.8, 0.05, 0.08);
[[0, 3.5, 0.9], [2.1, 3.2, 0.8], [4.2, 3.0, 0.9], [5.3, 3.4, 0.7]].forEach(function (l) { trunk(0.3, 0.14, l[1], 6.5, Math.sin(l[0]) * l[2], Math.cos(l[0]) * l[2]); });
ball(0, 12.5, 0, 4.6);
ball(3.2, 10.6, 1.4, 3.8);
ball(-3, 10.8, -1.2, 3.8);
ball(0.8, 10.2, -3.2, 3.4);
ball(-1.2, 10.4, 3.2, 3.4);
}
else if (kind === "beech") {
trunk(0.5, 0.36, 10, 0);
trunk(0.36, 0.2, 5, 9.6, 0.06, -0.05);
ball(0, 17.5, 0, 4.2);
ball(2.6, 15, 0.8, 3.5);
ball(-2.4, 15.2, -0.8, 3.5);
ball(0.5, 14.4, -2.6, 3.2);
ball(-0.6, 14.6, 2.6, 3.2);
}
else if (kind === "birch") {
trunk(0.22, 0.14, 9, 0);
trunk(0.14, 0.08, 4, 8.7, 0.08, 0.06);
ball(0, 12, 0, 2.6);
ball(1.4, 10.4, 0.6, 2.2);
ball(-1.3, 10.6, -0.5, 2.2);
}
else {
trunk(0.42, 0.12, 22, 0);
cone(6.5, 4.6, 6);
cone(10.5, 3.7, 5.5);
cone(14.2, 2.8, 5);
cone(17.6, 1.9, 4.5);
cone(20.8, 1.0, 3.5);
}
return { bark: ctuBake(bark), core: ctuBake(core), leaf: (function () { var g = ctuBake(leaf); g.userData.ctuLeaf = 1; return g; })(), col: col, kind: kind };
},
function (G) {
var max = { oak: 0, beech: 0, spruce: 0, birch: 0, snow: 0 }, cap = GMM.lite ? 520 : 2600;
var T = { parts: [], cx: 1e9, cz: 1e9, cap: cap, grp: new THREE.Group() };
G.add(T.grp);
GMM_TREEK.forEach(function (k) {
var P = gmmTreeProto(k), n = k === "snow" ? Math.round(cap * 0.5) : k === "spruce" ? Math.round(cap * 1.5) : k === "birch" ? Math.round(cap * 0.5) : cap;
var bm = new THREE.MeshLambertMaterial({ color: P.col[0], map: gmmTexK("bark") }), cm = new THREE.MeshLambertMaterial({ color: ctuMul(P.col[1], 0.6) }), lm = ctuLeafMat(P.col[1]);
if (k === "snow") {
lm = new THREE.MeshLambertMaterial({ color: 0xE8F0F2, map: ctuLeafTex(), alphaTest: 0.42, side: THREE.DoubleSide });
cm = new THREE.MeshLambertMaterial({ color: 0x3A4E44 });
}
[[P.bark, bm], [P.core, cm], [P.leaf, lm]].forEach(function (q, qi) { var im = new THREE.InstancedMesh(q[0], q[1], n); im.count = 0; im.frustumCulled = false; im.castShadow = qi === 0; im.receiveShadow = false; T.grp.add(im); T.parts.push({ k: k, im: im, n: n }); });
if (k === "snow") {
var sg = P.core.clone();
var im2 = new THREE.InstancedMesh(sg, new THREE.MeshLambertMaterial({ color: 0xF4F8FA }), n);
im2.count = 0;
im2.frustumCulled = false;
T.grp.add(im2);
T.parts.push({ k: k, im: im2, n: n, snowCap: 1 });
}
});
GMM.trees = T;
gmmForestFill(0, GMM_AT.arrive.z, true);
},
function (x, z, force) {
var T = GMM.trees;
if (!T)
return;
if (!force && Math.hypot(x - T.cx, z - T.cz) < (GMM.lite ? 40 : 60))
return;
T.cx = x;
T.cz = z;
var C = gmmCell(), Rr = GMM.lite ? 230 : 400, ci = Math.floor(x / C), cj = Math.floor(z / C), n = Math.ceil(Rr / C), list = {}, m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3();
GMM_TREEK.forEach(function (k) { list[k] = []; });
for (var i = ci - n; i <= ci + n; i++)
for (var j = cj - n; j <= cj + n; j++) {
var t = gmmTreeIn(i, j);
if (!t)
continue;
var d = Math.hypot(t.x - x, t.z - z);
if (d > Rr)
continue;
if (d > Rr * 0.5 && ((i ^ j) & 1))
continue;
if (d > Rr * 0.75 && ((i + j) & 2))
continue;
list[t.k].push([t, d]);
}
T.parts.forEach(function (P) {
var L = list[P.k];
if (L.length > P.n) {
L.sort(function (a, b) { return a[1] - b[1]; });
L.length = P.n;
}
for (var i = 0; i < L.length; i++) {
var t = L[i][0];
e.set(0, t.a, 0);
q.setFromEuler(e);
v.set(t.x, gmmLand(t.x, t.z) - 0.15, t.z);
s.set(t.s, t.s * (P.snowCap ? 0.98 : 1), t.s);
m.compose(v, q, s);
if (P.snowCap) {
var m2 = new THREE.Matrix4().makeTranslation(0, 0.35, 0).premultiply(m);
P.im.setMatrixAt(i, m2.multiply(new THREE.Matrix4().makeScale(0.95, 0.5, 0.95)));
}
else
P.im.setMatrixAt(i, m);
}
P.im.count = L.length;
P.im.instanceMatrix.needsUpdate = true;
});
},
function () {
var parts = [], st = new THREE.CylinderGeometry(0.007, 0.01, 0.3, 4);
st.translate(0, 0.15, 0);
parts.push([st, 0x5A8A3A]);
var hd = new THREE.CylinderGeometry(0.06, 0.02, 0.02, 7);
hd.translate(0, 0.31, 0);
parts.push([hd, 0xFFFFFF]);
var lf = new THREE.SphereGeometry(0.04, 4, 3);
lf.scale(1, 0.25, 0.5);
lf.translate(0.03, 0.08, 0);
parts.push([lf, 0x4A7A2A]);
var pos = [], nor = [], col = [], c = new THREE.Color();
parts.forEach(function (P) {
var g = P[0].toNonIndexed(), a = g.attributes.position.array, n = g.attributes.normal.array;
c.setHex(P[1]);
for (var i = 0; i < a.length; i++) {
pos.push(a[i]);
nor.push(n[i]);
}
for (var j = 0; j < a.length / 3; j++)
col.push(c.r, c.g, c.b);
});
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
G.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
G.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
return G;
},
function () {
var pos = [], col = [], R = wRand(77), lo = new THREE.Color(0x2E4A1E), hi = new THREE.Color(0x8AA05A);
for (var b = 0; b < 11; b++) {
var a = R() * 6.283, h = 0.35 + R() * 0.45, w = 0.035, lean = 0.1 + R() * 0.25, ox = Math.cos(a) * 0.08, oz = Math.sin(a) * 0.08, tx = ox + Math.cos(a) * lean, tz = oz + Math.sin(a) * lean, px = -Math.sin(a) * w, pz = Math.cos(a) * w;
pos.push(ox - px, 0, oz - pz, ox + px, 0, oz + pz, tx, h, tz);
col.push(lo.r, lo.g, lo.b, lo.r, lo.g, lo.b, hi.r, hi.g, hi.b);
}
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
G.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
G.computeVertexNormals();
var n = G.attributes.normal;
for (var i = 0; i < n.count; i++)
n.setXYZ(i, 0, 1, 0);
return G;
},
function (G) {
if (typeof ctuFrondGeo !== "function")
return;
var U = { cx: 1e9, cz: 1e9, parts: [] }, cap = GMM.lite ? 160 : 900;
var fern = ctuFrondGeo(1.3), fm = new THREE.MeshLambertMaterial({ color: 0x3E6A2A, side: THREE.DoubleSide });
var bush = ctuInstGeo("ball", { radius: 1.1 }), bm = ctuLeafMat(0x4A7A30);
var rock = ctuRock(1.2, 7), rm = new THREE.MeshLambertMaterial({ color: 0x7A7A6E, map: gmmTexK("stone") });
var fl = gmmFlowerGeo(), flm = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, vertexColors: true });
var gr = gmmTuftGeo(), grm = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, vertexColors: true, side: THREE.DoubleSide });
[[fern, fm, "fern"], [bush, bm, "bush"], [rock, rm, "rock"], [fl, flm, "flower"], [gr, grm, "grass"]].forEach(function (p) { var N = p[2] === "fern" ? cap * 5 : p[2] === "flower" ? cap * 4 : p[2] === "grass" ? cap * 6 : cap, im = new THREE.InstancedMesh(p[0], p[1], N); if (p[2] === "flower")
im.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(N * 3), 3); im.count = 0; im.frustumCulled = false; G.add(im); U.parts.push({ k: p[2], im: im }); });
GMM.under = U;
},
function (x, z) {
var U = GMM.under;
if (!U || Math.hypot(x - U.cx, z - U.cz) < 30)
return;
U.cx = x;
U.cz = z;
var Rr = GMM.lite ? 90 : 150, C = 6, n = Math.ceil(Rr / C), ci = Math.floor(x / C), cj = Math.floor(z / C), m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(), cnt = { fern: 0, bush: 0, rock: 0, flower: 0, grass: 0 }, col = new THREE.Color();
var FLC = [0xF0F0F0, 0xE8C83A, 0xC83A8A, 0x5A7AE8, 0xE83A3A];
U.parts.forEach(function (P) { P.max = P.im.instanceMatrix.count; });
for (var i = ci - n; i <= ci + n; i++)
for (var j = cj - n; j <= cj + n; j++) {
var R = wRand(((i * 92821) ^ (j * 68917)) >>> 0 || 3), px = (i + R()) * C, pz = (j + R()) * C;
if (Math.hypot(px - x, pz - z) > Rr)
continue;
var d = gmmForestD(px, pz), r = R(), y = gmmLand(px, pz), snow = Math.hypot(px - GMM_AT.winter.x, pz - GMM_AT.winter.z) < GMM_AT.winter.r + 120;
if (gmmRoadD(px, pz) < 4 || gmmWaterAt(px, pz) !== null || Math.hypot(px, pz) < GMM_AT.town.r)
continue;
var k = null;
if (d > 0.2) {
k = r < 0.55 ? "fern" : r < 0.75 ? "bush" : r < 0.82 ? "rock" : r < 0.92 ? "grass" : null;
}
else if (d > 0) {
k = r < 0.3 ? "bush" : r < 0.6 ? "fern" : r < 0.8 ? "grass" : "flower";
}
else
k = r < 0.4 ? "flower" : r < 0.9 ? "grass" : r < 0.94 ? "rock" : null;
if (snow && k !== "rock")
k = r < 0.1 ? "rock" : null;
var L = gmmLandK(px, pz), lk = L.w > 0.5 ? L.k : null, fc = null, tall = 1, big = 1;
if (lk && !snow) {
if (lk === "heath") {
k = r < 0.6 ? "flower" : r < 0.9 ? "grass" : r < 0.95 ? "rock" : null;
fc = [0x7A3A7A, 0x9A4A8A, 0x8A5A9A, 0x6A3A6A];
}
else if (lk === "marsh") {
k = r < 0.72 ? "grass" : r < 0.82 ? "bush" : r < 0.88 ? "flower" : null;
tall = 1.9;
fc = [0xE8D040, 0xF0F0E8];
}
else if (lk === "crag") {
k = r < 0.4 ? "rock" : r < 0.65 ? "grass" : r < 0.72 ? "fern" : null;
big = 2.4;
}
else if (lk === "fields") {
var F = gmmField(px, pz);
k = F.edge < 3 ? (r < 0.6 ? "bush" : "flower") : (r < 0.5 ? "grass" : r < 0.56 ? "flower" : null);
fc = [0xD83A2A, 0x4A6AE0, 0xF0F0F0];
tall = F.edge < 3 ? 1 : 1.4;
}
else if (lk === "pasture" || lk === "orchard") {
k = r < 0.42 ? "flower" : r < 0.9 ? "grass" : null;
fc = [0xF0F0F0, 0xE8C83A, 0xF0E040, 0xC86AA0];
}
else if (lk === "oak" || lk === "beech") {
if (k === "flower" || k === "grass")
fc = [0xF0F0F0, 0x5A6AD8, 0x7A5AC8];
}
else if (lk === "vine") {
k = (((pz * 0.45) % 2 + 2) % 2) < 0.7 ? (r < 0.75 ? "bush" : null) : (r < 0.6 ? "grass" : null);
}
else if (lk === "coast") {
k = r < 0.65 ? "grass" : r < 0.7 ? "flower" : null;
tall = 1.5;
fc = [0xF0E040];
}
}
if (!k)
continue;
var P = U.parts.filter(function (p) { return p.k === k; })[0];
if (cnt[k] >= P.max)
continue;
var sc = k === "rock" ? (0.4 + R() * 1.1) * big : k === "bush" ? 0.7 + R() * 0.6 : k === "flower" ? 0.8 + R() * 0.6 : 0.8 + R() * 0.5;
if (k === "fern") {
for (var f = 0; f < 5 && cnt.fern < P.max; f++) {
e.set(0, R() * 6.283 + f * 1.25, 0.3);
q.setFromEuler(e);
v.set(px, y + 0.25, pz);
s.set(sc, sc, sc);
m.compose(v, q, s);
P.im.setMatrixAt(cnt.fern++, m);
}
continue;
}
if (k === "grass") {
for (var gg = 0; gg < 4 && cnt.grass < P.max; gg++) {
var gx = px + (R() - 0.5) * 4, gz = pz + (R() - 0.5) * 4, gs = (0.8 + R() * 0.9) * tall;
e.set(0, R() * 6.283, 0);
q.setFromEuler(e);
v.set(gx, gmmLand(gx, gz) - 0.02, gz);
s.set(gs, gs * (0.8 + R() * 0.6), gs);
m.compose(v, q, s);
P.im.setMatrixAt(cnt.grass++, m);
}
continue;
}
if (k === "flower") {
for (var g = 0; g < 3 && cnt.flower < P.max; g++) {
v.set(px + (R() - 0.5) * 1.4, y, pz + (R() - 0.5) * 1.4);
q.identity();
s.set(sc * 1.5, sc * 1.7, sc * 1.5);
m.compose(v, q, s);
P.im.setMatrixAt(cnt.flower, m);
var fl = fc || FLC;
col.setHex(fl[(R() * fl.length) | 0]);
P.im.setColorAt(cnt.flower, col);
cnt.flower++;
}
continue;
}
e.set(0, R() * 6.283, 0);
q.setFromEuler(e);
if (lk === "vine" && k === "bush") {
sc *= 0.55;
pz = Math.round(pz / 2.2) * 2.2 + 0.4;
}
v.set(px, y + (k === "bush" ? 0.6 * sc : 0.1), pz);
s.set(sc, sc * (k === "rock" ? 0.7 : 0.8), sc);
m.compose(v, q, s);
P.im.setMatrixAt(cnt[k]++, m);
}
U.parts.forEach(function (P) { P.im.count = cnt[P.k]; P.im.instanceMatrix.needsUpdate = true; if (P.im.instanceColor)
P.im.instanceColor.needsUpdate = true; });
},
function (G) {
var g = new THREE.Group();
G.add(g);
var signs = [[-40, -200, 0.6, ["← Hansel and Gretel · the Golden Goose", "↑ Snow White's castle"]], [150, -250, -0.4, ["↑ The twelve princesses' palace", "→ Briar Rose's castle"]],
[300, -60, 0, ["→ Aschenputtel · the road to Bremen", "↘ the Six Swans' hut"]], [250, 180, -0.8, ["→ The seven little goats · the Frog King"]], [40, 300, 0, ["↓ Rumpelstiltskin's mill · the mountain"]],
[-200, 180, 0.8, ["↙ Mother Holle's well · Rapunzel's tower", "↓ the sea and the fisherman"]], [-300, 40, 1.57, ["← Little Red Cap's path"]], [-600, -560, 0.6, ["← the giants' tree · the far snow"]],
[-520, 72, 0, ["↑ the juniper-tree"]], [-700, 100, 1.2, ["↖ Iron John's forest", "↙ the Goose-Girl · Snow-White and Rose-Red"]], [20, 330, 0.6, ["↙ Little Brother and Little Sister"]],
[540, 420, 0, ["↓ Hans in Luck's lane"]], [830, 620, -0.7, ["↗ King Thrushbeard's town"]], [940, -320, 0.4, ["↑ the Water of Life · the Glass Mountain"]]];
signs.forEach(function (s) { gmmSignPost(g, s[0] + 5, s[1] + 5, s[2], s[3].length > 1 ? s[3] : [s[3][0]], 4.4); });
},
function (g, y) {
var big = GMM_TOWN.map(function (H) { return [H[2], H[3], 16]; }).concat([[0, -60, 23], [-60, -60, 31], [6, GMM_GATE_Z, 23]]), placed = [], n = 0, rings = GMM.lite ? [80, 100] : [80, 100, 118, 138, 156, 174];
var SEC = [];
for (var si = 0; si < 8; si++) {
var sa = (si + 0.5) / 8 * Math.PI * 2, sg = new THREE.Group();
GMM.G.add(sg);
GMM.districts.push({ g: sg, x: Math.cos(sa) * 130, z: Math.sin(sa) * 130, r: 110, k: "town" });
SEC.push(sg);
}
function secOf(x, z) { var a = Math.atan2(z, x); if (a < 0)
a += Math.PI * 2; return SEC[Math.min(7, Math.floor(a / (Math.PI * 2) * 8))]; }
rings.forEach(function (r, ri) {
var step = (GMM.lite ? 13 : 10.6) / r;
for (var a = 0; a < Math.PI * 2; a += step) {
var x = Math.cos(a + ri * 0.07) * r, z = Math.sin(a + ri * 0.07) * r;
if (gmmRoadD(x, z) < 10 || Math.abs(x - 6) < 16 && z > 70)
continue;
if (big.some(function (p) { return Math.hypot(x - p[0], z - p[1]) < p[2]; }) || placed.some(function (p) { return Math.hypot(x - p[0], z - p[1]) < 9.6; }))
continue;
var out = ri % 2 === 1, Rr = wRand(3300 + n), ry = Math.atan2(-x, -z) + (out ? Math.PI : 0), w = 8 + Rr() * 2 | 0, d = 7 + Rr() * 2 | 0, tr = gmmTradeAt(n, ri), outer = ri >= 4;
var hg = secOf(x, z), B = gmmTimberHouse(hg, x, z, ry, { cheap: 1, w: tr ? 9.5 : w, d: tr ? 9 : d, fl: outer ? 2 + (Rr() < 0.3 ? 1 : 0) : 2 + (Rr() * 2 | 0), plaster: GMM_TOWNP[n % 7], timber: n % 3 ? 0x3A2414 : 0x5A3420, roof: GMM_TOWNR[(n * 3) % 7], roofKind: outer && n % 5 === 0 ? "thatch" : undefined,
shutters: [0x3A5A3A, 0x8A2A2A, 0x2A4A6A, 0x5A4A2A][n % 4], lit: Rr() < 0.6, dense: n % 4 === 0, sign: tr ? tr.sign : null, doorCol: [0x5A3A22, 0x2A4A3A, 0x6A2A1A, 0x3A3A4A][n % 4] });
if (tr)
gmmEnterable(B, tr.room, tr.name);
else
gmmEnterable(B, GMM_HOMEK[n % GMM_HOMEK.length][0], GMM_HOMEK[n % GMM_HOMEK.length][1]);
if (out && ri >= 3 && !GMM.lite && n % 2 === 0)
gmmGarden(hg, B, ry, w, d);
placed.push([x, z]);
n++;
}
});
gmmStreets(g);
return n;
},
function (g) {
var mat = gmmMat("paving", 0x9A9080);
GMM_STREETS.forEach(function (r, si) {
if (GMM.lite && si === 3)
return;
var geo = new THREE.RingGeometry(r - 3.4, r + 3.4, GMM.lite ? 96 : 160, 1);
geo.rotateX(-Math.PI / 2);
var P = geo.attributes.position, uv = geo.attributes.uv;
for (var i = 0; i < P.count; i++) {
var x = P.getX(i), z = P.getZ(i);
P.setY(i, gmmGround(x, z) + 0.04);
uv.setXY(i, x / 2.4, z / 2.4);
}
geo.computeVertexNormals();
var m = new THREE.Mesh(geo, mat);
g.add(m);
var lamps = Math.round(Math.PI * 2 * r / (GMM.lite ? 60 : 28));
for (var k = 0; k < lamps; k++) {
var a = (k + 0.5) / lamps * Math.PI * 2, lx = Math.cos(a) * (r + 2.6), lz = Math.sin(a) * (r + 2.6);
if (gmmRoadD(lx, lz) < 5 || gmmSolidAt(lx, lz, gmmGround(lx, lz)))
continue;
var lp = gmmG(lx, gmmGround(lx, lz), lz, g);
gmmC(0.07, 0.1, 3.2, null, 0x1A1A1A, 0, 1.6, 0, lp, 6);
gmmLantern(lp, 0, 3.4, 0);
}
if (si === 1 || si === 2)
for (var w = 0; w < 3; w++) {
var wa = w * 2.1 + si * 0.6, wx = Math.cos(wa) * r, wz = Math.sin(wa) * r;
if (gmmRoadD(wx, wz) > 6 && !gmmSolidAt(wx, wz, gmmGround(wx, wz)))
gmmWell(g, wx, wz, { ry: wa });
}
});
var lanes = GMM_ROADS.map(function (R) { return R; }).concat([[[6, GMM_GATE_Z + 6], [6, 40]]]);
lanes.forEach(function (R) {
var pts = [];
for (var i = 0; i < R.length - 1; i++) {
var a = R[i], b = R[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / 4));
for (var k = 0; k <= n; k++) {
var x = a[0] + (b[0] - a[0]) * k / n, z = a[1] + (b[1] - a[1]) * k / n;
if (Math.hypot(x, z) < GMM_WALL_R + 6 && Math.hypot(x, z) > 36)
pts.push([x, z]);
}
}
if (pts.length < 2)
return;
var pos = [], uv = [], idx = [];
pts.forEach(function (p, i) {
var q = pts[Math.min(pts.length - 1, i + 1)], o = pts[Math.max(0, i - 1)], dx = q[0] - o[0], dz = q[1] - o[1], L = Math.hypot(dx, dz) || 1, nx = -dz / L * 3.6, nz = dx / L * 3.6;
[[p[0] + nx, p[1] + nz], [p[0] - nx, p[1] - nz]].forEach(function (v) { pos.push(v[0], gmmGround(v[0], v[1]) + 0.05, v[1]); uv.push(v[0] / 2.4, v[1] / 2.4); });
if (i < pts.length - 1 && Math.hypot(q[0] - p[0], q[1] - p[1]) < 6) {
var b0 = i * 2;
idx.push(b0, b0 + 1, b0 + 2, b0 + 1, b0 + 3, b0 + 2);
}
});
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
geo.setIndex(idx);
geo.computeVertexNormals();
var nn = geo.attributes.normal;
for (var j = 0; j < nn.count; j++)
if (nn.getY(j) < 0) {
idx.reverse();
geo.setIndex(idx);
geo.computeVertexNormals();
break;
}
g.add(new THREE.Mesh(geo, mat));
});
},
function (G) {
var g = new THREE.Group();
G.add(g);
GMM.districts.push({ g: g, x: 0, z: 0, r: 170, k: "town" });
var y = gmmGround(0, 0);
var sq = gmmAdd(new THREE.CircleGeometry(44, 64), gmmMat("paving", 0xA09484), 0, y + 0.03, 0, g);
sq.rotation.x = -Math.PI / 2;
sq.geometry.attributes.uv.array.forEach(function (v, i, a) { a[i] = v * 34; });
var f = gmmG(0, y, 0, g);
gmmC(5, 5.4, 0.9, "stone", 0xB0A898, 0, 0.45, 0, f, 24);
gmmC(4.6, 4.6, 0.1, null, 0, 0, 0.85, 0, f, 24).material = gmmShiny(0x2A4A5A, 90);
gmmC(0.7, 0.9, 3.2, "stone", 0xB0A898, 0, 1.6, 0, f, 12);
gmmC(1.8, 1.2, 0.4, "stone", 0xB0A898, 0, 3.3, 0, f, 16);
gmmC(0.4, 0.5, 1.6, null, 0x5A6A5A, 0, 4.3, 0, f, 10);
gmmS(0.35, 0x5A6A5A, 0, 5.35, 0, f, 10);
for (var j = 0; j < 4; j++) {
var sp = gmmAdd(new THREE.CylinderGeometry(0.02, 0.05, 1.2, 6), gmmSee(0xC8E8F8, 0.5), Math.cos(j * 1.57) * 1.4, 3.4, Math.sin(j * 1.57) * 1.4, f);
sp.rotation.z = Math.cos(j * 1.57) * 0.6;
sp.rotation.x = -Math.sin(j * 1.57) * 0.6;
}
gmmRound(0, 0, 5.6, -5, 1.2);
gmmSpot(0, 6, 3, "The fountain", "throw in a coin and make a wish", function () { gmmWish(); });
var stalls = [[-24, -22, 0.7, 0xC83A3A, "apples, pears, plums"], [24, -22, -0.7, 0x3A5AC8, "cheese and eggs"], [-30, 18, 2.1, 0x3A8A3A, "cabbages and turnips"], [30, 18, -2.1, 0xE8B020, "ribbons and thread"], [-12, -36, 0.2, 0x8A3AA8, "honey cakes"], [12, 36, 3.1, 0xD86A1A, "geese and hens"]];
stalls.forEach(function (s, i) {
var st = gmmG(s[0], y, s[1], g, s[2]);
[-1.4, 1.4].forEach(function (o) { gmmB(0.12, 2.5, 0.12, "wood", 0x5A4030, o, 1.25, -0.9, st); gmmB(0.12, 2.5, 0.12, "wood", 0x5A4030, o, 1.25, 0.9, st); });
gmmB(3.2, 0.9, 2, "wood", 0x6A4A30, 0, 0.45, 0, st);
var aw = gmmB(3.6, 0.08, 2.6, null, s[3], 0, 2.55, 0.1, st);
aw.rotation.x = 0.16;
for (var k = 0; k < 8; k++)
gmmS(0.1, [0xC82A2A, 0xE8C030, 0x6AA83A, 0xE8E0D0][(k + i) % 4], -1.2 + k * 0.34, 0.98, -0.3 + (k % 2) * 0.5, st, 6);
gmmSolidIn(st, 0, 0, 3.4, 2.2, -5, 2.6);
});
[[-34, 0], [34, 0], [0, -40], [0, 40], [-26, -26], [26, 26], [-26, 26], [26, -26]].forEach(function (p) { var lp = gmmG(p[0], y, p[1], g); gmmC(0.08, 0.12, 3.4, null, 0x1A1A1A, 0, 1.7, 0, lp, 8); gmmLantern(lp, 0, 3.6, 0); });
GMM_TOWN.forEach(function (H, i) {
var ry = Math.atan2(-H[2], -H[3]);
var B = gmmTimberHouse(g, H[2], H[3], ry, { w: H[4], d: H[5], fl: H[6], plaster: H[7], timber: H[8], roof: H[9], sign: H[10], shutters: [0x3A5A3A, 0x8A2A2A, 0x2A4A6A, 0x5A4A2A][i % 4], lit: 1, dense: i % 3 === 0 });
gmmEnterable(B, H[0], H[1]);
});
var th = gmmG(0, y, -60, g);
gmmB(26, 6, 14, "stone", 0xB8B0A0, 0, 3, 0, th);
for (var k = 0; k < 7; k++) {
gmmWindow(th, -10.5 + k * 3.5, 3.4, 7.1, 0, 1.2, 2.2, { frame: 0xD8D0C0 });
}
gmmB(26.6, 7, 14.6, "plaster", 0xE8DCC0, 0, 9.5, 0, th);
gmmTimbers(th, 26.6, 7, 0, 6, 7.35, 0, 0x3A2414, true);
for (var k2 = 0; k2 < 7; k2++) {
if (k2 === 3)
continue;
gmmWindow(th, -10.5 + k2 * 3.5, 9.8, 7.45, 0, 1.1, 1.8, { shutters: 0x7A2A2A, flowers: 1 });
}
gmmGable(th, 26.6, 14.6, 13, 8, "slate", 0x3E4652, 0.6, "plaster", 0xE8DCC0);
var tw = gmmG(0, 13, 0, th);
gmmB(4, 8, 4, "plaster", 0xE8DCC0, 0, 4, 0, tw);
gmmK(3.4, 7, "slate", 0x3E4652, 0, 11.5, 0, tw, 8);
var clk = gmmAdd(new THREE.CircleGeometry(1.3, 24), gmmMat(null, 0xF0E8D0), 0, 5, 2.02, tw);
gmmB(0.08, 0.9, 0.05, null, 0x1A1A1A, 0, 5.3, 2.06, tw);
gmmB(0.6, 0.08, 0.05, null, 0x1A1A1A, 0.25, 5, 2.06, tw);
gmmB(6, 0.3, 2, "stone", 0xB8B0A0, 0, 7.1, 8, th);
for (var b = 0; b < 9; b++)
gmmC(0.08, 0.08, 1, null, 0x1A1A1A, -2.8 + b * 0.7, 7.7, 8.9, th, 6);
gmmB(6, 0.08, 0.08, null, 0x1A1A1A, 0, 8.2, 8.9, th);
gmmDoor(th, 0, 0, 7.05, 0, 2.4, 3.6, 0x4A2A16, { arch: 1 });
var thB = { door: gmmTo(th, 0, 9), ry: 0, y: y };
gmmEnterable(thB, "townhall", "The town hall");
gmmSolidIn(th, 0, 0, 26.8, 15, -5, 30);
var sg = wSign(["RATHAUS", "the town hall of Kassel"], 5, 1, "#2A1A10", "#E8C890");
sg.position.set(0, 6.4, 7.2);
th.add(sg);
GMM.balcony = gmmTo(th, 0, 8.6);
GMM.balconyY = y + 7.3;
var ch = gmmG(-62, y, -62, g, 0.9), SC = 0xB08C78, SD = 0x9A7866, SL = 0x3A4250, GL = [0x3A4A9A, 0x9A2A3A, 0xC8A030, 0x2A6A5A, 0x6A3A8A];
gmmB(15.4, 1, 31, "stone", SD, 0, 0.3, 0, ch);
gmmB(15, 14, 30, "stone", SC, 0, 7.5, 0, ch);
gmmB(15.3, 0.4, 30.3, "stone", SD, 0, 14.4, 0, ch);
gmmB(15.3, 0.3, 30.3, "stone", SD, 0, 3.2, 0, ch);
gmmGable(ch, 30, 15, 14.5, 12, "slate", SL, 0.5, "stone", SC).rotation.y = Math.PI / 2;
for (var bt = 0; bt < 7; bt++) {
var bz = -15 + bt * 5;
[-1, 1].forEach(function (sd) { var bg = gmmG(sd * 7.5, 0, bz, ch); gmmB(1.6, 9, 1.3, "stone", SD, sd * 0.8, 4.5, 0, bg); gmmB(1.1, 4, 1.1, "stone", SD, sd * 0.55, 11, 0, bg); var cap = gmmPrism(1.1, 1.4, 1.2, "stone", SD, sd * 0.55, 13, 0, bg, Math.PI / 2); });
}
for (var w2 = 0; w2 < 6; w2++) {
var wz = -12.5 + w2 * 5;
[-1, 1].forEach(function (sd) {
gmmLancet(ch, sd * 7.56, 7.6, wz, sd * Math.PI / 2, 2, 7.2, { frame: SD, lit: GL[(w2 + (sd > 0 ? 2 : 0)) % 5] });
var mu = gmmG(sd * 7.62, 7.6, wz, ch, sd * Math.PI / 2);
gmmB(0.12, 7.2, 0.1, "stone", SD, 0, 0, 0.04, mu);
gmmB(2, 0.1, 0.1, "stone", SD, 0, 1.2, 0.04, mu);
});
}
var ap = gmmG(0, 0, -15, ch), apGeo = new THREE.CylinderGeometry(7.2, 7.2, 14, 4, 1, false, Math.PI / 2, Math.PI);
var apM = gmmAdd(gmmMetre(apGeo), gmmMat("stone", SC), 0, 7.5, 0, ap);
apM.rotation.y = Math.PI / 8 * 0;
var apR = gmmAdd(new THREE.ConeGeometry(7.6, 11, 4, 1, false, Math.PI / 2, Math.PI), gmmMat("slate", SL), 0, 14.4 + 5.5, 0, ap);
for (var aw = 0; aw < 4; aw++) {
var aa = Math.PI / 2 + Math.PI / 8 + aw * Math.PI / 4, ax = Math.sin(aa) * 6.7, az = Math.cos(aa) * 6.7;
gmmLancet(ap, ax, 7.6, az, aa, 1.6, 7, { frame: SD, lit: GL[aw % 5] });
gmmB(1.2, 10, 1.2, "stone", SD, Math.sin(aa + Math.PI / 8) * 7.4, 5, Math.cos(aa + Math.PI / 8) * 7.4, ap);
}
gmmSolidIn(ap, 0, -3.4, 13.6, 7, -5, 30);
var ct = gmmG(0, 0, 17.5, ch);
gmmB(9, 34, 9, "stone", SC, 0, 17, 0, ct);
[8, 16, 25].forEach(function (sy) { gmmB(9.4, 0.4, 9.4, "stone", SD, 0, sy, 0, ct); });
[[-4.5, -4.5], [4.5, -4.5], [-4.5, 4.5], [4.5, 4.5]].forEach(function (q) { gmmB(1.4, 30, 1.4, "stone", SD, q[0], 15, q[1], ct); gmmC(0.35, 0.45, 1.6, "stone", SD, q[0], 34.8, q[1], ct, 6); gmmK(0.55, 3.4, "stone", SD, q[0], 37.2, q[1], ct, 6); });
for (var fc = 0; fc < 4; fc++) {
var fg = gmmG(0, 0, 0, ct, fc * Math.PI / 2);
gmmLancet(fg, -1.4, 29, 4.52, 0, 1.2, 4, { frame: SD });
gmmLancet(fg, 1.4, 29, 4.52, 0, 1.2, 4, { frame: SD });
for (var lv = 0; lv < 5; lv++) {
gmmB(1.1, 0.1, 0.25, "wood", 0x3A2A1E, -1.4, 27.6 + lv * 0.6, 4.55, fg).rotation.x = 0.5;
gmmB(1.1, 0.1, 0.25, "wood", 0x3A2A1E, 1.4, 27.6 + lv * 0.6, 4.55, fg).rotation.x = 0.5;
}
var cf = gmmAdd(new THREE.CircleGeometry(1.5, 28), gmmMat(null, 0xEDE4CC), 0, 21.5, 4.53, fg);
var cr = gmmAdd(new THREE.RingGeometry(1.45, 1.7, 28), gmmShiny(0xC8A040, 80), 0, 21.5, 4.54, fg);
gmmB(0.1, 1.1, 0.05, null, 0x1A1A1A, 0, 21.9, 4.57, fg);
gmmB(0.8, 0.1, 0.05, null, 0x1A1A1A, 0.3, 21.5, 4.57, fg);
}
gmmC(4.2, 4.4, 4, "stone", SC, 0, 36, 0, ct, 8);
gmmC(4.5, 4.5, 0.4, "stone", SD, 0, 38, 0, ct, 8);
var spire = gmmK(4.3, 22, null, 0x5A9A84, 0, 49, 0, ct, 8);
spire.material = gmmShiny(0x5A9A84, 35);
gmmS(0.45, 0xD8B040, 0, 60.4, 0, ct, 10).material = gmmShiny(0xD8B040, 90);
gmmC(0.06, 0.06, 3, null, 0xD8B040, 0, 62, 0, ct, 6);
gmmB(1.2, 0.08, 0.08, null, 0xD8B040, 0, 62.6, 0, ct);
for (var od = 0; od < 3; od++) {
var ow = 4.4 - od * 0.6, oh = 6 - od * 0.5;
var of = gmmG(0, 0, 4.5 + 0.6 - od * 0.3, ct);
gmmB(0.6, oh, 0.6, "stone", od % 2 ? SC : SD, -ow / 2, oh / 2, 0, of);
gmmB(0.6, oh, 0.6, "stone", od % 2 ? SC : SD, ow / 2, oh / 2, 0, of);
gmmPrism(ow + 0.6, ow * 0.7, 0.6, "stone", od % 2 ? SC : SD, 0, oh, 0, of);
}
gmmDoor(ct, 0, 0, 4.56, 0, 2.6, 4.2, 0x3A2414, { arch: 1, frame: SD });
var ro = gmmAdd(new THREE.CircleGeometry(1.8, 24), gmmGlowM(0x6A4A9A), 0, 12, 4.55, ct);
var rr = gmmAdd(new THREE.RingGeometry(1.75, 2.2, 24), gmmMat("stone", SD), 0, 12, 4.57, ct);
for (var sp2 = 0; sp2 < 8; sp2++) {
var sb = gmmB(0.12, 3.5, 0.06, null, SD, 0, 12, 4.58, ct);
sb.rotation.z = sp2 * Math.PI / 8;
}
gmmB(5, 0.3, 1.4, "stone", 0x9A9488, 0, 0.15, 5.4, ct);
gmmB(6, 0.15, 2, "stone", 0x9A9488, 0, 0.07, 6, ct);
gmmSolidIn(ch, 0, 0, 15.4, 30.4, -5, 40);
gmmSolidIn(ct, 0, 0, 9.6, 9.6, -5, 70);
gmmEnterable({ door: gmmTo(ct, 0, 7.6), ry: 0.9, y: y }, "church", "St Martin's church");
for (var gv = 0; gv < 18; gv++) {
var side = gv % 2 ? 1 : -1, gz = -12 + ((gv / 2) | 0) * 3.1, gx = side * (10.2 + ((gv * 7) % 3) * 0.8), gp = gmmTo(ch, gx, gz), gy = gmmGround(gp.x, gp.z);
var gs = gmmG(gp.x, gy, gp.z, g, 0.9 + side * Math.PI / 2 + ((gv * 13) % 5 - 2) * 0.05);
if (gv % 3 === 0) {
gmmB(0.14, 1.3, 0.14, "stone", 0x8A8478, 0, 0.65, 0, gs);
gmmB(0.7, 0.14, 0.14, "stone", 0x8A8478, 0, 0.95, 0, gs);
}
else {
gmmB(0.7, 0.9, 0.16, "stone", [0x9A9488, 0x8A8478, 0x7A766E][gv % 3], 0, 0.45, 0, gs);
var tp = gmmC(0.35, 0.35, 0.16, "stone", [0x9A9488, 0x8A8478, 0x7A766E][gv % 3], 0, 0.9, 0, gs, 12);
tp.rotation.x = Math.PI / 2;
}
gmmB(0.6, 0.05, 1.6, null, 0x3A4A2A, 0, 0.03, 0.9, gs);
}
[[-9, 26], [9, 26]].forEach(function (q) { var lp = gmmTo(ch, q[0], q[1]), ly = gmmGround(lp.x, lp.z); var cr = gmmG(lp.x, ly, lp.z, g, 0.9); gmmB(0.2, 2.6, 0.2, "stone", 0x8A8478, 0, 1.3, 0, cr); gmmB(1.1, 0.2, 0.2, "stone", 0x8A8478, 0, 1.9, 0, cr); gmmB(1.2, 0.3, 1.2, "stone", 0x7A766E, 0, 0.15, 0, cr); gmmRound(lp.x, lp.z, 0.8, -5, 3); });
[[-12, 29.5, -4, 29.5], [4, 29.5, 12, 29.5]].forEach(function (L) { var a2 = gmmTo(ch, L[0], L[1]), b2 = gmmTo(ch, L[2], L[3]); gmmWallLine(g, [a2.x, a2.z], [b2.x, b2.z], 1.1, 0x9A8070); });
var gt = gmmG(6, gmmGround(6, GMM_GATE_Z), GMM_GATE_Z, g);
[-5, 5].forEach(function (o) { gmmB(4, 10, 5, "stone", 0xA8A090, o, 5, 0, gt); gmmK(3.4, 5, "slate", 0x3E4652, o, 12.5, 0, gt, 4).rotation.y = Math.PI / 4; });
gmmB(14, 3, 5, "stone", 0xA8A090, 0, 9.5, 0, gt);
gmmSolidIn(gt, -5, 0, 4.2, 5.2, -5, 14);
gmmSolidIn(gt, 5, 0, 4.2, 5.2, -5, 14);
var gs = wSign(["KASSEL", "Hesse, 1812 · the town of the Brothers Grimm"], 6, 1.2, "#2A1A10", "#F0D8A0");
gs.position.set(0, 9.4, -2.6);
gs.rotation.y = Math.PI;
gt.add(gs);
gmmTownWall(g);
gmmTownFill(g, y);
gmmMarket(g, y);
gmmTownFolk(g);
var folk = [["a goose girl", { sex: "f", look: { topKind: "dress", top: 0x6A8AC8, layer: "apron", layerColor: 0xF0F0E8, hair: 0xE8C870, hairStyle: "braids" } }], ["a water carrier", { sex: "m", title: "laborer" }], ["a market woman", { sex: "f", look: { topKind: "dress", top: 0x8A3A3A, layer: "apron", layerColor: 0xE8E0D0, hat: "hood", hatColor: 0xF0F0F0 } }],
["a student from Marburg", { sex: "m", look: { top: 0x2A3A5A, bottom: 0x3A3A3A, hat: "tophat", hatColor: 0x1A1A1A } }], ["a soldier of the King of Westphalia", { sex: "m", title: "soldier" }], ["a farmer's boy", { sex: "m", child: 1, look: { top: 0xB8A070, bottom: 0x4A3A2A, hat: "cap", hatColor: 0x5A4A3A } }],
["a baker's girl", { sex: "f", child: 1, look: { topKind: "dress", top: 0xD8A0A0, hair: 0x8A4A2A, hairStyle: "braids" } }], ["a night watchman", { sex: "m", look: { top: 0x3A3A2A, bottom: 0x2A2A2A, hat: "brimmed", hatColor: 0x2A2A2A } }]];
folk.forEach(function (F, i) {
var a = i / folk.length * Math.PI * 2 + 0.4, r = 18 + (i % 3) * 9;
gmmPerson(100 + i, Math.cos(a) * r, Math.sin(a) * r, a, Object.assign({}, F[1], { wander: { r: 12, sp: 0.9 }, talk: { name: F[0], persona: "Someone in the market square of Kassel in 1812, the town where Jacob and Wilhelm Grimm, librarians, are writing down old tales. Napoleon's brother Jérôme is King of Westphalia and Kassel is his capital. You know the town, the market, the Grimms' house (they are quiet, kind, always writing), Dorothea Viehmann the storyteller at the inn, and the old tales everyone grew up with. Speak simply and warmly, of 1812.", greet: ["Good day! Fine weather for market.", "The Grimm brothers? Up the square, the tall house. Always writing.", "Mind the geese!"][i % 3] } }), g);
});
gmmBeast("horse", -16, 46, 0.4, 1, 4, g);
var cart = gmmG(-19, y, 49, g, 0.4);
gmmB(1.6, 0.6, 2.6, "wood", 0x6A4A2E, 0, 0.9, 0, cart);
[-0.9, 0.9].forEach(function (o) { var w3 = gmmC(0.55, 0.55, 0.12, "wood", 0x5A3A22, o, 0.55, 0.8, cart, 12); w3.rotation.z = Math.PI / 2; var w4 = gmmC(0.55, 0.55, 0.12, "wood", 0x5A3A22, o, 0.55, -0.8, cart, 12); w4.rotation.z = Math.PI / 2; });
for (var gq = 0; gq < 6; gq++)
gmmGoose(g, 14 + gq * 1.3, y, 30 + (gq % 2) * 1.2);
GMM.townY = y;
},
function (g, B, ry, w, d) {
var hg = gmmG(B.g.position.x, B.g.position.y, B.g.position.z, g, ry), z0 = -d / 2 - 0.6, z1 = -d / 2 - 4.6, gz = (z0 + z1) / 2;
function W(lx, lz) { var q = gmmTo(hg, lx, lz); return [q.x, q.z]; }
gmmFence(g, W(-w / 2, z0), W(-w / 2, z1), 0x6A5038, 1);
gmmFence(g, W(w / 2, z0), W(w / 2, z1), 0x6A5038, 1);
gmmFence(g, W(-w / 2, z1), W(w / 2, z1), 0x6A5038, 1);
gmmB(w - 0.6, 0.05, 3.6, null, 0x4A3A26, 0, 0.03, gz, hg);
for (var r = 0; r < 2; r++)
for (var c = 0; c < Math.floor(w / 1.1); c++) {
var cb = gmmS(0.26, r % 2 ? 0x5A8A3A : 0x7AAA4A, -w / 2 + 0.8 + c * 1.1, 0.2, gz - 0.8 + r * 1.6, hg, 7);
cb.scale.y = 0.7;
}
},
function (g) {
var R = GMM_WALL_R, n = Math.round(Math.PI * 2 * R / 9), prevGap = null, H = 6.5;
function gap(x, z) { return gmmRoadD(x, z) < 8.5 || (Math.abs(x - 6) < 8 && z > 0); }
for (var i = 0; i < n; i++) {
var a0 = i / n * Math.PI * 2, a1 = (i + 1) / n * Math.PI * 2, x0 = Math.cos(a0) * R, z0 = Math.sin(a0) * R, x1 = Math.cos(a1) * R, z1 = Math.sin(a1) * R, mx = (x0 + x1) / 2, mz = (z0 + z1) / 2;
var isGap = gap(mx, mz);
if (prevGap !== null && isGap !== prevGap) {
var tx = isGap ? x0 : x0, tz = isGap ? z0 : z0, ty = gmmGround(tx, tz), tg = gmmG(tx, ty, tz, g, -a0);
gmmB(4.6, H + 5, 4.6, "stone", 0xA09888, 0, (H + 5) / 2, 0, tg);
gmmK(3.8, 5, "slate", 0x3E4652, 0, H + 7.5, 0, tg, 4).rotation.y = Math.PI / 4;
gmmSolidIn(tg, 0, 0, 4.8, 4.8, -5, H + 8);
}
prevGap = isGap;
if (isGap)
continue;
gmmWallLine(g, [x0, z0], [x1, z1], H, 0x9A9284);
if (!GMM.lite) {
var dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz), ry = Math.atan2(-dz, dx), yy = gmmGround(mx, mz);
for (var m = 0; m < 3; m++) {
var f = (m + 0.5) / 3;
gmmB(1.1, 0.9, 0.7, "stone", 0x9A9284, x0 + dx * f, yy + H + 0.25, z0 + dz * f, g, ry);
}
}
if (i % 11 === 5) {
var cx = x1 * 1.01, cz = z1 * 1.01, cy = gmmGround(cx, cz);
gmmC(3.2, 3.5, H + 4, "stone", 0xA09888, cx, cy + (H + 4) / 2, cz, g, 14);
gmmK(3.9, 6, "slate", 0x3E4652, cx, cy + H + 7, cz, g, 14);
gmmRound(cx, cz, 3.6, -5, H + 6);
}
}
},
function (g, y) {
var n = GMM.lite ? 6 : GMM_STALLS.length, R0 = 19;
for (var i = 0; i < n; i++) {
var a = -Math.PI / 2 + 0.3 + (i / n) * Math.PI * 2 * 0.92, S = GMM_STALLS[i], x = Math.cos(a) * R0 * (i % 2 ? 1.12 : 1), z = Math.sin(a) * R0 * (i % 2 ? 1.12 : 1);
if (Math.abs(x) < 5 && z > 0)
x += 7;
var st = gmmG(x, y, z, g, Math.atan2(-x, -z) + Math.PI);
[-1.4, 1.4].forEach(function (o) { gmmB(0.12, 2.5, 0.12, "wood", 0x5A4030, o, 1.25, -0.9, st); gmmB(0.12, 2.5, 0.12, "wood", 0x5A4030, o, 1.25, 0.9, st); });
gmmB(3.2, 0.9, 1.6, "wood", 0x6A4A30, 0, 0.45, 0.2, st);
var aw = gmmB(3.6, 0.08, 2.6, null, [0xC8C0A8, 0xA83A2A, 0x3A5A8A, 0xD8B050][i % 4], 0, 2.55, 0.1, st);
aw.rotation.x = 0.16;
for (var k = 0; k < 9; k++)
gmmS(0.11, S[1], -1.2 + (k % 5) * 0.6, 0.98, 0.0 + ((k / 5) | 0) * 0.45, st, 6);
gmmB(0.6, 0.35, 0.45, "wood", 0x8A6A3A, -1, 0.18, 1.4, st);
gmmC(0.3, 0.25, 0.4, "wood", 0x9A7A4A, 1.1, 0.2, 1.3, st, 10);
gmmSolidIn(st, 0, 0.2, 3.4, 1.8, -5, 2.6);
var tp = gmmTo(st, 0, -1.2);
gmmPerson(150 + i, tp.x, tp.z, Math.atan2(-x, -z), { sex: S[2], look: S[2] === "f" ? { topKind: "dress", top: [0x6A5A7A, 0x8A3A3A, 0x3A5A4A, 0x5A4A3A][i % 4], layer: "apron", layerColor: 0xE8E0D0, hat: "hood", hatColor: 0xF0F0E8 } : { top: [0x5A4A3A, 0x3A4A5A, 0x6A5A3A][i % 3], bottom: 0x3A3A2A, layer: "apron", layerColor: 0xD8D0C0, hat: "cap", hatColor: 0x4A3A2A },
talk: { name: S[3], persona: "A trader at the market in Kassel's square in 1812, under King Jérôme of Westphalia. " + S[4] + " You know the town gossip, the Grimm brothers (always writing down tales), Dorothea Viehmann at the inn, and you grew up on the old tales. Haggle cheerfully; prices are in Kreuzer and Groschen. Speak simply, of 1812. Never mention films.", greet: "Fine " + S[0] + " here! Come and look, come and look." } }, g);
}
var R = wRand(4141), lots = GMM.lite ? 10 : 26;
for (var j = 0; j < lots; j++) {
var a2 = R() * Math.PI * 2, r2 = 10 + R() * 28, x2 = Math.cos(a2) * r2, z2 = Math.sin(a2) * r2;
if (Math.abs(x2) < 4 && z2 > 0)
continue;
var k2 = j % 4;
if (k2 === 0) {
gmmC(0.42, 0.38, 1.0, "wood", 0x6A4A2E, x2, y + 0.5, z2, g, 12);
gmmC(0.43, 0.43, 0.05, null, 0x2A2A2A, x2, y + 0.25, z2, g, 12);
gmmC(0.43, 0.43, 0.05, null, 0x2A2A2A, x2, y + 0.75, z2, g, 12);
gmmRound(x2, z2, 0.45, -5, 1.1);
}
else if (k2 === 1) {
var cr = gmmG(x2, y, z2, g, R() * 3);
gmmB(0.8, 0.55, 0.6, "wood", 0x8A6A42, 0, 0.28, 0, cr);
for (var q = 0; q < 5; q++)
gmmS(0.09, [0x6A9A3A, 0xC83A2A, 0xE8B030][q % 3], -0.25 + q * 0.12, 0.6, 0, cr, 6);
}
else if (k2 === 2) {
var sk = gmmS(0.35, 0xC8B898, x2, y + 0.3, z2, g, 8);
sk.scale.set(1, 1.3, 0.8);
}
else {
var bs = gmmC(0.35, 0.25, 0.35, "wood", 0xA88A5A, x2, y + 0.18, z2, g, 10);
}
}
var wg = gmmG(16, y, -14, g, 0.6);
gmmB(2, 0.5, 4, "wood", 0x6A4A2E, 0, 1.0, 0, wg);
var hay = gmmB(1.9, 1.2, 3.6, "thatch", 0xC8A860, 0, 1.85, 0, wg);
[-1.1, 1.1].forEach(function (o) { [-1.3, 1.3].forEach(function (o2) { var wh = gmmC(0.6, 0.6, 0.12, "wood", 0x5A3A22, o, 0.6, o2, wg, 14); wh.rotation.z = Math.PI / 2; }); });
gmmSolidIn(wg, 0, 0, 2.2, 4.2, -5, 3);
var hp = gmmTo(wg, 0, 3.6);
gmmBeast("horse", hp.x, hp.z, 0.6, 1, 9, g);
},
function (i, x, z, F, wr, parent) {
return gmmPerson(400 + i, x, z, (i * 1.7) % 6.28, { sex: F[1], look: F[2], wander: { r: wr, sp: 0.8 + (i % 3) * 0.15 }, talk: { name: F[0], persona: "Someone in the streets of Kassel in 1812, the capital of King Jérôme of Westphalia (Napoleon's brother), where the librarians Jacob and Wilhelm Grimm are collecting old tales. " + F[3] + " You grew up on the old tales. Speak simply and warmly, of 1812. Never mention films.", greet: F[4] } }, parent);
},
function (g) {
var sq = GMM.lite ? 5 : 14, st = GMM.lite ? 5 : 20, k = 0, R = wRand(808);
for (var i = 0; i < sq; i++) {
var a = R() * Math.PI * 2, r = 10 + R() * 24;
gmmFolkOne(k, Math.cos(a) * r, Math.sin(a) * r, GMM_FOLK[k % GMM_FOLK.length], 10, g);
k++;
}
var tries = 0;
while (k < sq + st && tries < 400) {
tries++;
var a2 = R() * Math.PI * 2, r2 = 60 + R() * 120, x = Math.cos(a2) * r2, z = Math.sin(a2) * r2;
if (gmmRoadD(x, z) > 5 || gmmSolidAt(x, z, gmmGround(x, z)))
continue;
gmmFolkOne(k, x, z, GMM_FOLK[k % GMM_FOLK.length], 8, g);
k++;
}
},
function () {
if (GMM_TEX.ginger)
return GMM_TEX.ginger;
var t = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#A0601E";
x.fillRect(0, 0, W, H);
var r = wRand(31);
for (var i = 0; i < 1600; i++) {
x.fillStyle = "rgba(" + (90 + r() * 60 | 0) + "," + (40 + r() * 30 | 0) + ",10,.35)";
x.fillRect(r() * W, r() * H, 2, 2);
}
x.strokeStyle = "#FFFFFF";
x.lineWidth = 7;
x.lineCap = "round";
for (var j = 0; j < 4; j++) {
x.beginPath();
for (var k = 0; k <= 16; k++) {
var px = k * W / 16, py = j * H / 4 + 20 + (k % 2 ? 10 : -6);
if (k === 0)
x.moveTo(px, py);
else
x.lineTo(px, py);
}
x.stroke();
}
var cols = ["#FF2A4A", "#2AC84A", "#FFD020", "#2A8AFF", "#FF7AC8"];
for (var d = 0; d < 26; d++) {
x.fillStyle = cols[d % 5];
x.beginPath();
x.arc(r() * W, r() * H, 6, 0, 7);
x.fill();
}
}, [1, 1]);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(0.4, 0.4);
return (GMM_TEX.ginger = t);
},
function (p, x, z, ry) {
var y = gmmGround(x, z), g = gmmG(x, y, z, p, ry), gm = new THREE.MeshLambertMaterial({ map: gmmGingerTex() });
gm.userData.ldShared = 1;
var w = 10, d = 8, h = 4.2;
gmmAdd(new THREE.BoxGeometry(w, 0.6, d), gmmMat(null, 0x7A4A1A), 0, 0.3, 0, g);
var walls = gmmAdd(gmmMetre(new THREE.BoxGeometry(w, h, d)), gm, 0, 0.6 + h / 2, 0, g);
var half = d / 2 + 0.8, rh = 3.4, ang = Math.atan2(rh, half), L = Math.hypot(half, rh);
[-1, 1].forEach(function (s) {
var rs = gmmB(w + 1.6, 0.7, L, null, 0xC8884A, 0, 0.6 + h + rh / 2, s * half / 2, g);
rs.rotation.x = s * ang;
var ic = gmmB(w + 1.7, 0.25, L + 0.1, null, 0xFF9AC8, 0, 0.6 + h + rh / 2 + 0.42 * Math.cos(ang), s * (half / 2 - 0.2 * Math.sin(ang)), g);
ic.rotation.x = s * ang;
for (var k = 0; k < 14; k++) {
var dr = gmmC(0.12, 0.05, 0.4 + (k % 3) * 0.2, null, 0xFFFFFF, -w / 2 - 0.6 + k * (w + 1.2) / 13, 0.6 + h - 0.05, s * (d / 2 + 0.75), g, 6);
}
for (var c = 0; c < 6; c++)
gmmS(0.28, [0xFF2A3A, 0x2AC84A, 0xFFD020, 0x2A8AFF, 0xFF7AC8, 0xA03AFF][c], -w / 2 + 1 + c * (w - 2) / 5, 0.6 + h + rh * 0.55, s * half * 0.42, g, 10);
});
gmmPrism(d, rh, 0.3, null, 0xC8884A, w / 2, 0.6 + h, 0, g, Math.PI / 2);
gmmPrism(d, rh, 0.3, null, 0xC8884A, -w / 2, 0.6 + h, 0, g, Math.PI / 2);
gmmB(w + 1.8, 0.5, 0.6, null, 0xFFFFFF, 0, 0.6 + h + rh + 0.1, 0, g);
[[-2.8, d / 2 + 0.05, 0], [2.8, d / 2 + 0.05, 0], [w / 2 + 0.05, 0, Math.PI / 2], [-w / 2 - 0.05, 0, -Math.PI / 2]].forEach(function (q) {
var wn = gmmG(q[0], 0.6 + h * 0.55, q[1], g, q[2]);
gmmAdd(new THREE.BoxGeometry(1.6, 1.6, 0.1), gmmSee(0xE8F8FF, 0.55), 0, 0, 0, wn);
gmmB(1.9, 0.2, 0.2, null, 0xFFFFFF, 0, 0.9, 0.05, wn);
gmmB(1.9, 0.2, 0.2, null, 0xFFFFFF, 0, -0.9, 0.05, wn);
gmmB(0.2, 1.8, 0.2, null, 0xFF4A6A, -0.9, 0, 0.05, wn);
gmmB(0.2, 1.8, 0.2, null, 0xFF4A6A, 0.9, 0, 0.05, wn);
});
gmmB(1.4, 2.4, 0.2, null, 0x4A2410, 0, 1.8, d / 2 + 0.08, g);
for (var b = 0; b < 6; b++)
gmmB(0.36, 0.36, 0.08, null, 0x5A2E14, -0.4 + (b % 2) * 0.8, 1.0 + ((b / 2) | 0) * 0.75, d / 2 + 0.2, g);
gmmS(0.1, 0xFFD020, 0.5, 1.8, d / 2 + 0.24, g, 8);
[[-w / 2 - 0.6, d / 2 + 1.2], [w / 2 + 0.6, d / 2 + 1.2], [-1.2, d / 2 + 0.6], [1.2, d / 2 + 0.6]].forEach(function (c, i) { var cs = gmmG(c[0], 0, c[1], g); for (var k = 0; k < 8; k++)
gmmC(0.18, 0.18, 0.3, null, k % 2 ? 0xFFFFFF : 0xE8202A, 0, 0.15 + k * 0.3, 0, cs, 10); gmmS(0.25, 0xE8202A, 0, 2.6, 0, cs, 10); });
for (var f = 0; f < 16; f++) {
var fx = -7 + f * 0.95;
gmmB(0.7, 0.95, 0.1, null, 0xD8A050, fx, 0.48, d / 2 + 4, g);
gmmS(0.12, [0xFF2A3A, 0x2AC84A, 0xFFD020, 0x2A8AFF][f % 4], fx, 1.0, d / 2 + 4.05, g, 8);
}
for (var s2 = 0; s2 < 10; s2++) {
var gp = gmmS(0.3, [0xFF2A3A, 0x2AC84A, 0xFFD020, 0x2A8AFF, 0xFF7AC8][s2 % 5], 0, 0.12, d / 2 + 0.8 + s2 * 0.32, g, 10);
gp.scale.y = 0.4;
gp.position.x = (s2 % 2 ? 0.5 : -0.5);
}
for (var l = 0; l < 6; l++) {
var lp = gmmG(-6 + l * 2.4, 0, -d / 2 - 2.5, g);
gmmC(0.04, 0.04, 1.4, null, 0xFFFFFF, 0, 0.7, 0, lp, 6);
var dd = gmmC(0.5, 0.5, 0.1, null, [0xFF2A8A, 0x2AC8FF, 0xFFD020][l % 3], 0, 1.5, 0, lp, 16);
dd.rotation.x = Math.PI / 2;
}
gmmC(0.5, 0.5, 2.4, null, 0xF2D8A0, 2.6, 0.6 + h + rh * 0.6, -1.2, g, 12);
gmmC(0.55, 0.55, 0.25, null, 0xFF9AC8, 2.6, 0.6 + h + rh * 0.6 + 1.2, -1.2, g, 12);
GMM.fx.push({ k: "smoke", x: x + Math.cos(ry) * 2.6, y: y + 0.6 + h + rh * 0.6 + 1.6, z: z - Math.sin(ry) * 2.6, list: [], t: 0 });
gmmSolidIn(g, 0, 0, w + 0.6, d + 0.6, -5, 10);
return { g: g, door: gmmTo(g, 0, d / 2 + 1.6), ry: ry, y: y + 0.6 };
},
function () {
var g = gmmDistrict("hansel", 220), A = GMM_AT.hansel;
var cot = gmmCottage(g, -470, -300 + 22, 0.6, { walls: "log", roofKind: "shingle", roof: 0x5A4630, w: 8, d: 6, lit: 0xFFB060 });
gmmEnterable(cot, "woodcutter", "The woodcutter's cottage");
gmmB(2.2, 1.2, 1, "wood", 0x6A4A2E, -470 + 5, gmmGround(-465, -274) + 0.6, -274, g);
for (var w = 0; w < 12; w++) {
var lg = gmmC(0.16, 0.16, 1.6, "bark", 0x5A4028, -470 + 6.5, gmmGround(-463, -276) + 0.2 + (w % 4) * 0.3, -276 + ((w / 4) | 0) * 0.34, g, 7);
lg.rotation.x = Math.PI / 2;
}
gmmPerson(201, -466, -268, 0.6, { sex: "m", title: "woodcutter", look: { top: 0x6A4A2A, bottom: 0x3A3A2A, beard: 1, hair: 0x6A5A4A }, talk: { name: "The woodcutter", persona: "The poor woodcutter of the Grimms' Hansel and Gretel (1812-1857): gentle, sorrowful, ashamed that he let his wife persuade him to leave the children in the forest in the famine. In the book his wife (the children's stepmother in later editions) has died while they were gone. Overjoyed when they come home with the witch's pearls and jewels. Never mention films.", greet: "Have you seen two children in the wood? A boy and a girl... Hansel and Gretel. My children." } }, g);
var gh = gmmGingerHouse(g, A.x - 40, A.z - 50, 0.5);
gmmEnterable(gh, "ginger", "The house of bread and cake");
var bird = gmmDove(g, A.x - 26, gmmGround(A.x - 26, A.z - 30) + 2.6, A.z - 30);
GMM.movers.push({ k: "hover", g: bird, y: bird.position.y, ph: 0 });
var tree = gmmG(A.x - 26, gmmGround(A.x - 26, A.z - 32), A.z - 32, g);
if (typeof ctuTree === "function")
ctuTree(tree, { h: 12, crown: 0x2E5A2A, limbs: 5, roots: 5, seed: 15 });
gmmSpot(A.x - 26, A.z - 30, 4, "A snow-white bird on a bough", "listen to it", function () { setStatus("🕊️ <b>A snow-white bird</b> sings so sweetly that the children stop to listen, and then it flies ahead of them, and they follow it to a little house... <i>(Grimm: the bird settles on the roof, and the house is made of bread, the roof of cake and the windows of clear sugar.)</i>"); });
gmmSpot(A.x, A.z, 6, "The middle of the wood", "start Hansel's pebble trail home", function () { gmmPebblesStart(); });
gmmSignPost(g, A.x + 6, A.z + 10, 0.3, ["THE DEEP WOOD", "where the pebbles shine by moonlight"], 4);
var L = GMM_AT.lake, ds = [L.x - 30, L.z - 46], dl = [L.x + 38, L.z + 44];
var duck = gmmDuck(g, ds[0] + 3, -0.7, ds[1] + 3, 2.2);
GMM.duck = duck;
GMM.movers.push({ k: "bob", g: duck, y: -0.75, ph: 1 });
gmmSpot(ds[0], ds[1], 5, "The great water: a white duck swimming", "ask the duck to carry you across", function () { gmmDuckRide(ds, dl); });
gmmB(3, 0.3, 8, "wood", 0x6A5038, dl[0] - 3, 0.1, dl[1] - 3, g, 0.8);
for (var m = 0; m < 20; m++) {
var R = wRand(700 + m), mx = A.x + (R() - 0.5) * 200, mz = A.z + (R() - 0.5) * 200;
if (Math.hypot(mx - gh.door.x, mz - gh.door.z) < 16)
continue;
var my = gmmGround(mx, mz);
gmmC(0.08, 0.1, 0.35, null, 0xF0E8D8, mx, my + 0.17, mz, g, 6);
var cap = gmmS(0.24, m % 3 ? 0xC82A1A : 0xA87A4A, mx, my + 0.38, mz, g, 10);
cap.scale.y = 0.5;
}
for (var o = 0; o < 3; o++) {
var ow = gmmBirdShape(g, A.x + 40 - o * 60, gmmGround(A.x + 40 - o * 60, A.z + 30) + 5, A.z + 30 + o * 10, 0.7, 0x7A6A4A, 0.05, 0x3A3A2A);
}
},
function () {
var g = gmmDistrict("redcap", 260), A = GMM_AT.redcap;
var mo = gmmCottage(g, -430, 74, Math.PI * 0.5 + 0.2, { walls: "plaster", roofKind: "thatch", roof: 0xB89858, w: 8, d: 6, shutters: 0x2A5A8A, flowers: 1 });
gmmEnterable(mo, "redmother", "Little Red Cap's home");
gmmPerson(211, -424, 82, 1.8, { sex: "f", child: 1, look: { topKind: "dress", top: 0xF0E8D8, layer: "apron", layerColor: 0xFFFFFF, hat: "hood", hatColor: 0xD81A1A, hair: 0xC88A4A, hairStyle: "braids", back: "cape", backColor: 0xD81A1A },
talk: { name: "Little Red Cap", persona: "Little Red Cap (Rotkäppchen) of the Grimms' tale (1812-1857), a sweet little girl given a red velvet cap by her grandmother, which she wears all the time. Her mother is sending her with cake and a bottle of wine to her sick grandmother, half an hour away through the wood, under the three big oak trees with the nut hedges. Mother said: walk properly, don't run off the path. She doesn't know what a wicked creature a wolf is. Talk like a cheerful child. Never mention films.", greet: "I'm taking cake to Grandmother! She lives in the wood, half an hour from here, under the three big oaks. Mother says I mustn't leave the path." } }, g);
var gx = A.x - 10, gz = A.z - 8, gr = gmmCottage(g, gx, gz, Math.PI / 2, { walls: "plaster", roofKind: "thatch", roof: 0xA88848, w: 9, d: 7, shutters: 0x3A6A3A, flowers: 1, lit: 0xFFC070 });
gmmEnterable(gr, "granny", "Grandmother's house");
[[-14, -10], [-12, 14], [10, -16]].forEach(function (o, i) { var t = gmmG(gx + o[0], gmmGround(gx + o[0], gz + o[1]), gz + o[1], g); if (typeof ctuTree === "function")
ctuTree(t, { h: 24, tr: 1.4, crown: 0x3A6A2A, limbs: 8, roots: 7, spread: 1.2, big: 1, seed: 30 + i }); gmmRound(gx + o[0], gz + o[1], 1.8, -5, 30); });
for (var n = 0; n < 14; n++) {
var a = n / 14 * Math.PI * 1.4 - 0.2, hx = gx + Math.cos(a) * 15, hz = gz + Math.sin(a) * 15;
var hb = gmmLeafBall(g, hx, gmmGround(hx, hz) + 1.1, hz, 1.4, 0x3E6A28);
hb.scale.set(1, 0.8, 1);
for (var q = 0; q < 3; q++)
gmmS(0.08, 0x8A5A2A, hx + Math.cos(q * 2) * 1.1, gmmGround(hx, hz) + 1.3, hz + Math.sin(q * 2) * 1.1, g, 6);
}
gmmPerson(212, gx + 16, gz + 6, -1.4, { sex: "m", title: "hunter", look: { top: 0x3A5A2A, bottom: 0x4A3A2A, hat: "brimmed", hatColor: 0x3A4A2A, beard: 1 }, talk: { name: "The huntsman", persona: "The huntsman of the Grimms' Little Red Cap (1812-1857), who passes Grandmother's house, hears the old woman snoring too loudly, and finds the wolf asleep in her bed. He gets Little Red Cap and Grandmother out alive. Gruff, kind, a man of the forest. Speak of the wood, the deer, the wolves. Tell it as the Grimms' book has it, dark parts included, without dwelling on gore. Never mention films.", greet: "The old woman's snoring fit to raise the roof today. I'd best look in on her." } }, g);
GMM.wolfHome = { x: -600, z: 120 };
var wf = gmmBeast("wolf", -600, 120, 1.2, 1.15, 5, g);
GMM.wolf = wf;
gmmSpot(-600, 120, 4, "A wolf, by the path", "speak to him", function () { setStatus("🐺 <b>\"Good day, Little Red Cap,\"</b> says the wolf, so friendly. \"Where are you going so early? ...Look at the pretty flowers all around. Why don't you look about you? You walk along as if you were going to school, and it is so merry out here in the wood.\""); });
gmmSpot(-424, 80, 3, "Little Red Cap's basket", "take the cake and wine to Grandmother", function () { gmmRedStart(); });
gmmSignPost(g, -480, 60, 0.3, ["TO GRANDMOTHER'S", "half an hour, through the wood · keep to the path"], 4.2);
},
function () {
var g = gmmDistrict("rapunzel", 220), A = GMM_AT.rapunzel;
var hs = gmmTimberHouse(g, A.x + 70, A.z - 60, -0.6, { w: 9, d: 8, fl: 2, plaster: 0xE4D8C0, roof: 0x8A3A24, shutters: 0x5A4A2A });
gmmEnterable(hs, "rapparents", "The house beside the enchantress's garden");
var gx = A.x + 30, gz = A.z - 20, W = 46, D = 36;
gmmWallLine(g, [gx - W / 2, gz - D / 2], [gx + W / 2, gz - D / 2], 4.4);
gmmWallLine(g, [gx - W / 2, gz + D / 2], [gx - 4, gz + D / 2], 4.4);
gmmWallLine(g, [gx + 4, gz + D / 2], [gx + W / 2, gz + D / 2], 4.4);
gmmWallLine(g, [gx - W / 2, gz - D / 2], [gx - W / 2, gz + D / 2], 4.4);
gmmWallLine(g, [gx + W / 2, gz - D / 2], [gx + W / 2, gz + D / 2], 4.4);
var gate = gmmG(gx, gmmGround(gx, gz + D / 2), gz + D / 2, g);
gmmB(1, 5, 1, "stone", 0x9A9488, -3.5, 2.5, 0, gate);
gmmB(1, 5, 1, "stone", 0x9A9488, 3.5, 2.5, 0, gate);
for (var b = 0; b < 9; b++)
gmmC(0.04, 0.04, 3.8, null, 0x1A1A1A, -3 + b * 0.75, 1.9, 0, gate, 5);
for (var r = 0; r < 6; r++)
for (var c = 0; c < 10; c++) {
var rx = gx - W / 2 + 5 + c * 3.9, rz = gz - D / 2 + 5 + r * 4.5, ry = gmmGround(rx, rz);
var lf = gmmAdd(new THREE.IcosahedronGeometry(0.45, 0), gmmMat(null, r % 2 ? 0x4A8A2A : 0x5A9A3A), rx, ry + 0.3, rz, g);
lf.scale.y = 0.6;
if (c % 3 === 0)
gmmS(0.08, 0x7A6AD8, rx, ry + 0.7, rz, g, 6);
}
GMM.garden = { x: gx, z: gz, w: W, d: D };
var ench = gmmPerson(221, gx - 10, gz, 0, { sex: "f", look: { topKind: "robe", top: 0x2A1A3A, bottom: 0x2A1A3A, back: "cape", backColor: 0x1A0A2A, hat: "hood", hatColor: 0x2A1A3A, hair: 0x6A6A6A } }, g);
ench.patrol = [[gx - 16, gz - 10], [gx + 16, gz - 10], [gx + 16, gz + 10], [gx - 16, gz + 10]];
ench.pi = 0;
GMM.ench = ench;
gmmSpot(gx, gz + D / 2 + 2, 3.5, "The enchantress's garden gate", "climb over the wall and gather rampion", function () { gmmRampionStart(); });
var tx = A.x - 30, tz = A.z + 30, T = gmmTower(g, tx, tz, { r: 3.6, h: 24, roof: 0x5A3A6A, slits: false });
GMM.tower = { x: tx, z: tz, top: T.top, y: T.y };
var win = gmmG(tx, T.y + 20.5, tz + 3.55, g);
gmmB(1.2, 1.6, 0.1, null, 0, 0, 0, 0, win).material = gmmGlowM(0xFFD890);
gmmB(1.5, 0.15, 0.4, "stone", 0xA8A090, 0, -0.85, 0.1, win);
var braid = gmmAdd(new THREE.CylinderGeometry(0.16, 0.22, 20, 8), gmmShiny(0xF0C850, 40), tx, T.y + 10, tz + 3.75, g);
braid.userData.keep = 1;
braid.visible = false;
GMM.braid = braid;
gmmSpot(tx, tz + 5.5, 4, "The tower with no door", "call up to the window", function () { gmmRapunzelCall(); });
for (var t = 0; t < 26; t++) {
var a = t / 26 * Math.PI * 2;
if (Math.abs(Math.sin(a) - 1) < 0.25)
continue;
var bx = tx + Math.cos(a) * 9, bz = tz + Math.sin(a) * 9;
var br = gmmLeafBall(g, bx, gmmGround(bx, bz) + 0.9, bz, 1.5, 0x2A3A1A);
br.scale.set(1, 0.7, 1);
}
gmmPerson(222, tx + 12, tz + 18, 2.6, { sex: "m", look: { top: 0x5A2A6A, bottom: 0x3A2A3A, back: "cape", backColor: 0x8A2A2A, hair: 0xC8A060 }, talk: { name: "A king's son", persona: "The king's son of the Grimms' Rapunzel (1812-1857). Riding through the forest he heard Rapunzel singing in the tower and watched the enchantress call 'Rapunzel, Rapunzel, let down your hair'. He is in love and plans to climb up at dusk. (He does not know yet that he will be found out, fall into the thorns and wander blind for years until Rapunzel's tears heal his eyes.) Romantic, earnest. Never mention films.", greet: "Listen! Someone is singing up there. There is no door and no stair... but I watched an old woman call, and a golden braid came down." } }, g);
},
function () {
var g = gmmDistrict("holle", 160), A = GMM_AT.holle;
var h = gmmCottage(g, A.x - 12, A.z - 10, 0.8, { walls: "plaster", roofKind: "tile", roof: 0x9A4A2A, w: 9, d: 7, shutters: 0x5A3A6A, flowers: 1 });
gmmEnterable(h, "widow", "The widow's house");
gmmWell(g, A.x + 10, A.z + 4, { ry: 0.3 });
var bench = gmmG(A.x + 13, gmmGround(A.x + 13, A.z + 8), A.z + 8, g, 0.3);
gmmB(1.6, 0.12, 0.5, "wood", 0x6A4A2E, 0, 0.5, 0, bench);
gmmB(0.1, 0.5, 0.4, "wood", 0x6A4A2E, -0.7, 0.25, 0, bench);
gmmB(0.1, 0.5, 0.4, "wood", 0x6A4A2E, 0.7, 0.25, 0, bench);
gmmPerson(231, A.x + 12, A.z + 9, 0.3 + Math.PI, { sex: "f", look: { topKind: "dress", top: 0x7A8AA8, layer: "apron", layerColor: 0xF0F0E8, hair: 0xE8C870, hairStyle: "bun" }, talk: { name: "The good daughter", persona: "The hard-working, good stepdaughter of the Grimms' Mother Holle (Frau Holle, 1812-1857). Her stepmother makes her sit by the well and spin until her fingers bleed; she dropped her shuttle in the well and was told to fetch it back. Gentle, patient, never complains. Never mention films.", greet: "I've dropped my shuttle down the well, and she says I must fetch it back up... I don't know what's down there." } }, g);
gmmSpot(A.x + 10, A.z + 6, 3, "The well", "jump in after the shuttle", function () { gmmHolleDown(); });
},
function () {
var g = gmmDistrict("queen", 200), Q = GMM_AT.queen;
var cs = gmmCastle(g, Q.x, Q.z, 0.15, { style: "gothic", w: 62, d: 52, h: 12, col: 0x6E6A70, roof: 0x23262E, flags: 0x1A1A3A, keep: [24, 16, 22], lit: 1 });
gmmEnterable(cs, "queenhall", "The Queen's castle");
gmmPerson(241, cs.gate.x + 5, cs.gate.z + 3, 0.15, { sex: "m", title: "hunter", look: { top: 0x4A5A2A, bottom: 0x3A2A1A, hat: "brimmed", hatColor: 0x3A4A2A, beard: 1 }, talk: { name: "The Queen's huntsman", persona: "The huntsman of the Grimms' Snow White (Sneewittchen, 1812-1857). The Queen ordered him to take Snow White into the forest and bring back her lungs and liver as proof; he could not do it, let her run away into the wild wood, and brought back a young boar's instead. Ashamed, afraid of the Queen. Never mention films, tell it as the book has it, dark parts included, without dwelling on gore.", greet: "Don't ask me what the Queen asked of me. I let the child go. Run, I told her. Run into the forest." } }, g);
var g2 = gmmDistrict("dwarfs", 240), W = GMM_AT.dwarfs;
var dc = gmmCottage(g2, W.x, W.z, 0.2, { walls: "stone", roofKind: "shingle", roof: 0x5A4A3A, w: 10, d: 8, h: 2.6, shutters: 0xC83A2A, flowers: 1, lit: 0xFFC070 });
gmmEnterable(dc, "dwarfs", "The dwarfs' cottage");
var mine = gmmG(W.x + 44, gmmGround(W.x + 44, W.z - 30), W.z - 30, g2, 0.4);
gmmB(5, 4, 1, "wood", 0x5A4028, 0, 2, 0, mine);
gmmB(3.2, 3.2, 1.2, null, 0x0A0806, 0, 1.6, 0.1, mine);
gmmB(6, 0.6, 1.4, "wood", 0x5A4028, 0, 4.2, 0, mine);
gmmB(0.6, 0.6, 8, "wood", 0x5A4028, -1, 0.1, 4, mine);
gmmB(0.6, 0.6, 8, "wood", 0x5A4028, 1, 0.1, 4, mine);
var cart = gmmG(0, 0, 5, mine);
gmmB(1.4, 0.8, 1, "wood", 0x6A4A2E, 0, 0.7, 0, cart);
for (var k = 0; k < 5; k++)
gmmS(0.2, k % 2 ? 0xD8B040 : 0xA8A8B8, -0.4 + k * 0.2, 1.1, 0, cart, 6);
gmmEnterable({ door: gmmTo(mine, 0, 2), ry: 0.4, y: gmmGround(W.x + 44, W.z - 30) }, "mine", "The dwarfs' mine");
for (var d = 0; d < 7; d++) {
var a = d / 7 * Math.PI * 1.2 + 0.4;
gmmPerson(250 + d, W.x + Math.cos(a) * 9, W.z + 8 + Math.sin(a) * 5, a + Math.PI, { sex: "m", s: 0.58, look: { top: [0xC83A2A, 0x2A6AC8, 0x3A8A3A, 0xD8A020, 0x8A3AA8, 0x2A8A8A, 0xA85A2A][d], bottom: 0x4A3A2A, hat: "hood", hatColor: [0xC83A2A, 0x2A6AC8, 0x3A8A3A, 0xD8A020, 0x8A3AA8, 0x2A8A8A, 0xA85A2A][d], beard: 1, hair: 0xE8E8E0 },
wander: { r: 4, sp: 0.6 }, talk: { name: "A dwarf", persona: "One of the seven dwarfs of the Grimms' Snow White (1812-1857). In the book the dwarfs have no names: they dig for ore in the mountains by day and come home at night to their little cottage with seven little beds, seven little plates and seven little cups. Kind, careful, worried about the wicked Queen. Never use any names for the dwarfs. Never mention films.", greet: ["Who has been sitting on my little chair?", "Who has eaten from my little plate?", "Who has been drinking from my little cup?", "Don't open the door to anyone, child!"][d % 4] } }, g2);
}
var C = GMM_AT.coffin, cy = gmmGround(C.x, C.z), cf = gmmG(C.x, cy, C.z, g2, 0.3);
gmmB(2.6, 0.6, 1.2, "stone", 0x9A9488, 0, 0.3, 0, cf);
gmmAdd(new THREE.BoxGeometry(2.2, 0.7, 0.9), gmmSee(0xE8F4FF, 0.35), 0, 0.95, 0, cf);
var sw = gmmPerson(258, C.x, C.z, 0, { sex: "f", look: { topKind: "dress", top: 0xF0F0F0, hair: 0x0A0A0A, hairStyle: "long" } }, cf, 0.75);
sw.g.position.set(0, 0.75, 0);
sw.g.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
sw.g.scale.multiplyScalar(0.85);
var sgn = wSign(["SNOW WHITE", "the daughter of a king"], 1.8, 0.4, "#2A2010", "#E8D090");
sgn.position.set(0, 1.38, 0.46);
sgn.rotation.x = -0.6;
cf.add(sgn);
gmmRaven(g2, C.x + 2, cy + 0.8, C.z + 1.4);
gmmDove(g2, C.x - 2, cy + 0.8, C.z + 1.2);
gmmBirdShape(g2, C.x + 1.6, cy + 0.8, C.z - 1.4, 0.7, 0x8A7A5A, 0.05, 0x3A3A2A);
gmmSpot(C.x, C.z + 2, 3.5, "The glass coffin", "read what the dwarfs wrote, and wait", function () { gmmCoffin(); });
},
function () {
var g = gmmDistrict("goose", 160), A = GMM_AT.goose;
var tg = gmmG(A.x + 18, gmmGround(A.x + 18, A.z - 12), A.z - 12, g);
if (typeof ctuTree === "function")
ctuTree(tg, { h: 26, tr: 1.8, crown: 0x3A6A2A, limbs: 9, roots: 9, spread: 1.2, big: 1, seed: 64 });
gmmRound(A.x + 18, A.z - 12, 2.4, -5, 30);
var gz = gmmGoose(g, A.x + 15.4, gmmGround(A.x + 15, A.z - 9.6) + 0.1, A.z - 9.6, true);
gz.visible = true;
GMM.gooseNest = gz;
var man = gmmPerson(261, A.x + 12, A.z - 4, 0.5, { sex: "m", s: 0.72, look: { topKind: "robe", top: 0x7A7A7A, bottom: 0x6A6A6A, hat: "hood", hatColor: 0x6A6A6A, beard: 1, hair: 0xC8C8C8 }, talk: { name: "The little grey man", persona: "The little grey old man of the Grimms' The Golden Goose (1812-1857). He asks each of the three brothers to share their food and drink. The two clever elder brothers refuse and hurt themselves with their own axes; the youngest, called Simpleton, shares his ash-cake and sour beer, which turn into fine cake and good wine. As thanks the little man tells him to cut down the old tree, where he finds a goose with feathers of pure gold. Riddling, kindly to the kind. Never mention films.", greet: "Give me a piece of cake from your pocket and a drink from your bottle, I am so hungry and thirsty." } }, g);
gmmSpot(A.x + 15, A.z - 8, 3, "The roots of the old tree", "share your food with the little grey man, then cut", function () { gmmGooseStart(); });
var inn = gmmTimberHouse(g, A.x - 22, A.z + 18, 0.9, { w: 12, d: 9, fl: 2, plaster: 0xE8DAC0, roof: 0x8A3A24, sign: ["THE GOLDEN GOOSE", "an inn for travellers"], shutters: 0x6A2A2A, lit: 1 });
gmmEnterable(inn, "gooseinn", "The inn");
},
function (p, x, z, ry, o) {
o = o || {};
var w = o.w || 64, d = o.d || 22, h = o.h || 14, y0 = gmmGround(x, z), g = gmmG(x, y0, z, p, ry), col = o.col || 0xE8DCC0, trim = o.trim || 0xF4ECDC, rf = o.roof || 0x3E4652, sy = 2.4;
gmmB(w, sy, d, "stone", 0xB0A898, 0, sy / 2, 0, g);
gmmB(w, h, d, "plaster", col, 0, sy + h / 2, 0, g);
gmmB(w + 0.6, 0.5, d + 0.6, "stone", trim, 0, sy + h, 0, g);
gmmB(w + 0.4, 0.3, d + 0.4, "stone", trim, 0, sy + h * 0.5, 0, g);
var mh = 5;
[-1, 1].forEach(function (s) { var r = gmmB(w, 0.3, Math.hypot(mh, 2.5), "slate", rf, 0, sy + h + mh / 2, s * (d / 2 - 1.25), g); r.rotation.x = s * Math.atan2(mh, 2.5); });
gmmB(w, 0.3, d - 5, "slate", rf, 0, sy + h + mh, 0, g);
for (var i = 0; i < Math.round(w / 4); i++) {
var wx = -w / 2 + 2 + i * 4;
[d / 2, -d / 2].forEach(function (zz, k) { var dm = gmmG(wx, sy + h + mh * 0.45, zz * 0.86, g, k ? Math.PI : 0); gmmB(1.6, 2, 0.8, "plaster", col, 0, 0, 0, dm); gmmWindow(dm, 0, 0, 0.42, 0, 0.8, 1.2, { frame: trim }); gmmK(1.2, 1.0, "slate", rf, 0, 1.5, 0, dm, 4).rotation.y = Math.PI / 4; });
for (var f = 0; f < 2; f++) {
gmmWindow(g, wx, sy + h * (0.28 + f * 0.48), d / 2 + 0.12, 0, 1.4, h * 0.3, { frame: trim, lit: o.lit && (i + f) % 2 ? 0xFFD090 : 0 });
gmmWindow(g, wx, sy + h * (0.28 + f * 0.48), -d / 2 - 0.12, Math.PI, 1.4, h * 0.3, { frame: trim });
}
}
var pv = gmmG(0, sy, d / 2 + 2, g);
gmmB(18, h + 2, 4, "plaster", col, 0, (h + 2) / 2, 0, pv);
for (var c = 0; c < 6; c++) {
gmmC(0.55, 0.65, h, "marble", trim, -7.5 + c * 3, h / 2, 2.4, pv, 14);
gmmB(1.5, 0.5, 1.5, "stone", trim, -7.5 + c * 3, h + 0.25, 2.4, pv);
}
gmmB(18.6, 1, 5, "stone", trim, 0, h + 0.9, 0.6, pv);
gmmPrism(18.6, 4, 1.2, "stone", trim, 0, h + 1.4, 2.4, pv, 0);
if (o.crest) {
var cr = gmmC(1.1, 1.1, 0.2, null, 0xD8B040, 0, h + 3, 3.1, pv, 20);
cr.rotation.x = Math.PI / 2;
cr.material = gmmShiny(0xD8B040, 90);
}
gmmDoor(pv, 0, 0, 2.05, 0, 3, 5, 0x3A2A1A, { arch: 1, frame: trim });
var stg = gmmG(0, 0, d / 2 + 4.2, g), n = 8;
for (var s = 0; s < n; s++) {
var sw = 16 + s * 1.2;
gmmB(sw, 0.3, 1.1, "stone", 0xC8C0B0, 0, sy - 0.15 - s * 0.3, 1.1 * s + 0.55, stg);
}
var st0 = gmmTo(stg, 0, 1.1 * n / 2);
var F = [];
for (var s2 = 0; s2 < n; s2++) {
var fp = gmmTo(stg, 0, 1.1 * s2 + 0.55);
F.push(gmmFloor(fp.x, fp.z, Math.abs(Math.cos(ry)) * (16 + s2 * 1.2) + Math.abs(Math.sin(ry)) * 1.1, Math.abs(Math.sin(ry)) * (16 + s2 * 1.2) + Math.abs(Math.cos(ry)) * 1.1, y0 + sy - s2 * 0.3));
}
gmmFloor(gmmTo(pv, 0, 3).x, gmmTo(pv, 0, 3).z, 8, 4, y0 + sy);
gmmSolidIn(g, 0, 0, w + 0.4, d + 0.4, -5, 40);
gmmSolidIn(pv, 0, 0, 18.2, 4.4, -5, 30);
return { g: g, door: gmmTo(pv, 0, 3.4), ry: ry, y: y0 + sy, stairs: stg, stairTop: gmmTo(stg, 0, 0.5), stairFoot: gmmTo(stg, 0, 1.1 * n + 1) };
},
function () {
var g = gmmDistrict("briar", 230), A = GMM_AT.briar;
var cs = gmmCastle(g, A.x, A.z, -0.2, { style: "rose", w: 56, d: 48, h: 12, col: 0xD8D0C0, roof: 0x9A3A2A, keep: [26, 18, 22] });
gmmEnterable(cs, "briarhall", "Briar Rose's castle");
var hg = new THREE.Group();
g.add(hg);
GMM.hedge = { g: hg, parts: [], open: false };
var gate = cs.gate, gr = Math.hypot(gate.x - A.x, gate.z - A.z), ga = Math.atan2(gate.z - A.z, gate.x - A.x), R0 = gr + 12;
for (var i = 0; i < (GMM.lite ? 60 : 110); i++) {
var a = i / (GMM.lite ? 60 : 110) * Math.PI * 2, gap = Math.abs(Math.atan2(Math.sin(a - ga), Math.cos(a - ga))) < 0.09;
var rr = R0 + (i % 3) * 2.2, hx = A.x + Math.cos(a) * rr, hz = A.z + Math.sin(a) * rr, hy = gmmGround(hx, hz);
var b = gmmLeafBall(hg, hx, hy + 2.2, hz, 2.8, 0x1E3A1A);
b.scale.set(1, 1.5, 1);
b.userData.keep = 1;
var ro = gmmS(0.32, 0xB81A2A, hx + Math.cos(a) * 1.8, hy + 3.4, hz + Math.sin(a) * 1.8, hg, 8);
ro.userData.keep = 1;
if (gap)
GMM.hedge.parts.push(b, ro);
else
gmmRound(hx, hz, 2.6, -5, 8);
}
var gx = A.x + Math.cos(ga) * R0, gz = A.z + Math.sin(ga) * R0;
GMM.hedge.wall = gmmRound(gx, gz, 5, -5, 8);
gmmSpot(A.x + Math.cos(ga) * (R0 + 6), A.z + Math.sin(ga) * (R0 + 6), 5, "The hedge of thorns", "push into it", function () { gmmBriarHedge(); });
gmmSignPost(g, A.x + Math.cos(ga) * (R0 + 14), A.z + Math.sin(ga) * (R0 + 14), -ga + Math.PI / 2, ["BRIAR ROSE", "the castle that has slept a hundred years"], 4.2);
var court = gmmTo(cs.g, 0, 4);
gmmBeast("horse", court.x - 8, court.z, 0.6, 1, 10, g);
gmmBeast("horse", court.x - 11, court.z + 3, 0.9, 1, 11, g);
gmmBeast("dog", court.x + 7, court.z + 2, 2.4, 1, 12, g);
gmmBeast("dog", court.x + 9, court.z - 1, 2, 0.9, 13, g);
for (var pg = 0; pg < 8; pg++)
gmmDove(g, court.x - 12 + pg * 3, cs.y + 12.6, court.z - cs.kd - 2);
gmmPerson(281, A.x + Math.cos(ga) * (R0 + 10), A.z + Math.sin(ga) * (R0 + 10) + 3, -ga - Math.PI / 2, { sex: "m", look: { top: 0x2A4A8A, bottom: 0x3A3A4A, back: "cape", backColor: 0xC8A02A, hair: 0x5A3A1A }, talk: { name: "A king's son", persona: "The king's son of the Grimms' Briar Rose (Dornröschen, 1812-1857). An old man has told him of the castle behind the thorn hedge where a beautiful princess called Briar Rose has slept a hundred years with all her court; many princes have tried and died caught in the thorns. He is not afraid. He does not know it, but today the hundred years are over. Never mention films.", greet: "They say a princess sleeps in there, and the whole court with her, and that the hedge has caught every man who tried. I'm going in." } }, g);
},
function () {
var g = gmmDistrict("cinder", 260), A = GMM_AT.cinder;
var hs = gmmTimberHouse(g, A.x - 56, A.z + 40, 0.6, { w: 13, d: 10, fl: 3, plaster: 0xF0E4CC, timber: 0x3A2414, roof: 0x7A2A1A, shutters: 0x2A4A2A, lit: 1 });
gmmEnterable(hs, "cinderhome", "Aschenputtel's father's house");
var dv = gmmG(A.x - 80, gmmGround(A.x - 80, A.z + 70), A.z + 70, g);
gmmC(2.2, 2.4, 5, "plaster", 0xF0E8DC, 0, 2.5, 0, dv, 12);
gmmK(2.9, 2.6, "tile", 0x9A3A24, 0, 6.3, 0, dv, 12);
for (var h = 0; h < 10; h++) {
var a = h / 10 * Math.PI * 2;
gmmB(0.35, 0.3, 0.1, null, 0x1A1410, Math.cos(a) * 2.21, 3.6 + (h % 2) * 0.8, Math.sin(a) * 2.21, dv, -a + Math.PI / 2);
}
for (var dvv = 0; dvv < 6; dvv++)
gmmDove(g, A.x - 80 + Math.cos(dvv) * 2.6, gmmGround(A.x - 80, A.z + 70) + 5.2, A.z + 70 + Math.sin(dvv) * 2.6);
gmmDoor(dv, 0, 0, 2.25, 0, 1, 1.9, 0x5A3A22, {});
gmmRound(A.x - 80, A.z + 70, 2.6, -5, 8);
gmmEnterable({ door: { x: A.x - 80, z: A.z + 73.6 }, ry: 0, y: gmmGround(A.x - 80, A.z + 70) }, "dovecote", "The dovecote");
var pt = gmmG(A.x - 64, gmmGround(A.x - 64, A.z + 84), A.z + 84, g);
if (typeof ctuTree === "function")
ctuTree(pt, { h: 11, crown: 0x4A7A2E, fruit: 0xD8C83A, limbs: 6, roots: 5, seed: 21 });
gmmRound(A.x - 64, A.z + 84, 0.9, -5, 12);
gmmSpot(A.x - 64, A.z + 80, 3, "The pear tree in the garden", "climb up and hide among the pears", function () { gmmCinderHide("pear"); });
gmmSpot(A.x - 80, A.z + 74, 2, "The dovecote's little door", "hide inside among the doves", function () { gmmCinderHide("dove"); });
gmmFence(g, [A.x - 100, A.z + 56], [A.x - 100, A.z + 96]);
gmmFence(g, [A.x - 100, A.z + 96], [A.x - 46, A.z + 96]);
gmmFence(g, [A.x - 46, A.z + 96], [A.x - 46, A.z + 64]);
var gx = A.x - 110, gz = A.z - 10, gy = gmmGround(gx, gz);
gmmWallLine(g, [gx - 14, gz - 12], [gx + 14, gz - 12], 1.2);
gmmWallLine(g, [gx - 14, gz + 12], [gx - 3, gz + 12], 1.2);
gmmWallLine(g, [gx + 3, gz + 12], [gx + 14, gz + 12], 1.2);
gmmWallLine(g, [gx - 14, gz - 12], [gx - 14, gz + 12], 1.2);
gmmWallLine(g, [gx + 14, gz - 12], [gx + 14, gz + 12], 1.2);
gmmB(1.2, 0.25, 2.4, "stone", 0x8A8A80, gx, gy + 0.12, gz, g);
gmmB(0.9, 1.3, 0.2, "stone", 0x9A9A90, gx, gy + 0.65, gz - 1.3, g);
for (var q = 0; q < 6; q++) {
var R = wRand(900 + q), qx = gx - 10 + R() * 20, qz = gz - 9 + R() * 18;
if (Math.hypot(qx - gx, qz - gz) < 4)
continue;
var gs = gmmB(0.7, 1 + R() * 0.4, 0.18, "stone", 0x8A8A80, qx, gmmGround(qx, qz) + 0.5, qz, g);
gs.rotation.z = (R() - 0.5) * 0.15;
}
var hz = gmmG(gx + 2.2, gy, gz - 2, g);
if (typeof ctuTree === "function")
ctuTree(hz, { h: 9, crown: 0x5A8A34, limbs: 6, roots: 4, seed: 42 });
gmmRound(gx + 2.2, gz - 2, 0.7, -5, 10);
var wb = gmmDove(g, gx + 2.6, gy + 6.2, gz - 1.5);
GMM.movers.push({ k: "hover", g: wb, y: wb.position.y, ph: 2 });
gmmSpot(gx, gz + 2, 3.5, "The hazel tree on her mother's grave", "say the old words to it", function () { gmmHazel(); });
var pl = gmmPalace(g, A.x + 64, A.z - 60, -0.35, { w: 70, d: 22, h: 15, col: 0xF0E4C8, trim: 0xFFF4E0, roof: 0x3A4A5A, crest: 1, lit: 1 });
GMM.cpal = pl;
gmmEnterable(pl, "palacehall", "The king's palace");
var pitch = new THREE.Group();
pl.stairs.add(pitch);
for (var pp = 0; pp < 4; pp++) {
var pc = gmmAdd(new THREE.CircleGeometry(0.9 + pp * 0.2, 16), gmmShiny(0x0A0806, 120), -4 + pp * 2.6, 2.4 - 0.15 - (2 + pp) * 0.3 + 0.17, 1.1 * (2 + pp) + 0.55, pitch);
pc.rotation.x = -Math.PI / 2;
}
pitch.visible = false;
GMM.pitch = pitch;
gmmPerson(291, A.x - 50, A.z + 56, 0.6, { sex: "f", look: { topKind: "dress", top: 0x6A6A5A, layer: "apron", layerColor: 0x8A8A7A, hair: 0xE8C870, hairStyle: "bun" }, talk: { name: "Aschenputtel", persona: "Aschenputtel (Cinderella) of the Grimms' tale (1812-1857). Since her mother died, her stepmother and two stepsisters (beautiful but black-hearted) make her work from dawn to dark, sleep in the ashes by the hearth, and call her Aschenputtel. She planted a hazel twig on her mother's grave and watered it with tears; a white bird in it brings what she wishes. Her slipper at the ball is GOLD. There is no fairy godmother, no pumpkin coach and no midnight in the book: help comes from the hazel tree and the birds, and she leaves the ball because she chooses to. Gentle, brave. Never mention films.", greet: "My stepmother has tipped a bowl of lentils into the ashes. If I pick them all out in two hours, she says I may go to the ball. I never will..." } }, g);
gmmSpot(A.x - 50, A.z + 54, 3, "The kitchen door", "go in to the hearth and the ashes", function () { gmmEnterRoom("cinderhome", GMM_ROOMS.cinderhome.door); });
},
function () {
var g = gmmDistrict("frog", 220), A = GMM_AT.frog;
var cs = gmmCastle(g, A.x + 20, A.z - 10, -2.0, { style: "schloss", w: 54, d: 46, h: 11, col: 0xE8C878, roof: 0x5A9A84, flags: 0xD8B040, keep: [22, 16, 18], lit: 1 });
gmmEnterable(cs, "froghall", "The king's castle");
var lx = A.x - 40, lz = A.z + 30, lt = gmmG(lx, gmmGround(lx, lz), lz, g);
if (typeof ctuTree === "function")
ctuTree(lt, { h: 22, tr: 1.3, crown: 0x6A9A3A, limbs: 8, roots: 7, spread: 1.2, big: 1, seed: 1 });
gmmRound(lx, lz, 1.8, -5, 30);
gmmWell(g, lx + 6, lz + 4, { roofKind: "shingle", roof: 0x4A5A3A });
var fr = gmmFrog(g, lx + 7.3, gmmGround(lx + 7, lz + 4) + 1.15, lz + 4.6, 1.8);
GMM.frogOnWell = fr;
var ball = gmmS(0.12, 0, lx + 5, gmmGround(lx + 5, lz + 5) + 0.12, lz + 5.5, g, 14);
ball.material = gmmShiny(0xF0C030, 120);
ball.userData.keep = 1;
GMM.goldball = ball;
gmmSpot(lx + 5, lz + 6, 3, "A golden ball by the well", "throw it up and catch it", function () { gmmFrogBall(); });
gmmPerson(301, lx + 3, lz + 8, 2.8, { sex: "f", child: 1, look: { topKind: "dress", top: 0xE8C83A, hat: "tiara", hatColor: 0xF0D040, hair: 0xF0D070, hairStyle: "long" }, talk: { name: "The youngest princess", persona: "The king's youngest daughter in the Grimms' The Frog King (Der Froschkönig, the very first tale in their book, 1812-1857), so beautiful the sun itself marvels when it shines on her face. On hot days she sits by the cool well under the old lime tree and plays with her golden ball, her favourite plaything. A bit spoilt, quick-tempered, but honest in the end. In the book the frog turns into a king's son when she throws him against the wall in a temper, NOT by a kiss. Never mention films.", greet: "It's so hot today. I come here to the well where it's cool, and play with my golden ball. Mind you don't drop it!" } }, g);
var cx = A.x - 10, cz = A.z + 60, cy = gmmGround(cx, cz), co = gmmG(cx, cy, cz, g, 1.2);
gmmB(2.4, 2.2, 3.4, null, 0xF0E8DC, 0, 2.1, 0, co).material = gmmShiny(0xF0E8DC, 40);
gmmB(2.6, 0.25, 3.6, null, 0xD8B040, 0, 3.3, 0, co).material = gmmShiny(0xD8B040, 90);
gmmB(2.6, 0.25, 3.6, null, 0xD8B040, 0, 1.0, 0, co).material = gmmShiny(0xD8B040, 90);
[[-1.2, 1.3], [1.2, 1.3], [-1.2, -1.3], [1.2, -1.3]].forEach(function (w) { var wh = gmmC(0.75, 0.75, 0.12, null, 0xD8B040, w[0], 0.75, w[1], co, 16); wh.rotation.z = Math.PI / 2; wh.material = gmmShiny(0xD8B040, 90); });
for (var hh = 0; hh < (GMM.lite ? 2 : 4); hh++) {
var hp = gmmTo(co, (hh % 2 ? 0.8 : -0.8), 4.4 + ((hh / 2) | 0) * 2.8);
var hb = gmmBeast("horse", hp.x, hp.z, 1.2, 1, 40 + hh * 2, g);
var pl = gmmS(0.2, 0xFFFFFF, 0, 2.4, 0.8, hb, 8);
pl.scale.y = 2;
}
gmmPerson(302, cx + 3, cz - 2, 1.2 + Math.PI, { sex: "m", look: { top: 0x2A3A5A, bottom: 0x2A2A3A, layer: "vest", layerColor: 0x1A1A2A, hat: "tophat", hatColor: 0x1A1A2A }, talk: { name: "Faithful Henry", persona: "Faithful Henry (der eiserne Heinrich), servant of the young king in the Grimms' The Frog King (1812-1857). When his master was turned into a frog he grieved so much he had three iron bands put round his heart so it would not burst. Now he drives the carriage with eight white horses, white ostrich plumes and golden harness to bring his master and the princess home; on the way the bands crack one by one for joy. 'Henry, the carriage is breaking!' 'No, master, it is not the carriage, it is a band from round my heart.' Loyal, deeply moved. Never mention films.", greet: "I have come to take my master home. Three iron bands I had bound round my heart when he was made a frog... I can feel them straining." } }, g);
},
function () {
var g = gmmDistrict("dance", 200), A = GMM_AT.dance;
var pl = gmmPalace(g, A.x, A.z - 20, 0.4, { w: 60, d: 22, h: 14, col: 0xF0D8D4, trim: 0xFFF0EC, roof: 0x2E5A4A, lit: 1 });
gmmEnterable(pl, "dancehall", "The palace of the twelve princesses");
var so = gmmPerson(311, A.x - 14, A.z + 36, 0.4 + Math.PI, { sex: "m", look: { top: 0x5A2A2A, bottom: 0x3A3A3A, layer: "longcoat", layerColor: 0x4A3A3A, hat: "cap", hatColor: 0x3A2A2A, beard: 1, hair: 0x8A8A8A }, talk: { name: "An old soldier", persona: "The old wounded soldier of the Grimms' The Twelve Dancing Princesses (Die zertanzten Schuhe, 1815-1857). The king has promised whoever finds out where his twelve daughters dance every night may choose one as his wife (but anyone who fails in three nights loses his head). An old woman in the wood told him: don't drink the wine they bring you at night, pretend to sleep, and gave him a little cloak that makes him invisible. He is canny, humble, good-humoured. Never mention films.", greet: "An old woman gave me this cloak. Put it on and no one can see you. And she said: don't drink the wine they give you at bedtime." } }, g);
gmmSpot(A.x - 14, A.z + 34, 3, "The old soldier's cloak", "borrow it, and follow the princesses tonight", function () { gmmDanceCloak(); });
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2, x = A.x + Math.cos(a) * 24, z = A.z + 30 + Math.sin(a) * 14;
var yew = gmmK(1.2, 4, null, 0x2A4A2A, x, gmmGround(x, z) + 2, z, g, 8);
gmmRound(x, z, 1.2, -5, 5);
}
var fy = gmmGround(A.x, A.z + 30);
gmmC(4, 4.2, 0.8, "stone", 0xD8D0C0, A.x, fy + 0.4, A.z + 30, g, 24);
gmmC(3.7, 3.7, 0.08, null, 0, A.x, fy + 0.75, A.z + 30, g, 24).material = gmmShiny(0x2A5A7A, 90);
gmmRound(A.x, A.z + 30, 4.3, -5, 1.2);
},
function () {
var g = gmmDistrict("rumpel", 240), A = GMM_AT.rumpel;
var mx = A.x - 50, mz = A.z - 30, ml = gmmTimberHouse(g, mx, mz, 0.3, { w: 11, d: 9, fl: 2, plaster: 0xE4D8C0, roof: 0x7A3A24, sign: ["THE MILL", "flour ground fine"], shutters: 0x4A5A3A });
gmmEnterable(ml, "mill", "The mill");
var py = gmmGround(mx - 14, mz - 4), pond = gmmAdd(new THREE.CircleGeometry(9, 32), gmmShiny(0x1E3A42, 90), mx - 16, py + 0.12, mz - 6, g);
pond.rotation.x = -Math.PI / 2;
gmmRound(mx - 16, mz - 6, 8.6, -5, 0.5);
var wh = gmmG(0, 0, 0, g), wp = gmmTo(ml.g, -6.1, 0);
wh.position.set(wp.x, gmmGround(wp.x, wp.z) + 3.4, wp.z);
wh.rotation.y = 0.3;
var wheel = gmmG(0, 0, 0, wh);
var rim = gmmAdd(new THREE.TorusGeometry(3, 0.16, 6, 24), gmmMat("wood", 0x5A4028), 0, 0, 0, wheel);
rim.rotation.y = Math.PI / 2;
for (var s = 0; s < 12; s++) {
var sp = gmmB(0.12, 6, 0.12, "wood", 0x5A4028, 0, 0, 0, wheel);
sp.rotation.x = s / 12 * Math.PI;
var pd = gmmB(1.2, 0.1, 0.8, "wood", 0x6A4A30, 0, 0, 0, wheel);
pd.position.set(0, Math.cos(s / 12 * Math.PI * 2) * 3, Math.sin(s / 12 * Math.PI * 2) * 3);
pd.rotation.x = s / 12 * Math.PI * 2;
}
wheel.userData.keep = 1;
wheel.traverse(function (o) { o.userData.keep = 1; });
GMM.movers.push({ k: "wheel", g: wheel });
gmmPerson(321, mx + 4, mz + 8, 0.3, { sex: "m", title: "baker", look: { top: 0xE8E0D0, bottom: 0x6A5A4A, hat: "cap", hatColor: 0xE8E0D0, hair: 0x8A6A4A }, talk: { name: "The miller", persona: "The poor miller of the Grimms' Rumpelstiltskin (1812-1857), who once, to make himself seem important, told the king his daughter could spin straw into gold. Now she is locked in the castle with a room full of straw. Boastful, now frightened, sorry. Never mention films.", greet: "I only said it to seem important! 'My daughter can spin straw into gold,' I said. And the king took her straight to the castle..." } }, g);
var cs = gmmCastle(g, A.x + 50, A.z + 20, -0.4, { style: "burg", w: 44, d: 38, h: 10, col: 0x8A7A64, roof: 0x9A4A2A, flags: 0xC83A2A, keep: [20, 14, 16] });
gmmEnterable(cs, "straw1", "The king's castle");
for (var h = 0; h < 5; h++) {
var hp = gmmTo(cs.g, -12 + h * 5, cs.keepZ + cs.kd / 2 + 5);
var hs = gmmG(hp.x, gmmGround(hp.x, hp.z), hp.z, g);
gmmC(1.4, 1.6, 1.8, null, 0xD8B858, 0, 0.9, 0, hs, 10);
gmmK(1.5, 1.2, null, 0xC8A848, 0, 2.4, 0, hs, 10);
}
var F = GMM_AT.rfire, fy = gmmGround(F.x, F.z), hut = gmmCottage(g, F.x - 10, F.z - 8, 0.6, { walls: "log", roofKind: "shingle", roof: 0x4A3A2A, w: 5, d: 4, h: 2.2, lit: 0xFF9A40 });
gmmEnterable(hut, "rhut", "A little house on the mountain");
gmmFire(g, F.x, fy, F.z, 1.3);
var lm = gmmPerson(322, F.x + 3, F.z, 0, { sex: "m", s: 0.55, look: { top: 0x8A3A1A, bottom: 0x3A5A2A, hat: "pixie", hatColor: 0x8A1A1A, beard: 1, hair: 0x8A6A3A } }, g);
GMM.littleMan = lm;
GMM.movers.push({ k: "dance", P: lm, x: F.x, z: F.z, r: 3, ph: 0 });
for (var f = 0; f < 2; f++) {
gmmBeast(f ? "fox" : "deer", F.x - 14 + f * 28, F.z + 16, f ? 2 : 0.5, f ? 1 : 0.8, 60 + f, g);
}
gmmSpot(F.x - 6, F.z + 8, 4, "Behind a tree, near the fire", "listen to what the little man sings", function () { gmmRumpelListen(); });
var t1 = gmmG(F.x - 7, gmmGround(F.x - 7, F.z + 10), F.z + 10, g);
if (typeof ctuTree === "function")
ctuTree(t1, { h: 14, crown: 0x3A5A2A, limbs: 5, roots: 5, seed: 55 });
gmmRound(F.x - 7, F.z + 10, 0.9, -5, 20);
},
function () {
var g = gmmDistrict("bremen", 360), A = GMM_AT.bremen;
GMM_BREMEN.forEach(function (B, i) {
var y = gmmGround(B.x, B.z), m;
if (B.k === "donkey")
m = gmmBeast("horse", B.x, B.z, 1.2, 0.72, 70, g);
else if (B.k === "dog")
m = gmmBeast("dog", B.x, B.z, 0.4, 1, 71, g);
else if (B.k === "cat")
m = gmmBeast("cat", B.x, B.z, 2.2, 1, 72, g);
else {
var gt = gmmG(B.x, y, B.z, g, 0.5);
gmmB(3, 0.12, 0.1, "wood", 0x6A5038, 0, 1.2, 0, gt);
gmmB(3, 0.12, 0.1, "wood", 0x6A5038, 0, 0.6, 0, gt);
gmmB(0.15, 1.5, 0.15, "wood", 0x6A5038, -1.5, 0.75, 0, gt);
gmmB(0.15, 1.5, 0.15, "wood", 0x6A5038, 1.5, 0.75, 0, gt);
m = gmmRooster(g, B.x, y + 1.26, B.z);
}
B.m = m;
B.home = { x: B.x, z: B.z };
gmmSpot(B.x, B.z, 3.5, B.n, "talk with them", function () { gmmBremenMeet(i); });
});
var rh = gmmTimberHouse(g, A.x, A.z - 12, Math.PI * 0.95, { w: 11, d: 9, fl: 2, plaster: 0x8A8270, timber: 0x2A1A10, roof: 0x4A3A2A, shutters: 0x2A2A2A });
gmmEnterable(rh, "robbers", "The robbers' house");
var wp = gmmTo(rh.g, 2.6, 4.7);
GMM.robWin = { x: wp.x, z: wp.z, y: rh.y };
gmmSpot(wp.x, wp.z, 4, "The lit window", "look in (the robbers are feasting)", function () { gmmBremenWindow(); });
var stack = gmmG(wp.x, gmmGround(wp.x, wp.z), wp.z, g);
stack.visible = false;
GMM.bremenStack = stack;
gmmBeast("horse", 0, 0, 0, 0.72, 73, stack, 0);
var dg = gmmBeast("dog", 0, 0, 0, 1, 74, stack, 1.45);
var ct = gmmBeast("cat", 0, 0, 0, 1, 75, stack, 2.15);
gmmRooster(stack, 0, 2.55, 0);
var rob = [];
for (var r = 0; r < 4; r++) {
var rp = gmmTo(rh.g, -2 + r * 1.4, -1);
rob.push(gmmPerson(330 + r, rp.x, rp.z, 0, { sex: "m", look: { top: 0x2A2A2A, bottom: 0x3A2A1A, hat: "bandana", hatColor: 0x6A1A1A, beard: 1 } }, g, rh.y));
}
GMM.robbers = rob;
rob.forEach(function (P) { P.g.visible = false; });
var rx = 1145, rz = 180, ry = gmmGround(rx, rz), ro = gmmG(rx, ry, rz, g, -Math.PI / 2);
gmmB(2.4, 2.2, 2.4, "stone", 0xB0A898, 0, 1.1, 0, ro);
gmmB(1.4, 3, 0.9, "stone", 0xC0B8A8, 0, 3.7, 0, ro);
gmmB(1.2, 1.6, 0.8, "stone", 0xC0B8A8, 0, 5.9, 0, ro);
gmmS(0.42, 0xC0B8A8, 0, 7.1, 0, ro, 12);
gmmB(0.12, 4.2, 0.16, "stone", 0xC0B8A8, 0.5, 5.2, 0.55, ro);
var sh = gmmB(0.9, 1.2, 0.16, "stone", 0xA89A80, -0.6, 4.6, 0.55, ro);
gmmK(0.7, 1.6, "stone", 0x9A9488, 0, 9, 0, ro, 8);
gmmRound(rx, rz, 1.6, -5, 10);
gmmSignPost(g, rx - 12, rz + 6, -Math.PI / 2, ["BREMEN", "the free city · Roland, 1404"], 3.6);
gmmSpot(rx - 3, rz, 3, "Bremen's Roland", "read what he stands for", function () { setStatus("🗿 <b>Roland of Bremen</b>, carved in stone in 1404, five and a half metres tall, his sword drawn, his shield bearing the Emperor's eagle. He faces the cathedral and stands for the city's freedom: they say Bremen stays free as long as Roland stands. <i>The four musicians never got here: they liked the robbers' house too much.</i>"); });
},
function () {
var g = gmmDistrict("kids", 120), A = GMM_AT.kids;
var h = gmmCottage(g, A.x, A.z - 6, 0.9, { walls: "plaster", col: 0xFFF0A0, roofKind: "tile", roof: 0xFF4A3A, w: 9, d: 7, shutters: 0x2AA8FF, flowers: 1, doorCol: 0x2A8AE8 });
gmmEnterable(h, "goats", "The seven little goats' cottage");
var mg = gmmBeast("goat", A.x + 8, A.z + 6, 0.9, 1.4, 80, g);
gmmSpot(A.x + 8, A.z + 6, 3, "The mother goat", "talk with her", function () { setStatus("🐐 <b>\"Dear children,\"</b> says the old goat, <b>\"I must go into the forest. Be on your guard against the wolf: if he comes in, he will eat you all up. He often disguises himself, but you will know him by his rough voice and his black feet.\"</b> <i>Go inside: her seven kids are hiding, the youngest in the clock case.</i>"); });
for (var f = 0; f < 12; f++) {
var a = f / 12 * Math.PI * 2, x = A.x + Math.cos(a) * 14, z = A.z + Math.sin(a) * 14;
gmmB(0.5, 0.8, 0.12, null, [0xFF3A3A, 0xFFB020, 0x3AC84A, 0x2A8AFF][f % 4], x, gmmGround(x, z) + 0.4, z, g, -a);
}
for (var fl = 0; fl < 16; fl++) {
var R = wRand(400 + fl), x2 = A.x - 12 + R() * 24, z2 = A.z + 6 + R() * 10;
var st = gmmC(0.03, 0.03, 0.5, null, 0x3A8A2A, x2, gmmGround(x2, z2) + 0.25, z2, g, 5);
gmmS(0.14, [0xFF3A8A, 0xFFE020, 0x8A3AFF, 0xFF6A1A][fl % 4], x2, gmmGround(x2, z2) + 0.55, z2, g, 8);
}
},
function () {
var g = gmmDistrict("fisher", 240), A = GMM_AT.fisher;
var hx = A.x + 10, hz = gmmShore(A.x + 10) - 48, hy = gmmGround(hx, hz), H = gmmG(hx, hy, hz, g, 0.1);
var stages = [];
stages.push((function () { var s = gmmG(0, 0, 0, H); gmmB(4.4, 2, 3.4, "wood", 0x5A4A3A, 0, 1, 0, s); gmmGable(s, 4.4, 3.4, 2, 1.4, "thatch", 0x8A7A5A, 0.3, "wood", 0x5A4A3A); gmmDoor(s, 0, 0, 1.75, 0, 0.9, 1.7, 0x3A2A1A); return s; })());
stages.push((function () { var s = gmmG(0, 0, 0, H); gmmB(8, 2.8, 6, "plaster", 0xF0E8D8, 0, 1.4, 0, s); gmmTimbers(s, 8, 2.8, 0, 0, 3.05, 0, 0x4A2E1A); gmmGable(s, 8, 6, 2.8, 3.6, "tile", 0xA84A2A, 0.5); gmmDoor(s, 0, 0, 3.05, 0, 1.1, 2, 0x2A5A8A); gmmWindow(s, -2.6, 1.6, 3.12, 0, 0.8, 0.9, { shutters: 0x2A5A8A, flowers: 1 }); gmmWindow(s, 2.6, 1.6, 3.12, 0, 0.8, 0.9, { shutters: 0x2A5A8A, flowers: 1 }); return s; })());
stages.push((function () { var s = gmmG(0, 0, 0, H); gmmB(18, 9, 14, "stone", 0xA8A090, 0, 4.5, 0, s); [[-9, -7], [9, -7], [-9, 7], [9, 7]].forEach(function (c) { gmmC(2.2, 2.4, 13, "stone", 0xA8A090, c[0], 6.5, c[1], s, 12); gmmK(2.8, 4, "slate", 0x3E4652, c[0], 15, c[1], s, 12); }); gmmDoor(s, 0, 0, 7.05, 0, 2, 3.2, 0x4A2A16, { arch: 1 }); for (var i = 0; i < 4; i++)
gmmWindow(s, -6 + i * 4, 6, 7.12, 0, 1, 1.6, {}); return s; })());
stages.push((function () { var s = gmmG(0, 0, 0, H); gmmB(30, 12, 16, "marble", 0xE8E0D0, 0, 6, 0, s); for (var c = 0; c < 8; c++)
gmmC(0.6, 0.7, 11, "marble", 0xF4F0E8, -12 + c * 3.4, 5.5, 8.4, s, 12); gmmPrism(30, 4, 1, "marble", 0xF4F0E8, 0, 12, 8.2, s, 0); gmmB(30.4, 0.6, 16.4, "slate", 0x2A3A5A, 0, 12.3, 0, s); gmmDoor(s, 0, 0, 8.05, 0, 2.6, 4, 0x5A3A1A, { arch: 1 }); return s; })());
stages.push((function () {
var s = gmmG(0, 0, 0, H);
gmmB(34, 14, 18, "marble", 0xF0E0B0, 0, 7, 0, s);
for (var c = 0; c < 9; c++) {
var col = gmmC(0.65, 0.75, 13, null, 0xE8C040, -14 + c * 3.5, 6.5, 9.4, s, 12);
col.material = gmmShiny(0xE8C040, 100);
}
var dm = gmmAdd(new THREE.SphereGeometry(7, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), gmmShiny(0xE8C040, 110), 0, 14, 0, s);
gmmDoor(s, 0, 0, 9.05, 0, 3, 4.4, 0xD8A030, { arch: 1 });
return s;
})());
stages.push((function () {
var s = gmmG(0, 0, 0, H);
gmmB(14, 16, 30, "stone", 0xC8C0B0, 0, 8, 0, s);
gmmGable(s, 14, 30, 16, 8, "slate", 0x3E4652, 0.4, "stone", 0xC8C0B0).rotation.y = Math.PI / 2;
[-5, 5].forEach(function (x) { var t = gmmG(x, 0, 14, s); gmmB(5, 30, 5, "stone", 0xC8C0B0, 0, 15, 0, t); gmmK(3.4, 12, "slate", 0x3E4652, 0, 36, 0, t, 8); });
gmmDoor(s, 0, 0, 15.05, 0, 3, 5, 0x4A2A16, { arch: 1 });
for (var w = 0; w < 5; w++)
gmmWindow(s, 7.05, 8, -10 + w * 5, Math.PI / 2, 1.4, 5, { lit: 0xFFD890 });
return s;
})());
GMM.fishStages = stages;
stages.forEach(function (s, i) { s.visible = i === 0; s.userData.keep = 1; s.traverse(function (o) { o.userData.keep = 1; }); });
gmmSolid(hx, hz, 6, 5, -5, 4);
GMM.fishHouse = { x: hx, z: hz, y: hy };
gmmEnterable({ door: { x: hx + Math.sin(0.1) * 4.2, z: hz + Math.cos(0.1) * 4.2 }, ry: 0.1, y: hy }, "fishhome", "The fisherman's house");
var sx = A.x, sz = gmmShore(A.x) - 4, sy = gmmGround(sx, sz);
var bt = gmmG(sx + 12, gmmGround(sx + 12, sz - 8), sz - 8, g, 0.6);
var hull = gmmAdd(new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), gmmMat("wood", 0x6A4A2E), 0, 0.7, 0, bt);
hull.scale.set(1.2, 0.8, 3.4);
for (var n = 0; n < 3; n++) {
var np = gmmG(sx - 16 + n * 5, gmmGround(sx - 16 + n * 5, sz - 20), sz - 20, g);
gmmB(0.1, 2, 0.1, "wood", 0x5A4A3A, -1.6, 1, 0, np);
gmmB(0.1, 2, 0.1, "wood", 0x5A4A3A, 1.6, 1, 0, np);
gmmAdd(new THREE.PlaneGeometry(3.2, 1.6), new THREE.MeshLambertMaterial({ color: 0x8A7A5A, transparent: true, opacity: 0.7, side: THREE.DoubleSide }), 0, 1.1, 0, np);
}
gmmPerson(341, sx, sz - 1, Math.PI, { sex: "m", title: "fisherman", look: { top: 0x6A7A8A, bottom: 0x3A3A3A, hat: "cap", hatColor: 0x3A3A3A, beard: 1, hair: 0x9A9A9A }, talk: { name: "The fisherman", persona: "The fisherman of the Grimms' The Fisherman and his Wife (Von dem Fischer un syner Fru, 1812-1857, told in Low German). He caught a great flounder who said he was an enchanted prince, and let him go. His wife Ilsebill keeps sending him back to the sea to ask for more: a cottage, a castle, to be king, emperor, pope, and at last to be like God. He goes unwillingly each time, and the sea grows darker. Humble, uneasy, kind. Never mention films.", greet: "I caught a flounder that could talk, and let him go. My wife says I should have asked him for something..." } }, g);
gmmPerson(342, hx - 3, hz + 5, 0.1, { sex: "f", look: { topKind: "dress", top: 0x8A5A6A, layer: "apron", layerColor: 0xD8D0C0, hair: 0x5A3A2A, hairStyle: "bun" }, talk: { name: "Ilsebill, the fisherman's wife", persona: "Ilsebill, the fisherman's wife in the Grimms' The Fisherman and his Wife (1812-1857). Never content: from their hovel she wants a cottage, then a castle, then to be king, emperor, pope, and at last to be like God and make the sun and moon rise, after which they are back in the hovel. Sharp-tongued, restless, grand. Never mention films.", greet: "Husband! Why didn't you wish for anything? Go back and call the flounder!" } }, g);
GMM.fish = { st: 0 };
gmmSpot(sx, sz + 3, 5, "The edge of the sea", "call the flounder", function () { gmmFlounderCall(); });
},
function () {
var g = gmmDistrict("giants", 120), A = GMM_AT.giants;
var t = gmmG(A.x, gmmGround(A.x, A.z), A.z, g);
if (typeof ctuTree === "function")
ctuTree(t, { h: 28, tr: 1.6, crown: 0x3A6A2A, limbs: 9, roots: 8, spread: 1.2, big: 1, seed: 20 });
gmmRound(A.x, A.z, 2, -5, 40);
var gi = [];
[[6, 3, 0.2], [4, -6, 2.8]].forEach(function (p, i) {
var P = gmmPerson(351 + i, A.x + p[0], A.z + p[1], p[2], { sex: "m", s: 3.2, look: { top: i ? 0x6A5A3A : 0x5A4A2A, bottom: 0x3A3A2A, beard: 1, hair: i ? 0x3A2A1A : 0x8A6A3A } }, g, gmmGround(A.x + p[0], A.z + p[1]) + 0.6);
P.g.rotation.set(-Math.PI / 2 + 0.25, 0, p[2]);
gi.push(P);
gmmRound(A.x + p[0], A.z + p[1], 3, -5, 3);
});
GMM.giantsP = gi;
for (var s = 0; s < 8; s++) {
gmmAdd(new THREE.IcosahedronGeometry(0.3 + s % 3 * 0.1, 0), gmmMat("stone", 0x8A8A80), A.x - 6 + s * 0.6, gmmGround(A.x - 6, A.z + 8) + 0.2, A.z + 8 + (s % 2) * 0.5, g);
}
gmmSpot(A.x - 5, A.z + 8, 3, "Stones, and the giants asleep under the tree", "fill your pockets, climb the tree, and drop them", function () { gmmGiantsStart(); });
},
function () {
var g = gmmDistrict("winter", 200), A = GMM_AT.winter;
var y = gmmGround(A.x, A.z), lg = gmmC(0.5, 0.6, 14, "bark", 0x4A3A2A, A.x + 18, y + 0.5, A.z - 22, g, 10);
lg.rotation.z = Math.PI / 2;
lg.rotation.y = 0.5;
var sn = gmmC(0.55, 0.65, 14, null, 0xF4F8FA, A.x + 18, y + 0.85, A.z - 22, g, 10);
sn.rotation.z = Math.PI / 2;
sn.rotation.y = 0.5;
sn.scale.set(1, 1, 0.5);
var sl = gmmG(A.x - 6, y, A.z + 8, g, 0.4);
gmmB(0.7, 0.1, 1.8, "wood", 0x6A4A2E, 0, 0.4, 0, sl);
[-0.3, 0.3].forEach(function (o) { var r = gmmB(0.06, 0.06, 2, "wood", 0x5A3A22, o, 0.2, 0, sl); });
for (var w = 0; w < 10; w++) {
var st = gmmC(0.08, 0.08, 1.2, "bark", 0x5A4028, A.x - 6 + w * 0.18, y + 0.55 + (w % 3) * 0.15, A.z + 8.2, g, 6);
st.rotation.x = Math.PI / 2;
}
GMM.snowFall = wPoints(GMM.lite ? 500 : 1600, function (i) { var R = wRand(1300 + i); return [A.x + (R() - 0.5) * 360, y + R() * 60, A.z + (R() - 0.5) * 360]; }, 0xFFFFFF, 0.35, true);
g.add(GMM.snowFall);
},
function (g, pts, w, col) {
for (var i = 0; i < pts.length - 1; i++) {
var a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz), mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2;
var m = gmmAdd(new THREE.PlaneGeometry(w, L + w * 0.6), gmmShiny(col || 0x2E5260, 110), mx, gmmGround(mx, mz) + 0.08, mz, g);
m.rotation.x = -Math.PI / 2;
m.rotation.z = Math.atan2(dx, dz);
for (var s = 0; s < Math.floor(L / 2.5); s++) {
var t = (s + 0.5) / Math.floor(L / 2.5), sx = a[0] + dx * t, sz = a[1] + dz * t, nx = -dz / L, nz = dx / L, side = s % 2 ? 1 : -1;
gmmAdd(new THREE.IcosahedronGeometry(0.25 + (s % 3) * 0.12, 0), gmmMat("stone", 0x7A766C), sx + nx * side * (w / 2 + 0.3), gmmGround(sx, sz) + 0.1, sz + nz * side * (w / 2 + 0.3), g);
}
}
},
function (p, x, y, z, s) {
s = s || 1;
var g = gmmG(x, y, z, p), m = gmmMat(null, 0x2A1E16), mz = gmmMat(null, 0x3A2A1E);
var b = gmmS(0.75 * s, 0, 0, 0.95 * s, 0, g);
b.material = m;
b.scale.set(0.95, 0.85, 1.35);
var hd = gmmS(0.42 * s, 0, 0, 1.25 * s, 1.05 * s, g);
hd.material = m;
var sn = gmmS(0.2 * s, 0, 0, 1.12 * s, 1.42 * s, g);
sn.material = mz;
sn.scale.set(1, 0.8, 1.3);
gmmS(0.06 * s, 0x0A0A0A, 0, 1.18 * s, 1.66 * s, g, 6);
[-1, 1].forEach(function (k) { var e = gmmS(0.13 * s, 0, k * 0.3 * s, 1.6 * s, 0.95 * s, g, 8); e.material = m; gmmS(0.04 * s, 0x0A0A0A, k * 0.16 * s, 1.36 * s, 1.38 * s, g, 6); });
[[-0.42, 0.6], [0.42, 0.6], [-0.42, -0.55], [0.42, -0.55]].forEach(function (q) { var l = gmmC(0.22 * s, 0.2 * s, 0.75 * s, null, 0x2A1E16, q[0] * s, 0.37 * s, q[1] * s, g, 10); });
g.userData.keep = 1;
return g;
},
function (g, x, z, s) {
s = s || 1;
var y = gmmGround(x, z);
gmmC(0.18 * s, 0.25 * s, 1.4 * s, "bark", 0x4A3426, x, y + 0.7 * s, z, g, 8);
for (var k = 0; k < 5; k++) {
var c = gmmK((1.7 - k * 0.25) * s, 2.6 * s, null, [0x1E3A2E, 0x24402F, 0x1A3428][k % 3], x, y + (1.8 + k * 1.35) * s, z, g, 9);
}
for (var b = 0; b < 26; b++) {
var a = b * 2.39, h = (1.6 + (b % 9) * 0.6) * s, rr = (1.5 - (b % 9) * 0.14) * s;
gmmS(0.06, 0x4A5A8A, x + Math.cos(a) * rr, y + h, z + Math.sin(a) * rr, g, 5);
}
},
function (p, x, z, ry) {
var y = gmmGround(x, z), g = gmmG(x, y, z, p, ry), m = gmmMat(null, 0xB88A48), mn = gmmMat(null, 0x6A4222);
var b = gmmS(0.6, 0, 0, 0.95, 0, g);
b.material = m;
b.scale.set(0.8, 0.75, 1.6);
var mane = gmmS(0.62, 0, 0, 1.35, 0.8, g);
mane.material = mn;
var hd = gmmS(0.36, 0, 0, 1.35, 1.12, g);
hd.material = m;
gmmS(0.05, 0x0A0A0A, -0.13, 1.45, 1.42, g, 6);
gmmS(0.05, 0x0A0A0A, 0.13, 1.45, 1.42, g, 6);
var mo = gmmS(0.16, 0, 0, 1.18, 1.36, g);
mo.material = m;
[[-0.32, 0.7], [0.32, 0.7], [-0.32, -0.7], [0.32, -0.7]].forEach(function (q) { gmmC(0.15, 0.13, 0.7, null, 0xB88A48, q[0], 0.35, q[1], g, 8); });
var t = gmmC(0.05, 0.05, 1.1, null, 0xB88A48, 0, 0.9, -1.2, g, 6);
t.rotation.x = -0.8;
gmmS(0.12, 0x6A4222, 0, 0.5, -1.6, g, 6);
gmmRound(x, z, 1.2, -5, 2);
g.userData.keep = 1;
return g;
},
function (p, x, z, ry) {
var y = gmmGround(x, z), g = gmmG(x, y, z, p, ry), w = 3.2, d = 3.2, h = 3;
gmmB(w + 0.4, 0.3, d + 0.4, "stone", 0x6A6458, 0, 0.15, 0, g);
gmmB(w + 0.3, 0.2, d + 0.3, null, 0x2A2622, 0, h, 0, g);
for (var i = 0; i <= 8; i++) {
var t = -w / 2 + i * w / 8;
[[t, -d / 2], [t, d / 2], [-w / 2, t], [w / 2, t]].forEach(function (q) { gmmC(0.04, 0.04, h, null, 0x2A2622, q[0], h / 2 + 0.15, q[1], g, 6); });
}
gmmB(0.5, 0.4, 0.15, null, 0x3A342E, 0.6, 1.3, d / 2 + 0.08, g);
gmmSolidIn(g, 0, 0, w + 0.4, d + 0.4, -5, h + 1);
return g;
},
function (p, x, z, ry, o) {
var H = gmmTimberHouse(p, x, z, ry, { w: o.w || 18, d: o.d || 11, fl: o.fl || 3, plaster: o.plaster || 0xE4D6BC, timber: o.timber || 0x3A2414, roof: o.roof || 0x5A5E66, roofKind: o.roofKind || "slate", shutters: o.shutters, lit: o.lit, sign: o.sign });
if (o.turret !== false) {
var tt = gmmG((o.w || 18) / 2, 0, (o.d || 11) / 2 - 1, H.g);
var th = (o.fl || 3) * 3.1 + 4;
gmmC(1.7, 1.8, th, "stone", 0x9A9284, 0, th / 2, 0, tt, 14);
gmmK(2.2, 5.2, "slate", o.roof || 0x5A5E66, 0, th + 2.6, 0, tt, 14);
for (var k = 0; k < 3; k++)
gmmWindow(tt, 0, 3 + k * 3, 1.75, 0, 0.6, 1.1, { lit: o.lit && k === 2 ? 0xFFC878 : 0 });
var tq = gmmTo(tt, 0, 0);
var TS = gmmRound(tq.x, tq.z, 2, -5, th + 6);
}
return H;
},
function () {
var g = gmmDistrict("snowrose", 200), A = GMM_AT.snowrose;
var h = gmmCottage(g, A.x, A.z - 8, 0, { walls: "plaster", col: 0xF0E6D2, roofKind: "thatch", roof: 0x9A8458, w: 9, d: 7, shutters: 0x2A4A3A, flowers: 1, lit: 0xFFC070 });
gmmEnterable(h, "snowrose", "The widow's cottage");
gmmRoseTree(g, A.x - 2.6, A.z - 2.6, 0xF4F4F0);
gmmRoseTree(g, A.x + 2.6, A.z - 2.6, 0xC81A2A);
gmmFence(g, [A.x - 8, A.z + 2], [A.x - 1.4, A.z + 2]);
gmmFence(g, [A.x + 1.4, A.z + 2], [A.x + 8, A.z + 2]);
var lamb = gmmBeast("sheep", A.x + 6, A.z + 5, 0.4, 0.7, 201, g);
gmmDove(g, A.x - 1, gmmGround(A.x - 1, A.z - 4.4) + 3.4, A.z - 4.4);
var bear = gmmBearShape(g, A.x + 4, gmmGround(A.x + 4, A.z + 12), A.z + 12, 1.15);
bear.rotation.y = Math.PI;
bear.visible = false;
GMM.srBear = bear;
var tx = A.x + 36, tz = A.z - 30, ty = gmmGround(tx, tz), lg = gmmC(0.45, 0.55, 9, "bark", 0x5A4632, tx, ty + 0.5, tz, g, 12);
lg.rotation.z = Math.PI / 2;
lg.rotation.y = 0.4;
gmmB(0.2, 0.5, 0.3, "wood", 0x8A7050, tx + 1, ty + 1, tz + 0.4, g);
var bx = A.x - 40, bz = A.z + 30;
gmmBrook(g, [[bx - 30, bz - 20], [bx - 10, bz - 4], [bx + 4, bz + 6], [bx + 20, bz + 30]], 2.4);
var hx = A.x + 40, hz = A.z + 44;
for (var r = 0; r < 9; r++) {
var R = wRand(2100 + r);
gmmAdd(new THREE.IcosahedronGeometry(1 + R() * 1.6, 1), gmmMat("stone", 0x8A8478), hx - 12 + R() * 24, gmmGround(hx, hz) + 0.4, hz - 10 + R() * 20, g);
}
for (var f = 0; f < 30; f++) {
var R2 = wRand(2200 + f), fx = hx - 20 + R2() * 40, fz = hz - 16 + R2() * 32;
gmmS(0.35 + R2() * 0.25, 0x7A4A8A, fx, gmmGround(fx, fz) + 0.2, fz, g, 6).scale.y = 0.5;
}
var eagle = gmmBirdShape(g, hx, gmmGround(hx, hz) + 16, hz, 2.6, 0x4A3A2A, 0.15, 0xE8B020);
GMM.movers.push({ k: "hover", g: eagle, y: gmmGround(hx, hz) + 16, ph: 0 });
GMM.srEagle = eagle;
var dw = gmmFolk(2001, tx + 1.2, tz + 1.4, 2.6, { sex: "m", s: 0.55, look: { top: 0x6A5A3A, bottom: 0x3A3A2A, hat: "pixie", hatColor: 0x5A4A2A, beard: 1, hair: 0xE8E8E0 } }, gmmTalkOf("The dwarf with the long white beard", "The ungrateful dwarf of the Grimms' Snow-White and Rose-Red (1857), old, withered, with a snow-white beard a yard long. You curse and scold everyone who helps you ('You stupid, prying goose!'), call them uncouth for cutting your fine beard, and hoard gold, pearls and precious stones in caves. You bewitched a king's son into a bear and stole his treasure. Spiteful, sharp, greedy.", "What are you staring at? Can you not come here and help me? You stupid, prying goose!"), g);
dw.g.visible = false;
GMM.srDwarf = dw;
gmmSpot(tx, tz + 2, 3, "A felled tree, and something white caught in the cleft", "go and look", function () { gmmSRTree(); });
gmmSpot(bx + 4, bz + 4, 3.4, "The brook", "go and look", function () { gmmSRBrook(); });
gmmSpot(hx, hz, 6, "The heath among the rocks", "cross it", function () { gmmSRHeath(); });
gmmSpot(A.x, A.z + 6, 3, "The cottage door", "listen: someone is knocking (in the winter evenings)", function () { gmmSRKnock(); });
gmmSignPost(g, A.x + 10, A.z + 24, 0.3, ["SNOW-WHITE AND ROSE-RED", "Grimm No. 161 · the widow's cottage"], 4.2);
},
function () {
var g = gmmDistrict("goosegirl", 240), A = GMM_AT.goosegirl;
var cx = A.x + 30, cz = A.z - 30, H = gmmHallHouse(g, cx, cz, 0.1, { w: 22, d: 12, fl: 3, plaster: 0xE8DCC4, roof: 0x4A4E58, lit: 1, shutters: 0x3A4A5A });
gmmEnterable(H, "gghall", "The old king's hall");
[[cx - 22, cz - 14, cx - 22, cz + 20], [cx + 26, cz - 14, cx + 26, cz + 20], [cx - 22, cz - 14, cx + 26, cz - 14], [cx - 22, cz + 20, cx - 3, cz + 20], [cx + 7, cz + 20, cx + 26, cz + 20]].forEach(function (w) { gmmWallLine(g, [w[0], w[1]], [w[2], w[3]], 5.2, 0x8A8478); });
var gt = gmmG(cx + 2, gmmGround(cx + 2, cz + 20), cz + 20, g);
[-1, 1].forEach(function (s) { gmmB(3, 9, 7, "stone", 0x7A746A, s * 4, 4.5, 0, gt); gmmSolidIn(gt, s * 4, 0, 3, 7, -5, 10); });
gmmB(11, 3, 7, "stone", 0x7A746A, 0, 7.5, 0, gt);
gmmPrism(11.4, 3, 7.4, "slate", 0x3E4652, 0, 10.5, 0, gt, 0);
gmmB(5, 6, 0.1, null, 0x0E0C0A, 0, 3, -3.4, gt);
var arch = gmmAdd(new THREE.TorusGeometry(2.5, 0.3, 6, 16, Math.PI), gmmMat("stone", 0x6A6458), 0, 6, 3.55, gt);
var fh = gmmG(0, 4.6, -3.2, gt);
var hm = gmmMat(null, 0xF2EEE6);
var hb = gmmS(0.32, 0, 0, 0, 0.2, fh);
hb.material = hm;
hb.scale.set(0.8, 1, 1.2);
var mz2 = gmmC(0.16, 0.24, 0.75, null, 0xF2EEE6, 0, -0.35, 0.45, fh, 10);
mz2.rotation.x = -1.1;
gmmS(0.05, 0x0A0A0A, -0.22, 0.08, 0.38, fh, 6);
gmmS(0.05, 0x0A0A0A, 0.22, 0.08, 0.38, fh, 6);
[-0.12, 0.12].forEach(function (k) { gmmK(0.07, 0.25, null, 0xF2EEE6, k, 0.38, 0.05, fh, 6); });
gmmC(0.02, 0.02, 0.4, null, 0x3A3A3A, 0, 0.1, 0, fh, 4).rotation.x = Math.PI / 2;
var gw = gmmTo(gt, 0, -1);
gmmSpot(gw.x, gw.z, 3, "Under the dark gateway: Falada's head", "speak to it", function () { gmmGGFalada(); });
var mx = A.x - 45, mz = A.z + 40;
GMM.ggGeese = [];
for (var i = 0; i < 16; i++) {
var R = wRand(2300 + i), gx = mx - 14 + R() * 28, gz = mz - 10 + R() * 20;
var gs = gmmGoose(g, gx, gmmGround(gx, gz), gz, false);
gs.rotation.y = R() * 6;
gs.userData.keep = 1;
GMM.ggGeese.push(gs);
}
for (var f = 0; f < 40; f++) {
var R3 = wRand(2400 + f), fx = mx - 20 + R3() * 40, fz = mz - 14 + R3() * 28;
gmmS(0.06, [0xF8F8F0, 0xF0D020, 0xD84A8A][f % 3], fx, gmmGround(fx, fz) + 0.12, fz, g, 5);
}
var conrad = gmmFolk(2011, mx + 6, mz - 4, 2.4, { sex: "m", s: 0.8, look: { top: 0x6A7A4A, bottom: 0x5A4A3A, hat: "cap", hatColor: 0x8A3A2A, hair: 0xC8A060 } }, gmmTalkOf("Conrad, the goose-boy", "Conrad, the little goose-boy of the Grimms' The Goose-Girl (1857). You keep the king's geese on the meadow with the new goose-girl, whose hair shines like pure gold; you want to pull a few hairs out, but she says a rhyme and the wind blows your hat away across the fields. You grumble to the old king that you won't keep the geese with her any more, and that she talks to the dead horse's head under the gateway. Sulky, a child.", "She talks to the dead horse's head under the gate! And when I want just one of her golden hairs, the wind takes my hat."), g);
GMM.ggConrad = conrad;
gmmSpot(mx, mz, 6, "The goose meadow", "sit down and comb out your hair", function () { gmmGGMeadow(); });
var rx = A.x + 40, rz = A.z + 80;
gmmBrook(g, [[rx - 20, rz - 10], [rx, rz], [rx + 24, rz + 6]], 2.2);
gmmSpot(rx, rz - 2, 3.4, "The brook beside the road", "dismount and drink", function () { gmmGGBrook(); });
var fal = gmmBeast("horse", rx + 4, rz - 6, 0.6, 0.76, 2002, g);
GMM.ggFalada = fal;
gmmSignPost(g, A.x + 48, A.z + 96, 0.2, ["THE GOOSE-GIRL", "Grimm No. 89 · the old king's castle"], 4.2);
},
function () {
var g = gmmDistrict("swans", 220), A = GMM_AT.swans;
var hut = gmmCottage(g, A.x - 30, A.z - 22, 0.5, { walls: "log", roofKind: "shingle", roof: 0x3A3A2A, w: 7, d: 6, h: 2.4, shutters: 0x2A2A2A });
gmmEnterable(hut, "swanhut", "A little hut in the wood");
var px = A.x - 14, pz = A.z - 40, py = gmmGround(px, pz), pond = gmmAdd(new THREE.CircleGeometry(10, 32), gmmShiny(0x22404C, 100), px, py + 0.12, pz, g);
pond.rotation.x = -Math.PI / 2;
gmmRound(px, pz, 9.6, -5, 0.5);
GMM.swanBirds = [];
for (var s = 0; s < 6; s++) {
var a = s / 6 * Math.PI * 2, sw = gmmSwan(g, px + Math.cos(a) * 5, py + 0.25, pz + Math.sin(a) * 5);
sw.rotation.y = -a;
sw.visible = false;
GMM.swanBirds.push(sw);
GMM.movers.push({ k: "bob", g: sw, y: py + 0.25, ph: s });
}
var sx = A.x + 20, sz = A.z - 20;
GMM.starwort = [];
for (var k = 0; k < 6; k++) {
var R = wRand(2500 + k), wx = sx - 14 + R() * 28, wz = sz - 12 + R() * 24, tuft = gmmG(wx, gmmGround(wx, wz), wz, g);
for (var f = 0; f < 12; f++) {
var a2 = f * 2.39, rr = 0.2 + (f % 4) * 0.15;
gmmC(0.015, 0.015, 0.5, null, 0x3A6A2A, Math.cos(a2) * rr, 0.25, Math.sin(a2) * rr, tuft, 4);
gmmS(0.07, 0xF4F2FA, Math.cos(a2) * rr, 0.52, Math.sin(a2) * rr, tuft, 6);
gmmS(0.03, 0xF0C020, Math.cos(a2) * rr, 0.56, Math.sin(a2) * rr, tuft, 4);
}
tuft.userData.keep = 1;
tuft.traverse(function (o) { o.userData.keep = 1; });
GMM.starwort.push(tuft);
(function (k, wx, wz) { gmmSpot(wx, wz, 1.8, "Starwort (asters)", "gather it, without a word", function () { gmmSwanGather(k); }); })(k, wx, wz);
}
var tx = A.x + 4, tz = A.z + 10, tt = gmmG(tx, gmmGround(tx, tz), tz, g);
if (typeof ctuTree === "function")
ctuTree(tt, { h: 18, tr: 1.1, crown: 0x3A6A2A, limbs: 7, roots: 6, spread: 1.1, seed: 49 });
gmmRound(tx, tz, 1.2, -5, 30);
gmmSpot(tx, tz + 2, 2.6, "The tall tree", "climb up and sew", function () { gmmSwanTree(); });
var kx = A.x + 40, kz = A.z + 52, ky = gmmGround(kx, kz), moat = gmmAdd(new THREE.RingGeometry(16, 21, 40), gmmShiny(0x2A4652, 100), kx, ky + 0.1, kz, g);
moat.rotation.x = -Math.PI / 2;
var K = gmmG(kx, ky, kz, g, Math.PI);
gmmB(18, 13, 14, "stone", 0xA89C88, 0, 6.5, 0, K);
gmmB(18.6, 0.5, 14.6, "stone", 0x8A8274, 0, 13, 0, K);
[[-9, -7], [9, -7], [-9, 7], [9, 7]].forEach(function (c) { gmmC(1.6, 1.8, 17, "stone", 0xA89C88, c[0], 8.5, c[1], K, 14); gmmK(2.1, 6, "slate", 0x3A4250, c[0], 20, c[1], K, 14); });
gmmGable(K, 18, 14, 13, 7, "slate", 0x3A4250, 0.4, "stone", 0xA89C88);
for (var wi = 0; wi < 5; wi++)
for (var fl = 0; fl < 3; fl++)
gmmWindow(K, -7 + wi * 3.5, 3 + fl * 3.6, 7.12, 0, 1, 1.8, { lit: (wi + fl) % 3 === 1 ? 0xFFC878 : 0, frame: 0x8A8274 });
gmmDoor(K, 0, 0, 7.05, 0, 2, 3.2, 0x4A3020, { arch: 1 });
gmmSolidIn(K, 0, 0, 18.4, 14.4, -5, 24);
var bp = gmmTo(K, 0, 18.5), bridgeY = ky + 0.3;
gmmB(3, 0.4, 8.6, "wood", 0x6A4A2E, bp.x, bridgeY, bp.z, g, Math.PI);
[-1, 1].forEach(function (sd) { gmmB(0.12, 0.9, 8.6, "wood", 0x5A3A22, bp.x + sd * 1.4, bridgeY + 0.6, bp.z, g); });
GMM.swanBridge = { x: bp.x, z: bp.z, hw: 1.4, hd: 4.4 };
gmmRoundRing(kx, kz, 16, 21);
gmmEnterable({ door: gmmTo(K, 0, 9), ry: Math.PI, y: ky }, "swanking", "The king's castle");
var fx = kx - 8, fz = kz - 30, pg = gmmG(fx, gmmGround(fx, fz), fz, g);
for (var l = 0; l < 16; l++) {
var lg = gmmC(0.16, 0.16, 2.6, "bark", 0x5A4632, 0, 0.3 + ((l / 4) | 0) * 0.32, 0, pg, 6);
lg.rotation.z = Math.PI / 2;
lg.rotation.y = l * 0.8;
}
gmmC(0.12, 0.12, 4, "wood", 0x4A3420, 0, 2, 0, pg, 6);
gmmRound(fx, fz, 1.6, -5, 2);
gmmSpot(fx, fz + 3, 3, "The pyre", "the last day of the six years", function () { gmmSwanPyre(); });
var cw = gmmS(0.25, 0xE8D8B8, A.x - 6, gmmGround(A.x - 6, A.z + 60) + 0.25, A.z + 60, g, 10);
cw.userData.keep = 1;
GMM.swanClew = cw;
gmmSpot(A.x - 6, A.z + 60, 2.6, "A magic clew of yarn", "throw it down in front of you", function () { gmmSwanClew(); });
gmmSignPost(g, A.x + 2, A.z + 70, 0.2, ["THE SIX SWANS", "Grimm No. 49 · the hut in the wood"], 4.2);
},
function () {
var g = gmmDistrict("ravens", 240), A = GMM_AT.ravens;
var h = gmmCottage(g, A.x - 30, A.z + 50, 0.3, { walls: "plaster", col: 0xE4D8C0, roofKind: "tile", roof: 0x8A3A24, w: 9, d: 7, shutters: 0x3A4A3A, flowers: 1, lit: 0xFFC070 });
gmmEnterable(h, "ravenhome", "The house with seven empty beds");
var wx = A.x - 18, wz = A.z + 62;
gmmWell(g, wx, wz, { roofKind: "shingle", roof: 0x4A3A2A });
gmmSpot(wx, wz + 2, 2.8, "The spring", "the seven boys and the jug", function () { gmmRavensWell(); });
GMM.ravenBirds = [];
for (var r = 0; r < 7; r++) {
var rv = gmmRaven(g, wx + (r - 3) * 1.2, gmmGround(wx, wz) + 4, wz - 2);
rv.visible = false;
rv.userData.keep = 1;
GMM.ravenBirds.push(rv);
}
var mx = A.x + 30, mz = A.z - 40, my = gmmGround(mx, mz), M = gmmG(mx, my, mz, g), gl = gmmSee(0xCDE6F2, 0.55);
[[0, 0, 26, 42], [-14, 8, 16, 26], [13, 6, 15, 30], [4, -14, 14, 22], [-8, -10, 12, 20]].forEach(function (p) { var c = gmmAdd(new THREE.ConeGeometry(p[2], p[3], 7, 1), gl, p[0], p[3] / 2 - 1, p[1], M); c.rotation.y = p[0] * 0.1; c.userData.keep = 1; });
var sh = gmmAdd(new THREE.ConeGeometry(25, 40, 7, 1, true), gmmShiny(0xE8F4FA, 200), 0, 19, 0, M);
sh.scale.set(1.02, 1.0, 1.02);
sh.material = gmmSee(0xF4FAFF, 0.18);
sh.userData.keep = 1;
gmmRound(mx, mz, 24, -5, 40);
var door = gmmG(0, 0, 24.5, M);
gmmB(2.4, 3.6, 0.4, null, 0x9AB8C8, 0, 1.8, 0, door).material = gmmSee(0x9AB8C8, 0.85);
gmmB(0.4, 0.4, 0.1, null, 0x5A6A7A, 0.6, 1.7, 0.25, door);
var dp = gmmTo(door, 0, 1.6);
gmmSpot(dp.x, dp.z, 2.4, "The door of the Glass Mountain", "open it", function () { gmmRavensDoor(); });
GMM.ravenMtnDoor = { x: dp.x, z: dp.z, ry: 0, y: my };
var ex = A.x + 70, ez = A.z + 30;
gmmSignPost(g, ex, ez, -1.2, ["→ TO THE END OF THE WORLD", "the sun · the moon · the stars"], 4.2);
gmmSpot(ex - 2, ez + 2, 3, "The road to the end of the world", "go on, far, far", function () { gmmRavensWorldEnd(); });
gmmSignPost(g, A.x - 40, A.z + 90, 0.2, ["THE SEVEN RAVENS", "Grimm No. 25 · the house by the spring"], 4.2);
},
function () {
var g = gmmDistrict("ironjohn", 260), A = GMM_AT.ironjohn;
var H = gmmHallHouse(g, A.x + 20, A.z + 10, -0.2, { w: 20, d: 12, fl: 3, plaster: 0xE0D0B4, roof: 0x6A3A2A, roofKind: "tile", lit: 1, shutters: 0x5A2A1A });
gmmEnterable(H, "ijhall", "The king's castle");
var cg = gmmCage(g, A.x + 14, A.z + 30, 0);
var wm = gmmFolk(2021, A.x + 14, A.z + 30, Math.PI, { sex: "m", s: 1.1, look: { top: 0x7A4A2A, bottom: 0x6A3A1E, hair: 0x6A3A1E, hairStyle: "long", beard: 1 } }, gmmTalkOf("The wild man in the iron cage", "Iron John (Eisenhans) of the Grimms' Iron John (1857): a wild man, brown as rusty iron, hair hanging over your face to your knees, pulled up from the bottom of a forest pool and shut in an iron cage in the king's court; the queen keeps the key under her pillow. You are really a great king under a spell, with gold and silver beyond count. Gruff, few words, kind to the boy who frees you.", "Give me my freedom. ...Thy golden ball? Not till thou hast opened the door for me."), g);
GMM.ijWild = wm;
gmmSpot(A.x + 14, A.z + 33.4, 2.6, "The iron cage", "speak to the wild man", function () { gmmIJCage(); });
var px = A.x - 40, pz = A.z - 40, py = gmmGround(px, pz), pool = gmmAdd(new THREE.CircleGeometry(8, 30), gmmShiny(0x10181C, 120), px, py + 0.1, pz, g);
pool.rotation.x = -Math.PI / 2;
gmmRound(px, pz, 7.6, -5, 0.5);
GMM.ijPool = pool;
gmmSpot(px, pz + 9, 3, "A deep pool in the forest", "bale it out", function () { gmmIJPool(); });
var sx = A.x - 60, sz = A.z + 40, sy = gmmGround(sx, sz);
gmmC(1.8, 2, 0.8, "stone", 0x8A847A, sx, sy + 0.4, sz, g, 16);
var gs = gmmC(1.5, 1.5, 0.06, null, 0, sx, sy + 0.82, sz, g, 16);
gs.material = gmmShiny(0xF0C030, 160);
gmmRound(sx, sz, 2, -5, 1);
gmmSpot(sx, sz + 2.6, 2.6, "The golden spring", "keep watch, and let nothing fall in", function () { gmmIJSpring(); });
var gx = A.x + 46, gz = A.z - 10;
for (var b = 0; b < 4; b++) {
gmmB(9, 0.3, 2, "earth", 0x5A4632, gx, gmmGround(gx, gz - 6 + b * 4) + 0.15, gz - 6 + b * 4, g);
for (var f = 0; f < 10; f++)
gmmS(0.13, [0xD83A5A, 0xF0D020, 0xF4F4F0, 0x8A4AC8][(b + f) % 4], gx - 4 + f * 0.9, gmmGround(gx, gz) + 0.5, gz - 6 + b * 4, g, 6);
}
gmmFolk(2022, gx - 6, gz, 1.4, { sex: "m", look: { top: 0x5A6A3A, bottom: 0x4A3A2A, hat: "brimmed", hatColor: 0x6A5A3A, beard: 1, hair: 0xC8C8C0 } }, gmmTalkOf("The old gardener", "The king's gardener in the Grimms' Iron John (1857). The young gardener's boy you took on never takes off his cap, says he has a sore head. You tell him to dig and hoe and bear the wind and bad weather, and grumble when he takes common wild flowers to the king's daughter. Old, patient, plain.", "Dig and hoe, boy, and bear the wind and the weather. And keep that cap of yours on, if you must."), g);
gmmSpot(gx - 4, gz + 8, 2.6, "Wild flowers, by the hedge", "pick a garland for the king's daughter", function () { gmmIJFlowers(); });
var lx = A.x + 20, lz = A.z - 60;
for (var l = 0; l < 12; l++) {
var lp = gmmB(0.12, 1.1, 0.12, "wood", 0x6A4A2E, lx - 22 + l * 4, gmmGround(lx - 22 + l * 4, lz) + 0.55, lz, g);
}
gmmB(46, 0.1, 0.08, "wood", 0x8A5A30, lx, gmmGround(lx, lz) + 1, lz, g);
var tb = gmmG(lx, gmmGround(lx, lz - 8), lz - 8, g);
gmmB(10, 2, 4, "wood", 0x6A4A2E, 0, 1, 0, tb);
gmmPrism(10.4, 1.6, 4.4, "tile", 0xA83A2A, 0, 3.4, 0, tb, 0);
[0x2A4AA8, 0xF0D020].forEach(function (c, i) { gmmB(1.4, 1.8, 0.04, null, c, -3 + i * 6, 2.6, 2.05, tb); });
gmmSpot(lx, lz + 4, 6, "The lists, where the golden apple is thrown", "ride in and catch it", function () { gmmIJApple(); });
gmmSpot(A.x - 20, A.z - 90, 4, "The edge of the forest", "call out \"Iron John!\"", function () { gmmIJCall(); });
gmmSignPost(g, A.x + 40, A.z + 60, 0.3, ["IRON JOHN", "Grimm No. 136 · the king's forest"], 4.2);
},
function () {
var g = gmmDistrict("thrush", 260), A = GMM_AT.thrush;
var F = gmmHallHouse(g, A.x - 60, A.z - 40, 0.6, { w: 18, d: 11, fl: 3, plaster: 0xF0E4CC, roof: 0x3E4652, lit: 1, shutters: 0x2A3A5A });
gmmEnterable(F, "thrushfather", "Her father's hall");
var tx = A.x + 20, tz = A.z + 10;
for (var i = 0; i < 6; i++) {
var sd = i % 2 ? 1 : -1, hx = tx + sd * 14, hz = tz - 30 + ((i / 2) | 0) * 16;
var Hh = gmmTimberHouse(g, hx, hz, sd > 0 ? -Math.PI / 2 : Math.PI / 2, { w: 8, d: 7, fl: 2 + (i % 2), plaster: [0xF0E4CC, 0xE8D8B4, 0xDCD4C0][i % 3], roof: [0x9A3A24, 0x6A6A70, 0x8A3420][i % 3], cheap: 1, shutters: 0x3A5A3A });
gmmEnterable(Hh, ["kasselhome", "burgher", "lodgings"][i % 3], "A house in King Thrushbeard's town");
}
var mx = tx, mz = tz + 14;
gmmB(26, 0.15, 18, "paving", 0x9A9488, mx, gmmGround(mx, mz) + 0.06, mz, g);
var st = gmmG(mx + 8, gmmGround(mx + 8, mz + 6), mz + 6, g, 0.3);
gmmB(3.4, 0.9, 1.6, "wood", 0x6A4A2E, 0, 0.45, 0, st);
gmmPrism(3.8, 0.8, 2, null, 0xD8C8A0, 0, 2.3, 0, st, 0);
[-1.6, 1.6].forEach(function (x) { gmmB(0.1, 2, 0.1, "wood", 0x5A3A22, x, 1, 0.7, st); gmmB(0.1, 2, 0.1, "wood", 0x5A3A22, x, 1, -0.7, st); });
GMM.thrushPots = [];
for (var p = 0; p < 14; p++) {
var pp = gmmC(0.16 + (p % 3) * 0.04, 0.12, 0.3 + (p % 2) * 0.1, null, [0xA85A3A, 0x8A4A2E, 0xC8B898][p % 3], (p % 7) * 0.45 - 1.4, 1.05, ((p / 7) | 0) * 0.6 - 0.3, st, 10);
pp.userData.keep = 1;
GMM.thrushPots.push(pp);
}
var spt = gmmTo(st, 0, 1.8);
gmmSpot(spt.x, spt.z, 2.6, "A corner of the market", "set out your pots and sell them", function () { gmmThrushMarket(); });
for (var m = 0; m < 4; m++) {
var ms = gmmG(mx - 8 + m * 4, gmmGround(mx, mz - 4), mz - 4, g);
gmmB(2.4, 0.9, 1.2, "wood", 0x6A4A2E, 0, 0.45, 0, ms);
gmmPrism(2.8, 0.7, 1.6, null, [0xC83A2A, 0x2A6AA8, 0xE8C040, 0x3A8A4A][m], 0, 2.2, 0, ms, 0);
gmmB(0.08, 1.8, 0.08, "wood", 0x5A3A22, -1.2, 0.9, 0.55, ms);
gmmB(0.08, 1.8, 0.08, "wood", 0x5A3A22, 1.2, 0.9, 0.55, ms);
}
gmmFolk(2031, mx - 4, mz - 2, 0, { sex: "f", look: { topKind: "dress", top: 0x6A3A5A, layer: "apron", layerColor: 0xE8E0D0, hair: 0x5A3A2A, hairStyle: "bun" } }, gmmTalkOf("A market-woman", "A market-woman in King Thrushbeard's town in the Grimms' King Thrushbeard (1857). You sell eggs and cabbages, and gossip about the king's son's wedding, and about the beautiful pot-seller at the corner whom people buy from because she is so pretty, until a drunken hussar rode his horse right through her pots.", "Fresh eggs! And have you heard, the king's son is to be married? There'll be such a feast at the palace."), g);
var pal = gmmPalace(g, tx, tz - 62, 0, { w: 44, d: 18, h: 12, col: 0xE8E0D0, trim: 0xF8F4EC, roof: 0x2A4A3E, lit: 1 });
gmmEnterable(pal, "thrushhall", "King Thrushbeard's palace");
var hut = gmmCottage(g, A.x + 70, A.z + 60, -0.8, { walls: "log", roofKind: "thatch", roof: 0x7A6A48, w: 5, d: 4, h: 2, shutters: 0x3A3A2A });
gmmEnterable(hut, "thrushhut", "The little hut");
[["forest", A.x - 90, A.z + 20], ["meadow", A.x - 40, A.z + 60], ["town", tx - 20, tz + 36]].forEach(function (q) { gmmSpot(q[1], q[2], 8, q[0] === "forest" ? "A beautiful forest" : q[0] === "meadow" ? "A beautiful green meadow" : "A fine large town", "ask the fiddler whose it is", function () { gmmThrushAsk(q[0]); }); });
gmmSignPost(g, A.x - 70, A.z - 10, 0.3, ["KING THRUSHBEARD", "Grimm No. 52 · her father's hall"], 4.2);
},
function () {
var g = gmmDistrict("brosis", 220), A = GMM_AT.brosis;
GMM.bsBrooks = [[-30, -36, "tiger"], [0, -48, "wolf"], [30, -36, "roebuck"]];
GMM.bsBrooks.forEach(function (B, i) {
var x = A.x + B[0], z = A.z + B[1];
gmmAdd(new THREE.IcosahedronGeometry(1.5, 1), gmmMat("stone", 0x5A6A4A), x, gmmGround(x, z) + 0.6, z - 1.6, g);
gmmBrook(g, [[x, z - 1], [x + 3, z + 8], [x + 1, z + 18]], 1.1, 0x2E5A66);
(function (i, x, z) { gmmSpot(x + 1, z + 3, 2.4, "A little brook", "listen to it", function () { gmmBSBrook(i); }); })(i, x, z);
});
var h = gmmCottage(g, A.x - 10, A.z + 20, 0.2, { walls: "log", roofKind: "shingle", roof: 0x4A3A2A, w: 6, d: 5, h: 2.3, shutters: 0x3A4A2A });
gmmEnterable(h, "bshouse", "A little house in the wood");
GMM.bsDoor = gmmTo(h.g, 0, 4);
gmmSpot(GMM.bsDoor.x, GMM.bsDoor.z, 2.2, "The little door", "\"My little sister, let me in\"", function () { gmmBSDoor(); });
var fawn = gmmBeast("deer", A.x - 4, A.z + 26, 0.3, 0.6, 2041, g);
fawn.visible = false;
GMM.bsFawn = fawn;
var K = gmmHallHouse(g, A.x + 40, A.z + 50, -0.4, { w: 20, d: 12, fl: 3, plaster: 0xF0E4CC, roof: 0x3E4652, lit: 1, shutters: 0x2A3A5A });
gmmEnterable(K, "bscastle", "The king's castle");
for (var hn = 0; hn < 3; hn++) {
gmmFolk(2042 + hn, A.x + 20 + hn * 3, A.z + 30, 2.4, { sex: "m", title: "hunter", look: { top: 0x3A5A2A, bottom: 0x3A2A1A, hat: "brimmed", hatColor: 0x2A3A1A, beard: hn % 2 } }, gmmTalkOf("One of the king's huntsmen", "A huntsman of the king in the Grimms' Little Brother and Little Sister (1857). For three days you hunted a beautiful roe with a golden collar; on the second day you wounded him a little in the foot and followed him to a little house in the wood, where he called 'My little sister, let me in', and the door opened. Loyal, plain, loves the hunt.", "Tra-ra! Did you see him? A young roe with a golden collar. We'll have him tomorrow."), g);
}
gmmSignPost(g, A.x, A.z + 70, 0, ["LITTLE BROTHER AND LITTLE SISTER", "Grimm No. 11 · the three brooks"], 4.6);
},
function () {
var g = gmmDistrict("water", 240), A = GMM_AT.water;
var K = gmmHallHouse(g, A.x - 40, A.z + 40, 0.5, { w: 20, d: 12, fl: 3, plaster: 0xE8DCC4, roof: 0x8A2A20, roofKind: "tile", lit: 1, shutters: 0x3A2A1A });
gmmEnterable(K, "waterking", "The sick king's castle");
gmmFolk(2051, A.x, A.z + 10, 2.6, { sex: "m", s: 0.55, look: { top: 0x5A3A6A, bottom: 0x3A3A2A, hat: "pixie", hatColor: 0x3A2A4A, beard: 1, hair: 0xC8C8C0 } }, gmmTalkOf("A dwarf by the road", "The dwarf of the Grimms' The Water of Life (1857). You stop each prince who rides by and ask 'Whither away so fast?' The two proud elder brothers answered rudely, so you cursed them into a ravine between two mountains. The youngest answered kindly, so you told him: the water springs from a fountain in the court of an enchanted castle; strike the iron door three times with an iron wand, give two loaves to the lions, and come out before the clock strikes twelve.", "Whither away so fast?"), g);
gmmSpot(A.x, A.z + 12.6, 2.4, "The dwarf", "tell him where you are going", function () { gmmWaterDwarf(); });
var rv = [A.x + 60, A.z + 50];
[-1, 1].forEach(function (s) { gmmAdd(new THREE.ConeGeometry(14, 30, 6), gmmMat("stone", 0x7A746A), rv[0] + s * 13, gmmGround(rv[0], rv[1]) + 12, rv[1], g); gmmRound(rv[0] + s * 13, rv[1], 10, -5, 30); });
gmmSpot(rv[0], rv[1], 5, "A ravine between two mountains", "look in", function () { gmmWaterRavine(); });
var ex = A.x + 40, ez = A.z - 50, E = gmmG(ex, gmmGround(ex, ez), ez, g, 0);
gmmB(26, 14, 16, "stone", 0x9A9090, 0, 7, 0, E);
gmmB(26.6, 0.5, 16.6, "stone", 0x6A6464, 0, 14, 0, E);
[[-13, -8], [13, -8], [-13, 8], [13, 8]].forEach(function (c) { gmmC(2.2, 2.4, 20, "stone", 0x9A9090, c[0], 10, c[1], E, 14); gmmK(2.8, 8, "slate", 0x2A3240, c[0], 24, c[1], E, 14); });
gmmGable(E, 26, 16, 14, 8, "slate", 0x2A3240, 0.4, "stone", 0x9A9090);
for (var w = 0; w < 6; w++)
gmmLancet(E, -10 + w * 4, 8, 8.1, 0, 0.9, 2.4, { lit: w % 2 ? 0xFFD08A : 0 });
gmmB(2.6, 3.8, 0.3, null, 0x2A2A2E, 0, 1.9, 8.1, E);
gmmSolidIn(E, 0, 0, 26.4, 16.4, -5, 30);
var ld = gmmTo(E, 0, 12);
gmmLion(g, ld.x - 3.6, ld.z, 0);
gmmLion(g, ld.x + 3.6, ld.z, 0);
var dd = gmmTo(E, 0, 9.6);
gmmSpot(dd.x, dd.z, 2.6, "The iron door", "strike it three times with the iron wand", function () { gmmWaterDoor(); });
GMM.waterDoor = { x: dd.x, z: dd.z, ry: 0, y: gmmGround(dd.x, dd.z) };
gmmFolk(2052, A.x - 70, A.z - 10, 1.2, { sex: "m", title: "hunter", look: { top: 0x3A4A2A, bottom: 0x3A2A1A, hat: "brimmed", hatColor: 0x2A3A1A, beard: 1 } }, gmmTalkOf("The king's huntsman", "The king's huntsman in the Grimms' The Water of Life (1857). The old king, deceived, ordered you to take the youngest prince into the forest and shoot him. You could not do it: you changed clothes with him and let him go. Sorrowful, honest.", "Dear prince... I cannot tell you, and yet I ought."), g);
gmmSpot(A.x - 70, A.z - 7, 2.6, "The king's huntsman, looking sad", "ask what ails him", function () { gmmWaterHunt(); });
var gr = gmmG(A.x - 10, 0, A.z - 90, g);
for (var s = 0; s < 14; s++) {
var gz = A.z - 120 + s * 4, gy = gmmGround(A.x - 10, gz);
var m = gmmB(4, 0.06, 4.1, null, 0xF0C030, A.x - 10, gy + 0.05, gz, g);
m.material = gmmShiny(0xF0C030, 140);
}
gmmSpot(A.x - 10, A.z - 94, 3, "The golden road", "ride straight up the middle of it", function () { gmmWaterRoad(); });
gmmSignPost(g, A.x - 30, A.z + 70, 0.4, ["THE WATER OF LIFE", "Grimm No. 97 · the sick king's castle"], 4.2);
},
function () {
var g = gmmDistrict("hans", 200), A = GMM_AT.hans;
var lane = [[A.x - 40, A.z - 60], [A.x - 20, A.z - 30], [A.x - 10, A.z], [A.x + 10, A.z + 24], [A.x + 30, A.z + 50], [A.x + 50, A.z + 76]];
for (var i = 0; i < lane.length - 1; i++) {
var a = lane[i], b = lane[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz), mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2;
var r = gmmB(3, 0.05, L + 2, "earth", 0x8A7454, mx, gmmGround(mx, mz) + 0.03, mz, g);
r.rotation.y = Math.atan2(dx, dz);
}
var M = gmmTimberHouse(g, A.x - 52, A.z - 68, 0.7, { w: 10, d: 8, fl: 2, plaster: 0xEADCC0, roof: 0x9A3A24, shutters: 0x3A5A3A, sign: ["HANS'S MASTER", "seven years' service"] });
gmmEnterable(M, "hansmaster", "His master's house");
GMM.hansAt = [];
var W = [[lane[1], "rider"], [lane[2], "cow"], [lane[3], "pig"], [lane[4], "goose"], [[A.x + 40, A.z + 60], "grinder"]];
W.forEach(function (w, i) {
var x = w[0][0] + 4, z = w[0][1], who = w[1], P, B = null;
if (who === "rider") {
B = gmmBeast("horse", x + 1.6, z, 0.6, 0.76, 2061, g);
P = gmmFolk(2062, x, z + 1, 0.6, { sex: "m", look: { top: 0x3A4A6A, bottom: 0xE8E0D0, hat: "tricorn", hatColor: 0x1A1A1A } }, gmmTalkOf("A horseman, trotting merrily", "The horseman in the Grimms' Hans in Luck (1857), on a fresh lively horse. You see Hans sweating under a lump of gold as big as his head and offer him your horse for it; you tell him to click his tongue and cry 'Jup! Jup!' to go fast. Smooth, sly, cheerful.", "Hollo! Why do you go on foot, then?"), g);
}
else if (who === "cow") {
B = gmmBeast("cow", x + 1.8, z, 0.4, 0.9, 2063, g);
P = gmmFolk(2064, x, z + 1, 0.4, { sex: "m", look: { top: 0x7A6A4A, bottom: 0x4A3A2A, hat: "brimmed", hatColor: 0x6A5A3A, beard: 1 } }, gmmTalkOf("A countryman driving a cow", "The peasant in the Grimms' Hans in Luck (1857), driving a cow. You catch the runaway horse that threw Hans into a ditch, and gladly swap your cow for it; the cow is old and dry, though you don't say so. Earthy, shrewd.", "That beast is no good for riding. Now a cow: you can walk quietly behind her, and have milk, butter and cheese every day."), g);
}
else if (who === "pig") {
B = gmmBeast("pig", x + 1.6, z, 0.2, 0.9, 2065, g);
P = gmmFolk(2066, x, z + 1, 0.2, { sex: "m", title: "baker", look: { top: 0xE8E0D0, bottom: 0x6A5A4A, layer: "apron", layerColor: 0xD8C8C0, hair: 0x8A5A3A } }, gmmTalkOf("A butcher with a young pig", "The butcher in the Grimms' Hans in Luck (1857), wheeling a young pig in a barrow. You find Hans faint after the cow kicked him (she gives no milk, she's old, fit only for the plough or the butcher), and swap your pig for the cow, 'out of love for you'. Sly.", "Take a drink and refresh yourself. That cow will give no milk; she's an old beast. I'll swap you the pig for her, out of love for you."), g);
}
else if (who === "goose") {
B = gmmGoose(g, x + 1.4, gmmGround(x + 1.4, z), z, false);
P = gmmFolk(2067, x, z + 1, 0.2, { sex: "m", s: 0.88, look: { top: 0x5A7A8A, bottom: 0x3A3A2A, hat: "cap", hatColor: 0x3A3A3A, hair: 0xD8B060 } }, gmmTalkOf("A lad with a white goose", "The lad with the goose in the Grimms' Hans in Luck (1857), taking a fat white goose to a christening feast. You frighten Hans: a pig was just stolen from the mayor's sty, and his pig might be it; the constables are out. So he swaps his pig for your goose, and you hurry off with the pig by a side road. Quick, sly, friendly.", "Feel how heavy she is! She's been fattened eight weeks. But your pig... a pig was stolen from the mayor's sty in the village just now."), g);
}
else {
var gw = gmmG(x + 1.4, gmmGround(x + 1.4, z), z, g);
gmmWheel(gw, 0, 0, 0);
gmmB(0.5, 0.9, 0.4, "wood", 0x6A4A2E, 0, 0.45, 0.6, gw);
var st = gmmC(0.3, 0.3, 0.12, "stone", 0x9A9488, 0, 1.1, 0.6, gw, 16);
st.rotation.x = Math.PI / 2;
P = gmmFolk(2068, x, z + 1, 0.2, { sex: "m", look: { top: 0x6A4A6A, bottom: 0x4A3A2A, hat: "brimmed", hatColor: 0x3A2A3A, beard: 1 } }, gmmTalkOf("A scissors-grinder at his wheel", "The scissors-grinder of the Grimms' Hans in Luck (1857), singing at your wheel: 'I sharpen scissors and quickly grind, my coat blows out in the wind behind.' You tell Hans a grinder hears money jingle in his pocket whenever he stands up, and swap him a worn grindstone and an ordinary heavy field stone for his goose. Merry, glib.", "I sharpen scissors and quickly grind, my coat blows out in the wind behind!"), g);
}
GMM.hansAt.push({ who: who, P: P, B: B, x: x, z: z });
(function (i, x, z) { gmmSpot(x, z + 2.6, 2.6, ["The horseman", "The countryman with the cow", "The butcher with the pig", "The lad with the goose", "The scissors-grinder"][i], "stop and talk about a swap", function () { gmmHansSwap(i); }); })(i, x, z);
});
var wl = [A.x + 56, A.z + 70];
gmmWell(g, wl[0], wl[1], { roofKind: "shingle", roof: 0x5A4A3A });
gmmSpot(wl[0], wl[1] + 2, 2.6, "A well by the field", "stoop to drink", function () { gmmHansWell(); });
var mh = gmmCottage(g, A.x + 70, A.z + 96, 0.6, { walls: "plaster", col: 0xF0E4CC, roofKind: "thatch", roof: 0x9A8458, w: 7, d: 6, shutters: 0x2A5A3A, flowers: 1, lit: 0xFFC070 });
gmmEnterable(mh, "hansmother", "His mother's house");
gmmSignPost(g, A.x - 56, A.z - 50, 0.6, ["HANS IN LUCK", "Grimm No. 83 · the lane home"], 4);
},
function () {
var g = gmmDistrict("juniper", 200), A = GMM_AT.juniper;
var H = gmmTimberHouse(g, A.x, A.z - 20, 0, { w: 12, d: 9, fl: 3, plaster: 0xEADCC4, roof: 0x5A5E66, roofKind: "slate", shutters: 0x2A2A2A, lit: 1 });
gmmEnterable(H, "junhouse", "The rich man's house");
gmmFence(g, [A.x - 10, A.z - 12], [A.x - 10, A.z + 4]);
gmmFence(g, [A.x + 10, A.z - 12], [A.x + 10, A.z + 4]);
gmmFence(g, [A.x - 10, A.z + 4], [A.x - 2, A.z + 4]);
gmmFence(g, [A.x + 2, A.z + 4], [A.x + 10, A.z + 4]);
gmmJuniper(g, A.x - 5, A.z - 6, 1.1);
gmmRound(A.x - 5, A.z - 6, 1.6, -5, 10);
gmmSpot(A.x - 5, A.z - 3.6, 2.2, "The juniper-tree", "lay the silk handkerchief beneath it", function () { gmmJunTree(); });
var G = gmmTimberHouse(g, A.x - 30, A.z + 20, Math.PI / 2, { w: 9, d: 8, fl: 2, plaster: 0xE4D8C0, roof: 0x8A3A24, sign: ["GOLDSMITH", "chains · rings"], shutters: 0x3A3A5A });
gmmEnterable(G, "jungold", "The goldsmith's");
var S = gmmTimberHouse(g, A.x + 30, A.z + 20, -Math.PI / 2, { w: 9, d: 8, fl: 2, plaster: 0xE8DCC8, roof: 0x7A3A2A, sign: ["SHOEMAKER", "red shoes, fine work"], shutters: 0x5A2A2A });
gmmEnterable(S, "junshoe", "The shoemaker's");
gmmFolk(2071, A.x - 26, A.z + 24, Math.PI / 2, { sex: "m", look: { top: 0xE8E0D0, bottom: 0x3A3A3A, layer: "apron", layerColor: 0x6A4A2E, hair: 0x6A6A6A } }, gmmTalkOf("The goldsmith, one slipper off", "The goldsmith of the Grimms' The Juniper-Tree (1857), making a gold chain when the bird sang on your roof. You ran out with one slipper off, your apron on, the chain in one hand and the pincers in the other, and gave the bird the chain to hear its song again. Dazzled.", "Bird, how beautifully thou canst sing! Sing me that piece again!"), g);
gmmFolk(2072, A.x + 26, A.z + 24, -Math.PI / 2, { sex: "m", look: { top: 0xD8D0C0, bottom: 0x4A3A2A, layer: "apron", layerColor: 0x5A3A22, hair: 0x3A2A1A, beard: 1 } }, gmmTalkOf("The shoemaker, in his shirt-sleeves", "The shoemaker of the Grimms' The Juniper-Tree (1857). You heard the bird and ran out in your shirt-sleeves, shading your eyes against the sun; you called your wife, children and apprentices to look at its red and green feathers and golden neck, and gave it the red shoes from the top shelf in the garret. Excited, loud.", "Wife! Come out! Look at that bird, he just can sing!"), g);
var mx = A.x + 10, mz = A.z + 60, ml = gmmTimberHouse(g, mx, mz, Math.PI, { w: 12, d: 10, fl: 2, plaster: 0xE4D8C0, roof: 0x7A3A24, sign: ["THE MILL", "klipp klapp"], shutters: 0x4A5A3A });
gmmEnterable(ml, "junmill", "The mill by the lime-tree");
var lt = gmmG(mx - 14, gmmGround(mx - 14, mz - 10), mz - 10, g);
if (typeof ctuTree === "function")
ctuTree(lt, { h: 16, tr: 1, crown: 0x4A7A3A, limbs: 7, roots: 5, spread: 1.1, seed: 47 });
gmmRound(mx - 14, mz - 10, 1, -5, 20);
var stone = gmmC(1.2, 1.2, 0.4, "stone", 0xA8A498, mx - 6, gmmGround(mx - 6, mz - 12) + 0.2, mz - 12, g, 20);
GMM.junStone = stone;
GMM.junMillers = [];
for (var m = 0; m < (GMM.lite ? 8 : 20); m++) {
var a = m / (GMM.lite ? 8 : 20) * Math.PI * 2, px = mx - 6 + Math.cos(a) * (3 + (m % 2)), pz = mz - 12 + Math.sin(a) * (3 + (m % 2));
GMM.junMillers.push(gmmPerson(2080 + m, px, pz, -a - Math.PI / 2, { sex: "m", look: { top: 0xE8E4DC, bottom: 0x6A5A4A, hat: "cap", hatColor: 0xE8E4DC, hair: [0x8A6A4A, 0x3A2A1A, 0xC8A060][m % 3] } }, g));
}
gmmSpot(mx - 6, mz - 7, 4, "Twenty miller's men hewing a stone", "listen to the bird in the lime-tree", function () { gmmJunMill(); });
gmmSpot(A.x - 30, A.z + 15, 3, "The goldsmith's roof", "listen to the bird", function () { gmmJunGold(); });
gmmSpot(A.x + 30, A.z + 15, 3, "The shoemaker's roof", "listen to the bird", function () { gmmJunShoe(); });
var bird = gmmBirdShape(g, A.x - 5, gmmGround(A.x - 5, A.z - 6) + 9, A.z - 6, 0.8, 0xC82A2A, 0.1, 0xE8B020);
var nk = gmmS(0.12, 0, 0, 0.42, 0.18, bird);
nk.material = gmmShiny(0xF0C030, 140);
[-1, 1].forEach(function (k) { var wg = gmmS(0.2, 0x2A8A3A, k * 0.22, 0.24, 0, bird, 8); wg.scale.set(0.4, 0.6, 1.3); });
bird.visible = false;
GMM.junBird = bird;
GMM.movers.push({ k: "hover", g: bird, y: bird.position.y, ph: 0 });
gmmSignPost(g, A.x + 12, A.z + 10, 0.2, ["THE JUNIPER-TREE", "Grimm No. 47 · Von dem Machandelboom"], 4.2);
},
function (R) {
R.at = function (lx, lz) { return { x: R.x + lx, z: lz }; };
R.spot = function (lx, lz, r, name, verb, fn, y) { return gmmSpot(R.x + lx, lz, r, name, verb, fn, y === undefined ? 0 : y); };
R.solid = function (lx, lz, w, d, y1) { return gmmSolid(R.x + lx, lz, w, d, -5, y1 === undefined ? 3 : y1); };
R.person = function (seed, lx, lz, ry, o) { return gmmPerson(seed, R.x + lx, lz, ry, o, R.D, 0); };
R.link = function (lx, lz, to, name, verb) {
var T = GMM_ROOMS[to];
if (!T)
return;
T.back = R.k;
T.backAt = { x: lx, z: lz };
return R.spot(lx, lz, 2.2, name, verb || "go through", function () { gmmEnterRoom(to, null); });
};
},
function (R, g) {
var w = R.w, d = R.d, h = R.h || 3.4, W = R.wall || ["plaster", 0xE8DCC0], F = R.floor || ["wood", 0x8A6A48];
gmmB(w, 0.2, d, F[0], F[1], 0, -0.1, 0, g);
if (R.outdoor) {
gmmFloor(R.x, 0, w - 2, d - 2, 0, true);
return;
}
gmmB(w, 0.2, d, R.ceilKind || (R.ceil ? null : "plaster"), R.ceil || 0xEFE6D4, 0, h + 0.1, 0, g);
gmmB(w + 0.4, h, 0.3, W[0], W[1], 0, h / 2, -d / 2 - 0.15, g);
gmmB(w + 0.4, h, 0.3, W[0], W[1], 0, h / 2, d / 2 + 0.15, g);
gmmB(0.3, h, d, W[0], W[1], -w / 2 - 0.15, h / 2, 0, g);
gmmB(0.3, h, d, W[0], W[1], w / 2 + 0.15, h / 2, 0, g);
if (R.timber) {
gmmTimbers(g, w, h, 0, 0, -d / 2 + 0.02, 0, 0x3A2414);
gmmTimbers(g, d, h, -w / 2 + 0.02, 0, 0, Math.PI / 2, 0x3A2414);
gmmTimbers(g, d, h, w / 2 - 0.02, 0, 0, -Math.PI / 2, 0x3A2414);
}
if (R.beams !== false && !R.vault)
for (var b = 0; b < Math.floor(w / 1.8); b++)
gmmB(0.22, 0.26, d, "wood", 0x4A2E1A, -w / 2 + 0.9 + b * 1.8, h - 0.13, 0, g);
if (R.vault) {
for (var v = 0; v < Math.floor(d / 4); v++) {
var a = gmmAdd(new THREE.TorusGeometry(w / 2 - 0.2, 0.25, 6, 20, Math.PI), gmmMat("stone", 0xB8B0A0), 0, h - 0.4, -d / 2 + 2 + v * 4, g);
}
}
var sk = W[0] === "stone" ? 0x6A6458 : 0x4A3020;
gmmB(w, 0.18, 0.05, null, sk, 0, 0.09, -d / 2 + 0.03, g);
gmmB(0.05, 0.18, d, null, sk, -w / 2 + 0.03, 0.09, 0, g);
gmmB(0.05, 0.18, d, null, sk, w / 2 - 0.03, 0.09, 0, g);
var wc = R.winCol || (R.env === "under" ? 0x3A3A7A : 0xCCE4F4), nw = R.win === undefined ? Math.max(1, Math.round(d / 4)) : R.win;
for (var i = 0; i < nw; i++) {
var wz = -d / 2 + (i + 0.5) * d / nw;
[-1, 1].forEach(function (s) {
if (R.winSide && R.winSide !== s)
return;
var wg = gmmG(s * (w / 2 - 0.02), Math.min(h - 1, 1.9), wz, g, s > 0 ? -Math.PI / 2 : Math.PI / 2);
gmmB(1.0, 1.4, 0.04, null, 0, 0, 0, 0, wg).material = gmmGlowM(wc);
gmmB(1.2, 0.08, 0.14, null, 0xE8E0D0, 0, 0.72, 0.04, wg);
gmmB(1.2, 0.08, 0.24, null, 0xE8E0D0, 0, -0.72, 0.08, wg);
gmmB(0.06, 1.4, 0.1, null, 0xE8E0D0, 0, 0, 0.04, wg);
gmmB(1.0, 0.05, 0.1, null, 0xE8E0D0, 0, 0.15, 0.04, wg);
});
}
var dg = gmmG(0, 0, d / 2 - 0.05, g, Math.PI);
gmmB(1.4, 2.3, 0.12, "wood", 0x5A3A22, 0, 1.15, 0, dg);
gmmB(1.7, 0.18, 0.2, "wood", 0x3A2414, 0, 2.38, 0, dg);
gmmS(0.05, 0x8A7A4A, 0.45, 1.1, -0.1, dg, 6);
gmmFloor(R.x, 0, w - 0.6, d - 0.6, 0, true);
R.spot(0, d / 2 - 1, 1.9, R.back ? "The way back" : "The door", "go out", function () { gmmLeaveRoom(R); });
},
function (k) {
var R = GMM_ROOMS[k];
if (!R)
return null;
if (!R.g) {
var g = new THREE.Group();
g.position.set(R.x, 0, 0);
GMM.G.add(g);
R.g = g;
R.D = new THREE.Group();
GMM.G.add(R.D);
gmmRoomKit(R);
try {
gmmShell(R, g);
if (R.f)
R.f(R, g);
}
catch (e) {
if (window.console)
console.warn("[grimm] room " + k, e);
}
try {
if (typeof ctnMerge === "function" && !R.noMerge)
ctnMerge(g);
}
catch (e) { }
var L = new THREE.PointLight(R.lightCol || 0xFFE0B8, Math.min(1, (R.light || 0.9) * 0.8), Math.max(R.w, R.d) * 1.4, 2);
L.position.set(0, (R.h || 3.4) - 0.6, 0);
g.add(L);
}
return R;
},
function (k, D) {
var R = gmmRoomGet(k);
if (!R)
return;
gmmVeil(0.35, function () {
if (D)
R.door = D;
GMM.room = R;
GMM.zone = "inside";
gmmShowOnly(R);
camera.position.set(GMM.base + R.x, 1.72, R.d / 2 - 2);
yaw = 0;
pitch = 0;
if (R.onEnter)
try {
R.onEnter(R);
}
catch (e) {
if (window.console)
console.warn("[grimm] enter " + k, e);
}
setStatus((R.icon || "🚪") + " <b>" + esc(R.n) + ".</b> " + (R.say || ""));
});
},
function (R) {
if (R.onLeave)
try {
R.onLeave(R);
}
catch (e) { }
if (R.back) {
var B = GMM_ROOMS[R.back];
gmmRoomGet(R.back);
gmmVeil(0.35, function () { GMM.room = B; gmmShowOnly(B); camera.position.set(GMM.base + B.x + R.backAt.x, 1.72, R.backAt.z + 1.6); yaw = 0; pitch = 0; setStatus((B.icon || "🚪") + " <b>" + esc(B.n) + ".</b>"); });
return;
}
gmmOutside(R.door);
},
function (D) {
gmmVeil(0.35, function () {
GMM.room = null;
gmmShowOnly(null);
var x = D ? D.x : GMM_AT.arrive.x, z = D ? D.z : GMM_AT.arrive.z;
var fx = D ? Math.sin(D.ry || 0) : 0, fz = D ? Math.cos(D.ry || 0) : 1;
x += fx * 0.8;
z += fz * 0.8;
camera.position.set(GMM.base + x, gmmGround(x, z, 1e4) + 1.72, z);
yaw = Math.atan2(-fx, -fz) + Math.PI;
pitch = 0;
GMM.zone = gmmZoneAt(x, z);
if (GMM.trees)
gmmForestFill(x, z, true);
});
},
function (g, x, z, w, d, col, o) {
o = o || {};
var t = gmmG(x, 0, z, g, o.ry || 0), h = o.h || 0.78;
gmmB(w, 0.08, d, "wood", col || GMM_WOOD, 0, h, 0, t);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { gmmB(0.09, h, 0.09, "wood", col || GMM_WOOD, c[0] * (w / 2 - 0.1), h / 2, c[1] * (d / 2 - 0.1), t); });
if (o.cloth)
gmmB(w + 0.1, 0.02, d + 0.1, null, o.cloth, 0, h + 0.05, 0, t);
return t;
},
function (g, x, z, ry, col, s) {
s = s || 1;
var c = gmmG(x, 0, z, g, ry);
gmmB(0.44 * s, 0.05, 0.44 * s, "wood", col || GMM_WOOD, 0, 0.46 * s, 0, c);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { gmmB(0.04, 0.46 * s, 0.04, "wood", col || GMM_WOOD, q[0] * 0.19 * s, 0.23 * s, q[1] * 0.19 * s, c); });
gmmB(0.44 * s, 0.5 * s, 0.04, "wood", col || GMM_WOOD, 0, 0.72 * s, -0.2 * s, c);
return c;
},
function (g, x, z, ry, o) {
o = o || {};
var L = o.L || 2.0, W = o.W || 1.0, b = gmmG(x, 0, z, g, ry), wc = o.wood || GMM_DARK;
gmmB(W + 0.1, 0.35, L, "wood", wc, 0, 0.25, 0, b);
gmmB(W + 0.1, o.post ? 1.9 : 1.0, 0.08, "wood", wc, 0, o.post ? 0.95 : 0.5, -L / 2, b);
gmmB(W + 0.1, 0.6, 0.08, "wood", wc, 0, 0.3, L / 2, b);
gmmB(W, 0.18, L - 0.1, null, 0xF4F0E8, 0, 0.5, 0, b);
var q = gmmB(W + 0.04, 0.12, L * 0.65, null, o.quilt || 0xC83A3A, 0, 0.62, L * 0.15, b);
gmmB(W * 0.7, 0.14, 0.38, null, 0xFFFFFF, 0, 0.66, -L / 2 + 0.3, b);
if (o.post) {
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { gmmB(0.08, 2.2, 0.08, "wood", wc, c[0] * W / 2, 1.1, c[1] * L / 2, b); });
gmmB(W + 0.1, 0.1, L, null, o.canopy || 0x7A2A3A, 0, 2.2, 0, b);
}
return b;
},
function (g, x, z, ry, w, h, o) {
o = o || {};
var s = gmmG(x, 0, z, g, ry);
gmmB(w, h, 0.36, "wood", o.col || GMM_DARK, 0, h / 2, 0, s);
var n = Math.max(2, Math.round(h / 0.42)), R = wRand(o.seed || 5);
for (var i = 0; i < n; i++) {
var y = 0.15 + i * (h - 0.2) / n;
gmmB(w - 0.06, 0.04, 0.34, "wood", 0x5A3A22, 0, y, 0.02, s);
if (o.books !== false) {
var px = -w / 2 + 0.08;
while (px < w / 2 - 0.12) {
var bw = 0.05 + R() * 0.07, bh = 0.24 + R() * 0.1;
gmmB(bw, bh, 0.24, null, [0x7A2A2A, 0x2A4A6A, 0x3A5A2A, 0x6A5A2A, 0x4A2A4A, 0x8A6A4A][(R() * 6) | 0], px + bw / 2, y + 0.02 + bh / 2, 0.06, s);
px += bw + 0.004;
}
}
else if (o.jars) {
for (var j = 0; j < Math.floor(w / 0.3); j++)
gmmC(0.08, 0.08, 0.22, null, [0x8AC8A8, 0xC8A86A, 0xA8A8C8, 0x6A4A2A][(j + i) % 4], -w / 2 + 0.18 + j * 0.3, y + 0.13, 0.04, s, 8);
}
else if (o.loaves) {
for (var l = 0; l < Math.floor(w / 0.4); l++) {
var lv = gmmS(0.15, 0xB8782A, -w / 2 + 0.25 + l * 0.4, y + 0.12, 0.04, s, 10);
lv.scale.set(1.3, 0.7, 0.9);
}
}
}
return s;
},
function (g, x, z, ry, col) {
var s = gmmG(x, 0, z, g, ry), c = col || 0x3A6A4A;
gmmB(1.4, 0.5, 1.0, "stone", 0x8A847A, 0, 0.25, 0, s);
var b = gmmB(1.2, 1.4, 0.9, null, c, 0, 1.2, 0, s);
b.material = gmmShiny(c, 60);
var t = gmmB(1.0, 0.6, 0.8, null, c, 0, 2.2, 0, s);
t.material = gmmShiny(c, 60);
gmmB(1.3, 0.1, 1.0, null, 0xC8B890, 0, 1.92, 0, s);
for (var i = 0; i < 4; i++)
for (var j = 0; j < 3; j++)
gmmB(0.26, 0.3, 0.02, null, typeof ctuMix === "function" ? ctuMix(c, 0xFFFFFF, 0.25) : c, -0.42 + i * 0.28, 0.68 + j * 0.4, 0.46, s);
return s;
},
function (g, R, x, z, ry, o) {
o = o || {};
var s = gmmG(x, 0, z, g, ry);
gmmB(2.4, 2.6, 0.8, "stone", 0x8A847A, 0, 1.3, -0.2, s);
gmmB(1.6, 1.3, 0.7, null, 0x1A120C, 0, 0.65, 0.05, s);
gmmB(2.8, 0.18, 0.9, "wood", GMM_DARK, 0, 1.95, 0.05, s);
if (o.fire !== false) {
gmmFire(g, x + Math.sin(ry || 0) * 0.25, 0.05, z + Math.cos(ry || 0) * 0.25, 0.6);
}
if (o.pot) {
var pt = gmmS(0.28, 0x2A2A2A, 0, 0.75, 0.15, s, 10);
pt.scale.y = 0.8;
gmmC(0.01, 0.01, 0.6, null, 0x2A2A2A, 0, 1.2, 0.15, s, 4);
}
for (var k = 0; k < 4; k++)
gmmC(0.05, 0.07, 0.18, null, [0x8A6A3A, 0xC8C0A8, 0x6A8AA8, 0xA85A3A][k], -0.9 + k * 0.6, 2.13, 0.05, s, 8);
return s;
},
function (g, x, z, ry) {
var s = gmmG(x, 0, z, g, ry);
gmmB(0.9, 0.08, 0.3, "wood", GMM_WOOD, 0, 0.45, 0, s);
[[-0.35, -0.1], [0.35, -0.1], [0, 0.12]].forEach(function (l) { var lg = gmmC(0.025, 0.03, 0.5, "wood", GMM_WOOD, l[0], 0.2, l[1], s, 6); });
var wh = gmmAdd(new THREE.TorusGeometry(0.42, 0.025, 6, 20), gmmMat("wood", GMM_WOOD), -0.2, 0.95, 0, s);
for (var i = 0; i < 6; i++) {
var sp = gmmB(0.02, 0.8, 0.02, "wood", GMM_WOOD, -0.2, 0.95, 0, s);
sp.rotation.z = i / 6 * Math.PI;
}
gmmC(0.02, 0.02, 0.7, "wood", GMM_WOOD, 0.3, 0.8, 0, s, 6);
gmmC(0.06, 0.06, 0.18, null, 0xE8E0C8, 0.3, 1.0, 0, s, 8);
return s;
},
function (g, x, z, ry) {
var s = gmmG(x, 0, z, g, ry);
[[-0.8, -0.5], [0.8, -0.5], [-0.8, 0.5], [0.8, 0.5]].forEach(function (c) { gmmB(0.08, 1.7, 0.08, "wood", GMM_WOOD, c[0], 0.85, c[1], s); });
gmmB(1.7, 0.08, 0.08, "wood", GMM_WOOD, 0, 1.65, -0.5, s);
gmmB(1.7, 0.08, 0.08, "wood", GMM_WOOD, 0, 0.8, 0.5, s);
gmmB(1.5, 0.9, 0.02, null, 0xB83A3A, 0, 1.15, -0.1, s);
gmmB(1.5, 0.02, 0.9, null, 0xE8D8B8, 0, 0.82, 0, s);
return s;
},
function (g, x, z, ry, col) {
var s = gmmG(x, 0, z, g, ry);
gmmB(0.6, 2.1, 0.4, "wood", col || 0x5A2E14, 0, 1.05, 0, s);
var f = gmmAdd(new THREE.CircleGeometry(0.22, 20), gmmMat(null, 0xF0E8D0), 0, 1.75, 0.21, s);
gmmB(0.02, 0.16, 0.01, null, 0x1A1A1A, 0, 1.8, 0.22, s);
gmmB(0.12, 0.02, 0.01, null, 0x1A1A1A, 0.05, 1.75, 0.22, s);
gmmB(0.4, 1.0, 0.02, null, 0x3A1E0C, 0, 0.8, 0.21, s);
var pd = gmmC(0.08, 0.08, 0.02, null, 0xD8B040, 0, 0.6, 0.23, s, 12);
pd.rotation.x = Math.PI / 2;
return s;
},
function (g, x, z, ry) {
var s = gmmG(x, 0, z, g, ry);
var b = gmmAdd(new THREE.CylinderGeometry(0.4, 0.4, 0.9, 12, 1, true, 0, Math.PI), gmmMat("wood", GMM_WOOD), 0, 0.45, 0, s);
b.rotation.z = Math.PI / 2;
b.rotation.y = Math.PI / 2;
b.material.side = THREE.DoubleSide;
gmmB(0.05, 0.6, 0.5, "wood", GMM_WOOD, -0.45, 0.3, 0, s);
gmmB(0.05, 0.6, 0.5, "wood", GMM_WOOD, 0.45, 0.3, 0, s);
gmmB(0.8, 0.1, 0.5, null, 0xF0E8F0, 0, 0.35, 0, s);
return s;
},
function (g, x, y, z, ry, w, h, draw, seed) {
var t = wTex(128, Math.round(128 * h / w), function (c, W, H) { var r = wRand(seed || 3); c.fillStyle = "#2A2018"; c.fillRect(0, 0, W, H); if (draw)
draw(c, W, H, r); });
var p = gmmG(x, y, z, g, ry);
gmmB(w + 0.14, h + 0.14, 0.05, null, 0xA88A3A, 0, 0, 0, p);
var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: t }));
m.position.z = 0.03;
m.userData.keep = 1;
p.add(m);
return p;
},
function (c, W, H, r) {
var gr = c.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, "#8AB0D8");
gr.addColorStop(0.6, "#E8E0C0");
c.fillStyle = gr;
c.fillRect(0, 0, W, H);
c.fillStyle = "#4A6A3A";
c.beginPath();
c.moveTo(0, H * 0.7);
for (var i = 0; i <= 8; i++)
c.lineTo(i * W / 8, H * (0.55 + r() * 0.15));
c.lineTo(W, H);
c.lineTo(0, H);
c.fill();
c.fillStyle = "#8A8A80";
c.fillRect(W * 0.6, H * 0.38, W * 0.12, H * 0.22);
c.fillRect(W * 0.58, H * 0.3, W * 0.04, H * 0.1);
c.fillRect(W * 0.7, H * 0.3, W * 0.04, H * 0.1);
c.fillStyle = "#2A3A2A";
for (var k = 0; k < 9; k++) {
c.beginPath();
c.arc(r() * W, H * 0.75 + r() * H * 0.2, 8 + r() * 8, 0, 7);
c.fill();
}
},
function (c, W, H, r) {
c.fillStyle = "#3A2A1E";
c.fillRect(6, 6, W - 12, H - 12);
c.fillStyle = "rgb(" + (170 + r() * 30 | 0) + "," + (130 + r() * 20 | 0) + ",110)";
c.beginPath();
c.ellipse(W / 2, H * 0.4, W * 0.18, H * 0.2, 0, 0, 7);
c.fill();
c.fillStyle = ["#1A1410", "#5A3A1A", "#8A8A8A"][(r() * 3) | 0];
c.beginPath();
c.ellipse(W / 2, H * 0.28, W * 0.2, H * 0.12, 0, Math.PI, 0);
c.fill();
c.fillStyle = "#1A1A2A";
c.fillRect(W * 0.25, H * 0.62, W * 0.5, H * 0.32);
c.fillStyle = "#F0F0F0";
c.fillRect(W * 0.44, H * 0.6, W * 0.12, H * 0.06);
},
function (R, g) {
gmmTable(g, -1.4, -1.5, 1.6, 0.9, 0x5A3A22, {});
gmmTable(g, 1.4, -1.5, 1.6, 0.9, 0x5A3A22, {});
gmmChair(g, -1.4, -0.7, Math.PI, 0x5A3A22);
gmmChair(g, 1.4, -2.3, 0, 0x5A3A22);
for (var p = 0; p < 14; p++)
gmmB(0.21, 0.005, 0.3, null, 0xF4EEDC, -1.9 + (p % 7) * 0.17 + (p > 6 ? 2.6 : 0), 0.83 + (p % 3) * 0.004, -1.7 + (p % 2) * 0.2, g);
gmmCandle(g, -0.8, 0.82, -1.8);
gmmCandle(g, 2.0, 0.82, -1.3);
gmmB(0.1, 0.12, 0.1, null, 0x1A1A2A, -1.0, 0.88, -1.2, g);
gmmShelves(g, -5.6, -1, Math.PI / 2, 6, 3, { seed: 1 });
gmmShelves(g, 5.6, -1, -Math.PI / 2, 6, 3, { seed: 2 });
gmmShelves(g, -3, -4.75, 0, 4, 3, { seed: 3 });
gmmShelves(g, 3, -4.75, 0, 4, 3, { seed: 4 });
R.solid(-5.6, -1, 0.5, 6);
R.solid(5.6, -1, 0.5, 6);
R.solid(0, -4.75, 10, 0.5);
R.solid(0, -1.5, 4.6, 1.2, 1);
gmmStove(g, -4.6, 3.4, Math.PI / 2);
R.solid(-4.6, 3.4, 1.2, 1.6);
gmmRug(g, 0, 1, 4, 3, 0x6A2A2A, 0x8A4A3A);
gmmPicture(g, 0, 2.2, 4.95, Math.PI, 1.2, 0.9, gmmLandscape, 7);
R.person(401, -1.4, -0.4, Math.PI, { sex: "m", look: { top: 0x1A1A2A, bottom: 0x1A1A1A, layer: "longcoat", layerColor: 0x1A1A2A, hair: 0x3A2A1A, hairStyle: "short" }, talk: { name: "Jacob Grimm", persona: GMM_PERSONA_1812 + "You are Jacob Grimm, 27, librarian to King Jérôme, scholar of old German language, law and poetry; serious, precise, tireless, unmarried, devoted to your brother Wilhelm. This Christmas your Kinder- und Hausmärchen comes out: 86 tales, with notes. You collected them from Kassel friends (the Wild and Hassenpflug families, the von Haxthausens) and an old soldier, Krause; soon you will meet Dorothea Viehmann. You care about the tales as the old poetry of the German people. Later in life you will write Grimm's Law and begin the great dictionary. Explain plainly, kindly. Never mention films.", greet: "Ah, a visitor. Forgive the papers. Wilhelm and I are writing down the old tales, before they are forgotten." } });
R.person(402, 1.4, -2.7, 0, { sex: "m", look: { top: 0x2A3A4A, bottom: 0x1A1A1A, layer: "longcoat", layerColor: 0x2A3A4A, hair: 0x5A3A1A, hairStyle: "waves" }, talk: { name: "Wilhelm Grimm", persona: GMM_PERSONA_1812 + "You are Wilhelm Grimm, 26, gentler and often unwell (a weak heart), a lover of the tales themselves. In later editions you will rewrite them to read beautifully aloud for children; in 1825 you will marry Dortchen Wild, who told you many tales, among them Hansel and Gretel and Rumpelstiltskin. Warm, a little dreamy, delighted to talk about any tale. Never mention films.", greet: "Do you know any tales? Everyone knows one. Sit, tell me, and I'll write it down." } });
R.spot(0, -1, 2.2, "The manuscripts on the desks", "read the tales the brothers have collected", function () { gmmTalesCard("brothers"); });
R.spot(-5, -1, 1.8, "The first edition, 1812", "read it: both volumes, in the brothers' own German", function () { gmmBook1812(); setStatus("📕 <b>Kinder- und Hausmärchen, gesammelt durch die Brüder Grimm.</b> Berlin, in der Realschulbuchhandlung, 1812. Two small volumes in the end (1812 and 1815), no pictures, 156 tales and pages of notes. The first tale is The Frog King. It cost one thaler."); }, 0);
var bk = gmmG(5, 0, 1.8, g, -Math.PI / 2);
gmmB(0.7, 1.05, 0.45, "wood", 0x4A2E1A, 0, 0.52, 0, bk);
var bt = gmmB(0.8, 0.05, 0.55, "wood", 0x4A2E1A, 0, 1.08, 0, bk);
bt.rotation.x = 0.3;
gmmB(0.5, 0.06, 0.36, null, 0x6A1A1A, 0, 1.13, 0.02, bk).rotation.x = 0.3;
R.solid(5, 1.8, 0.6, 0.8, 1.2);
R.spot(4.6, 1.8, 1.8, "The Household Tales, all of them", "read the complete book (all 200 tales and the 10 legends)", function () { gmmBook(); });
R.link(4.2, 3.6, "grimmschool", "The stair up to the Schoolroom", "go up");
gmmB(1.2, 0.2, 0.6, "wood", 0x5A3A22, 4.2, 0.1, 3.6, g);
gmmB(1.2, 0.2, 0.6, "wood", 0x5A3A22, 4.2, 0.3, 3.2, g);
},
function (R, g) {
for (var r = 0; r < 3; r++)
for (var c = 0; c < 2; c++) {
gmmTable(g, -2.6 + c * 5.2, -0.6 + r * 1.8, 3.4, 0.6, 0x7A5232, { h: 0.72 });
gmmBench(g, -2.6 + c * 5.2, 0 + r * 1.8, 0, 3.4, 0x6A4A2E);
}
gmmB(4, 1.6, 0.08, null, 0x1A2420, 0, 1.8, -4.9, g);
gmmB(4.2, 0.12, 0.14, "wood", 0x5A3A22, 0, 0.98, -4.85, g);
var bd = wSign(["Kinder- und Hausmärchen", "1812 · 1815 · 1819 · 1837 · 1840 · 1843 · 1850 · 1857"], 3.8, 1.4, "#1A2420", "#E8E8E0");
bd.position.set(0, 1.8, -4.84);
g.add(bd);
var lc = gmmG(3, 0, -3.4, g);
gmmB(0.6, 1.1, 0.4, "wood", 0x5A3A22, 0, 0.55, 0, lc);
var top = gmmB(0.7, 0.05, 0.5, "wood", 0x5A3A22, 0, 1.15, 0, lc);
top.rotation.x = 0.3;
gmmShelves(g, -6.6, 0, Math.PI / 2, 5, 2.6, { seed: 9 });
gmmStove(g, 6, 3.6, -Math.PI / 2, 0x6A4A3A);
gmmPicture(g, -3, 2.0, -4.93, 0, 0.8, 1, gmmPortrait, 11);
gmmPicture(g, 3, 2.0, -4.93, 0, 0.8, 1, gmmPortrait, 12);
R.solid(0, -0.6, 10, 0.6, 0.8);
R.solid(0, 1.2, 10, 0.6, 0.8);
R.solid(0, 3, 10, 0.6, 0.8);
R.person(403, 3, -2.6, 0, { sex: "f", look: { topKind: "dress", top: 0x3A4A6A, hair: 0x6A4A2A, hairStyle: "bun" }, talk: { name: "The schoolmistress", persona: "A schoolmistress teaching about the Brothers Grimm in their own house in Kassel. You know their lives (Hanau, Steinau, Marburg, Kassel, Göttingen, Berlin), the seven editions of the tales (1812 to 1857), Dorothea Viehmann, Grimm's Law, the German Dictionary, the Göttingen Seven, and how the Grimms' tales differ from later films. Patient, clear, encouraging. Never mention films except to say the books came first.", greet: "Welcome to the Schoolroom! Take a lesson at the lectern, and when you've learned them all, try the Collector's examination." } });
R.spot(3, -2.6, 2.2, "The lectern", "take a lesson", function () { gmmLessons(); });
R.spot(0, -4, 2.4, "The slate board", "sit the Collector's examination", function () { gmmExam(); });
},
function (R, g) {
gmmHearth(g, R, 0, -5.6, 0, { pot: 1 });
var ch = gmmChair(g, 1.6, -4, -0.6, 0x5A3A22, 1.2);
gmmB(0.5, 0.05, 0.5, null, 0x7A2A2A, 1.6, 0.58, -4, g);
for (var t = 0; t < 3; t++) {
gmmTable(g, -5, -2 + t * 3, 3.2, 0.9, 0x6A4A2E, {});
gmmBench(g, -5, -2.7 + t * 3, 0, 3.2, 0x5A3A22);
gmmBench(g, -5, -1.3 + t * 3, 0, 3.2, 0x5A3A22);
R.solid(-5, -2 + t * 3, 3.4, 2.2, 0.8);
for (var m = 0; m < 3; m++) {
gmmC(0.06, 0.05, 0.16, null, 0x9A9A8A, -6 + m * 1, 0.9, -2 + t * 3, g, 8);
}
}
var bar = gmmG(5.4, 0, 1, g);
gmmB(0.9, 1.1, 5, "wood", 0x5A3A22, 0, 0.55, 0, bar);
gmmB(1.1, 0.08, 5.2, "wood", 0x4A2E1A, 0, 1.12, 0, bar);
R.solid(5.4, 1, 1.2, 5.2, 1.2);
for (var b = 0; b < 5; b++)
gmmBarrel(g, 7.3, -1 + b * 1, 0.8, (b % 2) * 0.0);
gmmShelves(g, 7.6, 3.5, -Math.PI / 2, 2, 2.2, { books: false, jars: 1 });
for (var h = 0; h < 6; h++) {
var hm = gmmS(0.18, 0x8A3A2A, -6 + h * 2.2, 2.8, -1, g, 8);
hm.scale.y = 1.6;
}
R.person(411, 1.6, -3.6, -0.6 + Math.PI, { sex: "f", look: { topKind: "dress", top: 0x2A2A2A, layer: "apron", layerColor: 0xE8E0D0, hat: "hood", hatColor: 0xF0F0F0, hair: 0x9A9A9A, hairStyle: "bun" }, talk: { name: "Dorothea Viehmann", persona: "Dorothea Viehmann (1755-1815), storyteller, a tailor's widow from Niederzwehren near Kassel, daughter of the landlord of the Knallhütte inn, where as a girl she heard tales from carters and travellers. Of Huguenot French family. You sell vegetables in Kassel market. You told the Brothers Grimm about forty tales, always the same words, slowly so they could write: among them The Clever Peasant Girl, The Devil's Sooty Brother, Faithful John, The Goose Girl, The Twelve Brothers, Doctor Know-All. You speak plainly and warmly, with a firm, sure memory. Offer to tell tales. Never mention films.", greet: "Sit down, child, by the fire. You want a tale? I'll tell it you as I heard it, and I never change a word." } });
R.person(412, 5.4, 3.4, -Math.PI / 2, { sex: "m", title: "bartender", look: { top: 0xE8E0D0, bottom: 0x3A2A1A, layer: "apron", layerColor: 0xD8D0C0, beard: 1 }, talk: { name: "The landlord", persona: "Landlord of the Knallhütte, an inn on the road near Kassel, 1812. Carters, soldiers and travellers stop here; Dorothea Viehmann (whose father kept this inn) tells tales by the fire. Hearty, practical. Never mention films.", greet: "Beer? Bread and sausage? Sit near the fire, Mother Viehmann's about to tell one." } });
for (var c = 0; c < 3; c++)
R.person(413 + c, -6.2 + c * 1.6, -1.3 + (c % 2) * 3, c % 2 ? Math.PI : 0, { sex: c === 1 ? "f" : "m", title: c === 2 ? "soldier" : "villager" });
R.spot(1.6, -3.2, 2.2, "Dorothea Viehmann, by the fire", "ask her for a tale", function () { gmmTalesCard("dorothea"); });
},
function (R, g) {
gmmTable(g, 0, -1.5, 3, 1.2, 0x7A5232, { h: 0.9 });
R.solid(0, -1.5, 3.2, 1.4, 1);
for (var c = 0; c < 6; c++) {
var bolt = gmmC(0.18, 0.18, 1.3, null, [0x8A2A2A, 0x2A4A8A, 0x3A6A3A, 0xC8A030, 0x5A3A6A, 0xE8E0D0][c], -3.6, 0.4 + c * 0.38, -2 + c * 0.1, g, 10);
bolt.rotation.z = Math.PI / 2;
}
gmmB(1.4, 0.9, 0.03, null, 0x6A3A8A, 0.2, 0.92, -1.4, g);
gmmB(0.5, 0.02, 0.04, null, 0xC0C0C8, 0.9, 0.93, -1.2, g);
var dm = gmmG(3, 0, -2.6, g);
gmmC(0.04, 0.04, 1, null, 0x3A3A3A, 0, 0.5, 0, dm, 6);
var tor = gmmC(0.22, 0.26, 0.7, null, 0xD8C8A8, 0, 1.3, 0, dm, 10);
gmmB(0.5, 0.04, 0.3, null, 0xD8A858, -4.2, 1.05, 1, g);
var jam = gmmB(0.36, 0.02, 0.2, null, 0xA8202A, -4.2, 1.08, 1, g);
var belt = gmmB(1.2, 0.08, 0.02, null, 0x5A3A1A, 0, 0.95, -2.05, g);
R.person(421, 0, -0.4, Math.PI, { sex: "m", look: { top: 0xE8E0D0, bottom: 0x4A4A5A, layer: "vest", layerColor: 0x5A3A6A, hair: 0xA87A4A }, talk: { name: "The little tailor", persona: "The brave little tailor of the Grimms' Das tapfere Schneiderlein (1812-1857), small, cheerful, boastful, quick-witted. You swatted seven flies on your jam bread at one blow and sewed SIEBENE AUF EINEN STREICH (seven at one blow) on your belt; everyone thinks you mean seven men. You squeezed water from a stone (it was a cheese) and threw a 'stone' out of sight (it was a bird) to fool a giant, then made two giants fight each other. Brag happily. Tell the tale as the Grimms' book has it, dark parts included, plainly and without dwelling on gore. Never mention films.", greet: "Seven at one blow! Look, I've stitched it on my belt. The whole world shall know!" } });
R.spot(-3.6, 1, 1.8, "The bread and jam on the sill", "swat the flies", function () { gmmTailorSwat(); });
},
function (R, g) {
gmmHearth(g, R, 0, -3, 0, { pot: 1 });
gmmTable(g, -2, 0.5, 1.6, 0.9, 0x7A5232, {});
gmmChair(g, -2, 1.3, Math.PI);
gmmChair(g, -2, -0.3, 0);
R.solid(-2, 0.5, 1.8, 1.1, 0.8);
gmmShelves(g, 3.6, -1, -Math.PI / 2, 2, 1.8, { books: false, jars: 1 });
for (var b = 0; b < 4; b++)
gmmC(0.12, 0.1, 0.07, null, 0xC8B898, -2.5 + b * 0.32, 0.85, 0.5, g, 10);
var por = gmmB(7.6, 0.1, 6.6, null, 0xE8D8A0, 0, 0.02, 0, g);
por.material = gmmShiny(0xE8D49A, 30);
por.userData.keep = 1;
por.visible = false;
R.por = por;
R.person(431, 1.2, -1, 0.4, { sex: "f", child: 1, look: { topKind: "dress", top: 0x8A6A5A, layer: "apron", layerColor: 0xE8E0D0, hair: 0xC88A4A, hairStyle: "braids" }, talk: { name: "The girl", persona: "The poor, good girl of the Grimms' Sweet Porridge (Der süße Brei, 1815-1857). An old woman in the forest gave you a little pot: say 'Cook, little pot, cook' and it cooks good sweet millet porridge; say 'Stop, little pot' and it stops. You and your mother are never hungry now. Once your mother forgot the words while you were out, and the porridge filled the house, the street and the town; you came home and said 'Stop, little pot', and anyone who wanted to come back into town had to eat their way in. A cheerful child. Never mention films.", greet: "Do you want some porridge? I'll tell the pot. Only you must remember the words to make it stop!" } });
R.spot(0, -2.2, 2, "The little pot", "speak to it", function () { gmmPorridge(R); });
},
function (R, g) {
gmmBench(g, 0, -2, 0, 2.4, 0x5A3A22);
gmmTable(g, 0, -2.8, 2.6, 0.8, 0x6A4A2E, { h: 0.7 });
R.solid(0, -2.5, 2.8, 1.6, 0.8);
for (var l = 0; l < 6; l++) {
var ls = gmmS(0.07, 0x8A6A4A, -1 + l * 0.4, 0.78, -2.8, g, 8);
ls.scale.set(1, 0.6, 2);
}
gmmB(0.6, 0.01, 0.4, null, 0x6A3A1A, 0.6, 0.71, -2.7, g);
gmmShelves(g, -4.1, 0, Math.PI / 2, 4, 2.2, { books: false });
for (var s = 0; s < 12; s++) {
var sh = gmmS(0.08, [0x3A2A1A, 0x6A3A1A, 0x8A2A2A][s % 3], -4.0, 0.3 + ((s / 4) | 0) * 0.6, -1.5 + (s % 4) * 0.9, g, 8);
sh.scale.set(1, 0.7, 2.4);
}
R.person(441, 0, -1.6, Math.PI, { sex: "m", look: { top: 0xD8D0C0, bottom: 0x4A3A2A, layer: "apron", layerColor: 0x6A4A2A, hair: 0x8A8A8A, beard: 1 }, talk: { name: "The shoemaker", persona: "The honest poor shoemaker of the Grimms' The Elves and the Shoemaker (Die Wichtelmänner, 1812-1857). You cut out your last leather at night and in the morning found the shoes made, perfectly, every stitch; they sold for more than enough to buy leather for two pairs, and so on. At Christmas you and your wife sat up and saw two little naked men working; your wife sewed them tiny shirts, coats, waistcoats and trousers, and you made tiny shoes. They dressed, sang, danced out of the door and never came back, but you never wanted again. Grateful, gentle. Never mention films.", greet: "Someone makes my shoes in the night! Perfect work. My wife and I mean to sit up and see who." } });
R.spot(3.6, 2, 2, "The curtain in the corner", "hide behind it and watch at midnight", function () { gmmElves(R); });
var cur = gmmB(0.04, 2.4, 2, null, 0x5A3A6A, 3.9, 1.2, 2, g);
},
function (R, g) {
var ov = gmmG(0, 0, -3.3, g);
gmmB(3.4, 2.4, 1.6, "brick", 0x9A4A3A, 0, 1.2, 0, ov);
var mo = gmmAdd(new THREE.CircleGeometry(0.6, 16, 0, Math.PI), gmmGlowM(0xFF8A30), 0, 0.9, 0.81, ov);
gmmB(1.4, 0.1, 0.3, "stone", 0x8A847A, 0, 0.55, 0.9, ov);
R.solid(0, -3.3, 3.6, 1.8, 3);
gmmShelves(g, -4.6, 0, Math.PI / 2, 5, 2.4, { books: false, loaves: 1 });
gmmShelves(g, 4.6, 0, -Math.PI / 2, 5, 2.4, { books: false, loaves: 1 });
gmmB(4, 1, 0.8, "wood", 0x6A4A2E, 0, 0.5, 0.5, g);
R.solid(0, 0.5, 4.2, 1, 1.1);
for (var p = 0; p < 6; p++) {
var pr = gmmAdd(new THREE.TorusGeometry(0.14, 0.04, 6, 12), gmmMat(null, 0x9A5A1E), -1.5 + p * 0.6, 1.1, 0.5, g);
pr.rotation.x = Math.PI / 2;
}
R.person(451, 0, -0.6, Math.PI, { sex: "m", title: "baker", talk: { name: "The baker", persona: "A Kassel baker, 1812. Black bread, white rolls for the gentry, pretzels, cakes for feast days. You've heard the Grimms collect tales; you know the one about the house made of bread and cake and laugh that no house of yours would last a day with children about. Cheerful, floury. Never mention films.", greet: "Fresh from the oven! A pretzel? Mind, it's hot." } });
R.spot(0, 1.3, 2, "The counter", "buy a warm pretzel", function () { setStatus("🥨 The baker hands you a pretzel, hot from the oven, its salt crackling. <i>In the tale of the Golden Goose, the youngest son had only an ash-cake baked in the cinders, and shared it, and it turned into fine sweet cake.</i>"); });
},
function (R, g) {
var pr = gmmG(-2, 0, -3, g);
gmmB(1.2, 0.9, 0.8, "wood", 0x5A3A22, 0, 0.45, 0, pr);
gmmC(0.06, 0.06, 1, null, 0x3A3A3A, 0, 1.3, 0, pr, 8);
gmmB(0.9, 0.1, 0.06, null, 0x3A3A3A, 0, 1.8, 0, pr);
R.solid(-2, -3, 1.4, 1, 1.8);
gmmTable(g, 1.5, -2.8, 3, 1, 0x6A4A2E, {});
R.solid(1.5, -2.8, 3.2, 1.2, 0.9);
for (var b = 0; b < 10; b++)
gmmB(0.17, 0.04, 0.24, null, 0xE8E0C8, 0.6 + (b % 5) * 0.4, 0.84 + ((b / 5) | 0) * 0.05, -2.8, g);
for (var c = 0; c < 4; c++)
gmmB(0.18, 0.03, 0.25, null, [0x6A3A1E, 0x2A3A5A, 0x3A5A2A, 0x6A1A1A][c], 2.3 + c * 0.08, 0.86 + c * 0.03, -2.6, g);
gmmShelves(g, 4.1, 0, -Math.PI / 2, 5, 2.6, { seed: 21 });
gmmShelves(g, -4.1, 0.5, Math.PI / 2, 4, 2.6, { seed: 22 });
R.person(461, 1.5, -1.9, Math.PI, { sex: "m", look: { top: 0xD8D0C0, bottom: 0x3A3A3A, layer: "apron", layerColor: 0x5A4A3A, hat: "cap", hatColor: 0x3A3A3A, hair: 0x9A9A9A }, talk: { name: "The bookbinder", persona: "A Kassel bookbinder, 1812. The Grimms' Kinder- und Hausmärchen is printed in Berlin by Georg Reimer's Realschulbuchhandlung; booksellers send sheets unbound and buyers have them bound to order, in board, calf or vellum. You explain how a book is made: folding, sewing on cords, boards, leather, gold tooling. Proud of your craft. Never mention films.", greet: "The Grimms' new tales! I'm binding twelve sets in green calf for the King's library." } });
R.spot(1.5, -2, 2, "The new book on the bench", "look at the title page", function () { setStatus("📕 <b>Kinder- und Hausmärchen. Gesammelt durch die Brüder Grimm. Berlin, 1812.</b> The dedication is to Bettina von Arnim, for her little son Johannes Freimund. The first tale: <i>In olden times, when wishing still helped...</i> (\"In alten Zeiten, wo das Wünschen noch geholfen hat\")."); });
},
function (R, g) {
gmmShelves(g, -4.1, 0, Math.PI / 2, 7, 2.8, { books: false, jars: 1 });
gmmShelves(g, 4.1, 0, -Math.PI / 2, 7, 2.8, { books: false, jars: 1 });
gmmShelves(g, 0, -4.1, 0, 6, 2.8, { books: false, jars: 1 });
gmmB(4, 1, 0.8, "wood", 0x5A3A22, 0, 0.5, -1, g);
R.solid(0, -1, 4.2, 1, 1.1);
var sc = gmmG(1, 1, -1, g);
gmmC(0.02, 0.02, 0.4, null, 0xC8A040, 0, 0.2, 0, sc, 6);
gmmB(0.4, 0.02, 0.02, null, 0xC8A040, 0, 0.4, 0, sc);
gmmC(0.08, 0.06, 0.02, null, 0xC8A040, -0.2, 0.3, 0, sc, 10);
gmmC(0.08, 0.06, 0.02, null, 0xC8A040, 0.2, 0.3, 0, sc, 10);
var mt = gmmC(0.12, 0.09, 0.14, null, 0xE8E0D0, -1, 1.07, -1, g, 10);
for (var h = 0; h < 10; h++) {
var hb = gmmK(0.12, 0.4, null, [0x5A7A3A, 0x7A8A4A, 0x8A6A8A][h % 3], -3 + h * 0.66, 2.9, 1, g, 6);
hb.rotation.x = Math.PI;
}
R.person(471, 0, -1.8, 0, { sex: "m", look: { top: 0x2A2A2A, bottom: 0x2A2A2A, layer: "longcoat", layerColor: 0x3A3A3A, hair: 0xA8A8A8, hairStyle: "short" }, talk: { name: "The apothecary", persona: "A Kassel apothecary, 1812. You know herbs: rampion (Campanula rapunculus, 'Rapunzel' in German) whose roots and leaves are eaten as salad, the very plant the wife longed for in Rapunzel; lamb's lettuce; hazel; elder (Holunder, sacred to Mother Holle in old belief); the apple and the yew. Learned, precise, a little dry, kind. Never give real medical advice; never any chemistry methods. Never mention films.", greet: "Rampion? Ha, everyone asks since that tale. A good salad leaf, Campanula rapunculus. 'Rapunzel' in German, you see." } });
R.spot(0, -0.2, 2, "The counter", "ask about the plants of the tales", function () { setStatus("🌿 <b>Plants of the tales:</b> <b>rampion</b> (Rapunzel, a bellflower with an edible root); <b>hazel</b> (Aschenputtel's tree, a wishing tree in old belief); <b>elder</b> (Holunder, sacred to Mother Holle); <b>briar rose</b> (the wild dog-rose of the hedge); <b>lime</b> (the Frog King's linden by the well); <b>apple</b> (Snow White's, half red, half white)."); });
},
function (R, g) {
var fo = gmmG(-3, 0, -3.4, g);
gmmB(2.2, 0.9, 1.6, "brick", 0x7A3A2A, 0, 0.45, 0, fo);
var co = gmmB(1.4, 0.1, 1, null, 0, 0, 0.92, 0, fo);
co.material = gmmGlowM(0xFF6A1A);
gmmB(1.8, 2.6, 1.2, "brick", 0x6A3A2A, 0, 2.3, -0.2, fo);
gmmLight(0xFF7A30, 1.4, 10, -3, 1.4, -3.4, g, true);
R.solid(-3, -3.4, 2.4, 1.8, 3);
var an = gmmG(0, 0, -1.5, g);
gmmC(0.25, 0.3, 0.6, "wood", 0x5A3A22, 0, 0.3, 0, an, 10);
gmmB(0.7, 0.25, 0.28, null, 0x2A2A2E, 0, 0.72, 0, an).material = gmmShiny(0x3A3A40, 60);
R.solid(0, -1.5, 0.9, 0.6, 1);
for (var h = 0; h < 8; h++) {
var hs = gmmAdd(new THREE.TorusGeometry(0.1, 0.025, 5, 10, Math.PI * 1.4), gmmShiny(0x4A4A50, 40), 4.9, 1.2 + (h % 4) * 0.35, -2 + ((h / 4) | 0) * 0.5, g);
hs.rotation.y = Math.PI / 2;
}
var bl = gmmG(-4.6, 0, -2, g);
var bb = gmmB(0.8, 0.3, 1.2, null, 0x5A3A22, 0, 1, 0, bl);
bb.rotation.x = 0.2;
R.person(481, 0.8, -1.5, -Math.PI / 2, { sex: "m", title: "blacksmith", talk: { name: "The smith", persona: "A Kassel blacksmith, 1812, strong and slow-spoken. You shoe the King of Westphalia's cavalry horses. You know the tale of Iron Henry, who had three iron bands forged round his heart, and you laugh that you'd never make such a thing. Never any explosive or chemistry methods. Never mention films.", greet: "Mind the sparks. What do you need, a shoe, a hinge, a nail?" } });
R.spot(0, -0.6, 2, "The anvil", "strike while the iron's hot", function () { setStatus("⚒️ Clang! Clang! The smith grins. <i>\"Three iron bands round a heart, like Faithful Henry had? I'd not forge those for any man. A heart should be let to break and mend.\"</i>"); });
},
function (R, g) {
gmmLoom(g, -2.5, -2.4, 0);
gmmLoom(g, 2.5, -2.4, 0);
R.solid(-2.5, -2.4, 1.9, 1.2, 1.8);
R.solid(2.5, -2.4, 1.9, 1.2, 1.8);
gmmWheel(g, -3.2, 1.6, 0.6);
for (var b = 0; b < 4; b++) {
var bk = gmmC(0.3, 0.25, 0.4, "wood", 0xA88A5A, 3.4, 0.2, 0.8 + b * 0.8, g, 10);
gmmS(0.24, [0xE8E0D0, 0x8A6A4A, 0x4A4A4A, 0xC8B898][b], 3.4, 0.45, 0.8 + b * 0.8, g, 8);
}
R.person(491, -2.5, -1.4, Math.PI, { sex: "f", look: { topKind: "dress", top: 0x5A6A8A, layer: "apron", layerColor: 0xE8E0D0, hair: 0x8A5A2A, hairStyle: "bun" }, talk: { name: "The weaver", persona: "A Kassel linen weaver, 1812. Spinning and weaving fill the tales: the miller's daughter spinning straw to gold, Mother Holle's spinning girl, the sleeping princess and her spindle, the Three Spinners. You explain flax to linen: retting, breaking, hackling, spinning, weaving, bleaching. Practical and proud. Never mention films.", greet: "Mind the shuttle! You know, half the old tales are about spinning. Small wonder: we all spun, every evening, and told tales to pass the time." } });
},
function (R, g) {
for (var b = 0; b < 9; b++)
gmmBarrel(g, -4 + (b % 3) * 1, -3 + ((b / 3) | 0) * 0.9, 0.9);
R.solid(-3, -2, 3, 3, 1);
for (var s = 0; s < 14; s++) {
var st = gmmB(0.1, 1, 0.03, "wood", 0x8A6A48, 2 + (s % 7) * 0.14, 0.5, -3.4 + ((s / 7) | 0) * 0.3, g);
st.rotation.z = 0.1;
}
var hr = gmmG(1, 0, 0, g, 0.5);
gmmB(1.6, 0.12, 0.3, "wood", 0x6A4A2E, 0, 0.6, 0, hr);
gmmB(0.08, 0.6, 0.08, "wood", 0x6A4A2E, -0.6, 0.3, 0, hr);
gmmB(0.08, 0.6, 0.08, "wood", 0x6A4A2E, 0.6, 0.3, 0, hr);
for (var h = 0; h < 5; h++) {
var hp = gmmAdd(new THREE.TorusGeometry(0.4, 0.02, 4, 20), gmmShiny(0x5A5A5A, 30), 4.5, 1.4, -2 + h * 0.6, g);
hp.rotation.y = Math.PI / 2;
}
R.person(501, 1, 0.8, Math.PI, { sex: "m", title: "laborer", talk: { name: "The cooper", persona: "A Kassel cooper, 1812: barrels for beer, wine, herring, flour. You mention the Wolf and the Seven Kids' washtub, and the barrel the robbers kept their wine in. Gruff, funny. Tell it as the Grimms' book has it, dark parts included, without dwelling on gore. Never mention films.", greet: "A barrel's a clever thing: staves, hoops and nothing else, and it holds water." } });
},
function (R, g) {
gmmStove(g, -4.6, -3.2, Math.PI / 2, 0xE8E0D0);
R.solid(-4.6, -3.2, 1.2, 1.6);
var sofa = gmmG(0, 0, -3.8, g);
gmmB(2.6, 0.45, 0.8, null, 0x6A2A3A, 0, 0.3, 0, sofa);
gmmB(2.6, 0.7, 0.2, null, 0x6A2A3A, 0, 0.7, -0.35, sofa);
R.solid(0, -3.8, 2.8, 1, 0.8);
var pn = gmmG(4, 0, -2, g, -Math.PI / 2);
gmmB(1.6, 0.85, 0.6, "wood", 0x3A1A0C, 0, 0.75, 0, pn);
gmmB(1.4, 0.05, 0.15, null, 0xF0F0E8, 0, 0.82, 0.28, pn);
[-0.7, 0.7].forEach(function (o) { gmmB(0.08, 0.4, 0.08, "wood", 0x3A1A0C, o, 0.2, 0.2, pn); });
R.solid(4, -2, 0.8, 1.8, 1);
gmmTable(g, 0, -1, 1.2, 1.2, 0x5A3A22, { cloth: 0xF0E8D8 });
for (var c = 0; c < 4; c++)
gmmChair(g, Math.cos(c * 1.57) * 1, -1 + Math.sin(c * 1.57) * 1, -c * 1.57 - Math.PI / 2, 0x5A3A22);
R.solid(0, -1, 1.4, 1.4, 0.8);
gmmPicture(g, -2, 2, -4.42, 0, 0.7, 0.9, gmmPortrait, 31);
gmmPicture(g, 2, 2, -4.42, 0, 0.7, 0.9, gmmPortrait, 32);
gmmRug(g, 0, -1, 4, 3, 0x2A4A6A, 0x3A5A7A);
R.person(511, 0.9, -1.6, -2.2, { sex: "f", look: { topKind: "dress", top: 0x6A8AB0, hair: 0x5A3A1A, hairStyle: "bun" }, talk: { name: "Dortchen Wild", persona: "Dortchen (Henriette Dorothea) Wild, 19, daughter of a Kassel apothecary, 1812. You and your sisters told the Grimms many tales (Hansel and Gretel, Mother Holle, Rumpelstiltskin, The Elves among them, from your old nurse 'Old Marie' and your own family). Quietly fond of Wilhelm; you will marry him in 1825. Bright, warm, modest. Never mention films.", greet: "Wilhelm writes down every tale I tell him. Hansel and Gretel, Mother Holle... I had them from our old nurse." } });
},
function (R, g) {
gmmTable(g, 0, -2, 8, 1.6, 0x4A2E1A, { cloth: 0x2A4A2A });
R.solid(0, -2, 8.2, 1.8, 0.8);
for (var c = 0; c < 8; c++) {
gmmChair(g, -3.5 + c, -1, Math.PI, 0x4A2E1A, 1.1);
gmmChair(g, -3.5 + c, -3, 0, 0x4A2E1A, 1.1);
}
[-6, -2, 2, 6].forEach(function (x, i) { gmmB(1.2, 2.6, 0.04, null, [0xC83A3A, 0xF0F0F0, 0x2A4A8A, 0xE8C030][i], x, 3.2, -5.95, g); });
gmmPicture(g, 0, 3, -5.95, 0, 1.6, 2, gmmPortrait, 41);
gmmStove(g, 8, -4, -Math.PI / 2, 0x2A4A6A);
R.solid(8, -4, 1.2, 1.6);
R.person(521, -7.6, 3, Math.PI / 2, { sex: "f", look: { topKind: "dress", top: 0xE8C8D8, hat: "tiara", hatColor: 0xF0D040, hair: 0x8A5A2A, hairStyle: "long" }, talk: { name: "The princess who never laughs", persona: "The king's daughter in the Grimms' The Golden Goose (1812-1857), so serious that nobody can make her laugh; the king has promised her to whoever can. You are polite but solemn and sigh a lot; jokes don't work. (Only the sight of a young man with a golden goose and seven people stuck to it in a row, running behind him, will make you laugh out loud.) Never mention films.", greet: "Good day. No, I do not laugh. Nobody has ever made me laugh. Many have tried." } });
R.spot(-7, 3, 2.4, "The princess at the window", "try to make her laugh", function () { gmmGooseFinish(); });
},
function (R, g) {
for (var r = 0; r < 9; r++) {
gmmBench(g, -3, -8 + r * 2.2, 0, 4, 0x5A3A22);
gmmBench(g, 3, -8 + r * 2.2, 0, 4, 0x5A3A22);
gmmB(4, 0.8, 0.06, "wood", 0x5A3A22, -3, 0.7, -8.3 + r * 2.2, g);
gmmB(4, 0.8, 0.06, "wood", 0x5A3A22, 3, 0.7, -8.3 + r * 2.2, g);
R.solid(-3, -8.15 + r * 2.2, 4.2, 0.8, 1);
R.solid(3, -8.15 + r * 2.2, 4.2, 0.8, 1);
}
var al = gmmG(0, 0, -13, g);
gmmB(3, 1, 1.2, "marble", 0xE8E0D0, 0, 0.5, 0, al);
gmmB(3.2, 0.1, 1.3, null, 0xF0E8D8, 0, 1.02, 0, al);
gmmB(0.1, 1, 0.1, null, 0xD8B040, 0, 1.6, 0, al);
gmmB(0.5, 0.1, 0.1, null, 0xD8B040, 0, 1.8, 0, al);
gmmCandle(al, -1, 1.04, 0);
gmmCandle(al, 1, 1.04, 0);
R.solid(0, -13, 3.4, 1.6, 1.2);
var or = gmmG(0, 6, 14, g);
gmmB(10, 0.3, 2, "wood", 0x4A2E1A, 0, 0, 0, or);
for (var p = 0; p < 16; p++)
gmmC(0.08, 0.08, 1.4 + Math.abs(p - 7.5) * 0.12, null, 0xC8B080, -3.75 + p * 0.5, 0.9 + Math.abs(p - 7.5) * 0.06, -0.5, or, 8);
var pl = gmmG(5.6, 0, -6, g);
gmmC(0.5, 0.4, 1, "wood", 0x5A3A22, 0, 2.2, 0, pl, 8);
gmmC(0.08, 0.08, 1.7, "wood", 0x5A3A22, 0, 0.85, 0, pl, 6);
[-11, -3.5, 1.5, 6.5, 11].forEach(function (pz) { [-5.75, 5.75].forEach(function (px) { gmmC(0.45, 0.5, 10.6, "stone", 0xB89A84, px, 5.3, pz, g, 12); gmmC(0.7, 0.7, 0.5, "stone", 0x9A7866, px, 0.25, pz, g, 8); gmmC(0.65, 0.45, 0.6, "stone", 0x9A7866, px, 10.4, pz, g, 8); R.solid(px, pz, 1.1, 1.1, 11); }); });
var rt = gmmG(0, 0, -14.6, g);
gmmB(4.6, 4.2, 0.3, "wood", 0x5A2E14, 0, 3.1, 0, rt);
gmmB(1.6, 2.6, 0.1, null, 0xD8B040, 0, 3.2, 0.18, rt).material = gmmShiny(0xD8B040, 80);
[-1.5, 1.5].forEach(function (o2) { gmmB(1.1, 2.2, 0.08, null, o2 < 0 ? 0x2A4A8A : 0x8A2A2A, o2, 3.1, 0.18, rt); });
gmmPrism(4.8, 1.6, 0.3, "wood", 0x5A2E14, 0, 5.2, 0, rt);
gmmB(0.12, 1, 0.06, null, 0xD8B040, 0, 6.4, 0.1, rt);
var fn = gmmG(-3.5, 0, 11.5, g);
gmmC(0.55, 0.35, 0.9, "stone", 0xB8A890, 0, 0.45, 0, fn, 8);
gmmC(0.65, 0.6, 0.25, "stone", 0xB8A890, 0, 1, 0, fn, 8);
gmmC(0.5, 0.5, 0.03, null, 0, 0, 1.12, 0, fn, 16).material = gmmShiny(0x3A5A6A, 90);
R.solid(-3.5, 11.5, 1.4, 1.4, 1.2);
[-6, 2].forEach(function (cz) {
var ring = gmmAdd(new THREE.TorusGeometry(1, 0.05, 6, 24), gmmMat(null, 0x1A1A1A), 0, 6.5, cz, g);
ring.rotation.x = Math.PI / 2;
gmmC(0.02, 0.02, 4.4, null, 0x1A1A1A, 0, 8.8, cz, g, 4);
for (var cn = 0; cn < 8; cn++)
gmmCandle(g, Math.cos(cn * 0.785), 6.5, cz + Math.sin(cn * 0.785));
});
R.person(1031, 1.6, -12.2, 0, { sex: "m", look: { top: 0x1A1A1A, bottom: 0x1A1A1A, layer: "longcoat", layerColor: 0x101010, hair: 0xB8B8B0, hairStyle: "short" }, talk: { name: "The pastor of St Martin's", persona: "The Lutheran pastor of St Martin's church in Kassel in 1812. The church is old Gothic sandstone, its tower unfinished for centuries; the landgraves of Hesse lie buried in the choir. You preach every Sunday, christen the town's babies at the font and bury its dead in the churchyard. You know the Grimm brothers by sight (Wilhelm is the gentler, Jacob the more serious) and think their old wives' tales harmless enough. Speak gently and a little formally, of 1812. Never mention films.", greet: "Peace be with you. Come in out of the street; the church is open to all." } });
},
function (R, g) {
gmmStove(g, -4, -3, Math.PI / 2, 0x3A6A4A);
R.solid(-4, -3, 1.2, 1.6);
gmmHearth(g, R, 3, -3.6, 0, { pot: 1 });
gmmTable(g, 0, -0.6, 2, 1, 0x6A4A2E, { cloth: 0xE8E0D0 });
gmmBench(g, 0, 0.2, 0, 2, 0x5A3A22);
gmmBench(g, 0, -1.4, 0, 2, 0x5A3A22);
R.solid(0, -0.6, 2.2, 2.2, 0.8);
for (var b = 0; b < 4; b++)
gmmC(0.12, 0.1, 0.07, null, 0xC8B898, -0.75 + b * 0.5, 0.85, -0.6, g, 10);
gmmBed(g, -4, 1.8, Math.PI / 2, { L: 1.9, W: 1.3, quilt: 0x8A3A3A });
gmmB(0.04, 2.3, 2, null, 0x6A5A8A, -2.9, 1.15, 1.8, g);
gmmCradle(g, -2.2, 3, 0);
gmmWheel(g, 3.8, 1.4, -0.8);
gmmShelves(g, 4.7, -0.6, -Math.PI / 2, 2, 2, { books: false, jars: 1 });
gmmClock(g, 1.8, -3.8, 0);
gmmPicture(g, -1, 1.9, -3.95, 0, 0.8, 0.6, gmmLandscape, 51);
R.person(1011, -0.6, -1.6, 0.3, { sex: "f", look: { topKind: "dress", top: 0x6A5A7A, layer: "apron", layerColor: 0xE8E0D0, hair: 0x6A4A2A, hairStyle: "bun" }, talk: { name: "The mother of the house", persona: "A craftsman's wife in Kassel in 1812, at home with her children. Bread is dear since the war; Napoleon's brother Jérôme is King of Westphalia. You tell the old tales to your children at bedtime, the same ones the Grimm brothers are writing down: the Frog King, the Seven Little Goats, Mother Holle. Warm, busy, practical. Never mention films.", greet: "Come in, come in, mind the cradle. Will you have a bit of bread? There's soup on the fire." } });
R.person(1012, 0.6, 0.6, Math.PI, { sex: "m", child: 1, look: { top: 0x8A6A4A, bottom: 0x3A3A2A, hair: 0xC8A060 } });
R.person(1013, -0.4, 0.6, Math.PI, { sex: "f", child: 1, look: { topKind: "dress", top: 0xC86A5A, hair: 0xE8C870, hairStyle: "braids" } });
R.spot(-2.2, 2.4, 1.6, "The cradle", "rock it and sing", function () { setStatus("🎶 <i>Schlaf, Kindlein, schlaf, der Vater hüt' die Schaf...</i> (Sleep, baby, sleep: your father tends the sheep.) The baby sighs and sleeps."); });
},
function (R, g) {
gmmStove(g, -4.6, -3.2, Math.PI / 2, 0xE8E8E0);
R.solid(-4.6, -3.2, 1.2, 1.6);
gmmRug(g, 0, -0.5, 5, 4, 0x6A2A2A, 0x8A3A3A);
gmmTable(g, 0, -0.6, 1.8, 1.1, 0x4A2E1A, { cloth: 0xF4EEE0 });
for (var c = 0; c < 4; c++)
gmmChair(g, -0.6 + (c % 2) * 1.2, -0.6 + (c < 2 ? -0.9 : 0.9), c < 2 ? 0 : Math.PI, 0x4A2E1A);
R.solid(0, -0.6, 2, 1.3, 0.8);
var cab = gmmG(4.9, 0, -1, g, -Math.PI / 2);
gmmB(1.6, 2.2, 0.5, "wood", 0x4A2E1A, 0, 1.1, 0, cab);
gmmAdd(new THREE.BoxGeometry(1.4, 1.2, 0.02), gmmSee(0xE8F0F8, 0.35), 0, 1.5, 0.26, cab);
for (var p = 0; p < 6; p++)
gmmC(0.14, 0.12, 0.03, null, 0xF4F4F0, -0.5 + (p % 3) * 0.5, 1.2 + ((p / 3) | 0) * 0.5, 0.1, cab, 12);
R.solid(4.9, -1, 0.6, 1.7, 2.2);
var dk = gmmG(-3.6, 0, 2.6, g, Math.PI / 2);
gmmB(1.4, 0.8, 0.7, "wood", 0x5A3A22, 0, 0.4, 0, dk);
gmmB(0.5, 0.04, 0.36, null, 0x6A2A1A, 0, 0.82, 0, dk);
gmmCandle(dk, 0.45, 0.8, 0);
R.solid(-3.6, 2.6, 0.8, 1.5, 0.9);
gmmClock(g, 2, -4.2, 0, 0x3A1A0C);
gmmPicture(g, -1.6, 2, -4.42, 0, 0.7, 0.9, gmmPortrait, 61);
gmmPicture(g, 0.6, 2, -4.42, 0, 1.1, 0.8, gmmLandscape, 62);
R.person(1021, -3, 2.6, -Math.PI / 2, { sex: "m", look: { top: 0x2A2A3A, bottom: 0x2A2A2A, layer: "longcoat", layerColor: 0x3A2A1A, hair: 0xB8B8B8, hairStyle: "short" }, talk: { name: "The master of the house", persona: "A Kassel merchant in 1812, careful with money and proud of his good china and his clock. You grumble about French taxes under King Jérôme, and admit you were raised on the same old tales the Grimm brothers are collecting, though you think them a bit low for printing. Dry, a little pompous, kind underneath. Never mention films.", greet: "Good day. You've come about the tales, I suppose? Everyone in Kassel seems to know one." } });
R.person(1022, 1, -1.6, 0.2, { sex: "f", look: { topKind: "dress", top: 0x3A5A7A, hair: 0x8A6A3A, hairStyle: "bun" } });
R.spot(2, -3.6, 1.6, "The clock", "listen to it chime", function () { setStatus("🕰️ It whirrs and chimes the quarter. <i>(In the Seven Little Goats, the youngest kid hid in a clock case just like this one.)</i>"); });
},
function (R, g) {
gmmB(4, 0.9, 1, "wood", 0x8A6A48, 0, 0.45, -1.2, g);
gmmB(4.1, 0.08, 1.1, "marble", 0xE8E4DC, 0, 0.94, -1.2, g);
R.solid(0, -1.2, 4.2, 1.2, 1);
var bl = gmmC(0.5, 0.55, 0.85, "wood", 0x9A7A5A, 3, 0.43, -2.6, g, 12);
R.solid(3, -2.6, 1.1, 1.1, 1);
gmmHangers(g, -2, -3.2, 6, 0x8A3A2A, 0.18);
gmmHangers(g, 1.5, -3.2, 5, 0xA85A3A, 0.12);
gmmHangers(g, -3, 1.5, 4, 0x9A4A2A, 0.22);
for (var k = 0; k < 6; k++) {
var s = gmmC(0.06, 0.06, 0.5, null, 0xA85A4A, -1.2 + k * 0.4, 1.02, -1.1, g, 6);
s.rotation.z = Math.PI / 2;
}
var sc = gmmG(1.4, 0.98, -1.3, g);
gmmC(0.02, 0.02, 0.6, null, 0xC8A040, 0, 0.3, 0, sc, 4);
gmmB(0.6, 0.02, 0.02, null, 0xC8A040, 0, 0.6, 0, sc);
[-0.3, 0.3].forEach(function (o) { gmmC(0.14, 0.1, 0.03, null, 0xC8A040, o, 0.3, 0, sc, 10); });
R.person(1101, 0, -2.2, 0, { sex: "m", title: "butcher", look: { top: 0xE8E8E8, bottom: 0x3A3A3A, layer: "apron", layerColor: 0xE8E0E0, hair: 0x6A4A2A, beard: 1 }, talk: { name: "Meister Hofmann, the butcher", persona: "The butcher of Kassel's Altstadt in 1812, big, red-faced and good-humoured. You make the town's best Ahle Wurscht (the hard Hessian sausage, aged in the chimney). Meat is dear because the French army buys up the cattle. You know the tale of the wolf and the seven little goats and laugh at it. Speak plainly, of 1812. Never mention films.", greet: "Ahle Wurscht! Hung in the chimney six weeks. Taste. Go on." } });
R.spot(-1, -1.2, 1.6, "The counter", "buy a sausage", function () { setStatus("🌭 A hard, smoky Ahle Wurscht, wrapped in paper. It will keep for weeks, the butcher says, if you can keep your hands off it."); });
},
function (R, g) {
gmmHearth(g, R, -3.4, -3.4, 0, { pot: 1 });
var vt = gmmC(0.6, 0.55, 0.8, null, 0x3A3A3A, -3.4, 1.1, -2.8, g, 14);
gmmC(0.55, 0.55, 0.03, null, 0xE8E0C0, -3.4, 1.5, -2.8, g, 14);
for (var r = 0; r < 3; r++) {
gmmB(3, 0.05, 0.05, "wood", 0x5A3A22, 1, 2.4, -3 + r * 1.2, g);
for (var c = 0; c < 10; c++)
gmmC(0.025, 0.03, 0.5, null, 0xF0E8D0, -0.4 + c * 0.3, 2.05, -3 + r * 1.2, g, 6);
}
gmmTable(g, 1, 0.8, 2.4, 1, 0x6A4A2E);
R.solid(1, 0.8, 2.6, 1.2, 0.8);
for (var k = 0; k < 14; k++)
gmmCandle(g, 0.1 + (k % 7) * 0.3, 0.82, 0.6 + ((k / 7) | 0) * 0.4, k % 5 === 0);
gmmShelves(g, 4.2, -1, -Math.PI / 2, 2, 2, { books: false, jars: 1 });
R.person(1111, 0.5, -0.4, 0, { sex: "m", look: { top: 0x6A5A4A, bottom: 0x3A3A2A, layer: "apron", layerColor: 0x8A7A6A, hair: 0x8A8A80 }, talk: { name: "The chandler", persona: "A tallow chandler of Kassel in 1812. You dip candles from mutton fat, sell the dear beeswax ones to the church and the palace, and make soft soap. Business is good in winter. You know the tale of the Golden Goose. Quiet, smells of tallow, dry humour. Never mention films.", greet: "Tallow for the kitchen, wax for the church, and soap for those that want it, which isn't many." } });
R.spot(1, 1.4, 1.6, "The candles", "buy a candle", function () { setStatus("🕯️ A good tallow candle, two Kreuzer. It will burn the evening through."); });
},
function (R, g) {
var wh = gmmG(-2, 0, -1, g);
gmmB(1, 0.6, 1, "wood", 0x6A4A2E, 0, 0.3, 0, wh);
var tp = gmmC(0.4, 0.4, 0.06, null, 0x7A6A5A, 0, 0.7, 0, wh, 16);
gmmC(0.18, 0.22, 0.3, null, 0xA86A4A, 0, 0.88, 0, wh, 14);
R.solid(-2, -1, 1.2, 1.2, 0.9);
gmmShelves(g, 2.5, -3.6, 0, 3, 2.2, { books: false, jars: 1 });
gmmShelves(g, 4.6, 0, -Math.PI / 2, 3, 2.2, { books: false, jars: 1 });
var kl = gmmG(-4, 0, -3, g);
gmmB(1.8, 2, 1.6, "brick", 0x8A4A3A, 0, 1, 0, kl);
gmmB(0.8, 0.8, 0.05, null, 0x1A0A06, 0, 0.7, 0.82, kl);
R.solid(-4, -3, 2, 1.8, 2);
for (var t = 0; t < 6; t++)
gmmB(0.3, 0.3, 0.05, null, 0x3A6A4A, 1 + t * 0.32, 0.2 + (t % 2) * 0.3, 2.6, g);
for (var j = 0; j < 8; j++) {
var jg = gmmC(0.16, 0.12, 0.4, null, [0x8A5A3A, 0x6A4A2A, 0xA87A4A][j % 3], -0.5 + (j % 4) * 0.45, 0.2, 2 + ((j / 4) | 0) * 0.5, g, 12);
}
R.person(1121, -1.4, -0.6, -0.6, { sex: "m", look: { top: 0x8A7A6A, bottom: 0x4A3A2A, layer: "apron", layerColor: 0xA89A88, hair: 0x5A4A3A }, talk: { name: "The potter", persona: "A potter of Kassel in 1812, hands grey with clay. You make the brown glazed jugs and bowls every kitchen uses, and green tiles for the big tiled stoves of the burghers' houses. You think the tale of the Fisherman and his Wife is about your own wife. Cheerful, teasing. Never mention films.", greet: "Mind the wet ones! Everything on that shelf is still drying." } });
R.spot(-2, -0.2, 1.6, "The wheel", "try the wheel", function () { setStatus("🏺 The clay rises under your hands, wobbles, rises again, and slumps. The potter laughs: \"Twenty years, it took me.\""); });
},
function (R, g) {
var cp = gmmG(-3.5, 0, -2.6, g);
gmmB(2.4, 0.8, 2.4, "brick", 0x8A4A3A, 0, 0.4, 0, cp);
var ket = gmmC(1.1, 0.9, 1.4, null, 0xB86A3A, 0, 1.5, 0, cp, 18);
ket.material = gmmShiny(0xB86A3A, 70);
gmmB(0.5, 0.4, 0.05, null, 0xFF7A20, 0, 0.45, 1.23, cp).material = gmmGlowM(0xFF8A30);
R.solid(-3.5, -2.6, 2.6, 2.6, 2.4);
[[0.5, -2.8], [2.8, -2.8]].forEach(function (t) { gmmC(1, 1, 1.2, "wood", 0x6A4A2E, t[0], 0.6, t[1], g, 16); R.solid(t[0], t[1], 2.1, 2.1, 1.3); });
for (var b = 0; b < 10; b++) {
var bx = 5 - (b % 2) * 0.8, bz = -3.4 + ((b / 2) | 0) * 1.1, by = (b % 2) * 0.0;
var br = gmmC(0.38, 0.38, 0.9, "wood", 0x6A4A2E, bx, 0.38 + (b % 3 === 2 ? 0.76 : 0), bz, g, 12);
br.rotation.z = Math.PI / 2;
}
R.solid(4.6, -1.2, 1.8, 5, 1.6);
gmmTable(g, -1, 2, 2.2, 1, 0x5A3A22);
gmmBench(g, -1, 2.8, 0, 2.2, 0x5A3A22);
R.solid(-1, 2, 2.4, 1.2, 0.8);
for (var m = 0; m < 3; m++)
gmmC(0.07, 0.06, 0.2, null, 0x8A6A4A, -1.6 + m * 0.6, 0.88, 2, g, 10);
R.person(1131, -2, -0.8, 0.6, { sex: "m", look: { top: 0xE8E0D0, bottom: 0x4A3A2A, layer: "apron", layerColor: 0x6A5A4A, hat: "cap", hatColor: 0xE8E0D0 }, talk: { name: "The brewer", persona: "A brewer of Kassel in 1812, broad and slow-spoken. You brew the brown beer the town drinks, and a stronger one for Easter. The Knallhütte inn takes your barrels. You know the tale of the Brave Little Tailor and think beer would have helped him. Never mention films.", greet: "Taste that. Malt, hops, Fulda water and patience. That's all beer is." } });
R.spot(-1, 1.4, 1.6, "The tasting table", "taste the beer", function () { setStatus("🍺 Brown, sweetish, a little smoky. The brewer watches your face and nods. (Grown-ups only; children get the small beer, which is barely beer at all.)"); });
},
function (R, g) {
for (var c = 0; c < 7; c++) {
var cg = gmmG(-3 + c, 2 + ((c % 2) * 0.6), -3.92, g);
gmmB(0.5, 0.6, 0.2, "wood", [0x5A2E14, 0x7A4A24, 0x3A1A0C][c % 3], 0, 0, 0, cg);
gmmPrism(0.6, 0.3, 0.24, "wood", 0x5A2E14, 0, 0.3, 0, cg, 0);
var fc = gmmAdd(new THREE.CircleGeometry(0.17, 16), gmmMat(null, 0xF0E8D0), 0, 0, 0.11, cg);
gmmC(0.01, 0.01, 0.6, null, 0xC8A040, 0, -0.6, 0.05, cg, 4);
gmmS(0.06, 0xC8A040, 0, -0.9, 0.06, cg, 8);
}
gmmClock(g, 3.8, -3.6, 0, 0x3A1A0C);
gmmClock(g, -3.8, -3.6, 0, 0x5A2E14);
gmmTable(g, 0, 0.4, 2.6, 0.9, 0x6A4A2E);
R.solid(0, 0.4, 2.8, 1.1, 0.8);
for (var k = 0; k < 12; k++)
gmmC(0.04, 0.04, 0.01, null, 0xC8A040, -1 + k * 0.18, 0.8, 0.3 + (k % 3) * 0.1, g, 10);
gmmCandle(g, 1.1, 0.8, 0.6);
gmmChair(g, 0, -0.4, 0, 0x4A2E1A);
R.person(1141, 0, -0.6, Math.PI, { sex: "m", look: { top: 0x3A3A4A, bottom: 0x2A2A2A, layer: "apron", layerColor: 0x5A4A3A, hair: 0xC8C8C0, hairStyle: "short" }, talk: { name: "The clockmaker", persona: "An old clockmaker of Kassel in 1812, with spectacles on his nose. You learned your trade in the Black Forest, at Furtwangen, where farmers carve clocks in winter, and you sell their cuckoo clocks. You love the deep dark Black Forest and its tales. Precise, gentle, slow. Never mention films.", greet: "Listen. Forty clocks, and every one of them right. Well. Nearly every one." } });
R.spot(0, 1.2, 1.6, "The wall of clocks", "wait for the hour", function () { setStatus("🕰️ The hour comes: forty clocks strike together, and three cuckoos pop out a moment late. The old man sighs: \"The cuckoos never agree.\""); });
},
function (R, g) {
gmmBed(g, -3.6, -2.4, 0, { L: 1.9, W: 0.9, quilt: 0x5A6A8A });
gmmBed(g, 3.6, -2.4, 0, { L: 1.9, W: 0.9, quilt: 0x8A6A4A });
gmmTable(g, 0, -0.8, 1.6, 0.9, 0x6A4A2E);
gmmChair(g, 0, 0, Math.PI, 0x5A3A22);
R.solid(0, -0.8, 1.8, 1.1, 0.8);
gmmCandle(g, 0.5, 0.82, -0.8, true);
for (var b = 0; b < 5; b++)
gmmB(0.22, 0.05, 0.3, null, [0x6A2A1A, 0x2A3A5A, 0x3A5A2A][b % 3], -0.5 + b * 0.24, 0.84 + (b % 2) * 0.05, -0.9, g);
gmmChest(g, -3.6, 0.4, 0, 0x5A3A1E);
gmmChest(g, 3.6, 0.4, 0, 0x6A4A2A);
gmmShelves(g, 0, -3.7, 0, 2, 1.6, { books: true });
R.person(1151, -2.4, 1, 0.6, { sex: "m", look: { top: 0x1A1A1A, bottom: 0x1A1A1A, hat: "brimmed", hatColor: 0x1A1A1A }, talk: { name: "The journeyman", persona: "A journeyman carpenter of 1812 lodging in Kassel during your wander years (three years and a day on the road, as the guild demands). You come from Swabia, beyond the Black Forest. You share the room with a student who snores. Friendly, homesick. Never mention films.", greet: "Excuse the boots. The student's, not mine. Mine are cleaner." } });
R.spot(0, -0.2, 1.6, "The student's books", "look at the books", function () { setStatus("📚 Law books, mostly unread, a volume of Schiller much read, and a notebook of folk songs copied out in a careful hand."); });
},
function (R, g) {
gmmStove(g, -3.4, -3, Math.PI / 2, 0x6A3A2A);
R.solid(-3.4, -3, 1.2, 1.6);
gmmBench(g, -3.4, -1.6, Math.PI / 2, 1.4, 0x5A3A22);
var cat = gmmS(0.18, 0x3A3A3A, -3.4, 0.55, -1.6, g, 8);
cat.scale.set(1.5, 0.8, 1);
gmmS(0.1, 0x3A3A3A, -3.2, 0.65, -1.6, g, 8);
gmmBed(g, 3.2, -2.4, 0, { L: 1.9, W: 1.2, quilt: 0xE8E0F0 });
gmmB(1.2, 0.4, 1.6, null, 0xF0F0F8, 3.2, 0.85, -2.4, g);
gmmWheel(g, 0.6, -0.6, 0.3);
gmmChair(g, 0.6, 0.2, Math.PI, 0x5A3A22);
gmmTable(g, -1, 1.6, 1.2, 0.8, 0x6A4A2E, { cloth: 0xF0E8E0 });
R.solid(-1, 1.6, 1.4, 1, 0.8);
gmmClock(g, 1.8, -3.6, 0, 0x5A2E14);
gmmPicture(g, -0.6, 1.7, -3.95, 0, 0.6, 0.8, gmmPortrait, 71);
R.person(1161, 0.4, 0.4, Math.PI + 0.4, { sex: "f", look: { topKind: "dress", top: 0x2A2A2A, layer: "apron", layerColor: 0xE8E0D0, hat: "hood", hatColor: 0xF0F0F0, hair: 0xD8D8D0 }, talk: { name: "The widow Kraus", persona: "An old widow of Kassel in 1812, who spins for a living and has outlived her husband and two sons. You know dozens of the old tales, word for word, as your grandmother told them, and you think Frau Viehmann at the inn gets some of them wrong. Sharp, kind, very proud of your clean floor. Never mention films.", greet: "Shoes off the clean boards, if you please. Then sit, and I'll tell you how the tale of Mother Holle really goes." } });
R.spot(0.6, -0.6, 1.6, "The spinning wheel", "spin a little", function () { setStatus("🧶 The wheel hums, the thread runs thin and thick and thin. \"Lazy fingers,\" says the widow, not unkindly. (In Mother Holle, the good girl spun till her fingers bled.)"); });
},
function (R, g) {
gmmHearth(g, R, -2.5, -3, 0, { pot: 1 });
gmmTable(g, 1, -1, 1.6, 0.8, 0x6A4A2E, {});
gmmBench(g, 1, -0.3, 0, 1.6, 0x5A3A22);
R.solid(1, -1, 1.8, 1, 0.8);
var str = gmmB(1.8, 0.25, 1.4, null, 0xC8B060, 2.8, 0.12, 2, g);
gmmB(1.6, 0.05, 0.9, null, 0x8A6A4A, 2.8, 0.27, 2.1, g);
gmmChest(g, -3.2, 1.5, Math.PI / 2, 0x5A3A1E);
var ax = gmmB(0.08, 0.8, 0.08, "wood", 0x6A4A2E, -3.6, 0.6, -0.5, g);
ax.rotation.z = 0.2;
R.person(531, 2.6, 1.6, Math.PI, { sex: "m", child: 1, look: { layer: "vest", layerColor: 0x6A3A1A, top: 0xF2EEE2, bottom: 0x3A5A2A, hat: "cap", hatColor: 0x3A5A2A, hair: 0xE8C870, hairStyle: "short" }, talk: { name: "Hansel", persona: "Hansel of the Grimms' Hansel and Gretel (1812-1857), a clever, brave boy. Lying awake hungry you heard your parents plan to leave you in the forest; you crept out by moonlight and filled your pockets with white pebbles that shone like silver coins. Comfort your sister. Never mention films.", greet: "Don't cry, Gretel. I've got a plan. The moon's out, and the pebbles shine..." } });
R.person(532, 3.2, 2.2, Math.PI, { sex: "f", child: 1, look: { topKind: "dress", top: 0xC83A3A, layer: "apron", layerColor: 0xF2EEE2, hair: 0xE8C870, hairStyle: "braids" }, talk: { name: "Gretel", persona: "Gretel of the Grimms' Hansel and Gretel (1812-1857), Hansel's little sister: frightened at first, but at the witch's house it is you who are clever and brave, and save Hansel. Never mention films.", greet: "I heard them talking. They're going to leave us in the forest tomorrow. What will we do?" } });
R.spot(2.8, 1.4, 1.8, "The children's straw bed", "listen in the night", function () { setStatus("🌙 Through the wall, the parents whisper. <b>\"Early tomorrow we'll take the children into the thickest part of the forest, light a fire, give them each a piece of bread, and go to our work and leave them.\"</b> The father: \"No, wife, I won't do it.\" ...But in the end he gives in. <i>Hansel creeps out under the moon and fills his pockets with white pebbles.</i>"); });
},
function (R, g) {
var ov = gmmG(0, 0, -4.3, g);
gmmB(3.2, 2.6, 1.4, "brick", 0x9A4A3A, 0, 1.3, 0, ov);
gmmAdd(new THREE.CircleGeometry(0.65, 16, 0, Math.PI), gmmGlowM(0xFF7A20), 0, 0.8, 0.71, ov);
var od = gmmB(1.3, 0.9, 0.08, null, 0x2A2A2A, 0, 1.1, 0.76, ov);
od.userData.keep = 1;
R.ovenDoor = od;
od.visible = false;
gmmLight(0xFF8A30, 1.2, 8, 0, 1, -3.4, g, true);
R.solid(0, -4.3, 3.4, 1.6, 3);
gmmTable(g, -2.5, 0, 2, 1, 0xF0C8A0, { cloth: 0xFFE8F0 });
R.solid(-2.5, 0, 2.2, 1.2, 0.8);
for (var p = 0; p < 5; p++) {
var pk = gmmC(0.16, 0.16, 0.04 + p * 0.02, null, 0xE8B060, -3 + p * 0.12, 0.84 + p * 0.02, 0, g, 12);
}
gmmC(0.08, 0.07, 0.2, null, 0xF8F8F8, -2, 0.9, 0.2, g, 8);
for (var a = 0; a < 6; a++)
gmmS(0.06, a % 2 ? 0xD82A2A : 0x8A5A2A, -1.9 + a * 0.12, 0.86, -0.3, g, 8);
gmmBed(g, -4.6, 3, Math.PI / 2, { L: 1.6, W: 0.8, quilt: 0xFFFFFF });
gmmBed(g, -4.6, 1.6, Math.PI / 2, { L: 1.6, W: 0.8, quilt: 0xFFFFFF });
var cg = gmmG(4, 0, 2, g);
gmmB(2.4, 0.1, 2.4, null, 0x8A6A4A, 0, 0.05, 0, cg);
for (var b = 0; b < 10; b++) {
gmmC(0.04, 0.04, 2.4, null, 0x2A2A2A, -1.2 + b * 0.27, 1.2, 1.2, cg, 5);
gmmC(0.04, 0.04, 2.4, null, 0x2A2A2A, -1.2, 1.2, 1.2 - b * 0.27, cg, 5);
}
gmmB(2.5, 0.1, 2.5, null, 0x2A2A2A, 0, 2.4, 0, cg);
R.solid(4, 2, 2.6, 2.6, 3);
var hz = R.person(541, 4, 2, -Math.PI / 2, { sex: "m", child: 1, look: { layer: "vest", layerColor: 0x6A3A1A, top: 0xF2EEE2, bottom: 0x3A5A2A, hair: 0xE8C870, hairStyle: "short" }, talk: { name: "Hansel, in the cage", persona: "Hansel of the Grimms' tale (1812-1857), shut by the witch in a little stable behind a barred door to be fattened up. Every morning she tells you to stick out your finger to feel if you're fat yet; she has red eyes and can't see far, so you hold out a little bone instead. Whisper to the visitor: Gretel must be clever. Tell the tale as the Grimms' book has it, dark parts included, plainly and without dwelling on gore. Never mention films.", greet: "Psst! She can't see well, her eyes are red. I hold out a little bone instead of my finger. Help Gretel!" } });
R.hansel = hz;
var wt = R.person(542, 1.5, -2.6, Math.PI * 1.1, { sex: "f", look: { topKind: "robe", top: 0x3A2A3A, bottom: 0x2A1A2A, hat: "hood", hatColor: 0x2A1A2A, hair: 0xC8C8C8, hairStyle: "long" }, talk: { name: "The old woman", persona: "The wicked witch of the Grimms' Hansel and Gretel (1812-1857), who seems kind at first and built her house of bread to lure children. Old, leaning on a crutch, with red eyes that cannot see far, but a keen nose like the beasts. Speak with false sweetness, then with impatience about the oven being hot. Tell it as the Grimms' book does, dark parts and all, plainly and without dwelling on gore. Never mention films.", greet: "Oh, you dear children, who has brought you here? Do come in and stay with me. No harm shall come to you." } });
R.witch = wt;
var Gt = R.person(543, -1, -2, 0.3, { sex: "f", child: 1, look: { topKind: "dress", top: 0xC83A3A, layer: "apron", layerColor: 0xF2EEE2, hair: 0xE8C870, hairStyle: "braids" } });
R.spot(0, -3.1, 2.2, "The great oven", "be clever, as Gretel was", function () { gmmWitch(R); });
for (var c = 0; c < 3; c++)
gmmChest(g, 4.8, -1.6 - c * 0.9, -Math.PI / 2, 0x6A3A1E);
R.spot(4.4, -2.5, 1.8, "The witch's chests", "look inside", function () { setStatus(R.won ? "💎 Chests of pearls and precious stones! <b>Hansel fills his pockets; Gretel fills her apron.</b> \"Now we must go, to get out of the witch's forest.\"" : "🔒 The chests are locked, and the old woman is watching you."); });
},
function (R, g) {
gmmStove(g, -3.2, -2.8, Math.PI / 2, 0x5A7A9A);
R.solid(-3.2, -2.8, 1.2, 1.6);
gmmTable(g, 1, -1, 1.6, 1, 0x7A5232, { cloth: 0xE8E0F0 });
R.solid(1, -1, 1.8, 1.2, 0.8);
var bs = gmmG(1, 0.82, -1, g);
gmmC(0.3, 0.24, 0.22, "wood", 0xB8905A, 0, 0.11, 0, bs, 12);
gmmB(0.24, 0.06, 0.16, null, 0xC8904A, -0.06, 0.24, 0, bs);
gmmC(0.04, 0.05, 0.24, null, 0x3A1A2A, 0.1, 0.32, 0, bs, 8);
gmmBed(g, 3, 2, Math.PI, { L: 1.8, W: 0.9, quilt: 0xD83A3A });
gmmWheel(g, -2.8, 1.6, 0.5);
R.person(551, 0, -2.2, 0.2, { sex: "f", look: { topKind: "dress", top: 0x6A7A9A, layer: "apron", layerColor: 0xF0F0E8, hair: 0x8A5A2A, hairStyle: "bun" }, talk: { name: "Red Cap's mother", persona: "Little Red Cap's mother in the Grimms' tale (1812-1857). You are sending her with cake and a bottle of wine to her sick grandmother half an hour away in the wood. You tell her: set out before it gets hot, walk nicely and quietly and don't run off the path, or you'll fall and break the bottle; and when you get there say good morning and don't peep into every corner. Loving and a little anxious. Never mention films.", greet: "Mind you keep to the path! And say good morning to Grandmother, don't go peeping into every corner first." } });
},
function (R, g) {
gmmBed(g, 2.6, -2, -Math.PI / 2, { L: 2, W: 1.2, quilt: 0xE8E8F0, post: 1, canopy: 0x7A3A5A });
var cu = gmmB(0.04, 2, 2, null, 0x9A4A6A, 1.9, 1.1, -2, g);
R.solid(2.6, -2, 2.2, 1.4, 2);
gmmStove(g, -3, -2.6, Math.PI / 2, 0x6A8A5A);
R.solid(-3, -2.6, 1.2, 1.6);
gmmTable(g, -1, 0.6, 1.2, 0.8, 0x7A5232, { cloth: 0xF0E8D8 });
gmmChair(g, -1, 1.3, Math.PI);
R.solid(-1, 0.6, 1.4, 1, 0.8);
var ck = gmmG(-3.9, 2, -0.5, g, Math.PI / 2);
gmmB(0.4, 0.5, 0.15, "wood", 0x5A3A22, 0, 0, 0, ck);
gmmPrism(0.5, 0.25, 0.18, "wood", 0x5A3A22, 0, 0.25, 0, ck, 0);
R.person(561, 2.4, -2, -Math.PI / 2, { sex: "f", look: { topKind: "dress", top: 0xE8E0F0, hat: "hood", hatColor: 0xF0F0F0, hair: 0xE8E8E8, hairStyle: "bun" }, talk: { name: "Grandmother", persona: "Little Red Cap's grandmother in the Grimms' tale (1812-1857), who lives in the wood half an hour from the village, under the three big oak trees, with the nut hedges below. You gave Red Cap her red velvet cap. You are ill and weak today. You also remember the other time, when another wolf came and you and Red Cap kept the door shut and filled the stone trough with sausage-water so the wolf, sniffing from the roof, slipped and fell in. Loving, frail, sharp. Tell the tale as the Grimms' book has it, dark parts included, plainly and without dwelling on gore. Never mention films.", greet: "Is that you, my little Red Cap? Lift the latch, dear, I'm too weak to get up." } });
R.spot(1.6, -1.2, 1.6, "Grandmother's bed curtains", "draw them back", function () { setStatus("👵 You draw the curtain. <b>\"Oh, Grandmother, what big ears you have!\"</b> \"All the better to hear you with.\" <b>\"What big eyes you have!\"</b> \"All the better to see you with.\" ...But today it's really Grandmother, cap pulled down over her face, smiling. <i>In the Grimms' second ending, Red Cap and Grandmother outwit another wolf together.</i>"); });
},
function (R, g) {
gmmBed(g, -2.8, -2.2, 0, { L: 2, W: 1.3, quilt: 0x8A6A9A });
gmmTable(g, 1, 0, 1.4, 0.9, 0x6A4A2E, {});
R.solid(1, 0, 1.6, 1.1, 0.8);
gmmStove(g, -3.6, 2.4, Math.PI / 2);
R.solid(-3.6, 2.4, 1.2, 1.6);
R.person(571, -2.8, -2.2, 0, { sex: "f", look: { topKind: "dress", top: 0xE8E0D0, hair: 0x6A4A2A, hairStyle: "long" }, talk: { name: "The wife", persona: "The wife in the Grimms' Rapunzel (1812-1857). Expecting a child, you saw the fine rampion in the enchantress's garden from the back window and longed for it so badly you grew pale and thin and said you would die without it. Your husband climbed the wall at dusk to fetch some. Wistful, dreamy. Never mention films.", greet: "Look at the rampion, there, beyond the wall. If I don't have some, I think I shall die..." } });
R.person(572, 2, 1, Math.PI, { sex: "m", title: "villager", talk: { name: "The husband", persona: "The husband in the Grimms' Rapunzel (1812-1857). You climbed into the enchantress's garden twice to steal rampion for your wife; the second time the enchantress caught you, and you had to promise her your child. Your daughter, Rapunzel, was taken away the day she was born. Full of regret. Never mention films.", greet: "I climbed the wall for her. Twice. The second time... she was waiting for me." } });
},
function (R, g) {
gmmBed(g, -2.2, -2, 0, { L: 1.8, W: 1, quilt: 0xE8C8F0 });
gmmWheel(g, 2, -2, -0.6);
gmmChest(g, 2.4, 1.6, -Math.PI / 2, 0x8A5A3A);
var wn = gmmG(0, 1.9, -3.45, g);
gmmB(1.2, 1.6, 0.05, null, 0, 0, 0, 0, wn).material = gmmGlowM(0xCCE4F4);
gmmB(1.4, 0.1, 0.4, "stone", 0xA8A090, 0, -0.85, 0.2, wn);
for (var c = 0; c < 5; c++) {
var ring = gmmAdd(new THREE.TorusGeometry(0.4 + c * 0.22, 0.08, 6, 24), gmmShiny(0xF0C850, 40), 0.6, 0.08 + c * 0.02, 0.6, g);
ring.rotation.x = Math.PI / 2;
}
var sk = gmmB(0.5, 0.12, 0.3, null, 0xE8E0F0, 2.4, 0.75, 1.6, g);
R.person(581, 0, -0.6, 0, { sex: "f", look: { topKind: "dress", top: 0x7A5AA8, hair: 0xF0C850, hairStyle: "long" }, talk: { name: "Rapunzel", persona: "Rapunzel of the Grimms' tale (1812-1857), the most beautiful child under the sun, shut by the enchantress at twelve in a tower in the forest with no door and no stair, only a little window at the top. Your hair is long and fine as spun gold, twenty ells long; when the enchantress calls 'Rapunzel, Rapunzel, let down your hair', you wind your braids round a window hook and let them fall. You sing to pass the lonely time. A king's son has been climbing up; you have asked him to bring a skein of silk each time so you can weave a ladder. Gentle, longing for the world. Never mention films.", greet: "Oh! Who are you? Nobody comes up here but the old enchantress... and sometimes, at dusk, a king's son." } });
R.spot(0, -2.6, 1.8, "The window, with its hook", "climb back down the braid", function () { gmmTowerDown(); });
},
function (R, g) {
gmmStove(g, -3.6, -2.4, Math.PI / 2, 0x8A5A9A);
R.solid(-3.6, -2.4, 1.2, 1.6);
gmmBed(g, 3, -2, Math.PI, { L: 2, W: 1.2, quilt: 0xE86AA8, post: 1, canopy: 0xE8A0C8 });
R.solid(3, -2, 1.4, 2.2, 1.6);
gmmBench(g, -2.5, 2, 0, 1.6, 0x5A3A22);
gmmWheel(g, -1.4, 2.4, 0.3);
gmmTable(g, 0.6, -0.4, 1.4, 0.9, 0x7A5232, { cloth: 0xF0D8E8 });
R.solid(0.6, -0.4, 1.6, 1.1, 0.8);
R.person(591, -3, -1.2, 0.8, { sex: "f", look: { topKind: "dress", top: 0xE85AA8, hair: 0x2A1A1A, hairStyle: "long" }, talk: { name: "The lazy daughter", persona: "The widow's own daughter in the Grimms' Mother Holle (1812-1857): ugly-hearted and lazy, her mother's favourite, never lifts a finger. When your stepsister comes home covered in gold, you jump down the well to get the same, but you won't take the bread out, won't shake the tree, and won't shake Mother Holle's bed, and come home covered in pitch that never comes off. Sulky, greedy, funny. Never mention films.", greet: "Spin? Me? That's what she's for. ...Where did she get all that gold, anyway?" } });
R.person(592, 2, 1.6, Math.PI, { sex: "f", look: { topKind: "dress", top: 0x3A3A3A, hat: "hood", hatColor: 0x2A2A2A, hair: 0x8A8A8A, hairStyle: "bun" }, talk: { name: "The widow", persona: "The widow and stepmother in the Grimms' Mother Holle (1812-1857), who loves her own lazy daughter and makes her stepdaughter do all the work, spinning by the well till her fingers bleed. When the girl drops the shuttle down the well you tell her to go and fetch it. Hard, sharp, unfair. Never mention films.", greet: "Have you finished spinning? Then fetch the water. And don't dawdle." } });
},
function (R, g) {
var fl = new THREE.Group();
g.add(fl);
for (var i = 0; i < (GMM.lite ? 140 : 420); i++) {
var Rr = wRand(2000 + i), x = (Rr() - 0.5) * 200, z = (Rr() - 0.5) * 160;
var st = gmmC(0.025, 0.025, 0.4, null, 0x3A8A2A, x, 0.2, z, fl, 4);
gmmS(0.12, [0xFF3A3A, 0xFFE020, 0xFFFFFF, 0xFF7AD8, 0x8A5AFF, 0xFF8A1A][i % 6], x, 0.44, z, fl, 6);
}
for (var t = 0; t < 16; t++) {
var a = t / 16 * Math.PI * 2, x2 = Math.cos(a) * 95, z2 = Math.sin(a) * 78, tg = gmmG(x2, 0, z2, g);
if (typeof ctuTree === "function")
ctuTree(tg, { h: 14, crown: 0x5AA83A, limbs: 5, roots: 4, seed: 80 + t });
}
var ov = gmmG(-30, 0, -10, g, 0.5);
gmmB(4, 2.4, 3, "brick", 0xB85A3A, 0, 1.2, 0, ov);
var mo = gmmAdd(new THREE.CircleGeometry(0.8, 16, 0, Math.PI), gmmGlowM(0xFF9A40), 0, 0.9, 1.51, ov);
gmmC(0.4, 0.4, 1.4, "brick", 0xA84A3A, 1.2, 3, 0, ov, 10);
R.ovenG = ov;
for (var b = 0; b < 6; b++) {
var lv = gmmS(0.25, 0xB87A2A, -1 + b * 0.4, 0.25, 2.4, ov, 10);
lv.scale.set(1.4, 0.7, 1);
lv.visible = false;
lv.userData.keep = 1;
(R.loaves = R.loaves || []).push(lv);
}
R.solid(-30, -10, 4.6, 4, 3);
R.spot(-30 + Math.sin(0.5) * 2.6, -10 + Math.cos(0.5) * 2.6, 2.6, "The oven, full of bread", "listen", function () { gmmHolleBread(R); });
var ap = gmmG(10, 0, -30, g);
if (typeof ctuTree === "function")
ctuTree(ap, { h: 12, crown: 0x4A8A2E, fruit: 0xD82A1A, limbs: 6, roots: 5, seed: 24 });
R.solid(10, -30, 1.2, 1.2, 12);
R.apples = [];
for (var p = 0; p < 14; p++) {
var am = gmmS(0.16, 0xD82A1A, 10 + Math.cos(p) * 2.6, 0.16, -30 + Math.sin(p * 1.7) * 2.6, g, 8);
am.visible = false;
am.userData.keep = 1;
R.apples.push(am);
}
R.spot(10, -27, 3, "The apple tree, heavy with apples", "listen", function () { gmmHolleApples(R); });
var hh = gmmCottage(g, 40, -60, 0, { walls: "plaster", col: 0xFFF4E0, roofKind: "tile", roof: 0xE85A3A, w: 10, d: 8, shutters: 0x3A8AE8, flowers: 1 });
hh.door = { x: R.x + 40, z: -60 + 5.5 };
R.spot(40, -60 + 5.5, 2.4, "Mother Holle's house", "go in", function () { gmmEnterRoom("hollehouse", null); });
GMM_ROOMS.hollehouse.back = "meadow";
GMM_ROOMS.hollehouse.backAt = { x: 40, z: -60 + 5.5 };
var gt = gmmG(0, 0, -80, g);
gmmB(1.2, 7, 1.2, "stone", 0xE8E0D0, -4, 3.5, 0, gt);
gmmB(1.2, 7, 1.2, "stone", 0xE8E0D0, 4, 3.5, 0, gt);
var ar = gmmAdd(new THREE.TorusGeometry(4, 0.6, 8, 20, Math.PI), gmmShiny(0xF0C830, 100), 0, 7, 0, gt);
R.spot(0, -78, 3.5, "The great gate", "walk through it, home", function () { gmmHolleGate(R); });
R.spot(0, 70, 4, "Where you woke", "climb back up to the well (without finishing)", function () { gmmOutside(R.door); });
R.gold = wPoints(GMM.lite ? 200 : 600, function (i) { var r = wRand(3100 + i); return [(r() - 0.5) * 7, r() * 7, -80 + (r() - 0.5) * 2]; }, 0xFFD040, 0.18, true);
R.gold.visible = false;
g.add(R.gold);
for (var e = 0; e < 4; e++)
gmmSolid(R.x + [0, 0, -108, 108][e], [-88, 88, 0, 0][e], [220, 220, 4, 4][e], [4, 4, 180, 180][e], -5, 40);
},
function (R, g) {
gmmBed(g, -2.6, -2.2, 0, { L: 2.2, W: 1.6, quilt: 0xFFFFFF, post: 1, canopy: 0x8AC8F8 });
var fb = gmmB(1.6, 0.5, 1.4, null, 0xFFFFFF, -2.6, 0.95, -1.8, g);
fb.scale.set(1, 1, 1);
R.solid(-2.6, -2.2, 1.8, 2.4, 1.6);
gmmStove(g, 3.6, -2.6, -Math.PI / 2, 0x3A8AC8);
R.solid(3.6, -2.6, 1.2, 1.6);
gmmTable(g, 1.2, 0.6, 1.4, 1, 0xC8A070, { cloth: 0xE8F4FF });
R.solid(1.2, 0.6, 1.6, 1.2, 0.8);
var win = gmmG(-2.6, 1.8, -3.95, g);
gmmB(1.6, 1.4, 0.05, null, 0, 0, 0, 0, win).material = gmmGlowM(0xE8F4FF);
R.person(601, 0, -1.4, 0.2, { sex: "f", look: { topKind: "dress", top: 0x3A6AB8, layer: "apron", layerColor: 0xFFFFFF, hat: "hood", hatColor: 0xFFFFFF, hair: 0xF0F0F0, hairStyle: "bun" }, talk: { name: "Mother Holle", persona: "Mother Holle (Frau Holle) of the Grimms' tale (1812-1857): an old woman with great big teeth, at first frightening, but kind. Whoever serves you well and shakes your featherbed so the feathers fly makes it snow in the world. The good girl works for you; you lead her to a great gate and gold showers down on her; the lazy girl gets pitch. In old Hessian belief Holle is the lady of snow and spinning, at the bottom of wells and ponds. Warm, rewarding diligence. Never mention films.", greet: "Don't be afraid, my child. Stay with me. If you do the work of the house well, you shall be the better for it. Mind you shake my bed well!" } });
R.spot(-2.6, -0.6, 2.2, "Mother Holle's featherbed", "shake it out of the window", function () { gmmHolleBed(R); });
},
function (R, g) {
var th = gmmG(0, 0, -6.6, g);
gmmB(4, 0.6, 2.4, "stone", 0x4A4A50, 0, 0.3, 0, th);
gmmB(1.6, 3.2, 0.4, null, 0x1A1A22, 0, 2.2, -0.6, th).material = gmmShiny(0x1A1A22, 80);
gmmB(1.4, 0.5, 1, null, 0x3A1A3A, 0, 1.1, 0, th);
R.solid(0, -6.6, 4.2, 2.6, 3.5);
gmmTable(g, 0, 0, 8, 1.6, 0x2A1A12, { cloth: 0x3A1A3A });
R.solid(0, 0, 8.2, 1.8, 0.8);
for (var c = 0; c < 6; c++) {
gmmChair(g, -3 + c * 1.2, 1.1, Math.PI, 0x2A1A12, 1.15);
gmmChair(g, -3 + c * 1.2, -1.1, 0, 0x2A1A12, 1.15);
}
[-7, -3, 3, 7].forEach(function (x) { gmmB(1.4, 4, 0.04, null, 0x1A1A2A, x, 4, -7.9, g); });
for (var l = 0; l < 4; l++) {
var ch = gmmG(-6 + l * 4, 6, 0, g);
gmmAdd(new THREE.TorusGeometry(0.7, 0.04, 4, 16), gmmShiny(0x2A2A2A, 30), 0, 0, 0, ch).rotation.x = Math.PI / 2;
for (var k = 0; k < 6; k++)
gmmCandle(ch, Math.cos(k) * 0.7, 0, Math.sin(k) * 0.7);
}
R.link(8.6, -6.6, "mirror", "The stair to the Queen's chamber", "go up");
R.person(611, -6, 4, 0.8, { sex: "m", title: "guard" });
},
function (R, g) {
var mf = gmmG(0, 1.9, -4.4, g);
gmmB(1.8, 2.6, 0.12, null, 0x8A6A2A, 0, 0, 0, mf).material = gmmShiny(0xC8A040, 100);
var gl = gmmB(1.5, 2.3, 0.05, null, 0, 0, 0, 0.06, mf);
gl.material = gmmShiny(0xB8C8D8, 160);
gl.userData.keep = 1;
R.glass = gl;
var t = gmmTable(g, 3, -2.4, 1.4, 0.8, 0x2A1A2A, { cloth: 0x1A0A1A });
R.solid(3, -2.4, 1.6, 1, 0.8);
var ap = gmmS(0.1, 0xF0F0E0, 3.2, 0.9, -2.4, g, 12);
var ap2 = gmmAdd(new THREE.SphereGeometry(0.101, 12, 8, 0, Math.PI), gmmShiny(0xC81A1A, 60), 3.2, 0.9, -2.4, g);
var cb = gmmB(0.2, 0.02, 0.06, null, 0x2A2A2A, 2.6, 0.83, -2.3, g);
var lc = gmmB(0.3, 0.01, 0.03, null, 0xC83A8A, 2.8, 0.83, -2.6, g);
gmmBed(g, -3, -2.4, 0, { L: 2.1, W: 1.5, quilt: 0x2A0A2A, post: 1, canopy: 0x1A0A1A });
R.solid(-3, -2.4, 1.7, 2.3, 2);
R.person(621, 0.8, -2.6, Math.PI * 0.95, { sex: "f", look: { topKind: "robe", top: 0x2A0A3A, bottom: 0x2A0A3A, back: "cape", backColor: 0x1A0A2A, hat: "crown", hatColor: 0xC8A040, hair: 0x1A1A1A, hairStyle: "long" }, talk: { name: "The Queen", persona: "The wicked Queen of the Grimms' Snow White (Sneewittchen; in the 1812 first edition she is Snow White's own mother, later her stepmother). Beautiful, proud, unable to bear that anyone is more beautiful. You ask your mirror 'Spieglein, Spieglein an der Wand, wer ist die Schönste im ganzen Land?' and its answer turns you yellow and green with envy. You disguise yourself three times: a pedlar with laces, a comb, a poisoned apple. Cold and grand; tell it as the book has it, dark parts included, without dwelling on gore. Never mention films.", greet: "You have come to look at my mirror? Few are so bold. Ask it, then. It never lies." } });
R.spot(0, -3.4, 2.2, "The mirror on the wall", "ask it", function () { gmmMirrorAsk(R); });
},
function (R, g) {
gmmTable(g, 0, -0.8, 4.2, 1, 0xA87A4A, { h: 0.55, cloth: 0xFFFFFF });
R.solid(0, -0.8, 4.4, 1.2, 0.6);
R.plates = [];
for (var i = 0; i < 7; i++) {
var px = -1.8 + i * 0.6;
gmmC(0.13, 0.12, 0.02, null, 0xF0F0F0, px, 0.6, -0.5, g, 14);
gmmC(0.04, 0.035, 0.08, null, 0xC8A040, px + 0.18, 0.64, -0.5, g, 8);
gmmB(0.02, 0.005, 0.14, null, 0xC0C0C8, px - 0.17, 0.58, -0.5, g);
gmmChair(g, px, 0, Math.PI, [0xC83A2A, 0x2A6AC8, 0x3A8A3A, 0xD8A020, 0x8A3AA8, 0x2A8A8A, 0xA85A2A][i], 0.62);
(function (i, px) { R.spot(px, -0.1, 0.55, "Little plate " + (i + 1), "take a bite, and a sip from the cup", function () { gmmDwarfTable(R, "plate", i); }); })(i, px);
}
R.beds = [];
for (var b = 0; b < 7; b++) {
var bx = -4.2 + b * 1.4;
gmmBed(g, bx, -3.1, 0, { L: 1.25 + (b === 6 ? 0.25 : 0), W: 0.62, quilt: [0xC83A2A, 0x2A6AC8, 0x3A8A3A, 0xD8A020, 0x8A3AA8, 0x2A8A8A, 0xA85A2A][b], wood: 0x8A5A30 });
(function (b, bx) { R.spot(bx, -2.2, 0.6, "Little bed " + (b + 1), "try it", function () { gmmDwarfTable(R, "bed", b); }); })(b, bx);
}
R.solid(0, -3.1, 10, 1.4, 0.8);
gmmHearth(g, R, 4.4, 1.6, -Math.PI / 2, { pot: 1 });
for (var c = 0; c < 7; c++) {
var cp = gmmS(0.12, [0xC83A2A, 0x2A6AC8, 0x3A8A3A, 0xD8A020, 0x8A3AA8, 0x2A8A8A, 0xA85A2A][c], -4.6, 1.6 + c * 0.18, 2.5, g, 8);
cp.scale.y = 0.6;
}
for (var p = 0; p < 7; p++) {
var pk = gmmB(0.06, 1.1, 0.06, "wood", 0x6A4A2E, -4.7, 0.55, 0.5 + p * 0.3, g);
pk.rotation.z = 0.1;
}
},
function (R, g) {
for (var t = 0; t < 8; t++) {
var z = -18 + t * 5;
gmmB(0.3, 3.4, 0.3, "wood", 0x5A4028, -3.6, 1.7, z, g);
gmmB(0.3, 3.4, 0.3, "wood", 0x5A4028, 3.6, 1.7, z, g);
gmmB(7.6, 0.3, 0.4, "wood", 0x5A4028, 0, 3.4, z, g);
gmmLantern(g, 3.3, 2.6, z + 0.3, true);
}
gmmB(0.1, 0.06, 38, null, 0x5A5A5A, -0.6, 0.03, 0, g);
gmmB(0.1, 0.06, 38, null, 0x5A5A5A, 0.6, 0.03, 0, g);
for (var v = 0; v < 26; v++) {
var Rr = wRand(5000 + v), side = v % 2 ? 1 : -1;
var gm = gmmAdd(new THREE.IcosahedronGeometry(0.12 + Rr() * 0.1, 0), gmmShiny([0xF0C830, 0xC8D8F0, 0xD83A5A, 0x3AC86A][v % 4], 120), side * 3.9, 0.6 + Rr() * 2.4, -19 + Rr() * 38, g);
}
gmmLight(0xFFC070, 0.8, 14, 0, 2.4, -10, g, true);
var cart = gmmG(0, 0, -6, g);
gmmB(1.2, 0.7, 1.6, "wood", 0x6A4A2E, 0, 0.6, 0, cart);
for (var k = 0; k < 6; k++)
gmmS(0.18, k % 2 ? 0xD8B040 : 0xA8A8B8, -0.3 + (k % 3) * 0.3, 1.0, -0.4 + ((k / 3) | 0) * 0.6, cart, 6);
R.solid(0, -6, 1.4, 1.8, 1.2);
R.person(631, -1.6, -14, 0.4, { sex: "m", s: 0.58, look: { top: 0x8A3AA8, bottom: 0x4A3A2A, hat: "hood", hatColor: 0x8A3AA8, beard: 1, hair: 0xE8E8E0 }, talk: { name: "A dwarf, digging", persona: "One of the seven unnamed dwarfs of the Grimms' Snow White (1812-1857), digging for ore and gold in the mountains. Never give the dwarfs names. You talk about ore, the mountain, and Snow White who keeps house for you (you warned her never to let anyone in). Gruff and kind. Never mention films.", greet: "Mind your head! There's copper here, and silver, and a little gold if you know how to look." } });
R.spot(-3.4, -14, 1.8, "A glittering vein in the rock", "chip out a piece", function () { setStatus("⛏️ You tap at the rock and a little piece of ore comes away, glittering. The dwarf nods. <i>\"In the evening we come home from the mountain, and light our seven little candles.\"</i>"); });
},
function (R, g) {
gmmHearth(g, R, 0, -4.2, 0, {});
for (var t = 0; t < 2; t++) {
gmmTable(g, -3 + t * 6, 0, 2.4, 1, 0x6A4A2E, {});
gmmBench(g, -3 + t * 6, 0.8, 0, 2.4, 0x5A3A22);
gmmBench(g, -3 + t * 6, -0.8, 0, 2.4, 0x5A3A22);
R.solid(-3 + t * 6, 0, 2.6, 2.2, 0.8);
}
for (var b = 0; b < 3; b++)
gmmBarrel(g, 5.4, -3 + b * 1, 0.9);
for (var s = 0; s < 3; s++)
R.person(641 + s, -3 + s * 1.4, 2.6, Math.PI, { sex: "f", look: { topKind: "dress", top: [0xC83A6A, 0x3A8AC8, 0xE8A030][s], layer: "apron", layerColor: 0xF0F0E8, hair: [0x8A4A2A, 0xE8C870, 0x2A1A12][s], hairStyle: ["braids", "bun", "long"][s] }, talk: { name: ["The eldest daughter", "The middle daughter", "The youngest daughter"][s], persona: "One of the innkeeper's three daughters in the Grimms' The Golden Goose (1812-1857). Seeing the goose with golden feathers you each want one feather; the first touches its wing and sticks fast, the second touches her sister and sticks, and so does the third; you have to run along behind the young man all next day wherever he goes. Giggly, curious, a bit greedy. Never mention films.", greet: ["Oh, what a goose! Just one golden feather, he'll never miss it...", "My sister's stuck to it! Let me pull her off... oh!", "Don't touch them! ...oh, bother."][s] } });
},
function (R, g) {
var th = gmmG(0, 0, -6.8, g);
gmmB(6, 0.6, 2.4, "stone", 0x9A8A7A, 0, 0.3, 0, th);
[-1.1, 1.1].forEach(function (x) { gmmB(1.2, 2.6, 0.3, null, 0x8A2A3A, x, 1.9, -0.6, th); gmmB(1.2, 0.5, 1, null, 0x8A2A3A, x, 0.85, 0, th); });
R.solid(0, -6.8, 6.2, 2.6, 3);
R.sleepers = [];
var who = [[-1.1, -6.6, 0, "m", 0x8A2A3A, "crown"], [1.1, -6.6, 0, "f", 0x6A2A6A, "tiara"], [-6, -2, 1, "m", 0x3A5A8A, null], [-6, 0, 1, "f", 0x8A6A3A, null], [6, -2, -1, "m", 0x5A3A2A, null], [6, 0.5, -1, "f", 0x3A6A4A, null], [-3, 3, 0.5, "m", 0x6A6A6A, "helmet"]];
who.forEach(function (w, i) { var P = R.person(651 + i, w[0], w[1], w[2], { sex: w[3], look: { top: w[4], topKind: w[3] === "f" ? "dress" : undefined, hat: w[5] || undefined, hatColor: 0xD8B040 } }); P.g.rotation.z = 0.0; P.g.position.y = w[5] === "crown" || w[5] === "tiara" ? 0.55 : 0; var hd = P.g; hd.rotation.x = 0.35; R.sleepers.push(P); });
for (var b = 0; b < 2; b++) {
gmmBench(g, -6.6, -1 + b * 2.6, Math.PI / 2, 2.6, 0x5A3A22);
gmmBench(g, 6.6, -1 + b * 2.6, -Math.PI / 2, 2.6, 0x5A3A22);
}
R.flies = [];
for (var f = 0; f < 20; f++) {
var fl = gmmS(0.03, 0x0A0A0A, -10.9 + (f % 2) * 21.8, 1.5 + (f % 5) * 0.6, -6 + (f * 0.7 % 12), g, 4);
fl.userData.keep = 1;
R.flies.push(fl);
}
gmmB(22, 0.02, 16, null, 0xB8B0A0, 0, 0.01, 0, g).material = new THREE.MeshLambertMaterial({ color: 0xB8B0A0, transparent: true, opacity: 0.25, depthWrite: false });
R.link(-9.6, 5, "briarkitchen", "The door to the kitchens", "go through");
R.link(9.6, -6.4, "briartower", "The narrow winding stair of the old tower", "climb it");
},
function (R, g) {
var hh = gmmHearth(g, R, 0, -4.4, 0, { pot: 1, fire: false });
R.fl = gmmK(0.4, 1.1, null, 0, 0, 0.6, -4, g, 8);
R.fl.material = gmmGlowM(0xFF8A30);
R.fl.userData.keep = 1;
gmmTable(g, -3, 0, 3, 1.2, 0x7A5232, {});
R.solid(-3, 0, 3.2, 1.4, 0.8);
for (var p = 0; p < 4; p++)
gmmS(0.14, [0xD8A050, 0x8A3A2A, 0xE8E0C0, 0x6AA83A][p], -4 + p * 0.6, 0.86, 0, g, 8);
gmmShelves(g, 6.6, 0, -Math.PI / 2, 6, 2.6, { books: false, jars: 1 });
for (var c = 0; c < 6; c++) {
var pn = gmmC(0.25, 0.2, 0.12, null, 0x8A5A2A, -5 + c * 0.7, 2.4, -4.8, g, 10);
pn.material = gmmShiny(0xB86A2A, 80);
}
var ck = R.person(661, 1, -1.6, -0.6, { sex: "f", title: "cook" });
var bo = R.person(662, 1.8, -2.6, 2.4, { sex: "m", child: 1, look: { top: 0xE8E0D0, bottom: 0x4A3A2A } });
var mt = R.person(663, -3, 1.2, Math.PI, { sex: "f", look: { topKind: "dress", top: 0x6A6A8A, layer: "apron", layerColor: 0xF0F0E8 } });
var hen = gmmBirdShape(R.D, R.x - 3, 0.86, 0.3, 0.7, 0x1A1A1A, 0.1, 0xE8A020);
R.sleepers = [ck, bo, mt];
R.spot(1.4, -1, 2, "The cook and the kitchen boy", "look closer", function () { setStatus(GMM.flags.briarAwake ? "🍳 <b>Smack!</b> The cook finishes the box on the ear she began a hundred years ago, and the boy howls. The maid finishes plucking the hen. The fire flares up and the meat begins to cook again." : "💤 The cook's hand is raised to box the boy's ears for something he did a hundred years ago. Neither moves. A fly sits on the cook's nose, asleep."); });
},
function (R, g) {
gmmWheel(g, 0, -1.4, 0);
R.solid(0, -1.4, 1, 1, 1);
gmmBed(g, -1.8, -1.6, 0, { L: 1.9, W: 1.1, quilt: 0xE8C8D0 });
R.person(671, 0.6, -1, Math.PI * 0.8, { sex: "f", look: { topKind: "robe", top: 0x6A6A6A, bottom: 0x5A5A5A, hat: "hood", hatColor: 0x8A8A8A, hair: 0xE8E8E8, hairStyle: "bun" }, talk: { name: "The old woman with the spindle", persona: "The old woman in the tower room of the Grimms' Briar Rose (Dornröschen, 1812-1857), who sat spinning flax with a spindle on the princess's fifteenth birthday. 'What's that thing that jumps about so merrily?' the princess asked, and touched the spindle, and pricked her finger, and the curse came true. You did not know about the curse; nobody in the kingdom had seen a spindle since the king had them all burned. Quiet, puzzled. Never mention films.", greet: "Good day, child. I am spinning. What's that? Have you never seen a spindle? Every one in the kingdom was burned, they say..." } });
R.rose = R.person(672, -1.8, -1.6, 0, { sex: "f", look: { topKind: "dress", top: 0xE8B8C8, hat: "tiara", hatColor: 0xF0D040, hair: 0xD8A860, hairStyle: "long" }, talk: { name: "Briar Rose", persona: "Briar Rose (Dornröschen) of the Grimms' tale (1812-1857), the king's daughter cursed at her christening by the thirteenth wise woman, who was not invited because the king had only twelve golden plates. On your fifteenth birthday you climbed the old tower, touched the spindle, pricked your finger and fell asleep, and the whole castle with you, for a hundred years, while a hedge of thorns grew round it. Now you are awake. Gentle, a little dazed. Never mention films.", greet: "Have I slept long? I dreamed of a hedge of roses, and a great many voices outside it..." } });
R.rose.g.rotation.set(-Math.PI / 2, 0, 0);
R.rose.g.position.set(R.x - 1.8, 0.62, -2.4);
R.spot(-1.8, -0.6, 1.8, "Briar Rose, asleep", "bend down and wake her", function () { gmmBriarWake(R); });
R.spot(0, -0.4, 1.6, "The spindle", "look at it", function () { setStatus("🧶 The spindle that pricked her finger on her fifteenth birthday. The twelfth wise woman could not undo the thirteenth's curse, only soften it: not death, but a deep sleep of a hundred years."); });
},
function (R, g) {
gmmHearth(g, R, 0, -3.4, 0, { pot: 1 });
var ash = gmmB(2.2, 0.08, 1.2, null, 0x6A6660, 0, 0.04, -2.2, g);
for (var l = 0; l < 30; l++) {
var Rr = wRand(6000 + l);
gmmS(0.025, l % 3 ? 0x6A5A2A : 0x3A3A30, -1 + Rr() * 2, 0.09, -2.7 + Rr() * 1, g, 4);
}
gmmTable(g, -3, 0.6, 1.8, 1, 0x6A4A2E, {});
R.solid(-3, 0.6, 2, 1.2, 0.8);
gmmShelves(g, 4.6, 0, -Math.PI / 2, 4, 2.2, { books: false, jars: 1 });
gmmC(0.24, 0.18, 0.12, null, 0xC8B898, -0.8, 0.08, -1.6, g, 12);
gmmC(0.24, 0.18, 0.12, null, 0xC8B898, 0.8, 0.08, -1.6, g, 12);
R.person(681, -0.4, -1.2, 0.2, { sex: "f", look: { topKind: "dress", top: 0x6A6A5A, layer: "apron", layerColor: 0x8A8A7A, hair: 0xE8C870, hairStyle: "bun" }, talk: { name: "Aschenputtel", persona: "Aschenputtel (Cinderella) of the Grimms' tale (1812-1857). Your stepmother has tipped lentils into the ashes and says if you pick them out in two hours you may come to the ball (then breaks her word). You call the birds: 'You tame pigeons, you turtle-doves, and all you birds under heaven, come and help me pick: the good into the pot, the bad into your crop.' Help comes from the hazel tree on your mother's grave and the white birds. Your slipper is gold. No godmother, no pumpkin, no midnight. Gentle and brave. Never mention films.", greet: "The good ones into the pot, the bad ones into the crop... I'll never do it alone. If only the birds would come." } });
R.spot(0, -1.6, 2, "The lentils in the ashes", "pick them out (call the birds to help)", function () { gmmLentils(R); });
R.link(4.2, 3, "cinderparlour", "The door to the parlour", "go through");
},
function (R, g) {
var dr = gmmG(0, 1.4, -3.95, g);
gmmB(1.2, 1.8, 0.05, null, 0, 0, 0, 0, dr).material = gmmShiny(0xC8D0D8, 140);
gmmB(1.4, 2, 0.04, null, 0xC8A040, 0, 0, -0.02, dr);
gmmTable(g, 0, -3, 1.6, 0.6, 0xA87A5A, {});
R.solid(0, -3, 1.8, 0.8, 0.8);
gmmStove(g, -4.2, -3, Math.PI / 2, 0xE8C8D8);
R.solid(-4.2, -3, 1.2, 1.6);
for (var d = 0; d < 5; d++) {
var ch = gmmChair(g, -3 + d * 1.6, 1.4, Math.PI, 0x8A5A3A);
gmmB(0.5, 0.7, 0.1, null, [0xE83A8A, 0x3A8AE8, 0xE8C830, 0x8A3AE8, 0x3AE88A][d], -3 + d * 1.6, 0.95, 1.6, g);
}
for (var s = 0; s < 2; s++)
R.person(691 + s, -1 + s * 2, -1.6, s ? 0.4 : -0.4, { sex: "f", look: { topKind: "dress", top: s ? 0xE83A8A : 0x8A3AE8, hair: s ? 0x2A1A12 : 0xA85A2A, hairStyle: "long" }, talk: { name: s ? "The younger stepsister" : "The elder stepsister", persona: "One of Aschenputtel's two stepsisters in the Grimms' tale (1812-1857), beautiful and fair of face but vile and black of heart. You make her comb your hair and buckle your shoes for the king's ball and mock her: 'Aschenputtel, would you like to go to the ball?' Later, to fit the golden slipper, your mother has you cut off a toe or a heel, and the doves on the hazel tree sing 'Rook di goo, rook di goo! There's blood in the shoe' (as the book says: your mother handed you a knife, 'when you are queen you will have no more need to go on foot'; and at the wedding the doves pecked out your eyes. Tell it plainly, without dwelling on it). Haughty, vain. Never mention films.", greet: s ? "Comb my hair, Aschenputtel! ...Oh, it's not her. Well, comb it anyway." : "The king's son will dance with ME. Three nights of feasting! And SHE thinks she'll come, in her grey smock." } });
},
function (R, g) {
for (var s = 0; s < 10; s++) {
gmmB(8, 0.3, 0.6, "marble", 0xF0E8DC, 0, 0.15 + s * 0.3, -3.2 - s * 0.6, g);
}
R.solid(0, -6, 8.2, 6, 3.2);
for (var c = 0; c < 6; c++) {
gmmC(0.5, 0.55, 7.5, "marble", 0xFFF4E8, -9 + c * 3.6, 3.75, 6.5, g, 14);
R.solid(-9 + c * 3.6, 6.5, 1.2, 1.2, 8);
}
var ch = gmmG(0, 6.6, 0, g);
gmmAdd(new THREE.TorusGeometry(1.4, 0.06, 6, 24), gmmShiny(0xD8B040, 90), 0, 0, 0, ch).rotation.x = Math.PI / 2;
for (var k = 0; k < 12; k++)
gmmCandle(ch, Math.cos(k / 12 * 6.283) * 1.4, 0, Math.sin(k / 12 * 6.283) * 1.4);
gmmRug(g, 0, 3, 4, 8, 0x8A1A2A, 0xA82A3A);
for (var f = 0; f < 4; f++)
R.person(701 + f, -6 + f * 4, 2 + (f % 2) * 2, f % 2 ? 0.4 : -0.4, { sex: "m", look: { top: 0x2A3A8A, bottom: 0xF0F0F0, layer: "vest", layerColor: 0xD8B040, hair: 0xF0F0F0, hairStyle: "short" } });
R.link(0, -7.4, "ballroom", "The doors to the ballroom, at the top of the stair", "go in");
},
function (R, g) {
for (var l = 0; l < 3; l++) {
var ch = gmmG(-9 + l * 9, 7.4, 0, g);
for (var r = 0; r < 2; r++) {
gmmAdd(new THREE.TorusGeometry(1.2 + r * 0.6, 0.05, 6, 24), gmmShiny(0xD8B040, 90), 0, -r * 0.5, 0, ch).rotation.x = Math.PI / 2;
for (var k = 0; k < 10; k++)
gmmCandle(ch, Math.cos(k / 10 * 6.283) * (1.2 + r * 0.6), -r * 0.5, Math.sin(k / 10 * 6.283) * (1.2 + r * 0.6));
}
}
var mus = gmmG(0, 0, -9.6, g);
gmmB(8, 0.5, 2.4, "wood", 0x6A3A1E, 0, 0.25, 0, mus);
for (var m = 0; m < 4; m++)
R.person(711 + m, -3 + m * 2, -9.6, 0, { sex: "m", look: { top: 0x2A2A2A, bottom: 0x2A2A2A, hair: 0xF0F0F0 } }).g.position.y = 0.5;
R.solid(0, -9.6, 8.2, 2.6, 1.2);
R.dancers = [];
for (var c = 0; c < (GMM.lite ? 4 : 8); c++) {
var a = c / (GMM.lite ? 4 : 8) * Math.PI * 2, cx = Math.cos(a) * 6, cz = Math.sin(a) * 4.5;
var m1 = R.person(720 + c * 2, cx - 0.3, cz, a, { sex: "m", look: { top: [0x2A3A8A, 0x6A1A2A, 0x1A5A3A, 0x3A2A5A][c % 4], bottom: 0xF0F0F0 } }), f1 = R.person(721 + c * 2, cx + 0.3, cz, a + Math.PI, { sex: "f", look: { topKind: "dress", top: [0xE8A0C0, 0xA0C8E8, 0xE8E0A0, 0xC8A0E8][c % 4], hair: [0x8A4A2A, 0xE8C870, 0x2A1A12][c % 3], hairStyle: "bun" } });
R.dancers.push({ a: m1, b: f1, ang: a, r: Math.hypot(cx, cz) });
}
R.prince = R.person(740, 4, 4, -0.6, { sex: "m", look: { top: 0xF0F0F0, bottom: 0x2A2A3A, layer: "jacket", layerColor: 0x2A3A8A, back: "cape", backColor: 0x8A1A2A, hat: "crown", hatColor: 0xD8B040, hair: 0x5A3A1A }, talk: { name: "The king's son", persona: "The king's son in the Grimms' Aschenputtel (1812-1857). The king holds a feast of three days so you may choose a bride. You dance only with the beautiful unknown girl in a gold and silver dress, and each night she slips away (into the dovecote, up the pear tree). On the third night you have the stairs smeared with pitch and her left slipper, all of gold, sticks. 'No one shall be my wife but she whose foot fits this golden shoe.' No midnight, no glass, no godmother. Courteous, smitten. Never mention films.", greet: "Will you dance? ...You look like someone I danced with last night. She vanished before I could ask her name." } });
R.spot(4, 3, 2.4, "The king's son", "dance with him", function () { gmmBallDance(R); });
},
function (R, g) {
gmmTable(g, 0, -2, 10, 1.6, 0x4A2E1A, { cloth: 0xF0E8D8 });
R.solid(0, -2, 10.2, 1.8, 0.8);
for (var c = 0; c < 8; c++) {
gmmChair(g, -4.2 + c * 1.2, -1, Math.PI, 0x4A2E1A, 1.15);
gmmChair(g, -4.2 + c * 1.2, -3, 0, 0x4A2E1A, 1.15);
gmmC(0.16, 0.15, 0.02, null, 0xE8E0D0, -4.2 + c * 1.2, 0.82, -1.5, g, 14);
}
var gp = gmmC(0.18, 0.16, 0.03, null, 0xD8B040, 0, 0.83, -1.5, g, 16);
gp.material = gmmShiny(0xD8B040, 110);
gmmC(0.05, 0.04, 0.14, null, 0xD8B040, 0.3, 0.88, -1.5, g, 10).material = gmmShiny(0xD8B040, 110);
for (var f = 0; f < 4; f++) {
var fd = gmmS(0.2, [0xC88A3A, 0x6AA83A, 0xD8A0A0, 0xB8782A][f], -3 + f * 2, 0.9, -2.4, g, 10);
fd.scale.y = 0.6;
}
gmmHearth(g, R, -9.4, -2, Math.PI / 2, {});
[-6, 0, 6].forEach(function (x) { gmmB(1.4, 3, 0.04, null, 0x2A5A4A, x, 4.2, -6.9, g); });
R.person(751, -5.4, -2, Math.PI / 2, { sex: "m", look: { topKind: "robe", top: 0x2A5A4A, bottom: 0x2A3A2A, hat: "crown", hatColor: 0xD8B040, beard: 1, hair: 0xE8E8E8 }, talk: { name: "The king", persona: "The king in the Grimms' The Frog King (1812-1857), father of the youngest princess. When the frog knocks and she tells you of her promise, you say sternly: 'What you have promised, you must keep. Let him in.' And when she doesn't want him: 'He helped you when you were in trouble; you must not despise him now.' Stern, fair. Never mention films.", greet: "Daughter, why does your heart beat so? Is there a giant at the door?" } });
var pr = R.person(752, 0, -1, Math.PI, { sex: "f", child: 1, look: { topKind: "dress", top: 0xE8C83A, hat: "tiara", hatColor: 0xF0D040, hair: 0xF0D070, hairStyle: "long" } });
R.frogAt = gmmFrog(R.D, R.x, 0.9, -1.2, 1.4);
R.frogAt.visible = false;
R.spot(0, -0.2, 2.2, "The little golden plate", "keep your word to the frog", function () { gmmFrogDinner(R); });
R.link(8.6, 4, "frogbed", "The stair to the princess's chamber", "go up");
},
function (R, g) {
gmmBed(g, 0, -2.2, 0, { L: 2, W: 1.4, quilt: 0xE8C8F0, post: 1, canopy: 0xF0D8F0 });
R.solid(0, -2.2, 1.6, 2.2, 2);
gmmChest(g, -3.4, -2.6, Math.PI / 2, 0xC8A07A);
gmmTable(g, 3, -2.6, 1, 0.6, 0xC8A07A, {});
R.solid(3, -2.6, 1.2, 0.8, 0.8);
R.frog = gmmFrog(R.D, R.x + 1.2, 0, -0.6, 1.5);
R.spot(1.2, -0.4, 2, "The frog, on the floor", "do what the princess did", function () { gmmFrogWall(R); });
},
function (R, g) {
var th = gmmG(0, 0, -6, g);
gmmB(4, 0.5, 2, "marble", 0xE8E0D8, 0, 0.25, 0, th);
gmmB(1.4, 2.6, 0.3, null, 0x2E5A4A, 0, 1.8, -0.6, th);
R.solid(0, -6, 4.2, 2.2, 2.8);
for (var s = 0; s < 12; s++) {
var sh = gmmS(0.1, [0xE83A8A, 0x3A8AE8, 0xE8C830][s % 3], -5.5 + s, 0.06, -3.2, g, 8);
sh.scale.set(0.8, 0.5, 2);
}
R.person(761, 0, -6, 0, { sex: "m", look: { topKind: "robe", top: 0x2E5A4A, bottom: 0x2A3A2A, hat: "crown", hatColor: 0xD8B040, beard: 1, hair: 0xD8D8D8 }, talk: { name: "The king", persona: "The king of the Grimms' The Twelve Dancing Princesses (Die zertanzten Schuhe, 1815-1857). Your twelve daughters sleep in one room; you lock the door every night, yet every morning their shoes are danced to holes. You have proclaimed: whoever finds out where they dance may choose one for his wife and be king after you; anyone who tries for three nights and fails... loses his head, as the book says (many have). Ask the visitor where they go; delighted with proof (twigs of silver, gold and diamond, a goblet). Never mention films.", greet: "Twelve pairs of shoes, every morning, danced right through. Where do they go? Find out for me, and you'll have my thanks." } });
R.spot(0, -4.6, 2.4, "The king", "tell him where the princesses dance", function () { gmmDanceReturn(); });
R.link(8.6, 4, "princessbed", "The princesses' bedchamber", "go in");
},
function (R, g) {
for (var b = 0; b < 12; b++)
gmmBed(g, -11 + b * 2, -3, 0, { L: 1.9, W: 1.1, quilt: [0xE83A8A, 0x3A8AE8, 0xE8C830, 0x8A3AE8, 0x3AE88A, 0xE8803A][b % 6], post: 1, canopy: [0xF0C0D8, 0xC0D8F0, 0xF0E8C0][b % 3] });
R.solid(0, -3, 24, 2.2, 2);
R.princesses = [];
for (var p = 0; p < 12; p++)
R.princesses.push(R.person(770 + p, -11 + p * 2, -1.3, Math.PI, { sex: "f", look: { topKind: "dress", top: [0xE83A8A, 0x3A8AE8, 0xE8C830, 0x8A3AE8, 0x3AE88A, 0xE8803A][p % 6], hat: "tiara", hatColor: 0xF0D040, hair: [0x8A4A2A, 0xE8C870, 0x2A1A12, 0xC8602A][p % 4], hairStyle: "long" }, talk: p === 0 ? { name: "The eldest princess", persona: "The eldest of the twelve dancing princesses (Grimm 1815-1857). Every night you and your sisters dress in your finest, and you knock on your bed so it sinks into the floor and a stair goes down; you lead them through groves of silver, gold and diamond trees, over a lake in twelve little boats with twelve princes, to a castle where you dance till three and your shoes are worn through. You are guarded about your secret. The youngest sister is always uneasy ('something isn't right'). Never mention films.", greet: "Hush! You'd better be asleep, like the others who sat here. Have you drunk your wine?" } : (p === 11 ? { name: "The youngest princess", persona: "The youngest of the twelve dancing princesses (Grimm 1815-1857). You always feel something is wrong: 'I don't know why, but my heart is uneasy'; you hear a twig snap behind you in the silver grove and feel someone tug your dress on the stair. Your sisters laugh at you. Never mention films.", greet: "I don't know why, but tonight I'm uneasy. Did you hear something?" } : undefined) }));
var td = gmmB(1.4, 0.06, 1.4, "wood", 0x6A4A2E, -11, 0.04, -1, g);
gmmB(0.4, 0.04, 0.06, null, 0x2A2A2A, -11, 0.08, -0.5, g);
R.spot(-11, -1, 1.8, "Under the eldest princess's bed: a trapdoor", "follow them down the stair", function () { gmmTrapdoor(R); });
},
function (R, g) {
var path = gmmB(6, 0.04, 150, null, 0x4A4A5A, 0, 0.02, -5, g);
var groves = [["silver", 0xD8E0E8, 50, 0], ["gold", 0xF0C830, 20, 1], ["diamond", 0xE8F8FF, -10, 2]];
groves.forEach(function (G2) {
for (var t = 0; t < (GMM.lite ? 8 : 14); t++) {
var side = t % 2 ? 1 : -1, z = G2[2] - ((t / 2) | 0) * 4, x = side * (7 + (t % 3)), tg = gmmG(x, 0, z, g);
gmmC(0.18, 0.28, 4, null, G2[0] === "gold" ? 0xA88A2A : 0x9A9AA8, 0, 2, 0, tg, 8).material = gmmShiny(G2[0] === "gold" ? 0xC8A030 : 0xB8B8C8, 100);
for (var c = 0; c < 6; c++) {
var lf = gmmAdd(new THREE.IcosahedronGeometry(0.9, 0), new THREE.MeshPhongMaterial({ color: G2[1], shininess: 140, specular: 0xFFFFFF, emissive: new THREE.Color(G2[1]).multiplyScalar(0.25), flatShading: true }), Math.cos(c) * 1.2, 4 + ((c / 3) | 0) * 0.9, Math.sin(c) * 1.2, tg);
}
R.solid(x, z, 0.8, 0.8, 8);
}
var gl = wGlow(G2[1], 20, 0.25);
gl.position.set(0, 3, G2[2] - 10);
g.add(gl);
(function (k, z) { R.spot(8, z - 6, 3, "A tree of " + k + " leaves", "break off a twig", function () { gmmTwig(R, k); }); })(G2[0], G2[2]);
});
var lake = gmmAdd(new THREE.PlaneGeometry(190, 70), gmmShiny(0x10183A, 120), 0, 0.05, -60, g);
lake.rotation.x = -Math.PI / 2;
lake.userData.keep = 1;
for (var e = 0; e < 4; e++)
gmmSolid(R.x + [0, 0, -98, 98][e], [-88, 88, 0, 0][e], [200, 200, 4, 4][e], [4, 4, 180, 180][e], -5, 40);
gmmSolid(R.x, -60, 190, 68, -5, 40);
for (var b = 0; b < 12; b++) {
var bg = gmmG(-11 + b * 2, 0.1, -27, g);
var hl = gmmAdd(new THREE.SphereGeometry(0.6, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), gmmMat(null, [0xE83A8A, 0x3A8AE8, 0xE8C830][b % 3]), 0, 0.4, 0, bg);
hl.scale.set(0.9, 0.6, 2);
}
var cs = gmmG(0, 0, -96, g);
gmmB(40, 12, 10, "stone", 0x6A6A8A, 0, 6, 0, cs);
for (var w = 0; w < 10; w++)
gmmWindow(cs, -18 + w * 4, 6, 5.1, 0, 1.4, 2.6, { lit: 0xFFE0A0 });
[-20, 20].forEach(function (x) { gmmC(4, 4, 20, "stone", 0x6A6A8A, x, 10, 0, cs, 14); gmmK(5, 8, "slate", 0x2A2A4A, x, 24, 0, cs, 14); });
var cg = wGlow(0xFFE0A0, 60, 0.3);
cg.position.set(0, 8, -90);
g.add(cg);
R.spot(0, -24, 4, "The twelve boats at the lake's edge", "cross the lake in the youngest princess's boat", function () { gmmBoatRide(R); });
R.spot(0, 72, 3, "The stair, back up", "climb up to the bedchamber", function () { gmmLeaveRoom(R); });
for (var s2 = 0; s2 < 30; s2++) {
var Rr = wRand(7000 + s2);
var st = wGlow([0xC8C0FF, 0xFFE0A0, 0xE8F8FF][s2 % 3], 2, 0.6);
st.position.set((Rr() - 0.5) * 190, 20 + Rr() * 15, (Rr() - 0.5) * 170);
g.add(st);
}
},
function (R, g) {
R.dancers = [];
for (var c = 0; c < (GMM.lite ? 6 : 12); c++) {
var a = c / (GMM.lite ? 6 : 12) * Math.PI * 2, cx = Math.cos(a) * 7, cz = Math.sin(a) * 5;
var m = R.person(800 + c * 2, cx - 0.3, cz, a, { sex: "m", look: { top: 0x2A2A4A, bottom: 0x1A1A2A, back: "cape", backColor: 0x4A2A6A } }), f = R.person(801 + c * 2, cx + 0.3, cz, a + Math.PI, { sex: "f", look: { topKind: "dress", top: [0xE83A8A, 0x3A8AE8, 0xE8C830, 0x8A3AE8, 0x3AE88A, 0xE8803A][c % 6], hat: "tiara", hatColor: 0xF0D040, hairStyle: "long" } });
R.dancers.push({ a: m, b: f, ang: a, r: Math.hypot(cx, cz) });
}
gmmTable(g, -10, -7, 4, 1.2, 0x3A2A4A, { cloth: 0xE8E0F8 });
R.solid(-10, -7, 4.2, 1.4, 0.8);
for (var k = 0; k < 6; k++)
gmmC(0.06, 0.04, 0.2, null, 0xD8B040, -11.5 + k * 0.6, 0.9, -7, g, 8).material = gmmShiny(0xD8B040, 120);
R.spot(-10, -6, 2.2, "A golden goblet on the table", "take it as proof", function () { gmmTwig(R, "goblet"); });
R.spot(0, 8.4, 2.4, "Back to the boats", "cross the lake and hurry home before them", function () { gmmLeaveRoom(R); });
},
function (R, g) {
var ms = gmmG(-2, 0, -2, g);
gmmB(3, 1, 3, "wood", 0x6A4A2E, 0, 0.5, 0, ms);
var st = gmmC(1.2, 1.2, 0.4, "stone", 0xB8B0A0, 0, 1.2, 0, ms, 20);
st.userData.keep = 1;
R.stone = st;
gmmK(0.8, 1, "wood", 0x8A6A48, 0, 2.2, 0, ms, 4);
R.solid(-2, -2, 3.2, 3.2, 2.4);
for (var s = 0; s < 10; s++) {
var sk = gmmS(0.4, 0xE8E0D0, 2.5 + (s % 4) * 0.8, 0.4, -3.5 + ((s / 4) | 0) * 0.9, g, 8);
sk.scale.set(0.9, 1.2, 0.8);
}
var ax = gmmC(0.18, 0.18, 12, "wood", 0x5A3A22, 0, 3.6, 0, g, 8);
ax.rotation.z = Math.PI / 2;
R.person(841, 1, 1, Math.PI, { sex: "f", look: { topKind: "dress", top: 0x8A7A6A, layer: "apron", layerColor: 0xF0F0E8, hair: 0xE8C870, hairStyle: "braids" }, talk: { name: "The miller's daughter", persona: "The miller's daughter in the Grimms' Rumpelstiltskin (1812-1857), before the king sends for her: she knows her father has boasted she can spin straw into gold, and she can't. Afterwards, as queen, she must guess the little man's name in three days to keep her child: she guesses Kaspar, Melchior, Balzer, then Ribs-of-Beef, Muttonchops, Lace-leg (Rippenbiest, Hammelswade, Schnürbein), and on the third day Kunz, Heinz, and then... Frightened but resourceful. Never mention films.", greet: "My father told the king I can spin straw into gold. I can't! I can spin flax, that's all..." } });
},
function (R, g, n) {
R.heaps = [];
for (var h = 0; h < n * 4; h++) {
var Rr = wRand(8000 + n * 20 + h), x = (Rr() - 0.5) * (R.w - 3), z = -R.d / 2 + 1.5 + Rr() * (R.d * 0.45);
var hp = gmmS(0.9 + Rr() * 0.6, 0xD8B858, x, 0.2, z, g, 10);
hp.scale.y = 0.55;
hp.userData.keep = 1;
R.heaps.push(hp);
}
gmmWheel(g, 0, 1, 0);
R.solid(0, 1, 1, 1, 1);
gmmChair(g, 0.6, 1.6, -Math.PI / 2, 0x6A4A2E);
R.gold = [];
for (var s = 0; s < n * 3; s++) {
var sp = gmmC(0.14, 0.14, 0.3, null, 0xF0C830, -R.w / 2 + 1 + s * 0.5, 0.15, R.d / 2 - 1.4, g, 12);
sp.material = gmmShiny(0xF0C830, 120);
sp.visible = false;
sp.userData.keep = 1;
R.gold.push(sp);
}
R.spot(0, 1.8, 2, "The spinning wheel", "sit at it (\"whirr, whirr, whirr\")", function () { gmmSpin(R, n); });
},
function (R, g) {
gmmB(1.4, 1.2, 1, "brick", 0x8A4A3A, -1.4, 0.6, -1.4, g);
gmmAdd(new THREE.CircleGeometry(0.3, 12, 0, Math.PI), gmmGlowM(0xFF8A30), -1.4, 0.5, -0.89, g);
R.solid(-1.4, -1.4, 1.6, 1.2, 1.4);
gmmWheel(g, 1.2, -1.2, -0.5);
gmmChair(g, 0.6, 0.4, 0, 0x5A3A22, 0.7);
gmmBarrel(g, 1.8, 1, 0.7);
gmmBed(g, -1.6, 1.1, Math.PI / 2, { L: 1.1, W: 0.6, quilt: 0x6A3A2A, wood: 0x4A2E1A });
gmmShelves(g, 2.3, 0.6, -Math.PI / 2, 1.2, 1.6, { books: false, jars: 1 });
gmmTable(g, 0.4, 1.2, 0.8, 0.6, 0x5A3A22, { h: 0.5 });
for (var lv = 0; lv < 3; lv++) {
var lf = gmmS(0.13, 0xC8904A, -1.1 + lv * 0.3, 1.27, -1.4, g, 8);
lf.scale.set(1.3, 0.6, 0.9);
}
for (var w = 0; w < 6; w++)
gmmC(0.06, 0.06, 0.7, "wood", 0x6A4A2A, -0.3 + w * 0.13, 0.06, -1.75, g, 6).rotation.z = Math.PI / 2;
gmmC(0.04, 0.04, 0.02, null, 0xD8B040, 2.3, 1.25, 0.5, g, 10);
gmmS(0.03, 0xD83A5A, 2.3, 1.27, 0.75, g, 6);
R.spot(1.2, -0.4, 1.6, "The little spinning wheel", "look at it", function () { setStatus("🎡 A wheel worn smooth by little hands. On a shelf: a necklace and a ring, the price of two nights' spinning. <i>The third night she had nothing left to give, and promised him her first child.</i>"); });
},
function (R, g) {
gmmTable(g, 0, -1, 4, 1.4, 0x4A2E1A, {});
R.solid(0, -1, 4.2, 1.6, 0.8);
gmmBench(g, 0, -0.1, 0, 4, 0x3A2414);
gmmBench(g, 0, -1.9, 0, 4, 0x3A2414);
for (var f = 0; f < 10; f++) {
var fd = gmmS(0.16, [0xB86A2A, 0xE8C070, 0x8A2A2A, 0x6AA83A, 0xD8A050][f % 5], -1.8 + f * 0.4, 0.88, -1 + ((f % 2) - 0.5) * 0.4, g, 8);
fd.scale.y = 0.7;
}
for (var c = 0; c < 4; c++)
gmmCandle(g, -1.5 + c, 0.82, -1.2);
gmmHearth(g, R, 4.6, -2, -Math.PI / 2, { pot: 1 });
for (var l = 0; l < 4; l++)
gmmChest(g, -5, -3 + l * 1.2, Math.PI / 2, 0x5A3A1E);
R.solid(-5, -1.2, 1.2, 5, 0.8);
for (var j = 0; j < 12; j++) {
gmmS(0.08, [0xD8B040, 0xC0C0C8, 0xD83A5A][j % 3], -4.6, 0.65, -3.2 + j * 0.3, g, 6);
}
for (var bb = 0; bb < 3; bb++)
gmmBarrel(g, 4.6, 1.4 + bb * 1.1, 0.9);
for (var sk = 0; sk < 5; sk++) {
var sa = gmmS(0.42, 0x8A7A5A, -4.4 + sk * 0.7, 0.36, 3.6, g, 8);
sa.scale.y = 0.85;
}
gmmShelves(g, 0, -4.3, 0, 3, 2.2, { books: false, jars: 1 });
var rk = gmmG(-2.5, 0, 3.9, g);
gmmB(2, 0.08, 0.1, "wood", 0x3A2414, 0, 1.6, 0, rk);
gmmB(2, 0.08, 0.1, "wood", 0x3A2414, 0, 0.9, 0, rk);
for (var sw = 0; sw < 4; sw++)
gmmB(0.05, 1.3, 0.02, null, 0xA8A8B0, -0.7 + sw * 0.45, 1.2, -0.08, rk);
gmmTable(g, 2.6, 2.6, 1.4, 0.9, 0x4A2E1A, {});
for (var cd = 0; cd < 6; cd++)
gmmB(0.09, 0.005, 0.13, null, 0xF0E8D8, 2.2 + cd * 0.15, 0.81, 2.6, g);
gmmChair(g, 2.6, 3.4, Math.PI, 0x3A2414, 0.9);
R.spot(0, 0.4, 2, "The robbers' table", "sit down and eat (as the four friends did)", function () { gmmRobbersFeast(); });
},
function (R, g) {
var spots = [["under the table", -2, 0], ["in the bed", 3.2, -3], ["in the stove", -4.2, -3.2], ["in the kitchen corner", 4.2, 2.4], ["in the cupboard", -4.4, 2.6], ["under the washbowl", 1.6, 3.2], ["in the clock case", 0, -3.9]];
gmmTable(g, -2, 0, 2, 1.1, 0xFF5A3A, { cloth: 0x3AC8FF });
R.solid(-2, 0, 2.2, 1.3, 0.8);
gmmBed(g, 3.2, -3, 0, { L: 1.8, W: 1.2, quilt: 0xFF3AA8, wood: 0x2A8AE8 });
R.solid(3.2, -3, 1.4, 2, 1);
gmmStove(g, -4.2, -3.2, Math.PI / 2, 0x3AC86A);
R.solid(-4.2, -3.2, 1.2, 1.6);
gmmShelves(g, 4.9, 2.4, -Math.PI / 2, 2, 2, { books: false, jars: 1, col: 0xFFB020 });
var cb = gmmG(-4.6, 0, 2.6, g, Math.PI / 2);
gmmB(1.4, 2, 0.6, "wood", 0x9A3AE8, 0, 1, 0, cb);
R.solid(-4.6, 2.6, 0.8, 1.6, 2);
var wb = gmmG(1.6, 0, 3.4, g);
gmmC(0.5, 0.4, 0.3, null, 0x3A8AE8, 0, 0.9, 0, wb, 14);
gmmB(0.8, 0.75, 0.6, "wood", 0xFFD020, 0, 0.38, 0, wb);
R.solid(1.6, 3.4, 1, 0.8, 1);
gmmClock(g, 0, -4.2, 0, 0xFF3A3A);
R.solid(0, -4.2, 0.8, 0.6, 2.2);
R.kids = [];
spots.forEach(function (s, i) {
var k = gmmBeast("goat", R.x + s[1] + (i === 6 ? 0 : 0.2), s[2] + (i === 6 ? 0.25 : 0.3), Math.random() * 6, 0.42, 90 + i, R.D, i === 6 ? 0.4 : 0);
k.visible = false;
R.kids.push(k);
R.spot(s[1], s[2] + (i === 6 ? 0.6 : 0.8), 1.3, "A hiding place: " + s[0], "look", function () { gmmKidFind(R, i, s[0]); });
});
for (var f = 0; f < 10; f++)
gmmS(0.12, [0xFF3A3A, 0xFFB020, 0x3AC84A, 0x2A8AFF, 0xA83AFF][f % 5], -5 + f * 1.1, 2.7, -4.35, g, 8);
},
function (R, g) {
gmmHearth(g, R, 0, -3.6, 0, { pot: 1 });
var kt = gmmS(0.24, 0, 0.4, 0.9, -3.3, g, 12);
kt.material = gmmShiny(0xD87A3A, 120);
gmmWheel(g, -3, -1.2, 0.6);
gmmBed(g, 3.6, -2.6, Math.PI / 2, { quilt: 0xF4F0E8 });
gmmChair(g, -1.4, -1.8, 0.4);
gmmChair(g, 1.4, -1.8, -0.4);
gmmB(0.5, 0.04, 0.3, null, 0x7A2A1A, -1.4, 0.9, -1.6, g);
var vase = gmmC(0.08, 0.06, 0.2, null, 0xE8E0D0, 3.6, 0.85, -1.6, g, 10);
gmmS(0.06, 0xF4F4F0, 3.55, 1.0, -1.6, g, 6);
gmmS(0.06, 0xC81A2A, 3.65, 1.0, -1.6, g, 6);
gmmTable(g, 3.6, -1.6, 0.6, 0.5, 0x8A6A48, { h: 0.7 });
R.solid(0, -3.6, 2.6, 1, 2);
R.person(2101, -0.6, -0.6, Math.PI, { sex: "f", s: 0.88, look: { topKind: "dress", top: 0xF0F0F4, layer: "apron", layerColor: 0xE0E8F0, hair: 0xF0E0B0, hairStyle: "long" }, talk: gmmTalkOf("Snow-White", "Snow-White, the quiet, gentle elder sister of the Grimms' Snow-White and Rose-Red (1857). You stay at home with your mother, help her with the housework, read to her when there is nothing to do; in winter you light the fire and bolt the door at night. You and Rose-Red love each other: 'We will not leave each other.' 'Never so long as we live.' Gentle, kind.", "Go, Rose-Red, and bolt the door... Oh, a traveller? Then let him in.") });
R.person(2102, 0.6, -0.6, Math.PI, { sex: "f", s: 0.88, look: { topKind: "dress", top: 0xC82A3A, layer: "apron", layerColor: 0xF0E8E8, hair: 0x8A3A1A, hairStyle: "braids" }, talk: gmmTalkOf("Rose-Red", "Rose-Red, the lively younger sister of the Grimms' Snow-White and Rose-Red (1857). You run about the meadows and fields seeking flowers and catching butterflies; the hare eats cabbage from your hand, the roe grazes by your side. You are not afraid of the bear: you beat the snow from his coat and play rough games with him. Merry, bold.", "Quick, open the door: it must be a traveller seeking shelter!") });
R.person(2103, -3, 0.6, Math.PI * 0.8, { sex: "f", look: { topKind: "dress", top: 0x4A4A5A, layer: "apron", layerColor: 0xE8E0D0, hair: 0xC8C8C0, hairStyle: "bun" }, talk: gmmTalkOf("The widow, their mother", "The poor widow of the Grimms' Snow-White and Rose-Red (1857), living alone in a cottage with a garden where two rose-trees grow, one white and one red. You read aloud to your daughters out of a large book by the fire in winter; you are not afraid when a bear puts his head in at the door. Wise, warm, pious.", "What one has she must share with the other. Sit down, child; I'll read to you.") });
var lamb = gmmBeast("sheep", -1, 1.6, 0.4, 0.6, 2104, g);
gmmDove(g, -4.4, 2.1, -3.6);
},
function (R, g) {
gmmTable(g, 0, -3.4, 8, 1.2, 0x5A3A22, { cloth: 0xF4F0E8 });
R.solid(0, -3.4, 8.2, 1.4, 0.8);
for (var c = 0; c < 6; c++)
gmmChair(g, -3.6 + c * 1.45, -4.5, 0, 0x6A2A1A, 1.1);
for (var k = 0; k < 6; k++)
gmmCandle(g, -3 + k * 1.2, 0.8, -3.4, true);
R.person(2111, -0.8, -4.5, 0, { sex: "m", title: "king", look: { top: 0x5A2A6A, bottom: 0x2A2A3A, hat: "crown", hatColor: 0xE8C040, beard: 1, hair: 0xE8E8E0 }, talk: gmmTalkOf("The old king", "The aged king of the Grimms' The Goose-Girl (1857). You noticed the goose-girl's beauty from the window; Conrad complained of her; you hid behind the dark gateway and heard her speak to Falada's head, and watched the wind blow Conrad's hat away. She would not tell you her trouble (she swore not to, on pain of death), so you told her to tell it to the iron stove, and listened at the stove-pipe. Wise, just, stern.", "If thou wilt not tell me anything, tell thy sorrows to the iron stove there.") });
R.person(2112, 0.8, -4.5, 0, { sex: "f", look: { topKind: "dress", top: 0xE8C8D8, hat: "tiara", hatColor: 0xE8C040, hair: 0x3A2A1A, hairStyle: "long" }, talk: gmmTalkOf("The bride (the waiting-maid)", "The false bride of the Grimms' The Goose-Girl (1857): the waiting-maid who would not fetch water for her princess, made her swear by the open sky to tell no living soul, took her royal clothes and her place, and had Falada's head cut off so the horse could not speak. Haughty, nervous, cruel; you think no one knows.", "I picked her up on my way for a companion. Give the girl something to work at, that she may not stand idle.") });
R.person(2113, 2.4, -4.5, 0, { sex: "m", title: "king", look: { top: 0x2A3A6A, bottom: 0x2A2A3A, hat: "crown", hatColor: 0xE8C040, hair: 0x6A4A2A }, talk: gmmTalkOf("The young king", "The young king of the Grimms' The Goose-Girl (1857), betrothed to a princess from far away, who has been fooled into taking her waiting-maid as his bride. Kind, a little slow to see.", "Welcome. My bride came from far away, with only her maid.") });
for (var b = 0; b < 4; b++)
gmmBarrel(g, -8, 2 + b * 0.9, 0.9);
gmmShelves(g, 7.6, 0, -Math.PI / 2, 2.4, 2.2, {});
},
function (R, g) {
var st = gmmG(0, 0, -3, g);
gmmB(1.8, 1.6, 1.4, null, 0x1A1A1E, 0, 0.8, 0, st);
gmmB(2, 0.12, 1.6, null, 0x2A2A2E, 0, 1.66, 0, st);
gmmC(0.18, 0.18, 1.9, null, 0x1A1A1E, 0, 2.6, -0.4, st, 10);
gmmB(0.5, 0.4, 0.05, null, 0x3A3A3E, 0, 0.6, 0.71, st);
var fl = gmmB(0.4, 0.25, 0.02, null, 0, 0, 0.6, 0.74, st);
fl.material = gmmGlowM(0xFF7A2A);
R.solid(0, -3, 2, 1.6, 2);
R.spot(0, -1.6, 2, "The iron stove", "creep in and tell it everything", function () { gmmGGStove(); });
gmmTable(g, 3, 0.5, 2, 1, 0x6A4A2E, {});
for (var p = 0; p < 5; p++)
gmmC(0.14, 0.12, 0.2, null, 0x8A5A3A, 2.2 + p * 0.4, 0.88, 0.5, g, 8);
gmmHearth(g, R, -4.4, 0, Math.PI / 2, { pot: 1 });
gmmShelves(g, 4.6, -2.4, -Math.PI / 2, 2.4, 2.2, {});
gmmShelves(g, -2.6, -3.7, 0, 2, 1.8, {});
gmmBench(g, 3, 1.4, 0, 2.2);
gmmBench(g, -1.2, 2.6, 0, 2.4);
gmmBarrel(g, -3.8, 3.2);
gmmBarrel(g, -3.1, 3.4, 0.7);
gmmBarrel(g, 4.3, 3.2);
var cb = gmmC(0.4, 0.45, 0.75, "wood", 0x7A5A3A, 1.6, 0.38, -2.4, g, 12);
gmmB(0.5, 0.04, 0.08, null, 0x8A8A8E, 1.6, 0.8, -2.4, g);
for (var o = 0; o < 9; o++)
gmmS(0.09, o % 3 ? 0xC8A060 : 0xE8D8B0, -1.2 + o * 0.3, 2.6, -3.8, g, 6);
gmmB(3, 0.04, 0.04, "wood", 0x5A3A22, 0, 2.75, -3.8, g);
gmmChair(g, 3, -0.4, Math.PI / 2);
},
function (R, g) {
for (var b = 0; b < 6; b++) {
gmmBed(g, -3.2 + b * 1.28, -2, 0, { L: 1.5, W: 0.7, quilt: [0x6A5A4A, 0x5A6A5A, 0x4A4A5A][b % 3], wood: 0x5A3A22 });
}
R.solid(0, -2, 8, 1.6, 0.6);
gmmHearth(g, R, 3.6, 1.4, -Math.PI / 2, {});
R.spot(-0.6, -1.2, 1.6, "Under one of the little beds", "hide and wait for sunset", function () { gmmSwanSunset(R); });
R.brothers = [];
for (var p = 0; p < 6; p++) {
var P = R.person(2121 + p, -2.6 + p * 1.04, 0.6, Math.PI, { sex: "m", look: { top: [0x4A5A7A, 0x6A4A3A, 0x3A5A4A, 0x5A4A6A, 0x7A6A3A, 0x4A4A4A][p], bottom: 0x3A3A3A, hair: [0xC8A060, 0x6A4A2A, 0x3A2A1A, 0xE0C890, 0x8A5A3A, 0x2A1A12][p] }, talk: gmmTalkOf("One of the six brothers", "One of six princes of the Grimms' The Six Swans (1857), turned into a swan by your stepmother's magic white silk shirts. Every evening you may lay aside your swan's skin for a quarter of an hour only. Your sister may free you: six years without speaking or laughing, and six shirts of starwort sewn for you; one word and all is lost. Sad, loving, hurried.", "Sister! Here canst thou not abide: this is a shelter for robbers.") });
P.g.visible = false;
R.brothers.push(P);
}
},
function (R, g) {
gmmHearth(g, R, 0, -5.6, 0, {});
gmmCradle(g, 2, -3, 0.3);
gmmRug(g, 0, -1, 5, 3.4, 0x6A2A2A, 0x8A4A3A);
gmmTable(g, -4, -2, 2.4, 1.2, 0x5A3A22, {});
R.solid(-4, -2, 2.6, 1.4, 0.8);
R.spot(2, -2, 1.8, "The cradle", "the queen's first child", function () { gmmSwanCradle(); });
R.person(2131, -3, -3, 0.6, { sex: "f", look: { topKind: "robe", top: 0x2A2A3A, hat: "crown", hatColor: 0xC8A040, hair: 0xA8A8A8, hairStyle: "bun" }, talk: gmmTalkOf("The king's mother", "The wicked mother of the king in the Grimms' The Six Swans (1857). You hate your son's dumb wife ('from whence the creature who can't speak comes? She is not worthy of a king!'). Three times, when she gives birth, you carry off the child, smear blood on her mouth while she sleeps, and tell the king she eats her children. Cold, scheming, venomous.", "From whence comes the creature who can't speak? She is not worthy of a king.") });
R.person(2132, 3.6, -3.6, -0.6, { sex: "m", title: "king", look: { top: 0x3A5A3A, bottom: 0x2A2A2A, hat: "crown", hatColor: 0xE8C040, beard: 1, hair: 0x5A3A1A }, talk: gmmTalkOf("The king", "The king of the Grimms' The Six Swans (1857), who found a silent, beautiful girl sewing in a tree while hunting, and married her. You love her and will not believe your mother's lies, until the third time, when you must give her up to judgement. Torn, loving, weak against his mother.", "She is too pious and good to do anything of that kind; if she were not dumb, her innocence would come to light.") });
},
function (R, g) {
for (var b = 0; b < 7; b++)
gmmBed(g, -4.2 + b * 1.4, -3, 0, { L: 1.4, W: 0.7, quilt: GMM_CLOTH[b], wood: 0x6A4A2E });
R.solid(0, -3, 10, 1.6, 0.6);
gmmCradle(g, 3.6, 0.8, 0.4);
gmmHearth(g, R, -4.4, 1, Math.PI / 2, { pot: 1 });
gmmTable(g, 0, 0.6, 2.2, 1, 0x7A5A3A, {});
R.solid(0, 0.6, 2.4, 1.2, 0.8);
var ring = gmmAdd(new THREE.TorusGeometry(0.03, 0.008, 6, 14), gmmShiny(0xF0C030, 140), 0.3, 0.82, 0.6, g);
ring.rotation.x = Math.PI / 2;
gmmB(0.4, 0.3, 0.25, null, 0xC89A5A, -0.5, 0.92, 0.6, g);
gmmC(0.08, 0.07, 0.22, null, 0x8A6A4A, 0, 0.9, 0.4, g, 10);
gmmChair(g, 0.9, 1.6, 0, 0x8A6A48, 0.6);
R.spot(0, 1.6, 1.8, "The table: a ring, a loaf, a little pitcher, a little chair", "take them, and go after your brothers", function () { gmmRavensPack(); });
R.person(2141, 2.6, -0.6, -0.6, { sex: "m", look: { top: 0x5A4A3A, bottom: 0x3A3A2A, beard: 1, hair: 0x8A8A80 }, talk: gmmTalkOf("The father", "The father of the Grimms' The Seven Ravens (1857). You sent your seven sons for baptism water, and when they were slow, you cried in anger 'I wish the boys were all turned into ravens', and saw seven coal-black ravens fly away. You cannot take back the curse. Guilty, grieving, quiet.", "It was the will of Heaven... and your birth only the innocent cause.") });
R.person(2142, 3.6, -0.4, -0.9, { sex: "f", look: { topKind: "dress", top: 0x5A5A7A, layer: "apron", layerColor: 0xE8E0D0, hair: 0x6A4A2A, hairStyle: "bun" }, talk: gmmTalkOf("The mother", "The mother of the Grimms' The Seven Ravens (1857), who lost seven sons to a curse and comforted herself with her little daughter, who soon grew strong and beautiful. You kept the secret from her until she overheard people say she was to blame. Sad, tender.", "We never told you, child. We could not bear to.") });
},
function (R, g) {
var sun = gmmS(9, 0, -60, 14, -40, g, 24);
sun.material = gmmGlowM(0xFFB020);
gmmLight(0xFF9020, 1.2, 90, -50, 10, -30, g, true);
var moon = gmmS(7, 0, 60, 14, -40, g, 24);
moon.material = gmmGlowM(0xD8E0F0);
R.spot(-42, -26, 8, "The sun", "go nearer", function () { setStatus("☀️ It is too hot and terrible, and it devours little children. You run away, fast."); });
R.spot(44, -26, 8, "The moon", "go nearer", function () { setStatus("🌕 It is far too cold, and awful and malicious, and when it sees you it says: <b>\"I smell, I smell the flesh of men.\"</b> You run swiftly away."); });
R.stars = [];
for (var s = 0; s < 9; s++) {
var sx = -24 + s * 6, sz = -20 - (s % 2) * 3;
gmmChair(g, sx, sz, 0, 0xE8E0F0, 0.7);
var st = gmmS(0.7, 0, sx, 1.2, sz, g, 12);
st.material = gmmGlowM(s === 4 ? 0xFFF4C0 : 0xE8ECFF);
R.stars.push(st);
}
R.spot(0, -16, 6, "The stars, each on its own little chair", "go to them", function () { gmmRavensStars(); });
for (var k = 0; k < 200; k++) {
var Rr = wRand(2150 + k);
var dot = gmmS(0.12, 0, -80 + Rr() * 160, 8 + Rr() * 30, -60 + Rr() * 30, g, 4);
dot.material = gmmGlowM(0xFFFFFF);
}
R.spot(0, 52, 6, "The road back", "go to the Glass Mountain", function () { gmmRavensLeaveEnd(); });
},
function (R, g) {
gmmTable(g, 0, -2, 4.6, 1, 0xB8D0DC, { h: 0.7, cloth: 0xF4F8FC });
R.solid(0, -2, 4.8, 1.2, 0.8);
R.cups = [];
for (var i = 0; i < 7; i++) {
var px = -2 + i * 0.66;
gmmC(0.14, 0.12, 0.02, null, 0xF4F4F8, px, 0.72, -1.8, g, 14);
var cp = gmmC(0.05, 0.035, 0.14, null, 0, px + 0.2, 0.79, -1.8, g, 10);
cp.material = gmmSee(0xD8ECF8, 0.6);
R.cups.push(cp);
(function (i, px) { R.spot(px, -1, 0.55, "Little plate and glass " + (i + 1), "take a morsel and a sip", function () { gmmRavensTable(R, i); }); })(i, px);
}
R.person(2151, -3.4, 0, 0.6, { sex: "m", s: 0.55, look: { top: 0x5A6A8A, bottom: 0x3A3A4A, hat: "pixie", hatColor: 0x3A4A6A, beard: 1, hair: 0xE8E8F0 }, talk: gmmTalkOf("The dwarf of the Glass Mountain", "The little dwarf who keeps house for the seven ravens in the Glass Mountain in the Grimms' The Seven Ravens (1857). 'The lord ravens are not at home, but if you will wait here until they come, step in.' You bring their dinner in on seven little plates and seven little glasses. Polite, old, kind.", "My child, what are you looking for? The lord ravens are not at home; step in and wait.") });
R.ravens = [];
for (var r = 0; r < 7; r++) {
var rv = gmmRaven(g, -2 + r * 0.66, 1.4, -1.8);
rv.visible = false;
rv.userData.keep = 1;
R.ravens.push(rv);
}
R.brothers = [];
for (var b = 0; b < 7; b++) {
var P = R.person(2152 + b, -3 + b * 1, 0.8, Math.PI, { sex: "m", look: { top: GMM_CLOTH[b], bottom: 0x2A2A2A, hair: [0x3A2A1A, 0x6A4A2A, 0xC8A060, 0x2A1A12, 0x8A5A3A, 0x5A3A2A, 0xE0C890][b] }, talk: gmmTalkOf("One of the seven brothers", "One of seven brothers of the Grimms' The Seven Ravens (1857), turned to ravens by your father's angry wish and freed by your little sister, who came to the Glass Mountain and dropped your parents' ring in the seventh glass. Joyful, grateful.", "Sister! God be thanked, we are free. Let us go home.") });
P.g.visible = false;
R.brothers.push(P);
}
},
function (R, g) {
gmmTable(g, 0, -2, 7, 1.2, 0x5A3A22, {});
R.solid(0, -2, 7.2, 1.4, 0.8);
for (var c = 0; c < 5; c++) {
gmmChair(g, -2.8 + c * 1.4, -3, 0);
gmmChair(g, -2.8 + c * 1.4, -1, Math.PI);
}
for (var a = 0; a < 6; a++) {
var ag = gmmG(-6 + a * 2.4, 3.2, -5.85, g);
gmmB(0.3, 0.4, 0.1, "wood", 0x5A3A22, 0, 0, 0, ag);
[-1, 1].forEach(function (k) { var t = gmmC(0.03, 0.04, 0.9, null, 0xE8DCC0, k * 0.3, 0.4, 0.1, ag, 5); t.rotation.z = -k * 0.6; });
}
gmmHearth(g, R, 7.4, 0, -Math.PI / 2, {});
R.person(2161, -4, 1, 0.6, { sex: "m", title: "king", look: { top: 0x3A5A2A, bottom: 0x3A2A1A, hat: "crown", hatColor: 0xE8C040, beard: 1, hair: 0x6A4A2A }, talk: gmmTalkOf("The king", "The king of the Grimms' Iron John (1857), whose huntsmen vanished in the forest until a stranger baled out the pool and found the wild man at the bottom. You shut the wild man in an iron cage in your court and forbade anyone, on pain of death, to open it; the queen keeps the key. Proud, stern.", "Whoever opens that cage shall die. The key is with the queen.") });
R.link(-6.6, -4.6, "ijqueen", "The stairs up to the queen's chamber", "go up");
},
function (R, g) {
gmmBed(g, 0, -2.6, 0, { L: 2.2, W: 1.8, quilt: 0xA82A3A, canopy: 1 });
R.solid(0, -2.6, 2, 2.4, 1);
gmmChest(g, 3.4, -3, -Math.PI / 2);
gmmRug(g, 0, 0.4, 3, 2, 0x8A3A4A);
var pr = gmmG(-3.9, 0, -1.6, g, Math.PI / 2);
gmmB(2, 2.4, 0.7, "wood", 0x6A3A2A, 0, 1.2, 0, pr);
gmmB(0.9, 2, 0.04, null, 0x8A5A3A, -0.48, 1.2, 0.36, pr);
gmmB(0.9, 2, 0.04, null, 0x8A5A3A, 0.48, 1.2, 0.36, pr);
R.solid(-3.9, -1.6, 0.8, 2.1, 2.4);
gmmTable(g, 3.2, 1.6, 1.2, 0.6, 0x7A4A2E, {});
var mi = gmmB(0.6, 0.8, 0.04, null, 0xC8D4DC, 3.2, 1.5, 1.3, g);
mi.material = gmmShiny(0xC8D4DC, 120);
gmmChair(g, 3.2, 2.4, Math.PI);
gmmCandle(g, 2.8, 0.8, 1.6);
gmmCandle(g, 3.6, 0.8, 1.6);
gmmB(0.5, 0.9, 0.5, "wood", 0x5A3A22, -2.6, 0.45, 2.6, g);
gmmB(0.5, 0.12, 0.3, null, 0x8A2A3A, -2.6, 0.95, 2.4, g);
gmmPicture(g, 0, 2.2, -3.93, 0, 1, 1.2, gmmPortrait, 2161);
gmmChair(g, -1.4, 1.6, 0.4);
gmmClock(g, 3.9, -2.2, -Math.PI / 2);
gmmChair(g, 1.6, 1.4, -0.5);
var cs = gmmG(-3.2, 0, 1.2, g, 0);
gmmC(0.04, 0.05, 1.4, null, 0x8A6A3A, 0, 0.7, 0, cs, 8);
for (var cc = 0; cc < 3; cc++)
gmmCandle(cs, -0.2 + cc * 0.2, 1.4, 0);
gmmB(0.5, 0.3, 0.4, null, 0x8A2A3A, -1, 0.15, -0.4, g);
R.spot(0, -1.2, 1.6, "The queen's pillow", "feel underneath it", function () { gmmIJKey(); });
},
function (R, g) {
var who = [["The fat one", "\"Wine-cask!\"", 0x6A3A5A, 1.25], ["A tall one", "\"Long and thin, has little in.\"", 0x3A5A6A, 1.1], ["A short one", "\"Short and thick is never quick.\"", 0x5A6A3A, 0.85], ["A pale one", "\"Pale as death!\"", 0xE8E0D8, 1], ["A red one", "\"A fighting-cock!\"", 0xA82A2A, 1], ["One not quite straight", "\"Like green wood, dried behind the stove!\"", 0x6A5A3A, 1], ["A good king with a crooked chin", "\"He has a chin like a thrush's beak!\"", 0x2A4A6A, 1]];
R.suitors = [];
who.forEach(function (W, i) {
var P = R.person(2171 + i, -7.2 + i * 2.4, -2.6, 0, { sex: "m", title: i === 6 ? "king" : null, look: { top: W[2], bottom: 0x2A2A2A, hat: i === 6 ? "crown" : (i < 2 ? "crown" : "tophat"), hatColor: i === 6 || i < 2 ? 0xE8C040 : 0x1A1A1A, beard: i === 6 ? 1 : i % 2, hair: [0x3A2A1A, 0x8A6A3A, 0x2A1A12, 0xC8B890, 0xA83A1A, 0x6A4A2A, 0x5A3A1A][i] }, s: W[3] });
R.suitors.push(P);
(function (i, W) { R.spot(-7.2 + i * 2.4, -1.4, 1.1, W[0], "look him over (as she did)", function () { gmmThrushMock(i, W); }); })(i, W);
});
R.person(2179, 0, -5, 0, { sex: "m", title: "king", look: { top: 0x5A2A6A, bottom: 0x2A2A3A, hat: "crown", hatColor: 0xE8C040, beard: 1, hair: 0xE8E8E0 }, talk: gmmTalkOf("The old king, her father", "The father of the proud princess in the Grimms' King Thrushbeard (1857). When she had mocked every suitor, you were angry and swore to give her to the very first beggar who came to the door; a fiddler came singing under the window, and you kept your oath. Angry, a man of his word.", "I have taken an oath to give you to the very first beggar-man, and I will keep it.") });
gmmB(4, 0.5, 2, "wood", 0x6A2A2A, 0, 0.25, -5.4, g);
R.solid(0, -5.4, 4, 2, 1);
},
function (R, g) {
gmmHearth(g, R, 1.8, -1.4, -Math.PI / 2, { pot: 1 });
gmmBed(g, -1.5, -1.2, 0, { L: 1.8, W: 1, quilt: 0x6A5A4A });
for (var w = 0; w < 8; w++)
gmmC(0.01, 0.01, 1, null, 0x8A7A4A, -2 + w * 0.08, 0.5, 0.8, g, 3);
R.spot(-1.6, 1, 1.4, "Willows, cut and brought in", "weave baskets", function () { gmmThrushWork("baskets"); });
gmmWheel(g, 0.4, 0.6, 0.3);
R.spot(0.4, 1.2, 1.2, "The spinning wheel", "spin", function () { gmmThrushWork("spin"); });
R.person(2181, 0, -0.4, Math.PI, { sex: "m", look: { top: 0x6A5A4A, bottom: 0x4A3A2A, hat: "brimmed", hatColor: 0x5A4A3A, beard: 1, hair: 0x5A3A1A }, talk: gmmTalkOf("The fiddler, her husband", "The beggar fiddler of the Grimms' King Thrushbeard (1857), who is really King Thrushbeard in disguise, humbling the proud princess who mocked him. You make her light the fire, cook, weave baskets, spin and sell pots, gruffly, and say 'You are good for nothing'. Gruff, patient, secretly loving.", "Wife, we can't go on any longer eating and drinking here and earning nothing.") });
},
function (R, g) {
for (var l = 0; l < 5; l++) {
var ch = gmmG(-8 + l * 4, 6.4, 0, g);
gmmAdd(new THREE.TorusGeometry(0.8, 0.05, 6, 16), gmmShiny(0xE8C040, 100), 0, 0, 0, ch).rotation.x = Math.PI / 2;
for (var c = 0; c < 6; c++) {
var a = c / 6 * Math.PI * 2;
gmmCandle(ch, Math.cos(a) * 0.8, 0, Math.sin(a) * 0.8, true);
}
}
R.dancers = [];
var cols = [[0x2A4A8A, 0xE8C8D8], [0x6A2A2A, 0xF0E8C8], [0x2A5A3A, 0xD8C8E8], [0x3A3A3A, 0xF4D8A8]];
cols.forEach(function (c, i) { var a = R.person(2190 + i * 2, 0, 0, 0, { sex: "m", look: { top: c[0], bottom: 0x1A1A1A, hair: 0x3A2A1A } }), b = R.person(2191 + i * 2, 0, 0, 0, { sex: "f", look: { topKind: "dress", top: c[1], hair: 0x8A5A2A, hairStyle: "bun" } }); R.dancers.push({ a: a, b: b, ang: i * 1.57, r: 4 }); });
R.person(2199, 0, -6, 0, { sex: "m", title: "king", look: { top: 0x7A1A2A, bottom: 0x2A2A2A, hat: "crown", hatColor: 0xE8C040, beard: 1, hair: 0x5A3A1A }, talk: gmmTalkOf("The king's son (King Thrushbeard)", "King Thrushbeard of the Grimms' King Thrushbeard (1857), whom the proud princess mocked for his crooked chin. You disguised yourself as the beggar fiddler she married, and as the drunken hussar who rode through her pots, to cure her pride. Now at the wedding you take her by the hand to dance. 'Do not be afraid, I and the fiddler who has been living with you in that wretched hovel are one.' Warm, laughing.", "Do not be afraid. I and the fiddler are one.") });
R.link(10, -6.6, "thrushkitchen", "The stairs down to the kitchen", "go down");
},
function (R, g) {
gmmHearth(g, R, 0, -4.6, 0, { pot: 1 });
gmmTable(g, -3, 0, 3, 1.2, 0x6A4A2E, {});
R.solid(-3, 0, 3.2, 1.4, 0.8);
for (var p = 0; p < 8; p++)
gmmC(0.18, 0.15, 0.3, null, 0x8A6A4A, -4.2 + p * 0.36, 0.95, 0, g, 10);
gmmTable(g, 3.6, -1, 3, 1.2, 0x6A4A2E, {});
R.solid(3.6, -1, 3.2, 1.4, 0.8);
R.person(2201, 3, 0.4, Math.PI, { sex: "m", title: "baker", look: { top: 0xF0F0F0, bottom: 0x6A6A6A, hat: "cap", hatColor: 0xF0F0F0, hair: 0x6A4A2A }, talk: gmmTalkOf("The palace cook", "The cook in King Thrushbeard's palace in the Grimms' King Thrushbeard (1857), who takes on a poor woman as kitchen-maid for the dirtiest work, and gives her scraps of what is left over to carry home in her pocket-jars. Busy, gruff, not unkind.", "Here, girl: scour that pot, then you may take home what's left.") });
R.spot(-3, 1.2, 1.6, "The scraps of the feast", "put them in the jars in your pockets", function () { gmmThrushJars(); });
},
function (R, g) {
var bed = gmmB(1.6, 0.25, 1, null, 0x5A7A3A, -1.6, 0.13, -1.4, g);
gmmB(1.4, 0.1, 0.8, null, 0x8A6A3A, -1.6, 0.3, -1.4, g);
gmmBed(g, 1.6, -1.4, 0, { L: 1.8, W: 0.9, quilt: 0x8A7A5A });
for (var b = 0; b < 14; b++)
gmmS(0.05, [0x8A1A3A, 0x3A2A6A, 0x6A4A2A][b % 3], -0.4 + (b % 5) * 0.12, 0.85, 0.6 + ((b / 5) | 0) * 0.1, g, 5);
gmmTable(g, 0, 0.6, 1, 0.7, 0x6A4A2E, {});
gmmHearth(g, R, 2.7, 1.2, -Math.PI / 2, { pot: 1 });
gmmChair(g, 0.6, 1.3, Math.PI, 0x6A4A2E, 0.9);
var bk = gmmC(0.3, 0.22, 0.3, "wood", 0x9A7A4A, -1.8, 0.15, 1.6, g, 10);
for (var nt = 0; nt < 8; nt++)
gmmS(0.05, nt % 2 ? 0x6A4A2A : 0xC8A060, -1.9 + (nt % 4) * 0.07, 0.32, 1.55 + ((nt / 4) | 0) * 0.08, g, 5);
for (var hb = 0; hb < 5; hb++)
gmmK(0.06, 0.3, null, [0x5A7A3A, 0x7A8A4A][hb % 2], -1 + hb * 0.4, 1.95, -2.3, g, 5);
gmmC(0.18, 0.15, 0.3, "wood", 0x7A5A3A, -0.6, 0.15, 2, g, 10);
gmmShelves(g, 0, -2.3, 0, 1.4, 1.2, {});
R.spot(-1.6, -0.4, 1.4, "The fawn's bed of moss", "lay your head on his back", function () { setStatus("🦌 In the evening, when the sister is tired and has said her prayer, she lays her head on the roe's back: that is her pillow, and she sleeps softly on it. <i>(If only the brother had had his human form, it would have been a delightful life.)</i>"); });
},
function (R, g) {
gmmTable(g, 0, -3, 6, 1.2, 0x5A3A22, { cloth: 0xF4F0E8 });
R.solid(0, -3, 6.2, 1.4, 0.8);
gmmHearth(g, R, 8.4, 0, -Math.PI / 2, {});
R.person(2211, -2, -1.2, 0.2, { sex: "m", title: "king", look: { top: 0x2A4A2A, bottom: 0x2A2A2A, hat: "crown", hatColor: 0xE8C040, beard: 1, hair: 0x6A4A2A }, talk: gmmTalkOf("The king", "The young king of the Grimms' Little Brother and Little Sister (1857), who hunted the roe with the golden collar three days, found the beautiful sister in the little house, and married her. Now a pale woman lies in the queen's bed with the curtains drawn ('the queen must have rest') and he does not know the true queen was smothered in the bath. Grieving without knowing why, then watchful.", "She lies in the dark, they say she must not see the light. And at midnight... the nurse says something walks in the nursery.") });
R.person(2212, 3, -1.4, -0.2, { sex: "f", look: { topKind: "dress", top: 0x3A3A3A, layer: "apron", layerColor: 0x6A6A6A, hair: 0x4A4A4A, hairStyle: "bun" }, talk: gmmTalkOf("The old woman (the witch)", "The wicked stepmother and witch of the Grimms' Little Brother and Little Sister (1857). You bewitched the brooks; when the girl became queen you came disguised as a lady's maid, made a bath fiercely hot ('Come, the bath is ready'), and shut the doors till she stifled; you put your own one-eyed ugly daughter in her bed with the curtains closed. Sly, hateful, cunning.", "For your life leave the curtains closed; the queen ought not to see the light yet, and must have rest.") });
R.link(-8, -4.6, "bsnursery", "The door to the queen's chamber and the nursery", "go through");
},
function (R, g) {
gmmCradle(g, 0, -2, 0);
gmmBed(g, 3, -2.4, 0, { L: 2, W: 1.5, quilt: 0x5A3A6A });
gmmChair(g, -1.4, -1.4, 0.6);
gmmCandle(g, -1.6, 0.9, -2.6, true);
gmmTable(g, -1.6, -2.6, 0.6, 0.5, 0x6A4A2E, {});
var fawn = gmmBeast("deer", -3, 1, 0.4, 0.6, 2213, g);
var ghost = R.person(2214, 0.4, -0.6, Math.PI, { sex: "f", look: { topKind: "dress", top: 0xE8E8F4, hair: 0xE0C890, hairStyle: "long" } });
ghost.g.visible = false;
R.ghost = ghost;
R.spot(0, -0.8, 2, "The cradle, at midnight", "keep watch beside it", function () { gmmBSMidnight(R); });
},
function (R, g) {
gmmBed(g, 0, -2.4, 0, { L: 2.2, W: 1.6, quilt: 0x6A2A2A, canopy: 1 });
R.solid(0, -2.4, 2, 2.4, 1);
gmmChair(g, -1.8, -1.4, 0.6);
gmmTable(g, 2, -2.6, 0.7, 0.6, 0x6A4A2E, {});
gmmCandle(g, 2, 0.8, -2.6, true);
R.person(2221, 0, -2.6, 0, { sex: "m", title: "king", look: { top: 0xE8E0D0, hat: "crown", hatColor: 0xC8A040, beard: 1, hair: 0xE8E8E0 }, talk: gmmTalkOf("The sick king", "The old king of the Grimms' The Water of Life (1857), sick unto death. You did not want your sons to go: 'The danger of it is too great. I would rather die.' Later your elder sons swap the water for salt sea-water and you, deceived, order your youngest killed, and grieve: 'Would that he were still alive.' Weak, then fierce, then sorrowful.", "Water of life? The danger of it is too great. I would rather die.") });
R.spot(0, -0.8, 1.8, "The king's bedside", "ask to go and seek the Water of Life", function () { gmmWaterAsk(); });
},
function (R, g) {
for (var p = 0; p < 4; p++) {
var P = R.person(2231 + p, -6 + p * 4, -3, 0, { sex: "m", look: { top: [0x4A2A6A, 0x2A4A6A, 0x6A2A2A, 0x2A5A3A][p], bottom: 0x2A2A2A, hat: "crown", hatColor: 0xC8A040 } });
gmmChair(g, -6 + p * 4, -3.4, 0, 0x4A2A2A, 1.1);
}
gmmTable(g, 0, 0, 3, 1.2, 0x4A3A3A, {});
R.solid(0, 0, 3.2, 1.4, 0.8);
var sw = gmmB(1.2, 0.05, 0.12, null, 0xC8C8D0, -0.5, 0.82, 0, g);
sw.material = gmmShiny(0xD8D8E0, 140);
gmmB(0.4, 0.2, 0.3, null, 0xC89A5A, 0.6, 0.88, 0, g);
R.spot(0, 1.2, 1.6, "A sword and a loaf of bread", "take them, and a ring from each sleeper", function () { gmmWaterSword(R); });
R.person(2236, 6, -6, 0, { sex: "f", look: { topKind: "dress", top: 0xE8E0F8, hat: "tiara", hatColor: 0xE8C040, hair: 0xE8C870, hairStyle: "long" }, talk: gmmTalkOf("The enchanted princess", "The princess of the enchanted castle in the Grimms' The Water of Life (1857). The youngest prince's coming set you free: you kiss him, promise to marry him if he returns in a year, and tell him to hurry to the fountain before the clock strikes twelve. Later you lay a road of pure gold to your castle: only he who rides straight up the middle is the true one. Joyful, wise.", "You have set me free! Come back in a year, and the kingdom is yours. But hurry: the fountain, before twelve!") });
var fp = gmmG(0, 0, -8, g);
gmmC(1.6, 1.8, 0.7, "stone", 0x9A9090, 0, 0.35, 0, fp, 18);
var wv = gmmC(1.4, 1.4, 0.05, null, 0, 0, 0.68, 0, fp, 18);
wv.material = gmmShiny(0x9AD0F0, 140);
gmmC(0.18, 0.22, 1.6, "stone", 0x9A9090, 0, 1.2, 0, fp, 10);
R.solid(0, -8, 3.6, 3.6, 1);
R.spot(0, -6, 2, "The fountain of the Water of Life", "fill your cup", function () { gmmWaterFill(R); });
gmmClock(g, 10.6, -6, -Math.PI / 2);
},
function (R, g) {
gmmTable(g, 0, -2, 2.6, 1.2, 0x6A4A2E, {});
R.solid(0, -2, 2.8, 1.4, 0.8);
var gold = gmmS(0.32, 0, 0, 1.1, -2, g, 14);
gold.material = gmmShiny(0xF0C030, 140);
gold.scale.set(1, 0.8, 0.9);
gmmHearth(g, R, -4.4, 0, Math.PI / 2, { pot: 1 });
gmmShelves(g, 4.6, -1, -Math.PI / 2, 2.4, 2, {});
R.person(2241, 0, -3.4, 0, { sex: "m", look: { top: 0x4A3A2A, bottom: 0x3A2A1A, beard: 1, hair: 0x8A8A80 }, talk: gmmTalkOf("Hans's master", "Hans's master in the Grimms' Hans in Luck (1857). After seven years' faithful service you give Hans a piece of gold as big as his head: 'As the service was, so shall the reward be.' Fair, plain.", "You have served me faithfully and honestly; as the service was, so shall the reward be.") });
R.spot(0, -0.8, 1.6, "Your seven years' wages", "ask for them, and wrap them in your handkerchief", function () { gmmHansWages(R, gold); });
},
function (R, g) {
gmmHearth(g, R, 0, -3, 0, { pot: 1 });
gmmTable(g, 0, -0.6, 1.6, 0.9, 0x7A5A3A, {});
R.solid(0, -0.6, 1.8, 1.1, 0.8);
gmmChair(g, -0.9, -0.6, Math.PI / 2);
gmmWheel(g, 2.6, -1.8, 0.3);
R.person(2242, 1.2, -1.6, -0.6, { sex: "f", look: { topKind: "dress", top: 0x5A5A6A, layer: "apron", layerColor: 0xE8E0D0, hair: 0xC8C8C0, hairStyle: "bun" }, talk: gmmTalkOf("Hans's mother", "Hans's old mother in the Grimms' Hans in Luck (1857), waiting seven years for her son. He comes home with nothing, and happier than any man under the sun. Loving, a little amused.", "Hans! Seven years! And what have you brought home? ...Nothing at all? Well, you are home, and that's enough.") });
R.spot(0, 0.8, 1.6, "Your mother", "tell her the whole tale", function () { gmmHansHome(); });
},
function (R, g) {
gmmHearth(g, R, 0, -4, 0, { pot: 1 });
var pan = gmmC(0.5, 0.4, 0.3, null, 0x3A3A3A, 0.9, 1.0, -3.6, g, 14);
gmmTable(g, -2.6, 0, 2.6, 1.2, 0x6A4A2E, { cloth: 0xF0E8E0 });
R.solid(-2.6, 0, 2.8, 1.4, 0.8);
for (var c = 0; c < 3; c++)
gmmChair(g, -3.6 + c * 1, 0.9, Math.PI);
var dish = gmmC(0.35, 0.3, 0.08, null, 0xE8E0D0, -2.6, 0.82, 0, g, 14);
for (var b = 0; b < 6; b++) {
var bp = gmmC(0.04, 0.04, 0.3, null, 0x3A1A1A, -2.75 + b * 0.06, 0.88, 0.02, g, 6);
bp.rotation.z = Math.PI / 2;
}
var ch = gmmG(3.6, 0, -3, g);
gmmB(1.4, 0.8, 0.8, "wood", 0x5A2A1A, 0, 0.4, 0, ch);
gmmB(1.44, 0.1, 0.84, "wood", 0x4A2214, 0, 0.86, 0, ch);
gmmB(0.16, 0.2, 0.05, null, 0x2A2A2A, 0, 0.7, 0.42, ch);
for (var a = 0; a < 9; a++)
gmmS(0.08, 0xC81A1A, -0.5 + (a % 5) * 0.25, 0.82, -0.2 + ((a / 5) | 0) * 0.3, ch, 8);
R.solid(3.6, -3, 1.6, 1, 1);
R.spot(3.6, -1.8, 1.6, "The chest of apples, with the great heavy lid", "look into it", function () { gmmJunChest(); });
R.spot(-2.6, 1.4, 1.6, "Under the table: the bones", "gather them in your best silk handkerchief", function () { gmmJunBones(); });
R.person(2251, -3.2, -1.4, 0.6, { sex: "m", look: { top: 0x3A3A5A, bottom: 0x2A2A2A, beard: 1, hair: 0x5A4A3A }, talk: gmmTalkOf("The father", "The rich man of the Grimms' The Juniper-Tree (1857), whose first wife lies buried under the juniper-tree. Your second wife told you the boy had gone across the country to his mother's great-uncle; you ate the dinner she served, and it seemed as if it were all yours, and threw the bones under the table. Now you feel uneasy, then strangely light-hearted, and hear a beautiful bird. Unknowing, gentle.", "But where is my son? He did not even say good-bye to me.") });
R.person(2252, 1.6, -2.4, -0.4, { sex: "f", look: { topKind: "dress", top: 0x2A1A1A, layer: "apron", layerColor: 0x8A8A8A, hair: 0x1A1A1A, hairStyle: "bun" }, talk: gmmTalkOf("The stepmother", "The stepmother of the Grimms' The Juniper-Tree (1857). You hated your stepson, who stood between your daughter and the fortune; you slammed the apple-chest lid on him and his head flew off among the red apples, and you made him into black puddings for his father. Now you feel uneasy, as if a heavy storm were coming, your teeth chatter and you seem to have fire in your veins. Cold, guilty, terrified.", "I feel so uneasy, just as if a heavy storm were coming.") });
R.person(2253, -1.2, 1.4, Math.PI, { sex: "f", s: 0.75, look: { topKind: "dress", top: 0x8A6A8A, layer: "apron", layerColor: 0xF0E8E8, hair: 0x6A4A2A, hairStyle: "braids" }, talk: gmmTalkOf("Little Marlinchen", "Marlinchen, the little daughter in the Grimms' The Juniper-Tree (1857). You loved your brother; you gave him a box on the ear because he would not answer you, and his head fell off, and you wept and wept, and your tears fell into the pan so there was no need of salt. You gathered his bones in your best silk handkerchief and laid them under the juniper-tree. Grieving, then glad.", "Alas, mother, I have knocked my brother's head off! ...I took my best silk handkerchief for his bones.") });
},
function (R, g) {
gmmTable(g, 0, -2.6, 3, 0.9, 0x6A4A2E, {});
R.solid(0, -2.6, 3.2, 1.1, 0.8);
var ch = gmmAdd(new THREE.TorusGeometry(0.3, 0.02, 6, 24), gmmShiny(0xF0C030, 140), 0, 0.82, -2.6, g);
ch.rotation.x = Math.PI / 2;
var fu = gmmG(-3.4, 0, -2.8, g);
gmmB(1, 1, 1, "brick", 0x8A4A3A, 0, 0.5, 0, fu);
gmmB(0.3, 0.2, 0.02, null, 0, 0, 0.6, 0.51, fu).material = gmmGlowM(0xFF8A2A);
gmmShelves(g, 3.8, 0, -Math.PI / 2, 2.4, 2, {});
},
function (R, g) {
var st = gmmC(1.4, 1.4, 0.5, "stone", 0xA8A498, 0, 0.6, -2, g, 20);
gmmC(1.5, 1.5, 0.4, "wood", 0x6A4A2E, 0, 0.2, -2, g, 20);
R.solid(0, -2, 3.2, 3.2, 1.2);
for (var b = 0; b < 6; b++)
gmmB(0.6, 0.8, 0.4, null, 0xE8DCC0, -4.6 + b * 0.7, 0.4, 3.4, g);
var hp = gmmK(1.1, 1.2, "wood", 0x7A5A3A, 0, 1.6, -2, g, 4);
hp.rotation.x = Math.PI;
R.solid(0, -2, 1.2, 1.2, 2);
var gr = gmmC(1.6, 1.6, 0.25, "wood", 0x5A3A22, 4.6, 1.8, -2, g, 24);
gr.rotation.z = Math.PI / 2;
var sh = gmmC(0.15, 0.15, 4.5, "wood", 0x4A2E1A, 2.4, 1.8, -2, g, 8);
sh.rotation.z = Math.PI / 2;
R.solid(4.6, -2, 0.6, 3.4, 3.4);
gmmB(0.08, 1.6, 0.08, null, 0x4A2E1A, -4, 0.8, -3.6, g);
gmmB(1.2, 0.05, 0.05, null, 0x4A2E1A, -4, 1.6, -3.6, g);
gmmC(0.3, 0.2, 0.05, null, 0x8A7A4A, -4.5, 1.2, -3.6, g, 10);
gmmC(0.3, 0.2, 0.05, null, 0x8A7A4A, -3.5, 1.2, -3.6, g, 10);
var ld = gmmG(-5.4, 0, 0, g, 0);
for (var r = 0; r < 9; r++)
gmmB(0.6, 0.05, 0.06, null, 0x6A4A2E, 0, 0.3 + r * 0.42, 0, ld);
gmmB(0.06, 4, 0.06, null, 0x6A4A2E, -0.3, 2, 0, ld);
gmmB(0.06, 4, 0.06, null, 0x6A4A2E, 0.3, 2, 0, ld);
gmmTable(g, -2.6, 1.6, 1.6, 0.9, 0x6A4A2E, {});
gmmBench(g, -2.6, 2.4, 0, 1.6);
gmmBarrel(g, 4.6, 3.6);
gmmBarrel(g, 3.9, 3.7, 0.7);
var fl = gmmS(0.6, 0xF0E8DC, 0, 0.05, -0.4, g, 8);
fl.scale.set(1.4, 0.08, 1);
},
function (kind, say) {
var K = GMM_KEEP[kind], R = GMM.rules && GMM.rules[kind];
if (R && R.on === false) {
setStatus(say + " (The Keeper has paused rewards for this just now.)");
return;
}
gmmKeep(kind);
var d = gmmData();
d.done[kind] = (d.done[kind] || 0) + 1;
gmmSave();
var tail = K ? " <b>" + esc(K[2] + " " + K[1]) + "</b> is in your 🎒 Backpack." : "";
if (GMM.busy) {
setStatus(say + tail);
return;
}
GMM.busy = true;
var p = (typeof cityRpc === "function" && typeof signedIn === "function" && signedIn()) ? cityRpc("grimm_done", { p_kind: kind }) : Promise.resolve(null);
p.then(function (o) { GMM.busy = false; setStatus(say + tail + (o && o.gold ? " <b>+" + o.gold + " gold</b> from the Treasury." : "")); }).catch(function () { GMM.busy = false; setStatus(say + tail); });
},
function (title, sub, html, btns) {
var b = "", fns = {};
(btns || []).forEach(function (B, i) { var id = "gm" + i; b += worldBtn(id, B[0], B[1] || ""); fns[id] = function () { worldCard(null); if (B[2])
try {
B[2]();
}
catch (e) {
if (window.console)
console.warn("[grimm] card", e);
} }; });
worldCard(worldFacts(title, sub, [], []) + (html ? "<div style='margin:8px 0 10px;line-height:1.5'>" + html + "</div>" : "") + b, fns);
},
function (dt) {
var F = GMM.lift;
if (!F)
return;
F.t += dt;
var u = Math.min(1, F.t / F.dur), n = F.pts.length - 1, s = u * n, i = Math.min(n - 1, Math.floor(s)), f = s - i, a = F.pts[i], b = F.pts[i + 1];
var x = a[0] + (b[0] - a[0]) * f, y = a[1] + (b[1] - a[1]) * f, z = a[2] + (b[2] - a[2]) * f;
camera.position.set(GMM.base + x, y + 1.72, z);
if (F.face)
yaw = Math.atan2(-(b[0] - a[0]), -(b[2] - a[2]));
if (F.obj) {
F.obj.position.set(x, y + (F.objDy || 0), z);
F.obj.rotation.y = Math.atan2(b[0] - a[0], b[2] - a[2]);
}
if (u >= 1) {
GMM.lift = null;
if (F.done)
try {
F.done();
}
catch (e) {
if (window.console)
console.warn("[grimm] lift", e);
}
}
},
function (dt, L) {
if (!GMM.follow.length)
return;
var px = L.x, pz = L.z, feet = camera.position.y - 1.72;
GMM.follow.forEach(function (F, i) {
var p = F.g.position, dx = px - p.x, dz = pz - p.z, d = Math.hypot(dx, dz), want = F.gap;
if (d > 40) {
p.x = px - Math.sin(-yaw) * 2;
p.z = pz + Math.cos(yaw) * 2;
d = want;
}
if (d > want) {
var k = Math.min(1, (d - want) * dt * 2.4 / d);
p.x += dx * k;
p.z += dz * k;
F.g.rotation.y = Math.atan2(dx, dz);
}
p.y = gmmGround(p.x, p.z, feet + 0.5) + (F.dy || 0) + (d > want + 0.1 ? Math.abs(Math.sin(GMM.t * 9 + i)) * 0.06 : 0);
px = p.x;
pz = p.z;
});
},
function (dt, L) {
gmmLiftTick(dt);
gmmFollowTick(dt, L);
if (GMM.run && GMM.run.tick)
try {
GMM.run.tick(dt, L);
}
catch (e) {
if (window.console)
console.warn("[grimm] run", e);
GMM.run = null;
}
var E = GMM.ench;
if (E && E.patrol && !GMM.room) {
var p = E.g.position, T = E.patrol[E.pi], dx = T[0] - p.x, dz = T[1] - p.z, d = Math.hypot(dx, dz);
if (d < 0.5)
E.pi = (E.pi + 1) % E.patrol.length;
else {
var sp = (GMM.run && GMM.run.k === "rampion" ? 2.1 : 1.1) * dt;
p.x += dx / d * sp;
p.z += dz / d * sp;
p.y = gmmGround(p.x, p.z);
E.g.rotation.y = Math.atan2(dx, dz);
}
}
if (GMM.snow > 0) {
GMM.snow -= dt;
var S = gmmSnowNear();
if (S) {
S.visible = !GMM.room && GMM.snow > 0;
S.position.set(L.x, 0, L.z);
S.userData.f = ((S.userData.f || 0) + dt * 2.2) % 30;
S.position.y = camera.position.y + 12 - S.userData.f;
}
}
else if (GMM.snowNear)
GMM.snowNear.visible = false;
},
function () {
var A = GMM_AT.hansel, D = gmmDoorOf("woodcutter");
if (!D) {
setStatus("The woodcutter's cottage is to the south-east.");
return;
}
if (GMM.run)
gmmRunStop();
var g = new THREE.Group();
GMM.G.add(g);
var P = [], n = 14;
for (var i = 1; i <= n; i++) {
var u = i / (n + 1), x = A.x + (D.x - A.x) * u + Math.sin(i * 1.7) * 6, z = A.z + (D.z - A.z) * u + Math.cos(i * 1.3) * 6, y = gmmGround(x, z);
var pb = gmmS(0.22, 0xF8F8FF, x, y + 0.12, z, g, 10);
pb.material = gmmGlowM(0xF0F4FF);
pb.scale.y = 0.6;
var gl = wGlow(0xD8E8FF, 2.4, 0.6);
gl.position.set(x, y + 0.3, z);
g.add(gl);
P.push({ x: x, z: z, m: pb, gl: gl });
}
GMM.run = { k: "pebbles", g: g, P: P, i: 0, t: 0, tick: function (dt, L) {
var R = this;
R.t += dt;
R.P.forEach(function (p, j) { if (p.done)
return; p.gl.material.opacity = 0.45 + 0.25 * Math.sin(GMM.t * 3 + j); });
var p = R.P[R.i];
if (p && Math.hypot(L.x - p.x, L.z - p.z) < 3) {
p.done = 1;
p.m.visible = false;
p.gl.visible = false;
R.i++;
if (R.i < R.P.length)
setStatus("⚪ " + R.i + " of " + R.P.length + " pebbles: they shine like new silver coins in the moonlight. Follow them on.");
}
if (Math.hypot(L.x - D.x, L.z - D.z) < 6 && R.i >= R.P.length - 2) {
gmmRunStop();
gmmReward("pebbles", "🏡 <b>Home!</b> All night you followed the pebbles, and at daybreak you knock at your father's door. \"You naughty children, why did you sleep so long in the forest?\" says the stepmother. But your father is glad to the bottom of his heart.");
}
if (R.t > 600)
gmmRunStop("⚪ The moon has set. (Press E in the middle of the wood to start the pebble trail again.)");
} };
setStatus("🌙 <b>The moon is up.</b> Hansel takes Gretel's hand and follows the white pebbles, shining like new silver coins, all the way home. Walk from pebble to pebble (south-east, towards the woodcutter's cottage).");
},
function (R) {
if (R.won) {
setStatus("🔥 The oven is shut fast. Hansel is free. Fill your pockets from the chests, and go home.");
return;
}
gmmCard("🍬 The old woman", "Hansel and Gretel", "Early in the morning the old woman has lit the oven. <b>\"Creep in,\"</b> she says to Gretel, <b>\"and see if it is properly hot, so we can put the bread in.\"</b> (And once Gretel is in, she means to shut the door...) What do you do?", [
["\"Very well, I'll creep in\"", "do as you're told", function () { setStatus("🍬 You lean towards the oven... and Hansel calls from his cage: <b>\"Gretel, no! Be clever!\"</b> You step back just in time. (Try again.)"); }],
["\"I don't know how. How do I get in?\"", "be clever, as Gretel was", function () {
setStatus("🍬 <b>\"Silly goose,\"</b> says the old woman, <b>\"the door is big enough, I could get in myself!\"</b> and she hobbles up and pokes her head in. Gretel gives her a push that drives her far in, shuts the iron door and bolts it. Oh, then the witch begins to howl quite horribly; but Gretel runs away, and the godless witch is miserably burnt to death. Gretel runs to Hansel: <b>\"Hansel, we are free! The old witch is dead!\"</b>");
if (R.ovenDoor)
R.ovenDoor.visible = true;
if (R.witch)
R.witch.g.visible = false;
if (R.hansel) {
R.hansel.g.position.set(R.x + 2.6, 0, 0.6);
R.hansel.g.rotation.y = Math.PI;
}
R.won = 1;
setTimeout(function () { gmmReward("witch", "💎 Hansel springs out like a bird from its cage. They hug and dance about, and fill their pockets with the old woman's pearls and precious stones. <i>(When at last they find their way home, their father has not had one happy hour since he left them in the forest; and the woman is dead.)</i>"); }, 3500);
}]
]);
},
function (ds, dl) {
if (GMM.lift)
return;
var duck = GMM.duck;
if (!duck)
return;
gmmCard("🦆 The great water", "Hansel and Gretel", "\"We can't get over,\" says Hansel, \"there's no bridge.\" Gretel calls to the white duck: <b>\"Little duck, little duck, here stand Hansel and Gretel. No plank, no bridge: take us on your back so white.\"</b>", [
["Climb on the duck's back", "one at a time, as Gretel said, so as not to be too heavy for her", function () {
var y = -0.7;
gmmLift([[ds[0], y, ds[1]], [(ds[0] + dl[0]) / 2, y, (ds[1] + dl[1]) / 2 + 6], [dl[0], y, dl[1]]], 14, duck, function () {
gmmPut(dl[0] - 2, dl[1] - 2);
duck.position.set(dl[0] + 2, -0.75, dl[1] + 2);
setTimeout(function () { duck.position.set(ds[0] + 3, -0.75, ds[1] + 3); }, 20000);
gmmReward("duck", "🦆 The duck carries you safely across, and the wood grows more and more familiar, until at last you see your father's house.");
}, true);
GMM.lift.objDy = -1.0;
setStatus("🦆 The duck swims out across the great water, steady and white...");
}],
["Not now", "", null]
]);
},
function () {
var D = gmmDoorOf("granny"), W = GMM.wolf;
if (!D || !W)
return;
if (GMM.run)
gmmRunStop();
var S = { x: -424, z: 80 };
W.position.set(GMM.wolfHome.x, gmmGround(GMM.wolfHome.x, GMM.wolfHome.z), GMM.wolfHome.z);
GMM.run = { k: "redcap", t: 0, off: 0, wolfT: 105, tick: function (dt, L) {
var R = this;
R.t += dt;
var u = Math.min(1, R.t / R.wolfT), wx = GMM.wolfHome.x + (D.x - GMM.wolfHome.x) * u, wz = GMM.wolfHome.z + (D.z - GMM.wolfHome.z) * u;
W.position.set(wx, gmmGround(wx, wz), wz);
W.rotation.y = Math.atan2(D.x - GMM.wolfHome.x, D.z - GMM.wolfHome.z);
var off = gmmSegD(L.x, L.z, S.x, S.z, D.x, D.z) > (gmmRoadD(L.x, L.z) < 10 ? 60 : 28);
if (off) {
R.off += dt;
if (R.off > 6 && !R.warned) {
R.warned = 1;
setStatus("🌼 You're among the flowers, off the path... <b>\"Grandmother would like a nosegay,\"</b> you think. Meanwhile the wolf runs straight to Grandmother's house.");
R.wolfT = Math.max(R.t + 15, R.wolfT - 30);
}
}
else
R.off = Math.max(0, R.off - dt);
if (Math.hypot(L.x - D.x, L.z - D.z) < 5) {
gmmRunStop();
W.position.set(GMM.wolfHome.x, gmmGround(GMM.wolfHome.x, GMM.wolfHome.z), GMM.wolfHome.z);
gmmReward("redcap", "👵 <b>You got there first!</b> \"Grandmother, it's me, I've brought cake and wine.\" You keep to the path and shut the door fast, just as in the Grimms' second ending: when the wolf comes sniffing round the roof, you fill the great stone trough with the water the sausages were boiled in, and the wolf, leaning down to smell it, slides off the roof straight into the great trough, and is drowned.");
return;
}
if (u >= 1) {
gmmRunStop();
W.position.set(GMM.wolfHome.x, gmmGround(GMM.wolfHome.x, GMM.wolfHome.z), GMM.wolfHome.z);
setStatus("🐺 <b>The wolf got there first.</b> He went straight to Grandmother's bed and swallowed her up, put on her cap, lay down and drew the curtains; and when you came in (\"Oh Grandmother, what a terribly big mouth you have!\" \"The better to eat you with!\") he swallowed you too, and fell asleep, snoring. The <b>huntsman</b>, passing, thinks the old woman snores too loud, finds the wolf, and instead of shooting him takes a pair of scissors and cuts open his belly: out jump Little Red Cap and Grandmother, alive. They fill the wolf's belly with heavy stones, and when he wakes and tries to run, he falls down dead. <i>\"As long as I live, I will never leave the path by myself to run into the wood,\"</i> says Little Red Cap. (Press E at her basket to try again.)");
}
if (((R.t * 2) | 0) % 40 === 0 && R.t > 2 && !R.said) {
R.said = 1;
}
} };
setStatus("🧺 <b>Off to Grandmother's</b>, half an hour through the wood, west along the path to the three big oaks. <b>Keep to the path</b>: the wolf knows a short cut, and he is already running. Go!");
},
function () {
var Gd = GMM.garden, E = GMM.ench;
if (!Gd)
return;
if (GMM.run)
gmmRunStop();
var g = new THREE.Group();
GMM.G.add(g), P = [];
for (var i = 0; i < 6; i++) {
var x = Gd.x - Gd.w / 2 + 5 + ((i * 7) % 10) * 3.9, z = Gd.z - Gd.d / 2 + 5 + ((i * 2) % 6) * 4.5, y = gmmGround(x, z);
var gl = wGlow(0x9AFF7A, 2.2, 0.55);
gl.position.set(x, y + 0.6, z);
g.add(gl);
P.push({ x: x, z: z, gl: gl });
}
gmmVeil(0.4, function () { gmmPut(Gd.x, Gd.z + Gd.d / 2 - 3, 0); });
GMM.run = { k: "rampion", g: g, P: P, n: 0, t: 0, tick: function (dt, L) {
var R = this;
R.t += dt;
R.P.forEach(function (p) { if (!p.done && Math.hypot(L.x - p.x, L.z - p.z) < 2.2) {
p.done = 1;
p.gl.visible = false;
R.n++;
setStatus("🥬 " + R.n + " of 6 bunches of rampion. Quietly...");
} });
if (E && Math.hypot(L.x - E.g.position.x, L.z - E.g.position.z) < 5.5 && R.t > 2) {
gmmRunStop();
gmmVeil(0.4, function () { gmmPut(Gd.x, Gd.z + Gd.d / 2 + 5, Math.PI); });
setStatus("🧙 <b>\"How dare you climb into my garden and steal my rampion like a thief!\"</b> says the enchantress, with an angry look. <b>\"You shall suffer for it!\"</b> ...and you promise, as the husband did, to give her the child your wife will bear. She puts you out at the gate. (Try again: watch where she walks.)");
return;
}
if (R.n >= 6) {
gmmRunStop();
gmmVeil(0.4, function () { gmmPut(Gd.x, Gd.z + Gd.d / 2 + 5, Math.PI); });
gmmReward("rampion", "🥬 Over the wall again with six bunches of rampion. Your wife makes a salad of it at once, and eats it hungrily. It tastes so good that... well. <i>In the book, the next night the enchantress was waiting.</i>");
}
} };
setStatus("🌒 <b>Dusk.</b> You climb over the wall into the enchantress's garden. Gather <b>six bunches of rampion</b> (they shine a little in the dusk) and <b>don't let her come near you</b>: she walks round and round her beds.");
},
function () {
var T = GMM.tower, B = GMM.braid;
if (!T || GMM.lift)
return;
gmmCard("🗼 The tower with no door", "Rapunzel", "No door, no stair, only one little window at the very top. The enchantress stands below and calls...", [
["\"Rapunzel, Rapunzel, let down your hair!\"", "", function () {
if (B)
B.visible = true;
setStatus("💛 Down tumbles the golden hair, twenty ells of it, braided, from the window hook. You take hold, and climb...");
var x = T.x, z = T.z + 3.9;
gmmLift([[x, T.y, z], [x, T.y + 10, z], [x, T.y + 20.5, z]], 7, null, function () {
var d = gmmData();
gmmEnterRoom("towerroom", { x: T.x, z: T.z + 5.5, ry: 0, room: "towerroom", name: "Rapunzel's tower" });
if (!GMM.flags.rapToday) {
GMM.flags.rapToday = 1;
setTimeout(function () { gmmReward("rapunzel", "💛 Rapunzel is frightened at first: she has never seen anyone but the enchantress. But you talk so kindly that she isn't afraid any more."); }, 1200);
}
});
}],
["Climb up at dusk, as the king's son did", "the rest of the tale, as the book has it", function () { setStatus("✂️ One day Rapunzel lets slip, <b>\"Why is it, enchantress, that you are so much heavier for me to draw up than the young king's son?\"</b> In her anger the enchantress clutches Rapunzel's beautiful hair, wraps it twice round her left hand, seizes a pair of scissors, and <b>snip, snap</b>, the lovely braids lie on the ground. She sends Rapunzel away into a desert. That evening she fastens the cut braids to the hook, and when the king's son calls and climbs, he finds not Rapunzel but the enchantress, with wicked, venomous looks: <b>\"The cat has got the bird, and will scratch out your eyes as well!\"</b> In despair he leaps from the tower; he escapes with his life, but the thorns he falls into pierce his eyes. He wanders blind for years, eating roots and berries, until he hears a voice he knows: Rapunzel. Two of her tears wet his eyes, and he can see again."); }],
["Just listen to her singing", "", function () { setStatus("🎶 From the window comes a song so lovely you stand still to listen. Rapunzel passes her lonely time singing in her sweet voice."); }]
]);
},
function () {
var R = GMM_ROOMS.towerroom, T = GMM.tower;
if (!R || !T)
return;
gmmVeil(0.35, function () {
GMM.room = null;
gmmShowOnly(null);
camera.position.set(GMM.base + T.x, T.y + 20.5 + 1.72, T.z + 3.9);
yaw = 0;
gmmLift([[T.x, T.y + 20.5, T.z + 3.9], [T.x, T.y + 8, T.z + 3.9], [T.x, T.y, T.z + 5.5]], 5, null, function () { if (GMM.braid)
GMM.braid.visible = false; GMM.zone = gmmZoneAt(T.x, T.z + 5.5); setStatus("🗼 Down the golden braid again. Above, the hair is drawn up, and the window is empty."); });
});
},
function (R) {
var H = GMM.holle || (GMM.holle = {});
if (H.bread) {
setStatus("🍞 The bread is out, cooling on the grass, brown and good.");
return;
}
gmmCard("🍞 The oven", "Mother Holle", "The bread inside cries out: <b>\"Oh, take me out, take me out, or I shall burn: I've been baked a long time!\"</b>", [
["Take the loaves out with the bread shovel", "one after another", function () { H.bread = 1; (R.loaves || []).forEach(function (l) { l.visible = true; }); setStatus("🍞 You take out every loaf with the bread shovel, one after another, and lay them on the grass."); }],
["Walk on by", "\"Do you think I want to get myself dirty?\" (the lazy sister's answer)", function () { setStatus("🍞 You walk on. The bread goes on calling behind you."); }]
]);
},
function (R) {
var H = GMM.holle || (GMM.holle = {});
if (H.apples) {
setStatus("🍎 The apples lie in a heap, every one of them ripe.");
return;
}
gmmCard("🍎 The apple tree", "Mother Holle", "The tree calls: <b>\"Oh, shake me, shake me! My apples are all ripe!\"</b>", [
["Shake the tree", "till the apples fall like rain", function () { H.apples = 1; (R.apples || []).forEach(function (a) { a.visible = true; }); setStatus("🍎 You shake the tree until the apples fall like rain, and none are left on it, and you pile them up in a heap."); }],
["Walk on by", "\"One might fall on my head!\"", function () { setStatus("🍎 You walk on. The tree sighs."); }]
]);
},
function (R) {
var H = GMM.holle || (GMM.holle = {});
H.bed = (H.bed || 0) + 1;
GMM.snow = 120;
setStatus("❄️ You shake out Mother Holle's featherbed from the window so hard the feathers fly about like snowflakes... and it snows in the world above." + (H.bed >= 3 ? " <b>\"You've served me well,\"</b> says Mother Holle. <b>\"Now I will take you home myself.\"</b> She leads you to the great gate in the meadow." : " (Shake it again: Mother Holle likes it done well.)"));
},
function (R) {
var H = GMM.holle || {};
if (!(H.bread && H.apples && (H.bed || 0) >= 3)) {
setStatus("🚪 The gate stays shut. <i>Mother Holle only leads you home when you've done her work well: taken out the bread, shaken the apple tree, and shaken her bed till it snows.</i>");
return;
}
if (R.gold)
R.gold.visible = true;
setStatus("✨ The gate opens, and as you stand under it a great shower of gold falls, and all of it stays on you. <b>\"That is because you have been so hard-working,\"</b> says Mother Holle, and gives you back your shuttle too.");
setTimeout(function () { if (R.gold)
R.gold.visible = false; gmmOutside(R.door); setTimeout(function () { gmmReward("holle", "🐓 Back by the well. The rooster on the wall cries: <b>\"Cock-a-doodle-doo, your golden girl's come home!\"</b>"); }, 900); }, 3200);
},
function () {
gmmCard("⚱️ The glass coffin", "Snow White", "The dwarfs could not bear to put her in the black ground, so they made a coffin of glass and wrote her name on it in gold, and that she was a king's daughter. One of them always sat beside it. The owl came, and the raven, and last a dove, to mourn her. She lay there a long, long time, as if asleep, white as snow, red as blood, black as ebony.", [
["Wait, as the king's son came", "", function () { setStatus("🤴 A king's son rides through the wood, sees the coffin, and begs the dwarfs for it. As his servants carry it away they stumble over a bush, and the jolt shakes the piece of poisoned apple out of her throat. <b>\"Oh heavens, where am I?\"</b> says Snow White, and sits up, alive. <i>(Grimm, 1857: they were married with great splendour, and Snow White's wicked stepmother was invited to the feast. Iron slippers had already been put upon the fire; they were brought in with tongs and set before her, and she was forced to put on the red-hot shoes and dance until she dropped down dead.)</i>"); }],
["Leave a flower and go quietly", "", function () { setStatus("🌸 You leave a flower on the glass. The dwarf sitting watch nods his thanks."); }]
]);
},
function (R) {
gmmCard("🪞 The mirror on the wall", "Snow White", "The Queen steps in front of it. Do you ask, as she did?", [
["\"Mirror, mirror, on the wall, who in this land is fairest of all?\"", "", function () {
if (R.glass) {
R.glass.material = gmmShiny(0xE8F0FF, 200);
setTimeout(function () { R.glass.material = gmmShiny(0xB8C8D8, 160); }, 2500);
}
setTimeout(function () { gmmReward("mirror", "🪞 The glass clouds, and clears, and answers: <b>\"You, my queen, are fairest here, but Snow White, beyond the seven mountains, with the seven little dwarfs, is a thousand times fairer than you.\"</b> The Queen goes yellow and green with envy. <i>(In German: \"Spieglein, Spieglein an der Wand...\")</i>"); }, 600);
}],
["Back away from it", "", function () { setStatus("🪞 Some questions are better not asked."); }]
]);
},
function (R, what, i) {
R.ate = R.ate || {};
R.slept = R.slept || {};
if (what === "plate") {
if (R.ate[i]) {
setStatus("🍽️ You've had a little from this one already. (Don't take it all: only a bite from each, as Snow White did.)");
return;
}
R.ate[i] = 1;
var n = Object.keys(R.ate).length;
setStatus("🍽️ A little vegetable and bread from the " + ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"][i] + " little plate, and a drop of wine from its little cup. (" + n + " of 7: she didn't want to take all of anyone's.)");
}
else {
var says = ["too long", "too short", "too narrow", "too lumpy", "too short", "too long", "just right"];
R.slept[i] = 1;
if (i !== 6) {
setStatus("🛏️ The " + ["first", "second", "third", "fourth", "fifth", "sixth"][i] + " little bed is " + says[i] + ". Try another.");
return;
}
if (Object.keys(R.ate).length < 7) {
setStatus("🛏️ The seventh bed is just right... but you're still hungry. Have a little from every plate first.");
return;
}
}
if (Object.keys(R.ate).length >= 7 && R.slept[6] && !R.won) {
R.won = 1;
setTimeout(function () { gmmReward("dwarfs", "🕯️ Night falls, and the seven dwarfs come home from the mountain and light their seven little candles. <b>\"Who's been sitting on my little chair? Who's been eating off my little plate? Who's been drinking from my little cup?\"</b> And the seventh: <b>\"Someone is sleeping in MY bed!\"</b> But they are kind, and let you sleep, and the seventh dwarf sleeps an hour with each of his companions until the night is through."); }, 800);
}
},
function () {
if (GMM.flags.goose) {
setStatus("🪿 You already have the golden goose under your arm, and " + (GMM.follow.length - 1) + " stuck behind it. Take it to the town hall: the princess who never laughs is at the window.");
return;
}
gmmCard("🌳 The old tree", "The Golden Goose", "The little grey man says: <b>\"Give me a piece of your cake and a drink from your bottle: I'm so hungry and thirsty.\"</b> (Your cake is only made with water and baked in the ashes, and your drink is sour beer.)", [
["Share it gladly", "\"If you don't mind ash-cake and sour beer, let's sit down and eat.\"", function () {
var nest = GMM.gooseNest;
if (nest)
nest.visible = false;
var gz = gmmGoose(GMM.G, 0, 0, 0, true);
gz.userData.keep = 1;
GMM.follow = [];
gmmFollow(gz, 1.4);
GMM.follow[0].temp = 1;
var L = worldLocal();
gz.position.set(L.x, gmmGround(L.x, L.z), L.z + 2);
GMM.flags.goose = { n: 0 };
setStatus("🪿 When you take out your ash-cake it has become a fine sweet cake, and the sour beer good wine. <b>\"You have a good heart,\"</b> says the little man. <b>\"Cut down that old tree: you'll find something at the roots.\"</b> ...A goose with feathers of pure gold! You tuck it under your arm. <i>Go and stay the night at the inn (south-west of here).</i>");
}],
["Keep it for yourself", "as the clever elder brothers did", function () { setStatus("🌳 The little grey man goes away. When you swing the axe at the tree it slips and nicks your arm (not badly). That was the little grey man's doing."); }]
]);
},
function (R) {
var F = GMM.flags.goose;
if (!F || F.n > 0)
return;
F.n = 3;
gmmGoosePeople([901, 902, 903], [{ sex: "f", topKind: "dress", top: 0xC83A6A, layer: "apron", layerColor: 0xF0F0E8, hairStyle: "braids" }, { sex: "f", topKind: "dress", top: 0x3A8AC8, layer: "apron", layerColor: 0xF0F0E8, hairStyle: "bun" }, { sex: "f", topKind: "dress", top: 0xE8A030, layer: "apron", layerColor: 0xF0F0E8, hairStyle: "long" }]);
setTimeout(function () { setStatus("🪿 In the night the eldest daughter creeps up to pluck one golden feather, and her hand <b>sticks fast</b>. Her sister comes, touches her, and sticks; then the third. In the morning you set off with the goose under your arm and <b>three girls running behind</b>, wherever you go. <i>Walk into Kassel...</i>"); }, 900);
},
function () {
var F = GMM.flags.goose;
if (!F || F.n !== 3)
return;
F.n = 7;
gmmGoosePeople([904, 905, 906, 907], [{ sex: "m", topKind: "robe", top: 0x1A1A1A, bottom: 0x1A1A1A, hair: 0xD8D8D8 }, { sex: "m", top: 0x3A3A3A, bottom: 0x2A2A2A, hat: "cap", hatColor: 0x2A2A2A }, { sex: "m", top: 0x6A5A3A, bottom: 0x4A3A2A, hat: "brimmed", hatColor: 0x6A5A3A }, { sex: "m", top: 0x8A6A4A, bottom: 0x4A3A2A }]);
setStatus("⛪ <b>\"Shame on you, you good-for-nothing girls, running after a young man!\"</b> cries the <b>parson</b>, and grabs the youngest by the hand... and sticks. The <b>sexton</b> catches the parson's sleeve, and sticks. Two <b>farmhands</b> come with their hoes to pull the sexton free, and stick. <b>Seven</b> now, all trotting behind the goose! <i>Up to the town hall: the princess who never laughs is at the window.</i>");
},
function () {
var F = GMM.flags.goose;
if (!F) {
setStatus("👸 She looks out of the window, solemn as ever. <i>The king has promised her to whoever can make her laugh. Something very funny might do it: the old tree in the wood south-west of town has a secret at its roots.</i>");
return;
}
if (F.n < 7) {
setStatus("👸 A goose of gold, and only " + (GMM.follow.length - 1) + " stuck behind it? The princess almost smiles. <i>(More need to stick to it: stay at the inn, then walk through the town.)</i>");
return;
}
gmmFollowClear();
GMM.flags.goose = null;
if (GMM.gooseNest)
GMM.gooseNest.visible = true;
gmmReward("goose", "😂 The princess sees the procession, the goose, the three girls, the parson, the sexton and two farmhands all stuck together, trotting and stumbling, and she <b>bursts out laughing</b> and can't stop. Everyone in the hall comes unstuck and laughs too. <i>(The Grimms' Simpleton married her, and was king after.)</i>");
},
function () {
var H = GMM.hedge;
if (!H)
return;
if (H.open) {
setStatus("🌹 The hedge has turned to great flowers and parts before you, and closes again behind.");
return;
}
gmmCard("🌹 The hedge of thorns", "Briar Rose", "Many kings' sons have tried to get through the hedge: the thorns held fast as if they had hands, and the young men were caught in them, could not get loose again, and died a miserable death. But today is the day the hundred years are over.", [
["Push in", "", function () {
H.open = true;
H.parts.forEach(function (p) { p.visible = false; });
if (H.wall)
H.wall.off = true;
setStatus("🌹 As you come near, the hedge is nothing but great beautiful flowers, which part of themselves and let you pass unharmed, and close again behind you. In the courtyard the horses and the spotted hounds lie asleep; on the roof the pigeons sit with their heads under their wings. <i>Go into the castle.</i>");
}],
["Turn back", "", null]
]);
},
function (R) {
var awake = !!GMM.flags.briarAwake;
(R.sleepers || []).forEach(function (P) { P.g.rotation.x = awake ? 0 : 0.35; });
(R.flies || []).forEach(function (f) { f.visible = !awake; });
var K = GMM_ROOMS.briarkitchen;
if (K && K.fl)
K.fl.scale.y = awake ? 1.4 : 0.6;
if (!awake)
setTimeout(function () { if (GMM.room === R)
setStatus("💤 Everything is so still you can hear your own breath. The king and queen have fallen asleep on their thrones, and the whole court with them. <i>The old tower is at the far end: Briar Rose is asleep up there.</i>"); }, 1800);
},
function (R) {
if (GMM.flags.briarAwake) {
setStatus("🌹 Briar Rose is awake, and the whole castle with her, the cook boxing the kitchen boy's ears and the flies crawling on along the wall.");
return;
}
gmmCard("🌹 The little room in the tower", "Briar Rose", "There she lies, so beautiful you can't turn your eyes away, asleep for a hundred years since the day she touched the spindle.", [
["Bend down and wake her", "as the king's son did", function () {
GMM.flags.briarAwake = 1;
if (R.rose) {
R.rose.g.rotation.set(0, 0, 0);
R.rose.g.position.set(R.x - 1.8, 0, -0.4);
}
gmmReward("briar", "🌹 Briar Rose opens her eyes, wakes, and looks at you kindly. Down the stair the whole castle wakes: the king and queen and the court, the horses in the yard shake themselves, the hounds jump up wagging, the pigeons fly off to the fields, the flies crawl on along the walls, the fire in the kitchen flares and the meat begins to cook, and the cook gives the kitchen boy such a box on the ear that he howls. <i>(Then the wedding, and they lived happily to the end of their days.)</i>");
}],
["Let her sleep", "", null]
]);
},
function (R) {
var f = GMM.flags;
f.lent = f.lent || 0;
if (f.lent >= 2) {
setStatus("🫘 The lentils are picked, twice over. <b>\"It's no use,\"</b> says the stepmother, <b>\"you have no clothes and you can't dance. We'd be ashamed of you.\"</b> She turns her back and drives off with her two proud daughters. <i>Go to the hazel tree on your mother's grave (west of the house).</i>");
return;
}
var two = f.lent === 1;
gmmCard("🫘 The lentils in the ashes", "Aschenputtel", two ? "<b>\"If you can pick TWO dishes of lentils out of the ashes in ONE hour, you shall come with us.\"</b> (She thinks you never can.)" : "The stepmother tips a dish of lentils into the ashes. <b>\"If you've picked them out again in two hours, you may come to the ball.\"</b>", [
["Call the birds", "\"You tame pigeons, you turtle-doves, and all you birds under heaven, come and help me pick: the good into the pot, the bad into your crop!\"", function () {
var birds = [];
for (var i = 0; i < (GMM.lite ? 6 : 14); i++) {
var b = gmmDove(R.D, R.x - 1.6 + (i % 7) * 0.5, 0.12, -2.6 + ((i / 7) | 0) * 0.6);
birds.push(b);
}
setStatus("🕊️ Two white pigeons fly in at the kitchen window, then the turtle-doves, and then all the birds under heaven come whirring and swarming in, and settle round the ashes. <b>Pick, pick, pick, pick</b>: they nod their little heads and gather all the good grains into the dishes." + (two ? " Before half an hour is over, they're finished." : " Hardly an hour has passed before they're done."));
setTimeout(function () {
birds.forEach(function (b) { if (b.parent)
b.parent.remove(b); });
f.lent++;
if (f.lent >= 2)
gmmReward("lentils", "🫘 Two dishes, picked clean, before the hour is half over. But the stepmother says: <b>\"It's no use. You have no clothes and you can't dance.\"</b> And off they go to the ball without you. <i>Go to your mother's grave and the hazel tree (west of the house).</i>");
else
setStatus("🫘 Done! But the stepmother only says, <b>\"No, Aschenputtel, you have no clothes.\"</b> ...then she tips in TWO dishes. Press E at the ashes again.");
}, 4200);
}],
["Cry", "", function () { setStatus("😢 You cry. The ashes are cold. (Isn't there someone who would help?)"); }]
]);
},
function () {
var f = GMM.flags;
f.nights = f.nights || 0;
if (f.nights >= 3) {
setStatus("🌳 The hazel tree has grown tall on your mother's grave. A little white bird sits in it still.");
return;
}
if (f.dress) {
setStatus("👗 You're dressed for the ball already: go to the king's palace (east across the green).");
return;
}
if ((f.lent || 0) < 2 && f.nights === 0) {
setStatus("🌳 You planted the hazel twig here and watered it with your tears, and it grew into a fine tree. Three times a day you come and weep and pray under it. <i>(First, the lentils: the stepmother is waiting in the kitchen.)</i>");
return;
}
gmmCard("🌳 The hazel tree", "Aschenputtel", "Under the tree on your mother's grave, you say:", [
["\"Shiver and quiver, little tree, silver and gold throw down over me!\"", "", function () {
f.dress = 1;
setStatus("🕊️ The bird throws down " + ["a dress of gold and silver, and slippers stitched with silk and silver", "a dress even more splendid than the first", "a dress more splendid and dazzling than anyone has ever had, and slippers of pure gold"][f.nights] + ". <b>Night " + (f.nights + 1) + " of 3.</b> <i>Go to the king's palace, east across the green, up the great stair to the ballroom.</i>");
}]
]);
},
function (R) {
var f = GMM.flags;
f.nights = f.nights || 0;
if (!f.dress) {
setStatus(f.nights >= 3 ? "🤴 The king's son is out searching every house with a golden slipper." : "🤴 The king's son looks past you, over every head: <b>he is waiting for someone.</b> <i>(Aschenputtel's dress comes from the hazel tree on her mother's grave, west of her father's house.)</i>");
return;
}
var n = f.nights + 1;
gmmCard("💃 Night " + n + " of the feast", "Aschenputtel", "The king's son comes to meet you, takes your hand and dances with you, and with no one else. When anyone else asks: <b>\"She is my partner.\"</b> He doesn't know you; your stepsisters think you must be a foreign princess.", [
["Dance till evening, then slip away", "", function () {
f.dress = 0;
if (n < 3) {
f.hideNeed = n === 1 ? "dove" : "pear";
setStatus("🏃 In the evening you want to go home. He wants to see where you live, but you slip away from him and run home... <b>Hide " + (n === 1 ? "in the dovecote" : "up the pear tree") + " in the garden behind your father's house!</b>");
}
else {
f.nights = 3;
if (GMM.pitch)
GMM.pitch.visible = true;
gmmReward("slipper", "👠 On the third night the king's son has had the whole stair smeared with pitch, and as you run, your <b>left slipper of pure gold</b> sticks fast. Next day he goes to your father's house: \"No one shall be my wife but she whose foot this golden slipper fits.\" The elder stepsister can't get her big toe in, so her mother hands her a knife: <b>\"Cut the toe off; when you are queen you will have no more need to go on foot.\"</b> She does, and rides off with the king's son, but the doves on the hazel tree cry <i>\"Turn and peep, turn and peep, there's blood within the shoe; the shoe it is too small for her, the true bride waits for you.\"</i> The younger cuts off a bit of her heel, and the doves give her away too. Then you wash your face and hands, step out of your wooden shoe and into the slipper: it fits as if it were made for you. <b>\"That's the true bride!\"</b> <i>(At the wedding the two false sisters walk beside the bride to church, hoping for a share of her good fortune, and the pigeons peck out one eye from each; coming out, the other eye. And so for their wickedness and falsehood they are punished with blindness as long as they live.)</i>");
setTimeout(function () { if (GMM.pitch)
GMM.pitch.visible = false; f.nights = 0; f.lent = 0; }, 120000);
}
}]
]);
},
function (kind) {
var f = GMM.flags;
if (f.hideNeed !== kind) {
setStatus(kind === "dove" ? "🕊️ The dovecote, full of cooing doves." : "🍐 The pear tree, heavy with lovely pears.");
return;
}
f.hideNeed = null;
f.nights = (f.nights || 0) + 1;
setStatus(kind === "dove" ? "🕊️ You leap into the dovecote. The king's son waits, and tells your father the stranger hid in there. <b>\"Can it be Aschenputtel?\"</b> thinks the old man, and has them bring an axe and break it open: but nobody is inside. You jumped out the back, and are sitting in the ashes in your grey smock. <b>Night 1 done.</b> (Back to the hazel tree for night 2.)" : "🍐 Up into the pear tree, among the lovely pears, as nimble as a squirrel. Your father fetches the axe and cuts it down: nobody in it. You've slipped down the other side, given the dress back to the bird on the hazel, and you're in the ashes again. <b>Night 2 done.</b> (Back to the hazel tree for the third night.)");
},
function () {
var f = GMM.flags, B = GMM.goldball, F = GMM.frogOnWell;
if (!B)
return;
if (f.frog === 1 || f.frog === 2) {
setStatus("🐸 You promised! The frog is coming up to the castle: plitsch, platsch, up the marble stair.");
return;
}
var x0 = B.position.x, y0 = B.position.y, z0 = B.position.z, t = 0;
GMM.run = { k: "ball", tick: function (dt) {
t += dt;
B.position.y = y0 + Math.max(0, Math.sin(Math.min(t, 1.2) / 1.2 * Math.PI)) * 3.2;
if (t > 1.2 && t < 2.2) {
B.position.x = x0 + (t - 1.2) * 1.2;
B.position.y = y0 + 1.6 - (t - 1.2) * 2.6;
}
if (t >= 2.2) {
GMM.run = null;
B.visible = false;
B.position.set(x0, y0, z0);
gmmCard("🐸 Into the well", "The Frog King", "The golden ball misses your hand, falls to the ground, and rolls straight into the well, so deep you can't see the bottom. You begin to cry... and a voice says: <b>\"What's the matter, king's daughter? You weep so that a stone would pity you.\"</b> It's a frog, stretching his thick ugly head out of the water. <b>\"I'll fetch your ball, if you will love me and let me be your companion, sit by you at table, eat from your little golden plate, drink from your little cup and sleep in your little bed.\"</b>", [
["\"Oh yes, I promise you all you want\"", "(thinking: what nonsense, a frog!)", function () { f.frog = 1; B.visible = true; if (F)
F.visible = false; setStatus("🟡 The frog dives down and comes up with the ball in his mouth. You snatch it up and run off home. <b>\"Wait, wait, take me with you!\"</b> But you don't listen. <i>Go into the king's castle for supper: someone will be knocking at the door.</i>"); }],
["\"No, thank you\"", "", function () { B.visible = true; setStatus("🐸 \"As you like,\" says the frog, and sinks out of sight. (The ball bobs up on its own, after all: this is only a game.)"); }]
]);
}
} };
},
function (R) {
var f = GMM.flags;
if (f.frog !== 1) {
setStatus(f.frog >= 2 ? "🍽️ Supper is over. (The frog went up to the princess's chamber.)" : "🍽️ The little golden plate. <i>(The frog's bargain begins at the well under the old lime tree, by the forest's edge.)</i>");
return;
}
if (R.frogAt)
R.frogAt.visible = true;
gmmCard("🐸 Knock, knock: plitsch, platsch", "The Frog King", "\"King's daughter, youngest, open the door for me! Don't you know what you said to me yesterday by the cool water of the well?\" The king: <b>\"What you have promised, you must keep. Go and let him in.\"</b> The frog hops in and says: <b>\"Lift me up beside you... push your little golden plate nearer, so we can eat together.\"</b>", [
["Push the little plate nearer", "", function () { f.frog = 2; setStatus("🐸 The frog enjoys his supper; every bite sticks in your throat. <b>\"I've eaten and I'm full,\"</b> he says. <b>\"Now I'm tired: carry me up to your little room.\"</b> <i>Go up the stair to the princess's chamber.</i>"); }]
]);
},
function (R) {
var f = GMM.flags;
if (f.frog !== 2) {
setStatus(f.frog >= 3 ? "🤴 The king's son with beautiful kind eyes smiles at you." : "🛏️ The princess's little bed, with its silken covers.");
return;
}
gmmCard("🐸 \"Lift me up, or I'll tell your father\"", "The Frog King", "You're so cross. In the Grimms' book the princess does NOT kiss him...", [
["Throw him at the wall, with all your might", "\"Now you'll have your rest, you nasty frog!\"", function () {
f.frog = 3;
if (R.frog)
R.frog.visible = false;
if (!R.prince)
R.prince = R.person(990, 1.2, -0.6, Math.PI, { sex: "m", look: { top: 0x2A6A4A, bottom: 0xE8E0D0, back: "cape", backColor: 0x1A3A2A, hat: "crown", hatColor: 0xD8B040, hair: 0x6A4A2A } });
else
R.prince.g.visible = true;
gmmReward("frog", "🤴 When he falls he is no frog, but a <b>king's son with beautiful kind eyes</b>. A wicked witch had bewitched him, and no one but you could free him from the well. Next morning a coach with eight white horses comes for him, with <b>Faithful Henry</b> on the back, who had three iron bands put round his heart for grief. On the road: <b>crack, crack, crack</b>, the three bands spring off his heart, because his master is free and happy.");
setTimeout(function () { f.frog = 0; if (R.frog)
R.frog.visible = true; if (R.prince)
R.prince.g.visible = false; if (GMM.frogOnWell)
GMM.frogOnWell.visible = true; }, 90000);
}]
]);
},
function () {
GMM.flags.cloak = 1;
GMM.flags.proof = {};
setStatus("🧥 An old woman gave the soldier this advice, and now he passes it on: <b>\"Don't drink the wine the princess brings you at night, and pretend to be fast asleep. Put on this little cloak, and you'll be invisible, and can follow them.\"</b> <i>You have the cloak. Go into the palace, through the king's hall to the princesses' bedchamber.</i>");
},
function (R) {
if (!GMM.flags.cloak) {
setStatus("👠 The eldest princess looks at you sharply: <b>\"Haven't you drunk your wine? Go to sleep.\"</b> <i>(They'd see you follow. The old soldier in the palace gardens has a cloak that makes its wearer unseen.)</i>");
return;
}
var U = GMM_ROOMS.under;
U.back = "princessbed";
U.backAt = { x: -11, z: -1 };
setStatus("🧥 You pull the cloak round you. The eldest knocks on her bed; it sinks into the floor; they go down one after another. You follow the youngest, and tread on the hem of her dress. <b>\"Something has hold of my dress!\"</b> <b>\"Don't be silly, you caught it on a nail.\"</b>");
setTimeout(function () { gmmEnterRoom("under", null); }, 900);
},
function (R, k) {
var P = GMM.flags.proof || (GMM.flags.proof = {});
if (!GMM.flags.cloak) {
setStatus("✨ Leaves of " + k + ". Beautiful.");
return;
}
if (P[k]) {
setStatus("✨ You already have " + (k === "goblet" ? "the goblet" : "a twig of " + k) + ".");
return;
}
P[k] = 1;
var n = Object.keys(P).length;
setStatus((k === "goblet" ? "🏆 You slip a golden goblet under the cloak." : "✨ <b>Crack!</b> You break off a twig of " + k + ". The youngest princess starts: <b>\"Something's wrong, did you hear that?\"</b> \"It's only our princes cheering,\" says the eldest.") + " (" + n + " of 4 proofs: twigs of silver, gold and diamond, and a goblet from the castle beyond the lake.)");
},
function (R) {
if (!GMM.flags.cloak) {
setStatus("🛶 Twelve little boats, and twelve princes waiting in them.");
return;
}
var C = GMM_ROOMS.lakecastle;
C.back = "under";
C.backAt = { x: 0, z: -22 };
setStatus("🛶 You step into the youngest princess's boat. <b>\"The boat is so heavy tonight,\"</b> says her prince, <b>\"I'm rowing as hard as I can.\"</b> Across the lake to the castle full of light, with trumpets and drums...");
setTimeout(function () { gmmEnterRoom("lakecastle", null); }, 1200);
},
function () {
var P = GMM.flags.proof || {}, n = Object.keys(P).length;
if (n < 4) {
setStatus("🤴 <b>\"Where do my twelve daughters dance their shoes to pieces every night?\"</b> asks the king. " + (n ? "You have " + n + " of 4 proofs. He'll want all four: twigs of silver, gold and diamond, and the goblet." : "<i>(Follow them: the old soldier in the gardens lends you his cloak.)</i>"));
return;
}
GMM.flags.proof = {};
GMM.flags.cloak = 0;
gmmReward("dance", "🤴 You lay the three twigs and the goblet before the king. <b>\"In a castle under the ground, with twelve princes,\"</b> you say, and tell him everything. The princesses see it is no use denying it, and own up. <i>(In the book the old soldier chooses the eldest, \"for I am no longer young\", and is king after.)</i>");
},
function (R, n) {
var f = GMM.flags;
f.spun = f.spun || 0;
if (f.spun >= n) {
setStatus("🧵 The spools glitter: gold, all of it. The king is pleased... and greedy.");
return;
}
if (n > f.spun + 1) {
setStatus("🧵 Straw, straw, straw. <i>(It starts in the first, smallest chamber.)</i>");
return;
}
var price = ["your necklace", "your ring", "your first child, when you are queen"][n - 1];
if (!R.lm)
R.lm = R.person(980 + n, 1.4, 1.2, -Math.PI / 2, { sex: "m", s: 0.55, look: { top: 0x8A3A1A, bottom: 0x3A5A2A, hat: "pixie", hatColor: 0x8A1A1A, beard: 1, hair: 0x8A6A3A }, talk: { name: "The little man", persona: "The little man of the Grimms' Rumpelstiltskin (1812-1857), who spins straw into gold for the miller's daughter for her necklace, her ring, and at last the promise of her first child. You will never, ever say your name. Sly, quick, a little mocking. Never mention films.", greet: "Good evening, miller's girl. Why are you crying so?" } });
else
R.lm.g.visible = true;
gmmCard("🧵 \"Why are you crying so?\"", "Rumpelstiltskin", "The door opens and in comes a little man. <b>\"What will you give me if I spin it for you?\"</b>", [
["Give him " + price, "", function () {
setStatus("🎡 He sits down at the wheel: <b>whirr, whirr, whirr</b>, three turns and the reel is full; then another, and another, all night, until all the straw is spun and every reel is full of gold.");
var t = 0, H = R.heaps || [], G = R.gold || [];
GMM.run = { k: "spin", tick: function (dt) {
t += dt;
var k = Math.min(1, t / 5);
H.forEach(function (h, i) { h.visible = i / H.length >= k; });
G.forEach(function (s, i) { s.visible = i / G.length < k; });
if (t >= 5) {
GMM.run = null;
f.spun = n;
if (R.lm)
R.lm.g.visible = false;
if (n < 3)
setStatus("👑 At sunrise the king comes, sees the gold, and is glad... and greedier still. He leads you to a <b>bigger room full of straw</b>. <i>(Through the door.)</i>");
else
gmmReward("spin", "👑 <b>\"Spin this tonight too, and you shall be my wife.\"</b> And you are. A year later, a beautiful child... and the little man comes: <b>\"Now give me what you promised.\"</b> You weep so that he takes pity: <b>\"I'll give you three days. If by then you know my name, you may keep your child.\"</b> <i>(The cradle is in this room. To find out his name, listen near the fire on the mountain, south of the castle.)</i>");
}
} };
}],
["Cry some more", "", function () { if (R.lm)
R.lm.g.visible = false; setStatus("😢 The little man shrugs and goes. The straw stays straw."); }]
]);
},
function () {
GMM.flags.heard = 1;
setStatus("🔥 You creep behind a tree. Before a little house a fire is burning, and round it jumps a comical little man, hopping on one leg and singing:<br><b>\"Today I bake, tomorrow brew,<br>The next I'll have the young queen's child.<br>Ha! glad am I that no one knew<br>That Rumpelstiltskin I am styled.\"</b><br><i>(In German: \"...dass niemand weiß, dass ich Rumpelstilzchen heiß!\")</i>");
},
function () {
var f = GMM.flags;
if ((f.spun || 0) < 3) {
setStatus("👶 An empty cradle. <i>(This is the end of the tale: first the straw must be spun.)</i>");
return;
}
f.day = f.day || 0;
var days = [["Kaspar", "Melchior", "Balzer"], ["Ribs-of-Beef", "Muttonchops", "Lace-Leg"], ["Kunz", "Heinz"]];
var opts = days[f.day].map(function (nm) { return [nm, "", function () { setStatus("🧌 <b>\"That's not my name!\"</b> says the little man." + (f.day < 2 ? " <i>(He'll be back tomorrow. Press E at the cradle for day " + (f.day + 2) + ".)</i>" : "")); if (f.day < 2)
f.day++; }]; });
if (f.day === 2) {
opts.push(["\"Is your name perhaps... Rumpelstiltskin?\"", f.heard ? "" : "(how would you know?)", function () {
if (!f.heard) {
setStatus("🧌 You never heard that name, so you can't really say it... <i>(Listen near the fire on the mountain, south of the castle.)</i>");
return;
}
f.day = 0;
gmmReward("name", "🧌 <b>\"The devil told you that! The devil told you that!\"</b> shrieks the little man, and in his rage stamps his right foot so deep into the earth that his whole leg goes in; then in his rage he pulls at his left leg so hard with both hands that he tears himself in two. Your child is yours.");
}]);
}
gmmCard("👶 Day " + (f.day + 1) + " of 3", "Rumpelstiltskin", "The little man comes in: <b>\"Well, Lady Queen, what is my name?\"</b>", opts);
},
function (i) {
var f = GMM.flags;
f.band = f.band || 0;
var B = GMM_BREMEN[i];
if (f.bremenDone) {
setStatus("🏠 The four of them live in the robbers' house now, and like it so much they never went on to Bremen at all.");
return;
}
if (i < f.band) {
setStatus("🎶 " + B.n.replace(/^An? /, "The ") + " trots along behind you.");
return;
}
if (i > f.band) {
setStatus("🐾 " + esc(B.n) + " looks at you sadly. <i>(The tale begins with the old donkey, further back along the road towards Kassel.)</i>");
return;
}
gmmCard(["🫏", "🐕", "🐈", "🐓"][i] + " " + B.n, "The Bremen Town Musicians", "<b>\"" + esc(B.say) + "\"</b>", [
[i === 0 ? "\"Let's go to Bremen together!\"" : "\"Come with us to Bremen: something better than death you'll find anywhere!\"", "", function () {
f.band = i + 1;
var m = B.m;
if (m) {
gmmFollow(m, i === 0 ? 3 : 1.6);
if (i === 3)
GMM.follow[GMM.follow.length - 1].dy = 0;
}
setStatus("🎶 " + B.join + (f.band < 4 ? " <i>(Follow the road on: there's another one further along.)</i>" : " <b>All four!</b> Night falls in the forest, and from the top of a tree the rooster sees a light: a house. <i>The robbers' house is just ahead, east of the road.</i>"));
}]
]);
},
function () {
var f = GMM.flags;
if (f.bremenDone) {
setStatus("🏠 The window of the house that is the musicians' now. A candle burns; the cat is asleep on the hearth.");
return;
}
if ((f.band || 0) < 4) {
setStatus("🪟 Inside, robbers sit at a table loaded with food and drink, laughing. <i>Four friends together might frighten them off: the donkey, the dog, the cat and the rooster are all along the road from Kassel.</i>");
return;
}
gmmCard("🪟 The robbers' window", "The Bremen Town Musicians", "The donkey puts his front feet on the window sill, the dog jumps on his back, the cat climbs on the dog, and the rooster flies up and perches on the cat's head. Then, all at once...", [
["Make music!", "", function () {
var S = GMM.bremenStack;
GMM.follow.forEach(function (F) { F.g.visible = false; });
GMM.follow = [];
if (S)
S.visible = true;
(GMM.robbers || []).forEach(function (P) { P.g.visible = true; });
setTimeout(function () { (GMM.robbers || []).forEach(function (P) { P.g.visible = false; }); }, 3000);
f.bremenDone = 1;
gmmReward("bremen", "🎶 <b>HEE-HAW! WOOF WOOF! MIAOW! COCK-A-DOODLE-DOO!</b> They burst in through the window, glass clattering. The robbers jump up, sure a ghost has come, and run off into the forest in terror. The four friends sit down at the table and eat as if they'd go hungry for four weeks. <i>(Later a robber creeps back, and the cat scratches him, the dog bites his leg, the donkey kicks him and the rooster cries from the beam, and he tells his captain a horrible witch, a man with a knife, a black monster with a club and a judge on the roof are in there. The robbers never dare go back.)</i>");
}]
]);
},
function () {
setStatus(GMM.flags.bremenDone ? "🍗 You eat with the four friends, roast and bread and good things, as if you'd go hungry for four weeks. The donkey lies down in the yard, the dog behind the door, the cat on the hearth by the warm ashes, the rooster up on the roof beam." : "🍗 The robbers' feast: roast meat, bread, wine, candles burning. <i>They might be back any moment.</i>");
},
function (R, i, where) {
R.found = R.found || {};
if (R.found[i]) {
setStatus("🐐 Already found that one!");
return;
}
R.found[i] = 1;
var k = R.kids && R.kids[i];
if (k)
k.visible = true;
var n = Object.keys(R.found).length;
if (n < 7) {
setStatus("🐐 <b>Found one!</b> A little goat " + esc(where) + (i === 6 ? ": the youngest, in the clock case, the one the wolf never found!" : "") + " (" + n + " of 7)");
return;
}
gmmReward("kids", "🐐🐐🐐🐐🐐🐐🐐 <b>All seven!</b> The mother goat hugs every one of them. <i>(In the Grimms' tale the wolf swallowed the other six, and only the youngest in the clock case was left. Their mother found the wolf asleep under a tree, cut open his belly with scissors, and out jumped all six, alive; they filled his belly with stones, and when he went to the well to drink, the stones pulled him in and he drowned. Then the kids came running and danced round the well with their mother: \"The wolf is dead! The wolf is dead!\")</i>");
setTimeout(function () { if (GMM.room === R) {
R.found = {};
(R.kids || []).forEach(function (k) { k.visible = false; });
} }, 60000);
},
function () {
var F = GMM.fish;
if (!F)
return;
if (F.st >= 6) {
F.st = 0;
gmmFishStage();
setStatus("🌊 The sea is calm and clear again. The flounder doesn't come, and the fisherman sits mending his nets by the hovel, quite content. (Call again to begin the tale anew.)");
return;
}
var next = GMM_FISH[F.st + 1];
gmmCard("🐟 By the sea", "The Fisherman and his Wife", (F.st === 0 ? "Your wife Ilsebill says you should have asked the enchanted flounder for something when you let him go. " : "") + next.ask + " You go down to the water and call:", [
["\"Flounder, flounder in the sea, come, I pray you, here to me...\"", "\"...for my wife, good Ilsebill, wills not as I'd have her will.\"", function () {
var A = GMM_AT.fisher, sx = A.x, sz = gmmShore(A.x) + 3;
var fl = gmmFlounder(GMM.G, sx, -0.6, sz);
fl.userData.keep = 1;
setTimeout(function () { if (fl.parent)
fl.parent.remove(fl); }, 6000);
F.st++;
gmmFishStage();
if (F.st < 6)
setStatus("🐟 The flounder comes swimming up: <b>\"Well, what does she want?\"</b> ... " + next.say + " <i>(Go and look at the house. Then, if she sends you back again, call again.)</i>");
else
gmmReward("flounder", "🌩️ " + next.say + " <i>(Grimm 19: be content with what you have. The tale is told in the old Low German of Pomerania, as the painter Runge wrote it down.)</i>");
}]
]);
},
function (R) {
var st = GMM.fish ? GMM.fish.st : 0, S = st === 6 ? 0 : st;
if (R.stage === S) {
R.say = gmmFishSay(S);
return;
}
R.stage = S;
var g = R.sg;
while (g.children.length)
g.remove(g.children[0]);
g.position.set(R.x, 0, 0);
var looks = [
function () { gmmB(3, 0.4, 1.6, null, 0xC8B060, -3.6, 0.2, -3.4, g); gmmC(0.35, 0.3, 0.4, null, 0x2A2A2A, 0, 0.2, -4, g, 10); gmmBench(g, 2, -3, 0, 1.6, 0x5A4A3A); gmmBarrel(g, 4.6, -3.6, 0.8); },
function () { gmmTable(g, 0, -1, 2, 1, 0x7A5232, { cloth: 0xE8E0D8 }); gmmChair(g, 0, -0.2, Math.PI); gmmBed(g, -3.6, -3, Math.PI / 2, { quilt: 0x8A6A9A }); gmmStove(g, 4, -3.6, 0, 0x5A8A6A); gmmShelves(g, 5.2, 0, -Math.PI / 2, 3, 1.8, { jars: 1, books: false }); },
function () { gmmRug(g, 0, 0, 8, 6, 0x6A1A2A, 0x8A2A3A); gmmTable(g, 0, -1, 5, 1.4, 0x4A2E1A, { cloth: 0xE8E0D8 }); for (var c = 0; c < 6; c++)
gmmChair(g, -2 + c * 0.8, -0.1, Math.PI, 0x4A2E1A, 1.1); gmmHearth(g, R, 0, -4.4, 0, {}); [-4, 4].forEach(function (x) { gmmB(1.4, 2.4, 0.04, null, 0x3A5A3A, x, 1.8, -4.9, g); }); },
function () { gmmRug(g, 0, -1, 4, 8, 0x8A1A2A); var th = gmmG(0, 0, -3.6, g); gmmB(3, 0.5, 1.6, "marble", 0xE8E0D0, 0, 0.25, 0, th); gmmB(1.2, 2.6, 0.3, null, 0xD8B040, 0, 1.8, -0.6, th).material = gmmShiny(0xD8B040, 100); for (var k = 0; k < 4; k++)
R.sgP.push(R.person(960 + k, -4 + k * (k < 2 ? 1 : 2.6) + (k > 1 ? 2 : 0), -1 + k % 2, 0, { sex: "m", title: "guard" })); },
function () { var th = gmmG(0, 0, -3.4, g); for (var s = 0; s < 5; s++)
gmmB(3.6 - s * 0.4, 0.4, 1.8 - s * 0.2, null, 0xE8C040, 0, 0.2 + s * 0.4, 0, th).material = gmmShiny(0xE8C040, 110); gmmB(1.2, 2.4, 0.3, null, 0xE8C040, 0, 3.2, -0.4, th).material = gmmShiny(0xE8C040, 110); for (var c = 0; c < 6; c++)
gmmCandle(g, -4.5 + c * 1.8, 0, -4.6); },
function () { for (var p = 0; p < 4; p++) {
gmmBench(g, -2.4, -1 + p * 1.2, 0, 3, 0x4A2E1A);
gmmBench(g, 2.4, -1 + p * 1.2, 0, 3, 0x4A2E1A);
} var al = gmmG(0, 0, -4.2, g); gmmB(3, 1, 1, "marble", 0xF0E8DC, 0, 0.5, 0, al); for (var c = 0; c < 12; c++)
gmmCandle(al, -1.3 + c * 0.24, 1, 0); var th = gmmB(1.2, 3.4, 0.3, null, 0xE8C040, 0, 2.5, -4.8, g); th.material = gmmShiny(0xE8C040, 110); }
];
(R.sgP || []).forEach(function (P) { if (P.g.parent)
P.g.parent.remove(P.g); });
R.sgP = [];
try {
looks[S]();
}
catch (e) { }
var wf = R.person(950, 0, S >= 3 ? -3.2 : -1.6, 0, { sex: "f", look: { topKind: S >= 3 ? "robe" : "dress", top: [0x8A5A6A, 0x8A5A6A, 0x6A3A5A, 0x6A1A2A, 0xD8B040, 0xF0F0F0][S], hat: S === 3 || S === 4 ? "crown" : undefined, hatColor: 0xD8B040, hair: 0x5A3A2A, hairStyle: "bun" }, talk: { name: "Ilsebill", persona: "Ilsebill, the fisherman's wife in the Grimms' The Fisherman and his Wife (1812-1857). You live now in " + GMM_FISH[S].n + ". You are never content and always want more: next you will want " + (GMM_FISH[S + 1] ? GMM_FISH[S + 1].n : "nothing, for now") + ". Proud, restless, funny in your greed. Never mention films.", greet: ["\"Husband, didn't you catch anything today?\"", "\"This cottage is too small. We should have a great stone castle!\"", "\"Husband, get up and look out of the window. Couldn't we be king over all this land?\"", "\"Being king is nothing. I want to be emperor!\"", "\"I'm emperor, but now I want to be pope.\"", "\"I'm pope... but can I make the sun and the moon rise?\""][S] } });
R.sgP.push(wf);
if (S >= 3)
wf.g.position.y = S === 4 ? 1.6 : 0.5;
R.say = gmmFishSay(S);
},
function (S) { return ["A hovel, little better than a pot: straw to sleep on, one pot, one bench.", "A pretty cottage: a parlour and a bedroom, a kitchen and a pantry, the best furniture, hens and ducks in the yard.", "A great stone castle: halls of marble, tapestries, servants, tables loaded with food.", "A king's palace: guards and trumpets, and Ilsebill on a high throne of gold and diamonds.", "An emperor's palace, all of gold: her throne two miles high, they say.", "A great church, candles by the thousand: Ilsebill on a throne higher still."][S] || ""; },
function () {
var Gs = GMM.giantsP || [];
gmmCard("🪨 The two giants", "The Brave Little Tailor", "Two giants lie asleep under a tree, snoring so the branches shake. You fill your pockets with stones and climb up the tree, and from a branch just above them...", [
["Drop stones on the first giant's chest", "then the second's, then the first again", function () {
setStatus("🪨 <b>\"Why are you hitting me?\"</b> says the first. <b>\"You're dreaming, I'm not hitting you,\"</b> says the second. They doze off... another stone on the second: <b>\"What's this? Why are you pelting me?\"</b> \"I'm not!\" Grumbling, they doze off again...");
setTimeout(function () { setStatus("🪨 Now you drop the biggest stone with all your strength on the first giant's chest. <b>\"That's too much!\"</b> he roars, springs up and shoves his friend against the tree. The other pays him back in the same coin, and they get into such a rage they tear up trees and lay about each other..."); Gs.forEach(function (P, i) { P.g.rotation.set(0, i ? 2.8 : 0.2, 0); P.g.position.y += 1.0; }); }, 4500);
setTimeout(function () {
Gs.forEach(function (P, i) { P.g.rotation.set(-Math.PI / 2 + 0.25, 0, i ? 2.8 : 0.2); P.g.position.y -= 1.0; });
gmmReward("giants", "🪡 ...until at last both fall down dead on the ground at the same time, and the little tailor climbs down. <b>\"Lucky they didn't tear up the tree I was sitting in,\"</b> he says, <b>\"or I'd have had to jump like a squirrel. But we tailors are nimble.\"</b> Seven at one blow!");
}, 10000);
}],
["Tiptoe away", "", null]
]);
},
function () {
gmmCard("🪰 The bread and jam", "The Brave Little Tailor", "The smell of jam has brought the flies in their swarms, and they settle on it. <b>\"Hey! Who invited you?\"</b> You take a strip of cloth...", [
["SWAT!", "", function () { gmmReward("tailor", "🪰 You count: no fewer than <b>seven</b>, dead with their legs in the air. <b>\"What a fellow I am! The whole town shall know it!\"</b> You sew a belt in a hurry and stitch on it in big letters: <b>SEVEN AT ONE BLOW</b>. <i>(\"The town? The whole world!\" Everyone who reads it thinks you mean seven men.)</i>"); }]
]);
},
function (R) {
if (GMM.run && GMM.run.k === "porridge")
return;
gmmCard("🍯 The little pot", "Sweet Porridge", "An old woman in the wood gave the girl this little pot. Say the words, and it cooks good sweet millet porridge.", [
["\"Cook, little pot, cook!\"", "", function () {
var P = R.por;
if (!P)
return;
P.visible = true;
P.position.y = 0.02;
var t = 0, asked = false;
setStatus("🍯 The little pot bubbles and cooks, and the porridge rises over the rim... and over the hearth... <b>Quick, what were the words to stop it?</b>");
GMM.run = { k: "porridge", tick: function (dt) {
t += dt;
if (GMM.room !== R) {
GMM.run = null;
P.visible = false;
return;
}
P.position.y = Math.min(1.5, 0.02 + t * 0.09);
if (t > 2.5 && !asked) {
asked = true;
gmmCard("🍯 It won't stop!", "Sweet Porridge", "The porridge is over the floor and rising...", gmmShuffle([
["\"Stop, little pot!\"", "", function () { GMM.run = null; setTimeout(function () { P.visible = false; }, 3000); gmmReward("porridge", "🍯 It stops at once! <i>(In the tale the mother forgot the words, and the porridge filled the kitchen, the house, the next house, the street, until the whole town was porridge; only when the girl came home and said \"Stop, little pot\" did it stop, and anyone who wanted to get back into town had to eat their way in.)</i>"); }],
["\"Enough, pot!\"", "", function () { asked = false; t = Math.max(t, 3); setStatus("🍯 It goes on cooking! The porridge reaches the window sill..."); }],
["\"Halt, porridge!\"", "", function () { asked = false; t = Math.max(t, 3); setStatus("🍯 It just keeps cooking! Porridge in the street now..."); }]
]));
}
if (t > 20) {
GMM.run = null;
setTimeout(function () { P.visible = false; }, 1500);
setStatus("🍯 \"Stop, little pot,\" says the girl, coming home just in time. Anyone who wants to get into town now will have to eat their way in!");
}
} };
}],
["Leave it be", "", null]
]);
},
function (R) {
if (R.elvesGone) {
setStatus("👞 The elves never came back. But the shoemaker did well for as long as he lived, and all he set his hand to prospered.");
return;
}
if (!R.elves) {
R.elves = [R.person(970, -0.4, -2.4, 0, { child: 1, s: 0.42, sex: "m", look: { top: 0xE8C8A8, bottom: 0xE8C8A8, hair: 0x8A5A2A } }), R.person(971, 0.4, -2.4, 0, { child: 1, s: 0.42, sex: "m", look: { top: 0xE8C8A8, bottom: 0xE8C8A8, hair: 0xC8A060 } })];
}
R.elves.forEach(function (P) { P.g.visible = true; P.g.position.y = 0.78; });
gmmCard("🕛 Midnight", "The Elves and the Shoemaker", "You hide behind the curtain with a candle. At midnight two little men, with nothing on at all, sit at the bench and begin to stitch and hammer so nimbly you can hardly follow their fingers, until all the shoes are done.", [
["Sew them little clothes for Christmas", "shirts, coats, waistcoats and trousers, and two pairs of little shoes", function () {
R.elvesGone = 1;
setStatus("🎄 They find the clothes laid out instead of leather, and are delighted. They put them on and sing: <b>\"Now we are boys so fine to see, why should we longer cobblers be?\"</b> and they hop and dance over chairs and benches and out of the door. They never come back.");
setTimeout(function () { R.elves.forEach(function (P) { P.g.visible = false; }); }, 4500);
}],
["Just watch", "", function () { setTimeout(function () { R.elves.forEach(function (P) { P.g.visible = false; }); }, 3000); setStatus("🔨 Tap, tap, stitch, stitch... and then they run off quick as lightning, before dawn."); }]
]);
},
function (n) { return ["<i>Wait at the widow's cottage door for a winter's evening knock.</i>", "<i>Spring has come. Go into the forest: north-east of the cottage a felled tree has something caught in it.</i>", "<i>Go down to the brook west of the cottage, to fish.</i>", "<i>Go across the heath east of the cottage, with its rocks, to town to buy thread and needles.</i>", "<i>Cross the heath again on your way home.</i>", "<i>The tale is told. (You may play it again.)</i>"][n] || ""; },
function () {
var F = gmmQ("snowrose");
if (F.n !== 0) {
setStatus("🚪 " + gmmSRWhere(F.n));
return;
}
gmmCard("🚪 A knock at the door, one winter evening", "Snow-White and Rose-Red", "Snow is falling. The mother reads aloud by the fire, the girls spin. Someone knocks. <b>\"Quick, Rose-Red, open the door, it must be a traveller who is seeking shelter.\"</b> Rose-Red draws back the bolt... and a great black bear puts his head in at the door.", [
["Scream and hide, as the girls did", "then listen to what he says", function () { setStatus("🐻 The lamb bleats, the dove flutters, Snow-White hides behind her mother's bed. But the bear says: <b>\"Do not be afraid, I will do you no harm! I am half-frozen, and only want to warm myself a little beside you.\"</b> <i>(Knock again.)</i>"); }],
["Let him in, and beat the snow from his coat", "with a broom, as the mother asks", function () {
var B = GMM.srBear;
if (B) {
B.visible = true;
}
F.n = 1;
setStatus("🐻 <b>\"Poor bear,\"</b> says the mother, <b>\"lie down by the fire, only take care that you do not burn your coat.\"</b> The girls fetch the broom and sweep the bear's hide clean; he stretches out by the fire and growls contentedly. Soon they tug his hair, put their feet on his back, beat him with a hazel switch. <b>\"Snowy-white, Rosy-red, will you beat your lover dead?\"</b> he laughs. All winter he comes every evening at the same hour.");
setTimeout(function () { if (B)
B.visible = false; F.n = 1; setStatus("🌱 When spring comes the bear says: <b>\"Now I must go away, and cannot come back for the whole summer. I must go into the forest and guard my treasures from the wicked dwarfs.\"</b> As he hurries out, he catches on the door-hook and a piece of his hairy coat tears off; Snow-White thinks she sees <b>gold shining through</b>. " + gmmSRWhere(1)); }, 9000);
}]
]);
},
function () {
var F = gmmQ("snowrose");
if (F.n !== 1) {
setStatus("🪵 Just a felled tree. " + gmmSRWhere(F.n));
return;
}
var A = GMM_AT.snowrose;
gmmSRShowDwarf(A.x + 37.2, A.z - 28.6);
gmmCard("🪵 A dwarf with his beard caught fast", "Snow-White and Rose-Red", "A dwarf with an old withered face and a snow-white beard a yard long is jumping backwards and forwards like a dog on a lead. The end of his beard is caught in a crack of the tree where he was splitting wood, and the wedge has sprung out. <b>\"Why do you stand there? Can you not come here and help me?\"</b>", [
["Run and fetch someone", "\"I will run and fetch some one\"", function () { setStatus("🧔 <b>\"You senseless goose! Why should you fetch some one? You are already two too many for me; can you not think of something better?\"</b>"); }],
["Take out your scissors and cut off the end of his beard", "\"Don't be impatient, I will help you\"", function () {
F.n = 2;
setStatus("✂️ You snip off the end of the beard. The moment he is free he snatches up a bag full of gold lying among the roots, and grumbles: <b>\"Uncouth people, to cut off a piece of my fine beard. Bad luck to you!\"</b> And off he goes without a look. " + gmmSRWhere(2));
setTimeout(function () { if (GMM.srDwarf)
GMM.srDwarf.g.visible = false; }, 4000);
}]
]);
},
function () {
var F = gmmQ("snowrose");
if (F.n !== 2) {
setStatus("🐟 The brook runs clear. " + gmmSRWhere(F.n));
return;
}
var A = GMM_AT.snowrose;
gmmSRShowDwarf(A.x - 35, A.z + 33);
gmmCard("🎣 Something like a great grasshopper, jumping towards the water", "Snow-White and Rose-Red", "It is the dwarf. He was fishing, and the wind has twisted his beard into the line; now a great fish is pulling, and he will be dragged into the water. <b>\"Where are you going? You surely don't want to go into the water?\"</b> <b>\"I am not such a fool! Don't you see that the accursed fish wants to pull me in?\"</b>", [
["Try to untangle the beard from the line", "", function () { setStatus("🎣 Beard and line are entangled fast together. It is no use. The fish pulls harder."); }],
["Bring out the scissors again", "and cut off a piece of beard", function () {
F.n = 3;
setStatus("✂️ Off comes a small part of his beard. The dwarf screams: <b>\"Is that civil, you toadstool, to disfigure a man's face? Was it not enough to clip off the end of my beard? Now you have cut off the best part of it. I cannot let myself be seen by my people. I wish you had been made to run the soles off your shoes!\"</b> He fetches a sack of pearls from the rushes and slips away behind a stone. " + gmmSRWhere(3));
setTimeout(function () { if (GMM.srDwarf)
GMM.srDwarf.g.visible = false; }, 4000);
}]
]);
},
function () {
var F = gmmQ("snowrose"), A = GMM_AT.snowrose;
if (F.n === 3) {
gmmSRShowDwarf(A.x + 40, A.z + 44);
gmmCard("🦅 A great bird hovering over the heath", "Snow-White and Rose-Red", "It flies slowly round, lower and lower, and settles near a rock, and you hear a loud, piteous cry. The eagle has seized your old acquaintance the dwarf and is going to carry him off.", [
["Take tight hold of the little man", "and pull against the eagle", function () {
F.n = 4;
setStatus("🦅 You pull so long that the eagle lets its booty go. As soon as the dwarf has recovered from his fright he cries in his shrill voice: <b>\"Could you not have done it more carefully! You dragged at my brown coat so that it is all torn and full of holes, you clumsy creatures!\"</b> He takes a sack full of precious stones and slips into his cave under the rocks. <i>You go on to town and do your errands. " + gmmSRWhere(4).replace(/<\/?i>/g, "") + "</i>");
setTimeout(function () { if (GMM.srDwarf)
GMM.srDwarf.g.visible = false; }, 4000);
}],
["Let the eagle have him", "", function () { setStatus("🦅 The girls in the tale did not; they took hold of him at once. (Try again.)"); }]
]);
return;
}
if (F.n === 4) {
gmmSRShowDwarf(A.x + 38, A.z + 40);
var B = GMM.srBear;
gmmCard("💎 The dwarf, and his precious stones in the evening sun", "Snow-White and Rose-Red", "He has emptied out his bag in a clean spot, never thinking anyone would come so late. The evening sun shines on the stones; they glitter and sparkle in every colour. <b>\"Why do you stand gaping there?\"</b> he cries, his ashen-grey face copper-red with rage. Then a loud growling, and a black bear comes trotting out of the forest.", [
["Stand still", "and watch", function () {
if (B) {
B.visible = true;
B.position.set(A.x + 34, gmmGround(A.x + 34, A.z + 40), A.z + 40);
B.rotation.y = Math.PI / 2;
}
setStatus("🐻 The dwarf springs up in fright, but cannot reach his cave. <b>\"Dear Mr. Bear, spare me, I will give you all my treasures; look, the beautiful jewels lying there! Grant me my life; what do you want with such a slender little fellow as I? Come, take these two wicked girls, they are tender morsels for you, fat as young quails; for mercy's sake eat them!\"</b>");
setTimeout(function () {
if (GMM.srDwarf)
GMM.srDwarf.g.visible = false;
F.n = 5;
gmmReward("snowrose", "🐻 The bear takes no heed of his words. He gives the wicked creature <b>a single blow with his paw, and he does not move again</b>. <b>\"Snow-White and Rose-Red, do not be afraid; wait, I will come with you.\"</b> You know his voice. As he reaches you, his bearskin falls off, and he stands there a handsome man, clothed all in gold. <b>\"I am a king's son, and I was bewitched by that wicked dwarf, who had stolen my treasures; I have had to run about the forest as a savage bear until I was freed by his death. Now he has got his well-deserved punishment.\"</b> <i>(Grimm, 1857: Snow-White married him and Rose-Red his brother; they divided the great treasure the dwarf had gathered in his cave. The old mother lived peacefully and happily with her children for many years, and took the two rose-trees with her; they stood before her window, and every year bore the most beautiful roses, white and red.)</i>");
setTimeout(function () { if (B)
B.visible = false; F.n = 0; }, 15000);
}, 5500);
}]
]);
return;
}
setStatus("🌾 Heather and rocks, an eagle high up. " + gmmSRWhere(F.n));
},
function (n) { return ["<i>Begin at the brook beside the road, south-east of the old king's castle.</i>", "<i>Go in under the dark gateway of the castle.</i>", "<i>Drive the geese out to the meadow west of the castle.</i>", "<i>The old king has sent for you: go into his hall, and through to the kitchen.</i>", "<i>The tale is told.</i>"][n] || ""; },
function () {
var F = gmmQ("goosegirl");
if (F.n !== 0) {
setStatus("💧 The brook. " + gmmGGWhere(F.n));
return;
}
gmmCard("💧 The brook beside the road", "The Goose-Girl", "You are a king's daughter riding to your bridegroom in a far country, on Falada, a horse that can speak. Your mother has given you a little white handkerchief with three drops of her blood on it: <b>\"Dear child, preserve this carefully, it will be of service to you on your way.\"</b> You are thirsty. <b>\"Dismount, and take my cup which thou hast brought with thee for me, and get me some water from the stream.\"</b> <b>\"If you are thirsty,\"</b> says the waiting-maid, <b>\"get off yourself, and lie down and drink out of the water, I don't choose to be your servant.\"</b>", [
["Kneel and drink from the stream", "as the princess had to", function () {
F.n = 1;
setStatus("💧 <b>\"Alas, heaven!\"</b> you sigh, and the three drops of blood answer: <b>\"If thy mother knew, her heart would break.\"</b> The second time, as you bend to drink, the handkerchief falls from your bosom and floats away, and you are weak and powerless. The maid makes you take off your royal clothes and put on her shabby ones, takes Falada (<b>\"Falada is more suitable for me, and my nag will do for thee\"</b>), and makes you swear by the clear sky above you that you will not say one word of it to anyone at the royal court; if you had not, she would have killed you on the spot. Falada sees it all and lays it to heart. <br>At the castle the maid is taken for the bride. She asks the young king one favour: <b>\"Send for the knacker, and have the head of the horse on which I rode here cut off, for it vexed me on the way.\"</b> Falada is killed. You give the knacker a piece of gold to nail his head up under the great dark gateway, where you must pass with the geese morning and evening. " + gmmGGWhere(1));
}]
]);
},
function () {
var F = gmmQ("goosegirl");
if (F.n < 1) {
setStatus("🐴 A dark gateway. " + gmmGGWhere(0));
return;
}
gmmCard("🐴 Falada's head, nailed up under the dark gateway", "The Goose-Girl", "Early in the morning, driving the geese out with Conrad, you pass beneath it.", [
["\"Alas, Falada, hanging there!\"", "", function () { setStatus("🐴 And the head answers: <b>\"Alas, young Queen, how ill you fare! If this your tender mother knew, her heart would surely break in two.\"</b> " + (F.n === 1 ? gmmGGWhere(2) : "")); if (F.n === 1)
F.n = 2; }]
]);
},
function () {
var F = gmmQ("goosegirl");
if (F.n !== 2) {
setStatus("🪿 The geese graze. " + gmmGGWhere(F.n));
return;
}
gmmCard("🪿 The goose meadow", "The Goose-Girl", "You sit down and unbind your hair, which is pure gold. Conrad sees it shining and wants to pull a few hairs out.", [
["\"Blow, blow, thou gentle wind, I say...\"", "the princess's rhyme", function () {
var C = GMM.ggConrad;
if (C) {
var p = C.g.position, x0 = p.x;
var t = 0, iv = setInterval(function () { t += 0.1; p.x = x0 + Math.sin(t) * 10; p.z += 0.3; p.y = gmmGround(p.x, p.z); if (t > 4) {
clearInterval(iv);
} }, 100);
}
F.n = 3;
setStatus("🌬️ <b>\"Blow, blow, thou gentle wind, I say, blow Conrad's little hat away, and make him chase it here and there, until I have braided all my hair, and bound it up again.\"</b> And there comes such a violent wind that it blows Conrad's hat across the fields, and he has to run after it. When he comes back you have finished combing and putting up your hair, and he cannot get any of it. Angry, he will not speak to you. <br>That evening Conrad goes to the old king: <b>\"I won't tend the geese with that girl any longer!\"</b> The next morning the old king hides behind the dark gateway, and hears, and sees. " + gmmGGWhere(3));
}]
]);
},
function () {
var F = gmmQ("goosegirl");
if (F.n !== 3) {
setStatus("🔥 A great iron stove. " + gmmGGWhere(F.n));
return;
}
gmmCard("🔥 The iron stove", "The Goose-Girl", "The old king asked you why you did all this. <b>\"I may not tell you that, and I dare not lament my sorrows to any human being, for I have sworn not to do so by the heaven which is above me; if I had not done that, I should have lost my life.\"</b> <b>\"If thou wilt not tell me anything, tell thy sorrows to the iron stove there,\"</b> he said, and went away.", [
["Creep into the stove and weep, and tell it everything", "\"Here am I deserted by the whole world...\"", function () {
F.n = 4;
setStatus("🔥 <b>\"Here am I deserted by the whole world, and yet I am a king's daughter, and a false waiting-maid has by force brought me to such a pass that I have been compelled to put off my royal apparel, and she has taken my place with my bridegroom, and I have to perform menial service as a goose-girl. If my mother did but know that, her heart would break.\"</b> The old king is standing outside by the pipe of the stove, listening. He has royal garments put on you, and it is marvellous how beautiful you are.");
setTimeout(function () { gmmReward("goosegirl", "🍷 A great feast. The bridegroom sits at the top with the king's daughter on one side and the waiting-maid on the other, who is dazzled and does not know her. The old king puts a riddle to the false bride: what does a person deserve who has deceived her master so? <b>\"She deserves no better fate than to be stripped entirely naked, and put in a barrel which is studded inside with pointed nails, and two white horses should be harnessed to it, which will drag her along through one street after another, till she is dead.\"</b> <b>\"It is thou,\"</b> says the aged king, <b>\"and thou hast pronounced thine own sentence, and thus shall it be done unto thee.\"</b> <i>(Grimm, 1857: and when the sentence had been carried out, the young king married his true bride, and both of them reigned over their kingdom in peace and happiness.)</i>"); F.n = 0; }, 6000);
}]
]);
},
function (n) { return ["<i>Find the magic clew of yarn at the edge of the wood, south of the hut.</i>", "<i>Follow it to the little hut in the wood, and go in.</i>", "<i>Gather starwort in the meadow east of the hut: six tufts, and not a word.</i>", "<i>Climb the tall tree by the meadow and sew there.</i>", "<i>Go into the king's moated castle, to your child's cradle.</i>", "<i>The pyre is built in the meadow before the castle bridge.</i>", "<i>The tale is told.</i>"][n] || ""; },
function () {
var F = gmmQ("swans");
if (F.n !== 0) {
setStatus("🧶 " + gmmSwanWhere(F.n));
return;
}
F.n = 1;
setStatus("🧶 A king lost in a great forest promised to marry a witch's daughter to find his way out. Fearing for his six sons and his daughter, he hid them in a lonely castle in the wood, so hidden that he could find it only by a magic clew of yarn that rolled ahead of him. But the queen found the clew, and sewed little shirts of white silk with a charm in them; she threw them over the boys, and they turned into <b>swans</b> and flew away. Only you, the daughter, were not there. <b>\"I can no longer stay here. I will go and seek my brothers.\"</b> You throw down the clew and it rolls ahead, all night and all day, until you see a little hut. " + gmmSwanWhere(1));
var C = GMM.swanClew, A = GMM_AT.swans;
if (C) {
var t = 0, iv = setInterval(function () { t += 0.04; C.position.x = A.x - 6 + (A.x - 26 - (A.x - 6)) * t; C.position.z = A.z + 60 + (A.z - 18 - (A.z + 60)) * t; C.position.y = gmmGround(C.position.x, C.position.z) + 0.25; C.rotation.x += 0.4; if (t >= 1)
clearInterval(iv); }, 60);
}
},
function (R) {
var F = gmmQ("swans");
if (F.n !== 1) {
setStatus("🛏️ " + gmmSwanWhere(F.n));
return;
}
if (F.dusk)
return;
F.dusk = 1;
(GMM.swanBirds || []).forEach(function (s) { s.visible = true; });
setStatus("🌇 Close on sunset you hear a rustling, and six swans come flying in at the window. They settle on the ground and blow at each other, and blow all their feathers off, and their swan's skins strip off like a shirt...");
setTimeout(function () {
(R.brothers || []).forEach(function (P) { P.g.visible = true; });
gmmCard("🦢 Your six brothers", "The Six Swans", "<b>\"Here canst thou not abide; this is a shelter for robbers, if they come home and find thee, they will kill thee.\"</b> They may lay aside their swan's skins for only a quarter of an hour each evening. <b>\"The conditions are too hard!\"</b> they say. <b>\"For six years thou mayst neither speak nor laugh, and in that time thou must sew together six little shirts of starwort for us. And if one single word falls from thy lips, all thy work will be lost.\"</b> The quarter of an hour is over: they are swans again, and fly out of the window.", [
["Promise, without a word", "and nod", function () { (R.brothers || []).forEach(function (P) { P.g.visible = false; }); F.dusk = 0; if (F.n !== 1)
return; F.n = 2; setStatus("🤐 You resolve to free your brothers, though it cost your life. You leave the hut, go into the forest, and sleep the night in a tree. " + gmmSwanWhere(2)); }]
]);
}, 3500);
},
function (k) {
var F = gmmQ("swans");
if (F.n !== 2) {
setStatus("🌼 Starwort. " + gmmSwanWhere(F.n));
return;
}
F.got = F.got || {};
if (F.got[k]) {
setStatus("🌼 You have gathered this tuft already.");
return;
}
F.got[k] = 1;
var T = GMM.starwort && GMM.starwort[k];
if (T)
T.visible = false;
var n = Object.keys(F.got).length;
if (n < 6) {
setStatus("🌼 Starwort for the shirts: " + n + " of 6. You do not speak, and there is nothing to laugh at.");
return;
}
F.n = 3;
setStatus("🌼 You have enough starwort for six shirts. " + gmmSwanWhere(3));
},
function () {
var F = gmmQ("swans");
if (F.n !== 3) {
setStatus("🌳 A tall tree. " + gmmSwanWhere(F.n));
return;
}
gmmCard("🌳 Sewing in the tree", "The Six Swans", "You sit up in the tree and sew, and look neither to the right nor the left. You have spent a long time there when the king of the country hunts in the forest, and his huntsmen come to the tree. <b>\"Who art thou?\"</b>", [
["Answer them", "\"I am a king's daughter...\"", function () { setStatus("🤐 One single word, and all your work would be lost. (She did not answer. Try again.)"); }],
["Say nothing; throw down your golden necklace, then your girdle, your garters, everything", "", function () {
F.n = 4;
setStatus("🤴 The huntsmen will not be put off. One climbs up and lifts you down and leads you to the king. <b>\"Who art thou? What art thou doing on the tree?\"</b> You do not answer. He asks in every language he knows; you remain as dumb as a fish. But he is touched with your beauty and great love rises in his heart. He puts his mantle on you, takes you before him on his horse, and carries you to his castle. <b>\"She is the one whom I wish to marry, and no other woman in the world.\"</b> A year later you bear a child. " + gmmSwanWhere(4));
}]
]);
},
function () {
var F = gmmQ("swans");
if (F.n !== 4) {
setStatus("👶 The cradle. " + gmmSwanWhere(F.n));
return;
}
gmmCard("👶 The cradle, empty in the morning", "The Six Swans", "While you slept, the king's mother took away your child, smeared your mouth with blood, and went to the king and accused you of being a man-eater. Twice more, two more children. The king would not believe it; the third time he could no longer protect you.", [
["Speak, and defend yourself", "", function () { setStatus("🤐 The six years are not over. One word, and your brothers stay swans for ever. (She said nothing. Try again.)"); }],
["Say nothing, and go on sewing", "", function () { F.n = 5; setStatus("⚖️ You are given over to justice, and sentenced to suffer death by fire. The day the sentence is to be carried out is the last day of the six years. The six shirts are ready; only the left arm of the sixth is wanting. " + gmmSwanWhere(5)); }]
]);
},
function () {
var F = gmmQ("swans");
if (F.n !== 5) {
setStatus("🔥 A pile of logs, a stake. " + gmmSwanWhere(F.n));
return;
}
setStatus("🔥 You are led to the pile with the shirts on your arm. As the fire is to be lit, you look round, and <b>six swans</b> come flying through the air...");
(GMM.swanBirds || []).forEach(function (s, i) { s.visible = true; });
setTimeout(function () { F.n = 6; gmmReward("swans", "🦢 They sweep down so you can throw the shirts over them, and as they are touched by them their swan's skins fall off, and your brothers stand before you, living, fresh and handsome. <b>The youngest lacks only his left arm, and has in its place a swan's wing.</b> <b>\"Dearest husband, now I may speak and declare to thee that I am innocent, and falsely accused.\"</b> You tell him of the mother-in-law who took away your three children and hid them. They are brought back. <i>(Grimm, 1857: to the great joy of the king, the wicked mother-in-law was bound to the stake and burnt to ashes. But the king and the queen, with their six brothers, lived many years in happiness and peace.)</i>"); F.n = 0; F.got = {}; (GMM.starwort || []).forEach(function (T) { T.visible = true; }); }, 4000);
},
function (n) { return ["<i>Go to the spring by the house.</i>", "<i>Go into the house: on the table are a ring, a loaf, a little pitcher and a little chair.</i>", "<i>Take the road to the end of the world (the signpost east of the house).</i>", "<i>Go on to the Glass Mountain and its door.</i>", "<i>Inside the Glass Mountain: a morsel from each little plate, a sip from each little glass.</i>", "<i>The tale is told.</i>"][n] || ""; },
function () {
var F = gmmQ("ravens");
if (F.n !== 0) {
setStatus("💧 The spring. " + gmmRavensWhere(F.n));
return;
}
var w = GMM_AT.ravens;
F.n = 1;
(GMM.ravenBirds || []).forEach(function (r, i) { r.visible = true; var t = 0, x0 = r.position.x, y0 = r.position.y; var iv = setInterval(function () { t += 0.05; r.position.y = y0 + t * 18; r.position.x = x0 + t * (i - 3) * 6; r.position.z -= 0.6; if (t > 2.2) {
clearInterval(iv);
r.visible = false;
r.position.set(x0, y0, r.position.z + 0);
} }, 60); });
setStatus("🐦‍⬛ A girl was born at last after seven sons, sickly and small; she must be baptised quickly. The boys were sent to the spring for water; each wanted to be first to fill the jug, and it fell into the well. Their father grew angry: <b>\"I wish the boys were all turned into ravens.\"</b> Hardly was the word spoken before he heard a whirring of wings overhead: <b>seven coal-black ravens flying away</b>. <br>Years later the girl heard people say she was to blame. " + gmmRavensWhere(1));
},
function () {
var F = gmmQ("ravens");
if (F.n !== 1) {
setStatus("🧺 " + gmmRavensWhere(F.n));
return;
}
F.n = 2;
setStatus("🧺 <b>\"It was the will of Heaven,\"</b> say your parents, <b>\"and your birth was only the innocent cause.\"</b> But you take it to heart, and set out secretly to free your brothers, let it cost what it might, taking nothing but <b>a little ring belonging to your parents</b>, a loaf of bread against hunger, a little pitcher of water against thirst, and a little chair against weariness. " + gmmRavensWhere(2));
},
function () {
var F = gmmQ("ravens");
if (F.n !== 2) {
setStatus("⭐ The stars are kind and good, each on its own little chair.");
return;
}
F.n = 3;
F.bone = 1;
setStatus("⭐ The stars are kind and good to you. The <b>morning star</b> rises and gives you the drumstick of a chicken: <b>\"If thou hast not that drumstick thou canst not open the Glass mountain, and in the Glass mountain are thy brothers.\"</b> You wrap it carefully in a cloth. " + gmmRavensWhere(3) + " <i>(The road back is behind you.)</i>");
},
function () {
var F = gmmQ("ravens");
if (F.n < 3) {
setStatus("🏔️ The door of the Glass Mountain is shut fast. " + gmmRavensWhere(F.n));
return;
}
if (F.n > 3) {
gmmEnterRoom("glassmtn", GMM.ravenMtnDoor);
return;
}
gmmCard("🏔️ The door of the Glass Mountain", "The Seven Ravens", "You undo the cloth to take out the drumstick... and it is empty. You have lost the good star's present. What now? You want to rescue your brothers, and you have no key to the Glass Mountain.", [
["Take a knife, cut off your little finger, and put it in the door", "as the good sister did", function () { F.n = 4; setStatus("🩸 You cut off one of your little fingers, put it in the door, and it opens. "); setTimeout(function () { gmmEnterRoom("glassmtn", GMM.ravenMtnDoor); }, 1600); }],
["Turn back", "", function () { setStatus("🏔️ Your brothers stay ravens. (She did not turn back.)"); }]
]);
},
function (R, i) {
var F = gmmQ("ravens");
if (F.n !== 4) {
setStatus("🍽️ Seven little plates. " + gmmRavensWhere(F.n));
return;
}
F.ate = F.ate || {};
if (F.ate[i]) {
setStatus("🍽️ Only a morsel from each, a sip from each.");
return;
}
F.ate[i] = 1;
var n = Object.keys(F.ate).length;
if (n < 7) {
setStatus("🍽️ A morsel from the " + ["first", "second", "third", "fourth", "fifth", "sixth"][i] + " little plate, a sip from its little glass. (" + n + " of 7)");
return;
}
setStatus("💍 A morsel from the last plate, a sip from the last glass; and into the last little glass you drop the ring you brought from home. Then a whirring of wings and a rushing through the air: <b>\"Now the lord ravens are flying home.\"</b> You stand behind the door and watch...");
(R.ravens || []).forEach(function (r) { r.visible = true; });
setTimeout(function () {
setStatus("🐦‍⬛ <b>\"Who has eaten something from my plate? Who has drunk out of my little glass? It was a human mouth.\"</b> And when the seventh comes to the bottom of his glass, the ring rolls against his mouth. <b>\"God grant that our sister may be here, and then we shall be free.\"</b>");
setTimeout(function () {
(R.ravens || []).forEach(function (r) { r.visible = false; });
(R.brothers || []).forEach(function (P) { P.g.visible = true; });
F.n = 0;
F.ate = {};
gmmReward("ravens", "🤗 You come out from behind the door, and on that all the ravens are restored to their human form again. They embrace and kiss each other, and go joyfully home. <i>(Grimm, 1857. The sister's lost finger is never mentioned again.)</i>");
setTimeout(function () { (R.brothers || []).forEach(function (P) { P.g.visible = false; }); }, 30000);
}, 5000);
}, 3500);
},
function (n) { return ["<i>Find the deep pool in the forest, north-west of the castle.</i>", "<i>Your golden ball has rolled into the iron cage in the castle court.</i>", "<i>The key is under the queen's pillow: in the castle, up the stairs.</i>", "<i>Open the cage.</i>", "<i>Keep watch at the golden spring, deep in the forest west of the castle.</i>", "<i>Work as the gardener's boy: pick wild flowers in the king's garden for his daughter.</i>", "<i>War has come. Go to the edge of the forest north of the castle and call for Iron John.</i>", "<i>Ride into the lists, south of the castle, where the golden apple is thrown.</i>", "<i>The tale is told.</i>"][n] || ""; },
function () {
var F = gmmQ("ironjohn");
if (F.n !== 0) {
setStatus("🌊 The pool lies empty now. " + gmmIJWhere(F.n));
return;
}
F.n = 1;
if (GMM.ijPool)
GMM.ijPool.material = gmmShiny(0x3A2A1A, 40);
setStatus("🌊 The king's huntsmen went into this forest and never came back; not one. You came with your dog to the pool, and a naked arm reached up out of the water and drew him under. So you and the king's men bale out the pool with buckets, and at the bottom lies <b>a wild man whose body is brown like rusty iron, and whose hair hangs over his face down to his knees</b>. They bind him and lead him to the castle, and the king has him put in an iron cage in the court, and forbids the door to be opened on pain of death; the queen keeps the key. <br>Years later, the king's eight-year-old son is playing in the court, and his golden ball falls into the cage. " + gmmIJWhere(1));
},
function () {
var F = gmmQ("ironjohn");
if (F.n === 1) {
F.n = 2;
setStatus("🟡 <b>\"Give me my ball out.\"</b> <b>\"Not till thou hast opened the door for me.\"</b> <b>\"I will not do that; the King has forbidden it.\"</b> Next day the same. The third day the king rides out hunting, and you go once more. <b>\"I cannot open the door even if I wished, for I have not the key.\"</b> <b>\"It lies under thy mother's pillow, thou canst get it there.\"</b> " + gmmIJWhere(2));
return;
}
if (F.n === 3) {
F.n = 4;
var W = GMM.ijWild, A = GMM_AT.ironjohn;
setStatus("🗝️ The door opens with difficulty, and you pinch your finger. The wild man steps out, gives you the golden ball, and hurries away. <b>\"Oh, wild man, do not go away, or I shall be beaten!\"</b> He turns back, takes you up, sets you on his shoulder, and goes with hasty steps into the forest. <b>\"Thou wilt never see thy father and mother again, but I will keep thee with me, for thou hast set me free. If thou dost all I bid thee, thou shalt fare well. Of treasure and gold have I enough, and more than anyone in the world.\"</b>");
if (W)
W.g.visible = false;
gmmVeil(1.2, function () { gmmAtFace(A.x - 60, A.z + 46, A.x - 60, A.z + 40); setStatus("🌲 He makes you a bed of moss. In the morning he takes you to a well. <b>\"Behold, the gold well is as bright and clear as crystal, thou shalt sit beside it, and take care that nothing falls into it, or it will be polluted. I will come every evening to see if thou hast obeyed my order.\"</b> " + gmmIJWhere(4)); });
return;
}
if (F.n === 2) {
setStatus("🔒 The key is under the queen's pillow. " + gmmIJWhere(2));
return;
}
setStatus("⛓️ " + (F.n > 3 ? "The cage stands open and empty." : "A wild man in an iron cage, brown as rusty iron. ") + " " + gmmIJWhere(F.n));
},
function () {
var F = gmmQ("ironjohn");
if (F.n !== 4) {
setStatus("✨ The gold well, bright and clear as crystal. " + gmmIJWhere(F.n));
return;
}
F.w = (F.w || 0) + 1;
if (F.w === 1) {
setStatus("☝️ You sit by the well and see a golden fish and a golden snake in it. Your finger hurts so much that you put it in the water, and when you draw it out it is all gilded. In the evening Iron John comes. <b>\"What has happened to the well?\"</b> <b>\"Nothing, nothing,\"</b> you say, and hold the finger behind your back. <b>\"Thou hast dipped thy finger into the water; this time it may pass.\"</b> <i>(Keep watch again.)</i>");
return;
}
if (F.w === 2) {
setStatus("💛 Early next morning you sit by the well again. Your finger hurts and you pass it over your head, and a hair falls down into the well; you take it out, and it is all gold. <b>\"Thou hast let a hair fall into the well. I will allow thee to watch by it once more, but if this happens for the third time then the well is polluted.\"</b> <i>(Keep watch once more.)</i>");
return;
}
F.n = 5;
F.w = 0;
setStatus("👑 On the third day you lean over to look at your face in the water, and your long hair falls down into it. You raise yourself quickly; all your hair is gold, and shines like the sun. You tie a handkerchief round your head. <b>\"Take the handkerchief off.\"</b> The golden hair streams forth. <b>\"Thou hast not stood the trial and canst stay here no longer. Go forth into the world, there thou wilt learn what poverty is. But as thou hast not a bad heart, and as I mean well by thee, there is one thing I will grant thee; if thou fallest into any difficulty, come to the forest and cry, 'Iron John,' and then I will come and help thee.\"</b> <br>You go to a king's palace far away, and take service as a gardener's boy, and never take your little cap off: <b>\"I have a bad sore place on my head.\"</b> " + gmmIJWhere(5));
},
function () {
var F = gmmQ("ironjohn");
if (F.n !== 5) {
setStatus("🌼 Wild flowers. " + gmmIJWhere(F.n));
return;
}
F.n = 6;
setStatus("🌼 Once in summer, working alone in the garden, you take your cap off to let the air cool you, and the sun shines on your hair so that the rays fall into the king's daughter's bedroom. <b>\"Boy, bring me a wreath of flowers.\"</b> You gather wild field-flowers. <b>\"How canst thou take the King's daughter a garland of such common flowers?\"</b> says the gardener. <b>\"Oh, no, the wild ones have more scent, and will please her better.\"</b> In her room she says: <b>\"Take thy cap off.\"</b> <b>\"I may not, I have a sore head.\"</b> She snatches it off, and your golden hair rolls down on your shoulders. She gives you a handful of ducats; you give them to the gardener: <b>\"I present them to thy children, they can play with them.\"</b> <br>Not long after, the country is overrun by war. " + gmmIJWhere(6));
},
function () {
var F = gmmQ("ironjohn");
if (F.n !== 6) {
setStatus("🌲 The forest is quiet. " + gmmIJWhere(F.n));
return;
}
F.n = 7;
setStatus("🐎 They left you a horse in the stable: it is lame of one foot and hobbles, <i>hobblety jib, hobblety jib</i>. You ride it to the dark forest and call <b>\"Iron John\"</b> three times, so loudly that it echoes through the trees. The wild man appears. <b>\"What dost thou desire?\"</b> <b>\"I want a strong steed, for I am going to the wars.\"</b> <b>\"That thou shalt have, and still more than thou askest for.\"</b> A stable-boy leads out a horse that snorts with its nostrils, and behind it a great troop of warriors entirely equipped in iron, their swords flashing in the sun. You ride to the battlefield, where the king's men are giving way, and fall on the enemy like a hurricane; not one is left. Then you ride back to the forest, give back horse and troops, and take your three-legged horse home again. Nobody knows who the stranger knight was. <br>The king proclaims a feast of three days: his daughter will throw a golden apple. " + gmmIJWhere(7));
},
function () {
var F = gmmQ("ironjohn");
if (F.n !== 7) {
setStatus("🏇 The lists. " + gmmIJWhere(F.n));
return;
}
F.d = (F.d || 0) + 1;
var arm = ["a suit of red armour on a chestnut horse", "a suit of white armour on a white horse", "a suit of black armour on a black horse"][F.d - 1];
if (F.d < 3) {
setStatus("🍏 Day " + F.d + ": Iron John gives you " + arm + ". You ride in among the knights, catch the golden apple, and gallop away before anyone knows you. <i>(Ride in again tomorrow.)</i>");
return;
}
F.n = 0;
F.d = 0;
var W = GMM.ijWild;
if (W)
W.g.visible = true;
gmmReward("ironjohn", "🍏 Day three: " + arm + ". You catch the apple, but as you gallop off one of the king's men gives chase and wounds your leg with his sword; your helmet falls, and they see your golden hair. You are brought before the king: <b>\"I am he who caught the three golden apples.\"</b> You lift your cap and the golden hair falls down. <b>\"My father is a mighty King, and gold have I in plenty as great as I require.\"</b> And to the king's daughter: <b>\"Now I see that thou art no gardener's boy.\"</b> At the wedding feast the doors open and a stately king comes in with a great retinue. He embraces you: <b>\"I am Iron John, and was by enchantment a wild man, but thou hast set me free; all the treasures which I possess shall be thy property.\"</b> <i>(Grimm, 1857.)</i>");
},
function (n) { return ["<i>Go into her father's hall and look over the suitors as she did.</i>", "<i>Walk the fiddler's road: the beautiful forest, the green meadow, the fine large town.</i>", "<i>Find the little hut in the wood beyond the town, and go in.</i>", "<i>Weave baskets and spin in the hut, then set out your pots at the corner of the market.</i>", "<i>Go to the palace and down to the kitchen: you are to be a kitchen-maid there.</i>", "<i>Go up to the great hall, where the wedding is.</i>", "<i>The tale is told.</i>"][n] || ""; },
function (i, W) {
var F = gmmQ("thrush");
if (F.n !== 0) {
setStatus("🤴 " + gmmThrushWhere(F.n));
return;
}
F.m = F.m || {};
F.m[i] = 1;
setStatus("😏 The proud princess looks him over, and laughs: <b>" + W[1] + "</b>");
if (i === 6 && Object.keys(F.m).length >= 7) {
F.n = 1;
setTimeout(function () { setStatus("😠 <b>\"Well,\"</b> she cries, <b>\"he has a chin like a thrush's beak!\"</b> and from that day he is called <b>King Thrushbeard</b>. The old king is so angry he swears she shall have the very first beggar who comes to the door. A few days later a fiddler sings under the window for alms. <b>\"Your song has pleased me so well that I will give you my daughter there, to wife.\"</b> The priest is fetched, and she is married to the fiddler on the spot. <b>\"Now it is not proper for you, a beggar-woman, to stay any longer in my palace, you may just go away with your husband.\"</b> " + gmmThrushWhere(1)); }, 2200);
}
else if (Object.keys(F.m).length >= 7 && !F.m[6]) { }
},
function (k) {
var F = gmmQ("thrush");
if (F.n !== 1) {
setStatus("🌳 " + gmmThrushWhere(F.n));
return;
}
F.a = F.a || {};
F.a[k] = 1;
var q = { forest: "beautiful forest", meadow: "beautiful green meadow", town: "fine large town" }[k];
setStatus("🎻 <b>\"To whom does this " + q + " belong?\"</b> <b>\"It belongs to King Thrushbeard; if you had taken him, it would have been yours.\"</b> <b>\"Ah, unhappy girl that I am, if I had but taken King Thrushbeard!\"</b> " + (Object.keys(F.a).length < 3 ? "<i>(" + Object.keys(F.a).length + " of 3)</i>" : "<b>\"It does not please me,\"</b> says the fiddler, <b>\"to hear you always wishing for another husband; am I not good enough for you?\"</b> " + gmmThrushWhere(2)));
if (Object.keys(F.a).length >= 3)
F.n = 2;
},
function (k) {
var F = gmmQ("thrush");
if (F.n === 2)
F.n = 3;
if (F.n !== 3) {
setStatus("🧺 " + gmmThrushWhere(F.n));
return;
}
F.w = F.w || {};
F.w[k] = 1;
if (k === "baskets")
setStatus("🧺 <b>\"Wife, we cannot go on any longer eating and spending, and earning nothing. You weave baskets.\"</b> He cuts willows and brings them home; you begin to weave, but the tough willows wound your delicate hands.");
else
setStatus("🧵 <b>\"I see that this will not do,\"</b> says he; <b>\"you had better spin, perhaps you can do that better.\"</b> You sit down and try, but the hard thread soon cuts your soft fingers so that the blood runs down. <b>\"See,\"</b> says he, <b>\"you are fit for no sort of work. I have made a bad bargain with you. Now I will try to make a business with pots and earthenware; you must sit in the market-place and sell the ware.\"</b>");
},
function () {
var F = gmmQ("thrush");
if (F.n !== 3 || !F.w || !F.w.baskets || !F.w.spin) {
setStatus("🏺 " + (F.n === 3 ? "<i>Weave the baskets and try the spinning in the hut first.</i>" : gmmThrushWhere(F.n)));
return;
}
setStatus("🏺 People gladly buy the pretty woman's goods, and pay what she asks; many give the money and leave the pots. You live on what you earn as long as it lasts, and he buys a lot of new crockery. You sit with it at the corner of the market...");
setTimeout(function () {
(GMM.thrushPots || []).forEach(function (p, i) { p.position.y -= 0.6 + (i % 3) * 0.1; p.rotation.z = 1.2 + (i % 4) * 0.4; });
F.n = 4;
setStatus("🐎 Suddenly a drunken hussar comes galloping along, rides right amongst the pots, and they are all broken into a thousand bits. You begin to weep, and do not know what to do for fear. <b>\"Who would ever sit down at a corner of the market-place with crockery?\"</b> says the fiddler. <b>\"Leave off crying, I see very well that you cannot do any ordinary work, so I have been to our king's palace and asked whether they cannot find a place for a kitchen-maid.\"</b> " + gmmThrushWhere(4));
setTimeout(function () { (GMM.thrushPots || []).forEach(function (p, i) { p.position.y += 0.6 + (i % 3) * 0.1; p.rotation.z = 0; }); }, 60000);
}, 3500);
},
function () {
var F = gmmQ("thrush");
if (F.n !== 4) {
setStatus("🍲 Scraps of the feast. " + gmmThrushWhere(F.n));
return;
}
F.n = 5;
setStatus("🫙 You fasten a little jar in each of your pockets, and put in them what is left over, to carry home. It is the day of the king's eldest son's wedding. You go up and stand by the door of the hall to look on: the candles are lit, the people come in, each more beautiful than the other. You think of your lot with a sad heart, and curse the pride and haughtiness that humbled you. " + gmmThrushWhere(5));
if (GMM.room && GMM.room.k === "thrushkitchen")
setTimeout(function () { gmmLeaveRoom(GMM.room); }, 2200);
var H = GMM_ROOMS.thrushhall;
if (H && !H.thrushOn) {
H.thrushOn = 1;
var prev = H.onEnter;
H.onEnter = function (R) { if (prev)
prev(R); gmmThrushDance(); };
}
},
function () {
var F = gmmQ("thrush");
if (F.n !== 5)
return;
F.n = 0;
setTimeout(function () { gmmReward("thrush", "💃 The king's son comes in, clothed in velvet and silk, with gold chains about his neck. He sees the beautiful woman at the door, seizes you by the hand, and would dance with you; but you refuse and shrink with fear, for you see it is <b>King Thrushbeard</b>. He draws you into the hall; the string tears that held your pockets, the pots fall down, the soup runs out and the scraps scatter all about. Everyone laughs and jeers. You spring to the door to run away, but on the stairs a man catches you and brings you back; and it is King Thrushbeard again. <b>\"Do not be afraid, I and the fiddler who has been living with you in that wretched hovel are one. For love of you I disguised myself so; and I also was the hussar who rode through your crockery. This was all done to humble your proud spirit, and to punish you for the insolence with which you mocked me.\"</b> You weep: <b>\"I have done great wrong, and am not worthy to be your wife.\"</b> <b>\"Be comforted, the evil days are past; now we will celebrate our wedding.\"</b> <i>(Grimm, 1857: I wish you and I had been there too.)</i>"); }, 1200);
},
function (n) { return ["<i>Little Brother is thirsty. Go to the first brook, by its mossy stone, north of the little house.</i>", "<i>Go on to the next brook.</i>", "<i>Go on to the third brook.</i>", "<i>Lead the fawn to the little house in the wood, and go in.</i>", "<i>The king's hunt is in the wood. Stand by the little door.</i>", "<i>Go to the king's castle, and through to the nursery, at midnight.</i>", "<i>The tale is told.</i>"][n] || ""; },
function (i) {
var F = gmmQ("brosis");
if (F.n !== i) {
setStatus("💧 " + (F.n > i && F.n < 4 ? "You have passed this brook." : "") + " " + gmmBSWhere(F.n));
return;
}
var B = GMM.bsBrooks[i], says = B[2], warn = ["\"Pray, dear brother, do not drink, or you will become a wild beast, and tear me to pieces.\"", "\"Pray, dear brother, do not drink, or you will become a wolf, and devour me.\"", "\"Oh, I pray you, dear brother, do not drink, or you will become a roebuck, and run away from me.\""][i];
if (i === 0)
setStatus("🌧️ <b>\"Since our mother died we have had no happiness; our stepmother beats us every day.\"</b> You ran away together, and in the forest it rained; <b>\"Heaven and our hearts are weeping together.\"</b> Now your brother is thirsty, but the wicked stepmother is a witch, and has crept after you and bewitched all the brooks in the forest.");
gmmCard("💧 A little brook", "Little Brother and Little Sister", "It murmurs as it runs: <b>\"Who drinks of me will be a " + says + "; who drinks of me will be a " + says + ".\"</b>", [
[warn.replace(/"/g, ""), "hold him back", function () {
if (i < 2) {
F.n = i + 1;
setStatus("🧒 <b>\"" + (i === 0 ? "I will wait for the next spring." : "I will wait until we come to the next spring, but then I must drink, say what you like; for my thirst is too great.") + "\"</b> " + gmmBSWhere(F.n));
return;
}
F.n = 3;
var fawn = GMM.bsFawn, L = worldLocal();
if (fawn) {
fawn.position.set(L.x + 1.5, gmmGround(L.x + 1.5, L.z + 1.5), L.z + 1.5);
gmmFollow(fawn, 2.2);
}
setStatus("🦌 But he has already knelt down, bent over and drunk, and as soon as the first drops touch his lips he lies there <b>a young roebuck</b>. You weep over your poor bewitched brother, and the little roe weeps too, and sits sorrowfully near you. <b>\"Be quiet, dear little roe, I will never, never leave you.\"</b> You untie your golden garter and put it round his neck, and plait a soft cord of rushes, and lead him on, deeper into the forest. " + gmmBSWhere(3));
}]
]);
},
function () {
var F = gmmQ("brosis");
if (F.n === 3) {
F.n = 4;
gmmFollowClear();
if (GMM.bsFawn) {
GMM.bsFawn.visible = true;
}
setStatus("🏠 A little house, empty, as if made for you. <b>\"We can stay here and live.\"</b> You gather leaves and moss for a soft bed for the roe; every morning you go out for roots, berries and nuts, and bring the roe tender grass, which he eats out of your hand. So you live a long while in the wilderness. Then one day the king of the country holds a great hunt in the forest. The roe hears the horns and the barking of dogs and the merry shouts: <b>\"Oh, let me be off to the hunt, I cannot bear it any longer.\"</b> " + gmmBSWhere(4));
return;
}
if (F.n === 4) {
F.h = (F.h || 0) + 1;
if (F.h === 1) {
setStatus("📯 You let him out. <b>\"But you must be here again in the evening; I shall shut my door against the rough huntsmen, so knock and say, 'My little sister, let me in!'\"</b> All day he leads the hunters a chase. In the evening: <b>\"My little sister, let me in.\"</b> The door opens, he jumps in, and rests all night on his soft bed. <i>(Stand at the door again: the hunt goes on tomorrow.)</i>");
return;
}
if (F.h === 2) {
setStatus("🩸 Next day the hunt begins again. A huntsman wounds the roe a little in the foot, so that he limps; another creeps after him to the little house and hears him say <b>\"My little sister, let me in,\"</b> and sees the door open. The king says: <b>\"To-morrow we will hunt once more.\"</b> You wash the blood off, lay herbs on the wound: <b>\"Go to your bed, dear roe, that you may get well again.\"</b> <i>(Stand at the door again.)</i>");
return;
}
F.n = 5;
F.h = 0;
if (GMM.bsFawn)
GMM.bsFawn.visible = false;
setStatus("👑 <b>\"This time they will kill you, and here am I alone in the forest and forsaken by all the world. I will not let you out.\"</b> <b>\"Then you will have me die of grief; when I hear the bugle-horns I feel as if I must jump out of my skin.\"</b> You let him out. Then the king himself goes to the little house: <b>\"Dear little sister, let me in.\"</b> The door opens, and the king steps in, and there stands a maiden more lovely than any he has ever seen. <b>\"Will you go with me to my palace and be my dear wife?\"</b> <b>\"Yes, but the little roe must go with me, I cannot leave him.\"</b> <br>The witch hears of your happiness. When you bear a son, she comes in the form of a chambermaid: <b>\"Come, the bath is ready; it will do you good.\"</b> She has made such a fire under the bath that you are soon suffocated. She puts her own ugly one-eyed daughter in your bed with the curtains drawn. " + gmmBSWhere(5));
return;
}
setStatus("🚪 The little house in the wood. " + gmmBSWhere(F.n));
},
function (R) {
var F = gmmQ("brosis");
if (F.n !== 5) {
setStatus("🌙 A cradle, a sleeping child. " + gmmBSWhere(F.n));
return;
}
F.m = (F.m || 0) + 1;
var G = R.ghost;
if (G)
G.g.visible = true;
var line = ["How fares my child, how fares my roe? Twice shall I come, then never more.", "How fares my child, how fares my roe? Once will I come, then never more.", "How fares my child, how fares my roe? This time I come, then never more."][Math.min(2, F.m - 1)];
if (F.m < 3) {
setStatus("🌙 At midnight the door opens and the true queen walks in. She takes the child from the cradle, lays it on her arm and suckles it, shakes up its pillow, lays it down again, and covers it with its quilt. She does not forget the roe, but goes into the corner where it lies and strokes its back. Then she goes silently out. <b>\"" + line + "\"</b> <i>(The nurse tells the king. Keep watch again.)</i>");
setTimeout(function () { if (G)
G.g.visible = false; }, 6000);
return;
}
F.n = 0;
F.m = 0;
setTimeout(function () { if (G)
G.g.visible = false; gmmReward("brosis", "👑 The king cannot restrain himself; he springs towards her: <b>\"You can be none other than my dear wife.\"</b> <b>\"Yes, I am your dear wife,\"</b> and at the same moment she receives life again, and by God's grace is fresh, rosy, and full of health. She tells the king the evil deed the wicked witch and her daughter did. <i>(Grimm, 1857: the king ordered both to be led before the judge, and judgement was delivered against them. The daughter was taken into the forest where she was torn to pieces by wild beasts, but the witch was cast into the fire and miserably burnt. And as soon as she was burnt the roebuck changed his shape, and received his human form again, so the sister and brother lived happily together all their lives.)</i>"); }, 1500);
setStatus("🌙 <b>\"" + line + "\"</b>");
},
function (n) { return ["<i>Go into the sick king's castle, to his bedside.</i>", "<i>On the road there is a dwarf.</i>", "<i>Ride on to the enchanted castle with the iron door and the two lions, north of here.</i>", "<i>Find your brothers: they are shut in a ravine between two mountains, east of the king's castle.</i>", "<i>The king, deceived, has sent you into the forest with his huntsman. Go and ask him what ails him (west of the castle).</i>", "<i>A year has passed. Ride up the golden road to the princess's castle, south of here.</i>", "<i>The tale is told.</i>"][n] || ""; },
function () {
var F = gmmQ("water");
if (F.n !== 0) {
setStatus("🛏️ The king lies sick. " + gmmWaterWhere(F.n));
return;
}
F.n = 1;
setStatus("🛏️ An old man in the garden told your brothers: <b>\"I know of one more remedy, and that is the water of life; if he drinks of it he will become well again; but it is hard to find.\"</b> Your eldest brother went first, then the second, thinking each <b>\"If I bring the water, then I shall be best beloved of my father, and shall inherit the kingdom.\"</b> Neither came back. <b>\"Father, let me go forth to seek the water,\"</b> you say, and at last the king lets you go. " + gmmWaterWhere(1));
},
function () {
var F = gmmQ("water");
if (F.n !== 1) {
setStatus("🧔 The dwarf watches the road. " + gmmWaterWhere(F.n));
return;
}
gmmCard("🧔 \"Whither away so fast?\"", "The Water of Life", "The dwarf stands by the road. Your brothers answered him: <b>\"Silly shrimp, that is nothing to thee,\"</b> and he cursed them into a ravine.", [
["\"That is nothing to thee\"", "as your proud brothers did", function () { setStatus("🏔️ The dwarf is angry, and wishes an evil wish: the road narrows between two mountains, and you can go neither forward nor back. <i>(That was the elder brothers' road. Try again.)</i>"); }],
["Stop and answer him kindly", "\"I am seeking the water of life, for my father is sick unto death.\"", function () {
F.n = 2;
setStatus("🗝️ <b>\"Because thou hast borne thyself as is seemly, and art not haughty like thy false brothers, I will give thee the information and tell thee how thou mayst obtain the water of life. It springs from a fountain in the courtyard of an enchanted castle, but thou wilt not be able to make thy way to it if I do not give thee an iron wand and two small loaves of bread. Strike thrice with the wand on the iron door of the castle and it will spring open: inside lie two lions with gaping jaws, but if thou throwest a loaf to each of them, they will be quieted. Then hasten to fetch some of the water of life before the clock strikes twelve, else the door will shut again, and thou wilt be imprisoned.\"</b> " + gmmWaterWhere(2));
}]
]);
},
function () {
var F = gmmQ("water");
if (F.n < 2) {
setStatus("🚪 An iron door, two lions with gaping jaws. " + gmmWaterWhere(F.n));
return;
}
if (F.n > 2) {
setStatus("🚪 The iron door is shut fast now.");
return;
}
if (GMM.run && GMM.run.k === "water") {
if (!GMM.room)
gmmEnterRoom("waterhall", GMM.waterDoor);
setStatus("🚪 The iron door stands open until the clock strikes twelve.");
return;
}
setStatus("🚪 You strike three times with the iron wand. The door springs open. You throw a loaf to each lion, and they are quiet...");
setTimeout(function () {
gmmEnterRoom("waterhall", GMM.waterDoor);
GMM.run = { k: "water", t: 120, tick: function (dt) { var R = GMM.run; R.t -= dt; if (R.t <= 0) {
GMM.run = null;
var Fq = gmmQ("water");
if (Fq.fill) {
setStatus("🕛 The clock strikes twelve! You spring out of the iron door just as it shuts, so violently that it takes away a piece of your heel. " + gmmWaterWhere(3));
if (GMM.room && GMM.room.k === "waterhall")
gmmOutside(GMM.waterDoor);
Fq.n = 3;
}
else {
setStatus("🕛 The clock strikes twelve and the iron door shuts. <i>(Strike it again with the wand: the dwarf said hasten, before twelve.)</i>");
if (GMM.room && GMM.room.k === "waterhall")
gmmOutside(GMM.waterDoor);
}
} } };
}, 1200);
},
function (R) { var F = gmmQ("water"); if (F.n !== 2) {
return setStatus("🗡️ The sword and the bread are yours already.");
} F.sword = 1; setStatus("🗡️ You take the rings from the enchanted princes' fingers, and the sword and the loaf from the table. Further in, the princess: she kisses you and says you have set her free, and if you come back in a year your wedding shall be celebrated. <i>Now the fountain, before twelve!</i>"); },
function (R) {
var F = gmmQ("water");
if (F.n !== 2) {
return setStatus("💧 The fountain.");
}
if (!F.sword) {
setStatus("💧 <i>The sword and the bread on the table first: the dwarf said take them.</i>");
return;
}
F.fill = 1;
setStatus("💧 You draw the Water of Life in a cup. You are so tired that you lie down on a bed for a while... and when you wake it is a quarter to twelve. <b>Hurry out!</b>");
if (GMM.run && GMM.run.k === "water")
GMM.run.t = Math.min(GMM.run.t, 6);
},
function () {
var F = gmmQ("water");
if (F.n !== 3) {
setStatus("🏔️ A ravine between two mountains. " + gmmWaterWhere(F.n));
return;
}
F.n = 4;
setStatus("🏔️ <b>\"Dear dwarf, canst thou not tell me where my two brothers are?\"</b> <b>\"They are imprisoned between two mountains. I have condemned them to stay there, because they were so haughty. Beware of them, for they have bad hearts.\"</b> You beg them free, and ride home together. On the way you lend your sword and bread to three kingdoms, one after another, laid waste by war and famine: with the sword the kings slay whole armies, and the bread feeds their people. Then you take ship across the sea, and while you sleep your brothers pour the Water of Life into their own cup and fill yours with <b>bitter sea-water</b>. <br>At home your father drinks from your cup and grows sicker than before; your brothers give him the true water, and he is well. They mock you: <b>\"Well, brother, you found the water of life, but you have had the trouble and we the gain.\"</b> The king, believing you meant to poison him, has the court decide that you are to be secretly shot. " + gmmWaterWhere(4));
},
function () {
var F = gmmQ("water");
if (F.n !== 4) {
setStatus("🏹 The king's huntsman. " + gmmWaterWhere(F.n));
return;
}
F.n = 5;
setStatus("🏹 <b>\"Dear huntsman, what ails you?\"</b> <b>\"I cannot tell you, and yet I ought.\"</b> <b>\"Say openly what it is, I will pardon you.\"</b> <b>\"Alas! I am to shoot you dead; the King has ordered me to do it.\"</b> You change clothes with him, he goes home, and you go deeper into the forest. Then wagons come to the king with gold and precious stones from the three kings whose lands you saved. <b>\"Can my son have been innocent?\"</b> <b>\"Would that he were still alive, how it grieves me that I have suffered him to be killed!\"</b> <b>\"He still lives,\"</b> says the huntsman. A year has gone by. The princess has had a road made before her castle, all shining and golden: whoever rides straight up the middle of it is the right one. " + gmmWaterWhere(5));
},
function () {
var F = gmmQ("water");
if (F.n !== 5) {
setStatus("✨ A road of pure shining gold. " + gmmWaterWhere(F.n));
return;
}
F.n = 0;
F.fill = 0;
F.sword = 0;
gmmReward("water", "✨ Your eldest brother rode up, saw the golden road, and thought it a sin to ride on it, so he turned aside to the right; the second turned aside to the left. Both were sent away. But you, thinking only of the princess, ride <b>straight up the middle</b> of it and never notice that it is gold. The gates open, she receives you with joy, says you are her deliverer and lord of the kingdom, and the wedding is held with great rejoicing. Then you go to your father and tell him everything: how your brothers betrayed you, and how you bore it all in silence. <i>(Grimm, 1857: the old king wished to punish them, but they had put to sea and sailed away, and never came back as long as they lived.)</i>");
},
function (n) { return ["<i>Ask your master for your wages, in his house at the top of the lane.</i>", "<i>Walk the lane home. A horseman is coming.</i>", "<i>Down the lane: a countryman driving a cow.</i>", "<i>Further on: a butcher with a young pig.</i>", "<i>Further: a lad with a white goose.</i>", "<i>By the last village: a scissors-grinder at his wheel.</i>", "<i>A well by the field. You are so thirsty.</i>", "<i>Go in at your mother's door, at the end of the lane.</i>", "<i>The tale is told.</i>"][n] || ""; },
function (R, gold) {
var F = gmmQ("hans");
if (F.n !== 0) {
setStatus("💰 " + gmmHansWhere(F.n));
return;
}
F.n = 1;
if (gold)
gold.visible = false;
setStatus("💰 <b>\"You have served me faithfully and honestly; as the service was so shall the reward be,\"</b> and your master gives you <b>a piece of gold as big as your head</b>. You pull your handkerchief out of your pocket, wrap up the lump in it, put it on your shoulder, and set out on the way home. " + gmmHansWhere(1));
},
function (i) {
var F = gmmQ("hans"), need = i + 1;
if (F.n !== need) {
setStatus("👋 " + gmmHansWhere(F.n));
return;
}
var C = [
["🐎 The horseman", "\"Hollo! Hans, why do you go on foot, then?\" \"I have this lump to carry home; it is true that it is gold, but I cannot hold my head straight for it, and it hurts my shoulder.\" \"I will tell you what, we will exchange: I will give you my horse, and you can give me your lump.\"", "Swap the gold for the horse", "🐎 You mount, the rider takes the gold. <i>Click your tongue and call 'Jup! Jup!'</i> ...and the horse sets off at a sharp trot, and before you know it you are thrown into a ditch. The horse would have gone off too if a countryman, coming along with a cow, had not stopped it. <b>\"It is a poor joke, this riding, especially when one gets on a mare like this, that kicks and throws one off.\"</b>"],
["🐄 The countryman with the cow", "\"Now a cow: one can walk quietly behind her, and have one's milk, butter and cheese every day without fail. What would I not give to have such a cow!\" \"Well,\" says the countryman, \"if it would give you so much pleasure, I do not mind giving the cow for the horse.\"", "Swap the horse for the cow", "🐄 <b>\"If only I have a morsel of bread, and that can hardly fail me, I can eat butter and cheese with it as often as I like; if I am thirsty, I can milk my cow and drink the milk. Good heart, what more can I want?\"</b> At an inn you eat up all your food and spend your last farthing on beer. Then, on the hot heath at noon, you try to milk the cow; no milk comes, and she gives you such a blow on the head with her hind foot that you tumble to the ground and lie there dazed."],
["🐖 The butcher with the pig", "\"Take a drink and refresh yourself. The cow will certainly give no milk, it is an old beast; at the best it is only fit for the plough, or for the butcher.\" \"Well, well,\" says Hans, \"who would have thought it? ...But I do not care much for cow's flesh, it is not juicy enough. A young pig like that now is the thing to have, it tastes quite different; and then there are the sausages!\" \"Listen, Hans, out of love for you I will exchange, and will let you have the pig for the cow.\"", "Swap the cow for the pig", "🐖 <b>\"Heaven repay you for your kindness!\"</b> You hand over the cow, take the pig off the barrow and lead it away by its cord. How everything goes just as you wish!"],
["🪿 The lad with the goose", "\"Feel how heavy she is: she has been fattened up for the last eight weeks.\" Then, looking about: \"Listen, with your pig it may not be quite all right. In the village through which I passed, the mayor himself had just had one stolen out of his sty. I fear, I fear that you have got hold of it there. They have sent out some people, and it would be a bad business if they caught you with the pig; at the very least you would be shut up in the dark hole.\" \"Help me out of this fix; you know more about this place than I do, take my pig and leave me your goose.\"", "Swap the pig for the goose", "🪿 <b>\"When I think over it properly, I have gained by the exchange: first there is the good roast-meat, then the quantity of fat which will drip from it, and which will give me dripping for my bread for a quarter of a year, and lastly the beautiful white feathers; I will have my pillow stuffed with them.\"</b> The lad hurries off with the pig by a side-path."],
["🪨 The scissors-grinder", "\"I sharpen scissors and quickly grind, my coat blows out in the wind behind.\" ... \"You have known how to look after yourself each time. If you can only get on so far as to hear the money jingle in your pocket whenever you stand up, you will have made your fortune. A grinder like me can always earn. Give me the goose, and I'll give you a grindstone; it is a little worn, but you shall have it.\" And an ordinary heavy stone from the field besides: \"You can hammer well upon it, and straighten your old nails.\"", "Swap the goose for the grindstone and the stone", "🪨 <b>\"I must have been born with a caul,\"</b> you cry, your eyes shining with joy. <b>\"Everything I want happens to me just as if I were a Sunday-child.\"</b> But you have been on your feet since dawn and begin to feel tired, and hungry too; the stones weigh you down terribly."]
][i];
gmmCard(C[0], "Hans in Luck", esc(C[1]).replace(/&quot;/g, "\""), [[C[2], "", function () { F.n = need + 1; if (i < 4)
gmmHansCarry(i);
else {
GMM.follow.forEach(function (Fl) { if (Fl.g)
Fl.g.visible = false; });
GMM.follow = [];
} setStatus(C[3] + " " + gmmHansWhere(F.n)); }], ["Keep what you have", "", function () { setStatus("🤔 Hans never thought twice. (Ask again.)"); }]]);
},
function () {
var F = gmmQ("hans");
if (F.n !== 6) {
setStatus("💧 A well by the field. " + gmmHansWhere(F.n));
return;
}
F.n = 7;
setStatus("💧 You drag yourself to the well to rest and refresh yourself with a cool draught. You lay the stones carefully on the edge beside you, so as not to damage them; then you bend down to drink... and you push against them a little, and <b>both stones fall into the water</b>. You see them sink with your own eyes, jump for joy, kneel down, and with tears in your eyes thank God for having shown you this favour also, and delivered you so well from the heavy stones, which alone had hindered you. <b>\"There is no man under the sun so fortunate as I.\"</b> " + gmmHansWhere(7));
},
function () {
var F = gmmQ("hans");
if (F.n !== 7) {
setStatus("🏡 " + gmmHansWhere(F.n));
return;
}
F.n = 0;
gmmReward("hans", "🏡 With a light heart and free from every burden, you run on until you are at home with your mother. <i>(Grimm, 1857: so ends Hans im Glück. Seven years of wages, gone by five fair swaps and a well; and no man under the sun so fortunate.)</i>");
},
function (n) { return ["<i>Go into the rich man's house. Upstairs there is a chest of apples with a great heavy lid.</i>", "<i>Under the table are the bones the father threw there.</i>", "<i>Lay the silk handkerchief under the juniper-tree in the court.</i>", "<i>The bird has flown to the goldsmith's roof, west along the street.</i>", "<i>The bird has flown to the shoemaker's roof, east along the street.</i>", "<i>The bird has flown to the mill and the lime-tree, south of the house.</i>", "<i>The bird is flying home, to the juniper-tree.</i>", "<i>The tale is told.</i>"][n] || ""; },
function () {
var F = gmmQ("juniper");
if (F.n !== 0) {
setStatus("🍎 The chest of red apples, its great heavy lid and its sharp iron lock. " + gmmJunWhere(F.n));
return;
}
gmmCard("🍎 The chest of apples", "The Juniper-Tree", "It is long ago, quite two thousand years. A rich man's wife, paring an apple under the juniper-tree in winter, cut her finger, and the blood fell on the snow: <b>\"Ah, if I had but a child as red as blood and as white as snow!\"</b> She had a little son so, and when she saw him she was so delighted that she died, and was buried under the juniper-tree. The second wife had a daughter, Marlinchen, and hated the little boy, who stood in the way of her daughter's fortune.", [
["Read on, as the brothers wrote it", "the dark part", function () {
F.n = 1;
setStatus("🍎 <b>\"Mother,\"</b> says Marlinchen, <b>\"give me an apple.\"</b> ... <b>\"Is brother not to have one too?\"</b> When the woman sees from the window that he is coming, it is as if the Devil entered into her. <b>\"My son, wilt thou have an apple?\"</b> <b>\"Mother, how dreadful you look! Yes, give me an apple.\"</b> She opens the lid: <b>\"Take out an apple for thyself,\"</b> and while the little boy is stooping inside, <b>crash! she shuts the lid down, and his head flies off and falls among the red apples.</b> She ties the head on again with a white handkerchief and sets him on a chair by the door with an apple in his hand. Marlinchen asks him for the apple and he does not answer; her mother tells her to box his ears, and his head falls off. <b>\"Alas, mother, I have knocked my brother's head off!\"</b> <b>\"Be quiet and let no one know it; it cannot be helped now, we will make him into black-puddings.\"</b> Marlinchen weeps, and her tears fall into the pan, and there is no need of any salt. The father comes home: <b>\"But where is my son?\"</b> ... <b>\"Ah, wife, how delicious this food is, give me some more.\"</b> He eats it all, and throws the bones under the table. " + gmmJunWhere(1));
}],
["Close the lid and go", "", function () { setStatus("🍎 The lid comes down heavily. Some tales are hard to hear."); }]
]);
},
function () { var F = gmmQ("juniper"); if (F.n !== 1) {
setStatus("🍽️ " + gmmJunWhere(F.n));
return;
} F.n = 2; setStatus("🤍 Marlinchen goes to her chest of drawers, takes her best silk handkerchief out of the bottom drawer, gathers all the bones from beneath the table, ties them up in it, and carries them outside the door, <b>weeping tears of blood</b>. " + gmmJunWhere(2)); },
function () {
var F = gmmQ("juniper"), A = GMM_AT.juniper;
if (F.n === 2) {
F.n = 3;
gmmJunBirdTo(A.x - 5, A.z - 6, 9);
setTimeout(function () { gmmJunBirdTo(A.x - 30, A.z + 20, 9); }, 8000);
setStatus("🌲 You lay the handkerchief down. The juniper-tree begins to stir; its branches part and move together again, just as if someone were rejoicing and clapping his hands. A mist rises from the tree, and in the centre of the mist it burns like a fire, and <b>a beautiful bird flies out of the fire</b>, singing magnificently. When it is gone the tree is as it was, and the handkerchief and bones are no longer there. Marlinchen is as happy as if her brother were still alive. " + gmmJunWhere(3));
return;
}
if (F.n === 6) {
F.n = 0;
gmmJunBirdTo(A.x - 5, A.z - 6, 9);
setStatus("🐦 The bird sits on the juniper-tree and sings: <b>\"My mother she killed me,\"</b> and the mother stops her ears, and there is a roaring in them like the most violent storm. <b>\"My father he ate me,\"</b> <b>\"Ah, mother, that is a beautiful bird! He sings so splendidly, and the sun shines so warm, and there is a smell just like cinnamon.\"</b> The father goes out, and the golden chain falls exactly round his neck. Marlinchen goes out, and the red shoes fall at her feet; she dances and leaps into the house.");
setTimeout(function () { gmmReward("juniper", "🪨 <b>\"I feel as if the world were coming to an end! I, too, will go out and see if my heart feels lighter,\"</b> says the woman, her hair standing up like flames of fire. And as she goes out at the door, <b>crash! the bird throws down the millstone on her head, and she is entirely crushed by it.</b> The father and Marlinchen hear it and go out, and smoke, flames and fire are rising from the place; and when that is over, <b>there stands the little brother</b>, and he takes his father and Marlinchen by the hand, and all three are right glad, and they go into the house to dinner, and eat. <i>(Grimm, 1857: Von dem Machandelboom, written down in Low German by the painter Philipp Otto Runge.)</i>"); if (GMM.junBird)
GMM.junBird.visible = false; }, 6000);
return;
}
setStatus("🌲 The juniper-tree, dark and sweet-smelling. " + gmmJunWhere(F.n));
},
function () {
var F = gmmQ("juniper");
if (F.n !== 3) {
setStatus("🏠 The goldsmith's. " + gmmJunWhere(F.n));
return;
}
F.n = 4;
var A = GMM_AT.juniper;
setTimeout(function () { gmmJunBirdTo(A.x + 30, A.z + 20, 9); }, 6000);
setStatus("⛓️ The bird lights on the goldsmith's roof and sings: <b>" + GMM_JUNSONG + "</b> The goldsmith runs out with one slipper off, the chain in one hand and the pincers in the other. <b>\"Bird, how beautifully thou canst sing! Sing me that piece again.\"</b> <b>\"No, I'll not sing it twice for nothing! Give me the golden chain.\"</b> He gives it; the bird takes it in his right claw and sings again. " + gmmJunWhere(4));
},
function () {
var F = gmmQ("juniper");
if (F.n !== 4) {
setStatus("🏠 The shoemaker's. " + gmmJunWhere(F.n));
return;
}
F.n = 5;
var A = GMM_AT.juniper;
setTimeout(function () { gmmJunBirdTo(A.x - 4, A.z + 50, 10); }, 6000);
setStatus("👞 On the shoemaker's roof: <b>" + GMM_JUNSONG + "</b> The shoemaker runs out in his shirt-sleeves, shading his eyes from the sun, and calls his wife, children and apprentices to look at the bird's red and green feathers, his neck like real gold, his eyes shining like stars. <b>\"Nay, I do not sing twice for nothing.\"</b> <b>\"Wife, go to the garret, upon the top shelf there stands a pair of red shoes, bring them down.\"</b> The bird takes the shoes in his left claw. " + gmmJunWhere(5));
},
function () {
var F = gmmQ("juniper");
if (F.n !== 5) {
setStatus("🪨 <i>klipp klapp, hick hack.</i> Twenty miller's men hewing a stone. " + gmmJunWhere(F.n));
return;
}
F.n = 6;
var A = GMM_AT.juniper, st = GMM.junStone;
if (st)
st.visible = false;
setTimeout(function () { gmmJunBirdTo(A.x - 5, A.z - 6, 9); }, 9000);
setStatus("🪨 The mill goes <i>klipp klapp</i>, and the twenty miller's men hew the stone, <i>hick hack</i>. The bird sits on the lime-tree: <b>\"My mother she killed me,\"</b> one stops working; <b>\"My father he ate me,\"</b> two more; <b>\"My sister, little Marlinchen,\"</b> four more; <b>\"Gathered together all my bones, tied them in a silken handkerchief,\"</b> eight only are hewing; <b>\"Laid them beneath,\"</b> five; <b>\"The juniper-tree,\"</b> one; <b>\"Kywitt, kywitt, what a beautiful bird am I!\"</b> and the last stops too. <b>\"Give me the millstone, and then I will sing it again.\"</b> The twenty millers raise it with a beam, and the bird sticks his neck through the hole, wears it like a collar, and with the chain in his right claw and the shoes in his left he flies far away, to his father's house. " + gmmJunWhere(6));
setTimeout(function () { if (st)
st.visible = true; }, 90000);
},
function (who) {
var list = who === "dorothea" ? GMM_TALES.slice(0, 16) : GMM_TALES.slice(14), b = "", fns = {};
list.forEach(function (T, i) { var id = "t" + i; b += worldBtn(id, T[2], "No. " + T[0] + " · " + T[1]); fns[id] = function () { gmmTaleOne(T, who); }; });
var intro = who === "dorothea" ? "Dorothea Viehmann settles in her chair. <b>\"Which one shall it be?\"</b> She tells them slowly, the same words every time, so the brothers can write them down." : "Pages in Jacob's small hand and Wilhelm's round one, tales written down from the people of Kassel and the country round.";
worldCard(worldFacts(who === "dorothea" ? "🧓 Dorothea Viehmann's tales" : "📜 The brothers' manuscripts", "Kinder- und Hausmärchen", [], []) + "<div style='margin:6px 0 10px;line-height:1.5'>" + intro + "</div>" + b, fns);
},
function (cb) {
if (GMM.book)
return cb(GMM.book);
setStatus("📖 Opening the book...");
fetch("data/grimm/tales.json").then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); }).then(function (d) { GMM.book = d; cb(d); })
.catch(function () { setStatus("📖 The book won't open just now (no connection?). Try again in a moment."); });
},
function (n, page) {
gmmBookLoad(function (B) {
if (n !== undefined && n !== null) {
var i = -1;
B.tales.forEach(function (t, j) { if (String(t.n) === String(n))
i = j; });
if (i >= 0)
return gmmBookTale(i);
}
var per = 20, p = page || 0, pages = Math.ceil(B.tales.length / per), b = "", fns = {};
B.tales.slice(p * per, p * per + per).forEach(function (t, k) { var id = "b" + k, j = p * per + k; b += worldBtn(id, (typeof t.n === "number" ? t.n + ". " : "Legend " + String(t.n).slice(1) + ". ") + t.t, ""); fns[id] = function () { gmmBookTale(j); }; });
if (p > 0) {
b += worldBtn("prev", "◀ Earlier pages", "");
fns.prev = function () { gmmBook(null, p - 1); };
}
if (p < pages - 1) {
b += worldBtn("next", "Later pages ▶", "");
fns.next = function () { gmmBook(null, p + 1); };
}
b += worldBtn("first", "📜 The first edition: 1812 and 1815", "All the tales as first printed (155 of 156), in the brothers' German, with their notes");
fns.first = function () { gmmBook1812(); };
worldCard(worldFacts("📖 Household Tales", "by the Brothers Grimm · contents, page " + (p + 1) + " of " + pages, [], []) + "<div style='margin:6px 0 10px;line-height:1.45;font-size:.92em'>All 200 tales and the 10 children's legends of the last edition (1857), in Margaret Hunt's English translation (1884), complete and as written, dark parts and all. " + esc(B.src || "") + " Two tales are left out of this copy for the hatred of Jews in them (No. 7 and No. 110).</div>" + b, fns);
});
},
function (i) {
var B = GMM.book;
if (!B)
return;
var t = B.tales[i];
if (!t)
return gmmBook();
var body = t.p.map(function (p) { return "<p style='margin:0 0 .8em;line-height:1.6'>" + esc(p) + "</p>"; }).join("");
var b = "", fns = {};
if (i < B.tales.length - 1) {
b += worldBtn("nx", "Next tale ▶", B.tales[i + 1].t);
fns.nx = function () { gmmBookTale(i + 1); };
}
if (i > 0) {
b += worldBtn("pv", "◀ Previous tale", B.tales[i - 1].t);
fns.pv = function () { gmmBookTale(i - 1); };
}
b += worldBtn("ct", "Contents", "");
fns.ct = function () { gmmBook(null, Math.floor(i / 20)); };
worldCard(worldFacts("📖 " + t.t, typeof t.n === "number" ? "Household Tales, No. " + t.n : "Children's Legend " + String(t.n).slice(1), [], []) + "<div style='max-height:58vh;overflow-y:auto;margin:6px 0 10px;padding-right:6px'>" + body + "</div>" + b, fns);
},
function (cb) {
if (GMM.book1812)
return cb(GMM.book1812);
setStatus("📜 Opening the first edition...");
fetch("data/grimm/tales-1812.json").then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); }).then(function (d) { GMM.book1812 = d; cb(d); })
.catch(function () { setStatus("📜 The first edition won't open just now (no connection?). Try again in a moment."); });
},
function (v, page) {
gmmBook1812Load(function (B) {
if (v === undefined || v === null) {
var b0 = "", f0 = {};
B.vols.forEach(function (V, i) { var id = "v" + i; b0 += worldBtn(id, "Band " + V.vol + " (" + V.year + ")", V.tales.length + " tales" + (V.year === 1812 ? ", published at Christmas 1812 in Berlin" : ", published in 1815")); f0[id] = function () { gmmBook1812(i, 0); }; });
b0 += worldBtn("later", "📖 The last edition (1857) in English", "Margaret Hunt's translation, 208 tales");
f0.later = function () { gmmBook(); };
worldCard(worldFacts("📜 Kinder- und Hausmärchen", "the first edition · gesammelt durch die Brüder Grimm", [], []) + "<div style='margin:6px 0 10px;line-height:1.5;font-size:.92em'>The tales as the brothers first printed them, before Wilhelm rewrote them over six more editions: rougher, shorter, sometimes darker, and full of tales that were later taken out (Bluebeard, Puss in Boots, How Children Played Butcher with Each Other, Hans Dumm, the Hand with the Knife...). In the Grimms' own German of 1812, with their notes on where each tale came from. One tale of the 156 is left out of this copy, Der Jud' im Dorn (1815, No. 24), for its hatred of Jews, as No. 110 is in the later book. " + esc(B.src || "") + "</div>" + b0, f0);
return;
}
var V = B.vols[v], per = 20, p = page || 0, pages = Math.ceil(V.tales.length / per), b = "", fns = {};
V.tales.slice(p * per, p * per + per).forEach(function (t, k) { var id = "t" + k, j = p * per + k; b += worldBtn(id, (t.n ? t.n + ". " : "") + t.t, ""); fns[id] = function () { gmmBook1812Tale(v, j); }; });
if (p > 0) {
b += worldBtn("prev", "◀ Earlier pages", "");
fns.prev = function () { gmmBook1812(v, p - 1); };
}
if (p < pages - 1) {
b += worldBtn("next", "Later pages ▶", "");
fns.next = function () { gmmBook1812(v, p + 1); };
}
b += worldBtn("up", "Both volumes", "");
fns.up = function () { gmmBook1812(); };
worldCard(worldFacts("📜 Band " + V.vol + " (" + V.year + ")", "Kinder- und Hausmärchen, first edition · page " + (p + 1) + " of " + pages, [], []) + b, fns);
});
},
function (v, i, notes) {
var B = GMM.book1812;
if (!B)
return;
var V = B.vols[v], t = V.tales[i];
if (!t)
return gmmBook1812(v, 0);
var body = (notes ? t.a : t.p).map(function (p) { return "<p style='margin:0 0 .8em;line-height:1.6'>" + esc(p) + "</p>"; }).join("");
var b = "", fns = {};
if (!notes && t.a && t.a.length) {
b += worldBtn("an", "The brothers' notes on it", "from the back of the volume (Anhang)");
fns.an = function () { gmmBook1812Tale(v, i, true); };
}
if (notes) {
b += worldBtn("tx", "Back to the tale", "");
fns.tx = function () { gmmBook1812Tale(v, i); };
}
if (i < V.tales.length - 1) {
b += worldBtn("nx", "Next tale ▶", V.tales[i + 1].t);
fns.nx = function () { gmmBook1812Tale(v, i + 1); };
}
if (i > 0) {
b += worldBtn("pv", "◀ Previous tale", V.tales[i - 1].t);
fns.pv = function () { gmmBook1812Tale(v, i - 1); };
}
b += worldBtn("ct", "Contents", "");
fns.ct = function () { gmmBook1812(v, Math.floor(i / 20)); };
worldCard(worldFacts("📜 " + t.t, (notes ? "The brothers' notes · " : "") + "Kinder- und Hausmärchen, " + V.year + ", No. " + (t.n || "?"), [], []) + "<div lang='de' style='max-height:58vh;overflow-y:auto;margin:6px 0 10px;padding-right:6px'>" + body + "</div>" + b, fns);
},
function () {
var d = gmmData();
d.learned = d.learned || {};
var b = "", fns = {};
GMM_LESSONS.forEach(function (L, i) { var id = "l" + i; b += worldBtn(id, (d.learned[i] ? "✓ " : "") + (i + 1) + ". " + L.t, ""); fns[id] = function () { gmmLesson(i); }; });
var n = Object.keys(d.learned).length;
worldCard(worldFacts("🎓 The Grimms' Schoolroom", "Twelve lessons · " + n + " learned", [], []) + "<div style='margin:6px 0 10px'>Read a lesson, then answer its question. When you know them, sit the <b>Collector's examination</b> at the slate board.</div>" + b, fns);
},
function (i) {
var L = GMM_LESSONS[i], Q = L.q, opts = gmmShuffle([[Q[1], 1], [Q[2], 0], [Q[3], 0]]);
gmmCard("🎓 " + L.t, "Lesson " + (i + 1) + " of 12", esc(L.b) + "<br><br><b>" + esc(Q[0]) + "</b>", opts.map(function (o) {
return [o[0], "", function () {
if (o[1]) {
var d = gmmData();
d.learned = d.learned || {};
d.learned[i] = 1;
gmmSave();
setStatus("✅ Right! <b>" + esc(Q[1]) + "</b>. (" + Object.keys(d.learned).length + " of 12 lessons learned.)");
setTimeout(gmmLessons, 1200);
}
else {
setStatus("❌ Not quite. Read it again.");
setTimeout(function () { gmmLesson(i); }, 900);
}
}];
}));
},
function () {
var qs = gmmShuffle(GMM_LESSONS.map(function (L) { return L.q; }).concat(GMM_TALES.slice(0, 16).filter(function (T) { var w = T[2].replace(/^The /, "").split(/[ ,(]/)[0]; return T[3].split(". ").slice(0, 2).join(". ").indexOf(w) < 0; }).map(function (T, i) {
var o = gmmShuffle(GMM_TALES.slice(0, 16).filter(function (x) { return x !== T; })).slice(0, 2);
return ["Which tale is this? \"" + T[3].split(". ").slice(0, 2).join(". ") + ".\"", T[2], o[0][2], o[1][2]];
}))).slice(0, GMM_EXAM_N);
var at = 0, right = 0;
function ask() {
if (at >= qs.length) {
var pass = right >= Math.ceil(GMM_EXAM_N * 0.8);
if (pass)
gmmReward("exam", "📜 <b>" + right + " out of " + GMM_EXAM_N + ".</b> The schoolmistress presses the Collector of Tales' seal into warm red wax for you. Jacob would be proud; Wilhelm already is.");
else
setStatus("📜 <b>" + right + " out of " + GMM_EXAM_N + ".</b> You need " + Math.ceil(GMM_EXAM_N * 0.8) + " to pass. Take a few lessons (or ask Dorothea for a tale) and try again.");
return;
}
var Q = qs[at], opts = gmmShuffle([[Q[1], 1], [Q[2], 0], [Q[3], 0]]);
gmmCard("📜 The Collector's examination", "Question " + (at + 1) + " of " + qs.length + " · " + right + " right so far", "<b>" + esc(Q[0]) + "</b>", opts.map(function (o) { return [o[0], "", function () { if (o[1])
right++; at++; setStatus(o[1] ? "✅ Right." : "❌ The answer was <b>" + esc(Q[1]) + "</b>."); setTimeout(ask, 700); }]; }));
}
ask();
},
function (x, z, feet) {
if (GMM.moving || GMM.lift)
return true;
if (x >= GMM_IN_X - 2000) {
if (gmmSolidAt(x, z, feet))
return true;
return !gmmInsideWalk(x, z);
}
var B = GMM_BOUND;
if (x < B.x0 || x > B.x1 || z < B.z0 || z > B.z1)
return true;
if (z > gmmShore(x) + 6)
return true;
if (gmmSolidAt(x, z, feet))
return true;
if (GMM.moats)
for (var mi = 0; mi < GMM.moats.length; mi++) {
var M = GMM.moats[mi], md = Math.hypot(x - M.x, z - M.z);
if (md > M.r0 && md < M.r1) {
var Bq = GMM.swanBridge;
if (!(Bq && Math.abs(x - Bq.x) < Bq.hw && Math.abs(z - Bq.z) < Bq.hd))
return true;
}
}
return !!(GMM.trees && gmmTreeHit(x, z));
},
function (G) {
GMM.G = G;
GMM.lite = typeof LITE !== "undefined" && !!LITE;
GMM.solids = [];
GMM.floors = [];
GMM.spots = [];
GMM.talk = [];
GMM.people = [];
GMM.movers = [];
GMM.fx = [];
GMM.lights = [];
GMM.districts = [];
GMM.follow = [];
GMM.room = null;
GMM.run = null;
GMM.lift = null;
GMM.flags = {};
GMM.snow = 0;
GMM.snowNear = null;
GMM.moats = [];
GMM.hedge = null;
GMM.trees = null;
GMM.under = null;
GMM_DOORS.length = 0;
for (var k in GMM_ROOMS) {
var R = GMM_ROOMS[k];
R.g = null;
R.D = null;
R.door = null;
}
function step(name, fn) { try {
fn();
}
catch (e) {
if (window.console)
console.warn("[grimm] " + name, e);
} }
step("terrain", function () { gmmTerrain(G); });
step("sky", function () { gmmSky(G); });
step("forest", function () { gmmForest(G); });
step("under", function () { gmmUnder(G); });
step("signs", function () { gmmRoadSigns(G); });
step("town", function () { gmmTown(G); });
[["hansel", gmmHansel], ["redcap", gmmRedCap], ["rapunzel", gmmRapunzel], ["holle", gmmHolleTop], ["snow", gmmSnowWhite], ["goose", gmmGooseTale], ["briar", gmmBriar], ["cinder", gmmCinder],
["frog", gmmFrogTale], ["dance", gmmDancePalace], ["rumpel", gmmRumpel], ["bremen", gmmBremenTale], ["kids", gmmKidsTale], ["fisher", gmmFisherTale], ["giants", gmmGiants], ["winter", gmmWinter],
["snowrose", gmmSnowRoseTale], ["goosegirl", gmmGooseGirlTale], ["swans", gmmSwansTale], ["ravens", gmmRavensTale], ["ironjohn", gmmIronJohnTale], ["thrush", gmmThrushTale],
["brosis", gmmBroSisTale], ["water", gmmWaterTale], ["hans", gmmHansTale], ["juniper", gmmJuniperTale]].forEach(function (t) { step(t[0], t[1]); });
step("bake", function () {
if (typeof ctnMerge === "function")
GMM.districts.forEach(function (D) {
try {
ctnMerge(D.g);
}
catch (e) { }
D.g.children.forEach(function (m) { if (m.isMesh && !m.isInstancedMesh && m.geometry && m.geometry.boundingSphere)
m.frustumCulled = true; });
});
});
var my = new THREE.PointLight(0xFFD8A0, 0.6, 14, 2);
G.add(my);
GMM.my = my;
GMM.outside = G.children.slice();
if (GMM_ROOMS.gooseinn)
GMM_ROOMS.gooseinn.onEnter = function (R) { gmmGooseInn(R); };
GMM.built = true;
},
function (opt) {
opt = opt || {};
var A = GMM_AT.arrive;
GMM.zone = "town";
GMM.room = null;
GMM.moving = false;
GMM.lift = null;
if (GMM.outside)
GMM.outside.forEach(function (o) { o.visible = true; });
for (var k in GMM_ROOMS)
if (GMM_ROOMS[k].g) {
GMM_ROOMS[k].g.visible = false;
GMM_ROOMS[k].D.visible = false;
}
gmmPut(A.x, A.z, 0);
gmmStateFetch();
if (GMM.trees)
gmmForestFill(A.x, A.z, true);
if (opt.at && GMM_AT[opt.at]) {
var P = GMM_AT[opt.at];
gmmPut(P.x, P.z + ((P.r || 20) * 0.6), 0);
GMM.zone = gmmZoneAt(P.x, P.z);
if (GMM.trees)
gmmForestFill(P.x, P.z, true);
}
if (opt.room) {
setTimeout(function () { gmmEnterRoom(opt.room, gmmDoorOf(opt.room)); }, 300);
return;
}
setStatus("📖 <b>" + GMM_NAME + ".</b> Kassel in 1812, where the Brothers Grimm wrote down the tales, and all round it the great German wood. Every tale is out there along the forest roads, told as the brothers wrote it, dark endings and all. The Grimms' own house is on the square (the whole book is inside), Dorothea Viehmann tells tales at the inn, and the signposts show the way. The 📖 Grimm menu has the rest.");
},
function (dt) {
var L = worldLocal();
GMM.t += dt;
if (!GMM.built)
return;
if (typeof stars !== "undefined" && stars)
stars.visible = !!gmmEnvNow().stars;
if (GMM.clouds) {
GMM.clouds.position.set(L.x, 0, L.z);
}
gmmFlicker(dt);
gmmPlayTick(dt, L);
GMM.movers.forEach(function (M) {
try {
if (M.k === "hover") {
M.ph += dt;
M.g.position.y = M.y + Math.sin(M.ph * 1.3) * 0.4;
M.g.rotation.y += dt * 0.4;
}
else if (M.k === "bob") {
M.ph += dt;
if (!GMM.lift || GMM.lift.obj !== M.g)
M.g.position.y = M.y + Math.sin(M.ph * 1.6) * 0.06;
}
else if (M.k === "wheel") {
M.g.rotation.x += dt * 0.6;
}
else if (M.k === "dance") {
M.ph += dt;
var rl = M.P.g.userData.rbReal;
M.P.g.userData.dance = "wild";
M.P.g.userData.danceMove = 1;
M.ra = (M.ra == null ? M.ph * 0.9 : M.ra) + dt * (rl ? 0.9 / Math.max(1, M.r) : 0.9);
var a = M.ra;
M.P.g.position.set(M.x + Math.cos(a) * M.r, gmmGround(M.x + Math.cos(a) * M.r, M.z + Math.sin(a) * M.r) + (rl ? 0 : Math.abs(Math.sin(M.ph * 6)) * 0.25), M.z + Math.sin(a) * M.r);
M.P.g.rotation.y = rl ? -a + Math.sin(M.ph * 0.7) * 0.8 : -a;
}
}
catch (e) { }
});
GMM.fx.forEach(function (F) { if (F.k === "flame") {
F.ph += dt * 6;
F.m.scale.set(1, 0.85 + 0.2 * Math.sin(F.ph) + 0.08 * Math.sin(F.ph * 2.7), 1);
} });
var R = GMM.room;
if (R && R.dancers) {
R.dancers.forEach(function (D, i) {
D.ang += dt * 0.25;
var cx = Math.cos(D.ang) * D.r, cz = Math.sin(D.ang) * D.r * 0.75, sp = D.ang * 3;
D.a.g.position.set(R.x + cx + Math.cos(sp) * 0.3, 0, cz + Math.sin(sp) * 0.3);
D.b.g.position.set(R.x + cx - Math.cos(sp) * 0.3, 0, cz - Math.sin(sp) * 0.3);
D.a.g.rotation.y = sp + Math.PI / 2;
D.b.g.rotation.y = sp - Math.PI / 2;
D.a.g.userData.dance = D.b.g.userData.dance = "waltz";
if (D.a.g.userData.rbReal)
D.a.g.rotation.y = Math.atan2(-Math.cos(sp), -Math.sin(sp));
if (D.b.g.userData.rbReal)
D.b.g.rotation.y = Math.atan2(Math.cos(sp), Math.sin(sp));
});
}
if (GMM.my) {
GMM.my.position.set(L.x, camera.position.y + 0.3, L.z);
GMM.my.intensity = R ? 0 : 0.6;
}
if (GMM.moving || GMM.lift) {
worldPrompt(null);
return;
}
if (!R) {
var zone = gmmZoneAt(L.x, L.z);
if (zone !== GMM.zone && zone !== "inside") {
GMM.zone = zone;
if (zone === "town" && GMM.flags.goose)
gmmGooseTown();
}
}
if (WLD.arrive && (WLD.arrive.x !== GMM_AT.arrive.x || WLD.arrive.z !== GMM_AT.arrive.z))
WLD.arrive = { x: GMM_AT.arrive.x, z: GMM_AT.arrive.z };
GMM.vt += dt;
if (GMM.vt > 0.5) {
GMM.vt = 0;
if (!R) {
if (GMM.trees)
gmmForestFill(L.x, L.z);
if (GMM.under)
gmmUnderFill(L.x, L.z);
gmmFolkFar(L);
var far = GMM.lite ? 320 : 450;
GMM.districts.forEach(function (D) { var on = Math.hypot(L.x - D.x, L.z - D.z) < D.r + far; if (D.g.visible !== on)
D.g.visible = on; });
}
}
worldBanner("<b>📖 " + GMM_NAME + "</b> · " + esc(R ? R.n : (GMM_ZN[GMM.zone] || "the wood")) + (GMM.run && GMM.run.k === "redcap" ? " · keep to the path!" : "") + (GMM.follow.length && GMM.flags.goose ? " · 🪿 +" + (GMM.follow.length - 1) : ""));
GMM.pt += dt;
if (GMM.pt < 0.15)
return;
GMM.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
worldPrompt(null);
return;
}
var feet = camera.position.y - 1.72, best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
GMM.talk.forEach(function (T) {
var g = T.p.g;
if (!g.visible || (g.parent && !g.parent.visible))
return;
var p = g.getWorldPosition ? null : g.position;
var wx = g.matrixWorld.elements[12] - GMM.base, wz = g.matrixWorld.elements[14];
if (Math.abs(wx - L.x) > 8 || Math.abs(wz - L.z) > 8)
return;
cand(wx, wz, T.r, T.fn || function () { wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk");
});
GMM.spots.forEach(function (s) {
if (Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y !== undefined && s.y !== null ? s.y : gmmGround(s.x, s.z);
if (Math.abs(sy - feet) > 3.2)
return;
cand(s.x, s.z, s.r, s.fn, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (typeof raNear === "function") {
var rn = null;
try {
rn = raNear();
}
catch (e) { }
if (rn)
best = { fn: rn.fn, html: rn.html };
}
if (best)
worldPrompt(best.html, best.fn);
else
worldPrompt(null);
if (!R)
GMM.people.forEach(function (P) { if (!P.wander || !P.g.visible)
return; var p = P.g.position; if (Math.abs(p.x - L.x) > 120 || Math.abs(p.z - L.z) > 120)
return; wWander(P.g, 0.15, function (x, z) { return gmmGround(x, z); }, P.wander); });
},
function (L) {
var far = GMM.lite ? 55 : 85;
GMM.people.forEach(function (P) {
var p = P.g.position;
if (p.x >= GMM_IN_X - 2000)
return;
var wx = P.g.matrixWorld.elements[12] - GMM.base, wz = P.g.matrixWorld.elements[14];
if (P.g.parent && P.g.parent !== GMM.G && P.g.parent.parent !== GMM.G)
return;
var d = Math.hypot(wx - L.x, wz - L.z);
if (d > far && P.g.visible) {
P.g.visible = false;
P.farHid = true;
}
else if (d <= far && P.farHid) {
P.g.visible = true;
P.farHid = false;
}
});
},
function () {
for (var k in GMM_MATS) {
var m = GMM_MATS[k];
if (m && m.dispose && !m.map)
try {
m.dispose();
}
catch (e) { }
}
for (var k2 in GMM_MATS)
delete GMM_MATS[k2];
GMM.built = false;
GMM.G = null;
GMM.outside = null;
GMM.trees = null;
GMM.under = null;
GMM.snowNear = null;
GMM.book = null;
for (var r in GMM_ROOMS) {
GMM_ROOMS[r].g = null;
GMM_ROOMS[r].D = null;
}
},
function () {
var keeper = gmmKeeper(), b = "", fns = {}, d = gmmData();
var rows = [["Ways in", "The oak door with the golden key in the Hall of Doors, this menu, or the Grimms' story board at the Family houses."],
["In the Grimm Wood", "Kassel in 1812: the Grimms' house (the complete Household Tales, all 200), Dorothea Viehmann at the inn, the Schoolroom and its examination, a dozen shops and workshops. Out in the wood, every tale in its own place: Hansel and Gretel, Little Red Cap, Rapunzel, Mother Holle, Snow White, the Golden Goose, Briar Rose, Aschenputtel, the Frog King, the Twelve Dancing Princesses, Rumpelstiltskin, the Bremen Town Musicians, the Seven Little Goats, the Fisherman and his Wife, the Brave Little Tailor, Snow-White and Rose-Red, the Goose-Girl, the Six Swans, the Seven Ravens, Iron John, King Thrushbeard, Little Brother and Little Sister, the Water of Life, Hans in Luck and the Juniper-Tree. In the Grimms' house, the first edition of 1812 and 1815 too, in their own German."],
["How it's told", "From the brothers' own book (1812 to 1857), dark endings and all. No film looks, names or songs."],
["Yours so far", d.keeps.length + " keepsake" + (d.keeps.length === 1 ? "" : "s") + (d.learned ? ", " + Object.keys(d.learned).length + " of 12 lessons" : "")]];
b += worldBtn("book", "📖 Read the Household Tales", "All 200 tales and the 10 legends, complete");
fns.book = function () { gmmBook(); };
b += worldBtn("book1812", "📜 The first edition (1812 and 1815)", "The tales as first printed, in the Grimms' German, with their notes");
fns.book1812 = function () { gmmBook1812(); };
if (WLD.on === GMM_KEY) {
if (GMM.room) {
b += worldBtn("out", "🚪 Step outside", "Out of " + esc(GMM.room.n));
fns.out = function () { worldCard(null); var R = GMM.room, D = R.door; while (!D && R && R.back) {
R = GMM_ROOMS[R.back];
D = R && R.door;
} gmmOutside(D); };
}
var to = [["town", "🏛️ Kassel square", "The Grimms' house, the inn, the town hall"], ["hansel", "🍬 The deep wood", "Hansel and Gretel"], ["redcap", "🧺 Grandmother's", "Little Red Cap"], ["rapunzel", "🗼 Rapunzel's tower", ""], ["holle", "🧵 Mother Holle's well", ""], ["queen", "👑 The Queen's castle", "Snow White"], ["dwarfs", "⛏️ The dwarfs' cottage", "Snow White"], ["briar", "🌹 The castle in the thorns", "Briar Rose"], ["cinder", "👠 Aschenputtel's house", ""], ["frog", "🐸 The well under the lime tree", "The Frog King"], ["dance", "👠 The twelve princesses' palace", ""], ["rumpel", "🧵 The mill and the straw", "Rumpelstiltskin"], ["bremen", "🫏 The road to Bremen", "The Town Musicians"], ["kids", "🐐 The seven little goats", ""], ["fisher", "🐟 The sea shore", "The Fisherman and his Wife"], ["giants", "🪨 The giants' tree", "The Brave Little Tailor"],
["snowrose", "🐻 The widow's cottage", "Snow-White and Rose-Red"], ["goosegirl", "🪿 The goose meadow", "The Goose-Girl"], ["swans", "🦢 The hut in the wood", "The Six Swans"], ["ravens", "🐦‍⬛ The Glass Mountain", "The Seven Ravens"],
["ironjohn", "🗝️ The king's forest", "Iron John"], ["thrush", "👑 King Thrushbeard's town", ""], ["brosis", "🦌 The three brooks", "Little Brother and Little Sister"], ["water", "💧 The enchanted castle", "The Water of Life"],
["hans", "🐄 The lane home", "Hans in Luck"], ["juniper", "🌲 The juniper-tree", "The Juniper-Tree"]];
to.forEach(function (T) { b += worldBtn("to_" + T[0], T[1], T[2]); fns["to_" + T[0]] = function () { worldCard(null); var P = GMM_AT[T[0]]; gmmVeil(0.4, function () { GMM.room = null; gmmShowOnly(null); var z = P.z + (T[0] === "town" ? 40 : Math.min(30, (P.r || 40) * 0.5)); gmmPut(P.x, z, 0); GMM.zone = gmmZoneAt(P.x, z); if (GMM.trees)
gmmForestFill(P.x, z, true); }); }; });
b += worldBtn("home", "Leave " + GMM_NAME, "Back to where you came from");
fns.home = function () { worldCard(null); gmmHome(); };
}
else if (!WLD.on && (gmmOpen() || keeper)) {
b += worldBtn("go", "📖 Go to " + GMM_NAME, "Arrive in Kassel, 1812");
fns.go = function () { worldCard(null); gmmGo({}); };
if (typeof toHall === "function") {
b += worldBtn("hall", "Take me to the Hall of Doors", "Its door is oak, with a golden key on it");
fns.hall = function () { worldCard(null); toHall(); };
}
}
worldCard(worldFacts("📖 " + GMM_NAME, "The Brothers Grimm's tales, every one in its place", rows, []) + b, fns);
},
function (g) {
if (typeof swkTree !== "function")
return;
var A = GMM_AT.rumpel, mx = A.x - 50, mz = A.z - 30, gr = function (x, z) { return gmmGround(x, z); };
var D = new THREE.Group();
D.name = "gmm-millyard";
g.add(D);
function at(x, z, ry) { return swkAt(D, x, gr(x, z), z, ry || 0); }
var sack = swkM(0xC8B890, "plaster"), flour = swkM(0xE0D8C8, "plaster"), wood = swkM(0x6A4A2E, "wood"), straw = swkM(0xC8A858, "thatch");
var C = at(mx + 12, mz + 14, 0.5);
swkBox(C, 3.2, 0.12, 1.6, wood, 0, 0.9, 0);
[-1.6, 1.6].forEach(function (e) { swkBox(C, 3.2, 0.45, 0.08, wood, 0, 1.15, e * 0.48); });
[-1, 1].forEach(function (s) { var w = swkCyl(C, 0.55, 0.55, 0.1, swkM(0x4A3420, "wood"), -0.6, 0.55, s * 0.86, 14); w.rotation.x = Math.PI / 2; });
swkBox(C, 2.2, 0.08, 0.08, wood, 2.6, 0.75, 0.3).rotation.z = 0.15;
swkBox(C, 2.2, 0.08, 0.08, wood, 2.6, 0.75, -0.3).rotation.z = 0.15;
for (var s = 0; s < 5; s++)
swkBall(C, 0.36, sack, -1.1 + s * 0.55, 1.25, (s % 2) * 0.3 - 0.15, 1).scale.set(1, 0.75, 1.3);
var S = at(mx + 5, mz + 6, 0.3);
for (var k = 0; k < (swkLite() ? 4 : 8); k++) {
var b = swkBall(S, 0.34, flour, (k % 4) * 0.62, 0.32 + Math.floor(k / 4) * 0.5, (k % 2) * 0.2, 1);
b.scale.set(1, 0.8, 1.3);
}
var M = at(mx - 4, mz + 7, 0.3);
var st = swkCyl(M, 1.1, 1.1, 0.32, swkM(0x8A847A, "stone"), 0, 1.1, 0, 20);
st.rotation.x = Math.PI / 2 - 0.15;
swkCyl(M, 1.1, 1.1, 0.32, swkM(0x7A746A, "stone"), 2.6, 0.16, 0.8, 20);
var R = at(mx + 26, mz + 22, 0);
swkCyl(R, 2.6, 2.8, 2.6, straw, 0, 1.3, 0, 16);
swkMesh(R, new THREE.ConeGeometry(2.9, 2.2, 16), straw, 0, 3.7, 0);
for (var t = 0; t < (swkLite() ? 6 : 12); t++) {
var tx = mx + 18 + (t % 4) * 5, tz = mz + 34 + Math.floor(t / 4) * 5, T = at(tx, tz, t);
swkMesh(T, new THREE.ConeGeometry(0.55, 1.4, 7), straw, 0, 0.7, 0);
}
for (var f = 0; f < 8; f++) {
var F = at(mx - 8 + f * 3, mz + 28, 0);
swkBox(F, 3, 0.9, 0.1, swkM(0x7A6040, "wood"), 0, 0.6, 0);
swkBox(F, 0.1, 1.2, 0.1, wood, -1.5, 0.6, 0);
}
var Tr = at(mx + 2, mz + 16, 0.3);
swkBox(Tr, 2.2, 0.5, 0.6, wood, 0, 0.25, 0);
swkBox(Tr, 2, 0.04, 0.4, swkM(0x2E4A52), 0, 0.48, 0);
swkBench(D, mx + 8, mz + 4, Math.PI + 0.3, gr(mx + 8, mz + 4));
swkBarrel(D, mx + 10, mz + 6.5, { y: gr(mx + 10, mz + 6.5) });
swkBarrel(D, mx + 10.8, mz + 7.4, { y: gr(mx + 10.8, mz + 7.4) });
for (var h = 0; h < 5; h++) {
var hx = mx + 6 + h * 1.3, hz = mz + 18 + (h % 2), H = at(hx, hz, h);
swkBall(H, 0.16, swkM(h % 2 ? 0xE8E0D0 : 0x8A4A2A), 0, 0.2, 0, 1).scale.set(1, 0.9, 1.4);
swkBall(H, 0.07, swkM(0xC83A2A), 0, 0.36, 0.17, 0);
}
if (typeof gmmPerson === "function") {
[[mx + 13, mz + 16, 2.1, { sex: "m", title: "farmer", look: { top: 0x6A5A3A, bottom: 0x4A3A2A, hat: "cap", hatColor: 0x3A3A2A } }],
[mx + 4, mz + 18, 0.8, { sex: "f", title: "farmer", look: { topKind: "dress", top: 0x8A3A2A, layer: "apron", layerColor: 0xE8E0D0 } }],
[mx + 7, mz + 8, -1.2, { sex: "m", child: true, look: { top: 0xB8A888, bottom: 0x5A4A3A } }],
[mx + 24, mz + 30, 0.4, { sex: "m", title: "farmer", look: { top: 0xC8B898, bottom: 0x5A4A3A, hat: "brimmed", hatColor: 0xC8A858 } }]].forEach(function (p, i) { if (swkKeep(i))
try {
gmmPerson(4700 + i, p[0], p[1], p[2], p[3], g);
}
catch (e) { } });
}
}
];
});
