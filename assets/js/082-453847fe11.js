/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BAKE = { chunks: {}, queue: [], ready: false, cell: 260, bigCell: 1100, lamps: [], pools: [], lod: false, lodMin: 1.6, lodNear: 170, instCell: 400,
checkAt: 0, cullAt: 0, started: false, off: false };
function bakeSkipObject(o, g) {
if (!g || g.userData.drives || g.userData.nmGone)
return true;
if (o.noBake)
return true;
if (o.wild || (typeof CREATURE !== "undefined" && CREATURE[o.archetype]))
return true;
var d = KIT[o.archetype];
if (!d)
return true;
if (d.cat === "being" || d.cat === "vehicle")
return true;
if (typeof isHidden === "function" && isHidden(o))
return true;
if (typeof ROADGOING !== "undefined" && ROADGOING[o.archetype])
return true;
return false;
}
function bakeBig(o) {
var d = KIT[o.archetype];
if (!d)
return false;
var s = (o.attrs && o.attrs.s) || 1;
return Math.max(d.size[0], d.size[1], d.size[2]) * s > 40;
}
function bakeChunkKey(o) {
if (bakeBig(o))
return "B" + Math.floor(o.x / BAKE.bigCell) + "," + Math.floor(o.z / BAKE.bigCell);
return "S" + Math.floor(o.x / BAKE.cell) + "," + Math.floor(o.z / BAKE.cell);
}
function bakeAnimatedSet(g) {
var run = g.userData.anim;
if (!run)
return null;
var nodes = [];
g.traverse(function (n) { nodes.push(n); });
function snap() {
return nodes.map(function (n) {
var mt = n.material && !Array.isArray(n.material) ? n.material : null;
return [n.position.x, n.position.y, n.position.z, n.rotation.x, n.rotation.y, n.rotation.z, n.scale.x, n.scale.y, n.scale.z, n.visible ? 1 : 0,
mt && mt.color ? mt.color.getHex() : -1, mt && mt.emissive ? mt.emissive.getHex() : -1, mt ? mt.opacity : -1,
mt && mt.map ? mt.map.offset.x + mt.map.offset.y * 7 : -1].join(",");
});
}
var a = snap();
try {
run(1.37, 0.11);
run(3.91, 0.13);
run(7.7, 0.2);
}
catch (e) {
return "all";
}
var bb = snap(), moving = new Set();
for (var i = 0; i < nodes.length; i++)
if (a[i] !== bb[i]) {
if (nodes[i] === g)
return "all";
nodes[i].traverse(function (c) { moving.add(c); });
var mt = nodes[i].material;
if (mt)
nodes.forEach(function (n) { if (n.material === mt)
moving.add(n); });
}
return moving;
}
function bakeable(m) {
if (!m.isMesh || m.isSkinnedMesh)
return false;
if (m.isInstancedMesh && m.count > 400)
return false;
var mt = m.material;
if (!mt || Array.isArray(mt))
return false;
if (mt.map && typeof SIGN_TEX !== "undefined" && bakeIsSign(mt.map))
return false;
if (!(mt.isMeshLambertMaterial || mt.isMeshBasicMaterial || mt.isMeshPhongMaterial || mt.isMeshStandardMaterial || mt.isMeshToonMaterial))
return false;
if (mt.vertexColors || mt.alphaMap)
return false;
if (mt.envMap && !(typeof GLASS_ENV !== "undefined" && GLASS_ENV.tex && mt.envMap === GLASS_ENV.tex))
return false;
var ge = m.geometry;
if (!ge || !ge.isBufferGeometry || !ge.attributes.position)
return false;
if (ge.morphAttributes && Object.keys(ge.morphAttributes).length)
return false;
return true;
}
var BAKE_SIGNS = null, BAKE_SIGNN = -1;
function bakeIsSign(t) {
var keys = Object.keys(SIGN_TEX);
if (!BAKE_SIGNS || BAKE_SIGNN !== keys.length) {
BAKE_SIGNS = new Set(keys.map(function (k) { return SIGN_TEX[k]; }));
BAKE_SIGNN = keys.length;
}
return BAKE_SIGNS.has(t);
}
var BAKE_IMG = new WeakMap(), BAKE_IMGN = 0, BAKE_CANON = {};
function bakeMoving(t) {
var L = [typeof atlWater !== "undefined" ? atlWater : [], typeof atlFalls !== "undefined" ? atlFalls : []];
for (var j = 0; j < 2; j++)
for (var i = 0; i < L[j].length; i++)
if (L[j][i].tex === t)
return { list: L[j], e: L[j][i], kind: j ? "f" : "w" };
return null;
}
function bakeTexKey(t) {
if (!t)
return "";
if (!t.image)
return t.uuid;
var id = BAKE_IMG.get(t.image);
if (!id) {
id = "i" + (++BAKE_IMGN);
BAKE_IMG.set(t.image, id);
}
var mv = bakeMoving(t);
return (mv ? "mv" + mv.kind + mv.e.speed + "/" : "") + id + "/" + t.wrapS + "/" + t.wrapT + "/" + t.magFilter + "/" + t.minFilter + "/" + t.flipY;
}
function bakeCanon(t) {
var k = bakeTexKey(t);
if (k === t.uuid)
return t;
var c = BAKE_CANON[k];
if (!c) {
c = t.clone();
c.repeat.set(1, 1);
c.offset.set(0, 0);
c.rotation = 0;
c.center.set(0, 0);
c.matrixAutoUpdate = true;
c.needsUpdate = true;
BAKE_CANON[k] = c;
var mv = bakeMoving(t);
if (mv && mv.e.tex !== c)
mv.list.push({ tex: c, speed: mv.e.speed });
}
return c;
}
function bakeMatKey(mt, special) {
return [special || "", mt.type, mt.transparent ? 1 : 0, mt.transparent ? Math.round(mt.opacity * 100) : 100, mt.side,
mt.depthWrite ? 1 : 0, bakeTexKey(mt.map), mt.emissive ? mt.emissive.getHex() : "",
mt.shininess !== undefined ? Math.round(mt.shininess) : "", mt.specular ? mt.specular.getHex() : "",
mt.flatShading ? 1 : 0, mt.blending, mt.polygonOffset ? 1 : 0, mt.wireframe ? 1 : 0, mt.envMap ? "env" : ""].join("|");
}
function bakeOwnHook(m, mt) {
if (m.userData)
delete m.userData.wind;
if (mt.userData && mt.userData.toon && typeof TOON !== "undefined" && TOON) {
m.onBeforeCompile = TOON.hook;
m.userData.toon = 1;
}
}
var BAKE_ENVMATS = new Set();
function bakeMakeMaterial(mt) {
var m = mt.clone();
bakeOwnHook(m, mt);
if (m.envMap) {
BAKE_ENVMATS.add(m);
m.addEventListener("dispose", function () { BAKE_ENVMATS.delete(m); });
}
if (m.color)
m.color.setHex(0xFFFFFF);
m.vertexColors = true;
m.needsUpdate = true;
return m;
}
function bakeDropArray() { this.array = null; }
function bakeLetGo(bg) {
Object.keys(bg.attributes).forEach(function (k) { bg.attributes[k].onUpload(bakeDropArray); });
if (bg.index)
bg.index.onUpload(bakeDropArray);
}
function bakeMesh(G, parts, origin, key, lod) {
var v = new THREE.Vector3(), nm = new THREE.Matrix3(), col = new THREE.Color(), rad = 0, verts = 0, nidx = 0;
parts.forEach(function (P) { var pc = P.ge.attributes.position.count; verts += pc; nidx += P.ge.index ? P.ge.index.count : pc; });
var pos = new Float32Array(verts * 3), nor = new Int8Array(verts * 3), clr = new Uint8Array(verts * 3);
var uvs = G.uv ? new Float32Array(verts * 2) : null;
var idx = verts > 65535 ? new Uint32Array(nidx) : new Uint16Array(nidx);
var vo = 0, io = 0;
var canon = G.mat.map ? bakeCanon(G.mat.map) : null, tile = canon && canon !== G.mat.map;
parts.forEach(function (P) {
var ge = P.ge, pa = ge.attributes.position, na = ge.attributes.normal, ua = ge.attributes.uv, ia = ge.index;
var um = null;
if (tile && P.map) {
if (P.map.matrixAutoUpdate)
P.map.updateMatrix();
um = P.map.matrix.elements;
}
nm.getNormalMatrix(P.mat);
col.setHex(P.col);
var cr = Math.round(col.r * 255), cg = Math.round(col.g * 255), cb = Math.round(col.b * 255);
var flip = P.mat.determinant() < 0;
for (var i = 0; i < pa.count; i++) {
v.fromBufferAttribute(pa, i).applyMatrix4(P.mat).sub(origin);
pos[(vo + i) * 3] = v.x;
pos[(vo + i) * 3 + 1] = v.y;
pos[(vo + i) * 3 + 2] = v.z;
if (v.x * v.x + v.z * v.z > rad)
rad = v.x * v.x + v.z * v.z;
if (na) {
v.fromBufferAttribute(na, i).applyMatrix3(nm).normalize();
nor[(vo + i) * 3] = Math.round(v.x * 127);
nor[(vo + i) * 3 + 1] = Math.round(v.y * 127);
nor[(vo + i) * 3 + 2] = Math.round(v.z * 127);
}
clr[(vo + i) * 3] = cr;
clr[(vo + i) * 3 + 1] = cg;
clr[(vo + i) * 3 + 2] = cb;
if (uvs && ua) {
var tu = ua.getX(i), tv = ua.getY(i);
if (um) {
var u2 = um[0] * tu + um[3] * tv + um[6];
tv = um[1] * tu + um[4] * tv + um[7];
tu = u2;
}
uvs[(vo + i) * 2] = tu;
uvs[(vo + i) * 2 + 1] = tv;
}
}
if (ia) {
for (var j = 0; j < ia.count; j += 3) {
var a = ia.getX(j) + vo, b = ia.getX(j + 1) + vo, c = ia.getX(j + 2) + vo;
if (flip) {
idx[io++] = a;
idx[io++] = c;
idx[io++] = b;
}
else {
idx[io++] = a;
idx[io++] = b;
idx[io++] = c;
}
}
}
else {
for (var q = 0; q < pa.count; q += 3) {
if (flip) {
idx[io++] = vo + q;
idx[io++] = vo + q + 2;
idx[io++] = vo + q + 1;
}
else {
idx[io++] = vo + q;
idx[io++] = vo + q + 1;
idx[io++] = vo + q + 2;
}
}
}
vo += pa.count;
});
var bg = new THREE.BufferGeometry();
bg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
bg.setAttribute("normal", new THREE.BufferAttribute(nor, 3, true));
bg.setAttribute("color", new THREE.BufferAttribute(clr, 3, true));
if (uvs)
bg.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
bg.setIndex(new THREE.BufferAttribute(io === idx.length ? idx : idx.slice(0, io), 1));
bg.computeBoundingSphere();
bg.computeBoundingBox();
if (!G.mat.wireframe)
bakeLetGo(bg);
var mat = bakeMakeMaterial(G.mat);
if (tile)
mat.map = canon;
var mesh = new THREE.Mesh(bg, mat);
mesh.position.copy(origin);
mesh.castShadow = G.cast;
mesh.receiveShadow = !G.mat.transparent;
mesh.matrixAutoUpdate = false;
mesh.updateMatrix();
mesh.raycast = function () { };
mesh.userData.bakedChunk = key;
mesh.userData.lod = lod || "both";
if (G.mat.transparent)
mesh.renderOrder = 1;
if (G.special === "lamp")
BAKE.lamps.push(mat);
if (G.special === "pool")
BAKE.pools.push(mat);
scene.add(mesh);
return { mesh: mesh, rad: rad };
}
var BAKE_AVG = new WeakMap();
function bakeAvgSource(img) {
try {
var k = img && img.__pht;
if (k && typeof PHOTO_TEX !== "undefined" && PHOTO_TEX.done[k])
return PHOTO_TEX.done[k];
if (img && img.getContext && !img.__pht)
for (var kind in TEXCACHE) {
var T = TEXCACHE[kind];
if (T && T.image === img && PAINT[kind]) {
var c = document.createElement("canvas");
c.width = c.height = 64;
var x = c.getContext("2d", { willReadFrequently: true });
PAINT[kind](x, 64, rng(hash(kind)));
return c;
}
}
}
catch (e) { }
return img;
}
var BAKE_AVG_ASK = new Map(), BAKE_AVG_W = null, BAKE_AVG_N = 0, BAKE_AVG_IDS = {};
function bakeAvgWorker() {
if (BAKE_AVG_W !== null)
return BAKE_AVG_W;
BAKE_AVG_W = false;
try {
if (typeof Worker === "undefined" || typeof OffscreenCanvas === "undefined" || typeof createImageBitmap !== "function" || typeof Blob === "undefined" || !window.URL)
return false;
var src = "onmessage=function(e){var v=-1,b=e.data.b;try{var c=new OffscreenCanvas(8,8),x=c.getContext('2d',{willReadFrequently:true});" +
"x.drawImage(b,0,0,8,8);var d=x.getImageData(0,0,8,8).data,r=0,g=0,u=0;for(var i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];u+=d[i+2];}" +
"v=(Math.round(r/64)<<16)|(Math.round(g/64)<<8)|Math.round(u/64);}catch(err){}try{b.close();}catch(err){}postMessage({id:e.data.id,c:v});};";
var w = new Worker(URL.createObjectURL(new Blob([src], { type: "application/javascript" })));
w.onmessage = function (e) {
var img = BAKE_AVG_IDS[e.data.id];
delete BAKE_AVG_IDS[e.data.id];
if (!img)
return;
BAKE_AVG_ASK.delete(img);
if (e.data.c >= 0)
BAKE_AVG.set(img, e.data.c);
};
w.onerror = function () { BAKE_AVG_W = false; BAKE_AVG_ASK.clear(); BAKE_AVG_IDS = {}; };
BAKE_AVG_W = w;
}
catch (e) {
BAKE_AVG_W = false;
}
return BAKE_AVG_W;
}
var BAKE_AVG_SEEN = new WeakSet();
function bakeAvgAsk(t) {
var img = t && t.image;
if (!img || !img.getContext || BAKE_AVG_SEEN.has(img) || BAKE_AVG.has(img) || BAKE_AVG_ASK.has(img))
return;
if (!(img.width > 0 && img.height > 0))
return;
BAKE_AVG_SEEN.add(img);
if (img.__pht)
return;
for (var kind in TEXCACHE) {
var T = TEXCACHE[kind];
if (T && T.image === img && PAINT[kind])
return;
}
var w = bakeAvgWorker();
if (!w)
return;
var id = ++BAKE_AVG_N;
BAKE_AVG_ASK.set(img, performance.now());
BAKE_AVG_IDS[id] = img;
createImageBitmap(img, { colorSpaceConversion: "none" }).then(function (b) { try {
w.postMessage({ id: id, b: b }, [b]);
}
catch (e) {
delete BAKE_AVG_IDS[id];
BAKE_AVG_ASK.delete(img);
} }, function () { delete BAKE_AVG_IDS[id]; BAKE_AVG_ASK.delete(img); });
}
function bakeAvgAskAll(g) {
if (!g || !g.traverse || !bakeAvgWorker())
return;
g.traverse(function (m) {
var ms = m.material;
if (!ms)
return;
if (!Array.isArray(ms))
ms = [ms];
for (var i = 0; i < ms.length; i++) {
var mt = ms[i];
if (mt && mt.map)
bakeAvgAsk(mt.map);
}
});
}
function bakeAvgReady(key) {
var ch = typeof BAKE !== "undefined" && BAKE.chunks[key];
if (ch && ch.ids && bakeAvgWorker())
ch.ids.forEach(function (id) { var g = meshes[id]; if (g)
bakeAvgAskAll(g); });
return !bakeAvgBusy();
}
function bakeAvgBusy() {
if (!BAKE_AVG_ASK.size)
return false;
var now = performance.now(), busy = false;
BAKE_AVG_ASK.forEach(function (t0, img) { if (now - t0 < 4000)
busy = true;
else
BAKE_AVG_ASK.delete(img); });
return busy;
}
function bakeAvgColour(t) {
if (!t || !t.image)
return 0xFFFFFF;
var c = BAKE_AVG.get(t.image);
if (c !== undefined)
return c;
c = 0xFFFFFF;
try {
var cv = document.createElement("canvas");
cv.width = cv.height = 8;
var x = cv.getContext("2d", { willReadFrequently: true });
x.drawImage(bakeAvgSource(t.image), 0, 0, 8, 8);
var d = x.getImageData(0, 0, 8, 8).data, r = 0, g = 0, b = 0;
for (var i = 0; i < d.length; i += 4) {
r += d[i];
g += d[i + 1];
b += d[i + 2];
}
c = (Math.round(r / 64) << 16) | (Math.round(g / 64) << 8) | Math.round(b / 64);
}
catch (e) { }
BAKE_AVG.set(t.image, c);
return c;
}
function bakePressGroups(groups, origin, key, nolod) {
var out = [], rad = 0, lod = BAKE.lod && !nolod, coarse = {}, col = new THREE.Color(), tint = new THREE.Color();
Object.keys(groups).forEach(function (k) {
var G = groups[k];
var m = bakeMesh(G, G.parts, origin, key, lod ? "near" : "both");
out.push(m.mesh);
if (m.rad > rad)
rad = m.rad;
if (!lod)
return;
var mt = G.mat, ck = [G.special || "", mt.transparent ? Math.round(mt.opacity * 100) : "", mt.side, mt.depthWrite ? 1 : 0, mt.blending, mt.emissive ? mt.emissive.getHex() : "", mt.userData && mt.userData.toon ? 1 : 0, mt.type].join("|");
var C = coarse[ck] || (coarse[ck] = { mat: null, special: G.special, parts: [], verts: 0, idx: 0, cast: false, uv: false });
if (!C.mat) {
C.mat = mt.clone();
C.mat.map = null;
bakeOwnHook(C.mat, mt);
}
var avg = mt.map ? bakeAvgColour(mt.map) : null;
G.parts.forEach(function (P) {
if (P.sz < BAKE.lodMin || (P.ge.userData && P.ge.userData.leaves))
return;
var c = P.col;
if (avg !== null) {
col.setHex(P.col);
tint.setHex(avg);
col.multiply(tint);
c = col.getHex();
}
C.parts.push({ ge: P.ge, mat: P.mat, col: c, sz: P.sz, map: null });
});
if (G.cast)
C.cast = true;
});
Object.keys(coarse).forEach(function (ck) {
var C = coarse[ck];
if (!C.parts.length)
return;
out.push(bakeMesh(C, C.parts, origin, key, "far").mesh);
});
return { meshes: out, rad: rad };
}
function bakePress(list, cx, cz, key) {
var groups = {}, origin = new THREE.Vector3(cx, 0, cz);
list.forEach(function (it) {
var m = it.m, mt = m.material, k = bakeMatKey(mt, it.special);
var G = groups[k] || (groups[k] = { mat: mt, special: it.special, parts: [], verts: 0, idx: 0, cast: false, uv: !!mt.map });
bakeAddParts(G, m);
});
return bakePressGroups(groups, origin, key, true);
}
function bakeAddParts(G, m) {
var mt = m.material, ge = m.geometry, pc = ge.attributes.position.count, base = mt.color ? mt.color.getHex() : 0xFFFFFF;
if (!ge.boundingSphere)
ge.computeBoundingSphere();
var gr = ge.boundingSphere.radius;
if (m.isInstancedMesh) {
var im = new THREE.Matrix4(), c = new THREE.Color();
for (var i = 0; i < m.count; i++) {
m.getMatrixAt(i, im);
var col = base;
if (m.instanceColor) {
m.getColorAt(i, c);
if (mt.color)
c.multiply(mt.color);
col = c.getHex();
}
var pm = m.matrixWorld.clone().multiply(im);
G.parts.push({ ge: ge, mat: pm, col: col, sz: gr * pm.getMaxScaleOnAxis(), map: mt.map });
G.verts += pc;
G.idx += ge.index ? ge.index.count : pc;
}
}
else {
G.parts.push({ ge: ge, mat: m.matrixWorld.clone(), col: base, sz: gr * m.matrixWorld.getMaxScaleOnAxis(), map: mt.map });
G.verts += pc;
G.idx += ge.index ? ge.index.count : pc;
}
if (m.castShadow)
G.cast = true;
}
function bakeChunk(key) {
var ch = BAKE.chunks[key];
if (!ch)
return;
bakeUnbake(key, true);
var groups = {}, members = [], big = key.charAt(0) === "B";
var cx = 0, cz = 0, n = 0;
ch.ids.forEach(function (id) {
var o = specById(id), g = meshes[id];
if (!o || !g || bakeSkipObject(o, g))
return;
cx += o.x;
cz += o.z;
n++;
});
if (!n) {
ch.meshes = [];
ch.members = [];
return;
}
cx /= n;
cz /= n;
ch.cx = cx;
ch.cz = cz;
var origin = new THREE.Vector3(cx, 0, cz), v = new THREE.Vector3(), nm = new THREE.Matrix3(), col = new THREE.Color();
var rad = 0;
ch.ids.forEach(function (id) {
var o = specById(id), g = meshes[id];
if (!o || !g || bakeSkipObject(o, g))
return;
var moving = bakeAnimatedSet(g);
if (moving === "all")
return;
var lampSet = g.userData.lamps ? new Set(g.userData.lamps) : null;
var poolMat = g.userData.pool ? g.userData.pool.material : null;
g.updateMatrixWorld(true);
var took = [];
g.traverse(function (m) {
if (!bakeable(m) || m.userData.baked || (moving && moving.has(m)))
return;
var p = m, shown = true;
while (p && p !== g) {
if (!p.visible) {
shown = false;
break;
}
p = p.parent;
}
if (!shown)
return;
var mt = m.material, special = (lampSet && lampSet.has(mt)) ? "lamp" : (mt === poolMat ? "pool" : "");
var k = bakeMatKey(mt, special);
var G = groups[k] || (groups[k] = { mat: mt, special: special, parts: [], verts: 0, idx: 0, cast: false, uv: !!mt.map });
bakeAddParts(G, m);
took.push(m);
});
if (took.length)
members.push({ id: id, g: g, x: g.position.x, z: g.position.z, ry: g.rotation.y, y: g.position.y, took: took });
});
var pr = bakePressGroups(groups, origin, key, false);
var out = pr.meshes;
rad = pr.rad;
members.forEach(function (M) { M.took.forEach(function (m) { m.visible = false; m.userData.baked = key; }); });
ch.meshes = out;
ch.members = members;
ch.big = big;
ch.rad = Math.sqrt(rad);
ch.shown = null;
}
function bakeTerrain() {
if (BAKE.terrain) {
BAKE.terrain.forEach(function (m) { scene.remove(m); m.geometry.dispose(); m.material.dispose(); });
(BAKE.terrainTook || []).forEach(function (m) { m.visible = true; m.userData.baked = null; });
}
(BAKE.inst || []).forEach(function (c) { if (c.m.parent)
c.m.parent.remove(c.m); });
(BAKE.instTook || []).forEach(function (m) { m.visible = true; m.userData.baked = null; });
BAKE.terrain = [];
BAKE.terrainTook = [];
BAKE.inst = [];
BAKE.instTook = [];
BAKE.terrainOf = atlGroup;
BAKE.tq = [];
var G = atlGroup;
if (!G)
return;
var lite = (typeof LITE !== "undefined" && LITE);
var many = [];
G.traverse(function (m) { if (m.isInstancedMesh && m.count > (lite ? 40 : 400) && !m.userData.baked && m.visible)
many.push(m); });
many.forEach(function (m) { BAKE.tq.push(function () { if (atlGroup === G)
bakeSplitInstanced(m); }); });
BAKE.tq.push(function () {
if (atlGroup !== G)
return;
G.updateMatrixWorld(true);
var cells = {}, v = new THREE.Vector3(), TC = BAKE.cell * (lite ? 2 : 1);
G.traverse(function (m) {
if (!bakeable(m) || m.userData.baked || !m.visible)
return;
v.setFromMatrixPosition(m.matrixWorld);
var k = Math.floor(v.x / TC) + "," + Math.floor(v.z / TC);
(cells[k] || (cells[k] = [])).push(m);
});
var helpings = [];
Object.keys(cells).forEach(function (k) {
var cur = [], vs = 0;
cells[k].forEach(function (m) { cur.push(m); vs += m.geometry.attributes.position.count * (m.isInstancedMesh ? m.count : 1); if (vs > 60000) {
helpings.push([k, cur]);
cur = [];
vs = 0;
} });
if (cur.length)
helpings.push([k, cur]);
});
helpings.forEach(function (hp) {
var k = hp[0], part = hp[1];
BAKE.tq.push(function () {
if (atlGroup !== G)
return;
var list = part, cx = 0, cz = 0;
list.forEach(function (m) { v.setFromMatrixPosition(m.matrixWorld); cx += v.x; cz += v.z; });
if (lite)
list.forEach(function (m) { m.geometry = bakeLighterShared(m.geometry); });
var made = bakePress(list.map(function (m) { return { m: m, special: "" }; }), cx / list.length, cz / list.length, "T" + k);
made.meshes.forEach(function (mm) { BAKE.terrain.push(mm); });
list.forEach(function (m) {
m.visible = false;
m.userData.baked = "T" + k;
if (lite && typeof liteRelease === "function") {
if (m.parent)
m.parent.remove(m);
var tmp = new THREE.Object3D();
tmp.add(m);
liteRelease(tmp);
}
else
BAKE.terrainTook.push(m);
});
BAKE.cullAt = 0;
});
});
});
}
function bakeLighter(geo) {
var p = geo.parameters;
if (!p || geo.userData.lighter)
return geo;
var g = null;
if (geo.type === "SphereGeometry" && p.widthSegments > 6)
g = new THREE.SphereGeometry(p.radius, 6, 5);
else if (geo.type === "IcosahedronGeometry" && p.detail > 0)
g = new THREE.IcosahedronGeometry(p.radius, 0);
if (!g)
return geo;
g.userData.lighter = 1;
return g;
}
var BAKE_LIGHT = new WeakMap();
function bakeLighterShared(geo) { var g = BAKE_LIGHT.get(geo); if (!g) {
g = bakeLighter(geo);
BAKE_LIGHT.set(geo, g);
} return g; }
function bakeSplitInstanced(m) {
if (!m.parent)
return;
var lite = (typeof LITE !== "undefined" && LITE);
var C = lite ? (BAKE.instCell || 400) : 900, cells = {}, M = new THREE.Matrix4(), v = new THREE.Vector3(), geo = lite ? bakeLighter(m.geometry) : m.geometry;
var gs = geo.userData.ownSphere || (geo.boundingSphere && geo !== m.geometry ? geo.boundingSphere : null);
if (!gs) {
var bb = new THREE.Box3().setFromBufferAttribute(geo.attributes.position);
gs = bb.getBoundingSphere(new THREE.Sphere());
}
var gr = gs.radius, gc = gs.center;
for (var i = 0; i < m.count; i++) {
m.getMatrixAt(i, M);
v.copy(gc).applyMatrix4(M);
var k = Math.floor(v.x / C) + "," + Math.floor(v.z / C);
(cells[k] || (cells[k] = [])).push(i);
}
m.updateMatrixWorld(true);
var c = new THREE.Color(), W = new THREE.Vector3();
Object.keys(cells).forEach(function (k) {
var list = cells[k], px = new THREE.BufferGeometry();
Object.keys(geo.attributes).forEach(function (a) { px.setAttribute(a, geo.attributes[a]); });
if (geo.index)
px.setIndex(geo.index);
var im = new THREE.InstancedMesh(px, m.material, list.length), ctr = new THREE.Vector3(), rad = 0;
list.forEach(function (i, j) {
m.getMatrixAt(i, M);
im.setMatrixAt(j, M);
if (m.instanceColor) {
m.getColorAt(i, c);
im.setColorAt(j, c);
}
ctr.add(v.copy(gc).applyMatrix4(M));
});
ctr.divideScalar(list.length);
list.forEach(function (i) { m.getMatrixAt(i, M); rad = Math.max(rad, v.copy(gc).applyMatrix4(M).distanceTo(ctr) + gr * M.getMaxScaleOnAxis()); });
px.boundingSphere = new THREE.Sphere(ctr.clone(), rad);
im.position.copy(m.position);
im.quaternion.copy(m.quaternion);
im.scale.copy(m.scale);
im.castShadow = m.castShadow;
im.receiveShadow = m.receiveShadow;
im.renderOrder = m.renderOrder;
im.userData.baked = "I";
m.parent.add(im);
im.updateMatrixWorld(true);
W.copy(ctr).applyMatrix4(im.matrixWorld);
BAKE.inst.push({ m: im, x: W.x, z: W.z, r: rad });
});
m.visible = false;
m.userData.baked = "I";
BAKE.instTook.push(m);
}
function bakeFogReach() {
var f = (typeof scene !== "undefined" && scene) ? scene.fog : null;
if (!f)
return Infinity;
if (f.isFogExp2)
return f.density > 0 ? 2.5 / f.density : Infinity;
return f.far || Infinity;
}
function bakeUnbake(key, quiet) {
var ch = BAKE.chunks[key];
if (!ch)
return;
(ch.meshes || []).forEach(function (m) {
scene.remove(m);
var i = BAKE.lamps.indexOf(m.material);
if (i > -1)
BAKE.lamps.splice(i, 1);
i = BAKE.pools.indexOf(m.material);
if (i > -1)
BAKE.pools.splice(i, 1);
m.geometry.dispose();
m.material.dispose();
});
(ch.members || []).forEach(function (M) { M.took.forEach(function (m) { if (m.userData.baked === key) {
m.visible = true;
m.userData.baked = null;
} }); });
ch.meshes = [];
ch.members = [];
}
function bakeStart() {
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
if (!r)
return;
Object.keys(BAKE.chunks).forEach(function (k) { bakeUnbake(k, true); });
BAKE.chunks = {};
BAKE.queue = [];
store.objects.forEach(function (o) {
if (!o.city || o.realm !== r.id)
return;
o._bakeKnown = 1;
var k = bakeChunkKey(o);
(BAKE.chunks[k] || (BAKE.chunks[k] = { ids: [], meshes: [], members: [] })).ids.push(o.id);
});
var P = camera.position;
BAKE.queue = Object.keys(BAKE.chunks).sort(function (a, b) {
function d(k) {
var s = k.slice(1).split(","), c = k.charAt(0) === "B" ? BAKE.bigCell : BAKE.cell;
var x = (+s[0] + 0.5) * c, z = (+s[1] + 0.5) * c;
return (x - P.x) * (x - P.x) + (z - P.z) * (z - P.z);
}
return d(a) - d(b);
});
BAKE.started = true;
BAKE.ready = false;
}
function bakeTick(dt) {
if (BAKE.off || typeof scene === "undefined" || !scene || typeof ATLC === "undefined" || !ATLC)
return;
var r = somnucorRealm();
if (!r) {
if (BAKE.started) {
Object.keys(BAKE.chunks).forEach(function (k) { bakeUnbake(k, true); });
BAKE.chunks = {};
BAKE.started = false;
}
return;
}
if (typeof ATL_JOB !== "undefined" && ATL_JOB)
return;
if (!BAKE.started)
bakeStart();
if ((typeof bakeAvgBusy === "function" && bakeAvgBusy()) ||
(typeof atlMeshQueue !== "undefined" && atlMeshQueue.length && !(typeof ATLQ !== "undefined" && ATLQ.press === 0))) {
bakeCull(r, dt);
return;
}
if (typeof atlGroup !== "undefined" && BAKE.terrainOf !== atlGroup)
bakeTerrain();
var t0 = performance.now();
var bud = BAKE.budget || 12;
while (BAKE.tq && BAKE.tq.length && performance.now() - t0 < bud) {
BAKE.tq.shift()();
}
while (BAKE.queue.length && performance.now() - t0 < bud) {
if (typeof bakeAvgReady === "function" && !bakeAvgReady(BAKE.queue[0]))
break;
bakeChunk(BAKE.queue.shift());
}
if (!BAKE.queue.length && !(BAKE.tq && BAKE.tq.length) && !BAKE.ready) {
BAKE.ready = true;
}
BAKE.checkAt -= dt;
if (BAKE.checkAt <= 0) {
BAKE.checkAt = 1.5;
Object.keys(BAKE.chunks).forEach(function (k) {
var ch = BAKE.chunks[k];
if (!ch.members || !ch.members.length)
return;
for (var i = 0; i < ch.members.length; i++) {
var M = ch.members[i], g = meshes[M.id];
if (g !== M.g || Math.abs(g.position.x - M.x) > 0.01 || Math.abs(g.position.z - M.z) > 0.01 || Math.abs(g.position.y - M.y) > 0.01 || Math.abs(g.rotation.y - M.ry) > 0.001 || (g.userData.nmGone)) {
if (BAKE.queue.indexOf(k) < 0)
BAKE.queue.unshift(k);
break;
}
}
});
store.objects.forEach(function (o) {
if (!o.city || o.realm !== r.id || o._bakeKnown)
return;
o._bakeKnown = 1;
var k = bakeChunkKey(o), ch = BAKE.chunks[k] || (BAKE.chunks[k] = { ids: [], meshes: [], members: [] });
if (ch.ids.indexOf(o.id) < 0) {
ch.ids.push(o.id);
if (BAKE.queue.indexOf(k) < 0)
BAKE.queue.push(k);
}
});
}
bakeCull(r, dt);
}
function bakeCull(r, dt) {
var P = camera.position, inCity = (store.here || 0) === r.id && !store.inside;
var L = BAKE.lastAt, jumped = !L || L.inCity !== inCity || Math.abs(L.x - P.x) + Math.abs(L.z - P.z) > 40;
BAKE.cullAt -= dt;
if (BAKE.cullAt > 0 && !jumped)
return;
BAKE.cullAt = 0.3;
BAKE.lastAt = { x: P.x, z: P.z, inCity: inCity };
var fogR = bakeFogReach(), K = window.BAKE_REACH || 1, lite = (typeof LITE !== "undefined" && LITE);
var smallR = Math.min(1100 * K * (lite ? 0.6 : 1), fogR), bigR = 3400 * K * (lite ? 0.65 : 1), landR = Math.min(1400 * K, fogR);
BAKE.reach = { small: smallR, big: bigR, land: landR, fog: fogR };
var nearR = BAKE.lodNear;
Object.keys(BAKE.chunks).forEach(function (k) {
var ch = BAKE.chunks[k];
if (!ch.meshes || !ch.meshes.length)
return;
var reach = (ch.big ? bigR : smallR) + (ch.rad || 0);
var dx = ch.cx - P.x, dz = ch.cz - P.z, d2 = dx * dx + dz * dz, show = inCity && d2 < reach * reach;
var nr = nearR + ((typeof LCITY !== "undefined" && LCITY.on && ch.big) ? Math.min(ch.rad || 0, 120) : (ch.rad || 0));
var near = d2 < nr * nr && ch.lite !== "far", st = show ? (near ? "near" : "far") : "";
if (st !== ch.shown) {
ch.shown = st;
ch.meshes.forEach(function (m) { var l = m.userData.lod; m.visible = !!st && (l === "both" || l === st); });
}
});
(BAKE.terrain || []).forEach(function (m) {
var dx = m.position.x - P.x, dz = m.position.z - P.z, rr = landR + (m.geometry.boundingSphere ? m.geometry.boundingSphere.radius : 0);
m.visible = inCity && dx * dx + dz * dz < rr * rr;
});
(BAKE.inst || []).forEach(function (c) {
var dx = c.x - P.x, dz = c.z - P.z, rr = Math.min(landR, smallR) + c.r;
c.m.visible = inCity && dx * dx + dz * dz < rr * rr;
});
}
