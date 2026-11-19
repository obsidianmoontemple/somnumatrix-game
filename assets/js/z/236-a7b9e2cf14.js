/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(236, function () {
"use strict";
return [
function () {
if (!WCHAT.btn)
return;
var i = WCHAT.btn.querySelector("i"), n = WCHAT.unread;
i.textContent = n > 99 ? "99+" : String(n);
i.classList.toggle("on", n > 0 && !WCHAT.open);
var r = WCHAT.btn.querySelector("b"), k = (WCHAT.me && WCHAT.me.mod && +WCHAT.me.reports) || 0;
if (r) {
r.textContent = k > 99 ? "99+" : String(k);
r.classList.toggle("on", k > 0);
}
},
function () {
var bl = wcBlocked(), tab = WCHAT.tab, here = wcHere();
if (tab === "world" || tab === "here") {
return WCHAT.lines.filter(function (l) { return l.channel === tab && (tab !== "here" || l.loc === here.k) && !(l.user_id && bl[l.user_id] && !l.mine); })
.map(function (l) { return { key: "w" + l.id, kind: "world", id: l.id, user_id: l.user_id, name: l.name, mine: l.mine, mod: l.mod, body: l.body }; });
}
var src = (typeof chatLines !== "undefined" && chatLines) || [];
return src.filter(function (l) { return !l.sys && (tab === "city" ? l.channel === "city" : l.channel !== "city") && !(l.user_id && bl[l.user_id] && !l.mine); })
.map(function (l) { return { key: "c" + l.id, kind: "city", id: l.id, user_id: l.user_id, name: l.name, mine: l.mine, body: l.body }; });
},
function (full) {
if (!WCHAT.el || !WCHAT.open)
return;
var tabs = wcTabs(), ok = tabs.some(function (t) { return t[0] === WCHAT.tab; });
if (!ok)
WCHAT.tab = "world";
var tb = WCHAT.el.querySelector(".wc-tabs"), here = wcHere();
tb.innerHTML = tabs.map(function (t) { return '<button type="button" data-wct="' + t[0] + '" class="' + (t[0] === WCHAT.tab ? "on" : "") + '">' + t[1] + '</button>'; }).join("");
var where = WCHAT.el.querySelector(".wc-where"), foot = WCHAT.el.querySelector(".wc-foot"), inp = foot.querySelector("input");
var W = { world: "Everyone in the game, wherever they are.", here: here.k ? "Everyone in " + esc(here.n) + "." : "You are in " + esc(here.n) + ": nobody else is here. Try World.",
city: "Everyone walking Somnucor.", near: "Whoever stands within forty paces of you, in the same room.", mod: "Reports, mutes" + (WCHAT.me && WCHAT.me.keeper ? ", moderators and banned words." : ".") };
where.innerHTML = W[WCHAT.tab] || "";
foot.style.display = (WCHAT.tab === "mod" || (WCHAT.tab === "here" && !here.k)) ? "none" : "flex";
inp.placeholder = WCHAT.tab === "world" ? "Say something to everyone…" : WCHAT.tab === "here" ? "Say something to " + here.n + "…" : "Say something…";
var body = WCHAT.el.querySelector(".wc-body");
if (!wcSigned()) {
body.innerHTML = '<div class="wc-dim">Sign in to chat. Settings has the sign-in.</div>';
foot.style.display = "none";
return;
}
if (WCHAT.noServer) {
body.innerHTML = '<div class="wc-dim">World chat is not open just now. Try again in a little while.</div>';
return;
}
if (WCHAT.tab === "mod") {
wcPaintBoard(body);
return;
}
var atEnd = full || body.scrollTop + body.clientHeight >= body.scrollHeight - 24;
var rows = wcRows(), mute = WCHAT.me && WCHAT.me.muted_until, bl0 = wcBlocked();
var h = '<div class="wc-dim" style="margin-bottom:6px">Be kind. No hate, threats or personal details. Tap a line to report it.</div>';
var bl2 = Object.keys(bl0);
if (bl2.length)
h += '<div class="wc-dim" style="margin-bottom:6px">Hidden from you: ' + bl2.map(function (u) {
return '<span class="wc-acts" style="display:inline-flex;margin:2px 4px 2px 0" data-k="" data-id="0" data-u="' + esc(u) + '" data-n=""><button type="button" data-wca="unblock">' + esc(bl0[u] || "someone") + ' · show</button></span>';
}).join("") + '</div>';
if (mute)
h += '<div class="wc-dim" style="color:#F2C2B0;margin-bottom:6px">A moderator has muted you' + (String(mute).indexOf("infinity") >= 0 ? " until they lift it." : " for a while.") + '</div>';
h += rows.length ? rows.map(function (l) {
var s = '<div class="wc-line' + (WCHAT.pick === l.key ? " pick" : "") + '" data-wcl="' + l.key + '">' + wcWho(l) + esc(l.body) + '</div>';
if (WCHAT.pick === l.key && !l.mine)
s += wcActs(l);
return s;
}).join("") : '<div class="wc-dim">Nothing said yet.</div>';
body.innerHTML = h;
if (atEnd)
body.scrollTop = body.scrollHeight;
},
function (l) {
var a = '<div class="wc-acts" data-k="' + l.kind + '" data-id="' + l.id + '" data-u="' + (l.user_id || "") + '" data-n="' + esc(l.name || "") + '">';
a += '<button type="button" data-wca="report">Report</button><button type="button" data-wca="block">Hide their lines</button>';
if (l.user_id && typeof pfButtons === "function" && wcSigned() && !(typeof PFR !== "undefined" && PFR.missing)) {
var st = pfState(l.user_id);
if (st === "friend")
a += '<button type="button" disabled style="opacity:.7">✓ Friend</button>';
else if (st === "asked")
a += '<button type="button" disabled style="opacity:.7">Friend asked</button>';
else if (st === "askme")
a += '<button type="button" data-wca="friend">Accept friend</button>';
else
a += '<button type="button" data-wca="friend">Add friend</button>';
a += '<button type="button" class="warn" data-wca="pblock">' + (WCHAT.sure === l.user_id ? "Sure? Block them" : "Block") + '</button>';
}
if (WCHAT.me && WCHAT.me.mod) {
a += '<button type="button" class="warn" data-wca="remove">Remove</button>';
if (l.user_id)
a += '<button type="button" class="warn" data-wca="mute" data-m="10">Mute 10 min</button><button type="button" class="warn" data-wca="mute" data-m="60">1 hour</button>' +
'<button type="button" class="warn" data-wca="mute" data-m="1440">1 day</button><button type="button" class="warn" data-wca="mute" data-m="0">Until lifted</button>';
}
if (WCHAT.me && WCHAT.me.keeper && l.user_id)
a += l.mod ? '<button type="button" data-wca="unmod">Not a moderator</button>' : '<button type="button" data-wca="mkmod">Make moderator</button>';
return a + '</div>';
},
function (kind, el) {
var box = el.closest("[data-k]"), k = box ? box.getAttribute("data-k") : el.getAttribute("data-k"), id = +(box ? box.getAttribute("data-id") : el.getAttribute("data-id"));
var u = (box ? box.getAttribute("data-u") : el.getAttribute("data-u")) || null, n = (box ? box.getAttribute("data-n") : el.getAttribute("data-n")) || "them";
var done = function (msg) { return function (o) { if (o === "ok")
wcSay(msg);
else
wcSay(esc(String(o))); WCHAT.pick = null; wcMine(true); if (WCHAT.tab === "mod")
wcLoadBoard();
else
wcPaint(false); }; };
var fail = function (e) { wcSay("That didn't go through: " + esc((e && e.message) || "")); };
if (kind === "report") {
cityRpc("chat_report", { p_kind: k, p_id: id, p_why: null }).then(done("Reported. A moderator will look at it.")).catch(fail);
}
else if (kind === "friend") {
if (!u)
return;
WCHAT.pick = null;
pfDo(pfState(u) === "askme" ? "accept" : "ask", u, n).then(function (d) { if (d && d.say)
wcSay(esc(d.say)); });
}
else if (kind === "pblock") {
if (!u)
return;
if (WCHAT.sure !== u) {
WCHAT.sure = u;
wcSay("Block " + esc(n) + "? They will not be told. Press again to be sure.");
wcPaint(false);
return;
}
WCHAT.sure = null;
WCHAT.pick = null;
pfDo("block", u, n, true).then(function (d) { if (d && d.say)
wcSay(esc(d.say)); wcPaint(false); });
}
else if (kind === "block") {
if (!u)
return;
var b = wcLocalBlocked();
b[u] = n;
wcSetBlocked(b);
WCHAT.pick = null;
wcSay("Their lines are hidden on this device.");
wcPaint(false);
}
else if (kind === "remove" || kind === "rmline") {
cityRpc("chat_remove", { p_kind: k, p_id: id }).then(done("Removed.")).then(function () { wcDrop(k, id); }).catch(fail);
}
else if (kind === "keep") {
cityRpc("chat_dismiss", { p_kind: k, p_id: id }).then(done("Left standing.")).catch(fail);
}
else if (kind === "mute") {
var m = +el.getAttribute("data-m");
cityRpc("chat_mute", { p_user: u, p_minutes: m, p_reason: null }).then(done(esc(n) + " is muted" + (m ? " for " + (m >= 1440 ? "a day" : m >= 60 ? "an hour" : "ten minutes") : " until lifted") + ".")).catch(fail);
}
else if (kind === "unmute") {
cityRpc("chat_unmute", { p_user: u }).then(done("Mute lifted.")).catch(fail);
}
else if (kind === "mkmod" || kind === "unmod") {
cityRpc("chat_set_mod", { p_user: u, p_on: kind === "mkmod" }).then(done(kind === "mkmod" ? esc(n) + " is now a moderator." : esc(n) + " is no longer a moderator.")).catch(fail);
}
else if (kind === "unword") {
cityRpc("chat_word", { p_word: el.getAttribute("data-w"), p_on: false }).then(done("Word taken off the list.")).catch(fail);
}
else if (kind === "addword") {
var i = WCHAT.el.querySelector("#wc-word");
var w = i && i.value.trim();
if (!w)
return;
cityRpc("chat_word", { p_word: w, p_on: true }).then(done("Banned: it will show as stars.")).catch(fail);
}
else if (kind === "unblock") {
var bb = wcLocalBlocked();
delete bb[u];
wcSetBlocked(bb);
wcSay("Shown again.");
if (typeof pfState === "function" && pfState(u) === "blocked")
pfDo("unblock", u, n).then(function (d) { if (d && d.say)
wcSay(esc(d.say)); wcPaint(true); });
wcPaint(true);
}
},
function (body) {
var B = WCHAT.board, h = "";
if (!B) {
body.innerHTML = '<div class="wc-dim">Looking…</div>';
return;
}
h += '<h4>Reported lines</h4>';
h += (B.reports || []).length ? (B.reports || []).map(function (r) {
return '<div class="wc-row" style="display:block"><div>' + (r.kind === "phone" ? '<span class="wc-tag">phone message</span>' : '') + '<span class="wc-who">' + esc(r.name || "a dreamer") + '</span> ' + esc(r.body || "(gone)") + '</div>' +
'<div class="wc-dim">' + r.n + ' report' + (r.n > 1 ? "s" : "") + (r.why ? " · " + esc(r.why) : "") + (r.hidden ? " · hidden" : "") + '</div>' +
'<div class="wc-acts" data-k="' + r.kind + '" data-id="' + r.line_id + '" data-u="' + (r.user_id || "") + '" data-n="' + esc(r.name || "") + '">' +
'<button type="button" class="warn" data-wca="rmline">Remove</button><button type="button" data-wca="keep">Leave it</button>' +
'<button type="button" class="warn" data-wca="mute" data-m="60">Mute 1 hour</button><button type="button" class="warn" data-wca="mute" data-m="1440">1 day</button></div></div>';
}).join("") : '<div class="wc-dim">None waiting.</div>';
h += '<h4>Muted</h4>';
h += (B.mutes || []).length ? (B.mutes || []).map(function (m) {
return '<div class="wc-row"><span>' + esc(m.name || "a dreamer") + ' <span class="wc-dim">' + (m.until ? "until " + new Date(m.until).toLocaleString() : "until lifted") + '</span></span>' +
'<span class="wc-acts" style="margin:0" data-k="" data-id="0" data-u="' + m.user_id + '" data-n="' + esc(m.name || "") + '"><button type="button" data-wca="unmute">Lift</button></span></div>';
}).join("") : '<div class="wc-dim">Nobody.</div>';
if (WCHAT.me && WCHAT.me.keeper) {
h += '<h4>Moderators</h4><div class="wc-dim">The Keeper and officers of the Corp and the court moderate already. Tap a line by somebody to make them a moderator.</div>';
h += (B.mods || []).map(function (m) {
return '<div class="wc-row"><span>' + esc(m.name || "a dreamer") + '</span><span class="wc-acts" style="margin:0" data-k="" data-id="0" data-u="' + m.user_id + '" data-n="' + esc(m.name || "") + '"><button type="button" data-wca="unmod">Not a moderator</button></span></div>';
}).join("");
h += '<h4>Banned words</h4><div class="wc-dim">Shown as stars wherever they are said.</div>' +
'<div class="wc-row"><input id="wc-word" type="text" maxlength="40" placeholder="a word" style="flex:1;min-width:0;background:#07070C;border:1px solid rgba(201,190,168,.3);color:#EDE8F8;border-radius:8px;padding:7px 9px">' +
'<button type="button" data-wca="addword">Ban it</button></div>';
h += (B.words || []).map(function (w) { return '<div class="wc-row"><span>' + esc(w) + '</span><button type="button" data-wca="unword" data-w="' + esc(w) + '">Allow</button></div>'; }).join("");
}
body.innerHTML = h;
},
function () {
if (!WCHAT.el)
return;
var inp = WCHAT.el.querySelector(".wc-foot input"), t = (inp.value || "").trim();
if (!t)
return;
if (!wcSigned()) {
wcSay("Sign in to chat.");
return;
}
var tab = WCHAT.tab, here = wcHere(), p;
if (tab === "world" || tab === "here")
p = cityRpc("world_say", { p_body: t, p_channel: tab, p_loc: tab === "here" ? here.k : "", p_loc_name: tab === "here" ? here.n : null });
else
p = cityRpc("say_in_city", { p_body: t, p_channel: tab === "city" ? "city" : "near" });
inp.value = "";
p.then(function (o) {
if (o !== "ok") {
wcSay(esc(String(o)));
inp.value = inp.value || t;
return;
}
WCHAT.cool = 0.2;
if (tab === "city" || tab === "near") {
if (typeof chatCool !== "undefined")
chatCool = 0.15;
}
}).catch(function (e) {
if (/world_say|Could not find|PGRST202|404/.test((e && e.message) || ""))
WCHAT.noServer = true;
wcSay("That wasn't heard.");
inp.value = t;
wcPaint(false);
});
}
];
});
