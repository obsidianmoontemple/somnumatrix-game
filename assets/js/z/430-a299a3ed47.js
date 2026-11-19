/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(430, function () {
"use strict";
return [
function (a, b) {
var o = sgaBlank();
["done", "choice", "side", "seen"].forEach(function (k) { o[k] = Object.assign({}, (b && b[k]) || {}, (a && a[k]) || {}); });
var ta = (a && a.trips) || [], tb = (b && b.trips) || [], seen = {};
o.trips = ta.concat(tb).filter(function (t) { var id = t && (t.at + "|" + t.w); if (!t || seen[id])
return false; seen[id] = 1; return true; }).sort(function (x, y) { return x.at - y.at; }).slice(-30);
o.started = Math.min((a && a.started) || Infinity, (b && b.started) || Infinity);
if (!isFinite(o.started))
o.started = 0;
o.ls = (a && a.ls) || {};
o.spots = Object.assign({}, (b && b.spots) || {}, (a && a.spots) || {});
o.fdays = Object.assign({}, (b && b.fdays) || {}, (a && a.fdays) || {});
o.friends = {};
[a, b].forEach(function (x) { var f = (x && x.friends) || {}; Object.keys(f).forEach(function (k) { o.friends[k] = Math.max(o.friends[k] || 0, +f[k] || 0); }); });
o.comp = (a && a.comp !== undefined) ? a.comp : ((b && b.comp) || null);
o.lines = {};
[b, a].forEach(function (x) {
var L = (x && x.lines) || {};
Object.keys(L).forEach(function (k) {
var q = L[k] || {}, m = o.lines[k] || (o.lines[k] = { done: {}, choice: {}, started: 0, fav: 0 });
Object.assign(m.done, q.done || {});
Object.assign(m.choice, q.choice || {});
if (q.started && (!m.started || q.started < m.started))
m.started = q.started;
m.fav = Math.max(m.fav || 0, +q.fav || 0);
if (q.end)
m.end = Math.max(+m.end || 0, +q.end || 0);
Object.keys(q.task || {}).forEach(function (id) { var t = (m.task = m.task || {})[id] = m.task[id] || []; (q.task[id] || []).forEach(function (i) { if (t.indexOf(i) < 0)
t.push(i); }); });
Object.keys(q.act || {}).forEach(function (id) { (m.act = m.act || {})[id] = Math.max(+m.act[id] || 0, +q.act[id] || 0); });
});
});
return o;
},
function (ref) {
var p = String(ref).split("."), id = p[0], k = p[1], o = {};
if (id === "pc") {
if (k === "dragon") {
o.dragon = 8;
o.temple = -3;
}
else if (k === "temple") {
o.temple = 8;
o.dragon = -3;
}
}
else if (id === "nc") {
o.commons = k === "commons" ? 8 : -3;
}
else if (id === "fc" && SGA_FBY[k]) {
["dragon", "temple", "academies", "guilds"].forEach(function (f) { o[f] = f === k ? 25 : -5; });
o.commons = 5;
}
return o;
},
function () {
try {
if (typeof WLD !== "undefined" && WLD.on)
return "world";
if (store.inside)
return (SGA.lastRing || "plaza");
if (typeof ATLC !== "undefined" && ATLC && typeof atlRingAt === "function" && typeof inCityNow === "function" && inCityNow()) {
var P = camera.position, R = atlRingAt(P.x, P.z);
if (R) {
SGA.lastRing = R.k;
return R.k;
}
}
}
catch (e) { }
return "";
},
function (kind, ref, note) {
ref = String(ref || "").slice(0, 80);
var key = kind + ":" + ref;
if (SGA.prog.seen[key] && kind !== "crime" && kind !== "talk")
return Promise.resolve(null);
if (kind === "talk") {
var day = new Date().toISOString().slice(0, 10);
if (SGA.prog.seen[key] === day)
return Promise.resolve(null);
SGA.prog.seen[key] = day;
}
else if (kind !== "crime")
SGA.prog.seen[key] = 1;
var before = JSON.parse(JSON.stringify(SGA.st));
if (!sgaOnline() || SGA.off) {
sgaApply(SGA_DEED[kind] ? SGA_DEED[kind](ref) : {});
sgaSaveSoon();
sgaStandingSay(before);
return Promise.resolve(null);
}
sgaSaveSoon();
return cityRpc("saga_deed", { p_kind: kind, p_ref: ref, p_ring: sgaRingNow(), p_note: String(note || "").replace(/[<>]/g, "").slice(0, 120) }).then(function (o) {
if (o && o.ok && o.standing) {
SGA.st = o.standing;
SGA.prog.ls = SGA.st;
sgaLocalWrite();
sgaStandingSay(before);
}
if (o && o.season && SGA.me)
SGA.me.season = o.season;
return o;
}).catch(function (e) { if (/saga_deed|function|schema cache|does not exist|404/i.test(String(e && e.message)))
SGA.off = true; sgaApply(SGA_DEED[kind] ? SGA_DEED[kind](ref) : {}); sgaStandingSay(before); return null; });
},
function (place) {
try {
var F = typeof cinFrontOf === "function" ? cinFrontOf(place) : null;
if (F && typeof cinAt === "function") {
var p = cinAt(F, 2.6, 2.2);
return { x: p.x, z: p.z, y: p.y, face: F.face };
}
var w = store.workplaceAt && store.workplaceAt[place];
if (!w || !ATLC)
return null;
var a = Math.atan2(ATLC.z - w.z, ATLC.x - w.x), x = w.x + Math.cos(a) * 9, z = w.z + Math.sin(a) * 9;
return { x: x, z: z, y: terrainY(x, z), face: Math.atan2(Math.cos(a), Math.sin(a)) };
}
catch (e) {
return null;
}
},
function () {
var W = WLD.w, A = WLD.arrive;
if (!W || !A)
return null;
for (var k = 0; k < 12; k++) {
var a = k * 0.52, r = 6 + (k % 3) * 2, x = A.x + Math.sin(a) * r, z = A.z - Math.cos(a) * r, y = 0;
try {
y = W.ground ? W.ground(x, z, 0) : 0;
}
catch (e) {
y = null;
}
if (y == null || !isFinite(y))
continue;
var bad = false;
try {
bad = !!(W.block && W.block(x, z, y)) || !!(W.solids && worldSolidAt(W.solids, x, z, y));
}
catch (e) { }
if (!bad)
return { x: x, z: z, y: +y, face: Math.atan2(A.x - x, A.z - z) };
}
return { x: A.x + 3, z: A.z - 3, y: 0, face: 0 };
},
function (seed, who) {
var g = null;
try {
g = wPerson("sga_" + seed, { sex: who.sex, look: Object.assign({ sex: who.sex }, who.look || {}) });
}
catch (e) {
g = new THREE.Group();
}
g.userData.sga = 1;
try {
if (typeof wGlow === "function") {
var gl = wGlow(0xF2D27A, 1.6, 0.35);
gl.position.y = 2.35;
gl.userData.sgaHalo = 1;
g.add(gl);
}
}
catch (e) { }
return g;
},
function (t) {
if (typeof openTalk !== "function")
return null;
var key = "wtalk:" + t.name, c = null;
(store.characters || []).forEach(function (x) { if (x.wKey === key)
c = x; });
var P = camera.position;
if (!c) {
c = { id: (typeof uid === "function" ? uid() : "w" + Date.now()), wKey: key, archetype: "human", name: t.name, aka: [], details: [t.persona], sessions: [store.session], awake: true, log: [],
x: P.x, z: P.z, primary: true, src: { name: "stated" }, role: null, shift: null, routine: null, home: null, work: null, anchor: { x: P.x, z: P.z }, born: "", doing: t.doing || "here", visible: false };
if (t.greet)
c.log.push({ who: "them", text: t.greet });
if (store.characters)
store.characters.push(c);
}
else
c.details = [t.persona];
c.ftkSex = t.sex;
c.ftkAge = t.age;
c.sgaStep = t.step || null;
c.sgaComp = t.comp || null;
c.sgaFac = t.fac || null;
c.x = P.x;
c.z = P.z;
c.visible = false;
openTalk(c);
return c;
},
function (s) {
var g = { p1: "You felt it too, didn't you? The Bell. Come here, quickly, before anyone hears.", p2: "Ah! Ysolde sent you? Then it's true. Come, come, mind the books.",
p3: "You've got the look of someone who knows something. Talk to me.", n1: "Mind the lavender, dear. It hasn't stopped blooming since that thing fell.",
n2: "Aye, you'll be wanting the singing glass. Everyone does. Sit.", n3: "Hi! Don't touch my sled. Seriously, it froze in a second. You're here for the shard?",
n4: "Hear that hum? Shakes the roof. Guild says it's theirs.", n5: "You've come for it. I knew someone would.", n6: "A visitor who isn't lost! How rare. Sit, sit.",
n7: "Ha! Bet you can't catch me. ...Fine. What do you want?" }[s.id];
if (g)
return g;
if (s.id === "e1")
return "There you are! Come here. You did it.";
return "There you are.";
},
function (s, quiet) {
if (sgaDone(s.id))
return;
SGA.prog.done[s.id] = Date.now();
sgaSaveSoon();
var actDone = SGA_STEPS.filter(function (x) { return x.act === s.act; }).every(function (x) { return sgaDone(x.id); });
sgaDeed("story", s.id + "." + sgaFacOf(s), s.title);
if (actDone) {
var A = SGA_ACTS.filter(function (a) { return a.k === s.act; })[0];
if (A)
sgaDeed("story", "act-" + A.k + ".commons", A.n);
}
if (sgaAllDone())
sgaDeed("story", "finale.commons", SGA_STORY_TITLE);
if (!quiet)
sgaToast("📜 " + s.title + ": done" + (actDone ? " · " + (SGA_ACTS.filter(function (a) { return a.k === s.act; })[0] || { n: "" }).n + " complete" : ""));
var next = SGA_STEPS.filter(function (x) { return x.kind === "choice" && sgaOpenStep(x); })[0];
if (next && (s.id === "p3" || s.id === "n5" || s.id === "d1"))
setTimeout(function () { sgaOpen("story"); }, 600);
try {
sgaPaint();
}
catch (e) { }
},
function (id, k) {
var s = sgaStep(id);
if (!s || s.kind !== "choice" || !sgaOpenStep(s))
return;
var o = s.opts.filter(function (x) { return x.k === k; })[0];
if (!o)
return;
SGA.prog.choice[id] = k;
sgaDeed("choice", id + "." + k, o.n);
sgaStepDone(s, true);
SGA.say = "<b>" + esc(o.n) + ".</b> " + esc(o.say);
if (id === "fc")
SGA.say += "<br>You are now <b>" + SGA_TITLE_DONE + "</b>, once you have told " + esc(sgaWho(sgaStep("e1")).name) + ".";
try {
sgaPaint();
}
catch (e) { }
},
function (s) {
var w = sgaWhere(s);
if (w.city) {
if (typeof showTheWay === "function")
showTheWay(w.city);
return;
}
if (w.world) {
if (WLD.on === w.world) {
setStatus("You are here. Look for the soft gold light over " + esc(sgaWho(s).name) + ".");
return;
}
if (WORLDS[w.world] && typeof worldGo === "function") {
if (w.world === "underdark" && !sgaAdult())
setStatus("The Deep is a dangerous world: its beasts leave the young alone.");
SGA.open = false;
sgaPaint();
worldGo(w.world, {});
setStatus("📜 <b>" + esc(w.n) + "</b>: look for the soft gold light over " + esc(sgaWho(s).name) + ", near where you came in.");
}
}
},
function (r, giver) {
if (!r || SGA.prog.side[r.id])
return;
SGA.prog.side[r.id] = { id: r.id, what: String(r.what || "Trouble").slice(0, 90), place: String(r.place || ""), giver: String(giver || "The Chronicle Press").slice(0, 60), at: Date.now(), st: "go" };
sgaSaveSoon();
sgaToast("📜 Side quest: " + SGA.prog.side[r.id].what);
if (typeof showTheWay === "function" && r.place)
showTheWay(r.place);
try {
sgaPaint();
}
catch (e) { }
},
function (c) {
if (!c)
return "commons";
if (c.sgaFac && SGA_FBY[c.sgaFac])
return c.sgaFac;
var t = [c.name, (c.details || []).join(" "), c.role, c.work, c.doing, c.ftkJob, c.title].filter(function (x) { return typeof x === "string"; }).join(" ");
for (var i = 0; i < SGA_FACTIONS.length; i++) {
var f = SGA_FACTIONS[i];
if (f.match && f.match.test(t))
return f.k;
}
return "commons";
},
function () {
var ring = sgaRingNow() || "world", R = SGA.rum[ring];
if (sgaOnline() && !SGA.off && (!R || Date.now() - (SGA.rumAt[ring] || 0) > 300000) && !SGA["rumBusy" + ring]) {
SGA["rumBusy" + ring] = 1;
SGA.rumAt[ring] = Date.now();
cityRpc("saga_rumours", { p_ring: ring }).then(function (o) { if (o && o.ok)
SGA.rum[ring] = o; }).catch(function () { }).then(function () { SGA["rumBusy" + ring] = 0; });
}
return R || null;
},
function (c) {
if (c.sgaStep && typeof qlnBrief === "function") {
var qb = qlnBrief(c.sgaStep);
if (qb)
return qb;
}
var L = [], fac = sgaFolkFac(c), F = SGA_FBY[fac], lv = sgaLevel(sgaStanding(fac));
if (!sgaKeeper()) {
L.push("You count yourself among " + F.n + " (" + F.what + ") Among your people, this dreamer is " + lv.n.toLowerCase() + ". " + SGA_TREAT[lv.i]);
var high = SGA_FACTIONS.filter(function (f) { return f.k !== fac && sgaLevel(sgaStanding(f.k)).i >= 4; }).map(function (f) { return f.n; });
var low = SGA_FACTIONS.filter(function (f) { return f.k !== fac && sgaLevel(sgaStanding(f.k)).i <= 1; }).map(function (f) { return f.n; });
if (high.length)
L.push("You have heard they are well thought of by " + high.join(" and ") + ".");
if (low.length)
L.push("You have heard they are in bad odour with " + low.join(" and ") + ".");
}
var R = sgaRumours();
if (R) {
var town = (R.town || []).slice(0, 5).map(function (x) { return x.line; }).filter(Boolean);
if (town.length)
L.push("Talk going round town lately, which you have heard: " + town.join(" / ") + ". You may bring one up as gossip if it fits naturally, in your own words; never list them.");
var you = (R.you || []).slice(0, 4).map(function (x) { return x.line; }).filter(Boolean);
if (you.length)
L.push("What you have heard about the dreamer in front of you: " + you.join(" / ") + ". You know their name from it. React to it the way a real person would, once, if it fits.");
if (R.title)
L.push("Word is they are the " + R.title + ".");
}
if (SGA.prog.started && !sgaAllDone() && !c.sgaStep)
L.push("Lately bells have been going missing all over Somnucor (a ship's bell, the school bell, the Tavern's door bell), and some say a thin man in a grey robe was seen each time. You don't know more than the rumour.");
if (sgaAllDone() && !c.sgaStep)
L.push("The Somnus Bell under the Tower was cracked this season and is mended now; the city is relieved, and the dreamer you are talking to had a hand in it.");
if (c.sgaStep)
L.push("Background you know, to tell in your own words as it comes up: " + SGA_BELL + " Tell the dreamer what you know and, before the talk ends, where they should go next.");
if (!c.sgaStep && !c.sgaComp && !WLD.on && typeof inCityNow === "function" && inCityNow()) {
var t = sgaTrouble().filter(function (r) { return !SGA.prog.side[r.id]; })[0];
if (t)
L.push("You know there is trouble in town just now: " + String(t.what || "trouble") + " at " + String(t.place || "a building") + ". If it comes up naturally, you may ask the dreamer to look into it.");
}
return L.join(" ");
},
function (c) {
if (sgaKeeper() || c.sgaStep || c.sgaComp)
return null;
var fac = sgaFolkFac(c), lv = sgaLevel(sgaStanding(fac)), nm = sgaName().split(/\s+/)[0], pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
if (lv.i === 0)
return pick(["Oh. It's you. What do you want?", "You've got a nerve, showing your face here.", "Keep it short. I've heard about you."]);
if (lv.i === 1)
return pick(["Hm. What is it?", "I know your face. Not sure I like it. What do you want?"]);
if (lv.i === 4)
return pick(["Well, if it isn't " + nm + "! Good to see you.", "Ah, " + nm + "! Everyone's been talking about you. What can I do for you?"]);
if (lv.i === 5)
return pick([nm + "! It's an honour, truly. What can I do for you?", "Look who it is! " + nm + ", come in, come in. Anything you need."]);
return null;
},
function (c) {
if (!c || c.sgaStep || c.sgaComp || WLD.on || !(typeof inCityNow === "function" && inCityNow()))
return "";
var t = sgaTrouble().filter(function (r) { return !SGA.prog.side[r.id]; })[0];
if (!t)
return "";
return "<button class='btn' data-sgtq='" + esc(String(t.id)) + "' style='margin-top:6px;font-size:12px'>📜 Take this on: " + esc(String(t.what || "trouble").slice(0, 60)) + " at " + esc(String(t.place || "")) + "</button>";
},
function (c) {
var head = document.getElementById("t-head");
if (!head)
return;
var el = document.getElementById("sga-tq");
var h = sgaIsFolk(c) ? sgaTqHtml(c) : "";
if (!h) {
if (el)
el.innerHTML = "";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "sga-tq";
head.parentNode.insertBefore(el, head.nextSibling);
el.addEventListener("click", function (e) {
var b = e.target.closest && e.target.closest("[data-sgtq]");
if (!b)
return;
var id = b.getAttribute("data-sgtq");
var r = sgaTrouble().filter(function (x) { return String(x.id) === id; })[0];
sgaTakeSide(r, talkWith && talkWith.name);
el.innerHTML = "<div style='font-size:12px;color:#B8E0A0;margin-top:6px'>📜 In your quest log. Follow the pointer.</div>";
});
}
el.innerHTML = h;
},
function (k) {
var C = SGA_CBY[k];
if (!C)
return;
if (!sgaOnline() || SGA.off) {
SGA.say = "Hiring needs the city's server: sign in first.";
sgaPaint();
return;
}
if (!sgaAdult() || !sgaPaid()) {
SGA.say = "Only grown-up dreamers who pay their dues may hire for gold. Anyone may befriend a companion: talk with them on three different days.";
sgaPaint();
return;
}
cityRpc("saga_companion_hire", { p_comp: k, p_weeks: 1 }).then(function (o) {
SGA.say = esc((o && o.say) || "");
if (o && o.ok) {
if (SGA.me)
SGA.me.companion = o.companion;
SGA.prog.comp = k;
sgaSaveSoon();
}
}).catch(function (e) { SGA.say = esc(String(e && e.message || e).slice(0, 160)); }).then(sgaPaint);
},
function (k) {
var day = new Date().toISOString().slice(0, 10), F = SGA.prog.friends || (SGA.prog.friends = {}), D = SGA.prog.fdays || (SGA.prog.fdays = {});
if (D[k] === day)
return;
D[k] = day;
F[k] = Math.min(3, (+F[k] || 0) + 1);
sgaSaveSoon();
var after = function (n) { if (n >= 3)
sgaToast("🤝 " + SGA_CBY[k].name + " will travel with you now: ☰ Menu › 📜 Story › Companions");
else
sgaToast("🤝 " + SGA_CBY[k].name + ": met " + n + " of 3 days"); sgaPaint(); };
if (sgaOnline() && !SGA.off)
cityRpc("saga_companion_meet", { p_comp: k }).then(function (o) { if (o && o.ok) {
if (SGA.me)
SGA.me.companion = o.companion;
after(+o.days || F[k]);
}
else
after(F[k]); }).catch(function () { after(F[k]); });
else
after(F[k]);
},
function (k) {
var C = SGA_CBY[k];
if (!C)
return "";
var mine = sgaCompMay(k), S = sgaCompServer(), how = S && S.comp === k && S.how === "hired" ? "hired by the dreamer for gold" : "the dreamer's friend";
var trips = (SGA.prog.trips || []).filter(function (t) { return t.c === k; }).slice(-8).map(function (t) { return t.w + " (" + new Date(t.at).toLocaleDateString() + ")"; });
var L = [];
if (mine) {
L.push("You travel with this dreamer as their companion, " + how + ". " + SGA_ROLE[C.role] + " Stay yourself: you have opinions and moods, you are not a servant.");
if (trips.length)
L.push("Places you have been together, oldest first: " + trips.join(", ") + ". Bring them up naturally.");
if (WLD.on)
L.push("Right now you are with them in " + sgaWorldName(WLD.on) + ".");
}
else
L.push("You are at your usual place in the city. You are open to travelling with this dreamer, as a friend once you know them (three days of talking), or hired for a week (" + C.hire + " gold). Mention it only if it comes up.");
return L.join(" ");
},
function (C, wk) {
var last = (SGA.prog.trips || []).filter(function (t) { return t.c === C.k; }).slice(-1)[0];
if (last && last.wk === wk && Date.now() - last.at < 3 * 3600000)
return;
var w = sgaWorldName(wk), note = "You went with " + sgaName() + " to " + w + " on " + new Date().toLocaleDateString() + ".";
SGA.prog.trips.push({ c: C.k, wk: wk, w: w, at: Date.now() });
SGA.prog.trips = SGA.prog.trips.slice(-30);
sgaSaveSoon();
try {
var key = "wtalk:" + C.name;
if (typeof FMY !== "undefined") {
var m = FMY.mem[key] || (FMY.mem[key] = { met: 1, first: Date.now(), last: Date.now(), notes: [] });
m.notes = (m.notes || []).concat([{ at: Date.now(), t: note }]).slice(-12);
if (typeof fmyLocalWrite === "function")
fmyLocalWrite();
}
if (sgaOnline())
cityRpc("folk_memory_note", { p_folk: key, p_note: note }).catch(function () { });
}
catch (e) { }
},
function () {
var C = sgaCompActive();
if (!C)
return;
var S = sgaCompServer();
sgaTalk({ name: C.name, sex: C.sex, age: C.age, comp: C.k, fac: "commons",
persona: "You are " + C.name + ", a " + C.age + "-year-old " + (C.sex === "f" ? "woman" : "man") + " of Somnucor: " + C.persona,
greet: ["Yes? What is it?", "Still here. What's on your mind?", "Need something?"][Math.floor(Math.random() * 3)] });
},
function (d) {
var T = (typeof SGA_TIER !== "undefined" && SGA_TIER[d]) || { ch: 3, side: 0, mobs: [3, 4, 4] }, R = [], top = -12;
R.push({ k: "in", x0: -9, x1: 9, z0: -12, z1: 7, h: 8 });
var sideAt = [];
for (var q = 0; q < T.side; q++)
sideAt.push(T.ch - 1 - q * 1 >= 1 ? T.ch - 1 - q : q);
for (var i = 0; i < T.ch; i++) {
R.push({ k: "p" + (i + 1), x0: -2.4, x1: 2.4, z0: top - 19, z1: top + 1, h: 5 });
var z1 = top - 18, L = 22 + (i % 2) * 3, W = 26 + (i % 3) * 2, ox = i % 2 ? -2 : 2;
var c = { k: "c" + (i + 1), x0: ox - W / 2, x1: ox + W / 2, z0: z1 - L, z1: z1, h: 9 + (i % 2), mobs: T.mobs[i] || 4, champ: i >= 1 ? (T.champ || 0) : 0, i: i };
R.push(c);
if (sideAt.indexOf(i) >= 0) {
var e = (i % 2 ? -1 : 1), mz = (c.z0 + c.z1) / 2, sx = e > 0 ? c.x1 : c.x0;
var px0 = e > 0 ? sx - 1 : sx - 14, px1 = e > 0 ? sx + 14 : sx + 1;
R.push({ k: "pq" + (i + 1), x0: px0, x1: px1, z0: mz - 2.4, z1: mz + 2.4, h: 5 });
var rx0 = e > 0 ? sx + 13 : sx - 13 - 18, rx1 = e > 0 ? sx + 13 + 18 : sx - 13;
R.push({ k: "cs" + (i + 1), x0: rx0, x1: rx1, z0: mz - 10, z1: mz + 10, h: 8, mobs: Math.max(2, (T.mobs[i] || 3) - 1), champ: T.champ ? 1 : 0, side: 1, i: i });
}
top = c.z0;
}
R.push({ k: "p" + (T.ch + 1), x0: -3, x1: 3, z0: top - 21, z1: top + 1, h: 6 });
var bz1 = top - 20, BL = 40 + T.ch * 3, BW = 40 + T.ch * 2;
R.push({ k: "boss", x0: -BW / 2, x1: BW / 2, z0: bz1 - BL, z1: bz1, h: 16 });
return R;
},
function (g, D) {
var col = new THREE.Color(D.boss.glow || 0xFFFFFF), lite = sgaLite(), kind = D.boss.kind;
g.updateMatrixWorld(true);
var bb = new THREE.Box3(), tmp = new THREE.Box3();
g.traverse(function (o) { if (!o.isMesh || o.isSprite || !o.geometry || (o.material && o.material.transparent))
return; if (!o.geometry.boundingBox)
o.geometry.computeBoundingBox(); tmp.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld); bb.union(tmp); });
var sc = g.scale.x || 1, top = (bb.max.y - g.position.y) / sc, wide = Math.max(0.45, (bb.max.x - bb.min.x) / sc / 2);
if (!isFinite(top) || top < 0.5 || top > 6)
top = 2;
if (!isFinite(wide) || wide > 1.2)
wide = Math.min(1.2, isFinite(wide) ? wide : 0.8);
wide = Math.min(wide, 2.4 / sc);
var add = function (o) { o.userData.sgaOwn = 1; g.add(o); return o; };
var shadow = add(new THREE.Mesh(new THREE.CircleGeometry(wide * 1.1, 28), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35, depthWrite: false })));
shadow.rotation.x = -Math.PI / 2;
shadow.position.y = 0.03;
var ring = add(new THREE.Mesh(new THREE.RingGeometry(wide * 1.15, wide * 1.24, 48), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })));
ring.rotation.x = -Math.PI / 2;
ring.position.y = 0.05;
ring.userData.sgaBreathe = 1;
var metal = function (c, e) { return sgaMat(c, { m: 0.85, r: 0.35, e: e || 0x000000, ei: 0.6 }); };
if (kind === "faceless") {
var shroud = add(new THREE.Mesh(new THREE.CylinderGeometry(top * 0.1, top * 0.26, top * 0.86, lite ? 10 : 18, lite ? 2 : 5, true), sgaMat(0x0E0C14, { r: 0.95, side: 1 })));
if (!lite) {
var sp = shroud.geometry.attributes.position;
for (var v = 0; v < sp.count; v++) {
var vy = sp.getY(v);
if (vy < -top * 0.3) {
var ang = Math.atan2(sp.getZ(v), sp.getX(v));
sp.setY(v, vy + Math.abs(Math.sin(ang * 5)) * top * 0.07);
}
}
shroud.geometry.computeVertexNormals();
}
shroud.position.y = top * 0.43;
var hood = add(new THREE.Mesh(new THREE.SphereGeometry(top * 0.085, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.62), sgaMat(0x0E0C14, { r: 0.95, side: 1 })));
hood.position.y = top * 0.885;
hood.scale.set(1, 1.3, 1.05);
var mask = add(new THREE.Mesh(new THREE.SphereGeometry(top * 0.06, 16, 12, -Math.PI * 0.4, Math.PI * 0.8, Math.PI * 0.2, Math.PI * 0.6), sgaMat(0xECE8E0, { r: 0.35, e: col.getHex(), ei: 0.12 })));
mask.position.set(0, top * 0.875, top * 0.035);
mask.rotation.y = Math.PI / 2;
mask.scale.set(1, 1.3, 0.8);
var halo = add(new THREE.Mesh(new THREE.TorusGeometry(top * 0.12, 0.025, 8, 40), sgaMat(0xC8B070, { e: col.getHex(), ei: 0.35, m: 0.8, r: 0.3 })));
halo.rotation.x = Math.PI / 2;
halo.position.y = top + 0.25;
halo.userData.sgaTurn = 0.25;
for (var i = 0; i < (lite ? 4 : 8); i++) {
var a = i / (lite ? 4 : 8) * Math.PI * 2, bell = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.13, 10, 1, true), metal(0xB89A5A));
bell.position.set(Math.cos(a) * top * 0.12, -0.08, Math.sin(a) * top * 0.12);
bell.rotation.x = -Math.PI / 2;
halo.add(bell);
}
}
else if (kind === "restless") {
var crown = add(new THREE.Group());
crown.position.y = top - 0.06;
crown.add(new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.17, 0.08, 14, 1, true), metal(0x6E8A6A, 0x0E2A1E)));
for (var j = 0; j < 7; j++) {
var b = j / 7 * Math.PI * 2, pk = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.13, 5), metal(0x7E9A72, 0x10301E));
pk.position.set(Math.cos(b) * 0.16, 0.1, Math.sin(b) * 0.16);
crown.add(pk);
}
for (var w = 0; w < (lite ? 3 : 6); w++) {
var c = w / (lite ? 3 : 6) * Math.PI * 2 + 0.3, len = 0.12 + ((w * 37) % 10) / 50, weed = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.003, len, 4), sgaMat(0x2F5A3A, { r: 0.6 }));
weed.position.set(Math.cos(c) * 0.16, -len / 2, Math.sin(c) * 0.16);
crown.add(weed);
}
}
else if (kind === "magmagolem") {
var crust = sgaSlagTex();
var pool = add(new THREE.Mesh(new THREE.CircleGeometry(wide * 1.05, 28), new THREE.MeshStandardMaterial({ color: 0x2A2420, roughness: 0.95, map: crust, emissive: 0xFF6A20, emissiveMap: crust, emissiveIntensity: 0.9 })));
pool.material.userData.sgaOwn = 1;
pool.rotation.x = -Math.PI / 2;
pool.position.y = 0.04;
var n = lite ? 10 : 24, pos = new Float32Array(n * 3);
for (var k = 0; k < n; k++) {
pos[k * 3] = (Math.random() - 0.5) * wide * 1.6;
pos[k * 3 + 1] = top * 0.6 + Math.random() * top * 0.8;
pos[k * 3 + 2] = (Math.random() - 0.5) * wide * 1.6;
}
var pg = new THREE.BufferGeometry();
pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var em = add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xFFA040, size: 0.06, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })));
em.userData.sgaRise = top;
}
else if (kind === "cavespider") {
for (var t = 0; t < (lite ? 3 : 6); t++) {
var len2 = 6 + t, th = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, len2, 3), sgaMat(0xEDE6F5, { op: 0.55, e: col.getHex(), ei: 0.25 }));
th.position.set((t - 2.5) * 0.18, top + len2 / 2 - 0.1, (t % 2 ? 0.2 : -0.2));
add(th);
}
for (var q = 0; q < (lite ? 3 : 6); q++) {
var egg = new THREE.Mesh(new THREE.SphereGeometry(0.1 + (q % 3) * 0.03, 10, 8), sgaMat(0xE8DDF0, { r: 0.5, e: col.getHex(), ei: 0.18 }));
egg.position.set((q % 3 - 1) * 0.16, top * 0.75 + (q > 2 ? 0.1 : 0), -0.2 - (q > 2 ? 0.12 : 0));
add(egg);
}
}
g.userData.sgaDressed = 1;
},
function () {
if (SGA_SLAG)
return SGA_SLAG;
SGA_SLAG = wTex(256, 256, function (x, W, H) {
var R = wRand(913);
x.fillStyle = "#000000";
x.fillRect(0, 0, W, H);
for (var k = 0; k < 26; k++) {
x.strokeStyle = "rgba(255," + (120 + Math.floor(R() * 80)) + ",40," + (0.6 + R() * 0.4) + ")";
x.lineWidth = 1 + R() * 3;
x.beginPath();
var px = R() * W, py = R() * H;
x.moveTo(px, py);
for (var s = 0; s < 5; s++) {
px += (R() - 0.5) * 70;
py += (R() - 0.5) * 70;
x.lineTo(px, py);
}
x.stroke();
}
var gr = x.createRadialGradient(W / 2, H / 2, 8, W / 2, H / 2, W * 0.22);
gr.addColorStop(0, "rgba(255,150,50,0.55)");
gr.addColorStop(1, "rgba(255,90,20,0)");
x.fillStyle = gr;
x.fillRect(0, 0, W, H);
}, null);
return SGA_SLAG;
},
function (g, dt, t) {
if (!g || !g.userData.sgaDressed)
return;
for (var i = 0; i < g.children.length; i++) {
var o = g.children[i], u = o.userData;
if (u.sgaBreathe)
o.material.opacity = 0.24 + 0.06 * Math.sin(t * 0.6);
if (u.sgaTurn)
o.rotation.z += u.sgaTurn * dt;
if (u.sgaRise) {
var a = o.geometry.attributes.position;
for (var k = 0; k < a.count; k++) {
var y = a.getY(k) + dt * 0.6;
if (y > u.sgaRise * 1.6)
y = u.sgaRise * 0.5;
a.setY(k, y);
}
a.needsUpdate = true;
}
}
},
function (col, o) {
o = o || {};
var m = new THREE.MeshStandardMaterial({ color: col, roughness: o.r !== undefined ? o.r : 0.85, metalness: o.m || 0 });
if (o.map) {
m.map = o.map;
}
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = !!o.dw;
}
if (o.side)
m.side = THREE.DoubleSide;
m.userData.sgaOwn = 1;
return m;
},
function (col, kind, rep) {
var S = sgaLite() ? 256 : 512, c = new THREE.Color(col);
return wTex(S, S, function (x, W, H) {
var R = wRand(kind === "wall" ? 77 : 31);
x.fillStyle = "#" + c.getHexString();
x.fillRect(0, 0, W, H);
var rows = kind === "wall" ? 8 : 4, rh = H / rows;
for (var r = 0; r < rows; r++) {
var cols = kind === "wall" ? 4 : 4, off = (r % 2) * (W / cols / 2);
for (var k = -1; k <= cols; k++) {
var bx = k * W / cols + off, v = 0.78 + R() * 0.36, cc = c.clone().multiplyScalar(v);
x.fillStyle = "#" + cc.getHexString();
x.fillRect(bx + 2, r * rh + 2, W / cols - 4, rh - 4);
for (var q = 0; q < (sgaLite() ? 14 : 40); q++) {
var sx = bx + R() * W / cols, sy = r * rh + R() * rh;
x.fillStyle = "rgba(0,0,0," + (0.05 + R() * 0.12) + ")";
x.fillRect(sx, sy, 1 + R() * 3, 1 + R() * 3);
}
x.strokeStyle = "rgba(0,0,0,0.35)";
x.lineWidth = 3;
x.strokeRect(bx + 2, r * rh + 2, W / cols - 4, rh - 4);
x.strokeStyle = "rgba(255,255,255,0.06)";
x.lineWidth = 1;
x.beginPath();
x.moveTo(bx + 3, r * rh + 3);
x.lineTo(bx + W / cols - 4, r * rh + 3);
x.stroke();
}
}
}, rep);
},
function (G) {
var d = (SGA.delve && SGA.delve.d) || "belfry", D = SGA_DUNGEONS[d], lite = sgaLite();
WORLDS.delve.built = d;
SGA_ROOMS = sgaLayout(d);
var stone = new THREE.Color(D.stone);
SGA_ROOMS.forEach(function (r) {
var w = r.x1 - r.x0, l = r.z1 - r.z0, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2, h = r.h;
var fm = sgaMat(0xFFFFFF, { map: sgaStoneTex(stone.clone().multiplyScalar(1.15), "floor", [Math.max(1, w / 4), Math.max(1, l / 4)]), r: 0.92 });
var fl = wBox(w, 0.3, l, fm, cx, sgaIsPass(r) ? -0.16 : -0.15, cz, G);
var wm = sgaMat(0xFFFFFF, { map: sgaStoneTex(stone, "wall", [Math.max(1, (w + l) / 12), Math.max(1, h / 4)]), r: 0.95 });
var cm = sgaMat(stone.clone().multiplyScalar(0.45).getHex(), { r: 1 });
var cz0 = r.z0, cz1 = r.z1, cx0 = r.x0, cx1 = r.x1;
SGA_ROOMS.forEach(function (o) {
if (o === r || o.h <= h)
return;
if (o.x0 < r.x1 && o.x1 > r.x0) {
if (o.z1 > cz0 && o.z1 < cz1 && o.z0 <= cz0)
cz0 = o.z1;
if (o.z0 < cz1 && o.z0 > cz0 && o.z1 >= cz1)
cz1 = o.z0;
}
if (o.z0 < r.z1 && o.z1 > r.z0) {
if (o.x1 > cx0 && o.x1 < cx1 && o.x0 <= cx0)
cx0 = o.x1;
if (o.x0 < cx1 && o.x0 > cx0 && o.x1 >= cx1)
cx1 = o.x0;
}
});
wBox(cx1 - cx0, 0.4, cz1 - cz0, cm, (cx0 + cx1) / 2, h + 0.2, (cz0 + cz1) / 2, G);
[r.x0, r.x1].forEach(function (x) {
var segs = [[r.z0, r.z1]];
SGA_ROOMS.forEach(function (o) { if (o === r || !(o.x0 < x - 0.01 && o.x1 > x + 0.01))
return; var out = []; segs.forEach(function (sg) { if (o.z1 <= sg[0] || o.z0 >= sg[1]) {
out.push(sg);
return;
} if (o.z0 > sg[0])
out.push([sg[0], o.z0]); if (o.z1 < sg[1])
out.push([o.z1, sg[1]]); }); segs = out; });
segs.forEach(function (sg) { var sl = sg[1] - sg[0]; if (sl < 0.05)
return; wBox(0.6, h, sl, wm, x + (x === r.x0 ? -0.3 : 0.3), h / 2, (sg[0] + sg[1]) / 2, G); });
});
[r.z0, r.z1].forEach(function (z) {
var gaps = SGA_ROOMS.filter(function (o) { return o !== r && o.z0 <= z + 0.01 && o.z1 >= z - 0.01 && o.x0 < r.x1 && o.x1 > r.x0; });
var segs = [[r.x0, r.x1]];
gaps.forEach(function (o) { var out = []; segs.forEach(function (sg) { if (o.x1 <= sg[0] || o.x0 >= sg[1]) {
out.push(sg);
return;
} if (o.x0 > sg[0])
out.push([sg[0], o.x0]); if (o.x1 < sg[1])
out.push([o.x1, sg[1]]); }); segs = out; });
segs.forEach(function (sg) { var sw = sg[1] - sg[0]; if (sw < 0.05)
return; wBox(sw, h, 0.6, wm, (sg[0] + sg[1]) / 2, h / 2, z + (z === r.z0 ? -0.3 : 0.3), G); });
gaps.forEach(function (o) {
if (o.h > r.h)
return;
var ax0 = Math.max(o.x0, r.x0), ax1 = Math.min(o.x1, r.x1), aw = ax1 - ax0;
wBox(aw + 1.2, 0.8, 1.0, sgaMat(stone.clone().multiplyScalar(1.3).getHex(), { r: 0.8 }), (ax0 + ax1) / 2, o.h + 0.1, z, G);
[ax0 - 0.35, ax1 + 0.35].forEach(function (px) { wBox(0.7, o.h, 1.0, sgaMat(stone.clone().multiplyScalar(1.2).getHex(), { r: 0.8 }), px, o.h / 2, z, G); SGA_DLV.R.push({ x: px, z: z, r: 0.5 }); });
});
});
if (r.k.charAt(0) === "c" || r.k === "boss" || r.k === "in") {
var pm = sgaMat(stone.clone().multiplyScalar(1.25).getHex(), { r: 0.75 });
var nx = r.k === "boss" ? 3 : 2, nz = r.k === "boss" ? 4 : 2;
for (var i = 0; i < nx; i++)
for (var j = 0; j < nz; j++) {
var px = r.x0 + w * (i + 1) / (nx + 1), pz = r.z0 + l * (j + 1) / (nz + 1);
if (Math.abs(px) < 3.5)
continue;
var col = wCyl(0.55, 0.65, h, pm, px, h / 2, pz, G, lite ? 8 : 14);
wBox(1.6, 0.5, 1.6, pm, px, 0.25, pz, G);
wBox(1.5, 0.5, 1.5, pm, px, h - 0.25, pz, G);
SGA_DLV.R.push({ x: px, z: pz, r: 0.75 });
}
var bm = sgaMat(0x2A2420, { m: 0.6, r: 0.5 });
[[r.x0 + 1.6, r.z0 + 1.6], [r.x1 - 1.6, r.z0 + 1.6], [r.x0 + 1.6, r.z1 - 1.6], [r.x1 - 1.6, r.z1 - 1.6]].forEach(function (p, i) {
if (lite && i % 2)
return;
wCyl(0.5, 0.25, 0.5, bm, p[0], 1.15, p[1], G, 10);
wCyl(0.08, 0.12, 0.9, bm, p[0], 0.45, p[1], G, 6);
var fire = wCone(0.32, 0.7, sgaMat(0xFFB060, { e: D.light, ei: 1.4 }), p[0], 1.65, p[1], G, 8);
var gl = wGlow(D.light, 4.2, 0.55);
gl.position.set(p[0], 1.9, p[1]);
G.add(gl);
SGA_DLV.R.push({ x: p[0], z: p[1], r: 0.6 });
});
sgaDlvDress(G, d, r, lite);
}
});
var L = [[0, -2]], BR = sgaBossRoom();
SGA_ROOMS.forEach(function (r) { if (r.k.charAt(0) === "c")
L.push([(r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2]); });
L.push([0, (BR.z0 + BR.z1) / 2 + 10], [0, (BR.z0 + BR.z1) / 2 - 10]);
if (lite)
L = L.filter(function (p, i) { return i % 2 === 1 || i === L.length - 1; });
L.forEach(function (p) { var pl = new THREE.PointLight(D.light, lite ? 1.6 : 1.3, lite ? 40 : 34, 1.6); pl.position.set(p[0], 6, p[1]); G.add(pl); });
var hm = new THREE.HemisphereLight(0x8890A8, 0x201814, 0.55);
G.add(hm);
var sm = sgaMat(stone.clone().multiplyScalar(1.4).getHex(), { r: 0.8 });
for (var s = 0; s < 8; s++)
wBox(5, 0.38 * (s + 1), 0.5, sm, 0, 0.19 * (s + 1), 3.4 + s * 0.48, G);
var sg = wSign([D.n, "↑ E: climb back up"], 5.2, 1.3, "#1A1612", "#E8D8A8");
sg.position.set(0, 4.2, 6.6);
sg.rotation.y = Math.PI;
G.add(sg);
var dm = sgaMat(stone.clone().multiplyScalar(0.9).getHex(), { r: 0.6, m: 0.2 });
var bc = (BR.z0 + BR.z1) / 2;
wCyl(9, 10, 0.6, dm, 0, 0.3, bc, G, lite ? 16 : 32);
SGA_DLV.dais = { x: 0, z: bc };
try {
var Tn = D.tier;
if (Tn) {
var ts = wSign([Tn.n + " · beasts about level " + Tn.lv, "★".repeat(Tn.stars) + "☆".repeat(4 - Tn.stars)], 4.6, 1.1, "#1A1612", Tn.col);
ts.position.set(0, 6.1, 6.6);
ts.rotation.y = Math.PI;
G.add(ts);
}
}
catch (e) { }
},
function (G, d, r, lite) {
var R = wRand((r.x0 * 7 + r.z0 * 13 + d.length * 101) >>> 0), w = r.x1 - r.x0, l = r.z1 - r.z0, n = lite ? 3 : 7;
function at() { return [r.x0 + 2 + R() * (w - 4), r.z0 + 2 + R() * (l - 4)]; }
if (d === "belfry") {
var bronze = sgaMat(0x8A6A3A, { m: 0.8, r: 0.35 }), rope = sgaMat(0x6A5A3A, { r: 1 });
for (var i = 0; i < n; i++) {
var p = at(), hy = r.h - 1 - R() * 3, s = 0.5 + R() * 0.8;
var bl = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.05, 0), new THREE.Vector2(0.9, 0.05), new THREE.Vector2(0.75, 0.4), new THREE.Vector2(0.55, 1.0), new THREE.Vector2(0.5, 1.25), new THREE.Vector2(0.2, 1.35), new THREE.Vector2(0, 1.36)].map(function (v) { return v.multiplyScalar(s); }), lite ? 10 : 20), bronze);
bl.position.set(p[0], hy - 1.36 * s, p[1]);
G.add(bl);
wCyl(0.03, 0.03, r.h - hy, rope, p[0], hy + (r.h - hy) / 2, p[1], G, 4);
if (R() < 0.5)
wCyl(0.025, 0.025, hy - 0.6, rope, p[0] + 0.1, (hy - 0.6) / 2 + 0.3, p[1], G, 4);
}
}
else if (d === "barrow") {
var water = sgaMat(0x1A3A34, { r: 0.08, m: 0.3, op: 0.82 }), gold = sgaMat(0xC8A040, { m: 0.9, r: 0.3 });
for (var j = 0; j < Math.max(2, n - 3); j++) {
var q = at();
var pool = new THREE.Mesh(new THREE.CircleGeometry(1.4 + R() * 2, lite ? 12 : 24), water);
pool.rotation.x = -Math.PI / 2;
pool.position.set(q[0], 0.03, q[1]);
G.add(pool);
}
for (var k = 0; k < n; k++) {
var g = at();
wSph(0.12 + R() * 0.2, gold, g[0], 0.08, g[1], G, 8);
}
if (r.k === "c2" || r.k === "boss") {
var tomb = sgaMat(0x4A5A50, { r: 0.7 });
var tz = r.z0 + 5;
wBox(2.2, 1.0, 4.2, tomb, r.x0 + 3.2, 0.5, tz, G);
SGA_DLV.R.push({ x: r.x0 + 3.2, z: tz, r: 1.8 });
}
}
else if (d === "foundry") {
var lava = sgaMat(0xFF6A20, { e: 0xFF5A10, ei: 1.2, r: 0.4 }), iron = sgaMat(0x3A3634, { m: 0.7, r: 0.45 });
var ch = new THREE.Mesh(new THREE.PlaneGeometry(1.6, l - 2), lava);
ch.rotation.x = -Math.PI / 2;
ch.position.set(r.x1 - 2.6, 0.04, (r.z0 + r.z1) / 2);
G.add(ch);
for (var a = 0; a < Math.max(2, n - 3); a++) {
var c = at();
if (c[0] > r.x1 - 4.5)
c[0] -= 4;
wCyl(1.0, 1.2, 2.2, iron, c[0], 1.1, c[1], G, lite ? 8 : 14);
wCyl(0.9, 0.9, 0.1, lava, c[0], 2.25, c[1], G, lite ? 8 : 14);
SGA_DLV.R.push({ x: c[0], z: c[1], r: 1.3 });
}
}
else if (d === "silk") {
var web = sgaMat(0xE8E0F0, { op: 0.32, side: true, r: 1 }), egg = sgaMat(0xD8C8B8, { r: 0.6, e: 0x2A1A30 });
for (var b = 0; b < n; b++) {
var e = at();
var pl = new THREE.Mesh(new THREE.CircleGeometry(1.6 + R() * 2.2, lite ? 8 : 16), web);
pl.position.set(e[0], 2 + R() * (r.h - 3), e[1]);
pl.rotation.set(R() * 1.2, R() * 3, R() * 1.2);
G.add(pl);
}
for (var u = 0; u < n; u++) {
var f = at();
var eg = wSph(0.35 + R() * 0.25, egg, f[0], 0.3, f[1], G, lite ? 8 : 12);
eg.scale.y = 1.3;
}
}
},
function (d, runId) {
if (!SGA_DUNGEONS[d])
return;
var go = function (run) {
if (WORLDS.delve && WORLDS.delve.g && WORLDS.delve.built !== d) {
if (WLD.on === "delve")
worldOff(true);
try {
worldLetGo("delve");
}
catch (e) { }
}
sgaDlvFresh(d, run);
SGA.open = false;
sgaPaint();
worldGo("delve", {});
};
if (!sgaOnline() || SGA.off) {
go(null);
setStatus("<b>Practice run</b>: without the city's server nothing is kept, and you are on your own.");
return;
}
cityRpc(runId ? "saga_run_join" : "saga_run_open", runId ? { p_run: runId } : { p_dungeon: d }).then(function (o) {
if (!o || !o.ok) {
SGA.say = esc((o && o.say) || "That didn't go through.");
sgaPaint();
return;
}
go(o.run);
}).catch(function (e) { SGA.say = esc(String(e && e.message || e).slice(0, 160)); sgaPaint(); });
},
function () {
if (!SGA.delve)
sgaDlvFresh(WORLDS.delve.built || "belfry", null);
var P = camera.position, B = WORLDS.delve.base;
P.set(B, 1.72, 2);
yaw = 0;
pitch = 0;
WLD.arrive = { x: 0, z: 2 };
SGA_DLV.R = SGA_DLV.R || [];
sgaDlvSpawn();
var D = SGA_DUNGEONS[SGA.delve.d];
setStatus("<b>" + esc(D.n) + "</b>: " + esc(D.sub) + (SGA.delve.run ? " Your group's boss life is shared." : ""));
},
function () {
(SGA.delve && SGA.delve.mobs || []).forEach(function (M) { if (M.g && M.g.parent)
M.g.parent.remove(M.g); });
if (SGA.delve) {
SGA.delve.mobs = [];
if (SGA.delve.boss && SGA.delve.boss.g && SGA.delve.boss.g.parent)
SGA.delve.boss.g.parent.remove(SGA.delve.boss.g);
SGA.delve.boss = null;
}
var h = document.getElementById("sga-dhud");
if (h)
h.style.display = "none";
try {
sgaDlvFightClear();
}
catch (e) { }
sgaDlvFlush();
},
function () {
var S = SGA.delve, D = SGA_DUNGEONS[S.d], T = D.tier || { hp: 0.8, dmg: 0.7, lv: 6 }, G = WORLDS.delve.g, seed = 1, rnd = wRand(97 + S.d.length * 13);
S.mobs = [];
SGA_ROOMS.forEach(function (r) {
if (!r.mobs)
return;
var n = sgaLite() ? Math.max(2, r.mobs - 1) : r.mobs;
for (var i = 0; i < n; i++) {
var kk = D.mobs[(i + seed) % D.mobs.length], K = DGB_KINDS[kk] || DGB_KINDS.restless;
if (!DGB_KINDS[kk])
kk = "restless";
seed++;
var champ = i < (r.champ || 0);
var x = r.x0 + 3 + ((i * 7919 + seed * 31) % 100) / 100 * (r.x1 - r.x0 - 6), z = r.z0 + 3 + ((i * 104729 + seed * 17) % 100) / 100 * (r.z1 - r.z0 - 6);
var g = dgbBody(K, "sgad" + S.d + seed);
g.position.set(x, 0, z);
g.rotation.y = rnd() * 6;
G.add(g);
var hp = Math.round((K.hp || 60) * T.hp * (champ ? 2.4 : 1)), lv = T.lv + (r.side ? 1 : 0) + (r.i || 0) + (champ ? 3 : 0);
if (champ) {
g.scale.multiplyScalar(1.3);
try {
var cg = wGlow(D.light, 3.2, 0.32);
cg.position.y = 1.6;
g.add(cg);
}
catch (e) { }
}
S.mobs.push({ key: kk, K: K, g: g, hp: hp, max: hp, st: "idle", cool: 1 + rnd(), hx: x, hz: z, ph: 0, lv: lv, champ: champ, dmg: Math.max(2, Math.round((K.dmg || 8) * T.dmg * (champ ? 1.4 : 1))), name: (champ ? "Champion " : "") + String(K.name || "beast").replace(/^(The|A|An) /, "") });
}
});
var BK = DGB_KINDS[D.boss.kind] || DGB_KINDS.restless, bg = dgbBody(BK, "sgaboss" + S.d);
bg.scale.multiplyScalar(D.boss.scale);
try {
var gl = wGlow(D.boss.glow, 4.2, 0.22);
gl.position.y = 2.2;
bg.add(gl);
}
catch (e) { }
try {
sgaBossDress(bg, D);
}
catch (e) { }
var BR = sgaBossRoom();
bg.position.set(0, 0.6, (BR.z0 + BR.z1) / 2 - 4);
G.add(bg);
S.boss = { K: BK, g: bg, st: "sleep", cool: 2, ph: 0, localHp: D.boss.hp, localMax: D.boss.hp, fallen: false };
},
function () {
var S = SGA.delve;
if (!S || !S.run || S.buf <= 0 || S.sending)
return;
var dmg = Math.min(600, Math.round(S.buf));
S.buf -= dmg;
S.sending = true;
S.sent = Date.now();
cityRpc("saga_run_hit", { p_run: S.run.id, p_dmg: dmg }).then(function (o) { S.sending = false; if (o && o.ok)
sgaDlvState(o); }).catch(function () { S.sending = false; });
},
function (o) {
var S = SGA.delve;
S.won = true;
S.loot = o.loot || [];
try {
if (S.boss && !S.boss.fallen && typeof sgaDropAt === "function") {
var hb = { g: S.boss.g, K: S.boss.K, key: SGA_DUNGEONS[S.d].boss.kind, boss: true, lv: ((SGA_DUNGEONS[S.d].tier || {}).lv || 12) + 6, name: SGA_DUNGEONS[S.d].boss.n };
sgaDropAt(hb);
}
}
catch (e) { }
if (S.boss && !S.boss.fallen) {
S.boss.fallen = true;
S.boss.st = "dead";
try {
if (typeof cbtKilled === "function")
cbtKilled({ name: SGA_DUNGEONS[S.d].boss.n, lv: ((SGA_DUNGEONS[S.d].tier || {}).lv || 12) + 6, boss: true });
}
catch (e) { }
}
if (S.d === "belfry") {
var st = sgaStep("d1");
if (st && sgaOpenStep(st))
sgaStepDone(st);
}
var D = SGA_DUNGEONS[S.d], me = typeof myUserId === "function" ? myUserId() : "";
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + D.icon + " " + esc(D.boss.n) + " falls</div>";
if (!S.run)
h += "<p>A practice run: nothing is kept. Sign in and go with a group for the loot.</p>";
else if (!(S.loot || []).length)
h += "<p>The keepsakes are being counted… (if none show, the city's update for them has not been run yet).</p>";
else
h += (S.loot || []).map(function (L) {
var rolls = (L.rolls || []).slice().sort(function (a, b) { return b.roll - a.roll; }).map(function (r) { return (r.user === L.winner ? "<b>" : "") + esc(r.name || "a dreamer") + " " + r.roll + (r.user === L.winner ? "</b>" : ""); }).join(" · ");
return "<div style='margin:6px 0;padding:6px 8px;border:1px solid rgba(201,168,104,.4);border-radius:6px'>" + esc(L.icon || "") + " <b>" + esc(L.name) + "</b> → " + (L.winner === me ? "<span style='color:#9AF0B0'>you!</span>" : esc(L.winner_name || "a dreamer")) +
"<div style='font-size:12px;opacity:.8'>Rolls: " + rolls + "</div></div>";
}).join("");
if (o.gold)
h += "<p>+" + o.gold + " gold from the Treasury for each grown-up dues-payer who fought.</p>";
h += worldBtn("out", "⬆ Leave the dungeon", "Or stay and look round; the stair is where you came in");
worldCard(h, { out: function () { worldCard(null); worldHome("<b>You climb back up into the daylight.</b>"); } });
if (typeof playTone === "function")
playTone(392, 0.6);
sgaLoad(true);
},
function (d, name) {
var S = SGA.delve;
if (!S)
return;
var safe = (typeof dgrProtected === "function" && dgrProtected()) || sgaKeeper();
if (safe) {
if (Math.random() < 0.25)
setStatus("<b>" + esc(name) + "</b> swings at you, but cannot touch you: the young are never hurt here.");
return;
}
if (typeof spellHarm === "function")
try {
var w = +spellHarm(d);
if (isFinite(w))
d = Math.max(0, Math.round(w));
}
catch (e) { }
S.vig -= d;
S.calm = 0;
if (typeof playTone === "function")
playTone(150, 0.12);
if (S.vig <= 0) {
S.vig = 100;
var P = camera.position;
P.set(WORLDS.delve.base, 1.72, 2);
yaw = 0;
setStatus("<b>" + esc(name) + "</b> knocks you down. You come to at the foot of the stair, whole. Your group fights on; go back when you're ready.");
}
},
function (M, dmg, knock, byComp) {
var S = SGA.delve;
if (!S || !M || M.st === "dead" || M.fallen)
return;
dmg = Math.max(0, Math.round(+dmg || 0));
if (M === S.boss) {
if (M.st === "sleep")
M.st = "come";
if (S.run)
S.buf += dmg;
else {
M.localHp -= dmg;
if (M.localHp <= 0)
sgaDlvWon({ loot: [] });
}
if (typeof harmKnock === "function")
try {
harmKnock(M.g, false);
}
catch (e) { }
return;
}
M.hp -= dmg;
M.st = "come";
var P = camera.position, dx = M.g.position.x - (P.x - WORLDS.delve.base), dz = M.g.position.z - P.z, dd = Math.hypot(dx, dz) || 1, kb = 0.35 + (knock || 0) * 0.25;
var nx = M.g.position.x + dx / dd * kb, nz = M.g.position.z + dz / dd * kb;
if (!sgaDlvBlocked(nx, nz)) {
M.g.position.x = nx;
M.g.position.z = nz;
}
M.cool = Math.max(M.cool, 0.35);
if (M.hp <= 0) {
M.st = "dead";
M.deadT = 0;
M.hp = 0;
setStatus("⚔️ <b>" + (byComp ? "Your companion beats" : "You beat") + " the " + esc(String(M.K.name || "beast").replace(/^(The|A|An) /, "").toLowerCase()) + ".</b> It leaves something where it fell: walk over it to pick it up.");
if (typeof playTone === "function")
playTone(660, 0.2);
try {
sgaDropAt(M);
}
catch (e) { }
try {
if (typeof cbtKilled === "function")
cbtKilled({ name: M.name || M.K.name, lv: M.lv || Math.max(1, Math.round((M.K.hp || 40) / 12)), boss: false });
}
catch (e) { }
return;
}
try {
sgaBar(M);
}
catch (e) { }
if (!byComp)
sgaHitSay(M, dmg);
},
function (dt) {
var S = SGA.delve;
if (!S)
return;
var P = camera.position, B = WORLDS.delve.base, lx = P.x - B, lz = P.z, D = SGA_DUNGEONS[S.d];
S.cool = Math.max(0, S.cool - dt);
S.calm = (S.calm || 0) + dt;
S.dressT = (S.dressT || 0) + dt;
if (S.boss && S.boss.g && !S.boss.fallen)
try {
sgaBossDressTick(S.boss.g, dt, S.dressT);
}
catch (e) { }
if (S.calm > 6 && S.vig < 100)
S.vig = Math.min(100, S.vig + dt * 4);
S.mobs.forEach(function (M) {
var g = M.g;
if (M.st === "dead") {
M.deadT += dt;
g.rotation.x = Math.min(1.5, M.deadT * 3);
if (M.deadT > 2.5 && g.parent) {
g.parent.remove(g);
}
return;
}
var dx = lx - g.position.x, dz = lz - g.position.z, d = Math.hypot(dx, dz);
if (M.st === "idle" && d < 13 && sgaRoomAt(lx, lz) === sgaRoomAt(g.position.x, g.position.z))
M.st = "come";
if (M.st === "idle" && d < 9 && sgaSees(g.position.x, g.position.z, lx, lz))
M.st = "come";
if (M.st === "come") {
if (d > 22) {
M.st = "idle";
return;
}
var reach = M.K.reach || 2;
g.rotation.y = Math.atan2(dx, dz);
if (d > reach * 0.9) {
var sp = (M.K.spd || 3.5) * 0.75, st = Math.min(d - reach * 0.8, sp * dt), nx = g.position.x + dx / d * st, nz = g.position.z + dz / d * st;
if (!sgaDlvBlocked(nx, nz)) {
g.position.x = nx;
g.position.z = nz;
}
M.ph += dt * 8;
}
M.cool -= dt;
if (d <= reach + 0.2 && M.cool <= 0) {
M.cool = 1.5 + Math.random() * 0.6;
sgaVigHurt(M.dmg || Math.round((M.K.dmg || 8) * 0.7), M.name || M.K.name);
}
var L = g.userData.limbs;
if (L) {
var s = Math.sin(M.ph) * 0.4;
L.ll.rotation.x = s;
L.rl.rotation.x = -s;
}
}
});
var Bo = S.boss;
if (Bo && !Bo.fallen) {
var bx = lx - Bo.g.position.x, bz = lz - Bo.g.position.z, bd = Math.hypot(bx, bz);
var BRm = sgaBossRoom();
if (Bo.st === "sleep" && lz < BRm.z1 - 2) {
Bo.st = "come";
setStatus("<b>" + esc(D.boss.n) + "</b> wakes.");
if (typeof playTone === "function")
playTone(110, 0.8);
}
if (Bo.st === "come") {
Bo.g.rotation.y = Math.atan2(bx, bz);
var reachB = 2.2 + D.boss.scale;
if (bd > reachB && lz < BRm.z1 + 2) {
var spB = 2.4, stB = Math.min(bd - reachB * 0.8, spB * dt), nbx = Bo.g.position.x + bx / bd * stB, nbz = Bo.g.position.z + bz / bd * stB;
if (!sgaDlvBlocked(nbx, nbz)) {
Bo.g.position.x = nbx;
Bo.g.position.z = nbz;
}
}
Bo.g.position.y = WORLDS.delve.ground(Bo.g.position.x, Bo.g.position.z);
Bo.cool -= dt;
if (bd <= reachB + 0.3 && Bo.cool <= 0) {
Bo.cool = 2.2;
sgaVigHurt(D.boss.dmg, D.boss.n);
}
S.slam += dt;
if (S.slam > 13 && !S.ring) {
S.slam = 0;
var rm = sgaMat(0xFF5A3A, { op: 0.35, e: 0xFF3A1A, side: true });
var ring = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.6, 48), rm);
ring.rotation.x = -Math.PI / 2;
ring.position.set(Bo.g.position.x, 0.06, Bo.g.position.z);
WORLDS.delve.g.add(ring);
S.ring = { m: ring, t: 0 };
setStatus("<b>" + esc(D.boss.n) + "</b> raises up: <b>get clear of the red ring!</b>");
}
if (S.ring) {
S.ring.t += dt;
var R = Math.min(7, 0.6 + S.ring.t * 3.2);
S.ring.m.scale.set(R / 0.6, R / 0.6, 1);
if (S.ring.t > 2) {
var rd = Math.hypot(lx - S.ring.m.position.x, lz - S.ring.m.position.z);
if (rd < 7)
sgaVigHurt(D.boss.dmg + 8, D.boss.n);
if (S.ring.m.parent)
S.ring.m.parent.remove(S.ring.m);
S.ring.m.geometry.dispose();
S.ring = null;
}
}
}
}
else if (Bo && Bo.fallen) {
Bo.dt = (Bo.dt || 0) + dt;
Bo.g.rotation.x = Math.min(1.4, Bo.dt * 1.2);
}
var C = sgaCompActive();
S.ct = (S.ct || 0) + dt;
if (C && SGA.comp && S.ct > 1.6) {
S.ct = 0;
if (C.role === "fighter" || C.role === "scout") {
var cg = SGA.comp.g, tgt = null, td = 9;
sgaFoes().forEach(function (M) { var q = Math.hypot(M.g.position.x - cg.position.x, M.g.position.z - cg.position.z); if (q < td) {
td = q;
tgt = M;
} });
if (tgt)
sgaDlvDamage(tgt, C.role === "fighter" ? 9 : 5, 0, true);
}
if ((C.role === "healer") && S.vig < 92)
S.vig = Math.min(100, S.vig + 6);
}
sgaDlvFightTick(dt);
if (S.run) {
if (S.buf > 0 && Date.now() - S.sent > 1200)
sgaDlvFlush();
sgaDlvPoll();
}
if (Math.abs(lx) < 3.2 && lz > -0.5)
worldPrompt("<b>The stair</b> · <b>press E</b> to climb back up to Somnucor", function () { worldPrompt(null); worldHome("<b>You climb back up into the daylight.</b>"); });
else if (WLD.promptFn && WLD.prompt && /The stair/.test(WLD.prompt.dataset.h || ""))
worldPrompt(null);
sgaDlvHud(D);
},
function (D) {
var S = SGA.delve, el = document.getElementById("sga-dhud");
if (!el) {
el = document.createElement("div");
el.id = "sga-dhud";
el.style.cssText = "position:fixed;z-index:42;left:50%;transform:translateX(-50%);top:calc(58px + env(safe-area-inset-top,0px));width:min(440px,calc(100vw - 32px));font:600 12.5px var(--sans,system-ui);color:#F2E6C4;pointer-events:none;text-align:center";
document.body.appendChild(el);
var sb = document.createElement("div");
sb.id = "sga-strike";
sb.textContent = "⚔️ Strike";
sb.setAttribute("role", "button");
sb.style.cssText = "position:fixed;z-index:43;right:16px;bottom:calc(150px + env(safe-area-inset-bottom,0px));padding:14px 16px;border-radius:30px;background:rgba(120,30,20,.85);border:1px solid #F0A080;color:#FFE8D8;font:700 14px var(--sans,system-ui);cursor:pointer;user-select:none;display:none";
sb.addEventListener("pointerdown", function (e) { e.preventDefault(); e.stopPropagation(); sgaDlvStrike(); });
document.body.appendChild(sb);
}
var Bo = S.boss, h = "";
var hp = S.run ? S.hp : (Bo ? Bo.localHp : 0), max = S.run ? S.max : (Bo ? Bo.localMax : 1);
if (Bo && (Bo.st !== "sleep" || S.won)) {
var f = max ? Math.max(0, Math.min(1, (hp == null ? max : hp) / max)) : 0;
h += "<div style='text-shadow:0 1px 3px #000'>" + D.icon + " " + esc(D.boss.n) + (S.won ? " · beaten" : "") + "</div><div style='height:9px;border-radius:5px;background:rgba(30,20,20,.8);overflow:hidden;margin-top:3px;border:1px solid rgba(255,200,160,.4)'><div style='height:100%;width:" + (f * 100).toFixed(1) + "%;background:linear-gradient(90deg,#A02A1A,#E0603A)'></div></div>";
}
var vf = Math.max(0, S.vig) / 100;
h += "<div style='margin-top:6px;display:flex;align-items:center;gap:6px;justify-content:center;text-shadow:0 1px 3px #000'>Vigour<div style='width:140px;height:7px;border-radius:4px;background:rgba(20,30,20,.8);overflow:hidden'><div style='height:100%;width:" + (vf * 100).toFixed(0) + "%;background:#6AC07A'></div></div>" +
(S.run ? "<span style='opacity:.85'>· group of " + ((S.members || []).length || 1) + "</span>" : "<span style='opacity:.85'>· practice</span>") + "</div>";
if (el.dataset.h !== h) {
el.dataset.h = h;
el.innerHTML = h;
}
el.style.display = walkMode ? "block" : "none";
var sb2 = document.getElementById("sga-strike");
if (sb2)
sb2.style.display = walkMode && ("ontouchstart" in window || navigator.maxTouchPoints > 0) ? "block" : "none";
},
function () {
if (typeof carrying === "undefined" || !carrying)
return null;
var a = String(carrying.archetype || ""), A = /^bw_/.test(a) && typeof BW_ARMS !== "undefined" ? BW_ARMS[a.slice(3)] : null, R = typeof ARMS !== "undefined" ? ARMS[a] : null;
if (!A && !R)
return null;
return { key: a, A: A, R: R, held: (A && A.held) || (R && R.held) || null };
},
function () {
var w = WLD.on === "delve" ? sgaArm() : null, want = w && w.held && typeof HELD !== "undefined" && HELD[w.held] ? w.key : null;
var inHand = want && sgaVR(), inView = want && !sgaVR() && sgaEyes();
var key = want ? (inHand ? "vr:" : "eye:") + want : null;
if (!inHand && !inView)
key = null;
if (key === SGA_FX.vmKey && (!key || SGA_FX.vm))
return;
sgaVmDrop();
SGA_FX.vmKey = key;
if (!key)
return;
var A = w.A, m = HELD[w.held](), melee = A ? A.kind === "melee" : !w.R.shot;
var fwd = typeof BW_FWD !== "undefined" && BW_FWD.test(w.held);
if (inHand) {
var hand = VRM.hands && (VRM.hands[1] || VRM.hands[0]);
if (!hand) {
SGA_FX.vmKey = null;
return;
}
if (fwd)
m.rotation.y = Math.PI;
else
m.rotation.x = -Math.PI / 2 + 0.25;
m.scale.setScalar(0.7);
hand.add(m);
SGA_FX.vm = m;
SGA_FX.vmHand = true;
return;
}
var g = new THREE.Group();
g.userData.rest = melee ? [-0.5, 0] : fwd ? [0, Math.PI] : [-Math.PI / 2, 0];
g.userData.melee = melee;
m.rotation.set(g.userData.rest[0], g.userData.rest[1], 0);
m.scale.setScalar(0.55);
g.add(m);
g.userData.m = m;
g.traverse(function (o) { if (o.isMesh) {
o.renderOrder = 20;
o.frustumCulled = false;
} });
scene.add(g);
SGA_FX.vm = g;
SGA_FX.vmHand = false;
},
function (dt) {
sgaVmSet();
SGA_FX.swing = Math.max(0, SGA_FX.swing - dt * 3.2);
SGA_FX.kick = Math.max(0, SGA_FX.kick - dt * 6);
var g = SGA_FX.vm;
if (!g || SGA_FX.vmHand)
return;
g.position.copy(camera.position);
g.quaternion.copy(camera.quaternion);
var sw = Math.sin(SGA_FX.swing * Math.PI);
g.position.add(new THREE.Vector3(0.32 - sw * 0.3, -0.36 + sw * 0.12, -0.62 - sw * 0.18 + SGA_FX.kick * 0.06).applyQuaternion(camera.quaternion));
var m = g.userData.m, rr = g.userData.rest;
if (g.userData.melee)
m.rotation.set(-0.5 - sw * 1.4, sw * 0.6, -sw * 0.5);
else
m.rotation.set(rr[0] + (rr[1] ? -1 : 1) * SGA_FX.kick * 0.2, rr[1], 0);
},
function (lx, lz, dir, maxD, tol) {
var best = null, bs = 1e9, fl = Math.hypot(dir.x, dir.z) || 1, fx = dir.x / fl, fz = dir.z / fl;
sgaFoesSeen().forEach(function (M) {
var dx = M.g.position.x - lx, dz = M.g.position.z - lz, d = Math.hypot(dx, dz);
if (d > maxD || d < 0.5)
return;
var a = Math.acos(Math.max(-1, Math.min(1, (dx * fx + dz * fz) / d)));
if (a > Math.max(tol, Math.atan2(sgaFoeR(M), d)))
return;
if (a * d < bs) {
bs = a * d;
best = M;
}
});
if (!best)
return dir;
var v = new THREE.Vector3(best.g.position.x - lx, 0, best.g.position.z - lz).normalize();
v.y = dir.y * 0.3;
return v.normalize();
},
function () {
var S = SGA.delve;
if (!S || S.cool > 0)
return;
var w = sgaArm(), A = w && w.A, P = camera.position, B = WORLDS.delve.base, lx = P.x - B, lz = P.z, dir = sgaAimDir();
var kind = A ? A.kind : (w && w.R && w.R.shot ? "shot" : "melee");
S.cool = A && A.cool ? Math.max(0.2, A.cool) : (kind === "melee" ? 0.55 : 0.6);
if (kind === "self") {
S.vig = Math.min(100, S.vig + (A.heal || 20));
setStatus("<b>" + esc(A.name) + "</b> mends you: +" + (A.heal || 20) + " vigour.");
if (typeof playTone === "function")
playTone(520, 0.2);
return;
}
if (kind === "melee") {
SGA_FX.swing = 1;
var reach = A ? A.reach + 0.9 : 3.2, arc = A ? Math.max(0.6, A.arc) : 0.9, fl = Math.hypot(dir.x, dir.z) || 1, fx = dir.x / fl, fz = dir.z / fl, hits = [];
sgaFoesSeen().forEach(function (M) {
var dx = M.g.position.x - lx, dz = M.g.position.z - lz, d = Math.hypot(dx, dz), r = reach + (M === S.boss ? SGA_DUNGEONS[S.d].boss.scale : 0);
if (d > r)
return;
var a = d > 0.01 ? Math.acos(Math.max(-1, Math.min(1, (dx * fx + dz * fz) / d))) : 0;
if (a > arc && d > 1.4)
return;
hits.push({ M: M, d: d });
});
hits.sort(function (a, b) { return a.d - b.d; });
if (typeof playTone === "function")
playTone(hits.length ? 260 : 200, 0.06);
if (!hits.length) {
if (!S.toldMiss || Date.now() - S.toldMiss > 8000) {
S.toldMiss = Date.now();
setStatus("You swing" + (A ? " the <b>" + esc(A.name) + "</b>" : "") + " at the air: get closer, or face the beast.");
}
return;
}
var dmg = sgaDmg(A);
(A && A.cleave ? hits.slice(0, 3) : hits.slice(0, 1)).forEach(function (h, i) { sgaDlvDamage(h.M, i ? Math.round(dmg * 0.7) : dmg, A && A.knock); });
return;
}
SGA_FX.kick = 1;
var from = new THREE.Vector3(lx, P.y - 0.25, lz).addScaledVector(dir, 0.6);
if (kind === "nova" || kind === "summon") {
var rr = A && A.reach ? A.reach : 8, dm = sgaDmg(A), n = 0;
sgaFoesSeen().forEach(function (M) { if (Math.hypot(M.g.position.x - lx, M.g.position.z - lz) < rr) {
sgaDlvDamage(M, Math.round(dm * 0.8));
n++;
} });
sgaRing(lx, lz, rr, A && A.col || 0xD8C8FF);
setStatus("<b>" + esc(A ? A.name : "It") + "</b>" + (n ? ": " + n + " beast" + (n > 1 ? "s" : "") + " caught in it." : ": nothing near enough."));
if (typeof playTone === "function")
playTone(720, 0.2);
return;
}
var maxD = A && A.reach ? Math.min(40, A.reach) : 28, aim = sgaAssist(lx, lz, dir, kind === "cone" ? maxD : 40, 0.12);
if (kind === "cone") {
var n2 = 0, d2 = sgaDmg(A), fl2 = Math.hypot(aim.x, aim.z) || 1;
sgaFoesSeen().forEach(function (M) {
var dx = M.g.position.x - lx, dz = M.g.position.z - lz, d = Math.hypot(dx, dz);
if (d > maxD)
return;
if (Math.acos(Math.max(-1, Math.min(1, (dx * aim.x + dz * aim.z) / (d * fl2 || 1)))) > (A.arc || 0.5))
return;
sgaDlvDamage(M, d2);
n2++;
});
sgaLine(from, from.clone().addScaledVector(aim, Math.min(maxD, 6)), A.puff || 0xFF9A4A, 0.45, 0.18);
if (typeof playTone === "function")
playTone(300, 0.08);
return;
}
if (kind === "beam") {
var end = Math.min(40, A.reach || 30), hit = null, hd = 1e9;
for (var s = 1; s < end; s += 0.5) {
if (sgaDlvBlocked(from.x + aim.x * s, from.z + aim.z * s)) {
end = s;
break;
}
}
sgaFoesSeen().forEach(function (M) {
var vx = M.g.position.x - from.x, vz = M.g.position.z - from.z, al = vx * aim.x + vz * aim.z;
if (al < 0.3 || al > end)
return;
var px = from.x + aim.x * al - M.g.position.x, pz = from.z + aim.z * al - M.g.position.z;
if (Math.hypot(px, pz) > sgaFoeR(M) + 0.2)
return;
if (al < hd) {
hd = al;
hit = M;
}
});
sgaLine(from, from.clone().addScaledVector(aim, hit ? hd : end), A.col || 0xFFE8A0, Math.max(0.35, (A.cool || 0.4) + 0.15), 0.05);
if (hit)
sgaDlvDamage(hit, sgaDmg(A), A.knock);
if (typeof playTone === "function")
playTone(600, 0.12);
return;
}
var col = A ? (A.p === "fire" ? 0xFF8A3A : A.p === "frost" ? 0xBFE4F4 : A.p === "laser" || A.p === "plasma" ? 0x8AE0FF : A.p === "spark" ? 0xE8F0FF : A.p === "arrow" || A.p === "bolt" ? 0x8A6A3A : 0xFFE8B0)
: ({ fire: 0xFF7A1E, lightning: 0xE8F0FF, ice: 0xBFE4F4, light: 0xFFF0C0, arrow: 0x8A6A3A, bolt: 0x6A6A6A }[w.R.shot] || 0xFFE8B0);
var speed = kind === "throw" ? 22 : A && (A.p === "bullet" || A.p === "laser") ? 70 : 38, dmgS = sgaDmg(A), pel = A && A.pellets ? Math.min(6, A.pellets) : 1;
for (var i = 0; i < pel; i++) {
var ap = aim.clone();
if (i || (A && A.spread)) {
var sp = (A && A.spread) || 0.08;
ap.x += (Math.random() - 0.5) * sp;
ap.z += (Math.random() - 0.5) * sp;
ap.normalize();
}
sgaShot(from, ap, speed, pel > 1 ? Math.max(1, Math.round(dmgS / pel * 1.6)) : dmgS, col, A && A.splash, A && A.knock);
}
if (typeof playTone === "function")
playTone(A && (A.p === "laser" || A.p === "plasma") ? 660 : A && (A.p === "bullet" || A.p === "ball") ? 120 : 260, 0.08);
},
function (from, dir, speed, dmg, col, splash, knock) {
if (SGA_FX.shots.length > 40)
return;
var G = WORLDS.delve.g, g = new THREE.Group();
var body = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.02, 0.45, 6), new THREE.MeshBasicMaterial({ color: col }));
body.rotation.x = Math.PI / 2;
g.add(body);
try {
var gl = wGlow(col, 0.7, 0.5);
g.add(gl);
}
catch (e) { }
g.position.set(SGA_DLV.base + from.x, from.y, from.z);
scene.add(g);
g.lookAt(g.position.x + dir.x, g.position.y + dir.y, g.position.z + dir.z);
SGA_FX.shots.push({ g: g, x: from.x, y: from.y, z: from.z, dir: dir.clone(), speed: speed, dmg: dmg, life: 2.2, splash: splash || 0, knock: knock || 0 });
},
function (dt) {
var S = SGA.delve, list = SGA_FX.shots;
for (var i = list.length - 1; i >= 0; i--) {
var s = list[i], step = s.speed * dt, n = Math.max(1, Math.ceil(step / 0.5)), done = false;
for (var k = 0; k < n && !done; k++) {
s.x += s.dir.x * step / n;
s.y += s.dir.y * step / n;
s.z += s.dir.z * step / n;
if (sgaDlvBlocked(s.x, s.z) || s.y < 0.05 || s.y > 16) {
done = true;
break;
}
var foes = sgaFoes();
for (var j = 0; j < foes.length; j++) {
var M = foes[j];
if (Math.hypot(M.g.position.x - s.x, M.g.position.z - s.z) < sgaFoeR(M) && s.y < M.g.position.y + (M === S.boss ? 6 : 3)) {
sgaDlvDamage(M, s.dmg, s.knock);
if (s.splash)
foes.forEach(function (o) { if (o !== M && Math.hypot(o.g.position.x - s.x, o.g.position.z - s.z) < s.splash)
sgaDlvDamage(o, Math.round(s.dmg * 0.6)); });
done = true;
break;
}
}
}
s.life -= dt;
if (done || s.life <= 0) {
if (s.g.parent)
s.g.parent.remove(s.g);
s.g.traverse(function (o) { if (o.geometry)
o.geometry.dispose(); });
list.splice(i, 1);
continue;
}
s.g.position.set(SGA_DLV.base + s.x, s.y, s.z);
}
},
function (a, b, col, life, w) {
var len = a.distanceTo(b);
if (len < 0.2 || SGA_FX.lines.length > 12)
return;
var m = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 6, 1, true).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0, depthWrite: false, fog: false }));
var B = SGA_DLV.base;
m.position.set(B + (a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
m.scale.set(w, w, len);
m.lookAt(B + b.x, b.y, b.z);
scene.add(m);
SGA_FX.lines.push({ m: m, t: 0, life: life, op: 0.4 });
},
function (x, z, r, col) {
var m = new THREE.Mesh(new THREE.RingGeometry(0.85, 1, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, fog: false }));
m.position.set(SGA_DLV.base + x, 0.08, z);
scene.add(m);
SGA_FX.lines.push({ m: m, t: 0, life: 1.2, op: 0.3, ring: r });
},
function (dt) {
for (var i = SGA_FX.lines.length - 1; i >= 0; i--) {
var L = SGA_FX.lines[i];
L.t += dt;
var u = L.t / L.life;
L.m.material.opacity = L.op * Math.min(1, L.t * 8) * (u < 0.5 ? 1 : Math.max(0, (1 - u) * 2));
if (L.ring) {
var rs = 0.5 + u * L.ring;
L.m.scale.set(rs, 1, rs);
}
if (u >= 1) {
scene.remove(L.m);
L.m.geometry.dispose();
L.m.material.dispose();
SGA_FX.lines.splice(i, 1);
}
}
},
function (M, d) {
var S = SGA.delve, nm = M === S.boss ? SGA_DUNGEONS[S.d].boss.n : "the " + String(M.K.name || "beast").replace(/^(The|A|An) /, "").toLowerCase();
if (M === S.boss)
return;
if (M.st === "dead")
return;
setStatus("⚔️ You strike " + esc(nm) + " (<b>" + d + "</b>). " + Math.max(0, Math.round(M.hp)) + " of " + M.max + " left in it.");
},
function (M) {
if (M.bar)
return M.bar;
var g = new THREE.Group(), bg = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.11), new THREE.MeshBasicMaterial({ color: 0x1A1010, transparent: true, opacity: 0.75, depthWrite: false, fog: false }));
var fg = new THREE.Mesh(new THREE.PlaneGeometry(1.06, 0.07), new THREE.MeshBasicMaterial({ color: 0xD0503A, depthWrite: false, fog: false }));
fg.position.z = 0.002;
g.add(bg);
g.add(fg);
g.userData.fg = fg;
g.renderOrder = 15;
WORLDS.delve.g.add(g);
M.bar = g;
SGA_FX.bars.push(M);
return g;
},
function () {
var B = SGA_DLV.base;
for (var i = SGA_FX.bars.length - 1; i >= 0; i--) {
var M = SGA_FX.bars[i], g = M.bar;
if (!g) {
SGA_FX.bars.splice(i, 1);
continue;
}
if (M.st === "dead" || !M.g.parent) {
if (g.parent)
g.parent.remove(g);
M.bar = null;
SGA_FX.bars.splice(i, 1);
continue;
}
var h = 1.8 * (M.K.big ? 1.5 : 1) * (M.K.scale ? Math.min(1.6, M.K.scale / 2.2) : 1) + 0.5;
g.position.set(M.g.position.x, h, M.g.position.z);
g.lookAt(camera.position.x - B, camera.position.y, camera.position.z);
var f = Math.max(0, Math.min(1, M.hp / M.max));
g.userData.fg.scale.x = Math.max(0.001, f);
g.userData.fg.position.x = -(1 - f) * 0.53;
}
},
function (M) {
var S = SGA.delve, G = WORLDS.delve.g;
if (!G || SGA_FX.drops.length > 30)
return;
var g = new THREE.Group(), x = M.g.position.x, z = M.g.position.z;
if (sgaDlvBlocked(x, z)) {
x = Math.max(-1.5, Math.min(1.5, x));
}
var leather = sgaMat(0x6A4A2A, { r: 0.8 }), gold = sgaMat(0xD8B048, { m: 0.9, r: 0.3, e: 0x3A2A08, ei: 0.6 });
var bag = wSph(0.22, leather, 0, 0.2, 0, g, 10);
bag.scale.set(1, 1.15, 1);
wCyl(0.07, 0.12, 0.12, leather, 0, 0.44, 0, g, 8);
for (var i = 0; i < 6; i++) {
var a = i * 1.05;
var c = wCyl(0.06, 0.06, 0.02, gold, Math.cos(a) * (0.3 + 0.05 * (i % 2)), 0.02 + (i % 3) * 0.02, Math.sin(a) * 0.3, g, 10);
c.rotation.x = (i % 2) * 0.3;
}
var ore = sgaMat(0x7A7E86, { r: 0.6, m: 0.4 });
wBox(0.18, 0.14, 0.16, ore, -0.32, 0.07, 0.18, g);
wBox(0.12, 0.1, 0.14, ore, -0.22, 0.05, 0.34, g);
try {
var gl = wGlow(0xFFD890, 1.6, 0.32);
gl.position.y = 0.35;
g.add(gl);
}
catch (e) { }
var gy = 0;
try {
gy = WORLDS.delve.ground(x, z) || 0;
}
catch (e) { }
if (M.boss)
g.scale.setScalar(1.8);
g.position.set(x, gy, z);
G.add(g);
SGA_FX.drops.push({ g: g, x: x, z: z, key: M.key || "", K: M.K, d: S.d, t: 0, M: M });
},
function (D) {
var S = SGA.delve, M = D.M || {}, Dg = SGA_DUNGEONS[D.d], T = Dg.tier || { lv: 6 }, lv = M.lv || T.lv, src = M.boss ? "boss" : M.champ ? "champ" : "beast";
if (typeof playTone === "function")
playTone(520, 0.12);
var nm = String(M.name || (D.K && D.K.name) || "beast").replace(/^(The|A|An) /, "");
var run = S && S.run && sgaOnline() ? S.run.id : null;
if (typeof dglTake === "function")
dglTake("saga", run, { src: src, lv: lv, kind: D.key || "beast", K: D.K, theme: D.d, where: Dg.n, at: { x: SGA_DLV.base + D.x, y: 0, z: D.z }, heal: function (n) { if (S)
S.vig = Math.min(100, S.vig + n); } }, (M.boss ? "💀 " : "👝 ") + "<b>" + esc(M.boss ? Dg.boss.n + "'s hoard" : "What the " + nm.toLowerCase() + " left") + "</b> <span style='opacity:.7;font-weight:400'>· level " + lv + "</span>");
},
function () {
sgaVmDrop();
SGA_FX.shots.forEach(function (s) { if (s.g.parent)
s.g.parent.remove(s.g); });
SGA_FX.shots = [];
SGA_FX.lines.forEach(function (L) { scene.remove(L.m); });
SGA_FX.lines = [];
SGA_FX.drops.forEach(function (D) { if (D.g.parent)
D.g.parent.remove(D.g); });
SGA_FX.drops = [];
SGA_FX.bars.forEach(function (M) { if (M.bar && M.bar.parent)
M.bar.parent.remove(M.bar); M.bar = null; });
SGA_FX.bars = [];
},
function (key, D) {
var keep = SGA.prog.spots || (SGA.prog.spots = {});
if (keep[key])
return keep[key];
if (!ATLC || typeof atlRing !== "function")
return null;
var R = atlRing(D.ring) || atlRing("plaza");
if (!R)
return null;
var a0 = (sgaSpotHash(key) % 6283) / 1000, st = typeof lcyStreets === "function" ? lcyStreets() : [], P = camera.position;
var cand = [];
for (var rr = R.S + 16; rr < R.E - 14; rr += 7) {
if (st.some(function (q) { return Math.abs(q - rr) < 9; }))
continue;
cand.push(rr);
}
if (!cand.length)
cand = [(R.S + R.E) / 2];
for (var k = 0; k < 240; k++) {
var a = a0 + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * 0.012, r = cand[k % cand.length], x = ATLC.x + Math.cos(a) * r, z = ATLC.z + Math.sin(a) * r;
if (Math.hypot(P.x - x, P.z - z) > 320)
return null;
if (!atlClearAt(r, a, 9, 4))
continue;
var bad = false;
for (var q = 0; q < 10 && !bad; q++) {
var qa = q / 10 * Math.PI * 2, qr = q ? 7 : 0;
if (typeof blockedAt === "function" && blockedAt(x + Math.cos(qa) * qr, z + Math.sin(qa) * qr, terrainY(x, z)))
bad = true;
}
if (bad)
continue;
keep[key] = { x: x, z: z, a: a };
sgaSaveSoon();
return keep[key];
}
return null;
},
function (D, up, key) {
var G = new THREE.Group(), lite = sgaLite(), seg = lite ? 10 : 20, col = D.col, solids = [];
var stone = sgaMat(0xB8B0A0, { r: 0.85 }), dark = sgaMat(0x4A4440, { r: 0.9 }), iron = sgaMat(0x2E2C2A, { m: 0.75, r: 0.45 }), wood = sgaMat(0x6A4A2E, { r: 0.9 });
var glow = sgaMat(col, { e: col, ei: 0.9, r: 0.15, m: 0.1 }), glass = sgaMat(col, { op: 0.75, e: col, ei: 0.45, r: 0.05, m: 0.2, dw: true });
function S(x, z, r, h) { solids.push({ x: x, z: z, r: r, h: h || 30 }); }
function light(x, y, z, s) { try {
var g = wGlow(col, s || 5, 0.45);
g.position.set(x, y, z);
G.add(g);
}
catch (e) { } }
var sh = D.shape;
if (sh === "spire") {
if (up) {
wCyl(5, 6, 1.2, stone, 0, 0.6, 0, G, seg);
wCyl(3.2, 4, 2.4, stone, 0, 2.4, 0, G, seg);
var c1 = wCyl(0.2, 2.4, 16, glass, 0, 11.6, 0, G, 6);
var c2 = wCone(1.4, 7, glow, 0, 22.6, 0, G, 6);
c2.rotation.y = 0.5;
[0, 1, 2, 3, 4, 5].forEach(function (i) { var a = i * Math.PI / 3, s = wCone(0.7, 5 + ((i * 7) % 3), glass, Math.cos(a) * 2.4, 5.5, Math.sin(a) * 2.4, G, 5); s.rotation.z = Math.cos(a) * 0.35; s.rotation.x = -Math.sin(a) * 0.35; });
light(0, 20, 0, 9);
light(0, 8, 0, 6);
S(0, 0, 5.6);
}
else {
var crater = new THREE.Mesh(new THREE.RingGeometry(3, 9, seg * 2), sgaMat(0x2A2420, { r: 1, side: true }));
crater.rotation.x = -Math.PI / 2;
crater.position.y = 0.05;
G.add(crater);
var pit = new THREE.Mesh(new THREE.CircleGeometry(3, seg), sgaMat(0x14100C, { r: 1 }));
pit.rotation.x = -Math.PI / 2;
pit.position.y = 0.04;
G.add(pit);
for (var i = 0; i < (lite ? 8 : 18); i++) {
var a = i * 2.4, r = 3 + (i * 37 % 60) / 10, s = wCone(0.25, 0.6 + (i % 4) * 0.3, glass, Math.cos(a) * r, 0.3, Math.sin(a) * r, G, 4);
s.rotation.z = (i % 5 - 2) * 0.3;
}
light(0, 1, 0, 6);
S(0, 0, 3);
}
}
else if (sh === "arch") {
if (up) {
[-7, 7].forEach(function (x) { wBox(2.6, 10, 2.6, stone, x, 5, 0, G); wBox(3.2, 0.8, 3.2, stone, x, 0.4, 0, G); S(x, 0, 1.8, 12); });
var arc = new THREE.Mesh(new THREE.TorusGeometry(7, 1.1, lite ? 6 : 12, seg * 2, Math.PI), stone);
arc.position.y = 10;
G.add(arc);
var arc2 = new THREE.Mesh(new THREE.TorusGeometry(7, 0.35, 6, seg * 2, Math.PI), glow);
arc2.position.set(0, 10, 1.15);
G.add(arc2);
light(0, 17, 0, 8);
}
else {
[-7, 7].forEach(function (x, i) { wBox(2.6, 4 + i * 2, 2.6, stone, x, (4 + i * 2) / 2, 0, G); S(x, 0, 1.8, 8); });
for (var t = 0; t < 5; t++) {
var b = wBox(0.4, 0.4, 6, wood, -3 + t * 1.5, 0.3 + t * 0.05, 1, G);
b.rotation.y = t * 0.4;
b.rotation.z = 0.1 * t;
}
}
}
else if (sh === "lanterns") {
for (var n = 0; n < 7; n++) {
var x = (n - 3) * 5;
wCyl(0.14, 0.2, 6, iron, x, 3, 0, G, 8);
wBox(0.6, 0.25, 0.6, iron, x, 0.12, 0, G);
wBox(1.4, 0.12, 0.12, iron, x + 0.6, 6, 0, G);
S(x, 0, 0.4, 7);
if (up) {
wBox(0.5, 0.7, 0.5, glass, x + 1.2, 5.4, 0, G);
wCone(0.45, 0.4, iron, x + 1.2, 5.95, 0, G, 4);
light(x + 1.2, 5.4, 0, 3.4);
}
}
}
else if (sh === "clock") {
if (up) {
wBox(6, 22, 6, stone, 0, 11, 0, G);
wBox(7, 1, 7, dark, 0, 22.5, 0, G);
var roof = wCone(5.2, 6, dark, 0, 26, 0, G, 4);
roof.rotation.y = Math.PI / 4;
var face = wTex(256, 256, function (x, W, H) {
x.fillStyle = "#F2EAD8";
x.beginPath();
x.arc(W / 2, H / 2, W / 2 - 6, 0, 7);
x.fill();
x.strokeStyle = "#2A2420";
x.lineWidth = 8;
x.stroke();
x.fillStyle = "#2A2420";
for (var i = 0; i < 12; i++) {
var a = i / 12 * Math.PI * 2;
x.fillRect(W / 2 + Math.cos(a) * (W / 2 - 26) - 4, H / 2 + Math.sin(a) * (H / 2 - 26) - 4, 8, 8);
}
x.lineWidth = 7;
x.beginPath();
x.moveTo(W / 2, H / 2);
x.lineTo(W / 2, H * 0.22);
x.moveTo(W / 2, H / 2);
x.lineTo(W * 0.7, H / 2);
x.stroke();
});
var fm = sgaMat(0xFFFFFF, { map: face, e: 0x3A3020, ei: 0.4 });
[0, 1, 2, 3].forEach(function (i) { var p = new THREE.Mesh(new THREE.CircleGeometry(2.4, seg * 2), fm); var a = i * Math.PI / 2; p.position.set(Math.sin(a) * 3.02, 17, Math.cos(a) * 3.02); p.rotation.y = a; G.add(p); });
S(0, 0, 4.4);
light(0, 17, 3.4, 4);
}
else {
[[-3, -3], [3, -3], [-3, 3], [3, 3]].forEach(function (p) { wBox(0.5, 18, 0.5, iron, p[0], 9, p[1], G); S(p[0], p[1], 0.5); });
[6, 12, 18].forEach(function (y) { wBox(6.5, 0.4, 0.4, iron, 0, y, -3, G); wBox(6.5, 0.4, 0.4, iron, 0, y, 3, G); wBox(0.4, 0.4, 6.5, iron, -3, y, 0, G); wBox(0.4, 0.4, 6.5, iron, 3, y, 0, G); });
}
}
else if (sh === "tree") {
var bark = sgaMat(0x4A3628, { r: 1 }), leaf = sgaMat(0x3E6A30, { r: 0.9 });
if (up) {
wCyl(1.4, 2.2, 9, bark, 0, 4.5, 0, G, seg);
S(0, 0, 2.4);
[[0.9, 0, 3], [-0.8, 0.6, 2.6], [0.2, -1, 2.8], [-0.4, -0.8, 3.2]].forEach(function (b, i) { var br = wCyl(0.4, 0.8, 7, bark, b[0] * 2.4, 10, b[1] * 2.4, G, lite ? 6 : 10); br.rotation.z = -b[0] * 0.6; br.rotation.x = b[1] * 0.6; });
for (var q = 0; q < (lite ? 7 : 16); q++) {
var a = q * 2.39996, r = 2 + (q % 5) * 1.4, f = wSph(3 + (q % 3) * 0.9, leaf, Math.cos(a) * r, 13 + (q % 4) * 1.6, Math.sin(a) * r, G, lite ? 7 : 12);
f.scale.y = 0.78;
}
light(0, 8, 0, 0.01);
}
else {
var st1 = wCyl(1.6, 2.2, 3.2, bark, -0.4, 1.6, 0, G, seg);
st1.rotation.z = 0.12;
var st2 = wCyl(1.1, 1.5, 2.4, sgaMat(0x1A1410, { r: 1 }), 0.9, 1.2, 0.3, G, seg);
st2.rotation.z = -0.35;
S(0, 0, 2.4, 4);
}
}
else if (sh === "tower" || sh === "belltower") {
if (up) {
var tw = wCyl(3.6, 4.2, sh === "tower" ? 18 : 16, stone, 0, sh === "tower" ? 9 : 8, 0, G, seg);
S(0, 0, 4.4);
if (sh === "tower") {
for (var c = 0; c < 10; c++) {
var a = c / 10 * Math.PI * 2;
wBox(1.2, 1.4, 0.8, stone, Math.cos(a) * 3.8, 18.7, Math.sin(a) * 3.8, G).rotation.y = -a;
}
light(0, 17, 0, 0.01);
}
else {
[[-2.4, -2.4], [2.4, -2.4], [-2.4, 2.4], [2.4, 2.4]].forEach(function (p) { wBox(0.9, 5, 0.9, stone, p[0], 18.5, p[1], G); });
wBox(6.4, 0.8, 6.4, dark, 0, 21.4, 0, G);
var rf = wCone(4.6, 4, dark, 0, 23.8, 0, G, 4);
rf.rotation.y = Math.PI / 4;
var bl = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.05, 0), new THREE.Vector2(1.5, 0.05), new THREE.Vector2(1.25, 0.6), new THREE.Vector2(0.95, 1.7), new THREE.Vector2(0.4, 2.2), new THREE.Vector2(0, 2.25)], seg), sgaMat(0xA8803A, { m: 0.85, r: 0.3 }));
bl.position.y = 17.4;
G.add(bl);
}
}
else {
if (sh === "tower") {
var s1 = wCyl(3.6, 4.2, 8, stone, 0, 4, 0, G, seg);
S(0, 0, 4.4, 8);
var s2 = wCyl(3.4, 3.6, 9, stone, 8, 2.2, 3, G, seg);
s2.rotation.z = Math.PI / 2;
s2.rotation.y = 0.4;
S(8, 3, 3, 4);
S(4, 1, 3, 4);
for (var u = 0; u < (lite ? 6 : 14); u++)
wBox(0.8 + u % 3 * 0.4, 0.6, 0.9, stone, -4 + u * 1.3, 0.3, -4 + (u * 7 % 9), G);
}
else {
wBox(4, 1.6, 4, stone, 0, 0.8, 0, G);
S(0, 0, 2.8, 2);
}
}
}
else if (sh === "mast") {
if (up) {
wCyl(0.35, 0.6, 28, wood, 0, 14, 0, G, lite ? 8 : 12);
wBox(3, 1.2, 3, stone, 0, 0.6, 0, G);
wCyl(0.15, 0.15, 10, wood, 0, 20, 0, G, 6).rotation.z = Math.PI / 2;
S(0, 0, 1.8);
[0, 1, 2].forEach(function (i) { var fl = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.4), sgaMat([0xC83A3A, 0xF2F2F2, 0x3A6AC8][i], { side: true, r: 1 })); fl.position.set(1.4, 24 + i * 1.6, 0); G.add(fl); });
light(0, 28.4, 0, 3);
}
else {
[0, 1, 2].forEach(function (i) { var sct = wCyl(0.35, 0.5, 8, wood, -4 + i * 4, 0.5, i * 0.8, G, 8); sct.rotation.z = Math.PI / 2; sct.rotation.y = 0.2 * i; S(-4 + i * 4, i * 0.8, 0.8, 1.2); });
}
}
else if (sh === "stones") {
var gs = sgaMat(0x8A8A82, { r: 0.95 });
for (var k = 0; k < 9; k++) {
var a = k / 9 * Math.PI * 2, x = Math.cos(a) * 9, z = Math.sin(a) * 9;
if (up) {
var sn = wBox(1.6, 4.6 + (k % 3) * 0.8, 1.1, gs, x, 2.3 + (k % 3) * 0.4, z, G);
sn.rotation.y = -a;
S(x, z, 1.1, 6);
}
else {
var ly = wBox(1.6, 1.0, 4.6, gs, x, 0.5, z, G);
ly.rotation.y = -a + 0.6 * (k % 2);
S(x, z, 1.6, 1.2);
}
}
if (up)
light(0, 1.2, 0, 6);
}
else if (sh === "hall") {
if (up) {
wBox(10, 0.6, 22, stone, 0, 0.3, 0, G);
[-4.6, 4.6].forEach(function (x) { wBox(0.6, 5, 22, wood, x, 3, 0, G); S(x, 0, 0.6); });
wBox(10, 5, 0.6, wood, 0, 3, -10.7, G);
[-1, 1].forEach(function (s) { var r = wBox(7, 0.4, 23, sgaMat(0x5A3020, { r: 0.9 }), s * 2.6, 7.4, 0, G); r.rotation.z = -s * 0.72; });
var moon = new THREE.Mesh(new THREE.CircleGeometry(1.4, seg), glow);
moon.position.set(0, 8, 11.05);
G.add(moon);
light(0, 8, 11.3, 4);
[[-4.6, -11], [4.6, -11], [-4.6, 11], [4.6, 11]].forEach(function (p) { S(p[0], p[1], 0.6); });
for (var zz = -9; zz <= 9; zz += 3) {
S(-4.6, zz, 0.6);
S(4.6, zz, 0.6);
}
}
else {
for (var zp = -10; zp <= 10; zp += 5) {
[-4.6, 4.6].forEach(function (x) { wBox(0.5, 5, 0.5, wood, x, 2.5, zp, G); S(x, zp, 0.4, 6); });
}
}
}
var tx = up ? D.up : D.down, pl = wSign([tx[0], D.n + " · " + sgaMonthName(key)], 3.2, 1.0, "#1A1612", "#E8D8A8");
pl.position.set(0, 1.6, (sh === "hall" ? 12.4 : sh === "stones" ? 0 : sh === "lanterns" ? 1.6 : sh === "arch" ? 2.2 : sh === "tower" && !up ? -6 : 6.2));
G.add(pl);
wBox(0.2, 1.6, 0.2, iron, pl.position.x, 0.8, pl.position.z - 0.08, G);
G.traverse(function (m) { if (m.isMesh) {
m.castShadow = !lite;
m.receiveShadow = true;
} });
return { g: G, solids: solids };
},
function (key) {
var M = SGA.mons && SGA.mons[key];
if (!M)
return;
if (M.g.parent)
M.g.parent.remove(M.g);
M.g.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); var ms = Array.isArray(m.material) ? m.material : (m.material ? [m.material] : []); ms.forEach(function (mt) { if (mt.userData && mt.userData.sgaOwn) {
if (mt.map)
mt.map.dispose();
mt.dispose();
} }); });
delete SGA.mons[key];
},
function () {
var h = "";
if (!SGA.prog.started) {
return h + "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>📜 " + esc(SGA_STORY_TITLE) + "</div><p>" + esc(SGA_STORY_INTRO) + "</p>" +
sgaBtn("begin", "📜 Begin the story") + sgaDim("A long story across the city and seven worlds, with choices that change things, a dungeon and an ending of your choosing. Your progress is kept on your account.");
}
h += "<div style='font:600 16px var(--serif,Georgia);color:#FFE7B0'>📜 " + esc(SGA_STORY_TITLE) + (sgaAllDone() ? " · complete" : "") + "</div>";
if (SGA.say)
h += sgaBox(SGA.say, "#7FB8E8");
SGA_ACTS.forEach(function (A) {
var steps = SGA_STEPS.filter(function (s) { return s.act === A.k; }), done = steps.filter(function (s) { return sgaDone(s.id); }).length, open = steps.filter(sgaOpenStep);
var reached = done > 0 || open.length > 0;
h += "<div style='margin-top:8px'><b>" + esc(A.n) + "</b> <span style='opacity:.7;font-size:12px'>" + done + " of " + steps.length + "</span></div>";
if (!reached) {
h += sgaDim("Not yet.");
return;
}
steps.forEach(function (s) {
if (sgaDone(s.id)) {
var ch = s.kind === "choice" ? (s.opts.filter(function (o) { return o.k === SGA.prog.choice[s.id]; })[0] || {}).n : "";
h += "<div style='font-size:12.5px;color:#9AD08A;margin:2px 0'>✓ " + esc(s.title) + (ch ? ": " + esc(ch) : "") + "</div>";
return;
}
if (!sgaOpenStep(s))
return;
var inner = "<b>" + esc(s.title) + "</b><div style='font-size:12.5px;margin:3px 0'>" + esc(s.goal) + "</div>";
if (s.kind === "talk") {
inner += sgaDim(sgaStepWhere(s) + " · look for the soft gold light over them, walk up and press E (or tap)") + sgaBtn("way", "🧭 " + (sgaWhere(s).world ? "Take me there" : "Show me the way"), " data-s='" + s.id + "'");
}
else if (s.kind === "choice") {
inner += "<div style='margin:4px 0'>" + esc(s.q) + "</div>" + s.opts.map(function (o) { return sgaBtn("choose", esc(o.n), " data-s='" + s.id + "' data-k='" + o.k + "'"); }).join("");
}
else if (s.kind === "delve") {
inner += sgaDim("Best with 4 to 8 dreamers; the boss grows with the group.") + sgaBtn("tab", "⚔️ Dungeons", " data-t='dungeons'");
}
h += sgaBox(inner, "#C9A85A");
});
});
if (sgaAllDone())
h += sgaBox("🔔 The Somnus Bell rings again. You are <b>" + SGA_TITLE_DONE + "</b>.", "#F2D27A");
return h;
},
function () {
var h = "<div style='font:600 15px var(--serif,Georgia);color:#FFE7B0'>Side quests</div>";
var open = sgaSideOpen(), done = Object.keys(SGA.prog.side).map(function (k) { return SGA.prog.side[k]; }).filter(function (q) { return q.st === "done"; });
if (open.length)
open.forEach(function (q) { h += sgaBox("<b>" + esc(q.what) + "</b>" + sgaDim("At " + esc(q.place) + " · asked by " + esc(q.giver) + " · " + (q.st === "go" ? "go there" : "see it through: done when it is over, or when you help")) + sgaBtn("sway", "🧭 Show me the way", " data-p='" + esc(q.place) + "'")); });
else
h += sgaDim("None just now. Any townsperson may ask you to look into trouble in the city (📜 Take this on, in the talk box), or take one from the list below.");
var t = sgaTrouble().filter(function (r) { return !SGA.prog.side[r.id]; });
h += "<div style='margin-top:10px'><b>📰 Trouble in town</b> " + sgaDim("From the Chronicle Press: what is really happening in Somnucor now.") + "</div>";
if (t.length)
t.slice(0, 8).forEach(function (r) { h += "<div style='display:flex;align-items:center;gap:6px;padding:4px 0;border-top:1px solid #2A2418'><span style='flex:1;font-size:12.5px'>" + esc(String(r.what || "Trouble")) + " <span style='opacity:.7'>at " + esc(String(r.place || "")) + "</span></span>" + sgaBtn("take", "Take it on", " data-i='" + esc(String(r.id)) + "'") + "</div>"; });
else
h += sgaDim(typeof INCD === "undefined" || !INCD.at ? "Open the city once for the news to come in." : "All quiet in the city for now.");
if (done.length)
h += "<div style='margin-top:10px'><b>Done</b></div>" + done.slice(-10).reverse().map(function (q) { return "<div style='font-size:12px;color:#9AD08A'>✓ " + esc(q.what) + " <span style='opacity:.7'>at " + esc(q.place) + "</span></div>"; }).join("");
return h;
},
function () {
var h = "<div style='font:600 15px var(--serif,Georgia);color:#FFE7B0'>Your standing</div>" + sgaDim("Their people greet you, talk to you and treat you by it. Deeds move it: the story, choices, side quests, dungeons, helping at trouble, and talking with their people (once a day). Crimes bring it down.");
if (sgaKeeper())
h += sgaDim("You are the Keeper: everyone knows you, above any faction.");
SGA_FACTIONS.forEach(function (f) {
var v = sgaStanding(f.k), L = sgaLevel(v), pct = (v + 100) / 2;
h += "<div style='margin:7px 0'><div style='display:flex;justify-content:space-between'><span>" + f.icon + " <b>" + esc(f.n) + "</b></span><span style='color:" + L.col + "'>" + L.n + " (" + v + ")</span></div>" +
"<div style='height:7px;border-radius:4px;background:#232838;overflow:hidden;margin-top:3px;position:relative'><div style='position:absolute;left:50%;top:0;bottom:0;width:1px;background:#556'></div><div style='height:100%;width:" + pct.toFixed(1) + "%;background:" + f.col + "'></div></div>" + sgaDim(esc(f.what)) + "</div>";
});
var R = SGA.rum[sgaRingNow() || "world"] || SGA.rum.world || null;
h += "<div style='margin-top:10px'><b>💬 What the town says of you</b></div>";
if (R && (R.you || []).length)
h += R.you.slice(0, 6).map(function (x) { return "<div style='font-size:12.5px;opacity:.9'>“" + esc(x.line) + "”</div>"; }).join("");
else
h += sgaDim("Nothing yet, or it hasn't reached this part of town. Word travels: at once where it happened, a ring away after an hour, everywhere after three.");
if (R && (R.town || []).length)
h += "<div style='margin-top:8px'><b>💬 Talk going round</b></div>" + R.town.slice(0, 6).map(function (x) { return "<div style='font-size:12.5px;opacity:.85'>“" + esc(x.line) + "”</div>"; }).join("");
return h;
},
function () {
var h = "<div style='font:600 15px var(--serif,Georgia);color:#FFE7B0'>Companions</div>" + sgaDim("One at a time. Hire one for a week (grown-up dues-payers), or befriend one: they stand outside their usual place in the city; talk with them on three different days. They walk with you in the city and every world, talk with you, remember your trips together, and help in the dungeons.");
var A = sgaCompActive(), S = sgaCompServer();
if (SGA.say)
h += sgaBox(SGA.say, "#7FB8E8");
if (A)
h += sgaBox(A.icon + " <b>" + esc(A.name) + "</b> is with you" + (S && S.comp === A.k && S.how === "hired" ? " (hired until " + new Date(S.until).toLocaleDateString() + ")" : " (a friend)") + "<br>" + sgaBtn("ctalk", "💬 Talk") + sgaBtn("chome", "Send home"), "#9AD08A");
SGA_COMPANIONS.forEach(function (C) {
var may = sgaCompMay(C.k), f = ((S && S.friends) || SGA.prog.friends || {})[C.k] || 0, trips = (SGA.prog.trips || []).filter(function (t) { return t.c === C.k; }).length;
var inner = C.icon + " <b>" + esc(C.name) + "</b> <span style='opacity:.75;font-size:12px'>" + C.age + " · " + esc(SGA_ROLE[C.role]) + "</span>" + sgaDim(esc(C.persona.charAt(0).toUpperCase() + C.persona.slice(1)));
inner += sgaDim("Usually outside " + esc(C.meet) + (f && f < 3 ? " · met " + f + " of 3 days" : "") + (trips ? " · " + trips + " trip" + (trips === 1 ? "" : "s") + " together" : ""));
if (A && A.k === C.k) { }
else if (may)
inner += sgaBtn("bring", "Bring along", " data-c='" + C.k + "'");
else
inner += sgaBtn("hire", "Hire for a week: " + C.hire + " gold", " data-c='" + C.k + "'") + sgaBtn("meet", "🧭 Where to meet", " data-p='" + esc(C.meet) + "'");
h += sgaBox(inner);
});
return h;
},
function () {
var h = "<div style='font:600 15px var(--serif,Georgia);color:#FFE7B0'>Dungeons</div>" + sgaDim("Four dungeons, from a beginner's to a very hard one: start at the top. Go alone or with up to 8 (the boss grows with the group). Open a run and others can join it from here, or join one. Every beast you beat leaves loot by its kind and level, champions and bosses better. Every time the boss falls, everyone who fought takes a keepsake. The boss's gold for a group comes once a week a dungeon (the week turns " + new Date(sgaWeekEnds()).toLocaleString() + "). The beasts never hurt anyone under 18.");
if (SGA.say)
h += sgaBox(SGA.say, "#7FB8E8");
var locks = (SGA.me && SGA.me.locks) || [], runs = SGA.runs || {};
SGA_DKEYS.forEach(function (k) {
var D = SGA_DUNGEONS[k], locked = locks.indexOf(k) >= 0, list = runs[k] || [];
var T = D.tier || {}, tag = T.n ? " <span style='font-size:11.5px;border:1px solid " + T.col + ";color:" + T.col + ";border-radius:9px;padding:1px 7px;margin-left:4px'>" + esc(T.n) + " · level " + T.lv + "</span>" : "";
var inner = D.icon + " <b>" + esc(D.n) + "</b>" + tag + sgaDim(esc(D.sub) + " Boss: " + esc(D.boss.n) + "." + (T.ch ? " " + T.ch + " chambers" + (T.side ? " and " + T.side + " side room" + (T.side > 1 ? "s" : "") : "") + (T.champ ? ", with champions" : "") + "." : "")) + (locked ? sgaDim("✓ You have had this week's boss gold here; keepsakes and loot still come every time.") : "");
list.forEach(function (r) {
inner += "<div style='display:flex;align-items:center;gap:6px;font-size:12.5px;border-top:1px solid #2A2418;padding:3px 0'><span style='flex:1'>" + esc(r.leader_name || "A dreamer") + "'s run · " + (r.members || []).length + " of 8" + (r.state === "won" ? " · beaten" : "") + (r.mine ? " · <b>yours</b>" : "") + "</span>" +
(r.state === "won" ? "" : sgaBtn(r.mine ? "goin" : "join", r.mine ? "Go in" : "Join", " data-r='" + r.id + "' data-d='" + k + "'")) + "</div>";
});
inner += sgaBtn("open", "⚔️ Open a new run", " data-d='" + k + "'");
h += sgaBox(inner);
});
var loot = (SGA.me && SGA.me.loot) || [];
if (loot.length)
h += "<div style='margin-top:8px'><b>Your keepsakes</b></div>" + loot.slice(0, 30).map(function (L) { return "<div style='font-size:12.5px'>" + esc(L.icon || "") + " " + esc(L.name) + " <span style='opacity:.7'>" + esc(sgaLootFrom(L.dungeon)) + "</span></div>"; }).join("");
return h;
},
function () {
var S = sgaSeasonNow(), D = S && SGA_SEASONS[S.key];
var h = "<div style='font:600 15px var(--serif,Georgia);color:#FFE7B0'>The season</div>";
if (!SGA.me)
return h + sgaDim(sgaOnline() ? "Asking the city…" : "Sign in to see the season: it is kept by the city's server.");
if (SGA.me.seasons_on === false)
return h + sgaDim("The Keeper has the seasons resting for now.");
if (!D)
return h + sgaDim("No season is written for this month yet.");
var ch = sgaChapter(), f = S.goal ? Math.min(1, (S.points || 0) / S.goal) : 0;
h += "<div style='font-size:16px'>" + D.icon + " <b>" + esc(D.n) + "</b> <span style='opacity:.7;font-size:12px'>" + esc(sgaMonthName(S.key)) + "</span></div>";
D.ch.forEach(function (t, i) { if (i > ch)
return; h += "<div style='font-size:12.5px;margin:3px 0;" + (i === ch ? "" : "opacity:.7") + "'><b>Chapter " + (i + 1) + ".</b> " + esc(t) + "</div>"; });
h += "<div style='margin-top:8px'>The city's tally: <b>" + (S.points || 0).toLocaleString() + "</b> of " + (S.goal || 0).toLocaleString() + "</div>" + lvlBar0(f);
if (S.state === "raised")
h += sgaBox("🎉 Raised! <b>" + esc(D.up[0]) + "</b>: " + esc(D.up[1]) + " It stands in " + esc((atlRing(D.ring) || { name: "the city" }).name) + " for good.", "#9AD08A");
else if (S.state === "fallen")
h += sgaBox("The month ran out. <b>" + esc(D.down[0]) + "</b>: " + esc(D.down[1]), "#E0A060");
else
h += sgaDim("Every deed by any dreamer adds to it: story steps, side quests, dungeon wins, helping at trouble. Reach it by the month's end and <b>" + esc(D.up[0]) + "</b> rises in " + esc((atlRing(D.ring) || { name: "the city" }).name) + " for good; miss it and " + esc(D.down[0].replace(/^The /, "the ")) + " is what stays.");
var past = sgaLandmarks().filter(function (L) { return L.key !== S.key; });
if (past.length)
h += "<div style='margin-top:10px'><b>What the seasons left</b></div>" + past.map(function (L) { var t = L.up ? L.D.up : L.D.down; return "<div style='font-size:12.5px'>" + L.D.icon + " " + esc(t[0]) + " <span style='opacity:.7'>(" + esc(L.D.n) + ", " + esc(sgaMonthName(L.key)) + ", " + esc((atlRing(L.D.ring) || { name: "" }).name) + ")</span></div>"; }).join("");
return h;
},
function () {
var h = "<div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:6px'><b style='font:600 17px var(--serif,Georgia);color:#F2D27A'>Story and quests</b><span data-sg='x' role='button' tabindex='0' aria-label='Close' style='cursor:pointer;font-size:18px;opacity:.75'>✕</span></div>";
h += "<div style='display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px'>" + SGA_TABS.map(function (t) { return "<button class='btn' data-sg='tab' data-t='" + t[0] + "' style='font-size:12px;padding:4px 8px;" + (SGA.tab === t[0] ? "border-color:#F2D27A;color:#F2D27A" : "") + "'>" + t[1] + "</button>"; }).join("") + "</div>";
if (!sgaOnline())
h += sgaDim("Signed out: your story is kept on this device only, and the shared parts (gossip, dungeons with others, the season) need you signed in.");
else if (SGA.off)
h += sgaDim("The city's server doesn't have this yet: your story is kept on this device until it does.");
var T = { lines: function () { return typeof sgaTabLines === "function" ? sgaTabLines() : ""; }, story: sgaTabStory, quests: sgaTabQuests, standing: sgaTabStanding, comp: sgaTabComp, dungeons: sgaTabDungeons, season: sgaTabSeason }[SGA.tab] || sgaTabStory;
return h + T();
},
function (e) {
var t = e.target.closest && e.target.closest("[data-sg]");
if (!t)
return;
var a = t.getAttribute("data-sg");
if (a === "x") {
SGA.open = false;
sgaPaint();
return;
}
if (a === "tab") {
SGA.tab = t.getAttribute("data-t");
SGA.say = "";
sgaPaint();
if (SGA.tab === "dungeons")
sgaRunsLoad();
if (SGA.tab === "standing")
sgaRumours();
return;
}
if (a === "begin") {
sgaStart();
sgaPaint();
return;
}
if (a === "way") {
var s = sgaStep(t.getAttribute("data-s"));
if (s) {
if (!sgaWhere(s).world) {
SGA.open = false;
sgaPaint();
}
sgaShowWay(s);
}
return;
}
if (a === "choose") {
sgaChoose(t.getAttribute("data-s"), t.getAttribute("data-k"));
return;
}
if (a === "sway" || a === "meet") {
SGA.open = false;
sgaPaint();
if (typeof showTheWay === "function")
showTheWay(t.getAttribute("data-p"));
return;
}
if (a === "take") {
var id = t.getAttribute("data-i"), r = sgaTrouble().filter(function (x) { return String(x.id) === id; })[0];
if (r) {
SGA.open = false;
sgaTakeSide(r, "The Chronicle Press");
sgaPaint();
}
return;
}
if (a === "ctalk") {
SGA.open = false;
sgaPaint();
sgaCompTalk();
return;
}
if (a === "chome") {
sgaCompHome();
return;
}
if (a === "bring") {
sgaCompBring(t.getAttribute("data-c"));
return;
}
if (a === "hire") {
sgaCompHire(t.getAttribute("data-c"));
return;
}
if (a === "open") {
sgaDelveGo(t.getAttribute("data-d"));
return;
}
if (a === "join") {
sgaDelveGo(t.getAttribute("data-d"), +t.getAttribute("data-r"));
return;
}
if (a === "goin") {
sgaDelveGo(t.getAttribute("data-d"), +t.getAttribute("data-r"));
return;
}
},
function (kind, ref) {
var D = sgaDaily();
if (D.local || D.claimed || D.on === false || SGA.dailyBusy)
return;
if (kind && !sgaErrandFits(D.errand, kind, ref))
return;
if (!sgaOnline() || SGA.off)
return;
SGA.dailyBusy = true;
var before = JSON.parse(JSON.stringify(SGA.st || {}));
cityRpc("saga_daily_claim", {}).then(function (o) {
SGA.dailyBusy = false;
if (o && o.daily && SGA.me)
SGA.me.daily = o.daily;
if (!o || !o.ok || o.again) {
try {
sgaPaint();
}
catch (e) { }
return;
}
if (o.standing) {
SGA.st = o.standing;
SGA.prog.ls = SGA.st;
sgaLocalWrite();
sgaStandingSay(before);
}
if (o.season && SGA.me)
SGA.me.season = o.season;
var n = (o.daily && o.daily.streak) || 1, S = SGA_ERRAND_SAY[D.errand] || ["🔔", ""];
sgaToast("🔔 The Bell's errand is done (" + S[1].toLowerCase() + ")" + (n > 1 ? " · " + n + " days in a row" : "") + (o.gold > 0 ? " · +" + o.gold + " gold" : ""));
try {
sgaPaint();
}
catch (e) { }
}).catch(function () { SGA.dailyBusy = false; });
},
function () {
var D = sgaDaily();
if (D.local || D.on === false)
return;
if (D.done && !D.claimed) {
sgaDailyTry(null);
return;
}
var k = "somnu.saga.daily", seen = "";
try {
seen = localStorage.getItem(k) || "";
}
catch (e) { }
if (seen === D.day || D.claimed)
return;
try {
localStorage.setItem(k, D.day);
}
catch (e) { }
var S = SGA_ERRAND_SAY[D.errand] || ["🔔", ""];
sgaToast("🔔 Today's errand from the Bell: " + S[1] + (D.streak > 0 ? " · keep your " + D.streak + "-day streak" : "") + " (📜 Story and quests)");
},
function () {
var D = sgaDaily(), S = SGA_ERRAND_SAY[D.errand] || ["🔔", D.errand, ""];
if (D.on === false)
return "";
var h = "<div style='display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap'><b>🔔 Today's errand: " + S[0] + " " + esc(S[1]) + "</b>" +
"<span style='font-size:12px;opacity:.8'>" + (D.claimed ? "✓ done today" : "until midnight UTC") + "</span></div>";
if (!D.claimed)
h += sgaDim(esc(S[2]));
if (D.local)
h += sgaDim("Sign in to keep a streak and earn its reward.");
else {
var n = +D.streak || 0, next = D.claimed ? n : n + 1, to7 = 7 - (next % 7 || 7);
h += sgaDim((n > 0 ? "🔥 " + n + " day" + (n === 1 ? "" : "s") + " in a row. " : "") +
(D.claimed ? "Come back tomorrow to keep it going." :
(D.gold > 0 ? "Doing it today: +" + D.gold + " gold" + (next % 7 === 0 ? " (the 7th day: five times the gold)" : " · on the 7th day in a row, five times as much") + "." :
"Doing it today raises your standing" + (sgaAdult() && sgaPaid() ? "." : "; gold is for grown-up dreamers who pay their dues.")) +
(to7 > 0 && !D.claimed && next % 7 !== 0 ? " " + to7 + " more day" + (to7 === 1 ? "" : "s") + " to the 7th." : "")));
}
return sgaBox(h, D.claimed ? "#7FBF6A" : "#F2D27A");
},
function (s) {
var w = s.where || {};
if (w.sea)
return WLD.on === "sea" && typeof SEA_BY !== "undefined" && !!SEA_BY[w.sea];
if (w.tale)
return WLD.on === "ctale" && typeof CTS !== "undefined" && CTS.T && CTS.T.id === w.tale && !!CTS.places[w.ch || 0];
if (w.world)
return WLD.on === w.world;
if (w.city)
return !WLD.on && typeof inCityNow === "function" && inCityNow();
return false;
},
function (s) {
var w = s.where || {};
try {
if (w.sea) {
var p = SEA_BY[w.sea], a = Math.atan2(p.land.x - p.dock.x, p.land.z - p.dock.z), side = ((s.i % 3) - 1) * 3;
var lx = p.land.x + Math.sin(a) * 7 + Math.cos(a) * side, lz = p.land.z + Math.cos(a) * 7 - Math.sin(a) * side, y = typeof seaHeight === "function" ? seaHeight(lx, lz) : 0;
if (!(y > -0.5)) {
lx = p.land.x;
lz = p.land.z;
y = Math.max(0, seaHeight(lx, lz));
}
var v = new THREE.Vector3(SEA.base + lx, y, lz);
WLD.w.g.worldToLocal(v);
return { x: v.x, y: v.y, z: v.z, face: a + Math.PI };
}
if (w.tale) {
var P = CTS.places[w.ch || 0], f = P.face || 0;
for (var k = 0; k < 8; k++) {
var r = 10 + k * 1.5, aa = f + (k % 2 ? 0.5 : -0.5) * (k >> 1), x = P.x + Math.sin(aa) * r, z = P.z + Math.cos(aa) * r;
if (typeof ctsBlock === "function" && ctsBlock(x, z, ctsGround(x, z) + 0.5))
continue;
return { x: x, y: ctsGround(x, z), z: z, face: Math.atan2(P.x - x, P.z - z) + Math.PI, parent: CTS.root };
}
return { x: P.x + 6, y: ctsGround(P.x + 6, P.z), z: P.z, face: 0, parent: CTS.root };
}
if (w.world) {
var W = WLD.w, A = WLD.arrive;
if (!W || !A)
return null;
var h = 0;
for (var c = 0; c < s.line.length; c++)
h = (h * 31 + s.line.charCodeAt(c)) | 0;
for (var j = 0; j < 12; j++) {
var an = (Math.abs(h) % 628) / 100 + j * 0.52, rr = 10 + (j % 3) * 2, X = A.x + Math.sin(an) * rr, Z = A.z - Math.cos(an) * rr, Y = W.ground ? W.ground(X, Z, 0) : 0;
if (Y == null || !isFinite(Y))
continue;
var bad = false;
try {
bad = !!(W.block && W.block(X, Z, Y)) || !!(W.solids && worldSolidAt(W.solids, X, Z, Y));
}
catch (e) { }
if (!bad)
return { x: X, y: +Y, z: Z, face: Math.atan2(A.x - X, A.z - Z) };
}
return null;
}
if (w.city)
return sgaSpotCity(w.city);
}
catch (e) { }
return null;
},
function (s) {
var P = qlnP(s.line);
if (P.done[s.id])
return;
P.done[s.id] = Date.now();
sgaSaveSoon();
qlnRpc(s.line, s.id, s.title);
var L = QLN.by[s.line], nx = qlnNext(L);
if (!nx) {
qlnFinish(L);
return;
}
sgaToast(L.icon + " " + s.title + ": done");
if (nx.kind === "choice") {
QLN.open[L.k] = 1;
SGA.tab = "lines";
sgaOpen("lines");
}
},
function (L) {
var P = qlnP(L.k);
if (P.end)
return;
P.end = Date.now();
sgaSaveSoon();
var f = qlnFavour(L), n = qlnWise(L);
SGA.say = "";
QLN.say = L.k;
sgaToast(L.icon + " " + L.title + ": finished. You are " + L.end.title + ".");
qlnRpc(L.k, "finale", L.title).then(function (o) {
if (o && o.ok && !o.again) {
var bits = [];
if (o.keep)
bits.push((o.keep[1] || "") + " " + o.keep[0]);
if (o.gold > 0)
bits.push("+" + o.gold + " gold");
if (bits.length)
sgaToast("🎁 " + bits.join(" · "));
sgaLoad(true);
}
});
QLN.open[L.k] = 1;
sgaOpen("lines");
},
function (line, step, note) {
if (!sgaOnline() || SGA.off || QLN.noServer)
return Promise.resolve(null);
var before = JSON.parse(JSON.stringify(SGA.st || {}));
return cityRpc("saga_quest", { p_line: line, p_step: step, p_ring: sgaRingNow(), p_note: String(note || "").slice(0, 120) }).then(function (o) {
if (o && o.ok && o.standing) {
SGA.st = o.standing;
SGA.prog.ls = SGA.st;
sgaLocalWrite();
sgaStandingSay(before);
}
if (o && o.season && SGA.me)
SGA.me.season = o.season;
return o;
}).catch(function (e) { if (/saga_quest|function|schema cache|does not exist|404/i.test(String(e && e.message)))
QLN.noServer = true; return null; });
},
function (s) {
var w = s.where || {}, who = s.who || { name: "" };
SGA.open = false;
sgaPaint();
if (w.city) {
if (typeof showTheWay === "function")
showTheWay(w.city);
return;
}
if (w.sea) {
var p = SEA_BY[w.sea];
if (WLD.on !== "sea") {
var ok = worldGo("sea", {});
if (ok === false || WLD.on !== "sea")
return;
}
try {
seaAshore(p);
}
catch (e) { }
setStatus(QLN.by[s.line].icon + " <b>" + esc(p.name) + "</b>: " + esc(who.name) + " waits just up from the landing, under a soft gold light.");
return;
}
if (w.tale) {
if (!(WLD.on === "ctale" && CTS.T && CTS.T.id === w.tale)) {
if (typeof ctsEnter !== "function")
return;
ctsEnter(w.tale);
}
if (WLD.on !== "ctale")
return;
try {
var P = CTS.places[w.ch || 0], f = P.face || 0, v = new THREE.Vector3(P.x + Math.sin(f) * 18, 0, P.z + Math.cos(f) * 18);
v.y = ctsGround(v.x, v.z) + 1.72;
CTS.root.localToWorld(v);
camera.position.copy(v);
yaw = f;
pitch = -0.05;
}
catch (e) { }
setStatus(QLN.by[s.line].icon + " <b>" + esc((CTS.W && CTS.W.ch[w.ch || 0] || [""])[0]) + "</b>: look for the soft gold light over " + esc(who.name) + ".");
return;
}
if (w.world) {
if (WLD.on !== w.world) {
var r = worldGo(w.world, {});
if (r === false)
return;
}
setStatus(QLN.by[s.line].icon + " Look for the soft gold light over " + esc(who.name) + ", near where you came in.");
}
},
function (s) {
var w = s.where || {};
if (w.sea)
return "📍 " + ((typeof SEA_BY !== "undefined" && SEA_BY[w.sea]) ? SEA_BY[w.sea].name : w.sea) + ", in the Endless Sea";
if (w.tale) {
var W = typeof CT_W !== "undefined" && CT_W[w.tale], T = typeof CT_BY_ID !== "undefined" && CT_BY_ID[w.tale];
return "📍 " + (T ? T.t : w.tale) + (W && W.ch[w.ch || 0] ? ", at \"" + W.ch[w.ch || 0][0] + "\"" : "");
}
if (w.world)
return "📍 " + (w.n || w.world);
if (w.city)
return "📍 " + w.city + ", Somnucor";
return "";
},
function (stepId) {
var s = QLN.step[stepId];
if (!s)
return "";
var L = QLN.by[s.line], nx = L.steps[s.i + 1];
var t = "This is a quest from " + L.src + ". " + L.bg + " Stay in your own tale and your own time; you know nothing of Somnucor's factions or gossip. " +
"Tell it for all ages: brave and vivid, never gory. The dreamer you are talking to is playing the part of " + L.hero + ". ";
if (s.tell)
t += "What you tell them, in your own words, as it comes up: " + s.tell + " ";
if (nx)
t += "Before the talk ends, tell them where to go next: " + (nx.hint || nx.goal) + " ";
else
t += "This is the end of the tale: thank them warmly and tell them what it meant. ";
var P = qlnP(L.k), ch = L.steps.filter(function (x) { return x.kind === "choice" && P.choice[x.id]; }).map(function (x) { var o = x.opts.filter(function (q) { return q.k === P.choice[x.id]; })[0]; return o ? x.title + ": " + o.n : ""; }).filter(Boolean);
if (ch.length)
t += "What they chose earlier on this journey (you may have heard of it): " + ch.join(" / ") + ". ";
return t;
},
function () {
var h = "<div style='font:600 16px var(--serif,Georgia);color:#FFE7B0'>🗺️ Journeys</div>" + sgaDim("Great tales to play through, each where it happens, as long as you like. Talk with the people you meet; some choices change how it ends.");
if (QLN.noServer && sgaOnline())
h += sgaDim("The city's server doesn't have these yet: your progress is kept on this device and in your story until it does.");
QLN.lines.forEach(function (L) {
if (qlnOff(L.k)) {
h += sgaBox("<b>" + L.icon + " " + esc(L.title) + "</b>" + sgaDim("The Keeper has this journey resting for now."), "rgba(201,168,104,.25)");
return;
}
var P = qlnP(L.k), done = L.steps.filter(function (s) { return P.done[s.id]; }).length, open = !!QLN.open[L.k];
var inner = "<div style='display:flex;justify-content:space-between;gap:6px;flex-wrap:wrap'><b>" + L.icon + " " + esc(L.title) + "</b><span style='font-size:12px;opacity:.75'>" +
(qlnFinished(L) ? "✓ finished" : P.started ? done + " of " + L.steps.length : "not begun") + "</span></div>" + sgaDim(esc(L.short));
if (!P.started) {
inner += "<div style='font-size:12.5px;margin:4px 0'>" + esc(L.intro) + "</div>" + sgaBtn("qbegin", L.icon + " Begin this journey", " data-l='" + L.k + "'") + sgaDim("From " + esc(L.src) + ".");
}
else if (!open)
inner += sgaBtn("qopen", "Open", " data-l='" + L.k + "'");
else {
L.acts.forEach(function (A) {
var steps = L.steps.filter(function (s) { return s.act === A.k; }), d = steps.filter(function (s) { return P.done[s.id]; }).length, nx = qlnNext(L);
if (!d && !(nx && nx.act === A.k)) {
inner += "<div style='margin-top:6px;opacity:.6;font-size:12.5px'>" + esc(A.n) + "</div>";
return;
}
inner += "<div style='margin-top:6px'><b style='font-size:13px'>" + esc(A.n) + "</b> <span style='opacity:.7;font-size:12px'>" + d + " of " + steps.length + "</span></div>";
steps.forEach(function (s) {
if (P.done[s.id]) {
var ch = s.kind === "choice" ? ((s.opts.filter(function (o) { return o.k === P.choice[s.id]; })[0] || {}).n || "") : "";
inner += "<div style='font-size:12.5px;color:#9AD08A;margin:2px 0'>✓ " + esc(s.title) + (ch ? ": " + esc(ch) : "") + "</div>";
return;
}
if (nx !== s)
return;
var b = "<b>" + esc(s.title) + "</b><div style='font-size:12.5px;margin:3px 0'>" + esc(s.goal) + "</div>";
if (s.kind === "talk")
b += sgaDim(qlnWhereText(s) + " · look for the soft gold light over " + esc(s.who.name) + ", walk up and press E (or tap)") + sgaBtn("qway", "🧭 " + (s.where.city ? "Show me the way" : "Which way?"), " data-s='" + s.id + "'");
else
b += "<div style='margin:4px 0'>" + esc(s.q) + "</div>" + s.opts.map(function (o) { return sgaBtn("qchoose", esc(o.n), " data-s='" + s.id + "' data-k='" + o.k + "'"); }).join("");
inner += sgaBox(b, "#C9A85A");
});
});
if (qlnFinished(L)) {
var f = qlnFavour(L), n = qlnWise(L);
inner += sgaBox("<b>" + esc(L.end.title) + "</b><div style='font-size:12.5px;margin-top:3px'>" + esc(L.end.say(f, n)) + "</div>" + sgaDim(L.end.keep + " · wise choices: " + f + " of " + n), "#F2D27A");
}
inner += sgaBtn("qclose", "Close", " data-l='" + L.k + "'", "font-size:12px");
}
h += sgaBox(inner, qlnFinished(L) ? "#7FBF6A" : P.started ? "#C9A85A" : "rgba(201,168,104,.35)");
});
if (QLN.say && QLN.say.charAt && QLN.say.charAt(0) === "<")
h = sgaBox(QLN.say, "#7FB8E8") + h;
return h;
},
function (f, n) {
return f >= n ? "Athena smiles on you. Every choice you made was the one Odysseus learned the hard way, and Ithaca will tell of the traveller who brought its king home without losing a single needless hour." :
f >= Math.ceil(n / 2) ? "Athena is pleased. You stumbled once or twice, as Odysseus did, but you kept your head and your course, and the king is home." :
"Athena shakes her head and laughs. You made every mistake Odysseus ever made, and a few he didn't, and still you brought him home. That is a kind of wisdom too.";
},
function (s) {
var w = s.where || {}, out = [];
if (!qlnChapOk(s)) {
var W = typeof CT_W !== "undefined" && CT_W[w.tale], k = w.ch || 0, d = typeof ctsProg === "function" ? ctsProg(w.tale) : 0;
out.push("play the story there, at each lectern in order, up to \"" + (W && W.ch[k] ? W.ch[k][0] : "") + "\" (" + Math.min(d, k + 1) + " of " + (k + 1) + " chapters)");
}
var t = qlnTask(s);
if (t && !qlnFoundOk(s))
out.push("find " + t.n + " " + t.what + " " + t.icon + " (" + qlnTaskHave(s) + " of " + t.n + ")");
if (!qlnTimeOk(s))
out.push("spend time there playing: " + qlnActMin(s) + " of " + qlnStepMin(s) + " minutes");
return out.length ? "First " + out.join(", ") + "." : "";
},
function () {
var now = performance.now();
try {
var pads = navigator.getGamepads ? navigator.getGamepads() : [];
for (var i = 0; i < pads.length; i++) {
var g = pads[i];
if (!g)
continue;
if (g.buttons.some(function (b) { return b.pressed; }) || g.axes.some(function (a) { return Math.abs(a) > 0.25; })) {
QLN_ACT.last = now;
break;
}
}
}
catch (e) { }
try {
if (renderer && renderer.xr && renderer.xr.isPresenting) {
var q = camera.quaternion;
if (QLN_ACT.q && Math.abs(q.x - QLN_ACT.q[0]) + Math.abs(q.y - QLN_ACT.q[1]) + Math.abs(q.z - QLN_ACT.q[2]) > 0.004)
QLN_ACT.last = now;
QLN_ACT.q = [q.x, q.y, q.z];
}
}
catch (e) { }
return document.visibilityState !== "hidden" && now - QLN_ACT.last < 45000;
},
function (s) {
var t = qlnTask(s), w = s.where || {}, out = [], h = 0, id = s.id;
if (!t)
return out;
for (var c = 0; c < id.length; c++)
h = (h * 131 + id.charCodeAt(c)) >>> 0;
function rnd() { h = (h * 1664525 + 1013904223) >>> 0; return h / 4294967296; }
for (var tries = 0; tries < t.n * 40 && out.length < t.n; tries++) {
var a = rnd() * Math.PI * 2, f = rnd();
try {
if (w.sea) {
var p = SEA_BY[w.sea], lx = p.x + Math.sin(a) * p.r * (0.12 + f * 0.8), lz = p.z + Math.cos(a) * p.r * (0.12 + f * 0.8), y = seaHeight(lx, lz);
if (!(y > 0.8))
continue;
var v = new THREE.Vector3(SEA.base + lx, y, lz);
WLD.w.g.worldToLocal(v);
out.push({ x: v.x, y: v.y, z: v.z });
}
else if (w.tale) {
var P = CTS.places[w.ch || 0], r = 14 + f * 60, X = P.x + Math.sin(a) * r, Z = P.z + Math.cos(a) * r, Y = ctsGround(X, Z);
if (!isFinite(Y) || (typeof ctsBlock === "function" && ctsBlock(X, Z, Y + 0.5)))
continue;
out.push({ x: X, y: Y, z: Z, parent: CTS.root });
}
else if (w.world) {
var W = WLD.w, A = WLD.arrive, R = 25 + f * 110, X2 = A.x + Math.sin(a) * R, Z2 = A.z + Math.cos(a) * R, Y2 = W.ground ? W.ground(X2, Z2, 0) : 0;
if (Y2 == null || !isFinite(Y2))
continue;
var bad = false;
try {
bad = !!(W.block && W.block(X2, Z2, Y2)) || !!(W.solids && worldSolidAt(W.solids, X2, Z2, Y2));
}
catch (e) { }
if (bad)
continue;
out.push({ x: X2, y: +Y2, z: Z2 });
}
}
catch (e) { }
}
return out;
},
function () {
if (QLN_DRESS.geo)
return QLN_DRESS.geo;
var amph = [];
[[0, 0], [0.12, 0.02], [0.2, 0.15], [0.22, 0.35], [0.16, 0.55], [0.08, 0.68], [0.09, 0.78], [0, 0.78]].forEach(function (p) { amph.push(new THREE.Vector2(p[0], p[1])); });
return QLN_DRESS.geo = {
rug: new THREE.CircleGeometry(2.3, 28), rugEdge: new THREE.RingGeometry(2.1, 2.3, 28),
post: new THREE.CylinderGeometry(0.05, 0.06, 2.1, 6), lamp: new THREE.BoxGeometry(0.22, 0.28, 0.22), cap: new THREE.ConeGeometry(0.2, 0.16, 4),
pole: new THREE.CylinderGeometry(0.04, 0.04, 3, 6), flag: new THREE.PlaneGeometry(0.9, 1.3),
amph: new THREE.LatheGeometry(amph, 10), oar: new THREE.BoxGeometry(0.06, 2.4, 0.05), blade: new THREE.BoxGeometry(0.22, 0.6, 0.03),
shield: new THREE.CylinderGeometry(0.5, 0.5, 0.06, 18), boss: new THREE.SphereGeometry(0.1, 8, 6),
stone: new THREE.DodecahedronGeometry(0.45, 0), blade2: new THREE.BoxGeometry(0.07, 0.9, 0.02), guard: new THREE.BoxGeometry(0.34, 0.05, 0.05),
butt: new THREE.CylinderGeometry(0.55, 0.55, 0.18, 20), barrel: new THREE.CylinderGeometry(0.3, 0.26, 0.7, 10), item: new THREE.PlaneGeometry(0.45, 0.45)
};
},
function (k) {
var L = QLN.by[k], o = QLN_LOOK[k];
if (!L || !o)
return null;
var key = "flag:" + k;
return QLN_DRESS.tex[key] || (QLN_DRESS.tex[key] = wTex(128, 184, function (x, w, h) {
var c = "#" + ("00000" + o.col.toString(16)).slice(-6), t = "#" + ("00000" + o.trim.toString(16)).slice(-6);
x.fillStyle = c;
x.fillRect(0, 0, w, h - 24);
x.beginPath();
x.moveTo(0, h - 24);
x.lineTo(w / 2, h);
x.lineTo(w, h - 24);
x.fill();
x.strokeStyle = t;
x.lineWidth = 6;
x.strokeRect(8, 8, w - 16, h - 44);
x.font = "64px serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(L.icon, w / 2, (h - 24) / 2 + 4);
}));
},
function (g, s) {
var o = QLN_LOOK[s.line];
if (!o)
return;
var G = qlnDG(), set = new THREE.Group();
set.userData.qlnSet = 1;
var rug = new THREE.Mesh(G.rug, qlnDM(o.col));
rug.rotation.x = -Math.PI / 2;
rug.position.y = 0.03;
set.add(rug);
var edge = new THREE.Mesh(G.rugEdge, qlnDM(o.trim));
edge.rotation.x = -Math.PI / 2;
edge.position.y = 0.035;
set.add(edge);
[-1, 1].forEach(function (sd) {
var p = new THREE.Group();
p.position.set(sd * 2.1, 0, -1.2);
var post = new THREE.Mesh(G.post, qlnDM(0x3A2A1A));
post.position.y = 1.05;
p.add(post);
var lamp = new THREE.Mesh(G.lamp, qlnDM(0xFFD890, true));
lamp.position.y = 2.2;
p.add(lamp);
var cap = new THREE.Mesh(G.cap, qlnDM(0x2A2A2A));
cap.position.y = 2.42;
cap.rotation.y = Math.PI / 4;
p.add(cap);
try {
var gl = wGlow(0xFFC870, 1.3, 0.35);
gl.position.y = 2.2;
p.add(gl);
}
catch (e) { }
set.add(p);
});
var pole = new THREE.Mesh(G.pole, qlnDM(0x4A3A2A));
pole.position.set(-1.4, 1.5, -1.9);
set.add(pole);
var ft = qlnFlagTex(s.line);
if (ft) {
var fk = "flag:" + s.line, fm = QLN_DRESS.mat[fk] || (QLN_DRESS.mat[fk] = new THREE.MeshLambertMaterial({ map: ft, side: THREE.DoubleSide, transparent: true, alphaTest: 0.5 })), flag = new THREE.Mesh(G.flag, fm);
flag.position.set(-0.93, 2.3, -1.9);
set.add(flag);
}
if (o.props === "amph") {
[[1.5, -1.5, 0], [1.85, -1.0, 0.5], [1.2, -1.9, 1]].forEach(function (a) { var m = new THREE.Mesh(G.amph, qlnDM(a[2] ? 0xA85A2A : 0x8A4A22)); m.position.set(a[0], 0, a[1]); m.scale.setScalar(1 + a[2] * 0.15); set.add(m); });
var oar = new THREE.Group(), sh = new THREE.Mesh(G.oar, qlnDM(0x8A6A3A)), bl = new THREE.Mesh(G.blade, qlnDM(0x8A6A3A));
bl.position.y = -1.3;
oar.add(sh);
oar.add(bl);
oar.position.set(2.2, 1.15, 0.3);
oar.rotation.z = 0.25;
set.add(oar);
}
else if (o.props === "argo") {
var sd = new THREE.Group(), s1 = new THREE.Mesh(G.shield, qlnDM(0xB8862A)), b1 = new THREE.Mesh(G.boss, qlnDM(0xE8C878));
s1.rotation.x = Math.PI / 2;
b1.position.z = 0.05;
sd.add(s1);
sd.add(b1);
sd.position.set(1.7, 0.6, -1.5);
sd.rotation.x = -0.25;
set.add(sd);
[0.15, -0.2].forEach(function (r, i) { var oa = new THREE.Group(), a = new THREE.Mesh(G.oar, qlnDM(0x7A5A2A)), b = new THREE.Mesh(G.blade, qlnDM(0x7A5A2A)); b.position.y = -1.3; oa.add(a); oa.add(b); oa.position.set(2.1 + i * 0.3, 1.15, -0.4 + i * 0.5); oa.rotation.z = r + 0.2; set.add(oa); });
}
else if (o.props === "camelot") {
var st = new THREE.Mesh(G.stone, qlnDM(0x8A8A86));
st.position.set(1.7, 0.3, -1.3);
st.scale.set(1, 0.7, 1);
set.add(st);
var sw = new THREE.Group(), bb = new THREE.Mesh(G.blade2, qlnDM(0xD8D8E0)), gd = new THREE.Mesh(G.guard, qlnDM(0xE8C040));
gd.position.y = 0.3;
sw.add(bb);
sw.add(gd);
sw.position.set(1.7, 0.85, -1.3);
set.add(sw);
var rs = new THREE.Group(), s2 = new THREE.Mesh(G.shield, qlnDM(o.col)), b2 = new THREE.Mesh(G.boss, qlnDM(o.trim));
s2.rotation.x = Math.PI / 2;
b2.position.z = 0.05;
rs.add(s2);
rs.add(b2);
rs.position.set(2.2, 0.55, 0.2);
rs.rotation.y = -1.2;
rs.rotation.x = -0.2;
set.add(rs);
}
else if (o.props === "green") {
if (!QLN_DRESS.mat.butt)
QLN_DRESS.mat.butt = new THREE.MeshLambertMaterial({ map: wTex(128, 128, function (x, w, h) { ["#E8E0C8", "#2A2A2A", "#3A6AB8", "#B82A2A", "#E8C040"].forEach(function (c, i) { x.fillStyle = c; x.beginPath(); x.arc(w / 2, h / 2, 62 - i * 12, 0, Math.PI * 2); x.fill(); }); }) });
var bt = new THREE.Mesh(G.butt, [qlnDM(0xC8B078), QLN_DRESS.mat.butt, qlnDM(0xC8B078)]);
bt.rotation.x = Math.PI / 2;
bt.position.set(1.8, 0.75, -1.6);
set.add(bt);
[[2.2, -0.5], [2.5, 0.1]].forEach(function (a) { var br = new THREE.Mesh(G.barrel, qlnDM(0x6A4A2A)); br.position.set(a[0], 0.35, a[1]); set.add(br); });
}
var t = typeof qlnTask === "function" && qlnTask(s);
if (t) {
var n = Math.min(t.n, 6);
for (var i = 0; i < n; i++) {
var mk = "it:" + t.icon, im = QLN_DRESS.mat[mk] || (QLN_DRESS.mat[mk] = new THREE.MeshBasicMaterial({ map: qlnIconTex(t.icon), transparent: true, alphaTest: 0.3, depthWrite: false, side: THREE.DoubleSide })), it = new THREE.Mesh(G.item, im);
var a2 = -0.9 + i * (1.8 / Math.max(1, n - 1));
it.position.set(Math.sin(a2) * 1.3, 0.24, Math.cos(a2) * 1.3);
it.rotation.x = -0.7;
set.add(it);
}
}
g.add(set);
}
];
});
