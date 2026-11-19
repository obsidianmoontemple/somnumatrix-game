/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var YNG = { mine: null, mineAt: 0, form: null, pollAt: 0, said: {}, CODE: /^KID-\d{4}-\d{4}$/,
KIDS_ONLY: ["kidszone", "family"], NEVER: ["casino", "battle", "race"] };
function yngOn() { return typeof AGE !== "undefined" && !!AGE.young && typeof signedIn === "function" && signedIn(); }
function yngKid() { return (yngOn() && AGE.kid) || {}; }
function yngEsc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function yngSay(t) { if (typeof setStatus === "function")
try {
setStatus(t);
}
catch (e) { } }
(function () {
if (typeof cityRpc !== "function")
return;
var cr = cityRpc;
cityRpc = function (name) {
var p = cr.apply(this, arguments);
if (name === "my_age" && p && typeof p.then === "function")
p.then(function (a) {
if (a && a.ok && typeof AGE !== "undefined") {
AGE.young = !!a.young;
AGE.kid = a.kid || null;
AGE.youngOpen = a.young_open !== false && a.young_open !== undefined;
}
}, function () { });
return p;
};
})();
function yngPoll() { return __ZC(401, 0, this, arguments, new.target); }
function yngDobInput(v) {
var ids = ["tg-dob", "acc-dob"];
for (var i = 0; i < ids.length; i++) {
var e = document.getElementById(ids[i]);
if (e && e.value === v && e.offsetParent !== null)
return e;
}
for (var j = 0; j < ids.length; j++) {
var f = document.getElementById(ids[j]);
if (f && f.value === v)
return f;
}
return null;
}
function yngCodeBox(dob) { return __ZC(401, 1, this, arguments, new.target); }
(function () {
if (typeof ageDobCheck !== "function")
return;
var dc = ageDobCheck;
ageDobCheck = function (v) {
var r = dc.apply(this, arguments);
if (!r || !r.young)
return r;
var inp = yngCodeBox(yngDobInput(v)), code = inp ? String(inp.value || "").trim().toUpperCase() : "";
if (!inp)
return r;
if (!code) {
try {
inp.focus();
}
catch (e) { }
return { ok: false, young: true, say: "Under 13? A parent or teacher signs you up. Type the sign-up code they give you (just below your date of birth), and use their email address." };
}
if (!YNG.CODE.test(code))
return { ok: false, young: true, say: "That sign-up code doesn't look right. It looks like KID-1234-5678." };
return { ok: true, date: v, adult: false, young: true, code: code };
};
})();
(function () {
if (typeof ageBlockedCard !== "function")
return;
ageBlockedCard = function (say) {
if (AGE.told || document.getElementById("age-card"))
return;
AGE.told = true;
var bg = accPanel("age-card", "<div style='font-family:var(--serif);font-size:20px'>Somnucor needs a grown-up to sign you up</div>" +
"<div style='color:var(--dim);margin:6px 0'>Players under 13 can play in the city, go to school and visit the Kids Zone when a parent or teacher signs them up. Ask them for a sign-up code (they find it in their Settings, under 🔒 Teacher / parent lock).</div>" +
"<input id='yng-code' type='text' autocomplete='off' placeholder='KID-1234-5678' aria-label='Sign-up code' style='" + ACC_IN + ";text-transform:uppercase'>" +
"<label for='yng-dob' style='display:block;margin-top:8px;font-size:12px;color:var(--dim)'>Your date of birth</label>" +
"<input id='yng-dob' type='date' autocomplete='bday' style='" + ACC_IN + ";margin-top:4px'>" +
"<div id='yng-msg' style='color:var(--dim);margin-top:8px;min-height:20px'></div>" +
"<div style='display:flex;gap:8px;justify-content:flex-end;margin-top:10px;flex-wrap:wrap'><button class='btn' id='age-ok'>Not now</button><button class='btn on' id='yng-go'>Use the code</button></div>" +
"<div style='color:var(--dim);font-size:12.5px;margin-top:10px'>Your dream journal on this device works as ever. If your date of birth was a mistake, write to the help address in Settings.</div>");
var msg = bg.querySelector("#yng-msg");
bg.querySelector("#age-ok").onclick = function () { bg.remove(); };
bg.querySelector("#yng-go").onclick = function () {
var code = String(bg.querySelector("#yng-code").value || "").trim().toUpperCase(), dob = bg.querySelector("#yng-dob").value || null;
if (!YNG.CODE.test(code)) {
msg.textContent = "A sign-up code looks like KID-1234-5678.";
return;
}
if (dob && typeof ageYears === "function") {
var y = ageYears(dob);
if (isNaN(y) || y < 0 || y > 120) {
msg.textContent = "That date doesn't look right.";
return;
}
}
msg.textContent = "Checking…";
cityRpc("young_redeem", { p_code: code, p_birthdate: dob }).then(function (o) {
if (!o || !o.ok) {
msg.textContent = (o && o.say) || "That didn't go through.";
return;
}
AGE.young = true;
AGE.kid = o.kid || null;
AGE.blocked = !!o.blocked;
AGE.set = true;
AGE.told = false;
bg.remove();
yngWelcome(o.say);
if (typeof flkSync === "function")
try {
FLK.syncAt = 0;
flkSync(true);
}
catch (e) { }
}).catch(function (e) { msg.textContent = (typeof rpcMissing === "function" && rpcMissing(e)) ? "Sign-up codes open once the city's server has its newest update." : "That didn't go through. Try again in a moment."; });
};
};
})();
function yngWelcome(say) { return __ZC(401, 2, this, arguments, new.target); }
function yngKidsZone() {
if (typeof worldGo !== "function")
return;
var go = function () { try {
worldGo("kidszone");
}
catch (e) { } };
if (typeof somnucorRealm === "function" && !somnucorRealm() && typeof toSomnucor === "function") {
try {
toSomnucor();
}
catch (e) { }
setTimeout(go, 4000);
}
else
go();
}
function yngLevel(key) {
if (typeof dgrLevelOf !== "function")
return 0;
var id = key;
try {
if (key === "surface")
id = (typeof SF !== "undefined" && SF && SF.k) || "moon";
else if (key === "station")
id = (typeof STN !== "undefined" && STN && STN.k === "ares") ? "ares" : "aurora";
}
catch (e) { }
return dgrLevelOf(id);
}
function yngMayGo(key) {
if (!yngOn())
return true;
if (YNG.NEVER.indexOf(key) >= 0)
return false;
if (key === "kidszone")
return true;
if (yngKid().places === "kids")
return YNG.KIDS_ONLY.indexOf(key) >= 0;
return yngLevel(key) <= 1;
}
(function () {
if (typeof worldGo !== "function")
return;
var wg = worldGo;
worldGo = function (key) {
if (!yngMayGo(key)) {
yngSay("🧒 " + (yngKid().places === "kids" ? "Your grown-up keeps you to the city, the school and the Kids Zone." : "That place isn't open to young players. The city, the school and the Kids Zone are."));
return false;
}
return wg.apply(this, arguments);
};
})();
function yngWhereCheck() {
if (!yngOn() || typeof WLD === "undefined" || !WLD || !WLD.on)
return;
if (yngMayGo(WLD.on))
return;
try {
worldOff(true);
}
catch (e) { }
if (typeof toSomnucor === "function")
try {
toSomnucor();
}
catch (e) { }
yngSay("🧒 Your grown-up's switches keep you to safer places, so you're back in the city.");
}
(function () {
if (typeof flkAllowed !== "function")
return;
var fa = flkAllowed;
flkAllowed = function (id) { if (yngOn() && !yngKid().together && id && id !== flkMe())
return false; return fa.apply(this, arguments); };
})();
(function () {
if (typeof okyQuiet !== "function")
return;
var oq = okyQuiet;
okyQuiet = function () { if (yngOn() && !yngKid().talk)
return true; return oq.apply(this, arguments); };
okyGated = function () { if (yngOn())
return false; return oq.apply(this, arguments); };
})();
var YNG_CHILD = "IMPORTANT: the person you are talking with is a child under 13, playing with a parent's or teacher's permission. " +
"Speak as you would to a young child: kind, simple, cheerful and completely suitable for children. No violence, fear, romance, " +
"drink, drugs, gambling, crime, rude words or grown-up topics. Never ask for or encourage them to share their real name, age, address, " +
"school, phone number, photos or where they live, and never suggest meeting anyone. If they mention being hurt, scared or unsafe, " +
"gently tell them to talk to their parent or teacher straight away.";
(function () {
if (typeof llmBody !== "function")
return;
var lb = llmBody;
llmBody = function (c, extra) {
var b = lb.apply(this, arguments);
try {
if (yngOn() && b && Array.isArray(b.messages) && (+b.max_tokens || 0) <= 1500) {
var s = null;
for (var i = 0; i < b.messages.length; i++)
if (b.messages[i] && b.messages[i].role === "system") {
s = b.messages[i];
break;
}
if (s && typeof s.content === "string") {
if (s.content.indexOf(YNG_CHILD) < 0)
s.content = s.content + "\n\n" + YNG_CHILD;
}
else
b.messages.unshift({ role: "system", content: YNG_CHILD });
}
}
catch (e) { }
return b;
};
})();
(function () {
if (typeof fvoMayRing === "function") {
var fr = fvoMayRing;
fvoMayRing = function () { if (yngOn() && !yngKid().calls)
return false; return fr.apply(this, arguments); };
}
if (typeof wkcMayRingNow === "function") {
var wr = wkcMayRingNow;
wkcMayRingNow = function () { if (yngOn() && !yngKid().calls)
return false; return wr.apply(this, arguments); };
}
})();
(function () {
var no = function () { yngSay("🧒 Buying things is for grown-ups. Ask your parent or teacher."); };
if (typeof startCheckout === "function") {
var sc = startCheckout;
startCheckout = function () { if (yngOn()) {
no();
return false;
} return sc.apply(this, arguments); };
}
if (typeof buyPanel === "function") {
var bp = buyPanel;
buyPanel = function () { if (yngOn()) {
no();
return;
} return bp.apply(this, arguments); };
}
})();
function yngMine(force) {
if (typeof signedIn !== "function" || !signedIn() || typeof cityRpc !== "function")
return Promise.resolve(null);
if (!force && YNG.mine && Date.now() - YNG.mineAt < 60000)
return Promise.resolve(YNG.mine);
YNG.mineAt = Date.now();
return cityRpc("young_mine", {}).then(function (r) { YNG.mine = (r && r.ok) ? r : null; return YNG.mine; }, function () { YNG.mine = null; return null; });
}
function yngBox() {
var card = document.getElementById("flk-card");
if (!card)
return null;
var b = document.getElementById("yng-box");
if (!b || b.parentNode !== card) {
b = document.createElement("div");
b.id = "yng-box";
b.style.cssText = "margin-top:12px;padding-top:10px;border-top:1px solid rgba(232,220,196,.18)";
card.appendChild(b);
}
if (!card._yng) {
card._yng = 1;
card.addEventListener("click", yngClick);
card.addEventListener("change", yngChange);
}
return b;
}
var YNG_AGREE = {
parent: "I am this child's parent or legal guardian. I give permission for them to play, and I agree to what is kept.",
school: "I am this child's teacher. Their school has the parent's or guardian's permission for the class to use SomnuMatrix for school work, and I agree to what is kept."
};
var YNG_KEPT = "What is kept: the child's date of birth, the name they choose to show, and what they do in the game (school scores and attendance, the things they hold, chat lines with their class). " +
"The account uses your email address, not theirs. Their details are never sold or shared, and a young player cannot buy anything. " +
"Only their own class or family and its grown-ups can see or reach them. You can change their switches, remove them or delete their account here at any time.";
function yngPaint() {
var b = yngBox();
if (!b)
return;
var h = "<div style='color:var(--bone);font-weight:500'>🧒 Young players (under 13)</div>";
if (yngOn()) {
var k = yngKid();
h += "<div style='font-size:12.5px'>You are a young player in <b>" + yngEsc(k.circle || "your class or family") + "</b>, signed up by " + yngEsc(k.grown_up || "your grown-up") + ". " +
(k.together ? "Classmates: on" : "You play offline: no other players") + " · Chat: " + (k.chat ? "on" : "off") + " · Talking with the city's people: " + (k.talk ? "on" : "set lines") + " · Calls: " + (k.calls ? "on" : "off") + " · Video links on the home TV: " + (k.links ? "on" : "off") + " · Places: " + (k.places === "kids" ? "city, school and Kids Zone" : "safe and guarded places") + ".</div>" +
"<div class='row' style='gap:8px;margin-top:6px'><button class='btn' type='button' data-yng='kz'>Go to the Kids Zone</button></div>";
b.innerHTML = h;
return;
}
var M = YNG.mine;
if (!signedIn()) {
b.innerHTML = h + "<div class='hint' style='font-size:12px;color:var(--dim)'>Sign in as a grown-up to sign up a child.</div>";
return;
}
if (!M) {
b.innerHTML = h + "<div class='hint' style='font-size:12px;color:var(--dim)'>Children under 13 can play when a parent or teacher signs them up here. (Opening…)</div>";
yngMine(false).then(function (m) { if (m)
yngPaint(); });
return;
}
if (!M.open) {
b.innerHTML = h + "<div class='hint' style='font-size:12px;color:var(--dim)'>Signing up young players is closed just now.</div>";
return;
}
if (!(M.circles || []).length) {
b.innerHTML = h + "<div style='font-size:12.5px'>A parent or teacher can sign up a child under 13 to play in the city, take classes at the City School and visit the Kids Zone, seen only by their own class or family. Start a class or family above first, then sign each child up here.</div>";
return;
}
h += "<div style='font-size:12.5px'>Children under 13 play in the city, take classes at the City School and visit the Kids Zone, offline: no other live players unless you switch on classmates, and then only their own class or family. Never: buying, the casino, gold for money, fights, voice with other players, or strangers.</div>";
(M.circles || []).forEach(function (c) {
var cd = yngEsc(c.code);
h += "<div style='margin:10px 0 2px'><b>" + yngEsc(c.name) + "</b> &middot; " + cd + "</div>" +
"<div style='font-size:12.5px;padding-left:10px;display:grid;grid-template-columns:minmax(0,1fr);gap:3px'>" +
"<label " + YNG_LB + "><input type='checkbox' " + YNG_TK + " data-yng-set='together' data-code='" + cd + "'" + (c.together ? " checked" : "") + "> <span>Classmates see each other (off: each child plays offline, with no other live players)</span></label>" +
"<label " + YNG_LB + "><input type='checkbox' " + YNG_TK + " data-yng-set='chat' data-code='" + cd + "'" + (c.chat ? " checked" : "") + "> <span>Chat with their class or family (needs classmates on)</span></label>" +
"<label " + YNG_LB + "><input type='checkbox' " + YNG_TK + " data-yng-set='talk' data-code='" + cd + "'" + (c.talk ? " checked" : "") + "> <span>Talk freely with the city's people (off: they answer with their own set lines)</span></label>" +
"<label " + YNG_LB + "><input type='checkbox' " + YNG_TK + " data-yng-set='calls' data-code='" + cd + "'" + (c.calls ? " checked" : "") + "> <span>Phone calls from the city's people</span></label>" +
"<label " + YNG_LB + "><input type='checkbox' " + YNG_TK + " data-yng-set='links' data-code='" + cd + "'" + (c.links ? " checked" : "") + "> <span>Play YouTube and web video links on their home TV (off: only their own videos from their device)</span></label>" +
"<label " + YNG_LB + "><span style='padding-top:4px'>Places</span> <select style='width:auto;flex:1 1 auto;min-width:0;max-width:100%' data-yng-set='places' data-code='" + cd + "'><option value='safe'" + (c.places !== "kids" ? " selected" : "") + ">Safe and guarded places</option><option value='kids'" + (c.places === "kids" ? " selected" : "") + ">The city, the school and the Kids Zone only</option></select></label></div>";
(c.kids || []).forEach(function (k) {
h += "<div style='font-size:12.5px;padding-left:10px;margin-top:4px'>🧒 " + yngEsc(k.name) + (k.deleting ? " &middot; being deleted" : k.in ? "" : " &middot; not locked in, so Somnucor is closed to them") +
(k.deleting ? "" : " <button class='btn' type='button' style='font-size:11px;padding:1px 8px' data-yng='remove' data-id='" + yngEsc(k.id) + "'>Remove</button>" +
" <button class='btn' type='button' style='font-size:11px;padding:1px 8px' data-yng='delete' data-id='" + yngEsc(k.id) + "' data-name='" + yngEsc(k.name) + "'>Delete their account</button>") + "</div>";
});
(c.codes || []).forEach(function (k) {
h += "<div style='font-size:12.5px;padding-left:10px;margin-top:4px'>Code <b style='user-select:all'>" + yngEsc(k.code) + "</b> (" + (k.kind === "school" ? "teacher" : "parent") + ", unused, until " + yngEsc(new Date(k.expires).toLocaleDateString()) + ") " +
"<button class='btn' type='button' style='font-size:11px;padding:1px 8px' data-yng='withdraw' data-code='" + yngEsc(k.code) + "'>Withdraw</button></div>";
});
if (YNG.form === c.code) {
h += "<div style='font-size:12.5px;padding:8px 10px;margin-top:6px;border:1px solid rgba(232,220,196,.22);border-radius:8px'>" +
"<div style='margin-bottom:6px'>" + yngEsc(YNG_KEPT) + "</div>" +
"<label " + YNG_LB + "><input type='radio' " + YNG_TK + " name='yng-kind' value='parent' checked> <span>" + yngEsc(YNG_AGREE.parent) + "</span></label>" +
"<label " + YNG_LB + "><input type='radio' " + YNG_TK + " name='yng-kind' value='school'> <span>" + yngEsc(YNG_AGREE.school) + "</span></label>" +
"<label " + YNG_LB + "><input type='checkbox' " + YNG_TK + " id='yng-agree'> <b>I agree</b></label>" +
"<div class='row' style='gap:8px;margin-top:6px;flex-wrap:wrap'><button class='btn' type='button' data-yng='code-go' data-code='" + cd + "'>Get a sign-up code</button><button class='btn' type='button' data-yng='cancel'>Cancel</button></div></div>";
}
else
h += "<div class='row' style='gap:8px;margin-top:6px;padding-left:10px'><button class='btn' type='button' data-yng='code' data-code='" + cd + "'>Sign up a child…</button></div>";
});
h += "<div id='yng-msg' class='hint' style='font-size:12px;color:var(--dim);min-height:16px;margin-top:6px'></div>";
var keep = document.getElementById("yng-msg"), said = keep ? keep.textContent : "";
b.innerHTML = h;
if (said) {
var m = document.getElementById("yng-msg");
if (m)
m.textContent = said;
}
}
var YNG_LB = "style='display:flex;gap:8px;align-items:flex-start;margin:4px 0;color:var(--bone);font-size:12.5px'";
var YNG_TK = "style='width:auto;flex:none;margin:3px 0 0;padding:0'";
function yngMsg(t, bad) { var m = document.getElementById("yng-msg"); if (m) {
m.textContent = t || "";
m.style.color = bad ? "#D08A6A" : "var(--dim)";
} }
function yngClick(ev) { return __ZC(401, 3, this, arguments, new.target); }
function yngChange(ev) { return __ZC(401, 4, this, arguments, new.target); }
(function () {
if (typeof flkPaint !== "function")
return;
var fp = flkPaint;
flkPaint = function () { var r = fp.apply(this, arguments); try {
yngPaint();
}
catch (e) { } return r; };
})();
function yngTick() {
try {
if (!yngOn())
return;
yngPoll();
yngWhereCheck();
}
catch (e) { }
}
if (typeof setInterval === "function")
setInterval(yngTick, 2000);
