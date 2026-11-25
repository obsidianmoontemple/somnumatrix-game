/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(404, function () {
"use strict";
return [
function () {
if (!yngOn() || typeof cityRpc !== "function" || Date.now() - YNG.pollAt < 120000)
return;
YNG.pollAt = Date.now();
cityRpc("my_age", {}).then(function (a) {
if (!a || !a.ok)
return;
AGE.blocked = !!a.blocked;
if (AGE.blocked && typeof ageBlockedCard === "function") {
AGE.told = false;
ageBlockedCard();
}
}).catch(function () { });
},
function (dob) {
if (!dob)
return null;
var id = "yng-signup-" + dob.id, w = document.getElementById(id);
if (!w) {
w = document.createElement("div");
w.id = id;
w.style.cssText = "margin-top:8px";
w.innerHTML = "<label for='" + id + "-code' style='display:block;font-size:12px;color:var(--dim)'>Under 13: the sign-up code from your parent or teacher</label>" +
"<input id='" + id + "-code' class='yng-kidcode' type='text' autocomplete='off' placeholder='KID-1234-5678' style='margin-top:4px;text-transform:uppercase'>" +
"<div style='font-size:12px;color:var(--dim);margin-top:4px;line-height:1.5'>Use your parent's or teacher's email address, not your own. Ask them for the code: they get it in their Settings, under 🔒 Teacher / parent lock.</div>";
dob.parentNode.insertBefore(w, dob.nextSibling);
}
return w.querySelector(".yng-kidcode");
},
function (say) {
var k = yngKid();
var bg = accPanel("yng-hello", "<div style='font-family:var(--serif);font-size:20px'>Welcome to Somnucor! 🌟</div>" +
"<div style='margin:6px 0'>" + yngEsc(say || "Your grown-up signed you up.") + "</div>" +
"<div style='color:var(--dim);margin:6px 0'>You play with " + (k.circle ? "<b>" + yngEsc(k.circle) + "</b>" : "your class or family") + ". Nobody else can see you or talk to you. The city's school is open for lessons, and the Kids Zone is always safe.</div>" +
"<div style='display:flex;gap:8px;justify-content:flex-end;margin-top:10px;flex-wrap:wrap'><button class='btn' id='yng-kz'>Go to the Kids Zone</button><button class='btn on' id='yng-ok'>Into the city</button></div>");
bg.querySelector("#yng-ok").onclick = function () { bg.remove(); if (typeof toSomnucor === "function")
try {
toSomnucor();
}
catch (e) { } };
bg.querySelector("#yng-kz").onclick = function () { bg.remove(); yngKidsZone(); };
},
function (ev) {
var t = ev.target && ev.target.closest ? ev.target.closest("[data-yng]") : null;
if (!t)
return;
var a = t.getAttribute("data-yng"), code = t.getAttribute("data-code"), id = t.getAttribute("data-id");
var fail = function (e) { yngMsg((e && e.say) || (e && e.message) || "That did not work just now.", true); };
var after = function (r, said) { if (!r || r.ok === false)
return fail(r); return yngMine(true).then(function () { yngPaint(); yngMsg(said || r.say || "Done."); }); };
if (a === "kz") {
yngKidsZone();
return;
}
if (a === "code") {
YNG.form = code;
yngPaint();
return;
}
if (a === "cancel") {
YNG.form = null;
yngPaint();
return;
}
if (a === "code-go") {
var kind = (document.querySelector("#yng-box input[name='yng-kind']:checked") || {}).value || "parent", ok = !!(document.getElementById("yng-agree") || {}).checked;
if (!ok) {
yngMsg("Tick I agree first.", true);
return;
}
yngMsg("Making a code…");
cityRpc("young_code_new", { p_circle: code, p_kind: kind, p_agree: true }).then(function (r) {
if (!r || !r.ok)
return fail(r);
YNG.form = null;
return after(r, "The code is " + r.code + " (one child, good for 7 days). On the child's device: create an account with your email address, their date of birth and this code. Or, if they already have an account, they type it on the card that opens.");
}).catch(function (e) { fail((typeof rpcMissing === "function" && rpcMissing(e)) ? { say: "Young players open once the city's server has its newest update." } : e); });
}
else if (a === "withdraw") {
cityRpc("young_remove", { p_user: null, p_code: code }).then(function (r) { return after(r); }).catch(fail);
}
else if (a === "remove") {
if (!confirm("Remove this young player? Somnucor closes to them until they are signed up again."))
return;
cityRpc("young_remove", { p_user: id, p_code: null }).then(function (r) { return after(r); }).catch(fail);
}
else if (a === "delete") {
if (!confirm("Delete " + (t.getAttribute("data-name") || "this child") + "'s account? Their name, what they said and what they kept are cleared now, and the account is removed for good."))
return;
cityRpc("young_delete", { p_user: id }).then(function (r) { return after(r); }).catch(fail);
}
},
function (ev) {
var t = ev.target;
if (!t || !t.getAttribute || !t.getAttribute("data-yng-set"))
return;
var f = t.getAttribute("data-yng-set"), code = t.getAttribute("data-code"), body = { p_circle: code, p_chat: null, p_talk: null, p_calls: null, p_places: null, p_together: null };
if (f === "places")
body.p_places = t.value;
else
body["p_" + f] = !!t.checked;
yngMsg("Saving…");
(f === "links" ? cityRpc("young_links_set", { p_circle: code, p_on: !!t.checked }) : cityRpc("young_class_set", body)).then(function (r) {
if (!r || !r.ok) {
yngMsg((r && r.say) || "That did not work just now.", true);
return yngMine(true).then(yngPaint);
}
return yngMine(true).then(function () { yngPaint(); yngMsg(r.say || "Saved."); });
}).catch(function () { yngMsg("That did not work just now.", true); });
}
];
});
