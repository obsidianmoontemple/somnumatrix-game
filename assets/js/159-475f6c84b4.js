/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WLD = { on: null, w: null, hud: null, prompt: null, promptFn: null, card: null, from: null, hop: 0, hv: 0, t: 0, far0: 0, env: null, keepVis: null, tip: null };
var WORLDS = {};
function worldDef(key, def) { def.key = key; def.g = null; WORLDS[key] = def; return def; }
function worldIn(key) { return WLD.on === key; }
function wlx(x) { return x - (WLD.w ? WLD.w.base : 0); }
function worldLocal() { var P = camera.position; return { x: wlx(P.x), y: P.y, z: P.z }; }
function worldInRange(x) { var W = WLD.w; return !!(W && x > W.base - 60000 && x < W.base + 60000); }
function worldGo(key, opt) { return __ZC(159, 0, this, arguments, new.target); }
function worldOff(quiet) { return __ZC(159, 1, this, arguments, new.target); }
var WLG = { delay: 20000, keys: ["space", "surface", "station", "casino", "neverland", "sea", "northpole", "battle", "greenwold", "lounge", "family", "party", "mmin"], t: {} };
WLG.pcMB = 450;
function wlgHeavy() { try {
var m = performance.memory;
return !!(m && m.usedJSHeapSize > WLG.pcMB * 1048576);
}
catch (e) {
return false;
} }
function worldLetGoLater(key) { return __ZC(159, 2, this, arguments, new.target); }
function worldLetGo(key) { return __ZC(159, 3, this, arguments, new.target); }
function worldLetGoLists(cb, onProp) { return __ZC(159, 4, this, arguments, new.target); }
function worldLetGoBoth(cb, onProp, visit) { return __ZC(159, 5, this, arguments, new.target); }
function worldLetGoMark(key) { return __ZC(159, 6, this, arguments, new.target); }
function worldLetGoFns(visit) { return __ZC(159, 7, this, arguments, new.target); }
function WLG_GONE() { }
function worldForgetFns(fns) { return __ZC(159, 8, this, arguments, new.target); }
var WLG_FLAG = /^(built|dressed|done|made|ready|did)$/;
function worldLetGoFlags() { return __ZC(159, 9, this, arguments, new.target); }
function worldLetGoAdded(m, later) { return __ZC(159, 10, this, arguments, new.target); }
function worldForget(G, pre) { return __ZC(159, 11, this, arguments, new.target); }
var WLGQ = { jobs: [], raf: 0, n: 0 };
function wlgQueue(gen) { WLGQ.jobs.push(gen); if (!WLGQ.raf && typeof requestAnimationFrame === "function")
WLGQ.raf = requestAnimationFrame(wlgRun); }
function wlgRun() { return __ZC(159, 12, this, arguments, new.target); }
function wlgFlush() { while (WLGQ.jobs.length) {
var J = WLGQ.jobs.shift(), r;
try {
do {
r = J.next();
} while (!r.done);
}
catch (e) {
if (window.console)
console.warn("[let go]", e);
}
} }
function worldLetGoListsGen(cb, onProp) { return __ZC(159, 13, this, arguments, new.target); }
function worldLetGoFnsGen(visit) { return __ZC(159, 14, this, arguments, new.target); }
function worldForgetFnsGen(fns) { return __ZC(159, 15, this, arguments, new.target); }
function worldForgetGen(G, pre) { return __ZC(159, 16, this, arguments, new.target); }
function worldHome(msg) { return __ZC(159, 17, this, arguments, new.target); }
function worldSkyHide(own) {
[typeof sunDisc !== "undefined" ? sunDisc : null, typeof moonDisc !== "undefined" ? moonDisc : null].forEach(function (d) {
if (!d)
return;
if (own) {
if (d.userData.wKeep === undefined)
d.userData.wKeep = 1;
d.visible = false;
}
});
if (!own && typeof tickClock === "function")
tickClock(true);
}
function worldEnv(E) { return __ZC(159, 18, this, arguments, new.target); }
function worldHudEl() { return __ZC(159, 19, this, arguments, new.target); }
function worldBanner(html) { worldHudEl(); var h = WLD.hud; if (!html) {
h.style.display = "none";
return;
} if (h.dataset.h !== html) {
h.dataset.h = html;
h.innerHTML = html;
} h.style.display = "block"; }
function worldPrompt(html, fn) {
worldHudEl();
var p = WLD.prompt;
if (!html) {
p.style.display = "none";
WLD.promptFn = null;
return;
}
if (p.dataset.h !== html) {
p.dataset.h = html;
p.innerHTML = html;
}
p.style.display = "block";
p.onclick = fn;
WLD.promptFn = fn;
}
function worldCard(html, fns) { return __ZC(159, 20, this, arguments, new.target); }
function worldBtn(name, label, sub) {
return "<div data-w='" + name + "' role='button' tabindex='0' style='margin:6px 0;padding:7px 10px;border:1px solid rgba(143,180,232,.5);border-radius:4px;background:rgba(143,180,232,.08)'><b>" + label + "</b>" + (sub ? "<div style='opacity:.75;font-size:12px'>" + sub + "</div>" : "") + "</div>";
}
function worldFacts(title, sub, rows, notes, extra) { return __ZC(159, 21, this, arguments, new.target); }
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (!WLD.on || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if ((e.code === "KeyE" || e.code === "Enter") && WLD.promptFn) {
e.preventDefault();
e.stopImmediatePropagation();
WLD.promptFn();
return;
}
if (WLD.w && WLD.w.key_ && WLD.w.key_(e)) {
e.preventDefault();
e.stopImmediatePropagation();
}
}, true);
(function () {
if (typeof supportAt === "function") {
var sa = supportAt;
supportAt = function (x, z, feet) {
if (WLD.on && !store.inside && worldInRange(x) && WLD.w.ground) {
var h = WLD.w.ground(x - WLD.w.base, z, feet);
if (h !== null && h !== undefined)
return h;
}
return sa.apply(this, arguments);
};
}
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (WLD.on && !store.inside && worldInRange(x)) {
var W = WLD.w, lx = x - W.base;
if (W.bound && (lx * lx + z * z) > W.bound * W.bound)
return true;
if (W.solids && worldSolidAt(W.solids, lx, z, feet))
return true;
if (W.block && W.block(lx, z, feet))
return true;
return false;
}
return ba.apply(this, arguments);
};
}
if (typeof groundTick === "function") {
var gt = groundTick;
groundTick = function (dt) {
var P = camera.position;
if (!WLD.on || !WLD.hop)
return gt.apply(this, arguments);
P.y -= WLD.hop;
var r = gt.apply(this, arguments);
P.y += WLD.hop;
return r;
};
}
})();
var WSA_C = 8;
function wsaGrid(list) { return __ZC(159, 22, this, arguments, new.target); }
function wsaTest(s, x, z, feet) { return __ZC(159, 23, this, arguments, new.target); }
function worldSolidAt(list, x, z, feet) {
if (list && list.length > 96 && isFinite(x) && isFinite(z)) {
var G = wsaGrid(list);
if (G) {
var c = G.m.get(Math.floor(x / WSA_C) * 65536 + Math.floor(z / WSA_C)), i;
if (c)
for (i = 0; i < c.length; i++)
if (wsaTest(c[i], x, z, feet))
return true;
for (i = 0; i < G.big.length; i++)
if (wsaTest(G.big[i], x, z, feet))
return true;
return false;
}
}
for (var i = 0; i < list.length; i++) {
var s = list[i];
if (s.h !== undefined && feet > (s.b || 0) + s.h - 0.3)
continue;
if (s.b !== undefined && feet + 1.7 < s.b)
continue;
var dx = x - s.x, dz = z - s.z;
if (s.r !== undefined) {
if (dx * dx + dz * dz < (s.r + 0.35) * (s.r + 0.35))
return true;
continue;
}
var c = Math.cos(-(s.rot || 0)), sn = Math.sin(-(s.rot || 0)), lx = dx * c + dz * sn, lz = -dx * sn + dz * c;
if (Math.abs(lx) < s.hw + 0.35 && Math.abs(lz) < s.hd + 0.35)
return true;
}
return false;
}
function worldHopTick(dt, g) { return __ZC(159, 24, this, arguments, new.target); }
function worldTick(dt) {
if (!WLD.on)
return;
var W = WLD.w;
if (!walkMode) {
if (WLD.hud)
WLD.hud.style.display = "none";
worldPrompt(null);
return;
}
WLD.t += dt;
if (W.env)
worldEnv(typeof W.env === "function" ? W.env(dt) : W.env);
if (W.gravity)
worldHopTick(dt, W.gravity);
try {
W.tick(dt);
}
catch (e) {
if (window.console)
console.warn("world:", WLD.on, e);
}
}
if (typeof backRegister === "function")
backRegister({ order: 4, open: function () {
if (!WLD.on || !walkMode)
return false;
if (WLD.card && WLD.card.style.display === "block")
return true;
if (typeof BACK_KEEP !== "undefined" && BACK_KEEP)
return false;
if ((typeof talkOpen !== "undefined" && talkOpen) || (typeof greetOpen !== "undefined" && greetOpen))
return false;
return true;
}, close: function () {
var W = WLD.w;
if (WLD.card && WLD.card.style.display === "block") {
worldCard(null);
return;
}
if (W && W.back) {
W.back();
return;
}
worldHome();
} });
["visitRealm", "toSomnucor", "toHall", "newDream"].forEach(function (n) {
if (typeof window[n] !== "function")
return;
var f = window[n];
window[n] = function () { if (WLD.on)
worldOff(true); return f.apply(this, arguments); };
});
(function () {
var sw = setWalk;
setWalk = function (on) {
var was = WLD.on, r = sw.apply(this, arguments);
if (!on && was) {
if (WLD.hud)
WLD.hud.style.display = "none";
worldPrompt(null);
worldCard(null);
}
if (on && was && !worldInRange(camera.position.x))
worldOff(true);
return r;
};
})();
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
worldTick(dt);
}
catch (e) {
if (window.console)
console.warn("worlds:", e);
} };
})();
(function () {
if (typeof trfInCity === "function") {
var ic = trfInCity;
trfInCity = function () { return !WLD.on && ic.apply(this, arguments); };
}
})();
function wM(col, o) { o = o || {}; var m = new THREE.MeshLambertMaterial({ color: col }); if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
} if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
} if (o.ds)
m.side = THREE.DoubleSide; if (o.map)
m.map = o.map; return m; }
function wB(col, o) { o = o || {}; var m = new THREE.MeshBasicMaterial({ color: col, fog: o.fog !== undefined ? o.fog : true }); if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = !!o.dw;
} if (o.add)
m.blending = THREE.AdditiveBlending; if (o.ds)
m.side = THREE.DoubleSide; if (o.map)
m.map = o.map; return m; }
function wMesh(geo, mat, x, y, z, parent) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (parent)
parent.add(m); return m; }
function wBox(w, h, d, mat, x, y, z, parent) { return wMesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z, parent); }
function wCyl(rt, rb, h, mat, x, y, z, parent, seg) { return wMesh(new THREE.CylinderGeometry(rt, rb, h, seg || 12), mat, x, y, z, parent); }
function wSph(r, mat, x, y, z, parent, seg) { return wMesh(new THREE.SphereGeometry(r, seg || 16, Math.max(8, (seg || 16) * 0.6 | 0)), mat, x, y, z, parent); }
function wCone(r, h, mat, x, y, z, parent, seg) { return wMesh(new THREE.ConeGeometry(r, h, seg || 10), mat, x, y, z, parent); }
function wRand(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s % 100000) / 100000; }; }
var W_SEGBOX = typeof WeakMap !== "undefined" ? new WeakMap() : null;
function wSegBoxes(P) { return __ZC(159, 25, this, arguments, new.target); }
function wSegFar(B, i, x, z, b) { if (!B)
return false; var o = i * 4; if (B[o] === B[o + 1] && B[o + 2] === B[o + 3])
return false; var ex = x < B[o] ? B[o] - x : x > B[o + 1] ? x - B[o + 1] : 0, ez = z < B[o + 2] ? B[o + 2] - z : z > B[o + 3] ? z - B[o + 3] : 0; return ex * ex + ez * ez > b * b * (1 + 1e-9) + 1e-9; }
function wNoise(x, z, seed) {
function h(i, j) { var n = (i * 374761393 + j * 668265263 + (seed || 0) * 982451653) | 0; n = (n ^ (n >>> 13)) * 1274126177 | 0; return ((n ^ (n >>> 16)) >>> 0) / 4294967295; }
var xi = Math.floor(x), zi = Math.floor(z), xf = x - xi, zf = z - zi;
var u = xf * xf * (3 - 2 * xf), v = zf * zf * (3 - 2 * zf);
var a = h(xi, zi), b = h(xi + 1, zi), c = h(xi, zi + 1), d = h(xi + 1, zi + 1);
return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function wFbm(x, z, seed, oct) { var t = 0, a = 0.5, f = 1; for (var i = 0; i < (oct || 4); i++) {
t += a * wNoise(x * f, z * f, (seed || 0) + i * 17);
f *= 2;
a *= 0.5;
} return t; }
function wGround(s, n, fn, mat) { return __ZC(159, 26, this, arguments, new.target); }
function wTex(w, h, fn, rep) {
var cv = document.createElement("canvas");
cv.width = w;
cv.height = h;
var x = cv.getContext("2d");
fn(x, w, h);
var t = new THREE.CanvasTexture(cv);
if (rep) {
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(rep[0], rep[1]);
}
return t;
}
function wGlow(col, size, op) {
var mat = new THREE.SpriteMaterial({ map: (typeof softGlow === "function" ? softGlow() : null), color: col, transparent: true, opacity: op === undefined ? 0.8 : op, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
var s = new THREE.Sprite(mat);
s.scale.set(size, size, 1);
return s;
}
function wSign(lines, w, h, bg, fg) {
var t = wTex(512, Math.round(512 * h / w), function (x, W, H) {
x.fillStyle = bg || "#2A2018";
x.fillRect(0, 0, W, H);
x.strokeStyle = fg || "#E8D8A8";
x.lineWidth = 8;
x.strokeRect(6, 6, W - 12, H - 12);
x.fillStyle = fg || "#E8D8A8";
x.textAlign = "center";
x.textBaseline = "middle";
var n = lines.length;
lines.forEach(function (l, i) { var big = i === 0; x.font = (big ? "bold " : "") + Math.round(H / (n + 1.2) * (big ? 0.62 : 0.42)) + "px Georgia"; x.fillText(l, W / 2, H * (i + 1) / (n + 1)); });
});
return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }));
}
function wPoints(n, fn, col, size, att) { return __ZC(159, 27, this, arguments, new.target); }
function wWater(size, seg, col, amp, opts) { return __ZC(159, 28, this, arguments, new.target); }
function wWaterTick(w, cx, cz, t, ox) { return __ZC(159, 29, this, arguments, new.target); }
function wWaveAt(w, x, z, t) { var a = w.userData.amp; return a * (Math.sin(x * 0.045 + t * 1.1) * 0.6 + Math.sin(z * 0.06 - t * 0.9) * 0.5 + Math.sin((x + z) * 0.11 + t * 1.7) * 0.25); }
function wNear(lx, lz, x, z, r) { var dx = lx - x, dz = lz - z; return dx * dx + dz * dz < r * r; }
function wPickNear(list, L, rOf) { return __ZC(159, 30, this, arguments, new.target); }
function wFace(o, x, z) { o.rotation.y = Math.atan2(x - o.position.x, z - o.position.z); }
function wPerson(seed, o) { return __ZC(159, 31, this, arguments, new.target); }
function wWander(g, dt, ground, opt) {
var u = g.userData.wan || (g.userData.wan = { hx: g.position.x, hz: g.position.z, tx: g.position.x, tz: g.position.z, wait: Math.random() * 4, r: (opt && opt.r) || 8, sp: (opt && opt.sp) || 1.2 });
if (u.wait > 0) {
u.wait -= dt;
return;
}
var dx = u.tx - g.position.x, dz = u.tz - g.position.z, d = Math.hypot(dx, dz);
if (d < 0.3) {
u.wait = 2 + Math.random() * 6;
var a = Math.random() * 6.283, r = Math.random() * u.r;
u.tx = u.hx + Math.cos(a) * r;
u.tz = u.hz + Math.sin(a) * r;
return;
}
var st = Math.min(d, u.sp * dt);
g.position.x += dx / d * st;
g.position.z += dz / d * st;
g.rotation.y = Math.atan2(dx, dz);
if (ground)
g.position.y = ground(g.position.x, g.position.z);
}
function wTalk(t) { return __ZC(159, 32, this, arguments, new.target); }
