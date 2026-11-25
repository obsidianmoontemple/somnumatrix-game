/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var RLF = { v: null, t: 0, capes: [] };
function rlFitMats() { return __ZC(197, 0, this, arguments, new.target); }
function rlC(A, i, k) { return k === 0 ? A.getX(i) : k === 1 ? A.getY(i) : k === 2 ? A.getZ(i) : A.getW(i); }
function rlFitVerts(root) { return __ZC(197, 1, this, arguments, new.target); }
function rlFitFrame(bone, body) {
var G = new THREE.Group();
bone.add(G);
bone.updateMatrixWorld(true);
var bq = bone.getWorldQuaternion(new THREE.Quaternion()), oq = body.getWorldQuaternion(new THREE.Quaternion());
G.quaternion.copy(bq.invert().multiply(oq));
var bs = bone.getWorldScale(new THREE.Vector3()), os = body.getWorldScale(new THREE.Vector3());
G.scale.set(os.x / bs.x, os.y / bs.y, os.z / bs.z);
G.updateMatrixWorld(true);
return G;
}
function rlFitLocal(G, verts, test) { var a = []; verts.forEach(function (q) { if (test(q.b))
a.push(G.worldToLocal(q.p.clone())); }); return a; }
function rlFitRadii(pts, O, ax, u, w, L, t0, t1, NS, NA, minR) {
var R = [], i, j;
for (i = 0; i < NS; i++) {
R.push([]);
for (j = 0; j < NA; j++)
R[i].push(0);
}
var d = new THREE.Vector3();
pts.forEach(function (p) {
d.copy(p).sub(O);
var t = d.dot(ax) / L;
if (t < t0 - 0.08 || t > t1 + 0.08)
return;
var s = Math.round((t - t0) / (t1 - t0) * (NS - 1));
if (s < 0)
s = 0;
if (s > NS - 1)
s = NS - 1;
var x = d.dot(u), y = d.dot(w), r = Math.hypot(x, y), a = Math.atan2(y, x);
var b = Math.round((a / (Math.PI * 2) + 1) * NA) % NA;
for (var e = -1; e <= 1; e++) {
var bb = (b + e + NA) % NA;
if (r > R[s][bb])
R[s][bb] = r;
}
});
for (i = 0; i < NS; i++) {
var mx = 0;
for (j = 0; j < NA; j++)
mx = Math.max(mx, R[i][j]);
for (j = 0; j < NA; j++)
if (R[i][j] < mx * 0.35)
R[i][j] = Math.max(R[i][j], mx * 0.8);
}
for (i = 0; i < NS; i++) {
var mx2 = 0;
for (j = 0; j < NA; j++)
mx2 = Math.max(mx2, R[i][j]);
if (mx2 === 0)
for (j = 0; j < NA; j++)
R[i][j] = -1;
}
for (i = 0; i < NS; i++)
if (R[i][0] < 0) {
var a2 = null;
for (var q = 1; q < NS; q++) {
if (i - q >= 0 && R[i - q][0] >= 0) {
a2 = R[i - q];
break;
}
if (i + q < NS && R[i + q][0] >= 0) {
a2 = R[i + q];
break;
}
}
R[i] = a2 ? a2.slice() : R[i].map(function () { return minR; });
}
for (var pass = 0; pass < 2; pass++) {
R = R.map(function (row) { return row.map(function (r, j) { return Math.max(r, (row[(j + NA - 1) % NA] + r * 2 + row[(j + 1) % NA]) / 4); }); });
R = R.map(function (row, i2) { return row.map(function (r, j) { var a = R[Math.max(0, i2 - 1)][j], b = R[Math.min(NS - 1, i2 + 1)][j]; return Math.max(r * 0.92, (a + r * 2 + b) / 4); }); });
}
for (i = 0; i < NS; i++)
for (j = 0; j < NA; j++)
R[i][j] = Math.max(R[i][j], minR);
return R;
}
function rlFitShell(O, ax, u, w, L, t0, t1, R, gap, prof, arc) {
var NS = R.length, NA = R[0].length, closed = !arc, na = closed ? NA : Math.max(2, Math.round((arc[1] - arc[0]) / (Math.PI * 2) * NA) + 1);
var pos = [], uv = [], idx = [], P = new THREE.Vector3();
function rad(i, a) { var f = (a / (Math.PI * 2)) * NA, j = Math.floor(f), k = f - j; j = ((j % NA) + NA) % NA; return R[i][j] * (1 - k) + R[i][(j + 1) % NA] * k; }
for (var i = 0; i < NS; i++) {
var t = t0 + (t1 - t0) * i / (NS - 1);
for (var j = 0; j <= (closed ? NA : na - 1); j++) {
var a = closed ? j / NA * Math.PI * 2 : arc[0] + (arc[1] - arc[0]) * j / (na - 1);
var r = rad(i, (a + Math.PI * 4) % (Math.PI * 2)) + gap + (prof ? prof(t, a) : 0);
P.copy(O).addScaledVector(ax, t * L).addScaledVector(u, Math.cos(a) * r).addScaledVector(w, Math.sin(a) * r);
pos.push(P.x, P.y, P.z);
uv.push(closed ? j / NA * 3 : j / (na - 1) * 1.5, i / (NS - 1) * 1.2);
}
}
var row = (closed ? NA : na - 1) + 1;
for (var i2 = 0; i2 < NS - 1; i2++)
for (var j2 = 0; j2 < row - 1; j2++) {
var a0 = i2 * row + j2, b0 = a0 + 1, c0 = a0 + row, d0 = c0 + 1;
idx.push(a0, c0, b0, b0, c0, d0);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
g.userData.ring = function (t, extra, a0, a1) { var pts = []; var i = Math.round((t - t0) / (t1 - t0) * (NS - 1)); i = Math.max(0, Math.min(NS - 1, i)); var n = 48; for (var k = 0; k <= n; k++) {
var a = (a0 != null ? a0 + (a1 - a0) * k / n : k / n * Math.PI * 2);
var r = rad(i, (a + Math.PI * 4) % (Math.PI * 2)) + gap + (prof ? prof(t, a) : 0) + extra;
pts.push(new THREE.Vector3().copy(O).addScaledVector(ax, t * L).addScaledVector(u, Math.cos(a) * r).addScaledVector(w, Math.sin(a) * r));
} return pts; };
return g;
}
function rlFitRim(pts, r, mat, closed) {
var c = new THREE.CatmullRomCurve3(pts, !!closed);
return new THREE.Mesh(new THREE.TubeGeometry(c, Math.max(24, pts.length * 2), r, 6, !!closed), mat);
}
function rlFitAxes(ax) { var up = Math.abs(ax.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(0, 0, 1); var u = new THREE.Vector3().crossVectors(ax, up).normalize(), w = new THREE.Vector3().crossVectors(ax, u).normalize(); return { u: u, w: w }; }
function rlFitChild(b, re) { for (var i = 0; i < b.children.length; i++) {
var c = b.children[i];
if (c.isBone && (!re || re.test(c.name)))
return c;
} for (var k = 0; k < b.children.length; k++)
if (b.children[k].isBone)
return b.children[k]; return null; }
function rlGemAt(G, M, pos, normal, s) { return __ZC(197, 2, this, arguments, new.target); }
function rlFitLimb(E, bones, body, verts, name, childRe, own, t0, t1, gap, prof, arc, M, mat, opt) { return __ZC(197, 3, this, arguments, new.target); }
function rlFitDress(E, keys) { return __ZC(197, 4, this, arguments, new.target); }
function rlFitTick(dt) {
RLF.t += dt;
try {
rlFitInHand();
}
catch (e) { }
for (var i = RLF.capes.length - 1; i >= 0; i--) {
var C = RLF.capes[i];
if (!C.pivot.parent || !C.pivot.parent.parent) {
RLF.capes.splice(i, 1);
continue;
}
var now = performance.now(), wp = C.pivot.getWorldPosition(RLF.v || (RLF.v = new THREE.Vector3()));
if (C.lt) {
var rdt = Math.max(0.001, (now - C.lt) / 1000), raw = Math.min(12, Math.hypot(wp.x - C.lx, wp.z - C.lz) / rdt);
if (raw > 11)
raw = 0;
C.spd = (C.spd || 0) + (raw - (C.spd || 0)) * Math.min(1, rdt * 4);
}
C.lt = now;
C.lx = wp.x;
C.lz = wp.z;
var spd = C.spd || 0, want = spd < 0.4 ? 0 : Math.min(0.4, spd * 0.045);
C.lean += (want - C.lean) * Math.min(1, dt * 3);
C.pivot.rotation.set(-C.lean, 0, 0);
try {
var GQ = C.pivot.parent.getWorldQuaternion(RLF.q0 || (RLF.q0 = new THREE.Quaternion())), fw = (RLF.v1 || (RLF.v1 = new THREE.Vector3())).set(0, 0, 1).applyQuaternion(GQ);
fw.y = 0;
if (fw.lengthSq() > 1e-6) {
var Dq = (RLF.q1 || (RLF.q1 = new THREE.Quaternion())).setFromAxisAngle(RLF.up || (RLF.up = new THREE.Vector3(0, 1, 0)), Math.atan2(fw.x, fw.z)).slerp(GQ, 0.15);
C.pivot.quaternion.copy(GQ).invert().multiply(Dq).multiply((RLF.q2 || (RLF.q2 = new THREE.Quaternion())).setFromAxisAngle(RLF.ax || (RLF.ax = new THREE.Vector3(1, 0, 0)), -C.lean));
}
}
catch (e) { }
if (C.E && C.E.d > 30)
continue;
var P = C.geo.attributes.position, b = C.base, n = (C.cols + 1);
for (var r = 1; r <= C.rows; r++) {
var f = r / C.rows;
for (var c = 0; c <= C.cols; c++) {
var k = (r * n + c), x = b[k * 3], z = b[k * 3 + 2], dx = x - C.cx, dz = z - C.cz, d = Math.hypot(dx, dz) || 1;
var s = Math.sin(RLF.t * (1.3 + spd * 0.25) + c * 0.55 + r * 0.35 + C.ph) * 0.018 * f * (1 + spd * 0.15);
P.setXYZ(k, x + dx / d * s, b[k * 3 + 1] + Math.abs(s) * 0.2, z + dz / d * s);
}
}
P.needsUpdate = true;
if ((C.n = (C.n || 0) + 1) % 6 === 0)
C.geo.computeVertexNormals();
}
}
(function () {
if (typeof hdfAttach !== "function")
return;
var ha = hdfAttach;
hdfAttach = function (E) {
var r = ha.apply(this, arguments);
try {
var keys = E && E.g && E.g.userData.rlKeys;
if (E.model && keys && keys.length && !E.rlFit) {
var F = rlFitDress(E, keys);
if (F && keys.indexOf("polecrown") >= 0) {
F.hatsHid = [];
(E.hats || []).forEach(function (m) { if (m.visible) {
m.visible = false;
F.hatsHid.push(m);
} });
}
if (F) {
E.rlFit = F;
F.capes.forEach(function (C) { C.E = E; RLF.capes.push(C); });
(E.g.userData.rlParts || []).forEach(function (o) { o.visible = false; });
}
}
}
catch (e) {
if (window.console)
console.warn("[relics]", e);
}
return r;
};
var hd = hdfDetach;
hdfDetach = function (E) {
try {
if (E && typeof meG !== "undefined" && E.g === meG && typeof carryMesh !== "undefined" && carryMesh && carryMesh.userData.inHand) {
var hG = carryMesh.userData.inHand;
if (hG.parent)
hG.parent.remove(hG);
carryMesh.userData.inHand = null;
if (carryMesh.parent)
carryMesh.parent.remove(carryMesh);
carryMesh.position.set(-0.3, 0.98, 0.3);
meG.children[0].add(carryMesh);
}
}
catch (e) { }
try {
if (E && E.rlFit) {
E.rlFit.made.forEach(function (G) { if (G.parent)
G.parent.remove(G); });
(E.rlFit.hatsHid || []).forEach(function (m) { m.visible = true; });
E.rlFit = null;
}
if (E && E.g)
(E.g.userData.rlParts || []).forEach(function (o) { o.visible = true; });
}
catch (e) { }
return hd.apply(this, arguments);
};
})();
function rlFitWeapon(key) { return __ZC(197, 5, this, arguments, new.target); }
(function () {
if (typeof RELICS === "undefined" || typeof HELD === "undefined")
return;
RELICS.forEach(function (r) { if (r.kind !== "weapon")
return; var k = "relic_" + r.key; HELD[k] = function () { var g = rlFitWeapon(r.key); g.userData.relicWeapon = r.key; return g; }; });
})();
function rlFitInHand() {
if (typeof carryMesh === "undefined" || !carryMesh || !carryMesh.userData.relicWeapon || carryMesh.userData.inHand)
return;
if (typeof meG === "undefined" || !meG || typeof HDF === "undefined")
return;
var E = null;
for (var i = 0; i < HDF.list.length; i++)
if (HDF.list[i].g === meG) {
E = HDF.list[i];
break;
}
if (!E || !E.model)
return;
rlPutInHand(E, carryMesh);
}
function rlPutInHand(E, mesh) { return __ZC(197, 6, this, arguments, new.target); }
(function () {
if (typeof dropCarried === "function") {
var dc = dropCarried;
dropCarried = function () { var cm = typeof carryMesh !== "undefined" ? carryMesh : null, G = cm && cm.userData.inHand; var r = dc.apply(this, arguments); if (G && G.parent)
G.parent.remove(G); return r; };
}
if (typeof showCarried === "function") {
var sc = showCarried;
showCarried = function () { var cm = typeof carryMesh !== "undefined" ? carryMesh : null, G = cm && cm.userData.inHand; if (G && G.parent)
G.parent.remove(G); return sc.apply(this, arguments); };
}
})();
function rlHeldNow() { if (typeof carrying === "undefined" || !carrying || typeof ARMS === "undefined")
return null; var A = ARMS[carrying.archetype]; return A && A.held && typeof HELD !== "undefined" && HELD[A.held] ? A.held : null; }
(function () {
if (typeof meLook === "function") {
var ml = meLook;
meLook = function () { var L = ml.apply(this, arguments); if (!RLF.pub)
return L; var h = rlHeldNow(); if (!h)
return L; var c = JSON.parse(JSON.stringify(L)); c.held = h; return c; };
}
if (typeof publishMyLook === "function") {
var pm = publishMyLook;
publishMyLook = function () { RLF.pub = true; try {
return pm.apply(this, arguments);
}
finally {
RLF.pub = false;
RLF.lastHeld = rlHeldNow();
} };
}
function heldChanged() { clearTimeout(RLF.pubT); RLF.pubT = setTimeout(function () { if (rlHeldNow() !== (RLF.lastHeld || null) && typeof publishMyLook === "function")
publishMyLook(); }, 400); }
["showCarried", "dropCarried"].forEach(function (n) { var f = window[n]; if (typeof f !== "function")
return; var w = function () { var r = f.apply(this, arguments); try {
heldChanged();
}
catch (e) { } return r; }; window[n] = w; });
if (typeof buildFigure === "function") {
var bf = buildFigure;
buildFigure = function (spec) {
var g = bf.apply(this, arguments);
try {
var h = spec && spec.look && spec.look.held;
if (g && h && /^presence_/.test(String(spec.id || "")) && HELD[h]) {
var m = HELD[h]();
m.position.set(-0.3, 0.98, 0.3);
g.children[0].add(m);
g.userData.heldMesh = m;
}
}
catch (e) { }
return g;
};
}
if (typeof hdfAttach === "function") {
var ha = hdfAttach;
hdfAttach = function (E) { var r = ha.apply(this, arguments); try {
var m = E && E.g && E.g.userData.heldMesh;
if (E.model && m && m.userData.relicWeapon && !m.userData.inHand)
rlPutInHand(E, m);
}
catch (e) { } return r; };
}
if (typeof hdfDetach === "function") {
var hd = hdfDetach;
hdfDetach = function (E) { try {
var m = E && E.g && E.g.userData.heldMesh;
if (m && m.userData.inHand) {
var G = m.userData.inHand;
if (G.parent)
G.parent.remove(G);
m.userData.inHand = null;
if (m.parent)
m.parent.remove(m);
m.position.set(-0.3, 0.98, 0.3);
E.g.children[0].add(m);
}
}
catch (e) { } return hd.apply(this, arguments); };
}
if (typeof myPlace === "function") {
var mp = myPlace;
myPlace = function () { try {
if (typeof WLD !== "undefined" && WLD.on && WLD.w && !store.inside) {
var P = camera.position;
return { place: "world:" + WLD.on, level: Math.max(0, Math.min(200, Math.round(P.y - 1.72))), x: P.x - WLD.w.base, z: P.z };
}
}
catch (e) { } return mp.apply(this, arguments); };
}
if (typeof presenceTick === "function") {
var pt = presenceTick;
presenceTick = function () { try {
var at = myPlace(), lp = presenceTick.lastPlace;
if (/^world:/.test(at.place) && lp && lp.indexOf(at.place + "#") === 0)
presenceTick.lastPlace = at.place + "#" + at.level;
}
catch (e) { } return pt.apply(this, arguments); };
}
if (typeof placeToWorld === "function") {
var pw = placeToWorld;
placeToWorld = function (row) {
var pl = row && row.place || "";
if (/^world:/.test(pl)) {
var key = pl.slice(6);
if (typeof WLD === "undefined" || WLD.on !== key || !WLD.w || store.inside)
return null;
var x = WLD.w.base + row.x, z = row.z, lv = row.level || 0, y = (typeof supportAt === "function") ? supportAt(x, z, lv + 1.2) : lv;
return { x: x, y: y, z: z };
}
return pw.apply(this, arguments);
};
}
})();
