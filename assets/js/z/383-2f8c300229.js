/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(383, function () {
"use strict";
return [
function () {
var base = typeof cfg === "function" ? cfg() : { mode: "off" };
var key = typeof okyKey === "function" ? okyKey() : "";
if (key)
return Object.assign(base, { mode: "direct", key: key, model: LLM_MODEL });
if (typeof okyQuiet === "function" && okyQuiet())
return null;
if (base.mode === "off")
return null;
if (typeof aiBought === "function" && !aiBought())
return null;
return base;
},
function (C, msgs, model) {
var ready = (C.mode === "app" && typeof freshToken === "function") ? freshToken().catch(function () { }) : Promise.resolve();
return ready.then(function () {
var T = llmTarget(C), x = Object.assign({}, C);
if (model)
x.model = model;
return fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify(llmBody(x, { temperature: 1.0, max_tokens: 1200, messages: msgs, say: 1 })) });
}).then(function (r) { if (!r.ok) {
var e = new Error(r.status);
e.status = r.status;
throw e;
} return r.json(); })
.then(function (d) { return ftkClean(d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content || ""); });
},
function (C, msgs) {
var tries = [null, null, FTK.ALT], i = 0;
function go() {
var m = tries[i++];
return ftkCall(C, msgs, m).then(function (t) {
if (t || i >= tries.length)
return t;
return ftkWait(900).then(go);
}, function (e) {
if (e && e.status === 402)
throw e;
if (i >= tries.length)
return "";
return ftkWait(e && e.status === 429 ? 2600 : 1200).then(go);
});
}
return go();
},
function (a, b) {
var A = ftkWords(a), B = ftkWords(b);
if (!A.length || !B.length)
return false;
if (A.slice(0, 4).join(" ") === B.slice(0, 4).join(" ") && A.length > 3)
return true;
var s = {}, n = 0;
A.forEach(function (w) { s[w] = 1; });
var u = Object.keys(s).length;
B.forEach(function (w) { if (s[w] === 1) {
n++;
s[w] = 2;
}
else if (!s[w]) {
s[w] = 3;
u++;
} });
return u > 4 && n / u >= 0.6;
},
function (c) {
var out = [];
(c.log || []).filter(function (t) { return t.text && t.text !== "…"; }).slice(-14).forEach(function (t) {
out.push({ role: t.who === "me" ? "user" : "assistant", content: t.text });
});
while (out.length && out[0].role === "assistant" && out.length > 1 && out[1].role === "assistant")
out.shift();
return out;
},
function (c, C, said) {
var msgs = [{ role: "system", content: ftkSystem(c) }].concat(ftkHistory(c));
return ftkAsk(C, msgs).then(function (t) {
if (!t || !ftkRepeats(c, t))
return t;
return ftkAsk(C, msgs.concat([{ role: "assistant", content: t }, { role: "system", content: "That reply repeated something you had already said in this conversation. Answer their last words again, in fresh words of your own. Do not mention this note." }]))
.then(function (t2) { return t2 || t; });
}).then(function (t) {
return (t && typeof stfAfter === "function") ? stfAfter(c, t, said, msgs, false).catch(function () { return t; }) : t;
});
},
function (c) {
var C = ftkConn();
if (!C) {
c.log.push({ who: "them", text: ftkLocalGreet(c) });
if (talkWith === c)
renderLog();
save();
return;
}
var slot = { who: "them", text: "…" };
c.log.push(slot);
if (talkWith === c)
renderLog();
var msgs = [{ role: "system", content: ftkSystem(c) + " " + FTK_FIRST }, { role: "user", content: "(walks up to you)" }];
ftkAsk(C, msgs).catch(function () { return ""; }).then(function (t) {
var i = c.log.indexOf(slot);
if (t && typeof stfStrip === "function")
t = stfStrip(t);
t = t || ftkLocalGreet(c);
if (i > -1)
c.log[i] = { who: "them", text: t };
lastReply = t;
if (talkWith === c)
renderLog();
save();
});
},
function (c) {
var d = String((c.details && c.details[0]) || ""), f = {};
var m = /You work as an? ([^.]*?)(?: at ([^.]*))?\./.exec(d);
if (m) {
f.job = m[1];
f.work = m[2] || "";
}
m = /You live at ([^.]*)\./.exec(d);
if (m)
f.home = m[1];
f.doing = c.doing && c.doing !== "here" ? c.doing : "";
f.first = String(c.name || "").split(/\s+/)[0];
f.age = c.ftkAge || 0;
return f;
},
function (q) {
var s = String(q || "").toLowerCase();
if (/\b(bye|goodbye|see you|see ya|later|goodnight|good night)\b/.test(s))
return "bye";
if (/\b(thanks|thank you|cheers|ta)\b/.test(s))
return "thanks";
if (/\b(your name|who are you|what are you called|call you)\b/.test(s))
return "name";
if (/\bhow are you|how're you|how you doing|how's it going|you ok|you alright|how do you do\b/.test(s))
return "how";
if (/\b(what do you do|your job|work as|where do you work|for a living)\b/.test(s))
return "job";
if (/\b(what are you doing|what you doing|what're you up to|up to)\b/.test(s))
return "doing";
if (/\b(where is|where's|how do i get|which way|directions|find the)\b/.test(s))
return "where";
if (/^\s*(hi|hello|hey|hiya|yo|good (morning|afternoon|evening)|morning|evening)\b/.test(s))
return "hello";
return "other";
},
function (c, q) {
var f = ftkFacts(c), it = ftkIntent(q), kid = f.age && f.age < 13;
if (it === "job" && !f.job)
it = "other";
if (it === "doing" && !f.doing)
it = "other";
var L = (kid && FTK_KID[it]) || FTK_L[it] || FTK_L.other;
var s = ftkPickNew(c, L) || ftkPickNew(c, kid ? FTK_KID.other : FTK_L.other) || ftkPickNew(c, FTK_L.other.concat(FTK_L.thanks));
if (!s)
s = "Anyway. I'd best get on, I think.";
return ftkFill(s, f);
},
function (c) {
if (c.ftkGreet && !(c.ftkSaid || []).length) {
(c.ftkSaid = c.ftkSaid || []).push(c.ftkGreet);
return c.ftkGreet;
}
var f = ftkFacts(c), kid = f.age && f.age < 13, keeper = typeof fmyRole === "function" && fmyRole() === "keeper";
var L = kid ? FTK_KID.hello : FTK_L.hello.slice();
if (keeper && !kid)
L = ["Keeper! Well, this is a surprise.", "Oh, it's the Keeper. Mind the mess, I wasn't expecting anyone.", "Keeper, hello! Don't tell anyone you caught me slacking."];
if (f.doing && !kid)
L = L.concat(["Sorry, I'm {doing}. Give me a second.", "Oh, hello. I'm just {doing}."]);
return ftkFill(ftkPickNew(c, L) || "Hello.", f);
}
];
});
