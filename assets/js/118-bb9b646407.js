/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var UG2 = { on: false, g: null, mode: null, at: -1, cx: 0, cz: 0, line: null, ride: null, crowd: [], pool: [], train: [null, null], tun: [null, null], cab: [null, null], hud: null, prompt: null,
boardTex: null, boardCtx: null, boardAt: 0, tick: 0, leaving: false,
live: {}, holds: {}, posts: [], ann: [], annSeen: {}, liveAt: 0, liveBusy: false, liveBack: 0, fare: null, fareAt: 0, warp: 0, sigAt: 0 };
var UG_BASE = -160000, UG_SEG = 100, UG_DWELL = 30, UG_HEAD = 250, UG_CARS = 4, UG_CARLEN = 17, UG_PLAT = 3.9, UG_TRACKZ = 6.4, UG_LINECOL = 0xC03A2E;
var UG_RAIL_NAMES = ["Outer Rail", "Inner Rail"];
var UG_VMAX = 15.6, UG_ACC = 1, UG_RUN = UG_SEG - UG_DWELL, UG_SEGLEN = UG_VMAX * (UG_RUN - UG_VMAX / UG_ACC);
var UG_TRAINHALF = (UG_CARS - 1) / 2 * (UG_CARLEN + 0.6) + UG_CARLEN / 2, UG_MPH = 0.44704;
function ugZones() { var L = UG_SEGLEN; return [[-1e9, 100, 25], [100, L * 0.45, 40], [L * 0.45, L * 0.6, 30], [L * 0.6, L - 150, 40], [L - 150, 1e9, 25]]; }
function ugZoneLimit(x) { var Z = ugZones(); for (var i = 0; i < Z.length; i++)
if (x >= Z[i][0] && x < Z[i][1])
return Z[i][2] * UG_MPH; return 25 * UG_MPH; }
function ugLine() { return __ZC(118, 0, this, arguments, new.target); }
function ugN() { return Math.max(1, ugLine().list.length); }
function ugIndexOf(st) { var L = ugLine().list; for (var i = 0; i < L.length; i++)
if (L[i] === st || L[i].key === st.key)
return i; return -1; }
function ugName(i) { var L = ugLine().list; var s = L[((i % L.length) + L.length) % L.length]; return s ? s.name : "?"; }
function ugKeyOf(i) { var L = ugLine().list; var s = L[((i % L.length) + L.length) % L.length]; return s ? String(s.key || s.name) : "?"; }
function ugPos(i, d) { var N = ugN(); return d === 0 ? i : ((N - i) % N); }
function ugStationAt(pos, d) { var N = ugN(); pos = ((pos % N) + N) % N; return d === 0 ? pos : ((N - pos) % N); }
function ugNow() { return Date.now() / 1000 + (UG2.warp || 0); }
function ugSince(i, d, t) { var off = d ? UG_HEAD / 2 : 0; return (((t - (ugPos(i, d) * UG_SEG + off)) % UG_HEAD) + UG_HEAD) % UG_HEAD; }
function ugNextIn(i, d, t) { var s = ugSince(i, d, t); return s < UG_DWELL ? 0 : UG_HEAD - s; }
function ugNextStop(i, d) { return ugStationAt(ugPos(i, d) + 1, d); }
function ugPrevStop(i, d) { return ugStationAt(ugPos(i, d) - 1, d); }
function ugCrowdSize() { var h = typeof cityHourNow === "function" ? cityHourNow() : 12; if ((h >= 7 && h < 9.5) || (h >= 16.5 && h < 19))
return 22; if (h >= 6 && h < 22)
return 12; return 4; }
function ugTT(r) {
var ta = UG_VMAX / UG_ACC;
if (r <= 0)
return 0;
if (r >= UG_RUN)
return UG_SEGLEN;
if (r < ta)
return 0.5 * UG_ACC * r * r;
if (r > UG_RUN - ta) {
var q = UG_RUN - r;
return UG_SEGLEN - 0.5 * UG_ACC * q * q;
}
return 0.5 * UG_VMAX * ta + UG_VMAX * (r - ta);
}
function ugRunOf(i, d, tArr) { var off = d ? UG_HEAD / 2 : 0; return Math.round((tArr - ugPos(i, d) * UG_SEG - off) / UG_HEAD); }
function ugArriveAt(m, i, d) { var off = d ? UG_HEAD / 2 : 0; return off + m * UG_HEAD + ugPos(i, d) * UG_SEG; }
function ugRunCanon(m) { var R = ugN() * UG_SEG / UG_HEAD; if (R > 0 && Math.abs(R - Math.round(R)) < 1e-6) {
R = Math.round(R);
return ((m % R) + R) % R;
} return m; }
function ugTrainKey(d, m) { return d + ":" + ugRunCanon(m); }
function ugLiveS(L) { var age = Math.min(5, Math.max(0, ugNow() - L.recv)); return L.s + (L.doors ? 0 : L.v * age); }
function ugLivePoll(dt) { return __ZC(118, 1, this, arguments, new.target); }
function ugFareLoad() { return __ZC(118, 2, this, arguments, new.target); }
function ugFare() { return (typeof UG2.fare === "number") ? UG2.fare : 1; }
function ugFareWords() { var f = ugFare(); return f === 0 ? "free to ride" : (f + " gold a ride"); }
function ugHeld(i, d) { return !!UG2.holds[ugKeyOf(i) + "|" + d]; }
function ugTex(text, sub, w, h, bg, fg) { return __ZC(118, 3, this, arguments, new.target); }
function ugRoundel(text) { return __ZC(118, 4, this, arguments, new.target); }
function ugBuild() { return __ZC(118, 5, this, arguments, new.target); }
function ugTrainBuild(d) { return __ZC(118, 6, this, arguments, new.target); }
function ugCabFigure(d) { return __ZC(118, 7, this, arguments, new.target); }
function ugTunnelBuild(d) { return __ZC(118, 8, this, arguments, new.target); }
function ugTunnelsAt() {
UG2.tun.forEach(function (G, d) { if (!G)
return; G.position.set(UG2.cx, 0, UG2.cz); G.rotation.y = d ? Math.PI : 0; G.visible = UG2.on; });
}
function ugSignalsPaint() { return __ZC(118, 9, this, arguments, new.target); }
function ugSign(i) {
if (UG2.signAt === i)
return;
UG2.signAt = i;
var t = ugRoundel(ugName(i));
UG2.signs.forEach(function (p) { if (p.material.map)
p.material.map.dispose(); p.material.map = t; p.material.needsUpdate = true; });
}
function ugPlaceAt(i, x) { UG2.at = i; UG2.cx = (x === undefined || x === null) ? UG_BASE - i * 1000 : x; UG2.cz = 0; UG2.g.position.set(UG2.cx, 0, UG2.cz); ugSign(i); ugTunnelsAt(); UG2.boardAt = 0; }
function ugBoardPaint() { return __ZC(118, 10, this, arguments, new.target); }
function ugPerson(k) { return __ZC(118, 11, this, arguments, new.target); }
function ugCrowdSet() { return __ZC(118, 12, this, arguments, new.target); }
function ugCrowdTick(dt) { return __ZC(118, 13, this, arguments, new.target); }
function ugNearestDoor(x, d) {
var best = null, bd = 1e9;
(UG2.train[d] ? UG2.train[d].userData.doors : []).forEach(function (dr) { if (dr.side !== (d === 0 ? -1 : 1))
return; var q = Math.abs(dr.x - x); if (q < bd) {
bd = q;
best = dr;
} });
return best;
}
function ugTrainNear(i, d, t) { return __ZC(118, 14, this, arguments, new.target); }
function ugTrainTick(dt) { return __ZC(118, 15, this, arguments, new.target); }
function ugDoors(T, open, side) {
T.userData.open = open;
T.userData.doors.forEach(function (dr) {
var o = dr.side === side ? open : 0;
dr.l.position.x = dr.l.userData.home - o * 0.75;
dr.r.position.x = dr.r.userData.home + o * 0.75;
});
}
function ugDoorsTo(T, want, side, dt, exact) {
var o = T.userData.open || 0;
if (exact)
o = want;
else
o += Math.max(-dt / 1.2, Math.min(dt / 1.2, want - o));
ugDoors(T, o, side);
}
function ug2Enter(from) { return __ZC(118, 16, this, arguments, new.target); }
function ug2Down(i) { return __ZC(118, 17, this, arguments, new.target); }
function ug2Board(d, cab) { return __ZC(118, 18, this, arguments, new.target); }
function ug2Alight(why) { return __ZC(118, 19, this, arguments, new.target); }
function ug2Up() {
var st = ugLine().list[UG2.at];
ug2Off();
if (!st)
return;
if (st.arrive) {
st.arrive();
return;
}
if (typeof ugArrive === "function")
ugArrive(st);
}
function ug2Off() { return __ZC(118, 20, this, arguments, new.target); }
function ugRideState(R, t) { return __ZC(118, 21, this, arguments, new.target); }
function ugRideTick(dt) { return __ZC(118, 22, this, arguments, new.target); }
function ugSeatSpots() { return __ZC(118, 23, this, arguments, new.target); }
function ugSeatNear() {
var R = UG2.ride;
if (!R)
return null;
var T = UG2.train[R.d];
if (!T)
return null;
var lx = camera.position.x - T.position.x, lz = camera.position.z - T.position.z, best = null, bd = 1.1;
ugSeatSpots().forEach(function (p) { var d = Math.hypot(lx - p.x, lz - p.z); if (d < bd) {
bd = d;
best = p;
} });
return best;
}
function ugSit(p) {
var R = UG2.ride;
if (!R || !p)
return;
R.sit = p;
yaw = p.sd > 0 ? 0 : Math.PI;
pitch = 0;
setStatus("<b>Seated.</b> Press E to stand up again when your stop comes.");
}
function ugStand() {
var R = UG2.ride;
if (!R || !R.sit)
return;
var p = R.sit;
R.sit = null;
var T = UG2.train[R.d];
if (T) {
camera.position.x = T.position.x + p.x;
camera.position.z = T.position.z + p.z * 0.4;
}
}
if (typeof rideSeatNow === "function") {
var ugSeatRs = rideSeatNow;
rideSeatNow = function () { if (UG2.on && UG2.ride && UG2.ride.sit && walkMode)
return -0.55; return ugSeatRs.apply(this, arguments); };
}
function ugHudEl() { return __ZC(118, 24, this, arguments, new.target); }
function ugPrompt(html, fn) { ugHudEl(); var p = UG2.prompt; if (!html) {
p.style.display = "none";
UG2.promptFn = null;
return;
} if (p.dataset.h !== html) {
p.dataset.h = html;
p.innerHTML = html;
} p.style.display = "block"; p.onclick = fn; UG2.promptFn = fn; }
function ugAnnouncement() {
var key = ugKeyOf(UG2.at), best = null;
(UG2.ann || []).forEach(function (a) { if (a.station === key && (+a.age || 0) < 20)
best = a; });
if (best && !UG2.annSeen[best.id]) {
UG2.annSeen[best.id] = 1;
if (typeof playTone === "function")
playTone(880, 0.2);
}
return best;
}
function ug2Tick(dt) {
if (!UG2.on)
return;
if (!walkMode) {
return;
}
ugHudEl();
ugLivePoll(dt);
if (scene && scene.fog)
scene.fog.density = Math.min(scene.fog.density, 0.003);
if (typeof sun !== "undefined" && sun)
sun.intensity = 0.08;
if (typeof hemi !== "undefined" && hemi) {
hemi.intensity = 0.95;
hemi.color.setHex(0xFFF2DA);
if (hemi.groundColor)
hemi.groundColor.setHex(0x8A8070);
}
var t = ugNow(), P = camera.position, info = null;
if (UG2.ride && UG2.ride.drive && typeof ugDriveTick === "function")
ugDriveTick(dt);
if (UG2.ride)
info = ugRideTick(dt);
var i = UG2.at;
ugTrainTick(dt);
ugCrowdTick(dt);
UG2.sigAt -= dt;
if (UG2.sigAt <= 0) {
UG2.sigAt = 0.25;
ugSignalsPaint();
}
UG2.boardAt -= dt;
if (UG2.boardAt <= 0) {
UG2.boardAt = 1;
ugBoardPaint();
}
var h, an = ugAnnouncement();
if (UG2.ride && info)
h = "<b>" + UG_RAIL_NAMES[UG2.ride.d] + "</b> · " + (info.atPlat ? "at <b>" + esc(ugName(info.cur)) + "</b>" : "next stop <b>" + esc(ugName(info.nxt)) + "</b>") +
(info.live && !UG2.ride.drive ? " · <span style='color:#E8C27A'>driven by " + esc(info.live.driver) + "</span>" : "");
else
h = "<b>" + esc(ugName(i)) + "</b> · " + [0, 1].map(function (d) { var n = ugNextIn(i, d, t); return UG_RAIL_NAMES[d] + " to " + esc(ugName(ugNextStop(i, d))) + ": " + (n <= 0 ? "<b style='color:#8FCB8A'>at the platform</b>" : (n < 60 ? Math.ceil(n) + " s" : Math.ceil(n / 60) + " min")); }).join(" · ");
if (an)
h += "<div style='color:#E8C27A'>“" + esc(an.body) + "”</div>";
if (UG2.hud.dataset.h !== h) {
UG2.hud.dataset.h = h;
UG2.hud.innerHTML = h;
}
UG2.hud.style.display = "block";
var lx = P.x - UG2.cx, lz = P.z - UG2.cz;
if (UG2.ride) {
var uSeat = (!UG2.ride.cab && !UG2.ride.drive && !UG2.ride.sit) ? ugSeatNear() : null;
if (!UG2.ride.cab && info && info.open > 0.6 && !uSeat)
ugPrompt("Doors open at <b>" + esc(ugName(info.cur)) + "</b> — <b>press E</b> or tap to get off", function () { ug2Alight(); });
else if (UG2.ride.sit)
ugPrompt(info && info.open > 0.6 ? "Doors open at <b>" + esc(ugName(info.cur)) + "</b> — <b>press E</b> or tap to stand up" : "<b>press E</b> or tap to stand up", ugStand);
else if (uSeat)
ugPrompt("<b>An empty seat</b> — <b>press E</b> or tap to sit down", function () { ugSit(uSeat); });
else
ugPrompt(null);
}
else if (Math.abs(lx) > 41.5 && Math.abs(lz) < 2.5) {
ugPrompt("<b>Way out</b> — up to the " + (ugLine().list[i] && ugLine().list[i].ring === "mall" ? "World Mall" : "street") + " · <b>press E</b> or tap", ug2Up);
}
else {
var near = null;
[0, 1].forEach(function (d) { var sd = d === 0 ? 1 : -1, T = UG2.train[d]; if (!T || !T.visible || (T.userData.open || 0) < 0.6)
return; if (Math.abs(lz - sd * (UG_PLAT - 0.5)) > 1.6)
return; if (ugNearestDoor(lx - (T.position.x - UG2.cx), d) && Math.abs(ugNearestDoor(lx - (T.position.x - UG2.cx), d).x - (lx - (T.position.x - UG2.cx))) < 2.2)
near = d; });
if (near !== null)
ugPrompt("Board the " + UG_RAIL_NAMES[near] + " to <b>" + esc(ugName(ugNextStop(i, near))) + "</b> — <b>press E</b> or tap", function () { ug2Board(near); });
else
ugPrompt(null);
}
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (!UG2.on || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if ((e.code === "KeyE" || e.code === "KeyU" || e.code === "Enter") && UG2.promptFn) {
e.preventDefault();
e.stopImmediatePropagation();
UG2.promptFn();
}
}, true);
(function () {
if (typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (!UG2.on || x > UG_BASE + 30000)
return ba(x, z, feet);
if (UG2.ride) {
var T = UG2.train[UG2.ride.d], lx = x - T.position.x, lz = z - T.position.z, half = UG_CARS * (UG_CARLEN + 0.6) / 2 - 0.6;
if (Math.abs(lx) < half && Math.abs(lz) < 1.2)
return false;
if ((T.userData.open || 0) > 0.6 && Math.abs(T.position.x - UG2.cx) < 6) {
var pz = z - UG2.cz, px = x - UG2.cx;
if (Math.abs(pz) < UG_PLAT - 0.2 && Math.abs(px) < 46)
return false;
var dr = ugNearestDoor(lx, UG2.ride.d);
if (dr && Math.abs(lx - dr.x) < 0.75)
return false;
}
return true;
}
if (typeof ugjBlocked === "function") {
var w = ugjBlocked(x, z);
if (w !== null && w !== undefined)
return w;
}
var px2 = x - UG2.cx, pz2 = z - UG2.cz;
if (Math.abs(px2) < 46 && Math.abs(pz2) < UG_PLAT - 0.2)
return false;
for (var d = 0; d < 2; d++) {
var T2 = UG2.train[d], sd = d === 0 ? 1 : -1;
if (!T2 || !T2.visible || (T2.userData.open || 0) < 0.6 || Math.abs(T2.position.x - UG2.cx) > 6)
continue;
var dr2 = ugNearestDoor(px2 - (T2.position.x - UG2.cx), d);
if (dr2 && Math.abs(px2 - (T2.position.x - UG2.cx) - dr2.x) < 0.75 && sd * pz2 > 0 && sd * pz2 < UG_TRACKZ + 1.2) {
if (sd * pz2 > UG_TRACKZ - 1.4) {
ug2Board(d);
}
return false;
}
}
return true;
};
})();
(function () {
ugShow = function (from) { if (UG2.on)
return; if (typeof ugBooking === "function")
ugBooking(from);
else
ug2Enter(from); };
})();
if (typeof backRegister === "function")
backRegister({ order: 5, open: function () { return UG2.on && walkMode; }, close: function () {
if (UG2.ride && UG2.ride.drive) {
if (typeof ugDriveLeave === "function")
ugDriveLeave();
return;
}
if (UG2.ride && UG2.ride.cab) {
if (typeof ugjLeaveCab === "function")
ugjLeaveCab();
return;
}
if (UG2.ride) {
setStatus("The train is moving. Step off at the next stop.");
return;
}
ug2Up();
} });
["visitRealm", "toSomnucor", "toHall", "newDream"].forEach(function (n) {
if (typeof window[n] !== "function")
return;
var f = window[n];
window[n] = function () { if (UG2.on)
ug2Off(); return f.apply(this, arguments); };
});
(function () {
var sw = setWalk;
setWalk = function (on) { var r = sw.apply(this, arguments); if (!on && UG2.on) {
if (UG2.hud)
UG2.hud.style.display = "none";
if (UG2.prompt)
UG2.prompt.style.display = "none";
} return r; };
})();
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
ug2Tick(dt);
}
catch (e) {
if (window.console)
console.warn("ug:", e);
} };
})();
