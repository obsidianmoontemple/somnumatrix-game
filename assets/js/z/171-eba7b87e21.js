/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(171, function () {
"use strict";
return [
function (i) {
i = (((i | 0) % 6) + 6) % 6;
var g = new THREE.Group(), wood = fM(0x7A4E2A), cl = FEST_COLS[i % 6];
g.add(P(new THREE.BoxGeometry(2.6, 1.0, 1.1), wood, 0, 0.5, 0));
[-1.2, 1.2].forEach(function (x) { g.add(P(new THREE.CylinderGeometry(0.06, 0.06, 2.4, 6), wood, x, 1.2, -0.45)); g.add(P(new THREE.CylinderGeometry(0.06, 0.06, 2.4, 6), wood, x, 1.2, 0.45)); });
var roof = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.12, 1.6), new THREE.MeshLambertMaterial({ map: festStripes("#" + new THREE.Color(cl).getHexString(), "#FFF4E0", 8) }));
roof.position.y = 2.45;
g.add(roof);
for (var k = 0; k < 10; k++) {
var x = -1.35 + k * 0.3;
g.add(P(new THREE.SphereGeometry(0.11, 6, 5), fM(BAC_VINE), x, 2.3, 0.78));
if (k % 2 === 0)
for (var q = 0; q < 5; q++)
g.add(P(new THREE.SphereGeometry(0.045, 6, 4), fM(BAC_GRAPE), x + (q % 2) * 0.05 - 0.02, 2.12 - q * 0.05, 0.82));
}
[-0.8, 0.8].forEach(function (x) { var b = P(new THREE.CylinderGeometry(0.3, 0.3, 0.7, 12), fM(0x8A5A30), x, 0.35, -0.95); g.add(b); g.add(P(new THREE.TorusGeometry(0.31, 0.02, 4, 16), fM(0x3A3A3A), x, 0.55, -0.95, Math.PI / 2)); });
for (var j = 0; j < 4; j++)
g.add(P(new THREE.CylinderGeometry(0.06, 0.09, 0.24, 8), fM([0xA0522D, 0x6A2A7A, 0xE8D8B0, 0x3A5A2A][j]), -0.9 + j * 0.6, 1.12, 0.2));
var sg = festSignMesh(["BACCHUS' WINES", "HONEY CAKES", "ROAST & PIE", "SWEET FIGS", "SPICED CIDER", "GRAPE ICE"][i % 6], "the Bacchanal", 2.4, 0.6);
sg.position.set(0, 2.85, 0.6);
g.add(sg);
return g;
},
function () {
var g = new THREE.Group();
g.add(P(new THREE.CylinderGeometry(0.42, 0.22, 0.5, 10), fM(0x3A2A1E), 0, 1.25, 0));
g.add(P(new THREE.CylinderGeometry(0.04, 0.06, 1.0, 6), fM(0x2A1E14), 0, 0.5, 0));
var fl = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.9, 8), new THREE.MeshBasicMaterial({ color: 0xFF9A2A, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
fl.position.y = 1.85;
g.add(fl);
var fl2 = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.6, 8), new THREE.MeshBasicMaterial({ color: 0xFFE07A, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }));
fl2.position.y = 1.75;
g.add(fl2);
g.userData.fl = [fl, fl2];
return g;
},
function (tragic) {
var g = new THREE.Group(), gold = fM(0xE8C040);
var face = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.62), gold);
face.scale.set(0.9, 1.15, 0.45);
face.rotation.x = Math.PI / 2;
g.add(face);
var dark = fM(0x1A1020);
[-0.35, 0.35].forEach(function (x) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), dark); e.scale.set(1.2, 0.7, 0.4); e.position.set(x, 0.25, 0.42); e.rotation.z = (tragic ? -1 : 1) * x * 0.9; g.add(e); });
var mouth = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.07, 6, 16, Math.PI), dark);
mouth.position.set(0, tragic ? -0.5 : -0.25, 0.42);
mouth.rotation.z = tragic ? 0 : Math.PI;
g.add(mouth);
[-1, 1].forEach(function (s) { var rb = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.4, 0.02), fM(tragic ? 0x4A2AC8 : 0xC8283A)); rb.position.set(s * 0.85, -0.6, 0); rb.rotation.z = s * 0.25; g.add(rb); });
return g;
},
function (PC) {
var G = FEST.street;
if (!G)
return;
BAC.band = [];
BAC.dancers = [];
BAC.fire = [];
var lite = typeof LITE !== "undefined" && LITE, reach = lite ? 110 : 200, step = 40, nd = 0, maxD = lite ? 16 : 56, ns = 0, bulbs = [];
var dc = Math.hypot(PC.x - ATLC.x, PC.z - ATLC.z), ac = Math.atan2(PC.z - ATLC.z, PC.x - ATLC.x), spots = [];
FEST_RINGS.forEach(function (rs, ri) {
if (Math.abs(rs - dc) > reach + 30)
return;
[1, -1].forEach(function (side) {
var rk = rs + side * (ATL_ROAD + 3.6), span = reach / rk, i0 = Math.ceil((ac - span) * rk / step), i1 = Math.floor((ac + span) * rk / step);
for (var i = i0; i <= i1; i++) {
var a = (i * step + (side > 0 ? 0 : step / 2)) / rk, x = ATLC.x + Math.cos(a) * rk, z = ATLC.z + Math.sin(a) * rk;
spots.push({ i: i, a: a, x: x, z: z, ri: ri, side: side, rk: rk, d: Math.hypot(x - PC.x, z - PC.z) });
}
});
});
spots.sort(function (p, q) { return p.d - q.d; });
spots.forEach(function (sp) {
var i = sp.i, a = sp.a, x = sp.x, z = sp.z, ri = sp.ri, side = sp.side, kind = ((i % 4) + 4) % 4;
if (!atlClearAt(sp.rk, a, 2.2, 2) || (typeof blockedAt === "function" && blockedAt(x, z, 0)))
return;
var y = terrainY(x, z), id = "bac_" + ri + "_" + side + "_" + i;
if ((kind === 0 || kind === 2) && nd < maxD) {
var n = kind === 0 ? 8 : 6, grp = new THREE.Group();
grp.position.set(x, y, z);
G.add(grp);
for (var k = 0; k < n && nd < maxD; k++, nd++) {
var fg = bacFigure(id + "_" + k, i * 7 + k, "dance"), aa = k / n * Math.PI * 2;
fg.position.set(Math.cos(aa) * 2.1, 0, Math.sin(aa) * 2.1);
fg.rotation.y = Math.atan2(-Math.cos(aa), -Math.sin(aa)) + Math.PI;
grp.add(fg);
BAC.dancers.push({ g: fg, a: aa, ph: (i * 13 + k * 7) % 10, grp: grp, night: k >= 4 });
}
if (kind === 0) {
var br = bacBrazier();
br.position.set(0, 0, 0);
grp.add(br);
BAC.fire.push(br);
bulbs.push([x, y + 1.9, z, 0xFFA040, 3.5, i]);
}
}
else if (kind === 1) {
var st = bacStall(i + ri);
st.position.set(x, y, z);
st.rotation.y = rotIn(a) + (side > 0 ? Math.PI : 0);
G.add(st);
ns++;
[-1.2, 0, 1.2].forEach(function (dx) { var c = Math.cos(st.rotation.y), s = Math.sin(st.rotation.y); bulbs.push([x + dx * c, y + 2.6, z - dx * s, FEST_COLS[(i + ns) % 6], 1.6, dx]); });
}
else if (kind === 3 && BAC.band.length < 4) {
var bg = new THREE.Group();
bg.position.set(x, y, z);
bg.rotation.y = rotIn(a) + (side > 0 ? Math.PI : 0);
G.add(bg);
["drum", "lute", "horn"].forEach(function (r, k) {
var fg = bacFigure(id + "_b" + k, i + k, "band");
fg.position.set((k - 1) * 1.1, 0, 0);
bg.add(fg);
if (r === "drum") {
var dr = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.3, 12), fM(0xF4ECD8));
dr.position.set(0, 1.0, 0.32);
dr.rotation.x = Math.PI / 2;
fg.add(dr);
}
if (r === "lute") {
var lu = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), fM(0xA0622A));
lu.scale.set(1, 1.3, 0.4);
lu.position.set(0.1, 1.05, 0.28);
fg.add(lu);
fg.add(P(new THREE.BoxGeometry(0.05, 0.5, 0.03), fM(0x5A3A1A), 0.25, 1.3, 0.28, 0, 0, -0.6));
}
if (r === "horn") {
var hn = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 10, 1, true), fM(0xE8C040));
hn.material.side = THREE.DoubleSide;
hn.position.set(0, 1.5, 0.4);
hn.rotation.x = -Math.PI / 2 + 0.3;
fg.add(hn);
}
BAC.dancers.push({ g: fg, a: 0, ph: k * 2, grp: bg, band: r });
});
BAC.band.push({ x: x, z: z });
}
});
ATL_STAIRS.filter(function (s) { return s.main; }).forEach(function (s) {
FEST_RINGS.forEach(function (rs) {
var R = rs - ATL_ROAD - 6;
if (R < 200)
return;
var x = ATLC.x + Math.cos(s.a) * R, z = ATLC.z + Math.sin(s.a) * R;
if (Math.hypot(x - PC.x, z - PC.z) > reach + 40)
return;
var y = terrainY(x, z), half = (s.half * 2 + 2) * 0.8 / 2 + 0.6;
[-1, 1].forEach(function (sd) {
var m = bacMask(sd > 0);
var ra = rotIn(s.a), c = Math.cos(ra), sn = Math.sin(ra);
m.position.set(x + sd * half * c, y + 6.4, z - sd * half * sn);
m.rotation.y = ra;
m.scale.setScalar(0.85);
G.add(m);
});
});
});
if (bulbs.length)
festBulbs(bulbs, G);
BAC.built = nd;
},
function () {
if (BAC.conf)
return BAC.conf;
var N = (typeof LITE !== "undefined" && LITE) ? 500 : 1400, pos = new Float32Array(N * 3), col = new Float32Array(N * 3), vel = [], c = new THREE.Color();
for (var i = 0; i < N; i++) {
pos[i * 3] = (Math.random() - 0.5) * 90;
pos[i * 3 + 1] = Math.random() * 24;
pos[i * 3 + 2] = (Math.random() - 0.5) * 90;
c.setHex(FEST_COLS[i % FEST_COLS.length]);
col[i * 3] = c.r;
col[i * 3 + 1] = c.g;
col[i * 3 + 2] = c.b;
vel.push([Math.random() * 0.6 - 0.3, 0.5 + Math.random() * 0.7, Math.random() * 0.6 - 0.3, Math.random() * 6]);
}
var geo = new THREE.BufferGeometry();
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
var mat = new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false });
var pts = new THREE.Points(geo, mat);
pts.frustumCulled = false;
pts.raycast = function () { };
scene.add(pts);
return (BAC.conf = { p: pts, vel: vel, N: N });
},
function (dt, night) {
var C = bacConfetti(), P = camera.position, a = C.p.geometry.attributes.position, t = performance.now() / 1000;
C.p.visible = true;
C.p.material.size = night ? 0.3 : 0.22;
C.p.material.blending = night ? THREE.AdditiveBlending : THREE.NormalBlending;
var by = terrainY(P.x, P.z);
for (var i = 0; i < C.N; i++) {
var v = C.vel[i], x = a.getX(i) + (v[0] + Math.sin(t * 1.3 + v[3]) * 0.5) * dt, y = a.getY(i) - v[1] * dt, z = a.getZ(i) + (v[2] + Math.cos(t * 1.1 + v[3]) * 0.5) * dt;
if (y < by - 0.2 || Math.abs(x - P.x) > 45 || Math.abs(z - P.z) > 45) {
x = P.x + (Math.random() - 0.5) * 90;
z = P.z + (Math.random() - 0.5) * 90;
y = by + 14 + Math.random() * 12;
}
a.setXYZ(i, x, y, z);
}
a.needsUpdate = true;
},
function () {
var g = new THREE.Group();
g.name = "Bacchus Procession";
scene.add(g);
var cart = new THREE.Group();
g.add(cart);
cart.add(P(new THREE.BoxGeometry(3.4, 0.8, 6), fM(0x6A2A7A), 0, 1.0, 0));
for (var w = 0; w < 4; w++) {
var wh = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.2, 16), fM(0xE8C040));
wh.rotation.z = Math.PI / 2;
wh.position.set(w < 2 ? -1.8 : 1.8, 0.6, w % 2 ? -2 : 2);
cart.add(wh);
}
for (var q = 0; q < 26; q++) {
var r = q < 1 ? 0 : q < 7 ? 0.7 : q < 15 ? 1.1 : q < 21 ? 0.8 : 0.4, lay = q < 1 ? 0 : q < 7 ? 1 : q < 15 ? 2 : q < 21 ? 3 : 4, aa = q * 2.39;
cart.add(P(new THREE.SphereGeometry(0.45, 10, 8), fM(BAC_GRAPE), Math.cos(aa) * r, 5.2 - lay * 0.62, -1.8 + Math.sin(aa) * r));
}
cart.add(P(new THREE.ConeGeometry(0.9, 0.6, 5), fM(BAC_VINE), 0, 5.7, -1.8));
var bar = P(new THREE.CylinderGeometry(0.8, 0.8, 1.6, 14), fM(0x8A5A30), 0, 1.9, 1.9, 0, 0, Math.PI / 2);
cart.add(bar);
cart.add(P(new THREE.BoxGeometry(1.4, 1.6, 1.1), fM(0xE8C040), 0, 2.2, 0.0));
var L = (typeof randomLook === "function") ? randomLook("bacchus", "human") : blankLook("human");
L.sex = "m";
L.topKind = "robe";
L.top = 0x8A2A8A;
L.hair = 0x3A2414;
L.beard = 1;
L.hat = "crown";
L.hatColor = 0x3E7A2E;
var B = buildFigure({ id: "__bacchus", archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
B.position.set(0, 2.0, 0.2);
B.scale.setScalar(1.25);
cart.add(B);
var cup = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.05, 0.2, 10), fM(0xE8C040));
cup.position.set(0.32, 1.55, 0.35);
B.add(cup);
var walkers = [];
for (var i = 0; i < 14; i++) {
var torch = i % 3 === 0, fg = bacFigure("__bacp" + i, i, "dance");
if (torch) {
fg.add(P(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 5), fM(0x3A2414), 0.3, 1.4, 0.15));
var fl = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 8), new THREE.MeshBasicMaterial({ color: 0xFFA03A, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }));
fl.position.set(0.3, 2.0, 0.15);
fg.add(fl);
}
g.add(fg);
walkers.push({ g: fg, torch: torch });
}
BAC.proc = { g: g, cart: cart, walkers: walkers };
cart.traverse(function (m) { m.raycast = function () { }; });
},
function (dt, t) {
var on = bacBacchanalHours(), P = camera.position;
if (!on) {
if (BAC.proc)
BAC.proc.g.visible = false;
return;
}
var dc = Math.hypot(P.x - ATLC.x, P.z - ATLC.z), R = FEST_RINGS.filter(function (r) { return decorQuarterAt(r) !== "warrens"; }).reduce(function (b, r) { return Math.abs(r - dc) < Math.abs(b - dc) ? r : b; }, FEST_RINGS[0]);
var h = dreamHour(), mins = ((h >= 22 ? h - 22 : h + 2)) * 60, sp = 1.4, a = (mins * 60 * sp) / R + R * 0.37;
var x = ATLC.x + Math.cos(a) * R, z = ATLC.z + Math.sin(a) * R;
if (Math.hypot(x - P.x, z - P.z) > 320) {
if (BAC.proc)
BAC.proc.g.visible = false;
BAC.procNear = Math.hypot(x - P.x, z - P.z);
return;
}
if (!BAC.proc)
bacProcMake();
var G = BAC.proc;
G.g.visible = true;
BAC.procNear = Math.hypot(x - P.x, z - P.z);
G.cart.position.set(x, terrainY(x, z), z);
G.cart.rotation.y = Math.atan2(-Math.sin(a), Math.cos(a));
G.walkers.forEach(function (w, i) {
var back = 6 + Math.floor(i / 2) * 2.2, lat = (i % 2 ? 1 : -1) * 1.3, aa = a - back / R, rr = R + lat;
var wx = ATLC.x + Math.cos(aa) * rr, wz = ATLC.z + Math.sin(aa) * rr;
w.g.position.set(wx, terrainY(wx, wz) + Math.abs(Math.sin(t * 4 + i)) * 0.12, wz);
w.g.rotation.y = Math.atan2(-Math.sin(aa), Math.cos(aa)) + Math.sin(t * 2 + i) * 0.4;
});
},
function (dt) {
if (typeof audio === "undefined" || !audio.on || !audio.ctx)
return;
var P = camera.position, d = 1e9;
BAC.band.forEach(function (b) { d = Math.min(d, Math.hypot(b.x - P.x, b.z - P.z)); });
if (BAC.proc && BAC.proc.g.visible)
d = Math.min(d, BAC.procNear || 1e9);
var ctx = audio.ctx;
if (!BAC.snd) {
var g = ctx.createGain();
g.gain.value = 0;
g.connect(audio.master);
var cr = ctx.createBufferSource();
cr.buffer = audio.buf;
cr.loop = true;
var cf = ctx.createBiquadFilter();
cf.type = "bandpass";
cf.frequency.value = 480;
cf.Q.value = 0.8;
var cg = ctx.createGain();
cg.gain.value = 0;
cr.connect(cf);
cf.connect(cg);
cg.connect(audio.master);
cr.start();
BAC.snd = { g: g, crowd: cg };
BAC.beatAt = ctx.currentTime + 0.1;
}
var vol = d < 70 ? Math.max(0, 1 - d / 70) * 0.55 : 0, night = bacNight();
BAC.snd.g.gain.setTargetAtTime(vol, ctx.currentTime, 0.3);
BAC.snd.crowd.gain.setTargetAtTime(Math.min(0.05, BAC.dancers.length * 0.002) * (night ? 1 : 0.5), ctx.currentTime, 0.5);
if (vol <= 0.01) {
BAC.beatAt = ctx.currentTime + 0.1;
return;
}
var beat = 0.25;
if (BAC.beatAt < ctx.currentTime)
BAC.beatAt = ctx.currentTime + 0.05;
while (BAC.beatAt < ctx.currentTime + 1.0) {
var t0 = BAC.beatAt, s = BAC.step % 16;
if (s % 4 === 0 || s === 10) {
var o = ctx.createOscillator(), og = ctx.createGain();
o.frequency.setValueAtTime(130, t0);
o.frequency.exponentialRampToValueAtTime(45, t0 + 0.15);
og.gain.setValueAtTime(0.9, t0);
og.gain.exponentialRampToValueAtTime(0.001, t0 + 0.2);
o.connect(og);
og.connect(BAC.snd.g);
o.start(t0);
o.stop(t0 + 0.22);
}
if (s % 2 === 1) {
var n = ctx.createBufferSource();
n.buffer = audio.buf;
var nf = ctx.createBiquadFilter();
nf.type = "bandpass";
nf.frequency.value = 7000;
var ng = ctx.createGain();
ng.gain.setValueAtTime(0.06, t0);
ng.gain.exponentialRampToValueAtTime(0.001, t0 + 0.08);
n.connect(nf);
nf.connect(ng);
ng.connect(BAC.snd.g);
n.start(t0, Math.random());
n.stop(t0 + 0.1);
}
if (s % 2 === 0 || Math.random() < 0.3) {
BAC.note = Math.max(0, Math.min(BAC_SCALE.length - 1, (BAC.note || 3) + Math.round(Math.random() * 2 - 1) * (Math.random() < 0.7 ? 1 : 2)));
var f = 293.66 * Math.pow(2, BAC_SCALE[BAC.note] / 12), m = ctx.createOscillator(), mg = ctx.createGain();
m.type = BAC.step % 32 < 16 ? "triangle" : "square";
m.frequency.value = f;
mg.gain.setValueAtTime(0.0001, t0);
mg.gain.linearRampToValueAtTime(m.type === "square" ? 0.06 : 0.16, t0 + 0.02);
mg.gain.exponentialRampToValueAtTime(0.001, t0 + beat * 0.95);
m.connect(mg);
mg.connect(BAC.snd.g);
m.start(t0);
m.stop(t0 + beat);
}
BAC.beatAt += beat;
BAC.step++;
}
},
function (dt) {
var t = performance.now() / 1000, night = bacNight(), late = bacBacchanalHours();
BAC.dancers.forEach(function (d) {
if (d.night)
d.g.visible = night;
var real = d.g.userData.rbReal;
if (d.band) {
d.g.position.y = real ? 0 : Math.abs(Math.sin(t * 4 + d.ph)) * 0.05;
d.g.rotation.z = real ? 0 : Math.sin(t * 4 + d.ph) * 0.04;
return;
}
d.g.userData.danceMove = 1;
d.g.userData.dance = late ? "wild" : "party";
var sp = late ? 5.2 : 3.6, b = real ? 0 : Math.abs(Math.sin(t * sp + d.ph)), a = d.a + t * (real ? (late ? 0.16 : 0.11) : (late ? 0.5 : 0.3));
d.g.position.set(Math.cos(a) * 2.1, b * 0.18, Math.sin(a) * 2.1);
d.g.rotation.y = -a + (real ? Math.PI / 2 + Math.sin(t * 0.4 + d.ph) * 0.6 : Math.sin(t * 2 + d.ph) * 0.5);
d.g.rotation.z = real ? 0 : Math.sin(t * sp / 2 + d.ph) * 0.06;
});
BAC.fire.forEach(function (f) { f.visible = true; var k = night ? 1 : 0.6; f.userData.fl.forEach(function (m, i) { m.scale.set(1, k * (0.85 + Math.sin(t * (11 + i * 4) + i) * 0.18 + Math.random() * 0.08), 1); m.material.opacity = night ? 0.9 : 0.55; }); });
bacConfettiTick(Math.min(dt, 0.1), night);
bacProcTick(dt, t);
bacSound(dt);
}
];
});
