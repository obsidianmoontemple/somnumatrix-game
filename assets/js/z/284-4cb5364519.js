/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(284, function () {
"use strict";
return [
function (I) {
if (!I || !I.root || typeof THREE === "undefined")
return;
var b = new THREE.Box3(), L = [];
I.root.updateMatrixWorld(true);
I.root.traverse(function (o) {
if (o === I.root || !/rug|carpet|runner/i.test(o.name || ""))
return;
for (var p = o.parent; p && p !== I.root; p = p.parent)
if (p.userData.hwRug)
return;
b.setFromObject(o);
if (b.isEmpty())
return;
var sx = b.max.x - b.min.x, sz = b.max.z - b.min.z;
if (b.max.y - b.min.y > 0.08 || sx * sz < 0.15)
return;
o.userData.hwRug = 1;
L.push({ o: o, x0: b.min.x, x1: b.max.x, z0: b.min.z, z1: b.max.z, y: b.min.y, a: sx * sz, up: 0 });
});
L.sort(function (a, c) { return c.a - a.a; });
for (var i = 0; i < L.length; i++) {
var r = L[i];
for (var j = 0; j < i; j++) {
var q = L[j];
if (Math.abs(q.y - r.y) < 0.05 && q.x0 < r.x1 - 0.01 && r.x0 < q.x1 - 0.01 && q.z0 < r.z1 - 0.01 && r.z0 < q.z1 - 0.01)
r.up = Math.max(r.up, q.up + 0.006);
}
if (r.up) {
r.o.position.y += r.up;
r.o.updateMatrixWorld(true);
}
}
}
];
});
