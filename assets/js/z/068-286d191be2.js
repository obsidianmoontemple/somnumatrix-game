/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(68, function () {
"use strict";
return [
function () {
if (somnucorRealm())
return somnucorRealm();
if (typeof REALMS === "undefined" || !REALMS.somnucor)
return null;
var was = store.here || 0, wasGrid = store.grid;
var r = makeRealm("somnucor");
store.here = r.id;
store.grid = r.grid;
var h = blockOrigin(r.grid.bx, r.grid.bz);
function put(arch, x, z, rot, attrs, name) {
var spec = { id: uid(), archetype: arch, label: name || null, attrs: attrs || {}, x: h.x + x, z: h.z + z, rot: rot || 0,
solid: true, detail: 4, nights: [store.session], realm: r.id, hub: true, addr: null, name: name || null, named: name ? "stated" : null };
store.objects.push(spec);
if (typeof addMesh === "function" && typeof scene !== "undefined" && scene)
addMesh(spec);
return spec;
}
var doors = hubDoorList(), n = doors.length, R0 = 30;
doors.forEach(function (d, i) {
var a = (i / n) * Math.PI * 2;
var x = Math.cos(a) * R0, z = Math.sin(a) * R0;
var spec = put("hubdoor", x, z, -a + Math.PI / 2, {}, d.name);
spec.leadsTo = d.to;
var am = ((i + 0.5) / n) * Math.PI * 2;
put("hubmirror", Math.cos(am) * R0, Math.sin(am) * R0, -am + Math.PI / 2);
});
for (var p = 0; p < 8; p++) {
var pa = (p / 8) * Math.PI * 2 + 0.2;
put("hubpillar", Math.cos(pa) * 18, Math.sin(pa) * 18, 0);
}
for (var L = 0; L < 12; L++) {
var la = (L / 12) * Math.PI * 2;
put("streetlight", Math.cos(la) * 24, Math.sin(la) * 24, -la);
}
for (var L2 = 0; L2 < 8; L2++) {
var la2 = (L2 / 8) * Math.PI * 2 + 0.4;
put("stringlights", Math.cos(la2) * 52, Math.sin(la2) * 52, -la2 + Math.PI / 2);
}
put("maptable", 0, 0, 0, {}, "The map of everywhere");
HUB_SIGNS.forEach(function (s, i) {
var a = (i / HUB_SIGNS.length) * Math.PI * 2 + 0.4;
var spec = put("signboard", Math.cos(a) * 12, Math.sin(a) * 12, -a + Math.PI / 2, {}, s[0]);
spec.sign = s[0];
spec.note = s[1];
});
HUB_GALLERY.forEach(function (row, gi) {
var a = (gi / HUB_GALLERY.length) * Math.PI * 2, cx = Math.cos(a) * 62, cz = Math.sin(a) * 62;
var sx = Math.cos(a + Math.PI / 2), sz = Math.sin(a + Math.PI / 2);
var board = put("signboard", cx - sx * 16, cz - sz * 16, -a + Math.PI / 2, {}, row.name);
board.sign = row.name;
board.note = "Dream any of these by name, and it will stand in your own town.";
row.of.forEach(function (arch, k) {
if (!KIT[arch])
return;
var off = (k - (row.of.length - 1) / 2) * 9;
var px = cx + sx * off, pz = cz + sz * off;
put("plinth", px, pz, 0);
var d = KIT[arch], tall = Math.max(d.size[0], d.size[1], d.size[2]);
var sc = Math.max(0.12, Math.min(1, 5.5 / tall));
var spec = put(arch, px, pz + 1.6, -a + Math.PI, { s: sc });
if (row.deities && row.deities[k] && typeof makeDeity === "function") {
try {
makeDeity(spec, row.deities[k]);
}
catch (e) { }
}
});
});
r.dressed = true;
store.somnucor = r.id;
store.here = was;
store.grid = wasGrid;
if (typeof save === "function")
save();
return r;
},
function (o) {
if (!o.leadsTo) {
var mine = false;
try {
mine = typeof signedIn === "function" && signedIn() && session && session.user && o.dreamerDoor === session.user.id;
}
catch (e) { }
return "🚪 <b>" + esc(o.name || "A dreamer's door") + "</b> · <b>press E</b> " + (mine ? "to go home to your own dream" : "to knock and walk in");
}
if (o.leadsTo === "hall")
return "🚪 <b>The Hall of Doors</b> · <b>press E</b> to go in";
if (o.leadsTo === "somnucor")
return "🚪 <b>Somnucor</b> · <b>press E</b> to go back out to the city";
if (o.leadsTo === "town")
return "🚪 <b>Your own town</b> · <b>press E</b> to go through";
return "🚪 <b>" + esc((typeof REALMS !== "undefined" && REALMS[o.leadsTo] || {}).name || o.name || o.leadsTo) + "</b> · <b>press E</b> to go through";
},
function () {
var r = somnucorRealm() || (typeof buildSomnucorCity === "function" ? buildSomnucorCity() : buildSomnucor());
if (!r)
return;
if (typeof beHere === "function")
beHere(r.id);
var h = (typeof ATLC !== "undefined" && ATLC) ? { x: ATLC.x, z: ATLC.z } : heartOf(r.id);
if (walkMode) {
camera.position.set(h.x, 1.72, h.z + 44);
}
else if (typeof visitRealm === "function")
visitRealm(r.id);
setStatus("<b>Somnucor.</b> You are in the city, on the Tower Plaza. The gate to the Hall of Doors, where every door opens on a world and one of them is yours, is inside the Arrival Hub, on its east wall.");
},
function () {
var had = hallRealm();
if (had && (had.build || 0) >= HALL_BUILD)
return had;
if (had) {
for (var i = store.objects.length - 1; i >= 0; i--) {
var o = store.objects[i];
if ((o.realm || 0) !== had.id)
continue;
if (meshes[o.id]) {
scene.remove(meshes[o.id]);
delete meshes[o.id];
}
store.objects.splice(i, 1);
}
var R = realms(), k = R.indexOf(had);
if (k > -1)
R.splice(k, 1);
if (store.here === had.id)
store.here = 0;
}
if (typeof REALMS === "undefined" || !REALMS.hall)
return null;
var was = store.here || 0, wasGrid = store.grid;
var r = makeRealm("hall");
store.here = r.id;
store.grid = r.grid;
var h = blockOrigin(r.grid.bx, r.grid.bz);
function put(arch, x, z, rot, name, attrs) {
if (!KIT[arch])
return null;
var spec = { id: uid(), archetype: arch, label: name || null, attrs: attrs || {}, x: h.x + x, z: h.z + z, rot: rot || 0,
solid: true, detail: 4, nights: [store.session], realm: r.id, hub: true, peopled: true,
addr: null, name: name || null, named: name ? "stated" : null };
store.objects.push(spec);
if (typeof addMesh === "function" && typeof scene !== "undefined" && scene)
addMesh(spec);
return spec;
}
var back = put("hubdoor", 0, 22, Math.PI, "Back to Somnucor");
if (back)
back.leadsTo = "somnucor";
var doors = hubDoorList().filter(function (d) { return d.to !== "hall"; }), n = doors.length;
doors.forEach(function (d, i) {
var a = (i / n) * Math.PI * 2;
var spec = put("hubdoor", Math.cos(a) * 34, Math.sin(a) * 34, -a + Math.PI / 2, d.name);
if (spec)
spec.leadsTo = d.to;
var am = ((i + 0.5) / n) * Math.PI * 2;
put("hubmirror", Math.cos(am) * 34, Math.sin(am) * 34, -am + Math.PI / 2);
});
for (var p = 0; p < 8; p++) {
var pa = (p / 8) * Math.PI * 2 + Math.PI / 8;
put("hubpillar", Math.cos(pa) * 20, Math.sin(pa) * 20, 0);
}
for (var L = 0; L < 8; L++) {
var la = (L / 8) * Math.PI * 2 + Math.PI / 8;
put(KIT.ornatelamp ? "ornatelamp" : "streetlight", Math.cos(la) * 26, Math.sin(la) * 26, -la);
}
put("maptable", 0, 0, 0, "The map of everywhere");
HUB_SIGNS.forEach(function (s, i) {
var a = (i / HUB_SIGNS.length) * Math.PI * 2 + Math.PI / 2 + Math.PI / HUB_SIGNS.length;
var spec = put("signboard", Math.cos(a) * 13, Math.sin(a) * 13, -a + Math.PI / 2, s[0]);
if (spec) {
spec.sign = s[0];
spec.note = s[1];
}
});
r.dressed = true;
r.build = HALL_BUILD;
store.hall = r.id;
store.here = was;
store.grid = wasGrid;
if (typeof save === "function")
save();
return r;
},
function () {
var r = hallRealm() || buildHall();
if (!r)
return;
if (typeof beHere === "function")
beHere(r.id);
var h = blockOrigin(r.grid.bx, r.grid.bz);
if (walkMode)
camera.position.set(h.x, 1.72, h.z + 16);
else if (typeof visitRealm === "function")
visitRealm(r.id);
setStatus("<b>The Hall of Doors.</b> Every door here opens on a world, and one of them is yours.");
}
];
});
