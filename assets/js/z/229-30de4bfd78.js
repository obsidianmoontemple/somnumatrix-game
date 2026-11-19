/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(229, function () {
"use strict";
return [
function () {
if (TGATE.ready)
return;
var now = Date.now();
if (TGATE.dom && !TGATE.city && !(typeof joinedSomnucor === "function" && joinedSomnucor()) && now - TGATE.dom > 300) {
TGATE.city = true;
TGATE.cityAt = now;
}
if (TGATE.city) {
var m = TGATE.mgr, f = m.total ? m.done / m.total : 1;
tgateSet(82 + 16 * f, "Dressing the world…");
var settled = (!m.total || m.done >= m.total) && (!m.idle || now - m.idle > 700);
if (settled && now - TGATE.cityAt > 600 || now - TGATE.cityAt > 15000 || TGATE.dom && now - TGATE.dom > 45000) {
TGATE.ready = true;
tgateSet(100, "Ready");
setTimeout(tgateCard, 350);
return;
}
}
setTimeout(tgateTick, 200);
},
function () {
if (TGATE.shown)
return;
TGATE.shown = true;
var load = tgateEl("tg-load");
if (load)
load.style.display = "none";
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
},
function () {
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
on("tg-out", function () { signOut(); tgateDraw(); });
on("tg-google", tgateGoogle);
on("tg-signin", function () { tgateEmail("in"); });
on("tg-create", function () { tgateEmail("new"); });
on("tg-forgot", function () { tgateEmail("forgot"); });
var pw = tgateEl("tg-pass");
if (pw)
pw.onkeydown = function (e) { if (e.key === "Enter")
tgateEmail("in"); };
},
function (kind) {
var em = (tgateEl("tg-email").value || "").trim(), pw = tgateEl("tg-pass").value || "";
if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(em)) {
tgateMsg("That doesn't look like an email address.", true);
return;
}
if (kind === "forgot") {
authPost("recover?redirect_to=" + encodeURIComponent(hereUrl()), { email: em }).then(function () { tgateMsg("If that address has an account, a letter is on its way."); })
.catch(function (e) { tgateMsg(tgateWords(e), true); });
return;
}
if (!pw) {
tgateMsg("Your password, please.", true);
return;
}
if (kind === "new" && pw.length < 10) {
tgateMsg("Use at least ten characters for the password.", true);
return;
}
var keep = function (j) { keepSession({ access_token: j.access_token, refresh_token: j.refresh_token, user: j.user, at: Date.now() }); };
if (kind === "new") {
var row = tgateEl("tg-dobrow");
if (row && row.style.display === "none") {
row.style.display = "block";
tgateMsg("Your date of birth, please, then press Create an account again.");
var di = tgateEl("tg-dob");
if (di)
di.focus();
return;
}
var dob = ageDobCheck((tgateEl("tg-dob") || {}).value);
if (!dob.ok) {
tgateMsg(dob.say, true);
return;
}
tgateMsg("Making your account…");
authPost("signup?redirect_to=" + encodeURIComponent(hereUrl()), { email: em, password: pw, data: dob.code ? { birthdate: dob.date, young_code: dob.code } : { birthdate: dob.date } }).then(function (j) {
if (j.access_token) {
keep(j);
tgateEnter();
}
else
tgateMsg("Account made! Now open the letter we just emailed you and press its link. Then come back here and press Sign in.");
}).catch(function (e) { tgateMsg(tgateWords(e), true); });
return;
}
tgateMsg("Signing in…");
authPost("token?grant_type=password", { email: em, password: pw }).then(function (j) { keep(j); tgateEnter(); })
.catch(function (e) { tgateMsg(tgateWords(e), true); });
},
function () {
if (TGATE.entered)
return;
TGATE.entered = true;
var s = tgateEl("tg-splash");
if (!s)
return;
s.classList.add("tg-out");
setTimeout(function () { if (s.parentNode)
s.parentNode.removeChild(s); }, 1000);
if (signedIn() && typeof setStatus === "function")
setStatus("<b>Welcome back, " + esc(tgateName()) + ".</b>");
}
];
});
