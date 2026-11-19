/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SESSKEY = "dreamwalker.session", session = null;
function authUrl(path) { return DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/auth/v1/" + path; }
function authHeaders(tok) {
var h = { "Content-Type": "application/json", apikey: DW_CONFIG.supabaseKey || "" };
if (tok)
h.Authorization = "Bearer " + tok;
return h;
}
function loadSession() {
try {
session = JSON.parse(localStorage.getItem(SESSKEY) || "null");
}
catch (e) {
session = null;
}
return session;
}
function keepSession(s) {
session = s;
try {
s ? localStorage.setItem(SESSKEY, JSON.stringify(s)) : localStorage.removeItem(SESSKEY);
}
catch (e) { }
showAccount();
}
function signedIn() { return !!(session && session.access_token); }
function myEmail() { return session && session.user ? session.user.email : ""; }
function authPost(path, body, tok) { return authCall("POST", path, body, tok); }
function authCall(method, path, body, tok) {
return fetch(authUrl(path), { method: method, headers: authHeaders(tok), body: method === "GET" ? undefined : JSON.stringify(body || {}) })
.then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return r.ok ? j : Promise.reject(j); }); });
}
function hereUrl() { return String(location.href).split("#")[0]; }
var refreshing = null;
function freshToken() { return __ZC(83, 0, this, arguments, new.target); }
var KEY_NEVER_SOLD = /^dream_(key_|crown$|gate_token$)/;
function keyNeverSold(t) {
if (!t)
return false;
if (typeof t === "string")
return /Dream Key|Dreamer's Crown|Gatewalker's Token/i.test(t);
return KEY_NEVER_SOLD.test(String(t.archetype || "")) || keyNeverSold(String(t.name || ""));
}
function catalogueRows() {
return catalogueRowsAll().then(function (rows) {
return Array.isArray(rows) ? rows.filter(function (r) { return !keyNeverSold(r); }) : rows;
});
}
function catalogueRead(q, board) { return __ZC(83, 1, this, arguments, new.target); }
function catalogueRowsAll() {
return catalogueRead("select=id,kind,archetype,name,price,speed,note&or=(listed.is.null,listed.eq.true)", true);
}
function accountMsg(t, bad) {
var e = document.getElementById("acc-msg");
if (!e)
return;
e.textContent = t || "";
e.style.color = bad ? "#C0603A" : "var(--dim)";
}
function createAccount() { return __ZC(83, 2, this, arguments, new.target); }
function signIn() { return __ZC(83, 3, this, arguments, new.target); }
function signOut() {
if (typeof vaultKey !== "undefined")
vaultKey = null;
var tok = session && session.access_token;
keepSession(null);
accountMsg("Signed out. Your journal stays on this device.");
if (tok)
authPost("logout", {}, tok).catch(function () { });
}
function resetPassword() { return __ZC(83, 4, this, arguments, new.target); }
function authWords(e) { return __ZC(83, 5, this, arguments, new.target); }
function showAccount() {
if (typeof syncStatus === "function")
setTimeout(syncStatus, 0);
if (typeof refreshAccess === "function")
setTimeout(refreshAccess, 100);
if (typeof refreshStanding === "function")
setTimeout(function () { refreshStanding(); loadOffice(); }, 50);
if (typeof checkKeeper === "function")
setTimeout(function () { if (signedIn())
checkKeeper();
else
deskStanding = null; }, 200);
setTimeout(ageRefresh, 300);
var out = document.getElementById("acc-out"), inn = document.getElementById("acc-in");
if (!out || !inn)
return;
var on = signedIn();
out.style.display = on ? "none" : "block";
inn.style.display = on ? "block" : "none";
var who = document.getElementById("acc-who");
if (who && on)
who.textContent = myEmail() || "signed in";
}
function openAccountForm() { return __ZC(83, 6, this, arguments, new.target); }
function accPanel(id, html) { return __ZC(83, 7, this, arguments, new.target); }
var ACC_IN = "width:100%;margin-top:8px;background:#07080B;border:1px solid var(--line);color:var(--bone);padding:8px 10px;border-radius:2px;font:14px var(--sans)";
function readAuthHash() {
var h = String(location.hash || "").replace(/^#/, "");
if (!/(^|&)(access_token|error)=/.test(h))
return null;
var q = {};
h.split("&").forEach(function (kv) { var i = kv.indexOf("="); if (i > 0)
q[decodeURIComponent(kv.slice(0, i))] = decodeURIComponent(kv.slice(i + 1).replace(/\+/g, " ")); });
try {
history.replaceState(null, "", hereUrl());
}
catch (e) {
location.hash = "";
}
return q;
}
function signInFromLink(q) {
return authCall("GET", "user", null, q.access_token).then(function (u) {
keepSession({ access_token: q.access_token, refresh_token: q.refresh_token, user: u, at: Date.now() });
return u;
});
}
function handleAuthLink() {
var q = readAuthHash();
if (!q)
return;
if (q.error) {
var why = /expired/i.test(q.error_code || q.error_description || "") ? "That link has run out. Ask for a new one with Forgot it."
: (q.error_description || "That link didn't work.");
if (typeof setStatus === "function")
setStatus(esc(why));
return accountMsg(why, true);
}
if (q.type === "recovery")
return newPasswordPanel(q);
signInFromLink(q).then(function () {
var say = q.type === "email_change" ? "Your new email address is confirmed." : "Your email is confirmed, and you are signed in.";
accountMsg(say);
if (typeof setStatus === "function")
setStatus("<b>" + say + "</b>" + (q.type === "signup" ? ' Here for the investor data room? <a href="dataroom.html">Open it</a>.' : ""));
}).catch(function (e) { accountMsg(authWords(e), true); });
}
function newPasswordPanel(q) { return __ZC(83, 8, this, arguments, new.target); }
function changeEmail() { return __ZC(83, 9, this, arguments, new.target); }
function changePassword() { return __ZC(83, 10, this, arguments, new.target); }
function deleteAccountPanel() { return __ZC(83, 11, this, arguments, new.target); }
function deleteMyAccount() { return __ZC(83, 12, this, arguments, new.target); }
function accountExtras() {
var inn = document.getElementById("acc-in");
if (!inn || document.getElementById("acc-more"))
return;
var d = document.createElement("div");
d.id = "acc-more";
d.style.cssText = "margin-top:12px";
d.innerHTML =
"<input id='acc-newemail' type='email' placeholder='a new email address' autocomplete='email'>" +
"<div class='row' style='margin-top:8px;gap:8px;flex-wrap:wrap'><button class='btn' id='acc-chemail' type='button'>Change email</button></div>" +
"<input id='acc-newpass-in' type='password' placeholder='a new password' autocomplete='new-password' style='margin-top:10px'>" +
"<div class='row' style='margin-top:8px;gap:8px;flex-wrap:wrap'><button class='btn' id='acc-chpass' type='button'>Change password</button>" +
"<button class='btn' id='acc-delete-btn' type='button' style='color:#C0603A'>Delete my account</button></div>";
inn.appendChild(d);
document.getElementById("acc-chemail").onclick = changeEmail;
document.getElementById("acc-chpass").onclick = changePassword;
document.getElementById("acc-delete-btn").onclick = deleteAccountPanel;
}
function initAccount() {
loadSession();
accountExtras();
showAccount();
var w = document.getElementById("wipebtn");
if (w) {
w.textContent = "Erase this device";
w.title = "Clears the dreams kept in this browser only. Your account, and anything kept to it, stay as they are.";
}
try {
handleAuthLink();
}
catch (e) { }
var b;
if ((b = document.getElementById("acc-signin")))
b.onclick = signIn;
if ((b = document.getElementById("acc-create")))
b.onclick = createAccount;
if ((b = document.getElementById("acc-forgot")))
b.onclick = resetPassword;
if ((b = document.getElementById("acc-signout")))
b.onclick = signOut;
if (signedIn())
freshToken();
}
var AGE = { known: false, set: false, adult: false, blocked: false, deleting: false, missing: false, asking: false, askedAt: 0, told: false };
function ageYears(iso) { return __ZC(83, 13, this, arguments, new.target); }
function ageDobCheck(v) { return __ZC(83, 14, this, arguments, new.target); }
function ageAdult() { if (!signedIn())
return false; if (AGE.missing)
return true; return AGE.known && AGE.adult; }
function ageHold() { return signedIn() && AGE.known && !AGE.missing && (!AGE.set || AGE.blocked || AGE.deleting); }
function ageRefresh() {
if (!signedIn()) {
AGE.known = AGE.set = AGE.adult = AGE.blocked = AGE.deleting = AGE.told = false;
return;
}
if (typeof cityRpc !== "function") {
setTimeout(ageRefresh, 1000);
return;
}
if (AGE.asking)
return;
AGE.asking = true;
cityRpc("my_age", {}).then(function (a) {
AGE.asking = false;
if (!a || !a.ok)
return;
AGE.known = true;
AGE.missing = false;
AGE.set = !!a.set;
AGE.adult = !!a.adult;
AGE.blocked = !!a.blocked;
AGE.deleting = !!a.deleting;
if (typeof paintBank === "function")
paintBank();
if (AGE.deleting)
ageGoneCard();
else if (AGE.blocked)
ageBlockedCard();
else if (!AGE.set)
ageAsk(true);
}).catch(function (e) {
AGE.asking = false;
if (/my_age|Could not find|PGRST202|404/.test(String((e && e.message) || e))) {
AGE.known = true;
AGE.missing = true;
if (typeof paintBank === "function")
paintBank();
}
});
}
function ageAsk(force) { return __ZC(83, 15, this, arguments, new.target); }
function ageBlockedCard(say) { return __ZC(83, 16, this, arguments, new.target); }
function ageGoneCard() { return __ZC(83, 17, this, arguments, new.target); }
