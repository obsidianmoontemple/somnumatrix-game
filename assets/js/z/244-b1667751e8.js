/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(244, function () {
"use strict";
return [
function () {
var L = CHAUF.local, now = Date.now();
L.forEach(function (c) { if (c.status === "retraining" && c.until <= now) {
c.status = "standby";
c.note = "Passed retraining at the Licensing Office";
} });
if (!L.some(function (c) { return c.status === "active"; })) {
var s = L.filter(function (c) { return c.status === "standby"; })[0];
if (s)
s.status = "active";
}
while (L.filter(function (c) { return c.status === "active" || c.status === "standby"; }).length < 2) {
L.push({ name: CHAUF_NAMES[L.length % CHAUF_NAMES.length], status: L.some(function (c) { return c.status === "active"; }) ? "standby" : "active", crashes: [], note: "Hired" });
}
chaufLocalSave();
},
function () {
var R = CHAUF.roster && CHAUF.roster.drivers;
if (R && R.length) {
var a = R.filter(function (d) { return d.status === "active"; })[0];
if (a)
return { name: a.name, crashes: a.crashes || 0, note: a.note };
}
var L = chaufLocal(), b = L.filter(function (c) { return c.status === "active"; })[0];
return b ? { name: b.name, crashes: (b.crashes || []).filter(function (t) { return t > Date.now() - 30 * 864e5; }).length, note: b.note } : { name: CHAUF_NAMES[0], crashes: 0 };
},
function (force) {
if (!(typeof signedIn === "function" && signedIn()) || typeof cityRpc !== "function" || typeof tglKeeper !== "function" || !tglKeeper())
return;
if (!force && Date.now() - CHAUF.rosterAt < 60000)
return;
CHAUF.rosterAt = Date.now();
cityRpc("chauffeur_roster").then(function (o) { if (o && o.ok) {
CHAUF.roster = o;
chaufDress();
} }).catch(function () { });
},
function () {
if (typeof TGL === "undefined" || !TGL.driver)
return;
var nm = chaufActive().name;
if (CHAUF.figFor === nm || TGL.auto)
return;
var old = TGL.driver, par = old.parent, nf = tglChauffeur();
nf.position.copy(old.position);
nf.rotation.copy(old.rotation);
nf.visible = old.visible;
if (par)
par.remove(old);
scene.add(nf);
TGL.driver = nf;
},
function (i, A, B, out, park) {
var R = ATL_RINGS[i], st = ATL_STREETS[R.k];
if (!st) {
out.push({ x: B.x, z: B.z, park: !!park });
return;
}
var pa = tglPolar(A.x, A.z), pb = tglPolar(B.x, B.z), rs = st[0];
if (st.length > 1) {
var mid = (pa.r + pb.r) / 2;
st.forEach(function (s) { if (Math.abs(s - mid) < Math.abs(rs - mid))
rs = s; });
}
var d = Math.atan2(Math.sin(pb.a - pa.a), Math.cos(pb.a - pa.a)), dir = d >= 0 ? 1 : -1, lane = rs + ROAD_SIDE * dir * 2.6, kerb = rs + ROAD_SIDE * dir * 4.6;
if (Math.abs(d) * lane < 30) {
if (park) {
var k0 = tglXZ(pb.a, kerb);
out.push({ x: k0.x, z: k0.z, park: true });
}
else
out.push({ x: B.x, z: B.z });
return;
}
out.push(tglXZ(pa.a + dir * 6 / lane, lane));
var endA = park ? pb.a - dir * 14 / lane : pb.a, span = endA - pa.a, steps = Math.max(1, Math.ceil(Math.abs(span) * lane / 16));
for (var k = 1; k <= steps; k++)
out.push(tglXZ(pa.a + span * k / steps, lane));
if (park) {
out.push(tglXZ(pb.a - dir * 6 / lane, (lane + kerb) / 2));
var kp = tglXZ(pb.a, kerb);
out.push({ x: kp.x, z: kp.z, park: true });
}
else
out.push({ x: B.x, z: B.z });
},
function (P, La) {
var R = TGL.route, i = TGL.wi, px = P.x, pz = P.z, left = La, W = R[i];
while (W && !W.lift && W.x !== undefined) {
var dx = W.x - px, dz = W.z - pz, d = Math.hypot(dx, dz);
if (d >= left || W.park || i === R.length - 1 || (R[i + 1] && (R[i + 1].lift || R[i + 1].x === undefined))) {
var k = d > left ? left / d : 1;
return { x: px + dx * k, z: pz + dz * k, end: W };
}
left -= d;
px = W.x;
pz = W.z;
i++;
W = R[i];
}
return { x: px, z: pz, end: R[TGL.wi] };
},
function (P, D, road, S, v) {
if (!road || road.kind !== "ring" || typeof trfPhase !== "function" || typeof ATL_STAIRS === "undefined")
return null;
var fx = -Math.sin(D.h), fz = -Math.cos(D.h), a = road.a, r = road.r, tang = fx * -Math.sin(a) + fz * Math.cos(a);
if (Math.abs(tang) < 0.6)
return null;
var dir = tang > 0 ? 1 : -1, rs = road.rs, ph = trfPhase(), best = null, why = "";
var people = typeof trfSolids === "function" ? trfSolids() : [];
for (var k = 0; k < ATL_STAIRS.length; k++) {
var St = ATL_STAIRS[k];
var stopL = St.main ? St.a - dir * (St.half + 1.2) / rs : St.a - dir * (St.half * 0.6 + 2.2) / rs;
var dl = ((stopL - a) * dir % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) * r;
if (dl > 70)
continue;
var nose = dl - S.len - 0.8, stop = false, w = "";
if (St.main) {
var s = ph.ring;
if (s === "r" || s === "ra") {
stop = true;
w = "Stopping for the red light";
}
else if (s === "a" && nose > v * v / (2 * 3.5)) {
stop = true;
w = "Amber: stopping";
}
}
if (!stop) {
for (var q = 0; q < people.length; q++) {
var o = people[q];
if (o.k !== "p" || o.kind === "debris" || o.kind === "casualty")
continue;
var ox = o.x - ATLC.x, oz = o.z - ATLC.z, orr = Math.hypot(ox, oz), oa = Math.atan2(oz, ox), da = chaufWrap(oa - St.a);
if (Math.abs(orr - rs) < ATL_ROAD - 0.4 && Math.abs(da) * orr < (St.main ? St.half : 2.2) && CHAUF.holdT < 12) {
stop = true;
w = "Giving way to people crossing";
break;
}
}
}
if (stop && nose > -1.5) {
var t = nose < 0.3 ? 0 : chaufStopFrom(nose - 0.3);
if (best === null || t < best) {
best = t;
why = w;
}
}
}
if (best !== null)
CHAUF.lightWhy = why;
return best;
},
function (P, D, S, want, v) {
var obs = CHAUF.obs;
obs.length = 0;
var poles = typeof crashNearCar === "function" ? crashNearCar(P.x, P.z) : [];
for (var i = 0; i < poles.length; i++) {
var c = poles[i];
if (c.gone)
continue;
var K = CRASH_KIND[c.kind];
obs.push({ x: c.x, z: c.z, r: K.r * (c.sc || 1) + 0.45, st: true, w: "Steering round " + K.word });
}
var L = typeof trfSolids === "function" ? trfSolids() : [];
for (var j = 0; j < L.length; j++) {
var s = L[j], dx = s.x - P.x, dz = s.z - P.z;
if (dx * dx + dz * dz > 40 * 40)
continue;
if (s.k === "p") {
var deb = s.kind === "debris" || s.kind === "casualty";
var sr = roadAt(s.x, s.z), walk = !deb && (sr.kind === "off" || (sr.kind === "ring" && Math.abs(sr.r - sr.rs) > ATL_ROAD - 0.4));
var by = !deb && !walk && CHAUF.roundTill > performance.now();
obs.push({ x: s.x, z: s.z, r: (s.r || 0.3) + (deb ? 0.5 : walk ? 0.15 : by ? 1.3 : 0.9), st: deb || by, w: deb ? "Steering round what lies in the road" : walk ? "Waiting for somebody stepping off the pavement" : by ? "Going slowly round somebody standing in the road" : "Waiting for the people in the road" });
}
else {
var hx = Math.sin(s.h), hz = Math.cos(s.h), off = Math.max(0, (s.hl || 2) - (s.hw || 0.9));
for (var t = -1; t <= 1; t++)
obs.push({ x: s.x + hx * off * t, z: s.z + hz * off * t, r: (s.hw || 0.9) + 0.8, st: false, w: "Keeping his distance from the car ahead" });
}
}
var look = Math.max(12, v * 2.4 + S.len + 8), need = S.len * 0 + v * v / (2 * CHAUF_BRAKE) + 4, feet = terrainY(P.x, P.z) + 0.3;
var order = [0, 0.12, -0.12, 0.25, -0.25, 0.4, -0.4, 0.6, -0.6];
if (CHAUF.lastDelta < 0)
order = [0, -0.12, 0.12, -0.25, 0.25, -0.4, 0.4, -0.6, 0.6];
var best = null;
var onRoad = !chaufOffRoad(P.x, P.z);
for (var n = 0; n < order.length; n++) {
var hc = want + order[n], fx = -Math.sin(hc), fz = -Math.cos(hc), lx = -fz, lz = fx, fs = look, fd = look, ws = "", wd = "";
if (n > 0 && onRoad) {
var off = false;
for (var od = S.len + 2; od <= S.len + 10; od += 4) {
var ox = P.x + fx * od, oz = P.z + fz * od;
if (chaufOffRoad(ox + lx * S.wid, oz + lz * S.wid) || chaufOffRoad(ox - lx * S.wid, oz - lz * S.wid)) {
off = true;
break;
}
}
if (off)
continue;
}
for (var q = 0; q < obs.length; q++) {
var o = obs[q], rx = o.x - P.x, rz = o.z - P.z, a = rx * fx + rz * fz;
if (a < 0.2 || a > look + S.len)
continue;
var b = Math.abs(rx * lx + rz * lz);
if (b >= S.wid + o.r)
continue;
var fr = a - S.len - 0.3;
if (o.st) {
if (fr < fs) {
fs = fr;
ws = o.w;
}
}
else if (fr < fd) {
fd = fr;
wd = o.w;
}
}
{
for (var sd = S.len + 1.5; sd < Math.min(fs, look) + S.len; sd += 2.5) {
var bx = P.x + fx * sd, bz = P.z + fz * sd;
if (blockedAt(bx, bz, feet) || blockedAt(bx + lx * S.wid * 0.9, bz + lz * S.wid * 0.9, feet) || blockedAt(bx - lx * S.wid * 0.9, bz - lz * S.wid * 0.9, feet)) {
fs = Math.min(fs, sd - S.len - 0.6);
ws = "Steering clear of the wall";
break;
}
}
}
var cand = { d: order[n], fs: fs, fd: fd, ws: ws, wd: wd };
if (!best || fs > best.fs + 0.5)
best = cand;
if (fs >= Math.min(need, look - 1)) {
best = cand;
break;
}
}
CHAUF.lastDelta = best ? best.d : 0;
return best;
},
function () {
var D = DRIVE, P = camera.position, R = TGL.route, W = R && R[TGL.wi], out = CHAUF.out;
var S = vehSpec(D.arch) || { len: 2.3, wid: 0.95, acc: 4.2, brake: 9, vmax: 24 };
var v = D.v;
out.hand = false;
out.up = false;
out.down = false;
out.kb = false;
out.s = 0;
var note = "";
if (CHAUF.stopNow || !W || W.lift) {
if (v > 0.3)
out.f = CHAUF.stopNow ? -0.75 : -0.4;
else {
out.f = 0;
out.hand = true;
}
CHAUF.holdT += D.dt || 0.016;
return out;
}
var La = Math.max(6, Math.min(16, 5 + Math.abs(v) * 1.1)), aim = chaufAim(P, La);
var want = Math.atan2(-(aim.x - P.x), -(aim.z - P.z)), diff = chaufWrap(want - D.h);
var road = D.road || roadAt(P.x, P.z);
var lim = road.limit !== null && road.limit !== undefined ? road.limit : (road.mph || 60) * MPH_MS;
var ax = P.x - Math.sin(D.h) * 18, az = P.z - Math.cos(D.h) * 18, rA = roadAt(ax, az);
if (rA && rA.limit)
lim = Math.min(lim, rA.limit);
var target = lim * 0.9 * CHAUF_SKILL;
note = Math.round(lim / MPH_MS) + " mph limit, holding " + Math.round(target / MPH_MS);
var ad = Math.abs(diff);
if (ad > 0.8)
target = Math.min(target, 2);
else if (ad > 0.45)
target = Math.min(target, 3.5);
else if (ad > 0.2)
target = Math.min(target, 6.5);
var R0 = R[TGL.wi], last = TGL.wi === R.length - 1, nx = R[TGL.wi + 1], dEnd = Math.hypot(R0.x - P.x, R0.z - P.z);
if (last || R0.park) {
target = Math.min(target, chaufStopFrom(dEnd - 0.4) * 0.85);
if (dEnd < 14)
note = "Pulling in to the kerb";
if (dEnd < 0.8) {
out.f = v > 0.3 ? -0.4 : 0;
out.hand = v <= 0.3;
out.s = 0;
CHAUF.holdT += D.dt || 0.016;
CHAUF.note = note;
D.note = "Chauffeur: " + note;
D.noteT = 0.4;
return out;
}
}
else if (nx && nx.lift) {
target = Math.min(target, chaufStopFrom(dEnd - 4.5) + 0.6);
if (dEnd < 20)
note = "Onto the lift";
}
var lt = chaufLights(P, D, road, S, v);
if (lt !== null && lt < target) {
target = lt;
note = CHAUF.lightWhy;
}
var now = performance.now();
if (!CHAUF.dec || now - CHAUF.decAt > 100) {
CHAUF.decAt = now;
CHAUF.dec = chaufAvoid(P, D, S, want, Math.abs(v));
}
if (CHAUF.holdT > 6 && !(CHAUF.roundTill > now) && lt === null) {
CHAUF.roundTill = now + 10000;
CHAUF.decAt = 0;
}
if (CHAUF.roundTill > now)
target = Math.min(target, 2.2);
var dec = CHAUF.dec, emergency = false;
if (dec) {
diff = chaufWrap(want + dec.d - D.h);
if (dec.d !== 0 && dec.ws)
note = dec.ws;
var fr = Math.min(dec.fs, dec.fd), tObs = Math.min(chaufStopFrom(dec.fs - 0.5), chaufStopFrom(dec.fd - 1.8));
if (tObs < target) {
target = tObs;
note = dec.fd < dec.fs ? dec.wd : dec.ws || note;
}
if (fr < v * v / (2 * 5) + 0.3)
emergency = true;
}
var err = target - v, base = (0.25 + 0.0028 * v * v) / (S.acc * Math.max(0.15, 1 - v / S.vmax));
if (target < 0.15 && v < 0.35) {
out.f = 0;
out.hand = true;
}
else if (err >= -0.25)
out.f = Math.max(0, Math.min(0.8, base + err * 0.45));
else
out.f = -Math.min(emergency ? 1 : 0.42, Math.max(0.06, -err * 0.22));
out.s = Math.max(-1, Math.min(1, -diff * 2.2));
if (Math.abs(diff) > 1.4 && v < 1) {
out.f = Math.max(out.f, 0.35);
out.hand = false;
}
if (!D.ind && ad > 0.3 && v > 1.2)
D.ind = diff > 0 ? "left" : "right";
CHAUF.holdT = target < 0.5 ? CHAUF.holdT + (D.dt || 0.016) : 0;
CHAUF.note = note;
D.note = (TGL.auto && TGL.auto.taxi ? "Cab driver: " : "Chauffeur: ") + note;
D.noteT = 0.4;
return out;
},
function (what, mph) {
if (Date.now() - CHAUF.crashAt < 6000)
return;
CHAUF.crashAt = Date.now();
var who = chaufActive().name;
CHAUF.said = { who: who, what: what, mph: mph, next: null, outcome: null };
if (!(typeof signedIn === "function" && signedIn())) {
var L = chaufLocal(), c = L.filter(function (x) { return x.status === "active"; })[0];
if (c) {
c.crashes = (c.crashes || []).filter(function (t) { return t > Date.now() - 30 * 864e5; });
c.crashes.push(Date.now());
if (c.crashes.length >= 2) {
c.status = "dismissed";
c.note = "Dismissed: two crashes in thirty days";
CHAUF.said.outcome = "dismissed";
}
else {
c.status = "retraining";
c.until = Date.now() + 2 * 3600e3;
c.note = "Suspended; retraining at the Licensing Office";
CHAUF.said.outcome = "suspended";
}
chaufLocalSettle();
CHAUF.said.next = chaufActive().name;
}
}
CHAUF.stopNow = true;
},
function () {
var S = CHAUF.said;
if (!S)
return;
var tell = function () {
var next = S.next || chaufActive().name, out = S.outcome === "dismissed" ? "is dismissed after this trip: his second crash in thirty days" : "goes back to the Licensing Office for retraining after this trip";
setStatus("<b>The chauffeur's record.</b> " + esc(S.who) + " " + esc(S.what) + " at " + Math.round(S.mph || 0) + " mph. It is on his driving record and he " + out + ". " +
(next && next !== S.who ? esc(next) + ", a licensed relief chauffeur, takes the wheel from the next trip." : ""));
CHAUF.said = null;
chaufDress();
};
setTimeout(tell, S.outcome || !(typeof signedIn === "function" && signedIn()) ? 50 : 2500);
},
function () {
var a = chaufActive(), R = CHAUF.roster, pol = R && R.policy;
return "<div class='s' style='margin-top:8px;border-top:1px solid #3A3160;padding-top:8px'>At the wheel: <b style='color:#EDE8F8'>" + esc(a.name) + "</b>, licensed chauffeur<br>" +
esc(CHAUF_LICENCE) + " · 0 penalty points<br>Driving record: " + (a.crashes ? a.crashes + " crash" + (a.crashes > 1 ? "es" : "") + " in the last thirty days" : "no crashes") +
"<br><span style='color:#8FD69A'>Driver fit to drive ✓</span>" +
(pol ? "<br>Insured: " + esc(pol.insurer) + ", policy " + esc(pol.policy) + " · up to " + pol.claim_cap + " gold a claim, " + pol.year_cap + " a year (" + pol.paid_year + " paid this year)" : "<br>Insured: the city's fleet policy") + "</div>";
}
];
});
