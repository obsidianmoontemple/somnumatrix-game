/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(418, function () {
"use strict";
return [
function (force) {
if (FPK.busy || !fpkSigned() || typeof cityRpc !== "function")
return;
if (!force && FPK.list && Date.now() - FPK.at < 20000)
return;
FPK.busy = true;
cityRpc("my_food_pack", {}).then(function (r) {
FPK.busy = false;
FPK.missing = false;
FPK.list = Array.isArray(r) ? r : [];
FPK.at = Date.now();
if (typeof BKP !== "undefined" && BKP.open && typeof bkpPaint === "function")
bkpPaint();
}).catch(function (e) { FPK.busy = false; FPK.list = null; if (typeof rpcMissing === "function" && rpcMissing(e))
FPK.missing = true; });
},
function () {
if (!fpkSigned() || FPK.missing || !FPK.list)
return "";
var h = bkpHead("Food, drink and remedies");
if (FPK.say && Date.now() - FPK.sayAt < 9000)
h += '<div data-fpksay style="margin:4px 0 6px;padding:6px 8px;border-radius:6px;background:rgba(232,198,106,.12);color:#F0E0B8">' + FPK.say + '</div>';
if (!FPK.list.length)
return h + bkpDim("Nothing to eat. Food, drink and healing salve you buy or find wait here until you need them.");
FPK.list.forEach(function (m) {
h += bkpRow(esc(m.name) + (m.n > 1 ? " <b>×" + m.n + "</b>" : "") + "<br>" + bkpDim(esc(fpkWhat(m))), '<button class="btn" data-bkfood="' + esc(m.item) + '">' + fpkVerb(m) + '</button>');
});
return h;
},
function (item) {
if (FPK.using || typeof cityRpc !== "function")
return;
var m = (FPK.list || []).filter(function (x) { return x.item === item; })[0];
FPK.using = true;
cityRpc("eat_food", { p_item: item, p_force: true }).then(function (o) {
FPK.using = false;
if (!o)
return;
var say = esc(o.say || "");
if (o.ok !== false) {
if (typeof needsGot === "function")
try {
needsGot(o);
}
catch (e) { }
if (+o.heal > 0 && typeof DGR !== "undefined" && DGR && DGR.hp < DGR.max && !DGR.downT) {
DGR.hp = Math.min(DGR.max, DGR.hp + (+o.heal) * 2);
DGR.hurt = Math.max(0, DGR.hurt - 0.3);
say += " Vigour " + Math.round(DGR.hp) + " of " + DGR.max + ".";
}
}
if (o.ok !== false) {
var bars = [];
if (o.food != null && !o.exempt)
bars.push("food " + Math.round(+o.food));
if (o.drink != null && !o.exempt)
bars.push("drink " + Math.round(+o.drink));
if (bars.length)
say += " Now " + bars.join(", ") + " of 100.";
if (m)
say = (m.food > 0 ? "🍞 " : m.drink > 0 ? "🥤 " : "🩹 ") + say;
if (typeof playTone === "function" && typeof audio !== "undefined" && audio.on)
try {
playTone(520, 0.08);
}
catch (e) { }
}
FPK.say = say;
FPK.sayAt = Date.now();
setStatus(say);
if (m && typeof o.have === "number") {
m.n = o.have;
if (m.n <= 0)
FPK.list = FPK.list.filter(function (x) { return x !== m; });
}
if (typeof BKP !== "undefined" && BKP.open && typeof bkpPaint === "function")
bkpPaint();
fpkLoad(true);
}).catch(function (e) {
FPK.using = false;
FPK.say = esc((e && e.message) || String(e));
FPK.sayAt = Date.now();
setStatus(FPK.say);
if (typeof BKP !== "undefined" && BKP.open && typeof bkpPaint === "function")
bkpPaint();
});
},
function (spot) {
if (!fpkSigned()) {
setStatus("Sign in first.");
return;
}
cityRpc("food_pack_find", { p_spot: spot }).then(function (o) {
setStatus(esc((o && o.say) || ""));
if (o && o.ok) {
FPK.at = 0;
fpkLoad(true);
}
}).catch(function (e) { setStatus(typeof rpcMissing === "function" && rpcMissing(e) ? "Empty. Someone got here first." : esc((e && e.message) || String(e))); });
}
];
});
