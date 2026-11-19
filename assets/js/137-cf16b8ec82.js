/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var NGLOW = { pool: [], spots: {}, at: 0, n: 0, made: false, night: 0 };
function nightGlowN() {
var lite = typeof LITE !== "undefined" && LITE, phone = (typeof LOOK_PHONE !== "undefined") ? LOOK_PHONE : /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent || "");
if (lite)
return 0;
return phone ? 4 : 10;
}
function nightGlowSpot(key, s) { if (s)
NGLOW.spots[key] = s;
else
delete NGLOW.spots[key]; }
function nightGlowMake() {
if (NGLOW.made || typeof scene === "undefined" || !scene)
return;
NGLOW.made = true;
NGLOW.n = nightGlowN();
for (var i = 0; i < NGLOW.n; i++) {
var l = new THREE.PointLight(0xFFC27A, 0, 26, 2);
l.castShadow = false;
l.userData.k = 0;
l.userData.want = 0;
scene.add(l);
NGLOW.pool.push(l);
}
}
function nightGlowPoles(P, cand) {
if (typeof ATL_STREETS === "undefined" || typeof ATLC === "undefined" || !ATLC || typeof atlNearStair !== "function" || typeof atlClearLamp !== "function")
return;
var dx = P.x - ATLC.x, dz = P.z - ATLC.z, dc = Math.hypot(dx, dz), ac = Math.atan2(dz, dx), reach = 90;
Object.keys(ATL_STREETS).forEach(function (k) {
ATL_STREETS[k].forEach(function (rs) {
if (Math.abs(rs - dc) > reach + 10)
return;
var n = Math.round(rs * 2 * Math.PI / 32), span = reach / rs, i0 = Math.floor((ac - span) / (Math.PI * 2) * n), i1 = Math.ceil((ac + span) / (Math.PI * 2) * n);
for (var i = i0; i <= i1; i++) {
var a = (i / n) * Math.PI * 2;
[-1, 1].forEach(function (sd) {
var rl = rs + sd * 7.6;
if (atlNearStair(rl, a) || !atlClearLamp(rl, a))
return;
var x = ATLC.x + Math.cos(a) * rl, z = ATLC.z + Math.sin(a) * rl, d = Math.hypot(x - P.x, z - P.z);
if (d < reach)
cand.push({ x: x, y: ((typeof terrainY === "function") ? terrainY(x, z) : 0) + 5.4, z: z, d: d * 1.05, col: 0xFFD9A0, k: 1.2, r: 20 });
});
}
});
});
}
function nightGlowIsNight() {
var h = (typeof cityHourNow === "function") ? cityHourNow() : (typeof dreamHour === "function" ? dreamHour() : 12);
if (h >= 18.25 || h < 6.0)
return 1;
if (h >= 17.25)
return (h - 17.25);
if (h < 6.75)
return (6.75 - h) / 0.75;
return 0;
}
function nightGlowTick(dt) {
if (!NGLOW.made)
nightGlowMake();
if (!NGLOW.pool.length)
return;
NGLOW.at -= dt;
var inCity = (typeof careInCity === "function") && careInCity();
if (NGLOW.at <= 0) {
NGLOW.at = 0.5;
var night = inCity ? nightGlowIsNight() : 0;
NGLOW.night = night;
var P = camera.position, cand = [];
if (night > 0) {
var h = (typeof cityHourNow === "function") ? cityHourNow() : 22;
var list = (typeof lampList === "function") ? lampList() : [];
for (var i = 0; i < list.length; i++) {
var L = list[i], d = Math.hypot(L.x - P.x, L.z - P.z);
if (d < 140 && (typeof lampLitNow !== "function" || lampLitNow(L, h)))
cand.push({ x: L.x, y: (typeof terrainY === "function" ? terrainY(L.x, L.z) : 0) + L.top - 0.4, z: L.z, d: d, col: 0xFFC27A, k: 1.5, r: 24 });
}
nightGlowPoles(P, cand);
Object.keys(NGLOW.spots).forEach(function (k) {
var s = NGLOW.spots[k], d = Math.hypot(s.x - P.x, s.z - P.z);
if (d < 160)
cand.push({ x: s.x, y: s.y, z: s.z, d: d * (s.pri || 0.8), col: s.col || 0xFFB25A, k: s.k || 1.4, r: s.r || 22 });
});
cand.sort(function (a, b) { return a.d - b.d; });
}
NGLOW.pool.forEach(function (l, j) {
var c = cand[j];
if (!c) {
l.userData.want = 0;
return;
}
var moved = Math.hypot(l.position.x - c.x, l.position.z - c.z) > 0.5;
if (moved && l.userData.k > 0.05) {
l.userData.want = 0;
l.userData.next = c;
return;
}
l.position.set(c.x, c.y, c.z);
l.distance = c.r;
if (l.userData.col !== c.col) {
l.userData.col = c.col;
l.color.setHex(c.col);
}
l.userData.want = c.k * night;
l.userData.next = null;
});
}
NGLOW.pool.forEach(function (l) {
var u = l.userData, k = u.k + (u.want - u.k) * Math.min(1, dt * 3);
if (u.next && k < 0.05) {
var c = u.next;
l.position.set(c.x, c.y, c.z);
l.distance = c.r;
if (u.col !== c.col) {
u.col = c.col;
l.color.setHex(c.col);
}
u.want = c.k * NGLOW.night;
u.next = null;
}
u.k = k;
l.intensity = (store && store.inside) ? 0 : k;
l.visible = true;
});
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
nightGlowTick(dt);
}
catch (e) {
if (window.console && !NGLOW.warned) {
NGLOW.warned = 1;
console.warn("night glow:", e);
}
} };
})();
