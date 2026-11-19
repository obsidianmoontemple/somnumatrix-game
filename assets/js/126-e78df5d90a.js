/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var COURT_ROLES = { judge: ["Judge", "Magistrate", "Chief magistrate"], prosecutor: ["Prosecutor"], defence: ["Advocate", "Public defender"],
clerk: ["Court clerk", "Clerk of the court", "Clerk"], bailiff: ["Bailiff"], usher: ["Court usher", "Usher"] };
var COURT_ROLE_WORDS = { judge: "Judge", prosecutor: "Prosecutor", defence: "Defence", clerk: "Clerk", bailiff: "Bailiff", usher: "Usher",
defendant: "Defendant", juror: "Juror", gallery: "Gallery", court: "The court" };
var COURT_SPOT = { judge: "bench", prosecutor: "prosecution", defence: "defence", clerk: "clerk", bailiff: "bailiff", usher: "usher" };
var COURT_PHASE = { waiting: "filed, waiting to be listed", listed: "listed for hearing", called: "called: the defendant to the dock", plea: "the plea",
prosecution: "the case for Somnucor", defence: "the defence", evidence: "the evidence", deliberation: "the verdict", decided: "decided" };
var COURT_LIVE = { called: 1, plea: 1, prosecution: 1, defence: 1, evidence: 1, deliberation: 1 };
var COURT = { now: null, at: 0, tickAt: 0, mine: [], mineAt: 0, open: false, tab: "session", cast: {}, castFor: null, lastLine: 0, seen: {},
legacy: false, missing: false, bringCool: 0, holdUntil: 0, find: [], busy: false };
(function () {
if (typeof WP_BY_KEY === "undefined" || !WP_BY_KEY["The Courthouse"])
return;
var w = WP_BY_KEY["The Courthouse"];
[1500, 1501, 1502, 1503, 1504, 1505].forEach(function (id) { if (w.jobs.indexOf(id) < 0)
w.jobs.push(id); if (typeof WP_BY_JOB !== "undefined")
WP_BY_JOB[id] = w.key; });
w.note = "Where the city's cases are heard, in real time: the judge on the bench, the clerk below, counsel at their tables, the defendant in the dock, a jury if one sits, and anyone who likes in the gallery.";
})();
(function () {
if (typeof FURN === "undefined")
return;
var DW = typeof DARKWOOD !== "undefined" ? DARKWOOD : 0x3A2A1E, WD = typeof WOOD !== "undefined" ? WOOD : 0x6B4A32;
function rail(w, d, h, col) {
var parts = [P(box(w, .08, .08), mL(col), 0, h, -d / 2), P(box(.08, .08, d), mL(col), -w / 2, h, 0), P(box(.08, .08, d), mL(col), w / 2, h, 0)];
for (var i = 0; i <= 4; i++) {
parts.push(P(box(.06, h, .06), mL(col), -w / 2 + w * i / 4, h / 2, -d / 2));
}
[-1, 1].forEach(function (s) { for (var j = 1; j <= 2; j++)
parts.push(P(box(.06, h, .06), mL(col), s * w / 2, h / 2, -d / 2 + d * j / 2)); });
return parts;
}
FURN.dock = function () { return F([P(box(2.2, .18, 2), mL(DW), 0, .09, 0)].concat(rail(2.2, 2, 1.1, DW))); };
FURN.witnessstand = function () {
return F([P(box(1.4, .3, 1.4), mL(DW), 0, .15, 0), P(box(1.4, 1.05, .08), mL(DW), 0, .82, -.66), P(box(.08, 1.05, 1.3), mL(DW), -.66, .82, 0),
P(box(.08, 1.05, 1.3), mL(DW), .66, .82, 0), P(box(1.5, .06, .3), mL(WD), 0, 1.36, -.62)]);
};
FURN.jurybox = function () {
var g = F([P(box(4, .08, 2.6), mL(DW), 0, .04, 0), P(box(4, .25, 1.2), mL(DW), 0, .17, -.65), P(box(4, .9, .08), mL(DW), 0, .45, 1.3)]);
for (var r = 0; r < 2; r++)
for (var i = 0; i < 3; i++) {
var c = FURN.chair();
c.position.set(-1.3 + i * 1.3, r ? 0.25 : 0, r ? -.65 : .55);
g.add(c);
}
return g;
};
FURN.counseltable = function () {
var g = F([P(box(2.4, .06, .9), mL(WD), 0, .76, 0), P(box(.08, .74, .8), mL(WD), -1.1, .37, 0), P(box(.08, .74, .8), mL(WD), 1.1, .37, 0),
P(box(.5, .03, .35), mL(0xE8E4DA), -.5, .8, 0), P(box(.4, .05, .3), mL(0x3A2418), .6, .81, .05)]);
[-.6, .6].forEach(function (x) { var c = FURN.chair(); c.position.set(x, 0, .75); c.rotation.y = Math.PI; g.add(c); });
return g;
};
FURN.galleryrail = function () { var parts = [P(box(4.6, .08, .1), mL(DW), 0, 1, 0)]; for (var i = 0; i <= 8; i++)
parts.push(P(box(.07, 1, .07), mL(DW), -2.3 + i * 4.6 / 8, .5, 0)); return F(parts); };
FURN.courtarms = function () {
return F([P(box(1.6, 1.6, .06), mL(0x6A1A2A), 0, 2.4, 0), P(cyl(.5, .5, .04, 20), mL(typeof GOLD !== "undefined" ? GOLD : 0xC9A868), 0, 2.45, .04, Math.PI / 2),
P(box(.12, .8, .03), mL(0x2A2C34), 0, 2.45, .07)]);
};
if (typeof SOLIDFURN !== "undefined") {
SOLIDFURN.witnessstand = 1;
SOLIDFURN.counseltable = 1;
SOLIDFURN.galleryrail = 1;
}
if (typeof furnBox === "function") {
var fb = furnBox;
furnBox = function (k) { var s = { witnessstand: [1.4, 1.4], counseltable: [2.4, .9], galleryrail: [4.6, .2], jurybox: [4, 2.6], dock: [2.2, 2] }; return s[k] || fb(k); };
}
})();
(function () {
if (typeof fillHall !== "function")
return;
var fh = fillHall;
fillHall = function (kind, W, D, put, spots) {
if (kind !== "court")
return fh.apply(this, arguments);
var back = -D / 2;
put("courtarms", 0, back + .1, 0);
put("judgebench", 0, back + 2.2, 0);
put("banner", -2.6, back + .2, 0);
put("banner", 2.6, back + .2, 0);
put("desk", 0, back + 4.8, Math.PI);
put("witnessstand", 2.8, back + 4.4, -Math.PI / 5);
put("counseltable", 3.1, back + 7.6, 0);
put("counseltable", -3.1, back + 7.6, 0);
put("jurybox", -W / 2 + 1.6, back + 4.6, Math.PI / 2);
put("dock", 0, back + 11.6, 0);
put("galleryrail", -4.1, back + 13.6, 0);
put("galleryrail", 4.1, back + 13.6, 0);
for (var z = back + 14.8; z < D / 2 - 2.2; z += 1.6) {
put("pew", -4.1, z, Math.PI);
put("pew", 4.1, z, Math.PI);
}
put("chandelier", 0, back + 6, 0);
put("clock", W / 2 - .4, back + 12, -Math.PI / 2);
spots.push({ x: 0, z: back + 1.1, room: "bench" }, { x: 0, z: back + 4.1, room: "clerk" }, { x: 2.8, z: back + 4.4, room: "witness" }, { x: 3.1, z: back + 8.4, room: "prosecution" }, { x: -3.1, z: back + 8.4, room: "defence" }, { x: 0, z: back + 11.6, room: "dock" }, { x: 1.9, z: back + 11.4, room: "bailiff" }, { x: W / 2 - 1.4, z: D / 2 - 3, room: "usher" }, { x: -2.2, z: D / 2 - 3.4, room: "gallery" });
for (var j = 0; j < 6; j++)
spots.push({ x: -W / 2 + 1.6 + (j < 3 ? .55 : -.1), z: back + 4.6 - 1.3 + (j % 3) * 1.3, room: "jury" });
};
})();
function courtMyRoles() {
var out = {}, jobs = ((typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || []).map(function (j) { return j.title; })
.concat(((typeof standing !== "undefined" && standing && standing.jobs) || []).map(function (j) { return j.job; }));
Object.keys(COURT_ROLES).forEach(function (r) { if (jobs.some(function (t) { return COURT_ROLES[r].indexOf(t) >= 0; }))
out[r] = true; });
if (COURT.now && COURT.now.role)
out[COURT.now.role] = true;
if (COURT.now && COURT.now.judge)
out.judge = true;
return out;
}
function courtStaff() {
var r = courtMyRoles();
return Object.keys(r).length > 0 || !!(COURT.now && (COURT.now.court || COURT.now.police)) ||
(typeof justiceRoles === "function" && (justiceRoles().court || justiceRoles().police));
}
function inCourthouse() { return !!(store.inside && INT && INT.spec && INT.spec.workplace === "The Courthouse"); }
function courtSpec() { var at = store.workplaceAt && store.workplaceAt["The Courthouse"]; return at && typeof specById === "function" ? specById(at.id) : null; }
function courtTime(iso) {
var t = Date.parse(iso);
if (!isFinite(t))
return "";
if (typeof CITYCLOCK !== "undefined" && CITYCLOCK.offset !== null && typeof hm === "function")
return hm(t / 3600000 + CITYCLOCK.offset / 60);
var d = new Date(t);
return (d.getHours() < 10 ? "0" : "") + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
}
function courtAt(hhmm) {
var m = /^(\d{1,2}):?(\d{2})$/.exec(String(hhmm || "").trim());
if (!m)
return null;
var want = (+m[1]) + (+m[2]) / 60, now = typeof cityHourNow === "function" ? cityHourNow() : new Date().getHours();
var d = ((want - now) % 24 + 24) % 24;
return new Date(Date.now() + d * 3600000).toISOString();
}
function courtRefresh(force) { return __ZC(126, 0, this, arguments, new.target); }
function courtLegacyNow() { return __ZC(126, 1, this, arguments, new.target); }
function courtMine(force) {
if (!(typeof signedIn === "function" && signedIn()))
return;
if (!force && Date.now() - COURT.mineAt < 45000)
return;
COURT.mineAt = Date.now();
cityRpc("my_cases").then(function (rows) {
var before = JSON.stringify(COURT.mine);
COURT.mine = Array.isArray(rows) ? rows : ((rows && rows.cases) || []);
if (before !== JSON.stringify(COURT.mine)) {
courtNotice();
if (COURT.open)
courtPaint();
}
}).catch(function () { });
}
function courtTake(n) { return __ZC(126, 2, this, arguments, new.target); }
function courtStandinName(role) { return __ZC(126, 3, this, arguments, new.target); }
function courtRoleHere(role) {
var p = COURT.now && COURT.now.posts && COURT.now.posts[role];
return !!(p && (p.holders || []).some(function (h) { return h.here; }));
}
function courtLook(role, id) { return __ZC(126, 4, this, arguments, new.target); }
function courtCastClear() {
Object.keys(COURT.cast).forEach(function (r) { var c = COURT.cast[r]; if (c && c.g && c.g.parent)
c.g.parent.remove(c.g); if (c && c.bub)
dropTag(c.bub); });
COURT.cast = {};
}
function courtCastSync() { return __ZC(126, 5, this, arguments, new.target); }
(function () {
if (typeof bringOccupants !== "function")
return;
var bo = bringOccupants;
bringOccupants = function () { bo.apply(this, arguments); try {
COURT.castFor = null;
courtCastSync();
if (inCourthouse())
courtRefresh(true);
}
catch (e) {
if (window.console)
console.warn("court cast:", e);
} };
})();
function courtLines(s) { return __ZC(126, 6, this, arguments, new.target); }
function courtSpeak(l) { return __ZC(126, 7, this, arguments, new.target); }
function courtToDock(msg) { return __ZC(126, 8, this, arguments, new.target); }
function courtMySession() { var s = COURT.now && COURT.now.session; return s && s.me === "defendant" ? s : null; }
function courtHoldsMe() {
if (!inCourthouse())
return false;
var s = courtMySession();
return !!((s && COURT_LIVE[s.phase]) || Date.now() < COURT.holdUntil);
}
function courtBringTick(dt) {
COURT.bringCool -= dt;
if (COURT.bringCool > 0)
return;
COURT.bringCool = 4;
var s = courtMySession();
if (!s || !COURT_LIVE[s.phase] || inCourthouse())
return;
if (!(typeof inCityNow === "function" && inCityNow()))
return;
if (typeof dreamerHurt === "function" && dreamerHurt().state === "down")
return;
var held = typeof heldNow === "function" && heldNow();
if (held) {
courtToDock("<b>The bailiff brings you up from the Gaol to the dock.</b> Your case is called.");
return;
}
if (!COURT.seen["call" + s.id]) {
COURT.seen["call" + s.id] = 1;
setStatus("<b>Your case is called at The Courthouse.</b> Open the court to go to the dock — or it is heard without you.");
courtShowButton();
COURT.open = true;
COURT.tab = "session";
courtPaint();
}
}
function courtNotice() { return __ZC(126, 9, this, arguments, new.target); }
function courtEls() { return __ZC(126, 10, this, arguments, new.target); }
function courtShowButton() { courtEls(); var b = document.getElementById("court-btn"); if (b)
b.style.display = "block"; }
function courtToggle(tab) {
COURT.open = tab ? true : !COURT.open;
if (tab)
COURT.tab = tab;
if (COURT.open) {
courtRefresh(true);
courtMine(true);
}
courtPaint();
}
function courtButtonTick() {
var b = document.getElementById("court-btn");
var show = typeof inCityNow === "function" && inCityNow() && (inCourthouse() || courtStaff() || (COURT.mine || []).some(function (c) { return c.status === "filed" || c.status === "pleaded" || c.status === "hearing" || (c.status === "guilty" && (c.fine || 0) > (c.fine_paid || 0)); }));
if (show && !b) {
courtEls();
b = document.getElementById("court-btn");
}
if (b)
b.style.display = show ? "block" : "none";
if (!show && COURT.open && !inCourthouse() && !courtStaff() && !(COURT.mine || []).length) {
COURT.open = false;
courtPaint();
}
}
function courtPaint() { return __ZC(126, 11, this, arguments, new.target); }
function courtMsg(t, bad) { var e = document.getElementById("court-msg"); if (e) {
e.textContent = t;
e.style.color = bad ? "#C0603A" : "var(--dim)";
} }
function courtDo(name, args, okWords) { return __ZC(126, 12, this, arguments, new.target); }
function courtPaintSession(body) { return __ZC(126, 13, this, arguments, new.target); }
function courtPhaseLeft(s) {
var t = Date.parse(s.phase_at);
if (!isFinite(t))
return "";
var lim = { called: 150, plea: 120, prosecution: 180, defence: 180, evidence: 40, deliberation: 180 }[s.phase];
if (!lim)
return "";
var el = (Date.now() - t) / 1000;
return el < lim ? "up to " + Math.max(1, Math.ceil((lim - el) / 60)) + " min" : "any moment";
}
function courtWire(body, s) { return __ZC(126, 14, this, arguments, new.target); }
function courtPaintList(body, staff) { return __ZC(126, 15, this, arguments, new.target); }
function courtPaintMine(body) { return __ZC(126, 16, this, arguments, new.target); }
function courtPaintFile(body) { return __ZC(126, 17, this, arguments, new.target); }
function dreamerPicker(input, btn, out) { return __ZC(126, 18, this, arguments, new.target); }
(function () {
if (typeof workPaint !== "function")
return;
var wp = workPaint;
workPaint = function () {
wp.apply(this, arguments);
var el = document.getElementById("work");
if (!el || el.style.display === "none" || !Object.keys(courtMyRoles()).length)
return;
var n = COURT.now || {}, list = n.listed || [], s = n.session, next = list.filter(function (c) { return c.hearing_at && c.phase === "listed"; })[0];
var box = document.createElement("div");
box.className = "job";
box.innerHTML = '<b style="color:#E8C27A">The court</b> <span class="dim">· ' + (s ? "in session: " + esc(s.defendant) + ", " + esc(COURT_PHASE[s.phase] || s.phase) : "not sitting") +
' · ' + list.length + ' on the list' + (next ? ' · next at ' + courtTime(next.hearing_at) : '') + '</span>' +
'<div style="margin-top:6px"><button class="btn" id="work-court">Open the court</button></div>';
el.appendChild(box);
document.getElementById("work-court").onclick = function () { WORK.open = false; workPaint(); courtShowButton(); courtToggle("session"); };
};
})();
function courtTick(dt) {
if (!(typeof signedIn === "function" && signedIn()))
return;
var inCity = typeof inCityNow === "function" && inCityNow();
if (!inCity) {
if (COURT.open) {
COURT.open = false;
courtPaint();
}
return;
}
if (!COURT.missing && !COURT.legacy && Date.now() - COURT.tickAt > 30000) {
COURT.tickAt = Date.now();
cityRpc("court_tick").catch(function (e) { if (rpcMissing(e))
COURT.legacy = true; });
}
courtMine(false);
var mineLive = (COURT.mine || []).some(function (c) { return c.status === "hearing" && c.hearing_at && Date.parse(c.hearing_at) < Date.now() + 60000; });
if (inCourthouse() || COURT.open || mineLive || courtStaff())
courtRefresh(false);
courtBringTick(dt);
courtButtonTick();
Object.keys(COURT.cast).forEach(function (r) { var c = COURT.cast[r]; if (c.bub) {
c.left -= dt;
if (c.left <= 0) {
dropTag(c.bub);
c.bub = null;
}
} });
if (!inCourthouse() && COURT.castFor) {
COURT.cast = {};
COURT.castFor = null;
}
}
(function () {
if (typeof atlLifeTick !== "function")
return;
var al = atlLifeTick;
atlLifeTick = function (dt) { al(dt); try {
courtTick(dt);
}
catch (e) {
if (window.console)
console.warn("court:", e);
} };
})();
