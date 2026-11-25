/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var LIFT_SPUR = 6, LIFT_AVE_OFF = 3, LIFT_ROAD_W = 7;
function liftStair(g) {
var best = null, bd = 9;
(ATL_STAIRS || []).forEach(function (m) { if (!m.main)
return; var d = Math.abs(Math.atan2(Math.sin(g.a - m.a), Math.cos(g.a - m.a))); if (d < bd) {
bd = d;
best = m;
} });
return best;
}
function liftStreet(g, upper) {
var st = ATL_STREETS[(upper ? g.up : g.down).k];
if (!st || !st.length)
return null;
return upper ? st[st.length - 1] : st[0];
}
function liftClear(pts) {
for (var i = 0; i < pts.length - 1; i++) {
var p = pts[i], q = pts[i + 1], L = Math.hypot(q.x - p.x, q.z - p.z) || 1;
for (var t = 0; t <= L; t += 0.8) {
var x = p.x + (q.x - p.x) * t / L, z = p.z + (q.z - p.z) * t / L;
if (typeof RMAP !== "undefined" && RMAP.list) {
for (var k = 0; k < RMAP.list.length; k++) {
var K = RMAP.list[k];
if (Math.abs(x - K.x) < 2.4 && Math.abs(z - K.z) < 2.4)
return false;
}
}
try {
if (blockedAt(x, z, terrainY(x, z) + 0.3))
return false;
}
catch (e) { }
}
}
return true;
}
var LIFT_R1 = {};
function liftSpurAt(g, upper, s, rL, sg) {
var k = g.id + (upper ? "u" : "d");
if (LIFT_R1[k] !== undefined)
return LIFT_R1[k];
var pick = LIFT_SPUR, tries = [6, 9, 3.5, 12, 15];
for (var i = 0; i < tries.length; i++) {
var r1 = rL + sg * tries[i], o = sg * (-ROAD_SIDE) * LIFT_AVE_OFF;
if (liftClear([tglXZ(g.a, rL + sg * 1.5), tglXZ(g.a, r1), tglXZ(s.a + o / r1, r1)]) && liftClear([tglXZ(g.a, r1), tglXZ(s.a - o / r1, r1)])) {
pick = tries[i];
break;
}
}
if (typeof atlMeshQueue === "undefined" || !atlMeshQueue.length)
LIFT_R1[k] = pick;
return pick;
}
function liftBeside(g, upper, s, rs) {
if (upper)
return null;
var k = g.id + "b";
if (LIFT_R1[k] !== undefined)
return LIFT_R1[k];
var rL = g.rl, D = g.down, foot = D.S + ATL_STAIR_RUN + 5, r3 = rs - (ATL_ROAD + 2), toStreet = foot > r3 - 4;
var side = Math.atan2(Math.sin(g.a - s.a), Math.cos(g.a - s.a)) >= 0 ? 1 : -1, liftLat = Math.round(Math.abs(Math.atan2(Math.sin(g.a - s.a), Math.cos(g.a - s.a))) * rL);
var lats = [liftLat, 22, 19, 16, 13].filter(function (L, i, A) { return L >= s.half + LIFT_ROAD_W / 2 + 1.5 && A.indexOf(L) === i; });
var feet = toStreet ? [rs - ATL_ROAD] : [foot, foot + 4, foot + 8].filter(function (f) { return f <= r3; });
if (!feet.length)
feet = [Math.min(foot, r3)];
function build(L, rf, r1) {
var pts = [tglXZ(g.a, r1)], n = Math.max(1, Math.ceil((rf - r1) / 16));
for (var i = 0; i <= n; i++) {
var r = r1 + (rf - r1) * i / n;
pts.push(tglXZ(s.a + side * L / r, r));
}
return { lat: L, rf: rf, r1: r1, side: side, street: toStreet, pts: pts };
}
var pick = null;
for (var a = 0; a < lats.length && !pick; a++)
for (var b = 0; b < feet.length && !pick; b++)
for (var c = 0; c < 3 && !pick; c++) {
var B = build(lats[a], feet[b], rL + [6, 9, 3.5][c]), test = [tglXZ(g.a, rL + 1.5)].concat(B.pts);
if (!liftClear(test))
continue;
if (!toStreet) {
var ok = true;
[-1, 1].forEach(function (e) { var o = e * LIFT_AVE_OFF; if (!liftClear([B.pts[B.pts.length - 1], tglXZ(s.a + o / B.rf, B.rf)]))
ok = false; });
if (!ok)
continue;
}
pick = B;
}
if (!pick)
pick = build(lats[lats.length - 1] || 13, feet[0], rL + 6);
if (typeof atlMeshQueue === "undefined" || !atlMeshQueue.length)
LIFT_R1[k] = pick;
return pick;
}
function liftWay(g, upper, toward) { return __ZC(248, 0, this, arguments, new.target); }
(function () {
if (typeof tglRoute !== "function" || typeof chaufLeg !== "function")
return;
var old = tglRoute;
tglRoute = function (from, to) {
try {
var W = [], i = tglRingIdx(from.x, from.z), j = tglRingIdx(to.x, to.z), cur = { x: from.x, z: from.z }, guard = 0;
while (i !== j && guard++ < 20) {
var up = j < i, gi = up ? i - 1 : i;
var gs = garList().filter(function (g) { return g.i === gi; }), pc = tglPolar(cur.x, cur.z), best = null, bd = 1e9;
gs.forEach(function (g) { var dd = Math.abs(Math.atan2(Math.sin(g.a - pc.a), Math.cos(g.a - pc.a))); if (dd < bd) {
bd = dd;
best = g;
} });
if (!best)
return old.apply(this, arguments);
var inW = liftWay(best, !up, true), fromP = up ? tglXZ(best.a, best.rl) : tglXZ(best.a, best.ru), toP = up ? tglXZ(best.a, best.ru) : tglXZ(best.a, best.rl);
if (inW) {
chaufLeg(i, cur, inW[0], W, false);
for (var k = 1; k < inW.length; k++)
W.push(inW[k]);
}
else
chaufLeg(i, cur, fromP, W, false);
W.push({ lift: true, to: toP, a: best.a, ring: ATL_RINGS[up ? i - 1 : i + 1].name, outward: !up });
i = up ? i - 1 : i + 1;
var outW = liftWay(best, up, false);
if (outW) {
for (var q = 0; q < outW.length; q++)
W.push(outW[q]);
cur = outW[outW.length - 1];
}
else
cur = toP;
}
chaufLeg(i, cur, to, W, !(to && to.garageGate));
return W;
}
catch (e) {
return old.apply(this, arguments);
}
};
})();
function liftStrip(grp, p, q, mat, line, edges) {
var dx = q.x - p.x, dz = q.z - p.z, len = Math.hypot(dx, dz);
if (len < 0.5)
return;
var cx = (p.x + q.x) / 2, cz = (p.z + q.z) / 2, ry = Math.atan2(dx, dz), y = terrainY(cx, cz) + 0.035;
var road = new THREE.Mesh(new THREE.BoxGeometry(LIFT_ROAD_W, 0.04, len + LIFT_ROAD_W * 0.5), mat);
road.position.set(cx, y, cz);
road.rotation.y = ry;
grp.add(road);
if (edges)
[-1, 1].forEach(function (e) {
var ox = Math.cos(ry) * e * (LIFT_ROAD_W / 2 - 0.25), oz = -Math.sin(ry) * e * (LIFT_ROAD_W / 2 - 0.25);
var ln = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.05, len), line);
ln.position.set(cx + ox, y + 0.005, cz + oz);
ln.rotation.y = ry;
grp.add(ln);
});
}
function liftRoadMeshes(G) {
var grp = new THREE.Group(), s = liftStair(G);
if (!s)
return grp;
var mat = new THREE.MeshLambertMaterial({ color: 0x3C3E44 }), line = new THREE.MeshLambertMaterial({ color: 0xF2F2EE });
[true, false].forEach(function (upper) {
if (liftStreet(G, upper) === null)
return;
var rL = upper ? G.ru : G.rl, rs = liftStreet(G, upper), sg = rs > rL ? 1 : -1;
var B = liftBeside(G, upper, s, rs);
if (B) {
var P = [tglXZ(G.a, rL)].concat(B.pts);
if (!B.street) {
var aEdge = s.a + B.side * (s.half) / B.rf;
P.push(tglXZ(aEdge, B.rf));
}
else
P.push(tglXZ(s.a + B.side * B.lat / rs, rs - ATL_ROAD * 0.5));
for (var k = 0; k < P.length - 1; k++)
liftStrip(grp, P[k], P[k + 1], mat, line, true);
return;
}
var sp0 = liftSpurAt(G, upper, s, rL, sg), r1 = rL + sg * sp0;
var aEdge = s.a + Math.sign(G.a - s.a) * (s.half) / r1, len = Math.abs(G.a - aEdge) * r1 + LIFT_ROAD_W / 2;
var am = (G.a + aEdge) / 2, c = tglXZ(am, r1), y = terrainY(c.x, c.z) + 0.035;
var road = new THREE.Mesh(new THREE.BoxGeometry(LIFT_ROAD_W, 0.04, len), mat);
road.position.set(c.x, y, c.z);
road.rotation.y = -am;
grp.add(road);
[-1, 1].forEach(function (e) { var lp = tglXZ(am, r1 + e * (LIFT_ROAD_W / 2 - 0.25)); var ln = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.05, len), line); ln.position.set(lp.x, y + 0.005, lp.z); ln.rotation.y = -am; grp.add(ln); });
var m0 = tglXZ(G.a, (rL + r1) / 2), sp = new THREE.Mesh(new THREE.BoxGeometry(LIFT_ROAD_W, 0.04, sp0 + LIFT_ROAD_W / 2), mat);
sp.position.set(m0.x, terrainY(m0.x, m0.z) + 0.035, m0.z);
sp.rotation.y = Math.PI / 2 - G.a;
grp.add(sp);
});
grp.traverse(function (m) { if (m.isMesh) {
m.raycast = function () { };
m.receiveShadow = true;
} });
return grp;
}
(function () {
if (typeof garList !== "function")
return;
var gl = garList;
garList = function () {
var L = gl.apply(this, arguments);
try {
if (!GAR.sideChecked && typeof store !== "undefined" && store.objects && store.objects.length > 500 && typeof atlMeshQueue !== "undefined" && !atlMeshQueue.length && typeof careInCity === "function" && careInCity()) {
GAR.sideChecked = true;
L.forEach(function (G) {
var s = liftStair(G);
if (!s)
return;
function ok(a) {
var pts = [];
[[G.ru, -1], [G.rl, 1]].forEach(function (e) { pts.push(tglXZ(a, e[0]), tglXZ(a, e[0] + e[1] * 6)); });
return liftClear([pts[0], pts[1]]) && liftClear([pts[2], pts[3]]);
}
if (ok(G.a))
return;
var a2 = s.a - (G.a - s.a);
if (ok(a2)) {
if (GAR.built[G.id])
garUnbuild(G.id);
G.a = a2;
G.moved = true;
LIFT_R1 = {};
}
});
}
}
catch (e) {
if (window.console)
console.warn("lift sides:", e);
}
return L;
};
})();
(function () {
if (typeof garBuild !== "function")
return;
var gb = garBuild;
garBuild = function (G) {
var B = gb.apply(this, arguments);
try {
if (B && B.root) {
B.root.add(liftRoadMeshes(G));
}
}
catch (e) { }
return B;
};
})();
