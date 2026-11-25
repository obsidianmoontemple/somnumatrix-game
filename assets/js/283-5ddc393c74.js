/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var LD = { rid: null, kind: null, g: null, solids: [], talkers: [], movers: [], ox: 0, oz: 0, sig: "", chk: 0, t: 0, queue: null, near: null, busy: false };
var LD_SETS = {};
function ldRand(seed) { var s = (seed >>> 0) || 7; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s % 100000) / 100000; }; }
function ldY(x, z) { try {
return (typeof terrainY === "function") ? (terrainY(LD.ox + x, LD.oz + z) || 0) : 0;
}
catch (e) {
return 0;
} }
function ldMat(col, o) { o = o || {}; var m = new THREE.MeshLambertMaterial({ color: col, flatShading: !!o.flat }); if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 0.6;
} if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
} if (o.ds)
m.side = THREE.DoubleSide; return m; }
function ldGlowMat(col, op) { return new THREE.MeshBasicMaterial({ color: col, transparent: op !== undefined, opacity: op === undefined ? 1 : op, depthWrite: op === undefined }); }
function ldRealm() {
if (typeof WLD !== "undefined" && WLD.on)
return null;
if (typeof store === "undefined" || store.inside)
return null;
if (typeof INT !== "undefined" && INT)
return null;
if (typeof MALL !== "undefined" && MALL.on)
return null;
if (typeof UG2 !== "undefined" && UG2.on)
return null;
var r = (store.here && typeof realmById === "function") ? realmById(store.here) : null;
return (r && LD_SETS[r.kind]) ? r : null;
}
function ldTaken(r) { return __ZC(283, 0, this, arguments, new.target); }
function ldSig(r) { var n = 0, sx = 0; (store.objects || []).forEach(function (o) { if ((o.realm || 0) === r.id) {
n++;
sx += Math.round(o.x);
} }); return n + ":" + sx; }
function ldClear(taken, x, z, rad) {
for (var i = 0; i < taken.length; i++) {
var t = taken[i], dx = x - t[0], dz = z - t[1], m = t[2] + rad;
if (dx * dx + dz * dz < m * m)
return false;
}
return true;
}
function ldPlan() { return __ZC(283, 1, this, arguments, new.target); }
function ldAlong(pts, every, fn) { return __ZC(283, 2, this, arguments, new.target); }
function ldNeed(it) {
if (it.t === "k") {
var d = KIT[it.a];
return Math.max(d.size[0], d.size[2]) * it.s * 0.5;
}
if (it.t === "p" || it.t === "b")
return 0.8;
if (it.t === "s")
return 1.2;
if (it.t === "m")
return it.r;
return 0;
}
function ldStrip(pts, w, lift, yfn) { return __ZC(283, 3, this, arguments, new.target); }
function ldSolidsFor(it, x, z) { return __ZC(283, 4, this, arguments, new.target); }
function ldPress(g) { return __ZC(283, 5, this, arguments, new.target); }
function ldBuild(r) { return __ZC(283, 6, this, arguments, new.target); }
function ldPut(it, still, live, taken) { return __ZC(283, 7, this, arguments, new.target); }
function ldDrop() { return __ZC(283, 8, this, arguments, new.target); }
function ldShared(geo) { for (var k in FIGGEO)
if (FIGGEO[k] === geo)
return true; return false; }
function ldTick(dt) {
var r = ldRealm();
if (!r) {
if (LD.g && (store.here !== LD.rid || (typeof WLD !== "undefined" && WLD.on)))
ldDrop();
else if (LD.prompted) {
worldPrompt(null);
LD.prompted = false;
LD.near = null;
}
return;
}
LD.t += dt;
if (LD.rid !== r.id) {
ldBuild(r);
return;
}
LD.chk += dt;
if (LD.chk > 3) {
LD.chk = 0;
var sg = ldSig(r);
if (sg !== LD.sig)
ldBuild(r);
}
LD.movers.forEach(function (M) { if (M.wander && typeof wWander === "function")
wWander(M.g, dt, function (x, z) { return ldY(x, z); }, M.wander); });
if (LD.g)
LD.g.traverse(function (m) { var a = m.userData.ldAnim; if (a)
a(m, LD.t, dt); });
if (typeof walkMode === "undefined" || !walkMode || (typeof talkOpen !== "undefined" && talkOpen) || (typeof WLD !== "undefined" && WLD.card && WLD.card.style.display === "block")) {
if (LD.prompted) {
worldPrompt(null);
LD.prompted = false;
}
LD.near = null;
return;
}
var P = camera.position, lx = P.x - LD.ox, lz = P.z - LD.oz, got = null, best = 1e9;
LD.talkers.forEach(function (T) { var x = T.p ? T.p.g.position.x : T.x, z = T.p ? T.p.g.position.z : T.z, d = Math.hypot(lx - x, lz - z); if (d < T.r && d < best) {
best = d;
got = T;
} });
if (got !== LD.near) {
LD.near = got;
if (got) {
LD.prompted = true;
worldPrompt("<b>" + esc(got.name) + "</b> · <b>press E</b> to " + (got.verb || (got.card ? "look" : "talk")), function () { ldUse(got); });
}
else if (LD.prompted) {
worldPrompt(null);
LD.prompted = false;
}
}
}
function ldUse(T) { return __ZC(283, 9, this, arguments, new.target); }
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (!LD.near || !LD.g || (typeof WLD !== "undefined" && WLD.on))
return;
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code === "KeyE" || e.code === "Enter") {
e.preventDefault();
e.stopImmediatePropagation();
ldUse(LD.near);
}
}, true);
(function () {
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (LD.g && LD.solids.length && store.here === LD.rid && !store.inside && !(typeof INT !== "undefined" && INT) && !(typeof WLD !== "undefined" && WLD.on)) {
if (typeof worldSolidAt === "function" && worldSolidAt(LD.solids, x - LD.ox, z - LD.oz, feet - ldY(x - LD.ox, z - LD.oz)))
return true;
}
return ba.apply(this, arguments);
};
}
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
ldTick(dt);
}
catch (e) {
if (window.console)
console.warn("land-dress:", e);
} };
}
})();
function ldWho(name, land, who, greet, extra) { return __ZC(283, 10, this, arguments, new.target); }
function ldBloom(n, w, d, col, stem, seed, h) { return __ZC(283, 11, this, arguments, new.target); }
function ldJetty(len, w, col) { return __ZC(283, 12, this, arguments, new.target); }
function ldFlame(G, x, y, z, s, col) { return __ZC(283, 13, this, arguments, new.target); }
function ldHalo(G, x, y, z, col, size, op) { if (typeof wGlow !== "function")
return null; var s = wGlow(col, size, op === undefined ? 0.55 : op); s.position.set(x, y, z); G.add(s); return s; }
LD_SETS.underworld = function (P) { return __ZC(283, 14, this, arguments, new.target); };
LD_SETS.heavens = function (P) { return __ZC(283, 15, this, arguments, new.target); };
LD_SETS.depths = function (P) { return __ZC(283, 16, this, arguments, new.target); };
LD_SETS.faerie = function (P) { return __ZC(283, 17, this, arguments, new.target); };
LD_SETS.void = function (P) { return __ZC(283, 18, this, arguments, new.target); };
LD_SETS.mirror = function (P) { return __ZC(283, 19, this, arguments, new.target); };
LD_SETS.dead = function (P) { return __ZC(283, 20, this, arguments, new.target); };
LD_SETS.frozen = function (P) { return __ZC(283, 21, this, arguments, new.target); };
LD_SETS.elsewhere = function (P) { return __ZC(283, 22, this, arguments, new.target); };
LD_SETS.fire = function (P) { return __ZC(283, 23, this, arguments, new.target); };
LD_SETS.stars = function (P) { return __ZC(283, 24, this, arguments, new.target); };
LD_SETS.wasteland = function (P) { return __ZC(283, 25, this, arguments, new.target); };
LD_SETS.desert = function (P) { return __ZC(283, 26, this, arguments, new.target); };
LD_SETS.station = function (P) { return __ZC(283, 27, this, arguments, new.target); };
LD_SETS.future = function (P) { return __ZC(283, 28, this, arguments, new.target); };
LD_SETS.templerow = function (P) { return __ZC(283, 29, this, arguments, new.target); };
if (typeof REALMS !== "undefined" && REALMS.underworld && REALMS.underworld.amb < 0.6) {
REALMS.underworld.amb = 0.6;
REALMS.underworld.dens = 1.15;
}
