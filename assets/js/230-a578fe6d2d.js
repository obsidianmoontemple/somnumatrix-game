/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TGATE = { pct: 4, city: false, cityAt: 0, dom: 0, mgr: { done: 0, total: 0, idle: 0 }, ready: false, shown: false, entered: false, google: null, t0: Date.now() };
function tgateSkip() {
if (/[?&]gate=1\b/.test(location.search))
return false;
return (typeof DW_TESTING !== "undefined" && DW_TESTING) || /[?&]nogate=1\b/.test(location.search) || !!(navigator && navigator.webdriver);
}
function tgateEl(id) { return document.getElementById(id); }
function tgateSet(p, words) {
TGATE.pct = Math.max(TGATE.pct, Math.min(100, p));
var bar = tgateEl("tg-bar"), fill = tgateEl("tg-fill"), w = tgateEl("tg-words");
if (bar)
bar.classList.remove("tg-wait");
if (fill)
fill.style.transform = "translateX(" + (Math.round(TGATE.pct) - 100) + "%)";
if (w && words)
w.textContent = words + " " + Math.round(TGATE.pct) + "%";
if (TGATE.want && !TGATE.ready) {
var en = tgateEl("tg-enter");
if (en)
en.textContent = "Getting ready\u2026 " + Math.round(TGATE.pct) + "%";
}
}
if (typeof atlProgressLine === "function") {
var tgateProgBase = atlProgressLine;
atlProgressLine = function (f, words) { if (!TGATE.city)
tgateSet(40 + 42 * Math.max(0, Math.min(1, f)), "Raising Somnucor…"); return tgateProgBase.apply(this, arguments); };
}
if (typeof atlBuildCityAsync === "function") {
var tgateCityBase = atlBuildCityAsync;
atlBuildCityAsync = function (done, prog) {
var a = Array.prototype.slice.call(arguments);
a[0] = function () { try {
return done && done.apply(this, arguments);
}
finally {
TGATE.city = true;
TGATE.cityAt = Date.now();
tgateMark("city");
} };
return tgateCityBase.apply(this, a);
};
}
(function () {
var M = typeof THREE !== "undefined" && THREE.DefaultLoadingManager;
if (!M)
return;
var s0 = M.onStart, p0 = M.onProgress, l0 = M.onLoad;
M.onStart = function (u, d, t) { TGATE.mgr.done = d; TGATE.mgr.total = t; TGATE.mgr.idle = 0; if (s0)
s0.apply(this, arguments); };
M.onProgress = function (u, d, t) { TGATE.mgr.done = d; TGATE.mgr.total = t; TGATE.mgr.idle = d >= t ? Date.now() : 0; if (p0)
p0.apply(this, arguments); };
M.onLoad = function () { TGATE.mgr.idle = Date.now(); if (l0)
l0.apply(this, arguments); };
})();
tgateSet(window.TGLOAD ? TGLOAD.pct() : 30, window.TGLOAD && TGLOAD.n >= TGLOAD.N ? "Setting up the world…" : window.TGLOAD ? "Loading the game…" : "Waking the dream…");
if (!window.TGLOAD)
(function () { var iv = setInterval(function () { if (TGATE.dom || TGATE.entered) {
clearInterval(iv);
return;
} tgateSet(Math.min(37.9, TGATE.pct + Math.max(0.15, (37 - TGATE.pct) * 0.06)), "Waking the dream…"); }, 250); })();
function tgateTick() { return __ZC(230, 0, this, arguments, new.target); }
var TGATE_CSS = "#tg-card{margin:26px auto 0;width:min(360px,100%);text-align:left;font:15px/1.5 ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#F4EEFF;opacity:0;transform:translateY(8px);transition:opacity .7s ease,transform .7s ease}" +
"#tg-card.tg-on{opacity:1;transform:none}" +
"#tg-card .tg-box{background:rgba(34,26,64,.78);border:1px solid rgba(255,255,255,.18);border-radius:20px;padding:18px 18px 14px;box-shadow:0 12px 40px rgba(10,6,30,.45)}" +
"#tg-card h2{margin:0 0 4px;font:500 21px 'Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif;text-align:center}" +
"#tg-card .tg-hint{margin:0 0 12px;text-align:center;color:#CFC3EE;font-size:13px}" +
"#tg-card button{font:inherit;cursor:pointer;border:0;border-radius:999px;padding:11px 16px;width:100%;display:flex;align-items:center;justify-content:center;gap:10px}" +
"#tg-card .tg-g{background:#fff;color:#2D2440;font-weight:600}" +
"#tg-card .tg-main{background:linear-gradient(90deg,#B79BFF,#F7B6DA);color:#24163F;font-weight:700;margin-top:10px}" +
"#tg-card .tg-soft{background:rgba(255,255,255,.12);color:#F4EEFF;margin-top:8px}" +
"#tg-card input{width:100%;box-sizing:border-box;margin-top:8px;padding:11px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.22);background:rgba(12,10,32,.55);color:#fff;font:inherit;outline:none}" +
"#tg-card input:focus{border-color:#C8B3FF;box-shadow:0 0 0 3px rgba(183,155,255,.25)}" +
"#tg-card .tg-or{display:flex;align-items:center;gap:10px;margin:14px 0 4px;color:#BBAEDD;font-size:12px;text-transform:uppercase;letter-spacing:.12em}" +
"#tg-card .tg-or:before,#tg-card .tg-or:after{content:'';flex:1;height:1px;background:rgba(255,255,255,.18)}" +
"#tg-card .tg-links{display:flex;justify-content:space-between;gap:8px;margin-top:10px;font-size:13px}" +
"#tg-card a{color:#E6D9FF;text-decoration:underline;text-underline-offset:3px;cursor:pointer}" +
"#tg-card .tg-msg{min-height:20px;margin-top:8px;font-size:13px;text-align:center;color:#E9DEFF}" +
"#tg-card .tg-msg.bad{color:#FFB4C2}" +
"#tg-card .tg-look{display:block;text-align:center;margin-top:14px;font-size:14px}" +
"#tg-card .tg-new{margin:0 0 12px;padding:9px 11px;border-radius:12px;background:rgba(232,198,106,.10);border:1px solid rgba(232,198,106,.35);font-size:13px;color:#EDE3C8}" +
"#tg-card .tg-new b{color:#F2D27A;font-weight:600}" +
"#tg-card details.tg-how{margin-top:10px;font-size:13px;color:#DCD1F5}" +
"#tg-card details.tg-how summary{cursor:pointer;text-align:center;color:#E6D9FF;text-decoration:underline;text-underline-offset:3px}" +
"#tg-card details.tg-how ol{margin:8px 0 2px;padding-left:20px}#tg-card details.tg-how li{margin:3px 0}";
var TGATE_G = '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
function tgateWords(e) { return (e instanceof TypeError || /fetch|network/i.test(String(e && e.message || ""))) ? "We can't reach the sign-in desk just now. Check your connection and try again." : authWords(e); }
function tgateMsg(t, bad) { var m = tgateEl("tg-msg"); if (!m)
return; m.textContent = t || ""; m.className = "tg-msg" + (bad ? " bad" : ""); }
function tgateName() {
var u = session && session.user, md = u && u.user_metadata || {};
var n = md.full_name || md.name || "";
if (!n && u && u.email)
n = u.email.split("@")[0];
return String(n).split(" ")[0] || "dreamer";
}
function tgateMark(k) { try {
if (!TGATE.pt)
TGATE.pt = {};
if (TGATE.pt[k] == null)
TGATE.pt[k] = performance.now();
}
catch (e) { } }
function tgateTimes() {
try {
var P = TGATE.pt || {}, nv = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || {}, s = function (v) { return v == null ? "\u2013" : (v / 1000).toFixed(1) + " s"; };
var row = { at: new Date().toISOString(), page: nv.responseEnd, first: window.TGLOAD && TGLOAD.first, card: P.card, code: nv.domContentLoadedEventStart, city: P.city, ready: P.ready, press: P.press, in: P["in"],
app: /SomnuMatrixDesktop|Electron/.test(navigator.userAgent) ? "pc app" : (/Mobi|Android/.test(navigator.userAgent) ? "phone" : "browser"),
helper: !!(navigator.serviceWorker && navigator.serviceWorker.controller) };
try {
var L = JSON.parse(localStorage.getItem("somnu_open_times") || "[]");
L.unshift(row);
localStorage.setItem("somnu_open_times", JSON.stringify(L.slice(0, 10)));
}
catch (e) { }
try {
if (typeof openTimesShow === "function")
openTimesShow();
}
catch (e) { }
return "Opened in " + s(row["in"]) + ": page " + s(row.page) + " \u00b7 first file " + s(row.first) + " \u00b7 sign-in card " + s(row.card) + " \u00b7 game code " + s(row.code) + " \u00b7 city " + s(row.city) + " \u00b7 ready " + s(row.ready) + (row.press != null ? " \u00b7 you pressed " + s(row.press) : "");
}
catch (e) {
return "";
}
}
function tgateReady() {
tgateMark("ready");
if (TGATE.pendOut) {
TGATE.pendOut = false;
TGATE.want = false;
try {
signOut();
tgateDraw();
}
catch (e) { }
}
if (TGATE.pend) {
var pk = TGATE.pend;
TGATE.pend = null;
try {
tgateEmail(pk);
}
catch (e) { }
}
TGATE.drawAt = 0;
if (!TGATE.shown)
tgateCard();
if (TGATE.want)
tgateEnter();
else
tgateWaitWords();
}
function tgateWaitWords() {
var e = tgateEl("tg-enter");
if (e)
e.textContent = TGATE.want && !TGATE.ready ? "Getting ready\u2026 " + Math.round(TGATE.pct) + "%" : "Enter the dream";
var l = tgateEl("tg-look");
if (l)
l.textContent = TGATE.want && !TGATE.ready ? "Getting ready\u2026" : "Just look around first";
if (TGATE.want && !TGATE.ready && !e && signedIn())
tgateMsg("Signed in. Getting ready\u2026 you go in the moment it is.");
}
function tgateCard() {
if (TGATE.shown)
return;
TGATE.shown = true;
tgateMark("card");
var load = tgateEl("tg-load");
if (load)
load.classList.add("tg-small");
if (!tgateEl("tg-css")) {
var c = document.createElement("style");
c.id = "tg-css";
c.textContent = TGATE_CSS;
document.head.appendChild(c);
}
tgateDraw();
try {
authCall("GET", "settings").then(function (j) {
TGATE.google = !!(j && j.external && j.external.google);
if (TGATE.google === false && !signedIn()) {
var g = tgateEl("tg-google");
if (g) {
var o = g.nextElementSibling;
if (o && o.className === "tg-or")
o.remove();
g.remove();
}
}
}).catch(function () { TGATE.google = null; });
}
catch (e) { }
}
function tgateDraw() {
var card = tgateEl("tg-card");
if (!card)
return;
if (signedIn()) {
card.innerHTML = '<div class="tg-box"><h2>Welcome back, ' + esc(tgateName()) + '</h2>' +
'<p class="tg-hint">Your dreams and your place in Somnucor are waiting.</p>' +
'<button class="tg-main" id="tg-enter" type="button">Enter the dream</button>' +
'<div class="tg-links" style="justify-content:center"><a id="tg-out">Not you? Sign out</a></div></div>';
}
else {
card.innerHTML = '<div class="tg-box"><h2>Welcome, dreamer</h2>' +
'<p class="tg-hint">Sign in to keep your dreams, your home and your gold.</p>' +
'<div class="tg-new"><b>New here?</b> Type your email, choose a password (10 or more letters or numbers) and press <b>Create an account</b>. Already have one? Press <b>Sign in</b>.</div>' +
(TGATE.google === false ? '' : '<button class="tg-g" id="tg-google" type="button">' + TGATE_G + '<span>Continue with Google</span></button>' +
'<div class="tg-or">or</div>') +
'<input id="tg-email" type="email" placeholder="Your email" autocomplete="email" inputmode="email">' +
'<input id="tg-pass" type="password" placeholder="Your password" autocomplete="current-password">' +
'<button class="tg-main" id="tg-signin" type="button">Sign in</button>' +
'<div id="tg-dobrow" style="display:none;margin-top:12px"><label for="tg-dob" style="font-size:13px;color:#CFC3EE">Your date of birth (under 13 needs a sign-up code from a parent or teacher)</label>' +
'<input id="tg-dob" type="date" autocomplete="bday" style="margin-top:4px;color-scheme:dark"></div>' +
'<button class="tg-soft" id="tg-create" type="button">Create an account</button>' +
'<div style="margin-top:8px;font-size:12px;color:#CFC3EE;text-align:center">Making an account means you agree to the <a href="terms.html" target="_blank" rel="noopener">terms of use</a>.</div>' +
'<div class="tg-links"><a id="tg-forgot">Forgot your password?</a></div>' +
'<div class="tg-msg" id="tg-msg"></div>' +
'<details class="tg-how"><summary>How signing up works</summary><ol>' +
'<li>Type your email and choose a password.</li>' +
'<li>Press <b>Create an account</b>, fill in your date of birth, and press it again. You must be 13 or older.</li>' +
'<li>Open the letter we email you and press its link.</li>' +
'<li>Come back, type the same email and password, and press <b>Sign in</b>.</li>' +
'<li>A short guide then shows you how to play. It is in <b>☰ Menu › 📖 How to play</b> any time.</li></ol>' +
'<div>On each new device (a phone, a computer, a Quest 2 headset) sign in once and it remembers you.</div></details></div>' +
'<a class="tg-look" id="tg-look">Just look around first</a>';
}
requestAnimationFrame(function () { card.classList.add("tg-on"); });
var on = function (id, f) { var b = tgateEl(id); if (b)
b.onclick = f; };
on("tg-enter", tgateEnter);
on("tg-look", tgateEnter);
on("tg-out", function () { if (!TGATE.ready) {
TGATE.pendOut = true;
var o = tgateEl("tg-out");
if (o)
o.textContent = "Signing out when the game is ready\u2026";
return;
} signOut(); tgateDraw(); });
on("tg-google", tgateGoogle);
on("tg-signin", function () { tgateEmail("in"); });
on("tg-create", function () { tgateEmail("new"); });
on("tg-forgot", function () { tgateEmail("forgot"); });
var pw = tgateEl("tg-pass");
if (pw)
pw.onkeydown = function (e) { if (e.key === "Enter")
tgateEmail("in"); };
tgateWaitWords();
}
function tgateGoogle() {
if (TGATE.google === false) {
tgateMsg("Google sign-in is not open yet. Please use your email for now.", true);
return;
}
tgateMsg("Taking you to Google…");
location.href = authUrl("authorize?provider=google&redirect_to=" + encodeURIComponent(hereUrl()));
}
function tgateEmail(kind) { return __ZC(230, 1, this, arguments, new.target); }
function tgateEnter() { return __ZC(230, 2, this, arguments, new.target); }
(function () {
var s = tgateEl("tg-splash");
if (!s)
return;
if (tgateSkip()) {
s.parentNode.removeChild(s);
TGATE.ready = TGATE.entered = true;
return;
}
["keydown", "keyup", "keypress"].forEach(function (k) { s.addEventListener(k, function (e) { e.stopPropagation(); }); });
["keydown", "keyup"].forEach(function (k) { window.addEventListener(k, function (e) { if (!TGATE.entered && !s.contains(e.target))
e.stopImmediatePropagation(); }, true); });
["pointerdown", "mousedown", "touchstart", "wheel"].forEach(function (k) { s.addEventListener(k, function (e) { e.stopPropagation(); }, { passive: true }); });
var go = function () {
TGATE.dom = Date.now();
tgateSet(38, "Waking the dream…");
setTimeout(tgateTick, 200);
try {
if (typeof renderView === "function" && !TGATE.entered) {
var rv0 = renderView;
TGATE.drawAt = 0;
renderView = function () {
if (!TGATE.entered) {
if (!TGATE.city && !TGATE.ready)
return;
var nw = performance.now();
if (nw - TGATE.drawAt < 1000)
return;
TGATE.drawAt = nw;
}
return rv0.apply(this, arguments);
};
}
}
catch (e) { }
try {
var cd = tgateEl("tg-card"), busy = cd && (cd.contains(document.activeElement) || [].some.call(cd.querySelectorAll("input"), function (i) { return !!i.value; }));
if (TGATE.shown && !busy)
tgateDraw();
}
catch (e) { }
};
try {
if (typeof loadSession === "function" && !session)
loadSession();
tgateCard();
}
catch (e) { }
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", go);
else
go();
})();
