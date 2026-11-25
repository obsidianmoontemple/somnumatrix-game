/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(66, function () {
"use strict";
return [
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
