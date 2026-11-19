/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(87, function () {
"use strict";
return [
function (name, body) {
return freshToken().then(function (tok) {
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/" + name, {
method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + tok, "Content-Type": "application/json" },
body: JSON.stringify(body || {})
}).then(function (r) { return r.ok ? r.text() : r.text().then(function (t) { throw new Error(t || "that didn't go through"); }); });
});
},
function () {
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
},
function () {
return cityRpc("settle_rent").then(function (rows) {
(rows || []).forEach(function (r) {
if (r.evicted)
setStatus("<b>The lease on " + esc(r.lot) + " has lapsed.</b> Rent went unpaid too long, and it is back on the books for somebody else.");
else if (r.gold)
setStatus("<b>" + gold(r.gold) + "</b> in back rent drawn for " + esc(r.lot) + ".");
});
return rows;
}).catch(function () { return []; });
},
function () {
return cityRpc("draw_pay").then(function (rows) {
rows = rows || [];
var paid = rows.filter(function (r) { return (r.gold || 0) > 0; });
var total = paid.reduce(function (a, r) { return a + (r.gold || 0); }, 0);
var notes = rows.filter(function (r) { return !(r.gold > 0) && r.note; }).map(function (r) { return esc(r.job) + ": " + esc(r.note); });
var h = "";
if (total)
h = "<b>" + gold(total) + "</b> paid for " + (paid.length === 1 ? esc(paid[0].job) : (paid.length + " posts")) + ". " + paid.map(function (r) { return esc(r.note || ""); }).join(" ");
if (notes.length)
h += (h ? "<br>" : "") + notes.join("<br>");
if (!h)
h = "Nothing owing just now. Hourly wages are paid once a week on payday, salaries every two weeks.";
setStatus(h);
return refreshStanding();
}).catch(function (e) { setStatus(esc(e.message)); });
},
function (jobId, said) {
return cityRpc("apply_for", { p_job: jobId, p_said: said || null }).then(function (out) {
if (out === "hired") {
setStatus("<b>You are hired.</b> Your pay counts the hours you are actually at your post — open your standing for the way there.");
if (typeof refreshStanding === "function")
refreshStanding();
if (typeof showJobBoard === "function")
showJobBoard();
return;
}
setStatus(out === "ok" ? "<b>Your application is in.</b> A keeper chooses for this post, and will see it."
: esc(String(out)));
}).catch(function (e) {
var m = String(e && e.message || ""), j = null;
try {
j = JSON.parse(m);
}
catch (x) { }
setStatus(j && j.message === "reputation" ? "🏅 " + esc(j.hint || "Your reputation closes that door for now.") : esc(m));
});
},
function (jobId, on) {
return cityRpc("set_offline_work", { p_job: jobId, p_on: !!on }).then(function (o) {
setStatus(o === "ok"
? (on ? "<b>Your someone stays at work.</b> They earn while you are away — less than you would, but the city keeps turning."
: "<b>Called home.</b> Your someone works no more until you do.")
: esc(String(o)));
return refreshStanding();
}).catch(function (e) { setStatus(esc(e.message)); });
},
function (jobId) {
return cityRpc("keeper_take_job", { p_job: jobId }).then(function (o) {
setStatus(esc((o && o.say) || "Done."));
if (typeof refreshStanding === "function")
refreshStanding();
if (typeof loadWork === "function")
try {
loadWork();
}
catch (e) { }
}).catch(function (e) { setStatus(/function|404|PGRST/i.test(String(e && e.message)) ? "The keeper override needs the latest server update on the server." : esc(e.message)); });
},
function (officeId) {
var code = prompt("The office door asks for a code.") || "";
return cityRpc("open_office", { p_office: officeId, p_code: code }).then(function (ok) {
if (ok)
setStatus("<b>The door opens.</b>");
else
setStatus("That code is not the one.");
return !!ok;
}).catch(function () { setStatus("The door does not answer just now."); return false; });
},
function (hours) {
if (!standing || !standing.prison)
return;
return cityRpc("work_off", { p_sentence: standing.prison.id, p_hours: hours || 1 }).then(function (o) {
setStatus(o === "served" ? "<b>Time served.</b> You are free." : o === "ok" ? "An hour worked off." : esc(String(o)));
return refreshStanding();
}).catch(function (e) { setStatus(esc(e.message)); });
},
function (b) {
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
},
function () {
if (!signedIn())
return setStatus("Sign in to buy gold.");
if (!ageAdult())
return setStatus("Buying gold for real money is for players aged 18 and over.");
goldRates().then(function (rt) {
if (!rt)
return setStatus("The gold exchange isn't open yet.");
if (!rt.cash_on)
return setStatus("Buying gold with money is switched off for now.");
var n = Math.floor(+prompt("How much gold would you like to buy? " + rt.buy_per_dollar + " gold costs $1.", String(rt.buy_per_dollar * 10)) || 0);
if (n <= 0)
return;
cityRpc("gold_buy_request", { p_gold: n }).then(function (o) {
if (!o || o.error)
return setStatus(esc((o && o.error) || "That didn't go through."));
var ref = "GX-" + o.id;
setStatus("<b>" + gold(o.gold) + " for $" + Number(o.usd).toFixed(2) + ".</b> Your reference is <b>" + ref + "</b>. " +
(o.pay_url ? "The payment page is opening; put the reference in the note. " : "Pay with the payment button on the website and put the reference in the note. ") +
"The gold arrives as soon as the payment is confirmed.");
if (safeUrl(o.pay_url)) {
try {
var u = o.pay_url + (o.pay_url.indexOf("?") > -1 ? "&" : "?") + "ref=" + encodeURIComponent(ref) + "&amount=" + encodeURIComponent(Number(o.usd).toFixed(2));
window.open(u, "_blank", "noopener");
}
catch (e) { }
}
goldMine();
}).catch(function (e) { setStatus(esc(e.message)); });
});
},
function () {
if (!signedIn())
return setStatus("Sign in to sell gold.");
if (!ageAdult())
return setStatus("Selling gold for real money is for players aged 18 and over.");
goldRates().then(function (rt) {
if (!rt)
return setStatus("The gold exchange isn't open yet.");
if (!rt.cash_on)
return setStatus("Selling gold for money is switched off for now.");
if (!rt.sell_on)
return setStatus("Selling gold back is closed for now.");
var n = Math.floor(+prompt("How much gold would you like to sell back? You get $1 for every " + rt.sell_per_dollar + " gold. The smallest sale is " + Number(rt.sell_min).toLocaleString() + " gold. Starting income can't be sold.", String(rt.sell_min)) || 0);
if (n <= 0)
return;
var to = prompt("Where should the money be sent? For example: PayPal you@email.com, or Cash App $yourname.");
if (!to || to.trim().length < 3)
return;
var usd = Math.floor(n / rt.sell_per_dollar * 100) / 100;
if (!confirm("Sell " + n.toLocaleString() + " gold for $" + usd.toFixed(2) + ", sent to " + to.trim() + "? The gold leaves your wallet now and the money is sent once a keeper approves it. You can cancel until then."))
return;
cityRpc("gold_sell_request", { p_gold: n, p_payout_to: to.trim() }).then(function (o) {
if (!o || o.error)
return setStatus(esc((o && o.error) || "That didn't go through."));
setStatus("<b>" + gold(o.gold) + " held for sale.</b> $" + Number(o.usd).toFixed(2) + " will be sent once a keeper approves it. Reference <b>GX-" + o.id + "</b>.");
refreshStanding();
goldMine();
}).catch(function (e) { setStatus(esc(e.message)); });
});
},
function () {
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
},
function (id, lot) {
return cityRpc("buy_item", { p_item: id, p_lot: lot || null }).then(function (o) {
setStatus(o === "ok" ? "<b>Bought.</b> It is yours, and it is in your things." : esc(String(o)));
return Promise.all([refreshStanding(), loadThings()]).then(function () { return o; });
}).catch(function (e) { setStatus(esc(e.message)); return String((e && e.message) || e); });
},
function (name) {
if (!name) {
riding = null;
rideSpeed = 1;
setStatus("On foot again.");
paintThings();
return;
}
var t = myThings.filter(function (x) { return x.name === name && x.speed; })[0];
if (!t)
return setStatus("You do not own that, or it is not for riding.");
riding = t.name;
rideSpeed = +t.speed || 1;
setStatus("<b>On the " + esc(t.name.toLowerCase()) + ".</b> " + (rideSpeed.toFixed(1)) + " times your own pace." +
((t.archetype === "broomstick" || t.archetype === "flyingcarpet") ? " It rises while you are on it." : ""));
if ((t.archetype === "broomstick" || t.archetype === "flyingcarpet" || t.archetype === "saucer") && typeof canFly !== "undefined")
canFly = true;
paintThings();
},
function () {
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
},
function () {
var el = document.getElementById("city-shop");
if (!el)
return;
el.innerHTML = "Looking\u2026";
catalogueRead("select=id,kind,archetype,name,price,speed,note&listed=eq.true", true).catch(function () { return []; }).then(function (rows) {
if (Array.isArray(rows))
rows = rows.filter(function (r) { return !keyNeverSold(r); });
if (!rows || !rows.length) {
el.innerHTML = "<span style='color:var(--dim)'>" + notOpenYet("The shop isn't open yet.", "The shop is empty. Run the latest server update in the SQL Editor.") + "</span>";
return;
}
var by = {};
rows.forEach(function (r) { (by[r.kind] = by[r.kind] || []).push(r); });
var h = "";
Object.keys(by).forEach(function (k) {
h += "<div style='margin-top:10px;color:var(--gold);font-family:var(--sans);font-size:12px;letter-spacing:.08em;text-transform:uppercase'>" + esc(k) + "</div>";
by[k].forEach(function (r) {
h += "<div style='display:flex;justify-content:space-between;gap:10px;padding:5px 0;border-bottom:1px solid var(--line)'>" +
"<span>" + esc(r.name) + (r.speed ? (" <span style='color:var(--dim)'>\u00b7 " + (+r.speed).toFixed(1) + "\u00d7 pace</span>") : "") +
(r.note ? ("<br><span style='color:var(--dim);font-size:12px'>" + esc(r.note) + "</span>") : "") + "</span>" +
"<span style='white-space:nowrap'>" + gold(r.price) + " <button class='btn' data-buy='" + r.id + "'>Buy</button></span></div>";
});
});
el.innerHTML = h;
Array.prototype.forEach.call(el.querySelectorAll("[data-buy]"), function (b) {
b.onclick = function () { buyItem(+b.getAttribute("data-buy"), null); };
});
});
},
function () {
return cityRpc("work_the_ground").then(function (rows) {
if (!rows || !rows.length)
setStatus("Nothing came up. Either your work is not of the ground, or you have only just been paid.");
else
setStatus("<b>Brought up:</b> " + rows.map(function (r) { return r.got + " " + r.kind; }).join(", ") + ".");
return loadStock();
}).catch(function (e) { setStatus(esc(e.message)); });
},
function () {
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
},
function (kind, amount, each) {
return cityRpc("list_stock", { p_kind: kind, p_amount: amount, p_each: each }).then(function (o) {
setStatus(o === "ok" ? "<b>Listed.</b> Somebody building their own ground will find it." : esc(String(o)));
return Promise.all([loadStock(), loadMarket()]);
}).catch(function (e) { setStatus(esc(e.message)); });
},
function (employerId, title, kind, rate, positions) {
return cityRpc("post_job", { p_employer: employerId, p_title: title, p_kind: kind, p_rate: rate, p_positions: positions }).then(function (o) {
setStatus(o === "ok" ? "<b>Posted.</b> It is on the job board now." : esc(String(o)));
return Promise.all([loadMyJobs(), showJobBoard()]);
}).catch(function (e) { setStatus(esc(e.message)); });
},
function (jobId) {
return freshToken().then(function (tok) {
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/applications?select=id,user_id,said,at&job_id=eq." + jobId + "&state=eq.waiting&order=at", {
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + (tok || DW_CONFIG.supabaseKey) }
}).then(function (r) { return r.ok ? r.json() : []; });
}).catch(function () { return []; });
},
function () {
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
},
function (id, name) {
if (!confirm("Let " + name + " go? Their last hours are paid on the next payday."))
return;
cityRpc("fire", { p_employment: id }).then(function (o) {
setStatus(o === "ok" ? "<b>" + esc(name) + " has been let go.</b> Their last hours are paid on the next payday." : esc(String(o)));
loadMyJobs();
}).catch(function (e) { setStatus(esc(e.message)); });
},
function (employerId, name) {
cityRpc("pay_staff", { p_employer: employerId }).then(function (o) {
o = o || {};
if (o.error)
return setStatus(esc(o.error));
var h = o.paid ? ("<b>" + esc(name) + "</b> paid " + o.paid + (o.paid === 1 ? " worker " : " workers ") + "<b>" + gold(o.gold) + "</b>.") : "Nobody at " + esc(name) + " was due pay.";
if (o.short)
h += " " + o.short + " could not be paid: there is not enough gold in your wallet. Their pay waits in full.";
if (o.not_due)
h += " " + o.not_due + " not due until the next payday.";
setStatus(h);
refreshStanding();
loadMyJobs();
}).catch(function (e) { setStatus(esc(e.message)); });
},
function () {
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
];
});
