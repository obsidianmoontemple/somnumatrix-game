/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(42, function () {
"use strict";
return [
function () {
var visitor = typeof hasAccess === "function" && !hasAccess();
var c = cfg();
c.somnucor = true;
setCfg(c);
setStatus(visitor ? "<b>Building Somnucor\u2026</b> You are welcome to walk the city and look around as a visitor. A job, a home of your own and gold come with SomnuMatrix."
: "<b>Building Somnucor\u2026</b> this takes a moment, once.");
setTimeout(function () {
if (typeof buildSomnucorCity === "function")
buildSomnucorCity();
if (typeof buildHall === "function")
buildHall();
if (typeof buildTempleRow === "function")
buildTempleRow();
if (typeof buildHousing === "function")
buildHousing();
if (typeof buildEmployeeDistrict === "function")
buildEmployeeDistrict();
if (typeof buildYard === "function")
buildYard();
if (typeof buildGroundWorks === "function")
buildGroundWorks();
if (typeof loadLots === "function")
loadLots();
if (typeof renderRealmList === "function")
renderRealmList();
if (typeof paintJoin === "function")
paintJoin();
save();
setStatus("<b>Somnucor stands.</b> The city, the Hall of Doors and Temple Row are in The land.");
}, 50);
},
function () {
var kinds = { somnucor: 1, hall: 1 };
var ids = {};
realms().forEach(function (r) { if (kinds[r.kind])
ids[r.id] = 1; });
for (var i = store.objects.length - 1; i >= 0; i--) {
var o = store.objects[i];
if (!ids[o.realm || 0])
continue;
if (typeof meshes !== "undefined" && meshes[o.id]) {
scene.remove(meshes[o.id]);
delete meshes[o.id];
}
store.objects.splice(i, 1);
}
for (var c2 = store.characters.length - 1; c2 >= 0; c2--) {
var ch = store.characters[c2];
if (ch.objId && !specById(ch.objId))
store.characters.splice(c2, 1);
}
var R = realms();
for (var k = R.length - 1; k >= 0; k--)
if (kinds[R[k].kind])
R.splice(k, 1);
if (ids[store.here || 0])
beHere(0);
store.plots = [];
var c = cfg();
c.somnucor = false;
setCfg(c);
if (typeof renderRealmList === "function")
renderRealmList();
paintJoin();
save();
setStatus("<b>Somnucor is gone from your Atlas.</b> Your own dreamscape is exactly as it was.");
}
];
});
