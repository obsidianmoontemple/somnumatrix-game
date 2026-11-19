/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var UG_OFFICE = "The Underground Office";
var UG_JOBS = {
clerk: { id: 1450, title: "Booking clerk", task: "Sell a ticket at the window" },
driver: { id: 1451, title: "Underground train driver", task: "Drive a stage between stations" },
guard: { id: 1452, title: "Underground guard", task: "See a train away from a platform" },
master: { id: 1453, title: "Station master", task: "Make the platform announcements" },
signal: { id: 1454, title: "Underground signal operator", task: "Work the signal box" },
walker: { id: 1455, title: "Track walker", task: "Walk a tunnel section" }
};
var UGJ = { test: false, book: null, window: null, queue: [], queueAt: 0, postAt: 0, serve: null, sold: 0, guard: null, master: null, box: null, walk: null, kiosks: null, kioskFor: null, tick: 0, paintAt: 0, staffEl: null };
if (typeof WORKPLACES !== "undefined" && typeof WP_BY_KEY !== "undefined" && !WP_BY_KEY[UG_OFFICE]) {
var UGWP = { key: UG_OFFICE, ring: "plaza", arch: "subwayentrance", jobs: [1450, 1451, 1452, 1453, 1454, 1455], fit: [],
note: "Somnucor Underground: booking clerks, drivers, guards, station masters, the signal box and the track walkers. Every station entrance is theirs. The office itself is down in the subway, at the Tower Plaza station: through the green staff door at the end of the platform." };
WORKPLACES.push(UGWP);
WP_BY_KEY[UG_OFFICE] = UGWP;
if (typeof WP_BY_JOB !== "undefined")
UGWP.jobs.forEach(function (j) { WP_BY_JOB[j] = UG_OFFICE; });
}
if (typeof KIND_WORDS !== "undefined")
KIND_WORDS.ug = "on the Underground";
function ugjOffice() {
if (typeof store === "undefined" || !store.workplaceAt || typeof UNDERGROUND === "undefined" || !UNDERGROUND.length || !UNDERGROUND[0].spec)
return;
var w = store.workplaceAt[UG_OFFICE], s = UNDERGROUND[0];
if (w && w.id === s.spec.id)
return;
store.workplaceAt[UG_OFFICE] = { x: s.x, z: s.z, id: s.spec.id };
if (typeof TEMPS !== "undefined")
TEMPS.at = 0;
}
(function () {
if (typeof tempMake !== "function")
return;
var tm = tempMake;
tempMake = function (id, p) {
var t = tm.apply(this, arguments);
if (p && p.job >= 1450 && p.job <= 1499) {
t.mode = "desk";
var L = (typeof UNDERGROUND !== "undefined") ? UNDERGROUND : [];
if (L.length) {
var s = L[((p.k || 0) + (p.job - 1450) * 3) % L.length];
if (s && s.spec)
t.home = { x: s.x, z: s.z, id: s.spec.id };
}
}
return t;
};
})();
function ugjStandIn(role, i) { return __ZC(128, 0, this, arguments, new.target); }
function ugTestMode(on) { UGJ.test = !!on; if (typeof UGD !== "undefined" && !on)
UGD.test = false; return UGJ.test; }
function ugjJob(role) {
if (UGJ.test)
return { job_id: 0, title: UG_JOBS[role].title, clocked_in: true, test: true };
var jobs = (typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || [];
return jobs.filter(function (j) { return j.title === UG_JOBS[role].title && j.clocked_in; })[0] || null;
}
function ugjRoles() { return Object.keys(UG_JOBS).filter(function (r) { return !!ugjJob(r); }); }
function ugjHeld(role) { var jobs = (typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || []; return UGJ.test || jobs.some(function (j) { return j.title === UG_JOBS[role].title; }); }
function ugjStart(role) { return __ZC(128, 1, this, arguments, new.target); }
function ugjDone(role, ref) { return __ZC(128, 2, this, arguments, new.target); }
function ugjRpc(name, args) { if (UGJ.test || !(typeof signedIn === "function" && signedIn()))
return Promise.resolve({ ok: true, test: true }); return cityRpc(name, args).catch(function (e) { return { ok: false, say: e.message }; }); }
function ugjSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function ugjWorking() { if (typeof WORK !== "undefined")
WORK.lastWork = Date.now(); }
(function () {
if (typeof workStart !== "function")
return;
var ws = workStart;
workStart = function (job, task) { if (task && task.kind === "ug")
return ugjBegin(job, task); return ws.apply(this, arguments); };
})();
function ugjBegin(job, task) { return __ZC(128, 3, this, arguments, new.target); }
function ugjKiosks() { return __ZC(128, 4, this, arguments, new.target); }
(function () {
if (typeof ugTick !== "function")
return;
var ut = ugTick;
ugTick = function (dt) {
ut(dt);
var pr = document.getElementById("ug-prompt");
if (typeof ugNear !== "undefined" && ugNear && pr && pr.style.display !== "none")
pr.innerHTML = "<b>" + esc(ugNear.name) + "</b> Underground · booking office · " + ugFareWords() + " · <b>press U</b> or tap";
};
})();
function ugbEl() {
var el = document.getElementById("ugb");
if (el || !document.body)
return el;
var css = document.createElement("style");
css.textContent = "#ugb,#ugs{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:60;display:none;width:min(440px,calc(100vw - 24px));max-height:82vh;overflow:auto;" +
"background:rgba(8,10,16,.97);border:1px solid #C03A2E;border-radius:4px;padding:14px 16px;font:13px var(--sans,system-ui);color:var(--bone,#E8E2D2);line-height:1.5}" +
"#ugb .row,#ugs .row{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--line,#2A2C34)}" +
"#ugb .dim,#ugs .dim,#ugj .dim{color:var(--dim,#9A968A)}#ugb .bar{height:6px;background:#22252C;border-radius:3px;overflow:hidden;margin:6px 0}#ugb .bar i{display:block;height:6px;background:#E8C27A}" +
"#ugs{width:min(560px,calc(100vw - 24px))}#ugs .on{color:#E0603A;font-weight:bold}#ugs .tr{color:#8FCB8A}" +
"#ugj{position:fixed;left:12px;bottom:calc(150px + env(safe-area-inset-bottom,0px));z-index:46;display:none;width:min(300px,calc(100vw - 24px));background:rgba(8,10,16,.94);" +
"border:1px solid #C03A2E;border-radius:4px;padding:9px 11px;font:13px var(--sans,system-ui);color:var(--bone,#E8E2D2);line-height:1.5}#ugj .btn{margin:3px 4px 0 0;font-size:12.5px}" +
"#ugj-prompt{position:fixed;left:50%;bottom:calc(170px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:45;display:none;background:rgba(10,12,18,.92);" +
"border:1px solid #E8C27A;border-radius:3px;padding:9px 14px;font:13px var(--sans,system-ui);color:var(--bone,#E8E2D2);cursor:pointer}";
document.head.appendChild(css);
el = document.createElement("div");
el.id = "ugb";
document.body.appendChild(el);
var s = document.createElement("div");
s.id = "ugs";
document.body.appendChild(s);
var j = document.createElement("div");
j.id = "ugj";
document.body.appendChild(j);
var p = document.createElement("div");
p.id = "ugj-prompt";
document.body.appendChild(p);
return el;
}
function ugBooking(from) { return __ZC(128, 5, this, arguments, new.target); }
function ugbClose() {
UGJ.book = null;
var el = document.getElementById("ugb");
if (el)
el.style.display = "none";
if (typeof ugOpen !== "undefined")
ugOpen = false;
if (typeof ugCool !== "undefined")
ugCool = 1;
if (UGJ.window && !UGJ.serve)
ugjWindowClose(true);
}
function ugbClerkAt(key) { var c = null; (UG2.posts || []).forEach(function (p) { if (p.role === "clerk" && p.station === key && !p.mine)
c = p; }); return c; }
function ugbPaint() { return __ZC(128, 6, this, arguments, new.target); }
function ugbMsg(h) { if (UGJ.book) {
UGJ.book.msg = h;
ugbPaint();
} }
function ugbBuy() { return __ZC(128, 7, this, arguments, new.target); }
function ugbWaitTick(dt) {
var B = UGJ.book;
if (!B || B.state !== "waiting" || !B.ticket)
return;
B.waitAt -= dt;
if (B.waitAt > 0 || B.polling)
return;
B.waitAt = 2;
B.polling = true;
cityRpc("ug_ticket_state", { p_ticket: B.ticket }).then(function (o) {
B.polling = false;
if (UGJ.book !== B || !o)
return;
if (o.state === "issued") {
B.state = "issued";
ugbMsg("Your ticket, from " + esc(o.standin ? ugjStandIn("clerk", B.i) + " at the next window" : (o.clerk || B.clerk || "the clerk")) + ". Down you go.");
setTimeout(ugbDown, 900);
}
}).catch(function () { B.polling = false; });
}
function ugbDown() { var B = UGJ.book; if (!B)
return; var i = B.i; ugbClose(); ug2Down(i); }
function ugbPass() { return __ZC(128, 8, this, arguments, new.target); }
function ugjWindowTake() { return __ZC(128, 9, this, arguments, new.target); }
function ugjWindowClose(quiet) {
if (!UGJ.window)
return;
UGJ.window = null;
UGJ.queue = [];
UGJ.serve = null;
ugjRpc("ug_post", { p_role: null, p_station: null, p_detail: {} });
if (!quiet)
ugbMsg("Window closed. A stand-in takes it over.");
else
ugjSay("You leave the booking office window. A stand-in takes it over.");
}
function ugjWindowTick(dt) {
var W = UGJ.window;
if (!W)
return;
var away = W.mall ? !(typeof MALL !== "undefined" && MALL.on && MALL.atStation) : Math.hypot(camera.position.x - W.x, camera.position.z - W.z) > 9;
if (away || (typeof UG2 !== "undefined" && UG2.on)) {
ugjWindowClose(true);
return;
}
ugjWorking();
UGJ.postAt -= dt;
if (UGJ.postAt <= 0) {
UGJ.postAt = 30;
ugjRpc("ug_post", { p_role: "clerk", p_station: W.key, p_detail: {} });
}
UGJ.queueAt -= dt;
if (UGJ.queueAt <= 0 && !UGJ.queueBusy) {
UGJ.queueAt = 2.5;
if (UGJ.test) {
if (!UGJ.queue.length && !UGJ.serve && Math.random() < 0.2)
UGJ.queue = [{ id: -(Date.now() % 100000), name: "A traveller", age: 0 }];
}
else {
UGJ.queueBusy = true;
cityRpc("ug_clerk_queue", {}).then(function (r) { UGJ.queueBusy = false; UGJ.queue = Array.isArray(r) ? r : []; ugbPaint(); }).catch(function () { UGJ.queueBusy = false; });
}
}
var S = UGJ.serve;
if (S) {
if (S.pen > 0)
S.pen -= dt;
if (S.busy) {
S.t += dt;
if (S.t >= 3) {
S.busy = false;
S.t = 0;
S.s++;
if (S.s >= S.steps.length)
ugjServeFinish();
}
}
}
}
function ugjServe(id) { return __ZC(128, 10, this, arguments, new.target); }
function ugjServeStep(step) {
var S = UGJ.serve;
if (!S || S.busy || S.pen > 0 || S.sending)
return;
if (step === S.steps[S.s]) {
S.busy = true;
S.t = 0;
ugjWorking();
}
else
S.pen = 2;
ugbPaint();
}
function ugjServeFinish() { return __ZC(128, 11, this, arguments, new.target); }
function ugjStaffPaint(force) {
var el = ugbEl();
el = document.getElementById("ugj");
if (!el)
return;
var on = typeof UG2 !== "undefined" && UG2.on && walkMode, roles = ugjRoles();
if (!on || !roles.length || (typeof UGD !== "undefined" && UGD.on)) {
el.style.display = "none";
return;
}
var h = '<b>Staff</b> <span class="dim">· ' + roles.map(function (r) { return esc(UG_JOBS[r].title); }).join(", ") + (UGJ.test ? " · practice" : "") + '</span>';
var ride = UG2.ride, i = UG2.at;
roles.forEach(function (r) {
if (r === "driver") {
if (UGD.pending)
h += '<div>Waiting to take the ' + UG_RAIL_NAMES[UGD.pending.d] + ' train… <button class="btn" data-a="drv-cancel">Cancel</button></div>';
else if (!ride)
h += '<div>Drive: <button class="btn" data-a="drv0">Next Outer Rail</button><button class="btn" data-a="drv1">Next Inner Rail</button></div>';
}
if (r === "guard") {
var G = UGJ.guard;
if (G && G.pending !== null && G.pending !== undefined && !ride)
h += '<div>Waiting to guard the ' + UG_RAIL_NAMES[G.pending] + ' train… <button class="btn" data-a="grd-cancel">Cancel</button></div>';
else if (!ride)
h += '<div>Guard: <button class="btn" data-a="grd0">Next Outer Rail</button><button class="btn" data-a="grd1">Next Inner Rail</button></div>';
else if (ride && ride.cab === "rear")
h += '<div>' + esc(ugjGuardWords()) + '</div><div><button class="btn" data-a="grd-c">Shut doors (C)</button><button class="btn" data-a="grd-r">Right away (R)</button><button class="btn" data-a="grd-off">Step off</button></div>';
}
if (r === "master" && !ride) {
var M = UGJ.master;
if (!M || M.i !== i)
h += '<div>Station master: <button class="btn" data-a="ms">Take charge of this platform</button></div>';
else {
h += '<div>In charge of <b>' + esc(ugName(i)) + '</b> · ' + M.good + ' of 3 announcements <button class="btn" data-a="ms-off">Hand over</button></div>';
if (M.q) {
h += '<div class="dim">' + esc(M.q.why) + '</div>';
M.q.opts.forEach(function (o, k) { h += '<button class="btn" data-a="ms-say" data-k="' + k + '">' + esc(o) + '</button>'; });
}
else
h += '<div class="dim">Keep an eye on the board: the next announcement in ' + Math.max(1, Math.ceil(M.nextAt)) + ' s.</div>';
}
}
if (r === "signal")
h += '<div>Signals: <button class="btn" data-a="box">' + (UGJ.box ? "Back to the signal box" : "Open the signal box") + '</button></div>';
if (r === "walker" && !ride) {
if (UGJ.walk)
h += '<div>' + esc(ugjWalkWords()) + ' <button class="btn" data-a="walk-off">Give up</button></div>';
else
h += '<div>Track walk: <button class="btn" data-a="walk0">Outer tunnel</button><button class="btn" data-a="walk1">Inner tunnel</button></div>';
}
});
if (!force && el.dataset.h === h) {
el.style.display = "block";
return;
}
el.dataset.h = h;
el.innerHTML = h;
el.style.display = "block";
Array.prototype.forEach.call(el.querySelectorAll("[data-a]"), function (b) { b.onclick = function () { ugjAct(b.getAttribute("data-a"), b.getAttribute("data-k")); }; });
}
function ugjAct(a, k) { return __ZC(128, 12, this, arguments, new.target); }
function ugjGuardTake(d) {
if (!ugjJob("guard"))
return ugjSay("Clock in as an Underground guard first.");
UGJ.guard = { pending: d, d: d, stop: null, done: 0 };
ugjSay("Wait on the platform: you will step into the rear cab of the next " + UG_RAIL_NAMES[d] + " train.");
}
function ugjGuardIdle() {
var G = UGJ.guard;
if (!G || G.pending === null || G.pending === undefined)
return;
if (!UG2.on) {
UGJ.guard = null;
return;
}
if (UG2.ride)
return;
var n = ugTrainNear(UG2.at, G.pending, ugNow());
if (!n || Math.abs(n.x) > 6 || !(n.open > 0.6))
return;
if (ug2Board(G.pending, "rear")) {
G.pending = null;
G.stop = null;
var dir = G.d === 0 ? 1 : -1;
yaw = dir > 0 ? Math.PI / 2 : -Math.PI / 2;
pitch = 0;
if (n.live)
ugjRpc("ug_guard_rightaway", { p_d: G.d, p_run: ugRunCanon(n.live.run), p_station: null });
ugjSay("<b>In the rear cab.</b> At every stop: shut the doors (C) when the time comes, then give the right away (R).");
}
}
function ugjGuardStop() { return __ZC(128, 13, this, arguments, new.target); }
function ugjGuardTick(dt) {
var G = UGJ.guard;
if (!G || !UG2.ride || UG2.ride.cab !== "rear")
return;
ugjWorking();
var S = ugjGuardStop(), t = ugNow();
if (!S) {
if (G.stop && !G.stop.ra && !G.stop.said) {
G.stop.said = true;
ugjSay("The doors shut without you — the stand-in guard saw her away. Be quicker at the next stop.");
}
if (G.stop && G.stop.ra)
G.stop = null;
return;
}
if (!G.stop || G.stop.st !== S.st) {
G.stop = { st: S.st, t: t, closed: false, ra: false, started: false };
ugjStart("guard").then(function (o) { if (G.stop)
G.stop.started = !!(o && o.ok); });
ugjSay("<b>" + esc(ugName(S.st)) + "</b>. Watch the platform. Shut the doors when they have had their time.");
}
}
function ugjGuardReady() { var G = UGJ.guard, S = ugjGuardStop(); if (!G || !G.stop || !S)
return false; return S.live ? (ugNow() - G.stop.t >= 18) : (S.ph >= 19); }
function ugjGuardWords() { return __ZC(128, 14, this, arguments, new.target); }
function ugjGuardKey(k) { return __ZC(128, 15, this, arguments, new.target); }
function ugjLeaveCab() {
var R = UG2.ride;
if (!R || R.cab !== "rear")
return;
var S = ugjGuardStop();
if (!S)
return ugjSay("Wait for a platform before you step off.");
UGJ.guard = null;
ug2Alight("You step down from the rear cab at <b>" + esc(ugName(UG2.at)) + "</b>.");
}
function ugjMasterTake() { return __ZC(128, 16, this, arguments, new.target); }
function ugjMasterEnd(why) { if (!UGJ.master)
return; UGJ.master = null; ugjRpc("ug_post", { p_role: null, p_station: null, p_detail: {} }); if (why)
ugjSay(why); }
function ugjShuffle(a, seed) { a = a.slice(); var r = seed || 1; for (var i = a.length - 1; i > 0; i--) {
r = (r * 9301 + 49297) % 233280;
var k = Math.floor(r / 233280 * (i + 1));
var x = a[i];
a[i] = a[k];
a[k] = x;
} return a; }
function ugjMasterQuestion() { return __ZC(128, 17, this, arguments, new.target); }
function ugjMasterTick(dt) {
var M = UGJ.master;
if (!M)
return;
if (!UG2.on || UG2.ride || UG2.at !== M.i) {
ugjMasterEnd("You have left the platform; the stand-in station master takes charge again.");
return;
}
ugjWorking();
M.postAt -= dt;
if (M.postAt <= 0) {
M.postAt = 30;
ugjRpc("ug_post", { p_role: "master", p_station: ugKeyOf(M.i), p_detail: {} });
}
if (!M.q) {
M.nextAt -= dt;
if (M.nextAt <= 0)
M.q = ugjMasterQuestion();
}
}
function ugjMasterSay(k) { return __ZC(128, 18, this, arguments, new.target); }
function ugjBoxOpen() { return __ZC(128, 19, this, arguments, new.target); }
function ugjBoxClose(end) { var el = document.getElementById("ugs"); if (el)
el.style.display = "none"; if (end)
UGJ.box = null; }
function ugjBoxPaint() { return __ZC(128, 20, this, arguments, new.target); }
function ugjBoxToggle(i, d) { return __ZC(128, 21, this, arguments, new.target); }
function ugjBoxTick(dt) {
var B = UGJ.box;
if (!B)
return;
if (!ugjJob("signal")) {
ugjBoxClose(true);
return;
}
ugjWorking();
if (!B.req) {
B.nextAt -= dt;
if (B.nextAt <= 0) {
var t = ugNow(), N = ugN(), i = Math.floor(t / 7) % N, d = Math.floor(t / 11) % 2, secs = 20;
B.req = { i: i, d: d, secs: secs, heldAt: 0, text: "From " + ugName(ugPrevStop(i, d)) + ": the " + UG_RAIL_NAMES[d] + " is running close behind. Hold the starting signal at " + ugName(i) + " for " + secs + " seconds, then release it." };
if (typeof playTone === "function")
playTone(880, 0.15);
}
}
UGJ.boxPaint = (UGJ.boxPaint || 0) - dt;
if (UGJ.boxPaint <= 0) {
UGJ.boxPaint = 0.5;
ugjBoxPaint();
}
}
var UGJ_FINDS = ["Rail clips all sound.", "The drain is clear.", "A cable bracket loose — chalked for the gang.", "Sleepers sound, ballast settled.", "A dripping joint in the lining — noted.", "Fishplate bolts tight."];
function ugjWalkStart(d) { return __ZC(128, 22, this, arguments, new.target); }
function ugjWalkWords() { var W = UGJ.walk; if (!W)
return ""; var n = W.spots.filter(function (s) { return s.done; }).length; return "Walking to " + ugName(W.nxt) + " · " + n + " of 5 inspected"; }
function ugjWalkProgress() { var W = UGJ.walk; return W ? (W.d === 0 ? 1 : -1) * (camera.position.x - W.base) : 0; }
function ugjWalkEnd(ok, why) {
var W = UGJ.walk;
if (!W)
return;
UGJ.walk = null;
if (W.meshes)
scene.remove(W.meshes);
ugjPrompt(null);
if (why)
ugjSay(why);
}
function ugjWalkTick(dt) {
var W = UGJ.walk;
if (!W)
return;
if (!UG2.on || UG2.ride) {
ugjWalkEnd(false, null);
return;
}
ugjWorking();
var sw = ugjWalkProgress(), dir = W.d === 0 ? 1 : -1, P = camera.position;
if (sw >= UG_SEGLEN / 2 && UG2.at === W.i) {
ugPlaceAt(W.nxt, W.base + dir * UG_SEGLEN);
ugCrowdSet();
}
if (sw < UG_SEGLEN / 2 && UG2.at === W.nxt) {
ugPlaceAt(W.i, W.base);
ugCrowdSet();
}
if (W.insp) {
W.insp.t += dt;
if (W.insp.t >= 8) {
var sp = W.insp.spot;
sp.done = true;
sp.lamp.material.color.setHex(0x4CE06A);
W.insp = null;
ugjSay("Inspected: " + esc(sp.find));
}
else {
ugjPrompt("Inspecting… " + Math.ceil(8 - W.insp.t) + " s", null);
return;
}
}
var near = null;
W.spots.forEach(function (s) { if (!s.done && Math.hypot(s.x - P.x, s.z - P.z) < 3)
near = s; });
if (near) {
ugjPrompt("A marked place — <b>press E</b> or tap to inspect it", function () { W.insp = { spot: near, t: 0 }; });
return;
}
var all = W.spots.every(function (s) { return s.done; });
if (all && sw > UG_SEGLEN - 46 && Math.abs(P.z - UG2.cz) > UG_PLAT) {
ugjPrompt("Climb up onto the platform at <b>" + esc(ugName(W.nxt)) + "</b> — <b>press E</b> or tap", ugjWalkFinish);
return;
}
ugjPrompt(null);
}
function ugjWalkFinish() { return __ZC(128, 23, this, arguments, new.target); }
function ugjPossession(d) { return !!(UGJ.walk && UGJ.walk.d === d); }
function ugjBlocked(x, z) { return __ZC(128, 24, this, arguments, new.target); }
function ugjPrompt(html, fn) {
var p = document.getElementById("ugj-prompt");
if (!p)
return;
if (!html) {
p.style.display = "none";
UGJ.promptFn = null;
return;
}
if (p.dataset.h !== html) {
p.dataset.h = html;
p.innerHTML = html;
}
p.style.display = "block";
p.onclick = fn || null;
UGJ.promptFn = fn || null;
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (typeof UG2 === "undefined" || !UG2.on) {
if (e.code === "Escape") {
if (UGJ.book)
ugbClose();
var s = document.getElementById("ugs");
if (s && s.style.display !== "none")
ugjBoxClose(false);
}
return;
}
if (UGJ.walk && e.code === "KeyE" && UGJ.promptFn) {
e.preventDefault();
e.stopImmediatePropagation();
UGJ.promptFn();
return;
}
if (UG2.ride && UG2.ride.cab === "rear" && (e.code === "KeyC" || e.code === "KeyR")) {
e.preventDefault();
e.stopImmediatePropagation();
ugjGuardKey(e.code === "KeyC" ? "close" : "ra");
}
if (e.code === "Escape") {
var s2 = document.getElementById("ugs");
if (s2 && s2.style.display !== "none")
ugjBoxClose(false);
}
}, true);
function ugjTick(dt) {
ugjOffice();
ugjKiosks();
if (UGJ.kiosks) {
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
UGJ.kiosks.visible = !!(r && (store.here || 0) === r.id && !store.inside && !(typeof UG2 !== "undefined" && UG2.on));
}
if (UGJ.book || UGJ.window)
ugLivePoll(dt);
ugbWaitTick(dt);
ugjWindowTick(dt);
ugjGuardIdle();
ugjGuardTick(dt);
ugjMasterTick(dt);
ugjBoxTick(dt);
ugjWalkTick(dt);
UGJ.paintAt -= dt;
if (UGJ.paintAt <= 0) {
UGJ.paintAt = 0.5;
if (UGJ.book)
ugbPaint();
ugjStaffPaint(false);
}
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
ugjTick(dt);
}
catch (e) {
if (window.console)
console.warn("ug jobs:", e);
} };
})();
