/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(33, function () {
"use strict";
return [
function (o) {
var same = store.objects.filter(function (x) { return x.archetype === o.archetype && x.id !== o.id && !x.filler; });
if (!same.length) {
if (magicCool <= 0) {
magicCool = 3;
setStatus("<b>" + esc(placeName(o)) + "</b> — and nowhere yet on the other side. Dream another one.");
}
return;
}
var far = same[0], best = 1e9;
same.forEach(function (x) { var d = Math.hypot(x.x - o.x, x.z - o.z); if (d < best && d > 8) {
best = d;
far = x;
} });
magicCool = 3;
var ang = Math.random() * 6.283;
camera.position.set(far.x + Math.cos(ang) * 3, camera.position.y, far.z + Math.sin(ang) * 3);
if ((far.realm || 0) !== (store.here || 0) && typeof beHere === "function")
beHere(far.realm || 0);
setStatus("<b>Carried through " + esc(placeName(o)) + ".</b> You are somewhere else now.");
}
];
});
