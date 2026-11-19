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
function cityRpcText(name, body) { return __ZC(87, 0, this, arguments, new.target); }
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
function learnGoldRate() { return __ZC(87, 1, this, arguments, new.target); }
function notOpenYet(player, keeper) { return (typeof amKeeper === "function" && amKeeper()) ? keeper : player; }
function settleRent() { return __ZC(87, 2, this, arguments, new.target); }
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
function drawPay() { return __ZC(87, 3, this, arguments, new.target); }
function jobBoard() { return cityRpc("job_board").catch(function () { return []; }); }
function applyFor(jobId, said) { return __ZC(87, 4, this, arguments, new.target); }
function workOffline(jobId, on) { return __ZC(87, 5, this, arguments, new.target); }
function keeperTakeJob(jobId) { return __ZC(87, 6, this, arguments, new.target); }
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
function tryOfficeDoor(officeId) { return __ZC(87, 7, this, arguments, new.target); }
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
function workOffMySentence(hours) { return __ZC(87, 8, this, arguments, new.target); }
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
function paintBank(b) { return __ZC(87, 9, this, arguments, new.target); }
function goldRates() { return cityRpc("gold_rates").catch(function () { return null; }); }
function goldBuy() { return __ZC(87, 10, this, arguments, new.target); }
function goldSell() { return __ZC(87, 11, this, arguments, new.target); }
function goldMine() { return __ZC(87, 12, this, arguments, new.target); }
var myThings = [], riding = null, rideSpeed = 1;
function loadThings() {
if (!signedIn()) {
myThings = [];
return Promise.resolve([]);
}
return cityRpc("my_belongings").then(function (rows) { myThings = rows || []; paintThings(); return myThings; })
.catch(function () { return []; });
}
function buyItem(id, lot) { return __ZC(87, 13, this, arguments, new.target); }
function ride(name) { return __ZC(87, 14, this, arguments, new.target); }
function paintThings() { return __ZC(87, 15, this, arguments, new.target); }
function showShop() { return __ZC(87, 16, this, arguments, new.target); }
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
function workGround() { return __ZC(87, 17, this, arguments, new.target); }
function sellStock(kind, n) {
return cityRpc("sell_stock", { p_kind: kind, p_amount: n }).then(function (o) {
setStatus(o === "ok" ? "<b>Sold to the city.</b>" : esc(String(o)));
return Promise.all([loadStock(), refreshStanding()]);
}).catch(function (e) { setStatus(esc(e.message)); });
}
function paintStock() { return __ZC(87, 18, this, arguments, new.target); }
function initGround() {
var b;
if ((b = document.getElementById("ground-work")))
b.onclick = workGround;
if ((b = document.getElementById("ground-refresh")))
b.onclick = loadStock;
if (signedIn())
setTimeout(loadStock, 1400);
}
function listStock(kind, amount, each) { return __ZC(87, 19, this, arguments, new.target); }
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
function postJobFor(employerId, title, kind, rate, positions) { return __ZC(87, 20, this, arguments, new.target); }
function loadApplications(jobId) { return __ZC(87, 21, this, arguments, new.target); }
function hireApplicant(applicationId) {
return cityRpc("hire", { p_application: applicationId }).then(function (o) {
setStatus(o === "ok" ? "<b>Hired.</b> Their hours count from now; you pay them on payday from your own wallet." : esc(String(o)));
return loadMyJobs();
}).catch(function (e) { setStatus(esc(e.message)); });
}
var myJobs = [], myBoard = null;
function loadMyJobs() { return __ZC(87, 22, this, arguments, new.target); }
function bizDay(t) { try {
return new Date(t).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
}
catch (e) {
return "";
} }
function fireStaff(id, name) { return __ZC(87, 23, this, arguments, new.target); }
function turnDown(id, name) {
cityRpc("turn_down", { p_application: id }).then(function (o) {
setStatus(o === "ok" ? "Turned down " + esc(name) + "'s application." : esc(String(o)));
loadMyJobs();
}).catch(function (e) { setStatus(esc(e.message)); });
}
function payStaff(employerId, name) { return __ZC(87, 24, this, arguments, new.target); }
function paintBusiness() { return __ZC(87, 25, this, arguments, new.target); }
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
