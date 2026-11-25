/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(257, function () {
"use strict";
return [
function (o) {
var id = o.userData.realmGround;
if (typeof ATLC !== "undefined" && ATLC && typeof somnucorRealm === "function") {
var c = somnucorRealm();
if (c && c.id === id)
return { x: ATLC.x, z: ATLC.z, r: 2600 };
}
if (o.position.x || o.position.z)
return { x: o.position.x, z: o.position.z, r: 2600 };
var r = typeof realmById === "function" ? realmById(id) : null;
if (r && r.grid && typeof blockOrigin === "function") {
var h = blockOrigin(r.grid.bx, r.grid.bz);
return { x: h.x, z: h.z, r: 2600 };
}
return null;
}
];
});
