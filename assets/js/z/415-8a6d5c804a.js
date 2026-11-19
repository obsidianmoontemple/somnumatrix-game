/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(415, function () {
"use strict";
return [
function (rk) {
if (!rk || !store || !store.characters)
return null;
var n = store.characters.length;
if (!TWH.map || TWH.mapN !== n || Date.now() - TWH.mapAt > 20000) {
var M = {};
store.characters.forEach(function (x) { if (x && x.primary === false && x.src && x.src.role === "belongs" && x.objId) {
try {
M[cfkKey(x)] = x;
}
catch (e) { }
} });
TWH.map = M;
TWH.mapN = n;
TWH.mapAt = Date.now();
}
var c = TWH.map[rk];
return c && store.characters.indexOf(c) >= 0 ? c : null;
},
function (rec, c, h) {
var r = twhRoutine(rec, c);
if (!r)
return null;
if (c && !c.primary && typeof hash === "function")
h = ((h - ((hash(c.id) % 100) - 50) / 60) % 24 + 24) % 24;
for (var i = 0; i < r.length; i++)
if (h >= r[i][0] && h < r[i][1]) {
for (var j = 1; j <= r.length; j++) {
var s = r[(i + j) % r.length];
if (s[2] !== r[i][2] || s[3] !== r[i][3])
return { h: s[0], where: s[2], doing: s[3], place: twhPlaceFor(s[2], rec) };
}
}
return null;
},
function (name) {
var out = { name: name, where: "out", doing: "out and about in Somnucor", place: "", asleep: false, src: "about", x: null, z: null };
var m = typeof mtgOpen === "function" ? mtgOpen(name) : null, st = m && typeof mtgStage === "function" ? mtgStage(m) : "";
if (m && st === "walking") {
var mins = Math.max(1, Math.round((m.at - Date.now()) / 60000)), p = typeof mtgPos === "function" ? mtgPos(m, st) : null;
return Object.assign(out, { where: "travel", doing: "walking to " + m.place + " to meet them", place: "", dest: m.place, eta: mins, src: "meeting", x: p && p.x, z: p && p.z });
}
if (m && (st === "waiting" || st === "met")) {
var q = typeof mtgPos === "function" ? mtgPos(m, st) : null;
return Object.assign(out, { where: "meeting", doing: st === "met" ? "with them at " + m.place : "waiting by the door of " + m.place + " for them", place: m.place, src: "meeting", x: q && q.x, z: q && q.z });
}
var rec = twhStore()[name], who = (typeof fpsStore === "function" && fpsStore().who && fpsStore().who[name]) || {};
if (rec && (rec.rk || rec.role)) {
var c = twhLive(rec.rk), h = twhHour(), w = null;
if (c && typeof whereabouts === "function") {
try {
w = whereabouts(c, h);
}
catch (e) {
w = null;
}
}
if (w) {
var at = twhName(w.at);
Object.assign(out, { where: w.where, doing: w.doing, place: at, asleep: !!w.asleep, src: "figure", x: w.x, z: w.z });
}
else {
var r = twhRoutine(rec, null), s = null;
if (r)
for (var i = 0; i < r.length; i++)
if (h >= r[i][0] && h < r[i][1]) {
s = r[i];
break;
}
if (s)
Object.assign(out, { where: s[2], doing: s[3], place: twhPlaceFor(s[2], rec), asleep: s[3].indexOf("asleep") >= 0, src: "hours" });
}
if (out.where === "travel") {
var to = /home/.test(out.doing) ? rec.home : rec.work;
out.dest = to || "";
out.place = "";
}
if (out.where === "gone") {
out.where = "out";
out.doing = "out, away from the city streets";
}
out.home = rec.home;
out.work = rec.work;
out.next = twhNext(rec, c, h);
if (m && st === "before")
out.later = m;
return out;
}
var post = (who.place || "").trim();
if (post) {
Object.assign(out, { where: "work", doing: "at work" + (who.title ? ", " + who.title : ""), place: post, src: "post" });
}
if (m && st === "before")
out.later = m;
return out;
},
function (name) {
var t;
try {
t = twhNow(name);
}
catch (e) {
return "";
}
if (t.src === "meeting")
return t.where === "travel" ? "🚶 On the way to " + t.dest + " to meet you (" + t.eta + " min)" : "📍 At " + t.place + ", " + (/waiting/.test(t.doing) ? "waiting for you" : "with you");
if (t.asleep)
return "🌙 Asleep" + (t.place ? " at " + t.place : " at home");
if (t.where === "travel")
return "🚶 " + t.doing.charAt(0).toUpperCase() + t.doing.slice(1) + (t.dest ? " (" + t.dest + ")" : "");
if (t.where === "home")
return "🏠 At home" + (t.place ? ", " + t.place : "") + (t.doing && t.doing !== "at home" ? " · " + t.doing : "");
if (t.where === "work")
return "🛠️ At work" + (t.place ? ", " + t.place : "") + (t.doing && !/^at work/.test(t.doing) ? " · " + t.doing : "");
if (t.src === "about")
return "";
return "📍 " + t.doing.charAt(0).toUpperCase() + t.doing.slice(1) + (t.place ? " (" + t.place + ")" : "");
},
function (c, voice) {
if (!c || !c.name || c.deity || c.archetype === "deity")
return "";
var t = twhNow(c.name), now = twhClock(twhHour()), s;
if (t.src === "meeting" && t.where === "travel")
s = "You are walking through the streets to " + t.dest + " to meet them, as you agreed; you will be there in about " + t.eta + " minutes.";
else if (t.src === "meeting")
s = "You are at " + t.place + " right now, " + (/waiting/.test(t.doing) ? "standing by the door waiting for them, as you agreed." : "with them.");
else if (t.asleep)
s = "You were asleep in bed" + (t.place ? " at " + t.place : " at home") + " when this came in" + (voice ? "; the phone woke you" : "; you have just woken to it") + ", and you are still in bed, sleepy.";
else if (t.where === "travel")
s = "You are " + t.doing + (t.dest ? ", on foot through the streets towards " + t.dest : "") + ".";
else if (t.src === "about")
s = "You are out and about in Somnucor, at no particular place you could name.";
else
s = "You are " + t.doing + (t.place && t.doing.indexOf(t.place) < 0 ? " at " + t.place : "") + ".";
var next = t.next && t.next.doing ? " Your day goes on as usual: from about " + twhClock(t.next.h) + " you are " + t.next.doing + (t.next.place ? " at " + t.next.place : "") + "." : "";
var later = t.later ? " Later you are meeting them at " + t.later.place + " at " + (typeof mtgClock === "function" ? mtgClock(t.later.at) : "") + "; until you set off for it you carry on as above." : "";
var ev = twhEvents();
return " WHERE YOU REALLY ARE (this is what the city shows this minute; anyone who goes to look finds you exactly there): it is " + now + ". " + s + next + later +
" If they ask where you are or what you are doing, say this, in your own words. Never say you are anywhere else or doing anything else right now, never say you are on your way or coming over" +
" unless it is said above, and never say you will be somewhere unless it is your day above or a meeting you set with the MEET tag." +
(t.src === "figure" || t.src === "hours" ? " If they want you somewhere, be honest about how long the walk is from where you are (most of the city is a few minutes to a quarter of an hour on foot)." : "") + ev;
},
function () {
try {
if (typeof EVT === "undefined" || !EVT.board || !EVT.board.events || typeof evtLive !== "function")
return "";
var now = Date.now(), L = EVT.board.events.filter(function (e) { return e.status === "announced" && (evtLive(e) || (evtStart(e) > now && evtStart(e) - now < 12 * 3600000)); }).slice(0, 4);
if (!L.length)
return " There is no city event on today, so do not talk as if there were one.";
return " The city events that are really on: " + L.map(function (e) { return e.title + (typeof evtWhere === "function" ? " (" + evtWhere(e) + ")" : "") + (evtLive(e) ? ", on now" : ", starting at " + twhClock(twhHour() + (evtStart(e) - now) / 3600000)); }).join("; ") +
". You are not at any of them unless it says so above; never invent another.";
}
catch (e) {
return "";
}
},
function (c, raw) {
if (!c || !c.name || c.deity)
return "";
var text = String(raw || "").replace(/\[\[[^\]]*\]\]?/g, " "), t = twhNow(c.name), ok = {}, bad = "";
if (t.place)
ok[t.place] = 1;
if (t.dest)
ok[t.dest] = 1;
if (t.where === "work" && t.work)
ok[t.work] = 1;
var m;
TWH_CLAIM.lastIndex = 0;
while ((m = TWH_CLAIM.exec(text))) {
var said = m[2].replace(/[’]/g, "'"), p = twhPlaceIn(said);
if (p && !ok[p] && !(t.place && said.toLowerCase().indexOf(t.place.toLowerCase().replace(/^the\s+/, "")) >= 0)) {
bad = "you said you are at " + p;
break;
}
}
var low = text.toLowerCase(), meetTag = /\[\[?\s*MEET\b/i.test(String(raw || ""));
if (!bad && /\b(i'?m|i am)\s+(?:(?:still|just|already)\s+)?(at home|home now|in bed|tucked up)\b/.test(low) && t.where !== "home" && !t.asleep)
bad = "you said you are at home";
if (!bad && /\b(i'?m|i am)\s+(?:(?:still|just|already)\s+)?(at work|on shift|on the ward|behind the counter|at my desk)\b/.test(low) && (t.where === "home" || t.asleep))
bad = "you said you are at work";
if (!bad && !meetTag && t.where !== "travel" && /\b(on my way|heading over|be right there|coming over now|i'?ll be there in|just leaving now|omw)\b/.test(low))
bad = "you said you are on your way";
if (!bad)
return "";
return "Your reply was not true: " + bad + ". " + twhFact(c, false).replace(/^ /, "") + " Say it again, truthfully, keeping to that.";
},
function (c, raw) {
var t = twhNow(c.name), s = String(raw || ""), tag = (/\[\[[^\]]*\]\]?/.exec(s) || [""])[0];
var parts = s.replace(/\[\[[^\]]*\]\]?/g, " ").match(/[^.!?]+[.!?]*/g) || [], kept = parts.filter(function (x) { return !twhCheck(c, x); });
var truth = t.src === "meeting" && t.where === "travel" ? "I'm on my way to " + t.dest + ", about " + t.eta + " minutes."
: t.src === "meeting" ? "I'm at " + t.place + ", by the door."
: t.asleep ? "I was asleep, I'm still in bed."
: t.where === "travel" ? "I'm " + t.doing + " right now."
: t.src === "about" ? "I'm just out and about."
: "I'm " + t.doing + (t.place && t.doing.indexOf(t.place) < 0 ? " at " + t.place : "") + " right now.";
return (kept.join(" ") + " " + truth + (tag ? " " + tag : "")).replace(/\s+/g, " ").trim();
},
function (c, fn) {
if (!c || !c.name || c.deity || !(typeof fmyIsFolk === "function" && fmyIsFolk(c)))
return fn();
var t = twhNow(c.name), d = c.details, dg = c.doing, at = c.atId, x = c.x, z = c.z;
try {
c.details = (d || []).slice();
if (c.details[0])
c.details[0] = String(c.details[0])
.replace(/\s*Right now you are [^.]*\./g, "")
.replace(/\s*You were stopped in passing by someone;[^.]*\./g, "")
.replace(/\s*You arranged [^.]* to meet the dreamer here[\s\S]*?in person, now\./g, "");
c.doing = t.doing;
c.atId = null;
if (t.x !== null && t.x !== undefined) {
c.x = t.x;
c.z = t.z;
}
return fn();
}
finally {
c.details = d;
c.doing = dg;
c.atId = at;
c.x = x;
c.z = z;
}
}
];
});
