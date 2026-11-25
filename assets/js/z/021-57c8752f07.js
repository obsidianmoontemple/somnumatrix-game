/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(21, function () {
"use strict";
return [
function (spec, f) {
var g = new THREE.Group(), members = [];
for (var i = 0; i < 7; i++) {
var p = { id: spec.id + ":" + i, archetype: (i === 5 ? "child" : "human"), filler: true, attrs: {} };
p.look = randomLook(p.id, p.archetype);
var one = buildFigure(p, f);
var hx = ((hash(p.id) % 100) / 100 - 0.5) * 6, hz = ((hash(p.id + "z") % 100) / 100 - 0.5) * 4.4;
one.position.set(hx, 0, hz);
one.rotation.y = ((hash(p.id + "r") % 628) / 100);
g.add(one);
members.push({ g: one, hx: hx, hz: hz, tx: hx, tz: hz, wait: (hash(p.id + "w") % 50) / 10, pace: 0.5 + (hash(p.id + "p") % 50) / 100 });
}
g.userData.anim = function (t, dt) {
members.forEach(function (m) {
var L = m.g.userData.limbs, dx = m.tx - m.g.position.x, dz = m.tz - m.g.position.z, d = Math.sqrt(dx * dx + dz * dz), moving = false;
if (d > 0.05) {
var st = Math.min(d, m.pace * dt);
m.g.position.x += dx / d * st;
m.g.position.z += dz / d * st;
moving = true;
var want = Math.atan2(dx, dz), diff = ((want - m.g.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
m.g.rotation.y += diff * Math.min(dt * 4, 1);
}
else {
m.wait -= dt;
if (m.wait <= 0) {
var a = Math.random() * 6.283, r = Math.random() * 1.4;
m.tx = m.hx + Math.cos(a) * r;
m.tz = m.hz + Math.sin(a) * r;
m.wait = 2 + Math.random() * 6;
}
}
if (L) {
var u = m.g.userData;
u.amp = (u.amp || 0) + ((moving ? 0.4 : 0) - (u.amp || 0)) * Math.min(dt * 6, 1);
u.phase = (u.phase || 0) + dt * (moving ? 5.5 : 0);
var s = Math.sin(u.phase) * u.amp;
L.ll.rotation.x = s;
L.rl.rotation.x = -s;
L.la.rotation.x = -s * 0.75;
L.ra.rotation.x = s * 0.75;
}
});
};
return g;
}
];
});
