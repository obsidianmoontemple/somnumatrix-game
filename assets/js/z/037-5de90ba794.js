/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(37, function () {
"use strict";
return [
function (which) {
var s = which || landOpt("season") || "summer";
var list = SEASON_SETS[s] || SEASON_SETS.summer, made = 0;
var h = (typeof heartOf === "function") ? heartOf(store.here || 0) : { x: 0, z: 0 };
list.forEach(function (arch, i) {
if (!KIT[arch])
return;
var a = i * 2.39996 + 1.2, r = 14 + (i % 5) * 9;
var spec = { id: uid(), archetype: arch, label: null, attrs: {}, x: h.x + Math.cos(a) * r, z: h.z + Math.sin(a) * r,
rot: (i * 1.7) % 6.283, solid: false, detail: 2, nights: [store.session], seasonal: s, addr: null, name: null };
if (store.here)
spec.realm = store.here;
store.objects.push(spec);
if (typeof addMesh === "function")
addMesh(spec);
made++;
});
if (typeof save === "function")
save();
return made;
}
];
});
