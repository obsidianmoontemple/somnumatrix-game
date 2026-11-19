/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
function cityFrontage(C, key, rs, k0, sides) {
var wp = WP_BY_KEY[key];
if (!wp)
return null;
var w = kitW(wp.arch, wp.s), d = kitD(wp.arch, wp.s);
var stand = store.objects.filter(function (o) { return o.realm === C.r.id && KIT[o.archetype] && KIT[o.archetype].cat !== "being" && !(typeof NOWALL !== "undefined" && NOWALL[o.archetype] && o.archetype !== "signboard"); })
.map(function (o) { var k = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1; return { x: o.x, z: o.z, r: Math.max(k.size[0] * (o.attrs && o.attrs.w || 1), k.size[2] * (o.attrs && o.attrs.d || 1)) * s * 0.5 }; });
function clear(rr, a, rad) {
if (!atlClearAt(rr, a, rad, 4))
return false;
var x = C.h.x + Math.cos(a) * rr, z = C.h.z + Math.sin(a) * rr;
for (var i = 0; i < stand.length; i++) {
var q = stand[i], dx = q.x - x, dz = q.z - z, m = q.r + rad;
if (dx * dx + dz * dz < m * m)
return false;
}
return true;
}
var main = ATL_STAIRS.filter(function (s) { return s.main; }), got = null;
(sides || [1, -1]).forEach(function (side) {
if (got)
return;
var rb = rs + side * (ATL_ROAD + ATL_SETBACK + d / 2), rad = Math.max(w, d) / 2 + 3;
for (var k = 0; k < main.length && !got; k++) {
for (var t = 0; t < (Math.PI / 4) * rb && !got; t += 3) {
var a = main[(k + k0) % main.length].a + (ATL_MAIN_HALF + w / 2 + 8 + t) / rb;
if (clear(rb, a, rad))
got = { side: side, a: a, rb: rb };
}
}
});
if (!got)
return null;
var f = C.workplace(key, rs, got.side, got.a);
if (!f || !f.spec)
return null;
return { spec: f.spec, a: got.a, side: got.side, rs: rs, w: w, d: d };
}
var CITY_MORE = [];
function cityMore(pre, fn) { CITY_MORE.push({ pre: pre, fn: fn }); }
(function () {
if (typeof atlTransit !== "function")
return;
var tr = atlTransit;
atlTransit = function (C) {
tr(C);
CITY_MORE.forEach(function (q) {
var keepSeq = C.seq, keepPre = C.pre;
C.pre = q.pre;
C.seq = 0;
try {
q.fn(C);
}
catch (e) {
if (window.console)
console.warn("city:", q.pre, e);
}
finally {
C.pre = keepPre;
C.seq = keepSeq;
}
});
};
})();
function cityWorkplace(w) {
if (typeof WORKPLACES === "undefined" || typeof WP_BY_KEY === "undefined" || WP_BY_KEY[w.key])
return;
WORKPLACES.push(w);
WP_BY_KEY[w.key] = w;
if (typeof WP_BY_JOB !== "undefined")
w.jobs.forEach(function (j) { WP_BY_JOB[j] = w.key; });
}
function cityPlaceOf(key) {
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (o.workplace === key && o.city)
return o;
}
return null;
}
var DECOR_KEY = "The Decorators' Guild";
cityWorkplace({ key: DECOR_KEY, ring: "commons", arch: "shop", s: 1.6, jobs: [1600, 1601], fit: ["workbench", "workbench", "crates", "crates", "shelfgoods", "noticeboard"],
note: "The city's decorators. They choose how Somnucor dresses for each season, and hang every pumpkin, wreath and string of lights." });
cityMore("xdg", function (C) { cityFrontage(C, DECOR_KEY, 1280, 5); });
var DGUILD = { state: null, at: 0, busy: false, group: null, cell: null, built: 0, open: false, models: {}, lights: [], pending: 0, theme: null };
var DECOR_THEMES = [["auto", "By the calendar"], ["fall", "Fall"], ["halloween", "Halloween"], ["harvest", "Harvest"], ["winter", "Winter festivals"], ["snow", "Winter"], ["spring", "Spring"], ["summer", "Summer"], ["none", "Undressed"]];
var DECOR_QUARTERS = [["plaza", "The plaza"], ["civic", "The Civic Ring"], ["estates", "The High Ring"], ["temples", "Temple Row"], ["markets", "The Market Ring"], ["commons", "The Commons"], ["warrens", "The Warrens"], ["harvest", "The Harvest Ring"]];
var DECOR_RINGS = { civic: [245], estates: [430, 565], temples: [740, 880], markets: [1080], commons: [1280, 1420], warrens: [1620], harvest: [1790] };
function decorCalendar(d) {
d = d || new Date();
var m = d.getMonth() + 1, day = d.getDate();
if (m === 10 && day >= 15)
return "halloween";
if (m === 11 && day <= 1)
return "halloween";
if (m === 9 || m === 10)
return "fall";
if (m === 11)
return "harvest";
if (m === 12)
return "winter";
if (m <= 2)
return "snow";
if (m <= 5)
return "spring";
return "summer";
}
function decorTheme() {
var s = DGUILD.state, t = s && s.theme;
if (!t || t === "auto")
return decorCalendar();
return t;
}
function decorQuarterOn(q) { var s = DGUILD.state; if (!s || !s.quarters)
return true; return s.quarters[q] !== false; }
function decorDensity() { var s = DGUILD.state, k = s && s.density; return k === "light" ? 0.5 : k === "lavish" ? 1.6 : 1; }
function decorLit() { var s = DGUILD.state; return !(s && s.lit === false); }
var DECOR_SETS = {
fall: [["k:haybale", 4], ["k:harvestsheaf", 2], ["k:cornstalk", 3], ["k:leaffall", 2], ["k:scarecrow", 1], ["m:kenney/graveyard-kit/hay-bale-bundled.glb", 2], ["pumpkin", 3], ["k:mabontable", 0.4]],
harvest: [["k:haybale", 4], ["k:harvestsheaf", 3], ["k:cornstalk", 3], ["k:leaffall", 2], ["k:scarecrow", 1], ["pumpkin", 2], ["k:mabontable", 0.6], ["k:lughcorn", 1]],
halloween: [["jack", 6], ["k:haybale", 2], ["k:cornstalk", 2], ["k:leaffall", 1.5], ["k:scarecrow", 1], ["m:kenney/graveyard-kit/lantern-candle.glb", 2], ["m:kenney/graveyard-kit/candle-multiple.glb", 1.5],
["m:kenney/graveyard-kit/gravestone-round.glb", 1.2], ["m:kenney/graveyard-kit/gravestone-cross.glb", 1], ["m:kaykit/halloween/tree_dead_large.glb", 0.8],
["k:cauldron", 0.6], ["k:samhainlanterns", 0.8], ["k:bats", 0.6], ["k:skeleton", 0.5], ["k:ghost", 0.3], ["m:kenney/graveyard-kit/fire-basket.glb", 0.6]],
winter: [["k:yuletree", 1.2], ["k:wreath", 3], ["k:snowman", 1.5], ["k:giftpile", 1.5], ["m:kenney/holiday-kit/lantern.glb", 2], ["m:kenney/holiday-kit/present-a-cube.glb", 1], ["m:kenney/holiday-kit/tree-decorated.glb", 1], ["k:menorah", 0.4], ["k:lunarlanterns", 0.4]],
snow: [["k:snowman", 2], ["m:kenney/holiday-kit/snowman-hat.glb", 1], ["k:snowfield", 1], ["m:kenney/holiday-kit/sled-long.glb", 0.6], ["m:kenney/holiday-kit/lantern.glb", 1.5]],
spring: [["k:blossomground", 1.5], ["k:flowerbed", 3], ["k:flowers", 3], ["k:maypoleribbons", 0.3], ["k:ostaraeggs", 0.6]],
summer: [["k:stringlights", 1.5], ["k:flowers", 3], ["k:flowerbed", 2], ["k:lithawheel", 0.3]]
};
var DECOR_PLAZA = {
halloween: [["m:kenney/graveyard-kit/iron-fence.glb", -8, 0, 0], ["m:kenney/graveyard-kit/iron-fence.glb", -4, 0, 0], ["m:kenney/graveyard-kit/iron-fence-border-gate.glb", 0, 0, 0], ["m:kenney/graveyard-kit/iron-fence.glb", 4, 0, 0],
["m:kenney/graveyard-kit/crypt-small.glb", 0, -6, 0], ["m:kenney/graveyard-kit/gravestone-decorative.glb", -4, -3, 0], ["m:kenney/graveyard-kit/gravestone-bevel.glb", 4, -3, 0], ["m:kenney/graveyard-kit/gravestone-round.glb", -2, -4, 0],
["m:kenney/graveyard-kit/pumpkin-tall-carved.glb", -6, 2, 0], ["m:kenney/graveyard-kit/pumpkin-carved.glb", 6, 2, 0], ["m:kenney/graveyard-kit/lightpost-single.glb", -9, 1, 0], ["m:kenney/graveyard-kit/lightpost-single.glb", 9, 1, 0],
["m:kaykit/halloween/tree_dead_large.glb", -7, -7, 0], ["k:cauldron", 3, -1, 0], ["k:skeleton", 5, -5, 0], ["k:ghost", -3, -8, 0]],
fall: [["k:scarecrow", 0, 0, 0], ["k:haybale", -3, 1, 0], ["k:haybale", 3, 1, 0], ["k:harvestsheaf", -5, -1, 0], ["k:harvestsheaf", 5, -1, 0], ["pumpkin", -1.5, 2, 0], ["pumpkin", 1.5, 2, 0], ["k:mabontable", 0, -4, 0]],
harvest: [["k:mabontable", 0, -2, 0], ["k:haybale", -3, 1, 0], ["k:haybale", 3, 1, 0], ["k:harvestsheaf", -5, -1, 0], ["k:harvestsheaf", 5, -1, 0], ["pumpkin", 0, 2, 0]],
winter: [["m:kenney/holiday-kit/tree-decorated-snow.glb", 0, -2, 0], ["k:giftpile", -2, 0, 0], ["k:giftpile", 2, 0, 0], ["k:snowman", -5, 1, 0], ["k:snowman", 5, 1, 0], ["m:kenney/holiday-kit/train-locomotive.glb", 0, 4, 0]],
snow: [["k:snowman", -3, 0, 0], ["k:snowman", 3, 0, 0], ["K:snowfield", 0, -4, 0]],
spring: [["k:maypoleribbons", 0, 0, 0], ["k:flowerbed", -4, 2, 0], ["k:flowerbed", 4, 2, 0]],
summer: [["k:lithawheel", 0, 0, 0], ["k:stringlights", 0, 3, 0], ["k:flowerbed", -4, 2, 0], ["k:flowerbed", 4, 2, 0]]
};
function decorHash(a, b) { var h = ((a * 73856093) ^ (b * 19349663)) >>> 0; h = (h ^ (h >>> 13)) * 1274126177 >>> 0; return (h ^ (h >>> 16)) >>> 0; }
function decorPick(set, h) {
var tot = 0;
set.forEach(function (q) { tot += q[1]; });
var r = (h % 10000) / 10000 * tot;
for (var i = 0; i < set.length; i++) {
r -= set[i][1];
if (r <= 0)
return set[i][0];
}
return set[0][0];
}
function decorLoad(force) {
if (DGUILD.busy || (!force && Date.now() - DGUILD.at < 300000))
return;
DGUILD.busy = true;
DGUILD.at = Date.now();
var p = (typeof carePublicRpc === "function") ? carePublicRpc("city_decor_state") : Promise.resolve(null);
p.then(function (s) { DGUILD.busy = false; if (s && typeof s === "object" && s.theme) {
var before = JSON.stringify(DGUILD.state);
DGUILD.state = s;
if (JSON.stringify(s) !== before)
decorRebuild();
} })
.catch(function () { DGUILD.busy = false; });
}
function decorModel(file, cb) {
if (typeof modelFile !== "function" || !(typeof modelsOn === "function" && modelsOn()))
return cb(null);
modelFile(file, function (F) { cb(F && F.scene ? F.scene : null); });
}
function decorSize(o) { var b = new THREE.Box3().setFromObject(o), s = new THREE.Vector3(); b.getSize(s); return { b: b, s: s }; }
function decorPut(kind, x, z, rot, h, lit) {
var G = DGUILD.group;
if (!G)
return;
var y = (typeof terrainY === "function") ? terrainY(x, z) : 0;
if (kind === "pumpkin" || kind === "jack")
kind = "m:kenney/graveyard-kit/" + (h % 2 ? "pumpkin-tall-carved.glb" : "pumpkin-carved.glb");
if (kind === "skeleton")
kind = "m:characters/kaykit/skeleton-minion.glb";
var glow = /pumpkin|lantern|candle|fire-basket|lightpost/.test(kind);
if (kind.indexOf("k:") === 0 || kind.indexOf("K:") === 0) {
var arch = kind.slice(2);
if (!KIT[arch])
return;
var ks = KIT[arch].size, at = {};
if (kind.charAt(0) === "k" && ks[1] < 0.5 && Math.max(ks[0], ks[2]) > 6)
at.s = 4.5 / Math.max(ks[0], ks[2]);
var spec = { id: "decor_" + Math.round(x) + "_" + Math.round(z), archetype: arch, attrs: at, x: x, z: z, rot: rot, detail: 3, nights: [store.session], city: true, hub: true, decor: true };
try {
var g = build(spec);
g.position.set(x, y, z);
g.rotation.y = rot;
g.traverse(function (m) { m.raycast = function () { }; });
G.add(g);
}
catch (e) { }
return;
}
var file = kind.slice(2), want = { "pumpkin-carved.glb": 0.75, "pumpkin-tall-carved.glb": 0.95, "lantern-candle.glb": 0.7, "candle-multiple.glb": 0.5, "gravestone-round.glb": 1.1, "gravestone-cross.glb": 1.3,
"gravestone-decorative.glb": 1.4, "gravestone-bevel.glb": 1.2, "tree_dead_large.glb": 6, "fire-basket.glb": 1.2, "iron-fence.glb": 1.5, "iron-fence-border-gate.glb": 2, "crypt-small.glb": 3.6,
"lightpost-single.glb": 3.2, "hay-bale-bundled.glb": 1.2, "lantern.glb": 0.8, "present-a-cube.glb": 0.6, "tree-decorated.glb": 3, "tree-decorated-snow.glb": 6, "snowman-hat.glb": 1.8,
"sled-long.glb": 0.8, "train-locomotive.glb": 2.2, "skeleton-minion.glb": 1.7 }[file.replace(/^.*\//, "")] || 1;
var gen = DGUILD.gen;
DGUILD.pending++;
(file.indexOf("characters/") === 0 ? function (cb) { if (typeof hdfFile === "function") {
hdfFile(file.replace(/^characters\//, ""), function (F) { cb(F && F.scene ? (THREE.SkeletonUtils ? THREE.SkeletonUtils.clone(F.scene) : null) : null, true); });
}
else
cb(null); }
: function (cb) { decorModel(file, function (sc) { cb(sc ? sc.clone() : null, false); }); })(function (o, own) {
DGUILD.pending--;
if (!o || gen !== DGUILD.gen || !DGUILD.group)
return;
var S = decorSize(o), k = want / Math.max(0.01, S.s.y);
o.scale.multiplyScalar(k);
var W = new THREE.Group();
W.add(o);
o.position.y = -S.b.min.y * k;
W.position.set(x, y, z);
W.rotation.y = rot;
W.traverse(function (m) { if (m.isMesh) {
m.castShadow = true;
m.receiveShadow = true;
m.raycast = function () { };
} });
DGUILD.group.add(W);
if (glow && lit && decorLit()) {
var fl = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshBasicMaterial({ color: 0xFFB040 }));
fl.position.set(0, want * 0.45, 0);
fl.userData.decorFlame = 1;
W.add(fl);
var key = "decor:" + Math.round(x) + ":" + Math.round(z);
DGUILD.lights.push(key);
if (typeof nightGlowSpot === "function")
nightGlowSpot(key, { x: x, y: y + want * 0.6, z: z, col: 0xFF9A3A, k: 1.1, r: 9, pri: 1.3 });
}
});
}
function decorClear() {
DGUILD.gen = (DGUILD.gen || 0) + 1;
if (DGUILD.group && DGUILD.group.parent)
DGUILD.group.parent.remove(DGUILD.group);
DGUILD.group = null;
DGUILD.built = 0;
DGUILD.lights.forEach(function (k) { if (typeof nightGlowSpot === "function")
nightGlowSpot(k, null); });
DGUILD.lights = [];
}
function decorRebuild() { DGUILD.cell = null; }
function decorQuarterAt(r) {
if (r < 170)
return "plaza";
if (r < 330)
return "civic";
if (r < 650)
return "estates";
if (r < 990)
return "temples";
if (r < 1180)
return "markets";
if (r < 1520)
return "commons";
if (r < 1700)
return "warrens";
return "harvest";
}
function decorBuildAround(P) {
decorClear();
var theme = decorTheme();
DGUILD.theme = theme;
var set = DECOR_SETS[theme];
if (!set || typeof ATLC === "undefined" || !ATLC)
return;
DGUILD.group = new THREE.Group();
DGUILD.group.name = "season decor";
scene.add(DGUILD.group);
var reach = typeof LITE !== "undefined" && LITE ? 110 : 200, dens = decorDensity(), n = 0, cap = typeof LITE !== "undefined" && LITE ? 60 : 180;
var dc = Math.hypot(P.x - ATLC.x, P.z - ATLC.z), ac = Math.atan2(P.z - ATLC.z, P.x - ATLC.x);
if (dc < reach + 80 && decorQuarterOn("plaza") && DECOR_PLAZA[theme]) {
var pa = -Math.PI / 2, pr = 58, px = ATLC.x + Math.cos(pa) * pr, pz = ATLC.z + Math.sin(pa) * pr, rot = rotIn(pa);
DECOR_PLAZA[theme].forEach(function (q, i) {
var c = Math.cos(rot), s = Math.sin(rot), x = px + q[1] * c + q[2] * s, z = pz - q[1] * s + q[2] * c;
decorPut(q[0], x, z, rot + (q[3] || 0), i, true);
n++;
});
}
Object.keys(DECOR_RINGS).forEach(function (q) {
if (!decorQuarterOn(q))
return;
DECOR_RINGS[q].forEach(function (rs) {
if (Math.abs(rs - dc) > reach + 20)
return;
[1, -1].forEach(function (side) {
var rk = rs + side * (ATL_ROAD + 2.6), step = Math.max(6, 16 / dens);
var span = reach / rk, a0 = ac - span, a1 = ac + span;
var i0 = Math.ceil(a0 * rk / step), i1 = Math.floor(a1 * rk / step);
for (var i = i0; i <= i1 && n < cap; i++) {
var a = i * step / rk, h = decorHash(i, rs * 2 + (side > 0 ? 1 : 0));
if (h % 100 > 58 * dens)
continue;
if (typeof atlClearAt === "function" && !atlClearAt(rk, a, 2, 3))
continue;
var x = ATLC.x + Math.cos(a) * rk, z = ATLC.z + Math.sin(a) * rk;
if (Math.hypot(x - P.x, z - P.z) > reach)
continue;
if (typeof blockedAt === "function" && blockedAt(x, z, 0))
continue;
var kind = decorPick(set, h >>> 7);
decorPut(kind, x, z, side > 0 ? rotIn(a) : rotOut(a), h, (h >>> 3) % 3 !== 0);
n++;
}
});
});
});
DGUILD.built = n;
}
function decorTick(dt) {
var inCity = (typeof careInCity === "function") && careInCity();
if (!inCity) {
if (DGUILD.group)
decorClear();
DGUILD.cell = null;
return;
}
decorLoad(false);
var P = camera.position, cs = 90, cell = Math.round(P.x / cs) + ":" + Math.round(P.z / cs) + ":" + decorTheme();
if (cell !== DGUILD.cell) {
DGUILD.cell = cell;
decorBuildAround(P);
}
if (DGUILD.group && (DGUILD.flk = (DGUILD.flk || 0) + dt) > 0.12) {
DGUILD.flk = 0;
var t = performance.now() / 1000;
DGUILD.group.traverse(function (m) { if (m.userData.decorFlame) {
var s = 0.8 + 0.35 * Math.abs(Math.sin(t * 7 + m.id));
m.scale.setScalar(s);
} });
}
decorButton();
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
decorTick(dt);
}
catch (e) {
if (window.console && !DGUILD.warned) {
DGUILD.warned = 1;
console.warn("decor:", e);
}
} };
})();
function decorMayControl() {
if (typeof amKeeper === "function" && amKeeper())
return true;
var jobs = (typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || [];
return jobs.some(function (j) { return (j.job_id === 1600 || j.job_id === 1601) && j.clocked_in; });
}
function decorButton() {
var b = document.getElementById("decor-btn");
var show = decorMayControl();
if (!b) {
if (!show || !document.body)
return;
b = document.createElement("button");
b.id = "decor-btn";
b.type = "button";
b.textContent = "Decor";
b.style.cssText = "position:fixed;right:12px;bottom:calc(52px + env(safe-area-inset-bottom,0px));z-index:45;background:rgba(10,12,18,.92);color:var(--bone);border:1px solid #E0761E;border-radius:3px;padding:9px 13px;font:13px var(--sans);cursor:pointer";
b.onclick = function () { DGUILD.open = !DGUILD.open; decorPanel(); };
document.body.appendChild(b);
}
b.style.display = show ? "block" : "none";
if (!show && DGUILD.open) {
DGUILD.open = false;
decorPanel();
}
}
function decorPanel() { return __ZC(138, 0, this, arguments, new.target); }
