/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CC = { pool: [], groups: [], last: 0, ring: null, rs: 0, on: false, seed: (Date.now() / 1000 | 0) % 9973 };
var CC_DENSITY = { plaza: [22, 8], civic: [20, 6], estates: [9, 3], temples: [12, 4], markets: [24, 18], commons: [16, 16], warrens: [14, 28], harvest: [7, 2], wilds: [0, 0] };
var CC_NIGHTLIFE = { warrens: 1, commons: 1, markets: 1 };
var CC_MAX = 34;
function ccHour() { return (typeof cityHourNow === "function") ? cityHourNow() : ((typeof dreamHour === "function") ? dreamHour() : 12); }
function ccInCity() {
if (typeof walkMode === "undefined" || !walkMode || typeof ATLC === "undefined" || !ATLC)
return false;
if (store.inside || (typeof UG2 !== "undefined" && UG2 && UG2.on))
return false;
if (typeof somnucorRealm === "function") {
var r = somnucorRealm();
if (!r || (store.here || 0) !== r.id)
return false;
}
return true;
}
function ccWant(k, h) {
var d = CC_DENSITY[k] || [6, 2], night = CC_NIGHTLIFE[k];
if (h >= 7 && h < 9.5)
return Math.round(d[0] * 1.15);
if (h >= 9.5 && h < 17)
return d[0];
if (h >= 17 && h < 19.5)
return Math.round(d[0] * 1.1);
if (h >= 19.5 && h < 23.5)
return night ? d[1] : Math.round((d[0] + d[1]) / 3);
if (h >= 23.5 || h < 3)
return night ? Math.round(d[1] * 0.8) : Math.round(d[1] * 0.5);
if (h >= 3 && h < 5.5)
return night ? Math.round(d[1] * 0.3) : 1;
return Math.round(d[0] * 0.45);
}
var CC_POOL = 64;
function ccJob(k) {
var h = Math.abs(Math.sin((k + 1) * 91.7 + CC.seed) * 1e4) | 0, T = (typeof LIVE_TRADES !== "undefined") ? LIVE_TRADES : ["Clerk"];
var src = (typeof TEMPS !== "undefined" && TEMPS.list && TEMPS.list.length > 20) ? TEMPS.list : null;
if (src) {
var t = src[h % src.length];
if (t && t.post && t.post.title && t.post.title !== "worker")
return { title: t.post.title, place: t.post.workplace };
}
return { title: T[h % T.length], place: "" };
}
function ccDuty(p, h) { return (typeof liveDuty === "function") ? liveDuty(p.job.title, p.job.place, h) : "off"; }
function ccBuild(p, work) {
var k = p.k, id = "ccp" + k + "_" + CC.seed;
var look = (typeof randomLook === "function") ? randomLook(id, k % 9 === 4 ? "child" : "human") : {};
if (typeof csLookFill === "function")
try {
csLookFill(look, id);
}
catch (e) { }
if (work && k % 9 !== 4 && typeof jobDress === "function")
jobDress(look, p.job.title, p.job.place);
var g = buildFigure({ id: "__cc_" + k + (work ? "w" : ""), archetype: k % 9 === 4 ? "child" : "human", attrs: {}, look: look, solid: false, detail: 3, nights: [], city: true }, 1);
g.traverse(function (m) { m.raycast = function () { }; });
if (p.g) {
g.position.copy(p.g.position);
g.rotation.y = p.g.rotation.y;
g.visible = p.g.visible;
if (p.tag)
dropTag(p.tag);
p.tag = null;
scene.remove(p.g);
}
else
g.visible = false;
scene.add(g);
p.g = g;
p.work = !!work;
}
function ccPerson(k) {
if (CC.pool[k])
return CC.pool[k];
var h = (Math.abs(Math.sin((k + 3) * 12.3 + CC.seed) * 1e4)) | 0, f = h % 2 === 0;
var name = (typeof TEMP_GIVEN_F !== "undefined") ? ((f ? TEMP_GIVEN_F : TEMP_GIVEN_M)[(h >>> 3) % 20] + " " + (typeof SURNAME !== "undefined" ? SURNAME[(h >>> 7) % SURNAME.length] : "")) : "";
var p = { g: null, k: k, a: 0, r: 0, dir: 1, sp: 1.3, state: "gone", ph: k * 0.83, hold: 0, job: ccJob(k), name: name, tag: null };
CC.pool[k] = p;
ccBuild(p, false);
return p;
}
function ccTagFor(p, h) { return __ZC(151, 0, this, arguments, new.target); }
function ccRand(k, salt) { var x = Math.sin((k + 1) * 12.9898 + (salt || 0) * 78.233 + CC.seed) * 43758.5453; return x - Math.floor(x); }
function ccWorld(a, r) { return { x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r }; }
function ccY(x, z) { return (typeof terrainY === "function") ? (terrainY(x, z) || 0) : 0; }
function ccStreet() {
var P = camera.position, dx = P.x - ATLC.x, dz = P.z - ATLC.z, dc = Math.hypot(dx, dz), best = null, bk = null;
Object.keys(ATL_STREETS).forEach(function (k) { ATL_STREETS[k].forEach(function (rs) { if (best === null || Math.abs(rs - dc) < Math.abs(best - dc)) {
best = rs;
bk = k;
} }); });
if (best === null || Math.abs(best - dc) > 140)
return null;
return { k: bk, rs: best, a: Math.atan2(dz, dx), dc: dc };
}
function ccPlace(p, st, near) {
var span = 110 / st.rs, tries = 0, a, side, r;
do {
a = st.a + (near ? (ccRand(p.k, tries + Date.now() % 97) - 0.5) * 2 * span : ((ccRand(p.k, tries) < 0.5 ? -1 : 1) * span * (0.75 + 0.25 * ccRand(p.k, tries + 5))));
side = ccRand(p.k, tries + 11) < 0.5 ? -1 : 1;
r = st.rs + side * (8.4 + ccRand(p.k, tries + 3) * 1.4);
tries++;
} while (typeof atlNearStair === "function" && atlNearStair(r, a) && tries < 8);
p.a = a;
p.r = r;
p.side = side;
p.dir = ccRand(p.k, tries + 17) < 0.5 ? -1 : 1;
p.sp = 1.05 + ccRand(p.k, 23) * 0.6;
p.state = "walk";
p.g.visible = true;
}
function ccGroups(st, h) {
var lively = CC_NIGHTLIFE[st.k] && (h >= 19.5 || h < 3.5);
if (!lively) {
CC.groups = [];
return;
}
if (CC.groups.length && CC.groups[0].rs === st.rs && Math.abs(CC.groups[0].a0 - st.a) * st.rs < 60)
return;
CC.groups = [];
var n = st.k === "warrens" ? 4 : 3, span = 90 / st.rs;
for (var i = 0; i < n; i++) {
var a = st.a + ((i + 0.5) / n - 0.5) * 2 * span, side = (i % 2) ? 1 : -1, r = st.rs + side * 9.2;
if (typeof atlNearStair === "function" && atlNearStair(r, a))
a += 12 / st.rs;
CC.groups.push({ a: a, r: r, rs: st.rs, a0: st.a, size: 3 + ((i * 7 + CC.seed) % 3), dance: st.k === "warrens" || i === 1, members: 0 });
}
}
function ccArrange(st, h) {
var want = Math.min(CC_MAX, ccWant(st.k, h)), n = 0;
ccGroups(st, h);
var gi = 0, used = 0;
CC.groups.forEach(function (G) { G.members = 0; });
for (var k = 0; k < CC_POOL; k++) {
var p = (n < want) ? ccPerson(k) : CC.pool[k];
if (!p)
continue;
var duty = ccDuty(p, h);
var outdoor = typeof LIVE_OUTDOOR !== "undefined" && LIVE_OUTDOOR.test(p.job.title);
if (n >= want || (duty === "work" && !outdoor && p.k % 9 !== 4)) {
p.g.visible = false;
p.state = "gone";
if (p.tag) {
p.tag.visible = false;
}
continue;
}
var dressWork = (duty === "going" || duty === "home" || duty === "lunch" || duty === "work") && p.k % 9 !== 4;
if (dressWork !== p.work)
ccBuild(p, dressWork);
n++;
var G = CC.groups[gi];
if (G && G.members < G.size && used < want * 0.6 && !dressWork) {
var ang = (G.members / G.size) * Math.PI * 2 + 0.4;
p.state = "stand";
p.group = G;
p.ga = ang;
p.g.visible = true;
G.members++;
used++;
if (G.members >= G.size)
gi++;
continue;
}
if (p.state !== "walk" || Math.abs(((p.a - st.a + Math.PI * 3) % (Math.PI * 2)) - Math.PI) * st.rs > 130 || Math.abs(p.r - st.rs) > 12)
ccPlace(p, st, p.state === "gone" || p.state === "stand");
}
}
function ccHideAll() { CC.pool.forEach(function (p) { if (p) {
p.g.visible = false;
p.state = "gone";
if (p.tag)
p.tag.visible = false;
} }); CC.groups = []; }
function ccTick(dt) {
if (!ccInCity()) {
if (CC.on) {
ccHideAll();
CC.on = false;
}
return;
}
var now = performance.now() / 1000;
if (!CC.on || now - CC.last > 2) {
CC.last = now;
var st = ccStreet();
if (!st) {
if (CC.on)
ccHideAll();
CC.on = false;
return;
}
CC.on = true;
CC.st = st;
ccArrange(st, ccHour());
}
else
CC.st.a = Math.atan2(camera.position.z - ATLC.z, camera.position.x - ATLC.x);
var st = CC.st, t = now;
CC.pool.forEach(function (p) {
if (!p || p.state === "gone")
return;
var x, z, face, moving = false, bob = 0;
if (p.state === "walk") {
if (p.g.userData.dance)
p.g.userData.dance = 0;
p.a += p.dir * p.sp * dt / p.r;
var off = ((p.a - st.a + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
if (Math.abs(off) * st.rs > 125) {
p.a = st.a - Math.sign(off) * 110 / st.rs;
p.dir = -Math.sign(off) || 1;
}
var w = ccWorld(p.a, p.r);
x = w.x;
z = w.z;
var tx = -Math.sin(p.a) * p.dir, tz = Math.cos(p.a) * p.dir;
face = Math.atan2(tx, tz);
moving = true;
}
else {
var G = p.group, c = ccWorld(G.a, G.r), rr = 0.9 + 0.25 * Math.sin(p.k);
x = c.x + Math.cos(p.ga) * rr;
z = c.z + Math.sin(p.ga) * rr;
face = Math.atan2(c.x - x, c.z - z);
p.g.userData.dance = G.dance ? "party" : 0;
if (G.dance && !p.g.userData.rbReal)
bob = Math.abs(Math.sin(t * 4.2 + p.ph)) * 0.12;
face += Math.sin(t * 0.7 + p.ph) * 0.25;
}
p.g.position.set(x, ccY(x, z) + bob, z);
p.g.rotation.y = face;
var L = p.g.userData.limbs;
if (L) {
var s = moving ? Math.sin(t * 6.5 * p.sp + p.ph) * 0.5 : 0, arm = moving ? s * 0.6 : (p.group && p.group.dance ? Math.sin(t * 4.2 + p.ph) * 0.9 : Math.sin(t * 1.3 + p.ph) * 0.12);
if (L.ll)
L.ll.rotation.x = s;
if (L.rl)
L.rl.rotation.x = -s;
if (L.la)
L.la.rotation.x = -arm;
if (L.ra)
L.ra.rotation.x = moving ? arm : arm * 0.8;
}
});
var P = camera.position, best = null, bd = 4.5;
CC.pool.forEach(function (p) { if (!p || p.state === "gone")
return; var d = Math.hypot(p.g.position.x - P.x, p.g.position.z - P.z); if (d < bd) {
bd = d;
best = p;
} });
CC.pool.forEach(function (p) { if (p && p.tag && p !== best)
p.tag.visible = false; });
if (best && typeof makeTag === "function") {
var txt = ccTagFor(best, ccHour());
if (!best.tag || best.tagText !== txt) {
if (best.tag)
dropTag(best.tag);
best.tag = makeTag(txt, false);
best.tag.position.y = 2.15;
best.g.add(best.tag);
best.tagText = txt;
}
best.tag.visible = true;
}
}
(function () {
var last = performance.now();
function loop() {
var now = performance.now(), dt = Math.min(0.1, (now - last) / 1000);
last = now;
try {
ccTick(dt);
}
catch (e) {
if (window.console && !CC.warned) {
CC.warned = 1;
console.warn("city crowd:", e);
}
}
requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
})();
