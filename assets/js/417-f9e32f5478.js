/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var AIC = { b: null, at: 0, tickAt: 0, missing: false, busy: false, lastN: {}, dock: null, dockFor: null, cells: {}, gaolFor: null, sig: "", told: 0 };
var AIC_PHASE = { listed: "listed", called: "called: the defendant to the dock", plea: "the plea", prosecution: "the case for Somnucor", defence: "the defence",
evidence: "the evidence", deliberation: "the verdict", decided: "decided", appeal: "the appeal" };
var AIC_LIVE = { called: 1, plea: 1, prosecution: 1, defence: 1, evidence: 1, deliberation: 1, appeal: 1 };
function aicInGaol() { return !!(store.inside && INT && INT.spec && INT.spec.workplace === "The Gaol"); }
function aicSession() { var s = AIC.b && AIC.b.session; return s && !(COURT.now && COURT.now.session) ? s : null; }
function aicWho(l) {
var names = (AIC.b && AIC.b.names) || {};
if (l.role && names[l.role] === l.name && typeof courtStandinName === "function")
return courtStandinName(l.role);
return l.name || "";
}
function aicRefresh(force) {
if (AIC.missing || AIC.busy || !(typeof signedIn === "function" && signedIn()))
return;
var every = inCourthouse() || aicInGaol() ? 5000 : (COURT.open ? 15000 : 60000);
if (!force && Date.now() - AIC.at < every)
return;
AIC.at = Date.now();
AIC.busy = true;
cityRpc("ai_court_board").then(function (b) { AIC.busy = false; if (b && b.ok)
aicTake(b); })
.catch(function (e) { AIC.busy = false; if (rpcMissing(e))
AIC.missing = true; });
}
function aicTake(b) { return __ZC(417, 0, this, arguments, new.target); }
function aicLines(s) { return __ZC(417, 1, this, arguments, new.target); }
function aicSpeak(l) { return __ZC(417, 2, this, arguments, new.target); }
function aicFigure(p, tagText, seat) { return __ZC(417, 3, this, arguments, new.target); }
function aicDrop(f) { if (!f)
return; if (f.bub)
dropTag(f.bub); if (f.g && f.g.parent)
f.g.parent.remove(f.g); }
function aicDockSync() { return __ZC(417, 4, this, arguments, new.target); }
function aicCellText(p) {
var t = p.name + " · " + p.charge;
if (p.status === "serving" && p.release_at)
t += " · out at " + courtTime(p.release_at);
else if (p.hearing_at)
t += " · court at " + courtTime(p.hearing_at);
else
t += " · awaiting the court";
return t;
}
function aicCellsSync() { return __ZC(417, 5, this, arguments, new.target); }
(function () {
if (typeof courtPaint !== "function" || typeof courtPaintSession !== "function")
return;
var cp = courtPaint;
courtPaint = function () {
cp.apply(this, arguments);
var tabs = document.querySelector(".tabs [data-ctab]");
tabs = tabs && tabs.parentNode;
if (!tabs || tabs.querySelector('[data-ctab="gaol"]'))
return;
[["gaol", "The Gaol"], ["record", "The record"]].forEach(function (t) {
var b = document.createElement("button");
b.className = "btn" + (COURT.tab === t[0] ? " on" : "");
b.setAttribute("data-ctab", t[0]);
b.textContent = t[1];
b.onclick = function () { COURT.tab = t[0]; aicRefresh(true); courtPaint(); };
tabs.appendChild(b);
});
};
var ps = courtPaintSession;
courtPaintSession = function (body) {
if (COURT.tab === "gaol")
return aicPaintGaol(body);
if (COURT.tab === "record")
return aicPaintRecord(body);
var s = aicSession();
if (!s)
return ps.apply(this, arguments);
aicPaintSession(body, s);
};
})();
function aicLn(l) { return '<div class="ln"><b>' + esc(COURT_ROLE_WORDS[l.role] || l.role) + '</b>' + (l.name ? ' <span class="dim">(' + esc(aicWho(l)) + ')</span>' : '') + ' ' + esc(l.body) + '</div>'; }
function aicPaintSession(body, s) { return __ZC(417, 6, this, arguments, new.target); }
function aicDo(name, args) { return __ZC(417, 7, this, arguments, new.target); }
function aicWire(body, s) { return __ZC(417, 8, this, arguments, new.target); }
function aicPaintGaol(body) { return __ZC(417, 9, this, arguments, new.target); }
function aicPaintRecord(body) { return __ZC(417, 10, this, arguments, new.target); }
function aicTick(dt) {
if (AIC.missing || !(typeof signedIn === "function" && signedIn()))
return;
if (!(typeof inCityNow === "function" && inCityNow())) {
if (AIC.dock) {
aicDrop(AIC.dock);
AIC.dock = null;
}
return;
}
if (Date.now() - AIC.tickAt > 30000) {
AIC.tickAt = Date.now();
cityRpc("ai_court_tick").catch(function (e) { if (rpcMissing(e))
AIC.missing = true; });
}
aicRefresh(false);
if (AIC.dock && AIC.dock.bub) {
AIC.dock.left -= dt;
if (AIC.dock.left <= 0) {
dropTag(AIC.dock.bub);
AIC.dock.bub = null;
}
}
if (AIC.dock && (!inCourthouse() || AIC.dockFor !== INT)) {
aicDrop(AIC.dock);
AIC.dock = null;
}
if (AIC.gaolFor && AIC.gaolFor !== (aicInGaol() ? INT : null))
aicCellsSync();
if (!AIC.gaolFor && aicInGaol())
aicCellsSync();
if (!AIC.dock && inCourthouse() && aicSession())
aicDockSync();
}
(function () {
if (typeof atlLifeTick !== "function")
return;
var al = atlLifeTick;
atlLifeTick = function (dt) { al(dt); try {
aicTick(dt);
}
catch (e) {
if (window.console)
console.warn("ai court:", e);
} };
})();
(function () {
if (typeof bringOccupants !== "function")
return;
var bo = bringOccupants;
bringOccupants = function () { bo.apply(this, arguments); try {
if (inCourthouse() || aicInGaol()) {
AIC.at = 0;
aicRefresh(true);
}
}
catch (e) { } };
})();
