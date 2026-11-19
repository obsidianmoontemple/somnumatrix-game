/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(65, function () {
"use strict";
return [
function (realm) {
var n = 0, x = 0, z = 0;
store.objects.forEach(function (o) {
if (o.filler || (o.realm || 0) !== (realm || 0))
return;
var d = KIT[o.archetype];
if (!d || d.cat !== "structure")
return;
x += o.x;
z += o.z;
n++;
});
if (n)
return { x: x / n, z: z / n };
if (realm) {
var r = (typeof realmById === "function") ? realmById(realm) : null;
if (r && r.grid && typeof blockOrigin === "function") {
var o = blockOrigin(r.grid.bx, r.grid.bz);
return { x: o.x, z: o.z };
}
return { x: (typeof REALM_GAP !== "undefined" ? REALM_GAP : 30000) * realm, z: 0 };
}
return { x: 0, z: 0 };
},
function (b) {
if (!plotSel)
return;
plotSel.rot = rotForBearing(b);
if (KIT[plotSel.archetype] && KIT[plotSel.archetype].cat === "structure") {
var fp = footprint(plotSel.archetype, plotSel.attrs, plotSel.rot), box = boxOf(plotSel.x, plotSel.z, fp);
if (!clearOf(box, standingBoxes(plotSel.id, plotSel.realm || 0))) {
plotStatus("It won't turn that way without touching its neighbours. Move it first, or turn off snapping.");
if (document.getElementById("p-snap").checked) {
plotSel.rot = rotForBearing(facingBearing(plotSel));
return;
}
}
releaseLots(plotSel);
claimLots(plotSel);
}
refresh(plotSel);
plotSelect(plotSel);
save();
}
];
});
