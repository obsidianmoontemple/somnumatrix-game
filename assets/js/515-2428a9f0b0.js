/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CSL = { room: null, key: "", ver: 0, live: -1, liveKind: "none", liveData: null, pollAt: 0, busy: false, st: null, mine: null, mineAt: 0,
strokes: null, boardCan: false, told: {}, kickAt: 0, off: false, lastErr: "",
POLL_CLASS: 3000, POLL_IDLE: 12000 };
function cslEsc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function cslIn() { return typeof signedIn === "function" && signedIn(); }
function cslMe() { try {
return (session && session.user && session.user.id) || "";
}
catch (e) {
return "";
} }
function cslSay(t) { if (typeof setStatus === "function")
try {
setStatus(t);
}
catch (e) { } }
function cslRpc(name, body) {
if (!cslIn())
return Promise.reject(new Error("Sign in first."));
var f = typeof cityRpcText === "function" ? cityRpcText : null;
if (!f)
return cityRpc(name, body || {});
return f(name, body || {}).then(function (t) { return t ? JSON.parse(t) : null; });
}
function cslErr(e) {
var m = String((e && e.message) || e || "");
if (/school_|keeper_school|Could not find the function|PGRST202|404/.test(m))
return "The school's server part is not on yet.";
return m.slice(0, 160) || "That didn't go through.";
}
function cslCampus() { try {
return INT && INT.spec && INT.spec.label === "The Commons School" ? 1 : 0;
}
catch (e) {
return 0;
} }
function cslRoomKey(r) { return r ? cslCampus() + ":" + r.id : ""; }
function cslClassRoom() { var r = typeof eduWhere === "function" ? eduWhere() : null; return r && r.kind === "class" ? r : null; }
function cslLite() { return typeof LITE !== "undefined" && !!LITE; }
function cslHex(n) { return "#" + (n || 0x5A6A7A).toString(16).padStart(6, "0"); }
function cslModal(title, html, o) { return __ZC(515, 0, this, arguments, new.target); }
function cslClose() { var el = document.getElementById("csl-modal"); if (el) {
el.style.display = "none";
el.innerHTML = "";
el.dataset.k = "";
} }
function cslOpenK() { var el = document.getElementById("csl-modal"); return el && el.style.display !== "none" ? el.dataset.k || "" : ""; }
function cslBtn(c, small) { return "padding:" + (small ? "4px 9px" : "7px 12px") + ";border-radius:5px;border:1px solid " + c + ";background:" + c + ";color:#FFF;font-weight:600;cursor:pointer;font-size:" + (small ? "12.5px" : "14px"); }
function cslBtnO(c) { return "padding:6px 11px;border-radius:5px;border:1px solid " + c + ";background:#FFF;color:" + c + ";font-weight:600;cursor:pointer;font-size:13.5px"; }
function cslMsg(id, t, bad) { var m = document.getElementById(id); if (m) {
m.innerHTML = t || "";
m.style.color = bad ? "#B03A2A" : "#2A6A3A";
} }
var CSL_CLICK = {};
var CSL_INPUT = {};
function cslClick(e) { return __ZC(515, 1, this, arguments, new.target); }
function cslInput(e) { var f = CSL_INPUT[e.target.getAttribute("data-csli")]; if (f)
try {
f(e.target, e);
}
catch (x) { } }
addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-csl]") : null;
if (!b || b.closest("#csl-modal"))
return;
cslClick(e);
});
function cslPoll(force) { return __ZC(515, 2, this, arguments, new.target); }
function cslTick(dt) {
if (!(typeof INT !== "undefined" && INT && INT.school)) {
if (CSL.room) {
CSL.room = null;
CSL.key = "";
CSL.st = null;
cslBoardLeave();
}
return;
}
cslPoll(false);
cslKeepOut();
if (typeof cslDecorTick === "function")
cslDecorTick(dt);
}
(function () {
if (typeof eduTick !== "function")
return;
var t0 = eduTick;
eduTick = function (dt) { var r = t0.apply(this, arguments); try {
cslTick(dt);
}
catch (e) {
if (window.console && !CSL.warned) {
CSL.warned = 1;
console.warn("[school-live]", e);
}
} return r; };
})();
function cslPanelHtml() { return __ZC(515, 3, this, arguments, new.target); }
function cslTeacherHere() {
var m = CSL.mine;
if (m && m.ok)
return (m.classes || []).some(function (c) { return c.mine; }) || m.keeper;
return typeof EDU !== "undefined" && EDU.badge;
}
function cslPanelPaint() { return __ZC(515, 4, this, arguments, new.target); }
(function () {
if (typeof eduPaint !== "function")
return;
var p0 = eduPaint;
eduPaint = function () { var r = p0.apply(this, arguments); try {
cslPanelPaint();
}
catch (e) { } return r; };
})();
function cslMine(force) { return __ZC(515, 5, this, arguments, new.target); }
var CSL_PUPIL_DOMAIN = "pupils.obsidianmoontemple.com";
function cslPupilEmail(school, user) {
var s = String(school || "").replace(/[^A-Za-z0-9]/g, "").toLowerCase(), u = String(user || "").replace(/[^A-Za-z0-9]/g, "").toLowerCase();
return s && u ? u + "." + s + "@" + CSL_PUPIL_DOMAIN : "";
}
function cslPupilCard() { return __ZC(515, 6, this, arguments, new.target); }
CSL_CLICK["pupil-in"] = function () { cslPupilCard(); };
CSL_CLICK["pupil-go"] = function () { return __ZC(515, 7, this, arguments, new.target); };
function cslPupilLinks() {
[["tg-create", "tg-soft"], ["acc-forgot", "btn"]].forEach(function (q) {
var b = document.getElementById(q[0]);
if (!b || document.getElementById("csl-pupil-" + q[0]))
return;
var x = document.createElement("button");
x.id = "csl-pupil-" + q[0];
x.type = "button";
x.className = q[1];
x.setAttribute("data-csl", "pupil-in");
x.textContent = "🎒 Pupil sign-in (school card)";
b.parentNode.insertBefore(x, b.nextSibling);
});
}
(function () { var n = 0, t = setInterval(function () { try {
cslPupilLinks();
}
catch (e) { } if (++n > 120)
clearInterval(t); }, 1000); })();
CSL.pw = {};
CSL.open = {};
function cslSchoolCard() { return __ZC(515, 8, this, arguments, new.target); }
CSL_CLICK["school"] = function () { cslSchoolCard(); };
function cslGradeOpts(sel) { return '<option value="">grade…</option>' + EDU_GRADES.map(function (g) { return '<option value="' + g + '"' + (g === sel ? ' selected' : '') + '>' + (g === "K" ? "Kindergarten" : "Grade " + g) + '</option>'; }).join(""); }
function cslSchoolPaint(o) { return __ZC(515, 9, this, arguments, new.target); }
function cslRefresh() { return cslMine(true).then(function (o) { if (cslOpenK() === "school")
cslSchoolPaint(o); return o; }); }
CSL_CLICK["join"] = function () { return __ZC(515, 10, this, arguments, new.target); };
CSL_CLICK["staff"] = function (b) {
cslRpc("school_staff_set", { p_school: b.getAttribute("data-s"), p_user: b.getAttribute("data-u"), p_role: b.getAttribute("data-r") }).then(function (o) { cslSay(cslEsc((o && o.say) || "")); cslRefresh(); }).catch(function (e) { cslSay(cslEsc(cslErr(e))); });
};
CSL_CLICK["class-new"] = function (b) { return __ZC(515, 11, this, arguments, new.target); };
CSL_CLICK["cl-open"] = function (b) { var c = b.getAttribute("data-c"); CSL.open[c] = !CSL.open[c]; cslSchoolPaint(CSL.mine); };
CSL_CLICK["cl-sw"] = function (b, e) { return __ZC(515, 12, this, arguments, new.target); };
function cslParsePupils(text) { return __ZC(515, 13, this, arguments, new.target); }
CSL_CLICK["add"] = function (b) { return __ZC(515, 14, this, arguments, new.target); };
CSL_CLICK["pp"] = function (b) { return __ZC(515, 15, this, arguments, new.target); };
function cslCards(school, schoolName, className, pupils) { return __ZC(515, 16, this, arguments, new.target); }
CSL_CLICK["cards"] = function (b) { return __ZC(515, 17, this, arguments, new.target); };
function cslSettingsLink() {
var panel = document.getElementById("panel");
if (!panel || document.getElementById("csl-set"))
return;
var after = document.getElementById("flk-card"), top = panel.querySelector(".set-top");
var d = document.createElement("div");
d.id = "csl-set";
d.style.cssText = "margin:6px 0 14px;padding:10px 12px;border:1px solid rgba(232,220,196,.22);border-radius:10px;font-family:var(--sans);font-size:13px;line-height:1.55";
d.innerHTML = '<b>🏫 School</b><div style="color:var(--dim)">Teachers: your school, your classes and your pupils\' own accounts. Pupils: sign in with your school card.</div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px"><button class="btn" type="button" data-csl="school">🍎 Teachers: my school</button><button class="btn" type="button" data-csl="pupil-in">🎒 Pupil sign-in</button></div>';
var ref = after || (top && top.nextSibling) || null;
if (after && after.nextSibling)
panel.insertBefore(d, after.nextSibling);
else if (ref)
panel.insertBefore(d, ref);
else
panel.appendChild(d);
}
(function () { var n = 0, t = setInterval(function () { try {
cslSettingsLink();
}
catch (e) { } if (++n > 300)
clearInterval(t); }, 2000); })();
(function () {
if (typeof edrClassCard === "function") {
var cc = edrClassCard;
edrClassCard = function () { if (cslIn())
return cslSchoolCard(); return cc.apply(this, arguments); };
}
})();
var CSL_BW = 1024, CSL_BH = 320;
var CSL_CHALK = ["#F4F2EA", "#F6E27A", "#F49AB8", "#8CC8F0", "#9AE09A"];
function cslBoardLocal(key) { try {
var v = JSON.parse(localStorage.getItem("somnu.board." + key) || "null");
return Array.isArray(v) ? v : [];
}
catch (e) {
return [];
} }
function cslBoardLocalSave(key, s) { try {
localStorage.setItem("somnu.board." + key, JSON.stringify(s || []));
}
catch (e) { } }
function cslSlate(g, w, h) { return __ZC(515, 18, this, arguments, new.target); }
function cslChalkLine(g, s) { return __ZC(515, 19, this, arguments, new.target); }
function cslChalkText(g, s) {
g.fillStyle = s.c || CSL_CHALK[0];
g.globalAlpha = 0.93;
g.textBaseline = "top";
g.font = (s.s || 34) + "px 'Segoe Print','Bradley Hand','Comic Sans MS',cursive";
String(s.t || "").split("\n").forEach(function (l, i) { g.fillText(l.slice(0, 80), s.x || 20, (s.y || 20) + i * (s.s || 34) * 1.2); });
g.globalAlpha = 1;
}
function cslBoardPaint(g, strokes, r) { return __ZC(515, 20, this, arguments, new.target); }
function cslBoardEnter(r) { return __ZC(515, 21, this, arguments, new.target); }
function cslBoardLeave() {
var B = CSL.board;
if (!B)
return;
CSL.board = null;
if (B.g.parent)
B.g.parent.remove(B.g);
B.g.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); });
B.mats.forEach(function (m) { try {
m.dispose();
}
catch (e) { } });
try {
B.tex.dispose();
}
catch (e) { }
}
function cslBoardDraw() {
var B = CSL.board;
if (B) {
cslBoardPaint(B.ctx, CSL.strokes, B.room);
B.tex.needsUpdate = true;
}
if (CSL.ed)
cslEdDraw();
var lk = document.getElementById("csl-look");
if (lk && B)
try {
lk.src = B.cv.toDataURL("image/png");
}
catch (e) { }
}
CSL_CLICK["board-look"] = function () { return __ZC(515, 22, this, arguments, new.target); };
CSL_CLICK["board-write"] = function () { return __ZC(515, 23, this, arguments, new.target); };
function cslEdDraw() { var E = CSL.ed; if (!E || !E.g || !document.getElementById("csl-ed")) {
CSL.ed = null;
return;
} cslBoardPaint(E.g, (CSL.strokes || []).concat(E.cur ? [E.cur] : []), CSL.board && CSL.board.room); }
function cslBoardAdd(s) {
if (!CSL.strokes)
CSL.strokes = [];
if (CSL.ed)
CSL.ed.undo.push(CSL.strokes.length);
CSL.strokes.push(s);
if (CSL.strokes.length > 780)
CSL.strokes.splice(0, CSL.strokes.length - 780);
cslBoardDraw();
cslBoardSend();
}
function cslBoardSend() { return __ZC(515, 24, this, arguments, new.target); }
CSL_CLICK["ed-col"] = function (b) {
if (!CSL.ed)
return;
CSL.ed.col = b.getAttribute("data-c");
CSL.ed.er = false;
Array.prototype.forEach.call(document.querySelectorAll('[data-csl="ed-col"]'), function (x) { x.style.borderColor = x === b ? "#2E5A9A" : "#FFF"; });
};
CSL_CLICK["ed-w"] = function (b) { if (CSL.ed) {
CSL.ed.w = +b.getAttribute("data-w");
CSL.ed.er = false;
} };
CSL_CLICK["ed-er"] = function () { if (CSL.ed) {
CSL.ed.er = !CSL.ed.er;
cslMsg("csl-ed-msg", CSL.ed.er ? "Eraser: rub out what you drew." : "Chalk again.");
} };
CSL_CLICK["ed-undo"] = function () { if (!CSL.ed || !CSL.strokes || !CSL.strokes.length)
return; var n = CSL.ed.undo.length ? CSL.ed.undo.pop() : CSL.strokes.length - 1; CSL.strokes.length = Math.max(0, n); cslBoardDraw(); cslBoardSend(); };
CSL_CLICK["ed-clear"] = function (b) { if (!b.dataset.sure) {
b.dataset.sure = "1";
b.textContent = "Wipe it? press again";
return;
} b.dataset.sure = ""; b.textContent = "wipe it clean"; CSL.strokes = []; if (CSL.ed)
CSL.ed.undo = []; cslBoardDraw(); cslBoardSend(); };
function cslNextLine(size) {
var y = 22;
(CSL.strokes || []).forEach(function (s) { if (s.t != null) {
var n = String(s.t).split("\n").length;
y = Math.max(y, (s.y || 0) + n * (s.s || 34) * 1.2 + 6);
} });
return y + size > CSL_BH - 10 ? 22 : y;
}
CSL_CLICK["ed-put"] = function () {
var i = document.getElementById("csl-ed-text"), t = i ? String(i.value || "").trim() : "";
if (!t)
return;
var s = t.length > 40 ? 28 : 36;
cslBoardAdd({ t: t.slice(0, 160), x: 26, y: cslNextLine(s), s: s, c: CSL.ed ? CSL.ed.col : CSL_CHALK[0] });
i.value = "";
};
CSL_INPUT["ed-text"] = function () { };
CSL_CLICK["ed-lesson"] = function () { return __ZC(515, 25, this, arguments, new.target); };
CSL_CLICK["start"] = function () { return __ZC(515, 26, this, arguments, new.target); };
CSL_CLICK["start-go"] = function () { return __ZC(515, 27, this, arguments, new.target); };
function cslSess() { return CSL.st && CSL.st.session || null; }
function cslTeachCard() {
var s = cslSess();
if (!s || !s.mine) {
cslSay("Start class first.");
return;
}
cslModal("🍎 Teacher's desk · " + cslEsc(s.name || ""), '<div id="csl-teach"></div>', { k: "teach", w: 760, col: "#3A8A5A" });
cslTeachPaint();
}
CSL_CLICK["teach"] = function () { cslTeachCard(); };
function cslUnitOpts() { var h = ''; for (var u = 1; u <= 10; u++)
h += '<option value="' + u + '"' + (u === Math.min(10, (typeof eduCount === "function" ? eduCount(CSL.room.id) : 0) + 1) ? ' selected' : '') + '>Unit ' + u + '</option>'; return h; }
function cslTeachPaint() { return __ZC(515, 28, this, arguments, new.target); }
function cslClassChange(b) { var s = cslSess(); if (!s)
return Promise.resolve(); return cslRpc("school_class_change", Object.assign({ p_circle: s.circle }, b)).then(function (o) { if (o && o.say)
cslSay(cslEsc(o.say)); cslPoll(true); return o; }).catch(function (e) { cslSay(cslEsc(cslErr(e))); }); }
CSL_CLICK["t-only"] = function (b) { var on = b.checked; cslClassChange({ p_only: on }); };
CSL_CLICK["t-write"] = function (b) { var on = b.checked; cslClassChange({ p_write: on }); };
CSL_CLICK["t-more"] = function () { cslClassChange({ p_more: 15 }); };
CSL_CLICK["t-end"] = function (b) { if (!b.dataset.sure) {
b.dataset.sure = "1";
b.textContent = "End class? press again";
return;
} cslClassChange({ p_end: true }).then(function () { cslClose(); }); };
CSL_CLICK["t-hands"] = function () { var s = cslSess(); if (s)
cslRpc("school_hand", { p_circle: s.circle, p_up: false, p_user: cslMe() }).then(function () { cslPoll(true); }); };
function cslLiveSend(kind, data, say) { return __ZC(515, 29, this, arguments, new.target); }
CSL_CLICK["t-lesson"] = function () {
var u = +document.getElementById("csl-t-u").value, p = +document.getElementById("csl-t-p").value;
cslLiveSend("lesson", { cid: CSL.room.id, title: CSL.room.name, unit: u, part: p }, "The lesson is on their screens.");
};
CSL_CLICK["t-none"] = function () { cslLiveSend("none", {}, "Their screens are clear."); };
CSL_CLICK["t-ticket"] = function () {
var q = String(document.getElementById("csl-t-q").value || "").trim() || "What is one thing you learned today, and one question you still have?";
cslLiveSend("ticket", { q: q.slice(0, 300) }, "Asked. Their answers come in below.");
};
CSL_CLICK["t-quiz"] = function () { return __ZC(515, 30, this, arguments, new.target); };
CSL_CLICK["hand"] = function () {
var s = cslSess();
if (!s || !s.circle)
return;
var up = !(CSL.st && CSL.st.hand);
cslRpc("school_hand", { p_circle: s.circle, p_up: up }).then(function () { CSL.st.hand = up; cslPanelPaint(); cslSay(up ? "✋ Your hand is up. Your teacher can see it." : "Hand down."); });
};
CSL_CLICK["live-open"] = function () { cslLiveShow(true); };
function cslSessionSeen(was, o) { return __ZC(515, 31, this, arguments, new.target); }
function cslLiveShow(again) { return __ZC(515, 32, this, arguments, new.target); }
CSL_CLICK["live-lesson"] = function () { return __ZC(515, 33, this, arguments, new.target); };
CSL_CLICK["qp"] = function (b) { return __ZC(515, 34, this, arguments, new.target); };
CSL_CLICK["qsend"] = function () { return __ZC(515, 35, this, arguments, new.target); };
CSL_CLICK["tksend"] = function () { return __ZC(515, 36, this, arguments, new.target); };
function cslKeepOut() { return __ZC(515, 37, this, arguments, new.target); }
var CSL_STICK = ["⭐", "🌟", "🏅", "🎖️", "🦉", "🚀", "🌈", "🦋", "🐢", "🦊", "🐬", "🌻", "🍎", "📚", "🎨", "🎵", "🔬", "🧭", "🏆", "💡"];
function cslWork() { var R = typeof edrStore === "function" ? edrStore() : (dreamer().schoolRec || (dreamer().schoolRec = {})); if (!R.csl || typeof R.csl !== "object")
R.csl = { st: {}, tk: {}, m: {}, g: {}, w: {} }; return R.csl; }
function cslSave() { if (typeof save === "function")
try {
save();
}
catch (e) { } }
function cslSticker(key) {
var W = cslWork();
if (W.st[key])
return false;
var n = Object.keys(W.st).length;
W.st[key] = CSL_STICK[n % CSL_STICK.length];
cslSave();
cslSay("<b>" + W.st[key] + " A sticker for your chart!</b> " + (n + 1) + " so far.");
return true;
}
function cslRng(seed) { var r = 0; for (var i = 0; i < seed.length; i++)
r = (r * 31 + seed.charCodeAt(i)) | 0; r = Math.abs(r) || 7; return function () { r = (r * 16807) % 2147483647; return r / 2147483647; }; }
function cslShuf(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) {
var j = Math.floor(rnd() * (i + 1)), t = a[i];
a[i] = a[j];
a[j] = t;
} return a; }
var CSL_STOP = { "about": 1, "after": 1, "again": 1, "because": 1, "before": 1, "being": 1, "could": 1, "every": 1, "their": 1, "there": 1, "these": 1, "thing": 1, "things": 1, "those": 1, "through": 1, "where": 1, "which": 1, "while": 1, "would": 1, "other": 1, "people": 1, "something": 1, "always": 1, "never": 1, "really": 1, "called": 1, "often": 1, "until": 1, "under": 1, "many": 1, "very": 1, "when": 1, "what": 1, "with": 1, "your": 1, "from": 1, "this": 1, "that": 1, "have": 1, "they": 1, "them": 1, "then": 1, "than": 1, "into": 1, "also": 1, "some": 1, "more": 1, "most": 1, "much": 1, "like": 1, "just": 1 };
function cslWords(t) { return (String(t).match(/[A-Za-zÀ-ÿ'’-]{4,}/g) || []).filter(function (w) { return !CSL_STOP[w.toLowerCase()]; }); }
function cslGapMake(L, seed) { return __ZC(515, 38, this, arguments, new.target); }
function cslActsHtml(Ls, X, col) { return __ZC(515, 39, this, arguments, new.target); }
function cslLessonRepaint() { var sc = document.getElementById("sch-lesson"), y = sc ? sc.scrollTop : 0; eduLessonPaint(); var s2 = document.getElementById("sch-lesson"); if (s2)
s2.scrollTop = y; }
function cslMaybeSticker(key) {
var W = cslWork(), parts = key.split("."), X = edrLxUnit(parts[0], +parts[1]), L = X && X.lessons[+parts[2] - 1];
if (!L)
return;
var Q = (L.check || []).slice(0, 4), mOk = Q.length < 2 || Object.keys(W.m[key] || {}).length === Q.length, G = cslGapMake(L, key), gOk = !G || W.g[key] === G.w;
if (mOk && gOk)
cslSticker(key);
}
CSL_CLICK["wu"] = function (b) { var W = cslWork(), k = b.getAttribute("data-k"); W.w[k] = b.getAttribute("data-o"); cslSave(); cslLessonRepaint(); };
CSL_CLICK["mq"] = function (b) { var Ls = EDU.lesson; if (!Ls)
return; Ls.cslSel = +b.getAttribute("data-i"); Ls.cslMiss = false; cslLessonRepaint(); };
CSL_CLICK["ma"] = function (b) { return __ZC(515, 40, this, arguments, new.target); };
CSL_CLICK["gap"] = function (b) { var W = cslWork(), k = b.getAttribute("data-k"); W.g[k] = b.getAttribute("data-o"); cslSave(); if (b.getAttribute("data-r") === "1")
cslMaybeSticker(k); cslLessonRepaint(); };
CSL_CLICK["xt"] = function (b) {
var k = b.getAttribute("data-k"), t = String((document.getElementById("csl-xt") || {}).value || "").trim();
if (!t) {
cslMsg("csl-xt-msg", "Write a sentence first.", true);
return;
}
cslWork().tk[k] = t.slice(0, 400);
cslSave();
cslMsg("csl-xt-msg", "Kept in your record. Well done.");
};
(function () {
if (typeof eduLessonPaint !== "function")
return;
var lp = eduLessonPaint;
eduLessonPaint = function () {
var r = lp.apply(this, arguments);
try {
var Ls = EDU.lesson, el = document.getElementById("sch-lesson");
if (!Ls || !el || Ls.tab !== "learn" || !Ls.data || typeof edrLxUnit !== "function")
return r;
var X = edrLxUnit(Ls.cid, Ls.unit);
if (!X || !(X.lessons || []).length)
return r;
if ((Ls.edrPart || 0) > X.lessons.length)
return r;
var col = cslHex(EDU_SCOL[Ls.subj]), card = el.firstElementChild;
if (!card)
return r;
card.insertAdjacentHTML("beforeend", cslActsHtml(Ls, X, col));
}
catch (e) {
if (window.console)
console.warn("[school-live lessons]", e);
}
return r;
};
})();
function cslMix(c, t) { var r = (c >> 16) & 255, g = (c >> 8) & 255, b = c & 255; r = Math.round(r + (255 - r) * t); g = Math.round(g + (255 - g) * t); b = Math.round(b + (255 - b) * t); return (r << 16) | (g << 8) | b; }
var CSL_FRIEZE = {
ela: ["Reading takes you anywhere", "Who? What? Where? When? Why? How?", "Noun · Verb · Adjective · Adverb"],
math: ["π ≈ 3.14159   a² + b² = c²   y = mx + b", "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20", "½  ⅓  ¼  ⅕  ⅙  ⅛  ⅒"],
sci: ["H  He  Li  Be  B  C  N  O  F  Ne  Na  Mg  Al  Si  P  S  Cl  Ar", "Observe · Question · Predict · Test · Conclude", "Solid · Liquid · Gas"],
soc: ["3000 BC · 500 BC · AD 1 · 1066 · 1492 · 1776 · 1865 · 1969", "N · E · S · W   Our world: 7 continents, 5 oceans", "Community · Citizen · Map · History"],
lang: ["¡Hola! · Gracias · Por favor · Amigo · ¿Cómo estás?", "uno dos tres cuatro cinco seis siete ocho nueve diez", "rojo · azul · verde · amarillo · morado · naranja"],
art: ["Line · Shape · Colour · Texture · Form · Space · Value", "red · orange · yellow · green · blue · violet", "Every artist was first a beginner"],
mus: ["𝄞  C  D  E  F  G  A  B  C", "Rhythm · Melody · Harmony · Tempo · Dynamics", "♩ ♪ ♫ ♬"],
pe: ["Move · Breathe · Drink water · Rest · Play fair", "Eat a rainbow every day", "Teamwork makes the dream work"],
cs: ["01001000 01101001   print(\"Hello, world!\")", "Sequence · Loop · If · Variable · Debug", "Think · Plan · Code · Test · Fix"]
};
function cslFriezeTex(sub, el, i) { return __ZC(515, 41, this, arguments, new.target); }
function cslPosterTex(kind) { return __ZC(515, 42, this, arguments, new.target); }
var CSL_RAIN = [0xE85A4A, 0xF2A33A, 0xF2D24A, 0x5AB86A, 0x4A9AE0, 0x8A6AD8];
var CSL_WIDE = {
"csl-es-hola": ["¡Bienvenidos a la clase de español!", "#E85A4A", ["¡Hola! · Me llamo...", "¿Cómo te llamas?", "Buenos días · Adiós", "Mucho gusto"]],
"csl-es-colores": ["Los colores", "#4A9AE0", null],
"csl-cs-binary": ["Binary: 0 and 1", "#5AB86A", ["0 = 0000   1 = 0001   2 = 0010   3 = 0011", "4 = 0100   5 = 0101   6 = 0110   7 = 0111", "8 = 1000    each place doubles: 8 4 2 1"]],
"csl-cs-ipo": ["How a computer works", "#8A6AD8", null]
};
function cslWideTex(k) { return __ZC(515, 43, this, arguments, new.target); }
(function () {
if (typeof ilfPosterTex !== "function" || typeof ILF_POSTERS === "undefined")
return;
var pt = ilfPosterTex;
ilfPosterTex = function (k) { return CSL_WIDE[k] ? cslWideTex(k) : pt.apply(this, arguments); };
ILF_POSTERS.lang = ["csl-es-hola", "csl-es-colores"];
ILF_POSTERS.cs = ["csl-cs-ipo", "csl-cs-binary"];
})();
function cslDecorClass(K, r) { return __ZC(515, 44, this, arguments, new.target); }
(function () {
if (typeof ilfSchoolClass !== "function")
return;
var sc = ilfSchoolClass;
ilfSchoolClass = function (K, r) { var o = sc.apply(this, arguments); try {
cslDecorClass(K, r);
}
catch (e) {
if (window.console)
console.warn("[school-live decor]", e);
} return o; };
})();
var CSL_BELL = { key: "", slot: null, judged: false, seen: false, warned: false, at: 0 };
function cslPunctStore() { var R = edrStore(); if (!R.punct || typeof R.punct !== "object")
R.punct = {}; return R.punct; }
function cslPunctAdd(kind) {
var P = cslPunctStore(), d = String(edrDayN()), D = P[d] || (P[d] = { on: 0, late: 0, miss: 0 });
D[kind] = (D[kind] || 0) + 1;
var keep = edrDayN() - 40;
Object.keys(P).forEach(function (k) { if (+k < keep)
delete P[k]; });
if (typeof save === "function")
save();
}
function cslPunct() {
var P = cslPunctStore(), n = edrDayN(), o = { on: 0, late: 0, miss: 0 }, any = false;
Object.keys(P).forEach(function (k) { if (+k > n - 30) {
any = true;
o.on += P[k].on || 0;
o.late += P[k].late || 0;
o.miss += P[k].miss || 0;
} });
return any ? o : null;
}
function cslChime() { if (typeof playTone === "function")
try {
playTone(660, 0.4);
setTimeout(function () { try {
playTone(880, 0.5);
}
catch (e) { } }, 380);
}
catch (e) { } }
function cslBellTick() { return __ZC(515, 45, this, arguments, new.target); }
(function () {
if (typeof cslTick !== "function")
return;
var t0 = cslTick;
cslTick = function (dt) { var r = t0.apply(this, arguments); try {
if (typeof INT !== "undefined" && INT && INT.school)
cslBellTick();
}
catch (e) {
if (window.console && !CSL_BELL.warn) {
CSL_BELL.warn = 1;
console.warn("[school-live bells]", e);
}
} return r; };
})();
CSL.hw = { o: null, at: 0, open: {} };
function cslHwLoad(force) { return __ZC(515, 46, this, arguments, new.target); }
function cslHwDue(d) { return __ZC(515, 47, this, arguments, new.target); }
function cslHwMark(m) { return m === "done" ? '<b style="color:#2A6A3A">✅ marked done</b>' : m === "redo" ? '<b style="color:#B03A2A">↩ do it again</b>' : ""; }
function cslHwCard() { return __ZC(515, 48, this, arguments, new.target); }
CSL_CLICK["hw"] = function () { cslHwCard(); };
function cslHwPaint() { return __ZC(515, 49, this, arguments, new.target); }
function cslHwTomorrow() { var d = new Date(Date.now() + 86400000); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function cslHwAgain(say, id) { return cslHwLoad(true).then(function () { cslHwPaintForce(); if (say)
cslMsg(id || "csl-hw-msg", cslEsc(say)); }); }
function cslHwPaintForce() { var b = document.getElementById("csl-body"); if (b) {
var f = b.querySelector(":focus");
if (f)
f.blur();
} cslHwPaint(); }
CSL_CLICK["hw-set"] = function () { return __ZC(515, 50, this, arguments, new.target); };
CSL_CLICK["hw-hand"] = function (b) { return __ZC(515, 51, this, arguments, new.target); };
CSL_CLICK["hw-open"] = function (b) { var id = b.getAttribute("data-id"); CSL.hw.open[id] = !CSL.hw.open[id]; cslHwPaintForce(); };
CSL_CLICK["hw-close"] = function (b) { cslRpc("school_homework_close", { p_id: +b.getAttribute("data-id"), p_closed: b.getAttribute("data-v") === "1" }).then(function () { cslHwAgain(); }).catch(function (e) { cslSay(cslEsc(cslErr(e))); }); };
CSL_CLICK["hw-mark"] = function (b) { return __ZC(515, 52, this, arguments, new.target); };
CSL_CLICK["hw-study"] = function (b) { return __ZC(515, 53, this, arguments, new.target); };
(function () {
if (typeof cslPanelHtml !== "function")
return;
var p0 = cslPanelHtml;
cslPanelHtml = function () {
var h = p0.apply(this, arguments);
if (!CSL.room || !cslIn())
return h;
var o = CSL.hw.o, n = o && o.ok ? (o.pupil || []).filter(function (w) { return !w.at || w.mark === "redo"; }).length : 0;
return h + '<div class="row"><button class="btn" data-csl="hw">📝 Homework' + (n ? ' (' + n + ' to do)' : '') + '</button></div>';
};
})();
(function () {
if (typeof cslTeachPaint !== "function")
return;
var t0 = cslTeachPaint;
cslTeachPaint = function () {
var r = t0.apply(this, arguments), el = document.getElementById("csl-teach");
if (el && !document.getElementById("csl-t-hw") && cslOpenK() === "teach") {
var d = document.createElement("div");
d.id = "csl-t-hw";
d.style.marginTop = "10px";
d.innerHTML = '<button data-csl="hw" style="' + cslBtn("#C8783A", 1) + '">📝 Homework: set it, read answers, mark</button>';
el.appendChild(d);
}
return r;
};
})();
(function () {
if (typeof cslBoardEnter !== "function")
return;
var e0 = cslBoardEnter;
cslBoardEnter = function () { var r = e0.apply(this, arguments); if (cslIn() && !CSL.off)
cslHwLoad(false).then(function () { cslPanelPaint(); }); return r; };
})();
var CSL_TB_COL = { ela: "#A83A32", math: "#2E5A9A", sci: "#3A7A4A", soc: "#C8963A", lang: "#C8462A", art: "#8A3A8A", mus: "#6A3A8A", pe: "#2A8A8A", cs: "#2A6A9A" };
function cslTbShelf(g) { return __ZC(515, 54, this, arguments, new.target); }
CSL_CLICK["tb"] = function () { cslTbShelf(); };
CSL_CLICK["tb-g"] = function (b) { cslTbShelf(b.getAttribute("data-g")); var el = document.getElementById("sch-lesson"); if (el)
el.scrollTop = 0; };
CSL_CLICK["tb-book"] = function (b) { var n = +b.getAttribute("data-n"); if (typeof eduReadBook === "function")
eduReadBook(n);
else if (typeof libRead === "function")
libRead(n); };
function cslTbGet(cid, cb) {
var c = eduCourse(cid);
if (!c) {
cb(null);
return;
}
var by = null, lx, n = 0;
function done() { if (++n < 2)
return; cb({ c: c, R: by && by[c[2]] || null, X: lx || null }); }
eduData(c[1], function (d) { by = d; done(); });
if (typeof edrLx === "function")
edrLx(cid, function (d) { lx = d; done(); });
else
done();
}
function cslTbHtml(B, print) { return __ZC(515, 55, this, arguments, new.target); }
CSL_CLICK["tb-read"] = function (b) { return __ZC(515, 56, this, arguments, new.target); };
CSL_CLICK["tb-jump"] = function (b) { var t = document.getElementById("csl-tb-u" + b.getAttribute("data-u")), el = document.getElementById("sch-lesson"); if (t && el)
el.scrollTop = t.offsetTop - 10; };
CSL_CLICK["tb-print"] = function (b) { return __ZC(515, 57, this, arguments, new.target); };
(function () {
if (typeof eduResourcesHtml !== "function")
return;
var b0 = eduResourcesHtml;
eduResourcesHtml = function (Ls) {
var h = b0.apply(this, arguments);
if (!Ls)
return h;
return '<div style="font-weight:600;margin:8px 0 4px">The class textbook</div><div style="margin:5px 0"><button data-csl="tb-read" data-c="' + cslEsc(Ls.cid) + '" style="' + cslBtn(CSL_TB_COL[Ls.subj] || "#5A6068", 1) + '">📖 Read it</button> <b>' + cslEsc(String(Ls.title || "").replace(/ · textbook$/, "")) + '</b> <span style="color:#5A6068">· all ten chapters, with questions and answers</span></div>' + h;
};
})();
