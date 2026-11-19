/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var STF = { defs: [], roster: null, rosterAt: 0, rosterBusy: false, cab: null, ctx: null, lastTalk: null, raf: 0, last: 0 };
var ESC = null;
var STF_PROMISE = /\b(on (his|her|their|its|the) way|(is|are|'s|'re)( [a-z]+){0,3} coming\b|(will|'ll) (come|be coming) (for|to|and|over|right)|(is|are) (coming|heading|headed) (over|up|down|round|around|for you|to you|your way|now|right now|shortly|soon)|(will|'ll) be (right )?(with you|here|along|over) (shortly|soon|in a (moment|minute|bit|second))|i'?ll (have (someone|somebody|one|an?)|send|fetch|bring|get you|call (for|over|someone|somebody|one|an?|a)|go and get|make you|forge you|craft you|build you|whip up|cook|pour|prepare|wrap|fetch|arrange|sort (it|that) out)|i will (send|fetch|bring|have (someone|one)|arrange|prepare)|let me (send|fetch|bring|get you|call (for|someone|somebody|one|an?)|make you|forge|craft|cook|pour|prepare)|(sending|calling) (someone|somebody|one|an?|for)|someone will (be|come)|somebody will (be|come)|coming (right )?up|here you (go|are)|i'?ve (sent|called|radioed|asked) (for|someone|somebody|one|an?|the))\b/i;
function stfIsStaff(c) { return !!(c && c.wKey); }
function stfHere() {
var inside = !!(typeof INT !== "undefined" && INT && store.inside && INT.spec);
return { inside: inside, place: inside ? (INT.wpKey || INT.spec.workplace || INT.spec.label || (typeof placeName === "function" ? placeName(INT.spec) : "")) : "",
world: (typeof WLD !== "undefined" && WLD && WLD.on) ? String(WLD.on) : "" };
}
function stfCtx(c) {
var h = stfHere(), title = c.stfTitle || "";
if (!title) {
var m = / is the (.+?) at /.exec((c.details && c.details[0]) || "");
if (m)
title = m[1];
}
var place = c.stfPlace || h.place;
return { name: c.name || "", title: title, place: place, world: h.world, inside: h.inside, c: c };
}
function stfInCity() { return typeof inCityNow === "function" && inCityNow() && !(typeof WLD !== "undefined" && WLD && WLD.on); }
function stfLaw(ctx) { return /guard|officer|police|corp|rider|custody|dispatch|security|constable|warden|commander|marshal|sheriff|watch|gaoler|jailer|bailiff|deputy/i.test(ctx.title || "") || /Dragon Roost|Gaol|Courthouse|Gate Lodge/i.test(ctx.place || ""); }
function staffDeedAdd(def) {
if (!def || !def.tag || typeof def.run !== "function")
return;
def.tag = String(def.tag).toUpperCase().replace(/[^A-Z]/g, "");
STF.defs = STF.defs.filter(function (d) { return d.tag !== def.tag; });
STF.defs.push(def);
}
function stfOk(d, ctx) { try {
return !!(d && (!d.when || d.when(ctx)));
}
catch (e) {
return false;
} }
function stfAvailable(ctx) { return STF.defs.filter(function (d) { return stfOk(d, ctx); }); }
function stfDef(tag) { return STF.defs.filter(function (d) { return d.tag === tag; })[0] || null; }
staffDeedAdd({ tag: "ESCORT", arg: "a place, a room here, a member of staff here, or a dreamer's name", label: "🚶 Walk me to…",
hint: "a colleague walks the dreamer there in person, starting right now",
when: function () { return typeof walkMode !== "undefined" && walkMode; },
run: function (ctx, arg) { return stfEscortStart(ctx, arg); } });
staffDeedAdd({ tag: "GUIDE", arg: "a place", label: "🧭 Show me the way to…",
hint: "the pointer at the top of the dreamer's screen shows the way there",
when: function () { return typeof walkMode !== "undefined" && walkMode && typeof guideTo !== "undefined"; },
run: function (ctx, arg) {
var T = stfFindPlace(arg);
if (!T)
return { ok: false, say: "There's no place called " + arg + " here." };
guideTo = { key: T.label, x: T.x, z: T.z };
return { ok: true, say: "<b>" + esc(T.label) + "</b>: follow the pointer at the top of the screen" + (store.inside ? " once you are outside" : "") + "." };
} });
staffDeedAdd({ tag: "SERVE", label: "🍽️ The menu", hint: "opens this counter's menu so the dreamer can order and pay (food, drink, remedies)",
when: function (ctx) { return typeof NEEDS_PLACES !== "undefined" && !!NEEDS_PLACES[ctx.place] && typeof needsMenu === "function" && ctx.inside; },
run: function (ctx) { stfSoon(function () { needsMenu(ctx.place); }); return { ok: true }; } });
staffDeedAdd({ tag: "SELL", label: "🛍️ What's for sale", hint: "opens this shop's shelves so the dreamer can buy (it goes to their backpack)",
when: function (ctx) { return typeof SHOPC_SHELVES !== "undefined" && !!SHOPC_SHELVES[ctx.place] && typeof shopcOpen === "function" && ctx.inside; },
run: function (ctx) { stfSoon(function () { shopcOpen(ctx.place); }); return { ok: true }; } });
staffDeedAdd({ tag: "BANK", label: "🏦 The counter", hint: "opens the bank counter: deposits, withdrawals, loans",
when: function (ctx) { return ctx.inside && INT.spec && INT.spec.archetype === "bank" && typeof tsBankOpen === "function"; },
run: function () { stfSoon(tsBankOpen); return { ok: true }; } });
staffDeedAdd({ tag: "TREAT", label: "🩺 See to me", hint: "the duty nurse looks the dreamer over and treats them",
when: function () { return typeof inHospital === "function" && inHospital() && typeof cfxNurse === "function"; },
run: function () { stfSoon(cfxNurse); return { ok: true }; } });
staffDeedAdd({ tag: "HIRE", label: "📋 Jobs here", hint: "opens this workplace's openings so the dreamer can take a job or apply",
when: function (ctx) { return ctx.inside && !!INT.wpKey && typeof ahOpen === "function"; },
run: function () { var k = INT.wpKey; stfSoon(function () { ahOpen(k); }); return { ok: true }; } });
staffDeedAdd({ tag: "CAB", arg: "where to", label: "🚕 Call me a cab", hint: "a city cab comes for the dreamer (waiting at the kerb when they step out); they pay the fare",
when: function () { return typeof txiCall === "function" && typeof tglPlaces === "function" && (stfInCity() || (store.inside && typeof somnucorRealm === "function" && somnucorRealm() && (store.here || 0) === somnucorRealm().id)); },
run: function (ctx, arg) { return stfCab(arg); } });
staffDeedAdd({ tag: "REPORT", arg: "what happened, in a sentence", label: "📝 Report something", hint: "takes the dreamer's report and sends it to the Dragon Corp's desk, where the Keeper reads it",
when: function (ctx) { return stfLaw(ctx); },
run: function (ctx, arg) { return stfReport(ctx, arg); } });
try {
(window.SD_PENDING || []).forEach(staffDeedAdd);
window.SD_PENDING = { push: staffDeedAdd };
}
catch (e) { }
function stfNorm(s) { return String(s || "").toLowerCase().replace(/[’']s\b/g, "").replace(/\b(the|a|an|to|of|room|please|me|my)\b/g, " ").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim(); }
function stfScore(q, name) { return __ZC(314, 0, this, arguments, new.target); }
function stfBest(q, list, key) { var best = null, bs = 29; list.forEach(function (x) { var s = stfScore(q, key(x)); if (s > bs) {
bs = s;
best = x;
} }); return best; }
function stfPlaces() { return __ZC(314, 1, this, arguments, new.target); }
function stfFindPlace(q) { return q ? stfBest(q, stfPlaces(), function (p) { return p.label; }) : null; }
function stfRooms() { return __ZC(314, 2, this, arguments, new.target); }
function stfRosterLoad(force) { return __ZC(314, 3, this, arguments, new.target); }
function stfNearestPlace(x, z) {
var best = null, bd = 1e9;
Object.keys(store.workplaceAt || {}).forEach(function (k) { var w = store.workplaceAt[k]; if (!w)
return; var d = Math.hypot(w.x - x, w.z - z); if (d < bd) {
bd = d;
best = k;
} });
return best ? { key: best, d: bd } : null;
}
function stfRowWhere(r) { return __ZC(314, 4, this, arguments, new.target); }
function stfRowPoint(r) { return __ZC(314, 5, this, arguments, new.target); }
function stfBrief(c) { return __ZC(314, 6, this, arguments, new.target); }
(function () {
if (typeof charSystem !== "function")
return;
var cs = charSystem;
charSystem = function (c) {
var s = cs.apply(this, arguments);
try {
if (stfIsStaff(c)) {
s = s + " " + stfBrief(c);
STF.lastTalk = c;
stfRosterLoad();
}
}
catch (e) {
if (window.console)
console.warn("[staff-deeds]", e);
}
return s;
};
})();
(function () {
if (typeof wTalk !== "function")
return;
var wt = wTalk;
wTalk = function (t) {
var r = wt.apply(this, arguments);
try {
if (t && t.name) {
var key = "wtalk:" + t.name;
(store.characters || []).forEach(function (x) {
if (x.wKey !== key)
return;
if (t.title)
x.stfTitle = t.title;
else {
var m = / is the (.+?) at /.exec(t.persona || "");
if (m)
x.stfTitle = m[1];
}
var h = stfHere();
x.stfPlace = h.place || "";
});
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof openTalk !== "function")
return;
var ot = openTalk;
openTalk = function (c) {
if (c && c.wKey === "wtalk:hephaestus-forge") {
c.stfTitle = "god of the forge";
c.stfPlace = "The Volcano Castle";
}
var r = ot.apply(this, arguments);
try {
if (stfIsStaff(c)) {
STF.ctx = c;
stfRosterLoad();
stfChips(c);
}
else
stfChips(null);
}
catch (e) { }
return r;
};
if (typeof closeTalk === "function") {
var ct = closeTalk;
closeTalk = function () { stfChips(null); return ct.apply(this, arguments); };
}
})();
function stfSoon(fn) { setTimeout(function () { stfCloseTalk(); try {
fn();
}
catch (e) {
if (window.console)
console.warn("[staff-deeds]", e);
} }, 1600); }
function stfCloseTalk() { try {
if (typeof talkOpen !== "undefined" && talkOpen && typeof closeTalk === "function")
closeTalk();
}
catch (e) { } }
var STF_TAG = /\[\[?\s*([A-Za-z]{3,10})\s*(?::\s*([^\]\n]*?))?\s*\]\]?/g;
function stfTags(t) {
var out = [];
String(t || "").replace(STF_TAG, function (m, k, a) { k = k.toUpperCase(); if (stfDef(k))
out.push({ tag: k, arg: (a || "").trim(), raw: m }); return m; });
return out;
}
function stfStrip(t) { return String(t || "").replace(STF_TAG, function (m, k) { return stfDef(k.toUpperCase()) ? "" : m; }).replace(/\s+([.,!?])/g, "$1").replace(/[ \t]{2,}/g, " ").trim(); }
function stfSentences(t) { return (String(t).match(/[^.!?]+[.!?]*\s*/g) || [String(t)]).map(function (x) { return x.trim(); }).filter(Boolean); }
function stfDo(c, tag, said) { return __ZC(314, 7, this, arguments, new.target); }
function stfAfter(c, t, said, msgs, god) { return __ZC(314, 8, this, arguments, new.target); }
function stfFinish(c, t, tags, said) {
var r = stfDo(c, tags[0], said), txt = stfStrip(t);
if (r && r.ok === false && r.say)
txt = (txt ? txt + " " : "") + r.say.replace(/<[^>]+>/g, "");
return txt || "…";
}
function stfHonest(t) {
var keep = stfSentences(t).filter(function (s) { return !STF_PROMISE.test(s); });
return (keep.join(" ") + " (I'm sorry, that's not something I can do from here.)").trim();
}
function stfAsk(c, msgs, god) { return __ZC(314, 9, this, arguments, new.target); }
function stfEscortTarget(ctx, arg) { return __ZC(314, 10, this, arguments, new.target); }
function stfEscortName(ctx) { return __ZC(314, 11, this, arguments, new.target); }
function stfEscortStart(ctx, arg) { return __ZC(314, 12, this, arguments, new.target); }
function stfEscortFig() { return __ZC(314, 13, this, arguments, new.target); }
function stfEscortWaypoint() { return __ZC(314, 14, this, arguments, new.target); }
function stfEscortWayOut(lv) {
if (lv > 0)
return stfEscortStairs(lv, 0);
var E = INT.exit || INT.start;
if (!E)
return null;
return { x: E.x, z: E.z, label: "the front door", near: 0.5, out: true };
}
function stfEscortStairs(lv, want) { return __ZC(314, 15, this, arguments, new.target); }
function stfLoop() { return __ZC(314, 16, this, arguments, new.target); }
function stfCityOn(x, z) {
return !store.inside && typeof ATLC !== "undefined" && !!ATLC && typeof ATL_RINGS !== "undefined" && typeof terrainY === "function" && typeof atlNearStair === "function" &&
!(typeof WLD !== "undefined" && WLD.on) && Math.abs(x - ATLC.x) < 3400 && Math.abs(z - ATLC.z) < 3400;
}
function stfRing(x, z) {
var r = Math.hypot(x - ATLC.x, z - ATLC.z), y = terrainY(x, z), R = ATL_RINGS;
for (var i = 0; i < R.length; i++)
if (Math.abs(y - R[i].H) < 0.05 && r >= R[i].S - 0.01 && (r <= R[i].E + 0.01 || i === R.length - 1))
return i;
return -1;
}
function stfRingNear(x, z) {
var r = Math.hypot(x - ATLC.x, z - ATLC.z), R = ATL_RINGS;
for (var i = 0; i < R.length; i++)
if (r <= R[i].E + 10)
return i;
return R.length - 1;
}
function stfStairPt(a, r) { return { x: ATLC.x + Math.cos(a) * r, z: ATLC.z + Math.sin(a) * r }; }
function stfTurn(a, b) { return Math.abs(((a - b) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI); }
function stfCityLeg(W) { return __ZC(314, 17, this, arguments, new.target); }
function stfFind(ax, az, bx, bz, level) { return __ZC(314, 18, this, arguments, new.target); }
function stfEscortRoute(W) { return __ZC(314, 19, this, arguments, new.target); }
function stfSpotOk(x, z) { return __ZC(314, 20, this, arguments, new.target); }
function stfEscortSpot(ux, uz, dists) { return __ZC(314, 21, this, arguments, new.target); }
function stfEscortBeside() {
var fx = -Math.sin(yaw), fz = -Math.cos(yaw), s = stfEscortSpot(fx, fz, [1.9, 1.2, 0.8]);
ESC.x = s.x;
ESC.z = s.z;
ESC.route = null;
ESC.routeGoal = null;
ESC.wait = 0;
ESC.stuck = 0;
}
function stfEscortY(inB, feet) {
if (inB)
return Math.max((INT.level || 0) * INT.floor, feet - 0.3);
if (stfCityOn(ESC.x, ESC.z))
return terrainY(ESC.x, ESC.z);
if (typeof terrainY === "function") {
var ty = terrainY(ESC.x, ESC.z);
if (Math.abs(ty - feet) < 1.5)
return ty;
}
return feet;
}
function stfEscortStep(tx, tz, st) { return __ZC(314, 22, this, arguments, new.target); }
function stfEscortSay(line, key) {
if (ESC.saidKey === key)
return;
ESC.saidKey = key;
if (typeof setStatus === "function")
setStatus("<b>" + esc(ESC.name.split(" ")[0]) + ":</b> “" + line + "”");
}
function stfEscortTick(dt) { return __ZC(314, 23, this, arguments, new.target); }
function stfSwing(g, amt) {
var L = g.userData && g.userData.limbs;
if (!L)
return;
var t = performance.now() / 1000 * 7, s = Math.sin(t) * 0.55 * amt;
if (L.ll)
L.ll.rotation.x = s;
if (L.rl)
L.rl.rotation.x = -s;
if (L.la)
L.la.rotation.x = -s * 0.8;
if (L.ra)
L.ra.rotation.x = s * 0.8;
}
function stfEscortEnd(say, quiet) { return __ZC(314, 24, this, arguments, new.target); }
function stfEscortPill() { return __ZC(314, 25, this, arguments, new.target); }
(function () {
if (typeof wgBadge !== "function")
return;
var wb = wgBadge;
wgBadge = function (key) { if (ESC && ESC.badge && key === ESC.badge && ESC.phase !== "leaving")
return true; return wb.apply(this, arguments); };
})();
function stfCab(arg) { return __ZC(314, 26, this, arguments, new.target); }
setInterval(function () {
var C = STF.cab;
if (!C)
return;
if (Date.now() > C.until) {
STF.cab = null;
return;
}
try {
if (!store.inside && typeof careInCity === "function" && careInCity() && typeof walkMode !== "undefined" && walkMode) {
STF.cab = null;
setTimeout(function () { txiCall(C.k); }, 900);
}
}
catch (e) {
STF.cab = null;
}
}, 1000);
function stfReport(ctx, what) { return __ZC(314, 27, this, arguments, new.target); }
function stfChips(c) { return __ZC(314, 28, this, arguments, new.target); }
function stfChip(tag) { return __ZC(314, 29, this, arguments, new.target); }
function stfChipGo() {
var inp = document.getElementById("stf-arg");
if (!inp || !STF.chip)
return;
var v = inp.value.trim();
if (!v)
return;
document.getElementById("stf-ask").style.display = "none";
stfChipRun(STF.chip, v);
}
function stfChipRun(tag, arg) { return __ZC(314, 30, this, arguments, new.target); }
function stfTest() { return { STF: STF, ESC: ESC, stfBrief: stfBrief, stfTags: stfTags, stfStrip: stfStrip, stfAfter: stfAfter, stfEscortStart: stfEscortStart, stfPlaces: stfPlaces, stfRooms: stfRooms, STF_PROMISE: STF_PROMISE, stfHonest: stfHonest, stfCtx: stfCtx }; }
