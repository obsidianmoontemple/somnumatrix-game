/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(164, function () {
"use strict";
return [
function () {
if (typeof playTone === "function") {
playTone(220, 0.15);
setTimeout(function () { playTone(220, 0.15); }, 220);
setTimeout(function () { playTone(330, 0.5); }, 700);
}
setStatus("<b>Three knocks.</b> A panel slides open, someone looks you up and down, and the hatch hisses open.");
setTimeout(function () { worldGo("casino", { keepFrom: true }); }, 900);
},
function () {
return wTex(256, 256, function (x, W, H) {
x.fillStyle = "#2A0E1A";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C9A868";
x.lineWidth = 2;
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
var cx = i * 64 + 32, cy = j * 64 + 32;
x.beginPath();
x.arc(cx, cy, 20, 0.6, Math.PI * 1.7);
x.stroke();
x.fillStyle = "#3E1626";
x.beginPath();
x.moveTo(cx, cy - 30);
x.lineTo(cx + 30, cy);
x.lineTo(cx, cy + 30);
x.lineTo(cx - 30, cy);
x.closePath();
x.globalAlpha = 0.5;
x.fill();
x.globalAlpha = 1;
}
}, [14, 14]);
},
function (G) {
CAS.solids = [];
CAS.spots = [];
CAS.people = [];
CAS.wheels = [];
CAS.machines = [];
CAS.lights = [];
var gold = wM(0xC9A868, { e: 0x3A2A08 }), dark = wM(0x1A1018), felt = wM(0x0E5A3A), wood = wM(0x4A2418), cream = wM(0xF0E6D2), silver = wM(0xD8DCE4, { e: 0x202430 });
var fl = wMesh(new THREE.CircleGeometry(31, 64), new THREE.MeshLambertMaterial({ map: casFloorTex() }), 0, 0, 0, G);
fl.rotation.x = -Math.PI / 2;
var wall = wMesh(new THREE.CylinderGeometry(31, 31, 12, 64, 1, true), wM(0x2A1420, { ds: true }), 0, 6, 0, G);
for (var i = 0; i < 32; i++) {
var a = i / 32 * Math.PI * 2;
var col = wBox(0.8, 12, 0.8, gold, Math.cos(a) * 30.4, 6, Math.sin(a) * 30.4, G);
col.rotation.y = -a;
}
wMesh(new THREE.TorusGeometry(30.4, 0.25, 6, 64), gold, 0, 3.2, 0, G).rotation.x = Math.PI / 2;
wMesh(new THREE.TorusGeometry(30.4, 0.35, 6, 64), gold, 0, 11.8, 0, G).rotation.x = Math.PI / 2;
var dome = wMesh(new THREE.SphereGeometry(31, 48, 16, 0, Math.PI * 2, 0.3, Math.PI / 2 - 0.3), wM(0x1E0E18, { ds: true }), 0, 12, 0, G);
dome.scale.y = 0.45;
for (var r = 0; r < 16; r++) {
var rib = wMesh(new THREE.TorusGeometry(31, 0.18, 4, 40, Math.PI), gold, 0, 12, 0, G);
rib.rotation.y = r / 16 * Math.PI;
rib.scale.y = 0.45;
}
var sky = wMesh(new THREE.CircleGeometry(14, 40), wB(0x000006, { fog: false }), 0, 33, 0, G);
sky.rotation.x = Math.PI / 2;
wMesh(new THREE.TorusGeometry(9.2, 0.4, 8, 48), gold, 0, 25.3, 0, G).rotation.x = Math.PI / 2;
var st = wPoints(320, function () { var a2 = Math.random() * Math.PI * 2, d = Math.random() * 13; return [Math.cos(a2) * d, 32.8, Math.sin(a2) * d]; }, 0xFFFFFF, 1.6, false);
G.add(st);
var earth = wMesh(new THREE.SphereGeometry(3, 32, 20), new THREE.MeshBasicMaterial({ map: (typeof spPaint === "function" ? spPaint("earth") : null), color: typeof spPaint === "function" ? 0xFFFFFF : 0x3A6AC8, fog: false }), 2.5, 29, -2, G);
earth.add(wGlow(0x6AA8FF, 9, 0.3));
CAS.earth = earth;
[[0, 0, 1.4], [-14, -6, 1], [14, -6, 1], [-14, 10, 1], [14, 10, 1]].forEach(function (q) {
var ch = new THREE.Group();
ch.position.set(q[0], 9.5, q[1]);
ch.scale.setScalar(q[2]);
G.add(ch);
wMesh(new THREE.TorusGeometry(1.6, 0.08, 6, 24), gold, 0, 0, 0, ch).rotation.x = Math.PI / 2;
wCyl(0.03, 0.03, 4, gold, 0, 2, 0, ch, 4);
for (var k = 0; k < 12; k++) {
var a3 = k / 12 * Math.PI * 2, b = wSph(0.13, wB(0xFFF4D8, { fog: false }), Math.cos(a3) * 1.6, -0.2, Math.sin(a3) * 1.6, ch, 6);
CAS.lights.push({ m: b, p: k * 0.7 + q[0] });
}
var gl = wGlow(0xFFE8B0, 7, 0.35);
ch.add(gl);
});
for (var n = 0; n < 8; n++) {
var a4 = n / 8 * Math.PI * 2 + 0.2, ne = wMesh(new THREE.TorusGeometry(0.9, 0.07, 6, 20, Math.PI * 1.3), wB(n % 2 ? 0x6AE8FF : 0xFF6AC8, { fog: false }), Math.cos(a4) * 30.2, 7.2, Math.sin(a4) * 30.2, G);
ne.rotation.y = -a4 - Math.PI / 2;
ne.rotation.z = 0.6;
CAS.lights.push({ m: ne, p: n, neon: 1 });
}
wBox(5, 5, 0.5, wM(0x5A5E6A), 0, 2.5, 30.6, G);
wBox(3.4, 4, 0.2, wM(0x8A8E98), 0, 2, 30.3, G);
var nm = wSign(["THE HIDDEN CRESCENT", "Chips are for play, not for changing back"], 7, 1.4, "#14080E", "#E8C27A");
nm.position.set(0, 5.6, 30.2);
nm.rotation.y = Math.PI;
G.add(nm);
[-2.6, 2.6].forEach(function (x) { for (var j = 0; j < 3; j++) {
wCyl(0.06, 0.08, 1, gold, x, 0.5, 27.5 - j * 1.6, G, 8);
wSph(0.1, gold, x, 1.05, 27.5 - j * 1.6, G, 8);
} wBox(0.04, 0.04, 3.2, wM(0x8A1A2A), x, 0.85, 26.7, G); });
CAS.spots.push({ x: 0, z: 28.6, r: 2.2, name: "The airlock", fn: casLeave });
var cage = new THREE.Group();
cage.position.set(18, 0, 20);
cage.rotation.y = -Math.PI * 0.7;
G.add(cage);
wBox(6, 1.2, 1.2, wood, 0, 0.6, 0, cage);
wBox(6.2, 0.08, 1.4, gold, 0, 1.24, 0, cage);
for (var b2 = 0; b2 < 13; b2++)
wCyl(0.03, 0.03, 1.8, gold, -3 + b2 * 0.5, 2.2, 0.5, cage, 4);
wBox(6.2, 0.15, 0.2, gold, 0, 3.1, 0.5, cage);
wBox(6, 3.2, 0.3, wM(0x2A1420), 0, 1.6, -1.6, cage);
for (var cs = 0; cs < 5; cs++) {
var stck = wCyl(0.12, 0.12, 0.2 + cs * 0.06, wM([0xC0303A, 0x2A6AC8, 0x2A8A4A, 0x1A1A1A, 0xE8E0D0][cs]), -1.8 + cs * 0.3, 1.35 + cs * 0.03, 0.2, cage, 12);
}
var cs1 = wSign(["THE CAGE", "Gold for chips"], 2.6, 0.8, "#14080E", "#E8C27A");
cs1.position.set(0, 3.6, 0.5);
cage.add(cs1);
CAS.solids.push({ x: 18, z: 20, hw: 3.2, hd: 1.4, rot: -Math.PI * 0.7 });
CAS.spots.push({ x: 16.2, z: 18.2, r: 2.6, name: "The cage: change gold for chips", fn: casCage });
var pc = new THREE.Group();
pc.position.set(-18, 0, 20);
pc.rotation.y = Math.PI * 0.7;
G.add(pc);
wBox(6, 1.1, 1.2, wM(0xE8E0D0), 0, 0.55, 0, pc);
wBox(6.2, 0.06, 1.4, gold, 0, 1.12, 0, pc);
wBox(6, 2.6, 0.4, wM(0x2A1420), 0, 2.4, -1.4, pc);
var tr = wMesh(new THREE.CylinderGeometry(0.25, 0.15, 0.6, 10), silver, -1.5, 1.5, 0, pc);
wSph(0.3, silver, -1.5, 1.95, 0, pc, 10);
var tel = wCyl(0.08, 0.12, 1.1, gold, 0.8, 1.6, 0, pc, 8);
tel.rotation.z = 0.9;
wBox(0.5, 0.25, 0.35, wM(0x5A5A5A), 2, 1.25, 0, pc);
var hop = wMesh(new THREE.SphereGeometry(0.5, 16, 8), silver, 1.2, 1.4, -1.1, pc);
hop.scale.y = 0.35;
var ps = wSign(["PRIZES", "For chips"], 2.4, 0.8, "#14080E", "#E8C27A");
ps.position.set(0, 3.4, -1.15);
pc.add(ps);
CAS.solids.push({ x: -18, z: 20, hw: 3.2, hd: 1.4, rot: Math.PI * 0.7 });
CAS.spots.push({ x: -16.2, z: 18.2, r: 2.6, name: "The prize counter", fn: casPrizes });
[[-10, 2], [-10, -9]].forEach(function (q, i) {
var t = new THREE.Group();
t.position.set(q[0], 0, q[1]);
G.add(t);
wBox(5.4, 0.9, 2.6, wood, 0, 0.45, 0, t);
wBox(5.2, 0.06, 2.4, felt, 0, 0.93, 0, t);
var grid = wTex(256, 96, function (x, W, H) { x.fillStyle = "#0E5A3A"; x.fillRect(0, 0, W, H); x.strokeStyle = "#E8E0D0"; for (var c = 0; c < 12; c++)
for (var rr = 0; rr < 3; rr++) {
var nn = c * 3 + 3 - rr;
x.fillStyle = CAS_REDS.indexOf(nn) >= 0 ? "#A01E28" : "#141414";
x.fillRect(20 + c * 19, 6 + rr * 24, 18, 22);
x.fillStyle = "#fff";
x.font = "10px sans-serif";
x.fillText(nn, 22 + c * 19, 21 + rr * 24);
} x.fillStyle = "#1E8A4A"; x.fillRect(2, 6, 17, 70); });
var gm = wMesh(new THREE.PlaneGeometry(3.2, 1.6), new THREE.MeshLambertMaterial({ map: grid }), 0.9, 0.97, 0, t);
gm.rotation.x = -Math.PI / 2;
var bowl = wCyl(0.95, 0.75, 0.25, wood, -1.85, 1.05, 0, t, 32);
var wheel = new THREE.Group();
wheel.position.set(-1.85, 1.19, 0);
t.add(wheel);
var wt = wTex(128, 128, function (x, W, H) { for (var s = 0; s < 37; s++) {
x.fillStyle = s === 0 ? "#1E8A4A" : (s % 2 ? "#A01E28" : "#141414");
x.beginPath();
x.moveTo(64, 64);
x.arc(64, 64, 64, s / 37 * Math.PI * 2, (s + 1) / 37 * Math.PI * 2);
x.fill();
} x.fillStyle = "#C9A868"; x.beginPath(); x.arc(64, 64, 26, 0, 7); x.fill(); });
var wf = wMesh(new THREE.CircleGeometry(0.8, 37), new THREE.MeshLambertMaterial({ map: wt }), 0, 0, 0, wheel);
wf.rotation.x = -Math.PI / 2;
wCyl(0.08, 0.12, 0.25, gold, 0, 0.12, 0, wheel, 8);
for (var sp = 0; sp < 4; sp++) {
var arm = wBox(0.5, 0.03, 0.04, gold, 0, 0.24, 0, wheel);
arm.rotation.y = sp * Math.PI / 4;
}
var ball = wSph(0.04, wM(0xFFFFFF), 0.62, 0.06, 0, wheel, 8);
ball.visible = false;
CAS.wheels.push({ wheel: wheel, ball: ball, sp: 0.4, ballA: 0, ballSp: 0, t: t });
CAS.solids.push({ x: q[0], z: q[1], hw: 2.8, hd: 1.4 });
CAS.spots.push({ x: q[0] + 0.8, z: q[1] + 2.4, r: 2.2, name: "Roulette", fn: function () { casRoulette(i); } });
});
[[10, 2], [10, -9]].forEach(function (q, i) {
var t = new THREE.Group();
t.position.set(q[0], 0, q[1]);
G.add(t);
var top = wMesh(new THREE.CylinderGeometry(2.4, 2.4, 0.9, 32, 1, false, Math.PI / 2, Math.PI), wood, 0, 0.45, 0, t);
var ft = wMesh(new THREE.CircleGeometry(2.3, 32, Math.PI, Math.PI), felt, 0, 0.92, 0, t);
ft.rotation.x = -Math.PI / 2;
wBox(4.8, 0.95, 0.3, wood, 0, 0.47, -0.1, t);
var shoe = wBox(0.4, 0.25, 0.6, wM(0x8A1A2A), 1.4, 1.05, -0.2, t);
for (var c2 = 0; c2 < 5; c2++) {
var cd = wBox(0.18, 0.01, 0.26, cream, -1.2 + c2 * 0.6, 0.95, 1.2 + Math.abs(c2 - 2) * -0.2, t);
cd.rotation.y = (c2 - 2) * 0.25;
}
CAS.solids.push({ x: q[0], z: q[1] + 0.8, hw: 2.4, hd: 1.2 });
for (var s2 = 0; s2 < 5; s2++) {
var a5 = Math.PI * (0.15 + s2 * 0.175), sx = q[0] + Math.cos(a5) * 3.0, sz = q[1] + Math.sin(a5) * 3.0;
var stl = new THREE.Group();
stl.position.set(sx, 0, sz);
G.add(stl);
wCyl(0.25, 0.25, 0.08, wM(0x8A1A2A), 0, 0.72, 0, stl, 12);
wCyl(0.05, 0.05, 0.7, gold, 0, 0.35, 0, stl, 6);
CAS.solids.push({ x: sx, z: sz, r: 0.25 });
}
CAS.spots.push({ x: q[0], z: q[1] + 3.6, r: 2.4, name: "Blackjack", fn: function () { casBlackjack(i); } });
});
for (var m = 0; m < 14; m++) {
var west = m < 7, idx = west ? m : m - 7, a6 = (west ? Math.PI * 0.86 : Math.PI * 0.14) + (west ? -1 : 1) * (idx - 3) * 0.085;
var mx = Math.cos(a6) * 27.5, mz = -Math.sin(a6) * 27.5 + 6, poker = idx % 3 === 2;
var mg = new THREE.Group();
mg.position.set(mx, 0, mz);
mg.rotation.y = Math.atan2(-mx, -(mz - 6));
G.add(mg);
wBox(1, 1.6, 0.8, poker ? wM(0x1E3A6A) : wM(0x6A1A2A), 0, 0.8, 0, mg);
wBox(1.02, 0.08, 0.82, gold, 0, 1.62, 0, mg);
var scr = wBox(0.8, 0.6, 0.04, wB(poker ? 0x2A8AC8 : 0xF4ECD8, { fog: false }), 0, 1.25, 0.41, mg);
var top2 = wBox(1, 0.5, 0.6, poker ? wM(0x1E3A6A) : wM(0x6A1A2A), 0, 1.9, -0.1, mg);
var lamp = wBox(0.9, 0.12, 0.05, wB(0xFFD050, { fog: false }), 0, 2.1, 0.21, mg);
if (!poker) {
var lev = wCyl(0.03, 0.03, 0.6, silver, 0.6, 1.2, 0, mg, 5);
wSph(0.07, wM(0xC0303A), 0.6, 1.52, 0, mg, 8);
}
wCyl(0.25, 0.25, 0.06, wM(0x8A1A2A), 0, 0.68, 0.9, mg, 12);
wCyl(0.05, 0.05, 0.65, gold, 0, 0.33, 0.9, mg, 6);
CAS.machines.push({ g: mg, lamp: lamp, scr: scr, poker: poker, blink: 0 });
CAS.solids.push({ x: mx, z: mz, r: 0.7 });
(function (pk, x0, z0, ry) { CAS.spots.push({ x: x0 + Math.sin(ry) * 1.6, z: z0 + Math.cos(ry) * 1.6, r: 1.2, name: pk ? "Video poker" : "A slot machine", fn: function () { if (pk)
casPoker();
else
casSlots(); } }); })(poker, mx, mz, mg.rotation.y);
}
var bar = new THREE.Group();
bar.position.set(4, 0, -23);
G.add(bar);
wBox(9, 1.1, 0.8, wood, 0, 0.55, 2, bar);
wBox(9.2, 0.08, 1, gold, 0, 1.14, 2, bar);
wBox(9, 0.12, 0.12, gold, 0, 0.15, 2.45, bar);
for (var bp = 0; bp < 6; bp++)
wBox(0.6, 0.7, 0.02, wM(0x6A1A2A), -3.75 + bp * 1.5, 0.6, 2.41, bar);
wBox(9, 0.9, 0.6, wM(0x2A1420), 0, 0.45, -3.2, bar);
for (var sh = 0; sh < 3; sh++) {
wBox(7, 0.06, 0.4, wood, 0, 1.4 + sh * 0.6, -3.4, bar);
for (var bo = 0; bo < 12; bo++)
wCyl(0.06, 0.07, 0.32, wM([0x2A6A3A, 0x8A3A1A, 0xC8A040, 0x3A4AA8, 0xE8E0D0][(bo + sh) % 5], { op: 0.85 }), -3.2 + bo * 0.58, 1.6 + sh * 0.6, -3.4, bar, 8);
}
var win = wBox(10, 4.2, 0.1, wB(0x02030A, { fog: false }), 0, 4.4, -3.9, bar);
var er = wMesh(new THREE.SphereGeometry(2.4, 32, 20), new THREE.MeshBasicMaterial({ map: (typeof spPaint === "function" ? spPaint("earth") : null), fog: false }), 2.2, 3.4, -4.5, bar);
er.add(wGlow(0x6AA8FF, 7, 0.3));
CAS.earth2 = er;
var hz = wMesh(new THREE.PlaneGeometry(10, 1.4), wM(0x6A6760), 0, 2.6, -3.95, bar);
wBox(10.4, 0.3, 0.3, gold, 0, 6.6, -3.85, bar);
wBox(10.4, 0.3, 0.3, gold, 0, 2.2, -3.85, bar);
CAS.solids.push({ x: 4, z: -21, hw: 4.6, hd: 0.5 }, { x: 4, z: -26.2, hw: 5, hd: 0.6 });
for (var bs = 0; bs < 6; bs++) {
var bx = 0.25 + bs * 1.5, bz = -19.9;
wCyl(0.24, 0.24, 0.08, wM(0x8A1A2A), bx, 0.78, bz, G, 12);
wCyl(0.05, 0.05, 0.76, gold, bx, 0.38, bz, G, 6);
}
CAS.spots.push({ x: 4, z: -18.2, r: 2.6, name: "The bar", fn: casBar });
var stg = new THREE.Group();
stg.position.set(-16, 0, -20);
stg.rotation.y = Math.PI * 0.25;
G.add(stg);
wCyl(4, 4.2, 0.7, wood, 0, 0.35, 0, stg, 32);
wMesh(new THREE.TorusGeometry(4.1, 0.08, 6, 40), gold, 0, 0.72, 0, stg).rotation.x = Math.PI / 2;
[-1, 1].forEach(function (s) { wBox(1.4, 6, 0.2, wM(0x8A1A2A), s * 3.4, 3.7, -2.6, stg); });
wBox(8, 0.6, 0.25, gold, 0, 6.8, -2.6, stg);
var mic = wCyl(0.02, 0.02, 1.5, silver, 0.4, 1.45, 0.6, stg, 5);
wSph(0.06, silver, 0.4, 2.2, 0.6, stg, 8);
var spot = wMesh(new THREE.ConeGeometry(1.6, 8, 24, 1, true), wB(0xFFF0C8, { op: 0.08, ds: true, fog: false }), 0, 4.5, 0.4, stg);
CAS.spot = spot;
for (var tb = 0; tb < 4; tb++) {
var a8 = Math.PI * (1.25 + tb * 0.18), tx = -16 + Math.cos(a8) * 7, tz = -20 - Math.sin(a8) * 7;
wCyl(0.6, 0.6, 0.05, cream, tx, 0.75, tz, G, 16);
wCyl(0.06, 0.06, 0.75, gold, tx, 0.37, tz, G, 6);
var cdl = wSph(0.06, wB(0xFFC860, { fog: false }), tx, 0.85, tz, G, 6);
CAS.lights.push({ m: cdl, p: tb * 1.3, candle: 1 });
CAS.solids.push({ x: tx, z: tz, r: 0.6 });
}
CAS.solids.push({ x: -16, z: -20, r: 4.1 });
casStaff(G);
},
function (G) {
function staff(seed, title, x, z, ry, tagged) {
var g = wPerson("cas_" + seed, { title: title, place: "The Hidden Crescent casino", look: /security/.test(title) ? null : { hat: "none" } });
g.position.set(x, 0, z);
g.rotation.y = ry;
G.add(g);
if (tagged !== false) {
var tg = makeTag(casName(title, seed) + " · " + title + " (stand-in)", false);
tg.position.y = 2.05;
g.add(tg);
}
CAS.people.push({ g: g, role: title });
return g;
}
staff("sec1", "Casino security", -2.2, 29, Math.PI);
staff("sec2", "Casino security", 2.2, 29, Math.PI);
staff("mgr", "Casino manager", 0, 24.5, Math.PI);
var cash = staff("cash", "Chip cashier", 19.2, 21.4, Math.PI * 0.3);
CAS.cashier = cash;
staff("prize", "Casino host", -19.2, 21.4, -Math.PI * 0.3);
staff("cr1", "Croupier", -10, 0.6, 0);
staff("cr2", "Croupier", -10, -10.4, 0);
staff("dl1", "Card dealer", 10, 1.1, 0);
staff("dl2", "Card dealer", 10, -9.9, 0);
var sa = staff("sa1", "Slot attendant", -22, 4, Math.PI / 2);
CAS.people[CAS.people.length - 1].wander = { r: 6 };
staff("bk1", "Barkeep", 2.5, -22.4, 0);
staff("bk2", "Barkeep", 6, -22.4, -0.2, false);
var singer = wPerson("cas_singer", { title: "Lounge singer", place: "The Hidden Crescent casino", sex: "f", look: { layer: "suit", layerColor: 0xC9A868, top: 0xC9A868, bottom: 0x141418, neck: "necklace" } });
singer.position.set(-15.5, 0.7, -19.4);
singer.rotation.y = Math.PI * 0.25;
G.add(singer);
CAS.singer = singer;
var st = makeTag(casName("Lounge singer", 0) + " · Lounge singer (stand-in)", false);
st.position.y = 2.05;
singer.add(st);
var R = wRand(4242), gi = 0;
function guest(x, z, ry, seated, wander) { var g = wPerson("cas_g" + (gi++), {}); g.position.set(x, seated ? 0.08 : 0, z); g.rotation.y = ry; if (seated) {
g.userData.seated = true;
g.userData.pose = "sit";
} G.add(g); CAS.people.push({ g: g, role: "guest", wander: wander ? { r: wander } : null }); }
[[-11.5, 3.8], [-8.6, 3.7], [-10, -7.2], [-7.8, -7.4]].forEach(function (p) { guest(p[0], p[1], Math.PI, false); });
[[0, 1], [2, 1], [4, 0]].forEach(function (p) { var a = Math.PI * (0.15 + p[0] * 0.175), q = p[1] ? 2 : -9; guest(10 + Math.cos(a) * 3.0, q + Math.sin(a) * 3.0 + 0.1, Math.PI, true); });
[[1, 2], [3, -9]].forEach(function (p) { var a = Math.PI * (0.15 + p[0] * 0.175); guest(10 + Math.cos(a) * 3.0, p[1] + Math.sin(a) * 3.0 + 0.1, Math.PI, true); });
CAS.machines.slice(0, 10).forEach(function (mc, i) { if (i % 3 === 1)
return; var g = mc.g, d = 0.9; guest(g.position.x + Math.sin(g.rotation.y) * d, g.position.z + Math.cos(g.rotation.y) * d, g.rotation.y + Math.PI, true); });
for (var b = 0; b < 3; b++) {
guest(1.75 + b * 3, -19.8, Math.PI, true);
}
for (var t = 0; t < 3; t++) {
var a3 = Math.PI * (1.25 + t * 0.18);
guest(-16 + Math.cos(a3) * 7 - 0.7, -20 - Math.sin(a3) * 7, Math.PI * 0.25, true);
}
for (var w = 0; w < 6; w++)
guest(-6 + R() * 12, -4 + R() * 20, R() * 6, false, 7);
},
function () {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>18 and over only</div>" +
"<div style='opacity:.85;margin-top:6px'>The Hidden Crescent's tables, machines, cage and bar are for guests aged 18 and over. You are welcome to look round the hall and the view of Earth; the airlock behind you leads back.</div>" +
(casSigned() ? "" : "<div style='opacity:.85;margin-top:6px'>Sign in with an account aged 18 or over to play.</div>"));
},
function () {
camera.position.set(CAS.base, 1.72, 27);
yaw = 0;
pitch = 0;
if (!ageAdult()) {
casAgeNote();
return;
}
casLoad();
setStatus("<b>The Hidden Crescent.</b> Under the Moon's dust: the tables, the wheels, the machines and the bar, with Earth over it all. Gold buys chips at the cage, and the cage changes chips back into gold when you leave: win and you go home richer, lose and the gold is gone. Back (or the airlock) to leave.");
},
function () {
worldCard(null);
if (typeof orbEnsureSpace === "function")
orbEnsureSpace();
worldGo("surface", { k: "moon", keepFrom: true });
var B = WORLDS.surface.base, h = CAS.hatch;
camera.position.set(B + h.x, 1.72 + sfHeight(h.x, h.z + 4), h.z + 4);
yaw = Math.PI;
pitch = 0;
setStatus("<b>Back on the Moon.</b> The hatch seals behind you; the red light blinks on.");
},
function (dt) {
var L = worldLocal(), t = WLD.t;
CAS.wheels.forEach(function (w) { w.wheel.rotation.y += dt * w.sp; if (w.sp > 0.4)
w.sp = Math.max(0.4, w.sp - dt * 1.6); if (w.ballSp > 0) {
w.ballA -= dt * w.ballSp;
w.ballSp = Math.max(0, w.ballSp - dt * 3.2);
w.ball.position.set(Math.cos(w.ballA - w.wheel.rotation.y) * (0.45 + w.ballSp * 0.02), 0.06, Math.sin(w.ballA - w.wheel.rotation.y) * (0.45 + w.ballSp * 0.02));
} });
CAS.machines.forEach(function (m, i) { if (m.blink > 0)
m.lamp.material.color.setHex(0xFF4060);
else {
var gl = 0.5 + 0.5 * Math.sin((t * 0.5 + i * 0.37) * Math.PI * 2);
m.lamp.material.color.setRGB((90 + gl * 165) / 255, (64 + gl * 144) / 255, (16 + gl * 64) / 255);
} if (m.blink > 0)
m.blink -= dt; });
CAS.lights.forEach(function (l) { if (l.neon) {
l.m.material.color.setHSL(((t * 0.05 + l.p * 0.12) % 1), 0.8, 0.65);
}
else if (l.candle) {
var s = 0.85 + Math.sin(t * 9 + l.p) * 0.1 + Math.random() * 0.05;
l.m.scale.setScalar(s);
}
else {
l.m.visible = Math.sin(t * 1.7 + l.p) > -0.95;
} });
if (CAS.earth)
CAS.earth.rotation.y += dt * 0.03;
if (CAS.earth2)
CAS.earth2.rotation.y += dt * 0.03;
if (CAS.singer) {
CAS.singer.rotation.y = Math.PI * 0.25 + Math.sin(t * 0.9) * 0.35;
}
if (CAS.spot)
CAS.spot.material.opacity = 0.07 + Math.sin(t * 1.3) * 0.02;
CAS.people.forEach(function (p) { if (p.wander)
wWander(p.g, dt, null, { r: p.wander.r, sp: 1 }); });
if (typeof LITE !== "undefined" && LITE && t - (CAS.cullT || -1) > 0.3) {
CAS.cullT = t;
var C = camera.position, q = CAS.cullV || (CAS.cullV = new THREE.Vector3());
CAS.people.forEach(function (p) { if (p.role !== "guest")
return; p.g.getWorldPosition(q); p.g.visible = (q.x - C.x) * (q.x - C.x) + (q.z - C.z) * (q.z - C.z) < 20 * 20; });
}
var s = null;
CAS.spots.forEach(function (q) { if (wNear(L.x, L.z, q.x, q.z, q.r))
s = q; });
if (s)
worldPrompt("<b>" + esc(s.name) + "</b> · <b>press E</b>", (s.fn === casLeave || ageAdult()) ? s.fn : casAgeNote);
else
worldPrompt(null);
var h = "<b style='color:#E8C27A'>The Hidden Crescent</b> · " + (CAS.practice ? "practice chips: " + CAS.pchips : (CAS.chips == null ? "chips: …" : "your chips: " + CAS.chips.toLocaleString() + " · gold: " + (CAS.gold || 0).toLocaleString()));
worldBanner(h);
},
function () {
if (!casSigned()) {
CAS.practice = true;
return Promise.resolve();
}
return casRpc("casino_wallet").then(function (o) {
if (!o || !o.ok) {
CAS.practice = true;
return;
}
CAS.practice = false;
CAS.chips = +o.chips || 0;
CAS.gold = +o.gold || 0;
CAS.rate = +o.rate || 10;
CAS.min = +o.min || 5;
CAS.max = +o.max || 5000;
CAS.prizes = o.prizes || [];
}).catch(function () { CAS.practice = true; });
},
function (title, sub) {
return "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + esc(title) + "</div>" + (sub ? "<div style='opacity:.8;margin-bottom:6px'>" + sub + "</div>" : "") +
"<div style='margin:4px 0 8px;padding:5px 8px;border:1px solid rgba(232,194,122,.4);border-radius:4px'>" + (CAS.practice ? "<b>Practice chips: " + CAS.pchips + "</b> <span style='opacity:.7'>(not signed in: these win nothing)</span>" : "<b>Your chips: " + (CAS.chips || 0).toLocaleString() + "</b> · gold: " + (CAS.gold || 0).toLocaleString()) + "</div>";
},
function (b) {
if (b < CAS.min)
return "The smallest bet is " + CAS.min + " chips.";
if (b > CAS.max)
return "The house limit is " + CAS.max + " chips a bet.";
if (CAS.practice && b > CAS.pchips)
return "You have not enough practice chips.";
if (!CAS.practice && b > (CAS.chips || 0))
return "You have not enough chips. Change some gold at the cage.";
return null;
},
function () {
var html = casHead("The cage", "Gold for chips, " + CAS.rate + " chips a gold piece, and chips back into gold at the same rate. Win and you leave with more gold than you brought; lose and it is gone. Chips are also spent at the bar or the prize counter.");
if (CAS.practice)
html += "<div style='opacity:.85'>Sign in, with gold in your purse, to buy real chips. Meanwhile the cashier hands you practice chips: play as you like, but they win nothing.</div>" + worldBtn("pr", "Take 1,000 practice chips", "Free; for learning the games");
else {
html += "<label style='display:block;margin:6px 0'>Gold <input id='cas-gold' type='number' min='1' value='10' style='width:90px;background:#0A0C18;border:1px solid #8FB4E8;color:#E8ECF4;padding:4px 6px'></label>" + worldBtn("buy", "Change it for chips", "The gold goes to the Treasury; the chips are yours to play");
var whole = Math.floor((CAS.chips || 0) / CAS.rate) * CAS.rate;
html += "<label style='display:block;margin:10px 0 6px'>Chips <input id='cas-out' type='number' min='" + CAS.rate + "' step='" + CAS.rate + "' value='" + (whole || CAS.rate) + "' style='width:90px;background:#0A0C18;border:1px solid #8FB4E8;color:#E8ECF4;padding:4px 6px'></label>" +
worldBtn("out", "Cash them for gold", CAS.rate + " chips make a gold piece; odd chips stay with you");
}
html += "<div id='cas-msg' style='margin-top:6px'></div>";
worldCard(html, { pr: function () { CAS.pchips = 1000; casCage(); }, out: function () {
var c = Math.floor(+(document.getElementById("cas-out").value) || 0);
if (c < CAS.rate)
return casMsg("At least " + CAS.rate + " chips, to make a gold piece.");
if (c > (CAS.chips || 0))
return casMsg("You have not that many chips.");
casRpc("casino_cash_out", { p_chips: c }).then(function (o) {
if (!o || !o.ok)
return casMsg(esc((o && o.say) || "The cage could not do that."));
CAS.chips = +o.chips;
CAS.gold = (CAS.gold || 0) + (+o.gold || 0);
if (typeof refreshStanding === "function")
refreshStanding();
casCage();
casMsg("<b>" + esc(o.say) + "</b>");
})
.catch(function (e) { casMsg(esc(e.message)); });
}, buy: function () {
var g = Math.floor(+(document.getElementById("cas-gold").value) || 0);
if (g < 1)
return casMsg("How much gold?");
casRpc("casino_buy_chips", { p_gold: g }).then(function (o) {
if (!o || !o.ok)
return casMsg(esc((o && o.say) || "The cage could not do that."));
CAS.chips = +o.chips;
CAS.gold = Math.max(0, (CAS.gold || 0) - g);
if (typeof refreshStanding === "function")
refreshStanding();
casCage();
casMsg("<b>" + esc(o.say) + "</b>");
})
.catch(function (e) { casMsg(esc(e.message)); });
} });
},
function (i) {
var html = casHead("Roulette", "A single-zero wheel. Red or black, odd or even, low or high pay even money; a dozen or a column pays 2 to 1; a single number pays 35 to 1.") + casBetInput("cas-bet") +
"<div style='display:flex;flex-wrap:wrap;gap:4px'>" + [["red", "Red"], ["black", "Black"], ["odd", "Odd"], ["even", "Even"], ["low", "1 to 18"], ["high", "19 to 36"], ["dozen:1", "1st 12"], ["dozen:2", "2nd 12"], ["dozen:3", "3rd 12"], ["column:1", "Col 1"], ["column:2", "Col 2"], ["column:3", "Col 3"]].map(function (b) {
return "<span data-w='b-" + b[0] + "' style='padding:5px 9px;border:1px solid #8FB4E8;border-radius:4px;" + (b[0] === "red" ? "background:#6A141C" : b[0] === "black" ? "background:#141414" : "") + "'>" + b[1] + "</span>";
}).join("") + "</div>" +
"<label style='display:block;margin:8px 0 4px'>Or a single number <input id='cas-num' type='number' min='0' max='36' value='17' style='width:60px;background:#0A0C18;border:1px solid #8FB4E8;color:#E8ECF4;padding:4px 6px'></label>" + worldBtn("b-straight", "Bet on that number", "Pays 35 to 1") + "<div id='cas-msg' style='margin-top:6px'></div>";
var fns = {};
["red", "black", "odd", "even", "low", "high", "dozen:1", "dozen:2", "dozen:3", "column:1", "column:2", "column:3", "straight"].forEach(function (k) { fns["b-" + k] = function () { var p = k.split(":"); casSpin(i, p[0], p[0] === "straight" ? Math.floor(+document.getElementById("cas-num").value) : (p[1] ? +p[1] : null)); }; });
worldCard(html, fns);
},
function (kind, pick, bet) {
var n = Math.floor(Math.random() * 37), red = CAS_REDS.indexOf(n) >= 0, win = false, mult = 0;
switch (kind) {
case "straight":
win = n === pick;
mult = 36;
break;
case "red":
win = n > 0 && red;
mult = 2;
break;
case "black":
win = n > 0 && !red;
mult = 2;
break;
case "odd":
win = n > 0 && n % 2 === 1;
mult = 2;
break;
case "even":
win = n > 0 && n % 2 === 0;
mult = 2;
break;
case "low":
win = n >= 1 && n <= 18;
mult = 2;
break;
case "high":
win = n >= 19;
mult = 2;
break;
case "dozen":
win = n > 0 && Math.floor((n - 1) / 12) + 1 === pick;
mult = 3;
break;
case "column":
win = n > 0 && (n - 1) % 3 + 1 === pick;
mult = 3;
break;
}
CAS.pchips += -bet + (win ? bet * mult : 0);
return { ok: true, n: n, colour: n === 0 ? "green" : red ? "red" : "black", win: win, payout: win ? bet * mult : 0 };
},
function (i, kind, pick) {
if (CAS.busy)
return;
var bet = casBet("cas-bet"), bad = casCheckBet(bet);
if (bad)
return casMsg(bad);
if (kind === "straight" && !(pick >= 0 && pick <= 36))
return casMsg("Pick a number from 0 to 36.");
CAS.busy = true;
var w = CAS.wheels[i];
if (w) {
w.sp = 9;
w.ballSp = 14;
w.ball.visible = true;
}
casMsg("<i>No more bets.</i> The ball is rolling…");
var p = CAS.practice ? Promise.resolve(casSpinLocal(kind, pick, bet)) : casRpc("casino_roulette", { p_bet: bet, p_kind: kind, p_pick: pick });
p.then(function (o) {
setTimeout(function () {
CAS.busy = false;
if (!o || !o.ok)
return casMsg(esc((o && o.say) || "The croupier waves the bet away."));
casPaid(o);
casRoulette(i);
casMsg("<b style='font-size:18px;color:" + (o.colour === "red" ? "#FF6A6A" : o.colour === "green" ? "#6AE08A" : "#E8ECF4") + "'>" + o.n + " " + o.colour + "</b> · " + (o.win ? "<b style='color:#FFE7B0'>You win " + o.payout + " chips.</b>" : "The croupier sweeps your chips away."));
if (typeof playTone === "function")
playTone(o.win ? 660 : 180, 0.4);
}, 2600);
}).catch(function (e) { CAS.busy = false; casMsg(esc(e.message)); });
},
function (bet) {
function sym() { var r = Math.floor(Math.random() * 35); return r < 6 ? "cherry" : r < 16 ? "lemon" : r < 24 ? "bell" : r < 30 ? "star" : r < 33 ? "seven" : "moon"; }
var a = sym(), b = sym(), c = sym(), mult = 0;
if (a === b && b === c)
mult = { moon: 200, seven: 80, star: 30, bell: 16, lemon: 10, cherry: 10 }[a];
else if ([a, b, c].filter(function (x) { return x === "cherry"; }).length === 2)
mult = 3;
CAS.pchips += -bet + bet * mult;
return { ok: true, reels: [a, b, c], payout: bet * mult, win: mult > 0 };
},
function () {
var html = casHead("A slot machine", "Three moons pay 200 to 1; three sevens 80; three stars 30; three bells 16; three lemons or cherries 10; two cherries 3. Over time it pays back about 93 chips in every 100.") +
"<div id='cas-reels' style='font-size:40px;text-align:center;letter-spacing:12px;margin:6px 0'>🌙⭐🍒</div>" + casBetInput("cas-bet", CAS.min) + worldBtn("spin", "Pull the lever", "") + "<div id='cas-msg'></div>";
worldCard(html, { spin: casPull });
},
function () {
if (CAS.busy)
return;
var bet = casBet("cas-bet"), bad = casCheckBet(bet);
if (bad)
return casMsg(bad);
CAS.busy = true;
var el = document.getElementById("cas-reels"), keys = Object.keys(CAS_SYM), n = 0;
var roll = setInterval(function () { if (el)
el.textContent = [0, 1, 2].map(function () { return CAS_SYM[keys[Math.floor(Math.random() * keys.length)]]; }).join(""); }, 80);
var p = CAS.practice ? Promise.resolve(casSlotLocal(bet)) : casRpc("casino_slots", { p_bet: bet });
p.then(function (o) {
setTimeout(function () {
clearInterval(roll);
CAS.busy = false;
if (!o || !o.ok)
return casMsg(esc((o && o.say) || "The machine will not take that."));
casPaid(o);
var keep = bet;
casSlots();
var e2 = document.getElementById("cas-reels");
if (e2)
e2.textContent = o.reels.map(function (s) { return CAS_SYM[s] || "?"; }).join("");
var bi = document.getElementById("cas-bet");
if (bi)
bi.value = keep;
casMsg(o.win ? "<b style='color:#FFE7B0'>You win " + o.payout + " chips!</b>" : "No luck this time.");
if (o.win) {
var L = worldLocal();
CAS.machines.forEach(function (m) { var gp = m.g.position; if (Math.hypot(gp.x - L.x, gp.z - L.z) < 3)
m.blink = 3; });
if (typeof playTone === "function") {
playTone(880, 0.2);
setTimeout(function () { playTone(1100, 0.4); }, 200);
}
}
}, 1400);
}).catch(function (e) { clearInterval(roll); CAS.busy = false; casMsg(esc(e.message)); });
},
function (i) {
var H = CAS.hand && CAS.hand.game === "bj" ? CAS.hand : null;
var html = casHead("Blackjack", "Get nearer 21 than the dealer without going over. The dealer stands on 17. A blackjack pays 3 to 2; a win pays even money.");
if (H) {
html += "<div><b>Dealer</b> (" + H.dtotal + ")<br>" + H.dealer.map(casCard).join("") + (H.status === "open" ? "<span style='display:inline-block;min-width:34px;padding:6px 4px;margin:2px;background:#6A141C;border-radius:4px'>&nbsp;</span>" : "") + "</div>" +
"<div style='margin-top:6px'><b>You</b> (" + H.ptotal + ")<br>" + H.player.map(casCard).join("") + "</div>";
if (H.status === "open")
html += worldBtn("hit", "Hit", "Another card") + worldBtn("stand", "Stand", "Keep what you have") + (H.player.length === 2 ? worldBtn("double", "Double", "Double the bet, one more card, then stand") : "");
else
html += "<div style='margin-top:8px;font-size:15px'><b style='color:#FFE7B0'>" + ({ blackjack: "Blackjack! You win " + H.payout + " chips.", win: "You win " + H.payout + " chips.", push: "A push: your bet comes back.", lose: "The dealer wins.", bust: "Bust: over 21." }[H.outcome] || "") + "</b></div>" + casBetInput("cas-bet", H.baseBet) + worldBtn("deal", "Deal again", "");
}
else
html += casBetInput("cas-bet") + worldBtn("deal", "Deal", "Two cards each; one of the dealer's face down");
html += "<div id='cas-msg' style='margin-top:6px'></div>";
worldCard(html, { deal: function () { casBjDeal(i); }, hit: function () { casBjAct(i, "hit"); }, stand: function () { casBjAct(i, "stand"); }, double: function () { casBjAct(i, "double"); } });
},
function (L) {
var pt = casBjTotal(L.p);
if (pt <= 21)
while (casBjTotal(L.d) < 17)
L.d.push(L.deck.shift());
var dt = casBjTotal(L.d);
if (pt > 21) {
L.outcome = "bust";
L.payout = 0;
}
else if (L.p.length === 2 && pt === 21 && !(L.d.length === 2 && dt === 21)) {
L.outcome = "blackjack";
L.payout = L.bet + Math.floor(L.bet * 3 / 2);
}
else if (dt > 21 || pt > dt) {
L.outcome = "win";
L.payout = L.bet * 2;
}
else if (pt === dt) {
L.outcome = "push";
L.payout = L.bet;
}
else {
L.outcome = "lose";
L.payout = 0;
}
L.done = true;
CAS.pchips += L.payout;
},
function (i) {
if (CAS.busy)
return;
var bet = casBet("cas-bet"), bad = casCheckBet(bet);
if (bad)
return casMsg(bad);
if (CAS.practice) {
var d = casDeck(), L = { deck: d.slice(4), p: [d[0], d[2]], d: [d[1], d[3]], bet: bet, base: bet };
CAS.pchips -= bet;
if (casBjTotal(L.p) === 21 || casBjTotal(L.d) === 21)
casBjLocalSettle(L);
CAS.hand = casBjLocalView(L, L.done);
casBlackjack(i);
return;
}
CAS.busy = true;
casRpc("casino_bj_deal", { p_bet: bet }).then(function (o) {
CAS.busy = false;
if (!o || !o.ok)
return casMsg(esc((o && o.say) || "The dealer shakes their head."));
casPaid(o);
o.game = "bj";
o.baseBet = bet;
CAS.hand = o;
casBlackjack(i);
}).catch(function (e) { CAS.busy = false; casMsg(esc(e.message)); });
},
function (i, act) {
var H = CAS.hand;
if (!H || H.status !== "open" || CAS.busy)
return;
if (H.local) {
var L = H.local;
if (act === "double") {
if (CAS.pchips < L.bet)
return casMsg("You have not enough practice chips to double.");
CAS.pchips -= L.bet;
L.bet *= 2;
L.p.push(L.deck.shift());
casBjLocalSettle(L);
}
else if (act === "hit") {
L.p.push(L.deck.shift());
if (casBjTotal(L.p) >= 21)
casBjLocalSettle(L);
}
else
casBjLocalSettle(L);
CAS.hand = casBjLocalView(L, L.done);
casBlackjack(i);
return;
}
CAS.busy = true;
casRpc("casino_bj_act", { p_hand: H.hand, p_act: act }).then(function (o) {
CAS.busy = false;
if (!o || !o.ok)
return casMsg(esc((o && o.say) || "Not now."));
casPaid(o);
o.game = "bj";
o.baseBet = H.baseBet;
CAS.hand = o;
casBlackjack(i);
}).catch(function (e) { CAS.busy = false; casMsg(esc(e.message)); });
},
function (cs) {
var cnt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
cs.forEach(function (c) { cnt[c % 13]++; });
var flush = cs.every(function (c) { return Math.floor(c / 13) === Math.floor(cs[0] / 13); }), uniq = cnt.filter(function (x) { return x > 0; }).length;
var rs = cs.map(function (c) { return c % 13; }), straight = uniq === 5 && (Math.max.apply(null, rs) - Math.min.apply(null, rs) === 4 || (cnt[0] && cnt[9] && cnt[10] && cnt[11] && cnt[12]));
var four = cnt.indexOf(4) >= 0, three = cnt.indexOf(3) >= 0, pairs = cnt.filter(function (x) { return x === 2; }).length, hi = cnt[0] === 2 || cnt[10] === 2 || cnt[11] === 2 || cnt[12] === 2;
if (straight && flush && cnt[0] && cnt[12])
return CAS_VP_PAY[0];
if (straight && flush)
return CAS_VP_PAY[1];
if (four)
return CAS_VP_PAY[2];
if (three && pairs === 1)
return CAS_VP_PAY[3];
if (flush)
return CAS_VP_PAY[4];
if (straight)
return CAS_VP_PAY[5];
if (three)
return CAS_VP_PAY[6];
if (pairs === 2)
return CAS_VP_PAY[7];
if (pairs === 1 && hi)
return CAS_VP_PAY[8];
return ["Nothing", 0];
},
function () {
var H = CAS.hand && CAS.hand.game === "vp" ? CAS.hand : null;
var html = casHead("Video poker: Jacks or Better", "Deal five cards, choose which to hold, and draw once. " + CAS_VP_PAY.map(function (p) { return p[0] + " " + p[1] + "×"; }).join(" · ") + ".");
if (H) {
html += "<div style='text-align:center'>" + H.cards.map(function (c, k) { return "<span data-w='h" + k + "' style='display:inline-block;margin:2px;padding:2px;border:2px solid " + (H.hold[k] ? "#FFE7B0" : "transparent") + ";border-radius:6px'>" + casCard(c) + "<div style='font-size:10px;opacity:.85'>" + (H.status === "open" ? (H.hold[k] ? "HELD" : "tap to hold") : "&nbsp;") + "</div></span>"; }).join("") + "</div>";
if (H.status === "open")
html += worldBtn("draw", "Draw", "Replace the cards you did not hold");
else
html += "<div style='margin:8px 0;font-size:15px'><b style='color:#FFE7B0'>" + esc(H.result) + (H.payout ? ": " + H.payout + " chips" : "") + "</b></div>" + casBetInput("cas-bet", H.bet) + worldBtn("deal", "Deal again", "");
}
else
html += casBetInput("cas-bet") + worldBtn("deal", "Deal", "");
html += "<div id='cas-msg' style='margin-top:6px'></div>";
var fns = { deal: casVpDeal, draw: casVpDraw };
[0, 1, 2, 3, 4].forEach(function (k) { fns["h" + k] = function () { if (H && H.status === "open") {
H.hold[k] = !H.hold[k];
casPoker();
} }; });
worldCard(html, fns);
},
function () {
if (CAS.busy)
return;
var bet = casBet("cas-bet"), bad = casCheckBet(bet);
if (bad)
return casMsg(bad);
if (CAS.practice) {
var d = casDeck();
CAS.pchips -= bet;
CAS.hand = { game: "vp", local: { deck: d.slice(5) }, cards: d.slice(0, 5), hold: [false, false, false, false, false], status: "open", bet: bet };
casPoker();
return;
}
CAS.busy = true;
casRpc("casino_vp_deal", { p_bet: bet }).then(function (o) {
CAS.busy = false;
if (!o || !o.ok)
return casMsg(esc((o && o.say) || "The machine will not deal."));
casPaid(o);
CAS.hand = { game: "vp", hand: o.hand, cards: o.cards, hold: [false, false, false, false, false], status: "open", bet: bet };
casPoker();
}).catch(function (e) { CAS.busy = false; casMsg(esc(e.message)); });
},
function () {
var H = CAS.hand;
if (!H || H.status !== "open" || CAS.busy)
return;
if (H.local) {
for (var k = 0; k < 5; k++)
if (!H.hold[k])
H.cards[k] = H.local.deck.shift();
var r = casVpRank(H.cards);
H.result = r[0];
H.payout = H.bet * r[1];
CAS.pchips += H.payout;
H.status = "done";
casPoker();
return;
}
CAS.busy = true;
casRpc("casino_vp_draw", { p_hand: H.hand, p_hold: H.hold }).then(function (o) {
CAS.busy = false;
if (!o || !o.ok)
return casMsg(esc((o && o.say) || "Not now."));
casPaid(o);
H.cards = o.cards;
H.result = o.result;
H.payout = o.payout;
H.status = "done";
casPoker();
}).catch(function (e) { CAS.busy = false; casMsg(esc(e.message)); });
},
function () {
return CAS.prizes && CAS.prizes.length ? CAS.prizes : [{ id: 1, name: "An Earthrise cocktail", chips: 30, note: "Blue and gold, with a view of Earth." }, { id: 2, name: "A plate of moon cakes", chips: 60, note: "From the kitchen behind the bar." },
{ id: 3, name: "Crescent pin", chips: 500, note: "A silver crescent for the lapel." }, { id: 4, name: "Moon-rock paperweight", chips: 1500, note: "Lunar basalt, set in glass." }, { id: 5, name: "Lunar telescope", chips: 5000, note: "Brass, on a tripod." },
{ id: 6, name: "Silver Crescent trophy", chips: 12000, note: "For the luckiest guests." }, { id: 7, name: "Moon hopper", chips: 40000, note: "A little silver hopper you can ride about the city." }];
},
function (title, sub, filter) {
var list = casPrizeList().filter(filter), fns = {};
var html = casHead(title, sub) + list.map(function (p) { fns["p" + p.id] = function () { casRedeem(p, title, sub, filter); }; return worldBtn("p" + p.id, esc(p.name) + " · " + p.chips.toLocaleString() + " chips", esc(p.note)); }).join("") + "<div id='cas-msg' style='margin-top:6px'></div>";
worldCard(html, fns);
},
function (p, title, sub, filter) {
if (CAS.practice)
return casMsg("Practice chips buy nothing here. Sign in and change gold at the cage for real chips.");
if ((CAS.chips || 0) < p.chips)
return casMsg(esc(p.name) + " is " + p.chips + " chips. You have " + (CAS.chips || 0) + ".");
casRpc("casino_redeem", { p_prize: p.id }).then(function (o) {
if (!o || !o.ok)
return casMsg(esc((o && o.say) || "Not now."));
CAS.chips = +o.chips;
if (typeof loadThings === "function")
loadThings();
casShop(title, sub, filter);
casMsg("<b>" + esc(o.say) + "</b>");
}).catch(function (e) { casMsg(esc(e.message)); });
}
];
});
