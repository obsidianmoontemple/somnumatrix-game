/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(431, function () {
"use strict";
return [
function () {
try {
if (typeof ATL_RINGS === "undefined" || typeof ATLC === "undefined" || !ATLC || !ctyIn())
return null;
var d = Math.hypot(camera.position.x - ATLC.x, camera.position.z - ATLC.z);
for (var i = 0; i < ATL_RINGS.length; i++)
if (d >= ATL_RINGS[i].S - 10 && d <= ATL_RINGS[i].E + 10)
return ATL_RINGS[i].k === "wilds" ? null : ATL_RINGS[i].k;
}
catch (e) { }
return null;
},
function () {
var B = CV.b, h = '';
if (!(typeof signedIn === "function" && signedIn()))
return cvDim("Sign in to see the councils.");
if (!B)
return cvDim("Opening the Tower's rolls…");
if (!B.on)
return cvDim("The councils are not sitting just now. The Keeper runs the city until they return.");
h += cvDim("Each ring of Somnucor elects its own council. The one with the most votes is the ring's <b>Warden</b>, and the Wardens together are the <b>High Council</b>. " +
"A council brings motions and votes on them; a motion passes when more than half of its seats say yes, and then it really happens.");
var my = B.ring, here = cvRingHere(), E = B.election;
if (B.young)
h += cvBox(cvDim("The councils are for dreamers aged 13 and over."));
else if (!B.paid)
h += cvBox(cvDim("Voting and standing are for dreamers whose dues are paid. Everyone can read who sits and what they decide."));
else if (B.keeper)
h += cvBox(cvDim("👑 Keeper: you set the limits and stay above the vote. You can veto any open motion here; every other control is on the Keeper page, under In the game, Councils."), true);
else if (!my) {
h += cvBox('<b style="color:#F2E6C4">Join a ring\'s roll</b>' + cvDim("Choose the ring you call home. You vote for its council and may stand for it. You may move once in 30 days.") +
(here ? cvBtn("cvjoin", "📍 " + esc(cvRing(here)) + " (where I stand)", ' data-k="' + here + '"', true) : "") +
'<div>' + (B.rings || []).filter(function (r) { return r.k !== here; }).map(function (r) { return cvBtn("cvjoin", esc(r.n), ' data-k="' + r.k + '"'); }).join("") + '</div>', true);
}
else
h += cvDim("🏠 You are on the roll of <b>" + esc(cvRing(my)) + "</b>." + (B.ring_since && Date.now() - new Date(B.ring_since).getTime() > 30 * 86400000 ? " " + cvBtn("cvmove", "Move to another ring") : ""));
if (CV.form === "move" && my)
h += cvBox(cvDim("Move your roll to:") + '<div>' + (B.rings || []).filter(function (r) { return r.k !== my; }).map(function (r) { return cvBtn("cvjoin", esc(r.n), ' data-k="' + r.k + '"'); }).join("") + '</div>');
if (E) {
var mine = (E.candidates || []).filter(function (c) { return c.ring === my; }), stage = E.status === "nominating" ? "Nominations are open" : "Voting is open";
var x = '<b style="color:#F2E6C4">🗳️ The election · ' + stage + '</b>';
x += cvDim(E.status === "nominating" ? "Stand until " + cvDay(E.vote_from) + ". Voting then runs until " + cvDay(E.count_at) + "." : "Votes are counted " + cvDay(E.count_at) + " (in " + cvLeft(E.count_at) + "). You may change your vote until then.");
if (my) {
x += '<div style="margin-top:6px"><b>Standing in ' + esc(cvRing(my)) + '</b></div>';
if (!mine.length)
x += cvDim("Nobody yet." + (E.status === "nominating" ? " Be the first." : ""));
mine.forEach(function (c) {
var voted = E.mine_vote === c.id;
x += '<div style="border-top:1px solid #2A3040;padding:5px 0">' + (voted ? "✓ " : "") + '<b>' + esc(c.name) + '</b>' + (c.mine ? ' <span style="color:#9AA3B5">(you)</span>' : '') +
(c.pitch ? '<br><span style="color:#C8BCA8">“' + esc(c.pitch) + '”</span>' : '') +
(E.status === "voting" && B.paid && !B.keeper ? '<br>' + cvBtn("cvvote", voted ? "✓ Your vote" : "Vote for " + esc(c.name), ' data-id="' + c.id + '"', voted) : '') + '</div>';
});
if (E.status === "nominating" && B.paid && !B.keeper) {
if (E.standing)
x += cvBtn("cvwithdraw", "Withdraw from the election");
else
x += '<input id="cv-pitch" maxlength="240" placeholder="A line to the voters (optional)" style="width:100%;box-sizing:border-box;margin:6px 0;padding:7px;background:rgba(255,255,255,.06);color:inherit;border:1px solid rgba(201,168,104,.4);border-radius:4px">' +
cvBtn("cvstand", "🙋 Stand for the council of " + esc(cvRing(my)), "", true);
}
}
var others = {};
(E.candidates || []).forEach(function (c) { if (c.ring !== my)
others[c.ring] = (others[c.ring] || 0) + 1; });
var ok = Object.keys(others);
if (ok.length)
x += cvDim("Standing elsewhere: " + ok.map(function (k) { return esc(cvRing(k)) + " " + others[k]; }).join(" · "));
if (B.keeper && (E.candidates || []).length)
x += cvDim("Keeper's count so far: " + (E.candidates || []).map(function (c) { return esc(c.name) + " (" + esc(cvRing(c.ring)) + ") " + (c.votes || 0) + (c.out ? " · stood down" : ""); }).join("; "));
h += cvBox(x, true);
}
var seats = B.seats || [], byRing = {};
seats.forEach(function (s) { (byRing[s.ring] = byRing[s.ring] || []).push(s); });
var x2 = '<b style="color:#F2E6C4">🏛️ The councils sitting now</b>' + (B.sat_at ? cvDim("Chosen " + cvDay(B.sat_at) + ".") : "");
if (!seats.length)
x2 += cvDim("No council sits yet. The first is chosen at the end of this election.");
(B.rings || []).forEach(function (r) {
var L = byRing[r.k];
if (!L)
return;
x2 += '<div style="border-top:1px solid #2A3040;padding:4px 0"><b>' + esc(r.n) + '</b>: ' + L.map(function (s) { return (s.warden ? "👑 " : "") + esc(s.name) + (s.warden ? " (Warden)" : "") + (s.mine ? " · you" : ""); }).join(", ") + '</div>';
});
x2 += cvDim("The market toll stands at " + (B.toll || 0) + "% (the Keeper allows " + B.rules.toll_min + "% to " + B.rules.toll_max + "%). The treasury holds " + Number(B.treasury || 0).toLocaleString() + " gold." +
(B.building ? " The city is building " + esc(B.building) + "." : ""));
h += cvBox(x2);
var meSeat = seats.filter(function (s) { return s.mine; })[0], warden = meSeat && meSeat.warden, kinds = (B.rules && B.rules.kinds) || [];
if (meSeat) {
var can = kinds.filter(function (k) { return k === "parade" || k === "notice" || warden; });
var x3 = '<b style="color:#F2E6C4">✋ Bring a motion</b>' + cvDim("You sit for " + esc(cvRing(meSeat.ring)) + (warden ? ", and on the High Council as its Warden" : "") + ". Your motion counts your own yes.");
x3 += '<div>' + can.map(function (k) { return cvBtn("cvform", CV_KIND[k], ' data-k="' + k + '"', CV.form === k); }).join("") + '</div>';
var inp = 'style="width:100%;box-sizing:border-box;margin:4px 0;padding:7px;background:rgba(255,255,255,.06);color:inherit;border:1px solid rgba(201,168,104,.4);border-radius:4px"';
if (CV.form === "parade")
x3 += '<input id="cv-title" maxlength="80" placeholder="The parade\'s name" ' + inp + '>' +
'<select id="cv-in">' + [[2, "in 2 hours"], [6, "in 6 hours"], [24, "tomorrow"], [48, "in 2 days"], [168, "in a week"]].map(function (o) { return '<option value="' + o[0] + '">' + o[1] + '</option>'; }).join("") + '</select> ' +
'<select id="cv-len">' + [[30, "for half an hour"], [60, "for an hour"], [120, "for two hours"], [180, "for three hours"]].map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === 60 ? " selected" : "") + '>' + o[1] + '</option>'; }).join("") + '</select> ' + cvBtn("cvbring", "Bring it", ' data-k="parade"', true);
if (CV.form === "notice")
x3 += '<input id="cv-title" maxlength="120" placeholder="Heading" ' + inp + '><textarea id="cv-body" maxlength="1200" rows="3" placeholder="What the council wants the city to know" ' + inp + '></textarea>' + cvBtn("cvbring", "Bring it", ' data-k="notice"', true);
if (CV.form === "toll")
x3 += cvDim("Set the toll the city takes on every sale (" + B.rules.toll_min + "% to " + B.rules.toll_max + "%). Now " + (B.toll || 0) + "%.") + '<input id="cv-toll" type="number" min="' + B.rules.toll_min + '" max="' + B.rules.toll_max + '" value="' + (B.toll || 0) + '" style="width:80px"> % ' + cvBtn("cvbring", "Bring it", ' data-k="toll"', true);
if (CV.form === "next_project")
x3 += ((B.waiting || []).length ? '<select id="cv-proj">' + B.waiting.map(function (p) { return '<option value="' + p.id + '">' + esc(p.name) + '</option>'; }).join("") + '</select> ' + cvBtn("cvbring", "Bring it", ' data-k="next_project"', true) : cvDim("Every project is built or under way."));
if (CV.form === "grant")
x3 += cvDim("Up to " + Number(B.rules.grant_max).toLocaleString() + " gold from the treasury to " + esc(B.building || "the project being built") + ".") + '<input id="cv-gold" type="number" min="1" max="' + B.rules.grant_max + '" placeholder="gold" style="width:110px"> ' + cvBtn("cvbring", "Bring it", ' data-k="grant"', true);
h += cvBox(x3, true);
}
var M = B.motions || [];
if (M.length) {
var x4 = '<b style="color:#F2E6C4">📋 Motions</b>';
M.forEach(function (m) {
var who = m.scope === "city" ? "The High Council" : "The council of " + esc(cvRing(m.ring)), open = m.status === "open";
x4 += '<div style="border-top:1px solid #2A3040;padding:6px 0"><b>' + esc(m.title) + '</b> <span style="color:#9AA3B5">· ' + who + ' · by ' + esc(m.by) + '</span>';
if (m.kind === "notice" && m.args && m.args.body)
x4 += '<div style="color:#C8BCA8">“' + esc(m.args.body) + '”</div>';
x4 += '<div style="color:' + (open ? "#E8D9B0" : m.status === "passed" ? "#8AD0A0" : "#E89A7A") + '">' + (open ? m.yes + " yes, " + m.no + " no, of " + m.body + " · needs " + (Math.floor(m.body / 2) + 1) + " · closes in " + cvLeft(m.closes_at) :
(m.status === "passed" ? "Passed. " : m.status === "vetoed" ? "Vetoed. " : "Not passed. ") + esc(m.result || "")) + '</div>';
if (open && m.can)
x4 += cvBtn("cvsay", "👍 Yes", ' data-id="' + m.id + '" data-y="1"', m.said === "yes") + cvBtn("cvsay", "👎 No", ' data-id="' + m.id + '" data-y="0"', m.said === "no");
if (open && B.keeper)
x4 += cvBtn("cvveto", "Keeper: veto", ' data-id="' + m.id + '"');
x4 += '</div>';
});
h += cvBox(x4);
}
return h;
},
function (t, a) {
var B = CV.b || {};
if (a === "cvjoin") {
var k = t.getAttribute("data-k");
CV.form = "";
cvAct("council_join", { p_ring: k });
return true;
}
if (a === "cvmove") {
CV.form = CV.form === "move" ? "" : "move";
ctyPaint();
return true;
}
if (a === "cvstand") {
cvAct("council_stand", { p_pitch: (document.getElementById("cv-pitch") || {}).value || "" });
return true;
}
if (a === "cvwithdraw") {
cvAct("council_withdraw", {});
return true;
}
if (a === "cvvote") {
cvAct("council_vote", { p_candidate: t.getAttribute("data-id") });
return true;
}
if (a === "cvform") {
var f = t.getAttribute("data-k");
CV.form = CV.form === f ? "" : f;
ctyPaint();
return true;
}
if (a === "cvsay") {
cvAct("council_say", { p_motion: +t.getAttribute("data-id"), p_yes: t.getAttribute("data-y") === "1" });
return true;
}
if (a === "cvveto") {
cvAct("council_keeper", { p_act: "veto", p_id: +t.getAttribute("data-id"), p_user: null });
return true;
}
if (a === "cvbring") {
var kind = t.getAttribute("data-k"), v = function (id) { return (document.getElementById(id) || {}).value || ""; }, args = {}, title = "";
if (kind === "parade") {
title = v("cv-title");
args = { in_hours: +v("cv-in") || 24, minutes: +v("cv-len") || 60 };
}
if (kind === "notice") {
title = v("cv-title");
args = { body: v("cv-body") };
}
if (kind === "toll")
args = { toll: Math.round(+v("cv-toll")) };
if (kind === "next_project")
args = { project: +v("cv-proj") };
if (kind === "grant")
args = { gold: Math.round(+v("cv-gold")) };
cvAct("council_motion", { p_kind: kind, p_title: title, p_args: args }, function (o) { if (o && o.ok)
CV.form = ""; });
return true;
}
return false;
},
function (force) {
var K = CV.mk;
if (K.busy || (!force && Date.now() - K.at < 20000) || typeof cityRpc !== "function" || !(typeof signedIn === "function" && signedIn()))
return;
K.busy = true;
K.at = Date.now();
cityRpc("market_board", { p_q: K.q || null }).then(function (o) { if (o && o.ok)
K.b = o; }).catch(function () { }).then(function () { K.busy = false; if (CTY.open && CTY.tab === "market")
ctyPaint(); });
},
function (l, B, mineTab) {
var open = l.status === "open", h = '<div style="border-top:1px solid #2A3040;padding:6px 0">';
h += '<b style="color:#F2E6C4">' + esc(l.name) + (l.amount > 1 ? " × " + l.amount : "") + '</b> <span style="color:#9AA3B5">· ' + (l.mine ? "yours" : "from " + esc(l.seller)) + '</span>';
if (l.mode === "sale")
h += '<div>' + mkG(l.price) + (open ? ' <span style="color:#9AA3B5">· for sale, ' + cvLeft(l.ends_at) + ' left</span>' : '') + '</div>';
else
h += '<div>' + (l.top_bid != null ? "Top bid " + mkG(l.top_bid) + " (" + l.bids + " bid" + (l.bids === 1 ? "" : "s") + ")" : "Bids from " + mkG(l.price)) + (l.buy_now ? " · buy it now " + mkG(l.buy_now) : "") +
(open ? ' <span style="color:#9AA3B5">· ends in ' + cvLeft(l.ends_at) + '</span>' : '') + (l.leading ? ' <b style="color:#8AD0A0">· you lead</b>' : '') + '</div>';
if (l.usual)
h += cvDim("Usually sells for about " + mkG(l.usual) + (l.amount > 1 ? " each" : "") + ".");
if (!open)
h += '<div style="color:' + (l.status === "sold" ? "#8AD0A0" : "#9AA3B5") + '">' + (l.status === "sold" ? "Sold for " + mkG(l.sold_price) : l.status === "cancelled" ? "Taken down" : "Not sold, back with the seller") + '</div>';
else if (l.mine) {
if (!l.top_bid)
h += cvBtn("mkcancel", "Take it down", ' data-id="' + l.id + '"');
}
else if (B.keeper)
h += cvBtn("mkcancel", "Keeper: take it down (bids go back)", ' data-id="' + l.id + '"');
else if (l.blocked)
h += cvDim("You cannot trade with this seller.");
else if (!B.young) {
var price = l.mode === "sale" ? l.price : (l.buy_now && (l.top_bid == null || l.top_bid < l.buy_now) ? l.buy_now : null), key = "b" + l.id;
if (price)
h += cvBtn("mkbuy", CV.mk.sure === key ? "Sure? Pay " + mkG(price) : "Buy" + (l.mode === "auction" ? " it now" : "") + " · " + mkG(price), ' data-id="' + l.id + '"', CV.mk.sure === key);
if (l.mode === "auction") {
var nx = mkNext(l), k2 = "d" + l.id;
h += '<input id="mk-bid-' + l.id + '" type="number" min="' + nx + '" value="' + nx + '" style="width:100px;margin-left:4px"> ' + cvBtn("mkbid", CV.mk.sure === k2 ? "Sure? Bid" : "Bid", ' data-id="' + l.id + '"', CV.mk.sure === k2);
}
}
return h + '</div>';
},
function () {
var K = CV.mk, B = K.b, h = '';
if (!(typeof signedIn === "function" && signedIn()))
return cvDim("Sign in to use the Market House.");
if (!B)
return cvDim("Opening the Market House…");
if (!B.on)
return cvDim("The Market House is closed just now.");
h += cvDim("One place where everyone buys and sells. Bids are held by the Market House and go straight back to anyone outbid. A bid in the last two minutes adds two minutes. " +
"The seller gets the price less the city's toll (" + (B.toll || 0) + "%). You hold " + mkG(B.gold) + ".");
h += '<div style="margin:4px 0 8px">' + [["browse", "🛒 Buy"], ["sell", "🏷️ Sell"], ["mine", "📦 Mine"]].map(function (t) { return cvBtn("mktab", t[1], ' data-t="' + t[0] + '"', K.tab === t[0]); }).join("") + '</div>';
if (K.tab === "browse") {
h += '<div style="display:flex;gap:6px;margin-bottom:6px"><input id="mk-q" placeholder="Look for…" value="' + esc(K.q || "") + '" style="flex:1;padding:6px"> ' + cvBtn("mkfind", "Find") + '</div>';
var L = (B.lots || []).filter(function (l) { return !l.mine; });
if (!L.length)
h += cvDim(K.q ? "Nothing like that is up just now." : "Nothing is up for sale just now. Be the first: 🏷️ Sell.");
L.forEach(function (l) { h += mkLotHtml(l, B); });
if ((B.sold || []).length)
h += '<b style="display:block;margin-top:10px">Lately sold</b>' + B.sold.map(function (s) { return '<div style="display:flex;justify-content:space-between;border-top:1px solid #2A3040;padding:3px 0"><span>' + esc(s.name) + (s.amount > 1 ? " × " + s.amount : "") + '</span><span>' + mkG(s.price) + ' <span style="color:#9AA3B5">· ' + new Date(s.at).toLocaleDateString() + '</span></span></div>'; }).join("");
}
else if (K.tab === "sell") {
if (B.young)
return h + cvDim("Somnucor is for dreamers aged 13 and over.");
if (!B.paid)
return h + cvDim("Selling is for dreamers whose dues are paid. You can still buy and bid.");
if (B.keeper)
return h + cvDim("👑 The Keeper's things stay with the Keeper. You can take any lot down from 🛒 Buy, and see everything on the Keeper page under In the game, Economy watch.");
var P = K.pick;
if (P) {
var inp = 'style="width:110px;margin:3px 6px 3px 0"';
h += cvBox('<b style="color:#F2E6C4">' + esc(P.name) + '</b> <span style="color:#9AA3B5">· you have ' + P.n + '</span>' + (P.usual ? cvDim("Usually sells for about " + mkG(P.usual) + (P.kind ? " each" : "") + ".") : "") +
'<div>How many <input id="mk-n" type="number" min="1" max="' + P.n + '" value="1" ' + inp + '></div>' +
'<div>' + cvBtn("mkmode", "At a price", ' data-m="sale"', K.mode !== "auction") + cvBtn("mkmode", "By auction", ' data-m="auction"', K.mode === "auction") + '</div>' +
(K.mode === "auction" ? '<div>Bids from <input id="mk-price" type="number" min="1" value="' + (P.usual || P.price || 10) + '" ' + inp + '> gold, buy it now <input id="mk-bn" type="number" min="0" placeholder="(none)" ' + inp + '></div>' +
'<div>Runs <select id="mk-hrs">' + [[1, "1 hour"], [3, "3 hours"], [6, "6 hours"], [12, "12 hours"], [24, "a day"], [48, "2 days"], [72, "3 days"]].map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === 24 ? " selected" : "") + '>' + o[1] + '</option>'; }).join("") + '</select></div>' :
'<div>Price for the lot <input id="mk-price" type="number" min="1" value="' + (P.usual || P.price || 10) + '" ' + inp + '> gold <span style="color:#9AA3B5">(up for 14 days)</span></div>') +
cvBtn("mklist", "🏷️ Put it up", '', true) + cvBtn("mkunpick", "Back") + cvDim("It leaves your backpack while it is up, and comes back if it does not sell."), true);
}
else {
var T = B.things || [], S = B.stock || [];
if (!T.length && !S.length)
h += cvDim("Your backpack is empty of things to sell.");
if (T.length)
h += '<b>From your backpack</b>' + T.map(function (t) { return '<div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #2A3040;padding:3px 0"><span>' + esc(t.name) + (t.n > 1 ? " × " + t.n : "") + (t.usual ? ' <span style="color:#9AA3B5">· usually ' + mkG(t.usual) + '</span>' : '') + '</span>' + cvBtn("mkpick", "Sell", ' data-item="' + t.item + '"') + '</div>'; }).join("");
if (S.length)
h += '<b style="display:block;margin-top:8px">Your stock</b>' + S.map(function (s) { return '<div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #2A3040;padding:3px 0"><span>' + esc(s.name) + ' × ' + s.n + (s.usual ? ' <span style="color:#9AA3B5">· usually ' + mkG(s.usual) + ' each</span>' : '') + '</span>' + cvBtn("mkpick", "Sell", ' data-kind="' + esc(s.kind) + '"') + '</div>'; }).join("");
}
}
else {
var Mn = B.mine || [];
if (!Mn.length)
h += cvDim("You have nothing up, no bids and nothing bought in the last week.");
Mn.forEach(function (l) { h += mkLotHtml(l, B, true); });
}
return h;
},
function (t, a) {
var K = CV.mk, B = K.b || {}, id = +t.getAttribute("data-id");
if (a === "mktab") {
K.tab = t.getAttribute("data-t");
K.sure = "";
ctyPaint();
return true;
}
if (a === "mkfind") {
K.q = ((document.getElementById("mk-q") || {}).value || "").trim();
mkLoad(true);
return true;
}
if (a === "mkpick") {
var it = t.getAttribute("data-item"), kd = t.getAttribute("data-kind");
K.pick = it ? (B.things || []).filter(function (x) { return String(x.item) === it; })[0] : (B.stock || []).filter(function (x) { return x.kind === kd; })[0];
if (K.pick)
K.pick = Object.assign({}, K.pick);
K.mode = "sale";
ctyPaint();
return true;
}
if (a === "mkunpick") {
K.pick = null;
ctyPaint();
return true;
}
if (a === "mkmode") {
K.mode = t.getAttribute("data-m");
ctyPaint();
return true;
}
if (a === "mklist") {
var P = K.pick;
if (!P)
return true;
var v = function (i) { return (document.getElementById(i) || {}).value; };
mkAct("market_list", { p_item: P.item || null, p_kind: P.kind || null, p_amount: Math.max(1, Math.round(+v("mk-n") || 1)), p_mode: K.mode === "auction" ? "auction" : "sale",
p_price: Math.round(+v("mk-price") || 0), p_buy_now: K.mode === "auction" ? Math.round(+v("mk-bn") || 0) || null : null, p_hours: K.mode === "auction" ? +v("mk-hrs") || 24 : null }, function (o) { if (o && o.ok) {
K.pick = null;
K.tab = "mine";
} });
return true;
}
if (a === "mkbuy") {
if (K.sure !== "b" + id) {
K.sure = "b" + id;
ctyPaint();
return true;
}
mkAct("market_buy", { p_lot: id });
return true;
}
if (a === "mkbid") {
var g = Math.round(+((document.getElementById("mk-bid-" + id) || {}).value || 0));
if (K.sure !== "d" + id) {
K.sure = "d" + id;
K.bidKeep = g;
ctyPaint();
return true;
}
mkAct("market_bid", { p_lot: id, p_gold: g || K.bidKeep });
return true;
}
if (a === "mkcancel") {
mkAct("market_cancel", { p_lot: id });
return true;
}
return false;
}
];
});
