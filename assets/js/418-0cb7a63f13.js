/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TWH = { KEY: "somnu.truewhere", rec: null, map: null, mapN: -1, mapAt: 0 };
function twhStore() {
if (TWH.rec)
return TWH.rec;
try {
TWH.rec = JSON.parse(localStorage.getItem(TWH.KEY) || "{}");
}
catch (e) {
TWH.rec = {};
}
if (!TWH.rec || typeof TWH.rec !== "object")
TWH.rec = {};
return TWH.rec;
}
function twhSave() {
var R = twhStore(), k = Object.keys(R);
if (k.length > 200)
k.sort(function (a, b) { return (R[a].at || 0) - (R[b].at || 0); }).slice(0, k.length - 200).forEach(function (n) { delete R[n]; });
try {
localStorage.setItem(TWH.KEY, JSON.stringify(R));
}
catch (e) { }
}
function twhNote(name, c) {
if (!name || !c)
return;
var R = twhStore();
R[name] = { rk: typeof cfkKey === "function" ? cfkKey(c) : "", role: c.role || "", work: twhName(c.work && specById(c.work)), home: twhName(c.home && specById(c.home)), at: Date.now() };
twhSave();
}
(function () {
if (typeof cfkTalk !== "function")
return;
var ct = cfkTalk;
cfkTalk = function (c) {
var r = ct.apply(this, arguments);
try {
twhNote(cfkName(c), c);
}
catch (e) { }
return r;
};
})();
function twhLive(rk) { return __ZC(418, 0, this, arguments, new.target); }
function twhName(spec) { return spec && (spec.name || spec.label) ? String(spec.name || spec.label) : ""; }
function twhHour() { return typeof dreamHour === "function" ? dreamHour() : new Date().getHours() + new Date().getMinutes() / 60; }
function twhClock(h) { return typeof hhmm === "function" ? hhmm(((h % 24) + 24) % 24) : String(Math.floor(h)); }
function twhRoutine(rec, c) {
if (c && typeof routineOf === "function") {
var r = routineOf(c);
if (r)
return r;
}
return (typeof SHIFT !== "undefined" && SHIFT[rec.role]) || (typeof ROUTINE !== "undefined" && (rec.role === "child" ? ROUTINE.child : ROUTINE.human)) || null;
}
function twhPlaceFor(where, rec) { return where === "home" ? rec.home : where === "work" ? rec.work : ""; }
function twhNext(rec, c, h) { return __ZC(418, 1, this, arguments, new.target); }
function twhNow(name) { return __ZC(418, 2, this, arguments, new.target); }
function twhAsleep(name) { try {
return !!twhNow(name).asleep;
}
catch (e) {
return false;
} }
function twhLine(name) { return __ZC(418, 3, this, arguments, new.target); }
function twhFact(c, voice) { return __ZC(418, 4, this, arguments, new.target); }
function twhEvents() { return __ZC(418, 5, this, arguments, new.target); }
var TWH_CLAIM = /\b(?:i'?m|i am|we'?re|we are|i'?ve just got to|just got to|i just got to|i'?m just|right now i'?m)\s+(?:(?:just|still|now|already|over|down|up|out|here|currently|sat|stood|standing|sitting|working)\s+)*(at|in|inside|outside|by|near)\s+((?:the\s+)?[a-z'’]+(?:\s+[a-z'’]+){0,3})/gi;
function twhPlaceIn(s) { return typeof mtgPlace === "function" ? mtgPlace(s, "") : ""; }
function twhCheck(c, raw) { return __ZC(418, 6, this, arguments, new.target); }
function twhMend(c, raw) { return __ZC(418, 7, this, arguments, new.target); }
function twhWith(c, fn) { return __ZC(418, 8, this, arguments, new.target); }
function twhMtgActive(m) { var st = typeof mtgStage === "function" ? mtgStage(m) : ""; return st === "walking" || st === "waiting" || st === "met"; }
(function () {
if (typeof moveEveryone !== "function")
return;
var me = moveEveryone;
moveEveryone = function () {
var r = me.apply(this, arguments);
try {
if (typeof mtgStore !== "function")
return r;
mtgStore().forEach(function (m) {
if (!m.rk || !twhMtgActive(m))
return;
var c = twhLive(m.rk);
if (!c)
return;
c.visible = false;
c.doing = mtgStage(m) === "walking" ? "on the way to " + m.place : "at " + m.place;
c.atId = null;
var g = typeof meshes !== "undefined" && meshes[c.objId];
if (g)
g.visible = false;
});
}
catch (e) { }
return r;
};
})();
function twhFrom(name) {
var rec = twhStore()[name];
if (!rec || !rec.rk)
return null;
var c = twhLive(rec.rk);
if (!c || typeof whereabouts !== "function")
return null;
try {
var w = whereabouts(c, twhHour());
return { x: w.x, z: w.z, rk: rec.rk, look: twhLook(c) };
}
catch (e) {
return null;
}
}
function twhLook(c) { try {
var s = typeof specById === "function" ? specById(c.objId) : null;
return s && s.look ? JSON.parse(JSON.stringify(s.look)) : null;
}
catch (e) {
return null;
} }
