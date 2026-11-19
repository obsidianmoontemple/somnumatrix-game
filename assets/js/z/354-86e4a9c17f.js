/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(354, function () {
"use strict";
return [
function (W, seed) {
var g;
if (W.make && CT_BODIES[W.make]) {
g = new THREE.Group();
CT_BODIES[W.make](g, W.mo || null);
}
else if (W.deity) {
g = build({ id: "ct_" + seed, archetype: "deity", deity: W.deity, attrs: {}, solid: false, detail: 3, nights: [], city: true });
}
else if (W.being) {
g = build({ id: "ct_" + seed, archetype: W.being, label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, look: W.o && W.o.look || undefined });
}
else {
var o = Object.assign({}, W.o || {});
if (W.child)
o.child = 1;
g = wPerson("ct_" + seed, o);
}
if (W.s)
g.scale.multiplyScalar(W.s);
if (W.make && CT_ADDS[W.make])
try {
CT_ADDS[W.make](g, W);
}
catch (e) { }
g.userData.ctKeep = 1;
return g;
},
function (T, W) {
var who = W.n, place = T.where || "";
return { name: who, greet: W.greet || ("Hello, traveller."),
persona: "You are " + W.who + ", from " + T.t + " (" + T.by + "), as the original book or old tale tells it, never as any film shows it. You stand in " + place +
" in SomnuMatrix. Stay in character and speak as you do in the story, warmly and briefly. If asked, tell the dreamer about your story, the time and place it comes from, and the " +
"real history or science behind it, truthfully. If they want to play the story, point them to the story board (📖), or in the story's own world to the next chapter's lectern. Keep everything suitable for ages 13 and up." };
},
function (P, x, z, rad, taken) {
if (Math.hypot(x, z) < 24)
return false;
try {
if (typeof dqPieceHit === "function" && dqPieceHit(x, z, rad, false))
return false;
if (typeof dqOnRibbon === "function" && (dqOnRibbon(x, z, "flow", rad) || dqOnRibbon(x, z, "path", 1.5)))
return false;
}
catch (e) { }
for (var i = 0; i < taken.length; i++) {
if (Math.hypot(x - taken[i][0], z - taken[i][1]) < taken[i][2] + rad)
return false;
}
return true;
},
function (k, P) {
var list = CT_BY_HOST["land:" + k] || [], taken = [], at = CT.landAt[k] = {};
if (typeof DQ !== "undefined")
DQ.plan = P;
list.forEach(function (T, ti) {
var c = null, R = ctRand(ctHash(T.id));
if (T.at && ctLandFree(P, T.at[0], T.at[1], T.rad || 9, taken))
c = T.at;
for (var tries = 0; !c && tries < 160; tries++) {
var r = 30 + tries * 0.6, a = R() * Math.PI * 2, x = Math.sin(a) * r, z = Math.cos(a) * r;
if (ctLandFree(P, x, z, T.rad || 9, taken))
c = [x, z];
}
if (!c)
return;
taken.push([c[0], c[1], (T.rad || 9) + 6]);
at[T.id] = c;
var face = Math.atan2(-c[0], -c[1]);
ctLay(T, c[0], c[1], face, {
kit: function (a, x, z, rot, s, o) { P.k(a, x, z, rot, s, o || {}); },
make: function (x, z, rot, r, fn, solid) { P.make(x, z, rot, r, function (g, H) { fn(g, H); }, solid || null); },
who: function (W, x, z, rot, talk) {
if (W.deity || W.make) {
P.make(x, z, rot, 0.8, function (g) { g.add(ctPersonBody(W, T.id + "_" + W.n)); return true; });
P.fact(x, z, 3.2, W.n, "talk", { ctTalk: talk });
}
else if (W.being) {
var it = P.being(W.being, x, z, rot, W.s || 1, talk, W.wander ? { r: W.wander } : null, W.o && W.o.look || null);
if (!it)
P.fact(x, z, 3, W.n, "talk", { ctTalk: talk });
}
else {
var o = Object.assign({}, W.o || {});
if (W.child)
o.child = 1;
if (W.s)
o.scale = W.s;
P.person(T.id + "_" + ctHash(W.n), x, z, rot, o, talk, W.wander ? { r: W.wander } : null);
}
},
board: function (x, z, rot) {
P.make(x, z, rot, 1.4, function (g) { ctBoardShape(g, T); return true; }, { hw: 1.2, hd: 0.3, h: 2.4 });
P.fact(x, z, 3, "📖 " + T.t, "play the story", { ct: T.id });
}
});
});
},
function (T, cx, cz, face, put) {
var c = Math.cos(face), s = Math.sin(face);
function at(dx, dz) { return [cx + dx * c + dz * s, cz - dx * s + dz * c]; }
var b = at(0, 5.5);
put.board(b[0], b[1], face);
(T.props || []).forEach(function (p) {
var q = at(p[1], p[2]), rot = face + (p[3] || 0);
if (CT_SHAPES[p[0]])
put.make(q[0], q[1], rot, p[5] || 1.5, function (g) { CT_SHAPES[p[0]](g, p[4] || {}); }, p[6] || null);
else
put.kit(p[0], q[0], q[1], rot, p[4] || 1, p[5] || {});
});
var n = T.who.length;
T.who.forEach(function (W, i) {
var off = W.at || [(i - (n - 1) / 2) * 3.2, -1.5 - Math.abs(i - (n - 1) / 2) * 0.8], q = at(off[0], off[1]);
put.who(W, q[0], q[1], face + (W.turn || 0), ctTalk(T, W));
});
},
function (g, T) {
var wood = new THREE.MeshLambertMaterial({ color: 0x4A3424 }), col = T.col || ["#2A2018", "#F2E2B0"];
[-1, 1].forEach(function (sd) { var p = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.1, 0.14), wood); p.position.set(sd * 1.05, 1.05, 0); g.add(p); });
if (typeof wSign === "function") {
var b = wSign(["📖 " + T.t, T.by, "Press E to play"], 2.4, 1.15, col[0], col[1]);
b.position.set(0, 1.62, 0.08);
g.add(b);
}
var bk = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 0.5), new THREE.MeshLambertMaterial({ color: 0xF2EAD6, emissive: 0x3A3020, emissiveIntensity: 0.5 }));
bk.position.set(0, 2.28, 0);
bk.rotation.x = -0.25;
g.add(bk);
if (typeof wGlow === "function" && !T.soft) {
var gl = wGlow(0xFFE2A0, 2.2, 0.35);
gl.position.set(0, 2.5, 0);
g.add(gl);
}
},
function (W, x, z, rad, y0, taken) {
for (var i = 0; i < taken.length; i++) {
if (Math.hypot(x - taken[i][0], z - taken[i][1]) < taken[i][2] + rad)
return false;
}
if (W.bound && Math.hypot(x, z) > W.bound - rad - 10)
return false;
var lo = 1e9, hi = -1e9, pts = [[0, 0], [rad, 0], [-rad, 0], [0, rad], [0, -rad], [rad * 0.7, rad * 0.7], [-rad * 0.7, rad * 0.7], [rad * 0.7, -rad * 0.7], [-rad * 0.7, -rad * 0.7]];
for (var j = 0; j < pts.length; j++) {
var px = x + pts[j][0], pz = z + pts[j][1], h;
try {
h = W.ground(px, pz, y0 + 2);
}
catch (e) {
return false;
}
if (h == null || !isFinite(h) || h < -40 || Math.abs(h - y0) > 10)
return false;
lo = Math.min(lo, h);
hi = Math.max(hi, h);
try {
if (W.block && W.block(px, pz, h + 0.2))
return false;
}
catch (e) {
return false;
}
}
return hi - lo < 1.4;
},
function (host) {
var W = WLD.w;
if (!W || !W.g)
return;
if (CT.g && CT.g.parent)
CT.g.parent.remove(CT.g);
CT.g = new THREE.Group();
CT.g.name = "classic-tales";
W.g.add(CT.g);
CT.wg = W.g;
CT.host = host;
CT.talkers = [];
CT.solids = [];
CT.at = {};
CT.near = null;
CT.arr = CT.arr || {};
var A = CT.arr[host] || (CT.arr[host] = WLD.arrive ? { x: WLD.arrive.x, z: WLD.arrive.z } : { x: 0, z: 0 }), y0 = 0;
try {
y0 = +W.ground(A.x, A.z, camera.position.y - 1.72) || 0;
}
catch (e) { }
CT.feet0 = y0;
var taken = [[A.x, A.z, 16]];
(CT_BY_HOST[host] || []).forEach(function (T) {
var c = null, R = ctRand(ctHash(T.id)), rad = T.rad || 9;
if (T.at && ctWorldFree(W, T.at[0], T.at[1], rad, y0, taken))
c = T.at;
for (var tries = 0; !c && tries < 240; tries++) {
var r = (T.near || 30) + tries * 0.5, a = R() * Math.PI * 2, x = A.x + Math.sin(a) * r, z = A.z + Math.cos(a) * r;
if (ctWorldFree(W, x, z, rad, y0, taken))
c = [x, z];
}
if (!c)
return;
taken.push([c[0], c[1], rad + 6]);
CT.at[T.id] = c;
var face = Math.atan2(A.x - c[0], A.z - c[1]), cy = W.ground(c[0], c[1], y0 + 2) || 0;
function gy(x, z) { var h = null; try {
h = W.ground(x, z, cy + 2);
}
catch (e) { } return (h == null || !isFinite(h)) ? cy : +h; }
ctLay(T, c[0], c[1], face, {
kit: function (a, x, z, rot, s, o) {
var m = build({ id: "ct_" + T.id + "_" + a + "_" + Math.round(x) + "_" + Math.round(z), archetype: a, label: null, attrs: s !== 1 ? { s: s } : {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, hub: true });
m.position.set(x, gy(x, z) + ((o && o.y) || 0), z);
m.rotation.y = rot;
CT.g.add(m);
if (!(o && o.solid === false)) {
var sz = ctKitSize(a) * (s || 1);
if (sz > 0.5)
CT.solids.push({ x: x, z: z, r: Math.min(sz * 0.42, 6), h: 6 });
}
},
make: function (x, z, rot, r, fn, solid) {
var g = new THREE.Group();
g.position.set(x, gy(x, z), z);
g.rotation.y = rot;
CT.g.add(g);
fn(g, { y: function (lx, lz) { var c2 = Math.cos(rot), s2 = Math.sin(rot); return gy(x + lx * c2 + lz * s2, z - lx * s2 + lz * c2) - g.position.y; } });
if (solid) {
if (solid.r)
CT.solids.push({ x: x, z: z, r: solid.r, h: solid.h || 3 });
else
CT.solids.push({ x: x, z: z, rot: rot, hw: solid.hw, hd: solid.hd, h: solid.h || 3 });
}
},
who: function (Wh, x, z, rot, talk) {
var g = ctPersonBody(Wh, T.id + "_" + Wh.n);
g.position.set(x, gy(x, z), z);
g.rotation.y = rot;
CT.g.add(g);
var M = { g: g, wander: Wh.wander ? { r: Wh.wander } : null, home: [x, z] };
CT.talkers.push({ p: M, r: 3.4, name: Wh.n, talk: talk });
},
board: function (x, z, rot) {
var g = new THREE.Group();
g.position.set(x, gy(x, z), z);
g.rotation.y = rot;
ctBoardShape(g, T);
CT.g.add(g);
CT.solids.push({ x: x, z: z, rot: rot, hw: 1.2, hd: 0.3, h: 2.4 });
CT.talkers.push({ x: x, z: z, r: 3, name: "📖 " + T.t, verb: "play the story", ct: T.id });
}
});
});
},
function (dt) {
CT.talkers.forEach(function (T) { var M = T.p; if (M && M.wander && typeof wWander === "function")
wWander(M.g, dt, function (x, z) { var h = ctGround(x, z); return h == null ? M.g.position.y : h; }, M.wander); });
var busy = (typeof walkMode !== "undefined" && !walkMode) || (typeof talkOpen !== "undefined" && talkOpen) || (WLD.card && WLD.card.style.display === "block");
if (busy) {
if (CT.myFn && WLD.promptFn === CT.myFn) {
worldPrompt(null);
}
CT.myFn = null;
CT.near = null;
return;
}
var L = ctMe(), got = null, best = 1e9;
CT.talkers.forEach(function (T) { var x = T.p ? T.p.g.position.x : T.x, z = T.p ? T.p.g.position.z : T.z, d = Math.hypot(L.x - x, L.z - z); if (d < T.r && d < best) {
best = d;
got = T;
} });
if (got !== CT.near || (got && !WLD.promptFn)) {
CT.near = got;
if (got) {
var fn = function () { ctUse(got); };
CT.myFn = fn;
worldPrompt("<b>" + ctE(got.name) + "</b> · <b>press E</b> to " + (got.verb || "talk"), fn);
}
else if (CT.myFn && WLD.promptFn === CT.myFn) {
worldPrompt(null);
CT.myFn = null;
}
}
},
function (col, e, op) {
var k = col + "|" + (e || 0) + "|" + (op || 1);
if (CT_MATS[k])
return CT_MATS[k];
var m = new THREE.MeshLambertMaterial({ color: e ? col : Math.min(col, 0xFFFFFF) & 0xFFFFFF });
if (!e) {
var r = (col >> 16) & 255, gg = (col >> 8) & 255, b = col & 255, mx = Math.max(r, gg, b);
if (mx > 0xC0) {
var k = 0xC0 / mx;
m.color.setRGB(r * k / 255, gg * k / 255, b * k / 255);
}
}
if (e) {
m.emissive = new THREE.Color(e === 1 ? col : e);
m.emissiveIntensity = 0.55;
}
if (op && op < 1) {
m.transparent = true;
m.opacity = op;
m.depthWrite = false;
}
m.userData.ldShared = 1;
CT_MATS[k] = m;
return m;
},
function (g) {
ctTable(g, 7, 1.4, 0x6A4A2A, 0xF8F4EA);
for (var i = 0; i < 9; i++) {
var x = -3 + i * 0.75;
ctAdd(g, ctCyl(0.05, 0.04, 0.07, 8), [0xF8F8F8, 0xE86AA8, 0x6AC8E8][i % 3], x, 0.84, 0.2);
ctAdd(g, ctCyl(0.08, 0.08, 0.012, 10), 0xF8F8F8, x, 0.81, 0.2);
}
[-2.2, 0.2, 2.4].forEach(function (x, i) { ctAdd(g, ctSph(0.13), [0x4A8AD8, 0xE8C040, 0xD84A6A][i], x, 0.92, -0.2); ctAdd(g, ctCyl(0.02, 0.02, 0.16, 6), 0xE8C040, x + 0.15, 0.95, -0.2, 0, 0, 1); });
for (var j = 0; j < 6; j++) {
ctChair(g, -3 + j * 1.2, -1.1, 0, [0xA83A3A, 0x3A6AA8, 0x6AA83A][j % 3]);
}
},
function (g) {
var b = ctAdd(g, ctSph(1, 18), 0x3A4A5A, 0, 1.6, 0);
b.scale.set(1.6, 1.4, 7);
ctAdd(g, ctBox(0.15, 1.1, 6), 0x2A3A4A, 0, 2.9, 0);
ctAdd(g, ctBox(1.2, 0.9, 2), 0x4A5A6A, 0, 3.1, 1.2);
for (var i = 0; i < 4; i++)
ctAdd(g, ctCyl(0.2, 0.2, 0.05, 12), 0xBFE8FF, 0.86, 1.8, -2 + i * 1.3, 0, 0, Math.PI / 2, 0x3A8AA8);
ctAdd(g, ctCone(0.5, 1.8, 8), 0x5A5A5A, 0, 1.6, 7.6, Math.PI / 2);
},
function (g) {
ctAdd(g, ctBox(1.4, 0.4, 1.4), 0x2A3A3A, 0, 0.2, 0);
var b = ctAdd(g, ctSph(0.55, 10), 0x3A5A4A, 0, 1.2, 0);
b.scale.set(1, 1.3, 0.8);
for (var i = 0; i < 6; i++)
ctAdd(g, ctCyl(0.05, 0.02, 0.7, 5), 0x2A4A3A, (i - 2.5) * 0.12, 0.75, 0.38, 0.3);
ctAdd(g, ctBox(1.4, 0.5, 0.1), 0x2A4A3A, 0, 1.4, -0.3, 0, 0, 0.2);
ctAdd(g, ctBox(1.4, 0.5, 0.1), 0x2A4A3A, 0, 1.4, -0.3, 0, 0, -0.2);
},
function (g) {
ctTable(g, 3.4, 1, 0x3A2A1A, 0x2A2420);
var c = [0x6AE86A, 0xE86A6A, 0x6A8AE8, 0xE8D86A];
for (var i = 0; i < 6; i++) {
ctAdd(g, ctSph(0.1), c[i % 4], -1.3 + i * 0.5, 0.92, 0, 0, 0, 0, 1, 0.8);
ctAdd(g, ctCyl(0.03, 0.03, 0.18, 6), 0xE8F0F0, -1.3 + i * 0.5, 1.05, 0, 0, 0, 0, 0, 0.6);
}
ctAdd(g, ctBox(0.5, 0.35, 0.35), 0x5A3A1A, 1.2, 0.98, 0.1);
},
function (g) {
[-2.6, 2.6].forEach(function (x) { ctAdd(g, ctCyl(0.6, 0.7, 7, 10), 0x2AA85A, x, 3.5, 0, 0, 0, 0, 0x0A3A1A); ctAdd(g, ctCone(0.75, 1.6, 10), 0x1E8A4A, x, 7.8, 0); });
ctAdd(g, ctBox(5.6, 1, 0.8), 0x2AA85A, 0, 6.6, 0, 0, 0, 0, 0x0A3A1A);
ctAdd(g, ctBox(4.2, 5.8, 0.2), 0x1E6A3A, 0, 2.9, -0.2);
for (var i = 0; i < 5; i++)
ctAdd(g, ctSph(0.18, 8), 0x6AF8A0, -1.6 + i * 0.8, 6.6, 0.42, 0, 0, 0, 1);
},
function (g, o) {
var s = (o && o.s) || 1, t = new THREE.Group();
t.scale.setScalar(s);
g.add(t);
[[0, 0.3], [2.1, -0.3], [4.2, 0]].forEach(function (q) { ctAdd(t, ctCyl(0.03, 0.03, 1.4, 5), 0x5A3A1A, Math.cos(q[0]) * 0.35, 0.65, Math.sin(q[0]) * 0.35, q[1], 0, 0.25 * Math.sin(q[0])); });
ctAdd(t, ctCyl(0.1, 0.14, 1.6, 10), 0xC8A040, 0, 1.5, 0, -0.9);
ctAdd(t, ctCyl(0.15, 0.15, 0.05, 10), 0x1A1A2A, 0, 1.85, -0.5, -0.9);
},
function (g) {
ctAdd(g, ctBox(1.4, 0.1, 1), 0xC8A040, 0, 0.3, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { ctAdd(g, ctCyl(0.04, 0.04, 0.3, 6), 0xC8A040, q[0] * 0.65, 0.15, q[1] * 0.45); });
ctAdd(g, ctBox(0.5, 0.12, 0.4), 0x6A1A1A, 0, 0.65, 0);
ctAdd(g, ctCyl(0.03, 0.03, 0.4, 6), 0xC8A040, 0, 0.45, 0);
ctAdd(g, ctTor(0.55, 0.04), 0xE8E0C8, 0, 0.9, -0.4);
ctAdd(g, ctCyl(0.02, 0.02, 0.4, 6), 0xE8E0D0, 0.4, 0.6, 0.3, 0.4);
ctAdd(g, ctCyl(0.02, 0.02, 0.4, 6), 0xE8E0D0, -0.4, 0.6, 0.3, 0.4);
ctAdd(g, ctSph(0.12), 0xBFE8FF, 0, 1.0, -0.4, 0, 0, 0, 1, 0.8);
},
function (g) {
ctAdd(g, ctCyl(0.06, 0.1, 2, 8), 0xC8A040, 0, 1, 0);
ctAdd(g, ctBox(1.8, 0.06, 0.06), 0xC8A040, 0, 2, 0);
[-0.85, 0.85].forEach(function (x, i) { ctAdd(g, ctCyl(0.02, 0.02, 0.6, 4), 0xC8A040, x, 1.7, 0); ctAdd(g, ctCyl(0.3, 0.25, 0.06, 12), 0xC8A040, x, 1.4, 0); });
ctAdd(g, ctBox(0.05, 0.3, 0.02), 0xF8F8F8, 0.85, 1.6, 0, 0, 0, 0.2);
ctAdd(g, ctSph(0.12), 0xA82A2A, -0.85, 1.5, 0);
},
function (g) {
ctAdd(g, ctCyl(0.05, 0.05, 1.2, 6), 0x5A3A1A, -0.3, 0.6, -0.2, 0.3);
ctAdd(g, ctCyl(0.05, 0.05, 1.2, 6), 0x5A3A1A, 0.3, 0.6, -0.2, 0.3);
[[0.6, 0xF2F2EA], [0.48, 0x2A2A2A], [0.36, 0x3A6AD8], [0.24, 0xD82A2A], [0.12, 0xF2C83A]].forEach(function (q, i) { ctAdd(g, ctCyl(q[0], q[0], 0.06, 20), q[1], 0, 1.2, 0.02 + i * 0.012, Math.PI / 2); });
},
function (g, o) {
var t = o && o.t, wall = t === "straw" ? 0xF2D060 : t === "sticks" ? 0x9A6A3A : 0xD8502A, roof = t === "straw" ? 0xE8C040 : t === "sticks" ? 0x7A5030 : 0x8A2A1A;
ctAdd(g, ctBox(2, 1.6, 2), wall, 0, 0.8, 0);
ctAdd(g, ctCone(1.7, 1.2, 4), roof, 0, 2.2, 0, 0, Math.PI / 4);
ctAdd(g, ctBox(0.6, 1, 0.05), 0x5A3A1A, 0, 0.5, 1.02);
ctAdd(g, ctBox(0.4, 0.4, 0.05), 0xBFE8FF, 0.6, 1.1, 1.02);
if (t === "bricks")
for (var y = 0.2; y < 1.6; y += 0.3)
ctAdd(g, ctBox(2.02, 0.03, 2.02), 0xF8E0D0, 0, y, 0);
},
function (g) {
var b = new THREE.Group();
g.add(b);
ctAdd(b, ctBox(1.6, 0.9, 3), 0x3A5AA8, 0, 0.5, 0);
ctAdd(b, ctBox(1.4, 0.8, 2.6), 0x5A4A32, 0, 0.45, 2.8);
ctAdd(b, ctSph(0.75), 0xE8C0A0, 0, 0.75, -2.1);
ctAdd(b, ctBox(0.5, 0.5, 2.4), 0x3A5AA8, -1.1, 0.3, -0.3);
ctAdd(b, ctBox(0.5, 0.5, 2.4), 0x3A5AA8, 1.1, 0.3, -0.3);
for (var i = 0; i < 9; i++) {
ctAdd(b, ctBox(3.2, 0.04, 0.04), 0xE8D8A0, 0, 0.95, -2 + i * 0.7);
[-1, 1].forEach(function (s) { ctAdd(b, ctCyl(0.04, 0.04, 0.3, 4), 0x8A5A2A, s * 1.7, 0.15, -2 + i * 0.7); });
}
},
function (g) {
var c = [0xFF5A8A, 0x5AC8FF, 0xFFD040, 0x7AE060, 0xB06AFF];
for (var i = 0; i < 12; i++) {
var x = (i % 4) * 0.9 - 1.4, z = Math.floor(i / 4) * 0.9 - 0.9;
ctAdd(g, ctBox(0.4, 0.35, 0.4), c[i % 5], x, 0.18, z);
ctAdd(g, ctCone(0.32, 0.25, 4), 0xC83A2A, x, 0.48, z, 0, Math.PI / 4);
}
ctAdd(g, ctCyl(0.15, 0.2, 1, 8), 0xF8E8D0, 1.8, 0.5, 0);
ctAdd(g, ctCone(0.22, 0.4, 8), 0x2A60FF, 1.8, 1.2, 0);
},
function (g) {
for (var i = 0; i < 6; i++)
ctAdd(g, ctCyl(0.08, 0.08, 0.9, 5), 0x4A3020, Math.cos(i) * 0.15, 0.15, Math.sin(i) * 0.15, Math.PI / 2.6, i, 0);
for (var j = 0; j < 8; j++)
ctAdd(g, ctSph(0.13, 6), 0x6A6A62, Math.cos(j * 0.8) * 0.6, 0.08, Math.sin(j * 0.8) * 0.6);
ctAdd(g, ctCone(0.3, 0.7, 7), 0xFF8A2A, 0, 0.45, 0, 0, 0, 0, 1);
ctLight(g, 0xFFA050, 0, 0.8, 0, 2.6);
},
function (g) {
for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2, r = i ? 3 : 0, h = i ? 5 + (i % 3) * 1.5 : 9;
var s = ctAdd(g, ctCyl(0.5, 0.9, h, 6), 0xD8ECF8, Math.cos(a) * r, h / 2, Math.sin(a) * r * 0.6);
s.material = ctM(0xD8ECF8, 0x5A7A9A, 0.9);
ctAdd(g, ctCone(0.6, 1.6, 6), 0xE8F4FF, Math.cos(a) * r, h + 0.8, Math.sin(a) * r * 0.6);
}
ctLight(g, 0xBFE0FF, 0, 5, 0, 6);
},
function (g) {
ctAdd(g, ctSph(0.13, 8), 0xE8E0C8, 0, 0.12, -0.9);
ctAdd(g, ctBox(0.3, 0.08, 0.7), 0xE8E0C8, 0, 0.06, -0.3);
for (var i = 0; i < 4; i++)
ctAdd(g, ctBox(0.36, 0.03, 0.03), 0xE8E0C8, 0, 0.09, -0.5 + i * 0.12);
ctAdd(g, ctBox(0.05, 0.05, 1.3), 0xE8E0C8, 0.08, 0.05, -1.6);
ctAdd(g, ctBox(0.05, 0.05, 1.3), 0xE8E0C8, -0.08, 0.05, -1.6);
ctAdd(g, ctBox(0.06, 0.06, 0.9), 0xE8E0C8, 0.25, 0.05, 0.5);
ctAdd(g, ctBox(0.06, 0.06, 0.9), 0xE8E0C8, -0.25, 0.05, 0.5);
},
function (g) {
ctAdd(g, ctBox(8, 1.1, 3.2), 0x5A2A1A, 0, 0.55, 0);
ctAdd(g, ctBox(8, 0.08, 3.3), 0x8A5A2A, 0, 1.12, 0);
[-4.2, 4.2].forEach(function (x) { ctAdd(g, ctBox(0.8, 5, 0.4), 0x8A1A2A, x, 2.5, -1.2); ctAdd(g, ctBox(0.3, 5, 0.5), 0xC8A040, x * 1.07, 2.5, -1.2); });
ctAdd(g, ctBox(9.2, 0.9, 0.5), 0x8A1A2A, 0, 5.2, -1.2);
ctAdd(g, ctBox(7.8, 4.6, 0.1), 0x6A0E1A, 0, 2.9, -1.5);
},
function (g) {
var c = new THREE.Group();
c.position.y = 6.4;
g.add(c);
ctAdd(c, ctCyl(0.02, 0.02, 1, 4), 0xC8A040, 0, 0.5, 0);
ctAdd(c, ctTor(0.9, 0.05), 0xC8A040, 0, 0, 0, Math.PI / 2);
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2;
ctAdd(c, ctSph(0.07, 6), 0xFFF0C8, Math.cos(a) * 0.9, 0.1, Math.sin(a) * 0.9, 0, 0, 0, 1);
}
ctLight(c, 0xFFE8B0, 0, 0, 0, 3.4);
},
function (g) {
ctTable(g, 1.8, 1, 0x5A3A22, 0x6A4A2A);
ctAdd(g, ctCyl(0.22, 0.24, 0.18, 12), 0x3A3228, -0.4, 0.9, 0);
ctAdd(g, ctCyl(0.32, 0.32, 0.02, 14), 0x3A3228, -0.4, 0.81, 0);
ctAdd(g, ctTor(0.08, 0.012), 0xC8A040, 0.3, 0.84, 0.1, Math.PI / 2);
ctAdd(g, ctCyl(0.012, 0.012, 0.18, 4), 0x5A3A1A, 0.42, 0.82, 0.1, 0, 0, Math.PI / 2);
ctAdd(g, ctSph(0.07, 8), 0x2A6AF8, 0.4, 0.85, -0.25, 0, 0, 0, 1);
},
function (g) { [-1.2, 1.2].forEach(function (x, i) { var c = new THREE.Group(); c.position.set(x, 0, 0); c.rotation.y = i ? -0.4 : 0.4; g.add(c); ctAdd(c, ctBox(0.9, 0.45, 0.9), 0x6A1A1A, 0, 0.25, 0); ctAdd(c, ctBox(0.9, 0.8, 0.2), 0x6A1A1A, 0, 0.8, -0.4); ctAdd(c, ctBox(0.18, 0.5, 0.9), 0x5A1414, -0.45, 0.55, 0); ctAdd(c, ctBox(0.18, 0.5, 0.9), 0x5A1414, 0.45, 0.55, 0); }); },
function (g) {
[-0.9, 0.9].forEach(function (x) { ctAdd(g, ctBox(0.1, 2.8, 0.1), 0x3A2A1A, x, 1.4, 0); });
if (typeof wSign === "function") {
var s = wSign(["The Reform Club Wager", "£20,000", "Round the world in 80 days"], 1.9, 1.2, "#1A2A3A", "#F8E8C8");
s.position.set(0, 2, 0.06);
g.add(s);
}
ctAdd(g, ctCyl(0.3, 0.3, 0.06, 16), 0xF8F4EA, 0, 3.0, 0.06, Math.PI / 2);
ctAdd(g, ctBox(0.02, 0.22, 0.02), 0x1A1A1A, 0, 3.05, 0.1);
},
function (g, o) {
var s = (o && o.s) || 1, d = new THREE.Group();
d.scale.setScalar(s * 1.6);
g.add(d);
var col = 0x6A7A4A;
var b = ctAdd(d, ctSph(0.9, 12), col, 0, 1.6, 0);
b.scale.set(0.8, 0.9, 1.5);
ctAdd(d, ctCone(0.5, 2.6, 8), col, 0, 1.4, -2.1, -Math.PI / 2 + 0.25);
ctAdd(d, ctCyl(0.3, 0.4, 1.2, 8), col, 0, 2.5, 1.1, 0.6);
var h = ctAdd(d, ctSph(0.35, 10), col, 0, 3.0, 1.6);
h.scale.set(0.8, 0.8, 1.4);
[-0.45, 0.45].forEach(function (x) { ctAdd(d, ctCyl(0.22, 0.16, 1.3, 8), 0x5A6A3A, x, 0.65, -0.2); ctAdd(d, ctCyl(0.08, 0.06, 0.7, 6), 0x5A6A3A, x * 0.9, 1.6, 1.1, 0.8); ctAdd(d, ctCone(0.05, 0.18, 5), 0xE8E0C8, x * 0.9, 1.4, 1.45, 1.2); });
},
function (g) {
var s = ctAdd(g, ctSph(1.6, 20), 0x2A2A30, 0, 1.6, 0);
s.material = new THREE.MeshPhongMaterial({ color: 0x3A3A44, shininess: 60, specular: 0x888888 });
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2;
ctAdd(g, ctBox(0.7, 0.7, 0.06), 0x8A8A92, Math.cos(a) * 1.62, 1.6, Math.sin(a) * 1.62, 0, -a + Math.PI / 2, 0);
}
ctAdd(g, ctCyl(0.4, 0.4, 0.06, 12), 0xBFE8FF, 0, 3.18, 0, 0, 0, 0, 0x3A6A8A);
},
function (g, o) {
var f = (o && o.fur) || 0x2A2420, fc = 0x5A4A40, s = (o && o.big) ? 1.25 : 1, a = new THREE.Group();
a.scale.setScalar(s);
g.add(a);
var b = ctAdd(a, ctSph(0.55, 12), f, 0, 1.05, 0);
b.scale.set(1, 1.15, 0.85);
ctAdd(a, ctSph(0.42, 10), f, 0, 0.6, 0.02);
var hd = ctAdd(a, ctSph(0.3, 12), f, 0, 1.78, 0.12);
ctAdd(a, ctSph(0.2, 10), fc, 0, 1.72, 0.34).scale.set(1.1, 0.8, 0.7);
ctAdd(a, ctBox(0.4, 0.07, 0.12), f, 0, 1.9, 0.3);
[-0.1, 0.1].forEach(function (x) { ctAdd(a, ctSph(0.035, 6), 0x1A1210, x, 1.8, 0.4); });
[-1, 1].forEach(function (sd) {
var ar = ctAdd(a, ctCyl(0.12, 0.1, 1.1, 7), f, sd * 0.55, 0.9, 0.1, 0.15, 0, sd * 0.18);
ctAdd(a, ctSph(0.13, 7), fc, sd * 0.65, 0.36, 0.18);
ctAdd(a, ctCyl(0.14, 0.12, 0.6, 7), f, sd * 0.22, 0.3, 0);
ctAdd(a, ctBox(0.18, 0.08, 0.3), fc, sd * 0.22, 0.04, 0.08);
});
},
function (g) {
var h = build({ id: "ct_hm_horse", archetype: "horse", label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, look: { skin: 0x141414 } });
g.add(h);
var r = wPerson("ct_hm_rider", { sex: "m", look: { layer: "longcoat", layerColor: 0x101012, top: 0x101012, bottom: 0x101012, back: "cloak", backColor: 0x0E0E10, shoeKind: "boots", hair: 0x101012, hairStyle: "bald", skin: 0x101012 } });
r.position.set(0, 0.9, 0);
r.traverse(function (m) { var p = m.userData && m.userData.part; if (p && /^(head|hair|haircap|hairlong|eye|bun|brim|hatcap|brimcap|crown|hood)/.test(p))
m.visible = false; });
r.userData.ctNeck = 1;
g.add(r);
ctAdd(g, ctBox(0.42, 0.05, 0.42), 0x101012, 0, 2.55, 0);
var p = ctAdd(g, ctSph(0.2, 10), 0xE8701A, 0.35, 2.0, 0.45);
p.scale.y = 0.8;
ctAdd(g, ctSph(0.07, 6), 0xFFB040, 0.35, 2.02, 0.63, 0, 0, 0, 1);
},
function (g) {
var e = ctAdd(g, ctSph(0.6, 16), 0xFFF0D0, 0, 2.15, 0);
e.scale.y = 1.3;
ctAdd(g, ctBox(1.0, 0.12, 0.9), 0xFF2A8A, 0, 2.0, 0);
ctAdd(g, ctSph(0.08, 8), 0x1A1A1A, -0.2, 2.45, 0.52);
ctAdd(g, ctSph(0.08, 8), 0x1A1A1A, 0.2, 2.45, 0.52);
ctAdd(g, ctTor(0.14, 0.03), 0xD82A2A, 0, 2.22, 0.55, 0, 0, 0);
ctAdd(g, ctCyl(0.06, 0.06, 0.6, 6), 0x2A60FF, -0.25, 1.6, 0.25);
ctAdd(g, ctCyl(0.06, 0.06, 0.6, 6), 0x2A60FF, 0.25, 1.6, 0.25);
},
function (h) {
var L = { underworld: "the Underworld", heavens: "the Heavens", depths: "the Depths", faerie: "Faerie", void: "the Void", mirror: "the Mirror World", dead: "the Land of the Dead", frozen: "the Frozen Realm",
elsewhere: "Another World", fire: "the Burning Lands", stars: "Among the Stars", wasteland: "the Wasteland", desert: "the Endless Desert", station: "the Orbital", future: "the City to Come", templerow: "Temple Row" };
var W = { greenwold: "Greenwold", kidszone: "the Kids Zone (Wonderglen, through the Rainbow Toadstool in Faerie)", underdark: "the Underdark", northpole: "the North Pole", battle: "Ironfray (18+)", party: "Jubilee",
lounge: "GiGi's Lounge", family: "the Family houses", "surface:moon": "the Moon", "surface:mars": "Mars", race: "Pyreline" };
if (h.indexOf("land:") === 0)
return (L[h.slice(5)] || h.slice(5)) + " (a dream land)";
return W[h.slice(6)] || h.slice(6);
},
function (id, msg) {
var T = CT_BY_ID[id];
if (!T)
return;
var D = ctData(), done = D.done[id], fns = {};
var h = ctTitle("📖 " + ctE(T.t)) + "<div style='opacity:.8;font-size:12px'>" + ctE(T.by) + "</div>";
if (msg)
h += "<div style='margin:8px 0;color:#CFE8C0'>" + msg + "</div>";
if (ctOff(id))
h += "<div style='margin:8px 0;color:#E8C8A0'>The Keeper has closed this story for now.</div>";
else {
var pay = done === ctToday() ? "Played today: you can play again, but it pays once a day." : "Pays " + ctGold(T) + " gold from the Treasury once a day (dues-payers) and gives " + T.keep[1] + " " + ctE(T.keep[0]) + ".";
if (typeof CT_W !== "undefined" && CT_W[id]) {
var nc = CT_W[id].ch.length, pr = typeof ctsProg === "function" ? Math.min(ctsProg(id), nc) : 0;
h += worldBtn("enter", "🚪 Step into the story's world", nc + " chapters across a great land of its own, the whole book from beginning to end, then a short lesson. " + (pr > 0 && pr < nc ? "You're at Chapter " + (pr + 1) + ". " : "") + pay);
fns.enter = function () { ctsEnter(id); };
}
h += worldBtn("play", "▶ The short version, here", (T.steps.length + 1) + " parts by this board, then the lesson." + (CT_W && CT_W[id] ? "" : " " + pay));
fns.play = function () { ctStart(id); };
}
h += ctHead("Who is here") + "<div style='font-size:12.5px;opacity:.9'>" + T.who.map(function (W) { return "<b>" + ctE(W.n) + "</b>"; }).join(", ") + ". Walk up to anyone and press E to talk with them.</div>";
var cs = ctCostumesOf(id);
if (cs.length) {
h += worldBtn("cos", "👗 Costumes from this story", cs.length + " to try on and buy");
fns.cos = function () { ctCostumeCard(id); };
}
h += worldBtn("all", "📚 All the stories", CT_TALES.length + " stories: where each one is");
fns.all = function () { ctAllCard(); };
worldCard(h, fns);
},
function () {
var D = ctData(), by = {}, h = ctTitle("📚 The classic stories") + "<div style='opacity:.8;font-size:12px;margin-bottom:6px'>From books, myths and old tales. Each has a 📖 board near the way into its world.</div>";
CT_TALES.forEach(function (T) { (by[T.host] = by[T.host] || []).push(T); });
Object.keys(by).forEach(function (k) {
h += ctHead(ctE(ctWorldName(k)));
h += by[k].map(function (T) { return "<div style='font-size:12.5px;margin:2px 0'>" + (D.done[T.id] ? "✅ " : "📖 ") + ctE(T.t) + " <span style='opacity:.6'>· " + ctE(T.by) + "</span></div>"; }).join("");
});
worldCard(h, {});
},
function (id) {
var T = CT_BY_ID[id];
if (!T)
return;
if (CT.run)
ctStop(null);
var c = ctCentre(id);
if (!c) {
ctSay("This story's place isn't laid out here just now.");
return;
}
CT.run = { T: T, i: 0, t0: Date.now(), R: ctRand(Date.now() >>> 0), st: null, c: c };
if (ctSigned())
ctRpc("tale_start", { p_key: id }).catch(function () { });
ctTone(523, 0.12);
ctStep();
},
function () {
var R = CT.run;
if (!R)
return;
ctClearProps();
var steps = R.steps || R.T.steps, S = steps[R.i];
if (!S) {
(R.end || ctLesson)();
return;
}
var n = R.i + 1, of = steps.length + (R.end ? 0 : 1), top = ctTitle("📖 " + (R.ch != null && typeof CTS !== "undefined" && CTS.W ? "Chapter " + (R.ch + 1) + ": " + ctE(CTS.W.ch[R.ch][0]) : ctE(R.T.t))) + "<div style='opacity:.6;font-size:11px;margin-bottom:6px'>Part " + n + " of " + of + "</div>";
var next = function () { R.i++; ctStep(); };
if (S.k === "say") {
worldCard(top + "<div>" + ctWho(S.w) + ctE(S.t) + "</div>" + worldBtn("next", "Go on ▸", null), { next: next });
return;
}
if (S.k === "choose") {
ctChoose(top, S, next);
return;
}
if (S.k === "code") {
ctCode(top, S, next);
return;
}
if (S.k === "aim") {
ctAim(top, S, next);
return;
}
var lab = { find: "Start looking", run: "Ready, go!", walk: "Begin the walk" }[S.k] || "Start";
worldCard(top + "<div>" + ctWho(S.w) + ctE(S.t) + "</div>" + worldBtn("go", "▶ " + lab, S.secs ? ("You have " + Math.round(S.secs / 60 * 10) / 10 + " minutes.") : null) + worldBtn("stop", "Stop the story", null), { go: function () { worldCard(null); ctBegin(S); }, stop: function () { worldCard(null); ctStop("The story waits on its board for another time."); } });
},
function (top, S, next, said) {
var R = CT.run, opts = R.st && R.st.opts || ctShuffle(S.o, R.R);
R.st = { opts: opts };
var h = top + "<div style='margin-bottom:6px'>" + ctWho(S.w) + ctE(S.t) + "</div>", fns = {};
if (said)
h += "<div style='margin:6px 0;padding:6px 8px;border-left:3px solid " + (said.ok ? "#8FD88F" : "#E8B070") + ";background:rgba(255,255,255,.04)'>" + ctE(said.t) + "</div>";
if (said && said.ok) {
h += worldBtn("next", "Go on ▸", null);
fns.next = function () { R.st = null; ctTone(659, 0.12); next(); };
}
else
opts.forEach(function (o, i) { h += worldBtn("o" + i, ctE(o[0]), null); fns["o" + i] = function () { ctTone(o[1] ? 587 : 262, 0.12); ctChoose(top, S, next, { ok: !!o[1], t: o[2] }); }; });
worldCard(h, fns);
},
function (top, S, next, wrong) {
var h = top + "<div style='margin-bottom:6px'>" + ctWho(S.w) + ctE(S.t) + "</div>" +
"<input id='ct-code' type='text' autocomplete='off' style='width:100%;box-sizing:border-box;padding:8px;font:15px var(--sans,system-ui);background:#0E1220;color:#F0F2F8;border:1px solid #8FB4E8;border-radius:4px'>";
if (wrong)
h += "<div style='margin:6px 0;color:#E8C8A0'>Not quite. " + ctE(S.hint || "") + "</div>";
h += worldBtn("chk", "Check ✓", null);
var check = function () {
var el = document.getElementById("ct-code"), v = String(el && el.value || "").toLowerCase().replace(/[^a-z]/g, "");
var ok = S.a.some(function (a) { return a.toLowerCase().replace(/[^a-z]/g, "") === v; });
if (ok) {
ctTone(659, 0.15);
worldCard(top + "<div style='color:#CFE8C0'>✓ " + ctE(S.done || "Right!") + "</div>" + worldBtn("next", "Go on ▸", null), { next: next });
}
else {
ctTone(262, 0.12);
ctCode(top, S, next, true);
}
};
worldCard(h, { chk: check });
setTimeout(function () { var el = document.getElementById("ct-code"); if (el) {
el.focus();
el.onkeydown = function (e) { e.stopPropagation(); if (e.key === "Enter")
check(); };
} }, 50);
},
function (top, S, next) {
var R = CT.run, st = { shot: 0, hits: 0, t: 0, iv: null, speed: 1.6, ph: R.R() * 6, said: "" };
function draw() {
var h = top + "<div style='margin-bottom:6px'>" + ctWho(S.w) + ctE(S.t) + "</div>" +
"<div style='font-size:12px;opacity:.8'>Shot " + Math.min(st.shot + 1, S.rounds) + " of " + S.rounds + " · gold so far: " + st.hits + " (need " + S.need + ")</div>" +
"<div style='position:relative;height:34px;margin:10px 0;border-radius:17px;background:linear-gradient(90deg,#2A2A2A 0%,#3A6AD8 22%,#D82A2A 38%,#F2C83A 44%,#F2C83A 56%,#D82A2A 62%,#3A6AD8 78%,#2A2A2A 100%)'>" +
"<div id='ct-mark' style='position:absolute;top:-4px;width:6px;height:42px;margin-left:-3px;background:#FFFFFF;border-radius:3px;box-shadow:0 0 0 2px #1A1A1A;left:50%'></div></div>" +
(st.said ? "<div style='margin:4px 0;color:#CFE8C0'>" + st.said + "</div>" : "") + worldBtn("shoot", "🏹 Loose! (Space)", null);
worldCard(h, { shoot: shoot });
}
function pos() { return 50 + 46 * Math.sin(st.t * st.speed + st.ph) + 6 * Math.sin(st.t * 0.7); }
function shoot() {
var p = pos(), d = Math.abs(p - 50), res = d < 6 ? "gold" : d < 12 ? "red" : d < 28 ? "the outer rings" : "a miss";
st.shot++;
if (d < 6)
st.hits++;
st.speed += 0.35;
ctTone(d < 6 ? 784 : d < 12 ? 523 : 294, 0.14);
st.said = d < 6 ? "🎯 Gold! A perfect shot." : "Your arrow strikes " + res + ".";
if (st.hits >= S.need) {
ctAimEnd(st);
worldCard(top + "<div style='color:#CFE8C0'>🏹 " + st.hits + " in the gold! " + ctE(S.done || "") + "</div>" + worldBtn("next", "Go on ▸", null), { next: next });
return;
}
if (st.shot >= S.rounds) {
ctAimEnd(st);
worldCard(top + "<div>" + st.said + " Only " + st.hits + " in the gold this time.</div>" + worldBtn("again", "Try again", null) + worldBtn("stop", "Stop the story", null), { again: function () { ctAim(top, S, next); }, stop: function () { worldCard(null); ctStop("The story waits on its board for another time."); } });
return;
}
draw();
}
CT.aimKey = function (e) { if (e.code === "Space") {
e.preventDefault();
e.stopPropagation();
shoot();
} };
addEventListener("keydown", CT.aimKey, true);
draw();
var last = performance.now();
st.iv = setInterval(function () {
var now = performance.now();
st.t += (now - last) / 1000;
last = now;
var m = document.getElementById("ct-mark");
if (!m || !CT.run) {
ctAimEnd(st);
return;
}
m.style.left = Math.max(0, Math.min(100, pos())) + "%";
}, 33);
CT.aimSt = st;
},
function (x, z, rad) {
if (!CT.host)
return false;
if (CT.host.indexOf("land:") === 0) {
try {
var r = ldRealm();
if (!r)
return false;
if (!CT.taken || CT.takenAt !== LD.sig) {
CT.taken = ldTaken(r);
CT.takenAt = LD.sig;
}
return typeof dqFree === "function" ? dqFree(x, z, rad, CT.taken, false, true) : true;
}
catch (e) {
return true;
}
}
var W = WLD.w;
return !!W && ctWorldFree(W, x, z, rad, CT.feet0 || 0, []);
},
function (look, col) {
var g = new THREE.Group(), inner = new THREE.Group();
g.add(inner);
var c = col || 0xFFE070;
if (look === "grin") {
var m = ctAdd(inner, new THREE.TorusGeometry(0.35, 0.06, 6, 16, Math.PI), c, 0, 0, 0, 0, 0, Math.PI, 1);
for (var i = 0; i < 6; i++)
ctAdd(inner, ctBox(0.05, 0.08, 0.03), 0xFFFFFF, -0.25 + i * 0.1, -0.05, 0.02, 0, 0, 0, 1);
}
else if (look === "star") {
for (var k = 0; k < 5; k++)
ctAdd(inner, ctCone(0.08, 0.4, 4), c, Math.sin(k * 1.256) * 0.15, Math.cos(k * 1.256) * 0.15, 0, 0, 0, -k * 1.256, 1);
ctAdd(inner, ctSph(0.12, 8), c, 0, 0, 0, 0, 0, 0, 1);
}
else if (look === "page") {
ctAdd(inner, ctBox(0.4, 0.52, 0.02), 0xF8F2E0, 0, 0, 0, 0, 0, 0.15, 0x5A5040);
}
else if (look === "tablet" || look === "brick") {
ctAdd(inner, ctBox(0.45, 0.3, 0.12), c, 0, 0, 0, 0, 0.3, 0, 1);
}
else if (look === "print") {
ctAdd(inner, ctBox(0.18, 0.02, 0.36), c, 0, -0.6, 0, 0, 0, 0, 1);
ctAdd(inner, ctBox(0.18, 0.02, 0.36), c, 0.3, -0.6, 0.5, 0, 0, 0, 1);
}
else if (look === "flame") {
ctAdd(inner, ctCone(0.3, 0.9, 7), c, 0, 0, 0, 0, 0, 0, 1);
ctAdd(inner, ctCone(0.15, 0.5, 7), 0xFFE070, 0, -0.05, 0, 0, 0, 0, 1);
}
else if (look === "sheep") {
var b = ctAdd(inner, ctSph(0.4, 10), 0xFFFFFF, 0, 0, 0);
b.scale.z = 1.3;
ctAdd(inner, ctSph(0.18, 8), 0x2A2A2A, 0, 0.1, 0.5);
[-1, 1].forEach(function (s) { [-1, 1].forEach(function (t) { ctAdd(inner, ctCyl(0.05, 0.05, 0.4, 5), 0x2A2A2A, s * 0.2, -0.4, t * 0.25); }); });
}
else if (look === "lantern") {
ctAdd(inner, ctCyl(0.2, 0.2, 0.4, 8), c, 0, 0, 0, 0, 0, 0, 1);
ctAdd(inner, ctCone(0.26, 0.2, 8), 0x3A2A1A, 0, 0.3, 0);
}
else if (look === "shard") {
ctAdd(inner, new THREE.OctahedronGeometry(0.25, 0), c, 0, 0, 0, 0, 0, 0, 1).scale.y = 2;
}
else if (look === "lever") {
ctAdd(inner, ctCyl(0.04, 0.04, 0.7, 6), c, 0, 0, 0, 0, 0, 0.4, 1);
ctAdd(inner, ctSph(0.09, 8), 0xF8F0E0, 0.13, 0.32, 0);
}
else if (look === "rose" || look === "weed") {
for (var q = 0; q < 5; q++)
ctAdd(inner, ctSph(0.12, 7), c, Math.cos(q * 1.3) * 0.15, Math.sin(q * 0.9) * 0.1, Math.sin(q * 1.3) * 0.15, 0, 0, 0, 1);
ctAdd(inner, ctCyl(0.02, 0.02, 0.6, 4), 0x2A6A2A, 0, -0.35, 0);
}
else if (look === "chalk") {
ctAdd(inner, ctBox(1, 1.8, 0.12), 0x7A5030, 0, 0.3, 0);
ctAdd(inner, ctBox(0.5, 0.08, 0.13), c, 0, 0.5, 0.01, 0, 0, 0.785, 1);
ctAdd(inner, ctBox(0.5, 0.08, 0.13), c, 0, 0.5, 0.01, 0, 0, -0.785, 1);
}
else if (look === "knot") {
ctAdd(inner, new THREE.TorusKnotGeometry(0.2, 0.06, 40, 6), c, 0, 0, 0, 0, 0, 0, 1);
}
else if (look === "drop") {
ctAdd(inner, ctSph(0.2, 10), c, 0, 0, 0, 0, 0, 0, 1);
ctAdd(inner, ctCone(0.2, 0.35, 10), c, 0, 0.25, 0, 0, 0, 0, 1);
}
else if (look === "pebble") {
var p = ctAdd(inner, ctSph(0.18, 8), c, 0, -0.5, 0, 0, 0, 0, 1);
p.scale.y = 0.6;
}
else
ctAdd(inner, ctSph(0.25, 12), c, 0, 0, 0, 0, 0, 0, 1);
if (typeof wGlow === "function") {
var gl = wGlow(c, 1.8, 0.35);
g.add(gl);
}
g.userData.ctInner = inner;
return g;
},
function (S) {
var R = CT.run, c = R.c, rr = ctRand((Date.now() & 0xffffff) + R.i);
R.st = { k: S.k, t: 0, got: 0, pts: [], secs: S.secs || 0, cool: 0 };
if (S.k === "find") {
var avoid = [[c.x, c.z]];
for (var i = 0; i < S.n; i++) {
var p = ctSpotNear(c.x, c.z, 6, S.r || 28, rr, avoid);
if (!p)
continue;
avoid.push(p);
var m = ctPutMarker(ctMarker(S.look, S.col), p[0], p[1], S.look === "chalk" ? 0.6 : 1.1);
R.st.pts.push({ x: p[0], z: p[1], m: m, got: false });
}
if (!R.st.pts.length) {
ctStepFail("There's no room to lay this part out here just now.");
return;
}
R.st.need = R.st.pts.length;
}
else if (S.k === "run") {
var L = ctMe(), a0 = Math.atan2(L.x - c.x, L.z - c.z), last = null;
for (var j = 0; j < S.n; j++) {
var p2 = null;
for (var k = 0; k < 14 && !p2; k++) {
var a = a0 + (j + 1) / S.n * Math.PI * 2 + (rr() - 0.5) * 0.5, r = (S.r || 28) * (0.6 + rr() * 0.45), x = c.x + Math.sin(a) * r, z = c.z + Math.cos(a) * r;
if (ctFreeHere(x, z, 1.2))
p2 = [x, z];
}
if (!p2)
continue;
var ring = new THREE.Group();
ctAdd(ring, ctTor(1.6, 0.12), 0x8AD0FF, 0, 0, 0, 0, 0, 0, 1);
ring.userData.ctRing = 1;
ctPutMarker(ring, p2[0], p2[1], 1.7);
ring.lookAt(ring.position.x + (last ? p2[0] - last[0] : 1), ring.position.y, ring.position.z + (last ? p2[1] - last[1] : 0));
R.st.pts.push({ x: p2[0], z: p2[1], m: ring, got: false });
last = p2;
}
if (R.st.pts.length < 2) {
ctStepFail("There's no room to lay out the course here just now.");
return;
}
R.st.need = R.st.pts.length;
ctRingLight();
if (S.chase) {
var g = new THREE.Group();
if (CT_BODIES[S.chase.make])
CT_BODIES[S.chase.make](g);
else
g.add(build({ id: "ct_chase", archetype: S.chase.being || "horse", attrs: {}, solid: false, detail: 3, nights: [], city: true }));
ctPutMarker(g, c.x, c.z, 0);
R.chaser = { g: g, wait: S.chase.wait || 5, sp: S.chase.speed || 4.5 };
}
}
else if (S.k === "walk") {
var M = ctMe(), dir = Math.atan2(-Math.sin(yaw), -Math.cos(yaw)), tgt = null;
for (var q = 0; q < 24 && !tgt; q++) {
var aa = dir + (q % 2 ? 1 : -1) * Math.ceil(q / 2) * 0.26, ok = true, x2 = M.x + Math.sin(aa) * S.d, z2 = M.z + Math.cos(aa) * S.d;
for (var s = 0.25; s < 1; s += 0.25) {
if (!ctFreeHere(M.x + Math.sin(aa) * S.d * s, M.z + Math.cos(aa) * S.d * s, 0.6)) {
ok = false;
break;
}
}
if (ok && ctFreeHere(x2, z2, 1))
tgt = [x2, z2];
}
if (!tgt) {
ctStepFail("Find a clear, open stretch ahead of you, face along it, and try again.");
return;
}
var pil = new THREE.Group();
ctAdd(pil, ctCyl(0.8, 0.8, 6, 14), 0xFFF2C8, 0, 3, 0, 0, 0, 0, 1, 0.35);
if (typeof wGlow === "function") {
var gw = wGlow(0xFFF2C8, 5, 0.5);
gw.position.y = 2;
pil.add(gw);
}
ctPutMarker(pil, tgt[0], tgt[1], 0);
R.st.pts = [{ x: tgt[0], z: tgt[1], m: pil }];
R.st.back = 0;
R.st.secs = S.secs || 180;
}
ctTone(440, 0.1);
},
function (why) {
var R = CT.run;
if (!R)
return;
ctClearProps();
R.st = null;
ctTone(220, 0.25);
var top = ctTitle("📖 " + ctE(R.T.t));
worldCard(top + "<div>" + why + "</div>" + worldBtn("again", "Try that part again", null) + worldBtn("stop", "Stop the story", null), { again: function () { ctStep(); }, stop: function () { worldCard(null); ctStop("The story waits on its board for another time."); } });
},
function (S) {
var R = CT.run;
ctClearProps();
if (R)
R.st = null;
ctTone(659, 0.14);
setTimeout(function () { ctTone(784, 0.16); }, 140);
var top = ctTitle("📖 " + ctE(R.T.t));
worldCard(top + "<div style='color:#CFE8C0'>✓ " + ctWho(S.w) + ctE(S.done || "Well done!") + "</div>" + worldBtn("next", "Go on ▸", null), { next: function () { R.i++; ctStep(); } });
},
function (dt) {
var R = CT.run, st = R && R.st;
if (!st || !st.k)
return;
var S = (R.steps || R.T.steps)[R.i], G = ctHostGroup();
if (!G || (st.pts[0] && st.pts[0].m && !st.pts[0].m.parent)) {
ctStop("The place changed around you, so the story stopped. Its board has it waiting.");
return;
}
st.t += dt;
st.pts.forEach(function (p, i) { var inn = p.m.userData.ctInner; if (inn && !p.got) {
inn.rotation.y += dt * 0.8;
inn.position.y = Math.sin(st.t * 1.2 + i) * 0.08;
} });
var L = ctMe(), left = st.secs ? Math.max(0, st.secs - st.t) : 0;
if (st.k === "find") {
st.pts.forEach(function (p) { if (!p.got && Math.hypot(L.x - p.x, L.z - p.z) < 2.4) {
p.got = true;
st.got++;
p.m.visible = false;
ctTone(523 + st.got * 60, 0.12);
} });
ctHud("🔎 <b>" + ctE(S.name || "Found") + "</b>: " + st.got + " of " + st.need + (st.secs ? " · " + ctClock(left) : ""));
if (st.got >= st.need)
return ctStepDone(S);
}
else if (st.k === "run") {
var nx = null;
for (var i = 0; i < st.pts.length; i++)
if (!st.pts[i].got) {
nx = st.pts[i];
break;
}
if (nx && Math.hypot(L.x - nx.x, L.z - nx.z) < 2.8 && Math.abs(L.y - (nx.m.position.y - 1.7)) < 4) {
nx.got = true;
st.got++;
ctTone(587 + st.got * 40, 0.1);
ctRingLight();
}
var C = R.chaser;
if (C) {
C.wait -= dt;
if (C.wait <= 0) {
var g = C.g, dx = L.x - g.position.x, dz = L.z - g.position.z, d = Math.hypot(dx, dz);
if (d < 1.8)
return ctStepFail("He caught you! Try again, and run for every ring as fast as you can.");
var stp = Math.min(d, C.sp * dt);
g.position.x += dx / d * stp;
g.position.z += dz / d * stp;
var gy = ctGround(g.position.x, g.position.z);
if (gy != null)
g.position.y = gy;
g.rotation.y = Math.atan2(dx, dz);
}
}
ctHud("🏁 Ring " + Math.min(st.got + 1, st.need) + " of " + st.need + (st.secs ? " · " + ctClock(left) : "") + (C ? (C.wait > 0 ? " · he comes in " + Math.ceil(C.wait) + "…" : " · he's coming!") : ""));
if (st.got >= st.need)
return ctStepDone(S);
}
else if (st.k === "walk") {
var p = st.pts[0], dx2 = p.x - L.x, dz2 = p.z - L.z, rel = Math.atan2(-dx2, -dz2) - yaw;
rel = Math.atan2(Math.sin(rel), Math.cos(rel));
if (Math.abs(rel) > 1.95) {
st.back += dt;
if (st.back > 0.3)
return ctStepFail("You looked back! " + (R.T.id === "orpheus" ? "Eurydice fades back into the shadows... but this is a dream, so you may try again." : "Try again."));
}
else
st.back = 0;
ctHud("🚶 Walk to the light, " + Math.round(Math.hypot(dx2, dz2)) + " m. Don't look back." + (st.secs ? " · " + ctClock(left) : ""));
if (Math.hypot(dx2, dz2) < 3)
return ctStepDone(S);
}
if (st.secs && left <= 0)
return ctStepFail("Time's up! You can try that part again.");
},
function () {
var R = CT.run, T = R.T, pool = ctShuffle(T.qs, R.R), got = 0, idx = 0, need = Math.min(3, T.qs.length);
var top = ctTitle("📖 " + ctE(T.t)) + "<div style='opacity:.6;font-size:11px;margin-bottom:6px'>Last part: the lesson</div>";
function ask(said) {
var q = pool[idx % pool.length], opts = ctShuffle([q[1], q[2], q[3]], R.R), h = top + "<div style='font-size:12px;opacity:.8'>" + got + " of " + need + " right</div>", fns = {};
if (said)
h += "<div style='margin:6px 0;padding:6px 8px;border-left:3px solid " + (said.ok ? "#8FD88F" : "#E8B070") + "'>" + said.t + "</div>";
h += "<div style='margin:6px 0'><b>" + ctE(q[0]) + "</b></div>";
opts.forEach(function (o, i) {
h += worldBtn("a" + i, ctE(o), null);
fns["a" + i] = function () {
idx++;
if (o === q[1]) {
got++;
ctTone(659, 0.1);
if (got >= need)
return ctFinish();
ask({ ok: true, t: "✓ Right: " + ctE(q[1]) + "." });
}
else {
ctTone(262, 0.1);
ask({ ok: false, t: "Not quite: the answer is <b>" + ctE(q[1]) + "</b>. Here's another." });
}
};
});
worldCard(h, fns);
}
ask(null);
},
function () {
var R = CT.run, T = R.T, D = ctData(), first = !D.done[T.id];
D.done[T.id] = ctToday();
try {
if (typeof save === "function")
save();
}
catch (e) { }
ctTone(784, 0.2);
setTimeout(function () { ctTone(988, 0.25); }, 180);
CT.run = null;
var show = function (line) { if (typeof CTS !== "undefined" && CTS.on) {
ctsFinished(line, first);
return;
} ctBoard(T.id, "🎉 <b>Story complete!</b> " + line + (first ? " A first for you: see 📚 All the stories for the next one." : "")); };
if (!ctSigned()) {
show("Sign in, and stories pay gold once a day and give their keepsake (" + T.keep[1] + " " + ctE(T.keep[0]) + ").");
return;
}
ctRpc("tale_done", { p_key: T.id }).then(function (o) { show(ctE((o && o.say) || "Well done.")); if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { } })
.catch(function (e) { show(ctMissing(e) ? "Gold and keepsakes from the stories open soon. Your progress is kept on this device." : ctE((e && e.message) || String(e))); });
},
function (th) {
var L = th.leaf || 0x4A7A30, F = th.flowerCol;
function q(geo, col, x, y, z, sx, sy, sz, ry) { var m = new THREE.Matrix4(); m.compose(new THREE.Vector3(x || 0, y || 0, z || 0), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry || 0, 0)), new THREE.Vector3(sx || 1, sy || sx || 1, sz || sx || 1)); return { geo: geo, col: col, m: m }; }
function tilt(geo, col, x, y, z, rx, rz, s) { var m = new THREE.Matrix4(); m.compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, 0, rz || 0)), new THREE.Vector3(s || 1, s || 1, s || 1)); return { geo: geo, col: col, m: m }; }
return {
oak: { r: 0.6, s: [0.8, 1.5], p: [q(ctCyl(0.32, 0.48, 4, 6), 0x5A3E28, 0, 2, 0), q(new THREE.IcosahedronGeometry(2.7, 0), L, 0, 5.4, 0), q(new THREE.IcosahedronGeometry(1.9, 0), L, 1.3, 4.6, 0.6)] },
pine: { r: 0.5, s: [0.8, 1.6], p: [q(ctCyl(0.25, 0.4, 3, 6), 0x4A3424, 0, 1.5, 0), q(ctCone(2.4, 4.5, 7), th.key === "snow" ? 0x2E5A40 : 0x2E5A2E, 0, 4.2, 0), q(ctCone(1.7, 3.4, 7), th.key === "snow" ? 0xE8F0F8 : 0x386A34, 0, 6.6, 0)] },
palm: { r: 0.4, s: [0.8, 1.3], p: [tilt(ctCyl(0.22, 0.32, 8, 6), 0x8A6A44, 0.4, 4, 0, 0, -0.1), tilt(ctBox(4.2, 0.08, 0.9), 0x3A8A2A, 2, 8, 0, 0, -0.35), tilt(ctBox(4.2, 0.08, 0.9), 0x3A8A2A, -1.2, 8, 0, 0, 0.35), tilt(ctBox(0.9, 0.08, 4.2), 0x3A8A2A, 0.4, 8, 1.6, 0.35, 0), tilt(ctBox(0.9, 0.08, 4.2), 0x3A8A2A, 0.4, 8, -1.6, -0.35, 0)] },
jtree: { r: 0.8, s: [0.9, 1.8], p: [q(ctCyl(0.45, 0.7, 9, 6), 0x5A4430, 0, 4.5, 0), q(new THREE.IcosahedronGeometry(3.6, 0), L, 0, 9.6, 0, 1, 0.6, 1), q(new THREE.IcosahedronGeometry(2.6, 0), 0x2A6A24, 2, 8.4, 1, 1, 0.7, 1)] },
fern: { r: 0, s: [0.7, 1.4], p: [q(ctCone(0.9, 1.2, 5), 0x3A7A2A, 0, 0.6, 0), q(ctCone(0.7, 1, 5), 0x4A8A34, 0.6, 0.5, 0.3)] },
dead: { r: 0.4, s: [0.8, 1.4], p: [q(ctCyl(0.18, 0.34, 5, 5), 0x3A3028, 0, 2.5, 0), tilt(ctCyl(0.08, 0.14, 2.4, 4), 0x3A3028, 0.7, 4, 0, 0, -0.8), tilt(ctCyl(0.07, 0.12, 2, 4), 0x3A3028, -0.6, 3.4, 0.2, 0.3, 0.9)] },
rock: { r: 0.9, s: [0.6, 2.2], p: [q(new THREE.DodecahedronGeometry(1.3, 0), th.key === "snow" ? 0xA8B0B8 : (th.key === "mars" ? 0x7A3A20 : (th.key === "moon" ? 0x6A6A6A : 0x7A7268)), 0, 0.5, 0, 1, 0.6, 1.1)] },
flower: { r: 0, s: [0.7, 1.3], p: [q(ctCyl(0.02, 0.02, 0.5, 3), 0x3A7A2A, 0, 0.25, 0), q(ctSph(0.14, 5), F || 0xE85A8A, 0, 0.55, 0), q(ctSph(0.12, 5), th.bold ? 0xFFD82A : (F ? 0xF2C83A : 0xF8F0A0), 0.18, 0.42, 0.1)] },
mushroom: { r: 0.6, s: [0.8, 2.2], p: [q(ctCyl(0.35, 0.5, 3, 8), 0xF4ECD8, 0, 1.5, 0), q(new THREE.SphereGeometry(1.8, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), th.bold ? 0xFF3A3A : 0xD84A6A, 0, 2.9, 0, 1, 0.6, 1)] },
crystal: { r: 0.5, s: [0.8, 2], p: [q(new THREE.OctahedronGeometry(0.7, 0), 0x9A7AE8, 0, 1.4, 0, 1, 2.4, 1), q(new THREE.OctahedronGeometry(0.5, 0), 0x7AC8E8, 0.7, 0.9, 0.3, 1, 1.8, 1)] },
ice: { r: 0.8, s: [0.8, 2], p: [q(ctBox(1.4, 4, 1.2), 0xC8E4F4, 0, 2, 0, 1, 1, 1, 0.4), q(ctBox(1, 2.6, 1), 0xE0F0FA, 0.9, 1.3, 0.4, 1, 1, 1, 1.1)] },
coral: { r: 0.4, s: [0.7, 1.8], p: [tilt(ctCyl(0.12, 0.2, 2, 5), 0xE8705A, 0, 1, 0, 0, 0.3), tilt(ctCyl(0.1, 0.16, 1.6, 5), 0xF0A040, 0.4, 0.8, 0, 0.2, -0.5), q(ctSph(0.5, 6), 0xD85A9A, -0.4, 0.5, 0.3, 1, 0.7, 1)] },
kelp: { r: 0, s: [0.8, 2.4], p: [q(ctBox(0.3, 7, 0.06), 0x3A7A3A, 0, 3.5, 0), q(ctBox(0.3, 6, 0.06), 0x4A8A3A, 0.3, 3, 0.2, 1, 1, 1, 1.2)] },
cloud: { r: 0, s: [0.8, 2.4], p: [q(ctSph(2.2, 7), 0xFFFFFF, 0, 1.2, 0, 1, 0.55, 1), q(ctSph(1.6, 7), 0xF8F8FF, 1.8, 1, 0.6, 1, 0.55, 1), q(ctSph(1.4, 7), 0xF4F4FA, -1.6, 0.9, -0.4, 1, 0.55, 1)] },
lamp: { r: 0.25, s: [1, 1], p: [q(ctCyl(0.08, 0.12, 3.6, 6), 0x2A2A2A, 0, 1.8, 0), q(ctBox(0.4, 0.5, 0.4), 0xF8E0A0, 0, 3.8, 0)], glow: 1 },
blossom: { r: 0.5, s: [0.8, 1.4], p: [q(ctCyl(0.25, 0.4, 3.4, 6), 0x4A3428, 0, 1.7, 0), q(new THREE.IcosahedronGeometry(2.4, 0), 0xF4B8D0, 0, 4.6, 0, 1, 0.8, 1), q(new THREE.IcosahedronGeometry(1.6, 0), 0xF8D0E0, 1.2, 4.2, 0.6, 1, 0.8, 1)] },
bamboo: { r: 0.3, s: [0.8, 1.4], p: [q(ctCyl(0.08, 0.08, 7, 5), 0x7AA048, 0, 3.5, 0), q(ctCyl(0.07, 0.07, 6, 5), 0x8AB050, 0.4, 3, 0.2), q(ctCyl(0.07, 0.07, 6.6, 5), 0x6A9040, -0.3, 3.3, 0.3)] },
ruin: { r: 1.2, s: [0.8, 1.6], p: [q(ctCyl(0.6, 0.7, 3.2, 8), 0xB8B0A0, 0, 1.6, 0), q(ctBox(2.4, 0.8, 1.2), 0xA8A090, 1.2, 0.4, 1.4, 1, 1, 1, 0.5)] },
cactus: { r: 0.4, s: [0.8, 1.5], p: [q(ctCyl(0.35, 0.4, 3.6, 7), 0x4A8A3A, 0, 1.8, 0), tilt(ctCyl(0.22, 0.24, 1.4, 6), 0x4A8A3A, 0.6, 2.2, 0, 0, -0.9)] },
lolly: { r: 0.4, s: [0.8, 1.5], p: [q(ctCyl(0.2, 0.28, 3.4, 6), 0xF4ECD8, 0, 1.7, 0), q(ctSph(2, 10), 0xFF4AA8, 0, 4.4, 0), q(ctSph(1.3, 8), 0x3AC8FF, 1.2, 3.8, 0.6)] }
};
},
function (g, o) {
var s = [], cols = [0xE8DCC0, 0xD8C8A8, 0xF0E4D0, 0xC8B898];
[[-10, -4, 0.3], [10, -5, -0.3], [-6, -16, 0.1], [7, -17, -0.15]].forEach(function (p, i) {
var h = new THREE.Group();
h.position.set(p[0], 0, p[1]);
h.rotation.y = p[2];
g.add(h);
var r = CTS_SET.cottage(h, { col: o.col || cols[i] });
r.s.forEach(function (b) { ctsBox(s, p[0], p[1], b.hw, b.hd, b.h, p[2]); });
});
if (o.R)
ctAdd(g, ctCyl(1.1, 1.1, 0.9, 12), 0x8A8A80, 0, 0.45, -9);
return { r: 20, s: s };
},
function (g, o) {
var c = o.col || 0xC8B8A0;
ctAdd(g, ctBox(18, 8, 10), c, 0, 4, 0);
ctsRoof(g, 19, 11, 4, 0x4A4A52, 8);
[-6, 6].forEach(function (x) { ctAdd(g, ctBox(1, 3, 1), 0x7A6A5A, x, 12, 0); });
ctsWindows(g, 16, 2.4, 5.02, 6);
ctsWindows(g, 16, 5.6, 5.02, 6);
ctAdd(g, ctBox(2, 3, 0.12), 0x4A3020, 0, 1.5, 5.04);
ctAdd(g, ctBox(4, 0.4, 2), 0x9A9080, 0, 0.2, 6);
var s = [];
ctsBox(s, 0, 0, 9.2, 5.2, 9);
return { r: 12, s: s };
},
function (g, o) {
var c = o.col || 0x8A8478, s = [], W = 36, H = 9;
[[0, -W / 2, W, 0], [-W / 2, 0, W, Math.PI / 2], [W / 2, 0, W, Math.PI / 2]].forEach(function (w) {
var m = ctAdd(g, ctBox(w[2], H, 2), c, w[0], H / 2, w[1], 0, w[3], 0);
ctsBox(s, w[0], w[1], w[2] / 2, 1.2, H + 1, w[3]);
for (var i = 0; i < 9; i++) {
var t = -w[2] / 2 + 2 + i * (w[2] - 4) / 8;
ctAdd(g, ctBox(1.2, 1.2, 2.2), c, w[0] + (w[3] ? 0 : t), H + 0.6, w[1] + (w[3] ? t : 0));
}
});
[-1, 1].forEach(function (sd) { ctAdd(g, ctBox(13, H, 2), c, sd * 11.5, H / 2, W / 2); ctsBox(s, sd * 11.5, W / 2, 6.6, 1.2, H + 1); });
ctAdd(g, ctBox(10, 1.6, 2.2), c, 0, H - 0.8, W / 2);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { ctAdd(g, ctCyl(3.4, 3.8, H + 6, 12), c, q[0] * W / 2, (H + 6) / 2, q[1] * W / 2); ctAdd(g, ctCone(4.2, 6, 12), o.roof || 0x5A3A6A, q[0] * W / 2, H + 9, q[1] * W / 2); ctsRound(s, q[0] * W / 2, q[1] * W / 2, 3.8, H + 6); });
ctAdd(g, ctBox(14, 18, 12), c, 0, 9, -8);
ctAdd(g, ctCone(9, 8, 4), o.roof || 0x5A3A6A, 0, 22, -8, 0, Math.PI / 4, 0);
ctsWindows(g, 10, 12, -1.98, 4);
ctAdd(g, ctBox(3, 5, 0.2), 0x3A2418, 0, 2.5, -1.94);
ctsBox(s, 0, -8, 7.2, 6.2, 18);
if (o.banner !== false)
[-4, 4].forEach(function (x) { ctAdd(g, ctBox(1.4, 3, 0.06), o.flag || 0xB83A3A, x, H + 2.5, W / 2 + 1.1); });
return { r: 26, s: s };
},
function (g, o) {
var c = o.col || 0x8A8070;
ctAdd(g, ctCyl(4, 4.6, 22, 14), c, 0, 11, 0);
ctAdd(g, ctCone(5, 7, 14), o.roof || 0x4A3A5A, 0, 25.5, 0);
for (var i = 0; i < 4; i++)
ctAdd(g, ctBox(0.8, 1.4, 0.1), 0xF8D890, Math.sin(i * 1.57) * 4.05, 6 + i * 4, Math.cos(i * 1.57) * 4.05, 0, i * 1.57, 0, 1);
ctAdd(g, ctBox(1.6, 2.6, 0.2), 0x3A2418, 0, 1.3, 4.4);
var s = [];
ctsRound(s, 0, 0, 4.6, 22);
return { r: 6, s: s };
},
function (g, o) {
var c = o.col || 0x6A4A2E, s = [];
ctAdd(g, ctBox(26, 0.4, 14), 0x5A4A38, 0, 0.2, 0);
ctAdd(g, ctBox(26, 7, 0.8), c, 0, 3.7, -6.8);
ctsBox(s, 0, -6.8, 13, 0.6, 8);
[-1, 1].forEach(function (sd) { ctAdd(g, ctBox(0.8, 7, 14), c, sd * 12.8, 3.7, 0); ctsBox(s, sd * 12.8, 0, 0.6, 7, 8); });
for (var i = 0; i < 7; i++) {
var x = -11 + i * 3.66;
ctAdd(g, ctCyl(0.4, 0.45, 7, 8), c, x, 3.7, 6.6);
ctsRound(s, x, 6.6, 0.5, 8);
}
[-1, 1].forEach(function (sd) { var r = ctAdd(g, ctBox(28, 0.5, 8.6), o.roof || 0x4A3A28, 0, 9, sd * 3.6, sd * 0.62, 0, 0); });
ctAdd(g, ctBox(3, 0.3, 1.5), 0x3A2A1A, 0, 0.55, 0);
ctLight(g, 0xFFB060, 0, 1.4, 0, 3);
return { r: 16, s: s };
},
function (g, o) {
var c = o.col || 0xE8E2D4, s = [];
ctAdd(g, ctBox(22, 1.2, 15), c, 0, 0.6, 0);
ctAdd(g, ctBox(20, 0.6, 13), c, 0, 1.5, 0);
for (var i = 0; i < 8; i++) {
var x = -8.75 + i * 2.5;
[-5.6, 5.6].forEach(function (z) { ctAdd(g, ctCyl(0.55, 0.62, 7, 12), c, x, 5.3, z); ctsRound(s, x, z, 0.7, 9); });
}
ctAdd(g, ctBox(21, 1, 14), c, 0, 9.3, 0);
var p = ctAdd(g, new THREE.CylinderGeometry(0.01, 7.4, 3, 3), c, 0, 11.3, 0, Math.PI / 2, 0, Math.PI / 2);
p.scale.set(1, 14, 0.35);
ctAdd(g, ctBox(8, 6.5, 8), c, 0, 4.8, -1.5);
ctsBox(s, 0, -1.5, 4, 4, 8);
return { r: 14, s: s };
},
function (g, o) {
var c = o.col || 0xD8C08A, s = [];
[-1, 1].forEach(function (sd) { var m = ctAdd(g, ctBox(9, 14, 5), c, sd * 7.5, 7, 6); ctsBox(s, sd * 7.5, 6, 4.6, 2.6, 14); ctAdd(g, ctBox(8, 1.2, 0.1), 0x2A6AA8, sd * 7.5, 10, 8.56); ctAdd(g, ctBox(8, 1.2, 0.1), 0xB83A2A, sd * 7.5, 8, 8.56); });
for (var i = 0; i < 6; i++) {
var z = 2 - i * 3.4;
[-4.5, 4.5].forEach(function (x) { ctAdd(g, ctCyl(0.9, 1, 10, 10), c, x, 5, z); ctAdd(g, ctCyl(1.3, 0.9, 1.2, 10), 0x4A9A6A, x, 10.4, z); ctsRound(s, x, z, 1.1, 11); });
}
ctAdd(g, ctBox(12, 1, 20), c, 0, 11.5, -6);
[-1, 1].forEach(function (sd) { ctAdd(g, ctCyl(0.7, 1.1, 12, 4), c, sd * 3, 6, 12, 0, Math.PI / 4, 0); ctsRound(s, sd * 3, 12, 1.1, 12); });
return { r: 16, s: s };
},
function (g, o) {
var c = o.col || 0xF0E8D8, s = [];
ctAdd(g, ctBox(26, 11, 18), c, 0, 5.5, 0);
ctAdd(g, new THREE.SphereGeometry(8, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), o.dome || 0x3A8AC8, 0, 11, 0);
ctAdd(g, ctCone(0.6, 4, 8), 0xF2C84A, 0, 21, 0, 0, 0, 0, 1);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { ctAdd(g, ctCyl(1, 1.2, 20, 10), c, q[0] * 14, 10, q[1] * 10); ctAdd(g, ctSph(1.6, 10), o.dome || 0x3A8AC8, q[0] * 14, 20.6, q[1] * 10); ctsRound(s, q[0] * 14, q[1] * 10, 1.3, 20); });
var a = ctAdd(g, new THREE.TorusGeometry(2.6, 0.5, 6, 14, Math.PI), 0xF2C84A, 0, 4, 9.05);
ctAdd(g, ctBox(5.2, 4, 0.2), 0x3A2418, 0, 2, 9.02);
ctsWindows(g, 22, 7.5, 9.03, 7, 0xF8D890);
ctsBox(s, 0, 0, 13.2, 9.2, 12);
return { r: 18, s: s };
},
function (g, o) {
var c = o.col || 0xE8E4DC, s = [];
ctAdd(g, ctBox(10, 7, 18), c, 0, 3.5, -3);
ctsRoof(g, 11, 19, 5, 0x3A3A40, 7);
ctAdd(g, ctBox(5, 16, 5), c, 0, 8, 7.5);
ctAdd(g, ctCone(3.6, 10, 4), 0x3A3A40, 0, 21, 7.5, 0, Math.PI / 4, 0);
ctAdd(g, ctBox(2, 3.2, 0.12), 0x5A3A20, 0, 1.6, 10.04);
for (var i = 0; i < 4; i++)
[-5.02, 5.02].forEach(function (x) { ctAdd(g, ctBox(0.08, 2.4, 1), 0xC8D8F0, x, 3.4, -9 + i * 4, 0, 0, 0, 1); });
ctsBox(s, 0, -3, 5.2, 9.2, 8);
ctsBox(s, 0, 7.5, 2.7, 2.7, 16);
return { r: 13, s: s };
},
function (g, o) {
var c = o.col || 0x5A3A24, s = [];
var h = ctAdd(g, ctBox(7, 4, 24), c, 0, 2, 0);
var p = ctAdd(g, ctCone(3.5, 7, 4), c, 0, 2, 15.4, Math.PI / 2, 0, Math.PI / 4);
p.scale.set(1, 1, 0.6);
ctAdd(g, ctBox(7.4, 0.4, 24.4), 0xC8A060, 0, 4.1, 0);
ctAdd(g, ctBox(7, 3, 6), c, 0, 5.6, -9);
[[0, 8, 6, 10], [0, 12, -1, 13], [0, 8, -7, 8]].forEach(function (m) { ctAdd(g, ctCyl(0.22, 0.3, m[3] * 1.6, 6), 0x4A3424, m[0], 4 + m[3] * 0.8, m[2]); ctAdd(g, ctBox(6, m[1] * 0.55, 0.08), 0xF4ECD8, m[0], 4 + m[3] * 0.9, m[2] + 0.3); });
ctsBox(s, 0, 0, 3.8, 13, 9);
ctsRound(s, 0, 15, 2, 6);
return { r: 17, s: s };
},
function (g, o) {
var c = o.col || 0x6A6058, s = [];
var m = ctAdd(g, new THREE.DodecahedronGeometry(13, 1), c, 0, 4, -4);
m.scale.set(1.3, 0.85, 1);
ctAdd(g, new THREE.DodecahedronGeometry(6, 0), c, -12, 2, 4);
ctAdd(g, new THREE.DodecahedronGeometry(5, 0), c, 13, 1.5, 3);
ctAdd(g, ctBox(6, 7, 3), 0x0A0806, 0, 3.5, 7.6);
ctAdd(g, new THREE.CylinderGeometry(3, 3, 3, 12, 1, false, 0, Math.PI), 0x0A0806, 0, 7, 7.6, Math.PI / 2, 0, Math.PI / 2);
ctsBox(s, 0, -4, 15, 9, 14);
ctsRound(s, -12, 4, 5, 6);
ctsRound(s, 13, 3, 4.4, 6);
return { r: 18, s: s };
},
function (g, o) {
var c = o.col || 0x8A8070, s = [];
ctAdd(g, ctBox(30, 0.12, 7), 0x3A6A9A, 0, 0.06, 0);
var b = ctAdd(g, new THREE.CylinderGeometry(9, 9, 3.6, 18, 1, true, -0.9, 1.8), c, 0, -6.6, 0, 0, 0, Math.PI / 2);
b.material = ctM(c);
[-1, 1].forEach(function (sd) { ctAdd(g, ctBox(0.3, 0.9, 14), c, sd * 1.8, 1.4, 0, 0.3 * 0, 0, 0); });
ctsBox(s, -9, 0, 6, 3.4, 1.2);
ctsBox(s, 9, 0, 6, 3.4, 1.2);
return { r: 16, s: s };
},
function (g, o) {
var s = [];
ctAdd(g, ctCyl(2.2, 3.6, 20, 10), 0x5A4028, 0, 10, 0);
for (var i = 0; i < 5; i++)
ctAdd(g, new THREE.IcosahedronGeometry(7 - i * 0.4, 1), o.col || 0x3E7A2E, Math.sin(i * 1.3) * 6, 20 + i * 1.5, Math.cos(i * 1.3) * 5);
for (var j = 0; j < 4; j++)
ctAdd(g, ctCyl(0.5, 1.2, 7, 6), 0x5A4028, Math.sin(j * 1.57) * 3.4, 1.4, Math.cos(j * 1.57) * 3.4, Math.cos(j * 1.57) * 0.9, 0, -Math.sin(j * 1.57) * 0.9);
ctsRound(s, 0, 0, 3.8, 20);
return { r: 10, s: s };
},
function (g, o) {
var s = [];
[[0, 0, 3], [-7, 3, 2], [6, 4, 2.4], [-4, -7, 1.6], [5, -6, 1.8]].forEach(function (m, i) {
ctAdd(g, ctCyl(0.4 * m[2], 0.55 * m[2], 3 * m[2], 10), 0xF4ECD8, m[0], 1.5 * m[2], m[1]);
ctAdd(g, new THREE.SphereGeometry(1.9 * m[2], 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), [0xD84A6A, 0x7A5AD8, 0xE89A3A, 0x4AA8D8, 0xD84A6A][i], m[0], 2.9 * m[2], m[1]).scale.y = 0.6;
ctsRound(s, m[0], m[1], 0.6 * m[2], 3 * m[2]);
});
return { r: 11, s: s };
},
function (g, o) {
var s = [], cols = [0x8A5A4A, 0x7A6A5A, 0x9A8A78, 0x6A4A3A, 0x8A7A6A];
for (var i = 0; i < 5; i++) {
var x = -20 + i * 10, h = 11 + (i % 2) * 2, c = o.col || cols[i];
ctAdd(g, ctBox(9.6, h, 8), c, x, h / 2, -4);
ctAdd(g, ctBox(10, 0.6, 8.4), 0x3A3A3A, x, h + 0.3, -4);
ctsWindows(g, 8, 3, 0.03, 3);
[3, 6.5, 10].forEach(function (y) { if (y < h - 1)
for (var k = 0; k < 3; k++)
ctAdd(g, ctBox(1.2, 1.6, 0.08), 0xF8D890, x - 3 + k * 3, y, 0.04, 0, 0, 0, 1); });
ctAdd(g, ctBox(1.4, 2.6, 0.1), 0x2A2A3A, x, 1.3, 0.06);
}
ctsBox(s, 0, -4, 25, 4.2, 14);
for (var j = 0; j < 4; j++) {
var lx = -15 + j * 10;
ctAdd(g, ctCyl(0.08, 0.12, 4, 6), 0x1A1A1A, lx, 2, 3);
ctAdd(g, ctBox(0.5, 0.6, 0.5), 0xF8E0A0, lx, 4.2, 3, 0, 0, 0, 1);
}
return { r: 26, s: s };
},
function (g, o) {
var s = [];
ctAdd(g, ctCyl(2.6, 3.6, 20, 12), 0xF4F0E8, 0, 10, 0);
[4, 10, 16].forEach(function (y) { ctAdd(g, ctCyl(3.0 - y * 0.03, 3.2 - y * 0.03, 2, 12), 0xC83A3A, 0, y, 0); });
ctAdd(g, ctCyl(2, 2, 2.6, 10), 0xF8E8A0, 0, 21.3, 0, 0, 0, 0, 1);
ctAdd(g, ctCone(2.6, 2.4, 10), 0x2A2A2A, 0, 23.8, 0);
ctsRound(s, 0, 0, 3.6, 22);
return { r: 6, s: s };
},
function (g, o) {
var s = [];
[[0, -9, 22, 0], [-11, 0, 18, 1], [11, 0, 18, 1]].forEach(function (h) { ctAdd(g, ctBox(h[2], 2.2, 1.4), 0x2E6A2A, h[0], 1.1, h[1], 0, h[3] * Math.PI / 2, 0); ctsBox(s, h[0], h[1], h[2] / 2, 0.9, 2.4, h[3] * Math.PI / 2); });
for (var i = 0; i < 10; i++) {
var x = -8 + i * 1.8;
ctAdd(g, ctSph(0.7, 7), 0x2E6A2A, x, 0.6, -6);
ctAdd(g, ctSph(0.25, 6), o.col || [0xE83A3A, 0xF8F8F8][i % 2], x, 1.1, -5.5);
}
return { r: 13, s: s };
},
function (g, o) {
var s = [];
[[-10, 0], [0, -8], [10, 1]].forEach(function (p, i) {
var h = new THREE.Group();
h.position.set(p[0], 0, p[1]);
g.add(h);
ctAdd(h, ctCyl(2, 2.8, 10, 8), 0xE8DCC8, 0, 5, 0);
ctAdd(h, ctCone(2.6, 3, 8), 0x7A4A2A, 0, 11.5, 0);
var hub = new THREE.Group();
hub.position.set(0, 9.5, 2.6);
h.add(hub);
for (var k = 0; k < 4; k++) {
var b = ctAdd(hub, ctBox(0.8, 7, 0.1), 0xD8C8A0, 0, 3.5, 0);
var p2 = new THREE.Group();
p2.rotation.z = k * Math.PI / 2 + i * 0.4;
p2.add(b);
hub.add(p2);
}
ctsRound(s, p[0], p[1], 2.8, 10);
});
return { r: 14, s: s };
},
function (g, o) {
ctAdd(g, ctCyl(1, 1.1, 0.3, 10), 0x3A2A1A, 0, 0.15, 0);
for (var i = 0; i < 5; i++)
ctAdd(g, ctCyl(0.12, 0.12, 1.4, 5), 0x5A3A24, Math.sin(i * 1.25) * 0.5, 0.4, Math.cos(i * 1.25) * 0.5, Math.cos(i * 1.25) * 0.9, 0, Math.sin(i * 1.25) * 0.9);
ctLight(g, 0xFFA850, 0, 0.9, 0, 2.4);
[[-2.5, 0], [2.5, 0], [0, -2.5]].forEach(function (p) { ctAdd(g, ctCyl(0.3, 0.3, 1.4, 6), 0x6A4A2A, p[0], 0.3, p[1], 0, 0, Math.PI / 2); });
return { r: 4, s: [] };
},
function (g, o) {
var c = 0x6A6A72;
[0, 2.1, 4.2].forEach(function (a) { ctAdd(g, ctCyl(0.3, 0.4, 22, 6), c, Math.sin(a) * 5, 10, Math.cos(a) * 5, Math.cos(a) * 0.22, 0, -Math.sin(a) * 0.22); });
var h = ctAdd(g, ctSph(4, 12), 0x8A8A92, 0, 22, 0);
h.scale.y = 0.55;
ctAdd(g, ctSph(0.8, 8), 0x4A8A6A, 0, 21, 3.6, 0, 0, 0, 1);
var s = [];
[0, 2.1, 4.2].forEach(function (a) { ctsRound(s, Math.sin(a) * 7, Math.cos(a) * 7, 0.6, 20); });
return { r: 9, s: s };
},
function (x, z) {
var th = CTS.th, s = th.scale || 260, h = (wFbm(x / s + 50, z / s + 50, CTS.seed, 4) - 0.5) * 2 * (th.amp || 12), d = Math.hypot(x, z);
if (th.dunes)
h += Math.sin(x * 0.018 + z * 0.006) * 4 + Math.sin(z * 0.011) * 3;
if (th.isle)
h = h * 0.4 + 9 - Math.max(0, d - 660) * 0.09;
else if (th.coast)
h = h - Math.max(0, d - 780) * 0.12;
else
h += Math.min(26, Math.pow(Math.max(0, d - 780) / 30, 1.4) * 1.5);
return h;
},
function (x, z) {
var h = ctsH0(x, z), L = CTS.places;
for (var i = 0; i < L.length; i++) {
var p = L[i], dd = Math.hypot(x - p.x, z - p.z);
if (dd < p.fr + 30) {
var w = 1 - ctsSm(p.fr, p.fr + 30, dd);
h += (p.y - h) * w;
}
}
var da = Math.hypot(x, z - 20);
if (da < 50) {
var wa = 1 - ctsSm(22, 50, da);
h += (CTS.y0 - h) * wa;
}
if (CTS.raise && h < 1.6) {
var bd = 1e9, cx = Math.floor(x / 24), cz = Math.floor(z / 24);
for (var gx = cx - 1; gx <= cx + 1; gx++)
for (var gz = cz - 1; gz <= cz + 1; gz++) {
var Q = CTS.raise[gx + "," + gz];
if (Q)
for (var q = 0; q < Q.length; q++) {
var e = Math.hypot(x - Q[q].x, z - Q[q].z);
if (e < bd)
bd = e;
}
}
if (bd < 22) {
var wr = 1 - ctsSm(6, 22, bd);
h += (1.6 - h) * wr;
}
}
return h;
},
function (x, z) {
var H = CTS.H;
if (!H)
return 0;
var n = CTS.n, st = CTS.step, S2 = CTS.S / 2, u = (x + S2) / st, v = (z + S2) / st;
if (u < 0)
u = 0;
if (v < 0)
v = 0;
if (u > n - 0.001)
u = n - 0.001;
if (v > n - 0.001)
v = n - 0.001;
var ix = Math.floor(u), iy = Math.floor(v), fu = u - ix, fv = v - iy, W = n + 1;
var ha = H[iy * W + ix], hb = H[(iy + 1) * W + ix], hc = H[(iy + 1) * W + ix + 1], hd = H[iy * W + ix + 1];
if (fu + fv <= 1)
return ha + (hd - ha) * fu + (hb - ha) * fv;
return hc + (hb - hc) * (1 - fu) + (hd - hc) * (1 - fv);
},
function (T, W) {
var n = W.ch.length, R = ctRand(ctHash(T.id + "w")), out = [], a = R() * Math.PI * 2, prev = { x: 0, z: 20 };
for (var k = 0; k < n; k++) {
var r = 95 + (n > 1 ? k / (n - 1) : 0) * 560, x = Math.sin(a) * r, z = Math.cos(a) * r;
if (k === 0) {
x = Math.sin(a) * 95;
z = Math.cos(a) * 95;
}
out.push({ k: k, x: x, z: z, face: Math.atan2(prev.x - x, prev.z - z) });
prev = { x: x, z: z };
a += (Math.PI * 2 * 1.05) / Math.max(n, 5) + (R() - 0.5) * 0.3;
}
return out;
},
function (t) {
var r = { cottage: 6, village: 20, manor: 12, castle: 26, tower: 6, hall: 16, temple: 14, egtemple: 16, pyramid: 32, palace: 18, pagoda: 8, church: 13, ship: 17, wreck: 17, cave: 18, cliff: 28, arch: 8, bridge: 16, ruins: 12, bigtree: 10, mushrooms: 11, tents: 13, street: 26, lighthouse: 6, crater: 14, obelisk: 3, spires: 12, garden: 13, pool: 12, dome: 7, wall: 27, hut: 4, mound: 12, dock: 12, throne: 5, stage: 11, windmills: 14, camp: 4, igloo: 6, rocket: 5, tripod: 9 }[t.n];
if (r === undefined)
r = CT_SHAPES[t.n] ? 3 : Math.max(1.5, ctKitSize(t.n) * 0.6);
return r * t.s;
},
function (G) {
var T = CTS.T, W = CTS.W, th = CTS.th = (typeof ctsTheme === "function" ? ctsTheme(T.id) : CTS_TH[W.th] || CTS_TH.meadow), lite = ctLite();
if (typeof EVB_WD !== "undefined")
EVB_WD.ctale = [];
CTS.seed = ctHash(T.id) % 997;
CTS.grid = {};
CTS.far = [];
CTS.places = [];
CTS.talkFixed = [];
CTS.water = null;
var root = CTS.root = new THREE.Group();
root.name = "ct-story";
G.add(root);
CTS.y0 = ctsH0(0, 20);
if (th.isle || th.coast)
CTS.y0 = Math.max(CTS.y0, 3);
ctsLayout(T, W).forEach(function (L) {
var C = W.ch[L.k], toks = ctsTokens(C[2]), main = toks.filter(function (t) { return !t.far; })[0], mr = main ? ctsTokR(main) : 6;
var y = ctsH0(L.x, L.z);
if (th.isle || th.coast)
y = Math.max(y, 3);
CTS.places.push({ k: L.k, x: L.x, z: L.z, face: L.face, y: y, fr: Math.max(30, mr + 26), C: C, toks: toks, mr: mr, people: null, pg: null });
});
CTS.raise = null;
if (th.isle || th.coast) {
var rp = [{ x: 0, z: 20 }].concat(CTS.places.map(function (p) { var c = Math.cos(p.face), s = Math.sin(p.face); return { x: p.x + s * 6, z: p.z + c * 6 }; })), RG = {};
ctsRoadPts(rp).forEach(function (q) { var k = Math.floor(q.x / 24) + "," + Math.floor(q.z / 24); (RG[k] = RG[k] || []).push(q); });
CTS.raise = RG;
}
var n = CTS.n = lite ? 110 : 170, S = CTS.S, st = CTS.step = S / n, H = CTS.H = new Float32Array((n + 1) * (n + 1));
for (var iy = 0; iy <= n; iy++)
for (var ix = 0; ix <= n; ix++)
H[iy * (n + 1) + ix] = ctsHeight(-S / 2 + ix * st, -S / 2 + iy * st);
var gc = th.g.map(function (c) { return new THREE.Color(ctsCap(c, 0xB0)); }), tmp = new THREE.Color();
var gm = wGround(S, n, function (x, z) {
var ix = Math.round((x + S / 2) / st), iy = Math.round((z + S / 2) / st), h = H[iy * (n + 1) + ix], nz = wNoise(x * 0.02, z * 0.02, CTS.seed + 3);
if (th.isle && h < 2.2)
return [h, 0xB0A07A];
tmp.copy(gc[0]).lerp(gc[1], nz);
if (h > (th.amp || 12) * 0.55)
tmp.lerp(gc[2], Math.min(0.6, (h - (th.amp || 12) * 0.55) / 12));
return [h, tmp.getHex()];
});
root.add(gm);
if (th.isle || th.coast) {
var sea = new THREE.Mesh(new THREE.PlaneGeometry(9000, 9000, 1, 1), new THREE.MeshPhongMaterial({ color: 0x2A7AAA, shininess: 60, specular: 0x445566, transparent: true, opacity: 0.92 }));
sea.rotation.x = -Math.PI / 2;
sea.position.y = -0.2;
root.add(sea);
CTS.water = sea;
}
var pts = [{ x: 0, z: 20 }].concat(CTS.places.map(function (p) { var c = Math.cos(p.face), s = Math.sin(p.face); return { x: p.x + s * 6, z: p.z + c * 6 }; }));
CTS.path = pts;
ctsPath(root, pts, ctsCap(th.path, 0xA8));
var p0 = CTS.places[0];
CTS.fa = p0 ? Math.atan2(p0.x, p0.z - 22) : Math.PI;
CTS.gate = { x: -Math.sin(CTS.fa) * 11, z: 22 - Math.cos(CTS.fa) * 11 };
ctsGate(root);
CTS.places.forEach(function (p) { ctsPlace(root, p); });
if (typeof ctdDress === "function")
ctdDress(root, lite);
ctsScatter(root, th, lite);
var bm = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 60, 10, 1, true), new THREE.MeshBasicMaterial({ color: 0xB8A878, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide }));
bm.position.y = 30;
var bg = new THREE.Group();
bg.add(bm);
root.add(bg);
CTS.beam = bg;
CTS.beamM = bm.material;
},
function (pts) {
var out = [];
for (var i = 0; i < pts.length - 1; i++) {
var A = pts[i], B = pts[i + 1], d = Math.hypot(B.x - A.x, B.z - A.z), n = Math.max(2, Math.ceil(d / 5)), nx = -(B.z - A.z) / d, nz = (B.x - A.x) / d;
for (var j = 0; j <= n; j++) {
var t = j / n, wob = Math.sin(t * Math.PI * 3 + i) * Math.sin(t * Math.PI) * 14;
out.push({ x: A.x + (B.x - A.x) * t + nx * wob, z: A.z + (B.z - A.z) * t + nz * wob });
}
}
return out;
},
function (root, pts, col) {
var pos = [], idx = [], vi = 0, C = CTS.pathC = [];
for (var i = 0; i < pts.length - 1; i++) {
var A = pts[i], B = pts[i + 1], d = Math.hypot(B.x - A.x, B.z - A.z), n = Math.max(2, Math.ceil(d / 5)), nx = -(B.z - A.z) / d, nz = (B.x - A.x) / d;
for (var j = 0; j <= n; j++) {
var t = j / n, wob = Math.sin(t * Math.PI * 3 + i) * Math.sin(t * Math.PI) * 14, x = A.x + (B.x - A.x) * t + nx * wob, z = A.z + (B.z - A.z) * t + nz * wob;
if (j > 0 || i === 0)
C.push({ x: x, z: z });
[-1.7, 1.7].forEach(function (o) { var px = x + nx * o, pz = z + nz * o; pos.push(px, ctsGround(px, pz) + 0.07, pz); });
if (j > 0) {
idx.push(vi - 2, vi - 1, vi, vi - 1, vi + 1, vi);
}
vi += 2;
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 }));
root.add(m);
},
function (root) {
var T = CTS.T, g = new THREE.Group(), q = CTS.gate || { x: 0, z: 8 }, y = ctsGround(q.x, q.z), r = Math.atan2(0 - q.x, 22 - q.z);
g.position.set(q.x, y, q.z);
g.rotation.y = r;
root.add(g);
var c = 0x6A4A2E;
[-1, 1].forEach(function (sd) { ctAdd(g, ctBox(0.9, 6, 0.9), c, sd * 3.4, 3, 0); ctsSolid({ x: q.x + sd * 3.4 * Math.cos(r), z: q.z - sd * 3.4 * Math.sin(r), hw: 0.6, hd: 0.6, h: 6, rot: r }); });
ctAdd(g, ctBox(8, 0.9, 1), c, 0, 6.2, 0);
var sg = wSign(["📖 " + T.t, T.by, "The way back is behind you"], 5, 2, (T.col || [])[0] || "#2A2018", (T.col || [])[1] || "#F2E2B0");
sg.position.set(0, 4.4, 0.5);
g.add(sg);
var p = new THREE.Mesh(new THREE.CircleGeometry(2.6, 24), new THREE.MeshBasicMaterial({ color: 0x6A5A40, transparent: true, opacity: 0.3, side: THREE.DoubleSide, depthWrite: false }));
p.position.set(0, 2.8, -0.2);
g.add(p);
CTS.talkFixed.push({ x: q.x, z: q.z, r: 3.4, name: "The way back", verb: "leave the story", fn: function () { ctsMenu(); } });
},
function (root, p) {
var g = new THREE.Group();
g.position.set(p.x, p.y, p.z);
g.rotation.y = p.face;
root.add(g);
p.g = g;
var c = Math.cos(p.face), s = Math.sin(p.face);
function W(lx, lz) { return [p.x + lx * c + lz * s, p.z - lx * s + lz * c]; }
function put(t, lx, lz, rot) {
for (var i = 0; i < t.x; i++) {
var ox = lx + (t.x > 1 ? (i - (t.x - 1) / 2) * (ctsTokR(t) * 2 + 2) : 0), q = W(ox, lz), y = ctsGround(q[0], q[1]) - p.y;
var h = new THREE.Group();
h.position.set(ox, y, lz);
h.rotation.y = rot || 0;
g.add(h);
var res = null;
if (CTS_SET[t.n])
res = CTS_SET[t.n](h, { col: t.col, R: ctRand(ctHash(t.n + p.k)) });
else if (CT_SHAPES[t.n]) {
CT_SHAPES[t.n](h, {});
res = { r: 3, s: [{ x: 0, z: 0, r: Math.min(2.2, ctsTokR(t) * 0.6), h: 3 }] };
}
else {
var m = build({ id: "cts_" + t.n + "_" + p.k + "_" + i, archetype: t.n, label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, hub: true });
h.add(m);
var sz = ctKitSize(t.n);
res = { r: sz, s: sz > 0.6 ? [{ x: 0, z: 0, r: Math.min(sz * 0.42, 6), h: 6 }] : [] };
}
if (t.s !== 1)
h.scale.setScalar(t.s);
if (typeof ctnDoor === "function")
ctnDoor(t.n, q[0], q[1], p.face + (rot || 0), t.s, ctsGround(q[0], q[1]));
(res && res.s || []).forEach(function (b) {
var bx = b.x * t.s, bz = b.z * t.s, rr = (rot || 0), cx = Math.cos(rr), sx = Math.sin(rr), lx2 = ox + bx * cx + bz * sx, lz2 = lz - bx * sx + bz * cx, wq = W(lx2, lz2);
if (b.r !== undefined)
ctsSolid({ x: wq[0], z: wq[1], r: b.r * t.s, h: b.h * t.s });
else
ctsSolid({ x: wq[0], z: wq[1], hw: b.hw * t.s, hd: b.hd * t.s, h: b.h * t.s, rot: p.face + rr + (b.rot || 0) });
});
}
}
var near = p.toks.filter(function (t) { return !t.far; }), far = p.toks.filter(function (t) { return t.far; });
if (near[0])
put(near[0], 0, -(p.mr + 8), 0);
var side = 1, off = [p.mr * 0.5 + 8, p.mr * 0.5 + 8];
near.slice(1).forEach(function (t, i) { var r = ctsTokR(t), k = side > 0 ? 0 : 1; off[k] += r; put(t, side * off[k], -(p.mr * 0.6) + (i % 2 ? 4 : -2), side * -0.4); off[k] += r + 3; side = -side; });
far.forEach(function (t, i) {
var a = Math.atan2(p.x, p.z) + (i - (far.length - 1) / 2) * 0.3, R2 = 905, wx = Math.sin(a) * R2, wz = Math.cos(a) * R2, dx = wx - p.x, dz = wz - p.z;
CTS.far.push([wx, wz, ctsTokR(t) + 6]);
put(t, dx * c - dz * s, dx * s + dz * c, 0);
});
var lg = new THREE.Group();
g.add(lg);
ctBoardShape(lg, { t: "Chapter " + (p.k + 1), by: p.C[0], col: CTS.T.col, soft: 1 });
ctsSolid({ x: p.x, z: p.z, hw: 1.2, hd: 0.3, h: 2.4, rot: p.face });
CTS.talkFixed.push({ x: p.x, z: p.z, r: 3.2, name: "Chapter " + (p.k + 1) + ": " + p.C[0], verb: "", chap: p.k });
},
function (root, th, lite) {
var K = typeof ctdKinds === "function" ? Object.assign(ctsKinds(th), ctdKinds(th)) : ctsKinds(th), R = ctRand(CTS.seed * 31 + 7), mul = lite ? 0.45 : 1, S = CTS.S;
Object.keys(th.sc || {}).forEach(function (kn) {
var D = K[kn], want = Math.round((th.sc[kn] || 0) * mul);
if (!D || !want)
return;
var mats = [], placed = 0, tries = 0, M = new THREE.Matrix4(), P = new THREE.Matrix4();
var ims = D.p.map(function (pt) { var im = new THREE.InstancedMesh(pt.geo, ctM(pt.col, D.glow && pt === D.p[D.p.length - 1] ? 1 : 0), want); im.count = 0; root.add(im); return im; });
while (placed < want && tries < want * 6) {
tries++;
var a = R() * Math.PI * 2, r = Math.sqrt(R()) * (CTS.bound + 60), x = Math.sin(a) * r, z = Math.cos(a) * r;
if (!ctsClear(x, z, kn))
continue;
var y = ctsGround(x, z);
if (CTS.water && y < 0.4 && kn !== "rock")
continue;
var s = D.s[0] + R() * (D.s[1] - D.s[0]);
P.compose(new THREE.Vector3(x, y - 0.1, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, R() * 6.28, 0)), new THREE.Vector3(s, s, s));
D.p.forEach(function (pt, i) { M.multiplyMatrices(P, pt.m); ims[i].setMatrixAt(placed, M); });
if (D.r)
ctsSolid({ x: x, z: z, r: D.r * s, h: 8 * s });
placed++;
}
ims.forEach(function (im) { im.count = placed; im.instanceMatrix.needsUpdate = true; im.frustumCulled = false; });
});
},
function (x, z, kn) {
var small = kn === "flower" || kn === "fern" || kn === "kelp";
if (Math.hypot(x, z - 20) < (small ? 14 : 34))
return false;
for (var i = 0; i < CTS.places.length; i++) {
var p = CTS.places[i];
if (Math.hypot(x - p.x, z - p.z) < p.fr + (small ? -6 : 10))
return false;
}
for (var f = 0; f < CTS.far.length; f++) {
var F = CTS.far[f];
if (Math.hypot(x - F[0], z - F[1]) < F[2])
return false;
}
var P = CTS.path;
for (var j = 0; j < P.length - 1; j++) {
var A = P[j], B = P[j + 1], dx = B.x - A.x, dz = B.z - A.z, L2 = dx * dx + dz * dz, t = Math.max(0, Math.min(1, ((x - A.x) * dx + (z - A.z) * dz) / L2));
if (Math.hypot(x - (A.x + dx * t), z - (A.z + dz * t)) < (small ? 3 : 20))
return false;
}
return true;
},
function (p, on) {
if (on === !!p.pg)
return;
if (!on) {
var G = p.pg;
p.pg = null;
p.people = null;
if (G.parent)
G.parent.remove(G);
ctsFree(G);
ctsTalkers();
return;
}
var T = CTS.T, pg = p.pg = new THREE.Group();
CTS.root.add(pg);
p.people = [];
var who = p.C[4] || [], n = who.length, c = Math.cos(p.face), s = Math.sin(p.face);
who.forEach(function (wi, i) {
var Wh = T.who[wi];
if (!Wh)
return;
var lx = (i - (n - 1) / 2) * 3.2, lz = -3.2 - Math.abs(i - (n - 1) / 2) * 0.9, x = p.x + lx * c + lz * s, z = p.z - lx * s + lz * c;
var g = ctPersonBody(Wh, T.id + "_" + Wh.n + "_c" + p.k);
g.position.set(x, ctsGround(x, z), z);
g.rotation.y = p.face + (Wh.turn || 0);
pg.add(g);
p.people.push({ p: { g: g, wander: null }, r: 3.2, name: Wh.n, talk: ctTalk(T, Wh) });
});
ctsTalkers();
},
function (G) {
G.traverse(function (m) {
if (m.geometry && m.geometry.dispose && !m.geometry.userData.shared && !(typeof FIGGEO !== "undefined" && typeof ldShared === "function" && ldShared(m.geometry)))
m.geometry.dispose();
var ms = Array.isArray(m.material) ? m.material : (m.material ? [m.material] : []);
ms.forEach(function (mt) { if (mt.map && mt.map.isCanvasTexture)
mt.map.dispose(); });
});
},
function (id) {
var T = CT_BY_ID[id], Wd = CT_W[id];
if (!T || !Wd || typeof worldGo !== "function")
return;
if (ctOff(id)) {
ctSay("📖 The Keeper has closed this story for now.");
return;
}
if (CT.run)
ctStop(null);
worldCard(null);
var host = CT.host, P = camera.position;
if (!CTS.on)
CTS.back = host && host.indexOf("world:") === 0 ? { key: WLD.on, k: (WLD.on === "surface" && typeof SF !== "undefined") ? SF.k : null, x: P.x, y: P.y, z: P.z, yaw: yaw } : { land: true };
var W = WORLDS.ctale;
if (W.g && CTS.T !== T) {
if (WLD.on === "ctale")
worldOff(true);
ctsDrop();
}
CTS.T = T;
CTS.W = Wd;
CTS.th = typeof ctsTheme === "function" ? ctsTheme(id) : (CTS_TH[Wd.th] || CTS_TH.meadow);
if (ctSigned())
ctRpc("tale_start", { p_key: id }).catch(function () { });
worldGo("ctale", {});
},
function () {
var W = WORLDS.ctale;
if (!W || !W.g || WLD.on === "ctale")
return;
if (typeof worldLetGo !== "function" || !worldLetGo("ctale")) {
var G = W.g;
W.g = null;
scene.remove(G);
ctsFree(G);
}
CTS.root = null;
CTS.places = [];
CTS.grid = {};
CTS.H = null;
CTS.talkFixed = [];
CTS.beam = null;
CTS.water = null;
CTS.path = [];
CTS.pathC = [];
CTS.far = [];
if (CT.g && !CT.g.parent)
CT.g = null;
},
function () {
var B = CTS.back;
if (CT.run)
ctStop(null);
worldCard(null);
if (!B || B.land) {
worldHome("📖 You close the book and step back into the dream.");
return;
}
worldGo(B.key, B.k ? { k: B.k, keepFrom: true } : { keepFrom: true });
if (WLD.on === B.key) {
camera.position.set(B.x, B.y, B.z);
yaw = B.yaw || 0;
pitch = 0;
}
ctSay("📖 You close the book and step back out by its board.");
},
function () { var E = (CTS.th || CTS_TH.meadow).env; return { top: ctsCap(E.top, 0xC0), low: ctsCap(E.low, 0xC4), fog: ctsCap(E.fog, 0xC4), fogD: ctLite() ? E.fogD * 1.15 : E.fogD, sun: Math.min(0.75, E.sun), sunCol: E.sunCol || 0xFFF2DC, sunDir: [0.4, 0.75, 0.35], hemi: Math.min(0.6, E.hemi), hemiCol: E.hemiCol || 0xCFDCEA, hemiGround: E.hemiGround || 0x40382C, stars: E.stars || 0 }; },
function () {
var W = WORLDS.ctale;
W.gravity = CTS.th && CTS.th.grav || undefined;
CTS.on = true;
CTS.prog = ctsProg(CTS.T.id);
CTS.t = 0;
CTS.bt = 0;
CT.g = CTS.root;
CT.host = "world:ctale";
ctsTalkers();
camera.position.set(W.base, CTS.y0 + 1.72, 22);
yaw = (CTS.fa !== undefined ? CTS.fa + Math.PI : 0);
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
var n = CTS.W.ch.length, pr = Math.min(CTS.prog, n);
worldCard(ctTitle("📖 " + ctE(CTS.T.t)) + "<div style='opacity:.8;font-size:12px'>" + ctE(CTS.T.by) + "</div><div style='margin:8px 0'>" + ctE(CTS.W.intro || "You step into the book.") + "</div>" +
"<div style='font-size:12.5px;opacity:.9'>" + n + " chapters stand along the path. Walk to each one and press E at its lectern to play it. The soft light shows the next one. " +
(pr > 0 && pr < n ? "You have played " + pr + " so far: carry on from Chapter " + (pr + 1) + "." : "") + (pr >= n ? "You have played it all: walk it again, or play any chapter." : "") + " Press Back for the map and the way out.</div>" + worldBtn("go", "Begin ▸", null), { go: function () { worldCard(null); } });
},
function (dt) {
if (!CTS.on || !CTS.root)
return;
CTS.t += dt;
CTS.bt -= dt;
var L = ctMe(), n = CTS.W.ch.length;
CTS.places.forEach(function (p) { var d = Math.hypot(L.x - p.x, L.z - p.z); if (d < 130 && !p.pg)
ctsPeople(p, true);
else if (d > 210 && p.pg)
ctsPeople(p, false); });
var nx = CTS.places[Math.min(CTS.prog, n - 1)];
if (CTS.beam) {
var bd = nx ? Math.hypot(L.x - nx.x, L.z - nx.z) : 0;
CTS.beam.visible = CTS.prog < n && !CT.run && bd > 18;
if (nx) {
CTS.beam.position.set(nx.x, nx.y, nx.z);
CTS.beamM.opacity = 0.22 * Math.min(1, (bd - 18) / 40);
}
}
if (CTS.bt <= 0) {
CTS.bt = 0.5;
if (CT.run)
worldBanner(null);
else if (CTS.prog >= n)
worldBanner("📖 <b>" + ctE(CTS.T.t) + "</b> · the whole story played ✓ · Back for the map");
else {
var d = Math.hypot(nx.x - L.x, nx.z - L.z), rel = Math.atan2(-(nx.x - L.x), -(nx.z - L.z)) - yaw;
rel = Math.atan2(Math.sin(rel), Math.cos(rel));
var dir = Math.abs(rel) < 0.5 ? "ahead" : Math.abs(rel) > 2.5 ? "behind you" : (rel > 0 ? "to your left" : "to your right");
worldBanner("📖 <b>" + ctE(CTS.T.t) + "</b> · Chapter " + (CTS.prog + 1) + " of " + n + ": " + ctE(nx.C[0]) + (d > 8 ? " · " + Math.round(d) + " m " + dir : " · press E at the lectern"));
}
}
CTS.talkFixed.forEach(function (t) { if (t.chap !== undefined) {
var k = t.chap;
t.verb = k < CTS.prog ? "play it again" : k === CTS.prog ? "play this chapter" : "see what's here";
} });
ctWorldTalkers(dt);
},
function (k) {
var T = CTS.T, p = CTS.places[k];
if (!p)
return;
var C = p.C, n = CTS.W.ch.length, steps = ctsSteps(T, C);
var top = ctTitle("📖 Chapter " + (k + 1) + " of " + n + ": " + ctE(C[0])) + "<div style='opacity:.7;font-size:11px;margin-bottom:6px'>" + ctE(T.t) + "</div>";
if (k > CTS.prog) {
worldCard(top + "<div>" + ctE(C[1]) + "</div><div style='margin-top:8px;color:#E8C8A0'>This chapter comes later in the story. Chapter " + (CTS.prog + 1) + ", <b>" + ctE(CTS.W.ch[CTS.prog][0]) + "</b>, is next: follow the soft light.</div>", {});
return;
}
var who = (C[4] || []).map(function (i) { return T.who[i] && T.who[i].n; }).filter(Boolean);
var h = top + "<div>" + ctE(C[1]) + "</div>" + (who.length ? "<div style='margin-top:6px;font-size:12px;opacity:.8'>Here: " + ctE(who.join(", ")) + " (press E by anyone to talk).</div>" : "");
h += worldBtn("go", steps.length ? "▶ Play the chapter" : "Read on ▸", steps.length ? (steps.length + " part" + (steps.length > 1 ? "s" : "")) : null);
worldCard(h, { go: function () {
if (!steps.length) {
ctsChapterDone(k);
return;
}
CT.feet0 = p.y;
CT.run = { T: T, i: 0, t0: Date.now(), R: ctRand(Date.now() >>> 0), st: null, c: { x: p.x, z: p.z }, steps: steps, ch: k, end: function () { ctsChapterDone(k); } };
ctTone(523, 0.12);
ctStep();
} });
},
function (k) {
var T = CTS.T, n = CTS.W.ch.length, fresh = k === CTS.prog;
ctClearProps();
if (fresh) {
CTS.prog = k + 1;
ctsSetProg(T.id, CTS.prog);
}
if (fresh && k === n - 1) {
if (!CT.run)
CT.run = { T: T, i: 0, R: ctRand(Date.now() >>> 0), st: null, c: { x: CTS.places[k].x, z: CTS.places[k].z } };
CT.run.steps = null;
CT.run.end = null;
ctLesson();
return;
}
CT.run = null;
ctTone(659, 0.14);
setTimeout(function () { ctTone(784, 0.16); }, 140);
var nx = CTS.W.ch[k + 1];
worldCard(ctTitle("✓ Chapter " + (k + 1) + ": " + ctE(CTS.W.ch[k][0])) + (nx ? "<div style='margin:8px 0'>Next, <b>Chapter " + (k + 2) + ": " + ctE(nx[0]) + "</b>. Follow the path and the soft light.</div>" : "<div style='margin:8px 0'>That's the end of the book.</div>") + worldBtn("ok", "Go on ▸", null), { ok: function () { worldCard(null); } });
},
function (line, first) {
worldCard(ctTitle("🎉 The end: " + ctE(CTS.T.t)) + "<div style='margin:8px 0'>You played the whole story, from the first chapter to the last. " + line + "</div>" +
worldBtn("stay", "Stay and explore", null) + worldBtn("out", "Close the book (leave)", null), { stay: function () { worldCard(null); }, out: function () { ctsLeave(); } });
},
function () {
var T = CTS.T, n = CTS.W.ch.length, fns = {}, h = ctTitle("📖 " + ctE(T.t)) + "<div style='opacity:.8;font-size:12px;margin-bottom:6px'>" + ctE(T.by) + " · " + Math.min(CTS.prog, n) + " of " + n + " chapters played</div>";
CTS.W.ch.forEach(function (C, k) {
var can = k <= CTS.prog;
h += "<div style='display:flex;justify-content:space-between;align-items:center;font-size:12.5px;margin:3px 0'><span>" + (k < CTS.prog ? "✅" : k === CTS.prog ? "➡️" : "·") + " " + (k + 1) + ". " + ctE(C[0]) + "</span>" + (can ? "<span data-w='t" + k + "' role='button' tabindex='0' style='padding:2px 8px;border:1px solid rgba(143,180,232,.5);border-radius:4px'>Go</span>" : "") + "</div>";
if (can)
fns["t" + k] = function () { var p = CTS.places[k], c = Math.cos(p.face), s = Math.sin(p.face), x = p.x + s * 7, z = p.z + c * 7; worldCard(null); camera.position.set(WORLDS.ctale.base + x, ctsGround(x, z) + 1.72, z); yaw = p.face; pitch = 0; };
});
h += worldBtn("out", "🚪 Close the book (leave the story world)", "Back to the board you came from. Your place in the story is kept.");
fns.out = function () { ctsLeave(); };
worldCard(h, fns);
},
function (id) {
var out = [];
CT_TALES.forEach(function (T) {
if (id && T.id !== id)
return;
T.who.forEach(function (W, i) { if (!W.c || !W.o || !W.o.look)
return; out.push({ T: T, W: W, i: i, key: "tale_" + T.id + "_" + i, name: W.n, price: W.c }); });
});
if (typeof CT_RETIRED !== "undefined")
CT_RETIRED.forEach(function (T) {
if (id && T.id !== id)
return;
T.who.forEach(function (W, i) { if (!W.c || !W.o || !W.o.look)
return; var C = { T: T, W: W, i: i, key: "tale_" + T.id + "_" + i, name: W.n, price: W.c }; if (ctCosOwned(C) && !ctKeeper())
out.push(C); });
});
return out;
},
function (C) {
var d = dreamer(), L = meLook();
if (!d.ctCos) {
var prev = {};
CT_LOOK_KEYS.forEach(function (k) { prev[k] = L[k] === undefined ? null : L[k]; });
d.ctPrev = prev;
}
CT_CLEAR.forEach(function (k) { L[k] = null; });
var o = C.W.o.look;
CT_LOOK_KEYS.forEach(function (k) { if (o[k] !== undefined)
L[k] = o[k]; });
d.ctCos = C.key;
L.src = L.src || {};
CT_LOOK_KEYS.forEach(function (k) { if (L[k] != null)
L.src[k] = "chosen"; });
rebuildMe();
try {
save();
}
catch (e) { }
ctSay("👗 You're wearing <b>" + ctE(C.name) + "</b>'s costume, from " + ctE(C.T.t) + ". Take it off from the Wardrobe or the story's board.");
},
function (C, after) {
if (!ctSigned()) {
ctSay("Sign in and join Somnucor to buy costumes.");
return;
}
var go = function (rows) {
var it = (rows || []).filter(function (r) { return r.archetype === C.key; })[0];
if (!it) {
ctSay("📖 Storybook costumes come to the shop with the next update. They're on their way.");
return;
}
Promise.resolve(buyItem(it.id, null)).then(function () { if (after)
setTimeout(after, 600); });
};
if (typeof TAILOR !== "undefined" && TAILOR && TAILOR.some(function (r) { return r.archetype === C.key; }))
go(TAILOR);
else if (typeof catalogueRows === "function")
catalogueRows().then(go).catch(function () { go([]); });
},
function (id, sure) {
var list = ctCostumesOf(id), worn = ctCosWorn(), fns = {}, by = {};
var h = ctTitle("👗 " + (id ? "Costumes from " + ctE(CT_BY_ID[id].t) : "Storybook costumes")) +
"<div style='opacity:.8;font-size:12px;margin-bottom:6px'>Dressed as the original books describe them. Bought once, yours for good. Wearing one keeps your own face and body.</div>";
if (worn) {
h += worldBtn("off", "Take off the costume you're wearing", null);
fns.off = function () { ctCosOff(); ctCostumeCard(id); };
}
list.forEach(function (C) { (by[C.T.id] = by[C.T.id] || []).push(C); });
Object.keys(by).forEach(function (tid) {
if (!id)
h += ctHead(ctE(CT_BY_ID[tid].t));
by[tid].forEach(function (C) {
var own = ctCosOwned(C), k = C.key, isW = worn === k;
h += "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px;margin:4px 0;font-size:12.5px'><span><b>" + ctE(C.name) + "</b>" + (own ? " <span style='opacity:.6'>· yours</span>" : " <span style='opacity:.7'>· " + Number(C.price).toLocaleString() + " gold</span>") + "</span>";
if (isW)
h += "<span style='opacity:.7'>wearing</span>";
else if (own) {
h += "<span data-w='w_" + k + "' role='button' tabindex='0' style='padding:3px 10px;border:1px solid rgba(143,232,160,.6);border-radius:4px'>Wear</span>";
fns["w_" + k] = function () { ctCosWear(C); ctCostumeCard(id); };
}
else {
var conf = sure === k;
h += "<span data-w='b_" + k + "' role='button' tabindex='0' style='padding:3px 10px;border:1px solid rgba(232,200,120,.7);border-radius:4px'>" + (conf ? "Tap to confirm: " + Number(C.price).toLocaleString() + " gold" : "Buy") + "</span>";
fns["b_" + k] = function () { if (!conf)
return ctCostumeCard(id, k); ctCosBuy(C, function () { ctCostumeCard(id); }); };
}
h += "</div>";
});
});
if (id) {
h += worldBtn("back", "◂ Back to the story", null);
fns.back = function () { ctBoard(id); };
}
worldCard(h, fns);
},
function (g, o) {
var k = (o.h || 1.8) / 1.8, f = new THREE.Group(), c = o.col || 0x8A8A88, sk = o.skin || c, lg = o.leg || c, y0 = 0;
if (o.base) {
ctAdd(g, ctBox(1.3 * k, 0.9 * k, 1.3 * k), o.base, 0, 0.45 * k, 0);
y0 = 0.9 * k;
}
f.position.y = y0;
f.scale.setScalar(k);
g.add(f);
[-0.12, 0.12].forEach(function (x) { ctAdd(f, ctCyl(0.08, 0.095, 0.86, 8), lg, x, 0.43, 0); });
ctAdd(f, ctCyl(0.21, 0.16, 0.68, 10), c, 0, 1.2, 0);
if (o.skirt)
ctAdd(f, ctCone(0.46, 1.0, 12), o.skirt, 0, 0.62, 0);
var ar = o.arms === "up" ? 2.7 : (o.arms === "out" ? 1.45 : (o.arms === "fwd" ? 0.9 : 0.14));
[-1, 1].forEach(function (sd) { var a = new THREE.Group(); a.position.set(sd * 0.26, 1.48, 0); a.rotation.z = sd * ar; if (o.arms === "fwd")
a.rotation.x = -1.2; f.add(a); ctAdd(a, ctCyl(0.055, 0.065, 0.64, 7), c, 0, -0.31, 0); });
ctAdd(f, ctSph(0.14, 12), sk, 0, 1.69, 0);
if (o.hat)
ctAdd(f, ctCyl(0.13, 0.15, o.tall ? 0.34 : 0.16, 12), o.hat, 0, o.tall ? 1.97 : 1.86, 0);
if (o.cape)
ctAdd(f, ctBox(0.5, 1.1, 0.05), o.cape, 0, 1.0, -0.2, 0.12, 0, 0);
if (o.lyre) {
var l = ctAdd(f, ctTor(0.2, 0.025), 0xC8A040, 0.3, 1.25, 0.25);
l.scale.y = 1.4;
}
if (o.spear)
ctAdd(f, ctCyl(0.025, 0.025, 2.6, 5), 0x6A5030, 0.34, 1.3, 0.12);
return { r: (o.base ? 1 : 0.6) * k, s: [{ x: 0, z: 0, r: (o.base ? 0.7 : 0.35) * k, h: 2.2 * k }] };
},
function (g, o) {
var L = o.L || 2.2, H = o.H || 1.2, c = o.col || 0x7A5A3A, br = o.br || H * 0.34, lt = o.lt || br * 0.26, nh = o.heads || 1;
var b = ctAdd(g, ctSph(1, 14), c, 0, H, 0);
b.scale.set(br, br * (o.deep || 1), L / 2);
if (o.hump)
ctAdd(g, ctSph(br * 0.62, 10), c, 0, H + br * 0.78, -L * 0.06);
if (o.plates)
for (var p = 0; p < 7; p++)
ctAdd(g, ctCone(br * 0.32, br * 0.7, 4), o.plates, 0, H + br * 0.95, -L * 0.36 + p * L * 0.12, 0, 0.78, 0);
[[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(function (q) { ctAdd(g, ctCyl(lt, lt * 0.82, H, 8), o.legc || c, q[0] * br * 0.58, H / 2, q[1] * L * 0.32); });
var nl = o.neck === undefined ? 0.55 : o.neck, hs = o.head || br * 0.6;
for (var i = 0; i < nh; i++) {
var hx = (i - (nh - 1) / 2) * hs * 1.5, y1 = H + br * 0.25, z1 = L * 0.4, hy = H + br * 0.25 + nl * H * 0.75, hz = L / 2 + hs * 0.55, dy = hy - y1, dz = hz - z1, ln = Math.hypot(dy, dz);
if (nl > 0.05)
ctAdd(g, ctCyl(hs * 0.32, hs * 0.42, ln, 8), c, hx, (y1 + hy) / 2, (z1 + hz) / 2, Math.atan2(dz, dy), 0, 0);
if (o.mane)
ctAdd(g, ctBox(hs * 0.18, ln * 0.9, hs * 0.5), o.mane, hx, (y1 + hy) / 2 + hs * 0.12, (z1 + hz) / 2 - hs * 0.15, Math.atan2(dz, dy), 0, 0);
var hd = ctAdd(g, ctBox(hs * 0.8, hs * 0.8, hs * (o.snout || 1.5)), o.headc || c, hx, hy, hz + hs * 0.35);
if (o.horns)
[-1, 1].forEach(function (sd) { ctAdd(g, ctCone(hs * 0.12, hs * (o.hornL || 0.8), 6), o.horns, hx + sd * hs * 0.32, hy + hs * 0.6, hz, 0, 0, -sd * 0.5); });
if (o.antlers)
[-1, 1].forEach(function (sd) { ctAdd(g, ctCyl(0.04, 0.06, hs * 1.6, 5), o.antlers, hx + sd * hs * 0.45, hy + hs * 1.0, hz - hs * 0.1, 0, 0, -sd * 0.6); ctAdd(g, ctCyl(0.03, 0.05, hs * 0.8, 5), o.antlers, hx + sd * hs * 0.75, hy + hs * 1.5, hz + hs * 0.1, 0.6, 0, -sd * 0.2); });
if (o.ears)
[-1, 1].forEach(function (sd) { ctAdd(g, ctCone(hs * 0.14, hs * 0.4, 5), c, hx + sd * hs * 0.28, hy + hs * 0.55, hz - hs * 0.1); });
if (o.bigears)
[-1, 1].forEach(function (sd) { ctAdd(g, ctBox(0.08, hs * 1.1, hs * 0.9), c, hx + sd * hs * 0.55, hy, hz - hs * 0.3, 0, sd * 0.4, 0); });
if (o.trunk)
ctAdd(g, ctCyl(hs * 0.1, hs * 0.2, hs * 1.8, 8), c, hx, hy - hs * 0.8, hz + hs * 1.1, 0.25, 0, 0);
if (o.tusks)
[-1, 1].forEach(function (sd) { var t = ctAdd(g, ctCone(hs * 0.08, hs * (o.tusks > 1 ? 2.2 : 1.1), 6), 0xD8D0B8, hx + sd * hs * 0.3, hy - hs * 0.5, hz + hs * 0.8, 1.9, 0, 0); });
if (o.eyes)
[-1, 1].forEach(function (sd) { ctAdd(g, ctSph(hs * 0.09, 6), o.eyes, hx + sd * hs * 0.3, hy + hs * 0.15, hz + hs * 1.05, 0, 0, 0, 1); });
}
if (o.wings)
[-1, 1].forEach(function (sd) { ctAdd(g, ctBox(L * 0.9, 0.08, L * 0.42), o.wings, sd * (br + L * 0.4), H + br * 0.6, 0, 0, 0, sd * 0.45); });
if (o.tail !== false)
ctAdd(g, ctCyl(lt * 0.35, lt * 0.6, L * (o.tailL || 0.35), 6), o.tailc || c, 0, H + br * 0.2, -L / 2 - L * 0.12, -(o.tailUp || 0.9), 0, 0);
if (o.saddle)
ctAdd(g, ctBox(br * 1.6, 0.12, L * 0.28), o.saddle, 0, H + br * 0.95, 0);
var R = Math.max(br, L * 0.42);
return { r: R + 0.6, s: [{ x: 0, z: 0, r: R, h: H + br + hs }] };
},
function (g, o) {
var w = o.w || 8, d = o.d || 7, h = o.h || 4.5, c = o.col || 0xD8CCB0, rf = o.roof || 0x7A4A2A, s = [], rk = o.rk || "gable";
if (o.round) {
ctAdd(g, ctCyl(w / 2, w / 2, h, 18), c, 0, h / 2, 0);
if (rk === "dome")
ctAdd(g, new THREE.SphereGeometry(w / 2 * 1.04, 18, 9, 0, Math.PI * 2, 0, Math.PI / 2), rf, 0, h, 0);
else
ctAdd(g, ctCone(w / 2 * 1.18, h * 0.95, 18), rf, 0, h + h * 0.47, 0);
ctAdd(g, ctBox(1.2, 2.1, 0.2), o.door || 0x4A3020, 0, 1.05, w / 2 - 0.02);
[0.9, -0.9].forEach(function (a) { ctAdd(g, ctBox(0.8, 0.9, 0.1), o.win || 0xA88850, Math.sin(a) * w / 2 * 1.01, h * 0.55, Math.cos(a) * w / 2 * 1.01, 0, a, 0, 1); });
ctsRound(s, 0, 0, w / 2, h + 2);
return { r: w / 2 + 2, s: s };
}
ctAdd(g, ctBox(w, h, d), c, 0, h / 2, 0);
if (rk === "flat")
ctAdd(g, ctBox(w + 0.4, 0.5, d + 0.4), rf, 0, h + 0.25, 0);
else if (rk === "dome")
ctAdd(g, new THREE.SphereGeometry(Math.min(w, d) * 0.48, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), rf, 0, h, 0);
else if (rk === "cone")
ctAdd(g, ctCone(Math.max(w, d) * 0.75, h * 0.9, 4), rf, 0, h + h * 0.45, 0, 0, Math.PI / 4, 0);
else {
var R = ctsRoof(g, w + 0.8, d + 0.8, o.rh || h * 0.7, rf, h);
if (o.snow)
ctsRoof(g, w + 0.9, d + 0.9, (o.rh || h * 0.7) * 0.4, 0xE8EEF4, h + (o.rh || h * 0.7) * 0.6);
}
ctAdd(g, ctBox(1.2, 2.2, 0.12), o.door || 0x4A3020, 0, 1.1, d / 2 + 0.02);
ctsWindows(g, w * 0.8, h * 0.55, d / 2 + 0.03, Math.max(2, Math.round(w / 3)), o.win || 0xA88850);
if (o.storey)
ctsWindows(g, w * 0.8, h * 0.82, d / 2 + 0.03, Math.max(2, Math.round(w / 3)), o.win || 0xA88850);
if (o.chim)
ctAdd(g, ctBox(0.8, 2.4, 0.8), 0x7A5A4A, w * 0.28, h + 1.8, -d * 0.2);
ctsBox(s, 0, 0, w / 2 + 0.2, d / 2 + 0.2, h + 2);
return { r: Math.max(w, d) / 2 + 2, s: s };
},
function (g, o) {
var R = ctRand(ctHash("city" + (o.seed || 1))), c = o.col || 0x8A8A80, rf = o.roof || 0x4A4A5A, n = o.n || 16, rad = o.R || 60, hm = o.hmax || 80, s = [];
for (var i = 0; i < n; i++) {
var a = R() * 6.283, r = i ? Math.sqrt(R()) * rad : 0, x = Math.sin(a) * r, z = Math.cos(a) * r, h = (i ? hm * (0.3 + 0.6 * R()) : hm) * (1 - r / rad * 0.45), w = 5 + R() * 7, cc = o.cols ? o.cols[i % o.cols.length] : c;
if (o.round || R() < 0.55) {
ctAdd(g, ctCyl(w * 0.42, w * 0.5, h, 12), cc, x, h / 2, z);
if (o.dome && R() < 0.5)
ctAdd(g, ctSph(w * 0.5, 12), rf, x, h, z);
else
ctAdd(g, ctCone(w * 0.55, h * (o.spire || 0.35), 12), rf, x, h + h * (o.spire || 0.35) / 2, z);
}
else {
ctAdd(g, ctBox(w, h, w), cc, x, h / 2, z);
ctAdd(g, ctCone(w * 0.75, h * 0.25, 4), rf, x, h + h * 0.125, z, 0, Math.PI / 4, 0);
}
if (o.win)
for (var k = 0; k < 3; k++)
ctAdd(g, ctBox(1, 1.4, 0.1), o.win, x, h * (0.35 + k * 0.18), z + w * 0.5 + 0.05, 0, 0, 0, 1);
}
if (o.wall !== false) {
ctAdd(g, new THREE.CylinderGeometry(rad + 10, rad + 10, o.wallH || 14, 40, 1, true), o.wallC || c, 0, (o.wallH || 14) / 2, 0);
for (var j = 0; j < 10; j++) {
var b = j / 10 * 6.283;
ctAdd(g, ctCyl(4, 4.5, (o.wallH || 14) + 6, 10), o.wallC || c, Math.sin(b) * (rad + 10), ((o.wallH || 14) + 6) / 2, Math.cos(b) * (rad + 10));
}
}
ctsRound(s, 0, 0, rad + 12, hm);
return { r: rad + 14, s: s };
},
function (g, o) {
var r = o.r || 120, h = o.h || 160, c = o.col || 0x6A6A70, n = o.n || 9;
ctAdd(g, ctCone(r, h, n), c, 0, h / 2, 0);
if (o.snow !== false)
ctAdd(g, ctCone(r * 0.37, h * 0.34, n), o.snow || 0xE8EEF4, 0, h * 0.83 + 0.3, 0);
if (o.glow)
ctAdd(g, ctCyl(r * 0.16, r * 0.16, 1, 12), o.glow, 0, h - 0.4, 0, 0, 0, 0, 1);
return { r: r, s: [{ x: 0, z: 0, r: r * 0.85, h: h }] };
},
function (g, o) {
var h = o.h || 20, tc = o.trunk || 0x5A4028, cc = o.crown || 0x3E7A2E, k = o.kind || "oak", tr = o.tr || h * 0.06, s = [];
if (k === "dead" || k === "blasted") {
ctAdd(g, ctCyl(tr * 0.45, tr, h * 0.62, 9), tc, 0, h * 0.31, 0);
for (var i = 0; i < 6; i++) {
var a = i * 1.05, l = h * (0.3 + 0.08 * (i % 3));
ctAdd(g, ctCyl(tr * 0.12, tr * 0.3, l, 6), tc, Math.sin(a) * l * 0.35, h * 0.5 + i * h * 0.04, Math.cos(a) * l * 0.35, Math.cos(a) * 0.9, 0, -Math.sin(a) * 0.9);
}
if (k === "blasted") {
ctAdd(g, ctCyl(tr * 0.2, tr * 0.5, h * 0.4, 7), 0x1E1A18, tr * 0.3, h * 0.75, 0, 0, 0, -0.35);
ctAdd(g, ctCyl(tr * 0.2, tr * 0.5, h * 0.36, 7), 0x1E1A18, -tr * 0.3, h * 0.72, 0, 0, 0, 0.4);
}
}
else if (k === "cedar") {
ctAdd(g, ctCyl(tr * 0.5, tr, h, 9), tc, 0, h / 2, 0);
for (var j = 0; j < 5; j++) {
var w = h * (0.42 - j * 0.06);
ctAdd(g, ctCyl(w * 0.8, w, h * 0.07, 11), cc, 0, h * (0.35 + j * 0.14), 0);
}
}
else if (k === "willow") {
ctAdd(g, ctCyl(tr * 0.6, tr, h * 0.55, 9), tc, 0, h * 0.27, 0);
var cr = ctAdd(g, ctSph(h * 0.32, 12), cc, 0, h * 0.62, 0);
cr.scale.y = 0.7;
for (var m = 0; m < 10; m++) {
var b = m * 0.628;
ctAdd(g, ctCone(h * 0.08, h * 0.5, 6), cc, Math.sin(b) * h * 0.28, h * 0.36, Math.cos(b) * h * 0.28, Math.PI, 0, 0);
}
}
else if (k === "world") {
ctAdd(g, ctCyl(tr * 0.7, tr * 1.4, h * 0.6, 12), tc, 0, h * 0.3, 0);
for (var q = 0; q < 6; q++) {
var c2 = q * 1.047;
ctAdd(g, ctCyl(tr * 0.15, tr * 0.4, h * 0.35, 7), tc, Math.sin(c2) * tr * 1.6, h * 0.04, Math.cos(c2) * tr * 1.6, Math.cos(c2) * 1.2, 0, -Math.sin(c2) * 1.2);
}
for (var u = 0; u < 9; u++) {
var e = u * 0.7, rr = u ? h * 0.22 : 0;
var ic = ctAdd(g, new THREE.IcosahedronGeometry(h * (u ? 0.17 : 0.24), 1), u % 2 ? cc : (o.crown2 || cc), Math.sin(e) * rr, h * (0.72 + (u % 3) * 0.06), Math.cos(e) * rr);
ic.scale.y = 0.7;
}
}
else {
ctAdd(g, ctCyl(tr * 0.6, tr, h * 0.5, 9), tc, 0, h * 0.25, 0);
for (var v = 0; v < 5; v++) {
var f = v * 1.26, r2 = v ? h * 0.16 : 0;
ctAdd(g, new THREE.IcosahedronGeometry(h * (v ? 0.17 : 0.22), 1), cc, Math.sin(f) * r2, h * (0.6 + (v % 2) * 0.08), Math.cos(f) * r2);
}
if (o.fruit)
for (var z = 0; z < 14; z++) {
var fa = z * 0.9, fr = h * 0.24;
ctAdd(g, ctSph(h * 0.02 + 0.12, 7), o.fruit, Math.sin(fa) * fr, h * (0.52 + (z % 4) * 0.06), Math.cos(fa) * fr);
}
}
ctsRound(s, 0, 0, tr * 1.1, h);
return { r: Math.max(h * 0.3, 4), s: s };
},
function (g, o) {
var L = o.L || 8, c = o.col || 0x6A4A2E, k = o.kind || "row", w = o.W || L * 0.26, hh = o.hh || L * 0.1, s = [];
ctAdd(g, ctBox(w, hh, L * 0.72), c, 0, hh / 2, 0);
[1, -1].forEach(function (sd) { var p = ctAdd(g, ctCone(w * 0.5, L * 0.2, 4), c, 0, hh / 2, sd * L * 0.46, sd * Math.PI / 2, 0, Math.PI / 4); p.scale.set(1, 1, hh / w * 1.3); });
if (k === "long") {
ctAdd(g, ctCyl(0.14, 0.2, L * 0.28, 6), c, 0, hh + L * 0.1, L * 0.52, 0.35, 0, 0);
ctAdd(g, ctBox(0.4, 0.5, 0.9), o.head || c, 0, hh + L * 0.24, L * 0.58);
for (var i = 0; i < 8; i++)
[-1, 1].forEach(function (sd) { ctAdd(g, ctCyl(0.45, 0.45, 0.08, 12), [0xB83A2A, 0xD8B048, 0x3A5A9A][i % 3], sd * (w / 2 + 0.05), hh * 0.9, -L * 0.3 + i * L * 0.085, 0, 0, Math.PI / 2); });
}
if (k === "reed") {
[1, -1].forEach(function (sd) { ctAdd(g, ctCone(w * 0.3, L * 0.25, 7), 0xC8A858, 0, hh + L * 0.08, sd * L * 0.42, sd * -0.9, 0, 0); });
}
if (k === "gondola") {
ctAdd(g, ctBox(0.12, L * 0.16, 0.5), 0x8A8A8A, 0, hh + L * 0.08, L * 0.5);
}
if (o.mast !== false && (k === "long" || k === "felucca" || k === "raft" || o.mast)) {
var mh = o.mh || L * 0.7;
ctAdd(g, ctCyl(0.1, 0.14, mh, 6), 0x4A3424, 0, hh + mh / 2, 0);
if (k === "felucca") {
var sl = ctAdd(g, ctCone(L * 0.3, mh * 0.95, 3), o.sail || 0xE0D8C4, 0, hh + mh * 0.55, 0.2, 0, 0, 0.25);
sl.scale.z = 0.05;
}
else {
var sc = o.sail || 0xE0D8C4;
for (var j = 0; j < 4; j++)
ctAdd(g, ctBox(L * 0.5, mh * 0.16, 0.06), (o.stripe && j % 2) ? o.stripe : sc, 0, hh + mh * 0.42 + j * mh * 0.16, 0.25);
}
}
if (k === "raft")
for (var r = 0; r < 6; r++)
ctAdd(g, ctCyl(0.22, 0.22, L * 0.8, 7), 0x8A6A44, -w / 2 + r * w / 5, hh + 0.05, 0, Math.PI / 2, 0, 0);
ctsBox(s, 0, 0, w / 2 + 0.3, L * 0.5, hh + 2);
return { r: L * 0.6, s: s };
},
function (g, o) {
var c = o.col || 0xB82A2A;
ctAdd(g, ctBox(2.4, 3.4, 0.14), 0xE8E2D4, 0, 2.9, 0);
ctAdd(g, ctBox(2.48, 3.48, 0.1), c, 0, 2.9, -0.03);
var pp = ctAdd(g, new THREE.OctahedronGeometry(0.5, 0), c, 0, 2.9, 0.09);
pp.scale.set(o.round ? 1 : 0.8, 1.1, 0.15);
if (o.round)
ctAdd(g, ctSph(0.32, 10), c, 0, 3.2, 0.09).scale.z = 0.2;
[[-0.85, 4.2], [0.85, 1.6], [-0.85, 1.6], [0.85, 4.2]].forEach(function (q) { var m = ctAdd(g, new THREE.OctahedronGeometry(0.18, 0), c, q[0], q[1], 0.08); m.scale.z = 0.2; });
ctAdd(g, ctSph(0.34, 12), 0xE8C8A8, 0, 4.95, 0);
ctAdd(g, ctBox(0.7, 0.25, 0.6), o.hair || 0x3A2A1A, 0, 5.22, -0.05);
[-0.45, 0.45].forEach(function (x) { ctAdd(g, ctCyl(0.08, 0.09, 1.2, 7), c, x, 0.6, 0); });
[-1, 1].forEach(function (sd) { ctAdd(g, ctCyl(0.07, 0.07, 1.4, 6), c, sd * 1.4, 3.3, 0, 0, 0, sd * 0.5); });
if (o.spear !== false) {
ctAdd(g, ctCyl(0.04, 0.04, 5.4, 6), 0x6A5030, 1.72, 2.9, 0.1);
ctAdd(g, ctCone(0.18, 0.6, 4), 0x9A9AA0, 1.72, 5.9, 0.1);
}
return { r: 1.6, s: [{ x: 0, z: 0, hw: 1.3, hd: 0.3, h: 5.4, rot: 0 }] };
},
function (g, o) {
var c = o.col || 0x4A8AD8;
var b = ctAdd(g, ctSph(2, 16), c, 0, 2, 0);
b.scale.y = 0.85;
ctAdd(g, ctCyl(1.1, 1.4, 0.5, 16), c, 0, 3.6, 0);
ctAdd(g, ctSph(0.35, 10), 0xD8B048, 0, 4.05, 0);
ctAdd(g, ctCyl(0.22, 0.4, 2.4, 10), c, 2.4, 2.4, 0, 0, 0, -0.9);
var h = ctAdd(g, ctTor(0.9, 0.2), c, -2, 2.1, 0);
h.rotation.set(0, 0, 0);
ctAdd(g, ctCyl(1.4, 1.2, 0.3, 16), c, 0, 0.15, 0);
if (o.dots)
for (var i = 0; i < 8; i++) {
var a = i * 0.785;
ctAdd(g, ctSph(0.28, 8), o.dots, Math.sin(a) * 1.96, 2 + ((i % 2) * 0.6 - 0.3), Math.cos(a) * 1.96).scale.set(1, 1, 0.3);
}
return { r: 3, s: [{ x: 0, z: 0, r: 2.1, h: 4 }] };
},
function (g, o) {
var w = new THREE.Group();
w.position.y = 3.6;
g.add(w);
ctAdd(w, ctCyl(3, 3, 0.5, 28), 0xC8A040, 0, 0, 0, Math.PI / 2);
ctAdd(w, ctCyl(2.7, 2.7, 0.52, 28), 0xE8DCC0, 0, 0, 0.02, Math.PI / 2);
for (var i = 0; i < 12; i++) {
var a = i * 0.5236;
ctAdd(w, ctBox(0.12, 0.4, 0.05), 0x2A2A2A, Math.sin(a) * 2.3, Math.cos(a) * 2.3, 0.29, 0, 0, -a);
}
ctAdd(w, ctBox(0.12, 1.8, 0.05), 0x2A2A2A, 0.4, 0.8, 0.31, 0, 0, -0.45);
ctAdd(w, ctBox(0.14, 1.3, 0.05), 0x2A2A2A, -0.5, 0.3, 0.32, 0, 0, 1.0);
ctAdd(w, ctCyl(0.35, 0.35, 0.7, 10), 0xC8A040, 0, 3.2, 0);
ctAdd(w, ctTor(0.5, 0.12), 0xC8A040, 0, 3.8, 0);
ctAdd(g, ctBox(1.6, 0.6, 1.2), 0xC8A040, 0, 0.3, 0);
return { r: 3.4, s: [{ x: 0, z: 0, hw: 3, hd: 0.6, h: 7, rot: 0 }] };
},
function (g, o) {
var y = o.y || 3, c = new THREE.Group();
c.position.y = y;
c.rotation.z = 0.04;
g.add(c);
ctAdd(c, ctBox(4, 0.08, 6), o.col || 0xA82A2A, 0, 0, 0);
ctAdd(c, ctBox(3.2, 0.09, 5.2), 0xD8B048, 0, 0, 0);
ctAdd(c, ctBox(2.4, 0.1, 4.4), 0x2A4A8A, 0, 0, 0);
for (var i = 0; i < 8; i++)
ctAdd(c, ctCyl(0.03, 0.03, 0.4, 4), 0xD8B048, -1.8 + i * 0.5, -0.15, 3.05);
return { r: 3.6, s: [] };
},
function (g, o) {
var c = o.col || 0xC8A040;
var b = ctAdd(g, ctSph(1.4, 16), c, 0, 1.4, 0);
b.scale.set(1, 0.55, 1.6);
ctAdd(g, ctCyl(0.15, 0.45, 2.6, 10), c, 0, 1.7, 2.6, 1.25, 0, 0);
ctAdd(g, ctTor(0.6, 0.14), c, 0, 1.6, -2.2, 0, Math.PI / 2, 0);
ctAdd(g, ctCyl(0.5, 0.9, 0.4, 14), c, 0, 2.1, 0);
ctAdd(g, ctSph(0.3, 10), c, 0, 2.45, 0);
ctAdd(g, ctCyl(0.8, 0.6, 0.5, 14), c, 0, 0.25, 0);
return { r: 3, s: [{ x: 0, z: 0, r: 1.8, h: 2.5 }] };
},
function (g, o) {
var c = o.col || 0x1E1A1E, b = new THREE.Group();
b.position.z = -2.5;
g.add(b);
ctAdd(b, ctBox(2, 2, 3), c, 0, 1.9, 0);
ctAdd(b, ctBox(2.1, 0.2, 3.2), 0x3A3A3A, 0, 3, 0);
ctAdd(b, ctBox(1.4, 0.6, 1), c, 0, 1.5, 2.2);
[[-1.1, -1], [1.1, -1], [-1.1, 1.1], [1.1, 1.1]].forEach(function (q) { ctAdd(b, ctCyl(0.6, 0.6, 0.1, 14), 0x3A2A1A, q[0], 0.6, q[1], 0, 0, Math.PI / 2); });
ctAdd(b, ctBox(0.6, 0.7, 0.06), 0xF8D890, 1.02, 2, 0, 0, Math.PI / 2, 0, 1);
var n = o.horses || 2;
for (var i = 0; i < n; i++) {
var h = new THREE.Group();
h.position.set((i % 2 ? 0.7 : -0.7), 0, 1.8 + Math.floor(i / 2) * 2.6);
g.add(h);
CTD_SET.quad(h, { L: 2.2, H: 1.3, col: o.horse || 0x1A1614, neck: 0.7, mane: 0x0A0808, snout: 1.7 });
}
return { r: 5, s: [{ x: 0, z: -1, hw: 1.2, hd: 3.5, h: 3, rot: 0 }] };
},
function (g, o) {
var s = [], n = o.cars || 3, c = o.col || 0x2A3A2A;
ctAdd(g, ctBox(0.15, 0.15, (n + 1) * 9 + 4), 0x3A3A3A, -0.75, 0.1, -(n * 9) / 2);
ctAdd(g, ctBox(0.15, 0.15, (n + 1) * 9 + 4), 0x3A3A3A, 0.75, 0.1, -(n * 9) / 2);
ctAdd(g, ctCyl(1.1, 1.1, 5, 14), c, 0, 2.2, 1, Math.PI / 2, 0, 0);
ctAdd(g, ctBox(2.4, 2.8, 2.4), c, 0, 2.6, -2.4);
ctAdd(g, ctCyl(0.35, 0.5, 1.6, 10), 0x1A1A1A, 0, 3.8, 3);
ctAdd(g, ctCone(1.2, 1.2, 4), 0x8A2A1A, 0, 0.7, 4.2, Math.PI / 2, 0, Math.PI / 4);
[-1.4, 0, 1.4, 2.6].forEach(function (z) { [-1, 1].forEach(function (sd) { ctAdd(g, ctCyl(z < 0 ? 0.7 : 0.5, z < 0 ? 0.7 : 0.5, 0.12, 14), 0x8A2A1A, sd * 1.0, z < 0 ? 0.75 : 0.55, z, 0, 0, Math.PI / 2); }); });
for (var i = 0; i < n; i++) {
var z = -8 - i * 9;
ctAdd(g, ctBox(2.4, 2.6, 8), o.car || 0x6A2A2A, 0, 2, z);
ctAdd(g, ctBox(2.6, 0.2, 8.2), 0x2A2A2A, 0, 3.4, z);
for (var k = 0; k < 4; k++)
[-1, 1].forEach(function (sd) { ctAdd(g, ctBox(0.06, 0.8, 1.2), 0xF8D890, sd * 1.22, 2.3, z - 3 + k * 2, 0, 0, 0, 1); });
ctsBox(s, 0, z, 1.3, 4.1, 3.6);
}
ctsBox(s, 0, 0, 1.3, 4.5, 4);
return { r: 6, s: s };
},
function (g, o) {
var s = [];
ctAdd(g, ctBox(8, 5, 40), o.col || 0x2A2A30, 0, 2.5, 0);
ctAdd(g, ctCone(4, 10, 4), o.col || 0x2A2A30, 0, 2.5, 25, Math.PI / 2, 0, Math.PI / 4).scale.set(1, 1, 0.6);
ctAdd(g, ctBox(8.2, 0.4, 40.2), 0xB83A2A, 0, 0.6, 0);
ctAdd(g, ctBox(6, 3, 18), 0xD8D0C0, 0, 6.5, -2);
[-4, 4].forEach(function (z) { ctAdd(g, ctCyl(1.1, 1.2, 7, 12), 0xB86A2A, 0, 11, z); ctAdd(g, ctCyl(1.15, 1.15, 1, 12), 0x1A1A1A, 0, 14.6, z); });
ctsWindows(g, 16, 6.5, 7.03, 8);
[-1, 1].forEach(function (sd) { ctAdd(g, ctCyl(4, 4, 1.6, 16), 0x5A3A2A, sd * 4.4, 3.5, 0, 0, 0, Math.PI / 2); });
ctAdd(g, ctCyl(0.2, 0.25, 16, 6), 0x4A3424, 0, 13, 14);
ctsBox(s, 0, 0, 4.5, 22, 8);
return { r: 24, s: s };
},
function (g, o) {
ctAdd(g, ctCyl(1.4, 2, 1, 14), 0x6A4A2A, 0, 0.5, 0);
ctAdd(g, ctCyl(0.2, 0.3, 2.4, 8), 0xC8A040, 0, 2, 0);
var gl = ctAdd(g, ctSph(3, 20), 0x3A6AA8, 0, 6, 0);
[[0.4, 0.3, 1.4], [-0.9, -0.2, 1.1], [1.2, -0.6, 0.9], [-0.3, 0.9, 0.8], [0.2, -1.3, 1.0]].forEach(function (p) { var a = Math.atan2(p[0], 1), m = ctAdd(g, ctSph(p[2], 10), 0x5A8A3A, Math.sin(p[0]) * 2.55, 6 + p[1] * 1.8, Math.cos(p[0]) * 2.55 * (p[1] > 0.5 ? 0.7 : 1)); m.scale.set(1, 0.7, 0.5); });
ctAdd(g, ctTor(3.3, 0.12), 0xC8A040, 0, 6, 0, 0, 0, 0.4);
return { r: 3.6, s: [{ x: 0, z: 0, r: 3.1, h: 9 }] };
},
function (g, o) {
var c = o.col || 0x2E8A4A, y = o.y || 16;
var b = ctAdd(g, ctSph(5.5, 18), c, 0, y, 0);
b.scale.y = 1.2;
for (var i = 0; i < 8; i++) {
var a = i * 0.785;
ctAdd(g, ctBox(0.3, 13, 0.1), o.stripe || 0xD8C890, Math.sin(a) * 5.3, y, Math.cos(a) * 5.3, 0, a, 0).scale.set(1, 1, 1);
}
ctAdd(g, ctBox(2.2, 1.3, 2.2), 0x8A6A3A, 0, y - 10, 0);
for (var k = 0; k < 4; k++)
ctAdd(g, ctCyl(0.03, 0.03, 4.4, 4), 0x6A5A3A, (k % 2 ? 1 : -1), y - 8, (k < 2 ? 1 : -1));
ctAdd(g, ctCyl(0.03, 0.03, y - 10, 4), 0x8A7A5A, 0, (y - 10) / 2, 1.2, 0.05, 0, 0);
return { r: 6, s: [{ x: 0, z: 0, r: 1.4, h: 3 }] };
},
function (g, o) {
var c = o.col || 0xB83A2A;
ctAdd(g, ctBox(8, 5, 14), c, 0, 2.5, -1);
var t = ctAdd(g, ctSph(4, 16), c, 0, 2.5, 6);
t.scale.set(1, 0.62, 0.9);
ctAdd(g, ctCyl(4.2, 4.2, 12, 16), c, 0, 9, -4);
ctAdd(g, ctCyl(4.4, 4.4, 1, 16), 0xD8B048, 0, 15, -4);
ctAdd(g, ctCone(5, 4, 16), 0x3A6AA8, 0, 17.5, -4);
for (var i = 0; i < 6; i++)
ctAdd(g, ctCyl(0.1, 0.1, 1.6, 5), 0xE8DCB8, -1.8 + i * 0.7, 12 + (i % 2) * 0.5, 0.3, 0, 0, 0.4);
ctsWindows(g, 6, 3, 6.6, 2);
ctsWindows(g, 6, 8, 0.25, 2);
ctsWindows(g, 6, 12, 0.25, 2);
ctAdd(g, ctBox(1.4, 2.4, 0.1), 0x4A3020, 0, 1.2, 9.6);
ctAdd(g, ctBox(0.15, 10, 0.15), 0x8A6A3A, 4.6, 5, 2, 0, 0, 0.12);
return { r: 9, s: [{ x: 0, z: 0, hw: 4.2, hd: 8, h: 16, rot: 0 }] };
},
function (g, o) {
var m = ctAdd(g, new THREE.TorusGeometry(5, 1.6, 10, 24, Math.PI * 1.25), 0xD8C870, 0, 22, 0, 0, 0, -0.6, 1);
ctAdd(g, ctCyl(0.2, 0.2, 22, 6), 0x6A6A7A, 0, 11, -0.6);
var cw = new THREE.Group();
cw.position.set(-1, 20, 1.5);
cw.rotation.z = 0.4;
g.add(cw);
CTD_SET.quad(cw, { L: 3, H: 1.6, col: 0xE8E0D0, horns: 0xD8D0B0, ears: 1, neck: 0.3 });
ctAdd(cw, ctSph(0.5, 8), 0x3A2A1A, 0.6, 1.9, 0.2);
return { r: 6, s: [{ x: 0, z: -0.6, r: 0.5, h: 20 }] };
},
function (g, o) {
var c = o.col || 0x6A3A1A;
ctAdd(g, ctBox(2.4, 9, 1.6), c, 0, 4.5, 0);
ctAdd(g, ctBox(2.8, 3, 2), c, 0, 10.5, 0);
ctAdd(g, ctCyl(1.1, 1.1, 0.1, 24), 0xE8DCC0, 0, 10.5, 1.02, Math.PI / 2, 0, 0);
ctAdd(g, ctBox(0.08, 0.8, 0.05), 0x1A1A1A, 0, 10.8, 1.1);
ctAdd(g, ctBox(0.6, 0.08, 0.05), 0x1A1A1A, 0.25, 10.5, 1.1);
ctAdd(g, ctCyl(0.5, 0.5, 0.08, 16), 0xC8A040, 0, 5, 0.82, Math.PI / 2, 0, 0);
ctAdd(g, ctBox(0.06, 3, 0.04), 0xC8A040, 0, 6.5, 0.82);
ctAdd(g, ctSph(0.35, 8), 0x8A8A8A, 0.4, 12.2, 0.6);
return { r: 2, s: [{ x: 0, z: 0, hw: 1.4, hd: 1, h: 12, rot: 0 }] };
},
function (g, o) {
ctAdd(g, ctCyl(1.4, 1.5, 1.1, 16), o.col || 0x8A8070, 0, 0.55, 0);
ctAdd(g, ctCyl(1.1, 1.1, 0.05, 16), 0x1A3A5A, 0, 0.95, 0);
[-1.3, 1.3].forEach(function (x) { ctAdd(g, ctBox(0.18, 2.6, 0.18), 0x6A4A2A, x, 1.6, 0); });
ctAdd(g, ctCone(2, 1.2, 4), 0x8A3A2A, 0, 3.4, 0, 0, Math.PI / 4, 0);
ctAdd(g, ctCyl(0.1, 0.1, 2.6, 6), 0x5A3A20, 0, 2.5, 0, 0, 0, Math.PI / 2);
if (o.ball)
ctAdd(g, ctSph(0.25, 10), 0xD8B048, 1.6, 0.25, 0.8);
if (o.bucket)
ctAdd(g, ctCyl(0.3, 0.25, 0.4, 10), 0x7A5A3A, 0.4, 1.6, 0);
return { r: 2.2, s: [{ x: 0, z: 0, r: 1.5, h: 3 }] };
},
function (g, o) {
ctAdd(g, ctCyl(6, 6, 0.6, 24), 0xD8B048, 0, 0.3, 0);
ctAdd(g, ctCyl(0.5, 0.5, 6, 10), 0xC8A040, 0, 3.3, 0);
var r = ctAdd(g, ctCone(7, 2.6, 24), 0xB83A3A, 0, 7.4, 0);
ctAdd(g, ctCyl(7, 7, 0.8, 24), 0xE8C8D8, 0, 5.8, 0);
for (var i = 0; i < 8; i++) {
var a = i * 0.785;
ctAdd(g, ctCyl(0.06, 0.06, 5.2, 5), 0xC8A040, Math.sin(a) * 4.5, 3.2, Math.cos(a) * 4.5);
var h = new THREE.Group();
h.position.set(Math.sin(a) * 4.5, 0.6 + (i % 2) * 0.6, Math.cos(a) * 4.5);
h.rotation.y = a + Math.PI / 2;
g.add(h);
CTD_SET.quad(h, { L: 1.6, H: 1, col: [0xE8E0D0, 0x3A6AA8, 0xD8B048, 0xB83A3A][i % 4], neck: 0.7, tail: false });
}
return { r: 7.5, s: [{ x: 0, z: 0, r: 6.2, h: 8 }] };
},
function (g, o) {
var c = o.col || 0x4A5A6A;
var b = ctAdd(g, ctSph(1, 18), c, 0, 5, -6);
b.scale.set(7, 5, 16);
ctAdd(g, ctSph(1, 14), 0x9AA0A8, 0, 3, -6).scale.set(6, 2.6, 14);
ctAdd(g, ctBox(10, 0.6, 6), 0x6A2A2A, 0, 1.6, 8);
var j = ctAdd(g, ctBox(11, 0.6, 7), c, 0, 6.8, 8, -0.35, 0, 0);
for (var i = 0; i < 9; i++) {
ctAdd(g, ctCone(0.35, 1.2, 4), 0xD8D0C0, -4 + i, 2.4, 10.2);
ctAdd(g, ctCone(0.35, 1.2, 4), 0xD8D0C0, -4 + i, 7.4, 10.2, Math.PI, 0, 0);
}
[-1, 1].forEach(function (sd) { ctAdd(g, ctSph(0.8, 10), 0xD8C870, sd * 4.6, 7, 4, 0, 0, 0, 1); ctAdd(g, ctBox(0.4, 6, 5), c, sd * 6.6, 3, -4, 0, 0, sd * 0.8); });
ctAdd(g, ctBox(0.4, 8, 6), c, 0, 12, -12, 0, 0, 0);
ctAdd(g, ctBox(0.4, 9, 8), c, 0, 6, -24, 0.3, 0, 0);
ctAdd(g, ctCyl(0.12, 0.15, 0.6, 8), 0xE8DCC0, 0, 2.2, 2);
ctLight(g, 0xFFB060, 0, 2.8, 2, 2);
return { r: 16, s: [{ x: 0, z: -6, hw: 7, hd: 16, h: 10, rot: 0 }] };
},
function (g, o) {
ctAdd(g, ctCyl(0.3, 0.5, 4, 8), 0x5A4028, 0, 2, 0);
for (var i = 0; i < 26; i++) {
var a = i * 0.9, r = 0.6 + (i % 4) * 0.55, y = 3.6 + (i % 5) * 0.6;
ctAdd(g, ctCyl(0.22, 0.22, 0.05, 12), 0xD8B048, Math.sin(a) * r, y, Math.cos(a) * r, Math.PI / 2, a, 0);
}
for (var k = 0; k < 5; k++)
ctAdd(g, ctCyl(0.04, 0.08, 1.8, 5), 0x5A4028, Math.sin(k * 1.26) * 0.6, 4, Math.cos(k * 1.26) * 0.6, Math.cos(k * 1.26) * 0.8, 0, -Math.sin(k * 1.26) * 0.8);
return { r: 3, s: [{ x: 0, z: 0, r: 0.5, h: 5 }] };
},
function (g, o) {
ctAdd(g, ctCyl(3.4, 4, 26, 14), o.col || 0x8A8070, 0, 13, 0);
ctAdd(g, ctCone(4.4, 7, 14), 0x5A3A6A, 0, 29.5, 0);
ctAdd(g, ctBox(1.4, 1.8, 0.3), 0xF8D890, 0, 23, 3.5, 0, 0, 0, 1);
ctAdd(g, ctCyl(0.22, 0.18, 22, 8), 0xD8B048, 0, 11.5, 3.9);
for (var i = 0; i < 10; i++)
ctAdd(g, ctSph(0.3, 7), 0xC8A040, 0, 2 + i * 2.1, 3.95);
return { r: 5, s: [{ x: 0, z: 0, r: 4, h: 26 }] };
},
function (g, o) {
CTD_SET.quad(g, { L: 2.4, H: 1.4, col: 0x7A7A7A, ears: 1, neck: 0.5 });
var d = new THREE.Group();
d.position.y = 1.9;
g.add(d);
CTD_SET.quad(d, { L: 1.2, H: 0.6, col: 0xA87A4A, neck: 0.4, ears: 1 });
var c = new THREE.Group();
c.position.y = 2.9;
g.add(c);
CTD_SET.quad(c, { L: 0.7, H: 0.35, col: 0x3A3A3A, neck: 0.3, ears: 1, tailUp: -0.6 });
var r = ctAdd(g, ctSph(0.25, 10), 0xC8502A, 0, 3.75, 0.05);
ctAdd(g, ctBox(0.06, 0.25, 0.25), 0xD82A2A, 0, 4.05, 0.1);
ctAdd(g, ctCone(0.2, 0.4, 6), 0x3A6A2A, 0, 3.7, -0.3, -1.2, 0, 0);
if (o.base !== false) {
g.children.forEach(function (m) { m.position.y += 1.2; });
ctAdd(g, ctBox(3.4, 1.2, 3.4), 0x8A8070, 0, 0.6, 0);
}
return { r: 2.4, s: [{ x: 0, z: 0, r: 1.8, h: 5 }] };
},
function (g, o) {
var s = [];
for (var i = 0; i < 26; i++) {
var a = -1.3 + i * 0.1, x = Math.sin(a) * 22, z = Math.cos(a) * 22 - 22;
ctAdd(g, new THREE.DodecahedronGeometry(2.6, 0), 0x2A4A22, x, 1.8, z).scale.y = 1.4;
ctAdd(g, ctSph(0.3, 6), 0xB82A3A, x + 0.8, 3, z + 1.2);
ctsRound(s, x, z, 2.4, 4);
}
for (var k = 0; k < 14; k++)
ctAdd(g, ctCyl(0.08, 0.12, 5, 4), 0x3A2A1A, Math.sin(-1.2 + k * 0.18) * 21, 4, Math.cos(-1.2 + k * 0.18) * 21 - 22, 0.5, 0, 0.4 * (k % 2 ? 1 : -1));
return { r: 22, s: s };
},
function (g, o) {
ctAdd(g, ctBox(1.4, 0.5, 3.4), o.col || 0x7A5A3A, 0, 0.7, 0);
[-0.6, 0.6].forEach(function (x) { ctAdd(g, ctBox(0.08, 0.08, 4), 0x3A3A3A, x, 0.2, 0.2); ctAdd(g, ctBox(0.08, 0.5, 0.08), 0x3A3A3A, x, 0.45, 1.6); });
var n = o.dogs || 6;
for (var i = 0; i < n; i++) {
var h = new THREE.Group();
h.position.set(i % 2 ? 0.5 : -0.5, 0, 3 + Math.floor(i / 2) * 1.6);
g.add(h);
CTD_SET.quad(h, { L: 1, H: 0.55, col: o.dog || 0x8A8070, neck: 0.4, ears: 1 });
}
if (o.reindeer) {
var r = new THREE.Group();
r.position.z = 4;
g.add(r);
CTD_SET.quad(r, { L: 2, H: 1.3, col: 0x8A6A4A, neck: 0.6, antlers: 0x5A4A3A });
}
return { r: 3, s: [{ x: 0, z: 1, hw: 0.9, hd: 3, h: 1.5, rot: 0 }] };
},
function (g, o) {
ctAdd(g, ctBox(2, 1.2, 1.6), o.col || 0xB8862A, 0, 1.2, -1);
[-1.1, 1.1].forEach(function (x) { ctAdd(g, ctCyl(0.8, 0.8, 0.12, 14), 0x5A3A20, x, 0.8, -1, 0, 0, Math.PI / 2); });
[-0.7, 0.7].forEach(function (x) { var h = new THREE.Group(); h.position.set(x, 0, 1.6); g.add(h); CTD_SET.quad(h, { L: 1.5, H: 0.9, col: o.beast || 0x8A8070, neck: 0.5, horns: 0x3A3028, hornL: 1.2 }); });
return { r: 3, s: [{ x: 0, z: 0, hw: 1.2, hd: 2.4, h: 2, rot: 0 }] };
},
function (g, o) {
ctAdd(g, new THREE.DodecahedronGeometry(3, 0), 0x6A6A70, 0, 1, 0).scale.y = 0.6;
ctAdd(g, ctBox(3.2, 2, 2), 0x8A8A92, 0, 3.4, 0);
ctAdd(g, ctCyl(0.3, 0.3, 4, 8), 0x5A3A20, 0, 6.2, 0);
ctAdd(g, ctBox(0.7, 0.4, 0.7), 0x5A3A20, 0, 8.4, 0);
for (var i = 0; i < 3; i++)
ctAdd(g, ctBox(3.3, 0.12, 0.12), 0xC8A040, 0, 2.8 + i * 0.6, 1.01);
return { r: 3.4, s: [{ x: 0, z: 0, r: 3, h: 5 }] };
},
function (g, o) {
var s = [], c = 0x5A3A24;
ctAdd(g, ctBox(40, 10, 18), c, 0, 5, 0);
for (var i = 0; i < 12; i++)
[-1, 1].forEach(function (sd) { for (var r = 0; r < 3; r++)
ctAdd(g, ctCyl(1.4, 1.4, 0.2, 14), 0xC8A040, -18 + i * 3.3, 11.2 + r * 1.7, sd * (7.6 - r * 2.6), sd * (0.6 + 0), 0, 0); });
[-1, 1].forEach(function (sd) { ctAdd(g, ctBox(41, 0.4, 11), 0x7A5A2A, 0, 13, sd * 4.4, sd * 0.62, 0, 0); });
[-20.5, 20.5].forEach(function (x) { ctAdd(g, ctBox(0.6, 4, 0.6), c, x, 17, 0); ctAdd(g, ctCone(0.6, 2, 6), 0xC8A040, x, 19.6, 0); });
ctAdd(g, ctBox(4, 6, 0.3), 0x3A2414, 0, 3, 9.05);
ctsWindows(g, 30, 6, 9.06, 8);
ctsBox(s, 0, 0, 20.5, 9.5, 16);
return { r: 24, s: s };
},
function (g, o) {
var c = o.col || 0x8A7A68, s = [];
ctAdd(g, ctBox(30, 26, 12), c, 0, 13, 0);
[-11, -4, 3, 10].forEach(function (x, i) { var h = [34, 40, 38, 30][i]; ctAdd(g, ctCyl(3, 3.4, h, 10), c, x, 26 + h / 2 - 8, 0); ctAdd(g, ctSph(3, 10), c, x, 26 + h - 8, 0); });
ctAdd(g, ctCyl(3.4, 3.8, 22, 10), c, -18, 22, 0, 0, 0, 0.8);
ctsBox(s, 0, 0, 16, 7, 40);
return { r: 22, s: s };
},
function (g, o) {
var y = o.y || 110, R = o.R || 90, c = 0x7A6A5A;
var b = ctAdd(g, ctCone(R, R * 0.9, 18), c, 0, y - R * 0.45, 0, Math.PI, 0, 0);
ctAdd(g, ctCyl(R, R, 6, 18), 0x8A8070, 0, y + 3, 0);
ctAdd(g, ctCyl(R * 0.98, R * 0.98, 1, 18), 0x5A8A3A, 0, y + 6.5, 0);
var Rn = ctRand(77);
for (var i = 0; i < 14; i++) {
var a = Rn() * 6.28, r = Rn() * R * 0.7, h = 10 + Rn() * 30;
ctAdd(g, ctCyl(3, 4, h, 10), 0xC8C0B0, Math.sin(a) * r, y + 7 + h / 2, Math.cos(a) * r);
ctAdd(g, ctCone(4, 6, 10), 0x4A5A8A, Math.sin(a) * r, y + 7 + h + 3, Math.cos(a) * r);
}
for (var k = 0; k < 6; k++) {
var a2 = k * 1.05;
ctAdd(g, new THREE.DodecahedronGeometry(8, 0), c, Math.sin(a2) * R * 1.4, y - 20 - k * 6, Math.cos(a2) * R * 1.4);
}
return { r: 12, s: [] };
},
function (g, o) {
var c = 0x2A3A34, s = [];
var Rn = ctRand(41);
for (var i = 0; i < 14; i++) {
var a = Rn() * 6.28, r = 10 + Rn() * 60, x = Math.sin(a) * r, z = Math.cos(a) * r, h = 30 + Rn() * 70;
ctAdd(g, ctBox(8 + Rn() * 14, h, 6 + Rn() * 10), [c, 0x1E2A26, 0x34443A][i % 3], x, h / 2 - 4, z, (Rn() - 0.5) * 0.5, Rn() * 3, (Rn() - 0.5) * 0.6);
}
ctAdd(g, ctBox(36, 48, 4), 0x1E2A26, 0, 24, 30, 0.08, 0, 0.05);
ctAdd(g, ctBox(30, 42, 1), 0x3A4A3E, 0, 24, 32.2, 0.08, 0, 0.05);
for (var k = 0; k < 6; k++)
ctAdd(g, ctBox(24, 0.8, 0.4), 0x4A5A4A, 0, 8 + k * 6, 32.8, 0.08, 0, 0.05);
ctsRound(s, 0, 0, 72, 80);
return { r: 75, s: s };
},
function (g, o) {
var c = o.col || 0x2A3A30;
ctAdd(g, ctBox(4, 2, 4), 0x3A3A34, 0, 1, 0);
var b = ctAdd(g, ctSph(1.8, 12), c, 0, 4, 0);
b.scale.set(1, 1.4, 0.9);
var h = ctAdd(g, ctSph(1.6, 12), c, 0, 6.8, 0.3);
h.scale.set(1, 1.2, 1.1);
for (var i = 0; i < 6; i++)
ctAdd(g, ctCyl(0.12, 0.3, 2.4, 6), c, -0.9 + i * 0.36, 5.4, 1.6, -0.3, 0, 0);
[-1, 1].forEach(function (sd) { ctAdd(g, ctBox(0.2, 3.4, 2.4), c, sd * 1.9, 5.6, -1, 0.3, sd * 0.3, sd * 0.5); });
return { r: 3, s: [{ x: 0, z: 0, r: 2, h: 8 }] };
},
function (g, o) {
var s = [], c = 0xC8BCA0;
ctAdd(g, ctBox(44, 20, 30), c, 0, 10, 0);
for (var i = 0; i < 14; i++)
ctAdd(g, ctCyl(0.8, 0.9, 10, 12), 0xB8AC90, -19.5 + i * 3, 13, 15.6);
ctAdd(g, ctBox(44, 2, 2), 0xB8AC90, 0, 18.6, 15.6);
for (var k = 0; k < 7; k++)
ctAdd(g, ctBox(2.4, 4, 0.2), 0x3A2A20, -15 + k * 5, 3, 15.1);
ctsWindows(g, 38, 13, 15.3, 7);
ctAdd(g, new THREE.SphereGeometry(14, 18, 9, 0, Math.PI * 2, 0, Math.PI / 2), 0x4A7A5A, 0, 20, -4);
ctAdd(g, ctCone(1.4, 4, 10), 0xC8A040, 0, 36, -4);
[-20, 20].forEach(function (x) { CTD_SET.fig(ctdSub(g, x, 20, 13), { h: 4, col: 0xC8A040, arms: "up" }); });
ctsBox(s, 0, 0, 22.5, 15.5, 22);
return { r: 26, s: s };
},
function (g, o) {
var b = new THREE.Group();
b.position.z = -1.2;
g.add(b);
ctAdd(b, ctBox(1.6, 1.8, 1.6), o.col || 0x1A1A20, 0, 1.9, 0);
ctAdd(b, ctBox(0.6, 0.4, 0.6), 0x1A1A20, 0, 3, -1);
ctAdd(b, ctCyl(1.1, 1.1, 0.1, 16), 0x2A1A10, -0.9, 1.1, 0, 0, 0, Math.PI / 2);
ctAdd(b, ctCyl(1.1, 1.1, 0.1, 16), 0x2A1A10, 0.9, 1.1, 0, 0, 0, Math.PI / 2);
ctAdd(b, ctBox(0.08, 0.08, 3), 0x2A1A10, -0.5, 1.3, 2);
ctAdd(b, ctBox(0.08, 0.08, 3), 0x2A1A10, 0.5, 1.3, 2);
var h = new THREE.Group();
h.position.z = 2.2;
g.add(h);
CTD_SET.quad(h, { L: 2.2, H: 1.3, col: o.horse || 0x4A3424, neck: 0.7, mane: 0x1A1410 });
return { r: 3.2, s: [{ x: 0, z: 0, hw: 0.9, hd: 2.6, h: 3, rot: 0 }] };
},
function (g, o) {
ctAdd(g, ctBox(12, 70, 12), 0xA8946A, 0, 35, 0);
ctAdd(g, ctBox(13, 12, 13), 0xA8946A, 0, 76, 0);
[0, 1, 2, 3].forEach(function (i) { var a = i * 1.5708; ctAdd(g, ctCyl(4.5, 4.5, 0.3, 24), 0xD8CCA8, Math.sin(a) * 6.6, 76, Math.cos(a) * 6.6, Math.PI / 2, a, 0, 0x6A6040); });
ctAdd(g, ctBox(10, 8, 10), 0x7A6A4A, 0, 86, 0);
ctAdd(g, ctCone(7.5, 22, 4), 0x3A4A4A, 0, 101, 0, 0, Math.PI / 4, 0);
return { r: 9, s: [{ x: 0, z: 0, hw: 6.5, hd: 6.5, h: 110, rot: 0 }] };
},
function (g, o) {
ctAdd(g, ctBox(40, 24, 60), 0xB8AE98, 0, 12, 0);
ctAdd(g, ctCyl(15, 15, 14, 24), 0xB8AE98, 0, 31, 0);
ctAdd(g, new THREE.SphereGeometry(15, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), 0x6A7A7A, 0, 38, 0);
ctAdd(g, ctCyl(2, 2, 8, 10), 0xB8AE98, 0, 56, 0);
ctAdd(g, ctSph(1.4, 8), 0xC8A040, 0, 61, 0);
return { r: 32, s: [{ x: 0, z: 0, hw: 20, hd: 30, h: 60, rot: 0 }] };
},
function (g, o) {
var h = o.h || 60, s = [];
for (var i = 0; i < 5; i++) {
var x = -30 + i * 15;
ctAdd(g, new THREE.DodecahedronGeometry(14, 0), 0x5A5A50, x, h * 0.4, -6 - (i % 2) * 4).scale.set(1, h / 18, 0.9);
ctsRound(s, x, -6, 12, h);
}
ctAdd(g, ctBox(9, h, 1), 0x8AA8B8, 0, h / 2, 4, 0, 0, 0, 0, 0.75);
ctAdd(g, ctCyl(14, 14, 0.4, 20), 0x4A7A9A, 0, 0.2, 12);
return { r: 34, s: s };
},
function (g, o) {
ctAdd(g, ctBox(7, 3, 34), 0x3A3A40, 0, 1.5, 0);
ctAdd(g, ctCone(3.5, 8, 4), 0x3A3A40, 0, 1.5, 20, Math.PI / 2, 0, Math.PI / 4).scale.set(1, 1, 0.45);
ctAdd(g, ctCyl(2.4, 2.4, 2.6, 14), 0x2A2A30, 0, 4.3, 6);
ctAdd(g, ctCyl(2.4, 2.4, 2.6, 14), 0x2A2A30, 0, 4.3, -8);
[-1, 1].forEach(function (z) { ctAdd(g, ctCyl(1, 1, 8, 10), 0x2A2A2A, 0, 8, z * 1); });
return { r: 20, s: [{ x: 0, z: 0, hw: 3.8, hd: 18, h: 6, rot: 0 }] };
},
function (g, o) {
var m = ctAdd(g, new THREE.CircleGeometry(o.R || 60, 40), o.col || 0xB8B8A8, 0, 0, 0, 0, 0, 0, 1);
m.material = ctdBasic(o.col || 0xB8B8A8);
if (o.land)
[[0.3, 0.2, 0.35], [-0.3, -0.25, 0.3], [0.1, -0.45, 0.22]].forEach(function (p) { var l = new THREE.Mesh(new THREE.CircleGeometry((o.R || 60) * p[2], 16), ctdBasic(o.land)); l.position.set(p[0] * (o.R || 60), p[1] * (o.R || 60), 0.5); g.add(l); });
return { r: 1, s: [], sky: 1 };
},
function (g, o) {
var s = [], n = 40;
for (var i = 0; i < n; i++) {
var a = i / n * 6.283;
if (i >= n - 2)
continue;
var x = Math.sin(a) * 12, z = Math.cos(a) * 12;
ctAdd(g, ctCyl(0.3, 0.35, 4.4, 6), 0x6A4A2A, x, 2.2, z);
ctAdd(g, ctCone(0.3, 0.6, 6), 0x6A4A2A, x, 4.7, z);
}
for (var k = 0; k < n - 2; k += 3) {
var b = k / n * 6.283;
ctsRound(s, Math.sin(b) * 12, Math.cos(b) * 12, 1.4, 4);
}
CTD_SET.house(g, { w: 7, d: 6, h: 3.2, col: 0x7A5A3A, roof: 0x5A4028 });
ctAdd(g, ctCyl(0.1, 0.1, 12, 6), 0x5A4028, 0, 6, -6);
ctAdd(g, ctBox(2.4, 1.5, 0.05), o.flag || 0xB83A3A, 1.25, 11, -6);
ctsBox(s, 0, 0, 3.6, 3.2, 4);
return { r: 14, s: s };
},
function (g, o) {
ctAdd(g, ctCyl(0.32, 0.42, 3, 12), 0x2A2A2A, 0, 0.9, 0.4, Math.PI / 2 - 0.15, 0, 0);
ctAdd(g, ctBox(1.2, 0.5, 1.6), 0x6A4A2A, 0, 0.4, -0.2);
[-0.65, 0.65].forEach(function (x) { ctAdd(g, ctCyl(0.4, 0.4, 0.12, 12), 0x4A3020, x, 0.4, -0.2, 0, 0, Math.PI / 2); });
if (o.balls)
for (var i = 0; i < 4; i++)
ctAdd(g, ctSph(0.18, 8), 0x2A2A2A, -1 + (i % 2) * 0.36, 0.18 + (i > 1 ? 0.3 : 0), -1.2);
return { r: 1.6, s: [{ x: 0, z: 0, r: 0.9, h: 1.4 }] };
},
function (g, o) {
var s = [];
for (var i = 0; i < (o.n || 5); i++) {
var x = (i % 3) * 1.3 - 1.3, z = Math.floor(i / 3) * 1.3, y = 0;
ctAdd(g, ctCyl(0.55, 0.5, 1.3, 12), 0x7A5A3A, x, 0.65, z);
ctAdd(g, ctTor(0.56, 0.05), 0x3A3A3A, x, 0.3, z, Math.PI / 2);
ctAdd(g, ctTor(0.56, 0.05), 0x3A3A3A, x, 1.0, z, Math.PI / 2);
if (o.apples)
ctAdd(g, ctSph(0.45, 8), 0x9A2A1A, x, 1.35, z).scale.y = 0.3;
ctsRound(s, x, z, 0.6, 1.3);
}
return { r: 3, s: s };
},
function (g, o) {
var s = [];
[-1, 1].forEach(function (sd) { CTD_SET.house(ctdSub(g, sd * 4.2, 0, 0), { w: 6, d: 6, h: 9, col: sd < 0 ? 0xC8A890 : 0xB8A890, roof: 0x6A3A2A, storey: 1 }); ctsBox(s, sd * 4.2, 0, 3.2, 3.2, 10); });
ctAdd(g, ctBox(2.6, 0.6, 1), 0x6A4A2A, 0, 7.2, 0);
for (var i = 0; i < 6; i++) {
ctAdd(g, ctSph(0.35, 8), 0x3A6A2A, -1 + i * 0.4, 7.7, 0);
ctAdd(g, ctSph(0.18, 7), 0xC82A3A, -1 + i * 0.4, 8.0, 0.15);
}
return { r: 8, s: s };
},
function (g, o) {
ctAdd(g, ctCyl(9, 9, 0.2, 24), 0x2A5A6A, 0, 0.06, 0);
var a = ctAdd(g, new THREE.TorusGeometry(8, 0.5, 6, 20, Math.PI), o.col || 0xB8301A, 0, -4.5, 0);
a.scale.set(1, 0.75, 4);
[-1, 1].forEach(function (sd) { for (var i = 0; i < 7; i++) {
var t = -0.9 + i * 0.3, x = Math.sin(t) * 8;
ctAdd(g, ctCyl(0.08, 0.08, 1.2, 5), o.col || 0xB8301A, x, Math.cos(t) * 6 - 4.5 + 0.6, sd * 1.8);
} });
for (var k = 0; k < 8; k++)
ctAdd(g, ctCyl(0.6, 0.6, 0.05, 10), 0x3A7A3A, Math.sin(k * 0.8) * 6, 0.18, Math.cos(k * 0.8) * 6 + (k % 2));
return { r: 10, s: [] };
},
function (g, o) {
var R = o.R || 140, h = o.h || 90, c = o.col || 0x7A5A44;
ctAdd(g, ctCyl(R, R * 1.08, h, 22), c, 0, h / 2, 0);
ctAdd(g, ctCyl(R * 0.99, R * 0.99, 2, 22), 0x3E7A2E, 0, h + 0.6, 0);
var Rn = ctRand(9);
for (var i = 0; i < 40; i++) {
var a = Rn() * 6.28, r = Rn() * R * 0.9;
ctAdd(g, new THREE.IcosahedronGeometry(4 + Rn() * 4, 0), 0x2E6A26, Math.sin(a) * r, h + 5, Math.cos(a) * r);
}
for (var k = 0; k < 12; k++) {
var b = k * 0.52;
ctAdd(g, ctBox(10, h * 0.9, 4), 0x6A4A36, Math.sin(b) * R * 1.02, h * 0.45, Math.cos(b) * R * 1.02, 0, b, 0);
}
return { r: R + 6, s: [{ x: 0, z: 0, r: R, h: h }] };
},
function (g, o) {
var s = [], c = 0x6A4A2E;
for (var i = 0; i < 8; i++) {
ctAdd(g, ctCyl(0.3, 0.3, 8, 7), c, 0, 0.3 + i * 0.58, -3, 0, 0, Math.PI / 2);
ctAdd(g, ctCyl(0.3, 0.3, 8, 7), c, 0, 0.3 + i * 0.58, 3, 0, 0, Math.PI / 2);
ctAdd(g, ctCyl(0.3, 0.3, 6.4, 7), c, -3.9, 0.3 + i * 0.58, 0, Math.PI / 2, 0, 0);
ctAdd(g, ctCyl(0.3, 0.3, 6.4, 7), c, 3.9, 0.3 + i * 0.58, 0, Math.PI / 2, 0, 0);
}
ctsRoof(g, 9, 7.4, 2.6, 0x4A3424, 4.6);
ctAdd(g, ctBox(1.2, 2.2, 0.2), 0x2A1A10, 0, 1.1, 3.3);
ctsBox(s, 0, 0, 4.2, 3.4, 5);
return { r: 6, s: s };
},
function (g, o) {
var b = ctAdd(g, ctSph(1, 14), 0xA8988A, 0, 2.2, 0);
b.scale.set(3, 2.2, 7);
ctAdd(g, ctSph(1.4, 12), 0x8A7A6A, 0, 2.4, 7);
ctAdd(g, ctSph(0.25, 8), 0x2A2A2A, 0.7, 2.8, 8);
ctAdd(g, ctSph(0.25, 8), 0x2A2A2A, -0.7, 2.8, 8);
for (var i = 0; i < 5; i++)
ctAdd(g, ctTor(2.6 - Math.abs(i - 2) * 0.3, 0.18), 0x8A7A6A, 0, 2.2, -4 + i * 2, 0, 0, 0).scale.set(1.1, 0.85, 1);
return { r: 8, s: [{ x: 0, z: 0, hw: 3, hd: 7, h: 4, rot: 0 }] };
},
function (g, o) {
var s = [], c = 0x5A4A3A;
[-1, 1].forEach(function (sd) {
ctAdd(g, ctBox(6, 30, 6), 0x3A3434, sd * 14, 15, 0);
ctsBox(s, sd * 14, 0, 3.2, 3.2, 30);
ctAdd(g, ctBox(10, 22, 0.6), 0x6A4A2A, sd * 5.6, 11, 0, 0, sd * 0.3, 0);
for (var i = 0; i < 5; i++)
ctAdd(g, ctBox(9, 0.5, 0.7), 0x8A6A3A, sd * 5.6, 3 + i * 4.2, 0.1, 0, sd * 0.3, 0);
});
ctAdd(g, ctBox(34, 4, 7), 0x3A3434, 0, 32, 0);
[-14, 14].forEach(function (x) { ctLight(g, 0xFF9A50, x, 31, 3.6, 3); });
return { r: 18, s: s };
},
function (g, o) {
var s = [], Rn = ctRand(31), n = o.n || 9;
for (var i = 0; i < n; i++) {
var a = Rn() * 6.28, r = 2 + Rn() * 9, x = Math.sin(a) * r, z = Math.cos(a) * r, h = new THREE.Group();
h.position.set(x, 0, z);
h.rotation.y = Rn() * 6.28;
g.add(h);
if (i % 3 === 2)
CTD_SET.quad(h, { L: 2.2, H: 1.3, col: 0x8A8A84, neck: 0.7 });
else
CTD_SET.fig(h, { h: 1.9, col: 0x8A8A84, arms: ["up", "fwd", "out"][i % 3], spear: i % 2, base: false });
ctsRound(s, x, z, 0.6, 2);
}
return { r: 12, s: s };
},
function (g, o) {
var c = 0x7A7268;
ctAdd(g, ctCone(70, 60, 9), c, 0, 30, 0);
ctAdd(g, ctCyl(16, 22, 60, 10), c, 0, 80, 0);
ctAdd(g, ctSph(12, 12), c, 0, 118, 6);
[-1, 1].forEach(function (sd) { ctAdd(g, ctCyl(6, 8, 50, 8), c, sd * 22, 110, 0, 0, 0, sd * -0.5); });
ctAdd(g, ctSph(36, 18), 0x6A7A8A, 0, 152, 0).scale.y = 0.45;
return { r: 72, s: [{ x: 0, z: 0, r: 60, h: 60 }] };
},
function (g, o) {
var c = o.col || 0x3A5A4A;
for (var i = 0; i < 4; i++) {
var a = ctAdd(g, new THREE.TorusGeometry(3, 1.1, 8, 14, Math.PI), c, 0, 0, -i * 8, 0, Math.PI / 2, 0);
}
var n = ctAdd(g, ctCyl(1, 1.4, 12, 10), c, 0, 6, 8, 0.4, 0, 0);
ctAdd(g, ctBox(2.2, 1.8, 3.6), c, 0, 11.5, 11);
ctAdd(g, ctSph(0.3, 8), 0xD8C870, 0.9, 12.2, 12.4, 0, 0, 0, 1);
ctAdd(g, ctSph(0.3, 8), 0xD8C870, -0.9, 12.2, 12.4, 0, 0, 0, 1);
return { r: 14, s: [{ x: 0, z: -10, hw: 3, hd: 14, h: 6, rot: 0 }] };
},
function (g, o) {
var lo = ctAdd(g, new THREE.SphereGeometry(3, 16, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), 0x9A9A8A, 0, 0.6, 0);
lo.scale.y = 0.5;
var up = ctAdd(g, new THREE.SphereGeometry(3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), 0x9A9A8A, 0, 0.8, -1.2, -0.8, 0, 0);
up.scale.y = 0.5;
ctAdd(g, ctSph(0.8, 14), 0xC8C0B4, 0, 0.9, 0.4);
return { r: 3.4, s: [{ x: 0, z: 0, r: 3, h: 2 }] };
},
function (g, o) {
var s = [], c = 0xC85A5A;
ctAdd(g, ctBox(30, 12, 20), c, 0, 6, 0);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { ctAdd(g, ctCyl(3, 3.5, 22, 12), 0xD86A5A, q[0] * 15, 11, q[1] * 10); ctAdd(g, ctSph(3.6, 12), 0x8A7A9A, q[0] * 15, 22, q[1] * 10); ctsRound(s, q[0] * 15, q[1] * 10, 3.5, 22); });
for (var i = 0; i < 12; i++)
ctAdd(g, ctBox(1.6, 2.4, 0.1), 0xD89A3A, -12 + i * 2.2, 7, 10.06, 0, 0, 0, 1);
var r = ctAdd(g, new THREE.SphereGeometry(13, 18, 9, 0, Math.PI * 2, 0, Math.PI / 2), 0x5A5A7A, 0, 12, 0);
r.scale.y = 0.6;
for (var k = 0; k < 30; k++) {
var a = k * 0.21;
ctAdd(g, new THREE.SphereGeometry(1.4, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2), 0x3A3A5A, Math.sin(a) * (6 + k % 3 * 2.4), 12 + Math.cos(k) * 2 + 5, Math.cos(a) * (6 + k % 3 * 2.4) * 0.8);
}
ctsBox(s, 0, 0, 15.2, 10.2, 14);
return { r: 20, s: s };
},
function (g, o) {
var c = o.col || 0x8A4A4A;
var b = ctAdd(g, ctCone(2.4, 10, 12), c, 0, 2.4, -4, -Math.PI / 2 + 0.15, 0, 0);
ctAdd(g, ctSph(2.5, 14), c, 0, 2.2, 1.4);
ctAdd(g, ctSph(0.7, 10), 0xD8C870, 1.9, 2.6, 2.2, 0, 0, 0, 1);
ctAdd(g, ctSph(0.7, 10), 0xD8C870, -1.9, 2.6, 2.2, 0, 0, 0, 1);
for (var i = 0; i < 8; i++) {
var a = -1.2 + i * 0.34;
var t = ctAdd(g, new THREE.TorusGeometry(4 + i % 3, 0.35, 6, 12, Math.PI * 0.9), c, Math.sin(a) * 4, 0.4, 4 + Math.cos(a) * 4, Math.PI / 2, 0, a);
}
return { r: 9, s: [{ x: 0, z: 0, r: 3, h: 4 }] };
},
function (g, o) {
ctAdd(g, ctCyl(0.27, 0.24, 0.75, 12), 0x3A3A3A, 0, 1.25, 0);
ctAdd(g, ctCyl(0.32, 0.38, 0.08, 14), 0x2A2A2A, 0, 2.12, 0);
ctAdd(g, ctCyl(0.17, 0.19, 0.22, 12), 0x2A2A2A, 0, 2.25, 0);
ctAdd(g, ctSph(0.15, 10), 0xD8D0C0, 0, 1.86, 0);
[-0.06, 0.06].forEach(function (x) { ctAdd(g, ctCyl(0.05, 0.05, 0.04, 10), 0x1A1A1A, x, 1.88, 0.13, Math.PI / 2, 0, 0); });
ctAdd(g, ctBox(0.4, 0.1, 0.25), 0xA82A2A, 0, 1.62, 0);
[-0.32, 0.32].forEach(function (x) { ctAdd(g, ctCyl(0.07, 0.08, 0.6, 8), 0x3A3A3A, x, 1.2, 0); ctAdd(g, ctSph(0.07, 8), 0xD8D0C0, x, 0.86, 0); });
ctAdd(g, ctBox(0.2, 0.05, 0.3), 0x2A1A10, -0.12, 0.02, 0.1);
ctAdd(g, ctBox(0.2, 0.05, 0.3), 0x2A1A10, 0.12, 0.02, 0.1);
return { r: 0.6, s: [{ x: 0, z: 0, r: 0.3, h: 2 }] };
},
function (g, o) {
ctAdd(g, new THREE.DodecahedronGeometry(2, 0), 0x7A7A72, 0, 1, 0).scale.set(1.3, 0.7, 1);
ctAdd(g, ctBox(1.6, 0.6, 0.9), 0x4A4A4A, 0, 1.9, 0);
ctAdd(g, ctBox(0.12, 2.4, 0.04), 0xA8A8B0, 0, 3.4, 0);
ctAdd(g, ctBox(0.9, 0.12, 0.12), 0xC8A040, 0, 4.6, 0);
ctAdd(g, ctCyl(0.06, 0.06, 0.7, 6), 0x5A3A20, 0, 5, 0);
return { r: 2.6, s: [{ x: 0, z: 0, r: 1.8, h: 2 }] };
},
function (g, o) {
var c = o.col || 0xB83A3A;
ctAdd(g, ctCyl(3, 3, 3.4, 14), c, 0, 1.7, 0);
ctAdd(g, ctCone(3.5, 3, 14), o.c2 || 0xD8C890, 0, 4.9, 0);
ctAdd(g, ctCyl(0.05, 0.05, 2, 5), 0x5A3A20, 0, 7, 0);
ctAdd(g, ctBox(1.2, 0.6, 0.04), c, 0.6, 7.6, 0);
for (var i = 0; i < 7; i++)
ctAdd(g, ctBox(0.9, 3.3, 0.05), o.c2 || 0xD8C890, Math.sin(i * 0.9) * 3.02, 1.7, Math.cos(i * 0.9) * 3.02, 0, i * 0.9, 0);
return { r: 3.6, s: [{ x: 0, z: 0, r: 3, h: 3.4 }] };
},
function (g, o) {
var c = o.col || 0xB8A070;
ctAdd(g, ctBox(6, 3, 7), c, 0, 1.5, 0);
ctAdd(g, ctBox(4.4, 3, 3), c, 0, 4.5, -1.6);
ctAdd(g, ctBox(4.4, 1.4, 5), c, 0, 3.7, 0.8);
[-1.2, 1.2].forEach(function (x) { ctAdd(g, ctBox(1.2, 3.2, 1.2), c, x, 1.6 + 1.5, 3); });
ctAdd(g, ctBox(3.6, 6, 2.2), c, 0, 9, -1.6);
ctAdd(g, ctBox(2.2, 2.6, 2.2), c, 0, 13.3, -1.4);
ctAdd(g, ctBox(3.6, 3.4, 0.6), 0x2A4A8A, 0, 13, -2.6);
ctAdd(g, ctCyl(0.8, 1.1, 2.4, 8), 0xD8D0C0, 0, 15.8, -1.4);
return { r: 5, s: [{ x: 0, z: 0, hw: 3.2, hd: 3.8, h: 16, rot: 0 }] };
},
function (g, o) {
[-2.8, 2.8].forEach(function (x) { ctAdd(g, ctCyl(0.26, 0.3, 5.4, 10), o.col || 0xB8301A, x, 2.7, 0); });
ctAdd(g, ctBox(7.6, 0.4, 0.6), 0x1A1A1A, 0, 5.6, 0, 0, 0, 0);
ctAdd(g, ctBox(6.6, 0.32, 0.4), o.col || 0xB8301A, 0, 4.7, 0);
ctAdd(g, ctBox(0.3, 0.9, 0.3), o.col || 0xB8301A, 0, 5.1, 0);
return { r: 3.4, s: [{ x: -2.8, z: 0, r: 0.32, h: 5 }, { x: 2.8, z: 0, r: 0.32, h: 5 }] };
},
function (g, o) {
ctAdd(g, ctBox(0.1, 4, 0.1), 0x2A1A10, -3, 2, 0);
ctAdd(g, ctBox(0.1, 4, 0.1), 0x2A1A10, 3, 2, 0);
ctAdd(g, ctCyl(0.02, 0.02, 6, 4), 0x2A1A10, 0, 3.9, 0, 0, 0, Math.PI / 2);
for (var i = 0; i < 5; i++) {
var l = ctAdd(g, ctSph(0.35, 10), o.col || 0xC83A2A, -2.2 + i * 1.1, 3.4, 0, 0, 0, 0, 1);
l.scale.y = 1.3;
}
return { r: 3.2, s: [{ x: -3, z: 0, r: 0.15, h: 4 }, { x: 3, z: 0, r: 0.15, h: 4 }] };
},
function (g, o) {
ctAdd(g, ctCyl(6, 6, 6, 20), o.col || 0xB8B0A0, 0, 3, 0);
ctAdd(g, new THREE.SphereGeometry(6.2, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), 0x8A8A92, 0, 6, 0);
ctAdd(g, ctBox(1.6, 6, 0.6), 0x2A2A3A, 0, 8.5, 5.4, -0.5, 0, 0);
ctAdd(g, ctCyl(0.6, 0.8, 8, 12), 0x3A3A44, 0, 10.5, 3, -0.8, 0, 0);
ctAdd(g, ctBox(1.6, 2.6, 0.1), 0x3A2A20, 0, 1.3, 6.02);
return { r: 7, s: [{ x: 0, z: 0, r: 6.2, h: 12 }] };
},
function (g, o) {
ctAdd(g, ctCyl(2, 2.2, 2, 14), 0x8A8478, 0, 1, 0);
ctAdd(g, ctCyl(1.6, 1.6, 0.1, 14), 0x0A0806, 0, 2.02, 0);
ctAdd(g, ctCyl(0.2, 0.2, 4, 6), 0x8A8478, 1.6, 3, 0);
ctAdd(g, ctCyl(0.2, 0.2, 4, 6), 0x8A8478, -1.6, 3, 0);
ctAdd(g, new THREE.SphereGeometry(2.4, 14, 7, 0, Math.PI * 2, 0, Math.PI / 2), 0x7A7468, 0, 5, 0);
return { r: 2.6, s: [{ x: 0, z: 0, r: 2.2, h: 5 }] };
},
function (g, o) {
var s = [], c = 0x5A8A72;
ctAdd(g, ctBox(40, 18, 22), c, 0, 9, 0);
for (var i = 0; i < 10; i++)
ctAdd(g, ctBox(2.4, 8, 0.3), 0x2A3A30, -16 + i * 3.6, 6, 11.1);
ctAdd(g, ctBox(42, 2, 24), 0x4A7A62, 0, 19, 0);
[-1, 1].forEach(function (sd) { ctAdd(g, ctBox(8, 26, 10), c, sd * 24, 13, 0); ctAdd(g, ctCone(6, 8, 4), 0x3A6A52, sd * 24, 30, 0, 0, Math.PI / 4, 0); });
ctAdd(g, ctBox(10, 6, 4), 0x6A6A60, 6, 1.5, 14, 0.3, 0.4, 0.2);
for (var k = 0; k < 14; k++)
ctAdd(g, new THREE.IcosahedronGeometry(1.4, 0), 0x3A6A2A, -18 + k * 2.8, 19 + (k % 3), 11.4);
ctsBox(s, 0, 0, 28, 11.5, 26);
return { r: 30, s: s };
},
function (g, o) {
for (var i = 0; i < 14; i++) {
var x = (i % 5) * 3 - 6, z = Math.floor(i / 5) * 3;
ctAdd(g, ctBox(0.4, 0.25, 1.4), 0x6A4A2E, x, 0.12, z);
ctAdd(g, ctCyl(0.02, 0.02, 1, 4), 0x4A3424, x, 0.7, z);
ctAdd(g, ctBox(0.7, 0.5, 0.02), 0xE0D8C4, x, 0.8, z);
ctAdd(g, ctCyl(0.005, 0.005, 8, 3), 0xD8D0B8, x, 0.5, z - 4, Math.PI / 2 - 0.05, 0, 0);
}
ctAdd(g, ctCyl(10, 10, 0.1, 20), 0x3A6A8A, 0, 0.04, 2);
return { r: 10, s: [] };
},
function (g, o) {
var c = [0xFF5A8A, 0x5AC8FF, 0xFFD040];
ctAdd(g, ctBox(4, 1.6, 3), 0xE8DCC0, 0, 0.8, 0);
[[-2, -1.5], [2, -1.5], [-2, 1.5], [2, 1.5]].forEach(function (q, i) { ctAdd(g, ctCyl(0.4, 0.4, 2.6, 10), 0xE8DCC0, q[0], 1.3, q[1]); ctAdd(g, ctCone(0.5, 0.8, 10), c[i % 3], q[0], 3, q[1]); });
ctAdd(g, ctCone(1.4, 1.6, 4), 0x5AC8FF, 0, 2.4, 0, 0, Math.PI / 4, 0);
return { r: 4, s: [{ x: 0, z: 0, hw: 2.2, hd: 1.8, h: 2, rot: 0 }] };
},
function (g, o) { var s = []; [[0, 0, 1], [-9, 4, 0.7], [8, 5, 0.8], [-4, -9, 0.6], [6, -8, 0.75], [13, -2, 0.55]].forEach(function (m) { var k = m[2]; ctAdd(g, ctCyl(1.2 * k, 1.6 * k, 16 * k, 10), 0xC8C0B0, m[0], 8 * k, m[1]); ctAdd(g, new THREE.SphereGeometry(8 * k, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), 0xA8A098, m[0], 16 * k, m[1]).scale.y = 0.45; ctsRound(s, m[0], m[1], 1.6 * k, 16 * k); }); return { r: 15, s: s }; },
function (g, o) {
var c = 0xC8C0A8;
ctAdd(g, ctCyl(0.3, 0.3, 8, 8), c, 0, 0.4, 0, 0, 0.3, Math.PI / 2);
for (var i = 0; i < 9; i++) {
var t = ctAdd(g, new THREE.TorusGeometry(2.4 - Math.abs(i - 4) * 0.15, 0.12, 5, 10, Math.PI), c, -3.2 + i * 0.8, 0, 0, 0, Math.PI / 2, 0);
}
ctAdd(g, ctSph(1, 10), c, 5, 0.8, 0).scale.set(1.4, 0.8, 0.9);
return { r: 6, s: [{ x: 0, z: 0, hw: 5, hd: 2.4, h: 2, rot: 0 }] };
},
function (g, o) {
[-1.4, 0, 1.4].forEach(function (x, i) { var h = new THREE.Group(); h.position.set(x, 0, (i % 2) * 0.6); h.rotation.y = i * 0.4 - 0.4; g.add(h); CT_SHAPES.chest(h, {}); });
for (var k = 0; k < 20; k++)
ctAdd(g, ctCyl(0.08, 0.08, 0.03, 8), 0xD8B048, Math.sin(k) * 1.8, 0.02, 1 + Math.cos(k * 1.7) * 0.6);
return { r: 2.4, s: [{ x: 0, z: 0, hw: 2, hd: 0.6, h: 1, rot: 0 }] };
},
function (g, o) {
var c = o.col || 0xA82A1A;
[-5, -1.8, 1.8, 5].forEach(function (x) { ctAdd(g, ctCyl(0.35, 0.4, 7, 10), c, x, 3.5, 0); });
ctAdd(g, ctBox(12, 0.8, 1.2), 0xD8B048, 0, 7.2, 0);
ctAdd(g, ctBox(13.4, 0.5, 2), 0x2A4A3A, 0, 7.9, 0);
ctAdd(g, ctBox(5, 0.6, 1), 0xD8B048, 0, 9, 0);
ctAdd(g, ctBox(6.4, 0.5, 1.8), 0x2A4A3A, 0, 9.6, 0);
return { r: 7, s: [{ x: -5, z: 0, r: 0.4, h: 7 }, { x: 5, z: 0, r: 0.4, h: 7 }, { x: -1.8, z: 0, r: 0.4, h: 7 }, { x: 1.8, z: 0, r: 0.4, h: 7 }] };
},
function (g, o) {
var c = 0xC8A040;
ctAdd(g, ctBox(4, 1, 2), 0x6A6A64, 0, 0.5, 0);
[-1, 1].forEach(function (sd) { var a = ctAdd(g, new THREE.TorusGeometry(3, 0.35, 8, 14, Math.PI * 0.8), c, sd * 1.6, 4.5, 0, 0, 0, sd > 0 ? -0.3 : Math.PI * 0.2 + 0.3); });
ctAdd(g, ctBox(6.4, 0.4, 0.4), c, 0, 8, 0);
for (var i = 0; i < 7; i++)
ctAdd(g, ctCyl(0.03, 0.03, 6.6, 4), 0xD8D0B0, -1.5 + i * 0.5, 4.6, 0);
ctAdd(g, ctBox(4, 0.8, 0.8), c, 0, 1.4, 0);
return { r: 4, s: [{ x: 0, z: 0, hw: 2, hd: 1, h: 8, rot: 0 }] };
},
function (g, o) {
for (var i = 0; i < 4; i++)
ctAdd(g, ctBox(20, 1, 2), 0x7A5A3A, 0, 0.5 + i, -i * 2);
var Rn = ctRand(5);
for (var k = 0; k < 40; k++) {
var r = Math.floor(Rn() * 4);
ctAdd(g, ctCyl(0.22, 0.22, 0.9, 6), [0xB83A3A, 0x3A5A9A, 0xD8B048, 0x3A7A3A, 0x6A3A8A][k % 5], -9 + Rn() * 18, 1.5 + r, -r * 2);
}
ctAdd(g, ctBox(20.4, 0.3, 9), o.col || 0xB83A3A, 0, 6.6, -3);
[-10, 10].forEach(function (x) { ctAdd(g, ctCyl(0.12, 0.12, 6.6, 6), 0x5A3A20, x, 3.3, 1); });
return { r: 11, s: [{ x: 0, z: -3, hw: 10, hd: 4, h: 5, rot: 0 }] };
},
function (th) {
function q(geo, col, x, y, z, sx, sy, sz, ry) { var m = new THREE.Matrix4(); m.compose(new THREE.Vector3(x || 0, y || 0, z || 0), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry || 0, 0)), new THREE.Vector3(sx || 1, sy || sx || 1, sz || sx || 1)); return { geo: geo, col: col, m: m }; }
function t(geo, col, x, y, z, rx, rz, s) { var m = new THREE.Matrix4(); m.compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, 0, rz || 0)), new THREE.Vector3(s || 1, s || 1, s || 1)); return { geo: geo, col: col, m: m }; }
return {
poppy: { r: 0, s: [0.8, 1.4], p: [q(ctCyl(0.02, 0.02, 0.7, 3), 0x3A7A2A, 0, 0.35, 0), q(ctSph(0.2, 6), 0xC82A2A, 0, 0.72, 0, 1, 0.5, 1), q(ctSph(0.18, 6), 0xB8241E, 0.3, 0.6, 0.2, 1, 0.5, 1), q(ctSph(0.19, 6), 0xC8301E, -0.25, 0.66, -0.2, 1, 0.5, 1)] },
corn: { r: 0, s: [0.9, 1.2], p: [q(ctCyl(0.04, 0.05, 2.4, 4), 0x8AA040, 0, 1.2, 0), q(ctBox(0.9, 0.04, 0.12), 0x7A9A3A, 0.3, 1.4, 0, 1, 1, 1, 0.4), q(ctCyl(0.08, 0.06, 0.4, 5), 0xD8B048, 0.1, 1.9, 0)] },
cardlet: { r: 0.3, s: [0.9, 1.1], p: [q(ctBox(0.9, 1.3, 0.05), 0xE8E2D4, 0, 0.65, 0), q(new THREE.OctahedronGeometry(0.22, 0), 0xB82A2A, 0, 0.65, 0.03, 0.8, 1.1, 0.2)] },
teacup: { r: 0.3, s: [0.8, 1.5], p: [q(ctCyl(0.45, 0.42, 0.06, 12), 0xE8E2D4, 0, 0.03, 0), q(ctCyl(0.32, 0.2, 0.36, 10), 0xE86AA8, 0, 0.24, 0), q(ctTor(0.1, 0.025), 0xE86AA8, 0.33, 0.25, 0)] },
pumpkin: { r: 0.3, s: [0.7, 1.6], p: [q(ctSph(0.5, 10), 0xC8661E, 0, 0.38, 0, 1.2, 0.75, 1.2), q(ctCyl(0.05, 0.07, 0.2, 5), 0x4A6A2A, 0, 0.8, 0)] },
jack: { r: 0.3, s: [0.9, 1.3], p: [q(ctSph(0.5, 10), 0xC8661E, 0, 0.38, 0, 1.2, 0.8, 1.2), q(ctBox(0.4, 0.12, 0.06), 0xF8B040, 0, 0.32, 0.55), q(ctBox(0.1, 0.12, 0.06), 0xF8B040, -0.18, 0.52, 0.53), q(ctBox(0.1, 0.12, 0.06), 0xF8B040, 0.18, 0.52, 0.53)], glow: 1 },
grave: { r: 0.4, s: [0.8, 1.3], p: [q(ctBox(0.8, 1.1, 0.2), 0x6A6A64, 0, 0.55, 0), q(ctCyl(0.4, 0.4, 0.2, 10), 0x6A6A64, 0, 1.1, 0, 1, 1, 1), q(ctBox(0.9, 0.06, 1.6), 0x3A4A2A, 0, 0.03, 0.9)] },
cross: { r: 0.3, s: [0.8, 1.2], p: [q(ctBox(0.18, 2.4, 0.18), 0x5A4A3A, 0, 1.2, 0), q(ctBox(1.1, 0.16, 0.16), 0x5A4A3A, 0, 1.8, 0)] },
crate: { r: 0.6, s: [0.8, 1.2], p: [q(ctBox(1.1, 0.7, 2), 0x5A4030, 0, 0.35, 0), q(ctBox(1.15, 0.08, 2.05), 0x3A2A1E, 0, 0.7, 0)] },
plantern: { r: 0, s: [0.9, 1.2], p: [q(ctCyl(0.03, 0.03, 2.4, 4), 0x2A1A10, 0, 1.2, 0), q(ctSph(0.28, 8), 0xC83A2A, 0, 2.5, 0, 1, 1.3, 1)], glow: 1 },
runes: { r: 0.6, s: [0.8, 1.4], p: [q(ctBox(1.2, 2.6, 0.5), 0x7A7A72, 0, 1.3, 0), q(ctBox(0.7, 0.07, 0.04), 0xA83A2A, 0, 1.6, 0.27), q(ctBox(0.7, 0.07, 0.04), 0xA83A2A, 0, 1.1, 0.27)] },
redweed: { r: 0, s: [0.8, 2.2], p: [t(ctCyl(0.06, 0.1, 1.6, 4), 0x8A1E1A, 0, 0.7, 0, 0.3, 0.2), t(ctCyl(0.05, 0.09, 1.3, 4), 0xA02A1E, 0.3, 0.6, 0.2, -0.4, -0.5), q(ctSph(0.4, 6), 0x7A1A16, 0, 1.2, 0, 1.4, 0.5, 1.4), q(ctSph(0.3, 6), 0x9A2418, 0.4, 0.6, -0.2)] },
cedar: { r: 0.6, s: [0.9, 1.5], p: [q(ctCyl(0.3, 0.45, 10, 6), 0x4A3424, 0, 5, 0), q(ctCyl(2.6, 3.2, 0.6, 8), 0x2A4A2A, 0, 6, 0), q(ctCyl(2, 2.6, 0.6, 8), 0x2A4A2A, 0, 8, 0), q(ctCyl(1.2, 1.8, 0.6, 8), 0x2A4A2A, 0, 10, 0)] },
papyrus: { r: 0, s: [0.8, 1.3], p: [q(ctCyl(0.03, 0.04, 2.2, 4), 0x5A8A3A, 0, 1.1, 0), q(ctCone(0.4, 0.5, 6), 0x6A9A3A, 0, 2.4, 0), q(ctCyl(0.03, 0.04, 1.8, 4), 0x5A8A3A, 0.3, 0.9, 0.2), q(ctCone(0.32, 0.4, 6), 0x6A9A3A, 0.3, 1.95, 0.2)] },
sheep: { r: 0.4, s: [0.9, 1.2], p: [q(ctSph(0.5, 8), 0xD8D2C4, 0, 0.65, 0, 0.8, 0.7, 1.2), q(ctSph(0.2, 7), 0x3A3A3A, 0, 0.8, 0.62, 1, 1, 1.3), q(ctBox(0.4, 0.4, 0.6), 0x3A3A3A, 0, 0.2, 0)] },
blacksheep: { r: 0.4, s: [0.9, 1.2], p: [q(ctSph(0.5, 8), 0x2A2A2A, 0, 0.65, 0, 0.8, 0.7, 1.2), q(ctSph(0.2, 7), 0x1A1A1A, 0, 0.8, 0.62, 1, 1, 1.3), q(ctBox(0.4, 0.4, 0.6), 0x1A1A1A, 0, 0.2, 0)] },
seashell: { r: 0, s: [0.7, 2.2], p: [q(ctCone(0.5, 1.1, 7), 0xD8A898, 0, 0.3, 0, 1, 1, 1), q(ctSph(0.35, 7), 0xC89888, 0.3, 0.15, 0.2, 1, 0.5, 1)] },
anemone: { r: 0, s: [0.8, 1.8], p: [q(ctCyl(0.3, 0.35, 0.5, 8), 0xB85A7A, 0, 0.25, 0), q(ctSph(0.42, 8), 0xD87A9A, 0, 0.6, 0, 1, 0.5, 1)] },
fish: { r: 0, s: [0.8, 1.6], p: [q(ctSph(0.3, 6), 0xD89A3A, 0, 3.4, 0, 0.4, 0.7, 1.2), q(ctSph(0.25, 6), 0x3A8AB8, 1.2, 4.2, 0.5, 0.4, 0.7, 1.2), q(ctSph(0.28, 6), 0xD8D04A, -0.8, 3.9, -0.6, 0.4, 0.7, 1.2)] },
bone: { r: 0, s: [0.7, 1.6], p: [t(ctCyl(0.08, 0.08, 1.4, 5), 0xC8C0A8, 0, 0.08, 0, 0, Math.PI / 2), q(ctSph(0.14, 6), 0xC8C0A8, 0.7, 0.1, 0), q(ctSph(0.14, 6), 0xC8C0A8, -0.7, 0.1, 0)] },
pinman: { r: 0, s: [0.9, 1.1], p: [q(ctCyl(0.03, 0.03, 0.12, 4), 0x3A5AA8, 0, 0.06, 0), q(ctSph(0.025, 5), 0xE8C8A8, 0, 0.14, 0), q(ctCyl(0.03, 0.03, 0.12, 4), 0xB83A3A, 0.2, 0.06, 0.1), q(ctSph(0.025, 5), 0xE8C8A8, 0.2, 0.14, 0.1)] },
tinyhouse: { r: 0, s: [0.8, 1.3], p: [q(ctBox(0.4, 0.3, 0.35), 0xE8DCC0, 0, 0.15, 0), q(ctCone(0.32, 0.25, 4), 0xC83A3A, 0, 0.42, 0, 1, 1, 1, Math.PI / 4)] },
tinytree: { r: 0, s: [0.7, 1.4], p: [q(ctCyl(0.02, 0.03, 0.25, 4), 0x5A3E28, 0, 0.12, 0), q(new THREE.IcosahedronGeometry(0.16, 0), 0x3E8A34, 0, 0.32, 0)] },
moonplant: { r: 0.3, s: [0.7, 1.8], p: [q(ctSph(0.6, 8), 0x7A8A5A, 0, 0.5, 0, 1, 0.8, 1), q(ctCyl(0.06, 0.08, 1.4, 5), 0x6A7A4A, 0.3, 1, 0), q(ctSph(0.25, 7), 0xA88A5A, 0.3, 1.8, 0)] },
asphodel: { r: 0, s: [0.8, 1.3], p: [q(ctCyl(0.02, 0.02, 0.9, 3), 0x5A6A4A, 0, 0.45, 0), q(ctCone(0.08, 0.4, 5), 0xB8B0A8, 0, 0.95, 0), q(ctCone(0.07, 0.32, 5), 0xA8A098, 0.15, 0.8, 0.1)] },
petrified: { r: 0.3, s: [0.95, 1.1], p: [q(ctCyl(0.08, 0.09, 0.86, 6), 0x8A8A84, -0.12, 0.43, 0), q(ctCyl(0.08, 0.09, 0.86, 6), 0x8A8A84, 0.12, 0.43, 0), q(ctCyl(0.21, 0.16, 0.68, 7), 0x8A8A84, 0, 1.2, 0), q(ctSph(0.14, 8), 0x8A8A84, 0, 1.69, 0), t(ctCyl(0.055, 0.06, 0.64, 5), 0x8A8A84, 0.36, 1.62, 0, 0, -2.4)] },
liana: { r: 0.9, s: [0.9, 1.4], p: [q(ctCyl(0.5, 0.9, 16, 6), 0x5A4430, 0, 8, 0), q(new THREE.IcosahedronGeometry(4.2, 0), 0x2E6A26, 0, 16, 0, 1, 0.6, 1), q(ctCyl(0.05, 0.05, 10, 3), 0x3A6A2A, 1.6, 10, 0.6), q(ctCyl(0.05, 0.05, 8, 3), 0x3A6A2A, -1.4, 11, -0.8), q(ctCyl(0.05, 0.05, 12, 3), 0x3A6A2A, 0.4, 9, -1.6)] },
peach: { r: 0.5, s: [0.8, 1.3], p: [q(ctCyl(0.25, 0.35, 2.4, 6), 0x5A3A28, 0, 1.2, 0), q(new THREE.IcosahedronGeometry(1.9, 0), 0x4A8A3A, 0, 3.4, 0), q(ctSph(0.2, 6), 0xE88A6A, 1.2, 3, 0.8), q(ctSph(0.2, 6), 0xE88A6A, -1, 3.6, 1), q(ctSph(0.2, 6), 0xE88A6A, 0.3, 2.7, -1.4)] },
olive: { r: 0.5, s: [0.8, 1.3], p: [q(ctCyl(0.25, 0.4, 2, 6), 0x6A5A48, 0, 1, 0), q(new THREE.IcosahedronGeometry(1.8, 0), 0x6A7A4A, 0, 2.8, 0, 1.2, 0.7, 1.2)] },
footprint: { r: 0, s: [1, 1], p: [q(ctBox(0.14, 0.02, 0.3), 0x4A4A52, -0.12, 0.02, 0), q(ctBox(0.14, 0.02, 0.3), 0x4A4A52, 0.12, 0.02, 0.7)] },
snowpatch: { r: 0, s: [1, 3], p: [q(ctCyl(1.2, 1.4, 0.1, 9), 0xD8DEE6, 0, 0.03, 0)] },
stalag: { r: 0.6, s: [0.8, 2.4], p: [q(ctCone(0.7, 4, 6), 0x5A5060, 0, 2, 0), q(ctCone(0.4, 2.4, 6), 0x6A6070, 0.8, 1.2, 0.3)] },
gasl: { r: 0.25, s: [1, 1], p: [q(ctCyl(0.08, 0.12, 3.6, 6), 0x1A1A1A, 0, 1.8, 0), q(ctBox(0.42, 0.5, 0.42), 0xF8D890, 0, 3.85, 0)], glow: 1 },
candy: { r: 0.2, s: [0.9, 1.3], p: [q(ctCyl(0.12, 0.12, 2.6, 8), 0xE8E2D4, 0, 1.3, 0), q(ctTor(0.3, 0.12), 0xC82A3A, 0.3, 2.6, 0)] },
bluefence: { r: 0, s: [1, 1], p: [q(ctBox(0.12, 1.2, 0.12), 0x3A5AB8, -1, 0.6, 0), q(ctBox(0.12, 1.2, 0.12), 0x3A5AB8, 1, 0.6, 0), q(ctBox(2.2, 0.12, 0.06), 0x3A5AB8, 0, 0.9, 0), q(ctBox(2.2, 0.12, 0.06), 0x3A5AB8, 0, 0.45, 0)] },
rosebush: { r: 0.4, s: [0.8, 1.3], p: [q(ctSph(0.7, 7), 0x2E5A2A, 0, 0.6, 0), q(ctSph(0.15, 6), 0xC82A3A, 0.4, 0.9, 0.3), q(ctSph(0.15, 6), 0xE8E2D4, -0.4, 0.8, 0.2), q(ctSph(0.15, 6), 0xC82A3A, 0, 1.1, -0.3)] },
toadstool: { r: 0.3, s: [0.8, 2.4], p: [q(ctCyl(0.15, 0.2, 0.9, 7), 0xE8E2D4, 0, 0.45, 0), q(new THREE.SphereGeometry(0.6, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2), 0xC82A3A, 0, 0.85, 0, 1, 0.6, 1), q(ctSph(0.08, 5), 0xE8E2D4, 0.25, 1.1, 0.1)] },
lotus: { r: 0, s: [0.8, 1.4], p: [q(ctCyl(0.6, 0.6, 0.04, 9), 0x3A7A3A, 0, 0.04, 0), q(ctCone(0.2, 0.3, 6), 0xE8A8C8, 0.1, 0.18, 0.1)] },
datepalm: { r: 0.4, s: [0.9, 1.3], p: [t(ctCyl(0.25, 0.35, 9, 6), 0x7A6040, 0, 4.5, 0, 0, 0.05), t(ctBox(4.6, 0.08, 0.8), 0x4A7A2A, 1.8, 9, 0, 0, -0.4), t(ctBox(4.6, 0.08, 0.8), 0x4A7A2A, -1.8, 9, 0, 0, 0.4), t(ctBox(0.8, 0.08, 4.6), 0x4A7A2A, 0, 9, 1.8, 0.4, 0), t(ctBox(0.8, 0.08, 4.6), 0x4A7A2A, 0, 9, -1.8, -0.4, 0)] },
reed: { r: 0, s: [0.8, 1.4], p: [q(ctCyl(0.02, 0.03, 2.2, 3), 0x8A9A4A, 0, 1.1, 0), q(ctCyl(0.02, 0.03, 1.8, 3), 0x8A9A4A, 0.2, 0.9, 0.1), q(ctCyl(0.05, 0.05, 0.4, 5), 0x6A4A2A, 0, 2.1, 0)] },
banner: { r: 0.2, s: [1, 1], p: [q(ctCyl(0.06, 0.08, 5, 5), 0x5A3A20, 0, 2.5, 0), q(ctBox(1.2, 2, 0.05), 0xB83A3A, 0.65, 3.9, 0)] },
crystalw: { r: 0.4, s: [0.8, 2], p: [q(new THREE.OctahedronGeometry(0.6, 0), 0x6AA8C8, 0, 1.2, 0, 1, 2.4, 1)] },
icicle: { r: 0.4, s: [0.8, 2], p: [q(ctCone(0.5, 3, 5), 0xA8C8D8, 0, 1.5, 0), q(ctCone(0.3, 2, 5), 0xB8D4E0, 0.6, 1, 0.2)] },
tombstone: { r: 0.4, s: [0.8, 1.2], p: [q(ctBox(0.7, 1.3, 0.25), 0x5A5A58, 0, 0.65, 0, 1, 1, 1, 0.1)] },
lamppost: { r: 0.25, s: [1, 1], p: [q(ctCyl(0.07, 0.1, 4, 6), 0x1A1A1A, 0, 2, 0), q(ctSph(0.3, 8), 0xF0D890, 0, 4.2, 0)], glow: 1 }
};
},
function (G, n, x, z, rot, s, o) {
var fn = CTD_SET[n] || CTS_SET[n];
if (!fn && !CT_SHAPES[n])
return null;
var y = (o && o.fly) ? (o.fly) : ctsGround(x, z), h = new THREE.Group();
h.position.set(x, y - (o && o.sink || 0), z);
h.rotation.y = rot || 0;
G.add(h);
var res = fn ? fn(h, o || {}) : (CT_SHAPES[n](h, o || {}), { r: 3, s: [{ x: 0, z: 0, r: 1.6, h: 3 }] });
s = s || 1;
if (s !== 1)
h.scale.multiplyScalar(s);
if (!res) {
if (!(o && o.fly) && typeof ctnDoor === "function")
ctnDoor(n, x, z, rot, s, y, o);
return h;
}
var cr = Math.cos(rot || 0), sr = Math.sin(rot || 0);
(res.s || []).forEach(function (b) {
var wx = x + (b.x * cr + b.z * sr) * s, wz = z + (-b.x * sr + b.z * cr) * s;
if (b.r !== undefined)
ctsSolid({ x: wx, z: wz, r: b.r * s, h: b.h * s });
else
ctsSolid({ x: wx, z: wz, hw: b.hw * s, hd: b.hd * s, h: b.h * s, rot: (rot || 0) + (b.rot || 0) });
});
if (!res.sky)
CTS.far.push([x, z, (res.r || 3) * s + 3]);
if (!(o && o.fly) && typeof ctnDoor === "function")
ctnDoor(n, x, z, rot, s, y, o);
return h;
},
function (G) {
G.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(G.matrixWorld).invert();
var buckets = {}, kill = [], M = new THREE.Matrix4(), N = new THREE.Matrix3();
G.traverse(function (m) {
if (!m.isMesh || m.isInstancedMesh || Array.isArray(m.material) || m.userData.keep)
return;
var geo = m.geometry;
if (!geo || !geo.attributes || !geo.attributes.position)
return;
var key = m.material.uuid, B = buckets[key] || (buckets[key] = { mat: m.material, pos: [], nor: [], uv: !!m.material.map, uvs: [] });
M.multiplyMatrices(inv, m.matrixWorld);
N.getNormalMatrix(M);
var g2 = geo.index ? geo.toNonIndexed() : geo, P = g2.attributes.position, NN = g2.attributes.normal, U = g2.attributes.uv, v = new THREE.Vector3(), w = new THREE.Vector3();
for (var i = 0; i < P.count; i++) {
v.fromBufferAttribute(P, i).applyMatrix4(M);
B.pos.push(v.x, v.y, v.z);
if (NN) {
w.fromBufferAttribute(NN, i).applyMatrix3(N).normalize();
B.nor.push(w.x, w.y, w.z);
}
else
B.nor.push(0, 1, 0);
if (B.uv)
B.uvs.push(U ? U.getX(i) : 0, U ? U.getY(i) : 0);
}
if (g2 !== geo)
g2.dispose();
kill.push(m);
});
kill.forEach(function (m) { if (m.parent)
m.parent.remove(m); if (m.geometry)
m.geometry.dispose(); });
Object.keys(buckets).forEach(function (k) {
var B = buckets[k];
if (!B.pos.length)
return;
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(B.pos, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(B.nor, 3));
if (B.uv)
g.setAttribute("uv", new THREE.Float32BufferAttribute(B.uvs, 2));
g.computeBoundingSphere();
var mm = new THREE.Mesh(g, B.mat);
mm.frustumCulled = false;
G.add(mm);
});
},
function (g, o) {
var y = o.y || 14;
ctAdd(g, new THREE.TorusGeometry(1.8, 0.28, 8, 20, Math.PI), 0xD8D0C0, 0, y, 0, 0, 0, Math.PI);
for (var i = 0; i < 7; i++)
ctAdd(g, ctBox(0.3, 0.5, 0.1), 0xD8D0C0, -1.5 + i * 0.5, y - 1.2 - Math.sin(i / 6 * Math.PI) * 0.4, 0.1);
[-1, 1].forEach(function (sd) { var e = ctAdd(g, ctSph(0.42, 10), 0xC8B030, sd * 1.4, y + 1.6, 0, 0, 0, 0, 1); e.scale.y = 1.4; ctAdd(g, ctBox(0.1, 0.5, 0.1), 0x1A1A1A, sd * 1.4, y + 1.6, 0.38); });
return { r: 1, s: [], sky: 1 };
},
function (g, o) {
var n = o.n || 9;
for (var i = 0; i < n; i++)
for (var j = 0; j < n; j++) {
var x = (i - (n - 1) / 2) * 1.4, z = (j - (n - 1) / 2) * 1.4;
ctAdd(g, ctCyl(0.05, 0.07, 2.6, 5), 0x8AA040, x, 1.3, z);
ctAdd(g, ctBox(1, 0.05, 0.14), 0x7A9A3A, x + 0.3, 1.5, z, 0, (i + j) * 0.7, 0.2);
ctAdd(g, ctCyl(0.09, 0.07, 0.45, 6), 0xC8A040, x + 0.1, 2.1, z);
}
var w = n * 0.7;
return { r: w + 1, s: [{ x: 0, z: 0, hw: w, hd: w, h: 2.6, rot: 0 }] };
},
function (g, o) {
ctAdd(g, ctBox(16, 9, 6), 0x5A4A40, 0, 4.5, -3);
ctAdd(g, ctBox(16.4, 0.6, 6.4), 0x3A3430, 0, 9.2, -3);
ctAdd(g, ctBox(1.4, 2.6, 0.2), 0x3A2A20, 0, 1.3, 0.02);
ctAdd(g, ctBox(1.6, 0.25, 0.4), 0x6A6A60, 0, 0.12, 0.2);
ctAdd(g, ctBox(0.9, 0.6, 0.05), 0x4A3428, 0.1, 1.6, 0.14, 0, 0, 0.12);
return { r: 9, s: [{ x: 0, z: -3, hw: 8.2, hd: 3.2, h: 9, rot: 0 }] };
},
function (g, o) {
ctAdd(g, ctCyl(0.15, 0.2, 5, 7), 0x5A4028, 0, 2.5, 0);
ctAdd(g, ctBox(2.4, 0.18, 0.18), 0x5A4028, 0, 4.8, 0);
[-0.9, 0.9].forEach(function (x) { var b = ctAdd(g, ctSph(0.32, 10), 0x1A1A20, x, 5.25, 0); b.scale.set(0.8, 0.9, 1.4); ctAdd(g, ctSph(0.18, 8), 0x1A1A20, x, 5.55, 0.35); ctAdd(g, ctCone(0.07, 0.3, 5), 0x3A3A3A, x, 5.55, 0.6, Math.PI / 2, 0, 0); ctAdd(g, ctBox(0.1, 0.05, 0.5), 0x1A1A20, x, 5.2, -0.55, 0.4, 0, 0); });
return { r: 1.4, s: [{ x: 0, z: 0, r: 0.25, h: 5 }] };
},
function (g, o) {
ctAdd(g, ctBox(8, 0.4, 8), 0x6A4A2A, 0, 2.2, 0);
[[-4, -4], [4, -4], [-4, 4], [4, 4]].forEach(function (q) { ctAdd(g, ctBox(0.3, 2.2, 0.3), 0x5A3A20, q[0], 1.1, q[1]); });
for (var i = 0; i < 8; i++)
for (var j = 0; j < 8; j++)
ctAdd(g, ctBox(0.7, 0.25, 0.7), (i + j) % 2 ? 0xC8B890 : 0xA89A78, -3.5 + i, 2.55, -3.5 + j, 0, (i * j) % 3 * 0.3, 0);
for (var k = 0; k < 8; k++) {
ctAdd(g, ctCyl(0.05, 0.05, 1, 5), 0x3A3A3A, -4.5, 2.6, -3.5 + k, 0, 0, Math.PI / 2);
ctAdd(g, ctCyl(0.05, 0.05, 1, 5), 0x3A3A3A, 4.5, 2.6, -3.5 + k, 0, 0, Math.PI / 2);
}
return { r: 5.5, s: [{ x: 0, z: 0, hw: 4.2, hd: 4.2, h: 3, rot: 0 }] };
},
function (g, o) {
CTD_SET.quad(g, { L: 2.4, H: 1.5, col: o.horse || 0x6A5A4A, neck: 0.7, mane: 0x2A2018, saddle: o.col || 0xB83A3A });
var r = ctdSub(g, 0, 1.55, 0.1);
CTD_SET.fig(r, { h: 1.6, col: o.armour || 0x8A8A92, leg: o.armour || 0x8A8A92, arms: "fwd", hat: o.armour || 0x8A8A92 });
ctAdd(g, ctCyl(0.05, 0.07, 4.4, 6), 0x6A5030, 0.35, 3.1, 1.8, Math.PI / 2 - 0.12, 0, 0);
ctAdd(g, ctBox(0.1, 1, 0.8), o.col || 0xB83A3A, -0.45, 2.8, 0.2);
if (o.thin) {
g.children[0].scale.set(0.8, 1, 1);
}
return { r: 2.2, s: [{ x: 0, z: 0, r: 1, h: 3.4 }] };
},
function (th) {
var K = ctdKindsA(th);
function q(geo, col, x, y, z, sx, sy, sz, ry) { var m = new THREE.Matrix4(); m.compose(new THREE.Vector3(x || 0, y || 0, z || 0), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry || 0, 0)), new THREE.Vector3(sx || 1, sy || sx || 1, sz || sx || 1)); return { geo: geo, col: col, m: m }; }
K.cardman = { r: 0.4, s: [0.95, 1.1], p: [q(ctBox(2.2, 3, 0.12), 0xE8E2D4, 0, 2.6, 0), q(new THREE.OctahedronGeometry(0.45, 0), 0xB82A2A, 0, 2.6, 0.08, 0.8, 1.1, 0.2), q(ctSph(0.3, 8), 0xE8C8A8, 0, 4.45, 0), q(ctBox(0.12, 1.1, 0.12), 0xB82A2A, -0.4, 0.55, 0), q(ctBox(0.12, 1.1, 0.12), 0xB82A2A, 0.4, 0.55, 0), q(ctCyl(0.04, 0.04, 4.8, 4), 0x6A5030, 1.5, 2.6, 0.1)] };
K.toriik = { r: 0, s: [1, 1], p: [q(ctCyl(0.22, 0.26, 5, 8), 0xB8301A, -3.1, 2.5, 0), q(ctCyl(0.22, 0.26, 5, 8), 0xB8301A, 3.1, 2.5, 0), q(ctBox(8, 0.36, 0.5), 0x1A1A1A, 0, 5.2, 0), q(ctBox(7.2, 0.3, 0.34), 0xB8301A, 0, 4.4, 0)], span: 1 };
K.glyph = { r: 0.6, s: [0.8, 2], p: [q(ctBox(1.2, 4, 0.8), 0x2A3A32, 0, 1.8, 0, 1, 1, 1, 0.3), q(ctBox(0.9, 0.08, 0.05), 0x4A6A5A, 0, 2.4, 0.42)] };
K.jackalk = { r: 0.6, s: [1, 1], p: [q(ctBox(1.2, 1.2, 2.4), 0xB8A070, 0, 0.6, 0), q(ctSph(0.5, 8), 0x2A2A2A, 0, 1.6, 0, 0.7, 0.6, 1.3), q(ctBox(0.35, 0.9, 0.35), 0x2A2A2A, 0, 2.2, 0.6), q(ctBox(0.3, 0.3, 0.6), 0x2A2A2A, 0, 2.6, 0.9), q(ctCone(0.1, 0.35, 4), 0x2A2A2A, 0.1, 2.9, 0.6), q(ctCone(0.1, 0.35, 4), 0x2A2A2A, -0.1, 2.9, 0.6)] };
K.deerk = { r: 0.4, s: [0.9, 1.2], p: [q(ctSph(0.5, 8), 0x8A5A3A, 0, 1.05, 0, 0.7, 0.7, 1.5), q(ctCyl(0.06, 0.06, 1, 5), 0x8A5A3A, 0.2, 0.5, 0.45), q(ctCyl(0.06, 0.06, 1, 5), 0x8A5A3A, -0.2, 0.5, 0.45), q(ctCyl(0.06, 0.06, 1, 5), 0x8A5A3A, 0.2, 0.5, -0.45), q(ctCyl(0.06, 0.06, 1, 5), 0x8A5A3A, -0.2, 0.5, -0.45), q(ctBox(0.22, 0.7, 0.22), 0x8A5A3A, 0, 1.5, 0.6), q(ctBox(0.24, 0.24, 0.5), 0x8A5A3A, 0, 1.9, 0.8), q(ctCyl(0.03, 0.04, 0.8, 4), 0x5A4A3A, 0.15, 2.3, 0.7), q(ctCyl(0.03, 0.04, 0.8, 4), 0x5A4A3A, -0.15, 2.3, 0.7)] };
K.boulder = { r: 1, s: [1, 3], p: [q(new THREE.DodecahedronGeometry(1.2, 0), 0x6A6460, 0, 0.6, 0, 1, 0.7, 1)] };
K.tulip = { r: 0.5, s: [0.8, 1.3], p: [q(ctCyl(0.25, 0.4, 4, 6), 0x4A3428, 0, 2, 0), q(new THREE.IcosahedronGeometry(2.2, 0), 0xB8602A, 0, 5, 0), q(new THREE.IcosahedronGeometry(1.5, 0), 0xA8481E, 1.1, 4.4, 0.6)] };
K.bannerb = { r: 0.2, s: [1, 1], p: [q(ctCyl(0.06, 0.08, 5, 5), 0x5A3A20, 0, 2.5, 0), q(ctBox(1.2, 2, 0.05), 0x2A4A8A, 0.65, 3.9, 0)] };
K.goldtree = { r: 0.5, s: [0.8, 1.3], p: [q(ctCyl(0.25, 0.35, 2.6, 6), 0x5A3A28, 0, 1.3, 0), q(new THREE.IcosahedronGeometry(2, 0), 0x4A8A3A, 0, 3.6, 0), q(ctSph(0.22, 6), 0xD8B048, 1.2, 3.2, 0.8), q(ctSph(0.22, 6), 0xD8B048, -1, 3.8, 1), q(ctSph(0.22, 6), 0xD8B048, 0.3, 2.9, -1.4)] };
return K;
},
function (id) {
var W = CT_W[id], base = CTS_TH[W && W.th] || CTS_TH.meadow, D = CT_DRESS[id];
if (!D || !D.th && !D.sc && !D.fog)
return base;
var th = Object.assign({}, base, D.th || {});
th.env = Object.assign({}, base.env, (D.th && D.th.env) || {});
th.sc = Object.assign({}, base.sc, D.sc || {});
if (D.fog)
th.env.fogD = base.env.fogD * D.fog;
return th;
},
function (G, P) {
var c = document.createElement("canvas");
c.width = c.height = 256;
var x = c.getContext("2d");
function hx(n) { return "#" + ("00000" + ctsCap(n, 0xB0).toString(16)).slice(-6); }
x.fillStyle = hx(P.b || 0x6A6A64);
x.fillRect(0, 0, 256, 256);
if (P.k === "checker") {
var n = P.n || 8, w = 256 / n;
x.fillStyle = hx(P.a);
for (var i = 0; i < n; i++)
for (var j = 0; j < n; j++)
if ((i + j) % 2)
x.fillRect(i * w, j * w, w, w);
}
else if (P.k === "bricks") {
x.fillStyle = hx(P.a);
for (var r = 0; r < 16; r++)
for (var q = -1; q < 5; q++)
x.fillRect(q * 64 + (r % 2) * 32 + 2, r * 16 + 2, 60, 12);
}
else if (P.k === "cobble") {
x.fillStyle = hx(P.a);
for (var a = 0; a < 10; a++)
for (var b = 0; b < 10; b++) {
x.beginPath();
x.ellipse(a * 25.6 + 12.8 + (b % 2) * 6, b * 25.6 + 12.8, 11, 10, 0, 0, 6.283);
x.fill();
}
P.rep = P.rep || 9;
}
else if (P.k === "tiles") {
x.fillStyle = hx(P.a);
for (var t = 0; t < 8; t++)
for (var u = 0; u < 8; u++) {
x.save();
x.translate(t * 32 + 16, u * 32 + 16);
x.rotate(0.785);
x.fillRect(-10, -10, 20, 20);
x.restore();
}
}
else if (P.k === "rings") {
P.rep = P.rep || 6;
for (var k = 8; k > 0; k--) {
x.fillStyle = hx(k % 2 ? P.a : P.b);
x.beginPath();
x.arc(128, 128, k * 16, 0, 6.283);
x.fill();
}
}
var tex = new THREE.CanvasTexture(c);
tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
tex.repeat.set(P.rep || 3, P.rep || 3);
var m = new THREE.Mesh(new THREE.CircleGeometry(P.R || 15, 40), new THREE.MeshLambertMaterial({ map: tex, polygonOffset: true, polygonOffsetFactor: -3 }));
m.rotation.x = -Math.PI / 2;
m.position.set(0, CTS.y0 + 0.09, 20);
m.userData.keep = 1;
G.add(m);
},
function (G, pts, w, col, dy, op) {
var pos = [], idx = [], vi = 0;
for (var i = 0; i < pts.length - 1; i++) {
var A = pts[i], B = pts[i + 1], d = Math.hypot(B.x - A.x, B.z - A.z), n = Math.max(2, Math.ceil(d / 8)), nx = -(B.z - A.z) / d, nz = (B.x - A.x) / d;
for (var j = (i ? 1 : 0); j <= n; j++) {
var t = j / n, x = A.x + (B.x - A.x) * t, z = A.z + (B.z - A.z) * t;
[-w / 2, w / 2].forEach(function (o) { var px = x + nx * o, pz = z + nz * o; pos.push(px, ctsGround(px, pz) + (dy || 0.12), pz); });
if (vi > 0) {
idx.push(vi - 2, vi - 1, vi, vi - 1, vi + 1, vi);
}
vi += 2;
}
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setIndex(idx);
g.computeVertexNormals();
var mat = op ? new THREE.MeshPhongMaterial({ color: ctsCap(col, 0xA0), shininess: 50, specular: 0x334455, transparent: true, opacity: op, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 }) : new THREE.MeshLambertMaterial({ color: ctsCap(col, 0xA8), side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 });
var m = new THREE.Mesh(g, mat);
m.userData.keep = 1;
G.add(m);
return m;
},
function (x, z, r) {
var Gq = CTS.gate || { x: 0, z: 8 };
if (Math.hypot(x - Gq.x, z - Gq.z) < r + 6)
return false;
if (Math.hypot(x, z) > CTS.bound - 4)
return false;
for (var i = 0; i < CTS.places.length; i++) {
var p = CTS.places[i];
if (Math.hypot(x - p.x, z - p.z) < p.fr + r + 4)
return false;
}
for (var f = 0; f < CTS.far.length; f++) {
var F = CTS.far[f];
if (Math.hypot(x - F[0], z - F[1]) < F[2] + r)
return false;
}
var P = CTS.pathC || CTS.path;
for (var j = 0; j < P.length - 1; j++) {
var A = P[j], B = P[j + 1], dx = B.x - A.x, dz = B.z - A.z, L2 = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((x - A.x) * dx + (z - A.z) * dz) / L2));
if (Math.hypot(x - (A.x + dx * t), z - (A.z + dz * t)) < r + 3.5)
return false;
}
return true;
},
function (G, e, fa, far) {
var A = e[2], a1 = Math.abs(A) > 16 && !far ? (A > 0 ? 1 : -1) * (16 + (Math.abs(A) - 16) * 0.72) : A;
var n = e[0], d = e[1], a0 = a1 * Math.PI / 180, s = e[3] || 1, o = Object.assign({}, e[4] || {}), fn = CTD_SET[n] || CTS_SET[n];
var R = (o.r || (far ? 40 : 6)) * s, ok = false, x = 0, z = 0, tries = 0;
if (o.sky || o.over) {
x = Math.sin(fa + a0) * d;
z = 20 + Math.cos(fa + a0) * d;
ok = true;
}
while (!ok && tries < 40) {
var da = (tries % 2 ? 1 : -1) * Math.ceil(tries / 2) * (far ? 0.07 : 0.16), dd = d * (1 + (tries > 20 ? 0.15 * (tries - 20) / 20 : 0));
x = Math.sin(fa + a0 + da) * dd;
z = 20 + Math.cos(fa + a0 + da) * dd;
if (Math.hypot(x, z) > CTS.bound - R - 4) {
var k = (CTS.bound - R - 4) / Math.hypot(x, z);
x *= k;
z *= k;
}
ok = ctdFree(x, z, R);
tries++;
}
if (!ok)
return null;
if (o.alt !== undefined)
o.fly = CTS.y0 + o.alt;
if (o.sea)
o.fly = -0.25;
var rot = Math.atan2(0 - x, 20 - z) + (o.turn || 0);
return ctdPut(G, n, x, z, rot, s, o);
},
function (root, E, K, lite) {
var D = K[E.k];
if (!D)
return;
var P = CTS.pathC || [], want = [], acc = E.sp * 0.5, side = 1, max = E.max || 1e9, run = 0, M = new THREE.Matrix4(), Q = new THREE.Matrix4();
for (var i = 0; i < P.length - 1 && run < max; i++) {
var A = P[i], B = P[i + 1], d = Math.hypot(B.x - A.x, B.z - A.z);
if (!d)
continue;
var ux = (B.x - A.x) / d, uz = (B.z - A.z) / d;
while (acc < d && run + acc < max) {
var x = A.x + ux * acc, z = A.z + uz * acc, near = false;
var Gq = CTS.gate || { x: 0, z: 8 };
if (Math.hypot(x - Gq.x, z - Gq.z) < 9)
near = true;
for (var j = 0; j < CTS.places.length && !near; j++) {
var p = CTS.places[j];
if (Math.hypot(x - p.x, z - p.z) < (E.span ? 16 : 12))
near = true;
}
if (!near) {
var o = D.span ? 0 : (E.off || 4.2) * side, px = x - uz * o, pz = z + ux * o;
want.push([px, pz, Math.atan2(ux, uz) + (E.along ? Math.PI / 2 : 0) + (D.span ? 0 : (side > 0 ? 0 : Math.PI))]);
side = -side;
}
acc += E.sp * (lite && !D.span ? 1.5 : 1);
}
acc -= d;
run += d;
}
if (!want.length)
return;
var ims = D.p.map(function (pt) { var im = new THREE.InstancedMesh(pt.geo, ctM(pt.col, D.glow && pt === D.p[D.p.length - 1] ? 1 : 0), want.length); root.add(im); return im; });
want.forEach(function (w, i) {
var y = ctsGround(w[0], w[1]);
Q.compose(new THREE.Vector3(w[0], y - 0.05, w[1]), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, w[2], 0)), new THREE.Vector3(1, 1, 1));
D.p.forEach(function (pt, k) { M.multiplyMatrices(Q, pt.m); ims[k].setMatrixAt(i, M); });
if (D.span) {
var c = Math.cos(w[2]), s = Math.sin(w[2]);
[-3.1, 3.1].forEach(function (lx) { ctsSolid({ x: w[0] + lx * c, z: w[1] - lx * s, r: 0.3, h: 5 }); });
}
else if (D.r)
ctsSolid({ x: w[0], z: w[1], r: D.r, h: 3 });
});
ims.forEach(function (im) { im.instanceMatrix.needsUpdate = true; im.frustumCulled = false; });
},
function (root, lite) {
var D = CT_DRESS[CTS.T.id];
if (!D)
return;
var G = new THREE.Group();
G.name = "ct-dress";
root.add(G);
var fa = CTS.fa;
if (D.plaza)
ctdPlaza(G, D.plaza);
(D.water || []).forEach(function (w) {
var a = fa + (w.a !== undefined ? w.a : 90) * Math.PI / 180, off = w.off || 60, ox = Math.sin(a) * off, oz = 20 + Math.cos(a) * off, dx = Math.sin(fa + (w.dir || 0) * Math.PI / 180), dz = Math.cos(fa + (w.dir || 0) * Math.PI / 180), L = w.L || 1100, pts = [];
for (var i = 0; i <= 24; i++) {
var t = (i / 24 - 0.5) * 2 * L, wob = Math.sin(i * 0.7) * (w.wob !== undefined ? w.wob : 10);
pts.push({ x: ox + dx * t + dz * wob, z: oz + dz * t - dx * wob });
}
pts = pts.filter(function (p) { return Math.hypot(p.x, p.z) < CTS.bound + 40; });
if (pts.length < 2)
return;
if (w.rail) {
ctdRibbon(G, pts, 4, 0x6A5A48, 0.1);
ctdRibbon(G, pts.map(function (p) { return { x: p.x - dz * 0.75, z: p.z + dx * 0.75 }; }), 0.18, 0x3A3A3A, 0.25);
ctdRibbon(G, pts.map(function (p) { return { x: p.x + dz * 0.75, z: p.z - dx * 0.75 }; }), 0.18, 0x3A3A3A, 0.25);
}
else
ctdRibbon(G, pts, w.w || 16, w.col || 0x2A5A7A, 0.14, 0.9);
for (var j = 0; j < pts.length - 1; j += 1) {
var A = pts[j], B = pts[j + 1];
for (var k = 0; k < 4; k++) {
var t2 = k / 4;
CTS.far.push([A.x + (B.x - A.x) * t2, A.z + (B.z - A.z) * t2, (w.w || 8) / 2 + 1]);
}
}
(w.on || []).forEach(function (e, i) { var t = (e[1] || 0), px = ox + dx * t, pz = oz + dz * t; ctdPut(G, e[0], px, pz, Math.atan2(dx, dz) + (e[3] || 0), e[2] || 1, Object.assign({ fly: ctsGround(px, pz) + 0.1 }, e[4] || {})); });
});
(D.hero || []).forEach(function (e) { ctdPlace(G, e, fa, false); });
(D.sky || []).forEach(function (e) { ctdPlace(G, e, fa, true); });
ctdMerge(G);
if (D.edge) {
var K = Object.assign(ctsKinds(CTS.th), ctdKinds(CTS.th));
(Array.isArray(D.edge) ? D.edge : [D.edge]).forEach(function (E) { ctdEdge(root, E, K, lite); });
}
},
function (m, geo) {
if (!m || !m.color || m.map || m.transparent || (m.emissive && (m.emissive.r + m.emissive.g + m.emissive.b) > 0.02))
return null;
var p = geo.parameters || {}, t = geo.type, big = 0;
if (t === "BoxGeometry")
big = Math.max(p.width, p.height, p.depth);
else if (t === "CylinderGeometry")
big = Math.max(p.radiusTop, p.radiusBottom) * 2 + p.height * 0.5;
else if (t === "ConeGeometry")
big = p.radius * 2;
else if (t === "DodecahedronGeometry" || t === "IcosahedronGeometry")
big = p.radius * 2;
else
return null;
if (!(big >= 1.1))
return null;
m.color.getHSL(CTN_HSL);
var h = CTN_HSL.h, s = CTN_HSL.s, l = CTN_HSL.l;
if (l < 0.06)
return null;
var rock = t === "DodecahedronGeometry" || t === "IcosahedronGeometry";
if (rock)
return s < 0.35 && !(h > 0.2 && h < 0.45 && s > 0.2) ? "stone" : null;
if (t === "ConeGeometry" && l < 0.5 && big >= 2.4)
return (h < 0.05 || h > 0.95) && s > 0.35 ? "tile" : (s < 0.18 ? "slate" : "shingle");
if (h >= 0.025 && h <= 0.12 && s >= 0.28 && l <= 0.42)
return "wood";
if ((h < 0.045 || h > 0.96) && s >= 0.28 && s <= 0.7 && l >= 0.18 && l <= 0.48 && t === "BoxGeometry" && big >= 3 && p.height >= 2.4 && Math.min(p.width, p.depth) >= 0.3)
return "brick";
if (s < 0.2 && l < 0.62)
return "stone";
if (h >= 0.07 && h <= 0.17 && s >= 0.2 && s <= 0.62 && l >= 0.38 && l <= 0.78 && big >= 3)
return "stone";
if (s < 0.42 && l >= 0.62)
return "plaster";
return null;
},
function (geo) {
if (geo.userData && geo.userData.ctnUV)
return geo;
var p = geo.parameters || {}, c = geo.clone();
c.parameters = Object.assign({}, p);
if (typeof metreUVs === "function") {
if (geo.type === "BoxGeometry")
metreUVs(c, "box", [p.width, p.height, p.depth]);
else if (geo.type === "CylinderGeometry")
metreUVs(c, "cyl", [p.radiusTop, p.radiusBottom, p.height]);
else if (geo.type === "ConeGeometry")
metreUVs(c, "cone", [p.radius, p.height]);
else
metreUVs(c, "ico", [p.radius]);
}
c.userData.ctnUV = 1;
return c;
},
function (G) {
if (typeof texOf !== "function" || !CTN_MS)
return;
(function walk(o, plain) {
if (o.userData && (o.userData.ctnPlain || o.userData.ctKeep))
plain = true;
if (o.isMesh && !o.isInstancedMesh && !plain && !Array.isArray(o.material) && CTN_MS.has(o.material) && o.geometry && !o.userData.keep) {
var k = ctnKind(o.material, o.geometry);
if (k) {
var key = o.material.uuid + "|" + k, tm = CTN_TM[key];
if (!tm) {
var tx = ctnTex(k);
if (tx) {
tm = new THREE.MeshLambertMaterial({ color: o.material.color.clone(), map: tx });
tm.userData.ldShared = 1;
tm.userData.ctn = 1;
CTN_TM[key] = tm;
}
}
if (tm) {
o.geometry = ctnMetre(o.geometry);
o.material = tm;
}
}
}
for (var i = 0; i < o.children.length; i++)
walk(o.children[i], plain);
})(G, false);
},
function (G) {
G.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(G.matrixWorld).invert(), buckets = {}, kill = [], M = new THREE.Matrix4(), N = new THREE.Matrix3(), v = new THREE.Vector3(), w = new THREE.Vector3();
G.traverse(function (m) {
if (!m.isMesh || m.isInstancedMesh || Array.isArray(m.material) || m.userData.keep)
return;
var geo = m.geometry, mt = m.material;
if (!geo || !geo.attributes || !geo.attributes.position)
return;
var vc = (mt.isMeshLambertMaterial || mt.isMeshToonMaterial) && !mt.transparent && !mt.vertexColors && !(mt.emissive && (mt.emissive.r + mt.emissive.g + mt.emissive.b) > 0.02) && (!mt.map || mt.userData.ctn);
var key = vc ? ("vc|" + (mt.map ? mt.map.uuid : "-")) : mt.uuid, B = buckets[key] || (buckets[key] = { vc: vc, mat: mt, map: vc ? mt.map : null, pos: [], nor: [], col: [], uv: !!mt.map, uvs: [] });
M.multiplyMatrices(inv, m.matrixWorld);
N.getNormalMatrix(M);
var g2 = geo.index ? geo.toNonIndexed() : geo, P = g2.attributes.position, NN = g2.attributes.normal, U = g2.attributes.uv, c = mt.color;
for (var i = 0; i < P.count; i++) {
v.fromBufferAttribute(P, i).applyMatrix4(M);
B.pos.push(v.x, v.y, v.z);
if (NN) {
w.fromBufferAttribute(NN, i).applyMatrix3(N).normalize();
B.nor.push(w.x, w.y, w.z);
}
else
B.nor.push(0, 1, 0);
if (vc)
B.col.push(c.r, c.g, c.b);
if (B.uv)
B.uvs.push(U ? U.getX(i) : 0, U ? U.getY(i) : 0);
}
if (g2 !== geo)
g2.dispose();
kill.push(m);
});
kill.forEach(function (m) { if (m.parent)
m.parent.remove(m); if (m.geometry)
m.geometry.dispose(); });
Object.keys(buckets).forEach(function (k) {
var B = buckets[k];
if (!B.pos.length)
return;
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(B.pos, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(B.nor, 3));
if (B.uv)
g.setAttribute("uv", new THREE.Float32BufferAttribute(B.uvs, 2));
var mat = B.mat;
if (B.vc) {
g.setAttribute("color", new THREE.Float32BufferAttribute(B.col, 3));
var mk = "vc|" + (B.map ? B.map.uuid : "-");
mat = CTN_TM[mk] || (CTN_TM[mk] = new THREE.MeshLambertMaterial({ vertexColors: true, map: B.map || null }));
mat.userData.ldShared = 1;
mat.userData.ctn = 1;
}
g.computeBoundingSphere();
var mm = new THREE.Mesh(g, mat);
mm.frustumCulled = false;
G.add(mm);
});
},
function (G, x, z, rot, o, seed) {
var look = Object.assign({}, CTN_DRESS[o.folk] || {}, o.look || {}), fo = { look: look };
if (o.sex)
fo.sex = o.sex;
if (o.child || /^kid/.test(o.folk))
fo.child = 1;
var g = typeof wPerson === "function" ? wPerson("ctn_" + seed, fo) : null;
if (!g)
return;
g.position.set(x, ctsGround(x, z) + (o.alt || 0), z);
g.rotation.y = rot;
g.userData.ctKeep = 1;
G.add(g);
},
function (G, x, z, rot, o, seed) {
var g = build({ id: "ctn_" + seed, archetype: o.beast, label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, hub: true, look: o.look || undefined });
if (!g)
return;
var k = (o.s || 1) * (seed && o.sz || 1);
if (k !== 1)
g.scale.multiplyScalar(k);
g.position.set(x, ctsGround(x, z) + (o.alt || 0), z);
g.rotation.y = rot;
g.userData.ctKeep = 1;
G.add(g);
},
function (x, z, r, own) {
var Gq = CTS.gate || { x: 0, z: 8 };
if (Math.hypot(x - Gq.x, z - Gq.z) < r + 8)
return false;
if (Math.hypot(x, z - 20) < r + 16)
return false;
if (Math.hypot(x, z) > CTS.bound - r - 6)
return false;
var O = CTS.occ || [];
for (var i = 0; i < O.length; i++) {
var q = O[i];
if (Math.hypot(x - q[0], z - q[1]) < q[2] + r + 1.5)
return false;
}
for (var f = 0; f < CTS.far.length; f++) {
var F = CTS.far[f];
if (Math.hypot(x - F[0], z - F[1]) < F[2] + r)
return false;
}
for (var j = 0; j < CTS.places.length; j++) {
var p = CTS.places[j];
if (p !== own && Math.hypot(x - p.x, z - p.z) < 14 + r)
return false;
}
if (own && Math.hypot(x - own.x, z - own.z) < 9 + r)
return false;
var P = CTS.pathC || CTS.path;
for (var k = 0; k < P.length - 1; k++) {
var A = P[k], B = P[k + 1], dx = B.x - A.x, dz = B.z - A.z, L2 = dx * dx + dz * dz || 1, t = Math.max(0, Math.min(1, ((x - A.x) * dx + (z - A.z) * dz) / L2));
if (Math.hypot(x - (A.x + dx * t), z - (A.z + dz * t)) < r + 3.2)
return false;
}
return true;
},
function (e) {
e = ctnNorm(e);
var n = e[0], s = e[3] || 1, o = e[4] || {};
if (o.r)
return o.r * s;
if (o.folk)
return 0.6;
if (o.beast)
return 1.4 * s;
if (o.k)
return Math.max(1.5, ctKitSize(n) * 0.55) * s;
var t = { cottage: 6, village: 20, manor: 12, castle: 26, tower: 6, hall: 16, temple: 14, egtemple: 16, pyramid: 32, palace: 18, pagoda: 8, church: 13, ship: 17, wreck: 17, cave: 18, cliff: 28, arch: 8, bridge: 16, ruins: 12,
bigtree: 10, mushrooms: 11, tents: 13, street: 26, lighthouse: 6, crater: 14, obelisk: 3, spires: 12, garden: 13, pool: 12, dome: 7, wall: 27, hut: 4, mound: 12, dock: 12, throne: 5, stage: 11, windmills: 14, camp: 4, igloo: 6, rocket: 5, tripod: 9,
house: 6, tree: 5, boat: 6, fig: 0.7, quad: 2, knight: 2, wolf: 1.4, deer: 1.4, bull: 2, camel: 2, elephant: 3.6, well: 2, haystack: 3, barrels: 2.4, cannon: 1.6, banner: 1, runestone: 1.2, cross: 0.6, gaslamp: 0.5, lanterns: 3.2, torii: 3.6, stones: 11,
potfire: 2, cabin: 5, stockade: 13, observatory: 7, burnt: 6, colossus: 4, jackal: 1.8, treasure: 2.6, bones: 4, skullrock: 11, farmhouse: 5, harehouse: 6, paifang: 7, biglyre: 3, shell: 2, stands: 10, card: 1.4, teapot: 2.6, teacup: 1.6, tophat: 1.8,
watch: 3.4, carpet: 3.6, oillamp: 3, jars: 5, egg: 4, coach: 3, hansom: 2.4, pillarbox: 0.6, sledge: 2.2, chariot: 2.4, nest: 2.6, drum: 9, clam: 3, diver: 0.6, swordstone: 2.4, roundtable: 8, pavilion: 3.6, cragcastle: 40, haystack2: 3,
cornfield: 8, ravenpost: 1.4, earthboxes: 4.5, crookedhouse: 5, goatpair: 1.6, pegasus: 2, cerberus: 2.4, sleipnir: 2.4, stego: 4, mastodon: 3.6, lake: 20, chainedrock: 6, idol: 3, porcelain: 24, morlockwell: 2.4, briar: 24, cointree: 2.4,
tallclock: 2, braidtower: 5, shoe: 8, carousel: 7, bremen: 2, squid: 6, seamonster: 12, mooncalf: 5, shaftcap: 7, hammer: 3, runes: 1, gingerhut: 6, pighouse: 5, humptywall: 5, tinytown: 10, gulliver: 8, iguanodon: 5, cavorsphere: 4, obshut: 5,
feasttable: 5, labbench: 3, innsign: 2, pumpkins: 4, churchbridge: 9, iceslabs: 9, emeraldgate: 5, scarecrowpost: 1.5, flamemount: 12, telescope: 2.4, cylinder: 7, cavedoor: 4, tablets: 3, columbiad: 10, timemachine: 2.5, whitesphinx: 8, scales: 3,
stonelantern: 1, shrinegate: 4, target: 1.6, lakeshore: 10, kidsflowers: 4, workbench: 2.4, bowls: 2, campfire: 2, mushroomgrove: 10, icepalace: 18, roses: 4, chest: 1.2, skeletonpointer: 2.4, chandelier: 3, clueTable: 2.4, armchairs: 2.6,
wagerboard: 2, teatable: 5, rabbithole: 3, croquet: 6, mirrorshield: 1.6, nautilus: 16, coralgarden: 9, idolstone: 2.4, ape: 1.4, horseman: 2, humpty: 1.4, cricket: 0.6, gulliverhead: 3, longnose: 1, cushions: 3, cardman: 1.4,
ziggurat: 28, city: 70, mountain: 120, hand: 20, staff: 3, atlas: 70, opera: 28, clocktower: 9, bigdome: 32, falls: 40, ironclad: 6, steamer: 7, train: 5, globe: 3.4, balloon: 6, dogfish: 9, hadesgate: 18, shieldhall: 22, archbridge: 10,
plateau: 140, pinnacle: 7, seapalace: 20, hull: 2, rlyeh: 70, floatisle: 90, bigfungus: 16, tinyfleet: 9, tinypalace: 4, fuji: 200, iceship: 18, rosebox: 9, stonemen: 11, atlas2: 1, skydisc: 1, bifrost: 10, blindwall: 9, engine: 6, lakesword: 16, flowerbed: 6, sheep: 1, bamboo: 3, redweedpatch: 8 }[n];
return (t || 4) * s;
},
function (G, KG, e, x, z, rot, seed) {
e = ctnNorm(e);
var n = e[0], s = e[3] || 1, o = e[4] || {};
if (o.folk) {
CTS.folk.push({ x: x, z: z, rot: rot, o: o, seed: seed });
return;
}
if (o.beast) {
CTS.folk.push({ x: x, z: z, rot: rot, o: o, seed: seed, beast: 1, s: s });
return;
}
if (o.k) {
if (typeof KIT === "undefined" || !KIT[n] || typeof build !== "function")
return;
var m = build({ id: "ctn_" + n + "_" + seed, archetype: n, label: null, attrs: o.attrs || {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: true, hub: true, look: o.look || undefined });
if ((n === "flowers" || n === "grass") && s > 1.4)
s = 1.4;
if (!m)
return;
var y = ctsGround(x, z);
m.position.set(x, y, z);
m.rotation.y = rot;
if (s !== 1)
m.scale.multiplyScalar(s);
KG.add(m);
var r = Math.min(ctKitSize(n) * 0.42, 6) * s;
if (r > 0.5 && !o.walk)
ctsSolid({ x: x, z: z, r: r, h: 6 * s });
return;
}
var opt = Object.assign({}, o);
if (o.alt !== undefined)
opt.fly = ctsGround(x, z) + o.alt;
ctdPut(G, n, x, z, rot, s, opt);
},
function (root, p, list, lite) {
var c = Math.cos(p.face), s = Math.sin(p.face), G = new THREE.Group(), KG = new THREE.Group();
G.name = "ct-scene-" + p.k;
root.add(G);
root.add(KG);
var made = 0, cap = lite ? 10 : 99, at = [];
list.forEach(function (e, i) {
e = ctnNorm(e);
var o = e[4] || {}, n = CTN_OWN_N[e[0]] ? 1 : (o.n || 1);
if (lite && o.lo)
return;
if (o.at !== undefined) {
var A = at[o.at];
if (!A)
return;
var off = e[1] || 0, ob = (e[2] || 0) * Math.PI / 180, x0 = A[0] + Math.sin(ob) * off, z0 = A[1] + Math.cos(ob) * off;
var oo = Object.assign({}, o);
if (oo.alt === undefined)
oo.alt = 0.12;
oo.r = 0.1;
var e2 = [e[0], 0, 0, e[3], oo];
ctnPut(G, KG, e2, x0, z0, Math.atan2(p.x - x0, p.z - z0) + (o.turn || 0) * Math.PI / 180, CTS.T.id + "_" + p.k + "_" + i);
at[i] = [x0, z0];
return;
}
for (var j = 0; j < n && made < cap; j++) {
var b = e[2] + (o.arc ? (j - (n - 1) / 2) * o.arc : 0), d = e[1], R = ctnR(e), ok = false, x = 0, z = 0, tries = 0, gap = o.gap || (R * 2 + 1.5), lat = o.arc ? 0 : (j - (n - 1) / 2) * gap;
while (!ok && tries < 24) {
var bb = (b + (tries % 2 ? 1 : -1) * Math.ceil(tries / 2) * (tries > 12 ? 14 : 7)) * Math.PI / 180, dd = d * (1 + (tries > 16 ? (tries - 16) * 0.05 : 0));
var lx = Math.sin(bb) * dd + Math.cos(bb) * lat, lz = -Math.cos(bb) * dd + Math.sin(bb) * lat;
x = p.x + lx * c + lz * s;
z = p.z - lx * s + lz * c;
ok = ctnFree(x, z, R, p);
tries++;
}
if (!ok)
continue;
var rot = o.face !== undefined ? p.face + o.face * Math.PI / 180 : Math.atan2(p.x - x, p.z - z) + (o.turn || 0) * Math.PI / 180;
ctnPut(G, KG, e, x, z, rot, CTS.T.id + "_" + p.k + "_" + i + "_" + j);
if (!j)
at[i] = [x, z];
if (!o.folk && !o.beast)
CTS.occ.push([x, z, R]);
made++;
}
});
ctdMerge(G);
G.children.forEach(function (m) { if (m.isMesh && m.geometry) {
m.geometry.computeBoundingSphere();
m.frustumCulled = true;
} });
},
function (root, list, lite) {
var G = new THREE.Group(), KG = new THREE.Group();
G.name = "ct-between";
root.add(G);
root.add(KG);
var P = CTS.places, R0 = ctRand(CTS.seed * 17 + 5);
for (var k = 0; k < P.length - 1; k++) {
if (lite && k % 2)
continue;
var A = P[k], B = P[k + 1], mx = (A.x + B.x) / 2, mz = (A.z + B.z) / 2, dir = Math.atan2(B.x - A.x, B.z - A.z), L = Math.hypot(B.x - A.x, B.z - A.z);
if (L < 120)
continue;
var pick = list.slice(), start = Math.floor(R0() * pick.length);
for (var q = 0; q < Math.min(pick.length, lite ? 3 : 6); q++) {
var e = ctnNorm(pick[(start + q) % pick.length]), o = e[4] || {}, Rr = ctnR(e), side = q % 2 ? 1 : -1, along = (q - 2.5) * L * 0.12, ok = false, x = 0, z = 0, tries = 0;
while (!ok && tries < 14) {
var off = (e[1] || 24) + tries * 5, ax = Math.sin(dir), az = Math.cos(dir);
x = mx + ax * along + az * off * side;
z = mz + az * along - ax * off * side;
ok = ctnFree(x, z, Rr, null);
tries++;
}
if (!ok)
continue;
ctnPut(G, KG, e, x, z, Math.atan2(mx - x, mz - z) + (o.turn || 0) * Math.PI / 180, CTS.T.id + "_m" + k + "_" + q);
if (!o.folk && !o.beast)
CTS.occ.push([x, z, Rr]);
}
}
ctdMerge(G);
},
function (p) {
if (!p.g)
return;
p.g.updateMatrixWorld(true);
var c = Math.cos(p.face), s = Math.sin(p.face), B = new THREE.Box3(), V = new THREE.Vector3();
p.g.children.forEach(function (h) {
if (!h.isGroup && !h.isMesh)
return;
B.setFromObject(h);
if (B.isEmpty())
return;
B.getSize(V);
var r = Math.max(V.x, V.z) / 2;
if (r > 200)
return;
var lx = h.position.x, lz = h.position.z;
CTS.occ.push([p.x + lx * c + lz * s, p.z - lx * s + lz * c, Math.max(1.5, r * 0.85)]);
});
CTS.occ.push([p.x, p.z, 4]);
},
function (g, o) {
var R = ctRand(77);
for (var i = 0; i < 22; i++) {
var a = R() * 6.283, r = Math.sqrt(R()) * 7, h = 1 + R() * 2.6;
ctAdd(g, ctCone(0.35 + R() * 0.3, h, 5), 0x8A2A20, Math.sin(a) * r, h / 2, Math.cos(a) * r, (R() - 0.5) * 0.5, 0, (R() - 0.5) * 0.5);
if (i % 3 === 0)
ctAdd(g, ctSph(0.5, 7), 0x6A1E18, Math.sin(a) * r, 0.3, Math.cos(a) * r);
}
return { r: 8, s: [] };
},
function (g, o) {
var R = ctRand(91);
for (var i = 0; i < 14; i++) {
var a = R() * 6.283, r = Math.sqrt(R()) * 2.4, h = 6 + R() * 5, x = Math.sin(a) * r, z = Math.cos(a) * r;
ctAdd(g, ctCyl(0.09, 0.12, h, 6), 0x6A8A3A, x, h / 2, z, (R() - 0.5) * 0.1, 0, (R() - 0.5) * 0.1);
for (var k = 0; k < 3; k++)
ctAdd(g, ctBox(1.4, 0.04, 0.3), 0x4A8A34, x, h * (0.6 + k * 0.14), z, 0, R() * 6, 0.3);
}
return { r: 3, s: [{ x: 0, z: 0, r: 2, h: 8 }] };
},
function (x, z, kn) {
var small = kn === "flower" || kn === "fern" || kn === "kelp";
if (Math.hypot(x, z - 20) < (small ? 14 : 34))
return false;
for (var i = 0; i < CTS.places.length; i++) {
var p = CTS.places[i];
if (Math.hypot(x - p.x, z - p.z) < (small ? 8 : 14))
return false;
}
var O = CTS.occ || [];
for (var q = 0; q < O.length; q++) {
var o = O[q];
if (Math.hypot(x - o[0], z - o[1]) < o[2] + (small ? 0.5 : 2.5))
return false;
}
for (var f = 0; f < CTS.far.length; f++) {
var F = CTS.far[f];
if (Math.hypot(x - F[0], z - F[1]) < F[2])
return false;
}
var P = CTS.path;
for (var j = 0; j < P.length - 1; j++) {
var A = P[j], B = P[j + 1], dx = B.x - A.x, dz = B.z - A.z, L2 = dx * dx + dz * dz, t = Math.max(0, Math.min(1, ((x - A.x) * dx + (z - A.z) * dz) / L2));
if (Math.hypot(x - (A.x + dx * t), z - (A.z + dz * t)) < (small ? 3 : 20))
return false;
}
return true;
},
function (g, o) {
var R = ctRand(ctHash("fb" + (o.col || 0))), n = o.fl || 70, Rr = o.R || 6, mix = [0xC82A3A, 0xD8B048, 0xC84A8A, 0x6A4AC8, 0xE87A2A, 0xD8D0C0];
for (var i = 0; i < n; i++) {
var a = R() * 6.283, r = Math.sqrt(R()) * Rr, x = Math.sin(a) * r, z = Math.cos(a) * r, h = 0.35 + R() * 0.45;
ctAdd(g, ctCyl(0.025, 0.03, h, 4), 0x3A7A2A, x, h / 2, z);
ctAdd(g, ctSph(0.13 + R() * 0.06, 6), o.col || mix[i % mix.length], x, h + 0.05, z);
if (i % 4 === 0)
ctAdd(g, ctBox(0.3, 0.03, 0.12), 0x4A8A34, x, h * 0.4, z, 0, R() * 6, 0.4);
}
return { r: Rr, s: [] };
},
function (col) {
var t = ctuLeafTex();
if (col === undefined) {
if (CTU.lm)
return CTU.lm;
CTU.lm = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, vertexColors: true, map: t, alphaTest: 0.42, side: THREE.DoubleSide });
CTU.lm.userData.ldShared = 1;
CTU.lm.userData.noPhoto = 1;
return CTU.lm;
}
if (CTU.lmc[col])
return CTU.lmc[col];
var m = new THREE.MeshLambertMaterial({ color: ctsCap(ctuMul(col, 1.3), 0xC0), map: t, alphaTest: 0.42, side: THREE.DoubleSide });
m.userData.ldShared = 1;
m.userData.noPhoto = 1;
return (CTU.lmc[col] = m);
},
function (m, geo) {
var mt = m.material;
if (!mt || Array.isArray(mt) || !mt.color || mt.map || mt.transparent || (mt.emissive && (mt.emissive.r + mt.emissive.g + mt.emissive.b) > 0.02))
return null;
if (!CTN_MS || !CTN_MS.has(mt))
return null;
var t = geo.type, p = geo.parameters || {};
mt.color.getHSL(CTU_HSL);
var h = CTU_HSL.h, s = CTU_HSL.s, l = CTU_HSL.l;
var green = h > 0.15 && h < 0.47 && s > 0.14 && l > 0.08 && l < 0.5, bloom = (h > 0.88 || h < 0.02) && s > 0.3 && l > 0.55 && l < 0.9, autumn = h > 0.03 && h < 0.12 && s > 0.45 && l > 0.3 && l < 0.55;
if (t === "IcosahedronGeometry" && p.radius >= 0.5 && (green && s < 0.62 || bloom || autumn))
return "ball";
if (t === "SphereGeometry" && p.radius >= 0.6 && green && s < 0.55 && !(p.thetaLength < 3) && !(p.phiLength < 6))
return "ball";
if (t === "ConeGeometry" && p.radius >= 0.8 && p.radialSegments >= 5 && green && s < 0.48 && l < 0.42)
return "cone";
if (t === "CylinderGeometry" && green && s < 0.5 && Math.max(p.radiusTop, p.radiusBottom) >= 1.2 && p.height < Math.max(p.radiusTop, p.radiusBottom) * 0.35)
return "disc";
return null;
},
function (B, shape, p, col, M, lite, seed) {
var R = ctRand(seed || 7), r, hh = 0, n, size;
if (shape === "cone") {
r = p.radius;
hh = p.height;
}
else if (shape === "disc") {
r = Math.max(p.radiusTop, p.radiusBottom);
hh = p.height;
}
else
r = p.radius;
var sc = M ? new THREE.Vector3().setFromMatrixScale(M) : new THREE.Vector3(1, 1, 1), rr = r * (sc.x + sc.z) / 2;
if (shape === "cone")
n = Math.round(10 + rr * 2.2 + hh * sc.y * 1.2);
else if (shape === "disc")
n = Math.round(8 + rr * 1.8);
else
n = Math.round(8 + rr * 2.6);
n = Math.max(8, Math.min(shape === "ball" ? 44 : 40, n));
if (lite)
n = Math.max(6, Math.round(n * 0.55));
size = shape === "ball" ? r * 0.95 : shape === "disc" ? r * 0.7 : Math.max(r * 0.75, hh * 0.28);
var N = M ? new THREE.Matrix3().getNormalMatrix(M) : null, v = new THREE.Vector3(), w = new THREE.Vector3(), c = new THREE.Color(col);
var base = new THREE.Color(ctsCap(ctuMul(col, 1.32), 0xC4));
for (var i = 0; i < n; i++) {
var cx, cy, cz, nx, ny, nz, ax, ay = R() * 6.283;
if (shape === "ball") {
var u = R() * 2 - 0.7, th = R() * 6.283, q = Math.sqrt(Math.max(0, 1 - u * u)), f = 0.5 + 0.5 * Math.sqrt(R());
u = Math.max(-1, Math.min(1, u));
nx = q * Math.cos(th);
ny = u;
nz = q * Math.sin(th);
cx = nx * r * f;
cy = ny * r * f;
cz = nz * r * f;
ax = (R() - 0.5) * 1.4;
}
else if (shape === "cone") {
var tt = Math.pow(R(), 0.85) * 0.92, rad = r * (1 - tt) * (0.8 + 0.32 * R()), an = R() * 6.283;
cx = Math.cos(an) * rad;
cz = Math.sin(an) * rad;
cy = -hh / 2 + tt * hh;
nx = Math.cos(an);
ny = 0.5;
nz = Math.sin(an);
ay = -an + Math.PI / 2;
ax = 0.9 + R() * 0.5;
}
else {
var rd = Math.sqrt(R()) * r, ag = R() * 6.283;
cx = Math.cos(ag) * rd;
cz = Math.sin(ag) * rd;
cy = (R() - 0.5) * Math.max(hh, r * 0.12);
nx = Math.cos(ag) * 0.4;
ny = 1;
nz = Math.sin(ag) * 0.4;
ax = 1.2 + (R() - 0.5) * 0.5;
}
var sz = size * (0.75 + 0.45 * R()), hs = sz / 2, ca = Math.cos(ay), sa = Math.sin(ay), cb = Math.cos(ax), sb = Math.sin(ax);
var ux = ca, uy = 0, uz = -sa, vx = sa * sb, vy = cb, vz = ca * sb;
var k = 0.78 + 0.22 * ((ny + 1) / 2) + (R() - 0.5) * 0.16;
c.copy(base).multiplyScalar(k);
var nl = Math.hypot(nx, ny, nz) || 1;
nx /= nl;
ny /= nl;
nz /= nl;
var Q = [[-1, -1], [1, -1], [1, 1], [-1, -1], [1, 1], [-1, 1]];
for (var j = 0; j < 6; j++) {
var a = Q[j][0], b = Q[j][1];
v.set(cx + (ux * a + vx * b) * hs, cy + (uy * a + vy * b) * hs, cz + (uz * a + vz * b) * hs);
if (M)
v.applyMatrix4(M);
B.pos.push(v.x, v.y, v.z);
w.set(nx, ny, nz);
if (N)
w.applyMatrix3(N).normalize();
B.nor.push(w.x, w.y, w.z);
B.uv.push((a + 1) / 2, (b + 1) / 2);
if (B.col)
B.col.push(c.r, c.g, c.b);
}
}
},
function (B) {
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(B.pos, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(B.nor, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(B.uv, 2));
if (B.col && B.col.length)
g.setAttribute("color", new THREE.Float32BufferAttribute(B.col, 3));
g.computeBoundingSphere();
return g;
},
function (G) {
if (!ctuLeafTex())
return;
G.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(G.matrixWorld).invert(), list = [], lite = ctLite();
(function walk(o, plain) {
if (o.userData && (o.userData.ctnPlain || o.userData.ctKeep))
plain = true;
if (o.isMesh && !o.isInstancedMesh && !plain && !o.userData.ctuLeafDone && o.geometry) {
var sh = ctuFoliage(o, o.geometry);
if (sh)
list.push([o, sh]);
}
for (var i = 0; i < o.children.length; i++)
walk(o.children[i], plain);
})(G, false);
if (!list.length)
return;
var B = { pos: [], nor: [], uv: [], col: [] }, M = new THREE.Matrix4();
list.forEach(function (e, i) {
var m = e[0], col = m.material.color.getHex();
M.multiplyMatrices(inv, m.matrixWorld);
ctuCards(B, e[1], m.geometry.parameters, col, M, lite, ctHash(G.name + "|" + i) + i);
m.userData.ctuLeafDone = 1;
m.userData.ctKeep = 1;
m.scale.multiplyScalar(e[1] === "ball" ? 0.78 : 0.85);
m.material = ctM(ctuMul(col, 0.62));
});
var mm = new THREE.Mesh(ctuGeo(B), ctuLeafMat());
mm.userData.keep = 1;
mm.userData.ctuLeaves = 1;
mm.castShadow = false;
mm.receiveShadow = true;
G.add(mm);
},
function (g, a, b, r0, r1, col, seg) {
var d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]), L = d.length();
if (L < 0.01)
return null;
var m = new THREE.Mesh(ctCyl(r1, r0, L, seg || 8), ctM(col));
m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
g.add(m);
return m;
},
function (g, o) {
var h = o.h || 20, tr = o.tr || h * 0.055, tc = o.trunk || 0x5A4028, cc = o.crown || 0x3E7A2E, cc2 = o.crown2 || ctuMix(cc, 0x6A8A3A, 0.25), R = ctRand(ctHash("tree" + h + "|" + cc + "|" + (o.seed || 0)));
var limbs = o.limbs || 7, roots = o.roots || 7, lite = ctLite(), s = [], seg = o.big ? 14 : 10;
var top = h * (o.world ? 0.62 : 0.55), y = 0, x = 0, z = 0, prev = [0, 0, 0];
for (var i = 0; i < 3; i++) {
var y1 = top * (i + 1) / 3, nx = x + (R() - 0.5) * tr * 0.35, nz = z + (R() - 0.5) * tr * 0.35, r0 = tr * (1.25 - i * 0.22), r1 = tr * (1.03 - i * 0.22);
ctuLimb(g, prev, [nx, y1, nz], r0, r1, tc, seg);
prev = [nx, y1, nz];
x = nx;
z = nz;
}
for (var k = 0; k < roots; k++) {
var a = k / roots * 6.283 + R() * 0.4, great = o.world && k % Math.max(1, Math.floor(roots / 3)) === 0, L = tr * (great ? 5.5 : 2.2 + R() * 1.4);
var p0 = [Math.sin(a) * tr * 0.5, tr * (great ? 1.8 : 1.3), Math.cos(a) * tr * 0.5], p1 = [Math.sin(a) * L * 0.55, tr * (great ? 0.55 : 0.25), Math.cos(a) * L * 0.55], p2 = [Math.sin(a + 0.15) * L, -tr * 0.1, Math.cos(a + 0.15) * L];
p2[1] = -tr * (great ? 0.45 : 0.3);
ctuLimb(g, p0, p1, tr * (great ? 0.75 : 0.48), tr * (great ? 0.5 : 0.28), tc, 10);
ctuLimb(g, p1, p2, tr * (great ? 0.5 : 0.28), tr * (great ? 0.22 : 0.12), tc, 9);
}
var crowns = [], spread = o.spread || 1;
for (var j = 0; j < limbs; j++) {
var b = j / limbs * 6.283 + R() * 0.5, ys = h * (0.38 + 0.22 * R()) * (o.world ? 1.08 : 1), el = 0.6 + R() * 0.45, Ll = h * (0.26 + 0.1 * R()) * spread;
var st = [x * ys / top, ys, z * ys / top], e1 = [st[0] + Math.sin(b) * Math.sin(el) * Ll, ys + Math.cos(el) * Ll, st[2] + Math.cos(b) * Math.sin(el) * Ll];
ctuLimb(g, st, e1, tr * 0.42, tr * 0.2, tc, 8);
crowns.push([e1, h * 0.12]);
for (var f = -1; f <= 1; f += 2) {
var b2 = b + f * (0.45 + R() * 0.3), el2 = Math.max(0.25, el - 0.2 + R() * 0.25), L2 = Ll * (0.5 + R() * 0.2);
var e2 = [e1[0] + Math.sin(b2) * Math.sin(el2) * L2, e1[1] + Math.cos(el2) * L2, e1[2] + Math.cos(b2) * Math.sin(el2) * L2];
ctuLimb(g, e1, e2, tr * 0.2, tr * 0.08, tc, 6);
crowns.push([e2, h * (0.1 + 0.04 * R())]);
}
}
crowns.push([[x, top + h * 0.1, z], h * 0.17]);
for (var q = 0; q < (o.world ? 5 : 3); q++) {
var aq = q * 2.1 + R();
crowns.push([[x + Math.sin(aq) * h * 0.14 * spread, top + h * (0.16 + 0.06 * R()), z + Math.cos(aq) * h * 0.14 * spread], h * 0.13]);
}
crowns.forEach(function (c, i) { var m = ctAdd(g, new THREE.IcosahedronGeometry(c[1] * (0.9 + 0.25 * R()), 1), i % 2 ? cc : cc2, c[0][0], c[0][1], c[0][2]); m.scale.y = 0.78; });
if (o.fruit)
crowns.forEach(function (c) { for (var z2 = 0; z2 < (lite ? 2 : 4); z2++) {
var fa = R() * 6.283, fr = c[1] * 0.85;
ctAdd(g, ctSph(Math.max(0.12, h * 0.012), 6), o.fruit, c[0][0] + Math.sin(fa) * fr, c[0][1] - c[1] * 0.2, c[0][2] + Math.cos(fa) * fr);
} });
ctsRound(s, 0, 0, tr * 1.3, h);
return { r: Math.max(h * 0.32 * spread, 4), s: s };
},
function (g, o) {
o = o || {};
var k = o.kind || "oak";
if (k === "world")
return ctuTree(g, { h: o.h || 40, tr: o.tr || (o.h || 40) * 0.07, trunk: o.trunk || 0x5A4634, crown: o.crown || 0x3A6A3A, crown2: o.crown2, world: 1, big: 1, limbs: 11, roots: 9, spread: 1.25, seed: 1 });
if (k === "oak" || k === "fruit")
return ctuTree(g, { h: o.h || 20, tr: o.tr, trunk: o.trunk, crown: o.crown, fruit: o.fruit, limbs: 6, roots: 6 });
return ctuTree0.apply(this, arguments);
},
function (g, o) {
var w = CTS.T && /^(odin|thor)$/.test(CTS.T.id);
var r = w ? ctuTree(g, { h: 60, tr: 4.4, trunk: 0x5A4634, crown: o.col || 0x3A6A3A, limbs: 12, roots: 10, spread: 1.2, big: 1, world: 1, seed: 2 })
: ctuTree(g, { h: 30, tr: 2.4, crown: o.col || 0x3E7A2E, limbs: 9, roots: 8, spread: 1.15, big: 1, seed: 2 });
return { r: Math.max(10, r.r * (w ? 0.5 : 0.8)), s: r.s };
},
function (m, f, lite) {
var col = m.material.color.getHex(), emi = m.material.emissive && (m.material.emissive.r + m.material.emissive.g + m.material.emissive.b) > 0.02;
var tc = 0xD8D0BE, fb = Math.min(0.12, f.w * 0.1), dp = f.t + 0.12, W = f.w, H = f.h;
function put(a, b, w, h, d, c) { if (f.ax === "z")
ctuKid(m, w, h, d, c, a, b, 0);
else
ctuKid(m, d, h, w, c, 0, b, a); }
put(0, H / 2 + fb / 2, W + fb * 2, fb, dp, tc);
put(0, -H / 2 - fb / 2, W + fb * 2, fb, dp, tc);
put(-W / 2 - fb / 2, 0, fb, H, dp, tc);
put(W / 2 + fb / 2, 0, fb, H, dp, tc);
put(0, -H / 2 - fb - 0.06, W + fb * 2 + 0.24, 0.1, f.t + 0.36, ctuMix(tc, 0x8A8478, 0.4));
put(0, H / 2 + fb + 0.08, W + fb * 2 + 0.16, 0.14, f.t + 0.2, ctuMix(tc, 0x8A8478, 0.25));
if (!lite) {
var gb = Math.max(0.035, fb * 0.45), gd = f.t + 0.06;
put(0, 0, gb, H, gd, tc);
put(0, H * 0.08, W, gb, gd, tc);
if (!emi && m.material.color) {
m.material = ctM(ctuMix(col, 0x3A4A5E, 0.6));
}
}
},
function (m, f, lite) {
var col = m.material.color.getHex(), jc = ctuMix(col, 0x9A9284, 0.6), W = f.w, H = f.h, jb = Math.min(0.2, W * 0.14), dp = f.t + 0.16;
function put(a, b, w, h, d, c, off) { if (f.ax === "z")
ctuKid(m, w, h, d, c, a, b, off || 0);
else
ctuKid(m, d, h, w, c, off || 0, b, a); }
put(-W / 2 - jb / 2, jb / 2, jb, H + jb, dp, jc);
put(W / 2 + jb / 2, jb / 2, jb, H + jb, dp, jc);
put(0, H / 2 + jb / 2, W + jb * 2, jb, dp, jc);
put(0, -H / 2 + 0.09, W + jb * 2 + 0.5, 0.18, f.t + 1.1, 0x8A847A);
if (!lite) {
for (var i = 1; i < 4; i++)
put(-W / 2 + W * i / 4, 0, 0.03, H * 0.96, f.t + 0.03, ctuMul(col, 0.7));
put(W * 0.32, -H * 0.05, 0.09, 0.09, f.t + 0.12, 0xB08A3A);
}
},
function (m, p, sc, lite, many) {
var col = m.material.color.getHex(), W = p.width * sc.x, H = p.height * sc.y, D = p.depth * sc.z, bc = ctuBase(col), tc = ctuTrim(col);
var ph = Math.min(0.7, H * 0.1);
ctuKid(m, W + 0.24, ph, D + 0.24, bc, 0, -H / 2 + ph / 2, 0);
ctuKid(m, W + 0.36, 0.3, D + 0.36, tc, 0, H / 2 - 0.12, 0);
ctuKid(m, W + 0.2, 0.14, D + 0.2, tc, 0, H / 2 - 0.42, 0);
if (H >= 5.5 && !lite) {
for (var y = 3.2; y < H - 1.4 && y < 16; y += 3.2)
ctuKid(m, W + 0.14, 0.16, D + 0.14, tc, 0, -H / 2 + y, 0);
}
if (!lite && !many && H <= 16 && Math.max(W, D) <= 34) {
var q = 0;
for (var yy = ph + 0.2; yy < H - 0.5; yy += 0.62) {
var big = (q++) % 2, a = big ? 0.62 : 0.42;
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { ctuKid(m, big ? a : 0.3, 0.5, big ? 0.3 : a, tc, c[0] * (W / 2 - (big ? a : 0.3) / 2 + 0.04), -H / 2 + yy + 0.25, c[1] * (D / 2 - (big ? 0.3 : a) / 2 + 0.04)); });
}
}
},
function (m, p) {
var col = m.material.color.getHex(), r = p.radius, h = p.height, fc = ctuMul(col, 0.6), sc = m.scale;
if (p.radialSegments === 4) {
var L = r * Math.SQRT2 * 1.04;
[[1, 1], [1, -1], [-1, -1], [-1, 1]].forEach(function (q) { var k = ctuKidG(m, ctBox(L, 0.24 / sc.y, 0.22), fc, q[0] * r / 2, -h / 2 + 0.1 / sc.y, q[1] * r / 2, q[0] * q[1] > 0 ? Math.PI / 4 : -Math.PI / 4); });
}
else {
ctuKidG(m, ctCyl(r * 1.05, r * 1.07, 0.2 / sc.y, Math.max(8, p.radialSegments)), fc, 0, -h / 2 + 0.06 / sc.y, 0);
}
ctuKidG(m, ctSph(Math.max(0.12, r * 0.05), 7), 0x8A7A4A, 0, h / 2, 0);
ctuKidG(m, ctCyl(0.03, 0.05, Math.max(0.6, r * 0.25), 5), 0x6A6050, 0, h / 2 + Math.max(0.3, r * 0.12), 0);
},
function (m, p, sc, lite) {
var col = m.material.color.getHex(), r = Math.max(p.radiusTop, p.radiusBottom), H = p.height, bc = ctuBase(col), tc = ctuTrim(col), n = Math.max(10, p.radialSegments);
ctuKidG(m, ctCyl(p.radiusBottom * 1.08, p.radiusBottom * 1.12, 0.7 / sc.y, n), bc, 0, -H / 2 + 0.35 / sc.y, 0);
ctuKidG(m, ctCyl(p.radiusTop * 1.1, p.radiusTop * 1.02, 0.45 / sc.y, n), tc, 0, H / 2 - 0.6 / sc.y, 0);
if (!lite && H * sc.y >= 7) {
var lv = Math.min(3, Math.floor(H * sc.y / 5));
for (var i = 0; i < lv; i++) {
var yy = -H / 2 + (i + 1) * H / (lv + 1), rr = p.radiusBottom + (p.radiusTop - p.radiusBottom) * ((yy + H / 2) / H);
for (var k = 0; k < 4; k++) {
var a = k * Math.PI / 2 + i * 0.6 + 0.4;
ctuKidG(m, ctBox(0.2 / sc.x, 1 / sc.y, 0.16), 0x1E1A18, Math.sin(a) * (rr + 0.02), yy, Math.cos(a) * (rr + 0.02), a);
}
}
}
},
function (m, p, sc) {
var col = m.material.color.getHex(), r = Math.max(p.radiusTop, p.radiusBottom), H = p.height, tc = ctuMix(col, 0xE8E0D0, 0.2);
ctuKidG(m, ctCyl(r * 1.3, r * 1.4, r * 0.5, 12), tc, 0, -H / 2 + r * 0.25, 0);
ctuKidG(m, ctBox(r * 2.9, r * 0.32, r * 2.9), tc, 0, -H / 2 + r * 0.16, 0);
ctuKidG(m, ctCyl(r * 1.35, r * 1.05, r * 0.45, 12), tc, 0, H / 2 - r * 0.45, 0);
ctuKidG(m, ctBox(r * 2.8, r * 0.28, r * 2.8), tc, 0, H / 2 - r * 0.14, 0);
},
function (G) {
var lite = ctLite(), list = [];
(function walk(o, plain, par) {
if (o.userData && (o.userData.ctnPlain || o.userData.ctKeep))
plain = true;
if (o.isMesh && !o.isInstancedMesh && !plain && !o.userData.ctu && !o.userData.ctuDone && !o.userData.keep && o.geometry && o.material && !Array.isArray(o.material) && CTN_MS && CTN_MS.has(o.material))
list.push(o);
for (var i = 0; i < o.children.length; i++)
walk(o.children[i], plain, o);
})(G, false, null);
var walls = 0;
list.forEach(function (m) {
var p = m.geometry.parameters || {}, t = m.geometry.type, sc = m.scale, mt = m.material;
m.userData.ctuDone = 1;
if (!ctuUpright(m))
return;
mt.color.getHSL(CTU_HSL);
var h = CTU_HSL.h, s = CTU_HSL.s, l = CTU_HSL.l, emi = mt.emissive && (mt.emissive.r + mt.emissive.g + mt.emissive.b) > 0.02;
var green = h > 0.15 && h < 0.47 && s > 0.18;
if (t === "BoxGeometry") {
var f = ctuThin(p, sc), bottom = m.position.y - p.height * sc.y / 2;
if (f.ax === "y")
return;
if (!emi && f.t <= 0.42 && f.h >= 1.6 && f.h <= 5.5 && f.w >= 0.7 && f.w <= 5.4 && f.h >= f.w * 0.9 && bottom < 0.4 && bottom > -0.4 && l < 0.36) {
ctuDoor(m, f, lite);
return;
}
if (f.t <= 0.16 && f.w >= 0.4 && f.h >= 0.5 && f.w <= 3.4 && f.h <= 4.2 && (emi || l < 0.24 || (h > 0.5 && h < 0.7 && s > 0.2)) && bottom > 0.3) {
ctuWindow(m, f, lite);
return;
}
var W = p.width * sc.x, H = p.height * sc.y, D = p.depth * sc.z;
var woodc = h >= 0.025 && h <= 0.12 && s >= 0.28 && l <= 0.42;
if (!emi && !green && !woodc && Math.min(W, D) >= 0.6 && Math.max(W, D) >= 3 && H >= 2.4 && H <= 60 && bottom < 0.5 && bottom > -0.8 && l > 0.12) {
walls++;
ctuWall(m, p, sc, lite, walls > 24);
return;
}
return;
}
if (t === "IcosahedronGeometry" && !green && s < 0.4 && p.radius >= 0.8 && p.detail <= 1 && !m.geometry.userData.ctuRock) {
m.geometry = ctuRock(p.radius, ctHash(G.name) + Math.round(p.radius * 10), 1);
return;
}
if (t === "DodecahedronGeometry" && s < 0.4 && !m.geometry.userData.ctuRock) {
var gq = ctuRock(p.radius, ctHash(G.name) + Math.round(p.radius * 10));
m.geometry = gq;
return;
}
if (t === "ConeGeometry" && !emi && !green && p.radius >= 1.4 && p.height >= 1 && p.radius <= 40 && m.position.y - p.height * sc.y / 2 > 1.5) {
ctuRoof(m, p);
return;
}
if (t === "CylinderGeometry" && !emi && !green && !p.openEnded) {
var r = Math.max(p.radiusTop, p.radiusBottom), Hc = p.height * sc.y, bot = m.position.y - Hc / 2, wood = h >= 0.025 && h <= 0.12 && s >= 0.28 && l <= 0.42;
if (r >= 1.6 && Hc >= 5 && bot < 0.6 && !wood && s < 0.45) {
ctuTower(m, p, sc, lite);
return;
}
if (r >= 0.22 && r <= 1.3 && Hc >= r * 6 && Hc >= 2.4 && !wood && s < 0.55 && l > 0.42 && bot < 2.4) {
ctuColumn(m, p, sc);
return;
}
}
});
},
function (G) {
var kept = [];
G.traverse(function (m) {
if (!m.isMesh || m.userData.keep)
return;
var mt = m.material;
var own = !Array.isArray(mt) && mt && ((CTN_MS && CTN_MS.has(mt)) || (mt.userData && mt.userData.ctn));
if (!own) {
m.userData.keep = 1;
kept.push(m);
}
});
ctnMerge(G);
kept.forEach(function (m) { m.userData.keep = 0; });
G.children.forEach(function (m) { if (m.isMesh && m.geometry && !m.userData.keep) {
m.geometry.computeBoundingSphere();
m.frustumCulled = true;
} });
},
function (r, seed, ico) {
var key = (ico ? "irock" : "rock") + r + "|" + (seed % 5);
if (CTU.geo[key])
return CTU.geo[key];
var g = ico ? new THREE.IcosahedronGeometry(r, 2) : new THREE.DodecahedronGeometry(r, r > 6 ? 2 : 1), P = g.attributes.position, v = new THREE.Vector3(), R = ctRand(seed || 3), off = {};
for (var i = 0; i < P.count; i++) {
v.fromBufferAttribute(P, i);
var k = Math.round(v.x * 50) + "," + Math.round(v.y * 50) + "," + Math.round(v.z * 50);
if (off[k] === undefined) {
var n = typeof wNoise === "function" ? wNoise(v.x * 1.3 / r + seed % 7, v.z * 1.3 / r + v.y * 0.9 / r, seed % 97) : R();
off[k] = 0.78 + 0.4 * n + (R() - 0.5) * 0.12;
}
v.multiplyScalar(off[k]);
if (v.y < -r * 0.35)
v.y = -r * 0.35 + (v.y + r * 0.35) * 0.3;
P.setXYZ(i, v.x, v.y, v.z);
}
g.computeVertexNormals();
g.computeBoundingSphere();
g.userData.ctuRock = 1;
return (CTU.geo[key] = g);
},
function (L) {
var key = "frond" + L;
if (CTU.geo[key])
return CTU.geo[key];
var pos = [], nor = [], n = 9, lw = L * 0.28;
function tri(a, b, c) { pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); for (var i = 0; i < 3; i++)
nor.push(0, 1, 0); }
for (var i = 0; i < n; i++) {
var t0 = i / n, t1 = (i + 1) / n, x0 = t0 * L, x1 = t1 * L, y0 = -t0 * t0 * L * 0.45, y1 = -t1 * t1 * L * 0.45, w = lw * (1 - t0 * 0.75) * (i === 0 ? 0.5 : 1);
[-1, 1].forEach(function (sd) { tri([x0, y0, 0], [x1, y1, 0], [x0 + L * 0.05, y0 - w * 0.55, sd * w]); });
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
g.computeBoundingSphere();
g.userData.ctuDbl = 1;
return (CTU.geo[key] = g);
},
function (list) {
var pos = [], nor = [], uv = [], v = new THREE.Vector3(), N = new THREE.Matrix3();
list.forEach(function (q) {
var g = q.geo.index ? q.geo.toNonIndexed() : q.geo, P = g.attributes.position, NN = g.attributes.normal, U = g.attributes.uv;
N.getNormalMatrix(q.m);
for (var i = 0; i < P.count; i++) {
v.fromBufferAttribute(P, i).applyMatrix4(q.m);
pos.push(v.x, v.y, v.z);
v.fromBufferAttribute(NN, i).applyMatrix3(N).normalize();
nor.push(v.x, v.y, v.z);
uv.push(U ? U.getX(i) : 0, U ? U.getY(i) : 0);
}
});
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.computeBoundingSphere();
return g;
},
function (K) {
Object.keys(CTU_TREEKINDS).forEach(function (kn) {
var D = K[kn];
if (!D || !CTU_TREEKINDS[kn] || D.ctu)
return;
D.ctu = 1;
var out = [];
D.p.forEach(function (pt) {
var g = pt.geo, t = g.type, p = g.parameters || {}, c = new THREE.Color(pt.col), hsl = {};
c.getHSL(hsl);
var green = hsl.h > 0.15 && hsl.h < 0.47 && hsl.s > 0.14, leafy = green || (kn === "blossom" || kn === "tulip"), brown = hsl.h >= 0.02 && hsl.h <= 0.14 && hsl.l < 0.45;
if (t === "IcosahedronGeometry" && leafy) {
var core = new THREE.Matrix4().copy(pt.m).multiply(new THREE.Matrix4().makeScale(0.78, 0.78, 0.78));
out.push({ geo: g, col: ctuMul(pt.col, 0.62), m: core });
out.push({ geo: ctuInstGeo("ball", { radius: p.radius }), col: pt.col, m: pt.m, leaf: 1 });
return;
}
if (t === "ConeGeometry" && green) {
out.push({ geo: g, col: ctuMul(pt.col, 0.55), m: new THREE.Matrix4().copy(pt.m).multiply(new THREE.Matrix4().makeScale(0.62, 0.92, 0.62)) });
out.push({ geo: ctuInstGeo("cone", { radius: p.radius * 1.08, height: p.height }), col: pt.col, m: pt.m, leaf: 1 });
return;
}
if (t === "CylinderGeometry" && green && p.height < Math.max(p.radiusTop, p.radiusBottom) * 0.5) {
out.push({ geo: g, col: ctuMul(pt.col, 0.6), m: pt.m });
out.push({ geo: ctuInstGeo("disc", { radiusTop: p.radiusTop * 1.1, radiusBottom: p.radiusBottom * 1.1, height: p.height * 1.6 }), col: pt.col, m: pt.m, leaf: 1 });
return;
}
if (t === "BoxGeometry" && green && (kn === "palm" || kn === "datepalm")) {
var L = Math.max(p.width, p.depth) * 0.62, P = new THREE.Vector3(), Q = new THREE.Quaternion(), S = new THREE.Vector3();
pt.m.decompose(P, Q, S);
var dir = p.width > p.depth ? new THREE.Vector3(Math.sign(P.x) || 1, 0, 0) : new THREE.Vector3(0, 0, Math.sign(P.z) || 1), yaw = Math.atan2(-dir.z, dir.x);
for (var f = -1; f <= 1; f++) {
var m2 = new THREE.Matrix4().compose(new THREE.Vector3(P.x - dir.x * L * 0.45, P.y + 0.2, P.z - dir.z * L * 0.45), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, yaw + f * 0.5, 0.18)), new THREE.Vector3(1, 1, 1));
out.push({ geo: ctuFrondGeo(L * 1.15), col: pt.col, m: m2, dbl: 1 });
}
return;
}
if (t === "DodecahedronGeometry") {
out.push({ geo: ctuRock(p.radius, ctHash(kn)), col: pt.col, m: pt.m });
return;
}
if (t === "CylinderGeometry" && brown && Math.max(p.radiusTop, p.radiusBottom) >= 0.15) {
out.push({ geo: ctuBarkGeo(g), col: pt.col, m: pt.m, bark: 1 });
return;
}
out.push(pt);
});
var lv = out.filter(function (q) { return q.leaf; }), fr = out.filter(function (q) { return q.dbl; });
if (lv.length > 1) {
var gl = ctuBake(lv);
gl.userData.ctuLeaf = 1;
out = out.filter(function (q) { return !q.leaf; });
out.push({ geo: gl, col: lv[0].col, m: new THREE.Matrix4() });
}
if (fr.length > 1) {
var gf = ctuBake(fr);
gf.userData.ctuDbl = 1;
out = out.filter(function (q) { return !q.dbl; });
out.push({ geo: gf, col: fr[0].col, m: new THREE.Matrix4() });
}
D.p = out;
});
return K;
},
function (root) {
root.traverse(function (im) {
if (!im.isInstancedMesh || !im.geometry)
return;
var u = im.geometry.userData, col = im.material && im.material.color ? im.material.color.getHex() : 0x4A7A30;
if (u.ctuLeaf) {
im.material = ctuLeafMat(col);
im.castShadow = false;
}
else if (u.ctuDbl) {
var k = "d" + col;
im.material = CTU.dbl[k] || (CTU.dbl[k] = (function () { var m = new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide }); m.userData.ldShared = 1; return m; })());
}
else if (u.ctuBark) {
var kb = "b" + col, tx = ctnTex("bark");
if (tx)
im.material = CTU.bark[kb] || (CTU.bark[kb] = (function () { var m = new THREE.MeshLambertMaterial({ color: col, map: tx }); m.userData.ldShared = 1; m.userData.ctn = 1; return m; })());
}
});
},
function (a, want, seed) {
for (var i = 0; i < 12; i++) {
var id = "ctu_" + a + "_" + seed + "_" + i;
if (want === undefined)
return id;
var h = 0;
for (var j = 0; j < id.length; j++)
h = (h * 31 + id.charCodeAt(j)) >>> 0;
if (h % 2 === (want ? 1 : 0))
return id;
}
return "ctu_" + a + "_" + seed;
},
function (a, o, seed) {
var glb = !!CTU_GLB[a], spec = { id: ctuSpecId(a, a === "horse" ? !!(o && o.white) : undefined, seed), archetype: a, label: null, attrs: {}, x: 0, z: 0, rot: 0, solid: false, detail: 3, nights: [], city: !glb, hub: !glb };
var g = build(spec);
if (!g)
return null;
var B = new THREE.Box3().setFromObject(g), V = new THREE.Vector3();
B.getSize(V);
var L = Math.max(V.x, V.z) || 1, want = (CTU_LEN[a] || 2) * ((o && o.k) || 1);
g.scale.multiplyScalar(want / L);
g.userData.ctuH = V.y * want / L;
g.userData.ctKeep = 1;
return g;
},
function (parent, list, s, seed) {
var top = [], made = null;
list.forEach(function (e, i) {
var a = e[0], o = e[4] || {}, k = e[1] || 1, g = null;
if (a.charAt(0) === "@") {
var look = Object.assign({}, CTU_RIDERS[a.slice(1)] || {}, o.look || {});
g = typeof wPerson === "function" ? wPerson("ctu_" + seed + "_" + i, { look: look, sex: "m" }) : null;
if (!g)
return;
if (o.headless) {
g.updateMatrixWorld(true);
var Bp = new THREE.Box3().setFromObject(g), cut = Bp.min.y + (Bp.max.y - Bp.min.y) * 0.84, bb = new THREE.Box3();
g.traverse(function (m) { if (!m.isMesh)
return; bb.setFromObject(m); if ((bb.min.y + bb.max.y) / 2 > cut)
m.visible = false; });
}
if (o.ride && made) {
var hy = made.userData.ctuH || 2;
g.position.set(0, hy * 0.6 - 0.62, -(CTU_LEN.horse * k) * 0.04);
}
g.userData.ctKeep = 1;
}
else {
g = ctuOne(a, { white: o.white, k: k }, seed + "_" + i);
if (!g)
return;
if (o.on !== undefined && top[o.on]) {
var below = top[o.on];
g.position.set(0, below.position.y + (below.userData.ctuH || 1) * 0.72, below.position.z + (e[3] || 0));
}
else
g.position.set(e[2] || 0, 0, e[3] || 0);
if (!made)
made = g;
}
if (o.on === undefined && !o.ride)
g.position.x = e[2] || 0;
if (o.on === undefined && !o.ride && e[3])
g.position.z = e[3];
top.push(g);
parent.add(g);
});
if (s && s !== 1)
parent.scale.multiplyScalar(s);
},
function (n, x, z, rot, s, y, o) {
if (typeof evbWorldDoor !== "function" || CTN_SHUT[n])
return;
var D = CTN_DOORS[n];
if (!D)
return;
if (y !== undefined && y < -1)
return;
var hd = D[1];
if (n === "house" && o) {
if (o.round)
hd = (o.w || 8) / 2;
else if (o.d)
hd = o.d / 2;
}
var id = CTS.T && CTS.T.id, th = (CTN_STORY[id] && CTN_STORY[id][n]) || D[0];
if (th === "*")
th = CTN_HOUSE[id] || "talecottage";
if (n === "manor" && CTN_HOUSE[id] === "victorian")
th = "victorian";
if (n === "manor" && /^tudor|^casa/.test(CTN_HOUSE[id] || ""))
th = CTN_HOUSE[id] === "casafi" ? "palazzofi" : "tudorhouse";
if (th === "victorian" && n === "harehouse")
th = "teahouse";
var name = D[2];
if (n === "house" && th === "mudbrick")
name = "A courtyard house";
else if (n === "house" && th === "roundhut")
name = "A hut";
var r = evbWorldDoor("ctale", x, z, rot || 0, hd * (s || 1), th, name, { doors: D[3], y: y });
if (!r && th.charAt(0) === "@")
evbWorldDoor("ctale", x, z, rot || 0, hd * (s || 1), CTN_HOUSE[id] || "talecottage", name, { doors: D[3], y: y });
}
];
});
