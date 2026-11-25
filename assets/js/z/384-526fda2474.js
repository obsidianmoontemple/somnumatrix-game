/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(384, function () {
"use strict";
return [
function (c) {
var s = null;
try {
s = typeof specById === "function" ? specById(c.objId) : null;
}
catch (e) { }
var L = (s && s.look) || {}, h = cfkHash(cfkKey(c) + "|age");
if (L.age === "child" || (s && s.archetype === "child"))
return 7 + h % 6;
if (CFK_GREY[L.hair])
return 62 + h % 24;
if (CFK_DYED[L.hair])
return 18 + h % 10;
if (L.hairStyle === "bald")
return 38 + h % 26;
return 19 + h % 42;
},
function (age, sx) {
var who = sx === "f" ? (age < 13 ? "girl" : age < 20 ? "young woman" : "woman") : sx === "m" ? (age < 13 ? "boy" : age < 20 ? "young man" : "man") : (age < 13 ? "child" : "person");
var how = age < 13 ? "Talk like a real child of your age: simple words, quick enthusiasm, honest, a bit cheeky, easily excited or bored; you mention school, games, friends and family. You are never flirtatious, and you never talk about drink, money worries or grown-up trouble."
: age < 26 ? "Talk like a real person in their late teens or twenties: casual, quick, a bit of slang now and then, opinions about music, friends, money and what you want to do with your life."
: age < 45 ? "Talk like a real adult in the middle of a busy life: work, home, bills, plans, the odd joke."
: age < 62 ? "Talk like a real middle-aged person: settled opinions, a few aches, stories from years back, family and work on your mind."
: "Talk like a real older person: unhurried, a little old-fashioned in your words, full of memories and opinions about how things used to be, sometimes losing your thread.";
return "You are a " + age + "-year-old " + who + ". " + how;
},
function (c) {
var job = cfkJob(c.role), work = cfkPlace(c.work), home = cfkPlace(c.home), s = "You live in Somnucor, the dreamers' shared city.";
if (job === "patient")
s += " You are a patient" + (work ? " at " + work : "") + ".";
else if (job === "guest")
s += " You are a guest staying" + (work ? " at " + work : "") + ".";
else if (job)
s += " You work as a " + job + (work ? " at " + work : "") + ".";
if (home && home !== work)
s += " You live at " + home + ".";
if (c.doing)
s += " Right now you are " + c.doing + ".";
s += " " + cfkAgeWords(cfkAge(c), cfkSex(c));
s += " You were stopped in passing by someone; you can chat, and you may have somewhere to be.";
return s;
},
function (c) {
var nm = cfkName(c), sx = cfkSex(c), age = cfkAge(c), p = cfkPersona(c), key = "wtalk:" + nm;
(store.characters || []).forEach(function (x) { if (x.wKey === key && x.details && x.details.length)
x.details[0] = p; });
wTalk({ name: nm, persona: p, greet: "", doing: c.doing || "here" });
(store.characters || []).forEach(function (x) { if (x.wKey === key) {
x.ftkSex = sx;
x.ftkAge = age;
x.doing = c.doing || x.doing;
} });
},
function () {
var send = document.getElementById("t-send");
if (!send || !send.parentNode)
return;
var b = document.getElementById("cfk-snd");
if (!b) {
b = document.createElement("button");
b.id = "cfk-snd";
b.type = "button";
b.className = send.className || "btn";
b.style.cssText = "min-width:44px;padding:6px 10px";
b.onclick = function (ev) {
ev.stopPropagation();
var c = cfg();
c.folkVoice = c.folkVoice === false;
setCfg(c);
if (c.folkVoice === false && typeof fvoHush === "function")
fvoHush();
cfkSndPaint();
var cb = document.getElementById("fvo-set-on");
if (cb)
cb.checked = c.folkVoice !== false;
};
send.parentNode.insertBefore(b, send);
}
var on = typeof cfg === "function" && cfg().folkVoice !== false, show = typeof fvoWho === "function" && typeof talkWith !== "undefined" && fvoWho(talkWith);
b.textContent = on ? "🔊" : "🔇";
b.title = on ? "Voices on: tap to mute" : "Voices off: tap to hear them";
b.setAttribute("aria-label", b.title);
b.style.display = show && typeof speechSynthesis !== "undefined" ? "" : "none";
}
];
});
