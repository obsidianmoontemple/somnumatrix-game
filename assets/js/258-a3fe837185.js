/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PCS = { on: true, kept: 0, seen: -1, spare: [], lights: 0, want: 0, skipped: 0, placed: 0, sizes: [4, 8, 12, 16, 24, 32, 48, 64] };
(function () {
if (typeof THREE === "undefined" || !THREE.Scene || !THREE.Object3D)
return;
var O = THREE.Object3D.prototype, base = O.updateMatrixWorld, full = false;
if (THREE.Scene.prototype.pcsWalk)
return;
function walk(o, force, shown) {
if (o.matrixAutoUpdate)
o.updateMatrix();
if (o.matrixWorldNeedsUpdate || force) {
if (o.parent === null)
o.matrixWorld.copy(o.matrix);
else
o.matrixWorld.multiplyMatrices(o.parent.matrixWorld, o.matrix);
o.matrixWorldNeedsUpdate = false;
force = true;
}
o.pcsPlaced = 1;
var ch = o.children;
for (var i = 0, n = ch.length; i < n; i++) {
var c = ch[i];
if (c.visible === false && c.pcsPlaced === 1 && !full) {
var me = c.matrix.elements, cp = c.position;
if (!c.matrixAutoUpdate || (me[12] === cp.x && me[13] === cp.y && me[14] === cp.z)) {
if (force)
c.matrixWorldNeedsUpdate = true;
PCS.skipped++;
continue;
}
}
var cs = shown && c.visible !== false;
if (cs && c.isPointLight && !c.pcsSpare)
PCS.lights++;
if (c.updateMatrixWorld !== base) {
c.updateMatrixWorld(force);
markPlaced(c);
continue;
}
PCS.placed++;
walk(c, force, cs);
}
}
function markPlaced(o) { o.pcsPlaced = 1; var ch = o.children; for (var i = 0; i < ch.length; i++)
markPlaced(ch[i]); }
function spareLight() {
var l = new THREE.PointLight(0x000000, 0, 0.001, 2);
l.castShadow = false;
l.pcsSpare = true;
l.visible = false;
l.position.set(0, -10000, 0);
l.name = "pcs-spare";
return l;
}
function settleLights(sc) {
var n = PCS.lights, want = n;
if (n >= 0) {
want = PCS.sizes[PCS.sizes.length - 1];
for (var i = 0; i < PCS.sizes.length; i++)
if (PCS.sizes[i] >= n) {
want = PCS.sizes[i];
break;
}
if (n > want)
want = n;
}
var need = want - n;
while (PCS.spare.length < need) {
var l = spareLight();
PCS.spare.push(l);
}
for (var j = 0; j < PCS.spare.length; j++) {
var s = PCS.spare[j], show = j < need;
if (show && s.parent !== sc) {
sc.add(s);
s.updateMatrixWorld(true);
s.pcsPlaced = 1;
}
s.visible = show;
}
PCS.want = want;
}
function keepShaders() {
var r = (typeof renderer !== "undefined") && renderer, L = r && r.info && r.info.programs;
if (!L || L.length === PCS.seen)
return;
for (var i = 0; i < L.length; i++) {
var g = L[i];
if (g && !g.pcsKept && PCS.kept < 600) {
g.pcsKept = 1;
g.usedTimes++;
PCS.kept++;
}
}
PCS.seen = L.length;
}
THREE.Scene.prototype.pcsWalk = true;
THREE.Scene.prototype.updateMatrixWorld = function (force) {
if (!PCS.on || arguments.length)
return base.apply(this, arguments);
PCS.lights = 0;
PCS.skipped = 0;
PCS.placed = 0;
full = (typeof PCU !== "undefined" && PCU && PCU.on) || (typeof GFX_PHONE !== "undefined" && GFX_PHONE) || (typeof LITE !== "undefined" && LITE);
try {
walk(this, false, this.visible !== false);
}
catch (e) {
PCS.on = false;
if (window.console)
console.warn("pc-smooth:", e);
return base.call(this, true);
}
if (typeof scene !== "undefined" && this === scene) {
settleLights(this);
keepShaders();
}
return this;
};
})();
var PCS_NN = { at: -1e9, objs: null, len: -1, cell: 64, grid: {} };
(function () {
if (typeof nearestNamed !== "function" || typeof nearestFew !== "function")
return;
var nn = nearestNamed, nf = nearestFew, memo = {}, mAt = 0, mLen = -1;
function file() {
var G = PCS_NN, now = performance.now(), L = (typeof store !== "undefined" && store && store.objects) || null;
if (!L)
return false;
if (now - G.at < 2000 && L === G.objs && L.length === G.len)
return true;
G.at = now;
G.objs = L;
G.len = L.length;
G.grid = {};
for (var i = 0; i < L.length; i++) {
var o = L[i];
if (!o || !o.name || o.filler || typeof o.x !== "number" || typeof o.z !== "number")
continue;
var k = Math.floor(o.x / G.cell) + "," + Math.floor(o.z / G.cell);
(G.grid[k] || (G.grid[k] = [])).push(i);
}
return true;
}
nearestNamed = function (x, z, range) {
if (typeof x !== "number" || typeof z !== "number" || !isFinite(x) || !isFinite(z) || !file())
return nn.apply(this, arguments);
var G = PCS_NN, L = G.objs, R = range || 120, bd = R * R, best = null, bi = -1;
var c0 = Math.floor((x - R) / G.cell), c1 = Math.floor((x + R) / G.cell), r0 = Math.floor((z - R) / G.cell), r1 = Math.floor((z + R) / G.cell);
if ((c1 - c0 + 1) * (r1 - r0 + 1) > 400)
return nn.apply(this, arguments);
for (var cx = c0; cx <= c1; cx++)
for (var cz = r0; cz <= r1; cz++) {
var A = G.grid[cx + "," + cz];
if (!A)
continue;
for (var n = 0; n < A.length; n++) {
var i = A[n], o = L[i];
if (!o || !o.name || o.filler)
continue;
var dx = o.x - x, dz = o.z - z, d = dx * dx + dz * dz;
if (d < bd || (d === bd && best && i < bi)) {
bd = d;
best = o;
bi = i;
}
}
}
return best;
};
nearestFew = function (x, z, test, n) {
var now = performance.now(), L = (typeof store !== "undefined" && store && store.objects) || null;
if (now - mAt > 4000 || !L || L.length !== mLen) {
memo = {};
mAt = now;
mLen = L ? L.length : -1;
}
var k = x + "," + z + "," + n + "," + Object.keys(test || {}).join("|"), v = memo[k];
if (v === undefined) {
v = nf.apply(this, arguments);
memo[k] = v;
}
return v.slice();
};
})();
