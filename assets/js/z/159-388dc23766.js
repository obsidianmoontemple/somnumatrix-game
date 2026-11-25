/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(159, function () {
"use strict";
return [
function (key, opt) {
var W = WORLDS[key];
if (!W)
return false;
warmShaders();
opt = opt || {};
var hopping = !!WLD.on && !!WLD.from;
if (WLD.on && WLD.on !== key)
worldOff(true);
if (typeof UG2 !== "undefined" && UG2.on && typeof ug2Off === "function")
ug2Off();
if (typeof MALL !== "undefined" && MALL.on && typeof mallLeave === "function")
mallLeave();
if (store.inside && typeof exitInterior === "function")
exitInterior(true);
if (!walkMode && typeof setWalk === "function")
setWalk(true);
if (!WLD.on && !opt.keepFrom && !(hopping && !opt.from)) {
var P = camera.position;
WLD.from = opt.from || { here: store.here || 0, x: P.x, y: P.y, z: P.z, yaw: yaw, name: opt.fromName || null };
}
if (!W.g) {
W.g = new THREE.Group();
W.g.position.set(W.base, 0, 0);
W.g.name = "world-" + key;
scene.add(W.g);
var lg = worldLetGoMark(key);
try {
W.build(W.g, opt);
}
catch (e) {
if (window.console)
console.warn("world build:", key, e);
}
if (lg)
W.lgAdded = worldLetGoAdded(lg, true);
}
W.g.visible = true;
WLD.on = key;
WLD.w = W;
WLD.hop = 0;
WLD.hv = 0;
WLD.t = 0;
if (typeof walkResume !== "undefined")
walkResume = null;
if (typeof flyY !== "undefined")
flyY = 0;
if (typeof guideTo !== "undefined")
guideTo = null;
if (W.far && camera) {
if (!WLD.far0)
WLD.far0 = camera.far;
camera.far = W.far;
camera.updateProjectionMatrix();
}
worldSkyHide(!!W.ownSky);
try {
W.enter(opt);
}
catch (e) {
if (window.console)
console.warn("world enter:", key, e);
}
if (W.lgAdded && W.lgAdded.fpre) {
var fp = W.lgAdded.fpre;
W.lgAdded.fpre = null;
try {
worldLetGoFns(function (h, k, f) { if (!fp.has(f))
W.lgAdded.fns.add(f); });
}
catch (e) { }
}
if (WLD.w === W) {
WLD.arrive = { x: camera.position.x - W.base, z: camera.position.z };
if (typeof DK !== "undefined" && DK.pos)
for (var dq in DK.pos) {
if (DK.pos[dq] && DK.pos[dq].int === W.g)
delete DK.pos[dq];
}
}
worldHudEl();
worldCard(null);
if (typeof playTone === "function")
playTone(W.tone || 540, 0.5);
return true;
},
function (quiet) {
var W = WLD.w;
if (!W)
return;
try {
if (W.leave)
W.leave();
}
catch (e) { }
if (W.g)
W.g.visible = false;
WLD.on = null;
WLD.w = null;
WLD.hop = 0;
WLD.hv = 0;
worldLetGoLater(W.key);
if (WLD.far0 && camera) {
camera.far = WLD.far0;
camera.updateProjectionMatrix();
WLD.far0 = 0;
}
worldSkyHide(false);
if (WLD.hud)
WLD.hud.style.display = "none";
worldPrompt(null);
worldCard(null);
if (typeof tickClock === "function")
tickClock(true);
},
function (key) {
if (WLG.keys.indexOf(key) < 0)
return;
clearTimeout(WLG.t[key]);
WLG.t[key] = setTimeout(function () { worldLetGo(key); }, WLG.delay);
},
function (key) {
var W = WORLDS[key];
if (!W || !W.g || WLD.on === key)
return false;
var t0 = performance.now(), G = W.g;
W.g = null;
scene.remove(G);
G.traverse(function (m) {
if (m.geometry && m.geometry.dispose && !m.geometry.userData.shared && !(typeof FIGGEO !== "undefined" && typeof ldShared === "function" && ldShared(m.geometry)))
m.geometry.dispose();
var ms = Array.isArray(m.material) ? m.material : (m.material ? [m.material] : []);
ms.forEach(function (mt) { if (mt.map && mt.map.isCanvasTexture)
mt.map.dispose(); });
});
(W.lgAdded || []).forEach(function (a) { var gone = new Set(a[1]), keep = a[0].filter(function (e) { return !gone.has(e); }); a[0].length = 0; Array.prototype.push.apply(a[0], keep); });
((W.lgAdded && W.lgAdded.flags) || []).forEach(function (f) { if (f.length === 2)
delete f[0][f[1]];
else
f[0][f[1]] = f[2]; });
var pre = W.lgAdded && W.lgAdded.pre, fns = W.lgAdded && W.lgAdded.fns;
W.lgAdded = null;
wlgQueue((function* () { try {
WLG.fnsGone = yield* worldForgetFnsGen(fns);
}
catch (e) { } yield* worldForgetGen(G, pre); })());
WLG.ms = Math.round(performance.now() - t0);
return true;
},
function (cb, onProp) {
if (typeof wlgFlush === "function")
wlgFlush();
var seen = new Set(), n = 0;
function plain(v) { if (!v || typeof v !== "object")
return false; if (Array.isArray(v))
return true; var p = Object.getPrototypeOf(v); return p === Object.prototype || p === null; }
function walk(v, d) {
if (!plain(v) || seen.has(v) || ++n > 200000)
return;
seen.add(v);
if (Array.isArray(v)) {
cb(v);
if (d < 2)
for (var i = 0; i < v.length && i < 64; i++)
walk(v[i], d + 1);
return;
}
for (var k in v) {
var x;
try {
x = v[k];
}
catch (e) {
continue;
}
if (onProp && Array.isArray(x))
onProp(v, k, x);
if (x && typeof x === "object" && !x.isObject3D && d < 3)
walk(x, d + 1);
}
}
Object.keys(window).forEach(function (k) { if (/^(on|webkit)/.test(k))
return; var x; try {
x = window[k];
}
catch (e) {
return;
} walk(x, 0); });
},
function (cb, onProp, visit) {
var seenL = new Set(), nL = 0, seenF = new Set(), nF = 0;
function plain(v) { if (!v || typeof v !== "object")
return false; if (Array.isArray(v))
return true; var p = Object.getPrototypeOf(v); return p === Object.prototype || p === null; }
function walk(v, dL, dF) {
if (!plain(v))
return;
if (dL >= 0 && (seenL.has(v) || ++nL > 200000))
dL = -1;
if (dL >= 0)
seenL.add(v);
if (dF >= 0 && (seenF.has(v) || ++nF > 300000))
dF = -1;
if (dF >= 0)
seenF.add(v);
if (dL < 0 && dF < 0)
return;
if (Array.isArray(v)) {
if (dL >= 0)
cb(v);
var nl = dL >= 0 && dL < 2 ? Math.min(v.length, 64) : 0, nf = dF >= 0 ? Math.min(v.length, 6000) : 0, N = Math.max(nl, nf);
for (var i = 0; i < N; i++) {
var x = v[i], fi = i < nf;
if (fi && typeof x === "function") {
visit(v, i, x);
if (i < nl)
walk(x, dL + 1, -1);
continue;
}
walk(x, i < nl ? dL + 1 : -1, fi && dF < 4 ? dF + 1 : -1);
}
return;
}
for (var k in v) {
var x;
try {
x = v[k];
}
catch (e) {
continue;
}
if (dL >= 0 && onProp && Array.isArray(x))
onProp(v, k, x);
if (dF >= 0 && typeof x === "function") {
visit(v, k, x);
continue;
}
if (x && typeof x === "object" && !x.isObject3D)
walk(x, dL >= 0 && dL < 3 ? dL + 1 : -1, dF >= 0 && dF < 4 ? dF + 1 : -1);
}
}
Object.keys(window).forEach(function (k) { if (/^(on|webkit)/.test(k))
return; var x; try {
x = window[k];
}
catch (e) {
return;
} walk(x, 0, 0); });
},
function (key) {
if (typeof wlgFlush === "function")
wlgFlush();
if (WLG.keys.indexOf(key) < 0)
return null;
var m = new Map(), props = [], objs = new Map(), pre = new WeakSet(), fns = new WeakSet();
try {
worldLetGoBoth(function (a) { m.set(a, a.length); if (a.length <= 4000)
for (var i = 0; i < a.length; i++) {
var e = a[i];
if (e && typeof e === "object")
pre.add(e);
} }, function (o, k, a) { if (o === window.store)
return; props.push([o, k, a]); if (!objs.has(o))
objs.set(o, new Set(Object.keys(o))); }, function (h, k, f) { fns.add(f); });
}
catch (e) {
return null;
}
m.props = props;
m.objs = objs;
m.pre = pre;
m.fns = fns;
try {
m.flags = worldLetGoFlags();
}
catch (e) {
m.flags = null;
}
return m;
},
function (visit) {
var seen = new Set(), n = 0;
function plain(v) { if (!v || typeof v !== "object")
return false; if (Array.isArray(v))
return true; var p = Object.getPrototypeOf(v); return p === Object.prototype || p === null; }
function walk(v, d) {
if (!plain(v) || seen.has(v) || ++n > 300000)
return;
seen.add(v);
if (Array.isArray(v)) {
for (var i = 0; i < v.length && i < 6000; i++) {
var x = v[i];
if (typeof x === "function")
visit(v, i, x);
else if (d < 4)
walk(x, d + 1);
}
return;
}
for (var k in v) {
var x;
try {
x = v[k];
}
catch (e) {
continue;
}
if (typeof x === "function")
visit(v, k, x);
else if (x && typeof x === "object" && !x.isObject3D && d < 4)
walk(x, d + 1);
}
}
Object.keys(window).forEach(function (k) { if (/^(on|webkit)/.test(k))
return; var x; try {
x = window[k];
}
catch (e) {
return;
} walk(x, 0); });
},
function (fns) {
if (!fns || !fns.size)
return 0;
var hit = 0, lists = new Map();
worldLetGoFns(function (h, k, f) {
if (!fns.has(f))
return;
hit++;
if (Array.isArray(h)) {
var L = lists.get(h) || [];
L.push(k);
lists.set(h, L);
}
else
delete h[k];
});
var seen = new Set();
worldLetGoLists(function (a) {
if (seen.has(a) || !a.length)
return;
seen.add(a);
if (!a.some(function (e) { if (typeof e === "function")
return fns.has(e); if (e && typeof e === "object" && !Array.isArray(e) && !e.isObject3D) {
for (var q in e) {
var y = e[q];
if (typeof y === "function" && fns.has(y))
return true;
}
} return false; }))
return;
var keep = a.filter(function (e) { if (typeof e === "function")
return !fns.has(e); if (e && typeof e === "object" && !Array.isArray(e) && !e.isObject3D) {
for (var q in e) {
var y = e[q];
if (typeof y === "function" && fns.has(y))
return false;
}
} return true; });
a.length = 0;
Array.prototype.push.apply(a, keep);
});
lists.forEach(function (L, a) { for (var i = 0; i < a.length; i++)
if (typeof a[i] === "function" && fns.has(a[i]))
a[i] = WLG_GONE; });
return hit;
},
function () {
var out = [];
Object.keys(window).forEach(function (n) {
if (/^(on|webkit)/.test(n))
return;
var v;
try {
v = window[n];
}
catch (e) {
return;
}
if (!v || typeof v !== "object" || Array.isArray(v) || v === window.store)
return;
var p = Object.getPrototypeOf(v);
if (p !== Object.prototype && p !== null)
return;
for (var k in v) {
if (!WLG_FLAG.test(k))
continue;
var x = v[k];
if (x && typeof x === "object" && !Array.isArray(x) && !x.isObject3D && Object.getPrototypeOf(x) === Object.prototype)
out.push([v, k, Object.assign({}, x), 1]);
else if (!x || typeof x !== "object")
out.push([v, k, x, 0]);
}
});
return out;
},
function (m, later) {
var out = [];
m.forEach(function (len, a) { if (a.length > len)
out.push([a, a.slice(len)]); });
out.pre = m.pre || null;
out.flags = [];
if (m.fns) {
var nf = new Set();
if (!later)
try {
worldLetGoFns(function (h, k, f) { if (!m.fns.has(f))
nf.add(f); });
}
catch (e) { }
out.fns = nf;
out.fpre = m.fns;
}
(m.flags || []).forEach(function (r) {
var o = r[0], k = r[1], now = o[k];
if (r[3]) {
if (now && typeof now === "object")
for (var w in now)
if (!(w in r[2]) && now[w])
out.flags.push([now, w]);
}
else if (!r[2] && now && typeof now !== "object")
out.flags.push([o, k, r[2]]);
});
(m.props || []).forEach(function (r) {
var a = r[0][r[1]];
if (!Array.isArray(a) || a === r[2] || !a.length || m.has(a))
return;
var old = new Set(r[2]);
if (a.some(function (e) { return old.has(e); }))
return;
out.push([a, a.slice()]);
});
if (m.objs)
m.objs.forEach(function (keys, o) { for (var k in o) {
if (keys.has(k))
continue;
var a = o[k];
if (Array.isArray(a) && a.length && !m.has(a))
out.push([a, a.slice()]);
} });
return out;
},
function (G, pre) {
var seen = new Set(), n = 0;
function loosen(e) { for (var k in e) {
var x = e[k];
if (x && x.isObject3D && inG(x))
e[k] = null;
else if (x && typeof x === "object" && plain(x) && !Array.isArray(x))
for (var k2 in x) {
var y = x[k2];
if (y && y.isObject3D && inG(y))
x[k2] = null;
}
} }
function inG(o) { for (var i = 0; o && i < 80; o = o.parent, i++)
if (o === G)
return true; return false; }
function plain(v) { if (!v || typeof v !== "object")
return false; if (Array.isArray(v))
return true; var p = Object.getPrototypeOf(v); return p === Object.prototype || p === null; }
function holds(e) {
if (!e || typeof e !== "object")
return false;
if (e.isObject3D)
return inG(e);
if (!plain(e))
return false;
for (var k in e) {
var x = e[k];
if (x && typeof x === "object") {
if (x.isObject3D) {
if (inG(x))
return true;
}
else if (plain(x) && !Array.isArray(x)) {
for (var k2 in x) {
var y = x[k2];
if (y && y.isObject3D && inG(y))
return true;
}
}
}
}
return false;
}
function tidy(v, d) {
if (!plain(v) || seen.has(v) || ++n > 200000)
return;
seen.add(v);
if (Array.isArray(v)) {
if (v.length && v.some(holds)) {
var keep = v.filter(function (e) { if (!holds(e))
return true; if (pre && !e.isObject3D && pre.has(e)) {
loosen(e);
return true;
} return false; });
v.length = 0;
Array.prototype.push.apply(v, keep);
}
if (d < 3)
for (var i = 0; i < v.length; i++)
tidy(v[i], d + 1);
return;
}
for (var k in v) {
var x;
try {
x = v[k];
}
catch (e) {
continue;
}
if (!x || typeof x !== "object")
continue;
if (x.isObject3D) {
if (inG(x))
v[k] = null;
continue;
}
if (x._root && x._root.isObject3D && x.clipAction) {
if (inG(x._root))
v[k] = null;
continue;
}
if (d < 3)
tidy(x, d + 1);
}
}
Object.keys(window).forEach(function (k) { if (/^(on|webkit)/.test(k))
return; var x; try {
x = window[k];
}
catch (e) {
return;
} tidy(x, 0); });
},
function () {
WLGQ.raf = 0;
var t0 = performance.now(), B = (typeof LITE !== "undefined" && LITE) ? 4 : 8;
while (WLGQ.jobs.length && performance.now() - t0 < B) {
var J = WLGQ.jobs[0], r;
try {
r = J.next();
}
catch (e) {
if (window.console)
console.warn("[let go]", e);
r = { done: true };
}
if (r.done)
WLGQ.jobs.shift();
}
if (WLGQ.jobs.length)
WLGQ.raf = requestAnimationFrame(wlgRun);
},
function* (cb, onProp) {
var seen = new Set(), n = 0;
function plain(v) { if (!v || typeof v !== "object")
return false; if (Array.isArray(v))
return true; var p = Object.getPrototypeOf(v); return p === Object.prototype || p === null; }
function* walk(v, d) {
if (!plain(v) || seen.has(v) || ++n > 200000)
return;
seen.add(v);
if (++WLGQ.n >= 1500) {
WLGQ.n = 0;
yield 0;
}
if (Array.isArray(v)) {
cb(v);
if (d < 2)
for (var i = 0; i < v.length && i < 64; i++)
yield* walk(v[i], d + 1);
return;
}
for (var k in v) {
var x;
try {
x = v[k];
}
catch (e) {
continue;
}
if (onProp && Array.isArray(x))
onProp(v, k, x);
if (x && typeof x === "object" && !x.isObject3D && d < 3)
yield* walk(x, d + 1);
}
}
var K = Object.keys(window);
for (var ki = 0; ki < K.length; ki++) {
var k = K[ki];
if (/^(on|webkit)/.test(k))
continue;
var x;
try {
x = window[k];
}
catch (e) {
continue;
}
yield* walk(x, 0);
}
},
function* (visit) {
var seen = new Set(), n = 0;
function plain(v) { if (!v || typeof v !== "object")
return false; if (Array.isArray(v))
return true; var p = Object.getPrototypeOf(v); return p === Object.prototype || p === null; }
function* walk(v, d) {
if (!plain(v) || seen.has(v) || ++n > 300000)
return;
seen.add(v);
if (++WLGQ.n >= 1500) {
WLGQ.n = 0;
yield 0;
}
if (Array.isArray(v)) {
for (var i = 0; i < v.length && i < 6000; i++) {
var x = v[i];
if (typeof x === "function")
visit(v, i, x);
else if (d < 4)
yield* walk(x, d + 1);
}
return;
}
for (var k in v) {
var x;
try {
x = v[k];
}
catch (e) {
continue;
}
if (typeof x === "function")
visit(v, k, x);
else if (x && typeof x === "object" && !x.isObject3D && d < 4)
yield* walk(x, d + 1);
}
}
var K = Object.keys(window);
for (var ki = 0; ki < K.length; ki++) {
var k = K[ki];
if (/^(on|webkit)/.test(k))
continue;
var x;
try {
x = window[k];
}
catch (e) {
continue;
}
yield* walk(x, 0);
}
},
function* (fns) {
if (!fns || !fns.size)
return 0;
var hit = 0, lists = new Map();
yield* worldLetGoFnsGen(function (h, k, f) {
if (!fns.has(f))
return;
hit++;
if (Array.isArray(h)) {
var L = lists.get(h) || [];
L.push(k);
lists.set(h, L);
}
else
delete h[k];
});
var seen = new Set();
yield* worldLetGoListsGen(function (a) {
if (seen.has(a) || !a.length)
return;
seen.add(a);
if (!a.some(function (e) { if (typeof e === "function")
return fns.has(e); if (e && typeof e === "object" && !Array.isArray(e) && !e.isObject3D) {
for (var q in e) {
var y = e[q];
if (typeof y === "function" && fns.has(y))
return true;
}
} return false; }))
return;
var keep = a.filter(function (e) { if (typeof e === "function")
return !fns.has(e); if (e && typeof e === "object" && !Array.isArray(e) && !e.isObject3D) {
for (var q in e) {
var y = e[q];
if (typeof y === "function" && fns.has(y))
return false;
}
} return true; });
a.length = 0;
Array.prototype.push.apply(a, keep);
});
lists.forEach(function (L, a) { for (var i = 0; i < a.length; i++)
if (typeof a[i] === "function" && fns.has(a[i]))
a[i] = WLG_GONE; });
return hit;
},
function* (G, pre) {
var seen = new Set(), n = 0;
function loosen(e) { for (var k in e) {
var x = e[k];
if (x && x.isObject3D && inG(x))
e[k] = null;
else if (x && typeof x === "object" && plain(x) && !Array.isArray(x))
for (var k2 in x) {
var y = x[k2];
if (y && y.isObject3D && inG(y))
x[k2] = null;
}
} }
function inG(o) { for (var i = 0; o && i < 80; o = o.parent, i++)
if (o === G)
return true; return false; }
function plain(v) { if (!v || typeof v !== "object")
return false; if (Array.isArray(v))
return true; var p = Object.getPrototypeOf(v); return p === Object.prototype || p === null; }
function holds(e) {
if (!e || typeof e !== "object")
return false;
if (e.isObject3D)
return inG(e);
if (!plain(e))
return false;
for (var k in e) {
var x = e[k];
if (x && typeof x === "object") {
if (x.isObject3D) {
if (inG(x))
return true;
}
else if (plain(x) && !Array.isArray(x)) {
for (var k2 in x) {
var y = x[k2];
if (y && y.isObject3D && inG(y))
return true;
}
}
}
}
return false;
}
function* tidy(v, d) {
if (!plain(v) || seen.has(v) || ++n > 200000)
return;
seen.add(v);
if (++WLGQ.n >= 1500) {
WLGQ.n = 0;
yield 0;
}
if (Array.isArray(v)) {
if (v.length && v.some(holds)) {
var keep = v.filter(function (e) { if (!holds(e))
return true; if (pre && !e.isObject3D && pre.has(e)) {
loosen(e);
return true;
} return false; });
v.length = 0;
Array.prototype.push.apply(v, keep);
}
if (d < 3)
for (var i = 0; i < v.length; i++)
yield* tidy(v[i], d + 1);
return;
}
for (var k in v) {
var x;
try {
x = v[k];
}
catch (e) {
continue;
}
if (!x || typeof x !== "object")
continue;
if (x.isObject3D) {
if (inG(x))
v[k] = null;
continue;
}
if (x._root && x._root.isObject3D && x.clipAction) {
if (inG(x._root))
v[k] = null;
continue;
}
if (d < 3)
yield* tidy(x, d + 1);
}
}
var K = Object.keys(window);
for (var ki = 0; ki < K.length; ki++) {
var k = K[ki];
if (/^(on|webkit)/.test(k))
continue;
var x;
try {
x = window[k];
}
catch (e) {
continue;
}
yield* tidy(x, 0);
}
},
function (msg) {
var F = WLD.from;
worldOff(true);
WLD.from = null;
if (F) {
if ((store.here || 0) !== (F.here || 0) && typeof beHere === "function")
beHere(F.here || 0);
camera.position.set(F.x, F.y, F.z);
yaw = F.yaw || 0;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = Math.max(0, F.y - 1.72 - ((typeof terrainY === "function") ? terrainY(F.x, F.z) : 0));
}
if (typeof tickClock === "function")
tickClock(true);
if (msg)
setStatus(msg);
},
function (E) {
if (!E)
return;
if (typeof sky !== "undefined" && sky) {
sky.material.uniforms.top.value.setHex(E.top);
sky.material.uniforms.low.value.setHex(E.low);
}
if (scene.background && scene.background.setHex)
scene.background.setHex(E.low);
if (scene.fog) {
scene.fog.color.setHex(E.fog !== undefined ? E.fog : E.low);
if (scene.fog.density !== undefined)
scene.fog.density = E.fogD !== undefined ? E.fogD : 0.0015;
}
if (typeof sun !== "undefined" && sun) {
sun.intensity = E.sun !== undefined ? E.sun : 0.8;
sun.color.setHex(E.sunCol || 0xFFF4E2);
var d = E.sunDir || [0.4, 0.8, 0.3], P = camera.position;
sun.position.set(P.x + d[0] * 600, P.y + d[1] * 600, P.z + d[2] * 600);
if (sun.target) {
sun.target.position.set(P.x, P.y, P.z);
sun.target.updateMatrixWorld && sun.target.updateMatrixWorld();
}
}
if (typeof hemi !== "undefined" && hemi) {
hemi.intensity = E.hemi !== undefined ? E.hemi : 0.7;
hemi.color.setHex(E.hemiCol || 0xCFDCEA);
if (hemi.groundColor)
hemi.groundColor.setHex(E.hemiGround || 0x40382C);
}
if (typeof stars !== "undefined" && stars)
stars.material.opacity = E.stars || 0;
if (typeof sunDisc !== "undefined" && sunDisc)
sunDisc.visible = false;
if (typeof moonDisc !== "undefined" && moonDisc)
moonDisc.visible = false;
},
function () {
if (WLD.hud)
return;
var h = document.createElement("div");
h.id = "wld-hud";
h.style.cssText = "position:fixed;left:50%;top:10px;transform:translateX(-50%);z-index:44;display:none;background:rgba(10,14,30,.88);border:1px solid #8FB4E8;border-radius:16px;" +
"padding:6px 16px;font:13px var(--sans,system-ui);color:#F0F2F8;text-align:center;max-width:calc(100vw - 24px);line-height:1.5;pointer-events:none";
document.body.appendChild(h);
WLD.hud = h;
var p = document.createElement("div");
p.id = "wld-prompt";
p.style.cssText = "position:fixed;left:50%;bottom:calc(120px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:45;display:none;background:rgba(8,10,18,.92);" +
"border:1px solid #8FB4E8;border-radius:3px;padding:9px 14px;font:13px var(--sans,system-ui);color:var(--bone,#E8E2D2);cursor:pointer;max-width:calc(100vw - 32px)";
document.body.appendChild(p);
WLD.prompt = p;
var c = document.createElement("div");
c.id = "wld-card";
c.style.cssText = "position:fixed;right:12px;top:60px;z-index:46;display:none;width:min(340px,calc(100vw - 24px));max-height:calc(100vh - 200px);overflow:auto;background:rgba(8,12,24,.94);" +
"border:1px solid #8FB4E8;border-radius:6px;padding:12px 14px;font:13px/1.5 var(--sans,system-ui);color:#E8ECF4";
document.body.appendChild(c);
WLD.card = c;
},
function (html, fns) {
worldHudEl();
var c = WLD.card;
if (!html) {
c.style.display = "none";
c.dataset.h = "";
return;
}
c.innerHTML = "<div style='text-align:right;margin:-4px -6px 0 0'><span data-w='close' role='button' tabindex='0' aria-label='Close' style='cursor:pointer;opacity:.7;font-size:16px'>✕</span></div>" + html;
c.style.display = "block";
c.querySelectorAll("[data-w]").forEach(function (b) {
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); var n = b.getAttribute("data-w"); if (n === "close") {
worldCard(null);
return;
} if (fns && fns[n])
fns[n](b); };
});
if (document.exitPointerLock)
document.exitPointerLock();
},
function (title, sub, rows, notes, extra) {
return "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + esc(title) + "</div>" + (sub ? "<div style='opacity:.8;margin-bottom:6px'>" + esc(sub) + "</div>" : "") +
"<table style='width:100%;border-collapse:collapse;font-size:12.5px'>" + (rows || []).map(function (r) { return "<tr><td style='opacity:.7;padding:2px 8px 2px 0;vertical-align:top;white-space:nowrap'>" + esc(r[0]) + "</td><td style='padding:2px 0'>" + esc(r[1]) + "</td></tr>"; }).join("") + "</table>" +
((notes && notes.length) ? "<ul style='margin:8px 0 0 16px;padding:0'>" + notes.map(function (n) { return "<li style='margin:3px 0'>" + esc(n) + "</li>"; }).join("") + "</ul>" : "") + (extra || "");
},
function (list) {
var G = list.__wsa, n = list.length, now = performance.now();
if (G && G.n === n && G.last === list[n - 1] && now - G.t < 1000)
return G;
if (!G || n < G.n || (G.n && list[G.n - 1] !== G.last) || now - G.t >= 1000) {
G = { m: new Map(), big: [], n: 0, last: null, t: now };
try {
Object.defineProperty(list, "__wsa", { value: G, writable: true, configurable: true, enumerable: false });
}
catch (e) {
return null;
}
}
for (var i = G.n; i < n; i++) {
var s = list[i];
if (!s)
continue;
var e = (s.r !== undefined ? s.r : Math.hypot(s.hw || 0, s.hd || 0)) + 0.4;
if (!(e < 48) || !isFinite(s.x) || !isFinite(s.z)) {
G.big.push(s);
continue;
}
var x0 = Math.floor((s.x - e) / WSA_C), x1 = Math.floor((s.x + e) / WSA_C), z0 = Math.floor((s.z - e) / WSA_C), z1 = Math.floor((s.z + e) / WSA_C);
for (var a = x0; a <= x1; a++)
for (var b = z0; b <= z1; b++) {
var k = a * 65536 + b, c = G.m.get(k);
if (!c)
G.m.set(k, c = []);
c.push(s);
}
}
G.n = n;
G.last = list[n - 1];
return G;
},
function (s, x, z, feet) {
if (s.h !== undefined && feet > (s.b || 0) + s.h - 0.3)
return false;
if (s.b !== undefined && feet + 1.7 < s.b)
return false;
var dx = x - s.x, dz = z - s.z;
if (s.r !== undefined)
return dx * dx + dz * dz < (s.r + 0.35) * (s.r + 0.35);
var c = Math.cos(-(s.rot || 0)), sn = Math.sin(-(s.rot || 0)), lx = dx * c + dz * sn, lz = -dx * sn + dz * c;
return Math.abs(lx) < s.hw + 0.35 && Math.abs(lz) < s.hd + 0.35;
},
function (dt, g) {
if (!g)
return;
var jump = keys["Space"] && !(typeof canFly !== "undefined" && canFly);
if (jump && WLD.hop <= 0.001 && WLD.hv <= 0)
WLD.hv = 3.1;
if (WLD.hop > 0 || WLD.hv > 0) {
WLD.hv -= g * dt;
WLD.hop += WLD.hv * dt;
if (WLD.hop <= 0) {
WLD.hop = 0;
WLD.hv = 0;
}
}
},
function (P) {
if (P.length < 8)
return null;
var B = W_SEGBOX && W_SEGBOX.get(P);
if (B && B.n === P.length && B.a === P[0] && B.z === P[P.length - 1])
return B;
B = new Float64Array(Math.max(0, P.length - 1) * 4);
B.n = P.length;
B.a = P[0];
B.z = P[P.length - 1];
for (var i = 0; i < P.length - 1; i++) {
var a = P[i], c = P[i + 1];
B[i * 4] = Math.min(a[0], c[0]);
B[i * 4 + 1] = Math.max(a[0], c[0]);
B[i * 4 + 2] = Math.min(a[1], c[1]);
B[i * 4 + 3] = Math.max(a[1], c[1]);
}
if (W_SEGBOX)
W_SEGBOX.set(P, B);
return B;
},
function (s, n, fn, mat) {
var g = new THREE.PlaneGeometry(s, s, n, n);
g.rotateX(-Math.PI / 2);
var p = g.attributes.position, cols = new Float32Array(p.count * 3), c = new THREE.Color();
for (var i = 0; i < p.count; i++) {
var r = fn(p.getX(i), p.getZ(i));
p.setY(i, r[0]);
c.setHex(r[1]);
cols[i * 3] = c.r;
cols[i * 3 + 1] = c.g;
cols[i * 3 + 2] = c.b;
}
g.setAttribute("color", new THREE.BufferAttribute(cols, 3));
g.computeVertexNormals();
var m = mat || new THREE.MeshLambertMaterial({ vertexColors: true });
if (!mat)
m.vertexColors = true;
return new THREE.Mesh(g, m);
},
function (n, fn, col, size, att) {
var pos = new Float32Array(n * 3);
for (var i = 0; i < n; i++) {
var v = fn(i);
pos[i * 3] = v[0];
pos[i * 3 + 1] = v[1];
pos[i * 3 + 2] = v[2];
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
return new THREE.Points(g, new THREE.PointsMaterial({ color: col, size: size, sizeAttenuation: !!att, transparent: true, opacity: 1, depthWrite: false, fog: !!att }));
},
function (size, seg, col, amp, opts) {
opts = opts || {};
var g = new THREE.PlaneGeometry(size, size, seg, seg);
g.rotateX(-Math.PI / 2);
var m = new THREE.MeshPhongMaterial({ color: col, shininess: opts.shine || 60, specular: opts.spec || 0x445566, transparent: opts.op !== undefined, opacity: opts.op === undefined ? 1 : opts.op, flatShading: !!opts.flat });
var w = new THREE.Mesh(g, m);
w.userData.amp = amp;
w.userData.base = g.attributes.position.array.slice();
w.userData.step = size / seg;
return w;
},
function (w, cx, cz, t, ox) {
var st = w.userData.step, gx = Math.round(cx / st) * st, gz = Math.round(cz / st) * st;
w.position.x = gx;
w.position.z = gz;
var p = w.geometry.attributes.position, b = w.userData.base, a = w.userData.amp;
for (var i = 0; i < p.count; i++) {
var x = b[i * 3] + gx + (ox || 0), z = b[i * 3 + 2] + gz;
p.array[i * 3 + 1] = a * (Math.sin(x * 0.045 + t * 1.1) * 0.6 + Math.sin(z * 0.06 - t * 0.9) * 0.5 + Math.sin((x + z) * 0.11 + t * 1.7) * 0.25);
}
p.needsUpdate = true;
w.geometry.computeVertexNormals();
},
function (list, L, rOf) {
var best = null, bs = Infinity, fx = -Math.sin(typeof yaw === "number" ? yaw : 0), fz = -Math.cos(typeof yaw === "number" ? yaw : 0);
for (var i = 0; i < (list ? list.length : 0); i++) {
var T = list[i];
if (!T)
continue;
var x = T.p ? (T.p.g ? T.p.g.position.x : T.p.x) : T.x, z = T.p ? (T.p.g ? T.p.g.position.z : T.p.z) : T.z, r = rOf ? rOf(T) : T.r;
if (typeof x !== "number" || !r)
continue;
var dx = x - L.x, dz = z - L.z, d = Math.sqrt(dx * dx + dz * dz);
if (d >= r)
continue;
var face = d > 0.01 ? (dx * fx + dz * fz) / d : 1, sc = (d / r) * (1.4 - 0.4 * face);
if (sc < bs) {
bs = sc;
best = T;
}
}
return best;
},
function (seed, o) {
o = o || {};
var kind = o.child ? "child" : "human";
var look = (typeof randomLook === "function") ? randomLook("w_" + seed, kind) : {};
if (o.title && typeof jobDress === "function")
try {
jobDress(look, o.title, o.place || "");
}
catch (e) { }
if (o.sex)
look.sex = o.sex;
if (o.species)
look.species = o.species;
if (o.look)
Object.keys(o.look).forEach(function (k) { look[k] = o.look[k]; });
var g = buildFigure({ id: "w_" + seed, archetype: kind, attrs: {}, look: look, solid: false, detail: 3, nights: [], city: true }, 1);
if (o.scale)
g.scale.setScalar(o.scale);
g.userData.wSeed = seed;
return g;
},
function (t) {
if (typeof openTalk !== "function")
return;
var key = "wtalk:" + t.name, c = null;
(store.characters || []).forEach(function (x) { if (x.wKey === key)
c = x; });
var P = camera.position;
if (!c) {
c = { id: (typeof uid === "function" ? uid() : "w" + Date.now()), wKey: key, archetype: "human", name: t.name, aka: [], details: [t.persona], sessions: [store.session], awake: true, log: [],
x: P.x, z: P.z, primary: true, src: { name: "stated" }, role: null, shift: null, routine: null, home: null, work: null, anchor: { x: P.x, z: P.z }, born: "", doing: t.doing || "here", visible: false };
if (t.greet)
c.log.push({ who: "them", text: t.greet });
if (store.characters)
store.characters.push(c);
}
if (t.persona && c.details)
c.details[0] = t.persona;
if (t.sex)
c.ftkSex = t.sex;
if (t.age)
c.ftkAge = t.age;
if (t.vp)
c.fvoP = t.vp;
if (t.vr)
c.fvoRt = t.vr;
c.x = P.x;
c.z = P.z;
c.visible = false;
worldPrompt(null);
openTalk(c);
}
];
});
