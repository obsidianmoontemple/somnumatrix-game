/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(477, function () {
"use strict";
return [
function () {
if (BNK.el)
return BNK.el;
var d = document.createElement("div");
d.id = "bnk-box";
d.style.cssText = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:61;width:min(560px,calc(100vw - 24px));max-height:min(84vh,720px);overflow:auto;" +
"background:rgba(16,18,24,.97);color:#EDE6DA;border:1px solid rgba(232,194,122,.5);border-radius:12px;padding:14px 16px;font:14px/1.5 system-ui,sans-serif;box-shadow:0 10px 40px rgba(0,0,0,.55)";
document.body.appendChild(d);
BNK.el = d;
if (typeof backRegister === "function")
try {
backRegister({ order: 3, open: function () { return BNK.el && BNK.el.style.display !== "none"; }, close: bnkClose });
}
catch (e) { }
return d;
},
function () {
if (BNK.busy)
return Promise.resolve();
BNK.busy = true;
return Promise.all([bnkRpc("loan_board"), bnkRpc("life_me")]).then(function (r) {
if (r[0] && r[0].ok)
BNK.b = r[0];
if (r[1] && r[1].ok)
BNK.life = r[1];
if (!(r[0] && r[0].ok) && r[0] && r[0].say)
BNK.say = r[0].say;
}).then(function () { BNK.busy = false; if (BNK.open)
bnkPaint(); if (typeof lifeAfterLoad === "function")
try {
lifeAfterLoad();
}
catch (e) { } });
},
function () {
if (!BNK.open || !BNK.el)
return;
var B = BNK.b, h = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">' +
'<b style="font-size:16px;color:#E8C27A">🏦 The Bank of Somnucor</b><button class="btn" id="bnk-x" style="min-width:40px">✕</button></div>';
h += '<div style="margin:8px 0">' + bnkTabBtn("loans", "Loans") + bnkTabBtn("take", "Borrow") + bnkTabBtn("home", "A home") + bnkTabBtn("nest", "Nest egg") + bnkTabBtn("life", "Age and retirement") + bnkTabBtn("purse", "Purse") + '</div>';
if (BNK.say)
h += '<div style="background:rgba(232,194,122,.1);border-left:3px solid #E8C27A;padding:6px 10px;margin:6px 0">' + esc(BNK.say) + '</div>';
if (!(typeof signedIn === "function" && signedIn()))
h += bnkNote("Sign in to bank.");
else if (BNK.missing)
h += bnkNote("The loans desk opens as soon as the bank's new books are on the server.");
else if (!B)
h += bnkNote("Opening the books…");
else if (BNK.tab === "loans")
h += bnkLoansHtml(B);
else if (BNK.tab === "take")
h += bnkTakeHtml(B);
else if (BNK.tab === "home")
h += bnkHomeHtml(B);
else if (BNK.tab === "nest")
h += bnkNestHtml(B);
else if (BNK.tab === "life")
h += (typeof lifeHtml === "function" ? lifeHtml() : "");
else
h += bnkPurseHtml(B);
BNK.el.innerHTML = h;
var el = BNK.el, $q = function (s) { return el.querySelector(s); };
$q("#bnk-x").onclick = bnkClose;
Array.prototype.forEach.call(el.querySelectorAll("[data-bnktab]"), function (b) { b.onclick = function () { BNK.tab = b.getAttribute("data-bnktab"); BNK.say = ""; bnkPaint(); }; });
Array.prototype.forEach.call(el.querySelectorAll("[data-bnkpay]"), function (b) {
b.onclick = function () {
var id = +b.getAttribute("data-bnkpay"), all = b.getAttribute("data-all") === "1", n = null;
if (!all) {
n = Math.floor(+prompt("How much would you like to pay off now? (gold)", "") || 0);
if (n <= 0)
return;
}
else if (!confirm("Pay the whole loan off now? " + bnkG(+b.getAttribute("data-bal")) + " from your purse."))
return;
bnkRpc("loan_pay", { p_loan: id, p_gold: n }).then(function (o) { bnkSaid(o); });
};
});
if (BNK.tab === "take")
bnkTakeWire(el);
if (BNK.tab === "nest")
bnkNestWire(el);
if (BNK.tab === "life" && typeof lifeWire === "function")
lifeWire(el);
if (BNK.tab === "purse")
bnkPurseWire(el);
},
function (B) {
var s = B.score || 0;
return '<div style="display:flex;gap:14px;flex-wrap:wrap;margin:4px 0 10px">' +
'<div><span style="opacity:.7">Credit score</span><br><b style="font-size:20px;color:' + bnkScoreCol(s) + '">' + s + '</b> <span style="opacity:.8">' + bnkScoreWord(s) + '</span></div>' +
'<div><span style="opacity:.7">Income a week</span><br><b style="font-size:16px">' + bnkG(B.income) + '</b></div>' +
'<div><span style="opacity:.7">Owed each week</span><br><b style="font-size:16px">' + bnkG(B.owe) + '</b></div></div>';
},
function (B) {
var h = bnkHead(B), open = (B.loans || []).filter(function (l) { return l.status === "active"; }), shut = (B.loans || []).filter(function (l) { return l.status !== "active"; });
if (!open.length)
h += bnkNote("You owe the bank nothing on a loan. To borrow, choose <b>Borrow</b>; to buy a home with a mortgage, choose <b>A home</b>.");
open.forEach(function (l) {
h += '<div style="border-top:1px solid rgba(255,255,255,.1);padding:8px 0">' +
'<b>' + esc(BNK_KIND[l.kind] || l.kind) + '</b>' + (l.lot_name ? ' · ' + esc(l.lot_name) : '') + ' <span style="opacity:.7">at ' + l.apr + '% a year</span><br>' +
'Still owed <b>' + bnkG(l.balance) + '</b> · ' + bnkG(l.payment) + ' a week, next ' + bnkWhen(l.next_due) + ' · about ' + l.weeks_left + ' weeks left' +
(l.missed ? '<br><b style="color:#E87A6A">' + l.missed + ' week' + (l.missed === 1 ? '' : 's') + ' missed.</b> Pay at least ' + bnkG(l.payment) + ' now to catch up; at ' + (B.rules && B.rules.miss_default || 8) + ' in a row the loan defaults' + (l.kind === "mortgage" ? ' and the bank takes the home back' : '') + '.' : '') +
'<div style="margin-top:5px"><button class="btn" data-bnkpay="' + l.id + '">Pay extra</button> <button class="btn" data-bnkpay="' + l.id + '" data-all="1" data-bal="' + l.balance + '">Pay it all off (' + bnkG(l.balance) + ')</button></div></div>';
});
if (B.old_owed > 0)
h += '<div style="border-top:1px solid rgba(255,255,255,.1);padding:8px 0"><b>The old owing line</b>: ' + bnkG(B.old_owed) + ' owed. It charges interest every week. <button class="btn" id="bnk-oldpay">Repay</button></div>';
if (shut.length)
h += '<div style="margin-top:8px;opacity:.75">Lately closed: ' + shut.map(function (l) { return esc(BNK_KIND[l.kind] || l.kind) + ' (' + ({ paid: "paid off", default: "defaulted", foreclosed: "home taken back", forgiven: "forgiven" }[l.status] || l.status) + ')'; }).join(", ") + '</div>';
h += '<div style="margin-top:12px;opacity:.75;font-size:12.5px"><b>How the bank works.</b> Interest is what borrowing costs: the bank adds it to what you owe each week, and each weekly payment pays it and some of the loan. ' +
'The payment is taken from your purse every 7 days (or from your savings account if the purse is short). Paying on time raises your credit score; a missed week costs ' + bnkG(B.rules && B.rules.late_fee) + ' and lowers it. ' +
'A better score gets a lower rate. You may pay extra or pay off early at any time, with nothing more to pay.</div>';
return h;
},
function (B) {
var h = bnkHead(B), R = B.rules || {}, K = BNK.kind, r = R[K] || {};
if (!B.adult)
return h + bnkNote("The bank lends only to grown-ups (18 and over).");
if (!B.paid)
return h + bnkNote("The bank lends to dreamers whose dues are paid.");
if (BNK_YRS[K].indexOf(BNK.yrs) < 0)
BNK.yrs = BNK_YRS[K][Math.min(2, BNK_YRS[K].length - 1)];
h += '<div style="display:grid;grid-template-columns:auto 1fr;gap:8px 10px;align-items:center;margin:6px 0">' +
'<label for="bnk-kind">What for</label><select id="bnk-kind">' + ["personal", "car", "business"].map(function (k) { return '<option value="' + k + '"' + (k === K ? ' selected' : '') + '>' + BNK_KIND[k] + ' (from ' + (R[k] && R[k].apr) + '% a year)</option>'; }).join("") + '</select>' +
'<label for="bnk-amt">How much</label><input id="bnk-amt" type="number" min="500" step="100" max="' + (r.max || 40000) + '" value="' + BNK.amt + '" style="max-width:160px">' +
'<label for="bnk-yrs">Over</label><select id="bnk-yrs">' + BNK_YRS[K].map(function (y) { return '<option value="' + y + '"' + (y === BNK.yrs ? ' selected' : '') + '>' + y + ' year' + (y === 1 ? '' : 's') + ' (' + (y * 52) + ' weeks)</option>'; }).join("") + '</select></div>' +
bnkNote("The most the bank lends for a " + BNK_KIND[K].toLowerCase() + " is " + bnkG(r.max) + ". " + (K === "car" ? "The gold is yours to buy any vehicle. " : K === "business" ? "For stock, a shop, staff or tools. " : "For anything you need. ") +
"With your score (" + B.score + ") it costs " + r.apr + "% a year.") +
'<button class="btn" id="bnk-quote">See the terms</button>';
var q = BNK.q;
if (q && q.kind === K) {
h += '<div style="border:1px solid rgba(232,194,122,.35);border-radius:8px;padding:8px 10px;margin-top:10px">' +
'<b>' + bnkG(q.amount) + '</b> over ' + q.weeks + ' weeks at <b>' + q.apr + '%</b> a year<br>' +
'You pay <b>' + bnkG(q.payment) + ' a week</b>: ' + bnkG(q.total) + ' in all, of which ' + bnkG(q.interest) + ' is interest.<br>' +
(q.approved ? '<b style="color:#8FD88F">The bank says yes.</b> <button class="btn" id="bnk-take" style="margin-left:6px">Take the loan</button>'
: '<b style="color:#E8A06A">The bank cannot lend that.</b> ' + esc(q.why || "")) + '</div>';
}
return h;
},
function (el) {
var k = el.querySelector("#bnk-kind"), a = el.querySelector("#bnk-amt"), y = el.querySelector("#bnk-yrs");
if (!k)
return;
var read = function () { BNK.kind = k.value; BNK.amt = Math.floor(+a.value || 0); BNK.yrs = +y.value || 1; };
k.onchange = function () { read(); BNK.q = null; bnkPaint(); };
y.onchange = function () { read(); BNK.q = null; };
a.onchange = function () { read(); BNK.q = null; };
el.querySelector("#bnk-quote").onclick = function () {
read();
bnkRpc("loan_quote", { p_kind: BNK.kind, p_amount: BNK.amt, p_weeks: BNK.yrs * 52 }).then(function (o) {
if (o && o.ok) {
BNK.q = o;
BNK.say = "";
}
else {
BNK.q = null;
BNK.say = (o && o.say) || "Not now.";
}
bnkPaint();
});
};
var t = el.querySelector("#bnk-take");
if (t)
t.onclick = function () {
var q = BNK.q;
if (!q)
return;
if (!confirm("Take a " + BNK_KIND[q.kind].toLowerCase() + " of " + bnkG(q.amount) + "? " + bnkG(q.payment) + " will be taken every week for " + q.weeks + " weeks."))
return;
bnkRpc("loan_take", { p_kind: q.kind, p_amount: q.amount, p_weeks: q.weeks }).then(function (o) { BNK.q = null; if (o && o.ok)
BNK.tab = "loans"; bnkSaid(o); });
};
},
function (B) {
var R = B.rules || {}, m = R.mortgage || {};
var h = bnkHead(B) + '<b>A mortgage</b> is a loan to buy a home, paid back over 5 to 30 years. The home is yours to live in from the first day; ' +
'it cannot be sold until the mortgage is paid off, and if ' + (R.miss_default || 8) + ' weekly payments in a row are missed, the bank takes it back.' +
bnkNote("With your score it costs " + m.apr + "% a year. You put down at least " + R.down_min + " in every 100 of the price, and all you owe each week (with the mortgage) may be up to " + R.mortgage_dti + " in every 100 of your income.") +
'<div style="margin:8px 0"><b>To buy:</b> go to the Land Office in the Civic Ring, open the counter, and press <b>Buy with a mortgage</b> by the home you want. The bank will show you the payment before you agree.</div>';
var hm = (B.loans || []).filter(function (l) { return l.kind === "mortgage" && l.status === "active"; });
if (hm.length)
h += '<div style="margin-top:6px">Your mortgage' + (hm.length > 1 ? 's' : '') + ': ' + hm.map(function (l) { return esc(l.lot_name || "a home") + ', ' + bnkG(l.balance) + ' still owed'; }).join("; ") + '.</div>';
var room = Math.floor((B.income || 0) * (R.mortgage_dti || 50) / 100) - (B.owe || 0), r = (m.apr || 7) / 100 / 52, n = 1560;
if (room > 0 && r > 0) {
var most = Math.floor(room * (1 - Math.pow(1 + r, -n)) / r / 1000) * 1000;
h += bnkNote("A guide: on your income, the bank could lend up to about " + bnkG(most) + " over 30 years (" + bnkG(room) + " a week). Homes on the market cost real prices.");
}
else
h += bnkNote("The bank needs to see an income before it lends: a job, or a pension.");
return h;
},
function (B) {
var N = B.nest || { gold: 0, auto: 0 }, L = BNK.life || {};
var h = '<b>Your nest egg</b> is retirement savings at the bank. It earns ' + (L.nest_apr || 6) + '% a year, added every week. ' +
'Take it out whenever you like; before your character is 60, ' + ((L && L.nest_early) || 10) + ' in every 100 is kept back.' +
'<div style="font-size:20px;margin:8px 0">' + bnkG(N.gold) + '</div>' +
'<div class="row" style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="bnk-nin">Pay in</button><button class="btn" id="bnk-nout">Take out</button></div>' +
'<div style="margin-top:12px"><label for="bnk-auto">Put a part of every wage in by itself:</label> <select id="bnk-auto">' +
[0, 3, 5, 6, 8, 10, 12, 15].map(function (p) { return '<option value="' + p + '"' + (p === (N.auto || 0) ? ' selected' : '') + '>' + (p ? p + ' in every 100' : 'nothing') + '</option>'; }).join("") + '</select></div>' +
bnkNote("Real savers often put 5 to 15 in every 100 of their pay aside for when they stop working. Your Somnucor Pension comes on top of this (see Age and retirement).");
return h;
},
function (el) {
var i = el.querySelector("#bnk-nin"), o = el.querySelector("#bnk-nout"), a = el.querySelector("#bnk-auto");
if (i)
i.onclick = function () { var n = Math.floor(+prompt("How much gold to put in your nest egg?", "") || 0); if (n > 0)
bnkRpc("nest_move", { p_gold: n }).then(function (r) { bnkSaid(r); }); };
if (o)
o.onclick = function () { var n = Math.floor(+prompt("How much gold to take out of your nest egg?", "") || 0); if (n > 0)
bnkRpc("nest_move", { p_gold: -n }).then(function (r) { bnkSaid(r); }); };
if (a)
a.onchange = function () { bnkRpc("nest_auto", { p_pct: +a.value }).then(function (r) { bnkSaid(r); }); };
},
function (B) {
var S = (typeof standing !== "undefined" && standing) || {};
return '<div>In your purse: <b>' + bnkG(S.gold) + '</b> · in your savings account: <b>' + bnkG(S.saved) + '</b>' + (S.owed ? ' · owing: <b style="color:#E8A06A">' + bnkG(S.owed) + '</b>' : '') + '</div>' +
'<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button class="btn" id="bnk-in">Pay in</button><button class="btn" id="bnk-out">Draw out</button>' +
(S.owed ? '<button class="btn" id="bnk-rep">Repay the owing line</button>' : '') + '<button class="btn" id="bnk-int">Interest</button></div>' +
bnkNote("Your savings account earns a little interest and pays a loan when your purse is short. Buying and selling gold for real money is in Settings, The bank.");
},
function (el) {
var f = function (id, fn) { var b = el.querySelector(id); if (b)
b.onclick = fn; };
f("#bnk-in", function () { var n = Math.floor(+prompt("How much to pay into your savings account?") || 0); if (n > 0 && typeof bankDeposit === "function")
bankDeposit(n).then(function () { bnkPaint(); }); });
f("#bnk-out", function () { var n = Math.floor(+prompt("How much to draw out?") || 0); if (n > 0 && typeof bankWithdraw === "function")
bankWithdraw(n).then(function () { bnkPaint(); }); });
f("#bnk-rep", function () { var n = Math.floor(+prompt("How much to repay?") || 0); if (n > 0 && typeof bankRepay === "function")
bankRepay(n).then(function () { bnkLoad(); }); });
f("#bnk-int", function () { if (typeof bankSettle === "function")
bankSettle().then(function () { bnkPaint(); }); });
},
function () {
var M = BNK.mort;
if (!M)
return;
var el = bnkBox();
el.style.display = "block";
BNK.open = false;
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
var q = M.q, h = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font-size:16px;color:#E8C27A">🏦 A mortgage from the Bank of Somnucor</b><button class="btn" id="bnk-mx" style="min-width:40px">✕</button></div>';
if (!q)
h += bnkNote("Asking the bank…");
else if (q.ok === false && q.price == null)
h += '<div style="margin-top:8px">' + esc(q.say || "The bank cannot lend on that.") + '</div>';
else {
h += '<div style="margin:8px 0"><b>' + esc(q.name || "This home") + '</b> costs <b>' + bnkG(q.price) + '</b>. You have ' + bnkG(q.purse) + ' in your purse.</div>' +
'<div style="display:grid;grid-template-columns:auto 1fr;gap:8px 10px;align-items:center">' +
'<label for="bnk-down">Down payment</label><input id="bnk-down" type="number" min="' + q.down_min + '" step="500" value="' + (M.down != null ? M.down : q.down_min) + '" style="max-width:160px">' +
'<label for="bnk-myrs">Over</label><select id="bnk-myrs">' + [5, 10, 15, 20, 25, 30].map(function (y) { return '<option value="' + y + '"' + (y === M.yrs ? ' selected' : '') + '>' + y + ' years</option>'; }).join("") + '</select></div>' +
bnkNote("At least " + bnkG(q.down_min) + " down. The more you put down, the less you borrow and the less interest you pay.") +
'<button class="btn" id="bnk-mq">See the terms</button>';
if (q.payment) {
h += '<div style="border:1px solid rgba(232,194,122,.35);border-radius:8px;padding:8px 10px;margin-top:10px">' +
'The bank lends <b>' + bnkG(q.amount) + '</b> at <b>' + q.apr + '%</b> a year over ' + q.weeks + ' weeks.<br>' +
'You pay <b>' + bnkG(q.payment) + ' a week</b>: ' + bnkG(q.total) + ' in all (' + bnkG(q.interest) + ' interest).<br>' +
(q.can ? '<b style="color:#8FD88F">The bank says yes.</b> <button class="btn" id="bnk-mbuy" style="margin-left:6px">Buy it with this mortgage</button>'
: '<b style="color:#E8A06A">Not yet.</b> ' + esc(q.say || q.why || "")) + '</div>';
}
}
el.innerHTML = h;
el.querySelector("#bnk-mx").onclick = function () { BNK.mort = null; bnkClose(); };
var d = el.querySelector("#bnk-down"), y = el.querySelector("#bnk-myrs");
var read = function () { if (d)
M.down = Math.floor(+d.value || 0); if (y)
M.yrs = +y.value || 30; };
var mq = el.querySelector("#bnk-mq");
if (mq)
mq.onclick = function () { read(); bnkRpc("mortgage_quote", { p_lot: M.lot, p_down: M.down, p_weeks: M.yrs * 52 }).then(function (o) { M.q = o; bnkMortPaint(); }); };
var mb = el.querySelector("#bnk-mbuy");
if (mb)
mb.onclick = function () {
var q2 = M.q;
if (!confirm("Buy " + (q2.name || "this home") + " for " + bnkG(q2.price) + "? " + bnkG(q2.down) + " down now, then " + bnkG(q2.payment) + " every week for " + q2.weeks + " weeks."))
return;
bnkRpc("mortgage_buy", { p_lot: M.lot, p_down: q2.down, p_weeks: q2.weeks }).then(function (o) {
if (typeof setStatus === "function")
setStatus(o && o.ok ? "<b>" + esc(o.say) + "</b>" : esc((o && o.say) || "Not now."));
if (o && o.ok) {
BNK.mort = null;
bnkClose();
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
if (typeof lotsAt !== "undefined")
lotsAt = 0;
if (typeof loadLots === "function")
try {
loadLots();
}
catch (e) { }
if (typeof WR !== "undefined") {
WR.at = 0;
if (typeof wrLoad === "function")
wrLoad(true);
}
}
else {
M.q = Object.assign({}, M.q, { can: false, say: (o && o.say) || "Not now." });
bnkMortPaint();
}
});
};
},
function () {
var d = BNK.life || LIFE.d;
if (!d)
return bnkNote("Looking you up…");
var h = '<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:baseline"><div><span style="opacity:.7">Your character is</span><br><b style="font-size:26px">' + d.age + '</b></div>';
if (d.young)
return h + '</div>' + bnkNote("Young players are always their own age in the game. Retirement is a very long way off!");
h += '<div style="opacity:.85">' + (d.on ? 'A city year passes every ' + (+d.year_days) + ' real days.' + (d.next_birthday ? ' Next birthday ' + bnkWhen(d.next_birthday) + '.' : '') : 'The city\'s years are standing still for now.') + '</div></div>';
if (!d.chosen && !d.retired)
h += '<div style="margin:10px 0;padding:8px 10px;border:1px solid rgba(232,194,122,.35);border-radius:8px">' +
'You may choose your character\'s age, once: <input id="life-age" type="number" min="18" max="90" value="' + d.age + '" style="width:70px"> <button class="btn" id="life-set">Set my age</button>' +
'<div style="opacity:.72;font-size:12.5px;margin-top:4px">' + (d.real ? 'It starts at your own age (' + d.real + ').' : 'It starts at 25.') + ' After that they grow older with the city, and it cannot be changed.</div></div>';
h += '<label style="display:flex;gap:8px;align-items:center;margin:8px 0"><input type="checkbox" id="life-grey"' + (d.grey ? ' checked' : '') + '> Let my hair grey with the years</label>';
h += '<div style="border-top:1px solid rgba(255,255,255,.1);margin-top:8px;padding-top:8px"><b>Retirement</b><br>';
if (d.retired) {
h += 'You retired ' + (d.retired_at ? new Date(d.retired_at).toLocaleDateString() : '') + '. Your Somnucor Pension is <b>' + bnkG(d.pension) + ' a week</b>, next ' + bnkWhen(d.pension_next) +
' (it waits while you hold a job).';
}
else {
h += 'The Somnucor Pension is worked out from all you have earned in wages: 1 gold a week for every 100 earned, up to 1,200 a week. ' +
'Retire from <b>' + d.early_age + '</b> for a smaller pension, or from <b>' + d.retire_age + '</b> for the full one. Retiring leaves every job.<br>' +
'If you retired today: <b>' + bnkG(d.pension_now) + ' a week</b>' + (d.age < d.retire_age ? ' (at ' + d.retire_age + ': ' + bnkG(d.pension_full) + ')' : '') + '.';
if (d.age >= d.early_age || d.keeper)
h += '<div style="margin-top:6px"><button class="btn" id="life-retire">Retire now</button></div>';
else
h += '<div style="opacity:.72;font-size:12.5px;margin-top:4px">' + (d.early_age - d.age) + ' more years until you can retire.</div>';
}
h += '<div style="margin-top:8px">Nest egg: <b>' + bnkG(d.nest) + '</b> <button class="btn" data-bnktab="nest">Nest egg</button></div>';
h += '<div style="margin-top:8px"><b>Willow Grove Retirement Center</b> (the Commons): ' +
(d.suite ? 'you live in suite ' + d.suite.n + ', ' + bnkG(d.suite_fee) + ' a week, next ' + bnkWhen(d.suite.next) + '. <button class="btn" id="life-leave">Give up the suite</button>'
: 'suites for dreamers of ' + d.early_age + ' and over, ' + bnkG(d.suite_fee) + ' a week with meals (' + Math.max(0, d.suites - d.suites_taken) + ' free).' +
((d.age >= d.early_age || d.keeper) ? ' <button class="btn" id="life-suite">Take a suite</button>' : '')) + '</div>';
return h + '</div>';
},
function (el) {
var f = function (id, fn) { var b = el.querySelector(id); if (b)
b.onclick = fn; };
f("#life-set", function () {
var n = Math.floor(+el.querySelector("#life-age").value || 0);
if (!confirm("Set your character's age to " + n + "? This can be done only once."))
return;
bnkRpc("life_set_age", { p_age: n }).then(function (o) { lifeSaid(o); });
});
var g = el.querySelector("#life-grey");
if (g)
g.onchange = function () { bnkRpc("life_grey", { p_on: g.checked }).then(function (o) { lifeSaid(o); }); };
f("#life-retire", function () {
var d = BNK.life || {};
if (!confirm("Retire now? You will leave every job, and the Somnucor Pension of " + bnkG(d.pension_now) + " a week starts."))
return;
bnkRpc("retire_now").then(function (o) { lifeSaid(o); });
});
f("#life-suite", function () {
var d = BNK.life || {};
if (!confirm("Take a suite at Willow Grove for " + bnkG(d.suite_fee) + " a week (the first week now)?"))
return;
bnkRpc("retire_suite", { p_in: true }).then(function (o) { lifeSaid(o); });
});
f("#life-leave", function () { if (!confirm("Give up your suite at Willow Grove?"))
return; bnkRpc("retire_suite", { p_in: false }).then(function (o) { lifeSaid(o); }); });
},
function () {
var d = LIFE.d, key = d ? (d.grey ? Math.round(lifeGreyAt(d.age_exact || d.age) * 20) : 0) : 0;
if (key === LIFE.lk)
return;
LIFE.lk = key;
if (LIFE.lk0 === undefined) {
LIFE.lk0 = key;
if (!key)
return;
}
try {
if (typeof rebuildMe === "function" && typeof meG !== "undefined" && meG)
rebuildMe();
}
catch (e) { }
try {
if (typeof PUB_LOOK !== "undefined")
PUB_LOOK.look = null;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
},
function (K) {
var W = K.W, put = K.put, PI = Math.PI;
put("wgvdesk", 0, K.B + 4.0, 0);
K.staff("Care home receptionist", 0, K.B + 3.2, 0);
put("wgvpedestal", -2.4, K.B + 4.2, 0);
put("wgvpedestal", 2.4, K.B + 4.2, 0);
put("wgvboard", 3.2, K.B + 0.08, 0);
put("trwallmap", -3.2, K.B + 0.1, 0);
put("wgvgfclock", -5.4, K.B + 0.3, 0);
put("wgvfish", 6.2, K.B + 0.3, 0);
put("wgvcurio", -7.6, K.B + 0.3, 0);
put("wgvsconce", -1.6, K.B + 0.02, 0);
put("wgvsconce", 1.6, K.B + 0.02, 0);
put("wgvphotos", 9.4, K.B + 0.04, 0);
var lx = K.L, lz = K.B + 9;
put("wgvhearth", lx + 0.35, lz, PI / 2);
put("wgvflamp", lx + 0.5, lz - 1.7, 0);
put("wgvflamp", lx + 0.5, lz + 1.7, 0);
put("wgvsofa", lx + 5.4, lz, -PI / 2);
put("wgvside", lx + 5.5, lz - 1.75, 0);
put("wgvside", lx + 5.5, lz + 1.75, 0);
put("wgvcoffee", lx + 3.3, lz, PI / 2);
put("wgvwing", lx + 3.0, lz - 2.4, 0.35);
put("wgvwingk", lx + 3.0, lz + 2.6, PI - 0.35);
K.staff("Resident", lx + 3.0, lz - 2.0, 0.35);
K.staff("Resident", lx + 5.0, lz - 0.5, -PI / 2);
K.staff("Resident", lx + 3.0, lz + 2.2, PI - 0.35);
put("wgvpiano", lx + 0.75, lz + 5.4, PI / 2);
put("wgvrocker", lx + 3.6, lz + 5.6, -PI / 2 - 0.5);
put("wgvtrolley", lx + 7.2, lz + 2.6, -PI / 2);
put("wgvbooks", lx + 0.25, lz - 4.4, PI / 2);
put("wgvbird", lx + 7.0, lz - 4.2, 0);
put("wgvsconce", lx + 0.02, lz - 3.0, PI / 2);
put("wgvsconce", lx + 0.02, lz + 3.0, PI / 2);
var rx = K.R, rz = K.B + 8;
put("tv", rx - 0.4, rz, -PI / 2);
put("wgvsofa", rx - 5.2, rz, PI / 2);
put("wgvcoffee", rx - 3.2, rz, PI / 2);
put("wgvwingg", rx - 3.4, rz - 2.5, -PI / 2 - 0.6);
put("wgvwing", rx - 3.4, rz + 2.5, -PI / 2 + 0.6);
put("wgvside", rx - 5.3, rz - 1.75, 0);
put("wgvside", rx - 5.3, rz + 1.75, 0);
put("wgvflamp", rx - 0.5, rz - 1.6, 0);
put("wgvflamp", rx - 0.5, rz + 1.6, 0);
K.staff("Resident", rx - 5.0, rz + 0.4, PI / 2);
K.staff("Resident", rx - 3.4, rz + 2.2, -PI / 2 + 0.6);
put("wgvjigsaw", rx - 3.4, rz + 6.4, 0);
put("wgvjigsaw", rx - 7.4, rz + 6.4, 0);
K.staff("Resident", rx - 3.4, rz + 5.8, 0);
K.staff("Resident", rx - 7.4, rz + 7.0, PI);
put("wgvbooks", rx - 0.25, rz - 4.4, -PI / 2);
put("wgvphotos", rx - 0.04, rz + 5.0, -PI / 2);
put("wgvsconce", rx - 0.02, rz - 3.0, -PI / 2);
put("wgvsconce", rx - 0.02, rz + 3.0, -PI / 2);
put("wgvcoat", K.R - 1.0, K.Fz - 1.0, PI);
put("wgwheelchair", K.L + 1.2, K.Fz - 1.2, 0);
put("wgwheelchair", K.L + 2.1, K.Fz - 1.2, 0);
put("wgvpedestal", -2.6, K.Fz - 1.0, 0);
put("wgvpedestal", 2.6, K.Fz - 1.0, 0);
put("wgvwingg", K.L + 4.6, K.Fz - 1.6, PI);
put("wgvside", K.L + 5.8, K.Fz - 1.2, 0);
put("plant", K.L + 0.8, K.B + 0.8, 0);
put("plant", K.R - 0.8, K.B + 0.8, 0);
put("chandelier", -W / 4, (K.B + K.Fz) / 2, 0);
put("chandelier", W / 4, (K.B + K.Fz) / 2, 0);
put("chandelier", 0, (K.B + K.Fz) / 2 + 2, 0);
put("painting", K.R - 0.08, K.B + 12.5, -PI / 2);
put("painting", K.L + 0.08, K.B + 12.5, PI / 2);
K.staff("Care aide", -1.5, K.Fz - 5, 0);
K.staff("Care home nurse", 2.5, K.B + 6.5, PI);
K.spot(0, K.B + 6, "reception");
K.spot(lx + 4, lz, "the lounge");
K.spot(rx - 6, rz + 4, "the card tables");
},
function () {
if (Date.now() - WGV.at > 60000 || !WGV.folk) {
WGV.at = Date.now();
var D = (typeof TLV !== "undefined" && TLV.d) || null;
WGV.folk = D ? (D.people || []).filter(function (p) { return p.st === "retired"; }).sort(function (a, b) { return a.id - b.id; }) : [];
if (D === null && typeof tlvLoad === "function")
try {
tlvLoad(false);
}
catch (e) { }
}
return WGV.folk;
},
function (again) {
if (!again && typeof LIFE !== "undefined" && !LIFE.d && typeof lifeLoad === "function") {
lifeLoad(true).then(function () { wgvDesk(true); });
return;
}
var d = (typeof LIFE !== "undefined" && LIFE.d) || null, F = wgvFolk();
var rows = [["Your age, your pension and your suite", d ? (d.young ? "Young visitors are very welcome!" : "Your character is " + d.age + (d.suite ? ", in suite " + d.suite.n : "") + ".") : "", function () { if (typeof gapClose === "function")
gapClose(); bnkOpen("life"); }, "Open"]];
if (d && !d.young && !d.suite && (d.age >= d.early_age || d.keeper))
rows.push(["Take a suite", "From " + bnkG(d.suite_fee) + " a week, meals included", function () { if (typeof gapClose === "function")
gapClose(); bnkOpen("life"); }, "See"]);
rows.push(["Who lives here", F.length ? F.slice(0, 24).map(function (p) { return esc(p.n) + " (" + p.age + ")"; }).join(", ") + (F.length > 24 ? " and " + (F.length - 24) + " more" : "") : "The city's retired folk, as they retire.", null]);
if (typeof gapChoices === "function")
gapChoices("Willow Grove Retirement Center", "Welcome! Suites for dreamers of 62 and over, three good meals a day, nurses day and night, a chapel, a gym and plenty to do. Visitors are always welcome in the lounge.", rows);
else
bnkOpen("life");
},
function () {
if (typeof gapChoices === "function")
gapChoices("What's on today at Willow Grove", "", [["9:30 Morning prayers", "The chapel", null], ["10:30 Chair exercises", "The activity room", null], ["12:00 Lunch", "The dining room", null],
["2:00 Bingo", "The activity room", null], ["4:00 Tea and cake", "The lounge", null], ["6:00 Supper", "The dining room", null], ["7:30 Sing-along", "At the lounge piano: press E there to play", null]]);
},
function () {
if (typeof TLV_TUNES === "undefined" || typeof tlvTunePlay !== "function") {
setStatus("The piano is a little out of tune today.");
return;
}
if (typeof gapChoices === "function")
gapChoices("An old tune at the piano", "Everyone in the lounge joins in. You hear it on your own device.", TLV_TUNES.map(function (t) { return [esc(t.n), esc(t.by), function () { tlvTunePlay(t.k); setStatus("🎹 <b>" + esc(t.n) + "</b> on the lounge piano."); }, "Play"]; }));
},
function (label) {
var l = String(label || "").toLowerCase();
if (/^dining/.test(l))
return "dining";
if (/^suite/.test(l))
return "suite";
if (/library|television|activity|salon/.test(l))
return /salon|activity/.test(l) ? "suite" : "green";
if (/chapel/.test(l))
return "chapel";
if (/director/.test(l))
return "green";
if (/physio/.test(l))
return "care";
return null;
},
function (id, w, h, draw, wrap) {
var t = (typeof ghrTex === "function") ? ghrTex(id, w, h, draw) : (function () { var c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); return new THREE.CanvasTexture(c); })();
if (wrap && t.wrapS !== THREE.RepeatWrapping) {
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.needsUpdate = true;
}
try {
if (typeof renderer !== "undefined" && renderer.capabilities)
t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
return t;
},
function (x, cx, cy, s, col) {
x.save();
x.translate(cx, cy);
x.fillStyle = col;
x.strokeStyle = col;
x.lineWidth = Math.max(1.5, s * 0.035);
for (var side = -1; side <= 1; side += 2) {
x.save();
x.scale(side, 1);
x.beginPath();
x.moveTo(0, -s * 0.55);
x.bezierCurveTo(s * 0.32, -s * 0.42, s * 0.36, -s * 0.12, s * 0.14, s * 0.02);
x.bezierCurveTo(s * 0.34, s * 0.14, s * 0.3, s * 0.4, 0, s * 0.55);
x.stroke();
x.beginPath();
x.moveTo(s * 0.14, -s * 0.18);
x.bezierCurveTo(s * 0.42, -s * 0.3, s * 0.5, s * 0.0, s * 0.3, s * 0.06);
x.bezierCurveTo(s * 0.22, s * 0.08, s * 0.2, -s * 0.04, s * 0.28, -s * 0.06);
x.stroke();
x.beginPath();
x.ellipse(s * 0.2, s * 0.32, s * 0.07, s * 0.13, 0.5, 0, Math.PI * 2);
x.fill();
x.beginPath();
x.ellipse(s * 0.12, -s * 0.36, s * 0.05, s * 0.1, -0.5, 0, Math.PI * 2);
x.fill();
x.restore();
}
x.beginPath();
x.ellipse(0, 0, s * 0.09, s * 0.2, 0, 0, Math.PI * 2);
x.fill();
x.beginPath();
x.arc(0, -s * 0.62, s * 0.05, 0, Math.PI * 2);
x.fill();
x.beginPath();
x.arc(0, s * 0.62, s * 0.05, 0, Math.PI * 2);
x.fill();
x.restore();
},
function (x, cx, cy, s, S) {
x.save();
x.translate(cx, cy);
x.strokeStyle = S.gold;
x.lineWidth = 2;
x.beginPath();
x.moveTo(0, s * 0.5);
x.quadraticCurveTo(s * 0.2, 0, 0, -s * 0.2);
x.stroke();
x.fillStyle = S.gold;
[[0.12, 0.25, 0.6], [-0.08, 0.1, -0.6]].forEach(function (l) { x.beginPath(); x.ellipse(l[0] * s, l[1] * s, s * 0.12, s * 0.05, l[2], 0, Math.PI * 2); x.fill(); });
x.fillStyle = S.ink;
for (var p = 0; p < 5; p++) {
var a = p * Math.PI * 2 / 5;
x.beginPath();
x.arc(Math.cos(a) * s * 0.13, -s * 0.28 + Math.sin(a) * s * 0.13, s * 0.1, 0, Math.PI * 2);
x.fill();
}
x.fillStyle = "#F6E2A0";
x.beginPath();
x.arc(0, -s * 0.28, s * 0.06, 0, Math.PI * 2);
x.fill();
x.restore();
},
function (k) {
var S = WGV_STYLE[k];
return wgvCanvas("wgv-paper-" + k, 512, 1024, function (x, W, H) {
var M = H / 3.7, Y = function (m) { return H - m * M; };
x.fillStyle = S.paper;
x.fillRect(0, 0, W, H);
var top = Y(3.34), bot = Y(0.99);
if (S.kind === "damask") {
for (var r = 0; r * 150 < bot - top + 150; r++)
for (var c = 0; c < 5; c++) {
var cx = c * 128 + (r % 2 ? 64 : 0), cy = top + 60 + r * 150;
if (cy < bot - 20 && cy > top + 10)
wgvDamask(x, cx, cy, 96, S.ink);
}
x.globalAlpha = 0.5;
for (var r2 = 0; r2 * 150 < bot - top; r2++)
for (var c2 = 0; c2 < 5; c2++) {
var dx = c2 * 128 + (r2 % 2 ? 0 : 64), dy = top + 135 + r2 * 150;
if (dy < bot - 20) {
x.fillStyle = S.gold;
x.beginPath();
x.arc(dx, dy, 4, 0, Math.PI * 2);
x.fill();
}
}
x.globalAlpha = 1;
}
else if (S.kind === "stripe") {
for (var sx = 0; sx < W; sx += 64) {
x.fillStyle = S.ink;
x.fillRect(sx, top, 26, bot - top);
x.fillStyle = S.gold;
x.fillRect(sx + 30, top, 2, bot - top);
x.fillRect(sx + 58, top, 2, bot - top);
}
x.globalAlpha = 0.35;
for (var sy = top + 40; sy < bot; sy += 90)
for (var sx2 = 13; sx2 < W; sx2 += 64)
wgvDamask(x, sx2, sy, 26, S.gold);
x.globalAlpha = 1;
}
else if (S.kind === "sprig") {
for (var r3 = 0; r3 * 110 < bot - top; r3++)
for (var c3 = 0; c3 < 5; c3++) {
var fx = c3 * 102 + (r3 % 2 ? 51 : 0) + 20, fy = top + 50 + r3 * 110;
if (fy < bot - 30)
wgvSprig(x, fx, fy, 64, S);
}
x.strokeStyle = "rgba(216,144,154,0.25)";
x.lineWidth = 2;
for (var sx3 = 0; sx3 < W; sx3 += 102) {
x.beginPath();
x.moveTo(sx3 + 1, top);
x.lineTo(sx3 + 1, bot);
x.stroke();
}
}
else if (S.kind === "stone") {
x.strokeStyle = S.ink;
x.lineWidth = 3;
for (var ry = top; ry < bot; ry += 70) {
x.beginPath();
x.moveTo(0, ry);
x.lineTo(W, ry);
x.stroke();
var off = ((ry - top) / 70) % 2 ? 0 : 128;
for (var bx = off; bx < W; bx += 256) {
x.beginPath();
x.moveTo(bx, ry);
x.lineTo(bx, ry + 70);
x.stroke();
}
}
x.fillStyle = S.gold;
x.fillRect(0, top + 10, W, 6);
x.globalAlpha = 0.6;
for (var gx = 32; gx < W; gx += 64)
wgvDamask(x, gx, top + 40, 30, S.gold);
x.globalAlpha = 1;
}
else {
x.fillStyle = S.ink;
x.fillRect(0, Y(1.4), W, 4);
}
wgvNoise(x, W, H, 0.035, hash("wgv" + k));
x.fillStyle = S.trim;
x.fillRect(0, 0, W, top);
[[0.0, 0.5], [0.08, 0.22], [0.16, 0.08], [0.24, 0.3]].forEach(function (b) { x.fillStyle = "rgba(0,0,0," + (b[1] * 0.35) + ")"; x.fillRect(0, Y(3.7 - b[0]) + 0, W, Math.max(2, M * 0.03)); });
x.fillStyle = "rgba(0,0,0,0.22)";
x.fillRect(0, top - 5, W, 5);
x.fillStyle = "rgba(255,255,255,0.6)";
x.fillRect(0, top - 9, W, 3);
for (var dd = 8; dd < W; dd += 24) {
x.fillStyle = "rgba(0,0,0,0.12)";
x.fillRect(dd, top - 26, 10, 14);
}
x.fillStyle = S.trim;
x.fillRect(0, bot, W, Y(0.92) - bot);
x.fillStyle = "rgba(255,255,255,0.45)";
x.fillRect(0, bot + 2, W, 3);
x.fillStyle = "rgba(0,0,0,0.3)";
x.fillRect(0, Y(0.92) - 4, W, 4);
var pt = Y(0.92), pb = Y(0.16);
x.fillStyle = S.pane;
x.fillRect(0, pt, W, pb - pt);
if (S.kind !== "plain" && S.kind !== "stone")
for (var px = 0; px < W; px += 128) {
var l = px + 14, rr = px + 114, t2 = pt + 18, b2 = pb - 16;
x.fillStyle = "rgba(0,0,0,0.16)";
x.fillRect(l, t2, rr - l, 3);
x.fillRect(l, t2, 3, b2 - t2);
x.fillStyle = "rgba(255,255,255,0.35)";
x.fillRect(l, b2 - 3, rr - l, 3);
x.fillRect(rr - 3, t2, 3, b2 - t2);
x.fillStyle = "rgba(0,0,0,0.06)";
x.fillRect(l + 12, t2 + 12, rr - l - 24, b2 - t2 - 24);
}
x.fillStyle = S.skirt;
x.fillRect(0, pb, W, H - pb);
x.fillStyle = "rgba(255,255,255,0.25)";
x.fillRect(0, pb, W, 3);
x.fillStyle = "rgba(0,0,0,0.3)";
x.fillRect(0, pb + 10, W, 2);
}, true);
},
function () {
if (wgvCeilMat.m)
return wgvCeilMat.m;
var t = wgvCanvas("wgv-ceil", 256, 256, function (x, W, H) {
x.fillStyle = "#F6F2EA";
x.fillRect(0, 0, W, H);
wgvNoise(x, W, H, 0.03, 11);
x.fillStyle = "rgba(0,0,0,0.12)";
x.fillRect(0, 0, W, 10);
x.fillRect(0, 0, 10, H);
x.fillStyle = "rgba(255,255,255,0.7)";
x.fillRect(10, 10, W - 10, 3);
x.fillRect(10, 10, 3, H - 10);
x.strokeStyle = "rgba(0,0,0,0.13)";
x.lineWidth = 3;
x.strokeRect(40, 40, W - 70, H - 70);
x.strokeStyle = "rgba(255,255,255,0.8)";
x.lineWidth = 2;
x.strokeRect(43, 43, W - 76, H - 76);
x.strokeStyle = "rgba(150,120,70,0.25)";
x.lineWidth = 2;
x.beginPath();
x.arc(W / 2 + 5, H / 2 + 5, 30, 0, Math.PI * 2);
x.stroke();
x.beginPath();
x.arc(W / 2 + 5, H / 2 + 5, 18, 0, Math.PI * 2);
x.stroke();
}, true);
t.repeat.set(1, 1);
return (wgvCeilMat.m = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }));
},
function (k) {
if (k === "runner")
return wgvCanvas("wgv-runner", 256, 256, function (x, W, H) {
x.fillStyle = "#6E1E26";
x.fillRect(0, 0, W, H);
wgvNoise(x, W, H, 0.05, 3);
x.fillStyle = "#C9A65A";
x.fillRect(10, 0, 6, H);
x.fillRect(W - 16, 0, 6, H);
x.fillStyle = "#1F3A30";
x.fillRect(22, 0, 22, H);
x.fillRect(W - 44, 0, 22, H);
x.fillStyle = "#C9A65A";
for (var y = 8; y < H; y += 32) {
x.beginPath();
x.moveTo(33, y);
x.lineTo(40, y + 8);
x.lineTo(33, y + 16);
x.lineTo(26, y + 8);
x.fill();
x.beginPath();
x.moveTo(W - 33, y);
x.lineTo(W - 26, y + 8);
x.lineTo(W - 33, y + 16);
x.lineTo(W - 40, y + 8);
x.fill();
}
x.save();
x.translate(W / 2, H / 2);
x.fillStyle = "#2C4A3C";
x.beginPath();
x.moveTo(0, -110);
x.lineTo(70, 0);
x.lineTo(0, 110);
x.lineTo(-70, 0);
x.fill();
x.fillStyle = "#D9B870";
x.beginPath();
x.moveTo(0, -70);
x.lineTo(44, 0);
x.lineTo(0, 70);
x.lineTo(-44, 0);
x.fill();
x.restore();
wgvDamask(x, W / 2, H / 2, 60, "#7A2028");
}, true);
if (k === "suite")
return wgvCanvas("wgv-carpet-suite", 256, 256, function (x, W, H) {
x.fillStyle = "#C9A79C";
x.fillRect(0, 0, W, H);
wgvNoise(x, W, H, 0.07, 5);
x.strokeStyle = "rgba(255,240,230,0.35)";
x.lineWidth = 3;
for (var i = -W; i < W * 2; i += 64) {
x.beginPath();
x.moveTo(i, 0);
x.lineTo(i + H, H);
x.stroke();
x.beginPath();
x.moveTo(i, H);
x.lineTo(i + H, 0);
x.stroke();
}
x.fillStyle = "rgba(140,90,90,0.4)";
for (var a = 0; a < W; a += 64)
for (var b = 0; b < H; b += 64) {
x.beginPath();
x.arc(a + 32, b + 32, 5, 0, Math.PI * 2);
x.fill();
}
}, true);
if (k === "green")
return wgvCanvas("wgv-carpet-green", 256, 256, function (x, W, H) {
x.fillStyle = "#2E4636";
x.fillRect(0, 0, W, H);
wgvNoise(x, W, H, 0.06, 9);
for (var a = 0; a < W; a += 128)
for (var b = 0; b < H; b += 128) {
wgvDamask(x, a + 64, b + 64, 44, "rgba(200,168,96,0.55)");
}
}, true);
return wgvCanvas("wgv-carpet-hall", 1024, 1024, function (x, W, H) {
x.fillStyle = "#6A1C24";
x.fillRect(0, 0, W, H);
wgvNoise(x, W, H, 0.05, 21);
x.fillStyle = "#1E3A2E";
x.fillRect(40, 40, W - 80, H - 80);
x.fillStyle = "#C9A65A";
x.fillRect(56, 56, W - 112, 8);
x.fillRect(56, H - 64, W - 112, 8);
x.fillRect(56, 56, 8, H - 112);
x.fillRect(W - 64, 56, 8, H - 112);
for (var i = 90; i < W - 90; i += 48) {
[[i, 76], [i, H - 76], [76, i], [W - 76, i]].forEach(function (p) { x.save(); x.translate(p[0], p[1]); x.rotate(Math.PI / 4); x.fillStyle = "#B8483E"; x.fillRect(-8, -8, 16, 16); x.restore(); });
}
x.fillStyle = "#7A2830";
x.fillRect(110, 110, W - 220, H - 220);
for (var a = 150; a < W - 120; a += 110)
for (var b = 150; b < H - 120; b += 110)
wgvDamask(x, a + ((b / 110) % 2 ? 55 : 0) % 110, b, 70, "rgba(214,180,110,0.55)");
x.save();
x.translate(W / 2, H / 2);
x.fillStyle = "#1E3A2E";
x.beginPath();
x.ellipse(0, 0, 230, 170, 0, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#C9A65A";
x.beginPath();
x.ellipse(0, 0, 206, 150, 0, 0, Math.PI * 2);
x.fill();
x.fillStyle = "#7A2830";
x.beginPath();
x.ellipse(0, 0, 196, 140, 0, 0, Math.PI * 2);
x.fill();
x.restore();
wgvDamask(x, W / 2, H / 2, 240, "#D9B870");
wgvDamask(x, W / 2, H / 2, 120, "#1E3A2E");
[[150, 150], [W - 150, 150], [150, H - 150], [W - 150, H - 150]].forEach(function (p) { x.fillStyle = "#1E3A2E"; x.beginPath(); x.arc(p[0], p[1], 46, 0, Math.PI * 2); x.fill(); wgvDamask(x, p[0], p[1], 70, "#D9B870"); });
}, false);
},
function (I) {
if (!I || !I.root || !I.wg)
return;
var root = I.root, FL = I.floor || 3.7, wallHex = (I.wg.P && I.wg.P.wall) || 0xEFE6D2, C = (typeof WG_C !== "undefined") ? WG_C : 1.6;
root.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(root.matrixWorld).invert ? new THREE.Matrix4().copy(root.matrixWorld).invert() : new THREE.Matrix4().getInverse(root.matrixWorld);
var W = 0, D = 0, slabs = [], stairs = [], zP = null, doors = [];
root.children.forEach(function (c) {
var k = c.userData && c.userData.furn;
if (k === "wgmark")
zP = c.position.z + 1;
if (k === "stairs" || k === "spiralstair") {
var b = new THREE.Box3().setFromObject(c).applyMatrix4(inv);
stairs.push(b);
}
if (k === "trdoorframe")
doors.push({ x: c.position.x, z: c.position.z, lv: Math.round(c.position.y / FL), ry: c.rotation.y });
if (c.isMesh && !k) {
var bb = new THREE.Box3().setFromObject(c).applyMatrix4(inv), s = bb.getSize(new THREE.Vector3());
if (s.y < 0.5 && s.y > 0.05 && s.x > 8 && s.z > 8) {
slabs.push(bb);
W = Math.max(W, s.x);
D = Math.max(D, s.z);
}
}
});
if (!W || !D)
return;
var rooms = wgvRegions(I), levels = I.levels || 1;
var gA = 1e9;
slabs.forEach(function (b) { var a = (b.max.x - b.min.x) * (b.max.z - b.min.z); if (Math.abs(b.max.y) < 0.15 && a < gA) {
gA = a;
W = b.max.x - b.min.x;
D = b.max.z - b.min.z;
} });
var styleAt = function (lv, x, z) {
if (lv === 0 && zP !== null && z > zP)
return "hall";
for (var i = 0; i < rooms.length; i++) {
var r = rooms[i];
if (r.lv !== lv)
continue;
var xa = r.xc + r.sd * C, xb = r.xc + r.sd * W / 2;
if (x > Math.min(xa, xb) && x < Math.max(xa, xb) && z > r.z0 && z < r.z1)
return r.style || "keep";
}
return "hall";
};
var ceilY = function (lv) { var lo = lv * FL + 1.5, best = null; slabs.forEach(function (b) { if (b.min.y > lo && (best === null || b.min.y < best))
best = b.min.y; }); return best === null ? lv * FL + FL - 0.12 : best - 0.03; };
var walls = [], tmp = new THREE.Vector3(), rel = new THREE.Matrix4(), relI = new THREE.Matrix4();
var furnOf = function (o) { for (var q = o; q && q !== root; q = q.parent)
if (q.userData && q.userData.furn)
return q.userData.furn; return null; };
root.traverse(function (o) {
if (!o.isMesh || Array.isArray(o.material) || !o.material || !o.material.color || o.userData.wgvDone)
return;
var hex = o.material.color.getHex(), fk = furnOf(o), bb = new THREE.Box3().setFromObject(o).applyMatrix4(inv), s = bb.getSize(tmp);
var piece = fk && /^trw\d+$|^trdoorframe$/.test(fk);
if (!fk && hex === 0x3A2414 && o.parent && /^ilf/.test(o.parent.name || "")) {
o.visible = false;
return;
}
if ((piece && /^trw/.test(fk) && hex === 0x3E2814 && s.y < 1.1) || (!fk && hex === 0x4A2E1A && s.y < 0.12)) {
o.visible = false;
return;
}
if (!fk && hex !== wallHex && s.y > 0.6 && s.y < 1.3 && Math.min(s.x, s.z) < 0.4 && Math.max(s.x, s.z) > 2 && (bb.min.y - Math.round(bb.min.y / FL) * FL) < 0.15) {
o.visible = false;
return;
}
if (!(hex === wallHex && !fk) && !(piece && hex === 0xE4DCCB))
return;
if (s.y < 0.5 || Math.min(s.x, s.z) > 0.6)
return;
walls.push(o);
});
walls.forEach(function (o) {
if (!furnOf(o) && o.parent === root) {
var wb = new THREE.Box3().setFromObject(o).applyMatrix4(inv), ws = wb.getSize(new THREE.Vector3());
if (Math.max(ws.x, ws.z) > 3) {
var wc = wb.getCenter(new THREE.Vector3());
o.geometry = new THREE.BoxGeometry(ws.x, ws.y, ws.z, Math.max(1, Math.ceil(ws.x)), 1, Math.max(1, Math.ceil(ws.z)));
o.position.copy(wc);
o.rotation.set(0, 0, 0);
o.scale.set(1, 1, 1);
o.updateMatrixWorld(true);
}
}
rel.multiplyMatrices(inv, o.matrixWorld);
relI.copy(rel).invert ? relI.copy(rel).invert() : relI.getInverse(rel);
var src = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry, P = src.attributes.position, N = src.attributes.normal, n = P.count;
var byK = {}, order = [];
var a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), e1 = new THREE.Vector3(), e2 = new THREE.Vector3(), fn = new THREE.Vector3(), lp = new THREE.Vector3();
var bb = new THREE.Box3().setFromObject(o).applyMatrix4(inv), lv = Math.max(0, Math.round(bb.min.y / FL)), base = lv * FL, top = ceilY(lv);
for (var t = 0; t + 2 < n; t += 3) {
a.fromBufferAttribute(P, t).applyMatrix4(rel);
b.fromBufferAttribute(P, t + 1).applyMatrix4(rel);
c.fromBufferAttribute(P, t + 2).applyMatrix4(rel);
fn.crossVectors(e1.subVectors(b, a), e2.subVectors(c, a)).normalize();
var k = "hall";
if (Math.abs(fn.y) < 0.5) {
var cx = (a.x + b.x + c.x) / 3 + fn.x * 0.35, cz = (a.z + b.z + c.z) / 3 + fn.z * 0.35;
k = styleAt(lv, cx, cz);
}
if (!byK[k]) {
byK[k] = { p: [], nr: [], uv: [] };
order.push(k);
}
var B = byK[k], alongX = Math.abs(fn.x) < Math.abs(fn.z);
[a, b, c].forEach(function (v, j) {
var li = t + j;
if (v.y - base > 2.9 && v.y < top)
v.y = top;
lp.copy(v).applyMatrix4(relI);
B.p.push(lp.x, lp.y, lp.z);
if (N)
B.nr.push(N.getX(li), N.getY(li), N.getZ(li));
B.uv.push((alongX ? v.x : v.z) / 2, (v.y - base) / FL);
});
}
if (order.length === 1 && order[0] === "keep")
return;
var g = new THREE.BufferGeometry(), pos = [], nor = [], uvs = [], mats = [], start = 0;
order.forEach(function (k, i) {
var B = byK[k];
pos = pos.concat(B.p);
nor = nor.concat(B.nr);
uvs = uvs.concat(B.uv);
g.addGroup(start, B.p.length / 3, i);
start += B.p.length / 3;
mats.push(k === "keep" ? o.material : wgvPaperMat(k));
});
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
if (nor.length)
g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
else
g.computeVertexNormals();
g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
g.computeBoundingSphere();
g.computeBoundingBox();
if (src !== o.geometry)
src.dispose();
o.geometry = g;
o.material = mats.length === 1 ? mats[0] : mats;
o.userData.wgvDone = 1;
});
var x0 = -W / 2 + 0.1, x1 = W / 2 - 0.1, z0 = -D / 2 + 0.1, z1 = D / 2 - 0.1, cm = wgvCeilMat(), grp = new THREE.Group();
grp.name = "wgv-dress";
for (var lv = 0; lv < levels; lv++) {
var y = ceilY(lv), rects = [[x0, z0, x1, z1]];
stairs.forEach(function (h) {
if (Math.round(h.min.y / FL) !== lv)
return;
var hx0 = h.min.x - 0.2, hx1 = h.max.x + 0.2, hz0 = h.min.z - 0.2, hz1 = h.max.z + 0.2, out = [];
rects.forEach(function (r) {
if (hx1 <= r[0] || hx0 >= r[2] || hz1 <= r[1] || hz0 >= r[3]) {
out.push(r);
return;
}
if (hz0 > r[1])
out.push([r[0], r[1], r[2], hz0]);
if (hz1 < r[3])
out.push([r[0], hz1, r[2], r[3]]);
var za = Math.max(r[1], hz0), zb = Math.min(r[3], hz1);
if (hx0 > r[0])
out.push([r[0], za, hx0, zb]);
if (hx1 < r[2])
out.push([hx1, za, r[2], zb]);
});
rects = out;
});
rects.forEach(function (r) {
var w = r[2] - r[0], d = r[3] - r[1];
if (w < 0.2 || d < 0.2)
return;
var geo = new THREE.PlaneGeometry(w, d);
var uv = geo.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, (r[0] + uv.getX(i) * w) / 2.4, (r[1] + uv.getY(i) * d) / 2.4);
var m = new THREE.Mesh(geo, cm);
m.rotation.x = Math.PI / 2;
m.position.set((r[0] + r[2]) / 2, y, (r[1] + r[3]) / 2);
grp.add(m);
});
}
var lay = function (mat, cx, cz, w, d, lv, tile) {
var geo = new THREE.PlaneGeometry(w, d);
if (tile) {
var uv = geo.attributes.uv;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, uv.getX(i) * w / tile[0], uv.getY(i) * d / tile[1]);
}
var m = new THREE.Mesh(geo, mat);
m.rotation.x = -Math.PI / 2;
m.position.set(cx, lv * FL + 0.008, cz);
grp.add(m);
return m;
};
if (zP !== null) {
var hz0 = zP + 0.3, hz1 = D / 2 - 0.3;
lay(wgvRugMat("hall"), 0, (hz0 + hz1) / 2, Math.min(W - 1.2, 18), Math.min(hz1 - hz0, 16), 0, null);
}
for (var L = 0; L < levels; L++) {
var top = (L === 0 && zP !== null) ? zP - 0.2 : D / 2 - 0.8;
lay(wgvRugMat("runner"), 0, (-D / 2 + 0.2 + top) / 2, 2.2, top - (-D / 2 + 0.2), L, [2.2, 2.2]);
}
rooms.forEach(function (r) {
if (r.style !== "suite" && r.style !== "green")
return;
if (/salon|activity/i.test(r.label))
return;
var xa = r.xc + r.sd * (C + 0.15), xb = r.xc + r.sd * (W / 2 - 0.15);
lay(wgvRugMat(r.style), (xa + xb) / 2, (r.z0 + r.z1) / 2, Math.abs(xb - xa), r.z1 - r.z0 - 0.3, r.lv, [2, 2]);
});
var rails = [], railMat = trM(0x6A4428, "wood");
for (var L2 = 0; L2 < levels; L2++)
[-1, 1].forEach(function (sd) {
var x = sd * (C - 0.07), dz = doors.filter(function (q) { return q.lv === L2 && Math.abs(Math.abs(q.x) - C) < 0.3 && Math.sign(q.x) === sd; }).map(function (q) { return q.z; }).sort(function (p, q) { return p - q; });
var zs = -D / 2 + 0.4, zEnd = (L2 === 0 && zP !== null) ? zP - 0.3 : D / 2 - 1;
dz.concat([zEnd + 0.95]).forEach(function (z) { var a = zs, b = Math.min(z - 0.95, zEnd); if (b - a > 0.6)
rails.push([x, L2, (a + b) / 2, b - a]); zs = z + 0.95; });
});
if (rails.length) {
var im = new THREE.InstancedMesh(new THREE.BoxGeometry(0.06, 0.06, 1), railMat, rails.length), mm = new THREE.Matrix4();
rails.forEach(function (r, i) { mm.makeScale(1, 1, r[3]); mm.setPosition(r[0], r[1] * FL + 0.9, r[2]); im.setMatrixAt(i, mm); });
im.instanceMatrix.needsUpdate = true;
grp.add(im);
}
if (typeof FURN !== "undefined" && FURN.wgvsconce)
rails.forEach(function (r) {
var n = Math.floor(r[3] / 6);
for (var i = 0; i < n; i++) {
var sc = FURN.wgvsconce(), sd = Math.sign(r[0]);
sc.position.set(sd * (C - 0.07), r[1] * FL, r[2] - r[3] / 2 + (i + 0.5) * r[3] / n);
sc.rotation.y = sd < 0 ? Math.PI / 2 : -Math.PI / 2;
grp.add(sc);
}
});
root.add(grp);
I.wgvDressed = { walls: walls.length, ceil: grp.children.length, rails: rails.length };
}
];
});
