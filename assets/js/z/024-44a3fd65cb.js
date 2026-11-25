/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(24, function () {
"use strict";
return [
function (ax, az, bx2, bz2) {
var k1 = [ax, az, bx2, bz2].map(Math.round).join(","), k2 = [bx2, bz2, ax, az].map(Math.round).join(",");
if (drawnEdges[k1] || drawnEdges[k2])
return;
drawnEdges[k1] = 1;
var dx = bx2 - ax, dz = bz2 - az, len = Math.sqrt(dx * dx + dz * dz);
if (len < 1)
return;
var ns = Math.abs(dz) > Math.abs(dx);
if (ns)
len = Math.max(1, len - STREET);
var sg = new THREE.PlaneGeometry(STREET, len);
metreUVs(sg, "pln", [STREET, len]);
var inRealm = typeof realmAtX === "function" ? realmAtX(ax) : null, rt = inRealm ? realmTemplate(inRealm) : null;
var detail = landOpt("detail"), at = detail && !rt ? texOf("asphalt") : (detail && rt ? texOf(rt.kind === "mirror" ? "paving" : (rt.tex || "paving")) : null);
var m = new THREE.Mesh(sg, new THREE.MeshLambertMaterial({ color: rt ? rt.path : (at ? 0x55575C : ROLE.road), map: at || null }));
m.rotation.x = -Math.PI / 2;
m.rotation.z = -Math.atan2(dx, dz);
m.position.set(ax + dx / 2, 0.02, az + dz / 2);
m.receiveShadow = true;
m.userData.street = 1;
m.userData.realmPath = !!rt;
scene.add(m);
var dash = detail && !rt ? texOf("dash") : null;
if (dash) {
var lg = new THREE.PlaneGeometry(0.28, len);
metreUVs(lg, "pln", [0.28, len]);
var line = new THREE.Mesh(lg, new THREE.MeshLambertMaterial({ map: dash, transparent: true, alphaTest: 0.4,
color: 0xE8E0C0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 }));
line.rotation.copy ? line.rotation.copy(m.rotation) : null;
line.position.set(ax + dx / 2, 0.05, az + dz / 2);
line.renderOrder = 1;
line.userData.street = 1;
line.userData.dash = 1;
scene.add(line);
}
}
];
});
