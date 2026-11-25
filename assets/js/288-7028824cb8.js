/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var GI = { code: "", open: false, busy: false, say: "", mine: null, asked: 0, wait: 0, gather: null, toHall: false, hallWait: 0 };
var GI_KEY = "somnu_invite_code";
function giNorm(c) { return String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 24); }
function giShow(c) { c = giNorm(c); return c.length === 12 ? c.slice(0, 4) + "-" + c.slice(4, 8) + "-" + c.slice(8) : c; }
function giKeep(c) { try {
if (c)
localStorage.setItem(GI_KEY, c);
else
localStorage.removeItem(GI_KEY);
}
catch (e) { } }
function giKept() { try {
return localStorage.getItem(GI_KEY) || "";
}
catch (e) {
return "";
} }
(function () {
try {
var m = /[?&]invite=([^&#]*)/i.exec(location.search || "");
if (!m)
return;
var c = giNorm(decodeURIComponent(m[1].replace(/\+/g, " ")));
if (c) {
GI.code = c;
giKeep(c);
}
if (history && history.replaceState) {
var q = (location.search || "").replace(/([?&])invite=[^&#]*&?/i, "$1").replace(/[?&]$/, "");
history.replaceState(null, "", location.pathname + (q || "?play") + (location.hash || ""));
}
}
catch (e) { }
})();
if (!GI.code)
GI.code = giKept();
(function () {
if (document.getElementById("gi-style"))
return;
var s = document.createElement("style");
s.id = "gi-style";
s.textContent =
"#gi-box{position:fixed;z-index:60;left:50%;top:50%;transform:translate(-50%,-50%);width:min(420px,calc(100vw - 32px));max-height:min(86vh,680px);overflow-y:auto;" +
"border-radius:14px;padding:3px;background:linear-gradient(135deg,#7A5A1E,#D9B45A 30%,#8C6A26 55%,#E2C276 78%,#6E5018);box-shadow:0 18px 60px rgba(0,0,0,.65);-webkit-overflow-scrolling:touch}" +
"#gi-box .gi-in{position:relative;overflow:hidden;border-radius:11px;padding:20px 20px 18px;color:#F1E3BE;font:14px var(--sans,system-ui);" +
"background:radial-gradient(ellipse at 50% 0%,rgba(226,190,110,.18),transparent 60%),linear-gradient(180deg,#2A1E10,#1A120A 70%,#120C07)}" +
"#gi-box .gi-in:before{content:'';position:absolute;inset:7px;border:1px solid rgba(217,180,90,.45);border-radius:7px;pointer-events:none}" +
"#gi-box h3{margin:2px 0 4px;text-align:center;font:600 24px/1.15 var(--serif,Georgia);letter-spacing:.04em;color:#E8C977}" +
"#gi-box .gi-sub{text-align:center;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#BFA062}" +
"#gi-box .gi-no{margin:14px auto 6px;text-align:center;font:500 44px/1 var(--serif,Georgia);color:#E8C977}" +
"#gi-box .gi-no small{display:block;font-size:12px;letter-spacing:.2em;color:#BFA062;margin-top:4px}" +
"#gi-box p{line-height:1.55;margin:10px 0}" +
"#gi-box input{width:100%;box-sizing:border-box;padding:10px 12px;border-radius:6px;border:1px solid #8C6A26;background:#120C07;color:#F1E3BE;" +
"font:600 18px/1 ui-monospace,Menlo,monospace;letter-spacing:.12em;text-align:center;text-transform:uppercase}" +
"#gi-box .gi-row{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:12px}" +
"#gi-box .gi-gold{background:linear-gradient(180deg,#E2C276,#B8913E);color:#24180A;border:0;font-weight:600}" +
"#gi-box .gi-say{min-height:18px;text-align:center;color:#E0A080;font-size:13px}" +
"#gi-box .gi-mote{position:absolute;width:4px;height:4px;border-radius:50%;background:#F3D98F;box-shadow:0 0 6px 2px rgba(243,217,143,.45);opacity:.15;" +
"animation:giMote 5.5s ease-in-out infinite;pointer-events:none}" +
"@keyframes giMote{0%,100%{opacity:.12}50%{opacity:.7}}" +
"@media (prefers-reduced-motion:reduce){#gi-box .gi-mote{animation:none;opacity:.4}}";
(document.head || document.documentElement).appendChild(s);
})();
function giMotes() {
var h = "", spots = [[8, 12], [88, 9], [15, 78], [82, 70], [50, 4], [94, 44], [4, 46], [62, 90], [30, 30], [72, 24]];
spots.forEach(function (p, i) { h += '<i class="gi-mote" style="left:' + p[0] + '%;top:' + p[1] + '%;animation-delay:' + (i * 0.55).toFixed(2) + 's"></i>'; });
return h;
}
function giOpen() { GI.open = true; GI.say = ""; giPaint(); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
function giClose() { GI.open = false; giPaint(); }
if (typeof backRegister === "function")
backRegister({ order: 1, open: function () { return !!GI.open; }, close: giClose });
function giPaint() { return __ZC(288, 0, this, arguments, new.target); }
function giPlusLink(code) { return location.origin + location.pathname + "?play&invite=" + encodeURIComponent(giShow(code)); }
function giPlusHtml(p) { return __ZC(288, 1, this, arguments, new.target); }
function giPlusSay(t) { var e = document.getElementById("gi-plus-say"); if (e)
e.textContent = t; }
function giPlusCopy() { return __ZC(288, 2, this, arguments, new.target); }
function giPlusShare() {
var p = GI.mine && GI.mine.plus;
if (!p || !p.code || !navigator.share)
return giPlusCopy();
navigator.share({ title: "A Golden Invitation +1 to SomnuMatrix", text: "You are my +1 on a Golden Invitation to SomnuMatrix. Your code: " + giShow(p.code), url: giPlusLink(p.code) }).catch(function () { });
}
function giWhen(at) { try {
return new Date(at).toLocaleString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" });
}
catch (e) {
return String(at);
} }
function giGatherHtml(g) { return __ZC(288, 3, this, arguments, new.target); }
function giWayToHall() { return __ZC(288, 4, this, arguments, new.target); }
setInterval(function () {
try {
if (!GI.toHall || typeof WLD === "undefined" || WLD.on !== "party" || typeof ppShowWay !== "function") {
GI.hallWait = 0;
return;
}
if (++GI.hallWait < 2)
return;
GI.toHall = false;
GI.hallWait = 0;
if (typeof PP === "undefined" || !PP.guide)
ppShowWay("hall");
}
catch (e) { }
}, 1000);
function giRedeem() { return __ZC(288, 5, this, arguments, new.target); }
function giLoadMine() {
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve(null);
return cityRpc("my_invitation").then(function (o) { GI.gather = o && o.gathering || null; if (o && o.no)
GI.mine = { no: o.no, at: o.at, gathering: GI.gather, fresh: GI.mine && GI.mine.fresh, plusOf: o.plus_one_of || null, plus: o.plus_one || null }; return GI.mine; }).catch(function () { return null; });
}
(function () {
var tries = 0, wasIn = false;
function tick() {
tries++;
var inn = typeof signedIn === "function" && signedIn();
if (inn && !wasIn) {
wasIn = true;
giLoadMine();
}
if (!inn)
wasIn = false;
var c = giKept();
if (c && !GI.busy && document.body && typeof cityRpc === "function") {
if (inn && GI.mine) {
giKeep("");
}
else if (inn && GI.tried !== c) {
GI.tried = c;
GI.code = c;
if (!GI.open)
giOpen();
giRedeem();
}
else if (!inn && !GI.asked && tries > 4) {
GI.asked = 1;
GI.code = c;
giOpen();
}
}
setTimeout(tick, tries < 40 ? 1500 : 6000);
}
setTimeout(tick, 2500);
})();
(function () {
if (typeof bkpHtml !== "function")
return;
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments), x = "";
try {
if (GI.mine && GI.mine.no)
x = '<div style="margin:8px 0 2px;padding:8px 10px;border:1px solid #8C6A26;border-radius:6px;background:linear-gradient(90deg,rgba(217,180,90,.14),rgba(217,180,90,.04))">' +
'🎟️ <b style="color:#E8C977">' + (GI.mine.plusOf ? 'Golden Invitation +1, guest of No. ' + GI.mine.no : 'Golden Invitation, No. ' + GI.mine.no + ' of 20') + '</b> <button class="btn" data-bkgi="1" style="float:right">Look</button></div>';
else if (typeof signedIn === "function" && signedIn())
x = '<div style="margin:8px 0 2px;color:var(--dim,#999);font-size:12px">🎟️ Holding a Golden Invitation? <button class="btn" data-bkgi="1">Open it</button></div>';
}
catch (e) { }
return x + h;
};
document.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-bkgi]") : null;
if (!t)
return;
e.stopPropagation();
if (typeof bkpClose === "function")
bkpClose();
giOpen();
}, true);
if (typeof bkpLoad === "function") {
var bl = bkpLoad;
bkpLoad = function () { var r = bl.apply(this, arguments); giLoadMine().then(function (m) { if (m && typeof BKP !== "undefined" && BKP.open)
bkpPaint(); }); return r; };
}
})();
function giDeskPlus(r) { return __ZC(288, 6, this, arguments, new.target); }
function giDeskPane(pane) { return __ZC(288, 7, this, arguments, new.target); }
(function () {
if (typeof drawDesk === "function") {
var dd = drawDesk;
drawDesk = function (body) {
var r = dd.apply(this, arguments);
try {
if (typeof amKeeper === "function" && amKeeper() && body && !body.querySelector('[data-kd="invites"]')) {
var any = body.querySelectorAll("[data-kd]"), last = any[any.length - 1];
if (last && last.parentNode) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kd", "invites");
b.textContent = "🎟️ Golden Invitations";
b.onclick = function () { deskPane("invites"); };
last.parentNode.appendChild(b);
}
}
}
catch (e) { }
return r;
};
}
if (typeof deskPane === "function") {
var dp = deskPane;
deskPane = function (which) {
if (which === "invites") {
var pane = document.getElementById("kd-pane");
if (pane)
giDeskPane(pane);
return;
}
return dp.apply(this, arguments);
};
}
})();
var GIH = { place: null, at: 0, busy: false, list: [], meshes: {}, t: 0, near: null };
function giWhere() {
try {
if (typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && !(typeof WLD !== "undefined" && WLD.on))
return "in:" + store.inside;
if (typeof dkWhere === "function")
return dkWhere();
}
catch (e) { }
return null;
}
function giBase() {
try {
if (typeof WLD !== "undefined" && WLD.on)
return (WLD.w && typeof WLD.w.base === "number") ? WLD.w.base : 0;
if (typeof store !== "undefined" && store.inside)
return 0;
if ((typeof MALL !== "undefined" && MALL.on) || (typeof UG2 !== "undefined" && UG2.on))
return 0;
if (typeof store !== "undefined" && store.here && typeof REALM_GAP !== "undefined")
return store.here * REALM_GAP;
}
catch (e) { }
return 0;
}
function giHereName() { return __ZC(288, 8, this, arguments, new.target); }
function giAsk(name, args) {
if (typeof signedIn === "function" && signedIn())
return cityRpc(name, args);
if (typeof rpc !== "function")
return Promise.reject(new Error("offline"));
return rpc(name, args).then(function (r) { return r.ok ? r.json() : null; });
}
function giHiddenLoad(place) {
if (GIH.busy)
return;
GIH.busy = true;
giAsk("invite_hidden", { p_place: place }).then(function (rows) {
GIH.busy = false;
GIH.at = Date.now();
if (GIH.place !== place)
return;
GIH.list = Array.isArray(rows) ? rows : [];
}).catch(function () { GIH.busy = false; GIH.at = Date.now(); GIH.list = []; });
}
function giTicketMesh(no) { return __ZC(288, 9, this, arguments, new.target); }
function giClearMeshes() { Object.keys(GIH.meshes).forEach(function (k) { var m = GIH.meshes[k]; if (m && m.parent)
m.parent.remove(m); }); GIH.meshes = {}; }
function giHereTick(dt) {
var place = giWhere();
if (place !== GIH.place) {
GIH.place = place;
GIH.list = [];
GIH.at = 0;
giClearMeshes();
}
if (!place || typeof THREE === "undefined" || typeof scene === "undefined")
return null;
var keeper = typeof amKeeper === "function" && amKeeper();
if (GI.mine && GI.mine.no && !keeper) {
if (GIH.list.length) {
GIH.list = [];
giClearMeshes();
}
return null;
}
if (!GIH.busy && (!GIH.at || Date.now() - GIH.at > 20000))
giHiddenLoad(place);
var base = giBase(), P = camera.position, feet = P.y - 1.72, seen = {}, best = null;
if (typeof WLD !== "undefined" && WLD.on)
GIH.t += dt || 0;
GIH.list.forEach(function (h) {
var k = String(h.no);
seen[k] = 1;
var m = GIH.meshes[k];
if (!m) {
m = giTicketMesh(h.no);
GIH.meshes[k] = m;
scene.add(m);
}
m.userData.h = h;
m.userData.base = base;
m.position.set(base + h.x, h.y + 1.3 + Math.sin(GIH.t * 1.1 + h.no) * 0.08, h.z);
if (m.userData.card)
m.userData.card.rotation.y = GIH.t * 0.6 + h.no;
var d = Math.hypot(P.x - (base + h.x), P.z - h.z);
if (!best && d < 2.6 && Math.abs(feet - h.y) < 3) {
var mine = typeof amKeeper === "function" && amKeeper();
best = mine ? { html: "🎟️ <b>Golden Invitation No. " + h.no + "</b>, hidden by you · <b>press E</b> to take it back", fn: function () { giUnhide(h.no); } }
: { html: "🎟️ <b>A Golden Invitation!</b> · <b>press E</b> to take it", fn: function () { giFind(h.no); } };
}
});
Object.keys(GIH.meshes).forEach(function (k) { if (!seen[k]) {
var m = GIH.meshes[k];
if (m && m.parent)
m.parent.remove(m);
delete GIH.meshes[k];
} });
return best;
}
function giFind(no) { return __ZC(288, 10, this, arguments, new.target); }
function giUnhide(no) { return __ZC(288, 11, this, arguments, new.target); }
setInterval(function () {
try {
if (typeof WLD !== "undefined" && WLD.on)
return;
var ks = Object.keys(GIH.meshes);
if (!ks.length)
return;
GIH.t += 0.05;
ks.forEach(function (k) {
var m = GIH.meshes[k], h = m && m.userData.h;
if (!h)
return;
m.position.y = h.y + 1.3 + Math.sin(GIH.t * 1.1 + h.no) * 0.08;
if (m.userData.card)
m.userData.card.rotation.y = GIH.t * 0.6 + h.no;
});
}
catch (e) { }
}, 50);
function giHideHere(no) { return __ZC(288, 12, this, arguments, new.target); }
function giPlaceName(k) { try {
if (typeof dkPlaceName === "function")
return dkPlaceName(k);
}
catch (e) { } return k; }
(function () {
if (typeof dkHere !== "function")
return;
var dh = dkHere;
dkHere = function (dt) {
var b = dh.apply(this, arguments);
try {
var g = giHereTick(dt || 0);
if (!b && g)
b = g;
}
catch (e) {
if (window.console && !GIH.warned) {
GIH.warned = 1;
console.warn("[invitations]", e);
}
}
return b;
};
})();
function giKeeperHidePaint() { return __ZC(288, 13, this, arguments, new.target); }
(function () {
if (typeof giPaint !== "function")
return;
var gp = giPaint;
giPaint = function () {
var r = gp.apply(this, arguments);
try {
var el = document.getElementById("gi-box");
if (GI.open && GI.hideMode && el && typeof amKeeper === "function" && amKeeper()) {
var inn = el.querySelector(".gi-in");
inn.innerHTML = giMotes() + '<div class="gi-sub">The Keeper</div><h3>Hide a Golden Invitation</h3>' +
'<p style="text-align:center">It will float here, where you stand' + (giWhere() ? ', <b>' + esc(giHereName()) + '</b>' : '') + ', until someone finds it. The first to reach it and press E opens it.</p>' +
'<div class="gi-row" id="gi-hide-list"></div>' +
'<div class="gi-row"><button class="btn" data-gi="close">Close</button></div>';
giKeeperHidePaint();
}
}
catch (e) { }
return r;
};
var go = giOpen;
giOpen = function () { GI.hideMode = !!GI.hideNext; GI.hideNext = false; return go.apply(this, arguments); };
})();
(function () {
if (typeof bkpHtml !== "function")
return;
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments);
try {
if (typeof amKeeper === "function" && amKeeper())
h = '<div style="margin:8px 0 2px;font-size:12px;color:var(--dim,#999)">🎟️ Keeper: <button class="btn" data-bkgih="1">Hide a Golden Invitation here</button></div>' + h;
}
catch (e) { }
return h;
};
document.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-bkgih]") : null;
if (!t)
return;
e.stopPropagation();
if (typeof bkpClose === "function")
bkpClose();
GI.hideNext = true;
giOpen();
}, true);
})();
