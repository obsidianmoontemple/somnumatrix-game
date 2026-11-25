/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(128, function () {
"use strict";
return [
function (d, opts) {
opts = opts || {};
if (!UG2.on || UG2.ride)
return ugdSay("Stand on the platform to take a train.");
var test = !!opts.test || (typeof UGJ !== "undefined" && UGJ.test), job = opts.job || ugdJob();
if (!job && !test)
return ugdSay("Clock in as an <b>Underground train driver</b> first, inside your hours (Your work).");
var t = ugNow(), i = UG2.at, n = ugTrainNear(i, d, t), since, tArr;
if (n && n.live)
return ugdSay("A dreamer is already driving that train. Take the next one.");
if (n && !n.live && Math.abs(n.x) < 1 && n.since < UG_DWELL - 3) {
since = n.since;
tArr = n.tArr;
}
else if (opts.force) {
since = 2;
tArr = t - 2;
}
else {
UGD.pending = { d: d, job: job, test: test };
return ugdSay("Your train on the <b>" + UG_RAIL_NAMES[d] + "</b> is due in " + Math.ceil(ugNextIn(i, d, t)) + " s. Wait on the platform: you will take it when it comes in.");
}
UGD.pending = null;
var run = ugRunOf(i, d, tArr);
UGD.on = true;
UGD.test = test;
UGD.job = job;
UGD.d = d;
UGD.run = run;
UGD.key = ugTrainKey(d, run);
UGD.from = i;
UGD.t0 = tArr;
UGD.k = 0;
UGD.cur = i;
UGD.s = 0;
UGD.s0 = 0;
UGD.v = 0;
UGD.notch = -4;
UGD.rev = 1;
UGD.doors = 1;
UGD.doorO = 1;
UGD.openT = t - since;
UGD.state = "dwell";
UGD.spad = false;
UGD.over = 0;
UGD.raMissed = false;
UGD.guard = false;
UGD.raSt = null;
UGD.taskOn = false;
UGD.offline = false;
UGD.beatAt = 0;
UG2.ride = { d: d, from: i, t0: tArr, key: UGD.key, drive: true, cab: "front", seg: i, base: UG2.cx, lastPos: "" };
UG2.mode = "riding";
yaw = d === 0 ? -Math.PI / 2 : Math.PI / 2;
pitch = -0.04;
ugdHudOpen();
ugdPanel();
if (typeof playTone === "function")
playTone(440, 0.3);
ugdSay("<b>In the cab</b> — " + UG_RAIL_NAMES[d] + " at <b>" + esc(ugName(i)) + "</b>. Shut the doors (E), wait for the green, and take her to <b>" + esc(ugName(ugNextStop(i, d))) + "</b>. " +
(test ? "<i>Practice run: nothing is recorded.</i>" : ""));
return true;
},
function () {
if (!UGD.on)
return;
if (UGD.v > 0.05 || UGD.doors !== 1)
return ugdSay("Stop at a platform and open the doors before you hand the train over.");
ugDriveStop(false);
if (UG2.ride)
ug2Alight("You hand the train over to a stand-in driver, and step down onto the platform at <b>" + esc(ugName(UG2.at)) + "</b>.");
},
function (silent) {
if (!UGD.on) {
UGD.pending = null;
return;
}
UGD.on = false;
UGD.pending = null;
if (!UGD.test && !UGD.offline && typeof signedIn === "function" && signedIn())
cityRpc("ug_drive_end", {}).catch(function () { });
if (UGD.hudOpen && typeof DriveHUD !== "undefined")
try {
DriveHUD.close();
}
catch (e) { }
UGD.hudOpen = false;
if (UGD.panel)
UGD.panel.style.display = "none";
if (UG2.ride && UG2.ride.drive) {
if (silent)
UG2.ride = null;
else
UG2.ride.drive = false;
}
},
function (st) {
var d = UGD.d, t = ugNow(), busy = false;
Object.keys(UG2.live).forEach(function (k) {
if (k === UGD.key)
return;
var L = UG2.live[k];
if (L.d !== d)
return;
var s = ugLiveS(L);
if ((L.cur === st && s < UG_TRAINHALF + 70) || (ugNextStop(L.cur, d) === st && UG_SEGLEN - s < 90))
busy = true;
});
var since = ugSince(st, d, t);
if (since < UG_DWELL + 8 && ugTrainKey(d, ugRunOf(st, d, t - since)) !== UGD.key && !UG2.live[ugTrainKey(d, ugRunOf(st, d, t - since))])
busy = true;
return busy;
},
function (d, role, st, pl) {
if (!UGD.on || d !== UGD.d)
return null;
var t = ugNow(), nx = ugNextStop(UGD.cur, d);
if (role === "start") {
if (st === UGD.cur) {
if (UGD.state === "run")
return UGD.s + UG_TRAINHALF < 60 ? "G" : "R";
var shut = UGD.doors === 0 && UGD.doorO < 0.02, time = t >= ugdSchedArr(UGD.k) + UG_DWELL - 1 || t - UGD.openT >= UG_DWELL;
return (shut && time && !ugHeld(st, d)) ? "G" : "R";
}
return "R";
}
if (role === "home") {
if (st !== nx)
return "R";
return ugdOccupied(nx) ? "R" : "Y";
}
return "G";
},
function () {
if (!UGD.on)
return;
if (UGD.v > 0.05)
return ugdSay("Bring the train to a stand before you move the reverser.");
if (UGD.doors)
return ugdSay("Shut the doors first.");
UGD.rev = -UGD.rev;
ugdSay(UGD.rev < 0 ? "<b>Reverser to reverse.</b> Set back gently — walking pace at most." : "<b>Reverser to forward.</b>");
ugdPanelPaint();
},
function () {
if (!UGD.on)
return;
var t = ugNow();
if (UGD.v > 0.05)
return ugdSay("Stop the train before you touch the doors.");
if (UGD.doors) {
if (t - UGD.openT < (UGD.test ? 3 : 10))
return ugdSay("Give the passengers a moment: ten seconds at least with the doors open.");
UGD.doors = 0;
if (typeof playTone === "function")
playTone(600, 0.25);
ugdSay("<b>Doors shut.</b> Wait for the starting signal to clear" + (UGD.guard ? " and the guard's right away" : "") + ".");
ugdPanelPaint();
return;
}
if (UGD.state === "dwell") {
if (Math.abs(UGD.s) > 5)
return ugdSay("You are off the stop mark. Draw up to it first.");
UGD.doors = 1;
UGD.openT = t;
ugdPanelPaint();
return;
}
var err = UGD.s - UG_SEGLEN;
if (err > 5)
return ugdSay("Overrun by <b>" + err.toFixed(1) + " m</b>. Reverser to reverse (R), and set back to the stop mark.");
if (err < -5)
return ugdSay("Not at the mark yet: <b>" + (-err).toFixed(1) + " m</b> to go. Draw up.");
UGD.doors = 1;
UGD.openT = t;
if (typeof playTone === "function")
playTone(740, 0.25);
ugdArrive(err, t);
ugdPanelPaint();
},
function (err, t) {
var from = UGD.cur, to = ugNextStop(from, UGD.d), late = t - ugdSchedArr(UGD.k + 1);
var stop = { from: from, to: to, err: err, late: late, spad: UGD.spad, over: UGD.over, raMissed: UGD.raMissed, at: t };
stop.score = ugStopScore(stop);
UGD.stops.push(stop);
UGD.last = stop;
UGD.k++;
UGD.cur = to;
UGD.s = err;
UGD.s0 = err;
UGD.state = "dwell";
UGD.spad = false;
UGD.over = 0;
UGD.raMissed = false;
UGD.rev = 1;
var words = "<b>" + esc(ugName(to)) + "</b> — stopped " + Math.abs(err).toFixed(1) + " m " + (err >= 0 ? "past" : "short of") + " the mark, " +
(Math.abs(late) < 5 ? "right on time" : Math.round(Math.abs(late)) + " s " + (late > 0 ? "late" : "early")) + ". Score <b>" + stop.score + "</b>.";
ugdSay(words);
if (UGD.test || UGD.offline || !(typeof signedIn === "function" && signedIn()))
return;
cityRpc("ug_stop_report", { p_d: UGD.d, p_run: ugRunCanon(UGD.run), p_station: ugKeyOf(to), p_err: +err.toFixed(2), p_late: Math.round(late), p_spad: stop.spad, p_over: +stop.over.toFixed(2), p_ra_missed: stop.raMissed })
.then(function (o) { if (o && typeof o.score === "number")
stop.score = o.score; }).catch(function () { });
if (UGD.taskOn && UGD.job) {
UGD.taskOn = false;
cityRpc("do_task", { p_job: UGD.job.job_id, p_task: UG_DRIVE_TASK, p_ref: (ugName(from) + " to " + ugName(to)).slice(0, 120) }).then(function (o) {
if (o && o.ok) {
ugdSay(words + " The stage counts toward your work.");
if (typeof workRefresh === "function")
workRefresh(true);
}
else
ugdSay(words + " " + esc((o && o.say) || "That stage did not count."));
}).catch(function () { });
}
},
function (t) {
UGD.state = "run";
UGD.depT = t;
if (UGD.guard && UGD.raSt !== UGD.cur)
UGD.raMissed = true;
if (UGD.test || UGD.offline || !UGD.job || !(typeof signedIn === "function" && signedIn())) {
UGD.taskOn = !!UGD.test;
return;
}
cityRpc("start_task", { p_job: UGD.job.job_id, p_task: UG_DRIVE_TASK }).then(function (o) { UGD.taskOn = !!(o && o.ok); if (!(o && o.ok) && o && o.say)
ugdSay(esc(o.say)); }).catch(function () { });
},
function (dt) {
if (!UGD.on)
return;
dt = Math.min(dt, 0.5);
var t = ugNow(), v = UGD.v, a;
UGD.doorO += Math.max(-dt / 1.2, Math.min(dt / 1.2, UGD.doors - UGD.doorO));
if (UGD.notch === -5)
a = -1.6;
else if (UGD.notch < 0)
a = 0.28 * UGD.notch;
else if (UGD.notch > 0)
a = (UGD.doors || UGD.doorO > 0.01) ? 0 : 0.32 * UGD.notch * Math.max(0, 1 - v / 22);
else
a = -0.03;
v = Math.max(0, v + a * dt);
if (UGD.rev < 0)
v = Math.min(v, 2.5);
var s0 = UGD.s;
UGD.s += UGD.rev * v * dt;
UGD.v = v;
if (UGD.rev > 0) {
var f0 = s0 + UG_TRAINHALF, f1 = UGD.s + UG_TRAINHALF;
ugdSignals().forEach(function (g) {
if (f0 < g.x && g.x <= f1 && ugDriveAspect(UGD.d, g.role, g.st, 0) === "R") {
UGD.spad = true;
UGD.notch = -5;
if (typeof playTone === "function")
playTone(220, 0.8);
ugdSay("<b>Signal passed at danger!</b> The train has braked itself. It goes on your record.");
}
});
}
var lim = ugdLimit();
if (v > lim + 0.9) {
UGD.over = Math.max(UGD.over, v - lim);
if (t - UGD.warnAt > 2) {
UGD.warnAt = t;
if (typeof playTone === "function")
playTone(1200, 0.12);
}
}
if (UGD.state === "dwell" && UGD.doors === 0 && UGD.rev > 0 && UGD.s > UGD.s0 + 1)
ugdDepart(t);
if (UGD.state === "dwell" && UGD.s > UG_SEGLEN * 0.5)
UGD.state = "run";
if (typeof WORK !== "undefined")
WORK.lastWork = Date.now();
UGD.beatAt -= dt;
if (UGD.beatAt <= 0) {
UGD.beatAt = 1;
ugdBeat();
}
ugdHud(lim);
},
function () {
if (UGD.test || UGD.offline || UGD.beatBusy || !(typeof signedIn === "function" && signedIn()))
return;
UGD.beatBusy = true;
cityRpc("ug_drive_beat", { p_d: UGD.d, p_run: ugRunCanon(UGD.run), p_from: UGD.from, p_t0: UGD.t0, p_cur: UGD.cur, p_s: +UGD.s.toFixed(2), p_v: +(UGD.v * UGD.rev).toFixed(2), p_doors: UGD.doors > 0 || UGD.doorO > 0.02 })
.then(function (o) {
UGD.beatBusy = false;
if (!o)
return;
if (!o.ok) {
ugdSay(esc(o.say || "The line would not take your train."));
if (/Another driver|Clock in/.test(o.say || "") && UGD.v < 0.05 && UGD.doors)
ugDriveLeave();
return;
}
UGD.guard = !!o.guard;
UGD.raSt = (o.ra === null || o.ra === undefined) ? null : +o.ra;
})
.catch(function () { UGD.beatBusy = false; UGD.offline = true; ugdSay("The line's signal box cannot be reached: you are driving on your own (passengers will not see it)."); });
},
function () {
var g = ugdAhead(), t = ugNow(), w = [], bd = ugdBoardAhead();
if (bd)
w.push(bd.mph + " board in " + Math.round(bd.dist) + " m");
if (g)
w.push(g.name + " " + Math.round(g.x - (UGD.s + UG_TRAINHALF)) + " m: " + ({ R: "danger", Y: "caution", G: "clear" }[g.aspect] || "?"));
var late = UGD.state === "dwell" ? t - (ugdSchedArr(UGD.k) + UG_DWELL) : t - ugdSchedArr(UGD.k + 1) - 0;
if (UGD.state === "dwell")
w.push(late < 0 ? "depart in " + Math.ceil(-late) + " s" : Math.round(late) + " s behind time");
w.push(UGD.doors ? "doors open" : "doors shut");
if (UGD.guard)
w.push(UGD.raSt === UGD.cur ? "guard: right away" : "guard aboard");
if (UGD.rev < 0)
w.push("REVERSE");
return w.join(" · ");
},
function (lim) {
if (UGD.hudOpen && typeof DriveHUD !== "undefined") {
try {
DriveHUD.update({ speed: UGD.v, limit: lim, throttle: UGD.notch > 0 ? UGD.notch / 4 : 0, brake: UGD.notch < 0 ? (UGD.notch === -5 ? 1 : -UGD.notch / 4) : 0,
gear: (UGD.rev < 0 ? "R " : "") + UGD_NOTCH[UGD.notch + 5], heading: null, next: ugdNextWords(), note: ugdNote() });
}
catch (e) { }
}
ugdPanelPaint(lim);
},
function () {
if (!UGD.panel) {
var p = document.createElement("div");
p.id = "ugd";
p.style.cssText = "position:fixed;left:50%;bottom:calc(14px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:48;background:rgba(8,10,16,.94);" +
"border:1px solid #C03A2E;border-radius:6px;padding:8px 10px;font:13px var(--sans,system-ui);color:var(--bone,#E8E2D2);max-width:calc(100vw - 24px);text-align:center";
p.innerHTML = '<div id="ugd-read" style="margin-bottom:6px;line-height:1.5"></div><div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center">' +
'<button class="btn" data-u="up">Power + (W)</button><button class="btn" data-u="down">Brake (S)</button><button class="btn" data-u="eb">Emergency (Space)</button>' +
'<button class="btn" data-u="doors">Doors (E)</button><button class="btn" data-u="rev">Reverser (R)</button><button class="btn" data-u="leave">Hand over (Q)</button></div>';
document.body.appendChild(p);
UGD.panel = p;
Array.prototype.forEach.call(p.querySelectorAll("[data-u]"), function (b) { b.onclick = function () { ugdKey(b.getAttribute("data-u")); }; });
}
UGD.panel.style.display = "block";
ugdPanelPaint();
},
function (lim) {
if (!UGD.panel || !UGD.on)
return;
var r = document.getElementById("ugd-read");
if (!r)
return;
if (lim === undefined)
lim = ugdLimit();
var mph = Math.round(UGD.v / UG_MPH), lm = Math.round(lim / UG_MPH), h;
if (UGD.hudOpen)
h = "<b>" + UGD_NOTCH[UGD.notch + 5] + "</b> · " + esc(ugdNextWords());
else
h = "<b style='font-size:16px;color:" + (UGD.v > lim + 0.9 ? "#E0603A" : "#F4F0E6") + "'>" + mph + " mph</b> <span style='color:var(--dim,#9A968A)'>limit " + lm + "</span> · lever <b>" + UGD_NOTCH[UGD.notch + 5] + "</b>" +
"<br>" + esc(ugdNextWords()) + "<br><span style='color:#E8C27A'>" + esc(ugdNote()) + "</span>";
if (UGD.last)
h += "<br><span style='color:var(--dim,#9A968A)'>Last stop: " + Math.abs(UGD.last.err).toFixed(1) + " m from the mark, " + Math.round(UGD.last.late) + " s · score " + UGD.last.score + "</span>";
if (r.dataset.h !== h) {
r.dataset.h = h;
r.innerHTML = h;
}
},
function (k) {
if (!UGD.on)
return;
if (k === "up")
ugDriveNotch(UGD.notch === -5 ? -4 : UGD.notch + 1);
else if (k === "down")
ugDriveNotch(Math.max(-4, UGD.notch - 1));
else if (k === "eb")
ugDriveNotch(-5);
else if (k === "doors")
ugDriveDoors();
else if (k === "rev")
ugDriveReverser();
else if (k === "leave")
ugDriveLeave();
}
];
});
