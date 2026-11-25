/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(90, function () {
"use strict";
return [
function (row) {
var here = myPlace();
var pl = row.place || "out", lv = row.level || 0;
if (pl !== here.place)
return null;
if (pl === "out") {
var ox = (typeof ATLC !== "undefined" && ATLC) ? ATLC.x : 0, oz = (typeof ATLC !== "undefined" && ATLC) ? ATLC.z : 0;
return { x: row.x + ox, y: (typeof terrainY === "function") ? terrainY(row.x + ox, row.z + oz) : 0, z: row.z + oz };
}
if (/^hall:/.test(pl)) {
var hm = hallMiddle();
if (!hm)
return null;
return { x: hm.x + row.x, y: (typeof terrainY === "function") ? terrainY(hm.x + row.x, hm.z + row.z) : 0, z: hm.z + row.z };
}
if (/^underground:|^mall:/.test(pl)) {
var o = /^mall:/.test(pl) ? { x: MALL.cx, z: MALL.cz } : undergroundSpot();
var oy = /^mall:/.test(pl) && typeof mdSupport === "function" && MD.slots ? mdSupport(row.x, row.z, lv * MD.FL + 1.2) : 0;
return o ? { x: o.x + row.x, y: oy, z: o.z + row.z } : null;
}
if (!INT)
return null;
return { x: INT.ox + row.x, y: lv * INT.floor, z: INT.oz + row.z, level: lv };
},
function (row) {
var sp = row.look && row.look.species, o = sp && SPECIES_FEATS[sp];
var look = fillLook(JSON.parse(JSON.stringify(row.look || blankLook("human"))), row.user_id);
var spec = { id: "presence_" + row.user_id, archetype: "human", attrs: {}, look: look,
solid: false, detail: 4, nights: [] };
var g = buildFigure(spec, 1);
if (o) {
dressFolk(g, spec, 1, o);
if (o.hover)
g.children[0].position.y += o.hover;
}
g.userData.presence = row.user_id;
var tag = makeTag((row.name || "a dreamer") + (row.away ? " \u00b7 " + (typeof awayWord === "function" ? awayWord(row) : "away") : ""), false);
tag.position.y = 2.02;
g.add(tag);
g.userData.tag = tag;
return g;
},
function (p, w, rot) {
var T = p.target, moved = Math.hypot(w.x - T.x, w.z - T.z) > 0.05 || Math.abs((w.y || 0) - (T.y || 0)) > 0.05;
if (!moved)
return;
var now = performance.now(), gap = (now - (p.tMoved || now)) / 1000;
p.tMoved = now;
if (gap > 0.3 && gap < 8)
p.gap = Math.max(0.6, Math.min(4, (p.gap || PRESENCE_INTERVAL) * 0.6 + gap * 0.4));
var g = p.group;
if (!g)
return;
var d = Math.hypot(w.x - g.position.x, w.z - g.position.z);
p.spd = d / ((p.gap || PRESENCE_INTERVAL) * 1.05);
},
function () {
var el = streetEl();
if (!el)
return;
el.style.display = (presenceActive && streetOpen) ? "flex" : "none";
if (!streetOpen)
return;
Array.prototype.forEach.call(el.querySelectorAll("[data-st]"), function (t) {
var k = t.getAttribute("data-st"), inc = incomingOpen();
t.className = (k === streetTab || (k === "people" && streetTab === "tradeform")) ? "on" : "";
if (k === "trades")
t.innerHTML = "Trades" + (inc ? " <span class='badge' style='display:inline-block;min-width:16px;padding:0 4px;border-radius:8px;background:#B8724A;color:#fff;font-size:11px'>" + inc + "</span>" : "");
if (k === "people")
t.textContent = "People (" + Object.keys(presenceOthers).length + ")";
});
document.getElementById("st-foot").style.display = streetTab === "talk" ? "flex" : "none";
if (streetTab === "tradeform") {
paintStreetButton();
return;
}
var body = document.getElementById("st-body");
if (streetTab === "talk") {
var atEnd = body.scrollTop + body.clientHeight >= body.scrollHeight - 20;
body.innerHTML = chatLines.length ? chatLines.map(function (l) {
if (l.sys)
return '<div class="st-line st-dim">' + l.html + '</div>';
return '<div class="st-line">' + (l.channel === "city" ? '<span class="st-city">CITY</span>' : '') +
'<span class="st-who notr">' + esc(l.mine ? "You" : l.name) + '</span> ' + esc(l.body) + '</div>';
}).join("") : '<div class="st-dim">Nobody has said anything yet. <b>Nearby</b> is heard by whoever stands within forty paces of you, in the same room; <b>Whole city</b> by everyone walking Somnucor.</div>';
if (atEnd)
body.scrollTop = body.scrollHeight;
}
else if (streetTab === "people") {
var rows = presenceList();
body.innerHTML = (typeof cwsPeopleHead === "function" ? cwsPeopleHead() : "") + (rows.length ? rows.map(function (p) {
return '<div class="st-row"><span><b>' + esc(p.name) + '</b> <span class="st-dim">· ' + (p.dist < 3 ? "beside you" : Math.round(p.dist) + " m") + '</span></span>' +
'<span style="white-space:nowrap"><button class="btn" data-trade="' + p.id + '">Trade</button> ' +
'<button class="btn" data-pay="' + p.id + '">Pay</button>' + (typeof cwsPeopleBtn === "function" ? " " + cwsPeopleBtn(p.id) : "") + '</span></div>';
}).join("") : '<div class="st-dim">Nobody else is here just now. When another dreamer walks the city, or the same room as you, they appear here and in the street itself.</div>');
Array.prototype.forEach.call(body.querySelectorAll("[data-trade]"), function (b) { b.onclick = function () { tradeForm(b.getAttribute("data-trade")); }; });
Array.prototype.forEach.call(body.querySelectorAll("[data-pay]"), function (b) {
b.onclick = function () {
var id = b.getAttribute("data-pay"), nm = (presenceOthers[id] && presenceOthers[id].name) || "them";
var n = Math.floor(+(prompt("How much gold to give " + nm + "?") || 0));
if (n > 0 && typeof payDreamer === "function")
payDreamer(id, n, "given in the street");
};
});
}
else if (streetTab === "trades") {
var open = myTradeRows.filter(function (t) { return t.state === "open"; });
var done = myTradeRows.filter(function (t) { return t.state !== "open"; });
body.innerHTML = (open.length ? open.map(function (t) {
return '<div class="st-row" style="display:block">' +
'<div>' + (t.incoming ? '<b>' + esc(t.other_name) + '</b> offers you ' : 'You offer <b>' + esc(t.other_name) + '</b> ') + tradeWords(t, true) + '</div>' +
((t.want_gold || t.want_amount) ? '<div class="st-dim">' + (t.incoming ? "for " : "for ") + tradeWords(t, false) + '</div>' : '<div class="st-dim">as a gift</div>') +
(t.note ? '<div class="st-dim"><i>“' + esc(t.note) + '”</i></div>' : '') +
'<div style="margin-top:6px">' + (t.incoming
? '<button class="btn" data-accept="' + t.trade_id + '">Accept</button> <button class="btn" data-decline="' + t.trade_id + '">Decline</button>'
: '<button class="btn" data-cancel="' + t.trade_id + '">Take it back</button> <span class="st-dim">waiting on them</span>') + '</div></div>';
}).join("") : '<div class="st-dim" style="margin-bottom:8px">No offers waiting. Open <b>People</b> and press <b>Trade</b> beside somebody to make one. An offer lasts fifteen minutes.</div>') +
(done.length ? '<div class="st-dim" style="margin-top:10px">Just now</div>' + done.map(function (t) {
var w = { done: "settled", declined: "declined", cancelled: "taken back", expired: "ran out" }[t.state] || t.state;
return '<div class="st-line st-dim">' + (t.incoming ? "From " : "To ") + esc(t.other_name) + ' — ' + w + '</div>';
}).join("") : "");
Array.prototype.forEach.call(body.querySelectorAll("[data-accept]"), function (b) { b.onclick = function () { answerTrade("accept_trade", +b.getAttribute("data-accept")); }; });
Array.prototype.forEach.call(body.querySelectorAll("[data-decline]"), function (b) { b.onclick = function () { answerTrade("decline_trade", +b.getAttribute("data-decline")); }; });
Array.prototype.forEach.call(body.querySelectorAll("[data-cancel]"), function (b) { b.onclick = function () { answerTrade("cancel_trade", +b.getAttribute("data-cancel")); }; });
}
paintStreetButton();
},
function (t, giving) {
var bits = [];
if (giving) {
if (t.give_gold)
bits.push("<b>" + gold(t.give_gold) + "</b>");
if (t.give_amount)
bits.push("<b>" + t.give_amount + "</b> " + esc(t.give_name || t.give_kind));
if (t.give_item)
bits.push("the <b>" + esc(t.give_item_name || "thing") + "</b>");
}
else {
if (t.want_gold)
bits.push("<b>" + gold(t.want_gold) + "</b>");
if (t.want_amount)
bits.push("<b>" + t.want_amount + "</b> " + esc(t.want_name || t.want_kind));
}
return bits.length ? bits.join(" and ") : "nothing";
},
function () {
var inp = document.getElementById("st-say");
if (!inp)
return;
var t = (inp.value || "").trim();
if (!t)
return;
inp.value = "";
cityRpc("say_in_city", { p_body: t, p_channel: streetChan }).then(function (o) {
if (o !== "ok")
streetNote(esc(String(o)));
chatCool = 0.15;
}).catch(function (e) { streetNote("That wasn't heard: " + esc(e.message || "")); });
},
function (fn, id) {
cityRpc(fn, { p_trade: id }).then(function (o) {
if (o === "ok") {
setStatus(fn === "accept_trade" ? "<b>Done.</b> The trade has gone through, both ways at once."
: fn === "decline_trade" ? "Declined." : "Taken back.");
if (fn === "accept_trade") {
if (typeof refreshStanding === "function")
refreshStanding();
if (typeof loadStock === "function")
loadStock();
if (typeof loadThings === "function")
loadThings();
}
}
else
setStatus(esc(String(o)));
loadTrades();
}).catch(function (e) { setStatus(esc(e.message)); });
},
function (toId) {
var who = (presenceOthers[toId] && presenceOthers[toId].name) || "them";
var body = document.getElementById("st-body");
if (!body)
return;
streetTab = "tradeform";
paintStreet();
document.getElementById("st-foot").style.display = "none";
body.innerHTML = "Looking at what you have…";
Promise.all([
(typeof loadStock === "function" ? loadStock() : Promise.resolve([])),
(typeof loadThings === "function" ? loadThings() : Promise.resolve([])),
loadMaterials(),
(typeof refreshStanding === "function" ? refreshStanding() : Promise.resolve(null))
]).then(function (r) {
if (streetTab !== "tradeform")
return;
var stockRows = (r[0] || []).filter(function (s) { return s.amount > 0; }), things = r[1] || [], mats = r[2] || [], st = r[3] || standing;
var num = 'type="number" min="0" step="1" style="width:90px"';
body.innerHTML = '<div style="margin-bottom:8px">A trade with <b>' + esc(who) + '</b>. Nothing moves until they accept, and then all of it moves at once.</div>' +
'<div class="st-dim" style="margin:8px 0 4px">You give</div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">' +
'<input id="tf-gg" ' + num + ' placeholder="gold"> <span class="st-dim">gold' + (st ? " (you have " + (st.gold || 0).toLocaleString() + ")" : "") + '</span></div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:6px">' +
'<input id="tf-ga" ' + num + ' placeholder="how many"> <select id="tf-gk"><option value="">— stock —</option>' +
stockRows.map(function (s) { return '<option value="' + esc(s.kind) + '">' + esc(s.name) + ' (' + s.amount + ')</option>'; }).join("") + '</select></div>' +
'<div style="margin-top:6px"><select id="tf-gi" style="max-width:100%"><option value="">— nothing of your own —</option>' +
things.filter(function (t) { return !keyNeverSold(t); }).map(function (t) { return '<option value="' + t.id + '">' + esc(t.name) + '</option>'; }).join("") + '</select></div>' +
'<div class="st-dim" style="margin:12px 0 4px">You ask for</div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">' +
'<input id="tf-wg" ' + num + ' placeholder="gold"> <span class="st-dim">gold</span></div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:6px">' +
'<input id="tf-wa" ' + num + ' placeholder="how many"> <select id="tf-wk"><option value="">— stock —</option>' +
mats.map(function (m) { return '<option value="' + esc(m.kind) + '">' + esc(m.name || m.kind) + '</option>'; }).join("") + '</select></div>' +
'<input id="tf-note" maxlength="140" placeholder="a word with it (optional)" style="width:100%;margin-top:10px">' +
'<div style="margin-top:10px;display:flex;gap:8px"><button class="btn" id="tf-send">Offer it</button><button class="btn" id="tf-back">Never mind</button></div>' +
'<div id="tf-msg" class="st-dim" style="margin-top:6px"></div>';
document.getElementById("tf-back").onclick = function () { streetTab = "people"; paintStreet(); };
document.getElementById("tf-send").onclick = function () {
var v = function (id) { return Math.max(0, Math.floor(+(document.getElementById(id).value || 0))); };
var gk = document.getElementById("tf-gk").value || null, wk = document.getElementById("tf-wk").value || null;
var gi = document.getElementById("tf-gi").value;
var args = { p_to: toId, p_give_gold: v("tf-gg"), p_give_kind: gk, p_give_amount: gk ? v("tf-ga") : 0, p_give_item: gi ? +gi : null,
p_want_gold: v("tf-wg"), p_want_kind: wk, p_want_amount: wk ? v("tf-wa") : 0,
p_note: (document.getElementById("tf-note").value || "").trim() || null };
document.getElementById("tf-msg").textContent = "Sending…";
cityRpc("offer_trade", args).then(function (o) {
if (o === "ok") {
setStatus("<b>Offered.</b> " + esc(who) + " has fifteen minutes to answer.");
streetTab = "trades";
loadTrades();
paintStreet();
}
else
document.getElementById("tf-msg").textContent = String(o);
}).catch(function (e) { document.getElementById("tf-msg").textContent = e.message || "That didn't go."; });
};
});
}
];
});
