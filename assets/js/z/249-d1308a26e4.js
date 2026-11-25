/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(249, function () {
"use strict";
return [
function () {
var D = typeof DRIVE !== "undefined" ? DRIVE : null;
if (!D || !D.on || D.mode !== "road")
return null;
if (typeof TGL !== "undefined" && TGL.auto && TGL.auto.taxi)
return null;
if (D.spec && (D.spec.learner || D.spec.yardItem))
return null;
if (D.src === "wheel" && D.spec)
return "obj:" + D.spec.id;
if (D.src === "ride")
return "own:" + ((typeof riding !== "undefined" && riding) || D.arch);
if (typeof TGL !== "undefined" && TGL.auto)
return "limo";
return D.arch ? "car:" + D.arch : null;
},
function (mph) {
var key = cdmgKeyNow();
if (!key)
return;
var add = cdmgHit(mph);
if (!add)
return;
if (Date.now() - (CDMG.lastAt || 0) < 1500) {
if (add <= (CDMG.lastAdd || 0))
return;
add -= CDMG.lastAdd || 0;
}
else
CDMG.lastAdd = 0;
CDMG.lastAt = Date.now();
CDMG.lastAdd = (CDMG.lastAdd || 0) + add;
var A = cdmgLoad(), C = A[key] || (A[key] = { d: 0, dents: [], tilt: 0 });
var before = C.d;
C.d = Math.min(100, C.d + add);
C.at = Date.now();
var D = typeof CRASH !== "undefined" ? CRASH.dmg : null;
if (D) {
C.dents = (D.dents || []).slice(-8).map(function (q) { return { al: q.al, sd: q.sd, s: q.s }; });
C.tilt = D.tilt || 0;
}
cdmgSave();
CDMG.cur = C;
CDMG.key = key;
var msg = null;
if (C.d >= CDMG_WRECK && before < CDMG_WRECK)
msg = "<b>The car is wrecked.</b> It will not go. The yard workshop's tow truck is on its way.";
else if (C.d >= 50 && before < 50)
msg = "<b>The car is badly damaged</b> (" + C.d + " in 100): smoke from the bonnet, and it will only crawl. Take it to the Transport Yard or a Ring Garage for repair.";
else if (C.d >= 25 && before < 25)
msg = "<b>The car is damaged</b> (" + C.d + " in 100): it pulls to one side and has lost its top speed. The Transport Yard or any Ring Garage can repair it.";
if (msg)
setTimeout(function () { setStatus(msg); }, 6500);
if (C.d >= CDMG_WRECK)
setTimeout(cdmgTowCome, 7000);
},
function () {
var key = cdmgKeyNow();
CDMG.key = key;
CDMG.cur = key ? cdmgOf(key) : null;
var C = CDMG.cur;
if (!C)
return;
if (C.shop && C.shop <= Date.now()) {
delete cdmgLoad()[key];
cdmgSave();
CDMG.cur = null;
return;
}
if (!C.d)
return;
if (typeof CRASH !== "undefined" && typeof crashDamageDress === "function") {
CRASH.dmg = { n: (C.dents || []).length, tilt: C.tilt || 0, smoke: C.d >= 50 ? Math.min(1, C.d / 80) : 0, g: null, dents: (C.dents || []).slice(), wisps: [] };
try {
crashDamageDress();
}
catch (e) { }
}
setTimeout(function () { setStatus("<b>This car is " + cdmgWord(C.d) + "</b> (" + C.d + " in 100)." + (C.d >= CDMG_WRECK ? " It will not go." : " The Transport Yard or any Ring Garage can repair it.")); }, 1200);
if (C.d >= CDMG_WRECK)
setTimeout(cdmgTowCome, 4000);
},
function (mph, kind) {
if (mph < 12 || Date.now() - CDMG.hurtAt < 5000)
return;
CDMG.hurtAt = Date.now();
var cab = typeof TGL !== "undefined" && TGL.auto, role = cab ? "passenger" : "driver";
if (!(typeof signedIn === "function" && signedIn()) || CDMG.missing) {
setStatus("<b>Crash at " + Math.round(mph) + " mph.</b> " + (mph >= 30 ? "Everyone in the car is badly shaken." : "You are jolted against the belt.") + (CDMG.missing ? "" : " Sign in and the City Hospital would see to you."));
return;
}
cityRpc("crash_hurt_self", { p_mph: Math.round(mph * 10) / 10, p_role: role, p_kind: kind }).then(function (d) {
if (!d || d.ok === false || !d.harm)
return;
if (d.state === "down") {
cdmgEmergency(d, mph, role);
return;
}
if (typeof harmApply === "function") {
if (typeof CRASH !== "undefined")
CRASH.quiet = true;
try {
harmApply({ hp: d.hp, state: d.state, recovers_at: d.recovers_at });
}
catch (e) { }
finally {
if (typeof CRASH !== "undefined")
CRASH.quiet = false;
}
}
setTimeout(function () { setStatus("<b>Hurt in the crash</b> (" + Math.round(mph) + " mph): " + d.hp + " of 100." + (d.harm >= 25 ? " The City Hospital can see to you." : "")); }, 3000);
}).catch(function (e) { if (typeof rpcMissing === "function" && rpcMissing(e))
CDMG.missing = true; });
},
function (d, mph, role) {
var D = DRIVE;
if (D && D.on) {
D.v = 0;
}
var P = camera.position, K = { wx: P.x, wz: P.z, t: 0, me: true };
setStatus("<b>Badly hurt in the crash.</b> You cannot move. Somebody has called the City Hospital: an ambulance is coming.");
CDMG.amb = { K: K, d: d, t: 0 };
try {
if (typeof crashAmbulance === "function" && typeof CRASH !== "undefined") {
CRASH.amb = CRASH.amb.filter(function (A) { return !(A.K && A.K.me); });
crashAmbulance(K);
}
}
catch (e) { }
},
function () {
if (CDMG.tow || typeof DRIVE === "undefined" || !DRIVE.on)
return;
var C = CDMG.cur, key = CDMG.key;
if (!C || C.d < CDMG_WRECK)
return;
var P = camera.position, a = Math.atan2(P.z - ATLC.z, P.x - ATLC.x), r = Math.hypot(P.x - ATLC.x, P.z - ATLC.z), g = null;
try {
g = build({ id: "__tow", archetype: "truck", attrs: { c: 0xE0B020 }, solid: false, detail: 3, nights: [], city: true });
}
catch (e) {
g = new THREE.Group();
}
g.traverse(function (m) { m.raycast = function () { }; });
g.add(P_(0, 2.5, 0));
scene.add(g);
var from = tglXZ(a - 40 / r, r), stop = tglXZ(a - 7 / r, r);
CDMG.tow = { g: g, from: from, stop: stop, t: 0, phase: "come", key: key, a: a, r: r };
setStatus("<b>The yard workshop's tow truck</b> is coming for the wreck. Stay with the car.");
function P_(x, y, z) { var m = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.16, 0.3), new THREE.MeshBasicMaterial({ color: 0xFFB020 })); m.position.set(x, y, z); return m; }
},
function (key) {
var A = cdmgLoad(), C = A[key] || (A[key] = { d: CDMG_WRECK });
C.shop = Date.now() + CDMG_SHOP_MIN * 60000;
C.d = 0;
C.dents = [];
C.tilt = 0;
cdmgSave();
var o = typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.src === "wheel" ? DRIVE.spec : null;
try {
if (typeof DRIVE !== "undefined" && DRIVE.on) {
if (DRIVE.src === "ride" && typeof ride === "function") {
vehicleEnd();
ride(null);
}
else
vehicleLeave();
}
}
catch (e) { }
if (o) {
var g = meshes[o.id];
if (g)
g.visible = false;
o._shop = C.shop;
}
setStatus("<b>The tow truck takes the wreck</b> to the yard workshop. It will be back, repaired, in about " + CDMG_SHOP_MIN + " min.");
}
];
});
