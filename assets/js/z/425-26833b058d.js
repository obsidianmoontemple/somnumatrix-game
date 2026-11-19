/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(425, function () {
"use strict";
return [
function (rows) {
rows = rows || [];
var bl = cwsBlocked(), me = myUserId(), out = [], here = [];
rows.forEach(function (r) {
if (!r || !r.user_id)
return;
if (bl[r.user_id]) {
out.push({ user_id: r.user_id, place: "~elsewhere" });
return;
}
if (!CWS.server && r.user_id !== me && r.place !== "~elsewhere") {
var w = null;
try {
w = placeToWorld(r);
}
catch (e) { }
if (w) {
here.push({ r: r, d: Math.hypot(w.x - camera.position.x, w.z - camera.position.z) + (presenceOthers[r.user_id] ? -4 : 0) + (r.away ? 1000 : 0) });
return;
}
}
out.push(r);
});
if (here.length) {
here.sort(function (a, b) { return a.d - b.d; });
var n = cwsMax();
here.forEach(function (h, i) { out.push(i < n ? h.r : { user_id: h.r.user_id, place: "~elsewhere", away: h.r.away }); });
}
return out;
},
function (force) {
if (!force && CWS.me && Date.now() - CWS.meAt < 60000)
return Promise.resolve(CWS.me);
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve(null);
CWS.meAt = Date.now();
return cityRpc("my_safety", {}).then(function (o) { CWS.me = o || null; if (o && o.mod)
CWS.mod = true; return o; }).catch(function () { return null; });
},
function () {
if (document.getElementById("cws-css"))
return;
var st = document.createElement("style");
st.id = "cws-css";
st.textContent =
"#cws{position:fixed;z-index:60;left:50%;top:50%;transform:translate(-50%,-50%);width:min(440px,calc(100vw - 24px));max-height:min(82vh,640px);overflow-y:auto;" +
"background:#0C0B14;border:1px solid rgba(201,190,168,.45);border-radius:12px;color:#E6E0D2;font:14px system-ui,sans-serif;padding:14px 16px 16px;" +
"box-shadow:0 14px 50px rgba(0,0,0,.65);-webkit-overflow-scrolling:touch;display:none}" +
"#cws.on{display:block}" +
"#cws h3{margin:0 0 4px;font:700 17px system-ui,sans-serif;color:#F2E6C8}#cws h4{margin:14px 0 6px;font:600 13px system-ui,sans-serif;color:#C9BEA8}" +
"#cws .d{color:#9A93A8;font-size:12.5px;line-height:1.45}" +
"#cws .r{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}" +
"#cws button{background:#211D33;color:#EDE8F8;border:1px solid #3A3160;border-radius:8px;padding:8px 11px;font:600 13px system-ui,sans-serif;cursor:pointer;min-height:36px}" +
"#cws button.w{border-color:#8A4A3A;color:#F2C2B0}#cws button.g{background:#E8C66A;color:#17120A;border-color:#E8C66A}" +
"#cws button.on{box-shadow:inset 0 0 0 2px #E8C66A}" +
"#cws textarea{width:100%;box-sizing:border-box;min-height:64px;background:#07070C;border:1px solid rgba(201,190,168,.3);color:#EDE8F8;border-radius:8px;padding:8px;font:14px system-ui,sans-serif}" +
"#cws .x{position:absolute;right:8px;top:8px;background:none;border:0;color:#C9BEA8;min-height:0}" +
"#cws .it{border-top:1px solid rgba(201,190,168,.15);padding:8px 0}" +
".cws-dots{background:#211D33;color:#EDE8F8;border:1px solid #3A3160;border-radius:8px;padding:4px 9px;cursor:pointer;font:700 13px system-ui,sans-serif}";
document.head.appendChild(st);
},
function () {
if (CWS.el)
return CWS.el;
cwsCss();
var el = document.createElement("div");
el.id = "cws";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("keyup", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) { var b = e.target && e.target.closest ? e.target.closest("[data-cw]") : null; if (b)
cwsAct(b.getAttribute("data-cw"), b); });
document.body.appendChild(el);
CWS.el = el;
return el;
},
function (id, name) {
if (!id || id === myUserId())
return;
if (!(typeof signedIn === "function" && signedIn())) {
cwsSay("Sign in to report, mute or block.");
return;
}
CWS.card = { kind: "who", id: id, name: name || (presenceOthers[id] && presenceOthers[id].name) || "a dreamer" };
CWS.repWhy = null;
cwsFree();
setTimeout(cwsFree, 80);
setTimeout(cwsFree, 400);
cwsPaint();
if (typeof pfLoad === "function")
try {
var pr = pfLoad(false);
if (pr && pr.then)
pr.then(function () { if (CWS.card && CWS.card.id === id)
cwsPaint(); });
}
catch (e) { }
cwsLoadMe(false).then(function () { if (CWS.card && CWS.card.id === id)
cwsPaint(); });
if (CWS.mod || (CWS.me && CWS.me.mod))
cwsLoadBoard(false).then(function () { if (CWS.card && CWS.card.id === id)
cwsPaint(); });
},
function () {
var el = cwsEl(), C = CWS.card;
if (!C) {
el.className = "";
return;
}
var h = '<button class="x" data-cw="close">Close ✕</button>';
var mod = CWS.mod || (CWS.me && CWS.me.mod), keeper = CWS.me && CWS.me.keeper;
if (C.kind === "who") {
var id = C.id, muted = !!cwsMuted()[id], blocked = !!cwsBlocked()[id], st = typeof pfState === "function" ? pfState(id) : null;
h += '<h3>' + cwsEsc(C.name) + '</h3><div class="d">' + (blocked ? "Blocked: you do not see or hear them." : muted ? "Muted on this device." : st === "friend" ? "Your friend." : "Another dreamer.") + '</div>';
h += '<div class="r">';
if (!blocked && typeof pfDo === "function") {
if (st === "friend")
h += '<button disabled style="opacity:.7">✓ Friend</button>';
else if (st === "asked")
h += '<button disabled style="opacity:.7">Friend asked</button>';
else if (st === "askme")
h += '<button data-cw="friend-yes">Accept friend</button>';
else
h += '<button data-cw="friend">Add friend</button>';
}
h += '<button data-cw="' + (muted ? "unmute" : "mute") + '">' + (muted ? "Unmute" : "Mute") + '</button>';
h += '<button class="w" data-cw="' + (blocked ? "unblock" : "block") + '">' + (blocked ? "Unblock" : C.sure ? "Sure? Block them" : "Block") + '</button>';
h += '</div><div class="d">Mute hides their chat lines, the words over their head and their voice, on this device. Block works everywhere: they are not drawn, cannot message you or ask to be friends, and are not told.</div>';
h += '<h4>Report ' + cwsEsc(C.name) + '</h4>';
if (C.sent)
h += '<div class="d">' + cwsEsc(C.sent) + '</div>';
else {
h += '<div class="r">' + CWS_WHY.map(function (w) { return '<button data-cw="why" data-k="' + w[0] + '"' + (CWS.repWhy === w[0] ? ' class="on"' : '') + '>' + w[1] + '</button>'; }).join("") + '</div>';
if (CWS.repWhy)
h += '<textarea id="cws-note" maxlength="400" placeholder="What happened? (you can leave this empty)"></textarea><div class="r"><button class="g" data-cw="report">Send the report</button></div>';
h += '<div class="d">A moderator reads every report. If three different dreamers report the same person within an hour, they are sent home from shared places at once until a moderator looks.</div>';
}
if (mod) {
var R = null;
((CWS.board && CWS.board.reports) || []).forEach(function (x) { if (x.user_id === id)
R = x; });
h += '<h4>Moderator</h4><div class="d">' + (R ? R.n + " report" + (R.n > 1 ? "s" : "") + " from " + R.people + " (" + cwsEsc(R.reasons || "") + ")" : "No reports waiting about them.") +
(R && R.home_until ? " · sent home until " + cwsTime(R.home_until) : "") + '</div>';
h += '<div class="r"><button class="w" data-cw="home" data-m="10">Send home 10 min</button><button class="w" data-cw="home" data-m="60">1 hour</button><button class="w" data-cw="home" data-m="1440">1 day</button><button data-cw="back">Let back</button></div>';
h += '<div class="r"><button class="w" data-cw="kick" data-m="60">Kick out 1 hour</button><button class="w" data-cw="kick" data-m="1440">1 day</button><button class="w" data-cw="kick" data-m="10080">1 week</button>' + (keeper ? '<button class="w" data-cw="ban">' + (C.banSure ? "Sure? Ban for good" : "Ban for good") + '</button>' : '') + '<button data-cw="unkick">Let back in</button></div>' +
'<div class="d">Kick throws them out of the whole game at once and keeps them out until it ends; Ban keeps them out for good.</div>';
h += '<div class="r"><button class="w" data-cw="cmute" data-m="10">Mute chat 10 min</button><button class="w" data-cw="cmute" data-m="60">1 hour</button><button class="w" data-cw="cmute" data-m="1440">1 day</button><button data-cw="cunmute">Lift chat mute</button></div>';
if (R)
h += '<div class="r"><button data-cw="settle">Reports looked at</button></div>';
}
}
else if (C.kind === "me") {
var M = CWS.me || {};
h += '<h3>Your safety</h3>';
var bub = cwsBubbleOn();
h += '<div class="r"><button data-cw="bubble" class="' + (bub ? "on" : "") + '">Personal space: ' + (bub ? "on" : "off") + '</button></div><div class="d">With personal space on, anybody who is not your friend and comes closer than about a step is not drawn for you until they step back.</div>';
if (M.home_until && Date.parse(M.home_until) > Date.now()) {
h += '<h4>Sent home until ' + cwsTime(M.home_until) + '</h4><div class="d">' + cwsEsc(M.home_reason || "A moderator asked you to step away from shared places for a while.") + ' You can still play in your own dream, and the journal works as always.</div>';
h += cwsAppealBox("home", M);
}
if (M.muted) {
h += '<h4>Muted in chat' + (M.muted_until && String(M.muted_until).indexOf("infinity") < 0 ? " until " + cwsTime(M.muted_until) : "") + '</h4><div class="d">' + cwsEsc(M.mute_reason || "A moderator muted you.") + '</div>';
h += cwsAppealBox("mute", M);
}
(M.appeals || []).filter(function (a) { return a.status !== "waiting"; }).slice(0, 2).forEach(function (a) {
h += '<div class="it d">Your appeal (' + (a.kind === "home" ? "sent home" : "muted") + '): <b>' + (a.status === "lifted" ? "lifted" : "kept") + '</b>' + (a.reply ? " · the Keeper says: “" + cwsEsc(a.reply) + "”" : "") + '</div>';
});
var bl = cwsBlocked(), mu = cwsMuted();
var ks = Object.keys(bl).concat(Object.keys(mu).filter(function (k) { return !bl[k]; }));
if (ks.length) {
h += '<h4>Muted and blocked</h4>' + ks.map(function (k) { return '<div class="it" style="display:flex;justify-content:space-between;align-items:center"><span>' + cwsEsc(bl[k] || mu[k] || "someone") + ' <span class="d">' + (bl[k] ? "blocked" : "muted") + '</span></span><button data-cw="' + (bl[k] ? "unblock" : "unmute") + '" data-u="' + cwsEsc(k) + '">' + (bl[k] ? "Unblock" : "Unmute") + '</button></div>'; }).join("");
}
if (CWS.server && CWS.split) {
h += '<h4>Copies of this place</h4><div class="d">When a place is busy it is split into copies so everyone can move freely. You are in copy ' + (CWS.copy + 1) + ' of ' + CWS.copies + ' (' + CWS.here + ' here). To join a friend, step into theirs.</div><div class="r">';
for (var c = 0; c < Math.min(CWS.copies + (mod ? 1 : 0), 12); c++)
h += '<button data-cw="copy" data-c="' + c + '"' + (c === CWS.copy ? ' class="on"' : '') + '>Copy ' + (c + 1) + '</button>';
h += '</div>';
}
if (mod)
h += '<div class="r"><button data-cw="board">Moderator: reports' + (CWS.board && CWS.board.reports && CWS.board.reports.length ? " (" + CWS.board.reports.length + ")" : "") + '</button></div>';
}
else if (C.kind === "board") {
var B = CWS.board;
h += '<h3>Reports</h3>';
if (!B)
h += '<div class="d">Looking…</div>';
else {
h += (B.reports || []).length ? (B.reports || []).map(function (r) {
return '<div class="it"><b>' + cwsEsc(r.name) + '</b>' + (r.urgent ? ' <span style="color:#F2C2B0">· unsafe for children</span>' : '') +
'<div class="d">' + r.n + ' report' + (r.n > 1 ? "s" : "") + ' from ' + r.people + ' · ' + cwsEsc(r.reasons || "") + (r.home_until ? " · home until " + cwsTime(r.home_until) : "") + (r.muted_until ? " · chat muted" : "") + '</div>' +
((r.notes || []).length ? '<div class="d">“' + (r.notes || []).map(cwsEsc).join("” “") + '”</div>' : '') +
'<div class="r" data-u="' + cwsEsc(r.user_id) + '" data-n="' + cwsEsc(r.name) + '"><button class="w" data-cw="home" data-m="60">Send home 1 hour</button><button class="w" data-cw="home" data-m="1440">1 day</button>' +
'<button class="w" data-cw="cmute" data-m="1440">Mute chat 1 day</button><button data-cw="back">Let back</button><button data-cw="settle">Looked at</button></div></div>';
}).join("") : '<div class="d">No dreamers reported just now.</div>';
h += '<h4>Sent home</h4>' + ((B.homes || []).length ? (B.homes || []).map(function (x) {
return '<div class="it" style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span>' + cwsEsc(x.name) + ' <span class="d">until ' + cwsTime(x.until) + ' · by ' + cwsEsc(x.by) + '</span></span>' +
'<span class="r" style="margin:0" data-u="' + cwsEsc(x.user_id) + '" data-n="' + cwsEsc(x.name) + '"><button data-cw="back">Let back</button></span></div>';
}).join("") : '<div class="d">Nobody.</div>');
if (B.keeper) {
h += '<h4>Appeals</h4>' + ((B.appeals || []).length ? (B.appeals || []).map(function (a) {
return '<div class="it"><b>' + cwsEsc(a.name) + '</b> <span class="d">(' + (a.kind === "home" ? "sent home" : "muted") + ')</span><div>“' + cwsEsc(a.body) + '”</div>' +
'<textarea data-reply="' + a.id + '" maxlength="400" placeholder="An answer for them (optional)" style="min-height:40px;margin-top:6px"></textarea>' +
'<div class="r"><button class="g" data-cw="lift" data-a="' + a.id + '">Lift it</button><button data-cw="keep" data-a="' + a.id + '">Keep it</button></div></div>';
}).join("") : '<div class="d">None waiting.</div>');
}
else if (B.appeals_waiting)
h += '<div class="d" style="margin-top:10px">' + B.appeals_waiting + ' appeal(s) waiting for the Keeper.</div>';
}
}
el.innerHTML = h;
el.className = "on";
},
function (kind, M) {
var w = (M.appeals || []).filter(function (a) { return a.kind === kind && a.status === "waiting"; })[0];
if (w)
return '<div class="d">Your appeal is with the Keeper.</div>';
return '<textarea id="cws-ap-' + kind + '" maxlength="600" placeholder="Why should it be lifted? A few words for the Keeper."></textarea><div class="r"><button class="g" data-cw="appeal" data-k="' + kind + '">Ask the Keeper to look again</button></div>';
},
function (a, b) {
var C = CWS.card || {}, box = b.closest ? b.closest("[data-u]") : null;
var id = (b.getAttribute("data-u")) || (box && box.getAttribute("data-u")) || C.id, name = (box && box.getAttribute("data-n")) || C.name || "them";
var repaint = function () { cwsLoadBoard(true).then(function () { cwsPaint(); }); };
if (a === "close") {
cwsClose();
return;
}
if (a === "friend" || a === "friend-yes") {
if (typeof pfDo === "function") {
var p = pfDo(a === "friend" ? "ask" : "accept", id, name, true);
if (p && p.then)
p.then(function () { if (typeof pfLoad === "function")
pfLoad(true); setTimeout(cwsPaint, 800); });
}
return;
}
if (a === "mute") {
var m = cwsMuted();
m[id] = name;
if (typeof wcSetBlocked === "function")
wcSetBlocked(m);
if (typeof VC !== "undefined" && VC && VC.mutedBy)
VC.mutedBy[id] = true;
var pp = presenceOthers[id];
if (pp && pp.bubble) {
dropTag(pp.bubble);
pp.bubble = null;
}
cwsSay(cwsEsc(name) + " is muted on this device.");
cwsPaint();
return;
}
if (a === "unmute") {
var m2 = cwsMuted();
delete m2[id];
if (typeof wcSetBlocked === "function")
wcSetBlocked(m2);
if (typeof VC !== "undefined" && VC && VC.mutedBy)
delete VC.mutedBy[id];
cwsSay("Unmuted.");
cwsPaint();
return;
}
if (a === "block") {
if (C.kind === "who" && !C.sure) {
C.sure = true;
cwsPaint();
return;
}
if (typeof pfDo === "function") {
var q = pfDo("block", id, name, true);
if (q && q.then)
q.then(function () { if (typeof pfLoad === "function")
pfLoad(true); });
}
else
cityRpc("block_set", { p_user: id, p_on: true }).catch(function () { });
if (typeof VC !== "undefined" && VC && VC.mutedBy)
VC.mutedBy[id] = true;
CWS.justBlocked[id] = name;
if (typeof removePresence === "function")
removePresence(id);
cwsSay("🚫 " + cwsEsc(name) + " is blocked.");
C.sure = false;
setTimeout(cwsPaint, 900);
return;
}
if (a === "unblock") {
delete CWS.justBlocked[id];
if (typeof pfDo === "function") {
var u = pfDo("unblock", id, name, true);
if (u && u.then)
u.then(function () { if (typeof pfLoad === "function")
pfLoad(true); setTimeout(cwsPaint, 600); });
}
return;
}
if (a === "why") {
CWS.repWhy = b.getAttribute("data-k");
cwsPaint();
var t = document.getElementById("cws-note");
if (t)
t.focus();
return;
}
if (a === "report") {
var note = (document.getElementById("cws-note") || {}).value || "", at = myPlace();
cityRpc("player_report", { p_user: id, p_reason: CWS.repWhy || "other", p_note: note, p_place: at && at.place }).then(function (o) {
C.sent = (o && o.say) || "Sent. A moderator will look.";
cwsPaint();
}).catch(function (e) {
var m = String(e && e.message || "");
if (/player_report|PGRST202|Could not find/i.test(m)) {
cityRpc("voice_report", { p_user: id, p_why: (CWS.repWhy || "other") + (note ? ": " + note.slice(0, 180) : "") }).then(function () { C.sent = "Sent to the officers and the Keeper."; cwsPaint(); }).catch(cwsFail);
}
else
cwsFail();
});
return;
}
if (a === "home") {
cityRpc("mod_send_home", { p_user: id, p_minutes: +b.getAttribute("data-m"), p_reason: null }).then(cwsDone(repaint)).catch(cwsFail);
return;
}
if (a === "kick") {
cityRpc("keeper_kick", { p_user: id, p_minutes: +b.getAttribute("data-m"), p_reason: null }).then(cwsDone(function () { if (typeof removePresence === "function")
removePresence(id); repaint(); })).catch(cwsFail);
return;
}
if (a === "ban") {
if (C.kind === "who" && !C.banSure) {
C.banSure = true;
cwsPaint();
return;
}
C.banSure = false;
cityRpc("keeper_kick", { p_user: id, p_minutes: null, p_reason: null }).then(cwsDone(function () { if (typeof removePresence === "function")
removePresence(id); repaint(); })).catch(cwsFail);
return;
}
if (a === "unkick") {
cityRpc("keeper_unkick", { p_user: id }).then(cwsDone(repaint)).catch(cwsFail);
return;
}
if (a === "back") {
cityRpc("mod_let_back", { p_user: id }).then(cwsDone(repaint)).catch(cwsFail);
return;
}
if (a === "cmute") {
cityRpc("chat_mute", { p_user: id, p_minutes: +b.getAttribute("data-m"), p_reason: "from their card" }).then(cwsDone(repaint)).catch(cwsFail);
return;
}
if (a === "cunmute") {
cityRpc("chat_unmute", { p_user: id }).then(cwsDone(repaint)).catch(cwsFail);
return;
}
if (a === "settle") {
cityRpc("mod_reports_settle", { p_user: id, p_outcome: "looked at" }).then(cwsDone(repaint)).catch(cwsFail);
return;
}
if (a === "board") {
cwsOpenBoard();
return;
}
if (a === "lift" || a === "keep") {
var aid = +b.getAttribute("data-a"), ta = CWS.el.querySelector('[data-reply="' + aid + '"]');
cityRpc("keeper_appeal_decide", { p_id: aid, p_lift: a === "lift", p_reply: ta ? ta.value : null }).then(cwsDone(repaint)).catch(cwsFail);
return;
}
if (a === "appeal") {
var k = b.getAttribute("data-k"), tx = (document.getElementById("cws-ap-" + k) || {}).value || "";
cityRpc("safety_appeal", { p_kind: k, p_body: tx }).then(cwsDone(function () { cwsLoadMe(true).then(cwsPaint); })).catch(cwsFail);
return;
}
if (a === "bubble") {
cwsBubbleSet(!cwsBubbleOn());
cwsPaint();
return;
}
if (a === "copy") {
CWS.want = +b.getAttribute("data-c");
if (typeof clearAllPresence === "function")
clearAllPresence();
presenceCool = 0;
cwsSay("Stepping into copy " + (CWS.want + 1) + "…");
cwsClose();
return;
}
},
function () {
var mod = CWS.mod || (CWS.me && CWS.me.mod), n = CWS.board && CWS.board.reports ? CWS.board.reports.length : 0;
var hm = CWS.home ? '<span style="color:#F2C2B0">Sent home until ' + cwsTime(CWS.home) + '. </span>' : "";
return '<div class="st-dim" style="margin-bottom:6px">' + hm + (CWS.server && CWS.split && CWS.copies > 1 ? "You are in copy " + (CWS.copy + 1) + " of " + CWS.copies + ". " : "") +
'Tap a dreamer, or ⋯, to report, mute or block. <button class="cws-dots" data-cwsme="1">🛡 Safety' + (mod && n ? " · " + n + " reports" : "") + '</button></div>';
},
function (nx, ny, maxD) {
if (typeof THREE === "undefined" || typeof camera === "undefined" || !camera || typeof presenceOthers === "undefined")
return null;
var list = [];
for (var id in presenceOthers) {
var g = presenceOthers[id].group;
if (g && g.visible && g.parent)
list.push(g);
}
if (!list.length)
return null;
CWS_RC = CWS_RC || new THREE.Raycaster();
CWS_RC.setFromCamera(new THREE.Vector2(nx, ny), camera);
CWS_RC.far = maxD;
var hit = CWS_RC.intersectObjects(list, true)[0];
if (!hit)
return null;
var o = hit.object;
while (o && !(o.userData && o.userData.presence))
o = o.parent;
return o ? o.userData.presence : null;
},
function (kind, detail, hint) {
if (CWS_OUT)
return;
CWS_OUT = kind;
var until = detail && detail !== "forever" && Date.parse(detail) ? new Date(detail) : null;
var msg = kind === "SM_CLOSED" ? "The Keeper has closed the game to members only for now. Please come back later."
: until ? "You have been removed from the game by a moderator until " + until.toLocaleString() + "."
: "You have been removed from the game.";
if (hint)
msg += " Reason: " + hint;
var el = document.createElement("div");
el.id = "cws-out";
el.style.cssText = "position:fixed;inset:0;z-index:2147483646;background:rgba(6,7,12,.97);color:#E8DCC4;display:flex;align-items:center;justify-content:center;padding:16px;font:16px system-ui,sans-serif;text-align:center";
el.innerHTML = '<div style="max-width:460px"><div style="font-size:22px;margin-bottom:10px">' + (kind === "SM_CLOSED" ? "The game is closed" : "Removed") + '</div><div>' + cwsEsc(msg) + '</div></div>';
["keydown", "keyup", "pointerdown", "pointerup", "click", "wheel", "touchstart"].forEach(function (t) { el.addEventListener(t, function (e) { e.stopPropagation(); e.preventDefault(); }, true); });
document.body.appendChild(el);
try {
if (typeof presenceActive !== "undefined")
presenceActive = false;
}
catch (e) { }
try {
if (typeof vcStop === "function")
vcStop();
}
catch (e) { }
if (kind === "SM_KICKED") {
try {
if (typeof sb !== "undefined" && sb && sb.auth)
sb.auth.signOut();
}
catch (e) { }
try {
Object.keys(localStorage).forEach(function (k) { if (/^sb-.*-auth-token$/.test(k))
localStorage.removeItem(k); });
}
catch (e) { }
}
}
];
});
