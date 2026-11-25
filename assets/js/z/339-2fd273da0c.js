/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(339, function () {
"use strict";
return [
function () {
if (PY.lite || PY.env !== undefined)
return PY.env || null;
PY.env = null;
try {
if (typeof renderer === "undefined" || !renderer || !THREE.PMREMGenerator)
return null;
var sc = new THREE.Scene(), g = new THREE.SphereGeometry(50, 32, 16), P = g.attributes.position, C = new Float32Array(P.count * 3), c = new THREE.Color(), p = new THREE.Vector3();
var top = new THREE.Color(0x6A8AC0), mid = new THREE.Color(0xE8D8C0), gr = new THREE.Color(0x3A3430), sunC = new THREE.Color(0xFFF0D8), d = new THREE.Vector3(0.5, 0.6, -0.4).normalize();
for (var i = 0; i < P.count; i++) {
p.set(P.getX(i), P.getY(i), P.getZ(i)).normalize();
var y = p.y;
if (y >= 0)
c.copy(mid).lerp(top, Math.pow(y, 0.5));
else
c.copy(mid).lerp(gr, Math.min(1, -y * 5));
var s = Math.max(0, p.dot(d));
c.lerp(sunC, Math.pow(s, 8) * 0.8);
if (Math.abs(y - 0.25) < 0.04)
c.lerp(sunC, 0.5);
C[i * 3] = c.r;
C[i * 3 + 1] = c.g;
C[i * 3 + 2] = c.b;
}
g.setAttribute("color", new THREE.BufferAttribute(C, 3));
sc.add(new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide })));
var pm = new THREE.PMREMGenerator(renderer);
PY.env = pm.fromScene(sc, 0.02).texture;
pm.dispose();
g.dispose();
}
catch (e) {
PY.env = null;
}
return PY.env;
},
function (o) {
if (!o)
return;
var keepG = new Set(), keepM = new Set();
Object.keys(PY.geo).forEach(function (k) { var g = PY.geo[k]; if (!g)
return; if (g.isBufferGeometry)
keepG.add(g);
else
Object.keys(g).forEach(function (j) { if (g[j] && g[j].isBufferGeometry)
keepG.add(g[j]); }); });
Object.keys(PY.mats).forEach(function (k) { keepM.add(PY.mats[k]); });
o.traverse(function (m) {
if (m.geometry && !m.isSprite && !keepG.has(m.geometry) && !m.userData.pyShared)
m.geometry.dispose();
var ms = Array.isArray(m.material) ? m.material : (m.material ? [m.material] : []);
ms.forEach(function (mt) { if (!keepM.has(mt))
mt.dispose(); });
});
},
function (kind, col, o) {
o = o || {};
var key = kind + ":" + (col >>> 0).toString(16) + ":" + (o.map ? o.map.uuid : "") + (o.e !== undefined ? ":e" + o.e : "") + (o.op !== undefined ? ":o" + o.op : "");
if (PY.mats[key])
return PY.mats[key];
var env = pyEnv(), m;
if (kind === "paint") {
m = env ? new THREE.MeshStandardMaterial({ color: col, metalness: 0.45, roughness: 0.28, envMap: env, envMapIntensity: 1.1 })
: new THREE.MeshPhongMaterial({ color: col, shininess: 70, specular: 0x707070 });
}
else if (kind === "chrome") {
m = env ? new THREE.MeshStandardMaterial({ color: col, metalness: 0.95, roughness: 0.15, envMap: env })
: new THREE.MeshPhongMaterial({ color: col, shininess: 110, specular: 0xCCCCCC });
}
else if (kind === "glass") {
m = env ? new THREE.MeshStandardMaterial({ color: col, metalness: 0.2, roughness: 0.05, envMap: env, envMapIntensity: 1.4, transparent: true, opacity: 0.62 })
: new THREE.MeshPhongMaterial({ color: col, shininess: 120, specular: 0xBBBBBB, transparent: true, opacity: 0.6 });
m.depthWrite = false;
}
else if (kind === "rubber") {
m = env ? new THREE.MeshStandardMaterial({ color: col, metalness: 0, roughness: 0.92 }) : new THREE.MeshLambertMaterial({ color: col });
}
else if (kind === "matte") {
m = env ? new THREE.MeshStandardMaterial({ color: col, metalness: 0.1, roughness: 0.75 }) : new THREE.MeshLambertMaterial({ color: col });
}
else if (kind === "glow") {
m = new THREE.MeshBasicMaterial({ color: col, transparent: o.op !== undefined, opacity: o.op === undefined ? 1 : o.op, fog: true });
}
else
m = new THREE.MeshLambertMaterial({ color: col });
if (o.map) {
m.map = o.map;
m.needsUpdate = true;
}
if (o.ds)
m.side = THREE.DoubleSide;
PY.mats[key] = m;
return m;
},
function (car) {
var k = "liv:" + car.k;
if (PY.tex[k])
return PY.tex[k];
var c = document.createElement("canvas");
c.width = 256;
c.height = 128;
var x = c.getContext("2d");
var hex = function (n) { return "#" + ("000000" + (n >>> 0).toString(16)).slice(-6); };
x.fillStyle = pyVivid(car.col);
x.fillRect(0, 0, 256, 128);
x.fillStyle = pyVivid(car.trim, 1);
var band = car.style === "hearse" ? 4 : car.style === "monster" || car.style === "van" ? 14 : 9;
x.fillRect(0, 64 - band, 256, band * 2);
if (car.style !== "needle") {
x.fillRect(0, 64 - band - 8, 256, 2);
x.fillRect(0, 64 + band + 6, 256, 2);
}
x.globalAlpha = 0.55;
x.fillRect(0, 14, 256, 5);
x.fillRect(0, 109, 256, 5);
x.globalAlpha = 1;
x.fillStyle = hex(pyNeonOf(car));
x.fillRect(0, 64 - band - 4, 256, 1.5);
x.fillRect(0, 64 + band + 3, 256, 1.5);
x.fillRect(0, 21, 256, 1.2);
x.fillRect(0, 106, 256, 1.2);
var fin = pyFinishOf(car);
if (fin === "flake" || fin === "metallic") {
for (var q = 0; q < (fin === "flake" ? 900 : 350); q++) {
x.fillStyle = "rgba(255,255,255," + (0.08 + Math.random() * 0.18) + ")";
x.fillRect(Math.random() * 256, Math.random() * 128, 1, 1);
}
}
[34, 94].forEach(function (v, i) {
x.fillStyle = "#F2EEE6";
x.beginPath();
x.ellipse(118, v, 15, 11, 0, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#141414";
x.font = "bold 15px Arial";
x.textAlign = "center";
x.textBaseline = "middle";
x.save();
x.translate(118, v);
x.rotate(i ? -Math.PI / 2 : Math.PI / 2);
x.fillText(String(car.i + 1), 0, 1);
x.restore();
});
var t = new THREE.CanvasTexture(c);
t.anisotropy = 4;
PY.tex[k] = t;
return t;
},
function (N, M, fn, capEnds) {
var pos = [], uv = [], idx = [];
for (var i = 0; i <= N; i++) {
var u = i / N, S = fn(u);
for (var j = 0; j <= M; j++) {
var v = j / M, a = Math.PI * 2 * v - Math.PI / 2;
var ca = Math.cos(a), sa = Math.sin(a), e = 2 / (S.p || 4);
var px = -Math.sign(ca) * Math.pow(Math.abs(ca), e) * S.w, py = Math.sign(sa) * Math.pow(Math.abs(sa), e);
var cy = (S.y0 + S.y1) / 2, hy = (S.y1 - S.y0) / 2;
pos.push(px, cy + py * hy, S.z);
uv.push(u, v);
}
}
for (var i2 = 0; i2 < N; i2++)
for (var j2 = 0; j2 < M; j2++) {
var a0 = i2 * (M + 1) + j2, b0 = a0 + M + 1;
idx.push(a0, b0, a0 + 1, a0 + 1, b0, b0 + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
if (capEnds) {
[0, N].forEach(function (i) {
var c = fn(i / N), base = pos.length / 3;
pos.push(0, (c.y0 + c.y1) / 2, c.z);
uv.push(i / N, 0.5);
for (var j = 0; j < M; j++) {
var A = i * (M + 1) + j;
if (i === 0)
idx.push(base, A, A + 1);
else
idx.push(base, A + 1, A);
}
});
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
}
return g;
},
function (r, w, col, lite, mono) {
var key = "wh:" + r.toFixed(2) + ":" + w.toFixed(2) + ":" + (lite ? 1 : 0);
var G = PY.geo[key];
if (!G) {
var seg = lite ? 14 : 24;
var pr = [], t = w / 2;
for (var i = 0; i <= 10; i++) {
var a = -Math.PI / 2 + Math.PI * i / 10;
pr.push(new THREE.Vector2(r * 0.66 + Math.cos(a) * r * 0.34, Math.sin(a) * t));
}
var tyre = new THREE.LatheGeometry(pr, seg);
tyre.rotateZ(Math.PI / 2);
var rim = new THREE.CylinderGeometry(r * 0.64, r * 0.64, w * 0.86, seg, 1, true);
rim.rotateZ(Math.PI / 2);
var hub = new THREE.CylinderGeometry(r * 0.16, r * 0.2, w * 0.9, 10);
hub.rotateZ(Math.PI / 2);
var disc = new THREE.CylinderGeometry(r * 0.5, r * 0.5, 0.03, seg);
disc.rotateZ(Math.PI / 2);
var spoke = new THREE.BoxGeometry(0.04, r * 0.95, r * 0.12);
G = PY.geo[key] = { tyre: tyre, rim: rim, hub: hub, disc: disc, spoke: spoke };
}
var g = new THREE.Group();
g.add(new THREE.Mesh(G.tyre, pyMat("rubber", 0x1A1A1C)));
var rm = pyMat("chrome", col || 0xB8BCC4);
g.add(new THREE.Mesh(G.rim, rm));
g.add(new THREE.Mesh(G.hub, rm));
var d = new THREE.Mesh(G.disc, pyMat("matte", 0x6A6A6E));
g.add(d);
var ns = lite ? 3 : 5;
for (var s = 0; s < ns; s++) {
var sp = new THREE.Mesh(G.spoke, rm);
sp.rotation.x = s * Math.PI * 2 / ns;
g.add(sp);
}
return g;
},
function (col, lite) {
var g = new THREE.Group(), suit = pyMat("matte", col), seg = lite ? 8 : 14;
var body = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.62, seg), suit);
body.position.set(0, 0.42, 0);
body.rotation.x = -0.25;
g.add(body);
var helm = new THREE.Mesh(new THREE.SphereGeometry(0.17, seg, Math.max(6, seg * 0.7 | 0)), pyMat("paint", 0xF0F0F0));
helm.position.set(0, 0.86, 0.04);
g.add(helm);
var visor = new THREE.Mesh(new THREE.SphereGeometry(0.172, seg, 6, 0, Math.PI * 2, Math.PI * 0.36, Math.PI * 0.26), pyMat("glass", 0x1A2A3A));
visor.position.copy(helm.position);
visor.rotation.x = -0.2;
g.add(visor);
[-1, 1].forEach(function (s) { var a = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.06, 0.48, seg / 2 | 0), suit); a.position.set(s * 0.2, 0.56, 0.24); a.rotation.x = -1.1; a.rotation.z = s * 0.18; g.add(a); });
return g;
},
function (car, map) {
var f = pyFinishOf(car), key = "paint:" + car.k;
if (PY.mats[key])
return PY.mats[key];
var env = pyEnv(), m, P = { metallic: [0.6, 0.25, 0.9], pearl: [0.3, 0.2, 1.0], candy: [0.5, 0.12, 1.0], flake: [0.65, 0.3, 0.95], satin: [0.25, 0.55, 0.6], chrome: [0.85, 0.12, 1.2] }[f] || [0.5, 0.25, 1.2];
if (env && THREE.MeshPhysicalMaterial && !PY.lite) {
m = new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, map: map, metalness: P[0], roughness: P[1], envMap: env, envMapIntensity: P[2], clearcoat: f === "satin" ? 0.2 : 1, clearcoatRoughness: f === "satin" ? 0.5 : 0.06 });
if (f === "candy") {
m.emissive = new THREE.Color(pyVivid(car.col)).multiplyScalar(0.1);
}
if (f === "pearl" && m.sheen !== undefined) {
try {
m.sheen = new THREE.Color(pyNeonOf(car)).multiplyScalar(0.4);
}
catch (e) { }
}
}
else if (env) {
m = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, map: map, metalness: P[0], roughness: P[1], envMap: env, envMapIntensity: P[2] });
}
else {
m = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, map: map, shininess: f === "satin" ? 30 : 100, specular: f === "satin" ? 0x404040 : 0x9A9A9A });
}
PY.mats[key] = m;
return m;
},
function () {
if (PY.tex.under)
return PY.tex.under;
var c = document.createElement("canvas");
c.width = c.height = 128;
var x = c.getContext("2d"), g = x.createRadialGradient(64, 64, 4, 64, 64, 64);
g.addColorStop(0, "rgba(255,255,255,0.85)");
g.addColorStop(0.45, "rgba(255,255,255,0.4)");
g.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = g;
x.fillRect(0, 0, 128, 128);
PY.tex.under = new THREE.CanvasTexture(c);
return PY.tex.under;
},
function (g, car, D) {
var neon = pyNeonOf(car), L = D.L, W = D.W, S = D.S, clr = D.clr, lite = D.lite;
var um = PY.mats["under:" + neon] || (PY.mats["under:" + neon] = new THREE.MeshBasicMaterial({ color: neon, map: pyGlowTex(), transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending }));
var u = new THREE.Mesh(new THREE.PlaneGeometry(W * 2.9, L * 1.25), um);
u.rotation.x = -Math.PI / 2;
u.position.y = 0.04;
u.renderOrder = 2;
g.add(u);
g.userData.under = u;
var nm = pyMat("glow", neon);
if (!S.pads) {
[-1, 1].forEach(function (s) { var st = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, L * 0.72), nm); st.position.set(s * W * 0.93 * pyLerpProf(S.plan, 0.5), clr + 0.08, 0); g.add(st); });
}
var fr = new THREE.Mesh(new THREE.BoxGeometry(W * 1.1, 0.035, 0.035), nm);
fr.position.set(0, clr + 0.1, L / 2 - 0.12);
g.add(fr);
if (!lite || car.i % 2 === 0)
g.userData.wheels.forEach(function (wh) {
if (g.userData.hover)
return;
var r = 0, hw = 0;
wh.traverse(function (o) { var q = o.geometry && o.geometry.parameters; if (q && q.openEnded && q.radiusTop > r) {
r = q.radiusTop;
hw = q.height / 2;
} });
if (!r)
return;
var ring = new THREE.Mesh(new THREE.TorusGeometry(r * 0.94, 0.022, 6, lite ? 14 : 24), nm);
ring.rotation.y = Math.PI / 2;
ring.position.x = (wh.position.x >= 0 ? 1 : -1) * (hw + 0.01);
ring.userData.rim = 1;
wh.add(ring);
});
},
function (car, opt) {
opt = opt || {};
var lite = !!(opt.lite || PY.lite), S = PY_STYLE[car.style] || PY_STYLE.wedge, L = S.L, W = S.W / 2;
var g = new THREE.Group();
g.name = "pycar-" + car.k;
var paint = pyPaint(car, pyLivery(car)), trim = pyMat("chrome", car.trim), dark = pyMat("matte", 0x1A1A1C), chrome = pyMat("chrome", 0xC8CCD4);
var N = lite ? 12 : 22, M = lite ? 12 : 22, clr = S.clr;
var body = pyLoft(N, M, function (u) {
var top = pyLerpProf(S.top, u), w = pyLerpProf(S.plan, u) * W;
var e = Math.min(1, Math.min(u, 1 - u) * 7), round = 0.2 + 0.8 * Math.sqrt(e);
return { z: -L / 2 + u * L, y0: clr + (1 - round) * (top - clr) * 0.35, y1: clr + (top - clr) * (0.6 + 0.4 * round), w: w * Math.sqrt(round), p: S.round ? 2.6 : 3.6 };
}, true);
var bm = new THREE.Mesh(body, paint);
bm.castShadow = !lite;
g.add(bm);
g.userData.body = bm;
var sk = pyLoft(lite ? 6 : 10, lite ? 8 : 12, function (u) { var uu = 0.04 + u * 0.92, e = Math.min(1, Math.min(uu, 1 - uu) * 9), w = pyLerpProf(S.plan, uu) * W * 0.95 * (0.55 + 0.45 * Math.sqrt(e)); return { z: -L / 2 + uu * L, y0: clr - 0.02, y1: clr + 0.14, w: w, p: 4 }; }, true);
g.add(new THREE.Mesh(sk, dark));
var cab = S.cab, glassM = pyMat("glass", 0x2A3A4C);
g.userData.roof = [];
if (cab && !cab.inset) {
var cz0 = -L / 2 + cab.a * L, cz1 = -L / 2 + cab.b * L, base = pyLerpProf(S.top, (cab.a + cab.b) / 2) - 0.03;
var gl = pyLoft(lite ? 8 : 14, lite ? 10 : 16, function (u) {
var t = Math.sin(Math.PI * Math.pow(u, 0.9 + cab.lean * 0.3)), h = cab.h * (0.3 + 0.7 * t);
return { z: cz0 + u * (cz1 - cz0), y0: base - 0.05, y1: base + h, w: W * cab.w * (0.86 + 0.14 * t), p: 3 };
}, true);
var gm = new THREE.Mesh(gl, glassM);
g.add(gm);
g.userData.roof.push(gm);
var rf = pyLoft(lite ? 6 : 10, lite ? 8 : 12, function (u) { var t = Math.sin(Math.PI * Math.min(1, Math.max(0, (u - 0.1) / 0.8))); return { z: cz0 + (0.18 + u * 0.6) * (cz1 - cz0), y0: base + cab.h * 0.82 - 0.02, y1: base + cab.h * (0.84 + 0.18 * t) + 0.01, w: W * cab.w * 0.84, p: 4 }; }, true);
var rm = new THREE.Mesh(rf, trim);
g.add(rm);
g.userData.roof.push(rm);
}
else if (cab && cab.inset) {
var wz = -L / 2 + cab.b * L, wy = pyLerpProf(S.top, cab.b) - 0.5;
var ws = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.6, 0.62), glassM);
ws.position.set(0, wy, wz + 0.02);
ws.rotation.x = -0.45;
g.add(ws);
[-1, 1].forEach(function (s) { var sw = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.5), glassM); sw.position.set(s * W * 0.99, wy + 0.05, wz - 0.55); sw.rotation.y = s * Math.PI / 2; g.add(sw); });
}
var seatZ = S.open ? -L * 0.08 : (cab ? (-L / 2 + (cab.a + cab.b) / 2 * L - 0.15) : 0), seatY = clr + 0.12;
if (car.style === "monster")
seatY = clr + 0.7;
else if (car.style === "van") {
seatZ = L * 0.24;
seatY = clr + 0.5;
}
else if (car.style === "bus" || car.style === "icecream") {
seatZ = L * (car.style === "bus" ? 0.31 : 0.25);
seatY = clr + 0.75;
}
else if (car.style === "mech")
seatY = clr + 0.5;
else if (car.style === "sixer") {
seatY = clr + 0.25;
}
else if (car.style === "hover") {
seatY = clr + 0.15;
}
else if (car.style === "bubble") {
seatY = clr + 0.2;
}
var ck = new THREE.Group();
ck.position.set(0, seatY, seatZ);
g.add(ck);
g.userData.cockpit = ck;
var seatM = pyMat("matte", 0x2A2A2E);
var seat = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.3, 0.14, lite ? 8 : 14), seatM);
seat.position.set(car.style === "needle" ? 0 : -0.38, 0.1, 0);
ck.add(seat);
var back = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.66, lite ? 8 : 14, 1, false, Math.PI * 0.15, Math.PI * 0.7), seatM);
back.position.set(seat.position.x, 0.44, -0.18);
back.rotation.y = Math.PI;
ck.add(back);
if (car.style !== "needle" && car.style !== "trike") {
var s2 = seat.clone();
s2.position.x = 0.38;
ck.add(s2);
var b2 = back.clone();
b2.position.x = 0.38;
ck.add(b2);
}
var drv = pyDriver(car.trim, lite);
drv.position.set(seat.position.x, 0.08, 0.02);
ck.add(drv);
g.userData.driver = drv;
var dash = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, (car.style === "needle" ? 0.6 : 1.3), lite ? 8 : 12, 1, false, 0, Math.PI), dark);
dash.rotation.z = Math.PI / 2;
dash.position.set(car.style === "needle" ? 0 : -0.05, 0.62, 0.66);
ck.add(dash);
var wheel = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.022, 6, lite ? 12 : 20), dark);
wheel.position.set(seat.position.x, 0.66, 0.48);
wheel.rotation.x = -0.5;
ck.add(wheel);
g.userData.steer = wheel;
[-0.12, 0.08].forEach(function (dx, i) { var gg = new THREE.Mesh(new THREE.CircleGeometry(0.055, lite ? 10 : 16), pyMat("glow", i ? 0x6AE0FF : 0xFFB060)); gg.position.set(seat.position.x + dx, 0.74, 0.585); gg.rotation.x = -0.5; ck.add(gg); });
if (S.cage) {
var bar = function (a, b) {
var d = new THREE.Vector3().subVectors(b, a), m = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, d.length(), lite ? 6 : 10), trim);
m.position.copy(a).addScaledVector(d, 0.5);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
g.add(m);
};
var y0 = pyLerpProf(S.top, 0.5), y1 = y0 + 0.95, V = function (x, y, z) { return new THREE.Vector3(x, y, z); };
[-1, 1].forEach(function (s) { bar(V(s * W * 0.62, y0 - 0.1, -0.9), V(s * W * 0.55, y1, -0.6)); bar(V(s * W * 0.55, y1, -0.6), V(s * W * 0.55, y1, 0.35)); bar(V(s * W * 0.55, y1, 0.35), V(s * W * 0.66, y0 - 0.1, 1.05)); });
bar(V(-W * 0.55, y1, -0.6), V(W * 0.55, y1, -0.6));
bar(V(-W * 0.55, y1, 0.35), V(W * 0.55, y1, 0.35));
}
if (S.halo) {
var h = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.035, 6, lite ? 12 : 20, Math.PI), trim);
h.position.set(0, seatY + 0.98, seatZ + 0.12);
h.rotation.x = -Math.PI / 2 + 0.15;
h.rotation.z = Math.PI / 2;
g.add(h);
}
if (S.screen) {
var sc = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.1, 0.32), glassM);
sc.position.set(0, pyLerpProf(S.top, 0.55) + 0.16, -L / 2 + 0.6 * L);
sc.rotation.x = -0.5;
g.add(sc);
}
g.userData.wheels = [];
if (S.pads) {
[[-1, 0.22], [1, 0.22], [-1, 0.78], [1, 0.78]].forEach(function (p) {
var pad = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.22, lite ? 12 : 20), dark);
pad.position.set(p[0] * W * 0.82, clr - 0.05, -L / 2 + p[1] * L);
g.add(pad);
var glow = new THREE.Mesh(new THREE.CircleGeometry(0.4, lite ? 12 : 20), pyMat("glow", car.trim, { op: 0.8 }));
glow.rotation.x = Math.PI / 2;
glow.position.set(pad.position.x, clr - 0.17, pad.position.z);
g.add(glow);
g.userData.wheels.push(pad);
});
g.userData.hover = 1;
}
else {
(S.wheels || []).forEach(function (wd) {
var r = wd[1], w = wd[2] * (S.wide || 1), z = -L / 2 + wd[0] * L, mono = !!wd[3];
var sides = mono ? [0] : [-1, 1];
sides.forEach(function (s) {
var wh = pyWheel(r, w, car.style === "monster" || car.style === "mech" ? 0x3A3A3E : car.style === "bus" ? 0x1A1A1C : 0xC8CCD4, lite);
var x = s * (W * (S.wide || 1) - w * 0.3);
if (car.style === "needle" || car.style === "buggy")
x = s * (W * (S.wide || 1) + w * 0.1);
wh.position.set(x, r, z);
g.add(wh);
g.userData.wheels.push(wh);
wh.userData.front = wd[0] > 0.5;
if (car.style === "monster" || car.style === "buggy" || car.style === "needle") {
var arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, Math.abs(x) - 0.2, 8), chrome);
arm.rotation.z = Math.PI / 2;
arm.position.set(x / 2, r, z);
g.add(arm);
if (car.style === "monster") {
var sp = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.9, 10), pyMat("paint", car.trim));
sp.position.set(x * 0.6, r + 0.55, z);
sp.rotation.z = s * 0.4;
g.add(sp);
}
}
});
});
}
var nz = L / 2 - 0.06, tz = -L / 2 + 0.04, ly = pyLerpProf(S.top, 0.92) - 0.16, ty = pyLerpProf(S.top, 0.05) - 0.16;
if (car.style === "monster" || car.style === "mech") {
ly = clr + 0.55;
ty = clr + 0.55;
}
[-1, 1].forEach(function (s) {
var hl = new THREE.Mesh(new THREE.SphereGeometry(0.11, lite ? 8 : 12, lite ? 6 : 8), pyMat("glow", 0xFFF4D8));
hl.scale.set(1.4, 0.6, 0.5);
hl.position.set(s * W * 0.62 * pyLerpProf(S.plan, 0.95), ly, nz - 0.02);
g.add(hl);
var tl = new THREE.Mesh(new THREE.SphereGeometry(0.1, lite ? 8 : 12, lite ? 6 : 8), pyMat("glow", 0xC8281C));
tl.scale.set(1.8, 0.5, 0.4);
tl.position.set(s * W * 0.7 * pyLerpProf(S.plan, 0.05), ty, tz);
g.add(tl);
});
[-1, 1].forEach(function (s) {
var ex = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.3, lite ? 8 : 12), chrome);
ex.rotation.x = Math.PI / 2;
ex.position.set(s * W * 0.4, clr + 0.1, -L / 2 - 0.06);
g.add(ex);
if (cab && !S.open) {
var mr = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), trim);
mr.scale.set(1, 0.7, 1.4);
mr.position.set(s * W * cab.w * 1.12, pyLerpProf(S.top, cab.a + 0.04) + 0.12, -L / 2 + (cab.a + 0.06) * L);
g.add(mr);
}
});
if (S.spoiler) {
var sy = pyLerpProf(S.top, 0.04) + (S.spoiler === 2 ? 0.5 : 0.32), wing = pyLoft(lite ? 4 : 6, lite ? 8 : 10, function (u) { return { z: -0.22 + u * 0.44, y0: sy - 0.04 * Math.sin(Math.PI * u), y1: sy + 0.05 * Math.sin(Math.PI * u) + 0.005, w: W * (S.spoiler === 2 ? 1.4 : 1.02), p: 6 }; }, true);
var wm = new THREE.Mesh(wing, trim);
wm.position.z = -L / 2 + 0.3;
g.add(wm);
[-1, 1].forEach(function (s) { var st = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, sy - pyLerpProf(S.top, 0.04) + 0.1, 6), dark); st.position.set(s * W * 0.55, (sy + pyLerpProf(S.top, 0.04)) / 2, -L / 2 + 0.3); g.add(st); });
}
if (S.scoop) {
var sc2 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.5, lite ? 8 : 12, 1, false, 0, Math.PI), trim);
sc2.rotation.x = Math.PI / 2;
sc2.rotation.z = Math.PI;
sc2.position.set(0, pyLerpProf(S.top, 0.78) + 0.02, L * 0.25);
g.add(sc2);
}
if (S.plough) {
var pl = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, W * 2.2, lite ? 10 : 16, 1, true, -0.7, 1.4), pyMat("chrome", 0x8A8E96, { ds: 1 }));
pl.rotation.z = Math.PI / 2;
pl.position.set(0, 0.7, L / 2 - 0.9);
g.add(pl);
}
pyFitArms(g, car, { L: L, W: W, S: S, clr: clr, lite: lite });
pyNeonKit(g, car, { L: L, W: W, S: S, clr: clr, lite: lite });
g.traverse(function (m) { if (m.isMesh) {
m.raycast = function () { };
if (!lite && m.material && !m.material.transparent)
m.castShadow = true;
} });
g.userData.car = car;
g.userData.L = L;
g.userData.W = W;
return g;
},
function (g, car, D) {
var L = D.L, W = D.W, S = D.S, lite = D.lite, top = function (u) { return pyLerpProf(S.top, u); };
var gun = pyMat("chrome", 0x5A5E66), dark = pyMat("matte", 0x222226), trim = pyMat("paint", car.trim), seg = lite ? 8 : 14;
var A = new THREE.Group();
g.add(A);
g.userData.arms = A;
var tube = function (r, len, x, y, z, mat) { var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg), mat || gun); m.rotation.x = Math.PI / 2; m.position.set(x, y, z); A.add(m); return m; };
var o = car.off, roofU = S.cab ? (S.cab.a + S.cab.b) / 2 : 0.45, roofY = top(roofU) + (S.cab ? S.cab.h : 0.1);
if (o === "missile") {
[-1, 1].forEach(function (s) { var pod = tube(0.16, 1.0, s * W * 0.45, roofY + 0.12, -L * 0.05, trim); for (var i = 0; i < 2; i++) {
var tip = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.2, seg), pyMat("paint", 0xE8E8E8));
tip.rotation.x = Math.PI / 2;
tip.position.set(s * W * 0.45 + (i ? 0.06 : -0.06), roofY + 0.12, -L * 0.05 + 0.58);
A.add(tip);
} });
}
else if (o === "rockets") {
[-1, 1].forEach(function (s) { for (var i = 0; i < 2; i++)
tube(0.06, 0.7, s * (W * 0.7), top(0.7) + 0.1 + i * 0.13, L * 0.22); });
}
else if (o === "drones") {
var hg = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.16, seg), trim);
hg.position.set(0, roofY + 0.1, -L * 0.08);
A.add(hg);
for (var d = 0; d < 3; d++) {
var dr = new THREE.Mesh(new THREE.SphereGeometry(0.11, seg, 6), pyMat("glow", 0x9AE0FF));
dr.position.set(Math.cos(d * 2.1) * 0.3, roofY + 0.24, -L * 0.08 + Math.sin(d * 2.1) * 0.3);
A.add(dr);
}
}
else if (o === "cannon") {
tube(0.12, 1.8, 0, top(0.75) + 0.16, L * 0.2);
var br = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.3, 0.32, seg), dark);
br.position.set(0, top(0.6) + 0.1, L * 0.06);
A.add(br);
}
else if (o === "oil") {
var tk = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, W * 1.1, seg), dark);
tk.rotation.z = Math.PI / 2;
tk.position.set(0, top(0.05) + 0.1, -L / 2 + 0.25);
A.add(tk);
tube(0.05, 0.4, 0, D.clr + 0.15, -L / 2 - 0.1);
}
else if (o === "spikes") {
var bx = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.36, 0.3, 6), dark);
bx.position.set(0, top(0.05) + 0.14, -L / 2 + 0.35);
A.add(bx);
for (var k = 0; k < 6; k++) {
var sp = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.18, 5), gun);
sp.position.set(Math.cos(k) * 0.24, top(0.05) + 0.36, -L / 2 + 0.35 + Math.sin(k) * 0.24);
A.add(sp);
}
}
else if (o === "mine") {
var dm = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.4, seg), trim);
dm.rotation.z = Math.PI / 2;
dm.position.set(0, top(0.06) + 0.16, -L / 2 + 0.4);
A.add(dm);
}
else if (o === "gravity") {
var gs = new THREE.Mesh(new THREE.SphereGeometry(0.26, seg, 10), pyMat("glow", 0xB07AFF, { op: 0.85 }));
gs.position.set(0, top(0.08) + 0.32, -L / 2 + 0.45);
A.add(gs);
var rg = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.03, 6, seg), gun);
rg.position.copy(gs.position);
A.add(rg);
A.userData.spin = rg;
}
else if (o === "tar") {
var mt = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 0.7, seg), dark);
mt.position.set(0, roofY + 0.3, -L * 0.12);
mt.rotation.x = 0.6;
A.add(mt);
}
else if (o === "flame") {
[-1, 1].forEach(function (s) { var nz = tube(0.08, 0.55, s * W * 0.55, top(0.9) - 0.05, L / 2 - 0.05); var tip = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.08, 0.12, seg), pyMat("glow", 0xFF7A2A, { op: 0.9 })); tip.rotation.x = Math.PI / 2; tip.position.set(s * W * 0.55, top(0.9) - 0.05, L / 2 + 0.26); A.add(tip); });
}
else if (o === "frost") {
var ds = new THREE.Mesh(new THREE.SphereGeometry(0.3, seg, 8, 0, Math.PI * 2, 0, Math.PI / 2), pyMat("chrome", 0xD8F0FF));
ds.rotation.x = Math.PI / 2;
ds.position.set(0, top(0.85) + 0.1, L / 2 - 0.4);
A.add(ds);
var fc = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), pyMat("glow", 0xBFE8FF));
fc.position.set(0, top(0.85) + 0.1, L / 2 - 0.2);
A.add(fc);
}
else if (o === "arc") {
var col = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, 0.6, seg), gun);
col.position.set(0, roofY + 0.3, -L * 0.05);
A.add(col);
for (var c = 0; c < 3; c++) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.16 - c * 0.03, 0.025, 6, seg), pyMat("chrome", 0xB87333));
ring.rotation.x = Math.PI / 2;
ring.position.set(0, roofY + 0.12 + c * 0.17, -L * 0.05);
A.add(ring);
}
var ball = new THREE.Mesh(new THREE.SphereGeometry(0.12, seg, 8), pyMat("glow", 0xD8E8FF));
ball.position.set(0, roofY + 0.66, -L * 0.05);
A.add(ball);
}
else if (o === "harpoon") {
tube(0.09, 1.2, 0, top(0.85) + 0.15, L / 2 - 0.3);
var hk = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.3, 4), gun);
hk.rotation.x = Math.PI / 2;
hk.position.set(0, top(0.85) + 0.15, L / 2 + 0.4);
A.add(hk);
}
else if (o === "magnet") {
var mg = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.09, 8, seg, Math.PI), pyMat("paint", 0xC02A2A));
mg.position.set(0, roofY + 0.32, -L * 0.1);
mg.rotation.y = Math.PI / 2;
A.add(mg);
[-1, 1].forEach(function (s) { var tp = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.12, seg), gun); tp.position.set(0, roofY + 0.04, -L * 0.1 + s * 0.28); A.add(tp); });
}
else if (o === "emp") {
var dish = new THREE.Mesh(new THREE.SphereGeometry(0.42, seg, 8, 0, Math.PI * 2, 0, Math.PI * 0.4), pyMat("chrome", 0xD8DCE4, { ds: 1 }));
dish.position.set(0, roofY + 0.1, -L * 0.05);
A.add(dish);
var ant = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 6), gun);
ant.position.set(0, roofY + 0.3, -L * 0.05);
A.add(ant);
A.userData.spin = dish;
}
else if (o === "shock") {
var plate = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.1, seg), gun);
plate.rotation.x = Math.PI / 2;
plate.position.set(0, top(0.9) - 0.1, L / 2 + 0.08);
A.add(plate);
for (var r2 = 0; r2 < 2; r2++) {
var rr = new THREE.Mesh(new THREE.TorusGeometry(0.34 + r2 * 0.18, 0.03, 6, seg), pyMat("glow", 0xFFE8C8, { op: 0.7 }));
rr.position.set(0, top(0.9) - 0.1, L / 2 + 0.14);
A.add(rr);
}
}
else if (o === "saw") {
g.userData.saws = [];
[-1, 1].forEach(function (s) {
var bl = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.03, lite ? 12 : 22), pyMat("chrome", 0xE0E0E8));
bl.rotation.z = Math.PI / 2;
bl.position.set(s * (W + 0.08), D.clr + 0.42, L * 0.02);
A.add(bl);
g.userData.saws.push(bl);
for (var t = 0; t < (lite ? 6 : 10); t++) {
var th = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 3), gun);
var a = t / (lite ? 6 : 10) * Math.PI * 2;
th.position.set(0, Math.cos(a) * 0.46, Math.sin(a) * 0.46);
th.rotation.x = a;
bl.add(th);
}
});
}
else if (o === "ram") {
var rp = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, W * 1.9, seg, 1, true, -0.9, 1.8), pyMat("chrome", 0x7A7E86, { ds: 1 }));
rp.rotation.z = Math.PI / 2;
rp.position.set(0, top(0.95) * 0.6, L / 2 - 0.2);
A.add(rp);
for (var r3 = 0; r3 < 5; r3++) {
var spk = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.32, 6), gun);
spk.rotation.x = Math.PI / 2;
spk.position.set((r3 - 2) * W * 0.36, top(0.95) * 0.6, L / 2 + 0.35);
A.add(spk);
}
}
var d0 = car.def;
if (d0 === "plate") {
g.userData.plates = [];
[-1, 1].forEach(function (s) { var p = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, L * 0.55, lite ? 8 : 12, 1, true, -0.35, 0.7), pyMat("chrome", 0x6A6E76, { ds: 1 })); p.rotation.x = Math.PI / 2; p.rotation.y = s > 0 ? 0 : Math.PI; p.position.set(s * (W - 1.15), top(0.5) * 0.55 + 0.2, 0); p.visible = false; A.add(p); g.userData.plates.push(p); });
}
else if (d0 === "shield" || d0 === "mirror") {
var em = new THREE.Mesh(new THREE.SphereGeometry(0.12, seg, 8), pyMat("glow", d0 === "shield" ? 0x8AD8FF : 0xE8E0FF));
em.position.set(0, roofY + 0.06, -L * 0.22);
A.add(em);
}
else if (d0 === "jumpjet") {
[-1, 1].forEach(function (s) { var j = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 0.3, seg), gun); j.position.set(s * W * 0.6, D.clr + 0.05, -L * 0.3); A.add(j); });
}
else if (d0 === "smoke") {
[-1, 1].forEach(function (s) { tube(0.07, 0.3, s * W * 0.25, D.clr + 0.25, -L / 2 - 0.05, dark); });
}
},
function () {
if (PYT.S.length)
return;
var n = PY_LINE.length;
var pts = PY_LINE.map(function (p) { return new THREE.Vector3(p[0], p[2], p[1]); });
var curve = new THREE.CatmullRomCurve3(pts, true, "centripetal");
var last = curve.getPoint(0), acc = 0, d = 0, step = 1 / (n * 400), S = PYT.S;
var push = function (p, t) {
var k = Math.floor(t * n) % n, f = t * n - Math.floor(t * n), a = PY_LINE[k], b = PY_LINE[(k + 1) % n];
var near = f < 0.5 ? a : b;
S.push({ x: p.x, y: p.y, z: p.z, w: a[3] + (b[3] - a[3]) * f, zone: near[4], fl: near[5], d: d, k: k, cut: null });
};
push(last, 0);
for (var t = step; t < 1; t += step) {
var p = curve.getPoint(t), sd = p.distanceTo(last);
acc += sd;
d += sd;
last = p;
if (acc >= 4) {
acc -= 4;
push(p, t);
}
}
PYT.L = d + last.distanceTo(curve.getPoint(0));
S.forEach(function (s) { var a = PY_LINE[s.k]; s.fl = a[5]; s.zone = a[4]; });
S.forEach(function (s, i) { var b = S[(i + 1) % S.length], a = S[(i - 1 + S.length) % S.length], dx = b.x - a.x, dz = b.z - a.z, l = Math.hypot(dx, dz) || 1; s.tx = dx / l; s.tz = dz / l; s.main = true; s.i = i; });
PY_CUTS.forEach(function (C, ci) {
var cp = C.pts.map(function (p) { return new THREE.Vector3(p[0], p[2], p[1]); });
var cv = new THREE.CatmullRomCurve3(cp, false, "centripetal"), len = cv.getLength(), m = Math.max(4, Math.round(len / 4));
var dFrom = pyMainDistAt(C.from), dTo = pyMainDistAt(C.to);
if (dTo < dFrom)
dTo += PYT.L;
var list = [];
for (var j = 0; j <= m; j++) {
var u = j / m, p = cv.getPointAt(u), seg = Math.min(C.pts.length - 2, Math.floor(u * (C.pts.length - 1))), f = u * (C.pts.length - 1) - seg;
var a = C.pts[seg], b = C.pts[seg + 1], w = a[3] + (b[3] - a[3]) * f;
list.push({ x: p.x, y: p.y, z: p.z, w: a[3] === 0 ? 0 : (b[3] === 0 ? a[3] : w), zone: C.zone, fl: a[3] === 0 ? "g" : (a[4] !== undefined ? a[4] : (C.tunnel ? "t" : "")), d: dFrom + (dTo - dFrom) * u, cut: C.k, main: false });
}
list.forEach(function (s, i) { var b = list[Math.min(list.length - 1, i + 1)], a = list[Math.max(0, i - 1)], dx = b.x - a.x, dz = b.z - a.z, l = Math.hypot(dx, dz) || 1; s.tx = dx / l; s.tz = dz / l; s.i = S.length + PYT.cuts.length; PYT.cuts.push(s); });
});
var all = S.concat(PYT.cuts), c = PYT.cell;
all.forEach(function (s, idx) {
var r = s.w / 2 + 30, x0 = Math.floor((s.x - r) / c), x1 = Math.floor((s.x + r) / c), z0 = Math.floor((s.z - r) / c), z1 = Math.floor((s.z + r) / c);
for (var gx = x0; gx <= x1; gx++)
for (var gz = z0; gz <= z1; gz++) {
var key = gx + "," + gz;
(PYT.grid[key] || (PYT.grid[key] = [])).push(idx);
}
});
PYT.all = all;
var B = PYT.bounds, cs = 50, nx = Math.ceil((B.x1 - B.x0) / cs), nz = Math.ceil((B.z1 - B.z0) / cs), co = new Int32Array(nx * nz), cd = new Float32Array(nx * nz);
for (var ix = 0; ix < nx; ix++)
for (var iz = 0; iz < nz; iz++) {
var X = B.x0 + (ix + 0.5) * cs, Z = B.z0 + (iz + 0.5) * cs, best = -1, bd = 1e12;
for (var q = 0; q < S.length; q += 2) {
var dd = (S[q].x - X) * (S[q].x - X) + (S[q].z - Z) * (S[q].z - Z);
if (dd < bd) {
bd = dd;
best = q;
}
}
co[ix * nz + iz] = best;
cd[ix * nz + iz] = Math.sqrt(bd);
}
PYT.coarse = { cs: cs, nx: nx, nz: nz, i: co, d: cd };
var run = null;
S.forEach(function (s, i) {
if (s.fl.indexOf("c") >= 0) {
if (!run || i - run.last > 1 || run.n >= 3) {
run = { a: i, last: i, n: 0, st: 0, t: 0, mesh: null };
PYT.slabs.push(run);
}
run.last = i;
run.n++;
s.slab = run;
}
});
var cutSpans = PY_CUTS.filter(function (C) { return !C.tangle; }).map(function (C) { var a = pyMainDistAt(C.from), b = pyMainDistAt(C.to); return [a, b < a ? b + PYT.L : b]; });
var nCp = Math.max(10, Math.round(PYT.L / 900));
for (var k = 1; k <= nCp; k++) {
var want = PYT.L * k / (nCp + 1);
cutSpans.forEach(function (sp) { if (want > sp[0] - 8 && want < sp[1] + 8)
want = sp[1] + 12; });
PYT.cps.push(want % PYT.L);
}
PYT.cps.sort(function (a, b) { return a - b; });
PYT.patches = [];
var lastP = -1e9;
S.forEach(function (s, i) {
if (s.zone !== "jungle" && s.zone !== "dunes")
return;
if (s.d - lastP < (s.zone === "dunes" ? 150 : 190))
return;
var ok = true;
for (var q = -3; q <= 6; q++) {
var t = S[(i + q + S.length) % S.length];
if (t.zone !== s.zone || /[gcret]/.test(t.fl)) {
ok = false;
break;
}
}
if (!ok)
return;
var pick = (i * 7) % 3, hw = s.w / 2 - 0.8, l = pick === 0 ? -hw : pick === 1 ? -hw * 0.45 : 0.6, r = pick === 0 ? -0.6 : pick === 1 ? hw * 0.45 : hw;
var P = { a: i, b: i + 3, l: l, r: r, kind: s.zone === "dunes" ? "sand" : "quicksand" };
PYT.patches.push(P);
lastP = s.d;
for (var q2 = 0; q2 <= 3; q2++)
S[(i + q2) % S.length].patch = P;
});
PYT.cells = [];
var lastC = 120;
S.forEach(function (s, i) {
if (s.d - lastC < 400 || s.d > PYT.L - 150)
return;
for (var q = -2; q <= 2; q++) {
var t = S[(i + q + S.length) % S.length];
if (/[gcr]/.test(t.fl) || t.slab || t.patch)
return;
}
lastC = s.d;
[-1, 0, 1].forEach(function (k) { var a = k * s.w * 0.28; PYT.cells.push({ x: s.x + a * s.tz, z: s.z - a * s.tx, y: s.y + 1.3, i: i, taken: 0 }); });
});
var fb = null, fd = 1e12;
S.forEach(function (s) { if (s.zone !== "sky" || s.fl.indexOf("c") >= 0 || s.fl.indexOf("g") >= 0)
return; var d = Math.hypot(s.x - PY_FINDS.fallenspan.x, s.z - PY_FINDS.fallenspan.z); if (d < fd) {
fd = d;
fb = s;
} });
if (fb) {
PYT.fallen0 = fb.d - 26;
PYT.fallen1 = fb.d + 26;
var ac = (PY_FINDS.fallenspan.x - fb.x) * fb.tz - (PY_FINDS.fallenspan.z - fb.z) * fb.tx;
PYT.fallenSide = ac >= 0 ? 1 : -1;
var off = fb.w / 2 + 15;
PY_FINDS.fallenspan.x = fb.x + PYT.fallenSide * off * fb.tz;
PY_FINDS.fallenspan.z = fb.z - PYT.fallenSide * off * fb.tx;
PY_FINDS.fallenspan.y = fb.y - 11;
}
},
function (x, z, feet) {
var c = PYT.cell, L = PYT.grid[Math.floor(x / c) + "," + Math.floor(z / c)];
if (!L)
return null;
var best = null, bd = 1e9, all = PYT.all;
for (var k = 0; k < L.length; k++) {
var s = all[L[k]], dx = x - s.x, dz = z - s.z, along = dx * s.tx + dz * s.tz;
if (Math.abs(along) > 4.5)
continue;
var across = dx * s.tz - dz * s.tx, ad = Math.abs(across);
var score = ad + (feet !== undefined && feet !== null ? Math.max(0, Math.abs(feet - s.y) - 2.5) * 4 : 0);
if (score < bd) {
bd = score;
best = { s: s, across: across, along: along };
}
}
if (!best)
return null;
var s = best.s, nxt = s.main ? PYT.S[(s.i + 1) % PYT.S.length] : PYT.cuts[Math.min(PYT.cuts.length - 1, s.i - PYT.S.length + 1)];
var f = Math.max(0, Math.min(1, best.along / 4)), y = s.y;
if (nxt && nxt.cut === s.cut)
y = s.y + (nxt.y - s.y) * f;
var dist = s.d + best.along;
if (s.main)
dist = ((dist % PYT.L) + PYT.L) % PYT.L;
return { s: s, across: best.across, y: y, w: s.w, zone: s.zone, fl: s.fl, dist: dist, ad: Math.abs(best.across) };
},
function (x, z, feet) {
var n = pyNear(x, z, feet);
if (!n)
return null;
if (n.w <= 0 || n.fl.indexOf("g") >= 0)
return null;
if (n.ad > n.w / 2 + 0.8)
return null;
var sl = n.s.slab;
if (sl && sl.st >= 2 && sl.st < 4)
return null;
if (feet !== undefined && feet !== null && feet < n.y - 2.5)
return null;
n.deck = n.y;
return n;
},
function (x, z) {
var c = PYT.cell, L = PYT.grid[Math.floor(x / c) + "," + Math.floor(z / c)];
if (!L)
return null;
var best = null, bd = 1e9, all = PYT.all;
for (var k = 0; k < L.length; k++) {
var s = all[L[k]];
if (s.fl.indexOf("e") >= 0 && !s.main)
continue;
var dx = x - s.x, dz = z - s.z, along = dx * s.tx + dz * s.tz;
if (Math.abs(along) > 4.5)
continue;
var ad = Math.abs(dx * s.tz - dz * s.tx);
if (ad < bd) {
bd = ad;
best = { s: s, ad: ad, y: s.y };
}
}
return best;
},
function (x, z) {
if (x > PY_FLAT.x0 && x < PY_FLAT.x1 && z > PY_FLAT.z0 && z < PY_FLAT.z1)
return "paddock";
var n = pyNear(x, z);
if (n)
return n.zone;
if (typeof pySnarlK === "function" && pySnarlK(x, z) > 0.5)
return "snarl";
var C = PYT.coarse, B = PYT.bounds;
if (!C)
return "paddock";
var ix = Math.max(0, Math.min(C.nx - 1, Math.floor((x - B.x0) / C.cs))), iz = Math.max(0, Math.min(C.nz - 1, Math.floor((z - B.z0) / C.cs)));
var s = PYT.S[C.i[ix * C.nz + iz]];
return s ? s.zone : "paddock";
},
function (x, z, zone) {
var n = pyNoise(x * 0.006, z * 0.006, 7), m = pyNoise(x * 0.02, z * 0.02, 11);
switch (zone) {
case "canyon": return 3 + n * 6 + m * 1.5;
case "tundra": return 6 + n * 26 + m * 2;
case "ice": return -4 + m * 1.5;
case "sky": return PY_ABYSS - 10 + m * 2;
case "lava": return -1 + n * 12 + m * 3;
case "jungle": return 2 + n * 16 + m * 2;
case "storm": return 2 + n * 12 + m * 2;
case "dunes": return 4 + 9 * Math.abs(Math.sin(x * 0.018 + z * 0.011 + n * 2.4)) + n * 5 + m * 0.8;
case "cave": return 46 + n * 44 + m * 4;
case "coast": return pySeaFloor(x, z, m);
default: return n * 3;
}
},
function (x, z, h) {
var c = PYT.cell, L = PYT.grid[Math.floor(x / c) + "," + Math.floor(z / c)];
if (!L)
return h;
for (var k = 0; k < L.length; k++) {
var s = PYT.all[L[k]];
if (s.main || s.w <= 0 || s.fl.indexOf("e") < 0)
continue;
var dx = x - s.x, dz = z - s.z;
if (Math.abs(dx * s.tx + dz * s.tz) > 4.5)
continue;
var ad = Math.abs(dx * s.tz - dz * s.tx), lim = s.y - 2.4 + Math.max(0, ad - (s.w / 2 + 1.5)) * 1.3;
if (h > lim)
h = lim;
}
return h;
},
function (x, z) {
var co = pyCoarse(x, z), zone = co.s ? co.s.zone : "paddock", h = pyNatural(x, z, zone);
if (zone === "canyon" && co.d > 30)
h += Math.min(60, (co.d - 30) * 2.4) * (0.65 + 0.35 * pyNoise(x * 0.03, z * 0.03, 3));
if (zone === "tundra" && co.d > 60)
h += Math.min(40, (co.d - 60) * 0.8);
var sk = typeof pySnarlK === "function" ? pySnarlK(x, z) : 0;
if (sk > 0) {
h = h * (1 - sk) + (PY_SNARL.y + pyNoise(x * 0.03, z * 0.03, 13) * 0.8 - 0.4) * sk;
if (sk > 0.5)
zone = "snarl";
}
var n = pyNearGround(x, z);
var s = n ? n.s : co.s, ad = n ? n.ad : co.d;
if (!s)
return h;
if (s.zone !== zone && /dunes|cave|coast/.test(s.zone + zone)) {
var bk = Math.max(0, Math.min(1, (ad - 30) / 60));
h = pyNatural(x, z, s.zone) * (1 - bk) + h * bk;
}
if (s.zone === "coast") {
var side = s.main ? (x - s.x) * s.tz - (z - s.z) * s.tx : (s.cut === "lowtide" ? 60 : -60);
if (side < 0)
h = Math.max(h, 7 + pyNoise(x * 0.008, z * 0.008, 4) * 26 * Math.min(1, (-side) / 60));
}
var elev = s.fl.indexOf("e") >= 0, gap = s.fl.indexOf("g") >= 0 || s.w <= 0, deck = n ? n.y : s.y;
if (s.zone === "cave" && elev)
return PY_ABYSS - 10 + pyNoise(x * 0.02, z * 0.02, 9) * 3;
if (elev)
return h;
if (s.zone === "coast" && s.slab)
return Math.min(h, -6);
if (gap) {
var floor = s.cut === "cliffjump" ? -6 : Math.min(h, deck - 28);
return floor;
}
if (s.zone === "ice")
return h;
var edge = s.w / 2 + 2.5;
if (ad < edge)
return deck - 0.6;
if (ad < edge + 22) {
var t = (ad - edge) / 22;
t = t * t * (3 - 2 * t);
var want = s.fl.indexOf("w") >= 0 ? Math.max(h, deck + t * 16) : h;
return deck - 0.6 + (want - (deck - 0.6)) * t;
}
return h;
},
function (x, z, y) {
var dk = pyDeck(x, z, y + 1.2);
if (dk && y > dk.deck - 2)
return null;
var zone = pyZoneAt(x, z);
if (zone === "coast" && y < PY_SEA + 0.2 && !pyDeck(x, z, y) && pySeaK(x, z) > 0.15)
return "the sea";
var ng = pyNear(x, z);
if (ng && ng.s.main && ng.fl.indexOf("g") >= 0 && y < ng.y - 12)
return zone === "dunes" ? "the sand chasm" : zone === "canyon" ? "the gorge" : "the drop";
if (zone === "ice" && y < PY_WATER + 0.2 && !pyDeck(x, z, y))
return "the freezing lake";
if (zone === "lava" && y < PY_LAVA + 0.3)
return "the lava";
if (y < PY_ABYSS + 12)
return "the drop";
if (pyPadAt(x, z, y))
return null;
var n = pyNear(x, z);
if (n && n.s.cut === "cliffjump" && n.fl.indexOf("g") >= 0 && y < 1)
return "the river";
return null;
},
function (x, z, feet) {
var D = pyDeck(x, z, feet);
var pad = pyPadAt(x, z, feet);
if (pad && (!D || pad.y > D.deck))
return pad.y;
if (D)
return D.deck;
var h = pyTerrain(x, z), zone = pyZoneAt(x, z);
if (zone === "ice")
return Math.max(h, PY_WATER - 1.2);
if (zone === "lava")
return Math.max(h, PY_LAVA - 0.8);
if (zone === "coast" && pySeaK(x, z) > 0.15)
return Math.max(h, PY_SEA - 1.2);
return h;
},
function (x, z, feet) {
var c = PYT.cell, L = PYT.grid[Math.floor(x / c) + "," + Math.floor(z / c)];
if (!L)
return false;
var hasF = feet !== undefined && feet !== null, wall = false;
for (var k = 0; k < L.length; k++) {
var s = PYT.all[L[k]];
if (s.w <= 0)
continue;
var dx = x - s.x, dz = z - s.z;
if (Math.abs(dx * s.tx + dz * s.tz) > 4.5)
continue;
if (hasF && Math.abs(feet - s.y) > 5)
continue;
var ad = Math.abs(dx * s.tz - dz * s.tx);
if (ad <= s.w / 2 + 1.0)
return false;
if (!wall && ad <= s.w / 2 + 14 && pyIsTun(s))
wall = true;
}
return wall;
},
function (x, z, feet) {
var n = pyNear(x, z, feet);
if (!n)
return false;
if (n.fl.indexOf("e") < 0 || /[cgr]/.test(n.fl))
return false;
if (feet !== undefined && Math.abs(feet - n.y) > 2)
return false;
if (n.s.main && n.dist > PYT.fallen0 && n.dist < PYT.fallen1 && n.across * PYT.fallenSide > 0)
return false;
return n.ad > n.w / 2 + 0.3 && n.ad < n.w / 2 + 1.6;
},
function (kind, rx, ry) {
var base = (typeof texOf === "function") ? texOf(kind) : null, t;
if (base) {
t = base.clone();
t.needsUpdate = true;
}
else {
var k = "fb:" + kind;
if (!PY.tex[k]) {
PY.tex[k] = wTex(128, 128, function (x, W, H) { x.fillStyle = "#B8B8B8"; x.fillRect(0, 0, W, H); for (var i = 0; i < 900; i++) {
var v = 150 + Math.random() * 80 | 0;
x.fillStyle = "rgb(" + v + "," + v + "," + v + ")";
x.fillRect(Math.random() * W, Math.random() * H, 2, 2);
} });
}
t = PY.tex[k].clone();
t.needsUpdate = true;
}
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(rx || 1, ry || rx || 1);
return t;
},
function (list, a, b, left, right, yOff, mat, vTile, wrapTo) {
var pos = [], uv = [], idx = [], n = 0;
var add = function (s) {
var lx = s.x + left * (left < 0 && s.w !== undefined ? 1 : 1) * s.tz * 0, l = left === null ? -s.w / 2 : left, r = right === null ? s.w / 2 : right;
if (typeof left === "function")
l = left(s);
if (typeof right === "function")
r = right(s);
pos.push(s.x + l * s.tz, s.y + yOff, s.z - l * s.tx, s.x + r * s.tz, s.y + yOff, s.z - r * s.tx);
uv.push(0, s.d / (vTile || 4), (r - l) / 4, s.d / (vTile || 4));
if (n > 0) {
var q = (n - 1) * 2;
idx.push(q, q + 2, q + 1, q + 1, q + 2, q + 3);
}
n++;
};
for (var i = a; i <= b; i++)
add(list[i]);
if (wrapTo !== undefined) {
var w = Object.assign({}, list[wrapTo]);
w.d = list[b].d + 4;
add(w);
}
if (n < 2)
return null;
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.receiveShadow = true;
m.raycast = function () { };
return m;
},
function (list, a, b, across, y0, y1, mat, keep) {
var pos = [], uv = [], idx = [], n = 0, cut = function () { n = 0; };
var meshes = [], flush = function () {
if (idx.length) {
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.raycast = function () { };
meshes.push(m);
}
pos = [];
uv = [];
idx = [];
n = 0;
};
for (var i = a; i <= b; i++) {
var s = list[i];
if (keep && !keep(s)) {
flush();
continue;
}
var A = typeof across === "function" ? across(s) : across;
pos.push(s.x + A * s.tz, s.y + y0, s.z - A * s.tx, s.x + A * s.tz, s.y + y1, s.z - A * s.tx);
uv.push(s.d / 4, 0, s.d / 4, (y1 - y0) / 4);
if (n > 0) {
var q = (n - 1) * 2;
idx.push(q, q + 1, q + 2, q + 1, q + 3, q + 2);
}
n++;
}
flush();
return meshes;
},
function (G) {
var B = PYT.bounds, size = PY.lite ? 500 : 375, seg = PY.lite ? 20 : 72;
var mats = {};
for (var x0 = B.x0; x0 < B.x1; x0 += size)
for (var z0 = B.z0; z0 < B.z1; z0 += size) {
var cx = x0 + size / 2, cz = z0 + size / 2, zone = pyZoneAt(cx, cz), Z = PY_ZONES[zone];
var g = new THREE.PlaneGeometry(size, size, seg, seg);
g.rotateX(-Math.PI / 2);
var p = g.attributes.position, col = new Float32Array(p.count * 3), c = new THREE.Color(), c2 = new THREE.Color();
for (var i = 0; i < p.count; i++) {
var x = cx + p.getX(i), z = cz + p.getZ(i), h = pyTerrain(x, z), zz = pyZoneAt(x, z), ZZ = PY_ZONES[zz];
p.setY(i, h);
c.setHex(ZZ.ground);
var v = pyNoise(x * 0.05, z * 0.05, 5);
c.multiplyScalar(0.82 + v * 0.32);
if (zz === "canyon" && h > 14) {
c2.setHex(0xA8603A);
c.lerp(c2, Math.min(1, (h - 14) / 30));
}
if (zz === "tundra" && h < 8) {
c2.setHex(0xC8D8E4);
c.lerp(c2, 0.3);
}
if (zz === "lava" && h < PY_LAVA + 1.5) {
c2.setHex(0x3A1A10);
c.lerp(c2, 0.6);
}
if (zz === "sky") {
c.setHex(0x14141E);
}
if (zz === "ice" && h < PY_WATER - 2) {
c2.setHex(0x2A3A44);
c.lerp(c2, Math.min(1, (PY_WATER - 2 - h) / 3));
}
if (zz === "snarl") {
c2.setHex(v > 0.55 ? 0x34322F : v > 0.4 ? 0x4A4640 : 0x5A5248);
c.lerp(c2, 0.85);
}
if (zz === "dunes") {
c2.setHex(h > 9 ? 0xE8B87A : 0xC88A52);
c.lerp(c2, 0.35);
}
if (zz === "cave") {
if (h < PY_ABYSS + 20) {
c.setHex(0x120E1C);
}
else {
c2.setHex(0x4A4258);
c.lerp(c2, Math.min(1, Math.max(0, (h - 20) / 60)));
}
}
if (zz === "coast") {
if (h < PY_SEA + 0.6) {
c2.setHex(0x8A8064);
c.lerp(c2, 0.7);
}
else if (h < PY_SEA + 2.5) {
c2.setHex(0xD8C8A0);
c.lerp(c2, 0.6);
}
else if (h > 14) {
c2.setHex(0x6A6A62);
c.lerp(c2, Math.min(1, (h - 14) / 20));
}
}
col[i * 3] = c.r;
col[i * 3 + 1] = c.g;
col[i * 3 + 2] = c.b;
}
g.setAttribute("color", new THREE.BufferAttribute(col, 3));
g.computeVertexNormals();
var mk = Z.tex;
if (!mats[mk]) {
mats[mk] = new THREE.MeshLambertMaterial({ vertexColors: true, map: pyTex(mk, size / 12, size / 12) });
mats[mk].userData.realKind = "rubber";
mats[mk].userData.pySw = -1;
}
var m = new THREE.Mesh(g, mats[mk]);
m.position.set(cx, 0, cz);
m.receiveShadow = true;
m.raycast = function () { };
G.add(m);
}
},
function (zone) {
var Z = PY_ZONES[zone], key = "road:" + zone;
if (PY.mats[key])
return PY.mats[key];
var m;
if (zone === "ice")
m = new THREE.MeshPhongMaterial({ color: 0xC8E8F8, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.88, map: pyTex("snow", 1, 2) });
else if (zone === "tundra")
m = new THREE.MeshLambertMaterial({ color: 0xB8C2CC, map: pyTex("snow", 1, 2) });
else if (zone === "jungle")
m = new THREE.MeshPhongMaterial({ color: 0x6A5236, shininess: 30, specular: 0x403828, map: pyTex("earth", 1, 2) });
else if (zone === "lava")
m = new THREE.MeshLambertMaterial({ color: 0x3A3430, map: pyTex("stone", 1, 2) });
else if (zone === "storm")
m = new THREE.MeshPhongMaterial({ color: 0x5A5E66, shininess: 60, specular: 0x606870, map: pyTex("asphalt", 1, 2) });
else if (zone === "canyon")
m = new THREE.MeshLambertMaterial({ color: 0xA8907A, map: pyTex("asphalt", 1, 2) });
else if (zone === "sky")
m = new THREE.MeshLambertMaterial({ color: 0x34343E, map: pyTex("asphalt", 1, 2) });
else if (zone === "dunes")
m = new THREE.MeshLambertMaterial({ color: 0xD8B07A, map: pyTex("sand", 1, 2) });
else if (zone === "cave")
m = new THREE.MeshPhongMaterial({ color: 0x3E3A4A, shininess: 70, specular: 0x50486A, map: pyTex("stone", 1, 2) });
else if (zone === "coast")
m = new THREE.MeshPhongMaterial({ color: 0x8A8A80, shininess: 55, specular: 0x5A6A70, map: pyTex("stone", 2, 2) });
else
m = new THREE.MeshLambertMaterial({ color: 0x5A5A60, map: pyTex("asphalt", 1, 2) });
if (/^(paddock|canyon|sky|dunes|lava|snarl)$/.test(zone) || m.isMeshLambertMaterial && !/^(tundra|ice)$/.test(zone)) {
m.userData.realKind = "rubber";
m.userData.pySw = -1;
}
if (m.color.getHex() === 0x5A5A60)
m.userData.pySw = 0x6E6E74;
PY.mats[key] = m;
return m;
},
function (G) {
var S = PYT.S, N = S.length;
var runs = [], cur = null;
for (var i = 0; i < N; i++) {
var s = S[i], skip = s.fl.indexOf("g") >= 0 || !!s.slab;
if (skip) {
cur = null;
continue;
}
if (!cur || cur.zone !== s.zone) {
if (cur)
cur.b = i;
cur = { a: i, b: i, zone: s.zone };
runs.push(cur);
}
cur.b = i;
}
runs.forEach(function (r) {
var wrap = (r.b === N - 1 && !S[0].slab && S[0].fl.indexOf("g") < 0) ? 0 : undefined;
var to = r.b < N - 1 ? r.b + 1 : r.b;
if (S[to].fl.indexOf("g") >= 0 || S[to].slab)
to = r.b;
var m = pyRibbon(S, r.a, to, null, null, 0.02, pyRoadMat(r.zone), 4, wrap);
if (m)
G.add(m);
if (S[r.a].fl.indexOf("e") < 0 && r.zone !== "ice") {
var sm = pyMat("lambert", PY_ZONES[r.zone].ground);
[[function (s) { return -s.w / 2 - 3; }, function (s) { return -s.w / 2; }], [function (s) { return s.w / 2; }, function (s) { return s.w / 2 + 3; }]].forEach(function (lr) {
var sh = pyRibbon(S, r.a, to, lr[0], lr[1], -0.05, sm, 4, wrap);
if (sh)
G.add(sh);
});
}
if (/paddock|canyon|storm|sky|cave/.test(r.zone)) {
var lm = r.zone === "sky" ? pyMat("glow", 0x3AE8F0) : r.zone === "cave" ? pyMat("glow", 0x5AE8E0, { op: 0.85 }) : pyMat("lambert", 0xE8E4D8);
[[function (s) { return -s.w / 2 + 0.4; }, function (s) { return -s.w / 2 + 0.62; }], [function (s) { return s.w / 2 - 0.62; }, function (s) { return s.w / 2 - 0.4; }]].forEach(function (lr, j) {
var lm2 = r.zone === "sky" && j ? pyMat("glow", 0xF04AD8) : r.zone === "cave" && j ? pyMat("glow", 0xB07AFF, { op: 0.85 }) : lm;
var e = pyRibbon(S, r.a, to, lr[0], lr[1], 0.05, lm2, 4, wrap);
if (e)
G.add(e);
});
if (r.zone !== "sky" && r.zone !== "cave") {
for (var k = r.a; k < to; k += 3) {
var c = pyRibbon(S, k, Math.min(to, k + 1), -0.1, 0.1, 0.05, pyMat("lambert", r.zone === "canyon" ? 0xE8C040 : 0xE8E4D8), 4);
if (c)
G.add(c);
}
}
}
});
var chk = wTex(256, 32, function (x, W, H) { for (var i = 0; i < 16; i++)
for (var j = 0; j < 2; j++) {
x.fillStyle = (i + j) % 2 ? "#E8E8E8" : "#1A1A1A";
x.fillRect(i * 16, j * 16, 16, 16);
} });
var sl = new THREE.Mesh(new THREE.PlaneGeometry(S[0].w, 2), new THREE.MeshLambertMaterial({ map: chk }));
sl.rotation.x = -Math.PI / 2;
sl.rotation.z = Math.atan2(S[0].tx, S[0].tz);
sl.position.set(S[0].x, S[0].y + 0.06, S[0].z);
G.add(sl);
var deckM = pyMat("lambert", 0x2A2A32), railM = pyMat("chrome", 0x8A8E96), pilM = new THREE.MeshLambertMaterial({ color: 0x4A4A54, map: pyTex("concrete", 1, 8) });
var elev = function (s) { return s.fl.indexOf("e") >= 0 && s.fl.indexOf("g") < 0 && !s.slab; };
var ea = -1;
for (var i2 = 0; i2 <= N; i2++) {
var on = i2 < N && elev(S[i2]);
if (on && ea < 0)
ea = i2;
if (!on && ea >= 0) {
var eb = Math.min(N - 1, i2);
[-1, 1].forEach(function (sd) {
pyCurtain(S, ea, eb, function (s) { return sd * s.w / 2; }, -1.4, 0.02, deckM).forEach(function (m) { G.add(m); });
pyCurtain(S, ea, eb, function (s) { return sd * (s.w / 2 + 0.9); }, 0.55, 0.95, railM, function (s) { return !/[cgr]/.test(s.fl) && !(s.d > PYT.fallen0 && s.d < PYT.fallen1 && sd === PYT.fallenSide); }).forEach(function (m) { G.add(m); });
pyCurtain(S, ea, eb, function (s) { return sd * (s.w / 2 + 0.9); }, 0, 0.55, deckM, function (s) { return !/[cgr]/.test(s.fl) && !(s.d > PYT.fallen0 && s.d < PYT.fallen1 && sd === PYT.fallenSide); }).forEach(function (m) { G.add(m); });
});
var und = pyRibbon(S, ea, eb, function (s) { return s.w / 2; }, function (s) { return -s.w / 2; }, -1.4, deckM, 4);
if (und)
G.add(und);
for (var p = ea; p <= eb; p += PY.lite ? 14 : 8) {
var s = S[p], h = s.y - 1.4 - (PY_ABYSS - 10);
if (typeof pyRoadUnder === "function" && pyRoadUnder(s.x, s.z, s.y - 4, 3))
continue;
var pil = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.8, h, PY.lite ? 8 : 14), pilM);
pil.position.set(s.x, (s.y - 1.4 + PY_ABYSS - 10) / 2, s.z);
pil.raycast = function () { };
G.add(pil);
}
ea = -1;
}
}
PYT.slabs.forEach(function (sl2) {
var z = S[sl2.a].zone, mat = z === "ice" ? pyRoadMat("ice") : z === "lava" ? pyMat("lambert", 0x2E2622, { map: pyCrackTex() }) : z === "coast" ? pyMat("lambert", 0x8A8A7E, { map: pyCrackTex() }) : pyMat("lambert", 0x3A3A44, { map: pyCrackTex() });
var g = new THREE.Group();
var to = Math.min(N - 1, sl2.last + 1);
var top = pyRibbon(S, sl2.a, to, function (s) { return -s.w / 2 + 0.05; }, function (s) { return s.w / 2 - 0.05; }, 0.02, mat, 4);
if (top)
g.add(top);
[-1, 1].forEach(function (sd) { pyCurtain(S, sl2.a, to, function (s) { return sd * (s.w / 2 - 0.05); }, -1.6, 0.02, pyMat("lambert", z === "ice" ? 0x9AC8E0 : 0x2A2420)).forEach(function (m) { g.add(m); }); });
var und = pyRibbon(S, sl2.a, to, function (s) { return s.w / 2 - 0.05; }, function (s) { return -s.w / 2 + 0.05; }, -1.6, pyMat("lambert", 0x2A2420), 4);
if (und)
g.add(und);
G.add(g);
sl2.mesh = g;
sl2.cx = S[sl2.a].x;
sl2.cz = S[sl2.a].z;
sl2.cy = S[sl2.a].y;
});
},
function () {
if (PY.tex.crack)
return PY.tex.crack;
PY.tex.crack = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#C8C4BC";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#2A2420";
x.lineWidth = 3;
for (var i = 0; i < 9; i++) {
x.beginPath();
var px = Math.random() * W, py = Math.random() * H;
x.moveTo(px, py);
for (var j = 0; j < 6; j++) {
px += (Math.random() - 0.5) * 70;
py += (Math.random() - 0.5) * 70;
x.lineTo(px, py);
}
x.stroke();
}
}, [1, 2]);
return PY.tex.crack;
},
function (G) {
var C = PYT.cuts, rock = new THREE.MeshLambertMaterial({ color: 0x6A5A4A, map: pyTex("stone", 2, 6), side: THREE.DoubleSide });
PY_CUTS.forEach(function (cut) {
if (cut.tangle)
return;
var a = -1, b = -1;
C.forEach(function (s, i) { if (s.cut === cut.k) {
if (a < 0)
a = i;
b = i;
} });
if (a < 0)
return;
var ra = -1;
for (var i = a; i <= b + 1; i++) {
var on = i <= b && C[i].w > 0 && C[i].fl.indexOf("g") < 0;
if (on && ra < 0)
ra = i;
if (!on && ra >= 0) {
var m = pyRibbon(C, ra, i - 1, null, null, 0.03, pyRoadMat(cut.zone === "canyon" ? "canyon" : cut.zone), 4);
if (m)
G.add(m);
ra = -1;
}
}
if (cut.tunnel) {
var seg = PY.lite ? 8 : 14, pos = [], uv = [], idx = [], n = 0;
for (var j = a; j <= b; j++) {
var s = C[j], R = s.w / 2 + 1.4;
for (var k = 0; k <= seg; k++) {
var t = Math.PI * k / seg, cx = Math.cos(t) * R, cy = Math.sin(t) * R * 0.9;
var wob = 1 + 0.08 * pyNoise(s.d * 0.2, k * 0.7, 2);
pos.push(s.x + cx * wob * s.tz, s.y + cy * wob, s.z - cx * wob * s.tx);
uv.push(k / seg * 3, s.d / 6);
}
if (n > 0) {
for (var q = 0; q < seg; q++) {
var A = (n - 1) * (seg + 1) + q, Bq = n * (seg + 1) + q;
idx.push(A, Bq, A + 1, A + 1, Bq, Bq + 1);
}
}
n++;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var arch = new THREE.Mesh(g, rock);
arch.raycast = function () { };
G.add(arch);
var glowCol = cut.zone === "lava" ? 0xFF7A3A : cut.zone === "jungle" ? 0x7AE0B0 : cut.zone === "cave" ? 0x5AE8E0 : cut.zone === "coast" ? 0xFFC870 : cut.zone === "dunes" ? 0xFFB860 : 0xE8C890;
for (var j2 = a + 2; j2 < b - 1; j2 += PY.lite ? 6 : 3) {
var s2 = C[j2];
[-1, 1].forEach(function (sd) { var st = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 6), pyMat("glow", glowCol)); st.position.set(s2.x + sd * (s2.w / 2 + 0.6) * s2.tz, s2.y + 0.25, s2.z - sd * (s2.w / 2 + 0.6) * s2.tx); st.raycast = function () { }; G.add(st); });
}
}
});
var sc = PYT.cuts.filter(function (s) { return s.cut === "slotcave"; }), m0 = sc[3];
if (m0) {
var rk = new THREE.MeshLambertMaterial({ color: 0xA0704A, map: pyTex("stone", 1, 1) });
for (var r = 0; r < (PY.lite ? 5 : 9); r++) {
var bo = new THREE.Mesh(new THREE.DodecahedronGeometry(2 + Math.random() * 2.5, 0), rk);
var sd = r % 2 ? 1 : -1;
bo.position.set(m0.x + sd * (m0.w / 2 + 1.5 + Math.random() * 2) * m0.tz + (Math.random() - 0.5) * 4, m0.y + 1 + Math.random() * 2, m0.z - sd * (m0.w / 2 + 1.5) * m0.tx + (Math.random() - 0.5) * 4);
bo.rotation.set(Math.random() * 3, Math.random() * 3, 0);
bo.raycast = function () { };
G.add(bo);
}
}
var wf = PYT.cuts.filter(function (s) { return s.cut === "waterfall"; })[2];
if (wf) {
var wt = wTex(64, 256, function (x, W, H) { for (var i = 0; i < H; i += 2) {
x.fillStyle = "rgba(220,240,255," + (0.35 + Math.random() * 0.4) + ")";
x.fillRect(0, i, W, 1);
} for (var j = 0; j < 40; j++) {
x.fillStyle = "rgba(255,255,255,0.6)";
x.fillRect(Math.random() * W, Math.random() * H, 1, 10 + Math.random() * 30);
} }, [3, 1]);
var curtain = new THREE.Mesh(new THREE.PlaneGeometry(wf.w + 12, 34), new THREE.MeshBasicMaterial({ map: wt, transparent: true, opacity: 0.78, side: THREE.DoubleSide, depthWrite: false }));
curtain.position.set(wf.x, wf.y + 16, wf.z);
curtain.rotation.y = Math.atan2(wf.tx, wf.tz);
curtain.raycast = function () { };
G.add(curtain);
PY.falls = wt;
var cliff = new THREE.Mesh(new THREE.BoxGeometry(60, 40, 12), new THREE.MeshLambertMaterial({ color: 0x4A5A44, map: pyTex("stone", 4, 3) }));
cliff.position.set(wf.x - wf.tx * 7, wf.y + 26, wf.z - wf.tz * 7);
cliff.rotation.y = Math.atan2(wf.tx, wf.tz);
cliff.raycast = function () { };
G.add(cliff);
var pool = new THREE.Mesh(new THREE.CircleGeometry(16, 24), new THREE.MeshPhongMaterial({ color: 0x2A5A5A, shininess: 80, transparent: true, opacity: 0.85 }));
pool.rotation.x = -Math.PI / 2;
pool.position.set(wf.x + wf.tz * 14, wf.y - 0.3, wf.z - wf.tx * 14);
G.add(pool);
}
var cj = PYT.cuts.filter(function (s) { return s.cut === "cliffjump"; });
var g0 = -1;
cj.forEach(function (s, i) { if (g0 < 0 && s.fl.indexOf("g") >= 0)
g0 = i; });
var lip = g0 > 0 ? cj[g0 - 1] : null;
if (lip) {
var rm = new THREE.Mesh(new THREE.BoxGeometry(lip.w, 0.3, 8), new THREE.MeshLambertMaterial({ color: 0x7A5A3A, map: pyTex("wood", 2, 4) }));
rm.position.set(lip.x - lip.tx * 3, lip.y - 0.05, lip.z - lip.tz * 3);
rm.rotation.y = Math.atan2(lip.tx, lip.tz);
rm.rotation.x = -0.16;
G.add(rm);
}
var F = PY_FINDS.fallenspan;
PY_PADS.push({ x: F.x, z: F.z, r: 13, y: F.y });
var ledge = new THREE.Mesh(new THREE.CylinderGeometry(13, 10, 3, PY.lite ? 10 : 18), new THREE.MeshLambertMaterial({ color: 0x3A3A44, map: pyTex("concrete", 2, 1) }));
ledge.position.set(F.x, F.y - 1.5, F.z);
G.add(ledge);
},
function (G) {
var lake = new THREE.Mesh(new THREE.PlaneGeometry(700, 700), new THREE.MeshPhongMaterial({ color: 0x14303C, shininess: 90, specular: 0x6A8A9A }));
lake.rotation.x = -Math.PI / 2;
lake.position.set(-960, PY_WATER, -1390);
lake.raycast = function () { };
G.add(lake);
for (var i = 0; i < (PY.lite ? 10 : 26); i++) {
var a = Math.random() * 6.28, r = 60 + Math.random() * 240;
var pl = new THREE.Mesh(new THREE.CylinderGeometry(3 + Math.random() * 8, 3 + Math.random() * 8, 0.5, 6), pyMat("lambert", 0xD8ECF4));
pl.position.set(-960 + Math.cos(a) * r, PY_WATER + 0.1, -1390 + Math.sin(a) * r);
pl.rotation.y = Math.random() * 3;
pl.raycast = function () { };
if (!pyDeck(pl.position.x, pl.position.z))
G.add(pl);
}
var lt = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#C8401A";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 60; i++) {
var g = x.createRadialGradient(Math.random() * W, Math.random() * H, 2, Math.random() * W, Math.random() * H, 40);
g.addColorStop(0, "rgba(255,200,90,.7)");
g.addColorStop(1, "rgba(255,120,40,0)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
}
x.strokeStyle = "rgba(40,16,10,.85)";
x.lineWidth = 5;
for (var j = 0; j < 14; j++) {
x.beginPath();
var px = Math.random() * W, py = Math.random() * H;
x.moveTo(px, py);
for (var k = 0; k < 5; k++) {
px += (Math.random() - 0.5) * 90;
py += (Math.random() - 0.5) * 90;
x.lineTo(px, py);
}
x.stroke();
}
}, [10, 10]);
var lava = new THREE.Mesh(new THREE.PlaneGeometry(700, 1000), new THREE.MeshBasicMaterial({ map: lt, color: 0xE8A080 }));
lava.rotation.x = -Math.PI / 2;
lava.position.set(880, PY_LAVA, -620);
lava.raycast = function () { };
G.add(lava);
PY.lavaTex = lt;
var win = wTex(64, 128, function (x, W, H) {
x.fillStyle = "#0A0A14";
x.fillRect(0, 0, W, H);
var cols = ["#3AE8F0", "#F04AD8", "#E8C040", "#8A6AFF", "#E8E8F0"];
for (var r = 4; r < H; r += 8)
for (var c = 4; c < W; c += 8) {
if (Math.random() < 0.45) {
x.fillStyle = cols[(r * 7 + c) % 5];
x.globalAlpha = 0.4 + Math.random() * 0.5;
x.fillRect(c, r, 4, 4);
}
}
x.globalAlpha = 1;
}, [1, 2]);
var n = PY.lite ? 60 : 160, box = new THREE.BoxGeometry(1, 1, 1), im = new THREE.InstancedMesh(box, new THREE.MeshBasicMaterial({ map: win }), n), M = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), pp = new THREE.Vector3();
var placed = 0;
for (var t = 0; t < n * 4 && placed < n; t++) {
var x = -420 + Math.random() * 1240, z = -1650 + Math.random() * 700;
if (pyZoneAt(x, z) !== "sky")
continue;
var h = 20 + Math.random() * 40, w = 10 + Math.random() * 16;
pp.set(x, PY_ABYSS - 10 + h / 2, z);
sc.set(w, h, w * (0.7 + Math.random() * 0.6));
q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.random() * 1.5);
M.compose(pp, q, sc);
im.setMatrixAt(placed++, M);
}
im.count = placed;
im.raycast = function () { };
im.frustumCulled = false;
G.add(im);
},
function (G, geo, mat, n, place) {
var im = new THREE.InstancedMesh(geo, mat, n), M = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), e = new THREE.Euler(), k = 0;
for (var t = 0; t < n * 6 && k < n; t++) {
var r = place();
if (!r)
continue;
p.set(r[0], r[1], r[2]);
e.set(r[4] || 0, r[3] || 0, r[5] || 0);
q.setFromEuler(e);
s.set(r[6] || 1, r[7] || r[6] || 1, r[8] || r[6] || 1);
M.compose(p, q, s);
im.setMatrixAt(k++, M);
}
im.count = k;
im.raycast = function () { };
im.frustumCulled = false;
if (!PY.lite)
im.castShadow = true;
G.add(im);
return im;
},
function (G) {
var L = PY.lite;
var rockM = new THREE.MeshLambertMaterial({ color: 0xB8784A, map: pyTex("stone", 1, 3) });
var pg = new THREE.CylinderGeometry(4, 7, 1, L ? 7 : 11, 4);
pg.translate(0, 0.5, 0);
var pp = pg.attributes.position;
for (var i = 0; i < pp.count; i++) {
var y = pp.getY(i), a = Math.atan2(pp.getZ(i), pp.getX(i)), f = 1 + 0.18 * Math.sin(a * 3 + y * 5) + 0.1 * Math.sin(a * 7);
pp.setX(i, pp.getX(i) * f);
pp.setZ(i, pp.getZ(i) * f);
}
pg.computeVertexNormals();
pyInstances(G, pg, rockM, L ? 16 : 40, function () { var p = pyNearRoad("canyon", 14, 60); if (!p)
return null; return [p[0], pyTerrain(p[0], p[1]) - 1, p[1], Math.random() * 6, 0, 0, 0.6 + Math.random() * 0.8, 20 + Math.random() * 40, 0.6 + Math.random() * 0.8]; });
var cact = new THREE.CylinderGeometry(0.35, 0.4, 1, 8);
cact.translate(0, 0.5, 0);
pyInstances(G, cact, pyMat("lambert", 0x4A7A3A), L ? 20 : 70, function () { var p = pyNearRoad("canyon", 6, 40); if (!p)
return null; return [p[0], pyTerrain(p[0], p[1]), p[1], 0, 0, 0, 1, 3 + Math.random() * 4, 1]; });
var boul = new THREE.DodecahedronGeometry(1, 0);
pyInstances(G, boul, rockM, L ? 20 : 60, function () { var p = pyNearRoad("canyon", 5, 30); if (!p)
return null; return [p[0], pyTerrain(p[0], p[1]) + 0.4, p[1], Math.random() * 6, Math.random(), 0, 1 + Math.random() * 2.5]; });
var pine = new THREE.ConeGeometry(2.6, 7, L ? 7 : 10);
pine.translate(0, 5, 0);
var pineM = new THREE.MeshLambertMaterial({ color: 0x2A4A3A });
var snowcap = new THREE.ConeGeometry(2.2, 3, L ? 7 : 10);
snowcap.translate(0, 7.2, 0);
var pines = [];
for (var j = 0; j < (L ? 80 : 240); j++) {
var p0 = pyNearRoad("tundra", 6, 120) || pySpotIn("tundra", 8);
if (p0)
pines.push([p0[0], pyTerrain(p0[0], p0[1]), p0[1], Math.random() * 6, 0, 0, 0.8 + Math.random() * 0.7]);
}
if (typeof pyluPineGeo === "function") {
pine = pyluPineGeo(false);
snowcap = pyluPineGeo(true);
pineM = new THREE.MeshLambertMaterial({ color: 0x3A5A40, map: pyluCrownMat().map });
}
var pk = 0, pnA = pyInstances(G, pine, pineM, pines.length, function () { return pines[pk++]; });
pk = 0;
var pnB = pyInstances(G, snowcap, pyMat("lambert", 0xE4ECF4), pines.length, function () { return pines[pk++]; });
var trunk = new THREE.CylinderGeometry(0.25, 0.35, 2, 6);
trunk.translate(0, 1, 0);
pk = 0;
var pnC = pyInstances(G, trunk, pyMat("lambert", 0x4A3A2A), pines.length, function () { return pines[pk++]; });
PY.pines = { trunk: pnC, crown: pnA, more: [pnB], pine: true };
var spire = new THREE.ConeGeometry(2, 1, 5);
spire.translate(0, 0.5, 0);
if (typeof pyluShardGeo === "function")
spire = pyluShardGeo();
pyInstances(G, spire, new THREE.MeshPhongMaterial({ color: 0xA8D8F0, shininess: 140, specular: 0xFFFFFF, transparent: true, opacity: 0.82, emissive: 0x0A1A24 }), L ? 10 : 28, function () { var p = pyNearRoad("tundra", 10, 70) || pyNearRoad("ice", 14, 60); if (!p)
return null; return [p[0], pyGround(p[0], p[1]), p[1], Math.random() * 3, 0, (Math.random() - 0.5) * 0.3, 1, 10 + Math.random() * 16, 1]; });
var ia = PYT.S.filter(function (s) { return s.zone === "tundra" && s.k === 19; })[0];
if (ia) {
var ar = new THREE.Mesh(new THREE.TorusGeometry(ia.w / 2 + 3, 2.2, L ? 6 : 10, L ? 12 : 24, Math.PI), new THREE.MeshPhongMaterial({ color: 0xC8E8F8, shininess: 110, specular: 0xFFFFFF, transparent: true, opacity: 0.85 }));
ar.position.set(ia.x, ia.y, ia.z);
ar.rotation.y = Math.atan2(ia.tx, ia.tz) + Math.PI / 2;
ar.raycast = function () { };
G.add(ar);
PY.arch = ia;
}
var ads = [["REDLINE OIL", "since forever"], ["HALDEN KESSLER", "faster than fear"], ["VESPER COLE", "black glass motors"], ["DUNMORE", "off the road, on the money"], ["SKYREACH", "we float, you don't"]];
var bi = 0;
PYT.S.forEach(function (s, i) {
if (s.zone !== "sky" || i % 26 !== 0 || /[cgr]/.test(s.fl))
return;
var A = ads[bi++ % ads.length], sd = bi % 2 ? 1 : -1, sg = wSign(A, 12, 4, "#140A24", bi % 2 ? "#3AE8F0" : "#F04AD8");
sg.material = new THREE.MeshBasicMaterial({ map: sg.material.map, side: THREE.DoubleSide });
sg.position.set(s.x + sd * (s.w / 2 + 6) * s.tz, s.y + 8, s.z - sd * (s.w / 2 + 6) * s.tx);
sg.rotation.y = Math.atan2(s.tx, s.tz) + Math.PI / 2 * sd * 0;
sg.lookAt(s.x, s.y + 8, s.z);
G.add(sg);
var post = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 8, 8), pyMat("chrome", 0x5A5A64));
post.position.set(sg.position.x, s.y + 3, sg.position.z);
G.add(post);
});
var volM = new THREE.MeshLambertMaterial({ color: 0x2A2220, map: pyTex("stone", 4, 4) });
[[1100, -950, 160, 130], [1180, -500, 120, 100], [620, -700, 90, 70]].forEach(function (v, vi) {
if (typeof pyluVolcano === "function") {
var VV = pyluVolcano(G, v[0], v[1], v[2], v[3], 301 + vi * 17);
var gl2 = new THREE.Mesh(new THREE.CircleGeometry(VV.rim * 0.5, L ? 10 : 18), pyMat("glow", 0xFF6A2A));
gl2.rotation.x = -Math.PI / 2;
gl2.position.set(v[0], VV.top + 0.3, v[1]);
G.add(gl2);
return;
}
var vc = new THREE.Mesh(new THREE.CylinderGeometry(v[2] * 0.18, v[2], v[3], L ? 10 : 18, 3, true), volM);
vc.position.set(v[0], v[3] / 2 - 4, v[1]);
vc.raycast = function () { };
G.add(vc);
var glow = new THREE.Mesh(new THREE.CircleGeometry(v[2] * 0.17, L ? 10 : 18), pyMat("glow", 0xFF6A2A));
glow.rotation.x = -Math.PI / 2;
glow.position.set(v[0], v[3] - 6, v[1]);
G.add(glow);
});
var spike = new THREE.ConeGeometry(1.4, 1, 6);
spike.translate(0, 0.5, 0);
pyInstances(G, spike, pyMat("lambert", 0x1E1A18), L ? 20 : 60, function () { var p = pyNearRoad("lava", 8, 80); if (!p)
return null; return [p[0], Math.max(PY_LAVA, pyTerrain(p[0], p[1])), p[1], Math.random() * 3, 0, (Math.random() - 0.5) * 0.4, 1, 4 + Math.random() * 10, 1]; });
var tr = new THREE.CylinderGeometry(0.7, 1.1, 1, L ? 6 : 9);
tr.translate(0, 0.5, 0);
var cr = new THREE.SphereGeometry(1, L ? 7 : 11, L ? 5 : 8);
cr.scale(1, 0.7, 1);
var trees = [];
for (var t2 = 0; t2 < (L ? 70 : 220); t2++) {
var p2 = pyNearRoad("jungle", 6, 90) || pySpotIn("jungle", 8);
if (p2)
trees.push([p2[0], pyTerrain(p2[0], p2[1]), p2[1], Math.random() * 6, 0, 0, 1, 14 + Math.random() * 12, 1]);
}
pk = 0;
var trIm = pyInstances(G, tr, new THREE.MeshLambertMaterial({ color: 0x5A4430, map: pyTex("bark", 1, 3) }), trees.length, function () { return trees[pk++]; });
var crowns = trees.map(function (t) { return [t[0], t[1] + t[7], t[2], t[3], 0, 0, 6 + Math.random() * 3, 4 + Math.random() * 2, 6 + Math.random() * 3]; });
if (typeof pyluCrownGeo === "function")
cr = pyluCrownGeo();
pk = 0;
var crIm = pyInstances(G, cr, typeof pyluCrownMat === "function" ? pyluCrownMat() : new THREE.MeshLambertMaterial({ color: 0x2A5A2A }), crowns.length, function () { return crowns[pk++]; });
PY.jungle = { trunk: trIm, crown: crIm, spots: trees };
var fern = new THREE.ConeGeometry(1.2, 1, 6, 1, true);
fern.translate(0, 0.5, 0);
pyInstances(G, fern, new THREE.MeshLambertMaterial({ color: 0x3A7A3A, side: THREE.DoubleSide }), L ? 30 : 100, function () { var p = pyNearRoad("jungle", 4, 30); if (!p)
return null; return [p[0], pyTerrain(p[0], p[1]), p[1], Math.random() * 6, Math.PI, 0, 1.2, 1.4, 1.2]; });
PY.turbines = [];
for (var w = 0; w < (L ? 5 : 9); w++) {
var p3 = w === 0 ? [PY_FINDS.windfarm.x + 20, PY_FINDS.windfarm.z + 10] : pyNearRoad("storm", 30, 140);
if (!p3)
continue;
var tg = new THREE.Group(), y0 = pyTerrain(p3[0], p3[1]);
tg.position.set(p3[0], y0, p3[1]);
var mast = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 1.1, 40, 10), pyMat("lambert", 0xD8DCE0));
mast.position.y = 20;
tg.add(mast);
var hub = new THREE.Group();
hub.position.set(0, 40, 1);
tg.add(hub);
for (var bl = 0; bl < 3; bl++) {
var bld = new THREE.Mesh(new THREE.BoxGeometry(0.8, 18, 0.2), pyMat("lambert", 0xE8ECF0));
bld.position.y = 9;
var arm = new THREE.Group();
arm.rotation.z = bl * Math.PI * 2 / 3;
arm.add(bld);
hub.add(arm);
}
tg.rotation.y = Math.random() * 6;
G.add(tg);
PY.turbines.push(hub);
}
},
function (dt) {
var P = camera.position, z = pyZoneAt(P.x - PY.base, P.z), Z = PY_ZONES[z] || PY_ZONES.paddock;
if (!PY.envC)
PY.envC = { top: new THREE.Color(Z.sky[0]), low: new THREE.Color(Z.sky[1]), fog: new THREE.Color(Z.fog), fogD: Z.fogD, sun: Z.sun, sunCol: new THREE.Color(Z.sunCol) };
var E = PY.envC, k = Math.min(1, (dt || 0.016) * 0.6), c = new THREE.Color();
E.top.lerp(c.setHex(Z.sky[0]), k);
E.low.lerp(c.setHex(Z.sky[1]), k);
E.fog.lerp(c.setHex(Z.fog), k);
E.sunCol.lerp(c.setHex(Z.sunCol), k);
E.fogD += (Z.fogD * (PY.lite ? 1.15 : 1) - E.fogD) * k;
E.sun += (Z.sun - E.sun) * k;
if (z !== PY.zone) {
PY.zone = z;
PY.zoneT = 0;
}
return { top: E.top.getHex(), low: E.low.getHex(), fog: E.fog.getHex(), fogD: E.fogD, sun: E.sun, sunCol: E.sunCol.getHex(), sunDir: [0.4, 0.75, -0.3], hemi: z === "cave" ? 0.55 : 0.75, hemiCol: z === "cave" ? 0xB8A8F0 : 0xD8DCE8, hemiGround: 0x40382C, stars: z === "sky" ? 0.7 : z === "cave" ? 0.35 : 0.05 };
},
function (k, at) {
var c = pyCar(k);
if (!c)
return false;
if (DRIVE.on)
vehicleEnd();
if (typeof riding !== "undefined" && riding && typeof ride === "function")
ride(null);
var P = camera.position, M = PY.me;
if (at) {
P.x = PY.base + at.x;
P.z = at.z;
}
var lx = P.x - PY.base, gy = pyGround(lx, P.z, at && at.y !== undefined ? at.y + 1 : P.y - 1.72 + 1);
M.y = gy;
M.vy = 0;
M.air = false;
M.airT = 0;
M.vx = 0;
M.vz = 0;
M.hp = M.max = c.hp;
M.wreckT = 0;
M.fallT = 0;
M.cool = 0;
M.dcool = 0;
M.shield = M.plate = M.cloak = M.phase = M.mirror = M.ice = M.stun = M.spin = M.slow = M.boost = M.saw = M.flame = M.ram = M.frozen = 0;
M.decoy = null;
M.car = c;
M.prevFl = "";
M.pitch = 0;
M.roll = 0;
M.land = 0;
M.pow = null;
M.drift = 0;
M.slipT = 0;
M.frac = 0;
rideArch = c.arch;
if (typeof rideG !== "undefined" && rideG) {
if (rideG.userData.pyCar)
pyGone(rideG);
else
scene.remove(rideG);
rideG = null;
}
vehicleStart(c.arch, "race", null);
DRIVE.sIn = 0;
if (at && at.h !== undefined) {
DRIVE.h = at.h;
yaw = at.h;
DRIVE.yawSet = yaw;
}
P.y = 1.72 + M.y + (RIDE_SEAT[c.arch] || 0);
try {
var L = meLook();
L.ride = c.arch;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
pySay("<b>At the wheel of the " + esc(c.name) + ".</b> " + (pyTouch() ? "The stick drives; <b>Fire</b>, <b>Defend</b>, <b>Power</b> and <b>Slide</b> are on the right; <b>Get out</b> leaves it."
: "W and S drive, A and D steer, Space slides (hold it through a bend for a drift boost); <b>F</b> (or E, or a click) fires the " + esc(PY_OFF[c.off].name) + ", <b>G</b> the " + esc(PY_DEF[c.def].name) + ", <b>B</b> a power from a cell; V the view, Q gets out."), true);
return true;
},
function (dt, inp) {
var D = DRIVE, M = PY.me, c = M.car || pyCar(D.arch), P = camera.position;
if (!c)
return;
if (typeof canFly !== "undefined" && canFly)
canFly = false;
dt = Math.min(dt, 0.05);
var lx = P.x - PY.base, lz = P.z;
if (M.wreckT > 0) {
D.v = 0;
M.vx = M.vz = 0;
pyWreckTick(dt);
return;
}
if (!PY.wdSaid && typeof REAL_WD !== "undefined" && REAL_WD.off) {
PY.wdSaid = 1;
pyFeed("Your computer was drawing slowly here, so the <b>realistic look</b> (grown trees, real ground) was switched off for this visit. Reload the page to try it again.", "#C8D0E0");
}
var near = pyNear(lx, lz, M.y), zone = pyZoneAt(lx, lz), Z = PY_ZONES[zone] || PY_ZONES.paddock;
var onRoad = !!(near && pyDeck(lx, lz, M.y + 1) && Math.abs(M.y - near.y) < 1.2);
var grip = (onRoad ? Z.grip : Math.min(Z.grip, 0.62)) * c.grip;
if (M.ice > 0)
grip = Math.max(grip, 0.95);
if (M.frozen > 0)
grip *= 0.55;
if (M.spin > 0)
grip *= 0.25;
var fx = -Math.sin(D.h), fz = -Math.cos(D.h), rx = -fz, rz = fx;
var vf = M.vx * fx + M.vz * fz, vs = M.vx * rx + M.vz * rz;
var sink = !M.air && typeof pyPatchAt === "function" ? pyPatchAt(lx, lz, M.y) : null;
if (sink && !M.sinkSaid) {
M.sinkSaid = 1;
pyFeed(sink.kind === "sand" ? "🏜️ <b>Sinking sand!</b> Steer out of it" : "🟤 <b>Quicksand!</b> Steer out of it", "#E8C66A");
}
else if (!sink)
M.sinkSaid = 0;
var top = c.top * (M.boost > 0 ? 1.45 : 1) * (M.slow > 0 ? 0.62 : 1) * (sink ? 0.42 : 1) * (PY.race && PY.race.st === "count" ? 0 : 1);
var acc = c.acc * PY_PUNCH * (M.boost > 0 ? 2 : 1);
var f = inp.f;
if (M.stun > 0 || (PY.race && PY.race.st === "count"))
f = 0;
var a = 0;
if (!M.air) {
if (f > 0) {
if (vf < -0.5)
a = f * 24;
else
a = f * acc * Math.max(0, 1 - Math.pow(Math.max(0, vf) / top, 1.6));
}
else if (f < 0) {
if (vf > 0.5)
a = f * 24;
else
a = f * acc * 0.5 * Math.max(0, 1 - Math.abs(vf) / 10);
}
if (M.boost > 0 && f >= 0)
a = Math.max(a, acc * 0.8);
var drag = 0.35 + 0.0007 * vf * vf + (f === 0 ? 1.2 : 0) + (onRoad ? 0 : 2.2) + (sink ? 6 : 0);
if (Math.abs(vf) > 0.05)
vf -= Math.sign(vf) * Math.min(Math.abs(vf), drag * dt);
vf += a * dt;
if (vf > top + 2)
vf -= (vf - top) * Math.min(1, dt * 1.5);
}
else
vf -= 0.0006 * vf * vf * dt;
var sw = Math.max(-1, Math.min(1, inp.s || 0)), digital = !!inp.kb || sw === 0 || Math.abs(sw) === 1;
if (!digital) {
var am = Math.abs(sw), tr = typeof touchRig !== "undefined" && touchRig;
sw = am < 0.08 ? 0 : Math.sign(sw) * Math.pow((am - 0.08) / 0.92, tr ? 1 : 1.3);
}
var sIn = D.sIn || 0;
var fast = Math.min(1, Math.abs(vf) / (55 * PY_PACE)), easy = PY.assist !== false;
if (digital && easy)
sw *= 1 - 0.18 * fast;
if (digital) {
var back = sw === 0 || sw * sIn < 0, rate = back ? 7 : 4.5 * (easy ? 1 - 0.35 * fast : 1), ds = sw - sIn;
sIn += Math.sign(ds) * Math.min(Math.abs(ds), rate * dt);
}
else
sIn += (sw - sIn) * Math.min(1, dt * 14);
D.sIn = sIn;
var wb = (PY_STYLE[c.style] || PY_STYLE.wedge).L * 0.62, turn = 0, avf = Math.abs(vf);
var gripF = 0.6 + 0.4 * Math.min(1, grip), slide = !!inp.hand && !M.air && avf > 6;
var yawMax = Math.min(avf / wb * Math.tan(0.6), 2.1 / (1 + avf / (55 * PY_PACE))) * gripF * (slide ? 1.55 : 1);
D.steer = sIn * 0.55 / (1 + avf / (30 * PY_PACE));
if (!M.air) {
turn = -sIn * yawMax * (vf < 0 ? -1 : 1);
if (M.spin > 0)
turn += Math.sin(PY.t * 9) * 2.2 * Math.min(1, M.spin);
}
else
turn = -sIn * 0.6;
if (easy && !M.air && !slide && vf > 6 && !(M.spin > 0))
turn += pyAssistTurn(lx, lz, M.y, D.h, vf, sIn, yawMax);
D.h += turn * dt;
if (slide && Math.abs(sIn) > 0.2)
vf -= vf * 0.1 * dt;
M.sliding = slide;
if (typeof pySkillsDrive === "function")
pySkillsDrive(dt, inp, vf, onRoad);
var vxW = fx * vf + rx * vs, vzW = fz * vf + rz * vs, spd = Math.hypot(vxW, vzW);
if (spd < 0.4 || M.air) {
if (!M.air) {
fx = -Math.sin(D.h);
fz = -Math.cos(D.h);
vxW = fx * vf;
vzW = fz * vf;
}
}
else {
var rev = vf < 0, va = Math.atan2(-vxW, -vzW), want = D.h + (rev ? Math.PI : 0);
var follow = slide ? 0.35 : Math.min(1, 0.3 + 0.85 * grip);
va += turn * dt * follow;
var off = Math.atan2(Math.sin(want - va), Math.cos(want - va));
var rec = easy && !slide && !(M.spin > 0) && Math.abs(off) > 0.3;
var bite = 1 - Math.exp(-dt * (slide ? 1.6 : rec ? 16 : 9) * Math.max(rec ? 0.5 : 0.2, grip));
va += off * bite;
if (rec && !rev && Math.abs(off) > 0.5)
D.h -= Math.atan2(Math.sin(want - va), Math.cos(want - va)) * Math.min(1, dt * 3);
if (Math.abs(off) > 0.05)
spd *= 1 - Math.min(0.5, Math.abs(Math.sin(off)) * (slide ? 0.06 : 0.25) * dt);
vxW = -Math.sin(va) * spd;
vzW = -Math.cos(va) * spd;
}
M.vx = vxW;
M.vz = vzW;
M.slipA = spd > 2 && !M.air ? Math.atan2(Math.sin(D.h + (vf < 0 ? Math.PI : 0) - Math.atan2(-vxW, -vzW)), Math.cos(D.h + (vf < 0 ? Math.PI : 0) - Math.atan2(-vxW, -vzW))) : 0;
if (M.push) {
M.vx += M.push.x;
M.vz += M.push.z;
M.push = null;
}
var nx = lx + M.vx * dt, nz = lz + M.vz * dt;
var sp = Math.hypot(M.vx, M.vz);
var wedged = sp > 0.05 ? pyCarBlockN(lx, lz, D.h, M.y, c) : null, mvF = (nx - lx) * fx + (nz - lz) * fz;
if (wedged && wedged.n && !(wedged.front && mvF > 0) && !(wedged.back && mvF < 0) && pyCarBlockN(nx, nz, D.h, M.y, c).n <= wedged.n) { }
else if (sp > 0.05 && pyCarBlocked(nx, nz, D.h, M.y, c)) {
var was = sp;
if (pyCarBlocked(nx, lz, D.h, M.y, c)) {
M.vx *= -0.25;
nx = lx;
}
else {
M.vz *= 0.7;
}
if (pyCarBlocked(lx, nz, D.h, M.y, c)) {
M.vz *= -0.25;
nz = lz;
}
else {
M.vx *= 0.7;
}
if (pyCarBlocked(nx, nz, D.h, M.y, c)) {
nx = lx;
nz = lz;
M.vx *= -0.2;
M.vz *= -0.2;
}
if (was > 14 * PY_PACE)
pyHurt((was / PY_PACE - 14) * 1.6, { wall: 1, how: "a wall" });
if (was > 8)
pySoft(nx, M.y + 0.6, nz, 0xC8C0B0, 1.4, 0.8);
}
pyCarsBump(nx, nz, dt);
nx = PY.me.nx !== undefined ? PY.me.nx : nx;
nz = PY.me.nz !== undefined ? PY.me.nz : nz;
PY.me.nx = PY.me.nz = undefined;
var gNew = pyGround(nx, nz, M.y + 1.2), deck = pyDeck(nx, nz, M.y + 1.2), nn = pyNear(nx, nz, M.y);
var fl = nn ? nn.fl : "";
var pred = M.y + M.vy * dt - 0.5 * PY_G * dt * dt;
if (!M.air) {
var leftRamp = M.prevFl.indexOf("r") >= 0 && fl.indexOf("r") < 0, leftLip = M.prevCut === "cliffjump" && !deck && M.hadDeck;
if ((leftRamp || leftLip) && vf > 12) {
M.air = true;
M.vy = Math.max(M.vy, 0) + vf * 0.2;
M.airT = 0;
}
else if (gNew < pred - 0.25) {
M.air = true;
M.airT = 0;
}
else {
var vy = (gNew - M.y) / dt;
M.vy = Math.max(-20, Math.min(20, vy));
M.y = gNew;
}
}
if (M.air) {
M.airT += dt;
M.vy -= PY_G * dt;
M.y += M.vy * dt;
if (M.y <= gNew) {
var hit = -M.vy;
M.y = gNew;
M.air = false;
M.land = Math.min(1, hit / 14);
if (typeof pySkillLand === "function")
pySkillLand(hit, M.airT);
if (hit > 26)
pyWreck("the fall");
else if (hit > 12) {
pyHurt((hit - 12) * 3.2, { how: "a hard landing" });
pySoft(nx, M.y + 0.3, nz, 0xB8A890, 2.4, 1.2);
}
else if (hit > 5)
pySoft(nx, M.y + 0.2, nz, 0xB8A890, 1.4, 0.8);
M.vy = 0;
}
}
M.hadDeck = !!deck;
M.prevFl = fl;
M.prevCut = nn ? nn.s.cut : null;
var pit = pyPitAt(nx, nz, M.y);
if (pit) {
pyWreck(pit);
}
if (M.y < PY_ABYSS - 30)
pyWreck("the drop");
P.x = PY.base + nx;
P.z = nz;
pyStuckTick(dt, f, Math.hypot(nx - lx, nz - lz) / Math.max(dt, 1e-4));
D.v = Math.hypot(M.vx, M.vz) * (vf < 0 ? -1 : 1);
D.thr = Math.max(0, f);
D.brk = Math.max(0, -f);
D.gear = vf < -0.3 ? "R" : (Math.abs(vf) < 0.5 && !f ? "N" : "D" + Math.min(7, 1 + Math.floor(Math.abs(vf) / 13)));
D.road = { kind: "open", name: Z.name + (onRoad ? " · " + Z.road : " · off the road"), limit: null, mph: null };
D.limit = null;
M.zone = zone;
if (nn && nn.s.slab && !M.air)
pySlabTrip(nn.s.slab);
},
function (dt, off) {
if (typeof camera === "undefined" || !camera || !camera.isPerspectiveCamera)
return;
if (off || (typeof renderer !== "undefined" && renderer.xr && renderer.xr.isPresenting)) {
if (PY.fov0) {
camera.fov = PY.fov0;
camera.updateProjectionMatrix();
PY.fov0 = 0;
}
return;
}
if (!PY.fov0)
PY.fov0 = camera.fov;
var sp = Math.hypot(PY.me.vx || 0, PY.me.vz || 0), want = PY.fov0 + Math.min(16, Math.max(0, sp - 25) * 0.28) + (PY.me.boost > 0 ? 4 : 0);
var f = camera.fov + (want - camera.fov) * Math.min(1, dt * 3);
if (Math.abs(f - camera.fov) > 0.05) {
camera.fov = f;
camera.updateProjectionMatrix();
}
},
function (x, z, h, y, c) {
var S = PY_STYLE[c.style] || PY_STYLE.wedge, fx = -Math.sin(h), fz = -Math.cos(h), rx = -fz, rz = fx, L = S.L / 2, W = S.W / 2;
var pts = [[L, 0], [L, W * 0.85], [L, -W * 0.85], [-L, W * 0.85], [-L, -W * 0.85]];
for (var i = 0; i < pts.length; i++) {
var px = x + fx * pts[i][0] + rx * pts[i][1], pz = z + fz * pts[i][0] + rz * pts[i][1];
if (pyBlocks(px, pz, y))
return true;
}
return false;
},
function (x, z, h, y, c) {
var S = PY_STYLE[c.style] || PY_STYLE.wedge, fx = -Math.sin(h), fz = -Math.cos(h), rx = -fz, rz = fx, L = S.L / 2, W = S.W / 2, o = { n: 0, front: 0, back: 0 };
var pts = [[L, 0], [L, W * 0.85], [L, -W * 0.85], [-L, W * 0.85], [-L, -W * 0.85]];
for (var i = 0; i < pts.length; i++) {
if (pyBlocks(x + fx * pts[i][0] + rx * pts[i][1], z + fz * pts[i][0] + rz * pts[i][1], y)) {
o.n++;
if (i < 3)
o.front = 1;
else
o.back = 1;
}
}
return o;
},
function (dt, f, sp) {
var M = PY.me;
if (!f || sp > 1.5 || M.air || M.wreckT > 0 || (PY.race && PY.race.st === "count")) {
M.stuckT = Math.max(0, (M.stuckT || 0) - dt * 2);
if (!M.stuckT)
M.stuckSaid = 0;
return;
}
M.stuckT = (M.stuckT || 0) + dt;
if (M.stuckT > 2.5 && !M.stuckSaid) {
M.stuckSaid = 1;
pySay("<b>Stuck?</b> " + (pyTouch() ? "Pull the stick back" : "Hold S") + " to reverse out. Still stuck in a few seconds and the recovery truck sets you back on the road.", true);
}
if (M.stuckT > 7) {
M.stuckT = 0;
M.stuckSaid = 0;
var R = PY.race;
PY.fade = 1;
pyRespawn(R && R.st === "on" && R.lastCpD !== undefined ? R.lastCpD : null);
pyFeed("🚚 The recovery truck set you back on the road", "#9AE8A0");
}
},
function (x, z, y) {
var B = PYT.bounds;
if (x < B.x0 + 10 || x > B.x1 - 10 || z < B.z0 + 10 || z > B.z1 - 10)
return true;
if (pyRailBlock(x, z, y))
return true;
if (pyTunnelBlock(x, z, y))
return true;
if (PY.solids && worldSolidAt(PY.solids, x, z, y))
return true;
if (!PY.me.phase && pyHazBlock(x, z, y))
return true;
if (!PY.me.air && !PY.me.phase) {
var g = pyGround(x, z, y + 1.2);
if (g > y + 1.6)
return true;
}
return false;
},
function (dmg, src) {
var M = PY.me;
if (!pyDriving() || M.wreckT > 0)
return 0;
if (M.phase > 0 && src && !src.wall)
return 0;
if (M.shield > 0) {
pySoft(camera.position.x - PY.base, M.y + 1, camera.position.z, 0x9ADFFF, 3, 0.6);
return 0;
}
if (M.boost > 0 && src && src.shot)
return 0;
if (M.plate > 0)
dmg *= 0.4;
M.frac = (M.frac || 0) + Math.max(0, dmg);
dmg = Math.floor(M.frac);
M.frac -= dmg;
if (!dmg)
return 0;
M.hp = Math.max(0, M.hp - dmg);
PY.hurt = Math.min(1, (PY.hurt || 0) + dmg / 60);
if (src && src.how && !src.wall) {
var F = PY.hurtFeed;
if (F && F.how === src.how && PY.t - F.t < 0.9) {
F.d += dmg;
}
else {
var tot = dmg + (F && F.how === src.how ? F.d : 0);
PY.hurtFeed = { how: src.how, t: PY.t, d: 0 };
pyFeed("−" + tot + " from " + esc(src.how), "#FF9A7A");
}
}
if (M.hp <= 0)
pyWreck(src && src.how ? src.how : "the blows");
return dmg;
},
function (why) {
var M = PY.me;
if (M.wreckT > 0)
return;
M.wreckT = 0.001;
M.wreckWhy = why;
M.hp = 0;
M.air = false;
M.vy = 0;
var P = camera.position;
pySmokeBig(P.x - PY.base, M.y + 1, P.z);
pySay("<b>Wrecked</b> by " + esc(why) + ".", true);
pyFeed("💥 You were wrecked by " + esc(why), "#FF8A6A");
if (PY.race && PY.race.st === "on" && !PY.race.out)
pyRaceWrecked(why);
pyNetSend({ t: "wreck", why: why });
},
function (dt) {
var M = PY.me;
M.wreckT += dt;
if (PY.dark)
PY.dark.style.opacity = String(Math.min(0.85, M.wreckT * 0.5));
if (M.wreckT < 2.6)
return;
M.wreckT = 0;
PY.fade = 1;
var R = PY.race;
if (R && R.st === "on" && R.ev === "trial") {
R.pen = (R.pen || 0) + 5;
pyRespawn(R.lastCpD);
pyFeed("+5 seconds", "#FFD27A");
return;
}
if (R && (R.st === "out" || R.out)) {
pyRaceFinishView();
return;
}
pyRespawn(null);
},
function (d) {
var M = PY.me, S = PYT.S, P = camera.position;
var i;
if (d !== null && d !== undefined) {
i = Math.floor(d / PYT.L * S.length) % S.length;
}
else {
var n = pyNear(P.x - PY.base, P.z);
i = n && n.s.main ? n.s.i : pyNearestMain(P.x - PY.base, P.z);
i = (i - 6 + S.length) % S.length;
}
for (var k = 0; k < 40; k++) {
var s = S[i];
if (s.fl.indexOf("g") < 0 && !s.slab && s.fl.indexOf("r") < 0)
break;
i = (i - 1 + S.length) % S.length;
}
var s2 = S[i];
P.x = PY.base + s2.x;
P.z = s2.z;
M.y = s2.y;
M.vy = 0;
M.vx = M.vz = 0;
M.air = false;
DRIVE.h = Math.atan2(-s2.tx, -s2.tz);
DRIVE.v = 0;
yaw = DRIVE.h;
DRIVE.yawSet = yaw;
DRIVE.look = 0;
DRIVE.cam = null;
M.hp = M.max;
M.stun = M.spin = M.slow = M.frozen = 0;
M.phase = 1.5;
P.y = 1.72 + M.y + (RIDE_SEAT[DRIVE.arch] || 0);
},
function (x, z, feet, h, vf, sIn, yawMax) {
var n = pyNear(x, z, feet), fx = -Math.sin(h), fz = -Math.cos(h);
if (!n || !(n.w > 0)) {
var j = pyNearestMain(x, z), q = PYT.S[j];
if (!q)
return 0;
var dx = x - q.x, dz = z - q.z, ac = dx * q.tz - dz * q.tx, al = dx * q.tx + dz * q.tz;
if (Math.abs(ac) > q.w / 2 + 14 || Math.abs(al) > 8)
return 0;
n = { s: q, across: ac, w: q.w };
}
var s = n.s, dir = fx * s.tx + fz * s.tz >= 0 ? 1 : -1, look = Math.max(10, vf * 0.55), L = s.main ? PYT.S : PYT.cuts, i = s.main ? s.i : s.i - PYT.S.length, a = s, step = 0;
while (step < look) {
var ni = i + dir;
if (s.main)
ni = (ni + L.length) % L.length;
var b = L[ni];
if (!b || b.cut !== s.cut)
break;
step += Math.hypot(b.x - a.x, b.z - a.z);
a = b;
i = ni;
if (step > 200)
break;
}
var hw = Math.max(0.5, (n.w || 8) / 2 - 1.6), keep = Math.max(-hw, Math.min(hw, n.across * 0.55)), px = a.x + a.tz * keep, pz = a.z - a.tx * keep;
var hd = Math.atan2(-(px - x), -(pz - z)), e = Math.atan2(Math.sin(hd - h), Math.cos(hd - h)), ae = Math.abs(e);
if (ae > 1.2)
return 0;
var edge = Math.max(0, Math.abs(n.across) - hw) / 2, k = (2.2 + edge * 2) * (ae > 0.7 ? (1.2 - ae) / 0.5 : 1);
var against = sIn * e > 0 ? Math.abs(sIn) : 0, give = edge > 0 ? 1 - 0.7 * Math.min(1, against * 2) : Math.max(0, 1 - against * 5);
var cap = yawMax * (0.5 + Math.min(0.3, edge * 0.15)) * give;
return Math.max(-cap, Math.min(cap, e * k));
},
function (g, x, y, z, h, st, dt, v, steer) {
var lx = x - PY.base, fx = -Math.sin(h), fz = -Math.cos(h), L = g.userData.L || 4.4;
var want = 0, roll = 0;
if (!st.air) {
var a = pyGround(lx + fx * L * 0.45, z + fz * L * 0.45, y + 1.2), b = pyGround(lx - fx * L * 0.45, z - fz * L * 0.45, y + 1.2);
if (Math.abs(a - b) < 3)
want = Math.atan2(a - b, L * 0.9);
}
else
want = Math.max(-0.5, Math.min(0.5, (st.vy || 0) * 0.025));
st.pitch = (st.pitch || 0) + (want - (st.pitch || 0)) * Math.min(1, dt * (st.air ? 3 : 10));
roll = -(steer || 0) * Math.min(1, Math.abs(v || 0) / 30) * 0.12;
st.roll = (st.roll || 0) + (roll - (st.roll || 0)) * Math.min(1, dt * 6);
st.land = Math.max(0, (st.land || 0) - dt * 3);
var bounce = st.land ? -Math.sin(st.land * Math.PI) * 0.12 : 0;
var hov = g.userData.hover ? 0.35 + Math.sin(PY.t * 2.2 + x) * 0.05 : 0;
g.position.set(x, y + bounce + hov, z);
g.rotation.order = "YXZ";
g.rotation.set(-st.pitch, h + Math.PI, st.roll);
var W = g.userData.wheels;
if (W && !g.userData.hover) {
var spin = (v || 0) * dt / 0.38;
for (var i = 0; i < W.length; i++) {
var w = W[i];
w.rotation.order = "YXZ";
w.rotation.x += spin;
if (w.userData.front)
w.rotation.y = (steer || 0) * 0.8;
}
}
if (g.userData.steer)
g.userData.steer.rotation.z = -(steer || 0) * 2.2;
pyArmsPose(g, st, dt);
},
function (a, reach, cone) {
var f = pyFwd(a), best = null, bd = reach;
pyActors().forEach(function (b) {
if (b === a || b.id === a.id || b.st.cloak > 0)
return;
var dx = b.x - a.x, dz = b.z - a.z, d = Math.hypot(dx, dz);
if (d > bd || d < 1)
return;
if (Math.abs(b.y - a.y) > 8)
return;
var c = (dx * f.x + dz * f.z) / d;
if (c < Math.cos(cone))
return;
bd = d;
best = b;
});
if (best && best.st.decoy) {
var dc = best.st.decoy;
return { id: "decoy", decoy: true, x: dc.x, y: dc.y, z: dc.z, h: best.h, v: 0, st: {}, of: best };
}
return best;
},
function (a) {
var st = a.st, c = a.car;
if (!c || st.cool > 0 || st.stun > 0)
return false;
if (PY.race && PY.race.st !== "on" && PY.race.st !== "free")
return false;
if (PY.race && PY.race.st === "on" && !PY_EVENTS[PY.race.ev].arms) {
if (a.me)
pySay("No weapons in this race: just the road.");
return false;
}
var W = PY_OFF[c.off], f = pyFwd(a), S = PY_STYLE[c.style] || PY_STYLE.wedge, L = S.L / 2;
st.cool = W.cool * (a.me ? 1 : 1.25);
var y0 = a.y + 1.0;
if (W.kind === "missile") {
var n = W.n || 1, tgt = pyTargetAhead(a, 260, W.home ? 0.6 : 0.25);
for (var i = 0; i < n; i++) {
var sp = (n > 1 ? (i - (n - 1) / 2) * (W.spread || 0.08) : 0), ca = Math.cos(sp), sa = Math.sin(sp), dx = f.x * ca - f.z * sa, dz = f.z * ca + f.x * sa;
var v = W.spd + Math.max(0, a.v);
pyShot({ kind: c.off, x: a.x + dx * (L + 1), y: y0, z: a.z + dz * (L + 1), vx: dx * v, vz: dz * v, vy: 0, spd: v, dmg: W.dmg, home: W.home || 0, tgt: W.home ? tgt : null, owner: a.id, col: W.col, big: W.big, life: W.home ? 5 : 3.2 });
}
}
else if (W.kind === "drop") {
pyDrop({ kind: W.drop, x: a.x - f.x * (L + 1.4), z: a.z - f.z * (L + 1.4), y: pyGround(a.x - f.x * (L + 1.4), a.z - f.z * (L + 1.4), a.y + 1), life: W.life, owner: a.id, dmg: W.dmg || 0, arm: W.drop === "mine" ? 0.6 : 0 });
}
else if (W.kind === "lob") {
var lx = a.x + f.x * 36, lz = a.z + f.z * 36;
pyShot({ kind: "tar", x: a.x + f.x * L, y: y0 + 0.5, z: a.z + f.z * L, vx: f.x * (36 / 1.1) + (a.v > 0 ? f.x * a.v : 0), vz: f.z * (36 / 1.1) + (a.v > 0 ? f.z * a.v : 0), vy: 6, lob: 1, owner: a.id, col: 0x2A2420, life: 3 });
}
else if (W.kind === "cone") {
st.flame = W.dur;
}
else if (W.kind === "beam") {
var t = pyTargetAhead(a, W.reach, 0.3);
var end = t ? { x: t.x, y: t.y + 1, z: t.z } : { x: a.x + f.x * W.reach, y: y0, z: a.z + f.z * W.reach };
pyBeam(a, end, W.col, c.off);
if (t && !t.decoy) {
if (c.off === "frost") {
pyHit(t, W.dmg, a, W.name);
pyAffect(t, "frozen", W.slow);
pyAffect(t, "slow", W.slow * 0.7);
}
else if (c.off === "arc") {
pyHit(t, W.dmg, a, W.name);
var done = [t.id], last = t;
for (var k = 1; k < (W.chain || 3); k++) {
var nx = pyActorsNear(last.x, last.z, last.y, 18, a).filter(function (b) { return done.indexOf(b.id) < 0 && b.id !== a.id; })[0];
if (!nx)
break;
pyBeam(last, { x: nx.x, y: nx.y + 1, z: nx.z }, W.col, "arc");
pyHit(nx, W.dmg * 0.7, a, W.name);
done.push(nx.id);
last = nx;
}
}
else if (c.off === "harpoon") {
pyHit(t, W.dmg, a, W.name);
pyAffect(t, "slow", 1.2);
st.boost = Math.max(st.boost, 1.1);
}
else if (c.off === "magnet") {
pyHit(t, W.dmg, a, W.name);
pyAffect(t, "slow", 2);
st.boost = Math.max(st.boost, 1.3);
}
}
}
else if (W.kind === "aura") {
if (c.off === "saw") {
st.saw = W.dur;
}
else {
pyRing(a.x, a.y + 0.6, a.z, W.reach, W.col);
pyActorsNear(a.x, a.z, a.y, W.reach, a).forEach(function (b) {
if (c.off === "emp") {
pyAffect(b, "stun", W.stun);
}
else if (c.off === "shock") {
pyHit(b, W.dmg, a, W.name);
var dx = b.x - a.x, dz = b.z - a.z, d = Math.hypot(dx, dz) || 1;
pyPush(b, dx / d * W.knock, dz / d * W.knock);
}
});
}
}
else if (W.kind === "ram") {
st.ram = W.dur;
st.boost = Math.max(st.boost, W.dur);
}
if (a.me) {
pyNetSend({ t: "fire", w: c.off, x: Math.round(a.x), z: Math.round(a.z), h: +a.h.toFixed(3) });
if (typeof playTone === "function")
try {
playTone(W.kind === "beam" ? 620 : W.kind === "drop" ? 180 : 240, 0.12);
}
catch (e) { }
}
return true;
},
function (a) {
var st = a.st, c = a.car;
if (!c || st.dcool > 0 || st.stun > 0)
return false;
var D = PY_DEF[c.def], f = pyFwd(a), L = (PY_STYLE[c.style] || PY_STYLE.wedge).L / 2;
st.dcool = D.cool * (a.me ? 1 : 1.3);
switch (c.def) {
case "shield":
st.shield = D.dur;
break;
case "plate":
st.plate = D.dur;
break;
case "smoke":
st.smoke = D.dur;
break;
case "decoy":
st.decoy = { x: a.x - f.x * (L + 3), y: a.y, z: a.z - f.z * (L + 3), t: D.dur };
pyDecoyMesh(a);
break;
case "flare":
PY.shots.forEach(function (s) { if (s.owner !== a.id && Math.hypot(s.x - a.x, s.z - a.z) < 45) {
s.life = 0;
pySoft(s.x, s.y, s.z, 0xFFD8A0, 2, 0.7);
} });
for (var q = 0; q < 6; q++)
pySoft(a.x + (Math.random() - 0.5) * 6, a.y + 2 + Math.random() * 2, a.z + (Math.random() - 0.5) * 6, 0xFFE0A8, 0.9, 1.2);
break;
case "nitro":
st.boost = D.dur;
st.nitro = D.dur;
break;
case "repair":
st.hp = Math.min(st.max || 100, (st.hp || 0) + 40);
pySoft(a.x, a.y + 1.2, a.z, 0x9AE8A0, 2.6, 1);
break;
case "cloak":
st.cloak = D.dur;
break;
case "mirror":
st.mirror = D.dur;
break;
case "jumpjet":
if (!st.air) {
st.air = true;
st.vy = 10.5;
st.airT = 0;
pySoft(a.x, a.y + 0.2, a.z, 0xD8D0C0, 2.2, 0.8);
}
else
st.dcool = 0.3;
break;
case "phase":
st.phase = D.dur;
break;
case "ice":
st.ice = D.dur;
break;
}
if (a.me) {
pyNetSend({ t: "def", d: c.def });
pyFeed(D.icon + " " + D.name, "#BFE8FF");
}
return true;
},
function (b, dmg, a, how) {
if (!b)
return 0;
if (b.decoy) {
return 0;
}
if (b.st.mirror > 0 && a && a.id !== b.id) {
b.st.mirror = 0;
pyFeedIf(b, "🪞 The shot flew back");
var src = pyActorById(a.id);
if (src)
return pyHit(src, dmg, b, "its own " + how);
return 0;
}
if (b.me) {
return pyHurt(dmg, { how: (a && a.name && a.id !== "me" ? a.name + "'s " : "") + (how || "a blow"), shot: 1, by: a && a.id });
}
if (b.ghost) {
if (a && a.me)
pyPvpHit(b, dmg, how);
return dmg;
}
return pyRivalHurt(b, dmg, a, how);
},
function (b, what, secs) {
if (!b || b.decoy)
return;
if (b.st.phase > 0 || b.st.shield > 0)
return;
if (b.me) {
PY.me[what] = Math.max(PY.me[what] || 0, secs);
if (what === "stun")
pyFeed("🔌 Stunned!", "#9ACFFF");
if (what === "frozen")
pyFeed("❄️ Frozen!", "#BFE8FF");
return;
}
if (b.ghost) {
if (pyDriving())
pyNetSend({ t: "fx", to: b.id, w: what, s: secs });
return;
}
b.st[what] = Math.max(b.st[what] || 0, secs);
},
function (s) {
if (PY.shots.length > 60)
return;
var col = s.col || 0xFFC080, m;
if (s.kind === "tar") {
m = new THREE.Mesh(pyGeo("ball"), pyMat("matte", 0x1A1614));
m.scale.setScalar(0.5);
}
else if (s.kind === "drones" || s.kind === "swarm") {
m = new THREE.Group();
var b = new THREE.Mesh(pyGeo("ball"), pyMat("glow", col));
b.scale.setScalar(0.22);
m.add(b);
var r = new THREE.Mesh(pyGeo("ring"), pyMat("chrome", 0x8A8E96));
r.scale.setScalar(0.4);
r.rotation.x = Math.PI / 2;
m.add(r);
}
else {
m = new THREE.Group();
var body = new THREE.Mesh(pyGeo("shell"), pyMat("paint", s.big ? 0x5A5A60 : 0xE8E8E8));
body.rotation.x = Math.PI / 2;
body.scale.setScalar(s.big ? 1.5 : 1);
m.add(body);
var tail = new THREE.Mesh(pyGeo("ball"), pyMat("glow", col, { op: 0.75 }));
tail.scale.set(0.16, 0.16, 0.4);
tail.position.z = -0.5;
m.add(tail);
}
m.position.set(PY.base + s.x, s.y, s.z);
scene.add(m);
s.m = m;
s.t = 0;
PY.shots.push(s);
},
function (k) {
if (PY.geo[k])
return PY.geo[k];
var g;
if (k === "ball")
g = new THREE.SphereGeometry(1, 10, 8);
else if (k === "ring")
g = new THREE.TorusGeometry(1, 0.08, 6, 16);
else if (k === "shell") {
g = new THREE.CylinderGeometry(0.08, 0.11, 0.8, 10);
}
else if (k === "disc")
g = new THREE.CircleGeometry(1, 24);
else if (k === "spike")
g = new THREE.ConeGeometry(0.08, 0.24, 4);
return PY.geo[k] = g;
},
function (dt) {
for (var i = PY.shots.length - 1; i >= 0; i--) {
var s = PY.shots[i];
s.t += dt;
s.life -= dt;
if (s.lob) {
s.vy -= PY_G * dt;
}
else if (s.home && s.tgt) {
var T = s.tgt.decoy ? s.tgt : (pyActorById(s.tgt.id) || null);
if (T && T.st && (T.st.cloak > 0 || T.st.smoke > 0) && !T.decoy)
T = null;
if (T && T.st && T.st.decoy && !T.decoy)
T = { x: T.st.decoy.x, y: T.st.decoy.y, z: T.st.decoy.z };
if (T) {
var dx = T.x - s.x, dz = T.z - s.z, dy = (T.y + 0.9) - s.y, d = Math.hypot(dx, dz, dy) || 1, k = Math.min(1, s.home * dt);
s.vx += (dx / d * s.spd - s.vx) * k;
s.vz += (dz / d * s.spd - s.vz) * k;
s.vy += (dy / d * s.spd - s.vy) * k;
}
}
s.x += s.vx * dt;
s.y += s.vy * dt;
s.z += s.vz * dt;
s.m.position.set(PY.base + s.x, s.y, s.z);
if (!s.lob)
s.m.lookAt(PY.base + s.x + s.vx, s.y + s.vy, s.z + s.vz);
var g = pyGround(s.x, s.z, s.y + 1), done = false;
if (s.lob) {
if (s.y <= g + 0.2) {
pyDrop({ kind: "tar", x: s.x, z: s.z, y: g, life: 12, owner: s.owner });
pySoft(s.x, g + 0.4, s.z, 0x2A2420, 2.6, 0.8);
done = true;
}
}
else {
if (s.y < g - 0.2 || s.life <= 0) {
if (s.life > 0)
pyBoom(s.x, Math.max(g, s.y) + 0.3, s.z, s.big ? 7 : 4.5, 0, s.owner, s.kind);
done = true;
}
else {
var hit = null;
pyActors().forEach(function (b) { if (hit || b.id === s.owner)
return; if (Math.hypot(b.x - s.x, b.z - s.z) < 2.6 && s.y > b.y - 0.5 && s.y < b.y + 3.2 && !(b.st.phase > 0))
hit = b; });
if (!hit && s.tgt && s.tgt.decoy && Math.hypot(s.tgt.x - s.x, s.tgt.z - s.z) < 2.4) {
pyBoom(s.x, s.y, s.z, 3, 0, s.owner, s.kind);
done = true;
}
if (hit) {
if (hit.st.mirror > 0) {
hit.st.mirror = 0;
var back = pyActorById(s.owner);
s.vx = -s.vx;
s.vz = -s.vz;
s.vy = -s.vy * 0.3;
s.owner = hit.id;
s.tgt = back;
s.home = Math.max(s.home, 2);
s.life = Math.max(s.life, 2.5);
pyFeedIf(hit, "🪞 Sent back!");
}
else {
pyHit(hit, s.dmg, pyActorById(s.owner) || { id: s.owner, name: "a rival" }, PY_OFF[s.kind] ? PY_OFF[s.kind].name : PY_POW[s.kind] ? PY_POW[s.kind].name : "a shot");
pyBoom(s.x, s.y, s.z, s.big ? 3.5 : 2.2, 0, s.owner, s.kind);
done = true;
}
}
}
}
if (done || s.life <= -1) {
pyGone(s.m);
PY.shots.splice(i, 1);
}
}
},
function (d) {
if (PY.drops.length > 50) {
var o = PY.drops.shift();
if (o.m)
pyGone(o.m);
}
var g = new THREE.Group(), y = (d.y || 0) + 0.04;
if (d.kind === "blackice") {
var bi = new THREE.Mesh(pyGeo("disc"), new THREE.MeshPhongMaterial({ color: 0x2A3A4A, shininess: 140, specular: 0xBFE8FF, transparent: true, opacity: 0.8, depthWrite: false }));
bi.rotation.x = -Math.PI / 2;
bi.scale.set(6.5, 4, 1);
g.add(bi);
d.r = 5.5;
}
else if (d.kind === "oil" || d.kind === "tar") {
var m = new THREE.Mesh(pyGeo("disc"), new THREE.MeshPhongMaterial({ color: d.kind === "oil" ? 0x101014 : 0x1E1814, shininess: d.kind === "oil" ? 120 : 30, specular: 0x5A5A6A, transparent: true, opacity: 0.9, depthWrite: false }));
m.rotation.x = -Math.PI / 2;
m.scale.setScalar(d.kind === "oil" ? 4.5 : 6);
g.add(m);
d.r = d.kind === "oil" ? 4.5 : 6;
}
else if (d.kind === "spikes") {
for (var i = 0; i < (PY.lite ? 10 : 22); i++) {
var s = new THREE.Mesh(pyGeo("spike"), pyMat("chrome", 0x8A8E96));
s.position.set((Math.random() - 0.5) * 7, 0.1, (Math.random() - 0.5) * 4);
g.add(s);
}
d.r = 4;
}
else if (d.kind === "mine") {
var b = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 0.25, 14), pyMat("matte", 0x2A2A2E));
b.position.y = 0.12;
g.add(b);
var l = new THREE.Mesh(pyGeo("ball"), pyMat("glow", 0xFF6A3A));
l.scale.setScalar(0.08);
l.position.y = 0.28;
g.add(l);
d.r = 3.6;
}
else if (d.kind === "well") {
var w = new THREE.Mesh(pyGeo("disc"), new THREE.MeshBasicMaterial({ color: 0x7A4AE0, transparent: true, opacity: 0.35, depthWrite: false }));
w.rotation.x = -Math.PI / 2;
w.scale.setScalar(14);
g.add(w);
var r2 = new THREE.Mesh(pyGeo("ring"), pyMat("glow", 0xB07AFF, { op: 0.5 }));
r2.rotation.x = Math.PI / 2;
r2.scale.setScalar(3);
r2.position.y = 1.2;
g.add(r2);
d.spin = r2;
d.r = 14;
}
g.position.set(PY.base + d.x, y, d.z);
g.rotation.y = Math.random() * 6;
scene.add(g);
d.m = g;
d.t = 0;
PY.drops.push(d);
},
function (dt) {
var A = pyActors();
for (var i = PY.drops.length - 1; i >= 0; i--) {
var d = PY.drops[i];
d.t += dt;
d.life -= dt;
if (d.spin)
d.spin.rotation.z += dt * 1.2;
if (d.life < 1.5 && d.m)
d.m.traverse(function (o) { if (o.material && o.material.transparent)
o.material.opacity = Math.max(0, o.material.opacity - dt * 0.4); });
var gone = d.life <= 0;
for (var k = 0; k < A.length && !gone; k++) {
var b = A[k];
if (b.st.air || b.st.phase > 0 || b.ghost)
continue;
var dd = Math.hypot(b.x - d.x, b.z - d.z);
if (dd > d.r || Math.abs(b.y - d.y) > 2.5)
continue;
var by = pyActorById(d.owner) || { id: d.owner, name: "a rival" };
if (d.kind === "blackice") {
if (b.st.ice > 0 || b.id === d.owner)
continue;
if (!(b.st.spin > 0)) {
pyAffect(b, "spin", 1.7);
if (b.me)
pyFeed("🧊 Black ice! You spin", "#BFE8FF");
}
}
else if (d.kind === "oil") {
if (b.st.ice > 0)
continue;
if (!(b.st.spin > 0)) {
pyAffect(b, "spin", 1.3);
if (b.me)
pyFeed("🛢️ Oil! You spin", "#E8D8A8");
}
}
else if (d.kind === "spikes") {
if (b.st.ice > 0 || b.id === d.owner && d.t < 1)
continue;
if (!b.st.spiked || b.st.spiked < PY.t - 1.5) {
b.st.spiked = PY.t;
pyHit(b, d.dmg, by, "caltrops");
pyAffect(b, "slow", 2);
}
}
else if (d.kind === "mine") {
if (d.t < d.arm || (b.id === d.owner && d.t < 2))
continue;
pyHit(b, d.dmg, by, "a mine");
pyBoom(d.x, d.y + 0.5, d.z, 4, 0, d.owner, "mine");
if (b.me && !PY.me.air) {
PY.me.air = true;
PY.me.vy = 6;
}
gone = true;
}
else if (d.kind === "tar") {
pyAffect(b, "slow", 0.6);
}
else if (d.kind === "well") {
if (b.id === d.owner)
continue;
var dx = d.x - b.x, dz = d.z - b.z, l = Math.hypot(dx, dz) || 1;
pyPush(b, dx / l * 14 * dt, dz / l * 14 * dt);
pyAffect(b, "slow", 0.4);
}
}
if (gone) {
if (d.m)
pyGone(d.m);
PY.drops.splice(i, 1);
}
}
},
function (a, dt) {
var st = a.st, f = pyFwd(a), W;
if (st.flame > 0) {
W = PY_OFF.flame;
if (Math.random() < (PY.lite ? 0.35 : 0.7))
pySoft(a.x + f.x * (3 + Math.random() * 8), a.y + 0.8 + Math.random(), a.z + f.z * (3 + Math.random() * 8), Math.random() < 0.5 ? 0xFF8A3A : 0xFFB860, 1.2 + Math.random(), 0.5);
pyActors().forEach(function (b) { if (b.id === a.id)
return; var dx = b.x - a.x, dz = b.z - a.z, d = Math.hypot(dx, dz); if (d > W.reach || d < 0.5)
return; if ((dx * f.x + dz * f.z) / d < Math.cos(W.arc))
return; pyHit(b, W.dmg / W.dur * dt, a, W.name); });
}
if (st.saw > 0) {
W = PY_OFF.saw;
pyActors().forEach(function (b) { if (b.id === a.id)
return; var d = Math.hypot(b.x - a.x, b.z - a.z); if (d < W.reach + 2 && Math.abs(b.y - a.y) < 2)
pyHit(b, W.dmg / W.dur * dt, a, W.name); });
}
if (st.ram > 0) {
W = PY_OFF.ram;
pyActors().forEach(function (b) { if (b.id === a.id || b.st.rammed > PY.t - 1)
return; var dx = b.x - a.x, dz = b.z - a.z, d = Math.hypot(dx, dz); if (d < 5 && (dx * f.x + dz * f.z) / (d || 1) > 0.3 && Math.abs(b.y - a.y) < 2.5) {
b.st.rammed = PY.t;
pyHit(b, W.dmg, a, W.name);
pyPush(b, f.x * 18 + dx / (d || 1) * 6, f.z * 18 + dz / (d || 1) * 6);
if (!b.st.air) {
if (b.me) {
PY.me.air = true;
PY.me.vy = 7;
}
else {
b.st.air = true;
b.st.vy = 7;
}
}
} });
}
},
function (st, dt) {
["cool", "dcool", "shield", "plate", "smoke", "cloak", "phase", "mirror", "ice", "stun", "spin", "slow", "boost", "nitro", "saw", "flame", "ram", "frozen"].forEach(function (k) { if (st[k] > 0)
st[k] = Math.max(0, st[k] - dt); });
if (st.decoy) {
st.decoy.t -= dt;
if (st.decoy.t <= 0) {
if (st.decoy.m)
pyGone(st.decoy.m);
st.decoy = null;
}
}
if (st.smoke > 0 && Math.random() < dt * 6)
st.smokeDrop = 1;
},
function (g, st, dt) {
var A = g.userData.arms;
if (A && A.userData.spin)
A.userData.spin.rotation.y += dt * (st.cool > 0 ? 0.6 : 2);
if (g.userData.saws)
g.userData.saws.forEach(function (s, i) { s.rotation.x += dt * (st.saw > 0 ? 40 : 0); var out = st.saw > 0 ? 0.35 : 0; s.position.x += ((i ? 1 : -1) * ((g.userData.W || 1) + 0.08 + out) - s.position.x) * Math.min(1, dt * 8); });
if (g.userData.plates)
g.userData.plates.forEach(function (p) { p.visible = st.plate > 0; });
var want = st.shield > 0 ? 0x8AD8FF : st.mirror > 0 ? 0xE8E0FF : st.phase > 0 ? 0xB89AFF : st.cloak > 0 ? 0xC8D8E8 : st.ice > 0 ? 0xBFEFFF : null;
if (want !== null) {
if (!g.userData.bub) {
var b = new THREE.Mesh(new THREE.SphereGeometry(1, PY.lite ? 12 : 20, PY.lite ? 8 : 14), new THREE.MeshBasicMaterial({ color: want, transparent: true, opacity: 0.22, depthWrite: false }));
var L = g.userData.L || 4.4;
b.scale.set((g.userData.W || 1) * 1.5, 1.6, L * 0.62);
b.position.y = 0.9;
b.raycast = function () { };
g.add(b);
g.userData.bub = b;
}
var bb = g.userData.bub;
bb.visible = true;
bb.material.color.setHex(want);
bb.material.opacity = st.cloak > 0 && !st.shield ? 0.12 : 0.2 + 0.05 * Math.sin(PY.t * 2);
}
else if (g.userData.bub)
g.userData.bub.visible = false;
},
function (a) {
var d = a.st.decoy;
if (!d || !a.car)
return;
var g = pyBuildCar(a.car, { lite: true });
g.traverse(function (o) { if (o.isMesh) {
o.material = new THREE.MeshBasicMaterial({ color: 0x9ACFFF, transparent: true, opacity: 0.35, depthWrite: false });
} });
g.position.set(PY.base + d.x, d.y, d.z);
g.rotation.y = a.h + Math.PI;
scene.add(g);
d.m = g;
},
function () {
if (PY.tex.soft)
return PY.tex.soft;
var c = document.createElement("canvas");
c.width = c.height = 64;
var x = c.getContext("2d"), gr = x.createRadialGradient(32, 32, 2, 32, 32, 31);
gr.addColorStop(0, "rgba(255,255,255,1)");
gr.addColorStop(0.45, "rgba(255,255,255,.5)");
gr.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = gr;
x.fillRect(0, 0, 64, 64);
return PY.tex.soft = new THREE.CanvasTexture(c);
},
function (x, y, z, col, size, life) {
if (PY.fx.length > (PY.lite ? 50 : 120))
return;
var m = new THREE.Sprite(new THREE.SpriteMaterial({ map: pySoftTex(), color: col, transparent: true, opacity: 0, depthWrite: false }));
m.position.set(PY.base + x, y, z);
m.scale.setScalar(size * 0.6);
scene.add(m);
PY.fx.push({ m: m, t: 0, life: life || 1, size: size, op: col === 0x6A6460 || col === 0x7A7470 ? 0.45 : 0.55 });
},
function (a, end, col, kind) {
var from = new THREE.Vector3(PY.base + a.x, a.y + 1.2, a.z), to = new THREE.Vector3(PY.base + end.x, end.y, end.z);
var pts = [from];
if (kind === "arc") {
for (var i = 1; i < 6; i++) {
var p = from.clone().lerp(to, i / 6);
p.x += (Math.random() - 0.5) * 1.2;
p.y += (Math.random() - 0.5) * 1.2;
p.z += (Math.random() - 0.5) * 1.2;
pts.push(p);
}
}
pts.push(to);
var g = new THREE.BufferGeometry().setFromPoints(pts), m = new THREE.Line(g, new THREE.LineBasicMaterial({ color: col || 0xFFFFFF, transparent: true, opacity: 0 }));
scene.add(m);
PY.fx.push({ m: m, t: 0, life: 0.7, op: 0.6, line: 1 });
pySoft(end.x, end.y, end.z, col || 0xFFFFFF, 1.6, 0.6);
},
function (dt) {
for (var i = PY.fx.length - 1; i >= 0; i--) {
var f = PY.fx[i];
f.t += dt;
var u = f.t / f.life;
var op = u < 0.2 ? f.op * (u / 0.2) : f.op * Math.max(0, 1 - (u - 0.2) / 0.8);
f.m.material.opacity = op;
if (f.ring)
f.m.scale.setScalar(f.size * (0.2 + 0.8 * Math.min(1, u * 1.4)));
else if (!f.line) {
f.m.scale.setScalar(f.size * (0.6 + 0.8 * u));
f.m.position.y += dt * 0.8;
}
if (u >= 1) {
pyGone(f.m);
PY.fx.splice(i, 1);
}
}
},
function (nx, nz, dt) {
var M = PY.me, me = { x: nx, z: nz, y: M.y };
PY.riv.forEach(function (R) {
if (R.dead)
return;
var dx = R.x - nx, dz = R.z - nz, d = Math.hypot(dx, dz), min = 1.3 * (pyBulk(M.car) + pyBulk(R.car));
if (d >= min || Math.abs(R.y - M.y) > 2.2 || M.phase > 0 || R.st.phase > 0)
return;
var ux = dx / (d || 1), uz = dz / (d || 1), rel = (M.vx - (R.vx || 0)) * ux + (M.vz - (R.vz || 0)) * uz;
PY.me.nx = nx - ux * (min - d) * 0.5;
PY.me.nz = nz - uz * (min - d) * 0.5;
R.x += ux * (min - d) * 0.5;
R.z += uz * (min - d) * 0.5;
if (rel > 0) {
M.vx -= ux * rel * 0.6;
M.vz -= uz * rel * 0.6;
R.vx = (R.vx || 0) + ux * rel * 0.6;
R.vz = (R.vz || 0) + uz * rel * 0.6;
if (rel > 8 && (!R.st.bumped || R.st.bumped < PY.t - 0.8)) {
R.st.bumped = PY.t;
var mine = M.ram > 0 ? 0 : (rel - 8) * 0.6;
pyHurt(mine, { how: "a crash with " + R.name });
pyRivalHurt(R, (rel - 8) * 1.1, pyMeActor(), "a crash");
}
}
});
},
function (k) {
var key = "hz:" + k;
if (PY.geo[key])
return PY.geo[key];
var g;
if (k === "boulder") {
g = new THREE.DodecahedronGeometry(2.2, 1);
var p = g.attributes.position;
for (var i = 0; i < p.count; i++) {
var f = 0.85 + 0.3 * Math.abs(Math.sin(p.getX(i) * 3.1 + p.getZ(i) * 2.3));
p.setXYZ(i, p.getX(i) * f, p.getY(i) * f * 0.85, p.getZ(i) * f);
}
g.computeVertexNormals();
}
else if (k === "icicle") {
g = new THREE.ConeGeometry(0.5, 4, 6);
g.rotateX(Math.PI);
}
else if (k === "bomb") {
g = new THREE.DodecahedronGeometry(1.4, 1);
}
else if (k === "log") {
g = new THREE.CylinderGeometry(0.7, 0.85, 1, 10);
g.rotateZ(Math.PI / 2);
}
else if (k === "wreck") {
g = new THREE.BoxGeometry(3, 0.4, 1.6);
}
else if (k === "stal") {
g = new THREE.ConeGeometry(0.7, 4.2, 7);
g.rotateX(Math.PI);
}
else if (k === "shadow") {
g = new THREE.CircleGeometry(1, 20);
g.rotateX(-Math.PI / 2);
}
return PY.geo[key] = g;
},
function (s, H) {
var across = (Math.random() - 0.5) * s.w * 0.8, x = s.x + across * s.tz, z = s.z - across * s.tx, gy = s.y;
var hz = { k: H.k, name: H.name, x: x, z: z, ground: gy, y: gy + (H.k === "stal" ? 7.2 : 34), vy: 0, t: 0, warn: H.k === "stal" ? 1.1 : 1.5, r: H.r, dmg: H.dmg, h: Math.atan2(s.tx, s.tz) };
var mat = H.k === "bomb" ? pyMat("glow", 0xFF7A3A) : H.k === "icicle" ? new THREE.MeshPhongMaterial({ color: 0xC8E8F8, shininess: 110, specular: 0xFFFFFF, transparent: true, opacity: 0.85 }) :
H.k === "stal" ? new THREE.MeshLambertMaterial({ color: 0x4A4458, map: pyTex("stone", 1, 2) }) :
H.k === "log" ? new THREE.MeshLambertMaterial({ color: 0x5A4430, map: pyTex("bark", 3, 1) }) : H.k === "boulder" ? new THREE.MeshLambertMaterial({ color: 0xA0704A, map: pyTex("stone", 1, 1) }) : pyMat("chrome", 0x5A5A64);
var m;
if (H.k === "icicle") {
m = new THREE.Group();
for (var i = 0; i < 4; i++) {
var c = new THREE.Mesh(pyHazGeo("icicle"), mat);
c.position.set((Math.random() - 0.5) * 2, 0, (Math.random() - 0.5) * 2);
c.scale.setScalar(0.6 + Math.random() * 0.6);
m.add(c);
}
}
else if (H.k === "log") {
m = new THREE.Mesh(pyHazGeo("log"), mat);
m.scale.set(s.w * 0.6, 1, 1);
m.rotation.y = hz.h + Math.PI / 2;
}
else if (H.k === "bomb") {
m = new THREE.Group();
var core = new THREE.Mesh(pyHazGeo("bomb"), mat);
m.add(core);
var crust = new THREE.Mesh(pyHazGeo("bomb"), pyMat("lambert", 0x2A1A14));
crust.scale.setScalar(1.06);
crust.material = new THREE.MeshLambertMaterial({ color: 0x2A1A14, transparent: true, opacity: 0.7 });
m.add(crust);
}
else
m = new THREE.Mesh(pyHazGeo(H.k), mat);
m.position.set(PY.base + x, hz.y, z);
m.raycast = function () { };
scene.add(m);
hz.m = m;
var sh = new THREE.Mesh(pyHazGeo("shadow"), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0, depthWrite: false }));
sh.position.set(PY.base + x, gy + 0.08, z);
sh.scale.setScalar(0.3);
scene.add(sh);
hz.sh = sh;
PY.hz.push(hz);
},
function (dt) {
var M = PY.me, P = camera.position;
var who = pyDriving() && M.wreckT <= 0 ? { x: P.x - PY.base, z: P.z, y: M.y, v: DRIVE.v } : null;
if (who && PY.hz.length < (PY.lite ? 6 : 12)) {
var n = pyNear(who.x, who.z, who.y);
if (n && n.s.main) {
var H = PY_HAZ[n.zone];
PY.hzT = (PY.hzT || 0) - dt;
if (H && PY.hzT <= 0) {
PY.hzT = H.every * (0.6 + Math.random() * 0.8) * (PY.race && PY.race.st === "on" ? 1 : 1.6);
if (H.k === "gust") {
var sd = Math.random() < 0.5 ? -1 : 1, s0 = n.s;
PY.gust = { x: sd * s0.tz * 7, z: -sd * s0.tx * 7, t: 1.6 };
pySay("<b>A gust!</b> The wind shoves you " + (sd > 0 ? "right" : "left") + ".");
}
else {
var ahead = Math.max(40, Math.abs(who.v) * 1.6) + Math.random() * 40, S = PYT.S;
var k = (n.s.i + Math.round(ahead / 4)) % S.length, s = S[k];
if (s.zone === n.zone && s.fl.indexOf("g") < 0 && !s.slab && (H.k !== "stal" || s.fl.indexOf("t") >= 0))
pyHazSpawn(s, H);
}
}
}
}
if (PY.gust) {
PY.gust.t -= dt;
if (pyDriving() && !M.air) {
M.vx += PY.gust.x * dt;
M.vz += PY.gust.z * dt;
}
if (PY.gust.t <= 0)
PY.gust = null;
}
for (var i = PY.hz.length - 1; i >= 0; i--) {
var h = PY.hz[i];
h.t += dt;
if (!h.down) {
var u = Math.min(1, h.t / h.warn);
h.sh.material.opacity = 0.12 + 0.33 * u;
h.sh.scale.setScalar(h.r * (0.3 + 0.7 * u));
if (h.t > h.warn * 0.35) {
h.vy -= PY_G * 2.2 * dt;
h.y += h.vy * dt;
}
if (h.k === "bomb")
h.m.rotation.x += dt * 3;
else if (h.k === "boulder")
h.m.rotation.x += dt * 2;
else if (h.k === "wreck") {
h.m.rotation.z += dt * 2;
h.m.rotation.x += dt * 1.3;
}
if (h.y <= h.ground + 0.6) {
h.y = h.ground + (h.k === "log" ? 0.75 : h.k === "boulder" ? 1.6 : h.k === "icicle" || h.k === "stal" ? 0.4 : 0.8);
h.down = true;
h.t = 0;
pySoft(h.x, h.ground + 0.8, h.z, h.k === "bomb" ? 0xFF9A50 : h.k === "icicle" ? 0xE8F4FF : 0xB8A888, h.r * 1.6, 1.1);
if (h.k === "bomb")
pySoft(h.x, h.ground + 1.2, h.z, 0x5A4A44, h.r * 2, 1.8);
pyActors().forEach(function (b) {
var d = pyHazDist(h, b.x, b.z);
if (d < h.r + 1.2 && Math.abs(b.y - h.ground) < 3 && !(b.st.phase > 0))
pyHit(b, h.dmg, { id: "road", name: "the road" }, h.name);
});
h.sh.material.opacity = 0;
if (h.k === "icicle" || h.k === "stal") {
h.life = 1.2;
}
else
h.life = h.k === "bomb" ? 4 : 7;
}
h.m.position.set(PY.base + h.x, h.y, h.z);
}
else {
h.life -= dt;
if (h.k === "bomb") {
var pulse = 0.75 + 0.25 * Math.sin(PY.t * 1.6);
if (h.m.children[0])
h.m.children[0].scale.setScalar(pulse);
}
if (h.life < 1) {
h.m.traverse(function (o) { if (o.material) {
o.material.transparent = true;
o.material.opacity = Math.max(0, h.life);
} });
}
if (h.life <= 0) {
pyGone(h.m);
pyGone(h.sh);
PY.hz.splice(i, 1);
continue;
}
}
}
},
function (dt) {
var list = PYT.slabs;
for (var i = 0; i < list.length; i++) {
var sl = list[i];
if (sl.st === 0)
continue;
sl.t += dt;
if (sl.st === 1) {
if (sl.mesh) {
sl.mesh.position.y = Math.sin(sl.t * 30) * 0.04;
sl.mesh.position.x = Math.sin(sl.t * 23) * 0.03;
}
if (sl.t > 0.6) {
sl.st = 2;
sl.t = 0;
sl.vy = 0;
var nx = list[i + 1];
if (nx && nx.a === sl.last + 1 && nx.st === 0) {
nx.st = 1;
nx.t = 0.2;
}
if (sl.mesh && Math.hypot(camera.position.x - PY.base - sl.cx, camera.position.z - sl.cz) < 200)
pySoft(sl.cx, sl.cy - 0.5, sl.cz, 0x8A8478, 6, 1.4);
}
}
else if (sl.st === 2) {
sl.vy -= PY_G * dt;
if (sl.mesh) {
sl.mesh.position.y += sl.vy * dt;
sl.mesh.rotation.z += dt * 0.08 * (i % 2 ? 1 : -1);
}
if (sl.t > 3.5) {
sl.st = 3;
sl.t = 0;
if (sl.mesh)
sl.mesh.visible = false;
}
}
else if (sl.st === 3) {
if (sl.t > 22) {
sl.st = 0;
sl.t = 0;
if (sl.mesh) {
sl.mesh.visible = true;
sl.mesh.position.set(0, 0, 0);
sl.mesh.rotation.set(0, 0, 0);
}
}
}
}
},
function (n, arms, myCar) {
pyRivalsClear();
var pool = PY_CARS.filter(function (c) { return c.k !== (myCar && myCar.k); }), names = PY_RIVAL_NAMES.slice();
for (var i = 0; i < n; i++) {
var c = pool.splice(Math.floor(Math.random() * pool.length), 1)[0], nm = names.splice(Math.floor(Math.random() * names.length), 1)[0];
var g = pyBuildCar(c, { lite: PY.lite });
scene.add(g);
var tag = null;
try {
if (typeof makeTag === "function") {
tag = makeTag(nm, false);
tag.position.y = (PY_STYLE[c.style] || {}).L > 5 ? 3.6 : 2.8;
g.add(tag);
}
}
catch (e) { }
PY.riv.push({ id: "r" + i, name: nm, car: c, g: g, tag: tag, d: 0, lap: 0, across: 0, tAcross: 0, v: 0, vx: 0, vz: 0, x: 0, y: 0, z: 0, h: 0, arms: arms,
st: { hp: c.hp, max: c.hp, cool: 2 + Math.random() * 3, dcool: 1 + Math.random() * 3, air: false, vy: 0 }, skill: 0.86 + Math.random() * 0.1, think: Math.random() * 0.3,
dead: false, deadT: 0, done: null, out: null, i: 0 });
}
},
function (R) {
var S = PYT.S, N = S.length, d = R.d;
if (R.i === undefined || R.i < 0 || R.i >= N)
R.i = 0;
var guard = 0;
while (guard++ < N) {
var a = S[R.i], b = S[(R.i + 1) % N], bd = (R.i + 1 === N) ? PYT.L : b.d;
if (d >= a.d && d < bd)
break;
R.i = (R.i + 1) % N;
}
var s = S[R.i], n = S[(R.i + 1) % N], span = ((R.i + 1 === N) ? PYT.L : n.d) - s.d, f = span > 0 ? (d - s.d) / span : 0;
return { s: s, n: n, f: f, y: s.y + (n.y - s.y) * f, x: s.x + (n.x - s.x) * f, z: s.z + (n.z - s.z) * f, tx: s.tx, tz: s.tz, w: s.w };
},
function (dt) {
var race = PY.race, go = race && (race.st === "on" || race.st === "done" || race.st === "out");
for (var k = 0; k < PY.riv.length; k++) {
var R = PY.riv[k], st = R.st, c = R.car;
if (R.dead) {
R.deadT += dt;
if (R.ko) {
if (R.deadT > 1.6 && R.g.visible)
R.g.visible = false;
continue;
}
if (R.deadT < 6 && Math.random() < dt * 2)
pySoft(R.x, R.y + 1.5, R.z, 0x4A4440, 3, 2.4);
if (R.deadT > 9 && R.g.visible) {
R.g.visible = false;
}
continue;
}
pyTimersTick(st, dt);
if (st.smokeDrop)
pySmokeTrail(R);
var A = pySampleAt(R), s = A.s;
var target = 0;
if (go) {
var S = PYT.S, ahead = pyRivAhead(R, 12), ang = Math.abs(wrapAng(Math.atan2(-ahead.tx, -ahead.tz) - Math.atan2(-s.tx, -s.tz)));
var Z = PY_ZONES[s.zone] || PY_ZONES.paddock, rad = 48 / Math.max(0.02, ang);
var bend = Math.sqrt(PY_G * Z.grip * c.grip * 1.3 * rad);
target = Math.min(c.top * R.skill, bend);
for (var q = 4; q < 30; q += 4) {
var sq = pyRivAhead(R, q);
if (sq.fl.indexOf("g") >= 0 || sq.fl.indexOf("r") >= 0 || sq.slab) {
target = Math.max(target, Math.min(c.top, 46 * PY_PACE));
break;
}
}
if (R.done !== null)
target = Math.min(target, 16);
if (st.slow > 0)
target *= 0.62;
if (st.boost > 0)
target *= 1.45;
if (st.frozen > 0)
target *= 0.85;
if (st.stun > 0)
target = 0;
if (s.patch && R.across > s.patch.l - 0.3 && R.across < s.patch.r + 0.3)
target *= 0.45;
}
var acc = c.acc * PY_PUNCH * (st.boost > 0 ? 2 : 1);
R.v += Math.max(-22 * dt, Math.min(acc * dt * Math.max(0.2, 1 - R.v / (c.top * 1.35)), target - R.v));
if (st.spin > 0) {
R.v *= Math.max(0, 1 - dt * 1.2);
R.tAcross += Math.sin(PY.t * 7) * dt * 4;
}
if (go && Math.random() < dt * 0.3)
R.tAcross = (Math.random() - 0.5) * (s.w - 4);
for (var qa = 3; qa <= 9; qa += 3) {
var sa = pyRivAhead(R, qa);
if (sa.patch) {
var Pp = sa.patch;
if (R.tAcross > Pp.l - 1.6 && R.tAcross < Pp.r + 1.6) {
var lw = Pp.l + s.w / 2, rw = s.w / 2 - Pp.r;
R.tAcross = lw > rw ? (-s.w / 2 + Pp.l) / 2 : (Pp.r + s.w / 2) / 2;
}
break;
}
}
if (PY.hz2)
PY.hz2.forEach(function (h) { if (h.k !== "erupt")
return; var dx = h.x - R.x, dz = h.z - R.z, al = dx * s.tx + dz * s.tz, ac = dx * s.tz - dz * s.tx; if (al > 0 && al < 40 && Math.abs(ac - R.tAcross) < h.r + 2)
R.tAcross = ac > 0 ? ac - h.r - 2.4 : ac + h.r + 2.4; });
pyActors().forEach(function (b) {
if (b === R || b.id === R.id)
return;
var dx = b.x - R.x, dz = b.z - R.z, al = dx * s.tx + dz * s.tz, ac = dx * s.tz - dz * s.tx;
if (al > 0 && al < 14 && Math.abs(ac) < 2.6 && Math.abs(b.y - R.y) < 3)
R.tAcross = ac > 0 ? ac - 3.2 : ac + 3.2;
});
var half = Math.max(0.5, s.w / 2 - 1.4);
R.tAcross = Math.max(-half, Math.min(half, R.tAcross));
var da = R.tAcross - R.across;
R.across += Math.max(-dt * 4, Math.min(dt * 4, da));
var d0 = R.d;
if (R.vx || R.vz) {
R.across += (R.vx * s.tz - R.vz * s.tx) * dt;
var shove = (R.vx * s.tx + R.vz * s.tz) * dt * 0.5;
R.d += shove;
R.run = (R.run || 0) + shove;
R.vx *= Math.max(0, 1 - dt * 3);
R.vz *= Math.max(0, 1 - dt * 3);
if (Math.abs(R.vx) + Math.abs(R.vz) < 0.2) {
R.vx = R.vz = 0;
}
}
R.across = Math.max(-s.w / 2 - 0.5, Math.min(s.w / 2 + 0.5, R.across));
R.d += R.v * dt;
R.run = (R.run || 0) + R.v * dt;
pyRivRoute(R, R.d - d0, d0);
if (R.d >= PYT.L) {
R.d -= PYT.L;
R.lap++;
R.i = 0;
if (race && !race.sp && race.st === "on" && R.lap >= race.laps && R.done === null) {
R.done = race.t;
pyFeed("🏁 " + esc(R.name) + " crosses the line", "#E8E0C8");
}
}
if (race && race.sp && race.st === "on" && R.done === null && R.run >= R.goal) {
R.done = race.t;
pyFeed("🏁 " + esc(R.name) + " reaches the finish arch", "#E8E0C8");
}
if (R.d < 0)
R.d += PYT.L;
A = pySampleAt(R);
s = A.s;
var gap = s.fl.indexOf("g") >= 0, fallen = s.slab && s.slab.st >= 2 && s.slab.st < 4;
R.h = Math.atan2(-A.tx, -A.tz);
R.x = A.x + R.across * A.tz;
R.z = A.z - R.across * A.tx;
if (!st.air && (gap || fallen)) {
st.air = true;
st.vy = gap ? R.v * 0.2 : 0;
R.y = R.y || A.y;
}
if (st.air) {
st.vy -= PY_G * dt;
R.y += st.vy * dt;
if (!gap && !fallen && R.y <= A.y + 0.3) {
if (R.y > A.y - 1.2) {
var hit = -st.vy;
R.y = A.y;
st.air = false;
st.land = Math.min(1, hit / 14);
if (hit > 13)
pyRivalHurt(R, (hit - 13) * 3, null, "a hard landing");
st.vy = 0;
}
}
if (R.y < A.y - 6) {
pyRivalWreck(R, gap ? "the jump" : "the collapsing road", null);
continue;
}
}
else
R.y = A.y;
if (Math.abs(R.across) > s.w / 2 + 0.4 && s.fl.indexOf("e") >= 0 && !/[cgr]/.test(s.fl))
R.across = Math.sign(R.across) * (s.w / 2);
if (!st.air && s.slab)
pySlabTrip(s.slab);
if (pyPitAt(R.x, R.z, R.y)) {
pyRivalWreck(R, pyPitAt(R.x, R.z, R.y), null);
continue;
}
if (go && R.arms && race.st === "on") {
R.think -= dt;
if (R.think <= 0) {
R.think = 0.25 + Math.random() * 0.2;
pyRivalMind(R);
}
}
pyLastingTick(R, dt);
pyPose(R.g, PY.base + R.x, R.y, R.z, R.h, st, dt, R.v, -da * 0.2);
var hid = st.cloak > 0;
if (R.hid !== hid) {
R.hid = hid;
R.g.children.forEach(function (ch) { if (ch !== R.g.userData.bub && ch !== R.tag)
ch.visible = !hid; });
}
}
},
function (R) {
var st = R.st, c = R.car, W = PY_OFF[c.off], me = R;
if (st.cool <= 0) {
var fire = false;
if (W.kind === "missile" || W.kind === "beam") {
fire = !!pyTargetAhead(R, W.kind === "beam" ? W.reach : 180, W.home ? 0.5 : 0.18);
}
else if (W.kind === "cone") {
fire = !!pyTargetAhead(R, 11, 0.35);
}
else if (W.kind === "lob") {
var t = pyTargetAhead(R, 55, 0.25);
fire = !!t && Math.hypot(t.x - R.x, t.z - R.z) > 18;
}
else if (W.kind === "drop") {
fire = pyActors().some(function (b) { if (b.id === R.id)
return false; var dx = b.x - R.x, dz = b.z - R.z, f = pyFwd(R), al = dx * f.x + dz * f.z; return al < -4 && al > -45 && Math.abs(dx * f.z - dz * f.x) < 5; });
}
else if (W.kind === "aura") {
fire = pyActorsNear(R.x, R.z, R.y, c.off === "saw" ? 6 : W.reach * 0.8, R).length > 0;
}
else if (W.kind === "ram") {
fire = !!pyTargetAhead(R, 16, 0.2);
}
if (fire && Math.random() < 0.75)
pyFire(R);
}
if (st.dcool <= 0) {
var dk = c.def, incoming = PY.shots.some(function (s) { return s.owner !== R.id && Math.hypot(s.x - R.x, s.z - R.z) < 38 && ((s.tgt && s.tgt.id === R.id) || Math.hypot(s.x + s.vx * 0.4 - R.x, s.z + s.vz * 0.4 - R.z) < Math.hypot(s.x - R.x, s.z - R.z)); });
var behind = pyActors().some(function (b) { if (b.id === R.id)
return false; var dx = b.x - R.x, dz = b.z - R.z, f = pyFwd(R), al = dx * f.x + dz * f.z; return al < -3 && al > -60; });
var A = pySampleAt(R), S = PYT.S, gapAhead = false;
for (var q = 1; q < 6; q++) {
if (pyRivAhead(R, q).fl.indexOf("g") >= 0)
gapAhead = true;
}
var hazard = PY.drops.some(function (d) { return d.owner !== R.id && Math.hypot(d.x - R.x, d.z - R.z) < 16; });
var use = false;
if (dk === "shield" || dk === "plate" || dk === "mirror" || dk === "phase")
use = incoming || st.hp < st.max * 0.3;
else if (dk === "flare")
use = incoming;
else if (dk === "smoke" || dk === "decoy" || dk === "cloak")
use = incoming || (behind && Math.random() < 0.3);
else if (dk === "nitro")
use = incoming || Math.random() < 0.08;
else if (dk === "repair")
use = st.hp < st.max * 0.55;
else if (dk === "jumpjet")
use = hazard || (gapAhead && R.v < 36);
else if (dk === "ice")
use = /ice|tundra|jungle/.test(A.s.zone) || hazard;
if (use)
pyDefend(R);
}
},
function (R, dmg, a, how) {
if (!R || R.dead)
return 0;
var st = R.st;
if (st.phase > 0 || st.shield > 0)
return 0;
if (st.nitro > 0 && how && how !== "a crash")
return 0;
if (st.plate > 0)
dmg *= 0.4;
dmg = Math.max(0, dmg);
if (dmg <= 0)
return 0;
st.hp -= dmg;
R.hitT = PY.t;
if (a && a.me) {
PY.dealt = (PY.dealt || 0) + dmg;
R.byMe = PY.t;
}
if (st.hp <= 0)
pyRivalWreck(R, how || "the blows", a);
return dmg;
},
function (R, why, a) {
if (R.dead)
return;
R.dead = true;
R.deadT = 0;
R.out = why;
R.st.hp = 0;
var race = PY.race;
if (race && race.st !== "grid") {
R.outT = race.t;
race.outs = (race.outs || []);
race.outs.push(R.id);
}
pySmokeBig(R.x, R.y + 1, R.z);
R.g.traverse(function (o) { if (o.isMesh && o.material && !o.userData.wr) {
o.userData.wr = 1;
o.material = pyMat("matte", 0x2A2624);
} });
if (R.tag)
R.tag.visible = false;
var byMe = (a && a.me) || (R.byMe && R.byMe > PY.t - 4);
if (byMe && race) {
race.kills = (race.kills || 0) + 1;
}
pyFeed("💥 " + esc(R.name) + " is wrecked" + (byMe ? " (by you)" : "") + (why ? " · " + esc(why) : ""), byMe ? "#FFD27A" : "#FFB89A");
},
function (slot, base) {
var S = PYT.S, back = 14 + Math.floor(slot / 2) * 10, b0 = base === undefined ? PYT.L : base, d = ((b0 - back) % PYT.L + PYT.L) % PYT.L, R = { d: d, i: base === undefined ? Math.max(0, S.length - 20) : undefined }, A = pySampleAt(R), ac = (slot % 2 ? -1 : 1) * Math.min(3.6, A.w / 2 - 1.6);
return { d: d, x: A.x + ac * A.tz, z: A.z - ac * A.tx, y: A.y, h: Math.atan2(-A.tx, -A.tz), across: ac, back: back };
},
function (R) {
if (!R || R.dead)
return;
R.dead = true;
R.ko = true;
R.deadT = 0;
R.out = "knocked out";
var race = PY.race;
if (race) {
R.outT = race.t;
(race.outs = race.outs || []).push(R.id);
}
if (R.tag)
R.tag.visible = false;
pySoft(R.x, R.y + 1, R.z, 0xC8C0D8, 3, 1.2);
pyFeed("⛔ " + esc(R.name) + " is knocked out (last place)", "#E8C66A");
},
function (html, col) {
if (!PY.feedEl) {
var f = document.createElement("div");
f.id = "py-feed";
f.style.cssText = "position:fixed;right:12px;top:150px;z-index:44;display:flex;flex-direction:column;gap:3px;align-items:flex-end;pointer-events:none;max-width:min(320px,60vw)";
document.body.appendChild(f);
PY.feedEl = f;
}
var d = document.createElement("div");
d.style.cssText = "background:rgba(12,10,16,.82);border-left:3px solid " + (col || "#E8C66A") + ";color:#F2EEE6;font:12.5px var(--sans,system-ui);padding:3px 8px;border-radius:3px;transition:opacity 1.2s;opacity:1";
d.innerHTML = html;
PY.feedEl.appendChild(d);
while (PY.feedEl.children.length > 5)
PY.feedEl.removeChild(PY.feedEl.firstChild);
setTimeout(function () { d.style.opacity = "0"; }, 4200);
setTimeout(function () { if (d.parentNode)
d.parentNode.removeChild(d); }, 5600);
},
function () {
if (PY.hud)
return;
var h = document.createElement("div");
h.id = "py-hud";
h.style.cssText = "position:fixed;left:12px;top:204px;z-index:44;display:none;background:rgba(10,10,16,.86);border:1px solid #E8A04A;border-radius:8px;padding:7px 10px;font:12.5px/1.45 var(--sans,system-ui);color:#F4EEE6;pointer-events:none;min-width:190px;max-width:min(260px,46vw)";
document.body.appendChild(h);
PY.hud = h;
var v = document.createElement("div");
v.id = "py-vig";
v.style.cssText = "position:fixed;inset:0;z-index:40;pointer-events:none;opacity:0;background:radial-gradient(ellipse at center,rgba(120,0,0,0) 55%,rgba(150,20,10,.8) 100%)";
document.body.appendChild(v);
PY.vig = v;
var dk = document.createElement("div");
dk.id = "py-dark";
dk.style.cssText = "position:fixed;inset:0;z-index:41;pointer-events:none;opacity:0;background:#0A0806";
document.body.appendChild(dk);
PY.dark = dk;
var L = document.createElement("div");
L.id = "py-lamps";
L.style.cssText = "position:fixed;left:50%;top:64px;transform:translateX(-50%);z-index:45;display:none;gap:10px;background:rgba(10,10,14,.85);padding:10px 14px;border-radius:12px;border:1px solid #5A5A64";
for (var i = 0; i < 5; i++) {
var b = document.createElement("div");
b.style.cssText = "width:30px;height:30px;border-radius:50%;background:#2A1414;border:2px solid #444;transition:background .25s";
L.appendChild(b);
}
document.body.appendChild(L);
PY.lampsEl = L;
},
function () {
pyHudBuild();
var on = PY.on && walkMode;
PY.hud.style.display = on ? "block" : "none";
if (!on) {
PY.vig.style.opacity = "0";
PY.dark.style.opacity = "0";
PY.lampsEl.style.display = "none";
pyPad(false);
return;
}
var M = PY.me, drv = pyDriving(), R = PY.race, html = "";
if (drv) {
var c = M.car, f = M.hp / M.max, col = f > 0.5 ? "#6AC85A" : f > 0.25 ? "#E8B84A" : "#D8604A", W = PY_OFF[c.off], D = PY_DEF[c.def];
var wf = 1 - M.cool / (W.cool || 1), df = 1 - M.dcool / (D.cool || 1);
html += "<div><b>" + esc(c.name) + "</b></div><div>🛡 Armour " + Math.ceil(M.hp) + " / " + M.max + "</div>" + pyBar(f, col) +
"<div>" + W.icon + " " + esc(W.name) + (M.cool > 0 ? " <span style='opacity:.7'>" + M.cool.toFixed(1) + "s</span>" : " <b style='color:#FFD27A'>ready</b>") + "</div>" + pyBar(wf, "#E8A04A") +
"<div>" + D.icon + " " + esc(D.name) + (M.dcool > 0 ? " <span style='opacity:.7'>" + M.dcool.toFixed(1) + "s</span>" : " <b style='color:#9AE0FF'>ready</b>") + "</div>" + pyBar(df, "#6AB8E8");
if (M.pick && typeof PY_PICK !== "undefined" && PY_PICK[M.pick.k])
html += "<div style='color:#FFD27A'>" + PY_PICK[M.pick.k].icon + " " + esc(PY_PICK[M.pick.k].name) + " ×" + M.pick.n + " <span style='opacity:.75'>(F fires it first)</span></div>";
var fx = [];
if (M.shield > 0)
fx.push("🫧 shielded");
if (M.plate > 0)
fx.push("🛡️ plated");
if (M.cloak > 0)
fx.push("🫥 cloaked");
if (M.phase > 0)
fx.push("🌫 phased");
if (M.mirror > 0)
fx.push("🪞 mirror");
if (M.ice > 0)
fx.push("🧊 frost armour");
if (M.stun > 0)
fx.push("<span style='color:#9ACFFF'>stunned</span>");
if (M.spin > 0)
fx.push("<span style='color:#E8D8A8'>spinning</span>");
if (M.slow > 0)
fx.push("<span style='color:#C8A8FF'>slowed</span>");
if (M.frozen > 0)
fx.push("<span style='color:#BFE8FF'>frozen</span>");
if (M.boost > 0)
fx.push("<span style='color:#FFD27A'>boost</span>");
if (fx.length)
html += "<div style='font-size:11.5px'>" + fx.join(" · ") + "</div>";
var PW = M.pow ? PY_POW[M.pow] : null;
html += "<div style='margin-top:2px'>" + (PW ? PW.icon + " <b style='color:#FFD27A'>" + esc(PW.name) + "</b> <span style='opacity:.7'>" + (pyTouch() ? "Power" : pyVR() ? "stick down" : "B") + "</span>" : "<span style='opacity:.6'>⚡ No power: drive through a cell</span>") + "</div>";
if (M.drift > 0.3)
html += pyBar(Math.min(1, M.drift / 1.6), M.drift >= 1.6 ? "#FFC83A" : M.drift >= 0.8 ? "#5AB8FF" : "#8A8A9A");
}
else
html += "<div><b>🏁 Pyreline</b></div><div style='opacity:.8'>On foot in " + esc((PY_ZONES[PY.zone] || PY_ZONES.paddock).name) + "</div>";
if (R && R.st !== "free") {
var ev = PY_EVENTS[R.ev];
html += "<div style='margin-top:4px;border-top:1px solid rgba(255,255,255,.15);padding-top:4px'><b>" + esc(ev.name) + "</b> · " + (R.st === "count" ? "watch the lamps" : pyFmt(R.t + (R.pen || 0))) + "</div>";
if (!R.trk)
R.trk = ev.sprint ? (function (w) { return "Track: " + w.from + " → " + w.to; })(pyTrackWords(R.ev)) : "Track: the whole Grand Loop";
html += "<div style='opacity:.8;font-size:12px'>" + esc(R.trk) + "</div>";
if (R.st === "on") {
if (R.sp)
html += "<div>Checkpoint " + R.cpi + " of " + R.sp.cps.length + " · " + (Math.max(0, R.sp.len - (R.myrun || 0)) / 1000).toFixed(1) + " km to go</div>";
else
html += "<div>Lap " + Math.min(R.laps, R.lap + 1) + " of " + R.laps + " · checkpoint " + R.cpi + " of " + PYT.cps.length + "</div>";
if (ev.rivals)
html += "<div>" + pyOrd(R.place || 1) + " of " + R.alive + " still running</div>";
if (ev.elim && R.alive > 1)
html += "<div style='color:" + (R.place === R.alive ? "#FF9A7A" : "#E8E0C8") + "'>⛔ Next knock-out in " + Math.max(0, Math.ceil(R.nextKo - R.t)) + "s" + (R.place === R.alive ? ": you are last!" : "") + "</div>";
}
if (R.kills)
html += "<div style='color:#FFD27A'>💥 Wrecked by you: " + R.kills + "</div>";
}
if (!pyTouch() && drv)
html += "<div style='opacity:.6;font-size:11px;margin-top:3px'>F fire · G defend · B power · Space slide (drift boost) · V view · Q out</div>";
if (PY.hud.dataset.h !== html) {
PY.hud.dataset.h = html;
PY.hud.innerHTML = html;
}
pyPad(pyTouch() && drv);
},
function (dt) {
PY.hurt = Math.max(0, (PY.hurt || 0) - dt * 0.45);
PY.hurtShow = (PY.hurtShow || 0) + (Math.min(0.6, PY.hurt) - (PY.hurtShow || 0)) * Math.min(1, dt * 3);
if (PY.vig)
PY.vig.style.opacity = String(Math.round(PY.hurtShow * 100) / 100);
if (PY.me.wreckT <= 0 && PY.fade > 0) {
PY.fade = Math.max(0, PY.fade - dt * 0.7);
if (PY.dark)
PY.dark.style.opacity = String(Math.round(PY.fade * 0.85 * 100) / 100);
}
},
function (on) {
if (!on) {
if (PY.pad)
PY.pad.style.display = "none";
return;
}
if (!PY.pad) {
var p = document.createElement("div");
p.id = "py-pad";
p.style.cssText = "position:fixed;right:calc(14px + env(safe-area-inset-right,0px));bottom:calc(330px + env(safe-area-inset-bottom,0px));z-index:46;display:flex;flex-direction:column;gap:8px;align-items:flex-end";
var mk = function (id, label, big) {
var b = document.createElement("button");
b.type = "button";
b.id = id;
b.textContent = label;
b.style.cssText = "min-width:" + (big ? 96 : 86) + "px;height:" + (big ? 58 : 42) + "px;border-radius:30px;border:1px solid #E8C66A;background:" + (big ? "rgba(201,140,40,.92)" : "rgba(20,16,8,.86)") + ";color:" + (big ? "#1A1208" : "#F4E2B0") + ";font:700 " + (big ? 16 : 14) + "px var(--sans,system-ui);touch-action:none;user-select:none;-webkit-user-select:none";
p.appendChild(b);
return b;
};
var df = mk("py-def", "🛡 Defend"), fi = mk("py-fire", "🔥 Fire", true), pw = mk("py-pow", "⚡ Power"), sl = mk("py-slide", "↯ Slide"), out = mk("py-out", "Get out");
var tap = function (b, fn) { var go = function (e) { e.preventDefault(); e.stopPropagation(); fn(); }; b.addEventListener("touchstart", go, { passive: false }); b.addEventListener("mousedown", go); };
tap(fi, function () { pyFireMe(); });
tap(df, function () { pyDefendMe(); });
tap(pw, function () { pyPowMe(); });
tap(out, function () { vehicleLeave(); });
var hold = function (on) { return function (e) { e.preventDefault(); e.stopPropagation(); if (typeof keys !== "undefined")
keys["Space"] = on; sl.style.background = on ? "rgba(90,184,255,.55)" : "rgba(20,16,8,.86)"; }; };
sl.addEventListener("touchstart", hold(true), { passive: false });
sl.addEventListener("touchend", hold(false), { passive: false });
sl.addEventListener("touchcancel", hold(false), { passive: false });
sl.addEventListener("mousedown", hold(true));
sl.addEventListener("mouseup", hold(false));
sl.addEventListener("mouseleave", function () { if (typeof keys !== "undefined" && keys["Space"]) {
keys["Space"] = false;
sl.style.background = "rgba(20,16,8,.86)";
} });
document.body.appendChild(p);
PY.pad = p;
}
PY.pad.style.display = "flex";
var short = innerHeight < 520, s = PY.pad.style;
s.flexDirection = short ? "row" : "column";
s.bottom = short ? "calc(22px + env(safe-area-inset-bottom,0px))" : "calc(330px + env(safe-area-inset-bottom,0px))";
s.right = short ? "calc(150px + env(safe-area-inset-right,0px))" : "calc(14px + env(safe-area-inset-right,0px))";
var pb = document.getElementById("py-pow");
if (pb) {
var has = !!PY.me.pow;
if (pb.dataset.on !== String(has)) {
pb.dataset.on = String(has);
pb.textContent = has ? PY_POW[PY.me.pow].icon + " " + PY_POW[PY.me.pow].name : "⚡ Power";
pb.style.background = has ? "rgba(232,180,60,.9)" : "rgba(20,16,8,.86)";
pb.style.color = has ? "#1A1208" : "#F4E2B0";
}
else if (has && pb.textContent.indexOf(PY_POW[PY.me.pow].name) < 0)
pb.dataset.on = "";
}
},
function (ev, carKey) {
var E = PY_EVENTS[ev];
if (!E)
return;
if (PY.race && PY.race.st !== "free" && PY.race.st !== "done")
return;
var car = pyCar(carKey);
if (!car)
return;
if (pyShopLeft(car.k) > 0) {
pySay("<b>The " + esc(car.name) + " is in the shop</b>, being restored after its wreck: back in " + pyShopMin(car.k) + " min. Take another car.", true);
return;
}
worldCard(null);
pyRaceClear();
pySlabsReset();
pyHazClear();
var sp = null;
if (E.sprint) {
var a0 = pyMainDistAt(E.sprint.from), b0 = E.sprint.to === null ? PYT.L : pyMainDistAt(E.sprint.to), len = b0 > a0 ? b0 - a0 : b0 + PYT.L - a0;
sp = { a: a0, b: b0 % PYT.L, len: len, cps: PYT.cps.filter(function (c) { var u = (c - a0 + PYT.L) % PYT.L; return u > 40 && u < len - 40; }) };
}
var base = sp ? sp.a : undefined;
var slot = E.rivals ? Math.min(5, E.rivals) : 0, G = pyGridSpot(slot, base);
pyGetIn(car.k, { x: G.x, z: G.z, h: G.h, y: G.y });
PY.me.y = G.y;
var R = PY.race = { ev: ev, st: "count", t: -5, laps: E.laps || 1, lap: 0, cpi: 0, place: 1, alive: E.rivals + 1, kills: 0, outs: [], pen: 0, lastCpD: G.d, prev: G.d, car: car.k, id: null, started: Date.now(), sp: sp, myrun: sp ? -G.back : 0, nextKo: E.elim || 0 };
if (sp)
sp.cps.sort(function (x, y) { return (x - sp.a + PYT.L) % PYT.L - (y - sp.a + PYT.L) % PYT.L; });
if (E.rivals) {
pyRivalsMake(E.rivals, !!E.arms, car);
var s = 0;
PY.riv.forEach(function (Rv) { if (s === slot)
s++; var g = pyGridSpot(s++, base); Rv.d = g.d; Rv.across = Rv.tAcross = g.across; Rv.i = sp ? undefined : Math.max(0, PYT.S.length - 30); Rv.run = sp ? -g.back : 0; Rv.goal = sp ? sp.len : 0; var A = pySampleAt(Rv); Rv.x = g.x; Rv.z = g.z; Rv.y = A.y; Rv.h = g.h; pyPose(Rv.g, PY.base + Rv.x, Rv.y, Rv.z, Rv.h, Rv.st, 0.016, 0, 0); });
}
if (typeof signedIn === "function" && signedIn() && !PY.missing)
cityRpc("race_planet_start", { p_ev: ev, p_car: car.k }).then(function (o) {
if (o && o.ok) {
R.id = o.id;
R.stake = +o.stake || 0;
if (R.stake > 0)
pyFeed("🪙 <b>Stake down: " + gold(R.stake) + ".</b> Cross the line in one piece and it comes back. Wreck and it is gone, and so is the car.", "#FFD27A");
}
else if (o && (o.short || o.shop) && PY.race === R) {
pyRaceClear();
worldCard(null);
pySay((o.short ? "<b>No stake, no race.</b> " : "") + esc(o.say), true);
}
else if (o && o.say && !/no such race/i.test(o.say))
pyFeed(esc(o.say), "#E8B84A");
}).catch(function (e) { if (rpcMissing(e))
PY.missing = true; });
pySay("<b>" + esc(E.name) + "</b> · Track: " + esc(pyTrackWords(ev).short) + ". " + esc(E.say) + (ev !== "trial" && car.k !== "gravelhound" ? " <b>Wreck and the " + esc(car.name) + " is totaled: towed to the shop, and a restoration bill in the post.</b>" : "") + " Watch the lamps: five reds, then green.", true);
},
function (n) {
var els = PY.lampsEl ? PY.lampsEl.children : [];
for (var i = 0; i < 5; i++) {
var col = n >= 6 ? "#2AC850" : (i < n ? "#D82A20" : "#2A1414");
if (els[i])
els[i].style.background = col;
if (PY.lamps && PY.lamps[i])
PY.lamps[i].material.color.setHex(n >= 6 ? 0x2AC850 : (i < n ? 0xD82A20 : 0x2A1414));
}
},
function (dt) {
var R = PY.race;
if (!R || R.st === "free")
return;
var E = PY_EVENTS[R.ev];
R.t += dt;
if (R.st === "count") {
DRIVE.v = 0;
PY.me.vx = PY.me.vz = 0;
PY.lampsEl.style.display = "flex";
var n = Math.floor(R.t + 5) + 1;
pyLamps(Math.min(5, n));
if (R.t >= 0) {
R.st = "on";
R.t = 0;
pyLamps(6);
pySay("<b>Green! Go!</b>", true);
setTimeout(function () { if (PY.lampsEl && (!PY.race || PY.race.st !== "count"))
PY.lampsEl.style.display = "none"; }, 2500);
}
return;
}
if (R.st !== "on")
return;
var P = camera.position, n2 = pyNear(P.x - PY.base, P.z, PY.me.y);
if (R.sp && n2 && pyDriving() && PY.me.wreckT <= 0) {
var d1 = n2.dist, dd = d1 - R.prev;
if (dd < -PYT.L / 2)
dd += PYT.L;
if (dd > PYT.L / 2)
dd -= PYT.L;
if (Math.abs(dd) < 250)
R.myrun += dd;
R.prev = d1;
var cp1 = R.sp.cps[R.cpi];
if (cp1 !== undefined) {
var u1 = (d1 - cp1 + PYT.L) % PYT.L;
if (u1 < 120 && R.myrun > ((cp1 - R.sp.a + PYT.L) % PYT.L) - 130) {
R.cpi++;
R.lastCpD = cp1;
pyFeed("✔ Checkpoint " + R.cpi + " of " + R.sp.cps.length, "#9AE8A0");
}
}
if (R.cpi >= R.sp.cps.length && R.myrun >= R.sp.len) {
pyRaceFinish();
return;
}
R.prog = R.myrun;
}
else if (n2 && pyDriving() && PY.me.wreckT <= 0) {
var d = n2.dist, cp = PYT.cps[R.cpi];
if (R.cpi < PYT.cps.length && d >= cp && d < cp + 120 && R.prev < cp + 120) {
R.cpi++;
R.lastCpD = cp;
if (R.cpi % 2 === 0 || R.cpi === PYT.cps.length)
pyFeed("✔ Checkpoint " + R.cpi + " of " + PYT.cps.length, "#9AE8A0");
}
if (R.cpi >= PYT.cps.length && R.prev > PYT.L - 300 && d < 120) {
R.lap++;
R.cpi = 0;
R.lastCpD = 0;
if (R.lap >= R.laps) {
pyRaceFinish();
return;
}
pyFeed("🏁 Lap " + (R.lap + 1) + " of " + R.laps, "#FFD27A");
}
R.prev = d;
R.prog = R.lap * PYT.L + (R.cpi === 0 && d > PYT.L / 2 ? d - PYT.L : d);
}
if (E.rivals) {
var mine = R.prog || 0, ahead = 0, alive = 1, lastR = null, lastP = 1e12;
PY.riv.forEach(function (Rv) { if (Rv.dead)
return; alive++; var pr = R.sp ? Rv.run : Rv.lap * PYT.L + Rv.d - (Rv.lap === 0 && Rv.d > PYT.L / 2 ? PYT.L : 0); if (Rv.done !== null || pr > mine)
ahead++; if (Rv.done === null && pr < lastP) {
lastP = pr;
lastR = Rv;
} });
R.place = 1 + ahead;
R.alive = alive;
if (E.elim && alive > 1 && !R.out) {
if (R.nextKo - R.t < 5 && R.nextKo - R.t > 0 && R.place === alive && !R.koWarn) {
R.koWarn = 1;
pySay("<b>You are last!</b> Pass someone before the knock-out.", true);
}
if (R.t >= R.nextKo) {
R.nextKo += E.elim;
R.koWarn = 0;
if (R.place === alive || !lastR) {
pyRaceOut("knocked out in last place");
return;
}
pyRivalKnockOut(lastR);
}
}
if (alive === 1 && !R.out && E.last && PY.riv.length) {
pyFeed("🏆 Last car standing!", "#FFD27A");
pyRaceFinish(true);
return;
}
}
if (R.t > ((E.laps || 1) * 600)) {
pyRaceOut("out of time");
}
},
function (why) {
var R = PY.race;
if (!R || R.st !== "on")
return;
if (R.ev === "trial")
return;
var k = R.car, c = pyCar(k);
if (k !== "gravelhound" && !(typeof amKeeper === "function" && amKeeper())) {
if (typeof signedIn === "function" && signedIn() && !PY.missing && R.id) {
R.wreckP = cityRpc("race_planet_wreck", { p_id: R.id }).then(function (o) { if (o && o.lost_car) {
R.lostCar = o.lost_car;
R.bill = o.bill || null;
pyFeed("🔥 <b>The " + esc(c.name) + " is totaled.</b> The tow truck takes it to the shop: back in 30 min." + (o.bill && o.bill.say ? " " + esc(o.bill.say) : ""), "#FF8A6A");
} PY.state = null; }).catch(function () { });
}
else {
var L = pyLocal();
if (L.owned.indexOf(k) >= 0) {
L.shop = L.shop || {};
L.shop[k] = Date.now() + PY_SHOP_MS;
R.lostCar = k;
pySave(true);
pyFeed("🔥 <b>The " + esc(c.name) + " is totaled.</b> The tow truck takes it to the shop: back in 30 min.", "#FF8A6A");
}
}
}
pyRaceOut(why);
},
function (why) {
var R = PY.race;
if (!R || R.out)
return;
R.out = why;
R.st = "out";
R.endT = R.t;
var alive = 1 + PY.riv.filter(function (Rv) { return !Rv.dead && Rv.done === null; }).length;
var fin = PY.riv.filter(function (Rv) { return Rv.done !== null; }).length;
R.final = fin + alive;
pySay("<b>You are out</b> (" + esc(why) + "). " + pyOrd(R.final) + " of " + (PY.riv.length + 1) + ".", true);
pyRaceSign();
},
function (last) {
var R = PY.race;
if (!R || R.st !== "on")
return;
R.st = "done";
R.endT = R.t;
var before = PY.riv.filter(function (Rv) { return Rv.done !== null; }).length;
R.final = last ? 1 : 1 + before;
pySay(R.final === 1 ? "<b>You win!</b> " + (last ? "The last car still running." : "First across the line.") + " " + pyFmt(R.t + (R.pen || 0)) : "<b>Across the line</b>, " + pyOrd(R.final) + ". " + pyFmt(R.t + (R.pen || 0)), true);
pyRaceSign();
},
function () {
var R = PY.race, E = PY_EVENTS[R.ev], secs = (R.endT || R.t) + (R.pen || 0), finished = R.st === "done";
var local = pyLocal(), ptsMap = [0, 100, 60, 40, 25, 18, 12, 8, 5];
var pts = E.rivals ? (finished ? (ptsMap[R.final] || 5) : Math.max(2, (ptsMap[R.final] || 5) >> 1)) + R.kills * 5 : (finished ? 20 : 0);
var rows = [["Event", E.name], ["Car", pyCar(R.car).name], ["Time", pyFmt(secs)], ["Place", (E.rivals ? pyOrd(R.final) + " of " + (PY.riv.length + 1) : finished ? "finished" : "out")], ["Wrecked by you", String(R.kills || 0)]];
if (R.out)
rows.push(["Out", R.out]);
var show = function (o) {
var r2 = rows.slice();
if (o) {
if (o.points !== undefined)
r2.push(["Race points", "+" + o.points + (o.season !== undefined ? " (season: " + o.season + ")" : "")]);
if (o.gold)
r2.push(["Purse", "+" + gold(o.gold)]);
if (o.stake > 0)
r2.push(["Stake", o.stake_back > 0 ? "back: +" + gold(o.stake_back) : "lost: " + gold(o.stake)]);
}
var lost = (o && o.lost_car) || R.lostCar, lc = lost ? pyCar(lost) : null;
if (lc) {
r2.push(["Car", "totaled: the " + lc.name + " is in the shop for 30 min"]);
if (R.bill && R.bill.gross)
r2.push(["Restoration", gold(R.bill.gross) + (R.bill.covered > 0 ? ", insurance pays " + gold(R.bill.covered) + ", you owe " + gold(R.bill.owed) : ", not insured: you owe it all")]);
}
var notes = [];
if (o && o.cars && o.cars.length)
notes.push("New in your garage: " + o.cars.map(function (k) { var c = pyCar(k); return c ? c.name : k; }).join(", ") + "!");
if (o && o.say)
notes.push(o.say);
if (!(typeof ageAdult === "function" && ageAdult()) && E.gold)
notes.push("A Death Run's purse goes to grown-ups who pay their dues; you still earn race points and the prize cars.");
worldCard(worldFacts(R.final === 1 && finished ? "You win!" : finished ? "Across the line" : "Out of the race", PY_NAME, r2, notes) + (lc ? "" : worldBtn("again", "Race again", "Back to the grid in the same car")) + worldBtn("garage", "The garage", "Choose another car") + worldBtn("free", "Drive free", "Roam the planet"), { again: function () { var ev = R.ev, k = R.car; pyRaceStart(ev, k); }, garage: function () { pyRaceClear(); pyGarageOpen(); }, free: function () { worldCard(null); pyRaceClear(); } });
};
local.races = (local.races || 0) + 1;
if (finished && R.final === 1 && R.ev === "death")
local.wins = (local.wins || 0) + 1;
if (finished && R.final <= 3 && R.ev === "death")
local.podiums = (local.podiums || 0) + 1;
if (finished) {
local.best = local.best || {};
if (!local.best[R.ev] || secs < local.best[R.ev])
local.best[R.ev] = +secs.toFixed(1);
}
var sn = pySeason();
if (local.sid !== sn) {
local.sid = sn;
local.spts = 0;
}
local.spts = (local.spts || 0) + pts;
pySave();
if (typeof signedIn === "function" && signedIn() && !PY.missing && R.id) {
(R.wreckP || Promise.resolve()).then(function () {
return cityRpc("race_planet_done", { p_id: R.id, p_place: R.final, p_of: PY.riv.length + 1, p_ms: Math.round(secs * 1000), p_kills: R.kills || 0, p_finished: finished })
.then(function (o) { if (o && o.ok) {
PY.state = null;
pyStateLoad(true);
show(o);
}
else
show({ points: 0, say: (o && o.say) || "The steward could not sign that." }); })
.catch(function (e) { if (rpcMissing(e))
PY.missing = true; show({ points: pts, say: "Kept in this browser for now." }); });
});
}
else
show({ points: pts, season: local.spts });
if (PY.missing || !(typeof signedIn === "function" && signedIn()))
pyLocalPrizes();
},
function (force) {
if (!force && PY.state && Date.now() - PY.stateAt < 30000)
return Promise.resolve(PY.state);
if (PY.missing || !(typeof signedIn === "function" && signedIn()))
return Promise.resolve(null);
return cityRpc("race_planet_state", {}).then(function (o) { if (o && o.ok) {
PY.state = o;
PY.stateAt = Date.now();
} return PY.state; })
.catch(function (e) { if (rpcMissing(e))
PY.missing = true; return null; });
},
function () {
var S = PY.state, own = {};
if (typeof amKeeper === "function" && amKeeper()) {
PY_CARS.forEach(function (c) { own[c.k] = 1; });
return own;
}
own.gravelhound = own.gravelhound || 0;
(S && Array.isArray(S.cars) ? S.cars : []).forEach(function (k) { own[k] = 1; });
if (!S)
pyLocal().owned.forEach(function (k) { own[k] = 1; });
return own;
},
function () {
var L = pyLocal(), st = pyStats(), got = [];
PY_CARS.forEach(function (c) {
if (L.owned.indexOf(c.k) >= 0)
return;
var ok = false;
if (c.how === "prize") {
var P = PY_PRIZE[c.what];
ok = P && ((P.wins && st.wins >= P.wins) || (P.podiums && st.podiums >= P.podiums));
}
if (c.how === "season")
ok = st.spts >= c.what;
if (ok) {
L.owned.push(c.k);
got.push(c.name);
}
});
if (got.length) {
pySave(true);
pyFeed("🏆 New in your garage: " + esc(got.join(", ")), "#FFD27A");
}
},
function (dt) {
var N = PY.net, drv = pyDriving();
var others = (typeof presenceOthers !== "undefined") && Object.keys(presenceOthers).length > 0;
if (drv && others && PY.t - (N.sentAt || 0) > 0.5) {
N.sentAt = PY.t;
var M = PY.me, P = camera.position;
pyNetSend({ t: "pos", k: M.car.k, x: +(P.x - PY.base).toFixed(1), z: +P.z.toFixed(1), y: +M.y.toFixed(1), h: +DRIVE.h.toFixed(3), v: +DRIVE.v.toFixed(1), vx: +M.vx.toFixed(1), vz: +M.vz.toFixed(1),
hp: Math.round(M.hp), mx: M.max, f: (M.shield > 0 ? "s" : "") + (M.cloak > 0 ? "c" : "") + (M.phase > 0 ? "p" : "") + (M.mirror > 0 ? "m" : "") + (M.air ? "a" : "") + (M.plate > 0 ? "l" : "") });
}
if (N.pend && PY.t - (N.flushAt || 0) > 0.5) {
N.flushAt = PY.t;
var P2 = N.pend;
N.pend = null;
Object.keys(P2).forEach(function (id) { pyNetSend({ t: "hit", d: Math.min(80, Math.round(P2[id].d)), how: P2[id].how }, id); });
}
if (!N.busy && !N.missing && PY.t - (N.at || 0) > (others ? 0.6 : 3) && typeof signedIn === "function" && signedIn()) {
N.busy = true;
N.at = PY.t;
cityRpc("live_poll", { p_since: N.since, p_place: "world:race" }).then(function (o) {
if (!o || !o.ok)
return;
var first = !N.since;
N.since = Math.max(N.since, +o.top || 0);
if (first)
return;
(o.rows || []).forEach(function (r) { if (r.kind !== "race" || !r.body)
return; pyNetGot(r); });
}).catch(function (e) { if (rpcMissing(e))
N.missing = true; }).then(function () { N.busy = false; });
}
for (var id in PY.ghosts) {
var G = PY.ghosts[id];
if (PY.t - G.seen > 6 || G.gone) {
if (G.g)
pyGone(G.g);
delete PY.ghosts[id];
continue;
}
var age = Math.min(1.2, PY.t - G.seen);
G.x = G.bx + G.vx * age;
G.z = G.bz + G.vz * age;
G.dx = (G.dx === undefined ? G.x : G.dx + (G.x - G.dx) * Math.min(1, dt * 6));
G.dz = (G.dz === undefined ? G.z : G.dz + (G.z - G.dz) * Math.min(1, dt * 6));
pyTimersTick(G.st, dt);
if (G.g) {
pyPose(G.g, PY.base + G.dx, G.y, G.dz, G.h, G.st, dt, G.v, 0);
var hid = G.st.cloak > 0;
G.g.children.forEach(function (ch) { if (ch !== G.g.userData.bub && ch !== G.tag)
ch.visible = !hid; });
}
}
},
function (r) {
var b = r.body, me = (typeof session !== "undefined" && session && session.user) ? session.user.id : null;
if (r.from === me)
return;
if (b.t === "pos") {
var c = pyCar(b.k);
if (!c)
return;
var G = PY.ghosts[r.from];
if (!G || G.car.k !== c.k) {
if (G && G.g)
pyGone(G.g);
var g = pyBuildCar(c, { lite: true });
scene.add(g);
var tag = null;
try {
tag = makeTag(r.name || "a dreamer", false);
tag.position.y = 2.9;
g.add(tag);
}
catch (e) { }
G = PY.ghosts[r.from] = { id: r.from, ghost: true, name: r.name || "a dreamer", car: c, g: g, tag: tag, st: { hp: 100, max: 100 } };
}
G.bx = b.x;
G.bz = b.z;
G.y = b.y;
G.h = b.h;
G.v = b.v;
G.vx = b.vx || 0;
G.vz = b.vz || 0;
G.seen = PY.t;
G.x = b.x;
G.z = b.z;
G.st.hp = b.hp;
G.st.max = b.mx;
var f = b.f || "";
G.st.shield = f.indexOf("s") >= 0 ? 1 : 0;
G.st.cloak = f.indexOf("c") >= 0 ? 1 : 0;
G.st.phase = f.indexOf("p") >= 0 ? 1 : 0;
G.st.mirror = f.indexOf("m") >= 0 ? 1 : 0;
G.st.air = f.indexOf("a") >= 0;
G.st.plate = f.indexOf("l") >= 0 ? 1 : 0;
}
else if (b.t === "fire") {
var G2 = PY.ghosts[r.from];
if (!G2)
return;
var W = PY_OFF[b.w];
if (!W)
return;
var a = { id: r.from, x: b.x, y: G2.y, z: b.z, h: b.h, v: G2.v, st: {}, car: G2.car, ghost: true };
if (W.kind === "drop")
pyDrop({ kind: W.drop, x: b.x + Math.sin(b.h) * 4, z: b.z + Math.cos(b.h) * 4, y: pyGround(b.x, b.z, G2.y + 1), life: W.life, owner: r.from, dmg: W.dmg || 0, arm: 0.6, remote: 1 });
else if (W.kind === "beam")
pyBeam(a, { x: b.x - Math.sin(b.h) * W.reach, y: G2.y + 1, z: b.z - Math.cos(b.h) * W.reach }, W.col, b.w);
else if (W.kind === "aura" && b.w !== "saw")
pyRing(b.x, G2.y + 0.6, b.z, W.reach, W.col);
}
else if (b.t === "pow") {
pyPowNetGot(r, b);
}
else if (b.t === "hit") {
if (!pyDriving())
return;
var G3 = PY.ghosts[r.from];
pyHurt(Math.max(0, Math.min(80, +b.d || 0)), { how: (r.name || "a dreamer") + "'s " + (b.how || "weapons"), shot: 1, by: r.from });
if (PY.me.hp <= 0)
pyNetSend({ t: "down" }, r.from);
}
else if (b.t === "fx") {
if (!pyDriving())
return;
if (b.w === "push")
PY.me.push = { x: +b.x || 0, z: +b.z || 0 };
else if (/^(stun|slow|spin|frozen)$/.test(b.w))
pyAffect(pyMeActor(), b.w, Math.min(4, +b.s || 1));
}
else if (b.t === "down") {
pyFeed("💥 You wrecked " + esc(r.name || "a dreamer"), "#FFD27A");
if (PY.race)
PY.race.kills = (PY.race.kills || 0) + 1;
}
else if (b.t === "wreck") {
var G4 = PY.ghosts[r.from];
if (G4) {
pySmokeBig(G4.x, G4.y + 1, G4.z);
G4.gone = true;
}
}
},
function () {
if (pyDriving()) {
vehicleEnd();
rideArch = null;
try {
var L = meLook();
L.ride = null;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
}
if (typeof rideG !== "undefined" && rideG && rideG.userData.pyCar) {
pyGone(rideG);
rideG = null;
}
pyRaceClear();
pyPad(false);
var P = camera.position;
P.x = PY.base + PY_ARRIVE.x;
P.z = PY_ARRIVE.z;
P.y = 1.72 + 0.35;
yaw = PY_ARRIVE.yaw;
if (PY.dark)
PY.dark.style.opacity = "0";
setStatus("The recovery truck tows what is left of your car back to the Redline Paddock. It will be mended in the Motorworks by your next race.");
},
function (c, own) {
if (own && pyShopLeft(c.k) > 0)
return "<span style='color:#FFB07A'>🔧 Totaled: in the shop, back in " + pyShopMin(c.k) + " min</span>";
if (own)
return "<span style='color:#9AE8A0'>✔ In your garage</span>";
if (c.how === "buy" && typeof riCouponFor === "function" && riCouponFor(c.k))
return "<span style='color:#FFD27A'>🎟️ Free with your starter-car coupon</span> <s style='opacity:.6'>" + gold(c.what) + "</s>";
if (c.how === "buy")
return "💰 " + gold(c.what);
if (c.how === "prize")
return "🏆 " + esc(PY_PRIZE[c.what].say);
if (c.how === "season")
return "🗓 " + c.what.toLocaleString() + " race points in one season";
if (c.how === "craft")
return "🔧 " + Object.keys(c.what).map(function (k) { return c.what[k] + " " + (PY_MATS[k] || k).toLowerCase(); }).join(", ");
if (c.how === "find") {
var F = PY_FINDS[c.what];
return "🔎 A lost car, " + esc(F.world ? (F.world === "battle" ? "somewhere in Ironfray" : "somewhere in Somnucor") : "somewhere on Pyreline");
}
return "";
},
function (tab) {
pyStateLoad(false).then(function () { return typeof riCouponsLoad === "function" ? riCouponsLoad(false) : null; }).then(function () {
var own = pyOwned(), st = pyStats(), T = tab || PY.gTab || "buy";
PY.gTab = T;
var tabs = [["buy", "Showroom"], ["prize", "Race prizes"], ["craft", "Build bay"], ["find", "Lost cars"], ["season", "Season"], ["mine", "Your garage"]];
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Pyreline Motorworks</div><div style='opacity:.8;margin-bottom:6px'>Fifty cars, every one armed. Wins " + st.wins + " · podiums " + st.podiums + " · season (" + esc(pySeasonName()) + ") " + st.spts.toLocaleString() + " points</div>";
h += "<div style='display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px'>" + tabs.map(function (t) { return "<span data-w='t_" + t[0] + "' role='button' tabindex='0' style='padding:3px 8px;border-radius:12px;border:1px solid rgba(232,198,106,.6);font-size:12px;" + (t[0] === T ? "background:rgba(232,198,106,.85);color:#1A1208" : "") + "'>" + t[1] + "</span>"; }).join("") + "</div>";
var list = PY_CARS.filter(function (c) { return T === "mine" ? own[c.k] : c.how === T; });
if ((RI.coupons || 0) > 0)
h += "<div style='margin:2px 0 6px;padding:5px 8px;border:1px solid rgba(255,190,90,.6);border-radius:5px;background:rgba(255,160,60,.1);font-size:12.5px'>🎟️ You hold " + (RI.coupons > 1 ? RI.coupons + " starter-car coupons" : "a starter-car coupon") + ": the Slickjaw, the Pinwheel, the Ember Wasp or the Rust Wraith is yours free. Choose one on the Showroom floor.</div>";
if (T === "mine" && !list.length)
h += "<div style='opacity:.8'>Nothing yet: the Motorworks lends you the Gravelhound until you have a car of your own.</div>";
if (T === "find")
h += "<div style='opacity:.8;font-size:12px;margin-bottom:4px'>Eight lost cars, each lying somewhere hard to reach. Find one, press E beside it, and it is yours.</div>";
if (T === "craft")
h += "<div style='opacity:.8;font-size:12px;margin-bottom:4px'>Built here in the build bay from what is in your stock. Materials come from the forges, Ironfray and the garage counters.</div>";
list.forEach(function (c) {
var W = PY_OFF[c.off], D = PY_DEF[c.def], o = !!own[c.k];
h += "<div data-w='c_" + c.k + "' role='button' tabindex='0' style='margin:5px 0;padding:6px 9px;border:1px solid rgba(232,160,74,.45);border-radius:5px;background:rgba(232,160,74,.06)'>" +
"<b>" + esc(c.name) + "</b> <span style='opacity:.7;font-size:12px'>· " + esc(c.maker) + "</span><div style='font-size:12px'>" + pyKmh(c.top) + " km/h · armour " + c.hp + " · " + W.icon + " " + esc(W.name) + " · " + D.icon + " " + esc(D.name) + "</div>" +
"<div style='font-size:12px'>" + pyHowLine(c, o) + "</div></div>";
});
h += worldBtn("code", "🎟️ I have a code", "A Death Races invite code: the club's pass to race, and a free starter car");
var fns = { code: function () { worldCard(null); riOpen(); } };
tabs.forEach(function (t) { fns["t_" + t[0]] = function () { pyGarageOpen(t[0]); }; });
PY_CARS.forEach(function (c) { fns["c_" + c.k] = function () { pyCarCard(c.k); }; });
worldCard(h, fns);
});
},
function (k) {
var c = pyCar(k);
if (!c)
return;
var own = pyOwned()[k], W = PY_OFF[c.off], D = PY_DEF[c.def], st = pyStats();
pyShowcase(k);
var rows = [["Maker", c.maker], ["Body", { wedge: "low wedge supercar", muscle: "muscle car", buggy: "open dune buggy", monster: "monster truck", hover: "hover car", needle: "open-wheel single seater", hearse: "long black hearse", sixer: "six-wheeler", roadster: "open roadster", bubble: "round little brawler", van: "armoured van", trike: "three-wheeler" }[c.style]],
["Top speed", pyKmh(c.top) + " km/h"], ["Pick-up", ["", "", "", "", "", "", "", "", "", "sluggish", "steady", "brisk", "quick", "sharp", "fierce", "savage", "explosive"][c.acc] || c.acc], ["Grip", Math.round(c.grip * 100) + "%"], ["Armour", String(c.hp)],
["Weapon", W.icon + " " + W.name + ": " + W.say], ["Defence", D.icon + " " + D.name + ": " + D.say], ["How to get it", PY_HOW[c.how]]];
var b = "", fns = { back: function () { pyGarageOpen(); } };
if (own) {
b += worldBtn("drive", "Take it out", "Onto the paddock's apron, ready to drive") + worldBtn("race", "Race it", "Death Run, Pure Speed or a Time Trial");
fns.drive = function () { worldCard(null); pyTakeOut(k); };
fns.race = function () { pyRaceDesk(k); };
}
else if (c.how === "buy" && typeof riCouponFor === "function" && riCouponFor(k)) {
b += worldBtn("coupon", "🎟️ Take it free with my coupon", "Your starter-car coupon pays for it in full; the car is yours for good");
fns.coupon = function () { riUseCoupon(k); };
b += worldBtn("buy", "Or buy it: " + gold(c.what), "Paid from your purse, and keep the coupon for another starter car");
fns.buy = function () { pyBuy(k); };
}
else if (c.how === "buy") {
b += worldBtn("buy", "Buy it: " + gold(c.what), "Paid from your purse; the car is yours for good");
fns.buy = function () { pyBuy(k); };
}
else if (c.how === "craft") {
b += worldBtn("craft", "Build it", "Uses " + pyHowLine(c, false).replace("🔧 ", "") + " from your stock");
fns.craft = function () { pyCraft(k); };
}
else if (c.how === "prize") {
var P = PY_PRIZE[c.what], have = P.wins ? st.wins : st.podiums, need = P.wins || P.podiums;
b += "<div style='margin:6px 0;font-size:12.5px'>" + esc(P.say) + ": " + Math.min(have, need) + " of " + need + " so far.</div>";
if (have >= need) {
b += worldBtn("claim", "Claim it", "You have earned it");
fns.claim = function () { pyClaim(k); };
}
}
else if (c.how === "season") {
b += "<div style='margin:6px 0;font-size:12.5px'>" + c.what.toLocaleString() + " race points in " + esc(pySeasonName()) + ": you have " + st.spts.toLocaleString() + ".</div>";
if (st.spts >= c.what) {
b += worldBtn("claim", "Claim it", "You have earned it this season");
fns.claim = function () { pyClaim(k); };
}
}
else if (c.how === "find") {
var F = PY_FINDS[c.what];
b += "<div style='margin:6px 0;font-size:12.5px;opacity:.85'>Rumour in the paddock: " + esc(pyFindRumour(c.what)) + "</div>";
}
b += worldBtn("back", "Back to the Motorworks", "");
worldCard(worldFacts(c.name, c.blurb, rows, []) + b, fns);
},
function (k) {
return { slotcave: "the canyon keeps an old secret where the rock closes in overhead.", icearch: "cold hands hold something past the frozen lake; look up and to the side, never on the road.",
fallenspan: "one rail of the Skyway is down, and something waits below it for anyone brave enough to leave the road.",
lavatube: "there is a tunnel under the caldera that glows, and its walls are not all rock.", waterfall: "the Mirewild's falls hide more than water.",
windfarm: "the Bluffs' farmers buried something they did not want found, far from any road, where the turbines hum loudest.",
ironfray: "a war car was left in the Glass Crater of Ironfray, the battle world.", wilds: "a black hearse is half sunk in the Nightmare Wilds of Somnucor, past the War Gate.",
snarlpit: "something huge sleeps under the Snarl's scrap, well away from the streets. You will have to dig." }[k] || "nobody knows.";
},
function (what) {
if (!(typeof signedIn === "function" && signedIn())) {
pySay("Sign in first: your cars are kept against your account.");
return false;
}
if (PY.missing) {
pySay("<b>The Motorworks' order book opens soon.</b> (The planet's records need the next update on the server.)");
return false;
}
return true;
},
function (k) {
var c = pyCar(k);
if (!c)
return;
var L = pyLocal();
if (L.finds.indexOf(c.what) < 0)
L.finds.push(c.what);
var keep = function () { if (L.owned.indexOf(k) < 0)
L.owned.push(k); pySave(true); };
pySoft(camera.position.x - PY.base, camera.position.y, camera.position.z, 0xFFE0A0, 4, 1.4);
if (typeof signedIn === "function" && signedIn() && !PY.missing) {
cityRpc("race_planet_find", { p_car: k }).then(function (o) {
if (o && o.ok) {
PY.state = null;
pyStateLoad(true);
pySay("<b>You found the " + esc(c.name) + "!</b> " + esc(o.say || "It is in your garage at Pyreline Motorworks.") + " It shows in your 🎒 Backpack too.", true);
}
else
pySay(esc((o && o.say) || "It would not come loose. Try again in a moment."), true);
})
.catch(function (e) {
if (rpcMissing(e)) {
PY.missing = true;
keep();
pySay("<b>You found the " + esc(c.name) + "!</b> It is in your garage at Pyreline Motorworks.", true);
}
else
pySay("The " + esc(c.name) + " could not be claimed just now. Try again in a moment.", true);
});
}
else {
keep();
pySay("<b>You found the " + esc(c.name) + "!</b> It is in your garage at Pyreline Motorworks" + (signedIn() ? "" : " (in this browser: sign in to keep it for good)") + ".", true);
}
},
function (k) {
pyStateLoad(false).then(function () {
var own = pyOwned();
Object.keys(own).forEach(function (q) { if (pyShopLeft(q) > 0)
delete own[q]; });
var car = k && own[k] ? k : (PY.lastCar && own[PY.lastCar] ? PY.lastCar : Object.keys(own)[0] || "gravelhound");
var c = pyCar(car), st = pyStats();
var h = worldFacts("Race Control", "The Grand Loop · " + Math.round(PYT.L / 100) / 10 + " km a lap, eleven climates", [["Your car", c.name], ["Wins", String(st.wins)], ["Podiums", String(st.podiums)], ["Season", st.spts.toLocaleString() + " points (" + pySeasonName() + ")"]], ["A wrecked car is out. First across the line wins, or the last car still running.", "Passes and tunnels are hidden all round the loop; every checkpoint must still be passed.",
"Power cells glow over the road: drive through one to carry its power (B, the Power button, or the headset's right stick down).",
"Every car can drift-boost (hold the slide through a bend, then let go), slipstream (tuck in behind a car) and get a burst from a clean landing."]);
h += "<div style='margin:8px 0 2px;font-weight:700;color:#FFD27A'>The whole loop</div>";
Object.keys(PY_EVENTS).forEach(function (ev) { var E = PY_EVENTS[ev]; if (E.sprint)
return; h += worldBtn("ev_" + ev, E.name, "🏁 Track: " + pyTrackWords(ev).short); });
h += "<div style='margin:8px 0 2px;font-weight:700;color:#3AFFC0'>Sprints: one stretch of the road</div>";
Object.keys(PY_EVENTS).forEach(function (ev) { var E = PY_EVENTS[ev]; if (!E.sprint)
return; h += worldBtn("ev_" + ev, E.name, "🏁 Track: " + pyTrackWords(ev).short); });
h += worldBtn("car", "Another car", "Choose from your garage");
var fns = { car: function () { pyGarageOpen("mine"); } };
Object.keys(PY_EVENTS).forEach(function (ev) { fns["ev_" + ev] = function () { pyTrackCard(ev, car); }; });
worldCard(h, fns);
});
},
function (ev) {
var E = PY_EVENTS[ev], T = pyTrackSpan(ev), S = PYT.S;
if (!T || !S.length)
return { short: "the Grand Loop", zones: [], from: "", to: "" };
var zones = [], n = S.length, i0 = pyTrackIdx(T.a), cnt = pyTrackCount(i0, T.len);
for (var k = 0; k <= cnt; k++) {
var s = S[(i0 + k) % n];
var z = PY_ZONES[s.zone];
var nm = z ? z.name : "";
if (nm && zones[zones.length - 1] !== nm)
zones.push(nm);
}
if (!T.whole && zones.length > 2 && zones[0] === PY_ZONES.paddock.name)
zones.shift();
var km = (T.len / 1000).toFixed(1), from = zones[0] || "the paddock", to = zones[zones.length - 1] || from;
var short = T.whole ? "the whole Grand Loop, " + (E.laps || 1) + " lap" + ((E.laps || 1) > 1 ? "s" : "") + " of " + km + " km, start and finish at the Redline Paddock"
: "the Grand Loop from " + from + " to " + to + " · " + km + " km, one way";
return { short: short, zones: zones, from: from, to: to, km: km };
},
function (ev) {
var S = PYT.S, T = pyTrackSpan(ev);
if (!S.length || !T)
return "";
var x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
S.forEach(function (s) { x0 = Math.min(x0, s.x); x1 = Math.max(x1, s.x); z0 = Math.min(z0, s.z); z1 = Math.max(z1, s.z); });
var W = 320, H = 220, pad = 14, sc = Math.min((W - pad * 2) / (x1 - x0 || 1), (H - pad * 2) / (z1 - z0 || 1)), ox = (W - (x1 - x0) * sc) / 2, oz = (H - (z1 - z0) * sc) / 2;
function X(s) { return ox + (s.x - x0) * sc; }
function Z(s) { return oz + (s.z - z0) * sc; }
var cv = document.createElement("canvas");
cv.width = W * 2;
cv.height = H * 2;
var x = cv.getContext("2d");
x.scale(2, 2);
x.fillStyle = "#14161C";
x.fillRect(0, 0, W, H);
x.lineJoin = x.lineCap = "round";
x.strokeStyle = "rgba(255,255,255,.22)";
x.lineWidth = 3;
x.beginPath();
S.forEach(function (s, i) { if (i)
x.lineTo(X(s), Z(s));
else
x.moveTo(X(s), Z(s)); });
x.closePath();
x.stroke();
var n = S.length, i0 = pyTrackIdx(T.a), cnt = T.whole ? n : pyTrackCount(i0, T.len);
x.strokeStyle = "#FFB43A";
x.lineWidth = 5;
x.beginPath();
for (var k = 0; k <= cnt; k++) {
var s = S[(i0 + k) % n];
if (k)
x.lineTo(X(s), Z(s));
else
x.moveTo(X(s), Z(s));
}
x.stroke();
var a = S[i0 % n], b = S[(i0 + cnt) % n];
function dot(s, col, txt) {
x.fillStyle = col;
x.beginPath();
x.arc(X(s), Z(s), 6, 0, 7);
x.fill();
x.strokeStyle = "#000";
x.lineWidth = 1.5;
x.stroke();
x.font = "bold 11px sans-serif";
x.fillStyle = "#fff";
x.strokeStyle = "rgba(0,0,0,.8)";
x.lineWidth = 3;
var tx = Math.min(W - 60, Math.max(4, X(s) + 8)), ty = Math.min(H - 4, Math.max(12, Z(s) - 8));
x.strokeText(txt, tx, ty);
x.fillText(txt, tx, ty);
}
var p = S[(i0 + Math.max(3, Math.round(cnt * 0.06))) % n];
x.save();
x.translate(X(p), Z(p));
x.rotate(Math.atan2(p.tz, p.tx));
x.fillStyle = "#FFE08A";
x.beginPath();
x.moveTo(8, 0);
x.lineTo(-5, -5);
x.lineTo(-5, 5);
x.closePath();
x.fill();
x.restore();
if (T.whole)
dot(a, "#3AFF8A", "START / FINISH");
else {
dot(b, "#FF5A5A", "FINISH");
dot(a, "#3AFF8A", "START");
}
return "<img alt='Track map' src='" + cv.toDataURL("image/png") + "' style='display:block;width:100%;max-width:320px;margin:6px auto;border-radius:8px;border:1px solid rgba(255,255,255,.15)'>";
},
function (ev, car) {
var E = PY_EVENTS[ev], w = pyTrackWords(ev), c = pyCar(car);
if (!E)
return;
var h = worldFacts(E.name, "Track: " + (E.sprint ? "a stretch of the Grand Loop" : "the Grand Loop"), [["Track", w.short], ["Runs through", w.zones.join(" → ")], ["Rivals", E.rivals ? E.rivals + (E.arms ? ", armed" : ", no weapons") : "none: you against the clock"], ["Your car", c ? c.name : ""]], [E.say]);
try {
h += pyTrackMap(ev);
}
catch (e) { }
h += worldBtn("go", "Race on this track", "Line up on the grid");
h += worldBtn("back", "Pick another race", "Back to Race Control");
worldCard(h, { go: function () { PY.lastCar = car; pyRaceStart(ev, car); }, back: function () { pyRaceDesk(car); } });
},
function (G, x0, z0, x1, z1, h, mat, doors, th) {
th = th || 0.3;
doors = (doors || []).slice().sort(function (a, b) { return a[0] - b[0]; });
var len = Math.hypot(x1 - x0, z1 - z0), ux = (x1 - x0) / len, uz = (z1 - z0) / len, rot = Math.atan2(ux, uz) + Math.PI / 2, at = 0, segs = [];
doors.forEach(function (d) { if (d[0] > at)
segs.push([at, d[0]]); at = d[1]; });
if (at < len)
segs.push([at, len]);
segs.forEach(function (sg) {
var l = sg[1] - sg[0];
if (l < 0.05)
return;
var c = (sg[0] + sg[1]) / 2;
pyBox(G, l, h, th, mat, x0 + ux * c, h / 2, z0 + uz * c, true, rot);
});
doors.forEach(function (d) { var l = d[1] - d[0], c = (d[0] + d[1]) / 2; if (h > 3.2)
pyBox(G, l, h - 3.2, th, mat, x0 + ux * c, 3.2 + (h - 3.2) / 2, z0 + uz * c, false, rot); });
},
function (G, seed, title, x, z, face, talk) {
var p = null;
try {
p = wPerson(seed, { title: title, place: PY_KEY });
}
catch (e) {
p = null;
}
if (!p)
return null;
p.position.set(x, 0, z);
p.rotation.y = face || 0;
G.add(p);
if (talk)
(PY.talk || (PY.talk = [])).push({ x: x, z: z, r: 3, name: talk.name, title: title, persona: talk.persona, greet: talk.greet, g: p });
return p;
},
function () {
if (PY.tex.map)
return PY.tex.map;
PY.tex.map = wTex(512, 512, function (x, W, H) {
x.fillStyle = "#0E1018";
x.fillRect(0, 0, W, H);
var B = PYT.bounds, sx = function (v) { return 30 + (v - B.x0) / (B.x1 - B.x0) * (W - 60); }, sz = function (v) { return 30 + (v - B.z0) / (B.z1 - B.z0) * (H - 60); };
var cols = { paddock: "#C8C8D0", canyon: "#E8A060", tundra: "#E8F0F8", ice: "#8AC8F0", sky: "#E05AE0", lava: "#FF6A2A", jungle: "#5AC85A", storm: "#8A98A8", dunes: "#F0C070", cave: "#9A7AFF", coast: "#3AC8E8" };
x.lineWidth = 7;
x.lineCap = "round";
PYT.S.forEach(function (s, i) { var n = PYT.S[(i + 1) % PYT.S.length]; x.strokeStyle = cols[s.zone]; x.beginPath(); x.moveTo(sx(s.x), sz(s.z)); x.lineTo(sx(n.x), sz(n.z)); x.stroke(); });
x.setLineDash([4, 6]);
x.lineWidth = 3;
x.strokeStyle = "#FFE08A";
PY_CUTS.forEach(function (C) { x.beginPath(); C.pts.forEach(function (p, i) { if (i)
x.lineTo(sx(p[0]), sz(p[1]));
else
x.moveTo(sx(p[0]), sz(p[1])); }); x.stroke(); });
x.setLineDash([]);
x.fillStyle = "#FFFFFF";
x.font = "bold 22px Arial";
x.textAlign = "center";
x.fillText("THE GRAND LOOP", W / 2, 24);
x.fillStyle = "#F0F0F0";
x.beginPath();
x.arc(sx(0), sz(150), 7, 0, 7);
x.fill();
});
return PY.tex.map;
},
function (G) {
var L = PY.lite;
var conc = pyStd(0x6A6660, "concrete", 8, 8);
conc.userData.realKind = "rubber";
conc.userData.pySw = 0xB8B4AC;
var dark = pyStd(0x2A2C32, "metal", 2, 2, { m: 0.4, r: 0.5 }), white = pyStd(0xE8E6E0, "concrete", 2, 2), red = pyStd(0xB82A20, null);
var ap = new THREE.Mesh(new THREE.PlaneGeometry(200, 280), conc);
ap.rotation.x = -Math.PI / 2;
ap.position.set(55, -0.02, 95);
ap.receiveShadow = true;
ap.raycast = function () { };
G.add(ap);
var pad = new THREE.Mesh(new THREE.CylinderGeometry(13, 14, 0.4, L ? 20 : 40), pyStd(0x5A5E66, "metal", 3, 3, { m: 0.5, r: 0.45 }));
pad.position.set(PY_ARRIVE.x, 0.15, PY_ARRIVE.z + 4);
G.add(pad);
var ring = new THREE.Mesh(new THREE.RingGeometry(10, 11, L ? 24 : 48), pyMat("glow", 0xFF8A3A));
ring.rotation.x = -Math.PI / 2;
ring.position.set(PY_ARRIVE.x, 0.37, PY_ARRIVE.z + 4);
G.add(ring);
var sg = wSign(["PYRELINE", "The race planet · Redline Paddock", "A wrecked car is out"], 12, 4, "#1A0E0A", "#FFB060");
sg.position.set(PY_ARRIVE.x, 5, PY_ARRIVE.z + 20);
sg.rotation.y = Math.PI;
G.add(sg);
pyBox(G, 0.4, 7, 0.4, dark, PY_ARRIVE.x - 6.2, 3.5, PY_ARRIVE.z + 20.2, true);
pyBox(G, 0.4, 7, 0.4, dark, PY_ARRIVE.x + 6.2, 3.5, PY_ARRIVE.z + 20.2, true);
var S0 = PYT.S[0], gz = S0.z;
[-1, 1].forEach(function (s) { pyBox(G, 1.6, 11, 1.6, dark, s * 12.5, 5.5, gz, true); });
pyBox(G, 26.6, 1.6, 1.4, dark, 0, 10.4, gz);
var ban = wSign(["PYRELINE GRAND LOOP", "Start · Finish"], 14, 2.4, "#141414", "#F0F0F0");
ban.position.set(0, 12.6, gz + 0.75);
G.add(ban);
var ban2 = ban.clone();
ban2.position.z = gz - 0.75;
ban2.rotation.y = Math.PI;
G.add(ban2);
PY.lamps = [];
for (var i = 0; i < 5; i++) {
var lm = new THREE.Mesh(new THREE.SphereGeometry(0.55, L ? 10 : 16, L ? 8 : 12), new THREE.MeshBasicMaterial({ color: 0x2A1414 }));
lm.position.set(-4 + i * 2, 10.4, gz - 0.9);
G.add(lm);
PY.lamps.push(lm);
var hood = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.5, 12, 1, true), dark);
hood.rotation.x = Math.PI / 2;
hood.position.set(lm.position.x, 10.4, gz - 1.1);
G.add(hood);
}
var standM = pyStd(0x8A8E96, "concrete", 4, 2), seatM = pyStd(0xC83A2A, null);
for (var row = 0; row < 8; row++) {
var x = -17 - row * 2.2, y = 0.5 + row * 1.1;
pyBox(G, 2.2, y * 2, 150, standM, x, y - 0.2, 40, true);
var seats = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 148), seatM);
seats.position.set(x + 0.3, y * 2 - 0.0, 40);
seats.raycast = function () { };
G.add(seats);
}
var roof = new THREE.Mesh(new THREE.BoxGeometry(20, 0.4, 152), pyStd(0xD8D8DC, "metal", 4, 8, { m: 0.5, r: 0.4 }));
roof.position.set(-25, 14, 40);
roof.rotation.z = -0.08;
G.add(roof);
for (var p = -30; p <= 110; p += 20)
pyBox(G, 0.5, 14, 0.5, dark, -34.5, 7, p, true);
var n = L ? 90 : 300, crowd = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.26, 0.3, 1.2, 6), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), n), M = new THREE.Matrix4(), c = new THREE.Color();
var hd = new THREE.InstancedMesh(new THREE.SphereGeometry(0.22, 8, 6), new THREE.MeshLambertMaterial({ color: 0xD8A878 }), n);
for (var k = 0; k < n; k++) {
var r = k % 8, xx = -17 - r * 2.2 + 0.3, yy = (0.5 + r * 1.1) * 2 + 0.85, zz = -32 + Math.random() * 144;
M.makeTranslation(xx, yy, zz);
crowd.setMatrixAt(k, M);
M.makeTranslation(xx, yy + 0.8, zz);
hd.setMatrixAt(k, M);
c.setHSL(Math.random(), 0.55, 0.45);
crowd.setColorAt(k, c);
c.setHSL(0.07, 0.4, 0.3 + Math.random() * 0.45);
hd.setColorAt(k, c);
}
crowd.frustumCulled = false;
hd.frustumCulled = false;
crowd.raycast = hd.raycast = function () { };
G.add(crowd);
G.add(hd);
PY.crowd = [crowd, hd];
var bx = 19, bz = gz + 22;
pyBox(G, 5, 3, 4, white, bx, 1.5, bz, true);
pyBox(G, 5.6, 0.3, 4.6, red, bx, 3.15, bz);
var bs = wSign(["RACE ENTRY", "Death Run · Pure Speed · Time Trial"], 4.6, 1.2, "#141414", "#FFB060");
bs.position.set(bx - 2.52, 2.2, bz);
bs.rotation.y = -Math.PI / 2;
G.add(bs);
pyPersonAt(G, "py-marshal", "Race marshal", bx - 3.2, bz, -Math.PI / 2, { name: "Cass Morrow", persona: "Cass Morrow, the race marshal at Pyreline's grid: brisk, kind, has seen a thousand wrecks and still flinches at every one. Knows the Grand Loop's climates, its short cuts (but only hints), and the rules: a wrecked car is out, first across or last running wins.", greet: "On the grid? Pick your race at the booth. And mind the Skyway's cracked bit: it does not wait for you." });
PY.desks = [{ x: bx - 3.2, z: bz, r: 4, label: "<b>Race entry</b> · <b>press E</b> to choose a race", fn: function () { pyRaceDesk(); } }];
PYT.cps.forEach(function (d, i) {
var R = { d: d, i: 0 }, A = pySampleAt(R), s = A.s;
if (!s)
return;
var w = s.w / 2 + 1.5, h = Math.atan2(s.tx, s.tz);
var g = new THREE.Group();
g.position.set(A.x, A.y, A.z);
g.rotation.y = h;
[-1, 1].forEach(function (sd) { var post = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 7, 8), pyMat("chrome", 0xC8CCD4)); post.position.set(sd * w, 3.5, 0); g.add(post); });
var bar = new THREE.Mesh(new THREE.BoxGeometry(w * 2, 0.7, 0.3), pyMat("glow", 0xFF9A3A, { op: 0.9 }));
bar.position.y = 7;
g.add(bar);
var lab = wSign(["CHECKPOINT " + (i + 1)], 5, 1.1, "#141414", "#FFB060");
lab.position.set(0, 7.9, 0);
g.add(lab);
g.traverse(function (o) { o.raycast = function () { }; });
G.add(g);
});
},
function (G) {
var L = PY.lite, B = PY_MW, H = 7.2;
var ext = pyStd(0x7A808A, "metal", 6, 2, { m: 0.3, r: 0.55 }), wallI = pyStd(0xD8D2C8, "concrete", 3, 1), floor = pyStd(0x7A766E, "concrete", 10, 12, { r: 0.6 }), glass = pyMat("glass", 0x8AA8C8), trim = pyStd(0xE8A040, null);
floor.userData.noReal = 1;
floor.userData.pySw = 0x9A968E;
var fl = new THREE.Mesh(new THREE.PlaneGeometry(B.x1 - B.x0, B.z1 - B.z0), floor);
fl.rotation.x = -Math.PI / 2;
fl.position.set((B.x0 + B.x1) / 2, 0.03, (B.z0 + B.z1) / 2);
fl.receiveShadow = true;
fl.raycast = function () { };
G.add(fl);
var rf = new THREE.Mesh(new THREE.PlaneGeometry(B.x1 - B.x0 + 1, B.z1 - B.z0 + 1), new THREE.MeshBasicMaterial({ color: 0x4A4C52, side: THREE.DoubleSide }));
rf.rotation.x = Math.PI / 2;
rf.position.set((B.x0 + B.x1) / 2, H, (B.z0 + B.z1) / 2);
rf.raycast = function () { };
G.add(rf);
var lpM = new THREE.MeshBasicMaterial({ color: 0xB8AE98 }), lpG = new THREE.PlaneGeometry(4, 1.2), lp = [];
for (var lx = B.x0 + 6; lx < B.x1 - 2; lx += 10)
for (var lz = B.z0 + 6; lz < B.z1 - 2; lz += 9)
lp.push([lx, lz]);
var lpI = new THREE.InstancedMesh(lpG, lpM, lp.length), lpX = new THREE.Matrix4(), lpR = new THREE.Matrix4().makeRotationX(Math.PI / 2);
lp.forEach(function (q, i) { lpX.makeTranslation(q[0], H - 0.05, q[1]).multiply(lpR); lpI.setMatrixAt(i, lpX); });
lpI.frustumCulled = false;
lpI.raycast = function () { };
G.add(lpI);
var rft = new THREE.Mesh(new THREE.PlaneGeometry(B.x1 - B.x0 + 1, B.z1 - B.z0 + 1), pyStd(0x5A5E66, "metal", 6, 6));
rft.rotation.x = -Math.PI / 2;
rft.position.set((B.x0 + B.x1) / 2, H + 0.05, (B.z0 + B.z1) / 2);
G.add(rft);
pyWall(G, B.x0, B.z0, B.x1, B.z0, H, ext);
pyWall(G, B.x0, B.z1, B.x1, B.z1, H, ext);
pyWall(G, B.x1, B.z0, B.x1, B.z1, H, ext, [[35, 50]]);
[[B.z0, 90], [100, B.z1]].forEach(function (r) {
var len = r[1] - r[0], c = (r[0] + r[1]) / 2;
var gp = new THREE.Mesh(new THREE.PlaneGeometry(len, H - 0.6), glass);
gp.position.set(B.x0, H / 2, c);
gp.rotation.y = Math.PI / 2;
G.add(gp);
pySolid({ x: B.x0, z: c, hw: 0.2, hd: len / 2, rot: 0 });
for (var z = r[0]; z <= r[1] + 0.01; z += 5) {
pyBox(G, 0.25, H, 0.25, ext, B.x0, H / 2, Math.min(z, r[1]));
}
});
pyBox(G, 0.5, 0.6, B.z1 - B.z0, trim, B.x0 - 0.1, H - 0.3, (B.z0 + B.z1) / 2);
var name = wSign(["PYRELINE MOTORWORKS", "Fifty cars · every one armed"], 18, 3, "#141414", "#FFB060");
name.position.set(B.x0 - 0.4, H + 2, 95);
name.rotation.y = -Math.PI / 2;
G.add(name);
pyWall(G, B.x0, 70, 90, 70, H, wallI, [[14, 22]]);
pyWall(G, B.x0, 120, 90, 120, H, wallI, [[14, 24]]);
pyWall(G, 90, B.z0, 90, B.z1, H, wallI, [[8, 14], [36, 50]]);
pyWall(G, 90, 70, B.x1, 70, H, wallI);
pyWall(G, 90, 120, B.x1, 120, H, wallI, [[10, 16]]);
var dr = pyBox(G, 6, 3.2, 0.2, pyStd(0x5A5E66, "metal", 1, 1, { m: 0.6, r: 0.35 }), 103, 1.6, 120, false);
PY.rcDoor = { m: dr, solid: pySolid({ x: 103, z: 120, hw: 3, hd: 0.25, rot: 0, h: 3.2, b: 0 }) };
var rd = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 0.06), pyMat("glow", 0xFF6A3A));
rd.position.set(106.6, 1.4, 119.85);
G.add(rd);
PY.rcLight = rd;
var rsign = wSign(["RACE CONTROL", "Staff only · badge"], 3, 0.8, "#141414", "#FF8A6A");
rsign.position.set(103, 3.7, 119.8);
rsign.rotation.y = Math.PI;
G.add(rsign);
var tt = new THREE.Group();
tt.position.set(70, 0.3, 95);
G.add(tt);
var disc = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.4, 0.3, L ? 24 : 48), pyStd(0x1A1A1E, "metal", 2, 2, { m: 0.7, r: 0.25 }));
tt.add(disc);
var glowR = new THREE.Mesh(new THREE.TorusGeometry(4.3, 0.06, 6, L ? 32 : 64), pyMat("glow", 0xFFB060));
glowR.rotation.x = Math.PI / 2;
glowR.position.y = 0.17;
tt.add(glowR);
var spin = new THREE.Group();
spin.position.y = 0.15;
tt.add(spin);
PY.turn = { g: spin, k: null, car: null };
pyShowcase("nightglass");
var show = ["emberwasp", "blacktongue", "hornetnine", "harpytalon", "bisonrex", "frostline"], spots = [[58, 78], [82, 78], [58, 112], [82, 112], [56, 95], [84, 95]];
show.forEach(function (k, i) {
var c = pyCar(k), st = new THREE.Group();
st.position.set(spots[i][0], 0.25, spots[i][1]);
G.add(st);
var d2 = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.3, 0.25, L ? 20 : 36), pyStd(0x2A2A30, "metal", 1, 1, { m: 0.6, r: 0.3 }));
st.add(d2);
var car = pyBuildCar(c, { lite: L });
car.position.y = 0.13;
car.rotation.y = (i % 2 ? -1 : 1) * 0.7;
st.add(car);
var pl = wSign([c.name, c.maker, (c.how === "buy" ? c.what.toLocaleString() + " gold" : PY_HOW[c.how])], 2.4, 0.9, "#141414", "#F0E8D8");
pl.position.set(0, 0.9, 3.3);
pl.rotation.x = -0.4;
st.add(pl);
pySolid({ x: spots[i][0], z: spots[i][1], r: 3.2, h: 1.5 });
});
pySolid({ x: 70, z: 95, r: 4.4, h: 1.6 });
pyBox(G, 5, 1.1, 1.4, pyStd(0x2A2A30, "wood", 2, 1), 60, 0.55, 104, true);
pyBox(G, 5.2, 0.08, 1.6, pyStd(0xE8E4DC, "stone", 1, 1), 60, 1.14, 104);
pyPersonAt(G, "py-sales", "Car sales consultant", 60, 105.4, Math.PI, { name: "Imogen Vale", persona: "Imogen Vale, senior sales consultant at Pyreline Motorworks: knows all fifty cars by heart, their weapons, defences and how each is come by (sold, won, built, found or earned in a season). Enthusiastic but honest; never pushy; warns that every car can be wrecked.", greet: "Welcome to the Motorworks! Every car here is armed. Ask me about any of them." });
PY.desks.push({ x: 60, z: 106.5, r: 3.6, label: "<b>Pyreline Motorworks</b> · <b>press E</b> to see all fifty cars", fn: function () { pyGarageOpen(); } });
pyBox(G, 8, 1.1, 1.2, pyStd(0x6A4A30, "wood", 2, 1), 60, 0.55, 54, true);
pyPersonAt(G, "py-barista", "Barista", 60, 52.8, 0, { name: "Rafi Okoro", persona: "Rafi Okoro, the barista in the drivers' lounge at Pyreline: calm in a place full of adrenaline, makes a strong coffee called the Redline. Hears all the paddock's gossip about hidden short cuts and lost cars, and passes on hints.", greet: "Coffee before a Death Run? Smart. Sit down a minute." });
for (var s = 0; s < (L ? 2 : 4); s++) {
var sx = 58 + s * 8;
pyBox(G, 3, 0.5, 1.2, pyStd(0x3A2A4A, null), sx, 0.25, 64, true);
pyBox(G, 3, 0.9, 0.3, pyStd(0x3A2A4A, null), sx, 0.7, 64.7);
pyBox(G, 1.6, 0.45, 0.9, pyStd(0x5A4A3A, "wood", 1, 1), sx, 0.22, 61.6, true);
}
var tv = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.MeshBasicMaterial({ map: pyMapTex() }));
tv.position.set(89.8, 3.6, 60);
tv.rotation.y = -Math.PI / 2;
G.add(tv);
pyBox(G, 3, 0.8, 1.4, pyStd(0x4A3A2A, "wood", 1, 1), 105, 0.4, 58, true);
pyBox(G, 3, 0.8, 1.4, pyStd(0x4A3A2A, "wood", 1, 1), 112, 0.4, 64, true);
pyPersonAt(G, "py-finance", "Finance manager", 105, 56.6, 0, { name: "Desmond Achterberg", persona: "Desmond Achterberg, finance manager at Pyreline Motorworks: precise, dry humour, explains prices plainly. Cars are paid in full from the dreamer's purse; there is no credit. The Keeper's cars are free.", greet: "Paid in full, from your purse, and the car is yours for good. Questions?" });
[[100, 82], [110, 82]].forEach(function (p, i) {
[-1, 1].forEach(function (sd) { pyBox(G, 0.4, 3.4, 0.4, pyStd(0xC83A2A, null), p[0] + sd * 1.8, 1.7, p[1], true); });
var arm = new THREE.Group();
arm.position.set(p[0], 2.2, p[1]);
G.add(arm);
var car = pyBuildCar(pyCar(i ? "scrapjack" : "forgehammer"), { lite: L });
arm.add(car);
});
pyBox(G, 10, 1, 1, pyStd(0x5A5E66, "metal", 3, 1, { m: 0.5, r: 0.4 }), 105, 0.5, 118.8, true);
var tools = wTex(256, 128, function (x, W, H) { x.fillStyle = "#3A4A3A"; x.fillRect(0, 0, W, H); x.fillStyle = "#C8CCD4"; for (var i = 0; i < 26; i++) {
var tx = 10 + (i % 13) * 18, ty = 12 + Math.floor(i / 13) * 56;
x.fillRect(tx, ty, 4, 30 + ((i * 7) % 14));
x.fillRect(tx - 4, ty, 12, 6);
} });
var tw = new THREE.Mesh(new THREE.PlaneGeometry(12, 3), new THREE.MeshLambertMaterial({ map: tools }));
tw.position.set(105, 2.8, 70.2);
G.add(tw);
var term = pyBox(G, 1.2, 1.5, 0.8, pyStd(0x2A2A30, "metal", 1, 1), 96, 0.75, 110, true);
var scr = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.6), pyMat("glow", 0x3AC8F0));
scr.position.set(96, 1.5, 110.42);
G.add(scr);
pyPersonAt(G, "py-mech", "Race mechanic", 98, 108, Math.PI * 0.7, { name: "Tomas Brennick", persona: "Tomas Brennick, head mechanic in the Motorworks' build bay: grease to the elbows, fond of every car, especially ugly ones. Builds the ten hand-built cars from materials in the dreamer's stock (machine parts, steel, rubber, glass, war scrap, star crystal, emberstone, a dragon's scale).", greet: "Bring me the parts and I'll build you something mean." });
PY.desks.push({ x: 96, z: 111.5, r: 3, label: "<b>The build bay</b> · <b>press E</b> to build a car from your materials", fn: function () { pyGarageOpen("craft"); } });
for (var t = 0; t < (L ? 4 : 8); t++) {
var px = 56 + t * 4.4;
pyBox(G, 1.2, 1.2, 1.2, pyStd(0x1A1A1E, "stone", 1, 1), px, 0.6, 136, true);
var cup = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0, 0), new THREE.Vector2(0.25, 0), new THREE.Vector2(0.08, 0.2), new THREE.Vector2(0.08, 0.5), new THREE.Vector2(0.35, 0.7), new THREE.Vector2(0.4, 1.1)], L ? 10 : 18), pyMat("chrome", 0xE8C060));
cup.position.set(px, 1.2, 136);
G.add(cup);
}
var hall = new THREE.Mesh(new THREE.PlaneGeometry(9, 4.5), new THREE.MeshBasicMaterial({ map: wTex(512, 256, function (x, W, H) { x.fillStyle = "#141018"; x.fillRect(0, 0, W, H); x.fillStyle = "#FFD27A"; x.font = "bold 34px Georgia"; x.textAlign = "center"; x.fillText("HALL OF CHAMPIONS", W / 2, 50); x.font = "20px Georgia"; x.fillStyle = "#F0E8D8"; ["Win a Death Run: the Laurel Fang", "Fifty wins: the Grand Marshal", "4,500 points in a season: the Infinity Drift", "The board: press E"].forEach(function (l, i) { x.fillText(l, W / 2, 100 + i * 36); }); }) }));
hall.position.set(70, 3.6, 139.8);
hall.rotation.y = Math.PI;
G.add(hall);
pyPersonAt(G, "py-curator", "Trophy hall curator", 64, 130, Math.PI, { name: "Henrietta Sowande", persona: "Henrietta Sowande, curator of Pyreline's Hall of Champions: a former racer, retired after a crash on the Skyway, now keeps the records of every win, podium and season. Proud, warm, a storyteller.", greet: "Every name on these walls finished a Death Run. Most of them crashed a hundred times first." });
PY.desks.push({ x: 70, z: 134, r: 4, label: "<b>The Hall of Champions</b> · <b>press E</b> for the board", fn: function () { pyBoard(); } });
for (var q = 0; q < 3; q++) {
pyBox(G, 3.2, 0.8, 1.2, pyStd(0x2A2A30, "metal", 1, 1), 96 + q * 8, 0.4, 132, true);
var sc2 = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.5), new THREE.MeshBasicMaterial({ map: pyMapTex() }));
sc2.position.set(96 + q * 8, 1.8, 131.3);
sc2.rotation.y = Math.PI;
G.add(sc2);
}
pyPersonAt(G, "py-steward", "Race steward", 104, 134, Math.PI, { name: "Marguerite Lund", persona: "Marguerite Lund, chief steward in Pyreline Race Control: strict, fair, unflappable. Signs every result by the server's clock, rules on wrecks (a wrecked car is out) and on who crossed first. Staff-only room.", greet: "Staff only in here. If you're on shift, take the headset." });
PY.apron = { x: 32, z: 118, h: Math.PI / 2 };
PY_PADS.push({ x: (B.x0 + B.x1) / 2, z: (B.z0 + B.z1) / 2, hw: (B.x1 - B.x0) / 2, hd: (B.z1 - B.z0) / 2, y: 0.03 });
},
function (G) {
PY.findSpots = [];
Object.keys(PY_FINDS).forEach(function (fk) {
var F = PY_FINDS[fk];
if (F.world)
return;
var x = F.x, z = F.z, y, rnd = pyFindRand("find:" + fk);
var cut = PY_CUTS.filter(function (C) { return C.k === fk; })[0];
if (cut) {
var best = null, bd = 1e9;
PYT.cuts.forEach(function (s) { if (s.cut !== fk || s.w <= 0)
return; var d = Math.hypot(s.x - x, s.z - z); if (d < bd) {
bd = d;
best = s;
} });
if (best) {
var a = (best.w / 2 - 0.2) * (rnd() < 0.5 ? -1 : 1);
x = best.x + a * best.tz;
z = best.z - a * best.tx;
y = best.y;
}
}
else if (F.y !== undefined)
y = F.y;
else {
var done = false;
for (var t = 0; t < 160 && !done; t++) {
var ang = rnd() * 6.283, r = 40 + t * 1.2 + rnd() * 30, px = F.x + Math.cos(ang) * r, pz = F.z + Math.sin(ang) * r, n = pyNear(px, pz);
if (n && n.ad >= 60 && n.ad <= 180 && pyClear(px, pz, 10) && pyGround(px, pz) > (typeof PY_SEA === "number" ? PY_SEA + 0.5 : -50)) {
x = px;
z = pz;
done = true;
}
}
if (!done) {
var n2 = pyNear(x, z);
if (n2 && n2.ad < n2.w / 2 + 40) {
var s = n2.s, sd = n2.across >= 0 ? 1 : -1, a2 = s.w / 2 + 60;
x = s.x + sd * a2 * s.tz;
z = s.z - sd * a2 * s.tx;
}
}
y = pyGround(x, z);
}
var c = pyCar(F.car), S = PY_STYLE[c.style], top = S.top.reduce(function (m, p) { return Math.max(m, p[1]); }, 0);
var g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = rnd() * 6;
var car = pyBuildCar(c, { lite: true });
car.traverse(function (o) { if (o.isMesh && o.material && o.material.color) {
o.material = o.material.clone();
o.material.color.multiplyScalar(0.32);
if (o.material.emissive)
o.material.emissive.setHex(0);
} });
car.position.y = -top * 0.62;
g.add(car);
var tarp = new THREE.Mesh(new THREE.SphereGeometry(1, PY.lite ? 10 : 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), new THREE.MeshLambertMaterial({ color: 0x4A4A3A, side: THREE.DoubleSide }));
tarp.scale.set((S.W || 2) * 0.75, top * 0.5 + 0.3, S.L * 0.6);
tarp.position.y = -0.1;
g.add(tarp);
var rk = new THREE.DodecahedronGeometry(1, 0), rkM = new THREE.MeshLambertMaterial({ color: 0x5A5048, map: pyTex("stone", 1, 1) });
for (var q = 0; q < (PY.lite ? 5 : 9); q++) {
var b = new THREE.Mesh(rk, rkM), a3 = rnd() * 6.283, rr = 0.5 + rnd() * 0.5;
b.position.set(Math.cos(a3) * S.W * 0.55 * rr, 0.1 + rnd() * 0.4, Math.sin(a3) * S.L * 0.5 * rr);
var sc = 0.5 + rnd() * 0.9;
b.scale.set(sc, sc * 0.6, sc);
b.rotation.set(rnd() * 3, rnd() * 3, 0);
g.add(b);
}
g.traverse(function (o) { o.raycast = function () { }; });
G.add(g);
PY.findSpots.push({ k: fk, car: F.car, x: x, y: y, z: z, g: g });
});
},
function () {
var h = worldFacts("The Hall of Champions", PY_NAME, [], []);
if (PY.missing || !(typeof signedIn === "function" && signedIn())) {
var st = pyStats();
worldCard(h + "<div>Your record on this device: " + st.wins + " wins, " + st.podiums + " podiums, " + st.races + " races.</div>");
return;
}
worldCard(h + "<div id='py-board'>Reading the board…</div>");
cityRpc("race_planet_board", {}).then(function (o) {
var el = document.getElementById("py-board");
if (!el)
return;
if (!o || !o.ok) {
el.textContent = "The board is being repainted.";
return;
}
var w = (o.wins || []).map(function (r, i) { return (i + 1) + ". " + esc(r.name || "a racer") + " · " + r.wins + " wins"; }).join("<br>") || "No wins yet: be the first.";
var s = (o.season || []).map(function (r, i) { return (i + 1) + ". " + esc(r.name || "a racer") + " · " + r.pts.toLocaleString() + " points"; }).join("<br>") || "Nobody yet this season.";
el.innerHTML = "<b>Most wins</b><br>" + w + "<br><br><b>This season (" + esc(pySeasonName()) + ")</b><br>" + s;
})
.catch(function (e) { if (rpcMissing(e))
PY.missing = true; var el = document.getElementById("py-board"); if (el)
el.textContent = "The board is being repainted."; });
},
function (G) {
PY.lite = typeof LITE !== "undefined" && !!LITE;
PY.solids = [];
pyTrackMake();
var steps = [pyBuildLand, pyBuildRoad, pyBuildCuts, pyBuildLiquids, pyBuildDress, pyBuildLands, pyBuildPaddock, pyBuildMotorworks, pyBuildFinds, pyBuildCells, pyBuildSprints];
steps.forEach(function (f) { try {
f(G);
}
catch (e) {
if (window.console)
console.warn("pyreline build:", f.name, e);
} });
},
function () {
if (typeof flkOn === "function" && flkOn())
return { ok: false, say: "Pyreline is closed on this device: the teacher / parent lock is on." };
if (typeof amKeeper === "function" && amKeeper())
return { ok: true };
if (!(typeof signedIn === "function" && signedIn()))
return { ok: false, say: "Pyreline is for members of the Warrens Street Racing Club: sign in first." };
if (pyWorksHere())
return { ok: true };
if (PY.pass === true)
return { ok: true };
if ((PY.missing || PY.passMissing) && pyLocal().pass)
return { ok: true };
if (PY.pass === null || PY.pass === undefined)
return { ok: null };
return { ok: false, say: "You need a recommendation from the Warrens Street Racing Club to race on Pyreline. Win a race at the club (against its rivals, or in a live heat) and they will give you one." };
},
function (force) {
if (!force && PY.pass !== null && PY.pass !== undefined && Date.now() - (PY.passAt || 0) < 60000)
return Promise.resolve(PY.pass);
if (!(typeof signedIn === "function" && signedIn())) {
PY.pass = false;
return Promise.resolve(false);
}
return cityRpc("race_planet_ok", {}).then(function (o) { PY.passAt = Date.now(); PY.pass = !!(o && o.ok && o.pass); if (o && o.ok && o.pass)
pyLocal().pass = 1; return PY.pass; })
.catch(function (e) { if (rpcMissing(e)) {
PY.passMissing = true;
PY.pass = !!pyLocal().pass;
} return PY.pass; });
},
function (opt) {
var A = pyAllowedNow();
if (A.ok === null) {
pyPassCheck(true).then(function () { var B = pyAllowedNow(); if (B.ok)
worldGo("race", opt || {});
else
setStatus("<b>🏁 " + esc(B.say || "Not yet.") + "</b>"); });
return false;
}
if (!A.ok) {
setStatus("<b>🏁 " + esc(A.say) + "</b>");
return false;
}
return worldGo("race", opt || {});
},
function (opt) {
PY.on = true;
PY.t = PY.t || 0;
PY.envC = null;
camera.position.set(PY.base + PY_ARRIVE.x, 1.72 + 0.35, PY_ARRIVE.z);
yaw = PY_ARRIVE.yaw;
pitch = 0.02;
PY.net.since = 0;
PY.net.at = -99;
PY.zoneSaid = null;
pyHudBuild();
pyStateLoad(true);
pyPassCheck(false);
if (scene.fog && scene.fog.density !== undefined) {
PY.fog0 = scene.fog.density;
}
setStatus("<b>Pyreline, the race planet.</b> You step off at the Redline Paddock. Pyreline Motorworks is straight ahead: fifty cars, every one armed. Race entry is at the booth by the start line. The whole planet is one road; a wrecked car is out. (Back goes home.)");
},
function () {
if (pyDriving()) {
vehicleEnd();
rideArch = null;
try {
var L = meLook();
L.ride = null;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
}
if (typeof rideG !== "undefined" && rideG && rideG.userData.pyCar) {
pyGone(rideG);
rideG = null;
}
pyRaceClear();
pyHazClear();
for (var id in PY.ghosts) {
if (PY.ghosts[id].g)
pyGone(PY.ghosts[id].g);
}
PY.ghosts = {};
PY.fx.forEach(function (f) { pyGone(f.m); });
PY.fx = [];
PY.on = false;
PY.me.wreckT = 0;
PY.fade = 0;
pyPaceFov(0, 1);
if (PY.hud) {
PY.hud.style.display = "none";
PY.vig.style.opacity = "0";
PY.dark.style.opacity = "0";
PY.lampsEl.style.display = "none";
}
pyPad(false);
worldBanner(null);
pySave(true);
},
function (e) {
if (!pyDriving())
return false;
if (e.code === "KeyE" || e.code === "Enter" || e.code === "KeyF") {
if (!e.repeat)
pyFireMe();
return true;
}
if (e.code === "KeyG" || e.code === "KeyR") {
if (!e.repeat)
pyDefendMe();
return true;
}
if (e.code === "KeyB" || e.code === "KeyC") {
if (!e.repeat)
pyPowMe();
return true;
}
return false;
},
function () {
if (PY.race && PY.race.st === "on") {
worldCard(worldFacts("Leave the race?", PY_NAME, [], ["Leaving now counts as out of the race."]) + worldBtn("quit", "Leave the race", "Your car is out") + worldBtn("stay", "Keep racing", ""), { quit: function () { worldCard(null); pyRaceOut("you left the race"); }, stay: function () { worldCard(null); } });
return;
}
if (PY.race && PY.race.st !== "free") {
pyRaceClear();
}
if (pyDriving()) {
vehicleLeave();
return;
}
worldHome("<b>Back from Pyreline.</b> Your cars wait in the Motorworks for next time.");
},
function (dt) {
dt = Math.min(dt, 0.1);
PY.t += dt;
var P = camera.position, lx = P.x - PY.base, lz = P.z, drv = pyDriving();
PY.zone = pyZoneAt(lx, lz);
if (typeof flkOn === "function" && flkOn() && !(typeof amKeeper === "function" && amKeeper())) {
worldHome("<b>Pyreline is closed on this device:</b> the teacher / parent lock is on.");
return;
}
if (!drv && PY.fov0)
pyPaceFov(dt, 1);
pyMeArmsTick(dt);
pyRivalsTick(dt);
pyShotsTick(dt);
pyDropsTick(dt);
pyFxTick(dt);
pyHazTick(dt);
pyHaz2Tick(dt);
pySlabsTick(dt);
pyPowersTick(dt);
pyRaceTick(dt);
pyNetTick(dt);
pyLandsTick(dt);
pyHudPaint();
pyScreenTick(dt);
if (PY_SAY_Q && Date.now() - (PY.sayAt || 0) > 1200)
pySay(PY_SAY_Q);
if (PY.falls)
PY.falls.offset.y -= dt * 0.6;
if (PY.lavaTex) {
PY.lavaTex.offset.x += dt * 0.004;
PY.lavaTex.offset.y += dt * 0.002;
}
(PY.turbines || []).forEach(function (h, i) { h.rotation.z += dt * (0.5 + i * 0.04); });
if (PY.turn)
PY.turn.g.rotation.y += dt * 0.3;
if (PY.crowd && PY.race && PY.race.st === "on")
PY.crowd.forEach(function (m) { m.position.y = Math.abs(Math.sin(PY.t * 1.6)) * 0.12; });
if (PY.rcDoor) {
var staff = (typeof amKeeper === "function" && amKeeper()) || pyWorksHere();
var near = Math.hypot(lx - 103, lz - 120) < 5;
var open = staff && near;
PY.rcDoor.solid.h = open ? -1 : 3.2;
PY.rcDoor.m.position.y += ((open ? 4.8 : 1.6) - PY.rcDoor.m.position.y) * Math.min(1, dt * 4);
if (PY.rcLight)
PY.rcLight.material.color.setHex(staff ? 0x5AE87A : 0xFF6A3A);
if (near && !staff && !drv && !PY.rcSaid) {
PY.rcSaid = 1;
pySay("<b>Race Control: staff only.</b> The badge reader stays red. (Pyreline's jobs are on the Jobs board.)");
}
if (!near)
PY.rcSaid = 0;
}
var Z = PY_ZONES[PY.zone] || PY_ZONES.paddock;
worldBanner("<b>🏁 Pyreline</b> · " + esc(Z.name) + (drv ? " · " + esc(Z.road) : ""));
if (PY.zoneSaid !== PY.zone && drv) {
PY.zoneSaid = PY.zone;
var tip = { canyon: "Dust on the road: it slides. Boulders fall from the walls.", tundra: "Packed snow: brake early. Icicles fall.", ice: "Clear ice over black water, and it cracks: keep your speed.",
sky: "The Neon Skyway: jumps, a cracked stretch, and nothing below but the dark.", lava: "Basalt over the caldera: the road gives way, the vents throw lava, geysers burst from the road.", jungle: "Wet mud, falling trees and quicksand.", storm: "Rain and wind on the Bluffs: gusts shove you sideways, debris flies.", paddock: "The paddock.",
dunes: "Wind-blown sand: twisters cross the road, sinking sand drags you down, and the dune jump needs full speed.", cave: "Into the mountain: stalactites fall, crystals burst from the road, and the bridge over the Hollow is broken. Jump it.", coast: "The sea road: waves break over it (jump them, or brace), and the old stones give way." }[PY.zone];
if (tip)
pyFeed("<b>" + esc(Z.name) + "</b> · " + esc(tip), "#E8C66A");
}
if (!drv && (pyPitAt(lx, lz, P.y - 1.72) || P.y < PY_ABYSS)) {
camera.position.set(PY.base + PY_ARRIVE.x, 1.72 + 0.35, PY_ARRIVE.z);
setStatus("The paddock's rescue crew fetch you back to the Redline Paddock.");
return;
}
pyPrompts(lx, lz, drv);
},
function (lx, lz, drv) {
if (WLD.card && WLD.card.style.display === "block" && !drv) { }
var got = null;
(PY.findSpots || []).forEach(function (F) {
if (got || drv)
return;
if (Math.hypot(lx - F.x, lz - F.z) < 4) {
var own = pyOwned()[F.car], c = pyCar(F.car);
if (own)
got = { label: "<b>" + esc(c.name) + "</b> · found: it waits in your garage at the Motorworks", fn: null };
else {
var dug = F.dug || 0;
got = { label: dug ? "<b>Digging</b> · " + dug + " of 5 · <b>press E</b> to keep digging" : "<b>A heap of rubble over an old tarpaulin</b> · <b>press E</b> to dig",
fn: function () { F.dug = (F.dug || 0) + 1; pySoft(F.x, F.y + 0.6, F.z, 0x8A7A60, 2.2, 1.1); if (F.dug >= 5) {
F.dug = 0;
worldPrompt(null);
pyFind(F.car);
}
else
pySay(F.dug === 3 ? "Metal under the dirt. Keep digging." : "You dig.", false); } };
}
}
});
if (!got && !drv) {
(PY.desks || []).forEach(function (D) { if (!got && wNear(lx, lz, D.x, D.z, D.r))
got = { label: D.label, fn: D.fn }; });
(PY.talk || []).forEach(function (T) { if (!got && wNear(lx, lz, T.x, T.z, T.r))
got = { label: "<b>" + esc(T.name) + "</b>, " + esc(T.title.toLowerCase()) + " · <b>press E</b> to talk", fn: function () { wTalk({ name: T.name, persona: T.persona, greet: T.greet }); } }; });
}
if (got)
worldPrompt(got.label, got.fn || function () { });
else
worldPrompt(null);
},
function () {
if (WLD.on === "race") {
pyRaceDesk();
return;
}
pyPassCheck(false).then(function () {
var A = pyAllowedNow(), keeper = typeof amKeeper === "function" && amKeeper();
var rows = [["The road", "The Grand Loop: one road round the whole planet, eleven climates, hidden passes and tunnels"], ["The races", "Death Run, Eliminator, Pure Speed, Time Trial and five sprints"], ["The cars", "Fifty, every one armed: bought, won, built, found or earned in a season"], ["The rule", "A wrecked car is out: first across, or the last car running, wins"],
["Your pass", A.ok ? "Recommended: you may race" : "Not yet: win a race at the Warrens Street Racing Club"]];
var b = "", fns = {};
if (keeper) {
b += worldBtn("go", "Go now", "The Keeper's way");
fns.go = function () { worldCard(null); worldGo("race"); };
}
if (A.ok) {
b += worldBtn("port", "Show me the way", "To the Spaceport, then the Race Line from Launch Pad 1");
fns.port = function () { worldCard(null); if (typeof showTheWay === "function")
showTheWay(typeof SPACEPORT_KEY !== "undefined" ? SPACEPORT_KEY : ""); setStatus("<b>Pyreline:</b> follow the pointer to the Space Corp Spaceport and take the <b>Race Line</b> from Launch Pad 1."); };
}
else {
b += worldBtn("club", "Show me the racing club", "The Warrens Street Racing Club: win a race there");
fns.club = function () { worldCard(null); if (typeof RACE !== "undefined" && RACE.sign) {
guideTo = { key: "Warrens Street Racing Club", x: RACE.sign.x, z: RACE.sign.z };
setStatus("<b>The Warrens Street Racing Club</b>: follow the pointer. Win a race there and the club recommends you for Pyreline.");
}
else
setStatus("The Warrens Street Racing Club is on the Warrens' street, in Somnucor."); };
}
worldCard(worldFacts("🏁 Pyreline, the race planet", "A deadly speed race round a whole planet", rows, []) + b, fns);
});
},
function (how) {
var L = pyLocal(), had = !!L.pass || PY.pass === true;
L.pass = 1;
pySave(true);
setTimeout(function () {
pyPassCheck(true).then(function (ok) {
if ((ok || PY.passMissing) && !had)
setStatus("<b>🏁 The Warrens Street Racing Club recommends you for Pyreline, the race planet!</b> Take the <b>Race Line</b> from the Space Corp Spaceport. (☰ Menu → 🏁 Pyreline)");
});
}, 4500);
},
function (list, a, b, lf, rf, yf, mat) {
var pos = [], uv = [], idx = [], n = 0;
for (var i = a; i <= b; i++) {
var s = list[i], l = lf(s), r = rf(s), y = yf(s);
pos.push(s.x + l * s.tz, y, s.z - l * s.tx, s.x + r * s.tz, y, s.z - r * s.tx);
uv.push(0, s.d / 8, (r - l) / 8, s.d / 8);
if (n > 0) {
var q = (n - 1) * 2;
idx.push(q, q + 2, q + 1, q + 1, q + 2, q + 3);
}
n++;
}
if (n < 2)
return null;
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.raycast = function () { };
return m;
},
function (list, a, b, mat, extra) {
var seg = PY.lite ? 8 : 14, pos = [], uv = [], idx = [], n = 0;
for (var j = a; j <= b; j++) {
var s = list[j], R = s.w / 2 + 1.4 + (extra || 0);
for (var k = 0; k <= seg; k++) {
var t = Math.PI * k / seg, cx = Math.cos(t) * R, cy = Math.sin(t) * R * 0.9, wob = 1 + 0.07 * pyNoise(s.d * 0.2, k * 0.7, 2);
pos.push(s.x + cx * wob * s.tz, s.y + cy * wob, s.z - cx * wob * s.tx);
uv.push(k / seg * 3, s.d / 6);
}
if (n > 0) {
for (var q = 0; q < seg; q++) {
var A = (n - 1) * (seg + 1) + q, B = n * (seg + 1) + q;
idx.push(A, B, A + 1, A + 1, B, B + 1);
}
}
n++;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.raycast = function () { };
return m;
},
function (G, s, mat, trim) {
var R = s.w / 2 + 1.4, g = new THREE.Group();
g.position.set(s.x, s.y, s.z);
g.rotation.y = Math.atan2(s.tx, s.tz);
var top = new THREE.Mesh(new THREE.BoxGeometry(s.w + 26, 24, 5), mat);
top.position.y = R * 0.9 + 12;
g.add(top);
[-1, 1].forEach(function (sd) { var side = new THREE.Mesh(new THREE.BoxGeometry(10, R * 0.9 + 24, 5), mat); side.position.set(sd * (R + 5), (R * 0.9 + 24) / 2 - 1, 0); g.add(side); });
if (trim) {
var ring = new THREE.Mesh(new THREE.TorusGeometry(R + 0.3, 0.35, 6, PY.lite ? 14 : 28, Math.PI), pyMat("glow", trim, { op: 0.85 }));
ring.position.z = -2.6;
g.add(ring);
}
g.traverse(function (o) { o.raycast = function () { }; });
G.add(g);
},
function (G) {
var L = PY.lite, S = PYT.S, N = S.length;
var slate = new THREE.MeshLambertMaterial({ color: 0x4A4458, map: pyTex("stone", 2, 6), side: THREE.DoubleSide });
var roof = new THREE.MeshLambertMaterial({ color: 0x4A4456, map: pyTex("stone", 6, 6), side: THREE.DoubleSide });
pyRunsOf(function (s) { return s.fl.indexOf("t") >= 0; }).forEach(function (r) {
var a = Math.max(0, r.a - 1), b = Math.min(N - 1, r.b + 1);
G.add(pyArchOver(S, a, b, slate));
var lid = pyRibbon(S, a, b, function (s) { return -s.w / 2 - 11; }, function (s) { return s.w / 2 + 11; }, 9.4, roof, 8);
if (lid) {
lid.material = roof;
G.add(lid);
}
pyPortal(G, S[a], roof, 0x5AE8E0);
pyPortal(G, S[b], roof, 0xB07AFF);
for (var j = a + 1; j < b; j += L ? 4 : 2) {
var s = S[j];
[-1, 1].forEach(function (sd) { var st = new THREE.Mesh(pyGeo("ball"), pyMat("glow", sd < 0 ? 0x5AE8E0 : 0xB07AFF)); st.scale.setScalar(0.22); st.position.set(s.x + sd * (s.w / 2 + 0.7) * s.tz, s.y + 0.3, s.z - sd * (s.w / 2 + 0.7) * s.tx); st.raycast = function () { }; G.add(st); });
}
});
var qsM = new THREE.MeshPhongMaterial({ color: 0x5A4428, shininess: 60, specular: 0x4A3A24, transparent: true, opacity: 0.92, map: pyTex("earth", 1, 1), depthWrite: false });
var ssM = new THREE.MeshLambertMaterial({ color: 0xC89858, transparent: true, opacity: 0.95, map: pyTex("sand", 1, 1), depthWrite: false });
(PYT.patches || []).forEach(function (P) {
var b = Math.min(N - 1, P.b + 1), m = pyRibbon(S, P.a, b, P.l, P.r, 0.06, P.kind === "sand" ? ssM : qsM, 4);
if (m)
G.add(m);
var rim = pyRibbon(S, P.a, b, P.l - 0.5, P.l, 0.055, pyMat("lambert", P.kind === "sand" ? 0x9A7040 : 0x3A2A18), 4);
if (rim)
G.add(rim);
var rim2 = pyRibbon(S, P.a, b, P.r, P.r + 0.5, 0.055, pyMat("lambert", P.kind === "sand" ? 0x9A7040 : 0x3A2A18), 4);
if (rim2)
G.add(rim2);
});
pyBuildDunes(G);
pyBuildDeep(G);
pyBuildCoast(G);
pyBuildCol(G);
},
function (G) {
var L = PY.lite, S = PYT.S;
var spire = new THREE.ConeGeometry(1, 1, L ? 5 : 7);
spire.translate(0, 0.5, 0);
if (typeof pyluGlassGeo === "function")
spire = pyluGlassGeo();
pyInstances(G, spire, new THREE.MeshPhongMaterial({ color: 0xF0A850, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.78 }), L ? 16 : 46, function () { var p = pyNearRoad("dunes", 10, 90); if (!p)
return null; return [p[0], pyTerrain(p[0], p[1]) - 0.5, p[1], Math.random() * 6, (Math.random() - 0.5) * 0.25, (Math.random() - 0.5) * 0.25, 0.5 + Math.random() * 0.8, 4 + Math.random() * 10, 0.5 + Math.random() * 0.8]; });
pyInstances(G, spire, new THREE.MeshPhongMaterial({ color: 0x6A7080, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.7 }), L ? 8 : 24, function () { var p = pyNearRoad("dunes", 12, 70); if (!p)
return null; return [p[0], pyTerrain(p[0], p[1]) - 0.5, p[1], Math.random() * 6, 0, (Math.random() - 0.5) * 0.3, 0.4 + Math.random() * 0.5, 3 + Math.random() * 7, 0.4 + Math.random() * 0.5]; });
var pil = new THREE.CylinderGeometry(1, 1.15, 1, L ? 8 : 12);
pil.translate(0, 0.5, 0);
pyInstances(G, pil, new THREE.MeshLambertMaterial({ color: 0xD8B888, map: pyTex("stone", 1, 3) }), L ? 14 : 40, function () { var p = pyNearRoad("dunes", 8, 60); if (!p)
return null; return [p[0], pyTerrain(p[0], p[1]) - 1.5, p[1], Math.random() * 6, (Math.random() - 0.5) * 0.35, (Math.random() - 0.5) * 0.35, 1.1, 3 + Math.random() * 9, 1.1]; });
var best = null, bd = 1e9;
S.forEach(function (s, i) { if (s.zone !== "dunes" || /[gr]/.test(s.fl) || s.patch)
return; var d = Math.hypot(s.x + 760, s.z - 760); if (d < bd) {
bd = d;
best = i;
} });
if (best !== null) {
var bone = new THREE.MeshLambertMaterial({ color: 0xE8DCC0, map: pyTex("stone", 1, 2) }), tops = [];
for (var j = 0; j < (L ? 6 : 9); j++) {
var s = S[(best + j * 2) % S.length], k = 1 - Math.abs(j - 4) / 7, R = s.w / 2 + 4 + k * 4;
var rib = new THREE.Mesh(new THREE.TorusGeometry(R, 0.75 + k * 0.35, L ? 6 : 8, L ? 14 : 24, Math.PI), bone);
rib.position.set(s.x, s.y - 1.2, s.z);
rib.rotation.order = "YXZ";
rib.rotation.set(-0.18, Math.atan2(s.tx, s.tz), 0);
rib.raycast = function () { };
G.add(rib);
tops.push(new THREE.Vector3(s.x, s.y - 1.2 + R, s.z));
}
for (var t = 1; t < tops.length; t++) {
var A = tops[t - 1], B = tops[t], len = A.distanceTo(B), sp = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, len, 8), bone);
sp.position.copy(A).lerp(B, 0.5);
sp.lookAt(B);
sp.rotateX(Math.PI / 2);
sp.raycast = function () { };
G.add(sp);
}
var e = S[(best + (L ? 12 : 18)) % S.length], sk = new THREE.Group();
sk.position.set(e.x + (e.w / 2 + 14) * e.tz, pyTerrain(e.x + (e.w / 2 + 14) * e.tz, e.z - (e.w / 2 + 14) * e.tx) + 1, e.z - (e.w / 2 + 14) * e.tx);
var head = new THREE.Mesh(new THREE.SphereGeometry(6, L ? 10 : 16, L ? 8 : 12), bone);
head.scale.set(1, 0.75, 1.6);
sk.add(head);
[-1, 1].forEach(function (sd) {
var horn = new THREE.Mesh(new THREE.ConeGeometry(1.2, 9, L ? 6 : 10), bone);
horn.position.set(sd * 4, 4, -2);
horn.rotation.set(-0.5, 0, sd * 0.5);
sk.add(horn);
var eye = new THREE.Mesh(new THREE.SphereGeometry(1.3, 10, 8), pyMat("matte", 0x1A1410));
eye.position.set(sd * 3, 1.2, 5.2);
sk.add(eye);
});
sk.rotation.y = Math.atan2(e.tx, e.tz) + 0.6;
sk.traverse(function (o) { o.raycast = function () { }; });
G.add(sk);
PY.ribs = S[best];
}
var sb = PYT.cuts.filter(function (s) { return s.cut === "sandbore"; })[2];
if (sb) {
var aq = new THREE.Mesh(new THREE.TorusGeometry(sb.w / 2 + 2.6, 1.1, L ? 6 : 8, L ? 12 : 20, Math.PI), new THREE.MeshLambertMaterial({ color: 0xC8A878, map: pyTex("stone", 2, 1) }));
aq.position.set(sb.x, sb.y, sb.z);
aq.rotation.y = Math.atan2(sb.tx, sb.tz);
aq.raycast = function () { };
G.add(aq);
pyPortal(G, sb, new THREE.MeshLambertMaterial({ color: 0xC8A878, map: pyTex("sand", 3, 3) }), 0xFFC870);
}
S.forEach(function (s, i) {
if (s.zone !== "dunes" || s.fl.indexOf("r") < 0 || S[(i - 1 + S.length) % S.length].fl.indexOf("r") >= 0)
return;
var p = S[(i - 6 + S.length) % S.length];
[-1, 1].forEach(function (sd) { var sg = wSign(["JUMP AHEAD", "sand chasm · full speed"], 5, 1.6, "#2A1408", "#FFC870"); sg.position.set(p.x + sd * (p.w / 2 + 2.5) * p.tz, p.y + 2.6, p.z - sd * (p.w / 2 + 2.5) * p.tx); sg.lookAt(p.x - p.tx * 20, p.y + 2.6, p.z - p.tz * 20); G.add(sg); });
});
},
function (G) {
var L = PY.lite, S = PYT.S;
var cr = new THREE.OctahedronGeometry(1, 0);
cr.scale(0.5, 1.6, 0.5);
var crA = new THREE.MeshPhongMaterial({ color: 0x5AE8E0, emissive: 0x1A8A86, shininess: 110, specular: 0xFFFFFF, transparent: true, opacity: 0.88 });
var crB = new THREE.MeshPhongMaterial({ color: 0xB07AFF, emissive: 0x5A2AA0, shininess: 110, specular: 0xFFFFFF, transparent: true, opacity: 0.88 });
var caveS = S.filter(function (s) { return s.zone === "cave" && s.fl.indexOf("e") < 0; }).concat(PYT.cuts.filter(function (s) { return s.zone === "cave" && s.w > 0; }));
[crA, crB].forEach(function (mat, mi) {
pyInstances(G, cr, mat, L ? 30 : 110, function () {
var s = caveS[Math.random() * caveS.length | 0];
if (!s)
return null;
var sd = Math.random() < 0.5 ? -1 : 1, a = s.w / 2 + 1.0 + Math.random() * 0.6;
var x = s.x + sd * a * s.tz, z = s.z - sd * a * s.tx;
return [x, s.y + 0.6 + Math.random() * (s.fl.indexOf("t") >= 0 || s.cut ? 2.6 : 5), z, Math.random() * 6, (Math.random() - 0.5) * 0.6, sd * 0.5 + (Math.random() - 0.5) * 0.4, 0.5 + Math.random() * 0.9];
});
});
var stl = new THREE.ConeGeometry(0.5, 1, 6);
stl.rotateX(Math.PI);
stl.translate(0, -0.5, 0);
var tun = S.filter(function (s) { return s.zone === "cave" && s.fl.indexOf("t") >= 0; });
if (tun.length)
pyInstances(G, stl, new THREE.MeshLambertMaterial({ color: 0x3E3850, map: pyTex("stone", 1, 2) }), L ? 20 : 60, function () {
var s = tun[Math.random() * tun.length | 0], ac = (Math.random() - 0.5) * (s.w * 0.8), R = s.w / 2 + 1.4, top = Math.sqrt(Math.max(0, R * R - ac * ac)) * 0.9;
return [s.x + ac * s.tz, s.y + top, s.z - ac * s.tx, 0, 0, 0, 0.6 + Math.random() * 0.6, 1.5 + Math.random() * 2.5, 0.6 + Math.random() * 0.6];
});
var br = S.filter(function (s) { return s.zone === "cave" && s.fl.indexOf("e") >= 0; });
if (br.length) {
var cx = 0, cz = 0, cy = 0;
br.forEach(function (s) { cx += s.x; cz += s.z; cy += s.y; });
cx /= br.length;
cz /= br.length;
cy /= br.length;
PY.hollow = { x: cx, z: cz, y: cy };
var glow = new THREE.Mesh(new THREE.CircleGeometry(300, L ? 20 : 40), new THREE.MeshBasicMaterial({ color: 0x2A1450, fog: true }));
glow.rotation.x = -Math.PI / 2;
glow.position.set(cx, PY_ABYSS - 4, cz);
glow.raycast = function () { };
G.add(glow);
var core = new THREE.Mesh(new THREE.CircleGeometry(120, L ? 16 : 32), new THREE.MeshBasicMaterial({ color: 0x4A2A8A, transparent: true, opacity: 0.7, depthWrite: false, fog: true }));
core.rotation.x = -Math.PI / 2;
core.position.set(cx, PY_ABYSS - 3.6, cz);
core.raycast = function () { };
G.add(core);
var hex = new THREE.CylinderGeometry(1, 0.7, 1, 6);
hex.translate(0, 0.5, 0);
var tip = new THREE.ConeGeometry(1, 1, 6);
tip.translate(0, 0.5, 0);
[[crA, 0x5AE8E0], [crB, 0xB07AFF]].forEach(function (pair, mi) {
var spots = [];
for (var t = 0; t < 200 && spots.length < (L ? 7 : 16); t++) {
var a = Math.random() * 6.283, r = 30 + Math.random() * 190, x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
if (pyTerrain(x, z) > PY_ABYSS + 12 || !pyClear(x, z, 9))
continue;
var w = 3 + Math.random() * 5, h = cy - PY_ABYSS - 6 + Math.random() * 34;
spots.push([x, PY_ABYSS - 6, z, Math.random() * 6, (Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.12, w, h, w]);
}
var k = 0;
pyInstances(G, hex, pair[0], spots.length, function () { return spots[k++]; });
var tips = spots.map(function (p) { return [p[0], p[1] + p[7], p[2], p[3], p[4], p[5], p[6] * 0.7, p[6] * 2.2, p[8] * 0.7]; });
k = 0;
pyInstances(G, tip, pair[0], tips.length, function () { return tips[k++]; });
});
var post = new THREE.CylinderGeometry(0.14, 0.18, 1, 8);
post.translate(0, 0.5, 0);
var lamp = new THREE.SphereGeometry(0.42, 10, 8);
var spotsL = [];
br.forEach(function (s, i) { if (i % (L ? 8 : 5) || /[cgr]/.test(s.fl))
return; [-1, 1].forEach(function (sd) { spotsL.push([s.x + sd * (s.w / 2 + 1.25) * s.tz, s.y, s.z - sd * (s.w / 2 + 1.25) * s.tx]); }); });
var k2 = 0;
pyInstances(G, post, pyMat("chrome", 0x5A5A66), spotsL.length, function () { var p = spotsL[k2++]; return [p[0], p[1], p[2], 0, 0, 0, 1, 3.6, 1]; });
k2 = 0;
pyInstances(G, lamp, pyMat("glow", 0xFFC870), spotsL.length, function () { var p = spotsL[k2++]; return [p[0], p[1] + 3.8, p[2]]; });
br.forEach(function (s, i) {
if (s.fl.indexOf("r") < 0 || br[i - 1] && br[i - 1].fl.indexOf("r") >= 0)
return;
[-1, 1].forEach(function (sd) { var sg = wSign(["THE BRIDGE IS OUT", "jump it, or go round"], 5, 1.6, "#140A24", "#B07AFF"); sg.position.set(s.x + sd * (s.w / 2 + 2.2) * s.tz, s.y + 2.8, s.z - sd * (s.w / 2 + 2.2) * s.tx); sg.lookAt(s.x - s.tx * 20, s.y + 2.8, s.z - s.tz * 20); G.add(sg); });
});
}
var cv = PYT.cuts.filter(function (s) { return s.cut === "crystalvein"; });
if (cv.length > 3) {
for (var q = 0; q < (L ? 8 : 18); q++) {
var s = cv[1 + (q % 3)], up = Math.random() * 7, sd = 1;
var c = new THREE.Mesh(cr, crA);
c.position.set(s.x + sd * (s.w / 2 + 1.4) * s.tz + (Math.random() - 0.5) * 3, s.y + 0.6 + up, s.z - sd * (s.w / 2 + 1.4) * s.tx + (Math.random() - 0.5) * 3);
c.rotation.set(Math.random(), Math.random() * 6, Math.random());
c.scale.setScalar(0.6 + Math.random() * 0.8);
c.raycast = function () { };
G.add(c);
}
pyPortal(G, cv[2], new THREE.MeshLambertMaterial({ color: 0x3E3850, map: pyTex("stone", 3, 3) }), 0x5AE8E0);
}
},
function (G) {
var L = PY.lite, S = PYT.S, R = PY_SEAR;
var st = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#1E4E6A";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 140; i++) {
x.strokeStyle = "rgba(200,230,240," + (0.08 + Math.random() * 0.16) + ")";
x.lineWidth = 1 + Math.random() * 2;
x.beginPath();
var px = Math.random() * W, py = Math.random() * H;
x.moveTo(px, py);
x.quadraticCurveTo(px + 10, py - 4, px + 24 + Math.random() * 20, py);
x.stroke();
}
}, [12, 10]);
var sea = new THREE.Mesh(new THREE.PlaneGeometry(R.x1 - R.x0, R.z1 - R.z0, 1, 1), new THREE.MeshPhongMaterial({ color: 0x6A9AB0, map: st, shininess: 90, specular: 0x8AB0C0, transparent: true, opacity: 0.94 }));
sea.rotation.x = -Math.PI / 2;
sea.position.set((R.x0 + R.x1) / 2, PY_SEA, (R.z0 + R.z1) / 2);
sea.raycast = function () { };
G.add(sea);
PY.seaTex = st;
var co = pyRunsOf(function (s) { return s.zone === "coast"; });
var foamM = new THREE.MeshBasicMaterial({ color: 0xF0F6F8, transparent: true, opacity: 0.45, depthWrite: false, fog: true });
co.forEach(function (r) { var m = pyRibbonY(S, r.a, Math.min(S.length - 1, r.b + 1), function (s) { return s.w / 2 + 4; }, function (s) { return s.w / 2 + 9; }, function () { return PY_SEA + 0.08; }, foamM); if (m)
G.add(m); });
var bol = new THREE.CylinderGeometry(0.35, 0.42, 1, 8);
bol.translate(0, 0.5, 0);
var bs = [];
S.forEach(function (s, i) { if (s.zone !== "coast" || i % 4 || s.slab)
return; [-1, 1].forEach(function (sd) { bs.push([s.x + sd * (s.w / 2 + 0.9) * s.tz, s.y, s.z - sd * (s.w / 2 + 0.9) * s.tx]); }); });
var k = 0;
pyInstances(G, bol, new THREE.MeshLambertMaterial({ color: 0x8A887E, map: pyTex("stone", 1, 1) }), bs.length, function () { var p = bs[k++]; return [p[0], p[1], p[2], 0, 0, 0, 1, 1.1, 1]; });
var stack = new THREE.CylinderGeometry(4, 7, 1, L ? 7 : 11, 3);
stack.translate(0, 0.5, 0);
var sp = stack.attributes.position;
for (var i = 0; i < sp.count; i++) {
var y = sp.getY(i), a = Math.atan2(sp.getZ(i), sp.getX(i)), f = 1 + 0.2 * Math.sin(a * 3 + y * 4) + 0.1 * Math.sin(a * 7);
sp.setX(i, sp.getX(i) * f);
sp.setZ(i, sp.getZ(i) * f);
}
stack.computeVertexNormals();
pyInstances(G, stack, new THREE.MeshLambertMaterial({ color: 0x6A665E, map: pyTex("stone", 1, 3) }), L ? 8 : 22, function () {
for (var t = 0; t < 20; t++) {
var x = R.x0 + Math.random() * (R.x1 - R.x0), z = R.z0 + Math.random() * (R.z1 - R.z0);
if (pySeaK(x, z) < 0.7 || pyTerrain(x, z) > -1 || !pyClear(x, z, 30))
continue;
return [x, -6, z, Math.random() * 6, 0, (Math.random() - 0.5) * 0.15, 0.7 + Math.random() * 0.9, 18 + Math.random() * 26, 0.7 + Math.random() * 0.9];
}
return null;
});
var lh = null;
S.forEach(function (s) { if (lh || s.zone !== "coast" || Math.hypot(s.x + 1240, s.z - 230) > 80)
return; lh = s; });
if (lh) {
var lx = lh.x - (lh.w / 2 + 40) * lh.tz, lz = lh.z + (lh.w / 2 + 40) * lh.tx, ly = pyTerrain(lx, lz), T = new THREE.Group();
T.position.set(lx, ly - 1, lz);
for (var b = 0; b < 6; b++) {
var band = new THREE.Mesh(new THREE.CylinderGeometry(3.2 - b * 0.28, 3.4 - b * 0.28, 5, L ? 12 : 20), pyMat("lambert", b % 2 ? 0xC82A22 : 0xF0EEE8));
band.position.y = 2.5 + b * 5;
T.add(band);
}
var gal = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 0.4, L ? 12 : 20), pyMat("chrome", 0x3A3A40));
gal.position.y = 30.4;
T.add(gal);
var lampR = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 3, L ? 10 : 16), pyMat("glow", 0xFFE8A8, { op: 0.92 }));
lampR.position.y = 32.2;
T.add(lampR);
var cap = new THREE.Mesh(new THREE.ConeGeometry(2.2, 2.4, L ? 10 : 16), pyMat("lambert", 0xC82A22));
cap.position.y = 34.9;
T.add(cap);
var keeper = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 6), pyMat("lambert", 0xE8E4DA));
keeper.position.set(6, 2.5, 0);
T.add(keeper);
var kr = new THREE.Mesh(new THREE.ConeGeometry(6, 3, 4), pyMat("lambert", 0x5A3A2A));
kr.position.set(6, 6.5, 0);
kr.rotation.y = Math.PI / 4;
T.add(kr);
T.traverse(function (o) { o.raycast = function () { }; });
G.add(T);
}
var wr = null;
S.forEach(function (s) { if (wr || s.zone !== "coast" || Math.hypot(s.x + 1000, s.z - 95) > 70)
return; wr = s; });
if (wr) {
var wx = wr.x + (wr.w / 2 + 38) * wr.tz, wz = wr.z - (wr.w / 2 + 38) * wr.tx, W = new THREE.Group();
W.position.set(wx, PY_SEA - 1.2, wz);
W.rotation.set(0.12, Math.random() * 6, 0.28);
var hull = new THREE.Mesh(new THREE.SphereGeometry(1, L ? 12 : 20, L ? 8 : 12, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5), new THREE.MeshLambertMaterial({ color: 0x5A3A24, map: pyTex("wood", 3, 1), side: THREE.DoubleSide }));
hull.scale.set(5, 4, 16);
W.add(hull);
var deck = new THREE.Mesh(new THREE.BoxGeometry(9, 0.4, 26), new THREE.MeshLambertMaterial({ color: 0x6A4A2E, map: pyTex("wood", 2, 6) }));
deck.position.y = -0.2;
W.add(deck);
var mast = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 14, 8), pyMat("lambert", 0x4A3420));
mast.position.set(0, 6, -2);
mast.rotation.z = 0.5;
W.add(mast);
W.traverse(function (o) { o.raycast = function () { }; });
G.add(W);
}
var sc = PYT.cuts.filter(function (s) { return s.cut === "seacave"; });
if (sc.length > 3) {
var m0 = sc[2], lp = new THREE.Group(), px = m0.x - (m0.w / 2 + 1.6) * m0.tz, pz = m0.z + (m0.w / 2 + 1.6) * m0.tx;
lp.position.set(px, m0.y, pz);
var p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 3.4, 8), pyMat("lambert", 0x3A2A1A));
p2.position.y = 1.7;
lp.add(p2);
var ln = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.5), pyMat("glow", 0xFFC870, { op: 0.95 }));
ln.position.y = 3.6;
lp.add(ln);
lp.traverse(function (o) { o.raycast = function () { }; });
G.add(lp);
pyPortal(G, m0, new THREE.MeshLambertMaterial({ color: 0x6A665E, map: pyTex("stone", 3, 3) }), 0xFFC870);
}
},
function (G) {
var c = PYT.cuts.filter(function (s) { return s.cut === "rimecol"; });
if (c.length < 3)
return;
var s = c[2], x = s.x - (s.w / 2 + 3) * s.tz, z = s.z + (s.w / 2 + 3) * s.tx, y = pyGround(x, z);
var stone = new THREE.MeshLambertMaterial({ color: 0x8A8E96, map: pyTex("stone", 1, 1) });
for (var i = 0; i < 6; i++) {
var r = 1.1 - i * 0.15, b = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0), stone);
b.position.set(x, y + 0.6 + i * r * 1.3, z);
b.rotation.set(i, i * 2, 0);
b.raycast = function () { };
G.add(b);
}
var sg = wSign(["THE RIME COL", "no rails · narrow · fast"], 3.6, 1.1, "#1A2430", "#E8F4FF");
sg.position.set(x, y + 4.6, z);
sg.lookAt(s.x - s.tx * 20, y + 4.6, s.z - s.tz * 20);
G.add(sg);
},
function (s, H) {
var hz = { k: H.k, kind: H.kind, name: H.name, s: s, t: 0, hit: {}, H: H, x: s.x, z: s.z, y: s.y };
var g = new THREE.Group(), rot = Math.atan2(s.tx, s.tz);
if (H.k === "sweep") {
var sd = H.sea ? 1 : (Math.random() < 0.5 ? -1 : 1), edge = s.w / 2 + 16;
hz.ac0 = sd * edge;
hz.ac1 = -sd * edge;
hz.ac = hz.ac0;
hz.dur = (edge * 2) / H.spd;
hz.sd = sd;
if (H.kind === "avalanche") {
var snow = new THREE.MeshLambertMaterial({ color: 0xF0F4FA, map: pyTex("snow", 2, 1), transparent: true, opacity: 0 });
hz.mats = [snow];
var bx = new THREE.Mesh(new THREE.BoxGeometry(5, 2.6, H.len), snow);
bx.position.y = 1.3;
g.add(bx);
for (var i = 0; i < (PY.lite ? 3 : 6); i++) {
var lump = new THREE.Mesh(new THREE.DodecahedronGeometry(1.4 + Math.random(), 0), snow);
lump.position.set((Math.random() - 0.5) * 3, 2.4, (Math.random() - 0.5) * H.len * 0.9);
g.add(lump);
}
}
else if (H.kind === "wave") {
var wm = new THREE.MeshPhongMaterial({ color: 0x5A9AB8, shininess: 100, specular: 0xFFFFFF, transparent: true, opacity: 0 }), fm = new THREE.MeshBasicMaterial({ color: 0xF4FAFC, transparent: true, opacity: 0, depthWrite: false, fog: true });
hz.mats = [wm, fm];
var body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1, H.len), wm);
body.position.y = 1.4;
body.scale.y = 2.8;
g.add(body);
var foam = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, H.len * 0.98), fm);
foam.position.set(-sd * 1.2, 2.9, 0);
g.add(foam);
hz.foam = foam;
}
else if (H.kind === "twister" || H.kind === "devil") {
var big = H.kind === "twister", tm = new THREE.MeshLambertMaterial({ color: H.col, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
hz.mats = [tm];
var outer = new THREE.Mesh(new THREE.CylinderGeometry(big ? 3.6 : 2.2, 0.5, big ? 14 : 8, PY.lite ? 10 : 16, 4, true), tm);
outer.position.y = big ? 7 : 4;
g.add(outer);
var inner = new THREE.Mesh(new THREE.CylinderGeometry(big ? 2.2 : 1.3, 0.3, big ? 11 : 6, PY.lite ? 8 : 12, 1, true), tm);
inner.position.y = big ? 5.5 : 3;
g.add(inner);
hz.spin = [outer, inner];
}
else {
var tin = pyMat("chrome", 0x8A9098);
hz.mats = [];
for (var j = 0; j < 3; j++) {
var sh = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 1.6), tin);
sh.position.set(0, 1 + j * 0.8, (j - 1) * 1.2);
g.add(sh);
}
hz.spin = g.children.slice();
}
}
else {
hz.dur = 1.9;
hz.warn = 1.6;
var ac = (Math.random() - 0.5) * s.w * 0.7;
hz.x = s.x + ac * s.tz;
hz.z = s.z - ac * s.tx;
hz.r = H.r;
var rm = new THREE.MeshBasicMaterial({ color: H.col, transparent: true, opacity: 0, depthWrite: false, fog: true });
var ring = new THREE.Mesh(new THREE.RingGeometry(0.75, 1, PY.lite ? 20 : 36), rm);
ring.rotation.x = -Math.PI / 2;
ring.position.set(PY.base + hz.x, s.y + 0.09, hz.z);
ring.scale.setScalar(0.2);
ring.raycast = function () { };
scene.add(ring);
hz.ring = ring;
var cm = new THREE.MeshBasicMaterial({ color: H.col, transparent: true, opacity: 0, depthWrite: false, fog: true });
hz.mats = [cm];
var col = new THREE.Mesh(new THREE.CylinderGeometry(hz.r * 0.55, hz.r * 0.85, 1, PY.lite ? 10 : 16, 1, true), cm);
col.position.y = 0.5;
g.add(col);
g.scale.set(1, 0.01, 1);
hz.col = col;
rot = 0;
}
g.rotation.y = rot;
g.traverse(function (o) { o.raycast = function () { }; });
scene.add(g);
hz.m = g;
pyHaz2Place(hz);
PY.hz2.push(hz);
if (H.k === "sweep") {
var side = hz.sd > 0 ? "right" : "left";
pyFeed({ avalanche: "❄️ <b>Avalanche!</b> Snow pours in from the " + side, wave: "🌊 <b>A wave</b> breaks over the road from the " + side, twister: "🌪️ <b>A sand twister</b> crosses from the " + side, devil: "🌪️ A dust devil from the " + side, debris: "💨 Debris flies in from the " + side }[H.kind] || "Look out!", "#E8C66A");
}
},
function (dt) {
if (!PY.hz2)
PY.hz2 = [];
var M = PY.me;
if (pyDriving() && M.wreckT <= 0 && PY.hz2.length < (PY.lite ? 3 : 6)) {
var P = camera.position, n = pyNear(P.x - PY.base, P.z, M.y);
if (n && n.s.main) {
var L = PY_HAZ2[n.zone];
PY.hz2T = (PY.hz2T || 3) - dt;
if (L && PY.hz2T <= 0) {
var H = L[Math.random() * L.length | 0], race = PY.race && PY.race.st === "on";
PY.hz2T = H.every * (0.7 + Math.random() * 0.7) * (race ? 1 : 1.5);
var ahead = Math.max(55, Math.abs(DRIVE.v) * (H.k === "sweep" ? 2.1 : 1.7)) + Math.random() * 35, S = PYT.S, s = S[(n.s.i + Math.round(ahead / 4)) % S.length];
if (s.zone === n.zone && !/[gcr]/.test(s.fl) && !s.slab && !(H.kind === "avalanche" && s.fl.indexOf("e") >= 0))
pyHaz2Spawn(s, H);
}
}
}
var A = pyActors();
for (var i = PY.hz2.length - 1; i >= 0; i--) {
var h = PY.hz2[i], H = h.H, s = h.s;
h.t += dt;
var fadeIn = Math.min(1, h.t / 0.5), done = false;
if (h.k === "sweep") {
var u = Math.min(1, h.t / h.dur), fadeOut = Math.max(0, Math.min(1, (1 - u) / 0.15));
h.ac = h.ac0 + (h.ac1 - h.ac0) * u;
if (h.kind === "twister" || h.kind === "devil")
h.ac += Math.sin(h.t * 1.3) * 2;
pyHaz2Place(h);
var op = Math.min(fadeIn, fadeOut);
(h.mats || []).forEach(function (m, mi) { m.opacity = op * (h.kind === "wave" ? (mi ? 0.75 : 0.62) : h.kind === "avalanche" ? 0.95 : 0.42); });
if (h.spin)
h.spin.forEach(function (o, k) { if (h.kind === "debris") {
o.rotation.x += dt * (3 + k);
o.rotation.z += dt * (2 + k);
}
else
o.rotation.y += dt * (4 + k * 2); });
if (h.kind === "wave") {
var hh = 0.8 + 2.4 * Math.sin(Math.min(1, u * 1.15) * Math.PI * 0.5 + 0.6);
h.m.children[0].scale.y = hh;
h.m.children[0].position.y = hh / 2;
h.foam.position.y = hh + 0.1;
}
if (Math.random() < dt * (PY.lite ? 2 : 5)) {
var al = (Math.random() - 0.5) * H.len;
pySoft(h.x + al * s.tx, s.y + 0.8, h.z + al * s.tz, h.kind === "wave" ? 0xE8F4F8 : H.col, h.kind === "avalanche" ? 4 : 2.4, 1.2);
}
A.forEach(function (b) {
if (h.hit[b.id] || b.st.air || b.st.phase > 0)
return;
var dx = b.x - s.x, dz = b.z - s.z, al = dx * s.tx + dz * s.tz, ac = dx * s.tz - dz * s.tx;
if (Math.abs(al) > H.len / 2 + 1.6 || Math.abs(ac - h.ac) > 2.4 || Math.abs(b.y - s.y) > 3)
return;
h.hit[b.id] = 1;
var dir = h.ac1 > h.ac0 ? 1 : -1;
pyHit(b, H.dmg, { id: "road", name: "the road" }, H.name);
if (H.push)
pyPush(b, dir * H.push * s.tz, -dir * H.push * s.tx);
if (H.spin)
pyAffect(b, "spin", H.spin);
if (H.slow)
pyAffect(b, "slow", H.slow);
});
done = u >= 1;
}
else {
if (h.t < h.warn) {
var w = h.t / h.warn;
h.ring.material.opacity = 0.12 + 0.5 * w;
h.ring.scale.setScalar(h.r * (0.3 + 0.7 * w));
}
else {
var e = h.t - h.warn, k2 = Math.min(1, e / 0.35), out = Math.max(0, Math.min(1, (h.dur - e) / 0.6));
h.ring.material.opacity = 0.6 * out;
h.m.scale.set(1, Math.max(0.01, (h.kind === "crystal" ? 7 : 13) * k2), 1);
h.mats[0].opacity = 0.55 * out * k2;
if (Math.random() < dt * (PY.lite ? 4 : 9))
pySoft(h.x + (Math.random() - 0.5) * h.r, s.y + 2 + Math.random() * 8 * k2, h.z + (Math.random() - 0.5) * h.r, H.col, 2 + Math.random() * 2, 1);
A.forEach(function (b) {
if (b.st.phase > 0 || Math.hypot(b.x - h.x, b.z - h.z) > h.r + 1 || Math.abs(b.y - s.y) > 4)
return;
pyHit(b, H.dmg / h.dur * dt * (b.me ? 1 : 1), { id: "road", name: "the road" }, H.name);
if (!h.hit[b.id]) {
h.hit[b.id] = 1;
if (H.lift && !b.st.air) {
if (b.me) {
PY.me.air = true;
PY.me.vy = H.lift;
PY.me.airT = 0;
}
else if (!b.ghost) {
b.st.air = true;
b.st.vy = H.lift;
}
}
if (H.frz)
pyAffect(b, "frozen", H.frz);
if (H.slow)
pyAffect(b, "slow", H.slow);
}
});
done = e >= h.dur;
}
}
if (done) {
pyGone(h.m);
pyGone(h.ring);
PY.hz2.splice(i, 1);
}
}
},
function (G) {
var geo = new THREE.OctahedronGeometry(0.75, 0), halo = pySoftTex(), cols = [0x3AE8F0, 0xFFD23A, 0xFF6AD8, 0x7AFF9A, 0xA87AFF];
(PYT.cells || []).forEach(function (c, i) {
var g = new THREE.Group();
g.position.set(c.x, c.y, c.z);
var col = cols[(c.i + i) % cols.length];
var core = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 0.55, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.92 }));
g.add(core);
var ring = new THREE.Mesh(pyGeo("ring"), pyMat("glow", col, { op: 0.6 }));
ring.scale.setScalar(1.1);
ring.rotation.x = Math.PI / 2;
g.add(ring);
if (!PY.lite) {
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: halo, color: col, transparent: true, opacity: 0.35, depthWrite: false }));
sp.scale.setScalar(3.4);
g.add(sp);
}
g.traverse(function (o) { o.raycast = function () { }; });
G.add(g);
c.m = g;
c.core = core;
c.ring = ring;
c.taken = 0;
c.show = 1;
});
},
function (dt) {
var C = PYT.cells || [], drv = pyDriving(), M = PY.me, P = camera.position, me = drv && M.wreckT <= 0 ? { x: P.x - PY.base, z: P.z, y: M.y } : null;
for (var i = 0; i < C.length; i++) {
var c = C[i];
if (!c.m)
continue;
if (c.taken > 0) {
c.taken -= dt;
}
var want = c.taken > 0 ? 0 : 1;
c.show += (want - c.show) * Math.min(1, dt * (want ? 1.2 : 6));
c.m.visible = c.show > 0.02;
if (!c.m.visible)
continue;
c.m.scale.setScalar(c.show);
c.core.rotation.y += dt * 1.1;
c.ring.rotation.z += dt * 0.6;
c.m.position.y = c.y + Math.sin(PY.t * 1.4 + i) * 0.18;
if (c.taken > 0)
continue;
if (me && !M.pow && Math.abs(me.x - c.x) < 3 && Math.abs(me.z - c.z) < 3 && Math.hypot(me.x - c.x, me.z - c.z) < 2.6 && Math.abs(me.y + 1.2 - c.y) < 2.6) {
c.taken = 9;
M.pow = pyPowRoll();
var W = PY_POW[M.pow];
pyFeed(W.icon + " <b>" + esc(W.name) + "</b> · " + esc(W.say) + (pyTouch() ? " · tap <b>Power</b>" : pyVR() ? " · right stick down" : " · press <b>B</b>"), "#FFD27A");
if (typeof playTone === "function")
try {
playTone(760, 0.08);
}
catch (e) { }
continue;
}
for (var k = 0; k < PY.riv.length; k++) {
var R = PY.riv[k];
if (R.dead || R.pow)
continue;
if (Math.abs(R.x - c.x) < 2.6 && Math.abs(R.z - c.z) < 2.6 && Math.abs(R.y + 1.2 - c.y) < 2.6) {
c.taken = 9;
R.pow = pyPowRoll();
R.powT = 0.8 + Math.random() * 2.5;
break;
}
}
}
},
function (a, k) {
var st = a.st, W = PY_POW[k];
if (!W)
return false;
var f = pyFwd(a), L = ((PY_STYLE[a.car.style] || PY_STYLE.wedge).L || 4.4) / 2;
switch (k) {
case "overdrive":
st.boost = Math.max(st.boost || 0, 3);
pySoft(a.x - f.x * L, a.y + 0.6, a.z - f.z * L, 0xFFD23A, 2.2, 0.8);
break;
case "hop":
if (st.air)
return false;
st.air = true;
st.vy = 15;
st.airT = 0;
pySoft(a.x, a.y + 0.2, a.z, 0x7AFF9A, 3, 1);
break;
case "tremor":
pyRing(a.x, a.y + 0.5, a.z, 22, 0xFF8A3A);
pySoft(a.x, a.y + 0.5, a.z, 0xC8A070, 6, 1.4);
pyActorsNear(a.x, a.z, a.y, 22, a).forEach(function (b) { var dx = b.x - a.x, dz = b.z - a.z, d = Math.hypot(dx, dz) || 1; pyHit(b, 12, a, "a Tremor"); pyPush(b, dx / d * 18, dz / d * 18); pyAffect(b, "spin", 0.8); });
break;
case "swarm":
var tgt = pyTargetAhead(a, 240, 0.9);
for (var i = 0; i < 6; i++) {
var sp = (i - 2.5) * 0.12, ca = Math.cos(sp), sa = Math.sin(sp), dx = f.x * ca - f.z * sa, dz = f.z * ca + f.x * sa, v = 55 + Math.max(0, a.v || 0);
pyShot({ kind: "swarm", x: a.x + dx * (L + 1), y: a.y + 1.4, z: a.z + dz * (L + 1), vx: dx * v, vz: dz * v, vy: 1.5, spd: v, dmg: 8, home: 4, tgt: tgt, owner: a.id, col: 0xFFB83A, life: 4.5 });
}
break;
case "aegis":
st.shield = Math.max(st.shield || 0, 5);
break;
case "patch":
st.hp = Math.min(st.max || 100, (st.hp || 0) + 50);
pySoft(a.x, a.y + 1.2, a.z, 0x9AE8A0, 3, 1.1);
break;
case "ghost":
st.phase = Math.max(st.phase || 0, 3);
break;
case "blackice":
pyDrop({ kind: "blackice", x: a.x - f.x * (L + 3), z: a.z - f.z * (L + 3), y: pyGround(a.x - f.x * (L + 3), a.z - f.z * (L + 3), a.y + 1), life: 16, owner: a.id });
break;
case "timewarp":
pyRing(a.x, a.y + 0.6, a.z, 60, 0xE07AFF);
pyActors().forEach(function (b) { if (b.id === a.id)
return; if (Math.hypot(b.x - a.x, b.z - a.z) < 60 && Math.abs(b.y - a.y) < 10)
pyAffect(b, "slow", 3); });
break;
}
if (a.me) {
pyNetSend({ t: "pow", p: k, x: Math.round(a.x), z: Math.round(a.z), h: +a.h.toFixed(3) });
pyFeed(W.icon + " " + esc(W.name) + "!", "#FFD27A");
if (typeof playTone === "function")
try {
playTone(520, 0.12);
}
catch (e) { }
}
return true;
},
function () {
if (!pyDriving() || PY.me.wreckT > 0)
return;
var M = PY.me;
if (!M.pow) {
pySay("No power held. Drive through a glowing <b>power cell</b> over the road to pick one up.");
return;
}
if (PY.race && PY.race.st === "count")
return;
if (M.stun > 0) {
pySay("Stunned: the power will not fire for a moment.");
return;
}
if (!pyArmsAllowed() && PY_POW_SAFE.indexOf(M.pow) < 0) {
pySay("No weapons in this race: that power will keep for the next one.");
return;
}
var k = M.pow;
if (pyPowUse(pyMeActor(), k))
M.pow = null;
},
function (R, dt) {
if (!R.pow || R.dead)
return;
var race = PY.race;
if (!race || race.st !== "on")
return;
R.powT -= dt;
if (R.powT > 0)
return;
var st = R.st, k = R.pow, use = false;
var near = pyActorsNear(R.x, R.z, R.y, 18, R).length, ahead = pyTargetAhead(R, 200, 0.5);
var incoming = PY.shots.some(function (s) { return s.owner !== R.id && Math.hypot(s.x - R.x, s.z - R.z) < 40; });
var S = PYT.S, gapAhead = false;
for (var q = 1; q < 8; q++) {
if (pyRivAhead(R, q).fl.indexOf("g") >= 0)
gapAhead = true;
}
if (k === "overdrive")
use = true;
else if (k === "hop")
use = gapAhead || PY.hz2 && PY.hz2.some(function (h) { return Math.hypot(h.x - R.x, h.z - R.z) < 14; });
else if (k === "tremor")
use = near > 0;
else if (k === "swarm")
use = !!ahead;
else if (k === "aegis" || k === "ghost")
use = incoming || st.hp < st.max * 0.35;
else if (k === "patch")
use = st.hp < st.max * 0.6;
else if (k === "blackice")
use = pyActors().some(function (b) { if (b.id === R.id)
return false; var dx = b.x - R.x, dz = b.z - R.z, f = pyFwd(R), al = dx * f.x + dz * f.z; return al < -4 && al > -50; });
else if (k === "timewarp")
use = pyActorsNear(R.x, R.z, R.y, 50, R).length > 0;
if (!use && R.powT < -8)
use = true;
if (use) {
if (!pyArmsAllowed() && PY_POW_SAFE.indexOf(k) < 0) {
R.pow = null;
return;
}
if (pyPowUse(R, k)) {
R.pow = null;
}
else
R.powT = 0.5;
}
else
R.powT = 0.4;
},
function (dt, inp, vf, onRoad) {
var M = PY.me, D = DRIVE;
if (M.wreckT > 0)
return;
var sliding = inp.hand && Math.abs(vf) > 10 && Math.abs(D.sIn || 0) > 0.2 && onRoad && !M.air;
if (sliding) {
M.drift = Math.min(2.4, (M.drift || 0) + dt);
M.sparkT = (M.sparkT || 0) - dt;
if (M.drift > 0.8 && M.sparkT <= 0) {
M.sparkT = PY.lite ? 0.14 : 0.07;
var P = camera.position, h = D.h, bx = -Math.sin(h), bz = -Math.cos(h), L = ((PY_STYLE[M.car.style] || PY_STYLE.wedge).L || 4.4) / 2, W = ((PY_STYLE[M.car.style] || PY_STYLE.wedge).W || 2) / 2;
[-1, 1].forEach(function (sd) { pySoft(P.x - PY.base - bx * L + sd * W * -bz, M.y + 0.25, P.z - bz * L + sd * W * bx, M.drift >= 1.6 ? 0xFFC83A : 0x5AB8FF, 0.7, 0.35); });
}
}
else if (M.drift > 0 && !inp.hand) {
if (M.drift >= 0.8) {
var b = M.drift >= 1.6 ? 1.5 : 0.8;
M.boost = Math.max(M.boost, b);
pyFeed(M.drift >= 1.6 ? "🔶 <b>Gold drift boost!</b>" : "🔷 Drift boost", "#FFD27A");
}
M.drift = 0;
}
else if (M.drift > 0)
M.drift = Math.max(0, M.drift - dt * 1.5);
M.slipT = M.slipT || 0;
if (M.slipT < 0)
M.slipT = Math.min(0, M.slipT + dt);
else if (Math.abs(vf) > 18 && !M.air) {
var P2 = camera.position, me = { x: P2.x - PY.base, z: P2.z }, fx = -Math.sin(D.h), fz = -Math.cos(D.h), tucked = false;
pyActors().forEach(function (b) { if (tucked || b.me)
return; var dx = b.x - me.x, dz = b.z - me.z, al = dx * fx + dz * fz, ac = Math.abs(dx * fz - dz * fx); if (al > 4 && al < 26 && ac < 2.4 && Math.abs(b.y - M.y) < 2)
tucked = true; });
if (tucked) {
M.slipT += dt;
if (M.slipT > 1.1) {
M.boost = Math.max(M.boost, 1.4);
M.slipT = -2.5;
pyFeed("💨 <b>Slipstream!</b>", "#BFE8FF");
}
}
else
M.slipT = Math.max(0, M.slipT - dt * 2);
}
},
function (r, b) {
var G = PY.ghosts[r.from];
if (!G)
return;
var a = { id: r.from, x: b.x, y: G.y, z: b.z, h: b.h, v: G.v, st: {}, car: G.car, ghost: true }, f = pyFwd(a);
if (b.p === "tremor")
pyRing(b.x, G.y + 0.5, b.z, 22, 0xFF8A3A);
else if (b.p === "timewarp")
pyRing(b.x, G.y + 0.6, b.z, 60, 0xE07AFF);
else if (b.p === "blackice")
pyDrop({ kind: "blackice", x: b.x + Math.sin(b.h) * 5, z: b.z + Math.cos(b.h) * 5, y: pyGround(b.x, b.z, G.y + 1), life: 16, owner: r.from, remote: 1 });
else if (b.p === "overdrive")
pySoft(b.x, G.y + 0.6, b.z, 0xFFD23A, 2.2, 0.8);
else if (b.p === "patch")
pySoft(b.x, G.y + 1.2, b.z, 0x9AE8A0, 3, 1.1);
else if (b.p === "swarm") {
for (var i = 0; i < 6; i++) {
var sp = (i - 2.5) * 0.12, ca = Math.cos(sp), sa = Math.sin(sp), dx = f.x * ca - f.z * sa, dz = f.z * ca + f.x * sa;
pyShot({ kind: "swarm", x: b.x + dx * 3, y: G.y + 1.4, z: b.z + dz * 3, vx: dx * 60, vz: dz * 60, vy: 1.5, spd: 60, dmg: 0, home: 0, owner: r.from, col: 0xFFB83A, life: 2.5 });
}
}
},
function (G) {
var at = {};
Object.keys(PY_EVENTS).forEach(function (k) {
var E = PY_EVENTS[k];
if (!E.sprint)
return;
var a = E.sprint.from, b = E.sprint.to;
(at[a] = at[a] || { start: [], end: [] }).start.push(E.name);
if (b !== null)
(at[b] = at[b] || { start: [], end: [] }).end.push(E.name);
});
var chk = wTex(256, 32, function (x, W, H) { for (var i = 0; i < 16; i++)
for (var j = 0; j < 2; j++) {
x.fillStyle = (i + j) % 2 ? "#E8E8E8" : "#1A1A1A";
x.fillRect(i * 16, j * 16, 16, 16);
} });
Object.keys(at).forEach(function (k) {
var d = pyMainDistAt(+k), R = { d: d }, A = pySampleAt(R), s = A.s;
if (!s)
return;
var g = new THREE.Group();
g.position.set(A.x, A.y, A.z);
g.rotation.y = Math.atan2(s.tx, s.tz);
var w = s.w / 2 + 1.4, dark = pyMat("chrome", 0x3A3A42);
[-1, 1].forEach(function (sd) { var post = new THREE.Mesh(new THREE.BoxGeometry(0.9, 8.5, 0.9), dark); post.position.set(sd * w, 4.25, 0); g.add(post); });
var beam = new THREE.Mesh(new THREE.BoxGeometry(w * 2 + 0.9, 0.8, 0.9), dark);
beam.position.y = 8.4;
g.add(beam);
var strip = new THREE.Mesh(new THREE.BoxGeometry(w * 2, 0.18, 0.2), pyMat("glow", 0x3AFFC0, { op: 0.9 }));
strip.position.set(0, 7.9, -0.5);
g.add(strip);
var lines = [];
if (at[k].end.length)
lines.push("FINISH · " + at[k].end.join(" · ").toUpperCase());
if (at[k].start.length)
lines.push("START · " + at[k].start.join(" · ").toUpperCase());
var sg = wSign(lines, Math.min(w * 2, 15), 2.2, "#101418", "#3AFFC0");
sg.position.set(0, 10, -0.5);
sg.rotation.y = Math.PI;
g.add(sg);
var sg2 = wSign(lines, Math.min(w * 2, 15), 2.2, "#101418", "#3AFFC0");
sg2.position.set(0, 10, 0.5);
g.add(sg2);
var line = new THREE.Mesh(new THREE.PlaneGeometry(s.w, 1.6), new THREE.MeshLambertMaterial({ map: chk }));
line.rotation.x = -Math.PI / 2;
line.position.y = 0.07;
g.add(line);
g.traverse(function (o) { o.raycast = function () { }; });
G.add(g);
});
},
function () {
if (PY.tg)
return PY.tg;
var out = [];
PY_CUTS.forEach(function (C) {
if (!C.tangle)
return;
var list = PYT.cuts.filter(function (s) { return s.cut === C.k; });
if (list.length < 2)
return;
var ld = 0;
list.forEach(function (s, i) { if (i)
ld += Math.hypot(s.x - list[i - 1].x, s.z - list[i - 1].z, s.y - list[i - 1].y); s.ld = ld; });
var dF = pyMainDistAt(C.from), dT = pyMainDistAt(C.to);
if (dT < dF)
dT += PYT.L;
out.push({ C: C, k: C.k, list: list, len: ld, dFrom: dF, dTo: dT, col: PY_TG_COL[C.k] || 0xE8E8E8 });
});
out.forEach(function (R) {
R.list.forEach(function (s) {
var c = PYT.cell, G2 = PYT.grid[Math.floor(s.x / c) + "," + Math.floor(s.z / c)];
if (!G2 || s.w <= 0)
return;
for (var q = 0; q < G2.length; q++) {
var t = PYT.all[G2[q]];
if (t === s || t.w <= 0 || (t.cut === s.cut && !t.main && !s.main))
continue;
if (Math.abs(t.y - s.y) < 1.5 && Math.hypot(t.x - s.x, t.z - s.z) < (s.w + t.w) / 2 + 0.5) {
s.jn = 1;
return;
}
}
});
});
PY.tg = out;
return out;
},
function (R) {
var B = R.br, L = B.R.list, u = Math.max(0, Math.min(B.R.len - 0.01, B.u)), j = B.j || 0;
while (j < L.length - 2 && L[j + 1].ld <= u)
j++;
while (j > 0 && L[j].ld > u)
j--;
B.j = j;
var s = L[j], n = L[j + 1], span = n.ld - s.ld, f = span > 0 ? (u - s.ld) / span : 0;
return { s: s, n: n, f: f, y: s.y + (n.y - s.y) * f, x: s.x + (n.x - s.x) * f, z: s.z + (n.z - s.z) * f, tx: s.tx, tz: s.tz, w: s.w || n.w };
},
function (R, delta, d0) {
if (R.br) {
var B = R.br;
B.u += delta;
if (B.u >= B.R.len) {
var over = B.u - B.R.len;
R.d = (B.R.dTo + over) % PYT.L;
R.br = null;
R.i = 0;
return;
}
R.d = B.R.dFrom + (B.R.dTo - B.R.dFrom) * Math.max(0, B.u) / B.R.len;
return;
}
var race = PY.race;
if (race && race.sp)
return;
var F = pyTgForks();
for (var i = 0; i < F.length; i++) {
var f = F[i];
if (d0 < f.d && R.d >= f.d && R.d - f.d < 30) {
if (Math.random() < f.p) {
R.br = { R: f.R, u: R.d - f.d, j: 0 };
R.d = f.R.dFrom + (f.R.dTo - f.R.dFrom) * R.br.u / f.R.len;
}
return;
}
}
},
function (x, z, below, pad) {
var c = PYT.cell, L = PYT.grid[Math.floor(x / c) + "," + Math.floor(z / c)];
if (!L)
return false;
for (var k = 0; k < L.length; k++) {
var s = PYT.all[L[k]];
if (s.y > below || s.w <= 0)
continue;
var dx = x - s.x, dz = z - s.z, al = dx * s.tx + dz * s.tz;
if (Math.abs(al) > 6)
continue;
if (Math.abs(dx * s.tz - dz * s.tx) < s.w / 2 + (pad || 3))
return true;
}
return false;
},
function (list, a, b, lf, rf, yf, mat, vt, one) {
var pos = [], uv = [], idx = [], n = 0;
for (var i = a; i <= b; i++) {
var s = list[i], l = lf(s), r = rf(s), y = yf(s);
pos.push(s.x + l * s.tz, y, s.z - l * s.tx, s.x + r * s.tz, y, s.z - r * s.tx);
uv.push(0, s.ld / (vt || 4), one ? 1 : (r - l) / 4, s.ld / (vt || 4));
if (n > 0) {
var q = (n - 1) * 2;
idx.push(q, q + 2, q + 1, q + 1, q + 2, q + 3);
}
n++;
}
if (n < 2)
return null;
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
m.receiveShadow = true;
m.raycast = function () { };
return m;
},
function (zone, k, street) {
var key = "tgroad:" + zone + (street ? ":" + street : "");
if (PY.mats[key])
return PY.mats[key];
var m;
if (zone === "snarl")
m = new THREE.MeshLambertMaterial({ color: 0x6E6A66, map: pyTgRoadTex() });
else if (zone === "sky")
m = new THREE.MeshLambertMaterial({ color: 0x3A3A46, map: pyTex("asphalt", 1, 2) });
else if (zone === "tundra")
m = new THREE.MeshLambertMaterial({ color: 0x9AA8B4, map: pyTex("concrete", 1, 2) });
else
m = pyRoadMat(zone).clone();
m.polygonOffset = true;
m.polygonOffsetFactor = -1;
m.polygonOffsetUnits = -4;
if (street) {
m = m.clone();
m.polygonOffsetUnits = -4 - street * 3;
}
PY.mats[key] = m;
return m;
},
function () {
if (PY.tex.tgroad)
return PY.tex.tgroad;
var base = pyTex("asphalt", 1, 1), img = base && base.image;
PY.tex.tgroad = wTex(256, 512, function (x, W, H) {
if (img && img.width) {
try {
x.drawImage(img, 0, 0, W, H / 2);
x.drawImage(img, 0, H / 2, W, H / 2);
}
catch (e) {
x.fillStyle = "#6A6A6A";
x.fillRect(0, 0, W, H);
}
}
else {
x.fillStyle = "#6A6A6A";
x.fillRect(0, 0, W, H);
}
for (var p = 0; p < 5; p++) {
x.fillStyle = "rgba(" + (p % 2 ? 30 : 90) + "," + (p % 2 ? 30 : 88) + "," + (p % 2 ? 32 : 84) + ",.45)";
x.fillRect(Math.random() * W * 0.7, Math.random() * H, 30 + Math.random() * 90, 20 + Math.random() * 60);
}
x.fillStyle = "rgba(200,196,188,.12)";
x.fillRect(W * 0.22, 0, W * 0.12, H);
x.fillRect(W * 0.66, 0, W * 0.12, H);
x.strokeStyle = "rgba(20,18,16,.75)";
x.lineWidth = 1.6;
for (var i = 0; i < 6; i++) {
x.beginPath();
var px = Math.random() * W, py = Math.random() * H;
x.moveTo(px, py);
for (var j = 0; j < 10; j++) {
px += (Math.random() - 0.5) * 26;
py += 8 + Math.random() * 22;
x.lineTo(px, py);
}
x.stroke();
}
}, [1, 1]);
PY.tex.tgroad.wrapS = PY.tex.tgroad.wrapT = THREE.RepeatWrapping;
return PY.tex.tgroad;
},
function (G, R, s, top, ground, parts) {
var L = PY.lite, h = top - ground;
if (h < 1.5)
return;
var x = s.x, z = s.z, z0 = R.C.zone;
if (R.k === "canopy") {
var sd = (s.i % 2) ? 1 : -1, tx = x + sd * (s.w / 2 + 2.6) * s.tz, tz = z - sd * (s.w / 2 + 2.6) * s.tx, tg = Math.max(PY_ABYSS, pyTerrain(tx, tz));
parts.trunk.push([tx, tg - 0.5, tz, top - tg + 14, 1.5 + Math.random() * 0.6]);
parts.crown.push([tx + sd * 2 * s.tz, top + 13 + Math.random() * 3, tz - sd * 2 * s.tx, 8 + Math.random() * 3]);
parts.beam.push([x, top - 0.3, z, s.w + 6, Math.atan2(s.tx, s.tz)]);
return;
}
if (R.k === "ochre") {
[-1, 1].forEach(function (sd) { var px = x + sd * (s.w / 2 - 0.6) * s.tz, pz = z - sd * (s.w / 2 - 0.6) * s.tx; parts.timber.push([px, ground, pz, h, 0.45, sd * 0.06]); });
if (h > 6)
for (var yy = ground + 5; yy < top - 1; yy += 6)
parts.beam.push([x, yy, z, s.w - 0.4, Math.atan2(s.tx, s.tz)]);
return;
}
if (R.k === "dunecrest") {
parts.bone.push([x, ground, z, h, 1.4]);
return;
}
if (R.k === "gallery") {
[-1, 1].forEach(function (sd) { var px = x + sd * (s.w / 2 + 0.4) * s.tz, pz = z - sd * (s.w / 2 + 0.4) * s.tx; parts.chain.push([px, top, pz, 16]); parts.steelPost.push([px, top + 1.4, pz, 14.6]); });
parts.beam.push([x, top + 16, z, s.w + 2, Math.atan2(s.tx, s.tz), 1]);
parts.steel.push([x, ground, z, h, 0.7]);
return;
}
parts.conc.push([x, ground, z, h, z0 === "sky" ? 1.5 : 1.2]);
},
function (G) {
var L = PY.lite, routes = pyTgRoutes();
var deckM = pyMat("lambert", 0x2E2E36), railM = pyMat("chrome", 0x8A8E96), woodM = new THREE.MeshLambertMaterial({ color: 0x7A5A3A, map: pyTex("wood", 1, 4) });
var parts = { conc: [], trunk: [], crown: [], timber: [], beam: [], bone: [], chain: [], steel: [], steelPost: [] };
routes.forEach(function (R) {
var list = R.list, z0 = R.C.zone, mat = pyTgRoadMat(z0, R.k, R.C.street ? PY_KNOT.indexOf(R.C) + 1 : 0), glowE = pyMat("glow", R.col, { op: 0.9 });
var road = pyTgRuns(list, function (s) { return s.w > 0 && s.fl.indexOf("g") < 0; });
road.forEach(function (r) {
var b = Math.min(list.length - 1, r.b + 1);
if (list[b].w <= 0)
b = r.b;
var sn = z0 === "snarl", m = pyTgRibbon(list, r.a, b, function (s) { return -s.w / 2; }, function (s) { return s.w / 2; }, function (s) { return s.y + 0.035; }, mat, sn ? 16 : 4, sn);
if (m)
G.add(m);
pyTgRuns(list, function (s, i) { return i >= r.a && i <= b && !s.jn; }).forEach(function (rr) {
if (rr.b - rr.a < 1)
return;
[-1, 1].forEach(function (sd) { var e = pyTgRibbon(list, rr.a, rr.b, function (s) { return sd < 0 ? -s.w / 2 + 0.3 : s.w / 2 - 0.55; }, function (s) { return sd < 0 ? -s.w / 2 + 0.55 : s.w / 2 - 0.3; }, function (s) { return s.y + 0.06; }, glowE, 4); if (e)
G.add(e); });
});
if (z0 === "coast") {
var sand = pyMat("lambert", 0xC8B888, { map: pyTex("sand", 1, 1) });
[-1, 1].forEach(function (sd) { var sh = pyTgRibbon(list, r.a, b, function (s) { return sd < 0 ? -s.w / 2 - 4 : s.w / 2; }, function (s) { return sd < 0 ? -s.w / 2 : s.w / 2 + 4; }, function (s) { return Math.max(PY_SEA + 0.05, s.y - 0.3); }, sand, 4); if (sh)
G.add(sh); });
}
});
if (z0 !== "sky" && z0 !== "coast") {
var sm = pyMat("lambert", (PY_ZONES[z0] || PY_ZONES.paddock).ground);
pyTgRuns(list, function (s) { return s.w > 0 && !/[eg]/.test(s.fl); }).forEach(function (r) {
var b = Math.min(list.length - 1, r.b + 1);
if (list[b].w <= 0)
b = r.b;
[-1, 1].forEach(function (sd) { var sh = pyTgRibbon(list, r.a, b, function (s) { return sd < 0 ? -s.w / 2 - 2.6 : s.w / 2; }, function (s) { return sd < 0 ? -s.w / 2 : s.w / 2 + 2.6; }, function (s) { return s.y - 0.04; }, sm, 4); if (sh)
G.add(sh); });
});
}
pyTgRuns(list, function (s) { return s.fl.indexOf("e") >= 0 && s.w > 0; }).forEach(function (r) {
var a = r.a, b = Math.min(list.length - 1, r.b + 1);
if (list[b].w <= 0)
b = r.b;
var under = pyTgRibbon(list, a, b, function (s) { return s.w / 2; }, function (s) { return -s.w / 2; }, function (s) { return s.y - 1.4; }, deckM, 4);
if (under)
G.add(under);
var railMat = /ochre|canopy|gallery/.test(R.k) ? woodM : railM, wallMat = /ochre|canopy/.test(R.k) ? woodM : deckM;
[-1, 1].forEach(function (sd) {
pyCurtain(list, a, b, function (s) { return sd * s.w / 2; }, -1.4, 0.03, wallMat).forEach(function (m) { G.add(m); });
var keep = function (s) { return !/[cgr]/.test(s.fl) && s.w > 0; };
pyCurtain(list, a, b, function (s) { return sd * (s.w / 2 + 0.9); }, 0.55, 0.95, railMat, keep).forEach(function (m) { G.add(m); });
if (!/canopy|gallery|ochre/.test(R.k))
pyCurtain(list, a, b, function (s) { return sd * (s.w / 2 + 0.9); }, 0, 0.55, deckM, keep).forEach(function (m) { G.add(m); });
if (/sky|snarl/.test(z0) && !L) {
var st = pyTgRibbon(list, a, b, function (s) { return sd * (s.w / 2 - 0.4) - 0.15; }, function (s) { return sd * (s.w / 2 - 0.4) + 0.15; }, function (s) { return s.y - 1.42; }, pyMat("glow", R.col, { op: 0.75 }), 4);
if (st) {
st.material = pyMat("glow", R.col, { op: 0.75, ds: 1 });
G.add(st);
}
}
});
for (var p = a; p <= b; p += (L ? 12 : 7)) {
var s = list[p], top = s.y - 1.4, gr = Math.max(PY_ABYSS - 10, pyTerrain(s.x, s.z));
if (z0 === "coast")
gr = Math.max(gr, -6.5);
if (pyRoadUnder(s.x, s.z, top - 3, 2.5))
continue;
pyTgPillar(G, R, s, top, gr - 0.5, parts);
}
});
if (R.k === "underice")
pyTgTube(G, R);
if (!R.C.street)
pyTgSigns(G, R);
});
var cyl = new THREE.CylinderGeometry(1, 1.2, 1, L ? 8 : 12);
cyl.translate(0, 0.5, 0);
var concM = new THREE.MeshLambertMaterial({ color: 0x6A6660, map: pyTex("concrete", 1, 6) });
pyTgInst(G, cyl, concM, parts.conc, function (a) { return [a[0], a[1], a[2], 0, 0, 0, a[4], a[3], a[4]]; });
var tgTr = pyTgInst(G, cyl, new THREE.MeshLambertMaterial({ color: 0x5A4630, map: pyTex("bark", 1, 3) }), parts.trunk, function (a) { return [a[0], a[1], a[2], Math.random() * 6, 0, 0, a[4], a[3], a[4]]; });
var crown = typeof pyluCrownGeo === "function" ? pyluCrownGeo() : new THREE.IcosahedronGeometry(1, 1);
if (typeof pyluCrownGeo !== "function")
crown.scale(1, 0.55, 1);
var tgCr = pyTgInst(G, crown, typeof pyluCrownMat === "function" ? pyluCrownMat() : new THREE.MeshLambertMaterial({ color: 0x2E6A30, map: pyTex("grass", 2, 2) }), parts.crown, function (a) { return [a[0], a[1], a[2], Math.random() * 6, 0, 0, a[3], a[3] * 0.8, a[3]]; });
PY.tangleTrees = tgTr && tgCr ? { trunk: tgTr, crown: tgCr, tall: true } : null;
var post = new THREE.BoxGeometry(1, 1, 1);
post.translate(0, 0.5, 0);
pyTgInst(G, post, woodM, parts.timber, function (a) { return [a[0], a[1], a[2], 0, 0, a[5], a[4], a[3], a[4]]; });
pyTgInst(G, new THREE.BoxGeometry(1, 0.35, 0.35), woodM, parts.beam.filter(function (a) { return !a[5]; }), function (a) { return [a[0], a[1], a[2], a[4] + Math.PI / 2, 0, 0, a[3], 1, 1]; });
pyTgInst(G, new THREE.BoxGeometry(1, 0.5, 0.5), pyMat("chrome", 0x5A5A66), parts.beam.filter(function (a) { return a[5]; }), function (a) { return [a[0], a[1], a[2], a[4] + Math.PI / 2, 0, 0, a[3], 1, 1]; });
var sp = new THREE.BoxGeometry(0.3, 1, 0.3);
sp.translate(0, 0.5, 0);
pyTgInst(G, sp, pyMat("chrome", 0x5A5A66), parts.steelPost, function (a) { return [a[0], a[1], a[2], 0, 0, 0, 1, a[3], 1]; });
var bone = new THREE.CylinderGeometry(0.7, 1.2, 1, L ? 7 : 10);
bone.translate(0, 0.5, 0);
pyTgInst(G, bone, new THREE.MeshLambertMaterial({ color: 0xE8DCC0, map: pyTex("stone", 1, 2) }), parts.bone, function (a) { return [a[0], a[1], a[2], Math.random() * 6, 0, 0, a[4], a[3], a[4]]; });
pyTgInst(G, cyl, pyMat("chrome", 0x5A5A66), parts.steel, function (a) { return [a[0], a[1], a[2], 0, 0, 0, a[4], a[3], a[4]]; });
var chain = new THREE.CylinderGeometry(0.09, 0.09, 1, 5);
chain.translate(0, 0.5, 0);
pyTgInst(G, chain, pyMat("chrome", 0x8A8A96), parts.chain, function (a) { return [a[0], a[1], a[2], 0, 0, 0, 1, a[3], 1]; });
pyTgDress(G, routes);
},
function (G, R) {
var L = PY.lite, list = R.list, seg = L ? 8 : 14, pos = [], uv = [], idx = [], n = 0;
for (var j = 0; j < list.length; j++) {
var s = list[j], Rr = s.w / 2 + 1.2;
for (var k = 0; k <= seg; k++) {
var t = Math.PI * k / seg, cx = Math.cos(t) * Rr, cy = Math.sin(t) * Rr * 0.95;
pos.push(s.x + cx * s.tz, s.y + cy, s.z - cx * s.tx);
uv.push(k / seg, s.ld / 8);
}
if (n > 0)
for (var q = 0; q < seg; q++) {
var A = (n - 1) * (seg + 1) + q, B = n * (seg + 1) + q;
idx.push(A, B, A + 1, A + 1, B, B + 1);
}
n++;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var frost = wTex(64, 128, function (x, W, H) { x.fillStyle = "#FFFFFF"; x.fillRect(0, 0, W, H); x.strokeStyle = "rgba(120,170,200,.55)"; x.lineWidth = 2; x.strokeRect(1, 1, W - 2, H - 2); for (var i = 0; i < 14; i++) {
x.strokeStyle = "rgba(200,230,255,.5)";
x.beginPath();
var px = Math.random() * W, py = Math.random() * H;
x.moveTo(px, py);
x.lineTo(px + (Math.random() - 0.5) * 30, py + (Math.random() - 0.5) * 30);
x.stroke();
} }, [3, 1]);
var glass = new THREE.MeshPhongMaterial({ color: 0x9ADFFF, map: frost, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.38, side: THREE.DoubleSide, depthWrite: false });
var tube = new THREE.Mesh(g, glass);
tube.raycast = function () { };
G.add(tube);
var rib = new THREE.TorusGeometry(1, 0.06, 5, L ? 10 : 18, Math.PI), ribs = [];
for (var i = 3; i < list.length - 3; i += L ? 5 : 3) {
ribs.push(list[i]);
}
var k2 = 0;
pyInstances(G, rib, pyMat("chrome", 0x8AA0B0), ribs.length, function () { var s = ribs[k2++]; if (!s)
return null; var r = s.w / 2 + 1.2; return [s.x, s.y, s.z, Math.atan2(s.tx, s.tz), 0, 0, r, r * 0.95, r]; });
var ceil = pyTgRibbon(list, 0, list.length - 1, function (s) { return s.w / 2 + 40; }, function (s) { return -s.w / 2 - 40; }, function () { return PY_WATER - 0.05; }, new THREE.MeshBasicMaterial({ color: 0x123A48, transparent: true, opacity: 0.82, depthWrite: false, fog: true }), 8);
if (ceil)
G.add(ceil);
var rock = new THREE.MeshLambertMaterial({ color: 0x5A6A78, map: pyTex("stone", 3, 3) });
pyPortal(G, list[1], rock, 0x9ADFFF);
pyPortal(G, list[list.length - 2], rock, 0x9ADFFF);
},
function (G, R) {
var list = R.list, s = list[Math.min(list.length - 1, 6)], C = R.C, hex = "#" + ("000000" + R.col.toString(16)).slice(-6);
if (!s)
return;
var g = new THREE.Group();
g.position.set(s.x, s.y, s.z);
g.rotation.y = Math.atan2(s.tx, s.tz);
var w = s.w / 2 + 1, dark = pyMat("chrome", 0x2A2A32);
[-1, 1].forEach(function (sd) { var p = new THREE.Mesh(new THREE.BoxGeometry(0.6, 7.2, 0.6), dark); p.position.set(sd * w, 3.6, 0); g.add(p); });
var beam = new THREE.Mesh(new THREE.BoxGeometry(w * 2 + 0.6, 0.6, 0.6), dark);
beam.position.y = 7.1;
g.add(beam);
var sg = wSign([C.name.toUpperCase(), "the Tangle · rejoins the loop ahead"], Math.min(w * 2, 12), 2, "#101014", hex);
sg.position.set(0, 8.6, 0.4);
sg.rotation.y = Math.PI;
g.add(sg);
g.traverse(function (o) { o.raycast = function () { }; });
G.add(g);
var S = PYT.S, fi = -1;
for (var i = 0; i < S.length; i++) {
if (S[i].k === C.from) {
fi = i;
break;
}
}
if (fi < 0)
return;
var m = S[(fi - 13 + S.length) % S.length], dx = s.x - S[fi].x, dz = s.z - S[fi].z, side = (dx * S[fi].tz - dz * S[fi].tx) >= 0 ? 1 : -1;
var px = m.x + side * (m.w / 2 + 2.4) * m.tz, pz = m.z - side * (m.w / 2 + 2.4) * m.tx;
var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 4.4, 6), dark);
pole.position.set(px, m.y + 2.2, pz);
pole.raycast = function () { };
G.add(pole);
var sg2 = wSign([(side > 0 ? "→ " : "← ") + C.name.toUpperCase(), "turn-off ahead"], 5, 1.5, "#101014", hex);
sg2.position.set(px, m.y + 4.6, pz);
sg2.lookAt(m.x - m.tx * 30, m.y + 4.6, m.z - m.tz * 30);
sg2.raycast = function () { };
G.add(sg2);
},
function () {
if (PY.tex.tgwin)
return PY.tex.tgwin;
PY.tex.tgwin = wTex(128, 256, function (x, W, H) {
x.fillStyle = "#5A544C";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 300; i++) {
var v = 70 + Math.random() * 30 | 0;
x.fillStyle = "rgba(" + v + "," + (v - 4) + "," + (v - 10) + ",0.5)";
x.fillRect(Math.random() * W, Math.random() * H, 3 + Math.random() * 10, 2);
}
for (var r = 6; r < H; r += 16) {
x.fillStyle = "#3A3632";
x.fillRect(0, r + 11, W, 3);
for (var c = 4; c < W; c += 16) {
var q = Math.random();
x.fillStyle = q < 0.16 ? "#E8B868" : q < 0.24 ? "#C8D8E8" : q < 0.5 ? "#141210" : "#2A2C30";
x.fillRect(c, r, 10, 9);
}
}
for (var b = 0; b < 3; b++) {
x.fillStyle = "rgba(20,16,14,.7)";
x.beginPath();
var px = Math.random() * W, py = Math.random() * H;
x.moveTo(px, py);
for (var k = 0; k < 6; k++)
x.lineTo(px + (Math.random() - 0.5) * 40, py + (Math.random() - 0.5) * 40);
x.fill();
}
}, [1, 1]);
return PY.tex.tgwin;
},
function (G) {
var L = PY.lite, S = PY_SNARL, win = pyTgWinTex();
var conc = new THREE.MeshLambertMaterial({ color: 0x8A847A, map: pyTex("concrete", 2, 2) });
var winM = new THREE.MeshLambertMaterial({ map: win });
[[16, 26, 16, 1, 2], [18, 46, 14, 1, 3], [20, 72, 18, 1.2, 4.5]].forEach(function (T, ti) {
var geo = pyTgBox(T[0], T[1], T[2], T[3], T[4]), n = L ? [10, 7, 4][ti] : [26, 18, 10][ti];
pyInstances(G, geo, winM, n, function () {
var p = pyTgSpot(null, T[0] * 0.8 + 6);
if (!p)
return null;
var lean = Math.random() < 0.3 ? (Math.random() - 0.5) * 0.16 : 0;
var y = pyTerrain(p[0], p[1]) - 1, ry = Math.random() * 3, sx = 0.8 + Math.random() * 0.4, sz = 0.8 + Math.random() * 0.4;
pySolid({ x: p[0], z: p[1], hw: T[0] * sx / 2, hd: T[2] * sz / 2, rot: ry });
return [p[0], y, p[1], ry, lean, lean * 0.6, sx, 0.8 + Math.random() * 0.45, sz];
});
});
pyTgStreets(G, winM, conc);
var ck = pyTgRoute("corkscrew");
if (ck) {
var cx = 0, cz = 0, n2 = 0;
ck.list.forEach(function (s) { if (s.ld > 330 && s.ld < 720) {
cx += s.x;
cz += s.z;
n2++;
} });
if (n2) {
cx /= n2;
cz /= n2;
}
var sp = new THREE.Group();
sp.position.set(cx, pyTerrain(cx, cz) - 2, cz);
sp.rotation.set(0.04, 0.3, -0.05);
var body = new THREE.Mesh(pyTgBox(22, 120, 22, 1.4, 7), winM);
sp.add(body);
var top = new THREE.Mesh(new THREE.ConeGeometry(15, 30, 6, 1, true), conc);
top.position.y = 128;
top.rotation.z = 0.25;
sp.add(top);
for (var b = 0; b < (L ? 3 : 6); b++) {
var beam = new THREE.Mesh(new THREE.BoxGeometry(0.6, 14 + Math.random() * 10, 0.6), pyMat("lambert", 0x5A3A2A));
beam.position.set((Math.random() - 0.5) * 18, 124 + Math.random() * 6, (Math.random() - 0.5) * 18);
beam.rotation.set((Math.random() - 0.5) * 0.9, 0, (Math.random() - 0.5) * 0.9);
sp.add(beam);
}
var lamp = new THREE.Mesh(new THREE.SphereGeometry(1.1, 10, 8), pyMat("glow", 0xFF3A2A));
lamp.position.set(8, 121, 8);
sp.add(lamp);
sp.traverse(function (o) { o.raycast = function () { }; });
G.add(sp);
pySolid({ x: cx, z: cz, r: 12 });
}
var slab = new THREE.BoxGeometry(12, 1.2, 40), deckM = new THREE.MeshLambertMaterial({ color: 0x7A746C, map: pyTex("concrete", 2, 6) });
var stub = new THREE.CylinderGeometry(1.3, 1.5, 1, 10);
stub.translate(0, 0.5, 0);
var rebar = new THREE.CylinderGeometry(0.08, 0.08, 1, 4);
var slabs = [];
for (var i = 0; i < (L ? 5 : 12); i++) {
var p = pyTgSpot(null, 26);
if (p)
slabs.push(p);
}
var k = 0;
pyInstances(G, slab, deckM, slabs.length, function () { var p = slabs[k++]; if (!p)
return null; return [p[0], pyTerrain(p[0], p[1]) + 5, p[1], Math.random() * 6, 0.22 + Math.random() * 0.15, (Math.random() - 0.5) * 0.2]; });
k = 0;
pyInstances(G, stub, deckM, slabs.length, function () { var p = slabs[k++]; if (!p)
return null; return [p[0] + 8, pyTerrain(p[0] + 8, p[1] + 6) - 0.5, p[1] + 6, 0, 0, 0, 1, 6 + Math.random() * 8, 1]; });
if (!L) {
var rb = [];
slabs.forEach(function (p) { for (var j = 0; j < 6; j++)
rb.push([p[0] + 8 + (Math.random() - 0.5) * 2, pyTerrain(p[0] + 8, p[1] + 6) + 8, p[1] + 6 + (Math.random() - 0.5) * 2]); });
k = 0;
pyInstances(G, rebar, pyMat("lambert", 0x5A3420), rb.length, function () { var p = rb[k++]; return p ? [p[0], p[1], p[2], 0, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, 1, 3 + Math.random() * 3, 1] : null; });
}
var cont = pyTgBox(2.6, 2.6, 12, 1, 1), ctex = wTex(64, 64, function (x, W, H) { x.fillStyle = "#FFFFFF"; x.fillRect(0, 0, W, H); for (var i = 0; i < W; i += 6) {
x.fillStyle = "rgba(0,0,0,.18)";
x.fillRect(i, 0, 2, H);
} x.fillStyle = "rgba(60,30,10,.25)"; for (var j = 0; j < 30; j++)
x.fillRect(Math.random() * W, Math.random() * H, 4, 2); }, [4, 1]);
[0xA83A2A, 0x2A5A8A, 0x3A7A4A, 0xC88A2A, 0x6A6A70].forEach(function (col, ci) {
var spots = [];
for (var i = 0; i < (L ? 4 : 9); i++) {
var p = pyTgSpot(null, 10);
if (!p)
continue;
var hi = 1 + (Math.random() * 4 | 0), r = Math.random() * 3;
for (var h = 0; h < hi; h++)
spots.push([p[0] + (Math.random() - 0.5) * 0.6, pyTerrain(p[0], p[1]) - 0.2 + h * 2.6, p[1] + (Math.random() - 0.5) * 0.6, r + (Math.random() - 0.5) * 0.2]);
}
var k3 = 0;
pyInstances(G, cont, new THREE.MeshLambertMaterial({ color: col, map: ctex }), spots.length, function () { var p = spots[k3++]; return p ? [p[0], p[1], p[2], p[3]] : null; });
});
var scrap = new THREE.DodecahedronGeometry(1, 0), rust = new THREE.MeshLambertMaterial({ color: 0x6A4A34, map: pyTex("stone", 1, 1) });
pyInstances(G, scrap, rust, L ? 18 : 60, function () { var p = pyTgSpot(null, 8); if (!p)
return null; return [p[0], pyTerrain(p[0], p[1]) - 1, p[1], Math.random() * 6, Math.random(), Math.random(), 4 + Math.random() * 7, 2 + Math.random() * 6, 4 + Math.random() * 7]; });
var car = pyTgBox(2, 1.1, 4.4, 1, 1), cab = pyTgBox(1.7, 0.8, 2.2, 1, 1), cars = [];
for (var c2 = 0; c2 < (L ? 14 : 44); c2++) {
var p2 = pyTgSpot(null, 4);
if (p2)
cars.push([p2[0], pyTerrain(p2[0], p2[1]), p2[1], Math.random() * 6, (Math.random() - 0.5) * 0.3, (Math.random() < 0.2 ? Math.PI : 0) + (Math.random() - 0.5) * 0.3]);
}
[0x7A2A22, 0x2A3A5A, 0x5A5A52, 0x8A7A3A].forEach(function (col, ci) {
var mine = cars.filter(function (_, i) { return i % 4 === ci; }), k4 = 0;
pyInstances(G, car, pyMat("matte", col), mine.length, function () { var p = mine[k4++]; return p ? [p[0], p[1], p[2], p[3], p[4], p[5]] : null; });
});
var k5 = 0;
pyInstances(G, cab, pyMat("matte", 0x1A1A1E), cars.length, function () { var p = cars[k5++]; if (!p)
return null; var up = p[5] > 1 ? -0.8 : 1.1; return [p[0] - Math.sin(p[3]) * 0.3, p[1] + up, p[2] - Math.cos(p[3]) * 0.3, p[3], p[4], p[5]]; });
var lat = wTex(32, 32, function (x, W, H) { x.clearRect(0, 0, W, H); x.strokeStyle = "#E8B830"; x.lineWidth = 3; x.strokeRect(1, 1, W - 2, H - 2); x.beginPath(); x.moveTo(0, 0); x.lineTo(W, H); x.moveTo(W, 0); x.lineTo(0, H); x.stroke(); }, [1, 1]);
for (var cr = 0; cr < (L ? 2 : 5); cr++) {
var p3 = pyTgSpot(null, 12);
if (!p3)
continue;
var cg = new THREE.Group(), ch = 55 + Math.random() * 35, y3 = pyTerrain(p3[0], p3[1]);
cg.position.set(p3[0], y3, p3[1]);
cg.rotation.y = Math.random() * 6;
var mt = lat.clone();
mt.needsUpdate = true;
mt.wrapS = mt.wrapT = THREE.RepeatWrapping;
mt.repeat.set(1, ch / 2.2);
var mast = new THREE.Mesh(new THREE.BoxGeometry(2.2, ch, 2.2), new THREE.MeshLambertMaterial({ map: mt, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }));
mast.position.y = ch / 2;
cg.add(mast);
var jt = lat.clone();
jt.needsUpdate = true;
jt.wrapS = jt.wrapT = THREE.RepeatWrapping;
jt.repeat.set(26, 1);
var jib = new THREE.Mesh(new THREE.BoxGeometry(60, 1.8, 1.8), new THREE.MeshLambertMaterial({ map: jt, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }));
jib.position.set(16, ch + 1, 0);
cg.add(jib);
var cw = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 3), conc);
cw.position.set(-11, ch - 0.5, 0);
cg.add(cw);
var cabin = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), pyMat("matte", 0xC89A30));
cabin.position.set(2.6, ch - 2, 0);
cg.add(cabin);
var hook = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, ch * 0.6, 4), pyMat("lambert", 0x2A2A2A));
hook.position.set(30, ch - ch * 0.3, 0);
cg.add(hook);
var tip = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 6), pyMat("glow", 0xFF3A2A));
tip.position.set(46, ch + 2, 0);
cg.add(tip);
cg.traverse(function (o) { o.raycast = function () { }; });
G.add(cg);
}
var fr = pyTgRoute("furnace");
if (fr) {
var shed = pyTgBox(26, 16, 20, 2, 1), shedM = new THREE.MeshLambertMaterial({ color: 0x5A4A3E, map: pyTex("concrete", 3, 2) }), sheds = [];
for (var f = 0; f < (L ? 3 : 7); f++) {
var q = pyTgNearRoute(fr, 16, 30);
if (q && pyClear(q[0], q[1], 16))
sheds.push(q);
}
var k6 = 0;
pyInstances(G, shed, shedM, sheds.length, function () { var q = sheds[k6++]; if (!q)
return null; var ry = Math.atan2(q[2].tx, q[2].tz); pySolid({ x: q[0], z: q[1], hw: 13, hd: 10, rot: ry }); return [q[0], pyTerrain(q[0], q[1]) - 0.5, q[1], ry]; });
k6 = 0;
pyInstances(G, new THREE.PlaneGeometry(8, 7), pyMat("glow", 0xFF8A2A, { op: 0.9 }), sheds.length, function () { var q = sheds[k6++]; if (!q)
return null; var s = q[2], dx = s.x - q[0], dz = s.z - q[1], l = Math.hypot(dx, dz) || 1; return [q[0] + dx / l * 10.2, pyTerrain(q[0], q[1]) + 3.5, q[1] + dz / l * 10.2, Math.atan2(dx, dz)]; });
var chim = new THREE.CylinderGeometry(1.4, 2, 1, L ? 8 : 12);
chim.translate(0, 0.5, 0);
k6 = 0;
pyInstances(G, chim, new THREE.MeshLambertMaterial({ color: 0x6A4A3A, map: pyTex("stone", 1, 6) }), sheds.length, function () { var q = sheds[k6++]; if (!q)
return null; return [q[0] + 6, pyTerrain(q[0], q[1]) + 14, q[1] - 4, 0, 0, 0, 1, 26 + Math.random() * 12, 1]; });
var pipe = new THREE.CylinderGeometry(0.9, 0.9, 1, L ? 8 : 12);
pipe.rotateZ(Math.PI / 2);
var pipes = [];
for (var pp = 0; pp < (L ? 6 : 16); pp++) {
var q2 = pyTgNearRoute(fr, 5, 12);
if (q2)
pipes.push(q2);
}
k6 = 0;
pyInstances(G, pipe, pyMat("chrome", 0x7A6A5A), pipes.length, function () { var q = pipes[k6++]; if (!q)
return null; return [q[0], pyTerrain(q[0], q[1]) + 1.4 + Math.random() * 3, q[1], Math.atan2(q[2].tx, q[2].tz) + Math.PI / 2, 0, 0, 18 + Math.random() * 20, 1, 1]; });
PY.tgChim = sheds.map(function (q) { return [q[0] + 6, pyTerrain(q[0], q[1]) + 44, q[1] - 4]; });
}
var barrel = new THREE.CylinderGeometry(0.45, 0.45, 1.1, 10);
barrel.translate(0, 0.55, 0);
var bars = [];
["gutterway", "corkscrew", "furnace", "scrapline"].forEach(function (k7) { var R = pyTgRoute(k7); if (!R)
return; for (var b = 0; b < (L ? 4 : 10); b++) {
var q = pyTgNearRoute(R, 1.5, 4);
if (q)
bars.push(q);
} });
var k8 = 0;
pyInstances(G, barrel, pyMat("lambert", 0x4A3A2E), bars.length, function () { var q = bars[k8++]; return q ? [q[0], pyGround(q[0], q[1]), q[1]] : null; });
var halo = pySoftTex();
PY.tgFire = [];
bars.forEach(function (q, i) { if (L && i % 2)
return; var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: halo, color: 0xFF9A3A, transparent: true, opacity: 0.75, depthWrite: false, fog: true })); sp.position.set(q[0], pyGround(q[0], q[1]) + 1.6, q[1]); sp.scale.setScalar(2.4); sp.raycast = function () { }; G.add(sp); });
var smokeAt = (PY.tgChim || []).concat(bars.filter(function (_, i) { return i % 3 === 0; }).map(function (q) { return [q[0], pyGround(q[0], q[1]) + 2, q[1]]; }));
PY.tgSmoke = [];
smokeAt.slice(0, L ? 6 : 16).forEach(function (at, ci) {
for (var j = 0; j < (L ? 3 : 5); j++) {
var sm = new THREE.Sprite(new THREE.SpriteMaterial({ map: halo, color: 0x4A4440, transparent: true, opacity: 0, depthWrite: false, fog: true }));
sm.raycast = function () { };
G.add(sm);
PY.tgSmoke.push({ m: sm, x: at[0], y: at[1], z: at[2], t: j / (L ? 3 : 5), big: at[1] > 20 });
}
});
var makers = [];
PY_CARS.forEach(function (c) { if (makers.indexOf(c.maker) < 0)
makers.push(c.maker); });
var slogans = ["BUILT TO FINISH", "FIRST ACROSS OR LAST RUNNING", "GRIP OR GRAVE", "FOR THE TANGLE", "EVERY BOLT TESTED", "LOUDER THAN THE STORM"];
var cols = [["#101418", "#3AFFC0"], ["#1A0A14", "#FF6AD8"], ["#14100A", "#FFC040"], ["#0A1018", "#3AC8FF"]];
for (var bb = 0; bb < (L ? 4 : 10); bb++) {
var R2 = [pyTgRoute("gutterway"), pyTgRoute("corkscrew"), pyTgRoute("scrapline"), pyTgRoute("furnace")][bb % 4];
if (!R2)
continue;
var q3 = pyTgNearRoute(R2, 6, 14);
if (!q3)
continue;
var s3 = q3[2], gy = pyTerrain(q3[0], q3[1]), cc = cols[bb % cols.length], mk = makers[(bb * 5) % makers.length] || "Pyreline";
var bd = wSign([mk.toUpperCase(), slogans[bb % slogans.length]], 12, 4.5, cc[0], cc[1]);
bd.position.set(q3[0], gy + 9, q3[1]);
bd.lookAt(s3.x, gy + 9, s3.z);
bd.raycast = function () { };
G.add(bd);
[-4, 4].forEach(function (o) { var pl = new THREE.Mesh(new THREE.BoxGeometry(0.5, 9, 0.5), pyMat("chrome", 0x3A3A42)); pl.position.set(q3[0] + o * Math.cos(bd.rotation.y), gy + 4.5, q3[1] - o * Math.sin(bd.rotation.y)); pl.raycast = function () { }; G.add(pl); });
}
var lp = [];
["gutterway", "corkscrew", "furnace"].forEach(function (k9) { var R = pyTgRoute(k9); if (!R)
return; R.list.forEach(function (s, i) { if (i % (L ? 16 : 9) || s.fl.indexOf("e") >= 0 || s.w <= 0 || pySnarlK(s.x, s.z) < 0.5)
return; var sd = (i / 9 | 0) % 2 ? 1 : -1; lp.push([s.x + sd * (s.w / 2 + 1.4) * s.tz, s.y, s.z - sd * (s.w / 2 + 1.4) * s.tx]); }); });
var lpost = new THREE.CylinderGeometry(0.12, 0.16, 1, 6);
lpost.translate(0, 0.5, 0);
var k10 = 0;
pyInstances(G, lpost, pyMat("chrome", 0x4A4A52), lp.length, function () { var p = lp[k10++]; return p ? [p[0], p[1], p[2], 0, 0, 0, 1, 7, 1] : null; });
k10 = 0;
pyInstances(G, new THREE.SphereGeometry(0.4, 8, 6), pyMat("glow", 0xFFB04A), lp.length, function () { var p = lp[k10++]; return p ? [p[0], p[1] + 7.1, p[2]] : null; });
if (!L) {
var ft = wTex(64, 64, function (x, W, H) { x.clearRect(0, 0, W, H); x.strokeStyle = "rgba(170,170,160,.9)"; x.lineWidth = 1.5; for (var i = -W; i < W * 2; i += 8) {
x.beginPath();
x.moveTo(i, 0);
x.lineTo(i + H, H);
x.moveTo(i + H, 0);
x.lineTo(i, H);
x.stroke();
} x.fillStyle = "#6A6A64"; x.fillRect(0, 0, W, 3); }, [1, 1]);
var fm = new THREE.MeshLambertMaterial({ map: ft, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide });
["gutterway", "furnace"].forEach(function (k11) {
var R = pyTgRoute(k11);
if (!R)
return;
var Ls = R.list;
for (var a = 20; a < Ls.length - 30; a += 60) {
var b = Math.min(Ls.length - 20, a + 24), sd = (a / 60 | 0) % 2 ? 1 : -1;
if (Ls.slice(a, b).some(function (s) { return s.fl.indexOf("e") >= 0 || s.w <= 0; }))
continue;
var seg = [];
for (var i = a; i <= b; i++) {
var s = Ls[i];
seg.push({ x: s.x, z: s.z, y: pyTerrain(s.x + sd * (s.w / 2 + 3) * s.tz, s.z - sd * (s.w / 2 + 3) * s.tx), tx: s.tx, tz: s.tz, d: s.ld, w: s.w });
}
pyCurtain(seg, 0, seg.length - 1, function (s) { return sd * (s.w / 2 + 3); }, 0, 2.6, fm).forEach(function (m) { G.add(m); });
}
});
}
},
function (G, winM, conc) {
var L = PY.lite, step = L ? 11 : 6, brick = wTex(128, 128, function (x, W, H) {
x.fillStyle = "#7A4A3A";
x.fillRect(0, 0, W, H);
for (var r = 0; r < H; r += 4) {
x.fillStyle = "rgba(40,20,14,.35)";
x.fillRect(0, r, W, 1);
}
for (var rr = 6; rr < H; rr += 16)
for (var c = 5; c < W; c += 14) {
var q = Math.random();
x.fillStyle = q < 0.14 ? "#E8B060" : q < 0.5 ? "#1A1412" : "#3A3434";
x.fillRect(c, rr, 8, 9);
}
}, [1, 1]);
var brickM = new THREE.MeshLambertMaterial({ map: brick }), mats = [winM, brickM];
var cls = [[10, 1, 1.6], [24, 1, 3], [44, 1.2, 5.5], [70, 1.4, 8.5]], bins = {};
var tops = [], crowns = [], rubble = [];
["gutterway", "corkscrew", "furnace", "scrapline", "ashrow", "cutter", "breakneck", "crane", "knife", "gallows"].forEach(function (k) {
var R = pyTgRoute(k);
if (!R)
return;
R.list.forEach(function (s, i) {
if (i % step || s.w <= 0 || pySnarlK(s.x, s.z) < 0.8)
return;
[-1, 1].forEach(function (sd) {
if (Math.random() < 0.22)
return;
var wAl = 12 + Math.random() * 10, dep = 12 + Math.random() * 10, off = s.w / 2 + (s.fl.indexOf("e") >= 0 ? 10 : 6) + dep / 2;
var x = s.x + sd * off * s.tz, z = s.z - sd * off * s.tx;
if (!pyClear(x, z, Math.max(wAl, dep) / 2 + 2))
return;
var ci = Math.random() < 0.25 ? 0 : Math.random() < 0.45 ? 1 : Math.random() < 0.7 ? 2 : 3, mi = ci < 2 && Math.random() < 0.55 ? 1 : 0, key = ci + ":" + mi;
var ry = Math.atan2(s.tx, s.tz), gy = pyTerrain(x, z) - 0.6, h = cls[ci][0] * (0.8 + Math.random() * 0.4);
(bins[key] = bins[key] || []).push([x, gy, z, ry, 0, 0, wAl / 16, h / cls[ci][0], dep / 16]);
pySolid({ x: x, z: z, hw: wAl / 2, hd: dep / 2, rot: ry });
if (ci <= 1)
tops.push([x, gy + h, z, ry, wAl, dep]);
else if (Math.random() < 0.4)
crowns.push([x, gy + h, z, wAl, dep]);
if (Math.random() < 0.5)
rubble.push([x - sd * (dep / 2 + 1.5) * s.tz, pyTerrain(x, z), z + sd * (dep / 2 + 1.5) * s.tx]);
});
});
});
Object.keys(bins).forEach(function (key) {
var ci = +key.split(":")[0], mi = +key.split(":")[1], C = cls[ci], arr = bins[key], k = 0;
pyInstances(G, pyTgBox(16, C[0], 16, C[1], C[2]), mats[mi], arr.length, function () { return arr[k++] || null; });
});
var tank = new THREE.CylinderGeometry(1.4, 1.4, 2.6, L ? 8 : 12);
tank.translate(0, 1.3 + 1.2, 0);
var tk = 0;
pyInstances(G, tank, pyMat("lambert", 0x6A5A48), tops.length, function () { var t = tops[tk++]; return t ? [t[0] + (Math.random() - 0.5) * t[4] * 0.5, t[1], t[2] + (Math.random() - 0.5) * t[5] * 0.5] : null; });
var legs = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 4);
legs.translate(0, 0.6, 0);
tk = 0;
var plant = pyTgBox(3, 1.6, 2.2, 1, 1);
tk = 0;
pyInstances(G, plant, pyMat("chrome", 0x7A7E86), tops.length, function () { var t = tops[tk++]; return t ? [t[0] + (Math.random() - 0.5) * t[4] * 0.6, t[1], t[2] + (Math.random() - 0.5) * t[5] * 0.6, t[3]] : null; });
var jag = new THREE.CylinderGeometry(0.62, 0.8, 1, 7, 1, true);
var jp = jag.attributes.position;
for (var i = 0; i < jp.count; i++) {
if (jp.getY(i) > 0)
jp.setY(i, 0.5 + (Math.random() - 0.5) * 1.4);
}
jag.computeVertexNormals();
jag.translate(0, 0.5, 0);
var kc = 0;
pyInstances(G, jag, new THREE.MeshLambertMaterial({ color: 0x7A746C, map: pyTex("concrete", 2, 1), side: THREE.DoubleSide }), crowns.length, function () { var c = crowns[kc++]; return c ? [c[0], c[1] - 1, c[2], Math.random() * 6, 0, 0, c[3] * 0.95, 6 + Math.random() * 6, c[4] * 0.95] : null; });
var beams = [];
crowns.forEach(function (c) { for (var j = 0; j < (L ? 2 : 4); j++)
beams.push([c[0] + (Math.random() - 0.5) * c[3] * 0.8, c[1] + 2, c[2] + (Math.random() - 0.5) * c[4] * 0.8]); });
var kb = 0;
pyInstances(G, new THREE.BoxGeometry(0.5, 1, 0.5), pyMat("lambert", 0x4A3022), beams.length, function () { var b = beams[kb++]; return b ? [b[0], b[1], b[2], Math.random() * 6, (Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 1.2, 1, 6 + Math.random() * 8, 1] : null; });
var kr = 0;
pyInstances(G, new THREE.DodecahedronGeometry(1, 0), new THREE.MeshLambertMaterial({ color: 0x7A746A, map: pyTex("concrete", 1, 1) }), rubble.length, function () { var r = rubble[kr++]; return r ? [r[0], r[1] - 0.6, r[2], Math.random() * 6, Math.random(), 0, 2 + Math.random() * 3, 1 + Math.random() * 2, 2 + Math.random() * 3] : null; });
var ck = pyTgRoute("corkscrew");
if (ck) {
var s = null;
ck.list.forEach(function (q) { if (!s && q.ld > 1050 && q.fl.indexOf("e") < 0 && pySnarlK(q.x, q.z) > 0.9)
s = q; });
if (s) {
var len = 120, a1 = -38, a2 = 58, x1 = s.x + a1 * s.tz, z1 = s.z - a1 * s.tx, x2 = s.x + a2 * s.tz, z2 = s.z - a2 * s.tx, y1 = pyTerrain(x1, z1) + 2, y2 = s.y + 44;
var mid = new THREE.Vector3((x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2), dir = new THREE.Vector3(x2 - x1, y2 - y1, z2 - z1), dl = dir.length();
var ft = new THREE.Mesh(pyTgBox(18, dl + 20, 18, 1.2, 8), winM);
ft.geometry.translate(0, -(dl + 20) / 2, 0);
ft.position.copy(mid);
ft.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
ft.raycast = function () { };
G.add(ft);
var prop = new THREE.Mesh(pyTgBox(26, y2 - pyTerrain(x2, z2) - 4, 24, 1.6, 4), winM);
prop.position.set(x2 + 8 * s.tz, pyTerrain(x2, z2) - 0.5, z2 - 8 * s.tx);
prop.rotation.y = Math.atan2(s.tx, s.tz);
prop.raycast = function () { };
G.add(prop);
pySolid({ x: prop.position.x, z: prop.position.z, hw: 13, hd: 12, rot: prop.rotation.y });
var stumpX = x1 - 12 * s.tz, stumpZ = z1 + 12 * s.tx, stump = new THREE.Mesh(pyTgBox(18, 9, 18, 1.2, 1), winM);
stump.position.set(stumpX, pyTerrain(stumpX, stumpZ) - 0.5, stumpZ);
stump.raycast = function () { };
G.add(stump);
pySolid({ x: stumpX, z: stumpZ, hw: 9, hd: 9 });
PY.tgFallen = s;
}
}
},
function (G, R) {
var L = PY.lite, k = R.k, list = R.list;
if (k === "drywash") {
var st = new THREE.DodecahedronGeometry(1, 0);
pyInstances(G, st, new THREE.MeshLambertMaterial({ color: 0xB8B0A0, map: pyTex("stone", 1, 1) }), L ? 30 : 90, function () { var q = pyTgNearRoute(R, 0.5, 6); if (!q)
return null; return [q[0], pyTerrain(q[0], q[1]) + 0.1, q[1], Math.random() * 6, Math.random(), 0, 0.3 + Math.random() * 0.9, 0.25 + Math.random() * 0.5, 0.3 + Math.random() * 0.9]; });
var tr = new THREE.CylinderGeometry(0.15, 0.35, 1, 6);
tr.translate(0, 0.5, 0);
pyInstances(G, tr, pyMat("lambert", 0x8A7A68), L ? 10 : 30, function () { var q = pyTgNearRoute(R, 3, 12); if (!q)
return null; return [q[0], pyTerrain(q[0], q[1]), q[1], Math.random() * 6, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, 1, 3 + Math.random() * 4, 1]; });
var log = new THREE.CylinderGeometry(0.3, 0.35, 1, 7);
log.rotateZ(Math.PI / 2);
pyInstances(G, log, pyMat("lambert", 0xC8B898), L ? 6 : 20, function () { var q = pyTgNearRoute(R, 1, 5); if (!q)
return null; return [q[0], pyTerrain(q[0], q[1]) + 0.2, q[1], Math.random() * 6, 0, 0, 3 + Math.random() * 4, 1, 1]; });
}
if (k === "ochre") {
var stone = new THREE.MeshLambertMaterial({ color: 0xC88A5A, map: pyTex("stone", 1, 1) });
for (var c = 0; c < (L ? 3 : 7); c++) {
var q = pyTgNearRoute(R, 2, 5);
if (!q)
continue;
var y = pyTerrain(q[0], q[1]);
for (var i = 0; i < 5; i++) {
var r = 1 - i * 0.15, b = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0), stone);
b.position.set(q[0], y + 0.6 + i * r * 1.3, q[1]);
b.rotation.set(i, i * 2, 0);
b.raycast = function () { };
G.add(b);
}
}
var s = list[Math.floor(list.length * 0.42)];
if (s && s.fl.indexOf("e") < 0) {
var ar = new THREE.Mesh(new THREE.TorusGeometry(s.w / 2 + 3, 2.6, L ? 6 : 9, L ? 10 : 18, Math.PI), stone);
ar.position.set(s.x, s.y - 1, s.z);
ar.rotation.y = Math.atan2(s.tx, s.tz) + Math.PI / 2;
ar.scale.set(1, 1.3, 1);
ar.raycast = function () { };
G.add(ar);
}
}
if (k === "slagback") {
var hex = new THREE.CylinderGeometry(1, 1, 1, 6);
hex.translate(0, 0.5, 0);
pyInstances(G, hex, new THREE.MeshLambertMaterial({ color: 0x2A2626, map: pyTex("stone", 1, 3) }), L ? 24 : 80, function () { var q = pyTgNearRoute(R, 1.5, 9); if (!q)
return null; var gy = pyTerrain(q[0], q[1]); return [q[0], gy - 1, q[1], Math.random(), 0, 0, 0.9 + Math.random() * 0.8, 1 + Math.random() * (q[2].y - gy + 4), 0.9 + Math.random() * 0.8]; });
var crack = new THREE.PlaneGeometry(1, 1);
crack.rotateX(-Math.PI / 2);
pyInstances(G, crack, pyMat("glow", 0xFF5A1A, { op: 0.8 }), L ? 20 : 60, function () { var q = pyTgNearRoute(R, 4, 18); if (!q)
return null; return [q[0], pyTerrain(q[0], q[1]) + 0.08, q[1], Math.random() * 6, 0, 0, 0.35 + Math.random() * 0.4, 1, 4 + Math.random() * 8]; });
}
if (k === "canopy") {
var lt = [];
list.forEach(function (s, i) { if (i % (L ? 10 : 5) || s.fl.indexOf("e") < 0)
return; var sd = i % 10 ? 1 : -1; lt.push([s.x + sd * (s.w / 2 + 0.9) * s.tz, s.y + 1.6, s.z - sd * (s.w / 2 + 0.9) * s.tx]); });
var k2 = 0;
pyInstances(G, new THREE.BoxGeometry(0.4, 0.55, 0.4), pyMat("glow", 0xFFC870, { op: 0.95 }), lt.length, function () { var p = lt[k2++]; return p ? [p[0], p[1], p[2]] : null; });
var vine = new THREE.CylinderGeometry(0.06, 0.04, 1, 4);
vine.translate(0, -0.5, 0);
pyInstances(G, vine, pyMat("lambert", 0x3A6A2A), L ? 30 : 120, function () { var s = list[Math.random() * list.length | 0]; if (!s || s.fl.indexOf("e") < 0)
return null; var sd = Math.random() < 0.5 ? -1 : 1, a = (s.w / 2) * (Math.random()); return [s.x + sd * a * s.tz, s.y - 1.4, s.z - sd * a * s.tx, 0, (Math.random() - 0.5) * 0.2, 0, 1, 3 + Math.random() * 7, 1]; });
}
if (k === "dunecrest") {
var e = list.filter(function (s) { return s.fl.indexOf("e") >= 0; });
if (e.length > 4) {
var boneM = new THREE.MeshLambertMaterial({ color: 0xE8DCC0, map: pyTex("stone", 1, 2) }), tops = [];
for (var j = 0; j < e.length; j += L ? 4 : 2) {
var s2 = e[j], R2 = s2.w / 2 + 3.2;
var rib = new THREE.Mesh(new THREE.TorusGeometry(R2, 0.6, L ? 5 : 7, L ? 12 : 20, Math.PI), boneM);
rib.position.set(s2.x, s2.y - 0.8, s2.z);
rib.rotation.order = "YXZ";
rib.rotation.set(-0.15, Math.atan2(s2.tx, s2.tz), 0);
rib.raycast = function () { };
G.add(rib);
tops.push(new THREE.Vector3(s2.x, s2.y - 0.8 + R2, s2.z));
}
for (var t = 1; t < tops.length; t++) {
var A = tops[t - 1], B = tops[t], len = A.distanceTo(B), sp = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, len, 8), boneM);
sp.position.copy(A).lerp(B, 0.5);
sp.lookAt(B);
sp.rotateX(Math.PI / 2);
sp.raycast = function () { };
G.add(sp);
}
}
var spire = new THREE.ConeGeometry(1, 1, L ? 5 : 7);
spire.translate(0, 0.5, 0);
pyInstances(G, spire, new THREE.MeshPhongMaterial({ color: 0xF0A850, shininess: 120, specular: 0xFFFFFF, transparent: true, opacity: 0.78 }), L ? 8 : 24, function () { var q = pyTgNearRoute(R, 5, 30); if (!q)
return null; return [q[0], pyTerrain(q[0], q[1]) - 0.5, q[1], Math.random() * 6, (Math.random() - 0.5) * 0.25, (Math.random() - 0.5) * 0.25, 0.5 + Math.random() * 0.7, 4 + Math.random() * 9, 0.5 + Math.random() * 0.7]; });
}
if (k === "gallery") {
var cr = new THREE.OctahedronGeometry(1, 0);
cr.scale(0.5, 1.6, 0.5);
pyInstances(G, cr, new THREE.MeshPhongMaterial({ color: 0xC09AFF, emissive: 0x5A2AA0, shininess: 110, specular: 0xFFFFFF, transparent: true, opacity: 0.9 }), L ? 14 : 40, function () { var s = list[Math.random() * list.length | 0]; if (!s || s.w <= 0)
return null; var sd = Math.random() < 0.5 ? -1 : 1; return [s.x + sd * (s.w / 2 + 0.5) * s.tz, s.y + 2 + Math.random() * 4, s.z - sd * (s.w / 2 + 0.5) * s.tx, Math.random() * 6, (Math.random() - 0.5) * 0.5, sd * 0.4, 0.4 + Math.random() * 0.6]; });
}
if (k === "lowtide") {
var poles = [];
list.forEach(function (s, i) { if (i % (L ? 12 : 7) || s.w <= 0)
return; [-1, 1].forEach(function (sd) { poles.push([s.x + sd * (s.w / 2 + 3.2) * s.tz, s.z - sd * (s.w / 2 + 3.2) * s.tx, (i / 7 | 0) % 2]); }); });
var pole = new THREE.CylinderGeometry(0.14, 0.16, 1, 6);
pole.translate(0, 0.5, 0);
[0xE8E4DA, 0xC82A22].forEach(function (col, ci) { var mine = poles.filter(function (p) { return p[2] === ci; }), k3 = 0; pyInstances(G, pole, pyMat("lambert", col), mine.length, function () { var p = mine[k3++]; return p ? [p[0], -1, p[1], 0, 0, 0, 1, 4.4, 1] : null; }); });
var pool = new THREE.CircleGeometry(1, L ? 8 : 14);
pool.rotateX(-Math.PI / 2);
pyInstances(G, pool, new THREE.MeshPhongMaterial({ color: 0x4A8AA0, shininess: 90, specular: 0xC0E0F0, transparent: true, opacity: 0.8 }), L ? 8 : 26, function () { var q = pyTgNearRoute(R, 0.5, 3.5); if (!q)
return null; return [q[0], q[2].y + 0.06, q[1], 0, 0, 0, 0.8 + Math.random() * 1.6, 1, 0.6 + Math.random() * 1.2]; });
var hull = new THREE.SphereGeometry(1, L ? 8 : 14, L ? 6 : 8, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5);
pyInstances(G, hull, new THREE.MeshLambertMaterial({ color: 0x6A4A2E, map: pyTex("wood", 2, 1), side: THREE.DoubleSide }), L ? 3 : 8, function () { var q = pyTgNearRoute(R, 6, 16); if (!q)
return null; return [q[0], PY_SEA + 0.5, q[1], Math.random() * 6, (Math.random() - 0.5) * 0.4, 0.4 + Math.random() * 0.4, 1.4, 1.1, 4]; });
var weed = new THREE.PlaneGeometry(1, 1);
weed.rotateX(-Math.PI / 2);
pyInstances(G, weed, pyMat("lambert", 0x3A4A22), L ? 16 : 50, function () { var q = pyTgNearRoute(R, 0, 4); if (!q)
return null; return [q[0], q[2].y + 0.05, q[1], Math.random() * 6, 0, 0, 0.6 + Math.random(), 1, 0.6 + Math.random() * 1.5]; });
}
if (k === "undercroft") {
var gs = [];
list.forEach(function (s, i) { if (i % (L ? 30 : 15) || s.fl.indexOf("e") < 0 || s.w <= 0)
return; gs.push(s); });
gs.forEach(function (s) {
var g = new THREE.Group();
g.position.set(s.x, s.y, s.z);
g.rotation.y = Math.atan2(s.tx, s.tz);
[-1, 1].forEach(function (sd) { var p = new THREE.Mesh(new THREE.BoxGeometry(0.4, 6, 0.4), pyMat("chrome", 0x4A4A56)); p.position.set(sd * (s.w / 2 + 0.6), 3, 0); g.add(p); });
var bm = new THREE.Mesh(new THREE.BoxGeometry(s.w + 1.6, 0.4, 0.4), pyMat("chrome", 0x4A4A56));
bm.position.y = 6;
g.add(bm);
var lt = new THREE.Mesh(new THREE.BoxGeometry(s.w * 0.7, 0.15, 0.3), pyMat("glow", R.col, { op: 0.85 }));
lt.position.y = 5.75;
g.add(lt);
g.traverse(function (o) { o.raycast = function () { }; });
G.add(g);
});
}
if (k === "turbines") {
PY.turbines = PY.turbines || [];
var tw = [];
list.forEach(function (s, i) { if (i % (L ? 30 : 17) || i < 8 || i > list.length - 8)
return; var sd = (i / 17 | 0) % 2 ? 1 : -1, a = s.w / 2 + 9 + Math.random() * 5; tw.push([s.x + sd * a * s.tz, s.z - sd * a * s.tx]); });
tw.forEach(function (p) {
if (!pyClear(p[0], p[1], 3))
return;
var tg = new THREE.Group(), y0 = pyTerrain(p[0], p[1]);
tg.position.set(p[0], y0, p[1]);
var mast = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.6, 62, L ? 8 : 12), pyMat("lambert", 0xD8DCE0));
mast.position.y = 31;
tg.add(mast);
var nac = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.6, 7), pyMat("lambert", 0xE0E4E8));
nac.position.set(0, 62, 0.5);
tg.add(nac);
var hub = new THREE.Group();
hub.position.set(0, 62, 4.2);
tg.add(hub);
var cone = new THREE.Mesh(new THREE.ConeGeometry(1.1, 2.2, 10), pyMat("lambert", 0xE8ECF0));
cone.rotation.x = Math.PI / 2;
cone.position.z = 0.6;
hub.add(cone);
for (var bl = 0; bl < 3; bl++) {
var bld = new THREE.Mesh(new THREE.BoxGeometry(1.2, 28, 0.25), pyMat("lambert", 0xE8ECF0));
bld.position.y = 14;
var arm = new THREE.Group();
arm.rotation.z = bl * Math.PI * 2 / 3;
arm.add(bld);
hub.add(arm);
}
var tip = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 6), pyMat("glow", 0xFF3A2A));
tip.position.set(0, 63.6, 0.5);
tg.add(tip);
tg.rotation.y = -0.6 + Math.random() * 0.3;
tg.traverse(function (o) { o.raycast = function () { }; });
G.add(tg);
PY.turbines.push(hub);
pySolid({ x: p[0], z: p[1], r: 1.8 });
});
var pyl = [];
for (var q = 0; q < (L ? 4 : 8); q++) {
var s0 = list[Math.floor((q + 0.5) / (L ? 4 : 8) * list.length)];
if (!s0)
continue;
var off = s0.w / 2 + 38;
pyl.push([s0.x - off * s0.tz, s0.z + off * s0.tx]);
}
var lat = wTex(32, 32, function (x, W, H) { x.clearRect(0, 0, W, H); x.strokeStyle = "#9A9EA4"; x.lineWidth = 3; x.strokeRect(1, 1, W - 2, H - 2); x.beginPath(); x.moveTo(0, 0); x.lineTo(W, H); x.moveTo(W, 0); x.lineTo(0, H); x.stroke(); }, [1, 8]);
var pm = new THREE.MeshLambertMaterial({ map: lat, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide });
var tops = pyl.map(function (p) {
var y = pyTerrain(p[0], p[1]), g = new THREE.Group();
g.position.set(p[0], y, p[1]);
var tw2 = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 2.6, 34, 4, 1, true), pm);
tw2.position.y = 17;
g.add(tw2);
var arm2 = new THREE.Mesh(new THREE.BoxGeometry(12, 0.6, 0.6), pyMat("lambert", 0x8A8E94));
arm2.position.y = 30;
g.add(arm2);
g.traverse(function (o) { o.raycast = function () { }; });
G.add(g);
pySolid({ x: p[0], z: p[1], r: 2.4 });
return new THREE.Vector3(p[0], y + 29.7, p[1]);
});
for (var c = 1; c < tops.length; c++) {
[-5, 0, 5].forEach(function (o) {
var A = tops[c - 1].clone(), B = tops[c].clone();
A.x += o;
B.x += o;
var len = A.distanceTo(B);
var cab = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, len, 4), pyMat("lambert", 0x2A2A2E));
cab.position.copy(A).lerp(B, 0.5);
cab.position.y -= 2.5;
cab.lookAt(B.x, B.y - 2.5, B.z);
cab.rotateX(Math.PI / 2);
cab.raycast = function () { };
G.add(cab);
});
}
var fs = list[Math.floor(list.length * 0.55)];
if (fs) {
var fx = fs.x + (fs.w / 2 + 26) * fs.tz, fz = fs.z - (fs.w / 2 + 26) * fs.tx, fy = pyTerrain(fx, fz), F = new THREE.Group();
F.position.set(fx, fy, fz);
F.rotation.y = Math.atan2(fs.tx, fs.tz);
var barn = new THREE.Mesh(pyTgBox(14, 8, 20, 1, 1), new THREE.MeshLambertMaterial({ color: 0x8A2A22, map: pyTex("wood", 3, 2) }));
F.add(barn);
var roof = new THREE.Mesh(new THREE.CylinderGeometry(8.2, 8.2, 20.4, 3, 1), pyMat("lambert", 0x3A3A40));
roof.rotation.x = Math.PI / 2;
roof.rotation.y = Math.PI / 2;
roof.position.y = 10;
roof.scale.set(1, 1, 0.5);
F.add(roof);
var silo = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 20, L ? 10 : 16), pyMat("lambert", 0xB8BCC0));
silo.position.set(11, 10, 4);
F.add(silo);
var dome = new THREE.Mesh(new THREE.SphereGeometry(3.4, L ? 10 : 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), pyMat("lambert", 0xC8CCD0));
dome.position.set(11, 20, 4);
F.add(dome);
var tr = new THREE.Group();
tr.position.set(-12, 1.2, -8);
tr.rotation.set(0, 0.6, Math.PI * 0.92);
var body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.6, 4), pyMat("matte", 0x3A7A2A));
tr.add(body);
[[-1.3, -0.6, 1.3, 1.4], [1.3, -0.6, 1.3, 1.4], [-1.3, -0.4, -1.2, 0.8], [1.3, -0.4, -1.2, 0.8]].forEach(function (w) { var wh = new THREE.Mesh(new THREE.CylinderGeometry(w[3], w[3], 0.6, 12), pyMat("rubber", 0x1A1A1A)); wh.rotation.z = Math.PI / 2; wh.position.set(w[0], w[1], w[2]); tr.add(wh); });
F.add(tr);
F.traverse(function (o) { o.raycast = function () { }; });
G.add(F);
pySolid({ x: fx, z: fz, hw: 8, hd: 11, rot: F.rotation.y });
}
var wall = pyTgBox(1, 1, 1, 1, 1), wl = [];
list.forEach(function (s, i) { if (i % 2 || s.w <= 0 || ((i / 24 | 0) % 3 === 2))
return; wl.push([s.x - (s.w / 2 + 5) * s.tz, s.z + (s.w / 2 + 5) * s.tx, Math.atan2(s.tx, s.tz)]); });
var kw = 0;
pyInstances(G, wall, new THREE.MeshLambertMaterial({ color: 0x8A8478, map: pyTex("stone", 2, 1) }), wl.length, function () { var p = wl[kw++]; return p ? [p[0], pyTerrain(p[0], p[1]) - 0.2, p[1], p[2], 0, 0, 0.9, 0.8 + Math.random() * 0.5, 8.5] : null; });
var bale = new THREE.CylinderGeometry(0.8, 0.8, 1.2, L ? 8 : 12);
bale.rotateZ(Math.PI / 2);
pyInstances(G, bale, new THREE.MeshLambertMaterial({ color: 0xC8A860, map: pyTex("grass", 1, 1) }), L ? 8 : 24, function () { var q = pyTgNearRoute(R, 3, 14); if (!q)
return null; return [q[0], pyTerrain(q[0], q[1]) + 0.8, q[1], Math.random() * 6]; });
var fp = new THREE.BoxGeometry(0.15, 1.3, 0.15);
fp.translate(0, 0.65, 0);
var fps = [];
list.forEach(function (s, i) { if (i % 3 || s.w <= 0)
return; fps.push([s.x + (s.w / 2 + 2.2) * s.tz, s.z - (s.w / 2 + 2.2) * s.tx]); });
var k4 = 0;
pyInstances(G, fp, pyMat("lambert", 0x6A5A44), fps.length, function () { var p = fps[k4++]; return p ? [p[0], pyTerrain(p[0], p[1]), p[1], 0, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4] : null; });
}
},
function (dt) {
var S = PY.tgSmoke;
if (!S)
return;
for (var i = 0; i < S.length; i++) {
var p = S[i];
p.t += dt * (p.big ? 0.05 : 0.08);
if (p.t > 1)
p.t -= 1;
var t = p.t, h = p.big ? 60 : 22;
p.m.position.set(p.x + t * 6, p.y + t * h, p.z + t * 3);
p.m.scale.setScalar((p.big ? 5 : 2) + t * (p.big ? 16 : 7));
p.m.material.opacity = Math.sin(Math.PI * t) * (p.big ? 0.32 : 0.22);
}
},
function () {
var snarl = [], rest = [], all = PYT.S.concat((PY.tg || []).reduce(function (a, R) { return a.concat(R.list); }, []));
all.forEach(function (s) {
if (s.w <= 0 || s.jn || /[gcrt]/.test(s.fl))
return;
if (s.main && s.zone === "paddock")
return;
(pySnarlK(s.x, s.z) > 0.5 ? snarl : rest).push(s);
});
return { snarl: snarl, rest: rest };
},
function (G) {
var L = PY.lite, sp = pyTrapSpots(), used = [], list = [], crates = [];
PY.traps = { list: list, crates: crates, mine: null, strip: null, t: 0 };
var steel = pyMat("chrome", 0x6A6E76), dark = pyMat("matte", 0x222226), rust = pyMat("lambert", 0x6A4A34);
var count = { snarl: { mine: L ? 18 : 36, grate: L ? 8 : 14, sentry: L ? 8 : 14, strip: L ? 6 : 12, ball: L ? 4 : 7, crate: L ? 8 : 14 },
rest: { mine: L ? 20 : 40, grate: L ? 6 : 12, sentry: L ? 10 : 18, strip: L ? 8 : 14, ball: L ? 3 : 6, crate: L ? 12 : 20 } };
var onGround = function (s) { return s.fl.indexOf("e") < 0; };
["snarl", "rest"].forEach(function (where) {
var pool = sp[where], C = count[where];
["ball", "sentry", "grate", "strip", "mine"].forEach(function (k) {
for (var i = 0; i < C[k]; i++) {
var s = pyTrapPick(pool, used, where === "snarl" ? 26 : 60, k === "ball" || k === "sentry" ? onGround : null);
if (!s)
continue;
var sd = Math.random() < 0.5 ? -1 : 1, T = { k: k, s: s, x: s.x, y: s.y, z: s.z, tx: s.tx, tz: s.tz, w: s.w, sd: sd, t: Math.random() * 6, hit: {}, i: list.length };
if (k === "mine") {
var a = (Math.random() - 0.5) * s.w * 0.6;
T.x = s.x + a * s.tz;
T.z = s.z - a * s.tx;
T.who = "a buried mine";
}
if (k === "sentry") {
var o = s.w / 2 + 3.2;
T.x = s.x + sd * o * s.tz;
T.z = s.z - sd * o * s.tx;
T.y = pyTerrain(T.x, T.z);
T.who = "a sentry gun";
T.cool = 1 + Math.random() * 2;
}
if (k === "grate") {
var a2 = (Math.random() - 0.5) * s.w * 0.3;
T.x = s.x + a2 * s.tz;
T.z = s.z - a2 * s.tx;
T.who = "a flame grate";
T.cyc = 6 + Math.random() * 3;
}
if (k === "strip") {
T.who = "a spike strip";
T.cyc = 5 + Math.random() * 3;
}
if (k === "ball") {
T.who = "a wrecking ball";
T.ph = Math.random() * 6.28;
T.wv = 1.1 + Math.random() * 0.4;
}
used.push(T);
list.push(T);
}
});
for (var c = 0; c < C.crate; c++) {
var s2 = pyTrapPick(pool, used, where === "snarl" ? 40 : 80, null);
if (!s2)
continue;
var K = { x: s2.x, y: s2.y + 2.4, z: s2.z, k: PY_PICK_KEYS[Math.random() * PY_PICK_KEYS.length | 0], back: 0 };
crates.push(K);
used.push(K);
}
});
var ry = function (T) { return Math.atan2(T.tx, T.tz); };
var mines = list.filter(function (T) { return T.k === "mine"; });
var plate = new THREE.CylinderGeometry(1.1, 1.2, 0.12, L ? 10 : 16);
plate.translate(0, 0.06, 0);
PY.traps.mine = pyInstances(G, plate, pyMat("chrome", 0x4A4C52), mines.length, function () { var T = mines.shift(); if (!T)
return null; T.ii = (PY.traps.mineN = (PY.traps.mineN || 0) + 1) - 1; return [T.x, T.y + 0.02, T.z, 0]; });
mines = list.filter(function (T) { return T.k === "mine"; });
var lampG = new THREE.SphereGeometry(0.12, 8, 6), mk = 0;
PY.traps.mineLamp = pyInstances(G, lampG, pyMat("glow", 0xFFA030), mines.length, function () { var T = mines[mk++]; return T ? [T.x, T.y + 0.2, T.z] : null; });
var strips = list.filter(function (T) { return T.k === "strip"; }), sk = 0;
var hzTex = wTex(64, 16, function (x, W, H) { x.fillStyle = "#E8B020"; x.fillRect(0, 0, W, H); x.fillStyle = "#141414"; for (var i = -H; i < W; i += 16) {
x.beginPath();
x.moveTo(i, H);
x.lineTo(i + 8, H);
x.lineTo(i + 8 + H, 0);
x.lineTo(i + H, 0);
x.fill();
} }, [6, 1]);
pyInstances(G, new THREE.BoxGeometry(1, 0.12, 0.8), new THREE.MeshLambertMaterial({ map: hzTex }), strips.length, function () { var T = strips[sk++]; return T ? [T.x, T.y + 0.06, T.z, ry(T) + Math.PI / 2, 0, 0, T.w * 0.92, 1, 1] : null; });
var teeth = new THREE.CylinderGeometry(0, 0.22, 0.6, 3);
teeth.translate(0, 0.3, 0);
var tk = 0, tAll = [];
strips.forEach(function (T) { var n = Math.max(4, Math.round(T.w * 0.92 / 0.55)); T.tooth = []; for (var j = 0; j < n; j++) {
var a = (j / (n - 1) - 0.5) * T.w * 0.88;
T.tooth.push(tAll.length);
tAll.push([T.x + a * T.tz, T.y, T.z - a * T.tx]);
} });
PY.traps.strip = pyInstances(G, teeth, steel, tAll.length, function () { var p = tAll[tk++]; return p ? [p[0], p[1] - 0.55, p[2]] : null; });
PY.traps.teeth = tAll;
var grates = list.filter(function (T) { return T.k === "grate"; }), gk = 0;
var grTex = wTex(64, 64, function (x, W, H) { x.fillStyle = "#2A2826"; x.fillRect(0, 0, W, H); x.fillStyle = "#0E0C0A"; for (var i = 4; i < W; i += 10)
x.fillRect(i, 4, 5, H - 8); x.strokeStyle = "#4A4440"; x.lineWidth = 3; x.strokeRect(1, 1, W - 2, H - 2); }, [1, 1]);
pyInstances(G, new THREE.BoxGeometry(5, 0.1, 3), new THREE.MeshLambertMaterial({ map: grTex }), grates.length, function () { var T = grates[gk++]; return T ? [T.x, T.y + 0.05, T.z, ry(T)] : null; });
grates.forEach(function (T) {
var gl = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 2.6), new THREE.MeshBasicMaterial({ color: 0xFF6A20, transparent: true, opacity: 0, depthWrite: false, fog: true }));
gl.rotation.order = "YXZ";
gl.rotation.set(-Math.PI / 2, ry(T), 0);
gl.position.set(T.x, T.y + 0.12, T.z);
gl.raycast = function () { };
G.add(gl);
T.glow = gl;
});
var sents = list.filter(function (T) { return T.k === "sentry"; }), ek = 0;
var post = new THREE.CylinderGeometry(0.35, 0.45, 1, 8);
post.translate(0, 0.5, 0);
pyInstances(G, post, steel, sents.length, function () { var T = sents[ek++]; return T ? [T.x, T.y, T.z, 0, 0, 0, 1.3, 4, 1.3] : null; });
ek = 0;
pyInstances(G, new THREE.BoxGeometry(2.2, 0.6, 2.2), dark, sents.length, function () { var T = sents[ek++]; return T ? [T.x, T.y + 0.3, T.z, Math.random()] : null; });
var headG = new THREE.BoxGeometry(1.3, 0.9, 1.5), barG = new THREE.CylinderGeometry(0.12, 0.14, 2, 8), eyeM = pyMat("glow", 0xFF3A2A), headM = pyMat("paint", 0x3A3E44);
barG.rotateX(Math.PI / 2);
barG.translate(0, 0, 1.6);
sents.forEach(function (T) {
var h = new THREE.Group();
h.position.set(T.x, T.y + 4.4, T.z);
h.scale.setScalar(1.5);
var hb = new THREE.Mesh(headG, headM);
h.add(hb);
[-0.3, 0.3].forEach(function (dx) { var b = new THREE.Mesh(barG, steel); b.position.x = dx; h.add(b); });
var e = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.05), eyeM);
e.position.set(0, 0.2, 0.76);
h.add(e);
h.rotation.y = ry(T) + Math.PI;
h.traverse(function (o) { o.raycast = function () { }; });
G.add(h);
T.head = h;
pySolid({ x: T.x, z: T.z, r: 1.2 });
});
var balls = list.filter(function (T) { return T.k === "ball"; }), bk = 0, gpost = [], gbeam = [];
balls.forEach(function (T) { var o = T.w / 2 + 2.2; [-1, 1].forEach(function (sd) { var px = T.x + sd * o * T.tz, pz = T.z - sd * o * T.tx; gpost.push([px, pyTerrain(px, pz), pz, T.y + 16.5]); pySolid({ x: px, z: pz, r: 0.9 }); }); gbeam.push(T); });
var gp = new THREE.BoxGeometry(0.9, 1, 0.9);
gp.translate(0, 0.5, 0);
pyInstances(G, gp, pyMat("paint", 0xC89A2A), gpost.length, function () { var p = gpost[bk++]; return p ? [p[0], p[1], p[2], 0, 0, 0, 1, Math.max(2, p[3] - p[1]), 1] : null; });
bk = 0;
pyInstances(G, new THREE.BoxGeometry(1, 1.1, 1.1), pyMat("paint", 0xC89A2A), gbeam.length, function () { var T = gbeam[bk++]; return T ? [T.x, T.y + 16, T.z, ry(T) + Math.PI / 2, 0, 0, T.w + 5.4, 1, 1] : null; });
var ballG = new THREE.SphereGeometry(1.7, L ? 10 : 16, L ? 8 : 12), spikeG = new THREE.ConeGeometry(0.22, 0.8, 5), chainG = new THREE.CylinderGeometry(0.09, 0.09, 1, 5);
chainG.translate(0, -0.5, 0);
balls.forEach(function (T) {
var pv = new THREE.Group();
pv.position.set(T.x, T.y + 16, T.z);
pv.rotation.y = ry(T);
G.add(pv);
var sw = new THREE.Group();
pv.add(sw);
var ch = new THREE.Mesh(chainG, steel);
ch.scale.y = 11.5;
sw.add(ch);
var b = new THREE.Mesh(ballG, pyMat("matte", 0x2A2A2E));
b.position.y = -13.2;
sw.add(b);
if (!L)
for (var q = 0; q < 8; q++) {
var spk = new THREE.Mesh(spikeG, steel);
var a = q * 0.785;
spk.position.set(Math.cos(a) * 1.75, -13.2 + Math.sin(a) * 1.75, (q % 2 ? 0.6 : -0.6));
spk.lookAt(new THREE.Vector3(Math.cos(a) * 5, -13.2 + Math.sin(a) * 5, (q % 2 ? 2 : -2)));
spk.rotateX(Math.PI / 2);
sw.add(spk);
}
pv.traverse(function (o) { o.raycast = function () { }; });
T.swing = sw;
T.ballR = 1.7;
});
if (PY.traps.mine)
PY.traps.mine.instanceMatrix.needsUpdate = true;
var crateTex = wTex(64, 64, function (x, W, H) {
x.fillStyle = "#3A3C42";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#FFB040";
x.lineWidth = 4;
x.strokeRect(3, 3, W - 6, H - 6);
x.beginPath();
x.moveTo(3, 3);
x.lineTo(W - 3, H - 3);
x.moveTo(W - 3, 3);
x.lineTo(3, H - 3);
x.stroke();
x.fillStyle = "#FFB040";
x.font = "bold 18px sans-serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText("ARMS", W / 2, H / 2);
}, [1, 1]);
var crM = new THREE.MeshLambertMaterial({ map: crateTex, emissive: 0x2A1A08 }), crG = new THREE.BoxGeometry(1.6, 1.6, 1.6), ringG = new THREE.TorusGeometry(1.5, 0.06, 6, L ? 16 : 28), ringM = pyMat("glow", 0xFFB040, { op: 0.85 });
crates.forEach(function (K) {
var g = new THREE.Group();
g.position.set(K.x, K.y, K.z);
var b = new THREE.Mesh(crG, crM);
g.add(b);
var r = new THREE.Mesh(ringG, ringM);
r.rotation.x = Math.PI / 2;
g.add(r);
g.traverse(function (o) { o.raycast = function () { }; });
G.add(g);
K.g = g;
K.box = b;
K.ring = r;
});
},
function (dt) {
var P = PY.traps;
if (!P || !P.list)
return;
P.t += dt;
var cam = camera.position, cx = cam.x - PY.base, cz = cam.z, A = pyActors();
for (var i = 0; i < P.list.length; i++) {
var T = P.list[i], d = Math.hypot(T.x - cx, T.z - cz);
if (d > 220)
continue;
T.t += dt;
if (T.k === "mine") {
if (T.off) {
T.off -= dt;
if (T.off <= 0) {
T.off = 0;
pyTrapMat(P.mine, T.ii, T.x, T.y + 0.02, T.z, 0, 1, 1, 1);
pyTrapMat(P.mineLamp, T.ii, T.x, T.y + 0.2, T.z, 0, 1, 1, 1);
}
continue;
}
for (var a = 0; a < A.length; a++) {
var b = A[a];
if (b.st.air || b.st.phase > 0 || b.ghost)
continue;
if (Math.hypot(b.x - T.x, b.z - T.z) < 1.6 * pyBulk(b.car) && Math.abs(b.y - T.y) < 2) {
pyHit(b, 26, { id: "trap:" + i }, "a buried mine");
pyBoom(T.x, T.y + 0.5, T.z, 4.5, 0, "trap:" + i, "pmine");
if (b.me && !PY.me.air) {
PY.me.air = true;
PY.me.vy = 7;
}
if (b.me)
pyFeed("💥 A buried mine!", "#FFB070");
T.off = 10;
pyTrapMat(P.mine, T.ii, T.x, T.y - 2, T.z, 0, 0.01, 0.01, 0.01);
pyTrapMat(P.mineLamp, T.ii, T.x, T.y - 2, T.z, 0, 0.01, 0.01, 0.01);
break;
}
}
}
else if (T.k === "strip") {
var c = T.t % T.cyc, up = c < T.cyc - 2.6 ? 0 : c < T.cyc - 2.2 ? (c - (T.cyc - 2.6)) / 0.4 : c < T.cyc - 0.4 ? 1 : (T.cyc - c) / 0.4;
if (d < 160 && Math.abs(up - (T.up || 0)) > 0.01) {
T.up = up;
T.tooth.forEach(function (j) { var p = P.teeth[j]; pyTrapMat(P.strip, j, p[0], p[1] - 0.55 + up * 0.62, p[2], 0, 1, 1, 1); });
}
if (up > 0.6)
A.forEach(function (b) {
if (b.st.air || b.st.phase > 0 || b.ghost)
return;
var dx = b.x - T.x, dz = b.z - T.z, al = dx * T.tx + dz * T.tz, ac = dx * T.tz - dz * T.tx;
if (Math.abs(al) < 1.6 && Math.abs(ac) < T.w / 2 && Math.abs(b.y - T.y) < 2 && (T.hit[b.id] || 0) < P.t - 1.5) {
T.hit[b.id] = P.t;
if (b.st.ice > 0)
return;
pyHit(b, 10, { id: "trap:" + i }, "a spike strip");
pyAffect(b, "slow", 2.2);
pyAffect(b, "spin", 0.8);
if (b.me)
pyFeed("🦔 Spike strip!", "#E8D8A8");
}
});
}
else if (T.k === "grate") {
var c2 = T.t % T.cyc, warm = T.cyc - 3.2, fire = c2 > warm + 1.4 && c2 < warm + 3.0, g = c2 < warm ? 0 : c2 < warm + 1.4 ? (c2 - warm) / 1.4 * 0.55 : c2 < warm + 3.0 ? 0.75 : Math.max(0, 0.75 - (c2 - warm - 3.0) * 3);
if (T.glow)
T.glow.material.opacity = g;
if (fire) {
T.puff = (T.puff || 0) - dt;
if (T.puff <= 0 && d < 150) {
T.puff = PY.lite ? 0.2 : 0.1;
pySoft(T.x + (Math.random() - 0.5) * 3.5, T.y + 1 + Math.random() * 3, T.z + (Math.random() - 0.5) * 2, Math.random() < 0.5 ? 0xFF8A30 : 0xFFC060, 2.2 + Math.random() * 1.6, 0.7);
}
A.forEach(function (b) { if (b.st.phase > 0 || b.ghost)
return; if (Math.hypot(b.x - T.x, b.z - T.z) < 3.2 * pyBulk(b.car) && b.y - T.y < 5 && (T.hit[b.id] || 0) < P.t - 0.5) {
T.hit[b.id] = P.t;
pyHit(b, 7, { id: "trap:" + i }, "a flame grate");
pyAffect(b, "slow", 0.6);
if (b.me)
pyFeed("🔥 Flame grate!", "#FFB070");
} });
}
}
else if (T.k === "sentry") {
var tgt = null, bd = 85;
A.forEach(function (b) { if (b.st.cloak > 0 || b.ghost)
return; var dd = Math.hypot(b.x - T.x, b.z - T.z); if (dd < bd && Math.abs(b.y - T.y) < 14) {
bd = dd;
tgt = b;
} });
if (tgt) {
var want = Math.atan2(tgt.x - T.x, tgt.z - T.z), cur = T.head.rotation.y, dlt = ((want - cur + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
T.head.rotation.y = cur + Math.max(-dt * 2.2, Math.min(dt * 2.2, dlt));
T.cool -= dt;
if (T.cool <= 0 && Math.abs(dlt) < 0.25) {
T.cool = 2.6;
var fx = Math.sin(T.head.rotation.y), fz = Math.cos(T.head.rotation.y), y0 = T.y + 4.6;
var dy = (tgt.y + 1) - y0, len = Math.hypot(tgt.x - T.x, tgt.z - T.z) || 1, v = 62;
pyShot({ kind: "sentry", x: T.x + fx * 3.6, y: y0, z: T.z + fz * 2.4, vx: fx * v, vz: fz * v, vy: dy / len * v, spd: v, dmg: 8, home: 0.9, tgt: tgt, owner: "trap:" + i, col: 0xFF7A3A, life: 2.4 });
pySoft(T.x + fx * 3.2, y0, T.z + fz * 3.2, 0xD8D0C0, 1.2, 0.5);
}
}
}
else if (T.k === "ball") {
var th = Math.sin(P.t * T.wv + T.ph) * 0.55;
T.swing.rotation.z = th;
var off = Math.sin(th) * 13.2, by = T.y + 16 - Math.cos(th) * 13.2, bx = T.x + off * T.tz, bz = T.z - off * T.tx, vel = Math.cos(P.t * T.wv + T.ph) * 0.55 * T.wv * 13.2;
A.forEach(function (b) {
if (b.st.phase > 0 || b.ghost)
return;
var dd = Math.hypot(b.x - bx, b.z - bz);
if (dd < T.ballR + 1.4 * pyBulk(b.car) && Math.abs((b.y + 1.2) - by) < T.ballR + 1.5 && (T.hit[b.id] || 0) < P.t - 1.2) {
T.hit[b.id] = P.t;
var sgn = vel >= 0 ? 1 : -1;
pyHit(b, 28, { id: "trap:" + i }, "a wrecking ball");
pyPush(b, sgn * T.tz * 18, -sgn * T.tx * 18);
pyAffect(b, "spin", 0.9);
pySoft(bx, by, bz, 0xD8D0C0, 3, 0.8);
if (b.me)
pyFeed("⚫ Wrecking ball!", "#E8E0D0");
}
});
}
}
var armsOn = pyArmsAllowed();
P.crates.forEach(function (K) {
if (!K.g)
return;
var d = Math.hypot(K.x - cx, K.z - cz);
if (d > 220)
return;
if (K.back > 0) {
K.back -= dt;
if (K.back <= 0) {
K.g.visible = true;
}
return;
}
K.g.visible = armsOn;
if (!armsOn)
return;
K.box.rotation.y += dt * 0.8;
K.ring.rotation.z += dt * 0.4;
for (var a = 0; a < A.length; a++) {
var b = A[a];
if (b.ghost)
continue;
if (Math.hypot(b.x - K.x, b.z - K.z) < 2.4 * pyBulk(b.car) && Math.abs(b.y + 1 - K.y) < 3.2) {
var W = PY_PICK[K.k];
b.st.pick = { k: K.k, n: W.n };
K.back = 18;
K.g.visible = false;
pySoft(K.x, K.y, K.z, 0xFFC060, 2.4, 0.8);
if (b.me)
pyFeed(W.icon + " " + W.name + " (" + W.n + "): " + W.say + ". F fires it.", "#FFD27A");
K.k = PY_PICK_KEYS[Math.random() * PY_PICK_KEYS.length | 0];
break;
}
}
});
PY.riv.forEach(function (R) {
if (R.dead || !R.st.pick)
return;
R.st.pickT = (R.st.pickT || 0) - dt;
if (R.st.pickT > 0)
return;
R.st.pickT = 1.2;
var k = R.st.pick.k, ok = k === "scatter" ? pyActors().some(function (b) { if (b.id === R.id)
return false; var f = pyFwd(R), al = (b.x - R.x) * f.x + (b.z - R.z) * f.z; return al < -4 && al > -50; }) : !!pyTargetAhead(R, k === "inferno" ? 14 : k === "barrel" ? 60 : 220, 0.3);
if (ok && Math.random() < 0.6)
pyPickFire(R);
});
pyPickTick(dt);
},
function (a) {
var st = a.st, P = st.pick;
if (!P || P.n <= 0)
return false;
PY.kb = PY.kb || [];
if (PY.race && PY.race.st !== "on" && PY.race.st !== "free")
return false;
if (!pyArmsAllowed())
return false;
if ((st.pickCool || 0) > PY.t)
return false;
st.pickCool = PY.t + 1.1;
var f = pyFwd(a), y0 = a.y + 1.2, L = ((PY_STYLE[a.car && a.car.style] || PY_STYLE.wedge).L) / 2 + 1, k = P.k;
if (k === "siege") {
var tgt = pyTargetAhead(a, 280, 0.7);
for (var i = 0; i < 6; i++) {
var sp = (i - 2.5) * 0.09, ca = Math.cos(sp), sa = Math.sin(sp), dx = f.x * ca - f.z * sa, dz = f.z * ca + f.x * sa, v = 72 + Math.max(0, a.v);
pyShot({ kind: "siege", x: a.x + dx * L, y: y0 + 0.4 + (i % 2) * 0.3, z: a.z + dz * L, vx: dx * v, vz: dz * v, vy: 1.5, spd: v, dmg: 12, home: 2.2, tgt: tgt, owner: a.id, col: 0xFFB070, big: 1, life: 4.5 });
}
}
else if (k === "rail") {
var t = pyTargetAhead(a, 230, 0.22), end = t ? { x: t.x, y: t.y + 1, z: t.z } : { x: a.x + f.x * 230, y: y0, z: a.z + f.z * 230 };
pyBeam(a, end, 0xBFE0FF, "rail");
if (t && !t.decoy) {
pyHit(t, 36, a, "Thunder rail");
pyAffect(t, "stun", 0.6);
pySoft(t.x, t.y + 1, t.z, 0xBFE0FF, 2.6, 0.6);
}
}
else if (k === "barrel") {
var bt = pyTargetAhead(a, 80, 0.35), bd = bt ? Math.max(14, Math.hypot(bt.x - a.x, bt.z - a.z) + Math.max(0, bt.v || 0) * 1.8) : 40, bv = bd / 1.84;
var m = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.1, 10), pyMat("paint", 0xC83A1A));
scene.add(m);
PY.kb.push({ m: m, x: a.x + f.x * L, y: y0 + 0.8, z: a.z + f.z * L, vx: f.x * bv, vz: f.z * bv, vy: 9, owner: a.id, t: 0 });
}
else if (k === "scatter") {
for (var j = 0; j < 5; j++) {
var an = (j - 2) * 0.32, bx = a.x - (f.x * Math.cos(an) - f.z * Math.sin(an)) * (L + 3 + j % 2 * 2), bz = a.z - (f.z * Math.cos(an) + f.x * Math.sin(an)) * (L + 3 + j % 2 * 2);
pyDrop({ kind: "mine", x: bx, z: bz, y: pyGround(bx, bz, a.y + 1), life: 30, owner: a.id, dmg: 26, arm: 0.6 });
}
}
else if (k === "inferno") {
st.flame = Math.max(st.flame || 0, 3.2);
}
else if (k === "hammer") {
var h = pyTargetAhead(a, 260, 0.5);
var hx = h ? h.x : a.x + f.x * 60, hz = h ? h.z : a.z + f.z * 60;
PY.kb.push({ hammer: 1, tgt: h, x: hx, z: hz, y: pyGround(hx, hz, a.y + 2), owner: a.id, t: 0 });
if (h && h.me)
pyFeed("🔨 The Sky hammer is coming down on you!", "#FF9A7A");
}
P.n--;
if (P.n <= 0)
st.pick = null;
if (a.me) {
pyFeed(PY_PICK[k].icon + " " + PY_PICK[k].name + (st.pick ? ": " + st.pick.n + " left" : ": that was the last"), "#FFD27A");
if (typeof playTone === "function")
try {
playTone(200, 0.15);
}
catch (e) { }
}
return true;
},
function (dt) {
PY.kb = PY.kb || [];
for (var i = PY.kb.length - 1; i >= 0; i--) {
var B = PY.kb[i];
B.t += dt;
if (B.hammer) {
var T = B.tgt ? pyActorById(B.tgt.id) : null;
if (T && B.t < 1.0) {
B.x = T.x;
B.z = T.z;
B.y = T.y;
}
if (!B.ring) {
B.ring = new THREE.Mesh(new THREE.RingGeometry(3.5, 4.2, PY.lite ? 20 : 36), new THREE.MeshBasicMaterial({ color: 0xFF5A3A, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
B.ring.rotation.x = -Math.PI / 2;
scene.add(B.ring);
}
B.ring.position.set(PY.base + B.x, B.y + 0.3, B.z);
B.ring.material.opacity = Math.min(0.7, B.t * 0.6);
var sc = 1.6 - Math.min(1, B.t / 1.3) * 0.6;
B.ring.scale.set(sc, sc, sc);
if (B.t >= 1.3) {
pyBoom(B.x, B.y + 1, B.z, 7, 45, B.owner, "Sky hammer");
pySmokeBig(B.x, B.y, B.z);
pyGone(B.ring);
PY.kb.splice(i, 1);
}
continue;
}
B.vy -= PY_G * dt;
B.x += B.vx * dt;
B.y += B.vy * dt;
B.z += B.vz * dt;
B.m.position.set(PY.base + B.x, B.y, B.z);
B.m.rotation.x += dt * 5;
var g = pyGround(B.x, B.z, B.y + 1);
if (B.y <= g + 0.4 || B.t > 4) {
pyBoom(B.x, g + 0.8, B.z, 9, 30, B.owner, "blast barrel");
pySmokeBig(B.x, g, B.z);
pyGone(B.m);
PY.kb.splice(i, 1);
}
}
},
function (g, car, K) {
var L = K.L, W = K.W, lite = K.lite, add = K.add, box = K.box, cyl = K.cyl;
var black = pyMat("matte", 0x141416), steel = pyMat("chrome", 0x6A6E76), dark = pyMat("matte", 0x222226), glass = pyMat("glass", 0x1A2430);
var paint = pyMat("paint", car.col), trimP = pyMat("paint", car.trim), top = 2.95;
[-1, 1].forEach(function (s) { [1.05, 1.5].forEach(function (y) { box(0.06, 0.12, L * 0.9, s * (W + 0.02), y, -0.15, trimP); }); });
var nW = lite ? 6 : 9, span = L * 0.66, z0 = -L / 2 + 0.6;
[-1, 1].forEach(function (s) {
for (var i = 0; i < nW; i++) {
var z = z0 + (i + 0.5) * span / nW;
var wpane = new THREE.Mesh(new THREE.PlaneGeometry(span / nW - 0.18, 0.72), glass);
wpane.position.set(s * (W + 0.015), 2.22, z);
wpane.rotation.y = s * Math.PI / 2;
add(wpane);
if (!lite || i % 2 === 0)
for (var b = 0; b < 3; b++)
box(0.05, 0.08, span / nW - 0.14, s * (W + 0.05), 1.98 + b * 0.24, z, steel);
if (i % 3 === 1)
box(0.05, 0.7, span / nW - 0.2, s * (W + 0.06), 2.22, z, dark);
}
var dz = L / 2 - L * 0.17;
box(0.04, 1.7, 0.9, s * (W + 0.02), 1.55, dz, s > 0 ? glass : paint);
if (s > 0)
for (var d = 0; d < 2; d++)
box(0.05, 1.7, 0.05, s * (W + 0.05), 1.55, dz - 0.45 + d * 0.9, steel);
});
var arm = new THREE.Group();
arm.position.set(-(W + 0.25), 1.9, L / 2 - L * 0.24);
var oct = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 8), pyMat("paint", 0xC81E1E));
oct.rotation.z = Math.PI / 2;
oct.rotation.x = Math.PI / 8;
arm.add(oct);
var rim = new THREE.Mesh(new THREE.TorusGeometry(0.39, 0.025, 4, 8), pyMat("paint", 0xF4F0E8));
rim.rotation.y = Math.PI / 2;
rim.rotation.x = Math.PI / 8;
arm.add(rim);
var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), pyMat("glow", 0xFF5030));
lamp.position.set(-0.04, 0.28, 0);
arm.add(lamp);
add(arm);
var ry = top + 0.05;
[-1, 1].forEach(function (s) {
var rail = cyl(0.05, L * 0.82, s * (W - 0.15), ry + 0.45, -0.25, steel, "z");
for (var p = 0; p < (lite ? 4 : 7); p++) {
var zz = -L / 2 + 0.7 + p * (L * 0.8 / ((lite ? 4 : 7) - 1));
cyl(0.04, 0.45, s * (W - 0.15), ry + 0.22, zz, steel);
var sp = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.3, 5), steel);
sp.position.set(s * (W - 0.15), ry + 0.62, zz);
add(sp);
}
});
for (var q = 0; q < (lite ? 2 : 4); q++)
box(W * 1.5, 0.08, 1.1, 0, ry + 0.02, -L / 2 + 1.2 + q * 1.7, dark);
box(0.9, 0.12, 0.9, 0, ry + 0.06, L * 0.05, steel);
[-1, 1].forEach(function (s) { [[L / 2 - 0.35, 0xFFB030], [-L / 2 + 0.12, 0xFF3A2A]].forEach(function (o) { var lm = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), pyMat("glow", o[1])); lm.scale.set(1.2, 0.8, 0.6); lm.position.set(s * (W - 0.35), top - 0.12, o[0]); add(lm); }); });
var nm = pyKitTex("kitbus:" + car.k, 256, 48, function (x, w, h) {
x.fillStyle = pyKitHex(car.col);
x.fillRect(0, 0, w, h);
x.fillStyle = "#141414";
x.fillRect(0, 0, w, 5);
x.fillRect(0, h - 5, w, 5);
x.font = "bold 30px sans-serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(car.name.toUpperCase(), w / 2, h / 2 + 1);
});
var nmM = new THREE.MeshLambertMaterial({ map: nm });
var fb = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.5, 0.32), nmM);
fb.position.set(0, top - 0.28, L / 2 - L * 0.1 + 0.03);
add(fb);
var bb = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.5, 0.32), nmM);
bb.position.set(0, top - 0.28, -L / 2 - 0.03);
bb.rotation.y = Math.PI;
add(bb);
box(1.0, 1.9, 0.04, 0, 1.6, -L / 2 - 0.03, paint);
var bw = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.6), glass);
bw.position.set(0, 2.15, -L / 2 - 0.06);
bw.rotation.y = Math.PI;
add(bw);
for (var r = 0; r < 5; r++)
box(0.5, 0.04, 0.04, W * 0.62, 0.9 + r * 0.42, -L / 2 - 0.08, steel);
[-1, 1].forEach(function (s) { cyl(0.11, 3.4, s * (W - 0.1), 1.9, -L / 2 + 0.35, steel); var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.12, 0.2, 10), black); cap.position.set(s * (W - 0.1), 3.65, -L / 2 + 0.35); add(cap); });
var pl = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, W * 2.15, lite ? 8 : 14, 1, true, -0.8, 1.6), pyMat("chrome", 0x7A7E86, { ds: 1 }));
pl.rotation.z = Math.PI / 2;
pl.position.set(0, 0.75, L / 2 - 0.55);
add(pl);
for (var k = 0; k < (lite ? 5 : 9); k++) {
var sk = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.45, 6), steel);
sk.rotation.x = Math.PI / 2;
sk.position.set((k / ((lite ? 5 : 9) - 1) - 0.5) * W * 1.9, 0.75, L / 2 + 0.6);
add(sk);
}
box(W * 1.9, 0.25, 0.2, 0, 0.55, L / 2 + 0.02, black);
[-1, 1].forEach(function (s) { cyl(0.025, 0.6, s * (W + 0.3), 2.3, L / 2 - 0.2, steel, "x"); var mr = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 12), black); mr.rotation.x = Math.PI / 2; mr.position.set(s * (W + 0.6), 2.3, L / 2 - 0.2); add(mr); });
},
function (g, car, K) {
var L = K.L, W = K.W, lite = K.lite, add = K.add, box = K.box, cyl = K.cyl, top = 2.65;
var steel = pyMat("chrome", 0xD8DCE4), dark = pyMat("matte", 0x222226), glass = pyMat("glass", 0x1A2430), trimP = pyMat("paint", car.trim), white = pyMat("paint", 0xF8F4EE);
var boxEnd = -L / 2 + L * 0.68;
[-1, 1].forEach(function (s) { box(0.04, 0.28, L * 0.66, s * (W + 0.02), 1.28, -L / 2 + L * 0.34, trimP); box(0.05, 0.06, L * 0.92, s * (W + 0.03), 0.98, -0.05, steel); });
var hz = -L / 2 + L * 0.4, hw = L * 0.36;
var hatch = new THREE.Mesh(new THREE.PlaneGeometry(hw, 0.95), glass);
hatch.position.set(W + 0.015, 1.95, hz);
hatch.rotation.y = Math.PI / 2;
add(hatch);
box(0.35, 0.06, hw, W + 0.18, 1.42, hz, steel);
var stripe = pyKitTex("kitice:aw:" + car.k, 128, 32, function (x, w, h) { for (var i = 0; i < 8; i++) {
x.fillStyle = i % 2 ? "#F8F4EE" : pyKitHex(car.trim);
x.fillRect(i * w / 8, 0, w / 8, h);
} });
var aw = new THREE.Mesh(new THREE.PlaneGeometry(hw + 0.3, 0.8), new THREE.MeshLambertMaterial({ map: stripe, side: THREE.DoubleSide }));
aw.position.set(W + 0.35, 2.62, hz);
aw.rotation.y = Math.PI / 2;
aw.rotation.x = -0.6;
add(aw);
aw.rotation.order = "YXZ";
aw.rotation.set(-0.6, Math.PI / 2, 0);
for (var sc = 0; sc < (lite ? 4 : 8); sc++) {
var sd = new THREE.Mesh(new THREE.CircleGeometry(0.11, 8, 0, Math.PI), pyMat("paint", sc % 2 ? 0xF8F4EE : car.trim));
sd.position.set(W + 0.68, 2.32, hz - hw / 2 + (sc + 0.5) * hw / (lite ? 4 : 8));
sd.rotation.set(Math.PI, Math.PI / 2, 0);
add(sd);
}
var menu = pyKitTex("kitice:menu", 256, 128, function (x, w, h) {
x.fillStyle = "#FFF6E8";
x.fillRect(0, 0, w, h);
x.strokeStyle = "#C83A6A";
x.lineWidth = 6;
x.strokeRect(3, 3, w - 6, h - 6);
var cols = ["#F4A8C8", "#9AE0C8", "#F8E8B0", "#8A5A3A", "#C8A8F0"];
for (var i = 0; i < 5; i++) {
var cx = 26 + i * 50;
x.fillStyle = "#D8A060";
x.beginPath();
x.moveTo(cx - 12, 52);
x.lineTo(cx + 12, 52);
x.lineTo(cx, 92);
x.fill();
x.strokeStyle = "rgba(120,70,30,.6)";
x.lineWidth = 1;
for (var k = 0; k < 4; k++) {
x.beginPath();
x.moveTo(cx - 10 + k * 6, 52);
x.lineTo(cx - 2 + k * 3, 90);
x.stroke();
}
x.fillStyle = cols[i];
x.beginPath();
x.arc(cx, 44, 14, 0, Math.PI * 2);
x.fill();
x.fillStyle = cols[(i + 2) % 5];
x.beginPath();
x.arc(cx, 28, 11, 0, Math.PI * 2);
x.fill();
}
x.fillStyle = "#C83A6A";
x.font = "bold 22px sans-serif";
x.textAlign = "center";
x.fillText("SOFT SERVE · SUNDAES · SHAKES", w / 2, 118);
});
var mb = new THREE.Mesh(new THREE.PlaneGeometry(L * 0.5, 1.1), new THREE.MeshLambertMaterial({ map: menu }));
mb.position.set(-(W + 0.02), 1.95, -L / 2 + L * 0.36);
mb.rotation.y = -Math.PI / 2;
add(mb);
var waffle = pyKitTex("kitice:waffle", 64, 64, function (x, w, h) {
x.fillStyle = "#D89A50";
x.fillRect(0, 0, w, h);
x.strokeStyle = "rgba(130,70,20,.7)";
x.lineWidth = 3;
for (var i = -w; i < w * 2; i += 12) {
x.beginPath();
x.moveTo(i, 0);
x.lineTo(i + h, h);
x.stroke();
x.beginPath();
x.moveTo(i, h);
x.lineTo(i + h, 0);
x.stroke();
}
});
var C = new THREE.Group();
C.position.set(0, top - 0.1, -L / 2 + L * 0.34);
add(C);
var post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, 0.6, 10), steel);
post.position.y = 0.1;
C.add(post);
var cup = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.18, 0.35, lite ? 10 : 16, 1, true), steel);
cup.position.y = 0.5;
C.add(cup);
var cone = new THREE.Mesh(new THREE.ConeGeometry(0.62, 1.6, lite ? 10 : 18), new THREE.MeshLambertMaterial({ map: waffle }));
cone.rotation.x = Math.PI;
cone.position.y = 1.0;
C.add(cone);
var flav = car.k === "sundaescorcher" ? [0xF8EEDA, 0x6A3A1A, 0xF8EEDA] : car.k === "sprinklestorm" ? [0xBFE4FF, 0xFF8AC8, 0xFFF0A0] : [0xF4A8C8, 0x9AE0C8, 0xF8F0DC];
[[0, 1.95, 0, 0.72], [0, 2.65, 0, 0.62], [0, 3.25, 0, 0.5]].forEach(function (p, i) {
var sc2 = new THREE.Mesh(new THREE.SphereGeometry(p[3], lite ? 12 : 20, lite ? 8 : 14), pyMat("paint", flav[i]));
sc2.position.set(p[0], p[1], p[2]);
sc2.scale.y = 0.85;
C.add(sc2);
var lip = new THREE.Mesh(new THREE.TorusGeometry(p[3] * 0.95, 0.08, 6, lite ? 10 : 16), pyMat("paint", flav[i]));
lip.rotation.x = Math.PI / 2;
lip.position.set(p[0], p[1] - p[3] * 0.45, p[2]);
C.add(lip);
});
var drip = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 0.5, 8), pyMat("paint", flav[0]));
drip.position.set(0.5, 1.55, 0.25);
C.add(drip);
var cherry = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), pyMat("paint", 0xC8101E));
cherry.position.set(0, 3.75, 0);
C.add(cherry);
var stem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.3, 4), pyMat("matte", 0x3A5A1A));
stem.position.set(0.05, 3.95, 0);
stem.rotation.z = -0.4;
C.add(stem);
if (!lite) {
var sp = new THREE.BoxGeometry(0.05, 0.05, 0.16), cols = [0xFF4A6A, 0x4AC8FF, 0xFFE04A, 0x7AFF7A, 0xFFFFFF, 0xB07AFF];
var n = 0;
pyInstances(C, sp, pyMat("paint", 0xFFFFFF), 36, function () {
var i = n++, a = i * 2.4, yy = 1.95 + (i % 3) * 0.7, r = [0.7, 0.6, 0.48][i % 3] * 0.96, el = 0.2 + ((i * 7) % 5) * 0.12;
return [Math.cos(a) * r * Math.cos(el), yy + Math.sin(el) * r * 0.8, Math.sin(a) * r * Math.cos(el), a, el, i];
});
var inst = C.children[C.children.length - 1];
if (inst && inst.isInstancedMesh && inst.setColorAt) {
for (var j = 0; j < inst.count; j++)
inst.setColorAt(j, new THREE.Color(cols[j % cols.length]));
if (inst.instanceColor)
inst.instanceColor.needsUpdate = true;
}
}
[-1, 1].forEach(function (s) { var hn = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.55, lite ? 8 : 14, 1, true), steel); hn.rotation.x = -Math.PI / 2; hn.position.set(s * 0.5, top + 0.25, boxEnd + 0.1); add(hn); });
box(W * 1.95, 0.22, 0.22, 0, 0.62, L / 2 + 0.05, steel);
box(W * 1.95, 0.22, 0.22, 0, 0.62, -L / 2 - 0.05, steel);
for (var gI = 0; gI < 6; gI++)
box(0.05, 0.5, 0.04, (gI - 2.5) * 0.22, 1.05, L / 2 + 0.01, steel);
for (var t = 0; t < (lite ? 7 : 13); t++) {
var th = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.26, 4), white);
th.rotation.x = Math.PI;
th.position.set((t / ((lite ? 7 : 13) - 1) - 0.5) * W * 1.8, 0.42, L / 2 + 0.13);
add(th);
}
for (var r = 0; r < 5; r++)
box(0.45, 0.04, 0.04, -W * 0.55, 0.8 + r * 0.38, -L / 2 - 0.06, steel);
for (var v = 0; v < 4; v++)
box(0.8, 0.05, 0.04, W * 0.35, 1.4 + v * 0.18, -L / 2 - 0.05, dark);
},
function (g, car, K) {
var L = K.L, W = K.W, lite = K.lite, add = K.add, box = K.box, cyl = K.cyl, clr = K.clr;
var steel = pyMat("chrome", 0x6A6E76), dark = pyMat("matte", 0x1E1E22), paint = pyMat("paint", car.col), trimP = pyMat("paint", car.trim), eye = pyMat("glow", car.trim === 0xD83A2A ? 0xFF2A1A : 0xFFB030);
var tread = pyKitTex("kitmech:tread", 64, 128, function (x, w, h) { x.fillStyle = "#222226"; x.fillRect(0, 0, w, h); for (var y = 0; y < h; y += 16) {
x.fillStyle = "#3A3A40";
x.fillRect(2, y, w - 4, 9);
x.fillStyle = "#141416";
x.fillRect(0, y + 9, w, 2);
} });
var hazard = pyKitTex("kitmech:hazard", 128, 32, function (x, w, h) { x.fillStyle = "#E8B020"; x.fillRect(0, 0, w, h); x.fillStyle = "#141414"; for (var i = -h; i < w; i += 24) {
x.beginPath();
x.moveTo(i, h);
x.lineTo(i + 12, h);
x.lineTo(i + 12 + h, 0);
x.lineTo(i + h, 0);
x.fill();
} });
var R = K.S.wheels[0][1], tw = K.S.wheels[0][2] * K.S.wide, tx = W * K.S.wide - tw * 0.3, bw = tw + 0.14, u0 = K.S.wheels[0][0], u1 = K.S.wheels[K.S.wheels.length - 1][0], tl = (u1 - u0) * L;
[-1, 1].forEach(function (s) {
var tm = new THREE.MeshLambertMaterial({ map: tread });
tm.map.wrapS = tm.map.wrapT = THREE.RepeatWrapping;
var belt = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.06, R + 0.06, bw, lite ? 10 : 18, 1, true), tm);
belt.rotation.z = Math.PI / 2;
belt.position.set(s * tx, R, -L / 2 + u0 * L);
add(belt);
var belt2 = belt.clone();
belt2.position.z = -L / 2 + u1 * L;
add(belt2);
box(bw, 0.14, tl, s * tx, 0.07, -L / 2 + (u0 + u1) / 2 * L, new THREE.MeshLambertMaterial({ map: tread }));
box(bw, 0.14, tl, s * tx, 2 * R - 0.01, -L / 2 + (u0 + u1) / 2 * L, new THREE.MeshLambertMaterial({ map: tread }));
box(0.14, R * 1.05, L * 0.98, s * (tx + bw / 2 + 0.07), R * 1.45, 0, paint);
box(bw + 0.4, 0.18, L * 1.02, s * tx, 2 * R + 0.12, 0, paint);
var hz = new THREE.Mesh(new THREE.PlaneGeometry(L * 0.96, 0.26), new THREE.MeshLambertMaterial({ map: hazard }));
hz.position.set(s * (tx + bw / 2 + 0.15), R * 0.98, 0);
hz.rotation.y = s * Math.PI / 2;
add(hz);
for (var b = 0; b < (lite ? 4 : 8); b++) {
var bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.06, 8), steel);
bolt.rotation.z = Math.PI / 2;
bolt.position.set(s * (tx + bw / 2 + 0.15), R * 1.6, -L / 2 + 0.6 + b * (L - 1.2) / ((lite ? 4 : 8) - 1));
add(bolt);
}
});
var head = new THREE.Group();
head.position.set(0, pyLerpProf(K.S.top, 0.85) - 0.1, L * 0.3);
head.scale.setScalar(1.45);
add(head);
var hb = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.8, 1.1), paint);
hb.position.y = 0.4;
head.add(hb);
var vis = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.16, 0.05), eye);
vis.position.set(0, 0.48, 0.56);
head.add(vis);
var brow = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.12, 0.4), dark);
brow.position.set(0, 0.66, 0.45);
brow.rotation.x = 0.25;
head.add(brow);
var jaw = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.22, 0.3), steel);
jaw.position.set(0, 0.12, 0.5);
head.add(jaw);
[-1, 1].forEach(function (s) {
var an = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 1.0, 5), steel);
an.position.set(s * 0.55, 1.25, -0.3);
an.rotation.z = -s * 0.2;
head.add(an);
var tip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), eye);
tip.position.set(s * 0.65, 1.75, -0.3);
head.add(tip);
});
[-1, 1].forEach(function (s) {
var sh = new THREE.Group();
sh.position.set(s * (W * 0.98), pyLerpProf(K.S.top, 0.6) - 0.3, L * 0.08);
sh.scale.setScalar(1.5);
add(sh);
var ball = new THREE.Mesh(new THREE.SphereGeometry(0.62, lite ? 10 : 16, lite ? 8 : 12), steel);
sh.add(ball);
var pad = new THREE.Mesh(new THREE.SphereGeometry(0.85, lite ? 10 : 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.45), paint);
pad.position.y = 0.05;
pad.scale.set(1, 0.8, 1.1);
sh.add(pad);
var up = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 2.0, lite ? 8 : 12), dark);
up.position.set(s * 0.35, -0.5, 0.8);
up.rotation.x = 1.1;
up.rotation.z = -s * 0.2;
sh.add(up);
var el = new THREE.Mesh(new THREE.SphereGeometry(0.42, lite ? 8 : 12, 8), steel);
el.position.set(s * 0.55, -0.95, 1.65);
sh.add(el);
var fa = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.34, 1.9, lite ? 8 : 12), paint);
fa.position.set(s * 0.55, -0.85, 2.5);
fa.rotation.x = Math.PI / 2 - 0.1;
sh.add(fa);
var hz2 = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.25, lite ? 8 : 12, 1, true), new THREE.MeshLambertMaterial({ map: hazard, side: THREE.DoubleSide }));
hz2.position.set(s * 0.55, -0.8, 2.0);
hz2.rotation.x = Math.PI / 2 - 0.1;
sh.add(hz2);
var wrist = new THREE.Group();
wrist.position.set(s * 0.55, -0.75, 3.45);
sh.add(wrist);
if (s < 0) {
for (var f = 0; f < 3; f++) {
var a = f * 2.094;
var fin = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.9, 6), steel);
fin.position.set(Math.cos(a) * 0.28, Math.sin(a) * 0.28, 0.35);
fin.rotation.x = Math.PI / 2;
fin.rotation.z = a;
fin.rotation.y = 0;
wrist.add(fin);
fin.lookAt(new THREE.Vector3(Math.cos(a) * 0.05, Math.sin(a) * 0.05, 1.2));
fin.rotateX(Math.PI / 2);
}
}
else {
var drum = new THREE.Group();
wrist.add(drum);
g.userData.mechGun = drum;
for (var bI = 0; bI < 6; bI++) {
var a2 = bI * 1.047, br = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.3, 8), steel);
br.rotation.x = Math.PI / 2;
br.position.set(Math.cos(a2) * 0.2, Math.sin(a2) * 0.2, 0.55);
drum.add(br);
}
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 6, lite ? 10 : 16), dark);
ring.position.z = 1.1;
drum.add(ring);
}
});
for (var p = 0; p < (lite ? 3 : 5); p++) {
var fin2 = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.9, 4), trimP);
fin2.scale.z = 0.25;
fin2.position.set(0, pyLerpProf(K.S.top, 0.2 + p * 0.1) + 0.35, -L / 2 + L * (0.2 + p * 0.1));
add(fin2);
}
[-1, 1].forEach(function (s) { for (var e = 0; e < 2; e++) {
cyl(0.15, 1.8, s * (0.45 + e * 0.35), pyLerpProf(K.S.top, 0.06) + 0.7, -L / 2 + 0.55, steel);
var cp = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 0.18, 10), dark);
cp.position.set(s * (0.45 + e * 0.35), pyLerpProf(K.S.top, 0.06) + 1.65, -L / 2 + 0.55);
add(cp);
} });
var topY = pyLerpProf(K.S.top, 0.45);
if (car.k === "titanravager") {
[-1, 1].forEach(function (s) {
var rk = new THREE.Group();
rk.position.set(s * W * 0.55, topY + 0.7, -L * 0.12);
add(rk);
var bx = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 1.6), dark);
rk.add(bx);
for (var r = 0; r < 2; r++)
for (var c = 0; c < 3; c++) {
var tb = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.2, 8), eye);
tb.rotation.x = Math.PI / 2;
tb.position.set((c - 1) * 0.34, (r - 0.5) * 0.36, 0.81);
rk.add(tb);
}
});
}
else if (car.k === "wrathgear") {
var ch = new THREE.Mesh(new THREE.CircleGeometry(0.8, lite ? 12 : 20), pyMat("glow", 0xFF7A2A, { op: 0.95 }));
ch.position.set(0, pyLerpProf(K.S.top, 0.95) - 1.0, L / 2 + 0.05);
add(ch);
for (var gI = 0; gI < 5; gI++)
box(1.7, 0.08, 0.06, 0, pyLerpProf(K.S.top, 0.95) - 1.6 + gI * 0.3, L / 2 + 0.1, dark);
}
else if (car.k === "scrapocalypse") {
for (var sp = 0; sp < (lite ? 5 : 10); sp++) {
var pl = new THREE.Mesh(new THREE.BoxGeometry(0.8 + Math.random() * 0.8, 0.08, 0.6 + Math.random() * 0.8), pyMat("lambert", [0x7A4A2A, 0x5A5E66, 0x8A6A3A][sp % 3]));
pl.position.set((Math.random() - 0.5) * W * 1.4, topY + 0.1 + Math.random() * 0.3, (Math.random() - 0.5) * L * 0.6);
pl.rotation.set((Math.random() - 0.5) * 0.5, Math.random() * 3, (Math.random() - 0.5) * 0.5);
add(pl);
}
}
else if (car.k === "ironcolossus") {
var bl = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, W * 2.3, lite ? 10 : 16, 1, true, -0.7, 1.4), pyMat("chrome", 0x8A8E96, { ds: 1 }));
bl.rotation.z = Math.PI / 2;
bl.position.set(0, 1.1, L / 2 + 0.2);
add(bl);
}
var front = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.7, 0.5), new THREE.MeshLambertMaterial({ map: hazard }));
front.position.set(0, clr + 0.2, L / 2 + 0.02);
add(front);
box(W * 2.1, 0.5, 0.4, 0, clr - 0.1, L / 2 - 0.1, steel);
},
function () {
var pads = [], cells = PYT.cells || [];
function clear(s) { for (var c = 0; c < cells.length; c++) {
if (Math.abs(cells[c].x - s.x) < 40 && Math.abs(cells[c].z - s.z) < 40)
return false;
} return true; }
function bad(t) { return !t || /[gcr]/.test(t.fl || "") || t.slab || t.patch || t.w <= 0; }
var S = PYT.S, last = -1e9;
S.forEach(function (s, i) {
if (s.d < 160 || s.d > PYT.L - 160 || s.d - last < PY_PAD.every)
return;
for (var q = -4; q <= 6; q++) {
if (bad(S[(i + q + S.length) % S.length]))
return;
}
var a = S[(i + 6) % S.length];
if (s.tx * a.tx + s.tz * a.tz < 0.985)
return;
if (!clear(s))
return;
last = s.d;
pads.push({ x: s.x, y: s.y, z: s.z, tx: s.tx, tz: s.tz, w: s.w });
});
if (typeof pyTgRoutes === "function")
pyTgRoutes().forEach(function (R) {
var L = R.list, lastR = -1e9, gap = R.C.street ? 180 : PY_PAD.every;
L.forEach(function (s, i) {
if (s.ld < 50 || s.ld > R.len - 50 || s.ld - lastR < gap)
return;
for (var q = -4; q <= 6; q++) {
if (bad(L[Math.max(0, Math.min(L.length - 1, i + q))]))
return;
}
var a = L[Math.min(L.length - 1, i + 6)];
if (s.tx * a.tx + s.tz * a.tz < 0.985)
return;
if (!clear(s))
return;
lastR = s.ld;
pads.push({ x: s.x, y: s.y, z: s.z, tx: s.tx, tz: s.tz, w: s.w });
});
});
return pads;
},
function () {
if (PY.padTex)
return PY.padTex;
var cv = document.createElement("canvas");
cv.width = 64;
cv.height = 128;
var x = cv.getContext("2d");
var gr = x.createLinearGradient(0, 0, 64, 0);
gr.addColorStop(0, "rgba(10,40,60,.85)");
gr.addColorStop(0.5, "rgba(20,70,90,.9)");
gr.addColorStop(1, "rgba(10,40,60,.85)");
x.fillStyle = gr;
x.fillRect(0, 0, 64, 128);
x.strokeStyle = "rgba(140,250,255,1)";
x.lineWidth = 11;
x.lineJoin = "miter";
[18, 82].forEach(function (y) { x.beginPath(); x.moveTo(8, y + 30); x.lineTo(32, y); x.lineTo(56, y + 30); x.stroke(); });
x.fillStyle = "rgba(255,255,255,.9)";
x.fillRect(0, 0, 3, 128);
x.fillRect(61, 0, 3, 128);
var T = new THREE.CanvasTexture(cv);
T.wrapS = THREE.ClampToEdgeWrapping;
T.wrapT = THREE.RepeatWrapping;
PY.padTex = T;
return T;
},
function (G) {
PYT.pads = pyPadSpots();
PY.padTex = null;
var tex = pyPadTex(), mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -24, fog: true });
PY.padMat = mat;
PYT.pads.forEach(function (p) {
var w = Math.min(7, p.w * 0.55), geo = new THREE.PlaneGeometry(w, PY_PAD.len);
var uv = geo.attributes.uv;
for (var k = 0; k < uv.count; k++)
uv.setY(k, uv.getY(k) * PY_PAD.len / 4.5);
var m = new THREE.Mesh(geo, mat);
m.rotation.order = "YXZ";
m.rotation.y = Math.atan2(-p.tx, -p.tz);
m.rotation.x = -Math.PI / 2;
m.position.set(p.x, p.y + 0.07, p.z);
m.raycast = function () { };
m.renderOrder = 2;
G.add(m);
p.m = m;
p.w2 = w / 2 + 0.6;
});
},
function (dt) {
var P = PYT.pads;
if (!P || !P.length)
return;
if (PY.padTex)
PY.padTex.offset.y -= dt * 1.4;
var drv = pyDriving(), M = PY.me, C = camera.position, me = drv && M.wreckT <= 0 && !M.air ? { x: C.x - PY.base, z: C.z, y: M.y } : null;
for (var i = 0; i < P.length; i++) {
var p = P[i];
if (me) {
var dx = me.x - p.x, dz = me.z - p.z;
if (Math.abs(dx) < 10 && Math.abs(dz) < 10 && Math.abs(me.y - p.y) < 2.2) {
var al = dx * p.tx + dz * p.tz, ac = dx * p.tz - dz * p.tx;
if (Math.abs(al) < PY_PAD.len / 2 && Math.abs(ac) < p.w2 && (PY.padAt || 0) < PY.t - 0.6) {
var fx = -Math.sin(DRIVE.h), fz = -Math.cos(DRIVE.h), with_ = fx * p.tx + fz * p.tz;
if (with_ > 0.3) {
PY.padAt = PY.t;
M.boost = Math.max(M.boost, PY_PAD.dur);
M.push = { x: fx * PY_PAD.kick * with_, z: fz * PY_PAD.kick * with_ };
pyFeed("⚡ <b>Boost!</b>", "#8AF8FF");
if (typeof playTone === "function")
try {
playTone(520, 0.06);
playTone(880, 0.09);
}
catch (e) { }
}
}
}
}
for (var k = 0; k < PY.riv.length; k++) {
var R = PY.riv[k];
if (R.dead || R.st.air)
continue;
var rx = R.x - p.x, rz = R.z - p.z;
if (Math.abs(rx) > 6 || Math.abs(rz) > 6 || Math.abs(R.y - p.y) > 2.2)
continue;
if ((R.padAt || 0) < PY.t - 0.6) {
R.padAt = PY.t;
R.st.boost = Math.max(R.st.boost || 0, PY_PAD.dur);
R.v += PY_PAD.kick * 0.7;
}
}
}
},
function () {
var el = document.getElementById("ri-box");
if (!RI.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "ri-box";
el.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Enter" && e.target && e.target.id === "ri-code")
riRedeem(); });
el.addEventListener("keyup", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-ri]") : null;
if (!t)
return;
var w = t.getAttribute("data-ri");
if (w === "close")
return riClose();
if (w === "signin") {
riClose();
if (typeof openAccountForm === "function")
openAccountForm();
return;
}
if (w === "open")
return riRedeem();
if (w === "cars") {
riClose();
if (typeof pyGarageOpen === "function")
pyGarageOpen("buy");
return;
}
if (w === "way") {
riClose();
riWay();
return;
}
});
document.body.appendChild(el);
}
el.style.display = "block";
var h = '<div class="ri-in"><div class="ri-sub">Pyreline · the race planet</div><h3>The Death Races</h3>', R = RI.res;
if (R && R.ok) {
h += '<p style="text-align:center">' + (R.already ? 'You have already opened this code.' : '<b>Welcome to the Death Races.</b>') + '</p>' +
'<div class="ri-got">🏁 <b>The Warrens Street Racing Club\'s recommendation</b>: ' + (R.pass ? 'you may race on Pyreline.' : 'signed, but racing waits until the lock on this account is lifted.') + '</div>' +
(R.coupons > 0 ? '<div class="ri-got">🎟️ <b>A coupon for a free starter car</b>: the Slickjaw, the Pinwheel, the Ember Wasp or the Rust Wraith. Take it at Pyreline Motorworks, straight ahead when you land at the Redline Paddock.</div>' : '') +
'<p style="font-size:13px;color:#E8C8A8">To get there: fly from the Space Corp Spaceport to Pyreline (the orange planet) and press E to land. A wrecked car is out, and every race but the Time Trial takes a gold stake from grown-ups who pay their dues.</p>' +
'<div class="ri-row">' + (PY && PY.on ? '<button class="btn ri-go" data-ri="cars">Choose my free car</button>' : '<button class="btn ri-go" data-ri="way">Show me the way</button>') + '<button class="btn" data-ri="close">Close</button></div>';
}
else if (!riSigned()) {
h += '<p style="text-align:center">' + (RI.code ? 'Your code <b style="letter-spacing:.08em">' + esc(riShow(RI.code)) + '</b> is waiting. ' : '') + 'Sign in first, so the race pass and your free starter car are kept on your account. ' + (RI.code ? 'It opens the moment you are signed in.' : '') + '</p>' +
'<div class="ri-row"><button class="btn ri-go" data-ri="signin">Sign in</button><button class="btn" data-ri="close">Later</button></div>';
}
else {
h += '<p style="text-align:center">Type the code from the poster. It gives you the Warrens Street Racing Club\'s pass to race on Pyreline and a coupon for a free starter car.</p>' +
'<input id="ri-code" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="24" placeholder="SNARL-DEATH-RACE" value="' + esc(RI.code ? riShow(RI.code) : "") + '">' +
'<div class="ri-say">' + (RI.busy ? '<span style="color:#FFB45A">Opening…</span>' : esc(RI.say || "")) + '</div>' +
'<div class="ri-row"><button class="btn ri-go" data-ri="open">Open my code</button><button class="btn" data-ri="close">Close</button></div>';
}
el.innerHTML = h + '</div>';
},
function () {
if (typeof setStatus === "function")
setStatus("<b>🏁 Pyreline, the race planet</b>: fly from the Space Corp Spaceport to the orange planet and press E to land at the Redline Paddock. Pyreline Motorworks is straight ahead.");
if (typeof showTheWay === "function" && typeof store !== "undefined" && store.workplaceAt && store.workplaceAt["The Space Corp Spaceport"])
try {
showTheWay("The Space Corp Spaceport");
}
catch (e) { }
},
function (code, fallback) {
if (RI.busy)
return;
var f = document.getElementById("ri-code");
if (code)
RI.code = riNorm(code);
else if (f)
RI.code = riNorm(f.value);
if (!riSigned()) {
RI.open = true;
return riPaint();
}
if (RI.code.length < 6) {
RI.say = "Type the whole code.";
return riPaint();
}
RI.busy = true;
RI.say = "";
if (RI.open)
riPaint();
cityRpc("race_code_redeem", { p_code: RI.code }).then(function (o) {
RI.busy = false;
if (o && o.ok) {
RI.res = o;
RI.coupons = o.coupons || 0;
RI.couponsAt = Date.now();
RI.code = "";
if (typeof giKeep === "function")
giKeep("");
if (typeof GI !== "undefined")
GI.code = "";
if (typeof PY !== "undefined") {
PY.pass = null;
if (typeof pyPassCheck === "function")
pyPassCheck(true);
if (o.pass && typeof pyLocal === "function")
try {
pyLocal().pass = 1;
}
catch (e) { }
}
if (typeof setStatus === "function")
setStatus("<b>🏁 " + esc(o.say || "Welcome to the Death Races.") + "</b>");
RI.open = true;
riPaint();
return;
}
if (o && o.why === "no_such" && fallback) {
RI.open = false;
riPaint();
return fallback();
}
if (typeof giKeep === "function")
giKeep("");
RI.say = (o && o.say) || "That did not go through. Try again in a moment.";
RI.open = true;
riPaint();
}).catch(function (e) {
RI.busy = false;
if (typeof rpcMissing === "function" && rpcMissing(e)) {
if (fallback) {
RI.open = false;
riPaint();
return fallback();
}
RI.say = "The Death Races' codes open soon.";
}
else
RI.say = "That did not go through. Try again in a moment.";
RI.open = true;
riPaint();
});
},
function (force) {
if (!riSigned()) {
RI.coupons = 0;
return Promise.resolve(0);
}
if (!force && RI.coupons !== null && Date.now() - RI.couponsAt < 60000)
return Promise.resolve(RI.coupons);
return cityRpc("race_coupon_state", {}).then(function (o) { RI.couponsAt = Date.now(); RI.coupons = o && o.ok ? (+o.coupons || 0) : 0; return RI.coupons; })
.catch(function () { RI.couponsAt = Date.now(); RI.coupons = 0; return 0; });
},
function () {
if (PYLU.cg)
return PYLU.cg;
var parts = [], L = typeof PY !== "undefined" && PY.lite, R = wRand(3301);
[[0, 0.1, 0, 1], [0.55, -0.05, 0.2, 0.72], [-0.5, 0, 0.25, 0.7], [0.1, 0.05, -0.55, 0.7], [-0.15, 0.35, -0.1, 0.62], [0.3, 0.3, 0.4, 0.55]].forEach(function (c, i) {
if (L && i > 3)
return;
var g = new THREE.IcosahedronGeometry(c[3], L ? 1 : 2), P = g.attributes.position, v = new THREE.Vector3(), col = [];
for (var k = 0; k < P.count; k++) {
v.fromBufferAttribute(P, k);
var n = Math.sin(v.x * 7.1 + i) * Math.cos(v.z * 6.3 - i) * 0.12 + Math.sin(v.y * 9.7 + v.x * 3.1) * 0.08;
v.multiplyScalar(1 + n);
v.y *= 0.75;
P.setXYZ(k, v.x + c[0], v.y + c[1], v.z + c[2]);
var sh = 0.55 + 0.45 * Math.max(0, Math.min(1, (v.y / c[3] + 0.8))), hue = 0.85 + R() * 0.3;
col.push(Math.min(1, 0.78 * sh * hue), Math.min(1, 1.0 * sh), Math.min(1, 0.55 * sh * (2 - hue)));
}
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.computeVertexNormals();
parts.push(g);
});
var m = gwMerge(parts.map(function (g) { return g.index ? g.toNonIndexed() : g; }));
m.computeVertexNormals();
return (PYLU.cg = m);
},
function () {
if (PYLU.cm)
return PYLU.cm;
var c = document.createElement("canvas");
c.width = c.height = 128;
var x = c.getContext("2d");
x.fillStyle = "#7A9A58";
x.fillRect(0, 0, 128, 128);
for (var i = 0; i < 900; i++) {
var a = Math.random() * 6.28, r = 2 + Math.random() * 4;
x.fillStyle = "hsl(" + (85 + Math.random() * 30) + "," + (35 + Math.random() * 25) + "%," + (22 + Math.random() * 30) + "%)";
x.beginPath();
x.ellipse(Math.random() * 128, Math.random() * 128, r, r * 0.5, a, 0, 6.28);
x.fill();
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(3, 3);
return (PYLU.cm = new THREE.MeshLambertMaterial({ color: 0x8AB060, map: t }));
},
function () {
var sets = pyluSets();
if (!sets.length)
return null;
if (PYLU.proxies && PYLU.src === sets[0].trunk)
return PYLU.proxies;
PYLU.src = sets[0].trunk;
PYLU.seen = new Set();
var out = [], M = new THREE.Matrix4(), M2 = new THREE.Matrix4(), v = new THREE.Vector3(), v2 = new THREE.Vector3(), q = new THREE.Quaternion(), s = new THREE.Vector3(), s2 = new THREE.Vector3();
sets.forEach(function (J, si) {
J.trunk.updateWorldMatrix(true, false);
J.crown.updateWorldMatrix(true, false);
J.all = [J.trunk, J.crown].concat(J.more || []);
J.keep = J.all.map(function (m) { return m.instanceMatrix.array.slice(); });
for (var i = 0; i < J.trunk.count; i++) {
J.trunk.getMatrixAt(i, M);
M.premultiply(J.trunk.matrixWorld);
M.decompose(v, q, s);
J.crown.getMatrixAt(i, M2);
M2.premultiply(J.crown.matrixWorld);
M2.decompose(v2, q, s2);
var h = J.pine ? 12 * s.y : Math.max(8, v2.y - v.y + s2.y * 0.6), k = h / (J.pine ? 17 : 13), pos = v.clone(), kind = J.pine ? "pine" : ["ash", "oak", "ash", "aspen"][(i + si) % 4];
(function (pos, k, i, kind, J) {
out.push({ i: i, J: J, position: pos, userData: { rtArch: "tree", rtKind: kind, rtCol: new THREE.Color(0x4A7A30) }, matrixWorld: new THREE.Matrix4().compose(pos, new THREE.Quaternion(), new THREE.Vector3(k, k, k)),
updateWorldMatrix: function () { }, traverse: function () { }, getWorldPosition: function (t) { return t.copy(pos); } });
})(pos, k, i, kind, J);
}
});
return (PYLU.proxies = out);
},
function () {
if (PYLU.hooked || typeof rtChunks !== "function")
return;
PYLU.hooked = true;
var c0 = rtChunks;
rtChunks = function (on, cam, pick) {
var r = c0.apply(this, arguments);
try {
var here = on && typeof WLD !== "undefined" && WLD.on === "race" && typeof PY !== "undefined" && !PY.lite, L = here ? pyluProxies() : null, now = new Set();
if (L)
L.forEach(function (o) { var d = o.position.distanceTo(cam); if (d >= RT.near)
return; var k = rtPick(o); (pick[k] = pick[k] || []).push({ o: o, d: d }); now.add(o); });
PYLU.seen.forEach(function (o) { if (!now.has(o))
pyluShow(o, true); });
now.forEach(function (o) { if (!PYLU.seen.has(o))
pyluShow(o, false); });
PYLU.seen = now;
}
catch (e) {
if (!PYLU.warned && window.console) {
PYLU.warned = true;
console.warn("[pyreline land]", e);
}
}
return r;
};
},
function (snow) {
var parts = [], tiers = PY.lite ? 4 : 6;
for (var t = 0; t < tiers; t++) {
var f = t / (tiers - 1), r = 2.9 * (1 - f * 0.82) + 0.25, y = 2.2 + f * 8.2, g = new THREE.ConeGeometry(r * (snow ? 0.86 : 1), snow ? 0.7 : 2.6, PY.lite ? 8 : 12, 1, true), P = g.attributes.position;
for (var k = 0; k < P.count; k++) {
var x = P.getX(k), z = P.getZ(k), d = Math.hypot(x, z);
if (d > 0.01) {
var a = Math.atan2(z, x), jag = 1 + 0.12 * Math.sin(a * 9 + t * 1.7);
P.setXYZ(k, x * jag, P.getY(k) - (d / r) * 0.5, z * jag);
}
}
g.translate(0, y + (snow ? 0.95 : 0), 0);
parts.push(g.toNonIndexed());
}
var m = gwMerge(parts);
m.computeVertexNormals();
return m;
},
function () {
var parts = [], R = wRand(808);
for (var i = 0; i < 7; i++) {
var h = i ? 0.45 + R() * 0.45 : 1, r = (i ? 0.22 : 0.3) * (0.8 + R() * 0.4), col = new THREE.CylinderGeometry(r, r * 1.1, h * 0.82, 6);
col.translate(0, h * 0.41, 0);
var tip = new THREE.ConeGeometry(r, h * 0.18, 6);
tip.translate(0, h * 0.82 + h * 0.09, 0);
var g = gwMerge([col.toNonIndexed(), tip.toNonIndexed()]);
g.rotateZ(i ? (R() - 0.5) * 0.9 : 0);
g.rotateX(i ? (R() - 0.5) * 0.9 : 0);
g.translate(i ? (R() - 0.5) * 0.6 : 0, 0, i ? (R() - 0.5) * 0.6 : 0);
parts.push(g);
}
var m = gwMerge(parts);
m.computeVertexNormals();
return m;
},
function () {
if (PYLU.ft)
return PYLU.ft;
var c = document.createElement("canvas");
c.width = 128;
c.height = 256;
var x = c.getContext("2d");
x.strokeStyle = "#3A5A22";
x.lineWidth = 3;
x.beginPath();
x.moveTo(64, 256);
x.quadraticCurveTo(72, 120, 58, 6);
x.stroke();
for (var i = 0; i < 28; i++) {
var t = i / 28, y = 250 - t * 240, w = (1 - t) * 54 + 5, cx = 64 + Math.sin(t * 2.4) * 6;
[-1, 1].forEach(function (sd) { x.fillStyle = i % 2 ? "#3E7A28" : "#4C8A30"; x.beginPath(); x.moveTo(cx, y); x.quadraticCurveTo(cx + sd * w * 0.6, y - 14, cx + sd * w, y - 5 - t * 6); x.quadraticCurveTo(cx + sd * w * 0.5, y - 2, cx, y); x.fill(); });
}
var t = new THREE.CanvasTexture(c);
if (THREE.sRGBEncoding && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (PYLU.ft = t);
},
function (G) {
var L = PY.lite;
pyluHook();
G.children.slice().forEach(function (m) { if (m.isInstancedMesh && m.geometry && m.geometry.type === "ConeGeometry" && m.geometry.parameters && (Math.abs(m.geometry.parameters.radius - 1.2) < 0.001 || Math.abs(m.geometry.parameters.radius - 1.4) < 0.001)) {
G.remove(m);
} });
var fm = new THREE.MeshLambertMaterial({ map: pyluFernTex(), alphaTest: 0.45, side: THREE.DoubleSide });
pyInstances(G, pyluFernGeo(), fm, L ? 160 : 520, function () { var p = pyNearRoad("jungle", 3, 45) || pySpotIn("jungle", 4); if (!p)
return null; var s = 1.2 + Math.random() * 1.6; return [p[0], pyTerrain(p[0], p[1]), p[1], Math.random() * 6, 0, 0, s, s, s]; });
var col = new THREE.CylinderGeometry(1, 1, 1, 6);
col.translate(0, 0.5, 0);
var bm = new THREE.MeshLambertMaterial({ color: 0x34302E, map: pyTex("stone", 1, 3) }), spots = [];
for (var c = 0; c < (L ? 14 : 40); c++) {
var p = pyNearRoad("lava", 8, 90);
if (!p)
continue;
var base = Math.max(PY_LAVA, pyTerrain(p[0], p[1])), h0 = 3 + Math.random() * 9;
for (var k = 0; k < (L ? 5 : 9); k++) {
var a = k / 9 * 6.283 + Math.random() * 0.4, d = k ? 1.7 + Math.random() * 1.2 : 0;
spots.push([p[0] + Math.cos(a) * d, base - 1, p[1] + Math.sin(a) * d, Math.random() * 0.5, (Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.12, 0.95, h0 * (0.5 + Math.random() * 0.7) + 1, 0.95]);
}
}
var sk = 0;
pyInstances(G, col, bm, spots.length, function () { return spots[sk++]; });
},
function (G, x, z, r, h, seed) {
var L = PY.lite, NA = L ? 56 : 120, NR = L ? 14 : 30, NI = L ? 5 : 10, R = wRand(seed), rim = r * 0.2, pos = [], col = [], idx = [], C = new THREE.Color();
var ash = new THREE.Color(0x6A625A), rock = new THREE.Color(0x2C2522), rust = new THREE.Color(0x5A3424);
var gul = [];
for (var k = 0; k < 7; k++)
gul.push(R() * Math.PI * 2);
function rad(a, t) {
var g = 0;
for (var k = 0; k < gul.length; k++) {
var d = Math.atan2(Math.sin(a - gul[k]), Math.cos(a - gul[k]));
g += Math.exp(-d * d * 120) * 0.05;
}
return 1 + 0.05 * Math.sin(a * 11 + seed) + 0.035 * Math.sin(a * 23 + seed * 2) * t - g * t;
}
for (var i = 0; i < NA; i++) {
var a = i / NA * Math.PI * 2;
for (var j = 0; j <= NR; j++) {
var t = j / NR, rr = (rim + (r - rim) * Math.pow(t, 1.35)) * rad(a, t), y = h * Math.pow(1 - t, 1.7) + h * 0.025 * Math.sin(a * 7 + seed) * (1 - t);
y += (wFbm(Math.cos(a) * rr * 0.05, Math.sin(a) * rr * 0.05, seed, 3) - 0.5) * h * 0.06 * (0.3 + t);
pos.push(Math.cos(a) * rr, y, Math.sin(a) * rr);
var ridge = (rad(a, 1) - 1) * 12, n = wFbm(a * 4, t * 6, seed + 1, 2);
C.copy(rock).lerp(ash, Math.max(0, Math.min(1, 0.25 + ridge * 1.2 + n * 0.4 - t * 0.15))).lerp(rust, Math.max(0, 0.35 - t) * 0.6 * n);
col.push(C.r, C.g, C.b);
}
}
for (var i2 = 0; i2 < NA; i2++) {
var i3 = (i2 + 1) % NA;
for (var j2 = 0; j2 < NR; j2++) {
var A = i2 * (NR + 1) + j2, B = i3 * (NR + 1) + j2;
idx.push(A, B, A + 1, B, B + 1, A + 1);
}
}
var o = pos.length / 3;
for (var i4 = 0; i4 < NA; i4++) {
var a4 = i4 / NA * Math.PI * 2;
for (var j4 = 0; j4 <= NI; j4++) {
var u = j4 / NI, rr4 = rim * rad(a4, 0) * (1 - u * 0.55), y4 = h - h * 0.16 * Math.sin(u * Math.PI / 2);
pos.push(Math.cos(a4) * rr4, y4, Math.sin(a4) * rr4);
C.copy(rock).lerp(rust, u * 0.7).multiplyScalar(1 - u * 0.5);
col.push(C.r, C.g, C.b);
}
}
for (var i5 = 0; i5 < NA; i5++) {
var i6 = (i5 + 1) % NA;
for (var j5 = 0; j5 < NI; j5++) {
var A2 = o + i5 * (NI + 1) + j5, B2 = o + i6 * (NI + 1) + j5;
idx.push(A2, A2 + 1, B2, B2, A2 + 1, B2 + 1);
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
g.setIndex(idx);
var uv = [];
for (var q = 0; q < pos.length; q += 3)
uv.push(Math.atan2(pos[q + 2], pos[q]) * r / 40, pos[q + 1] / 12);
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.computeVertexNormals();
g.computeBoundingSphere();
var m = new THREE.MeshLambertMaterial({ vertexColors: true, map: pyTex("stone", 1, 1) });
var vc = new THREE.Mesh(g, m);
vc.position.set(x, -4, z);
vc.raycast = function () { };
G.add(vc);
var lp = [], lc = [], li = [], nf = L ? 2 : 3;
for (var f = 0; f < nf; f++) {
var a5 = gul[f], n5 = L ? 10 : 22, base = lp.length / 3;
for (var s = 0; s <= n5; s++) {
var t5 = 0.02 + s / n5 * (0.45 + 0.15 * f), rr5 = (rim + (r - rim) * Math.pow(t5, 1.35)) * rad(a5, t5) + 0.6, y5 = h * Math.pow(1 - t5, 1.7) + h * 0.025 * Math.sin(a5 * 7 + seed) * (1 - t5) + (wFbm(Math.cos(a5) * rr5 * 0.05, Math.sin(a5) * rr5 * 0.05, seed, 3) - 0.5) * h * 0.06 * (0.3 + t5) + 0.5;
var w5 = (1.2 + t5 * r * 0.05) / rr5, k5 = 1 - s / n5;
C.setRGB(1.0 * k5 + 0.25, 0.42 * k5 * k5 + 0.04, 0.08 * k5);
[-1, 1].forEach(function (sd) { var aa = a5 + sd * w5 + Math.sin(s * 0.9 + f) * 0.012; lp.push(Math.cos(aa) * rr5, y5, Math.sin(aa) * rr5); lc.push(C.r, C.g, C.b); });
if (s < n5) {
var b0 = base + s * 2;
li.push(b0, b0 + 2, b0 + 1, b0 + 1, b0 + 2, b0 + 3);
}
}
}
var lg = new THREE.BufferGeometry();
lg.setAttribute("position", new THREE.Float32BufferAttribute(lp, 3));
lg.setAttribute("color", new THREE.Float32BufferAttribute(lc, 3));
lg.setIndex(li);
var lava = new THREE.Mesh(lg, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 }));
lava.position.copy(vc.position);
lava.raycast = function () { };
G.add(lava);
return { mesh: vc, top: h - 4 - h * 0.16, rim: rim };
},
function () {
if (PYLU.gg)
return PYLU.gg;
var parts = [], R = wRand(919), L = PY.lite;
for (var i = 0; i < (L ? 3 : 5); i++) {
var h = i ? 0.35 + R() * 0.4 : 1, r = (i ? 0.16 : 0.26) * (0.8 + R() * 0.4), seg = L ? 5 : 7, hs = L ? 4 : 7, g = new THREE.CylinderGeometry(r * 0.25, r, h, seg, hs);
g.translate(0, h / 2, 0);
var p = g.attributes.position, bx = (R() - 0.5) * 0.5, bz = (R() - 0.5) * 0.5;
for (var k = 0; k < p.count; k++) {
var y = p.getY(k), t = y / h, a = Math.atan2(p.getZ(k), p.getX(k)), f = 1 + 0.28 * Math.sin(a * 3 + y * 17 + i) + 0.18 * Math.sin(y * 29 + i * 2);
p.setX(k, p.getX(k) * f + bx * t * t * h);
p.setZ(k, p.getZ(k) * f + bz * t * t * h);
}
g = g.toNonIndexed();
if (i) {
g.rotateZ((R() - 0.5) * 1.1);
g.rotateX((R() - 0.5) * 1.1);
g.translate((R() - 0.5) * 0.35, 0.15 + R() * 0.3, (R() - 0.5) * 0.35);
}
parts.push(g);
}
var m = gwMerge(parts);
m.computeVertexNormals();
PYLU.gg = m;
return m;
},
function (list) {
var n = 0;
list.forEach(function (g) { n += (g.index ? g.index.count : g.attributes.position.count); });
var P = new Float32Array(n * 3), N = new Float32Array(n * 3), o = 0;
list.forEach(function (g) { var q = g.index ? g.toNonIndexed() : g; if (!q.attributes.normal)
q.computeVertexNormals(); var c = q.attributes.position.count; P.set(q.attributes.position.array, o * 3); N.set(q.attributes.normal.array, o * 3); o += c; });
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(P, 3));
G.setAttribute("normal", new THREE.BufferAttribute(N, 3));
return G;
},
function () {
if (PYS.fig)
return PYS.fig;
var st = { shirt: pysMerge([pysTorso(0.9, 0.56), pysLimb(0.052, 0.045, 0.3, -0.235, 1.3, 0, 0, 0.12), pysLimb(0.052, 0.045, 0.3, 0.235, 1.3, 0, 0, -0.12), pysLimb(0.045, 0.038, 0.28, -0.265, 1.02, 0.01, 0, 0.06), pysLimb(0.045, 0.038, 0.28, 0.265, 1.02, 0.01, 0, -0.06)]),
legs: pysMerge([pysLimb(0.085, 0.065, 0.46, -0.095, 0.68, 0), pysLimb(0.085, 0.065, 0.46, 0.095, 0.68, 0), pysLimb(0.062, 0.05, 0.42, -0.1, 0.26, 0), pysLimb(0.062, 0.05, 0.42, 0.1, 0.26, 0), pysB(0.1, 0.07, 0.24, -0.1, 0.035, 0.04), pysB(0.1, 0.07, 0.24, 0.1, 0.035, 0.04), pysTorso(0.86, 0.1)]),
skin: pysMerge([pysHead(1.6), pysLimb(0.045, 0.05, 0.12, 0, 1.47, 0), pysS(0.042, -0.275, 0.85, 0.015, 1.3), pysS(0.042, 0.275, 0.85, 0.015, 1.3)]),
hair: pysHair(1.6) };
var se = { shirt: pysMerge([pysTorso(0.5, 0.56, -0.06), pysLimb(0.052, 0.045, 0.3, -0.235, 0.9, 0, 0, 0.12), pysLimb(0.052, 0.045, 0.3, 0.235, 0.9, 0, 0, -0.12), pysLimb(0.045, 0.038, 0.3, -0.24, 0.7, 0.14, Math.PI / 2.3), pysLimb(0.045, 0.038, 0.3, 0.24, 0.7, 0.14, Math.PI / 2.3)]),
legs: pysMerge([pysLimb(0.085, 0.07, 0.44, -0.1, 0.47, 0.2, Math.PI / 2), pysLimb(0.085, 0.07, 0.44, 0.1, 0.47, 0.2, Math.PI / 2), pysLimb(0.062, 0.05, 0.44, -0.1, 0.23, 0.42), pysLimb(0.062, 0.05, 0.44, 0.1, 0.23, 0.42), pysB(0.1, 0.07, 0.24, -0.1, 0.035, 0.48), pysB(0.1, 0.07, 0.24, 0.1, 0.035, 0.48), pysTorso(0.44, 0.12)]),
skin: pysMerge([pysHead(1.2, -0.03), pysLimb(0.045, 0.05, 0.12, 0, 1.07, -0.02), pysS(0.042, -0.24, 0.7, 0.3, 1.3), pysS(0.042, 0.24, 0.7, 0.3, 1.3)]),
hair: pysHair(1.2, -0.03) };
PYS.fig = { stand: st, sit: se };
return PYS.fig;
},
function (G, geo, mat, list, shadow) {
if (!list.length)
return null;
var im = new THREE.InstancedMesh(geo, mat, list.length), M = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), p = new THREE.Vector3(), s = new THREE.Vector3(), col = new THREE.Color(), hasC = false;
list.forEach(function (o, i) {
p.set(o.x, o.y, o.z);
e.set(o.rx || 0, o.ry || 0, o.rz || 0);
q.setFromEuler(e);
var k = o.s || 1;
s.set(k * (o.sx || 1), k * (o.sy || 1), k * (o.sz || 1));
M.compose(p, q, s);
im.setMatrixAt(i, M);
if (o.c !== undefined) {
col.setHex(o.c);
im.setColorAt(i, col);
hasC = true;
}
});
if (hasC && im.instanceColor)
im.instanceColor.needsUpdate = true;
im.raycast = function () { };
im.frustumCulled = false;
if (shadow && !PY.lite)
im.castShadow = true;
G.add(im);
return im;
},
function () {
if (PYS_KINDS)
return PYS_KINDS;
var L = PY.lite, w = pysWhite(), fig = pysFigGeo();
var tyre = new THREE.TorusGeometry(0.33, 0.14, L ? 5 : 8, L ? 10 : 16);
tyre.rotateX(Math.PI / 2);
tyre.translate(0, 0.14, 0);
var tyres = pysMerge([0, 1, 2, 3].map(function (i) { var g = tyre.clone(); g.translate(0, i * 0.28, 0); return g; }));
var drum = pysMerge([pysC(0.29, 0.29, 0.88, L ? 8 : 12, 0, 0.44, 0), pysC(0.3, 0.3, 0.04, L ? 8 : 12, 0, 0.3, 0), pysC(0.3, 0.3, 0.04, L ? 8 : 12, 0, 0.62, 0)]);
var gazeboLegs = pysMerge([pysB(0.06, 2.4, 0.06, -1.45, 1.2, -1.45), pysB(0.06, 2.4, 0.06, 1.45, 1.2, -1.45), pysB(0.06, 2.4, 0.06, -1.45, 1.2, 1.45), pysB(0.06, 2.4, 0.06, 1.45, 1.2, 1.45)]);
var roofG = new THREE.ConeGeometry(2.2, 0.7, 4, 1);
roofG.rotateY(Math.PI / 4);
roofG.translate(0, 2.75, 0);
var gazeboTop = pysMerge([roofG, pysB(3.0, 0.3, 0.02, 0, 2.25, 1.5), pysB(3.0, 0.3, 0.02, 0, 2.25, -1.5), pysB(0.02, 0.3, 3.0, 1.5, 2.25, 0), pysB(0.02, 0.3, 3.0, -1.5, 2.25, 0)]);
var pole = pysC(0.035, 0.045, 4.5, 6, 0, 2.25, 0), flag = pysB(0.02, 0.8, 1.2, 0, 3.9, 0.62);
var table = pysMerge([pysB(1.6, 0.05, 0.7, 0, 0.74, 0), pysB(0.05, 0.72, 0.05, -0.72, 0.36, -0.3), pysB(0.05, 0.72, 0.05, 0.72, 0.36, 0.3), pysB(0.05, 0.72, 0.05, -0.72, 0.36, 0.3), pysB(0.05, 0.72, 0.05, 0.72, 0.36, -0.3)]);
var chest = pysMerge([pysB(0.7, 0.9, 0.45, 0, 0.5, 0), pysC(0.04, 0.04, 0.1, 4, -0.3, 0.05, -0.18), pysC(0.04, 0.04, 0.1, 4, 0.3, 0.05, -0.18), pysC(0.04, 0.04, 0.1, 4, -0.3, 0.05, 0.18), pysC(0.04, 0.04, 0.1, 4, 0.3, 0.05, 0.18)]);
var chair = pysMerge([pysB(0.5, 0.04, 0.45, 0, 0.42, 0), pysB(0.5, 0.5, 0.04, 0, 0.66, -0.22, -0.2), pysB(0.03, 0.42, 0.03, -0.23, 0.21, -0.2, 0, 0, 0.3), pysB(0.03, 0.42, 0.03, 0.23, 0.21, -0.2, 0, 0, -0.3), pysB(0.03, 0.42, 0.03, -0.23, 0.21, 0.2, 0, 0, 0.3), pysB(0.03, 0.42, 0.03, 0.23, 0.21, 0.2, 0, 0, -0.3)]);
var sail = new THREE.BufferGeometry();
sail.setAttribute("position", new THREE.BufferAttribute(new Float32Array([-2.4, 2.9, -1.6, 2.6, 2.3, -1.2, 0.2, 2.6, 2.2, 0.2, 2.6, 2.2, 2.6, 2.3, -1.2, -2.4, 2.9, -1.6]), 3));
sail.computeVertexNormals();
var sailPoles = pysMerge([pysC(0.05, 0.05, 3.0, 6, -2.4, 1.5, -1.6), pysC(0.05, 0.05, 2.4, 6, 2.6, 1.2, -1.2), pysC(0.05, 0.05, 2.7, 6, 0.2, 1.35, 2.2)]);
var truck = pysMerge([pysB(2.0, 0.9, 4.6, 0, 0.85, 0), pysB(1.9, 0.8, 2.0, 0, 1.7, 0.5), pysB(1.95, 0.35, 1.6, 0, 1.45, -1.45), pysC(0.38, 0.38, 0.3, L ? 8 : 12, -0.95, 0.38, 1.5, 0, Math.PI / 2), pysC(0.38, 0.38, 0.3, L ? 8 : 12, 0.95, 0.38, 1.5, 0, Math.PI / 2), pysC(0.38, 0.38, 0.3, L ? 8 : 12, -0.95, 0.38, -1.5, 0, Math.PI / 2), pysC(0.38, 0.38, 0.3, L ? 8 : 12, 0.95, 0.38, -1.5, 0, Math.PI / 2)]);
var glass = pysMerge([pysB(1.75, 0.6, 0.04, 0, 1.75, 1.5, 0.35), pysB(0.04, 0.5, 1.7, -0.96, 1.75, 0.5), pysB(0.04, 0.5, 1.7, 0.96, 1.75, 0.5)]);
var fencePanel = pysMerge([pysB(0.05, 1.2, 0.05, -1.0, 0.6, 0), pysB(0.05, 1.2, 0.05, 1.0, 0.6, 0), pysB(2.0, 0.12, 0.02, 0, 0.25, 0), pysB(2.0, 0.12, 0.02, 0, 0.55, 0), pysB(2.0, 0.12, 0.02, 0, 0.85, 0), pysB(2.0, 0.12, 0.02, 0, 1.12, 0)]);
var brazier = pysMerge([pysC(0.3, 0.26, 0.85, L ? 8 : 12, 0, 0.43, 0), pysB(0.5, 0.04, 0.04, 0, 0.95, 0)]), flame = pysMerge([new THREE.ConeGeometry(0.24, 0.55, L ? 6 : 8).translate(0, 1.12, 0), new THREE.ConeGeometry(0.14, 0.4, 6).translate(0.08, 1.18, 0.05)]);
var lampPost = pysMerge([pysC(0.07, 0.1, 6, 8, 0, 3, 0), pysB(0.08, 0.08, 1.4, 0, 5.95, 0.65)]), lampBar = pysB(0.12, 0.08, 1.0, 0, 5.88, 0.95);
var kerb = pysB(0.25, 0.08, 1.6, 0, 0.04, 0);
var platform = pysMerge([pysB(4, 0.25, 2.6, 0, 1.1, 0), pysB(0.15, 1.1, 0.15, -1.9, 0.55, -1.2), pysB(0.15, 1.1, 0.15, 1.9, 0.55, -1.2), pysB(0.15, 1.1, 0.15, -1.9, 0.55, 1.2), pysB(0.15, 1.1, 0.15, 1.9, 0.55, 1.2), pysB(4, 0.06, 0.06, 0, 2.1, 1.25), pysB(0.06, 1.0, 0.06, -1.9, 1.7, 1.25), pysB(0.06, 1.0, 0.06, 1.9, 1.7, 1.25)]);
var platEdge = pysB(4.02, 0.08, 0.08, 0, 1.26, 1.3);
var bunker = pysMerge([pysB(3.2, 0.5, 2.4, 0, 0.25, 0), pysB(3.2, 1.2, 0.3, 0, 1.1, -1.05), pysB(0.3, 1.2, 2.4, -1.45, 1.1, 0), pysB(0.3, 1.2, 2.4, 1.45, 1.1, 0), pysB(3.2, 0.25, 0.3, 0, 1.85, 1.05), pysB(3.4, 0.35, 2.6, 0, 2.15, 0)]);
var stripe = pysB(3.42, 0.12, 2.62, 0, 2.0, 0);
var fireStand = pysMerge([pysB(0.08, 1.4, 0.08, 0, 0.7, 0), pysB(0.5, 0.05, 0.05, 0, 1.35, 0), pysC(0.09, 0.09, 0.55, 8, -0.15, 0.95, 0.06), pysC(0.09, 0.09, 0.55, 8, 0.15, 0.95, 0.06)]);
var crust = new THREE.DodecahedronGeometry(1, 0);
crust.scale(1.6, 0.35, 1.2);
crust.translate(0, 0.1, 0);
var crack = pysMerge([pysB(1.9, 0.05, 0.07, 0, 0.3, 0, 0, 0.5), pysB(1.2, 0.05, 0.06, 0.3, 0.31, 0.25, 0, -0.8)]);
var bale = pysC(0.65, 0.65, 1.2, L ? 10 : 14, 0, 0.65, 0, 0, Math.PI / 2);
var sock = pysMerge([pysC(0.04, 0.05, 4.2, 6, 0, 2.1, 0)]), sockBag = new THREE.CylinderGeometry(0.2, 0.08, 1.1, 8, 1, true);
sockBag.rotateZ(Math.PI / 2);
sockBag.translate(0.6, 4.0, 0);
var umb = new THREE.ConeGeometry(1.0, 0.35, L ? 8 : 10, 1, true);
umb.translate(0, 2.05, 0);
var umbStick = pysC(0.015, 0.015, 1.9, 4, 0, 1.0, 0);
var whip = pysC(0.015, 0.02, 3.6, 4, 0, 1.8, 0), whipFlag = pysB(0.01, 0.5, 0.75, 0, 3.3, 0.38);
var buggy = pysMerge([pysB(1.4, 0.35, 2.4, 0, 0.55, 0), pysB(0.05, 0.9, 0.05, -0.6, 1.1, -0.2), pysB(0.05, 0.9, 0.05, 0.6, 1.1, -0.2), pysB(1.25, 0.05, 0.05, 0, 1.55, -0.2), pysB(0.05, 0.05, 1.2, -0.6, 1.55, -0.8, 0.6), pysB(0.05, 0.05, 1.2, 0.6, 1.55, -0.8, 0.6),
pysC(0.4, 0.4, 0.3, L ? 8 : 12, -0.85, 0.4, 0.85, 0, Math.PI / 2), pysC(0.4, 0.4, 0.3, L ? 8 : 12, 0.85, 0.4, 0.85, 0, Math.PI / 2), pysC(0.45, 0.45, 0.35, L ? 8 : 12, -0.85, 0.45, -0.9, 0, Math.PI / 2), pysC(0.45, 0.45, 0.35, L ? 8 : 12, 0.85, 0.45, -0.9, 0, Math.PI / 2)]);
var crystal = pysMerge([new THREE.OctahedronGeometry(0.35, 0).scale(0.6, 2.6, 0.6).translate(0, 0.8, 0), new THREE.OctahedronGeometry(0.3, 0).scale(0.6, 2.0, 0.6).rotateZ(0.4).translate(0.35, 0.55, 0.1), new THREE.OctahedronGeometry(0.25, 0).scale(0.6, 1.8, 0.6).rotateZ(-0.5).rotateX(0.3).translate(-0.3, 0.45, -0.1)]);
var mushStem = pysMerge([pysC(0.06, 0.09, 0.5, 6, 0, 0.25, 0), pysC(0.04, 0.06, 0.32, 6, 0.25, 0.16, 0.12), pysC(0.05, 0.07, 0.4, 6, -0.2, 0.2, -0.15)]);
var mushCap = pysMerge([new THREE.SphereGeometry(0.24, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, 0.55, 1).translate(0, 0.48, 0), new THREE.SphereGeometry(0.15, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, 0.55, 1).translate(0.25, 0.31, 0.12), new THREE.SphereGeometry(0.19, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, 0.55, 1).translate(-0.2, 0.39, -0.15)]);
var lantPole = pysMerge([pysC(0.05, 0.06, 2.8, 6, 0, 1.4, 0), pysB(0.05, 0.05, 0.6, 0, 2.75, 0.28), pysB(0.22, 0.06, 0.22, 0, 2.6, 0.55), pysB(0.18, 0.04, 0.18, 0, 2.28, 0.55)]), lantGlow = pysB(0.15, 0.26, 0.15, 0, 2.44, 0.55);
var bollard = pysMerge([pysC(0.16, 0.2, 0.7, 8, 0, 0.35, 0), pysC(0.24, 0.18, 0.12, 8, 0, 0.74, 0)]), buoyPost = pysC(0.05, 0.05, 1.6, 6, 0, 0.8, 0), buoy = new THREE.TorusGeometry(0.3, 0.08, 6, 12).translate(0, 1.25, 0.08);
var cart = pysMerge([pysB(1.8, 1.0, 1.0, 0, 0.8, 0), pysC(0.3, 0.3, 0.1, 10, -0.6, 0.3, 0.5, Math.PI / 2, 0), pysC(0.3, 0.3, 0.1, 10, 0.6, 0.3, 0.5, Math.PI / 2, 0), pysB(0.05, 1.2, 0.05, -0.85, 1.9, -0.45), pysB(0.05, 1.2, 0.05, 0.85, 1.9, -0.45)]), cartTop = pysB(2.2, 0.08, 1.5, 0, 2.5, 0.2, 0.15);
var tarp = new THREE.BufferGeometry();
tarp.setAttribute("position", new THREE.BufferAttribute(new Float32Array([-2.5, 2.6, -1.8, 2.5, 2.6, -1.8, 2.5, 1.6, 2, -2.5, 2.6, -1.8, 2.5, 1.6, 2, -2.5, 1.6, 2]), 3));
tarp.computeVertexNormals();
var deadCar = pysMerge([pysB(1.8, 0.7, 4.2, 0, 0.55, 0, 0, 0, 0.06), pysB(1.6, 0.55, 2.0, 0, 1.15, -0.3, 0, 0, 0.06), pysB(0.5, 0.25, 0.5, 0.7, 0.12, 1.4), pysB(0.5, 0.25, 0.5, -0.7, 0.12, -1.4)]);
var catchPost = pysC(0.06, 0.07, 3.6, 6, 0, 1.8, 0);
PYS_KINDS = {
figShirt: { geo: fig.stand.shirt, mat: pysWhite(), sh: 1 }, figLegs: { geo: fig.stand.legs, mat: pysWhite() }, figSkin: { geo: fig.stand.skin, mat: pysWhite() }, figHair: { geo: fig.stand.hair, mat: pysWhite() },
sitShirt: { geo: fig.sit.shirt, mat: pysWhite(), sh: 1 }, sitLegs: { geo: fig.sit.legs, mat: pysWhite() }, sitSkin: { geo: fig.sit.skin, mat: pysWhite() }, sitHair: { geo: fig.sit.hair, mat: pysWhite() },
tyres: { geo: tyres, mat: pyMat("rubber", 0x1A1A1C), sh: 1 }, drum: { geo: drum, mat: pysWhite("paint"), sh: 1 },
gLegs: { geo: gazeboLegs, mat: pyMat("chrome", 0xB8BCC4) }, gTop: { geo: gazeboTop, mat: pyMat("matte", 0xFFFFFE, { ds: 1 }), sh: 1 },
pole: { geo: pole, mat: pyMat("chrome", 0xC8CCD4) }, flag: { geo: flag, mat: pyMat("matte", 0xFFFFFE, { ds: 1 }) },
table: { geo: table, mat: pyMat("matte", 0x8A8E96) }, chest: { geo: chest, mat: pysWhite("paint"), sh: 1 }, chair: { geo: chair, mat: pysWhite() },
sail: { geo: sail, mat: pyMat("matte", 0xFFFFFE, { ds: 1 }), sh: 1 }, sailPoles: { geo: sailPoles, mat: pyMat("matte", 0x6A6058) },
truck: { geo: truck, mat: pysWhite("paint"), sh: 1 }, glass: { geo: glass, mat: pyMat("matte", 0x1E2630) },
fence: { geo: fencePanel, mat: pysWhite() }, brazier: { geo: brazier, mat: pyMat("matte", 0x3A3634) }, flame: { geo: flame, mat: pyMat("glow", 0xFF9A3A, { op: 0.92 }) },
lamp: { geo: lampPost, mat: pyMat("chrome", 0x3A3A48) }, lampBar: { geo: lampBar, mat: pysWhite("glow") }, kerb: { geo: kerb, mat: pysWhite("glow") },
plat: { geo: platform, mat: pyMat("chrome", 0x2A2A38) }, platEdge: { geo: platEdge, mat: pysWhite("glow") },
bunker: { geo: bunker, mat: pyMat("matte", 0x6A6866), sh: 1 }, stripe: { geo: stripe, mat: pyMat("matte", 0xE86A1A) },
fireStand: { geo: fireStand, mat: pyMat("matte", 0xC8201A) }, crust: { geo: crust, mat: pyMat("matte", 0x1A1614) }, crack: { geo: crack, mat: pyMat("glow", 0xFF5A1A) },
bale: { geo: bale, mat: pyMat("matte", 0xC8A85A), sh: 1 }, sock: { geo: sock, mat: pyMat("chrome", 0x9A9EA6) }, sockBag: { geo: sockBag, mat: pyMat("matte", 0xF06A1A, { ds: 1 }) },
umb: { geo: umb, mat: pyMat("matte", 0xFFFFFE, { ds: 1 }) }, umbStick: { geo: umbStick, mat: pyMat("matte", 0x2A2A2A) },
whip: { geo: whip, mat: pyMat("matte", 0x2A2A2A) }, whipFlag: { geo: whipFlag, mat: pyMat("matte", 0xFFFFFE, { ds: 1 }) }, buggy: { geo: buggy, mat: pysWhite("paint"), sh: 1 },
crystal: { geo: crystal, mat: pyMat("glow", 0xFFFFFF, { op: 0.85 }) }, mushStem: { geo: mushStem, mat: pyMat("matte", 0xC8C0B0) }, mushCap: { geo: mushCap, mat: pysWhite("glow") },
lantPole: { geo: lantPole, mat: pyMat("matte", 0x3A2E24) }, lantGlow: { geo: lantGlow, mat: pyMat("glow", 0xFFC870) },
bollard: { geo: bollard, mat: pyMat("matte", 0x2A2C30) }, buoyPost: { geo: buoyPost, mat: pyMat("matte", 0x8A7A5A) }, buoy: { geo: buoy, mat: pyMat("matte", 0xE8541A) },
cart: { geo: cart, mat: pyMat("paint", 0x2A7A5A) }, cartTop: { geo: cartTop, mat: pyMat("matte", 0xE8C84A, { ds: 1 }) },
tarp: { geo: tarp, mat: pyMat("matte", 0x4A7AA8, { ds: 1 }) }, deadCar: { geo: deadCar, mat: pyMat("matte", 0x5A3A2A) },
catchPost: { geo: catchPost, mat: pyMat("chrome", 0x8A8E96) }
};
return PYS_KINDS;
},
function (B, R, x, y, z, ry, sit, shirts) {
var sh = shirts || PYS_SHIRT, k = 0.92 + R() * 0.16, o = function (c) { return { x: x, y: y, z: z, ry: ry, s: k, c: c }; }, p = sit ? "sit" : "fig";
B.put(p + "Shirt", o(sh[R() * sh.length | 0]));
B.put(p + "Legs", o(PYS_LEGS[R() * PYS_LEGS.length | 0]));
B.put(p + "Skin", o(PYS_SKIN[R() * PYS_SKIN.length | 0]));
if (R() < 0.9)
B.put(p + "Hair", o(PYS_HAIR[R() * PYS_HAIR.length | 0]));
},
function (B, R, s, sd, talk) {
var z = s.zone, L = PY.lite, a = s.w / 2 + (z === "cave" ? 3.2 : z === "sky" ? 4 : 7) + R() * 4, c = pysAt(s, sd, a, 0), y = pysOk(s, c.x, c.z, 3.2);
if (y === null)
return false;
var ry = pysFace(s, sd), n = (L ? 2 : 4) + (R() * (L ? 2 : 4) | 0), i, p;
function fan(off, fw, sit, sh) { var q = pysAt(s, sd, a + fw, off), yy = pyGround(q.x, q.z); if (Math.abs(yy - y) > 1.2 || !pyClear(q.x, q.z, 1.2))
return; pysPerson(B, R, q.x, yy, q.z, ry + (R() - 0.5) * 0.6, sit, sh); if (sit)
B.put("chair", { x: q.x, y: yy, z: q.z, ry: ry, c: sh ? sh[0] : 0x2A4A8A }); }
if (z === "paddock") {
var tc = PYS_TEAMS[R() * PYS_TEAMS.length | 0];
B.put("gLegs", { x: c.x, y: y, z: c.z, ry: ry });
B.put("gTop", { x: c.x, y: y, z: c.z, ry: ry, c: tc });
B.put("table", { x: c.x, y: y, z: c.z - 0.0, ry: ry });
B.put("chest", { x: c.x + 1.0 * s.tx, y: y, z: c.z + 1.0 * s.tz, ry: ry, c: tc });
B.put("tyres", { x: c.x - 2.0 * s.tx, y: y, z: c.z - 2.0 * s.tz });
B.put("tyres", { x: c.x - 2.0 * s.tx + 0.7 * sd * s.tz, y: y, z: c.z - 2.0 * s.tz - 0.7 * sd * s.tx });
B.put("drum", { x: c.x + 2.1 * s.tx, y: y, z: c.z + 2.1 * s.tz, c: 0xC8201A });
for (i = 0; i < n; i++)
fan((R() - 0.5) * 5, -1.6 + (R() - 0.5), false);
}
else if (z === "canyon" || z === "dunes") {
var sc = [0xE8E2D0, 0xC8541A, 0x2A7A8A, 0xE8C84A][R() * 4 | 0];
if (z === "canyon") {
B.put("sail", { x: c.x, y: y, z: c.z, ry: ry, c: sc });
B.put("sailPoles", { x: c.x, y: y, z: c.z, ry: ry });
var tq = pysAt(s, sd, a + 4, 2);
var ty = pyGround(tq.x, tq.z);
if (Math.abs(ty - y) < 1.5 && pyClear(tq.x, tq.z, 3)) {
B.put("truck", { x: tq.x, y: ty, z: tq.z, ry: ry + Math.PI / 2 + (R() - 0.5) * 0.4, c: [0x8A3A2A, 0x3A4A5A, 0xC8B89A, 0x2A4A3A][R() * 4 | 0] });
B.put("glass", { x: tq.x, y: ty, z: tq.z, ry: ry + Math.PI / 2 + (R() - 0.5) * 0.4 });
}
}
else {
var bq = pysAt(s, sd, a + 3, -2);
var by = pyGround(bq.x, bq.z);
if (Math.abs(by - y) < 1.5)
B.put("buggy", { x: bq.x, y: by, z: bq.z, ry: ry + 1.2, c: [0xE8541A, 0x1A8AA8, 0xE8C81A][R() * 3 | 0] });
}
B.put("drum", { x: c.x + 1.6 * s.tx, y: y, z: c.z + 1.6 * s.tz, c: 0x2A6AA8 });
for (i = 0; i < n; i++)
fan((R() - 0.5) * 4, (R() - 0.5) * 1.5, R() < 0.6);
if (z === "dunes")
for (i = 0; i < 2; i++) {
var wq = pysAt(s, sd, a - 2, (i ? 3 : -3));
B.put("whip", { x: wq.x, y: y, z: wq.z });
B.put("whipFlag", { x: wq.x, y: y, z: wq.z, ry: R() * 6, c: [0xE8541A, 0xE8E81A, 0x1AE8A8][R() * 3 | 0] });
}
}
else if (z === "tundra" || z === "ice") {
for (i = -1; i <= 1; i++) {
var fq = pysAt(s, sd, a - 2.2, i * 2.05);
B.put("fence", { x: fq.x, y: pyGround(fq.x, fq.z), z: fq.z, ry: ry + Math.PI / 2, c: 0xF06A1A });
}
B.put("brazier", { x: c.x, y: y, z: c.z });
B.put("flame", { x: c.x, y: y, z: c.z, ry: R() * 6 });
var parka = [0xC8201A, 0x1A3A6A, 0xE8C81A, 0x2A2A2E, 0x3A6A3A, 0xE86A1A];
for (i = 0; i < n; i++) {
var ang = i / n * 6.283 + R() * 0.4, px = c.x + Math.cos(ang) * 1.3, pz = c.z + Math.sin(ang) * 1.3;
pysPerson(B, R, px, pyGround(px, pz), pz, Math.atan2(c.x - px, c.z - pz), false, parka);
}
}
else if (z === "sky") {
B.put("plat", { x: c.x, y: y, z: c.z, ry: ry });
B.put("platEdge", { x: c.x, y: y, z: c.z, ry: ry, c: [0x3AE8F0, 0xF04AD8, 0x8A5AFF][R() * 3 | 0] });
var neon = [0x1A1A2E, 0x2A1A4A, 0x3AE8F0, 0xF04AD8, 0x2A2A3A, 0xE8E8F0];
for (i = 0; i < n; i++) {
var nq = pysAt(s, sd, a + (R() - 0.5) * 1.6, (R() - 0.5) * 3.4);
pysPerson(B, R, nq.x, y + 1.23, nq.z, ry + (R() - 0.5) * 0.5, false, neon);
}
}
else if (z === "lava") {
B.put("bunker", { x: c.x, y: y, z: c.z, ry: ry });
B.put("stripe", { x: c.x, y: y, z: c.z, ry: ry });
var fq2 = pysAt(s, sd, a - 2.4, 2.2);
B.put("fireStand", { x: fq2.x, y: pyGround(fq2.x, fq2.z), z: fq2.z, ry: ry });
var orange = [0xE86A1A, 0xE8C81A, 0xC8541A];
for (i = 0; i < Math.min(n, 3); i++) {
var mq = pysAt(s, sd, a + (R() - 0.5) * 1.4, (R() - 0.5) * 2.2);
pysPerson(B, R, mq.x, y + 0.5, mq.z, ry, false, orange);
}
for (i = 0; i < (L ? 1 : 3); i++) {
var cq = pysAt(s, sd, a + 3 + R() * 10, (R() - 0.5) * 16), cy = pyGround(cq.x, cq.z);
if (pyClear(cq.x, cq.z, 2)) {
var cr = R() * 6, k = 0.8 + R() * 1.2;
B.put("crust", { x: cq.x, y: cy, z: cq.z, ry: cr, s: k });
B.put("crack", { x: cq.x, y: cy, z: cq.z, ry: cr, s: k });
}
}
}
else if (z === "jungle") {
B.put("plat", { x: c.x, y: y, z: c.z, ry: ry, c: 0x5A4030 });
for (i = 0; i < n; i++) {
var jq = pysAt(s, sd, a + (R() - 0.5) * 1.6, (R() - 0.5) * 3.4);
pysPerson(B, R, jq.x, y + 1.23, jq.z, ry + (R() - 0.5) * 0.5, false);
}
var lq = pysAt(s, sd, a - 2.5, 2.4);
B.put("lantPole", { x: lq.x, y: pyGround(lq.x, lq.z), z: lq.z, ry: ry + Math.PI });
B.put("lantGlow", { x: lq.x, y: pyGround(lq.x, lq.z), z: lq.z, ry: ry + Math.PI });
}
else if (z === "storm") {
for (i = -1; i <= 1; i++) {
var hq = pysAt(s, sd, a - 2.4, i * 1.35);
B.put("bale", { x: hq.x, y: pyGround(hq.x, hq.z), z: hq.z, ry: ry + Math.PI / 2 });
}
var rain = [0xE8C81A, 0x1A3A6A, 0x2A2A2E, 0x3A6A3A, 0xC8201A, 0x5A5A6A];
for (i = 0; i < n; i++) {
var uq = pysAt(s, sd, a + (R() - 0.5) * 1.5, (R() - 0.5) * 4), uy = pyGround(uq.x, uq.z);
pysPerson(B, R, uq.x, uy, uq.z, ry + (R() - 0.5) * 0.4, false, rain);
if (i % 2 === 0) {
B.put("umb", { x: uq.x, y: uy, z: uq.z, rx: (R() - 0.5) * 0.3, c: [0x1A1A1E, 0xC8201A, 0x1A3A8A, 0xE8E2D8][R() * 4 | 0] });
B.put("umbStick", { x: uq.x + 0.15, y: uy, z: uq.z });
}
}
if (R() < 0.5) {
var kq = pysAt(s, sd, a + 3, 3);
B.put("sock", { x: kq.x, y: pyGround(kq.x, kq.z), z: kq.z });
B.put("sockBag", { x: kq.x, y: pyGround(kq.x, kq.z), z: kq.z, ry: -0.8 + (R() - 0.5) * 0.4 });
}
}
else if (z === "cave") {
var cc = [0x8A5AFF, 0x3AD8E8, 0xD85AF0][R() * 3 | 0];
B.put("crystal", { x: c.x, y: y, z: c.z, ry: R() * 6, s: 0.8 + R() * 0.8, c: cc });
var mq2 = pysAt(s, sd, a + 0.6, 2.4);
B.put("mushStem", { x: mq2.x, y: pyGround(mq2.x, mq2.z), z: mq2.z, ry: R() * 6 });
B.put("mushCap", { x: mq2.x, y: pyGround(mq2.x, mq2.z), z: mq2.z, ry: R() * 6, c: [0x5AE8C8, 0xA87AFF, 0x3AA8F0][R() * 3 | 0] });
var lq2 = pysAt(s, sd, a - 1.4, -2.2);
B.put("lantPole", { x: lq2.x, y: pyGround(lq2.x, lq2.z), z: lq2.z, ry: ry + Math.PI });
B.put("lantGlow", { x: lq2.x, y: pyGround(lq2.x, lq2.z), z: lq2.z, ry: ry + Math.PI });
for (i = 0; i < Math.min(n, 3); i++)
fan(1.5 + (R() - 0.5) * 3, 0.8, false, [0x3A3A4A, 0x5A4A3A, 0x2A2A2E, 0x6A5A3A]);
}
else if (z === "coast") {
B.put("bollard", { x: c.x, y: y, z: c.z });
var bq2 = pysAt(s, sd, a, 2.5);
B.put("buoyPost", { x: bq2.x, y: y, z: bq2.z, ry: ry });
B.put("buoy", { x: bq2.x, y: y, z: bq2.z, ry: ry });
for (i = 0; i < n; i++)
fan((R() - 0.5) * 5, 1.2, false, [0xE8E2D8, 0x1A3A6A, 0xE8C81A, 0x2A5A7A]);
}
else
return false;
if (talk)
PYS.talkAt.push({ x: c.x, y: y, z: c.z, zone: z, ry: ry, s: s, sd: sd, a: a });
return true;
},
function (B, R, s, sd) {
var z = s.zone, a, q, y;
if (z === "sky") {
a = s.w / 2 + 1.2;
q = pysAt(s, sd, a, 0);
if (!pyClear(q.x, q.z, 0.8))
return;
y = pyGround(q.x, q.z);
if (Math.abs(y - s.y) > 1.5)
return;
var col = sd > 0 ? 0x3AE8F0 : 0xF04AD8;
B.put("lamp", { x: q.x, y: y, z: q.z, ry: pysFace(s, sd) });
B.put("lampBar", { x: q.x, y: y, z: q.z, ry: pysFace(s, sd), c: col });
B.put("kerb", { x: q.x, y: y, z: q.z, ry: Math.atan2(s.tx, s.tz), c: col });
return;
}
if (z === "paddock") {
a = s.w / 2 + 2.4;
q = pysAt(s, sd, a, 0);
if (!pysFree(q.x, q.z, 0.5))
return;
y = pyGround(q.x, q.z);
B.put("catchPost", { x: q.x, y: y, z: q.z });
if (R() < 0.4)
B.put("tyres", { x: q.x + 0.6 * s.tx, y: y, z: q.z + 0.6 * s.tz });
return;
}
if (z === "cave") {
a = s.w / 2 + 1.6 + R() * 1.5;
q = pysAt(s, sd, a, 0);
if (!pyClear(q.x, q.z, 0.6))
return;
y = pyGround(q.x, q.z);
if (Math.abs(y - s.y) > 2)
return;
if (R() < 0.5)
B.put("crystal", { x: q.x, y: y, z: q.z, ry: R() * 6, s: 0.5 + R() * 0.7, c: [0x8A5AFF, 0x3AD8E8, 0xD85AF0][R() * 3 | 0] });
else {
B.put("mushStem", { x: q.x, y: y, z: q.z, ry: R() * 6, s: 0.8 + R() * 0.8 });
B.put("mushCap", { x: q.x, y: y, z: q.z, ry: R() * 6, s: 0.8 + R() * 0.8, c: [0x5AE8C8, 0xA87AFF, 0x3AA8F0][R() * 3 | 0] });
}
return;
}
if (z === "storm") {
a = s.w / 2 + 3 + R() * 3;
q = pysAt(s, sd, a, 0);
y = pysOk(s, q.x, q.z, 1);
if (y === null)
return;
B.put("bale", { x: q.x, y: y, z: q.z, ry: Math.atan2(s.tx, s.tz) + R() * 0.4 });
return;
}
if (z === "tundra" || z === "ice") {
a = s.w / 2 + 3;
q = pysAt(s, sd, a, 0);
y = pysOk(s, q.x, q.z, 1.2);
if (y === null)
return;
B.put("fence", { x: q.x, y: y, z: q.z, ry: Math.atan2(s.tx, s.tz) + Math.PI / 2, c: 0xF06A1A });
return;
}
if (z === "lava") {
a = s.w / 2 + 3;
q = pysAt(s, sd, a, 0);
y = pysOk(s, q.x, q.z, 1);
if (y === null)
return;
if (R() < 0.5)
B.put("fireStand", { x: q.x, y: y, z: q.z, ry: pysFace(s, sd) });
else
B.put("tyres", { x: q.x, y: y, z: q.z });
return;
}
if (z === "jungle") {
a = s.w / 2 + 2.5;
q = pysAt(s, sd, a, 0);
y = pysOk(s, q.x, q.z, 0.8);
if (y === null)
return;
B.put("lantPole", { x: q.x, y: y, z: q.z, ry: pysFace(s, sd) + Math.PI });
B.put("lantGlow", { x: q.x, y: y, z: q.z, ry: pysFace(s, sd) + Math.PI });
return;
}
if (z === "dunes") {
a = s.w / 2 + 3;
q = pysAt(s, sd, a, 0);
y = pysOk(s, q.x, q.z, 0.6);
if (y === null)
return;
B.put("whip", { x: q.x, y: y, z: q.z });
B.put("whipFlag", { x: q.x, y: y, z: q.z, ry: -0.6, c: [0xE8541A, 0xE8E81A, 0x1AE8A8][R() * 3 | 0] });
return;
}
if (z === "coast") {
a = s.w / 2 + 1.8;
q = pysAt(s, sd, a, 0);
y = pysOk(s, q.x, q.z, 0.5);
if (y === null)
return;
B.put("bollard", { x: q.x, y: y, z: q.z });
return;
}
if (z === "canyon") {
a = s.w / 2 + 2.5;
q = pysAt(s, sd, a, 0);
y = pysOk(s, q.x, q.z, 0.8);
if (y === null)
return;
B.put("tyres", { x: q.x, y: y, z: q.z });
if (R() < 0.5)
B.put("tyres", { x: q.x + 0.7 * s.tx, y: y, z: q.z + 0.7 * s.tz });
return;
}
},
function (B, R) {
if (PY.crowd)
PY.crowd.forEach(function (m) { m.visible = false; m.count = 0; });
PY.crowd = null;
var n = PY.lite ? 240 : 760, used = {}, fans = [0xC8201A, 0xC8201A, 0xE8E2D8, 0x2A2A2E, 0x1A4AA8, 0xE8B81A, 0x3A8A4A, 0xE87A2A, 0x8A3A8A, 0x5AA8C8];
for (var k = 0; k < n * 2 && n > 0; k++) {
var r = R() * 8 | 0, zi = Math.floor(R() * 240), key = r + ":" + zi;
if (used[key])
continue;
used[key] = 1;
n--;
var yb = 0.5 + r * 1.1, x = -17 - r * 2.2 + 0.3, z = -31.5 + zi * 0.6, y = yb * 2 + 0.25 - 0.45;
pysPerson(B, R, x, y, z, Math.PI / 2 + (R() - 0.5) * 0.35, true, fans);
}
},
function (B, R) {
var cx = 333, cz = -951, done = 0;
for (var t = 0; t < 60 && done < 1; t++) {
var x = cx + (R() - 0.5) * 30, z = cz + (R() - 0.5) * 30;
if (!pysFree(x, z, 6))
continue;
var y = pyGround(x, z);
B.put("brazier", { x: x, y: y, z: z });
B.put("flame", { x: x, y: y, z: z, ry: R() * 6 });
var gr = [0x3A3A3A, 0x5A4A3A, 0x7A2A2A, 0x2A4A5A, 0x6A6A5A];
for (var i = 0; i < (PY.lite ? 3 : 6); i++) {
var a = i / (PY.lite ? 3 : 6) * 6.283, px = x + Math.cos(a) * 1.4, pz = z + Math.sin(a) * 1.4;
pysPerson(B, R, px, y, pz, Math.atan2(x - px, z - pz), i % 3 === 0, gr);
if (i % 3 === 0)
B.put("drum", { x: px, y: y, z: pz, s: 0.55, c: 0x4A5A3A });
}
B.put("tarp", { x: x + 3.5, y: y, z: z, ry: 0.3 });
B.put("sailPoles", { x: x + 3.5, y: y, z: z, ry: 0.3, s: 0.95 });
B.put("deadCar", { x: x - 4.5, y: y, z: z + 1.5, ry: 1.2 });
B.put("cart", { x: x + 1, y: y, z: z - 4.2, ry: 0.1 });
B.put("cartTop", { x: x + 1, y: y, z: z - 4.2, ry: 0.1 });
B.put("drum", { x: x - 2.4, y: y, z: z - 2.6, c: 0x8A3A1A });
B.put("drum", { x: x - 2.9, y: y, z: z - 2.2, c: 0x2A4A6A });
B.put("tyres", { x: x + 4, y: y, z: z + 3 });
PYS.talkAt.push({ x: x + 1, y: y, z: z - 5.6, zone: "snarl", ry: Math.PI });
[[x, z, 1.0], [x - 4.5, z + 1.5, 2.3], [x + 1, z - 4.2, 1.2]].forEach(function (q) { pySolid({ x: q[0], z: q[1], hw: q[2], hd: q[2], rot: 0, h: y + 1.4, b: y - 0.5 }); });
done++;
}
},
function (G) {
var want = PY.lite ? ["paddock", "canyon", "lava", "snarl"] : ["paddock", "canyon", "storm", "lava", "cave", "sky", "snarl", "tundra"], got = {};
PYS.talkAt.forEach(function (t) {
if (got[t.zone] || want.indexOf(t.zone) < 0 || !PYS_TALK[t.zone])
return;
var T = PYS_TALK[t.zone], x = t.x, z = t.z;
if (t.s) {
var q = pysAt(t.s, t.sd, t.a - 1.8, 1.2);
x = q.x;
z = q.z;
}
if (!pyClear(x, z, 1))
return;
var p = pyPersonAt(G, T[0], T[1], x, z, t.ry, T[2]);
if (p) {
p.position.y = pyGround(x, z);
got[t.zone] = 1;
}
});
},
function (G) {
var R = pysR(23112026), L = PY.lite, B = pysBag(), K = pysKinds(), S = PYT.S;
PYS.talkAt = [];
var GS = pysBag();
pysGrandstand(GS, R);
var gap = L ? 150 : 80, vgap = L ? 36 : 16, next = 20, vnext = 0, side = 1, near = [[-700017.9, 186.4], [-699667, -951], [-700013, 70.4], [-699717.7, -1425.4], [-699103.3, -711.7], [-701316.9, 682.4], [-699559, 672.1], [-700408.4, -584.3]].map(function (p) { return [p[0] - PY.base, p[1]]; });
near.forEach(function (p) {
var i = pyNearestMain(p[0], p[1]), s = S[i];
if (!s || /[tgc]/.test(s.fl))
return;
var dx = p[0] - s.x, dz = p[1] - s.z;
if (dx * dx + dz * dz > 80 * 80)
return;
var sd = (dx * s.tz - dz * s.tx) > 0 ? 1 : -1;
for (var k = 0; k < 4; k++) {
var ss = S[(i + k * 3) % S.length];
if (pysStation(B, R, ss, k % 2 ? -sd : sd, true))
break;
}
});
for (var i = 0; i < S.length; i++) {
var s = S[i];
if (!s || s.w <= 0 || /[tg]/.test(s.fl))
continue;
if (s.d >= next) {
if (pysStation(B, R, s, side, true)) {
next = s.d + gap * (0.7 + R() * 0.6);
side = -side;
}
}
if (s.d >= vnext) {
vnext = s.d + vgap;
pysVerge(B, R, s, 1);
pysVerge(B, R, s, -1);
}
}
pysSnarlCamp(B, R);
var P = new THREE.Group();
P.name = "py-sweep";
G.add(P);
Object.keys(B.all).forEach(function (k) { var D = K[k]; if (!D)
return; pysIM(P, D.geo, D.mat, B.all[k], D.sh); });
var GP = new THREE.Group();
GP.name = "py-stand";
G.add(GP);
PY.crowd = [];
Object.keys(GS.all).forEach(function (k) { var D = K[k]; if (D) {
var m = pysIM(GP, D.geo, D.mat, GS.all[k], D.sh);
if (m)
PY.crowd.push(m);
} });
pysTalkers(G);
PYS.done = true;
PYS.g = P;
}
];
});
