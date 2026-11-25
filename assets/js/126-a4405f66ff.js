/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var HARM = { hp: 100, state: "well", recovers: null, at: 0, fns: [], missing: false, hosp: false, hospCool: 0, gait: 0, lastP: null, events: [] };
function dreamerHurt() { return { hp: HARM.hp, state: HARM.state }; }
function onHarm(fn) { if (typeof fn === "function")
HARM.fns.push(fn); }
function harmFire(prev, events) {
var info = { hp: HARM.hp, state: HARM.state, prev: prev, events: events || [] };
HARM.fns.forEach(function (f) { try {
f(info);
}
catch (e) {
if (window.console)
console.warn("onHarm:", e);
} });
}
function rpcMissing(e) { return /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && e.message) || e || "")); }
function harmApply(h) { return __ZC(126, 0, this, arguments, new.target); }
function harmRefresh(force) {
if (HARM.missing || !(typeof signedIn === "function" && signedIn()))
return;
if (!force && Date.now() - HARM.at < 10000)
return;
HARM.at = Date.now();
cityRpc("my_health").then(harmApply).catch(function (e) { if (rpcMissing(e))
HARM.missing = true; });
}
function harmEls() { return __ZC(126, 1, this, arguments, new.target); }
function harmPaint() { return __ZC(126, 2, this, arguments, new.target); }
function harmClock(iso) { return __ZC(126, 3, this, arguments, new.target); }
function harmFlash() {
var v = harmEls();
if (!v)
return;
v.style.transition = "none";
v.style.opacity = "1";
setTimeout(function () { v.style.transition = "opacity 1.2s"; harmPaint(); }, 120);
}
function harmGait(dt) {
var cv = (typeof renderer !== "undefined" && renderer && renderer.domElement) || null;
if (!cv)
return;
var P = camera.position, moved = HARM.lastP ? Math.hypot(P.x - HARM.lastP.x, P.z - HARM.lastP.z) : 0;
HARM.lastP = { x: P.x, z: P.z };
var hurt = HARM.state === "hurt" && walkMode;
if (hurt && moved > 0.01) {
HARM.gait += dt * 6.5;
}
var amt = hurt ? Math.min(1, (70 - HARM.hp) / 50 + 0.3) : 0;
if (!amt) {
if (cv.style.transform) {
cv.style.transform = "";
}
return;
}
var s = Math.sin(HARM.gait), dip = s > 0 ? s * 1.0 : s * 0.25;
cv.style.transform = "translateY(" + (dip * 5 * amt).toFixed(2) + "px) rotate(" + (Math.sin(HARM.gait) * 0.9 * amt).toFixed(3) + "deg)";
}
function harmPace() {
if (HARM.state === "down")
return 0.35;
if (HARM.state !== "hurt")
return 1;
return 0.5 + 0.5 * Math.max(0, HARM.hp) / 70;
}
(function () {
if (typeof walkBy !== "function")
return;
var wb = walkBy;
walkBy = function (mx, mz) { var k = (store && store.inside) ? Math.max(0.6, harmPace()) : harmPace(); return wb.call(this, mx * k, mz * k); };
})();
function hospitalSpec() {
var at = store.workplaceAt && store.workplaceAt["The City Hospital"];
return at && typeof specById === "function" ? specById(at.id) : null;
}
function inHospital() { return !!(store.inside && INT && INT.spec && INT.spec.workplace === "The City Hospital"); }
function harmToWard(msg) { return __ZC(126, 4, this, arguments, new.target); }
function harmGoDown() { return __ZC(126, 5, this, arguments, new.target); }
function harmDownTick(dt) {
if (HARM.state !== "down")
return;
if (!(typeof inCityNow === "function" && inCityNow()))
return;
HARM.hospCool -= dt;
if (HARM.hospCool > 0)
return;
HARM.hospCool = 2;
if (!inHospital())
harmToWard("<b>You are in no state to go anywhere.</b> Back to the ward until you are on your feet.");
}
(function () {
if (typeof exitInterior !== "function")
return;
var ex = exitInterior;
exitInterior = function (quiet) {
if (!quiet && HARM.state === "down" && inHospital()) {
harmToWard("<b>Not yet.</b> The nurses will not let you out until you are on your feet.");
return;
}
return ex.apply(this, arguments);
};
})();
var HARM_COOL = 0;
function assaultDreamer(v) { return __ZC(126, 6, this, arguments, new.target); }
function theftAtStall(stall) { return __ZC(126, 7, this, arguments, new.target); }
var CRIME_SAID = {};
function reportCrime(kind, detail, victimId) { return __ZC(126, 8, this, arguments, new.target); }
function standinPatrol(sector, minute) {
if (minute === undefined)
minute = Math.floor(Date.now() / 60000);
return ((sector || 0) * 7919 + minute * 104729) % 100 < 40;
}
var ARREST = { g: null, t: 0, from: null, o: null };
function arrestScene(o, what) { return __ZC(126, 9, this, arguments, new.target); }
function standinRiderName(sector) {
var h = hash("corp-sector-" + (sector || 0) + "-" + Math.floor(Date.now() / 3600000));
var f = (h >>> 3) % 2 === 0, given = (typeof TEMP_GIVEN_F !== "undefined") ? (f ? TEMP_GIVEN_F : TEMP_GIVEN_M) : ["Rider"];
return given[(h >>> 5) % given.length] + " " + ((typeof SURNAME !== "undefined") ? SURNAME[(h >>> 10) % SURNAME.length] : "");
}
function arrestSwoop() { return __ZC(126, 10, this, arguments, new.target); }
function arrestTick(dt) {
var A = ARREST;
if (!A.g)
return;
A.t += dt;
var k = Math.min(1, A.t / 2.4), e = 1 - Math.pow(1 - k, 3);
var x = A.from.x + (A.to.x - A.from.x) * e, z = A.from.z + (A.to.z - A.from.z) * e, y = A.from.y + (A.to.y - A.from.y) * e;
A.g.position.set(x, y, z);
A.g.rotation.y = Math.atan2(A.to.x - A.from.x, A.to.z - A.from.z);
if (A.g.userData.anim)
try {
A.g.userData.anim(performance.now() / 1000, dt);
}
catch (err) { }
if (A.t > 5 || store.inside) {
scene.remove(A.g);
A.g = null;
}
}
var HARM_KNOCKS = [];
function harmKnock(g, down) { HARM_KNOCKS.push({ g: g, t: 0, down: !!down, r0: g.rotation.x || 0 }); }
function harmKnockTick(dt) {
HARM_KNOCKS = HARM_KNOCKS.filter(function (k) {
k.t += dt;
if (!k.g || !k.g.parent)
return false;
var c = k.g.children[0] || k.g;
if (k.down) {
c.rotation.x = -Math.min(1.45, k.t * 3);
return k.t < 8 || (c.rotation.x = 0, false);
}
c.rotation.x = -Math.sin(Math.min(Math.PI, k.t * 7)) * 0.35;
if (k.t > 0.5) {
c.rotation.x = 0;
return false;
}
return true;
});
}
(function () {
if (typeof workDone !== "function")
return;
var wd = workDone;
workDone = function () {
var B = WORK.busy, treat = B && B.task && B.task.task === "Treat a patient";
var r = wd.apply(this, arguments);
if (treat)
cityRpc("treat_patient", { p_patient: null }).then(function (o) {
if (!o)
return;
if (o.ok === false || !o.patient) {
setStatus(esc(o.say || "Nobody to treat just now."));
return;
}
setStatus("<b>You treat " + esc(o.patient) + ".</b> " + (o.state === "down" ? "They will be on their feet sooner — about " + harmClock(o.recovers_at) + "." : "They are at " + o.hp + " of 100 now."));
}).catch(function () { });
return r;
};
})();
(function () {
if (typeof atlLifeTick !== "function")
return;
var al = atlLifeTick;
atlLifeTick = function (dt) {
al(dt);
try {
if (HARM_COOL > 0)
HARM_COOL -= dt;
if (typeof inCityNow === "function" && inCityNow())
harmRefresh(false);
harmDownTick(dt);
harmGait(dt);
arrestTick(dt);
harmKnockTick(dt);
}
catch (e) {
if (window.console)
console.warn("harm:", e);
}
};
})();
