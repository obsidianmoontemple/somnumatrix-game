/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(515, function () {
"use strict";
return [
function (title, html, o) {
o = o || {};
var el = document.getElementById("csl-modal");
if (!el) {
el = document.createElement("div");
el.id = "csl-modal";
el.style.cssText = "position:fixed;inset:0;z-index:9150;background:rgba(6,8,14,.86);display:flex;align-items:flex-start;justify-content:center;padding:max(10px,env(safe-area-inset-top)) 10px 10px;overflow:auto;-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("keyup", function (e) { e.stopPropagation(); });
el.addEventListener("click", cslClick);
el.addEventListener("input", function (e) { if (e.target && e.target.getAttribute("data-csli"))
cslInput(e); });
document.body.appendChild(el);
}
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
var col = o.col || "#2E5A9A";
el.style.display = "flex";
el.dataset.k = o.k || "";
el.innerHTML = '<div style="width:min(' + (o.w || 680) + 'px,100%);background:#FBFAF6;color:#1E2228;border-radius:8px;border-top:6px solid ' + col + ';padding:14px 16px 18px;font:15px/1.55 var(--sans,system-ui);box-shadow:0 10px 40px rgba(0,0,0,.5)">' +
'<div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><div style="font:600 19px Georgia,serif">' + title + '</div>' +
'<button data-csl="close" style="' + cslBtn("#5A6068") + '">Close</button></div><div id="csl-body">' + html + '</div></div>';
return el;
},
function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-csl]") : null;
if (!b)
return;
var k = b.getAttribute("data-csl");
if (k === "close") {
e.preventDefault();
cslClose();
return;
}
var f = CSL_CLICK[k];
if (f) {
if (b.tagName !== "INPUT")
e.preventDefault();
try {
f(b, e);
}
catch (x) {
if (window.console)
console.warn("[school-live]", k, x);
}
}
},
function (force) {
var r = cslClassRoom();
if (!r) {
if (CSL.room) {
CSL.room = null;
CSL.key = "";
CSL.st = null;
CSL.strokes = null;
CSL.ver = 0;
CSL.live = -1;
cslBoardLeave();
cslPanelPaint();
}
return;
}
var key = cslRoomKey(r);
if (key !== CSL.key) {
CSL.room = r;
CSL.key = key;
CSL.st = null;
CSL.ver = 0;
CSL.live = -1;
CSL.strokes = cslBoardLocal(key);
CSL.boardCan = false;
cslBoardEnter(r);
cslPanelPaint();
force = true;
cslMine(false).then(cslPanelPaint);
}
if (!cslIn() || CSL.off || CSL.busy)
return;
var gap = CSL.st && CSL.st.session ? CSL.POLL_CLASS : (CSL.boardOpen ? CSL.POLL_CLASS : CSL.POLL_IDLE);
if (!force && Date.now() - CSL.pollAt < gap)
return;
CSL.pollAt = Date.now();
CSL.busy = true;
var k0 = key;
cslRpc("school_room", { p_room: key, p_ver: CSL.ver, p_live: CSL.live }).then(function (o) {
CSL.busy = false;
if (!o || !o.ok || CSL.key !== k0)
return;
var was = CSL.st;
CSL.st = o;
if (o.board) {
CSL.boardCan = !!o.board.can;
if (o.board.strokes && +o.board.ver !== CSL.ver) {
CSL.ver = +o.board.ver;
CSL.strokes = o.board.strokes || [];
cslBoardDraw();
cslBoardLocalSave(key, CSL.strokes);
}
else
CSL.ver = +o.board.ver || CSL.ver;
}
cslSessionSeen(was, o);
cslPanelPaint();
}).catch(function (e) { CSL.busy = false; var m = cslErr(e); if (/the latest server update/.test(m))
CSL.off = true; CSL.lastErr = m; });
},
function () {
var r = CSL.room;
if (!r)
return "";
var st = CSL.st, s = st && st.session, h = '';
h += '<div class="row"><button class="btn" data-csl="board-look">🟩 Look at the board</button>' + (CSL.boardCan || !cslIn() || CSL.off ? '<button class="btn" data-csl="board-write">✏️ Write on the board</button>' : '') + '</div>';
if (s) {
if (s.mine)
h += '<div style="margin-top:6px;color:#BFE4C4">🍎 <b>Your class is in session</b> here' + (s.only ? ' · class only' : '') + '.</div><div class="row"><button class="btn" data-csl="teach">🍎 Teacher\'s desk</button></div>';
else if (s.member)
h += '<div style="margin-top:6px;color:#BFE4C4">🎒 <b>Class with ' + cslEsc(s.teacher) + '.</b></div><div class="row"><button class="btn" data-csl="hand">' + (st.hand ? '✋ Lower my hand' : '✋ Raise my hand') + '</button>' +
(st.live && st.live.kind && st.live.kind !== "none" ? '<button class="btn" data-csl="live-open">📣 What the teacher sent</button>' : '') + '</div>';
else
h += '<div style="margin-top:6px;color:#F4C080">🔒 <b>Class in session:</b> ' + cslEsc(s.name || "a class") + ' with ' + cslEsc(s.teacher) + '.</div>';
}
else if (cslIn() && cslTeacherHere()) {
h += '<div class="row"><button class="btn" data-csl="start">🍎 Start class here</button><button class="btn" data-csl="school">🏫 My school</button></div>';
}
return h;
},
function () {
var el = document.getElementById("sch-panel");
if (!el)
return;
var box = document.getElementById("csl-panel");
if (!CSL.room || el.style.display === "none") {
if (box)
box.innerHTML = "";
return;
}
if (!box || box.parentNode !== el) {
box = document.createElement("div");
box.id = "csl-panel";
el.appendChild(box);
}
var h = cslPanelHtml();
if (box.dataset.h !== h) {
box.dataset.h = h;
box.innerHTML = h;
}
},
function (force) {
if (!cslIn())
return Promise.resolve(null);
if (!force && CSL.mine && Date.now() - CSL.mineAt < 60000)
return Promise.resolve(CSL.mine);
CSL.mineAt = Date.now();
return cslRpc("school_staff_mine", {}).then(function (o) { CSL.mine = o; return o; }, function (e) { CSL.mine = { ok: false, say: cslErr(e) }; return CSL.mine; });
},
function () {
var last = "";
try {
last = localStorage.getItem("somnu.pupil.school") || "";
}
catch (e) { }
cslModal("🎒 Pupil sign-in", '<p style="margin:6px 0 10px;color:#3A4048">Your teacher gave you a sign-in card. Type what it says.</p>' +
'<label style="display:block;font-size:13px;color:#5A6068">School code</label><input id="csl-in-school" autocomplete="organization" value="' + cslEsc(last) + '" placeholder="BISBEE1" style="width:100%;font-size:18px;padding:8px;border:1px solid #A8B0BA;border-radius:6px;text-transform:uppercase;margin-bottom:8px">' +
'<label style="display:block;font-size:13px;color:#5A6068">Username</label><input id="csl-in-user" autocomplete="username" autocapitalize="none" placeholder="mayaj27" style="width:100%;font-size:18px;padding:8px;border:1px solid #A8B0BA;border-radius:6px;margin-bottom:8px">' +
'<label style="display:block;font-size:13px;color:#5A6068">Password</label><input id="csl-in-pass" type="password" autocomplete="current-password" autocapitalize="none" placeholder="blue-otter-42" style="width:100%;font-size:18px;padding:8px;border:1px solid #A8B0BA;border-radius:6px">' +
'<div style="margin-top:12px;display:flex;gap:8px;align-items:center;flex-wrap:wrap"><button data-csl="pupil-go" style="' + cslBtn("#3A8A5A") + '">Sign in</button><span id="csl-in-msg" style="font-size:14px"></span></div>' +
'<p style="margin:12px 0 0;color:#5A6068;font-size:12.5px">Forgot your password? Your teacher can make you a new one. Never share your password with anyone but your teacher or your parent.</p>', { k: "signin", w: 440, col: "#3A8A5A" });
var f = document.getElementById(last ? "csl-in-user" : "csl-in-school");
if (f)
try {
f.focus();
}
catch (e) { }
var pw = document.getElementById("csl-in-pass");
if (pw)
pw.onkeydown = function (e) { if (e.key === "Enter") {
e.preventDefault();
CSL_CLICK["pupil-go"]();
} };
},
function () {
var sc = (document.getElementById("csl-in-school") || {}).value || "", us = (document.getElementById("csl-in-user") || {}).value || "", pw = (document.getElementById("csl-in-pass") || {}).value || "";
var em = cslPupilEmail(sc, us);
if (!em || !pw) {
cslMsg("csl-in-msg", "Type all three: the school code, your username and your password.", true);
return;
}
if (typeof authPost !== "function" || typeof keepSession !== "function") {
cslMsg("csl-in-msg", "Signing in is not ready yet. Try again in a moment.", true);
return;
}
cslMsg("csl-in-msg", "Signing in…");
authPost("token?grant_type=password", { email: em, password: pw.trim() }).then(function (j) {
keepSession({ access_token: j.access_token, refresh_token: j.refresh_token, user: j.user, at: Date.now() });
try {
localStorage.setItem("somnu.pupil.school", String(sc).toUpperCase().replace(/[^A-Z0-9]/g, ""));
}
catch (e) { }
cslClose();
cslSay("<b>Welcome to school.</b> You are signed in to your own account.");
if (typeof tgateEnter === "function" && document.getElementById("tg-splash"))
try {
tgateEnter();
}
catch (e) { }
}).catch(function (e) {
var m = String((e && e.message) || e || "");
if (/invalid|credentials|grant/i.test(m))
m = "That school code, username or password is not right. Check your card, or ask your teacher for a new password.";
else if (/banned|ban/i.test(m))
m = "Your teacher has paused this account. Ask your teacher.";
else if (typeof authWords === "function")
m = authWords(e);
cslMsg("csl-in-msg", cslEsc(m), true);
});
},
function () {
if (!cslIn()) {
cslModal("🏫 School", '<p>Sign in first. Teachers sign in with their own account; pupils use 🎒 Pupil sign-in with their school card.</p><div style="margin-top:8px"><button data-csl="pupil-in" style="' + cslBtn("#3A8A5A") + '">🎒 Pupil sign-in</button></div>', { k: "school" });
return;
}
cslModal("🏫 School: teachers, classes and pupils", '<p style="color:#5A6068">Loading…</p>', { k: "school" });
cslMine(true).then(function (o) { if (cslOpenK() === "school")
cslSchoolPaint(o); });
},
function (o) {
var body = document.getElementById("csl-body");
if (!body)
return;
if (!o || !o.ok) {
body.innerHTML = '<p>' + cslEsc((o && o.say) || "The school could not be reached.") + '</p>';
return;
}
var h = '';
if (o.pupil) {
body.innerHTML = '<p>This is a pupil\'s account. Your teacher looks after your class: you see and meet only your class and your teacher.</p>';
return;
}
var S = o.schools || [], C = o.classes || [];
h += '<div style="background:#F0F4FA;border-radius:6px;padding:10px 12px;margin:8px 0">' +
'<b>' + (S.length ? 'Join another school' : 'Are you a teacher at a partner school?') + '</b><div style="font-size:13px;color:#3A4048;margin:2px 0 6px">Type the staff code your school was given (TCH-1234-5678). ' + (o.adult ? '' : '<b>Your account needs a date of birth showing 18 or over first (Settings, Account).</b>') + '</div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap"><input id="csl-staffcode" placeholder="TCH-1234-5678" style="font-size:16px;padding:6px 8px;border:1px solid #A8B0BA;border-radius:5px;text-transform:uppercase;width:200px">' +
'<button data-csl="join" style="' + cslBtn("#2E5A9A") + '">Join</button><span id="csl-join-msg" style="font-size:13.5px;align-self:center"></span></div></div>';
S.forEach(function (s) {
h += '<div style="border:1px solid #C8CCD2;border-radius:6px;padding:10px 12px;margin:10px 0">' +
'<div style="font:600 16px Georgia,serif">' + cslEsc(s.name) + (s.district ? ' <span style="font:13px var(--sans);color:#5A6068">· ' + cslEsc(s.district) + '</span>' : '') + '</div>' +
'<div style="font-size:13px;color:#3A4048">School code (pupils type it to sign in): <b style="font-size:15px;letter-spacing:.05em">' + cslEsc(s.code) + '</b> · you are its ' + (s.role === "lead" ? 'lead teacher' : s.role === "keeper" ? 'Keeper' : 'teacher') +
' · pupil accounts ' + s.used + ' of ' + s.seats + (s.until ? ' · trial until ' + cslEsc(s.until) : '') + (s.closed ? ' · <b style="color:#B03A2A">closed</b>' : '') + '</div>';
if (s.staff_code)
h += '<div style="font-size:13px;margin-top:4px">Staff code for your teachers: <b>' + cslEsc(s.staff_code) + '</b></div>';
if (s.staff && s.staff.length)
h += '<div style="font-size:13px;margin-top:4px">Teachers: ' + s.staff.map(function (t) { return cslEsc(t.name) + (t.role === "lead" ? ' (lead)' : '') + (t.id !== cslMe() ? ' <button data-csl="staff" data-s="' + cslEsc(s.code) + '" data-u="' + t.id + '" data-r="' + (t.role === "lead" ? "teacher" : "lead") + '" style="' + cslBtnO("#5A6068") + ';padding:1px 6px;font-size:11.5px">' + (t.role === "lead" ? 'make teacher' : 'make lead') + '</button> <button data-csl="staff" data-s="' + cslEsc(s.code) + '" data-u="' + t.id + '" data-r="remove" style="' + cslBtnO("#B03A2A") + ';padding:1px 6px;font-size:11.5px">remove</button>' : ''); }).join(" · ") + '</div>';
h += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;align-items:center"><input id="csl-cn-' + cslEsc(s.code) + '" placeholder="Class name, e.g. Room 12 · Grade 4" style="flex:1 1 200px;padding:6px 8px;border:1px solid #A8B0BA;border-radius:5px">' +
'<select id="csl-cg-' + cslEsc(s.code) + '" style="padding:6px;border:1px solid #A8B0BA;border-radius:5px">' + cslGradeOpts("") + '</select>' +
'<button data-csl="class-new" data-s="' + cslEsc(s.code) + '" style="' + cslBtn("#3A8A5A") + '">Make a class</button></div><div id="csl-cmsg-' + cslEsc(s.code) + '" style="font-size:13.5px"></div></div>';
});
if (!S.length && !C.length)
h += '<p style="color:#5A6068;font-size:13.5px">Schools join SomnuMatrix through the Keeper (one school per district on a free trial). A home-school parent can still run a class with 🔒 Teacher / parent lock in Settings.</p>';
if (C.length)
h += '<div style="font:600 17px Georgia,serif;margin:14px 0 4px">Classes</div>';
C.forEach(function (c) {
var P = c.pupils || [], open = !!CSL.open[c.code], live = P.filter(function (p) { return !p.removed; }).length;
h += '<div style="border:1px solid #C8CCD2;border-left:5px solid #3A8A5A;border-radius:6px;padding:10px 12px;margin:8px 0">' +
'<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center"><div><b style="font-size:15.5px">' + cslEsc(c.name) + '</b>' + (c.grade ? ' · ' + cslEsc(c.grade === "K" ? "Kindergarten" : "Grade " + c.grade) : '') +
' <span style="color:#5A6068;font-size:12.5px">· ' + live + ' pupil' + (live === 1 ? '' : 's') + (c.school ? ' · ' + cslEsc(c.school) : ' · family / home class') + (c.mine ? '' : ' · ' + cslEsc(c.teacher) + '\'s class') + '</span>' +
(c.session ? '<div style="font-size:12.5px;color:#2A6A3A">🍎 In class now: ' + cslEsc(c.session.room_name || c.session.room) + (c.session.only ? ' · class only' : '') + '</div>' : '') + '</div>' +
'<button data-csl="cl-open" data-c="' + cslEsc(c.code) + '" style="' + cslBtnO("#2E5A9A") + '">' + (open ? 'Fold up' : 'Open') + '</button></div>';
if (open) {
h += '<div style="display:flex;gap:14px;flex-wrap:wrap;font-size:13.5px;margin:8px 0">' +
'<label><input type="checkbox" data-csl="cl-sw" data-c="' + cslEsc(c.code) + '" data-k="together"' + (c.together ? ' checked' : '') + '> Classmates see each other</label>' +
'<label><input type="checkbox" data-csl="cl-sw" data-c="' + cslEsc(c.code) + '" data-k="chat"' + (c.chat ? ' checked' : '') + '> Classmates may chat (typed, kept to the class)</label></div>' +
'<div style="font-size:12px;color:#5A6068;margin-bottom:6px">Pupils under 13 see nobody but you until "Classmates see each other" is on. Everyone in the class only ever meets the class and you.</div><div id="csl-sw-msg-' + cslEsc(c.code) + '" style="font-size:13px"></div>';
if (P.length) {
h += '<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:13px"><tr style="background:#F0EEE8"><th style="text-align:left;padding:4px">Pupil</th><th style="text-align:left;padding:4px">Username</th><th style="padding:4px">Units</th><th style="padding:4px">Days (30)</th><th></th></tr>' +
P.map(function (p) {
var pw = CSL.pw[p.id];
return '<tr style="border-top:1px solid #E0E0DA;' + (p.removed ? 'color:#9A9A9A' : '') + '"><td style="padding:4px">' + cslEsc(p.name) + (p.young ? ' <span title="under 13: young player rules" style="font-size:11px;background:#FCEBC8;border-radius:8px;padding:0 5px">under 13</span>' : '') + (p.removed ? ' (taken out)' : '') + '</td>' +
'<td style="padding:4px"><b>' + cslEsc(p.username) + '</b>' + (pw ? '<div style="font-size:11.5px;color:#2A6A3A">password: ' + cslEsc(pw) + '</div>' : '') + '</td><td style="text-align:center">' + (p.units || 0) + '</td><td style="text-align:center">' + (p.days30 || 0) + '</td>' +
'<td style="padding:4px;white-space:nowrap">' + (p.removed ? '<button data-csl="pp" data-do="back" data-u="' + p.id + '" style="' + cslBtnO("#2A6A3A") + ';padding:2px 7px;font-size:12px">Put back</button> <button data-csl="pp" data-do="delete" data-u="' + p.id + '" style="' + cslBtnO("#B03A2A") + ';padding:2px 7px;font-size:12px">Delete</button>' :
'<button data-csl="pp" data-do="pw" data-u="' + p.id + '" style="' + cslBtnO("#2E5A9A") + ';padding:2px 7px;font-size:12px">New password</button> <button data-csl="pp" data-do="out" data-u="' + p.id + '" style="' + cslBtnO("#B03A2A") + ';padding:2px 7px;font-size:12px">Take out</button>') + '</td></tr>';
}).join("") + '</table></div>' +
'<div style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap"><button data-csl="cards" data-c="' + cslEsc(c.code) + '" style="' + cslBtn("#2E5A9A", 1) + '">🖨 Print sign-in cards</button></div>';
}
if ((c.others || []).length)
h += '<div style="font-size:12.5px;color:#5A6068;margin-top:6px">Also locked into this class from their own devices: ' + c.others.map(function (x) { return cslEsc(x.name); }).join(", ") + '</div>';
if (c.school && c.mine)
h += '<div style="margin-top:10px;background:#F6F4EC;border-radius:6px;padding:8px 10px"><b>Add pupils</b><div style="font-size:12.5px;color:#3A4048">One pupil a line: their name, and if you like the grade and date of birth, e.g. <i>Maya Jones, 4, 2016-05-02</i>. Each gets their own account.</div>' +
'<textarea id="csl-add-' + cslEsc(c.code) + '" rows="5" style="width:100%;margin-top:6px;font:14px var(--sans);padding:6px;border:1px solid #A8B0BA;border-radius:5px" placeholder="Maya Jones\nLeo Park, 4\nSam Ortiz, 4, 2016-09-14"></textarea>' +
'<label style="display:block;font-size:13px;margin:6px 0"><input type="checkbox" id="csl-consent-' + cslEsc(c.code) + '"> For pupils under 13: our school has the parent or guardian consent it needs for them to use SomnuMatrix for school.</label>' +
'<button data-csl="add" data-c="' + cslEsc(c.code) + '" style="' + cslBtn("#3A8A5A") + '">Make their accounts</button> <span id="csl-add-msg-' + cslEsc(c.code) + '" style="font-size:13.5px"></span></div>';
}
h += '</div>';
});
h += '<p style="color:#5A6068;font-size:12px;margin-top:12px">Pupils sign in with 🎒 Pupil sign-in (on the first screen, and in Settings): the school code, their username and their password. In a classroom, 🍎 Start class makes the room yours: anyone not in your class is shown out, and with "class only" you meet only your pupils.</p>';
body.innerHTML = h;
},
function () {
var v = ((document.getElementById("csl-staffcode") || {}).value || "").trim();
if (!v) {
cslMsg("csl-join-msg", "Type the staff code first.", true);
return;
}
cslMsg("csl-join-msg", "Joining…");
cslRpc("school_staff_join", { p_staff_code: v }).then(function (o) { if (!o || !o.ok) {
cslMsg("csl-join-msg", cslEsc((o && o.say) || "No."), true);
return;
} cslSay(cslEsc(o.say)); cslRefresh(); })
.catch(function (e) { cslMsg("csl-join-msg", cslEsc(cslErr(e)), true); });
},
function (b) {
var s = b.getAttribute("data-s"), n = (document.getElementById("csl-cn-" + s) || {}).value || "", g = (document.getElementById("csl-cg-" + s) || {}).value || "";
cslMsg("csl-cmsg-" + s, "Making the class…");
cslRpc("school_class_new", { p_school: s, p_name: n, p_grade: g || null }).then(function (o) { if (!o || !o.ok) {
cslMsg("csl-cmsg-" + s, cslEsc((o && o.say) || "No."), true);
return;
} CSL.open[o.code] = 1; cslRefresh(); })
.catch(function (e) { cslMsg("csl-cmsg-" + s, cslEsc(cslErr(e)), true); });
},
function (b, e) {
var c = b.getAttribute("data-c"), k = b.getAttribute("data-k"), on = !!b.checked;
setTimeout(function () { b.checked = on; }, 0);
cslRpc("school_class_set", k === "together" ? { p_circle: c, p_together: on } : { p_circle: c, p_chat: on }).then(function (o) { cslMsg("csl-sw-msg-" + c, cslEsc((o && o.say) || "Saved."), !(o && o.ok)); cslMine(true); })
.catch(function (x) { cslMsg("csl-sw-msg-" + c, cslEsc(cslErr(x)), true); });
},
function (text) {
return String(text || "").split(/\n+/).map(function (l) {
var p = l.split(/[,\t;]/).map(function (x) { return x.trim(); });
if (!p[0])
return null;
var o = { name: p[0].slice(0, 40) }, g = (p[1] || "").replace(/^grade\s*/i, "").toUpperCase();
if (g === "KINDERGARTEN")
g = "K";
if (/^(K|[1-9]|1[0-2])$/.test(g))
o.grade = g;
var d = (p[2] || p[1] || "").match(/^\d{4}-\d{2}-\d{2}$/);
if (d)
o.dob = d[0];
var us = (p[2] || p[1] || "").match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
if (us)
o.dob = us[3] + "-" + ("0" + us[1]).slice(-2) + "-" + ("0" + us[2]).slice(-2);
return o;
}).filter(Boolean);
},
function (b) {
var c = b.getAttribute("data-c"), list = cslParsePupils((document.getElementById("csl-add-" + c) || {}).value), ok = !!(document.getElementById("csl-consent-" + c) || {}).checked;
if (!list.length) {
cslMsg("csl-add-msg-" + c, "Type at least one name.", true);
return;
}
cslMsg("csl-add-msg-" + c, "Making " + list.length + " account" + (list.length === 1 ? "" : "s") + "…");
cslRpc("school_pupils_add", { p_circle: c, p_list: list, p_consent: ok }).then(function (o) {
if (!o) {
cslMsg("csl-add-msg-" + c, "No answer.", true);
return;
}
(o.pupils || []).forEach(function (p) { CSL.pw[p.id] = p.password; });
var sk = (o.skipped || []).map(function (x) { return cslEsc(x.name) + " (" + cslEsc(x.say) + ")"; }).join(", ");
cslRefresh().then(function () {
cslMsg("csl-add-msg-" + c, cslEsc(o.say || "") + (sk ? " <br>Not made: " + sk : ""), !o.ok);
if ((o.pupils || []).length)
cslCards(o.school, o.school_name, o["class"], o.pupils);
});
}).catch(function (e) { cslMsg("csl-add-msg-" + c, cslEsc(cslErr(e)), true); });
},
function (b) {
var u = b.getAttribute("data-u"), d = b.getAttribute("data-do");
if (d === "delete" && !b.dataset.sure) {
b.dataset.sure = "1";
b.textContent = "Delete for good?";
return;
}
if (d === "pw")
cslRpc("school_pupil_password", { p_user: u }).then(function (o) { if (o && o.ok) {
CSL.pw[u] = o.password;
cslSay("<b>" + cslEsc(o.name) + "</b>: new password <b>" + cslEsc(o.password) + "</b>. Their old one no longer works.");
cslCards(o.school, "", null, [o]);
}
else
cslSay(cslEsc((o && o.say) || "No.")); cslRefresh(); }).catch(function (e) { cslSay(cslEsc(cslErr(e))); });
else
cslRpc("school_pupil_set", { p_user: u, p_do: d }).then(function (o) { cslSay(cslEsc((o && o.say) || "")); cslRefresh(); }).catch(function (e) { cslSay(cslEsc(cslErr(e))); });
},
function (school, schoolName, className, pupils) {
var h = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sign-in cards</title><style>' +
'body{font:14px/1.4 Georgia,serif;margin:0;padding:14px;background:#fff;color:#1A1C20}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}' +
'.c{border:2px dashed #7A8A9A;border-radius:10px;padding:12px 14px;break-inside:avoid}.c h3{margin:0 0 2px;font-size:17px}.c .d{color:#555;font-size:12px;margin-bottom:6px}' +
'.c table td{padding:2px 8px 2px 0;font-size:15px}.c b{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:17px;letter-spacing:.03em}.n{font-size:11.5px;color:#555;margin-top:6px}' +
'.np{margin:0 0 10px}@media print{.np{display:none}body{padding:0}}</style></head><body><div class="np"><button onclick="window.print()" style="font-size:15px;padding:6px 14px">Print</button> Cut along the dashed lines; give each pupil their own card.</div><div class="g">' +
pupils.map(function (p) {
return '<div class="c"><h3>🎒 ' + cslEsc(p.name) + '</h3><div class="d">' + cslEsc(schoolName || school) + (className ? ' · ' + cslEsc(className) : '') + ' · SomnuMatrix school sign-in</div>' +
'<table><tr><td>School code</td><td><b>' + cslEsc(school) + '</b></td></tr><tr><td>Username</td><td><b>' + cslEsc(p.username) + '</b></td></tr><tr><td>Password</td><td><b>' + cslEsc(p.password || CSL.pw[p.id] || "(ask your teacher)") + '</b></td></tr></table>' +
'<div class="n">Open SomnuMatrix, press <b style="font-size:12px">🎒 Pupil sign-in</b>, and type these. Keep your password secret.</div></div>';
}).join("") + '</div></body></html>';
if (typeof edrShowDoc === "function")
edrShowDoc(h);
else {
var w = window.open("", "_blank");
if (w) {
w.document.open();
w.document.write(h);
w.document.close();
}
}
},
function (b) {
var c = b.getAttribute("data-c"), C = ((CSL.mine || {}).classes || []).filter(function (x) { return x.code === c; })[0];
if (!C)
return;
var S = ((CSL.mine || {}).schools || []).filter(function (s) { return s.code === C.school; })[0];
cslCards(C.school, S ? S.name : "", C.name, (C.pupils || []).filter(function (p) { return !p.removed; }));
},
function (g, w, h) {
g.fillStyle = "#24372C";
g.fillRect(0, 0, w, h);
var gr = g.createRadialGradient(w * 0.5, h * 0.45, h * 0.2, w * 0.5, h * 0.5, w * 0.62);
gr.addColorStop(0, "rgba(255,255,255,0.05)");
gr.addColorStop(1, "rgba(0,0,0,0.18)");
g.fillStyle = gr;
g.fillRect(0, 0, w, h);
var r = 1234567;
function rnd() { r = (r * 16807) % 2147483647; return r / 2147483647; }
g.strokeStyle = "rgba(230,235,225,0.035)";
g.lineWidth = 18;
g.lineCap = "round";
for (var i = 0; i < 9; i++) {
g.beginPath();
var x = rnd() * w, y = rnd() * h;
g.moveTo(x, y);
g.quadraticCurveTo(x + 80 * rnd(), y - 30 + 60 * rnd(), x + 160 + 120 * rnd(), y - 20 + 40 * rnd());
g.stroke();
}
},
function (g, s) {
var p = s.p || [];
if (p.length < 2)
return;
var er = !!s.e;
g.lineCap = "round";
g.lineJoin = "round";
g.strokeStyle = er ? "#24372C" : (s.c || CSL_CHALK[0]);
g.lineWidth = er ? (s.w || 4) * 6 : (s.w || 4);
g.globalAlpha = er ? 1 : 0.92;
g.beginPath();
g.moveTo(p[0], p[1]);
for (var i = 2; i < p.length; i += 2)
g.lineTo(p[i], p[i + 1]);
if (p.length === 2)
g.lineTo(p[0] + 0.5, p[1] + 0.5);
g.stroke();
if (!er) {
g.globalAlpha = 0.25;
g.lineWidth = Math.max(1, (s.w || 4) * 0.45);
g.beginPath();
g.moveTo(p[0] + 1, p[1] - 1);
for (var j = 2; j < p.length; j += 2)
g.lineTo(p[j] + 1, p[j + 1] - 1);
g.stroke();
}
g.globalAlpha = 1;
},
function (g, strokes, r) {
cslSlate(g, CSL_BW, CSL_BH);
var S = strokes || [];
if (!S.length && r) {
var d = new Date(), days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], mo = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
cslChalkText(g, { t: days[d.getDay()] + ", " + mo[d.getMonth()] + " " + d.getDate(), x: CSL_BW - 330, y: 16, s: 26, c: CSL_CHALK[1] });
cslChalkText(g, { t: r.name, x: 28, y: 22, s: 38 });
cslChalkText(g, { t: (typeof eduTeacherName === "function" ? eduTeacherName(r) : "") + "'s class", x: 28, y: 72, s: 26, c: CSL_CHALK[3] });
g.strokeStyle = "rgba(244,242,234,0.5)";
g.lineWidth = 2;
g.beginPath();
g.moveTo(28, 116);
g.lineTo(520, 116);
g.stroke();
}
S.forEach(function (s) { if (s && s.t != null)
cslChalkText(g, s);
else if (s)
cslChalkLine(g, s); });
},
function (r) {
cslBoardLeave();
if (typeof THREE === "undefined" || !INT || !INT.root)
return;
var cv = document.createElement("canvas");
cv.width = CSL_BW;
cv.height = CSL_BH;
var tex = new THREE.CanvasTexture(cv);
if (THREE.SRGBColorSpace)
tex.colorSpace = THREE.SRGBColorSpace;
tex.anisotropy = 4;
var g = new THREE.Group(), cx = (r.x0 + r.x1) / 2, z = r.z0;
var slate = new THREE.Mesh(new THREE.PlaneGeometry(4.3, 1.34), new THREE.MeshBasicMaterial({ map: tex }));
slate.position.set(cx, 1.62, z + 0.215);
g.add(slate);
var oak = new THREE.MeshLambertMaterial({ color: 0x8A5A32 }), M = [oak];
[[4.46, 0.08, 0, 2.31], [4.46, 0.08, 0, 0.93], [0.08, 1.46, -2.19, 1.62], [0.08, 1.46, 2.19, 1.62]].forEach(function (q) { var m = new THREE.Mesh(new THREE.BoxGeometry(q[0], q[1], 0.05), oak); m.position.set(cx + q[2], q[3], z + 0.225); g.add(m); });
var tray = new THREE.Mesh(new THREE.BoxGeometry(4.3, 0.035, 0.12), oak);
tray.position.set(cx, 0.9, z + 0.27);
g.add(tray);
var ch = new THREE.MeshLambertMaterial({ color: 0xF4F2EA });
M.push(ch);
[[-1.2, 0xF4F2EA], [-1.05, 0xF6E27A], [-0.95, 0xF49AB8]].forEach(function (q, i) { var m = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.08, 6), i ? new THREE.MeshLambertMaterial({ color: q[1] }) : ch); if (i)
M.push(m.material); m.rotation.z = Math.PI / 2; m.position.set(cx + q[0], 0.93, z + 0.27); g.add(m); });
var felt = new THREE.MeshLambertMaterial({ color: 0x3A3A44 });
M.push(felt);
var er = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.04, 0.06), felt);
er.position.set(cx + 1.3, 0.94, z + 0.27);
g.add(er);
INT.root.add(g);
CSL.board = { g: g, cv: cv, ctx: cv.getContext("2d"), tex: tex, mats: M.concat([slate.material]), room: r };
cslBoardDraw();
},
function () {
if (!CSL.board) {
cslSay("Stand in a classroom to see its board.");
return;
}
cslModal("🟩 The board · " + cslEsc(CSL.board.room.name), '<img id="csl-look" alt="the chalkboard" style="width:100%;border-radius:4px;border:6px solid #8A5A32;background:#24372C"><div style="color:#5A6068;font-size:12.5px;margin-top:6px">It changes as the teacher writes.</div>', { k: "look", w: 920, col: "#3A6A4A" });
cslBoardDraw();
},
function () {
if (!CSL.board) {
cslSay("Stand in a classroom to write on its board.");
return;
}
if (cslIn() && !CSL.boardCan && !CSL.off) {
cslSay("Only the teacher writes on this board just now.");
return;
}
CSL.ed = { col: CSL_CHALK[0], w: 5, er: false, cur: null, undo: [], sendT: 0 };
var col = CSL_CHALK.map(function (c, i) { return '<button data-csl="ed-col" data-c="' + c + '" title="chalk" style="width:34px;height:34px;border-radius:50%;border:3px solid ' + (i ? '#FFF' : '#2E5A9A') + ';background:' + c + ';cursor:pointer"></button>'; }).join("");
cslModal("✏️ Write on the board · " + cslEsc(CSL.board.room.name), '<div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:4px 0 8px">' + col +
'<span style="width:8px"></span><button data-csl="ed-w" data-w="3" style="' + cslBtnO("#3A4048") + '">thin</button><button data-csl="ed-w" data-w="5" style="' + cslBtnO("#3A4048") + '">chalk</button><button data-csl="ed-w" data-w="10" style="' + cslBtnO("#3A4048") + '">thick</button>' +
'<button data-csl="ed-er" style="' + cslBtnO("#3A4048") + '">🧽 eraser</button><button data-csl="ed-undo" style="' + cslBtnO("#3A4048") + '">↶ undo</button><button data-csl="ed-clear" style="' + cslBtnO("#B03A2A") + '">wipe it clean</button></div>' +
'<canvas id="csl-ed" width="' + CSL_BW + '" height="' + CSL_BH + '" style="width:100%;touch-action:none;border:8px solid #8A5A32;border-radius:4px;cursor:crosshair;background:#24372C;display:block"></canvas>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><input id="csl-ed-text" data-csli="ed-text" placeholder="Type words for the board, then press Put it up" style="flex:1 1 260px;padding:7px 9px;border:1px solid #A8B0BA;border-radius:5px;font-size:15px">' +
'<button data-csl="ed-put" style="' + cslBtn("#3A6A4A") + '">Put it up</button><button data-csl="ed-lesson" style="' + cslBtn("#2E5A9A") + '">📖 Today\'s lesson</button></div>' +
'<div id="csl-ed-msg" style="font-size:13px;color:#5A6068;margin-top:6px">' + (cslIn() && !CSL.off ? 'Your class sees it within a few seconds.' : 'Kept on this device (sign in so a class can see it).') + '</div>', { k: "board", w: 980, col: "#3A6A4A" });
var cv = document.getElementById("csl-ed"), g = cv.getContext("2d");
CSL.ed.cv = cv;
CSL.ed.g = g;
function at(e) { var b = cv.getBoundingClientRect(); return [Math.round((e.clientX - b.left) * CSL_BW / b.width), Math.round((e.clientY - b.top) * CSL_BH / b.height)]; }
cv.addEventListener("pointerdown", function (e) {
e.preventDefault();
try {
cv.setPointerCapture(e.pointerId);
}
catch (x) { }
var p = at(e);
CSL.ed.cur = { c: CSL.ed.col, w: CSL.ed.w, p: [p[0], p[1]] };
if (CSL.ed.er)
CSL.ed.cur.e = 1;
cslEdDraw();
});
cv.addEventListener("pointermove", function (e) {
var s = CSL.ed && CSL.ed.cur;
if (!s)
return;
e.preventDefault();
var p = at(e), n = s.p.length;
if (Math.abs(p[0] - s.p[n - 2]) + Math.abs(p[1] - s.p[n - 1]) < 3)
return;
if (n > 1200)
return;
s.p.push(p[0], p[1]);
cslEdDraw();
});
function up() { var s = CSL.ed && CSL.ed.cur; if (!s)
return; CSL.ed.cur = null; cslBoardAdd(s); }
cv.addEventListener("pointerup", up);
cv.addEventListener("pointercancel", up);
cv.addEventListener("pointerleave", up);
cslEdDraw();
},
function () {
var key = CSL.key;
cslBoardLocalSave(key, CSL.strokes);
if (!cslIn() || CSL.off)
return;
clearTimeout(CSL.sendT);
CSL.sendT = setTimeout(function () {
cslRpc("school_board_put", { p_room: key, p_strokes: CSL.strokes }).then(function (o) {
if (o && o.ok) {
if (CSL.key === key)
CSL.ver = +o.ver;
cslMsg("csl-ed-msg", "On the board for the class.");
}
else
cslMsg("csl-ed-msg", cslEsc((o && o.say) || "Not sent."), true);
}).catch(function (e) { var m = cslErr(e); if (/the latest server update/.test(m))
CSL.off = true; cslMsg("csl-ed-msg", cslEsc(m), true); });
}, 450);
},
function () {
var r = CSL.board && CSL.board.room;
if (!r)
return;
var cid = r.id, done = typeof eduCount === "function" ? eduCount(cid) : 0, u = Math.min(10, done + 1);
function put(t, lessons) {
CSL.strokes = [];
if (CSL.ed)
CSL.ed.undo = [];
cslBoardAdd({ t: r.name, x: 26, y: 18, s: 34, c: CSL_CHALK[1] });
cslBoardAdd({ t: "Unit " + u + ": " + t, x: 26, y: 66, s: 32 });
(lessons || []).slice(0, 3).forEach(function (L, i) { cslBoardAdd({ t: (i + 1) + ". " + L.t, x: 46, y: 118 + i * 44, s: 28, c: CSL_CHALK[[3, 4, 2][i]] }); });
cslBoardAdd({ t: "Today we will learn it, try it, and check it.", x: 26, y: 262, s: 24, c: CSL_CHALK[1] });
}
if (typeof edrLx === "function")
edrLx(cid, function (d) {
var U = d && d.units && d.units[u - 1];
if (U)
return put(U.t, U.lessons);
if (typeof eduData === "function")
eduData(r.grade, function (by) { var R = by && by[r.subj], X = R && R.units && R.units[u - 1]; put(X ? X.t : "", []); });
});
},
function () {
var r = CSL.room;
if (!r) {
cslSay("Stand in a classroom first.");
return;
}
cslMine(true).then(function (o) {
var C = ((o && o.classes) || []).filter(function (c) { return c.mine; });
if (!C.length) {
cslModal("🍎 Start class", '<p>You have no class yet. Make one in 🏫 My school (teachers of a partner school), or with 🔒 Teacher / parent lock in Settings.</p><button data-csl="school" style="' + cslBtn("#2E5A9A") + '">🏫 My school</button>', { k: "start", w: 520 });
return;
}
var pre = C.filter(function (c) { return c.grade === r.grade; })[0] || C[0];
cslModal("🍎 Start class in " + cslEsc(r.name), '<label style="display:block;margin:6px 0">Class<br><select id="csl-st-c" style="width:100%;padding:7px;border:1px solid #A8B0BA;border-radius:5px;font-size:15px">' + C.map(function (c) { return '<option value="' + cslEsc(c.code) + '"' + (c === pre ? ' selected' : '') + '>' + cslEsc(c.name) + ' (' + (c.pupils || []).filter(function (p) { return !p.removed; }).length + ' pupils)</option>'; }).join("") + '</select></label>' +
'<label style="display:block;margin:6px 0">How long<br><select id="csl-st-m" style="padding:7px;border:1px solid #A8B0BA;border-radius:5px;font-size:15px"><option value="30">30 minutes</option><option value="45">45 minutes</option><option value="60" selected>1 hour</option><option value="90">1½ hours</option><option value="120">2 hours</option></select></label>' +
'<label style="display:block;margin:10px 0;font-size:14.5px"><input type="checkbox" id="csl-st-only" checked> <b>Class only</b>: the room is closed to anyone not in my class, and I see and meet only my pupils until class ends.</label>' +
'<button data-csl="start-go" style="' + cslBtn("#3A8A5A") + '">Start class</button> <span id="csl-st-msg" style="font-size:14px"></span>', { k: "start", w: 560, col: "#3A8A5A" });
});
},
function () {
var r = CSL.room;
if (!r)
return;
var c = document.getElementById("csl-st-c").value, m = +document.getElementById("csl-st-m").value, only = document.getElementById("csl-st-only").checked;
cslMsg("csl-st-msg", "Starting…");
cslRpc("school_class_start", { p_circle: c, p_room: CSL.key, p_room_name: r.name, p_minutes: m, p_only: only }).then(function (o) {
if (!o || !o.ok) {
cslMsg("csl-st-msg", cslEsc((o && o.say) || "No."), true);
return;
}
cslSay("<b>" + cslEsc(o.say) + "</b>");
CSL.teachC = c;
cslPoll(true);
setTimeout(cslTeachCard, 400);
}).catch(function (e) { cslMsg("csl-st-msg", cslEsc(cslErr(e)), true); });
},
function () {
var el = document.getElementById("csl-teach");
if (!el || cslOpenK() !== "teach")
return;
var st = CSL.st || {}, s = st.session;
if (!s || !s.mine) {
el.innerHTML = '<p>Class is over.</p>';
return;
}
if (el.querySelector("input:focus,textarea:focus,select:focus"))
return;
var until = new Date(s.until), mins = Math.max(0, Math.round((until - Date.now()) / 60000)), L = st.live || {}, A = st.answers || [];
var h = '<div style="display:flex;gap:10px;flex-wrap:wrap;font-size:13.5px;margin:4px 0 8px;align-items:center">' +
'<span>⏱ <b>' + mins + ' min</b> left</span><span>👥 here: <b>' + (st.here || []).length + '</b> of ' + (st.pupils || 0) + '</span>' +
'<label><input type="checkbox" data-csl="t-only"' + (s.only ? ' checked' : '') + '> class only</label>' +
'<label><input type="checkbox" data-csl="t-write"' + (s.write ? ' checked' : '') + '> pupils may write on the board</label>' +
'<button data-csl="t-more" style="' + cslBtnO("#2E5A9A") + '">+15 min</button><button data-csl="t-end" style="' + cslBtnO("#B03A2A") + '">End class</button></div>';
h += '<div style="font-size:13px;color:#3A4048">' + ((st.here || []).length ? 'In the room: ' + st.here.map(cslEsc).join(", ") : 'Nobody from the class is in the room yet. They sign in with their cards and come to ' + cslEsc(CSL.room.name) + '.') + '</div>';
if ((st.hands || []).length)
h += '<div style="background:#FFF4D8;border-radius:6px;padding:6px 10px;margin:8px 0;font-size:14px">✋ <b>Hands up:</b> ' + st.hands.map(cslEsc).join(", ") + ' <button data-csl="t-hands" style="' + cslBtnO("#5A6068") + ';padding:2px 8px;font-size:12px">Lower all</button></div>';
h += '<div style="font:600 15px Georgia,serif;margin:12px 0 4px">Send to every pupil\'s screen</div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center"><select id="csl-t-u" style="padding:6px;border:1px solid #A8B0BA;border-radius:5px">' + cslUnitOpts() + '</select>' +
'<select id="csl-t-p" style="padding:6px;border:1px solid #A8B0BA;border-radius:5px"><option value="0">Overview</option>' + [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(function (i) { return '<option value="' + i + '">Lesson ' + i + '</option>'; }).join("") + '<option value="99">Unit quiz</option></select>' +
'<button data-csl="t-lesson" style="' + cslBtn("#2E5A9A", 1) + '">📖 Open this lesson for them</button><button data-csl="t-quiz" style="' + cslBtn("#8A4AA8", 1) + '">❓ Live quiz on this unit</button></div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px"><input id="csl-t-q" placeholder="Exit ticket: e.g. What is one thing you learned today?" style="flex:1 1 280px;padding:6px 8px;border:1px solid #A8B0BA;border-radius:5px">' +
'<button data-csl="t-ticket" style="' + cslBtn("#C8783A", 1) + '">🎟 Ask the class</button><button data-csl="t-none" style="' + cslBtnO("#5A6068") + '">Clear their screens</button></div><div id="csl-t-msg" style="font-size:13px;margin-top:4px"></div>';
if (L.kind && L.kind !== "none" && CSL.liveData) {
var D = CSL.liveData;
h += '<div style="border:1px solid #C8CCD2;border-radius:6px;padding:8px 10px;margin-top:10px"><b>' + (L.kind === "quiz" ? '❓ Live quiz' : L.kind === "ticket" ? '🎟 Exit ticket' : '📖 Lesson sent') + '</b>' + (L.kind === "ticket" ? ': ' + cslEsc(D.q) : '') + ' · ' + A.length + ' answered';
if (L.kind === "quiz") {
var qs = D.qs || [];
h += '<div style="font-size:13px;margin-top:6px">' + qs.map(function (q, k) {
var right = A.filter(function (a) { return a.ans && a.ans.picks && a.ans.picks[k] === q.a; }).length;
return '<div style="margin:3px 0">' + (k + 1) + '. ' + cslEsc(q.q) + ' <span style="display:inline-block;height:9px;width:' + (A.length ? Math.round(120 * right / A.length) : 0) + 'px;background:#3A8A5A;border-radius:3px;vertical-align:middle"></span> <b>' + right + '</b>/' + A.length + ' right</div>';
}).join("") + '</div>' +
(A.length ? '<div style="font-size:13px;margin-top:4px">' + A.map(function (a) { return cslEsc(a.name) + ' <b>' + ((a.ans && a.ans.right) || 0) + '/' + qs.length + '</b>'; }).join(" · ") + '</div>' : '');
}
else if (L.kind === "ticket") {
h += A.map(function (a) { return '<div style="margin:5px 0;padding:5px 8px;background:#F6F4EC;border-radius:5px;font-size:14px"><b>' + cslEsc(a.name) + ':</b> ' + cslEsc((a.ans && a.ans.text) || "") + '</div>'; }).join("");
}
h += '</div>';
}
el.innerHTML = h;
},
function (kind, data, say) {
var s = cslSess();
if (!s)
return;
cslMsg("csl-t-msg", "Sending…");
cslRpc("school_live_set", { p_circle: s.circle, p_kind: kind, p_data: data || {} }).then(function (o) { if (o && o.ok) {
cslMsg("csl-t-msg", say || "Sent.");
CSL.live = -1;
cslPoll(true);
}
else
cslMsg("csl-t-msg", cslEsc((o && o.say) || "No."), true); })
.catch(function (e) { cslMsg("csl-t-msg", cslEsc(cslErr(e)), true); });
},
function () {
var u = +document.getElementById("csl-t-u").value, cid = CSL.room.id;
function go(qs) {
if (!qs.length) {
cslMsg("csl-t-msg", "This unit has no questions to ask.", true);
return;
}
qs = (typeof edrMix === "function" ? edrMix(qs) : qs).slice(0, 6).map(function (q) { var o = [q[1], q[2], q[3]]; o = typeof edrMix === "function" ? edrMix(o) : o; return { q: q[0], o: o, a: o.indexOf(q[1]) }; });
cslLiveSend("quiz", { cid: cid, unit: u, title: CSL.room.name, qs: qs }, "The quiz is on their screens. Answers come in below.");
}
if (typeof edrLx === "function")
edrLx(cid, function (d) {
var U = d && d.units && d.units[u - 1], qs = [];
if (U)
(U.lessons || []).forEach(function (L) { (L.check || []).forEach(function (q) { qs.push(q); }); });
if (qs.length)
return go(qs);
eduData(CSL.room.grade, function (by) { var R = by && by[CSL.room.subj], X = R && R.units && R.units[u - 1]; go(X ? X.check || [] : []); });
});
},
function (was, o) {
var s = o.session, w = was && was.session;
if (s && s.member && !s.mine && !(w && w.member))
cslSay("🔔 <b>Class has started</b> with " + cslEsc(s.teacher) + ". ✋ Raise your hand from the classroom panel.");
if (!s && w && w.member && !w.mine)
cslSay("🔔 <b>Class is over.</b> Well done today.");
if (o.live && o.live.data != null && o.live.data !== undefined) {
CSL.live = +o.live.ver;
CSL.liveKind = o.live.kind;
CSL.liveData = o.live.data;
if (s && s.member && !s.mine)
cslLiveShow(false);
}
else if (o.live)
CSL.live = +o.live.ver;
if (s && s.mine)
cslTeachPaint();
},
function (again) {
var st = CSL.st || {}, s = st.session, k = CSL.liveKind, D = CSL.liveData || {}, mine = st.live && st.live.mine;
if (!s || !s.member || s.mine)
return;
if (k === "none") {
if (cslOpenK() === "live")
cslClose();
return;
}
if (k === "lesson") {
cslModal("📖 From " + cslEsc(s.teacher), '<p style="font-size:16px">Open <b>' + cslEsc(D.title || "") + '</b>, unit ' + (+D.unit || 1) + ', ' + (+D.part ? (+D.part >= 99 ? 'the unit quiz' : 'lesson ' + (+D.part)) : 'the overview') + '.</p><button data-csl="live-lesson" style="' + cslBtn("#2E5A9A") + '">Open it</button>', { k: "live", w: 480 });
}
else if (k === "quiz") {
if (mine && !again) {
return;
}
CSL.qp = {};
cslModal("❓ Quiz from " + cslEsc(s.teacher), (D.qs || []).map(function (q, i) {
return '<div style="margin:10px 0 4px"><b>' + (i + 1) + '.</b> ' + cslEsc(q.q) + '</div><div style="display:flex;flex-direction:column;gap:5px">' +
q.o.map(function (o, j) { return '<button data-csl="qp" data-k="' + i + '" data-o="' + j + '" style="text-align:left;padding:8px 10px;border-radius:5px;border:1px solid #C8CCD2;background:#FFF;color:#1E2228;font-size:15px">' + cslEsc(o) + '</button>'; }).join("") + '</div>';
}).join("") +
(mine ? '<p style="color:#2A6A3A">You answered: ' + (mine.right || 0) + ' of ' + (D.qs || []).length + ' right.</p>' : '<div style="margin-top:12px"><button data-csl="qsend" style="' + cslBtn("#8A4AA8") + '">Hand it in</button> <span id="csl-q-msg"></span></div>'), { k: "live", w: 600, col: "#8A4AA8" });
}
else if (k === "ticket") {
if (mine && !again)
return;
cslModal("🎟 Exit ticket from " + cslEsc(s.teacher), '<p style="font-size:16px">' + cslEsc(D.q || "") + '</p><textarea id="csl-tk" rows="4" maxlength="600" style="width:100%;font:15px var(--sans);padding:8px;border:1px solid #A8B0BA;border-radius:5px">' + cslEsc((mine && mine.text) || "") + '</textarea>' +
'<div style="margin-top:8px"><button data-csl="tksend" style="' + cslBtn("#C8783A") + '">Send to my teacher</button> <span id="csl-tk-msg"></span></div>', { k: "live", w: 560, col: "#C8783A" });
}
},
function () {
var D = CSL.liveData || {};
cslClose();
if (typeof eduOpen !== "function" || !D.cid)
return;
eduOpen(D.cid, "learn");
var Ls = EDU.lesson;
if (!Ls)
return;
Ls.unit = Math.max(1, Math.min(10, +D.unit || 1));
Ls.edrPartU = Ls.unit;
Ls.edrPart = +D.part || 0;
if (Ls.edrPart > 3 && typeof edrLx === "function") {
var want = Ls.edrPart;
edrLx(D.cid, function (d) { var U = d && d.units && d.units[Ls.unit - 1], nL = U ? U.lessons.length : 3; if (EDU.lesson === Ls) {
Ls.edrPart = want >= 99 || want > nL ? nL + 1 : want;
eduLessonPaint();
} });
}
if (typeof eduBegin === "function")
eduBegin();
eduLessonPaint();
},
function (b) {
var k = +b.getAttribute("data-k"), o = +b.getAttribute("data-o");
CSL.qp[k] = o;
Array.prototype.forEach.call(document.querySelectorAll('[data-csl="qp"][data-k="' + k + '"]'), function (x) { var on = +x.getAttribute("data-o") === o; x.style.background = on ? "#EEE4F6" : "#FFF"; x.style.borderColor = on ? "#8A4AA8" : "#C8CCD2"; });
},
function () {
var D = CSL.liveData || {}, qs = D.qs || [], s = cslSess();
if (!s)
return;
var picks = qs.map(function (q, k) { return CSL.qp[k] == null ? -1 : CSL.qp[k]; });
if (picks.indexOf(-1) >= 0) {
cslMsg("csl-q-msg", "Answer every question first.", true);
return;
}
var right = qs.filter(function (q, k) { return picks[k] === q.a; }).length;
cslRpc("school_answer", { p_circle: s.circle, p_ver: CSL.live, p_ans: { picks: picks, right: right } }).then(function (o) {
if (!o || !o.ok) {
cslMsg("csl-q-msg", cslEsc((o && o.say) || "No."), true);
return;
}
qs.forEach(function (q, k) { Array.prototype.forEach.call(document.querySelectorAll('[data-csl="qp"][data-k="' + k + '"]'), function (x) { var j = +x.getAttribute("data-o"); if (j === q.a)
x.style.background = "#DFF2E2";
else if (j === picks[k])
x.style.background = "#F8E0DC"; }); });
cslMsg("csl-q-msg", "<b>" + right + " of " + qs.length + " right.</b> Sent to your teacher.");
if (typeof cslSticker === "function" && right === qs.length)
cslSticker("quiz");
}).catch(function (e) { cslMsg("csl-q-msg", cslEsc(cslErr(e)), true); });
},
function () {
var s = cslSess(), t = String((document.getElementById("csl-tk") || {}).value || "").trim();
if (!s || !t) {
cslMsg("csl-tk-msg", "Write your answer first.", true);
return;
}
cslRpc("school_answer", { p_circle: s.circle, p_ver: CSL.live, p_ans: { text: t.slice(0, 600) } }).then(function (o) { cslMsg("csl-tk-msg", cslEsc((o && o.say) || ""), !(o && o.ok)); if (o && o.ok)
setTimeout(cslClose, 1200); })
.catch(function (e) { cslMsg("csl-tk-msg", cslEsc(cslErr(e)), true); });
},
function () {
var st = CSL.st, s = st && st.session, r = CSL.room;
if (!s || !s.only || s.member || s.mine || !r)
return;
if (CSL.mine && CSL.mine.keeper)
return;
if (Date.now() - CSL.kickAt < 1500)
return;
var lx = camera.position.x - INT.ox, lz = camera.position.z - INT.oz;
if (lx < r.x0 || lx > r.x1 || lz < r.z0 || lz > r.z1)
return;
CSL.kickAt = Date.now();
var h = EDU_ROOM[r.hall], x = h ? h.xc : r.door.x;
camera.position.x = INT.ox + x;
camera.position.z = INT.oz + r.door.z;
cslSay("🔒 <b>Class in session.</b> " + cslEsc(s.teacher) + "'s class has " + cslEsc(r.name) + " just now; it is open again when class ends.");
},
function (L, seed) {
var rnd = cslRng(seed), learn = L.learn || [], best = null;
var ans = (L.check || []).map(function (q) { return String(q[1]).toLowerCase(); }).join(" ");
learn.forEach(function (p) {
String(p).split(/(?<=[.!?])\s+/).forEach(function (sn) {
if (sn.length < 25 || sn.length > 220)
return;
cslWords(sn).forEach(function (w) {
var sc = w.length + (ans.indexOf(w.toLowerCase()) >= 0 ? 8 : 0) + (/^[A-Z]/.test(w) && sn.indexOf(w) > 0 ? 2 : 0) + rnd();
if (!best || sc > best.sc)
best = { sc: sc, s: sn, w: w };
});
});
});
if (!best)
return null;
var pool = [];
learn.concat((L.check || []).map(function (q) { return q[2] + " " + q[3]; })).forEach(function (p) { cslWords(p).forEach(function (w) { if (w.toLowerCase() !== best.w.toLowerCase() && pool.indexOf(w) < 0 && Math.abs(w.length - best.w.length) < 6)
pool.push(w); }); });
pool = cslShuf(pool, rnd).slice(0, 2);
if (pool.length < 2)
return null;
return { s: best.s, w: best.w, o: cslShuf([best.w].concat(pool), rnd) };
},
function (Ls, X, col) {
var part = Ls.edrPart || 0, n = X.lessons.length, W = cslWork(), key = Ls.cid + "." + Ls.unit + "." + part, h = '';
var mine = Object.keys(W.st).filter(function (k) { return k.indexOf(Ls.cid + ".") === 0; });
h += '<div style="margin-top:14px;border-top:2px dashed #E0DCCF;padding-top:10px">';
if (part === 0) {
var prev = Ls.unit > 1 && EDR.lx[Ls.cid] && EDR.lx[Ls.cid].units[Ls.unit - 2], pq = null;
if (prev) {
var all = [];
(prev.lessons || []).forEach(function (L) { (L.check || []).forEach(function (q) { all.push(q); }); });
if (all.length)
pq = all[Math.floor(cslRng(key)() * all.length)];
}
if (pq) {
var o = cslShuf([pq[1], pq[2], pq[3]], cslRng(key + "o")), pk = W.w[key];
h += '<div style="background:#FFF6E0;border-radius:8px;padding:10px 12px"><b>☀️ Warm-up</b> <span style="color:#5A6068;font-size:13px">from unit ' + (Ls.unit - 1) + '</span><div style="margin:6px 0">' + cslEsc(pq[0]) + '</div><div style="display:flex;flex-wrap:wrap;gap:6px">' +
o.map(function (a) { var on = pk === a; return '<button data-csl="wu" data-k="' + cslEsc(key) + '" data-o="' + cslEsc(a) + '" data-r="' + (a === pq[1] ? 1 : 0) + '" style="padding:6px 10px;border-radius:16px;border:1px solid ' + (on ? col : "#C8CCD2") + ';background:' + (on ? (a === pq[1] ? "#DFF2E2" : "#F8E0DC") : "#FFF") + ';color:#1E2228">' + cslEsc(a) + (on ? (a === pq[1] ? " ✓" : " ✗") : "") + '</button>'; }).join("") + '</div></div>';
}
}
else if (part <= n) {
var L = X.lessons[part - 1];
if (!L)
return "";
var Q = (L.check || []).slice(0, 4), M = W.m[key] || {}, sel = Ls.cslSel || null, rnd = cslRng(key);
if (Q.length >= 2) {
var right = cslShuf(Q.map(function (q, i) { return i; }), rnd), done = Object.keys(M).length === Q.length;
h += '<div style="background:#EEF4FB;border-radius:8px;padding:10px 12px;margin-bottom:10px"><b>🧩 Match-up</b> <span style="color:#5A6068;font-size:13px">Tap a question, then its answer.</span>' +
'<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px">' +
'<div style="display:flex;flex-direction:column;gap:6px">' + Q.map(function (q, i) {
var ok = M[i], on = sel === i;
return '<button data-csl="mq" data-k="' + cslEsc(key) + '" data-i="' + i + '" style="text-align:left;padding:7px 9px;border-radius:6px;border:2px solid ' + (ok ? "#3A8A5A" : on ? col : "#C8D4E4") + ';background:' + (ok ? "#DFF2E2" : on ? "#FFF" : "#FFF") + ';color:#1E2228;font-size:13.5px">' + cslEsc(q[0]) + '</button>';
}).join("") + '</div>' +
'<div style="display:flex;flex-direction:column;gap:6px">' + right.map(function (i) {
var ok = M[i];
return '<button data-csl="ma" data-k="' + cslEsc(key) + '" data-i="' + i + '" style="text-align:left;padding:7px 9px;border-radius:6px;border:2px solid ' + (ok ? "#3A8A5A" : "#C8D4E4") + ';background:' + (ok ? "#DFF2E2" : "#FFF") + ';color:#1E2228;font-size:13.5px">' + cslEsc(Q[i][1]) + '</button>';
}).join("") + '</div></div>' +
(done ? '<div style="color:#2A6A3A;margin-top:6px"><b>All matched!</b></div>' : (Ls.cslMiss ? '<div style="color:#B03A2A;margin-top:6px">Not that one. Try again.</div>' : '')) + '</div>';
}
var G = cslGapMake(L, key), gp = W.g[key];
if (G) {
var blank = G.s.replace(new RegExp("\\b" + G.w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b"), "_____");
h += '<div style="background:#F2F8EE;border-radius:8px;padding:10px 12px;margin-bottom:10px"><b>✏️ Fill the gap</b><div style="margin:6px 0;font-size:15px">' + cslEsc(gp === G.w ? G.s : blank) + '</div><div style="display:flex;flex-wrap:wrap;gap:6px">' +
G.o.map(function (w) { var on = gp === w; return '<button data-csl="gap" data-k="' + cslEsc(key) + '" data-o="' + cslEsc(w) + '" data-r="' + (w === G.w ? 1 : 0) + '" style="padding:6px 12px;border-radius:16px;border:1px solid ' + (on ? col : "#C8CCD2") + ';background:' + (on ? (w === G.w ? "#DFF2E2" : "#F8E0DC") : "#FFF") + ';color:#1E2228">' + cslEsc(w) + (on ? (w === G.w ? " ✓" : " ✗") : "") + '</button>'; }).join("") + '</div></div>';
}
h += '<div style="background:#FBF1E6;border-radius:8px;padding:10px 12px"><b>🎟 My exit ticket</b> <span style="color:#5A6068;font-size:13px">One thing I learned in this lesson, in my own words.</span>' +
'<textarea id="csl-xt" data-k="' + cslEsc(key) + '" rows="2" maxlength="400" style="width:100%;margin-top:6px;font:14px var(--sans);padding:6px;border:1px solid #D8C8B0;border-radius:5px">' + cslEsc(W.tk[key] || "") + '</textarea>' +
'<button data-csl="xt" data-k="' + cslEsc(key) + '" style="' + cslBtn("#C8783A", 1) + '">Keep it</button> <span id="csl-xt-msg" style="font-size:13px"></span></div>';
}
h += '<div style="margin-top:10px;font-size:13px;color:#5A6068">My sticker chart for this course: ' + (mine.length ? '<span style="font-size:20px;letter-spacing:2px">' + mine.map(function (k) { return W.st[k]; }).join("") + '</span>' : 'none yet: finish a lesson\'s match-up and gap to earn one') + '</div></div>';
return h;
},
function (b) {
var Ls = EDU.lesson;
if (!Ls || Ls.cslSel == null) {
cslSay("Tap a question first, then its answer.");
return;
}
var k = b.getAttribute("data-k"), i = +b.getAttribute("data-i"), W = cslWork();
if (i === Ls.cslSel) {
(W.m[k] || (W.m[k] = {}))[i] = 1;
Ls.cslSel = null;
Ls.cslMiss = false;
cslSave();
cslMaybeSticker(k);
}
else
Ls.cslMiss = true;
cslLessonRepaint();
},
function (sub, el, i) {
var key = "cslfz|" + sub + "|" + (el ? 1 : 0) + "|" + i;
return ilfCanvasTex(key, 1024, 72, function (g, w, h) {
var cols = ["#E85A4A", "#F2A33A", "#F2D24A", "#5AB86A", "#4A9AE0", "#8A6AD8"];
if (el && i === 0) {
g.fillStyle = "#FFFDF4";
g.fillRect(0, 0, w, h);
var L = sub === "lang" ? "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ", n = L.length;
for (var k = 0; k < n; k++) {
var x = k * w / n;
g.fillStyle = cols[k % 6];
g.fillRect(x + 2, 3, w / n - 4, h - 6);
g.fillStyle = "#FFF";
g.font = "bold " + (n > 26 ? 20 : 22) + "px 'Comic Sans MS','Segoe Print',sans-serif";
g.textAlign = "center";
g.textBaseline = "middle";
g.fillText(L[k] + L[k].toLowerCase(), x + w / (2 * n), h / 2 + 1);
}
return;
}
if (el && i === 1) {
g.fillStyle = "#FFFDF4";
g.fillRect(0, 0, w, h);
for (var n = 0; n <= 20; n++) {
var x2 = 12 + n * (w - 24) / 20;
g.fillStyle = cols[n % 6];
g.beginPath();
g.arc(x2, h / 2, 20, 0, Math.PI * 2);
g.fill();
g.fillStyle = "#FFF";
g.font = "bold 22px sans-serif";
g.textAlign = "center";
g.textBaseline = "middle";
g.fillText(String(n), x2, h / 2 + 1);
}
return;
}
var bg = ["#1E3A6A", "#6A1E3A", "#1E5A3A"][i % 3];
g.fillStyle = bg;
g.fillRect(0, 0, w, h);
for (var s = 0; s < w; s += w / 6) {
g.fillStyle = cols[(s / (w / 6)) % 6 | 0];
g.fillRect(s, 0, w / 6, 5);
g.fillRect(s, h - 5, w / 6, 5);
}
g.fillStyle = "#FFF8E0";
g.font = "bold 30px Georgia,serif";
g.textAlign = "center";
g.textBaseline = "middle";
var t = (CSL_FRIEZE[sub] || CSL_FRIEZE.ela)[i % 3];
var fs = 30;
while (g.measureText(t).width > w - 30 && fs > 14) {
fs -= 2;
g.font = "bold " + fs + "px Georgia,serif";
}
g.fillText(t, w / 2, h / 2 + 1);
});
},
function (kind) {
var P = {
rules: ["Our Class Rules", "#E85A4A", ["1. Be kind", "2. Listen when others talk", "3. Raise your hand", "4. Try your best", "5. Take care of our room"]],
jobs: ["Classroom Jobs", "#4A9AE0", ["Line leader ★", "Door holder ★", "Plant waterer ★", "Board eraser ★", "Book helper ★"]],
goals: ["Our Class Goals", "#5AB86A", ["Come ready to learn", "Ask questions", "Help each other", "Hand work in on time", "Respect everyone"]],
grow: ["Mistakes help us grow", "#8A6AD8", ["I can't do it... YET", "Every expert was", "once a beginner", "Keep going!", ""]],
weather: ["Today's Weather", "#F2A33A", ["☀ sunny   ☁ cloudy", "☂ rainy   ❄ snowy", "Today it is: ______", "", ""]],
words: ["Word Wall", "#F2D24A", ["the · and · was · said", "because · friend · they", "could · would · there", "Spell it, use it!", ""]],
es_num: ["Los números", "#E85A4A", ["1 uno    6 seis", "2 dos    7 siete", "3 tres   8 ocho", "4 cuatro 9 nueve", "5 cinco 10 diez"]],
es_dias: ["Los días", "#4A9AE0", ["lunes · martes", "miércoles · jueves", "viernes", "sábado · domingo", "¿Qué día es hoy?"]],
es_magia: ["Palabras mágicas", "#8A6AD8", ["por favor", "gracias", "de nada", "perdón", "lo siento"]],
es_sentir: ["¿Cómo estás?", "#F2A33A", ["😀 feliz", "😢 triste", "😴 cansado", "😠 enojado", "😃 ¡muy bien!"]],
es_meses: ["Los meses", "#5AB86A", ["enero · febrero · marzo", "abril · mayo · junio", "julio · agosto", "septiembre · octubre", "noviembre · diciembre"]],
es_verbos: ["Verbos: -ar", "#E85A4A", ["yo hablo", "tú hablas", "él/ella habla", "nosotros hablamos", "ellos hablan"]],
es_preg: ["Las preguntas", "#4A9AE0", ["¿Qué? what", "¿Quién? who", "¿Dónde? where", "¿Cuándo? when", "¿Por qué? why"]],
es_clase: ["En la clase", "#F2D24A", ["Escuchen · listen", "Miren · look", "Repitan · repeat", "Siéntense · sit down", "¿Cómo se dice...?"]],
cs_debug: ["Debugging", "#E85A4A", ["1. What did I want?", "2. What happened?", "3. Find the step", "4. Change one thing", "5. Test again!"]],
cs_safe: ["Online Safety", "#4A9AE0", ["Ask a grown-up first", "Keep passwords secret", "Never share address", "Be kind online", "Tell if it feels wrong"]],
cs_keys: ["Home Row", "#5AB86A", ["Left:  A  S  D  F", "Right: J  K  L  ;", "Bumps on F and J", "Sit up straight", "Eyes on the screen"]],
cs_algo: ["Algorithm", "#F2A33A", ["= steps in order", "1. First", "2. Next", "3. Then", "4. Last"]],
cs_loop: ["Loops & Ifs", "#8A6AD8", ["repeat 4 { move }", "forever { check }", "if (raining) {", "   umbrella", "} else { sun hat }"]],
cs_var: ["Variables", "#F2D24A", ["score = 0", "score = score + 1", "lives = 3", "name = \"Ada\"", "A box with a name"]]
}[kind];
return ilfCanvasTex("cslps|" + kind, 256, 320, function (g, w, h) {
g.fillStyle = "#FFFDF6";
g.fillRect(0, 0, w, h);
g.fillStyle = P[1];
g.fillRect(0, 0, w, 64);
g.fillRect(0, h - 10, w, 10);
g.fillStyle = "#FFF";
g.font = "bold 28px 'Comic Sans MS','Segoe Print',sans-serif";
g.textAlign = "center";
g.textBaseline = "middle";
g.fillText(P[0], w / 2, 33);
g.fillStyle = "#2A2A30";
g.font = "21px 'Comic Sans MS','Segoe Print',sans-serif";
g.textAlign = "left";
P[2].forEach(function (l, i) { g.fillText(l, 16, 96 + i * 44); });
for (var k = 0; k < 5; k++) {
g.fillStyle = ["#E85A4A", "#F2A33A", "#5AB86A", "#4A9AE0", "#8A6AD8"][k];
g.beginPath();
g.arc(w - 24 - k * 14, h - 28, 5, 0, Math.PI * 2);
g.fill();
}
});
},
function (k) {
var P = CSL_WIDE[k];
return ilfCanvasTex("cslwd|" + k, 400, 300, function (g, w, h) {
g.fillStyle = "#FFFDF6";
g.fillRect(0, 0, w, h);
g.fillStyle = P[1];
g.fillRect(0, 0, w, 58);
g.fillRect(0, h - 10, w, 10);
g.fillStyle = "#FFF";
g.textAlign = "center";
g.textBaseline = "middle";
var fs = 28;
g.font = "bold " + fs + "px 'Comic Sans MS','Segoe Print',sans-serif";
while (g.measureText(P[0]).width > w - 20 && fs > 14) {
fs -= 2;
g.font = "bold " + fs + "px 'Comic Sans MS','Segoe Print',sans-serif";
}
g.fillText(P[0], w / 2, 30);
if (k === "csl-es-colores") {
var C = [["rojo", "#E04A3A"], ["azul", "#3A7AD8"], ["amarillo", "#F2D03A"], ["verde", "#4AAA5A"], ["naranja", "#F28A2A"], ["morado", "#8A5AC8"], ["rosa", "#F28AB8"], ["café", "#8A5A3A"], ["negro", "#202020"], ["blanco", "#FFFFFF"]];
C.forEach(function (c, i) {
var x = 20 + (i % 5) * 76, y = 78 + ((i / 5) | 0) * 104;
g.fillStyle = c[1];
g.fillRect(x, y, 60, 52);
g.strokeStyle = "#888";
g.lineWidth = 1;
g.strokeRect(x, y, 60, 52);
g.fillStyle = "#2A2A30";
g.font = "bold 17px 'Comic Sans MS',sans-serif";
g.fillText(c[0], x + 30, y + 70);
});
return;
}
if (k === "csl-cs-ipo") {
var B = [["INPUT", "keyboard · mouse", "#4A9AE0"], ["PROCESS", "the processor", "#F2A33A"], ["OUTPUT", "screen · sound", "#5AB86A"]];
B.forEach(function (b, i) {
var x = 16 + i * 130;
g.fillStyle = b[2];
g.fillRect(x, 96, 108, 90);
g.fillStyle = "#FFF";
g.font = "bold 20px sans-serif";
g.fillText(b[0], x + 54, 126);
g.font = "13px sans-serif";
g.fillText(b[1], x + 54, 160);
if (i < 2) {
g.fillStyle = "#2A2A30";
g.font = "bold 26px sans-serif";
g.fillText("→", x + 119, 141);
}
});
g.fillStyle = "#2A2A30";
g.font = "bold 18px sans-serif";
g.fillText("+ STORAGE keeps your files", w / 2, 226);
g.font = "15px sans-serif";
g.fillText("Computers follow the steps people write", w / 2, 256);
return;
}
g.fillStyle = "#2A2A30";
var lh = P[2].length > 3 ? 50 : 58;
P[2].forEach(function (l, i) { var f = P[2].length > 3 ? 28 : 20; g.font = f + "px 'Comic Sans MS',sans-serif"; while (g.measureText(l).width > w - 24 && f > 11) {
f--;
g.font = f + "px 'Comic Sans MS',sans-serif";
} g.fillText(l, w / 2, (P[2].length > 3 ? 92 : 104) + i * lh); });
});
},
function (K, r) {
var gi = EDU_GRADES.indexOf(r.grade), el = gi < 6, small = gi < 3, sub = r.subj || "ela", lite = ilfLite();
var cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2, ow = r.side ? r.x1 : r.x0, inw = r.side ? -1 : 1;
var scol = EDU_SCOL[sub] || 0x5A6A7A;
K.plane(8.6, 0.92, ilfM(cslMix(scol, 0.45)), cx, 0.47, r.z1 - 0.108, Math.PI);
K.boxc(8.6, 0.05, 0.03, ilfM(0xF8F6EE), cx, 0.95, r.z1 - 0.115);
K.plane(8.4, 0.58, ilfTexMat(cslFriezeTex(sub, el, el ? 0 : (r.ci || 0) % 3)), cx, 3.08, r.z0 + 0.112, 0);
if (el)
K.plane(8.4, 0.58, ilfTexMat(cslFriezeTex(sub, true, 1)), cx, 3.08, r.z1 - 0.112, Math.PI);
else
K.plane(8.4, 0.58, ilfTexMat(cslFriezeTex(sub, false, ((r.ci || 0) + 1) % 3)), cx, 3.08, r.z1 - 0.112, Math.PI);
var pa = el ? "rules" : "goals", pb = el ? (sub === "ela" ? "words" : small ? "weather" : "jobs") : "grow", px = null;
if (sub === "lang")
px = el ? (small ? ["es_num", "es_magia", "es_sentir", "es_dias"] : ["es_num", "es_dias", "es_preg", "es_clase"]) : ["es_meses", "es_verbos", "es_preg", "es_clase"];
if (sub === "cs")
px = el ? (small ? ["cs_algo", "cs_safe", "cs_keys", "cs_debug"] : ["cs_algo", "cs_loop", "cs_debug", "cs_safe"]) : ["cs_var", "cs_loop", "cs_debug", "cs_safe"];
if (px) {
pa = px[0];
pb = px[3];
K.plane(0.7, 0.88, ilfTexMat(cslPosterTex(px[1])), cx - 2.45, 2.2, r.z1 - 0.115, Math.PI);
K.plane(0.7, 0.88, ilfTexMat(cslPosterTex(px[2])), cx - 1.3, 2.2, r.z1 - 0.115, Math.PI);
}
var pw = px ? 0.7 : 0.62;
K.plane(pw, pw * 1.26, ilfTexMat(cslPosterTex(pa)), cx - 3.6, px ? 2.2 : 2.25, r.z1 - 0.115, Math.PI);
K.plane(pw, pw * 1.26, ilfTexMat(cslPosterTex(pb)), cx + 3.6, px ? 2.2 : 2.25, r.z1 - 0.115, Math.PI);
var cc = CSL_RAIN[((r.ci || 0) + gi) % 6], cm = ilfM(cslMix(cc, 0.15)), wx = ow + inw * 0.17;
K.box(0.06, 0.32, 6.7, ilfM(cslMix(cc, 0.05)), wx, 2.52, cz);
[-1, 1].forEach(function (sd) { K.box(0.05, 1.62, 0.55, cm, wx, 0.92, cz + sd * 3.35); K.box(0.06, 0.06, 0.62, ilfM(0xC9A040), wx, 0.92, cz + sd * 3.35); });
if (el) {
for (var i = 0; i < 6; i++)
for (var j = 0; j < 3; j++)
K.box(0.56, 0.012, 0.5, ilfM(CSL_RAIN[(i + j) % 6]), cx - 1.5 + i * 0.6, 0.006, r.z0 + 1.55 + j * 0.54);
K.box(3.72, 0.008, 1.7, ilfM(0xF4F0E4), cx, 0.002, r.z0 + 2.09);
if (!lite) {
if (sub !== "sci" && sub !== "art" && sub !== "mus" && sub !== "pe") {
[0, 1].forEach(function (b) {
var bx = ow + inw * (0.75 + b * 0.85), bz = r.z1 - 1.15 - b * 0.2;
K.sph(0.36, ilfM(CSL_RAIN[(b * 3 + gi) % 6]), bx, 0.2, bz, 1.1, 0.62, 1.1, 12);
K.sph(0.22, ilfM(cslMix(CSL_RAIN[(b * 3 + gi) % 6], 0.25)), bx - inw * 0.12, 0.42, bz, 1, 0.8, 1, 10);
});
}
[-2.4, 0, 2.4].forEach(function (o, k) {
var lx = cx + o, lz = cz + (k === 1 ? 0.6 : -0.4);
K.boxc(0.006, 0.5, 0.006, ilfM(0xF4F4F0), lx, 3.32, lz);
K.sph(0.2, ilfM(CSL_RAIN[(k * 2 + gi) % 6]), lx, 2.95, lz, 1, 0.9, 1, 10);
K.boxc(0.3, 0.02, 0.02, ilfM(0xF4F4F0), lx, 2.95, lz);
});
for (var s2 = 0; s2 < 5; s2++) {
var sx = cx - 3 + s2 * 1.5, sz = r.z0 + 2.6 + (s2 % 2) * 0.8;
K.boxc(0.004, 0.4, 0.004, ilfM(0xF4F4F0), sx, 3.38, sz);
K.boxc(0.16, 0.16, 0.01, ilfM(0xF6D84A, { glow: 1 }), sx, 3.12, sz, 0, 0, Math.PI / 4);
}
}
}
else if (!lite) {
for (var p = 0; p < 12; p++)
K.geo(ilfCone(3), ilfM(p % 2 ? scol : cc), cx - 3.9 + p * 0.71, 2.72, r.z1 - 0.14, 0.24, 0.26, 0.02, 0, Math.PI, 0);
}
},
function () {
var now = Date.now();
if (now - CSL_BELL.at < 1000)
return;
CSL_BELL.at = now;
var g = typeof edrStore === "function" && edrStore().grade;
if (!g || typeof edrDay !== "function")
return;
var h = typeof cityHourNow === "function" ? cityHourNow() : 12, dn = edrDayN(), D = edrDay(g, dn), idx = -1;
for (var i = 0; i < D.length; i++)
if (h >= D[i].h && h < D[i].h + D[i].m / 60) {
idx = i;
break;
}
var key = dn + "|" + idx, B = CSL_BELL;
if (key !== B.key) {
if (B.slot && B.slot.kind === "class" && B.slot.c && B.seen && !B.judged)
cslPunctAdd("miss");
var first = !B.key;
B.key = key;
B.slot = idx >= 0 ? D[idx] : null;
B.judged = false;
B.seen = false;
B.warned = false;
var S = B.slot;
if (S && !first) {
if (S.kind === "pass" && S.next && S.next.c) {
var rn = edrRoomNo(S.next.c[0]);
cslChime();
setStatus("🔔 <b>Walk to " + (rn ? "Room " + rn : "your next class") + "</b>: " + cslEsc(S.next.c[3]) + ". You have " + S.m + " minutes.");
}
else if (S.kind === "class" && S.c) {
var r2 = edrRoomNo(S.c[0]);
cslChime();
setStatus("🔔 <b>The bell.</b> " + (S.block ? "Block " : "Period ") + S.n + ": " + cslEsc(S.c[3]) + (r2 ? " in Room " + r2 : "") + ".");
}
}
}
var S2 = B.slot;
if (!S2 || S2.kind !== "class" || !S2.c || B.judged)
return;
B.seen = true;
var w = typeof eduWhere === "function" ? eduWhere() : null, mins = (h - S2.h) * 60, rn2 = edrRoomNo(S2.c[0]);
if (w && w.id === S2.c[0]) {
B.judged = true;
if (mins <= 1) {
cslPunctAdd("on");
setStatus("✅ <b>On time</b> for " + cslEsc(S2.c[3]) + ".");
}
else {
cslPunctAdd("late");
setStatus("⏰ <b>Late</b> for " + cslEsc(S2.c[3]) + " by " + Math.round(mins) + " minutes. The class marks it.");
}
return;
}
if (mins > 1 && !B.warned) {
B.warned = true;
setStatus("⏰ <b>You are late.</b> " + cslEsc(S2.c[3]) + " has started" + (rn2 ? " in Room " + rn2 : "") + ".");
}
},
function (force) {
if (!cslIn())
return Promise.resolve(null);
if (!force && CSL.hw.o && Date.now() - CSL.hw.at < 20000)
return Promise.resolve(CSL.hw.o);
CSL.hw.at = Date.now();
return cslRpc("school_homework_mine", {}).then(function (o) { CSL.hw.o = o; return o; }, function (e) { CSL.hw.o = { ok: false, say: cslErr(e) }; return CSL.hw.o; });
},
function (d) {
if (!d)
return "";
var t = new Date(d + "T23:59:00"), days = Math.round((t - Date.now()) / 86400000);
var s = t.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
return days < 0 ? '<span style="color:#B03A2A">was due ' + s + '</span>' : days === 0 ? '<b style="color:#C8783A">due today</b>' : 'due ' + s;
},
function () {
if (!cslIn()) {
cslModal("📝 Homework", '<p>Sign in first. Pupils sign in with 🎒 Pupil sign-in and the card their teacher gave them.</p>', { k: "hw", col: "#C8783A" });
return;
}
cslModal("📝 Homework", '<p style="color:#5A6068">Loading…</p>', { k: "hw", w: 760, col: "#C8783A" });
Promise.all([cslHwLoad(true), cslMine(false)]).then(cslHwPaint);
},
function () {
var body = document.getElementById("csl-body");
if (!body || cslOpenK() !== "hw")
return;
if (body.querySelector("input:focus,textarea:focus,select:focus"))
return;
var o = CSL.hw.o, m = CSL.mine || {}, h = '';
if (!o || !o.ok) {
body.innerHTML = '<p>' + cslEsc((o && o.say) || "Homework could not be reached.") + '</p>';
return;
}
var P = o.pupil || [], T = o.teach || [], C = (m.classes || []).filter(function (c) { return c.mine; });
if (P.length || !C.length) {
h += '<div style="font:600 17px Georgia,serif;margin:6px 0 4px">My homework</div>';
if (!P.length)
h += '<p style="color:#5A6068;font-size:14px">No homework right now. When your teacher sets some, it shows here.</p>';
P.forEach(function (w) {
var done = w.mark === "done";
h += '<div style="border:1px solid #D8D2C4;border-left:5px solid ' + (done ? "#3A8A5A" : w.at ? "#2E5A9A" : "#C8783A") + ';border-radius:6px;padding:8px 12px;margin:8px 0;background:#FFFDF6">' +
'<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><b style="font-size:15.5px">' + cslEsc(w.title) + '</b><span style="font-size:13px">' + cslHwDue(w.due) + '</span></div>' +
'<div style="font-size:13px;color:#5A6068">' + cslEsc(w.class || "") + (w.course ? ' · ' + cslEsc(w.course) : '') + (w.unit ? ' · Unit ' + w.unit : '') + '</div>' +
(w.body ? '<div style="white-space:pre-wrap;margin:6px 0;font-size:14.5px">' + cslEsc(w.body) + '</div>' : '') +
(w.note ? '<div style="background:#F0F4FA;border-radius:5px;padding:5px 8px;font-size:13.5px;margin:4px 0">Teacher: ' + cslEsc(w.note) + '</div>' : '') +
(done ? '<div style="font-size:14px">' + cslHwMark("done") + '. Your answer: <i>' + cslEsc(w.answer || "") + '</i></div>' :
'<textarea id="csl-hwa-' + w.id + '" rows="3" placeholder="Write your answer here" style="width:100%;box-sizing:border-box;padding:7px;border:1px solid #A8B0BA;border-radius:5px;font:15px/1.4 var(--sans,system-ui)">' + cslEsc(w.answer || "") + '</textarea>' +
'<div style="display:flex;gap:8px;align-items:center;margin-top:4px;flex-wrap:wrap">' +
(w.course && w.unit ? '<button data-csl="hw-study" data-c="' + cslEsc(w.course) + '" data-u="' + w.unit + '" style="' + cslBtnO("#2E5A9A") + '">📖 Study this unit</button>' : '') +
'<button data-csl="hw-hand" data-id="' + w.id + '" style="' + cslBtn("#3A8A5A", 1) + '">' + (w.at ? 'Hand in again' : 'Hand it in') + '</button>' +
'<span style="font-size:13px">' + (w.at ? 'Handed in ' + new Date(w.at).toLocaleString() + ' ' + cslHwMark(w.mark) : '') + '</span><span id="csl-hwm-' + w.id + '" style="font-size:13px"></span></div>') +
'</div>';
});
}
if (C.length) {
var r = CSL.room, rc = r && r.kind === "class" ? r : null;
h += '<div style="font:600 17px Georgia,serif;margin:14px 0 4px">Set homework</div>' +
'<div style="background:#FBF4E8;border-radius:6px;padding:10px 12px">' +
'<div style="display:flex;gap:6px;flex-wrap:wrap"><select id="csl-hw-c" style="padding:6px;border:1px solid #A8B0BA;border-radius:5px">' + C.map(function (c) { return '<option value="' + cslEsc(c.code) + '">' + cslEsc(c.name) + '</option>'; }).join("") + '</select>' +
'<input id="csl-hw-t" placeholder="Title, e.g. Read pages 12-15" style="flex:1 1 240px;padding:6px 8px;border:1px solid #A8B0BA;border-radius:5px"></div>' +
'<textarea id="csl-hw-b" rows="3" placeholder="What to do. e.g. Read the Unit 3 lesson again, then write three sentences about what a loop is." style="width:100%;box-sizing:border-box;margin-top:6px;padding:7px;border:1px solid #A8B0BA;border-radius:5px;font:14.5px/1.4 var(--sans,system-ui)"></textarea>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:6px">' +
'<input id="csl-hw-co" value="' + cslEsc(rc ? rc.name : "") + '" placeholder="Course (optional)" style="flex:1 1 180px;padding:6px 8px;border:1px solid #A8B0BA;border-radius:5px">' +
'<select id="csl-hw-u" style="padding:6px;border:1px solid #A8B0BA;border-radius:5px"><option value="">no unit</option>' + [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (u) { return '<option value="' + u + '">Unit ' + u + '</option>'; }).join("") + '</select>' +
'<label style="font-size:13.5px">Due <input id="csl-hw-d" type="date" value="' + cslHwTomorrow() + '" style="padding:5px;border:1px solid #A8B0BA;border-radius:5px"></label>' +
'<button data-csl="hw-set" style="' + cslBtn("#C8783A") + '">📝 Set homework</button></div><div id="csl-hw-msg" style="font-size:13.5px;margin-top:4px"></div></div>';
h += '<div style="font:600 17px Georgia,serif;margin:14px 0 4px">Homework I set</div>';
if (!T.length)
h += '<p style="color:#5A6068;font-size:14px">None yet.</p>';
T.forEach(function (w) {
var H = w.handed || [], M = w.missing || [], op = CSL.hw.open[w.id];
h += '<div style="border:1px solid #C8CCD2;border-radius:6px;padding:8px 12px;margin:8px 0;' + (w.closed ? 'opacity:.6' : '') + '">' +
'<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><b>' + cslEsc(w.title) + '</b><span style="font-size:13px">' + cslEsc(w.class || "") + ' · ' + cslHwDue(w.due) + (w.closed ? ' · closed' : '') + '</span></div>' +
'<div style="font-size:13.5px;margin:3px 0">📥 <b>' + H.length + '</b> of ' + (w.pupils || 0) + ' handed in' + (M.length ? ' · <span style="color:#B03A2A">not yet: ' + M.map(cslEsc).join(", ") + '</span>' : '') + '</div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap"><button data-csl="hw-open" data-id="' + w.id + '" style="' + cslBtnO("#2E5A9A") + '">' + (op ? 'Hide answers' : 'Read answers') + '</button>' +
'<button data-csl="hw-close" data-id="' + w.id + '" data-v="' + (w.closed ? 0 : 1) + '" style="' + cslBtnO("#5A6068") + '">' + (w.closed ? 'Open it again' : 'Close it') + '</button></div>';
if (op) {
if (w.body)
h += '<div style="white-space:pre-wrap;font-size:13.5px;color:#3A4048;margin:6px 0">' + cslEsc(w.body) + '</div>';
if (!H.length)
h += '<div style="font-size:13.5px;color:#5A6068;margin-top:6px">Nothing handed in yet.</div>';
H.forEach(function (a) {
h += '<div style="background:#F6F4EC;border-radius:5px;padding:6px 9px;margin:6px 0;font-size:14px"><b>' + cslEsc(a.name) + '</b> <span style="font-size:12.5px;color:#5A6068">' + new Date(a.at).toLocaleString() + '</span> ' + cslHwMark(a.mark) +
'<div style="white-space:pre-wrap;margin:3px 0">' + cslEsc(a.answer || "") + '</div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center"><input id="csl-hwn-' + w.id + '-' + a.user + '" value="' + cslEsc(a.note || "") + '" placeholder="A note for them (optional)" style="flex:1 1 200px;padding:5px 7px;border:1px solid #A8B0BA;border-radius:5px">' +
'<button data-csl="hw-mark" data-id="' + w.id + '" data-u="' + a.user + '" data-m="done" style="' + cslBtn("#3A8A5A", 1) + '">✅ Done</button>' +
'<button data-csl="hw-mark" data-id="' + w.id + '" data-u="' + a.user + '" data-m="redo" style="' + cslBtn("#B03A2A", 1) + '">↩ Do it again</button></div></div>';
});
}
h += '</div>';
});
}
body.innerHTML = h;
},
function () {
var v = function (id) { var e = document.getElementById(id); return e ? String(e.value || "").trim() : ""; };
var t = v("csl-hw-t");
if (!t) {
cslMsg("csl-hw-msg", "Give the homework a title.", true);
return;
}
cslMsg("csl-hw-msg", "Setting…");
cslRpc("school_homework_set", { p_circle: v("csl-hw-c"), p_title: t.slice(0, 140), p_body: v("csl-hw-b").slice(0, 2000), p_course: v("csl-hw-co").slice(0, 120) || null,
p_unit: v("csl-hw-u") ? +v("csl-hw-u") : null, p_due: v("csl-hw-d") || null }).then(function (o) {
if (!o || !o.ok) {
cslMsg("csl-hw-msg", cslEsc((o && o.say) || "No."), true);
return;
}
cslHwAgain(o.say || "Set. Your pupils see it on their Homework card.");
}).catch(function (e) { cslMsg("csl-hw-msg", cslEsc(cslErr(e)), true); });
},
function (b) {
var id = +b.getAttribute("data-id"), ta = document.getElementById("csl-hwa-" + id), a = ta ? String(ta.value || "").trim() : "";
if (!a) {
cslMsg("csl-hwm-" + id, "Write your answer first.", true);
return;
}
cslMsg("csl-hwm-" + id, "Handing in…");
cslRpc("school_homework_hand", { p_id: id, p_answer: a.slice(0, 4000) }).then(function (o) {
if (!o || !o.ok) {
cslMsg("csl-hwm-" + id, cslEsc((o && o.say) || "No."), true);
return;
}
cslSay("📝 <b>Handed in.</b> Your teacher can read it now.");
if (typeof cslSticker === "function")
cslSticker("hw." + id);
cslHwAgain();
}).catch(function (e) { cslMsg("csl-hwm-" + id, cslEsc(cslErr(e)), true); });
},
function (b) {
var id = b.getAttribute("data-id"), u = b.getAttribute("data-u"), n = document.getElementById("csl-hwn-" + id + "-" + u);
cslRpc("school_homework_mark", { p_id: +id, p_user: u, p_mark: b.getAttribute("data-m"), p_note: n ? String(n.value || "").trim().slice(0, 500) || null : null })
.then(function (o) { if (o && o.ok === false) {
cslSay(cslEsc(o.say || "No."));
return;
} cslHwAgain(); }).catch(function (e) { cslSay(cslEsc(cslErr(e))); });
},
function (b) {
var name = String(b.getAttribute("data-c") || "").toLowerCase(), u = +b.getAttribute("data-u"), C = null;
try {
EDU_COURSES.forEach(function (c) { if (!C && String(c[3]).toLowerCase() === name)
C = c; });
}
catch (e) { }
if (!C || typeof eduOpen !== "function") {
cslSay("Open the lesson book for " + cslEsc(b.getAttribute("data-c")) + " at Unit " + u + ".");
return;
}
cslClose();
eduOpen(C[0]);
if (EDU.lesson) {
EDU.lesson.unit = Math.max(1, Math.min(10, u));
eduBegin();
eduLessonPaint();
}
},
function (g) {
if (typeof EDU === "undefined")
return;
var mine = typeof edrStore === "function" && edrStore().grade;
g = g || mine || "K";
var h = '<div style="font:600 20px Georgia,serif;margin:6px 0 2px">📚 The textbook bay</div>' +
'<div style="color:#5A6068;font-size:13.5px">A textbook for every class in the school. Read it here, or print it. Under each one are the free textbooks and the whole books that class uses.</div>' +
'<div style="display:flex;gap:4px;flex-wrap:wrap;margin:10px 0">' + EDU_GRADES.map(function (x) { return '<button data-csl="tb-g" data-g="' + x + '" style="' + (x === g ? cslBtn("#6A4A2A", 1) : cslBtnO("#6A4A2A")) + '">' + (x === "K" ? "K" : x) + '</button>'; }).join("") + '</div>' +
'<div style="font:600 16px Georgia,serif;margin:4px 0">' + cslEsc(eduGradeName(g)) + (g === mine ? ' · your grade' : '') + '</div>';
EDU_COURSES.filter(function (c) { return c[1] === g; }).forEach(function (c) {
var col = CSL_TB_COL[c[2]] || "#5A6068", op = (typeof EDU_OPEN !== "undefined" && EDU_OPEN[c[0]]) || [], bk = ((typeof EDU_BOOKS !== "undefined" && EDU_BOOKS[c[2]]) || {})[g] || [];
h += '<div style="display:flex;gap:10px;align-items:stretch;margin:8px 0;border:1px solid #E0DACC;border-radius:6px;background:#FFFDF8;overflow:hidden">' +
'<div style="width:16px;background:' + col + '"></div><div style="flex:1;padding:7px 10px 8px 0">' +
'<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center"><b style="font-size:15px">' + cslEsc(c[3]) + '</b>' +
'<span><button data-csl="tb-read" data-c="' + cslEsc(c[0]) + '" style="' + cslBtn(col, 1) + '">📖 Read the textbook</button> <button data-csl="tb-print" data-c="' + cslEsc(c[0]) + '" style="' + cslBtnO(col) + ';padding:3px 8px;font-size:12.5px">🖨 Print</button></span></div>' +
(op.length ? '<div style="font-size:13px;margin-top:3px">Free textbooks: ' + op.map(function (o) { return '<a target="_blank" rel="noopener noreferrer" href="' + cslEsc(o[2]) + '" style="color:' + col + ';font-weight:600">' + cslEsc(o[0]) + '</a> <span style="color:#7A8088">(' + cslEsc(o[1]) + ', ' + cslEsc(o[3]) + ')</span>'; }).join(" · ") + '</div>' : '') +
(bk.length ? '<div style="font-size:13px;margin-top:3px">Whole books: ' + bk.map(function (b) { return '<a href="#" data-csl="tb-book" data-n="' + b[0] + '" style="color:#6A4A2A;font-weight:600">' + cslEsc(b[1]) + '</a>'; }).join(" · ") + '</div>' : '') +
'</div></div>';
});
h += '<p style="color:#5A6068;font-size:12.5px;margin-top:10px">The class textbooks are the school\'s own. The free textbooks carry open licences (CC BY or CC BY-SA) and open on their own sites; the whole books are in the public domain (Project Gutenberg) and open right here.</p>';
EDU.lesson = { cid: "gK-ela", g: "K", subj: "ela", title: "The textbook bay", unit: 1, tab: "html", picks: {}, html: h };
eduLessonPaintHtml();
},
function (B, print) {
var c = B.c, R = B.R || {}, X = B.X || {}, U = R.units || [], col = CSL_TB_COL[c[2]] || "#5A6068", h = '';
var P = function (t) { return '<p style="margin:6px 0;text-indent:' + (print ? '1.2em' : '0') + '">' + cslEsc(t) + '</p>'; };
h += '<div style="background:' + col + ';color:#FFF;border-radius:6px;padding:26px 18px 22px;text-align:center;margin:6px 0 14px' + (print ? ';page-break-after:always' : '') + '">' +
'<div style="font:13px var(--sans,system-ui);letter-spacing:.2em;opacity:.85">SOMNUCOR CITY SCHOOL</div>' +
'<div style="font:600 26px Georgia,serif;margin:10px 0 6px">' + cslEsc(R.course || c[3]) + '</div>' +
'<div style="font:15px Georgia,serif;opacity:.92">' + cslEsc(eduGradeName(c[1])) + ' · ' + cslEsc(EDU_SUBJ[c[2]] || "") + '</div>' +
(R.frame ? '<div style="font:12.5px var(--sans,system-ui);opacity:.85;margin-top:12px">Aligned to ' + cslEsc(R.frame) + '</div>' : '') + '</div>';
if (R.about)
h += '<div style="font:600 17px Georgia,serif;margin:10px 0 4px">About this book</div>' + P(R.about);
h += '<div style="font:600 17px Georgia,serif;margin:12px 0 4px">Contents</div><ol style="margin:4px 0 14px 22px;padding:0">' +
U.map(function (u, i) { return '<li style="margin:2px 0">' + (print ? '' : '<a href="#csl-tb-u' + (i + 1) + '" data-csl="tb-jump" data-u="' + (i + 1) + '" style="color:' + col + '">') + cslEsc(u.t) + (print ? '' : '</a>') + (u.std ? ' <span style="color:#7A8088;font-size:12.5px">(' + cslEsc(u.std) + ')</span>' : '') + '</li>'; }).join("") + '</ol>';
U.forEach(function (u, i) {
var XL = (X.units && X.units[i] && X.units[i].lessons) || [], qs = [];
h += '<div id="csl-tb-u' + (i + 1) + '" style="border-top:3px solid ' + col + ';margin-top:18px;padding-top:6px' + (print && i ? ';page-break-before:always' : '') + '">' +
'<div style="font:13px var(--sans,system-ui);color:' + col + ';letter-spacing:.12em">CHAPTER ' + (i + 1) + '</div><div style="font:600 21px Georgia,serif;margin:2px 0 6px">' + cslEsc(u.t) + '</div>';
if (XL.length) {
XL.forEach(function (L, k) {
h += '<div style="font:600 16px Georgia,serif;margin:12px 0 2px">' + (i + 1) + '.' + (k + 1) + ' ' + cslEsc(L.t) + '</div>' + (L.learn || []).map(P).join("");
if (L.try)
h += '<div style="background:#F4F0E4;border-left:4px solid ' + col + ';padding:6px 10px;margin:8px 0;font-size:14.5px"><b>Try it.</b> ' + cslEsc(L.try) + '</div>';
(L.check || []).forEach(function (q) { qs.push(q); });
});
}
else {
[].concat(u.learn || []).forEach(function (t) { h += P(t); });
if (u.try)
h += '<div style="background:#F4F0E4;border-left:4px solid ' + col + ';padding:6px 10px;margin:8px 0;font-size:14.5px"><b>Try it.</b> ' + cslEsc(u.try) + '</div>';
}
(u.check || []).forEach(function (q) { qs.push(q); });
if (qs.length) {
var mixed = qs.map(function (q, j) { var o = [q[1], q[2], q[3]].filter(function (x) { return x != null && x !== ""; }), r = cslRng(c[0] + i + "." + j); o = cslShuf(o, r); return { q: q[0], o: o, a: "abc"[o.indexOf(q[1])] }; });
h += '<div style="font:600 16px Georgia,serif;margin:14px 0 4px">Check yourself</div><ol style="margin:0 0 0 22px;padding:0;font-size:14.5px">' +
mixed.map(function (m) { return '<li style="margin:5px 0">' + cslEsc(m.q) + '<div style="color:#3A4048">' + m.o.map(function (o, z) { return '<span style="margin-right:14px">(' + "abc"[z] + ') ' + cslEsc(o) + '</span>'; }).join("") + '</div></li>'; }).join("") + '</ol>' +
(print ? '<div style="font-size:12.5px;color:#5A6068;margin-top:6px">Answers: ' : '<details style="margin-top:6px;font-size:13px;color:#5A6068"><summary>Answers</summary>') +
mixed.map(function (m, j) { return (j + 1) + " " + m.a; }).join(" · ") + (print ? '</div>' : '</details>');
}
h += '</div>';
});
h += '<p style="color:#7A8088;font-size:12px;margin-top:18px">© SomnuMatrix. Written for the City School; free for pupils and teachers to read and print.</p>';
return h;
},
function (b) {
var cid = b.getAttribute("data-c");
cslTbGet(cid, function (B) {
if (!B) {
cslSay("That book isn't on the shelf.");
return;
}
var top = '<div style="margin:4px 0 8px"><button data-csl="tb" style="' + cslBtnO("#6A4A2A") + '">◀ The textbook bay</button> <button data-csl="tb-print" data-c="' + cslEsc(cid) + '" style="' + cslBtnO("#6A4A2A") + '">🖨 Print</button></div>';
EDU.lesson = { cid: cid, g: B.c[1], subj: B.c[2], title: B.c[3] + " · textbook", unit: 1, tab: "html", picks: {}, html: top + '<div style="font:15.5px/1.6 Georgia,serif;color:#1E2228">' + cslTbHtml(B, false) + '</div>' };
eduLessonPaintHtml();
var el = document.getElementById("sch-lesson");
if (el)
el.scrollTop = 0;
});
},
function (b) {
var cid = b.getAttribute("data-c");
cslTbGet(cid, function (B) {
if (!B)
return;
var w = null;
try {
w = window.open("", "_blank");
}
catch (e) { }
if (!w) {
cslSay("Your browser stopped the print window. Allow pop-ups for this site, then press 🖨 Print again.");
return;
}
w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>' + cslEsc(B.c[3]) + '</title><style>body{font:15px/1.6 Georgia,serif;color:#111;max-width:720px;margin:24px auto;padding:0 16px}@media print{details{display:block}}</style></head><body>' + cslTbHtml(B, true) + '</body></html>');
w.document.close();
setTimeout(function () { try {
w.focus();
w.print();
}
catch (e) { } }, 400);
});
}
];
});
