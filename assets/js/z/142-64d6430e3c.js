/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(142, function () {
"use strict";
return [
function (force) {
if (WHS.busy || (!force && Date.now() - WHS.at < 30000))
return;
if (!(typeof signedIn === "function" && signedIn()))
return;
WHS.busy = true;
WHS.at = Date.now();
cityRpc("wholesale_board", {}).then(function (d) { WHS.busy = false; WHS.data = d; if (WHS.open)
whPaint(); })
.catch(function (e) { WHS.busy = false; WHS.data = { ok: false, say: whErr(e, 8) }; if (WHS.open)
whPaint(); });
},
function () {
cityRpc("my_creation_orders", {}).then(function (d) { WHS.mine = d || []; if (WHS.open)
whPaint(); }).catch(function () { WHS.mine = []; });
if ((typeof amKeeper === "function" && amKeeper()) || (WHS.cat && WHS.cat.manager))
cityRpc("creation_orders_board", {}).then(function (d) { WHS.orders = d; if (WHS.open)
whPaint(); }).catch(function () { });
},
function () {
var el = document.getElementById("wh-panel");
if (!el) {
if (!document.body)
return;
el = document.createElement("div");
el.id = "wh-panel";
el.style.cssText = WH_BOX;
document.body.appendChild(el);
el.addEventListener("click", whClick);
el.addEventListener("change", whChange);
el.addEventListener("keydown", function (e) { if (e.key === "Enter" && e.target && e.target.id === "wh-q") {
WHS.q = e.target.value.trim();
whLoadCat();
} e.stopPropagation(); });
}
if (!WHS.open) {
el.style.display = "none";
return;
}
el.style.display = "block";
var tabs = [["shops", "Shops"], ["stock", "Warehouse"], ["make", "Make it"], ["city", "City orders"]];
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:14px">The Somnucor market</b><button class="btn" data-wh="x">Close</button></div>' +
'<div style="display:flex;gap:4px;margin:8px 0;flex-wrap:wrap">' + tabs.map(function (t) {
return '<button class="btn" data-wh="tab:' + t[0] + '" style="' + (WHS.tab === t[0] ? 'border-color:#C9A040;color:#F4E6C0' : 'opacity:.8') + '">' + t[1] + '</button>';
}).join("") + '</div>' +
(WHS.msg ? '<div style="margin:4px 0 6px"><b>' + esc(WHS.msg) + '</b></div>' : '');
if (WHS.tab === "shops")
h += whShopsHtml();
else if (WHS.tab === "stock")
h += whStockHtml();
else if (WHS.tab === "make")
h += whMakeHtml();
else
h += whCityHtml();
el.innerHTML = h;
},
function () {
var d = WHS.shops;
if (!d)
return whDim("Looking round the shops…");
if (!d.ok)
return whDim(esc(d.say || ""));
var h = whDim("What dreamers' businesses have on their shelves. Buy one and the owner is paid.");
if (!(d.shops || []).length)
h += '<div style="margin-top:8px">' + whDim("No dreamer's shop has stock yet. A business buys its stock at the Warehouse tab.") + '</div>';
(d.shops || []).forEach(function (s) {
h += '<div style="border-top:1px solid rgba(255,255,255,.08);margin-top:7px;padding-top:6px"><b>' + esc(s.name) + '</b> ' + whDim(s.owner ? "run by " + esc(s.owner) : "") + (s.mine ? ' ' + whDim("(yours: set prices here)") : '');
(s.goods || []).forEach(function (g) {
h += whRow(esc(g.name) + ' ' + whDim(g.units + ' left · ' + g.price + ' gold' + (s.mine ? ' · cost you ' + g.cost + ' · ' + g.sold + ' sold' : '')), (s.mine ? '<button class="btn" data-wh="price:' + g.shelf + ':' + g.price + '">Price</button> ' : '') +
(g.units > 0 ? '<button class="btn" data-wh="buy:' + g.shelf + '">Buy</button>' : whDim("sold out")));
});
h += '</div>';
});
return h;
},
function () {
var d = WHS.cat;
if (!d)
return whDim("Reading the warehouse's stock…");
if (!d.ok)
return whDim(esc(d.say || ""));
var h = whDim((d.total || 0).toLocaleString() + " goods in stock. A business you run buys them here at half the shop price, then sells them at its own price.");
h += '<div style="display:flex;gap:6px;margin:8px 0;flex-wrap:wrap"><select id="wh-dept" style="flex:1;min-width:140px"><option value="">Every department</option>' +
(d.depts || []).map(function (x) { return '<option value="' + esc(x.dept) + '"' + (x.dept === WHS.dept ? ' selected' : '') + '>' + esc(x.dept) + ' (' + x.n + ')</option>'; }).join("") + '</select>' +
'<input id="wh-q" placeholder="Search, e.g. potion" value="' + esc(WHS.q) + '" style="flex:1;min-width:120px"><button class="btn" data-wh="find">Find</button></div>';
var shops = d.shops || [];
if (shops.length)
h += '<div style="margin-bottom:6px">Buying for: <select id="wh-shop">' + shops.map(function (s) { return '<option value="' + s.id + '"' + (+WHS.shop === s.id ? ' selected' : '') + '>' + esc(s.name) + '</option>'; }).join("") + '</select></div>';
else
h += '<div style="margin-bottom:6px">' + whDim(d.paid ? "Open a business first (a permit from the Tower, then the licence) to buy stock to sell." : "Visitors may look round. Members who pay their dues can open a business and buy stock.") + '</div>';
if (!WHS.dept && !WHS.q)
return h + whDim("Pick a department or search.");
var L = d.lines || [];
if (!L.length)
h += whDim("Nothing like that in stock. ") + '<button class="btn" data-wh="tab:make">Have it made</button>';
L.forEach(function (l) {
h += whRow(esc(l.name) + ' ' + whDim(esc(l.dept) + ' · ' + l.cost + ' gold wholesale · sells for about ' + l.retail + (l.made_by !== "warehouse" ? ' · made to order' : '')), shops.length ? '<button class="btn" data-wh="stock:' + l.id + ':10">Buy 10</button> <button class="btn" data-wh="stock:' + l.id + ':0">More…</button>' : '');
});
if (L.length >= 400)
h += '<div style="margin-top:6px">' + whDim("Showing the first 400. Search to narrow it down.") + '</div>';
return h;
},
function () {
var h = whDim("Can't find it in stock? The AI looks it up on the web, designs it, and it joins the warehouse for everyone. Or fill in the order form and the warehouse makes it.");
h += '<div style="margin-top:8px;display:grid;gap:6px">' +
'<input id="wh-mk-name" placeholder="What is it? e.g. clockwork owl" maxlength="60">' +
'<input id="wh-mk-dept" placeholder="Department (optional), e.g. Toys and games" maxlength="40">' +
'<textarea id="wh-mk-detail" rows="2" placeholder="Anything the maker should know (colour, size, what it does)" maxlength="1000"></textarea>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn" data-wh="ai"' + (WHS.making ? ' disabled' : '') + '>' + (WHS.making ? "Designing…" : "Design it with the AI") + '</button>' +
'<button class="btn" data-wh="cform">Send the order form</button> <label>' + whDim("how many") + ' <input id="wh-mk-units" type="number" min="1" max="500" value="1" style="width:60px"></label></div></div>';
var mine = WHS.mine || [];
if (mine.length) {
h += '<div style="border-top:1px solid rgba(255,255,255,.1);margin-top:9px;padding-top:6px"><b>Your orders</b>';
mine.forEach(function (o) { h += whRow('#' + o.id + ' ' + esc(o.name), whDim({ open: "with the warehouse", made: "made and in stock", declined: "declined" }[o.status] || esc(o.status)) + (o.note ? ' ' + whDim("· " + esc(o.note)) : '')); });
h += '</div>';
}
var B = WHS.orders;
if (B && B.ok) {
h += '<div style="border-top:1px solid rgba(255,255,255,.1);margin-top:9px;padding-top:6px"><b>Orders to fill</b> ' + whDim("(keeper and warehouse manager)");
var open = (B.orders || []).filter(function (o) { return o.status === "open"; });
if (!open.length)
h += '<div>' + whDim("None waiting.") + '</div>';
open.forEach(function (o) {
h += '<div style="margin-top:5px">#' + o.id + ' <b>' + esc(o.name) + '</b> × ' + o.units + ' ' + whDim("for " + esc(o.who || "a dreamer") + (o.dept ? " · " + esc(o.dept) : "")) + (o.detail ? '<div>' + whDim(esc(o.detail)) + '</div>' : '') +
'<div><button class="btn" data-wh="fill:' + o.id + '">Make it</button> <button class="btn" data-wh="decline:' + o.id + '">Decline</button></div></div>';
});
h += '</div>';
}
return h;
},
function () {
var d = WHS.data, h = "";
if (!d)
return whDim("Reading the order book…");
if (!d.ok)
return whDim(esc(d.say || ""));
h += '<div style="color:var(--dim);margin:6px 0">The city\'s own shops order here. The Treasury holds ' + (d.treasury || 0) + ' gold. Wholesale is half the shop price.</div>';
(d.shops || []).forEach(function (s) {
h += '<div style="border-top:1px solid rgba(255,255,255,.08);padding:7px 0"><b>' + esc(s.shop) + '</b>';
(s.goods || []).forEach(function (g) {
var room = Math.max(0, (g.max || 0) - (g.stock || 0) - (g.on_order || 0));
h += whRow(esc(g.name) + ' ' + whDim(g.stock + '/' + g.max + (g.on_order ? ' · ' + g.on_order + ' on order' : '') + ' · ' + g.cost + ' gold each'), room > 0 ? '<button class="btn" data-wh="order:' + g.id + ':' + Math.min(room, 5) + '">Order ' + Math.min(room, 5) + '</button>' + (room > 5 ? ' <button class="btn" data-wh="order:' + g.id + ':' + room + '">Fill (' + room + ')</button>' : '') : whDim("full"));
});
h += '</div>';
});
if (!(d.shops || []).length)
h += whDim("Clock in at a city shop to order for it.");
var open = (d.orders || []).filter(function (o) { return o.status !== "delivered" && o.status !== "cancelled"; });
if (open.length || d.may_pick || d.may_deliver) {
h += '<div style="border-top:1px solid rgba(255,255,255,.12);margin-top:6px;padding-top:7px"><b>Orders in hand</b></div>';
open.forEach(function (o) {
h += whRow('#' + o.id + ' ' + o.units + ' × ' + esc(o.name) + ' for ' + esc(o.shop) + ' ' + whDim(esc(o.status)), (o.status === "placed" && d.may_pick ? '<button class="btn" data-wh="pick:' + o.id + '">Pick it</button>' : '') +
(o.status === "picked" && d.may_deliver ? '<button class="btn" data-wh="deliver:' + o.id + '">Deliver it</button>' : ''));
});
if (!open.length)
h += whDim("Nothing waiting.");
}
return h;
},
function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-wh]") : null;
if (!b)
return;
var a = b.getAttribute("data-wh").split(":");
if (a[0] === "x") {
WHS.open = false;
whPaint();
return;
}
if (a[0] === "tab") {
WHS.tab = a[1];
WHS.msg = "";
whLoadTab(true);
whPaint();
return;
}
if (a[0] === "find") {
WHS.q = whVal("wh-q");
whLoadCat();
return;
}
if (a[0] === "buy")
return whSay(cityRpc("business_buy", { p_shelf: +a[1] }), function () { whLoadShops(); if (typeof refreshStanding === "function")
refreshStanding(); });
if (a[0] === "price") {
var p = Math.floor(+prompt("The shelf price, in gold:", a[2]) || 0);
if (p < 1)
return;
return whSay(cityRpc("shelf_price", { p_shelf: +a[1], p_price: p }), whLoadShops);
}
if (a[0] === "stock") {
var shop = +(whVal("wh-shop") || WHS.shop || 0), n = +a[2];
if (!n)
n = Math.floor(+prompt("How many? (1 to 500)", "25") || 0);
if (!(n > 0) || !shop)
return;
return whSay(cityRpc("wholesale_buy", { p_line: +a[1], p_units: Math.min(500, n), p_shop: shop }), function () { if (typeof refreshStanding === "function")
refreshStanding(); });
}
if (a[0] === "ai")
return whMake(whVal("wh-mk-name"), whVal("wh-mk-dept"), whVal("wh-mk-detail"));
if (a[0] === "cform") {
var nm = whVal("wh-mk-name");
if (nm.length < 2) {
WHS.msg = "Say what should be made.";
whPaint();
return;
}
return whSay(cityRpc("creation_order", { p_name: nm, p_dept: whVal("wh-mk-dept"), p_detail: whVal("wh-mk-detail"), p_units: +(whVal("wh-mk-units") || 1) }), whLoadMine);
}
if (a[0] === "fill") {
var r = Math.floor(+prompt("Its shop price, in gold (the wholesale price is half):", "10") || 0);
if (r < 1)
return;
return whSay(cityRpc("creation_order_fill", { p_id: +a[1], p_make: true, p_retail: r, p_dept: null, p_note: "made by the warehouse" }), whLoadMine);
}
if (a[0] === "decline") {
var why = prompt("Why not? (the dreamer sees this)", "") || "";
return whSay(cityRpc("creation_order_fill", { p_id: +a[1], p_make: false, p_retail: null, p_dept: null, p_note: why }), whLoadMine);
}
var call = a[0] === "order" ? cityRpc("wholesale_order", { p_good: +a[1], p_units: +a[2] }) : a[0] === "pick" ? cityRpc("wholesale_pick", { p_order: +a[1] }) : cityRpc("wholesale_deliver", { p_order: +a[1] });
whSay(call, function () { whLoad(true); });
},
function (name, dept, detail) {
if (String(name || "").length < 2) {
WHS.msg = "Say what should be made.";
whPaint();
return;
}
if (typeof cfg !== "function" || typeof llmTarget !== "function" || typeof llmBody !== "function" || typeof compileArchetype !== "function") {
WHS.msg = "The AI is not available here. Send the order form instead.";
whPaint();
return;
}
var c = cfg(), T = llmTarget(c);
if (c.mode === "off" || !T.url || (typeof navigator !== "undefined" && navigator.onLine === false)) {
WHS.msg = "The AI is switched off or offline. Send the order form instead, and the warehouse will make it.";
whPaint();
return;
}
WHS.making = true;
WHS.msg = "Looking up " + name + " on the web and designing it…";
whPaint();
var body = llmBody(c, { temperature: 0.2, max_tokens: 8000, messages: [{ role: "system", content: WH_MAKE_SYS }, { role: "user", content: "Design this, as it truly looks: " + name + (detail ? " (" + detail + ")" : "") }] });
if (c.mode === "app") {
body.lookup = [name];
body.design = true;
}
if (typeof AI_NO_JSONMODE === "undefined" || !AI_NO_JSONMODE)
body.response_format = { type: "json_object" };
fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify(body) })
.then(function (r) { if (!r.ok)
return r.text().then(function (t) { throw new Error(r.status + " " + t.slice(0, 120)); }); return r.json(); })
.then(function (d) {
var raw = (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || "";
var j = (typeof aiJson === "function") ? aiJson(raw) : JSON.parse(raw);
var def = aidDef(aidFindDesign(j));
if (!def || !Array.isArray(def.parts) || def.parts.length < 6)
throw new Error("the design came back too thin");
var key = aidKeyFor("", name);
if (!key)
throw new Error("that name will not do");
if (KIT[key] && !KIT[key].grown)
key = (key + "w").slice(0, 23);
if (KIT[key] && KIT[key].grown)
delete KIT[key];
if (!compileArchetype(key, def))
throw new Error("the design would not build");
var looked = (d.somnu_lookups || [])[0], src = looked ? (looked.source + ": " + looked.title) : (j && j.source) || "own knowledge";
if (typeof savedArchetypeKeys !== "undefined")
savedArchetypeKeys[key] = true;
if (def.cat !== "being")
cityRpc("save_custom_archetype", { p_key: key, p_recipe: { parts: def.parts }, p_cat: def.cat, p_size: def.size, p_label: name }).catch(function () { });
if (typeof learnWord === "function")
learnWord(key, String(name).toLowerCase());
var price = Math.round(+((j && (j.price || (j.design && j.design.price))) || 0)) || 10;
return cityRpc("wholesale_create", { p_name: name, p_dept: dept || (j && j.dept) || "Made to order", p_archetype: key, p_retail: Math.max(1, Math.min(100000, price)), p_source: String(src).slice(0, 200) });
})
.then(function (o) { WHS.making = false; WHS.msg = (o && o.say) || "Made." + ""; WHS.q = name; WHS.dept = ""; whLoadCat(); whPaint(); })
.catch(function (e) { WHS.making = false; if (window.console)
console.warn("[AI make]", (e && e.message) || e); WHS.msg = "The AI could not make it this time (" + (typeof aiPlainWhy === "function" ? aiPlainWhy(e) : "it did not answer") + "). Send the order form and the warehouse will make it."; whPaint(); });
}
];
});
