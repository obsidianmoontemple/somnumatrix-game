/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(247, function () {
"use strict";
return [
function () {
if (typeof TGL === "undefined" || !TGL.auto)
return null;
if (TGL.auto.taxi)
return { name: (typeof TXI !== "undefined" && TXI.drvName) || "the cab driver", employer: PRO_CAB_CO, role: "cab", word: "cab driver" };
return { name: (typeof chaufActive === "function" ? chaufActive().name : "the chauffeur"), employer: PRO_TOWER_CO, role: "chauffeur", word: "chauffeur" };
},
function (x, z, h, S, back) {
var fx = -Math.sin(h), fz = -Math.cos(h), L = PRO.poles, i, o, dx, dz, al, sd, r;
for (i = 0; i < L.length; i++) {
o = L[i];
if (o.gone)
continue;
r = CRASH_KIND[o.kind].r * (o.sc || 1) + 0.35;
dx = o.x - x;
dz = o.z - z;
al = dx * fx + dz * fz;
sd = dx * -fz + dz * fx;
if (Math.abs(al) <= S.len + r && Math.abs(sd) <= S.wid + r)
return "p";
}
L = PRO.sol;
for (i = 0; i < L.length; i++) {
o = L[i];
dx = o.x - x;
dz = o.z - z;
if (dx * dx + dz * dz > (S.len + 6) * (S.len + 6))
continue;
if (o.k === "p") {
if (o.kind === "debris")
continue;
r = (o.r || 0.3) + 0.55;
al = dx * fx + dz * fz;
sd = dx * -fz + dz * fx;
if (Math.abs(al) <= S.len + r && Math.abs(sd) <= S.wid + r)
return "w";
}
else {
var hx = Math.sin(o.h), hz = Math.cos(o.h), off = Math.max(0, (o.hl || 2) - (o.hw || 0.9)), rr = (o.hw || 0.9) + 0.4;
for (var t = -1; t <= 1; t++) {
var cx = o.x + hx * off * t - x, cz = o.z + hz * off * t - z;
al = cx * fx + cz * fz;
sd = cx * -fz + cz * fx;
if (Math.abs(al) <= S.len + rr && Math.abs(sd) <= S.wid + rr)
return "v";
}
}
}
return typeof driveBlocked === "function" && driveBlocked(x, z, h, S, back ? -1 : 1) ? "b" : null;
},
function (x, z, h, steer, v, s, S, dist, back) {
var ds = 0.5, d = 0, sp = Math.max(0.8, Math.abs(v)), lock = 0.6 / (1 + sp / 8), sg = back ? -1 : 1, what = null;
while (d < dist) {
var dt = ds / sp;
steer += (s * lock - steer) * Math.min(1, dt * 7);
h += -(sg * ds / S.wb) * Math.tan(steer);
x += -Math.sin(h) * ds * sg;
z += -Math.cos(h) * ds * sg;
d += ds;
what = proHitAt(x, z, h, S, back);
if (what) {
PRO.sweepWhat = what;
return d - ds;
}
}
PRO.sweepWhat = null;
return 1e9;
},
function (out) {
var D = DRIVE, P = camera.position, S = vehSpec(D.arch) || { len: 2.3, wid: 0.95, wb: 2.7, brake: 9 }, v = D.v, now = performance.now();
if (!S.wb)
S.wb = 2.7;
if (PRO.pauseUntil > now) {
out.f = v > 0.3 ? -0.6 : 0;
out.hand = v <= 0.3;
out.s = 0;
return out;
}
if (now - PRO.gAt > 80) {
PRO.gAt = now;
PRO.poles = typeof crashNearCar === "function" ? crashNearCar(P.x, P.z) : [];
PRO.sol = typeof trfSolids === "function" ? trfSolids() : [];
var sp = Math.max(0, v), dist = Math.min(30, 3 + sp * sp / (2 * 4) + sp * 0.7);
var dC = proSweep(P.x, P.z, D.h, D.steer, sp, out.s, S, dist, false);
PRO.capWhy = PRO_WHY[PRO.sweepWhat] || "";
PRO.cap = dC >= dist ? 99 : (dC < 0.6 ? 0 : Math.sqrt(2 * 4.5 * (dC - 0.6)));
if (PRO.cap < 0.3 && Math.abs(v) < 0.35 && PRO.sweepWhat !== "w" && PRO.sweepWhat !== "v") {
PRO.stopT += 0.08;
if (PRO.stopT > 1.2 && !PRO.alt && !(PRO.rev > now)) {
var tries = [0.3, -0.3, 0.6, -0.6, 1, -1], best = null;
tries.sort(function (a, b) { return Math.abs(a - out.s) - Math.abs(b - out.s); });
for (var i = 0; i < tries.length && !best; i++)
if (proSweep(P.x, P.z, D.h, D.steer, 1, tries[i], S, 4, false) >= 4)
best = tries[i];
if (best !== null)
PRO.alt = { s: best, until: now + 2600 };
else if (proSweep(P.x, P.z, D.h, D.steer, 1, 0, S, 2.5, true) >= 2.5) {
PRO.rev = now + 1800;
PRO.revS = out.s > 0 ? -0.6 : 0.6;
}
PRO.stopT = 0;
}
}
else
PRO.stopT = 0;
}
if (PRO.alt) {
if (PRO.alt.until < now)
PRO.alt = null;
else {
out.s = PRO.alt.s;
if (proSweep(P.x, P.z, D.h, D.steer, 1, out.s, S, 2, false) < 2) {
PRO.alt = null;
out.f = v > 0.2 ? -0.5 : 0;
out.hand = v <= 0.2;
return out;
}
PRO.cap = 1.2;
out.hand = false;
if (v < 1.1)
out.f = Math.max(out.f, 0.3);
}
}
if (PRO.rev > now) {
if (proSweep(P.x, P.z, D.h, D.steer, 1, PRO.revS, S, 1.5, true) < 1.5) {
PRO.rev = 0;
out.f = v < -0.2 ? 0.5 : 0;
out.hand = true;
return out;
}
out.hand = false;
out.s = PRO.revS;
out.f = v > -0.9 ? -0.45 : 0;
D.note = (TGL.auto && TGL.auto.taxi ? "Cab driver: " : "Chauffeur: ") + "Backing up a little to get round";
D.noteT = 0.4;
return out;
}
var cap = PRO.cap;
if (v > cap + 0.15) {
out.f = -Math.min(1, 0.35 + (v - cap) * 0.45);
out.hand = false;
}
else if (out.f > 0 && v > cap - 0.4)
out.f = 0;
if (cap < 0.25 && v < 0.3) {
out.f = 0;
out.hand = true;
}
if (cap < 99 && PRO.capWhy && v > 0.2 && cap < v + 1) {
D.note = (TGL.auto && TGL.auto.taxi ? "Cab driver: " : "Chauffeur: ") + PRO.capWhy;
D.noteT = 0.4;
}
PRO.heldNearEnd = cap < 0.25 && v < 0.3;
return out;
},
function (px, pz, dest, arch) {
if (typeof ATLC === "undefined" || !ATLC || typeof ATL_STREETS === "undefined")
return null;
var i = tglRingIdx(px, pz), R = ATL_RINGS[i], st = R && ATL_STREETS[R.k];
if (!st || !st.length)
return null;
var pp = tglPolar(px, pz), rs = st[0];
st.forEach(function (s) { if (Math.abs(s - pp.r) < Math.abs(rs - pp.r))
rs = s; });
if (Math.abs(rs - pp.r) > 70)
return null;
var dir = pp.r >= rs ? 1 : -1;
try {
if (dest && typeof tglRoute === "function") {
var o = tglXZ(pp.a, rs), rt = tglRoute(o, dest), W = rt && rt[0];
if (W && W.x !== undefined) {
var q = tglPolar(W.x, W.z);
if (Math.abs(Math.abs(q.r - rs) - 2.6) < 0.8)
dir = q.r > rs ? 1 : -1;
else {
var da = Math.atan2(Math.sin(q.a - pp.a), Math.cos(q.a - pp.a));
if (Math.abs(da) * rs > 2)
dir = (da > 0 ? 1 : -1) * ROAD_SIDE;
}
}
}
}
catch (e) { }
var kr = rs + dir * 4.6, S = vehSpec(arch || "taxicab") || { len: 2.3, wid: 0.95, wb: 2.7 };
PRO.poles = [];
PRO.sol = typeof trfSolids === "function" ? trfSolids() : [];
var steps = [0, 6, -6, 12, -12, 18, -18, 24, -24, 32, -32, 40, -40, 50, -50];
for (var k = 0; k < steps.length; k++) {
var a = pp.a + steps[k] / kr, x = ATLC.x + Math.cos(a) * kr, z = ATLC.z + Math.sin(a) * kr;
if (typeof atlNearStair === "function") {
var ns = atlNearStair(kr, a);
if (ns && ns.lat < (ns.s.half || 4) + 3)
continue;
if (atlNearStair(kr, a + dir * 9 / kr) || atlNearStair(kr, a - dir * 9 / kr))
continue;
}
var Fx = -Math.sin(a) * dir, Fz = Math.cos(a) * dir, h = Math.atan2(-Fx, -Fz);
if (typeof crashPolesNear === "function")
PRO.poles = crashPolesNear(x, z, 8, []);
if (proHitAt(x, z, h, S, false))
continue;
if (proHitAt(x - Fx * 3, z - Fz * 3, h, S, false) || proHitAt(x + Fx * 3, z + Fz * 3, h, S, false))
continue;
return { x: x, z: z, h: h, rot: h + Math.PI, F: { x: Fx, z: Fz }, street: R.name, m: Math.round(Math.hypot(x - px, z - pz)) };
}
return null;
},
function (who, what, mph, taxi) {
PRO.pauseUntil = performance.now() + 6000;
PRO.alt = null;
PRO.rev = 0;
var dest = TGL.auto && TGL.auto.name;
setStatus("<b>" + esc(who) + " stops at once</b> (" + esc(what) + ", " + Math.round(mph || 0) + " mph), checks that you are unhurt and reports it to the city works and the Dragon Corp. " +
(taxi ? "The cab company's insurance deals with it. " : "") + "Then drives on" + (dest ? " to " + esc(dest) : "") + ". Press Q if you would rather get out here.");
},
function (d, kind, mph, limit, atFault) {
var L = proLocal(), id = d.employer + "|" + d.name, now = Date.now(), r = L[id] || (L[id] = { name: d.name, employer: d.employer, role: d.role, status: "active", pts: [], crashes: [] });
if (r.status === "retraining" && r.until <= now)
r.status = "active";
r.pts = r.pts.filter(function (p) { return p.at > now - 3 * 365 * 864e5; });
r.crashes = r.crashes.filter(function (t) { return t > now - 30 * 864e5; });
var pts = PRO_POINTS[kind] || 3;
r.pts.push({ at: now, n: pts, kind: kind });
var total = r.pts.reduce(function (s, p) { return s + p.n; }, 0), out = null;
if (total >= 12) {
r.status = "dismissed";
out = "revoked";
}
else if (atFault) {
r.crashes.push(now);
if (r.crashes.length >= 2) {
r.status = "dismissed";
out = "dismissed";
}
else {
r.status = "retraining";
r.until = now + 2 * 3600e3;
out = "retraining";
}
}
proLocalSave();
return { ok: true, local: true, points: pts, total: total, outcome: out, fine: kind === "speeding" ? Math.min(240, 60 + Math.max(0, (mph || 0) - (limit || 0)) * 8) : PRO_FINE[kind] || 100 };
},
function (name, employer) {
var R = PRO.roster && PRO.roster[employer], now = Date.now();
if (R)
for (var i = 0; i < R.length; i++)
if (R[i].name === name)
return R[i].status;
var r = proLocal()[employer + "|" + name];
if (!r)
return "active";
if (r.status === "retraining" && r.until <= now) {
r.status = "active";
proLocalSave();
}
return r.status;
},
function () {
if (!(typeof signedIn === "function" && signedIn()) || PRO.missing || Date.now() - PRO.rosterAt < 60000)
return;
PRO.rosterAt = Date.now();
cityRpc("npc_driver_roster", { p_employer: PRO_CAB_CO }).then(function (o) { if (o && o.ok && Array.isArray(o.drivers)) {
PRO.roster = PRO.roster || {};
PRO.roster[PRO_CAB_CO] = o.drivers;
} })
.catch(function (e) { if (typeof rpcMissing === "function" && rpcMissing(e))
PRO.missing = true; });
},
function (seed) {
var names = TXI_NAMES.concat(["Femi Adebayo", "Greta Lindholm", "Tomasz Wojcik", "Asha Pillai", "Conor Byrne", "Mireille Dubois"]);
for (var i = 0; i < names.length; i++) {
var nm = names[(seed + i) % names.length];
var s = proStatusOf(nm, PRO_CAB_CO);
if (s !== "retraining" && s !== "dismissed")
return nm;
}
return names[seed % names.length];
},
function (kind, what, mph, limit, atFault, later) {
var d = proAiDriver();
if (!d)
return Promise.resolve(null);
if (!PRO_WORD[kind])
return Promise.resolve(null);
var key = d.name + "|" + kind;
if (PRO.offAt[key] && Date.now() - PRO.offAt[key] < 20000)
return Promise.resolve(null);
PRO.offAt[key] = Date.now();
var P = camera.position, rel = ATLC ? { x: P.x - ATLC.x, z: P.z - ATLC.z } : { x: 0, z: 0 };
var tell = function (o) {
if (!o)
return o;
var fine = o.fine || PRO_FINE[kind] || 0, out = o.outcome;
setTimeout(function () {
setStatus("<b>The Dragon Corp books " + esc(d.name) + "</b>, the " + d.word + ": " + esc(PRO_WORD[kind]) + ". " +
(o.ticket ? "Ticket no. " + o.ticket + " " : "A ticket ") + (fine ? "(" + fine + " gold) " : "") + "goes to " + esc(d.employer) + ", who pay the fixed penalty, and " + (o.points || PRO_POINTS[kind] || 3) + " points go on the driver's licence" +
(o.total ? " (" + o.total + " in all)" : "") + ". You are the passenger: nothing is held against you." +
(out === "revoked" ? " <b>That makes twelve: the driver's licence is revoked and they are dismissed.</b>" :
out === "dismissed" ? " <b>Their second crash in thirty days: they are dismissed.</b>" :
out === "retraining" ? " After this trip the driver goes back to the Licensing Office for retraining." : ""));
}, later ? 6500 : 400);
return o;
};
var local = function () { return tell(proLocalBook(d, kind, mph, limit, atFault)); };
if (!(typeof signedIn === "function" && signedIn()) || PRO.missing)
return Promise.resolve(local());
return cityRpc("npc_driver_report", { p_name: d.name, p_employer: d.employer, p_role: d.role, p_kind: kind, p_what: String(what || "").slice(0, 200),
p_mph: mph ? Math.round(mph) : null, p_limit: limit ? Math.round(limit) : null, p_x: rel.x, p_z: rel.z, p_fault: !!atFault }).then(function (o) {
if (o && o.ok) {
PRO.rosterAt = 0;
return tell(o);
}
return local();
}).catch(function (e) { if (typeof rpcMissing === "function" && rpcMissing(e)) {
PRO.missing = true;
if (PRO.warned++ < 3 && window.console)
console.warn("[pro-drivers] the server lacks the latest server update");
} return local(); });
},
function () {
var W = store.workplaceAt || {}, keys = Object.keys(W);
if (WT.cache && WT.cacheN === keys.length)
return WT.cache;
var rings = (ATL_RINGS || []).map(function (R, i) { return { i: i, k: R.k, name: R.name || R.k, cats: {}, temples: {} }; });
keys.forEach(function (k) {
var ri = wtRingIdx(k, W[k]), B = ri === null ? null : rings[ri];
if (!B)
return;
var c = typeof phCatOf === "function" ? phCatOf({ key: k }) : { cat: "Places" }, into = c.temple ? B.temples : B.cats;
(into[c.cat] || (into[c.cat] = [])).push(k);
});
rings.forEach(function (B) { [B.cats, B.temples].forEach(function (o) { for (var c in o)
o[c].sort(function (a, b) { return wtName(a).localeCompare(wtName(b)); }); }); });
WT.cache = rings;
WT.cacheN = keys.length;
return rings;
},
function (k, home) {
if (k === "home")
return home || "Home";
if (k === "tower")
return "The Somnucor Tower";
if (k === "garage")
return "The Tower Garage";
if (k.indexOf("ring:") === 0) {
var R = typeof atlRing === "function" ? atlRing(k.slice(5)) : null;
return R ? R.name + " (the main stairway)" : k;
}
if (k.indexOf("wp:") === 0)
return k.slice(3);
return k;
},
function (sel, quick) {
var q = String(WT.q || "").trim().toLowerCase(), all = !!q, H = [];
if (!WT.ringSet && typeof camera !== "undefined" && typeof tglRingIdx === "function" && ATLC) {
WT.ringSet = true;
var ri = tglRingIdx(camera.position.x, camera.position.z);
if (ATL_RINGS[ri])
WT.open["r/" + ATL_RINGS[ri].k] = true;
}
function pick(k, label, lvl) { return "<div class='wt-p l" + lvl + (k === sel ? " on" : "") + "' data-wk='" + esc(k) + "'>" + esc(label) + "</div>"; }
function head(id, label, n, lvl) { var on = all || WT.open[id]; return "<div class='wt-h l" + lvl + "' data-wg='" + esc(id) + "'><span>" + (on ? "▾ " : "▸ ") + esc(label) + "</span><span class='s'>" + n + "</span></div>"; }
function hit(s) { return !q || String(s).toLowerCase().indexOf(q) >= 0; }
(quick || []).forEach(function (Q) { if (hit(Q.name) || hit(Q.k))
H.push(pick(Q.k, Q.icon + " " + Q.name, 0)); });
var ord = typeof PH_CATS !== "undefined" ? PH_CATS.map(function (c) { return c[0]; }) : [];
var shown = 0;
wtGroups().forEach(function (B) {
var cats = {}, temples = {}, n = 0, tn = 0, c;
for (c in B.cats) {
var L = B.cats[c].filter(function (k) { return hit(k) || hit(c) || hit(B.name); });
if (L.length) {
cats[c] = L;
n += L.length;
}
}
for (c in B.temples) {
var L2 = B.temples[c].filter(function (k) { return hit(k) || hit(c) || hit("temple") && q.length > 2 || hit(B.name); });
if (L2.length) {
temples[c] = L2;
tn += L2.length;
}
}
var ringRow = B.k !== "plaza" && (hit(B.name) || hit("ring"));
if (!n && !tn && !ringRow)
return;
shown++;
var id = "r/" + B.k;
H.push(head(id, B.name, n + tn, 0));
if (!(all || WT.open[id]))
return;
if (ringRow)
H.push(pick("ring:" + B.k, "Anywhere on " + B.name + " (the main stairway)", 1));
Object.keys(cats).sort(function (a, b) { var x = ord.indexOf(a), y = ord.indexOf(b); x = x < 0 ? 99 : x; y = y < 0 ? 99 : y; return x - y || a.localeCompare(b); }).forEach(function (c) {
var cid = id + "/" + c;
H.push(head(cid, c, cats[c].length, 1));
if (all || WT.open[cid])
cats[c].forEach(function (k) { H.push(pick("wp:" + k, k, 2)); });
});
if (tn) {
var tid = id + "/houses";
H.push(head(tid, "Temples and houses of the powers, by tradition", tn, 1));
if (all || WT.open[tid])
Object.keys(temples).sort(function (a, b) { return temples[b].length - temples[a].length || a.localeCompare(b); }).forEach(function (c) {
var cid = tid + "/" + c;
H.push(head(cid, c, temples[c].length, 2));
if (all || WT.open[cid])
temples[c].forEach(function (k) { H.push(pick("wp:" + k, k, 3)); });
});
}
});
if (!shown && q && H.length === 0)
H.push("<div class='s' style='padding:8px'>No place by that name.</div>");
return H.join("");
},
function (box, getSel, quick, onPick) {
var list = box.querySelector("[data-wl]"), q = box.querySelector("[data-wq]");
if (!list)
return;
var paint = function () { var y = list.scrollTop; list.innerHTML = wtListHtml(getSel(), quick); list.scrollTop = y; };
if (q) {
q.oninput = function () { WT.q = q.value; paint(); };
["keydown", "keyup", "keypress"].forEach(function (t) { q.addEventListener(t, function (ev) { ev.stopPropagation(); }); });
}
list.onclick = function (ev) {
ev.stopPropagation();
var t = ev.target.closest ? ev.target.closest("[data-wg],[data-wk]") : null;
if (!t)
return;
var g = t.getAttribute("data-wg");
if (g) {
if (String(WT.q || "").trim())
return;
WT.open[g] = !WT.open[g];
paint();
return;
}
var k = t.getAttribute("data-wk");
if (!k)
return;
list.querySelectorAll(".wt-p.on").forEach(function (e) { e.classList.remove("on"); });
t.classList.add("on");
onPick(k);
};
}
];
});
