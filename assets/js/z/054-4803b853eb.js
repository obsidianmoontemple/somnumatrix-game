/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(54, function () {
"use strict";
return [
function () {
function isOpen(id) {
var el = document.getElementById(id);
if (!el)
return false;
if (el.classList.contains("open"))
return true;
return !!el.style.display && el.style.display !== "none";
}
if (typeof nmOpen !== "undefined" && nmOpen)
return true;
if (typeof deskOpen !== "undefined" && deskOpen) {
closeDesk();
return true;
}
if (typeof wpEditing !== "undefined" && wpEditing) {
var c = document.getElementById("wp-cancel");
if (c) {
c.click();
return true;
}
}
if (isOpen("me-ward")) {
closeWardrobe();
return true;
}
if (typeof streetOpen !== "undefined" && streetOpen) {
streetOpen = false;
if (typeof paintStreetButton === "function")
paintStreetButton();
if (typeof paintStreet === "function")
paintStreet();
return true;
}
if (isOpen("inspect")) {
closeInspect();
return true;
}
if (document.getElementById("roster").classList.contains("open")) {
document.getElementById("roster").classList.remove("open");
return true;
}
if (document.getElementById("land").classList.contains("open")) {
closeLand();
return true;
}
if (document.getElementById("panel").classList.contains("open")) {
document.getElementById("panel").classList.remove("open");
return true;
}
if (walkMode && store.inside && typeof INT !== "undefined" && INT) {
exitInterior();
return true;
}
return false;
},
function (ray, far) {
if (typeof BAKE === "undefined" || !BAKE.chunks || typeof THREE === "undefined")
return null;
var best = null, bd = far || 1e9, o = new THREE.Vector3(), d = new THREE.Vector3(), box = new THREE.Box3(), hit = new THREE.Vector3();
Object.keys(BAKE.chunks).forEach(function (k) {
var ch = BAKE.chunks[k];
if (!ch.members || !ch.members.length || !ch.meshes || !ch.meshes.some(function (m) { return m.visible; }))
return;
ch.members.forEach(function (M) {
if (Math.hypot(M.x - ray.origin.x, M.z - ray.origin.z) > bd + 80)
return;
var sp = specById(M.id);
if (!sp)
return;
var K = (typeof KIT !== "undefined") ? KIT[sp.archetype] : null;
if (!K || !Array.isArray(K.size))
return;
var a = sp.attrs || {}, sc = +a.s || 1, hw = K.size[0] * sc * (a.w || 1) / 2, hh = K.size[1] * sc, hd = K.size[2] * sc * (a.d || 1) / 2;
var c = Math.cos(-M.ry), sn = Math.sin(-M.ry), ox = ray.origin.x - M.x, oz = ray.origin.z - M.z;
o.set(ox * c + oz * sn, ray.origin.y - M.y, -ox * sn + oz * c);
d.set(ray.direction.x * c + ray.direction.z * sn, ray.direction.y, -ray.direction.x * sn + ray.direction.z * c);
box.min.set(-hw, 0, -hd);
box.max.set(hw, hh, hd);
if (new THREE.Ray(o, d).intersectBox(box, hit)) {
var dist = hit.distanceTo(o);
if (dist < bd) {
bd = dist;
best = { spec: sp, d: dist };
}
}
});
});
return best;
},
function () {
raycaster.setFromCamera({ x: 0, y: 0 }, camera);
var hits = raycaster.intersectObjects(scene.children, true), bp = bakeRayPick(raycaster.ray, raycaster.far);
for (var i = 0; i < hits.length; i++) {
if (bp && bp.d < hits[i].distance) {
openInspect(bp.spec.id);
return;
}
var o = hits[i].object;
while (o && o.userData.id === undefined)
o = o.parent;
if (o && o.userData.id) {
openInspect(o.userData.id);
return;
}
}
if (bp) {
openInspect(bp.spec.id);
return;
}
closeInspect();
},
function (id) {
picked = specById(id);
if (!picked)
return;
if (document.exitPointerLock)
document.exitPointerLock();
document.getElementById("i-name").textContent = placeName(picked);
var fl = document.getElementById("i-floors"), fb = LEVELS[picked.archetype];
fl.disabled = !fb;
fl.value = fb ? (picked.attrs.lv || fb) : "";
var lk = document.getElementById("i-link"), opts = ['<option value="">\u2014</option>'];
store.objects.forEach(function (o) {
if (o === picked || o.filler || o.archetype !== picked.archetype || !o.nights || !picked.nights)
return;
var shared = o.nights.some(function (n) { return picked.nights.indexOf(n) > -1; });
if (shared)
return;
opts.push('<option value="' + o.id + '">' + esc(placeName(o)) + " \u2014 night" + (o.nights.length > 1 ? "s " : " ") + o.nights.join(", ") + "</option>");
});
lk.innerHTML = opts.join("");
lk.disabled = opts.length < 2;
document.getElementById("i-name-in").value = picked.name || "";
document.getElementById("i-sub").textContent = picked.archetype + " \u00b7 " + Math.round(fidelity(picked) * 100) + "% remembered" +
(picked.nights && picked.nights.length > 1 ? (" \u00b7 " + picked.nights.length + " nights") : "");
document.getElementById("i-label").value = picked.label || "";
document.getElementById("i-sign").value = picked.sign || "";
document.getElementById("i-scale").value = picked.attrs.s || 1;
document.getElementById("i-height").value = picked.attrs.h || 1;
renderLookEditor();
inspectLock(picked);
document.getElementById("inspect").classList.add("open");
},
function (o) {
var lock = cityThing(o), shaper = typeof mayShape === "function" && mayShape();
var box = document.getElementById("inspect");
Array.prototype.forEach.call(box.querySelectorAll("input,select,textarea,button"), function (el) {
if (/close/i.test(el.id || "") || /close|done|back/i.test(el.textContent || ""))
return;
el.disabled = lock;
});
var note = document.getElementById("i-citynote");
if (!note) {
note = document.createElement("div");
note.id = "i-citynote";
note.style.cssText = "font:12px var(--sans);color:var(--dim);margin:6px 0 10px;line-height:1.5";
var h = document.getElementById("i-name");
if (h && h.parentNode)
h.parentNode.insertBefore(note, h.nextSibling);
}
note.innerHTML = !lock ? "" : shaper ? "Part of Somnucor. Use <b>Shape the city</b> to change it \u2014 that changes it for every dreamer." : "Part of Somnucor \u2014 the one city every dreamer shares. Only the keeper and the City planner change it; what you may shape here is your own look and the lots you hold.";
note.style.display = lock ? "block" : "none";
},
function (mx, mz) {
var p = camera.position, feet = p.y - 1.72;
var cliff = function (x1, z1) { return !store.inside && typeof atlBlocks === "function" && atlBlocks(p.x, p.z, x1, z1, feet); };
if (throughWalls() || blockedAt(p.x, p.z, feet)) {
if (!cliff(p.x + mx, p.z + mz)) {
p.x += mx;
p.z += mz;
}
return;
}
if (!blockedAt(p.x + mx, p.z + mz, feet) && !cliff(p.x + mx, p.z + mz)) {
p.x += mx;
p.z += mz;
return;
}
if (!blockedAt(p.x + mx, p.z, feet) && !cliff(p.x + mx, p.z)) {
p.x += mx;
return;
}
if (!blockedAt(p.x, p.z + mz, feet) && !cliff(p.x, p.z + mz)) {
p.z += mz;
return;
}
}
];
});
