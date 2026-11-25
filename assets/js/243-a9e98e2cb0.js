/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CRASH = { quiet: false, down: [], near: [], nearAt: 0, nearX: 1e9, nearZ: 1e9, idx: null, idxN: -1, idxAt: 0, knocks: [], amb: [],
feedAt: 0, feedSince: 0, missing: false, dmg: null, lastSolids: null, cool: 0, seen: {}, myEv: {}, pend: [], strikeAt: {}, pres: {},
slow: 0, warned: {}, M: null, Q: null, QY: null, AX: null, V: null, M4: null, M4b: null, claimsAt: 0, claims: null, btn: null };
var CRASH_FIX_S = 180;
var CRASH_KIND = {
lamp: { h: 6.2, r: 0.2, minV: 3, word: "a lamp post" }, signal: { h: 3.6, r: 0.12, minV: 2.6, word: "a traffic light" },
sign: { h: 3, r: 0.08, minV: 2, word: "a road sign" }, beacon: { h: 2.9, r: 0.1, minV: 2, word: "a crossing beacon" },
bollard: { h: 1, r: 0.15, minV: 3.5, word: "a bollard" }, tree: { h: 9, r: 0.4, minV: 9, word: "a young tree" },
festpole: { h: 6.3, r: 0.12, minV: 2.5, word: "a festival pole" }
};
var CRASH_ARCH = { streetlight: "lamp", lamppost: "lamp", gaslamp: "lamp", ornatelamp: "lamp", dimlamp: "lamp", trafficlight: "signal",
sign: "sign", bollard: "bollard", tree: "tree", pine: "tree", palm: "tree", deadtree: "tree" };
function crashInCity() { return typeof trfInCity === "function" && trfInCity() && !store.inside; }
function crashMats() { return __ZC(243, 0, this, arguments, new.target); }
function crashKey(x, z) { return Math.round(x - ATLC.x) + "|" + Math.round(z - ATLC.z); }
function crashStreetPoles(x, z, R, out) { return __ZC(243, 1, this, arguments, new.target); }
function crashCand(out, kind, src, px, pz, x, z, R, sc, ref) {
var ddx = px - x, ddz = pz - z;
if (ddx * ddx + ddz * ddz > R * R)
return;
var key = crashKey(px, pz);
if (crashDownAt(px, pz))
return;
out.push({ kind: kind, src: src, x: px, z: pz, sc: sc || 1, ref: ref, key: key });
}
function crashJuncPoles(x, z, R, out) { return __ZC(243, 2, this, arguments, new.target); }
function crashIndex() { return __ZC(243, 3, this, arguments, new.target); }
function crashObjPoles(x, z, R, out) { return __ZC(243, 4, this, arguments, new.target); }
function crashPolesNear(x, z, R, out) {
out.length = 0;
crashStreetPoles(x, z, R, out);
crashJuncPoles(x, z, R, out);
crashObjPoles(x, z, R, out);
crashFestPoles(x, z, R, out);
return out;
}
function crashFestPoles(x, z, R, out) {
var L = CRASH.fest;
if (!L || !L.length || typeof FEST === "undefined" || !FEST.street || !FEST.street.parent)
return;
for (var i = 0; i < L.length; i++) {
var f = L[i];
if (Math.abs(f.x - x) > R || Math.abs(f.z - z) > R)
continue;
crashCand(out, "festpole", "inst", f.x, f.z, x, z, R, 1, f);
}
}
function crashFestGather() { return __ZC(243, 5, this, arguments, new.target); }
function crashDownAt(x, z) {
for (var i = 0; i < CRASH.down.length; i++) {
var d = CRASH.down[i];
if (Math.abs(d.x - x) < 1.2 && Math.abs(d.z - z) < 1.2)
return d;
}
return null;
}
function crashNearCar(x, z) {
var now = performance.now();
if (now - CRASH.nearAt > 400 || Math.abs(x - CRASH.nearX) + Math.abs(z - CRASH.nearZ) > 6) {
CRASH.nearAt = now;
CRASH.nearX = x;
CRASH.nearZ = z;
crashPolesNear(x, z, 28, CRASH.near);
}
return CRASH.near;
}
function crashInFoot(c, x, z, h, S) {
var r = CRASH_KIND[c.kind].r * (c.sc || 1), fx = -Math.sin(h), fz = -Math.cos(h), dx = c.x - x, dz = c.z - z;
var al = dx * fx + dz * fz, sd = dx * -fz + dz * fx;
return Math.abs(al) <= S.len + r && Math.abs(sd) <= S.wid + r;
}
(function () {
if (typeof driveBlocked !== "function")
return;
var db = driveBlocked;
driveBlocked = function (x, z, h, S, v) {
try {
if (typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.mode === "road" && ATLC && crashInCity()) {
var L = crashNearCar(x, z), sp = Math.abs(v);
for (var i = 0; i < L.length; i++) {
var c = L[i];
if (c.gone || !crashInFoot(c, x, z, h, S))
continue;
var K = CRASH_KIND[c.kind];
if (sp < K.minV * (c.kind === "tree" ? c.sc : 1)) {
if (typeof TRF !== "undefined")
TRF.lastHit = { k: "wall", at: performance.now(), v: sp, x: c.x, z: c.z, h: h };
return true;
}
var sg = v >= 0 ? 1 : -1, dirx = -Math.sin(h) * sg, dirz = -Math.cos(h) * sg;
var off = (c.x - x) * -Math.cos(h) + (c.z - z) * Math.sin(h);
dirx += Math.cos(h) * -off * 0.15;
dirz += -Math.sin(h) * -off * 0.15;
c.gone = true;
crashKnock(c, dirx, dirz, sp, true);
CRASH.slow = Math.max(CRASH.slow, c.kind === "tree" ? 0.35 : c.kind === "bollard" ? 0.7 : 0.55);
crashCarHit(sp, c.x, c.z, K.word);
}
}
}
catch (e) {
if (!CRASH.warned.db) {
CRASH.warned.db = 1;
console.warn("crashes:", e);
}
}
return db.apply(this, arguments);
};
})();
(function () {
if (typeof driveRoad !== "function")
return;
var dr = driveRoad;
driveRoad = function (dt, inp) {
var r = dr.apply(this, arguments);
if (CRASH.slow) {
DRIVE.v *= (1 - CRASH.slow);
CRASH.slow = 0;
}
return r;
};
})();
function crashKnock(c, dirx, dirz, v, mine, fromFeed) { return __ZC(243, 6, this, arguments, new.target); }
function crashRest(F) { return F.kind === "tree" ? 0.18 : F.kind === "lamp" || F.kind === "festpole" ? 0.06 : 0.03; }
function crashPose(F) {
var o = F.obj;
if (!o)
return;
CRASH.AX.set(F.dz, 0, -F.dx);
CRASH.Q.setFromAxisAngle(CRASH.AX, F.th);
if (F.qy)
o.quaternion.copy(CRASH.Q).multiply(F.qy);
else
o.quaternion.copy(CRASH.Q);
}
function crashHideInst(x, z, hide) { return __ZC(243, 7, this, arguments, new.target); }
function crashHideIn(G, x, z, hide, near) { return __ZC(243, 8, this, arguments, new.target); }
function crashUnbake(g) { return __ZC(243, 9, this, arguments, new.target); }
function crashRebake(g) { return __ZC(243, 10, this, arguments, new.target); }
function crashFallTick(dt) {
for (var i = CRASH.down.length - 1; i >= 0; i--) {
var F = CRASH.down[i];
if (F.raise >= 0) {
crashRaiseTick(F, dt, i);
continue;
}
F.t += dt;
if (!F.landed) {
F.w += 1.5 * 9.8 / F.len * Math.sin(F.th) * dt;
F.th += F.w * dt;
var rest = Math.PI / 2 - crashRest(F);
if (F.th >= rest) {
F.th = rest;
if (F.w > 1.1 && F.bounce < 2) {
F.w = -F.w * 0.22;
F.bounce++;
if (F.bounce === 1)
crashThud(F);
}
else {
F.w = 0;
F.landed = true;
if (!F.bounce)
crashThud(F);
}
}
if (F.th < 0) {
F.th = 0;
F.w = Math.abs(F.w) * 0.3;
}
crashPose(F);
if (!F.hit && F.len * Math.cos(F.th) < 2.1) {
F.hit = true;
crashFallsOn(F);
}
}
if (F.glow.length && F.t < 2.5) {
var k = Math.min(1, F.t / 2);
for (var g = 0; g < F.glow.length; g++) {
var G = F.glow[g];
if (G.from)
G.m.color.copy(G.from).lerp(G.to, k);
else
G.m.opacity = G.op0 + (G.op1 - G.op0) * k;
}
}
var now = performance.now();
if (!F.crew && now > F.upAt - 25000)
crashCrewCome(F);
if (F.crew)
crashCrewTick(F, dt);
if (now >= F.upAt && F.landed) {
F.raise = 0;
F.th0 = F.th;
}
}
}
function crashThud(F) { return __ZC(243, 11, this, arguments, new.target); }
function crashRaiseTick(F, dt, i) { return __ZC(243, 12, this, arguments, new.target); }
function crashRestore(F) { return __ZC(243, 13, this, arguments, new.target); }
function crashFallsOn(F) { return __ZC(243, 14, this, arguments, new.target); }
(function () {
if (typeof trfCrash !== "function")
return;
var tc = trfCrash;
trfCrash = function (H) {
if (H && H.k === "p" && H.s && (H.s.kind === "debris" || H.s.kind === "casualty")) {
if (H.v > 3)
setStatus("<b>Bump.</b> Something lies across the road. Go round it, slowly.");
return;
}
var r = tc.apply(this, arguments);
if (typeof TRF !== "undefined")
TRF.shake = 0;
try {
crashAfterHit(H);
}
catch (e) {
if (!CRASH.warned.ah) {
CRASH.warned.ah = 1;
console.warn("crashes:", e);
}
}
return r;
};
})();
function crashAfterHit(H) { return __ZC(243, 15, this, arguments, new.target); }
function crashChauffeurOn() { return typeof TGL !== "undefined" && !!TGL.auto; }
function crashCarHit(v, x, z, word) { return __ZC(243, 16, this, arguments, new.target); }
(function () {
if (typeof festBuildStreets !== "function")
return;
var fb = festBuildStreets;
festBuildStreets = function () {
var r = fb.apply(this, arguments);
try {
crashMats();
crashFestGather();
}
catch (e) { }
try {
if (CRASH.down.length && FEST.street) {
FEST.street.updateMatrixWorld(true);
for (var i = 0; i < CRASH.down.length; i++) {
var F = CRASH.down[i];
if (F.c && F.c.src === "inst")
crashHideIn(FEST.street, F.x, F.z, true, 1.2);
}
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof ccArrange !== "function")
return;
var ca = ccArrange;
ccArrange = function () {
var held = [];
CRASH.knocks.forEach(function (k) { if (k.cc)
held.push(k); });
var r = ca.apply(this, arguments);
held.forEach(function (k) { var p = k.cc; if (!p || !p.g)
return; p.state = "gone"; p.g.visible = !k.taken; p.g.position.set(k.x, k.y, k.z); });
return r;
};
})();
function crashNpcDown(g, cc, dx, dz, why, mph) { return __ZC(243, 17, this, arguments, new.target); }
function crashKnockTick(dt) {
for (var i = CRASH.knocks.length - 1; i >= 0; i--) {
var K = CRASH.knocks[i], g = K.g;
K.t += dt;
if (!g || !g.parent) {
CRASH.knocks.splice(i, 1);
continue;
}
var e = Math.min(1, K.t / 0.45), b = K.body;
if (K.cc || g.parent === scene) {
g.position.set(K.x0 + (K.x - K.x0) * e, K.y, K.z0 + (K.z - K.z0) * e);
}
g.rotation.y = K.face;
if (K.down) {
var lieT = K.up > 0 && K.t > K.up ? Math.max(0, 1 - (K.t - K.up) / 1.2) : 1;
b.rotation.x = -1.45 * Math.min(1, K.t / 0.55) * lieT;
if (K.up > 0 && K.t > K.up + 1.2) {
crashKnockEnd(K);
CRASH.knocks.splice(i, 1);
}
else if (K.taken && K.t > (K.takenAt || 0) + 0.5) {
g.visible = false;
if (K.done) {
crashKnockEnd(K);
CRASH.knocks.splice(i, 1);
}
}
}
else {
b.rotation.x = -Math.sin(Math.min(Math.PI, K.t * 5)) * 0.4;
if (K.t > 0.8) {
crashKnockEnd(K);
CRASH.knocks.splice(i, 1);
}
}
}
}
function crashKnockEnd(K) { return __ZC(243, 18, this, arguments, new.target); }
function crashKnockFig(g, dx, dz, down) {
if (typeof harmKnock === "function") {
g.rotation.y = Math.atan2(-dx, -dz);
harmKnock(g, !!down);
}
}
function crashAmbulance(K) { return __ZC(243, 19, this, arguments, new.target); }
function crashAmbTick(dt) {
for (var i = CRASH.amb.length - 1; i >= 0; i--) {
var A = CRASH.amb[i], v = A.v, K = A.K;
A.t += dt;
var hd = function (a, b) { return Math.atan2(b.x - a.x, b.z - a.z); };
if (A.phase === "come") {
var k = Math.min(1, A.t / 6), e = 1 - Math.pow(1 - k, 2);
var x = A.from.x + (A.stop.x - A.from.x) * e, z = A.from.z + (A.stop.z - A.from.z) * e;
v.position.set(x, terrainY(x, z), z);
v.rotation.y = hd(A.from, A.stop);
if (k >= 1) {
A.phase = "tend";
A.t = 0;
A.crew.forEach(function (f, j) { f.visible = true; f.position.set(A.stop.x + j * 0.8, terrainY(A.stop.x, A.stop.z), A.stop.z); });
}
}
else if (A.phase === "tend") {
var k2 = Math.min(1, A.t / 3);
A.crew.forEach(function (f, j) {
var tx = K.wx + (j ? 0.7 : -0.7), tz = K.wz + 0.5;
f.position.set(A.stop.x + (tx - A.stop.x) * k2, terrainY(tx, tz), A.stop.z + (tz - A.stop.z) * k2);
f.rotation.y = Math.atan2(K.wx - f.position.x, K.wz - f.position.z);
var L = f.userData.limbs;
if (L) {
var s = k2 < 1 ? Math.sin(A.t * 7) * 0.4 : 0;
if (L.ll)
L.ll.rotation.x = s;
if (L.rl)
L.rl.rotation.x = -s;
if (L.la)
L.la.rotation.x = k2 < 1 ? -s : -0.9;
if (L.ra)
L.ra.rotation.x = k2 < 1 ? s : -0.9;
}
});
if (A.t > 9) {
K.taken = true;
K.takenAt = K.t;
A.phase = "load";
A.t = 0;
}
}
else if (A.phase === "load") {
var k3 = Math.min(1, A.t / 3);
A.crew.forEach(function (f, j) { var sx = K.wx + (j ? 0.7 : -0.7), sz = K.wz + 0.5; f.position.set(sx + (A.stop.x - sx) * k3, terrainY(f.position.x, f.position.z), sz + (A.stop.z - sz) * k3); });
if (k3 >= 1) {
A.crew.forEach(function (f) { f.visible = false; });
A.phase = "go";
A.t = 0;
K.done = true;
}
}
else {
var k4 = Math.min(1, A.t / 6), e4 = k4 * k4;
var x4 = A.stop.x + (A.go.x - A.stop.x) * e4, z4 = A.stop.z + (A.go.z - A.stop.z) * e4;
v.position.set(x4, terrainY(x4, z4), z4);
v.rotation.y = hd(A.stop, A.go);
if (k4 >= 1) {
scene.remove(v);
A.crew.forEach(function (f) { scene.remove(f); });
CRASH.amb.splice(i, 1);
}
}
}
}
function crashCrewCome(F) { return __ZC(243, 20, this, arguments, new.target); }
function crashCrewTick(F, dt) { if (F.crew)
F.crew.t += dt; }
function crashCrewGo(F) { if (F.crew && F.crew.g) {
var g = F.crew.g;
setTimeout(function () { scene.remove(g); }, 8000);
} F.crew = null; }
function crashDent(dx, dz, v) { return __ZC(243, 21, this, arguments, new.target); }
function crashDamageDress() { return __ZC(243, 22, this, arguments, new.target); }
function crashDamageTick(dt) {
var D = CRASH.dmg;
if (!D)
return;
if (!(typeof DRIVE !== "undefined" && DRIVE.on)) {
CRASH.dmg = null;
return;
}
if (typeof rideG === "undefined" || !rideG)
return;
if (D.g !== rideG)
crashDamageDress();
rideG.rotation.z = D.tilt;
for (var i = 0; i < D.wisps.length; i++) {
var W = D.wisps[i];
W.ph = (W.ph + dt * 0.35) % 1;
var p = W.ph;
W.m.position.y = 1.0 + p * 1.6;
W.m.position.x = Math.sin(p * 3 + i) * 0.15;
W.m.scale.setScalar(0.6 + p * 1.6);
W.m.material.opacity = 0.32 * D.smoke * Math.sin(Math.PI * p);
}
}
(function () {
if (typeof vehicleTakeWheel !== "function")
return;
var vt = vehicleTakeWheel;
vehicleTakeWheel = function () { CRASH.dmg = null; return vt.apply(this, arguments); };
})();
(function () {
if (typeof trfSolids !== "function")
return;
var ts = trfSolids;
trfSolids = function () {
var L = ts.apply(this, arguments);
if (L !== CRASH.lastSolids) {
CRASH.lastSolids = L;
var P = camera.position;
for (var i = 0; i < CRASH.down.length; i++) {
var F = CRASH.down[i];
if (F.raise >= 0 || F.th < 0.9)
continue;
if (Math.abs(F.x - P.x) > 80 || Math.abs(F.z - P.z) > 80)
continue;
var n = Math.max(1, Math.floor(F.len * Math.sin(F.th)));
for (var k = 1; k <= n; k++)
L.push({ k: "p", x: F.x + F.dx * k, z: F.z + F.dz * k, y: -1e5, r: F.kind === "tree" ? 0.9 : 0.25, kind: "debris" });
}
for (var j = 0; j < CRASH.knocks.length; j++) {
var K = CRASH.knocks[j];
if (!K.down || K.taken)
continue;
L.push({ k: "p", x: K.wx, z: K.wz, y: -1e5, r: 0.6, kind: "casualty" });
}
}
return L;
};
})();
(function () {
if (typeof nightGlowPoles === "function") {
var np = nightGlowPoles;
nightGlowPoles = function (P, cand) {
var n0 = cand.length;
np.apply(this, arguments);
for (var i = cand.length - 1; i >= n0; i--)
if (crashDownAt(cand[i].x, cand[i].z))
cand.splice(i, 1);
};
}
if (typeof lampLitNow === "function") {
var ll = lampLitNow;
lampLitNow = function (L) { if (L && crashDownAt(L.x, L.z))
return false; return ll.apply(this, arguments); };
}
})();
(function () {
if (typeof trafficTick === "function") {
var tt = trafficTick;
trafficTick = function () {
var r = tt.apply(this, arguments);
if (typeof TRAFFIC !== "undefined")
for (var i = 0; i < TRAFFIC.length; i++) {
var t = TRAFFIC[i];
if (t.hazard)
t.hazard.visible = t.crash > 0;
}
return r;
};
}
if (typeof trfLightsTick === "function") {
var tl = trfLightsTick;
trfLightsTick = function () {
var r = tl.apply(this, arguments);
if (typeof TRF !== "undefined" && TRF.mats && TRF.mats.beacon)
TRF.mats.beacon.color.setHex(0xFF9A1A);
return r;
};
}
})();
(function () {
if (typeof harmFlash !== "function")
return;
var hf = harmFlash;
harmFlash = function () { if (CRASH.quiet) {
if (typeof harmPaint === "function")
harmPaint();
return;
} return hf.apply(this, arguments); };
})();
function crashSigned() { return typeof signedIn === "function" && signedIn() && !CRASH.missing && typeof cityRpc === "function"; }
function crashLog(kind, x, z, dir, mph, victim, what, then) { return __ZC(243, 23, this, arguments, new.target); }
function crashLogPole(F) {
crashLog("pole", F.x, F.z, Math.atan2(F.dx, F.dz), F.v / MPH_MS, null, F.kind, function (o) {
if (!o || !o.id)
return;
F.id = o.id;
CRASH.myEv[o.id] = 1;
CRASH.pend.forEach(function (q) { if (q.F === F)
q.ev = o.id; });
});
}
function crashFeedTick(dt) {
CRASH.feedAt -= dt;
if (CRASH.feedAt > 0)
return;
CRASH.feedAt = 5;
if (!crashSigned() || !crashInCity() || !ATLC)
return;
cityRpc("crash_feed", { p_since: CRASH.feedSince }).then(function (rows) {
if (!Array.isArray(rows))
return;
var me = typeof myUserId === "function" ? myUserId() : null;
rows.forEach(function (r) {
var x = r.x + ATLC.x, z = r.z + ATLC.z;
if (r.kind === "pole") {
var F = crashDownAt(x, z);
if (F) {
if (r.up_in !== null && r.up_in !== undefined && F.raise < 0)
F.upAt = performance.now() + Math.max(0, r.up_in) * 1000;
if (!F.id)
F.id = r.id;
return;
}
if (r.up_in <= 0 || CRASH.myEv[r.id])
return;
var L = crashPolesNear(x, z, 2.5, []), best = null, bd = 9;
L.forEach(function (c) { var d = Math.hypot(c.x - x, c.z - z); if (d < bd) {
bd = d;
best = c;
} });
if (!best)
return;
var dir = r.dir === null || r.dir === undefined ? 0 : r.dir;
var F2 = crashKnock(best, Math.sin(dir), Math.cos(dir), (r.mph || 20) * MPH_MS, false, { lying: r.age > 8 });
F2.id = r.id;
F2.upAt = performance.now() + Math.max(0, r.up_in) * 1000;
}
else if (r.kind === "strike") {
CRASH.feedSince = Math.max(CRASH.feedSince, r.id);
if (me && r.victim === me && !CRASH.seen[r.id])
crashStruckBy(r);
}
});
}).catch(function (e) { if (typeof rpcMissing === "function" && rpcMissing(e))
CRASH.missing = true; });
}
function crashMeOk() { return walkMode && !store.inside && !(typeof DRIVE !== "undefined" && DRIVE.on) && !(typeof HARM !== "undefined" && HARM.state === "down") && crashInCity(); }
function crashMeHit(kind, ev, mph, driver, F) { return __ZC(243, 24, this, arguments, new.target); }
function crashPendTick(dt) {
for (var i = CRASH.pend.length - 1; i >= 0; i--) {
var q = CRASH.pend[i];
q.t += dt;
if (!q.t0)
q.t0 = performance.now();
if (!q.ev && q.kind === "pole" && q.F && q.F.id)
q.ev = q.F.id;
if (!q.ev && q.kind !== "pole" && q.driver) {
var r = CRASH.lastStrike && CRASH.lastStrike[q.driver];
if (r && r.t > performance.now() - 30000)
q.ev = r.id;
}
if (q.ev || performance.now() - q.t0 > 8000) {
CRASH.pend.splice(i, 1);
q.send(q.ev);
}
}
}
function crashStruckBy(r) { return __ZC(243, 25, this, arguments, new.target); }
function crashMeFall(down) { CRASH.meFall = { t: 0, down: !!down }; }
function crashMeFallTick(dt) { var F = CRASH.meFall; if (!F)
return; F.t += dt; if (F.t > 3)
CRASH.meFall = null; }
function crashStrikeWatch(dt) {
if (CRASH.cool > 0)
CRASH.cool -= dt;
if (!crashMeOk())
return;
var P = camera.position;
if (typeof presenceOthers !== "undefined")
for (var id in presenceOthers) {
var p = presenceOthers[id], g = p && p.group;
if (!g || p.away)
continue;
var st = CRASH.pres[id] || (CRASH.pres[id] = { x: g.position.x, z: g.position.z, sp: 0, lk: null, arch: null });
if (st.lk !== p.lastLook) {
st.lk = p.lastLook;
st.arch = null;
try {
var lk = JSON.parse(p.lastLook || "{}");
st.arch = lk && lk.ride && typeof VEH !== "undefined" && VEH[lk.ride] ? lk.ride : null;
}
catch (e) { }
}
var mv = Math.hypot(g.position.x - st.x, g.position.z - st.z);
st.x = g.position.x;
st.z = g.position.z;
if (dt > 0)
st.sp += (mv / dt - st.sp) * Math.min(1, dt * 4);
if (!st.arch || st.sp < 2.2)
continue;
var S = vehSpec(st.arch) || { len: 2.3, wid: 0.95 }, h = g.rotation.y, fx = Math.sin(h), fz = Math.cos(h), dx = P.x - g.position.x, dz = P.z - g.position.z;
var al = dx * fx + dz * fz, sd = dx * fz - dz * fx;
if (Math.abs(al) < S.len + 0.3 && Math.abs(sd) < S.wid + 0.3) {
crashMeHit("car", null, Math.min(45, st.sp / MPH_MS), id, null);
}
}
if (typeof TRAFFIC !== "undefined")
for (var i = 0; i < TRAFFIC.length; i++) {
var t = TRAFFIC[i];
if (!t.g || !t.g.visible || t.rail || !(t.vc > 2.2))
continue;
var tx = t.g.position.x - P.x, tz = t.g.position.z - P.z;
if (tx * tx + tz * tz > 36)
continue;
var c = Math.cos(t.g.rotation.y), s = Math.sin(t.g.rotation.y), lz = tx * s + tz * c, lx = tx * c - tz * s;
if (Math.abs(lx) < (t.hw || 0.95) + 0.3 && Math.abs(lz) < (t.hl || 2.3) + 0.3)
crashMeHit("car", null, t.vc / MPH_MS, null, null);
}
}
var CRASH_CSS = "#crash-claims{position:fixed;right:14px;bottom:196px;z-index:40;font-size:14px;padding:6px 10px;background:rgba(20,18,24,.88);border:1px solid #9AB0D0;color:#E8EEF8;border-radius:3px;cursor:pointer;display:none}" +
"#crash-panel{position:fixed;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55)}" +
"#crash-panel .cp{background:#F4EEDC;color:#2A2420;max-width:560px;width:calc(100% - 32px);max-height:84vh;overflow-y:auto;padding:20px 22px;border-radius:4px;font:14px/1.55 Georgia,serif;box-shadow:0 10px 40px rgba(0,0,0,.5)}" +
"#crash-panel .row{border-top:1px solid #C8BCA4;padding:10px 0}#crash-panel button{margin:6px 8px 0 0}";
function crashClaimsBtn(show) { return __ZC(243, 26, this, arguments, new.target); }
function crashClaimsTick(dt) {
CRASH.claimsAt -= dt;
if (CRASH.claimsAt > 0)
return;
CRASH.claimsAt = 60;
if (!crashSigned() || !crashInCity()) {
crashClaimsBtn(false);
return;
}
cityRpc("my_claims").then(function (o) {
CRASH.claims = o && o.ok ? o : null;
var n = o && o.ok ? (o.injuries.length + o.against.filter(function (c) { return c.status === "letter" || c.status === "court"; }).length + (o.bench || []).length) : 0;
crashClaimsBtn(n > 0 || !!(o && o.ok && (o.mine.length || o.against.length)));
if (CRASH.btn)
CRASH.btn.textContent = "⚖ Claims" + (n ? " · " + n : "");
}).catch(function (e) { if (typeof rpcMissing === "function" && rpcMissing(e))
CRASH.missing = true; });
}
function crashClaims() { return __ZC(243, 27, this, arguments, new.target); }
function crashTick(dt) {
if (!ATLC)
return;
crashFallTick(dt);
crashKnockTick(dt);
crashAmbTick(dt);
crashDamageTick(dt);
crashMeFallTick(dt);
crashStrikeWatch(dt);
crashPendTick(dt);
crashFeedTick(dt);
crashClaimsTick(dt);
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
crashTick(dt || 0);
}
catch (e) {
if (!CRASH.warned.tick) {
CRASH.warned.tick = 1;
console.warn("crashes:", e);
}
} };
})();
(function () {
CRASH.lastStrike = {};
var old = crashStruckBy;
crashStruckBy = function (r) { CRASH.lastStrike[r.driver] = { id: r.id, t: performance.now() }; return old.apply(this, arguments); };
})();
function crashTest(mph, kind) { return __ZC(243, 28, this, arguments, new.target); }
