/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(243, function () {
"use strict";
return [
function () {
if (CRASH.M)
return CRASH.M;
CRASH.Q = new THREE.Quaternion();
CRASH.QY = new THREE.Quaternion();
CRASH.AX = new THREE.Vector3();
CRASH.V = new THREE.Vector3();
CRASH.M4 = new THREE.Matrix4();
CRASH.M4b = new THREE.Matrix4();
CRASH.M = { pole: mL(0x1E2230), bark: mL(0x5A4030), leaf: mL(0x3E7A3A), leaf2: mL(0x4E8A42), cone: mL(0xE8701A), white: mL(0xF2F2EE),
dent: new THREE.MeshLambertMaterial({ color: 0x2A2C30 }), hi: mL(0xE8E04A),
smokeGeo: new THREE.SphereGeometry(0.22, 8, 6), coneGeo: new THREE.ConeGeometry(0.22, 0.6, 10) };
return CRASH.M;
},
function (x, z, R, out) {
if (typeof ATL_STREETS === "undefined" || !ATLC || typeof atlNearStair !== "function")
return;
var dx = x - ATLC.x, dz = z - ATLC.z, dc = Math.hypot(dx, dz), ac = Math.atan2(dz, dx);
var keys = Object.keys(ATL_STREETS);
for (var ki = 0; ki < keys.length; ki++) {
var k = keys[ki], ring = atlRing(k), green = { estates: 1, temples: 1, commons: 1, harvest: 1, civic: 1, markets: 1 }[k];
var list = ATL_STREETS[k];
for (var j = 0; j < list.length; j++) {
var rs = list[j];
if (Math.abs(rs - dc) > R + 12)
continue;
var n = Math.round(rs * 2 * Math.PI / 32), span = (R + 2) / rs, i0 = Math.floor((ac - span) / (Math.PI * 2) * n), i1 = Math.ceil((ac + span) / (Math.PI * 2) * n);
for (var i = i0; i <= i1; i++) {
var a = (i / n) * Math.PI * 2, a2 = ((i + 0.5) / n) * Math.PI * 2;
for (var sd = -1; sd <= 1; sd += 2) {
var rl = rs + sd * 7.6;
if (!atlNearStair(rl, a) && (typeof atlClearLamp !== "function" || atlClearLamp(rl, a)))
crashCand(out, "lamp", "inst", ATLC.x + Math.cos(a) * rl, ATLC.z + Math.sin(a) * rl, x, z, R, 1, null);
if (green) {
var rt = rs + sd * 10.5;
if (!atlNearStair(rt, a2) && (typeof atlClearLamp !== "function" || atlClearLamp(rt, a2))) {
var ii = ((i % n) + n) % n, sc = 0.8 + ((ii * 7 + sd * 3) % 5 + 5) % 5 * 0.1;
crashCand(out, "tree", "inst", ATLC.x + Math.cos(a2) * rt, ATLC.z + Math.sin(a2) * rt, x, z, R, sc, null);
}
}
}
}
}
}
var Rg = ATL_RINGS;
for (var ri = 1; ri < Rg.length; ri++) {
var ring2 = Rg[ri], r0 = ring2.S + ATL_STAIR_RUN + 2, r1 = ring2.E - 1;
if (ring2.k === "wilds")
r1 = ring2.S + ATL_STAIR_RUN + 160;
if (dc < r0 - R - 12 || dc > r1 + R + 12)
continue;
for (var si = 0; si < ATL_STAIRS.length; si++) {
var st = ATL_STAIRS[si];
if (!st.main)
continue;
var da = ((ac - st.a) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
if (Math.abs(da) * dc > R + st.half + 12)
continue;
var rA = Math.max(r0 + 10, r0 + 10 + Math.floor((dc - R - r0 - 10) / 30) * 30);
for (var rr = rA; rr < r1 && rr < dc + R + 2; rr += 30)
for (var sd2 = -1; sd2 <= 1; sd2 += 2) {
var aa = st.a + sd2 * (st.half + 1.5) / rr;
crashCand(out, "lamp", "inst", ATLC.x + Math.cos(aa) * rr, ATLC.z + Math.sin(aa) * rr, x, z, R, 1, null);
}
}
}
},
function (x, z, R, out) {
if (typeof TRF === "undefined" || !TRF.juncG)
return;
for (var k in TRF.juncG) {
var G = TRF.juncG[k];
if (!G || !G.visible)
continue;
var ch = G.children;
for (var i = 0; i < ch.length; i++) {
var c = ch[i];
if (!c.isGroup || c.userData.crashDown)
continue;
var dx = c.position.x - x, dz = c.position.z - z;
if (dx * dx + dz * dz > R * R)
continue;
var kind = c.userData.beacon ? "beacon" : (c.children.length > 4 ? "signal" : "sign");
out.push({ kind: kind, src: "junc", x: c.position.x, z: c.position.z, sc: 1, ref: c, key: crashKey(c.position.x, c.position.z) });
}
}
},
function () {
var objs = store.objects, now = performance.now();
if (CRASH.idx && CRASH.idxN === objs.length && now - CRASH.idxAt < 20000)
return CRASH.idx;
CRASH.idxN = objs.length;
CRASH.idxAt = now;
var I = {}, here = store.here || 0;
for (var i = 0; i < objs.length; i++) {
var o = objs[i], kd = CRASH_ARCH[o.archetype];
if (!kd || (o.realm || 0) !== here)
continue;
var s = (o.attrs && o.attrs.s) || 1, K = KIT[o.archetype];
if (kd === "tree" && K && K.size[1] * s > 9.5)
continue;
var gk = Math.floor(o.x / 40) + "," + Math.floor(o.z / 40);
(I[gk] || (I[gk] = [])).push(o);
}
return (CRASH.idx = I);
},
function (x, z, R, out) {
var I = crashIndex(), gx = Math.floor(x / 40), gz = Math.floor(z / 40);
for (var a = gx - 1; a <= gx + 1; a++)
for (var b = gz - 1; b <= gz + 1; b++) {
var L = I[a + "," + b];
if (!L)
continue;
for (var i = 0; i < L.length; i++) {
var o = L[i], g = meshes[o.id];
if (!g || o._crashDown)
continue;
crashCand(out, CRASH_ARCH[o.archetype], "obj", g.position.x, g.position.z, x, z, R, (o.attrs && o.attrs.s) || 1, o);
}
}
},
function () {
CRASH.fest = [];
if (typeof FEST === "undefined" || !FEST.street)
return;
var M = CRASH.M4, C = new THREE.Color();
FEST.street.children.forEach(function (im) {
if (!im.isInstancedMesh || !im.geometry.parameters || Math.abs((im.geometry.parameters.height || 0) - 6.3) > 0.01)
return;
for (var i = 0; i < im.count; i++) {
im.getMatrixAt(i, M);
var e = M.elements, col = 0xC83A6A;
if (im.instanceColor) {
im.getColorAt(i, C);
col = C.getHex();
}
CRASH.fest.push({ x: e[12], z: e[14], col: col });
}
});
CRASH.nearAt = 0;
},
function (c, dirx, dirz, v, mine, fromFeed) {
crashMats();
if (!isFinite(dirx) || !isFinite(dirz) || (!dirx && !dirz)) {
dirx = 0;
dirz = 1;
}
var dl = Math.hypot(dirx, dirz) || 1;
dirx /= dl;
dirz /= dl;
var K = CRASH_KIND[c.kind], len = K.h * (c.kind === "tree" ? c.sc : 1), y = terrainY(c.x, c.z);
var F = { c: c, kind: c.kind, x: c.x, z: c.z, y: y, dx: dirx, dz: dirz, len: len, th: 0, w: Math.min(2.4, 0.35 + v * 0.07), bounce: 0, landed: false, t: 0,
obj: null, yaw: 0, glow: [], hit: false, mine: !!mine, id: null, upAt: performance.now() + CRASH_FIX_S * 1000, raise: -1, crew: null, v: v, key: c.key };
if (c.src === "inst") {
var g = new THREE.Group(), M = CRASH.M;
if (c.kind === "lamp") {
g.add(P(cyl(0.13, 0.2, 5.6, 6), M.pole, 0, 2.8, 0));
var gm = new THREE.MeshBasicMaterial({ color: 0xFFE6A8 });
g.add(P(sph(0.42, 8, 6), gm, 0, 5.8, 0));
F.glow.push({ m: gm, from: new THREE.Color(0xFFE6A8), to: new THREE.Color(0x3A3428) });
var stump = P(cyl(0.2, 0.22, 0.35, 6), M.pole, c.x, y + 0.17, c.z);
scene.add(stump);
F.stump = stump;
}
else if (c.kind === "festpole") {
g.add(P(cyl(0.09, 0.12, 6.3, 6), mL((c.ref && c.ref.col) || 0xC83A6A), 0, 3.15, 0));
var fm = new THREE.MeshBasicMaterial({ color: 0xFFD040 });
g.add(P(sph(0.16, 8, 6), fm, 0, 6.45, 0));
F.glow.push({ m: fm, from: new THREE.Color(0xFFD040), to: new THREE.Color(0x3A3010) });
}
else {
var s = c.sc;
g.add(P(cyl(0.28 * s, 0.4 * s, 4.2 * s, 6), M.bark, 0, 2.1 * s, 0));
g.add(P(new THREE.IcosahedronGeometry((typeof leafGeo === "function" ? 1.9 : 2.6) * s, 1), M.leaf, 0, 6.2 * s, 0));
g.add(P(new THREE.IcosahedronGeometry((typeof leafGeo === "function" ? 1.3 : 1.8) * s, 1), M.leaf2, 0, 8.2 * s, 0));
if (typeof leafGeo === "function") {
g.add(P(leafGeo(3.0 * s), leafMat(M.leaf.color.getHex()), 0, 6.2 * s, 0));
g.add(P(leafGeo(2.2 * s), leafMat(M.leaf2.color.getHex()), 0, 8.2 * s, 0));
}
}
g.position.set(c.x, y, c.z);
g.traverse(function (m) { m.raycast = function () { }; });
scene.add(g);
F.obj = g;
F.own = true;
crashHideInst(c.x, c.z, true);
}
else if (c.src === "junc") {
var o = c.ref;
o.userData.crashDown = true;
F.obj = o;
F.yaw = o.rotation.y;
o.traverse(function (m) {
if (m.isMesh && m.geometry && m.geometry.type === "CircleGeometry" && m.material && m.material.isMeshBasicMaterial && m.material.color) {
var cm = m.material.clone();
F.glow.push({ m: cm, from: m.material.color.clone(), to: new THREE.Color(0x1C1C1C), mesh: m, orig: m.material });
m.material = cm;
}
});
if (o.userData.beacon) {
var bm = o.userData.beacon.material.clone();
F.glow.push({ m: bm, from: bm.color.clone(), to: new THREE.Color(0x3A2008), mesh: o.userData.beacon, orig: o.userData.beacon.material });
o.userData.beacon.material = bm;
}
}
else {
var ob = c.ref, gg = meshes[ob.id];
ob._crashDown = true;
F.obj = gg;
F.yaw = gg.rotation.y;
F.spec = ob;
crashUnbake(gg);
if (ob._crashSolid === undefined) {
ob._crashSolid = ob.solid;
ob.solid = false;
if (typeof wallsAt !== "undefined")
wallsAt = -1;
}
var lamps = gg.userData.lamps ? new Set(gg.userData.lamps) : null, pool = gg.userData.pool;
gg.traverse(function (m) {
if (!m.isMesh || !m.material || Array.isArray(m.material))
return;
if ((lamps && lamps.has(m.material)) || (pool && m === pool)) {
var cm = m.material.clone();
F.glow.push({ m: cm, op0: cm.opacity, op1: m === pool ? 0 : 0.08, mesh: m, orig: m.material });
m.material = cm;
}
});
}
if (F.obj && F.obj.quaternion)
CRASH.QY.setFromAxisAngle(CRASH.V.set(0, 1, 0), F.yaw), F.qy = CRASH.QY.clone();
CRASH.down.push(F);
if (fromFeed && fromFeed.lying) {
F.th = Math.PI / 2 - crashRest(F);
F.w = 0;
F.landed = true;
F.hit = true;
crashPose(F);
}
if (mine)
crashLogPole(F);
return F;
},
function (x, z, hide) {
var G = typeof atlGroup !== "undefined" ? atlGroup : null;
if (!G)
return;
crashMats();
G.updateMatrixWorld(true);
crashHideIn(G, x, z, hide, 0.45);
if (typeof FEST !== "undefined" && FEST && FEST.street && FEST.street.parent) {
FEST.street.updateMatrixWorld(true);
crashHideIn(FEST.street, x, z, hide, 1.2);
}
},
function (G, x, z, hide, near) {
var M = CRASH.M4, W = CRASH.M4b, e;
G.traverse(function (im) {
if (!im.isInstancedMesh)
return;
var gs = im.geometry.userData.crashR;
if (gs === undefined) {
var bb = new THREE.Box3().setFromBufferAttribute(im.geometry.attributes.position);
gs = im.geometry.userData.crashR = bb.getBoundingSphere(new THREE.Sphere()).radius;
}
if (gs > 6)
return;
var hit = false;
for (var i = 0; i < im.count; i++) {
im.getMatrixAt(i, M);
W.multiplyMatrices(im.matrixWorld, M);
e = W.elements;
if (Math.abs(e[12] - x) > near || Math.abs(e[14] - z) > near)
continue;
var me = M.elements;
if (hide) {
if (Math.abs(me[0]) + Math.abs(me[5]) + Math.abs(me[10]) < 0.01)
continue;
im.userData.crashKeep = im.userData.crashKeep || {};
im.userData.crashKeep[i] = Array.prototype.slice.call(me, 0, 12);
for (var q = 0; q < 11; q++)
if (q !== 3 && q !== 7)
me[q] *= 0.0001;
}
else {
var kp = im.userData.crashKeep && im.userData.crashKeep[i];
if (!kp)
continue;
for (var q2 = 0; q2 < 12; q2++)
me[q2] = kp[q2];
delete im.userData.crashKeep[i];
}
im.setMatrixAt(i, M);
hit = true;
}
if (hit)
im.instanceMatrix.needsUpdate = true;
});
},
function (g) {
if (!g || typeof BAKE === "undefined" || typeof bakeChunk !== "function")
return;
var key = null;
g.traverse(function (m) { if (!key && m.userData && m.userData.baked && m.userData.baked !== "I")
key = m.userData.baked; });
g.userData.nmGone = true;
if (key && BAKE.chunks[key])
try {
bakeChunk(key);
}
catch (e) { }
g.visible = true;
},
function (g) {
if (!g || typeof BAKE === "undefined")
return;
g.userData.nmGone = false;
var sid = g.userData.crashSpec && g.userData.crashSpec.id;
for (var k in BAKE.chunks) {
var ch = BAKE.chunks[k];
if (sid && ch.ids && ch.ids.indexOf(sid) > -1) {
if (BAKE.queue.indexOf(k) < 0)
BAKE.queue.unshift(k);
return;
}
}
if (typeof bakeChunkKey === "function" && g.userData.crashSpec) {
var kk = bakeChunkKey(g.userData.crashSpec);
if (BAKE.queue.indexOf(kk) < 0)
BAKE.queue.unshift(kk);
}
},
function (F) {
try {
if (typeof trfDebris === "function" && F.kind === "lamp")
trfDebris(F.x + F.dx * F.len, F.y + 0.4, F.z + F.dz * F.len, 0, 6);
}
catch (e) { }
try {
if (typeof audio !== "undefined" && audio.on && audio.ctx) {
var c = audio.ctx, t = c.currentTime, o = c.createOscillator(), gn = c.createGain();
o.type = "triangle";
o.frequency.setValueAtTime(F.kind === "tree" ? 70 : 180, t);
o.frequency.exponentialRampToValueAtTime(50, t + 0.3);
gn.gain.setValueAtTime(0.18, t);
gn.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
o.connect(gn);
gn.connect(audio.master || c.destination);
o.start(t);
o.stop(t + 0.55);
}
}
catch (e) { }
},
function (F, dt, i) {
F.raise += dt;
var k = Math.min(1, F.raise / 5), e = k * k * (3 - 2 * k);
F.th = F.th0 * (1 - e);
crashPose(F);
for (var g = 0; g < F.glow.length; g++) {
var G = F.glow[g];
if (G.from)
G.m.color.copy(G.to).lerp(G.from, e);
else
G.m.opacity = G.op1 + (G.op0 - G.op1) * e;
}
if (F.crew)
crashCrewTick(F, dt);
if (k < 1)
return;
crashRestore(F);
CRASH.down.splice(i, 1);
},
function (F) {
var c = F.c;
if (c.src === "inst") {
if (F.obj)
scene.remove(F.obj);
if (F.stump)
scene.remove(F.stump);
crashHideInst(F.x, F.z, false);
}
else if (c.src === "junc") {
var o = F.obj;
o.quaternion.set(0, 0, 0, 1);
o.rotation.set(0, F.yaw, 0);
o.userData.crashDown = false;
F.glow.forEach(function (G) { if (G.mesh && G.orig)
G.mesh.material = G.orig; });
}
else {
var g = F.obj;
if (g) {
g.quaternion.set(0, 0, 0, 1);
g.rotation.set(0, F.yaw, 0);
F.glow.forEach(function (G) { if (G.mesh && G.orig)
G.mesh.material = G.orig; });
g.userData.crashSpec = F.spec;
crashRebake(g);
}
if (F.spec) {
F.spec._crashDown = false;
if (F.spec._crashSolid !== undefined) {
F.spec.solid = F.spec._crashSolid;
delete F.spec._crashSolid;
}
if (typeof wallsAt !== "undefined")
wallsAt = -1;
}
}
if (F.crew)
crashCrewGo(F);
CRASH.nearAt = 0;
},
function (F) {
var x0 = F.x, z0 = F.z, ex = F.x + F.dx * F.len, ez = F.z + F.dz * F.len;
function under(px, pz, pad) { var vx = px - x0, vz = pz - z0, a = vx * F.dx + vz * F.dz; if (a < 0.4 || a > F.len + 0.4)
return false; var b = Math.abs(vx * -F.dz + vz * F.dx); return b < 0.55 + (pad || 0); }
var said = 0;
if (typeof CC !== "undefined" && CC.pool)
CC.pool.forEach(function (p) { if (p && p.state !== "gone" && p.g && p.g.visible && under(p.g.position.x, p.g.position.z, 0.2)) {
crashNpcDown(p.g, p, F.dx, F.dz, "pole", 0);
said++;
} });
if (typeof LIVE !== "undefined" && LIVE.figs)
LIVE.figs.forEach(function (g) { if (!g.parent || !g.visible)
return; g.getWorldPosition(CRASH.V); if (under(CRASH.V.x, CRASH.V.z, 0.2)) {
crashNpcDown(g, null, F.dx, F.dz, "pole", 0);
said++;
} });
if (typeof presenceOthers !== "undefined")
for (var id in presenceOthers) {
var p2 = presenceOthers[id];
if (p2 && p2.group && !p2.away && under(p2.group.position.x, p2.group.position.z, 0.2)) {
crashKnockFig(p2.group, F.dx, F.dz, true);
said++;
}
}
if (typeof TRAFFIC !== "undefined")
TRAFFIC.forEach(function (t) {
if (!t.g || !t.g.visible || t.rail)
return;
if (under(t.g.position.x, t.g.position.z, (t.hw || 1))) {
t.crash = Math.max(t.crash || 0, 20);
t.vc = 0;
t.jolt = Math.max(-0.5, Math.min(0.5, (t.jolt || 0) + 0.06));
if (typeof trfHazards === "function")
trfHazards(t);
try {
trfSmoke(t.g.position.x, t.g.position.y + 1.2, t.g.position.z);
}
catch (e) { }
said++;
}
});
var P = camera.position;
if (typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.mode === "road") {
var S = vehSpec(DRIVE.arch);
if (S && under(P.x, P.z, S.wid)) {
crashDent(F.dx, F.dz, 6);
setStatus("<b>The falling " + (F.kind === "tree" ? "tree" : "post") + " lands on your car.</b> The roof is dented.");
}
}
else if (crashMeOk() && under(P.x, P.z, 0.15))
crashMeHit("pole", F.id, 0, null, F);
if (said && F.mine)
setStatus("<b>The " + (F.kind === "tree" ? "tree" : F.kind === "lamp" ? "lamp post" : "post") + " falls across the pavement</b> and onto " + (said === 1 ? "somebody" : "people") + " walking there. Stop, and call for help: the ambulance is on its way.");
},
function (H) {
if (!H)
return;
var v = H.v || 0, mph = v / MPH_MS, h = H.h || 0, dx = -Math.sin(h), dz = -Math.cos(h);
if (DRIVE && DRIVE.v < 0) {
dx = -dx;
dz = -dz;
}
if (v > 4)
crashDent(dx, dz, v);
if (H.k === "p" && H.s) {
var s = H.s;
if (s.kind === "dreamer" && s.ref && s.ref.group) {
if (mph >= 5)
crashKnockFig(s.ref.group, dx, dz, mph >= 12);
var uid = s.ref.group.userData.presence;
crashLog("strike", H.x, H.z, null, mph, uid, "", null);
}
else if (s.kind === "citizen" || s.kind === "worker" || s.kind === "figure") {
if (mph >= 5) {
crashNpcDown(s.g, s.kind === "citizen" ? s.ref : null, dx, dz, "car", mph);
crashLog("npc", H.x, H.z, null, mph, null, s.kind, function (o) {
if (o && o.id && mph >= 8 && !crashChauffeurOn())
cityRpc("crash_npc_bill", { p_event: o.id }).then(function (b) {
if (b && b.bill > 0)
setTimeout(function () { setStatus("<b>The City Hospital's bill</b> for the person you struck: " + b.bill + " gold" + (b.paid < b.bill ? " (" + b.paid + " paid, all you had)" : "") + "."); }, 5000);
}).catch(function () { });
});
}
}
}
else if (H.k === "v" && v > 2.4) {
crashLog("vehicle", H.x, H.z, null, mph, null, (H.s && H.s.arch) || "", null);
if (H.s && H.s.ref && H.s.ref.g && v > 7)
try {
trfSmoke(H.s.ref.g.position.x, H.s.ref.g.position.y + 1.1, H.s.ref.g.position.z);
}
catch (e) { }
}
else if (v > 4 && crashChauffeurOn())
crashLog("vehicle", H.x, H.z, null, mph, null, "wall", null);
if (crashChauffeurOn() && v > 2.4 && typeof chaufCrash === "function")
chaufCrash(H.k === "p" ? "struck somebody" : H.k === "v" ? "hit a vehicle" : "hit something", mph);
},
function (v, x, z, word) {
var mph = v / MPH_MS, h = DRIVE.h, sg = DRIVE.v >= 0 ? 1 : -1;
crashDent(-Math.sin(h) * sg, -Math.cos(h) * sg, v);
try {
if (typeof trfCrashSound === "function")
trfCrashSound(v * 0.7);
}
catch (e) { }
if (!crashChauffeurOn())
setStatus("<b>Crash.</b> You hit " + word + " at " + Math.round(mph) + " mph and knock it over. It is reported to the city works." + (mph > 22 ? " At that speed you could have killed somebody." : ""));
if (crashChauffeurOn() && typeof chaufCrash === "function")
chaufCrash("knocked over " + word, mph);
},
function (g, cc, dx, dz, why, mph) {
if (!g)
return;
for (var i = 0; i < CRASH.knocks.length; i++)
if (CRASH.knocks[i].g === g)
return;
var down = why === "pole" || mph >= 12, amb = why === "pole" || mph >= 20;
var K = { g: g, cc: cc, t: 0, down: down, amb: amb, x: g.position.x, y: g.position.y, z: g.position.z, ry: g.rotation.y,
face: Math.atan2(-dx, -dz), body: g.children[0] || g, taken: false, up: down && !amb ? 6 : 0, lie: 0 };
if (cc) {
cc.state = "gone";
if (cc.tag)
cc.tag.visible = false;
}
var push = Math.min(3, 0.4 + (mph || 6) * 0.06);
var nx = g.position.x + dx * push, nz = g.position.z + dz * push;
if (!(typeof blockedAt === "function" && blockedAt(nx, nz, terrainY(nx, nz)))) {
K.x = nx;
K.z = nz;
}
K.x0 = g.position.x;
K.z0 = g.position.z;
K.y = g.parent === scene || cc ? terrainY(K.x, K.z) : g.position.y;
g.getWorldPosition(CRASH.V || (CRASH.V = new THREE.Vector3()));
K.wx = CRASH.V.x + (K.x - K.x0);
K.wz = CRASH.V.z + (K.z - K.z0);
CRASH.knocks.push(K);
if (amb)
crashAmbulance(K);
},
function (K) {
var b = K.body;
if (b)
b.rotation.x = 0;
if (K.g) {
K.g.rotation.y = K.ry;
if (K.g.visible === false && !K.cc)
K.g.visible = true;
}
if (K.cc) {
var p = K.cc;
if (!K.taken && ATLC) {
var dx = K.wx - ATLC.x, dz = K.wz - ATLC.z;
p.r = Math.hypot(dx, dz);
p.a = Math.atan2(dz, dx);
p.state = "walk";
p.g.visible = true;
}
else {
p.state = "gone";
p.g.visible = false;
}
}
},
function (K) {
if (CRASH.amb.length >= 2) {
K.up = 10;
K.amb = false;
return;
}
var Pc = camera.position;
if (Math.hypot(K.wx - Pc.x, K.wz - Pc.z) > 160) {
K.taken = true;
K.done = true;
return;
}
var v = null;
try {
v = build({ id: "__crash_amb" + CRASH.amb.length, archetype: "van", attrs: {}, solid: false, detail: 3, nights: [], city: true });
}
catch (e) {
v = new THREE.Group();
}
var M = crashMats(), white = mL(0xF4F4F0), red = new THREE.MeshLambertMaterial({ color: 0xD02020 }), blue = new THREE.MeshBasicMaterial({ color: 0x3A7AFF });
v.traverse(function (m) { if (m.isMesh && m.material && !Array.isArray(m.material) && m.material.color && !m.material.transparent) {
var hsl = {};
m.material.color.getHSL(hsl);
if (hsl.l > 0.2) {
m.material = white;
}
} m.raycast = function () { }; });
[-1, 1].forEach(function (s) { var cr = new THREE.Group(); cr.add(P(box(0.02, 0.7, 0.22), red, 0, 0, 0)); cr.add(P(box(0.02, 0.22, 0.7), red, 0, 0, 0)); cr.position.set(s * 1.0, 1.3, 0); v.add(cr); });
v.add(P(box(0.9, 0.14, 0.3), blue, 0, 2.3, 1.2));
var dx = K.wx - ATLC.x, dz = K.wz - ATLC.z, r = Math.hypot(dx, dz), a = Math.atan2(dz, dx), rs = r;
Object.keys(ATL_STREETS).forEach(function (k) { ATL_STREETS[k].forEach(function (s) { if (Math.abs(s - r) < Math.abs(rs - r) || rs === r)
rs = s; }); });
var lane = Math.abs(rs - r) < 16 ? rs + (r > rs ? 4.6 : -4.6) : r + (r > rs ? -3 : 3);
var stop = { x: ATLC.x + Math.cos(a) * lane, z: ATLC.z + Math.sin(a) * lane }, from = { x: ATLC.x + Math.cos(a - 36 / lane) * lane, z: ATLC.z + Math.sin(a - 36 / lane) * lane };
var go = { x: ATLC.x + Math.cos(a + 40 / lane) * lane, z: ATLC.z + Math.sin(a + 40 / lane) * lane };
v.position.set(from.x, terrainY(from.x, from.z), from.z);
scene.add(v);
var crew = [0, 1].map(function (i) {
var L = typeof randomLook === "function" ? randomLook("crash_medic" + i, "human") : blankLook("human");
if (typeof jobDress === "function")
try {
jobDress(L, "Paramedic", "The City Hospital");
}
catch (e) { }
L.top = 0x2E7A3A;
var f = buildFigure({ id: "__crash_medic" + i, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
f.traverse(function (m) { m.raycast = function () { }; });
f.visible = false;
scene.add(f);
return f;
});
var A = { v: v, crew: crew, K: K, from: from, stop: stop, go: go, t: 0, phase: "come" };
CRASH.amb.push(A);
if (walkMode)
setTimeout(function () { if (CRASH.amb.indexOf(A) > -1)
setStatus("<b>An ambulance from the City Hospital</b> pulls up. The paramedics see to the injured."); }, 4000);
},
function (F) {
var Pc = camera.position;
F.crew = { far: Math.hypot(F.x - Pc.x, F.z - Pc.z) > 180, t: 0, g: null };
if (F.crew.far)
return;
var g = new THREE.Group(), M = crashMats();
try {
var v = build({ id: "__crash_works", archetype: "van", attrs: {}, solid: false, detail: 3, nights: [], city: true });
v.position.set(-F.dz * 3.2, 0, F.dx * 3.2);
v.rotation.y = Math.atan2(F.dx, F.dz);
g.add(v);
}
catch (e) { }
for (var c = 0; c < 4; c++) {
var a = c * Math.PI / 2 + 0.4, cn = P(M.coneGeo, M.cone, Math.cos(a) * 1.6 + F.dx * F.len * 0.5, 0.3, Math.sin(a) * 1.6 + F.dz * F.len * 0.5);
g.add(cn);
}
[0, 1].forEach(function (i) {
var L = typeof randomLook === "function" ? randomLook("crash_works" + i, "human") : blankLook("human");
if (typeof jobDress === "function")
try {
jobDress(L, "Road worker", "Dragon Corp city works");
}
catch (e) { }
L.top = 0xE8E04A;
var f = buildFigure({ id: "__crash_works" + i, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
f.position.set(F.dx * (1.2 + i * 1.6) + (i ? 0.8 : -0.8) * F.dz, 0, F.dz * (1.2 + i * 1.6) - (i ? 0.8 : -0.8) * F.dx);
f.rotation.y = Math.atan2(-F.dx, -F.dz) + (i ? 0.4 : -0.4);
g.add(f);
});
g.position.set(F.x, F.y, F.z);
g.traverse(function (m) { m.raycast = function () { }; });
scene.add(g);
F.crew.g = g;
},
function (dx, dz, v) {
if (!(typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.mode === "road"))
return;
var D = CRASH.dmg || (CRASH.dmg = { n: 0, tilt: 0, smoke: 0, g: null, dents: [], wisps: [] });
D.n++;
var sev = Math.min(1, v / 14);
D.tilt = Math.max(-0.05, Math.min(0.05, D.tilt + (Math.random() < 0.5 ? -1 : 1) * 0.012 * sev));
if (v > 8)
D.smoke = Math.max(D.smoke, Math.min(1, 0.3 + sev));
var h = DRIVE.h, fx = -Math.sin(h), fz = -Math.cos(h), al = dx * fx + dz * fz, sd = dx * -fz + dz * fx;
D.dents.push({ al: al, sd: sd, s: 0.35 + sev * 0.5 });
crashDamageDress();
},
function () {
var D = CRASH.dmg;
if (!D || typeof rideG === "undefined" || !rideG)
return;
var M = crashMats(), S = vehSpec(DRIVE.arch) || { len: 2.3, wid: 0.95 };
if (D.g !== rideG) {
D.g = rideG;
D.made = 0;
D.wisps = [];
}
for (; D.made < D.dents.length; D.made++) {
var d = D.dents[D.made];
var lz = d.al > 0.3 ? S.len * 0.98 : (d.al < -0.3 ? -S.len * 0.98 : 0), lx = Math.abs(d.al) <= 0.3 ? (d.sd > 0 ? -1 : 1) * S.wid * 0.98 : (d.sd * 0.6);
var dm = P(box(Math.abs(lz) > 0 ? d.s * 1.4 : 0.06, d.s * 0.6, Math.abs(lz) > 0 ? 0.06 : d.s * 1.4), M.dent, lx, 0.65, lz);
dm.raycast = function () { };
rideG.add(dm);
}
if (D.smoke > 0 && !D.wisps.length) {
for (var i = 0; i < 6; i++) {
var wm = new THREE.MeshLambertMaterial({ color: 0x6E6E72, transparent: true, opacity: 0, depthWrite: false });
var w = P(M.smokeGeo, wm, 0, 1.1, S.len * 0.75);
w.raycast = function () { };
rideG.add(w);
D.wisps.push({ m: w, ph: i / 6 });
}
}
},
function (kind, x, z, dir, mph, victim, what, then) {
if (!crashSigned() || !ATLC) {
if (then)
then(null);
return;
}
var lim = DRIVE && DRIVE.road && DRIVE.road.mph ? DRIVE.road.mph : null;
cityRpc("crash_log", { p_kind: kind, p_x: x - ATLC.x, p_z: z - ATLC.z, p_dir: dir, p_mph: Math.round(mph * 10) / 10, p_limit: lim, p_victim: victim || null,
p_what: String(what || "").slice(0, 60), p_chauffeur: crashChauffeurOn() }).then(function (o) {
if (o && o.id)
CRASH.myEv[o.id] = 1;
if (o && o.chauffeur && typeof chaufServerSays === "function")
chaufServerSays(o);
if (then)
then(o);
}).catch(function (e) { if (typeof rpcMissing === "function" && rpcMissing(e))
CRASH.missing = true; if (then)
then(null); });
},
function (kind, ev, mph, driver, F) {
if (CRASH.cool > 0)
return;
CRASH.cool = 4;
var word = kind === "pole" ? "A " + (F && F.kind === "tree" ? "tree" : "lamp post") + " knocked over by a car falls on you" : "A car strikes you at " + Math.round(mph) + " mph";
if (!crashSigned()) {
setStatus("<b>" + word + ".</b> You are knocked down and shaken. Sign in and the City Hospital would see to you.");
crashMeFall(mph >= 12 || kind === "pole");
return;
}
var send = function (evId) {
cityRpc("crash_hurt", { p_kind: kind, p_event: evId || null, p_mph: Math.round((mph || 0) * 10) / 10, p_driver: driver || null, p_x: camera.position.x - ATLC.x, p_z: camera.position.z - ATLC.z }).then(function (d) {
if (!d)
return;
if (typeof d.hp === "number" && typeof harmApply === "function") {
CRASH.quiet = true;
try {
harmApply({ hp: d.hp, state: d.state, recovers_at: d.recovers_at });
}
finally {
CRASH.quiet = false;
}
}
if (d.ok === false) {
return;
}
var m = d.mph !== undefined && kind !== "pole" ? Math.round(d.mph) : Math.round(mph);
if (!d.harm) {
setStatus("<b>" + (kind === "pole" ? word : "A car nudges you") + ".</b> No harm done.");
return;
}
crashMeFall(d.harm >= 18);
var how = d.state === "down" ? "You go down, and are carried to the City Hospital" + (d.recovers_at && typeof harmClock === "function" ? "; on your feet about " + harmClock(d.recovers_at) : "") + "." :
d.harm >= 40 ? "You are badly hurt: " + d.hp + " of 100." : d.harm >= 18 ? "You are hurt: " + d.hp + " of 100." : "Bruised: " + d.hp + " of 100.";
var who = d.driver ? " The driver was " + esc(d.driver) + "." : "";
var cov = d.covered ? " It was the Keeper's car: the city's fleet insurance pays you " + (d.covered.fleet + d.covered.city) + " gold at once." :
(d.can_claim ? " You may claim damages from the driver: open <b>Claims</b>." : "");
setStatus("<b>" + (kind === "pole" ? word : "A car strikes you at " + m + " mph") + ".</b> " + how + who + cov);
if (d.can_claim) {
CRASH.claimsAt = 0;
crashClaimsBtn(true);
}
}).catch(function (e) { if (typeof rpcMissing === "function" && rpcMissing(e))
CRASH.missing = true; setStatus("<b>" + word + ".</b>"); });
};
if (driver)
CRASH.selfHit = CRASH.selfHit || {}, CRASH.selfHit[driver] = performance.now();
if (ev) {
send(ev);
return;
}
var q = { F: F, ev: null, t: 0, send: send, driver: driver, kind: kind };
CRASH.pend.push(q);
if (kind !== "pole")
CRASH.feedAt = 0;
},
function (r) {
CRASH.seen[r.id] = 1;
if (!crashMeOk())
return;
if (CRASH.pend.some(function (q) { return q.driver === r.driver; })) {
CRASH.pend.forEach(function (q) { if (q.driver === r.driver)
q.ev = r.id; });
return;
}
if (CRASH.selfHit && CRASH.selfHit[r.driver] && performance.now() - CRASH.selfHit[r.driver] < 30000)
return;
crashMeHit("car", r.id, r.mph || 0, r.driver, null);
},
function (show) {
if (!CRASH.btn) {
if (!show)
return;
var st = document.createElement("style");
st.textContent = CRASH_CSS;
document.head.appendChild(st);
var b = document.createElement("button");
b.id = "crash-claims";
b.className = "btn";
b.textContent = "⚖ Claims";
b.title = "Injuries, civil claims and letters from the civil list";
b.onclick = function (ev) { ev.stopPropagation(); crashClaims(); };
document.body.appendChild(b);
CRASH.btn = b;
}
CRASH.btn.style.display = show ? "block" : "none";
},
function () {
if (document.exitPointerLock)
document.exitPointerLock();
var w = document.getElementById("crash-panel");
if (!w) {
w = document.createElement("div");
w.id = "crash-panel";
document.body.appendChild(w);
w.addEventListener("click", function (e) { if (e.target === w)
w.remove(); });
}
var o = CRASH.claims || { injuries: [], mine: [], against: [], bench: [] };
var st = { letter: "Letter sent: waiting for the driver", court: "Before the court", plan: "Awarded: being paid off", paid: "Paid", settled: "Settled", dismissed: "Dismissed", covered: "Paid by the city's fleet insurance" };
var h = "<div class='cp'><div style='display:flex;justify-content:space-between'><b style='font-size:18px'>The Courthouse · civil list</b><button class='btn' data-x='1'>×</button></div>" +
"<div style='font-size:12px;color:#6A5E50'>Claims for injuries on the road. A civil claim is not a crime: nobody is charged, held or marked.</div>";
if (o.injuries.length) {
h += "<h4 style='margin:12px 0 2px'>Your injuries</h4>";
o.injuries.forEach(function (i) {
h += "<div class='row'>" + (i.kind === "pole" ? "A pole knocked over by " + esc(i.driver) + "'s car fell on you" : "Struck by " + esc(i.driver) + "'s car at " + Math.round(i.mph) + " mph") +
" · " + i.harm + " harm" + (i.down ? ", taken to hospital" : "") + (i.speeding ? " · they were speeding" : "") + (i.unlicensed ? " · no licence" : "") +
"<br><button class='btn' data-file='" + i.id + "'>Claim damages</button></div>";
});
}
if (o.against.length) {
h += "<h4 style='margin:12px 0 2px'>Claims against you</h4>";
o.against.forEach(function (c) {
h += "<div class='row'>Claim no. " + c.id + " from " + esc(c.by) + ": " + c.amount + " gold · <i>" + (st[c.status] || c.status) + "</i>" + (c.owed ? " · " + c.owed + " still owed" : "") +
(c.ruling ? "<br>" + esc(c.ruling) : "") +
(c.status === "letter" || c.status === "court" ? "<br><button class='btn' data-settle='" + c.id + "'>Settle for " + c.offer + " gold</button><button class='btn' data-defend='" + c.id + "'>Put my side to the judge</button>" : "") + "</div>";
});
}
if (o.mine.length) {
h += "<h4 style='margin:12px 0 2px'>Your claims</h4>";
o.mine.forEach(function (c) {
h += "<div class='row'>Claim no. " + c.id + " against " + esc(c.against) + ": " + c.amount + " gold · <i>" + (st[c.status] || c.status) + "</i> · " + c.paid + " paid" + (c.owed ? ", " + c.owed + " owed" : "") + (c.ruling ? "<br>" + esc(c.ruling) : "") + "</div>";
});
}
if ((o.bench || []).length) {
h += "<h4 style='margin:12px 0 2px'>On the bench: the civil list</h4>";
o.bench.forEach(function (c) {
h += "<div class='row'>No. " + c.id + ": " + esc(c.by) + " v. " + esc(c.against) + ", " + c.amount + " gold claimed · " + Math.round(c.mph) + " mph, " + c.harm + " harm" + (c.down ? ", hospital" : "") +
(c.speeding ? ", speeding" : "") + (c.unlicensed ? ", unlicensed" : "") + (c.statement ? "<br>The driver says: " + esc(c.statement) : "") +
"<br><button class='btn' data-rule='" + c.id + "' data-amt='" + c.amount + "'>Award damages</button><button class='btn' data-rule='" + c.id + "' data-amt='0'>Dismiss</button></div>";
});
}
if (!o.injuries.length && !o.against.length && !o.mine.length && !(o.bench || []).length)
h += "<p>Nothing on the civil list for you.</p>";
h += "</div>";
w.innerHTML = h;
var redo = function (msg) { if (msg)
setStatus(msg); CRASH.claimsAt = 0; setTimeout(function () { crashClaimsTick(0); setTimeout(function () { if (document.getElementById("crash-panel"))
crashClaims(); }, 900); }, 300); };
w.querySelector("[data-x]").onclick = function () { w.remove(); };
w.querySelectorAll("[data-file]").forEach(function (b) {
b.onclick = function () {
b.disabled = true;
cityRpc("civil_claim_file", { p_injury: +b.getAttribute("data-file") }).then(function (r) {
redo(r && r.ok ? (r.covered ? "<b>Paid.</b> The Keeper's car: the city's fleet insurance pays you." : "<b>Claim no. " + r.claim + " is filed</b> for " + r.amount + " gold. The Courthouse writes to the driver.") : esc((r && r.say) || "It could not be filed."));
}).catch(function () { b.disabled = false; });
};
});
w.querySelectorAll("[data-settle]").forEach(function (b) {
b.onclick = function () {
b.disabled = true;
cityRpc("civil_claim_settle", { p_claim: +b.getAttribute("data-settle") }).then(function (r) {
redo(r && r.ok ? "<b>Settled.</b> " + r.paid + " gold paid" + (r.owed ? "; " + r.owed + " more is owed and taken as you earn it" : "") + "." : esc((r && r.say) || "Not settled."));
}).catch(function () { b.disabled = false; });
};
});
w.querySelectorAll("[data-defend]").forEach(function (b) {
b.onclick = function () {
var why = prompt("Your side, for the judge (you may leave it empty):", "") || "";
b.disabled = true;
cityRpc("civil_claim_defend", { p_claim: +b.getAttribute("data-defend"), p_statement: why.slice(0, 1000) }).then(function (r) { redo(r && r.ok ? "<b>Listed for a hearing.</b> The judge will rule; with no judge on the bench, the stand-in judge rules after the hearing." : esc((r && r.say) || "")); }).catch(function () { b.disabled = false; });
};
});
w.querySelectorAll("[data-rule]").forEach(function (b) {
b.onclick = function () {
var amt = +b.getAttribute("data-amt"), note = "";
if (amt > 0) {
var a = prompt("Damages to award, in gold (up to a quarter more than claimed):", String(amt));
if (a === null)
return;
amt = Math.max(0, Math.round(+a || 0));
note = prompt("A line for the ruling:", "") || "";
}
b.disabled = true;
cityRpc("civil_claim_rule", { p_claim: +b.getAttribute("data-rule"), p_award: amt, p_note: note.slice(0, 300) }).then(function (r) { redo(r && r.ok ? "<b>Ruled.</b> " + (r.award ? r.award + " gold in damages." : "Dismissed.") : esc((r && r.say) || "")); }).catch(function () { b.disabled = false; });
};
});
},
function (mph, kind) {
var P = camera.position, L = crashPolesNear(P.x, P.z, 60, []), best = null, bd = 1e9;
L.forEach(function (c) { if (kind && c.kind !== kind)
return; var d = Math.hypot(c.x - P.x, c.z - P.z); if (d < bd) {
bd = d;
best = c;
} });
if (!best)
return "Nothing to knock over near you.";
var a = Math.atan2(best.x - P.x, best.z - P.z);
crashKnock(best, Math.sin(a), Math.cos(a), (mph || 25) * MPH_MS, true);
return "Knocked over " + CRASH_KIND[best.kind].word + " " + Math.round(bd) + " m away.";
}
];
});
