/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(161, function () {
"use strict";
return [
function (k) {
if (SP.tex[k])
return SP.tex[k];
var W = 512, H = 256, d = (typeof spxTake === "function" && spxTake("sp|" + k)) || spPaintData(k);
var t = wTex(W, H, function (x) { var img = x.createImageData(W, H); img.data.set(d); x.putImageData(img, 0, 0); });
SP.tex[k] = t;
return t;
},
function () {
return wTex(512, 8, function (x, W, H) {
for (var i = 0; i < W; i++) {
var u = i / W, a = 0.15 + 0.6 * Math.abs(Math.sin(u * 41)) * Math.abs(Math.sin(u * 7.3 + 1));
if (u > 0.56 && u < 0.6)
a = 0.04;
if (u < 0.08)
a *= u / 0.08;
x.fillStyle = "rgba(" + (220 - u * 40 | 0) + "," + (200 - u * 50 | 0) + "," + (160 - u * 40 | 0) + "," + a.toFixed(3) + ")";
x.fillRect(i, 0, 1, H);
}
});
},
function (rin, rout, op, tex) {
var g = new THREE.RingGeometry(rin, rout, 128, 1), p = g.attributes.position, uv = g.attributes.uv;
for (var i = 0; i < p.count; i++) {
var r = Math.hypot(p.getX(i), p.getY(i));
uv.setXY(i, (r - rin) / (rout - rin), 0.5);
}
var m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: op, side: THREE.DoubleSide, depthWrite: false, fog: false }));
m.rotation.x = -Math.PI / 2;
return m;
},
function (G) {
var R = wRand(4242);
SP.stars = wPoints(5000, function () { var u = R() * 2 - 1, th = R() * Math.PI * 2, s = Math.sqrt(1 - u * u); return [30000 * s * Math.cos(th), 30000 * u, 30000 * s * Math.sin(th)]; }, 0xF0F4FF, 1.8, false);
SP.stars.renderOrder = -8;
G.add(SP.stars);
var mw = wPoints(4000, function () { var th = R() * Math.PI * 2, w = (R() + R() + R() - 1.5) * 0.12; return [29000 * Math.cos(th), 29000 * Math.sin(w) + th * 300 - 900, 29000 * Math.sin(th)]; }, 0xC8D0F0, 1.3, false);
mw.material.opacity = 0.55;
SP.stars.add(mw);
var sb = SP_BY.sun, sunM = wMesh(new THREE.SphereGeometry(sb.r, 48, 32), new THREE.MeshBasicMaterial({ map: spPaint("sun"), fog: false }), 0, 0, 0, G);
[[sb.r * 3.2, 0.9, 0xFFD070], [sb.r * 7, 0.35, 0xFFB040], [sb.r * 14, 0.12, 0xFF9030]].forEach(function (q) { var gl = wGlow(q[2], q[0], q[1]); sunM.add(gl); });
SP.bodies.sun = sunM;
var pl = new THREE.PointLight(0xFFF4E0, 1.7, 0);
G.add(pl);
SP.light = pl;
SP_BODIES.forEach(function (b) {
if (b.k === "sun")
return;
var seg = b.r > 100 ? 64 : 40;
var m = new THREE.Mesh(new THREE.SphereGeometry(b.r, seg, Math.round(seg * 0.66)), new THREE.MeshLambertMaterial({ map: spPaint(b.k) }));
var holder = new THREE.Group();
holder.add(m);
holder.rotation.z = b.tilt || 0;
G.add(holder);
m.userData.spin = b.spin;
holder.userData.k = b.k;
holder.userData.mesh = m;
SP.bodies[b.k] = holder;
if (b.k === "earth") {
var cl = wTex(512, 256, function (x, W, H) { x.clearRect(0, 0, W, H); for (var i = 0; i < 160; i++) {
var cx = Math.random() * W, cy = H * 0.1 + Math.random() * H * 0.8, n = 3 + Math.random() * 6;
for (var j = 0; j < n; j++) {
x.fillStyle = "rgba(255,255,255," + (0.12 + Math.random() * 0.22) + ")";
x.beginPath();
x.ellipse(cx + (Math.random() - 0.5) * 30, cy + (Math.random() - 0.5) * 6, 4 + Math.random() * 12, 1.5 + Math.random() * 3, 0, 0, 7);
x.fill();
}
} });
var clouds = wMesh(new THREE.SphereGeometry(b.r * 1.02, 48, 32), new THREE.MeshLambertMaterial({ map: cl, transparent: true, depthWrite: false }), 0, 0, 0, holder);
clouds.userData.spin = 0.045;
holder.userData.clouds = clouds;
holder.add(wGlow(0x6AA8FF, b.r * 2.6, 0.25));
}
if (b.k === "venus")
holder.add(wGlow(0xFFE0A0, b.r * 2.4, 0.2));
if (b.k === "saturn") {
var rg = spRing(b.r * 1.24, b.r * 2.3, 0.95, spRingTex());
holder.add(rg);
}
if (b.k === "uranus") {
var ru = spRing(b.r * 1.6, b.r * 2.0, 0.25, spRingTex());
holder.add(ru);
}
if (b.k === "neptune" || b.k === "uranus")
holder.add(wGlow(b.col, b.r * 2.4, 0.18));
if (b.k === "pluto")
holder.add(wGlow(0x9AB4E8, b.r * 2.6, 0.18));
if (!b.parent) {
var pts = [];
for (var i = 0; i <= 180; i++) {
var a = i / 180 * Math.PI * 2;
pts.push(new THREE.Vector3(Math.cos(a) * b.orbit, b.y * Math.cos(a - b.ang), Math.sin(a) * b.orbit));
}
var ol = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x5A7AB8, transparent: true, opacity: 0.22, fog: false }));
G.add(ol);
}
});
SP.minor = [];
[["jupiter", "Io", 1.5, 0xE8D060, 6], ["jupiter", "Europa", 1.85, 0xE8E0D0, 5], ["jupiter", "Ganymede", 2.3, 0xA89A88, 8], ["jupiter", "Callisto", 2.9, 0x6A625A, 7.5],
["saturn", "Titan", 3.1, 0xD8A040, 8], ["neptune", "Triton", 2.4, 0xD8C8C0, 5], ["mars", "Phobos", 1.7, 0x8A7A6A, 2], ["mars", "Deimos", 2.4, 0x9A8A7A, 1.4]].forEach(function (q, i) {
var mm = wSph(q[4], wM(q[3]), 0, 0, 0, G, 20);
mm.userData = { host: q[0], name: q[1], d: SP_BY[q[0]].r * q[2], a: i * 1.7, w: 0.08 / (q[2]) };
SP.minor.push(mm);
});
var rock = new THREE.DodecahedronGeometry(1, 0), n = 900, belt = new THREE.InstancedMesh(rock, wM(0x8A8076), n), mtx = new THREE.Matrix4(), q4 = new THREE.Quaternion(), e = new THREE.Euler();
for (var i = 0; i < n; i++) {
var a = R() * Math.PI * 2, rr = 3700 + R() * 650, s = 1.5 + Math.pow(R(), 3) * 14;
e.set(R() * 6, R() * 6, R() * 6);
q4.setFromEuler(e);
mtx.compose(new THREE.Vector3(Math.cos(a) * rr, (R() - 0.5) * 120, Math.sin(a) * rr), q4, new THREE.Vector3(s, s * (0.6 + R() * 0.6), s));
belt.setMatrixAt(i, mtx);
}
G.add(belt);
SP.belt = belt;
SP.stations.aurora = spStation(G, "aurora", "Station Aurora", "earth", new THREE.Vector3(140, 30, -60), 0x8FB4E8);
SP.stations.ares = spStation(G, "ares", "The Ares Gateway", "mars", new THREE.Vector3(-80, 20, 70), 0xE89A6A);
SP.stations.veyari = spAlienStation(G);
spFarGate(G);
for (var c = 0; c < 5; c++) {
var sh = spCutter(0xD8DCE4, 0x3A6AB8);
sh.userData.beat = { a: c * 1.3, r: 1500 + c * 2100, h: (c % 2 ? 60 : -40), w: 0.035 / (1 + c * 0.6) };
G.add(sh);
SP.ships.push(sh);
}
SP.ship = spCutter(0xF0F0F0, 0xC9A868);
SP.ship.scale.setScalar(0.55);
G.add(SP.ship);
var cm = wSph(5, wM(0xE8F0FF, { e: 0x406080 }), 0, 0, 0, G, 12);
var tail = wGlow(0x9AD8FF, 90, 0.5);
cm.add(tail);
SP.comet = cm;
},
function (hull, trim) {
var g = new THREE.Group(), H = wM(hull), T = wM(trim), glow = wB(0x8FD8FF, { fog: false });
var body = wMesh(new THREE.CylinderGeometry(0.8, 1.5, 9, 10), H, 0, 0, 0, g);
body.rotation.x = Math.PI / 2;
var nose = wMesh(new THREE.ConeGeometry(0.8, 3.4, 10), H, 0, 0, -6.2, g);
nose.rotation.x = -Math.PI / 2;
var cock = wMesh(new THREE.SphereGeometry(0.75, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), wM(0x223A5A, { e: 0x0A1A2A }), 0, 0.55, -3.2, g);
cock.scale.set(0.9, 0.7, 1.8);
[-1, 1].forEach(function (s) {
var w = wBox(5.5, 0.22, 3.2, T, s * 3.2, -0.2, 1.6, g);
w.rotation.y = s * 0.35;
var en = wCyl(0.5, 0.6, 3, H, s * 1.6, 0.1, 4.4, g, 10);
en.rotation.x = Math.PI / 2;
var fl = wMesh(new THREE.CircleGeometry(0.45, 12), glow, s * 1.6, 0.1, 5.92, g);
var gl = wGlow(0x8FD8FF, 3.2, 0.7);
gl.position.set(s * 1.6, 0.1, 6.3);
g.add(gl);
});
wBox(0.2, 2.2, 2.4, T, 0, 1.3, 3.4, g);
g.userData.isShip = 1;
return g;
},
function (G, k, name, host, off, col) {
var g = new THREE.Group(), H = wM(0xD8DCE2), C = wM(col), win = wB(0xFFE8B0, { fog: false });
var wheel = new THREE.Group();
g.add(wheel);
wMesh(new THREE.TorusGeometry(40, 5, 12, 48), H, 0, 0, 0, wheel);
for (var i = 0; i < 6; i++) {
var sp = wCyl(1.2, 1.2, 40, H, 0, 0, 0, wheel, 8);
sp.rotation.z = i / 6 * Math.PI;
}
for (var j = 0; j < 24; j++) {
var a = j / 24 * Math.PI * 2, wi = wBox(2.4, 1.4, 0.4, win, Math.cos(a) * 40, Math.sin(a) * 40, 5.1, wheel);
wi.rotation.z = a;
}
wheel.rotation.x = 0;
var hub = wCyl(9, 9, 26, H, 0, 0, 0, g, 16);
hub.rotation.x = Math.PI / 2;
wCyl(4, 4, 22, C, 0, 0, 24, g, 12).rotation.x = Math.PI / 2;
var bay = wMesh(new THREE.CircleGeometry(3.6, 16), wB(0xFFD890, { fog: false }), 0, 0, 35.1, g);
[-1, 1].forEach(function (s) { var pan = wBox(60, 0.4, 14, wM(0x2A3A7A, { e: 0x0A1030 }), s * 48, 0, -10, g); pan.userData.solar = 1; wCyl(0.8, 0.8, 30, H, s * 20, 0, -10, g, 6).rotation.z = Math.PI / 2; });
var lt = wGlow(col, 22, 0.8);
lt.position.set(0, 12, 0);
g.add(lt);
g.userData = { k: k, name: name, host: host, off: off, wheel: wheel };
G.add(g);
return g;
},
function (G) {
var g = new THREE.Group(), cr = wM(0xB890F0, { e: 0x3A1A6A, op: 0.92 }), cr2 = wM(0x70E0D0, { e: 0x10504A });
var core = wMesh(new THREE.OctahedronGeometry(30, 0), cr, 0, 0, 0, g);
core.scale.set(1, 1.8, 1);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2, sh = wMesh(new THREE.OctahedronGeometry(9, 0), i % 2 ? cr : cr2, Math.cos(a) * 60, Math.sin(i * 1.7) * 20, Math.sin(a) * 60, g);
sh.scale.set(0.6, 2.4, 0.6);
sh.rotation.z = a;
}
wMesh(new THREE.TorusGeometry(60, 1.2, 6, 64), cr2, 0, 0, 0, g).rotation.x = Math.PI / 2;
var gl = wGlow(0xC8A0FF, 160, 0.5);
g.add(gl);
g.userData = { k: "veyari", name: "The Veyari watch-station", host: "neptune", off: new THREE.Vector3(-260, 60, 180), alien: 1 };
G.add(g);
return g;
},
function (G) {
var g = new THREE.Group(), st = wM(0x5A5A6A), gl = wM(0x8AE0FF, { e: 0x2A80A0 });
wMesh(new THREE.TorusGeometry(70, 9, 10, 40), st, 0, 0, 0, g);
for (var i = 0; i < 9; i++) {
var a = i / 9 * Math.PI * 2, ch = wBox(12, 8, 22, gl, Math.cos(a) * 70, Math.sin(a) * 70, 0, g);
ch.rotation.z = a;
}
var film = wMesh(new THREE.CircleGeometry(62, 48), new THREE.MeshBasicMaterial({ color: 0x6AC8FF, transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }), 0, 0, 0, g);
g.userData.film = film;
g.position.set(Math.cos(2.4) * 15800, 900, Math.sin(2.4) * 15800);
g.lookAt(0, 900, 0);
G.add(g);
SP.gate = g;
},
function (opt) {
opt = opt || {};
var at = new THREE.Vector3();
if (opt.at)
at.copy(opt.at);
else {
spPlace();
var st = SP.stations[opt.station || "aurora"];
at.copy(st.position).add(new THREE.Vector3(0, 0, 110));
}
SP.pos = at.clone();
SP.vel = new THREE.Vector3();
SP.auto = null;
SP.heat = 0;
SP.enc = null;
SP.encAt = 60 + Math.random() * 90;
camera.position.set(SP.base + at.x, at.y, at.z);
if (opt.look) {
var d = opt.look.clone().sub(at).normalize();
yaw = Math.atan2(-d.x, -d.z);
pitch = Math.asin(Math.max(-1, Math.min(1, d.y)));
}
else {
yaw = 0;
pitch = 0;
}
spBar(true);
setStatus(opt.msg || "<b>In orbit.</b> Fly with W, S, A and D, rise with Space and sink with C; Shift to boost. <b>M</b> opens the star chart, <b>I</b> the card for the nearest world.");
},
function () {
var v = new THREE.Vector3();
SP_BODIES.forEach(function (b) { var h = SP.bodies[b.k]; if (!h)
return; spBodyPos(b.k, v); h.position.copy(v); });
["aurora", "ares", "veyari"].forEach(function (k) { var s = SP.stations[k]; if (!s)
return; var h = SP.bodies[s.userData.host]; s.position.copy(h.position).add(s.userData.off); });
},
function (dt) {
var P = camera.position, G = WORLDS.space.g;
spPlace();
SP_BODIES.forEach(function (b) { var h = SP.bodies[b.k]; if (!h || !h.userData.mesh)
return; h.userData.mesh.rotation.y += (b.spin || 0) * dt; if (h.userData.clouds)
h.userData.clouds.rotation.y += 0.012 * dt; });
if (SP.bodies.sun)
SP.bodies.sun.rotation.y += 0.01 * dt;
["aurora", "ares"].forEach(function (k) { var s = SP.stations[k]; if (s) {
s.userData.wheel.rotation.z += 0.12 * dt;
s.lookAt(SP.bodies[s.userData.host].position.clone().add(G.position));
} });
if (SP.stations.veyari)
SP.stations.veyari.rotation.y += 0.05 * dt;
SP.belt.rotation.y += 0.002 * dt;
SP.minor.forEach(function (m) { var u = m.userData, h = SP.bodies[u.host].position; u.a += u.w * dt; m.position.set(h.x + Math.cos(u.a) * u.d, h.y + Math.sin(u.a * 0.7) * u.d * 0.08, h.z + Math.sin(u.a) * u.d); });
if (SP.gate)
SP.gate.userData.film.material.opacity = 0.35 + 0.15 * Math.sin(WLD.t * 2);
var ca = WLD.t * 0.01;
SP.comet.position.set(Math.cos(ca) * 9000 + 3000, Math.sin(ca * 2) * 900, Math.sin(ca) * 4200);
SP.ships.forEach(function (s) { var b = s.userData.beat; b.a += b.w * dt; var x = Math.cos(b.a) * b.r, z = Math.sin(b.a) * b.r; s.lookAt(G.position.x + x, b.h, z); s.rotateY(Math.PI); s.position.set(x, b.h, z); });
SP.stars.position.set(SP.pos.x, SP.pos.y, SP.pos.z);
if (SP.light)
SP.light.position.set(0, 0, 0);
var f = 0, s = 0, u = 0, boost = keys["ShiftLeft"] || keys["ShiftRight"];
if (keys["KeyW"] || keys["ArrowUp"])
f += 1;
if (keys["KeyS"] || keys["ArrowDown"])
f -= 1;
if (keys["KeyA"] || keys["ArrowLeft"])
s -= 1;
if (keys["KeyD"] || keys["ArrowRight"])
s += 1;
if (keys["Space"])
u += 1;
if (keys["KeyC"] || keys["ControlLeft"])
u -= 1;
var jv = (typeof joyInput === "function" && joyInput()) || (typeof padInput === "function" && padInput());
if (jv && !f && !s) {
f = jv.f * (jv.mag || 1);
s = jv.s * (jv.mag || 1);
if (jv.run)
boost = true;
}
var fwd = new THREE.Vector3(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
var right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw)), up = new THREE.Vector3(0, 1, 0);
var want = new THREE.Vector3();
if (SP.auto) {
if (f || s || u) {
SP.auto = null;
setStatus("Autopilot off. You have the helm.");
}
else
want.copy(spAutoTick(dt));
}
if (!SP.auto) {
var sp = boost ? SP_BOOST : SP_CRUISE;
want.addScaledVector(fwd, f * sp).addScaledVector(right, s * sp).addScaledVector(up, u * sp);
}
SP.vel.lerp(want, Math.min(1, dt * (SP.auto ? 1.6 : 2.4)));
SP.pos.addScaledVector(SP.vel, dt);
SP.speed = SP.vel.length();
SP.near = null;
var nearD = 1e9, v = new THREE.Vector3();
SP_BODIES.forEach(function (b) {
var h = SP.bodies[b.k];
if (!h)
return;
v.copy(SP.pos).sub(h.position);
var d = v.length(), min = b.r * (b.k === "sun" ? 1.7 : 1.12) + 4;
if (d < min) {
SP.pos.copy(h.position).addScaledVector(v.normalize(), min);
SP.vel.multiplyScalar(0.2);
}
var rel = (d - b.r) / Math.max(b.r, 20);
if (rel < nearD) {
nearD = rel;
SP.near = { k: b.k, d: d, b: b };
}
});
["aurora", "ares", "veyari"].forEach(function (k) { var st = SP.stations[k]; v.copy(SP.pos).sub(st.position); var d = v.length(); if (d < 52) {
SP.pos.copy(st.position).addScaledVector(v.normalize(), 52);
SP.vel.multiplyScalar(0.3);
} });
var sd = SP.pos.length();
SP.heat = sd < SP_BY.sun.r * 3 ? 1 - (sd - SP_BY.sun.r * 1.7) / (SP_BY.sun.r * 1.3) : 0;
camera.position.set(SP.base + SP.pos.x, SP.pos.y, SP.pos.z);
if (typeof flyY !== "undefined")
flyY = 0;
SP.ship.visible = typeof meView !== "undefined" && meView !== "eyes";
SP.ship.position.copy(SP.pos);
SP.ship.rotation.set(0, 0, 0);
SP.ship.rotation.order = "YXZ";
SP.ship.rotation.y = yaw;
SP.ship.rotation.x = pitch;
spEncounterTick(dt);
if (typeof scMissionTick === "function")
scMissionTick(dt);
spPromptTick();
spBannerTick();
},
function (dt) {
var A = SP.auto, tp = spTargetPos(A), to = tp.clone().sub(SP.pos), d = to.length();
var dir = to.clone().normalize();
var wy = Math.atan2(-dir.x, -dir.z), wp = Math.asin(Math.max(-1, Math.min(1, dir.y)));
var dy = ((wy - yaw + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
yaw += dy * Math.min(1, dt * 2.2);
pitch += (wp - pitch) * Math.min(1, dt * 2.2);
if (d < 8) {
SP.auto = null;
SP.vel.set(0, 0, 0);
setStatus("<b>Arrived:</b> " + esc(A.name) + "." + (A.after ? " " + A.after : ""));
if (A.done)
A.done();
return new THREE.Vector3();
}
var sp = Math.min(SP_WARP, Math.max(30, d * 0.9));
return dir.multiplyScalar(sp);
},
function (A) {
if (A.pos)
return A.pos.clone();
var c, r;
if (A.station) {
var st = SP.stations[A.station];
c = st.position.clone();
r = 110;
if (A.station === "veyari")
r = 150;
}
else if (A.gate) {
c = SP.gate.position.clone();
r = 200;
}
else {
c = SP.bodies[A.k].position.clone();
r = SP_BY[A.k].r * (A.k === "sun" ? 4 : 2.6) + 20;
}
var from = SP.pos.clone().sub(c);
from.y = 0;
if (from.lengthSq() < 1)
from.set(1, 0, 0);
from.normalize();
return c.addScaledVector(from, r).add(new THREE.Vector3(0, r * 0.18, 0));
},
function () {
var v = new THREE.Vector3(), N = SP.near;
for (var k in SP.stations) {
var st = SP.stations[k];
if (SP.pos.distanceTo(st.position) < 150) {
if (st.userData.alien)
return worldPrompt("<b>The Veyari watch-station</b> · <b>press E</b> to hail them", function () { spHail("veyari"); });
return worldPrompt("<b>" + esc(st.userData.name) + "</b> · <b>press E</b> to dock", function () { worldGo("station", { station: k, keepFrom: true }); });
}
}
if (SP.gate && SP.pos.distanceTo(SP.gate.position) < 260)
return worldPrompt("<b>The Far Gate</b> · its light is moving · <b>press E</b> to fly through", function () { spThroughGate(); });
if (SP.enc && SP.enc.g && SP.pos.distanceTo(SP.enc.g.position) < 160)
return worldPrompt("<b>" + esc(SP.enc.name) + "</b> alongside · <b>press E</b> to hail them", function () { spHail(SP.enc.who); });
if (N && N.d < N.b.r * 3.4 + 30) {
if (N.k === "earth")
return worldPrompt("<b>Earth</b> · <b>press E</b> to go home: down to the Space Corp Spaceport in Somnucor", function () { spHomeToCity(); });
if (N.k === "sun")
return worldPrompt("<b>The Sun</b> · far too hot to land · <b>press E</b> for its card", function () { spInfo("sun"); });
if (N.b.land) {
var giant = SP_SURF[N.b.land] && SP_SURF[N.b.land].cloud;
return worldPrompt("<b>" + esc(N.b.name) + "</b> · <b>press E</b> to " + (giant ? "descend to the Corp's cloud station" : "land"), function () { spLand(N.b.land); });
}
return worldPrompt("<b>" + esc(N.b.name) + "</b> · <b>press E</b> for its card", function () { spInfo(N.k); });
}
worldPrompt(null);
},
function () {
var N = SP.near, where = N ? (N.d < N.b.r * 6 ? "near " + N.b.name : "between worlds") : "deep space";
var au = (SP.pos.length() / SP_BY.earth.orbit).toFixed(2);
var spd = SP.auto ? "autopilot" : SP.speed > SP_BOOST * 0.6 ? "boost" : SP.speed > 2 ? "cruising" : "holding still";
var h = "<b>Space</b> · " + esc(where) + " · " + au + " AU from the Sun · " + spd;
if (SP.heat > 0)
h += "<div style='color:#FF8A5A'><b>Hull heating.</b> The Sun's surface is about 5,500 °C. Turn away.</div>";
if (typeof scMissionBanner === "function") {
var mb = scMissionBanner();
if (mb)
h += "<div style='color:#E8C27A'>" + mb + "</div>";
}
worldBanner(h);
},
function (on) {
if (!SP.bar && on) {
var b = document.createElement("div");
b.id = "sp-bar";
b.style.cssText = "position:fixed;left:50%;top:calc(58px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:44;display:flex;gap:6px;font:12px var(--sans,system-ui)";
[["Star chart (M)", function () { spChart(); }], ["This world (I)", function () { spInfo(SP.near ? SP.near.k : "sun"); }], ["Space Corp", function () { if (typeof scBoard === "function")
scBoard(); }]].forEach(function (q) {
var x = document.createElement("button");
x.textContent = q[0];
x.style.cssText = "background:rgba(10,14,30,.88);color:#E8ECF4;border:1px solid #8FB4E8;border-radius:12px;padding:4px 10px;cursor:pointer";
x.onclick = function (e) { e.stopPropagation(); q[1](); };
b.appendChild(x);
});
document.body.appendChild(b);
SP.bar = b;
}
if (SP.bar)
SP.bar.style.display = on ? "flex" : "none";
},
function () {
var html = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Star chart</div><div style='opacity:.8'>Choose where to go and the shuttle flies you. Distances here are shrunk so you can cross them; the true ones are on each card.</div>";
var fns = {};
SP_BODIES.forEach(function (b) {
if (b.k === "charon")
return;
html += worldBtn("go-" + b.k, esc(b.name), esc(b.kind) + (b.rows && b.rows[0] ? " · " + esc(b.rows[0][1]) : ""));
fns["go-" + b.k] = function () { spFlyTo({ k: b.k, name: b.name, after: b.land ? "Press E to " + (SP_SURF[b.land] && SP_SURF[b.land].cloud ? "descend" : "land") + "." : (b.k === "earth" ? "Press E to go home." : "") }); };
});
[["aurora", "Station Aurora", "The Space Corp's station over Earth: the mission board, the quartermaster and the canteen"], ["orbital", "The Orbital: Meridian Ring", "The great ring-city over Earth: Meridian Ring's homes, shops and the Academy of Flight. Dock and walk in"], ["ares", "The Ares Gateway", "The Corp's station over Mars, for the settlers"], ["veyari", "The Veyari watch-station", "Another people's station, out by Neptune"]].forEach(function (q) {
html += worldBtn("st-" + q[0], q[1], q[2]);
fns["st-" + q[0]] = function () { spFlyTo({ station: q[0], name: q[1], after: q[0] === "veyari" ? "Press E to hail them." : "Press E to dock." }); };
});
if (spKnowsGate()) {
html += worldBtn("gate", "The Far Gate", "Beyond Pluto. Nobody knows who built it.");
fns.gate = function () { spFlyTo({ gate: 1, name: "the Far Gate", after: "Press E to fly through." }); };
}
worldCard(html, fns);
},
function (k) {
var b = SP_BY[k];
if (!b)
return;
var extra = "";
if (b.land && b.k !== "earth")
extra = worldBtn("land", "Go to " + esc(b.name), SP_SURF[b.land] && SP_SURF[b.land].cloud ? "Descend to the cloud station" : "Land and walk there");
if (WLD.on === "space")
extra += worldBtn("fly", "Fly there", "The shuttle takes you");
worldCard(worldFacts(b.name, b.kind, b.rows, b.notes, extra), { land: function () { spLand(b.land); }, fly: function () { spFlyTo({ k: b.k, name: b.name }); } });
},
function (dt) {
var G = WORLDS.space.g;
if (SP.enc) {
var E = SP.enc;
E.t += dt;
var fwd = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw)), side = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
var want = SP.pos.clone().addScaledVector(side, 60).addScaledVector(fwd, 40).add(new THREE.Vector3(0, 12, 0));
if (E.t > 70) {
want = E.g.position.clone().add(E.away.clone().multiplyScalar(dt * 400));
}
E.g.position.lerp(want, Math.min(1, dt * (E.t > 70 ? 1 : 0.6)));
E.g.rotation.y += dt * 0.6;
if (E.t > 90) {
E.g.visible = false;
SP.enc = null;
SP.encAt = 150 + Math.random() * 200;
}
return;
}
if (SP.auto || WLD.on !== "space")
return;
SP.encAt -= dt;
if (SP.encAt > 0)
return;
var far = SP.pos.length(), pick = far > 9000 ? SP_ALIENS[0] : SP_ALIENS[(Math.random() * SP_ALIENS.length) | 0];
var g = spAlienShip(pick.col, pick.who);
G.add(g);
var from = SP.pos.clone().add(new THREE.Vector3((Math.random() - 0.5) * 2000, 200, (Math.random() - 0.5) * 2000));
g.position.copy(from);
SP.enc = { who: pick.who, name: pick.name, g: g, t: 0, away: new THREE.Vector3(Math.random() - 0.5, 0.2, Math.random() - 0.5).normalize() };
if (typeof playTone === "function") {
playTone(880, 0.15);
setTimeout(function () { playTone(1320, 0.2); }, 180);
}
setStatus("<b>Contact.</b> " + esc(pick.name.charAt(0).toUpperCase() + pick.name.slice(1)) + " is coming alongside. Press E when it is close to hail them.");
},
function (col, who) {
var g = new THREE.Group(), m = wM(col, { e: col, ei: 0.25 });
if (who === "orrem") {
wMesh(new THREE.IcosahedronGeometry(9, 0), m, 0, 0, 0, g);
for (var i = 0; i < 6; i++) {
var a = wBox(0.5, 0.5, 22, wM(0x8A8A8A), 0, 0, 0, g);
a.rotation.set(i * 0.5, i * 1.1, 0);
}
}
else if (who === "tullik") {
wSph(10, m, 0, 0, 0, g, 20);
wMesh(new THREE.TorusGeometry(13, 2, 8, 24), wM(0xE8C27A), 0, 0, 0, g).rotation.x = Math.PI / 2;
}
else {
var hull = wMesh(new THREE.SphereGeometry(10, 20, 10), m, 0, 0, 0, g);
hull.scale.set(2.2, 0.45, 1.2);
wMesh(new THREE.OctahedronGeometry(5, 0), wM(0xF0E0FF, { e: 0x6A4A9A }), 0, 4, 0, g);
}
var gl = wGlow(col, 46, 0.6);
g.add(gl);
return g;
},
function (who) {
var A = null;
SP_ALIENS.forEach(function (a) { if (a.who === who)
A = a; });
if (!A)
return;
if (who === "veyari")
spLearnGate();
wTalk({ name: who === "veyari" ? "Sael of the Veyari" : who === "tullik" ? "Pip-Tullik the trader" : "Orrem Drone 7", persona: A.persona,
greet: who === "veyari" ? "Light on your path, dreamer. You have come far from the blue world. Past the small cold one, Pluto, stands a gate. We came through it. Ask, and I will tell you of it."
: who === "tullik" ? "Hello hello! Tullik trading, best prices this side of Saturn. You want to swap? I have a rock that hums."
: "Greetings. I am mapping. You are not on my map. What are you?" });
},
function (col) {
var f = document.getElementById("sp-flash");
if (!f) {
f = document.createElement("div");
f.id = "sp-flash";
f.style.cssText = "position:fixed;inset:0;z-index:60;pointer-events:none;opacity:0;transition:opacity .35s";
document.body.appendChild(f);
}
f.style.background = "#" + ("000000" + col.toString(16)).slice(-6);
f.style.transition = "opacity .5s ease";
f.style.opacity = "0.45";
setTimeout(function () { f.style.opacity = "0"; }, 520);
},
function () {
spFlash(0xFFFFFF);
var pad = spPadSpot();
if (pad) {
worldOff(true);
WLD.from = null;
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
if (r && (store.here || 0) !== r.id && typeof beHere === "function")
beHere(r.id);
camera.position.set(pad.x, pad.y + 1.72, pad.z);
yaw = pad.yaw || 0;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
if (typeof tickClock === "function")
tickClock(true);
setStatus("<b>Touchdown.</b> Back on the pad at the Space Corp Spaceport, Somnucor.");
}
else
worldHome("<b>Home.</b> The shuttle sets you down where you started.");
},
function (x, z) {
var c = SF.cfg;
if (!c)
return 0;
if (c.cloud) {
return (Math.abs(x) < 60 && Math.abs(z) < 60) ? 0 : -400;
}
var r = Math.hypot(x, z), flat = Math.min(1, Math.max(0, (r - 40) / 120));
var h = (wFbm(x * 0.004, z * 0.004, c.seed, 4) - 0.5) * c.rough * 2.2 + (wFbm(x * 0.02, z * 0.02, c.seed + 3, 2) - 0.5) * c.rough * 0.3;
(c.cr || []).forEach(function (q) { var dx = x - q[0], dz = z - q[1], d = Math.sqrt(dx * dx + dz * dz) / q[2]; if (d < 1.35) {
h += d < 1 ? (d * d - 1) * q[3] : (1.35 - d) / 0.35 * q[3] * 0.35;
} });
if (c.mtn) {
var md = Math.hypot(x - c.mtn[0], z - c.mtn[1]);
if (md < c.mtn[2])
h += Math.pow(1 - md / c.mtn[2], 1.6) * c.mtn[3];
}
return h * flat;
},
function (k) {
var c = Object.assign({}, SP_SURF[k]);
c.k = k;
c.seed = k.length * 97 + k.charCodeAt(1);
SF.k = k;
SF.cfg = c;
WORLDS.surface.gravity = c.gravity;
var W = WORLDS.surface, G = W.g;
while (G.children.length) {
var c0 = G.children[0];
G.remove(c0);
c0.traverse(function (m) { if (m.geometry && m.geometry.dispose && !m.geometry.userData.shared && !(typeof ldShared === "function" && ldShared(m.geometry)))
m.geometry.dispose(); });
}
SF.solids = [];
SF.sky = [];
SF.fx = [];
SF.sites = [];
var R = wRand(c.seed);
c.cr = [];
for (var i = 0; i < (c.craters || 0); i++) {
var rr = i < 4 ? 60 + R() * 90 : 6 + R() * 30, a = R() * Math.PI * 2, d = 180 + R() * 700;
c.cr.push([Math.cos(a) * d, Math.sin(a) * d, rr, rr * 0.22]);
}
if (k === "mars")
c.mtn = [-700, -820, 600, 180];
if (k === "pluto")
c.mtn = [650, -700, 420, 130];
if (c.cloud) {
var deck = wCyl(60, 58, 3, wM(0x6A707C), 0, -1.5, 0, G, 40);
var dk2 = wMesh(new THREE.RingGeometry(20, 21, 48), wB(0xE8C27A), 0, 0.02, 0, G);
dk2.rotation.x = -Math.PI / 2;
var rail = wMesh(new THREE.TorusGeometry(59, 0.25, 6, 64), wM(0x8A8E98), 0, 1.1, 0, G);
rail.rotation.x = Math.PI / 2;
for (var p = 0; p < 32; p++) {
var a2 = p / 32 * Math.PI * 2;
wCyl(0.12, 0.12, 1.1, wM(0x8A8E98), Math.cos(a2) * 59, 0.55, Math.sin(a2) * 59, G, 5);
}
var dome = wMesh(new THREE.SphereGeometry(14, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), wM(0xA8C8E8, { op: 0.35, ds: true }), -25, 0, -20, G);
wBox(10, 5, 8, wM(0x9AA0AA), 24, 2.5, -24, G);
wBox(10.2, 0.6, 8.2, wM(0x3A6AB8), 24, 5.2, -24, G);
SF.solids.push({ x: 24, z: -24, hw: 5, hd: 4 }, { x: -25, z: -20, r: 14 });
wSign([c.title, SP_BY[c.body].name + " · gravity " + (c.gravity / 9.81).toFixed(2) + " × Earth's"], 8, 2.4, "#0E1A2E", "#BFD8FF").position.set(0, 2.2, -40);
var bands = c.bands, cs = wTex(256, 256, function (x, Wd, H) {
for (var y = 0; y < H; y++) {
var t = Math.sin(y / H * Math.PI * 6 + Math.sin(y * 0.3) * 0.4) * 0.5 + 0.5;
x.fillStyle = "#" + new THREE.Color(bands[0]).lerp(new THREE.Color(bands[1]), t).getHexString();
x.fillRect(0, y, Wd, 1);
}
for (var i2 = 0; i2 < 300; i2++) {
x.fillStyle = "rgba(255,255,255," + (Math.random() * 0.18) + ")";
x.beginPath();
x.ellipse(Math.random() * Wd, Math.random() * H, 6 + Math.random() * 30, 2 + Math.random() * 5, 0, 0, 7);
x.fill();
}
}, [6, 6]);
var sea = wMesh(new THREE.PlaneGeometry(12000, 12000, 1, 1), new THREE.MeshLambertMaterial({ map: cs }), 0, -120, 0, G);
sea.rotation.x = -Math.PI / 2;
SF.sea = sea;
var lower = wMesh(new THREE.PlaneGeometry(12000, 12000, 1, 1), wM(bands[3], { op: 0.6 }), 0, -220, 0, G);
lower.rotation.x = -Math.PI / 2;
if (c.redspot) {
var rs = wMesh(new THREE.CircleGeometry(900, 48), wM(0xC04A2A, { op: 0.75 }), 2600, -118, -3200, G);
rs.rotation.x = -Math.PI / 2;
rs.scale.set(1.6, 1, 1);
SF.fx.push({ spin: rs });
}
if (c.rings) {
var rg = spRing(5200, 9800, 0.85, spRingTex());
rg.position.set(0, -900, -1800);
rg.rotation.x = -Math.PI / 2 + 0.32;
G.add(rg);
}
}
else {
var gr = wGround(1900, 230, function (x, z) {
var h = sfHeight(x, z), n = wFbm(x * 0.03, z * 0.03, c.seed + 9, 3), col = new THREE.Color(c.ground[0]).lerp(new THREE.Color(c.ground[1]), n);
if (c.cells) {
var cx = wNoise(x * 0.012, z * 0.012, c.seed + 21);
if (Math.abs(cx - 0.5) < 0.025)
col.lerp(new THREE.Color(0x8A7A70), 0.5);
if (Math.hypot(x - 650, z + 700) < 420)
col.setHex(0xB09484).lerp(new THREE.Color(0xD8C8B8), n);
}
return [h, col.getHex()];
});
G.add(gr);
SF.ground = gr;
var rk = new THREE.DodecahedronGeometry(1, 0), rkm = wM(c.ground[0]);
for (var j = 0; j < 160; j++) {
var a3 = R() * Math.PI * 2, d3 = 60 + R() * 820, x3 = Math.cos(a3) * d3, z3 = Math.sin(a3) * d3, s3 = 0.3 + Math.pow(R(), 3) * 3.4;
var m3 = wMesh(rk, rkm, x3, sfHeight(x3, z3) + s3 * 0.3, z3, G);
m3.scale.set(s3, s3 * 0.7, s3 * 1.1);
m3.rotation.set(R() * 3, R() * 3, R() * 3);
if (s3 > 1)
SF.solids.push({ x: x3, z: z3, r: s3 * 0.9, h: s3 });
}
var lander = sfLander();
lander.position.set(8, 0, 6);
G.add(lander);
SF.solids.push({ x: 8, z: 6, r: 3.2 });
var sg = wSign([c.title, SP_BY[c.body] ? SP_BY[c.body].name + " · gravity " + (c.gravity / 9.81).toFixed(2) + " × Earth's" : "Gravity " + (c.gravity / 9.81).toFixed(2) + " × Earth's"], 7, 2.2, "#101418", "#E8E0C8");
sg.position.set(-6, 1.6, -10);
G.add(sg);
wBox(0.15, 1.5, 0.15, wM(0x666666), -6, 0.5, -10, G);
}
(c.sky || []).forEach(function (q) {
var col = q.col, mat;
if (SP_BY[q.k] && q.k !== "sun")
mat = new THREE.MeshBasicMaterial({ map: spPaint(q.k), fog: false });
else
mat = new THREE.MeshBasicMaterial({ color: col || 0xFFF6D8, fog: false });
var m = new THREE.Mesh(new THREE.SphereGeometry(q.size, 32, 20), mat);
m.userData.dir = new THREE.Vector3(q.dir[0], q.dir[1], q.dir[2]).normalize();
m.renderOrder = -7;
G.add(m);
SF.sky.push(m);
if (q.k === "sun" || q.k === "sun2" || q.k === "sun3" || q.k === "sunstar") {
var gl = wGlow(col || 0xFFF0C0, q.size * (q.k === "sunstar" ? 10 : 4), 0.7);
m.add(gl);
}
if (q.k === "earth") {
m.add(wGlow(0x6AA8FF, q.size * 2.5, 0.25));
m.rotation.y = 2;
}
});
if (k === "venus")
SF.fx.push({ lightning: 1 });
if (c.haze) {
for (var hz = 0; hz < 3; hz++) {
var hm = wMesh(new THREE.CylinderGeometry(3000 - hz * 10, 3000 - hz * 10, 30, 48, 1, true), wB(0x6A8AD8, { op: 0.12 - hz * 0.03, ds: true, fog: false }), 0, 60 + hz * 45, 0, G);
}
}
if (c.wind) {
var wp = wPoints(900, function () { return [(Math.random() - 0.5) * 600, -20 + Math.random() * 80, (Math.random() - 0.5) * 600]; }, 0xFFFFFF, 1.4, true);
G.add(wp);
SF.wind = wp;
}
else
SF.wind = null;
if (c.site === "apollo")
sfApollo(G);
if (c.site === "jezero")
sfJezero(G);
if (k === "mars")
sfDustDevils(G);
if (c.alien)
sfVeyar(G);
if (typeof scSurfaceBuilt === "function")
scSurfaceBuilt(G, k);
camera.position.set(W.base, 1.72 + sfHeight(0, 14), 14);
yaw = 0;
pitch = 0;
setStatus("<b>" + esc(c.title) + ".</b> " + esc(c.about) + " <b>I</b> for the card · Back to take off.");
spBar(true);
},
function () {
var g = new THREE.Group(), gold = wM(0xC8A040, { e: 0x3A2A08 }), grey = wM(0xA8A8A8), dark = wM(0x3A3A3A);
var b = wBox(3.6, 1.8, 3.6, gold, 0, 2.1, 0, g);
b.rotation.y = Math.PI / 4;
var cab = wMesh(new THREE.OctahedronGeometry(1.9, 0), grey, 0, 4.2, 0, g);
cab.scale.set(1, 0.8, 1);
wMesh(new THREE.CircleGeometry(0.35, 10), wB(0x222830), 0, 4.4, 1.45, g);
[[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (q) { var l = wCyl(0.08, 0.08, 3, dark, q[0] * 2.1, 1.2, q[1] * 2.1, g, 5); l.rotation.z = -q[0] * 0.4; l.rotation.x = q[1] * 0.4; wCyl(0.45, 0.45, 0.12, dark, q[0] * 2.6, 0.06, q[1] * 2.6, g, 10); });
wCyl(0.8, 1.1, 1, dark, 0, 0.9, 0, g, 12);
return g;
},
function (G) {
var g = new THREE.Group();
g.position.set(-40, 0, -55);
G.add(g);
var y = sfHeight(-40, -55);
g.position.y = y;
var ds = new THREE.Group(), gold = wM(0xD8A838, { e: 0x40300A }), dark = wM(0x2A2A2A);
var oct = wMesh(new THREE.CylinderGeometry(2.1, 2.1, 1.6, 8), gold, 0, 1.6, 0, ds);
[[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (q) { var l = wCyl(0.07, 0.07, 2.6, wM(0xC0C0C0), q[0] * 2.1, 0.9, q[1] * 2.1, ds, 5); l.rotation.z = -q[0] * 0.45; l.rotation.x = q[1] * 0.45; wCyl(0.5, 0.5, 0.08, wM(0xC0C0C0), q[0] * 2.7, 0.04, q[1] * 2.7, ds, 10); });
var ladder = wBox(0.6, 1.6, 0.08, wM(0xC0C0C0), 0, 0.9, 2.4, ds);
ladder.rotation.x = -0.45;
var pl = wSign(["Here men from the planet Earth", "first set foot upon the Moon", "July 1969, A.D.", "We came in peace for all mankind"], 1.2, 0.8, "#B8B8B8", "#202020");
pl.position.set(0, 1.95, 2.15);
ds.add(pl);
g.add(ds);
var pole = wCyl(0.03, 0.03, 2.4, wM(0xE0E0E0), 5, 1.2, 2, g, 6);
var fl = wTex(120, 80, function (x, W, H) { for (var i = 0; i < 13; i++) {
x.fillStyle = i % 2 ? "#FFFFFF" : "#B22234";
x.fillRect(0, i * H / 13, W, H / 13 + 1);
} x.fillStyle = "#3C3B6E"; x.fillRect(0, 0, W * 0.4, H * 7 / 13); x.fillStyle = "#FFF"; for (var a = 0; a < 5; a++)
for (var b = 0; b < 6; b++) {
x.beginPath();
x.arc(4 + b * 7.5, 4 + a * 7.5, 1.4, 0, 7);
x.fill();
} });
var flag = wMesh(new THREE.PlaneGeometry(1.5, 1), new THREE.MeshLambertMaterial({ map: fl, side: THREE.DoubleSide }), 5.75, 1.9, 2, g);
wCyl(0.02, 0.02, 1.5, wM(0xE0E0E0), 5.75, 2.4, 2, g, 5).rotation.z = Math.PI / 2;
wBox(0.8, 0.5, 0.6, gold, -6, 0.25, 3, g);
[-1, 1].forEach(function (s) { wBox(1.4, 0.04, 0.7, wM(0x2A3A7A), -6 + s * 1.1, 0.5, 3, g); });
var rr = wBox(0.6, 0.05, 0.5, wM(0x8A8A8A), -3, 0.5, 6, g);
rr.rotation.x = -0.5;
wBox(0.04, 0.5, 0.04, wM(0x8A8A8A), -3, 0.25, 6, g);
wCyl(0.02, 0.02, 1.3, dark, 7, 0.65, -3, g, 4);
wBox(0.25, 0.18, 0.3, dark, 7, 1.35, -3, g);
var fpt = wTex(32, 64, function (x, W, H) { x.clearRect(0, 0, W, H); x.fillStyle = "rgba(40,38,36,0.55)"; x.beginPath(); x.ellipse(W / 2, H / 2, W * 0.42, H * 0.46, 0, 0, 7); x.fill(); x.strokeStyle = "rgba(150,146,140,0.6)"; x.lineWidth = 2; for (var i = 6; i < H - 4; i += 6) {
x.beginPath();
x.moveTo(5, i);
x.lineTo(W - 5, i);
x.stroke();
} });
var fpm = new THREE.MeshBasicMaterial({ map: fpt, transparent: true, depthWrite: false });
[[0, 2.5, 5.5, 2], [0, 2.5, -6, 3], [0, 2.5, -3, 6], [0, 2.5, 7, -3], [5, 2, 9, 8], [-6, 3, -10, -4]].forEach(function (t, k) {
var dx = t[2] - t[0], dz = t[3] - t[1], L = Math.hypot(dx, dz), a = Math.atan2(dx, dz), n = Math.floor(L / 0.75);
for (var i = 0; i < n; i++) {
var f = wMesh(new THREE.PlaneGeometry(0.13, 0.3), fpm, t[0] + dx * i / n + Math.cos(a) * (i % 2 ? 0.12 : -0.12), 0.03, t[1] + dz * i / n - Math.sin(a) * (i % 2 ? 0.12 : -0.12), g);
f.rotation.x = -Math.PI / 2;
f.rotation.z = a + Math.PI;
}
});
SF.solids.push({ x: -40, z: -55, r: 3.2 });
var card = wSign(["Tranquility Base", "Apollo 11 · 20 July 1969", "Neil Armstrong and Buzz Aldrin walked here;", "Michael Collins circled overhead in Columbia."], 4, 1.6, "#1A1A1A", "#E8E0C8");
card.position.set(-32, y + 1.5, -48);
card.rotation.y = -0.6;
G.add(card);
SF.sites.push({ x: -40, z: -55, r: 12, name: "Tranquility Base", info: worldFacts("Tranquility Base", "Apollo 11's landing site", [["Landed", "20 July 1969, 20:17 UTC"], ["Crew", "Neil Armstrong and Buzz Aldrin on the surface; Michael Collins in orbit"], ["Time outside", "about 2 hours 31 minutes"], ["Brought home", "21.5 kg of Moon rock and soil"]], ["Armstrong's first words on the Moon: \"That's one small step for [a] man, one giant leap for mankind.\"", "The descent stage you see stayed behind; the top half flew them back up to Columbia.", "The laser reflector they left is still used to measure the distance to the Moon to within a few centimetres."]) });
},
function (G) {
var rv = new THREE.Group(), w = wM(0xE8E4DC), dk = wM(0x2A2A2A);
wBox(2.6, 0.7, 1.8, w, 0, 1.1, 0, rv);
wBox(0.25, 1.4, 0.25, w, 0.9, 1.9, 0.5, rv);
wBox(0.7, 0.35, 0.35, w, 0.9, 2.7, 0.5, rv);
[[-1.1, -0.9], [0, -0.95], [1.1, -0.9], [-1.1, 0.9], [0, 0.95], [1.1, 0.9]].forEach(function (q) { var wh = wCyl(0.3, 0.3, 0.3, dk, q[0], 0.3, q[1], rv, 12); wh.rotation.x = Math.PI / 2; });
var arm = wBox(1.6, 0.12, 0.12, w, 1.8, 1.1, -0.4, rv);
wBox(0.6, 0.5, 0.7, wM(0x8A8A8A), -1.4, 1.6, 0, rv);
rv.position.set(30, sfHeight(30, -30), -30);
rv.rotation.y = 0.8;
G.add(rv);
SF.rover = rv;
SF.solids.push({ x: 30, z: -30, r: 2 });
var hel = new THREE.Group();
wBox(0.3, 0.3, 0.3, w, 0, 0.5, 0, hel);
[0, 1].forEach(function (i) { var b = wBox(1.2, 0.02, 0.1, dk, 0, 0.8 + i * 0.15, 0, hel); b.rotation.y = i * 1.57; });
[0, 1, 2, 3].forEach(function (i) { var l = wCyl(0.01, 0.01, 0.6, dk, Math.cos(i * 1.57) * 0.2, 0.2, Math.sin(i * 1.57) * 0.2, hel, 4); });
hel.position.set(60, sfHeight(60, -70), -70);
G.add(hel);
SF.sites.push({ x: 30, z: -30, r: 10, name: "The rover", info: worldFacts("A Mars rover", "Built like Perseverance", [["Landed", "18 February 2021, Jezero Crater"], ["Size", "about 3 m long, 1,025 kg"], ["Power", "a nuclear battery: plutonium heat turned into electricity"], ["Job", "looking for signs of ancient life, and sealing rock samples in tubes for a later mission to bring home"]], ["Jezero was a lake 3.5 billion years ago; the rover is exploring its old river delta.", "A little helicopter, Ingenuity, rode along: in 2021 it made the first powered flight on another planet, and flew 72 times."]) });
},
function (G) {
var cr = wM(0xC8A0F0, { e: 0x4A2A7A, op: 0.9 }), cr2 = wM(0x80F0E0, { e: 0x1A6A60 });
for (var i = 0; i < 14; i++) {
var a = i / 14 * Math.PI * 2 + 0.2, d = 140 + (i % 3) * 60, x = Math.cos(a) * d, z = Math.sin(a) * d - 200, h = 30 + (i % 4) * 24;
var t = wMesh(new THREE.CylinderGeometry(0.1, 6, h, 6), i % 2 ? cr : cr2, x, sfHeight(x, z) + h / 2, z, G);
SF.solids.push({ x: x, z: z, r: 6 });
var orb = wSph(3, wB(i % 2 ? 0xFFC8FF : 0xC8FFFF, { fog: false }), x, sfHeight(x, z) + h + 3, z, G, 12);
SF.fx.push({ bob: orb, y0: orb.position.y, a: i });
}
var R = wRand(77);
for (var j = 0; j < 60; j++) {
var x2 = (R() - 0.5) * 1400, z2 = (R() - 0.5) * 1400;
if (Math.hypot(x2, z2) < 50)
continue;
var st = wCyl(0.4, 0.6, 4 + R() * 4, wM(0x4A3A6A), x2, sfHeight(x2, z2) + 3, z2, G, 6);
var cap = wSph(2.5 + R() * 2, wM(j % 2 ? 0x70E0D0 : 0xE070C8, { e: j % 2 ? 0x206A60 : 0x6A2060 }), x2, sfHeight(x2, z2) + 7, z2, G, 10);
cap.scale.y = 0.5;
SF.solids.push({ x: x2, z: z2, r: 0.8 });
}
SF.veyari = [];
for (var k = 0; k < 6; k++) {
var v = sfVeyari();
var a2 = k / 6 * Math.PI * 2, x3 = Math.cos(a2) * 40, z3 = Math.sin(a2) * 40 - 80;
v.position.set(x3, sfHeight(x3, z3), z3);
G.add(v);
SF.veyari.push(v);
}
SF.sites.push({ x: 0, z: -80, r: 30, name: "The Veyari", talk: { name: "Ilun of the Veyari", persona: SP_ALIENS[0].persona + " You are standing in your own home city on Veyar, under your two suns, welcoming a visitor from Somnucor.", greet: "You came through the Gate! Welcome to Veyar, dreamer. Walk among our towers; ask me anything." } });
},
function () {
var g = new THREE.Group(), skin = wM(0x8A9AE8, { e: 0x1A2050 }), robe = wM(0xE8D8F8, { e: 0x2A1A40 });
wMesh(new THREE.CylinderGeometry(0.25, 0.7, 2.2, 10), robe, 0, 1.1, 0, g);
wCyl(0.12, 0.14, 0.4, skin, 0, 2.35, 0, g, 8);
var hd = wSph(0.3, skin, 0, 2.75, 0, g, 14);
hd.scale.set(0.85, 1.5, 0.9);
[-1, 1].forEach(function (s) { wSph(0.06, wB(0xFFF0A0, { fog: false }), s * 0.11, 2.82, 0.24, g, 8); var arm = wCyl(0.05, 0.06, 1.3, skin, s * 0.42, 1.6, 0, g, 6); arm.rotation.z = s * 0.18; });
g.userData.walk = { a: Math.random() * 6 };
return g;
},
function (dt) {
var c = SF.cfg;
if (!c)
return;
var P = camera.position, L = worldLocal(), G = WORLDS.surface.g;
SF.sky.forEach(function (m) { var d = m.userData.dir; m.position.set(L.x + d.x * 5200, L.y + d.y * 5200, L.z + d.z * 5200); });
if (SF.sea) {
SF.sea.position.x = L.x;
SF.sea.position.z = L.z;
var mp = SF.sea.material.map;
if (mp) {
mp.offset.x += dt * (c.wind ? 0.02 : 0.004);
}
}
if (SF.wind) {
var arr = SF.wind.geometry.attributes.position;
for (var i = 0; i < arr.count; i++) {
var x = arr.getX(i) + dt * 160;
if (x > 300)
x -= 600;
arr.setX(i, x);
}
arr.needsUpdate = true;
SF.wind.position.set(L.x, 0, L.z);
}
SF.fx.forEach(function (f) {
if (f.spin)
f.spin.rotation.z += dt * 0.02;
if (f.devil) {
f.a += dt * 0.2;
f.devil.position.x = f.cx + Math.cos(f.a) * 80;
f.devil.position.z = f.cz + Math.sin(f.a * 0.7) * 80;
f.devil.rotation.y += dt * 3;
}
if (f.bob)
f.bob.position.y = f.y0 + Math.sin(WLD.t + f.a) * 0.8;
if (f.lightning) {
if (SF.boltT > 0) {
SF.boltT -= dt;
var u = 1 - SF.boltT / 2.2;
SF.bolt = u < 0.3 ? u / 0.3 : Math.max(0, (1 - u) / 0.7);
SF.bolt *= SF.bolt * (3 - 2 * SF.bolt);
}
else {
SF.bolt = 0;
if (Math.random() < dt * 0.05) {
SF.boltT = 2.2;
if (typeof playTone === "function")
playTone(70, 0.6);
}
}
}
});
if (SF.veyari)
SF.veyari.forEach(function (v, i) { var w = v.userData.walk; if (!w)
return; w.a += dt * 0.035; var x = Math.cos(w.a + i) * 40, z = Math.sin(w.a + i) * 40 - 80; v.position.set(x, sfHeight(x, z), z); v.rotation.y = -(w.a + i); });
if (SF.rover) {
SF.rover.rotation.y += dt * 0.02;
}
var site = null;
SF.sites.forEach(function (s) { if (wNear(L.x, L.z, s.x, s.z, s.r))
site = s; });
if (typeof scSurfacePrompt === "function" && scSurfacePrompt(L)) { }
else if (site && site.talk)
worldPrompt("<b>" + esc(site.name) + "</b> · <b>press E</b> to speak with them", function () { wTalk(site.talk); });
else if (site)
worldPrompt("<b>" + esc(site.name) + "</b> · <b>press E</b> to read about it", function () { worldCard(site.info); });
else if (wNear(L.x, L.z, 8, 6, 7))
worldPrompt("<b>Your lander</b> · <b>press E</b> to take off", function () { sfTakeOff(); });
else
worldPrompt(null);
var h = "<b>" + esc(c.title) + "</b> · gravity " + (c.gravity / 9.81).toFixed(2) + " × Earth's" + (c.cloud ? "" : " · Space to jump");
var ldx = 8 - L.x, ldz = 6 - L.z, ld = Math.hypot(ldx, ldz);
if (ld > 7) {
var lrel = (Math.atan2(ldx, ldz) - (yaw + Math.PI)) * 180 / Math.PI;
h += "<div>Your lander, the way home: " + Math.round(ld) + " m <span style='display:inline-block;transform:rotate(" + (-lrel).toFixed(0) + "deg)'>↑</span> · walk to it and press E to take off</div>";
}
else
h += "<div>At your lander: <b>press E</b> to take off, then fly to Earth and press E to land home</div>";
if (typeof scMissionBanner === "function") {
var mb = scMissionBanner();
if (mb)
h += "<div style='color:#E8C27A'>" + mb + "</div>";
}
worldBanner(h);
},
function () {
var c = SF.cfg;
if (!c)
return;
var b = c.body ? SP_BY[c.body] : null;
if (b)
worldCard(worldFacts(b.name, c.title, b.rows, [c.about].concat(b.notes)));
else
worldCard(worldFacts("Veyar", "The world beyond the Far Gate", [["Suns", "Two: a rose star and a small blue one"], ["Gravity", (c.gravity / 9.81).toFixed(2) + " × Earth's"], ["People", "The Veyari"]], [c.about, "In our own galaxy astronomers have found thousands of planets round other stars, and many stars that come in pairs."]));
},
function () {
var c = SF.cfg, k = SF.k;
spFlash(0xFFFFFF);
if (k === "veyar") {
worldGo("space", { at: SP.gate ? SP.gate.position.clone().add(new THREE.Vector3(0, 0, 0)).addScaledVector(SP.gate.position.clone().normalize(), -260) : new THREE.Vector3(0, 0, 15000), look: new THREE.Vector3(0, 0, 0), keepFrom: true, msg: "<b>Back through the Gate.</b> Pluto's sun is a bright star ahead." });
return;
}
var host = SP.bodies[c.body], at;
if (host) {
spPlace();
var away = SF.ret && SF.ret.at ? SF.ret.at.clone() : host.position.clone().add(new THREE.Vector3(0, 0, SP_BY[c.body].r * 3));
at = away;
}
worldGo("space", { at: at, look: host ? host.position.clone() : null, keepFrom: true, msg: "<b>Lift-off.</b> " + esc(SP_BY[c.body] ? SP_BY[c.body].name : "The world") + " falls away below you." });
},
function (opt) {
STN.k = opt.station || "aurora";
var host = STN.k === "ares" ? "mars" : "earth";
STN.view.material.map = spPaint(host);
STN.view.material.needsUpdate = true;
STN.name = STN.k === "ares" ? "The Ares Gateway" : "Station Aurora";
STN.nameSign.material.map = wSign([STN.name, "Space Corp · a branch of the Dragon Corp"], 10, 2.4, "#0E1A2E", "#BFD8FF").material.map;
camera.position.set(this.base, 1.72, 22);
yaw = 0;
pitch = 0;
spBar(true);
setStatus("<b>" + esc(STN.name) + ".</b> The Space Corp's station: the mission board, the quartermaster and the canteen. " + (host === "earth" ? "Earth" : "Mars") + " fills the great window. Back to return to your shuttle.");
},
function (G) {
var floor = wM(0x2E3440), wall = wM(0xB8C0CC), wall2 = wM(0x4A5464), trim = wM(0x3A6AB8), lightM = wB(0xDDEEFF, { fog: false }), glow = wB(0x6AC8FF, { fog: false });
wBox(54, 0.2, 66, floor, 0, -0.1, -2, G);
for (var gx = -24; gx <= 24; gx += 6)
wBox(0.06, 0.02, 64, wM(0x3E4656), gx, 0.01, -2, G);
for (var gz = -32; gz <= 28; gz += 6)
wBox(52, 0.02, 0.06, wM(0x3E4656), 0, 0.01, gz, G);
wBox(54, 0.2, 66, wM(0x5A6474, { e: 0x30363F }), 0, 6.1, -2, G);
for (var i = -3; i <= 3; i++) {
wBox(24, 0.08, 0.5, lightM, 0, 5.98, i * 9, G);
wBox(54, 0.5, 0.6, wall2, 0, 5.75, i * 9 + 4.5, G);
}
[-1, 1].forEach(function (sd) {
var gaps = STN_GAPS[sd] || [], z0 = -35;
gaps.concat([null]).forEach(function (gz) {
var z1 = gz === null ? 31 : gz - 2.2;
if (z1 > z0) {
var L = z1 - z0, mz = (z0 + z1) / 2;
wBox(0.4, 6, L, wall, sd * 27, 3, mz, G);
wBox(0.42, 1.2, L, wall2, sd * 27, 0.6, mz, G);
wBox(0.1, 0.12, L, glow, sd * 26.75, 1.25, mz, G);
}
if (gz !== null) {
wBox(0.4, 2, 4.4, wall, sd * 27, 5, gz, G);
z0 = gz + 2.2;
}
});
for (var r = -32; r <= 28; r += 4) {
if (gaps.some(function (g) { return Math.abs(r - g) < 2.6; }))
continue;
wBox(0.6, 6, 0.5, wall2, sd * 26.8, 3, r, G);
}
});
wBox(54, 6, 0.4, wall, 0, 3, 30.5, G);
wBox(54, 1.2, 0.42, wall2, 0, 0.6, 30.5, G);
wBox(54, 0.6, 0.8, trim, 0, 0.3, -34.5, G);
wBox(54, 0.8, 0.8, wall2, 0, 5.7, -34.5, G);
for (var j = -3; j <= 3; j++)
wBox(0.5, 6, 0.8, wall2, j * 8.6, 3, -34.5, G);
var view = wMesh(new THREE.SphereGeometry(320, 64, 40), new THREE.MeshLambertMaterial({ map: spPaint("earth") }), 0, -200, -440, G);
STN.view = view;
view.add(wGlow(0x6AA8FF, 760, 0.22));
for (var c = -2; c <= 2; c++) {
var cs = wBox(5, 1, 1.2, wall2, c * 9, 0.5, -29, G);
var scr = wBox(4.4, 0.05, 0.9, wB(c % 2 ? 0x2A8AC8 : 0x3AC88A, { fog: false }), c * 9, 1.03, -29, G);
scr.rotation.x = -0.3;
STN.solids.push({ x: c * 9, z: -29, hw: 2.5, hd: 0.6 });
}
for (var h = 0; h < 4; h++) {
var bed = wBox(6, 0.8, 1.4, wM(0x5A6474), -22, 0.4, -18 + h * 5, G);
for (var pl = 0; pl < 6; pl++)
wSph(0.35, wM(0x4A9A4A), -24.5 + pl, 1.05, -18 + h * 5, G, 6);
wBox(6, 0.06, 1.4, wB(0xE89AF0, { op: 0.6, fog: false }), -22, 2.6, -18 + h * 5, G);
STN.solids.push({ x: -22, z: -18 + h * 5, hw: 3, hd: 0.7 });
}
var stf = wPoints(1500, function () { var a = Math.random() * Math.PI, b = (Math.random() - 0.2) * Math.PI * 0.6; return [Math.cos(a) * 2000 * Math.cos(b) - 0, Math.sin(b) * 2000, -Math.abs(Math.sin(a)) * 2000 - 200]; }, 0xFFFFFF, 1.6, false);
G.add(stf);
var sunLamp = new THREE.PointLight(0xFFF0D8, 0.8, 0);
sunLamp.position.set(-600, 300, -400);
G.add(sunLamp);
var ns = wSign(["Station Aurora", "Space Corp · a branch of the Dragon Corp"], 10, 2.4, "#0E1A2E", "#BFD8FF");
ns.position.set(0, 4.4, 30.2);
ns.rotation.y = Math.PI;
G.add(ns);
STN.nameSign = ns;
var mb = wSign(["SPACE CORP MISSIONS", "Patrol · Survey · Settlement", "Press E to read the board"], 6, 3, "#0A1424", "#8FD8FF");
mb.position.set(-26.7, 2.6, 0);
mb.rotation.y = Math.PI / 2;
G.add(mb);
STN.spots.push({ x: -24, z: 0, r: 3.5, name: "The mission board", fn: function () { if (typeof scBoard === "function")
scBoard(); } });
wBox(8, 1.1, 1.6, wM(0x4A5A6A), 20, 0.55, -10, G);
wBox(0.3, 3, 6, wM(0x2A3440), 26.6, 1.5, -10, G);
STN.solids.push({ x: 20, z: -10, hw: 4, hd: 0.8 });
for (var r = 0; r < 4; r++) {
var rack = wBox(0.1, 0.15, 1.2, wM(r % 2 ? 0x6AE0FF : 0xD8DCE4, { e: r % 2 ? 0x2A80A0 : 0 }), 26.4, 1.2 + r * 0.4, -10 + (r - 1.5) * 0.8, G);
}
STN.spots.push({ x: 20, z: -8, r: 3, name: "The quartermaster", fn: function () { if (typeof scQuartermaster === "function")
scQuartermaster(); } });
for (var t = 0; t < 3; t++) {
wCyl(1.4, 1.4, 0.1, wM(0x9AA2AE), -14 + t * 6, 0.95, 18, G, 20);
wCyl(1.42, 1.42, 0.04, wM(0x3A424E), -14 + t * 6, 0.93, 18, G, 20);
wCyl(0.15, 0.15, 0.95, wM(0x8A8E98), -14 + t * 6, 0.47, 18, G, 8);
STN.solids.push({ x: -14 + t * 6, z: 18, r: 1.4 });
}
wBox(10, 1.1, 1.4, wM(0xC8CCD4), -14, 0.55, 27, G);
STN.solids.push({ x: -14, z: 27, hw: 5, hd: 0.7 });
STN.spots.push({ x: -14, z: 24.5, r: 3, name: "The canteen", fn: function () { worldCard(worldFacts("Eating in space", "What the Corp serves, and why", [], ["Crumbs are dangerous in weightlessness: they float into eyes and machines, so astronauts use tortillas instead of bread.", "Food tastes blander in orbit: fluids drift to the head and it feels like a cold.", "Water on the International Space Station is recycled, from the air, from washing and from urine, and it is cleaner than most tap water.", "This station spins its outer wheel to make a pull like gravity, so here you can eat at a table."])); } });
(function () {
var st = wM(0x6E7684), st2 = wM(0x4E5664), fr = wM(0x2E3440), hz = wM(0xE8B830), dk = wM(0x1A1E24), gl = wB(0x8AD0FF, { fog: false }), red = wB(0xFF5A3A, { fog: false });
wBox(9.2, 0.6, 0.6, fr, 0, 5.3, 30.15, G);
wBox(0.6, 5.6, 0.6, fr, -4.3, 2.8, 30.15, G);
wBox(0.6, 5.6, 0.6, fr, 4.3, 2.8, 30.15, G);
[-1, 1].forEach(function (sd) {
var cx = sd * 1.98;
wBox(3.94, 5, 0.24, sd < 0 ? st : st2, cx, 2.5, 30.22, G);
for (var r = 0; r < 5; r++)
wBox(3.7, 0.12, 0.08, fr, cx, 0.9 + r * 0.95, 30.08, G);
for (var c = 0; c < 6; c++) {
var hx = cx - 1.65 + c * 0.66;
var b = wBox(0.34, 0.5, 0.06, c % 2 ? dk : hz, hx, 0.3, 30.07, G);
b.rotation.z = 0.5;
}
var pw = new THREE.Mesh(new THREE.CircleGeometry(0.42, 20), gl);
pw.position.set(cx, 3.6, 30.06);
pw.rotation.y = Math.PI;
G.add(pw);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.07, 6, 20), fr);
ring.position.set(cx, 3.6, 30.05);
G.add(ring);
});
wBox(0.08, 5, 0.3, dk, 0, 2.5, 30.1, G);
wBox(0.5, 0.3, 0.1, red, 3.6, 4.6, 30.0, G);
wBox(0.5, 0.3, 0.1, red, -3.6, 4.6, 30.0, G);
var bay = wSign(["HANGAR BAY 2", "Your shuttle"], 3, 0.8, "#0E1A2E", "#E8C27A");
bay.position.set(0, 6.1, 29.8);
bay.rotation.y = Math.PI;
G.add(bay);
})();
STN.spots.push({ x: 0, z: 27, r: 3.5, name: "The hangar", fn: function () { WORLDS.station.back(); } });
wBox(50, 1, 0.15, wM(0x8A8E98, { op: 0.6 }), 0, 1, -31, G);
STN.solids.push({ x: 0, z: -31.5, hw: 25, hd: 0.4 });
var crew = [["qm", 20, -11.6, 0, "Station quartermaster", 0, 0], ["mo", -24.5, 2.5, Math.PI / 2, "Mission officer", 0, 0], ["cook", -14, 28.2, Math.PI, "Cook", 0, 0],
["c1", -4, 4, 0, "Patrol pilot", 1, 9], ["c2", 6, -14, 2, "Survey officer", 1, 10], ["c3", -10, -6, 1, "Settlement engineer", 1, 8], ["c4", 2, 16, 3, "Patrol pilot", 1, 8]];
crew.forEach(function (q) {
try {
var look = q[4] === "Cook" ? {} : { layer: "uniform", layerColor: 0x24335E, bottom: 0x1A2238, shoes: 0x111111, hat: null };
var g = wPerson("stn_" + q[0], { title: q[4], place: "Station Aurora", look: look });
g.position.set(q[1], 0, q[2]);
g.rotation.y = q[3];
G.add(g);
if (q[5])
STN.people.push({ g: g, r: q[6] });
}
catch (e) { }
});
if (typeof scStationBuilt === "function")
scStationBuilt(G);
},
function (dt) {
var L = worldLocal();
STN.people.forEach(function (p) { wWander(p.g, dt, null, { r: p.r, sp: 1.1 }); });
if (STN.view)
STN.view.rotation.y += dt * 0.01;
var s = null;
STN.spots.forEach(function (q) { if (wNear(L.x, L.z, q.x, q.z, q.r))
s = q; });
if (typeof scStationPrompt === "function" && scStationPrompt(L)) { }
else if (s)
worldPrompt("<b>" + esc(s.name) + "</b> · <b>press E</b>", s.fn);
else
worldPrompt(null);
var h = "<b>" + esc(STN.name || "Station Aurora") + "</b> · Space Corp";
if (typeof scMissionBanner === "function") {
var mb = scMissionBanner();
if (mb)
h += "<div style='color:#E8C27A'>" + mb + "</div>";
}
worldBanner(h);
}
];
});
