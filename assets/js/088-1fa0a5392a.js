/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var standing = null, cityBusy = false;
var DBCALM = { live: {}, last: {}, input: Date.now(), n: 0, did: 0 };
var DBCALM_READ = /^(my_|list_|get_|is_)|_(board|state|since|feed|now|inbox|lobby|watch|status|changed|today|invites|hidden|rights|mine|me|here|poll|list)$/;
var DBCALM_NOTREAD = /^(upsert_presence|upsert_presence_at|clear_presence|presence_here|list_presence|school_enrol_me)$/;
var DBCALM_BEAT = /^(upsert_presence|upsert_presence_at|clear_presence|presence_here|list_presence|note_activity|set_public_look)$|_(beat|tick|seen|log)$/;
var DBCALM_LIVE = /^(game_state|live_poll|dt_poll|race_|arena_|lounge_|saga_run_state|verne_state|court_now|sn_now|temple_service_now|temple_altar_now|ug_line_state|ug_ticket_state|heli_status)/;
function dbcalmResting() {
try {
if (document.hidden)
return true;
return !document.hasFocus() && Date.now() - DBCALM.input > 180000;
}
catch (e) {
return false;
}
}
(function () {
try {
var mark = function () { DBCALM.input = Date.now(); };
["keydown", "pointerdown", "pointermove", "touchstart", "wheel"].forEach(function (t) { window.addEventListener(t, mark, { passive: true, capture: true }); });
}
catch (e) { }
})();
function dbcalmPrune() {
if (++DBCALM.n % 40)
return;
var old = Date.now() - 60000;
for (var k in DBCALM.last)
if (DBCALM.last[k].at < old)
delete DBCALM.last[k];
}
function cityRpcText(name, body) {
return freshToken().then(function (tok) {
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/" + name, {
method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + tok, "Content-Type": "application/json" },
body: JSON.stringify(body || {})
}).then(function (r) { return r.ok ? r.text() : r.text().then(function (t) { throw new Error(t || "that didn't go through"); }); });
});
}
function cityRpc(name, body) {
if (!signedIn())
return Promise.reject(new Error("Sign in first — the city keeps its books by account."));
var nm = String(name), key = null;
if (DBCALM_READ.test(nm) && !DBCALM_NOTREAD.test(nm)) {
try {
key = nm + "|" + JSON.stringify(body || {});
}
catch (e) {
key = null;
}
}
else if (!DBCALM_BEAT.test(nm)) {
DBCALM.live = {};
if (!dbcalmResting())
DBCALM.did = Date.now();
}
if (!key)
return cityRpcText(name, body).then(function (t) { return JSON.parse(t); });
var kept = DBCALM.last[key];
if (kept && kept.at > DBCALM.did && Date.now() - kept.at < 60000 && !DBCALM_LIVE.test(nm) && dbcalmResting())
return Promise.resolve(kept.t).then(function (t) { return JSON.parse(t); });
var p = DBCALM.live[key];
if (!p) {
var sent = Date.now();
p = DBCALM.live[key] = cityRpcText(name, body).then(function (t) {
if (DBCALM.live[key] === p)
delete DBCALM.live[key];
if (!DBCALM.last[key] || DBCALM.last[key].at < sent) {
DBCALM.last[key] = { at: sent, t: t };
dbcalmPrune();
}
return t;
}, function (e) { if (DBCALM.live[key] === p)
delete DBCALM.live[key]; throw e; });
}
return p.then(function (t) { return JSON.parse(t); });
}
function gold(n) { return (n || 0).toLocaleString() + " gold"; }
var GOLD_PER_DOLLAR = 100;
function inDollars(n) { return "about $" + ((n || 0) / (GOLD_PER_DOLLAR || 100)).toFixed(2); }
function learnGoldRate() {
return goldRates().then(function (rt) {
if (rt && +rt.buy_per_dollar > 0 && +rt.buy_per_dollar !== GOLD_PER_DOLLAR) {
GOLD_PER_DOLLAR = +rt.buy_per_dollar;
paintCity();
}
if (rt && +rt.buy_per_dollar > 0)
try {
document.querySelectorAll(".gpd").forEach(function (e) { e.textContent = Number(rt.buy_per_dollar).toLocaleString(); });
}
catch (e) { }
return rt;
});
}
function notOpenYet(player, keeper) { return (typeof amKeeper === "function" && amKeeper()) ? keeper : player; }
function settleRent() {
return cityRpc("settle_rent").then(function (rows) {
(rows || []).forEach(function (r) {
if (r.evicted)
setStatus("<b>The lease on " + esc(r.lot) + " has lapsed.</b> Rent went unpaid too long, and it is back on the books for somebody else.");
else if (r.gold)
setStatus("<b>" + gold(r.gold) + "</b> in back rent drawn for " + esc(r.lot) + ".");
});
return rows;
}).catch(function () { return []; });
}
function refreshStanding() {
if (!signedIn()) {
standing = null;
paintCity();
return Promise.resolve(null);
}
return settleRent().then(function () { return cityRpc("my_standing"); }).then(function (s) {
standing = s;
paintCity();
loadMyJobs();
learnGoldRate();
return s;
}).catch(function () { return null; });
}
function drawPay() { return __ZC(88, 0, this, arguments, new.target); }
function jobBoard() { return cityRpc("job_board").catch(function () { return []; }); }
function applyFor(jobId, said) { return __ZC(88, 1, this, arguments, new.target); }
function workOffline(jobId, on) { return __ZC(88, 2, this, arguments, new.target); }
function keeperTakeJob(jobId) { return __ZC(88, 3, this, arguments, new.target); }
function leaveJob(jobId) { return cityRpc("leave_job", { p_job: jobId }).then(refreshStanding); }
var myOffice = null;
function loadOffice() {
if (!signedIn()) {
myOffice = null;
return Promise.resolve(null);
}
return cityRpc("my_office").then(function (o) { myOffice = o; paintCity(); return o; }).catch(function () { return null; });
}
function setMyKeycode(code) {
setStatus("A keeper sets your office's code, from the Keeper's Desk — ask whoever holds it.");
return Promise.resolve();
}
function tryOfficeDoor(officeId) { return __ZC(88, 4, this, arguments, new.target); }
function lotBoard() { return cityRpc("lot_board").catch(function () { return []; }); }
function buyLot(id) { return cityRpc("buy_lot", { p_lot: id }).then(function (o) { setStatus(o === "ok" ? "<b>The ground is yours.</b>" : esc(String(o))); return refreshStanding(); }).catch(function (e) { setStatus(esc(e.message)); }); }
function takeLease(id) { return cityRpc("take_lease", { p_lot: id }).then(function (o) { setStatus(o === "ok" ? "<b>You hold the lease.</b> Rent falls due in a week." : esc(String(o))); return refreshStanding(); }).catch(function (e) { setStatus(esc(e.message)); }); }
function payRent(id) { return cityRpc("pay_rent", { p_lot: id }).then(function (o) { setStatus(o === "ok" ? "<b>Rent paid.</b>" : esc(String(o))); return refreshStanding(); }).catch(function (e) { setStatus(esc(e.message)); }); }
function paintCity() {
var el = document.getElementById("city-state");
if (!el)
return;
if (!signedIn()) {
el.innerHTML = "Sign in above to work, earn and hold ground in Somnucor.";
return;
}
if (!standing) {
el.innerHTML = "Looking\u2026";
return;
}
var L = [];
L.push("<b>" + gold(standing.gold) + "</b> <span style='color:var(--dim)'>(" + inDollars(standing.gold) + ")</span>");
if (standing.granted)
L.push("<span style='color:var(--dim)'>Your starting income was " + gold(standing.granted) + ", and it stays with you.</span>");
(standing.jobs || []).forEach(function (j) {
L.push("<b>" + esc(j.job) + "</b> at " + esc(j.workplace || j.employer) + " \u2014 " + j.rate + " gold " + (j.kind === "salary" ? "a week" : "an hour") +
(j.roams ? " <span style='color:var(--dim)'>\u00b7 worked on the streets, anywhere in the city</span>" : "") +
(j.at_work !== undefined ? " <span style='color:var(--dim)'>\u00b7 " + Math.floor(j.at_work / 60) + "h " + (j.at_work % 60) + "m at work since last paid</span>" : "") +
(j.workplace && !j.roams ? (" <button class='btn' data-way='" + esc(j.workplace) + "'>show me the way</button>") : "") +
(j.job_id ? (" <button class='btn' data-off='" + j.job_id + "' data-on='" + (j.offline ? "0" : "1") + "'>" +
(j.offline ? "call my someone home" : "leave my someone at work") + "</button>") : "") +
(j.offline ? " <span style='color:var(--dim)'>\u00b7 at work while you sleep, at two fifths</span>" : "") +
(j.panel === "temple" ? " <button class='btn' id='city-temple-collect'>collect the bowls of Temple Row</button>" : ""));
});
if (!(standing.jobs || []).length)
L.push("<span style='color:var(--dim)'>No work yet. The board below shows what the city needs.</span>");
(standing.lots || []).forEach(function (l) {
L.push(esc(l.lot) + " \u2014 " + (l.own ? "yours" : "leased") + (l.rent ? " \u00b7 " + gold(l.rent) + " a week" : "") +
(!l.own && l.rent && l.lot_id ? (" <button class='btn' data-rent='" + l.lot_id + "'>pay rent</button>") : "") +
" <button class='btn' data-wayhome='" + esc(l.lot) + "'>show me the way home</button>");
});
if (myOffice)
L.push("<b>Office " + esc(myOffice.number) + "</b>, floor " + (myOffice.floor + 1) +
(myOffice.name ? " \u2014 " + esc(myOffice.name) : "") + " \u00b7 " +
(myOffice.keycode ? ("code <b>" + esc(myOffice.keycode) + "</b>") : "<span style='color:var(--dim)'>locked \u2014 a keeper hasn't set a code for it yet</span>"));
if (standing.prison)
L.push("<span style='color:#C0603A'>" + (typeof prisonWords === "function" ? prisonWords(standing.prison) : "<b>Held by Somnucor</b>") +
" Your own dreamscape is untouched.</span>");
el.innerHTML = L.join("<br>");
Array.prototype.forEach.call(el.querySelectorAll("[data-off]"), function (b) {
b.onclick = function () { workOffline(+b.getAttribute("data-off"), b.getAttribute("data-on") === "1"); };
});
Array.prototype.forEach.call(el.querySelectorAll("[data-wayhome]"), function (b) { b.onclick = function () { showTheWayHome(b.getAttribute("data-wayhome")); }; });
Array.prototype.forEach.call(el.querySelectorAll("[data-rent]"), function (b) {
b.onclick = function () { payRent(+b.getAttribute("data-rent")); };
});
Array.prototype.forEach.call(el.querySelectorAll("[data-way]"), function (b) {
b.onclick = function () { if (typeof showTheWay === "function")
showTheWay(b.getAttribute("data-way")); };
});
var tc = document.getElementById("city-temple-collect");
if (tc)
tc.onclick = function () { collectTemplePurse(); };
var wo = document.getElementById("city-work-off");
if (wo)
wo.onclick = function () { workOffMySentence(1); };
paintBusiness();
}
function amOfficer() { return (standing && standing.jobs || []).some(function (j) { return j.panel === "police" || j.panel === "court"; }); }
function collectTemplePurse() {
return cityRpc("collect_temple_purse").then(function (sum) {
setStatus(sum > 0 ? ("<b>" + gold(sum) + "</b> collected from the bowls of Temple Row.") : "The bowls are empty just now.");
return refreshStanding();
}).catch(function (e) { setStatus(esc(e.message)); });
}
function workOffMySentence(hours) { return __ZC(88, 5, this, arguments, new.target); }
function showJobBoard() {
var el = document.getElementById("city-jobs");
if (!el)
return;
el.innerHTML = "Looking\u2026";
jobBoard().then(function (rows) {
if (!rows || !rows.length) {
el.innerHTML = "<span style='color:var(--dim)'>" + notOpenYet("No work is listed yet. The board isn't open.", "No work listed. Run the latest server update and 8 in the SQL Editor.") + "</span>";
return;
}
var by = {};
rows.forEach(function (r) { (by[r.panel || "the city"] = by[r.panel || "the city"] || []).push(r); });
var h = "";
Object.keys(by).sort().forEach(function (k) {
h += "<div style='margin-top:10px;color:var(--gold);font-family:var(--sans);font-size:12px;letter-spacing:.08em;text-transform:uppercase'>" + esc(k) + "</div>";
by[k].forEach(function (r) {
var left = r.positions - r.taken;
h += "<div style='display:flex;justify-content:space-between;gap:10px;padding:5px 0;border-bottom:1px solid var(--line)'>" +
"<span>" + esc(r.title) + " <span style='color:var(--dim)'>\u00b7 " + r.rate + " gold " + (r.pay_kind === "salary" ? "a week" : "an hour") +
(r.workplace ? " \u00b7 " + esc(r.workplace) : "") + (r.auto_hire === false ? " \u00b7 a keeper chooses" : "") + "</span></span>" +
"<span>" + (left > 0 ? ("<button class='btn' data-apply='" + r.job_id + "'>" + (r.auto_hire === false ? "Apply" : "Take it") + "</button> <span style='color:var(--dim)'>" + left + " free</span>")
: "<span style='color:var(--dim)'>full</span>") +
(typeof amKeeper === "function" && amKeeper() ? " <button class='btn' data-ktake='" + r.job_id + "' title='Keeper override: take it and clock in now'>Keeper: work it</button>" : "") + "</span></div>";
});
});
el.innerHTML = h;
Array.prototype.forEach.call(el.querySelectorAll("[data-ktake]"), function (b) {
b.onclick = function () { keeperTakeJob(+b.getAttribute("data-ktake")); };
});
Array.prototype.forEach.call(el.querySelectorAll("[data-apply]"), function (b) {
b.onclick = function () {
var row = rows.filter(function (x) { return x.job_id === +b.getAttribute("data-apply"); })[0];
applyFor(+b.getAttribute("data-apply"), (row && row.auto_hire === false) ? (prompt("A word about why you want it?") || null) : null);
};
});
});
}
function initCity() {
var b;
if ((b = document.getElementById("city-pay")))
b.onclick = drawPay;
if ((b = document.getElementById("city-refresh")))
b.onclick = function () { refreshStanding(); loadOffice(); showJobBoard(); };
if (signedIn()) {
refreshStanding();
loadOffice();
}
setTimeout(showJobBoard, 1200);
}
function bankSettle() { return cityRpc("bank_settle").then(function (b) { paintBank(b); return refreshStanding(); }); }
function bankDeposit(n) {
return cityRpc("bank_deposit", { p_gold: n }).then(function (o) {
setStatus(o === "ok" ? ("<b>" + gold(n) + "</b> paid into the bank.") : esc(String(o)));
return refreshStanding();
})
.catch(function (e) { setStatus(esc(e.message)); });
}
function bankWithdraw(n) {
return cityRpc("bank_withdraw", { p_gold: n }).then(function (o) {
setStatus(o === "ok" ? ("<b>" + gold(n) + "</b> drawn out.") : esc(String(o)));
return refreshStanding();
})
.catch(function (e) { setStatus(esc(e.message)); });
}
function bankBorrow(n) {
return cityRpc("bank_borrow", { p_gold: n }).then(function (o) {
setStatus(o === "ok" ? ("<b>" + gold(n) + "</b> borrowed. The bank charges by the week.") : esc(String(o)));
return refreshStanding();
})
.catch(function (e) { setStatus(esc(e.message)); });
}
function bankRepay(n) {
return cityRpc("bank_repay", { p_gold: n }).then(function (o) {
setStatus(o === "ok" ? "<b>Repaid.</b>" : esc(String(o)));
return refreshStanding();
})
.catch(function (e) { setStatus(esc(e.message)); });
}
function payDreamer(to, n, note) {
return cityRpc("pay_dreamer", { p_to: to, p_gold: n, p_note: note || null })
.then(function (o) { setStatus(o === "ok" ? ("<b>" + gold(n) + "</b> paid.") : esc(String(o))); return refreshStanding(); })
.catch(function (e) { setStatus(esc(e.message)); });
}
function paintBank(b) {
var ad = ageAdult(), gb = document.getElementById("gold-buy"), gs = document.getElementById("gold-sell"), ga = document.getElementById("gold-age");
if (gb)
gb.style.display = ad ? "" : "none";
if (gs)
gs.style.display = ad ? "" : "none";
if (ga)
ga.style.display = ad ? "none" : "block";
var el = document.getElementById("bank-state");
if (!el)
return;
if (!standing) {
el.textContent = "";
return;
}
var saved = (b && b.saved !== undefined) ? b.saved : standing.saved, owed = (b && b.owed !== undefined) ? b.owed : standing.owed;
el.innerHTML = "In the bank: <b>" + gold(saved) + "</b>" + (owed ? (" &middot; owing <b style='color:#C0603A'>" + gold(owed) + "</b>") : "") +
(b && b.interest ? (" <span style='color:var(--dim)'>&middot; " + gold(b.interest) + " interest</span>") : "");
}
function goldRates() { return cityRpc("gold_rates").catch(function () { return null; }); }
function goldBuy() { return __ZC(88, 6, this, arguments, new.target); }
function goldSell() { return __ZC(88, 7, this, arguments, new.target); }
function goldMine() {
var el = document.getElementById("gold-mine");
if (!el || !signedIn())
return;
cityRpc("my_gold_exchange").then(function (rows) {
rows = (rows || []).slice(0, 6);
if (!rows.length) {
el.innerHTML = "";
return;
}
el.innerHTML = rows.map(function (x) {
var st = { requested: "waiting", paid: x.kind === "buy" ? "paid, gold added" : "money sent", refused: x.kind === "sell" ? "refused, gold returned" : "refused", cancelled: "cancelled" }[x.status] || x.status;
return "<div style='padding:3px 0;color:var(--dim)'>GX-" + x.id + " &middot; " + (x.kind === "buy" ? "buying " : "selling ") + gold(x.gold) + " &middot; $" + Number(x.usd).toFixed(2) + " &middot; <span style='color:var(--bone)'>" + st + "</span>" +
(x.status === "requested" ? " <button class='btn' data-gxc='" + x.id + "' style='padding:2px 8px;font-size:11.5px'>cancel</button>" : "") + "</div>";
}).join("");
Array.prototype.forEach.call(el.querySelectorAll("[data-gxc]"), function (b) {
b.onclick = function () {
cityRpc("gold_cancel", { p_id: +b.getAttribute("data-gxc") }).then(function (o) {
setStatus(o === "ok" ? "Cancelled." : esc(String(o)));
refreshStanding();
goldMine();
});
};
});
}).catch(function () { el.innerHTML = ""; });
}
var myThings = [], riding = null, rideSpeed = 1;
function loadThings() {
if (!signedIn()) {
myThings = [];
return Promise.resolve([]);
}
return cityRpc("my_belongings").then(function (rows) { myThings = rows || []; paintThings(); return myThings; })
.catch(function () { return []; });
}
function buyItem(id, lot) { return __ZC(88, 8, this, arguments, new.target); }
function ride(name) { return __ZC(88, 9, this, arguments, new.target); }
function paintThings() {
var el = document.getElementById("things-state");
if (!el)
return;
if (!myThings.length) {
el.innerHTML = "<span style='color:var(--dim)'>Nothing of your own yet. The shop is below.</span>";
return;
}
var h = myThings.map(function (t) {
return "<span style='display:inline-block;margin:0 10px 6px 0'>" + esc(t.name) +
(t.speed ? (" <button class='btn' data-ride='" + esc(t.name) + "'>" + (riding === t.name ? "riding" : "ride") + "</button>") : "") + "</span>";
}).join("");
if (riding)
h += "<div style='margin-top:6px'><button class='btn' id='ride-off'>Get off</button></div>";
el.innerHTML = h;
Array.prototype.forEach.call(el.querySelectorAll("[data-ride]"), function (b) { b.onclick = function () { ride(b.getAttribute("data-ride")); }; });
var off = document.getElementById("ride-off");
if (off)
off.onclick = function () { ride(null); };
}
function showShop() { return __ZC(88, 10, this, arguments, new.target); }
function initShop() {
var b;
if ((b = document.getElementById("bank-in")))
b.onclick = function () { var n = +prompt("How much to pay in?") || 0; if (n > 0)
bankDeposit(n); };
if ((b = document.getElementById("bank-out")))
b.onclick = function () { var n = +prompt("How much to draw out?") || 0; if (n > 0)
bankWithdraw(n); };
if ((b = document.getElementById("bank-borrow")))
b.onclick = function () { var n = +prompt("How much to borrow? The bank lends against what you have earned.") || 0; if (n > 0)
bankBorrow(n); };
if ((b = document.getElementById("bank-repay")))
b.onclick = function () { var n = +prompt("How much to repay?") || 0; if (n > 0)
bankRepay(n); };
if ((b = document.getElementById("bank-settle")))
b.onclick = bankSettle;
if ((b = document.getElementById("shop-show")))
b.onclick = showShop;
if ((b = document.getElementById("gold-buy")))
b.onclick = goldBuy;
if ((b = document.getElementById("gold-sell")))
b.onclick = goldSell;
if (signedIn())
setTimeout(goldMine, 1400);
goldRates().then(function (rt) {
var on = !!(rt && rt.cash_on);
["gold-buy", "gold-sell"].forEach(function (id) { var e = document.getElementById(id); if (e)
e.style.display = on ? "" : "none"; });
});
if (signedIn()) {
loadThings();
setTimeout(function () { bankSettle().catch(function () { }); }, 900);
}
}
var myStock = [];
function loadStock() {
if (!signedIn()) {
myStock = [];
return Promise.resolve([]);
}
return cityRpc("my_stock").then(function (rows) { myStock = rows || []; paintStock(); return myStock; })
.catch(function () { return []; });
}
function workGround() { return __ZC(88, 11, this, arguments, new.target); }
function sellStock(kind, n) {
return cityRpc("sell_stock", { p_kind: kind, p_amount: n }).then(function (o) {
setStatus(o === "ok" ? "<b>Sold to the city.</b>" : esc(String(o)));
return Promise.all([loadStock(), refreshStanding()]);
}).catch(function (e) { setStatus(esc(e.message)); });
}
function paintStock() {
var el = document.getElementById("stock-state");
if (!el)
return;
var have = myStock.filter(function (s) { return s.amount > 0; });
if (!have.length) {
el.innerHTML = "<span style='color:var(--dim)'>Nothing in your stock. Work the quarry or the stand and it fills.</span>";
return;
}
el.innerHTML = have.map(function (s) {
return "<span style='display:inline-block;margin:0 10px 6px 0'>" + esc(s.name) + " <b>" + s.amount + "</b>" +
" <button class='btn' data-sell='" + esc(s.kind) + "'>sell to the city at " + s.buys + "</button>" +
" <button class='btn' data-list='" + esc(s.kind) + "'>list on the market</button></span>";
}).join("");
Array.prototype.forEach.call(el.querySelectorAll("[data-sell]"), function (b) {
b.onclick = function () {
var k = b.getAttribute("data-sell"), row = myStock.filter(function (s) { return s.kind === k; })[0];
var n = +(prompt("How much " + row.name.toLowerCase() + " to sell? You have " + row.amount + ".") || 0);
if (n > 0)
sellStock(k, Math.min(n, row.amount));
};
});
Array.prototype.forEach.call(el.querySelectorAll("[data-list]"), function (b) {
b.onclick = function () {
var k = b.getAttribute("data-list"), row = myStock.filter(function (s) { return s.kind === k; })[0];
var n = +(prompt("How much " + row.name.toLowerCase() + " to list? You have " + row.amount + ".") || 0);
if (n <= 0)
return;
var each = +(prompt("Gold apiece? The city itself buys at " + row.buys + ", so the market is worth more than that.") || 0);
if (each > 0)
listStock(k, Math.min(n, row.amount), each);
};
});
}
function initGround() {
var b;
if ((b = document.getElementById("ground-work")))
b.onclick = workGround;
if ((b = document.getElementById("ground-refresh")))
b.onclick = loadStock;
if (signedIn())
setTimeout(loadStock, 1400);
}
function listStock(kind, amount, each) { return __ZC(88, 12, this, arguments, new.target); }
function unlistStock(id) {
return cityRpc("unlist_stock", { p_listing: id }).then(function (o) {
setStatus(o === "ok" ? "<b>Taken down.</b> What was left is back in your stock." : esc(String(o)));
return Promise.all([loadStock(), loadMarket()]);
}).catch(function (e) { setStatus(esc(e.message)); });
}
function buyFromMarket(id, amount) {
return cityRpc("buy_stock", { p_listing: id, p_amount: amount }).then(function (o) {
setStatus(o === "ok" ? "<b>Bought.</b> It is in your stock." : esc(String(o)));
return Promise.all([loadStock(), loadMarket(), refreshStanding()]);
}).catch(function (e) { setStatus(esc(e.message)); });
}
var myMarket = [];
function loadMarket() {
return cityRpc("market_board").then(function (rows) { myMarket = rows || []; paintMarket(); return myMarket; })
.catch(function () { myMarket = []; paintMarket(); return []; });
}
function paintMarket() {
var el = document.getElementById("market-state");
if (!el)
return;
if (!myMarket.length) {
el.innerHTML = "<span style='color:var(--dim)'>Nothing listed just now. What comes up in the quarry or the stand can go up here, at whatever price its owner asks.</span>";
return;
}
el.innerHTML = '<table style="width:100%;border-collapse:collapse">' +
myMarket.map(function (m) {
return '<tr><td style="padding:3px 6px;border-bottom:1px solid var(--line)">' + esc(m.name) + '</td>' +
'<td style="border-bottom:1px solid var(--line)">' + m.amount + '</td>' +
'<td style="border-bottom:1px solid var(--line)">' + m.each + ' gold each</td>' +
'<td style="border-bottom:1px solid var(--line)">' +
(m.mine ? '<button class="btn" data-unlist="' + m.listing_id + '">take down</button>'
: '<button class="btn" data-buyfrom="' + m.listing_id + '" data-max="' + m.amount + '">buy</button>') +
'</td></tr>';
}).join("") + '</table>';
Array.prototype.forEach.call(el.querySelectorAll("[data-unlist]"), function (b) {
b.onclick = function () { unlistStock(+b.getAttribute("data-unlist")); };
});
Array.prototype.forEach.call(el.querySelectorAll("[data-buyfrom]"), function (b) {
b.onclick = function () {
var max = +b.getAttribute("data-max");
var n = +(prompt("How much to buy? Up to " + max + ".") || 0);
if (n > 0)
buyFromMarket(+b.getAttribute("data-buyfrom"), Math.min(n, max));
};
});
}
function initMarket() {
var b;
if ((b = document.getElementById("market-refresh")))
b.onclick = loadMarket;
setTimeout(loadMarket, 1600);
}
var dreamerEmailsCache = null;
function dreamerEmails() {
if (dreamerEmailsCache)
return Promise.resolve(dreamerEmailsCache);
return cityRpc("admin_list_dreamers").then(function (rows) {
var map = {};
(rows || []).forEach(function (r) { map[r.id] = r.email; });
dreamerEmailsCache = map;
return map;
}).catch(function () { return {}; });
}
function openBusiness(name, lotId) {
return cityRpc("open_business", { p_name: name, p_lot: lotId || null }).then(function (o) {
setStatus(o === "ok" ? "<b>Opened.</b> Post work under it whenever you like." : esc(String(o)));
return Promise.all([refreshStanding(), loadMyJobs()]);
}).catch(function (e) { setStatus(esc(e.message)); });
}
function postJobFor(employerId, title, kind, rate, positions) { return __ZC(88, 13, this, arguments, new.target); }
function loadApplications(jobId) { return __ZC(88, 14, this, arguments, new.target); }
function hireApplicant(applicationId) {
return cityRpc("hire", { p_application: applicationId }).then(function (o) {
setStatus(o === "ok" ? "<b>Hired.</b> Their hours count from now; you pay them on payday from your own wallet." : esc(String(o)));
return loadMyJobs();
}).catch(function (e) { setStatus(esc(e.message)); });
}
var myJobs = [], myBoard = null;
function loadMyJobs() {
if (!signedIn()) {
myJobs = [];
myBoard = null;
paintBusiness();
return Promise.resolve([]);
}
return cityRpc("my_business_board").then(function (b) {
myBoard = b || { jobs: [] };
myJobs = myBoard.jobs || [];
paintBusiness();
return myJobs;
}).catch(function () {
if (!standing || !(standing.business || []).length) {
myJobs = [];
myBoard = null;
paintBusiness();
return [];
}
return jobBoard().then(function (rows) {
var mine = (standing.business || []).map(function (b) { return b.name; });
myJobs = (rows || []).filter(function (r) { return mine.indexOf(r.employer) >= 0; });
return Promise.all(myJobs.map(function (j) {
return loadApplications(j.job_id).then(function (apps) { j.applications = (apps || []).map(function (a) { a.name = a.user_id; return a; }); });
})).then(function () { myBoard = null; paintBusiness(); return myJobs; });
});
});
}
function bizDay(t) { try {
return new Date(t).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
}
catch (e) {
return "";
} }
function fireStaff(id, name) { return __ZC(88, 15, this, arguments, new.target); }
function turnDown(id, name) {
cityRpc("turn_down", { p_application: id }).then(function (o) {
setStatus(o === "ok" ? "Turned down " + esc(name) + "'s application." : esc(String(o)));
loadMyJobs();
}).catch(function (e) { setStatus(esc(e.message)); });
}
function payStaff(employerId, name) { return __ZC(88, 16, this, arguments, new.target); }
function paintBusiness() {
var el = document.getElementById("business-state");
if (!el)
return;
if (!signedIn()) {
el.innerHTML = "";
return;
}
var biz = (standing && standing.business) || [];
var h = "";
if (!biz.length && !myJobs.length)
h = "<span style='color:var(--dim)'>You run nothing yet. Opening one costs 2,000 gold, and can stand on ground you hold. You hire, let go and pay your own staff; their wages come out of your own wallet.</span>";
else if (biz.length)
h = biz.map(function (b) { return "<b>" + esc(b.name) + "</b>"; }).join(", ") + "<br>";
if (myBoard) {
h += "<div style='color:var(--dim);margin-top:4px'>Hourly wages are paid weekly (next " + esc(bizDay(myBoard.next_wage)) + "), salaries every two weeks (next " + esc(bizDay(myBoard.next_salary)) + "). Your wallet: " + gold(myBoard.wallet || 0) + ".</div>";
}
var byEmp = {};
myJobs.forEach(function (j) { var k = j.employer_id || j.employer; (byEmp[k] = byEmp[k] || { name: j.employer, id: j.employer_id, city: j.city, jobs: [] }).jobs.push(j); });
Object.keys(byEmp).forEach(function (k) {
var e = byEmp[k], owed = 0, due = 0;
e.jobs.forEach(function (j) { (j.staff || []).forEach(function (s) { if (s.due) {
due++;
owed += (s.owed_about || 0);
} }); });
h += "<div style='margin-top:10px'><b>" + esc(e.name) + "</b>" + (e.city ? " <span style='color:var(--dim)'>(the city's own: paid by the treasury)</span>" : "") +
(e.id && myBoard ? " <button class='btn' data-pay='" + e.id + "' data-name='" + esc(e.name) + "'>pay staff now</button>" : "") +
(due ? "<div style='color:var(--dim)'>" + due + " due on payday, about " + gold(owed) + (!e.city && myBoard && owed > (myBoard.wallet || 0) ? " <b style=\"color:#e8a\">(more than your wallet holds)</b>" : "") + ".</div>" : "") + "</div>";
e.jobs.forEach(function (j) {
var kind = j.kind || j.pay_kind;
var staff = j.staff || [];
h += "<div style='margin-top:8px;padding-top:6px;border-top:1px solid var(--line)'>" +
"<b>" + esc(j.title) + "</b> — " + j.rate + " gold " + (kind === "salary" ? "a week, paid every two weeks" : "an hour, paid weekly") +
" · " + (j.taken != null ? j.taken : staff.filter(function (s) { return !s.left; }).length) + " of " + j.positions + " filled" +
staff.map(function (s) {
return "<div style='margin-left:10px'>" + esc(s.name) + " <span style='color:var(--dim)'>" +
(s.left ? "left: last pay on payday" : (s.hours + " h since last paid, about " + gold(s.owed_about || 0) + (s.due ? " due" : ""))) + "</span>" +
(s.left ? "" : " <button class='btn' data-fire='" + s.id + "' data-name='" + esc(s.name) + "'>let go</button>") + "</div>";
}).join("") +
((j.applications || []).length ? (j.applications || []).map(function (a) {
var nm = a.name || a.email || "a dreamer";
return "<div style='margin-left:10px'>Applied: " + esc(nm) + (a.said ? (" — “" + esc(a.said) + "”") : "") +
" <button class='btn' data-hire='" + a.id + "'>hire</button>" + (myBoard ? " <button class='btn' data-turn='" + a.id + "' data-name='" + esc(nm) + "'>turn down</button>" : "") + "</div>";
}).join("") : "<div style='margin-left:10px;color:var(--dim)'>No applications waiting.</div>") +
"</div>";
});
});
el.innerHTML = h;
Array.prototype.forEach.call(el.querySelectorAll("[data-fire]"), function (b) {
b.onclick = function () { fireStaff(+b.getAttribute("data-fire"), b.getAttribute("data-name")); };
});
Array.prototype.forEach.call(el.querySelectorAll("[data-turn]"), function (b) {
b.onclick = function () { turnDown(+b.getAttribute("data-turn"), b.getAttribute("data-name")); };
});
Array.prototype.forEach.call(el.querySelectorAll("[data-pay]"), function (b) {
b.onclick = function () { payStaff(+b.getAttribute("data-pay"), b.getAttribute("data-name")); };
});
Array.prototype.forEach.call(el.querySelectorAll("[data-hire]"), function (b) {
b.onclick = function () { hireApplicant(+b.getAttribute("data-hire")); };
});
}
function initBusiness() {
var b;
if ((b = document.getElementById("business-open")))
b.onclick = function () {
cityRpc("my_business_permits").then(function (ps) {
ps = ps || [];
var granted = ps.filter(function (p) { return p.status === "granted"; });
var pending = ps.filter(function (p) { return p.status === "pending"; });
if (granted.length) {
var g = granted.length === 1 ? granted[0] : granted.filter(function (p) { return String(p.id) === String(prompt("Your permits from the Tower: " + granted.map(function (p) { return p.id + " = " + p.name; }).join(", ") + ". Which one opens now?") || ""); })[0];
if (!g)
return;
if (!confirm("The Tower granted your permit for " + g.name + ". Open it now? The licence costs 2,000 gold."))
return;
return openBusiness(g.name, g.lot || null);
}
var refused = ps.filter(function (p) { return p.status === "refused"; })[0];
var said = pending.length ? ("Still with the Tower: " + pending.map(function (p) { return p.name; }).join(", ") + ". ") : (refused ? ("The Tower refused " + refused.name + (refused.note ? ": " + refused.note : "") + ". ") : "");
if (!confirm(said + "A new business needs a permit from the Tower. Apply for one now?"))
return;
var name = (prompt("What will the business be called?") || "").trim();
if (!name)
return;
var kind = (prompt("What kind of trade? (a bakery, a potion shop, a tailor…)") || "").trim();
var plan = (prompt("A line for the Tower about it:") || "").trim();
var lot = (prompt("A lot number it will stand on, if you hold one? Leave blank otherwise.") || "").trim();
return cityRpc("apply_business_permit", { p_name: name, p_kind: kind, p_plan: plan, p_lot: lot ? +lot : null }).then(function (o) {
setStatus(esc((o && o.say) || "Sent to the Tower."));
});
}).catch(function (e) {
if (/function|404|PGRST/i.test(String(e && e.message))) {
var name = (prompt("What is the business called?") || "").trim();
if (!name)
return;
var lot = (prompt("A lot number it stands on, if it stands on one you hold? Leave blank otherwise.") || "").trim();
return openBusiness(name, lot ? +lot : null);
}
setStatus(esc(e.message));
});
};
if ((b = document.getElementById("business-post")))
b.onclick = function () {
var biz = (standing && standing.business) || [];
if (!biz.length)
return setStatus("Open a business first.");
var employerId = biz.length === 1 ? biz[0].id : +(prompt("Which business? " + biz.map(function (x) { return x.id + "=" + x.name; }).join(", ")) || 0);
if (!employerId)
return;
var title = (prompt("What is the post called?") || "").trim();
if (!title)
return;
var kind = (prompt("Hourly or salary?", "hourly") || "hourly").trim().toLowerCase();
var rate = +(prompt("Gold " + (kind === "salary" ? "a week" : "an hour") + "?") || 0);
if (rate <= 0)
return;
var positions = +(prompt("How many positions?", "1") || 1);
postJobFor(employerId, title, kind, rate, positions);
};
if ((b = document.getElementById("business-refresh")))
b.onclick = loadMyJobs;
if (signedIn())
setTimeout(loadMyJobs, 1800);
}
