/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(91, function () {
"use strict";
return [
function (e) {
e.preventDefault();
for (var i = 0; i < e.changedTouches.length; i++) {
var t = e.changedTouches[i];
fingers[t.identifier] = { x: t.clientX, y: t.clientY, x0: t.clientX, y0: t.clientY, t0: Date.now() };
}
var ids = Object.keys(fingers);
if (ids.length === 2 && !walkMode) {
var a = fingers[ids[0]], b = fingers[ids[1]];
pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2, r: orb.r };
}
idle = 0;
},
function (e) {
e.preventDefault();
var moved = {};
for (var i = 0; i < e.changedTouches.length; i++) {
var t = e.changedTouches[i], f = fingers[t.identifier];
if (!f)
continue;
moved[t.identifier] = { dx: t.clientX - f.x, dy: t.clientY - f.y };
f.x = t.clientX;
f.y = t.clientY;
}
if (plotBusy)
return;
var ids = Object.keys(fingers);
if (walkMode) {
for (var k in moved) {
yaw -= moved[k].dx * 0.006;
pitch = Math.max(-1.35, Math.min(1.35, pitch - moved[k].dy * 0.006));
}
return;
}
if (ids.length >= 2 && pinch) {
var a = fingers[ids[0]], b = fingers[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y);
orb.r = Math.max(22, Math.min(900, pinch.r * pinch.d / Math.max(20, d)));
var cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
if (typeof panOrbit === "function") {
panOrbit(cx - pinch.cx, cy - pinch.cy);
viewAt = { x: orb.tx, z: orb.tz };
}
pinch.cx = cx;
pinch.cy = cy;
idle = 0;
return;
}
if (ids.length === 1) {
var m = moved[ids[0]];
if (!m)
return;
orb.t -= m.dx * 0.006;
orb.p = Math.max(0.12, Math.min(1.5, orb.p - m.dy * 0.005));
idle = 0;
}
},
function (e) {
e.preventDefault();
for (var i = 0; i < e.changedTouches.length; i++) {
var t = e.changedTouches[i], f = fingers[t.identifier];
if (f) {
var still = Math.hypot(t.clientX - f.x0, t.clientY - f.y0) < 12, quick = Date.now() - f.t0 < 320;
if (still && quick && Object.keys(fingers).length === 1 && !plotOn)
tapAt(t.clientX, t.clientY);
}
delete fingers[t.identifier];
}
if (Object.keys(fingers).length < 2)
pinch = null;
},
function (x, y) {
var hit = typeof objectAt === "function" ? objectAt({ clientX: x, clientY: y }) : null;
if (!hit)
return;
var ch = typeof charOf === "function" ? charOf(hit) : null;
if (walkMode && ch) {
var dx = hit.x - camera.position.x, dz = hit.z - camera.position.z;
if (dx * dx + dz * dz < 12 * 12) {
if (ch.primary === false)
openGreet(ch);
else
openTalk(ch);
return;
}
}
openInspect(hit.id);
}
];
});
