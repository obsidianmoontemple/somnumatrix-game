/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(190, function () {
"use strict";
return [
function (spec) {
if (!spec || !spec.city || spec.workplace || spec.plot || spec.lot)
return null;
if (!(spec.signName || SK_ARCH.test(String(spec.archetype || ""))))
return null;
var pl = (store.plots || []).concat(store.districtPlots || []);
for (var i = 0; i < pl.length; i++)
if (pl[i] && pl[i].homeId === spec.id)
return null;
return spec.signName || "the shop";
},
function () {
if (!INT || !INT.spec || !INT.root || INT.sk || INT.wpKey || INT.temple)
return;
var what = skShop(INT.spec);
if (!what)
return;
if (INT.tw && Object.keys(INT.tw).length)
return;
var t = skTemp(INT.spec, what), p = tempPostPlan([t])[t.id];
if (!p)
return;
var L = tempLook(t);
if (typeof jobDress === "function")
try {
jobDress(L, "Shopkeeper", what);
}
catch (e) { }
var g = buildFigure({ id: "__sk_" + t.id, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
g.position.set(p.x, p.y || 0, p.z);
g.rotation.y = p.ry || 0;
var lm = g.userData.limbs;
if (lm) {
if (lm.la)
lm.la.rotation.x = -0.7;
if (lm.ra)
lm.ra.rotation.x = -0.5;
}
var tag = makeTag(t.name + " · keeps " + (what === "the shop" ? "the shop" : "the " + what + " shop"), false);
tag.position.y = 2.15;
g.add(tag);
g.traverse(function (m) { m.raycast = function () { }; });
INT.root.add(g);
INT.sk = g;
}
];
});
