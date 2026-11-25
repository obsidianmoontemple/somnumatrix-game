/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(203, function () {
return [
function (force) {
if (typeof signedIn !== "function" || !signedIn())
return Promise.resolve(null);
if (HL.busy)
return HL.busy;
if (!force && HL.rows && Date.now() - HL.at < 20000)
return Promise.resolve(HL.rows);
HL.busy = cityRpc("realty_board", {}).then(function (d) {
HL.rows = Array.isArray(d) ? d : [];
HL.by = {};
HL.rows.forEach(function (r) { HL.by[(r.world || "somnucor") + "|" + r.name] = r; });
HL.at = Date.now();
if (typeof WHM !== "undefined")
WHM.rows = HL.rows;
HL.busy = false;
return HL.rows;
}).catch(function () { HL.busy = false; HL.at = Date.now(); HL.rows = HL.rows || []; return HL.rows; });
return HL.busy;
},
function (name, world) {
if (Date.now() - HL.said < 6000)
return;
HL.said = Date.now();
var r = hlRow(name, world), el = document.getElementById("hl-card");
if (!el) {
el = document.createElement("div");
el.id = "hl-card";
el.style.cssText = HL_CARD;
document.body.appendChild(el);
}
var lines = [];
if (typeof signedIn !== "function" || !signedIn())
lines.push("Sign in, and a home of your own opens to you.");
else if (r && r.held)
lines.push("Somebody lives here. Only they, and those they let in, go inside.");
else if (r) {
var deal = [];
if (r.for_sale)
deal.push("for sale at <b>" + hlMoney(r.price) + " gold</b>");
if (r.to_let)
deal.push("to let at <b>" + hlMoney(r.rent) + " gold</b> a week");
lines.push(deal.length ? "It is " + deal.join(", or ") + "." : "It is not on the market just now.");
lines.push("Buy it or rent it at the Land Office, or page a realtor to show it to you.");
}
else
lines.push("It is not on the Land Office's books yet. A realtor can tell you more.");
el.innerHTML = "<div style='font:600 16px Georgia,serif;margin-bottom:4px'>🔒 " + esc(name) + " is locked</div>" + lines.map(function (t) { return "<div style='margin:3px 0'>" + t + "</div>"; }).join("") +
"<div style='display:flex;gap:8px;justify-content:flex-end;margin-top:10px'>" +
(r && !r.held && typeof signedIn === "function" && signedIn() ? "<button data-h='page' style='" + PH_BTN + "'>Page a realtor</button>" : "") +
"<button data-h='close' style='" + PH_BTN2 + "'>Close</button></div>";
el.style.display = "block";
el.querySelectorAll("[data-h]").forEach(function (b) {
b.onclick = function (ev) {
ev.stopPropagation();
var k = b.getAttribute("data-h");
el.style.display = "none";
if (k === "page")
phOpenPage("The Land Office", "I would like to be shown " + name + hlWhere(world) + ", please.");
};
});
clearTimeout(HL.hide);
HL.hide = setTimeout(function () { el.style.display = "none"; }, 14000);
},
function () {
if (typeof signedIn !== "function" || !signedIn())
return;
phCall("phone_inbox").then(function (d) { PH.inbox = d; phBadge(); if (PH.open)
phPaint(); }).catch(function (e) { PH.msg = phErr(e); if (PH.open)
phPaint(); });
if (PH.open && PH.tab === "book")
phBook();
if (PH.open && PH.tab === "pager")
phPages();
if (PH.open)
pfLoad(false);
if (PH.open && PH.withId)
phThread(PH.withId);
},
function (p) {
var t = phTradOf(p.key);
if (t)
return { temple: true, cat: t };
var w = (typeof WP_BY_KEY !== "undefined" && WP_BY_KEY[p.key]) || null, a = w && w.arch || "";
for (var i = 0; i < PH_CATS.length; i++) {
var C = PH_CATS[i];
if (C[2] && C[2].test(p.key))
return { cat: C[0] };
}
for (i = 0; i < PH_CATS.length; i++) {
if (a && PH_CATS[i][1].test(a))
return { cat: PH_CATS[i][0] };
}
return { cat: a ? "Other businesses" : "Businesses of the city" };
},
function (bk) {
var q = String(PH.q || "").trim().toLowerCase(), list = (bk.places || []).slice();
if (!q)
PH.placesAll = list;
else if (PH.placesAll) {
var seen = {};
list.forEach(function (p) { seen[p.key] = 1; });
PH.placesAll.forEach(function (p) { if (seen[p.key])
return; var c = phCatOf(p); if (c.cat.toLowerCase().indexOf(q) >= 0) {
list.push(p);
seen[p.key] = 1;
} });
}
var open = PH.bookOpen || (PH.bookOpen = {}), all = !!q;
var rings = {}, order = phRingOrder();
list.forEach(function (p) {
var rk = p.ring || ((typeof WP_BY_KEY !== "undefined" && WP_BY_KEY[p.key] || {}).ring) || "elsewhere";
var c = phCatOf(p), R = rings[rk] || (rings[rk] = { n: 0, cats: {}, temples: {} });
R.n++;
var into = c.temple ? R.temples : R.cats;
(into[c.cat] || (into[c.cat] = [])).push(p);
});
var known = {};
order.forEach(function (o) { known[o.k] = 1; });
Object.keys(rings).forEach(function (k) { if (!known[k])
order.push({ k: k, name: k === "elsewhere" ? "Elsewhere" : k, i: 99 }); });
var H = ["<div class='s' style='margin:12px 2px 2px;font-weight:600'>Businesses" + (list.length ? " · " + list.length : "") + "</div>"];
if (!list.length)
H.push("<div class='s'>No business by that name.</div>");
function head(id, label, n, lvl) {
var on = all || open[id];
return "<div class='pb-h l" + lvl + (on ? " on" : "") + "' data-grp='" + esc(id) + "'><span>" + (on ? "▾ " : "▸ ") + esc(label) + "</span><span class='s'>" + n + "</span></div>";
}
function row(p) {
return "<div class='row pb-r'><div style='display:flex;justify-content:space-between;align-items:center;gap:8px'><span class='n'>" + (p.staff ? "<span class='dot'></span>" : "") + esc(p.key) + "</span>" +
"<button data-page='" + esc(p.key) + "' style='" + PH_BTN + "'>Page</button></div>" +
(p.note ? "<div class='s'>" + esc(p.note) + "</div>" : "") +
"<div class='s'>" + (p.staff ? p.staff + " at work now" : "Nobody at work just now: they will see your page when they come in") + "</div></div>";
}
function cats(prefix, obj, lvl, sorted) {
var ks = Object.keys(obj);
if (sorted)
ks.sort(function (a, b) { return obj[b].length - obj[a].length || a.localeCompare(b); });
else {
var ord = PH_CATS.map(function (c) { return c[0]; });
ks.sort(function (a, b) { var x = ord.indexOf(a), y = ord.indexOf(b); x = x < 0 ? 99 : x; y = y < 0 ? 99 : y; return x - y || a.localeCompare(b); });
}
ks.forEach(function (c) {
var id = prefix + "/" + c, L = obj[c].sort(function (a, b) { return a.key.localeCompare(b.key); });
H.push(head(id, c, L.length, lvl));
if (all || open[id])
L.forEach(function (p) { H.push(row(p)); });
});
}
order.forEach(function (o) {
var R = rings[o.k];
if (!R)
return;
var id = "r/" + o.k;
H.push(head(id, o.name, R.n, 0));
if (!(all || open[id]))
return;
cats(id, R.cats, 1, false);
var tn = 0;
for (var t in R.temples)
tn += R.temples[t].length;
if (tn) {
var tid = id + "/houses";
H.push(head(tid, "Temples and houses of the powers, by tradition", tn, 1));
if (all || open[tid]) {
H.push("<div class='pb-in'>");
cats(tid, R.temples, 2, true);
H.push("</div>");
}
}
});
return H.join("");
},
function (id, name, small) {
if (!id || PFR.missing)
return "";
var st = pfState(id), h = "";
if (st === "blocked")
return pfBtn("unblock", id, name, "Unblock");
if (st === "friend")
h += small ? "<span class='s' style='color:#4CC77A;font-size:12px'>Friend</span>" : "<span class='s' style='color:#4CC77A;align-self:center;margin-right:2px'>✓ Friend</span>";
else if (st === "asked")
h += "<span class='s' style='align-self:center;margin-right:2px'>Asked</span>";
else if (st === "askme")
h += pfBtn("accept", id, name, "Accept friend", true);
else
h += pfBtn("ask", id, name, small ? "+ Friend" : "Add friend");
if (!small)
h += pfBtn("block", id, name, "Block");
else
h += "<span data-pf='block' data-u='" + esc(id) + "' data-name='" + esc(name || "") + "' title='Block' style='cursor:pointer;color:#C9BEA8;font-size:12px;margin-left:6px'>Block</span>";
return h;
},
function () {
var L = PFR.list, B = [];
if (PFR.missing)
return "<div class='row'><div class='n'>Friends opens soon</div><div class='s'>The phone's friends list opens soon.</div></div>";
if (!L)
return "<div class='s' style='margin-top:10px'>Opening your friends…</div>";
if (!L.ok)
return "<div class='row'>" + esc(L.say || "") + "</div>";
function head(t) { B.push("<div class='s' style='margin:10px 2px 0;font-weight:600'>" + t + "</div>"); }
if ((L.asks_in || []).length) {
head("Asking to be your friend");
L.asks_in.forEach(function (r) {
B.push("<div class='row'><div class='n'>" + esc(r.name || "A dreamer") + "</div><div class='s'>" + phWhen(r.at) + "</div><div class='acts' style='flex-wrap:wrap'>" +
pfBtn("block", r.id, r.name, "Block") + pfBtn("decline", r.id, r.name, "Decline") + pfBtn("accept", r.id, r.name, "Accept", true) + "</div></div>");
});
}
head("Friends");
if (!(L.friends || []).length)
B.push("<div class='row'><div class='s'>No friends yet. Find someone in the phone book, or tap their line in chat, and press Add friend.</div></div>");
(L.friends || []).forEach(function (r) {
B.push("<div class='row'><div class='n'>" + (r.here ? "<span class='dot'></span>" : "") + esc(r.name || "A dreamer") + "</div><div class='s'>" + (r.here ? "In the game now" : "Away") + (r.home ? " · " + esc(r.home) : "") + "</div>" +
"<div class='acts' style='flex-wrap:wrap'>" + pfBtn("remove", r.id, r.name, "Remove") + pfBtn("block", r.id, r.name, "Block") + "<button data-with='" + esc(r.id) + "' data-name='" + esc(r.name || "") + "' style='" + PH_BTN + "'>Message</button></div></div>");
});
if ((L.asks_out || []).length) {
head("Waiting for them to answer");
L.asks_out.forEach(function (r) { B.push("<div class='row'><div class='n'>" + esc(r.name || "A dreamer") + "</div><div class='acts'>" + pfBtn("cancel", r.id, r.name, "Take back") + "</div></div>"); });
}
if ((L.blocked || []).length) {
head("Blocked");
L.blocked.forEach(function (r) { B.push("<div class='row'><div class='n'>" + esc(r.name || "A dreamer") + "</div><div class='s'>Cannot message you or ask to be friends. Their chat is hidden.</div><div class='acts'>" + pfBtn("unblock", r.id, r.name, "Unblock") + "</div></div>"); });
}
return B.join("");
},
function (act, id, name, sure) {
if (!id)
return;
if (sure)
PFR.sure = { id: id, at: Date.now() };
if (act === "block" && !PFR.sure) {
PFR.sure = { id: id, at: Date.now() };
PH.msg = "Block " + (name || "them") + "? They will not be told. Press Block again to be sure.";
phPaint();
return;
}
if (act === "block" && (PFR.sure.id !== id || Date.now() - PFR.sure.at > 10000)) {
PFR.sure = { id: id, at: Date.now() };
PH.msg = "Block " + (name || "them") + "? They will not be told. Press Block again to be sure.";
phPaint();
return;
}
PFR.sure = null;
var call = act === "ask" ? ["friend_ask", { p_user: id }] : act === "accept" ? ["friend_answer", { p_user: id, p_yes: true }] : act === "decline" ? ["friend_answer", { p_user: id, p_yes: false }] :
act === "remove" || act === "cancel" ? ["friend_remove", { p_user: id }] : act === "block" ? ["block_set", { p_user: id, p_on: true }] : act === "unblock" ? ["block_set", { p_user: id, p_on: false }] : null;
if (!call)
return;
return cityRpc(call[0], call[1]).then(function (d) {
PH.msg = d && d.say || "";
if (typeof setStatus === "function" && !PH.open && d && d.say)
setStatus(esc(d.say));
if (act === "block" && PH.withId === id) {
PH.withId = null;
PH.thread = null;
}
if (act === "block" || act === "unblock")
phCall("phone_inbox").then(function (x) { PH.inbox = x; phBadge(); if (PH.open)
phPaint(); }).catch(function () { });
return pfLoad(true).then(function () { return d; });
}).catch(function (e) { var m = String((e && e.message) || e || ""); if (/function|404|PGRST|does not exist/i.test(m)) {
PFR.missing = true;
PH.msg = "Friends opens soon.";
}
else
PH.msg = m; phPaint(); });
}
];
});
