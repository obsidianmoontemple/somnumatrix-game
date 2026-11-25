/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CDMG = { all: null, cur: null, key: null, tow: null, amb: null, shopCard: 0, repair: null, saidPull: false, missing: false, hurtAt: 0 };
var CDMG_SHOP_MIN = 5, CDMG_WRECK = 80;
function cdmgLoad() { if (CDMG.all)
return CDMG.all; try {
CDMG.all = JSON.parse(localStorage.getItem("somnu.carDamage") || "{}") || {};
}
catch (e) {
CDMG.all = {};
} return CDMG.all; }
function cdmgSave() { try {
localStorage.setItem("somnu.carDamage", JSON.stringify(CDMG.all || {}));
}
catch (e) { } }
function cdmgKeyNow() { return __ZC(249, 0, this, arguments, new.target); }
function cdmgOf(key) { var A = cdmgLoad(); return key && A[key] ? A[key] : null; }
function cdmgHit(mph) {
if (mph < 5)
return 0;
if (mph < 10)
return 3 + Math.round((mph - 5) * 1);
if (mph < 20)
return 8 + Math.round((mph - 10) * 1.2);
if (mph < 30)
return 20 + Math.round((mph - 20) * 2);
if (mph < 45)
return 40 + Math.round((mph - 30) * 2.5);
return 80;
}
function cdmgWord(d) { return d >= CDMG_WRECK ? "wrecked" : d >= 50 ? "badly damaged" : d >= 25 ? "damaged" : d > 0 ? "scraped" : "sound"; }
function cdmgCrash(mph) { return __ZC(249, 1, this, arguments, new.target); }
function cdmgFactor() { var C = CDMG.cur; if (!C || !C.d)
return 1; return C.d >= CDMG_WRECK ? 0 : C.d >= 50 ? 0.3 : C.d >= 25 ? 0.75 : 1; }
(function () {
if (typeof vehSpec === "function") {
var vs = vehSpec;
vehSpec = function (a) {
var S = vs.apply(this, arguments);
try {
if (S && CDMG.cur && CDMG.cur.d && typeof DRIVE !== "undefined" && DRIVE.on && a === DRIVE.arch) {
var f = cdmgFactor();
S = Object.assign({}, S);
S.vmax = Math.max(0.01, S.vmax * f);
S.acc = S.acc * (f ? Math.max(0.4, f) : 0.01);
}
}
catch (e) { }
return S;
};
}
if (typeof driveInput === "function") {
var di = driveInput;
driveInput = function () {
var r = di.apply(this, arguments);
try {
var C = CDMG.cur;
if (r && C && C.d >= 25 && typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.mode === "road" && Math.abs(DRIVE.v) > 1.5 && !(typeof TGL !== "undefined" && TGL.auto)) {
var pull = (C.tilt >= 0 ? 1 : -1) * (C.d >= 50 ? 0.16 : 0.08);
r = Object.assign({}, r);
r.s = Math.max(-1, Math.min(1, (r.s || 0) + pull));
}
if (r && C && C.d >= CDMG_WRECK && r.f > 0) {
r = Object.assign({}, r);
r.f = 0;
}
}
catch (e) { }
return r;
};
}
if (typeof trfCrash === "function") {
var tc = trfCrash;
trfCrash = function (H) {
var r = tc.apply(this, arguments);
try {
if (H) {
var mph = (H.v || 0) / MPH_MS;
cdmgCrash(mph);
if (H.k !== "p")
cdmgHurt(mph, H.k === "v" ? "vehicle" : "solid");
}
}
catch (e) {
if (window.console)
console.warn("car damage:", e);
}
return r;
};
}
if (typeof crashCarHit === "function") {
var ch = crashCarHit;
crashCarHit = function (v, x, z, word) {
var r = ch.apply(this, arguments);
try {
var mph = v / MPH_MS;
cdmgCrash(mph);
cdmgHurt(mph, "pole");
}
catch (e) { }
return r;
};
}
if (typeof vehicleTakeWheel === "function") {
var vt = vehicleTakeWheel;
vehicleTakeWheel = function (o) {
var C0 = o && cdmgOf("obj:" + o.id);
if (C0 && C0.shop && C0.shop > Date.now()) {
setStatus("<b>At the yard workshop.</b> It will be back, repaired, in about " + Math.max(1, Math.ceil((C0.shop - Date.now()) / 60000)) + " min.");
return false;
}
var r = vt.apply(this, arguments);
if (r)
cdmgOnBoard();
return r;
};
}
if (typeof ride === "function") {
var rd = ride;
ride = function (name) {
var C1 = name && cdmgOf("own:" + name);
if (C1 && C1.shop && C1.shop > Date.now()) {
setStatus("<b>Your " + esc(String(name).toLowerCase()) + " is at the yard workshop.</b> Back, repaired, in about " + Math.max(1, Math.ceil((C1.shop - Date.now()) / 60000)) + " min.");
return;
}
var r = rd.apply(this, arguments);
setTimeout(cdmgOnBoard, 50);
return r;
};
}
if (typeof vehicleEnd === "function") {
var ve = vehicleEnd;
vehicleEnd = function () { var r = ve.apply(this, arguments); CDMG.cur = null; CDMG.key = null; CDMG.repair = null; return r; };
}
})();
function cdmgOnBoard() { return __ZC(249, 2, this, arguments, new.target); }
function cdmgHurt(mph, kind) { return __ZC(249, 3, this, arguments, new.target); }
function cdmgEmergency(d, mph, role) { return __ZC(249, 4, this, arguments, new.target); }
function cdmgEmergencyTick(dt) {
var E = CDMG.amb;
if (!E)
return;
E.t += dt;
if (typeof DRIVE !== "undefined" && DRIVE.on)
DRIVE.v = 0;
if (E.K.done || E.t > 24) {
CDMG.amb = null;
try {
if (typeof DRIVE !== "undefined" && DRIVE.on && typeof vehicleEnd === "function") {
if (typeof TGL !== "undefined" && TGL.auto && typeof tglArrive === "function")
tglArrive(true);
else
vehicleLeave();
}
}
catch (e) { }
if (typeof harmApply === "function") {
if (typeof CRASH !== "undefined")
CRASH.quiet = true;
try {
harmApply({ hp: E.d.hp, state: E.d.state, recovers_at: E.d.recovers_at });
}
catch (e) { }
finally {
if (typeof CRASH !== "undefined")
CRASH.quiet = false;
}
}
}
}
function cdmgTowCome() { return __ZC(249, 5, this, arguments, new.target); }
function cdmgTowTick(dt) {
var T = CDMG.tow;
if (!T)
return;
T.t += dt;
var hd = function (p, q) { return Math.atan2(q.x - p.x, q.z - p.z); };
if (T.phase === "come") {
var k = Math.min(1, T.t / 7), e = 1 - Math.pow(1 - k, 2), x = T.from.x + (T.stop.x - T.from.x) * e, z = T.from.z + (T.stop.z - T.from.z) * e;
T.g.position.set(x, terrainY(x, z), z);
T.g.rotation.y = hd(T.from, T.stop);
if (k >= 1) {
T.phase = "hook";
T.t = 0;
setStatus("<b>The driver hooks the wreck up</b> and takes it to the workshop. It will be back, repaired, in about " + CDMG_SHOP_MIN + " min.");
}
}
else if (T.phase === "hook") {
if (T.t > 4) {
cdmgToShop(T.key);
T.phase = "go";
T.t = 0;
T.go = tglXZ(T.a + 60 / T.r, T.r);
T.at = { x: T.g.position.x, z: T.g.position.z };
}
}
else {
var k4 = Math.min(1, T.t / 7), e4 = k4 * k4, x4 = T.at.x + (T.go.x - T.at.x) * e4, z4 = T.at.z + (T.go.z - T.at.z) * e4;
T.g.position.set(x4, terrainY(x4, z4), z4);
T.g.rotation.y = hd(T.at, T.go);
if (k4 >= 1) {
scene.remove(T.g);
CDMG.tow = null;
}
}
}
function cdmgToShop(key) { return __ZC(249, 6, this, arguments, new.target); }
function cdmgShopTick() {
var A = cdmgLoad(), now = Date.now(), ch = false;
Object.keys(A).forEach(function (k) {
var C = A[k];
if (!C.shop)
return;
if (C.shop <= now) {
delete A[k];
ch = true;
if (k.indexOf("obj:") === 0 && typeof specById === "function") {
var o = specById(k.slice(4));
if (o) {
delete o._shop;
var g = meshes[o.id];
if (g)
g.visible = true;
}
}
}
else if (k.indexOf("obj:") === 0 && typeof meshes !== "undefined") {
var g2 = meshes[k.slice(4)];
if (g2 && g2.visible && !(typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.spec && ("obj:" + DRIVE.spec.id) === k))
g2.visible = false;
}
});
if (ch)
cdmgSave();
}
function cdmgAtWorkshop() {
var P = camera.position;
try {
if (typeof TY !== "undefined" && TY.showroom && Math.hypot(P.x - TY.showroom.x, P.z - TY.showroom.z) < 45)
return "the Transport Yard's service bay";
}
catch (e) { }
try {
if (typeof garList === "function") {
var L = garList();
for (var i = 0; i < L.length; i++) {
var g = L[i];
var u = tglXZ(g.a, g.ru), l = tglXZ(g.a, g.rl);
if (Math.hypot(P.x - u.x, P.z - u.z) < 26 || Math.hypot(P.x - l.x, P.z - l.z) < 26)
return "the Ring Garage's workshop";
}
}
}
catch (e) { }
return null;
}
function cdmgRepairTick(dt) {
var D = typeof DRIVE !== "undefined" ? DRIVE : null, C = CDMG.cur;
if (CDMG.repair) {
var R = CDMG.repair;
R.t += dt;
if (D && D.on)
D.v = 0;
if (R.t >= R.need) {
var A = cdmgLoad();
delete A[CDMG.key];
cdmgSave();
CDMG.cur = null;
CDMG.repair = null;
if (typeof CRASH !== "undefined" && CRASH.dmg) {
try {
(CRASH.dmg.wisps || []).forEach(function (w) { if (w.m && w.m.parent)
w.m.parent.remove(w.m); });
}
catch (e) { }
if (typeof rideG !== "undefined" && rideG) {
var gone = [];
rideG.children.forEach(function (m) { if (m.material === CRASH.M.dent)
gone.push(m); });
gone.forEach(function (m) { rideG.remove(m); });
rideG.rotation.z = 0;
}
CRASH.dmg = null;
}
setStatus("<b>Repaired.</b> The mechanics knock out the dents, straighten the steering and send you off. The work was on the repair bill sent after the crash.");
worldCard(null);
}
return;
}
if (!D || !D.on || D.mode !== "road" || !C || !C.d || C.d >= CDMG_WRECK || Math.abs(D.v) > 0.4)
return;
if (Date.now() - CDMG.shopCard < 20000)
return;
var where = cdmgAtWorkshop();
if (!where)
return;
CDMG.shopCard = Date.now();
worldCard(worldFacts("The workshop", "Mechanics on duty at " + where, [["Damage", C.d + " in 100 (" + cdmgWord(C.d) + ")"], ["Time", "about " + Math.round(10 + C.d * 0.5) + " seconds"]], ["Already paid for on the repair bill that came after the crash."]) + worldBtn("fix", "Have it repaired", "Wait here with the car"), { fix: function () { CDMG.repair = { t: 0, need: 10 + C.d * 0.5 }; setStatus("<b>The mechanics get to work</b> on the " + cdmgWord(C.d) + " car. Wait here."); worldCard(null); } });
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
var shopT = 0;
transitTick = function (dt) {
tt(dt);
try {
cdmgEmergencyTick(dt);
cdmgTowTick(dt);
cdmgRepairTick(dt);
shopT -= dt;
if (shopT <= 0) {
shopT = 2;
cdmgShopTick();
}
}
catch (e) {
if (window.console)
console.warn("car damage:", e);
}
};
})();
