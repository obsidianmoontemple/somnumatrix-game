/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(183, function () {
"use strict";
return [
function () {
if (typeof raycaster === "undefined" || !raycaster || !camera || !scene)
return "rest";
raycaster.setFromCamera({ x: 0, y: 0 }, camera);
var far0 = raycaster.far;
raycaster.far = 60;
var hits = [];
try {
hits = raycaster.intersectObjects(scene.children, true);
}
catch (e) { }
raycaster.far = far0;
for (var i = 0; i < hits.length; i++) {
var h = hits[i], o = h.object;
if (!o.visible || (o.material && o.material.transparent && o.material.opacity < 0.15))
continue;
if (o.isPoints || o.isSprite || o.isLine)
continue;
var hid = false;
for (var q = o.parent; q; q = q.parent)
if (q.visible === false) {
hid = true;
break;
}
if (hid)
continue;
var d = h.distance, spec = null, k = null;
for (var p = o; p; p = p.parent) {
var u = p.userData || {};
if (u.eye) {
k = u.eye;
break;
}
if (u.wSeed !== undefined || u.hdfRoot || u.seated || u.part === "head" || u.part === "face") {
k = "talk";
break;
}
if (u.id !== undefined && typeof specById === "function") {
spec = specById(u.id);
if (spec)
break;
}
}
if (!k && spec) {
var def = (typeof KIT !== "undefined") ? KIT[spec.archetype] : null, cat = def && def.cat;
if (cat === "being" || spec.charId)
k = "talk";
else if (cat === "vehicle")
k = "ride";
else if (cat === "structure" && typeof enterable === "function" && enterable(spec) && typeof doorWorld === "function") {
var dw = null;
try {
dw = doorWorld(spec);
}
catch (e) { }
k = (dw && Math.hypot(dw.x - camera.position.x, dw.z - camera.position.z) < 16) ? "door" : "look";
}
else if (spec.archetype === "road" || spec.archetype === "ground")
continue;
else
k = "look";
}
if (!k) {
if (o === ground || (o.geometry && o.geometry.type === "PlaneGeometry" && d > 4))
return "rest";
k = "look";
}
if (k !== "door" && d > 30)
return "far";
return k;
}
return "rest";
}
];
});
