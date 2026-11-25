/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WH_KEY = "The Somnucor Wholesale Warehouse";
cityWorkplace({ key: WH_KEY, ring: "commons", arch: "warehouse", s: 0.6, jobs: [1630, 1631, 1632], fit: ["shelfgoods", "shelfgoods", "crates", "crates", "crates", "barrel", "desk", "noticeboard"],
note: "Where the city's shops order their stock: picked here, driven to the shop, paid for by the Treasury." });
cityMore("xwh", function (C) { cityFrontage(C, WH_KEY, 1420, 1) || cityFrontage(C, WH_KEY, 1280, 7); });
var WHS = { data: null, at: 0, busy: false, open: false, msg: "", tab: "shops", cat: null, dept: "", q: "", shops: null, orders: null, mine: null, making: false };
function whMayLook() {
return typeof signedIn === "function" && signedIn();
}
function whButton() {
var b = document.getElementById("wh-btn"), show = whMayLook() && (typeof careInCity === "function") && (careInCity() || hallInside(WH_KEY) || (store.inside && typeof INT !== "undefined" && INT && INT.spec && INT.spec.city));
if (!b) {
if (!show || !document.body)
return;
b = document.createElement("button");
b.id = "wh-btn";
b.type = "button";
b.textContent = "Shops";
b.style.cssText = "position:fixed;right:12px;bottom:calc(96px + env(safe-area-inset-bottom,0px));z-index:45;background:rgba(10,12,18,.92);color:var(--bone);border:1px solid #6A9AC0;border-radius:3px;padding:9px 13px;font:13px var(--sans);cursor:pointer";
b.onclick = function () { WHS.open = !WHS.open; if (WHS.open)
whLoadTab(true); whPaint(); };
document.body.appendChild(b);
}
b.style.display = show ? "block" : "none";
if (!show && WHS.open) {
WHS.open = false;
whPaint();
}
}
function whErr(e, upd) { var m = String((e && e.message) || e || ""); return /function|404|PGRST|does not exist/i.test(m) ? "This part of the market opens once the server has update " + upd + "." : m; }
function whLoad(force) { return __ZC(142, 0, this, arguments, new.target); }
function whLoadCat() {
cityRpc("wholesale_catalogue", { p_dept: WHS.dept || null, p_q: WHS.q || null }).then(function (d) { WHS.cat = d; if (WHS.open)
whPaint(); })
.catch(function (e) { WHS.cat = { ok: false, say: whErr(e, 15) }; if (WHS.open)
whPaint(); });
}
function whLoadShops() {
cityRpc("business_shop", { p_shop: null }).then(function (d) { WHS.shops = d; if (WHS.open)
whPaint(); })
.catch(function (e) { WHS.shops = { ok: false, say: whErr(e, 15) }; if (WHS.open)
whPaint(); });
}
function whLoadMine() { return __ZC(142, 1, this, arguments, new.target); }
function whLoadTab(force) {
if (WHS.tab === "shops")
whLoadShops();
else if (WHS.tab === "stock") {
whLoadCat();
}
else if (WHS.tab === "make") {
if (!WHS.cat)
whLoadCat();
whLoadMine();
}
else
whLoad(force);
}
var WH_BOX = "position:fixed;right:12px;bottom:calc(140px + env(safe-area-inset-bottom,0px));z-index:46;width:min(460px,calc(100vw - 24px));max-height:min(72vh,640px);overflow:auto;background:rgba(8,10,16,.96);border:1px solid #6A9AC0;border-radius:4px;padding:12px 14px;font:13px var(--sans);color:var(--bone);line-height:1.45";
function whRow(left, right) { return '<div style="display:flex;justify-content:space-between;gap:6px;align-items:center;margin-top:4px"><span>' + left + '</span><span style="white-space:nowrap">' + (right || "") + '</span></div>'; }
function whDim(t) { return '<span style="color:var(--dim)">' + t + '</span>'; }
function whPaint() { return __ZC(142, 2, this, arguments, new.target); }
function whShopsHtml() { return __ZC(142, 3, this, arguments, new.target); }
function whStockHtml() { return __ZC(142, 4, this, arguments, new.target); }
function whMakeHtml() { return __ZC(142, 5, this, arguments, new.target); }
function whCityHtml() { return __ZC(142, 6, this, arguments, new.target); }
function whChange(e) {
var t = e.target;
if (!t)
return;
if (t.id === "wh-dept") {
WHS.dept = t.value;
whLoadCat();
}
if (t.id === "wh-shop") {
WHS.shop = +t.value;
}
}
function whSay(p, after) {
WHS.msg = "…";
whPaint();
return p.then(function (o) { WHS.msg = (o && o.say) || (o && o.ok ? "Done." : "That did not go through."); if (after)
after(o); whPaint(); return o; })
.catch(function (err) { WHS.msg = String((err && err.message) || err); whPaint(); });
}
function whVal(id) { var x = document.getElementById(id); return x ? String(x.value || "").trim() : ""; }
function whClick(e) { return __ZC(142, 7, this, arguments, new.target); }
var WH_MAKE_SYS = (typeof AID_SYS !== "undefined" ? AID_SYS : "") +
" Also add \"price\": a fair shop price for one of it in Somnucor gold (a loaf of bread is 2 gold, a chair 15, a sword 60, a horse 400, a car 2000), and \"dept\": the shop department it belongs in, in a few words.";
function whMake(name, dept, detail) { return __ZC(142, 8, this, arguments, new.target); }
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick, acc = 0;
transitTick = function (dt) { tt.apply(this, arguments); if ((acc += dt) > 1) {
acc = 0;
try {
whButton();
}
catch (e) { }
} };
})();
