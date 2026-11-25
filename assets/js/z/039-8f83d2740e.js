/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(39, function () {
"use strict";
return [
function () {
var far = 0;
if (typeof QUARTERS !== "undefined")
QUARTERS.forEach(function (q) { if (q.r > far)
far = q.r; });
if (typeof NEIGHBOURHOODS !== "undefined")
NEIGHBOURHOODS.forEach(function (n) { if (n.r > far)
far = n.r; });
if (typeof districtReach === "function") {
var dr = districtReach();
if (dr > far)
far = dr;
}
return far > 0 ? Math.round(far + 190) : 980;
},
function () {
var r = somnucorRealm();
if (!r)
return;
for (var i = store.objects.length - 1; i >= 0; i--) {
var o = store.objects[i];
if ((o.realm || 0) !== r.id)
continue;
if (typeof meshes !== "undefined" && meshes[o.id]) {
scene.remove(meshes[o.id]);
delete meshes[o.id];
}
o._gone = true;
store.objects.splice(i, 1);
}
if (typeof atlMeshQueue !== "undefined")
atlMeshQueue.length = 0;
for (var c = store.characters.length - 1; c >= 0; c--) {
var ch = store.characters[c];
if (ch.objId && !specById(ch.objId))
store.characters.splice(c, 1);
}
var R = realms(), k = R.indexOf(r);
if (k > -1)
R.splice(k, 1);
if (store.here === r.id)
store.here = 0;
}
];
});
