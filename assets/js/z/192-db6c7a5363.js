/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(192, function () {
"use strict";
return [
function (I) {
if (!I || !I.cinema || I.cinsBuilt)
return;
I.cinsBuilt = true;
var root = I.root, ox = I.ox, F = CINS.F, W = CIN_W, D = CIN_D, H = CIN_H, ZA = CIN_ZA;
function M(c, k) { return tlm(c, k); }
function add(geo, mat, x, y, z, ry) { var m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); if (ry)
m.rotation.y = ry; root.add(m); return m; }
function box(w, h, d, mat, x, y, z, ry) { return add(new THREE.BoxGeometry(w, h, d), mat, x, y, z, ry); }
function solid(x, z, hw, hd, h, lv) { I.walls.push({ x: ox + x, z: z, rot: 0, hw: hw, hd: hd, h: h, level: lv || 0 }); }
var wood = M(0x5A3A22), woodD = M(0x3E2814), gold = M(0xC9A040), wall = M(0x5A2328), dark = M(0x1A1416), steel = M(0x5A5E66), cream = M(0xE8DCC0), black = M(0x16171C);
var moved = 0;
root.children.slice().forEach(function (c) {
if (c.isMesh && c.position.x < -W / 2 + 0.4 && c.position.y > 1 && c.position.y < 3.2 && c.position.z > ZA + 1 && c.position.z < ZA + 12) {
if (c.geometry.type === "PlaneGeometry") {
var k = moved++;
c.position.set(-13 + k * 3.4 + (k > 1 ? 17 : 0), 2.1, D / 2 - 0.2);
c.rotation.y = Math.PI;
}
else
root.remove(c);
}
});
var zb0 = ZA, zb1 = ZA + 3.6, zm = (zb0 + zb1) / 2;
box(W - 0.6, 0.22, zb1 - zb0, woodD, 0, F - 0.11, zm);
box(W - 0.6, 0.04, zb1 - zb0, M(0x3A2A22), 0, F + 0.02, zm);
var gx0 = -W / 2 + 0.3, gx1 = -W / 2 + 1.9;
box(W - 0.6 - (gx1 - gx0), 1.0, 0.2, wall, (gx1 + W / 2 - 0.3) / 2, F + 0.5, zb1);
solid((gx1 + W / 2 - 0.3) / 2, zb1, (W / 2 - 0.3 - gx1) / 2, 0.1, 3, 1);
box(W - 0.6 - (gx1 - gx0), 1.2, 0.06, new THREE.MeshPhongMaterial({ color: 0x9AB0C0, transparent: true, opacity: 0.25, shininess: 90, depthWrite: false }), (gx1 + W / 2 - 0.3) / 2, F + 1.6, zb1);
box(W - 0.6, H - F - 2.2, 0.2, wall, 0, F + 2.2 + (H - F - 2.2) / 2, zb1);
box(W - 0.6, 0.08, 0.24, gold, 0, F + 1.02, zb1);
box(W - 0.6, 0.5, 0.24, gold, 0, F - 0.3, zb1 + 0.02);
solid(0, zb0 + 0.15, W / 2, 0.15, 3, 1);
solid(-W / 2 + 0.15, zm, 0.15, (zb1 - zb0) / 2, 3, 1);
solid(W / 2 - 0.15, zm, 0.15, (zb1 - zb0) / 2, 3, 1);
var sg = hallCanvas(512, 96, function (g, w, h) { g.fillStyle = "#2A1416"; g.fillRect(0, 0, w, h); g.strokeStyle = "#C9A040"; g.lineWidth = 6; g.strokeRect(4, 4, w - 8, h - 8); hallText(g, "PROJECTION ROOM · STAFF", w / 2, h / 2, w - 30, "bold 40px Georgia,serif", "#F4E6C0"); });
add(new THREE.PlaneGeometry(2.6, 0.48), new THREE.MeshBasicMaterial({ map: sg.tex }), (gx0 + gx1) / 2 + 2.6, F + 2.6, zb1 + 0.12);
var proj = [];
for (var i = 0; i < 5; i++) {
var xc = cinAudX(i), g = new THREE.Group();
g.position.set(xc, F, ZA + 1.1);
root.add(g);
var ped = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.0, 0.9), black);
ped.position.y = 0.5;
g.add(ped);
var body = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 1.1), steel);
body.position.set(0, 1.28, 0);
g.add(body);
var lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.5, 14), M(0x2A2C30));
lamp.position.set(0, 1.32, 0.55);
lamp.rotation.x = Math.PI / 2;
g.add(lamp);
var lens = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.3, 12), M(0x1A1A1E));
lens.position.set(0, 1.28, -0.68);
lens.rotation.x = Math.PI / 2;
g.add(lens);
var reels = [];
[[0.95, 0.15], [0.95, -0.45]].forEach(function (q) {
var r = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.06, 20), M(0x8A8E94));
r.rotation.z = Math.PI / 2;
r.position.set(0.08, 1.28 + q[0] * 0.55, q[1]);
g.add(r);
reels.push(r);
var hub = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 10), black);
hub.rotation.z = Math.PI / 2;
hub.position.copy(r.position);
g.add(hub);
});
var glow = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.02), new THREE.MeshBasicMaterial({ color: 0xFFF0C8 }));
glow.position.set(0, 1.32, 0.81);
g.add(glow);
box(0.6, 0.4, 0.05, M(0x0A0A10), xc, F + 1.3, ZA + 0.18);
solid(xc, ZA + 1.1, 0.4, 0.5, 1.4, 1);
proj.push({ g: g, reels: reels, glow: glow, x: xc });
}
box(1.6, 0.9, 0.5, wood, W / 2 - 3.4, F + 0.45, zb0 + 0.5);
solid(W / 2 - 3.4, zb0 + 0.5, 0.8, 0.25, 1, 1);
for (var c = 0; c < 6; c++)
add(new THREE.CylinderGeometry(0.22, 0.22, 0.06, 16), M(0x7A7E86), W / 2 - 3.95 + (c % 3) * 0.5, F + 0.93 + Math.floor(c / 3) * 0.07, zb0 + 0.5);
box(1.4, 0.76, 0.7, woodD, W / 2 - 1.6, F + 0.38, zm + 0.6);
solid(W / 2 - 1.6, zm + 0.6, 0.7, 0.35, 0.8, 1);
box(0.5, 0.04, 0.36, cream, W / 2 - 1.7, F + 0.78, zm + 0.6);
var chair = box(0.45, 0.45, 0.45, M(0x6A2A2A), W / 2 - 1.6, F + 0.23, zm + 1.25);
var lp = new THREE.PointLight(0xFFE2B8, 0.8, 9, 1.6);
lp.position.set(-6, F + 2.4, zm);
root.add(lp);
var lp2 = new THREE.PointLight(0xFFE2B8, 0.8, 9, 1.6);
lp2.position.set(10, F + 2.4, zm);
root.add(lp2);
[-14, -6, 2, 10, 17].forEach(function (x) { box(0.5, 0.08, 0.5, M(0xFFE8B0, "glow"), x, H - 0.08, zm); });
var sx = -W / 2 + 1.05, sz0 = zb1, sz1 = zb1 + 7.8, n = 16, run = (sz1 - sz0) / n, rise = F / n;
for (var s = 0; s < n; s++) {
var zz = sz1 - run * (s + 0.5);
box(1.5, rise * (s + 1), run + 0.02, woodD, sx, rise * (s + 1) / 2, zz);
box(1.5, 0.03, run, M(0x7E1E2A), sx, rise * (s + 1) + 0.012, zz);
}
var under = new THREE.Shape();
under.moveTo(0, 0);
under.lineTo(sz1 - sz0, 0);
under.lineTo(0, F);
under.lineTo(0, 0);
var ug = new THREE.ExtrudeGeometry(under, { depth: 0.1, bevelEnabled: false });
add(ug, wall, sx + 0.86, 0, sz0, -Math.PI / 2);
var len = Math.hypot(sz1 - sz0, F), rail = add(new THREE.CylinderGeometry(0.035, 0.035, len, 8), gold, sx + 0.72, F / 2 + 0.95, (sz0 + sz1) / 2);
rail.rotation.x = -Math.atan2(sz1 - sz0, F);
for (var b = 0; b < 8; b++) {
var t = (b + 0.5) / 8;
add(new THREE.CylinderGeometry(0.02, 0.02, 0.95, 6), gold, sx + 0.72, F * (1 - t) + 0.47, sz0 + (sz1 - sz0) * t);
}
I.stairs = (I.stairs || []).concat([{ x: ox + sx, z: (sz0 + sz1) / 2, rot: Math.PI, hw: 0.72, hd: (sz1 - sz0) / 2, from: 0 }]);
I.holes = (I.holes || []).concat([{ level: 1, x: ox + sx, z: (sz0 + sz1) / 2, hw: 0.8, hd: (sz1 - sz0) / 2 + 0.2 }]);
solid(sx + 0.86, (sz0 + sz1) / 2 - 1.4, 0.08, (sz1 - sz0) / 2 - 1.4, F, 0);
solid(sx + 0.86, (sz0 + sz1) / 2, 0.08, (sz1 - sz0) / 2, 3, 1);
solid(-W / 2 + 0.15, (sz0 + sz1) / 2, 0.15, (sz1 - sz0) / 2, 3, 1);
solid(sx, sz1 + 0.1, 0.8, 0.08, 3, 1);
I.levels = 2;
I.floor = F;
I.floorNames = [CIN_KEY, "The Projection Room"];
var bx = -W / 2 + 5, zc = D / 2 - 7, bz0 = zc - 2.6;
[-2.7, 2.7].forEach(function (o) { box(0.15, 2.7, 2.6, wood, bx + o, 1.35, bz0 + 1.3); solid(bx + o, bz0 + 1.3, 0.08, 1.3, 2.7); });
box(5.55, 0.15, 2.75, woodD, bx, 2.78, bz0 + 1.35);
box(3.6, 2.7, 0.15, wood, bx - 0.95, 1.35, bz0);
solid(bx - 0.95, bz0, 1.8, 0.08, 2.7);
box(0.06, 2.7, 0.06, gold, bx + 0.85, 1.35, bz0);
box(0.4, 0.3, 0.36, M(0x2A2C30), bx - 1.2, 1.28, zc - 0.2);
box(0.3, 0.2, 0.3, M(0xC83A3A), bx + 0.9, 1.22, zc - 0.2);
box(0.5, 0.6, 0.5, M(0x6A2A2A), bx - 1.8, 0.3, zc - 1.2);
var cx = W / 2 - 5.5;
box(6, 0.95, 0.6, woodD, cx, 0.475, zc - 2.0);
solid(cx, zc - 2.0, 3, 0.3, 1);
box(6.1, 0.05, 0.64, gold, cx, 0.97, zc - 2.0);
box(1.2, 1.9, 0.6, M(0xD8E4EC), cx + 2.2, 1.9, zc - 2.0);
box(1.0, 1.6, 0.04, new THREE.MeshPhongMaterial({ color: 0xBFD8E8, transparent: true, opacity: 0.4, depthWrite: false }), cx + 2.2, 1.95, zc - 1.68);
for (var q = 0; q < 12; q++)
add(new THREE.CylinderGeometry(0.04, 0.04, 0.2, 8), M([0xC83A3A, 0xE8A04A, 0x3A8AE8, 0x4AC86A][q % 4]), cx + 1.85 + (q % 4) * 0.24, 1.35 + Math.floor(q / 4) * 0.45, zc - 1.95);
box(0.6, 0.5, 0.4, M(0xB8BCC4), cx - 0.6, 1.22, zc - 2.0);
[-0.75, -0.6, -0.45].forEach(function (x) { add(new THREE.CylinderGeometry(0.02, 0.02, 0.12, 6), M(0x2A2C30), cx + x, 0.98 + 0.4, zc - 1.78); });
box(2.2, 0.04, 0.4, wood, cx - 2.0, 1.6, zc - 2.15);
box(2.2, 0.04, 0.4, wood, cx - 2.0, 2.0, zc - 2.15);
for (var k = 0; k < 14; k++)
box(0.12, 0.16, 0.1, M([0xE8C850, 0xC83A3A, 0x7A3A1E, 0xE87AC8, 0x3A6AE8][k % 5]), cx - 2.9 + (k % 7) * 0.28, 1.7 + Math.floor(k / 7) * 0.4, zc - 2.1);
for (var u = 0; u < 5; u++)
add(new THREE.CylinderGeometry(0.07, 0.05, 0.16, 10), M(0xF4F0E8), cx + 0.4 + u * 0.18, 1.06, zc - 0.1);
I.cins = { proj: proj, staff: {}, route: [] };
I.cins.lobby = [{ x: -8, z: D / 2 - 4 }, { x: 0, z: ZA + 2 }, { x: 8, z: D / 2 - 4 }, { x: 4, z: ZA + 5 }, { x: -4, z: ZA + 5 }];
},
function (t) {
var ti = String(t.post.title || "").toLowerCase();
if (/project/.test(ti))
return "projectionist";
if (/box|ticket|cashier/.test(ti))
return "boxoffice";
if (/usher|clean/.test(ti))
return "usher";
if (/concess|snack|sweet|refresh|counter|popcorn/.test(ti))
return "snacks";
if (/programm|booker/.test(ti))
return "programmer";
if (/manager|director/.test(ti))
return "manager";
return CINS.jobs[t.post.job] || "usher";
},
function () {
if (!INT || !INT.cinema)
return;
cinsBuild(INT);
var C = INT.cins, want = {}, who = cinsWho(), ush = 0;
who.forEach(function (t) { want[t.id] = t; });
Object.keys(C.staff).forEach(function (id) { if (!want[id]) {
var g = C.staff[id].g;
if (g.parent)
g.parent.remove(g);
delete C.staff[id];
} });
who.forEach(function (t) {
if (C.staff[t.id]) {
if (C.staff[t.id].role === "usher")
ush++;
return;
}
var role = cinsRole(t), L = (typeof tempLook === "function") ? tempLook(t) : {};
if (typeof jobDress === "function")
try {
jobDress(L, CINS_TITLE[role], CIN_KEY);
}
catch (e) { }
if (role === "usher" || role === "boxoffice" || role === "snacks") {
L.top = 0x7A1E2A;
L.bottom = 0x1A1416;
}
var g = buildFigure({ id: "__cins_" + t.id, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
var name = t.name + " · " + (t.post.title && t.post.title !== "worker" ? t.post.title : CINS_TITLE[role]);
var tag = makeTag(name, false);
tag.position.y = 2.15;
g.add(tag);
if (role === "usher") {
var br = new THREE.Group(), st = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.3, 6), tlm(0x6A4A2A));
st.position.y = 0.65;
br.add(st);
var hd = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.1, 0.08), tlm(0xC8A050));
hd.position.y = 0.02;
br.add(hd);
br.position.set(0.32, 0.15, 0.35);
br.rotation.x = -0.35;
g.add(br);
}
g.traverse(function (m) { m.raycast = function () { }; });
var S = { g: g, role: role, to: null, wait: 0, ph: (t.seed % 100) / 10, i: ush };
if (role === "usher")
ush++;
cinsPlace(S, true);
INT.root.add(g);
C.staff[t.id] = S;
});
},
function (S) {
var D = CIN_D, ZA = CIN_ZA, zc = D / 2 - 7, F = CINS.F;
if (S.role === "boxoffice")
return { x: -CIN_W / 2 + 5 - 0.2, z: zc - 0.85, y: 0, ry: 0, work: 1 };
if (S.role === "snacks") {
var a = Math.sin(((typeof performance !== "undefined") ? performance.now() : 0) / 9000 + S.ph);
return { x: CIN_W / 2 - 5.5 + a * 2, z: zc - 1.1, y: 0, ry: a > 0.7 ? Math.PI : 0, work: 1 };
}
if (S.role === "programmer")
return { x: CIN_W / 2 - 1.6, z: ZA + 1.8 + 1.25, y: F, ry: Math.PI, work: 1, sit: 1 };
if (S.role === "projectionist") {
var best = 0, bd = 1e9, scs = cinScreens();
scs.forEach(function (sc, i) { var n = cinNow(sc); if (!n)
return; var due = n.showing ? (n.into < 3 ? -1 : n.left + CIN_GAP) : n.nextIn; if (due < bd) {
bd = due;
best = i;
} });
var P = INT.cins.proj[best];
return { x: P.x + 0.95, z: ZA + 1.1, y: F, ry: -Math.PI / 2, work: 1 };
}
if (S.role === "usher") {
var scs2 = cinScreens(), gap = [];
scs2.forEach(function (sc, i) { var n = cinNow(sc); if (n && !n.showing)
gap.push(i); });
if (gap.length) {
var i2 = gap[S.i % gap.length], xc = cinAudX(i2), k = Math.floor(((performance.now() / 1000) + S.ph * 7) / 9) % 5;
return { x: xc + (k % 2 ? -3.55 : 3.55), z: -CIN_D / 2 + 5 + k * 2.4, y: 0, ry: Math.PI, sweep: 1 };
}
var L = INT.cins.lobby, j = (Math.floor((performance.now() / 1000 + S.ph * 11) / 12) + S.i * 2) % L.length;
return { x: L[j].x, z: L[j].z, y: 0, ry: 0, sweep: 1 };
}
var L2 = INT.cins.lobby, j2 = Math.floor((performance.now() / 1000 + S.ph * 13) / 15) % L2.length;
return { x: L2[j2].x, z: L2[j2].z + 1, y: 0, ry: Math.PI };
},
function (from, to) {
var ZA = CIN_ZA;
if ((from.z < ZA) === (to.z < ZA))
return to;
var aud = from.z < ZA ? from : to, i = Math.round((aud.x - (-CIN_W / 2 + 4)) / 8), xc = cinAudX(Math.max(0, Math.min(4, i)));
var door = { x: xc + 2.2, z: ZA + (from.z < ZA ? 0.8 : -0.8) };
return (Math.abs(from.x - door.x) < 0.4 && Math.abs(from.z - door.z) < 1.2) ? { x: door.x, z: ZA + (from.z < ZA ? 1.2 : -1.2) } : door;
},
function (dt) {
if (!INT || !INT.cinema || !INT.cins)
return;
var C = INT.cins, t = performance.now() / 1000;
var scs = cinScreens();
C.proj.forEach(function (P, i) {
var n = scs[i] && cinNow(scs[i]), on = !!(n && n.showing);
P.glow.visible = on;
if (on)
P.reels.forEach(function (r, k) { r.rotation.x += dt * (k ? 1.6 : 1.2); });
});
Object.keys(C.staff).forEach(function (id) {
var S = C.staff[id], g = S.g, lm = g.userData.limbs;
S.ph += dt;
var T = cinsTarget(S), here = { x: g.position.x, z: g.position.z }, goal = (T.y === g.position.y) ? cinsLeg(here, T) : T;
if (T.y !== g.position.y) {
g.position.set(T.x, T.y, T.z);
}
var dx = goal.x - g.position.x, dz = goal.z - g.position.z, d = Math.hypot(dx, dz);
if (d > 0.12) {
var sp = Math.min(d, 1.3 * dt);
g.position.x += dx / d * sp;
g.position.z += dz / d * sp;
var want = Math.atan2(dx, dz), dr = ((want - g.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
g.rotation.y += dr * Math.min(1, dt * 6);
if (lm) {
var s = Math.sin(S.ph * 7) * 0.5;
lm.ll.rotation.x = s;
lm.rl.rotation.x = -s;
lm.la.rotation.x = -s * 0.6;
lm.ra.rotation.x = s * 0.6;
}
}
else {
var dr2 = ((T.ry - g.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
g.rotation.y += dr2 * Math.min(1, dt * 4);
if (lm) {
lm.ll.rotation.x = 0;
lm.rl.rotation.x = 0;
if (T.sweep) {
var w = Math.sin(S.ph * 3.4) * 0.45;
lm.la.rotation.x = -0.9 + w;
lm.ra.rotation.x = -0.7 + w;
}
else if (T.work) {
var w2 = Math.sin(S.ph * 2.2) * 0.2;
lm.la.rotation.x = -0.75 + w2;
lm.ra.rotation.x = -0.6 - w2;
}
else {
lm.la.rotation.x = 0;
lm.ra.rotation.x = 0;
}
}
}
});
}
];
});
