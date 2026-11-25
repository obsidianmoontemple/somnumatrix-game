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
function lcyLoad() {
if (Date.now() - LCY.setAt < 10 * 60 * 1000 || typeof cityRpc !== "function")
return;
LCY.setAt = Date.now();
if (!(typeof signedIn === "function" && signedIn()))
return;
cityRpc("city_life_state").then(function (o) {
var s = o && o.settings;
if (!s || typeof s !== "object")
return;
Object.keys(LCY.set).forEach(function (k) { if (s[k] !== undefined && s[k] !== null)
LCY.set[k] = +s[k]; });
}).catch(function () { });
}
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
function lcyStripes() {
if (LCY.mats.stripe)
return LCY.mats.stripe;
var c = document.createElement("canvas");
c.width = 128;
c.height = 16;
var x = c.getContext("2d");
for (var i = 0; i < 8; i++) {
x.fillStyle = i % 2 ? "#F4F4F0" : "#D3271F";
x.beginPath();
x.moveTo(i * 16, 16);
x.lineTo(i * 16 + 8, 0);
x.lineTo(i * 16 + 24, 0);
x.lineTo(i * 16 + 16, 16);
x.fill();
}
var t = new THREE.CanvasTexture(c);
t.wrapS = THREE.RepeatWrapping;
return (LCY.mats.stripe = new THREE.MeshLambertMaterial({ map: t }));
}
function lcySignMat(lines, bg, fg) {
var k = "sign|" + lines.join("|");
if (LCY.mats[k])
return LCY.mats[k];
var c = document.createElement("canvas");
c.width = 512;
c.height = 256;
var x = c.getContext("2d");
x.fillStyle = bg;
x.fillRect(0, 0, 512, 256);
x.strokeStyle = fg;
x.lineWidth = 10;
x.strokeRect(10, 10, 492, 236);
x.fillStyle = fg;
x.textAlign = "center";
x.font = "bold 54px Georgia,serif";
x.fillText(lines[0], 256, 100);
x.font = "34px Georgia,serif";
if (lines[1])
x.fillText(lines[1], 256, 160);
if (lines[2])
x.fillText(lines[2], 256, 206);
return (LCY.mats[k] = new THREE.MeshLambertMaterial({ map: new THREE.CanvasTexture(c) }));
}
function lcyBox(w, h, d, mat, x, y, z) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x || 0, y || 0, z || 0); m.raycast = function () { }; return m; }
function lcyCyl(r1, r2, h, mat, x, y, z, seg) { var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg || 10), mat); m.position.set(x || 0, y || 0, z || 0); m.raycast = function () { }; return m; }
function lcyCone() {
var g = new THREE.Group();
g.add(lcyCyl(0.03, 0.17, 0.62, lcyMat(0xF26A1B), 0, 0.33, 0, 12));
g.add(lcyCyl(0.08, 0.11, 0.12, lcyMat(0xF4F4F0), 0, 0.38, 0, 12));
g.add(lcyBox(0.42, 0.04, 0.42, lcyMat(0x1E1E1E), 0, 0.02, 0));
return g;
}
function lcyBarrier() {
var g = new THREE.Group(), s = lcyBox(2.2, 0.24, 0.06, lcyStripes(), 0, 0.86, 0);
g.add(s);
g.add(lcyBox(2.2, 0.18, 0.06, lcyStripes(), 0, 0.45, 0));
[-1, 1].forEach(function (e) { g.add(lcyBox(0.06, 1.0, 0.5, lcyMat(0x2A2A2A), e * 1.0, 0.5, 0)); });
var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), new THREE.MeshBasicMaterial({ color: 0x6A4410 }));
lamp.position.set(0.9, 1.05, 0);
lamp.raycast = function () { };
g.add(lamp);
g.userData.lamp = lamp;
return g;
}
function lcyBin() {
var g = new THREE.Group(), body = lcyBox(0.58, 0.95, 0.7, lcyMat(0x2F5E3A), 0, 0.52, 0);
g.add(body);
var lid = lcyBox(0.62, 0.06, 0.74, lcyMat(0x26502F), 0, 1.02, 0);
g.add(lid);
g.userData.lid = lid;
[-0.22, 0.22].forEach(function (x) { var w = lcyCyl(0.09, 0.09, 0.06, lcyMat(0x151515), x, 0.09, -0.3, 10); w.rotation.z = Math.PI / 2; g.add(w); });
return g;
}
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
function lcyBinLorry(seed) {
var v = new THREE.Group(), white = lcyMat(0xEDEDE8), green = lcyMat(0x2E6B3E), dark = lcyMat(0x1C1F24), glass = lcyMat(0x2A3A48, 0x0A1018), tyre = lcyMat(0x151515);
var side = lcySignMat(["Somnucor", "City Cleansing", "Keep our streets tidy"], "#2E6B3E", "#F2EEE2");
v.add(lcyBox(2.3, 0.5, 8.6, dark, 0, 0.75, 0));
v.add(lcyBox(2.4, 2.1, 2.0, white, 0, 2.0, 3.2));
v.add(lcyBox(2.2, 0.9, 0.06, glass, 0, 2.45, 4.21));
[-1, 1].forEach(function (e) { v.add(lcyBox(0.06, 0.7, 1.0, glass, e * 1.21, 2.4, 3.4)); });
v.add(lcyBox(2.4, 0.35, 0.15, dark, 0, 1.1, 4.25));
[-0.85, 0.85].forEach(function (x) { v.add(lcyBox(0.35, 0.2, 0.06, new THREE.MeshBasicMaterial({ color: 0xFFF4D8 }), x, 1.35, 4.24)); });
var body = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.7, 5.2), [side, side, green, green, green, green]);
body.position.set(0, 2.35, -0.6);
body.raycast = function () { };
v.add(body);
v.add(lcyBox(2.5, 2.2, 1.2, lcyMat(0x3A3E44), 0, 2.0, -3.8));
v.add(lcyBox(2.3, 0.12, 0.5, lcyMat(0xE8B21E), 0, 0.95, -4.5));
[-0.95, 0.95].forEach(function (x) { v.add(lcyBox(0.18, 0.3, 0.06, new THREE.MeshBasicMaterial({ color: 0x8A1810 }), x, 1.3, -4.42)); });
[[3.0], [-1.6], [-2.9]].forEach(function (z) { [-1.12, 1.12].forEach(function (x) { var w = lcyCyl(0.52, 0.52, 0.4, tyre, x, 0.52, z[0], 14); w.rotation.z = Math.PI / 2; v.add(w); }); });
v.userData.lcyArch = "truck";
return v;
}
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
function lcyCrew(kind, i, streets) {
var seed = kind + i, h = lcyHash(seed + "|" + lcyDay()), r = streets[h % streets.length], dir = (h >>> 4) % 2 ? 1 : -1;
var C = { kind: kind, i: i, r: r, dir: dir, a0: ((h >>> 8) % 3600) / 3600 * Math.PI * 2, men: [], veh: null, g: new THREE.Group(), v: 0, wait: false };
LCY.root.add(C.g);
if (kind === "trash") {
C.hours = [[5.5, 5], [14, 3]];
C.L = 40;
C.vv = 3.2;
C.W = 16;
C.lane = r + (typeof ROAD_SIDE !== "undefined" ? ROAD_SIDE : -1) * dir * 2.6;
C.veh = lcyBinLorry(seed);
C.g.add(C.veh);
C.bin = lcyBin();
C.g.add(C.bin);
for (var k = 0; k < 2; k++) {
var m = lcyMan(seed + "m" + k, { dress: "hivis" });
if (m) {
C.g.add(m);
C.men.push({ g: m, role: "a bin man on the " + (k ? "right" : "left") + " side of the lorry" });
}
}
var dm = lcyMan(seed + "d", { dress: "hivis" });
if (dm && C.veh) {
dm.position.set(0.55, 0.75, 3.1);
C.veh.add(dm);
C.driver = dm;
}
}
else if (kind === "sweep") {
C.hours = [[6, 7], [13, 7]];
C.vv = 0.7;
C.lane = r + dir * 8.2;
var s = lcyMan(seed, { dress: "hivis", tool: "broom" });
if (s) {
C.g.add(s);
C.men.push({ g: s, role: "a street sweeper" });
}
}
else if (kind === "post") {
C.hours = [[7, 5]];
C.L = 24;
C.vv = 1.1;
C.W = 7;
C.lane = r + dir * 8.4;
var p = lcyMan(seed, { dress: "post", tool: "bag" });
if (p) {
C.g.add(p);
C.men.push({ g: p, role: "the postie on the morning round" });
}
}
else if (kind === "night") {
C.hours = [[21, 9]];
C.vv = 0.9;
C.lane = r - dir * 8.4;
var w = lcyMan(seed, { dress: "watch", tool: "lantern" });
if (w) {
C.g.add(w);
C.men.push({ g: w, role: "the night watchman walking his beat" });
}
}
else if (kind === "deliver") {
C.hours = [[7, 13]];
C.L = 260;
C.vv = 7;
C.W = 26;
C.lane = r + (typeof ROAD_SIDE !== "undefined" ? ROAD_SIDE : -1) * dir * 2.6;
C.veh = lcyVan("van", seed);
if (C.veh)
C.g.add(C.veh);
var c = lcyMan(seed, { dress: "van" });
if (c) {
C.g.add(c);
C.men.push({ g: c, role: "a delivery driver" });
C.parcel = lcyTool("parcel");
c.add(C.parcel);
C.parcel.position.set(0, 1.0, 0.32);
}
}
C.g.visible = false;
LCY.crews.push(C);
return C;
}
function lcyCrewTick(C, h, t, P) {
var on = lcyOn(C.kind) && lcyInHours(C.hours, h);
if (!on) {
if (C.g.visible)
C.g.visible = false;
return;
}
var sec = on.since * 3600, fw = C.dir;
if (C.kind === "trash" || C.kind === "post" || C.kind === "deliver") {
var R = lcyRound(sec, C.L, C.vv, C.W), a = C.a0 + fw * R.d / C.lane;
C.wait = R.stop >= 0;
C.v = C.wait ? 0 : C.vv;
C.a = a;
var Q = lcyPos(C.lane, a);
C.x = Q.x;
C.z = Q.z;
if (!C.cullOk) {
C.g.visible = false;
return;
}
C.g.visible = true;
var face = lcyFace(a, fw);
if (C.veh) {
C.veh.position.set(Q.x, Q.y, Q.z);
C.veh.rotation.y = face;
}
var back = { x: Q.x - Math.sin(face) * 5.0, z: Q.z - Math.cos(face) * 5.0 };
var kx = Math.cos(a) * (C.lane < C.r ? -1 : 1), kz = Math.sin(a) * (C.lane < C.r ? -1 : 1);
if (C.kind === "trash") {
var st = R.stop, kerb = { x: back.x + kx * 4.4, z: back.z + kz * 4.4 };
C.men.forEach(function (m, j) {
var g = m.g, side = j ? 1 : -1, rest = { x: back.x + Math.cos(face) * side * 0.7, z: back.z - Math.sin(face) * side * 0.7 };
if (st < 0) {
g.position.set(rest.x + Math.sin(face) * 0.4, Q.y + 0.95, rest.z + Math.cos(face) * 0.4);
g.rotation.y = face + Math.PI;
lcyStill(g);
return;
}
var target = j === 0 ? kerb : { x: back.x + kx * 1.6 + Math.cos(face) * 1.2, z: back.z + kz * 1.6 - Math.sin(face) * 1.2 }, f;
if (st < 0.3) {
f = st / 0.3;
}
else if (st < 0.75) {
f = 1;
}
else {
f = 1 - (st - 0.75) / 0.25;
}
if (j === 0 && st >= 0.3 && st < 0.75) {
var g2 = (st - 0.3) / 0.45;
target = { x: kerb.x + (back.x - kerb.x) * Math.min(1, g2 * 2), z: kerb.z + (back.z - kerb.z) * Math.min(1, g2 * 2) };
}
var x = rest.x + (target.x - rest.x) * f, z = rest.z + (target.z - rest.z) * f;
var moving = (st < 0.3 || st > 0.75);
g.position.set(x, terrainY(x, z), z);
g.rotation.y = moving ? Math.atan2(target.x - rest.x, target.z - rest.z) + (st > 0.75 ? Math.PI : 0) : face + Math.PI;
if (moving)
lcySwing(g, t, 0.45, 6);
else
lcyArms(g, -1.1);
});
var bin = C.bin, m0 = C.men[0] && C.men[0].g;
if (st < 0.3) {
bin.position.set(kerb.x, terrainY(kerb.x, kerb.z), kerb.z);
bin.rotation.set(0, face, 0);
bin.userData.lid.rotation.x = 0;
}
else if (m0) {
var p = m0.position;
bin.position.set(p.x + Math.sin(m0.rotation.y) * 0.7, p.y, p.z + Math.cos(m0.rotation.y) * 0.7);
bin.rotation.set(0, m0.rotation.y, 0);
var tip = st >= 0.5 && st < 0.72;
bin.rotation.x = tip ? -1.9 * Math.sin((st - 0.5) / 0.22 * Math.PI) : 0;
bin.position.y += tip ? 0.9 * Math.sin((st - 0.5) / 0.22 * Math.PI) : 0;
bin.userData.lid.rotation.x = tip ? -1.2 : 0;
}
if (st < 0)
bin.visible = false;
else
bin.visible = true;
}
else if (C.kind === "post") {
var g = C.men[0] && C.men[0].g;
if (!g)
return;
var off = R.stop >= 0 ? Math.sin(Math.min(1, R.stop) * Math.PI) * 2.4 : 0, side = C.lane > C.r ? 1 : -1;
var x = Q.x + Math.cos(a) * side * off, z = Q.z + Math.sin(a) * side * off;
g.position.set(x, terrainY(x, z), z);
if (R.stop >= 0) {
g.rotation.y = Math.atan2(Math.cos(a) * side, Math.sin(a) * side) + (R.stop < 0.5 ? 0 : Math.PI);
if (R.stop > 0.4 && R.stop < 0.6)
lcyArms(g, -1.0);
else
lcySwing(g, t, 0.4, 5);
}
else {
g.rotation.y = face;
lcySwing(g, t, 0.4, 5);
}
}
else {
var c = C.men[0] && C.men[0].g;
if (!c)
return;
var out2 = C.lane > C.r ? 1 : -1;
if (R.stop < 0) {
c.visible = false;
}
else {
c.visible = true;
var s = R.stop, f2 = s < 0.4 ? s / 0.4 : s < 0.6 ? 1 : 1 - (s - 0.6) / 0.4, dd = 2 + f2 * 8.5;
var x2 = Q.x + Math.cos(a) * out2 * dd, z2 = Q.z + Math.sin(a) * out2 * dd;
c.position.set(x2, terrainY(x2, z2), z2);
c.rotation.y = Math.atan2(Math.cos(a) * out2, Math.sin(a) * out2) + (s < 0.5 ? 0 : Math.PI);
if (C.parcel)
C.parcel.visible = s < 0.5;
if (s < 0.4 || s > 0.6)
lcySwing(c, t, 0.45, 6);
else
lcyArms(c, -0.9);
}
}
return;
}
var d = sec * C.vv, a2 = C.a0 + fw * d / C.lane, Q2 = lcyPos(C.lane, a2);
C.a = a2;
C.x = Q2.x;
C.z = Q2.z;
C.v = C.vv;
C.wait = false;
if (!C.cullOk) {
C.g.visible = false;
return;
}
C.g.visible = true;
var g3 = C.men[0] && C.men[0].g;
if (!g3)
return;
g3.position.set(Q2.x, Q2.y, Q2.z);
g3.rotation.y = lcyFace(a2, fw);
if (C.kind === "sweep") {
lcySwing(g3, t, 0.25, 3);
var tl = g3.userData.tool;
if (tl)
tl.rotation.y = Math.sin(t * 2.2) * 0.5;
}
else
lcySwing(g3, t, 0.3, 3.4);
}
function lcyStand() {
if (LCY.stand)
return LCY.stand;
var r = somnucorRealm(), S = [];
(store.objects || []).forEach(function (o) {
if (o.realm !== r.id)
return;
var k = KIT[o.archetype];
if (!k || k.cat === "being")
return;
var s = (o.attrs && o.attrs.s) || 1;
S.push({ x: o.x, z: o.z, r: Math.max(k.size[0] * (o.attrs && o.attrs.w || 1), k.size[2] * (o.attrs && o.attrs.d || 1)) * s * 0.5 });
});
(typeof lotPlots === "function" ? lotPlots() : (store.plots || [])).forEach(function (p) { if (p && typeof p.x === "number")
S.push({ x: p.x, z: p.z, r: (typeof LOT_R !== "undefined" ? LOT_R : 20) }); });
return (LCY.stand = S);
}
function lcyClear(x, z, rad) { var S = lcyStand(); for (var i = 0; i < S.length; i++) {
var q = S[i], dx = q.x - x, dz = q.z - z, m = q.r + rad;
if (dx * dx + dz * dz < m * m)
return false;
} return true; }
function lcyWorks(i, streets) {
var day = lcyDay(), h = lcyHash("works" + i + "|" + day), r = streets[(h >>> 3) % streets.length], side = (h >>> 9) % 2 ? 1 : -1, a = null;
for (var k = 0; k < 40 && a === null; k++) {
var t = ((lcyHash("wa" + i + "|" + day + "|" + k)) % 3600) / 3600 * Math.PI * 2;
if (typeof atlClearAt !== "function" || atlClearAt(r, t, 14, 6))
a = t;
}
if (a === null)
return null;
var G = new THREE.Group(), lane = r + side * 3.0, span = 18, n = 7;
var S = { kind: "works", g: G, a: a, r: r, men: [], lamps: [], x: 0, z: 0 };
for (var c = 0; c < n; c++) {
var aa = a + (c / (n - 1) - 0.5) * span / lane, Q = lcyPos(r + side * 0.4, aa), cn = lcyCone();
cn.position.set(Q.x, Q.y, Q.z);
G.add(cn);
}
[-1, 1].forEach(function (e) { var aa = a + e * span * 0.55 / lane, Q = lcyPos(lane + side * 0.2, aa), b = lcyBarrier(); b.position.set(Q.x, Q.y, Q.z); b.rotation.y = -aa; G.add(b); S.lamps.push(b.userData.lamp); });
var Qs = lcyPos(lane + side * 2.5, a + (span * 0.75) / lane), sign = new THREE.Group();
var plate = lcyBox(0.9, 0.9, 0.04, lcySignMat(["ROAD", "WORKS", "AHEAD"], "#F4D21C", "#151515"), 0, 1.1, 0);
sign.add(plate);
sign.add(lcyBox(0.05, 1.2, 0.05, lcyMat(0x2A2A2A), 0, 0.6, 0));
sign.position.set(Qs.x, Qs.y, Qs.z);
sign.rotation.y = lcyFace(a, side > 0 ? 1 : -1);
G.add(sign);
var Qh = lcyPos(lane, a), hole = lcyBox(3.4, 0.08, 1.8, lcyMat(0x3A2A1C), 0, 0.03, 0);
hole.position.set(Qh.x, Qh.y + 0.03, Qh.z);
hole.rotation.y = Math.PI / 2 - a;
G.add(hole);
var Qp = lcyPos(lane, a + 3.2 / lane), pile = lcyCyl(0.2, 1.1, 0.7, lcyMat(0x6B5236), 0, 0, 0, 9);
pile.position.set(Qp.x, Qp.y + 0.35, Qp.z);
G.add(pile);
var dig = lcyVan(KIT.tractor ? "tractor" : "van", "w" + i);
if (dig) {
var Qd = lcyPos(lane, a - 6 / lane);
dig.position.set(Qd.x, Qd.y, Qd.z);
dig.rotation.y = lcyFace(a, 1);
G.add(dig);
}
var kit = [{ tool: "shovel", role: "digging out the hole" }, { tool: "drill", role: "breaking up the road with the drill" }, { tool: "board", role: "turning the stop/go board for the traffic" }];
kit.forEach(function (k2, j) {
var m = lcyMan("works" + i + "|" + day + "|" + j, { dress: "hivis", helmet: 0xF4F4F0, tool: k2.tool });
if (!m)
return;
var off = j === 2 ? span * 0.62 : (j - 0.5) * 1.6, rr = j === 2 ? lane + side * 1.2 : lane + side * (j ? 0.9 : -0.9), Q = lcyPos(rr, a + off / lane);
m.position.set(Q.x, Q.y, Q.z);
m.rotation.y = lcyFace(a, j === 2 ? -1 : 1) + (j === 0 ? Math.PI / 2 : 0);
G.add(m);
S.men.push({ g: m, role: "on the road works crew, " + k2.role, job: k2.tool, base: m.position.clone() });
});
var Qc = lcyPos(lane, a);
S.x = Qc.x;
S.z = Qc.z;
S.street = r;
G.visible = false;
LCY.root.add(G);
LCY.sites.push(S);
return S;
}
function lcyBuildSite(i, streets) {
var epoch = Math.floor(lcyDay() / 10), stage = lcyDay() % 10, W = 15, D = 13, spot = null;
for (var k = 0; k < 60 && !spot; k++) {
var h = lcyHash("site" + i + "|" + epoch + "|" + k), r = streets[h % streets.length], side = (h >>> 5) % 2 ? 1 : -1, rb = r + side * (ATL_ROAD + ATL_SETBACK + D / 2 + 2);
var a = ((h >>> 9) % 3600) / 3600 * Math.PI * 2;
if (typeof atlClearAt === "function" && !atlClearAt(rb, a, W / 2 + 4, 6))
continue;
var Q = lcyPos(rb, a);
if (!lcyClear(Q.x, Q.z, Math.max(W, D) / 2 + 3))
continue;
spot = { r: r, rb: rb, a: a, side: side, Q: Q };
}
if (!spot)
return null;
var G = new THREE.Group(), Q = spot.Q, S = { kind: "build", g: G, men: [], x: Q.x, z: Q.z, stage: stage, street: spot.r };
G.position.set(Q.x, Q.y, Q.z);
G.rotation.y = Math.atan2(spot.side * Math.cos(spot.a), spot.side * Math.sin(spot.a));
var ply = lcyMat(0x2E5B3A), fw = W + 4, fd = D + 4;
[[0, fd / 2, fw, 0], [0, -fd / 2, fw, 0], [fw / 2, 0, fd, 1], [-fw / 2, 0, fd, 1]].forEach(function (f, j) {
if (j === 1) {
[-1, 1].forEach(function (e) { var seg = lcyBox(fw / 2 - 2.5, 2.2, 0.08, ply, e * (fw / 4 + 1.25), 1.1, f[1]); G.add(seg); });
return;
}
var b = lcyBox(f[2], 2.2, 0.08, ply, f[0], 1.1, f[1]);
if (f[3])
b.rotation.y = Math.PI / 2;
G.add(b);
});
var board = lcyBox(3.2, 1.6, 0.06, lcySignMat(["New homes", "Somnucor Builders", "Coming soon"], "#F2EEE2", "#2E5B3A"), 3.5, 2.9, -fd / 2 - 0.06);
G.add(board);
G.add(lcyBox(0.08, 2.0, 0.08, lcyMat(0x2A2A2A), 2.2, 1.0, -fd / 2 - 0.08));
G.add(lcyBox(0.08, 2.0, 0.08, lcyMat(0x2A2A2A), 4.8, 1.0, -fd / 2 - 0.08));
var conc = lcyMat(0xA7A39A), brick = lcyMat(0x9A4E36), steel = lcyMat(0x8C949B), yel = lcyMat(0xE8B21E), glass = lcyMat(0x5E7C92, 0x203040);
var floors = Math.max(0, Math.min(5, stage - 1)), FH = 3.2;
if (stage === 0) {
for (var p = 0; p < 3; p++) {
var pile = lcyCyl(0.4, 2.2, 1.4, lcyMat(0x6B5236), -4 + p * 3.5, 0.7, 2, 9);
G.add(pile);
}
G.add(lcyBox(W, 0.06, D, lcyMat(0x4A3826), 0, 0.03, 0));
}
if (stage >= 1)
G.add(lcyBox(W, 0.4, D, conc, 0, 0.2, 0));
for (var f = 0; f < floors; f++) {
var y = 0.4 + f * FH;
[[-1, -1], [1, -1], [-1, 1], [1, 1], [0, -1], [0, 1]].forEach(function (c) { G.add(lcyBox(0.4, FH, 0.4, conc, c[0] * (W / 2 - 0.3), y + FH / 2, c[1] * (D / 2 - 0.3))); });
G.add(lcyBox(W, 0.3, D, conc, 0, y + FH, 0));
var walls = stage >= 7 || f < floors - 2;
if (walls) {
[[0, D / 2 - 0.15, W, 0], [0, -D / 2 + 0.15, W, 0], [W / 2 - 0.15, 0, D, 1], [-W / 2 + 0.15, 0, D, 1]].forEach(function (w) {
var b = lcyBox(w[2], FH - 0.3, 0.25, brick, w[0], y + FH / 2, w[1]);
if (w[3])
b.rotation.y = Math.PI / 2;
G.add(b);
if (stage >= 8)
for (var q = -2; q <= 2; q++) {
var win = lcyBox(1.2, 1.4, 0.06, glass, w[3] ? 0 : q * 2.6, y + FH / 2 + 0.2, 0);
win.position.x = w[3] ? w[0] + (w[0] > 0 ? 0.14 : -0.14) : q * 2.6;
win.position.z = w[3] ? q * 2.2 : w[1] + (w[1] > 0 ? 0.14 : -0.14);
if (w[3])
win.rotation.y = Math.PI / 2;
G.add(win);
}
});
}
}
var topY = 0.4 + floors * FH;
if (stage >= 8) {
var roof = lcyBox(W + 0.6, 0.5, D + 0.6, lcyMat(0x4A4E55), 0, topY + 0.25, 0);
G.add(roof);
}
if (stage >= 2 && stage <= 8) {
var pole = steel, sh = topY + 1.2;
[[0, D / 2 + 1.1, W, 0], [0, -D / 2 - 1.1, W, 0], [W / 2 + 1.1, 0, D, 1], [-W / 2 - 1.1, 0, D, 1]].forEach(function (f) {
var run = f[2] + 2.2, side = new THREE.Group();
side.position.set(f[0], 0, f[1]);
if (f[3])
side.rotation.y = Math.PI / 2;
for (var x = -run / 2; x <= run / 2 + 0.01; x += 2.4)
side.add(lcyBox(0.06, sh, 0.06, pole, x, sh / 2, 0));
for (var y2 = 2; y2 < sh; y2 += 2) {
side.add(lcyBox(run, 0.06, 0.06, pole, 0, y2 + 1, 0));
side.add(lcyBox(run, 0.05, 0.9, lcyMat(0x8A6E46), 0, y2 - 0.03, (f[1] > 0 || f[0] > 0) ? -0.45 : 0.45));
}
G.add(side);
});
}
if (stage >= 2 && stage <= 8) {
var CH = topY + 14, cx = W / 2 + 3.5, cz = 0;
for (var e2 = 0; e2 < 4; e2++) {
var lx = (e2 % 2 ? 0.7 : -0.7), lz = (e2 < 2 ? 0.7 : -0.7);
G.add(lcyBox(0.12, CH, 0.12, yel, cx + lx, CH / 2, cz + lz));
}
for (var y3 = 3; y3 < CH; y3 += 3) {
G.add(lcyBox(1.5, 0.1, 0.1, yel, cx, y3, cz + 0.7));
G.add(lcyBox(1.5, 0.1, 0.1, yel, cx, y3, cz - 0.7));
G.add(lcyBox(0.1, 0.1, 1.5, yel, cx + 0.7, y3, cz));
G.add(lcyBox(0.1, 0.1, 1.5, yel, cx - 0.7, y3, cz));
}
var jib = new THREE.Group();
jib.position.set(cx, CH, cz);
G.add(jib);
jib.add(lcyBox(26, 0.7, 0.7, yel, -8, 0.35, 0));
jib.add(lcyBox(2.2, 2, 2.2, lcyMat(0xD8D4C8), 0.2, -0.8, 0));
jib.add(lcyBox(3, 1.6, 1.4, conc, 5.5, 0.3, 0));
var line = lcyBox(0.04, 1, 0.04, lcyMat(0x222222), -13, -1, 0);
jib.add(line);
var hook = lcyBox(0.9, 0.6, 0.9, lcyMat(0x7A6248), -13, -1, 0);
jib.add(hook);
S.jib = jib;
S.line = line;
S.hook = hook;
S.CH = CH;
}
var spots = [[-3, topY + (stage >= 2 ? 0 : 0.4), -D / 2 - 1.1, "laying bricks on the scaffold"], [3, topY + (stage >= 2 ? 0 : 0.4), D / 2 + 1.1, "fixing the scaffold boards"], [-W / 2 + 1, 0.4, -1, "mixing mortar"], [1, 0.4, -D / 2 - 2.5, "the site foreman with the plans"]];
if (stage < 2) {
spots = [[-3, 0.06, 1, "digging out the footings"], [2, 0.06, -2, "setting out the lines for the walls"], [-W / 2 + 1, 0.06, -1, "mixing concrete"], [1, 0.06, -D / 2 - 2.5, "the site foreman with the plans"]];
}
spots.forEach(function (s, j) {
if (lcyLite() && j > 1)
return;
var m = lcyMan("site" + i + "|" + epoch + "|" + j, { dress: "site", helmet: j === 3 ? 0xF4F4F0 : 0xF2C12E, tool: j === 0 && stage < 2 ? "shovel" : null });
if (!m)
return;
m.position.set(s[0], s[1], s[2]);
m.rotation.y = s[2] < 0 ? 0 : Math.PI;
G.add(m);
S.men.push({ g: m, role: "a builder on the building site, " + s[3], y: s[1] });
});
if (stage === 0) {
var dig = lcyVan(KIT.tractor ? "tractor" : "van", "s" + i);
if (dig) {
dig.position.set(4, 0.06, 1);
dig.rotation.y = 0.6;
G.add(dig);
}
}
G.visible = false;
LCY.root.add(G);
LCY.sites.push(S);
return S;
}
function lcySiteTick(S, h, t) {
var day = h >= 7.5 && h < 17, on = lcyOn(S.kind);
if (!on) {
S.g.visible = false;
return;
}
S.g.visible = !!S.cullOk;
if (!S.g.visible)
return;
if (S.kind === "works") {
var dark = h < 7 || h >= 18.5;
S.lamps.forEach(function (l) { l.material.color.setHex(dark && (Math.floor(t) % 2 === 0) ? 0xFFB028 : 0x6A4410); });
S.men.forEach(function (m) {
m.g.visible = day;
if (!day)
return;
if (m.job === "shovel") {
lcyArms(m.g, -0.6 + Math.sin(t * 2.4) * 0.7);
m.g.position.y = m.base.y;
}
else if (m.job === "drill") {
lcyArms(m.g, -0.9);
var tl = m.g.userData.tool;
if (tl)
tl.position.y = Math.abs(Math.sin(t * 28)) * 0.04;
}
else if (m.job === "board") {
var tl2 = m.g.userData.tool;
if (tl2)
tl2.rotation.y = (Math.floor(t / 20) % 2) * Math.PI;
}
});
}
else {
S.men.forEach(function (m, j) { m.g.visible = day; if (!day)
return; lcyArms(m.g, -0.5 + Math.sin(t * 1.8 + j) * 0.5); });
if (S.jib) {
S.jib.rotation.y = day ? Math.sin(t * 0.05 + S.x) * 1.2 : 0.3;
var drop = day ? 6 + Math.sin(t * 0.13) * 5 : 2;
S.line.scale.y = drop;
S.line.position.y = -drop / 2;
S.hook.position.y = -drop - 0.3;
}
}
}
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
function lcyBuild() {
lcyClearAll();
LCY.root = new THREE.Group();
LCY.root.name = "living-city";
scene.add(LCY.root);
var lite = lcyLite(), busy = Math.max(0.5, Math.min(2, +LCY.set.busy || 1)), st = lcyStreets(), inner = st.filter(function (r) { return r >= 400; });
function n(base) { return Math.max(1, Math.round(base * busy * (lite ? 0.5 : 1))); }
var i;
for (i = 0; i < n(3); i++)
lcyCrew("trash", i, inner);
for (i = 0; i < n(6); i++)
lcyCrew("sweep", i, st);
for (i = 0; i < n(3); i++)
lcyCrew("post", i, inner);
for (i = 0; i < n(2); i++)
lcyCrew("night", i, st);
for (i = 0; i < n(3); i++)
lcyCrew("deliver", i, inner);
for (i = 0; i < n(3); i++)
lcyWorks(i, inner);
for (i = 0; i < n(2); i++)
lcyBuildSite(i, inner);
LCY.day = lcyDay();
LCY.built = true;
LCY.busyAt = busy;
}
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
function lcyNear(P) {
var best = null, bd = 5 * 5;
function look(m, what) { if (!m || !m.g || !m.g.visible)
return; var p = new THREE.Vector3(); m.g.getWorldPosition(p); var dx = p.x - P.x, dz = p.z - P.z, d = dx * dx + dz * dz; if (d < bd) {
bd = d;
best = { g: m.g, role: m.role, what: what };
} }
LCY.crews.forEach(function (C) { if (!C.g.visible)
return; C.men.forEach(function (m) { look(m, C); }); });
LCY.sites.forEach(function (S) { if (!S.g.visible)
return; S.men.forEach(function (m) { look(m, S); }); });
if (typeof talkWith !== "undefined" && talkWith) {
lcyPrompt(null);
return;
}
if (!best) {
lcyPrompt(null);
return;
}
lcyPrompt(best);
}
function lcyPersona(b) { return __ZC(383, 0, this, arguments, new.target); }
function lcyPrompt(b) {
var el = document.getElementById("lcy-talk");
if (!b) {
if (el)
el.style.display = "none";
LCY.near = null;
return;
}
if (!el) {
el = document.createElement("button");
el.id = "lcy-talk";
el.type = "button";
el.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(150px + env(safe-area-inset-bottom,0px));z-index:40;padding:10px 16px;border-radius:999px;border:1px solid #F07818;background:rgba(11,10,20,.88);color:#EDE8F8;font:600 14px system-ui,sans-serif;cursor:pointer";
el.onclick = function (ev) {
ev.stopPropagation();
var n = LCY.near;
if (!n || typeof wTalk !== "function")
return;
var nm = n.g.userData.lcyName;
wTalk({ name: nm, persona: lcyPersona(n), greet: lcyGreet(n), doing: "at work" });
el.style.display = "none";
};
document.body.appendChild(el);
}
LCY.near = b;
var label = "💬 Talk to " + b.g.userData.lcyName;
if (el.textContent !== label)
el.textContent = label;
el.style.display = "block";
}
function lcyGreet(b) { return __ZC(383, 1, this, arguments, new.target); }
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
