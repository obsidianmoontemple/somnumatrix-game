/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(230, function () {
"use strict";
return [
function () {
if (TGATE.ready)
return;
var now = Date.now();
if (TGATE.dom && !TGATE.city && !(typeof joinedSomnucor === "function" && joinedSomnucor()) && now - TGATE.dom > 300) {
TGATE.city = true;
TGATE.cityAt = now;
tgateMark("city");
}
if (TGATE.city) {
var m = TGATE.mgr, f = m.total ? m.done / m.total : 1;
tgateSet(82 + 16 * f, "Dressing the world…");
var settled = (!m.total || m.done >= m.total) && (!m.idle || now - m.idle > 700);
if (settled && now - TGATE.cityAt > 600 || now - TGATE.cityAt > 2000 || TGATE.dom && now - TGATE.dom > 45000) {
TGATE.ready = true;
tgateSet(100, "Ready");
tgateReady();
return;
}
}
setTimeout(tgateTick, 200);
},
function (kind) {
var em = (tgateEl("tg-email").value || "").trim(), pw = tgateEl("tg-pass").value || "";
if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(em)) {
tgateMsg("That doesn't look like an email address.", true);
return;
}
if (!TGATE.ready) {
TGATE.pend = kind;
tgateMsg("Got it. You'll be signed in the moment the game is ready\u2026");
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
tgateMark("press");
if (!TGATE.ready) {
TGATE.want = true;
tgateWaitWords();
return;
}
TGATE.entered = true;
tgateMark("in");
var s = tgateEl("tg-splash");
if (!s)
return;
s.classList.add("tg-out");
setTimeout(function () { if (s.parentNode)
s.parentNode.removeChild(s); }, 1000);
if (signedIn() && typeof setStatus === "function")
setStatus("<b>Welcome back, " + esc(tgateName()) + ".</b>");
var tl = tgateTimes();
if (tl && typeof setStatus === "function")
setTimeout(function () { try {
setStatus((signedIn() ? "<b>Welcome back, " + esc(tgateName()) + ".</b> " : "") + "<span style='opacity:.8;font-size:.9em'>" + esc(tl) + "</span>");
}
catch (e) { } }, 1200);
}
];
});
