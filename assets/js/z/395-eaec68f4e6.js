/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(395, function () {
"use strict";
return [
function (r) {
var c = r.culprit && r.culprit.name, rd = r.rider_name || "A rider", s;
if (r.kind === "crime")
s = { reported: "📞 Reported to the Dragon Corp", responding: "🐉 " + rd + " on the way", at_scene: "🐉 " + rd + " at the scene, taking a statement",
chasing: "🐉 " + rd + " after " + (c || "them"), arrested: "✔️ " + (c || "The culprit") + " arrested", escaped: "⚠️ " + (c || "The culprit") + " got away, the case is open" }[r.state] || r.state;
else
s = { reported: "📞 The Keeper is called", responding: "🚨 Crews on the way", at_scene: "🛠️ Crews at work" + (r.hurt ? ", " + r.hurt + " hurt to the City Hospital" : ""), under_control: "✔️ Under control" }[r.state] || r.state;
if (r.fix === "broken")
s += " · 🔨 " + (CIN_DMG[r.dmg] || "damage") + ", waiting for " + r.fixer;
else if (r.fix === "repairing") {
var n = (r.steps || []).length || 1, dn = Math.min(n - 1, cinDone(r)), st = r.steps && r.steps[dn];
s += " · 🛠️ " + (r.mine_crew ? "You" : (r.crew_name || "a crew")) + " mending it" + (st ? ": " + st.s.toLowerCase() + " (step " + (dn + 1) + " of " + n + ")" : "");
}
else if (r.fix === "fixed")
s += " · ✔️ mended";
return s;
},
function (r) {
var n = (r.steps || []).length || 1;
if (r.fix === "fixed")
return n;
if (r.fix !== "repairing")
return 0;
if (r.crew_dreamer) {
var w = cinWork(r), k = w.k || 0;
return Math.min(n, k + ((w.go && (w.sec || 0) >= cinNeed(r, k)) ? 1 : 0));
}
var a = Date.parse(r.crew_at || ""), b = Date.parse(r.next_at || "");
if (!(b > a))
return 0;
return Math.max(0, Math.min(n - 1, Math.floor(n * (incdNow() - a) / (b - a))));
},
function (r, quiet) {
var j = INCD.jobs[r.id] = INCD.jobs[r.id] || { k: (r.work && r.work.k) || 0, sec: (r.work && r.work.sec) || 0, go: !!(r.work && r.work.go), t: 0 };
if (j.busy || typeof cityRpc !== "function")
return;
j.busy = true;
j.t = Date.now();
cityRpc("city_incident_act", { p_id: r.id, p_do: "work" }).then(function (o) {
j.busy = false;
if (o && o.ok && o.work) {
j.k = o.work.k;
j.sec = o.work.sec;
j.go = true;
j.t = Date.now();
}
else if (o && !quiet && typeof setStatus === "function")
setStatus(esc(o.say || "That did not go through."));
}).catch(function () { j.busy = false; });
},
function (r) {
var v = r.victim || {}, x = cinLast(r);
return { kind: r.kind === "major" ? "major" : "crime", at: Date.parse(r.at), from: r.place, to: r.kind === "major" ? "The Keeper" : "The Dragon Corp", what: r.what,
say: r.say, reply: x && x.line !== undefined && (r.log || []).length > 1 ? x.line : "", slot: "i" + r.id, caller: v.name, sex: v.sex, age: v.age, post: v.post, inc: r };
},
function (id, as) {
if (typeof cityRpc !== "function")
return;
cityRpc("city_incident_take", { p_id: id, p_as: as }).then(function (o) {
if (typeof setStatus === "function")
setStatus((o && o.ok ? "✅ " : "") + esc((o && o.say) || "That did not go through."));
var r = INCD.rows.filter(function (x) { return x.id === id; })[0];
if (o && o.ok && r && typeof showTheWay === "function") {
showTheWay(r.place);
if (typeof setStatus === "function")
setStatus("✅ " + esc(o.say) + " Follow the pointer.");
}
cinPoll(true);
}).catch(function (e) { if (typeof setStatus === "function")
setStatus(esc(String(e && e.message || e).slice(0, 140))); });
},
function (id, what) {
if (typeof cityRpc !== "function")
return Promise.resolve(null);
return cityRpc("city_incident_act", { p_id: id, p_do: what }).then(function (o) {
if (typeof setStatus === "function")
setStatus((o && o.ok ? "✅ " : "") + esc((o && o.say) || "That did not go through."));
if (o && o.ok && typeof refreshStanding === "function" && o.gold)
try {
refreshStanding();
}
catch (e) { }
cinPoll(true);
return o;
}).catch(function (e) { if (typeof setStatus === "function")
setStatus(esc(String(e && e.message || e).slice(0, 140))); return null; });
},
function (seed) {
var h = typeof fpsHash === "function" ? fpsHash(seed) : 0, f = h % 2;
var F = typeof WKC_F !== "undefined" ? WKC_F : ["Mara"], M = typeof WKC_M !== "undefined" ? WKC_M : ["Tom"], S = typeof WKC_S !== "undefined" ? WKC_S : ["Hale"];
var first = f ? F[(h >>> 3) % F.length] : M[(h >>> 3) % M.length];
return { first: first, name: first + " " + S[(h >>> 9) % S.length], sex: f ? "f" : "m", age: 24 + (h >>> 15) % 38 };
},
function (jobs) {
var out = [], day = Math.floor(incdNow() / 86400000);
jobs = jobs || cinPlaces();
var law = cinLaw(), places = {};
jobs.forEach(function (j) { places[j.place] = j; });
var health = jobs.filter(function (j) { return j.kind === "health"; })[0];
var disp = cinPerson("cindisp" + day);
INCD.rows.forEach(function (r) {
var at = Date.parse(r.at), v = r.victim || {}, c = r.culprit || {}, L = r.log || [];
var lastAt = L.length ? Date.parse(L[L.length - 1].at) : at;
if (law && r.kind === "crime" && !r.rider_dreamer && !r.closed && (r.state === "reported" || r.state === "responding"))
out.push(cinEv("d" + r.id, at, "law", disp, "Dragon Corp dispatch", r.place, "a rider of the Dragon Corp", "call", "A report has just come in: " + r.what + " at " + r.place + ". " + (v.name || "The caller") + " said: \"" + r.say + "\" The culprit: " + (c.look || "no description") + ", gone " + (c.way || "off") + ". " +
(r.state === "responding" ? r.rider_name + " from the city is already flying but you are closer. " : "") + "You are asking them to take it.", "Dispatch here. Report of " + r.what + " at " + r.place + ". " + (c.look ? "Suspect has " + c.look + ". " : "") + "Can you take it?", r.what + " at " + r.place, { id: r.id, as: "law" }));
if (r.mine_rider)
L.forEach(function (x, i) {
if (/ saw /.test(x.line) && x.who !== r.rider_name)
out.push(cinEv("w" + r.id + "_" + i, Date.parse(x.at), "law", disp, "Dragon Corp dispatch", r.place, "a rider of the Dragon Corp", "text", "A witness has rung in: " + x.line, "Dispatch: a witness says " + x.line, "a witness on your case"));
});
var cmd = typeof CORP !== "undefined" && CORP.data && CORP.data.command;
if (r.kind === "crime" && (r.mine_rider || cmd))
L.forEach(function (x, i) {
if (/^Suspect located/.test(x.line))
out.push(cinEv("l" + r.id + "_" + i, Date.parse(x.at), r.mine_rider ? "law" : "head", disp, "Dragon Corp dispatch", r.place, r.mine_rider ? "a rider of the Dragon Corp" : "in command of the Dragon Corp", "text", x.who + " reports: " + x.line, "Dispatch: " + x.who + " — " + x.line, "suspect located"));
});
var mineHere = r.mine_owner || places[r.place];
if (mineHere) {
var you = r.mine_owner ? "the owner of " + r.place : (places[r.place].title || "works at " + r.place);
out.push(cinEv("o" + r.id, at, r.mine_owner ? "head" : (places[r.place].kind || "trade"), v, r.kind === "major" ? v.post : ("at " + r.place), r.place, you, "call", r.what + " at " + r.place + " has just happened, and you are ringing them because it is their place. What you told the " + (r.kind === "major" ? "Keeper" : "Dragon Corp") + ": \"" + r.say + "\"" + (c.look ? " The one who did it had " + c.look + "." : ""), "It's " + cinFirst(v.name) + " at " + r.place + ". " + r.say + (r.kind === "crime" ? " I've rung the Dragon Corp." : ""), r.what + " at " + r.place));
if (r.state === "arrested" || r.state === "escaped") {
var rid = { name: r.rider_name && !/^Rider /.test(r.rider_name) ? r.rider_name : String(r.rider_name || "Rider " + disp.name).replace(/^Rider /, ""), sex: "m", age: 38 };
out.push(cinEv("e" + r.id, lastAt, "law", rid, "a rider of the Dragon Corp", r.place, you, "text", r.state === "arrested" ? "You arrested " + c.name + " for " + r.what + " at " + r.place + " and want the owner to know." : c.name + " got away after " + r.what + " at " + r.place + "; the case stays open.", r.state === "arrested" ? "Dragon Corp: we have arrested " + c.name + " for the " + r.what + " at " + r.place + "." + (r.gold_taken ? " Your " + r.gold_taken + " gold is back with you." : "") :
"Dragon Corp: " + c.name + " got away after the " + r.what + " at " + r.place + ". The case stays open." + (r.gold_taken ? " If we don't find them, the city's insurance pays your " + r.gold_taken + " gold back after a day." : ""), r.state === "arrested" ? "arrest made" : "culprit got away"));
}
if (r.fix === "fixed")
out.push(cinEv("x" + r.id, lastAt, "trade", { name: r.crew_name.replace(/'s crew from .*$/, ""), sex: "m", age: 45 }, "from " + r.fixer, r.place, you, "text", "You have just finished mending " + (CIN_DMG[r.dmg] || "the damage") + " at " + r.place + ".", "All mended at " + r.place + ". Good as new.", "mended"));
}
if (places[r.fixer] && !r.closed && r.fix === "broken" && !r.crew_dreamer) {
var fm = cinPerson("cinfm" + r.fixer);
out.push(cinEv("f" + r.id, at + 60000, places[r.fixer].kind || "trade", fm, "the foreman at " + r.fixer, r.fixer, places[r.fixer].title || "works at " + r.fixer, "either", "There is " + (CIN_DMG[r.dmg] || "damage") + " at " + r.place + " after " + r.what + " and you want them to go and mend it.", cinFirst(fm.name) + " at " + r.fixer + ". Job in: " + (CIN_DMG[r.dmg] || "damage") + " at " + r.place + ". Can you take it?", (CIN_DMG[r.dmg] || "damage") + " at " + r.place, { id: r.id, as: "fix" }));
}
if (health && r.hurt > 0 && (r.state === "at_scene" || r.state === "chasing" || r.state === "under_control" || r.state === "arrested")) {
var nu = cinPerson("cinnurse" + day);
out.push(cinEv("h" + r.id, lastAt, "health", nu, "a nurse on the wards at the City Hospital", health.place, health.title, "text", r.hurt + " hurt in " + r.what + " at " + r.place + " are coming in and you want them ready.", "Ward desk: " + r.hurt + " coming in from " + r.what + " at " + r.place + ". Can you be ready?", "casualties from " + r.place));
}
});
if (typeof fpsTownOrders === "function")
fpsTownOrders(3).forEach(function (e) {
if (e.kind === "call" && !e.inc && places[e.to] && !(fpsHash("cinc" + e.slot) % 2)) {
var cp = cinPerson("cincall" + e.from);
out.push(cinEv("s" + e.slot, e.at, places[e.to].kind || "trade", cp, "at " + e.from, e.to, places[e.to].title, "either", e.from + " has rung " + e.to + " about " + e.what + ": \"" + e.say + "\" Someone from " + e.to + " is going over.", cinFirst(cp.name) + " at " + e.from + ": " + e.say, e.what + " at " + e.from));
return;
}
if (e.kind !== "order" || e.inc)
return;
var j = places[e.to] || places[e.from];
if (!j || (fpsHash("cino" + e.slot + j.place) % 3))
return;
var asSupplier = !!places[e.to], p = cinPerson("cinord" + (asSupplier ? e.from : e.to));
out.push(cinEv("r" + e.slot + j.place, e.at, j.kind || "trade", p, asSupplier ? "ordering for " + e.from : "at " + e.to, j.place, j.title, "text", asSupplier ? e.from + " has ordered " + e.what + " from " + e.to + ": \"" + e.say + "\"" : e.to + " has your order of " + e.what + " for " + e.from + ": \"" + e.reply + "\"", asSupplier ? "Order for " + e.to + ": " + e.say : e.to + " about your " + e.what + ": " + e.reply, e.what));
});
return out.filter(function (e) { return e.at <= incdNow() + 5000; });
},
function (r, F, T) {
var c = r.culprit || {}, sd = c.seed || 0, dir = (c.way === "north" || c.way === "east") ? 1 : -1;
if (T === undefined)
T = Math.max(0, (incdNow() - Date.parse(r.at)) / 1000);
var r0 = Math.hypot(F.x - ATLC.x, F.z - ATLC.z), side = (F.street > r0 ? -1 : 1) * Math.min(Math.abs(F.street - r0) - 2, 9);
if (!isFinite(side))
side = 0;
var a, rr, face, cover = false, pace = 1.8;
if (T < 224 / 1.8) {
a = F.a + dir * (Math.min(230, 6 + 1.8 * T) + (sd % 40)) / Math.max(200, F.street);
rr = F.street + side;
face = Math.atan2(-Math.sin(a) * dir, Math.cos(a) * dir);
}
else {
var L = cinPathOf(r, F, dir, side, sd, T), S = L[L.length - 1];
for (var i = L.length - 1; i >= 0; i--) {
if (L[i].t0 <= T) {
S = L[i];
break;
}
}
var s = Math.min(S.dur, T - S.t0);
pace = S.pace;
cover = S.cover;
if (S.cut) {
var g = S.toR > S.r0 ? 1 : -1;
a = S.a0;
rr = S.r0 + (S.toR - S.r0) * (s / S.dur);
face = Math.atan2(g * Math.cos(a), g * Math.sin(a));
}
else {
a = S.a0 + S.dir * S.pace * s / S.r0;
rr = S.r0;
face = Math.atan2(-Math.sin(a) * S.dir, Math.cos(a) * S.dir);
}
}
var x = ATLC.x + Math.cos(a) * rr, z = ATLC.z + Math.sin(a) * rr;
return { x: x, z: z, y: terrainY(x, z) + 0.12, run: true, face: face, cover: cover, pace: pace };
},
function (r, F, dir, side, sd, T) {
INCD.paths = INCD.paths || {};
var P = INCD.paths[r.id], st = typeof lcyStreets === "function" ? lcyStreets() : [F.street], k = sd * 31 + (r.id % 997);
if (!P || P.F !== F) {
var ix = 0;
st.forEach(function (q, i) { if (Math.abs(q - F.street) < Math.abs(st[ix] - F.street))
ix = i; });
P = INCD.paths[r.id] = { F: F, ix: ix, dir: dir, L: [{ t0: 0, dur: 224 / 1.8, a0: F.a, r0: F.street + side, dir: dir, pace: 1.8, cut: false, cover: false,
end: { a: F.a + dir * (230 + (sd % 40)) / Math.max(200, F.street), r: F.street + side } }] };
}
var L = P.L;
while (L.length < 600) {
var B = L[L.length - 1];
if (B.t0 + B.dur > T)
break;
var n = L.length, u1 = cinRnd(k, n * 5), u2 = cinRnd(k, n * 5 + 1), u3 = cinRnd(k, n * 5 + 2), u4 = cinRnd(k, n * 5 + 3), u5 = cinRnd(k, n * 5 + 4);
var S = { t0: B.t0 + B.dur, a0: B.end.a, r0: B.end.r, dir: P.dir };
var j = P.ix + (u2 < 0.5 ? -1 : 1);
if (u1 < 0.28 && j >= 0 && j < st.length) {
S.cut = true;
S.cover = true;
S.pace = CIN_PACE[1 + Math.floor(u4 * 3)];
S.toR = st[j] + (u3 < 0.5 ? -6 : 6);
P.ix = j;
S.dur = Math.max(3, Math.abs(S.toR - S.r0) / S.pace);
S.end = { a: S.a0, r: S.toR };
}
else {
if (u2 < 0.3)
P.dir = -P.dir;
var da = S.a0 - F.a;
while (da > Math.PI)
da -= 2 * Math.PI;
while (da < -Math.PI)
da += 2 * Math.PI;
if (Math.abs(da) > 0.9)
P.dir = da > 0 ? -1 : 1;
S.cut = false;
S.dir = P.dir;
S.pace = CIN_PACE[Math.floor(u4 * 4)];
S.dur = 14 + u5 * 26;
S.cover = S.pace <= 2.2 && u3 < 0.55;
S.end = { a: S.a0 + S.dir * S.pace * S.dur / S.r0, r: S.r0 };
}
L.push(S);
}
return L;
},
function (seed) {
var c = document.createElement("canvas");
c.width = 256;
c.height = 128;
var x = c.getContext("2d"), h = seed >>> 0;
var cols = ["#E0245E", "#1FA2FF", "#FFD23F", "#3BCE6B", "#B44BFF"];
x.lineWidth = 12;
x.lineCap = "round";
for (var i = 0; i < 6; i++) {
x.strokeStyle = cols[(h >>> (i * 3)) % cols.length];
x.beginPath();
x.moveTo(20 + ((h >>> i) % 200), 20 + ((h >>> (i + 2)) % 90));
x.bezierCurveTo(60 + i * 30, 10, 90 + i * 20, 120, 230 - ((h >>> (i + 4)) % 60), 30 + ((h >>> (i + 6)) % 80));
x.stroke();
}
return new THREE.MeshLambertMaterial({ map: new THREE.CanvasTexture(c), transparent: true });
},
function (r, F) {
var lite = typeof LITE !== "undefined" && !!LITE, broken = r.fix === "broken" || r.fix === "repairing", d = r.dmg;
var G = new THREE.Group();
if (!broken)
return G;
var flat = function (mesh, y) { mesh.rotation.x = -Math.PI / 2; mesh.position.y = y || 0.03; mesh.raycast = function () { }; return mesh; };
var tg = function (m, gone, show) { if (gone !== undefined)
m.userData.gone = gone; if (show !== undefined)
m.userData.show = show; return m; };
if (d === "window") {
G.add(tg(cinBox(1.7, 1.2, 0.05, cinMat(0x15171C), -1.9, 1.55, 0.05), 2));
var plank = cinMat(0x8A6338);
var b1 = cinBox(1.9, 0.2, 0.05, plank, -1.9, 1.55, 0.12);
b1.rotation.z = 0.52;
G.add(tg(b1, 2));
var b2 = cinBox(1.9, 0.2, 0.05, plank, -1.9, 1.55, 0.15);
b2.rotation.z = -0.52;
G.add(tg(b2, 2));
var glass = cinMat(0xBFE6F2, 0.8);
for (var i = 0; i < (lite ? 6 : 14); i++) {
var sh = cinBox(0.12 + ((i * 7) % 5) * 0.04, 0.012, 0.08 + ((i * 3) % 4) * 0.03, glass, -2.8 + ((i * 37) % 19) / 10, 0.02, 0.3 + ((i * 13) % 14) / 10);
sh.rotation.y = i * 1.3;
G.add(tg(sh, 1));
}
var np = cinBox(1.6, 1.1, 0.03, cinMat(0xCFEFF8, 0.55), -3.4, 0.6, 0.6);
np.rotation.x = -0.18;
G.add(tg(np, 4, 3));
G.add(tg(cinBox(1.7, 1.2, 0.04, cinMat(0xCFEFF8, 0.4), -1.9, 1.55, 0.06), undefined, 4));
G.add(tg(cinBox(1.8, 0.07, 0.07, cinMat(0xEDEAE2), -1.9, 2.18, 0.08), undefined, 4));
G.add(tg(cinBox(1.8, 0.07, 0.07, cinMat(0xEDEAE2), -1.9, 0.92, 0.08), undefined, 4));
}
else if (d === "fire") {
var soot = cinMat(0x14110E, 0.88);
G.add(tg(cinBox(6, Math.min(F.top, 7), 0.04, soot, 0, Math.min(F.top, 7) / 2, 0.07), 3));
var sc = flat(new THREE.Mesh(new THREE.CircleGeometry(1, 20), cinMat(0x1A1612, 0.85)), 0.03);
sc.scale.set(4, 2, 1);
sc.position.z = 1.6;
G.add(tg(sc, 3));
for (var bf = 0; bf < (lite ? 3 : 6); bf++) {
var fb = cinBox(0.9 - (bf % 3) * 0.2, 0.12, 0.25, cinMat(0x24201C), 2.6 + (bf % 2) * 0.5, 0.08 + Math.floor(bf / 2) * 0.12, 2.6);
fb.rotation.y = bf * 0.7;
G.add(tg(fb, 5, 2));
}
if (r.state !== "under_control") {
[-2, 2].forEach(function (x) { var gl = cinBox(1.4, 1.1, 0.06, cinMat(0xFF7A1A, 0.9, 0xFF5A00), x, 1.6, 0.12); gl.userData.cinGlow = 1; G.add(gl); });
var smoke = new THREE.Group();
smoke.position.set(0, F.top, -Math.min(F.depth, 6));
smoke.userData.cinSmoke = 1;
for (var k = 0; k < (lite ? 4 : 9); k++) {
var p = new THREE.Mesh(new THREE.SphereGeometry(1.2 + k * 0.3, 8, 6), cinMat(0x3A3836, 0.5));
p.raycast = function () { };
p.userData.k = k;
smoke.add(p);
}
G.add(smoke);
}
}
else if (d === "flood") {
var wt = flat(new THREE.Mesh(new THREE.CircleGeometry(1, 28), cinMat(0x4F7F9C, 0.72)), 0.04);
wt.scale.set(6.5, 2.6, 1);
wt.position.z = 2.4;
G.add(wt);
var wt2 = flat(new THREE.Mesh(new THREE.CircleGeometry(1, 20), cinMat(0x5E90AE, 0.6)), 0.05);
wt2.scale.set(3, 1.4, 1);
wt2.position.set(3.5, 0.05, 1.2);
G.add(wt2);
var hole = flat(new THREE.Mesh(new THREE.CircleGeometry(0.9, 16), cinMat(0x1B1712)), 0.06);
hole.position.set(-2.4, 0.06, 3.2);
G.add(tg(hole, 4, 2));
var heap = new THREE.Mesh(new THREE.SphereGeometry(0.8, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), cinMat(0x5A4630));
heap.scale.set(1.3, 0.5, 1);
heap.position.set(-0.8, 0, 3.4);
heap.raycast = function () { };
G.add(tg(heap, 4, 2));
G.add(tg(cinBox(1.6, 0.12, 0.12, cinMat(0x2F6E3A), -2.4, 0.12, 3.2), 4, 3));
}
else if (d === "paint") {
var pm = new THREE.Mesh(new THREE.PlaneGeometry(4, 1.9), cinPaintMat(typeof fpsHash === "function" ? fpsHash("p" + r.id) : r.id));
pm.position.set(-0.6, 1.55, 0.08);
pm.raycast = function () { };
G.add(tg(pm, 2));
if (r.fix === "repairing" && cinDone(r) === 1)
pm.material.opacity = 0.6;
}
else if (d === "stall") {
var wood = cinMat(0x9A7040), cloth = cinMat(0xC8392B);
var top = cinBox(2.4, 0.08, 1.2, cloth, 1.5, 0.5, 2.2);
top.rotation.z = 0.9;
G.add(tg(top, 2));
G.add(tg(cinBox(0.08, 1, 0.08, wood, 0.4, 0.2, 1.6), 2));
for (var q = 0; q < 4; q++) {
var cr = cinBox(0.5, 0.35, 0.4, wood, 0.3 + q * 0.7, 0.18, 1.4 + (q % 2) * 0.8);
cr.rotation.set(q * 0.4, q, 0.3 * q);
G.add(tg(cr, 1));
}
for (var f = 0; f < (lite ? 6 : 14); f++) {
var fr = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 5), cinMat([0xD23A2A, 0xF2A23A, 0x6BB53A][f % 3]));
fr.position.set(-0.5 + ((f * 29) % 35) / 10, 0.07, 1 + ((f * 17) % 25) / 10);
fr.raycast = function () { };
G.add(tg(fr, 1));
}
G.add(tg(cinBox(2.4, 0.08, 1.2, cloth, 1.5, 1.1, 2.0), undefined, 2));
[[0.4, 1.5], [2.6, 1.5], [0.4, 2.5], [2.6, 2.5]].forEach(function (l, li) { G.add(tg(cinBox(0.08, li === 3 ? 0.7 : 1.1, 0.08, wood, l[0], li === 3 ? 0.35 : 0.55, l[1]), undefined, li === 3 ? 3 : 2)); });
var leg = cinBox(0.08, 0.4, 0.08, wood, 2.9, 0.05, 2.8);
leg.rotation.z = 1.4;
G.add(tg(leg, 3, 2));
}
else if (d === "cart") {
var gate = cinMat(0x6E4E2C);
var gt = cinBox(2.6, 0.08, 1.3, gate, 2.2, 0.06, 1.4);
gt.rotation.y = 0.25;
G.add(tg(gt, 3));
G.add(tg(cinBox(2.9, 1.3, 0.08, gate, 2.3, 0.75, 0.3), undefined, 3));
G.add(cinBox(0.14, 1.5, 0.14, gate, 0.8, 0.75, 0.3));
G.add(cinBox(0.14, 1.5, 0.14, gate, 3.8, 0.75, 0.3));
}
else if (d === "crash" || d === "dark") {
var deb = cinMat(d === "crash" ? 0x5A5E64 : 0x2A2C30);
for (var j = 0; j < (lite ? 4 : 10); j++) {
var db = cinBox(0.4 + (j % 3) * 0.3, 0.2 + (j % 2) * 0.2, 0.3 + (j % 4) * 0.2, deb, -2.5 + ((j * 23) % 50) / 10, 0.15, 0.8 + ((j * 11) % 30) / 10);
db.rotation.set(j * 0.3, j, j * 0.2);
G.add(tg(db, 1));
}
if (d === "crash") {
G.add(tg(cinBox(2.2, 1.4, 0.5, cinMat(0x8A5A44), -1.5, 0.7, 0.35), undefined, 3));
G.add(tg(cinBox(1.2, 0.5, 0.8, cinMat(0x8A5A44), 2.6, 0.25, 2.4), 3, 2));
}
if (typeof lcySignMat === "function")
G.add(cinBox(1.2, 0.6, 0.04, lcySignMat(d === "dark" ? ["POWER OUT", "Crews at work"] : ["DANGER", "Keep back"], "#C8231C", "#FFFFFF"), 3.2, 1.2, 3.6));
}
if (r.fix === "repairing") {
G.add(cinBox(0.6, 0.3, 0.3, cinMat(0xB0302A), -3.4, 0.15, 1.6));
G.add(cinBox(0.62, 0.04, 0.12, cinMat(0x2A2A2A), -3.4, 0.33, 1.6));
if (d === "window" || d === "fire" || d === "paint") {
var lad = new THREE.Group(), lw = cinMat(0xA8A39A);
lad.add(cinBox(0.06, 2.8, 0.06, lw, -0.25, 1.4, 0));
lad.add(cinBox(0.06, 2.8, 0.06, lw, 0.25, 1.4, 0));
for (var rg = 0; rg < 7; rg++)
lad.add(cinBox(0.5, 0.04, 0.04, lw, 0, 0.3 + rg * 0.38, 0));
lad.position.set(-0.5, 0, 0.7);
lad.rotation.x = -0.22;
G.add(lad);
}
if (d === "paint" || d === "flood" || d === "fire") {
var bk = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.14, 0.32, 10), cinMat(0x3B6EA8));
bk.position.set(-2.9, 0.16, 2.0);
bk.raycast = function () { };
G.add(bk);
}
}
var dn = cinDone(r);
G.children.forEach(function (m) { var u = m.userData; if ((u.gone !== undefined && dn >= u.gone) || (u.show !== undefined && dn < u.show))
m.visible = false; });
return G;
},
function (g) {
if (typeof lcyCone !== "function")
return;
var pts = [[-3.8, 0.3], [-3.8, 4.6], [3.8, 4.6], [3.8, 0.3]];
pts.forEach(function (p) { var c = lcyCone(); c.position.set(p[0], 0, p[1]); g.add(c); });
var tm = typeof lcyStripes === "function" ? lcyStripes() : cinMat(0xF2C12E);
for (var i = 0; i < 3; i++) {
var a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dz = b[1] - a[1], L = Math.sqrt(dx * dx + dz * dz);
var t = cinBox(L, 0.08, 0.01, tm, (a[0] + b[0]) / 2, 0.62, (a[1] + b[1]) / 2);
t.rotation.y = -Math.atan2(dz, dx);
g.add(t);
}
},
function (r, F) {
var g = new THREE.Group();
g.position.set(F.x, F.y, F.z);
g.rotation.y = F.face;
var o = { g: g, sig: r.state + "|" + r.fix + "|" + r.rider_dreamer + "|" + r.crew_dreamer + "|" + cinDone(r), F: F, men: [] };
g.add(cinDamage(r, F));
var live = r.state !== "arrested" && r.state !== "escaped" && r.state !== "under_control";
if (live && r.state !== "reported")
cinTape(g);
var v = cinMan("v" + r.id, {});
if (v && (live || r.fix === "broken" || r.fix === "repairing")) {
v.position.set(1.6, 0, 2.4);
v.rotation.y = -0.5;
g.add(v);
o.victim = v;
}
if (r.kind === "crime" && !r.rider_dreamer && (r.state === "at_scene" || r.state === "arrested" || r.state === "chasing")) {
var rd = cinMan("r" + r.id, { dress: "watch", helmet: 0x8B1A1A });
if (rd) {
rd.userData.lcyName = String(r.rider_name || "").replace(/^Rider /, "") || rd.userData.lcyName;
o.rider = rd;
}
}
if (r.kind === "major" && live) {
for (var i = 0; i < 2; i++) {
var m = cinMan("m" + r.id + i, { dress: "hivis", helmet: 0xF2C12E });
if (m) {
m.position.set(-1.8 + i * 3.4, 0, 3.4);
m.rotation.y = Math.PI;
g.add(m);
o.men.push(m);
}
}
}
if (r.fix === "repairing" && !r.crew_dreamer) {
for (var k = 0; k < 2; k++) {
var cw = cinMan("c" + r.id + k, { dress: "hivis", helmet: 0xF2C12E, tool: k ? "shovel" : "drill" });
if (cw) {
cw.position.set(-2.4 + k * 1.6, 0, 1.1);
cw.rotation.y = Math.PI;
g.add(cw);
o.men.push(cw);
}
}
}
if (r.kind === "crime" && r.state !== "escaped" && r.culprit && r.culprit.name) {
var cu = cinMan("u" + r.id + (r.culprit.seed || 0), {});
if (cu) {
cu.userData.lcyName = r.culprit.name;
o.culprit = cu;
INCD.root.add(cu);
}
}
if (o.rider)
INCD.root.add(o.rider);
INCD.root.add(g);
return o;
},
function (id) {
var r = INCD.rows.filter(function (x) { return x.id === id; })[0];
if (!r || r.kind !== "crime" || r.closed || !r.culprit || !r.culprit.name)
return null;
var o = INCD.objs[r.id], F = (o && o.F) || cinFrontOf(r.place);
if (!F)
return null;
var C = r.state === "arrested" ? cinAt(F, 3.2, -1.4) : cinCulpritAt(r, F, cinT(r)), h = INCD.hunt[r.id], now = Date.now();
var frozen = !!(h && h.frz > now), lock = frozen || !!(h && h.tag > now);
return { id: r.id, name: r.culprit.name, look: r.culprit.look || "", what: r.what, place: r.place, state: r.state, x: C.x, y: C.y, z: C.z, running: r.state !== "arrested" && !frozen,
cover: !!C.cover && !lock, drones: cinDronesUp(r), gone: r.state === "escaped" };
},
function (P, C) {
try {
var from = new THREE.Vector3(P.x, P.y, P.z), dir = new THREE.Vector3(C.x - P.x, C.y + 1.5 - P.y, C.z - P.z), L = dir.length();
if (L < 3)
return true;
dir.normalize();
var ray = new THREE.Raycaster(from, dir, 0.3, L - 0.8);
if (typeof bakeRayPick === "function" && bakeRayPick(ray.ray, L - 0.8))
return false;
var mx = (P.x + C.x) / 2, mz = (P.z + C.z) / 2, near = [];
if (typeof meshes !== "undefined")
for (var id in meshes) {
var m = meshes[id];
if (m && m.visible && m.parent && Math.abs(m.position.x - mx) < L / 2 + 25 && Math.abs(m.position.z - mz) < L / 2 + 25)
near.push(m);
}
return !ray.intersectObjects(near, true).some(function (x) { var o = x.object; return o && o.visible && o.isMesh; });
}
catch (e) {
return true;
}
},
function (r, h, o, C, P, dt) {
var now = Date.now(), nm = (r.culprit && r.culprit.name) || "the culprit", fn = cinFirst(nm), dist = Math.hypot(C.x - P.x, C.z - P.z);
if (h.frz && h.frz <= now) {
h.off = h.frzT - Math.max(0, (incdNow() - Date.parse(r.at)) / 1000);
h.frz = 0;
h.bolt = now + 6000;
h.said.lock = 0;
if (typeof setStatus === "function")
setStatus("💨 " + esc(fn) + " bolts! Get in close and shout freeze again.");
}
var frozen = h.frz > now;
if (!frozen && (dist < 16 || h.bolt > now))
h.off += (dt || 0.016) * (dist < 9 ? 1.4 : 1);
if (now - h.losAt > 350) {
var gap = (now - (h.losAt || now)) / 1000;
h.losAt = now;
h.vis = dist < 32 && cinSees(P, C);
h.sight = h.vis ? h.sight + gap : Math.max(0, h.sight - gap * 2);
}
if (h.vis && h.sight >= 2) {
if (!h.drones)
cinSay("eyes", h, "👀 You have eyes on " + esc(nm) + ". Call the Roost drones so they can lock on.");
else if (!(h.tag > now)) {
h.tag = now + 90000;
h.said.lost = 0;
if (typeof setStatus === "function")
setStatus("🎯 Tagged. The Roost has a lock on " + esc(fn) + " for 90 seconds, even in a crowd.");
}
}
var lock = h.tag > now || frozen;
if (h.drones && now > h.drones + 20000) {
if (!C.cover || lock) {
if (now - h.seenAt > 4000 || lock) {
h.seen = { x: C.x, z: C.z };
h.seenAt = now;
}
h.said.lost = 0;
cinSay("found", h, "🛸 The Roost has found " + esc(nm) + ". Follow the pointer, get them in sight to tag them.");
}
else if (h.seen)
cinSay("lost", h, "🛸 The Roost lost " + esc(fn) + " " + (C.pace <= 2.2 ? "in the crowd" : "in a lane") + ". The pointer is on the last sighting.");
h.said.sweep = 1;
}
else if (h.drones)
cinSay("sweep", h, "🛸 The Roost drones are sweeping the streets for " + esc(fn) + "…");
if (!lock)
h.said.lock = 0;
var to = (h.vis || lock) ? C : h.seen;
if (!to) {
var F = o.F;
if (F) {
var q = cinCulpritAt(r, F, 45);
to = { x: q.x, z: q.z };
}
}
if (to && typeof guideTo !== "undefined")
guideTo = { key: (h.vis || lock) ? nm : (h.seen ? "last seen: " + nm : nm + " went " + ((r.culprit && r.culprit.way) || "off")), x: to.x, z: to.z, chase: true };
INCD.guide = r.id;
},
function (t, r) {
t = String(t || "");
if (t.length > 60 || /\?/.test(t))
return false;
var w = t.toLowerCase().replace(/[^a-z\s']/g, " ").replace(/'/g, "").split(/\s+/).filter(Boolean);
if (!w.length || w.length > 6 || w.indexOf("freeze") < 0)
return false;
var nm = String((r.culprit && r.culprit.name) || "").toLowerCase().split(/\s+/);
return w.every(function (x) { return CIN_FREEZE_OK[x] || nm.indexOf(x) >= 0; });
},
function (t) {
var r = INCD.rows.filter(function (x) { return x.kind === "crime" && x.mine_rider && x.state === "chasing" && !x.closed; })[0];
if (!r || !cinFreezeWord(t, r))
return;
var h = cinHunt(r), o = INCD.objs[r.id], now = Date.now(), fn = cinFirst(r.culprit && r.culprit.name), say = function (s) { if (typeof setStatus === "function")
setStatus(s); };
if (now - h.shoutAt < 3000)
return;
h.shoutAt = now;
if (h.frz > now)
return say("✋ " + esc(fn) + " is already frozen. Arrest them!");
if (now - h.frzOk < 12000)
return say("🗣️ " + esc(fn) + " won't fall for it again so soon. Give it a few seconds.");
if (!o || o.cx === undefined || typeof camera === "undefined")
return say("🗣️ " + esc(fn) + " is nowhere near enough to hear you.");
var P = camera.position, d = Math.hypot(o.cx - P.x, o.cz - P.z);
if (d > 22)
return say("🗣️ " + esc(fn) + " is too far off to hear you" + (d < 60 ? " (" + Math.round(d) + " m). Get within about 20 m." : ". Get closer."));
if (!cinSees(P, { x: o.cx, y: o.cy || terrainY(o.cx, o.cz), z: o.cz }))
return say("🗣️ " + esc(fn) + " can't see you. Get them in sight first.");
h.frzT = cinT(r);
h.frz = now + CIN_FREEZE_MS;
h.frzOk = now;
h.bolt = 0;
say("✋ \"Freeze!\" " + esc(fn) + " stops dead, hands up. You have 8 seconds: get close and arrest them.");
if (typeof cityRpc === "function")
cityRpc("city_incident_act", { p_id: r.id, p_do: "freeze" }).then(function (x) {
if (x && !x.ok && x.say && x.say !== "Do what?") {
h.frz = 0;
h.off = h.frzT - Math.max(0, (incdNow() - Date.parse(r.at)) / 1000);
say(esc(x.say));
}
}).catch(function () { });
},
function (r) {
var h = cinHunt(r);
if (h.drones)
return;
if (typeof cityRpc !== "function")
return;
cityRpc("city_incident_act", { p_id: r.id, p_do: "drones" }).then(function (o) {
if (o && !o.ok && o.say !== "Do what?") {
if (typeof setStatus === "function")
setStatus(esc(o.say || "That did not go through."));
return;
}
h.drones = Date.now();
h.said = {};
if (typeof setStatus === "function")
setStatus("🛸 The Roost drones are up and on their way to " + esc(r.place) + " to look for " + esc(cinFirst(r.culprit && r.culprit.name)) + ".");
cinPoll(true);
}).catch(function (e) { if (typeof setStatus === "function")
setStatus(esc(String(e && e.message || e).slice(0, 140))); });
},
function (r, o, dc) {
var h = cinHunt(r), now = Date.now(), fn = cinFirst(r.culprit && r.culprit.name);
if (h.frz > now && dc < 4.5 * 4.5)
return { id: r.id, label: "🐉 Arrest " + r.culprit.name, run: function () { cinDo(r.id, "arrest"); } };
if (h.frz > now)
return { id: r.id, label: "✋ " + fn + " is frozen: get closer to arrest (" + Math.ceil((h.frz - now) / 1000) + " s)", busy: "Run in close, within a few steps.", run: function () { } };
if (!h.drones)
return { id: r.id, label: "🛸 Call the Roost drones", run: function () { cinCallDrones(r); } };
if (dc < 22 * 22 && h.vis)
return { id: r.id, label: "🗣️ Type \"freeze\" in the chat to stop " + fn, busy: "Open the chat and type: Freeze! They only stop for an order from you, close by and in sight.", run: function () { } };
return null;
},
function (r) {
var steps = r.steps || [], n = steps.length || 1, w = cinWork(r), k = Math.min(n - 1, w.k || 0), st = steps[k] || { s: "Do the job", m: 20 }, need = cinNeed(r, k), last = k >= n - 1;
var j = INCD.jobs[r.id], sec = (w.sec || 0) + (w.go && j && j.t ? Math.min(40, (Date.now() - j.t) / 1000) : 0);
if (!w.go)
return { id: r.id, label: "🛠️ Start: " + st.s + " (" + st.m + " min) · step " + (k + 1) + " of " + n, run: function () { cinBeat(r, false); } };
if (!j || Date.now() - j.t > 20000)
cinBeat(r, true);
if (sec < need)
return { id: r.id, label: "🛠️ " + st.s + "… " + cinClock(need - sec) + " left · step " + (k + 1) + " of " + n, busy: "Keep at it here: the work only counts while you are at " + r.place + ".", run: function () { } };
if ((w.sec || 0) < need)
return { id: r.id, label: "🛠️ " + st.s + "… nearly done · step " + (k + 1) + " of " + n, busy: "Nearly there.", run: function () { } };
return last ? { id: r.id, label: "✔️ Finish: check it over and hand it back", run: function () { cinNextStep(r, true); } }
: { id: r.id, label: "✔️ Done. Next: " + steps[k + 1].s + " (" + steps[k + 1].m + " min)", run: function () { cinNextStep(r, false); } };
}
];
});
