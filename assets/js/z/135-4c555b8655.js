/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(135, function () {
"use strict";
return [
function (g) {
var b = g.userData.__lookBlob;
var key = g.children.length + "|" + (g.userData.modelled ? 1 : 0);
if (b.key === key)
return b.r;
b.key = key;
for (var k = 0; k < g.children.length; k++)
if (g.children[k].userData.contact) {
b.r = 0;
return 0;
}
try {
var box = new THREE.Box3(), rot = g.rotation.y;
g.rotation.y = 0;
g.updateMatrixWorld(true);
box.setFromObject(g);
g.rotation.y = rot;
g.updateMatrixWorld(true);
var sx = box.max.x - box.min.x, sz = box.max.z - box.min.z, sy = box.max.y - box.min.y;
if (!isFinite(sx) || !isFinite(sz)) {
b.r = 0;
return 0;
}
var kx = Math.abs(g.scale.x) || 1, kz = Math.abs(g.scale.z) || 1;
b.sx = Math.min(14, sx * 1.2 + 0.6) / kx;
b.sz = Math.min(14, sz * 1.2 + 0.6) / kz;
b.r = 1;
if (sy < 0.4)
b.r = 0;
}
catch (e) {
b.r = 0;
}
return b.r;
}
];
});
