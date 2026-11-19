/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CHAUF = { name: null, roster: null, rosterAt: 0, dec: null, decAt: 0, holdT: 0, note: "", out: { f: 0, s: 0, kb: false, hand: false, up: false, down: false },
last: 0, lastDelta: 0, stopNow: false, crashAt: 0, figFor: null, obs: [], warned: false, said: null };
var CHAUF_NAMES = ["Alistair Penhaligon", "Marguerite Okafor", "Desmond Achterberg", "Imogen Featherstonehaugh", "Rafael Quintero",
"Henrietta Blackwood", "Tobias Lindqvist", "Constance Adeyemi", "Bartholomew Crane", "Ottilie Marchbanks"];
var CHAUF_SKILL = 1;
var CHAUF_BRAKE = 2.6;
var CHAUF_LICENCE = "Full driving licence, Somnucor Licensing Office (Civic Ring): theory 10 of 10, practical passed with no faults · chauffeur's advanced certificate";
function chaufLocal() {
if (CHAUF.local)
return CHAUF.local;
var L = null;
try {
L = JSON.parse(localStorage.getItem("somnu.chauffeurs") || "null");
}
catch (e) { }
if (!Array.isArray(L))
L = [];
CHAUF.local = L;
chaufLocalSettle();
return L;
}
function chaufLocalSave() { try {
localStorage.setItem("somnu.chauffeurs", JSON.stringify(CHAUF.local));
}
catch (e) { } }
function chaufLocalSettle() { return __ZC(243, 0, this, arguments, new.target); }
function chaufActive() { return __ZC(243, 1, this, arguments, new.target); }
function chaufRosterFetch(force) { return __ZC(243, 2, this, arguments, new.target); }
(function () {
if (typeof tglChauffeur !== "function")
return;
tglChauffeur = function () {
var nm = chaufActive().name, id = "tgl_chauffeur_" + nm.replace(/[^A-Za-z]/g, "").toLowerCase();
var L = typeof randomLook === "function" ? randomLook(id, "human") : blankLook("human");
if (typeof jobDress === "function")
jobDress(L, "Chauffeur", "The Somnucor Tower");
L.top = 0x15161C;
L.bottom = 0x15161C;
L.hat = "cap";
L.hatColor = 0x15161C;
var fg = buildFigure({ id: id, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
fg.traverse(function (m) { m.raycast = function () { }; });
CHAUF.figFor = nm;
return fg;
};
})();
function chaufDress() { return __ZC(243, 3, this, arguments, new.target); }
(function () {
if (typeof hasLicence === "function") {
var hl = hasLicence;
hasLicence = function (kind) { if (kind === "driving" && typeof TGL !== "undefined" && TGL.auto)
return true; return hl.apply(this, arguments); };
}
if (typeof licenceStatusFor === "function") {
var ls = licenceStatusFor;
licenceStatusFor = function (kind) {
if (kind === "driving" && typeof TGL !== "undefined" && TGL.auto)
return { word: "Licensed chauffeur · " + chaufActive().name, cls: "ok" };
return ls.apply(this, arguments);
};
}
})();
function chaufLeg(i, A, B, out, park) { return __ZC(243, 4, this, arguments, new.target); }
(function () {
if (typeof tglRoute !== "function")
return;
tglRoute = function (from, to) {
var W = [], i = tglRingIdx(from.x, from.z), j = tglRingIdx(to.x, to.z), cur = { x: from.x, z: from.z };
while (i !== j) {
var up = j < i, gi = up ? i - 1 : i;
var gs = garList().filter(function (g) { return g.i === gi; }), pc = tglPolar(cur.x, cur.z), best = null, bd = 1e9;
gs.forEach(function (g) { var dd = Math.abs(Math.atan2(Math.sin(g.a - pc.a), Math.cos(g.a - pc.a))); if (dd < bd) {
bd = dd;
best = g;
} });
if (!best)
break;
var fromP = up ? tglXZ(best.a, best.rl) : tglXZ(best.a, best.ru), toP = up ? tglXZ(best.a, best.ru) : tglXZ(best.a, best.rl);
chaufLeg(i, cur, fromP, W, false);
W.push({ lift: true, to: toP, a: best.a, ring: ATL_RINGS[up ? i - 1 : i + 1].name, outward: !up });
cur = toP;
i = up ? i - 1 : i + 1;
}
chaufLeg(i, cur, to, W, !(to && to.garageGate));
return W;
};
})();
function chaufWrap(a) { return Math.atan2(Math.sin(a), Math.cos(a)); }
function chaufAim(P, La) { return __ZC(243, 5, this, arguments, new.target); }
function chaufStopFrom(d) { return Math.sqrt(2 * CHAUF_BRAKE * Math.max(0, d)); }
function chaufLights(P, D, road, S, v) { return __ZC(243, 6, this, arguments, new.target); }
function chaufOffRoad(x, z) {
if (roadAt(x, z).kind === "off")
return true;
if (typeof ATLC === "undefined" || !ATLC || typeof tglRingIdx !== "function")
return false;
var R = ATL_RINGS[tglRingIdx(x, z)], r = Math.hypot(x - ATLC.x, z - ATLC.z);
return !!(R && r >= R.S && r <= R.E && Math.abs(terrainY(x, z) - R.H) > 0.3);
}
function chaufAvoid(P, D, S, want, v) { return __ZC(243, 7, this, arguments, new.target); }
function chaufInput() { return __ZC(243, 8, this, arguments, new.target); }
(function () {
if (typeof driveInput !== "function")
return;
var di = driveInput;
driveInput = function () {
if (typeof TGL !== "undefined" && TGL.auto && TGL.route && typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.mode === "road") {
try {
return chaufInput();
}
catch (e) {
if (!CHAUF.warned) {
CHAUF.warned = true;
console.warn("chauffeur:", e);
}
}
}
return di.apply(this, arguments);
};
})();
(function () {
if (typeof tglTick !== "function")
return;
var tk = tglTick;
tglTick = function (dt) {
if (TGL.auto && typeof DRIVE !== "undefined" && DRIVE.on) {
var W = TGL.route && TGL.route[TGL.wi], P = camera.position;
if (CHAUF.holdT > 0 && CHAUF.holdT < 45)
TGL.chk = null;
if (CHAUF.stopNow) {
if (Math.abs(DRIVE.v) < 0.3) {
CHAUF.stopNow = false;
if (typeof vehicleLeave === "function")
vehicleLeave();
chaufAfterCrash();
}
return;
}
if (W && W.x !== undefined && !W.lift && (W.park || TGL.wi === TGL.route.length - 1) && Math.hypot(W.x - P.x, W.z - P.z) < 3 && Math.abs(DRIVE.v) > 0.2) {
TGL.chk = null;
return;
}
if (W && W.park && Math.hypot(W.x - P.x, W.z - P.z) < 3 && TGL.wi < TGL.route.length - 1) {
TGL.wi = TGL.route.length - 1;
}
if (W && W.x !== undefined && !W.lift && (W.park || TGL.wi === TGL.route.length - 1) && Math.hypot(W.x - P.x, W.z - P.z) < 16 && Math.abs(DRIVE.v) < 0.3 && CHAUF.holdT > 3)
TGL.wi = TGL.route.length;
}
return tk.apply(this, arguments);
};
})();
function chaufCrash(what, mph) { return __ZC(243, 9, this, arguments, new.target); }
function chaufServerSays(o) {
if (!o || !o.chauffeur)
return;
if (CHAUF.said) {
CHAUF.said.outcome = o.chauffeur;
CHAUF.said.next = o.driver || null;
}
chaufRosterFetch(true);
}
function chaufAfterCrash() { return __ZC(243, 10, this, arguments, new.target); }
(function () {
if (typeof tglOpen === "function") {
var to = tglOpen;
tglOpen = function (on) {
var r = to.apply(this, arguments);
try {
if (on && TGL.box && TGL.box.style.display === "block") {
chaufRosterFetch(false);
TGL.box.insertAdjacentHTML("beforeend", chaufCard());
}
}
catch (e) { }
return r;
};
}
if (typeof tglCall === "function") {
var tc = tglCall;
tglCall = function () {
var r = tc.apply(this, arguments);
if (TGL.coming) {
var a = chaufActive();
setStatus("<b>Your limousine is coming.</b> " + esc(a.name) + " at the wheel, a licensed chauffeur. Driver fit to drive ✓");
}
return r;
};
}
if (typeof tglGo === "function") {
var tg = tglGo;
tglGo = function (k) {
CHAUF.stopNow = false;
CHAUF.holdT = 0;
CHAUF.dec = null;
var r = tg.apply(this, arguments);
if (TGL.auto) {
var a = chaufActive();
setStatus("<b>" + esc(a.name) + ", your chauffeur, drives you to " + esc(TGL.auto.name) + ".</b> Licensed and trained at the Licensing Office: he keeps under every limit, stops at the lights and gives way. Driver fit to drive ✓ Press Q to get out on the way.");
}
return r;
};
}
})();
function chaufCard() { return __ZC(243, 11, this, arguments, new.target); }
function chaufLaneLimit(t) {
if (typeof ATL_STREETS === "undefined" || typeof ROAD_LIMIT_MPH === "undefined")
return null;
var rs = t.r - ROAD_SIDE * t.dir * 2.6;
for (var k in ATL_STREETS) {
var L = ATL_STREETS[k];
for (var i = 0; i < L.length; i++)
if (Math.abs(L[i] - rs) < 1)
return (ROAD_LIMIT_MPH[k] || 30) * MPH_MS;
}
return null;
}
(function () {
if (typeof trafficTick !== "function")
return;
var tt = trafficTick;
trafficTick = function () {
if (typeof TRAFFIC !== "undefined")
for (var i = 0; i < TRAFFIC.length; i++) {
var t = TRAFFIC[i];
if (!t.g || t.chLim)
continue;
t.chLim = 1;
var lim = chaufLaneLimit(t);
if (lim && t.v > lim * 0.92) {
t.v0 = t.v;
t.v = lim * 0.92;
}
}
return tt.apply(this, arguments);
};
})();
