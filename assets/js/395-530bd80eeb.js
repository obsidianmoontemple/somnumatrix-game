/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var INCD = { rows: [], ok: null, on: true, law: false, keeper: false, at: 0, skew: 0, busy: false, root: null, objs: {}, act: null, actAt: 0, guide: null, jobs: {} };
function cinUid() { try {
return (session && session.user && session.user.id) || "";
}
catch (e) {
return "";
} }
function incdNow() { return Date.now() + INCD.skew; }
function cinOpen() { return INCD.rows.filter(function (r) { return !r.closed; }); }
function cinMine() { return INCD.rows.some(function (r) { return !r.closed && (r.mine_rider || r.mine_crew); }); }
function cinLaw() { return !!INCD.law || (typeof amCorp === "function" && amCorp()) || (typeof amKeeper === "function" && amKeeper()); }
function cinPlaces() { return typeof wkcJobs === "function" ? wkcJobs() : []; }
function cinWorksAt(place) { return cinPlaces().some(function (j) { return j.place === place; }) || (typeof amKeeper === "function" && amKeeper()); }
function cinFirst(n) { return String(n || "").split(" ")[0]; }
function cinPoll(force) {
if (!(typeof signedIn === "function" && signedIn()) || typeof cityRpc !== "function")
return;
if (!force && INCD.busy && Date.now() - INCD.at < 20000)
return;
var gap = cinMine() ? 20000 : 60000;
if (!force && Date.now() - INCD.at < gap)
return;
var gen = INCD.gen = (INCD.gen || 0) + 1;
INCD.busy = true;
INCD.at = Date.now();
cityRpc("city_incidents_now").then(function (o) {
if (gen !== INCD.gen)
return;
INCD.busy = false;
if (!o || !o.ok) {
INCD.ok = false;
return;
}
INCD.ok = true;
INCD.on = o.on !== false;
INCD.law = !!o.law;
INCD.keeper = !!o.keeper;
INCD.rows = o.rows || [];
if (o.now) {
var s = Date.parse(o.now) - Date.now();
if (isFinite(s))
INCD.skew = s;
}
if (typeof PH !== "undefined" && PH.open && PH.tab === "town" && typeof FPS !== "undefined" && !FPS.with && typeof phPaint === "function")
phPaint();
}).catch(function () { if (gen !== INCD.gen)
return; INCD.busy = false; INCD.ok = false; });
}
setInterval(function () { cinPoll(false); }, 5000);
setTimeout(function () { cinPoll(true); }, 4000);
document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible")
setTimeout(function () { cinPoll(true); }, 800); });
var CIN_DMG = { window: "a smashed window", fire: "the fire damage", flood: "the flood damage", paint: "paint all over the front", stall: "a smashed stall", cart: "a forced yard gate", dark: "a dead turbine", crash: "the wreckage" };
var CIN_ICON = { crime: "🚨", major: "🆘" };
function cinState(r) { return __ZC(395, 0, this, arguments, new.target); }
function cinLast(r) { var L = r.log || [], x = L[L.length - 1]; return x ? x : null; }
function cinWork(r) { var w = INCD.jobs[r.id]; return (w && w.k >= ((r.work && r.work.k) || 0)) ? w : (r.work || {}); }
function cinNeed(r, k) { var st = (r.steps || [])[k]; return st ? st.m * 60 : 1200; }
function cinDone(r) { return __ZC(395, 1, this, arguments, new.target); }
function cinBeat(r, quiet) { return __ZC(395, 2, this, arguments, new.target); }
function cinNextStep(r, last) {
return cinDo(r.id, last ? "repair" : "next").then(function (o) { if (o && o.ok && o.work) {
INCD.jobs[r.id] = { k: o.work.k, sec: 0, go: false, t: 0 };
r.work = o.work;
cinBeat(r, true);
} return o; });
}
function cinClock(s) { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
function cinRealCall(e) { return typeof WP_BY_KEY !== "undefined" && !!WP_BY_KEY[e.from] && !!WP_BY_KEY[e.to]; }
(function () {
if (typeof fpsSlot !== "function")
return;
var fs = fpsSlot;
fpsSlot = function () { return fs.apply(this, arguments).filter(function (e) { return e.kind !== "crime" && e.kind !== "major" && (e.kind !== "call" || cinRealCall(e)); }); };
})();
function cinTownEntry(r) { return __ZC(395, 3, this, arguments, new.target); }
(function () {
if (typeof fpsTownOrders !== "function")
return;
var ft = fpsTownOrders;
fpsTownOrders = function (hours) {
var L = ft.apply(this, arguments);
try {
var since = Date.now() - (hours || 2) * 3600000;
var I = INCD.rows.filter(function (r) { return Date.parse(r.at) >= since || !r.closed; }).map(cinTownEntry);
if (I.length) {
L = L.concat(I);
L.sort(function (a, b) { return b.at - a.at; });
}
}
catch (e) { }
return L;
};
})();
(function () {
if (typeof fpsStep !== "function")
return;
var st = fpsStep;
fpsStep = function (e) { if (e && e.inc)
return cinState(e.inc); return st.apply(this, arguments); };
})();
function cinTake(id, as) { return __ZC(395, 4, this, arguments, new.target); }
function cinDo(id, what) { return __ZC(395, 5, this, arguments, new.target); }
function cinCanLaw(r) { return r.kind === "crime" && !r.closed && cinLaw() && !r.rider_dreamer && (r.state === "reported" || r.state === "responding"); }
function cinCanFix(r) { return !r.closed && (r.fix === "broken" || (r.fix === "repairing" && !r.crew_dreamer)) && !r.mine_crew && cinWorksAt(r.fixer); }
(function () {
if (typeof phPaint !== "function")
return;
var pp = phPaint;
phPaint = function () {
var r = pp.apply(this, arguments);
try {
if (typeof PH === "undefined" || PH.tab !== "town" || typeof FPS === "undefined" || FPS.with)
return r;
var box = document.getElementById("ph-box"), body = box && box.querySelector(".body");
if (!body)
return r;
var L = cinOpen().slice(0, 10), B = "padding:5px 10px;border-radius:8px;border:1px solid #6A5FA0;background:#221E38;color:#EDE8F8;font-size:12.5px;cursor:pointer;margin:4px 6px 0 0";
var h = "<div id='cin-town'><div class='s' style='margin:4px 2px 0;font-weight:600'>Happening in the city</div>";
if (INCD.ok === false)
h += "<div class='row'><div class='s'>The city's reports are not reaching your phone just now.</div></div>";
else if (!L.length)
h += "<div class='row'><div class='s'>All quiet in Somnucor right now.</div></div>";
L.forEach(function (x) {
var mine = x.mine_rider ? " <b style='color:#E8C66A'>· your case</b>" : x.mine_crew ? " <b style='color:#E8C66A'>· your repair</b>" : x.mine_owner ? " <b style='color:#E8C66A'>· your business</b>" : "";
h += "<div class='row'><div class='s'>" + CIN_ICON[x.kind] + " " + phWhen(Date.parse(x.at)) + " · <b style='color:#EDE8F8'>" + esc(x.place) + "</b> · " + esc(x.what) + mine + "</div>" +
"<div style='font-size:13px;margin-top:2px'>" + esc(cinState(x)) + "</div>" +
(x.kind === "crime" && x.culprit && x.culprit.look && x.state !== "arrested" ? "<div class='s'>Wanted: " + esc(x.culprit.name) + ", " + esc(x.culprit.look) + "</div>" : "") +
(x.mine_owner && x.gold_taken ? "<div class='s'>" + x.gold_taken + " gold taken" + (x.gold_back ? ", given back" : ": it comes back when the thief is caught, or the city's insurance pays it after a day") + ".</div>" : "") +
"<div><button style='" + B + "' data-cinway='" + esc(x.place) + "'>📍 Show me the way</button>" +
(cinCanLaw(x) ? "<button style='" + B + "' data-cintake='" + x.id + "' data-cinas='law'>🐉 Take the case</button>" : "") +
(cinCanFix(x) ? "<button style='" + B + "' data-cintake='" + x.id + "' data-cinas='fix'>🛠️ Take the repair</button>" : "") + "</div></div>";
});
h += "</div>";
body.insertAdjacentHTML("afterbegin", h);
body.querySelectorAll("[data-cinway]").forEach(function (el) { el.onclick = function (ev) { ev.stopPropagation(); if (typeof showTheWay === "function")
showTheWay(el.getAttribute("data-cinway")); }; });
body.querySelectorAll("[data-cintake]").forEach(function (el) { el.onclick = function (ev) { ev.stopPropagation(); el.disabled = true; cinTake(+el.getAttribute("data-cintake"), el.getAttribute("data-cinas")); }; });
}
catch (e) {
if (window.console)
console.warn("[city-incidents]", e);
}
return r;
};
})();
function cinPerson(seed) { return __ZC(395, 6, this, arguments, new.target); }
function cinEv(key, at, kind, who, post, place, you, how, why, line, what, act) {
return { slot: key, at: at, kind: kind, how: how, name: who.name, sex: who.sex || "m", age: who.age || 40, first: cinFirst(who.name), post: post, place: place, you: you, why: why, line: line, what: what, act: act || null };
}
function cinWorkEvents(jobs) { return __ZC(395, 7, this, arguments, new.target); }
function cinSpec(id) { var L = (typeof store !== "undefined" && store.objects) || []; for (var i = 0; i < L.length; i++)
if (L[i].id === id)
return L[i]; return null; }
function cinSolids(x, z) {
var L = [], id;
if (typeof BAKE !== "undefined" && BAKE && BAKE.chunks)
Object.keys(BAKE.chunks).forEach(function (k) {
var ch = BAKE.chunks[k];
if (!ch.meshes || !ch.meshes.length)
return;
var dx = ch.cx - x, dz = ch.cz - z, rr = (ch.rad || 80) + 40;
if (dx * dx + dz * dz < rr * rr)
ch.meshes.forEach(function (m) { L.push(m); });
});
return L;
}
function cinFront(place) {
var w = typeof wpAt === "function" && wpAt(place);
if (!w || typeof ATLC === "undefined" || !ATLC)
return null;
var o = cinSpec(w.id), r = o && typeof o.rot === "number" ? o.rot : Math.atan2(ATLC.x - w.x, ATLC.z - w.z);
var fx = Math.sin(r), fz = Math.cos(r), sx = fz, sz = -fx, hd = 6, top = 8, real = false, gy = terrainY(w.x, w.z);
try {
var list = cinSolids(w.x, w.z), m = typeof meshes !== "undefined" && meshes[w.id];
if (m)
list.push(m);
if (list.length) {
var far = 0, n = 0;
[-1.6, 0, 1.6].forEach(function (off) {
var rc = new THREE.Raycaster(new THREE.Vector3(w.x + fx * 40 + sx * off, gy + 1.3, w.z + fz * 40 + sz * off), new THREE.Vector3(-fx, 0, -fz), 0, 60);
var h = rc.intersectObjects(list, true).filter(function (q) { var d = 40 - q.distance; return d > 0.8 && d < 28; })[0];
if (h) {
far = Math.max(far, 40 - h.distance);
n++;
}
});
if (n >= 2) {
hd = far;
real = true;
}
var up = new THREE.Raycaster(new THREE.Vector3(w.x - fx * 1, gy + 60, w.z - fz * 1), new THREE.Vector3(0, -1, 0), 0, 70), hu = up.intersectObjects(list, true)[0];
if (hu)
top = Math.max(3, Math.min(30, hu.point.y - gy));
}
}
catch (e) { }
var x = w.x + fx * (hd + 0.05), z = w.z + fz * (hd + 0.05);
var dx = x - ATLC.x, dz = z - ATLC.z, rr = Math.sqrt(dx * dx + dz * dz) || 1, a = Math.atan2(dz, dx);
var st = typeof lcyStreets === "function" ? lcyStreets() : [rr], best = st[0];
st.forEach(function (q) { if (Math.abs(q - rr) < Math.abs(best - rr))
best = q; });
return { x: x, z: z, y: terrainY(x, z) + 0.12, face: r, fx: fx, fz: fz, sx: sx, sz: sz, a: a, street: best, top: top, depth: hd, real: real, at: Date.now() };
}
function cinAt(F, out, along) { var x = F.x + F.fx * out + F.sx * along, z = F.z + F.fz * out + F.sz * along; return { x: x, z: z, y: terrainY(x, z) + 0.12 }; }
var CIN_PACE = [1.4, 2.2, 3.4, 5];
function cinRnd(s, k) { var x = Math.sin((s + 1) * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); }
function cinCulpritAt(r, F, T) { return __ZC(395, 8, this, arguments, new.target); }
function cinPathOf(r, F, dir, side, sd, T) { return __ZC(395, 9, this, arguments, new.target); }
function cinMat(hex, op, em) { return typeof lcyMat === "function" && op === undefined && !em ? lcyMat(hex) : (function () { var m = new THREE.MeshLambertMaterial({ color: hex, transparent: op !== undefined, opacity: op === undefined ? 1 : op }); if (em) {
m.emissive = new THREE.Color(em);
m.emissiveIntensity = 0.9;
} return m; })(); }
function cinBox(w, h, d, m, x, y, z) { var b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x || 0, y || 0, z || 0); b.raycast = function () { }; return b; }
function cinPaintMat(seed) { return __ZC(395, 10, this, arguments, new.target); }
function cinDamage(r, F) { return __ZC(395, 11, this, arguments, new.target); }
function cinTape(g) { return __ZC(395, 12, this, arguments, new.target); }
function cinMan(seed, kit) { return typeof lcyMan === "function" ? lcyMan("cin" + seed, kit || {}) : null; }
function cinBuild(r, F) { return __ZC(395, 13, this, arguments, new.target); }
function cinForget() {
var open = {};
INCD.rows.forEach(function (r) { if (!r.closed && r.kind === "crime" && r.state !== "arrested" && r.state !== "escaped")
open[r.id] = 1; });
[INCD.paths || {}, INCD.hunt || {}].forEach(function (M) { Object.keys(M).forEach(function (id) { if (!open[id])
delete M[id]; }); });
}
function cinDrop(id) { var o = INCD.objs[id]; if (!o)
return; [o.g, o.culprit, o.rider].forEach(function (x) { if (x && x.parent)
x.parent.remove(x); }); delete INCD.objs[id]; }
function cinTick(dt) {
var realm = typeof somnucorRealm === "function" ? somnucorRealm() : null;
if (!realm || typeof ATLC === "undefined" || !ATLC || typeof scene === "undefined") {
return;
}
if (!INCD.root) {
INCD.root = new THREE.Group();
INCD.root.name = "city-incidents";
scene.add(INCD.root);
}
var inCity = (store.here || 0) === realm.id && !store.inside;
INCD.root.visible = inCity;
if (!inCity) {
cinButton(null);
return;
}
var P = camera.position, t = performance.now() / 1000, reach = (typeof LITE !== "undefined" && LITE) ? 170 : 260, keep = {};
INCD.rows.forEach(function (r) {
if (r.closed)
return;
var F = (INCD.objs[r.id] && INCD.objs[r.id].F) || cinFront(r.place);
if (!F)
return;
var dx = F.x - P.x, dz = F.z - P.z;
if (dx * dx + dz * dz > (reach + 240) * (reach + 240)) {
if (r.kind !== "crime" || r.state === "arrested" || r.state === "escaped" || !r.culprit || !r.culprit.name)
return;
var Q = cinCulpritAt(r, F, cinT(r));
if ((Q.x - P.x) * (Q.x - P.x) + (Q.z - P.z) * (Q.z - P.z) > reach * reach)
return;
}
keep[r.id] = 1;
var sig = r.state + "|" + r.fix + "|" + r.rider_dreamer + "|" + r.crew_dreamer + "|" + cinDone(r), o = INCD.objs[r.id];
if (!F.real && dx * dx + dz * dz < 160 * 160 && Date.now() - F.at > 2000) {
var F2 = cinFront(r.place);
if (F2) {
F = F2;
if (o && F2.real)
o.sig = "";
else if (o)
o.F = F2;
}
}
if (!o || o.sig !== sig) {
cinDrop(r.id);
try {
o = INCD.objs[r.id] = cinBuild(r, F);
o.F = F;
}
catch (e) {
if (window.console)
console.warn("[city-incidents]", e);
return;
}
}
o.g.visible = dx * dx + dz * dz < reach * reach;
o.g.traverse(function (m) {
if (m.userData.cinSmoke) {
m.children.forEach(function (p) { var k = p.userData.k, s = ((t * 0.35 + k / 8) % 1); p.position.set(Math.sin(k * 1.7 + t * 0.2) * 1.2 * s, s * 9, Math.cos(k) * 0.8 * s); p.scale.setScalar(0.6 + s * 1.4); });
}
else if (m.userData.cinGlow && m.material) {
m.material.emissiveIntensity = 0.7 + Math.sin(t * 1.3) * 0.15;
}
});
o.men.forEach(function (m, i) { if (typeof lcyArms === "function")
lcyArms(m, -0.6 + Math.sin(t * 2.2 + i) * 0.5); });
if (o.culprit) {
var C, h = r.mine_rider && r.state === "chasing" ? cinHunt(r) : null, still = false;
if (r.state === "arrested") {
C = cinAt(F, 3.2, -1.4);
C.face = F.face;
still = true;
}
else {
C = cinCulpritAt(r, F, cinT(r));
if (h) {
cinHuntTick(r, h, o, C, P, dt);
if (h.frz > Date.now())
still = 2;
}
}
o.culprit.position.set(C.x, C.y, C.z);
o.culprit.rotation.y = C.face;
o.culprit.visible = o.g.visible || (Math.pow(C.x - P.x, 2) + Math.pow(C.z - P.z, 2) < reach * reach);
if (still === 2) {
if (typeof lcyStill === "function")
lcyStill(o.culprit);
if (typeof lcyArms === "function")
lcyArms(o.culprit, -2.9);
}
else if (!still && typeof lcySwing === "function")
lcySwing(o.culprit, t, C.pace > 3 ? 1.1 : 0.7, C.pace > 3 ? 11 : 7);
else if (typeof lcyStill === "function")
lcyStill(o.culprit);
o.cx = C.x;
o.cy = C.y;
o.cz = C.z;
if (o.rider) {
if (r.state === "arrested") {
var pa = cinAt(F, 3.2, -2.2);
o.rider.position.set(pa.x, pa.y, pa.z);
o.rider.rotation.y = F.face + Math.PI * 0.5;
}
else {
var pr = cinAt(F, 3, 0.6);
o.rider.position.set(pr.x, pr.y, pr.z);
o.rider.rotation.y = F.face + Math.PI * 0.8;
}
o.rider.visible = o.culprit.visible || o.g.visible;
}
}
else if (o.rider) {
var p2 = cinAt(F, 3, 0.6);
o.rider.position.set(p2.x, p2.y, p2.z);
o.rider.visible = o.g.visible;
}
});
Object.keys(INCD.objs).forEach(function (id) { if (!keep[id])
cinDrop(id); });
try {
cinErrandsTick(P, t, reach);
}
catch (e) {
if (!INCD.warnE) {
INCD.warnE = true;
if (window.console)
console.warn("[city-incidents]", e);
}
}
if (INCD.guide && !INCD.rows.some(function (r) { return r.id === INCD.guide && r.mine_rider && r.state === "chasing"; })) {
if (typeof guideTo !== "undefined" && guideTo && guideTo.x !== undefined)
guideTo = null;
INCD.guide = null;
}
INCD.actAt -= dt || 0.016;
if (INCD.actAt <= 0) {
INCD.actAt = 0.4;
cinNear(P);
cinForget();
}
}
INCD.errs = {};
INCD.errAt = 0;
INCD.fronts = {};
function cinFrontOf(place) { var F = INCD.fronts[place]; if (!F || (!F.real && Date.now() - F.at > 15000))
F = INCD.fronts[place] = cinFront(place); return F; }
var CIN_TOOL = { "The Waterworks": "shovel", "The City Depot": "shovel", "The Masons' Yard": "shovel", "The Joinery": "drill", "The Engine House": "drill", "The Smithy": "drill", "The Wheelwright's": "drill", "The Watchmaker's": "bag", "The Print Shop": "parcel", "The Runners' Hall": "bag", "The City Hospital": "bag", "The Sign Shop": "drill", "The Gardeners' Lodge": "broom" };
function cinRoute(FA, FB, f, end) {
var a0 = Math.atan2(FA.z - ATLC.z, FA.x - ATLC.x), a1 = Math.atan2(FB.z - ATLC.z, FB.x - ATLC.x), da = a1 - a0;
while (da > Math.PI)
da -= 2 * Math.PI;
while (da < -Math.PI)
da += 2 * Math.PI;
var r0 = FA.street, r1 = FB.street, x, z, face;
if (f >= 1) {
x = end.x;
z = end.z;
face = FB.face + Math.PI;
}
else if (f < 0.04) {
var p0 = cinAt(FA, 2, 0);
x = p0.x;
z = p0.z;
face = FA.face;
}
else {
var a = a0 + da * Math.min(1, f / 0.75), rr = f < 0.75 ? r0 + (r0 > Math.hypot(FA.x - ATLC.x, FA.z - ATLC.z) ? -7 : 7) : r0 + (r1 - r0) * ((f - 0.75) / 0.25);
x = ATLC.x + Math.cos(a) * rr;
z = ATLC.z + Math.sin(a) * rr;
face = f < 0.75 ? Math.atan2(-Math.sin(a) * (da > 0 ? 1 : -1), Math.cos(a) * (da > 0 ? 1 : -1)) : Math.atan2(FB.x - x, FB.z - z);
}
return { x: x, z: z, face: face };
}
function cinErrandsTick(P, t, reach) {
INCD.errAt -= 0.016;
var want = {}, lite = typeof LITE !== "undefined" && !!LITE, max = lite ? 3 : 6, n = 0, now = Date.now();
if (typeof fpsTownOrders === "function" && typeof WP_BY_KEY !== "undefined") {
if (!INCD.errList || now - INCD.errListAt > 5000) {
INCD.errListAt = now;
INCD.errList = fpsTownOrders(1.2).filter(function (e) { return !e.inc && (e.kind === "order" || e.kind === "call") && WP_BY_KEY[e.from] && WP_BY_KEY[e.to]; });
}
INCD.errList.forEach(function (e) {
if (n >= max)
return;
var m = (now - e.at) / 60000, A, B, f, work = false;
if (e.kind === "order") {
if (m < 25 || m > 52)
return;
A = e.ship || e.to;
B = e.dest || e.from;
f = Math.min(1, (m - 25) / 25);
}
else {
if (m < 3 || m > 60)
return;
A = e.to;
B = e.from;
f = Math.min(1, (m - 3) / 17);
work = m >= 20;
}
var FA = cinFrontOf(A), FB = cinFrontOf(B);
if (!FA || !FB)
return;
var R = cinRoute(FA, FB, f, cinAt(FB, 1.8, -1.2)), x = R.x, z = R.z, face = R.face;
var dx = x - P.x, dz = z - P.z;
if (dx * dx + dz * dz > reach * reach)
return;
n++;
var key = e.slot + "|" + e.kind;
want[key] = 1;
var w = INCD.errs[key];
if (!w) {
var g = cinMan("e" + key, e.kind === "order" ? { dress: "van", tool: "parcel" } : { dress: "hivis", tool: CIN_TOOL[A] || "bag" });
if (!g)
return;
g.userData.lcyName = g.userData.lcyName;
INCD.root.add(g);
w = INCD.errs[key] = { g: g };
}
w.g.position.set(x, terrainY(x, z) + 0.12, z);
w.g.rotation.y = face;
w.g.visible = true;
if (f > 0.04 && f < 1 && typeof lcySwing === "function")
lcySwing(w.g, t, 0.6, 6);
else if (work && typeof lcyArms === "function")
lcyArms(w.g, -0.7 + Math.sin(t * 2.4) * 0.5);
else if (typeof lcyStill === "function")
lcyStill(w.g);
});
}
Object.keys(INCD.errs).forEach(function (k) { if (!want[k]) {
var w = INCD.errs[k];
if (w.g.parent)
w.g.parent.remove(w.g);
delete INCD.errs[k];
} });
}
function cinCulpritNow(id) { return __ZC(395, 14, this, arguments, new.target); }
function cinWanted() { return INCD.rows.filter(function (r) { return r.kind === "crime" && !r.closed && r.state !== "arrested" && r.state !== "escaped"; }).map(function (r) { return cinCulpritNow(r.id); }).filter(Boolean); }
function cinLocated(id, where, by) { if (typeof cityRpc !== "function")
return Promise.resolve(null); return cityRpc("city_incident_located", { p_id: id, p_where: where || "", p_by: by || "Tracker drone" }).then(function (o) { cinPoll(true); return o; }); }
INCD.hunt = {};
function cinHunt(r) {
var h = INCD.hunt[r.id];
if (!h) {
var hd = r.hunt && r.hunt.drones_at ? Date.parse(r.hunt.drones_at) : 0;
h = INCD.hunt[r.id] = { off: 0, drones: hd ? Math.min(hd, Date.now()) : 0, seen: null, seenAt: 0, sight: 0, vis: false, losAt: 0, tag: 0, frz: 0, frzT: 0, bolt: 0, shoutAt: 0, cover: false, said: {} };
}
return h;
}
function cinT(r) {
var e = Math.max(0, (incdNow() - Date.parse(r.at)) / 1000), h = INCD.hunt[r.id];
if (!h)
return e;
if (h.frz > Date.now())
return h.frzT;
return Math.max(0, e + h.off);
}
function cinDronesUp(r) { var h = INCD.hunt[r.id]; return !!((r.hunt && r.hunt.drones_at) || (h && h.drones) || (!r.rider_dreamer && r.state === "chasing")); }
function cinSees(P, C) { return __ZC(395, 15, this, arguments, new.target); }
function cinSay(k, h, t) { if (h.said[k])
return; h.said[k] = 1; if (typeof setStatus === "function")
setStatus(t); }
function cinHuntTick(r, h, o, C, P, dt) { return __ZC(395, 16, this, arguments, new.target); }
var CIN_FREEZE_MS = 8000;
var CIN_FREEZE_OK = { freeze: 1, dragon: 1, corp: 1, police: 1, stop: 1, halt: 1, you: 1, there: 1, right: 1, now: 1, hands: 1, up: 1, on: 1, the: 1, ground: 1, officer: 1, rider: 1, hey: 1, and: 1 };
function cinFreezeWord(t, r) { return __ZC(395, 17, this, arguments, new.target); }
function cinShout(t) { return __ZC(395, 18, this, arguments, new.target); }
function cinChatBox(el) { return el && el.tagName === "INPUT" && (el.id === "st-say" || (el.closest && el.closest(".wc-foot"))); }
document.addEventListener("keydown", function (e) { if (e.key === "Enter" && cinChatBox(e.target))
try {
cinShout(e.target.value);
}
catch (x) { } }, true);
document.addEventListener("click", function (e) {
var b = e.target && e.target.closest && e.target.closest("#st-send,.wc-foot button");
if (!b)
return;
var inp = b.id === "st-send" ? document.getElementById("st-say") : b.closest(".wc-foot").querySelector("input");
if (inp)
try {
cinShout(inp.value);
}
catch (x) { }
}, true);
function cinCallDrones(r) { return __ZC(395, 19, this, arguments, new.target); }
function cinNear(P) {
var best = null;
function d2(x, z) { return (x - P.x) * (x - P.x) + (z - P.z) * (z - P.z); }
INCD.rows.forEach(function (r) {
if (r.closed)
return;
var o = INCD.objs[r.id];
if (!o)
return;
var F = o.F, df = d2(F.x, F.z), dc = o.cx !== undefined ? d2(o.cx, o.cz) : 1e12, b = null;
if (r.mine_rider && r.state === "responding" && df < 15 * 15)
b = { id: r.id, label: "📝 Take the statement from " + cinFirst(r.victim && r.victim.name), run: function () { cinDo(r.id, "statement"); } };
else if (r.mine_rider && r.state === "chasing")
b = cinChaseButton(r, o, dc);
else if (r.mine_crew && r.fix === "repairing" && df < 14 * 14)
b = cinJobButton(r);
else if (cinCanLaw(r) && df < 40 * 40)
b = { id: r.id, label: "🐉 Take this case", run: function () { cinTake(r.id, "law"); } };
else if (cinCanFix(r) && df < 40 * 40)
b = { id: r.id, label: "🛠️ Take this repair", run: function () { cinTake(r.id, "fix"); } };
else if (r.kind === "crime" && !r.mine_rider && !cinLaw() && /reported|responding|at_scene|chasing/.test(r.state) && dc < 20 * 20 && !(INCD.saw && INCD.saw[r.id]))
b = { id: r.id, label: "📞 Tell the Dragon Corp you saw " + cinFirst(r.culprit && r.culprit.name), run: function () { INCD.saw = INCD.saw || {}; INCD.saw[r.id] = 1; cinDo(r.id, "witness"); } };
if (b && (!best || b.label.charAt(0) !== "📞"))
best = b;
});
cinButton(best);
}
function cinChaseButton(r, o, dc) { return __ZC(395, 20, this, arguments, new.target); }
function cinJobButton(r) { return __ZC(395, 21, this, arguments, new.target); }
function cinButton(b) {
var el = document.getElementById("cin-act");
if (!b) {
if (el)
el.style.display = "none";
INCD.act = null;
return;
}
if (!el) {
el = document.createElement("button");
el.id = "cin-act";
el.type = "button";
el.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(200px + env(safe-area-inset-bottom,0px));z-index:41;padding:11px 18px;border-radius:999px;border:1px solid #C8392B;background:rgba(20,8,12,.9);color:#FFEDE8;font:600 14px system-ui,sans-serif;cursor:pointer;max-width:92vw";
el.onclick = function (ev) {
ev.stopPropagation();
var a = INCD.act;
if (!a)
return;
if (a.busy) {
if (typeof setStatus === "function")
setStatus(esc(a.busy));
return;
}
el.style.display = "none";
a.run();
};
document.body.appendChild(el);
}
INCD.act = b;
var label = b.label;
if (el.textContent !== label)
el.textContent = label;
el.style.display = "block";
}
if (typeof PS_KEEP !== "undefined")
PS_KEEP["cin-act"] = 1;
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
cinTick(dt);
}
catch (e) {
if (!INCD.warned) {
INCD.warned = true;
if (window.console)
console.warn("[city-incidents]", e);
}
}
}
};
})();
