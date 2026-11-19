/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(221, function () {
"use strict";
return [
function (c, m) {
var h = typeof dreamHour === "function" ? dreamHour() : 12, band = h < 4.5 || h >= 22 ? "night" : h < 12 ? "morning" : h < 17.5 ? "afternoon" : "evening";
var hi = band === "night" ? "Late one, " : band === "morning" ? "Morning, " : band === "afternoon" ? "Afternoon, " : "Evening, ";
var seed = (typeof hash === "function" ? hash(c.id + String(Date.now() / 600000 | 0)) : Date.now());
if (!m || !m.ok)
return crwPick(["Good " + band + ".", "Lovely " + (band === "night" ? "night" : "day") + " for it.", "Mind how you go.", "Welcome to Somnucor."], seed);
var me = crwFirst(m.name) || "friend", F = m.facts || {}, lines = [];
if (m.met <= 1)
lines.push(crwPick(["New face! Welcome to Somnucor, " + me + ".", (crwName(c) ? "I don't think we've met. I'm " + crwFirst(crwName(c)) + ". You're " + me + ", aren't you?" : c.role ? "I don't think we've met. I'm the " + String(c.role).replace(/_/g, " ") + " round here. You're " + me + ", aren't you?" : "I don't think we've met. You're " + me + ", aren't you?"), "Hello, " + me + ". First time I've seen you round here."], seed));
else if (m.met < 5)
lines.push(hi + me + ". Nice to see you again.");
else
lines.push(crwPick([hi + me + "! That's " + m.met + " times we've met now.", "Ah, " + me + ", my favourite regular.", "Back again, " + me + "? You're part of the street now."], seed));
var about = [];
if (F.keys)
about.push(F.keys >= 3 ? "Three keys! Is it true you're close to the Gate?" : "Heard you found " + (F.keys === 1 ? "one of the Dreamer's Keys" : F.keys + " of the keys") + ". Well done.");
if (F.gave >= 1000)
about.push("Folk say you gave " + Number(F.gave).toLocaleString() + " gold to the city's building. Thank you.");
else if (F.worked >= 3)
about.push("You've been lending a hand on the city's building, I've seen you.");
if (F.level >= 5 && F.title)
about.push("A " + F.title + " now, aren't you? Level " + F.level + ".");
if (F.guild)
about.push("How's " + F.guild + "? I hear good things.");
if (F.stall)
about.push("I'll come by " + F.stall + " on Dreamers' Row.");
if (F.world_visits >= 5)
about.push(F.world_visits + " visits to your dream world! Everyone's talking about it.");
if (F.job)
about.push("Busy at work? How's the " + String(F.job).toLowerCase() + " life?");
var news = (m.news || []).filter(function (t) { return t && String(t).length < 120; });
if (about.length && (seed % 3 !== 0 || !news.length))
lines.push(crwPick(about, seed >> 3));
else if (news.length) {
var t = String(crwPick(news, seed >> 2));
lines.push(crwPick(["Did you hear? \"" + t + "\"", "The Gazette says \"" + t + "\". Fancy that.", "Everyone's talking about it: \"" + t + "\""], seed >> 5));
}
return lines.join(" ");
},
function (c, g, text) {
if (CRW.bubble) {
try {
CRW.bubble.p.remove(CRW.bubble.sp);
dropTag(CRW.bubble.sp);
}
catch (e) { }
CRW.bubble = null;
}
if (typeof makeTag !== "function")
return;
var sp = makeTag(text, true), top = 2.02;
try {
var bb = new THREE.Box3().setFromObject(g);
if (isFinite(bb.max.y))
top = Math.max(1.4, bb.max.y - g.position.y) + 0.1;
}
catch (e) { }
var s = g.scale && g.scale.y ? g.scale.y : 1;
sp.scale.multiplyScalar(1 / Math.max(0.4, s));
sp.position.y = (top / Math.max(0.4, s)) + sp.scale.y / 2 + 0.12;
g.add(sp);
CRW.bubble = { p: g, sp: sp, until: Date.now() + 8000 };
}
];
});
