/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SANTA = { st: null, stAt: 0, saidOn: false, saidWait: false, panel: false, tab: "round", board: null, boardAt: 0, busy: false, msg: "", q: "",
fill: null, shelf: null, shelfQ: "", mine: null, wishes: null, wishMsg: "", decor: null, decorAt: 0, G: {}, homeL: {}, lampL: {},
stock: { lot: null, rows: null, at: 0, busy: false }, stockSig: null, stockFire: null, flyer: null, missing: false };
var SANTA_LOOK = { top: 0xB81E22, topKind: "shirt", bottom: 0xB81E22, shoes: 0x141414, hair: 0xF4F4F4, hairStyle: "short", beard: "full", hat: "beanie", hatColor: 0xB81E22, layer: "longcoat", layerColor: 0xB81E22 };
var SANTA_DEER = ["Dasher", "Dancer", "Prancer", "Vixen", "Comet", "Cupid", "Donner", "Blitzen"];
var SANTA_KINDS = { looking: "Something I'm looking for", home: "Something special for my home", other: "Anything else" };
var SANTA_LAMPS = { ornatelamp: 1, dimlamp: 1, streetlight: 1, lanternpost: 1 };
(function () {
if (typeof S !== "function")
return;
var BR = 0x8A5A32, RED = 0xC8262A, GRN = 0x2A7A3A, GLD = 0xE0B840, WHT = 0xF4F0E8, BLK = 0x1A1A1C;
S("toyteddy", "infra", [.5, .6, .4], [
{ g: "sph", s: [.18], p: [0, .22, 0], c: BR }, { g: "sph", s: [.13], p: [0, .47, 0], c: BR },
{ g: "sph", s: [.05], p: [-.1, .58, 0], c: BR }, { g: "sph", s: [.05], p: [.1, .58, 0], c: BR }, { g: "sph", s: [.05], p: [0, .45, .11], c: 0xD8B890 },
{ g: "sph", s: [.06], p: [-.17, .27, .04], c: BR }, { g: "sph", s: [.06], p: [.17, .27, .04], c: BR },
{ g: "sph", s: [.07], p: [-.09, .06, .08], c: BR }, { g: "sph", s: [.07], p: [.09, .06, .08], c: BR }, { g: "box", s: [.2, .04, .02], p: [0, .36, .14], c: RED }
]);
S("toytrainset", "infra", [1.2, .35, 1.2], [
{ g: "tor", s: [.5, .025], p: [0, .02, 0], r: [Math.PI / 2, 0, 0], c: 0x5A5A5E },
{ g: "box", s: [.14, .14, .26], p: [.5, .11, 0], c: RED }, { g: "cyl", s: [.03, .04, .1, 8], p: [.5, .23, .08], c: BLK }, { g: "box", s: [.14, .1, .1], p: [.5, .24, -.07], c: BLK },
{ g: "box", s: [.24, .12, .13], p: [0, .1, .5], c: GRN }, { g: "box", s: [.24, .12, .13], p: [-.5, .1, 0], r: [0, Math.PI / 2, 0], c: 0x2A5AA8 }
]);
S("rockinghorse", "infra", [.5, .95, 1.1], [
{ g: "tor", s: [.9, .03, 1.1], p: [-.18, .95, 0], r: [0, Math.PI / 2, Math.PI * 1.32], c: 0x6A4A2E }, { g: "tor", s: [.9, .03, 1.1], p: [.18, .95, 0], r: [0, Math.PI / 2, Math.PI * 1.32], c: 0x6A4A2E },
{ g: "box", s: [.24, .24, .6], p: [0, .58, 0], c: 0xD0D0D0 }, { g: "box", s: [.12, .32, .14], p: [0, .78, .3], r: [.4, 0, 0], c: 0xD0D0D0 }, { g: "box", s: [.13, .13, .28], p: [0, .95, .42], c: 0xD0D0D0 },
{ g: "box", s: [.26, .06, .26], p: [0, .72, -.02], c: RED }, { g: "box", s: [.04, .2, .3], p: [0, .92, .24], c: 0x3A3A3A },
{ g: "cyl", s: [.03, .03, .36, 6], p: [-.09, .32, .22], c: 0xD0D0D0 }, { g: "cyl", s: [.03, .03, .36, 6], p: [.09, .32, .22], c: 0xD0D0D0 },
{ g: "cyl", s: [.03, .03, .36, 6], p: [-.09, .32, -.22], c: 0xD0D0D0 }, { g: "cyl", s: [.03, .03, .36, 6], p: [.09, .32, -.22], c: 0xD0D0D0 }
]);
S("snowglobe", "infra", [.3, .36, .3], [
{ g: "cyl", s: [.12, .14, .08, 12], p: [0, .04, 0], c: 0x5A3A22 }, { g: "sph", s: [.13], p: [0, .21, 0], c: 0xCFE8F8 }, { g: "cone", s: [.05, .12, 6], p: [0, .2, .09], c: GRN }
]);
S("nutcracker", "infra", [.3, .95, .3], [
{ g: "cyl", s: [.04, .04, .3, 6], p: [-.06, .15, 0], c: BLK }, { g: "cyl", s: [.04, .04, .3, 6], p: [.06, .15, 0], c: BLK }, { g: "box", s: [.22, .3, .16], p: [0, .45, 0], c: RED },
{ g: "box", s: [.23, .04, .17], p: [0, .34, 0], c: GLD }, { g: "box", s: [.16, .16, .14], p: [0, .68, 0], c: 0xF0C8A0 }, { g: "box", s: [.16, .05, .02], p: [0, .62, .08], c: WHT },
{ g: "cyl", s: [.09, .09, .22, 10], p: [0, .87, 0], c: BLK }, { g: "cyl", s: [.035, .035, .24, 6], p: [-.14, .47, 0], c: RED }, { g: "cyl", s: [.035, .035, .24, 6], p: [.14, .47, 0], c: RED }
]);
S("gingerbreadhouse", "infra", [.6, .6, .5], [
{ g: "box", s: [.5, .3, .4], p: [0, .15, 0], c: 0xA0612F }, { g: "box", s: [.56, .04, .3], p: [0, .38, -.1], r: [.75, 0, 0], c: WHT }, { g: "box", s: [.56, .04, .3], p: [0, .38, .1], r: [-.75, 0, 0], c: WHT },
{ g: "box", s: [.1, .16, .01], p: [0, .08, .205], c: 0x5A3010 }, { g: "sph", s: [.025], p: [-.15, .2, .21], c: RED }, { g: "sph", s: [.025], p: [.15, .2, .21], c: GRN }, { g: "sph", s: [.025], p: [-.08, .26, .21], c: GLD }, { g: "sph", s: [.025], p: [.08, .26, .21], c: RED }
]);
S("candycane", "infra", [.2, .55, .1], [
{ g: "cyl", s: [.025, .025, .42, 8], p: [0, .21, 0], c: WHT }, { g: "cyl", s: [.027, .027, .04, 8], p: [0, .1, 0], c: RED }, { g: "cyl", s: [.027, .027, .04, 8], p: [0, .22, 0], c: RED }, { g: "cyl", s: [.027, .027, .04, 8], p: [0, .34, 0], c: RED },
{ g: "tor", s: [.06, .025, Math.PI], p: [.06, .42, 0], c: RED }
]);
S("coallump", "infra", [.25, .14, .22], [{ g: "sph", s: [.07], p: [0, .06, 0], c: BLK }, { g: "sph", s: [.05], p: [.07, .04, .03], c: 0x26262A }, { g: "sph", s: [.045], p: [-.06, .04, -.03], c: BLK }]);
})();
function santaRpc(name, args) { return (typeof cityRpc === "function" ? cityRpc(name, args || {}) : Promise.reject(new Error("offline"))).then(function (d) { SANTA.missing = false; return d; }); }
function santaErr(e) { var m = String((e && e.message) || e || ""); if (/function|404|PGRST|does not exist|schema cache/i.test(m)) {
SANTA.missing = true;
return "Santa's book opens soon.";
} return m || "Something went wrong."; }
function santaIn() { return typeof signedIn === "function" && signedIn(); }
function santaKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function santaSuited() { try {
return !!(santaKeeper() && meLook().santa);
}
catch (e) {
return false;
} }
function santaE(s) { return typeof esc === "function" ? esc(String(s == null ? "" : s)) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function santaChime() { if (typeof playTone === "function") {
[1047, 1319, 1568].forEach(function (f, i) { setTimeout(function () { try {
playTone(f, 0.16);
}
catch (e) { } }, i * 140); });
} }
var SANTA_CARD = "position:fixed;left:50%;top:calc(70px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:58;width:min(440px,calc(100vw - 24px));max-height:calc(100vh - 110px);overflow:auto;" +
"background:rgba(14,10,12,.97);color:#F4ECE0;border:1px solid #B8343A;border-radius:10px;padding:14px 16px;font:14px/1.45 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.55)";
var SANTA_BTN = "background:#C8323A;color:#FFF6EA;border:0;border-radius:14px;padding:6px 12px;font:600 13px system-ui,sans-serif;cursor:pointer;margin:2px";
var SANTA_BTN2 = "background:#2A3A2E;color:#F4ECE0;border:1px solid #4A6A4E;border-radius:14px;padding:5px 11px;font:600 13px system-ui,sans-serif;cursor:pointer;margin:2px";
function santaB(label, act, arg, alt) { return '<button style="' + (alt ? SANTA_BTN2 : SANTA_BTN) + '" data-sa="' + act + '"' + (arg != null ? ' data-sv="' + santaE(arg) + '"' : '') + '>' + label + '</button>'; }
function santaHead(t) { return '<div style="margin:12px 0 4px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#E8C66A">' + t + '</div>'; }
function santaDim(t) { return '<span style="color:#B8AC9C">' + t + '</span>'; }
function santaEl(id) { return __ZC(263, 0, this, arguments, new.target); }
function santaStateLoad() {
var p = santaIn() ? santaRpc("santa_state") : (typeof carePublicRpc === "function" ? carePublicRpc("santa_state") : Promise.resolve(null));
return p.then(function (s) {
if (!s || typeof s !== "object")
return;
SANTA.st = s;
SANTA.stAt = Date.now();
if (s.on && !SANTA.saidOn && !santaKeeper() && typeof walkMode !== "undefined" && walkMode) {
SANTA.saidOn = true;
setStatus("<b>🎅 Santa is out tonight!</b> Keep an eye on the sky for the sleigh. Wishes go in the post box at the North Pole.");
}
if (s.waiting > 0 && !SANTA.saidWait && typeof walkMode !== "undefined" && walkMode) {
SANTA.saidWait = true;
santaMineLoad();
setStatus("<b>🎁 Santa has been!</b> Your stocking is full" + (s.home && s.home.lot ? " by the fire at <b>" + santaE(s.home.lot) + "</b>" : "") + ". The gifts are already in your backpack.");
}
}).catch(function () { });
}
function santaMineLoad() { if (!santaIn())
return Promise.resolve(null); return santaRpc("my_stockings").then(function (r) { SANTA.mine = Array.isArray(r) ? r : []; return SANTA.mine; }).catch(function () { SANTA.mine = SANTA.mine || []; return SANTA.mine; }); }
function santaOpenStockings(ids) { return __ZC(263, 1, this, arguments, new.target); }
function santaStockingHtml(s) { return __ZC(263, 2, this, arguments, new.target); }
function santaOpenCard(lot) { return __ZC(263, 3, this, arguments, new.target); }
function santaWishCard() { return __ZC(263, 4, this, arguments, new.target); }
function santaWishPaint() { return __ZC(263, 5, this, arguments, new.target); }
var santaOldLetter = typeof npLetter === "function" ? npLetter : null;
npLetter = function () { if ((SANTA.st && SANTA.st.on) || santaKeeper() || !santaOldLetter)
santaWishCard();
else
santaOldLetter(); };
function santaBoardLoad(force) { return __ZC(263, 6, this, arguments, new.target); }
function santaOpen() { SANTA.panel = true; if (typeof document.exitPointerLock === "function")
try {
document.exitPointerLock();
}
catch (e) { } santaPaint(); santaBoardLoad(false); santaStateLoad().then(santaPaint); }
function santaClose() { SANTA.panel = false; SANTA.fill = null; var el = document.getElementById("santa-book"); if (el)
el.style.display = "none"; }
function santaMarkHtml(L) {
if (!L)
return "";
var nice = L.mark === "nice";
return '<span style="display:inline-block;padding:1px 8px;border-radius:10px;font-size:12px;background:' + (nice ? "#2E5A34" : "#5A2E2E") + ';color:#FFF4E0">' + (nice ? "🌟 Nice" : "🪨 Naughty") + (L.set ? " (by hand)" : "") + '</span>';
}
function santaRecordHtml(L) { if (!L)
return ""; return santaDim("good deeds " + (L.deeds || 0) + " · misdeeds " + (L.misdeeds || 0) + " · tickets " + (L.tickets || 0) + " · guilty " + (L.guilty || 0)); }
function santaPerson(id) { return (SANTA.board || []).filter(function (p) { return p.user_id === id; })[0] || null; }
function santaHomeSpec(name) { var h = null; try {
h = (typeof lotHome === "function" && lotHome(name)) || (typeof awlHomeSpec === "function" && awlHomeSpec(name));
}
catch (e) { } return h || null; }
function santaPaint() { return __ZC(263, 7, this, arguments, new.target); }
function santaFillStart(id) { return __ZC(263, 8, this, arguments, new.target); }
function santaFillPaint(el) { return __ZC(263, 9, this, arguments, new.target); }
function santaFind() { return __ZC(263, 10, this, arguments, new.target); }
function santaFillGo() { return __ZC(263, 11, this, arguments, new.target); }
function santaShowWay(id) { return __ZC(263, 12, this, arguments, new.target); }
function santaSuit(on) { return __ZC(263, 13, this, arguments, new.target); }
function santaSleigh(on) { return __ZC(263, 14, this, arguments, new.target); }
function santaTeamTemplate() { return __ZC(263, 15, this, arguments, new.target); }
function santaDress(v) { return __ZC(263, 16, this, arguments, new.target); }
(function () {
if (typeof presenceGroupFor !== "function")
return;
var pg = presenceGroupFor;
presenceGroupFor = function (row) {
var g = pg(row);
try {
var L = row && !row.away && row.look;
if (L && L.santa && L.ride === "sleigh" && g.children.length) {
var v = g.children[g.children.length - 1];
if (v && v !== g.userData.tag)
santaDress(v);
}
}
catch (e) { }
return g;
};
})();
var SANTA_PIECES = [["tree", "🎄 Christmas tree"], ["snowman", "⛄ Snowman"], ["canes", "🍭 Candy canes"], ["arch", "🌿 Garland arch (stand mid-street)"], ["deer", "✨ Light-up reindeer"], ["presents", "🎁 Pile of presents"]];
function santaDecorHtml() { return __ZC(263, 17, this, arguments, new.target); }
function santaCityHere() { var r = typeof somnucorRealm === "function" ? somnucorRealm() : null; return !!(r && (store.here || 0) === r.id && !(typeof WLD !== "undefined" && WLD.on) && !store.inside && typeof ATLC !== "undefined" && ATLC); }
function santaPut(kind) { return __ZC(263, 18, this, arguments, new.target); }
function santaNearestHome(r) { return __ZC(263, 19, this, arguments, new.target); }
function santaHomeLights() { return __ZC(263, 20, this, arguments, new.target); }
function santaDecorWorld(d) {
if (d.place === "out")
return { x: ATLC.x + d.x, z: ATLC.z + d.z };
var nm = String(d.place).slice(4), q = (typeof lotPlots === "function" ? lotPlots() : []).filter(function (p) { return p.name === nm; })[0];
return q ? { x: q.x, z: q.z } : null;
}
function santaUndo(all) { return __ZC(263, 21, this, arguments, new.target); }
function santaDecorLoad(force) {
if (!force && Date.now() - SANTA.decorAt < 90000)
return;
SANTA.decorAt = Date.now();
var p = santaIn() ? santaRpc("santa_decor_board") : (typeof carePublicRpc === "function" ? carePublicRpc("santa_decor_board") : Promise.resolve(null));
p.then(function (r) { if (Array.isArray(r)) {
SANTA.decor = r;
santaDecorSync();
} }).catch(function () { });
}
function santaGeo(k, make) { return SANTA.G["g:" + k] || (SANTA.G["g:" + k] = make()); }
function santaMat(c, basic) { var k = (basic ? "b:" : "m:") + c; return SANTA.G[k] || (SANTA.G[k] = basic ? new THREE.MeshBasicMaterial({ color: c, fog: false }) : new THREE.MeshLambertMaterial({ color: c })); }
function santaBulbMat(i) { var k = "bulb" + i; if (!SANTA.G[k]) {
SANTA.G[k] = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, fog: false });
} return SANTA.G[k]; }
var SANTA_BULB_COLS = [0xFF4A4A, 0xFFD24A, 0x4A9AFF, 0x5AE07A, 0xFFF0D0];
function santaBulbs(pts, size, cols, parent) { return __ZC(263, 22, this, arguments, new.target); }
function santaPiece(kind) { return __ZC(263, 23, this, arguments, new.target); }
function santaHomeLightsFor(spec) { return __ZC(263, 24, this, arguments, new.target); }
function santaLampDress(o) { return __ZC(263, 25, this, arguments, new.target); }
function santaDecorSync() { return __ZC(263, 26, this, arguments, new.target); }
function santaDecorTick() {
var D = SANTA.decor;
if (!D || !D.length)
return;
var show = santaCityHere(), P = camera.position, street = SANTA.G.street || (SANTA.G.street = {});
var near = (typeof LITE !== "undefined" && LITE && LITE.on) ? 520 : 800;
D.forEach(function (d) {
if (d.place === "out" && d.kind !== "lamps") {
var e = street[d.id];
var wx = ATLC ? ATLC.x + d.x : 0, wz = ATLC ? ATLC.z + d.z : 0, close = show && Math.hypot(wx - P.x, wz - P.z) < near;
if (!close) {
if (e && e.g.parent)
e.g.parent.remove(e.g);
return;
}
if (!e) {
e = street[d.id] = { g: santaPiece(d.kind) };
e.g.position.set(wx, typeof terrainY === "function" ? terrainY(wx, wz) : 0, wz);
e.g.rotation.y = d.rot || 0;
}
if (e.g.parent !== scene)
scene.add(e.g);
}
else if (d.kind === "lamps") {
var L = SANTA.lampL[d.id] || (SANTA.lampL[d.id] = { on: {}, ids: null });
var cx = ATLC ? ATLC.x + d.x : 0, cz = ATLC ? ATLC.z + d.z : 0;
if (!show || Math.hypot(cx - P.x, cz - P.z) > near) {
Object.keys(L.on).forEach(function (k) { var e = L.on[k]; if (e.g.parent)
e.g.parent.remove(e.g); });
return;
}
if (!L.ids) {
L.ids = (store.objects || []).filter(function (o) { return SANTA_LAMPS[o.archetype] && Math.hypot(o.x - cx, o.z - cz) < 40; }).map(function (o) { return o.id; });
}
L.ids.forEach(function (oid) {
var e = L.on[oid];
if (!e) {
var o = typeof specById === "function" ? specById(oid) : null;
if (!o)
return;
e = L.on[oid] = { g: santaLampDress(o) };
}
if (e.g.parent !== scene)
scene.add(e.g);
});
}
else if (d.kind === "homelights") {
var h = SANTA.homeL[d.id], nm = String(d.place).slice(4);
if (!h) {
var q = (typeof lotPlots === "function" ? lotPlots() : []).filter(function (p) { return p.name === nm; })[0];
var spec = q && q.homeId && typeof specById === "function" ? specById(q.homeId) : null;
if (!spec)
return;
var hg = santaHomeLightsFor(spec);
if (!hg)
return;
h = SANTA.homeL[d.id] = { g: hg, x: spec.x, z: spec.z };
}
var on = show && Math.hypot(h.x - P.x, h.z - P.z) < near;
if (!on) {
if (h.g.parent)
h.g.parent.remove(h.g);
return;
}
if (h.g.parent !== scene)
scene.add(h.g);
}
});
}
function santaTwinkle() {
var t = performance.now() / 1000;
for (var k = 0; k < 3; k++) {
var m = SANTA.G["bulb" + k];
if (!m)
continue;
var v = 0.72 + 0.28 * Math.sin(t * 1.1 + k * 2.1);
m.color.setRGB(v, v, v);
}
}
function santaLotHere() {
if (!store.inside || typeof INT === "undefined" || !INT || !INT.spec)
return null;
var p = null;
try {
p = typeof hlPlotOf === "function" ? hlPlotOf(INT.spec) : null;
}
catch (e) { }
return p && p.name ? p.name : null;
}
function santaStockingTemplate(full) { return __ZC(263, 27, this, arguments, new.target); }
function santaHang(fp, rows) { return __ZC(263, 28, this, arguments, new.target); }
function santaStockLoad(lot) { return __ZC(263, 29, this, arguments, new.target); }
function santaStockTick() {
var inside = store.inside && typeof INT !== "undefined" && INT && INT.root && typeof walkMode !== "undefined" && walkMode && !(typeof WLD !== "undefined" && WLD.on);
if (!inside) {
SANTA.stockSig = null;
return;
}
var lot = santaLotHere();
if (!lot) {
SANTA.stockSig = null;
return;
}
santaStockLoad(lot);
var S = SANTA.stock, rows = (S.lot === lot && S.rows) || [];
var season = !!(SANTA.st && SANTA.st.on) || santaSuited();
var P = camera.position, lv = (INT.level || 0), fy = lv * (INT.floor || 4), near = null, bd = 2.6, first = true;
INT.root.children.forEach(function (c) {
if (!c.userData || c.userData.furn !== "fireplace")
return;
if (first && (season || rows.length))
santaHang(c, rows);
first = false;
if (Math.abs(c.position.y - fy) > 1)
return;
var d = Math.hypot(P.x - (INT.ox + c.position.x), P.z - (INT.oz + c.position.z));
if (d < bd) {
bd = d;
near = c;
}
});
if (typeof nearChar !== "undefined" && nearChar)
near = null;
if (!near) {
SANTA.stockSig = null;
return;
}
var mineFull = rows.some(function (r) { return r.mine && !r.opened; }), mode = mineFull ? "open" : (santaSuited() ? "fill" : null);
if (!mode) {
if (SANTA.stockSig) {
SANTA.stockSig = null;
if (typeof FIRE !== "undefined")
FIRE.on = null;
}
return;
}
var sig = mode + "|" + lot + "|" + near.uuid;
if (SANTA.stockSig === sig && SANTA.stockFire === (typeof FIRE !== "undefined" ? FIRE.on : null))
return;
SANTA.stockSig = sig;
SANTA.stockFire = typeof FIRE !== "undefined" ? FIRE.on : null;
if (mode === "open")
worldPromptCity("<b>🧦 Your stocking is full!</b> · <b>press E</b> to see what Santa left", function () { worldPromptCity(null); SANTA.stockSig = null; santaOpenCard(lot); });
else
worldPromptCity("<b>🎅 The stocking by the fire</b> · <b>press E</b> to fill it", function () { santaFillHere(lot); });
}
function santaFillHere(lot) { return __ZC(263, 30, this, arguments, new.target); }
function santaAct(a, v, btn) { return __ZC(263, 31, this, arguments, new.target); }
if (typeof backRegister === "function") {
backRegister({ order: 2, open: function () { return !!SANTA.panel; }, close: function () { if (SANTA.fill) {
SANTA.fill = null;
santaPaint();
}
else
santaClose(); } });
backRegister({ order: 2, open: function () { var w = document.getElementById("santa-wish"); return !!(w && w.style.display !== "none"); }, close: function () { santaAct("close-wish"); } });
backRegister({ order: 2, open: function () { var w = document.getElementById("santa-open"); return !!(w && w.style.display !== "none"); }, close: function () { santaAct("close-open"); } });
}
(function () {
if (typeof bkpHtml !== "function" || typeof bkpLoad !== "function")
return;
var bl = bkpLoad;
bkpLoad = function () { var p = bl.apply(this, arguments); santaMineLoad().then(function () { if (typeof BKP !== "undefined" && BKP.open && typeof bkpPaint === "function")
bkpPaint(); }); return p; };
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments);
try {
var S = (SANTA.mine || []).filter(function (s) { return !s.opened || Date.now() - new Date(s.at).getTime() < 30 * 86400000; }), x = "";
if (typeof riding !== "undefined" && riding === "Santa's sleigh")
x += '<div style="display:flex;justify-content:space-between;gap:10px;padding:4px 0">🛷 Santa\'s sleigh <button class="btn" data-santa-pack="sleigh">Get off</button></div>';
S.forEach(function (s) {
var what = (s.items || []).slice(0, 4).join(", ") + ((s.items || []).length > 4 ? "…" : "") + (s.gold ? ((s.items || []).length ? ", " : "") + Number(s.gold).toLocaleString() + " gold" : "");
x += '<div style="display:flex;justify-content:space-between;gap:10px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.06)"><span>🧦 ' + santaE(what || "A note from Santa") + '</span>' +
'<button class="btn" data-santa-pack="' + s.id + '">' + (s.opened ? "Look" : "Open") + '</button></div>';
});
if (x)
h += '<div style="margin:12px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868">🎅 From Santa</div>' + x;
}
catch (e) { }
return h;
};
document.addEventListener("click", function (e) {
var b = e.target.closest && e.target.closest("[data-santa-pack]");
if (!b)
return;
var v = b.getAttribute("data-santa-pack");
if (v === "sleigh") {
santaSleigh(false);
if (typeof bkpPaint === "function")
bkpPaint();
return;
}
var s = (SANTA.mine || []).filter(function (x) { return String(x.id) === v; })[0];
santaOpenCard(s ? s.lot : null);
});
})();
function santaButtonTick() {
var bar = document.getElementById("me-bar"), b = document.getElementById("me-santa");
if (!santaKeeper()) {
if (b)
b.style.display = "none";
return;
}
if (!b) {
b = document.createElement("button");
b.className = "btn";
b.id = "me-santa";
b.title = "Santa's book: the round, the List, the suit, the sleigh, decorations";
b.textContent = "🎅 Santa";
b.onclick = function () { SANTA.panel ? santaClose() : santaOpen(); };
var pk = document.getElementById("me-pack");
if (bar) {
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
else {
b.style.cssText = "position:fixed;left:10px;bottom:calc(228px + env(safe-area-inset-bottom,0px));z-index:40";
document.body.appendChild(b);
}
}
else if (bar && b.parentNode !== bar) {
b.style.cssText = "";
var pk2 = document.getElementById("me-pack");
if (pk2 && pk2.parentNode === bar && pk2.nextSibling)
bar.insertBefore(b, pk2.nextSibling);
else
bar.appendChild(b);
}
if (b)
b.style.display = "";
}
var SANTA_SLOW = 0;
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) {
tt(dt);
try {
if (rideArch === "sleigh" && typeof riding !== "undefined" && riding === "Santa's sleigh" && rideG && !rideG.userData.santa)
santaDress(rideG);
santaStockTick();
santaTwinkle();
SANTA_SLOW -= dt;
if (SANTA_SLOW <= 0) {
SANTA_SLOW = 1;
santaDecorTick();
santaButtonTick();
if (typeof walkMode !== "undefined" && walkMode) {
if (Date.now() - SANTA.stAt > 60000) {
SANTA.stAt = Date.now();
santaStateLoad();
}
santaDecorLoad(false);
}
}
}
catch (e) {
if (window.console)
console.warn("[santa]", e);
}
};
})();
