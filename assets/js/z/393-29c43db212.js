/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(393, function () {
"use strict";
return [
function (title, place, panel) {
var t = String(title || "") + " " + String(place || "");
if (panel === "police" || panel === "court" || panel === "prison" || /dragon|eyrie|roost|watch|courthouse|prison|warden|constable|sheriff/i.test(t))
return "law";
if (/hospital|apothecary|doctor|nurse|surgeon|medic|herbalist|clinic|healer/i.test(t))
return "health";
if (/school|academy|teacher|college|tutor|principal/i.test(t))
return "school";
return "trade";
},
function () {
var L = [], seen = {};
var add = function (title, place, kind) { place = String(place || "").trim(); if (!place)
return; var k = kind + "|" + place; if (seen[k])
return; seen[k] = 1; L.push({ title: title || "", place: place, kind: kind }); };
try {
((typeof standing !== "undefined" && standing && standing.business) || []).forEach(function (b) { add("head of " + (b.name || ""), b.name, "head"); });
((typeof myBoard !== "undefined" && myBoard && myBoard.jobs) || []).forEach(function (j) { add("head of " + (j.employer || ""), j.employer, "head"); });
((typeof standing !== "undefined" && standing && standing.jobs) || []).forEach(function (j) {
var place = j.workplace || j.employer, kind = wkcKind(j.job, place, j.panel);
add(j.job, place, kind);
if (wkcHeadWord(j.job))
add(j.job, place, "head");
});
if (typeof amCorp === "function" && amCorp()) {
add("rider of the Dragon Corp", "The Dragon Corp", "law");
}
if (typeof CORP !== "undefined" && CORP.data && CORP.data.command)
add("in command of the Dragon Corp", "The Dragon Corp", "head");
}
catch (e) { }
return L;
},
function (e) {
var T = fpsStore();
T.who[e.name] = { persona: "You live in Somnucor, the dreamers' shared city. You are " + e.first + ", " + e.post + ". You are a " + e.age + "-year-old " + (e.sex === "f" ? "woman" : "man") +
". The dreamer you are in touch with is " + e.you + " (" + e.place + "), and that is why you know them. Talk like a real person, in your own way.", title: e.post, place: "", sex: e.sex, age: e.age };
},
function (e, live) {
var T = fpsStore(), L = T.log[e.name] || (T.log[e.name] = []);
var put = function (t) {
L.push({ t: t, at: live ? Date.now() : e.at });
T.unread[e.name] = (T.unread[e.name] || 0) + 1;
fpsSave();
if (typeof fpsBadge === "function")
fpsBadge();
if (live && typeof fpsToast === "function")
fpsToast(e.name, t);
if (typeof PH !== "undefined" && PH.open && PH.tab === "town" && typeof phPaint === "function")
phPaint();
};
if (!wkcAI() || typeof fpsAsk !== "function") {
put(e.line);
return;
}
fpsAsk(fpsChar(e.name), L, "Send them ONE short text, about this: " + e.why + " Say who you are if they may not know you. Write it the way you really would.").then(function (t) {
if (!t || /^(mm-hm|is that so|right, right|fair enough)/i.test(t))
t = e.line;
put(t);
});
},
function (e) {
var T = fpsStore(), L = T.log[e.name] || (T.log[e.name] = []), n0 = L.length;
WKC.opener = { name: e.name, line: e.line, at: Date.now() };
if (typeof fvoIncoming !== "function" || !fvoIncoming(e.name, "You are ringing them about this: " + e.why + " They have just picked up. Say who you are and why you are ringing, plainly, the way a real person does on the phone, then talk it through with them."))
return false;
setTimeout(function () {
var L2 = fpsStore().log[e.name] || [], missed = L2.slice(n0).some(function (m) { return m.t === "📞 Missed call"; });
if (missed) {
L2.push({ t: "(Left a message) " + e.line, at: Date.now() });
fpsSave();
var s = wkcStore(), x = s.list[s.list.length - 1];
if (x && x.slot === e.slot) {
x.missed = true;
wkcSave();
}
}
}, 31500);
return true;
},
function (e) {
var T = fpsStore(), L = T.log[e.name] || (T.log[e.name] = []);
if (e.how === "call" && typeof stiCovers === "function" && stiCovers()) {
L.push({ t: "📞 Your stand-in took the call: " + e.line, at: e.at });
fpsSave();
WKC.away.si = (WKC.away.si || 0) + 1;
wkcLog(e, false);
return;
}
if (e.how === "call") {
L.push({ t: "📞 Missed call", at: e.at });
L.push({ t: "(Left a message) " + e.line, at: e.at + 20000 });
T.unread[e.name] = (T.unread[e.name] || 0) + 1;
fpsSave();
WKC.away.calls++;
}
else {
WKC.away.texts++;
if (!wkcAI())
wkcText(e, false);
else
setTimeout(function () { wkcText(e, false); }, WKC.away.texts * 1500);
}
wkcLog(e, e.how === "call");
},
function (x) {
if (!x.act || typeof INCD === "undefined")
return "";
var r = INCD.rows.filter(function (i) { return i.id === x.act.id; })[0];
if (!r)
return "";
var ok = x.act.as === "law" ? cinCanLaw(r) : cinCanFix(r);
if (!ok)
return "";
return "<button data-cintake='" + r.id + "' data-cinas='" + x.act.as + "' style='padding:5px 10px;border-radius:8px;border:1px solid #6A5FA0;background:#221E38;color:#EDE8F8;font-size:12.5px;cursor:pointer;margin-top:4px'>" + (x.act.as === "law" ? "🐉 Take the case" : "🛠️ Take the repair") + "</button>";
}
];
});
