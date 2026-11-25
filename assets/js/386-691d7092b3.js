/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var FTK = { VISIT: 20 * 60 * 1000, ALT: "llama-3.3-70b-versatile" };
var FTK_REAL = "This is a real back-and-forth conversation. Listen to exactly what they just said and answer that, carrying on the thread of what was said before. " +
"You have your own day, opinions and life: share a bit of it when it fits, ask them something back when you're curious, disagree when you disagree, change the subject when you'd naturally change it. " +
"Don't keep offering help or asking what they need unless serving people is what you're doing this minute. " +
"Never reuse a sentence, a joke or an opening you've already used in this conversation, and never start two replies with the same words. " +
"Everything you've been told about yourself and about them is for you alone: never announce your age, sex, personality or what you remember, never read it out; only let it show the way it would in a real person (and say your age only if they ask).";
var FTK_FIRST = "Someone has just walked up to you. Say the very first thing you'd say to them: one or two short sentences, the way a real person reacts when someone comes up while they're busy with what they're doing right now, coloured by your mood, your age and your personality, and by whether you know them. " +
"Not a shop greeting, not “how can I help”. No quotation marks, no stage directions.";
function ftkFolk(c) { return typeof fmyIsFolk === "function" && fmyIsFolk(c) && !(typeof okyGod === "function" && okyGod(c)); }
function ftkConn() { return __ZC(386, 0, this, arguments, new.target); }
function ftkWait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
function ftkCall(C, msgs, model) { return __ZC(386, 1, this, arguments, new.target); }
function ftkAsk(C, msgs) { return __ZC(386, 2, this, arguments, new.target); }
function ftkClean(t) {
t = String(t || "").replace(/<think>[\s\S]*?<\/think>/g, "").trim();
t = t.replace(/^[A-Z][\w' .-]{0,40}:\s+/, "");
if (/^["“][\s\S]*["”]$/.test(t))
t = t.slice(1, -1).trim();
return t;
}
function ftkWords(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9' ]+/g, " ").split(/\s+/).filter(Boolean); }
function ftkSame(a, b) { return __ZC(386, 3, this, arguments, new.target); }
function ftkRepeats(c, t) {
return (c.log || []).some(function (x) { return x.who !== "me" && x.text && x.text !== "…" && ftkSame(x.text, t); });
}
function ftkSystem(c) {
var d = c.details, s;
c.details = (d || []).filter(function (x) { return !/^said: /.test(x); });
try {
s = charSystem(c);
}
finally {
c.details = d;
}
return s + " " + FTK_REAL;
}
function ftkHistory(c) { return __ZC(386, 4, this, arguments, new.target); }
function ftkReply(c, C, said) { return __ZC(386, 5, this, arguments, new.target); }
(function () {
if (typeof sendTalk !== "function")
return;
var st = sendTalk;
sendTalk = function () {
var c = talkWith;
if (!ftkFolk(c) || !c.awake)
return st.apply(this, arguments);
var ta = document.getElementById("t-say"), text = ta ? ta.value.trim() : "";
if (!text)
return;
var C = ftkConn();
c.ftkAt = Date.now();
c.log.push({ who: "me", text: text });
ta.value = "";
renderLog();
save();
if (!C) {
var c0 = typeof cfg === "function" ? cfg() : {};
if (c0.mode !== "off" && typeof aiBought === "function" && !aiBought() && typeof offerBuy === "function" && !(typeof okyKey === "function" && okyKey()))
offerBuy("talk", true);
setTimeout(function () {
c.log.push({ who: "them", text: ftkLocal(c, text) });
lastReply = c.log[c.log.length - 1].text;
if (talkWith === c) {
renderLog();
if (typeof okyBar === "function")
okyBar(c);
}
save();
}, 450 + Math.random() * 500);
return;
}
var slot = { who: "them", text: "…" };
var p = ftkReply(c, C, text);
c.log.push(slot);
renderLog();
p.then(function (t) { slot.text = t || ftkLocal(c, text); }, function (e) {
if (e && e.status === 402) {
if (typeof accessDenied === "function")
accessDenied();
if (typeof offerBuy === "function")
offerBuy("talk", true);
}
slot.text = ftkLocal(c, text);
}).then(function () {
var i = c.log.indexOf(slot);
if (i > -1)
c.log[i] = { who: "them", text: slot.text };
lastReply = slot.text;
c.ftkAt = Date.now();
if (talkWith === c)
renderLog();
save();
});
};
})();
function ftkOpen(c) { return __ZC(386, 6, this, arguments, new.target); }
(function () {
if (typeof openTalk !== "function")
return;
var ot = openTalk;
openTalk = function (c) {
var fresh = false;
try {
if (ftkFolk(c) && c.awake && c.log) {
var now = Date.now();
if (!c.ftkAt || now - c.ftkAt > FTK.VISIT) {
if (c.ftkGreet === undefined)
c.ftkGreet = (c.log[0] && c.log[0].who === "them" && c.log.length === 1) ? c.log[0].text : "";
c.log = [];
c.ftkSaid = [];
fresh = true;
}
c.ftkAt = now;
}
}
catch (e) {
if (window.console)
console.warn("[folk-talk]", e);
}
var r = ot.apply(this, arguments);
if (fresh)
setTimeout(function () { try {
if (talkWith === c && !c.log.length)
ftkOpen(c);
}
catch (e) {
if (window.console)
console.warn("[folk-talk]", e);
} }, 0);
return r;
};
})();
(function () {
if (typeof closeTalk !== "function")
return;
var ct = closeTalk;
closeTalk = function () { try {
if (talkWith && ftkFolk(talkWith))
talkWith.ftkAt = Date.now();
}
catch (e) { } return ct.apply(this, arguments); };
})();
function ftkFacts(c) { return __ZC(386, 7, this, arguments, new.target); }
var FTK_L = {
hello: ["Oh, hello there.", "Hiya. Don't mind me, I'm a bit all over the place today.", "Alright? Haven't seen you round here much.", "Hello! You caught me in the middle of things.", "Oh! You made me jump. Hello.", "Afternoon to you too, whatever time it is.", "Hey. Nice to see a friendly face."],
how: ["Not bad, all things considered. You?", "Oh, getting by. My feet have had better days.", "Honestly? Tired, but I can't complain. Well, I can, but I won't.", "Better now I've stopped for a minute.", "Can't grumble. Well, I could. How about you?", "Busy, busy. That's how I like it, mostly."],
name: ["I'm {first}. And you are?", "{first}. Most people round here just shout it across the street.", "Name's {first}. Pleased to meet you properly.", "{first}, since you ask. Yours?"],
job: ["I'm a {job}{at}. It's not glamorous, but it's mine.", "{job}{at}, for my sins. Keeps me out of trouble.", "I work as a {job}{at}. Ask me anything about it, I dare you.", "Oh, {job}. Been at it long enough to know all the tricks."],
where: ["Ooh, I'm not the best with directions. Try the map, or ask at the nearest shop.", "Somewhere that way, I think? Don't quote me.", "You want the map for that, honestly. I only know my own corner.", "If I told you I'd only get you lost. Ask someone with a better sense of direction than me."],
thanks: ["Any time.", "Oh, it's nothing.", "Don't mention it.", "Glad to, honestly."],
bye: ["Mind how you go.", "See you around, then.", "Take care of yourself.", "Off you go then. Don't be a stranger.", "Bye now!"],
doing: ["I'm {doing}, if you can believe it.", "Just {doing}. Same as always.", "Oh, {doing}. Somebody's got to."],
other: ["Ha, you might be right there.", "Hm. I'd never thought of it like that.", "Is that so? Go on.", "Well, there's a thing.", "You know, my mum used to say something like that.", "Funny you should say that.", "I'll have to think about that one.", "Oh, don't get me started.", "Couldn't tell you, love. Not my area.", "Really? I'd not heard.", "Fair enough, I suppose.", "You don't say."]
};
var FTK_KID = {
hello: ["Hi! Are you a grown-up dreamer? Cool.", "Hello! I'm not supposed to talk to strangers. You look alright though.", "Hi! Do you want to see something cool?", "Oh hi! I'm bored. Are you bored?"],
how: ["Good! We had pudding today.", "Okay. A bit bored.", "Great! I found a really good stick."],
other: ["Whoa. Really?", "That's so weird.", "I don't get it.", "My friend says that too!", "Can I come?", "That's boring. Want to hear a joke?"]
};
function ftkIntent(q) { return __ZC(386, 8, this, arguments, new.target); }
function ftkFill(s, f) {
return s.replace("{first}", f.first || "me").replace("{job}", f.job || "bit of everything").replace("{at}", f.work ? " at " + f.work : "").replace("{doing}", f.doing || "getting on with things");
}
function ftkPickNew(c, L) {
var said = c.ftkSaid || (c.ftkSaid = []);
var fresh = L.filter(function (s) { return said.indexOf(s) < 0; });
if (!fresh.length)
return null;
var s = fresh[Math.floor(Math.random() * fresh.length)];
said.push(s);
return s;
}
function ftkLocal(c, q) { return __ZC(386, 9, this, arguments, new.target); }
function ftkLocalGreet(c) { return __ZC(386, 10, this, arguments, new.target); }
