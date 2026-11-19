/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BAKE = { chunks: {}, queue: [], ready: false, cell: 260, bigCell: 1100, lamps: [], pools: [], lod: false, lodMin: 1.6, lodNear: 170, instCell: 400,
checkAt: 0, cullAt: 0, started: false, off: false };
function bakeSkipObject(o, g) { return __ZC(81, 0, this, arguments, new.target); }
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
function bakeAnimatedSet(g) { return __ZC(81, 1, this, arguments, new.target); }
function bakeable(m) { return __ZC(81, 2, this, arguments, new.target); }
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
function bakeCanon(t) { return __ZC(81, 3, this, arguments, new.target); }
function bakeMatKey(mt, special) { return __ZC(81, 4, this, arguments, new.target); }
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
function bakeMesh(G, parts, origin, key, lod) { return __ZC(81, 5, this, arguments, new.target); }
var BAKE_AVG = new WeakMap();
function bakeAvgSource(img) { return __ZC(81, 6, this, arguments, new.target); }
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
function bakeAvgColour(t) { return __ZC(81, 7, this, arguments, new.target); }
function bakePressGroups(groups, origin, key, nolod) { return __ZC(81, 8, this, arguments, new.target); }
function bakePress(list, cx, cz, key) { return __ZC(81, 9, this, arguments, new.target); }
function bakeAddParts(G, m) { return __ZC(81, 10, this, arguments, new.target); }
function bakeChunk(key) { return __ZC(81, 11, this, arguments, new.target); }
function bakeTerrain() { return __ZC(81, 12, this, arguments, new.target); }
function bakeLighter(geo) { return __ZC(81, 13, this, arguments, new.target); }
var BAKE_LIGHT = new WeakMap();
function bakeLighterShared(geo) { var g = BAKE_LIGHT.get(geo); if (!g) {
g = bakeLighter(geo);
BAKE_LIGHT.set(geo, g);
} return g; }
function bakeSplitInstanced(m) { return __ZC(81, 14, this, arguments, new.target); }
function bakeFogReach() {
var f = (typeof scene !== "undefined" && scene) ? scene.fog : null;
if (!f)
return Infinity;
if (f.isFogExp2)
return f.density > 0 ? 2.5 / f.density : Infinity;
return f.far || Infinity;
}
function bakeUnbake(key, quiet) { return __ZC(81, 15, this, arguments, new.target); }
function bakeStart() { return __ZC(81, 16, this, arguments, new.target); }
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
function bakeCull(r, dt) { return __ZC(81, 17, this, arguments, new.target); }
