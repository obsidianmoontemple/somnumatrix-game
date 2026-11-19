/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(241, function () {
"use strict";
return [
function (K) {
var W = K.W, D = K.D, put = K.put, back = Math.max(3.8, D * 0.3), zp = K.B + back;
K.wallX(zp, K.L, K.R, [K.R - 1.8]);
K.rowBack("filecabinet", K.B + 0.45, K.L + 0.8, Math.min(K.R - 3.4, K.L + 0.8 + 0.9 * 7), 0.9, 0);
var nb = W >= 12 ? 3 : 2, bz = Math.min(zp - 1.1, K.B + back * 0.62);
for (var i = 0; i < nb; i++) {
var bx = K.L + W * (i + 0.5) / nb - (i === nb - 1 ? 0.8 : 0);
put("billdesk", bx, bz, 0);
put("chair", bx, bz - 0.85, 0);
}
put("filecabinet", K.R - 0.45, K.B + 0.9, -Math.PI / 2);
put("clock", K.R - 0.15, (K.B + zp) / 2, -Math.PI / 2);
put("chandelier", 0, (K.B + zp) / 2, 0);
K.spot(K.L + W / 4, (K.B + zp) / 2, "the claims room");
var zr = K.Fz - 3.4;
put("trtill", K.L + 2.2, zr, 0);
if (W >= 11)
put("trcounter", K.L + 2.2 + 2.4, zr, 0);
var z0 = zp + 1.6, z1 = zr - 2.2, rows = (z1 - z0) >= 3.4 ? 2 : 1, cols = Math.max(2, Math.min(4, Math.floor((W - 1.6) / 3.4)));
for (var r = 0; r < rows; r++) {
var dz = rows === 1 ? (z0 + z1) / 2 : z0 + r * (z1 - z0);
for (var c = 0; c < cols; c++) {
var dx = K.L + W * (c + 0.5) / cols;
put("desk", dx, dz, 0);
put("chair", dx, dz - 0.85, 0);
put("chair", dx - 0.4, dz + 0.9, Math.PI);
put("chair", dx + 0.4, dz + 0.9, Math.PI);
}
}
put("benchin", K.R - 1.4, K.Fz - 2.2, -Math.PI / 2);
if (D >= 12)
put("benchin", K.R - 1.4, K.Fz - 4.6, -Math.PI / 2);
put("plant", K.R - 0.8, K.Fz - 0.9, 0);
put("plant", K.L + 0.8, zp + 0.8, 0);
put("noticeboard", K.L + 0.15, K.Fz - 1.6, Math.PI / 2);
put("clock", K.R - 0.15, zp + 1.4, -Math.PI / 2);
put("chandelier", 0, (z0 + z1) / 2, 0);
put("chandelier", 0, K.Fz - 2.4, 0);
K.spot(K.L + 2.2, zr - 1.2, "reception");
K.spot(0, (z0 + z1) / 2 + 1.4, "the brokers' floor");
K.spot(K.R - 2.6, K.Fz - 3, "waiting");
},
function (d) {
var was = BILL.data, first = BILL.first;
BILL.data = d;
BILL.first = false;
if (d && d.ok) {
var news = [], late = [];
(d.bills || []).forEach(function (b) {
if (b.status !== "open" || !(b.owed > 0))
return;
if (!BILL.seen[b.id]) {
BILL.seen[b.id] = 1;
if (!first)
news.push(b);
}
if (b.overdue && !BILL.warned[b.id]) {
BILL.warned[b.id] = 1;
late.push(b);
}
});
if (news.length)
setStatus("<b>A bill:</b> " + esc(news[0].payee) + ", " + billG(news[0].owed) + ", due " + billDay(news[0].due) + ". The letter is on its way to your mailbox (<b>Post · Bills</b>).");
else if (late.length && !(d.exempt))
setStatus("<b>" + late.length + " bill" + (late.length === 1 ? " is" : "s are") + " past due.</b> Open <b>Post · Bills</b> to pay" + (late.some(function (b) { return b.kind === "hospital"; }) ? " (a hospital bill can be paid in part, on a plan)" : "") + ".");
var mine = {};
(d.homes || []).forEach(function (h) { if (h.service === "power" && h.off && h.name)
mine[h.name] = h.off_at || true; });
Object.keys(mine).forEach(function (n) { BILL.dark[n] = BILL.dark[n] || mine[n]; });
}
billRepaint();
},
function (p, after) {
BILL.msg = "…";
billRepaint();
return p.then(function (o) {
BILL.msg = (o && o.say) || (o && o.ok ? "Done." : "That did not go through.");
if (typeof setStatus === "function" && o && o.say)
setStatus(esc(o.say));
if (after)
after(o);
return billLoad(true);
})
.catch(function (e) { BILL.msg = billErr(e); billRepaint(); });
},
function () {
var d = BILL.data;
if (!d) {
billLoad(true);
return billDim("Reading your bills…");
}
if (!d.ok)
return billDim(esc(d.say || ""));
var h = "";
if (BILL.msg)
h += '<div style="margin:2px 0 6px"><b>' + esc(BILL.msg) + '</b></div>';
if (d.exempt === "keeper")
h += '<div style="margin:4px 0">' + billDim("The Keeper pays nothing: care, insurance, power and water are all free for you.") + '</div>';
if (d.exempt === "visitor")
h += '<div style="margin:4px 0">' + billDim("You are a visitor: the city cares for you free, and you hold no home or vehicle here, so nothing is billed. Residents pay bills from their wages.") + '</div>';
var open = (d.bills || []).filter(function (b) { return b.status === "open" && b.owed > 0; }), owed = open.reduce(function (s, b) { return s + (Number(b.owed) || 0); }, 0);
h += '<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin:4px 0">' +
'<span>You have <b>' + billG(d.gold) + '</b></span><span>Owed <b>' + billG(owed) + '</b></span></div>' +
billDim("Bills are made up each payday (the next is " + esc(billDay(d.next_cycle)) + "). Pay them from your wages before the due date.");
var hs = d.hospital || {};
if (hs.overdue > 0) {
h += '<div style="margin:8px 0;padding:8px;border:1px solid #8A6A3A;border-radius:3px;background:rgba(232,200,112,.06)">' +
'<b>The City Hospital: ' + billG(hs.owed) + ' past due</b> (' + hs.days + ' day' + (hs.days === 1 ? '' : 's') + ').<br>' +
'A medical bill never brings gaol or court. But until it is paid, or you keep to a payment plan, the hospital ' +
(hs.turned_away ? 'turns you away for anything that is not an emergency, and ' : '') + 'makes you wait about <b>' + (Number(hs.wait) || 2).toFixed(1).replace(/\.0$/, "") + ' times</b> as long if you go down. ' +
'If you are down, they always take you in.</div>';
}
var homes = {};
(d.homes || []).forEach(function (x) { (homes[x.name || ("lot " + x.lot)] = homes[x.name || ("lot " + x.lot)] || {})[x.service] = x; });
Object.keys(homes).forEach(function (n) {
var p = homes[n].power, w = homes[n].water;
h += pRow('<b>' + esc(n) + '</b> ' + billDim("your home"), (p ? (p.off ? '<span style="color:#E0A050">Power off</span>' : 'Power on') : '') + (w ? ' · ' + (w.off ? '<span style="color:#E0A050">Water off</span>' : 'Water on') : ''));
});
h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px"><b>Due</b>' + (open.length > 1 ? billBtn("all", "Pay all") : "") + '</div>';
if (!open.length)
h += '<div style="margin-top:4px">' + billDim(d.exempt ? "Nothing to pay." : "Nothing is owed. Well kept.") + '</div>';
open.forEach(function (b) { h += billRowHtml(b); });
var paid = (d.bills || []).filter(function (b) { return b.status !== "open" || !(b.owed > 0); });
if (paid.length) {
h += '<div style="margin-top:10px"><b>Paid lately</b></div>';
paid.slice(0, 6).forEach(function (b) { h += pRow(esc(BILL_KIND[b.kind] || b.kind) + ' · ' + esc(b.title || "") + ' ' + billDim(billDay(b.issued)), billDim(b.status === "void" ? "void" : billG(b.amount))); });
}
var pol = (d.policies || []).filter(function (p) { return p.status === "active"; });
h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px"><b>Insurance</b>' + billBtn("ins", "Compare quotes") + '</div>';
if (!pol.length)
h += billDim("No policies. Without insurance you pay the whole of a hospital stay, a crash or a loss yourself.");
pol.forEach(function (p) { h += pRow('<b>' + esc(p.name) + '</b> ' + billDim(esc(p.line) + (p.lot ? " · " + esc(p.lot) : "") + (p.free ? " · free" : " · " + billG(p.premium) + " / 2 weeks")), billBtn("cancel:" + p.id, "Cancel")); });
(d.policies || []).filter(function (p) { return p.status !== "active"; }).slice(0, 3).forEach(function (p) { h += pRow(billDim(esc(p.name) + " · " + esc(p.status) + (p.why ? " (" + esc(p.why) + ")" : "")), ""); });
var cm = d.commissions || {};
if (cm.n > 0)
h += '<div style="margin-top:6px">' + billDim("Your commission as a broker, the last 30 days: ") + '<b>' + billG(cm.gold) + '</b>' + billDim(" on " + cm.n + " premium" + (cm.n === 1 ? "" : "s")) + '</div>';
h += '<details style="margin-top:10px"><summary style="cursor:pointer">' + billDim("How bills work") + '</summary><div style="margin-top:4px;color:var(--dim)">' +
'• Pay before the due date. A reminder comes a few days before.<br>' +
'• Power and water: past due adds a late fee, then a final notice, then the supply is cut off and the house goes dark. Paying the bill and the reconnection fee brings it back.<br>' +
'• Insurance: an unpaid premium lets the policy lapse after a week\'s grace. A lapsed policy pays nothing.<br>' +
'• Hospital bills can be paid in part. Pay at least the plan amount every two weeks (each payday) and your account stays in good standing.<br>' +
'• Nobody goes to gaol for a bill.</div></details>';
return h;
},
function (b) {
var big = BILL.open[b.id], due = b.overdue ? '<span style="color:#E0A050">past due ' + esc(billDay(b.due)) + '</span>' : 'due ' + esc(billDay(b.due));
var h = '<div style="margin-top:6px;padding:7px 8px;border:1px solid rgba(255,255,255,.12);border-radius:3px">' +
'<div style="display:flex;justify-content:space-between;gap:6px"><span><b>' + esc(BILL_KIND[b.kind] || b.kind) + '</b> · ' + esc(b.payee || "") + '</span><b style="white-space:nowrap">' + billG(b.owed) + '</b></div>' +
'<div>' + esc(b.title || "") + ' · ' + due + (b.paid > 0 ? ' ' + billDim("· " + billG(b.paid) + " paid") : '') + '</div>';
if (b.kind === "hospital" && b.plan_min)
h += '<div>' + billDim("Payment plan: at least " + billG(b.plan_min) + " every two weeks (each payday)" + (b.on_plan ? " — you are keeping to it" : "")) + '</div>';
if (big) {
h += '<div style="margin-top:4px;border-top:1px solid rgba(255,255,255,.08);padding-top:4px">';
(b.lines || []).forEach(function (l) { h += pRow(esc(l.what || ""), billG(l.gold)); });
if (b.covered > 0)
h += pRow("Your insurer paid", "−" + billG(b.covered));
if (b.note)
h += '<div style="margin-top:3px">' + billDim(esc(b.note)) + '</div>';
h += '</div>';
}
h += '<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;margin-top:6px">' + billBtn("more:" + b.id, big ? "Less" : "Details") +
(b.kind === "vehicle" && !(b.covered > 0) && b.owed > 0 && b.status === "open" ? billBtn("claim:" + b.id, "Claim on my insurance") : "") +
billBtn("part:" + b.id, "Pay part") + billBtn("pay:" + b.id, "Pay " + billG(b.owed)) + '</div></div>';
return h;
},
function () {
if (typeof POST === "undefined")
return;
if (!billShow()) {
setStatus("Your bills come to your mailbox in Somnucor: open <b>Post · Bills</b> there.");
return;
}
POST.open = true;
POST.tab = "bills";
POST.reading = null;
BILL.msg = "";
if (typeof GAZ !== "undefined" && GAZ.open) {
GAZ.open = false;
if (typeof gazPaint === "function")
gazPaint();
}
if (typeof postLoad === "function")
postLoad();
billLoad(true);
postPaint();
},
function () {
var I = BILL.ins;
if (I.line === "mine") {
return;
}
I.busy = true;
cityRpc("insurance_quotes", { p_line: I.line, p_lot: I.line === "home" ? (I.lot || null) : null }).then(function (q) { I.busy = false; I.q = q; if (q && q.lot)
I.lot = q.lot; billInsPaint(); })
.catch(function (e) { I.busy = false; I.q = { ok: false, say: billErr(e) }; billInsPaint(); });
},
function () {
var el = document.getElementById("bill-ins");
if (!el) {
if (!document.body)
return;
el = document.createElement("div");
el.id = "bill-ins";
el.style.cssText = (typeof POST_BOX !== "undefined" ? POST_BOX : "position:fixed;right:12px;bottom:140px;width:min(460px,calc(100vw - 24px));max-height:74vh;overflow:auto;background:rgba(8,10,16,.97);padding:12px 14px;color:var(--bone)") + ";z-index:48";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("change", function (e) { if (e.target && e.target.id === "bill-lot") {
BILL.ins.lot = Number(e.target.value) || null;
BILL.ins.q = null;
billInsQuote();
billInsPaint();
} });
document.body.appendChild(el);
}
var I = BILL.ins;
if (!I.open) {
el.style.display = "none";
return;
}
el.style.display = "block";
var keepBroker = (document.getElementById("bill-broker") || {}).value || "";
var h = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font-size:14px">Somnucor Insurance Brokers</b>' + billBtn("insx", "Close") + '</div>' +
'<div style="display:flex;gap:4px;margin:8px 0;flex-wrap:wrap">' + BILL_LINES.map(function (t) { return billBtn("line:" + t[0], t[1], ' style="' + (I.line === t[0] ? 'border-color:#C9A040;color:#F4E6C0' : 'opacity:.8') + '"'); }).join("") + '</div>';
if (I.msg)
h += '<div style="margin:4px 0 6px;padding:6px 8px;border-radius:3px;border:1px solid ' + (I.ok === true ? 'rgba(143,203,138,.6);color:#BFE6BA' : I.ok === false ? 'rgba(192,96,58,.7);color:#F0B49A' : 'rgba(255,255,255,.15)') + '"><b>' + esc(I.msg) + '</b></div>';
if (I.line === "mine")
h += billMineHtml();
else
h += billQuoteHtml(I.q);
el.innerHTML = h;
var bs = document.getElementById("bill-broker");
if (bs && keepBroker)
bs.value = keepBroker;
},
function (q) {
var I = BILL.ins;
if (!q)
return billDim(I.busy ? "Asking the insurers…" : "…");
if (!q.ok)
return billDim(esc(q.say || ""));
var h = '<div style="margin-bottom:6px;color:var(--dim)">' + BILL_LINE_SAY[q.line] + '</div>';
if (q.exempt === "keeper")
h += '<div>' + billDim("Keeper: every policy is free for you.") + '</div>';
if (q.exempt === "visitor")
h += '<div>' + billDim("Visitors are cared for free by the city and hold nothing to insure. Insurance is for residents.") + '</div>';
if (q.line === "home") {
if (!(q.homes || []).length)
return h + billDim("You have no home in Somnucor to insure. Rent or buy one at the Land Office first.");
h += '<div style="margin:4px 0">' + billDim("Home") + ' <select id="bill-lot">' + q.homes.map(function (x) { return '<option value="' + x.id + '"' + (x.id === q.lot ? " selected" : "") + '>' + esc(x.name) + (x.own ? " (you own it)" : " (you rent it)") + '</option>'; }).join("") + '</select>' +
(q.owner && q.home_value ? ' ' + billDim("valued at " + billG(q.home_value)) : "") + '</div>';
}
if (q.line === "vehicle" && q.risk && Number(q.risk) !== 1)
h += '<div>' + billDim("Your driving record sets your premium at ") + '<b>' + Number(q.risk).toFixed(2) + '×</b>' + billDim(" the standard rate (claims, penalty points, or no licence).") + '</div>';
var bro = q.brokers || [], si = billStandIn();
h += '<div style="margin:6px 0">' + billDim("Your broker") + ' ';
if (bro.length)
h += '<select id="bill-broker">' + bro.map(function (b) { return '<option value="' + esc(b.id) + '">' + esc(b.name || "a broker") + '</option>'; }).join("") + '</select>';
else
h += '<b>' + esc(si || "the duty broker") + '</b> ' + billDim("(stand-in)");
h += '</div>';
if (!q.exempt && !billAtDesk())
h += '<div style="margin:6px 0;padding:6px 8px;border:1px solid rgba(201,160,64,.5);border-radius:3px;color:#F4E6C0">You can compare from anywhere. <b>To take out a policy, come to Somnucor Insurance Brokers on the Market Ring</b>: a broker signs it with you there. ' + billBtn("way", "Show me the way") + '</div>';
if (q.current)
h += '<div style="margin:4px 0">Your cover now: <b>' + esc(q.current.name) + '</b> ' + billDim(billG(q.current.premium) + " / 2 weeks") + '</div>';
var tiers = [], by = {};
(q.plans || []).forEach(function (p) { if (!by[p.tier]) {
by[p.tier] = [];
tiers.push(p.tier);
} by[p.tier].push(p); });
var names = {};
(q.insurers || []).forEach(function (i) { names[i.id] = i.name; });
tiers.forEach(function (t) {
var ps = by[t], low = Math.min.apply(null, ps.map(function (p) { return Number(p.premium) || 0; }));
h += '<div style="margin-top:10px"><b>' + esc(billTierName(q.line, t)) + '</b>' + (ps[0].covers && q.line !== "health" ? ' ' + billDim("· " + esc(ps[0].covers)) : '') + '</div>';
ps.forEach(function (p) {
var mine = q.current && q.current.plan === p.id;
h += '<div style="display:flex;justify-content:space-between;gap:6px;align-items:center;margin-top:4px;padding:5px 7px;border:1px solid rgba(255,255,255,' + (mine ? '.35' : '.1') + ');border-radius:3px' + (p.fits === false ? ';opacity:.55' : '') + '">' +
'<span><b>' + esc(names[p.insurer] || p.insurer) + '</b> ' + (q.line === "health" ? billDim(esc(p.name)) + ' ' : '') + '· <b>' + billG(p.premium) + '</b>' + billDim(" / 2 wk") + (Number(p.premium) === low && ps.length > 1 ? ' ' + billDim("· lowest") : '') + '<br>' +
billDim(billTerms(q.line, p)) + '</span>' +
'<span style="white-space:nowrap">' + (mine ? billDim("yours") : p.fits === false ? billDim(q.owner ? "for renters" : "for owners") : billBtn("buy:" + p.id, (q.exempt || billAtDesk()) ? "Take it" : "Take it at the brokerage")) + '</span></div>';
});
});
return h;
},
function (line, t) {
var n = { basic: "Basic: low premium, high deductible", standard: "Standard", plus: "Plus: high premium, little to pay when hurt", liability: "Third-party (liability)", collision: "Collision", full: "Full cover", renters: "Renters'", owners: "Homeowners'", owners_plus: "Homeowners' plus" };
return n[t] || (t.charAt(0).toUpperCase() + t.slice(1));
},
function (line, p) {
if (line === "health")
return "deductible " + billG(p.deductible) + " · you pay " + p.coins + "% after · at most " + billG(p.oop_max) + " a year";
if (line === "vehicle")
return /liability/.test(p.id) ? "pays the other party only" : "deductible " + billG(p.deductible) + " on your own repairs";
if (/renters/.test(p.id))
return "your things up to " + billG(p.oop_max) + " · deductible " + billG(p.deductible);
return "deductible " + billG(p.deductible);
},
function () {
var d = BILL.data;
if (!d)
return billDim("Reading your policies…");
if (!d.ok)
return billDim(esc(d.say || ""));
var pol = d.policies || [];
if (!pol.length)
return billDim("No policies yet. Compare quotes under Health, Vehicle and Home.");
var h = "";
pol.forEach(function (p) {
h += '<div style="margin-top:6px;padding:6px 8px;border:1px solid rgba(255,255,255,.12);border-radius:3px"><b>' + esc(p.name) + '</b> ' + billDim("no. " + p.id + " · " + esc(p.line) + (p.lot ? " · " + esc(p.lot) : "")) + '<br>' +
(p.status === "active" ? (p.free ? "Free (Keeper)" : billG(p.premium) + " every two weeks") + ' · paid to ' + esc(billDay(p.paid_through)) + (p.broker ? ' · broker ' + esc(p.broker) : '') :
billDim(esc(p.status) + (p.why ? ": " + esc(p.why) : ""))) +
(p.line === "health" && p.status === "active" ? '<br>' + billDim("This year: " + billG(p.ded_used) + " of the " + billG(p.deductible) + " deductible, " + billG(p.oop_used) + " of the " + billG(p.oop_max) + " maximum") : "") +
(p.status === "active" ? '<div style="text-align:right;margin-top:4px">' + billBtn("cancel:" + p.id, "Cancel") + '</div>' : '') + '</div>';
});
return h;
},
function (plan) {
var I = BILL.ins, q = I.q || {}, p = (q.plans || []).filter(function (x) { return x.id === plan; })[0];
if (!p)
return;
if (!q.exempt && !billAtDesk()) {
I.ok = false;
I.msg = "Policies are signed with a broker at Somnucor Insurance Brokers on the Market Ring. Follow the pointer there, and take this one at the counter.";
billInsPaint();
setStatus("<b>Insurance:</b> come to the brokerage on the Market Ring to sign. Follow the pointer.");
if (typeof showTheWay === "function")
showTheWay(BILL_KEY);
return;
}
var names = {};
(q.insurers || []).forEach(function (i) { names[i.id] = i.name; });
if (!confirm("Take " + (names[p.insurer] || p.insurer) + " " + (p.name || billTierName(q.line, p.tier)) + " for " + p.premium + " gold every two weeks?\nThe first premium (for the days to the next payday) is paid now; after that it is billed to your mailbox each payday." + (q.current ? "\nYour present cover (" + q.current.name + ") is cancelled and its unused days refunded." : "")))
return;
var bs = document.getElementById("bill-broker"), broker = bs && bs.value ? bs.value : null;
I.msg = "The broker is drawing it up…";
I.ok = null;
billInsPaint();
var at = (typeof myPlace === "function") ? myPlace() : null;
var tell = at ? cityRpc("upsert_presence_at", { p_x: at.x, p_z: at.z, p_rot: (typeof presenceRot === "function" ? presenceRot() : (typeof yaw !== "undefined" ? yaw : 0)), p_realm: "somnucor", p_place: at.place, p_level: at.level }).catch(function () { }) : Promise.resolve();
tell.then(function () { return cityRpc("insurance_buy", { p_plan: plan, p_lot: q.line === "home" ? (q.lot || null) : null, p_broker: broker }); }).then(function (o) {
var ok = !!(o && o.ok);
I.ok = ok;
I.msg = (o && o.say) || (ok ? "You are covered." : "The insurer did not take it. Try again in a moment.");
setStatus((ok ? "<b>Insured.</b> " : "<b>Not taken out.</b> ") + esc(I.msg));
if (ok) {
I.line = "mine";
I.q = null;
billLoad(true);
}
else
billInsQuote();
billInsPaint();
}).catch(function (e) { I.ok = false; I.msg = billErr(e); billInsPaint(); });
},
function (H) {
if (!H || BILL.missing || !(typeof signedIn === "function" && signedIn()))
return;
var D = (typeof DRIVE !== "undefined") ? DRIVE : null;
if (!D || !D.on || D.mode !== "road" || D.src === "corp" || D.test || (D.spec && D.spec.learner))
return;
if (typeof trfInCity === "function" && !trfInCity())
return;
var mph = Math.round((H.v || 0) / (typeof MPH_MS !== "undefined" ? MPH_MS : 0.44704));
if (mph < 6)
return;
if (Date.now() - BILL.crashAt < 20000)
return;
BILL.crashAt = Date.now();
var kind = H.k === "v" ? "vehicle" : H.k === "p" ? "pedestrian" : "solid";
var what = (kind === "vehicle" ? "collided with a " + ((H.s && H.s.arch) || "vehicle") : kind === "pedestrian" ? "struck somebody on foot" : "hit something solid") + " at " + mph + " mph";
cityRpc("bill_vehicle_crash", { p_mph: mph, p_kind: kind, p_what: what }).then(function (o) {
if (o && o.bill && o.say)
setTimeout(function () { setStatus("<b>The repair bill.</b> " + esc(o.say)); }, 4000);
if (o && o.bill)
setTimeout(function () { billLoad(true); }, 5000);
}).catch(function (e) { billErr(e); });
},
function () {
if (typeof HARM === "undefined" || HARM.state !== "hurt")
return;
var d = BILL.data;
if (!d || !d.ok || d.exempt || !(d.hospital && d.hospital.turned_away))
return;
if (Date.now() - BILL.hospSaid < 60000)
return;
BILL.hospSaid = Date.now();
setStatus("<b>Reception:</b> “Your account with us is " + d.hospital.days + " days past due (" + billG(d.hospital.owed) + "). We can't book care that isn't an emergency until it is paid, or until you start a payment plan. If you are ever badly hurt, we will always take you in.”");
},
function () {
if (!BILL_SHADE.mat)
BILL_SHADE.mat = new THREE.MeshBasicMaterial({ color: 0x1A2028, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
var dl = (typeof daylight === "function" && typeof dreamHour === "function") ? daylight(dreamHour()) : 1;
BILL_SHADE.mat.color.setHex(typeof blend === "function" ? blend(0x3A4654, 0x0E1116, 1 - dl) : 0x1A2028);
return BILL_SHADE.mat;
},
function (spec) {
var g = build(Object.assign({}, spec, { id: "__billdark_" + spec.id, detail: 3, nights: [] }));
g.position.set(spec.x, (typeof terrainY === "function") ? terrainY(spec.x, spec.z) + (spec.y || 0) : 0, spec.z);
g.rotation.y = spec.rot || 0;
g.updateMatrixWorld(true);
var glass = new Set(g.userData.glass || []), out = new THREE.Group(), mat = billShadeMat();
out.name = "unlit windows";
out.matrixAutoUpdate = false;
g.traverse(function (m) {
if (!m.isMesh || !glass.has(m.material))
return;
var c = m.isInstancedMesh ? new THREE.InstancedMesh(m.geometry, mat, m.count) : new THREE.Mesh(m.geometry, mat);
if (m.isInstancedMesh)
c.instanceMatrix = m.instanceMatrix;
c.matrixAutoUpdate = false;
c.matrix.copy(m.matrixWorld);
c.matrixWorld.copy(m.matrixWorld);
c.renderOrder = 2;
c.raycast = function () { };
c.userData.noCull = true;
out.add(c);
});
return out.children.length ? out : null;
},
function (sp) {
var g = meshes[sp.id];
if (!g)
return false;
if (typeof BAKE !== "undefined" && BAKE.chunks && typeof bakeChunkKey === "function") {
var ch = BAKE.chunks[bakeChunkKey(sp)];
if (ch && ch.meshes && ch.meshes.length && (g.userData.liteStripped || ch.members && ch.members.some(function (M) { return M.id === sp.id; })))
return ch.meshes.some(function (m) { return m.visible; });
}
return g.visible !== false && !g.userData.culled;
},
function () {
if (typeof scene === "undefined" || !scene || typeof build !== "function" || typeof specById !== "function")
return;
var want = {}, P = camera.position, inCity = typeof careInCity === "function" && careInCity();
if (inCity && Object.keys(BILL.dark).length) {
var plots = (typeof lotPlots === "function") ? lotPlots() : (store.plots || []), n = 0;
plots.forEach(function (p) {
if (n >= 12 || !BILL.dark[p.name] || !p.homeId)
return;
var sp = specById(p.homeId);
if (!sp || Math.hypot(sp.x - P.x, sp.z - P.z) > 320)
return;
want[p.homeId] = 1;
n++;
if (!BILL_SHADE.g[p.homeId]) {
var o = null;
try {
o = billShadeMake(sp);
}
catch (e) {
o = null;
}
BILL_SHADE.g[p.homeId] = o || "none";
if (o) {
o.visible = false;
scene.add(o);
}
}
var sh = BILL_SHADE.g[p.homeId];
if (sh && sh !== "none") {
var on = billHomeDrawn(sp);
if (sh.visible !== on)
sh.visible = on;
}
});
}
Object.keys(BILL_SHADE.g).forEach(function (id) { if (want[id])
return; var o = BILL_SHADE.g[id]; if (o && o !== "none")
scene.remove(o); delete BILL_SHADE.g[id]; });
if (BILL_SHADE.mat)
billShadeMat();
},
function (on) {
if (!INT || !INT.root)
return;
if (!!INT.billDark === on)
return;
INT.billDark = on;
var win = new Set((INT.winMats || []).concat(INT.winGlints || [])), pool = new Set((INT.lightPool || []).concat(INT.lightFill ? [INT.lightFill] : []));
INT.root.traverse(function (o) {
if (o.isLight) {
if (pool.has(o))
return;
if (on) {
if (o.userData.billI === undefined) {
o.userData.billI = o.intensity;
o.intensity = 0;
}
}
else if (o.userData.billI !== undefined) {
o.intensity = o.userData.billI;
delete o.userData.billI;
}
return;
}
if (!o.isMesh || !o.material || Array.isArray(o.material))
return;
if (on) {
var m = o.material;
if (o.userData.billMat || win.has(m))
return;
var glow = m.isMeshBasicMaterial && m.color && (m.color.r * 0.3 + m.color.g * 0.59 + m.color.b * 0.11) > 0.55;
var emis = m.emissive && (m.emissive.r + m.emissive.g + m.emissive.b) > 0.15;
if (!glow && !emis)
return;
var c = m.clone();
if (glow)
c.color.multiplyScalar(0.16);
if (emis)
c.emissive.setHex(0);
o.userData.billMat = m;
o.material = c;
}
else if (o.userData.billMat) {
o.material.dispose();
o.material = o.userData.billMat;
delete o.userData.billMat;
}
});
}
];
});
