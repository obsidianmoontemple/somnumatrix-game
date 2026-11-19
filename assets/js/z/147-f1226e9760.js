/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(147, function () {
"use strict";
return [
function (arch, attrs, x, z, skip) {
var wet = lwWet(arch), dry = lwDry(arch);
if (!wet && !dry)
return null;
var r = lwRadius(arch, attrs) * (wet ? 1.1 : 0.9), here = store.here || 0, objs = store.objects || [];
for (var i = 0; i < objs.length; i++) {
var o = objs[i];
if (!o || o === skip || o.filler || o.city || o.hub || (o.realm || 0) !== here)
continue;
if (wet ? !lwDry(o.archetype) || (KIT[o.archetype] || {}).cat !== "structure" && lwRadius(o.archetype, o.attrs) < 2 : !lwWet(o.archetype))
continue;
var r2 = lwRadius(o.archetype, o.attrs) * (wet ? 0.9 : 1.1);
if (Math.hypot(o.x - x, o.z - z) < r + r2)
return o;
}
return null;
}
];
});
