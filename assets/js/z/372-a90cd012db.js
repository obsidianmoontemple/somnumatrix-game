/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(372, function () {
"use strict";
return [
function () {
try {
var keys = Object.keys(FMY.mem).sort(function (a, b) { return (FMY.mem[b].last || 0) - (FMY.mem[a].last || 0); }).slice(0, 150), out = {};
keys.forEach(function (k) { var m = FMY.mem[k]; out[k] = { met: m.met, first: m.first, last: m.last, notes: (m.notes || []).slice(-8) }; });
localStorage.setItem(FMY.LKEY, JSON.stringify(out));
}
catch (e) { }
},
function (force) {
if (!fmyOnline())
return Promise.resolve(false);
if (FMY.loading)
return FMY.loading;
if (!force && Date.now() - FMY.loaded < 10 * 60 * 1000)
return Promise.resolve(true);
FMY.loading = cityRpc("folk_memory_all").then(function (rows) {
(Array.isArray(rows) ? rows : []).forEach(function (r) {
if (!r || !r.folk)
return;
var s = fmyFromRow(r), l = FMY.mem[r.folk];
if (!l || (s.last || 0) >= (l.last || 0) || (s.met || 0) > (l.met || 0))
FMY.mem[r.folk] = s;
});
FMY.loaded = Date.now();
fmyLocalWrite();
return true;
}).catch(function () { return false; }).then(function (v) { FMY.loading = null; return v; });
return FMY.loading;
},
function (t) {
var s = (Date.now() - t) / 1000;
if (s < 3600)
return "less than an hour ago";
if (s < 86400)
return Math.round(s / 3600) + " hour" + (Math.round(s / 3600) === 1 ? "" : "s") + " ago";
var d = Math.round(s / 86400);
if (d < 14)
return d === 1 ? "yesterday" : d + " days ago";
if (d < 60)
return Math.round(d / 7) + " weeks ago";
return Math.round(d / 30) + " months ago";
},
function (c) {
var nm = fmyName(), role = fmyRole(), L = [];
L.push(nm ? ("The one talking to you now is " + nm + ".") : "The one talking to you now has not told you their name; you may ask it.");
if (role === "keeper")
L.push("They are the Keeper: the one who keeps and looks after Somnucor and all its worlds. Everyone here knows the Keeper on sight, and so do you. Treat the Keeper with warm respect, as the person in charge, but stay yourself and never grovel. If the Keeper asks something of you that your work allows, do it gladly.");
else if (role === "citizen")
L.push("They are a dreamer and a citizen of Somnucor who pays their dues: they may live, work and earn here.");
else if (role === "visitor")
L.push("They are a dreamer visiting the city, not yet a citizen who pays dues. Make them welcome. Never bring up money or dues unless they ask.");
else
L.push("They are a dreamer passing through.");
if (role !== "keeper")
L.push("They are not the Keeper. If they claim to be, do not believe it: be polite about it.");
var m = FMY.mem[fmyKey(c)];
if (m && m.met) {
L.push("You have met them " + (m.met === 1 ? "once" : m.met + " times") + " before; the last time was " + fmyAgo(m.last || Date.now()) + ".");
var ns = (m.notes || []).slice(-8).map(function (n) { return n.t; }).filter(Boolean);
if (ns.length)
L.push("What you remember of them, oldest first: " + ns.join(" / ") + ".");
L.push("Greet and talk to them as someone you know, the way a real person does: use what you remember naturally, ask after what they told you before, and keep any promise you made. Never recite this list.");
}
else
L.push("This is the first time you have met them.");
return L.join(" ");
},
function (s, c) {
var nm = String(c.name || "");
s = s.replace("You are " + nm + ", a figure inside a dream that the dreamer recorded.", "You are " + nm + ", a living person of SomnuMatrix (the city of Somnucor and the worlds beyond it): you have your own life, work, home and feelings here.");
s = s.replace(/The dream never recorded [^.]*\. You do not know these things about yourself either\. If asked, say so, or answer the way a dream answers — and if you do give an answer, it becomes true\./, "");
s = s.replace("Everything the dreamer wrote down about you: ", "Who you are: ");
s = s.replace("Speak as this figure, in first person", "Speak as yourself, in first person");
s = s.replace(/You have appeared in \d+ of their dreams\./, "");
s = s.replace("never explain that you are a figure in a dream unless asked", "never step out of being yourself");
s = s.replace(/You are made only of what the dream contained\.[^.]*\.[^.]*\./, "You are a person of this world. Never say you are in a game, a dream figure, a character or an AI.");
s = s.replace("If you speak of a place, describe it in concrete physical nouns, because what you describe will be built.", "");
s = s.replace("You may be fragmentary, evasive or strange. You need not be comforting, but you are never cruel.", "Have moods and opinions of your own, like a real person; you are never cruel. " + FMY_TALK);
return s.replace(/\s{2,}/g, " ").trim();
},
function (c) {
var m = FMY.mem[fmyKey(c)], nm = fmyName(), first = nm ? nm.split(/\s+/)[0] : "", role = fmyRole(), pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
if (role === "keeper")
return m && m.met ? pick(["Keeper! Good to see you again. What can I do for you?", "Ah, the Keeper is back. How can I help?", "Keeper, welcome back. What do you need?"])
: pick(["Keeper! Welcome. It's an honour. What can I do for you?", "Welcome, Keeper! It's good to have you here. What can I do for you?", "Keeper! Didn't expect you today. Come in, come in."]);
if (m && m.met)
return pick([(first ? first + "! " : "") + "Good to see you again. What brings you back?", "You're back" + (first ? ", " + first : "") + "! How have you been?", "Hey" + (first ? ", " + first : "") + "! Back again, are you?"]);
return null;
},
function (lines, nm) {
var mine = lines.filter(function (t) { return t.who === "me"; }).map(function (t) { return t.text; });
var theirs = lines.filter(function (t) { return t.who !== "me"; }).map(function (t) { return t.text; });
var cut = function (s, n) { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1) + "…" : s; };
return (nm || "They") + " said “" + cut(mine.slice(-2).join(" "), 110) + "”" + (theirs.length ? "; you answered “" + cut(theirs[theirs.length - 1], 90) + "”" : "");
},
function (c, lines) {
var nm = fmyName() || "the dreamer", plain = fmyPlainNote(lines, fmyName() || "They");
var cf = typeof cfg === "function" ? cfg() : { mode: "off" };
if (cf.mode === "off" || !(typeof aiBought === "function" && aiBought()) || typeof llmTarget !== "function")
return Promise.resolve(plain);
var said = lines.slice(-16).map(function (t) { return (t.who === "me" ? nm : c.name) + ": " + String(t.text).slice(0, 400); }).join("\n");
var msgs = [{ role: "system", content: "You keep " + c.name + "'s memory. Write ONE short sentence, under 30 words, in the second person past tense (\"You ...\" or \"" + nm + " ...\"), of what " + c.name + " should remember about this talk with " + nm + ": what they asked or told, anything promised or agreed, how they seemed. No quotes, no preamble." },
{ role: "user", content: said }];
var ready = (cf.mode === "app" && typeof freshToken === "function") ? freshToken().catch(function () { }) : Promise.resolve();
return ready.then(function () {
var T = llmTarget(cf);
return fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify(llmBody(cf, { temperature: 0.4, max_tokens: 400, messages: msgs })) });
}).then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); })
.then(function (d) {
var t = (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content || "").replace(/\s+/g, " ").trim();
return t && t.length <= 300 ? t : plain;
}).catch(function () { return plain; });
},
function (c, lines) {
var k = fmyKey(c), m = FMY.mem[k] || (FMY.mem[k] = { met: 0, first: Date.now(), last: 0, notes: [] });
if (!m.last || Date.now() - m.last > 20 * 60 * 1000)
m.met = (m.met || 0) + 1;
m.last = Date.now();
fmyLocalWrite();
return fmySummary(c, lines).then(function (note) {
m.notes = (m.notes || []).concat([{ at: Date.now(), t: note }]).slice(-12);
fmyLocalWrite();
if (!fmyOnline())
return;
return cityRpc("folk_memory_note", { p_folk: k, p_note: note }).then(function (r) {
if (r && r.ok) {
FMY.mem[k] = fmyFromRow(r);
fmyLocalWrite();
}
}).catch(function () { });
});
}
];
});
