/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(374, function () {
return [
function () {
if (VLT.tex)
return VLT.tex;
var c = document.createElement("canvas");
c.width = c.height = 64;
var x = c.getContext("2d"), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
g.addColorStop(0, "rgba(255,255,255,1)");
g.addColorStop(0.25, "rgba(255,255,255,.55)");
g.addColorStop(0.6, "rgba(255,255,255,.12)");
g.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = g;
x.fillRect(0, 0, 64, 64);
VLT.tex = new THREE.CanvasTexture(c);
return VLT.tex;
},
function () {
var M = vltMats();
if (M.pool)
return M.pool;
var c = document.createElement("canvas");
c.width = 64;
c.height = 128;
var x = c.getContext("2d");
x.scale(1, 2);
var g = x.createRadialGradient(32, 12, 0, 32, 31, 31);
g.addColorStop(0, "rgba(255,240,210,.85)");
g.addColorStop(0.4, "rgba(255,236,200,.4)");
g.addColorStop(1, "rgba(255,230,190,0)");
x.fillStyle = g;
x.fillRect(0, 0, 64, 64);
var t = new THREE.CanvasTexture(c);
M.pool = new THREE.MeshBasicMaterial({ map: t, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0, fog: true,
polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
return M.pool;
},
function (g) {
var keep = { p: g.position.clone(), q: g.quaternion.clone(), s: g.scale.clone(), par: g.parent };
g.position.set(0, 0, 0);
g.quaternion.set(0, 0, 0, 1);
g.scale.set(1, 1, 1);
g.updateMatrix();
g.matrixWorld.copy(g.matrix);
g.children.forEach(function (c) { c.updateMatrixWorld(true); });
var b = new THREE.Box3(), t = new THREE.Box3();
(function walk(o) {
for (var i = 0; i < o.children.length; i++) {
var c = o.children[i];
if (!c.visible || c.userData.vlt || c.isSprite || c.isLight)
continue;
var mt = c.material, see = mt && !Array.isArray(mt) && mt.transparent && (mt.opacity < 0.3 || mt.depthWrite === false);
if (c.isMesh && c.geometry && !see) {
if (!c.geometry.boundingBox)
c.geometry.computeBoundingBox();
t.copy(c.geometry.boundingBox).applyMatrix4(c.matrixWorld);
if (t.max.y - t.min.y > 0.04)
b.union(t);
}
walk(c);
}
})(g);
g.position.copy(keep.p);
g.quaternion.copy(keep.q);
g.scale.copy(keep.s);
g.updateMatrix();
if (keep.par)
g.updateMatrixWorld(true);
return b.isEmpty() ? null : b;
},
function (b, cls) {
var w = b.max.x - b.min.x, h = b.max.y - b.min.y, L = b.max.z - b.min.z, y0 = b.min.y, zf = b.max.z + 0.015, zr = b.min.z - 0.015, cl = function (v, a, c) { return Math.max(a, Math.min(c, v)); };
var out = [], pool = null;
var add = function (t, sh, x, y, z, a, bb, c) { out.push([t, sh, x, y, z, a, bb, c]); };
if (cls === "car") {
var hy = y0 + cl(h * 0.36, 0.5, 1.15), lw = cl(w * 0.16, 0.16, 0.42), lh = cl(h * 0.08, 0.1, 0.22), ty = hy + lh * 0.6, iw = cl(w * 0.05, 0.06, 0.14);
[-1, 1].forEach(function (s) {
add("head", "box", s * w * 0.32, hy, zf, lw, lh, 0.05);
add("tail", "box", s * w * 0.33, ty, zr, lw * 0.9, lh * 1.1, 0.05);
add(s > 0 ? "indL" : "indR", "box", s * w * 0.46, hy, zf, iw, lh * 0.75, 0.05);
add(s > 0 ? "indL" : "indR", "box", s * w * 0.46, ty, zr, iw, lh * 0.9, 0.05);
add("rev", "box", s * w * 0.14, ty, zr, lw * 0.45, lh * 0.6, 0.05);
});
if (h > 2.4)
[-1, 1].forEach(function (s) { add("tail", "box", s * w * 0.4, y0 + h * 0.86, zr, lw * 0.6, lh * 0.8, 0.05); });
pool = { y: y0 + 0.06, z: zf + 5, w: Math.max(3.2, w * 2), l: 10 };
}
else if (cls === "moto") {
var my = y0 + cl(h * 0.55, 0.55, 1.0);
add("head", "ball", 0, my, zf, 0.09, 0, 0);
add("tail", "box", 0, my - 0.08, zr, 0.14, 0.07, 0.04);
[-1, 1].forEach(function (s) { add(s > 0 ? "indL" : "indR", "ball", s * 0.24, my - 0.04, zf - 0.06, 0.04, 0, 0); add(s > 0 ? "indL" : "indR", "ball", s * 0.2, my - 0.1, zr + 0.04, 0.04, 0, 0); });
pool = { y: y0 + 0.06, z: zf + 4, w: 2.4, l: 8 };
}
else if (cls === "cycle") {
add("head", "ball", 0, y0 + h * 0.72, zf, 0.05, 0, 0);
add("tail", "ball", 0, y0 + h * 0.58, zr, 0.04, 0, 0);
pool = { y: y0 + 0.06, z: zf + 3, w: 1.6, l: 5 };
}
else if (cls === "coach") {
var cy = y0 + h * 0.55, cz = b.max.z - L * 0.35;
[-1, 1].forEach(function (s) {
add("lantern", "ball", s * (w * 0.5 + 0.05), cy, cz, 0.1, 0, 0);
add(s > 0 ? "indL" : "indR", "ball", s * (w * 0.5 + 0.05), cy - 0.22, cz, 0.05, 0, 0);
add(s > 0 ? "indL" : "indR", "ball", s * w * 0.4, y0 + h * 0.38, zr, 0.05, 0, 0);
});
add("tail", "ball", 0, y0 + h * 0.38, zr, 0.07, 0, 0);
pool = { y: y0 + 0.06, z: cz + 4, w: Math.max(2.6, w * 1.6), l: 7 };
}
else if (cls === "rail") {
var ry = y0 + cl(h * 0.28, 0.6, 1.3);
[-1, 1].forEach(function (s) { add("head", "ball", s * w * 0.3, ry, zf, 0.13, 0, 0); add("tail", "ball", s * w * 0.3, ry, zr, 0.11, 0, 0); });
add("head", "ball", 0, b.max.y - h * 0.12, zf, 0.12, 0, 0);
pool = { y: y0 + 0.06, z: zf + 6, w: Math.max(3, w * 1.4), l: 12 };
}
else if (cls === "ship") {
var sy = y0 + cl(h * 0.24, 0.8, 4.2), sz = b.min.z + L * 0.6, r = cl(L * 0.012, 0.12, 0.3);
add("port", "ball", b.max.x + 0.04, sy, sz, r, 0, 0);
add("stbd", "ball", b.min.x - 0.04, sy, sz, r, 0, 0);
add("white", "ball", 0, sy + cl(h * 0.1, 0.4, 2), zf - L * 0.04, r, 0, 0);
add("lantern", "ball", 0, sy + cl(h * 0.06, 0.3, 1.4), zr + L * 0.02, r * 1.4, 0, 0);
}
else if (cls === "air") {
var ay = (b.min.y + b.max.y) / 2, az = (b.min.z + b.max.z) / 2, ar = cl(Math.max(w, L) * 0.01, 0.1, 0.35);
add("port", "ball", b.max.x + 0.05, ay, az, ar, 0, 0);
add("stbd", "ball", b.min.x - 0.05, ay, az, ar, 0, 0);
add("white", "ball", 0, ay, zr, ar, 0, 0);
add("beacon", "ball", 0, b.max.y + 0.05, az, ar * 1.2, 0, 0);
add("beacon", "ball", 0, b.min.y - 0.05, az, ar * 1.2, 0, 0);
}
return { lamps: out, pool: pool, cls: cls };
},
function (parts) {
var pos = [], nor = [];
parts.forEach(function (G) {
var g = G.index ? G.toNonIndexed() : G;
pos.push(g.attributes.position.array);
nor.push(g.attributes.normal.array);
if (g !== G)
g.dispose();
G.dispose();
});
var n = 0;
pos.forEach(function (a) { n += a.length; });
var P = new Float32Array(n), N = new Float32Array(n), o = 0;
for (var i = 0; i < pos.length; i++) {
P.set(pos[i], o);
N.set(nor[i], o);
o += pos[i].length;
}
var out = new THREE.BufferGeometry();
out.setAttribute("position", new THREE.BufferAttribute(P, 3));
out.setAttribute("normal", new THREE.BufferAttribute(N, 3));
out.computeBoundingSphere();
return out;
},
function (lay) {
var by = {};
lay.lamps.forEach(function (l) {
var t = l[0], G = l[1] === "box" ? new THREE.BoxGeometry(l[5], l[6], l[7]) : new THREE.SphereGeometry(l[5], 8, 6);
G.translate(l[2], l[3], l[4]);
(by[t] = by[t] || []).push(G);
});
var out = {};
Object.keys(by).forEach(function (t) { out[t] = vltJoin(by[t]); });
return out;
},
function (E) {
var g = E.g, b = vltBox(g);
if (!b)
return false;
var sz = b.getSize(VLT.v3), key = E.arch + "|" + sz.x.toFixed(1) + "|" + sz.y.toFixed(1) + "|" + sz.z.toFixed(1);
var C = VLT.lay[key];
if (!C) {
var lay = vltLayout(b, E.cls);
C = VLT.lay[key] = { lay: lay, geos: vltGeos(lay) };
}
vltUnfit(E);
var M = vltMats(), R = new THREE.Group();
R.name = "vehicle-lights";
R.userData.vlt = 1;
E.lens = {};
Object.keys(C.geos).forEach(function (t) {
var start = { head: M.head, lantern: M.lantern, tail: M.tail, indL: M.indOff, indR: M.indOff, rev: M.revOff, port: M.port, stbd: M.stbd, white: M.white, beacon: M.beaconOff }[t];
var m = new THREE.Mesh(C.geos[t], start);
m.userData.vlt = 1;
m.raycast = function () { };
m.castShadow = false;
m.receiveShadow = false;
m.renderOrder = 2;
R.add(m);
E.lens[t] = m;
});
E.halos = [];
var lite = vltLite();
C.lay.lamps.forEach(function (l) {
var t = l[0];
if (lite && t === "rev")
return;
var k = t === "indL" || t === "indR" ? "ind" : t, s = new THREE.Sprite(vltHaloMat(k));
s.position.set(l[2], l[3], l[4] + (l[4] > 0 ? 0.06 : -0.06));
s.userData.vlt = 1;
s.raycast = function () { };
s.visible = false;
s.userData.t = t;
s.userData.r = l[1] === "box" ? Math.max(l[5], l[6]) : l[5] * 2;
R.add(s);
E.halos.push(s);
});
if (C.lay.pool) {
var P = C.lay.pool;
if (!VLT.poolGeo) {
VLT.poolGeo = new THREE.PlaneGeometry(1, 1);
VLT.poolGeo.rotateX(-Math.PI / 2);
}
var pm = new THREE.Mesh(VLT.poolGeo, vltPoolMat());
pm.scale.set(P.w, 1, P.l);
pm.position.set(0, P.y, P.z);
pm.userData.vlt = 1;
pm.raycast = function () { };
pm.visible = false;
pm.renderOrder = 1;
R.add(pm);
E.pool = pm;
}
E.lay = C.lay;
E.root = R;
E.modelled = g.userData.modelled || null;
E.kidN = g.children.length;
g.add(R);
g.userData.vltE = E;
return true;
},
function (E, dt) {
var p = VLT.v3, f = E.g.getWorldDirection(VLT.v4), hd = Math.atan2(f.x, f.z);
if (E.px === undefined || dt <= 0) {
E.px = p.x;
E.pz = p.z;
E.ph = hd;
E.sv = 0;
E.acc = 0;
E.yr = 0;
return { v: 0, brake: true, ind: null, rev: false };
}
var vx = (p.x - E.px) / dt, vz = (p.z - E.pz) / dt, sp = vx * f.x + vz * f.z;
if (Math.abs(sp) > 80)
sp = E.sv;
var dh = hd - E.ph;
while (dh > Math.PI)
dh -= Math.PI * 2;
while (dh < -Math.PI)
dh += Math.PI * 2;
var k = Math.min(1, dt * 4), prev = E.sv;
E.sv += (sp - E.sv) * k;
E.acc += ((E.sv - prev) / dt - E.acc) * k;
E.yr += (dh / dt - E.yr) * k;
E.px = p.x;
E.pz = p.z;
E.ph = hd;
var v = E.sv, ind = null;
if (Math.abs(v) > 1 && Math.abs(E.yr) > 0.25)
ind = E.yr > 0 ? "left" : "right";
return { v: v, brake: (E.acc < -1.2 && Math.abs(v) > 0.4) || Math.abs(v) < 0.3, ind: ind, rev: v < -0.3 };
},
function (el) {
var row = el.querySelector(".dh-btns");
if (!row)
return;
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-vlt", "1");
b.title = "Headlights (L)";
var paint = function () { b.textContent = VLT.mode === "on" ? "Lights: on" : "Lights: auto"; };
var fire = function (ev) { if (ev) {
ev.preventDefault();
ev.stopPropagation();
} vltToggle(); paint(); };
b.addEventListener("click", fire);
b.addEventListener("touchend", fire, { passive: false });
paint();
row.appendChild(b);
},
function () {
VLT.mode = VLT.mode === "on" ? "auto" : "on";
try {
localStorage.setItem("somnu.vehlights", VLT.mode);
}
catch (e) { }
if (typeof driveNote === "function")
driveNote(VLT.mode === "on" ? "Headlights on" : "Headlights: on by themselves after dark", 1.5);
var b = document.querySelector("#dhud [data-vlt]");
if (b)
b.textContent = VLT.mode === "on" ? "Lights: on" : "Lights: auto";
}
];
});
