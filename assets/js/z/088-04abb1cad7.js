/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(88, function () {
"use strict";
return [
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
}
];
});
