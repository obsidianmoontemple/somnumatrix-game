/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var LCY = { set: { trash: 1, sweep: 1, works: 1, build: 1, deliver: 1, post: 1, night: 1, busy: 1 }, setAt: 0,
root: null, built: false, day: -1, crews: [], sites: [], talk: null, near: null, nearAt: 0, mats: {}, cull: 0 };
var LCY_FIRST = ["Bert", "Alf", "Doreen", "Sid", "Maggie", "Reg", "Pat", "Kenny", "Joyce", "Vince", "Rita", "Stan", "Hilda", "Dougie", "Mo", "Tess",
"Ray", "Brenda", "Ollie", "Nell", "Clive", "Shirley", "Tommo", "Gwen", "Frank", "Ivy", "Les", "Mags", "Dev", "Priya", "Kofi", "Ana"];
var LCY_LAST = ["Higgins", "Platt", "Dobbs", "Mallory", "Okafor", "Pike", "Rudd", "Shaw", "Tilley", "Varga", "Whitlock", "Yates", "Bains", "Cobb", "Fenn", "Gage"];
function lcyHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function lcyName(seed) { var h = lcyHash("n" + seed); return LCY_FIRST[h % LCY_FIRST.length] + " " + LCY_LAST[(h >>> 8) % LCY_LAST.length]; }
function lcyOff() { return (typeof CITYCLOCK !== "undefined" && CITYCLOCK.offset !== null && CITYCLOCK.offset !== undefined) ? CITYCLOCK.offset : -new Date().getTimezoneOffset(); }
function lcyHourAbs() { return Date.now() / 3600000 + lcyOff() / 60; }
function lcyDay() { return Math.floor(lcyHourAbs() / 24); }
function lcyHour() { return typeof cityHourNow === "function" ? cityHourNow() : ((lcyHourAbs() % 24) + 24) % 24; }
function lcyLite() { return typeof LITE !== "undefined" && !!LITE; }
function lcyOn(k) { return !!LCY.set[k]; }
function lcyPos(r, a) { var x = ATLC.x + Math.cos(a) * r, z = ATLC.z + Math.sin(a) * r; return { x: x, z: z, y: terrainY(x, z) }; }
function lcyFace(a, dir) { return Math.atan2(-Math.sin(a) * dir, Math.cos(a) * dir); }
function lcyStreets() { var L = []; if (typeof ATL_STREETS === "undefined")
return [740, 1080, 1280, 1620]; Object.keys(ATL_STREETS).forEach(function (k) { ATL_STREETS[k].forEach(function (r) { L.push(r); }); }); return L.sort(function (a, b) { return a - b; }); }
function lcyKerb() { return (typeof ROAD_SIDE !== "undefined" && ROAD_SIDE < 0) ? "right" : "left"; }
function lcyLoad() { return __ZC(380, 0, this, arguments, new.target); }
function lcyMat(hex, em) {
var k = hex + "|" + (em || 0);
if (LCY.mats[k])
return LCY.mats[k];
var m = new THREE.MeshLambertMaterial({ color: hex });
if (em) {
m.emissive = new THREE.Color(em);
m.emissiveIntensity = 0.2;
}
return (LCY.mats[k] = m);
}
function lcyStripes() { return __ZC(380, 1, this, arguments, new.target); }
function lcySignMat(lines, bg, fg) { return __ZC(380, 2, this, arguments, new.target); }
function lcyBox(w, h, d, mat, x, y, z) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x || 0, y || 0, z || 0); m.raycast = function () { }; return m; }
function lcyCyl(r1, r2, h, mat, x, y, z, seg) { var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg || 10), mat); m.position.set(x || 0, y || 0, z || 0); m.raycast = function () { }; return m; }
function lcyCone() {
var g = new THREE.Group();
g.add(lcyCyl(0.03, 0.17, 0.62, lcyMat(0xF26A1B), 0, 0.33, 0, 12));
g.add(lcyCyl(0.08, 0.11, 0.12, lcyMat(0xF4F4F0), 0, 0.38, 0, 12));
g.add(lcyBox(0.42, 0.04, 0.42, lcyMat(0x1E1E1E), 0, 0.02, 0));
return g;
}
function lcyBarrier() { return __ZC(380, 3, this, arguments, new.target); }
function lcyBin() { return __ZC(380, 4, this, arguments, new.target); }
function lcyTool(kind) {
var g = new THREE.Group(), wood = lcyMat(0x8A6338), steel = lcyMat(0x8E949A);
if (kind === "broom") {
g.add(lcyCyl(0.02, 0.02, 1.3, wood, 0, 0.65, 0, 6));
g.add(lcyBox(0.5, 0.08, 0.12, lcyMat(0x5A4428), 0, 0.03, 0));
}
else if (kind === "shovel") {
g.add(lcyCyl(0.02, 0.02, 1.1, wood, 0, 0.62, 0, 6));
g.add(lcyBox(0.24, 0.3, 0.03, steel, 0, 0.05, 0));
}
else if (kind === "drill") {
g.add(lcyCyl(0.08, 0.08, 0.5, lcyMat(0xC9302C), 0, 0.55, 0, 10));
g.add(lcyCyl(0.02, 0.02, 0.5, steel, 0, 0.12, 0, 6));
g.add(lcyBox(0.5, 0.04, 0.04, steel, 0, 0.82, 0));
}
else if (kind === "board") {
g.add(lcyCyl(0.02, 0.02, 1.5, lcyMat(0x222222), 0, 0.75, 0, 6));
var f = lcyBox(0.5, 0.5, 0.03, lcySignMat(["STOP"], "#C8231C", "#FFFFFF"), 0, 1.6, 0.02), b = lcyBox(0.5, 0.5, 0.03, lcySignMat(["GO"], "#1F8A3A", "#FFFFFF"), 0, 1.6, -0.02);
g.add(f);
g.add(b);
}
else if (kind === "bag") {
g.add(lcyBox(0.36, 0.3, 0.14, lcyMat(0xB8261E), 0, 0, 0));
}
else if (kind === "parcel") {
g.add(lcyBox(0.42, 0.32, 0.34, lcyMat(0xB08A5A), 0, 0, 0));
g.add(lcyBox(0.43, 0.05, 0.35, lcyMat(0xD9C79A), 0, 0.06, 0));
}
else if (kind === "lantern") {
g.add(lcyBox(0.16, 0.22, 0.16, lcyMat(0x2A2620), 0, 0, 0));
var gl = lcyBox(0.12, 0.16, 0.12, new THREE.MeshBasicMaterial({ color: 0xFFC870 }), 0, 0, 0);
g.add(gl);
}
g.traverse(function (m) { m.raycast = function () { }; });
return g;
}
function lcyMan(seed, kit) {
if (typeof buildFigure !== "function")
return null;
var L = typeof randomLook === "function" ? randomLook("lcy_" + seed, "human") : {};
L.age = "adult";
var tops = { hivis: 0xF07818, site: 0xF2C12E, post: 0x23324F, van: 0x3B5A8C, watch: 0x2B2F3A };
if (tops[kit.dress] !== undefined)
L.top = tops[kit.dress];
L.bottom = kit.dress === "post" ? 0x23324F : kit.dress === "watch" ? 0x1E2026 : 0x2A3448;
var g;
try {
g = buildFigure({ id: "__lcy_" + seed, archetype: "human", attrs: {}, look: L, solid: false, detail: lcyLite() ? 2 : 3, nights: [] }, 1);
}
catch (e) {
return null;
}
g.traverse(function (m) { m.raycast = function () { }; });
if (kit.helmet) {
var hm = new THREE.Mesh(new THREE.SphereGeometry(0.135, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), lcyMat(kit.helmet));
hm.position.y = 1.75;
hm.raycast = function () { };
g.add(hm);
}
if (kit.dress === "hivis" || kit.dress === "site") {
g.add(lcyBox(0.36, 0.04, 0.25, lcyMat(0xDDE3E6), 0, 1.18, 0));
}
if (kit.dress === "watch") {
var hat = lcyCyl(0.12, 0.13, 0.12, lcyMat(0x15171C), 0, 1.86, 0, 12);
g.add(hat);
}
if (kit.tool) {
var t = lcyTool(kit.tool), ra = g.userData.limbs && g.userData.limbs.ra;
if (kit.tool === "bag") {
t.position.set(-0.26, 0.95, 0);
g.add(t);
}
else if (kit.tool === "board" || kit.tool === "drill" || kit.tool === "shovel" || kit.tool === "broom") {
t.position.set(0.32, 0, 0.28);
g.add(t);
}
else if (ra) {
t.position.set(0, -0.62, 0.05);
ra.add(t);
}
else {
t.position.set(0.3, 0.8, 0.1);
g.add(t);
}
g.userData.tool = t;
}
g.userData.lcyName = lcyName(seed);
return g;
}
function lcySwing(g, t, amp, f) { var lm = g && g.userData.limbs; if (!lm)
return; var s = Math.sin(t * f) * amp; if (lm.ll)
lm.ll.rotation.x = s; if (lm.rl)
lm.rl.rotation.x = -s; if (lm.la)
lm.la.rotation.x = -s * 0.6; if (lm.ra)
lm.ra.rotation.x = s * 0.6; }
function lcyStill(g) { var lm = g && g.userData.limbs; if (!lm)
return; ["ll", "rl", "la", "ra"].forEach(function (k) { if (lm[k])
lm[k].rotation.x = 0; }); }
function lcyArms(g, v) { var lm = g && g.userData.limbs; if (!lm)
return; if (lm.la)
lm.la.rotation.x = v; if (lm.ra)
lm.ra.rotation.x = v; }
function lcyVan(arch, seed) {
if (typeof build !== "function" || !KIT[arch])
return null;
var spec = { id: "lcyv" + seed, archetype: arch, attrs: {}, x: ATLC.x, z: ATLC.z, rot: 0, solid: false, detail: 3, nights: [], city: true, traffic: true };
var g = build(spec);
g.traverse(function (m) { m.raycast = function () { }; });
g.userData.lcyArch = arch;
return g;
}
function lcyBinLorry(seed) { return __ZC(380, 5, this, arguments, new.target); }
function lcyInHours(hrs, h) { for (var i = 0; i < hrs.length; i++) {
var s = hrs[i][0], l = hrs[i][1];
if ((((h - s) % 24) + 24) % 24 < l)
return { since: (((h - s) % 24) + 24) % 24 };
} return null; }
function lcyRound(sec, L, v, W) {
var per = L / v + W, n = Math.floor(sec / per), rem = sec - n * per;
if (rem < L / v)
return { d: n * L + rem * v, stop: -1, n: n };
return { d: (n + 1) * L, stop: (rem - L / v) / W, n: n + 1 };
}
function lcyCrew(kind, i, streets) { return __ZC(380, 6, this, arguments, new.target); }
function lcyCrewTick(C, h, t, P) { return __ZC(380, 7, this, arguments, new.target); }
function lcyStand() { return __ZC(380, 8, this, arguments, new.target); }
function lcyClear(x, z, rad) { var S = lcyStand(); for (var i = 0; i < S.length; i++) {
var q = S[i], dx = q.x - x, dz = q.z - z, m = q.r + rad;
if (dx * dx + dz * dz < m * m)
return false;
} return true; }
function lcyWorks(i, streets) { return __ZC(380, 9, this, arguments, new.target); }
function lcyBuildSite(i, streets) { return __ZC(380, 10, this, arguments, new.target); }
function lcySiteTick(S, h, t) { return __ZC(380, 11, this, arguments, new.target); }
function lcyClearAll() {
if (LCY.root && LCY.root.parent)
LCY.root.parent.remove(LCY.root);
LCY.root = null;
LCY.crews = [];
LCY.sites = [];
LCY.built = false;
LCY.stand = null;
lcyPrompt(null);
}
function lcyBuild() { return __ZC(380, 12, this, arguments, new.target); }
function lcyTick(dt) {
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
if (!r || typeof ATLC === "undefined" || !ATLC) {
if (LCY.built)
lcyClearAll();
return;
}
if (!LCY.built) {
if (typeof atlMeshQueue === "undefined" || !atlMeshQueue.length) {
lcyLoad();
lcyBuild();
}
return;
}
lcyLoad();
if (lcyDay() !== LCY.day || LCY.busyAt !== Math.max(0.5, Math.min(2, +LCY.set.busy || 1))) {
lcyBuild();
return;
}
var inCity = (store.here || 0) === r.id && !store.inside;
LCY.root.visible = inCity;
if (!inCity) {
lcyPrompt(null);
return;
}
var P = camera.position, h = lcyHour(), t = performance.now() / 1000;
var cull = true;
var reach = lcyLite() ? 170 : 260;
LCY.crews.forEach(function (C) {
if (cull) {
var dx = (C.x === undefined ? 1e9 : C.x) - P.x, dz = (C.z === undefined ? 1e9 : C.z) - P.z;
C.cullOk = dx * dx + dz * dz < reach * reach;
}
try {
lcyCrewTick(C, h, t, P);
}
catch (e) {
C.g.visible = false;
}
});
LCY.sites.forEach(function (S) {
if (cull) {
var dx = S.x - P.x, dz = S.z - P.z;
S.cullOk = dx * dx + dz * dz < (reach + 60) * (reach + 60);
}
try {
lcySiteTick(S, h, t);
}
catch (e) {
S.g.visible = false;
}
});
LCY.nearAt -= dt;
if (LCY.nearAt <= 0) {
LCY.nearAt = 0.5;
lcyNear(P, h);
}
}
function lcyNear(P) { return __ZC(380, 13, this, arguments, new.target); }
function lcyPersona(b) { return __ZC(380, 14, this, arguments, new.target); }
function lcyPrompt(b) { return __ZC(380, 15, this, arguments, new.target); }
function lcyGreet(b) { return __ZC(380, 16, this, arguments, new.target); }
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) {
try {
return tt.apply(this, arguments);
}
finally {
try {
LCY.ticks = (LCY.ticks || 0) + 1;
lcyTick(dt);
}
catch (e) {
if (!LCY.warned) {
LCY.warned = true;
if (window.console)
console.warn("[living-city]", e);
}
}
}
};
})();
(function () {
if (typeof vltCandidates !== "function")
return;
var vc = vltCandidates;
vltCandidates = function () {
var out = vc.apply(this, arguments);
try {
LCY.crews.forEach(function (C) {
if (!C.veh || !C.g.visible || typeof vltClassOf !== "function" || !vltClassOf(C.veh.userData.lcyArch))
return;
out.push({ g: C.veh, arch: C.veh.userData.lcyArch, st: function () { return { v: C.v || 0, brake: !!C.wait, ind: C.wait ? lcyKerb() : null, rev: false }; } });
});
}
catch (e) { }
return out;
};
})();
