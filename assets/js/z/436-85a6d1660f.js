/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(436, function () {
"use strict";
return [
function () {
if (typeof INT === "undefined" || !INT || !INT.root)
return;
var S = bzsShopHere();
INT.bzf = INT.bzf || {};
var want = S ? (BZS.mine || []).filter(function (t) { return t.bz.shop.shop === S.shop && tempOnShift(t); }) : [];
var ids = {};
want.forEach(function (t) { ids[t.id] = 1; });
Object.keys(INT.bzf).forEach(function (id) { if (!ids[id]) {
INT.root.remove(INT.bzf[id]);
delete INT.bzf[id];
} });
var fresh = want.filter(function (t) { var g = INT.bzf[t.id]; return !g || g.parent !== INT.root; });
if (!fresh.length || typeof tempPostPlan !== "function")
return;
var plan = tempPostPlan(want);
fresh.forEach(function (t) {
var p = plan[t.id];
if (!p)
return;
var g;
try {
g = buildFigure({ id: "__bzin_" + t.id, archetype: "human", attrs: {}, look: tempLook(t), solid: false, detail: (typeof LITE !== "undefined" && LITE) ? 2 : 3, nights: [], city: true }, 1);
}
catch (e) {
return;
}
g.position.set(p.x, p.y || 0, p.z);
g.rotation.y = p.ry || 0;
var lm = g.userData.limbs;
if (lm) {
if (lm.la)
lm.la.rotation.x = -0.7;
if (lm.ra)
lm.ra.rotation.x = -0.5;
}
if (typeof makeTag === "function") {
var tag = makeTag(t.name + " · " + t.post.title, false);
tag.position.y = 2.15;
g.add(tag);
}
g.traverse(function (m) { m.raycast = function () { }; });
INT.root.add(g);
INT.bzf[t.id] = g;
});
},
function (shop) {
var G = BZS.goods[shop];
if (G && Date.now() - G.at < 60000)
return Promise.resolve(G.list);
return cityRpc("business_shop", { p_shop: shop }).then(function (d) { var s = (d && d.shops || [])[0]; var list = s ? s.goods || [] : []; BZS.goods[shop] = { at: Date.now(), list: list }; return list; })
.catch(function () { return (G && G.list) || []; });
},
function (t, goods) {
var h = t.bz.hand, S = t.bz.shop, role = String(h.role || "shop assistant"), age = +h.age || 30;
var who = (typeof cfkAgeWords === "function") ? cfkAgeWords(age, h.sex) : ("You are " + age + " years old.");
var g = (goods || []).filter(function (x) { return +x.units > 0; }).slice(0, 14).map(function (x) { return x.name + " (" + x.price + " gold, " + x.units + " left)"; });
var p = h.name + " is the " + role.toLowerCase() + " at " + S.name + ", " + (S.owner ? S.owner + "'s" : "a dreamer's") + " own shop at " + S.lot + " in Somnucor, at work right now. " + who + " ";
if (h.note)
p += "About " + h.name.split(" ")[0] + ": " + String(h.note).slice(0, 240) + " ";
p += "The shop is open from " + S.open_h + ":00 to " + S.close_h + ":00. ";
if (BZS_SELLS.test(role))
p += g.length ? "On the shelves now: " + g.join("; ") + ". Knows every price and how many are left, and when the dreamer wants something, shows them the shelves to buy it. " : "The shelves are empty just now; the owner restocks from the Wholesale Warehouse. ";
else if (/guard/i.test(role))
p += "Keeps the door at night while the shop is shut, and does not sell; points customers to the opening hours. ";
else
p += "Keeps the shop clean and does not sell; fetches the shopkeeper if a customer wants something. ";
if (S.mine)
p += "The dreamer talking to them is their employer, who pays their wage; they are glad to see the boss and say honestly how trade has been. ";
p += "Speaks as a real " + role.toLowerCase() + " would at work: warm, practical and brief. Never says it is a game or an AI.";
return p;
},
function (t) {
if (!t || typeof wTalk !== "function")
return;
var S = t.bz.shop, h = t.bz.hand, G = BZS.goods[S.shop];
function fill(goods) {
var persona = bzsPersona(t, goods);
(store.characters || []).forEach(function (c) {
if (c.wKey !== "wtalk:" + h.name)
return;
c.details = c.details || [];
c.details[0] = persona;
c.bzShop = S.shop;
c.stfTitle = h.role;
c.stfPlace = S.lot;
c.ftkSex = h.sex;
c.ftkAge = +h.age || undefined;
});
return persona;
}
wTalk({ name: h.name, title: h.role, doing: "at work", persona: bzsPersona(t, G ? G.list : []),
greet: BZS_SELLS.test(h.role) ? "Hello, welcome to " + S.name + ". I'm " + h.name.split(" ")[0] + ". What can I get you?" : "Hello. I'm " + h.name.split(" ")[0] + ", the " + String(h.role).toLowerCase() + " at " + S.name + "." });
fill(G ? G.list : []);
bzsGoods(S.shop).then(fill).catch(function () { });
},
function () {
var el = bzsEl("bzs-shop");
if (!el)
return;
if (!BZS_SHOP.id) {
el.style.display = "none";
return;
}
var S = BZS.shops[BZS_SHOP.id] || { name: "The shop" };
var h = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:15px;flex:1">🛍️ ' + esc(S.name) + '</b><button class="btn" data-bzs="shopx">Close</button></div>';
if (S.owner)
h += '<div>' + bzsDim(esc(S.owner) + "'s shop at " + esc(S.lot || "") + ". What you buy goes to your backpack, and the owner is paid.") + '</div>';
if (BZS_SHOP.msg)
h += '<div style="margin:8px 0;color:#E8D9B0">' + esc(BZS_SHOP.msg) + '</div>';
var L = BZS_SHOP.list;
if (!L)
h += '<div style="margin-top:8px">' + bzsDim("…") + '</div>';
else {
var on = L.filter(function (x) { return +x.units > 0; });
h += on.length ? on.map(function (x) {
return '<div style="display:flex;justify-content:space-between;gap:6px;align-items:center;margin-top:6px"><span>' + esc(x.name) + ' ' + bzsDim(esc(x.dept || "") + " · " + x.units + " left") + '</span>' +
'<span style="white-space:nowrap">' + bzsG(x.price) + ' <button class="btn" data-bzs="buy" data-s="' + x.shelf + '">Buy</button></span></div>';
}).join("") : '<div style="margin-top:8px">' + bzsDim("The shelves are empty just now.") + '</div>';
}
el.innerHTML = h;
el.style.display = "block";
},
function (force) {
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve(null);
if (!force && BZS.board && Date.now() - BZS.boardAt < 20000)
return Promise.resolve(BZS.board);
return cityRpc("business_staff_board", {}).then(function (b) { BZS.board = b; BZS.boardAt = Date.now(); bzsAwayNote(b); if (BZS.open)
bzsPaint(); return b; })
.catch(function (e) { BZS.board = { ok: false, say: /function|404|PGRST|does not exist/i.test(String(e && e.message)) ? "Shops with staff open once the server has the latest server update." : String(e && e.message || e) }; if (BZS.open)
bzsPaint(); return null; });
},
function () {
var el = bzsEl("bzs-panel");
if (!el)
return;
if (!BZS.open) {
el.style.display = "none";
return;
}
var keep = {};
el.querySelectorAll("input[id^=bzs-],select[id^=bzs-],textarea[id^=bzs-]").forEach(function (f) { keep[f.id] = f.value; });
var B = BZS.board, h = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:15px;flex:1">🏪 My shop</b><button class="btn" data-bzs="x">Close</button></div>';
if (BZS.msg)
h += '<div style="margin:0 0 8px;color:#E8D9B0">' + esc(BZS.msg) + '</div>';
if (!B)
h += bzsDim("…");
else if (B.ok === false)
h += bzsDim(esc(B.say || ""));
else if (!(B.shops || []).length) {
h += '<div>' + bzsDim("You run no business yet. A new one needs a permit from the Tower, then the 2,000 gold licence (the Tower desk, or the Business panel at City Hall). Then lease or buy shop ground on <b>Market Row</b> at the Land Office in the Civic Ring, and come back here to open the shop on it and hire your staff.") + '</div>';
}
else {
if (!B.paid)
h += '<div style="margin-bottom:8px;color:#E8A0A0">Hiring staff and earning from them is for dreamers whose dues are paid. Your staff stand down until then.</div>';
if (B.on === false)
h += '<div style="margin-bottom:8px;color:#E8A0A0">The Keeper has paused shops with staff for now.</div>';
h += '<div>' + bzsDim("Your wallet: " + bzsG(B.wallet) + ". Each seller sells about " + B.per_hand + " things a day to townsfolk while you are away (fewer if your prices are dear), and the Treasury pays you the price less the market toll. Wages leave your wallet once a day.") + '</div>';
(B.shops || []).forEach(function (S) {
var F = S.front;
h += '<div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--line,#333)"><b style="font-size:14px">' + esc(S.name) + '</b>';
h += '<div style="margin-top:6px">' + (F ? ("Shopfront: <b>" + esc(F.lot || "") + "</b>" + (F.quarter ? " " + bzsDim(esc(F.quarter)) : "") + ", open " + F.open_h + ":00 to " + F.close_h + ":00" + (F.held ? "" : ' <b style="color:#E8A0A0">(you no longer hold that ground: the shop is shut)</b>')) : bzsDim("No shopfront yet: your staff need a shop to stand in.")) + '</div>';
var lots = (B.lots || []);
if (lots.length) {
h += '<div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:6px"><select id="bzs-lot-' + S.id + '">' + lots.map(function (l) { return '<option value="' + l.id + '"' + (F && F.lot_id === l.id ? " selected" : "") + (l.used_by && l.used_by !== S.name ? " disabled" : "") + '>' + esc(l.name) + (l.used_by && l.used_by !== S.name ? " (" + esc(l.used_by) + ")" : "") + '</option>'; }).join("") + '</select>' +
'open <select id="bzs-op-' + S.id + '">' + bzsHours(F ? F.open_h : 8) + '</select> to <select id="bzs-cl-' + S.id + '">' + bzsHours(F ? F.close_h : 20) + '</select>' +
'<button class="btn" data-bzs="front" data-e="' + S.id + '">' + (F ? "Save" : "Open the shop here") + '</button></div>';
}
else
h += '<div style="margin-top:4px">' + bzsDim("You hold no ground for a shop. Lease or buy a lot on Market Row at the Land Office in the Civic Ring.") + '</div>';
h += '<div style="margin-top:10px"><b>Staff</b> ' + bzsDim((S.hands || []).length + " of " + B.max_hands) + '</div>';
(S.hands || []).forEach(function (x) {
h += '<div style="margin-top:6px;padding:6px 8px;background:rgba(255,255,255,.04);border-radius:3px">' +
'<div style="display:flex;justify-content:space-between;gap:6px;flex-wrap:wrap"><span><b>' + esc(x.name) + '</b> ' + bzsDim(x.age + ", " + (x.sex === "f" ? "woman" : "man") + " · " + esc(x.role)) + '</span>' +
'<span style="white-space:nowrap">' + bzsG(x.wage) + ' a day' + (+x.owed ? ' <b style="color:#E8A0A0">owed ' + bzsG(x.owed) + '</b>' : '') + '</span></div>' +
(x.note ? '<div>' + bzsDim(esc(x.note)) + '</div>' : '') +
'<div style="margin-top:4px;display:flex;gap:6px;flex-wrap:wrap"><button class="btn" data-bzs="wage" data-h="' + x.id + '" data-w="' + x.wage + '">Wage</button>' +
'<button class="btn" data-bzs="note" data-h="' + x.id + '">About them</button><button class="btn" data-bzs="go" data-h="' + x.id + '" data-n="' + esc(x.name) + '">Let go</button></div></div>';
});
(S.left || []).forEach(function (x) { h += '<div style="margin-top:4px">' + bzsDim(esc(x.name) + " (" + esc(x.role) + ") " + esc(x.note || "left") + ", " + bzsWhen(x.at) + ".") + '</div>'; });
if (BZS.form === S.id) {
h += '<div style="margin-top:8px;padding:8px;border:1px solid #6A5A3A;border-radius:3px"><b>Hire someone</b>' +
'<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;align-items:center"><select id="bzs-role">' + bzsRoleOpts(B, keep["bzs-role"]) + '</select>' +
'<label>Wage a day <input id="bzs-wage" type="number" min="1" style="width:80px"></label></div>' +
'<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;align-items:center"><input id="bzs-name" placeholder="Name (or leave it to the city)" maxlength="40" style="flex:1;min-width:160px">' +
'<select id="bzs-sex"><option value="">Woman or man</option><option value="f">Woman</option><option value="m">Man</option></select>' +
'<label>Age <input id="bzs-age" type="number" min="18" max="80" placeholder="any" style="width:64px"></label></div>' +
'<textarea id="bzs-note" maxlength="240" rows="2" placeholder="A line about them, how they talk and what they are like (optional)" style="width:100%;margin-top:6px;box-sizing:border-box"></textarea>' +
'<div style="margin-top:6px;display:flex;gap:6px"><button class="btn" data-bzs="hire" data-e="' + S.id + '">Hire</button><button class="btn" data-bzs="form" data-e="0">Cancel</button></div></div>';
}
else if ((S.hands || []).length < B.max_hands)
h += '<div style="margin-top:6px"><button class="btn" data-bzs="form" data-e="' + S.id + '">+ Hire someone</button></div>';
var fw = S.folk_week || {}, dw = S.dreamer_week || {};
h += '<div style="margin-top:10px"><b>This week</b><div>' + bzsDim("Your staff sold " + (fw.n || 0) + " things to townsfolk for " + bzsG(fw.gold) + "; dreamers bought " + (dw.n || 0) + " for " + bzsG(dw.gold) + ". On the shelves: " + (S.stock || 0) + " things, " + (S.lines || 0) + " kinds.") + '</div>' +
'<div style="margin-top:4px;display:flex;gap:6px;flex-wrap:wrap"><button class="btn" data-bzs="stock">Stock the shelves (the Warehouse)</button><button class="btn" data-bzs="prices" data-e="' + S.id + '">Prices</button></div></div>';
if ((S.recent || []).length)
h += '<div style="margin-top:6px">' + S.recent.slice(0, 8).map(function (r) { return '<div>' + bzsDim(bzsWhen(r.at) + ": ") + esc(r.by ? r.by.split(" ")[0] : "Your staff") + ' sold ' + esc(r.name) + ' to ' + esc(r.folk || "a customer") + ' ' + bzsDim("(" + bzsG(r.paid) + " to you)") + '</div>'; }).join("") + '</div>';
h += '</div>';
});
}
el.innerHTML = h;
el.style.display = "block";
Object.keys(keep).forEach(function (id) { var f = document.getElementById(id); if (f)
f.value = keep[id]; });
var rs = document.getElementById("bzs-role"), ws = document.getElementById("bzs-wage");
if (rs && ws) {
var setMin = function () { var r = (B.roles || []).filter(function (x) { return x.role === rs.value; })[0]; if (r) {
ws.min = r.min_wage;
if (!ws.value || +ws.value < r.min_wage)
ws.value = r.min_wage;
} };
rs.onchange = function () { ws.value = ""; setMin(); };
setMin();
}
},
function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-bzs]") : null;
if (!b)
return;
var a = b.getAttribute("data-bzs"), E = +b.getAttribute("data-e"), H = +b.getAttribute("data-h");
if (a === "shopx") {
BZS_SHOP.id = 0;
bzsShopPaint();
return;
}
if (a === "buy") {
BZS_SHOP.msg = "…";
bzsShopPaint();
return cityRpc("business_buy", { p_shelf: +b.getAttribute("data-s") }).then(function (o) {
BZS_SHOP.msg = (o && o.say) || "Done.";
delete BZS.goods[BZS_SHOP.id];
bzsGoods(BZS_SHOP.id).then(function (L) { BZS_SHOP.list = L; bzsShopPaint(); });
if (typeof refreshStanding === "function")
refreshStanding();
})
.catch(function (err) { BZS_SHOP.msg = String(err && err.message || err); bzsShopPaint(); });
}
if (a === "x") {
bzsClose();
return;
}
if (a === "form") {
BZS.form = E || null;
BZS.msg = "";
bzsPaint();
return;
}
if (a === "front")
return bzsSay(cityRpc("business_front_set", { p_shop: E, p_lot: +bzsVal("bzs-lot-" + E), p_open: +bzsVal("bzs-op-" + E), p_close: +bzsVal("bzs-cl-" + E) }));
if (a === "hire") {
var age = bzsVal("bzs-age");
return bzsSay(cityRpc("business_hand_hire", { p_shop: E, p_role: bzsVal("bzs-role"), p_wage: +bzsVal("bzs-wage") || null, p_name: bzsVal("bzs-name") || null,
p_sex: bzsVal("bzs-sex") || null, p_age: age ? +age : null, p_note: bzsVal("bzs-note") || null }), function (o) { if (o && o.ok)
BZS.form = null; });
}
if (a === "wage") {
var w = Math.floor(+prompt("Their wage, in gold a day:", b.getAttribute("data-w")) || 0);
if (w < 1)
return;
return bzsSay(cityRpc("business_hand_set", { p_hand: H, p_wage: w }));
}
if (a === "note") {
var n = prompt("A line about them: how they talk and what they are like (up to 240 letters).", "");
if (n === null)
return;
return bzsSay(cityRpc("business_hand_set", { p_hand: H, p_note: n.slice(0, 240) }));
}
if (a === "go") {
if (!confirm("Let " + b.getAttribute("data-n") + " go? The part of today they worked, and anything owed, is paid now."))
return;
return bzsSay(cityRpc("business_hand_let_go", { p_hand: H }));
}
if (a === "stock" || a === "prices") {
if (typeof WHS === "undefined" || typeof whPaint !== "function")
return;
WHS.open = true;
WHS.tab = a === "stock" ? "stock" : "shops";
WHS.msg = "";
if (typeof whLoadTab === "function")
whLoadTab(true);
whPaint();
return;
}
},
function (b) {
if (!b || !b.ok || BZS.away)
return;
BZS.away = true;
var seen = 0;
try {
seen = +localStorage.getItem("dreamwalker.bzsSeen") || 0;
}
catch (e) { }
var n = 0, g = 0, names = {};
(b.shops || []).forEach(function (S) { (S.recent || []).forEach(function (r) { var t = new Date(r.at).getTime(); if (t > seen) {
n++;
g += +r.paid || 0;
names[S.name] = 1;
} }); });
try {
localStorage.setItem("dreamwalker.bzsSeen", String(Date.now()));
}
catch (e) { }
if (seen && n && typeof setStatus === "function")
setStatus("<b>While you were away</b>, your staff at " + esc(Object.keys(names).join(" and ")) + " sold " + n + (n === 1 ? " thing" : " things") + " for <b>" + bzsG(g) + "</b>. ☰ Menu → 🏪 My shop.");
}
];
});
