/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var LOT_R = 20;
var LOTB = { open: false, lot: null, items: [], copy: true, saved: null, msg: "" };
var LOT_SCAN = (typeof scanText === "function") ? scanText : null;
function lotPlots() { return (store.plots || []).concat(store.districtPlots || []); }
function lotHome(name) {
var p = lotPlots().filter(function (q) { return q.name === name; })[0];
return p && p.homeId ? specById(p.homeId) : null;
}
function lotToLocal(h, x, z) {
var c = Math.cos(h.rot || 0), s = Math.sin(h.rot || 0), dx = x - h.x, dz = z - h.z;
return { x: dx * c - dz * s, z: dx * s + dz * c };
}
function lotToWorld(h, lx, lz) {
var c = Math.cos(h.rot || 0), s = Math.sin(h.rot || 0);
return { x: h.x + lx * c + lz * s, z: h.z - lx * s + lz * c };
}
function myLotHere() {
if (!walkMode || store.inside)
return null;
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
if (!r || (store.here || 0) !== r.id)
return null;
var mine = (typeof standing !== "undefined" && standing && standing.lots) || [], P = camera.position;
for (var i = 0; i < mine.length; i++) {
var h = lotHome(mine[i].lot);
if (!h)
continue;
if (Math.hypot(P.x - h.x, P.z - h.z) < LOT_R)
return { id: mine[i].lot_id, name: mine[i].lot, home: h };
}
return null;
}
function lotItemSpecs(lotId, home, items) { return __ZC(94, 0, this, arguments, new.target); }
function lotDrawItems(lotId, home, items) { return __ZC(94, 1, this, arguments, new.target); }
function lotDrawAll() {
if (typeof cityLots === "undefined")
return;
cityLots.forEach(function (rec) {
var d = rec.decor || {};
if (d.inside && typeof WP_DECOR !== "undefined")
WP_DECOR["lot:" + rec.lot_id] = d.inside;
if (LOTB.open && LOTB.lot && LOTB.lot.id === rec.lot_id)
return;
var h = lotHome(rec.name);
if (!h)
return;
var key = JSON.stringify(d.items || []);
if (rec._drawn === key)
return;
rec._drawn = key;
lotDrawItems(rec.lot_id, h, d.items || []);
});
}
var LOT_NUM = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, pair: 2, couple: 2, few: 3, several: 4 };
function lotRead(text) { return __ZC(94, 2, this, arguments, new.target); }
function lotBuildFromText(text, L) { return __ZC(94, 3, this, arguments, new.target); }
function lotEl() { return __ZC(94, 4, this, arguments, new.target); }
function lotOpen(L) {
lotEl();
var rec = (typeof lotByName === "function") ? lotByName(L.name) : null;
LOTB.open = true;
LOTB.lot = L;
LOTB.items = JSON.parse(JSON.stringify((rec && rec.decor && rec.decor.items) || []));
LOTB.saved = JSON.stringify(LOTB.items);
LOTB.msg = "";
lotPaint();
lotPreview();
}
function lotClose(keep) {
LOTB.open = false;
var L = LOTB.lot;
LOTB.lot = null;
if (L && !keep) {
var rec = lotByName(L.name);
if (rec) {
rec._drawn = null;
}
lotDrawItems(L.id, L.home, JSON.parse(LOTB.saved || "[]"));
}
lotPaint();
}
function lotPreview() { if (LOTB.open && LOTB.lot)
lotDrawItems(LOTB.lot.id, LOTB.lot.home, LOTB.items); }
function lotName(it) { var d = KIT[it.a]; return it.n || (it.a.replace(/([a-z])([A-Z])/g, "$1 $2")); }
function lotPaint() { return __ZC(94, 5, this, arguments, new.target); }
function lotCopyToDream(text) {
if (!LOT_SCAN)
return;
var was = store.here;
beHere(0);
try {
LOT_SCAN(text);
if (typeof populate === "function")
populate();
if (typeof save === "function")
save();
}
finally {
beHere(was);
}
}
var lotTickAt = 0;
function lotTick(dt) {
lotTickAt -= dt;
if (lotTickAt > 0)
return;
lotTickAt = 0.4;
lotDrawAll();
var L = myLotHere(), b = document.getElementById("lotb-btn");
if (!b) {
if (!L)
return;
lotEl();
b = document.getElementById("lotb-btn");
}
b.style.display = (L && !LOTB.open) ? "block" : "none";
if (L && !LOTB.open)
b.textContent = "Build on " + L.name;
if (LOTB.open && (!L || L.id !== LOTB.lot.id))
lotClose(false);
}
(function () {
if (typeof workplaceKeyOf === "function") {
var wk = workplaceKeyOf;
workplaceKeyOf = function (spec) {
var k = wk(spec);
if (k)
return k;
if (!spec || !spec.city)
return null;
var p = lotPlots().filter(function (q) { return q.homeId === spec.id; })[0];
var rec = p && typeof lotByName === "function" ? lotByName(p.name) : null;
return rec && rec.held ? ("lot:" + rec.lot_id) : null;
};
}
if (typeof canArrange === "function") {
var ca = canArrange;
canArrange = function (key) {
if (key && /^lot:/.test(key)) {
if (typeof heldNow === "function" && heldNow())
return false;
var id = +key.slice(4);
return !!(typeof standing !== "undefined" && standing && (standing.lots || []).some(function (l) { return l.lot_id === id; }));
}
return ca(key);
};
}
if (typeof wpSave === "function") {
var ws = wpSave;
wpSave = function () {
var key = wpEditing;
if (!key || !/^lot:/.test(key))
return ws();
cityRpc("set_lot_build", { p_lot: +key.slice(4), p_items: null, p_inside: wpDraft }).then(function (o) {
if (o !== "ok")
return paintArranger(String(o));
WP_DECOR[key] = wpDraft.slice();
wpEditing = null;
wpDraft = null;
paintArranger();
paintWorkButton();
setStatus("<b>Saved.</b> Your house is arranged this way for everyone who comes in.");
lotsAt = 0;
}).catch(function (e) { paintArranger(e.message); });
};
}
if (typeof applyLotDecor === "function") {
var ald = applyLotDecor;
applyLotDecor = function () { ald(); lotDrawAll(); };
}
})();
