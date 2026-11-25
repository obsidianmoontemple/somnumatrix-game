/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var HG = { st: null, at: 0, busy: null, missing: false, find: "", found: null, msg: "", view: "home", kc: null, kcHome: null, kcName: "", kcAt: 0, goods: null, goodsAt: 0 };
function hgSigned() { return typeof signedIn === "function" && signedIn(); }
function hgKeeper() { return typeof amKeeper === "function" && !!amKeeper(); }
function hgMe() { try {
return (typeof session !== "undefined" && session && session.user && session.user.id) || "";
}
catch (e) {
return "";
} }
function hgEsc(s) { return typeof esc === "function" ? esc(s) : String(s == null ? "" : s); }
function hgMissing(e) { var m = String((e && e.message) || e || ""); return (typeof rpcMissing === "function" && rpcMissing(e)) || /does not exist|Could not find the function|PGRST202/.test(m); }
function hgErr(e) { return hgMissing(e) ? "Guests and kitchens open soon." : "Couldn't reach the city."; }
function hgLoad(force) {
if (!hgSigned())
return Promise.resolve(null);
if (HG.busy)
return HG.busy;
if (!force && HG.st && Date.now() - HG.at < 30000)
return Promise.resolve(HG.st);
HG.busy = cityRpc("home_guests_state", {}).then(function (o) { HG.busy = null; HG.at = Date.now(); if (o && o.ok) {
HG.st = o;
HG.missing = false;
} return HG.st; })
.catch(function (e) { HG.busy = null; HG.at = Date.now(); if (hgMissing(e))
HG.missing = true; return HG.st; });
return HG.busy;
}
function hgGuestAt(name, world) {
var S = HG.st;
if (!S || !S.guest_of)
return false;
world = world || "somnucor";
return S.guest_of.some(function (g) { return (g.homes || []).some(function (h) { return h.name === name && (h.world || "somnucor") === world; }); });
}
function hgGuestBundle(owner, key) {
var S = HG.st;
if (!S || !S.guest_of || !owner)
return false;
return S.guest_of.some(function (g) { return g.host === owner && (g.bundles || []).indexOf(key) >= 0; });
}
(function () {
if (typeof hlOpen !== "function")
return;
var ho = hlOpen;
hlOpen = function (name, world) {
if (ho.apply(this, arguments))
return true;
try {
if (hgSigned()) {
hgLoad(false);
return hgGuestAt(name, world);
}
}
catch (e) { }
return false;
};
})();
(function () {
if (typeof bdlMayEnter !== "function")
return;
var bm = bdlMayEnter;
bdlMayEnter = function (h) {
if (bm.apply(this, arguments))
return true;
try {
if (h && h.owner && h.D && hgSigned()) {
hgLoad(false);
return hgGuestBundle(h.owner, h.D.key);
}
}
catch (e) { }
return false;
};
})();
function hgKnock(args, label) {
if (!hgSigned()) {
setStatus("Sign in first.");
return;
}
cityRpc("home_knock", args).then(function (o) { setStatus(hgEsc((o && o.say) || "You knock.")); })
.catch(function (e) { setStatus(hgEsc(hgMissing(e) ? "You knock. Nobody answers yet." : "Couldn't reach the city.")); });
}
(function () {
if (typeof hlLocked !== "function")
return;
var hk = hlLocked;
hlLocked = function (name, world) {
var before = typeof HL !== "undefined" ? HL.said : 0, r = null;
hk.apply(this, arguments);
try {
if (typeof HL === "undefined" || HL.said === before)
return;
r = typeof hlRow === "function" ? hlRow(name, world) : null;
var el = document.getElementById("hl-card");
if (!el || !r || !r.held || !hgSigned())
return;
var row = el.querySelector("[data-h='close']");
if (!row || !row.parentNode)
return;
var b = document.createElement("button");
b.setAttribute("data-h", "knock");
b.style.cssText = PH_BTN;
b.textContent = "✊ Knock";
b.onclick = function (ev) { ev.stopPropagation(); el.style.display = "none"; hgKnock({ p_lot: r.id, p_host: null, p_place: null }); };
row.parentNode.insertBefore(b, row);
var line = document.createElement("div");
line.style.cssText = "margin:3px 0;opacity:.85";
line.textContent = "Knock, and whoever lives here gets a message on their phone and can let you in.";
row.parentNode.parentNode.insertBefore(line, row.parentNode);
}
catch (e) { }
};
})();
function hgBundleKnock(h) {
if (!h || !h.owner || h.owner === hgMe())
return;
hgKnock({ p_lot: null, p_host: h.owner, p_place: (h.D && h.D.house) || null });
}
function hgUntil(t) {
if (!t)
return "any time";
var ms = Date.parse(t) - Date.now();
if (!(ms > 0))
return "ended";
var h = Math.floor(ms / 3600000), m = Math.round((ms % 3600000) / 60000);
return "for " + (h ? h + " h " : "") + (m ? m + " min" : "") + " more";
}
var HG_BOX = "position:fixed;left:50%;top:8%;transform:translateX(-50%);z-index:60;width:min(460px,calc(100vw - 32px));max-height:82vh;overflow-y:auto;background:rgba(12,10,22,.97);color:var(--bone,#EDE8F8);border:1px solid #8A7A4A;border-radius:8px;padding:14px 16px;font:14px/1.5 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.6)";
function hgBox() { return __ZC(388, 0, this, arguments, new.target); }
function hgClose() { var el = document.getElementById("hg-box"); if (el)
el.style.display = "none"; HG.view = "home"; }
function hgOpenNow() { var el = document.getElementById("hg-box"); return !!(el && el.style.display !== "none"); }
function hgB(act, label, extra, two) { return "<button data-hg='" + act + "'" + (extra || "") + " style='" + (two ? PH_BTN2 : PH_BTN) + ";margin:3px 4px 3px 0'>" + label + "</button>"; }
function hgHead(t, sub) { return __ZC(388, 1, this, arguments, new.target); }
function hgSec(t) { return "<div style='font:600 14px Georgia,serif;color:#E8C66A;margin:12px 0 4px;border-top:1px solid rgba(232,198,106,.25);padding-top:8px'>" + t + "</div>"; }
function hgOpen() {
if (!hgSigned()) {
setStatus("Sign in, and a home of your own opens to you.");
return;
}
HG.view = "home";
HG.msg = "";
hgBox().style.display = "block";
hgPaint();
hgLoad(true).then(hgPaint);
if (typeof kcLoad === "function")
kcLoad(kcWhere()).then(hgPaint);
}
function hgPaint() { return __ZC(388, 2, this, arguments, new.target); }
function hgFind() { return __ZC(388, 3, this, arguments, new.target); }
function hgDo(name, args) {
cityRpc(name, args).then(function (o) { HG.msg = hgEsc((o && o.say) || "Done."); return hgLoad(true); }).then(hgPaint)
.catch(function (e) { HG.msg = hgEsc(hgErr(e)); hgPaint(); });
}
function hgClick(ev) { return __ZC(388, 4, this, arguments, new.target); }
(function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-homeguests"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-homeguests";
b.title = "Let folks into your home, and stock your kitchen";
b.textContent = "🏠 Guests and kitchen";
b.onclick = function () { hgOpen(); };
var pk = document.getElementById("me-homex");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
})();
try {
if (typeof PS_SECTIONS !== "undefined") {
var hgShop = PS_SECTIONS.filter(function (s) { return s.k === "shop"; })[0];
if (hgShop && hgShop.ids.indexOf("me-homeguests") < 0) {
var hi = hgShop.ids.indexOf("me-homex");
hgShop.ids.splice(hi >= 0 ? hi + 1 : hgShop.ids.length, 0, "me-homeguests");
}
}
}
catch (e) { }
setInterval(function () { try {
if (hgSigned() && !document.hidden)
hgLoad(false);
}
catch (e) { } }, 30000);
var KC_FURN = /^(es|gp|wg|vc)?(kitchen(fridge|fridgebuiltin|fridgelarge|fridgesmall|stove|stoveelectric|oven|ovenlarge|cabinet|cabinetdrawer|cabinetupper|cabinetupperdouble|cabinetcornerround|sink|bar|microwave)|fridge|stove|oven|range|aga|cooker|icebox|larder|pantry|island|butcherblock|dresser)$/;
var KC_KEEPS = { fridge: "🧊 The fridge", freezer: "❄️ The freezer", cupboard: "🗄️ The cupboards" };
function kcFurn(k) {
if (!k)
return false;
var n = String(k).replace(/^hwup_\d+_/, ""), m = /^(?:sg_)?[a-z]{2}_([a-z0-9]+)(_[a-z0-9]+)?$/.exec(n);
if (m)
n = m[1];
return KC_FURN.test(n);
}
function kcLotId(name, world) {
var r = typeof hlRow === "function" ? hlRow(name, world) : null;
if (r && r.id != null)
return +r.id;
var id = null;
try {
(typeof standing !== "undefined" && standing && standing.lots || []).forEach(function (l) { if (id == null && l.lot === name && l.lot_id != null)
id = +l.lot_id; });
}
catch (e) { }
return id;
}
function kcWhere() { return __ZC(388, 5, this, arguments, new.target); }
function kcLoad(where) { return __ZC(388, 6, this, arguments, new.target); }
function kcOpen(bagOnly) {
if (!hgSigned()) {
setStatus("Sign in first.");
return;
}
var w = bagOnly ? null : kcWhere();
HG.view = "kitchen";
HG.msg = "";
HG.kcBag = !!bagOnly || !w;
hgBox().style.display = "block";
HG.kc = HG.kc || null;
kcPaint();
kcLoad(w).then(kcPaint);
}
function kcFx(it) { var f = []; if (it.food)
f.push("food +" + it.food); if (it.drink)
f.push("drink +" + it.drink); return f.join(" · "); }
function kcVerb(it) { return it.verb === "drink" ? "Drink" : it.verb === "make" ? (/coffee/.test(it.serving) ? "Make coffee" : "Make tea") : "Eat"; }
function kcPaint() { return __ZC(388, 7, this, arguments, new.target); }
var KC_ING = { g_eggs: "eggs", g_loaf: "bread", g_butter: "butter", g_bacon: "bacon", g_sausages: "sausages", g_beans: "baked beans", g_flour: "flour", g_milk: "milk", g_honey: "honey", g_pasta: "pasta", g_mince: "minced beef",
g_veg: "vegetables", g_chicken: "chicken", g_potatoes: "potatoes", g_rice: "rice", g_cheese: "cheese", g_pizza: "a frozen pizza", g_ham: "ham", g_peas: "frozen peas" };
function kcGot(o) {
if (!o)
return;
if (o.stock && HG.kc)
HG.kc.stock = o.stock;
if (o.bag && HG.kc)
HG.kc.bag = o.bag;
if (o.food != null && typeof needsGot === "function")
try {
needsGot(Object.assign({ events: [] }, o));
}
catch (e) { }
HG.msg = hgEsc(o.say || "");
kcPaint();
}
function kcDo(name, args) {
cityRpc(name, args).then(function (o) { kcGot(o); if (o && o.ok !== false && typeof playTone === "function")
try {
playTone(392, 0.12);
}
catch (e) { } })
.catch(function (e) { HG.msg = hgEsc(hgErr(e)); kcPaint(); });
}
function kcClick(a, t) { return __ZC(388, 8, this, arguments, new.target); }
function kcNear() {
if (typeof fnInside !== "function" || !fnInside())
return false;
var P = camera.position, lv = (INT.level || 0), fy = lv * (INT.floor || 4), hit = false;
INT.root.children.forEach(function (c) {
if (hit || !c.userData || !kcFurn(c.userData.furn))
return;
if (Math.abs(c.position.y - fy) > 1)
return;
if (Math.hypot(P.x - (INT.ox + c.position.x), P.z - (INT.oz + c.position.z)) < 1.9)
hit = true;
});
return hit;
}
var KC_AT = { t: 0, w: null };
(function () {
if (typeof tsTick !== "function")
return;
var tt = tsTick;
tsTick = function () {
try {
if (typeof tsPrompt === "function" && hgSigned() && !(typeof WLD !== "undefined" && WLD && WLD.on) && kcNear()) {
var now = Date.now();
if (now - KC_AT.t > 1500) {
KC_AT.t = now;
KC_AT.w = kcWhere();
}
var w = KC_AT.w;
if (w && (w.home.indexOf("lot:") !== 0 || (typeof fnHomeHere === "function" && fnHomeHere()) || hgKeeper())) {
tsPrompt("<b>The kitchen</b> · <b>press E</b> (or tap here) for the fridge, the cupboards and the stove", function () { kcOpen(); });
return;
}
}
}
catch (e) { }
return tt.apply(this, arguments);
};
})();
function kcGoods() { return __ZC(388, 9, this, arguments, new.target); }
(function () {
if (typeof needsMenuHtml !== "function" || typeof needsMenuFns !== "function")
return;
var mh = needsMenuHtml, mf = needsMenuFns;
needsMenuHtml = function (k, menu, msg) {
var h = mh.apply(this, arguments);
try {
if (!HG.goods) {
kcGoods().then(function () { if (typeof NEEDS !== "undefined" && NEEDS.open === k && HG.goods.length)
needsMenu(k, msg); });
return h;
}
var L = HG.goods.filter(function (g) { return g.place === k; });
if (!L.length)
return h;
h += "<div style='font:600 14px var(--serif,Georgia);color:#E8C66A;margin:10px 0 2px'>🛍️ For your kitchen at home</div>" +
"<div style='opacity:.75;font-size:11.5px;margin-bottom:2px'>Into your shopping bag; put it away in your kitchen at home (Menu, then Guests and kitchen).</div>";
L.forEach(function (g) {
var fx = [];
if (g.food)
fx.push("food +" + g.food);
if (g.drink)
fx.push("drink +" + g.drink);
h += worldBtn("gro:" + g.item, hgEsc(g.name) + " · " + g.price + " gold", g.servings + " × " + hgEsc(g.serving) + (g.raw ? " (for cooking)" : fx.length ? " (" + fx.join(", ") + " each)" : "") + " · " + (g.keeps === "fridge" ? "keeps in the fridge" : g.keeps === "freezer" ? "keeps in the freezer" : "keeps in the cupboard"));
});
}
catch (e) { }
return h;
};
needsMenuFns = function (k, menu) {
var f = mf.apply(this, arguments);
try {
(HG.goods || []).forEach(function (g) { if (g.place === k)
f["gro:" + g.item] = function () { kcBuy(k, g); }; });
}
catch (e) { }
return f;
};
})();
function kcBuy(k, g) { return __ZC(388, 10, this, arguments, new.target); }
