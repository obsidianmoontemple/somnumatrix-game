/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TRF = { solids: [], solidAt: 0, bumps: 0, lastHit: null, fx: [], junc: null, juncG: {}, cull: 0, lanes: {}, laneAt: 0,
mats: null, signTex: {}, shake: 0, redPrev: null, aveRedPrev: null, tickets: [], tkAt: 0, tkSeen: {}, carrier: null, round: [], roundAt: 0,
missing: false, wrongT: 0, paveT: 0, warned: {} };
function trfMe(g) {
if (!g)
return true;
if (typeof meG !== "undefined" && g === meG)
return true;
if (typeof rideG !== "undefined" && g === rideG)
return true;
if (g.userData && (g.userData.me || g.userData.companionOf === "me"))
return true;
if (typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.spec && typeof meshes !== "undefined" && meshes[DRIVE.spec.id] === g)
return true;
return false;
}
function trfVis(g) { var p = g, n = 0; while (p && n < 10) {
if (p.visible === false)
return false;
p = p.parent;
n++;
} return !!g.parent || g === scene; }
function trfSolids() { return __ZC(157, 0, this, arguments, new.target); }
function trfPen(s, x, z, r) { return __ZC(157, 1, this, arguments, new.target); }
function trfHitAt(x, z, r, feetY) {
var L = trfSolids(), best = null, bp = 0;
for (var i = 0; i < L.length; i++) {
var s = L[i];
if (feetY !== undefined && feetY > s.y + (s.k === "v" ? 2.2 : 1.9))
continue;
var p = trfPen(s, x, z, r);
if (p > bp) {
bp = p;
best = s;
}
}
return best ? { s: best, pen: bp } : null;
}
(function () {
if (typeof walkBy !== "function")
return;
var wb = walkBy;
walkBy = function (mx, mz) {
var P = camera.position, ox = P.x, oz = P.z;
wb(mx, mz);
if (P.x === ox && P.z === oz)
return;
var feet = P.y - 1.72, gy = (typeof terrainY === "function") ? terrainY(P.x, P.z) : 0;
var h1 = trfHitAt(P.x, P.z, 0.3, feet);
if (!h1)
return;
var h0 = trfHitAt(ox, oz, 0.3, feet);
if (h0 && h0.s === h1.s && h1.pen <= h0.pen + 1e-3)
return;
var nx = P.x, nz = P.z;
P.x = ox;
P.z = oz;
var tryX = trfHitAt(nx, oz, 0.3, feet), tryZ = trfHitAt(ox, nz, 0.3, feet);
if (!tryX && !blockedAt(nx, oz, feet))
P.x = nx;
else if (!tryZ && !blockedAt(ox, nz, feet))
P.z = nz;
};
})();
(function () {
if (typeof driveBlocked !== "function")
return;
var db = driveBlocked;
driveBlocked = function (x, z, h, S, v) {
if (db.apply(this, arguments)) {
TRF.lastHit = { k: "wall", at: performance.now(), v: Math.abs(v), x: x, z: z, h: h };
return true;
}
var L = trfSolids(), fx = -Math.sin(h), fz = -Math.cos(h), lx = -fz, lz = fx;
var pts = [[S.len, S.wid], [S.len, -S.wid], [S.len, 0], [-S.len, S.wid], [-S.len, -S.wid], [-S.len, 0], [0, S.wid], [0, -S.wid], [S.len * 0.5, S.wid], [S.len * 0.5, -S.wid], [-S.len * 0.5, S.wid], [-S.len * 0.5, -S.wid], [0, 0]];
for (var i = 0; i < L.length; i++) {
var s = L[i], dx = s.x - x, dz = s.z - z;
if (dx * dx + dz * dz > (S.len + 6) * (S.len + 6))
continue;
for (var k = 0; k < pts.length; k++) {
var px = x + fx * pts[k][0] + lx * pts[k][1], pz = z + fz * pts[k][0] + lz * pts[k][1];
if (trfPen(s, px, pz, 0.05) > 0) {
TRF.lastHit = { k: s.k, s: s, at: performance.now(), v: Math.abs(v), x: px, z: pz, h: h };
return true;
}
}
}
return false;
};
})();
(function () {
if (typeof ccTick !== "function")
return;
var ct = ccTick;
ccTick = function (dt) {
ct(dt);
try {
trfCrowdApart(dt);
}
catch (e) { }
};
})();
function trfCrowdApart(dt) {
if (typeof CC === "undefined" || !CC.on)
return;
var P = camera.position, list = [];
CC.pool.forEach(function (p) { if (p && p.state !== "gone" && p.g && p.g.visible)
list.push(p); });
var k = Math.min(1, dt * 5);
list.forEach(function (a) {
var wx = 0, wz = 0, ax = a.g.position.x, az = a.g.position.z;
var dx = ax - P.x, dz = az - P.z, d = Math.sqrt(dx * dx + dz * dz), need = 0.85;
if (typeof DRIVE !== "undefined" && DRIVE.on) {
var S = vehSpec(DRIVE.arch);
if (S)
need = Math.max(S.len, S.wid) + 0.6;
}
if (d < need && d > 1e-4) {
wx += dx / d * (need - d);
wz += dz / d * (need - d);
}
list.forEach(function (b) {
if (b === a)
return;
var ex = ax - b.g.position.x, ez = az - b.g.position.z, e2 = ex * ex + ez * ez;
if (e2 < 0.64 && e2 > 1e-6) {
var e = Math.sqrt(e2);
wx += ex / e * (0.8 - e) * 0.5;
wz += ez / e * (0.8 - e) * 0.5;
}
});
a.sepX = (a.sepX || 0) + (wx - (a.sepX || 0)) * k;
a.sepZ = (a.sepZ || 0) + (wz - (a.sepZ || 0)) * k;
if (Math.abs(a.sepX) + Math.abs(a.sepZ) > 1e-3) {
a.g.position.x += a.sepX;
a.g.position.z += a.sepZ;
}
});
}
(function () {
if (typeof keepApart !== "function")
return;
var ka = keepApart;
keepApart = function () {
ka();
try {
var P = camera.position;
for (var id in meshes) {
var g = meshes[id];
if (!g.userData.limbs || g.visible === false || trfMe(g))
continue;
var dx = g.position.x - P.x, dz = g.position.z - P.z, d2 = dx * dx + dz * dz;
if (d2 < 0.6 * 0.6 && d2 > 1e-6) {
var d = Math.sqrt(d2), nx = g.position.x + dx / d * (0.6 - d) * 0.3, nz = g.position.z + dz / d * (0.6 - d) * 0.3;
if (!blockedAt(nx, nz, 0)) {
g.position.x = nx;
g.position.z = nz;
}
}
}
}
catch (e) { }
};
})();
(function () {
if (typeof throughWalls !== "function")
return;
var tw = throughWalls;
throughWalls = function () {
if (typeof inSomnucorNow === "function" && trfInCity())
return false;
return tw.apply(this, arguments);
};
})();
function trfInCity() {
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
return !!(r && (store.here || 0) === r.id && typeof ATLC !== "undefined" && ATLC);
}
function trfJunctions() {
if (TRF.junc)
return TRF.junc;
if (typeof ATL_STREETS === "undefined" || typeof ATL_STAIRS === "undefined")
return [];
var J = [];
Object.keys(ATL_STREETS).forEach(function (k) {
ATL_STREETS[k].forEach(function (rs) {
ATL_STAIRS.forEach(function (s, i) { J.push({ ring: k, rs: rs, a: s.a, half: s.half, main: s.main, i: i, key: rs + "_" + i }); });
});
});
TRF.junc = J;
return J;
}
var TRF_CYCLE = 50;
function trfStopAt(J) { return J.half + 1.2; }
function trfPhase(t) {
t = t === undefined ? Date.now() / 1000 : t;
var c = ((t % TRF_CYCLE) + TRF_CYCLE) % TRF_CYCLE;
var ring = c < 24 ? "g" : c < 27 ? "a" : "r", ave = (c >= 28 && c < 46) ? "g" : (c >= 46 && c < 49) ? "a" : "r";
return { ring: ring, ave: ave, c: c };
}
function trfMats() {
if (TRF.mats)
return TRF.mats;
var M = { pole: mL(0x2A2C30), house: mL(0x15171A), white: new THREE.MeshLambertMaterial({ color: 0xF2F2EE }),
yellow: mL(0xE8C23A), off: new THREE.MeshBasicMaterial({ color: 0x1C1C1C }), post: mL(0x8A8C90),
beacon: new THREE.MeshBasicMaterial({ color: 0xFF9A1A }), stripe: mL(0x222222) };
["ring", "ave"].forEach(function (g) { ["r", "a", "g"].forEach(function (c) { M[g + c] = new THREE.MeshBasicMaterial({ color: 0x1C1C1C }); }); });
TRF.mats = M;
return M;
}
var TRF_LIT = { r: 0xFF2A1A, a: 0xFFB31A, g: 0x2AFF6A };
function trfSignTex(mph) {
if (TRF.signTex[mph])
return TRF.signTex[mph];
var c = document.createElement("canvas");
c.width = c.height = 128;
var x = c.getContext("2d");
x.fillStyle = "#fff";
x.beginPath();
x.arc(64, 64, 62, 0, Math.PI * 2);
x.fill();
x.strokeStyle = "#D0201A";
x.lineWidth = 14;
x.beginPath();
x.arc(64, 64, 54, 0, Math.PI * 2);
x.stroke();
x.fillStyle = "#111";
x.font = "bold 54px Arial, sans-serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(String(mph), 64, 68);
var t = new THREE.CanvasTexture(c);
TRF.signTex[mph] = t;
return t;
}
function trfCrossTex() {
if (TRF.signTex.cross)
return TRF.signTex.cross;
var c = document.createElement("canvas");
c.width = c.height = 128;
var x = c.getContext("2d");
x.fillStyle = "#fff";
x.beginPath();
x.moveTo(64, 6);
x.lineTo(124, 116);
x.lineTo(4, 116);
x.closePath();
x.fill();
x.strokeStyle = "#D0201A";
x.lineWidth = 10;
x.lineJoin = "round";
x.beginPath();
x.moveTo(64, 14);
x.lineTo(116, 110);
x.lineTo(12, 110);
x.closePath();
x.stroke();
x.fillStyle = "#111";
x.beginPath();
x.arc(64, 52, 7, 0, Math.PI * 2);
x.fill();
x.fillRect(59, 60, 10, 22);
x.fillRect(52, 64, 6, 14);
x.fillRect(70, 64, 6, 14);
x.fillRect(57, 82, 6, 16);
x.fillRect(66, 82, 6, 16);
var t = new THREE.CanvasTexture(c);
TRF.signTex.cross = t;
return t;
}
function trfHead(M, grp) {
var g = new THREE.Group();
g.add(P(cyl(0.07, 0.08, 3.4, 8), M.pole, 0, 1.7, 0));
g.add(P(box(0.36, 1.02, 0.26), M.house, 0, 3.15, 0));
g.add(P(box(0.5, 1.16, 0.03), M.house, 0, 3.15, -0.15));
[["r", 3.47], ["a", 3.15], ["g", 2.83]].forEach(function (L) {
var lens = new THREE.Mesh(new THREE.CircleGeometry(0.115, 16), M[grp + L[0]]);
lens.position.set(0, L[1], 0.135);
g.add(lens);
var hood = P(new THREE.CylinderGeometry(0.13, 0.13, 0.14, 12, 1, true, -Math.PI / 2, Math.PI), M.house, 0, L[1] + 0.02, 0.19, Math.PI / 2);
g.add(hood);
});
return g;
}
function trfSign(tex, w, h) {
var g = new THREE.Group(), M = trfMats();
g.add(P(cyl(0.045, 0.045, 2.6, 6), M.post, 0, 1.3, 0));
var face = new THREE.Mesh(new THREE.PlaneGeometry(w || 0.9, h || 0.9), new THREE.MeshLambertMaterial({ map: tex, transparent: true, alphaTest: 0.3 }));
face.position.set(0, 2.6, 0.03);
g.add(face);
var back = new THREE.Mesh(new THREE.CircleGeometry((w || 0.9) / 2, 20), M.post);
back.position.set(0, 2.6, 0);
back.rotation.y = Math.PI;
g.add(back);
return g;
}
function trfAt(J, o, d, s, face) {
var u = { x: Math.cos(J.a), z: Math.sin(J.a) }, t = { x: -Math.sin(J.a), z: Math.cos(J.a) };
var r = J.rs + d, aa = J.a + s / J.rs, x = ATLC.x + Math.cos(aa) * r, z = ATLC.z + Math.sin(aa) * r;
o.position.set(x, terrainY(x, z), z);
var f = face === "+t" ? t : face === "-t" ? { x: -t.x, z: -t.z } : face === "+u" ? u : { x: -u.x, z: -u.z };
o.rotation.y = Math.atan2(f.x, f.z);
return o;
}
function trfBuildJunction(J) {
var G = new THREE.Group(), M = trfMats(), W = (typeof ATL_ROAD !== "undefined" ? ATL_ROAD : 6), edge = J.half + 1.2;
var mph = (typeof ROAD_LIMIT_MPH !== "undefined" && ROAD_LIMIT_MPH[J.ring]) || 30;
var stripes = new THREE.InstancedMesh(new THREE.BoxGeometry(0.55, 0.02, J.main ? 3.2 : 2.6), M.white, Math.ceil(W * 2 / 1.1) + 1), m4 = new THREE.Matrix4(), n = 0;
var dummy = new THREE.Object3D();
for (var d = -W + 0.5; d <= W - 0.4; d += 1.1) {
trfAt(J, dummy, d, 0, "+t");
dummy.position.y += 0.07;
dummy.rotation.y = Math.atan2(-Math.sin(J.a), Math.cos(J.a));
dummy.updateMatrix();
stripes.setMatrixAt(n++, dummy.matrix);
}
stripes.count = n;
stripes.raycast = function () { };
G.add(stripes);
if (J.main) {
[[2.6, -1], [-2.6, 1]].forEach(function (L) {
var sl = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.02, 0.35), M.white);
trfAt(J, sl, L[0], L[1] * ROAD_SIDE * trfStopAt(J), "+t");
sl.position.y += 0.075;
G.add(sl);
});
var hs = trfStopAt(J) + 0.6;
G.add(trfAt(J, trfHead(M, "ring"), W + 0.8, -hs, "-t"));
G.add(trfAt(J, trfHead(M, "ring"), -(W + 0.8), hs, "+t"));
G.add(trfAt(J, trfHead(M, "ring"), -(W + 0.8), -hs, "-t"));
G.add(trfAt(J, trfHead(M, "ring"), W + 0.8, hs, "+t"));
G.add(trfAt(J, trfHead(M, "ave"), -(W + 1.4) * ROAD_SIDE, -(J.half + 0.6), "-u"));
G.add(trfAt(J, trfHead(M, "ave"), (W + 1.4) * ROAD_SIDE, J.half + 0.6, "+u"));
G.add(trfAt(J, trfSign(trfSignTex(mph)), W + 1.0, ROAD_SIDE * (edge + 10), ROAD_SIDE > 0 ? "-t" : "+t"));
G.add(trfAt(J, trfSign(trfSignTex(mph)), -(W + 1.0), -ROAD_SIDE * (edge + 10), ROAD_SIDE > 0 ? "+t" : "-t"));
}
else {
[[W + 0.6, J.half * 0.6], [-(W + 0.6), -J.half * 0.6]].forEach(function (b) {
var post = new THREE.Group();
for (var i = 0; i < 6; i++)
post.add(P(cyl(0.06, 0.06, 0.42, 8), i % 2 ? M.white : M.stripe, 0, 0.21 + i * 0.42, 0));
var glob = P(sph(0.2, 12, 10), M.beacon, 0, 2.75, 0);
post.add(glob);
post.userData.beacon = glob;
G.add(trfAt(J, post, b[0], b[1], "+t"));
});
G.add(trfAt(J, trfSign(trfCrossTex(), 1, 1), W + 1.0, -ROAD_SIDE * (edge + 14), ROAD_SIDE > 0 ? "-t" : "+t"));
G.add(trfAt(J, trfSign(trfCrossTex(), 1, 1), -(W + 1.0), ROAD_SIDE * (edge + 14), ROAD_SIDE > 0 ? "+t" : "-t"));
}
G.traverse(function (m) { if (m.isMesh)
m.raycast = function () { }; });
scene.add(G);
return G;
}
function trfLightsTick(dt) {
var on = trfInCity() && !store.inside;
TRF.cull -= dt;
if (TRF.cull <= 0) {
TRF.cull = 0.5;
var P = camera.position;
trfJunctions().forEach(function (J) {
var x = ATLC ? ATLC.x + Math.cos(J.a) * J.rs : 0, z = ATLC ? ATLC.z + Math.sin(J.a) * J.rs : 0, near = on && Math.hypot(x - P.x, z - P.z) < (J.main ? 420 : 260);
var G = TRF.juncG[J.key];
if (near && !G) {
G = TRF.juncG[J.key] = trfBuildJunction(J);
}
if (G)
G.visible = near;
});
}
if (!on)
return;
var ph = trfPhase(), M = trfMats(), off = 0x1C1C1C;
function set(grp, state) {
M[grp + "r"].color.setHex(state === "r" || state === "ra" ? TRF_LIT.r : off);
M[grp + "a"].color.setHex(state === "a" || state === "ra" ? TRF_LIT.a : off);
M[grp + "g"].color.setHex(state === "g" ? TRF_LIT.g : off);
}
set("ring", ph.ring);
set("ave", ph.ave);
M.beacon.color.setHex(0xFF9A1A);
}
var TRF_BRAKE = 3.5;
function trfStopFrom(d, gap) { return Math.sqrt(Math.max(0, 2 * TRF_BRAKE * (d - gap))); }
function trfLaneAhead(t, x, z) {
var dx = x - ATLC.x, dz = z - ATLC.z, r = Math.hypot(dx, dz), a = Math.atan2(dz, dx);
var da = ((a - t.a) * t.dir % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
return { along: da * t.r, side: Math.abs(r - t.r) };
}
trafficTick = function (dt) {
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
if (!r || !ATLC) {
if (trafficReady)
trafficClear();
return;
}
if (!trafficReady) {
if (typeof atlMeshQueue === "undefined" || !atlMeshQueue.length)
trafficBuild();
return;
}
var P = camera.position, inCity = (store.here || 0) === r.id && !store.inside;
trafficCull -= dt;
var cull = trafficCull <= 0;
if (cull)
trafficCull = 0.3;
var ph = trfPhase(), now = performance.now();
if (now - TRF.laneAt > 500) {
TRF.laneAt = now;
TRF.lanes = {};
TRAFFIC.forEach(function (t) { if (!t.g)
return; var k = t.r + "_" + t.dir; (TRF.lanes[k] = TRF.lanes[k] || []).push(t); });
Object.keys(TRF.lanes).forEach(function (k) { TRF.lanes[k].sort(function (a, b) { return a.a - b.a; }); });
}
var solids = inCity ? trfSolids() : [];
var meS = null;
if (inCity && walkMode) {
if (typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.mode === "road") {
var S0 = vehSpec(DRIVE.arch);
meS = { x: P.x, z: P.z, hw: S0 ? S0.wid : 1, hl: S0 ? S0.len : 2, me: true, veh: true };
}
else
meS = { x: P.x, z: P.z, hw: 0.35, hl: 0.35, me: true };
}
for (var i = 0; i < TRAFFIC.length; i++) {
var t = TRAFFIC[i];
if (t.rail) {
if (cull)
t.rail.visible = inCity;
continue;
}
if (t.vc === undefined)
t.vc = t.v;
if (t.hl === undefined) {
var kz = (KIT[t.spec.archetype] && KIT[t.spec.archetype].size) || [1.9, 1.5, 4.6];
t.hl = kz[2] / 2;
t.hw = kz[0] / 2;
}
var want = t.v;
if (t.crash > 0) {
t.crash -= dt;
want = 0;
t.vc = 0;
}
else if (t.wait > 0) {
t.wait -= dt;
want = 0;
t.vc = 0;
}
else if (inCity) {
var lane = TRF.lanes[t.r + "_" + t.dir] || [], idx = lane.indexOf(t);
if (lane.length > 1 && idx > -1) {
var nb = lane[(idx + (t.dir > 0 ? 1 : lane.length - 1)) % lane.length];
var gapA = ((nb.a - t.a) * t.dir % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) * t.r;
if (nb !== t && gapA < 80) {
want = Math.min(want, trfStopFrom(gapA, t.hl + (nb.hl || 2) + 3));
if (nb.vc !== undefined && gapA < t.hl + (nb.hl || 2) + 12)
want = Math.min(want, nb.vc + 0.5);
}
}
var rs = t.r - ROAD_SIDE * t.dir * 2.6, st = (ph.ring === "g") ? null : ph.ring;
if (st && typeof ATL_STAIRS !== "undefined") {
for (var k = 0; k < ATL_STAIRS.length; k++) {
var S = ATL_STAIRS[k];
if (!S.main)
continue;
var line = S.a - t.dir * (S.half + 1.2) / rs;
var dl = ((line - t.a) * t.dir % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) * t.r;
if (dl > 60)
continue;
var canStop = dl > t.vc * t.vc / (2 * TRF_BRAKE * 1.6);
if (st === "r" || st === "ra" || (st === "a" && canStop))
want = Math.min(want, trfStopFrom(dl, t.hl + 0.8));
}
}
var near = t.g.visible && Math.hypot(t.g.position.x - P.x, t.g.position.z - P.z) < 120;
if (near) {
var obs = solids.slice();
if (meS)
obs.push(meS);
for (var q = 0; q < obs.length; q++) {
var o = obs[q];
if (o.ref === t || o.g === t.g)
continue;
var la = trfLaneAhead(t, o.x, o.z), half = (o.k === "v" || o.veh) ? Math.max(o.hw || 1, 1) : 0.4;
if (la.side < t.hw + half + 0.5 && la.along > 0 && la.along < 40)
want = Math.min(want, trfStopFrom(la.along, t.hl + ((o.k === "v" || o.veh) ? (o.hl || 2) : 0.4) + 1.6));
}
}
}
if (t.vc < want)
t.vc = Math.min(want, t.vc + 2.2 * dt);
else
t.vc = Math.max(want, t.vc - 8 * dt);
var prev = t.a;
t.a += t.dir * t.vc * dt / t.r;
if (t.stops && !(t.wait > 0))
for (var k2 = 0; k2 < t.stops.length; k2++) {
var s2 = t.stops[k2], d0 = ((prev - s2) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI, d1 = ((t.a - s2) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
if (d0 * d1 <= 0 && Math.abs(d0 - d1) < 0.5) {
t.wait = t.tram ? 6 : 4;
break;
}
}
var x = ATLC.x + Math.cos(t.a) * t.r, z = ATLC.z + Math.sin(t.a) * t.r;
if (cull) {
var dx = x - P.x, dz = z - P.z, run = (typeof svcLevel === "function") ? (0.35 + 0.65 * svcLevel("transport") / 100) : 1;
t.g.visible = inCity && dx * dx + dz * dz < 520 * 520 && t.rank < run;
}
if (!t.g.visible)
continue;
t.g.position.set(x, terrainY(x, z), z);
t.g.rotation.y = Math.atan2(-Math.sin(t.a) * t.dir, Math.cos(t.a) * t.dir) + (t.jolt || 0);
if (t.jolt) {
t.jolt *= Math.max(0, 1 - dt * 0.4);
if (Math.abs(t.jolt) < 0.003)
t.jolt = 0;
}
if (t.hazard) {
t.hazard.visible = t.crash > 0 && (Math.floor(now / 450) % 2 === 0);
if (!(t.crash > 0))
t.hazard.visible = false;
}
}
};
function trfCrashTick(dt) {
var D = (typeof DRIVE !== "undefined") ? DRIVE : null;
if (D && D.on && D.bumps > TRF.bumps) {
var H = TRF.lastHit;
if (H && performance.now() - H.at < 400 && H.v > 2.4)
trfCrash(H);
}
if (D)
TRF.bumps = D && D.on ? D.bumps : 0;
for (var i = TRF.fx.length - 1; i >= 0; i--) {
var f = TRF.fx[i];
f.t += dt;
if (!f.step(dt, f.t)) {
scene.remove(f.g);
TRF.fx.splice(i, 1);
}
}
var cv = (typeof renderer !== "undefined" && renderer && renderer.domElement) ? renderer.domElement : null;
if (cv) {
if (TRF.shake > 0.002) {
TRF.shake *= Math.max(0, 1 - dt * 5);
var a = TRF.shake * 40;
cv.style.transform = "translate(" + ((Math.random() - 0.5) * a).toFixed(1) + "px," + ((Math.random() - 0.5) * a).toFixed(1) + "px)";
}
else if (cv.style.transform) {
cv.style.transform = "";
TRF.shake = 0;
}
}
}
function trfCrash(H) { return __ZC(157, 2, this, arguments, new.target); }
function trfHazards(t) { return __ZC(157, 3, this, arguments, new.target); }
function trfSparks(x, y, z, n) { return __ZC(157, 4, this, arguments, new.target); }
function trfDebris(x, y, z, h, n) { return __ZC(157, 5, this, arguments, new.target); }
function trfSmoke(x, y, z) { return __ZC(157, 6, this, arguments, new.target); }
function trfCrashSound(v) { return __ZC(157, 7, this, arguments, new.target); }
function trfLawTick(dt) {
var D = (typeof DRIVE !== "undefined") ? DRIVE : null;
if (!D || !D.on || D.mode !== "road" || !trfInCity() || store.inside || !D.road) {
TRF.redPrev = null;
TRF.aveRedPrev = null;
TRF.wrongT = 0;
TRF.paveT = 0;
return;
}
var onTest = !!(D.test && D.test.active);
var P = camera.position, ph = trfPhase(), sp = Math.abs(D.v), mph = Math.round(sp / MPH_MS);
var dx = P.x - ATLC.x, dz = P.z - ATLC.z, r = Math.hypot(dx, dz), a = Math.atan2(dz, dx);
var fx = -Math.sin(D.h) * (D.v < 0 ? -1 : 1), fz = -Math.cos(D.h) * (D.v < 0 ? -1 : 1);
var tang = fx * -Math.sin(a) + fz * Math.cos(a), rad = fx * Math.cos(a) + fz * Math.sin(a);
if (D.road.kind === "ring" && Math.abs(tang) > 0.6 && sp > 1.5) {
var dir = tang > 0 ? 1 : -1, rs = D.road.rs, best = null;
ATL_STAIRS.forEach(function (S) {
if (!S.main)
return;
var line = S.a - dir * (S.half + 1.2) / rs, dl = ((line - a) * dir % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
if (Math.abs(dl * rs) < 20 && (!best || Math.abs(dl) < Math.abs(best.dl)))
best = { dl: dl, k: S.a };
});
if (best) {
var key = rs + "_" + best.k + "_" + dir, ahead = best.dl * rs;
if (TRF.redPrev && TRF.redPrev.key === key && TRF.redPrev.d > 0 && ahead <= 0 && (ph.ring === "r" || ph.ring === "ra") && !onTest)
trfRedLight(mph, "a red light on " + (D.road.name || "the ring road"));
TRF.redPrev = { key: key, d: ahead };
}
else
TRF.redPrev = null;
}
else
TRF.redPrev = null;
if (Math.abs(rad) > 0.6 && sp > 1.5 && typeof atlNearStair === "function") {
var stn = atlNearStair(r, a);
if (stn && stn.s.main) {
var rdir = rad > 0 ? 1 : -1, W = (typeof ATL_ROAD !== "undefined" ? ATL_ROAD : 6), bestR = null;
Object.keys(ATL_STREETS).forEach(function (k) {
ATL_STREETS[k].forEach(function (rs2) {
var line = rs2 - rdir * (W + 0.8), dd = (line - r) * rdir;
if (Math.abs(dd) < 20 && (!bestR || Math.abs(dd) < Math.abs(bestR.d)))
bestR = { d: dd, rs: rs2 };
});
});
if (bestR) {
var key2 = bestR.rs + "_" + stn.s.a + "_" + rdir;
if (TRF.aveRedPrev && TRF.aveRedPrev.key === key2 && TRF.aveRedPrev.d > 0 && bestR.d <= 0 && ph.ave === "r" && !onTest)
trfRedLight(mph, "a red light where the avenue crosses the ring road");
TRF.aveRedPrev = { key: key2, d: bestR.d };
}
else
TRF.aveRedPrev = null;
}
else
TRF.aveRedPrev = null;
}
else
TRF.aveRedPrev = null;
TRF.wrongT = (D.wrongT > 0) ? TRF.wrongT + dt : 0;
if (TRF.wrongT > 5 && !onTest) {
TRF.wrongT = -55;
trfLicence("driving on the wrong side of the road", mph);
}
TRF.paveT = (D.road.kind === "off" && sp > 1.5) ? TRF.paveT + dt : 0;
if (TRF.paveT > 3 && !onTest) {
TRF.paveT = -57;
trfLicence("driving on the pavement", mph);
}
}
function trfRedLight(mph, where) {
setStatus("<b>Through a red light.</b> " + esc(where) + ", at " + mph + " mph. Red means stop at the line; amber means stop, unless you are so close that stopping would be unsafe.");
trfLicence("going through " + where, mph);
}
function trfLicence(what, mph) {
if (typeof licenceOffence === "function")
licenceOffence("driving", what);
}
(function () {
if (typeof licenceOffence !== "function")
return;
licenceOffence = function (kind, what) {
what = String(what || "an offence");
if (typeof LIC !== "undefined" && LIC.local) {
LIC.local.push({ kind: kind, what: what, at: Date.now() });
if (LIC.local.length > 20)
LIC.local.shift();
}
var t = trfKindOf(what);
try {
if (/without a licence/.test(what)) {
if (typeof reportCrime === "function")
reportCrime(kind === "flying" ? "unlicensed_flying" : "unlicensed_driving", (kind === "flying" ? "Flying" : "Driving") + ": " + what, null);
}
else if (t && kind === "driving") {
var m = /(\d+) mph in a (\d+)/.exec(what);
trfOffence(t, what, m ? +m[1] : null, m ? +m[2] : null);
}
else if (typeof reportCrime === "function")
reportCrime("reckless", (kind === "flying" ? "Flying" : "Driving") + ": " + what, null);
}
catch (e) { }
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve({ ok: false, offline: true });
return cityRpc("licence_offence", { p_kind: kind, p_what: what }).then(function (o) {
if (o && o.points)
setTimeout(function () {
setStatus("<b>" + o.points + " penalty points</b> on your " + kind + " licence for " + esc(what) + ", " + o.total + " in all." +
(o.revoked ? " <b>That is twelve: your licence is revoked.</b> Sit both tests again at the Licensing Office." : ""));
}, 4500);
if (o && (o.points || o.revoked) && typeof licRefresh === "function")
licRefresh(true);
return o;
}).catch(function () { return { ok: false }; });
};
})();
function trfKindOf(what) { return __ZC(157, 8, this, arguments, new.target); }
var TRF_KIND_WORD = { speeding: "Speeding", red_light: "Failing to stop at a red light", wrong_side: "Driving on the wrong side of the road",
pavement: "Driving on the pavement", collision: "Careless driving: a collision", pedestrian: "Careless driving: striking somebody on foot" };
function trfOffence(kind, what, mph, limit) { return __ZC(157, 9, this, arguments, new.target); }
function trfTicketsTick(dt) {
if (TRF.missing || !(typeof signedIn === "function" && signedIn()) || !trfInCity()) {
trfBadge();
return;
}
var now = Date.now();
if (now - TRF.tkAt > 45000) {
TRF.tkAt = now;
cityRpc("my_tickets").then(function (rows) {
rows = Array.isArray(rows) ? rows : [];
var fresh = rows.filter(function (t) { return t.status === "delivered" && !TRF.tkSeen[t.id]; });
var first = !TRF.tickets.length && !TRF.tkLoaded;
TRF.tickets = rows;
TRF.tkLoaded = true;
fresh.forEach(function (t) { TRF.tkSeen[t.id] = 1; });
if (fresh.length && !first) {
trfCarrierWalk(fresh[0]);
setStatus("<b>A letter from The Courthouse</b> has come to " + esc(fresh[0].address) + " by " + esc(fresh[0].carrier || "the carrier") + ". Open it with the envelope.");
}
trfBadge();
}).catch(function (e) { if (typeof rpcMissing === "function" && rpcMissing(e))
TRF.missing = true; });
cityRpc("carrier_tickets").then(function (rows) { TRF.round = Array.isArray(rows) ? rows : []; trfRoundPaint(); }).catch(function () { });
}
trfRoundTick(dt);
if (TRF.carrier)
trfCarrierTick(dt);
}
function trfBadge() {
var b = document.getElementById("trf-badge");
var open = (TRF.tickets || []).filter(function (t) { return t.status === "delivered"; }).length;
if (!open || !trfInCity()) {
if (b)
b.style.display = "none";
return;
}
if (!b) {
b = document.createElement("button");
b.id = "trf-badge";
b.className = "btn";
b.title = "Letters from The Courthouse";
b.style.cssText = "position:fixed;right:14px;bottom:150px;z-index:40;font-size:15px;padding:6px 10px;background:rgba(20,18,24,.85);border:1px solid #E8C27A;color:#F2E6C8";
b.onclick = trfLetters;
document.body.appendChild(b);
}
b.textContent = "✉ " + open;
b.style.display = "";
}
function trfLetters() { return __ZC(157, 10, this, arguments, new.target); }
function trfPlotFor(addr) {
var plots = (store.plots || []).concat(store.districtPlots || []);
for (var i = 0; i < plots.length; i++)
if (plots[i].name && addr && addr.indexOf(plots[i].name) === 0)
return plots[i];
return null;
}
function trfDoorOf(pl) {
var home = pl && pl.homeId ? (store.objects || []).filter(function (o) { return o.id === pl.homeId; })[0] : null, d = null;
if (home && typeof doorWorld === "function")
try {
d = doorWorld(home);
}
catch (e) { }
return d || (pl ? { x: pl.x, z: pl.z } : null);
}
function trfCarrierWalk(t) { return __ZC(157, 11, this, arguments, new.target); }
function trfCarrierTick(dt) { return __ZC(157, 12, this, arguments, new.target); }
function trfRoundPaint() { return __ZC(157, 13, this, arguments, new.target); }
function trfRoundTick(dt) {
if (!TRF.round.length)
return;
TRF.roundAt -= dt;
if (TRF.roundAt > 0)
return;
TRF.roundAt = 0.5;
var P = camera.position, changed = false;
TRF.round.forEach(function (t) {
var pl = trfPlotFor(t.address), d = trfDoorOf(pl), near = !!(d && Math.hypot(d.x - P.x, d.z - P.z) < 9);
if (near !== !!t.near) {
t.near = near;
changed = true;
}
});
if (changed)
trfRoundPaint();
}
function trfDeliver(id) { return __ZC(157, 14, this, arguments, new.target); }
addEventListener("keydown", function (e) {
if (e.code !== "KeyE" || !TRF.round.length || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
var t = TRF.round.filter(function (t) { return t.near; })[0];
if (t)
trfDeliver(t.id);
});
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) {
tt(dt);
try {
trfLightsTick(dt);
}
catch (e) {
if (!TRF.e1) {
TRF.e1 = 1;
console.warn("traffic lights:", e);
}
}
try {
trfCrashTick(dt);
}
catch (e) {
if (!TRF.e2) {
TRF.e2 = 1;
console.warn("crashes:", e);
}
}
try {
trfLawTick(dt);
}
catch (e) {
if (!TRF.e3) {
TRF.e3 = 1;
console.warn("road law:", e);
}
}
try {
trfTicketsTick(dt);
}
catch (e) {
if (!TRF.e4) {
TRF.e4 = 1;
console.warn("tickets:", e);
}
}
};
})();
