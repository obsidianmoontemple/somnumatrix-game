/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(329, function () {
"use strict";
return [
function (I, x, z) {
var d = Math.hypot(x - I.x, z - I.z);
if (d > I.r * 1.25)
return null;
var k = d / I.r, n = (typeof wFbm === "function" ? wFbm(x * 0.03, z * 0.03, I.x | 0, 3) : 0.5) - 0.5, h;
if (I.k === "lampwick")
h = I.top * Math.max(0, Math.min(1, (1.02 - k) / 0.32)) + n * 2.4;
else
h = I.top * (1 - k * k) * (0.85 + n * 0.5) + n * 1.2;
return SSX_Y + h - (k > 1 ? (k - 1) * 30 : 0);
},
function (x, z, feet) {
var best = null;
for (var i = 0; i < SSX.decks.length; i++) {
var D = SSX.decks[i], on = false;
if (D.r1 !== undefined) {
var d = Math.hypot(x - D.x, z - D.z);
on = d > D.r0 && d < D.r1;
}
else if (D.r !== undefined)
on = Math.hypot(x - D.x, z - D.z) < D.r;
else
on = x > D.x0 && x < D.x1 && z > D.z0 && z < D.z1;
if (!on)
continue;
var y = D.h ? D.h(x, z) : D.y;
if (feet !== undefined && Math.abs(y - feet) > 6 && best !== null)
continue;
if (best === null || (feet !== undefined ? Math.abs(y - feet) < Math.abs(best - feet) : y > best))
best = y;
}
return best;
},
function (x, z) {
var L = typeof worldLocal === "function" ? worldLocal() : null, feet = SSX.feetHint !== undefined ? SSX.feetHint : L ? L.y - 1.72 : undefined;
var d = ssxDeckAt(x, z, feet), m = ssxLandAt(x, z), land = m > SSX_Y + 0.3 ? m : null;
if (d !== null && (land === null || feet === undefined || Math.abs(d - feet) < 3 || d < land + 0.5))
return d;
return land;
},
function (len, beam, dep) {
var g = new THREE.BoxGeometry(beam, dep, len, 2, 2, 12), p = g.attributes.position, L = len / 2;
for (var i = 0; i < p.count; i++) {
var x = p.getX(i), y = p.getY(i), z = p.getZ(i), k = z / L, kk = Math.abs(k);
var taper = z > 0 ? 1 - Math.pow(kk, 1.6) * 0.92 : 1 - Math.pow(kk, 2.4) * 0.55;
var bottom = y < 0 ? 0.38 + 0.4 * (1 - kk) : 1;
p.setX(i, x * taper * bottom);
if (y > 0)
p.setY(i, y + Math.pow(kk, 2.2) * (z > 0 ? 0.7 : 0.35));
else
p.setY(i, y + kk * kk * 0.25);
}
g.computeVertexNormals();
return g;
},
function (seed) {
var k = "sail" + seed;
if (SSX_MC[k])
return SSX_MC[k];
var R = wRand(seed), t = wTex(128, 256, function (x, W, H) {
x.fillStyle = "#C8C0B4";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 900; i++) {
var v = 150 + R() * 80 | 0;
x.fillStyle = "rgba(" + v + "," + (v - 6) + "," + (v - 14) + ",0.35)";
x.fillRect(R() * W, R() * H, 1 + R() * 3, 1);
}
for (var s = 0; s < H; s += 26) {
x.fillStyle = "rgba(40,30,24,0.35)";
x.fillRect(0, s, W, 2);
}
for (var p = 0; p < 4; p++) {
var pw = 14 + R() * 22, ph = 12 + R() * 20, px = R() * (W - pw), py = 40 + R() * (H - 90);
x.fillStyle = "rgba(70,52,40,0.55)";
x.fillRect(px, py, pw, ph);
x.strokeStyle = "rgba(30,22,18,.7)";
x.setLineDash([2, 2]);
x.strokeRect(px, py, pw, ph);
x.setLineDash([]);
}
for (var st = 0; st < 10; st++) {
var g = x.createLinearGradient(0, H, 0, H * 0.5);
g.addColorStop(0, "rgba(20,16,12,.6)");
g.addColorStop(1, "rgba(20,16,12,0)");
x.fillStyle = g;
var sx = R() * W;
x.fillRect(sx, H * 0.45, 3 + R() * 8, H * 0.55);
}
x.globalCompositeOperation = "destination-out";
x.beginPath();
x.moveTo(0, H);
for (var c = 0; c <= W; c += 4)
x.lineTo(c, H - 3 - R() * R() * 16);
x.lineTo(W, H);
x.closePath();
x.fill();
for (var h = 0; h < 5; h++) {
x.beginPath();
var hx = 10 + R() * (W - 20), hy = H * 0.35 + R() * H * 0.5, hr = 2 + R() * 5;
x.moveTo(hx + hr, hy);
for (var a = 1; a <= 9; a++) {
var an = a / 9 * 6.283, rr = hr * (0.6 + R() * 0.7);
x.lineTo(hx + Math.cos(an) * rr, hy + Math.sin(an) * rr);
}
x.fill();
}
x.globalCompositeOperation = "source-over";
});
return (SSX_MC[k] = t);
},
function (B) {
var g = new THREE.Group();
g.userData.ssxBoat = 1;
var hullM = ssxM(B.col, "wood"), trim = ssxM(0x3A2E24, "wood"), dark = ssxM(0x16120E, "wood"), iron = ssxM(0x24221F), rust = ssxM(0x3A2A20), brass = wM(0x8A7040), L = B.len / 2;
var hull = new THREE.Mesh(ssxHullGeo(B.len, B.beam, 1.1), hullM);
hull.position.y = 0.25;
g.add(hull);
var tar = new THREE.Mesh(ssxHullGeo(B.len * 1.005, B.beam * 1.02, 0.5), ssxM(0x0C0A08));
tar.position.y = -0.05;
g.add(tar);
[-0.55, -0.18, 0.2, 0.55].forEach(function (f) {
var z = f * B.len, k = Math.abs(f * 2), w = z > 0 ? 1 - Math.pow(k, 1.6) * 0.92 : 1 - Math.pow(k, 2.4) * 0.55;
[-1, 1].forEach(function (s) { var b = udxBox(0.03, 1.05, 0.1, iron, s * B.beam * 0.5 * w * 0.98, 0.55, z, g); b.rotation.z = s * 0.28; });
});
udxBox(B.beam * 0.72, 0.06, B.len * 0.78, trim, 0, 0.62, -0.1, g);
for (var r = -2; r <= 2; r++) {
var z = r * B.len * 0.16;
udxBox(B.beam * 0.78 * (1 - Math.abs(r) * 0.1), 0.08, 0.28, dark, 0, 1.0, z, g);
}
[-1, 1].forEach(function (s) { var gw = udxBox(0.12, 0.12, B.len * 0.86, dark, s * B.beam * 0.45, 1.32, -0.15, g); gw.rotation.y = s * -0.02; });
for (var q = 0; q < 7; q++) {
var zq = -L * 0.8 + q * B.len * 0.13;
[-1, 1].forEach(function (s) { udxBox(0.06, 0.6, 0.08, dark, s * B.beam * 0.42 * (1 - Math.pow(Math.abs(zq / L), 2) * 0.6), 0.95, zq, g); });
}
var stem = new THREE.Group();
stem.position.set(0, 1.1, L - 0.2);
g.add(stem);
for (var sgm = 0; sgm < 6; sgm++) {
var a0 = sgm * 0.2, pc = udxBox(0.16, 0.5, 0.18, dark, 0, 0.22 + sgm * 0.42, Math.sin(a0) * 0.5 * sgm * 0.4, stem);
pc.rotation.x = a0 * 0.55;
}
var head = new THREE.Group();
head.position.set(0, 2.75, 0.95);
head.rotation.x = 0.3;
stem.add(head);
var skull = wCone(0.2, 0.75, dark, 0, 0, 0.3, head, 6);
skull.rotation.x = Math.PI / 2;
var jaw = wCone(0.12, 0.55, dark, 0, -0.16, 0.26, head, 5);
jaw.rotation.x = Math.PI / 2 + 0.35;
wSph(0.22, dark, 0, 0.02, -0.08, head, 7);
[-1, 1].forEach(function (s) { wSph(0.045, ssxGlowM(0x7AE8A0, 1), s * 0.12, 0.08, 0.12, head, 6); var hn = wCone(0.05, 0.4, iron, s * 0.13, 0.2, -0.18, head, 5); hn.rotation.x = -0.9; hn.rotation.z = s * 0.3; });
for (var fn = 0; fn < 4; fn++) {
var fin = wCone(0.06, 0.28, dark, 0, 0.2, -0.25 - fn * 0.18, head, 4);
fin.rotation.x = -0.5;
}
var sternp = udxBox(0.16, 1.5, 0.18, dark, 0, 1.6, -L - 0.05, g);
sternp.rotation.x = -0.25;
udxBox(B.beam * 0.7, 0.1, 0.9, trim, 0, 0.95, -L + 1.1, g);
var tp = new THREE.Group();
tp.position.set(0, 1.05, -L + 0.35);
g.add(tp);
var till = udxBox(0.08, 0.08, 1.5, trim, 0, 0.05, 0.75, tp);
till.rotation.x = -0.12;
wSph(0.07, iron, 0, 0.14, 1.48, tp, 8);
g.userData.tiller = tp;
udxBox(0.06, 1.2, 0.7, dark, 0, 0.2, -L - 0.15, g);
wCyl(0.14, 0.18, 0.5, brass, 0, 1.25, -L + 2.1, g, 10);
wCyl(0.12, 0.12, 0.02, ssxGlowM(0x9AD8C8, 1), 0, 1.51, -L + 2.1, g, 16);
var ndl = udxBox(0.02, 0.01, 0.2, wB(0xB83A2A), 0, 1.53, -L + 2.1, g);
g.userData.needle = ndl;
var pole = wCyl(0.04, 0.05, 2.2, iron, 0.35, 2.0, L - 0.9, g, 6);
pole.rotation.x = 0.35;
var lan = new THREE.Group();
lan.position.set(0.35, 3.0, L - 0.55);
g.add(lan);
wCyl(0.15, 0.15, 0.05, iron, 0, 0.2, 0, lan, 6);
wCyl(0.11, 0.15, 0.05, iron, 0, -0.18, 0, lan, 6);
for (var cb = 0; cb < 4; cb++) {
var ca = cb / 4 * 6.283;
udxBox(0.015, 0.38, 0.015, iron, Math.cos(ca) * 0.13, 0, Math.sin(ca) * 0.13, lan);
}
wSph(0.09, ssxGlowM(0xC8F0D8, 1), 0, 0, 0, lan, 8);
var gl = wGlow(0xA8E8C8, 2.6, 0.45);
lan.add(gl);
g.userData.lamp = lan;
var crook = udxBox(0.05, 0.05, 0.9, iron, 0, 2.55, -L - 0.45, g);
udxBox(0.05, 1.5, 0.05, iron, 0, 1.85, -L + 0.0, g);
var sl = new THREE.Group();
sl.position.set(0, 2.25, -L - 0.85);
g.add(sl);
udxBox(0.01, 0.3, 0.01, iron, 0, 0.2, 0, sl);
wCyl(0.08, 0.1, 0.22, iron, 0, 0, 0, sl, 6);
wSph(0.065, ssxGlowM(0xC8F0D8, 1), 0, -0.02, 0, sl, 8);
sl.add(wGlow(0xA8E8C8, 1.6, 0.35));
if (!ssxLite()) {
var pl = new THREE.PointLight(0xA8E0C8, 0.9, 22, 1.8);
pl.position.set(0.35, 3.0, L - 0.4);
g.add(pl);
}
var an = new THREE.Group();
an.position.set(B.beam * 0.38, 0.95, L * 0.62);
an.rotation.z = -0.2;
g.add(an);
udxBox(0.06, 0.9, 0.06, iron, 0, 0, 0, an);
var arm = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.035, 4, 10, Math.PI), iron);
arm.rotation.z = Math.PI;
arm.position.y = -0.2;
an.add(arm);
wCyl(0.08, 0.08, 0.06, iron, 0, 0.47, 0, an, 8).rotation.z = Math.PI / 2;
for (var ch = 0; ch < 6; ch++) {
var lk = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.014, 4, 6), rust);
lk.position.set(B.beam * 0.2 - ch * 0.03, 1.28 - ch * 0.03, L * 0.62 - 0.12 - ch * 0.09);
lk.rotation.y = ch % 2 ? Math.PI / 2 : 0;
g.add(lk);
}
var weedM = ssxM(0x1E2A18, null, { ds: 1 });
for (var w = 0; w < (ssxLite() ? 4 : 9); w++) {
var wz = -L * 0.7 + w * (B.len * 0.8 / 9), s2 = w % 2 ? 1 : -1, k2 = Math.abs(wz / L), ww = wz > 0 ? 1 - Math.pow(k2, 1.6) * 0.92 : 1 - Math.pow(k2, 2.4) * 0.55;
var wd = udxBox(0.02, 0.45 + ((w * 7) % 5) * 0.08, 0.12, weedM, s2 * B.beam * 0.5 * ww, 0.0, wz, g);
wd.rotation.z = s2 * 0.25;
}
var mz = B.k === "glider" ? 0.4 : 0.9, mh = B.k === "keel" ? 7.5 : 6.4;
wCyl(0.08, 0.11, mh, dark, 0, 1 + mh / 2, mz, g, 8);
wCyl(0.12, 0.12, 0.12, iron, 0, 1 + mh - 0.4, mz, g, 8);
var pen = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.28), ssxM(0x4A1410, null, { ds: 1 }));
pen.position.set(0, 1 + mh + 0.05, mz - 0.55);
pen.rotation.y = Math.PI / 2;
pen.rotation.x = 0.12;
g.add(pen);
var rp = [0, 1 + mh - 0.3, mz, 0, 2.4, L - 0.2, 0, 1 + mh - 0.3, mz, 0, 1.4, -L + 0.1, 0, 1 + mh - 0.3, mz, B.beam * 0.46, 1.35, mz - 0.4, 0, 1 + mh - 0.3, mz, -B.beam * 0.46, 1.35, mz - 0.4];
var rg = new THREE.BufferGeometry();
rg.setAttribute("position", new THREE.Float32BufferAttribute(rp, 3));
g.add(new THREE.LineSegments(rg, new THREE.LineBasicMaterial({ color: 0x2A2218 })));
{
var rig = new THREE.Group();
rig.position.set(0, 0, mz);
rig.rotation.y = 0.6;
g.add(rig);
var boom = wCyl(0.05, 0.05, B.len * 0.48, dark, 0, 2.05, -B.len * 0.24, rig, 6);
boom.rotation.x = Math.PI / 2;
var sg = new THREE.PlaneGeometry(B.len * 0.46, mh - 1.4, 6, 6), sp = sg.attributes.position;
for (var i = 0; i < sp.count; i++) {
var sx = sp.getX(i), sy = sp.getY(i), u = (sx / (B.len * 0.46) + 0.5), v = (sy / (mh - 1.4) + 0.5);
sp.setZ(i, Math.sin(u * Math.PI) * 0.35 * (1 - v * 0.5));
sp.setX(i, sx * (1 - v * 0.55));
}
sg.computeVertexNormals();
var sm = new THREE.MeshLambertMaterial({ color: B.sail, map: ssxSailTex(B.k === "keel" ? 71 : B.k === "glider" ? 73 : 79), side: THREE.DoubleSide, alphaTest: 0.5 });
sm.userData.noPhoto = 1;
sm.userData.noReal = 1;
var sail = new THREE.Mesh(sg, sm);
sail.rotation.y = Math.PI / 2;
sail.position.set(0, 2.05 + (mh - 1.4) / 2, -B.len * 0.23);
rig.add(sail);
g.userData.sail = sail;
}
if (B.k === "keel") {
var cab = udxBox(B.beam * 0.66, 1.3, 2.6, hullM, 0, 1.6, L * 0.38, g);
udxBox(B.beam * 0.74, 0.12, 2.9, dark, 0, 2.3, L * 0.38, g);
[-1, 1].forEach(function (s) { wBox(0.04, 0.32, 0.4, ssxGlowM(0x8AC8A8, 0.7), s * B.beam * 0.335, 1.75, L * 0.38, g); udxBox(0.05, 0.04, 0.46, iron, s * B.beam * 0.34, 1.75, L * 0.38, g); });
wCyl(0.08, 0.08, 0.7, iron, B.beam * 0.2, 2.7, L * 0.2, g, 6);
for (var f = 0; f < 4; f++)
wCyl(0.22, 0.22, 0.7, ssxM(0x1A1814), (f % 2 ? 1 : -1) * B.beam * 0.5, 0.9, -L * 0.3 + f * 1.4, g, 8);
}
if (B.k === "glider") {
[-1, 1].forEach(function (s) { udxBox(2.6, 0.08, 0.12, dark, s * 1.4, 1.15, 0.2, g); var out = wCyl(0.16, 0.16, 3.6, hullM, s * 2.65, 0.55, 0.2, g, 8); out.rotation.x = Math.PI / 2; });
}
if (B.k === "skiff") {
[-1, 1].forEach(function (s) { var oar = udxBox(0.07, 0.05, 3.4, trim, s * (B.beam * 0.5 + 0.1), 1.25, -0.4, g); oar.rotation.y = s * 0.12; oar.rotation.z = s * 0.35; });
}
g.traverse(function (o) { if (o.material && o.material.userData)
o.material.userData.noPhoto = 1; });
return g;
},
function (k, where, x, z, h) {
var B = ssxBoatSpec(k), R = ssxBoatRoot();
if (SSX.boat && SSX.kind !== k) {
R.remove(SSX.boat);
SSX.boat = null;
}
if (!SSX.boat) {
SSX.boat = ssxBoatMesh(B);
R.add(SSX.boat);
}
SSX.kind = k;
SSX.spec = B;
if (!SSX.hullMax || SSX.hullKind !== k) {
SSX.hullMax = B.hull;
SSX.hull = B.hull;
SSX.hullKind = k;
}
SSX.where = where;
SSX.bx = x;
SSX.bz = z;
SSX.h = h;
SSX.v = 0;
SSX.h0 = undefined;
SSX.aboard = true;
SSX.auto = null;
SSX.boat.visible = true;
ssxPlaceBoat(0);
yaw = SSX.h + Math.PI;
pitch = -0.12;
ssxHelm();
if (typeof flyY !== "undefined")
flyY = SSX_Y;
UDX.checkAt = 0;
},
function (silent, x, z, yw) {
if (!SSX.aboard)
return;
SSX.aboard = false;
SSX.auto = null;
SSX.v = 0;
SSX.h0 = undefined;
if (x !== undefined) {
var y = SSX.where === "near" ? udHeight(x, z) : ssxHeight(x, z);
if (y === null || y < -900)
y = SSX_Y + 1.2;
camera.position.set(UD.base + x, y + 1.72, z);
yaw = yw !== undefined ? yw : yaw;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = y;
}
UDX.checkAt = 0;
if (!silent)
ssxSay("<b>Ashore.</b> The boat is moored where you left her. Press E beside her to go aboard again.");
},
function (dt) {
var b = SSX.boat;
if (!b)
return;
var t = WLD.t || 0, c = 1 - ssxCalm();
b.position.set(SSX.bx, ssxBoatY(), SSX.bz);
b.rotation.set(Math.sin(t * 0.8) * 0.02 * c + SSX.tilt * 0.5, SSX.h, Math.sin(t * 0.6 + 1) * 0.035 * c + SSX.rock, "YXZ");
var u = b.userData;
if (u.needle)
u.needle.rotation.y = -SSX.h;
if (u.tiller)
u.tiller.rotation.y = (SSX.steer || 0) * 0.5;
if (u.sail)
u.sail.scale.x = 0.6 + Math.min(1, Math.abs(SSX.v) / (SSX.spec.top || 8)) * 0.4;
},
function (dt) {
var B = SSX.spec, f = 0, s = 0;
if (keys["KeyW"] || keys["ArrowUp"])
f = 1;
if (keys["KeyS"] || keys["ArrowDown"])
f = -1;
if (keys["KeyA"] || keys["ArrowLeft"])
s = -1;
if (keys["KeyD"] || keys["ArrowRight"])
s = 1;
var jv = (typeof joyInput === "function" && joyInput()) || (typeof padInput === "function" && padInput());
if (jv && !f && !s) {
f = jv.f;
s = jv.s;
}
if (SSX.auto && (Math.abs(f) > 0.3 || Math.abs(s) > 0.3)) {
SSX.auto = null;
ssxSay("Course cleared. You have the tiller.");
}
if (SSX.auto) {
var A = SSX.auto, dx = A.x - SSX.bx, dz = A.z - SSX.bz, d = Math.hypot(dx, dz), dh = ssxAng(Math.atan2(dx, dz) - SSX.h);
s = Math.max(-1, Math.min(1, dh * 2));
SSX.h += Math.max(-B.turn * dt, Math.min(B.turn * dt, dh));
var want = d < 120 ? Math.max(1.5, d / 12) : B.top * 0.85;
SSX.v += (want - SSX.v) * Math.min(1, dt * 0.6);
if (d < 18) {
SSX.auto = null;
SSX.v = 0;
ssxSay("<b>" + esc(A.name) + ".</b> " + (A.after || ""));
}
}
else {
SSX.v += f * B.acc * dt;
SSX.v *= 1 - dt * 0.12;
SSX.v = Math.max(-2.5, Math.min(B.top, SSX.v));
SSX.h -= s * dt * B.turn * Math.min(1, Math.abs(SSX.v) / 3 + 0.3);
}
SSX.steer = s;
if (SSX.where === "open")
ssxForces(dt);
if (SSX.h0 !== undefined)
yaw += SSX.h - SSX.h0;
SSX.h0 = SSX.h;
var nx = SSX.bx + Math.sin(SSX.h) * SSX.v * dt, nz = SSX.bz + Math.cos(SSX.h) * SSX.v * dt;
if (SSX.push) {
nx += SSX.push.x * dt;
nz += SSX.push.z * dt;
}
var bow = { x: nx + Math.sin(SSX.h) * B.len * 0.5, z: nz + Math.cos(SSX.h) * B.len * 0.5 };
if (SSX.where === "near") {
var N = SSX_NEAR;
if (bow.x > N.x1 - 3 && Math.abs(bow.z - N.gz) < N.archW / 2 - 2) {
ssxThroughGate(true, nx, nz);
return;
}
if (bow.x < N.x0 || bow.x > N.x1 - 3 || Math.abs(bow.z - N.gz) > N.zh) {
SSX.v = Math.min(SSX.v, 0) * 0.3;
if (!SSX.saidEdge) {
SSX.saidEdge = 1;
ssxSay(bow.x > N.x1 - 6 ? "<b>The Glimmergate wall.</b> Steer for the arch to sail out onto the open sea." : "<b>The shore.</b> Turn her back out into the water.");
}
}
else {
SSX.saidEdge = 0;
SSX.bx = nx;
SSX.bz = nz;
}
}
else {
if (nx < SSX_GATE.x + 2 && Math.abs(nz - SSX_GATE.z) < 16) {
ssxThroughGate(false, nx, nz);
return;
}
var land = ssxLandAt(bow.x, bow.z), hit = null;
for (var i = 0; i < SSX.solids.length; i++) {
var o = SSX.solids[i], dd = Math.hypot(bow.x - o.x, bow.z - o.z);
if (dd < o.r + B.beam * 0.6) {
hit = o;
break;
}
}
var B2 = SSX_BOX, edge = nx < B2.x0 + 90 || nx > B2.x1 - 90 || nz < B2.z0 + 90 || nz > B2.z1 - 90;
if (land > SSX_Y - 1.3 || hit || edge) {
var spd = Math.abs(SSX.v);
if (hit) {
var ax = SSX.bx - hit.x, az = SSX.bz - hit.z, al = Math.hypot(ax, az) || 1;
SSX.bx += ax / al * 1.2;
SSX.bz += az / al * 1.2;
}
if (spd > 5.5 && !SSX.bumpT) {
SSX.bumpT = 1.2;
ssxHurt(Math.round((spd - 5) * 3), hit ? "<b>Crunch!</b> You struck a pillar of stone." : land > SSX_Y - 1.3 ? "<b>Aground!</b> The keel grinds on the shoal." : "<b>The cavern wall.</b>");
}
SSX.v = -Math.min(1.5, spd * 0.3);
if (!SSX.saidEdge) {
SSX.saidEdge = 1;
if (edge && !hit)
ssxSay("<b>The cavern wall.</b> The Sunless Sea ends here in black, dripping rock. Turn back.");
else if (land > SSX_Y - 1.3 && spd <= 5.5)
ssxSay("<b>Shallows.</b> Too shallow to sail on: steer round, or look for the landing.");
}
}
else {
SSX.saidEdge = 0;
SSX.bx = nx;
SSX.bz = nz;
}
}
if (SSX.bumpT)
SSX.bumpT = Math.max(0, SSX.bumpT - dt);
SSX.rock *= Math.max(0, 1 - dt * 2);
SSX.tilt *= Math.max(0, 1 - dt * 1.5);
ssxPlaceBoat(dt);
ssxHelm();
},
function (out, nx, nz) {
var N = SSX_NEAR;
if (out) {
SSX.where = "open";
SSX.bx = SSX_GATE.x + 6;
SSX.bz = SSX_GATE.z + (nz - N.gz);
SSX.h = Math.PI / 2;
if (!SSX.area.built)
udxBuildArea(SSX.area);
if (!SSX.told.gate) {
SSX.told.gate = 1;
ssxSay("<b>Through the Glimmergate.</b> The arch opens on the Sunless Sea: water to the end of sight, a sky of glow-worms, and far off a cluster of warm lights: Lanternfall. Back opens the chart.");
}
else
ssxSay("<b>The open sea.</b> Back opens the chart.");
}
else {
SSX.where = "near";
SSX.bx = N.x1 - 10;
SSX.bz = N.gz + (nz - SSX_GATE.z);
SSX.h = -Math.PI / 2;
ssxSay("<b>Back through the Glimmergate.</b> Glimmerdeep's lamps are ahead, and Pell's jetty.");
}
SSX.h0 = undefined;
yaw = SSX.h + Math.PI;
SSX.auto = null;
ssxPlaceBoat(0);
ssxHelm();
UDX.checkAt = 0;
if (typeof udxCull === "function")
udxCull(true);
},
function (n, msg) {
if (n <= 0)
return;
if (ssxKeeper())
n = 0;
SSX.hull = Math.max(0, SSX.hull - n);
SSX.rock = (Math.random() < 0.5 ? -1 : 1) * 0.18;
ssxTone(90, 0.4);
if (SSX.hull <= 0) {
ssxFounder();
return;
}
ssxSay((msg || "<b>A knock on the hull.</b>") + " Hull " + Math.round(SSX.hull / SSX.hullMax * 100) + "%." + (SSX.hull < SSX.hullMax * 0.35 ? " <b>She is taking water: make for Lanternfall's shipwright.</b>" : ""));
},
function () {
var p = SSX_PL.lanternfall;
SSX.hull = Math.round(SSX.hullMax * 0.5);
SSX.where = "open";
SSX.auto = null;
SSX.v = 0;
SSX.carry = SSX.carry && SSX.carry.key === "rescue" ? null : SSX.carry;
SSX.bx = SSX_LF.berth.x;
SSX.bz = SSX_LF.berth.z;
SSX.h = SSX_LF.berth.h;
SSX.h0 = undefined;
yaw = SSX.h + Math.PI;
ssxPlaceBoat(0);
ssxHelm();
UDX.checkAt = 0;
ssxSay("<b>She founders!</b> Cold black water over the gunwales… and then a hand on your collar. Lanternfall's harbour boat tows you in, and Gorrel the shipwright patches her up enough to float (hull 50%). Nothing you carried is lost.");
},
function () {
var h = ssxHead("The chart of the Sunless Sea") + "<div style='opacity:.8'>Choose a place and the boat steers there by herself; touch the tiller to take her back.</div>", fns = {};
if (SSX.where === "near") {
h += worldBtn("gate", "⛩️ The Glimmergate", "The arch at the end of the near water, onto the open sea");
fns.gate = function () { SSX.auto = { x: SSX_NEAR.x1 + 20, z: SSX_NEAR.gz, name: "the Glimmergate", after: "" }; worldCard(null); };
h += worldBtn("pell", "🛶 Pell's jetty", "Back to Glimmerdeep");
fns.pell = function () { SSX.auto = { x: SSX_NEAR.jx + 14, z: SSX_NEAR.jz, name: "Pell's jetty", after: "Press E to step ashore." }; worldCard(null); };
worldCard(h, fns);
return;
}
Object.keys(SSX_PL).forEach(function (k) {
var p = SSX_PL[k], to = ssxApproach(k), d = Math.hypot(to.x - SSX.bx, to.z - SSX.bz), seen = SSX.seen[k];
h += worldBtn("go-" + k, p.icon + " " + esc(p.name) + (seen ? "" : " <span style='opacity:.6'>(not yet visited)</span>"), esc(p.card) + " · " + (d > 1000 ? (d / 1000).toFixed(1) + " km" : Math.round(d) + " m"));
fns["go-" + k] = function () { SSX.auto = { x: to.x, z: to.z, name: p.name, after: to.after || "" }; worldCard(null); ssxSay("<b>Course set</b> for " + esc(p.name) + ". Touch the tiller to take her yourself."); };
});
h += worldBtn("gate", "⛩️ The Glimmergate", "Home to Glimmerdeep and Pell's jetty");
fns.gate = function () { SSX.auto = { x: SSX_GATE.x + 30, z: SSX_GATE.z, name: "the Glimmergate", after: "Sail on through the arch." }; worldCard(null); };
h += worldBtn("hull", "🛠️ The boat", "Hull " + Math.round(SSX.hull / SSX.hullMax * 100) + "% · " + esc(SSX.spec.name) + (SSX.carry ? " · carrying: " + esc(SSX.carry.name) : ""));
fns.hull = function () { ssxBoatCard(); };
var n = Object.keys(SSX_PL).filter(function (k) { return SSX.seen[k]; }).length;
h += "<div style='margin-top:8px;opacity:.8;font-size:12px'>Your chart: " + n + " of " + Object.keys(SSX_PL).length + " places found.</div>";
worldCard(h, fns);
},
function () {
var B = SSX.spec, h = ssxHead(esc(B.name)) + ssxP(esc(B.sub)) +
worldFacts("", "", [["Hull", Math.round(SSX.hull) + " of " + SSX.hullMax], ["Top speed", Math.round(B.top * 1.94) + " knots"], ["Carrying", SSX.carry ? SSX.carry.name : "nothing"]], [
"W fills the sail and S shortens it; A and D steer (on a phone, the stick; on a Quest 2, the left stick).", "Back opens the chart; choose a place and she sails herself.", "At a landing, press E to step ashore. Lanternfall's shipwright and Pell at Glimmerdeep mend the hull for nothing."
]);
worldCard(h, {});
},
function () {
var hdg = (Math.atan2(Math.sin(SSX.h), -Math.cos(SSX.h)) * 180 / Math.PI + 360) % 360, kn = Math.round(Math.abs(SSX.v) * 1.94);
var here = SSX.where === "near" ? "the near water of Glimmerdeep" : ssxPlaceName(SSX.bx, SSX.bz);
var out = "<b>The Sunless Sea</b> · " + esc(here) + " · " + kn + " knots · heading " + Math.round(hdg) + "° " + SSX_POINTS[Math.round(hdg / 45) % 8] +
" · hull " + Math.round(SSX.hull / SSX.hullMax * 100) + "%" + (SSX.auto ? " · on course for " + esc(SSX.auto.name) : "") + (SSX.carry ? " · carrying " + esc(SSX.carry.name) : "") + (SSX.fog > 0.3 ? " · <span style='color:#B8C8D8'>fog</span>" : "");
if (SSX.where === "open") {
var best = null;
Object.keys(SSX_PL).forEach(function (k) { var p = SSX_PL[k], d = Math.hypot(p.x - SSX.bx, p.z - SSX.bz) - p.r; if (!best || d < best.d)
best = { p: p, d: d }; });
if (best && best.d > 0) {
var rel = ((Math.atan2(best.p.x - SSX.bx, best.p.z - SSX.bz) - SSX.h) * 180 / Math.PI + 540) % 360 - 180, a = Math.abs(rel), side = rel > 0 ? "left" : "right";
out += "<div>Nearest: " + esc(best.p.name) + ", " + (best.d > 1000 ? (best.d / 1000).toFixed(1) + " km" : Math.round(best.d) + " m") + " " + (a < 20 ? "dead ahead" : a < 70 ? "ahead to the " + side : a < 110 ? "off to the " + side : "behind you") + "</div>";
}
}
out += "<div style='opacity:.8'>W sail · S slow · A/D steer (or the stick) · Back: the chart</div>";
worldBanner(out);
},
function () {
var z0 = UD_GLIM.z;
SSX_NEAR = { x0: UD_SEA_X + 6, x1: UD_SEA_X + 560, gz: z0, zh: 250, archW: 36, jx: UD_SEA_X + 31, jz: z0,
pon: [{ x0: UD_SEA_X - 2, x1: UD_SEA_X + 28, z0: z0 - 1.6, z1: z0 + 1.6 }, { x0: UD_SEA_X + 27, x1: UD_SEA_X + 34, z0: z0 - 12, z1: z0 + 12 }] };
},
function (G) {
if (SSX.nearBuilt || typeof UD_SEA_X === "undefined")
return;
SSX.nearBuilt = true;
ssxNearSet();
var N = SSX_NEAR, z0 = N.gz, Y = UD_SEA_Y, root = new THREE.Group();
root.name = "ssx-near";
G.add(root);
SSX.nearG = root;
var wood = ssxM(0x4A3A2A, "wood"), dark = ssxM(0x2A2018, "wood"), stone = ssxM(0x3A3632, "stone"), brass = wM(0xC8A050);
udxBox(7, 0.3, 24, wood, UD_SEA_X + 30.5, Y + 1.05, z0, root);
for (var p = -11; p <= 11; p += 3.6) {
[-1, 1].forEach(function (s) { wCyl(0.18, 0.2, 4, dark, UD_SEA_X + 30.5 + s * 3.2, Y - 0.6, z0 + p, root, 6); });
}
for (var q = 0; q < 30; q += 4) {
[-1, 1].forEach(function (s) { wCyl(0.15, 0.17, 3.4, dark, UD_SEA_X + q, Y - 0.4, z0 + s * 1.5, root, 6); });
}
[-10, 10].forEach(function (zz) { var lp = wCyl(0.07, 0.08, 3.2, dark, UD_SEA_X + 33, Y + 2.7, z0 + zz, root, 6); var lb = wSph(0.22, ssxGlowM(0xFFD890, 1), UD_SEA_X + 33, Y + 4.4, z0 + zz, root, 8); ssxGlow(root, 0xFFD890, 4, 0.55, UD_SEA_X + 33, Y + 4.4, z0 + zz); });
SSX.nearBoats = [];
SSX_BOATS.forEach(function (B, i) { var m = ssxBoatMesh(B); m.position.set(UD_SEA_X + 38 + B.beam / 2, Y + 0.05, z0 - 8 + i * 8); m.rotation.y = 0; root.add(m); m.userData.keep = 1; SSX.nearBoats.push(m); });
var sx = UD_SEA_X - 26, sz = z0 - 34, sh = new THREE.Group();
sh.position.set(sx, udHeight(sx, sz), sz);
root.add(sh);
udxBox(18, 5, 0.3, wood, 0, 2.5, -6, sh);
udxBox(0.3, 5, 12, wood, -9, 2.5, 0, sh);
udxBox(18, 5, 0.3, wood, 0, 2.5, 6, sh);
[-1, 1].forEach(function (s) { var r = udxBox(19, 0.25, 7.2, dark, 0, 6.3, s * 3.2, sh); r.rotation.x = s * 0.42; });
udxBox(0.3, 1.6, 12, wood, 9, 4.2, 0, sh);
for (var b = 0; b < 3; b++) {
var hm = new THREE.Mesh(ssxHullGeo(6, 1.8, 1), ssxM(0x6A4A30, "wood"));
hm.rotation.z = Math.PI;
hm.position.set(-4 + b * 4, 3.8, 0);
hm.rotation.y = Math.PI / 2;
sh.add(hm);
}
udxF({ g: sh, solids: [] }, "workbench", -5, 0, -4.3, 0, { parent: sh, solid: false });
udxF({ g: sh, solids: [] }, "trnets", 4, 0, -4.6, 0, { parent: sh, solid: false });
udxF({ g: sh, solids: [] }, "troars", -7.6, 0, 2, Math.PI / 2, { parent: sh, solid: false });
ssxGlow(sh, 0xFFC880, 5, 0.55, 0, 4, 0);
UD.solids.push({ x: sx, z: sz - 6, hw: 9, hd: 0.3 }, { x: sx - 9, z: sz, hw: 0.3, hd: 6 }, { x: sx, z: sz + 6, hw: 9, hd: 0.3 });
var sg = wSign(["Pell's Boat Shed", "Boats lent by the Ferry Guild", "to sail the Sunless Sea"], 4.2, 1.5, "#1E2A2A", "#D8F0E8");
sg.position.set(sx + 9.3, udHeight(sx, sz) + 4.3, sz);
sg.rotation.y = Math.PI / 2;
root.add(sg);
var sg2 = wSign(["The Sunless Sea", "Boats at the end of the jetty", "Ask Pell Stonewhistle"], 3.6, 1.3, "#1E2A2A", "#D8F0E8");
sg2.position.set(UD_SEA_X - 3, udHeight(UD_SEA_X - 3, z0 + 3.5) + 2.2, z0 + 3.5);
sg2.rotation.y = -Math.PI / 2;
root.add(sg2);
var gx = N.x1, aw = N.archW, ah = 24, H = 96, rk = ssxM(0x2E2A28, "stone");
[-1, 1].forEach(function (s) { var len = N.zh + 20 - aw / 2; udxBox(16, H, len, rk, gx + 8, Y + H / 2 - 6, z0 + s * (aw / 2 + len / 2), root); });
udxBox(16, H - ah, aw + 2, rk, gx + 8, Y + ah + (H - ah) / 2 - 6, z0, root);
for (var k = 0; k < 9; k++) {
var a = k / 8 * Math.PI, vb = udxBox(16.4, 2.2, 3.4, ssxM(0x4A4440, "stone"), gx + 8, Y + ah - 2 + Math.sin(a) * 3, z0 - aw / 2 + aw * k / 8, root);
vb.rotation.x = (a - Math.PI / 2) * 0.5;
}
[-1, 1].forEach(function (s) { var x2 = gx - 1, z2 = z0 + s * (aw / 2 + 2.5); wCyl(0.25, 0.3, 8, stone, x2, Y + 4, z2, root, 8); wSph(0.55, ssxGlowM(0x9AF0FF, 1), x2, Y + 8.4, z2, root, 10); ssxGlow(root, 0x9AF0FF, 7, 0.6, x2, Y + 8.4, z2); });
var gs = wSign(["The Glimmergate", "Beyond: the Sunless Sea", "Lanternfall · Ysmere · Lampwick Rock"], 8, 2.6, "#14202A", "#BFF0F0");
gs.position.set(gx - 0.4, Y + ah + 4.5, z0);
gs.rotation.y = -Math.PI / 2;
root.add(gs);
ppBake(root);
var T = UD.talkers.filter(function (t) { return t.name === "Pell Stonewhistle, the ferry-keeper"; })[0];
if (T) {
T.verb = "hire a boat, or talk";
if (T.t) {
T.t.persona = T.t.persona.replace(/You can tell the visitor the ferry is being refitted[^.]*\./, "") + " The Ferry Guild's refit is done at last: you lend boats from your boat shed (the Glimmer skiff, the Steady Bimble and a dark elf's Shadeglider) to anyone who asks, free, and tell them the way: through the Glimmergate, the arch at the end of the near water, to Lanternfall, the floating port, and on to the Drowned City, Lampwick Rock and Puffhollow. You warn them about the Gullet, the gloam eels and the Gloamwyrm's Trench.";
T.t.greet = "Boats? The refit's done, and they're ready at the end of the jetty. Take your pick.";
}
var talk = T.t;
T.fn = function () { ssxPellCard(talk); };
}
UD.talkers.push({ x: N.jx + 2, z: N.jz, r: 5, name: "The boats at the end of the jetty", verb: "choose a boat", fn: function () { ssxPellCard(T && T.t); } });
},
function (talk) {
var h = ssxHead("Pell Stonewhistle's boat shed") + ssxP("Three boats of the Ferry Guild lie at the end of the jetty, lent free to anyone who will bring them back. Choose one and step aboard."), fns = {};
SSX_BOATS.forEach(function (B) {
h += worldBtn("b-" + B.k, "⛵ " + esc(B.name), esc(B.sub) + " · " + Math.round(B.top * 1.94) + " knots · hull " + B.hull);
fns["b-" + B.k] = function () {
worldCard(null);
ssxTakeBoat(B.k, "near", SSX_NEAR.jx + 6.5, SSX_NEAR.jz, Math.PI / 2);
SSX.hull = SSX.hullMax;
ssxSay("<b>Aboard the " + esc(B.name) + ".</b> Pell casts off your line. W fills the sail, A and D steer; steer for the great arch at the end of the water, the Glimmergate. Back opens the chart.");
};
});
if (SSX.boat && SSX.hull < SSX.hullMax) {
h += worldBtn("mend", "🛠️ Mend the hull", "Pell patches her up for nothing");
fns.mend = function () { SSX.hull = SSX.hullMax; worldCard(null); ssxSay("<b>Pell patches the hull.</b> Good as new."); };
}
h += ssxTaskBtn("post", fns);
h += worldBtn("map", "🗺️ What's out there?", "Pell's sketch of the sea");
fns.map = function () { ssxSeaFacts(); };
if (talk) {
h += worldBtn("talk", "💬 Talk with Pell", "");
fns.talk = function () { worldCard(null); wTalk(talk); };
}
worldCard(h, fns);
},
function () {
worldCard(worldFacts("The Sunless Sea", "Pell's sketch of it, on the back of a tide table", [], Object.keys(SSX_PL).map(function (k) { var p = SSX_PL[k]; return p.name + ": " + p.card + "."; }).concat([
"Through the Glimmergate, Lanternfall is straight ahead, a little to the right: follow the lights.", "Keep off the Gullet, and give the Gloamwyrm's Trench a wide berth unless your hull is sound.", "Gloam eels go for slow boats. Keep moving, or fend them off with the boat-hook."
])));
},
function (A, G, seed, o, x, z, ry, talk, wander) {
if (SSX.lite && !talk && (seed.length % 2))
return null;
var y = ssxHeight(x, z);
if (y === null)
y = SSX_Y + 1.3;
var g = wPerson(seed, o);
g.position.set(x, y + (o.y || 0), z);
g.rotation.y = ry || 0;
G.add(g);
if (o.cap) {
var cap = wSph(0.42, ssxM(o.cap, null), 0, 1.0, 0, null, 12);
cap.scale.set(1.25, 0.55, 1.25);
g.add(cap);
cap.position.y = (o.scale ? 1.8 : 1.8);
var gl = wCyl(0.5, 0.5, 0.03, ssxGlowM(0xC8F0A0, 0.8), 0, 1.66, 0, g, 14);
}
var P = { g: g, wander: wander || null };
UD.people.push(P);
SSX.people.push(P);
if (talk) {
var T = { p: P, r: o.scale && o.scale < 0.8 ? 3.2 : 3.6, name: talk.name, t: talk };
if (talk.fn) {
T.fn = talk.fn;
T.verb = talk.verb;
}
udxTalk(A, T);
}
return P;
},
function (A, G, x, z, title, rows, ry) {
var y = ssxHeight(x, z);
if (y === null)
y = SSX_Y + 1.2;
var st = new THREE.Group();
st.position.set(x, y, z);
st.rotation.y = ry || 0;
G.add(st);
udxBox(1.6, 1.3, 0.3, ssxM(0x4A4844, "stone"), 0, 0.65, 0, st);
var sg = wSign([title, "Press E to read"], 1.5, 0.6, "#14202A", "#C8E8E0");
sg.position.set(0, 1.45, 0.16);
st.add(sg);
st.userData.keep = 1;
udxTalk(A, { x: x, z: z, r: 3, name: title, verb: "read the stone", fn: function () { worldCard(worldFacts(title, "A fact stone", [], rows)); SSX.seen["fact_" + title] = 1; ssxSave(); } });
},
function (A, G, o) {
var len = o.len || 14, dx = Math.sin(o.h), dz = Math.cos(o.h), y = o.y || SSX_Y + 1.25, wood = ssxM(0x4A3A2A, "wood"), dark = ssxM(0x2A2018, "wood");
var mx = o.x + dx * len / 2, mz = o.z + dz * len / 2, j = udxBox(2.6, 0.3, len, wood, mx, y - 0.15, mz, G);
j.rotation.y = o.h;
for (var i = 0; i <= len; i += 3.5) {
[-1, 1].forEach(function (s) { wCyl(0.14, 0.16, 3, dark, o.x + dx * i + dz * s * 1.2, y - 1.6, o.z + dz * i - dx * s * 1.2, G, 6); });
}
var ex = o.x + dx * (len - 0.6), ez = o.z + dz * (len - 0.6);
wCyl(0.06, 0.07, 2.6, dark, ex, y + 1.3, ez, G, 6);
wSph(0.2, ssxGlowM(0xFFD890, 1), ex, y + 2.7, ez, G, 8);
ssxGlow(G, 0xFFD890, 3.6, 0.55, ex, y + 2.7, ez);
for (var d = 0; d <= len; d += 1.2)
ssxDeck({ x: o.x + dx * d, z: o.z + dz * d, r: 1.35, y: y });
var L = { key: o.key, name: o.name, x: o.x, z: o.z, h: o.h, end: { x: o.x + dx * (len + 4), z: o.z + dz * (len + 4) }, stand: o.stand || { x: o.x + dx * (len - 1.5), z: o.z + dz * (len - 1.5) }, y: y };
SSX_LANDINGS.push(L);
if (o.place)
SSX_APPROACH[o.place] = { x: o.x + dx * (len + 10), z: o.z + dz * (len + 10), after: "Press E to step ashore at " + o.name + "." };
return L;
},
function (A) {
var G = A.g, lite = SSX.lite = ssxLite(), B = SSX_BOX, R = wRand(90210);
var wt = wWater(lite ? 1600 : 2200, lite ? 44 : 88, 0x0A2036, 0.32, { shine: 120, spec: 0x7AAAD8 });
wt.material.emissive = new THREE.Color(0x041424);
wt.position.y = SSX_Y;
wt.userData.keep = 1;
G.add(wt);
SSX.water = wt;
var soft = typeof softGlow === "function" ? softGlow() : null;
function field(n, sz, y0, y1, col, size) { var p = wPoints(n, function () { return [(Math.random() - 0.5) * sz, y0 + Math.random() * (y1 - y0), (Math.random() - 0.5) * sz]; }, col, size, true); if (soft) {
p.material.map = soft;
p.material.alphaTest = 0.02;
} p.material.blending = THREE.AdditiveBlending; p.userData.keep = 1; p.userData.tile = sz; G.add(p); return p; }
SSX.plank = field(lite ? 700 : 1800, 700, SSX_Y + 0.2, SSX_Y + 0.5, 0x5AE8FF, 1.1);
SSX.worms = field(lite ? 1200 : 3000, 2400, SSX_Y + 148, SSX_Y + 150, 0x8AF0D0, 2.4);
SSX.worms2 = field(lite ? 300 : 800, 2400, SSX_Y + 146, SSX_Y + 150, 0xB8E8FF, 3.2);
var roof = new THREE.Mesh(new THREE.PlaneGeometry(B.x1 - B.x0 + 400, B.z1 - B.z0 + 400), new THREE.MeshLambertMaterial({ color: 0x0C0A0C, side: THREE.DoubleSide }));
roof.rotation.x = Math.PI / 2;
roof.position.set((B.x0 + B.x1) / 2, SSX_Y + 152, (B.z0 + B.z1) / 2);
G.add(roof);
roof.userData.keep = 1;
var cliff = ssxM(0x24201E, "stone");
[[B.x0 - 20, (B.z0 + B.z1) / 2, 40, B.z1 - B.z0 + 80], [B.x1 + 20, (B.z0 + B.z1) / 2, 40, B.z1 - B.z0 + 80], [(B.x0 + B.x1) / 2, B.z0 - 20, B.x1 - B.x0 + 80, 40], [(B.x0 + B.x1) / 2, B.z1 + 20, B.x1 - B.x0 + 80, 40]].forEach(function (w, i) {
if (i === 0) {
var aw = 36, top = w[1] - w[3] / 2, a0 = SSX_GATE.z - aw / 2, a1 = SSX_GATE.z + aw / 2;
udxBox(w[2], 170, a0 - top, cliff, SSX_GATE.x - 22, SSX_Y + 75, (top + a0) / 2, G);
udxBox(w[2], 170, w[1] + w[3] / 2 - a1, cliff, SSX_GATE.x - 22, SSX_Y + 75, (a1 + w[1] + w[3] / 2) / 2, G);
udxBox(w[2], 146, aw + 2, cliff, SSX_GATE.x - 22, SSX_Y + 24 + 73, SSX_GATE.z, G);
return;
}
udxBox(w[2], 170, w[3], cliff, w[0], SSX_Y + 75, w[1], G);
});
[-1, 1].forEach(function (s) { var z2 = SSX_GATE.z + s * 20.5, x2 = SSX_GATE.x + 2; wCyl(0.25, 0.3, 8, ssxM(0x3A3632, "stone"), x2, SSX_Y + 4, z2, G, 8); wSph(0.55, ssxGlowM(0x9AF0FF, 1), x2, SSX_Y + 8.4, z2, G, 10); ssxGlow(G, 0x9AF0FF, 7, 0.6, x2, SSX_Y + 8.4, z2); });
ssxSignAt(G, ["The Glimmergate", "Back to Glimmerdeep"], SSX_GATE.x + 1, SSX_Y + 28, SSX_GATE.z, Math.PI / 2, 7, 2.2);
ssxPillars(G, R, lite);
SSX_ISLES.forEach(function (r) {
var I = SSX_ISLE[r[0]], s = I.r * 2.6, n = lite ? 28 : Math.min(64, Math.round(I.r / 2.5) + 16);
var gmat = new THREE.MeshLambertMaterial({ vertexColors: true });
if (typeof wGroundDetailTex === "function") {
try {
var dt = wGroundDetailTex().clone();
dt.wrapS = dt.wrapT = THREE.RepeatWrapping;
dt.repeat.set(s / 14, s / 14);
dt.needsUpdate = true;
gmat.map = dt;
}
catch (e) { }
}
var gm = wGround(s, n, function (x, z) { var h = ssxIsleRaw(I, I.x + x, I.z + z); if (h === null)
h = SSX_Y - 20; var up = h - SSX_Y; return [h, up < 0.6 ? 0xA89A80 : up < 2.5 ? I.col : I.rock]; }, gmat);
gm.position.set(I.x, 0, I.z);
gm.userData.keep = 1;
G.add(gm);
});
[ssxLanternfall, ssxCoral, ssxYsmere, ssxBoneyard, ssxLampwick, ssxPuffhollow, ssxMirror, ssxGullet, ssxNarrows, ssxTrench, ssxThreads].forEach(function (fn) {
try {
fn(A, G, R, lite);
}
catch (e) {
if (window.console)
console.warn("[sunless-sea] build", fn.name, e);
}
});
try {
ssxDoorsBuild(A, G);
}
catch (e) {
if (window.console)
console.warn("[sunless-sea] doors", e);
}
try {
ssxLifeBuild(A, G, lite);
}
catch (e) {
if (window.console)
console.warn("[sunless-sea] life", e);
}
if (typeof ssxWrapNpcs === "function")
ssxWrapNpcs(A);
ppBake(G, 320);
},
function (G, R, lite) {
var spots = [], keepOut = Object.keys(SSX_PL).filter(function (k) { return k !== "narrows" && k !== "mirrorstill"; }).map(function (k) { var p = SSX_PL[k]; return { x: p.x, z: p.z, r: p.r + 70 }; });
keepOut.push({ x: SSX_GATE.x + 250, z: SSX_GATE.z, r: 300 }, { x: SSX_PL.mirrorstill.x, z: SSX_PL.mirrorstill.z, r: SSX_PL.mirrorstill.r - 40 });
function free(x, z, r) {
if (!ssxInBox(x, z))
return false;
for (var i = 0; i < keepOut.length; i++) {
var k = keepOut[i];
if (Math.hypot(x - k.x, z - k.z) < k.r + r)
return false;
}
for (var j = 0; j < spots.length; j++) {
if (Math.hypot(x - spots[j].x, z - spots[j].z) < spots[j].r + r + (SSX.inNarrows ? 14 : 60))
return false;
}
return true;
}
var N = SSX_PL.narrows;
SSX.inNarrows = true;
for (var a = 0; a < (lite ? 260 : 420) && spots.length < (lite ? 55 : 85); a++) {
var ang = R() * 6.283, d = Math.sqrt(R()) * N.r, x = N.x + Math.cos(ang) * d, z = N.z + Math.sin(ang) * d, r = 5 + R() * 9;
if (SSX_RACE.some(function (g) { return Math.hypot(x - g[0], z - g[1]) < r + 30; }))
continue;
if (free(x, z, r))
spots.push({ x: x, z: z, r: r });
}
SSX.inNarrows = false;
for (var b = 0; b < (lite ? 140 : 240) && spots.length < (lite ? 80 : 125); b++) {
var x2 = SSX_BOX.x0 + 200 + R() * (SSX_BOX.x1 - SSX_BOX.x0 - 400), z2 = SSX_BOX.z0 + 200 + R() * (SSX_BOX.z1 - SSX_BOX.z0 - 400), r2 = 8 + R() * 16;
if (free(x2, z2, r2))
spots.push({ x: x2, z: z2, r: r2 });
}
var geo = new THREE.CylinderGeometry(1, 1, 1, 12, 8), p = geo.attributes.position;
for (var i = 0; i < p.count; i++) {
var y = p.getY(i), u = y + 0.5, w = 0.55 + 0.45 * Math.pow(Math.abs(u - 0.45) * 1.8, 2.2), ang2 = Math.atan2(p.getZ(i), p.getX(i)), fl = 1 + Math.sin(ang2 * 6) * 0.05 + Math.sin(u * 17) * 0.03;
p.setX(i, p.getX(i) * w * fl);
p.setZ(i, p.getZ(i) * w * fl);
}
geo.computeVertexNormals();
if (typeof metreUVs === "function")
try {
metreUVs(geo, "cyl", [1, 1, 8]);
}
catch (e) { }
var mat = ssxM(0x5A524A, "stone"), im = new THREE.InstancedMesh(geo, mat, spots.length), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), ps = new THREE.Vector3(), H = 158;
spots.forEach(function (s, k) { q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), R() * 6.28); sc.set(s.r, H, s.r); ps.set(s.x, SSX_Y + H / 2 - 6, s.z); m4.compose(ps, q, sc); im.setMatrixAt(k, m4); ssxRock(s.x, s.z, s.r * 0.95); });
im.instanceMatrix.needsUpdate = true;
im.userData.keep = 1;
G.add(im);
SSX.pillars = spots;
if (!lite) {
var cg = new THREE.ConeGeometry(1, 1, 7), n = 160, ci = new THREE.InstancedMesh(cg, mat, n);
for (var c = 0; c < n; c++) {
var cx = SSX_BOX.x0 + R() * (SSX_BOX.x1 - SSX_BOX.x0), cz = SSX_BOX.z0 + R() * (SSX_BOX.z1 - SSX_BOX.z0), cl = 8 + R() * 30, cr = 1.5 + R() * 4;
q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
sc.set(cr, cl, cr);
ps.set(cx, SSX_Y + 152 - cl / 2, cz);
m4.compose(ps, q, sc);
ci.setMatrixAt(c, m4);
}
ci.instanceMatrix.needsUpdate = true;
ci.userData.keep = 1;
G.add(ci);
}
},
function (A, G, R, lite) {
var P = SSX_PL.lanternfall, cx = P.x, cz = P.z, Y = SSX_Y + 1.4, wood = ssxM(0x4A3A2A, "wood"), plank = ssxM(0x5A4632, "wood"), dark = ssxM(0x2A2018, "wood"), tar = ssxM(0x1E1A16, "wood"), brass = wM(0xC8A050);
function deck(x0, x1, z0, z1, y) {
udxBox(x1 - x0, 0.35, z1 - z0, plank, (x0 + x1) / 2, (y || Y) - 0.17, (z0 + z1) / 2, G);
ssxDeck({ x0: x0, x1: x1, z0: z0, z1: z1, y: y || Y });
for (var x = x0 + 1; x < x1; x += 6)
for (var z = z0 + 1; z < z1; z += 6)
if (x < x0 + 2 || x > x1 - 2.5 || z < z0 + 2 || z > z1 - 2.5)
wCyl(0.22, 0.25, 4.5, dark, x, (y || Y) - 2.4, z, G, 6);
}
deck(cx - 90, cx + 90, cz - 40, cz + 10);
deck(cx - 110, cx - 90, cz - 120, cz + 40);
deck(cx + 90, cx + 110, cz - 120, cz + 40);
deck(cx - 90, cx + 90, cz + 10, cz + 60);
SSX_LF.quay = { x: cx, z: cz - 34 };
SSX_LF.berth = { x: cx, z: cz - 58, h: 0 };
SSX_APPROACH.lanternfall = { x: cx, z: cz - 70, after: "Press E to moor at Lantern Quay and go ashore." };
for (var b = -80; b <= 80; b += 16) {
wCyl(0.25, 0.3, 0.7, tar, cx + b, Y + 0.35, cz - 39, G, 8);
}
for (var mb = 0; mb < (lite ? 4 : 8); mb++) {
var spec = SSX_BOATS[mb % 3], bm = ssxBoatMesh(spec);
var bx = cx - 75 + mb * 20;
if (Math.abs(bx - cx) < 14)
bx += 26;
bm.position.set(bx, SSX_Y + 0.05, cz - 46);
bm.rotation.y = mb % 2 ? 0.08 : -0.06;
G.add(bm);
bm.userData.keep = 1;
SSX.anim.push({ bob: bm, ph: mb });
ssxRock(bx, cz - 46, 3.5);
}
for (var h = 0; h < (lite ? 8 : 14); h++) {
var a = Math.PI * (1.15 + h / 13 * 0.7) + (h % 2 ? 0.05 : 0), rr = 150 + (h % 3) * 12, hx = cx + Math.cos(a) * rr * 1.1, hz = cz + Math.sin(a) * rr * 0.75 + 40;
if (hz > cz - 60 && Math.abs(hx - cx) < 120)
continue;
var hk = new THREE.Group(), len = 22 + (h % 4) * 5;
hk.position.set(hx, SSX_Y - 0.6, hz);
hk.rotation.y = a + Math.PI / 2 + (h % 2 ? 0.15 : -0.1);
hk.rotation.z = (h % 3 - 1) * 0.05;
G.add(hk);
var hm = new THREE.Mesh(ssxHullGeo(len, 7, 4), ssxM([0x3A2E24, 0x2E2A26, 0x4A3A2A][h % 3], "wood"));
hm.position.y = 1.5;
hk.add(hm);
udxBox(5, 3.4, len * 0.45, ssxM(0x5A4A3A, "wood"), 0, 5, 0, hk);
var rf = udxBox(6, 0.3, len * 0.5, tar, 0, 6.9, 0, hk);
rf.rotation.z = 0.06;
for (var wdw = 0; wdw < 3; wdw++) {
[-1, 1].forEach(function (s) { wBox(0.06, 0.7, 0.9, ssxGlowM([0xFFD890, 0xFFC070, 0xFFE8B0][(h + wdw) % 3], 0.95), s * 2.53, 5.2, -len * 0.15 + wdw * len * 0.15, hk); });
}
wCyl(0.12, 0.16, 9, dark, 0, 9, len * 0.3, hk, 6);
ssxRock(hx, hz, len * 0.42);
}
var by = Y;
function house(x, z, w, d, hh, col, roofCol, name, lit) {
var g = new THREE.Group();
g.position.set(x, by, z);
G.add(g);
udxBox(w, hh, d, ssxM(col, "wood"), 0, hh / 2, 0, g);
[-1, 1].forEach(function (s) { var r = udxBox(w + 0.6, 0.25, d / 2 + 0.8, ssxM(roofCol, "wood"), 0, hh + d * 0.18, s * d * 0.25, g); r.rotation.x = s * 0.62; });
udxBox(w + 0.2, 0.2, 0.2, dark, 0, hh, -d / 2, g);
udxBox(1.4, 2.4, 0.1, tar, 0, 1.2, -d / 2 - 0.04, g);
for (var i = 0; i < Math.floor(w / 3); i++) {
var wx = -w / 2 + 1.6 + i * 3;
if (Math.abs(wx) < 1.4)
continue;
wBox(0.9, 0.9, 0.05, ssxGlowM(lit || 0xFFD890, 0.92), wx, hh * 0.62, -d / 2 - 0.03, g);
}
if (name) {
var s = wSign([name], Math.min(w - 1, 5), 0.8, "#1A1410", "#F0DCA8");
s.position.set(0, hh + 0.2, -d / 2 - 0.2);
g.add(s);
}
A.solids.push({ x: x, z: z, hw: w / 2, hd: d / 2 });
return g;
}
var ll = new THREE.Group();
ll.position.set(cx - 30, by, cz + 30);
G.add(ll);
udxBox(28, 5.5, 16, ssxM(0x5A4632, "wood"), 0, 2.75, 0, ll);
var lr = new THREE.Mesh(ssxHullGeo(32, 18, 5), ssxM(0x3A2E24, "wood"));
lr.rotation.z = Math.PI;
lr.rotation.y = Math.PI / 2;
lr.position.y = 7.6;
ll.add(lr);
for (var lw = 0; lw < 6; lw++) {
var lx = -11 + lw * 4.4;
if (Math.abs(lx) < 2)
continue;
wBox(1.4, 1.4, 0.05, ssxGlowM(0xFFC878, 0.95), lx, 3, -8.03, ll);
}
udxBox(2, 3, 0.12, tar, 0, 1.5, -8.05, ll);
var lls = wSign(["The Lamp & Lantern", "Chowder · Cider · Rooms"], 7, 1.6, "#2A1A10", "#FFD890");
lls.position.set(0, 6.3, -8.4);
ll.add(lls);
[-1.6, 1.6].forEach(function (s) { var hl = wSph(0.26, ssxGlowM(0xFFD890, 1), s, 3.1, -8.5, ll, 8); ssxGlow(ll, 0xFFD890, 3, 0.6, s, 3.1, -8.5); });
A.solids.push({ x: cx - 30, z: cz + 30, hw: 14, hd: 8 });
SSX_LF.inn = { x: cx - 30, z: cz + 21.2 };
house(cx + 16, cz + 28, 14, 12, 5, 0x4A5A6A, 0x2A2A30, "Harbour Office", 0xFFE0A8);
SSX_LF.office = { x: cx + 16, z: cz + 21.5 };
house(cx + 42, cz + 30, 12, 10, 4.5, 0x5A4A3A, 0x3A2A22, "Knotwise's Chandlery");
house(cx + 66, cz + 32, 10, 9, 4.2, 0x4A4A3A, 0x2A2A22, null, 0xFFC070);
house(cx - 62, cz + 32, 10, 9, 4.6, 0x3A4A4A, 0x22302A, null, 0xFFE0A0);
house(cx - 82, cz + 34, 8, 8, 4.4, 0x5A3A3A, 0x2A1A1A, null);
house(cx + 82, cz + 30, 8, 8, 4, 0x3A3A5A, 0x1A1A2A, null);
for (var sh2 = 0; sh2 < (lite ? 4 : 8); sh2++) {
var side = sh2 % 2 ? 1 : -1, sz = cz - 100 + Math.floor(sh2 / 2) * 30;
house(cx + side * 100, sz, 9, 8, 4.2, [0x4A3A2A, 0x3A4A3A, 0x4A4A5A, 0x5A4A3A][sh2 % 4], 0x2A2018, null);
}
var fc = hxCounter(G, "underdark", cx + 42, cz + 18, Math.PI, 0x2A5A6A, [0xC8A050, 0xD8C8A0, 0x8A6A42]);
fc.position.y = by;
var fs = hxCounter(G, "underdark", cx - 62, cz - 2, 0, 0x3A6A8A, [0x8AB0C8, 0xA8C8D8, 0x6A8AA8]);
fs.position.y = by;
var sl = udxBox(10, 0.4, 26, ssxM(0x3A3026, "wood"), cx - 78, Y - 1.4, cz - 14, G);
sl.rotation.x = 0.12;
var sb = new THREE.Mesh(ssxHullGeo(12, 3.6, 2), ssxM(0x6A5A44, "wood"));
sb.position.set(cx - 78, Y + 0.4, cz - 12);
sb.rotation.x = 0.1;
G.add(sb);
udxF(A, "workbench", cx - 70, Y, cz - 4, Math.PI / 2, { solid: false });
udxF(A, "barrel", cx - 70, Y, cz + 2, 0);
udxF(A, "crates", cx - 86, Y, cz + 3, 0);
for (var lp = -80; lp <= 80; lp += 20) {
wCyl(0.08, 0.1, 4.2, dark, cx + lp, Y + 2.1, cz - 36, G, 6);
wSph(0.24, ssxGlowM(0xFFD890, 1), cx + lp, Y + 4.4, cz - 36, G, 8);
ssxGlow(G, 0xFFD890, 3.6, 0.5, cx + lp, Y + 4.4, cz - 36);
}
var cols = [0xFFD890, 0xFFB070, 0x9AF0E0, 0xF0A0C8], pts = [];
for (var s2 = 0; s2 < 5; s2++) {
var z1 = cz - 30 + s2 * 14;
for (var u = 0; u <= 40; u++) {
var t = u / 40;
pts.push([cx - 88 + t * 176, Y + 6.2 - Math.sin(t * Math.PI) * 1.6, z1]);
}
}
var lg = wPoints(pts.length, function (i) { return pts[i]; }, 0xFFD8A0, 0.55, true);
if (typeof softGlow === "function") {
lg.material.map = softGlow();
}
lg.material.blending = THREE.AdditiveBlending;
lg.userData.keep = 1;
G.add(lg);
[["crates", -50, -30], ["barrel", -46, -31], ["trnets", -20, -6], ["cask", 20, -30], ["trcrates", 56, -6], ["barrel", 58, -8], ["trfishtable", -56, -6], ["trwinch", -84, -30], ["trnets", 86, -60], ["crates", 96, -90]].forEach(function (f, i) { udxF(A, f[0], cx + f[1], Y, cz + f[2], i % 2 ? 0 : Math.PI / 2, { decor: i > 5 ? 1 : 0 }); });
ssxSignAt(G, ["Lanternfall", "Lantern Quay · the Lamp & Lantern", "Harbour Office · Chandlery · Slip"], cx - 6, Y + 2.2, cz - 38, Math.PI, 4.6, 1.6);
var LK = SSX_LOOK;
ssxWho(A, G, "ss_odile", { sex: "f", look: { top: 0x2A4A6A, topKind: "shirt", bottom: 0x1E2A3A, hair: 0x8A5A3A, hairStyle: "long", hat: "none", layer: "longcoat", layerColor: 0x1E2A3A, shoes: 0x2A1E14 } }, cx + 16, cz + 16, Math.PI, ssxPersona("Odile Brackwater", "the harbourmistress of Lanternfall: brisk, kind under the briskness, with a ledger always under her arm. You keep the harbour book, give out work and errands, and know every boat on the sea by its creak.", "Welcome to Lanternfall. Mind the gap between the hulks, and sign in at the office if you want work."));
ssxWho(A, G, "ss_fennick", { sex: "m", look: LK.gnome(0x3A5A6A, 1), scale: 0.62 }, cx + 42, cz + 15.5, Math.PI, ssxPersona("Fennick Knotwise", "a deep gnome, the chandler of Lanternfall: you sell rope, sailcloth, lamp oil and timber, and buy coral and brass salvage. You tie knots while you talk and can name forty of them.", "Rope? Oil? A bowline you can trust? Step up."));
ssxWho(A, G, "ss_nell", { sex: "f", look: { top: 0x6A8AA8, topKind: "shirt", bottom: 0x3A4A5A, hair: 0xC8A060, hairStyle: "buns", hat: "none", layer: "apron", layerColor: 0xD8D0C0 } }, cx - 62, cz - 4.5, 0, ssxPersona("Nell Gillywick", "the fishmonger of Lanternfall: loud, cheerful, and very proud of her lantern-eye cod. You buy the dreamers' catch and sell fish to the chowder house.", "Fresh cod! Look at the eyes on that: lights up a whole kitchen!"));
ssxWho(A, G, "ss_gorrel", { sex: "m", look: LK.dwarf(0x5A3A2A, 2) }, cx - 72, cz - 8, -Math.PI / 2, { name: "Gorrel Tarbuckle, the shipwright", persona: "You are Gorrel Tarbuckle, a dwarf shipwright from Stonehallow who came down to the sea forty years ago and never went back. You mend any boat's hull for nothing (the Ferry Guild pays you) and love to explain how boats are built: keels, ribs, planks, caulking with oakum and pitch." + SSX_SET, greet: "Knocked about, is she? Bring her alongside." });
ssxWho(A, G, "ss_mags", { sex: "f", look: { top: 0xA84A3A, topKind: "shirt", bottom: 0x3A2A2A, hair: 0x2A1A12, hairStyle: "long", hat: "none", layer: "apron", layerColor: 0xE8E0D0 } }, cx - 30, cz + 18.5, Math.PI, ssxPersona("Mags Brinewell", "the keeper of the Lamp & Lantern chowder house in Lanternfall: generous, a terrible singer, a wonderful cook. Your chowder is lantern-eye cod, glowcap and cream.", "Chowder's on. There's a room upstairs if you need one."));
ssxWho(A, G, "ss_ysolde", { sex: "f", look: LK.elf(0x3A2A5A, 1, 1) }, cx + 60, cz - 28, Math.PI * 0.8, ssxPersona("Captain Ysolde Varr", "a dark elf of House Sablethorn who races boats through the Pillared Narrows: proud, precise, secretly delighted when anyone beats her time. You keep the race's book and its prize.", "The Narrows, dreamer. Eight gates, a hundred pillars and no second chances. Fancy a run?"));
ssxWho(A, G, "ss_wren", { sex: "f", child: true, look: { top: 0xD8A040, topKind: "shirt", bottom: 0x3A4A6A, hair: 0x8A4A2A, hairStyle: "short", hat: "beanie", hatColor: 0xA83A3A } }, cx - 10, cz - 20, 0, ssxPersona("Wren Lampling", "the young lamplighter of Lanternfall, nine years old, who lights every lamp on the quay with a long pole and knows all the harbour's gossip. Cheerful and chatty.", "Every lamp on the quay, I lit that one. And that one!"), { r: 20, sp: 1.2 });
for (var c = 0; c < (lite ? 4 : 9); c++) {
var px = cx - 70 + R() * 140, pz = cz - 30 + R() * 35;
ssxWho(A, G, "ss_lf" + c, { sex: c % 2 ? "f" : "m", look: c % 3 === 0 ? LK.gnome([0x5A6A4A, 0x6A4A5A, 0x4A4A6A][c % 3], c) : LK.sailor([0x3A4A5A, 0x5A3A2A, 0x2A4A3A, 0x4A3A5A][c % 4], c), scale: c % 3 === 0 ? 0.62 : undefined }, px, pz, R() * 6, null, { r: 18, sp: 1 });
}
},
function (A, G, R, lite) {
var P = SSX_PL.coral, cols = [[0x2AE8D8, 0x0A6A6A], [0xE85AC8, 0x6A1A5A], [0xF0B040, 0x6A4A10], [0x6AA0FF, 0x1A3A7A]];
SSX.coralM = cols.map(function (c) { return ssxEmM(c[0], c[1], 0.8); });
var n = lite ? 30 : 60;
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.05;
if (Math.abs(Math.sin(a)) > 0.97)
continue;
var rr = 170 + R() * 45, x = P.x + Math.cos(a) * rr, z = P.z + Math.sin(a) * rr, g = new THREE.Group();
g.position.set(x, SSX_Y - 1.2, z);
G.add(g);
var m = SSX.coralM[i % 4], br = lite ? 4 : 7;
for (var b = 0; b < br; b++) {
var ba = R() * 6.28, bl = 2 + R() * 5, cyl = wCyl(0.15, 0.35, bl, m, Math.cos(ba) * 0.8, bl / 2, Math.sin(ba) * 0.8, g, 5);
cyl.rotation.z = (R() - 0.5) * 0.9;
cyl.rotation.x = (R() - 0.5) * 0.9;
wSph(0.4, m, Math.cos(ba) * 0.8 + Math.sin(cyl.rotation.z) * -bl / 2, bl, Math.sin(ba) * 0.8 + Math.sin(cyl.rotation.x) * bl / 2, g, 6);
}
var mound = wSph(3.2, ssxM(0x3A4A4A, "stone"), 0, -1.2, 0, g, 8);
mound.scale.y = 0.5;
ssxRock(x, z, 3.4);
if (i % 5 === 0)
ssxGlow(G, [0x2AE8D8, 0xE85AC8, 0xF0B040, 0x6AA0FF][i % 4], 12, 0.35, x, SSX_Y + 2, z);
}
SSX_APPROACH.coral = { x: P.x, z: P.z - 260, after: "Sail in through the gap in the reef: the diver's key is in the middle." };
var kx = P.x, kz = P.z, hut = new THREE.Group();
hut.position.set(kx + 10, SSX_Y + 2.4, kz + 8);
G.add(hut);
udxBox(6, 3, 5, ssxM(0x6A5A44, "wood"), 0, 1.5, 0, hut);
var hr = wCone(4.8, 2.4, ssxM(0x8A7A5A, "wood"), 0, 4.2, 0, hut, 4);
hr.rotation.y = Math.PI / 4;
wBox(0.9, 0.9, 0.05, ssxGlowM(0xBFF0E0, 0.9), 1.4, 1.8, -2.53, hut);
A.solids.push({ x: kx + 10, z: kz + 8, hw: 3, hd: 2.5 });
var crane = new THREE.Group();
crane.position.set(kx - 12, SSX_Y + 2, kz - 14);
G.add(crane);
wCyl(0.25, 0.3, 7, ssxM(0x3A3026, "wood"), 0, 3.5, 0, crane, 6);
var arm = udxBox(0.3, 0.3, 7, ssxM(0x3A3026, "wood"), 0, 7, 2.8, crane);
var bell = wSph(1.2, wM(0xC8A050), 0, 4.4, 6.2, crane, 14);
bell.scale.y = 1.2;
wCyl(0.02, 0.02, 2.4, wM(0x2A2A2A), 0, 6, 6.2, crane, 4);
ssxLanding(A, G, { key: "coralkey", name: "the diver's key", x: kx, z: kz - 30, h: Math.PI, len: 12, place: null });
SSX_APPROACH.coral = { x: kx, z: kz - 52, after: "Press E to step ashore on the diver's key." };
ssxWho(A, G, "ss_mirelle", { sex: "f", look: { top: 0x2A6A7A, topKind: "shirt", bottom: 0x1A3A4A, hair: 0x1A1A1A, hairStyle: "long", hat: "none", shoes: 0x2A2A2A } }, kx + 4, kz + 2, Math.PI, ssxPersona("Mirelle Fathomly", "a coral diver of the Lanternfall Harbour Company who lives on the diver's key in the Coral Lights: calm, patient, and in love with the reef. You teach that only broken branches are gathered, never living coral, and explain real coral and bioluminescence: polyps, reefs that take thousands of years to grow, and creatures that make their own light.", "Take only what the sea has broken off. The reef will thank you."));
ssxFact(A, G, kx - 6, kz + 6, "Coral, and light from living things", ["Real coral is made of tiny animals called polyps. A reef is built by millions of them over thousands of years: the Great Barrier Reef is the largest structure made by living things on Earth.",
"Making light inside a living body is called bioluminescence. A chemical called luciferin gives off light when it combines with oxygen, helped by an enzyme, luciferase.",
"Most of the creatures of the deep ocean make their own light: anglerfish lure prey with a glowing lure, and some jellyfish glow when they are touched.", "Bioluminescent light is mostly blue or green, because those colours travel furthest through sea water.",
"Some real coral glows too: under blue light, many corals shine green, orange or pink with fluorescent proteins."], Math.PI);
SSX_SPOT_AT.coral1 = [P.x, P.z + 210];
SSX_SPOT_AT.coral2 = [P.x + 40, P.z - 40];
},
function (A, G, R, lite) {
var P = SSX_PL.ysmere, st = ssxM(0x6A6458, "stone"), st2 = ssxM(0x55504A, "stone"), moss = ssxM(0x3A4A3A, "stone");
for (var i = 0; i < (lite ? 14 : 26); i++) {
var a = R() * 6.28, d = 140 + R() * (P.r - 150), x = P.x + Math.cos(a) * d, z = P.z + Math.sin(a) * d, r = 3 + R() * 5, h = 10 + R() * 34, g = new THREE.Group();
g.position.set(x, SSX_Y - 4, z);
g.rotation.z = (R() - 0.5) * 0.12;
g.rotation.x = (R() - 0.5) * 0.12;
G.add(g);
udxCyl(r, r * 1.1, h, i % 3 ? st : st2, 0, h / 2, 0, g, 10);
udxCyl(r * 1.15, r * 1.15, 0.6, moss, 0, 4.2, 0, g, 10);
if (i % 2) {
var cn = wCone(r * 1.2, r * 1.6, ssxM(0x3A4A4A, "stone"), 0, h + r * 0.8, 0, g, 10);
cn.rotation.z = 0.2;
}
else
udxCyl(r * 1.05, r, 1.2, st2, 0, h + 0.6, 0, g, 10);
for (var w = 0; w < 3; w++) {
var wa = w * 2.1;
wBox(0.8, 1.6, 0.3, wB(0x0A0C10), Math.cos(wa) * r * 1.01, h * 0.55 + w * 2, Math.sin(wa) * r * 1.01, g).rotation.y = -wa + Math.PI / 2;
}
if (i % 4 === 0)
ssxGlow(G, 0x9AD8C8, 6, 0.3, x, SSX_Y + h * 0.6, z);
ssxRock(x, z, r + 1);
}
for (var k = 0; k < (lite ? 4 : 8); k++) {
var a2 = k / 8 * 6.28 + 0.3, d2 = 130 + (k % 2) * 60, ax = P.x + Math.cos(a2) * d2, az = P.z + Math.sin(a2) * d2, ag = new THREE.Group();
ag.position.set(ax, SSX_Y - 3, az);
ag.rotation.y = a2;
G.add(ag);
[-5, 5].forEach(function (s) { udxCyl(1, 1.1, 12, st, s, 6, 0, ag, 10); });
udxBox(12, 1.6, 2.2, st2, 0, 12.6, 0, ag);
ssxRock(ax + Math.cos(a2 + Math.PI / 2) * 5, az + Math.sin(a2 + Math.PI / 2) * 5, 1.4);
ssxRock(ax - Math.cos(a2 + Math.PI / 2) * 5, az - Math.sin(a2 + Math.PI / 2) * 5, 1.4);
}
var cx = P.x, cz = P.z, ty = ssxHeight(cx, cz) || SSX_Y + 9;
for (var s = 0; s < 8; s++) {
var sw = 24 - s * 1.2, sz = cz - 112 + s * 3.2, sy = ssxHeight(cx, sz);
if (sy === null)
continue;
udxBox(sw, 0.6, 3.2, st, cx, sy - 0.18, sz, G);
}
ssxLanding(A, G, { key: "ysmere", name: "the steps of Ysmere", x: cx, z: cz - 121, h: Math.PI, len: 10 });
SSX_APPROACH.ysmere = { x: cx, z: cz - 145, after: "Press E to step ashore on the steps of Ysmere." };
for (var c = 0; c < (lite ? 6 : 12); c++) {
var ca = c / 12 * 6.28, cr = 40 + (c % 3) * 14, x2 = cx + Math.cos(ca) * cr, z2 = cz + Math.sin(ca) * cr, y2 = ssxHeight(x2, z2);
if (y2 === null)
continue;
var ch = 2 + (c * 7) % 6;
udxCyl(0.9, 1, ch, st, x2, y2 + ch / 2, z2, G, 10);
if (c % 3 === 0) {
var fall = udxCyl(0.9, 0.9, 5, st, x2 + 2.5, y2 + 0.8, z2, G, 10);
fall.rotation.z = Math.PI / 2;
}
A.solids.push({ x: x2, z: z2, r: 1 });
}
var face = new THREE.Group(), fy = ssxHeight(cx - 40, cz - 10) || ty;
face.position.set(cx - 40, fy - 0.6, cz - 10);
face.rotation.y = 0.6;
face.rotation.z = 0.35;
G.add(face);
var head = wSph(4, st, 0, 3, 0, face, 18);
head.scale.set(0.8, 1, 0.75);
[-1, 1].forEach(function (s2) { wSph(0.6, wB(0x0A0A0A), s2 * 1.3, 3.8, 2.8, face, 8); });
var nose = udxBox(0.9, 1.6, 1.2, st, 0, 3, 3.1, face);
udxBox(2.6, 0.3, 0.6, st2, 0, 1.7, 2.85, face);
A.solids.push({ x: cx - 40, z: cz - 10, r: 3.6 });
var arx = cx + 20, arz = cz + 20, ary = ssxHeight(arx, arz) || ty, ar = new THREE.Group();
ar.position.set(arx, ary, arz);
G.add(ar);
udxCyl(11, 11.5, 8, st, 0, 4, 0, ar, 24);
var dome = wSph(11.2, ssxM(0x4A6A62, "stone"), 0, 8, 0, ar, 24);
dome.scale.y = 0.6;
for (var cl = 0; cl < 12; cl++) {
var a3 = cl / 12 * 6.28;
udxCyl(0.55, 0.6, 7.6, ssxM(0x8A8478, "stone"), Math.cos(a3) * 12, 3.8, Math.sin(a3) * 12, ar, 8);
}
udxBox(3, 4, 0.6, wB(0x0A0C10), 0, 2, -11.4, ar);
var as = wSign(["The Archive of Tides", "Ysmere remembered"], 5, 1.2, "#14202A", "#CFEFF0");
as.position.set(0, 7, -12.6);
ar.add(as);
ssxGlow(ar, 0x9AD8C8, 8, 0.45, 0, 4, -12.5);
A.solids.push({ x: arx, z: arz, r: 12.4 });
SSX_PL.ysmere.door = { x: arx, z: arz - 14 };
ssxWho(A, G, "ss_brannagh", { sex: "f", look: LK_D(0x3A5A6A, 3) }, cx + 8, cz - 96, Math.PI, ssxPersona("Brannagh Deepwell", "a dwarf diver of the Archive of Tides who maps the drowned streets of Ysmere: blunt, funny, fearless in the water. You know every drowned street by feel.", "Mind the third step, it's loose. Been meaning to tell someone for twelve years."));
ssxWho(A, G, "ss_sorrel", { sex: "m", look: SSX_LOOK.elf(0x2A3A5A, 2, 1) }, cx - 8, cz - 96, Math.PI, ssxPersona("Archivist Sorrel Inkwater", "a dark elf scholar who keeps the Archive of Tides on Ysmere: gentle, exact, inky to the elbows, and thrilled by any find from the sea. You catalogue charts, wrecks and drowned things, and you can explain how real archaeologists study shipwrecks and sunken cities.", "Ah, a visitor! Mind the ink. Have you brought me anything from the sea?"));
ssxFact(A, G, cx - 10, cz - 100, "Real drowned cities", ["Pavlopetri, off southern Greece, is about 5,000 years old: its streets, houses and tombs lie a few metres under the sea and can be seen by snorkellers.",
"Baiae was a Roman seaside town near Naples. The ground slowly sank, and its villas and mosaics are now an underwater archaeological park.",
"Thonis-Heracleion, an Egyptian port, sank into the Mediterranean over a thousand years ago and was found again by divers in 2000, with giant statues still on the sea floor.",
"Port Royal in Jamaica sank in an earthquake in 1692; much of the town slid into the harbour in minutes.", "Underwater archaeologists map a site with grids, photographs and drawings before anything is lifted, so where each thing lay is never lost."]);
SSX_SPOT_AT.ysmere1 = [P.x + 220, P.z + 30];
},
function (A, G, R, lite) {
var P = SSX_PL.boneyard, wood = [0x2E2A26, 0x3A3028, 0x262420, 0x42382C];
for (var i = 0; i < (lite ? 7 : 12); i++) {
var a = i / 12 * 6.28 + R() * 0.3, d = 80 + R() * (P.r - 90), x = P.x + Math.cos(a) * d, z = P.z + Math.sin(a) * d, len = 16 + R() * 22, g = new THREE.Group();
g.position.set(x, SSX_Y - 1.2 - R() * 1.2, z);
g.rotation.y = R() * 6.28;
g.rotation.z = (R() - 0.5) * 0.6;
g.rotation.x = (R() - 0.5) * 0.25;
G.add(g);
var hm = new THREE.Mesh(ssxHullGeo(len, len * 0.26, len * 0.15), ssxM(wood[i % 4], "wood"));
hm.position.y = 1;
g.add(hm);
if (i % 3 === 0) {
for (var r = 0; r < 7; r++) {
var rz = -len * 0.1 + r * len * 0.07;
[-1, 1].forEach(function (s) { var rib = udxBox(0.3, len * 0.18, 0.35, ssxM(0x3A3028, "wood"), s * len * 0.12, len * 0.1, rz, g); rib.rotation.z = s * 0.3; });
}
}
var mast = wCyl(0.25, 0.35, len * 0.5 * (0.4 + R() * 0.6), ssxM(0x2A2420, "wood"), 0, len * 0.25, len * 0.1, g, 6);
mast.rotation.z = (R() - 0.5) * 0.8;
if (i % 4 === 1) {
var rag = new THREE.Mesh(new THREE.PlaneGeometry(3, 4), new THREE.MeshLambertMaterial({ color: 0x6A6050, side: THREE.DoubleSide, transparent: true, opacity: 0.8 }));
rag.position.set(0.8, len * 0.3, len * 0.1);
g.add(rag);
}
ssxRock(x, z, len * 0.32);
}
var wx = P.x - 6, wz = P.z + 52, WS = new THREE.Group(), wy = SSX_Y + 0.4, len = 34;
WS.position.set(wx, wy, wz);
WS.rotation.y = Math.PI / 2;
G.add(WS);
var hull = new THREE.Mesh(ssxHullGeo(len, 8, 5), ssxM(0x3A3028, "wood"));
hull.position.y = 0.8;
WS.add(hull);
udxBox(6.6, 0.3, len * 0.8, ssxM(0x5A4A3A, "wood"), 0, 3.15, -0.5, WS);
[-1, 1].forEach(function (s) { udxBox(0.2, 1, len * 0.8, ssxM(0x3A3028, "wood"), s * 3.3, 3.8, -0.5, WS); });
wCyl(0.35, 0.45, 22, ssxM(0x2A2420, "wood"), 0, 14, 4, WS, 8);
var bm = wCyl(0.2, 0.2, 12, ssxM(0x2A2420, "wood"), 0, 12, 4, WS, 6);
bm.rotation.z = Math.PI / 2.3;
udxBox(5, 3, 6, ssxM(0x4A3A2A, "wood"), 0, 4.8, -12, WS);
wBox(0.8, 0.8, 0.05, ssxGlowM(0xBFF0E0, 0.8), 1.4, 5, -8.97, WS);
udxBox(1.6, 0.1, 1.6, wB(0x0A0806), 0, 3.32, 2, WS);
var nm = wSign(["WENDING STAR"], 4, 0.8, "#2A2018", "#C8B888");
nm.position.set(4.1, 2.6, 10);
nm.rotation.y = Math.PI / 2;
WS.add(nm);
ssxDeck({ x0: wx - len * 0.4, x1: wx + len * 0.38, z0: wz - 3.1, z1: wz + 3.1, y: wy + 3.3 });
A.solids.push({ x: wx - 12, z: wz, hw: 3, hd: 2.5 });
ssxLanding(A, G, { key: "boneyard", name: "the Wending Star's ladder", x: wx + len * 0.2, z: wz + 3.2, h: 0, len: 8, y: SSX_Y + 1.25, stand: { x: wx + len * 0.2, z: wz + 1.5 } });
udxBox(1.2, 3, 0.2, ssxM(0x3A3028, "wood"), wx + len * 0.2, SSX_Y + 2.4, wz + 3.3, G);
SSX_APPROACH.boneyard = { x: wx + len * 0.2, z: wz + 26, after: "Press E to climb the ladder onto the Wending Star." };
SSX_PL.boneyard.hatch = { x: wx - 2, z: wz };
for (var wr = -14; wr <= 14; wr += 7)
ssxRock(wx + wr, wz, 4.2);
SSX.wisps = [];
for (var w = 0; w < (lite ? 5 : 10); w++) {
var s = wGlow(0xA8F0D8, 3.2, 0.55);
s.position.set(P.x + (R() - 0.5) * 400, SSX_Y + 3, P.z + (R() - 0.5) * 400);
G.add(s);
s.userData.keep = 1;
SSX.wisps.push({ s: s, ph: R() * 6.28, cx: s.position.x, cz: s.position.z });
}
ssxWho(A, G, "ss_ambrose", { sex: "m", look: { top: 0x3A4A5A, topKind: "shirt", bottom: 0x2A2A30, hair: 0xD8D8D0, hairStyle: "long", beard: 1, hat: "none", layer: "longcoat", layerColor: 0x2A3038, shoes: 0x2A1E14 } }, wx + 6, wz + 1.5, -Math.PI / 2, ssxPersona("Old Ambrose Hollin", "the wreck-warden of the Boneyard of Ships, an old sailor who lives aboard the Wending Star. You know the name and the story of every wreck, you salvage only what nobody will miss, and the wisps are your companions (you call them marsh-gas, with a wink).", "Every ship here has a story. Sit down and I'll tell you one. Or three."));
ssxFact(A, G, wx + 12, wz - 1.6, "Shipwrecks and salvage", ["The oldest known shipwreck, found off southern Turkey at Uluburun, sank about 3,300 years ago with copper, tin, glass, ivory and gold aboard.", "In cold, dark, low-oxygen water, wooden wrecks can last for centuries: the Swedish warship Vasa, sunk in 1628, was raised almost whole in 1961.", "Brass and bronze last well under water; iron rusts away into 'concretions' that divers must X-ray to see what is inside.", "Under maritime law, salvage is a reward for saving a ship or its goods; historic wrecks are protected, and divers record them instead of taking from them."], -Math.PI / 2);
SSX_SPOT_AT.wreck1 = [P.x + 130, P.z - 80];
},
function (A, G, R, lite) {
var P = SSX_PL.lampwick, x = P.x, z = P.z, top = ssxHeight(x, z) || SSX_Y + 16, white = ssxM(0xE8E4DA, "plaster"), band = ssxM(0x2A2A2E, "plaster"), stone = ssxM(0x5A564E, "stone");
var T = new THREE.Group();
T.position.set(x, top, z);
G.add(T);
var H = 24;
for (var s = 0; s < 6; s++) {
var r0 = 3.6 - s * 0.18, r1 = 3.6 - (s + 1) * 0.18;
udxCyl(r1, r0, H / 6, s % 2 ? band : white, 0, s * H / 6 + H / 12, 0, T, 20);
}
udxCyl(4.4, 4.4, 0.3, stone, 0, H + 0.15, 0, T, 20);
for (var r = 0; r < 16; r++) {
var a = r / 16 * 6.28;
wCyl(0.04, 0.04, 1, wM(0x2A2A2A), Math.cos(a) * 4.2, H + 0.8, Math.sin(a) * 4.2, T, 4);
}
var rail = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.05, 4, 32), wM(0x2A2A2A));
rail.rotation.x = Math.PI / 2;
rail.position.y = H + 1.3;
T.add(rail);
var glass = wCyl(2.2, 2.2, 3, new THREE.MeshPhongMaterial({ color: 0x9AC8D8, transparent: true, opacity: 0.25, shininess: 120 }), 0, H + 1.8, 0, T, 16);
glass.userData.keep = 1;
var cap = wCone(2.6, 2, ssxM(0x2A3A3A, "stone"), 0, H + 4.3, 0, T, 16);
var lamp = wSph(0.9, ssxGlowM(0xFFF0C8, 1), 0, H + 1.8, 0, T, 14);
lamp.userData.keep = 1;
ssxGlow(T, 0xFFF0C8, 14, 0.75, 0, H + 1.8, 0);
var bg = new THREE.Group();
bg.position.set(0, H + 1.8, 0);
T.add(bg);
bg.userData.keep = 1;
[0, Math.PI].forEach(function (o) {
var c = new THREE.Mesh(new THREE.ConeGeometry(9, 90, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xFFF0C8, transparent: true, opacity: lite ? 0.06 : 0.08, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false }));
c.rotation.z = Math.PI / 2;
c.position.x = 45;
var piv = new THREE.Group();
piv.rotation.y = o;
piv.add(c);
bg.add(piv);
});
SSX.beam = bg;
udxBox(1.4, 2.2, 0.2, ssxM(0x2A2018, "wood"), 0, 1.1, -3.55, T);
A.solids.push({ x: x, z: z, r: 3.7 });
ssxDeck({ x: x, z: z, r0: 2.4, r1: 4.15, y: top + H + 0.3 });
var ck = new THREE.Group(), kx = x + 14, kz = z + 6, ky = ssxHeight(kx, kz) || top;
ck.position.set(kx, ky, kz);
ck.rotation.y = -0.4;
G.add(ck);
udxBox(9, 3.6, 6, white, 0, 1.8, 0, ck);
[-1, 1].forEach(function (s) { var rf = udxBox(9.6, 0.25, 3.8, ssxM(0x3A3A40, "stone"), 0, 4.2, s * 1.6, ck); rf.rotation.x = s * 0.6; });
wBox(0.9, 0.9, 0.05, ssxGlowM(0xFFD890, 0.95), 2, 2, -3.03, ck);
udxBox(1.2, 2.2, 0.1, ssxM(0x2A3A5A, "wood"), -1.6, 1.1, -3.04, ck);
A.solids.push({ x: kx, z: kz, hw: 4.6, hd: 3.2, rot: -0.4 });
var jl = ssxLanding(A, G, { key: "lampwick", name: "the landing at Lampwick Rock", x: x, z: z - 56, h: Math.PI, len: 12 });
SSX_APPROACH.lampwick = { x: x, z: z - 80, after: "Press E to step ashore at the foot of Lampwick Rock." };
for (var st2 = 0; st2 < 10; st2++) {
udxBox(2.4, 0.4, 1.2, stone, x + 3, SSX_Y + 1.4 + st2 * 1.4, z - 50 + st2 * 1.6, G);
}
SSX_PL.lampwick.stair = { x: x + 3, z: z - 52 };
SSX_PL.lampwick.top = { x: x + 3, z: z - 8 };
SSX_PL.lampwick.door = { x: x, z: z - 4.6 };
SSX_PL.lampwick.gal = { x: x, z: z - 3.3, y: top + H + 0.3 };
udxTalk(A, { x: x + 3, z: z - 51, r: 3, name: "The cliff stair", verb: "climb up to the light", fn: function () { var t = SSX_PL.lampwick.top; udxGo("sunless", t.x, t.z, Math.PI, "<b>The top of Lampwick Rock.</b> The tower stands over you, its lamp steady, its beam sweeping slowly over the dark water."); } });
udxTalk(A, { x: x + 3, z: z - 9, r: 2.6, name: "The cliff stair", verb: "go down to the landing", fn: function () { var t = SSX_PL.lampwick.stair; udxGo("sunless", t.x, t.z + 2, Math.PI, "<b>The landing.</b>"); } });
udxTalk(A, { x: x, z: z - 5, r: 2.4, name: "The lighthouse door", verb: "climb to the lamp room", fn: function () {
var g = SSX_PL.lampwick.gal;
ssxLand(true);
camera.position.set(UD.base + g.x, g.y + 1.72, g.z - 0.6);
yaw = Math.PI;
pitch = -0.2;
if (typeof flyY !== "undefined")
flyY = g.y;
UDX.checkAt = 0;
ssxSay("<b>The gallery of Lampwick Rock.</b> A hundred and nine steps. The lamp burns behind its glass, and the whole Sunless Sea lies round you in the dark. (E by the door to go down.)");
SSX.seen.gallery = 1;
ssxSave();
} });
udxTalk(A, { x: x, z: z - 3.4, r: 1.6, name: "The gallery door", verb: "go back down the tower", fn: function () { udxGo("sunless", x, z - 6, Math.PI, "<b>Down the tower.</b>"); } });
ssxWho(A, G, "ss_hesper", { sex: "f", look: { top: 0x3A4A6A, topKind: "dress", bottom: 0x3A4A6A, hair: 0xE0DCD4, hairStyle: "buns", hat: "none", layer: "cloak", layerColor: 0x2A2A34, shoes: 0x2A1E14 } }, x + 8, z - 4, Math.PI, ssxPersona("Hesper Lampwick", "the keeper of the light on Lampwick Rock, seventy-one years old, who has kept the lamp lit every night for fifty years. You are dry, kind and full of sea stories, and you can explain real lighthouses: the Pharos of Alexandria, Fresnel lenses, foghorns and the keepers who lived in them.", "Mind the hundred and ninth step. It's the one that counts."));
ssxFact(A, G, x - 8, z - 6, "Lighthouses", ["The Pharos of Alexandria, built about 2,280 years ago, was one of the Seven Wonders of the Ancient World: a tower perhaps 100 metres tall with a fire at the top.",
"In 1822 Augustin Fresnel invented a lens of rings of glass prisms that bends a lamp's light into one strong beam; it could be seen 30 km out to sea.", "Every lighthouse has its own pattern of light so sailors can tell which one they see (here the beam turns slowly and steadily).",
"Keepers trimmed the wicks, polished the lens and wound the clockwork that turned it, through every night; most lighthouses are automatic now."], Math.PI);
},
function (A, G, R, lite) {
var P = SSX_PL.puffhollow, I = SSX_ISLE.puffhollow, caps = [0xC85A3A, 0xD8A84A, 0x8A5AA8, 0xE8D8C0, 0x4A9A8A], stem = ssxM(0xE8DCC8, null);
SSX.gillM = ssxEmM(0x6AF0B0, 0x2AA870, 0.9);
for (var i = 0; i < (lite ? 14 : 30); i++) {
var a = R() * 6.28, d = 20 + Math.sqrt(R()) * (I.r - 40), x = I.x + Math.cos(a) * d, z = I.z + Math.sin(a) * d, y = ssxHeight(x, z);
if (y === null)
continue;
var h = 8 + R() * 14, sr = 0.8 + R() * 1.6, g = new THREE.Group();
g.position.set(x, y, z);
G.add(g);
var sm = wCyl(sr * 0.8, sr, h, stem, 0, h / 2, 0, g, 10);
sm.rotation.z = (R() - 0.5) * 0.15;
var cap = wSph(sr * 4, ssxM(caps[i % 5], null), 0, h, 0, g, 16);
cap.scale.y = 0.42;
var gill = wCyl(sr * 3.9, sr * 3.9, 0.05, SSX.gillM, 0, h - 0.3, 0, g, 20);
for (var sp = 0; sp < 5; sp++) {
var aa = sp * 1.3;
wSph(sr * 0.5, ssxM(0xF0E8D8, null), Math.cos(aa) * sr * 2.2, h + sr * 1.2, Math.sin(aa) * sr * 2.2, g, 6).scale.y = 0.5;
}
A.solids.push({ x: x, z: z, r: sr + 0.2 });
}
for (var k = 0; k < (lite ? 6 : 11); k++) {
var ka = k / 11 * 6.28, kd = 40 + (k % 3) * 18, hx = I.x + Math.cos(ka) * kd, hz = I.z + Math.sin(ka) * kd - 20, hy = ssxHeight(hx, hz);
if (hy === null)
continue;
var hg = new THREE.Group();
hg.position.set(hx, hy, hz);
hg.rotation.y = -ka + Math.PI / 2;
G.add(hg);
udxCyl(2.6, 2.9, 3.4, stem, 0, 1.7, 0, hg, 16);
var hc = wSph(4.2, ssxM(caps[k % 5], null), 0, 3.6, 0, hg, 16);
hc.scale.y = 0.5;
wCyl(4.1, 4.1, 0.05, SSX.gillM, 0, 3.4, 0, hg, 20);
udxBox(1, 1.8, 0.1, ssxM(0x6A4A2A, "wood"), 0, 0.9, 2.85, hg);
wSph(0.4, ssxGlowM(0xFFE0A0, 0.95), 1.6, 2, 2.35, hg, 8);
A.solids.push({ x: hx, z: hz, r: 3 });
}
ssxLanding(A, G, { key: "puffhollow", name: "the landing at Puffhollow", x: I.x, z: I.z - I.r + 12, h: Math.PI, len: 14 });
SSX_APPROACH.puffhollow = { x: I.x, z: I.z - I.r - 16, after: "Press E to step ashore at Puffhollow." };
var bx = I.x + 12, bz = I.z - 110;
var bc = hxCounter(G, "underdark", bx, bz, Math.PI, 0x8A5AA8, [0xD8B880, 0xC8A060, 0xE8D0A0]);
bc.position.y = ssxHeight(bx, bz) || SSX_Y + 2;
SSX_PL.puffhollow.bakery = { x: bx, z: bz };
var LK = SSX_LOOK;
ssxWho(A, G, "ss_mother", { sex: "f", look: LK.spore(0x8A6AA8), scale: 0.55, cap: 0xC85A3A }, I.x - 6, I.z - 96, Math.PI, ssxPersona("Old Mother Puffwhistle", "the eldest of the Sporekin of Puffhollow: small mushroom folk with caps for hats, who speak softly and slowly and feel what each other feel through the threads under the ground. You are gentle, wise and a little sleepy, and you know real facts about fungi: mycelium, the threads under the soil; mushrooms are only the fruit; and the honey fungus in Oregon that is one of the largest living things on Earth.", "Slowly, dreamer, slowly. The island hears your feet."));
ssxWho(A, G, "ss_tumble", { sex: "m", look: LK.spore(0xC89A5A), scale: 0.55, cap: 0xD8A84A }, bx, bz + 2.4, Math.PI, ssxPersona("Tumble Puffwhistle", "a Sporekin baker of Puffhollow who bakes spore-cakes on warm stones: round, bouncy, cheerful and always dusted with flour. You sell spore-cakes and glowcaps and buy fish.", "Spore-cakes! Warm off the stones! Mind, they bounce."));
ssxWho(A, G, "ss_sprig", { sex: "f", child: true, look: LK.spore(0x5AA86A), scale: 0.5, cap: 0x4A9A8A }, I.x + 20, I.z - 80, 0, ssxPersona("Sprig", "a young Sporekin of Puffhollow who has never left the island and wants to know everything about the world above. Curious, giggly, full of questions.", "Is it true the roof up there is blue? And it goes away at night?"), { r: 16, sp: 1 });
for (var c = 0; c < (lite ? 3 : 7); c++) {
ssxWho(A, G, "ss_spk" + c, { sex: c % 2 ? "f" : "m", look: LK.spore([0x8A6AA8, 0xC89A5A, 0x5AA86A, 0xA85A5A][c % 4]), scale: 0.52, cap: caps[c % 5] }, I.x - 30 + R() * 60, I.z - 70 + R() * 60, R() * 6, null, { r: 14, sp: 0.7 });
}
ssxFact(A, G, I.x + 18, I.z - 100, "Fungi: the hidden kingdom", ["A mushroom is only the fruit of a fungus. The fungus itself is a web of fine threads, mycelium, spreading through soil and wood.",
"A honey fungus in the Blue Mountains of Oregon covers almost 10 square kilometres and may be thousands of years old: one of the largest living things on Earth.", "Fungi and tree roots trade with each other: the fungus brings water and minerals, the tree gives sugar. Forests are linked underground by these threads.",
"About 100 kinds of mushroom glow in the dark. The old name for their light is 'foxfire'.", "Fungi are not plants: they cannot make food from light, and they are more closely related to animals than to plants."], Math.PI);
},
function (A, G, R, lite) {
var P = SSX_PL.mirrorstill, b = new THREE.Group();
b.position.set(P.x, SSX_Y, P.z);
G.add(b);
b.userData.keep = 1;
var fl = wCyl(1.8, 2.2, 1.2, wM(0x3A4A5A), 0, 0.2, 0, b, 14);
wCyl(0.12, 0.12, 4, wM(0x2A2A2A), 0, 2.4, 0, b, 6);
var bell = wCone(0.6, 0.9, wM(0xC8A050), 0, 4.3, 0, b, 12);
wSph(0.25, ssxGlowM(0x9AF0FF, 1), 0, 4.9, 0, b, 8);
ssxGlow(b, 0x9AF0FF, 5, 0.55, 0, 4.9, 0);
var horn = wCone(0.5, 1.4, wM(0xA88A50), 0, -0.8, 0, b, 10);
horn.rotation.x = Math.PI;
SSX.buoy = b;
ssxRock(P.x, P.z, 2.4);
},
function (A, G, R, lite) {
var P = SSX_PL.gullet, tex = wTex(256, 256, function (x, W, H) { x.fillStyle = "#000"; x.fillRect(0, 0, W, H); x.translate(W / 2, H / 2); for (var a = 0; a < 5; a++) {
x.beginPath();
for (var t = 0; t < 60; t++) {
var r = t * 2.2, an = t * 0.22 + a * 1.256;
x.lineTo(Math.cos(an) * r, Math.sin(an) * r);
}
x.strokeStyle = "rgba(170,220,255,0.55)";
x.lineWidth = 5;
x.stroke();
} });
var m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending });
var d = new THREE.Mesh(new THREE.CircleGeometry(P.r * 0.7, 48), m);
d.rotation.x = -Math.PI / 2;
d.position.set(P.x, SSX_Y + 0.4, P.z);
G.add(d);
d.userData.keep = 1;
var funnel = new THREE.Mesh(new THREE.ConeGeometry(28, 30, 24, 1, true), new THREE.MeshLambertMaterial({ color: 0x061018, side: THREE.DoubleSide }));
funnel.rotation.x = Math.PI;
funnel.position.set(P.x, SSX_Y - 14, P.z);
G.add(funnel);
funnel.userData.keep = 1;
SSX.gullet = d;
for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.28, x = P.x + Math.cos(a) * (P.r + 40), z = P.z + Math.sin(a) * (P.r + 40);
ssxBuoy(G, x, z, 0xFF6A4A);
}
},
function (G, x, z, col) { var b = new THREE.Group(); b.position.set(x, SSX_Y, z); G.add(b); b.userData.keep = 1; wCyl(0.9, 1.1, 1, wM(0xA83A2A), 0, 0.2, 0, b, 10); wCyl(0.08, 0.08, 2.6, wM(0x2A2A2A), 0, 1.8, 0, b, 5); wSph(0.25, ssxGlowM(col, 1), 0, 3.2, 0, b, 8); var gl = wGlow(col, 3.4, 0.5); gl.position.y = 3.2; b.add(gl); SSX.anim.push({ bob: b, ph: x * 0.01 }); ssxRock(x, z, 1.2); return b; },
function (A, G, R, lite) {
SSX.gates = SSX_RACE.map(function (p, i) {
var g = new THREE.Group();
g.position.set(p[0], SSX_Y, p[1]);
G.add(g);
g.userData.keep = 1;
var ring = new THREE.Mesh(new THREE.TorusGeometry(9, 0.35, 8, 40), ssxGlowM(i === 0 ? 0x9AF0A0 : 0x9AD8FF, 0.9));
ring.position.y = 4;
g.add(ring);
var nx = SSX_RACE[(i + 1) % 8], a = Math.atan2(nx[0] - p[0], nx[1] - p[1]);
g.rotation.y = a;
var s = wSign([String(i + 1)], 1.6, 1.2, "#14202A", "#BFF0F0");
s.position.y = 14.2;
g.add(s);
[-1, 1].forEach(function (sd) { wCyl(0.3, 0.4, 6, wM(0x3A3A40), sd * 9.5, 1.4, 0, g, 6); });
return { g: g, ring: ring, x: p[0], z: p[1] };
});
var st = SSX_RACE[0];
ssxBuoy(G, st[0] - 30, st[1] - 30, 0x9AF0A0);
ssxSignAt(G, ["The Pillared Narrows", "The race starts at gate 1", "Ask Captain Varr at Lanternfall"], st[0] - 34, SSX_Y + 5, st[1] - 34, Math.PI * 1.25, 4.4, 1.6);
},
function (A, G, R, lite) {
var P = SSX_PL.trench;
for (var i = 0; i < 8; i++) {
var a = i / 8 * 6.28, x = P.x + Math.cos(a) * (P.r + 30), z = P.z + Math.sin(a) * (P.r + 30);
if (!ssxInBox(x, z))
continue;
ssxBuoy(G, x, z, 0xFF4A3A);
}
ssxSignAt(G, ["Here lies the Gloamwyrm's Trench", "Deep water. Do not linger.", "— the Harbour Company"], P.x - P.r - 48, SSX_Y + 4, P.z + 40, -Math.PI / 2, 4.6, 1.6);
var t = SSX_ISLE.wyrmtooth, ty = ssxHeight(t.x, t.z) || SSX_Y + 4;
for (var k = 0; k < 5; k++) {
var sp = wCone(1.5 + k * 0.3, 6 + k * 2, ssxM(0x2A2826, "stone"), t.x + (k - 2) * 3, ty + 3 + k, t.z + (k % 2) * 3, G, 7);
sp.rotation.z = (k - 2) * 0.1;
}
var sc = wSph(1.2, ssxEmM(0x3A6A5A, 0x0A3A2A, 0.8), t.x + 6, ty + 0.6, t.z + 8, G, 10);
sc.scale.set(1.4, 0.3, 1);
},
function (A, G, R, lite) {
var P = SSX_PL.threads, tex = wTex(64, 256, function (x, W, H) { x.clearRect(0, 0, W, H); for (var i = 0; i < 26; i++) {
var gx = Math.random() * W;
var gr = x.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, "rgba(200,240,255,0)");
gr.addColorStop(0.5, "rgba(200,240,255,0.55)");
gr.addColorStop(1, "rgba(200,240,255,0.2)");
x.fillStyle = gr;
x.fillRect(gx, Math.random() * H * 0.5, 1 + Math.random() * 2, H * 0.6);
} }, [1, 2]);
var m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.75, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
SSX.threadTex = tex;
for (var i = 0; i < (lite ? 8 : 16); i++) {
var z = P.z - P.r * 1.4 + i * (P.r * 2.8 / (lite ? 8 : 16)), pl = new THREE.Mesh(new THREE.PlaneGeometry(P.r * 2.8 / (lite ? 8 : 16) + 2, 152), m);
pl.position.set(P.x - 10 + (i % 2) * 3, SSX_Y + 76, z);
pl.rotation.y = Math.PI / 2;
G.add(pl);
pl.userData.keep = 1;
}
SSX.mist = wPoints(lite ? 120 : 300, function () { return [P.x - 12 + Math.random() * 10, SSX_Y + Math.random() * 6, P.z + (Math.random() - 0.5) * P.r * 2.8]; }, 0xD8F0FF, 1.6, true);
if (typeof softGlow === "function")
SSX.mist.material.map = softGlow();
SSX.mist.material.opacity = 0.5;
SSX.mist.userData.keep = 1;
G.add(SSX.mist);
var I = SSX_ISLE.grotto;
for (var c = 0; c < (lite ? 6 : 12); c++) {
var a = c / 12 * 6.28, x = I.x + Math.cos(a) * (16 + c % 3 * 5), z = I.z + Math.sin(a) * (16 + c % 3 * 5), y = ssxHeight(x, z) || SSX_Y + 1;
var cr = wCone(0.8 + c % 3 * 0.4, 3 + c % 4 * 1.5, ssxEmM([0x8AF0FF, 0xC8A0FF, 0x9AF0C0][c % 3], [0x2A6A7A, 0x4A2A7A, 0x2A6A4A][c % 3], 0.9), x, y + 1.5, z, G, 6);
cr.rotation.z = (c % 3 - 1) * 0.3;
}
ssxGlow(G, 0x9AD8FF, 20, 0.35, I.x, SSX_Y + 5, I.z);
ssxLanding(A, G, { key: "grotto", name: "the grotto behind the Threads", x: I.x - 30, z: I.z, h: -Math.PI / 2, len: 8 });
SSX_APPROACH.threads = { x: P.x - 80, z: P.z, after: "Sail on through the falling water, if you dare." };
},
function (len, col, glow) {
var g = new THREE.Group(), segs = [], m = ssxM(col || 0x1A2A2A, null), gm = ssxGlowM(glow || 0x8AF0C0, 1), n = 9;
for (var i = 0; i < n; i++) {
var r = (1 - i / n) * 0.55 + 0.12, s = wSph(r * len / 6, m, 0, 0, 0, g, 10);
s.scale.z = 1.6;
segs.push(s);
if (i % 2 === 0)
wSph(r * len / 22, gm, 0, r * len / 7, 0, s, 6);
}
[-1, 1].forEach(function (sd) { wSph(len / 60, gm, sd * len / 18, len / 40, len / 14, segs[0], 6); });
g.userData.segs = segs;
g.userData.len = len;
return g;
},
function () {
var g = new THREE.Group(), skin = ssxEmM(0x1A3040, 0x0A2A3A, 0.6), light = ssxGlowM(0x9AF0FF, 0.9);
var body = wSph(14, skin, 0, 0, 0, g, 20);
body.scale.set(1, 0.55, 3.4);
var head = wSph(10, skin, 0, 1, 36, g, 18);
head.scale.set(1, 0.6, 1.3);
[-1, 1].forEach(function (s) { var fin = wSph(8, skin, s * 18, -1, 10, g, 12); fin.scale.set(1.6, 0.12, 0.7); fin.rotation.y = s * 0.3; wSph(1.4, light, s * 7, 4, 44, g, 10); });
var tail = wSph(6, skin, 0, 0, -52, g, 12);
tail.scale.set(3.2, 0.15, 1);
for (var i = 0; i < 14; i++) {
var z = -38 + i * 6;
[-1, 1].forEach(function (s) { wSph(0.9, light, s * (9 - Math.abs(i - 7) * 0.6), 5.5, z, g, 6); });
}
var gl = wGlow(0x7AE0FF, 90, 0.35);
gl.position.y = 2;
g.add(gl);
g.userData.glow = gl;
g.userData.tail = tail;
return g;
},
function () {
var g = new THREE.Group(), skin = ssxM(0x1A2420, null), belly = ssxM(0x3A4A3A, null), eye = ssxGlowM(0xFFB040, 1), segs = [];
for (var i = 0; i < 14; i++) {
var r = 3.2 - i * 0.14, s = wSph(r, i % 2 ? skin : belly, 0, 0, 0, g, 12);
s.scale.z = 1.4;
segs.push(s);
for (var k = 0; k < 2; k++)
wCone(0.5, 1.6, skin, 0, r * 0.9, 0, s, 5);
}
var hd = segs[0];
var jaw = wSph(2.6, skin, 0, -1.2, 2.6, hd, 12);
jaw.scale.set(1, 0.4, 1.4);
[-1, 1].forEach(function (s) { wSph(0.45, eye, s * 1.5, 1.1, 2.4, hd, 8); var horn = wCone(0.4, 3, belly, s * 1.4, 2.6, -0.5, hd, 6); horn.rotation.x = -0.7; });
g.userData.segs = segs;
return g;
},
function (col) {
var g = new THREE.Group(), m = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending });
var bell = wSph(0.9, m, 0, 0, 0, g, 12);
bell.scale.y = 0.6;
for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.28, t = wCyl(0.03, 0.01, 2.2, m, Math.cos(a) * 0.5, -1.1, Math.sin(a) * 0.5, g, 3);
}
g.userData.m = m;
return g;
},
function () {
var g = new THREE.Group();
for (var i = 0; i < 5; i++) {
var l = wCyl(0.25, 0.25, 4, ssxM(0x6A5A40, "wood"), -1.2 + i * 0.6, 0.2, 0, g, 8);
l.rotation.x = Math.PI / 2;
}
var who = wPerson("ss_cast" + Math.floor(Math.random() * 9), { sex: Math.random() < 0.5 ? "f" : "m", look: SSX_LOOK.sailor(0x8A5A3A, Math.floor(Math.random() * 4)) });
who.position.y = 0.5;
g.add(who);
g.userData.who = who;
var fl = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.6), new THREE.MeshLambertMaterial({ color: 0xD8C8A0, side: THREE.DoubleSide }));
fl.position.set(1.2, 2.6, 0);
g.add(fl);
wCyl(0.03, 0.03, 2.6, ssxM(0x4A3A2A, "wood"), 1.2, 1.6, 0, g, 4);
wSph(0.2, ssxGlowM(0xFFD890, 1), -1.2, 1.1, 0, g, 6);
return g;
},
function () {
var g = new THREE.Group(), wood = ssxM(0x4A3A2A, "wood");
var hm = new THREE.Mesh(ssxHullGeo(22, 7, 2.4), wood);
hm.position.y = 0.6;
g.add(hm);
udxBox(6, 0.3, 18, ssxM(0x5A4632, "wood"), 0, 1.8, 0, g);
udxBox(5, 3, 8, ssxM(0x6A3A3A, "wood"), 0, 3.4, -3, g);
var aw = udxBox(6.4, 0.2, 6, ssxM(0xC8A040, "wood"), 0, 5, 4, g);
aw.rotation.x = 0.1;
[-2.8, 2.8].forEach(function (x) { wCyl(0.08, 0.08, 3, wood, x, 3.4, 6.6, g, 5); });
udxF({ g: g, solids: [] }, "crates", 1.5, 1.9, 5, 0, { parent: g, solid: false });
udxF({ g: g, solids: [] }, "barrel", -1.6, 1.9, 5.6, 0, { parent: g, solid: false });
for (var i = 0; i < 6; i++)
wSph(0.2, ssxGlowM([0xFFD890, 0xF0A0C8, 0x9AF0E0][i % 3], 1), -2.6 + i * 1.04, 5.6, 7, g, 6);
var s = wSign(["SALTWHISTLE", "Trading barge"], 4, 1.1, "#2A1A10", "#FFD890");
s.position.set(0, 5.6, 1);
s.rotation.y = Math.PI;
g.add(s);
wCyl(0.14, 0.18, 9, wood, 0, 6, -8, g, 6);
var lam = wGlow(0xFFD890, 8, 0.55);
lam.position.set(0, 8, 9);
g.add(lam);
return g;
},
function (A, G, lite) {
var L = ssxLeviathan();
L.visible = false;
G.add(L);
L.userData.keep = 1;
SSX.lev = { g: L, t: 0, on: false, next: 30 };
var W = ssxWyrm();
W.visible = false;
G.add(W);
W.userData.keep = 1;
SSX.wyrm = { g: W, t: 0, on: false, cool: 0 };
var B = ssxBarge();
G.add(B);
B.userData.keep = 1;
SSX.barge = { g: B, a: 0 };
ssxBargeTalk(A);
SSX.encG = new THREE.Group();
G.add(SSX.encG);
SSX.encG.userData.keep = 1;
},
function (t) {
var n = SSX_BARGE.length, L = 0, seg = [];
for (var i = 0; i < n; i++) {
var a = SSX_BARGE[i], b = SSX_BARGE[(i + 1) % n], d = Math.hypot(b[0] - a[0], b[1] - a[1]);
seg.push([a, b, d]);
L += d;
}
var s = (t * 2.2) % L;
for (var j = 0; j < n; j++) {
var S = seg[j];
if (s <= S[2]) {
var u = s / S[2];
return { x: S[0][0] + (S[1][0] - S[0][0]) * u, z: S[0][1] + (S[1][1] - S[0][1]) * u, h: Math.atan2(S[1][0] - S[0][0], S[1][1] - S[0][1]) };
}
s -= S[2];
}
return { x: SSX_BARGE[0][0], z: SSX_BARGE[0][1], h: 0 };
},
function (A) {
SSX.bargeT = { x: 0, z: 0, r: 30, name: "The Saltwhistle, a trading barge", verb: "hail her and trade", fn: function () {
var o = [["🛒 Trade at the Saltwhistle's counter", "Oil, cloth, spore-cakes and cod; she buys coral, brass, fish and timber", hxStallTalk("ss_barge")]];
if (SSX.boat && SSX.hull < SSX.hullMax)
o.push(["🛠️ A patch for the hull", "Captain Saltwhistle's carpenter patches her up (to 80%)", function () { SSX.hull = Math.max(SSX.hull, Math.round(SSX.hullMax * 0.8)); ssxSay("<b>Patched.</b> Hull " + Math.round(SSX.hull / SSX.hullMax * 100) + "%."); }]);
hxKeeperCard({ name: "The Saltwhistle" }, o.concat([["💬 Talk with Captain Saltwhistle", "", function () { wTalk(ssxPersona("Captain Merrit Saltwhistle", "the captain of the Saltwhistle, a trading barge that goes round and round the Sunless Sea selling what sailors run short of: a cheerful, gossipy gnome who has seen everything on the water at least twice.", "Ahoy! Come alongside, mind the paint.")); }]]));
} };
},
function (dt) {
SSX.push = null;
var G = SSX_PL.gullet, gd = Math.hypot(SSX.bx - G.x, SSX.bz - G.z);
if (gd < G.r) {
var k = 1 - gd / G.r, tang = Math.atan2(SSX.bx - G.x, SSX.bz - G.z) + Math.PI / 2, inx = (G.x - SSX.bx) / gd, inz = (G.z - SSX.bz) / gd;
SSX.push = { x: Math.sin(tang) * 12 * k + inx * 5 * k, z: Math.cos(tang) * 12 * k + inz * 5 * k };
SSX.h += dt * 0.25 * k;
if (!SSX.told.gullet) {
SSX.told.gullet = 1;
ssxSay("<b>The Gullet!</b> The water turns under you, faster and faster, round and down. Full sail and steer outward!");
ssxTone(80, 1);
}
if (gd < 26) {
ssxHurt(20, "<b>Down the Gullet!</b> The whirlpool swallows the boat… and spits her out again, half full of water.");
var a = Math.atan2(SSX.bx - G.x, SSX.bz - G.z);
SSX.bx = G.x + Math.sin(a) * (G.r + 40);
SSX.bz = G.z + Math.cos(a) * (G.r + 40);
SSX.v = 2;
SSX.told.gullet = 0;
}
}
else if (gd > G.r + 80)
SSX.told.gullet = 0;
},
function (dt, A) {
var t = WLD.t || 0, L = worldLocal(), cx = SSX.aboard ? SSX.bx : L.x, cz = SSX.aboard ? SSX.bz : L.z;
if (SSX.water) {
SSX.water.userData.amp = 0.32 * (1 - ssxCalm() * 0.92) + (SSX.storm || 0);
wWaterTick(SSX.water, cx, cz, t);
}
[SSX.plank, SSX.worms, SSX.worms2].forEach(function (p) { if (!p)
return; var s = p.userData.tile; p.position.x = Math.round(cx / s) * s; p.position.z = Math.round(cz / s) * s; });
if (SSX.plank)
SSX.plank.material.opacity = 0.6 + 0.25 * Math.sin(t * 0.4);
if (SSX.coralM && Math.abs(cx - SSX_PL.coral.x) < 900 && Math.abs(cz - SSX_PL.coral.z) < 900)
SSX.coralM.forEach(function (m, i) { m.emissiveIntensity = 0.65 + 0.3 * Math.sin(t * 0.5 + i * 1.7); });
if (SSX.gillM)
SSX.gillM.emissiveIntensity = 0.7 + 0.25 * Math.sin(t * 0.35);
if (SSX.beam)
SSX.beam.rotation.y += dt * 0.28;
if (SSX.gullet)
SSX.gullet.rotation.z += dt * 0.9;
if (SSX.threadTex)
SSX.threadTex.offset.y += dt * 0.9;
if (SSX.mist && Math.abs(cx - SSX_PL.threads.x) < 500) {
var mp = SSX.mist.geometry.attributes.position;
for (var i = 0; i < mp.count; i++) {
var y = mp.getY(i) + dt * 1.2;
if (y > SSX_Y + 8)
y = SSX_Y;
mp.setY(i, y);
}
mp.needsUpdate = true;
}
if (SSX.wisps)
SSX.wisps.forEach(function (w, i) { w.ph += dt * 0.15; w.s.position.set(w.cx + Math.cos(w.ph) * 30, SSX_Y + 3 + Math.sin(w.ph * 2.3) * 1.5, w.cz + Math.sin(w.ph * 0.8) * 30); w.s.material.opacity = 0.35 + 0.2 * Math.sin(w.ph * 3); });
SSX.anim.forEach(function (a) { if (a.glow) {
if (a.glow.visible !== false)
a.glow.material.opacity = a.b * (0.82 + 0.18 * Math.sin(t * 0.7 + a.ph));
}
else if (a.bob) {
a.bob.position.y = SSX_Y + Math.sin(t * 0.8 + a.ph) * 0.12;
a.bob.rotation.z = Math.sin(t * 0.6 + a.ph) * 0.03;
} });
SSX.people.forEach(function (P) { if (P.wander)
wWander(P.g, dt, function (x, z) { var h = ssxHeight(x, z); return h === null ? P.g.position.y : h; }, P.wander); });
if (SSX.barge) {
var bp = ssxBargeAt(t);
SSX.barge.g.position.set(bp.x, SSX_Y + Math.sin(t * 0.7) * 0.1, bp.z);
SSX.barge.g.rotation.y = bp.h;
var T = SSX.bargeT;
T.x = bp.x;
T.z = bp.z;
}
ssxLevTick(dt, t);
ssxWyrmTick(dt, t);
ssxEncTick(dt, t);
SSX.fog += ((SSX.fogWant || 0) - SSX.fog) * Math.min(1, dt * 0.3);
Object.keys(SSX_PL).forEach(function (k) { var p = SSX_PL[k]; if (!SSX.seen[k] && Math.hypot(cx - p.x, cz - p.z) < p.r + 40) {
SSX.seen[k] = 1;
ssxSave();
if (SSX_FIRST[k])
ssxSay(SSX_FIRST[k]);
} });
},
function (dt, t) {
var V = SSX.lev;
if (!V)
return;
var M = SSX_PL.mirrorstill;
if (!V.on) {
V.next -= dt;
if (V.next <= 0 && SSX.aboard && SSX.where === "open") {
var dm = Math.hypot(SSX.bx - M.x, SSX.bz - M.z);
if (dm < M.r + 200 || Math.random() < 0.15) {
V.on = true;
V.t = 0;
V.cx = dm < M.r + 200 ? M.x : SSX.bx;
V.cz = dm < M.r + 200 ? M.z : SSX.bz;
V.a = Math.random() * 6.28;
V.g.visible = true;
V.told = 0;
}
else
V.next = 60;
}
return;
}
V.t += dt;
var dur = 70, u = V.t / dur, a = V.a + u * Math.PI * 1.2, x = V.cx + Math.cos(a) * 220, z = V.cz + Math.sin(a) * 220;
var rise = Math.sin(Math.min(1, u) * Math.PI);
V.g.position.set(x, SSX_Y - 14 + rise * 10.5, z);
V.g.rotation.y = -a;
V.g.userData.tail.rotation.y = Math.sin(t * 0.8) * 0.3;
V.g.userData.glow.material.opacity = 0.2 + rise * 0.25;
if (!V.told && rise > 0.5 && SSX.aboard && Math.hypot(SSX.bx - x, SSX.bz - z) < 600) {
V.told = 1;
ssxTone(55, 3);
setTimeout(function () { ssxTone(73, 2.5); }, 1400);
ssxSay("<b>The Lantern Leviathan.</b> Something vast rises beside you, glowing blue along its back like a street of lamps, and sings: a sound so low you feel it in the planks. It does not hurt you. It only looks.");
SSX.seen.leviathan = 1;
ssxSave();
}
if (Math.hypot(SSX.bx - x, SSX.bz - z) < 60 && SSX.aboard)
SSX.tilt = Math.sin(t * 0.9) * 0.06;
if (V.t > dur) {
V.on = false;
V.g.visible = false;
V.next = 150 + Math.random() * 120;
}
},
function (dt, t) {
var W = SSX.wyrm;
if (!W)
return;
var P = SSX_PL.trench, d = SSX.aboard ? Math.hypot(SSX.bx - P.x, SSX.bz - P.z) : 1e9, S = W.g.userData.segs;
if (d < P.r) {
if (!W.on) {
W.on = true;
W.t = 0;
W.g.visible = true;
ssxSay("<b>The Gloamwyrm!</b> Coils as thick as a tower break the water, and a head with eyes like lamps turns toward you. Sail on, fast, and get out of the trench!");
ssxTone(60, 1.4);
}
}
else if (W.on && d > P.r + 150) {
W.on = false;
W.g.visible = false;
}
if (!W.on)
return;
W.t += dt;
W.cool = Math.max(0, W.cool - dt);
var ang = Math.atan2(SSX.bx - P.x, SSX.bz - P.z), hx = P.x + Math.sin(ang) * Math.min(d, P.r) * 0.7, hz = P.z + Math.cos(ang) * Math.min(d, P.r) * 0.7;
W.g.position.set(hx, SSX_Y, hz);
W.g.rotation.y = ang;
var strike = W.cool < 1.2 && W.cool > 0 ? 1 : 0;
for (var i = 0; i < S.length; i++) {
var u = i / S.length;
S[i].position.set(Math.sin(t * 1.2 + u * 4) * 6 * u, Math.sin(u * Math.PI) * 16 + Math.sin(t + u * 6) * 2 - u * 6 + (i === 0 ? strike * 4 : 0), -u * 60 + (i < 3 ? strike * 12 : 0));
}
if (W.cool <= 0 && d < P.r + 20) {
W.cool = 8 + Math.random() * 3;
var spd = Math.abs(SSX.v);
if (spd > SSX.spec.top * 0.8) {
ssxSay("<b>The Gloamwyrm strikes</b>… and misses: you are going too fast for it.");
}
else
ssxHurt(18, "<b>The Gloamwyrm strikes!</b> Its head comes down on the gunwale.");
}
},
function (dt, t) {
var E = SSX.enc;
if (!E) {
if (!SSX.aboard || SSX.where !== "open" || !SSX.encG)
return;
var p = ssxPlaceNear();
if (p && p !== "mirrorstill" && p !== "narrows")
return;
SSX.encAt -= dt * (SSX.spec && SSX.spec.quiet < 1 ? 0.6 : 1);
if (SSX.encAt > 0)
return;
SSX.encAt = 45 + Math.random() * 50;
var k = SSX_ENC[Math.floor(Math.random() * SSX_ENC.length)];
if (p === "mirrorstill" && k !== "jelly")
return;
ssxEncStart(k);
return;
}
E.t += dt;
var fn = SSX_ENCF[E.k];
if (fn && fn.tick)
fn.tick(E, dt, t);
if (E.done || E.t > E.max)
ssxEncEnd();
},
function (E) {
E.max = 70;
E.eels = [];
for (var i = 0; i < (SSX.lite ? 2 : 3); i++) {
var m = ssxEelMesh(9 + i * 2);
E.g.add(m);
E.eels.push({ g: m, a: i * 2.1, r: 14 + i * 4, lunge: 4 + i * 2.5 });
}
ssxSay("<b>Gloam eels!</b> Long shapes, lit along their backs, circle the boat. They go for slow boats: keep moving, or press E to fend them off with the boat-hook.");
ssxTone(140, 0.6);
},
function (E, dt, t) {
var fast = Math.abs(SSX.v) > SSX.spec.top * 0.75, left = 0;
E.eels.forEach(function (e) {
if (e.gone) {
e.g.position.y -= dt * 2;
return;
}
left++;
e.a += dt * (fast ? 0.3 : 0.8);
e.lunge -= dt;
var close = e.lunge < 1.2 && !fast, r = close ? 4 + e.lunge * 6 : e.r;
var x = SSX.bx + Math.cos(e.a) * r, z = SSX.bz + Math.sin(e.a) * r;
e.g.position.set(x, SSX_Y + (close ? 0.4 : -0.4), z);
e.g.rotation.y = -e.a + (close ? Math.PI : -Math.PI / 2);
ssxPoseEel(e.g, t, 1);
if (e.lunge <= 0) {
e.lunge = 5 + Math.random() * 4;
if (!fast)
ssxHurt(6, "<b>An eel rams the hull!</b>");
}
});
if (fast && !E.saidFast) {
E.saidFast = 1;
ssxSay("<b>Full sail!</b> The eels fall behind; they cannot keep up.");
}
if (!left || (fast && E.t > 25))
E.done = true;
SSX.encPrompt = left ? { h: "<b>Gloam eels</b> · <b>press E</b> to fend them off with the boat-hook", fn: function () {
var e = E.eels.filter(function (q) { return !q.gone; })[0];
if (!e)
return;
e.gone = true;
ssxTone(220, 0.2);
var n = E.eels.filter(function (q) { return !q.gone; }).length;
ssxSay(n ? "<b>Whack!</b> One eel thrashes off into the dark. " + n + " more." : "<b>Whack!</b> The last eel flees. A scale it shed floats by the boat: press E to fish it out.");
if (!n) {
E.scale = true;
E.max = E.t + 25;
}
} } : null;
if (E.scale)
SSX.encPrompt = { h: "<b>A shed eel scale</b> · <b>press E</b> to fish it out", fn: function () { E.scale = false; E.done = true; ssxGatherPrize("ss_eel"); } };
},
function (E) {
E.max = 50;
E.j = [];
var cols = [0x9AF0FF, 0xF0A0E8, 0xA0F0B0];
for (var i = 0; i < (SSX.lite ? 8 : 18); i++) {
var m = ssxJelly(cols[i % 3]), p = ssxAhead(20 + Math.random() * 80, (Math.random() - 0.5) * 80);
m.position.set(p.x, SSX_Y - 0.8, p.z);
E.g.add(m);
E.j.push({ g: m, ph: Math.random() * 6 });
}
ssxSay("<b>Jelly-lights.</b> The water ahead fills with drifting bells of light, rose and blue and green, each pulsing slowly. They are harmless; sail among them.");
},
function (E, dt, t) {
E.r.position.y = SSX_Y + Math.sin(t * 0.9) * 0.12;
var d = Math.hypot(SSX.bx - E.x, SSX.bz - E.z);
SSX.encPrompt = d < 16 ? { h: "<b>A castaway</b> · <b>press E</b> to take them aboard", fn: function () {
E.done = true;
if (SSX.carry) {
ssxSay("<b>You are already carrying " + esc(SSX.carry.name) + ".</b> The castaway says they'll wait, cheerfully, for the next boat.");
return;
}
ssxTaskStart("rescue", function () { ssxSay("<b>Aboard!</b> \"Bless you. I was mending nets on a raft and the line parted…\" Take them home to Lanternfall: Odile Brackwater at the harbour office will see to them."); });
} } : null;
},
function (E) {
E.max = 14;
var p = ssxAhead(30 + Math.abs(SSX.v) * 4, (Math.random() - 0.5) * 14);
E.x = p.x;
E.z = p.z;
E.fall = 6;
var ring = new THREE.Mesh(new THREE.RingGeometry(3, 3.6, 32), ssxGlowM(0xBFE8FF, 0.5));
ring.rotation.x = -Math.PI / 2;
ring.position.set(p.x, SSX_Y + 0.4, p.z);
E.g.add(ring);
E.ring = ring;
var st = wCone(2, 9, ssxM(0x5A524A, "stone"), p.x, SSX_Y + 140, p.z, E.g, 7);
st.rotation.x = Math.PI;
E.st = st;
ssxSay("<b>A crack, far overhead.</b> Ripples rings on the water ahead: something is falling. Steer clear!");
ssxTone(300, 0.15);
},
function (E, dt, t) {
E.fall -= dt;
E.ring.scale.setScalar(1 + Math.sin(t * 3) * 0.1);
if (E.fall > 0) {
E.st.position.y = SSX_Y + 5 + E.fall / 6 * 135;
return;
}
if (!E.hit) {
E.hit = 1;
E.st.visible = false;
E.ring.scale.setScalar(4);
ssxTone(70, 0.7);
var d = Math.hypot(SSX.bx - E.x, SSX.bz - E.z);
if (d < 9)
ssxHurt(15, "<b>Splash!</b> The dripstone comes down beside you and the wave slams the boat.");
else
ssxSay("<b>Splash!</b> A great spout of water where it fell. Missed you.");
}
},
function (A, G) {
var LF = SSX_PL.lanternfall, YS = SSX_PL.ysmere, BY = SSX_PL.boneyard, LW = SSX_PL.lampwick, PH = SSX_ISLE.puffhollow;
function door(key, x, z, name, msg) { var F = SSX_DOORS[key][0]; udxTalk(A, { x: x, z: z, r: 2.6, name: name, verb: "go in", fn: function () { udxGo(F.key, F.inAt[0], F.inAt[1], F.inAt[2], msg); } }); }
door("inn", LF.x - 30, LF.z + 20.6, "The door of the Lamp & Lantern", "<b>The Lamp & Lantern.</b> Warm air, chowder, a fiddle somewhere. The stair to the guest rooms is at the back of the common room.");
door("office", LF.x + 16, LF.z + 21, "The door of the Harbour Office", "<b>The Harbour Office.</b> Charts on every wall, the harbour book open on its stand.");
door("archive", YS.x + 20, YS.z + 20 - 13.6, "The door of the Archive of Tides", "<b>The Archive of Tides.</b> Cool, quiet, smelling of old paper and the sea. Everything Ysmere was is kept here.");
door("hold", BY.x - 8, BY.z + 52, "The hatch of the Wending Star", "<b>The hold of the Wending Star.</b> Dark timbers, a lamp swinging. Ambrose keeps it tidy.");
door("cottage", LW.x + 14 - Math.sin(-0.4) * 3.4, LW.z + 6 - Math.cos(-0.4) * 3.4, "The door of the keeper's cottage", "<b>The keeper's cottage.</b> A kettle, a cat, fifty years of light books.");
var sx = PH.x - 36, sz = PH.z - 56, sy = ssxHeight(sx, sz) || SSX_Y + 3, g = new THREE.Group();
g.position.set(sx, sy, sz);
G.add(g);
udxCyl(6.5, 7.5, 12, ssxM(0xE8DCC8, null), 0, 6, 0, g, 20);
var cap = wSph(15, ssxM(0xC85A3A, null), 0, 12, 0, g, 24);
cap.scale.y = 0.4;
wCyl(14.8, 14.8, 0.08, SSX.gillM || ssxGlowM(0x6AF0B0, 0.8), 0, 11.6, 0, g, 28);
for (var i = 0; i < 9; i++) {
var a = i * 0.7;
wSph(1.6, ssxM(0xF0E8D8, null), Math.cos(a) * 8, 16.5, Math.sin(a) * 8, g, 8).scale.y = 0.5;
}
udxBox(2.2, 3.4, 0.2, ssxM(0x6A4A2A, "wood"), 0, 1.7, -7.3, g);
for (var w = 0; w < 4; w++) {
var wa = -1.2 + w * 0.8;
wSph(0.6, ssxGlowM(0xFFE0A0, 0.95), Math.sin(wa) * 7.2, 6, -Math.cos(wa) * 7.2, g, 8);
}
var sg = wSign(["The Spore-hall"], 3.4, 0.8, "#2A2030", "#E8F0D0");
sg.position.set(0, 4.2, -7.6);
sg.rotation.y = Math.PI;
g.add(sg);
A.solids.push({ x: sx, z: sz, r: 7.4 });
door("spore", sx, sz - 8.4, "The door of the Spore-hall", "<b>The Spore-hall.</b> Inside the great mushroom it is warm and soft-lit green, and smells of bread.");
},
function (key, fns) {
var T = SSX_TK[key];
if (!T)
return "";
var C = SSX.carry, pay = T.gold + " gold" + (T.gift ? " and " + T.giftN + " × " + hxMat(T.gift).name.toLowerCase() : "");
if (T.kind === "carry") {
if (C && C.key === key)
return "<div style='opacity:.75;margin:6px 0'>📦 You are carrying " + esc(T.name.toLowerCase()) + " for " + esc(T.to) + ".</div>";
if (C)
return "";
fns["tk-" + key] = function () { ssxTaskStart(key); };
return worldBtn("tk-" + key, "📦 " + esc(T.name), "Take it to " + esc(T.to) + " · pays " + pay + " (once a day)");
}
if (T.kind === "need") {
fns["tk-" + key] = function () { ssxTaskDone(key); };
return worldBtn("tk-" + key, "🧺 " + esc(T.name), "Bring " + ssxNeedLine(T) + " · pays " + pay + " (once a day)");
}
return "";
},
function (key, after) {
var T = SSX_TK[key];
if (!T)
return;
SSX.carry = { key: key, name: T.name, to: T.to, at: Date.now() };
ssxCarrySave();
worldCard(null);
ssxSay("<b>" + esc(T.name) + ".</b> Take it to " + esc(T.to) + (T.gift ? ", and there's " + T.giftN + " × " + esc(hxMat(T.gift).name.toLowerCase()) + " in it for you" : "") + ".");
if (after)
after();
if (ssxSigned())
ssxRpc("ssx_task_start", { p_key: key }).then(function (o) { if (o && o.ok === false && o.say)
ssxSay(esc(o.say)); }).catch(function (e) { if (!ssxMissing(e) && window.console)
console.warn("[sunless-sea] task", e); });
},
function (key) {
var T = SSX_TK[key];
if (!T)
return;
worldCard(null);
if (T.kind === "carry") {
SSX.carry = null;
ssxCarrySave();
}
if (!ssxSigned()) {
ssxSay("<b>" + esc(T.to) + " thanks you.</b> (Sign in, and errands on the Sunless Sea pay gold.)");
return;
}
ssxRpc("ssx_task_done", { p_key: key }).then(function (o) { ssxSay("<b>" + esc(T.to.split(",")[0]) + ":</b> " + esc((o && o.say) || "Thank you.")); if (typeof HX !== "undefined")
HX.stockAt = 0; ssxTone(523, 0.12); setTimeout(function () { ssxTone(659, 0.14); }, 120); })
.catch(function (e) { ssxSay(ssxMissing(e) ? "<b>" + esc(T.to) + " thanks you.</b> (Paid errands on the Sunless Sea open soon.)" : esc((e && e.message) || String(e))); });
},
function (T) {
var N = SSX_NPC[T.name] || {}, h = ssxHead(esc(T.name)), fns = {};
h += ssxHandBtn(T.name, fns);
if (N.stall) {
h += worldBtn("stall", "🛒 " + esc(HX_STALLS[N.stall].name), esc(HX_STALLS[N.stall].say));
fns.stall = function () { hxStall(N.stall); };
}
(N.tasks || []).forEach(function (k) { h += ssxTaskBtn(k, fns); });
if (N.mend) {
if (SSX.boat && SSX.hull < SSX.hullMax) {
h += worldBtn("mend", "🛠️ Mend the hull", "Hull " + Math.round(SSX.hull / SSX.hullMax * 100) + "% · the Ferry Guild pays");
fns.mend = function () { SSX.hull = SSX.hullMax; worldCard(null); ssxSay("<b>Gorrel caulks and patches.</b> \"There. She'll take another knock or two.\" Hull 100%."); };
}
else
h += "<div style='opacity:.75;margin:6px 0'>" + (SSX.boat ? "Your boat's hull is sound." : "Bring a boat alongside and Gorrel mends her hull for nothing.") + "</div>";
}
if (N.fish) {
h += worldBtn("fish", "🎣 Fish off the quay", "Lantern-eye cod bite here");
fns.fish = function () { hxFishOpen("ss_fish"); };
}
if (N.race) {
var b = SSX.best.narrows;
h += worldBtn("race", "🏁 Run the Pillared Narrows", "Eight gates through the pillars, in order, against the clock" + (b ? " · your best " + hxClock(b) : "") + " · a win pays " + SSX_TK.narrows.gold + " gold once a day");
fns.race = function () { ssxRaceArm(); };
}
if (N.work) {
h += worldBtn("work", "📋 Work at " + esc(N.work), "Real shifts, paid like any post in the city");
fns.work = function () { worldCard(null); if (typeof ahOpen === "function")
ahOpen(N.work); };
}
if (N.board) {
h += worldBtn("what", "🧭 What to do on the Sunless Sea", "Every errand, place and game");
fns.what = function () { if (typeof hxHub === "function")
hxHub(); };
}
if (T.t) {
h += worldBtn("talk", "💬 Talk with " + esc(T.name.split(",")[0]), "");
fns.talk = function () { worldCard(null); wTalk(T.t); };
}
worldCard(h, fns);
},
function () {
worldCard(null);
SSX.race = { armed: true, next: 0, t: 0, on: false };
ssxSay("<b>The race is set.</b> Sail to gate 1 in the Pillared Narrows (a green ring of light) and the clock starts as you pass through it. Eight gates, in order; the next one is always the brightest.");
if (SSX.aboard && SSX.where === "open")
SSX.auto = { x: SSX_RACE[0][0] - 40, z: SSX_RACE[0][1] - 40, name: "gate 1 of the Narrows", after: "Line her up and sail through the green ring." };
},
function (dt) {
var R = SSX.race;
if (!R || !SSX.gates)
return;
SSX.gates.forEach(function (g, i) { var lit = i === R.next; g.ring.scale.setScalar(lit ? 1.15 : 0.9); if (!g.ring.userData.own) {
g.ring.material = g.ring.material.clone();
g.ring.userData.own = 1;
} g.ring.material.opacity = lit ? 1 : 0.35; });
if (!SSX.aboard || SSX.where !== "open")
return;
if (R.on) {
R.t += dt;
if (R.t > 420) {
SSX.race = null;
ssxSay("<b>Time.</b> The race is lost in the pillars. Captain Varr will set it again.");
return;
}
}
var G = SSX.gates[R.next];
if (Math.hypot(SSX.bx - G.x, SSX.bz - G.z) < 11) {
if (R.next === 0 && !R.on) {
R.on = true;
R.t = 0;
ssxSay("<b>Gate 1!</b> The clock is running. Gate 2 is lit ahead.");
if (ssxSigned())
ssxRpc("ssx_task_start", { p_key: "narrows" }).catch(function () { });
}
else
ssxSay("<b>Gate " + (R.next + 1) + "</b> · " + hxClock(R.t));
ssxTone(440 + R.next * 60, 0.15);
R.next++;
if (R.next >= SSX.gates.length) {
var tm = R.t, best = SSX.best.narrows;
SSX.race = null;
if (!best || tm < best) {
SSX.best.narrows = tm;
ssxSave();
}
ssxSay("<b>Through the Narrows in " + hxClock(tm) + "!</b>" + (best && tm >= best ? " (Your best is " + hxClock(best) + ".)" : " Your best yet."));
if (ssxSigned())
setTimeout(function () { ssxRpc("ssx_task_done", { p_key: "narrows" }).then(function (o) { if (o && o.say)
ssxSay("<b>Captain Varr:</b> " + esc(o.say)); }).catch(function () { }); }, 600);
}
}
},
function (dt) {
if (!ssxOn())
return;
SSX.t += dt;
if (SSX.aboard) {
ssxSail(dt);
ssxRaceTick(dt);
ssxBanner();
ssxPromptAboard();
}
else if (UDX.here === SSX.area) {
var L0 = worldLocal();
worldBanner("<b>The Sunless Sea</b> · " + esc(ssxPlaceName(L0.x, L0.z) || "ashore") + (SSX.carry ? " · carrying " + esc(SSX.carry.name) : ""));
}
else if (SSX.boat && SSX.boat.visible) {
ssxPlaceBoat(dt);
var L = worldLocal();
if (Math.hypot(L.x - SSX.bx, L.z - SSX.bz) < SSX.spec.len * 0.5 + 4 && Math.abs(L.y - 1.72 - SSX_Y) < 6)
worldPrompt("<b>The " + esc(SSX.spec.name) + "</b> · <b>press E</b> to go aboard", ssxBoard);
}
if (SSX.nearBoats && !SSX.aboard || SSX.where === "near")
(SSX.nearBoats || []).forEach(function (b, i) { b.position.y = UD_SEA_Y + 0.05 + Math.sin(WLD.t * 0.8 + i) * 0.1; b.visible = !(SSX.boat && SSX.kind === SSX_BOATS[i].k); });
},
function () {
var slow = Math.abs(SSX.v) < 4.5;
if (SSX.encPrompt)
return worldPrompt(SSX.encPrompt.h, SSX.encPrompt.fn);
if (SSX.where === "near") {
var N = SSX_NEAR;
if (Math.hypot(SSX.bx - N.jx, SSX.bz - N.jz) < 16 && slow)
return worldPrompt("<b>Pell's jetty</b> · <b>press E</b> to step ashore", function () { ssxLand(false, N.jx - 1.5, N.jz, -Math.PI / 2); });
return worldPrompt(null);
}
for (var i = 0; i < SSX_LANDINGS.length; i++) {
var Ld = SSX_LANDINGS[i];
if (Math.hypot(SSX.bx - Ld.end.x, SSX.bz - Ld.end.z) < 20 && slow)
return worldPrompt("<b>" + esc(Ld.name) + "</b> · <b>press E</b> to moor and step ashore", (function (Ld) { return function () { ssxMoorAt(Ld.end.x, Ld.end.z, Ld.h); ssxLand(false, Ld.stand.x, Ld.stand.z, Ld.h); }; })(Ld));
}
var B = SSX_LF.berth;
if (Math.hypot(SSX.bx - B.x, SSX.bz - B.z) < 34 && slow)
return worldPrompt("<b>Lantern Quay</b> · <b>press E</b> to moor and go ashore at Lanternfall", function () { ssxMoorAt(B.x, B.z, Math.PI); ssxLand(false, SSX_LF.quay.x + 5, SSX_LF.quay.z + 4, Math.PI); });
if (SSX.bargeT && Math.hypot(SSX.bx - SSX.bargeT.x, SSX.bz - SSX.bargeT.z) < 34)
return worldPrompt("<b>The Saltwhistle</b> · <b>press E</b> to hail her and trade", SSX.bargeT.fn);
for (var s = 0; s < SSX_SPOTS.length; s++) {
var sp = SSX_SPOTS[s];
if (sp[7] !== "aboard")
continue;
var at = SSX_SPOT_AT[sp[8]];
if (!at)
continue;
if (Math.hypot(SSX.bx - at[0], SSX.bz - at[1]) < 26 && slow)
return worldPrompt("<b>" + esc(sp[5]) + "</b> · <b>press E</b> to " + esc(sp[6]), (function (sp, at) { return function () { hxGather({ id: sp[0], world: "underdark", kind: sp[1], x: at[0], z: at[1], name: sp[5], verb: sp[6], aboard: true }); }; })(sp, at));
}
if (Math.hypot(SSX.bx - SSX_PL.mirrorstill.x, SSX.bz - SSX_PL.mirrorstill.z) < 30)
return worldPrompt("<b>The Listening Buoy</b> · <b>press E</b> to listen", ssxBuoyCard);
if (Math.abs(SSX.v) < 0.8)
return worldPrompt("<b>Still water</b> · <b>press E</b> to fish over the side", function () { hxFishOpen("ss_fish"); });
worldPrompt(null);
},
function () {
worldCard(worldFacts("The Listening Buoy", "A horn under the water, a bell above it", [], ["Put your ear to the brass and you hear the sea: clicks, creaks, and very far off a long low song. The Lantern Leviathan sings here, they say, and the buoy rings when it rises.",
"Real whales sing too. Humpback whales sing long, changing songs; every male in a region sings the same song, and it changes slowly year by year.", "Blue whales are the loudest animals on Earth: their calls, too low for people to hear, travel hundreds of kilometres through the ocean.", "Sound travels more than four times faster in water than in air, which is why sailors' 'hydrophones' can hear ships far away."]));
SSX.seen.buoy = 1;
ssxSave();
},
function () {
var h = ssxHead("Ashore") + ssxP(SSX.boat ? "The " + esc(SSX.spec.name) + " is moored where you left her." : "You have no boat out here."), fns = {};
if (SSX.boat) {
h += worldBtn("board", "⛵ Back aboard", "Straight to the tiller");
fns.board = function () { worldCard(null); ssxBoard(); };
}
h += worldBtn("home", "⬆️ Up the shaft", "Leave the Underdark");
fns.home = function () { worldCard(null); worldHome("<b>Back up the shaft.</b> The cage clanks up into daylight."); };
worldCard(h, fns);
}
];
});
