/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(388, function () {
return [
function () {
var el = document.getElementById("hg-box");
if (!el) {
el = document.createElement("div");
el.id = "hg-box";
el.style.cssText = HG_BOX;
el.setAttribute("role", "dialog");
el.setAttribute("aria-label", "Guests and kitchen");
document.body.appendChild(el);
el.addEventListener("click", hgClick);
el.addEventListener("keydown", function (ev) { ev.stopPropagation(); if (ev.key === "Enter" && ev.target && ev.target.id === "hg-find")
hgFind(); if (ev.key === "Escape")
hgClose(); });
el.addEventListener("keyup", function (ev) { ev.stopPropagation(); });
}
return el;
},
function (t, sub) {
return "<div style='display:flex;justify-content:space-between;align-items:flex-start;gap:8px'><div><div style='font:600 17px Georgia,serif;color:#FFE7B0'>" + t + "</div>" + (sub ? "<div style='opacity:.8;font-size:12.5px'>" + sub + "</div>" : "") + "</div>" +
"<button data-hg='close' aria-label='Close' style='" + PH_BTN2 + "'>✕</button></div>";
},
function () {
if (!hgOpenNow())
return;
if (HG.view === "kitchen" && typeof kcPaint === "function")
return kcPaint();
var S = HG.st, el = hgBox(), h = hgHead("🏠 Guests and kitchen", "Let folks into your home, and keep your kitchen stocked.");
if (HG.msg)
h += "<div style='margin:8px 0;padding:6px 8px;border-left:3px solid #C8A868;background:rgba(200,168,104,.08);font-size:12.5px'>" + HG.msg + "</div>";
if (HG.missing && !S) {
el.innerHTML = h + "<div style='margin-top:8px;opacity:.85'>Guests and kitchens open soon.</div>";
return;
}
if (!S) {
el.innerHTML = h + "<div style='margin-top:8px;opacity:.8'>Reading your keys…</div>";
return;
}
var cfg = S.cfg || {}, homes = S.homes || [], bund = S.bundles || [];
var here = typeof kcWhere === "function" ? kcWhere() : null;
h += hgSec("🍳 Kitchen");
if (cfg.kitchens === 0)
h += "<div style='opacity:.8'>The Keeper has paused kitchens for now.</div>";
else if (here)
h += "<div>You are in " + hgEsc(here.name) + ".</div>" + hgB("kitchen", "Open the kitchen");
else
h += "<div style='opacity:.85;font-size:13px'>Go into your home (or one you are a guest at) to open its kitchen. Groceries to take home are sold at the Bakery, the Greengrocer's, the Butcher's, the Dairy, the General Store and the Brewhouse.</div>";
var bag = (HG.kc && HG.kc.bag) || [];
if (bag.length)
h += "<div style='font-size:12.5px;margin-top:4px'>🛍️ In your shopping bag: " + bag.map(function (b) { return hgEsc(b.name) + " (" + b.qty + ")"; }).join(", ") + "</div>" + (here ? "" : hgB("bag", "Look in your bag", "", true));
h += hgSec("🔑 Your homes");
var names = homes.map(function (x) { return hgEsc(x.name) + (x.world && x.world !== "somnucor" && typeof hlWhere === "function" ? hgEsc(hlWhere(x.world)) : ""); });
if (bund.length)
names.push(bund.length === 1 ? "your World Bundle house" : bund.length + " World Bundle houses");
if (!names.length && !hgKeeper())
h += "<div style='opacity:.85;font-size:13px'>You have no home yet. Buy or rent one at the Land Office; then you can let folks in.</div>";
else {
h += "<div style='font-size:13px'>" + (names.length ? names.join(", ") : "The Keeper's keys") + "</div><div style='opacity:.75;font-size:12px'>Your guests may go into every home you live in.</div>";
if (cfg.guests === 0)
h += "<div style='opacity:.8;margin-top:4px'>The Keeper has paused guests for now.</div>";
else {
h += hgSec("👋 Guests");
var G = S.guests || [];
if (!G.length)
h += "<div style='opacity:.8;font-size:13px'>Nobody yet.</div>";
G.forEach(function (g) { h += "<div style='display:flex;justify-content:space-between;align-items:center;gap:6px;margin:2px 0'><span><b>" + hgEsc(g.name) + "</b> <span style='opacity:.75;font-size:12px'>" + hgUntil(g.until) + "</span></span>" + hgB("unlet", "Take off", " data-u='" + hgEsc(g.id) + "'", true) + "</div>"; });
h += "<div style='margin-top:6px;display:flex;gap:6px'><input id='hg-find' placeholder='Find a dreamer by name' value='" + hgEsc(HG.find) + "' style='flex:1;min-width:0;padding:6px 8px;border-radius:6px;border:1px solid #5A4A7A;background:#1A1530;color:#EDE8F8;font:14px system-ui'>" + hgB("find", "Find") + "</div>";
if (HG.found) {
if (!HG.found.length)
h += "<div style='opacity:.8;font-size:12.5px'>Nobody by that name.</div>";
HG.found.slice(0, 12).forEach(function (p) {
h += "<div style='display:flex;justify-content:space-between;align-items:center;gap:6px;margin:3px 0;flex-wrap:wrap'><span>" + hgEsc(p.name) + (p.here ? " <span style='color:#7AD07A;font-size:12px'>● in the city</span>" : "") + "</span><span>" +
hgB("let", "Let in always", " data-u='" + hgEsc(p.id) + "' data-n='0'") + hgB("let", "For 3 hours", " data-u='" + hgEsc(p.id) + "' data-n='3'", true) + "</span></div>";
});
}
if (cfg.open_house !== 0) {
h += hgSec("🚪 Open house");
if (S.open_until)
h += "<div>Anyone may come in " + hgUntil(S.open_until) + " (except anyone you have blocked).</div>" + hgB("open", "Shut the door", " data-n='0'", true);
else
h += "<div style='opacity:.85;font-size:13px'>Let anyone in for a while: a party, a viewing, a housewarming.</div>" + hgB("open", "Open for 1 hour", " data-n='1'") + hgB("open", "For 3 hours", " data-n='3'", true);
}
}
}
var O = S.guest_of || [];
if (O.length) {
h += hgSec("🏡 Homes you may visit");
O.forEach(function (g) {
var hs = (g.homes || []).map(function (x) { return hgEsc(x.name) + (x.world && x.world !== "somnucor" && typeof hlWhere === "function" ? hgEsc(hlWhere(x.world)) : ""); });
if ((g.bundles || []).length)
hs.push("their World Bundle house");
h += "<div style='margin:2px 0;font-size:13px'><b>" + hgEsc(g.name) + "</b>: " + (hs.join(", ") || "no home just now") + "</div>";
});
}
el.innerHTML = h;
},
function () {
var i = document.getElementById("hg-find");
HG.find = i ? i.value.trim() : "";
if (!HG.find) {
HG.found = null;
hgPaint();
return;
}
cityRpc("phone_book", { p_q: HG.find }).then(function (o) { HG.found = (o && o.people) || []; hgPaint(); var j = document.getElementById("hg-find"); if (j)
j.focus(); })
.catch(function () { HG.msg = "Couldn't reach the phone book."; hgPaint(); });
},
function (ev) {
var t = ev.target && ev.target.closest ? ev.target.closest("[data-hg]") : null;
if (!t)
return;
ev.stopPropagation();
var a = t.getAttribute("data-hg"), u = t.getAttribute("data-u"), n = +t.getAttribute("data-n") || 0;
if (a === "close")
return hgClose();
if (a === "find")
return hgFind();
if (a === "let")
return hgDo("home_guest_add", { p_guest: u, p_hours: n });
if (a === "unlet")
return hgDo("home_guest_remove", { p_guest: u });
if (a === "open")
return hgDo("home_open_set", { p_hours: n });
if (a === "kitchen" && typeof kcOpen === "function")
return kcOpen();
if (a === "bag" && typeof kcOpen === "function")
return kcOpen(true);
if (a === "back") {
HG.view = "home";
HG.msg = "";
return hgPaint();
}
if (typeof kcClick === "function")
kcClick(a, t);
},
function () {
try {
if (typeof bdlIsIn === "function" && bdlIsIn() && typeof BDL !== "undefined" && BDL.inside && BDL.inside.h) {
var h = BDL.inside.h;
if (h.owner && h.D)
return { home: "bdl:" + h.D.key + ":" + h.owner, name: h.D.house || "the house" };
}
var inside = typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && INT.spec;
if (inside) {
if (INT.spec.xpAnnex)
return null;
if (typeof fnEyrieMine === "function" && fnEyrieMine() && typeof CORP !== "undefined" && CORP.data)
return { home: "eyrie:" + CORP.data.apartment, name: "your Eyrie apartment" };
var k = typeof xpHomeOfSpec === "function" ? xpHomeOfSpec(INT.spec, INT) : null;
if (k && /^dream:/.test(k))
return { home: "dream:" + hgMe(), name: "your dream home" };
var pl = typeof hlPlotOf === "function" ? hlPlotOf(INT.spec) : null;
if (k && /^lot:\d+$/.test(k))
return { home: k, name: (pl && pl.name) || (typeof xpLotName === "function" && xpLotName(k.slice(4))) || "this home" };
if (pl) {
var id = kcLotId(pl.name);
if (id != null)
return { home: "lot:" + id, name: pl.name };
}
return null;
}
if (typeof fnWorldHomeHere === "function") {
var w = fnWorldHomeHere();
if (w && w.o) {
var world = w.key === "station" ? "station" : w.key, wid = kcLotId(w.o.name, world);
if (wid != null)
return { home: "lot:" + wid, name: w.o.name };
}
}
}
catch (e) { }
return null;
},
function (where) {
if (!hgSigned())
return Promise.resolve(null);
var home = where && where.home || null;
return cityRpc("kitchen_state", { p_home: home }).then(function (o) { if (o && o.ok) {
HG.kc = o;
HG.kcHome = o.home || null;
HG.kcName = (where && where.name) || "";
HG.kcAt = Date.now();
} return HG.kc; })
.catch(function (e) { if (hgMissing(e))
HG.missing = true; return HG.kc; });
},
function () {
if (!hgOpenNow() || HG.view !== "kitchen")
return;
var K = HG.kc, el = hgBox(), bagOnly = HG.kcBag || !HG.kcHome;
var h = hgHead(bagOnly ? "🛍️ Your shopping bag" : "🍳 The kitchen", bagOnly ? "What you have bought and carry with you" : hgEsc(HG.kcName || "this home"));
if (HG.msg)
h += "<div style='margin:8px 0;padding:6px 8px;border-left:3px solid #C8A868;background:rgba(200,168,104,.08);font-size:12.5px'>" + HG.msg + "</div>";
if (typeof NEEDS !== "undefined" && NEEDS.food != null && !NEEDS.exempt)
h += "<div style='font-size:12px;opacity:.85;margin:4px 0'>Food " + Math.round(NEEDS.food) + " · Drink " + Math.round(NEEDS.drink) + "</div>";
if (!K) {
el.innerHTML = h + "<div style='opacity:.8;margin-top:8px'>" + (HG.missing ? "Kitchens open soon." : "Opening the cupboards…") + "</div>" + hgB("back", "Back", "", true);
return;
}
if (K.on === false)
h += "<div style='opacity:.85;margin-top:6px'>The Keeper has paused kitchens for now.</div>";
var stock = K.stock || [], bag = K.bag || [];
if (!bagOnly) {
if (!stock.length)
h += "<div style='opacity:.85;margin-top:6px;font-size:13px'>The kitchen is empty. Buy groceries at the Bakery, the Greengrocer's, the Butcher's, the Dairy, the General Store or the Brewhouse, bring them home and put them away.</div>";
["fridge", "freezer", "cupboard"].forEach(function (kp) {
var L = stock.filter(function (s) { return s.keeps === kp; });
if (!L.length)
return;
h += hgSec(KC_KEEPS[kp]);
L.forEach(function (s) {
h += "<div style='display:flex;justify-content:space-between;align-items:center;gap:6px;margin:3px 0;flex-wrap:wrap'><span>" + hgEsc(s.name) + " <span style='opacity:.75;font-size:12px'>× " + s.qty + " (" + hgEsc(s.serving) + (s.raw ? ", for cooking" : ", " + kcFx(s)) + ")</span></span><span>" +
(s.raw ? "" : hgB("eat", kcVerb(s), " data-i='" + hgEsc(s.item) + "'")) + hgB("take", "Take out", " data-i='" + hgEsc(s.item) + "'", true) + "</span></div>";
});
});
h += hgSec("🔥 Cook at the stove");
var have = {};
stock.forEach(function (s) { have[s.item] = s.qty; });
var nameOf = {};
stock.concat(bag).forEach(function (s) { nameOf[s.item] = s.name; });
(K.recipes || []).forEach(function (r) {
var need = r.needs || {}, short = Object.keys(need).filter(function (i) { return (have[i] || 0) < need[i]; });
var parts = Object.keys(need).map(function (i) { return hgEsc(KC_ING[i] || nameOf[i] || i) + (need[i] > 1 ? " ×" + need[i] : ""); });
h += "<div style='display:flex;justify-content:space-between;align-items:center;gap:6px;margin:3px 0;flex-wrap:wrap" + (short.length ? ";opacity:.6" : "") + "'><span><b>" + hgEsc(r.name) + "</b> <span style='font-size:12px;opacity:.8'>(" + parts.join(", ") + ") food +" + r.food + (r.drink ? " · drink +" + r.drink : "") + "</span></span>" +
(short.length ? "" : hgB("cook", "Cook it", " data-i='" + hgEsc(r.k) + "'")) + "</div>";
});
}
h += hgSec("🛍️ Your shopping bag");
if (!bag.length)
h += "<div style='opacity:.8;font-size:13px'>Empty.</div>";
else {
bag.forEach(function (s) {
h += "<div style='display:flex;justify-content:space-between;align-items:center;gap:6px;margin:3px 0;flex-wrap:wrap'><span>" + hgEsc(s.name) + " <span style='opacity:.75;font-size:12px'>× " + s.qty + " (" + hgEsc(s.serving) + ")</span></span><span>" +
(!bagOnly ? hgB("put", "Put away", " data-i='" + hgEsc(s.item) + "'") : "") + (s.raw ? "" : hgB("eatbag", kcVerb(s) + " now", " data-i='" + hgEsc(s.item) + "'", true)) + "</span></div>";
});
if (!bagOnly)
h += hgB("putall", "Put everything away");
else
h += "<div style='opacity:.8;font-size:12.5px;margin-top:4px'>Go into your home (or one you are a guest at) to put it away in the kitchen.</div>";
}
h += "<div style='margin-top:10px'>" + hgB("back", "Guests and homes", "", true) + "</div>";
el.innerHTML = h;
},
function (a, t) {
var i = t.getAttribute("data-i"), home = HG.kcHome;
if (a === "eat")
return kcDo("kitchen_eat", { p_home: home, p_item: i });
if (a === "eatbag")
return kcDo("kitchen_eat", { p_home: null, p_item: i });
if (a === "take")
return kcDo("kitchen_take", { p_home: home, p_item: i, p_qty: null });
if (a === "put")
return kcDo("kitchen_put", { p_home: home, p_item: i, p_qty: null });
if (a === "putall")
return kcDo("kitchen_put", { p_home: home, p_item: null, p_qty: null });
if (a === "cook")
return kcDo("kitchen_cook", { p_home: home, p_recipe: i });
},
function () {
if (HG.goods && Date.now() - HG.goodsAt < 600000)
return Promise.resolve(HG.goods);
return cityRpc("grocery_board", {}).then(function (d) { HG.goods = Array.isArray(d) ? d : []; HG.goodsAt = Date.now(); return HG.goods; })
.catch(function () { HG.goods = HG.goods || []; HG.goodsAt = Date.now(); return HG.goods; });
},
function (k, g) {
if (HG.buying)
return;
HG.buying = true;
cityRpc("grocery_buy", { p_item: g.item, p_packs: 1 }).then(function (o) {
HG.buying = false;
var say = hgEsc((o && o.say) || "") + (o && o.ok !== false && o.price ? " (" + o.price + " gold)" : "");
if (o && o.bag && HG.kc)
HG.kc.bag = o.bag;
if (o && o.ok !== false && typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
setStatus(say);
needsMenu(k, say);
}).catch(function (e) { HG.buying = false; needsMenu(k, hgEsc(hgMissing(e) ? "Groceries to take home are on the shelves soon." : "Couldn't reach the city.")); });
}
];
});
