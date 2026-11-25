/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(168, function () {
"use strict";
return [
function (f) {
if (f.userData.fireDressed)
return;
f.userData.fireDressed = 1;
var flames = [];
f.children.forEach(function (c) { if (c.userData && c.userData.flicker)
flames.push(c); });
var fl = new THREE.Group();
fl.position.set(0, 0, 0.08);
f.add(fl);
var logs = new THREE.Group();
logs.position.set(0, 0.12, 0.08);
f.add(logs);
[-0.18, 0.18].forEach(function (x, i) { var l = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.75, 6), new THREE.MeshLambertMaterial({ color: 0x4A3020 })); l.rotation.z = Math.PI / 2; l.rotation.y = i ? 0.25 : -0.25; l.scale.y = 0.8; l.position.set(0, 0.02 + i * 0.06, 0); logs.add(l); });
[[0, 0.38, 0.24, 0.55, 0xFF8A2A], [-0.18, 0.3, 0.15, 0.4, 0xFFB23A], [0.17, 0.3, 0.15, 0.42, 0xFFB23A], [0, 0.28, 0.1, 0.3, 0xFFF0A0]].forEach(function (q) { var c = new THREE.Mesh(new THREE.ConeGeometry(q[2], q[3], 6), new THREE.MeshBasicMaterial({ color: q[4], transparent: true, opacity: 0.9 })); c.position.set(q[0], q[1], 0); c.userData.flicker = 1; fl.add(c); });
var glow = (typeof wGlow === "function") ? wGlow(0xFF9A3A, 1.6, 0.8) : null;
if (glow) {
glow.position.set(0, 0.35, 0.1);
fl.add(glow);
}
var ash = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.3, 0.04, 10), new THREE.MeshLambertMaterial({ color: 0x5A5450 }));
ash.position.set(0, 0.07, 0.06);
f.add(ash);
ash.visible = false;
f.userData.fireFl = fl;
f.userData.fireOld = flames;
f.userData.fireAsh = ash;
},
function () {
if (INT.fireChecked)
return;
INT.fireChecked = 1;
var sp = INT.spec || {};
var home = (INT.wpKey && /^lot:/.test(INT.wpKey)) || /^(house|cottage|cabin|mansion|townhouse|farmhouse|manor|bungalow|hut)$/.test(sp.archetype || "") ||
(sp.city && typeof lotPlots === "function" && lotPlots().some(function (q) { return q.homeId === sp.id; }));
var has = INT.root.children.some(function (c) { return c.userData && c.userData.furn === "fireplace"; });
if (has || !home || typeof FURN === "undefined" || !FURN.fireplace)
return;
var best = null;
[-1, 1].forEach(function (sd) {
[0, -0.25, 0.2].forEach(function (f) {
var x = sd * (INT.W / 2 - 0.45), z = f * INT.D, clear = 99;
INT.root.children.forEach(function (c) { if (!c.userData || !c.userData.furn || c.position.y > 1)
return; clear = Math.min(clear, Math.hypot(c.position.x - x, c.position.z - z)); });
if (!best || clear > best.c)
best = { x: x, z: z, r: sd > 0 ? -Math.PI / 2 : Math.PI / 2, c: clear };
});
});
var g = FURN.fireplace();
g.userData.furn = "fireplace";
g.position.set(best.x, 0, best.z);
g.rotation.y = best.r;
INT.root.add(g);
},
function (f) {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The fireplace</div><div style='opacity:.85;margin:4px 0 8px'>The fire is out. Cold air comes down the chimney, and with it, very faintly, the sound of bells.</div>" +
worldBtn("light", "Light the fire", "Logs, a spark, and it's burning again") + worldBtn("exam", "Examine the fireplace", "Look up the chimney"), { light: function () { worldCard(null); fireSet(f.userData.fireKey, true); fireShow(f, true); FIRE.on = null; if (typeof playTone === "function")
playTone(330, 0.2); setStatus("<b>The fire catches.</b> Warm again."); },
exam: function () { worldCard(null); FIRE.on = null; worldPromptCity(null); npDown(); } });
},
function () {
setStatus("<b>You lean into the cold hearth and look up the chimney.</b> A flurry of snow comes down, a jingle of bells, and then the whole world turns over…");
if (typeof playTone === "function") {
[1568, 1760, 2093, 2349, 2637].forEach(function (f, i) { setTimeout(function () { playTone(f, 0.18); }, i * 120); });
}
var fx = document.createElement("div");
fx.style.cssText = "position:fixed;inset:0;background:radial-gradient(circle,#FFFFFF,#BFD8FF);opacity:0;transition:opacity .8s;z-index:60;pointer-events:none";
document.body.appendChild(fx);
requestAnimationFrame(function () { fx.style.opacity = "1"; });
setTimeout(function () { worldGo("northpole"); fx.style.opacity = "0"; setTimeout(function () { fx.remove(); }, 900); }, 900);
},
function (x, z) {
var h = (wFbm(x * 0.008, z * 0.008, 77, 3) - 0.5) * 4;
if (z < -170) {
h = -0.2 + (wFbm(x * 0.03, z * 0.03, 78, 2) - 0.5) * 1.2;
var r = Math.abs(Math.sin((x * 0.7 + z) * 0.02));
if (r > 0.97)
h += 2.2 * (r - 0.97) / 0.03;
}
var vd = Math.hypot(x, z + 10);
if (vd < 110)
h *= Math.max(0, (vd - 60) / 50);
for (var si = 0; si < NP_SITES.length; si++) {
var q = NP_SITES[si];
if (!q[4])
continue;
var sd = Math.hypot(x - q[0], z - q[1]);
if (sd >= q[2] + 10)
continue;
if (q[5] === undefined)
q[5] = (wFbm(q[0] * 0.008, q[1] * 0.008, 77, 3) - 0.5) * 4;
h = h + (q[5] - h) * Math.min(1, (q[2] + 10 - sd) / 10);
}
return h;
},
function (r, h, seed, snow) {
var seg = (typeof LITE !== "undefined" && LITE) ? 10 : 18, g = new THREE.ConeGeometry(r, h, seg, 3, true), P = g.attributes.position, col = new Float32Array(P.count * 3), c = new THREE.Color();
for (var k = 0; k < P.count; k++) {
var x = P.getX(k), z = P.getZ(k), y = P.getY(k), d = Math.hypot(x, z);
if (d > 0.01) {
var a = Math.atan2(z, x), jag = 1 + (snow ? 0.22 : 0.14) * Math.sin(a * (snow ? 5 : 11) + seed) + (snow ? 0 : 0.08 * Math.sin(a * 23 + seed * 3));
P.setXYZ(k, x * jag, y - (d / r) * (d / r) * h * 0.45, z * jag);
}
var t = Math.min(1, d / r);
if (snow)
c.setRGB(0.93 + t * 0.05, 0.95 + t * 0.04, 1);
else
c.setRGB(0.07 + t * 0.1, 0.2 + t * 0.17, 0.12 + t * 0.08);
col[k * 3] = c.r;
col[k * 3 + 1] = c.g;
col[k * 3 + 2] = c.b;
}
g.setAttribute("color", new THREE.BufferAttribute(col, 3));
return g.toNonIndexed();
},
function () {
if (NP.pineGeo)
return NP.pineGeo;
var b = [], sn = [], tiers = (typeof LITE !== "undefined" && LITE) ? 4 : 6;
for (var t = 0; t < tiers; t++) {
var f = t / (tiers - 1), r = 2.9 * (1 - f * 0.8) + 0.3, y = 2.0 + f * 6.6, h = 2.3 - f * 0.8;
var g = npTierGeo(r, h, t * 1.7, false);
g.translate(0, y, 0);
b.push(g);
var g2 = npTierGeo(r * 0.86, h * 0.5, t * 2.3, true);
g2.translate(0, y + h * 0.32, 0);
sn.push(g2);
}
var tr = new THREE.CylinderGeometry(0.2, 0.34, 2.4, 6).toNonIndexed();
tr.translate(0, 1.2, 0);
var tc = new Float32Array(tr.attributes.position.count * 3);
for (var i = 0; i < tc.length; i += 3) {
tc[i] = 0.3;
tc[i + 1] = 0.2;
tc[i + 2] = 0.13;
}
tr.setAttribute("color", new THREE.BufferAttribute(tc, 3));
b.push(tr);
function merge(L) {
var n = 0;
L.forEach(function (g) { n += g.attributes.position.count; });
var pos = new Float32Array(n * 3), col = new Float32Array(n * 3), o = 0;
L.forEach(function (g) { pos.set(g.attributes.position.array, o * 3); col.set(g.attributes.color.array, o * 3); o += g.attributes.position.count; g.dispose(); });
var m = new THREE.BufferGeometry();
m.setAttribute("position", new THREE.BufferAttribute(pos, 3));
m.setAttribute("color", new THREE.BufferAttribute(col, 3));
m.computeVertexNormals();
m.computeBoundingSphere();
return m;
}
NP.pineGeo = { b: merge(b), s: merge(sn) };
return NP.pineGeo;
},
function (G, L) {
if (!L.length)
return;
var gs = npPineGeos(), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3();
var bm = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }), smat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
[[gs.b, bm], [gs.s, smat]].forEach(function (P) {
var im = new THREE.InstancedMesh(P[0], P[1], L.length);
L.forEach(function (p, i) { e.set(0, p[4], 0); q.setFromEuler(e); v.set(p[0], p[1] - 0.1, p[2]); sc.set(p[3], p[3] * (0.95 + ((i * 37) % 10) / 40), p[3]); m4.compose(v, q, sc); im.setMatrixAt(i, m4); });
im.instanceMatrix.needsUpdate = true;
im.castShadow = true;
im.receiveShadow = true;
im.raycast = function () { };
im.userData.noCull = true;
im.frustumCulled = false;
im.name = "np-pines";
G.add(im);
});
},
function (G) {
var snowC = 0xF4F8FF;
var gr = wGround(1600, 180, function (x, z) { var h = npHeight(x, z); var c = new THREE.Color(snowC); if (z < -170)
c.setHex(0xD8E8F4); if (h > 1.4 && z < -170)
c.setHex(0xEAF4FF); c.offsetHSL(0, 0, (wNoise(x * 0.2, z * 0.2, 3) - 0.5) * 0.04); return [h, c.getHex()]; });
G.add(gr);
NP.ground = gr;
NP.G = G;
var R = wRand(4242);
var pines = [];
for (var i = 0; i < 120; i++) {
var a = R() * 6.283, d = 120 + R() * 300, x = Math.cos(a) * d, z = Math.sin(a) * d;
if (z < -150)
continue;
if (NP_SITES.some(function (q) { return !q[4] && Math.hypot(x - q[0], z - q[1]) < q[2]; }))
continue;
var h = npHeight(x, z), s = 0.8 + R() * 1.2;
if (NP_SITES.some(function (q) { return q[4] && Math.hypot(x - q[0], z - q[1]) < q[2] + 3; }))
continue;
pines.push([x, h, z, s, (x * 13.1 + z * 7.7) % 6.283]);
NP.solids.push({ x: x, z: z, r: 0.5 * s });
}
npPines(G, pines);
var tr = new THREE.Group();
tr.position.set(0, 0, 18);
G.add(tr);
wCyl(0.6, 0.9, 3, wM(0x4A3020), 0, 1.5, 0, tr, 8);
var gtm = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide, color: 0xD8F0DC });
for (var l = 0; l < 6; l++) {
var tg = npTierGeo(7 - l * 1.05, 4.2, l * 1.3, false);
tg.computeVertexNormals();
wMesh(tg, gtm, 0, 3.4 + l * 2.9, 0, tr);
var tsn = npTierGeo((7 - l * 1.05) * 0.84, 1.6, l * 2.1, true);
tsn.computeVertexNormals();
wMesh(tsn, new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }), 0, 3.4 + l * 2.9 + 1.1, 0, tr);
}
var star = wMesh(new THREE.OctahedronGeometry(1.1, 0), wB(0xFFE070, { fog: false }), 0, 21.5, 0, tr);
NP.star = star;
var sg = wGlow(0xFFE070, 8, 0.9);
sg.position.y = 21.5;
tr.add(sg);
for (var b = 0; b < 90; b++) {
var y = 3 + R() * 17, rr = (7 - (y - 3) / 2.9 * 1.05) * 0.85, ba = R() * 6.283;
var bl = wSph(0.22, wB([0xFF3A3A, 0xFFD24A, 0x3A8AFF, 0x4AE07A, 0xF08AF0][b % 5], { fog: false }), Math.cos(ba) * rr, y, Math.sin(ba) * rr, tr, 6);
NP.lights.push(bl);
}
for (var pr = 0; pr < 12; pr++) {
var pa = pr / 12 * 6.283, px = Math.cos(pa) * (6 + pr % 2), pz = Math.sin(pa) * (6 + pr % 2);
var pk = new THREE.Group();
var sz = 0.6 + (pr % 3) * 0.3;
wBox(sz, sz, sz, wM([0xC83A3A, 0x3A7AC8, 0x3AA85A, 0xE8C83A][pr % 4]), 0, sz / 2, 0, pk);
wBox(sz + 0.02, sz + 0.02, 0.12, wM(0xF4F0E8), 0, sz / 2, 0, pk);
wBox(0.12, sz + 0.02, sz + 0.02, wM(0xF4F0E8), 0, sz / 2, 0, pk);
pk.position.set(px, 0, pz);
pk.rotation.y = pa;
tr.add(pk);
}
NP.solids.push({ x: 0, z: 18, r: 6 });
npWorkshop(G);
npStable(G);
npPostOffice(G);
npCottage(G);
npPole(G);
npPaddock(G);
npFoundry(G);
npTestHall(G);
npListOffice(G);
npWrapping(G);
npMossBarn(G);
npCandles(G);
npYuleGoat(G);
for (var lp = 0; lp < 12; lp++) {
var la = lp / 12 * 6.283, lx = Math.cos(la) * 38, lz = 18 + Math.sin(la) * 38;
var p = new THREE.Group();
p.position.set(lx, npHeight(lx, lz), lz);
G.add(p);
var pole = wCyl(0.12, 0.12, 4, new THREE.MeshLambertMaterial({ map: npStripes() }), 0, 2, 0, p, 8);
wSph(0.35, wB(0xFFE8B0, { fog: false }), 0, 4.2, 0, p, 8);
var lg = wGlow(0xFFD890, 3.5, 0.7);
lg.position.y = 4.2;
p.add(lg);
}
for (var au = 0; au < 4; au++) {
var ag = new THREE.PlaneGeometry(900, 90, 90, 1), am = new THREE.MeshBasicMaterial({ map: npAuroraTex(au), transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
var m = wMesh(ag, am, (au - 1.5) * 120, 170 + au * 25, -420 - au * 90, G);
m.userData.base = ag.attributes.position.array.slice();
m.userData.ph = au * 1.7;
NP.aurora.push(m);
}
NP.snow = wPoints(1600, function () { return [(Math.random() - 0.5) * 120, Math.random() * 50, (Math.random() - 0.5) * 120]; }, 0xFFFFFF, 0.18, true);
G.add(NP.snow);
[[90, -240, 1], [110, -250, 0.6], [-140, -300, 1.1]].forEach(function (q, i) { var bear = npBear(q[2]); bear.position.set(q[0], npHeight(q[0], q[1]), q[1]); G.add(bear); NP.bears.push({ g: bear, hx: q[0], hz: q[1], a: i * 2, t: 0 }); });
var fox = npFox();
fox.position.set(-70, npHeight(-70, 40), 40);
G.add(fox);
NP.fox = fox;
var tl = new THREE.PointLight(0xFFD890, 1.1, 90, 1.4);
tl.position.set(0, 14, 18);
G.add(tl);
},
function (k) {
return wTex(512, 128, function (x, W, H) {
var g = x.createLinearGradient(0, H, 0, 0);
g.addColorStop(0, "rgba(80,255,160,0.0)");
g.addColorStop(0.15, k % 2 ? "rgba(80,255,170,0.95)" : "rgba(120,255,200,0.9)");
g.addColorStop(0.55, k % 2 ? "rgba(60,200,160,0.45)" : "rgba(140,90,255,0.45)");
g.addColorStop(1, "rgba(160,80,255,0)");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.globalCompositeOperation = "destination-out";
for (var i = 0; i < 60; i++) {
x.fillStyle = "rgba(0,0,0," + (0.2 + Math.random() * 0.5) + ")";
x.fillRect(Math.random() * W, 0, 2 + Math.random() * 10, H);
}
});
},
function (G) {
var x0 = 0, z0 = -40, W = 44, D = 26, H = 8;
var g = new THREE.Group();
g.position.set(x0, 0, z0);
G.add(g);
NP.shop = { x: x0, z: z0, W: W, D: D };
var wall = wM(0x8A3A2A), wood = wM(0x6A4A2E), trim = wM(0xF4F0E8), roofM = new THREE.MeshLambertMaterial({ color: 0xB82A2A, side: THREE.DoubleSide }), inner = new THREE.MeshLambertMaterial({ color: 0xC8A070, side: THREE.DoubleSide });
wBox(W, 0.3, D, wM(0x8A6A4A), 0, 0.15, 0, g);
wBox(W, H, 0.6, inner, 0, H / 2, -D / 2, g);
wBox(0.6, H, D, inner, -W / 2, H / 2, 0, g);
wBox(0.6, H, D, inner, W / 2, H / 2, 0, g);
wBox((W - 8) / 2, H, 0.6, inner, -(W + 8) / 4, H / 2, D / 2, g);
wBox((W - 8) / 2, H, 0.6, inner, (W + 8) / 4, H / 2, D / 2, g);
wBox(8, H - 5.5, 0.6, inner, 0, H - (H - 5.5) / 2, D / 2, g);
[[0, -D / 2 - 0.31, W, 0], [0, D / 2 + 0.31, W, 0]].forEach(function (q) { var p = wMesh(new THREE.PlaneGeometry(q[2], H), wall, q[0], H / 2, q[1], g); if (q[1] < 0)
p.rotation.y = Math.PI; });
[-1, 1].forEach(function (s) { var p = wMesh(new THREE.PlaneGeometry(D, H), wall, s * (W / 2 + 0.31), H / 2, 0, g); p.rotation.y = s * Math.PI / 2; });
for (var w = 0; w < 6; w++) {
var wx = -W / 2 + 4 + w * (W - 8) / 5;
if (Math.abs(wx) < 5)
continue;
[D / 2 + 0.33, -D / 2 - 0.33].forEach(function (z) { var win = wMesh(new THREE.PlaneGeometry(2.2, 2.8), wB(0xFFD890, { fog: true }), wx, 4, z, g); if (z < 0)
win.rotation.y = Math.PI; var fr = wMesh(new THREE.PlaneGeometry(2.6, 3.2), trim, wx, 4, z + (z > 0 ? -0.01 : 0.01), g); if (z < 0)
fr.rotation.y = Math.PI; });
}
var rl = Math.hypot(D / 2 + 1, 7), ang = Math.atan2(7, D / 2 + 1);
[-1, 1].forEach(function (s) { var r = wBox(W + 2, 0.4, rl, roofM, 0, H + 3.5, s * (D / 2 + 1) / 2, g); r.rotation.x = s * ang; var sn = wBox(W + 2.1, 0.15, rl, wM(0xF4F8FF), 0, H + 3.75, s * (D / 2 + 1) / 2, g); sn.rotation.x = s * ang; });
[-1, 1].forEach(function (s) { var tri = new THREE.Shape(); tri.moveTo(-D / 2, 0); tri.lineTo(D / 2, 0); tri.lineTo(0, 7); tri.lineTo(-D / 2, 0); var gm = wMesh(new THREE.ShapeGeometry(tri), new THREE.MeshLambertMaterial({ color: 0x8A3A2A, side: THREE.DoubleSide }), s * W / 2, H, 0, g); gm.rotation.y = Math.PI / 2; });
var sign = wSign(["Santa's Workshop", "Toys made with care since time out of mind"], 9, 2, "#1E4A32", "#FFE8A0");
sign.position.set(0, H - 1.2, D / 2 + 0.45);
g.add(sign);
wBox(2.2, 6, 2.2, wM(0x8A5A4A), W / 2 - 6, H + 5, -D / 4, g);
NP.chim = { x: x0 + W / 2 - 6, y: H + 8.5, z: z0 - D / 4 };
var lamp = new THREE.PointLight(0xFFD8A0, 1.2, 50, 1.2);
lamp.position.set(0, H - 1, 0);
g.add(lamp);
var lamp2 = new THREE.PointLight(0xFFD8A0, 0.8, 40, 1.2);
lamp2.position.set(-14, H - 1, 0);
g.add(lamp2);
for (var bn = 0; bn < 4; bn++) {
var bx = -15 + bn * 10, bz = -4;
wBox(6, 0.2, 2, wood, bx, 1.05, bz, g);
[-2.6, 2.6].forEach(function (lx) { wBox(0.2, 1, 1.6, wood, bx + lx, 0.5, bz, g); });
for (var ty = 0; ty < 4; ty++) {
npToy(g, bx - 2 + ty * 1.3, 1.15, bz, (bn * 4 + ty) % 6);
}
NP.solids.push({ x: x0 + bx, z: z0 + bz, hw: 3.1, hd: 1.1 });
}
wBox(26, 0.9, 1.6, wM(0x3A3A3E), -4, 0.45, 6, g);
wBox(26, 0.06, 1.4, wM(0x1A1A1E), -4, 0.93, 6, g);
NP.solids.push({ x: x0 - 4, z: z0 + 6, hw: 13, hd: 0.9 });
for (var p = 0; p < 9; p++) {
var pk = new THREE.Group(), sz = 0.5 + (p % 3) * 0.2;
wBox(sz, sz, sz, wM([0xC83A3A, 0x3A7AC8, 0x3AA85A, 0xE8C83A, 0xA83AC8][p % 5]), 0, 0, 0, pk);
wBox(sz + 0.02, 0.1, sz + 0.02, wM(0xF4F0E8), 0, 0, 0, pk);
pk.position.set(-17 + p * 3, 0.96 + sz / 2, 6);
g.add(pk);
NP.belt.push({ g: pk, x: -17 + p * 3 });
}
wBox(3.6, 1, 1.8, wM(0x5A3A22), 14, 0.5, -8, g);
NP.solids.push({ x: x0 + 14, z: z0 - 8, hw: 1.9, hd: 1 });
var list = new THREE.Group();
var scr = wMesh(new THREE.PlaneGeometry(0.9, 3.2), new THREE.MeshLambertMaterial({ map: npListTex(), side: THREE.DoubleSide }), 0, 0, 0, list);
scr.rotation.x = -1.2;
list.position.set(14, 1.15, -7.2);
g.add(list);
wCyl(0.08, 0.08, 1, wM(0xD8C8A8), 0, 0, 0, list, 6).rotation.z = Math.PI / 2;
var fp = new THREE.Group();
fp.position.set(0, 0, -D / 2 + 0.8);
g.add(fp);
wBox(5, 4.2, 1.2, wM(0x8A5A4A), 0, 2.1, 0, fp);
wBox(3, 2.4, 0.4, wB(0x1A100A), 0, 1.4, 0.45, fp);
wBox(5.6, 0.3, 1.6, wM(0x6A4A2E), 0, 4.3, 0.1, fp);
NP.fire = [];
[[0, 0.9, 0.6, 1.4, 0xFF8A2A], [-0.6, 0.7, 0.4, 1, 0xFFB23A], [0.6, 0.7, 0.4, 1.05, 0xFFB23A], [0, 0.6, 0.3, 0.7, 0xFFF0A0]].forEach(function (q) { var c = wMesh(new THREE.ConeGeometry(q[2], q[3], 6), wB(q[4], { fog: false }), q[0], q[1], 0.55, fp); NP.fire.push(c); });
var fg = wGlow(0xFF9A3A, 4, 0.8);
fg.position.set(0, 1, 0.7);
fp.add(fg);
for (var st = 0; st < 5; st++) {
var sk = new THREE.Group();
wBox(0.35, 0.6, 0.15, wM([0xC82A2A, 0x2A8A4A][st % 2]), 0, 0, 0, sk);
wBox(0.4, 0.15, 0.17, wM(0xF4F0E8), 0, 0.3, 0, sk);
wBox(0.3, 0.2, 0.15, wM([0xC82A2A, 0x2A8A4A][st % 2]), 0.12, -0.35, 0, sk);
sk.position.set(-2 + st, 3.7, 0.7);
fp.add(sk);
}
NP.solids.push({ x: x0, z: z0 - D / 2 + 0.8, hw: 2.6, hd: 0.7 });
NP.homeFire = { x: x0, z: z0 - D / 2 + 2.4 };
NP.solids.push({ x: x0, z: z0 - D / 2, hw: W / 2, hd: 0.4 }, { x: x0 - W / 2, z: z0, hw: 0.4, hd: D / 2 }, { x: x0 + W / 2, z: z0, hw: 0.4, hd: D / 2 }, { x: x0 - (W + 8) / 4, z: z0 + D / 2, hw: (W - 8) / 4, hd: 0.4 }, { x: x0 + (W + 8) / 4, z: z0 + D / 2, hw: (W - 8) / 4, hd: 0.4 });
},
function () { return wTex(128, 448, function (x, W, H) { x.fillStyle = "#F2E6C8"; x.fillRect(0, 0, W, H); x.fillStyle = "#5A2A1A"; x.font = "bold 15px Georgia"; x.textAlign = "center"; x.fillText("The List", W / 2, 22); x.font = "9px Georgia"; for (var i = 0; i < 34; i++) {
x.fillRect(10, 36 + i * 12, 40 + ((i * 37) % 50), 2);
x.fillText("✓", W - 14, 40 + i * 12);
} }); },
function (g, x, y, z, k) {
var t = new THREE.Group();
t.position.set(x, y, z);
g.add(t);
if (k === 0) {
wBox(0.4, 0.4, 0.4, wM(0xC83A3A), 0, 0.2, 0, t);
wBox(0.3, 0.3, 0.3, wM(0x3A7AC8), 0.1, 0.55, 0, t);
}
else if (k === 1) {
wSph(0.22, wM(0x8A5A3A), 0, 0.22, 0, t, 8);
wSph(0.15, wM(0x8A5A3A), 0, 0.5, 0, t, 8);
wSph(0.06, wM(0x8A5A3A), -0.1, 0.62, 0, t, 6);
wSph(0.06, wM(0x8A5A3A), 0.1, 0.62, 0, t, 6);
}
else if (k === 2) {
wBox(0.7, 0.25, 0.3, wM(0x2A6A3A), 0, 0.2, 0, t);
wCyl(0.08, 0.08, 0.25, wM(0x1A1A1A), 0.2, 0.42, 0, t, 6);
[-0.25, 0, 0.25].forEach(function (wx) { wCyl(0.09, 0.09, 0.34, wM(0xC83A3A), wx, 0.09, 0, t, 8).rotation.x = Math.PI / 2; });
}
else if (k === 3) {
wSph(0.25, wM(0xE8C83A), 0, 0.25, 0, t, 10);
}
else if (k === 4) {
wCyl(0.2, 0.2, 0.45, wM(0xC83A3A), 0, 0.22, 0, t, 10);
wCone(0.22, 0.25, wM(0x2A2A2A), 0, 0.57, 0, t, 10);
}
else {
wBox(0.15, 0.6, 0.15, wM(0x3A7AC8), 0, 0.3, 0, t);
wSph(0.12, wM(0xF0C8A0), 0, 0.7, 0, t, 8);
}
},
function (name, red) {
var g = new THREE.Group(), fur = wM(0x7A5A3E), pale = wM(0xD8C8B0), dark = wM(0x3A2A1E);
var body = wSph(0.6, fur, 0, 1.25, 0, g, 10);
body.scale.set(0.75, 0.7, 1.5);
var rump = wSph(0.35, pale, 0, 1.25, -0.8, g, 8);
var neck = wCyl(0.18, 0.26, 0.8, fur, 0, 1.7, 0.75, g, 8);
neck.rotation.x = 0.6;
var head = new THREE.Group();
head.position.set(0, 2.05, 1.05);
g.add(head);
var hd = wSph(0.22, fur, 0, 0, 0.05, head, 8);
hd.scale.set(0.8, 0.85, 1.4);
wSph(0.12, pale, 0, -0.05, 0.3, head, 6);
var nose = wSph(0.08, red ? wB(0xFF2A2A, { fog: false }) : dark, 0, -0.02, 0.4, head, 6);
if (red) {
var ng = wGlow(0xFF3A3A, 1.2, 0.9);
ng.position.set(0, -0.02, 0.45);
head.add(ng);
g.userData.nose = nose;
}
[-1, 1].forEach(function (s) {
var an = new THREE.Group();
an.position.set(s * 0.1, 0.18, -0.02);
head.add(an);
var m = wCyl(0.025, 0.035, 0.6, wM(0xD8C8A0), 0, 0.3, 0, an, 5);
m.rotation.z = s * -0.4;
m.position.x = s * 0.12;
for (var t = 0; t < 3; t++) {
var tn = wCyl(0.018, 0.025, 0.28, wM(0xD8C8A0), s * (0.18 + t * 0.06), 0.25 + t * 0.13, 0.06, an, 4);
tn.rotation.x = -0.7;
tn.rotation.z = s * -0.2;
}
var ear = wCone(0.06, 0.18, fur, s * 0.17, 0.06, -0.08, head, 5);
ear.rotation.z = s * 1.1;
});
g.userData.legs = [];
[[-0.25, 0.55], [0.25, 0.55], [-0.25, -0.6], [0.25, -0.6]].forEach(function (q) { var lg = new THREE.Group(); lg.position.set(q[0], 1.0, q[1]); g.add(lg); wCyl(0.07, 0.05, 1, fur, 0, -0.5, 0, lg, 6); wCyl(0.07, 0.07, 0.1, dark, 0, -0.98, 0, lg, 6); g.userData.legs.push(lg); });
var tail = wCone(0.08, 0.2, pale, 0, 1.4, -0.95, g, 5);
tail.rotation.x = -2.2;
var harness = wMesh(new THREE.TorusGeometry(0.48, 0.06, 6, 16), wM(0xA82A2A), 0, 1.3, 0.5, g);
harness.scale.set(0.8, 1, 1);
for (var b = 0; b < 5; b++) {
var a = -1 + b * 0.5;
wSph(0.06, wM(0xE8C83A), Math.sin(a) * 0.4, 1.3 + Math.cos(a) * 0.48, 0.5, g, 6);
}
g.userData.name = name;
return g;
},
function (G) {
var x0 = -62, z0 = -14;
var g = new THREE.Group();
g.position.set(x0, 0, z0);
G.add(g);
var wood = wM(0x6A4A2E), roof = new THREE.MeshLambertMaterial({ color: 0x5A3A22, side: THREE.DoubleSide });
wBox(26, 0.2, 10, wM(0xC8A870), 0, 0.1, 0, g);
wBox(26, 4.5, 0.4, wood, 0, 2.25, -5, g);
wBox(0.4, 4.5, 10, wood, -13, 2.25, 0, g);
wBox(0.4, 4.5, 10, wood, 13, 2.25, 0, g);
var r = wBox(27, 0.3, 11.5, roof, 0, 5.2, -0.3, g);
r.rotation.x = 0.18;
wBox(27.1, 0.12, 11.6, wM(0xF4F8FF), 0, 5.4, -0.3, g).rotation.x = 0.18;
for (var s = 0; s < 5; s++) {
wBox(0.25, 4.5, 0.25, wood, -13 + s * 6.5, 2.25, 4.8, g);
}
var sg = wSign(["The Reindeer Stable", "Dasher · Dancer · Prancer · Vixen · Comet", "Cupid · Donner · Blitzen · and Rudolph"], 7, 2, "#3A2418", "#FFE8A0");
sg.position.set(0, 4.6, 5.1);
g.add(sg);
for (var h = 0; h < 5; h++) {
var hay = wBox(1.6, 0.8, 1, wM(0xD8B85A), -11 + h * 5.5, 0.5, -4, g);
}
var names = ["Dasher", "Dancer", "Prancer", "Vixen", "Comet", "Cupid", "Donner", "Blitzen", "Rudolph"];
NP.solids.push({ x: x0, z: z0 - 5, hw: 13, hd: 0.4 }, { x: x0 - 13, z: z0, hw: 0.4, hd: 5 }, { x: x0 + 13, z: z0, hw: 0.4, hd: 5 });
names.forEach(function (n, i) {
var rd = npReindeer(n, n === "Rudolph");
var x = i < 8 ? -10.5 + i * 3 : 0, z = i < 8 ? -1 : 6;
if (i === 8) {
x = 0;
z = 8;
}
rd.position.set(x0 + x, 0, z0 + z);
rd.rotation.y = i < 8 ? 0.1 * (i % 2 ? 1 : -1) : 0.6;
G.add(rd);
NP.deer.push({ g: rd, ph: i * 0.7, x: x0 + x, z: z0 + z });
NP.talkers.push({ p: { g: rd }, r: 2.6, name: n, fn: function () { worldCard(worldFacts(n, n === "Rudolph" ? "The reindeer with the shining nose" : "One of Santa's reindeer", [], npDeerFacts(n))); } });
});
var sl = new THREE.Group();
sl.position.set(-44, 0, 14);
sl.rotation.y = -0.4;
G.add(sl);
var red = wM(0xC82A2A), gold = wM(0xE8C040, { e: 0x3A2A08, ei: 0.4 });
[-0.9, 0.9].forEach(function (x) { var run = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.07, 6, 20, Math.PI * 0.6), gold); run.rotation.y = Math.PI / 2; run.position.set(x, 1.2, 1.8); sl.add(run); wBox(0.12, 0.12, 4, gold, x, 0.1, 0, sl); [-1.2, 0, 1.2].forEach(function (z) { wBox(0.08, 0.7, 0.08, gold, x, 0.45, z, sl); }); });
wBox(2.2, 1, 3.6, red, 0, 1.2, 0, sl);
wBox(2.2, 1.4, 0.4, red, 0, 1.9, -1.6, sl);
wBox(2.3, 0.12, 3.7, gold, 0, 1.72, 0, sl);
var sack = wSph(0.9, wM(0x8A5A3A), 0, 2.2, -0.8, sl, 10);
sack.scale.set(1, 1.1, 0.9);
wCyl(0.15, 0.3, 0.4, wM(0x8A5A3A), 0, 3.2, -0.8, sl, 8);
for (var gp = 0; gp < 4; gp++)
wBox(0.4, 0.4, 0.4, wM([0x3A7AC8, 0xE8C83A, 0x3AA85A, 0xA83AC8][gp]), -0.5 + gp * 0.35, 2.0, 0.6, sl);
NP.solids.push({ x: -44, z: 14, r: 2.4 });
NP.talkers.push({ x: -44, z: 14, r: 3.6, name: "Santa's sleigh", fn: function () { worldCard(worldFacts("Santa's sleigh", "", [], ["Red and gold, with a sack that somehow always has room for one more present.", "On Christmas Eve, NORAD (the North American Aerospace Defense Command) 'tracks' Santa's sleigh: a tradition that began in 1955, when a newspaper misprinted the phone number for a Santa hotline and children rang a military operations centre by mistake. The colonel on duty played along."])); } });
},
function (n) {
var base = ["Real reindeer live across the Arctic: in Norway, Finland, Russia, Alaska and Canada (where wild ones are called caribou).", "Both male and female reindeer grow antlers: the only deer where the females do. Males drop theirs in early winter; females keep them until spring, so the reindeer pulling a sleigh at Christmas are most likely female!", "Their noses warm the freezing air before it reaches their lungs, and in winter their eyes change from gold to deep blue to see better in the long Arctic dark."];
if (n === "Rudolph")
return ["Rudolph first appeared in 1939, in a booklet written by Robert L. May for a department store, then in the 1949 song.", "Scientists have joked that a red nose might really be possible: reindeer noses are packed with tiny blood vessels that keep them warm."].concat(base.slice(0, 1));
return ["The names of the first eight reindeer come from the 1823 poem 'A Visit from St. Nicholas' ('Twas the Night Before Christmas'), where Donner and Blitzen were first called Dunder and Blixem."].concat(base);
},
function (G) {
var x0 = 52, z0 = 2, g = new THREE.Group();
g.position.set(x0, 0, z0);
g.rotation.y = -Math.PI / 2;
G.add(g);
wBox(10, 5, 8, wM(0x3A6A8A), 0, 2.5, 0, g);
var r = wMesh(new THREE.ConeGeometry(7.4, 3.4, 4), new THREE.MeshLambertMaterial({ color: 0xF4F8FF }), 0, 6.7, 0, g);
r.rotation.y = Math.PI / 4;
r.scale.z = 0.85;
wBox(1.6, 2.8, 0.2, wM(0x5A3A22), 0, 1.4, 4.05, g);
var sg = wSign(["North Pole Post Office", "Letters to Santa, delivered"], 6, 1.6, "#F4F0E8", "#A82A2A");
sg.position.set(0, 4, 4.12);
g.add(sg);
var box = new THREE.Group();
wCyl(0.45, 0.45, 1.4, wM(0xC82A2A), 0, 0.7, 0, box, 12);
wSph(0.45, wM(0xC82A2A), 0, 1.4, 0, box, 12);
wBox(0.5, 0.06, 0.1, wM(0x1A1A1A), 0, 1.2, 0.42, box);
box.position.set(2.8, 0, 4.8);
g.add(box);
for (var s = 0; s < 3; s++) {
var sack = wSph(0.55, wM(0x8A6A4A), -2.4 + s * 0.9, 0.5, 4.8, g, 8);
sack.scale.y = 1.2;
}
NP.solids.push({ x: x0, z: z0, hw: 4.2, hd: 5.2 });
var mb = { x: x0 + 4.8, z: z0 - 2.8 };
NP.talkers.push({ x: mb.x, z: mb.z, r: 3, name: "The post box", verb: "write a letter to Santa", fn: npLetter });
},
function () {
var t = window.prompt("Dear Santa,\n\nWrite your letter (it will be posted at the North Pole):", "");
if (!t || !t.trim())
return;
try {
var L = JSON.parse(localStorage.getItem("sm.np.letters") || "[]");
L.push({ at: Date.now(), text: String(t).slice(0, 800) });
localStorage.setItem("sm.np.letters", JSON.stringify(L.slice(-20)));
}
catch (e) { }
if (typeof playTone === "function") {
playTone(880, 0.12);
setTimeout(function () { playTone(1175, 0.18); }, 140);
}
setStatus("<b>Posted.</b> The letter drops into the box with a soft thump, and somewhere inside, a bell rings. (You can tell Santa about it in the workshop.)");
},
function (G) {
var x0 = 48, z0 = -56, g = new THREE.Group();
g.position.set(x0, 0, z0);
g.rotation.y = -0.5;
G.add(g);
wBox(12, 5, 9, wM(0xE8DCC8), 0, 2.5, 0, g);
for (var b = 0; b < 4; b++)
wBox(0.3, 5, 0.3, wM(0x5A3A22), -6 + b * 4, 2.5, 4.6, g);
[-1, 1].forEach(function (s) { var r = wBox(13, 0.35, 6.4, new THREE.MeshLambertMaterial({ color: 0xB82A2A, side: THREE.DoubleSide }), 0, 6.6, s * 2.4, g); r.rotation.x = s * 0.75; var sn = wBox(13.1, 0.15, 6.4, wM(0xF4F8FF), 0, 6.85, s * 2.4, g); sn.rotation.x = s * 0.75; });
wBox(1.8, 2.8, 0.2, wM(0x2A6A3A), 0, 1.4, 4.6, g);
var wr = wMesh(new THREE.TorusGeometry(0.4, 0.12, 6, 14), wM(0x1E5A3A), 0, 2.2, 4.75, g);
[-3.6, 3.6].forEach(function (x) { var w = wMesh(new THREE.PlaneGeometry(1.6, 1.6), wB(0xFFD890), x, 2.6, 4.62, g); });
wBox(1.4, 3, 1.4, wM(0x8A5A4A), 3.5, 8, -1, g);
NP.chim2 = { x: x0 + 3.5 * Math.cos(0.5) - 1 * Math.sin(-0.5), y: 9.6, z: z0 };
var sg = wSign(["The Clauses' Cottage", "Cocoa always on"], 4.5, 1.2, "#2A6A3A", "#FFF4D8");
sg.position.set(0, 4.3, 4.7);
g.add(sg);
NP.solids.push({ x: x0, z: z0, r: 7 });
},
function (G) {
var x = 0, z = -280, y = npHeight(x, z);
var p = new THREE.Group();
p.position.set(x, y, z);
G.add(p);
wCyl(0.25, 0.25, 6, new THREE.MeshLambertMaterial({ map: npStripes() }), 0, 3, 0, p, 12);
wSph(0.55, wM(0xE8C040, { e: 0x3A2A08, ei: 0.5 }), 0, 6.3, 0, p, 12);
var sg = wSign(["The North Pole", "90° North", "Press E to read"], 3.2, 1.4, "#F4F0E8", "#1A3A6A");
sg.position.set(0, 2.4, 0.3);
p.add(sg);
NP.solids.push({ x: x, z: z, r: 0.6 });
NP.talkers.push({ x: x, z: z, r: 4, name: "The North Pole", verb: "read the sign", fn: function () {
worldCard(worldFacts("The real North Pole", "90° North", [], [
"The geographic North Pole is the top of the Earth's axis. There is no land here: it is in the middle of the Arctic Ocean, on sea ice usually 2 to 3 m thick, drifting all the time. The ocean below is about 4,200 m deep.",
"Here every direction is south. The sun rises once a year, around the March equinox, and sets once, around the September equinox: six months of day, then six months of night, lit by the moon, the stars and the aurora.",
"In winter it is usually about minus 40°C; in summer, about 0°C. (The South Pole is far colder, because it is high on a continent of ice.)",
"The magnetic north pole, where a compass points, is not the same place. It wanders: in recent years it has been moving from Canada towards Siberia at up to 50 km a year.",
"The first people known for certain to have seen it were the crew of the airship Norge, with Roald Amundsen, in 1926. The first proven journey over the ice was by Ralph Plaisted's team on snowmobiles in 1968.",
"No penguins here: penguins live in the Southern Hemisphere. Polar bears, arctic foxes, seals and walruses live in the Arctic; in all the world, polar bears and penguins only meet in zoos."
]));
} });
var a = new THREE.Group();
a.position.set(-30, npHeight(-30, -165), -165);
G.add(a);
wCyl(0.08, 0.08, 2, wM(0x5A3A22), 0, 1, 0, a, 6);
var as = wSign(["The Northern Lights", "Press E to read"], 2.4, 0.9, "#1A2A4A", "#9AF0C8");
as.position.y = 2.2;
a.add(as);
NP.talkers.push({ x: -30, z: -165, r: 3, name: "The Northern Lights", verb: "read the sign", fn: function () {
worldCard(worldFacts("The aurora borealis", "The northern lights", [], [
"The sun blows out a stream of charged particles, the solar wind. The Earth's magnetic field steers some of them down towards the poles.",
"There, high in the atmosphere (about 100 to 300 km up), they crash into oxygen and nitrogen and make them glow, like the gas in a neon sign.",
"Oxygen glows green (most often) or, very high up, red; nitrogen glows blue and purple. In the south they are the aurora australis, the southern lights."
]));
} });
},
function (s) {
var g = new THREE.Group(), w = wM(0xF2EEE2), dk = wM(0x1A1A1A);
var b = wSph(1, w, 0, 1.3, 0, g, 12);
b.scale.set(0.85, 0.8, 1.6);
wSph(0.75, w, 0, 1.35, -1, g, 10);
var nk = wSph(0.55, w, 0, 1.45, 1.3, g, 10);
nk.scale.set(0.8, 0.8, 1.1);
var hd = wSph(0.42, w, 0, 1.5, 1.9, g, 10);
hd.scale.set(0.85, 0.8, 1.2);
wSph(0.1, dk, 0, 1.45, 2.38, g, 6);
[-1, 1].forEach(function (s2) { wSph(0.05, dk, s2 * 0.16, 1.62, 2.2, g, 5); wSph(0.1, w, s2 * 0.25, 1.85, 1.8, g, 6); });
g.userData.legs = [];
[[-0.5, 0.9], [0.5, 0.9], [-0.5, -0.9], [0.5, -0.9]].forEach(function (q) { var lg = new THREE.Group(); lg.position.set(q[0], 1.1, q[1]); g.add(lg); wCyl(0.28, 0.25, 1.1, w, 0, -0.55, 0, lg, 8); g.userData.legs.push(lg); });
g.scale.setScalar(s);
return g;
},
function () {
var g = new THREE.Group(), w = wM(0xF4F2EC), dk = wM(0x1A1A1A);
var b = wSph(0.3, w, 0, 0.42, 0, g, 10);
b.scale.set(0.8, 0.8, 1.5);
var hd = wSph(0.18, w, 0, 0.62, 0.45, g, 8);
var sn = wCone(0.08, 0.2, w, 0, 0.58, 0.65, g, 6);
sn.rotation.x = Math.PI / 2;
wSph(0.03, dk, 0, 0.58, 0.75, g, 5);
[-1, 1].forEach(function (s) { wCone(0.06, 0.14, w, s * 0.09, 0.8, 0.42, g, 4); });
var tl = wSph(0.16, w, 0, 0.5, -0.55, g, 8);
tl.scale.set(0.8, 0.8, 2.2);
[[-0.12, 0.25], [0.12, 0.25], [-0.12, -0.25], [0.12, -0.25]].forEach(function (q) { wCyl(0.04, 0.04, 0.3, w, q[0], 0.15, q[1], g, 5); });
return g;
},
function (G) {
var cx = -110, cz = -95, A = 18, B = 12, n = 28, S = new THREE.Group(), wood = wM(0x6A4A2E), stripe = new THREE.MeshLambertMaterial({ map: npStripes() }), pts = [];
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, x = cx + Math.cos(a) * A, z = cz + Math.sin(a) * B;
pts.push([x, z]);
wBox(0.22, 1.5, 0.22, wood, x, npHeight(x, z) + 0.75, z, S);
}
for (var j = 0; j < n; j++) {
if (j === 0)
continue;
var p = pts[j], q = pts[(j + 1) % n], mx = (p[0] + q[0]) / 2, mz = (p[1] + q[1]) / 2, L = Math.hypot(q[0] - p[0], q[1] - p[1]), ry = Math.atan2(q[0] - p[0], q[1] - p[1]), my = npHeight(mx, mz);
[0.6, 1.15].forEach(function (h) { var r = wBox(0.08, 0.12, L, wood, mx, my + h, mz, S); r.rotation.y = ry; });
NP.solids.push({ x: mx, z: mz, hw: 0.12, hd: L / 2, rot: ry });
}
[Math.PI / 2, 1.5 * Math.PI].forEach(function (a) {
var x = cx + Math.cos(a) * A * 0.65, z = cz + Math.sin(a) * B * 0.65, y = npHeight(x, z), h = new THREE.Group();
h.position.set(x, y, z);
h.rotation.y = Math.atan2(-A * Math.sin(a), B * Math.cos(a)) + Math.PI / 2;
S.add(h);
[-1.3, 1.3].forEach(function (s) { wBox(0.12, 1, 0.12, wood, s, 0.5, 0, h); });
wBox(2.6, 0.14, 0.1, stripe, 0, 0.85, 0, h);
wBox(2.6, 0.14, 0.1, stripe, 0, 0.45, 0, h);
});
var rx = cx - A * 0.65, ry2 = npHeight(rx, cz), ramp = wBox(2.6, 0.3, 4, wM(0xC8B89A), rx, ry2 + 0.5, cz, S);
ramp.rotation.x = 0.22;
ramp.rotation.y = Math.PI / 2 + Math.PI;
wCyl(0.08, 0.08, 4, stripe, cx, npHeight(cx, cz) + 2, cz, S, 8);
var pen = wBox(0.04, 0.5, 1.1, wM(0x2A8A3A), cx, npHeight(cx, cz) + 3.7, cz + 0.55, S);
for (var hb = 0; hb < 3; hb++)
wBox(1.4, 0.7, 0.9, wM(0xD8B85A), cx - 6 + hb * 1.6, npHeight(cx - 6, cz + B + 3) + 0.35, cz + B + 3, S);
wBox(2.4, 0.6, 0.8, wood, cx + 6, npHeight(cx + 6, cz + B + 2.5) + 0.3, cz + B + 2.5, S);
var sg = wSign(["The Flying Paddock", "Young reindeer learning to fly", "Please shut the gate"], 3.4, 1.3, "#3A2418", "#FFE8A0"), gx = cx + A + 3, gz = cz - 4;
sg.position.set(gx, npHeight(gx, gz) + 1.9, gz);
sg.rotation.y = Math.PI / 2;
S.add(sg);
wBox(0.12, 1.3, 0.12, wood, gx - 0.07, npHeight(gx, gz) + 0.65, gz, S);
landBake(G, S);
NP.solids.push({ x: cx, z: cz, r: 0.3 }, { x: cx - 6 + 1.6, z: cz + B + 3, hw: 2.4, hd: 0.5 }, { x: cx + 6, z: cz + B + 2.5, hw: 1.2, hd: 0.4 });
NP.talkers.push({ x: gx, z: gz, r: 3, name: "The Flying Paddock", verb: "read the sign", fn: function () { worldCard(worldFacts("The Flying Paddock", "Where the yearlings learn", [], ["Every young reindeer here practises the same things: a run-up, a jump from the ramp, the hurdles, and landing softly in deep snow.", "Real reindeer can't fly, but they are wonderful at everything else: they can run at up to about 80 km/h, swim across wide rivers, and dig through snow with their hooves to find lichen to eat.", "A reindeer calf can stand up within about an hour of being born. Their feet make a clicking sound as they walk, which may help the herd keep together in a snowstorm."])); } });
var names = ["Frost", "Thimble", "Hazel"];
names.forEach(function (nm, k) {
var rd = npReindeer(nm, false);
rd.scale.setScalar(0.82);
G.add(rd);
if (k < 2) {
var x = cx - 4 + k * 6, z = cz + 3 - k * 5;
rd.position.set(x, npHeight(x, z), z);
rd.rotation.y = k ? 2.2 : -0.6;
NP.deer.push({ g: rd, ph: k * 1.9 + 0.4, x: x, z: z });
}
else
NP.trot = { g: rd, cx: cx, cz: cz, A: A * 0.65, B: B * 0.65, a: 0.3, t: 0 };
NP.talkers.push({ p: { g: rd }, r: 2.6, name: nm + ", a yearling", fn: function () { worldCard(worldFacts(nm, "A yearling reindeer, learning to fly", [], [nm === "Thimble" ? "The smallest of this year's yearlings, and the most determined." : nm === "Frost" ? "Nearly has the hang of the ramp. Nearly." : "Likes the hurdles best, and carrots better than that.", "Only the bravest yearlings will one day pull a sleigh. The rest are just as happy pulling hay carts round the village, Sorrel says."])); } });
});
npPut(G, "elf_sorrel", NP_ELF(4, -Math.PI / 2), cx + A - 3, cz + 2, { name: "Sorrel the elf", persona: "You are Sorrel, the elf who teaches the young reindeer to fly at the Flying Paddock at the North Pole in SomnuMatrix. You are brisk, encouraging and outdoorsy, and very proud of this year's yearlings, Frost, Thimble and Hazel. You explain how they practise run-ups, jumps from the ramp, hurdles and soft landings in deep snow, and you love real reindeer facts: they can run at up to about 80 km/h, swim well, use their broad hooves like snowshoes and shovels, and their feet click as they walk." + NP_KIDS, greet: "Gate! Shut the gate, please, or Thimble will be halfway to the moon. There. Hello! Come to watch flying practice? Watch Hazel on the ramp: she nearly has it." }, null);
},
function (G) {
var x0 = 95, z0 = -100, ry = Math.atan2(-x0, 18 - z0), S = new THREE.Group();
S.position.set(x0, npHeight(x0, z0), z0);
S.rotation.y = ry;
var stone = wM(0x8A7A6A), brick = wM(0x8A4A3A), slate = new THREE.MeshLambertMaterial({ color: 0x4A4A52, side: THREE.DoubleSide }), wood = wM(0x5A3A22), gold = new THREE.MeshPhongMaterial({ color: 0xE8C040, shininess: 100, specular: 0xFFF0C0, emissive: 0x2A1E04 }), silver = new THREE.MeshPhongMaterial({ color: 0xD8DCE4, shininess: 110, specular: 0xFFFFFF }), dk = wB(0x1A1410);
wBox(10, 0.2, 8, wM(0x6A5A4A), 0, 0.1, 0, S);
wBox(10, 4.5, 0.5, stone, 0, 2.25, -4, S);
wBox(0.5, 4.5, 8, stone, -5, 2.25, 0, S);
wBox(0.5, 4.5, 8, stone, 5, 2.25, 0, S);
wBox(3, 4.5, 0.5, stone, -3.5, 2.25, 4, S);
wBox(3, 4.5, 0.5, stone, 3.5, 2.25, 4, S);
wBox(4, 1.2, 0.5, stone, 0, 3.9, 4, S);
[-1, 1].forEach(function (s) { var r = wBox(11, 0.3, 5.2, slate, 0, 5.6, s * 2.1, S); r.rotation.x = s * 0.55; var sn = wBox(11.1, 0.14, 5.2, wM(0xF6FAFF), 0, 5.78, s * 2.1, S); sn.rotation.x = s * 0.55; });
[-1, 1].forEach(function (s) { var tri = new THREE.Shape(); tri.moveTo(-4.2, 0); tri.lineTo(4.2, 0); tri.lineTo(0, 2.6); tri.lineTo(-4.2, 0); var gm = wMesh(new THREE.ShapeGeometry(tri), new THREE.MeshLambertMaterial({ color: 0x8A7A6A, side: THREE.DoubleSide }), s * 5, 4.5, 0, S); gm.rotation.y = Math.PI / 2; });
wBox(1.4, 7, 1.4, brick, -3.4, 5, -3.2, S);
wBox(2.6, 2.2, 2, brick, -2.6, 1.1, -2.6, S);
var mouth = wBox(1.2, 0.9, 0.05, wB(0xFF9A3A, { fog: false }), -2.6, 1, -1.58, S);
var anv = new THREE.Group();
wBox(0.5, 0.6, 0.5, wM(0x3A3A3E), 0, 0.3, 0, anv);
wBox(1.1, 0.3, 0.45, wM(0x2A2A2E), 0, 0.75, 0, anv);
anv.position.set(1.6, 0, -1.4);
S.add(anv);
for (var m = 0; m < 4; m++)
wBox(0.8, 0.4, 0.8, wM(0xC8A878), 3.2, 0.4 + m * 0, -3 + m * 1.1, S);
var rk = new THREE.Group();
rk.position.set(0, 0, 6.2);
S.add(rk);
[-2.2, 2.2].forEach(function (x) { wBox(0.16, 2.6, 0.16, wood, x, 1.3, 0, rk); });
wBox(4.8, 0.16, 0.16, wood, 0, 2.5, 0, rk);
for (var b = 0; b < 7; b++) {
var bx = -1.8 + b * 0.6, br = 0.2 + (b % 3) * 0.05, mt = b % 2 ? silver : gold;
wCyl(0.01, 0.01, 0.5, wM(0x5A3A22), bx, 2.17, 0, rk, 4);
wSph(br, mt, bx, 1.9 - br, 0, rk, 12);
wBox(br * 1.5, 0.03, br * 2.1, dk, bx, 1.9 - br * 1.25, 0, rk);
wMesh(new THREE.TorusGeometry(0.06, 0.02, 4, 8), mt, bx, 1.93, 0, rk);
}
var sg = wSign(["The Sleigh-Bell Foundry", "Bells cast, tuned and polished"], 4.2, 1.1, "#3A2418", "#FFE8A0");
sg.position.set(0, 4.95, 4.3);
S.add(sg);
landBake(G, S);
var gl = wGlow(0xFF9A3A, 3.2, 0.5), gw = npLW(x0, z0, ry, -2.6, -1.4);
gl.position.set(gw.x, npHeight(x0, z0) + 1, gw.z);
G.add(gl);
var ch = npLW(x0, z0, ry, -3.4, -3.2);
NP.chim3 = { x: ch.x, y: npHeight(x0, z0) + 8.6, z: ch.z };
[[0, -4, 5, 0.25], [-5, 0, 0.25, 4], [5, 0, 0.25, 4], [-3.5, 4, 1.5, 0.25], [3.5, 4, 1.5, 0.25], [-2.6, -2.6, 1.3, 1]].forEach(function (q) { var w = npLW(x0, z0, ry, q[0], q[1]); NP.solids.push({ x: w.x, z: w.z, hw: q[2], hd: q[3], rot: ry }); });
var rw = npLW(x0, z0, ry, 0, 6.2);
NP.solids.push({ x: rw.x, z: rw.z, hw: 2.4, hd: 0.25, rot: ry });
var aw = npLW(x0, z0, ry, 1.6, -1.4);
NP.solids.push({ x: aw.x, z: aw.z, r: 0.55 });
NP.talkers.push({ x: rw.x, z: rw.z, r: 3, name: "The bell rack", verb: "ring the bells", fn: function () {
if (typeof playTone === "function")
[2093, 2637, 3136, 2637, 3520, 3136].forEach(function (f, i) { setTimeout(function () { playTone(f, 0.12); }, i * 110); });
worldCard(worldFacts("Sleigh bells", "Cast here, for the harness and the sleigh", [], ["A sleigh bell is a hollow ball of metal with a slot in it and a loose pellet inside: shake it and the pellet rattles. Bell-makers call this kind a crotal bell.", "Bell metal is bronze, roughly four parts copper to one part tin. Bells are cast in moulds of sand or clay and tuned by shaving away a little metal.", "Long ago, horses pulling sleighs wore strings of bells because a sleigh slides almost silently over snow: the jingle warned people on the road that one was coming."]));
} });
var at = npLW(x0, z0, ry, 0.4, -1);
npPut(G, "elf_tamsin", NP_ELF(1, ry), at.x, at.z, { name: "Tamsin the bell-founder", persona: "You are Tamsin, the elf bell-founder at the Sleigh-Bell Foundry at the North Pole in SomnuMatrix, where every bell for the reindeer's harness and Santa's sleigh is cast. You are cheerful, a bit sooty and very particular about how a bell sounds. You love real facts about bells: bell metal is bronze, roughly four parts copper to one of tin; bells are cast in moulds of sand or clay and tuned by shaving metal away; a sleigh bell is a hollow ball with a slot and a loose pellet inside; and sleighs wore bells because they slide almost silently over snow and the jingle warned people on the road." + NP_KIDS, greet: "Mind the furnace; it's hot even when it's being good. Listen to this one. Hear that? Bright as frost. That's a sleigh bell. The dull ones go back in the pot." }, null);
},
function (G) {
var x0 = -60, z0 = 130, ry = Math.atan2(-x0, 18 - z0), y0 = npHeight(x0, z0), S = new THREE.Group();
S.position.set(x0, y0, z0);
S.rotation.y = ry;
var wall = wM(0xE8DCC8), wood = wM(0x8A6A4A), roof = new THREE.MeshLambertMaterial({ color: 0x2A6A3A, side: THREE.DoubleSide }), trim = wM(0xC82A2A);
wBox(16, 0.2, 10, wood, 0, 0.1, 0, S);
wBox(16, 5, 0.4, wall, 0, 2.5, -5, S);
wBox(0.4, 5, 10, wall, -8, 2.5, 0, S);
wBox(0.4, 5, 10, wall, 8, 2.5, 0, S);
[-7.8, -2.6, 2.6, 7.8].forEach(function (x) { wBox(0.35, 5, 0.35, trim, x, 2.5, 5, S); });
wBox(16.4, 0.6, 0.4, trim, 0, 5.1, 5, S);
[-1, 1].forEach(function (s) { var r = wBox(17, 0.3, 6.4, roof, 0, 6.4, s * 2.6, S); r.rotation.x = s * 0.5; var sn = wBox(17.1, 0.14, 6.4, wM(0xF6FAFF), 0, 6.58, s * 2.6, S); sn.rotation.x = s * 0.5; });
[-1, 1].forEach(function (s) { var tri = new THREE.Shape(); tri.moveTo(-5.2, 0); tri.lineTo(5.2, 0); tri.lineTo(0, 2.9); tri.lineTo(-5.2, 0); var gm = wMesh(new THREE.ShapeGeometry(tri), new THREE.MeshLambertMaterial({ color: 0xE8DCC8, side: THREE.DoubleSide }), s * 8, 5, 0, S); gm.rotation.y = Math.PI / 2; });
var sg = wSign(["The Toy-Testing Hall", "Every toy played with before it goes in the sack"], 6, 1.2, "#1E4A32", "#FFE8A0");
sg.position.set(0, 5.95, 5.25);
S.add(sg);
var tr = wMesh(new THREE.TorusGeometry(2.6, 0.08, 4, 40), wM(0x5A5A60), -4, 0.25, -1, S);
tr.rotation.x = Math.PI / 2;
for (var b = 0; b < 9; b++)
wBox(0.5, 0.5, 0.5, wM([0xC83A3A, 0x3A7AC8, 0x3AA85A, 0xE8C83A][b % 4]), 3 + (b % 3) * 0.55, 0.45 + Math.floor(b / 3) * 0.5, -3.6, S);
var tb = wSign(["TESTED", "Rolls ✓  Bounces ✓  Rocks ✓", "Paint dry ✓  No small bits ✓"], 3, 1.5, "#F4F0E8", "#1E4A32");
tb.position.set(-7.75, 2.6, -1);
tb.rotation.y = Math.PI / 2;
S.add(tb);
[[6, -1.2], [6.8, 1.4]].forEach(function (q, i) { npToy(S, q[0], 0.2, q[1], i ? 4 : 2); });
landBake(G, S);
var tw = npLW(x0, z0, ry, -4, -1), pivot = new THREE.Group();
pivot.position.set(tw.x, y0 + 0.3, tw.z);
G.add(pivot);
[0, 0.55, 1.05].forEach(function (a, k) {
var car = new THREE.Group();
car.position.set(Math.cos(a) * 2.6, 0, Math.sin(a) * 2.6);
car.rotation.y = -a;
pivot.add(car);
if (!k) {
wBox(0.36, 0.32, 0.75, wM(0xC82A2A), 0, 0.2, 0, car);
wCyl(0.14, 0.14, 0.32, wM(0x1A1A1A), 0, 0.48, 0.2, car, 8);
wBox(0.38, 0.3, 0.3, wM(0x2A2A2A), 0, 0.45, -0.22, car);
}
else
wBox(0.36, 0.28, 0.6, wM([0x3A7AC8, 0xE8C83A][k - 1]), 0, 0.18, 0, car);
});
NP.train = pivot;
var hw = npLW(x0, z0, ry, 3, -0.6), horse = new THREE.Group();
horse.position.set(hw.x, y0 + 0.2, hw.z);
horse.rotation.y = ry + Math.PI / 2;
G.add(horse);
var rk = new THREE.Group();
horse.add(rk);
[-0.35, 0.35].forEach(function (x) { var rc = wMesh(new THREE.TorusGeometry(1.4, 0.06, 4, 16, Math.PI * 0.5), wM(0x8A4A2A), x, 1.45, 0, rk); rc.rotation.z = Math.PI * 1.25; rc.rotation.y = Math.PI / 2; });
var hb = wBox(0.45, 0.5, 1.3, wM(0xF4F0E8), 0, 0.85, 0, rk);
var hn = wBox(0.3, 0.7, 0.35, wM(0xF4F0E8), 0, 1.3, 0.55, rk);
hn.rotation.x = 0.4;
wBox(0.32, 0.3, 0.55, wM(0xF4F0E8), 0, 1.6, 0.8, rk);
wBox(0.08, 0.5, 0.6, wM(0x8A4A2A), 0, 1.45, 0.35, rk);
wBox(0.5, 0.08, 0.5, wM(0xC82A2A), 0, 1.12, -0.05, rk);
NP.rock = rk;
var bw = npLW(x0, z0, ry, 5.6, 1.6), ball = wSph(0.32, wM(0xE8C83A), bw.x, y0 + 0.5, bw.z, G, 12);
NP.ball = ball;
NP.ballY = y0 + 0.52;
[[0, -5, 8, 0.2], [-8, 0, 0.2, 5], [8, 0, 0.2, 5]].forEach(function (q) { var w = npLW(x0, z0, ry, q[0], q[1]); NP.solids.push({ x: w.x, z: w.z, hw: q[2], hd: q[3], rot: ry }); });
[-7.8, -2.6, 2.6, 7.8].forEach(function (x) { var w = npLW(x0, z0, ry, x, 5); NP.solids.push({ x: w.x, z: w.z, r: 0.3 }); });
NP.solids.push({ x: tw.x, z: tw.z, r: 2.9 }, { x: hw.x, z: hw.z, r: 0.9 });
var at = npLW(x0, z0, ry, 0.5, 1.5), at2 = npLW(x0, z0, ry, -2, 3);
npPut(G, "elf_fizz", NP_ELF(2, ry), at.x, at.z, { name: "Fizz, chief toy tester", persona: "You are Fizz, the chief toy tester at the Toy-Testing Hall at the North Pole in SomnuMatrix: every toy is played with before it goes in the sack, and that is your job (the best job at the North Pole, you say). You are bouncy, enthusiastic and very serious about fun: does the train go round, does the ball bounce, does the horse rock without tipping, is the paint dry, are there any little pieces a baby might swallow. Talk about testing toys, favourite toys, and toys from long ago (spinning tops, rocking horses, tin trains, dolls' houses)." + NP_KIDS, greet: "Testing, testing! Oh, hello. Want to help? This ball has bounced four thousand and twelve times and it's still going. That's a pass. The rocking horse is next. Everybody loves testing the rocking horse." }, null);
npPut(G, "elf_tester", NP_ELF(3, ry), at2.x, at2.z, null, { r: 3, sp: 0.8 });
},
function (G) {
var x0 = 20, z0 = -115, ry = Math.atan2(-x0, 18 - z0), y0 = npHeight(x0, z0), S = new THREE.Group();
S.position.set(x0, y0, z0);
S.rotation.y = ry;
var wall = wM(0x3A5A8A), trim = wM(0xF4F0E8), roof = new THREE.MeshLambertMaterial({ color: 0xB82A2A, side: THREE.DoubleSide }), paper = wM(0xF4ECD8, { ds: true }), wood = wM(0x5A3A22);
wBox(8, 7, 6, wall, 0, 3.5, 0, S);
[-1, 1].forEach(function (s) { var r = wBox(9, 0.3, 4.6, roof, 0, 8.5, s * 1.7, S); r.rotation.x = s * 0.9; var sn = wBox(9.1, 0.14, 4.6, wM(0xF6FAFF), 0, 8.68, s * 1.7, S); sn.rotation.x = s * 0.9; });
var gab = new THREE.Shape();
gab.moveTo(-4, 0);
gab.lineTo(4, 0);
gab.lineTo(0, 3.4);
gab.lineTo(-4, 0);
wMesh(new THREE.ShapeGeometry(gab), wall, 0, 7, 3.01, S);
var gb2 = wMesh(new THREE.ShapeGeometry(gab), wall, 0, 7, -3.01, S);
gb2.rotation.y = Math.PI;
wCyl(0.9, 0.9, 0.1, trim, 0, 8.3, 3.08, S, 24).rotation.x = Math.PI / 2;
var h1 = wBox(0.08, 0.6, 0.04, wM(0x1A1A1A), 0, 8.55, 3.16, S);
var h2 = wBox(0.06, 0.75, 0.04, wM(0x1A1A1A), -0.07, 8.62, 3.17, S);
h2.rotation.z = 0.52;
wBox(1.6, 2.6, 0.1, wM(0x5A3A22), 0, 1.3, 3.05, S);
[[-2.5, 2], [2.5, 2], [-2.5, 5], [2.5, 5], [0, 5]].forEach(function (q) { wBox(1.1, 1.2, 0.06, wB(0xFFD890), q[0], q[1], 3.04, S); wBox(1.3, 0.1, 0.1, trim, q[0], q[1] - 0.65, 3.08, S); });
for (var st = 0; st < 3; st++)
wBox(2.4, 0.25, 0.6, wM(0x8A8A90), 0, 0.12 + st * 0, 3.4 + st * 0.6, S);
wCyl(0.25, 0.25, 1.4, paper, 0, 2.2, 3.3, S, 12).rotation.z = Math.PI / 2;
var px = 0, pz = 3.3, py = 2.1;
for (var k = 0; k < 11; k++) {
var nx = Math.sin(k * 0.9) * 2.2, nz = 4.2 + k * 1.3, ny = 0.05 + (k === 0 ? 0.4 : 0);
var L = Math.hypot(nx - px, nz - pz, ny - py), seg = wBox(0.7, 0.02, L, paper, (px + nx) / 2, (py + ny) / 2, (pz + nz) / 2, S);
seg.rotation.order = "YXZ";
seg.rotation.y = Math.atan2(nx - px, nz - pz);
seg.rotation.x = -Math.atan2(ny - py, Math.hypot(nx - px, nz - pz));
px = nx;
pz = nz;
py = ny;
}
var bk = wCyl(1, 0.8, 1, wM(0x8A6A3A), px + 0.8, 0.5, pz + 1.2, S, 14);
for (var sc = 0; sc < 5; sc++) {
var sr = wCyl(0.2, 0.2, 0.9, paper, px + 0.4 + (sc % 3) * 0.4, 1.05, pz + 0.9 + Math.floor(sc / 3) * 0.5, S, 10);
sr.rotation.z = Math.PI / 2;
}
var lc = new THREE.Group();
lc.position.set(3.2, 0, 4.4);
S.add(lc);
wBox(0.5, 1.1, 0.5, wood, 0, 0.55, 0, lc);
var top = wBox(1.2, 0.08, 0.9, wood, 0, 1.15, 0, lc);
top.rotation.x = -0.3;
var bkk = wBox(1.1, 0.1, 0.8, wM(0x8A1A1A), 0, 1.24, 0, lc);
bkk.rotation.x = -0.3;
var pg = wBox(1, 0.02, 0.72, paper, 0, 1.3, 0, lc);
pg.rotation.x = -0.3;
var sg = wSign(["The Office of the List", "Kind deeds, written down"], 3.6, 1, "#1A3A6A", "#F4F0E8");
sg.position.set(0, 3.4, 3.08);
S.add(sg);
landBake(G, S);
NP.solids.push({ x: x0, z: z0, hw: 4.1, hd: 3.1, rot: ry });
var bw = npLW(x0, z0, ry, px + 0.8, pz + 1.2);
NP.solids.push({ x: bw.x, z: bw.z, r: 1.1 });
var lw = npLW(x0, z0, ry, 3.2, 4.4);
NP.solids.push({ x: lw.x, z: lw.z, r: 0.5 });
NP.talkers.push({ x: lw.x, z: lw.z, r: 2.4, name: "The great book", verb: "read it", fn: function () { worldCard(worldFacts("Where Santa came from", "Written in the front of the great book", [], ["Saint Nicholas was a bishop in Myra, in what is now Turkey, about 1,700 years ago. Stories say he gave gifts in secret: coins dropped down a chimney, or into stockings hung up to dry.", "Dutch settlers brought Sinterklaas to New York, and in America his name became Santa Claus.", "The poem 'A Visit from St. Nicholas' (1823) gave him a sleigh and eight flying reindeer, and in the 1860s the cartoonist Thomas Nast drew him a workshop at the North Pole, and a big book in which he wrote down how children had behaved."])); } });
var at = npLW(x0, z0, ry, -1.6, 4.6);
npPut(G, "elf_penwick", NP_ELF(5, ry), at.x, at.z, { name: "Penwick, keeper of the List", persona: "You are Penwick, keeper of the List at the Office of the List at the North Pole in SomnuMatrix. The List is where kind and good deeds are written down: sharing, helping, saying sorry, being brave, trying again. You are precise, gentle and quietly funny, with ink on your fingers. Never tell anyone they are on a 'naughty' side; instead, encourage kindness and say anyone can add a good deed any day. You know the real history too: Saint Nicholas, a bishop in Myra (in today's Turkey) about 1,700 years ago, famous for secret gifts; the Dutch Sinterklaas who became Santa Claus in America; the 1823 poem 'A Visit from St. Nicholas'; and the cartoonist Thomas Nast, whose drawings in the 1860s gave Santa a workshop at the North Pole and a book of children's behaviour." + NP_KIDS, greet: "Ah, a visitor. Do mind the List; it goes all the way down the steps, and round, and into the basket, and that's only this week. Kindnesses, you see. So many of them. Have you done one today? I can write it down." }, null);
},
function (G) {
var x0 = 20, z0 = 145, ry = Math.atan2(-x0, 18 - z0), y0 = npHeight(x0, z0), S = new THREE.Group();
S.position.set(x0, y0, z0);
S.rotation.y = ry;
var wall = wM(0x2A6A4A), trim = wM(0xF4F0E8), roof = new THREE.MeshLambertMaterial({ color: 0xB82A2A, side: THREE.DoubleSide }), snow = wM(0xF6FAFF), wood = wM(0x6A4A2E);
var papers = [0xC83A3A, 0x3A7AC8, 0x3AA85A, 0xE8C83A, 0xA84AC8, 0xF4F0E8];
wBox(14, 4.5, 7, wall, 0, 2.25, 0, S);
[-1, 1].forEach(function (s) { var r = wBox(15, 0.3, 4.6, roof, 0, 5.8, s * 1.85, S); r.rotation.x = s * 0.6; var sn = wBox(15.1, 0.14, 4.6, snow, 0, 5.98, s * 1.85, S); sn.rotation.x = s * 0.6; });
var gab = new THREE.Shape();
gab.moveTo(-3.5, 0);
gab.lineTo(3.5, 0);
gab.lineTo(0, 2.5);
gab.lineTo(-3.5, 0);
[-1, 1].forEach(function (s) { var gm = wMesh(new THREE.ShapeGeometry(gab), wall, s * 7.01, 4.5, 0, S); gm.rotation.y = s * Math.PI / 2; });
wBox(1.6, 2.6, 0.1, wM(0x7A3A1E), 0, 1.3, 3.55, S);
[-5, -2.6, 2.6, 5].forEach(function (x) { wBox(1.4, 1.3, 0.06, wB(0xFFD890), x, 2.3, 3.54, S); wBox(1.6, 0.12, 0.1, trim, x, 1.6, 3.58, S); });
wBox(1, 2.6, 1, wM(0x8A5A4A), 4.5, 6.6, -1.2, S);
var sg = wSign(["The Wrapping House", "Paper, ribbon, and a great deal of string"], 4, 1, "#1A4A2A", "#F4F0E8");
sg.position.set(0, 3.9, 3.6);
S.add(sg);
wBox(5, 0.12, 1.4, wood, 0, 0.9, 6, S);
[-2.3, 2.3].forEach(function (x) { [-0.55, 0.55].forEach(function (z) { wBox(0.12, 0.9, 0.12, wood, x, 0.45, 6 + z, S); }); });
for (var k = 0; k < 9; k++) {
var s = 0.3 + (k % 3) * 0.12, bx = -2 + k * 0.5;
wBox(s, s, s, wM(papers[k % 6]), bx, 0.96 + s / 2, 5.8 + (k % 2) * 0.4, S);
wBox(s + 0.02, 0.06, s + 0.02, wM(papers[(k + 3) % 6]), bx, 0.96 + s * 0.7, 5.8 + (k % 2) * 0.4, S);
}
for (var p = 0; p < 3; p++) {
var rl = wCyl(0.12, 0.12, 1.4, wM(papers[p + 1]), -1.2 + p * 0.3, 1.08, 6.5, S, 10);
rl.rotation.z = Math.PI / 2;
}
[[1.6, 6.5], [1.9, 6.3]].forEach(function (q, i) { wCyl(0.14, 0.14, 0.12, wM(papers[i * 3]), q[0], 1.02, q[1], S, 12); });
var sl = new THREE.Group();
sl.position.set(-5, 0, 7.6);
S.add(sl);
[-0.6, 0.6].forEach(function (x) { wBox(0.1, 0.12, 3, wM(0xB82A2A), x, 0.08, 0, sl); var tip = wBox(0.1, 0.12, 0.6, wM(0xB82A2A), x, 0.3, 1.6, sl); tip.rotation.x = -0.8; [-1, 1].forEach(function (z) { wBox(0.08, 0.4, 0.08, wood, x, 0.32, z, sl); }); });
wBox(1.4, 0.1, 2.8, wood, 0, 0.55, 0, sl);
for (var q = 0; q < 5; q++) {
var qs = 0.4 + (q % 2) * 0.15;
wBox(qs, qs, qs, wM(papers[(q + 2) % 6]), -0.35 + (q % 2) * 0.7, 0.6 + qs / 2 + (q > 3 ? 0.5 : 0), -0.9 + Math.floor(q / 2) * 0.8, sl);
}
landBake(G, S);
var ch = npLW(x0, z0, ry, 4.5, -1.2);
NP.chim4 = { x: ch.x, y: y0 + 8.2, z: ch.z };
NP.solids.push({ x: x0, z: z0, hw: 7.1, hd: 3.6, rot: ry });
var tw = npLW(x0, z0, ry, 0, 6);
NP.solids.push({ x: tw.x, z: tw.z, hw: 2.5, hd: 0.75, rot: ry });
var sw = npLW(x0, z0, ry, -5, 7.6);
NP.solids.push({ x: sw.x, z: sw.z, hw: 0.8, hd: 1.7, rot: ry });
NP.talkers.push({ x: tw.x, z: tw.z, r: 2.6, name: "The wrapping table", verb: "look", fn: function () { worldCard(worldFacts("Wrapping presents", "At the wrapping table", [], ["In Japan presents are often wrapped in a furoshiki: a square of cloth, folded round the gift and knotted. The cloth is a present too, and can be used again and again.", "Before printed wrapping paper was common, about a hundred years ago, presents were usually wrapped in plain brown paper or tissue and tied with string.", "The elves' rule: fold the ends neatly, tuck the corners in, and always leave a long tail on the ribbon so it is easy to pull."])); } });
var ta = npLW(x0, z0, ry, 1.2, 7.3);
npPut(G, "elf_tansy", NP_ELF(4, ry + Math.PI), ta.x, ta.z, { name: "Tansy, head of the Wrapping House", persona: "You are Tansy, the elf in charge of the Wrapping House at the North Pole in SomnuMatrix, where the toys from the workshop are wrapped before they go in the sack. You are brisk, cheerful and very particular about neat corners; you can wrap a present with your eyes shut and you love a beautiful bow. You know about wrapping papers, ribbons, and the Japanese furoshiki cloth, and you'll happily show anyone how to fold the ends." + NP_KIDS, greet: "Mind the ribbon! It's everywhere. Oh, you're just in time: hold your finger here. Here. On the knot. Lovely. And that's another one done." });
for (var e = 0; e < 2; e++) {
var ea = npLW(x0, z0, ry, 3 + e * 2, 9 + e);
npPut(G, "elf_wrap" + e, NP_ELF(e, ry), ea.x, ea.z, null, { r: 6, sp: 0.9 });
}
},
function (G) {
var x0 = -35, z0 = 165, ry = Math.atan2(-x0, 18 - z0), y0 = npHeight(x0, z0), S = new THREE.Group();
S.position.set(x0, y0, z0);
S.rotation.y = ry;
var red = wM(0xA8322A), trim = wM(0xF4F0E8), roof = new THREE.MeshLambertMaterial({ color: 0x4A3A32, side: THREE.DoubleSide }), snow = wM(0xF6FAFF), hay = wM(0xD8B860), wood = wM(0x6A4A2E), moss = wM(0xC0CCB0);
wBox(12, 5, 9, red, 0, 2.5, 0, S);
[-1, 1].forEach(function (s) { var r = wBox(12.8, 0.3, 6.4, roof, 0, 7.18, s * 2.4, S); r.rotation.x = s * 0.75; var sn = wBox(12.9, 0.14, 6.4, snow, 0, 7.36, s * 2.4, S); sn.rotation.x = s * 0.75; });
var gab = new THREE.Shape();
gab.moveTo(-4.5, 0);
gab.lineTo(4.5, 0);
gab.lineTo(0, 4.2);
gab.lineTo(-4.5, 0);
[-1, 1].forEach(function (s) { var gm = wMesh(new THREE.ShapeGeometry(gab), red, s * 6.01, 5, 0, S); gm.rotation.y = s * Math.PI / 2; });
wBox(4, 4, 0.06, wB(0x1A120A), 0, 2, 4.52, S);
[-1, 1].forEach(function (s) { wBox(2, 4, 0.15, red, s * 3.1, 2, 4.6, S); var xb = wBox(0.15, 4.4, 0.1, trim, s * 3.1, 2, 4.7, S); xb.rotation.z = s * 0.46; wBox(2, 0.15, 0.1, trim, s * 3.1, 0.1, 4.7, S); wBox(2, 0.15, 0.1, trim, s * 3.1, 3.92, 4.7, S); });
wBox(1.6, 1.4, 0.06, wB(0x1A120A), 0, 6.3, 4.52, S);
wBox(1.4, 0.5, 0.4, hay, 0, 5.85, 4.4, S);
[[-4.6, 6.2, 0], [-3.3, 6.2, 0], [-4, 6.2, 1], [-4.6, 7.2, 0]].forEach(function (q) { wBox(1.2, 0.6, 0.8, hay, q[0], 0.3 + q[2] * 0.6, q[1], S); });
for (var m = 0; m < 9; m++) {
var mm = wSph(0.42, moss, -4.4 + Math.cos(m * 1.9) * 0.7 * (m % 3 ? 1 : 0.3), 0.25 + Math.floor(m / 4) * 0.35, 9.6 + Math.sin(m * 1.9) * 0.6, S, 7);
mm.scale.y = 0.6;
}
wBox(3.6, 0.5, 0.6, wood, 3, 0.6, 8.4, S);
for (var r = 0; r < 7; r++)
wBox(0.06, 0.8, 0.06, wood, 1.4 + r * 0.53, 1.25, 8.4, S);
wBox(3.6, 0.08, 0.08, wood, 3, 1.65, 8.4, S);
wBox(3.4, 0.3, 0.5, hay, 3, 0.95, 8.4, S);
wBox(5, 0.3, 1, wM(0x8A8A90), 0, 0.15, 5.2, S);
wCyl(0.22, 0.14, 0.16, wM(0x8A5A2A), 2, 0.38, 5.2, S, 12);
wCyl(0.2, 0.2, 0.02, wM(0xF4ECD8), 2, 0.45, 5.2, S, 12);
wBox(0.08, 0.04, 0.08, wM(0xF0D040), 2, 0.47, 5.2, S);
var sp = wBox(0.03, 0.02, 0.3, wM(0xB8B8C0), 2.1, 0.48, 5.25, S);
sp.rotation.y = 0.6;
var sg = wSign(["The Moss Barn", "Hay and reindeer moss", "Close the door: the tomte likes it warm"], 3.8, 1.3, "#5A1A1A", "#F4F0E8");
var sp2 = npLW(0, 0, 0, -2, 11.8);
sg.position.set(sp2.x, 1.9, sp2.z);
S.add(sg);
wBox(0.12, 1.3, 0.12, wood, sp2.x, 0.65, sp2.z - 0.06, S);
landBake(G, S);
NP.solids.push({ x: x0, z: z0, hw: 6.1, hd: 4.7, rot: ry });
[[-4, 6.4, 1.2, 0.9], [3, 8.4, 1.9, 0.4], [0, 5.2, 2.5, 0.5], [-2, 11.8, 0.15, 0.15]].forEach(function (q) { var w = npLW(x0, z0, ry, q[0], q[1]); NP.solids.push({ x: w.x, z: w.z, hw: q[2], hd: q[3], rot: ry }); });
var mw = npLW(x0, z0, ry, -4.4, 9.6);
NP.solids.push({ x: mw.x, z: mw.z, r: 1.2 });
[[2, 9.8], [4.2, 9.6]].forEach(function (q, k) { var rd = npReindeer("moss" + k, false), w = npLW(x0, z0, ry, q[0], q[1]); rd.position.set(w.x, npHeight(w.x, w.z), w.z); rd.rotation.y = ry + Math.PI + (k ? -0.15 : 0.2); G.add(rd); NP.deer.push({ g: rd, ph: k * 2.3 + 1.1, x: w.x, z: w.z }); NP.solids.push({ x: w.x, z: w.z, r: 1 }); });
NP.talkers.push({ x: mw.x, z: mw.z, r: 2.6, name: "The reindeer moss", verb: "look", fn: function () { worldCard(worldFacts("Reindeer moss", "What reindeer eat in winter", [], ["It is called reindeer moss, but it isn't a moss at all: it is a lichen, a fungus and a tiny green alga living together as one. Its scientific name is Cladonia rangiferina.", "It grows very slowly, only a few millimetres a year, over the tundra and in northern forests.", "In winter reindeer find it under the snow by smell and dig down to it with their broad front hooves."])); } });
var bw = npLW(x0, z0, ry, 2, 5.9);
NP.talkers.push({ x: bw.x, z: bw.z, r: 2, name: "A bowl of porridge", verb: "look", fn: function () { worldCard(worldFacts("The barn tomte", "An old story from Sweden, Norway and Denmark", [], ["In Scandinavian folklore every old farm had its tomte (in Norway and Denmark, a nisse): a little old man, no taller than a child, with a grey beard and a red cap, who looked after the barn and the animals at night.", "Treat him well and the farm did well. On Christmas Eve the family put out a bowl of porridge for him, with a pat of butter on top.", "Forget the butter, the stories say, and he might play tricks: tie the cows' tails together, or hide things all night."])); } });
var hk = npLW(x0, z0, ry, -0.6, 8.6);
npPut(G, "elf_haskel", NP_ELF(2, ry + 2.2), hk.x, hk.z, { name: "Haskel, keeper of the Moss Barn", persona: "You are Haskel, the elf who keeps the Moss Barn at the North Pole in SomnuMatrix, where the hay and reindeer moss for Santa's reindeer are stored. You are calm, slow-spoken and kind, with straw in your hair, and you know a great deal about reindeer: what they eat (lichen called reindeer moss, dug from under the snow), how their hooves work like snowshoes and shovels, and how their antlers grow and fall off each year. You leave porridge with butter on the step for the barn's tomte, as the old Scandinavian stories say you should, and you never forget the butter." + NP_KIDS, greet: "Steady, steady. They don't mind visitors, as long as you don't stand between them and the hay. Want to give them a handful? From the rack, mind; not the porridge. That's not for us." });
},
function (G) {
var x0 = -45, z0 = -135, ry = Math.atan2(-x0, 18 - z0), y0 = npHeight(x0, z0), S = new THREE.Group();
S.position.set(x0, y0, z0);
S.rotation.y = ry;
var wall = wM(0x8A6A4A), trim = wM(0xF4F0E8), roof = new THREE.MeshLambertMaterial({ color: 0x2A4A7A, side: THREE.DoubleSide }), snow = wM(0xF6FAFF), wood = wM(0x5A3A22), wax = wM(0xF4ECD0), flame = wB(0xFFE08A, { fog: false }), lit = [];
wBox(8, 4, 6, wall, 0, 2, 0, S);
[-1, 1].forEach(function (s) { var r = wBox(9, 0.3, 4, roof, 0, 5.13, s * 1.6, S); r.rotation.x = s * 0.6; var sn = wBox(9.1, 0.14, 4, snow, 0, 5.31, s * 1.6, S); sn.rotation.x = s * 0.6; });
var gab = new THREE.Shape();
gab.moveTo(-3, 0);
gab.lineTo(3, 0);
gab.lineTo(0, 2.2);
gab.lineTo(-3, 0);
[-1, 1].forEach(function (s) { var gm = wMesh(new THREE.ShapeGeometry(gab), wall, s * 4.01, 4, 0, S); gm.rotation.y = s * Math.PI / 2; });
wBox(1.4, 2.5, 0.1, wM(0x5A2A1A), 0, 1.25, 3.05, S);
[-2.6, 2.6].forEach(function (x) { wBox(1.6, 1.2, 0.06, wB(0xFFD890), x, 2, 3.04, S); wBox(1.9, 0.12, 0.4, trim, x, 1.36, 3.2, S); for (var c = 0; c < 3; c++) {
var cx = x - 0.55 + c * 0.55;
wCyl(0.06, 0.06, 0.4, wax, cx, 1.62, 3.25, S, 8);
wCone(0.04, 0.12, flame, cx, 1.88, 3.25, S, 6);
lit.push([cx, 1.9, 3.3]);
} });
[-2.1, 2.1].forEach(function (x) { wBox(0.14, 2.3, 0.14, wood, x, 1.15, 6, S); });
wBox(4.4, 0.12, 0.12, wood, 0, 2.25, 6, S);
for (var h = 0; h < 12; h++) {
var hx = -1.65 + (h % 6) * 0.66, hz = 6 + (h < 6 ? -0.18 : 0.18);
wBox(0.01, 0.5, 0.01, wM(0xE8E0D0), hx, 1.95, hz, S);
wCyl(0.05, 0.035, 0.65, wax, hx, 1.38, hz, S, 6);
}
wBox(4.2, 0.6, 0.8, wood, 0, 0.3, 6, S);
wBox(4, 0.04, 0.64, wM(0xF0E0A0, { e: 0x3A2A08, ei: 0.2 }), 0, 0.61, 6, S);
wBox(0.9, 0.8, 0.9, wM(0x2A2A2E), 2.9, 0.4, 6, S);
var hp = wMesh(new THREE.PlaneGeometry(0.5, 0.3), wB(0xFF9A3A, { fog: false }), 2.9, 0.4, 6.46, S);
wCyl(0.08, 0.1, 1.3, wood, 2.6, 0.65, 4.2, S, 6);
var cr = wMesh(new THREE.TorusGeometry(0.3, 0.08, 6, 14), wM(0x2A6A3A), 2.6, 1.36, 4.2, S);
cr.rotation.x = Math.PI / 2;
for (var k = 0; k < 5; k++) {
var ka = k / 5 * Math.PI * 2, kx = 2.6 + Math.cos(ka) * 0.3, kz = 4.2 + Math.sin(ka) * 0.3;
wCyl(0.035, 0.035, 0.3, wax, kx, 1.55, kz, S, 6);
wCone(0.03, 0.09, flame, kx, 1.75, kz, S, 5);
}
lit.push([2.6, 1.8, 4.2]);
var sg = wSign(["The Candle-Dipper's", "Dipped by hand, one layer at a time"], 3.6, 1, "#1A2A4A", "#FFF0C8");
sg.position.set(0, 3.4, 3.1);
S.add(sg);
landBake(G, S);
lit.forEach(function (q) { var w = npLW(x0, z0, ry, q[0], q[2]); var gl = wGlow(0xFFD890, 1.2, 0.6); gl.position.set(w.x, y0 + q[1], w.z); G.add(gl); });
var sw = npLW(x0, z0, ry, 2.9, 6.5);
var sgl = wGlow(0xFF9A3A, 1.6, 0.5);
sgl.position.set(sw.x, y0 + 0.5, sw.z);
G.add(sgl);
NP.solids.push({ x: x0, z: z0, hw: 4.1, hd: 3.1, rot: ry });
var fw = npLW(x0, z0, ry, 0.4, 6);
NP.solids.push({ x: fw.x, z: fw.z, hw: 3, hd: 0.5, rot: ry });
var cw = npLW(x0, z0, ry, 2.6, 4.2);
NP.solids.push({ x: cw.x, z: cw.z, r: 0.4 });
NP.talkers.push({ x: cw.x, z: cw.z, r: 2.2, name: "A crown of candles", verb: "look", fn: function () { worldCard(worldFacts("Saint Lucia's Day", "13 December, in Sweden and the other Nordic countries", [], ["On Saint Lucia's Day, in the darkest time of the northern year, a girl dressed in a long white gown with a red sash wears a crown of candles and leads a procession, singing, with others carrying candles behind her.", "She brings saffron buns, called lussekatter, and ginger biscuits. Today the crowns usually have battery candles, which is much safer for hair.", "In the far north the sun hardly rises in December, so a festival of lights in the middle of the dark is very welcome."])); } });
var wk = npLW(x0, z0, ry, -2.8, 6.9);
npPut(G, "elf_wick", NP_ELF(3, ry + Math.PI * 0.75), wk.x, wk.z, { name: "Wick, the candle-dipper", persona: "You are Wick, the elf who makes the candles at the Candle-Dipper's at the North Pole in SomnuMatrix. You make dipped candles the old way: you dip a row of wicks into warm wax, lift them out, let the thin layer cool, and dip again, over and over, until they are thick enough; it takes dozens of dips. You are patient, warm, a little dreamy, and you love the quiet of the workshop and the steady light of a candle. You know about Saint Lucia's Day and the crown of candles. Always remind children that candles must only be lit by a grown-up." + NP_KIDS, greet: "Dip... and up. Dip... and up. Hello! Don't mind me, I can talk and dip at the same time. These ones have had thirty dips. Another twenty and they'll be ready." });
},
function (G) {
var x0 = 55, z0 = -135, ry = Math.atan2(-x0, 18 - z0), y0 = npHeight(x0, z0), S = new THREE.Group();
S.position.set(x0, y0, z0);
S.rotation.y = ry;
var straw = wM(0xD8B860), dark = wM(0xB8984A), rib = wM(0xC82A2A), wood = wM(0x6A4A2E), snow = wM(0xF6FAFF), roof = new THREE.MeshLambertMaterial({ color: 0x6A4A2E, side: THREE.DoubleSide });
var gt = new THREE.Group();
S.add(gt);
var bd = wCyl(1.2, 1.2, 4.2, straw, 0, 3.6, 0, gt, 12);
bd.rotation.z = Math.PI / 2;
[[-1.5, -0.7], [-1.5, 0.7], [1.5, -0.7], [1.5, 0.7]].forEach(function (q) { wCyl(0.32, 0.38, 3, straw, q[0], 1.5, q[1], gt, 8); wCyl(0.4, 0.4, 0.18, rib, q[0], 2.2, q[1], gt, 10); });
[-1.2, 0, 1.2].forEach(function (x) { var b = wMesh(new THREE.TorusGeometry(1.22, 0.1, 6, 18), rib, x, 3.6, 0, gt); b.rotation.y = Math.PI / 2; });
var nk = wCyl(0.55, 0.75, 2.2, straw, 2.4, 5, 0, gt, 10);
nk.rotation.z = -0.6;
var hd = wBox(1.8, 0.9, 0.9, straw, 3.4, 6.1, 0, gt);
hd.rotation.z = -0.35;
wBox(0.4, 0.6, 0.5, dark, 4.1, 5.55, 0, gt);
[-1, 1].forEach(function (s) { var hn = wMesh(new THREE.TorusGeometry(0.75, 0.16, 6, 12, Math.PI * 1.1), dark, 2.8, 6.9, s * 0.3, gt); hn.rotation.y = Math.PI; hn.rotation.z = 0.4; var ear = wCone(0.15, 0.6, straw, 3, 6.5, s * 0.6, gt, 5); ear.rotation.x = s * 1.3; });
var nb = wMesh(new THREE.TorusGeometry(0.62, 0.1, 6, 16), rib, 2.3, 4.9, 0, gt);
nb.rotation.y = Math.PI / 2;
nb.rotation.x = 0.6;
var tl = wCone(0.3, 1, straw, -2.4, 4.3, 0, gt, 6);
tl.rotation.z = 0.9;
for (var p = 0; p < 10; p++) {
var a = p / 10 * Math.PI * 2, a2 = (p + 1) / 10 * Math.PI * 2, px = Math.cos(a) * 6, pz = Math.sin(a) * 5, qx = Math.cos(a2) * 6, qz = Math.sin(a2) * 5;
wBox(0.14, 0.9, 0.14, wood, px, 0.45, pz, S);
var rp = wBox(0.05, 0.05, Math.hypot(qx - px, qz - pz), rib, (px + qx) / 2, 0.8, (pz + qz) / 2, S);
rp.rotation.y = Math.atan2(qx - px, qz - pz);
}
var sh = new THREE.Group();
sh.position.set(-9, 0, -4);
S.add(sh);
wBox(5, 3, 0.3, wood, 0, 1.5, -1.5, sh);
[-1, 1].forEach(function (s) { wBox(0.3, 3, 3, wood, s * 2.5, 1.5, 0, sh); });
var rf = wBox(5.6, 0.2, 3.8, roof, 0, 3.2, 0.1, sh);
rf.rotation.x = 0.15;
var rs = wBox(5.7, 0.12, 3.8, snow, 0, 3.33, 0.1, sh);
rs.rotation.x = 0.15;
wBox(3.6, 0.1, 1, wood, 0, 0.9, -0.8, sh);
[-1.6, 1.6].forEach(function (x) { wBox(0.1, 0.9, 0.8, wood, x, 0.45, -0.8, sh); });
for (var st = 0; st < 6; st++) {
var stx = -1.4 + st * 0.55, s1 = wBox(0.42, 0.02, 0.04, straw, stx, 0.97, -0.7, sh);
s1.rotation.y = 0.4;
var s2 = wBox(0.42, 0.02, 0.04, straw, stx, 0.97, -0.7, sh);
s2.rotation.y = -0.4 + Math.PI / 2;
var s3 = wBox(0.06, 0.03, 0.06, rib, stx, 0.98, -0.7, sh);
}
wBox(1.2, 0.5, 0.6, straw, 1.6, 0.25, 1, sh);
var sg = wSign(["The Yule Goat", "Please admire. Please don't climb."], 3.4, 0.95, "#5A1A1A", "#FFF0C8");
sg.position.set(0, 1.6, 6.4);
S.add(sg);
wBox(0.12, 1.1, 0.12, wood, 0, 0.55, 6.34, S);
landBake(G, S);
var hm = new THREE.LineBasicMaterial({ color: 0xE8C870 });
[-1.6, 0, 1.6].forEach(function (x, i) { var w = npLW(x0, z0, ry, -9 + x, -2.6), e = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.32 + i % 2 * 0.1, 0)), hm); e.position.set(w.x, y0 + 2.35 - i % 2 * 0.2, w.z); e.rotation.y = ry; G.add(e); });
NP.solids.push({ x: x0, z: z0, hw: 2.6, hd: 1.5, rot: ry });
var hw = npLW(x0, z0, ry, 3.4, 0);
NP.solids.push({ x: hw.x, z: hw.z, r: 1.1 });
[[0, -1.5, 2.6, 0.2], [-2.5, 0, 0.2, 1.6], [2.5, 0, 0.2, 1.6], [0, -0.8, 1.9, 0.5]].forEach(function (q) { var w = npLW(x0, z0, ry, -9 + q[0], -4 + q[1]); NP.solids.push({ x: w.x, z: w.z, hw: q[2], hd: q[3], rot: ry }); });
var sw = npLW(x0, z0, ry, 0, 6.4);
NP.solids.push({ x: sw.x, z: sw.z, r: 0.2 });
var gw = npLW(x0, z0, ry, 2.2, 6.2);
NP.talkers.push({ x: gw.x, z: gw.z, r: 2.6, name: "The Yule Goat", verb: "look", fn: function () { worldCard(worldFacts("The Yule Goat", "An old Scandinavian Christmas figure", [], ["In Sweden it is the julbock, in Finland the joulupukki: the Yule goat. Long ago people dressed up as a goat to go door to door at Christmas, and small goats of straw tied with red ribbon are still a favourite decoration.", "In the town of Gävle, in Sweden, a straw goat about 13 metres tall has been built in the main square every Christmas since 1966.", "In Finland the straw mobiles hanging over the Christmas table are called himmeli, made of straws threaded into eight-sided shapes."])); } });
var hl = npLW(x0, z0, ry, -8.4, -2);
npPut(G, "elf_halm", NP_ELF(1, ry), hl.x, hl.z, { name: "Halm, the straw-plaiter", persona: "You are Halm, the elf who plaits straw at the North Pole in SomnuMatrix: you built the great Yule Goat in front of your shed, and you make straw stars, little straw goats tied with red ribbon, and Finnish himmeli mobiles. You are proud, cheerful and a bit of a show-off about the goat, which you rebuild every year, and you love telling the old Scandinavian stories of the Yule goat." + NP_KIDS, greet: "Isn't she magnificent? Four thousand straws and two kilometres of ribbon, near enough. I counted. Well, I counted the first hundred. Want me to show you how to plait a star?" });
},
function (G) {
var shop = NP.shop;
function put(seed, o, x, z, talk, wander) { var g = wPerson(seed, o); g.position.set(x, npHeight(x, z) + (o.y || 0), z); g.rotation.y = o.rot || 0; G.add(g); var P = { g: g, wander: wander, elf: !!o.elf }; NP.people.push(P); if (talk)
NP.talkers.push({ p: P, r: o.elf ? 2.6 : 3.6, name: talk.name, t: talk }); return P; }
put("santa", { sex: "m", look: { top: 0xB81E22, topKind: "shirt", bottom: 0xB81E22, shoes: 0x141414, skin: 0xF0C8A8, hair: 0xF4F4F4, hairStyle: "short", beard: "full", hat: "beanie", hatColor: 0xB81E22, layer: "longcoat", layerColor: 0xB81E22 }, scale: 1.08, rot: Math.PI }, shop.x + 14, shop.z - 10, { name: "Santa Claus", persona: "You are Santa Claus (Father Christmas), at your workshop at the North Pole in SomnuMatrix. You are warm, jolly, wise and gentle, with a hearty laugh (ho ho ho), endlessly patient and kind, and you love to hear what people hope for and what they are thankful for. You talk about the workshop, the elves, the reindeer (Rudolph especially), Mrs Claus's cocoa and cookies, the sleigh and the night before Christmas. Never promise a specific present; never ask for personal details such as a child's address, full name or school; encourage kindness, sharing and family. If someone mentions a letter they posted, thank them warmly. Keep it magical and suitable for small children.", greet: "Ho ho ho! Well now, look who found the way down the chimney! Not many do it that way round. Come in, come in, warm your hands by the fire. Now, what's your name, and what brings you to the North Pole?" }, null);
put("mrsclaus", { sex: "f", look: { top: 0xA82A3A, topKind: "dress", bottom: 0xA82A3A, shoes: 0x3A2A1A, skin: 0xF0C8A8, hair: 0xF0F0F0, hairStyle: "short", hat: "none", layer: "apron", layerColor: 0xF4F0E8 } }, 48 - 2, -56 + 8, { name: "Mrs Claus", persona: "You are Mrs Claus, at the Clauses' cottage at the North Pole in SomnuMatrix: warm, funny, practical and kind, the one who really keeps the North Pole running. You bake gingerbread and make the best hot cocoa in the Arctic, and you happily share (simple, safe) recipes. You know all the elves by name and gently tease Santa about his cookie habit. Keep it cosy and suitable for children.", greet: "Oh, hello, dear! You must be frozen. Come in and have a mug of cocoa; there's gingerbread just out of the oven. Did Santa forget to wipe his boots again? He always does." }, null);
var elves = [["Tinsel", "the elf who paints the toys: chatty, artistic, splashed with paint"], ["Pip", "the youngest elf on the bench, learning to make wooden trains; excitable, always asking questions"], ["Juniper", "the elf who checks every toy is safe and well made before it goes on the belt; serious, but secretly very funny"], ["Sprocket", "the elf in charge of the wind-up toys and the belt; loves gears and gadgets"], ["Holly", "the elf who wraps the presents, very fast, with perfect bows"], ["Bramble", "the elf who looks after the reindeer; knows each one's favourite snack"]];
elves.forEach(function (e, i) {
var at = i < 4 ? { x: shop.x - 15 + i * 10, z: shop.z - 2.6 } : i === 4 ? { x: shop.x + 6, z: shop.z + 7.6 } : { x: -56, z: -8 };
put("elf_" + i, { child: true, elf: 1, sex: i % 2 ? "f" : "m", look: { top: [0x2A8A3A, 0xC82A2A][i % 2], topKind: "shirt", bottom: [0xC82A2A, 0x2A8A3A][i % 2], shoes: 0x3A2A1A, hat: "beanie", hatColor: [0xC82A2A, 0x2A8A3A][i % 2] }, rot: i < 4 ? 0 : Math.PI }, at.x, at.z, { name: e[0] + " the elf", persona: "You are " + e[0] + ", " + e[1] + ", one of the toymaking elves at Santa's workshop at the North Pole in SomnuMatrix. Elves are small, quick, cheerful and very proud of their work. Talk about the workshop, how toys are made, the reindeer and Christmas, in a merry, playful voice. Keep it suitable for small children.", greet: ["Oh! A visitor! Careful, the paint's still wet on that one.", "Hello! Hello! Do you want to see my train? It goes choo, and it nearly goes choo-choo.", "Hm. Please don't touch the toys until they've been checked. Oh, all right, you can hold that one.", "Mind the belt! It doesn't stop for anybody, not even Santa.", "Bows! Bows! Ribbons! Oh, hello. Want to see me wrap a present in four seconds?", "Shh, the reindeer are resting. Want to meet them? Blitzen likes carrots. Comet likes ear scratches."][i] }, i === 5 ? { r: 6, sp: 1.2 } : null);
});
for (var c = 0; c < 6; c++) {
var a = c / 6 * 6.283, x = Math.cos(a) * 24, z = 18 + Math.sin(a) * 24;
put("elf_c" + c, { child: true, elf: 1, sex: c % 2 ? "f" : "m", look: { top: [0x2A8A3A, 0xC82A2A, 0x2A5AA8][c % 3], topKind: "shirt", bottom: 0xF4F0E8, hat: "beanie", hatColor: [0xC82A2A, 0x2A8A3A][c % 2] } }, x, z, null, { r: 14, sp: 1.6 });
}
},
function (opt) {
camera.position.set(NP.base + 0, 1.72, 52);
yaw = 0;
pitch = 0.05;
setStatus("<b>The North Pole.</b> You tumble out of a snowdrift into a village of lit windows, under the northern lights. Ahead, Santa's workshop; bells somewhere. (Back, or the workshop fireplace, takes you home up the chimney.)");
},
function (dt) {
var L = worldLocal(), t = WLD.t;
NP.lit = (NP.lit || 0) - dt;
if (NP.lit <= 0 && NP.G && NP.ground) {
NP.lit = 1;
var sum = 0;
NP.G.traverse(function (o) { if (o.isPointLight && o.visible)
sum += o.intensity; });
NP.snowK = Math.min(1, Math.max(0, (sum - 3) / 6));
}
if (NP.ground && NP.snowK !== undefined) {
var gc = NP.ground.material.color, tg = NP.snowCol || (NP.snowCol = new THREE.Color());
tg.setHex(0xFFFFFF).lerp(NP.nightCol || (NP.nightCol = new THREE.Color(0xA8B6C8)), NP.snowK);
gc.lerp(tg, Math.min(1, dt * 1.5));
}
NP.snow.position.set(L.x, L.y - 15, L.z);
var sp = NP.snow.geometry.attributes.position;
for (var i = 0; i < sp.count; i++) {
var y = sp.getY(i) - dt * (1.4 + (i % 5) * 0.2);
if (y < 0)
y += 50;
sp.setY(i, y);
sp.setX(i, sp.getX(i) + Math.sin(t + i) * dt * 0.3);
}
sp.needsUpdate = true;
NP.aurora.forEach(function (m) { var p = m.geometry.attributes.position, b = m.userData.base; for (var j = 0; j < p.count; j++) {
var x = b[j * 3];
p.array[j * 3 + 2] = Math.sin(x * 0.012 + t * 0.25 + m.userData.ph) * 40 + Math.sin(x * 0.031 - t * 0.4) * 14;
} p.needsUpdate = true; m.material.opacity = 0.45 + 0.2 * Math.sin(t * 0.3 + m.userData.ph); });
if (NP.star)
NP.star.rotation.y += dt;
NP.belt.forEach(function (b) { b.x += dt * 1.2; if (b.x > 8.5)
b.x -= 27; b.g.position.x = b.x; });
NP.fire.forEach(function (f, k) { f.scale.y = 0.8 + 0.35 * Math.abs(Math.sin(t * 7 + k * 1.3)); });
NP.deer.forEach(function (d) { var h = d.g.children[3]; if (h)
h.rotation.x = Math.sin(t * 0.8 + d.ph) * 0.15 + 0.1; if (d.g.userData.nose)
d.g.userData.nose.material.color.setHSL(0, 1, 0.55); });
NP.bears.forEach(function (B) { B.t += dt; B.a += dt * 0.05; var x = B.hx + Math.cos(B.a) * 30, z = B.hz + Math.sin(B.a) * 30; B.g.position.set(x, npHeight(x, z), z); B.g.rotation.y = -B.a; B.g.userData.legs.forEach(function (l, k) { l.rotation.x = Math.sin(B.t * 3 + (k % 2 ? Math.PI : 0) + (k > 1 ? Math.PI / 2 : 0)) * 0.35; }); });
if (NP.fox) {
var fa = t * 0.2;
NP.fox.position.set(-70 + Math.cos(fa) * 18, npHeight(-70 + Math.cos(fa) * 18, 40 + Math.sin(fa) * 18), 40 + Math.sin(fa) * 18);
NP.fox.rotation.y = -fa;
}
NP.people.forEach(function (P) { if (P.wander)
wWander(P.g, dt, npHeight, P.wander); });
if (NP.trot) {
var T = NP.trot;
T.t += dt;
T.a += dt * 0.22;
var ta = T.a, tx = T.cx + Math.cos(ta) * T.A, tz = T.cz + Math.sin(ta) * T.B, lift = Math.pow(Math.max(0, Math.cos(ta - Math.PI)), 10) * 1.4;
T.g.position.set(tx, npHeight(tx, tz) + lift, tz);
T.g.rotation.y = Math.atan2(-T.A * Math.sin(ta), T.B * Math.cos(ta));
(T.g.userData.legs || []).forEach(function (l, k) { l.rotation.x = Math.sin(T.t * 5 + (k % 2 ? Math.PI : 0) + (k > 1 ? Math.PI / 2 : 0)) * (lift > 0.2 ? 0.1 : 0.4); });
}
if (NP.train)
NP.train.rotation.y -= dt * 0.45;
if (NP.rock)
NP.rock.rotation.x = Math.sin(t * 1.4) * 0.14;
if (NP.ball)
NP.ball.position.y = NP.ballY + Math.abs(Math.sin(t * 1.8)) * 1.1;
NP.people.forEach(function (P) {
if (!P.elf || P.hatted)
return;
var hb = null;
P.g.traverse(function (o) { if (!hb && o.isBone && /^head$/i.test(o.name))
hb = o; });
if (!hb)
return;
P.hatted = 1;
var k = P.g.getWorldScale(new THREE.Vector3()).y / Math.max(0.001, hb.getWorldScale(new THREE.Vector3()).y);
var hat = new THREE.Group();
var c = wCone(0.13, 0.4, wM(0xC82A2A), 0, 0.38, 0, hat, 10);
c.rotation.z = 0.25;
wSph(0.04, wM(0xF4F0E8), -0.05, 0.58, 0, hat, 6);
var brim = wMesh(new THREE.TorusGeometry(0.13, 0.03, 6, 14), wM(0xF4F0E8), 0, 0.19, 0, hat);
brim.rotation.x = Math.PI / 2;
[-1, 1].forEach(function (s) { var e = wCone(0.03, 0.12, wM(0xF0C8A0), s * 0.13, 0.06, 0, hat, 5); e.rotation.z = s * -1.2; });
hat.scale.setScalar(k);
hb.add(hat);
});
if (!NP.smokeT || t - NP.smokeT > 0.4) {
NP.smokeT = t;
[NP.chim, NP.chim2, NP.chim3, NP.chim4].forEach(function (c) { if (!c)
return; var s = wGlow(0xC8C8D0, 1.5, 0.5); s.material.blending = THREE.NormalBlending; s.position.set(c.x, c.y, c.z); WORLDS.northpole.g.add(s); NP.smoke.push({ s: s, t: 0 }); });
}
for (var q = NP.smoke.length - 1; q >= 0; q--) {
var S = NP.smoke[q];
S.t += dt;
S.s.position.y += dt * 1.5;
S.s.position.x += dt * 0.6;
S.s.scale.setScalar(1.5 + S.t * 1.3);
S.s.material.opacity = Math.max(0, 0.5 - S.t * 0.08);
if (S.t > 6) {
WORLDS.northpole.g.remove(S.s);
NP.smoke.splice(q, 1);
}
}
var inShop = Math.abs(L.x - NP.shop.x) < NP.shop.W / 2 && Math.abs(L.z - NP.shop.z) < NP.shop.D / 2;
NP.snow.visible = !inShop;
var npAt = inShop ? null : NP_SITES.filter(function (q) { return Math.hypot(L.x - q[0], L.z - q[1]) < q[2] + 6; })[0];
worldBanner("<b>The North Pole</b> · " + (inShop ? "Santa's Workshop" : npAt ? npAt[3] : L.z < -170 ? "the sea ice" : "the village"));
if (Math.hypot(L.x - NP.homeFire.x, L.z - NP.homeFire.z) < 2.6)
return worldPrompt("<b>The workshop fireplace</b> · <b>press E</b> to go home up the chimney", npHome);
var got = wPickNear(NP.talkers, L);
if (got)
return worldPrompt("<b>" + esc(got.name) + "</b> · <b>press E</b> to " + (got.verb || (got.fn ? "look" : "talk")), got.fn ? got.fn : function () { wTalk(got.t); });
worldPrompt(null);
}
];
});
