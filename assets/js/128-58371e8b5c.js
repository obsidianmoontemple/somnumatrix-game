/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var UGD = { on: false, test: false, job: null, d: 0, run: 0, key: "", from: 0, t0: 0, k: 0, cur: 0, s: 0, v: 0, notch: 0, rev: 1, doors: 1, doorO: 1, openT: 0, state: "dwell",
spad: false, over: 0, raMissed: false, guard: false, raSt: null, stops: [], beatAt: 0, beatBusy: false, taskOn: false, depT: 0, warnAt: 0, panel: null, pending: null, offline: false, hudOpen: false, last: null };
var UG_DRIVE_TASK = "Drive a stage between stations";
var UGD_NOTCH = ["EB", "B4", "B3", "B2", "B1", "Off", "P1", "P2", "P3", "P4"];
function ugdSay(h) { if (typeof setStatus === "function")
setStatus(h); return false; }
function ugdJob() { return (typeof ugjJob === "function") ? ugjJob("driver") : null; }
function ugdSchedArr(k) { return UGD.t0 + k * UG_SEG; }
function ugDriveTake(d, opts) { return __ZC(128, 0, this, arguments, new.target); }
function ugDriveIdle(dt) {
var P = UGD.pending;
if (P && (!UG2.on || UG2.ride)) {
UGD.pending = null;
return;
}
if (P) {
var n = ugTrainNear(UG2.at, P.d, ugNow());
if (n && !n.live && Math.abs(n.x) < 1 && n.since > 1 && n.since < UG_DWELL - 6)
ugDriveTake(P.d, { job: P.job, test: P.test });
}
if (!UGD.on && UGD.panel && UGD.panel.style.display !== "none")
UGD.panel.style.display = "none";
}
function ugDriveLeave() { return __ZC(128, 1, this, arguments, new.target); }
function ugDriveStop(silent) { return __ZC(128, 2, this, arguments, new.target); }
function ugDriveState() { return { cur: UGD.cur, s: UGD.s, open: UGD.doorO, live: null, v: UGD.v }; }
function ugdLimit() { return Math.min(ugZoneLimit(UGD.s + UG_TRAINHALF), ugZoneLimit(UGD.s - UG_TRAINHALF)); }
function ugdSignals() {
var L = UG_SEGLEN, nx = ugNextStop(UGD.cur, UGD.d);
return [{ x: 56, role: "start", st: UGD.cur, name: "starting signal" }, { x: L * 0.4, role: "block", st: nx, name: "section signal" }, { x: L - 160, role: "home", st: nx, name: "home signal" }, { x: L + 56, role: "start", st: nx, name: "starting signal" }];
}
function ugdOccupied(st) { return __ZC(128, 3, this, arguments, new.target); }
function ugDriveAspect(d, role, st, pl) { return __ZC(128, 4, this, arguments, new.target); }
function ugdAhead() {
var f = UGD.s + UG_TRAINHALF, best = null;
ugdSignals().forEach(function (g) { if (g.x > f && (!best || g.x < best.x))
best = g; });
if (best)
best.aspect = ugDriveAspect(UGD.d, best.role, best.st, 0);
return best;
}
function ugDriveNotch(n) { if (!UGD.on)
return; UGD.notch = Math.max(-5, Math.min(4, n)); ugdPanelPaint(); }
function ugDriveReverser() { return __ZC(128, 5, this, arguments, new.target); }
function ugDriveDoors() { return __ZC(128, 6, this, arguments, new.target); }
function ugStopScore(st) {
var e = Math.abs(st.err), l = Math.abs(st.late);
var acc = e <= 0.5 ? 50 : e <= 1.5 ? 40 : e <= 3 ? 30 : e <= 5 ? 20 : 0, pun = l <= 30 ? 50 : l <= 60 ? 35 : l <= 120 ? 20 : 5;
var pen = (st.spad ? 50 : 0) + Math.min(30, Math.round(st.over / UG_MPH) * 2) + (st.raMissed ? 10 : 0);
return Math.max(0, acc + pun - pen);
}
function ugdArrive(err, t) { return __ZC(128, 7, this, arguments, new.target); }
function ugdDepart(t) { return __ZC(128, 8, this, arguments, new.target); }
function ugDriveTick(dt) { return __ZC(128, 9, this, arguments, new.target); }
function ugdBeat() { return __ZC(128, 10, this, arguments, new.target); }
function ugdHudOpen() {
if (typeof DriveHUD === "undefined")
return;
try {
DriveHUD.open({ kind: "train", title: "Ring Line · " + UG_RAIL_NAMES[UGD.d], licence: null });
UGD.hudOpen = true;
}
catch (e) {
UGD.hudOpen = false;
}
}
function ugdNextWords() {
var nx = ugNextStop(UGD.cur, UGD.d);
if (UGD.state === "dwell")
return "At " + ugName(UGD.cur) + " · next " + ugName(nx);
var m = UG_SEGLEN - UGD.s;
return "Next " + ugName(nx) + " · stop mark " + (m > 0 ? Math.round(m) + " m" : Math.abs(m).toFixed(1) + " m behind you");
}
function ugdBoardAhead() {
var f = UGD.s + UG_TRAINHALF, now = ugdLimit(), best = null;
ugZones().forEach(function (z) { var x = z[0]; if (x > f && x - f < 350 && z[2] * UG_MPH < now - 0.1 && (!best || x < best.x))
best = { x: x, mph: z[2], dist: x - f }; });
return best;
}
function ugdNote() { return __ZC(128, 11, this, arguments, new.target); }
function ugdHud(lim) { return __ZC(128, 12, this, arguments, new.target); }
function ugdPanel() { return __ZC(128, 13, this, arguments, new.target); }
function ugdPanelPaint(lim) { return __ZC(128, 14, this, arguments, new.target); }
function ugdKey(k) { return __ZC(128, 15, this, arguments, new.target); }
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (!UGD.on || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
var m = { KeyW: "up", ArrowUp: "up", KeyS: "down", ArrowDown: "down", Space: "eb", KeyE: "doors", KeyO: "doors", KeyR: "rev", KeyQ: "leave" }[e.code];
if (!m)
return;
e.preventDefault();
e.stopImmediatePropagation();
if (!e.repeat)
ugdKey(m);
}, true);
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
ugDriveIdle(dt);
}
catch (e) {
if (window.console)
console.warn("ug drive:", e);
} };
})();
