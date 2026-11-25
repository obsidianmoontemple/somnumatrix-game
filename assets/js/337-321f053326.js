/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PLV_NAME = "The Volcano Castle", PLN_NAME = "The Palace of the North King";
var PLX = { building: null, rest: null, el: null, warned: 0 };
function plxWarn(where, e) { if (PLX.warned < 4 && window.console) {
PLX.warned++;
console.warn("[palace life] " + where, e);
} }
function plxIsVolcano(spec) { return !!(spec && spec.city && spec.archetype === "castle" && (spec.label === PLV_NAME || spec.name === PLV_NAME)); }
function plxWorldOf(name) { return name === PLN_NAME ? "northpole" : "somnucor"; }
function plxKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function plxSigned() { return typeof signedIn === "function" && signedIn(); }
function plxLot(name) {
var l = ((typeof standing !== "undefined" && standing && standing.lots) || []).filter(function (q) { return q && q.lot === name; })[0];
return l && l.lot_id ? +l.lot_id : 0;
}
function plxLotId(name) {
var a = plxLot(name);
if (a)
return a;
var r = typeof lotByName === "function" ? lotByName(name) : null;
if (r && r.lot_id)
return +r.lot_id;
var h = typeof hlRow === "function" ? hlRow(name, plxWorldOf(name)) : null;
return h && h.id ? +h.id : 0;
}
function plxMay(name) {
if (!plxSigned())
return false;
if (plxKeeper() || plxLot(name))
return true;
var r = typeof hlRow === "function" ? hlRow(name, plxWorldOf(name)) : null;
if (!r && typeof hlLoad === "function")
try {
hlLoad();
}
catch (e) { }
return !!(r && (r.mine || r.open));
}
function plxExempt() { return typeof fnExempt === "function" ? !!fnExempt() : plxKeeper(); }
function plxResting() { return !!(PLX.rest || (typeof FN !== "undefined" && FN.rest)); }
function plxRestEl() {
if (PLX.el || !document.body)
return PLX.el;
var el = document.createElement("div");
el.id = "plx-rest";
el.style.cssText = "position:fixed;inset:0;z-index:30;pointer-events:none;background:#05070F;opacity:0;transition:opacity 1.8s ease";
document.body.appendChild(el);
PLX.el = el;
return el;
}
function plxRestStart(how, what) { return __ZC(337, 0, this, arguments, new.target); }
function plxRestStop(say) {
if (!PLX.rest)
return;
var how = PLX.rest.how;
PLX.rest = null;
if (PLX.el)
PLX.el.style.opacity = "0";
setStatus(say || (how === "wash" ? "<b>Clean and fresh.</b>" : "<b>You wake refreshed.</b>"));
}
setInterval(function () {
try {
if (!PLX.rest)
return;
var P = camera.position;
if (Math.hypot(P.x - PLX.rest.x, P.z - PLX.rest.z) > 0.6 || (typeof walkMode !== "undefined" && !walkMode))
plxRestStop();
}
catch (e) { }
}, 300);
function plxAct(how, what) {
if (plxResting()) {
if (PLX.rest)
return plxRestStop();
if (typeof fnRest === "function")
return fnRest("stop");
return;
}
if (plxExempt())
return plxRestStart(how, what);
if (typeof fnRest === "function")
fnRest(how, "home");
else
setStatus("Sleeping and washing open soon.");
}
function plxSay(how, what) { return __ZC(337, 1, this, arguments, new.target); }
(function () {
if (typeof FURN === "undefined" || typeof psG !== "function")
return;
var water = null;
function W() { return water || (water = new THREE.MeshPhongMaterial({ color: 0x2E7E8E, emissive: 0x0A2228, shininess: 90, specular: 0x9AC0C8, transparent: true, opacity: 0.9 })); }
var mirror = null;
function Mi() { return mirror || (mirror = new THREE.MeshPhongMaterial({ color: 0x7E8C96, shininess: 110, specular: 0xB8C4CC })); }
function B(x, y, z) { return new THREE.BoxGeometry(x, y, z); }
function C(a, b, h, s) { return new THREE.CylinderGeometry(a, b, h, s || 12); }
FURN.vcbath = function () {
var g = psG();
psAdd(g, B(2.9, .6, 1.7), "basalt", 0, .3, 0);
psAdd(g, B(3.0, .08, 1.8), "basaltL", 0, .64, 0);
psAdd(g, B(2.5, .03, 1.3), W(), 0, .62, 0);
psAdd(g, B(3.02, .05, .07), "gold", 0, .7, .88);
psAdd(g, B(3.02, .05, .07), "gold", 0, .7, -.88);
psAdd(g, B(.07, .05, 1.8), "gold", 1.49, .7, 0);
psAdd(g, B(.07, .05, 1.8), "gold", -1.49, .7, 0);
psAdd(g, C(.05, .06, .5, 10), "gold", 0, .93, -.8);
psAdd(g, B(.08, .08, .32), "gold", 0, 1.16, -.68);
psAdd(g, new THREE.SphereGeometry(.07, 10, 8), "gold", -.24, .8, -.82);
psAdd(g, new THREE.SphereGeometry(.07, 10, 8), "gold", .24, .8, -.82);
[-1.3, 1.3].forEach(function (x) { [-.75, .75].forEach(function (z) { psAdd(g, B(.2, .1, .2), "gold", x, .05, z); }); });
return psMerge(g);
};
FURN.vcbasin = function () {
var g = psG();
psAdd(g, C(.18, .26, .86, 12), "basaltL", 0, .43, 0);
psAdd(g, C(.36, .22, .16, 16), "gold", 0, .92, 0);
psAdd(g, C(.3, .3, .02, 16), W(), 0, .99, 0);
psAdd(g, C(.025, .025, .3, 6), "gold", 0, 1.1, -.3);
psAdd(g, B(.04, .04, .16), "gold", 0, 1.24, -.24);
psAdd(g, B(.86, 1.16, .06), "gold", 0, 1.85, -.36);
psAdd(g, B(.74, 1.02, .03), Mi(), 0, 1.85, -.32);
return psMerge(g);
};
FURN.vcchaise = function () {
var g = psG();
psAdd(g, B(2.1, .34, .82), "velvet", 0, .36, 0);
psAdd(g, B(.5, .6, .82), "velvet", -.8, .62, 0);
psAdd(g, B(2.1, .48, .16), "velvetD", 0, .7, -.34);
psAdd(g, B(2.16, .06, .86), "woodD", 0, .17, 0);
psAdd(g, C(.11, .11, .82, 10), "velvetD", -1.02, .92, 0, Math.PI / 2);
[-.95, .95].forEach(function (x) { [-.34, .34].forEach(function (z) { psAdd(g, C(.05, .035, .14, 8), "gold", x, .07, z); }); });
return psMerge(g);
};
if (typeof SOLIDFURN !== "undefined") {
SOLIDFURN.vcbath = 1;
SOLIDFURN.vcbasin = 1;
SOLIDFURN.vcchaise = 1;
}
if (typeof FIXED_FURN !== "undefined") {
FIXED_FURN.vcbath = 1;
FIXED_FURN.vcbasin = 1;
}
if (typeof furnBox === "function") {
var fb = furnBox;
furnBox = function (k) { return k === "vcbath" ? [3, 1.8] : k === "vcbasin" ? [.7, .7] : k === "vcchaise" ? [2.2, .9] : fb.apply(this, arguments); };
}
})();
"use strict";
var PLV_SEED = ["hometv", "homeradio", "vcchaise"];
function plvQuarters(W, D, put) {
var B = -D / 2;
put("vcbath", -7, B + 4.6, 0);
put("vcbasin", -11.4, B + 3.2, 0);
put("hw_vault", -5.2, B + 0.04, 0);
put("hometv", 6.2, B + 0.36, 0);
put("homeradio", 11.8, B + 0.4, 0);
put("vcchaise", 6.2, B + 4.4, Math.PI);
}
function plvHere() { return !!(typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && INT.spec && plxIsVolcano(INT.spec)); }
(function () {
if (typeof makeInterior === "function") {
var mi = makeInterior;
makeInterior = function (spec) {
var was = PLX.building;
PLX.building = spec;
var I;
try {
I = mi.apply(this, arguments);
}
finally {
PLX.building = was;
}
try {
if (I && plxIsVolcano(spec))
plvMissing(I);
}
catch (e) {
plxWarn("volcano missing", e);
}
return I;
};
}
if (typeof psRoom === "function") {
var pr = psRoom;
psRoom = function (k, W, D, put, spots) {
var r = pr.apply(this, arguments);
try {
if (r && k === "bedroom" && plxIsVolcano(PLX.building))
plvQuarters(W, D, put);
}
catch (e) {
plxWarn("quarters", e);
}
return r;
};
}
if (typeof homeMediaWanted === "function") {
var hw = homeMediaWanted;
homeMediaWanted = function (spec) { if (plxIsVolcano(spec))
return plxMay(PLV_NAME); return hw.apply(this, arguments); };
}
if (typeof homeMediaHall === "function") {
var hh = homeMediaHall;
homeMediaHall = function () { if (plxIsVolcano(PLX.building))
return; return hh.apply(this, arguments); };
}
if (typeof hmShLot === "function") {
var hs = hmShLot;
hmShLot = function () { if (plvHere() && plxMay(PLV_NAME))
return { world: "somnucor", name: PLV_NAME }; return hs.apply(this, arguments); };
}
if (typeof fnHomeHere === "function") {
var fh = fnHomeHere;
fnHomeHere = function () { if (fh.apply(this, arguments))
return true; return plvHere() && plxMay(PLV_NAME); };
}
if (typeof fnNearFurn === "function") {
var nf = fnNearFurn;
fnNearFurn = function () {
var f = nf.apply(this, arguments);
if (f && /^vc/.test(f.k))
f = { how: f.how, k: f.k === "vcchaise" ? "chaise" : f.k === "vcbath" ? "bath" : "basin" };
return f;
};
}
if (typeof tsTick === "function") {
var tt = tsTick;
tsTick = function () {
try {
if (PLX.rest && plvHere()) {
tsPrompt("<b>" + (PLX.rest.how === "wash" ? "Bathing" : "Resting") + "</b> · <b>press E</b> (or tap here) to get up", function () { plxRestStop(); });
return;
}
if (plxExempt() && plvHere() && plxMay(PLV_NAME) && typeof fnNearFurn === "function" && typeof tsPrompt === "function" && !(typeof WLD !== "undefined" && WLD && WLD.on)) {
var f = fnNearFurn();
if (f) {
var what = f.how === "sleep" ? "the great four-poster" : f.how === "nap" ? "the " + f.k : "the " + (f.k === "bath" ? "great bath" : f.k);
var s = plxSay(f.how, what);
tsPrompt("<b>" + esc(s.name.charAt(0).toUpperCase() + s.name.slice(1)) + "</b> · <b>press E</b> (or tap here) to " + esc(s.verb), function () { plxAct(f.how, what); });
return;
}
}
}
catch (e) {
plxWarn("keeper prompt", e);
}
return tt.apply(this, arguments);
};
}
if (typeof startArranging === "function") {
var sa = startArranging;
startArranging = function () {
var r = sa.apply(this, arguments);
try {
if (plvHere() && typeof wpDraft !== "undefined" && wpDraft && INT.asBuilt) {
PLV_SEED.forEach(function (k) {
if (wpDraft.some(function (p) { return p && p.k === k; }))
return;
var p = INT.asBuilt.filter(function (q) { return q.k === k; })[0];
if (p)
wpDraft.push(JSON.parse(JSON.stringify(p)));
});
}
}
catch (e) {
plxWarn("arrange", e);
}
return r;
};
}
})();
function plvMissing(I) { return __ZC(337, 2, this, arguments, new.target); }
"use strict";
var PLN = { drawn: "", G: null, fixed: null, vault: null, swing: 0, swingTo: 0, fint: null, edit: false, draft: null, look: "", orig: null, tex: {},
rest: null, checkAt: 0, lotsAt: 0 };
function plnBuilt() {
var F = typeof IP !== "undefined" ? IP.F : 24.3;
return [{ k: "hometv", x: 33, z: -17.75, r: 3.1416, y: F }, { k: "sofa", x: 33, z: -21.4, r: 0, y: F }, { k: "homeradio", x: 53, z: -36.5, r: -1.5708, y: F }];
}
function plnKey() { var id = plxLotId(PLN_NAME); return id ? "lot:" + id : null; }
function plnOn() { return typeof WLD !== "undefined" && WLD.on === "northpole" && typeof IP !== "undefined" && IP.built && !!IP.pg; }
function plnZone() {
if (!plnOn() || typeof ipZone !== "function")
return null;
var Z = ipZone(worldLocal());
if (!Z || /road up/.test(Z.name))
return null;
return Z;
}
function plnMay() { return plxMay(PLN_NAME); }
function plnMayFurnish() { return plxSigned() && (!!plxLot(PLN_NAME) || plxKeeper()); }
function plnSaved() {
var r = typeof lotByName === "function" ? lotByName(PLN_NAME) : null;
var d = r && r.decor && r.decor.inside;
return Array.isArray(d) ? d : null;
}
function plnList() { if (PLN.edit && PLN.draft)
return PLN.draft; return plnSaved() || plnBuilt(); }
function plnDraw(force) { return __ZC(337, 3, this, arguments, new.target); }
function plnFixed() { return __ZC(337, 4, this, arguments, new.target); }
function plnSpots() { return __ZC(337, 5, this, arguments, new.target); }
function plnDynTick() { return __ZC(337, 6, this, arguments, new.target); }
function plnVaultOpen() {
var id = plxLotId(PLN_NAME);
if (!id) {
setStatus("The palace's books have not come in yet. Try again in a moment.");
if (typeof loadLots === "function")
loadLots();
return;
}
PLN.vaultLot = id;
if (typeof hvOpen === "function")
hvOpen();
}
(function () {
if (typeof hvLotHere === "function") {
var hl = hvLotHere;
hvLotHere = function () { if (PLN.vaultLot && plnZone())
return PLN.vaultLot; return hl.apply(this, arguments); };
}
if (typeof hvClose === "function") {
var hc = hvClose;
hvClose = function () { var r = hc.apply(this, arguments); PLN.vaultLot = 0; plnSwing(0); return r; };
}
if (typeof hvSwing === "function") {
var hs = hvSwing;
hvSwing = function (to) { var r = hs.apply(this, arguments); if (PLN.vaultLot)
plnSwing(to); return r; };
}
})();
function plnSwing(to) { return __ZC(337, 7, this, arguments, new.target); }
(function () {
if (typeof hmTick === "function") {
var ht = hmTick;
hmTick = function (dt) {
var Z = null;
try {
Z = PLN.G && plnZone();
}
catch (e) { }
if (!Z || !Z.roof || !plnMay() || (typeof INT !== "undefined" && INT))
return ht.apply(this, arguments);
if (!PLN.fint)
PLN.fint = { homeMedia: true, spec: { id: "pln-palace" }, root: PLN.G };
PLN.fint.root = PLN.G;
INT = PLN.fint;
try {
return ht.apply(this, arguments);
}
finally {
INT = null;
}
};
}
if (typeof hmShLot === "function") {
var hs = hmShLot;
hmShLot = function () { if (typeof HMD !== "undefined" && HMD.homeId === "pln-palace")
return { world: "northpole", name: PLN_NAME }; return hs.apply(this, arguments); };
}
})();
function plnBtnEl() {
var b = document.getElementById("pln-btn");
if (b || !document.body)
return b;
b = document.createElement("button");
b.id = "pln-btn";
b.type = "button";
b.textContent = "🛋️ Furnish the palace";
b.style.cssText = "position:fixed;left:12px;top:calc(96px + env(safe-area-inset-top,0px));z-index:46;display:none;" +
"background:rgba(10,12,18,.92);color:var(--bone);border:1px solid var(--gold,#C9A868);border-radius:3px;padding:8px 12px;font:13px var(--sans);cursor:pointer";
b.onclick = function () { plnStart(); };
document.body.appendChild(b);
return b;
}
function plnBoxEl() { return __ZC(337, 8, this, arguments, new.target); }
function plnBtnPaint() {
var b = plnBtnEl();
if (!b)
return;
var show = false;
try {
show = !PLN.edit && typeof walkMode !== "undefined" && walkMode && !!plnZone() && plnMayFurnish() && !(typeof HV !== "undefined" && HV.open) && !(typeof heldNow === "function" && heldNow());
}
catch (e) { }
b.style.display = show ? "block" : "none";
}
function plnStart() { return __ZC(337, 9, this, arguments, new.target); }
function plnStop() { PLN.edit = false; PLN.draft = null; if (typeof BF !== "undefined")
BF.start = null; plnDraw(true); plnPaint(); plnBtnPaint(); }
function plnPaint(msg) { return __ZC(337, 10, this, arguments, new.target); }
function plnHereSpot() { return __ZC(337, 11, this, arguments, new.target); }
function plnPlace(k) { return __ZC(337, 12, this, arguments, new.target); }
function plnNearest(fn) { return __ZC(337, 13, this, arguments, new.target); }
function plnSave(list) { return __ZC(337, 14, this, arguments, new.target); }
(function () {
if (typeof bfAsBuilt === "function") {
var ab = bfAsBuilt;
bfAsBuilt = function () { if (PLN.edit)
return plnBuilt(); return ab.apply(this, arguments); };
}
if (typeof bfDraft === "function") {
var bd = bfDraft;
bfDraft = function () { if (PLN.edit)
return PLN.draft; return bd.apply(this, arguments); };
}
})();
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return PLN.edit; }, close: function () { plnStop(); } });
var PLN_PARTS = { out: ["wall", "trim"], "in": ["inWall", "floor"] };
(function () {
if (typeof rsyFindNear === "function") {
var fn = rsyFindNear;
rsyFindNear = function () {
var Z = null;
try {
Z = plnZone();
}
catch (e) { }
if (Z) {
if (!walkMode || !plxSigned())
return null;
var k = plnKey();
return k && rsyMay(k) ? { key: k, inside: !!Z.roof } : null;
}
return fn.apply(this, arguments);
};
}
if (typeof rsyInCity === "function") {
var ic = rsyInCity;
rsyInCity = function () { if (ic.apply(this, arguments))
return true; try {
return !!plnZone();
}
catch (e) {
return false;
} };
}
if (typeof rsyParts === "function") {
var rp = rsyParts;
rsyParts = function () {
var ps = rp.apply(this, arguments);
if (!RSY.key || RSY.key !== plnKey())
return ps;
var want = PLN_PARTS[RSY.tab] || [];
return ps.filter(function (p) { return want.indexOf(p.k) >= 0; });
};
}
if (typeof rsyOpen === "function") {
var ro = rsyOpen;
rsyOpen = function (key) {
var r = ro.apply(this, arguments);
if (key && key === plnKey() && typeof rsyLoadRights === "function")
rsyLoadRights().then(function () {
try {
var Z = plnZone();
if (RSY.open && RSY.key === key) {
RSY.tab = Z && Z.roof ? "in" : "out";
RSY.part = null;
rsyPaint();
}
}
catch (e) { }
});
return r;
};
}
if (typeof rsyRedraw === "function") {
var rr = rsyRedraw;
rsyRedraw = function (key) { var r = rr.apply(this, arguments); if (key && key === plnKey())
setTimeout(function () { try {
plnLook();
}
catch (e) {
plxWarn("look", e);
} }, 60); return r; };
}
if (typeof rsyName === "function") {
var rn = rsyName;
rsyName = function (key) { if (key && key === plnKey())
return PLN_NAME; return rn.apply(this, arguments); };
}
})();
function plnTexOf(k) {
if (!k || typeof texOf !== "function")
return null;
if (PLN.tex[k])
return PLN.tex[k];
var t0 = texOf(k);
if (!t0)
return null;
var t = t0.clone();
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(3, 3);
t.needsUpdate = true;
PLN.tex[k] = t;
return t;
}
function plnLook() { return __ZC(337, 15, this, arguments, new.target); }
setInterval(function () {
try {
plnBtnPaint();
if (!plnOn()) {
if (PLN.edit)
plnStop();
return;
}
plnFixed();
plnSpots();
plnDraw(false);
plnDynTick();
var now = Date.now();
if (now - PLN.checkAt > 1500) {
PLN.checkAt = now;
plnLook();
}
if (plxSigned() && now - PLN.lotsAt > 20000 && plnZone()) {
PLN.lotsAt = now;
if (typeof loadLots === "function")
loadLots();
if (typeof hlLoad === "function")
hlLoad();
}
if (PLN.edit && !plnZone()) {
plnStop();
setStatus("You left the palace: nothing you moved was saved.");
}
if (PLX.rest && !plnZone() && !plvHere())
plxRestStop("You get up.");
}
catch (e) {
plxWarn("north tick", e);
}
}, 250);
(function () {
if (typeof vrpMenuItems !== "function")
return;
var vm = vrpMenuItems;
vrpMenuItems = function () {
var items = vm.apply(this, arguments);
try {
var have = {};
items.forEach(function (i) { have[i.t] = 1; });
var more = [];
["pln-btn", "wp-btn", "rsy-btn"].forEach(function (id) {
var b = document.getElementById(id);
if (!b || b.hidden || b.style.display === "none")
return;
var t = (b.title || b.textContent || "").replace(/\s+/g, " ").trim().split(/[:(]/)[0].trim();
if (!t || have[t])
return;
have[t] = 1;
more.push({ t: t, run: function () { b.click(); } });
});
if (more.length)
items.splice(Math.max(0, items.length - 1), 0, more[0], more[1], more[2]);
items = items.filter(Boolean);
}
catch (e) {
plxWarn("vr menu", e);
}
return items;
};
})();
var PLH = { mats: null };
function plhMats() { return __ZC(337, 16, this, arguments, new.target); }
function plhHall(S, D) { return __ZC(337, 17, this, arguments, new.target); }
function plhCourt(G) { return __ZC(337, 18, this, arguments, new.target); }
(function () {
if (typeof ipInside === "function") {
var f = ipInside;
ipInside = function (S, D) { var r = f.apply(this, arguments); try {
plhHall(S, D);
}
catch (e) {
if (window.console)
console.warn("[palace-life] throne hall", e);
} return r; };
}
if (typeof ipPeople === "function") {
var p = ipPeople;
ipPeople = function (G) { var r = p.apply(this, arguments); try {
plhCourt(G);
}
catch (e) {
if (window.console)
console.warn("[palace-life] court", e);
} return r; };
}
})();
