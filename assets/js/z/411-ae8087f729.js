/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(411, function () {
"use strict";
return [
function (k, doing) {
return "You are the stand-in for " + k.name + ", a dreamer of Somnucor, the dreamers' shared city, who is away right now." +
" You look like them and you keep their post while they are gone" + (k.title ? ": you are working as " + String(k.title).toLowerCase() + (k.workplace ? " at " + k.workplace : "") : "") + "." +
" Right now you are " + (doing || "at work") + "." +
(k.words ? " How " + k.name + " wants you to talk, in their own words: \"" + String(k.words).slice(0, 400) + "\"." : "") +
" Talk like a real person at work: plain words, short replies, friendly but busy. Do the job's everyday business: answer questions about the work and the place, take orders and messages." +
" Never pretend to be " + k.name + " themself: if asked, say they are away and you are keeping their post, and you will pass word on." +
" Never promise their gold, never sell, sign, lend or give away anything of theirs, never agree to meet anyone for them; say " + k.name + " will see to that when they are back.";
},
function (id) {
if (!id || typeof wTalk !== "function" || typeof cityRpc !== "function")
return false;
var p = presenceOthers[id], nm = stiName(p), doing = (typeof AWL !== "undefined" && AWL.plans[id] && typeof awayWord === "function") ? awayWord(AWL.plans[id]) : "at work";
var go = function (k) {
if (!k || !k.ok) {
if (typeof setStatus === "function")
setStatus(esc(nm) + " is away" + (k && k.say ? ". " + esc(k.say) : ", and their stand-in is not taking talk just now."));
return;
}
var t = { name: k.name + " (stand-in)", persona: stiPersona(k, doing), greet: "", doing: doing }, key = "wtalk:" + t.name;
(store.characters || []).forEach(function (x) { if (x.wKey === key && x.details && x.details.length)
x.details[0] = t.persona; });
wTalk(t);
(store.characters || []).forEach(function (x) { if (x.wKey === key) {
x.stiUid = id;
STI.open = { c: x, from: (x.log || []).length };
} });
stiButton(null);
};
var c = STI.cards[id];
if (c && Date.now() - c.at < 10 * 60000)
go(c.k);
else
cityRpc("standin_card", { p_user: id }).then(function (k) { STI.cards[id] = { k: k, at: Date.now() }; go(k); }).catch(function () { go(null); });
return true;
}
];
});
