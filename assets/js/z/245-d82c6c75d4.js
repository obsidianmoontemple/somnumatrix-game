/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(245, function () {
"use strict";
return [
function (id) {
var g = build({ id: id, archetype: "limousine", attrs: {}, solid: false, detail: 3, nights: [], city: true });
if (typeof modelDress === "function")
try {
modelDress(g, { id: id, archetype: "limousine", attrs: {}, solid: true, placed: true, city: true });
}
catch (e) { }
if (typeof tglFinish === "function")
tglFinish(g);
g.traverse(function (m) { m.raycast = function () { }; });
return g;
}
];
});
