/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BZS = { pub: [], at: 0, busy: false, shops: {}, goods: {}, near: null, inside: {}, board: null, boardAt: 0, open: false, msg: "", form: null, away: false };
var BZS_SELLS = /shopkeeper|assistant/i;
function bzsLoad(force) {
if (BZS.busy || (!force && Date.now() - BZS.at < 180000))
return;
if (!(typeof signedIn === "function" && signedIn()) || typeof cityRpc !== "function")
return;
BZS.busy = true;
BZS.at = Date.now();
cityRpc("business_fronts_public", {}).then(function (L) { BZS.busy = false; BZS.pub = Array.isArray(L) ? L : []; bzsTemps(); })
.catch(function () { BZS.busy = false; BZS.pub = []; bzsTemps(); });
}
function bzsPlot(name) {
var P = (typeof lotPlots === "function") ? lotPlots() : (store.plots || []);
for (var i = 0; i < P.length; i++)
if (P[i].name === name)
return P[i];
return null;
}
function bzsTemp(S, h, k, pl) {
var id = "bz" + h.id, f = h.sex === "f";
var t = { id: id, bz: { hand: h, shop: S }, post: { job: id, title: h.role, workplace: S.lot, panel: null, roams: false, k: k },
name: h.name, f: f, seed: (typeof hash === "function" ? hash(id + "|" + h.name) : h.id * 7919), mode: "desk", stops: null, home: { x: pl.x, z: pl.z, id: pl.homeId } };
return t;
}
function bzsTemps() {
if (typeof TEMPS === "undefined")
return;
var mine = [], seen = {};
BZS.shops = {};
BZS.pub.forEach(function (S) {
BZS.shops[S.shop] = S;
var pl = bzsPlot(S.lot);
if (!pl || !pl.homeId)
return;
(S.hands || []).forEach(function (h, k) { var t = bzsTemp(S, h, k, pl); seen[t.id] = 1; mine.push(t); });
});
var keep = TEMPS.list.filter(function (t) { return !t.bz; });
mine = mine.map(function (t) {
var old = TEMPS.list.filter(function (q) { return q.id === t.id; })[0];
if (old && old.bz && old.name === t.name && old.post.workplace === t.post.workplace) {
old.bz = t.bz;
return old;
}
return t;
});
Object.keys(TEMPS.shown || {}).forEach(function (id) { if (/^bz/.test(id) && !seen[id] && typeof tempHide === "function")
tempHide(id); });
TEMPS.list = keep.concat(mine);
BZS.mine = mine;
BZS.need = 0;
BZS.pub.forEach(function (S) { BZS.need += (S.hands || []).length; });
}
(function () {
if (typeof tempsPlan !== "function")
return;
var tp = tempsPlan;
tempsPlan = function () { var r = tp.apply(this, arguments); try {
bzsTemps();
}
catch (e) {
if (window.console)
console.warn("[biz-staff]", e);
} return r; };
})();
function bzsOpenNow(S) {
var h = (typeof cityHourNow === "function") ? cityHourNow() : 12, a = +S.open_h, b = +S.close_h;
return a < b ? (h >= a && h < b) : (h >= a || h < b);
}
(function () {
if (typeof tempOnShift !== "function")
return;
var ts = tempOnShift;
tempOnShift = function (t) {
if (t && t.bz) {
var open = bzsOpenNow(t.bz.shop);
return /guard/i.test(t.post.title) ? !open : open;
}
return ts.apply(this, arguments);
};
})();
(function () {
if (typeof tempIndoors !== "function")
return;
var ti = tempIndoors;
tempIndoors = function (t) { if (t && t.bz)
return false; return ti.apply(this, arguments); };
})();
(function () {
if (typeof tempLook !== "function")
return;
var tl = tempLook;
tempLook = function (t) {
var L = tl.apply(this, arguments);
if (t && t.bz) {
var a = +t.bz.hand.age || 30;
if (a >= 60)
L.hair = 0xB8B4AE;
else if (a >= 50 && (t.seed % 3 === 0))
L.hair = 0x8E8C88;
if (/guard/i.test(t.post.title)) {
L.top = 0x23324E;
L.bottom = 0x1E2638;
L.gear = "belt";
}
else if (/cleaner/i.test(t.post.title)) {
L.gear = "none";
L.top = 0x6E8A9A;
}
else {
L.gear = "vestbelt";
L.gearColor = 0x4A3A2A;
}
}
return L;
};
})();
function bzsShopHere() {
if (!store.inside || typeof INT === "undefined" || !INT || !INT.spec)
return null;
var id = INT.spec.id, out = null;
BZS.pub.forEach(function (S) { var pl = bzsPlot(S.lot); if (pl && pl.homeId === id)
out = S; });
return out;
}
function bzsInside() { return __ZC(436, 0, this, arguments, new.target); }
(function () {
if (typeof bringOccupants !== "function")
return;
var bo = bringOccupants;
bringOccupants = function () { bo.apply(this, arguments); try {
bzsInside();
}
catch (e) {
if (window.console)
console.warn("[biz-staff] inside:", e);
} };
})();
function bzsNearest() {
if (typeof walkMode === "undefined" || !walkMode || !BZS.mine || !BZS.mine.length)
return null;
if (typeof talkOpen !== "undefined" && talkOpen)
return null;
var P = camera.position, best = null, bd = 3.6;
if (store.inside) {
if (!INT || !INT.bzf)
return null;
Object.keys(INT.bzf).forEach(function (id) {
var g = INT.bzf[id];
if (!g || !g.parent)
return;
var d = Math.hypot(P.x - ((INT.ox || 0) + g.position.x), P.z - ((INT.oz || 0) + g.position.z));
if (d < bd) {
bd = d;
best = id;
}
});
}
else {
var T = Date.now() / 1000;
Object.keys(TEMPS.shown || {}).forEach(function (id) {
if (!/^bz/.test(id))
return;
var S = TEMPS.shown[id];
if (!S || !S.g)
return;
var d = Math.hypot(P.x - S.g.position.x, P.z - S.g.position.z);
if (d < bd) {
bd = d;
best = id;
}
});
}
if (!best)
return null;
return BZS.mine.filter(function (t) { return t.id === best; })[0] || null;
}
function bzsGoods(shop) { return __ZC(436, 1, this, arguments, new.target); }
function bzsPersona(t, goods) { return __ZC(436, 2, this, arguments, new.target); }
function bzsTalk(t) { return __ZC(436, 3, this, arguments, new.target); }
function bzsTalkPaint() {
var el = (typeof cfxBtn === "function") ? cfxBtn("bzs-talk", "left:50%;transform:translateX(-50%);bottom:calc(320px + env(safe-area-inset-bottom,0px));border-color:#C9A86A", function () { bzsTalk(BZS.near || (Date.now() - (BZS.lastAt || 0) < 2500 ? BZS.last : null)); }) : null;
if (!el)
return;
BZS.near = bzsNearest();
if (BZS.near) {
BZS.last = BZS.near;
BZS.lastAt = Date.now();
}
var show = !!BZS.near || (!!BZS.last && Date.now() - (BZS.lastAt || 0) < 1200 && !(typeof talkOpen !== "undefined" && talkOpen));
el.style.display = show ? "block" : "none";
if (BZS.near) {
var t = "💬 Talk to " + BZS.near.name.split(" ")[0] + " · " + BZS.near.post.title;
if (el.textContent !== t)
el.textContent = t;
}
}
if (typeof PS_KEEP !== "undefined")
PS_KEEP["bzs-talk"] = 1;
addEventListener("keydown", function (e) {
if (e.code !== "KeyT" || !BZS.near)
return;
if (typeof WG !== "undefined" && WG && WG.near)
return;
if (document.activeElement && /TEXTAREA|INPUT|SELECT/.test(document.activeElement.tagName))
return;
if (typeof talkOpen !== "undefined" && talkOpen)
return;
e.preventDefault();
bzsTalk(BZS.near);
});
(function () {
var def = { tag: "SHELVES", label: "🛍️ The shelves", hint: "opens this shop's shelves so the dreamer can buy (it goes to their backpack)",
when: function (ctx) { return !!(ctx && ctx.c && ctx.c.bzShop) && BZS_SELLS.test(ctx.title || ""); },
run: function (ctx) { var s = ctx.c.bzShop; setTimeout(function () { bzsShopOpen(s); }, 400); return { ok: true }; } };
if (typeof staffDeedAdd === "function")
staffDeedAdd(def);
else {
window.SD_PENDING = window.SD_PENDING || [];
window.SD_PENDING.push(def);
}
})();
setInterval(function () {
try {
var inCity = typeof inCityNow === "function" && inCityNow();
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null, here = r && (store.here || 0) === r.id;
if (inCity || (here && store.inside))
bzsLoad(false);
if (BZS.need && (BZS.mine || []).length < BZS.need) {
BZS.reAt = (BZS.reAt || 0) + 1;
if (BZS.reAt >= 10) {
BZS.reAt = 0;
bzsTemps();
}
}
if (here && store.inside) {
BZS.inAt = (BZS.inAt || 0) + 1;
if (BZS.inAt >= 5) {
BZS.inAt = 0;
bzsInside();
}
}
bzsTalkPaint();
}
catch (e) {
if (window.console)
console.warn("[biz-staff]", e);
}
}, 300);
"use strict";
var BZS_BOX = "position:fixed;right:12px;bottom:calc(140px + env(safe-area-inset-bottom,0px));z-index:46;width:min(480px,calc(100vw - 24px));max-height:min(74vh,660px);overflow:auto;background:rgba(8,10,16,.96);border:1px solid #C9A86A;border-radius:4px;padding:12px 14px;color:var(--bone,#EDE8F8);font:13px var(--sans,system-ui,sans-serif);box-sizing:border-box";
function bzsEl(id) {
var el = document.getElementById(id);
if (!el && document.body) {
el = document.createElement("div");
el.id = id;
el.style.cssText = BZS_BOX;
el.style.display = "none";
document.body.appendChild(el);
el.addEventListener("click", bzsClick);
}
return el;
}
function bzsDim(t) { return '<span style="color:var(--dim,#9AA3B5)">' + t + '</span>'; }
function bzsG(n) { return Number(n || 0).toLocaleString() + " gold"; }
function bzsWhen(t) { try {
var d = new Date(t), m = Math.round((Date.now() - d.getTime()) / 60000);
return m < 60 ? m + " min ago" : m < 1440 ? Math.round(m / 60) + " h ago" : d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
}
catch (e) {
return "";
} }
var BZS_SHOP = { id: 0, list: null, msg: "" };
function bzsShopOpen(shop) {
BZS_SHOP.id = shop;
BZS_SHOP.list = null;
BZS_SHOP.msg = "";
bzsShopPaint();
delete BZS.goods[shop];
bzsGoods(shop).then(function (L) { BZS_SHOP.list = L; bzsShopPaint(); });
}
function bzsShopPaint() { return __ZC(436, 4, this, arguments, new.target); }
function bzsBoard(force) { return __ZC(436, 5, this, arguments, new.target); }
function bzsOpen() { BZS.open = true; BZS.msg = ""; bzsPaint(); bzsBoard(true); }
function bzsClose() { BZS.open = false; BZS.form = null; var el = document.getElementById("bzs-panel"); if (el)
el.style.display = "none"; }
function bzsRoleOpts(B, pick) { return (B.roles || []).map(function (r) { return '<option value="' + esc(r.role) + '"' + (r.role === pick ? " selected" : "") + '>' + esc(r.role) + ' (from ' + r.min_wage + ' a day)</option>'; }).join(""); }
function bzsHours(n) { var o = ""; for (var i = 0; i <= 24; i++)
o += '<option value="' + i + '"' + (i === +n ? " selected" : "") + '>' + (i < 10 ? "0" : "") + i + ':00</option>'; return o; }
function bzsPaint() { return __ZC(436, 6, this, arguments, new.target); }
function bzsVal(id) { var x = document.getElementById(id); return x ? String(x.value || "").trim() : ""; }
function bzsSay(p, after) {
BZS.msg = "…";
bzsPaint();
return p.then(function (o) { BZS.msg = (o && o.say) || (o && o.ok ? "Done." : "That did not go through."); if (after)
after(o); bzsBoard(true); BZS.at = 0; bzsLoad(true); return o; })
.catch(function (e) { BZS.msg = String((e && e.message) || e); bzsPaint(); });
}
function bzsClick(e) { return __ZC(436, 7, this, arguments, new.target); }
function bzsAwayNote(b) { return __ZC(436, 8, this, arguments, new.target); }
setTimeout(function look() {
try {
if (typeof signedIn === "function" && signedIn() && typeof standing !== "undefined" && standing && (standing.business || []).length)
bzsBoard(true);
else if (!BZS.away)
return setTimeout(look, 30000);
}
catch (e) { }
}, 25000);
(function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-biz"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-biz";
b.title = "Your own shop: where it stands, its staff and what they sold";
b.textContent = "🏪 My shop";
b.onclick = function () { BZS.open ? bzsClose() : bzsOpen(); };
bar.appendChild(b);
})();
try {
if (typeof PS_SECTIONS !== "undefined") {
var bzsSec = PS_SECTIONS.filter(function (s) { return s.k === "work"; })[0];
if (bzsSec && bzsSec.ids.indexOf("me-biz") < 0)
bzsSec.ids.push("me-biz");
}
}
catch (e) { }
addEventListener("keydown", function (e) { if (e.key !== "Escape")
return; if (BZS_SHOP.id) {
BZS_SHOP.id = 0;
bzsShopPaint();
}
else if (BZS.open)
bzsClose(); });
if (typeof backRegister === "function") {
backRegister({ order: 1, open: function () { return !!BZS_SHOP.id; }, close: function () { BZS_SHOP.id = 0; bzsShopPaint(); } });
backRegister({ order: 1, open: function () { return BZS.open; }, close: bzsClose });
}
