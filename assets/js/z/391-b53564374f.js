/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(391, function () {
"use strict";
return [
function (g, key) {
var u = g.userData.stk, L = (u && u.look) || {}, h = cfkHash(key + "|age");
if (L.age === "child" || (u && u.arch === "child"))
return 7 + h % 6;
if (typeof CFK_GREY !== "undefined" && CFK_GREY[L.hair])
return 62 + h % 24;
if (typeof CFK_DYED !== "undefined" && CFK_DYED[L.hair])
return 18 + h % 10;
if (L.hairStyle === "bald")
return 38 + h % 26;
if (L.age === "adult")
return 22 + h % 38;
return 19 + h % 42;
},
function (g, key, sx, age) {
var p = stkCC(g), s = "You live in Somnucor, the dreamers' shared city.", id = g.userData.stk.id;
if (p) {
var h = typeof ccHour === "function" ? ccHour() : 12, d = typeof ccDuty === "function" ? ccDuty(p, h) : "off";
if (p.k % 9 === 4)
s += " You are out and about in the city" + (h >= 8 && h < 15 ? " with a grown-up" : "") + ".";
else {
s += " You work as a " + String(p.job.title || "clerk").toLowerCase() + (p.job.place ? " at " + p.job.place : "") + ".";
s += " Right now you are " + (d === "work" ? "at work out on the street" : d === "lunch" ? "on your lunch break" : d === "going" ? "on your way to work" : d === "home" ? "on your way home from work" : (h >= 19.5 || h < 4) ? "out for the evening" : "off duty, walking through town") + ".";
}
if (p.group)
s += " You are standing with a few friends under the lamps.";
}
else {
var job = null, ev = g.userData.evcWho || "";
STK_JOBS.forEach(function (J) { if (!job && J[0].test(id))
job = J[1]; });
s += ev ? " You are " + ev + "." : job ? " You are " + job + "." : " You are out on the street, going about your day.";
}
s += " " + cfkAgeWords(age, sx);
s += g.userData.evcWho ? " Someone at the event has come up to talk to you; you are enjoying the night and glad to chat about it." : " You were stopped in the street by someone; you can chat, and you may have somewhere to be.";
return s;
},
function (g) {
if (!g || typeof wTalk !== "function")
return false;
var c = stkStore(g);
if (c) {
if (c.primary === false)
openGreet(c);
else if (typeof openTalk === "function")
openTalk(c);
return true;
}
var L = stkLcy(g), sx = stkSex(g);
if (L && typeof lcyPersona === "function") {
var nm = g.userData.lcyName || stkName("st|" + g.userData.stk.id, sx), age = stkAge(g, "st|" + g.userData.stk.id);
stkOpen(g, { name: nm, persona: lcyPersona(L) + " " + cfkAgeWords(age, sx), greet: "", doing: "at work" }, sx, age);
return true;
}
var key = stkKey(g), age2 = stkAge(g, key), p = stkCC(g), nm2 = p && p.name || stkName(key, sx);
stkOpen(g, { name: nm2, persona: stkPersona(g, key, sx, age2), greet: "", doing: p ? "out in the street" : g.userData.evcWho ? "at the event" : "here" }, sx, age2);
if (p) {
STK.talk = { p: p, sp: p.sp };
p.sp = 0;
}
return true;
},
function (g, t, sx, age) {
var k = "wtalk:" + t.name;
(store.characters || []).forEach(function (x) { if (x.wKey === k && x.details && x.details.length)
x.details[0] = t.persona; });
wTalk(t);
(store.characters || []).forEach(function (x) { if (x.wKey === k) {
x.ftkSex = sx;
x.ftkAge = age;
x.doing = t.doing;
} });
stkButton(null);
},
function (x, y) {
if (!stkInCity() || typeof camera === "undefined")
return null;
var P = camera.position, best = null, bd = 1e9, v = new THREE.Vector3(), W = innerWidth, H = innerHeight;
var seen = [];
function look(g) {
if (!g || !g.userData.stk || seen.indexOf(g) >= 0)
return;
seen.push(g);
if (!stkShown(g))
return;
var w = stkWhere(g), dist = Math.hypot(w.x - P.x, w.z - P.z);
if (dist > 14)
return;
v.set(w.x, w.y + 1.0, w.z).project(camera);
if (v.z > 1 || v.z < -1)
return;
var sx = (v.x + 1) / 2 * W, sy = (1 - v.y) / 2 * H;
v.set(w.x, w.y + 1.9, w.z).project(camera);
var top = (1 - v.y) / 2 * H, tall = Math.max(30, Math.abs(sy - top) * 2);
var dx = x - sx, dy = y - sy, r = Math.hypot(dx * 1.6, dy);
if (r < Math.max(34, tall * 0.55) && r + dist * 3 < bd) {
bd = r + dist * 3;
best = g;
}
}
stkEach(look);
if (typeof CC !== "undefined" && CC.pool)
CC.pool.forEach(function (p) { if (p && p.state !== "gone")
look(p.g); });
return best;
}
];
});
