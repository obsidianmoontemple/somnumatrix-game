/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(475, function () {
return [
function (m, stop) {
if (!m.isMesh || m.isSkinnedMesh || !m.geometry || !m.material || Array.isArray(m.material))
return false;
var M = m.material;
if (M.transparent && M.opacity < 0.95)
return false;
if (M.isMeshBasicMaterial || M.isShaderMaterial || M.isPointsMaterial || M.isSpriteMaterial || M.isLineBasicMaterial)
return false;
if (M.wireframe || M.visible === false)
return false;
var kd = sswKind(m);
if (!kd)
return false;
var P = m.geometry.parameters || {};
if (M.side === THREE.BackSide)
return false;
if (P.openEnded || (P.thetaLength != null && P.thetaLength < 6.2 && kd !== "ball") || (kd === "ball" && ((P.thetaLength != null && P.thetaLength < 3.1) || (P.phiLength != null && P.phiLength < 6.2))))
return false;
if (M.side === THREE.DoubleSide && (kd === "cyl" || kd === "ball" || kd === "cone")) {
if (!m.geometry.boundingBox)
m.geometry.computeBoundingBox();
var gb = m.geometry.boundingBox;
if (gb.max.x - gb.min.x > 4)
return false;
}
for (var p = m; p && p !== stop; p = p.parent) {
if (p.visible === false)
return false;
if (p.name && SSW_MOVES.test(p.name))
return false;
var u = p.userData;
if (u) {
if (u.noSolid || u.sswNo)
return false;
for (var i = 0; i < SSW_UMOVE.length; i++)
if (u[SSW_UMOVE[i]])
return false;
}
if (p.onBeforeRender && p.onBeforeRender !== THREE.Object3D.prototype.onBeforeRender)
return false;
}
return true;
},
function (n, mw) {
var V = SSW_V || (SSW_V = { m: new THREE.Matrix4(), b: new THREE.Box3(), p: new THREE.Vector3(), q: new THREE.Quaternion(), s: new THREE.Vector3(), up: new THREE.Vector3(), ax: new THREE.Vector3() });
V.m.multiplyMatrices(mw, n.rel);
V.b.copy(n.bb).applyMatrix4(V.m);
V.m.decompose(V.p, V.q, V.s);
V.up.set(0, 1, 0).applyQuaternion(V.q);
V.ax.set(1, 0, 0).applyQuaternion(V.q);
var c = new THREE.Vector3();
n.bb.getCenter(c);
c.applyMatrix4(V.m);
return { k: n.k, b: V.b.clone(), c: c, rot: -Math.atan2(V.ax.z, V.ax.x), upY: V.up.y, up: V.up.clone(), s: V.s.clone(), bb: n.bb, p: n.p };
},
function (W, S, arr) {
var b = S.b, w = b.max.x - b.min.x, d = b.max.z - b.min.z, h = b.max.y - b.min.y, base = W.base;
if (h < 1.0 || Math.min(w, d) < 0.4 || w * d > 1600)
return null;
var lx = S.c.x - base, z = S.c.z;
if (arr && (lx - arr.x) * (lx - arr.x) + (z - arr.z) * (z - arr.z) < 9 + w * w / 4 + d * d / 4)
return null;
if ((S.k === "cyl" || S.k === "ball" || S.k === "cone") && Math.min(w, d) > 12)
return null;
var feet = sswGround(W, lx, z, b.min.y + 0.5);
if (sswGround(W, lx, z, b.max.y) >= b.max.y - 0.6)
return null;
if (b.min.y > feet + 0.9)
return null;
if (feet + 0.4 > b.max.y)
return null;
var knee = feet + 0.8, sol = null;
if (S.k === "box") {
if (Math.abs(S.upY) < 0.95) {
var r0 = Math.min(w, d) * 0.42;
if (r0 < 0.3)
return null;
sol = { x: lx, z: z, r: r0 };
}
else {
var p = S.p, hw = (p.width || (S.bb.max.x - S.bb.min.x)) * Math.abs(S.s.x) / 2, hd = (p.depth || (S.bb.max.z - S.bb.min.z)) * Math.abs(S.s.z) / 2;
if (Math.min(hw, hd) < 0.12)
return null;
sol = { x: lx, z: z, hw: Math.max(0.05, hw - 0.04), hd: Math.max(0.05, hd - 0.04), rot: S.rot };
}
}
else if (S.k === "cyl" || S.k === "cone") {
var rb = S.p.radiusBottom != null ? S.p.radiusBottom : (S.p.radius != null ? S.p.radius : Math.min(w, d) / 2), rt = S.p.radiusTop != null ? S.p.radiusTop : (S.k === "cone" ? 0 : rb);
var sc = Math.max(Math.abs(S.s.x), Math.abs(S.s.z));
if (Math.abs(S.upY) < 0.9) {
var len = (S.p.height || h) * Math.abs(S.s.y), rr = Math.max(rb, rt) * sc * 0.9;
if (rr < 0.25 || b.max.y < feet + 0.5)
return null;
var n = Math.max(2, Math.min(12, Math.ceil(len / (rr * 1.6)))), out = [];
for (var i = 0; i < n; i++) {
var t = (i / (n - 1) - 0.5) * len * 0.9;
out.push({ x: lx + S.up.x * t, z: z + S.up.z * t, r: rr });
}
return out.map(function (o) { o.b = b.min.y; o.h = h; return o; });
}
var f = Math.max(0, Math.min(1, (knee - b.min.y) / h)), r1 = (rb + (rt - rb) * f) * sc * 0.92;
if (r1 < 0.12)
return null;
sol = { x: lx, z: z, r: r1 };
}
else {
var Rh = Math.min(w, d) / 2, cy = (b.min.y + b.max.y) / 2, Ry = h / 2, q = (knee - cy) / Ry, sl = Math.sqrt(Math.max(0, 1 - q * q)), r2 = Rh * sl * 0.88;
if (r2 < 0.3)
return null;
sol = { x: lx, z: z, r: r2 };
}
sol.b = b.min.y;
sol.h = h;
if (sswBlocked(W, lx, z, feet) && (sol.r != null ? sol.r < 1.5 : Math.max(sol.hw, sol.hd) < 1.5))
return null;
return [sol];
},
function (W, s) {
var G = W.sswGrid || (W.sswGrid = new Map()), R = (s.r != null ? s.r : Math.hypot(s.hw, s.hd)) + 0.4;
for (var cx = Math.floor((s.x - R) / 16); cx <= Math.floor((s.x + R) / 16); cx++)
for (var cz = Math.floor((s.z - R) / 16); cz <= Math.floor((s.z + R) / 16); cz++) {
var k = cx + "," + cz, L = G.get(k);
if (!L)
G.set(k, L = []);
L.push(s);
}
W.sswN = (W.sswN || 0) + 1;
},
function (W, lx, z, feet) {
var G = W.sswGrid;
if (!G)
return false;
var L = G.get(sswCell(lx, z));
if (!L)
return false;
for (var i = 0; i < L.length; i++) {
var s = L[i];
if (feet > s.b + s.h - 0.3 || feet + 1.7 < s.b)
continue;
var dx = lx - s.x, dz = z - s.z;
if (s.r != null) {
if (dx * dx + dz * dz < (s.r + 0.3) * (s.r + 0.3))
return true;
continue;
}
var c = Math.cos(-s.rot), sn = Math.sin(-s.rot), ax = dx * c + dz * sn, az = -dx * sn + dz * c;
if (Math.abs(ax) < s.hw + 0.3 && Math.abs(az) < s.hd + 0.3)
return true;
}
return false;
},
function (key) {
var W = WORLDS[key];
if (!W || !W.g || SSW.off || SSW.skip[key] || WLD.on !== key || store.inside)
return;
var G = W.g, arr = WLD.arrive || null, now = [];
if (W.sswG !== G) {
W.sswG = G;
W.sswGrid = null;
W.sswN = 0;
}
G.updateMatrixWorld(true);
G.traverse(function (o) {
if (o.userData && o.userData.sswC && !SSW.done.has(o)) {
for (var p = o; p && p !== G; p = p.parent)
if (p.visible === false)
return;
var keep = true;
for (var q = o; q && q !== G; q = q.parent) {
if (q.name && SSW_MOVES.test(q.name)) {
keep = false;
break;
}
}
SSW.done.add(o);
if (!keep)
return;
var mw = o.matrixWorld.clone();
o.userData.sswC.forEach(function (n) { now.push({ n: n, mw: mw, o: o, e: mw.elements.slice() }); });
return;
}
if (o.isMesh && !o.isInstancedMesh && !SSW.done.has(o) && sswOk(o, G)) {
SSW.done.add(o);
var rel = new THREE.Matrix4();
now.push({ n: sswNote(o, rel.identity()), mw: o.matrixWorld, o: o, e: o.matrixWorld.elements.slice() });
}
});
if (!now.length)
return;
var run = ++SSW.run;
setTimeout(function () {
if (WLD.on !== key || SSW.off || run !== SSW.run && false)
return;
G.updateMatrixWorld(true);
sswHook(W);
var n0 = W.sswN || 0, ar = WLD.arrive ? { x: WLD.arrive.x, z: WLD.arrive.z } : arr;
now.forEach(function (it) {
var e = it.o.matrixWorld.elements;
for (var i = 12; i < 15; i++)
if (Math.abs(e[i] - it.e[i]) > 0.01)
return;
for (var p = it.o; p && p !== G; p = p.parent)
if (p.visible === false)
return;
try {
var S = sswPlace(it.n, it.o.matrixWorld), L = sswSolid(W, S, ar);
if (L)
L.forEach(function (s) { sswAdd(W, s); });
}
catch (err) { }
});
SSW.added[key] = W.sswN || 0;
if (window.console && (W.sswN || 0) > n0)
console.log("[ssw] " + key + ": " + ((W.sswN || 0) - n0) + " more things made solid (" + (W.sswN || 0) + " in all)");
}, 2500);
}
];
});
