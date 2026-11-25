/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CWS = { server: false, noHere: 0, want: null, copy: 0, copies: 1, here: 1, total: 1, cap: 0, split: true, mod: false, home: null, homeTold: "",
me: null, meAt: 0, justBlocked: {}, board: null, boardAt: 0, el: null, card: null, hid: {}, tap: null, repWhy: null };
var CWS_MAX = { pc: 40, lite: 16 };
function cwsLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof scpLite === "function" && scpLite()); }
function cwsMax() { return cwsLite() ? CWS_MAX.lite : CWS_MAX.pc; }
function cwsEsc(s) { return typeof esc === "function" ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; }); }
function cwsSay(t) { if (typeof setStatus === "function")
setStatus(t); }
function cwsMuted() { return typeof wcLocalBlocked === "function" ? wcLocalBlocked() : {}; }
function cwsBlocked() { var o = typeof pfBlockedIds === "function" ? pfBlockedIds() : {}; for (var k in CWS.justBlocked)
if (!(k in o))
o[k] = CWS.justBlocked[k]; return o; }
function cwsFriend(id) { return typeof pfState === "function" && pfState(id) === "friend"; }
function cwsAsk() {
var at = myPlace();
if (CWS.noHere > Date.now())
return cityRpc("list_presence", { p_realm: "somnucor" }).then(function (r) { CWS.server = false; return r; });
var known = Object.keys(presenceOthers).slice(0, 200);
return cityRpc("presence_here", { p_realm: "somnucor", p_place: at.place, p_x: at.x, p_z: at.z, p_max: cwsMax(), p_known: known, p_want: CWS.want })
.then(function (o) {
if (!o || !Array.isArray(o.rows))
throw new Error("no answer");
CWS.server = true;
CWS.want = null;
CWS.copy = o.copy | 0;
CWS.copies = Math.max(1, o.copies | 0);
CWS.here = o.here | 0;
CWS.total = o.total | 0;
CWS.cap = o.cap | 0;
CWS.split = o.split !== false;
CWS.mod = !!o.mod;
cwsHome(o.home_until);
if (CWS.home)
return Object.keys(presenceOthers).map(function (id) { return { user_id: id, place: "~elsewhere" }; });
var rows = o.rows.slice();
(o.gone || []).forEach(function (id) { rows.push({ user_id: id, place: "~elsewhere" }); });
return rows;
}).catch(function (e) {
var m = String(e && e.message || "");
CWS.noHere = Date.now() + (/presence_here|PGRST202|Could not find|does not exist/i.test(m) ? 600000 : 30000);
return cityRpc("list_presence", { p_realm: "somnucor" }).then(function (r) { CWS.server = false; return r; });
});
}
function cwsKeep(rows) { return __ZC(428, 0, this, arguments, new.target); }
function cwsTotal(n) { return CWS.server && CWS.total ? CWS.total : n; }
function cwsCopyWord() { return CWS.server && CWS.split && CWS.copies > 1 ? " · copy " + (CWS.copy + 1) + " of " + CWS.copies : ""; }
function cwsHome(until) {
var t = until ? Date.parse(until) : 0;
CWS.home = t > Date.now() ? t : null;
if (CWS.home && CWS.homeTold !== String(until)) {
CWS.homeTold = String(until);
cwsLoadMe(true).then(function () { cwsOpenMe(); });
}
}
function cwsLoadMe(force) { return __ZC(428, 1, this, arguments, new.target); }
function cwsTime(t) { try {
var d = new Date(t);
return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) + (d - Date.now() > 20 * 3600e3 ? " " + d.toLocaleDateString() : "");
}
catch (e) {
return "";
} }
function cwsCss() { return __ZC(428, 2, this, arguments, new.target); }
function cwsEl() { return __ZC(428, 3, this, arguments, new.target); }
function cwsClose() { if (CWS.el)
CWS.el.className = ""; CWS.card = null; CWS.repWhy = null; }
function cwsFree() { try {
if (document.exitPointerLock && document.pointerLockElement)
document.exitPointerLock();
}
catch (e) { } }
function cwsOpen(id, name) { return __ZC(428, 4, this, arguments, new.target); }
function cwsOpenMe() { CWS.card = { kind: "me" }; cwsFree(); cwsPaint(); }
function cwsOpenBoard() { CWS.card = { kind: "board" }; cwsFree(); cwsPaint(); cwsLoadBoard(true).then(function () { if (CWS.card && CWS.card.kind === "board")
cwsPaint(); }); }
var CWS_WHY = [["rude", "Rude or hateful words"], ["bullying", "Bullying or threats"], ["child", "Unsafe for children"], ["cheating", "Cheating or scamming"], ["space", "In my space"], ["other", "Something else"]];
function cwsPaint() { return __ZC(428, 5, this, arguments, new.target); }
function cwsAppealBox(kind, M) { return __ZC(428, 6, this, arguments, new.target); }
function cwsLoadBoard(force) {
if (!force && CWS.board && Date.now() - CWS.boardAt < 30000)
return Promise.resolve(CWS.board);
CWS.boardAt = Date.now();
return cityRpc("safety_mod_board", {}).then(function (b) { CWS.board = b || null; return b; }).catch(function () { return null; });
}
function cwsDone(then) { return function (o) { var s = o && o.say ? o.say : o === "ok" ? "Done." : typeof o === "string" ? o : "Done."; cwsSay(cwsEsc(s)); if (then)
then(o); }; }
function cwsFail() { cwsSay("The city did not answer. Try again in a moment."); }
function cwsAct(a, b) { return __ZC(428, 7, this, arguments, new.target); }
function cwsPeopleBtn(id) { return '<button class="cws-dots" data-cwscard="' + cwsEsc(id) + '" title="Report, mute, block">⋯</button>'; }
function cwsPeopleHead() { return __ZC(428, 8, this, arguments, new.target); }
document.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-cwscard],[data-cwsme]") : null;
if (!t)
return;
e.preventDefault();
e.stopPropagation();
if (t.hasAttribute("data-cwsme")) {
cwsLoadMe(true).then(function () { cwsOpenMe(); });
if (CWS.mod || (CWS.me && CWS.me.mod))
cwsLoadBoard(false);
cwsOpenMe();
return;
}
cwsOpen(t.getAttribute("data-cwscard"), t.getAttribute("data-n") || null);
}, true);
if (typeof wcActs === "function") {
window.wcActs = (function (orig) {
return function (l) {
var s = orig(l);
if (!l || !l.user_id)
return s;
return s.replace(/<\/div>$/, '<button type="button" data-cwscard="' + cwsEsc(l.user_id) + '" data-n="' + cwsEsc(l.name || "") + '">More…</button></div>');
};
})(window.wcActs);
}
if (typeof wcPaintBoard === "function") {
window.wcPaintBoard = (function (orig) {
return function (body) {
orig(body);
if (!CWS.board || Date.now() - CWS.boardAt > 30000)
cwsLoadBoard(false).then(function () { if (typeof WCHAT !== "undefined" && WCHAT.tab === "mod" && WCHAT.el)
wcPaint(false); });
var B = CWS.board;
if (!B)
return;
var d = document.createElement("div");
d.innerHTML = '<h4>Reported dreamers</h4>' + ((B.reports || []).length ? '<div class="wc-dim">' + B.reports.length + ' waiting' + (B.appeals_waiting ? " · " + B.appeals_waiting + " appeal(s)" : "") + '. <button type="button" data-cwsboard="1">Open</button></div>' : '<div class="wc-dim">None waiting.</div>');
body.insertBefore(d, body.firstChild);
var ob = d.querySelector("[data-cwsboard]");
if (ob)
ob.onclick = function () { cwsOpenBoard(); };
};
})(window.wcPaintBoard);
}
if (typeof sayOver === "function") {
window.sayOver = (function (orig) { return function (id, text) { if (cwsMuted()[id] || cwsBlocked()[id])
return; return orig(id, text); }; })(window.sayOver);
}
function cwsBubbleOn() {
var v = null;
try {
v = localStorage.getItem("somnu.bubble");
}
catch (e) { }
if (v === "1")
return true;
if (v === "0")
return false;
return typeof AGE !== "undefined" && AGE && AGE.known && !AGE.adult;
}
function cwsBubbleSet(on) { try {
localStorage.setItem("somnu.bubble", on ? "1" : "0");
}
catch (e) { } if (!on)
cwsBubbleShowAll(); }
function cwsBubbleShowAll() { Object.keys(CWS.hid).forEach(function (id) { var p = presenceOthers[id]; if (p && p.group)
p.group.visible = true; }); CWS.hid = {}; }
function cwsBubbleTick() {
if (typeof presenceOthers === "undefined" || typeof camera === "undefined" || !camera)
return;
if (!cwsBubbleOn() || !presenceActive) {
if (Object.keys(CWS.hid).length)
cwsBubbleShowAll();
return;
}
var P = camera.position;
for (var id in presenceOthers) {
var p = presenceOthers[id], g = p && p.group;
if (!g)
continue;
var d = Math.hypot(g.position.x - P.x, g.position.z - P.z), near = Math.abs(g.position.y - (P.y - 1.6)) < 2.5;
if (!CWS.hid[id] && near && d < 1.3 && !cwsFriend(id) && g.visible) {
g.visible = false;
CWS.hid[id] = 1;
}
else if (CWS.hid[id] && (d > 1.8 || !near)) {
g.visible = true;
delete CWS.hid[id];
}
}
for (var k in CWS.hid)
if (!presenceOthers[k])
delete CWS.hid[k];
}
setInterval(function () { try {
cwsBubbleTick();
}
catch (e) { } }, 250);
var CWS_RC = null;
function cwsPick(nx, ny, maxD) { return __ZC(428, 9, this, arguments, new.target); }
function cwsCanPick() { return typeof walkMode !== "undefined" && walkMode && typeof presenceActive !== "undefined" && presenceActive && !(typeof WLD !== "undefined" && WLD && WLD.on === "battle"); }
addEventListener("pointerdown", function (e) {
if (!e.isPrimary || !cwsCanPick())
return;
var cv = typeof renderer !== "undefined" && renderer && renderer.domElement;
if (!cv || e.target !== cv)
return;
if (document.pointerLockElement) {
if (e.button !== 0)
return;
var id = cwsPick(0, 0, 6);
if (id)
setTimeout(function () { cwsOpen(id); }, 0);
return;
}
CWS.tap = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId };
}, true);
addEventListener("pointerup", function (e) {
var T = CWS.tap;
CWS.tap = null;
if (!T || e.pointerId !== T.id || !cwsCanPick())
return;
if (Math.hypot(e.clientX - T.x, e.clientY - T.y) > 10 || performance.now() - T.t > 400)
return;
var cv = renderer.domElement, r = cv.getBoundingClientRect();
var id = cwsPick((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1, 30);
if (id)
cwsOpen(id);
}, true);
addEventListener("keydown", function (e) { if (e.key === "Escape" && CWS.card)
cwsClose(); });
setInterval(function () {
if (typeof presenceActive === "undefined" || !presenceActive || !CWS.server)
return;
cwsLoadMe(false);
if (CWS.mod)
cwsLoadBoard(false);
}, 20000);
var CWS_OUT = null;
function cwsThrownOut(kind, detail, hint) { return __ZC(428, 10, this, arguments, new.target); }
(function () {
if (!window.fetch || window.fetch.__cwsOut)
return;
var f0 = window.fetch;
var f1 = function () {
return f0.apply(this, arguments).then(function (r) {
if (r && !r.ok && r.status >= 400 && r.status < 500 && !CWS_OUT) {
try {
r.clone().text().then(function (t) {
if (t && t.indexOf("SM_") >= 0) {
var j = null;
try {
j = JSON.parse(t);
}
catch (e) { }
var m = j && j.message;
if (m === "SM_KICKED" || m === "SM_CLOSED")
cwsThrownOut(m, j.details || "", j.hint || "");
}
}).catch(function () { });
}
catch (e) { }
}
return r;
});
};
f1.__cwsOut = true;
window.fetch = f1;
})();
