/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(24, function () {
"use strict";
return [
function (p, dt, speed, drift) {
var A = pts(p);
if (!A)
return;
var a = A.array, S = p.userData.seed, sp = p.userData.spread;
for (var i = 0; i < S.length; i++) {
a[i * 3 + 1] += speed * S[i].s * dt;
a[i * 3] += drift * dt * S[i].s;
if (a[i * 3 + 1] > sp[1]) {
a[i * 3 + 1] = 0;
var ang = Math.random() * 6.283, r = Math.random();
a[i * 3] = Math.cos(ang) * r * sp[0];
a[i * 3 + 2] = Math.sin(ang) * r * sp[2];
}
}
A.needsUpdate = true;
},
function (p, dt, spin, lift, funnel) {
var A = pts(p);
if (!A)
return;
var a = A.array, S = p.userData.seed, sp = p.userData.spread;
for (var i = 0; i < S.length; i++) {
var s = S[i];
s.a += spin * s.s * dt;
s.y += lift * s.s * dt;
if (s.y > sp[1])
s.y = 0;
var rr = funnel ? (0.15 + 0.85 * (s.y / sp[1])) * sp[0] * (0.6 + 0.4 * s.r) : s.r * sp[0];
a[i * 3] = Math.cos(s.a) * rr;
a[i * 3 + 1] = s.y;
a[i * 3 + 2] = Math.sin(s.a) * rr * (funnel ? 1 : sp[2] / sp[0]);
}
A.needsUpdate = true;
},
function (g) {
var flames = [], smoke = particles(220, [16, 40, 16], 0x3E3A38, 4.5, 0.5);
smoke.position.y = 4;
g.add(smoke);
for (var i = 0; i < 14; i++) {
var fl = new THREE.Mesh(new THREE.ConeGeometry(1.2, 4, 6), glowMat(i % 2 ? 0xFF7A1E : 0xFFB23A, 0.85));
var a = Math.random() * 6.283, r = Math.random() * 12;
fl.position.set(Math.cos(a) * r, 2, Math.sin(a) * r);
g.add(fl);
flames.push(fl);
}
return function (t, dt) {
rise(smoke, dt, 4, 1);
flames.forEach(function (fl, k) { var s = 0.7 + 0.4 * Math.abs(Math.sin(t * 6 + k * 1.7)); fl.scale.set(1, s, 1); fl.position.y = 2 * s; });
};
},
function (g) {
var flames = [], smoke = particles(70, [2, 14, 2], 0x3E3A38, 2, 0.5);
smoke.position.y = 2;
g.add(smoke);
for (var i = 0; i < 5; i++) {
var fl = new THREE.Mesh(new THREE.ConeGeometry(0.6, 2.2, 6), glowMat(i % 2 ? 0xFF7A1E : 0xFFB23A, 0.9));
fl.position.set((i - 2) * 0.5, 1.1, (i % 2) * 0.4);
g.add(fl);
flames.push(fl);
}
return function (t, dt) {
rise(smoke, dt, 3, 0.6);
flames.forEach(function (fl, k) { var s = 0.7 + 0.45 * Math.abs(Math.sin(t * 7 + k * 2.1)); fl.scale.set(1, s, 1); fl.position.y = 1.1 * s; });
};
},
function (g) {
var fl = [];
for (var i = 0; i < 3; i++) {
var m = new THREE.Mesh(new THREE.ConeGeometry(0.5 - i * 0.1, 2 - i * 0.3, 6), glowMat(i ? 0x8FD3FF : 0x4FA3E8, 0.8));
m.position.y = 1;
g.add(m);
fl.push(m);
}
return function (t) { fl.forEach(function (m, k) { var s = 0.8 + 0.3 * Math.abs(Math.sin(t * 5 + k)); m.scale.set(1, s, 1); }); };
}
];
});
