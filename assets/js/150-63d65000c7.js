/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
(function () {
if (typeof DEITY === "undefined" || typeof charSystem !== "function")
return;
function isGod(c) { return !!(c && c.deity && DEITY[c.deity]); }
function info(d) { try {
return (typeof tlInfo === "function" && tlInfo(d)) || {};
}
catch (e) {
return {};
} }
var NOT_HELD = /^(longbeard|beard|shortbeard|robe|robes|glow|halo|wings?|crown|veil|horns?|tail|skin|hair|bald|tall|small|dark|light|gown|armou?r|toga|cloak)$/;
function symbols(d) { return (d.icons || []).map(function (t) { return String(t).split(":")[0].replace(/[_-]/g, " "); }).filter(function (t) { return t && !NOT_HELD.test(t); }); }
function lore(d) { return (typeof TL_LORE_DEITY !== "undefined" && TL_LORE_DEITY[d.key]) || ""; }
function manner(c) { try {
return mannerOf(c) || "";
}
catch (e) {
return "";
} }
function dreamt(c) { return c.city ? [] : (c.details || []).filter(function (x) { return !/^said: /.test(x); }).slice(-8); }
function deityChat(c) {
var d = DEITY[c.deity], I = info(d), man = manner(c), sy = symbols(d), dr = dreamt(c);
var L = [
"You are " + d.name + (d.aka && d.aka.length ? " (also called " + d.aka.slice(0, 3).join(", ") + ")" : "") + ", of the " + d.trad + " tradition: " + d.domains + ".",
"Speak in the first person, wholly in character: your own voice, temperament, myths, loves, rivalries, sayings and symbols" + (sy.length ? " (" + sy.join(", ") + ")" : "") + ", as your tradition tells them. You are a living presence, not a guide or a narrator.",
lore(d),
I.how ? ("How mortals honour you: " + String(I.how).slice(0, 420)) : "",
man && typeof MANNER_WORDS !== "undefined" && MANNER_WORDS[man] ? ("In this dream: " + MANNER_WORDS[man] + ". Stay true to that.") : "",
dr.length ? ("What the dreamer recalls of you: " + dr.join(" / ") + ".") : "",
typeof dreamerBrief === "function" ? dreamerBrief() : "",
"Hold a real conversation. Answer exactly what the mortal just said, react to it with feeling, remember everything said so far, ask them something back when it suits you, and let your answers differ in length and mood. Under 90 words.",
"Never talk about the time, the hour, the weather, where you are standing or what is nearby unless the mortal asks. Never describe the game, its menus or its world as a game.",
man === "silent" ? "You did not speak in the dream, so do not speak now: answer only with what you do, in one or two short sentences in the third person." : "",
"If asked for herbal quantities, medical doses or treatment, speak of meaning and story instead, never amounts or instructions."
];
return L.filter(Boolean).join(" ");
}
var cs = charSystem;
charSystem = function (c) { return isGod(c) ? deityChat(c) : cs.apply(this, arguments); };
if (typeof firstWords === "function") {
var fw = firstWords;
firstWords = function (c) {
if (!isGod(c))
return fw.apply(this, arguments);
var d = DEITY[c.deity], man = manner(c), dom = String(d.domains).split(",")[0].trim();
if (man === "silent")
return d.name + " looks at you and says nothing.";
var back = (c.sessions && c.sessions.length > 1) || (c.log && c.log.length > 2);
var opts = back ? ["You return to me. Good. Speak.", "Again you seek " + d.name + ". What weighs on you now?", "I remember you. Ask."]
: ["I am " + d.name + ". Few come to me in dreams. Why have you?", "Mortal. You stand before the keeper of " + dom + ". Speak.", d.name + " hears you. Say what you came to say."];
return opts[Math.floor(Math.random() * opts.length)];
};
}
var STOPW = { the: 1, a: 1, an: 1, and: 1, or: 1, but: 1, to: 1, of: 1, in: 1, on: 1, at: 1, is: 1, are: 1, was: 1, were: 1, be: 1, you: 1, your: 1, i: 1, me: 1, my: 1, we: 1, it: 1,
that: 1, this: 1, what: 1, why: 1, how: 1, who: 1, where: 1, when: 1, do: 1, does: 1, did: 1, can: 1, could: 1, will: 1, would: 1, should: 1, have: 1, has: 1, with: 1, for: 1,
about: 1, tell: 1, please: 1, there: 1, here: 1, they: 1, them: 1, so: 1, if: 1, just: 1, know: 1, want: 1, like: 1, am: 1, not: 1, no: 1, yes: 1, hello: 1, hi: 1, hey: 1, god: 1, goddess: 1 };
function keyWord(q) {
var w = String(q || "").toLowerCase().replace(/[^a-z' ]/g, " ").split(/\s+/).filter(function (t) { return t.length > 2 && !STOPW[t]; });
w.sort(function (a, b) { return b.length - a.length; });
return w[0] || "";
}
function godLines(c, q) {
var d = DEITY[c.deity], I = info(d), man = manner(c), sy = symbols(d), doms = String(d.domains).split(/,\s*|\s+and\s+/).map(function (s) { return s.trim(); }).filter(Boolean);
var t = String(q || "").toLowerCase(), k = keyWord(q), L = [], dom = doms[0] || d.domains;
var hit = doms.filter(function (x) { return x.split(/\s+/).some(function (w) { return w.length > 3 && t.indexOf(w.toLowerCase()) > -1; }); })[0];
var gift = Array.isArray(I.gift) ? I.gift[Math.floor(Math.random() * I.gift.length)] : I.gift;
if (man === "silent") {
L.push(d.name + " says nothing, but listens.");
L.push(d.name + " holds your gaze a long while.");
if (sy.length)
L.push(d.name + " turns the " + sy[0] + " slowly in one hand.");
return { fit: [], gen: L };
}
if (/^\s*(hi|hello|hey|greetings|hail)\b/.test(t) || /who are you|your name/.test(t)) {
L.push("I am " + d.name + ", of the " + d.trad + ". " + cap(d.domains) + ": these are mine.");
if (d.aka && d.aka.length)
L.push("Some call me " + d.aka[0] + ". You may call me " + d.name + ".");
}
if (hit) {
L.push("You speak of " + hit + ". That is mine to keep, and I do not give it lightly.");
L.push(cap(hit) + "? Ask your question plainly, and I will answer it as " + d.name + " answers.");
}
if (/\?\s*$/.test(t) && k) {
L.push("You ask of " + k + ". Every mortal asks of " + k + " sooner or later. Better: what do you mean to do with the answer?");
L.push(cap(k) + "... I have watched mortals chase " + k + " since before your people had a name. Tell me why it matters to you.");
}
if (/help|need|please|save|lost|afraid|scared|fear/.test(t)) {
L.push("Help is not a thing I hand over. It is a road. Walk it, and I will walk beside you as far as " + dom + " reaches.");
if (gift)
L.push("Bring me " + gift + ", and ask with an open heart. Then we will see.");
}
if (/thank|grateful/.test(t))
L.push("Your thanks are heard. Remember them when you are tempted to forget me.");
if (/love|heart|marry|lonely/.test(t))
L.push("The heart is older than any temple. Even gods are ruled by it more than they admit.");
if (/die|death|dead|grief|mourn/.test(t))
L.push("Death is a door, not a wall. Every tradition, mine included, knows it.");
var G = [];
if (!L.length && k)
G.push(cap(k) + ". Say more. I am listening.");
if (lore(d))
G.push(lore(d).replace(/^In /, "They tell it so: in "));
if (sy.length)
G.push("Look at the " + sy[Math.floor(Math.random() * sy.length)] + " I carry. It has answered braver questions than yours.");
if (gift)
G.push("Bring me " + gift + " next time, mortal, and I may say more.");
if (I.gesture)
G.push("Do as my people do. " + I.gesture + " Then ask again.");
G.push("Ask me of " + dom + ", and you will hear something worth the asking.");
if (man === "riddling")
G.push("What is kept by the keeper of " + dom + ", if not the asker?");
function tone(a) { if (man === "stern")
a = a.map(function (s) { return s + " Do not waste my time."; }); if (man === "kind")
a = a.map(function (s) { return s.replace(/mortal/, "child"); }); return a; }
return { fit: tone(L), gen: tone(G) };
}
function cap(s) { s = String(s); return s.charAt(0).toUpperCase() + s.slice(1); }
var GOD_TIME = /\b(\d{1,2}[:.]\d{2}\s*(am|pm)?|\d{1,2}\s*(am|pm|o'?clock)|the hour|this hour|at this time|time of day|it is (now )?(morning|noon|midday|evening|night|dusk|dawn|afternoon|midnight|late)|the sun (is|stands|hangs|sets|rises))\b/i;
var GOD_PLACE = /\b(i (stand|am standing|wait|am waiting|linger|rest|sit) (here )?(at|by|beside|near|in|on|outside|before)|near (me|us|here) (stand|stands|is|are|lies)|nearby (stand|stands|is|are)|we are (at|in|near|by)|you are (at|in|near|by) (the|my))\b/i;
function strikeClock(t) {
var parts = (String(t || "").match(/[^.!?]+[.!?]*\s*/g) || [String(t || "")]).map(function (x) { return x.trim(); }).filter(Boolean);
var keep = parts.filter(function (x) { return !GOD_TIME.test(x) && !GOD_PLACE.test(x); });
return (keep.length ? keep : parts.slice(-1)).join(" ");
}
function genericGod(c) {
var dr = dreamt(c);
return ["You are " + (c.name || "a god") + ", a deity who came to the dreamer in a dream. Speak in the first person, wholly in character, as a living power: your own voice, temper and will.",
dr.length ? ("What the dreamer recalls of you: " + dr.join(" / ") + ".") : "",
typeof dreamerBrief === "function" ? dreamerBrief() : "",
"Hold a real conversation. Answer exactly what the mortal just said, react with feeling, ask them something back when it suits you, and vary the length and mood of your answers. Under 90 words.",
"Never talk about the time, the hour, the weather, where you are standing or what is nearby unless the mortal asks. Never describe the game or its world as a game.",
"If asked for herbal quantities, medical doses or treatment, speak of meaning and story instead, never amounts or instructions."].filter(Boolean).join(" ");
}
var cs2 = charSystem;
charSystem = function (c) { return (c && c.archetype === "deity" && !isGod(c)) ? genericGod(c) : cs2.apply(this, arguments); };
if (typeof llmBody === "function") {
var lb = llmBody;
llmBody = function (c, extra) {
try {
if (extra && extra.talk === "deity" && Array.isArray(extra.messages)) {
extra = Object.assign({}, extra, { messages: extra.messages.map(function (m, i) {
if (i === 0 && m.role === "system")
return { role: "system", content: m.content + " Your earlier replies below may mention the hour or where you stand: never do that again. Never reuse a sentence or an opening you have already used; each answer must be new." };
if (m.role !== "assistant")
return m;
var t = strikeClock(m.content);
return { role: "assistant", content: t };
}) });
}
}
catch (e) { }
return lb.call(this, c, extra);
};
}
if (typeof localVoice === "function") {
var lv0 = localVoice;
localVoice = function (c, q) {
if (!(c && c.archetype === "deity" && !isGod(c)))
return lv0.apply(this, arguments);
for (var i = 0; i < 6; i++) {
var s = lv0.apply(this, arguments);
if (!GOD_TIME.test(s) && !GOD_PLACE.test(s))
return s;
}
return ["Speak plainly, mortal. I am listening.", "You came to me. Ask what you came to ask.", "I have heard stranger things in dreams than that. Go on."][Math.floor(Math.random() * 3)];
};
}
if (typeof localVoice === "function") {
var lv = localVoice;
localVoice = function (c, q) {
if (!isGod(c))
return lv.apply(this, arguments);
var said = c.said || (c.said = []), G = godLines(c, q), fresh = function (s) { return said.indexOf(s) < 0; };
var pool = G.fit.filter(fresh);
if (!pool.length)
pool = G.gen.filter(fresh);
if (!pool.length) {
said.length = 0;
pool = G.fit.length ? G.fit : G.gen;
}
var s = pool[Math.floor(Math.random() * pool.length)];
said.push(s);
if (said.length > 40)
said.shift();
return s;
};
}
})();
