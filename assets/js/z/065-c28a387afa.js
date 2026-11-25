/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(65, function () {
"use strict";
return [
function (on) {
plotOn = on;
if (on && walkMode)
setWalk(false);
if (on)
frameTown();
document.getElementById("scrim").classList.toggle("hidden", on);
document.getElementById("plotbar").classList.toggle("gone", !on);
if (!on) {
plotArmed = null;
plotSelect(null);
}
plotStatus(on ? "Choose a form and press Place, or click anything standing to move it. Drag empty ground to turn the view; shift-drag or WASD to move it; scroll to zoom." : "");
},
function (e) {
plotRay.setFromCamera(ndc(e), camera);
var list = Object.keys(meshes).map(function (k) { return meshes[k]; });
var hits = plotRay.intersectObjects(list, true), bp = bakeRayPick(plotRay.ray);
for (var i = 0; i < hits.length; i++) {
if (bp && bp.d < hits[i].distance && !bp.spec.filler)
return bp.spec;
var o = hits[i].object;
while (o && o.userData.id === undefined)
o = o.parent;
if (o) {
var sp = specById(o.userData.id);
if (sp && !sp.filler)
return sp;
}
}
return bp && !bp.spec.filler ? bp.spec : null;
},
function (spec) {
plotSel = spec;
if (plotRing) {
scene.remove(plotRing);
plotRing = null;
}
if (!spec) {
return;
}
var s = (KIT[spec.archetype] || KIT.house).size, sc = (spec.attrs && spec.attrs.s) || 1;
var r = Math.max(s[0], s[2]) * 0.62 * sc + 1.2;
plotRing = new THREE.Mesh(new THREE.RingGeometry(r, r + 0.9, 48), new THREE.MeshBasicMaterial({ color: 0xB8724A, transparent: true, opacity: 0.8, depthWrite: false,
polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -6 }));
plotRing.rotation.x = -Math.PI / 2;
plotRing.position.set(spec.x, 0.2, spec.z);
var tick = new THREE.Mesh(new THREE.ConeGeometry(0.9, 2.4, 3), new THREE.MeshBasicMaterial({ color: 0xC9BEA8, transparent: true, opacity: 0.9, depthWrite: false }));
tick.rotation.x = Math.PI / 2;
tick.position.set(0, -(r + 2.2), 0.05);
plotRing.add(tick);
scene.add(plotRing);
var lv = spec.attrs && spec.attrs.lv, base = LEVELS[spec.archetype];
var pb = document.getElementById("p-bearing");
if (pb)
pb.value = Math.round(facingBearing(spec));
plotStatus(placeName(spec) + " \u2014 " + spec.archetype + (base ? (" \u00b7 " + (lv || base) + " floor" + ((lv || base) === 1 ? "" : "s")) : "") +
" \u00b7 " + compassLine(spec) + ". Drag to move, R to turn, Delete to remove.");
},
function (x, z, maxd) {
var bx = Math.round(x / PITCH), bz = Math.round(z / PITCH), best = null, bd = (maxd || 60) * (maxd || 60);
for (var dx = -1; dx <= 1; dx++)
for (var dz = -1; dz <= 1; dz++) {
for (var k = 0; k < LOTS; k++) {
if (!lotFree(bx + dx, bz + dz, k))
continue;
var sp = lotSpot(bx + dx, bz + dz, k), d = (sp.x - x) * (sp.x - x) + (sp.z - z) * (sp.z - z);
if (d < bd) {
bd = d;
best = { bx: bx + dx, bz: bz + dz, k: k, x: sp.x, z: sp.z, rot: sp.rot };
}
}
}
return best;
},
function (o, x, z) {
var snap = document.getElementById("p-snap").checked && KIT[o.archetype].cat === "structure";
var old = { x: o.x, z: o.z };
releaseLot(o);
var L = snap ? fitNear(o.archetype, o.attrs, x, z, o.realm || 0, o.id) : null;
if (L) {
o.x = L.x;
o.z = L.z;
o.rot = L.rot;
o.bx = L.bx;
o.bz = L.bz;
o.lot = L.k;
o.addr = addressOf(L.bx, L.bz, L.k);
claimLots(o);
ensureStreets(L.bx, L.bz);
}
else {
o.x = x;
o.z = z;
o.bx = Math.round(x / PITCH);
o.bz = Math.round(z / PITCH);
}
snapVehicle(o);
if (o.named !== "stated" && o.addr && (o.archetype === "house" || o.archetype === "cottage"))
o.name = nameFor(o, o.addr);
var ch = charOf(o);
if (ch) {
ch.x = o.x;
ch.z = o.z;
ch.anchor = { x: o.x, z: o.z };
}
markStale(old.x, old.z);
markStale(o.x, o.z);
refresh(o);
plotSelect(o);
save();
},
function (arch, x, z) {
var snap = document.getElementById("p-snap").checked && KIT[arch].cat === "structure";
var L = snap ? fitNear(arch, {}, x, z, store.here || 0, null) : null;
var bx = L ? L.bx : Math.round(x / PITCH), bz = L ? L.bz : Math.round(z / PITCH);
var near = L || nearestFreeLot(x, z, 200) || { bx: bx, bz: bz, k: 0 };
var spec = { id: uid(), archetype: arch, label: arch, attrs: {}, x: L ? L.x : x, z: L ? L.z : z,
rot: L ? L.rot : (Math.round(orb.t / (Math.PI / 2)) * Math.PI / 2),
sign: null, note: null, solid: true, placed: true, detail: 1,
addr: addressOf(near.bx, near.bz, near.k), name: null, named: "provisional",
bx: bx, bz: bz, lot: L ? L.k : null, nights: [store.session] };
var inRealm = realmAtX(spec.x);
if (inRealm)
spec.realm = inRealm.id;
if (KIT[arch].cat !== "being")
spec.solid = true;
if (ROADGOING[arch])
snapVehicle(spec);
spec.name = nameFor(spec, spec.addr);
store.objects.push(spec);
if (L) {
claimLots(spec);
ensureStreets(L.bx, L.bz);
}
if (KIT[arch].cat === "being") {
var c = newCharacter(arch, arch, {});
c.src = { name: "placed" };
c.objId = spec.id;
c.x = spec.x;
c.z = spec.z;
c.anchor = { x: spec.x, z: spec.z };
spec.charId = c.id;
}
addMesh(spec);
markStale(spec.x, spec.z);
updateCount();
save();
return spec;
},
function (e) {
if (!plotOn || e.button === 2)
return;
if (plotArmed) {
var g = groundAt(e);
if (!g)
return;
var sp = plotPlace(plotArmed, g.x, g.z);
plotSelect(sp);
if (!e.shiftKey) {
plotArmed = null;
document.getElementById("p-place").classList.remove("on");
}
plotBusy = true;
setTimeout(function () { plotBusy = false; }, 0);
return;
}
var hit = objectAt(e);
if (hit) {
plotSelect(hit);
plotDrag = { spec: hit, moved: false };
plotBusy = true;
dragging = null;
}
else
plotSelect(null);
},
function () {
if (!plotSel)
return;
var o = plotSel, ch = charOf(o);
if (ch && ch.primary !== false && !confirm("Remove " + ch.name + " and everything recorded about them?"))
return;
releaseLot(o);
if (ch) {
var ci = store.characters.indexOf(ch);
if (ci > -1)
store.characters.splice(ci, 1);
}
removeSpec(o);
markStale(o.x, o.z);
plotSelect(null);
updateCount();
save();
plotStatus("Removed.");
},
function (dt) {
var sp = orb.r * 0.9 * dt, f = 0, r = 0;
if (keys["KeyW"] || keys["ArrowUp"])
f += 1;
if (keys["KeyS"] || keys["ArrowDown"])
f -= 1;
if (keys["KeyD"] || keys["ArrowRight"])
r += 1;
if (keys["KeyA"] || keys["ArrowLeft"])
r -= 1;
if (!f && !r)
return;
var c = Math.cos(orb.t), s = Math.sin(orb.t);
orb.tx += (-c * f + s * r) * sp;
orb.tz += (-s * f - c * r) * sp;
},
function (e) {
if (!plotOn)
return false;
var tag = document.activeElement && document.activeElement.tagName;
if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT")
return false;
if (e.code === "KeyR") {
plotTurn(e.shiftKey ? -1 : 1);
return true;
}
if (e.code === "Delete" || e.code === "Backspace") {
plotRemove();
return true;
}
if (e.code === "Escape") {
if (plotArmed) {
plotArmed = null;
document.getElementById("p-place").classList.remove("on");
plotStatus("Placing cancelled.");
}
else
setPlot(false);
return true;
}
return false;
},
function () {
var t = (typeof lookTarget === "function") ? lookTarget() : { x: 0, z: 0 };
var here = store.here || 0, minx = 1e9, maxx = -1e9, minz = 1e9, maxz = -1e9, n = 0;
store.objects.forEach(function (o) {
if (o.filler || (o.realm || 0) !== here)
return;
n++;
minx = Math.min(minx, o.x);
maxx = Math.max(maxx, o.x);
minz = Math.min(minz, o.z);
maxz = Math.max(maxz, o.z);
});
if (n) {
orb.tx = (minx + maxx) / 2;
orb.tz = (minz + maxz) / 2;
orb.r = Math.max(90, Math.min(1200, Math.max(maxx - minx, maxz - minz) * 1.5 + 90));
}
else {
orb.tx = t.x;
orb.tz = t.z;
orb.r = 260;
}
orb.t = orb.t || 0.9;
orb.p = Math.min(1.25, Math.max(0.5, orb.p || 0.95));
}
];
});
