/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var HV = { placed: 0, open: false, step: "", pin: "", pin1: "", old: "", lot: 0, d: null, say: "", busy: false, prompted: false, tex: null, swing: 0, swingTo: 0, raf: 0, tab: "things" };
function hvPaintingTex() { return __ZC(314, 0, this, arguments, new.target); }
if (typeof FURN !== "undefined") {
FURN.hw_vault = function () { return __ZC(314, 1, this, arguments, new.target); };
FURN.hw_vaultbox = function () { return __ZC(314, 2, this, arguments, new.target); };
}
if (typeof FIXED_FURN !== "undefined") {
FIXED_FURN.hw_vault = 1;
FIXED_FURN.hw_vaultbox = 1;
}
function hvBuildingLot() {
try {
return !!(typeof HW !== "undefined" && HW.home && HW.spec && typeof hlPlotOf === "function" && hlPlotOf(HW.spec));
}
catch (e) {
return false;
}
}
(function () {
if (typeof furnishRoom === "function") {
var fr = furnishRoom;
furnishRoom = function (kind, xc, zc, w, d, sd, put) {
var r = fr.apply(this, arguments);
try {
if (!HV.placed && kind === "bedroom" && typeof put === "function" && hvBuildingLot()) {
HV.placed = 1;
put("hw_vault", xc - sd * w / 2 + sd * Math.min(1.05, w * 0.2), zc - d / 2 + 0.04, 0);
}
}
catch (e) { }
return r;
};
}
if (typeof fillHall === "function") {
var fh = fillHall;
fillHall = function (kind, W, D, put, spots) {
var r = fh.apply(this, arguments);
try {
if (!HV.placed && typeof put === "function" && hvBuildingLot() && HW.poor) {
HV.placed = 1;
put("hw_vaultbox", -W / 2 + 0.4, 0.3, Math.PI / 2);
}
}
catch (e) { }
return r;
};
}
if (typeof makeInterior === "function") {
var mk = makeInterior;
makeInterior = function () {
HV.placed = 0;
var I = mk.apply(this, arguments);
try {
if (I && I.root) {
var v = null;
I.root.traverse(function (o) { if (!v && o.userData && (o.userData.furn === "hw_vault" || o.userData.furn === "hw_vaultbox"))
v = o; });
I.hvObj = v;
}
}
catch (e) { }
return I;
};
}
})();
function hvLotHere() { return (typeof haMyLotHere === "function") ? haMyLotHere() : 0; }
function hvNear() { return __ZC(314, 3, this, arguments, new.target); }
function hvTick() {
var show = false;
try {
show = !HV.open && !(typeof wpEditing !== "undefined" && wpEditing) && typeof signedIn === "function" && signedIn() && hvLotHere() && hvNear();
}
catch (e) {
show = false;
}
if (show) {
var box = INT.hvObj.userData.furn === "hw_vaultbox";
var html = "🔐 <b>Your hidden vault</b> · " + (box ? "the strongbox" : "behind the painting") + " · <b>press E</b> (or tap here) to open it";
if (typeof worldPrompt === "function" && (!HV.prompted || (WLD && WLD.prompt && WLD.prompt.dataset.h !== html)))
worldPrompt(html, hvOpen);
HV.prompted = true;
if (typeof HMD !== "undefined" && HMD && (HMD.mode === "tv" || HMD.mode === "radio")) {
HMD.shut = HMD.mode;
HMD.mode = null;
if (typeof hmPaint === "function")
hmPaint();
}
}
else if (HV.prompted) {
HV.prompted = false;
if (typeof worldPrompt === "function" && typeof WLD !== "undefined" && WLD.promptFn === hvOpen)
worldPrompt(null);
}
}
setInterval(function () { try {
hvTick();
}
catch (e) { } }, 250);
addEventListener("keydown", function (e) {
if (HV.open) {
var t = e.target && e.target.tagName || "";
if (/INPUT|TEXTAREA|SELECT/.test(t))
return;
if (HV.step === "pin" || HV.step === "pin1" || HV.step === "pin2" || HV.step === "old") {
if (/^Digit[0-9]$|^Numpad[0-9]$/.test(e.code)) {
e.preventDefault();
e.stopImmediatePropagation();
hvKey(e.code.slice(-1));
return;
}
if (e.code === "Backspace") {
e.preventDefault();
e.stopImmediatePropagation();
hvKey("<");
return;
}
if (e.code === "Enter" || e.code === "NumpadEnter") {
e.preventDefault();
e.stopImmediatePropagation();
hvKey("ok");
return;
}
}
return;
}
if ((e.code !== "KeyE" && e.code !== "Enter") || !HV.prompted)
return;
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
e.preventDefault();
e.stopImmediatePropagation();
hvOpen();
}, true);
function hvSwing(to) { return __ZC(314, 4, this, arguments, new.target); }
function hvErr(e, name) { return __ZC(314, 5, this, arguments, new.target); }
function hvCall(name, args) {
HV.busy = true;
hvPaint();
return cityRpc(name, args).then(function (o) { HV.busy = false; return o || {}; }, function (e) { HV.busy = false; return { ok: false, say: hvErr(e, name) }; });
}
function hvOpen() { return __ZC(314, 6, this, arguments, new.target); }
function hvClose() { if (HV.step === "open")
hvRefresh(); HV.open = false; HV.pin = ""; HV.pin1 = ""; HV.old = ""; HV.d = null; HV.step = ""; hvSwing(0); hvPaint(); }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return HV.open; }, close: hvClose });
function hvKey(k) {
if (HV.busy)
return;
if (k === "<") {
HV.pin = HV.pin.slice(0, -1);
return hvPaint();
}
if (k === "ok")
return hvEnter();
if (/^[0-9]$/.test(k) && HV.pin.length < 8) {
HV.pin += k;
HV.say = "";
hvPaint();
}
}
function hvEnter() { return __ZC(314, 7, this, arguments, new.target); }
function hvAfter(o) {
if (!o.ok) {
HV.say = o.say || "That did not work.";
if (/PIN|locked/i.test(HV.say) && !/^Your PIN/.test(HV.say)) {
HV.step = "pin";
HV.key = "";
hvSwing(0.35);
}
return hvPaint();
}
HV.d = o;
HV.say = o.say || "";
hvPaint();
hvRefresh();
}
function hvRefresh() { return __ZC(314, 8, this, arguments, new.target); }
function hvGold(n) { hvCall("vault_gold", { p_lot: HV.lot, p_pin: HV.key, p_amount: n }).then(hvAfter); }
function hvThing(item, n, into) { hvCall("vault_things", { p_lot: HV.lot, p_pin: HV.key, p_item: item, p_n: n, p_in: into }).then(hvAfter); }
function hvOne(row, into) { hvCall("vault_one", { p_lot: HV.lot, p_pin: HV.key, p_row: row, p_in: into }).then(hvAfter); }
function hvStock(kind, n, into) { hvCall("vault_stock", { p_lot: HV.lot, p_pin: HV.key, p_kind: kind, p_n: n, p_in: into }).then(hvAfter); }
function hvFinds(what, n, into) { hvCall("vault_finds", { p_lot: HV.lot, p_pin: HV.key, p_what: what, p_n: n, p_in: into }).then(hvAfter); }
function hvKeep(what, k, into) { hvCall("vault_keep", { p_lot: HV.lot, p_pin: HV.key, p_what: what, p_k: k, p_in: into }).then(hvAfter); }
function hvRare(id, carry) { return __ZC(314, 9, this, arguments, new.target); }
function hvB(a, label, extra, style) { return "<button class='btn' data-hv='" + a + "'" + (extra || "") + " style='margin:2px 4px 2px 0;" + (style || "") + "'>" + label + "</button>"; }
function hvPad() { return __ZC(314, 10, this, arguments, new.target); }
function hvRows(list, into) { return __ZC(314, 11, this, arguments, new.target); }
function hvLine(left, btns) { return "<div style='display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.06);flex-wrap:wrap'><span style='flex:1 1 150px;min-width:0;overflow-wrap:anywhere'>" + left + "</span><span>" + btns + "</span></div>"; }
function hvHead(t) { return "<div style='margin:12px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868'>" + t + "</div>"; }
function hvStockRows(list, into) { return __ZC(314, 12, this, arguments, new.target); }
function hvStockName(s) { return __ZC(314, 13, this, arguments, new.target); }
function hvFindsHtml(d) { return __ZC(314, 14, this, arguments, new.target); }
function hvHtml() { return __ZC(314, 15, this, arguments, new.target); }
function hvPaint() { return __ZC(314, 16, this, arguments, new.target); }
function hvWrapFinds() {
if (HV.wrapped)
return;
HV.wrapped = 1;
if (typeof mmRpc === "function") {
var mr = mmRpc;
mmRpc = function () {
return mr.apply(this, arguments).catch(function (e) {
var m = String((e && e.message) || e || "");
try {
var j = JSON.parse(m);
m = j.message || m;
}
catch (x) { }
if (/home vault/i.test(m))
return { ok: false, say: "It is in your home vault. Take it out of the vault first." };
throw e;
});
};
}
if (typeof mmPlaceName === "function") {
var mp = mmPlaceName;
mmPlaceName = function (k) { if (k === "vault")
return "your home vault"; if (k === "standby")
return "standing by (call it here)"; return mp.apply(this, arguments); };
}
}
if (document.readyState === "complete")
hvWrapFinds();
else
addEventListener("load", hvWrapFinds);
"use strict";
var BF = { start: null, allow: null };
function bfHomeEdit() { return typeof wpEditing !== "undefined" && !!wpEditing && /^lot:/.test(wpEditing); }
function bfEyrieEdit() { return typeof EYD !== "undefined" && !!EYD.edit; }
function bfFree() { return typeof amKeeper === "function" && amKeeper(); }
function bfCount(list, k) { var n = 0; (list || []).forEach(function (p) { if (p && p.k === k)
n++; }); return n; }
function bfAsBuilt() {
if (bfHomeEdit())
return (typeof INT !== "undefined" && INT && INT.asBuilt) || [];
if (bfEyrieEdit() && typeof eydAsBuilt === "function")
try {
return eydAsBuilt(EYD.edit) || [];
}
catch (e) { }
return [];
}
function bfDraft() { return bfHomeEdit() ? (typeof wpDraft !== "undefined" ? wpDraft : null) : (bfEyrieEdit() ? EYD.draft : null); }
function bfPool(k) { return Math.max(bfCount(bfAsBuilt(), k), bfCount(BF.start, k)); }
function bfOwned(k) { return typeof sgOwned === "function" ? sgOwned(k) : 0; }
function bfName(k) {
var it = typeof SG !== "undefined" && SG.by && SG.by[k];
if (it)
return it.n;
if (/^um_/.test(k) && typeof MW !== "undefined" && MW.by && MW.by[k])
return MW.by[k].title;
return String(k).replace(/_/g, " ");
}
function bfMay(k, draft) { return __ZC(314, 17, this, arguments, new.target); }
(function () {
if (typeof furnList === "function") {
var fl = furnList;
furnList = function () { return fl.apply(this, arguments).filter(function (k) { return !/^(hw_vault|hw_vaultbox|um_)/.test(k); }); };
}
if (typeof sgMayPlace === "function") {
var sm = sgMayPlace;
sgMayPlace = function (k) { if (BF.allow && BF.allow === k)
return true; return sm.apply(this, arguments); };
}
function guard(place, draftOf, repaint) {
return function (k) {
if (!(bfHomeEdit() || bfEyrieEdit()) || bfFree())
return place.apply(this, arguments);
if (!bfMay(k, draftOf())) {
try {
repaint("Bought pieces only: " + bfName(k) + " is not yours to set out.");
}
catch (e) { }
return;
}
BF.allow = k;
try {
return place.apply(this, arguments);
}
finally {
BF.allow = null;
}
};
}
if (typeof wpPlace === "function")
wpPlace = guard(wpPlace, function () { return typeof wpDraft !== "undefined" ? wpDraft : null; }, function (m) { if (typeof paintArranger === "function")
paintArranger(m); });
if (typeof eydPlace === "function")
eydPlace = guard(eydPlace, function () { return EYD.draft; }, function (m) { if (typeof eydPaint === "function")
eydPaint(m); });
if (typeof startArranging === "function") {
var sa = startArranging;
startArranging = function () { var r = sa.apply(this, arguments); try {
BF.start = bfHomeEdit() && wpDraft ? JSON.parse(JSON.stringify(wpDraft)) : null;
bfFix(document.getElementById("wp-kind"));
}
catch (e) { } return r; };
}
if (typeof eydStart === "function") {
var es = eydStart;
eydStart = function () { var r = es.apply(this, arguments); try {
BF.start = bfEyrieEdit() && EYD.draft ? JSON.parse(JSON.stringify(EYD.draft)) : null;
bfFix(document.getElementById("eyd-kind"));
}
catch (e) { } return r; };
}
if (typeof paintArranger === "function") {
var pa = paintArranger;
paintArranger = function () { var r = pa.apply(this, arguments); try {
if (bfHomeEdit())
bfFix(document.getElementById("wp-kind"));
}
catch (e) { } return r; };
}
if (typeof eydPaint === "function") {
var ep = eydPaint;
eydPaint = function () { var r = ep.apply(this, arguments); try {
if (bfEyrieEdit())
bfFix(document.getElementById("eyd-kind"));
}
catch (e) { } return r; };
}
})();
function bfFix(sel) { return __ZC(314, 18, this, arguments, new.target); }
"use strict";
var HS = { d: null, at: 0, busy: false, say: "", open: {} };
function hsLoad(force) {
if (!(typeof signedIn === "function" && signedIn())) {
HS.d = null;
return Promise.resolve(null);
}
if (HS.busy || (!force && HS.d && Date.now() - HS.at < 15000))
return Promise.resolve(HS.d);
HS.busy = true;
return cityRpc("head_staff", {}).then(function (o) { HS.d = o && o.ok ? o : null; }, function () { HS.d = null; })
.then(function () { HS.busy = false; HS.at = Date.now(); hsPaint(); return HS.d; });
}
function hsB(a, label, extra, on) { return "<button class='btn' data-hs='" + a + "'" + (extra || "") + " style='margin:2px 4px 2px 0;" + (on ? "background:#6A4A12;border-color:#E8C27A" : "") + "'>" + label + "</button>"; }
function hsHtml() {
var d = HS.d;
if (!d || !(d.businesses || []).length)
return "";
var h = "<div style='margin-top:14px;padding-top:8px;border-top:1px solid var(--line)'><b>Your staff: promotions and raises</b>" +
"<div style='color:var(--dim);font-size:12px;margin:2px 0 6px'>As the head, you decide who moves up and who earns more. A raise is paid on payday, on top of the post's wage, for every hour they work" +
" (by the Treasury at the city's own businesses, from your wallet at your own). They are told on their phone.</div>";
if (HS.say)
h += "<div role='status' style='margin:4px 0;padding:4px 8px;border:1px solid rgba(232,194,122,.4);border-radius:4px'>" + esc(HS.say) + "</div>";
d.businesses.forEach(function (b) {
h += "<div style='margin-top:8px'><b>" + esc(b.name) + "</b></div>";
var staff = (b.staff || []).filter(function (s) { return !s.me; });
if (!staff.length) {
h += "<div style='color:var(--dim);margin-left:10px'>Nobody on the staff but you yet.</div>";
return;
}
staff.forEach(function (s) {
var open = !!HS.open[s.id];
h += "<div style='margin:4px 0 0 10px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05)'>" + esc(s.name || "a dreamer") + " <span style='color:var(--dim)'>" + esc(s.title) + (s.raise ? " · raise " + s.raise + "%" : "") + "</span> " +
hsB("more", open ? "Done" : "Promote or raise", " data-e='" + s.id + "'") + "</div>";
if (!open)
return;
var posts = (b.posts || []).filter(function (p) { return p.job !== s.job && !(p.head && b.city && !d.keeper) && (+p.taken || 0) < (+p.positions || 1); });
h += "<div style='margin:2px 0 6px 20px'><div style='color:var(--dim);font-size:12px'>Move to another post:</div>" +
(posts.length ? posts.map(function (p) { return hsB("move", esc(p.title) + " · " + p.rate + " gold " + (p.pay_kind === "salary" ? "a week" : "an hour"), " data-e='" + s.id + "' data-j='" + p.job + "'"); }).join("") : "<span style='color:var(--dim)'>Every other post is full.</span>") +
"<div style='color:var(--dim);font-size:12px;margin-top:4px'>Raise on top of the wage:</div>" +
[0, 5, 10, 15, 25, 50].map(function (n) { return hsB("raise", n ? n + "%" : "None", " data-e='" + s.id + "' data-p='" + n + "'", (+s.raise || 0) === n); }).join("") + "</div>";
});
});
return h + "</div>";
}
function hsPaint() {
var el = document.getElementById("business-state");
if (!el)
return;
var box = document.getElementById("hs-box");
var html = hsHtml();
if (!html) {
if (box)
box.remove();
return;
}
if (!box || box.parentNode !== el) {
if (box)
box.remove();
box = document.createElement("div");
box.id = "hs-box";
el.appendChild(box);
box.addEventListener("click", function (ev) {
var b = ev.target.closest && ev.target.closest("[data-hs]");
if (!b)
return;
ev.stopPropagation();
var a = b.getAttribute("data-hs"), e = +b.getAttribute("data-e");
if (a === "more") {
HS.open[e] = !HS.open[e];
return hsPaint();
}
if (HS.busy)
return;
var call = a === "move" ? cityRpc("staff_promote", { p_employment: e, p_job: +b.getAttribute("data-j"), p_note: "" })
: a === "raise" ? cityRpc("staff_raise", { p_employment: e, p_pct: +b.getAttribute("data-p"), p_note: "" }) : null;
if (!call)
return;
HS.busy = true;
HS.say = "…";
hsPaint();
call.then(function (o) { HS.say = (o && o.say) || "Done."; if (o && o.ok && typeof setStatus === "function")
setStatus(esc(HS.say)); }, function (e2) { var m = String(e2 && e2.message || e2); HS.say = /function|404|schema cache/i.test(m) ? "Promotions and raises open soon." : m; })
.then(function () { HS.busy = false; hsLoad(true); if (typeof loadMyJobs === "function")
loadMyJobs(); });
});
}
box.innerHTML = html;
}
(function () {
if (typeof paintBusiness !== "function")
return;
var pb = paintBusiness;
paintBusiness = function () { var r = pb.apply(this, arguments); try {
hsPaint();
hsLoad(false);
}
catch (e) { } return r; };
})();
"use strict";
var MW = { open: false, tab: "shop", d: null, say: "", busy: false, by: {}, list: null, at: 0, glb: {}, up: null, file: null, form: { title: "", price: "200", height: "" }, view: null, counter: null };
var MW_MAX_BYTES = 4194304, MW_MAX_TRIS = 40000, MW_MAX_TEX = 2048;
function mwBase() { return (typeof DW_CONFIG !== "undefined" && DW_CONFIG.supabaseUrl || "").replace(/\/+$/, ""); }
function mwRpc(name, body) {
if (typeof signedIn === "function" && signedIn())
return cityRpc(name, body);
if (typeof restRpc === "function" && mwBase())
return restRpc(name, body);
return Promise.reject(new Error("offline"));
}
function mwErr(e) { return __ZC(314, 19, this, arguments, new.target); }
function mwFetch(path) { return __ZC(314, 20, this, arguments, new.target); }
function mwParse(buf) { return __ZC(314, 21, this, arguments, new.target); }
function mwMeasure(scene) { return __ZC(314, 22, this, arguments, new.target); }
function mwFit(scene, size) { return __ZC(314, 23, this, arguments, new.target); }
function mwScene(m) { return __ZC(314, 24, this, arguments, new.target); }
function mwRegister(m) { return __ZC(314, 25, this, arguments, new.target); }
function mwLoadList(force) {
if (!mwBase())
return Promise.resolve([]);
if (MW.list && !force && Date.now() - MW.at < 120000)
return Promise.resolve(MW.list);
MW.at = Date.now();
return mwRpc("models_approved", {}).then(function (rows) {
MW.list = Array.isArray(rows) ? rows : [];
var fresh = {};
MW.list.forEach(function (m) { if (typeof FURN !== "undefined" && !FURN["um_" + m.id])
fresh["um_" + m.id] = 1; mwRegister(m); });
try {
if (Object.keys(fresh).length && typeof INT !== "undefined" && INT && INT.wpKey && !(typeof wpEditing !== "undefined" && wpEditing) && typeof workplaceDecor === "function") {
var dec = workplaceDecor(INT.wpKey) || [];
if (dec.some(function (p) { return p && fresh[p.k]; }) && typeof rebuildHere === "function")
rebuildHere();
}
}
catch (e) { }
return MW.list;
}, function () { MW.list = MW.list || []; return MW.list; });
}
if (typeof furnBox === "function") {
var mwFurnBox0 = furnBox;
furnBox = function (k) { var m = MW.by[k]; if (m && m.size)
return [Math.max(0.3, (+m.size[0] || 1) - 0.1), Math.max(0.3, (+m.size[2] || 1) - 0.1)]; return mwFurnBox0.apply(this, arguments); };
}
function mwViewStop() {
var v = MW.view;
MW.view = null;
if (!v)
return;
cancelAnimationFrame(v.raf);
try {
v.r.dispose();
if (v.r.forceContextLoss)
v.r.forceContextLoss();
}
catch (e) { }
if (v.c && v.c.parentNode)
v.c.parentNode.removeChild(v.c);
}
function mwViewStart(host, objP, label) { return __ZC(314, 26, this, arguments, new.target); }
function mwPick(file) { return __ZC(314, 27, this, arguments, new.target); }
function mwSend() { return __ZC(314, 28, this, arguments, new.target); }
function mwLoad() { return __ZC(314, 29, this, arguments, new.target); }
function mwOpen(tab) { MW.open = true; MW.say = ""; if (tab)
MW.tab = tab; mwPaint(); mwLoad(); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
function mwClose() { MW.open = false; mwViewStop(); mwPaint(); }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return MW.open; }, close: mwClose });
function mwB(a, label, extra, on) { return "<button class='btn' data-mw='" + a + "'" + (extra || "") + " style='margin:2px 4px 2px 0;" + (on ? "background:#6A4A12;border-color:#E8C27A" : "") + "'>" + label + "</button>"; }
var MW_ST = { pending: "⏳ waiting for a moderator", approved: "✅ on sale", rejected: "❌ not approved" };
function mwRow(m, btns, sub) { return __ZC(314, 30, this, arguments, new.target); }
function mwHtml() { return __ZC(314, 31, this, arguments, new.target); }
function mwFind(id) { var d = MW.d || {}, all = [].concat(d.shop || [], d.mine || [], d.review || []); for (var i = 0; i < all.length; i++)
if (all[i].id === id)
return all[i]; return null; }
function mwPaint() { return __ZC(314, 32, this, arguments, new.target); }
function mwClick(ev) { return __ZC(314, 33, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-models"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-models";
b.title = "The Model Workshop in the Somnucor Tower: models for sale, and uploads for its makers";
b.textContent = "🧊 Model Workshop";
b.onclick = function () { mwOpen(); };
var pk = document.getElementById("me-art");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
function mwTowerSpec(spec) { return !!(spec && (spec.archetype === "somnucortower" || spec.tower)); }
(function () {
if (typeof makeInterior !== "function")
return;
var mk = makeInterior;
makeInterior = function (spec) {
var I = mk.apply(this, arguments);
try {
if (I && I.root && mwTowerSpec(spec) && I.W && I.D) {
var g = new THREE.Group();
g.name = "mw-counter";
var wood = new THREE.MeshStandardMaterial({ color: 0x4A3A2A, roughness: 0.7 }), top = new THREE.MeshStandardMaterial({ color: 0x2E3036, roughness: 0.35, metalness: 0.4 });
var desk = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.0, 0.7), wood);
desk.position.y = 0.5;
g.add(desk);
var slab = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.05, 0.8), top);
slab.position.y = 1.03;
g.add(slab);
var c = document.createElement("canvas");
c.width = 512;
c.height = 128;
var x = c.getContext("2d");
x.fillStyle = "#1A1612";
x.fillRect(0, 0, 512, 128);
x.strokeStyle = "#C9A868";
x.lineWidth = 6;
x.strokeRect(5, 5, 502, 118);
x.fillStyle = "#E0CC9A";
var fs = 44;
do {
x.font = "700 " + fs + "px Georgia, serif";
fs -= 2;
} while (fs > 20 && x.measureText("THE MODEL WORKSHOP").width > 460);
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText("THE MODEL WORKSHOP", 256, 64);
var sign = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.55), new THREE.MeshLambertMaterial({ map: new THREE.CanvasTexture(c) }));
sign.position.set(0, 2.1, -0.3);
g.add(sign);
var post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.1, 0.08), wood);
post.position.set(-1.0, 1.6, -0.32);
g.add(post);
var post2 = post.clone();
post2.position.x = 1.0;
g.add(post2);
var lx = -I.W / 2 + 2.2, lz = I.D / 2 - 5.5;
g.position.set(lx, 0, lz);
g.rotation.y = Math.PI / 2;
I.root.add(g);
if (I.walls)
I.walls.push({ x: I.ox + lx, z: I.oz + lz, rot: 0, hw: 0.4, hd: 1.25, h: 1.2, level: 0 });
I.mwCounter = { x: lx, z: lz };
}
}
catch (e) { }
return I;
};
})();
function mwTick() {
var at = typeof INT !== "undefined" && INT && INT.mwCounter;
var show = false;
if (at && !MW.open && (INT.level || 0) === 0 && typeof camera !== "undefined") {
var dx = camera.position.x - (INT.ox + at.x), dz = camera.position.z - (INT.oz + at.z);
show = Math.hypot(dx, dz) < 3.2;
}
if (show) {
if (!MW.prompted && typeof worldPrompt === "function") {
MW.fn = MW.fn || function () { mwOpen(); };
worldPrompt("🧊 <b>The Model Workshop</b> · models for sale, and the makers' uploads · <b>press E</b> (or tap here)", MW.fn);
}
MW.prompted = true;
}
else if (MW.prompted) {
MW.prompted = false;
if (typeof worldPrompt === "function" && typeof WLD !== "undefined" && WLD.promptFn === MW.fn)
worldPrompt(null);
}
if (!MW.wayAt && typeof store !== "undefined" && store.workplaceAt && store.objects) {
var tw = store.objects.filter(function (o) { return o.archetype === "somnucortower"; })[0];
if (tw) {
MW.wayAt = 1;
if (!store.workplaceAt["The Model Workshop"])
store.workplaceAt["The Model Workshop"] = { x: tw.x, z: tw.z, id: tw.id };
}
}
}
setInterval(function () { try {
mwTick();
}
catch (e) { } }, 300);
addEventListener("keydown", function (e) {
if ((e.code !== "KeyE" && e.code !== "Enter") || !MW.prompted || MW.open)
return;
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
e.preventDefault();
e.stopImmediatePropagation();
mwOpen();
}, true);
setInterval(function () { try {
if (typeof haInCity === "function" && (haInCity() || (typeof haIntLot === "function" && haIntLot())))
mwLoadList(false);
}
catch (e) { } }, 5000);
