/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var MD = { FL: 8, ramps: [], lands: [], bridges: [], lifts: [], solid: [], rects: [], walkers: [], idlers: [], keepers: {}, spin: [], esc: [], water: [], mats: {}, lvl: -1, ride: null, slots: null, dyn: null, dir: null, dirTex: null, t: 0 };
function mdM(c) { var k = "l" + c; return MD.mats[k] || (MD.mats[k] = new THREE.MeshLambertMaterial({ color: c })); }
function mdB(c) { var k = "b" + c; return MD.mats[k] || (MD.mats[k] = new THREE.MeshBasicMaterial({ color: c })); }
function mdGlass(c, o) { var k = "g" + c + "_" + o; return MD.mats[k] || (MD.mats[k] = new THREE.MeshLambertMaterial({ color: c, transparent: true, opacity: o, depthWrite: false })); }
function mdT(c, map, basic) { var o = { map: map }; if (c !== undefined && c !== null)
o.color = c; return basic ? new THREE.MeshBasicMaterial(o) : new THREE.MeshLambertMaterial(o); }
function mdRand(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function mdCanvas(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
function mdTex(c, rx, ry) { var t = new THREE.CanvasTexture(c); t.anisotropy = (typeof GFX !== "undefined" && GFX.aniso) || 4; if (rx || ry) {
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(rx || 1, ry || 1);
} return t; }
function mdMarble() { return __ZC(99, 0, this, arguments, new.target); }
function mdWallTex() { return __ZC(99, 1, this, arguments, new.target); }
function mdFasciaTex() {
var c = mdCanvas(128, 64), x = c.getContext("2d");
x.fillStyle = "#F7F2EA";
x.fillRect(0, 0, 128, 64);
x.fillStyle = "#C9A868";
x.fillRect(0, 6, 128, 4);
x.fillRect(0, 54, 128, 4);
x.fillStyle = "#E8DCEB";
for (var i = 0; i < 4; i++) {
x.beginPath();
x.arc(16 + i * 32, 32, 7, 0, Math.PI * 2);
x.fill();
}
return c;
}
function mdGlassTex() { return __ZC(99, 2, this, arguments, new.target); }
function mdMuralTex(kind) { return __ZC(99, 3, this, arguments, new.target); }
function mdWaterTex() { return __ZC(99, 4, this, arguments, new.target); }
function mdStepTex() {
var c = mdCanvas(64, 64), x = c.getContext("2d");
x.fillStyle = "#9EA3AA";
x.fillRect(0, 0, 64, 64);
x.fillStyle = "#5E636B";
for (var i = 0; i < 16; i++)
x.fillRect(i * 4, 0, 2, 64);
x.fillStyle = "#E8C84A";
x.fillRect(0, 0, 64, 4);
x.fillRect(0, 60, 64, 4);
x.fillStyle = "#3A3E44";
x.fillRect(60, 0, 4, 64);
return c;
}
function mdCloudTex() { return __ZC(99, 5, this, arguments, new.target); }
function mdRoseTex() { return __ZC(99, 6, this, arguments, new.target); }
function mdRoseWindowTex() { return __ZC(99, 7, this, arguments, new.target); }
function mdSignTex(lines, w, h, bg, fg, gold) { return __ZC(99, 8, this, arguments, new.target); }
function mdDisc(a, b, seg, uvm) { return __ZC(99, 9, this, arguments, new.target); }
function mdGeo(P, N, U) { var g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(P, 3)); g.setAttribute("normal", new THREE.Float32BufferAttribute(N, 3)); if (U)
g.setAttribute("uv", new THREE.Float32BufferAttribute(U, 2)); g.computeBoundingSphere(); return g; }
function mdQuad(P, N, U, a, b, c, d, ua, ub, uc, ud, want) { return __ZC(99, 10, this, arguments, new.target); }
function mdRingSlab(ai, bi, ao, bo, seg, y, th) { return __ZC(99, 11, this, arguments, new.target); }
function mdFlatRing(ai, bi, ao, bo, seg, y, skip) { return __ZC(99, 12, this, arguments, new.target); }
function mdBand(a, b, seg, y0, y1, skip, uw, uh) { return __ZC(99, 13, this, arguments, new.target); }
function mdBack(m) { var b = new THREE.Mesh(m.geometry, m.material); b.position.copy(m.position); b.rotation.copy(m.rotation); b.rotateY(Math.PI); b.scale.copy(m.scale); m.parent.add(b); return b; }
function mdBox(G, w, h, d, mat, x, y, z, ry, rz, rx) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); m.rotation.set(rx || 0, ry || 0, rz || 0); G.add(m); return m; }
function mdCyl(G, rt, rb, h, seg, mat, x, y, z) { var m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 16), mat); m.position.set(x, y, z); G.add(m); return m; }
var MD_BALL = {};
function mdBall(G, r, mat, x, y, z, sy) { var k = r < 0.3 ? "s" : "b", geo = MD_BALL[k] || (MD_BALL[k] = r < 0.3 ? new THREE.IcosahedronGeometry(1, 0) : new THREE.SphereGeometry(1, 10, 7)); var m = new THREE.Mesh(geo, mat); m.scale.setScalar(r); m.position.set(x, y, z); if (sy)
m.scale.y = r * sy; G.add(m); return m; }
function mdBake(root, skip) { return __ZC(99, 14, this, arguments, new.target); }
function mdSlotsCalc() { return __ZC(99, 15, this, arguments, new.target); }
function mdUnitPlace(n) {
var lv = n <= 14 ? 0 : (n <= 28 ? 1 : 2), k = lv < 2 ? (n - 1) % 14 : [0, 1, 2, 4, 5, 6, 7, 8, 9, 11, 12, 13][n - 29];
return { lv: lv, slot: k };
}
function mdIsShopSlot(lv, k) { return !(lv === 2 && (k === 3 || k === 10)); }
function mdPlan() { return __ZC(99, 16, this, arguments, new.target); }
function mdOnGallery(lx, lz) { var a = lx / MD.VA, b = lz / MD.VB; return a * a + b * b >= 1; }
function mdInHall(lx, lz) { var a = lx / (MALL.A + 1.2), b = lz / (MALL.B + 1.2); return a * a + b * b <= 1; }
function mdRampH(r, lx, lz) { var lo = Math.min(r.xa, r.xb), hi = Math.max(r.xa, r.xb); if (lx < lo || lx > hi || lz < r.z0 || lz > r.z1)
return null; return r.h0 + (r.h1 - r.h0) * Math.abs(lx - r.xa) / Math.abs(r.xb - r.xa); }
function mdFloors(lx, lz, out) { return __ZC(99, 17, this, arguments, new.target); }
var MD_F = [];
function mdSupport(lx, lz, feet) {
var f = mdFloors(lx, lz, MD_F), reach = feet + (typeof STEP_UP !== "undefined" ? STEP_UP : 0.62) + 0.02, best = 0;
for (var i = 0; i < f.length; i++)
if (f[i] > best && f[i] <= reach)
best = f[i];
return best;
}
function mdBlocked(lx, lz, feet) { return __ZC(99, 18, this, arguments, new.target); }
function mdLevel(feet) { return Math.max(0, Math.min(2, Math.round(feet / MD.FL))); }
function mdFig(id, top, bottom) { return __ZC(99, 19, this, arguments, new.target); }
function mdStaff(G, id, top, bottom, x, y, z, face, busy) {
var g = mdFig(id, top, bottom);
if (!g)
return null;
g.position.set(x, y, z);
g.rotation.y = face;
G.add(g);
MD.idlers.push({ g: g, busy: busy || 0.6, ph: (x * 7.3 + z * 3.1) % 6.28, face: face });
return g;
}
function mdSeat(G, id, x, y, z, face) {
var g = mdFig(id);
if (!g)
return null;
g.position.set(x, y - 0.45, z);
g.rotation.y = face;
G.add(g);
var lm = g.userData.limbs;
if (lm) {
[lm.ll, lm.rl].forEach(function (l) { if (l)
l.rotation.x = -1.45; });
[lm.la, lm.ra].forEach(function (l) { if (l)
l.rotation.x = -0.5; });
}
return g;
}
function mdWalker(G, id, top, bottom, a, b, y, ph, v, prop) {
var g = mdFig(id, top, bottom);
if (!g)
return null;
if (prop)
g.add(prop);
G.add(g);
MD.walkers.push({ g: g, a: a, b: b, y: y, ph: ph, v: v });
return g;
}
function mdBuild(G) { return __ZC(99, 20, this, arguments, new.target); }
function mdDirectory() { return __ZC(99, 21, this, arguments, new.target); }
var MD_M4 = new THREE.Matrix4();
function mdTick(dt) { return __ZC(99, 22, this, arguments, new.target); }
var MD_LV = ["The ground floor", "The first floor", "The second floor"];
function mdLiftNear() {
var P = camera.position, lx = P.x - MALL.cx, lz = P.z - MALL.cz, feet = P.y - 1.72;
for (var i = 0; i < MD.lifts.length; i++) {
var L = MD.lifts[i];
if (Math.hypot(lx - L.x, lz - L.z) < 3.4 && Math.abs(feet - mdLevel(feet) * MD.FL) < 0.5)
return L;
}
return null;
}
function mdLiftMenu(L) { return __ZC(99, 23, this, arguments, new.target); }
function mdLiftGo(L, to) {
var here = mdLevel(camera.position.y - 1.72);
if (to === here)
return;
MD.ride = { L: L, stage: L.y === here * MD.FL ? 1 : 0, from: here, to: to, t: 0, sx: 0, sz: 0 };
setStatus(MD.ride.stage ? "The doors close…" : "The lift is on its way down to you…".replace("down", L.y > here * MD.FL ? "down" : "up"));
}
function mdLiftTick(dt) { return __ZC(99, 24, this, arguments, new.target); }
(function () {
if (typeof walkBy !== "function")
return;
var wb = walkBy;
walkBy = function (mx, mz) { if (typeof MALL !== "undefined" && MALL.on && MD.ride)
return; return wb.apply(this, arguments); };
})();
function mdKeeper(u, st) { return __ZC(99, 25, this, arguments, new.target); }
function mdCompact(g) { return __ZC(99, 26, this, arguments, new.target); }
function mdHoarding(g) { return __ZC(99, 27, this, arguments, new.target); }
function mdDispose(g) {
g.traverse(function (m) {
if (!m.isMesh || m.userData.mdShared)
return;
if (m.geometry)
m.geometry.dispose();
var mt = m.material;
if (mt && mt !== MD.vc) {
if (mt.map)
mt.map.dispose();
mt.dispose();
}
});
}
