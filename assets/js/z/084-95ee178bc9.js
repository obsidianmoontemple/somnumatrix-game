/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(84, function () {
"use strict";
return [
function (q, board) {
var base = DW_CONFIG.supabaseUrl.replace(/\/+$/, ""), PAGE = 1000;
function pages(tok, viaBoard) {
var out = [], seen = {}, first = 0;
function one(from, n) {
var tail = "order=kind,price,id&offset=" + from + "&limit=" + PAGE, h = { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + (tok || DW_CONFIG.supabaseKey) };
var go = viaBoard ? fetch(base + "/rest/v1/rpc/catalogue_board?" + tail, { method: "POST", headers: Object.assign({ "Content-Type": "application/json" }, h), body: "{}" })
: fetch(base + "/rest/v1/catalogue?" + q + "&" + tail, { headers: h });
return go.then(function (r) { return r.ok ? r.json() : r.text().then(function (t) { throw new Error(t || ("catalogue " + r.status)); }); }).then(function (rows) {
rows = Array.isArray(rows) ? rows : [];
rows.forEach(function (r) { var k = r && r.id != null ? "#" + r.id : null; if (k && seen[k])
return; if (k)
seen[k] = 1; out.push(r); });
if (!n)
first = rows.length;
if (!rows.length || rows.length < first || n >= 30)
return out;
return one(from + rows.length, n + 1);
});
}
return one(0, 0);
}
var viaBoard = (board || q == null) && typeof signedIn === "function" && signedIn() ? freshToken().then(function (tok) { return pages(tok, true); }) : Promise.reject(new Error("no board"));
if (q == null)
return viaBoard;
return viaBoard.catch(function () { return freshToken().then(function (tok) { return pages(tok, false); }); });
},
function () {
var em = (document.getElementById("acc-email").value || "").trim(), pw = document.getElementById("acc-pass").value || "";
if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(em))
return accountMsg("That doesn't look like an email address.", true);
if (pw.length < 8)
return accountMsg("Use at least eight characters for the password.", true);
var dob = ageDobCheck((document.getElementById("acc-dob") || {}).value);
if (!dob.ok)
return accountMsg(dob.say, true);
accountMsg("Making your account\u2026");
authPost("signup?redirect_to=" + encodeURIComponent(hereUrl()), { email: em, password: pw, data: dob.code ? { birthdate: dob.date, young_code: dob.code } : { birthdate: dob.date } }).then(function (j) {
if (j.access_token) {
keepSession({ access_token: j.access_token, refresh_token: j.refresh_token, user: j.user, at: Date.now() });
accountMsg("You have an account, and you are signed in.");
}
else
accountMsg("Account made. Check your email to confirm it, then sign in.");
}).catch(function (e) { accountMsg(authWords(e), true); });
},
function () {
var em = (document.getElementById("acc-email").value || "").trim(), pw = document.getElementById("acc-pass").value || "";
if (!em || !pw)
return accountMsg("Your email and password, please.", true);
accountMsg("Signing in\u2026");
authPost("token?grant_type=password", { email: em, password: pw }).then(function (j) {
keepSession({ access_token: j.access_token, refresh_token: j.refresh_token, user: j.user, at: Date.now() });
accountMsg("Signed in.");
document.getElementById("acc-pass").value = "";
}).catch(function (e) { accountMsg(authWords(e), true); });
},
function () {
var em = (document.getElementById("acc-email").value || "").trim();
if (!em)
return accountMsg("Put your email in first.", true);
authPost("recover?redirect_to=" + encodeURIComponent(hereUrl()), { email: em }).then(function () { accountMsg("If that address has an account, a letter is on its way."); })
.catch(function (e) { accountMsg(authWords(e), true); });
},
function (e) {
var m = (e && (e.msg || e.message || e.error_description || e.error)) || "That didn't work.";
if (/already registered|already exists/i.test(m))
return "There is already an account with that email. Try signing in.";
if (/invalid login/i.test(m))
return "That email and password don't match.";
if (/email not confirmed/i.test(m))
return "Confirm your email first \u2014 check for the letter.";
if (/password/i.test(m) && /short|least/i.test(m))
return "Use a longer password.";
if (/reauthenticat/i.test(m))
return "For safety, change it through Forgot it: sign out, put your email in and press Forgot it.";
if (/same.*password|different from the old/i.test(m))
return "That is the password you have now. Choose a different one.";
if (/expired|invalid.*(link|token)|otp/i.test(m))
return "That link has run out. Ask for a new one with Forgot it.";
if (/email rate limit|over_email_send/i.test(m))
return "Lots of new dreamers are joining right now, so the letter can't be sent this minute. Please try again in a little while. You can look around without an account meanwhile.";
if (/rate limit|too many|only request this after/i.test(m))
return "Too many tries in a short time. Wait a minute, then try again.";
return m;
},
function () {
if (typeof openPanel === "function")
openPanel();
var f = document.getElementById(signedIn() ? "acc-in" : "acc-out");
if (f && f.scrollIntoView)
setTimeout(function () { f.scrollIntoView({ block: "center" }); }, 420);
var em = document.getElementById("acc-email");
if (em && !signedIn())
setTimeout(function () { try {
em.focus({ preventScroll: true });
}
catch (e) {
em.focus();
} }, 480);
accountMsg(signedIn() ? "You are signed in. Buying is under your account."
: "Make an account here (or sign in), then press Buy again.");
},
function (id, html) {
var old = document.getElementById(id);
if (old)
old.remove();
var bg = document.createElement("div");
bg.id = id;
bg.style.cssText = "position:fixed;inset:0;z-index:9000;background:rgba(5,6,10,.66);display:grid;place-items:center;padding:16px";
bg.innerHTML = "<div role='dialog' style='width:min(420px,100%);background:rgba(10,12,18,.97);border:1px solid var(--line);border-radius:4px;padding:18px 20px;font:14px/1.55 var(--sans);color:var(--bone)'>" + html + "</div>";
document.body.appendChild(bg);
bg.onclick = function (e) { if (e.target === bg)
bg.remove(); };
bg.onkeydown = function (e) { e.stopPropagation(); if (e.key === "Escape")
bg.remove(); };
return bg;
},
function (q) {
var bg = accPanel("acc-newpass", "<div style='font-family:var(--serif);font-size:20px'>Choose a new password</div>" +
"<div style='color:var(--dim);margin:4px 0 4px'>At least eight characters. You will be signed in with it straight away.</div>" +
"<input id='np-1' type='password' autocomplete='new-password' placeholder='new password' style='" + ACC_IN + "'>" +
"<input id='np-2' type='password' autocomplete='new-password' placeholder='the same again' style='" + ACC_IN + "'>" +
"<div id='np-msg' style='color:var(--dim);margin-top:8px;min-height:20px'></div>" +
"<div style='display:flex;gap:8px;justify-content:flex-end;margin-top:10px'><button class='btn' id='np-x'>Not now</button><button class='btn on' id='np-go'>Set it</button></div>");
var msg = bg.querySelector("#np-msg");
bg.querySelector("#np-x").onclick = function () { bg.remove(); };
bg.querySelector("#np-go").onclick = function () {
var a = bg.querySelector("#np-1").value, b = bg.querySelector("#np-2").value;
if (a.length < 8) {
msg.textContent = "Use at least eight characters.";
return;
}
if (a !== b) {
msg.textContent = "Those two don't match.";
return;
}
msg.textContent = "Setting it\u2026";
authCall("PUT", "user", { password: a }, q.access_token).then(function (u) {
keepSession({ access_token: q.access_token, refresh_token: q.refresh_token, user: u && u.id ? u : null, at: Date.now() });
return u && u.id ? u : signInFromLink(q);
}).then(function () {
bg.remove();
accountMsg("Your new password is set, and you are signed in.");
if (typeof setStatus === "function")
setStatus("<b>Your new password is set.</b> You are signed in.");
}).catch(function (e) { msg.textContent = authWords(e); });
};
setTimeout(function () { var f = bg.querySelector("#np-1"); if (f)
f.focus(); }, 50);
},
function () {
var el = document.getElementById("acc-newemail"), em = (el && el.value || "").trim();
if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(em))
return accountMsg("That doesn't look like an email address.", true);
if (em.toLowerCase() === String(myEmail()).toLowerCase())
return accountMsg("That is the address you have now.", true);
accountMsg("Asking\u2026");
freshToken().then(function (tok) {
if (!tok)
throw { msg: "Sign in again first." };
return authCall("PUT", "user?redirect_to=" + encodeURIComponent(hereUrl()), { email: em }, tok);
}).then(function () {
el.value = "";
accountMsg("A letter is on its way to " + em + " (and perhaps one to your old address). Open the link to make the change.");
}).catch(function (e) { accountMsg(authWords(e), true); });
},
function () {
var el = document.getElementById("acc-newpass-in"), pw = el && el.value || "";
if (pw.length < 8)
return accountMsg("Use at least eight characters for the password.", true);
accountMsg("Changing it\u2026");
freshToken().then(function (tok) {
if (!tok)
throw { msg: "Sign in again first." };
return authCall("PUT", "user", { password: pw }, tok);
}).then(function () { el.value = ""; accountMsg("Your password is changed."); })
.catch(function (e) { accountMsg(authWords(e), true); });
},
function () {
if (!signedIn())
return;
var bg = accPanel("acc-delete", "<div style='font-family:var(--serif);font-size:20px'>Delete your account</div>" +
"<div style='color:var(--dim);margin:6px 0'>Straight away your name becomes \u201cFormer dreamer\u201d, and the server lets go of where you were standing, what you said in chat, your friends and blocks, the copy kept in your vault, anything you published and your door in the hall. The Keeper then removes the account itself for good. It cannot be undone, and anything bought with it goes with it. A record of a purchase is kept for the seller's accounts, without your account attached.</div>" +
"<div style='color:var(--dim);margin:6px 0'>Then this device is cleared too, and you are signed out.</div>" +
"<div style='margin-top:8px'>Type <b>DELETE</b> to go ahead.</div>" +
"<input id='del-word' autocomplete='off' style='" + ACC_IN + "'>" +
"<div id='del-msg' style='color:var(--dim);margin-top:8px;min-height:20px'></div>" +
"<div style='display:flex;gap:8px;justify-content:flex-end;margin-top:10px'><button class='btn' id='del-x'>Keep it</button><button class='btn' id='del-go' style='color:#C0603A;border-color:#C0603A'>Delete my account</button></div>");
var msg = bg.querySelector("#del-msg");
bg.querySelector("#del-x").onclick = function () { bg.remove(); };
bg.querySelector("#del-go").onclick = function () {
if (bg.querySelector("#del-word").value.trim() !== "DELETE") {
msg.textContent = "Type DELETE, in capitals, to go ahead.";
return;
}
msg.textContent = "Deleting\u2026";
deleteMyAccount().then(function () {
bg.remove();
try {
localStorage.clear();
}
catch (e) { }
try {
sessionStorage.clear();
}
catch (e) { }
session = null;
if (typeof vaultKey !== "undefined")
vaultKey = null;
if (typeof setStatus === "function")
setStatus("<b>Your account is deleted.</b> Your name and what you said are gone now; the Keeper removes the sign-in for good. This device has been cleared.");
setTimeout(function () { location.reload(); }, 1800);
}).catch(function (e) { msg.textContent = (e && e.message) || "That didn't go through. Try again in a moment."; });
};
setTimeout(function () { var f = bg.querySelector("#del-word"); if (f)
f.focus(); }, 50);
},
function () {
var tok0 = null, rpc = function (name) {
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/" + name, { method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + tok0, "Content-Type": "application/json" }, body: "{}" });
};
return freshToken().then(function (tok) {
if (!tok)
throw new Error("Sign in again first.");
tok0 = tok;
return rpc("request_account_deletion").then(function (r) {
if (r.status === 404)
return rpc("delete_my_account");
if (!r.ok)
return r;
return r.json().then(function (j) {
if (j && j.ok === false)
throw new Error(j.say || "The account couldn't be deleted just now.");
return { ok: true };
});
});
}).then(function (r) {
if (r.ok)
return true;
return r.text().then(function (t) {
if (/keeper/i.test(t))
throw new Error("A keeper's account can't be deleted from here. Ask another keeper to remove you from the desk first.");
throw new Error("The account couldn't be deleted just now. Try again in a moment.");
});
}, function (e) { throw (e instanceof Error && !(e instanceof TypeError)) ? e : new Error("You need a connection to delete the account."); });
},
function (iso) {
var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ""));
if (!m)
return NaN;
var y = +m[1], mo = +m[2], d = +m[3], t = new Date();
if (mo < 1 || mo > 12 || d < 1 || new Date(Date.UTC(y, mo - 1, d)).getUTCDate() !== d)
return NaN;
var a = t.getFullYear() - y;
if (t.getMonth() + 1 < mo || (t.getMonth() + 1 === mo && t.getDate() < d))
a--;
return a;
},
function (v) {
if (!v)
return { ok: false, say: "Your date of birth, please. It is needed to make an account." };
var a = ageYears(v);
if (isNaN(a) || a < 0 || a > 120)
return { ok: false, say: "That date of birth doesn't look right. Check the day, month and year." };
if (a < 13)
return { ok: false, young: true, say: "SomnuMatrix accounts are for people aged 13 and over, so we can't make one for you. The dream journal works on this device without an account." };
return { ok: true, date: v, adult: a >= 18 };
},
function (force) {
if (document.getElementById("age-card") || !signedIn())
return;
if (!force && Date.now() - AGE.askedAt < 120000)
return;
AGE.askedAt = Date.now();
var bg = accPanel("age-card", "<div style='font-family:var(--serif);font-size:20px'>Your date of birth</div>" +
"<div style='color:var(--dim);margin:6px 0'>Somnucor is shared with other people, so we ask everyone once. It is kept privately with your account, and only the Keeper can change it afterwards. Somnucor is for ages 13 and over (under 13 with a parent's or teacher's sign-up code); real-money gold and the casino are for 18 and over.</div>" +
"<input id='age-dob' type='date' autocomplete='bday' aria-label='Date of birth' style='" + ACC_IN + "'>" +
"<div id='age-msg' style='color:var(--dim);margin-top:8px;min-height:20px'></div>" +
"<div style='display:flex;gap:8px;justify-content:flex-end;margin-top:10px'><button class='btn' id='age-x'>Not now</button><button class='btn on' id='age-go'>Save</button></div>" +
"<div style='color:var(--dim);font-size:12.5px;margin-top:10px'>Not now keeps you in your own dreams: the journal works as ever, and Somnucor waits until you answer. <a href='terms.html' target='_blank' rel='noopener' style='color:inherit'>Terms of use</a></div>");
var msg = bg.querySelector("#age-msg");
bg.querySelector("#age-x").onclick = function () { AGE.askedAt = Date.now(); bg.remove(); };
bg.querySelector("#age-go").onclick = function () {
var v = bg.querySelector("#age-dob").value, a = ageYears(v);
if (!v || isNaN(a) || a < 0 || a > 120) {
msg.textContent = "That date doesn't look right. Check the day, month and year.";
return;
}
msg.textContent = "Saving…";
cityRpc("set_my_birthdate", { p_date: v }).then(function (o) {
if (o && o.blocked) {
bg.remove();
AGE.set = AGE.blocked = true;
AGE.adult = false;
ageBlockedCard(o.say);
return;
}
if (!o || !o.ok) {
msg.textContent = (o && o.say) || "That didn't go through.";
return;
}
AGE.set = true;
AGE.adult = !!o.adult;
bg.remove();
if (typeof setStatus === "function")
setStatus(esc(o.say || "Saved."));
if (typeof paintBank === "function")
paintBank();
}).catch(function () { msg.textContent = "That didn't go through. Try again in a moment."; });
};
},
function (say) {
if (AGE.told || document.getElementById("age-card"))
return;
AGE.told = true;
var bg = accPanel("age-card", "<div style='font-family:var(--serif);font-size:20px'>Somnucor is for ages 13 and over</div>" +
"<div style='color:var(--dim);margin:6px 0'>" + esc(say || "This account cannot enter Somnucor or its chat.") + "</div>" +
"<div style='color:var(--dim);margin:6px 0'>Your dream journal on this device works as ever. If the date was a mistake, write to the help address in Settings.</div>" +
"<div style='display:flex;justify-content:flex-end;margin-top:10px'><button class='btn' id='age-ok'>All right</button></div>");
bg.querySelector("#age-ok").onclick = function () { bg.remove(); };
},
function () {
if (AGE.told || document.getElementById("age-card"))
return;
AGE.told = true;
var bg = accPanel("age-card", "<div style='font-family:var(--serif);font-size:20px'>This account is being deleted</div>" +
"<div style='color:var(--dim);margin:6px 0'>You asked for it to be deleted, so it is signed out here. The Keeper removes it for good.</div>" +
"<div style='display:flex;justify-content:flex-end;margin-top:10px'><button class='btn' id='age-ok'>All right</button></div>");
bg.querySelector("#age-ok").onclick = function () { bg.remove(); };
signOut();
}
];
});
