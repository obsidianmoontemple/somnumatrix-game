/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(420, function () {
"use strict";
return [
function (seed, o) {
var kind = o.child ? "child" : "human", L = (typeof randomLook === "function") ? randomLook("evc_" + seed, kind) : {}, h = evcHash(seed);
if (typeof csLookFill === "function")
try {
csLookFill(L, "evc_" + seed);
}
catch (e) { }
if (o.sex)
L.sex = o.sex;
var guise = o.guise != null ? o.guise : (o.plain ? -1 : (h % 10 < 7 ? h % ((typeof SCP_GUISE !== "undefined") ? SCP_GUISE.length : 1) : -1));
var G = (guise >= 0 && typeof SCP_GUISE !== "undefined") ? SCP_GUISE[guise % SCP_GUISE.length] : null;
if (G) {
L.top = G.top;
L.topKind = G.topKind || null;
L.bottom = G.bottom;
L.layer = G.layer || null;
L.layerColor = G.layerColor;
L.hat = G.hat || null;
L.hatColor = G.hatColor;
L.back = G.back || null;
L.backColor = G.backColor;
L.neck = G.neck || null;
if (G.skin != null && !o.child)
L.skin = G.skin;
if (G.shoes != null)
L.shoes = G.shoes;
if (G.sp && !o.child)
L.species = G.sp;
}
if (o.dress)
Object.keys(o.dress).forEach(function (k) { L[k] = o.dress[k]; });
return { L: L, G: G, kind: kind };
},
function (seed, o) {
var lk = evcLook(seed, o), L = lk.L;
if (typeof fillLook === "function")
try {
fillLook(L, "evc_" + seed);
}
catch (e) { }
var sp = L.species, so = sp && typeof SPECIES_FEATS !== "undefined" && SPECIES_FEATS[sp];
var spec = { id: "evc_" + seed, archetype: lk.kind, attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true };
var g = buildFigure(spec, 1);
if (so && typeof dressFolk === "function") {
try {
dressFolk(g, spec, 1, so);
if (so.hover)
g.children[0].position.y += so.hover;
}
catch (e) { }
}
if (lk.G && lk.G.pumpkin) {
var pk = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 9), new THREE.MeshLambertMaterial({ color: 0xE8701A }));
pk.scale.set(1.15, 0.9, 1.1);
pk.position.set(0, 1.66, 0);
pk.userData.scpMine = 1;
g.add(pk);
}
g.traverse(function (m) { m.raycast = function () { }; });
g.userData.evcWho = o.who || "";
g.userData.evcAct = o.act || "stand";
g.userData.evcPh = (evcHash(seed) % 628) / 100;
return g;
},
function (g, x, z, y, h, face) {
if (typeof sofPose === "function")
try {
sofPose(g, "sit", x, z, y, h, face);
g.userData.evcHome = { x: g.position.x, y: g.position.y, z: g.position.z, ry: face };
return;
}
catch (e) { }
g.position.set(x, y + h - 0.95, z);
g.rotation.y = face;
var L = g.userData.limbs;
if (L) {
if (L.ll)
L.ll.rotation.x = -1.45;
if (L.rl)
L.rl.rotation.x = -1.45;
}
g.userData.evcHome = { x: g.position.x, y: g.position.y, z: g.position.z, ry: face };
},
function () {
var F = SHC.fair, G = new THREE.Group();
G.name = "samhain fair crowd";
scene.add(G);
var C = EVC.fair = { g: G, figs: [], src: F, key: evcFairKey(F), walk: [], hoop: null, t: 0 }, lite = evcLite(), y0 = function (x, z) { return typeof shcY === "function" ? shcY(x, z) : 0; };
function put(seed, o, lx, lz, S, face) { evcQueue(C, seed, o, function (g) { var p = evcLocal(S, lx, lz); evcStand(g, p.x, y0(p.x, p.z), p.z, S.rot + face); }); }
F.stalls.forEach(function (S, si) {
var W = EVC_STALL_WHO[S.k] || ["a stallholder at the Samhain Fair", "at the Samhain Fair"], key = "f" + si;
if (S.k === "story") {
evcQueue(C, key + "teller", { plain: true, dress: { top: 0x3A2A1A, topKind: "robe", bottom: 0x2A1A12, hat: "hood", hatColor: 0x3A2A1A }, who: W[0], act: "tell" }, function (g) { var p = evcLocal(S, 1.9, -1.7); evcStand(g, p.x, y0(p.x, p.z), p.z, S.rot + Math.atan2(-1.9, 1.7)); });
var logs = [[0, 2.8, 0], [2.6, 1.2, 1.2], [-2.6, 1.2, -1.2]], seats = [];
logs.forEach(function (l) { var dx = Math.cos(l[2]), dz = -Math.sin(l[2]); [-0.75, 0, 0.75].forEach(function (u) { seats.push([l[0] + dx * u, l[1] + dz * u]); }); });
seats.slice(0, evcN("story")).forEach(function (q, k) {
var child = k === 2 || k === 6;
evcQueue(C, key + "sit" + k, { child: child, who: W[1] + (child ? ", with your family" : ""), act: "sit" }, function (g) { var p = evcLocal(S, q[0], q[1]), c = evcLocal(S, 0, 0); evcSit(g, p.x, p.z, y0(p.x, p.z), 0.44, Math.atan2(c.x - p.x, c.z - p.z)); });
});
return;
}
if (S.k === "show") {
put(key + "man", { plain: true, dress: { top: 0x1A1418, layer: "suit", layerColor: 0x2A1A2A, bottom: 0x141014, hat: "top", hatColor: 0x141014 }, who: W[0], act: "wave" }, 2.1, 1.6, S, Math.PI * 0.5);
for (var k = 0; k < evcN("show"); k++) {
var row = Math.floor(k / 3), col = k % 3, child = k === 4;
put(key + "aud" + k, { child: child, who: W[1] + (child ? ", with your family" : ""), act: "watch" }, (col - 1) * 1.15 + (row % 2) * 0.4, 3.2 + row * 1.25, S, Math.PI);
}
return;
}
var kd = { hunt: { top: 0x5A3A1A, layer: "vest", layerColor: 0x3A2A1A, bottom: 0x2A1A12, hat: "brimmed", hatColor: 0x3A2A1A }, toss: { top: 0xC84A1A, layer: "vest", layerColor: 0x1A1418, bottom: 0x2A2A30, hat: "cap", hatColor: 0x1A1418 },
cauldron: null, fortune: { top: 0x4A1A6A, topKind: "robe", bottom: 0x2A1040, hat: "hood", hatColor: 0x6A2A8A } }[S.k];
var ko = S.k === "cauldron" ? { guise: 0, sex: "f", who: W[0], act: "stir" } : { plain: true, dress: kd || {}, who: W[0], act: "keep" };
if (S.k === "cauldron")
put(key + "keep", ko, 0, -1.25, S, 0);
else
put(key + "keep", ko, S.k === "toss" ? -1.3 : 0, 0.25, S, 0);
var front = S.k === "toss" ? [[0, 2.3, "throw"], [-0.9, 3.5, "wait"], [0.8, 3.7, "wait"], [1.9, 2.6, "cheer"]] : S.k === "cauldron" ? [[-0.75, 2.0, "stir"], [0.7, 2.0, "stir"], [0, 2.5, "watch"]] : S.k === "fortune" ? [[-0.5, 2.0, "lean"], [0.6, 2.1, "watch"]] : [[-0.4, 2.0, "lean"], [0.7, 2.3, "watch"]];
if (lite)
front = front.slice(0, 2);
front.forEach(function (q, k) {
var child = (S.k === "toss" && k === 1) || (S.k === "hunt" && k === 1);
put(key + "p" + k, { child: child, who: W[1] + (child ? ", with your family" : ""), act: q[2] }, q[0], q[1], S, Math.PI);
});
if (S.k === "toss" && !C.hoop) {
var hp = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.03, 6, 16), new THREE.MeshLambertMaterial({ color: 0xE8C040 }));
hp.userData.scpMine = 1;
hp.raycast = function () { };
hp.visible = false;
G.add(hp);
C.hoop = { m: hp, S: S };
}
});
var pts = F.stalls.map(function (S) { var p = evcLocal(S, 0, 5.6); return { x: p.x, z: p.z, S: S }; });
var J = typeof shcJackSpot === "function" ? shcJackSpot() : null;
if (J) {
var jx = J.x + (ATLC.x - J.x) / (J.r || 97) * 9, jz = J.z + (ATLC.z - J.z) / (J.r || 97) * 9;
pts.push({ x: jx, z: jz, S: null, jack: true });
}
C.pts = pts;
for (var w = 0; w < evcN("wander"); w++) {
(function (w) {
var child = w % 5 === 3;
evcQueue(C, "fw" + w, { child: child, who: EVC_WANDER_WHO + (child ? ", with your family" : ""), act: "walk" }, function (g) {
var i = w % pts.length, a = pts[i], off = ((w * 37) % 7 - 3) * 0.5;
g.userData.evcW = { i: i, to: (i + 1) % pts.length, u: (w * 0.13) % 1, sp: 0.9 + ((w * 13) % 7) * 0.06, hold: 0, dir: w % 2 ? 1 : -1, off: off };
evcStand(g, a.x, y0(a.x, a.z), a.z, 0);
C.walk.push(g);
});
})(w);
}
if (J)
for (var kn = 0; kn < evcN("knots"); kn++) {
var ca = J.a + (kn - 1) * 0.09, cr = (J.r || 97) - 12 - (kn % 2) * 3, cx = ATLC.x + Math.cos(ca) * cr, cz = ATLC.z + Math.sin(ca) * cr, sz = 3 + (kn % 2);
for (var m = 0; m < sz; m++) {
(function (cx, cz, m, sz, kn) {
var an = m / sz * Math.PI * 2 + kn;
evcQueue(C, "fk" + kn + "_" + m, { who: "at the Samhain Fair with friends, in costume, standing by the Great Jack talking and laughing", act: m % 2 ? "chat" : "laugh" }, function (g) { var x = cx + Math.cos(an) * 0.95, z = cz + Math.sin(an) * 0.95; evcStand(g, x, y0(x, z), z, Math.atan2(cx - x, cz - z)); });
})(cx, cz, m, sz, kn);
}
}
},
function () {
var ST = SCP.stage, G = new THREE.Group();
G.name = "costume contest crowd";
ST.g.add(G);
var C = EVC.stage = { g: G, figs: [], src: ST, walk: [] }, n = evcN("stage");
C.key = ST.spot ? Math.round(ST.spot.x) + "," + Math.round(ST.spot.z) : "";
var who = "at the Samhain Costume Contest in the Tower Plaza, in costume yourself, watching the entrants on the stage and the catwalk and cheering for your favourites";
for (var k = 0; k < n; k++) {
(function (k) {
var side = k % 3, i = Math.floor(k / 3), lx, lz, f;
if (side < 2) {
var sd = side ? 1 : -1;
lx = sd * (2.7 + (i % 2) * 1.1);
lz = 4.2 + Math.floor(i / 2) * 2.1 + (i % 2) * 0.6;
f = sd > 0 ? -Math.PI / 2 : Math.PI / 2;
}
else {
lx = (i % 4 - 1.5) * 1.2;
lz = 13.6 + Math.floor(i / 4) * 1.2;
f = Math.PI;
}
evcQueue(C, "st" + k, { who: who, act: "clap", sex: k % 2 ? "m" : "f" }, function (g) {
g.position.set(lx, 0, lz);
g.rotation.y = f;
g.userData.evcHome = { x: lx, y: 0, z: lz, ry: f };
});
})(k);
}
},
function () {
var G = new THREE.Group();
G.name = "samhain congregation";
OTM.G.add(G);
var C = EVC.hall = { g: G, figs: [], src: OTM.G }, lite = !!OTM.lite, rows = lite ? 7 : 11, gap = lite ? 2.2 : 1.5, n = evcN("hall"), seats = [];
for (var r = 0; r < rows; r++)
[-1, 1].forEach(function (sd) { [-2.6, -1.3, 0, 1.3, 2.6].forEach(function (u, ui) { seats.push({ x: sd * 6.6 + u, z: -22 + r * gap, h: evcHash("s" + r + sd + ui) }); }); });
seats.sort(function (a, b) { return (a.z - b.z) * 0.6 + ((a.h % 100) - (b.h % 100)) * 0.02; });
var took = seats.filter(function (s, i) { return s.h % 5 !== 0; }).slice(0, n);
var robes = [0x0E0A12, 0x1A0E22, 0x120A0A, 0x2A1A3A, 0x0A0A10];
took.forEach(function (s, k) {
var robed = k % 3 !== 2, o = { who: "", act: "sit", plain: !robed && k % 2 === 0 };
if (robed)
o.dress = { top: robes[k % robes.length], topKind: "robe", bottom: 0x0A0A0E, hat: k % 4 === 0 ? "hood" : null, hatColor: robes[k % robes.length] };
evcQueue(C, "th" + k, o, function (g) { evcSit(g, s.x, s.z + 0.05, 0, 0.52, Math.PI); });
});
},
function (C, t, clap) {
if (!C)
return;
var P = camera.position, talking = typeof talkOpen !== "undefined" && !!talkOpen;
C.figs.forEach(function (g) {
var a = g.userData.evcAct, ph = g.userData.evcPh || 0, L = g.userData.limbs, H = g.userData.evcHome;
if (!L || a === "sit" || a === "walk")
return;
var la = 0, ra = 0, lz = null;
if (a === "throw") {
var u = ((t * 0.33 + ph) % 1);
ra = u < 0.35 ? -0.4 - u * 6 : u < 0.45 ? -2.5 + (u - 0.35) * 28 : -0.3;
la = -0.2;
}
else if (a === "stir") {
ra = -1.0 + Math.sin(t * 2.2 + ph) * 0.35;
la = -0.9 + Math.cos(t * 2.2 + ph) * 0.35;
}
else if (a === "cheer" || (a === "clap" && clap)) {
var c = Math.abs(Math.sin(t * (a === "clap" ? 7 : 3) + ph));
la = -1.1 - c * 0.3;
ra = -1.1 - c * 0.3;
lz = 0.25 - c * 0.25;
}
else if (a === "lean") {
la = -0.7;
ra = -0.7;
}
else if (a === "wave" || a === "tell") {
ra = -0.6 - Math.max(0, Math.sin(t * 1.4 + ph)) * 1.1;
la = -0.15 + Math.sin(t * 0.9 + ph) * 0.1;
}
else if (a === "laugh") {
la = -0.2 + Math.sin(t * 1.1 + ph) * 0.15;
ra = -0.3 - Math.max(0, Math.sin(t * 0.7 + ph)) * 0.6;
if (H)
g.position.y = H.y + Math.max(0, Math.sin(t * 5 + ph)) * Math.max(0, Math.sin(t * 0.5 + ph)) * 0.04;
}
else {
la = Math.sin(t * 1.3 + ph) * 0.1;
ra = -Math.sin(t * 1.1 + ph) * 0.1;
}
if (L.la)
L.la.rotation.x = la;
if (L.ra)
L.ra.rotation.x = ra;
if (lz !== null) {
if (L.la)
L.la.rotation.z = -lz;
if (L.ra)
L.ra.rotation.z = lz;
}
if (H && a !== "throw" && a !== "stir") {
var wp = g.getWorldPosition(new THREE.Vector3()), d = Math.hypot(wp.x - P.x, wp.z - P.z);
if (talking && d < 3.2) {
var par = g.parent, pr = par ? par.getWorldQuaternion(new THREE.Quaternion()) : null, py = pr ? new THREE.Euler().setFromQuaternion(pr, "YXZ").y : 0;
g.rotation.y = Math.atan2(P.x - wp.x, P.z - wp.z) - py;
}
else
g.rotation.y = H.ry + Math.sin(t * 0.4 + ph) * 0.15;
}
});
},
function (C, dt, t) {
if (!C || !C.walk.length)
return;
var P = camera.position, talking = typeof talkOpen !== "undefined" && !!talkOpen;
C.walk.forEach(function (g) {
var W = g.userData.evcW, a = C.pts[W.i], b = C.pts[W.to], L = g.userData.limbs;
if (!a || !b)
return;
var near = Math.hypot(g.position.x - P.x, g.position.z - P.z);
if (talking && near < 3.2) {
g.rotation.y = Math.atan2(P.x - g.position.x, P.z - g.position.z);
if (L) {
["ll", "rl", "la", "ra"].forEach(function (k) { if (L[k])
L[k].rotation.x = 0; });
}
return;
}
if (W.hold > 0) {
W.hold -= dt;
if (L) {
if (L.ll)
L.ll.rotation.x = 0;
if (L.rl)
L.rl.rotation.x = 0;
if (L.la)
L.la.rotation.x = Math.sin(t + W.off) * 0.1;
if (L.ra)
L.ra.rotation.x = -0.2;
}
if (W.look != null)
g.rotation.y = W.look;
return;
}
var dx = b.x - a.x, dz = b.z - a.z, len = Math.hypot(dx, dz) || 1;
W.u += W.sp * dt / len;
if (W.u >= 1) {
W.u = 0;
W.i = W.to;
var n = C.pts.length;
W.to = (W.i + W.dir + n) % n;
if ((W.i * 7 + W.to) % 5 === 0)
W.dir = -W.dir;
var S = C.pts[W.i].S;
W.hold = 3 + ((W.i * 13 + Math.round(W.off * 10)) % 6);
W.look = S ? S.rot + Math.PI : null;
return;
}
var px = -dz / len * W.off, pz = dx / len * W.off, x = a.x + dx * W.u + px, z = a.z + dz * W.u + pz;
g.position.set(x, (typeof shcY === "function" ? shcY(x, z) : 0), z);
g.rotation.y = Math.atan2(dx, dz);
if (L) {
var s = Math.sin(t * 6.2 * W.sp + W.off) * 0.5;
if (L.ll)
L.ll.rotation.x = s;
if (L.rl)
L.rl.rotation.x = -s;
if (L.la)
L.la.rotation.x = -s * 0.6;
if (L.ra)
L.ra.rotation.x = s * 0.6;
}
});
},
function (C, t) {
var H = C && C.hoop;
if (!H)
return;
var S = H.S, u = ((t * 0.33 + 0.0) % 1), thrower = null;
C.figs.forEach(function (g) { if (g.userData.evcAct === "throw")
thrower = g; });
if (!thrower || u < 0.42 || u > 0.78) {
H.m.visible = false;
return;
}
var k = (u - 0.42) / 0.36, f = thrower.position, tp = evcLocal(S, (Math.floor(t * 0.33) % 3 - 1) * 1.1, -0.6), y = typeof shcY === "function" ? shcY(tp.x, tp.z) : 0;
H.m.visible = true;
H.m.position.set(f.x + (tp.x - f.x) * k, f.y + 1.7 + Math.sin(k * Math.PI) * 1.1 - k * 0.3 + (y - f.y) * k, f.z + (tp.z - f.z) * k);
H.m.rotation.set(Math.PI / 2 - k * 0.6, 0, k * 4);
},
function () {
var on = typeof OTM !== "undefined" && OTM.G && OTM.built && typeof otmSamhainOn === "function" && otmSamhainOn();
if (!on) {
evcAway(EVC.hall);
return;
}
if (!EVC.hall)
evcHallBuild();
else {
EVC.hall.src = OTM.G;
evcBack(EVC.hall, OTM.G);
}
evcWork();
},
function () {
function n(C) { return evcShown(C) ? C.figs.length : 0; }
var acts = {};
[EVC.fair, EVC.stage, EVC.hall].forEach(function (C) { if (evcShown(C))
C.figs.forEach(function (g) { var a = g.userData.evcAct; acts[a] = (acts[a] || 0) + 1; }); });
return { fair: n(EVC.fair), stage: n(EVC.stage), hall: n(EVC.hall), queued: EVC.q.length, walkers: EVC.fair ? EVC.fair.walk.length : 0, acts: acts };
}
];
});
