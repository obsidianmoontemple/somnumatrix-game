/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
bird = function (col, s, kind) { return __ZC(156, 0, this, arguments, new.target); };
(function () {
if (typeof companion !== "function")
return;
var cp = companion;
companion = function (k) {
if (k === "owl")
return bird(0x7A5A3A, 1.25, "owl");
if (k === "raven" || k === "ravens")
return bird(0x30303C, .85, "raven");
if (k === "dove")
return bird(0xF2EEE6, .9, "dove");
if (k === "eagle")
return bird(0x5A4230, 1.5, "eagle");
if (k === "bird")
return bird(0x6A8AB0, .9, "bird");
return cp.apply(this, arguments);
};
})();
(function () {
if (typeof hdfDeityIcons !== "function")
return;
var di = hdfDeityIcons;
hdfDeityIcons = function (E) {
var r = di.apply(this, arguments);
try {
(E.icons || []).forEach(function (ic) {
var o = ic.o, gp = o.geometry && o.geometry.parameters;
if (!o.isMesh || !gp)
return;
if (o.geometry.type === "SphereGeometry" && gp.thetaLength < 3 && gp.radius > 0.1 && gp.radius < 0.2 && !o.userData.dpHelm) {
o.userData.dpHelm = 1;
o.scale.multiplyScalar(1.32);
o.position.y += 0.07;
var m = o.material;
[-1, 1].forEach(function (sd) { var cg = P(box(.03, .09, .07), m, sd * .118, -.05, .06); cg.rotation.y = sd * 0.35; o.add(cg); });
o.add(P(box(.02, .07, .02), m, 0, -.04, .13));
o.add(P(new THREE.TorusGeometry(.133, .008, 4, 24), m, 0, 0, 0, Math.PI / 2));
}
if (o.geometry.type === "BoxGeometry" && Math.abs(gp.width - 0.03) < 0.001 && Math.abs(gp.depth - 0.26) < 0.001 && !o.userData.dpHelm) {
o.userData.dpHelm = 1;
o.position.y += 0.1;
o.scale.set(1.3, 1.25, 1.5);
}
});
var arms = {};
E.model.traverse(function (b) { if (b.isBone && /^(clavicle|upperarm)_[lr]$/i.test(b.name))
arms[b.name.toLowerCase()] = b; });
var body0 = E.g.children[0];
body0.children.slice().forEach(function (o) {
if (!o.userData.dpBird || o.parent !== body0)
return;
var sd = o.position.x < 0 ? "r" : "l", bn = arms["clavicle_" + sd], ua = arms["upperarm_" + sd];
if (!bn || !ua)
return;
var s0 = body0.getWorldScale(new THREE.Vector3()).y, q0 = body0.getWorldQuaternion(new THREE.Quaternion());
E.icons = E.icons || [];
E.icons.push({ o: o, parent: o.parent, pos: o.position.clone(), quat: o.quaternion.clone(), scale: o.scale.clone() });
var w = ua.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3((o.position.x < 0 ? -1 : 1) * 0.02 * s0, 0.075 * s0, -0.01 * s0).applyQuaternion(q0));
bn.attach(o);
bn.worldToLocal(w);
o.position.copy(w);
o.quaternion.copy(bn.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(q0));
});
var hb = null;
E.model.traverse(function (b) { if (!hb && b.isBone && /^head$/i.test(b.name))
hb = b; });
(E.icons || []).forEach(function (ic) {
var o = ic.o, gp = o.geometry && o.geometry.parameters;
if (!hb || !o.isMesh || !gp || o.parent !== hb)
return;
if (!o.userData.dpPatch) {
if (o.geometry.type !== "BoxGeometry" || gp.width !== 0.05 || gp.height !== 0.03)
return;
o.userData.dpPatch = 1;
o.geometry = new THREE.SphereGeometry(0.034, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5);
}
var body = E.g.children[0], s = body.getWorldScale(new THREE.Vector3()).y, k = s / hb.getWorldScale(new THREE.Vector3()).y;
var q = body.getWorldQuaternion(new THREE.Quaternion());
var w = hb.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(-DP_EYE.x * s, DP_EYE.y * s, DP_EYE.z * s).applyQuaternion(q));
var pq = hb.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(q);
hb.worldToLocal(w);
o.position.copy(w);
o.quaternion.copy(pq);
o.rotateX(Math.PI / 2);
o.scale.set(k * 0.85, k * 0.45, k * 0.75);
var band = new THREE.Group(), ring = new THREE.Mesh(new THREE.TorusGeometry(DP_EYE.r, 0.006, 4, 30), o.material);
ring.rotation.set(Math.PI / 2 + 0.3, 0, 0.12);
ring.position.set(DP_EYE.x, 0.01, -DP_EYE.r + 0.002);
band.add(ring);
band.position.copy(w);
band.quaternion.copy(pq);
band.scale.setScalar(k);
hb.add(band);
if (o.userData.dpBand && o.userData.dpBand.parent)
o.userData.dpBand.parent.remove(o.userData.dpBand);
o.userData.dpBand = band;
});
}
catch (e) { }
return r;
};
})();
var DP_EYE = { x: 0.033, y: 0.07, z: 0.127, r: 0.09 };
var DP_WIDEHAT = { odin: 0x5E6064 };
(function () {
if (typeof buildDeity !== "function")
return;
var bd = buildDeity;
buildDeity = function (spec, f) {
var g = bd.apply(this, arguments);
try {
var body = g && g.children[0];
if (!body)
return g;
if (spec && DP_WIDEHAT[spec.deity])
body.traverse(function (m) {
if (!m.isMesh || !m.userData)
return;
var hm = m.material && m.material.clone ? m.material.clone() : m.material;
if (hm && hm.color)
hm.color.setHex(DP_WIDEHAT[spec.deity]);
if (m.userData.part === "crown") {
m.geometry = new THREE.SphereGeometry(0.125, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.5);
m.position.y -= 0.045;
m.material = hm;
}
if (m.userData.part === "brim") {
m.geometry = new THREE.CylinderGeometry(0.2, 0.33, 0.07, 20, 1, true);
m.material = hm;
if (hm)
hm.side = THREE.DoubleSide;
}
});
body.children.forEach(function (o) {
if (!o.userData || o.userData.dl !== 1 || o.isMesh || o.userData.dpAureole)
return;
o.userData.dpAureole = 1;
var col = null;
o.traverse(function (m) { if (m.isMesh && m.material) {
m.material = m.material.clone();
m.material.opacity = 0.55;
if (col === null && m.material.color)
col = m.material.color.getHex();
} });
o.position.y += 0.2;
o.position.z -= 0.12;
o.scale.multiplyScalar(0.62);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.025, 6, 48), new THREE.MeshBasicMaterial({ color: col || 0xE8C27A, transparent: true, opacity: 0.6, depthWrite: false }));
var glow = new THREE.Mesh(new THREE.CircleGeometry(0.6, 40), new THREE.MeshBasicMaterial({ color: col || 0xE8C27A, transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide }));
glow.position.z = -0.02;
o.add(ring);
o.add(glow);
});
}
catch (e) { }
return g;
};
})();
