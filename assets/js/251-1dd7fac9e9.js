/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var RGAR = { data: null, at: 0, busy: false, missing: false };
var RGAR_COL = { blue: 0x2A7BFF, violet: 0x8A4BFF, green: 0x22DD66, red: 0xFF3344, gold: 0xFFC23A, white: 0xF4F4FF, pink: 0xFF5FC8, teal: 0x22D6C8 };
var RGAR_NAMES = ["blue", "violet", "green", "red", "gold", "white", "pink", "teal"];
var RGAR_FIT = null;
function rgarFit() { if (RGAR_FIT)
return RGAR_FIT; try {
RGAR_FIT = JSON.parse(localStorage.getItem("somnu.carFx") || "{}") || {};
}
catch (e) {
RGAR_FIT = {};
} return RGAR_FIT; }
function rgarSaveFit(F) { RGAR_FIT = F || {}; try {
localStorage.setItem("somnu.carFx", JSON.stringify(F));
}
catch (e) { } }
function rgarOwned(item) {
var d = RGAR.data;
if (!d)
return false;
if (d.keeper)
return true;
return (d.unlocks || []).indexOf(item) >= 0;
}
function rgarTurboOwned() { for (var t = 3; t > 0; t--)
if (rgarOwned("turbo" + t))
return t; return 0; }
function rgarLoad(force) { return __ZC(251, 0, this, arguments, new.target); }
function rgarCheckFit() {
var F = rgarFit(), ch = false;
if (F.glow && !rgarOwned("glow:" + F.glow)) {
delete F.glow;
ch = true;
}
if (F.trim && !rgarOwned("trim:" + F.trim)) {
delete F.trim;
ch = true;
}
if (F.turbo && F.turbo > rgarTurboOwned()) {
F.turbo = rgarTurboOwned();
ch = true;
}
if (ch)
rgarSaveFit(F);
rgarPublish();
}
function rgarPublish() { return __ZC(251, 1, this, arguments, new.target); }
function rgarTurbo() { var F = rgarFit(); return Math.min(F.turbo || 0, rgarTurboOwned()); }
function rgarOpen() { return __ZC(251, 2, this, arguments, new.target); }
function rgarChip(name, label, on, dim, col) { return __ZC(251, 3, this, arguments, new.target); }
function rgarPaint(msg) { return __ZC(251, 4, this, arguments, new.target); }
function rgarBuy(item) { return __ZC(251, 5, this, arguments, new.target); }
var RGAR_GLOWTEX = null;
function rgarGlowTex() { return __ZC(251, 6, this, arguments, new.target); }
function rgarFxGroup(arch, fx) { return __ZC(251, 7, this, arguments, new.target); }
(function () {
if (typeof presenceGroupFor !== "function")
return;
var pg = presenceGroupFor;
presenceGroupFor = function (row) {
var g = pg.apply(this, arguments);
try {
var L = row && !row.away && row.look, k = L && L.ride;
if (k && L.carFx && typeof vehicleKindOf === "function" && vehicleKindOf(k) === "road") {
var fx = rgarFxGroup(k, L.carFx);
if (fx) {
fx.rotation.y = Math.PI + ((typeof RIDE_YAW !== "undefined" && RIDE_YAW[k]) || 0);
g.add(fx);
}
}
}
catch (e) { }
return g;
};
})();
function rgarOwnTick() {
var D = typeof DRIVE !== "undefined" ? DRIVE : null, G = typeof rideG !== "undefined" ? rideG : null;
if (!D || !D.on || D.mode !== "road" || !G || (typeof TGL !== "undefined" && TGL.auto))
return;
var F = rgarFit(), fx = (F.glow || F.trim) ? { glow: F.glow, trim: F.trim } : null, key = JSON.stringify(fx) + "|" + D.arch;
if (G.userData.fxKey === key)
return;
if (G.userData.fxG) {
G.remove(G.userData.fxG);
G.userData.fxG = null;
}
G.userData.fxKey = key;
var fg = rgarFxGroup(D.arch, fx);
if (fg) {
G.add(fg);
G.userData.fxG = fg;
}
}
(function () {
if (typeof vehSpec !== "function")
return;
var vs = vehSpec;
vehSpec = function (a) {
var S = vs.apply(this, arguments);
try {
var D = typeof DRIVE !== "undefined" ? DRIVE : null, t = rgarTurbo();
if (S && t && D && D.on && D.mode === "road" && a === D.arch && !(typeof TGL !== "undefined" && TGL.auto) && !(D.spec && (D.spec.learner || D.spec.yardItem)) && !(typeof LTEST !== "undefined" && LTEST && LTEST.active)) {
S = Object.assign({}, S);
S.vmax *= 1 + 0.06 * t;
S.acc *= 1 + 0.12 * t;
}
}
catch (e) { }
return S;
};
})();
var RLIVE = { ghosts: {}, hid: {}, lobbyAt: 0 };
function rliveClock() { var L = RACE.live; return L ? (Date.now() - L.startLocal) / 1000 : 0; }
function rliveLobby() { return __ZC(251, 8, this, arguments, new.target); }
function rliveJoin(own) { return __ZC(251, 9, this, arguments, new.target); }
function rliveState(o) { return __ZC(251, 10, this, arguments, new.target); }
function rlivePoll() { return __ZC(251, 11, this, arguments, new.target); }
function rliveTick(dt) { return __ZC(251, 12, this, arguments, new.target); }
function rlivePlace(mine) {
var L = RACE.live, p = 1;
(L.racers || []).forEach(function (r) {
if (r.me || r.out)
return;
var G = RLIVE.ghosts[r.id];
if (r.ms != null || (G && G.cur > mine))
p++;
});
return p;
}
function rliveGhost(r) { return __ZC(251, 13, this, arguments, new.target); }
function rliveGhostsTick(dt) { return __ZC(251, 14, this, arguments, new.target); }
function rliveClear() { return __ZC(251, 15, this, arguments, new.target); }
function rliveEnd(L, secs, why) { return __ZC(251, 16, this, arguments, new.target); }
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick, t0 = 0;
transitTick = function (dt) {
tt(dt);
try {
rgarOwnTick();
t0 -= dt;
if (t0 <= 0) {
t0 = 20;
if (!RGAR.data && !RGAR.missing && typeof signedIn === "function" && signedIn() && typeof careInCity === "function" && careInCity())
rgarLoad();
}
}
catch (e) {
if (window.console)
console.warn("racing live:", e);
}
};
})();
