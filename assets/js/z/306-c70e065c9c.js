/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(306, function () {
"use strict";
return [
function (g, sc) {
var p = g.attributes.position, n = g.attributes.normal, uv = g.attributes.uv;
if (!p || !n)
return false;
if (!uv) {
uv = new THREE.BufferAttribute(new Float32Array(p.count * 2), 2);
g.setAttribute("uv", uv);
}
for (var i = 0; i < p.count; i++) {
var x = p.getX(i) * sc.x, y = p.getY(i) * sc.y, z = p.getZ(i) * sc.z, ax = Math.abs(n.getX(i)), ay = Math.abs(n.getY(i)), az = Math.abs(n.getZ(i));
if (ay >= ax && ay >= az)
uv.setXY(i, x, z);
else if (ax >= az)
uv.setXY(i, z, y);
else
uv.setXY(i, x, y);
}
uv.needsUpdate = true;
return true;
},
function (m) {
if (!m || m.map || m.transparent || (m.opacity !== undefined && m.opacity < 1))
return false;
if (!(m.isMeshLambertMaterial || m.isMeshStandardMaterial || m.isMeshPhongMaterial || m.isMeshToonMaterial))
return false;
if (m.emissive && (m.emissive.r + m.emissive.g + m.emissive.b) > 0.15)
return false;
if (m.userData && (m.userData.bwSurf || m.userData.wsfSkip))
return false;
return true;
},
function (G) {
if (!G || typeof texOf !== "function")
return 0;
var tex = null, n = 0, box = new THREE.Box3(), sz = new THREE.Vector3(), sc = new THREE.Vector3();
G.updateMatrixWorld(true);
G.traverse(function (o) {
if (!o.isMesh || o.isInstancedMesh || o.userData.wsf)
return;
o.userData.wsf = 1;
var m = o.material, g = o.geometry;
if (Array.isArray(m) || !wsfPlain(m) || !g || !g.attributes)
return;
if (g.userData.wsf)
return;
if (!g.boundingBox)
g.computeBoundingBox();
box.copy(g.boundingBox);
box.getSize(sz);
o.getWorldScale(sc);
var big = Math.max(sz.x * Math.abs(sc.x), sz.y * Math.abs(sc.y), sz.z * Math.abs(sc.z));
if (!(big >= WSF.min))
return;
var flat = sz.y * Math.abs(sc.y) < 0.25 * big, hsl = { h: 0, s: 0, l: 0 };
m.color.getHSL(hsl);
var kind = flat && hsl.s > 0.18 && hsl.h > 0.17 && hsl.h < 0.45 ? "grass" : flat && hsl.s > 0.15 && hsl.h > 0.04 && hsl.h < 0.14 && hsl.l < 0.6 ? "earth" : "wsgrain";
var t = kind === "wsgrain" ? (tex || (tex = texOf("wsgrain"))) : texOf(kind);
if (!t)
return;
if (!wsfUVs(g, { x: Math.abs(sc.x) || 1, y: Math.abs(sc.y) || 1, z: Math.abs(sc.z) || 1 }))
return;
g.userData.wsf = 1;
m.map = t;
if (kind !== "wsgrain")
m.color.multiplyScalar(255 / 204);
m.needsUpdate = true;
n++;
});
return n;
}
];
});
