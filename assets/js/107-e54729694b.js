/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var LITE = (function () {
var c = {};
try {
c = JSON.parse(localStorage.getItem(/[?&]test=1\b/.test(location.search) ? "dreamwalker.testcfg" : "dreamwalker.cfg2") || "{}") || {};
}
catch (e) { }
if (c.lite === "on")
return true;
if (c.lite === "off")
return false;
var ua = navigator.userAgent || "";
var phone = /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua)) || (typeof TOUCH_ONLY !== "undefined" && TOUCH_ONLY);
if (!phone && /OculusBrowser|Quest|Pico|Wolvic|\bVR\b/.test(ua))
phone = true;
if (!phone)
try {
var sd = Math.min(screen.width || 0, screen.height || 0);
phone = sd > 0 && sd <= 600 && navigator.maxTouchPoints > 0 && matchMedia("(pointer:coarse)").matches && !matchMedia("(any-pointer:fine)").matches;
}
catch (e) { }
var mem = navigator.deviceMemory;
return !!(phone || (mem && mem <= 2));
})();
var LITE_NEAR = 260, LITE_FAR = 340;
var LITE_KEEP = null, LITE_KEEP_N = -1, LITE_KEEP_F = -1;
function liteShared() { return __ZC(107, 0, this, arguments, new.target); }
function liteRelease(root) { return __ZC(107, 1, this, arguments, new.target); }
if (LITE) {
(function () {
if (typeof applyShadows === "function") {
var as = applyShadows;
applyShadows = function () { as.apply(this, arguments); if (renderer && renderer.shadowMap) {
renderer.shadowMap.enabled = false;
} if (typeof sun !== "undefined" && sun)
sun.castShadow = false; };
}
if (typeof TEMPS !== "undefined") {
TEMPS.maxNear = 6;
TEMPS.maxFly = 2;
}
})();
function liteBeing(spec) {
if (!spec || !spec.city)
return false;
var d = KIT[spec.archetype];
return !!((d && d.cat === "being") || (typeof CREATURE !== "undefined" && CREATURE[spec.archetype]) || spec.archetype === "deity" || spec.archetype === "dragon");
}
function liteNear(spec, R) {
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
if (!r || (store.here || 0) !== r.id || store.inside)
return false;
var P = camera.position;
return Math.hypot(spec.x - P.x, spec.z - P.z) < R;
}
(function () {
var am = addMesh;
addMesh = function (spec) {
if (liteBeing(spec) && !liteNear(spec, LITE_NEAR)) {
spec._liteOut = true;
return;
}
spec._liteOut = false;
return am.apply(this, arguments);
};
})();
var liteAt = 0;
function liteTick(dt) {
liteAt -= dt;
if (liteAt > 0)
return;
liteAt = 1;
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
if (!r)
return;
var P = camera.position, inCity = (store.here || 0) === r.id && !store.inside, made = 0;
store.objects.forEach(function (o) {
if (o.realm !== r.id || !liteBeing(o))
return;
var g = meshes[o.id], d = Math.hypot(o.x - P.x, o.z - P.z);
var ch = typeof charOf === "function" ? charOf(o) : null;
if (ch && ch.x !== undefined)
d = Math.min(d, Math.hypot(ch.x - P.x, ch.z - P.z));
if (g && (!inCity || d > LITE_FAR)) {
scene.remove(g);
delete meshes[o.id];
liteRelease(g);
o._liteOut = true;
}
else if (!g && o._liteOut && inCity && d < LITE_NEAR && made < 12) {
o._liteOut = false;
addMesh(o);
made++;
var g2 = meshes[o.id];
if (g2 && ch && ch.x !== undefined) {
g2.position.x = ch.x;
g2.position.z = ch.z;
}
}
});
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
liteTick(dt);
}
catch (e) {
if (window.console)
console.warn("lite:", e);
} };
})();
}
(function () {
if (typeof bakeChunk !== "function")
return;
var bc = bakeChunk;
bakeChunk = function (key) {
var ch = BAKE.chunks[key];
if (ch)
ch.ids.forEach(function (id) {
var g = meshes[id];
if (!g || !g.userData.liteStripped)
return;
var o = specById(id);
if (!o)
return;
scene.remove(g);
delete meshes[id];
addMesh(o);
});
bc(key);
ch = BAKE.chunks[key];
if (!ch || !ch.members)
return;
if (ch.meshes && ch.meshes.length)
ch.lite = "pressed";
ch.members.forEach(function (M) {
M.took.forEach(function (m) {
if (m.parent)
m.parent.remove(m);
var tmp = new THREE.Object3D();
tmp.add(m);
liteRelease(tmp);
});
M.took = [];
M.g.userData.liteStripped = true;
});
};
})();
var LITE_CH = null;
var ATLQ = { at: 0, press: -1 };
(function () {
if (typeof BAKE !== "undefined" && LITE) {
BAKE.lod = true;
}
function liteDeferrable(o) {
if (!o || !o.city || o.wild)
return false;
var d = KIT[o.archetype];
if (!d || d.cat === "being" || d.cat === "vehicle")
return false;
if (typeof CREATURE !== "undefined" && CREATURE[o.archetype])
return false;
if (typeof ROADGOING !== "undefined" && ROADGOING[o.archetype])
return false;
if (typeof isHidden === "function" && isHidden(o))
return false;
if (typeof bakeBig === "function" && bakeBig(o))
return false;
return true;
}
(function () {
if (typeof atlDrainQueue !== "function")
return;
var dq = atlDrainQueue;
atlDrainQueue = function () {
if (typeof atlMeshQueue !== "undefined" && atlMeshQueue.length && !(typeof ATL_JOB !== "undefined" && ATL_JOB)) {
var keep = [];
for (var i = 0; i < atlMeshQueue.length; i++) {
var sp = atlMeshQueue[i];
if (liteDeferrable(sp) && !meshes[sp.id])
sp._liteLater = true;
else
keep.push(sp);
}
if (keep.length !== atlMeshQueue.length) {
atlMeshQueue.length = 0;
Array.prototype.push.apply(atlMeshQueue, keep);
ATLQ.at = 0;
}
var now = performance.now();
if (atlMeshQueue.length > (ATLQ.n || 0)) {
ATLQ.at = 0;
ATLQ.press = -1;
}
if (now - ATLQ.at > 1000) {
ATLQ.at = now;
var P = camera.position, press = 0;
atlMeshQueue.forEach(function (sp) { sp._atlP = liteQueuePress(sp) ? 1 : 0; press += sp._atlP; var dx = sp.x - P.x, dz = sp.z - P.z; sp._atlD = dx * dx + dz * dz; });
atlMeshQueue.sort(function (a, b) { return (b._atlP - a._atlP) || (a._atlD - b._atlD); });
ATLQ.press = press;
}
}
var r = dq.apply(this, arguments);
if (typeof atlMeshQueue !== "undefined") {
if (!atlMeshQueue.length || (ATLQ.press > -1 && !atlMeshQueue[0]._atlP))
ATLQ.press = 0;
ATLQ.n = atlMeshQueue.length;
}
return r;
};
})();
LITE_CH = { at: 0, job: null, want: [] };
function liteQueuePress(o) {
if (!o || o.wild)
return false;
var d = KIT[o.archetype];
if (!d || d.cat === "being" || d.cat === "vehicle")
return false;
if (typeof CREATURE !== "undefined" && CREATURE[o.archetype])
return false;
if (typeof ROADGOING !== "undefined" && ROADGOING[o.archetype])
return false;
if (typeof isHidden === "function" && isHidden(o))
return false;
return true;
}
function liteKeep() {
var R = (BAKE.reach && BAKE.reach.small) || 660;
return Math.max(300, R) + BAKE.cell * 0.5;
}
function liteCenter(k) { var big = k.charAt(0) === "B", c = big ? BAKE.bigCell : BAKE.cell, s = k.slice(1).split(","); return { x: (+s[0] + 0.5) * c, z: (+s[1] + 0.5) * c, big: big }; }
function liteEvict(k) {
var ch = BAKE.chunks[k];
if (!ch)
return;
bakeUnbake(k, true);
ch.ids.forEach(function (id) {
var o = specById(id), g = meshes[id];
if (!g || !liteDeferrable(o))
return;
scene.remove(g);
delete meshes[id];
liteRelease(g);
o._liteLater = true;
});
ch.lite = null;
ch.members = [];
ch.meshes = [];
}
function liteDropNear(k) {
var ch = BAKE.chunks[k];
if (!ch)
return;
ch.meshes = (ch.meshes || []).filter(function (m) {
if (m.userData.lod !== "near")
return true;
scene.remove(m);
var i = BAKE.lamps.indexOf(m.material);
if (i > -1)
BAKE.lamps.splice(i, 1);
i = BAKE.pools.indexOf(m.material);
if (i > -1)
BAKE.pools.splice(i, 1);
m.geometry.dispose();
m.material.dispose();
return false;
});
ch.lite = "far";
ch.shown = null;
}
function liteAbandon(J) {
var ch = BAKE.chunks[J.k];
if (!ch)
return;
ch.ids.forEach(function (id) {
var g = meshes[id];
if (!g || !g.userData.liteHold)
return;
scene.remove(g);
delete meshes[id];
liteRelease(g);
var o = specById(id);
if (o)
o._liteLater = true;
});
}
function liteChunks(dt) {
if (!BAKE.started || (typeof ATL_JOB !== "undefined" && ATL_JOB))
return;
var r = somnucorRealm();
if (!r)
return;
var P = camera.position, inCity = (store.here || 0) === r.id && !store.inside;
LITE_CH.at -= dt;
if (LITE_CH.at <= 0) {
var L = LITE_CH.last, now = performance.now(), vx = 0, vz = 0;
if (L && now > L.t) {
var s = (now - L.t) / 1000, jx = P.x - L.x, jz = P.z - L.z;
if (Math.abs(jx) + Math.abs(jz) < 120 * s + 20) {
vx = jx / s;
vz = jz / s;
}
}
LITE_CH.last = { x: P.x, z: P.z, t: now };
var look = Math.min(3, 140 / Math.max(1, Math.hypot(vx, vz))), Ax = P.x + vx * look, Az = P.z + vz * look;
LITE_CH.at = 0.5;
var K = liteKeep(), KB = (BAKE.reach && BAKE.reach.big) || 2200, want = [], out = 0, busy = LITE_CH.job && LITE_CH.job.k;
if (busy) {
var cb = liteCenter(busy);
if (!inCity || (!cb.big && Math.hypot(cb.x - P.x, cb.z - P.z) > K * 1.3 + 150)) {
liteAbandon(LITE_CH.job);
LITE_CH.job = null;
busy = null;
}
}
Object.keys(BAKE.chunks).forEach(function (k) {
if (k === busy)
return;
var ch = BAKE.chunks[k], c = liteCenter(k), d = Math.min(Math.hypot(c.x - P.x, c.z - P.z), Math.hypot(c.x - Ax, c.z - Az));
var cell = c.big ? BAKE.bigCell : BAKE.cell, nearR = BAKE.lodNear + cell * 0.75;
if (!c.big && ch.lite && (!inCity || d > K * 1.3 + 150)) {
if (out < 4) {
liteEvict(k);
out++;
}
return;
}
if (LITE && ch.lite === "pressed" && (!inCity || d > nearR + 80))
liteDropNear(k);
if (!inCity)
return;
if (LITE && ch.lite !== "pressed" && d < nearR)
want.push({ k: k, d: d, full: true });
else if (!ch.lite && !c.big && d < K)
want.push({ k: k, d: d, full: !LITE });
});
want.sort(function (a, b) { return (a.full === b.full ? 0 : (a.full ? -1 : 1)) || (a.d - b.d); });
if (busy && want.length) {
var cbz = liteCenter(busy), here0 = want[0], cell0 = liteCenter(here0.k).big ? BAKE.bigCell : BAKE.cell;
if (here0.d < cell0 * 0.8 && Math.hypot(cbz.x - P.x, cbz.z - P.z) > here0.d + (cbz.big ? BAKE.bigCell : BAKE.cell)) {
liteAbandon(LITE_CH.job);
LITE_CH.job = null;
}
}
LITE_CH.want = want;
}
if (!LITE_CH.job) {
var w = LITE_CH.want.shift();
if (!w)
return;
var ch0 = BAKE.chunks[w.k];
if (!ch0 || ch0.lite === "pressed" || (ch0.lite && !w.full))
return;
LITE_CH.job = { k: w.k, full: w.full, todo: ch0.ids.filter(function (id) {
var o = specById(id), g = meshes[id];
return o && ((o._liteLater && !g) || (g && g.userData.liteStripped));
}) };
var qi = BAKE.queue.indexOf(w.k);
if (qi > -1)
BAKE.queue.splice(qi, 1);
}
var J = LITE_CH.job, t0 = performance.now(), cj = liteCenter(J.k);
J.here = Math.hypot(cj.x - P.x, cj.z - P.z) < (cj.big ? BAKE.bigCell : BAKE.cell) * 0.8;
var budget = J.here ? 22 : 8;
while (J.todo.length && performance.now() - t0 < budget) {
var o = specById(J.todo.shift());
if (!o)
continue;
var g0 = meshes[o.id];
if (g0) {
if (!g0.userData.liteStripped)
continue;
scene.remove(g0);
delete meshes[o.id];
liteRelease(g0);
}
o._liteLater = false;
addMesh(o);
var g = meshes[o.id];
if (g) {
g.visible = false;
g.userData.culled = true;
g.userData.liteHold = true;
}
}
if (J.todo.length)
return;
if (typeof bakeAvgReady === "function" && !bakeAvgReady(J.k))
return;
LITE_CH.job = null;
var ch = BAKE.chunks[J.k];
if (!ch)
return;
var qj = BAKE.queue.indexOf(J.k);
if (qj > -1)
BAKE.queue.splice(qj, 1);
bakeChunk(J.k);
if (ch.meshes && ch.meshes.length)
ch.lite = "pressed";
if (!J.full)
liteDropNear(J.k);
ch.shown = null;
BAKE.cullAt = 0;
ch.ids.forEach(function (id) { var g = meshes[id]; if (g && g.userData.liteHold) {
g.userData.liteHold = false;
} });
if (typeof cullAt !== "undefined")
cullAt = 0;
}
(function () {
if (typeof bakeTick !== "function")
return;
var bt = bakeTick;
bakeTick = function (dt) { BAKE.budget = (LITE_CH.job && LITE_CH.job.here) ? 1 : 12; bt.apply(this, arguments); try {
liteChunks(dt || 0);
}
catch (e) {
if (window.console)
console.warn("lite city:", e);
} };
})();
})();
