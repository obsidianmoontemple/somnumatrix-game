/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(322, function () {
"use strict";
return [
function (P) {
P.k("marketstall", 20, -104, -Math.PI / 2, 1);
P.person("uw_stall", 16, -104, Math.PI / 2, { sex: "f", look: { top: 0x5A5A62, topKind: "robe", bottom: 0x4A4A52, skin: 0xC8C4BC, hair: 0xB8B8C0 } }, ldWho("The shade at the stall", "the Underworld", "a gentle shade who keeps a little stall of juice, honey cakes and lanterns by the road to the Hall of Judgement", "Something for the road, traveller? Juice from the queen's own tree, and honey cakes. The dog likes them too."));
},
function (P) {
P.k("marketstall", -23, -92, Math.PI / 2, 1);
P.person("hv_baker", -19, -92, -Math.PI / 2, { sex: "m", look: { top: 0xF0ECE0, topKind: "robe", bottom: 0xE8E4D8, hair: 0xD8C890 } }, ldWho("The cloud-baker", "the Heavens", "a cheerful baker who bakes cloud bread on the cloud lawns and sells nectar by the fountain court", "Fresh from the cloud oven! Light as air, and it fills you up all the same. A cup of nectar with it?"));
},
function (P) {
P.person("de_baker", -85, -55, 2.36, { sex: "f", look: { top: 0xC8402A, topKind: "shirt", bottom: 0x2A2A30, hair: 0x1A1210 } }, ldWho("The baker of the ofrendas", "the Land of the Dead", "a baker who keeps the stall among the market tables, selling pan de muerto, champurrado, sugar skulls and papel picado", "Pan de muerto, still warm! And champurrado to go with it. Take a sugar skull for your ofrenda, too."));
},
function (P) {
P.path([[0, -40], [70, 0], [118, 32]], 3, 0x5A6A7A, "lanternpost", 18);
P.k("landinglights", 132, 42, 0, 1);
P.k("saucer", 132, 42, 0.4, 1.1);
P.k("teleportpad", 112, 56, 0, 1);
P.k("habitat", 160, 52, -Math.PI / 2, 1);
P.k("habitat", 142, 78, -2.2, 0.9);
P.k("crystalspire", 172, 92, 0, 1.1);
P.k("crystalspire", 182, 76, 0.6, 0.8);
P.strew("alienflora", 8, 34, 60, 1201, 0.8, 1.3, null, 132, 42);
P.strew("glowflowers", 8, 26, 50, 1202, 0.8, 1.2, null, 132, 42);
P.being("alien", 120, 30, -1.2, 1, ldWho("The skyport warden", "Another World", "the warden of the skyport, where ships from other worlds set down", "Mind the pad, a ship's due. Visitors from three worlds came through today. Shall I show you the loop the pilots walk to check the pads?"));
P.being("alien", 112, 66, 2.2, 0.95, null, { r: 8, sp: 0.5 });
P.being("alien", 146, 16, 0.4, 0.9, null, { r: 8, sp: 0.45 });
P.sign(108, 22, -0.9, ["The Skyport", "Press E to read"], ["The Skyport", "Where ships from other worlds set down", ["Ships land on a pad ringed with lights, as helicopters do on Earth.", "The habitats beside it are for crews waiting for fair weather.", "On a planet with thinner air, wings give less lift, so ships here land straight down."]]);
},
function (P) {
P.k("shopcounter", -20, -66, 0, 1.2);
P.person("or_cook", -20, -68, 0, { sex: "m", look: { top: 0xE8E8EC, topKind: "shirt", bottom: 0x3A4A6A, hair: 0x2A1A10 } }, ldWho("The galley cook", "the Orbital", "the cook in the Orbital's galley, who heats pouches of stew and keeps the juice cold", "Stew's hot, juice is cold, and the greens are fresh off the racks. In orbit, food tastes blander; the fluids in your head float up and block your nose, like a cold. So I add extra spice."));
},
function (P) {
P.k("marketstall", 14, -160, -Math.PI / 2, 1);
P.person("tr_stall", 10, -160, Math.PI / 2, { sex: "f", look: { top: 0x6A4A8A, topKind: "shirt", bottom: 0x3A3A46, hair: 0x3A2A1A } }, ldWho("The pilgrims' stall-keeper", "Temple Row", "a friendly woman who keeps a stall of sweets, spring water, guidebooks and little brass bells for visitors to the Row", "Water for the walk, and a guidebook if you'd like to know what every part of every house is for. The bells ring sweetly; take one home."));
},
function (k, after) {
if (!dqSigned() || DQ.busy)
return;
DQ.busy = true;
dqRpc("dream_eat", { p_kind: k }).then(function (o) {
DQ.busy = false;
if (o && o.ok !== false && typeof needsGot === "function")
try {
needsGot(o);
}
catch (e) { }
setStatus(esc((o && o.say) || ""));
return dqReload().then(function () { if (after)
after(); });
})
.catch(function (e) { DQ.busy = false; setStatus(dqSaySoft(e)); });
},
function (x, z, rad) {
for (var i = 0; i < LD.solids.length; i++) {
var s = LD.solids[i];
if (s.r !== undefined) {
var dx = x - s.x, dz = z - s.z, m = s.r + rad;
if (dx * dx + dz * dz < m * m)
return true;
continue;
}
var c = Math.cos(-(s.rot || 0)), sn = Math.sin(-(s.rot || 0)), lx = (x - s.x) * c - (z - s.z) * sn, lz = (x - s.x) * sn + (z - s.z) * c;
if (Math.abs(lx) < s.hw + rad && Math.abs(lz) < s.hd + rad)
return true;
}
return false;
},
function (x, z, rad, road) {
var P = DQ.plan;
if (!P)
return false;
for (var i = 0; i < P.items.length; i++) {
var it = P.items[i];
if (it.t !== "k" && it.t !== "m" && it.t !== "p" && it.t !== "b" && it.t !== "s")
continue;
if (it.t === "k" && (DQ_SOFT.test(it.a) || road && DQ_WALK.test(it.a)))
continue;
var need = ldNeed(it), dx = x - it.x, dz = z - it.z, m = need + rad;
if (dx * dx + dz * dz < m * m)
return true;
}
return false;
},
function (x, z, rad, taken, wet, road) {
if (Math.hypot(x, z) < 10)
return false;
if (!ldClear(taken, x, z, rad + 0.6))
return false;
if (dqSolidHit(x, z, rad + 0.6) || dqPieceHit(x, z, rad + 0.3, road))
return false;
if (!wet && dqOnRibbon(x, z, "flow", 1.2))
return false;
if (!road && dqOnRibbon(x, z, "path", 0.4))
return false;
return true;
},
function (g, col, tx, ty, tz, rx, ry, sx, sy, sz) {
var q = g.index ? g.toNonIndexed() : g;
var m = new THREE.Matrix4().compose(new THREE.Vector3(tx || 0, ty || 0, tz || 0), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx || 0, ry || 0, 0)), new THREE.Vector3(sx || 1, sy || 1, sz || 1));
q.applyMatrix4(m);
var n = q.attributes.position.count, c = new Float32Array(n * 3), C = new THREE.Color(col);
for (var i = 0; i < n; i++) {
c[i * 3] = C.r;
c[i * 3 + 1] = C.g;
c[i * 3 + 2] = C.b;
}
q.setAttribute("color", new THREE.BufferAttribute(c, 3));
return q;
},
function (list) {
var n = 0;
list.forEach(function (g) { n += g.attributes.position.count; });
var pos = new Float32Array(n * 3), col = new Float32Array(n * 3), o = 0;
list.forEach(function (g) { pos.set(g.attributes.position.array, o * 3); col.set(g.attributes.color.array, o * 3); o += g.attributes.position.count; g.dispose(); });
var m = new THREE.BufferGeometry();
m.setAttribute("position", new THREE.BufferAttribute(pos, 3));
m.setAttribute("color", new THREE.BufferAttribute(col, 3));
m.computeVertexNormals();
m.computeBoundingSphere();
return m;
},
function (look, col) {
var G = [], c = col, green = 0x4A7A3A, T = THREE;
if (look === "bloom") {
[[0, 0], [0.22, 0.12], [-0.16, 0.18]].forEach(function (o, i) {
var h = 0.42 + i * 0.07;
G.push(dqGeoPiece(new T.CylinderGeometry(0.018, 0.022, h, 4), green, o[0], h / 2, o[1]));
G.push(dqGeoPiece(new T.ConeGeometry(0.15, 0.2, 7), c, o[0], h + 0.06, o[1], Math.PI));
G.push(dqGeoPiece(new T.SphereGeometry(0.05, 6, 4), 0xF0D060, o[0], h + 0.12, o[1]));
});
}
else if (look === "stone" || look === "ember") {
[[0, 0, 0.22], [0.24, 0.1, 0.13], [-0.18, 0.16, 0.1]].forEach(function (o) { G.push(dqGeoPiece(new T.DodecahedronGeometry(o[2], 0), c, o[0], o[2] * 0.6, o[1], 0.3, o[0] * 9, 1, 0.7, 1)); });
}
else if (look === "shell") {
G.push(dqGeoPiece(new T.SphereGeometry(0.22, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), 0xC8B8A0, 0, 0.02, 0, 0, 0, 1, 0.45, 1));
G.push(dqGeoPiece(new T.SphereGeometry(0.06, 8, 6), c, 0, 0.1, 0));
}
else if (look === "coin") {
[[0, 0], [0.14, 0.08], [-0.1, 0.12]].forEach(function (o, i) { G.push(dqGeoPiece(new T.CylinderGeometry(0.1, 0.1, 0.025, 12), c, o[0], 0.02 + i * 0.03, o[1], 0.15 * i, 0)); });
}
else if (look === "crystal") {
[[0, 0, 0, 1.2], [0.14, 0.06, 0.5, 0.8], [-0.12, 0.1, -0.4, 0.9]].forEach(function (o) { G.push(dqGeoPiece(new T.OctahedronGeometry(0.16, 0), c, o[0], 0.3 * o[3], o[1], o[2], 0, 0.8, 2.2 * o[3], 0.8)); });
}
else if (look === "feather") {
G.push(dqGeoPiece(new T.ConeGeometry(0.06, 0.6, 6), c, 0, 0.05, 0, Math.PI / 2, 0.4, 1.6, 1, 0.4));
G.push(dqGeoPiece(new T.CylinderGeometry(0.008, 0.008, 0.62, 3), 0xE8E0C8, 0, 0.07, 0, Math.PI / 2, 0.4));
}
else if (look === "mush") {
[[0, 0, 1], [0.2, 0.1, 0.7]].forEach(function (o) {
G.push(dqGeoPiece(new T.CylinderGeometry(0.04 * o[2], 0.05 * o[2], 0.22 * o[2], 6), 0xF0EADC, o[0], 0.11 * o[2], o[1]));
G.push(dqGeoPiece(new T.SphereGeometry(0.14 * o[2], 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), c, o[0], 0.2 * o[2], o[1]));
});
}
else if (look === "fruit" || look === "pomegranate") {
[[0, 0, 1], [0.2, 0.1, 0.8]].forEach(function (o) { G.push(dqGeoPiece(new T.SphereGeometry(0.13 * o[2], 10, 7), c, o[0], 0.13 * o[2], o[1], 0, 0, 1, 0.95, 1)); G.push(dqGeoPiece(new T.CylinderGeometry(0.06 * o[2], 0.03 * o[2], 0.07 * o[2], 6, 1, true), 0x7A1E2A, o[0], 0.28 * o[2], o[1])); });
G.push(dqGeoPiece(new T.SphereGeometry(0.11, 8, 6, 0, Math.PI), c, -0.18, 0.07, 0.14, -Math.PI / 2, 0));
G.push(dqGeoPiece(new T.CircleGeometry(0.1, 8), 0xF0C8C0, -0.18, 0.075, 0.14, -Math.PI / 2, 0));
for (var ps = 0; ps < 5; ps++)
G.push(dqGeoPiece(new T.SphereGeometry(0.018, 4, 3), 0xC01830, -0.18 + Math.cos(ps * 1.3) * 0.05, 0.085, 0.14 + Math.sin(ps * 1.3) * 0.05));
}
else if (look === "dates") {
G.push(dqGeoPiece(new T.CylinderGeometry(0.012, 0.016, 0.5, 4), 0xB8A050, 0, 0.2, 0, 0, 0, 1, 1, 1));
for (var dt = 0; dt < 11; dt++) {
var da = dt * 2.4, dy = 0.06 + (dt % 5) * 0.07;
G.push(dqGeoPiece(new T.SphereGeometry(0.04, 6, 5), dt % 3 ? c : 0x9A5A22, Math.cos(da) * 0.06, dy, Math.sin(da) * 0.06, 0, 0, 1, 1.8, 1));
}
G.push(dqGeoPiece(new T.ConeGeometry(0.05, 0.34, 4), green, 0.1, 0.02, 0.1, Math.PI / 2, 0.6, 1, 1, 0.3));
}
else if (look === "acorn") {
[[0, 0, 0.2], [0.18, 0.08, -0.5], [-0.12, 0.16, 0.9]].forEach(function (o) { G.push(dqGeoPiece(new T.SphereGeometry(0.07, 8, 6), c, o[0], 0.08, o[1], o[2], 0, 1, 1.5, 1)); G.push(dqGeoPiece(new T.SphereGeometry(0.078, 8, 5, 0, 6.283, 0, Math.PI / 2), 0x5A4028, o[0] + Math.sin(o[2]) * 0.0, 0.13, o[1], o[2], 0, 1, 0.8, 1)); G.push(dqGeoPiece(new T.CylinderGeometry(0.008, 0.008, 0.05, 3), 0x5A4028, o[0], 0.21, o[1])); });
G.push(dqGeoPiece(new T.CircleGeometry(0.16, 5), 0x8A6A2A, 0.02, 0.01, -0.14, -Math.PI / 2, 0.5, 1.5, 0.8, 1));
}
else if (look === "berry") {
[[0, 0], [0.17, 0.09], [-0.13, 0.14]].forEach(function (o) { G.push(dqGeoPiece(new T.CylinderGeometry(0.008, 0.01, 0.2, 3), green, o[0], 0.1, o[1])); for (var b = 0; b < 7; b++) {
var ba = b * 0.9;
G.push(dqGeoPiece(new T.SphereGeometry(0.03, 5, 4), c, o[0] + (b < 6 ? Math.cos(ba) * 0.035 : 0), 0.21 + (b < 6 ? (b % 2) * 0.03 : 0.05), o[1] + (b < 6 ? Math.sin(ba) * 0.035 : 0)));
} });
for (var lf = 0; lf < 3; lf++)
G.push(dqGeoPiece(new T.CircleGeometry(0.11, 5), green, Math.cos(lf * 2.1) * 0.14, 0.02 + lf * 0.004, Math.sin(lf * 2.1) * 0.14, -Math.PI / 2, lf));
}
else if (look === "domefruit") {
[[0, 0, 0], [0.2, 0.1, 1.2]].forEach(function (o) { G.push(dqGeoPiece(new T.SphereGeometry(0.1, 10, 7), c, o[0], 0.09, o[1], 0, o[2], 1.5, 0.95, 0.95)); G.push(dqGeoPiece(new T.ConeGeometry(0.035, 0.07, 5), c, o[0] + Math.cos(o[2]) * 0.16, 0.09, o[1] - Math.sin(o[2]) * 0.16, 0, o[2], 1, 1, 1)); });
for (var st = 0; st < 5; st++) {
var sa = st / 5 * 6.283;
G.push(dqGeoPiece(new T.ConeGeometry(0.035, 0.2, 3), 0xE8F070, -0.16 + Math.cos(sa) * 0.06, 0.1, 0.16 + Math.sin(sa) * 0.06, Math.sin(sa) * 0.9, 0, 1, 1, 1));
}
G.push(dqGeoPiece(new T.SphereGeometry(0.05, 6, 5), 0x60E0C0, -0.16, 0.1, 0.16));
}
else if (look === "pod") {
[[0, 0, 0.3], [0.14, 0.12, 1.4], [-0.14, 0.1, 2.3]].forEach(function (o) { G.push(dqGeoPiece(new T.SphereGeometry(0.05, 7, 5), c, o[0], 0.05, o[1], 0, o[2], 3.2, 0.8, 1)); for (var sd = 0; sd < 3; sd++)
G.push(dqGeoPiece(new T.SphereGeometry(0.03, 5, 4), 0x6A5A2A, o[0] + Math.cos(o[2]) * (sd - 1) * 0.09, 0.075, o[1] - Math.sin(o[2]) * (sd - 1) * 0.09)); });
G.push(dqGeoPiece(new T.ConeGeometry(0.02, 0.3, 3), 0x8A8A4A, 0.02, 0.15, -0.1, 0.3, 0));
}
else if (look === "puff") {
[[0, 0, 0.26], [0.22, 0.05, 0.2], [-0.18, 0.1, 0.18]].forEach(function (o) { G.push(dqGeoPiece(new T.IcosahedronGeometry(o[2], 1), c, o[0], o[2] * 0.9, o[1])); });
}
else if (look === "herb") {
for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.28;
G.push(dqGeoPiece(new T.ConeGeometry(0.035, 0.5, 4), c, Math.sin(a) * 0.1, 0.24, Math.cos(a) * 0.1, Math.sin(a) * 0.25, 0, 1, 1, 1));
}
}
else if (look === "scrap") {
G.push(dqGeoPiece(new T.BoxGeometry(0.32, 0.16, 0.22), c, 0, 0.08, 0, 0, 0.4));
G.push(dqGeoPiece(new T.CylinderGeometry(0.06, 0.06, 0.26, 8), 0x8A8A90, 0.2, 0.06, 0.1, Math.PI / 2, 1.1));
G.push(dqGeoPiece(new T.TorusGeometry(0.08, 0.02, 5, 10), 0x6A6A70, -0.18, 0.03, 0.12, Math.PI / 2));
}
else if (look === "orb") {
G.push(dqGeoPiece(new T.IcosahedronGeometry(0.13, 1), c, 0, 0.45, 0));
G.push(dqGeoPiece(new T.CylinderGeometry(0.02, 0.04, 0.36, 5), 0x5A5A6A, 0, 0.18, 0));
}
else if (look === "candle") {
[[0, 0, 0.22], [0.12, 0.06, 0.15], [-0.1, 0.08, 0.18]].forEach(function (o) { G.push(dqGeoPiece(new T.CylinderGeometry(0.04, 0.045, o[2], 8), c, o[0], o[2] / 2, o[1])); G.push(dqGeoPiece(new T.ConeGeometry(0.025, 0.07, 5), 0xFFB040, o[0], o[2] + 0.04, o[1])); });
}
else if (look === "piece") {
G.push(dqGeoPiece(new T.CylinderGeometry(0.12, 0.15, 0.08, 10), c, 0, 0.04, 0));
G.push(dqGeoPiece(new T.CylinderGeometry(0.06, 0.1, 0.28, 10), c, 0, 0.22, 0));
G.push(dqGeoPiece(new T.SphereGeometry(0.09, 8, 6), c, 0, 0.42, 0));
}
else if (look === "tablet") {
G.push(dqGeoPiece(new T.BoxGeometry(0.3, 0.05, 0.22), c, 0, 0.03, 0, 0, 0.3));
G.push(dqGeoPiece(new T.BoxGeometry(0.18, 0.05, 0.14), c, 0.2, 0.03, 0.12, 0, 1.1));
}
else if (look === "tile") {
G.push(dqGeoPiece(new T.BoxGeometry(0.5, 0.04, 0.32), c, 0, 0.04, 0, 0.2, 0.3));
G.push(dqGeoPiece(new T.BoxGeometry(0.52, 0.02, 0.34), 0x9AA0A8, 0, 0.015, 0, 0.2, 0.3));
}
else
G.push(dqGeoPiece(new T.SphereGeometry(0.18, 8, 6), c, 0, 0.18, 0));
return dqMerge(G);
},
function (r, land, taken) {
var spots = [], k = LD.kind, wantLite = !!(typeof LITE !== "undefined" && LITE);
(land.gather || []).forEach(function (g) {
var kind = g[0], n = g[1], area = g[4] || [0, -60, 150], R = ldRand(dqHash(k + ":" + kind)), got = 0;
for (var i = 0; i < n * 14 && got < n; i++) {
var t = R() * Math.PI * 2, d = Math.sqrt(R()) * area[2], x = area[0] + Math.sin(t) * d, z = area[1] + Math.cos(t) * d;
if (!dqFree(x, z, 0.6, taken, !!g[5]))
continue;
spots.push({ id: k + ":" + kind + ":" + i, kind: kind, look: g[2], col: g[3], x: x, z: z, y: ldY(x, z), rot: R() * 6.28 });
got++;
}
});
if (!spots.length)
return spots;
var group = new THREE.Group(), byLook = {};
spots.forEach(function (s) { var key = s.look + "|" + s.col; (byLook[key] = byLook[key] || []).push(s); });
var mat = new THREE.MeshLambertMaterial({ vertexColors: true });
Object.keys(byLook).forEach(function (key) {
var list = byLook[key], geo = dqLook(list[0].look, list[0].col), im = new THREE.InstancedMesh(geo, mat, list.length), o = new THREE.Object3D();
list.forEach(function (s, i) { s.im = im; s.ii = i; o.position.set(s.x, s.y, s.z); o.rotation.set(0, s.rot, 0); o.scale.set(1.4, 1.4, 1.4); o.updateMatrix(); im.setMatrixAt(i, o.matrix); s.m = o.matrix.clone(); });
im.instanceMatrix.needsUpdate = true;
im.frustumCulled = false;
group.add(im);
});
var pos = new Float32Array(spots.length * 3), col = new Float32Array(spots.length * 3);
spots.forEach(function (s, i) { var C = new THREE.Color(s.col).lerp(new THREE.Color(0xFFFFFF), 0.35); pos[i * 3] = s.x; pos[i * 3 + 1] = s.y + 0.55; pos[i * 3 + 2] = s.z; col[i * 3] = C.r; col[i * 3 + 1] = C.g; col[i * 3 + 2] = C.b; s.pi = i; });
var pg = new THREE.BufferGeometry();
pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
pg.setAttribute("color", new THREE.BufferAttribute(col, 3));
var pm = new THREE.PointsMaterial({ size: wantLite ? 1.3 : 1.6, map: (typeof softGlow === "function" ? softGlow() : null), vertexColors: true, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
var pts = new THREE.Points(pg, pm);
pts.frustumCulled = false;
group.add(pts);
spots.forEach(function (s) { s.pts = pts; });
pts.userData.ldAnim = function (m, t) { m.material.opacity = 0.48 + 0.08 * Math.sin(t * 0.9); };
DQ.spotsGroup = group;
return spots;
},
function (r) {
dqDrop();
var land = DQ_LANDS[r.kind];
if (!land || !LD.g)
return;
DQ.rid = r.id;
DQ.kind = r.kind;
var taken = ldTaken(r);
try {
DQ.spots = dqSpotsBuild(r, land, taken);
}
catch (e) {
DQ.spots = [];
if (window.console)
console.warn("dream-lands spots:", e);
}
if (DQ.spotsGroup)
LD.g.add(DQ.spotsGroup);
DQ.spots.forEach(function (s) { if (dqSpotReady(s))
LD.talkers.push(dqSpotTalker(s));
else
dqSpotShow(s, false); });
var B = land.board || [9, -14, -0.3];
if (r.kind !== "hall" && ldClear(taken, B[0], B[1], 1.2))
LD.talkers.push({ x: B[0], z: B[1], r: 3, name: "Things to do in " + land.name, verb: "read it", dq: { t: "board" } });
(land.talk || []).forEach(function (q) { if (ldClear(taken, q[0], q[1], 1))
LD.talkers.push({ x: q[0], z: q[1], r: q[2], name: q[3], t: ldWho(q[3], land.name, q[4], q[5]) }); });
try {
dqGamesBuild(r, land, taken);
}
catch (e) {
if (window.console)
console.warn("dream-lands games:", e);
}
},
function () {
if (DQ.game)
dqGameEnd(null, true);
if (DQ.spotsGroup) {
DQ.spotsGroup.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); if (m.material && m.material.dispose)
m.material.dispose(); });
if (DQ.spotsGroup.parent)
DQ.spotsGroup.parent.remove(DQ.spotsGroup);
}
dqGamesDrop();
DQ.spotsGroup = null;
DQ.spots = [];
DQ.rid = null;
DQ.kind = null;
},
function (s, T) {
if (DQ.busy)
return;
if (!dqSpotReady(s)) {
setStatus("Already gathered. More will turn up here before long.");
return;
}
var regrow = 20 * 60000;
var done = function (n, line) {
DQ.picked[s.id] = Date.now() + regrow;
dqPickedSave();
s.gone = true;
dqSpotShow(s, false);
var i = LD.talkers.indexOf(T);
if (i >= 0)
LD.talkers.splice(i, 1);
LD.near = null;
if (LD.prompted && typeof worldPrompt === "function") {
worldPrompt(null);
LD.prompted = false;
}
dqTone(880, 0.12);
setStatus(line);
};
if (!dqSigned()) {
var n = 1 + (dqHash(s.id + Date.now()) % 2);
dqBasketAdd(s.kind, n);
done(n, "<b>You gather " + n + " " + esc(dqLower(dqName(s.kind))) + "</b> " + dqIcon(s.kind) + ". Kept on this device: sign in and what you gather goes to your backpack, to sell, eat or hand in.");
return;
}
DQ.busy = true;
dqRpc("dream_gather", { p_land: DQ.kind, p_kind: s.kind, p_spot: s.id }).then(function (o) {
DQ.busy = false;
if (!o || o.ok === false) {
setStatus(esc((o && o.say) || "Not just now."));
if (o && o.wait) {
DQ.picked[s.id] = Date.now() + o.wait * 1000;
dqPickedSave();
s.gone = true;
dqSpotShow(s, false);
var i = LD.talkers.indexOf(T);
if (i >= 0)
LD.talkers.splice(i, 1);
LD.near = null;
}
return;
}
done(o.got, "<b>You gather " + o.got + " " + esc(dqLower(dqName(s.kind))) + "</b> " + dqIcon(s.kind) + " (in your backpack)." + (o.cap && o.units >= o.cap ? " That is all you can carry from the dream lands today." : ""));
dqReload();
}).catch(function (e) {
DQ.busy = false;
if (/function|404|PGRST|does not exist|schema cache/i.test(String((e && e.message) || e))) {
dqBasketAdd(s.kind, 1);
done(1, "<b>You gather 1 " + esc(dqLower(dqName(s.kind))) + "</b> " + dqIcon(s.kind) + ". Kept on this device for now.");
}
else
setStatus(dqSaySoft(e));
});
},
function (kind, who) {
var L = DQ_LANDS[kind];
if (!L || !who)
return [];
var out = [];
(L.errands || []).forEach(function (e) { if (e.who === who)
out.push({ t: "errand", e: e }); });
if (L.stall && L.stall.who === who)
out.push({ t: "stall" });
if (L.forge && L.forge.who === who)
out.push({ t: "forge" });
(L.games || []).forEach(function (g) { if (g.who === who)
out.push({ t: "game", g: g }); });
var l = L.lesson && DQ_LESSON[L.lesson];
if (l && l.who === who)
out.push({ t: "lesson", l: l });
if (kind === "hall" && who === "The Registrar of Doors")
out.push({ t: "passport" });
if (kind === "hall" && who === "A guide of the Hall")
out.push({ t: "lands" });
return out;
},
function (T, msg) {
var roles = dqRoles(LD.kind, T.name), fns = {}, h = "";
var talk = dqTalkFor(T);
if (T.p && T.p.g) {
var P = camera.position;
T.p.g.rotation.y = Math.atan2(P.x - (LD.ox + T.p.g.position.x), P.z - (LD.oz + T.p.g.position.z));
}
h += dqBtn("talk", "💬 Talk with " + esc(dqWho(T.name)), "say anything; they answer in character");
fns.talk = function () { worldCard(null); if (typeof wTalk === "function")
wTalk(talk); };
roles.forEach(function (R, i) {
var nm = "r" + i;
if (R.t === "errand") {
var e = R.e, done = dqDoneToday("e:" + e.k), can = dqCanErrand(e);
h += dqBtn(nm, (done ? "✓ " : "📜 ") + esc(e.n), done ? "done today: come back tomorrow" : "bring " + esc(dqNeedText(e.need)) + " · " + (dqSigned() ? e.gold + " gold" : "sign in for " + e.gold + " gold") + (e.gift ? " and " + esc(dqLower(dqName(e.gift[0]))) : "") + (can && !done ? " · <b>you have it all</b>" : ""));
fns[nm] = function () { dqErrandCard(T, e); };
}
else if (R.t === "stall") {
h += dqBtn(nm, "🛍️ " + esc(dqLand().stall.n), "food, drink and keepsakes, to your backpack");
fns[nm] = function () { dqStallCard(T); };
}
else if (R.t === "forge") {
var F = dqLand().forge;
h += dqBtn(nm, "🔨 Work at " + esc((typeof FG_STATIONS !== "undefined" && FG_STATIONS[F.station] && FG_STATIONS[F.station].name) || "the forge"), "make weapons, armour, tools and machines from your materials");
fns[nm] = function () { worldCard(null); if (typeof craftOpen === "function")
craftOpen(F.station);
else
setStatus("The forges open soon."); };
}
else if (R.t === "game") {
var g = R.g, won = dqDoneToday("g:" + g.k);
h += dqBtn(nm, (won ? "🏆 " : "🎲 ") + esc(g.n), (won ? "won today · play again for fun" : (dqSigned() ? "win " + g.gold + " gold" : "sign in to win " + g.gold + " gold")) + " · " + esc(dqGameKindText(g)));
fns[nm] = function () { dqGameIntro(T, g); };
}
else if (R.t === "lesson") {
var l = R.l;
h += dqBtn(nm, (dqLessonDone(l.n) ? "🗺️ " : "🎓 ") + "Lesson: " + esc(l.title), "World Learning: the Dream Lands · " + dqLessonCount() + " of " + DQ_LESSONS.length + " stamped");
fns[nm] = function () { dqLessonCard(l); };
}
else if (R.t === "passport") {
h += dqBtn(nm, "📘 Your Dreamwalker's Passport", "a stamp for every land: " + Object.keys(dqStamps()).length + " of " + DQ_ORDER.length);
fns[nm] = function () { dqPassportCard(); };
}
else if (R.t === "lands") {
h += dqBtn(nm, "🚪 Every land, and what is there", "and a door to take you straight there");
fns[nm] = function () { dqLandsCard(); };
}
});
if (msg)
h = "<div style='margin:4px 0 8px;color:#FFE7B0'>" + msg + "</div>" + h;
worldCard(dqHead(esc(T.name)) + "<div style='opacity:.8;margin-bottom:4px'>" + esc((dqLand() || {}).name || "") + "</div>" + h, fns);
},
function (T, e, msg) {
var fns = {}, done = dqDoneToday("e:" + e.k), h = "<div style='margin:6px 0'><i>\"" + esc(e.say) + "\"</i></div>";
var rows = Object.keys(e.need).map(function (k) { var have = dqHave(k); return "<div>" + dqIcon(k) + " " + e.need[k] + " " + esc(dqLower(dqName(k))) + " <span style='opacity:.7;color:" + (have >= e.need[k] ? "#CFE8C0" : "#E8A890") + "'>(you have " + have + ")</span></div>"; }).join("");
h += "<div style='margin:6px 0'><b>Bring</b>" + rows + "</div>";
h += "<div style='margin:6px 0'><b>Reward</b> " + e.gold + " gold" + (e.gift ? " and " + e.gift[1] + " " + dqIcon(e.gift[0]) + " " + esc(dqLower(dqName(e.gift[0]))) : "") + ", and a stamp in your Dreamwalker's Passport. Once a day.</div>";
if (done)
h += "<div style='opacity:.8'>You did this one today. Come back tomorrow.</div>";
else if (dqCanErrand(e)) {
h += dqBtn("give", "🤝 Hand it over", dqSigned() ? "from your backpack" : "from what you gathered on this device");
fns.give = function () { dqErrandDo(T, e); };
}
else {
h += dqBtn("where", "🧭 Where to find it", "the pointer at the top shows the nearest");
fns.where = function () { dqShowNearest(Object.keys(e.need).filter(function (k) { return dqHave(k) < e.need[k]; })[0]); };
}
h += dqBtn("back", "↩ Back", "");
fns.back = function () { dqRoleCard(T); };
if (msg)
h = "<div style='margin:4px 0 8px;color:#FFE7B0'>" + msg + "</div>" + h;
worldCard(dqHead("📜 " + esc(e.n)) + "<div style='opacity:.8'>for " + esc(e.who) + "</div>" + h, fns);
},
function (T, e) {
if (DQ.busy)
return;
if (!dqSigned()) {
Object.keys(e.need).forEach(function (k) { dqBasketAdd(k, -e.need[k]); });
if (e.gift)
dqBasketAdd(e.gift[0], e.gift[1]);
dqMarkDone("e:" + e.k, LD.kind);
dqTone(660, 0.2);
dqErrandCard(T, e, "Done, with thanks. Sign in and errands pay gold: " + e.gold + " for this one.");
return;
}
DQ.busy = true;
dqRpc("dream_errand", { p_errand: e.k }).then(function (o) {
DQ.busy = false;
if (o && o.ok !== false) {
dqMarkDone("e:" + e.k, LD.kind);
dqTone(660, 0.2);
if (o.stamp)
DQ.pass = null;
}
return dqReload().then(function () { dqPassLoad(); dqErrandCard(T, e, esc((o && o.say) || "")); });
}).catch(function (x) { DQ.busy = false; dqErrandCard(T, e, dqSaySoft(x)); });
},
function (kind) {
var P = camera.position, lx = P.x - LD.ox, lz = P.z - LD.oz, best = null, bd = 1e9;
DQ.spots.forEach(function (s) { if (s.kind !== kind || !dqSpotReady(s))
return; var d = Math.hypot(s.x - lx, s.z - lz); if (d < bd) {
bd = d;
best = s;
} });
worldCard(null);
if (!best) {
var where = Object.keys(DQ_LANDS).filter(function (k) { return (DQ_LANDS[k].gather || []).some(function (g) { return g[0] === kind; }); }).map(function (k) { return DQ_LANDS[k].name; });
setStatus(where.length && where.indexOf(dqLand().name) < 0 ? esc(dqName(kind)) + " is found in " + esc(where.join(", ")) + ". Go there through the Hall of Doors." : "None to be found just now: they turn up again before long. Or buy " + esc(dqLower(dqName(kind))) + " from another dreamer on the market.");
return;
}
if (typeof guideTo !== "undefined") {
guideTo = { key: dqName(kind), x: LD.ox + best.x, z: LD.oz + best.z };
DQ.guide = 1;
}
setStatus("<b>" + esc(dqName(kind)) + "</b>: follow the pointer at the top of the screen.");
},
function (T, msg) {
var L = dqLand(), S = L.stall, fns = {}, h = "<div style='opacity:.85;margin-bottom:6px'>" + (dqSigned() ? "Paid in gold; it goes to your backpack." : "Sign in to buy: it is paid in gold and kept in your backpack.") + "</div>";
S.goods.forEach(function (g, i) {
var c = DQ_ITEM[g[0]], nm = "b" + i, have = dqHave(g[0]);
h += dqBtn(nm, c.e + " " + esc(c.n) + (have ? " · you have " + have : ""), g[1] + " gold" + (c.fd ? " · food +" + c.fd : "") + (c.dr ? " · drink +" + c.dr : "") + (!c.fd && !c.dr ? " · a keepsake (the city buys it back for " + c.b + ")" : "") + " · " + esc(c.note));
fns[nm] = function () { dqBuy(T, g[0]); };
});
h += dqBtn("sell", "💰 Sell what you gathered", "to the city, at the city's price");
fns.sell = function () { dqSellCard(T); };
if (T) {
h += dqBtn("back", "↩ Back", "");
fns.back = function () { dqRoleCard(T); };
}
if (msg)
h = "<div style='margin:4px 0 8px;color:#FFE7B0'>" + msg + "</div>" + h;
worldCard(dqHead("🛍️ " + esc(S.n)) + h, fns);
},
function (T, k) {
if (!dqSigned()) {
dqStallCard(T, "Sign in to buy.");
return;
}
if (DQ.busy)
return;
DQ.busy = true;
dqRpc("dream_buy", { p_kind: k, p_amount: 1 }).then(function (o) {
DQ.busy = false;
if (o && o.ok !== false)
dqTone(740, 0.12);
return dqReload().then(function () { dqStallCard(T, esc((o && o.say) || "")); });
})
.catch(function (e) { DQ.busy = false; dqStallCard(T, dqSaySoft(e)); });
},
function (T, msg) {
var fns = {}, h = "", S = (typeof myStock !== "undefined" ? myStock : []).filter(function (s) { return (+s.amount || 0) > 0 && DQ_ITEM[s.kind]; });
if (!dqSigned())
h += "<div style='opacity:.8'>Sign in to sell: the city pays in gold.</div>";
else if (!S.length)
h += "<div style='opacity:.8'>You have nothing from the dream lands to sell yet. Gather something and bring it here.</div>";
S.forEach(function (s, i) {
var c = DQ_ITEM[s.kind], nm = "s" + i, each = +s.buys || c.b;
h += dqBtn(nm, c.e + " " + esc(c.n) + " × " + s.amount, "sell one for " + each + " gold");
fns[nm] = function () { dqSell(T, s.kind, 1); };
if (s.amount > 1) {
h += dqBtn(nm + "a", "Sell all " + s.amount, "for " + (each * s.amount) + " gold");
fns[nm + "a"] = function () { dqSell(T, s.kind, s.amount); };
}
});
h += dqBtn("back", "↩ Back", "");
fns.back = function () { dqStallCard(T); };
if (msg)
h = "<div style='margin:4px 0 8px;color:#FFE7B0'>" + msg + "</div>" + h;
worldCard(dqHead("💰 Sell to the city") + h, fns);
},
function (T, k, n) {
if (DQ.busy)
return;
DQ.busy = true;
dqRpc("sell_stock", { p_kind: k, p_amount: n }).then(function (o) {
DQ.busy = false;
return dqReload().then(function () { dqSellCard(T, o === "ok" ? "Sold " + n + " " + esc(dqLower(dqName(k))) + " to the city." : esc(String(o))); });
})
.catch(function (e) { DQ.busy = false; dqSellCard(T, dqSaySoft(e)); });
},
function () {
var L = dqLand(), fns = {}, h = "<div style='opacity:.85;margin-bottom:6px'>Tap any line and the pointer at the top of the screen shows you the way.</div>";
var people = {};
(L.errands || []).forEach(function (e) { (people[e.who] = people[e.who] || []).push("📜 " + e.n); });
if (L.stall)
(people[L.stall.who] = people[L.stall.who] || []).push("🛍️ " + L.stall.n);
if (L.forge)
(people[L.forge.who] = people[L.forge.who] || []).push("🔨 the forge");
(L.games || []).forEach(function (g) { (people[g.who] = people[g.who] || []).push("🎲 " + g.n); });
var l = L.lesson && DQ_LESSON[L.lesson];
if (l)
(people[l.who] = people[l.who] || []).push("🎓 " + l.title);
Object.keys(people).forEach(function (w, i) { var nm = "p" + i; h += dqBtn(nm, esc(w), esc(people[w].join(" · "))); fns[nm] = function () { dqGuideToWho(w); }; });
if ((L.gather || []).length) {
h += "<div style='margin:10px 0 2px'><b>Lying about, to gather</b> (they glow softly)</div>";
L.gather.forEach(function (g, i) { var nm = "g" + i; h += dqBtn(nm, dqIcon(g[0]) + " " + esc(dqName(g[0])), esc(DQ_ITEM[g[0]].note)); fns[nm] = function () { dqShowNearest(g[0]); }; });
}
h += "<div style='margin-top:8px;font-size:12px;opacity:.75'>Errands pay gold from the Treasury, once a day each (up to " + (DQ.day.cap || 200) + " gold a day from the dream lands). What you gather sells to the city. Every errand done or game won stamps your Dreamwalker's Passport: the Registrar of Doors in the Hall keeps it.</div>";
worldCard(dqHead("Things to do in " + esc(L.name)) + h, fns);
},
function (w) {
var T = null;
LD.talkers.forEach(function (x) { if (x.name === w)
T = x; });
worldCard(null);
if (!T) {
setStatus(esc(w) + " is not about just now.");
return;
}
var x = T.p ? T.p.g.position.x : T.x, z = T.p ? T.p.g.position.z : T.z;
if (typeof guideTo !== "undefined") {
guideTo = { key: w, x: LD.ox + x, z: LD.oz + z };
DQ.guide = 1;
}
setStatus("<b>" + esc(w) + "</b>: follow the pointer at the top of the screen.");
},
function (l) {
var S = DQ.lesson;
if (S.cur !== l.k) {
S.cur = l.k;
S.ans = {};
S.msg = "";
S.t0 = Date.now();
if (dqSigned())
dqRpc("school_begin", { p_course: "world-dream", p_unit: l.n }).catch(function () { });
}
var fns = {}, b = "";
b += "<div style='opacity:.7;font-size:12px'>Lesson " + l.n + " of " + DQ_LESSONS.length + " · World Learning: the Dream Lands · the Department of Education" + (dqLessonDone(l.n) ? " · ✓ stamped" : "") + "</div>";
b += "<div style='margin:6px 0'><b>What is true.</b> " + esc(l.real) + "</div><div style='margin:6px 0'><b>The science.</b> " + esc(l.science) + "</div>";
b += "<div style='margin:6px 0'><b>A word from here: " + esc(l.word[0]) + "</b>, " + esc(l.word[1]) + "</div>";
b += "<div style='margin:6px 0'><b>Try it.</b> " + esc(l.tryit) + "</div>";
b += "<div style='margin:10px 0 4px'><b>Two questions</b> for your stamp</div>";
l.quiz.forEach(function (q, k) {
b += "<div style='margin:6px 0 2px'>" + (k + 1) + ". " + esc(q[0]) + "</div>";
dqLessonOpt(l, k).forEach(function (o, j) {
var on = S.ans[k] === o, nm = "q" + k + "_" + j;
b += "<div role='button' data-w='" + nm + "' style='margin:3px 0;padding:6px 9px;border-radius:4px;border:1px solid " + (on ? (o === q[1] ? "#7AD08A" : "#E07A6A") : "rgba(143,180,232,.4)") + ";background:" + (on ? (o === q[1] ? "rgba(122,208,138,.15)" : "rgba(224,122,106,.15)") : "transparent") + "'>" + esc(o) + (on ? (o === q[1] ? " ✓" : " ✗") : "") + "</div>";
fns[nm] = function () { S.ans[k] = o; dqLessonCheck(l); dqLessonCard(l); };
});
});
if (S.msg)
b += "<div style='margin-top:8px;color:#FFE7B0'>" + S.msg + "</div>";
b += dqBtn("all", "🎓 Every lesson", "your record: " + dqLessonCount() + " of " + DQ_LESSONS.length + " stamped");
fns.all = dqCourseCard;
worldCard(dqHead("🎓 " + esc(l.title), "#D8E8FF") + b, fns);
},
function (l) {
if (dqLessonDone(l.n))
return;
if (!l.quiz.every(function (q, k) { return DQ.lesson.ans[k] === q[1]; }))
return;
var L = dqLessonLog();
L[l.n] = new Date().toISOString();
if (typeof save === "function")
try {
save();
}
catch (e) { }
var n = dqLessonCount(), all = n === DQ_LESSONS.length;
DQ.lesson.msg = "🗺️ Stamped: " + esc(l.title) + ". " + n + " of " + DQ_LESSONS.length + "." + (all ? " <b>Dream Cartographer!</b> The certificate is in your backpack." : "");
setStatus("<b>World Learning stamp</b> (" + n + " of " + DQ_LESSONS.length + ")." + (all ? " <b>You are a Dream Cartographer.</b>" : ""));
if (dqSigned()) {
var wait = Math.max(0, 21000 - (Date.now() - DQ.lesson.t0));
setTimeout(function () { dqRpc("school_pass", { p_course: "world-dream", p_unit: l.n }).catch(function () { }); }, wait);
}
},
function () {
var fns = {}, h = "<div style='opacity:.85'>Seventeen lessons: one in the Hall of Doors and one in each dream land, each taught by someone who lives there. Get both questions right for a stamp; all seventeen make a <b>Dream Cartographer</b> (a certificate in your backpack and a line on your school report card). " + dqLessonCount() + " of " + DQ_LESSONS.length + " stamped.</div>";
DQ_LESSONS.forEach(function (l) {
var nm = "l" + l.n, here = l.at === LD.kind;
h += dqBtn(nm, (dqLessonDone(l.n) ? "🗺️ " : "○ ") + l.n + ". " + esc(l.title), "with " + esc(dqWho(l.who)) + ", in " + esc(DQ_LANDS[l.at].name) + (here ? " · here: tap to be shown the way" : " · read it now"));
fns[nm] = function () { if (here)
dqGuideToWho(l.who);
else
dqLessonCard(l); };
});
worldCard(dqHead("World Learning: the Dream Lands", "#D8E8FF") + h, fns);
},
function (r, land, taken) {
DQ.places = {};
(land.games || []).forEach(function (g) {
if (g.t === "course") {
DQ.places[g.k] = g.pts.map(function (p) { return dqNudge(p[0], p[1], taken, 1.6); }).filter(Boolean);
}
else if (g.t === "light") {
var out = [];
if (g.fixed)
g.fixed.forEach(function (p) { if (ldClear(taken, p[0], p[1], 1.2))
out.push({ x: p[0], z: p[1] }); });
else {
var a = g.area || [0, -60, 140], R = ldRand(dqHash(g.k)), tries = 0;
while (out.length < g.count && tries++ < 400) {
var t = R() * Math.PI * 2, d = 24 + Math.sqrt(R()) * (a[2] - 24), x = a[0] + Math.sin(t) * d, z = a[1] + Math.cos(t) * d;
if (!dqFree(x, z, 1.2, taken, false))
continue;
if (out.some(function (o) { return Math.hypot(o.x - x, o.z - z) < 26; }))
continue;
out.push({ x: x, z: z });
}
}
DQ.places[g.k] = out;
}
});
},
function (x, z, taken, rad) {
if (dqFree(x, z, rad, taken, true, true) || Math.hypot(x, z) < 10 && ldClear(taken, x, z, rad))
return { x: x, z: z };
for (var d = 3; d <= 12; d += 3)
for (var a = 0; a < 8; a++) {
var nx = x + Math.cos(a * 0.785) * d, nz = z + Math.sin(a * 0.785) * d;
if (dqFree(nx, nz, rad, taken, true, true))
return { x: nx, z: nz };
}
return null;
},
function (T, g, msg) {
var fns = {}, won = dqDoneToday("g:" + g.k), h = "<div style='margin:6px 0'><i>\"" + esc(g.say) + "\"</i></div>";
if (g.t === "course") {
var n = (DQ.places[g.k] || []).length;
h += "<div>" + n + " rings, one after another; a tall soft light stands over the next. About " + Math.round(dqCourseTime(g)) + " seconds.</div>";
}
if (g.t === "light") {
var m = (DQ.places[g.k] || []).length;
h += "<div>" + m + " to find, within " + Math.round(g.secs / 60) + " minutes. Each shows a faint glow until it is lit; walk right up to it.</div>";
}
if (g.t === "quiz")
h += "<div>Three questions, one at a time. Get all three right to win.</div>";
if (g.t === "match")
h += "<div>" + (g.pairs.length * 2) + " cards face down. Turn two at a time; find every pair in " + dqMatchLimit(g) + " turns or fewer.</div>";
h += "<div style='margin:6px 0;opacity:.85'>" + (won ? "You won this today: play again for the fun of it." : (dqSigned() ? "Win: " + g.gold + " gold and a stamp in your passport." : "Sign in to win " + g.gold + " gold.")) + "</div>";
var ok = !(g.t === "course" || g.t === "light") || (DQ.places[g.k] || []).length >= 3;
if (ok) {
h += dqBtn("go", "▶ Start", "");
fns.go = function () { dqGameStart(T, g); };
}
else
h += "<div style='opacity:.8'>The dream has built over the ground this game needs. Dream it smaller here, or play another.</div>";
h += dqBtn("back", "↩ Back", "");
fns.back = function () { dqRoleCard(T); };
if (msg)
h = "<div style='margin:4px 0 8px;color:#FFE7B0'>" + msg + "</div>" + h;
worldCard(dqHead("🎲 " + esc(g.n)) + h, fns);
},
function (T, g) {
if (DQ.game)
dqGameEnd(null, true);
DQ.game = { g: g, T: T, t: 0, i: 0, lit: 0, objs: [], kind: LD.kind };
if (g.t === "quiz")
return dqQuizStart();
if (g.t === "match")
return dqMatchStart();
worldCard(null);
var G = new THREE.Group();
DQ.game.group = G;
LD.g.add(G);
if (g.t === "course")
dqCourseStart();
else
dqLightStart();
},
function (win, quiet) {
var Gm = DQ.game;
if (!Gm)
return;
DQ.game = null;
if (Gm.group) {
Gm.group.traverse(function (m) { if (m.geometry)
m.geometry.dispose(); if (m.material && m.material.dispose)
m.material.dispose(); });
if (Gm.group.parent)
Gm.group.parent.remove(Gm.group);
}
if (quiet)
return;
var g = Gm.g;
if (!win) {
dqTone(330, 0.25);
setStatus("<b>" + esc(g.n) + "</b>: not this time. Talk to " + esc(dqWho(g.who)) + " to try again.");
if (g.t === "quiz" || g.t === "match")
dqGameIntro(Gm.T, g, "Not this time. Try again?");
return;
}
dqTone(990, 0.3);
var first = !dqDoneToday("g:" + g.k);
dqMarkDone("g:" + g.k, Gm.kind);
var say = "<b>You won " + esc(g.n) + "!</b>";
var finish = function (line) { setStatus(say + " " + line); if (g.t === "quiz" || g.t === "match")
dqGameIntro(Gm.T, g, say + " " + line); };
if (!dqSigned()) {
finish(first ? "Sign in and a win pays " + g.gold + " gold." : "Well played.");
return;
}
dqRpc("dream_game", { p_game: g.k }).then(function (o) { finish(esc((o && o.say) || "")); dqReload(); dqPassLoad(); })
.catch(function (e) { finish(dqSaySoft(e)); });
},
function (x, z) {
var P = camera.position, dx = LD.ox + x - P.x, dz = LD.oz + z - P.z, d = Math.hypot(dx, dz);
var want = Math.atan2(-dx, -dz), rel = want - (typeof yaw !== "undefined" ? yaw : 0);
rel = Math.atan2(Math.sin(rel), Math.cos(rel));
var arrows = ["⬆️", "↖️", "⬅️", "↙️", "⬇️", "↘️", "➡️", "↗️"], i = ((Math.round(rel / (Math.PI / 4)) % 8) + 8) % 8;
return arrows[i] + " " + Math.round(d) + " m";
},
function () {
var Gm = DQ.game, g = Gm.g, pts = DQ.places[g.k];
Gm.left = dqCourseTime(g);
Gm.rings = [];
pts.forEach(function (p, i) {
var nx = pts[Math.min(i + 1, pts.length - 1)], pv = pts[Math.max(i - 1, 0)], a = Math.atan2((nx.x - pv.x) || 0.001, (nx.z - pv.z) || 0.001);
var y = ldY(p.x, p.z);
var ring = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.12, 8, 32), new THREE.MeshBasicMaterial({ color: 0x9AD8FF, transparent: true, opacity: 0.35, depthWrite: false }));
ring.position.set(p.x, y + 1.6, p.z);
ring.rotation.y = a;
Gm.group.add(ring);
var beam = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 40, 10, 1, true), new THREE.MeshBasicMaterial({ color: 0xBFE6FF, transparent: true, opacity: 0.0, depthWrite: false, side: THREE.DoubleSide }));
beam.position.set(p.x, y + 20, p.z);
Gm.group.add(beam);
Gm.rings.push({ x: p.x, z: p.z, ring: ring, beam: beam });
});
dqCoursePaint();
setStatus("<b>" + esc(g.n) + "</b>: go! Through the ring under the tall light.");
},
function (dt) {
var Gm = DQ.game, R = Gm.rings[Gm.i];
Gm.left -= dt;
if (R && dqNear(R.x, R.z, 2.8)) {
Gm.i++;
dqTone(660 + Gm.i * 40, 0.08);
dqCoursePaint();
R = Gm.rings[Gm.i];
}
if (!R)
return dqGameEnd(true);
if (Gm.left <= 0)
return dqGameEnd(false);
Gm.t += dt;
if (Gm.t > 0.5) {
Gm.t = 0;
setStatus("<b>" + esc(Gm.g.n) + "</b> · ring " + (Gm.i + 1) + " of " + Gm.rings.length + " · " + dqArrow(R.x, R.z) + " · ⏱ " + dqClock(Gm.left));
}
},
function () {
var Gm = DQ.game, g = Gm.g, pts = DQ.places[g.k];
Gm.left = g.secs;
Gm.marks = [];
pts.forEach(function (p) {
var y = ldY(p.x, p.z), grp = new THREE.Group();
grp.position.set(p.x, y, p.z);
if (g.what === "lantern" || g.what === "beacon" || g.what === "bell" || g.what === "valve") {
var post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, g.what === "beacon" ? 2.6 : 1.5, 6), new THREE.MeshLambertMaterial({ color: g.what === "valve" ? 0x4A5A6A : 0x3A3028 }));
post.position.y = g.what === "beacon" ? 1.3 : 0.75;
grp.add(post);
var head = g.what === "bell" ? new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.3, 10, 1, true), new THREE.MeshLambertMaterial({ color: 0xB08A3A, side: THREE.DoubleSide }))
: g.what === "valve" ? new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 6, 14), new THREE.MeshLambertMaterial({ color: 0xA03A2A }))
: new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.38, 0.3), new THREE.MeshLambertMaterial({ color: 0x5A4A3A }));
head.position.y = g.what === "beacon" ? 2.75 : 1.62;
if (g.what === "valve")
head.rotation.x = Math.PI / 2;
grp.add(head);
}
var glow = (typeof wGlow === "function") ? wGlow(g.col, 1.6, 0.25) : null;
if (glow) {
glow.position.y = g.what === "beacon" ? 2.8 : (g.what === "pixie" || g.what === "monolith" ? 1.6 : 1.65);
grp.add(glow);
}
Gm.group.add(grp);
Gm.marks.push({ x: p.x, z: p.z, grp: grp, glow: glow, lit: false });
});
setStatus("<b>" + esc(g.n) + "</b>: go! " + Gm.marks.length + " to find. Each shows a faint glow.");
},
function (dt) {
var Gm = DQ.game, g = Gm.g;
Gm.left -= dt;
Gm.marks.forEach(function (M) {
if (M.lit || !dqNear(M.x, M.z, g.near || 3))
return;
M.lit = true;
Gm.lit++;
dqTone(560 + Gm.lit * 50, 0.15);
if (M.glow) {
M.glow.material.opacity = 0.85;
M.glow.scale.set(3.2, 3.2, 1);
}
if (g.what !== "pixie" && g.what !== "valve" && g.what !== "bell" && typeof ldFlame === "function")
ldFlame(M.grp, 0, g.what === "beacon" ? 2.95 : (g.what === "monolith" ? 2.6 : 1.75), 0, 0.6, g.col);
if (g.what === "valve")
M.grp.children.forEach(function (c) { if (c.geometry && c.geometry.type === "TorusGeometry")
c.material.color.setHex(0x3A8A4A); });
});
if (Gm.lit >= Gm.marks.length)
return dqGameEnd(true);
if (Gm.left <= 0)
return dqGameEnd(false);
Gm.t += dt;
if (Gm.t > 0.5) {
Gm.t = 0;
var P = camera.position, near = null, bd = 1e9;
Gm.marks.forEach(function (M) { if (M.lit)
return; var d = Math.hypot(LD.ox + M.x - P.x, LD.oz + M.z - P.z); if (d < bd) {
bd = d;
near = M;
} });
setStatus("<b>" + esc(g.n) + "</b> · " + Gm.lit + " of " + Gm.marks.length + " · nearest " + (near ? dqArrow(near.x, near.z) : "") + " · ⏱ " + dqClock(Gm.left));
}
},
function () {
var Gm = DQ.game, q = Gm.qs[Gm.i], fns = {}, opts = [q[1], q[2], q[3]].sort(function () { return Math.random() - 0.5; });
var h = "<div style='opacity:.75;font-size:12px'>Question " + (Gm.i + 1) + " of " + Gm.qs.length + "</div><div style='margin:8px 0;font-size:15px'>" + esc(q[0]) + "</div>";
opts.forEach(function (o, j) {
var nm = "a" + j;
h += dqBtn(nm, esc(o), "");
fns[nm] = function () {
if (o !== q[1]) {
dqGameEnd(false);
return;
}
dqTone(700, 0.1);
Gm.i++;
if (Gm.i >= Gm.qs.length)
dqGameEnd(true);
else
dqQuizCard();
};
});
worldCard(dqHead("🎲 " + esc(Gm.g.n)) + h, fns);
},
function () {
var Gm = DQ.game, cards = [];
Gm.g.pairs.forEach(function (p, i) { cards.push({ p: i, s: p[0] }); cards.push({ p: i, s: p[1] }); });
for (var i = cards.length - 1; i > 0; i--) {
var j = Math.floor(Math.random() * (i + 1)), t = cards[i];
cards[i] = cards[j];
cards[j] = t;
}
Gm.cards = cards;
Gm.open = [];
Gm.found = {};
Gm.turns = 0;
dqMatchCard();
},
function () {
var Gm = DQ.game;
if (!Gm)
return;
var fns = {}, wide = Gm.cards.some(function (c) { return c.s.length > 2; }), cols = wide ? 3 : 4;
var h = "<div style='opacity:.8;margin-bottom:6px'>Turns: " + Gm.turns + " of " + dqMatchLimit(Gm.g) + " · pairs found: " + Object.keys(Gm.found).length + " of " + Gm.g.pairs.length + "</div>";
h += "<div style='display:grid;grid-template-columns:repeat(" + cols + ",1fr);gap:6px'>";
Gm.cards.forEach(function (c, i) {
var up = Gm.found[c.p] || Gm.open.indexOf(i) >= 0, nm = "c" + i;
h += "<div role='button' data-w='" + nm + "' style='min-height:" + (wide ? 46 : 54) + "px;display:flex;align-items:center;justify-content:center;text-align:center;border-radius:6px;font-size:" + (wide ? 13 : 26) + "px;border:1px solid rgba(143,180,232,.5);background:" + (Gm.found[c.p] ? "rgba(122,208,138,.18)" : up ? "rgba(255,231,176,.15)" : "rgba(143,180,232,.1)") + "'>" + (up ? esc(c.s) : "✦") + "</div>";
fns[nm] = function () { dqMatchFlip(i); };
});
h += "</div>";
worldCard(dqHead("🎲 " + esc(Gm.g.n)) + h, fns);
},
function (i) {
var Gm = DQ.game;
if (!Gm || Gm.wait)
return;
var c = Gm.cards[i];
if (Gm.found[c.p] || Gm.open.indexOf(i) >= 0)
return;
Gm.open.push(i);
dqTone(520, 0.05);
if (Gm.open.length < 2)
return dqMatchCard();
Gm.turns++;
var a = Gm.cards[Gm.open[0]], b = Gm.cards[Gm.open[1]];
if (a.p === b.p) {
Gm.found[a.p] = 1;
Gm.open = [];
dqTone(780, 0.12);
if (Object.keys(Gm.found).length === Gm.g.pairs.length) {
dqMatchCard();
return setTimeout(function () { dqGameEnd(true); }, 500);
}
if (Gm.turns >= dqMatchLimit(Gm.g))
return dqGameEnd(false);
return dqMatchCard();
}
dqMatchCard();
Gm.wait = true;
setTimeout(function () { if (DQ.game !== Gm)
return; Gm.wait = false; Gm.open = []; if (Gm.turns >= dqMatchLimit(Gm.g))
return dqGameEnd(false); dqMatchCard(); }, 900);
},
function (P) {
var L = "the Hall of Doors";
P.dqFrom = 0;
P.k("desk", -6.2, 5.6, Math.PI / 2, 1.1);
P.k("lectern", -6.4, 7.4, Math.PI / 2, 0.9, { small: 1 });
P.person("ha_registrar", -7.4, 5.6, Math.PI / 2, { sex: "f", look: { top: 0x2A3A5A, topKind: "shirt", bottom: 0x1E2638, hair: 0x5A3A2A, hat: "none" } }, ldWho("The Registrar of Doors", L, "the Registrar of Doors, who keeps the register of every door in the Hall and stamps each dreamer's Dreamwalker's Passport", "Welcome to the Hall. Every door here opens on a world; I keep the book of them. Have you a passport yet? I stamp one for every land where you lend a hand or win a game.", "You are precise, kind and fond of maps. You know every door in the Hall, and that each dream land has errands, a stall, games and a lesson."));
P.person("ha_guide", 6.4, 6.2, -Math.PI / 2, { sex: "m", look: { top: 0x6A4A2A, topKind: "shirt", bottom: 0x3A3028, hair: 0x1A1410 } }, ldWho("A guide of the Hall", L, "a guide of the Hall of Doors, who knows what waits behind every door and sends visitors through the right one", "Lost? Everyone is, the first time. Tell me what you'd like to do, gather pearls, race through the clouds, light lanterns, and I'll tell you which door."));
P.person("ha_porter", 4.2, 15.5, Math.PI, { sex: "m", look: { top: 0x5A2A2A, topKind: "shirt", bottom: 0x2A2A2A, hair: 0x8A8A8A, hat: "cap", hatColor: 0x5A2A2A } }, ldWho("The porter of the Hall", L, "the porter at the way into the Hall of Doors, who greets everyone who comes in from the city", "Mind the step. The map's straight ahead, the Registrar's on your left and the guide on your right. Doors all round."));
P.person("ha_warden", -3, -8, 0.3, { sex: "f", look: { top: 0x2A4A3A, topKind: "shirt", bottom: 0x1E2A24, hair: 0x2A1A12 } }, ldWho("A dream warden", L, "a dream warden who walks the Hall of Doors, keeping it calm and helping anyone who has lost their door", "All quiet. If you've lost your own door, it's in the Dreamers' Gallery, out past the world doors on the side you came in by, under your own name. The Hall grows a new ring whenever one fills."), { r: 4, sp: 0.35 });
DQ.plan = P;
},
function (msg) {
var fns = {}, S = dqStamps(), n = DQ_ORDER.filter(function (k) { return S[k]; }).length, all = n >= DQ_ORDER.length;
var h = "<div style='opacity:.85;margin-bottom:6px'>A stamp for every dream land where you finish an errand or win a game. All sixteen, and the Registrar signs it: " + (dqSigned() ? "250 gold from the Treasury and the passport itself to keep." : "sign in for the reward.") + "</div>";
h += "<div style='display:grid;grid-template-columns:1fr 1fr;gap:4px'>";
DQ_ORDER.forEach(function (k) { h += "<div style='padding:4px 6px;border-radius:4px;border:1px solid " + (S[k] ? "#7AD08A" : "rgba(143,180,232,.3)") + ";font-size:12.5px'>" + (S[k] ? "✓ " : "○ ") + esc(DQ_LANDS[k].name.replace(/^the /, "The ")) + "</div>"; });
h += "</div><div style='margin:8px 0'>" + n + " of " + DQ_ORDER.length + " stamped.</div>";
var claimed = DQ.pass && DQ.pass.claimed;
if (all && dqSigned() && !claimed) {
h += dqBtn("claim", "📘 Have it signed", "250 gold and the passport, once");
fns.claim = dqPassportClaim;
}
else if (claimed)
h += "<div style='color:#CFE8C0'>Signed by the Registrar of Doors. A Dreamwalker in full.</div>";
h += dqBtn("lands", "🚪 Every land, and what is there", "and a door to take you");
fns.lands = dqLandsCard;
if (msg)
h = "<div style='margin:4px 0 8px;color:#FFE7B0'>" + msg + "</div>" + h;
worldCard(dqHead("📘 Dreamwalker's Passport") + h, fns);
if (dqSigned() && !DQ.pass && !DQ.passAsked) {
DQ.passAsked = 1;
dqPassLoad().then(function (o) { DQ.passAsked = 0; if (o)
dqPassportCard(msg); });
}
},
function () {
if (DQ.busy)
return;
DQ.busy = true;
dqRpc("dream_passport", { p_claim: true }).then(function (o) {
DQ.busy = false;
if (o && o.ok !== false)
DQ.pass = o;
return dqReload().then(function () { dqPassportCard(esc((o && o.say) || "")); });
})
.catch(function (e) { DQ.busy = false; dqPassportCard(dqSaySoft(e)); });
},
function () {
var fns = {}, S = dqStamps(), h = "<div style='opacity:.85;margin-bottom:6px'>What waits behind each door. Tap one to go straight through.</div>";
DQ_ORDER.forEach(function (k, i) {
var L = DQ_LANDS[k], nm = "d" + i;
var bits = [(L.errands || []).length + " errands"];
if (L.stall)
bits.push("a stall");
if (L.forge)
bits.push("a forge");
(L.games || []).forEach(function (g) { bits.push(g.n); });
bits.push("a lesson");
var gat = (L.gather || []).map(function (g) { return dqIcon(g[0]); }).join("");
h += dqBtn(nm, (S[k] ? "✓ " : "") + esc(L.name.replace(/^the /, "The ")), esc(bits.join(" · ")) + " · gather " + gat);
fns[nm] = function () { dqGoLand(k); };
});
worldCard(dqHead("🚪 The dream lands") + h, fns);
},
function (k) {
worldCard(null);
if (typeof enterRealm !== "function")
return;
var r = enterRealm(k, false, null, null);
if (!r)
return;
if (typeof beHere === "function")
beHere(r.id);
var hh = heartOf(r.id);
camera.position.set(hh.x, camera.position.y, hh.z + 18);
if (typeof hubCool !== "undefined")
hubCool = 2.5;
setStatus("<b>" + esc(DQ_LANDS[k].name.replace(/^the /, "The ")) + ".</b> The board by the way in lists everything to do here. The way back stands where you came in.");
if (typeof save === "function")
try {
save();
}
catch (e) { }
}
];
});
