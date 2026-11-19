/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var viewNight = null;
function seal(text) { return __ZC(59, 0, this, arguments, new.target); }
function nightRecord(n) {
for (var i = 0; i < store.sessions.length; i++)
if (store.sessions[i].n === n)
return store.sessions[i];
return null;
}
function closeNight(title, text, full) { return __ZC(59, 1, this, arguments, new.target); }
var AI_OWED = [], AI_LIVE = null;
function owe(n, text) { return __ZC(59, 2, this, arguments, new.target); }
(function () {
var rp = runParse;
runParse = function (retry) {
var job = AI_OWED[0];
if (!job) {
var own = store.transcript, heard = (store.heard || "").trim();
var all = (own.trim() + (heard ? ("\n\n" + heard) : "")).trim();
if (all)
AI_LIVE = { n: store.session, text: all, at: Date.now() };
store.transcript = all;
try {
return rp(retry);
}
finally {
store.transcript = own;
}
}
if (retry === undefined && job.inflight && Date.now() - job.at < 45000)
return;
if (++job.tries > 8) {
AI_OWED.shift();
researchSend(nightRecord(job.n));
return runParse();
}
job.inflight = true;
job.at = Date.now();
var keep = store.transcript;
store.transcript = job.text;
try {
return rp(retry);
}
finally {
store.transcript = keep;
}
};
if (typeof window !== "undefined")
window.addEventListener("online", function () { if (AI_OWED[0])
AI_OWED[0].inflight = false; });
if (typeof window !== "undefined")
window.addEventListener("load", function () {
var rc = reconcile;
reconcile = function (p) {
var job = AI_OWED[0];
if (!job || !job.inflight) {
AI_LIVE = null;
return rc(p);
}
var rec = nightRecord(job.n), live = { n: store.session, e: store.emotions, l: store.lucidity };
store.session = job.n;
store.emotions = rec ? (rec.emotions || []).slice() : [];
store.lucidity = rec ? (rec.lucidity || 0) : 0;
try {
return rc(p);
}
finally {
if (rec) {
rec.emotions = store.emotions.slice(0, 12);
rec.lucidity = store.lucidity;
}
store.session = live.n;
store.emotions = live.e;
store.lucidity = live.l;
AI_OWED.shift();
save();
if (rec)
researchSend(rec);
if (AI_OWED.length || (store.transcript || "").trim())
scheduleParse(1500);
}
};
});
})();
function amendNight(n, text) {
var r = nightRecord(n);
if (!r || !text.trim() || text === currentText(r))
return false;
r.versions.push({ at: new Date().toISOString(), text: text });
save();
return true;
}
function currentText(r) { return r.versions.length ? r.versions[r.versions.length - 1].text : r.original; }
function verifyNight(n) {
var r = nightRecord(n);
if (!r || !r.fingerprint)
return Promise.resolve(null);
return seal(r.original).then(function (fp) { return fp.hex === r.fingerprint.hex; });
}
function recordOutcome(n, kind, note, eventDate) {
var r = nightRecord(n);
if (!r)
return;
r.outcomes.push({ kind: kind, note: note || "", eventDate: eventDate || null,
recordedAt: new Date().toISOString() });
save();
}
function outcomeTally() {
var t = { hit: 0, partial: 0, miss: 0, unchecked: 0 };
store.sessions.forEach(function (r) {
if (!r.outcomes || !r.outcomes.length) {
t.unchecked++;
return;
}
var last = r.outcomes[r.outcomes.length - 1].kind;
t[last] = (t[last] || 0) + 1;
});
return t;
}
function baseRates() { return __ZC(59, 3, this, arguments, new.target); }
var EVENTS = [
["fire", ["fire", "burning", "flames", "smoke", "blaze", "on fire"]],
["flood", ["flood", "drowning", "rising water", "tidal", "the water rose", "underwater"]],
["collapse", ["collapse", "collapsed", "crumbling", "caved in", "gave way", "fell down"]],
["crash", ["crash", "collision", "wreck", "derailed", "crashed"]],
["storm", ["storm", "lightning", "hurricane", "tornado", "gale"]],
["earthquake", ["earthquake", "the ground shook", "tremor"]],
["explosion", ["explosion", "exploded", "blast", "bomb"]],
["illness", ["sick", "illness", "plague", "fever", "infection"]],
["death", ["died", "dead", "death", "funeral", "corpse", "killed"]],
["conflict", ["war", "soldiers", "fighting", "gunfire", "army", "invasion"]],
["falling", ["falling", "fell from", "plunged"]],
["pursuit", ["fleeing", "running from", "chased", "hunted", "escape"]],
["darkness", ["darkness", "lights went out", "blackout", "eclipse", "the sun went out"]],
["crowd", ["crowd", "panic", "stampede", "everyone was running"]]
];
var SHAREABLE_ARCH = {};
Object.keys(KIT).forEach(function (k) { if (KIT[k].cat !== "being")
SHAREABLE_ARCH[k] = 1; });
function researchSummary(r) { return __ZC(59, 4, this, arguments, new.target); }
function research() {
if (!store.research)
store.research = { consent: false, since: null };
return store.research;
}
function researchUuid() { return __ZC(59, 5, this, arguments, new.target); }
function researchId() { var rs = research(); if (!rs.id) {
rs.id = researchUuid();
save();
} return rs.id; }
function researchSend(r) { return __ZC(59, 6, this, arguments, new.target); }
function researchConsent(on) { return __ZC(59, 7, this, arguments, new.target); }
(function () {
var jc = typeof document !== "undefined" && document.getElementById("j-consent");
if (jc)
jc.addEventListener("change", function () { researchConsent(this.checked); });
})();
var jSel = null;
function openJournal() { return __ZC(59, 8, this, arguments, new.target); }
function closeJournal() { document.getElementById("journal").classList.remove("open"); }
function wordsIn(t) { t = (t || "").trim(); return t ? t.split(/\s+/).length : 0; }
function formsIn(n) {
var c = 0;
store.objects.forEach(function (o) { if (!o.filler && o.nights && o.nights.indexOf(n) > -1)
c++; });
return c;
}
function outcomeOf(r) { return (r.outcomes && r.outcomes.length) ? r.outcomes[r.outcomes.length - 1].kind : null; }
function renderTally() { return __ZC(59, 9, this, arguments, new.target); }
function renderRates() { return __ZC(59, 10, this, arguments, new.target); }
function renderJournalList() { return __ZC(59, 11, this, arguments, new.target); }
function renderJournalDetail(n) { return __ZC(59, 12, this, arguments, new.target); }
function viewOnly(n) { return __ZC(59, 13, this, arguments, new.target); }
function clearView() {
viewNight = null;
store.objects.forEach(function (o) { if (!o.filler)
refresh(o); });
document.getElementById("viewing").classList.add("gone");
}
function deleteNight(n) { return __ZC(59, 14, this, arguments, new.target); }
function linkPlaces(keepId, dropId) { return __ZC(59, 15, this, arguments, new.target); }
