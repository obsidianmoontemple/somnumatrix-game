/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var KIMM = {
order: "Standing order from the Keeper: the Keeper is not to be ticketed, charged or fined.",
more: "No ticket, caution, charge, arrest, fine or penalty letter is to be made against the Keeper, on the road or anywhere in Somnucor.",
on: false, at: 0, deskTab: null, deskObs: null
};
var KIMM_PENALTY_FROM = /dragon corp|court|gaol|police|traffic|magistrat|prosecut|treasury/i;
var KIMM_PENALTY_WORDS = /ticket|fine|charge|summons|penalt|arrest|offence|warrant|sentence|hearing|remand|caution/i;
function kimmOn() {
var now = Date.now();
if (now - KIMM.at < 1000)
return KIMM.on;
KIMM.at = now;
try {
KIMM.on = typeof isKeeperNow === "function" && !!isKeeperNow();
}
catch (e) {
KIMM.on = false;
}
return KIMM.on;
}
function kimmMyNames() { return __ZC(238, 0, this, arguments, new.target); }
function kimmNamesIn(text, names) {
var t = String(text || "").toLowerCase();
for (var i = 0; i < names.length; i++)
if (t.indexOf(names[i]) >= 0)
return true;
return false;
}
function kimmPenaltyLetter(m) {
if (!m || m.from_user || (m.kind && m.kind !== "city"))
return false;
var subj = String(m.subject || "");
if (/tampered/i.test(subj))
return false;
return KIMM_PENALTY_FROM.test(String(m.from || m.from_name || "")) && KIMM_PENALTY_WORDS.test(subj + " " + String(m.body || ""));
}
function kimmBanner() { return __ZC(238, 1, this, arguments, new.target); }
function kimmBannerIn(el, before) {
if (!el || el.querySelector(".kimm-order"))
return;
var b = kimmBanner();
if (before && before.parentNode === el)
el.insertBefore(b, before);
else
el.insertBefore(b, el.firstChild);
}
function kimmStaff() { return __ZC(238, 2, this, arguments, new.target); }
(function () {
if (typeof cityRpc !== "function")
return;
var cr = cityRpc;
var free = {
traffic_offence: function () { return { ok: true, ticket: null, keeper: true, say: KIMM.order }; },
licence_offence: function () { return { ok: true, exempt: true, keeper: true, points: 0 }; },
report_offence: function () { return { ok: true, caught: false, keeper: true }; },
theft_at_stall: function () { return { ok: true, caught: false, keeper: true }; },
merit_misdeed: function () { return "ok"; }
};
cityRpc = function (name, body) {
if (!kimmOn())
return cr.apply(this, arguments);
if (free[name])
return Promise.resolve(free[name]());
if (name === "my_tickets")
return Promise.resolve([]);
var p = cr.apply(this, arguments);
if (name === "my_cases")
return p.then(function (rows) {
return Array.isArray(rows) ? rows.filter(function (c) {
var open = c && (c.status === "filed" || c.status === "pleaded" || c.status === "hearing");
var owing = c && c.status === "guilty" && (c.fine || 0) > (c.fine_paid || 0);
return !(open || owing);
}) : rows;
});
if (name === "my_standing")
return p.then(function (s) { if (s && s.prison)
s.prison = null; return s; });
if (name === "my_mail")
return p.then(function (d) {
if (d && Array.isArray(d.box)) {
var gone = 0;
d.box = d.box.filter(function (m) { var x = kimmPenaltyLetter(m); if (x && !m.read)
gone++; return !x; });
if (gone && typeof d.unread === "number")
d.unread = Math.max(0, d.unread - gone);
}
return d;
});
if (name === "gazette_today")
return p.then(function (d) {
var names = kimmMyNames();
if (d && names.length) {
if (Array.isArray(d.crime))
d.crime = d.crime.filter(function (c) { return !kimmNamesIn(c && c.who, names); });
if (Array.isArray(d.headlines))
d.headlines = d.headlines.filter(function (a) { return !(/^VERDICT/.test(String(a && a.title || "")) && kimmNamesIn(a.title, names)); });
if (Array.isArray(d.articles))
d.articles = d.articles.filter(function (a) { return !(a && a.section === "crime" && kimmNamesIn(String(a.title || "") + " " + String(a.body || ""), names)); });
}
return d;
});
return p;
};
})();
(function () {
if (typeof trfOffence === "function") {
var to = trfOffence;
trfOffence = function () { if (kimmOn())
return Promise.resolve({ ok: true, ticket: null, keeper: true }); return to.apply(this, arguments); };
}
if (typeof trfRedLight === "function") {
var rl = trfRedLight;
trfRedLight = function () { if (kimmOn())
return; return rl.apply(this, arguments); };
}
if (typeof trfLicence === "function") {
var tl = trfLicence;
trfLicence = function () { if (kimmOn())
return; return tl.apply(this, arguments); };
}
if (typeof licenceOffence === "function") {
var lo = licenceOffence;
licenceOffence = function () { if (kimmOn())
return Promise.resolve({ ok: true, exempt: true, keeper: true, points: 0 }); return lo.apply(this, arguments); };
}
if (typeof driveEnforce === "function") {
var de = driveEnforce;
driveEnforce = function (dt) {
if (kimmOn() && typeof DRIVE !== "undefined" && DRIVE) {
if (DRIVE.trip) {
DRIVE.trip.nolic = true;
DRIVE.trip.nofly = true;
}
if (typeof DRIVE_SPEED_NOTE !== "undefined")
DRIVE_SPEED_NOTE = Date.now();
}
return de.apply(this, arguments);
};
}
if (typeof trfBadge === "function") {
var tb = trfBadge;
trfBadge = function () { if (kimmOn() && typeof TRF !== "undefined")
TRF.tickets = []; return tb.apply(this, arguments); };
}
if (typeof trfCarrierWalk === "function") {
var cw = trfCarrierWalk;
trfCarrierWalk = function () { if (kimmOn())
return; return cw.apply(this, arguments); };
}
if (typeof trfLetters === "function") {
var tlt = trfLetters;
trfLetters = function () {
if (!kimmOn())
return tlt.apply(this, arguments);
if (typeof TRF !== "undefined")
TRF.tickets = [];
var r = tlt.apply(this, arguments);
var w = document.getElementById("trf-letters"), card = w && w.firstChild;
if (card && !card.querySelector(".kimm-order")) {
var b = kimmBanner();
b.style.color = "#2A2420";
card.insertBefore(b, card.children[2] || null);
}
return r;
};
}
})();
(function () {
if (typeof reportCrime === "function") {
var rc = reportCrime;
reportCrime = function () { if (kimmOn())
return Promise.resolve({ ok: true, caught: false, keeper: true }); return rc.apply(this, arguments); };
}
if (typeof misdeed === "function") {
var md = misdeed;
misdeed = function () { if (kimmOn())
return; return md.apply(this, arguments); };
}
if (typeof arrestScene === "function") {
var as = arrestScene;
arrestScene = function () { if (kimmOn())
return; return as.apply(this, arguments); };
}
if (typeof arrestSwoop === "function") {
var sw = arrestSwoop;
arrestSwoop = function () { if (kimmOn())
return; return sw.apply(this, arguments); };
}
if (typeof theftAtStall === "function") {
var ts = theftAtStall;
theftAtStall = function (stall) {
if (!kimmOn())
return ts.apply(this, arguments);
if (typeof HARM_COOL !== "undefined") {
if (HARM_COOL > 0)
return;
HARM_COOL = 2;
}
setStatus("You take what you like from " + esc((stall && (stall.label || stall.name)) || "the stall") + ". The Keeper's city: nothing is reported.");
};
}
if (typeof assaultDreamer === "function") {
var ad = assaultDreamer;
assaultDreamer = function (v) {
if (!kimmOn())
return ad.apply(this, arguments);
if (!v || (typeof HARM_COOL !== "undefined" && HARM_COOL > 0))
return;
if (typeof HARM_COOL !== "undefined")
HARM_COOL = 2;
if (typeof HARM !== "undefined" && HARM.state === "down")
return;
cityRpc("assault_dreamer", { p_victim: v.id }).then(function (o) {
if (!o)
return;
if (o.ok === false) {
setStatus(esc(o.say || "You miss."));
return;
}
if (typeof sayOver === "function")
sayOver(v.id, o.victim_state === "down" ? "…" : "Ow!");
if (v.p && v.p.group && typeof harmKnock === "function")
harmKnock(v.p.group, o.victim_state === "down");
cityRpc("say_in_city", { p_body: "* strikes " + (v.name || "a dreamer") + (o.victim_state === "down" ? ", who goes down *" : " *"), p_channel: "near" }).catch(function () { });
setStatus("You strike <b>" + esc(o.victim || v.name || "them") + "</b>: " + (o.harm || 0) + " harm" + (o.victim_state === "down" ? ", and they go down" : "") +
". By standing order of the Keeper, nothing is marked against you.");
}).catch(function (e) { if (!(typeof rpcMissing === "function" && rpcMissing(e)))
setStatus(esc(e.message)); });
};
}
})();
(function () {
if (typeof heldNow === "function") {
var hn = heldNow;
heldNow = function () { if (kimmOn())
return false; return hn.apply(this, arguments); };
}
if (typeof toCell === "function") {
var tc = toCell;
toCell = function () { if (kimmOn())
return; return tc.apply(this, arguments); };
}
if (typeof courtMySession === "function") {
var ms = courtMySession;
courtMySession = function () { if (kimmOn())
return null; return ms.apply(this, arguments); };
}
if (typeof courtHoldsMe === "function") {
var hm2 = courtHoldsMe;
courtHoldsMe = function () { if (kimmOn())
return false; return hm2.apply(this, arguments); };
}
})();
(function () {
if (typeof courtPaint === "function") {
var cp = courtPaint;
courtPaint = function () {
var r = cp.apply(this, arguments);
try {
var el = document.getElementById("court"), msg = document.getElementById("court-msg");
if (el && el.style.display !== "none" && msg)
kimmBannerIn(msg.parentNode, msg);
}
catch (e) { }
return r;
};
}
if (typeof workPaint === "function") {
var wp = workPaint;
workPaint = function () {
var r = wp.apply(this, arguments);
try {
var el = document.getElementById("work");
if (el && el.style.display !== "none" && kimmStaff())
kimmBannerIn(el, el.children[1] || null);
}
catch (e) { }
return r;
};
}
if (typeof deskPane === "function") {
var dp = deskPane;
deskPane = function (which) {
KIMM.deskTab = which;
var r = dp.apply(this, arguments);
try {
var pane = document.getElementById("kd-pane");
if (pane && typeof MutationObserver === "function" && KIMM.deskObs !== pane) {
KIMM.deskObs = pane;
new MutationObserver(function () {
if (KIMM.deskTab === "courts" && pane.innerHTML !== "Looking…")
kimmBannerIn(pane, null);
}).observe(pane, { childList: true });
}
}
catch (e) { }
return r;
};
}
if (typeof postPaint === "function") {
var pp = postPaint;
postPaint = function () {
var r = pp.apply(this, arguments);
try {
var el = document.getElementById("post-panel");
if (el && el.style.display !== "none" && typeof POST !== "undefined" && POST.tab === "round")
kimmBannerIn(el, el.children[2] || null);
}
catch (e) { }
return r;
};
}
if (typeof trfRoundPaint === "function") {
var rp = trfRoundPaint;
trfRoundPaint = function () {
var r = rp.apply(this, arguments);
try {
var el = document.getElementById("trf-round");
if (el && el.style.display !== "none" && !el.querySelector(".kimm-order")) {
var b = kimmBanner();
b.style.fontSize = "11px";
el.appendChild(b);
}
}
catch (e) { }
return r;
};
}
})();
