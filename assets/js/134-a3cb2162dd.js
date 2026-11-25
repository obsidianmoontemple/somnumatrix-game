/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
function perfNearTown(z) { return Math.sqrt(z[0] * z[0] + z[1] * z[1]) - z[2] - 90 < 1450; }
(function () {
if (typeof flatZones !== "function")
return;
var fz = flatZones;
flatZones = function () { return fz.apply(this, arguments).filter(perfNearTown); };
if (typeof landSignature === "function") {
landSignature = function () {
var n = 0;
store.objects.forEach(function (o) {
if (o.filler)
return;
var d = KIT[o.archetype];
if (!d) {
return;
}
var s = (o.attrs && o.attrs.s) || 1;
if (perfNearTown([o.x, o.z, Math.max(d.size[0], d.size[2]) * 0.6 * s + 10]))
n++;
});
return n + "|" + (store.streets || []).length + "|" + landOpt("hills");
};
}
})();
var PERF_IDX = { arr: null, n: 0, at: new Map(), dirty: true };
(function () {
if (typeof specById !== "function")
return;
specById = function (id) {
var A = store.objects, X = PERF_IDX;
if (X.dirty || X.arr !== A || A.length < X.n) {
X.at = new Map();
X.arr = A;
X.n = 0;
X.dirty = false;
}
for (; X.n < A.length; X.n++) {
var o = A[X.n];
if (o && !X.at.has(o.id))
X.at.set(o.id, { i: X.n, o: o });
}
var e = X.at.get(id);
if (e && A[e.i] === e.o && e.o.id === id)
return e.o;
for (var k = 0; k < A.length; k++)
if (A[k].id === id) {
X.dirty = true;
return A[k];
}
if (e)
X.dirty = true;
return null;
};
})();
var PERF_GRID_OFF = false, PERF_Q = null, PERF_WB = { arr: null, t: 0, here: null }, PERF_WG = { src: null, cells: null }, PERF_NONE = [], PERF_WCELL = 16;
function perfWallGrid(ws) {
if (PERF_WG.src === ws)
return PERF_WG;
var cells = {}, C = PERF_WCELL;
for (var i = 0; i < ws.length; i++) {
var w = ws[i], e;
if (w.r !== undefined)
e = w.r + 0.5;
else if (w.lair)
e = (typeof LAIR_R !== "undefined" ? LAIR_R : 60) * (w.s || 1) + 4;
else
e = (w.hw || 0) + (w.hd || 0) + 1.5;
var x0 = Math.floor((w.x - e) / C), x1 = Math.floor((w.x + e) / C), z0 = Math.floor((w.z - e) / C), z1 = Math.floor((w.z + e) / C);
if ((x1 - x0 + 1) * (z1 - z0 + 1) > 4000) {
x0 = x1 = z0 = z1 = null;
(cells.all || (cells.all = [])).push(w);
continue;
}
for (var cx = x0; cx <= x1; cx++)
for (var cz = z0; cz <= z1; cz++) {
var k = cx + "," + cz;
(cells[k] || (cells[k] = [])).push(w);
}
}
if (cells.all)
Object.keys(cells).forEach(function (k) { if (k !== "all")
cells[k] = cells[k].concat(cells.all); });
PERF_WG = { src: ws, cells: cells };
return PERF_WG;
}
(function () {
if (typeof solidWalls !== "function" || typeof blockedAt !== "function")
return;
var sw = solidWalls;
solidWalls = function () {
var now = performance.now(), here = (typeof store !== "undefined" && store.here) || 0;
if (typeof wallsAt !== "undefined" && PERF_WB.here !== here) {
wallsAt = -1;
PERF_WB.here = here;
}
if (typeof wallsAt !== "undefined" && wallsAt > 0 && WALLS === PERF_WB.arr && WALLS.length > 2000 && now - PERF_WB.t < 2500 && (typeof INT === "undefined" || !INT))
wallsAt = now - 1;
var ws = sw.apply(this, arguments);
if (typeof WALLS !== "undefined" && WALLS !== PERF_WB.arr) {
PERF_WB.arr = WALLS;
PERF_WB.t = now;
}
if (!PERF_Q || ws.length < 48 || PERF_GRID_OFF)
return ws;
var G = perfWallGrid(ws), k = Math.floor(PERF_Q.x / PERF_WCELL) + "," + Math.floor(PERF_Q.z / PERF_WCELL);
return G.cells[k] || G.cells.all || PERF_NONE;
};
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (PERF_Q)
return ba.apply(this, arguments);
PERF_Q = { x: x, z: z };
try {
return ba.apply(this, arguments);
}
finally {
PERF_Q = null;
}
};
})();
(function () {
if (typeof findPath !== "function" || typeof NAV_CELL === "undefined")
return;
findPath = function (ax, az, bx, bz) {
var goal = freeNear(bx, bz);
bx = goal.x;
bz = goal.z;
if (lineClear(ax, az, bx, bz))
return [{ x: bx, z: bz }];
var m = 40, x0 = Math.min(ax, bx) - m, z0 = Math.min(az, bz) - m, x1 = Math.max(ax, bx) + m, z1 = Math.max(az, bz) + m;
var W = Math.ceil((x1 - x0) / NAV_CELL), H = Math.ceil((z1 - z0) / NAV_CELL);
if (W * H > NAV_MAXCELLS) {
var k = Math.sqrt(W * H / NAV_MAXCELLS);
W = Math.floor(W / k);
H = Math.floor(H / k);
}
var cw = (x1 - x0) / W, ch = (z1 - z0) / H;
function cx(i) { return x0 + (i + .5) * cw; }
function cz(j) { return z0 + (j + .5) * ch; }
var blocked = new Uint8Array(W * H), known = new Uint8Array(W * H);
function isB(i, j) { var q = j * W + i; if (!known[q]) {
known[q] = 1;
blocked[q] = navBlocked(cx(i), cz(j)) ? 1 : 0;
} return blocked[q]; }
var si = Math.min(W - 1, Math.max(0, Math.floor((ax - x0) / cw))), sj = Math.min(H - 1, Math.max(0, Math.floor((az - z0) / ch)));
var gi = Math.min(W - 1, Math.max(0, Math.floor((bx - x0) / cw))), gj = Math.min(H - 1, Math.max(0, Math.floor((bz - z0) / ch)));
var g = new Float32Array(W * H).fill(1e9), from = new Int32Array(W * H).fill(-1), shut = new Uint8Array(W * H);
var hf = [], hc = [];
function push(f, c) {
var i = hf.length;
hf.push(f);
hc.push(c);
while (i > 0) {
var p = (i - 1) >> 1;
if (hf[p] <= hf[i])
break;
var tf = hf[p];
hf[p] = hf[i];
hf[i] = tf;
var tc = hc[p];
hc[p] = hc[i];
hc[i] = tc;
i = p;
}
}
function pop() {
var c = hc[0], lf = hf.pop(), lc = hc.pop();
if (hf.length) {
hf[0] = lf;
hc[0] = lc;
var i = 0, n = hf.length;
for (;;) {
var l = i * 2 + 1, r = l + 1, s = i;
if (l < n && hf[l] < hf[s])
s = l;
if (r < n && hf[r] < hf[s])
s = r;
if (s === i)
break;
var tf = hf[s];
hf[s] = hf[i];
hf[i] = tf;
var tc = hc[s];
hc[s] = hc[i];
hc[i] = tc;
i = s;
}
}
return c;
}
push(0, sj * W + si);
g[sj * W + si] = 0;
var steps = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, 1.414], [1, -1, 1.414], [-1, 1, 1.414], [-1, -1, 1.414]], found = false, guard = 0;
while (hf.length && guard++ < 40000) {
var ck = pop();
if (shut[ck])
continue;
shut[ck] = 1;
var i = ck % W, j = (ck - i) / W;
if (i === gi && j === gj) {
found = true;
break;
}
for (var s = 0; s < 8; s++) {
var ni = i + steps[s][0], nj = j + steps[s][1];
if (ni < 0 || nj < 0 || ni >= W || nj >= H)
continue;
var nk = nj * W + ni;
if (shut[nk] || isB(ni, nj))
continue;
if (steps[s][2] > 1 && (isB(i + steps[s][0], j) || isB(i, j + steps[s][1])))
continue;
var ng = g[ck] + steps[s][2];
if (ng < g[nk]) {
g[nk] = ng;
from[nk] = ck;
push(ng + Math.hypot(ni - gi, nj - gj), nk);
}
}
}
if (!found)
return [{ x: bx, z: bz }];
var cells = [], k2 = gj * W + gi;
while (k2 !== -1) {
cells.push({ x: cx(k2 % W), z: cz(Math.floor(k2 / W)) });
k2 = from[k2];
}
cells.reverse();
cells[cells.length - 1] = { x: bx, z: bz };
var out = [], at = { x: ax, z: az }, idx = 0;
while (idx < cells.length - 1) {
var far = idx + 1;
for (var t = cells.length - 1; t > idx; t--)
if (lineClear(at.x, at.z, cells[t].x, cells[t].z)) {
far = t;
break;
}
out.push(cells[far]);
at = cells[far];
idx = far;
}
if (!out.length)
out.push({ x: bx, z: bz });
return out;
};
})();
var PERF_JOINING = false;
(function () {
if (typeof joinSomnucor !== "function")
return;
var js = joinSomnucor;
joinSomnucor = function () {
var self = this, args = arguments;
if (typeof atlBuildCityAsync !== "function" || PERF_JOINING || (typeof somnucorRealm === "function" && somnucorRealm() && somnucorRealm().atlBuild))
return js.apply(self, args);
PERF_JOINING = true;
atlProgressLine(0);
setTimeout(function () {
atlBuildCityAsync(function () { PERF_JOINING = false; js.apply(self, args); }, function (f) { atlProgressLine(f); });
}, 30);
};
})();
(function () {
if (typeof realmGround === "function") {
var rg = realmGround;
realmGround = function (r) { if (typeof ATL_JOB !== "undefined" && ATL_JOB && ATL_JOB.staged && ATL_JOB.r && r && ATL_JOB.r.id === r.id)
return; return rg.apply(this, arguments); };
}
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function () { if (typeof ATL_JOB !== "undefined" && ATL_JOB)
return; return tt.apply(this, arguments); };
}
if (typeof atlDrainQueue === "function") {
var dq = atlDrainQueue;
atlDrainQueue = function () { if (typeof ATL_JOB !== "undefined" && ATL_JOB)
return; return dq.apply(this, arguments); };
}
})();
var PERF_CITYSPEC = 0, PERF_PAINT = new WeakMap(), PERF_BOARDS = { list: [], at: 0, near: 90, far: 160, blank: {} };
function perfBlank(w, h, col) {
var k = w + "x" + h + col;
if (PERF_BOARDS.blank[k])
return PERF_BOARDS.blank[k];
var c = document.createElement("canvas");
c.width = 4;
c.height = 4;
var x = c.getContext("2d");
x.fillStyle = col;
x.fillRect(0, 0, 4, 4);
return (PERF_BOARDS.blank[k] = c);
}
(function () {
if (typeof boardTexture !== "function")
return;
var bt = boardTexture, st = (typeof signTexture === "function") ? signTexture : null;
function lazy(orig, key, args, w, h, col) {
if (SIGN_TEX[key])
return SIGN_TEX[key];
var t = new THREE.CanvasTexture(perfBlank(w, h, col));
t.anisotropy = 4;
PERF_PAINT.set(t, { orig: orig, key: key, args: args, painted: false });
SIGN_TEX[key] = t;
PERF_BOARDS.list.push(t);
return t;
}
function inCityBuild() { return PERF_CITYSPEC > 0 || (typeof ATL_JOB !== "undefined" && ATL_JOB) || (typeof PERF_JOINING !== "undefined" && PERF_JOINING) || (typeof atlMeshQueue !== "undefined" && atlMeshQueue.length > 0); }
if (typeof addMesh === "function") {
var am = addMesh;
addMesh = function (spec) {
var c = !!(spec && spec.city);
if (c)
PERF_CITYSPEC++;
try {
return am.apply(this, arguments);
}
finally {
if (c) {
PERF_CITYSPEC--;
try {
if (typeof bakeAvgAskAll === "function" && spec.id && meshes[spec.id])
bakeAvgAskAll(meshes[spec.id]);
}
catch (e) { }
}
}
};
}
boardTexture = function (title, note) {
if (!inCityBuild())
return bt.apply(this, arguments);
return lazy(bt, "b|" + title + "|" + (note || ""), [title, note], 384, 160, "#EAE2CC");
};
if (st)
signTexture = function (text) {
if (!inCityBuild())
return st.apply(this, arguments);
return lazy(st, "s|" + text, [text], 512, 128, "#15161B");
};
})();
function perfPaint(t, on) {
var P = PERF_PAINT.get(t);
if (!P || P.painted === on)
return;
if (on) {
var keep = SIGN_TEX[P.key];
delete SIGN_TEX[P.key];
var real = P.orig.apply(null, P.args);
SIGN_TEX[P.key] = keep;
t.image = real.image;
real.image = null;
real.dispose();
}
else {
t.image = perfBlank(t.image.width, t.image.height, P.key.charAt(0) === "b" ? "#EAE2CC" : "#15161B");
}
P.painted = on;
t.needsUpdate = true;
}
function perfBoardsTick() {
if (!PERF_BOARDS.list.length || typeof camera === "undefined" || !camera)
return;
var now = performance.now();
if (now - PERF_BOARDS.at < 400)
return;
PERF_BOARDS.at = now;
var P = camera.position, near = new Set(), N = PERF_BOARDS.near * PERF_BOARDS.near, F = PERF_BOARDS.far * PERF_BOARDS.far;
var keepSet = new Set();
store.objects.forEach(function (o) {
if (!o.sign && !o.label && !o.name)
return;
var g = meshes[o.id];
if (!g)
return;
var dx = o.x - P.x, dz = o.z - P.z, d2 = dx * dx + dz * dz;
if (d2 > F)
return;
g.traverse(function (m) {
var mt = m.material;
if (!mt || Array.isArray(mt) || !mt.map || !PERF_PAINT.has(mt.map))
return;
if (d2 < N && !store.inside)
near.add(mt.map);
else
keepSet.add(mt.map);
});
});
PERF_BOARDS.list.forEach(function (t) {
if (near.has(t))
perfPaint(t, true);
else if (!keepSet.has(t))
perfPaint(t, false);
});
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
perfBoardsTick();
}
catch (e) { } };
})();
var PERF_FOG = { on: false, sub: false, subPc: true, x: 0, y: 0, z: 0, r: Infinity, k2: 1e6 };
var INSTB_V = new THREE.Vector3(), INSTB_M = new THREE.Matrix4();
function instBounds(m) {
var u = m.userData, v = m.instanceMatrix.version, now = performance.now(), c = u.instB;
if (c && c.v === v && c.n === m.count)
return c;
if (c && now - c.at < 1000) {
c.moves = (c.moves || 0) + 1;
if (c.moves > 3) {
c.moving = true;
c.v = v;
c.n = m.count;
c.at = now;
return c;
}
}
else if (c)
c.moves = 0;
var g = m.geometry;
if (!g.boundingSphere)
g.computeBoundingSphere();
if (!g.boundingBox)
g.computeBoundingBox();
var gs = g.boundingSphere, gb = g.boundingBox, box = new THREE.Box3(), pts = [], n = m.count;
for (var i = 0; i < n; i++) {
m.getMatrixAt(i, INSTB_M);
var e = INSTB_M.elements;
if (e[0] * e[0] + e[1] * e[1] + e[2] * e[2] < 1e-6 && e[4] * e[4] + e[5] * e[5] + e[6] * e[6] < 1e-6)
continue;
INSTB_V.copy(gs.center).applyMatrix4(INSTB_M);
var r = gs.radius * INSTB_M.getMaxScaleOnAxis();
box.expandByPoint(INSTB_V.clone().addScalar(r));
box.expandByPoint(INSTB_V.clone().addScalar(-r));
}
if (box.isEmpty())
box.copy(gb);
var sph = new THREE.Sphere();
box.getBoundingSphere(sph);
c = u.instB = { v: v, n: n, at: now, box: box, sphere: sph, moves: c ? c.moves : 0, moving: c ? c.moving : false };
return c;
}
(function () {
if (typeof THREE === "undefined" || !THREE.Frustum)
return;
var io = THREE.Frustum.prototype.intersectsObject, S = new THREE.Sphere();
THREE.Frustum.prototype.intersectsObject = function (o) {
if (o.isInstancedMesh) {
var ib = instBounds(o);
if (ib.moving)
return true;
S.copy(ib.sphere).applyMatrix4(o.matrixWorld);
if (PERF_FOG.on) {
var mt0 = Array.isArray(o.material) ? o.material[0] : o.material;
if (mt0 && mt0.fog !== false) {
var dx0 = S.center.x - PERF_FOG.x, dz0 = S.center.z - PERF_FOG.z, R0 = PERF_FOG.r + S.radius;
if (dx0 * dx0 + dz0 * dz0 > R0 * R0)
return false;
}
}
return this.intersectsSphere(S);
}
if ((PERF_FOG.on || PERF_FOG.sub) && o.geometry && o.material) {
var mt = Array.isArray(o.material) ? o.material[0] : o.material;
if (mt && mt.fog !== false) {
var g = o.geometry;
if (!g.boundingSphere)
g.computeBoundingSphere();
if (g.boundingSphere) {
S.copy(g.boundingSphere).applyMatrix4(o.matrixWorld);
var dx = S.center.x - PERF_FOG.x, dz = S.center.z - PERF_FOG.z, R = PERF_FOG.r + S.radius, d2 = dx * dx + dz * dz;
if (PERF_FOG.on && d2 > R * R)
return false;
var dy = S.center.y - PERF_FOG.y;
d2 += dy * dy;
if (S.radius * S.radius * PERF_FOG.k2 < d2 * 0.6)
return false;
}
}
}
return io.call(this, o);
};
})();
function perfFogTick() {
var lite = (typeof LITE !== "undefined" && LITE);
PERF_FOG.sub = false;
if (typeof camera === "undefined" || !camera) {
PERF_FOG.on = false;
return;
}
if (!lite || typeof bakeFogReach !== "function") {
PERF_FOG.on = false;
if (!PERF_FOG.subPc || (renderer.xr && renderer.xr.isPresenting))
return;
PERF_FOG.sub = true;
PERF_FOG.r = Infinity;
}
else {
PERF_FOG.on = true;
PERF_FOG.r = bakeFogReach();
}
PERF_FOG.x = camera.position.x;
PERF_FOG.y = camera.position.y;
PERF_FOG.z = camera.position.z;
var k = innerHeight * renderer.getPixelRatio() / (2 * Math.tan((camera.fov || 70) * Math.PI / 360));
if (renderer.xr && renderer.xr.isPresenting) {
var bl = null;
try {
bl = renderer.xr.getSession().renderState.baseLayer;
}
catch (e) { }
k = ((bl && bl.framebufferHeight) || 1600) / (2 * Math.tan(48 * Math.PI / 180)) / (PERF_FOG.xrPx || 3);
}
PERF_FOG.k2 = k * k;
}
(function () {
if (typeof gfxRender !== "function")
return;
var gr = gfxRender;
gfxRender = function () { try {
perfFogTick();
}
catch (e) { } try {
return gr.apply(this, arguments);
}
finally {
PERF_FOG.sub = false;
} };
})();
function perfCompact(g) {
var nodes = [];
g.traverse(function (n) { nodes.push(n); });
function snap() { return nodes.map(function (n) { return [n.position.x, n.position.y, n.position.z, n.rotation.x, n.rotation.y, n.rotation.z, n.scale.x, n.scale.y, n.scale.z, n.visible ? 1 : 0].join(","); }); }
var moving = new Set(), run = g.userData.anim;
if (run) {
var pose = g.userData.pose, speed = g.userData.speed, a = snap();
try {
[undefined, "fly", "walk", "stand", "perch"].forEach(function (p, k) {
g.userData.pose = p;
g.userData.speed = k % 2 ? 3 : 0;
run(1.37 + k, 0.11);
run(3.91 + k, 0.13);
run(7.7 + k, 0.2);
var b = snap();
nodes.forEach(function (n, i) { if (a[i] !== b[i])
moving.add(n); });
});
}
catch (e) {
return g;
}
g.userData.pose = pose;
g.userData.speed = speed;
try {
run(0, 0);
}
catch (e) { }
}
var buckets = new Map();
nodes.forEach(function (n) {
if (!n.isMesh || n.isInstancedMesh || n.isSkinnedMesh || n.children.length || moving.has(n) || !n.parent || !n.visible)
return;
if (Array.isArray(n.material) || Object.keys(n.userData).length)
return;
var ge = n.geometry;
if (!ge || !ge.isBufferGeometry || !ge.attributes.position || !ge.attributes.normal)
return;
if (ge.morphAttributes && Object.keys(ge.morphAttributes).length)
return;
var k = n.parent.id + "|" + n.material.id + "|" + (ge.attributes.uv ? 1 : 0) + "|" + n.castShadow + "|" + n.receiveShadow + "|" + n.renderOrder;
var l = buckets.get(k);
if (!l)
buckets.set(k, l = []);
l.push(n);
});
var v = new THREE.Vector3(), nm = new THREE.Matrix3();
buckets.forEach(function (list) {
if (list.length < 2)
return;
var verts = 0, nidx = 0, uv = !!list[0].geometry.attributes.uv;
list.forEach(function (n) { var ge = n.geometry; n.updateMatrix(); verts += ge.attributes.position.count; nidx += ge.index ? ge.index.count : ge.attributes.position.count; });
var pos = new Float32Array(verts * 3), nor = new Float32Array(verts * 3), uvs = uv ? new Float32Array(verts * 2) : null, idx = verts > 65535 ? new Uint32Array(nidx) : new Uint16Array(nidx), vo = 0, io = 0;
list.forEach(function (n) {
var ge = n.geometry, pa = ge.attributes.position, na = ge.attributes.normal, ua = ge.attributes.uv, ia = ge.index, flip = n.matrix.determinant() < 0;
nm.getNormalMatrix(n.matrix);
for (var i = 0; i < pa.count; i++) {
v.fromBufferAttribute(pa, i).applyMatrix4(n.matrix);
pos[(vo + i) * 3] = v.x;
pos[(vo + i) * 3 + 1] = v.y;
pos[(vo + i) * 3 + 2] = v.z;
v.fromBufferAttribute(na, i).applyMatrix3(nm).normalize();
nor[(vo + i) * 3] = v.x;
nor[(vo + i) * 3 + 1] = v.y;
nor[(vo + i) * 3 + 2] = v.z;
if (uvs) {
uvs[(vo + i) * 2] = ua.getX(i);
uvs[(vo + i) * 2 + 1] = ua.getY(i);
}
}
var cnt = ia ? ia.count : pa.count;
for (var j = 0; j < cnt; j += 3) {
var p0 = (ia ? ia.getX(j) : j) + vo, p1 = (ia ? ia.getX(j + 1) : j + 1) + vo, p2 = (ia ? ia.getX(j + 2) : j + 2) + vo;
idx[io++] = p0;
if (flip) {
idx[io++] = p2;
idx[io++] = p1;
}
else {
idx[io++] = p1;
idx[io++] = p2;
}
}
vo += pa.count;
});
var bg = new THREE.BufferGeometry();
bg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
bg.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
if (uvs)
bg.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
bg.setIndex(new THREE.BufferAttribute(idx, 1));
bg.computeBoundingSphere();
var f = list[0], m = new THREE.Mesh(bg, f.material);
m.castShadow = f.castShadow;
m.receiveShadow = f.receiveShadow;
m.renderOrder = f.renderOrder;
f.parent.add(m);
list.forEach(function (n) { n.parent.remove(n); });
});
return g;
}
(function () {
if (typeof LITE === "undefined" || !LITE || typeof buildMountDragon !== "function")
return;
var bd = buildMountDragon;
buildMountDragon = function () { var g = bd.apply(this, arguments); try {
perfCompact(g);
}
catch (e) {
if (window.console)
console.warn("compact:", e);
} return g; };
})();
