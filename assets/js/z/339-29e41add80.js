/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(339, function () {
"use strict";
return [
function (el) {
if (EL.tex[el])
return EL.tex[el];
var c = document.createElement("canvas");
c.width = c.height = 256;
var x = c.getContext("2d"), R = wRand(el.length * 131 + 7);
var g = x.createLinearGradient(0, 0, 256, 256);
g.addColorStop(0, "#E8E8E8");
g.addColorStop(.5, "#D2D2D2");
g.addColorStop(1, "#E2E2E2");
x.fillStyle = g;
x.fillRect(0, 0, 256, 256);
for (var i = 0; i < 220; i++) {
x.strokeStyle = "rgba(255,255,255," + (0.05 + R() * 0.08) + ")";
var y = R() * 256;
x.beginPath();
x.moveTo(0, y);
x.lineTo(256, y + R() * 4 - 2);
x.stroke();
}
x.strokeStyle = "rgba(40,40,40,.26)";
x.lineWidth = 1.3;
if (el === "fire")
for (var f = 0; f < 9; f++) {
var fx = R() * 256, fy = 256;
x.beginPath();
x.moveTo(fx, fy);
for (var s = 0; s < 8; s++) {
fy -= 28;
fx += Math.sin(s * 1.3 + f) * 10;
x.lineTo(fx, fy);
}
x.stroke();
}
else if (el === "water")
for (var w = 0; w < 10; w++) {
x.beginPath();
for (var wx = 0; wx <= 256; wx += 8) {
var wy = w * 26 + Math.sin(wx * 0.05 + w) * 7;
if (wx)
x.lineTo(wx, wy);
else
x.moveTo(wx, wy);
}
x.stroke();
}
else if (el === "earth") {
for (var h = 0; h < 8; h++) {
x.beginPath();
x.moveTo(0, h * 32 + R() * 6);
for (var hx = 0; hx <= 256; hx += 32)
x.lineTo(hx, h * 32 + R() * 10);
x.stroke();
}
for (var v = 0; v < 30; v++) {
var vx = R() * 256, vy = R() * 256;
x.beginPath();
x.moveTo(vx, vy);
x.lineTo(vx + R() * 8 - 4, vy + 28);
x.stroke();
}
}
else if (el === "air")
for (var a = 0; a < 7; a++) {
var cx = R() * 256, cy = R() * 256;
x.beginPath();
for (var t = 0; t < 6.5; t += 0.2) {
var rr = 3 + t * 5;
if (t)
x.lineTo(cx + Math.cos(t) * rr, cy + Math.sin(t) * rr);
else
x.moveTo(cx + rr, cy);
}
x.stroke();
}
else if (el === "storm")
for (var z = 0; z < 8; z++) {
var zx = R() * 256, zy = 0;
x.beginPath();
x.moveTo(zx, zy);
while (zy < 256) {
zy += 18 + R() * 14;
zx += R() * 30 - 15;
x.lineTo(zx, zy);
}
x.stroke();
}
else if (el === "life")
for (var l = 0; l < 12; l++) {
var lx = R() * 256, ly = R() * 256, ang = R() * 6.28, len = 18 + R() * 16;
x.beginPath();
x.moveTo(lx, ly);
x.lineTo(lx + Math.cos(ang) * len, ly + Math.sin(ang) * len);
x.stroke();
for (var k = 1; k < 4; k++) {
var bx = lx + Math.cos(ang) * len * k / 4, by = ly + Math.sin(ang) * len * k / 4;
x.beginPath();
x.moveTo(bx, by);
x.lineTo(bx + Math.cos(ang + 0.8) * 6, by + Math.sin(ang + 0.8) * 6);
x.moveTo(bx, by);
x.lineTo(bx + Math.cos(ang - 0.8) * 6, by + Math.sin(ang - 0.8) * 6);
x.stroke();
}
}
var t2 = new THREE.CanvasTexture(c);
t2.wrapS = t2.wrapT = THREE.RepeatWrapping;
EL.tex[el] = t2;
return t2;
},
function (el) {
var E = EL_BY[el], k = "cloth_" + el;
if (EL.tex[k])
return EL.tex[k];
var c = document.createElement("canvas");
c.width = 256;
c.height = 512;
var x = c.getContext("2d"), R = wRand(el.length * 71 + 3), C = E.cloth;
var g = x.createLinearGradient(0, 0, 0, 512);
g.addColorStop(0, C[0]);
g.addColorStop(.55, C[1]);
g.addColorStop(1, C[0]);
x.fillStyle = g;
x.fillRect(0, 0, 256, 512);
for (var b = 0; b < 8; b++) {
var bx = 256 * (b + 0.5) / 8, gr = x.createLinearGradient(0, 40, 0, 470), col = b % 2 ? C[2] : C[3];
gr.addColorStop(0, "rgba(0,0,0,0)");
gr.addColorStop(.35, col);
gr.addColorStop(1, "rgba(0,0,0,0)");
x.globalAlpha = 0.32;
x.fillStyle = gr;
x.beginPath();
x.moveTo(bx - 9, 0);
for (var y = 0; y <= 512; y += 16)
x.lineTo(bx - 11 + Math.sin(y * 0.02 + b) * 8, y);
for (var y2 = 512; y2 >= 0; y2 -= 16)
x.lineTo(bx + 11 + Math.sin(y2 * 0.02 + b) * 8, y2);
x.closePath();
x.fill();
}
x.globalAlpha = 1;
var tr = "#" + ("000000" + E.trim.toString(16)).slice(-6);
x.fillStyle = tr;
x.fillRect(0, 478, 256, 34);
x.fillStyle = C[3];
x.fillRect(0, 478, 256, 3);
x.fillRect(0, 506, 256, 3);
for (var k2 = 0; k2 < 256; k2 += 21) {
x.fillStyle = C[3];
x.beginPath();
x.moveTo(k2 + 10, 483);
x.lineTo(k2 + 17, 494);
x.lineTo(k2 + 10, 503);
x.lineTo(k2 + 3, 494);
x.closePath();
x.fill();
}
x.fillStyle = tr;
x.fillRect(0, 0, 256, 5);
var t = new THREE.CanvasTexture(c);
EL.tex[k] = t;
return t;
},
function (el) {
if (EL.mats[el])
return EL.mats[el];
var B = rlFitMats(), E = EL_BY[el], M = {}, tex = elEngrave(el);
function ph(o) { return new THREE.MeshPhongMaterial(o); }
M.steel = ph({ color: E.col, map: tex, bumpMap: tex, bumpScale: 0.008, shininess: 100, specular: 0xF0F0F0, emissive: E.deep, emissiveIntensity: 0.18, side: THREE.DoubleSide });
M.steelD = ph({ color: E.deep, shininess: 70, specular: 0xC8C8C8, emissive: E.deep, emissiveIntensity: 0.25, side: THREE.DoubleSide });
M.gold = ph({ color: E.trim, shininess: 110, specular: 0xFFF0C8, emissive: 0x1A1206, side: THREE.DoubleSide });
M.crystal = ph({ color: E.glow, transparent: true, opacity: 0.93, shininess: 150, specular: 0xFFFFFF, emissive: E.glow, emissiveIntensity: 0.45, flatShading: true });
M.gem = ph({ color: E.glow, shininess: 160, specular: 0xFFFFFF, emissive: E.glow, emissiveIntensity: 0.7, flatShading: true });
M.iceHammer = el === "earth" ? ph({ color: 0x6A7A5A, shininess: 40, specular: 0x8A9A7A, flatShading: true }) : M.crystal;
M.fur = new THREE.MeshLambertMaterial({ color: new THREE.Color(E.cloth[2]), map: B.fur && B.fur.map || null });
M.leather = ph({ color: E.deep, shininess: 20, specular: 0x303030 });
M.cape = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: elCloth(el), side: THREE.FrontSide });
M.lining = new THREE.MeshLambertMaterial({ color: new THREE.Color(E.cloth[1]), side: THREE.BackSide });
EL.mats[el] = M;
return M;
},
function (key) {
var R = EL_R[key], E = EL_BY[R.el], M = elMats(R.el);
var g = elWithMats(R.el, function () { return rlFitWeapon(EL_FORM_ICE[R.form]); });
var top = { sword: 1.1, spear: 1.75, bow: 0.6, hammer: 0.72, staff: 1.42, dagger: 0.4, shield: 0.2 }[R.form] || 1, inner = g.children[0] && (R.form === "bow" || R.form === "shield") ? g.children[0] : g;
function add(o) { inner.add(o); return o; }
function m(geo, mat, x, y, z) { var o = new THREE.Mesh(geo, mat); o.position.set(x, y, z); return add(o); }
var glow = M.gem, mat = M.crystal;
if (R.el === "fire") {
for (var i = 0; i < (R.form === "dagger" ? 2 : 4); i++) {
var f = m(new THREE.ConeGeometry(0.018, 0.12, 5), mat, (i % 2 ? 0.035 : -0.035), top * (0.45 + i * 0.12), 0);
f.rotation.z = (i % 2 ? -0.35 : 0.35);
}
m(new THREE.OctahedronGeometry(0.03, 0), glow, 0, top * 0.2 + (R.form === "hammer" ? 0.4 : 0), 0.02);
}
else if (R.el === "water") {
if (R.form === "spear") {
[-1, 1].forEach(function (s) { var p = m(new THREE.ConeGeometry(0.02, 0.3, 5), mat, s * 0.08, 1.55, 0); p.rotation.z = -s * 0.25; var b = m(new THREE.CylinderGeometry(0.008, 0.008, 0.18, 6), M.gold, s * 0.05, 1.39, 0); b.rotation.z = s * 1.1; });
}
var wave = m(new THREE.TorusGeometry(0.05, 0.008, 6, 16, Math.PI * 1.4), mat, 0, top * 0.25, 0);
wave.rotation.y = Math.PI / 2;
m(new THREE.SphereGeometry(0.022, 10, 8), new THREE.MeshPhongMaterial({ color: 0xF4F0EA, shininess: 140, specular: 0xFFFFFF, emissive: 0x2A2A30 }), 0, top * 0.25, 0.03);
}
else if (R.el === "earth") {
for (var j = 0; j < 3; j++) {
var s = m(new THREE.DodecahedronGeometry(0.025, 0), glow, (j - 1) * 0.03, top * 0.22, 0.02);
s.rotation.set(j, j * 2, 0);
}
if (R.form === "spear")
for (var r2 = 0; r2 < 3; r2++) {
var root = m(new THREE.TorusGeometry(0.03, 0.006, 5, 10, Math.PI * 1.2), M.steelD, 0, 0.2 + r2 * 0.3, 0);
root.rotation.set(Math.PI / 2, 0, r2);
}
}
else if (R.el === "air") {
for (var q = 0; q < 3; q++) {
var fe = m(new THREE.PlaneGeometry(0.035, 0.16), new THREE.MeshLambertMaterial({ color: 0xF4F8FA, side: THREE.DoubleSide }), 0.03, top * 0.18 - q * 0.04, 0);
fe.rotation.set(0, q * 0.6, -0.5 - q * 0.15);
}
var sw = m(new THREE.TorusGeometry(0.045, 0.005, 5, 18, Math.PI * 1.6), mat, 0, top * 0.4, 0);
sw.rotation.x = Math.PI / 2;
}
else if (R.el === "storm") {
var pts = [], y = top * 0.15;
for (var z = 0; z < 6; z++) {
pts.push(new THREE.Vector3((z % 2 ? 0.03 : -0.03), y, 0.012));
y += top * 0.12;
}
add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.1), 24, 0.006, 5, false), glow));
m(new THREE.SphereGeometry(0.028, 10, 8), glow, 0, top * 0.1 + (R.form === "hammer" ? 0.45 : 0), 0.025);
}
else if (R.el === "life") {
var lm = new THREE.MeshLambertMaterial({ color: 0x5AB84A, side: THREE.DoubleSide });
var vine = [];
for (var v = 0; v <= 24; v++) {
var tv = v / 24;
vine.push(new THREE.Vector3(Math.cos(tv * 16) * 0.03, top * (0.05 + tv * 0.6), Math.sin(tv * 16) * 0.03));
}
add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(vine), 40, 0.005, 5, false), new THREE.MeshLambertMaterial({ color: 0x3A7A2A })));
for (var lf = 0; lf < 5; lf++) {
var leaf = m(new THREE.CircleGeometry(0.03, 6), lm, Math.cos(lf * 3.2) * 0.04, top * (0.12 + lf * 0.11), Math.sin(lf * 3.2) * 0.04);
leaf.scale.set(0.55, 1, 1);
leaf.rotation.set(0, lf * 3.2, 0.6);
}
m(new THREE.SphereGeometry(0.02, 8, 6), new THREE.MeshPhongMaterial({ color: 0xF2C8E8, emissive: 0x5A2A4A, emissiveIntensity: 0.4 }), 0, top * 0.72, 0);
}
return g;
},
function () {
if (EL_FXGEO)
return EL_FXGEO;
EL_FXGEO = { sph: new THREE.SphereGeometry(1, 14, 10), cone: new THREE.ConeGeometry(0.35, 1.6, 7), ico: new THREE.IcosahedronGeometry(0.5, 0),
tor: new THREE.TorusGeometry(1, 0.06, 6, 28), leaf: new THREE.CircleGeometry(0.18, 6), dome: new THREE.SphereGeometry(1, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2) };
return EL_FXGEO;
},
function (el, x, y, z, size, kind) {
if (typeof scene === "undefined" || !scene)
return;
var E = EL_BY[el], G = elFxGeo(), g = new THREE.Group(), parts = [], s = size || 1, R = Math.random;
function put(geo, col, op, px, py, pz, sx, sy, sz, rx, ry, rz) { var o = new THREE.Mesh(geo, elFxMat(col, op)); o.position.set(px, py, pz); o.scale.set(sx, sy, sz); o.rotation.set(rx || 0, ry || 0, rz || 0); g.add(o); parts.push({ o: o, op: op }); return o; }
if (kind === "dome")
put(G.dome, E.glow, 0.28, 0, 0, 0, 2.4 * s, 2.4 * s, 2.4 * s);
else if (kind === "mend") {
put(G.tor, E.glow, 0.55, 0, 0.1, 0, 1.4 * s, 1.4 * s, 1.4 * s, Math.PI / 2);
for (var i0 = 0; i0 < 8; i0++) {
var a0 = i0 / 8 * 6.283;
put(G.leaf, E.glow, 0.6, Math.cos(a0) * 1.1 * s, 0.3 + R() * 0.6, Math.sin(a0) * 1.1 * s, 1, 1, 1, 0, a0, 0.4);
}
}
else if (el === "fire") {
for (var i = 0; i < 6; i++) {
var a = i / 6 * 6.283;
put(G.cone, i % 2 ? E.glow : 0xFF7A2A, 0.62, Math.cos(a) * 0.5 * s, 0.8 * s, Math.sin(a) * 0.5 * s, s * (0.7 + R() * 0.4), s * (0.8 + R() * 0.5), s * (0.7 + R() * 0.4));
}
put(G.sph, 0xFFC070, 0.35, 0, 0.7 * s, 0, 0.8 * s, 0.8 * s, 0.8 * s);
}
else if (el === "water") {
put(G.tor, E.glow, 0.5, 0, 0.15, 0, 1.2 * s, 1.2 * s, 1.2 * s, Math.PI / 2);
put(G.tor, 0x4AA8D8, 0.4, 0, 0.35, 0, 0.8 * s, 0.8 * s, 0.8 * s, Math.PI / 2);
for (var w = 0; w < 7; w++) {
var aw = w / 7 * 6.283;
put(G.sph, E.glow, 0.55, Math.cos(aw) * 0.6 * s, 0.5 + R() * 0.6 * s, Math.sin(aw) * 0.6 * s, 0.1 * s, 0.14 * s, 0.1 * s);
}
}
else if (el === "earth") {
for (var e = 0; e < 6; e++) {
var ae = e / 6 * 6.283 + R() * 0.3;
put(G.ico, e % 2 ? 0x7A6A4A : 0x5A4A32, 0.9, Math.cos(ae) * 0.9 * s, 0.2 * s, Math.sin(ae) * 0.9 * s, s * (0.6 + R() * 0.5), s * (0.8 + R() * 0.6), s * (0.6 + R() * 0.5), R() * 3, R() * 3, 0);
}
put(G.sph, E.glow, 0.25, 0, 0.3 * s, 0, 1.2 * s, 0.4 * s, 1.2 * s);
}
else if (el === "air") {
for (var r = 0; r < 3; r++)
put(G.tor, E.glow, 0.42, 0, 0.4 + r * 0.5 * s, 0, (0.7 + r * 0.35) * s, (0.7 + r * 0.35) * s, (0.7 + r * 0.35) * s, Math.PI / 2 + 0.2 * r, 0, 0.15 * r);
}
else if (el === "storm") {
var pts = [], py = 2.6 * s;
for (var z = 0; z < 7; z++) {
pts.push(new THREE.Vector3((z % 2 ? 0.25 : -0.25) * s, py, (R() - 0.5) * 0.2));
py -= 0.4 * s;
}
var tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.05), 30, 0.05 * s, 5, false), elFxMat(E.glow, 0.8));
g.add(tube);
parts.push({ o: tube, op: 0.8, own: 1 });
put(G.sph, 0x8A7AFF, 0.35, 0, 0.3, 0, 0.9 * s, 0.5 * s, 0.9 * s);
}
else if (el === "life") {
for (var l = 0; l < 10; l++) {
var al = l / 10 * 6.283;
put(G.leaf, l % 3 ? 0x6AC85A : 0xF2C8E8, 0.75, Math.cos(al) * 0.7 * s, 0.3 + R() * 1.0 * s, Math.sin(al) * 0.7 * s, 1, 1, 1, R() * 3, al, R() * 3);
}
put(G.sph, E.glow, 0.25, 0, 0.5 * s, 0, 0.9 * s, 0.9 * s, 0.9 * s);
}
g.position.set(x, y, z);
scene.add(g);
EL.fx.push({ g: g, parts: parts, t: 0, life: kind === "dome" ? 2.2 : 1.2, grow: kind === "dome" ? 0.2 : 0.6, rise: el === "air" || el === "life" ? 0.8 : el === "fire" ? 0.5 : 0 });
},
function (el, big) {
var E = EL_BY[el], P = camera.position, dir = new THREE.Vector3(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
var g = new THREE.Group(), G = elFxGeo(), core = new THREE.Mesh(G.sph, elFxMat(E.glow, 0.85));
core.scale.setScalar(big ? 0.22 : 0.15);
g.add(core);
var trail = new THREE.Mesh(G.sph, elFxMat(E.col, 0.35));
trail.scale.set(0.12, 0.12, 0.5);
trail.position.z = 0.35;
g.add(trail);
g.position.set(P.x + dir.x * 0.8, P.y - 0.25 + dir.y * 0.8, P.z + dir.z * 0.8);
g.lookAt(g.position.clone().add(dir));
g.rotateY(Math.PI);
scene.add(g);
EL.fx.push({ g: g, bolt: { dir: dir, spd: 30, left: 1.2, el: el, big: big }, parts: [{ o: core, op: 0.85 }, { o: trail, op: 0.35 }], t: 0, life: 1e9 });
},
function (key) {
var R = EL_R[key];
if (!R)
return false;
if (RL.cool > 0)
return true;
RL.cool = 0.6;
var P = camera.position, fx = -Math.sin(yaw), fz = -Math.cos(yaw), twice = elPlateEl() === R.el;
function at(d, side, size, kind) { var x = P.x + fx * d + (side || 0) * fz, z = P.z + fz * d - (side || 0) * fx, y = (typeof supportAt === "function") ? supportAt(x, z, P.y - 1.72) : P.y - 1.72; elBurst(R.el, x, y, z, size || 1, kind); }
var tones = { fire: [300, 0.2], water: [440, 0.25], earth: [110, 0.35], air: [660, 0.2], storm: [180, 0.3], life: [520, 0.25] }[R.el] || [440, 0.2];
elTone(tones[0], tones[1]);
if (key === "evergreen") {
at(0, 0, 1.2, "mend");
if (twice)
at(0, 0, 1.8, "mend");
elSay("A ring of green light rises round you.");
return true;
}
if (R.form === "sword") {
at(3.5);
if (twice) {
at(6);
at(3.5, 2);
at(3.5, -2);
}
RL.swing = 0.4;
elSay("The " + elEsc(EL_BY[R.el].name.toLowerCase()) + " runs out ahead of the blade.");
return true;
}
if (R.form === "hammer") {
at(0.6, 0, 1.3);
at(2.5, 0);
at(-0.2, 2.4);
at(-0.2, -2.4);
if (twice) {
at(4.5);
at(-2.5);
}
RL.swing = 0.45;
elSay("It comes down, and the " + elEsc(EL_BY[R.el].name.toLowerCase()) + " bursts all round you.");
return true;
}
if (R.form === "dagger") {
at(1.6, 0, 0.6);
if (twice)
at(2.8, 0, 0.6);
RL.swing = 0.3;
return true;
}
if (R.form === "shield") {
at(0, 0, 1, "dome");
elSay("A ward of " + elEsc(EL_BY[R.el].name.toLowerCase()) + " rises round you.");
return true;
}
elBolt(R.el, twice);
if (twice)
setTimeout(function () { elBolt(R.el, false); }, 160);
RL.swing = 0.25;
return true;
},
function () {
var C = elCrown(), want = C ? C.key : "";
if (want === EL.lightKey)
return;
if (EL.light && EL.light.parent)
EL.light.parent.remove(EL.light);
EL.light = null;
EL.lightKey = want;
if (C && typeof scene !== "undefined" && scene) {
EL.light = new THREE.PointLight(EL_BY[C.el].glow, 0.55, 18, 1.4);
scene.add(EL.light);
}
},
function () {
if (!elArmsReady() || typeof bkpKept !== "function")
return;
var K = bkpKept(), changed = false, have = {};
if (!elKeeper())
Object.keys(EL_ARMS).forEach(function (k) { if (typeof rlOwned === "function" && rlOwned(k))
have["bw_rl" + k] = RL_BY[k]; });
for (var i = K.length - 1; i >= 0; i--) {
var q = K[i];
if (/^bw_rl/.test(q.a) && !have[q.a] && !(elKeeper() && q.keeper)) {
K.splice(i, 1);
changed = true;
}
}
Object.keys(have).forEach(function (a) { if (!K.some(function (q) { return q.a === a; })) {
K.push({ id: a + "_k", a: a, name: elShort(have[a]), from: "your relics" });
changed = true;
} });
if (changed)
try {
save();
}
catch (e) { }
},
function (k) {
if (!elArmsReady())
return false;
var a = "bw_rl" + k, K = bkpKept();
if (!K.some(function (q) { return q.a === a; })) {
K.push({ id: a + "_k", a: a, name: elShort(RL_BY[k]), from: "your relics", keeper: elKeeper() ? 1 : 0 });
try {
save();
}
catch (e) { }
}
if (typeof bwEquip === "function")
bwEquip("rl" + k);
elSay("<b>" + elEsc(elShort(RL_BY[k])) + "</b> in hand. It fights here as the relic it is.");
return true;
},
function (id, place, seed, need, tol) {
var key = id + "@" + place + "@" + elWorldKey(), c = EL_SPOTS[id];
if (c && c.key === key)
return c;
var best = null, wet = place === "neverland" || place === "greenwold", lowest = EL_MINY[place] != null ? EL_MINY[place] : -500;
for (var rad = 0; rad <= 150 && !best; rad += 6) {
var n = rad ? Math.max(8, Math.round(rad / 4)) : 1;
for (var q = 0; q < n && !best; q++) {
var a = q / n * Math.PI * 2 + (mmHash ? mmHash(id) % 7 : 0), x = seed[0] + Math.cos(a) * rad, z = seed[1] + Math.sin(a) * rad, y = elGround(x, z), lo = y, hi = y, ok = y > lowest;
if (ok && wet && y < 1.5)
ok = false;
for (var u = -1; u <= 1 && ok; u++)
for (var v = -1; v <= 1 && ok; v++) {
var px = x + u * need, pz = z + v * need, py = elGround(px, pz);
lo = Math.min(lo, py);
hi = Math.max(hi, py);
if (py < lowest || elBlockL(px, pz, py))
ok = false;
if (wet && py < 1.5)
ok = false;
}
if (ok && hi - lo < tol)
best = { x: x, z: z, y: y };
}
}
if (!best)
best = { x: seed[0], z: seed[1], y: elGround(seed[0], seed[1]) };
best.key = key;
best.yaw = Math.atan2(-best.x, -best.z);
EL_SPOTS[id] = best;
return best;
},
function () {
var key = "hall@" + elWorldKey();
if (EL.hallSpot && EL.hallSpot.key === key)
return EL.hallSpot;
var S = EL_HALL.seed, best = null, bestV = 1e9;
function score(x, z) { var lo = 1e9, hi = -1e9; for (var i = -3; i <= 3; i++)
for (var j = -3; j <= 3; j++) {
var px = x + i * EL_RF2 / 3, pz = z + j * EL_RF2 / 3;
if (i * i + j * j > 10)
continue;
var y = elGround(px, pz);
if (y < -500 || elBlockL(px, pz, y))
return null;
lo = Math.min(lo, y);
hi = Math.max(hi, y);
} return { lo: lo, hi: hi }; }
for (var rad = 0; rad <= 240 && bestV > 2; rad += 20) {
var n = rad ? Math.max(6, Math.round(rad / 14)) : 1;
for (var q = 0; q < n; q++) {
var a = q / n * Math.PI * 2, x = S[0] + Math.cos(a) * rad, z = S[1] + Math.sin(a) * rad, s = score(x, z);
if (!s)
continue;
var v = s.hi - s.lo;
if (v < bestV) {
bestV = v;
best = { x: x, z: z, lo: s.lo, hi: s.hi };
}
}
}
if (!best) {
var y0 = elGround(S[0], S[1]);
best = { x: S[0], z: S[1], lo: y0, hi: y0 };
}
best.y = best.hi + 0.3;
best.yaw = Math.atan2(-best.x, -best.z);
best.key = key;
EL.hallSpot = best;
return best;
},
function (col, kind, rep, o) {
o = o || {};
var key = col + "|" + kind + "|" + rep + "|" + (o.shine || 0) + "|" + (o.ds ? 1 : 0);
if (EL_PMAT[key])
return EL_PMAT[key];
var t = typeof texOf === "function" ? texOf(kind) : null, m;
if (t) {
t = t.clone();
t.needsUpdate = true;
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(rep || 1, rep || 1);
}
m = (o.shine && !elLite()) ? new THREE.MeshPhongMaterial({ color: col, map: t, shininess: o.shine, specular: 0x6A6A6A }) : new THREE.MeshLambertMaterial({ color: col, map: t });
if (o.ds)
m.side = THREE.DoubleSide;
EL_PMAT[key] = m;
return m;
},
function (G, sol, spots, people) {
var basalt = elStone(0x4A4440, "stone", 4, { shine: 12 }), basaltD = elStone(0x2E2A28, "stone", 3, { shine: 10 }), marble = elStone(0x6E665C, "marble", 6), bronze = mmMat(0x8A6230, { shine: 24, spec: 0x403020 }), iron = mmMat(0x3A3634, { shine: 60, spec: 0x8A8A8A }), wood = elStone(0x6A4A2E, "wood", 2), slate = elStone(0x5A5652, "slate", 4);
var lite = elLite();
function box(P, mat, w, h, d, x, y, z, ry) { var m = mmMesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z, P); if (ry)
m.rotation.y = ry; return m; }
function wall(lx, lz, w, d, h, ry) { sol.push({ x: lx, z: lz, hw: w / 2, hd: d / 2, rot: ry || 0, h: h }); }
var tr = mmMesh(new THREE.CylinderGeometry(EL_RF, EL_RF + 1, Math.max(1, G.userData.drop + 1), elSeg(48)), basaltD, 0, -Math.max(1, G.userData.drop + 1) / 2, 0, G);
var sk = mmMesh(new THREE.CylinderGeometry(EL_RF, EL_RF2, Math.max(0.5, G.userData.drop + 0.5), elSeg(48), 1, true), basaltD, 0, -Math.max(0.5, G.userData.drop + 0.5) / 2, 0, G);
sk.material = basaltD;
var top = mmMesh(new THREE.CircleGeometry(EL_RF, elSeg(48)), slate, 0, 0.02, 0, G);
top.rotation.x = -Math.PI / 2;
var fl = mmMesh(new THREE.CircleGeometry(24, elSeg(48)), marble, 0, 0.05, 0, G);
fl.rotation.x = -Math.PI / 2;
Object.keys(EL_ALCOVE).forEach(function (d) { var a = d * Math.PI / 180, E = EL_BY[EL_ALCOVE[d]]; var ray = mmMesh(new THREE.PlaneGeometry(0.5, 15), mmMat(E.col, { shine: 60 }), Math.sin(a) * 13, 0.07, Math.cos(a) * 13, G); ray.rotation.set(-Math.PI / 2, 0, -a); });
var R = 24, H = 13, half = 4.4 / R;
for (var a = 0; a < Math.PI * 2 - 0.001; a += 0.1) {
var mid = a + 0.05, gap = EL_OPEN.some(function (d) { var o = d * Math.PI / 180, dd = Math.abs(((mid - o + Math.PI * 3) % (Math.PI * 2)) - Math.PI); return dd < half; });
if (gap)
continue;
var x = Math.sin(mid) * R, z = Math.cos(mid) * R;
box(G, basalt, R * 0.1 + 0.05, H, 1.4, x, H / 2, z, mid);
wall(x, z, R * 0.1 + 0.05, 1.4, H, mid);
}
EL_OPEN.forEach(function (d) {
var o = d * Math.PI / 180, x = Math.sin(o) * R, z = Math.cos(o) * R;
box(G, basalt, 9.2, H - 7.5, 1.6, x, 7.5 + (H - 7.5) / 2, z, o);
var ar = mmTorus(G, bronze, 4.4, 0.18, x, 7.4, z, 0, o, 0, Math.PI);
ar.rotation.set(0, o, 0);
});
var dome = mmMesh(new THREE.SphereGeometry(R + 0.7, elSeg(40), elSeg(14), 0, Math.PI * 2, 0.14, Math.PI / 2 - 0.14), elStone(0x5A524C, "stone", 8, { ds: 1 }), 0, H, 0, G);
dome.scale.y = 0.55;
var ring = mmTorus(G, bronze, (R + 0.7) * Math.sin(0.14), 0.3, 0, H + (R + 0.7) * 0.55 * Math.cos(0.14), 0, Math.PI / 2, 0, 0);
ring.scale.set(1, 1, 1);
mmCone(G, bronze, 0.8, 9, 0, H + 13.5 + 4.5, 0, 0, 0, 0, 8);
EL_ELEMENTS.forEach(function (E, i) { var a2 = i / 6 * Math.PI * 2; mmMesh(new THREE.SphereGeometry(0.5, 10, 8), elGlowMat(E.glow, 0.9), Math.sin(a2) * 1.4, H + 16.5, Math.cos(a2) * 1.4, G); });
mmGlow(G, 0xFFE0B0, lite ? 10 : 16, 0.35, 0, H + 17, 0);
mmCyl(G, basalt, 5.2, 5.6, 0.45, 0, 0.25, 0, 0, 0, 0, elSeg(32));
mmCyl(G, marble, 4.6, 4.6, 0.06, 0, 0.5, 0, 0, 0, 0, elSeg(32));
var A = mmG(G, 0, 0.5, 0);
box(A, basaltD, 2.2, 1.1, 1.6, 0, 0.55, 0);
box(A, iron, 3.2, 0.5, 1.3, 0, 1.35, 0);
mmCone(A, iron, 0.55, 1.6, 2.35, 1.35, 0, 0, 0, -Math.PI / 2, 10);
box(A, iron, 0.8, 0.9, 1.1, -1.8, 1.25, 0);
mmTorus(A, bronze, 0.66, 0.05, 0, 1.62, 0.66, 0, 0, 0);
wall(0, 0, 1.8, 1.0, 2.2, 0);
EL_ELEMENTS.forEach(function (E, i) {
var a2 = (i / 6) * Math.PI * 2 + Math.PI / 6, x = Math.sin(a2) * 6.6, z = Math.cos(a2) * 6.6;
mmCyl(G, bronze, 0.5, 0.25, 1.1, x, 0.55, z, 0, 0, 0, 10);
mmCyl(G, bronze, 0.65, 0.5, 0.25, x, 1.2, z, 0, 0, 0, 12);
elFlame(G, E, x, 1.3, z, 0.5);
wall(x, z, 0.6, 0.6, 1.4, 0);
if (!lite && i % 2 === 0) {
var pl = new THREE.PointLight(E.glow, 0.6, 16, 1.6);
pl.position.set(x, 2.4, z);
G.add(pl);
}
});
spots.push({ x: 0, z: 2.2, r: 3.2, name: "The Great Anvil", verb: "look", fn: function () { elAnvilCard(); } });
if (!lite) {
var hl = new THREE.PointLight(0xFFE8C8, 0.8, 60, 1.2);
hl.position.set(0, H - 1, 0);
G.add(hl);
}
var sg = wSign(["The Hall of the Six Forges", "Fire · Water · Earth · Air · Storm · Life"], 7, 2.2, "#2A1A12", "#F0C878");
sg.position.set(0, 9, R + 0.85);
G.add(sg);
var sg2 = wSign(["The Hall of the Six Forges", "Master Varenne · relics of the elements"], 4.4, 1.6, "#2A1A12", "#F0C878");
sg2.position.set(6.5, 1.8, EL_RF - 3);
sg2.rotation.y = 0.3;
G.add(sg2);
mmCyl(G, bronze, 0.08, 0.08, 1.0, 6.5, 0.5, EL_RF - 3, 0, 0, 0, 6);
Object.keys(EL_ALCOVE).forEach(function (d) { elAlcove(G, sol, spots, people, +d, EL_BY[EL_ALCOVE[d]]); });
elGallery(G, sol, spots);
[20, 70, 110, 160, 200, 250, 290, 340].forEach(function (dg) {
var a3 = dg * Math.PI / 180, x = Math.sin(a3) * 21.6, z = Math.cos(a3) * 21.6;
var b = mmG(G, x, 0, z, 0, a3, 0);
box(b, wood, 3, 0.12, 0.7, 0, 0.5, 0);
box(b, iron, 0.1, 0.5, 0.6, -1.3, 0.25, 0);
box(b, iron, 0.1, 0.5, 0.6, 1.3, 0.25, 0);
wall(x, z, 3, 0.8, 0.6, a3);
});
people.push({ seed: "el_master", x: 2.6, z: 2.4, ry: Math.PI * 0.75, o: { sex: "f", look: { top: 0x5A2A1E, topKind: "shirt", bottom: 0x2A2018, layer: "apron", layerColor: 0x3A2414, hair: 0xA8A8A8, hairStyle: "braids", shoes: 0x1A1210 } }, t: EL_MASTER, master: 1 });
people.push({ seed: "el_appr1", x: -10, z: 12, ry: 0, o: { sex: "m", child: false, look: { top: 0x6A5A3A, topKind: "shirt", bottom: 0x3A3024, layer: "apron", layerColor: 0x5A4024, hair: 0x3A2A1A, hairStyle: "short", shoes: 0x2A1A10 } },
t: { name: "Tamsin Quickhand, an apprentice", persona: EL_CTX + " You are Tamsin, an apprentice of the Six Forges in your second year: eager, chatty, a little in awe of Master Varenne. You fetch essence, sweep the floor and dream of your first relic.", greet: "Hello! Have you come to see the Master? She's at the Great Anvil." }, wander: 4.5 });
people.push({ seed: "el_appr2", x: 11, z: -9, ry: 0, o: { sex: "f", look: { top: 0x3A4A5A, topKind: "shirt", bottom: 0x2A2A32, layer: "apron", layerColor: 0x4A3A2A, hair: 0xC89048, hairStyle: "ponytail", shoes: 0x1A1A22 } },
t: { name: "Ilse Brightquench, an apprentice", persona: EL_CTX + " You are Ilse, an apprentice of the Six Forges: practical, dry, very good at quenching, quietly proud. You can explain how the relics are made, step by step.", greet: "Mind your feet, the floor's just been swept." }, wander: 4.5 });
},
function (P, E, x, y, z, s) {
var g = mmG(P, x, y, z);
for (var i = 0; i < 5; i++) {
var a = i / 5 * Math.PI * 2;
mmCone(g, elGlowMat(i % 2 ? E.glow : E.col, 0.75), 0.16 * s, 0.9 * s * (i % 2 ? 1 : 1.3), Math.cos(a) * 0.18 * s, 0.45 * s, Math.sin(a) * 0.18 * s, 0, 0, 0, 6);
}
mmCone(g, elGlowMat(0xFFF4DC, 0.8), 0.12 * s, 0.7 * s, 0, 0.35 * s, 0, 0, 0, 0, 6);
if (typeof wGlow === "function") {
var gl = wGlow(E.glow, 2.6 * s, 0.45);
gl.position.set(0, 0.6 * s, 0);
g.add(gl);
}
return g;
},
function (G, sol, spots, people, deg, E) {
var o = deg * Math.PI / 180, R = 24, P = mmG(G, Math.sin(o) * R, 0, Math.cos(o) * R, 0, o, 0), lite = elLite();
var c = Math.cos(o), s = Math.sin(o), ox = Math.sin(o) * R, oz = Math.cos(o) * R;
function L(x, z) { return { x: ox + x * c + z * s, z: oz - x * s + z * c }; }
function box(mat, w, h, d, x, y, z) { return mmMesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z, P); }
function wall(x, z, w, d, h) { var q = L(x, z); sol.push({ x: q.x, z: q.z, hw: w / 2, hd: d / 2, rot: o, h: h }); }
var stone = elStone(0x4E4844, "stone", 3, { shine: 10 }), floor = elStone(0x5A544C, "floortile", 4), iron = mmMat(0x34302E, { shine: 60, spec: 0x8A8A8A }), wood = elStone(0x6A4A2E, "wood", 2), brick = elStone(0x8A4A32, "brick", 3), trim = mmMat(E.trim, { shine: 30, spec: 0x404040 }), metal = mmMat(E.col, { shine: 40, spec: 0x606060 });
box(floor, 9, 0.12, 10.4, 0, 0.06, 5.2);
box(stone, 0.8, 7.5, 12, -4.9, 3.75, 4.6);
box(stone, 0.8, 7.5, 12, 4.9, 3.75, 4.6);
box(stone, 10.6, 7.5, 0.8, 0, 3.75, 10.7);
box(stone, 10.6, 0.6, 11, 0, 7.8, 5.5);
wall(-4.9, 4.6, 0.8, 12, 7.5);
wall(4.9, 4.6, 0.8, 12, 7.5);
wall(0, 10.7, 10.6, 0.8, 7.5);
box(trim, 9.0, 0.12, 0.06, 0, 3.2, 10.28);
box(trim, 0.06, 0.12, 10.2, -4.48, 3.2, 5.2);
box(trim, 0.06, 0.12, 10.2, 4.48, 3.2, 5.2);
var ban = mmMesh(new THREE.PlaneGeometry(2.2, 4.2), new THREE.MeshLambertMaterial({ map: elCloth(E.k), side: THREE.DoubleSide }), -3.1, 4.4, 10.26, P);
ban.rotation.y = Math.PI;
var sg = wSign([E.forge.replace(/^the /, "The "), E.name + " · " + E.icon], 4.2, 1.1, "#1E1612", "#F0D8A0");
sg.position.set(0, 6.5, -0.75);
sg.rotation.y = Math.PI;
P.add(sg);
var F = mmG(P, 0, 0, 8.6);
if (E.k === "fire") {
box(brick, 3.4, 1.1, 2.0, 0, 0.55, 8.6);
var bed = box(mmMat(0x1E1410, { shine: 4 }), 3.0, 0.12, 1.6, 0, 1.16, 8.6);
for (var i = 0; i < 14; i++)
mmMesh(new THREE.DodecahedronGeometry(0.16, 0), elGlowMat(i % 3 ? 0xFF7A2A : 0xFFB050, 0.9), -1.3 + (i % 7) * 0.43, 1.26, 8.1 + Math.floor(i / 7) * 0.8, P);
elFlame(P, E, 0, 1.25, 8.6, 1.4);
mmCone(P, brick, 1.8, 2.2, 0, 3.2, 8.8, 0, 0, 0, 4);
mmCyl(P, brick, 0.5, 0.6, 3.5, 0, 5.9, 8.9, 0, 0, 0, 8);
box(mmMat(0x5A3A22, { shine: 10 }), 1.2, 0.7, 0.9, 2.4, 0.35, 8.2);
}
else if (E.k === "water") {
mmLathe(P, elStone(0x9A948C, "marble", 2), [[0, 0], [1.6, 0], [1.8, 0.2], [1.8, 1.0], [1.6, 1.0], [1.55, 0.25], [0, 0.25]], 0, 0, 8.4, 28);
var wm = mmMesh(new THREE.CircleGeometry(1.55, elSeg(24)), new THREE.MeshPhongMaterial({ color: 0x2A78B8, shininess: 120, specular: 0xCFEFFF, transparent: true, opacity: 0.85 }), 0, 0.9, 8.4, P);
wm.rotation.x = -Math.PI / 2;
var tex = document.createElement("canvas");
tex.width = 32;
tex.height = 128;
var cx = tex.getContext("2d");
for (var y = 0; y < 128; y++)
for (var x2 = 0; x2 < 32; x2 += 4) {
var v = 170 + Math.floor(70 * Math.abs(Math.sin(x2 * 0.7 + y * 0.13)));
cx.fillStyle = "rgba(" + v + "," + (v + 12) + ",255," + (0.4 + 0.35 * Math.abs(Math.sin(x2 + y * 0.05))) + ")";
cx.fillRect(x2, y, 4, 1);
}
var ft = new THREE.CanvasTexture(tex);
ft.wrapS = ft.wrapT = THREE.RepeatWrapping;
var sheet = mmMesh(new THREE.PlaneGeometry(1.1, 4.2), new THREE.MeshBasicMaterial({ map: ft, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false }), 0, 3.0, 9.6, P);
sheet.userData.elFlow = ft;
mmCyl(P, trim, 0.25, 0.3, 0.4, 0, 5.2, 9.9, Math.PI / 2, 0, 0, 10);
EL.flows.push(ft);
}
else if (E.k === "earth") {
box(elStone(0x5A5248, "stone", 1, { shine: 8 }), 2.4, 1.6, 1.8, 0, 0.8, 8.4);
box(iron, 2.8, 0.4, 1.0, 0, 1.8, 8.4);
for (var j = 0; j < 9; j++)
mmMesh(new THREE.OctahedronGeometry(0.22 + (j % 3) * 0.08, 0), mmMat(0x5ABF7A, { shine: 120, e: 0x1A6A3A, ei: 0.6 }), -3.6 + j * 0.9, 1.2 + (j % 3) * 1.4, 10.2, P);
mmEll(P, mmMat(0x6A4A2A, { shine: 10 }), 0.7, 0.45, 0.9, 2.6, 0.5, 8.0, 10);
}
else if (E.k === "air") {
box(stone, 3.0, 1.0, 1.6, 0, 0.5, 8.6);
elFlame(P, E, 0, 1.0, 8.6, 0.9);
for (var f = 0; f < 3; f++) {
var fan = mmG(P, -2.8 + f * 2.8, 4.6, 10.15);
for (var b = 0; b < 4; b++) {
var bl = mmMesh(new THREE.BoxGeometry(0.22, 1.2, 0.04), mmMat(0xE8EEF2, { shine: 60 }), 0, 0.6, 0, mmG(fan, 0, 0, 0, 0, 0, b * Math.PI / 2));
}
mmCyl(fan, trim, 0.14, 0.14, 0.12, 0, 0, 0, Math.PI / 2, 0, 0, 10);
EL.spin.push({ o: fan, sp: 0.5 + f * 0.15 });
}
}
else if (E.k === "storm") {
box(iron, 2.4, 0.6, 2.4, 0, 0.3, 8.6);
mmCyl(P, mmMat(0xC8D0E8, { shine: 150, op: 0.35 }), 0.8, 0.8, 4.4, 0, 2.8, 8.6, 0, 0, 0, 20);
mmCyl(P, elGlowMat(E.glow, 0.85), 0.18, 0.18, 4.2, 0, 2.8, 8.6, 0, 0, 0, 10);
for (var r2 = 0; r2 < 6; r2++)
mmTorus(P, mmMat(0xB87333, { shine: 100 }), 0.95, 0.06, 0, 1.0 + r2 * 0.7, 8.6, Math.PI / 2, 0, 0);
box(iron, 2.4, 0.4, 2.4, 0, 5.2, 8.6);
if (typeof wGlow === "function") {
var gw = wGlow(E.glow, 3, 0.4);
gw.position.set(0, 2.8, 8.6);
P.add(gw);
}
}
else if (E.k === "life") {
box(stone, 3.0, 0.8, 2.0, 0, 0.4, 8.6);
mmCyl(P, mmMat(0x5A3A22, { shine: 6 }), 0.35, 0.6, 5.4, 0, 3.4, 8.8, 0, 0, 0, 10);
for (var k = 0; k < 7; k++) {
var a = k / 7 * Math.PI * 2;
mmEll(P, mmMat(k % 2 ? 0x4A9A3A : 0x3A8A2A, { shine: 6 }), 1.2, 0.8, 1.2, Math.cos(a) * 1.4, 6.2 + (k % 2) * 0.6, 8.6 + Math.sin(a) * 0.9, 10);
}
for (var bl2 = 0; bl2 < 12; bl2++)
mmMesh(new THREE.SphereGeometry(0.12, 6, 5), mmMat(bl2 % 2 ? 0xF2C8E8 : 0xFFFFFF, { shine: 20 }), -1.3 + (bl2 % 6) * 0.5, 0.88, 8.0 + Math.floor(bl2 / 6) * 1.2, P);
}
wall(0, 8.6, 3.4, 2.2, 2.5);
var A = mmG(P, 0, 0, 4.6);
mmCyl(A, wood, 0.45, 0.55, 0.75, 0, 0.38, 0, 0, 0, 0, 10);
mmMesh(new THREE.BoxGeometry(1.1, 0.3, 0.45), iron, 0, 0.9, 0, A);
mmCone(A, iron, 0.18, 0.5, 0.75, 0.9, 0, 0, 0, -Math.PI / 2, 8);
mmMesh(new THREE.BoxGeometry(0.5, 0.3, 0.4), iron, -0.65, 0.85, 0, A);
mmMesh(new THREE.BoxGeometry(0.06, 0.06, 0.36), metal, 0.1, 1.08, 0, A);
wall(0, 4.6, 1.4, 0.8, 1.1);
box(wood, 1.8, 0.7, 0.7, 3.3, 0.35, 4.6);
var q = mmMesh(new THREE.PlaneGeometry(1.6, 0.5), new THREE.MeshPhongMaterial({ color: 0x2A3A4A, shininess: 120 }), 3.3, 0.68, 4.6, P);
q.rotation.x = -Math.PI / 2;
wall(3.3, 4.6, 1.8, 0.7, 0.8);
box(wood, 0.12, 2.0, 3.2, -4.4, 1.6, 5.0);
for (var t = 0; t < 6; t++) {
var tl = mmMesh(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 6), wood, -4.3, 1.4, 3.8 + t * 0.48, P);
mmMesh(new THREE.BoxGeometry(0.16, 0.14, 0.1), iron, -4.3, 1.88, 3.8 + t * 0.48, P);
}
box(wood, 0.9, 0.9, 3.0, 3.9, 0.45, 7.4);
wall(3.9, 7.4, 0.9, 3.0, 0.9);
if (!lite) {
var two = EL_KEYS.filter(function (k2) { return EL_R[k2].el === E.k && EL_R[k2].slot === "weapon" && EL_R[k2].how === "craft"; }).slice(0, 2);
two.forEach(function (k2, i2) { var w = HELD["relic_" + k2] ? HELD["relic_" + k2]() : null; if (!w)
return; w.scale.setScalar(0.9); w.rotation.set(-Math.PI / 2, 0, Math.PI / 2); w.position.set(3.85, 0.95, 6.6 + i2 * 1.4); P.add(w); });
}
if (!lite) {
var pl = new THREE.PointLight(E.glow, 1.0, 14, 1.6);
pl.position.set(0, 4.5, 6.5);
P.add(pl);
}
var ql = L(0, 6.2);
spots.push({ x: ql.x, z: ql.z, r: 3.4, name: E.forge.replace(/^the /, "The "), verb: "work at the forge", fn: function () { elForgeCard(E.k); } });
var sm = L(-2.1, 6.4);
people.push({ seed: "el_smith_" + E.k, x: sm.x, z: sm.z, ry: o + Math.PI * 0.85, o: { sex: EL_SMITHS[E.k].look.sex, look: EL_SMITHS[E.k].look }, t: { name: EL_SMITHS[E.k].name, persona: EL_CTX + " " + EL_SMITHS[E.k].persona, greet: EL_SMITHS[E.k].greet }, smith: E.k });
},
function (G, sol, spots) {
var o = Math.PI, R = 24, P = mmG(G, 0, 0, -R, 0, o, 0), lite = elLite(), c = Math.cos(o), s = Math.sin(o);
function L(x, z) { return { x: x * c + z * s, z: -R - x * s + z * c }; }
function box(mat, w, h, d, x, y, z) { return mmMesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z, P); }
function wall(x, z, w, d, h) { var q = L(x, z); sol.push({ x: q.x, z: q.z, hw: w / 2, hd: d / 2, rot: o, h: h }); }
var stone = elStone(0x4E4844, "stone", 3, { shine: 10 }), marble = elStone(0x6A6258, "marble", 4), bronze = mmMat(0x8A6230, { shine: 24, spec: 0x403020 }), glass = mmMat(0xB8C8D0, { shine: 20, spec: 0x202020, op: 0.16 });
box(marble, 16, 0.12, 14.4, 0, 0.06, 7.2);
box(stone, 0.8, 8, 17, -8.4, 4, 6.1);
box(stone, 0.8, 8, 17, 8.4, 4, 6.1);
box(stone, 17.6, 8, 0.8, 0, 4, 14.7);
box(stone, 17.6, 0.6, 15, 0, 8.3, 7.5);
wall(-8.4, 6.1, 0.8, 17, 8);
wall(8.4, 6.1, 0.8, 17, 8);
wall(0, 14.7, 17.6, 0.8, 8);
var sg = wSign(["The Gallery of Relics", "what the Six Forges have made, and what was lost"], 5.6, 1.3, "#1E1612", "#F0D8A0");
sg.position.set(0, 6.6, -0.75);
sg.rotation.y = Math.PI;
P.add(sg);
EL_ELEMENTS.forEach(function (E, i) {
var side = i < 3 ? -1 : 1, z = 3 + (i % 3) * 4.4, x = side * 6.9;
box(stone, 1.6, 1.0, 2.6, x, 0.5, z);
box(mmMat(E.col, { shine: 80 }), 1.7, 0.08, 2.7, x, 1.04, z);
wall(x, z, 1.6, 2.6, 1.1);
var plq = wSign([E.forge.replace(/^the /, "The "), E.name], 1.6, 0.5, "#1E1612", "#F0D8A0");
plq.position.set(x - side * 0.85, 0.62, z);
plq.rotation.y = -side * Math.PI / 2;
P.add(plq);
if (!lite)
EL_KEYS.filter(function (k) { return EL_R[k].el === E.k && EL_R[k].slot === "weapon"; }).forEach(function (k, j) {
var w = HELD["relic_" + k] ? HELD["relic_" + k]() : null;
if (!w)
return;
w.position.set(x + side * 0.2, 1.15, z - 0.95 + j * 0.63);
w.rotation.set(0, side * Math.PI / 2, 0);
w.scale.setScalar(EL_R[k].form === "spear" || EL_R[k].form === "staff" ? 0.9 : 1.2);
P.add(w);
});
else
mmGlow(P, E.glow, 1.6, 0.45, x, 1.6, z);
var w2 = L(x - side * 1.6, z);
spots.push({ x: w2.x, z: w2.z, r: 1.8, name: E.name + ": its relics", verb: "look", fn: (function (k) { return function () { elElementCard(k); }; })(E.k) });
});
EL_KEYS.filter(function (k) { return EL_R[k].how === "found"; }).forEach(function (k, i) {
var x = i % 2 ? 1.6 : -1.6, z = 2.4 + Math.floor(i / 2) * 1.95;
box(bronze, 1.0, 0.9, 1.0, x, 0.45, z);
box(glass, 0.9, 0.9, 0.9, x, 1.35, z);
var lab = wSign(["Lost", elShort(EL_R[k])], 0.9, 0.36, "#1E1612", "#F0D8A0");
lab.position.set(x, 0.6, z + (x < 0 ? 0 : 0) + 0.51);
P.add(lab);
wall(x, z, 1.0, 1.0, 1.8);
var w3 = L(x + (x < 0 ? -1.1 : 1.1), z);
spots.push({ x: w3.x, z: w3.z, r: 1.0, name: "A case: " + elShort(EL_R[k]), verb: "read the plaque", fn: function () { elLostCard(k); } });
});
if (!lite) {
var pl = new THREE.PointLight(0xFFE8C8, 0.9, 20, 1.4);
pl.position.set(0, 6.5, 7);
P.add(pl);
}
},
function (G, E, sol) {
var basalt = elStone(0x2E2A28, "stone", 2, { shine: 20 }), pale = elStone(0xD8D4CC, "marble", 2, { shine: 40 }), iron = mmMat(0x3A3634, { shine: 60 }), copper = mmMat(0xB87333, { shine: 100 });
function stone(mat, w, h, d, x, z, ry, rz) { var m = mmMesh(new THREE.CylinderGeometry(Math.min(w, d) * 0.42, Math.max(w, d) * 0.58, h, 9, 3), mat, x, h / 2 - 0.1, z, G); m.scale.z = Math.max(0.5, d / w); m.rotation.set(0, ry || 0, rz || 0); sol.push({ x: x, z: z, r: Math.max(w, d) * 0.55, h: h }); return m; }
if (E.k === "fire") {
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2;
stone(basalt, 0.7, 2 + ((i * 7) % 3) * 0.5, 0.7, Math.cos(a) * 3.6, Math.sin(a) * 3.6, a);
}
mmLathe(G, basalt, [[0, 0], [1.0, 0], [1.2, 0.7], [1.0, 0.8], [0, 0.8]], 0, 0, 0, 16);
elFlame(G, E, 0, 0.8, 0, 1.3);
sol.push({ x: 0, z: 0, r: 1.2, h: 1 });
}
else if (E.k === "water") {
mmLathe(G, pale, [[0, 0], [1.3, 0], [1.5, 0.9], [1.3, 1.0], [1.25, 0.3], [0, 0.3]], 0, 0, 0, 24);
var wd = mmMesh(new THREE.CircleGeometry(1.25, 20), new THREE.MeshPhongMaterial({ color: 0x4AA8D8, shininess: 120, transparent: true, opacity: 0.85 }), 0, 0.88, 0, G);
wd.rotation.x = -Math.PI / 2;
for (var j = 0; j < 4; j++) {
var b = j / 4 * Math.PI * 2 + Math.PI / 4;
stone(pale, 0.5, 1.8, 0.5, Math.cos(b) * 2.6, Math.sin(b) * 2.6, b);
}
sol.push({ x: 0, z: 0, r: 1.5, h: 1 });
mmGlow(G, E.glow, 2.4, 0.35, 0, 1.2, 0);
}
else if (E.k === "earth") {
stone(elStone(0x5A5248, "stone", 1, { shine: 8 }), 1.3, 3.6, 0.7, 0, 0, 0);
for (var k = 0; k < 5; k++)
mmMesh(new THREE.OctahedronGeometry(0.14, 0), mmMat(0x5ABF7A, { shine: 120, e: 0x1A6A3A, ei: 0.6 }), (k % 2 ? 0.25 : -0.25), 0.8 + k * 0.55, 0.38, G);
for (var r = 0; r < 9; r++) {
var c = r / 9 * Math.PI * 2;
stone(basalt, 0.6, 0.5, 0.6, Math.cos(c) * 3.2, Math.sin(c) * 3.2, c);
}
mmGlow(G, E.glow, 2, 0.3, 0, 2, 0.5);
}
else if (E.k === "air") {
for (var t = 0; t < 3; t++) {
var d = t / 3 * Math.PI * 2;
var m = stone(pale, 0.6, 5.4, 0.6, Math.cos(d) * 1.6, Math.sin(d) * 1.6, d);
m.rotation.set(Math.sin(d) * 0.22, 0, -Math.cos(d) * 0.22);
}
var ring = mmTorus(G, elGlowMat(E.glow, 0.55), 1.0, 0.05, 0, 2.6, 0, Math.PI / 2, 0, 0);
EL.spin.push({ o: ring, sp: 0.25, ax: "z" });
}
else if (E.k === "storm") {
mmCone(G, iron, 0.7, 6.5, 0, 3.25, 0, 0, 0, 0, 8);
sol.push({ x: 0, z: 0, r: 0.9, h: 6 });
for (var q = 0; q < 5; q++)
mmTorus(G, copper, 0.65 - q * 0.1, 0.05, 0, 0.8 + q * 1.0, 0, Math.PI / 2, 0, 0);
mmMesh(new THREE.SphereGeometry(0.32, 12, 10), elGlowMat(E.glow, 0.9), 0, 6.7, 0, G);
mmGlow(G, E.glow, 3, 0.45, 0, 6.7, 0);
}
else if (E.k === "life") {
for (var s2 = 0; s2 < 7; s2++) {
var e = s2 / 7 * Math.PI * 2;
stone(basalt, 0.7, 2.2, 0.5, Math.cos(e) * 3.8, Math.sin(e) * 3.8, e);
}
mmCyl(G, mmMat(0x5A3A22, { shine: 6 }), 0.25, 0.4, 3.2, 0, 1.6, 0, 0, 0, 0, 10);
sol.push({ x: 0, z: 0, r: 0.6, h: 3 });
for (var f = 0; f < 8; f++) {
var g2 = f / 8 * Math.PI * 2;
mmEll(G, mmMat(f % 2 ? 0xF2C8E8 : 0xFFF0F6, { shine: 10 }), 0.9, 0.6, 0.9, Math.cos(g2) * 0.9, 3.4 + (f % 2) * 0.5, Math.sin(g2) * 0.9, 10);
}
}
var sg = wSign([EL_SHRINE[E.k].name, "lay a hand on it"], 2.4, 0.8, "#1E1612", "#F0D8A0");
sg.position.set(0, 1.2, 4.4);
G.add(sg);
mmCyl(G, iron, 0.05, 0.05, 0.9, 0, 0.45, 4.4, 0, 0, 0, 6);
},
function (el) {
var E = EL_BY[el], g = new THREE.Group();
if (el === "fire") {
mmEll(g, mmMat(0x2A2420, { shine: 10 }), 0.9, 0.5, 0.8, 0, 0.2, 0, 10);
mmCone(g, elGlowMat(0xFF8A3A, 0.8), 0.18, 0.6, 0, 0.6, 0, 0, 0, 0, 6);
}
else if (el === "water") {
var p = mmMesh(new THREE.CircleGeometry(0.9, 16), new THREE.MeshPhongMaterial({ color: 0x4AA8D8, shininess: 120, transparent: true, opacity: 0.85 }), 0, 0.04, 0, g);
p.rotation.x = -Math.PI / 2;
for (var i = 0; i < 4; i++)
mmMesh(new THREE.SphereGeometry(0.07, 8, 6), mmMat(0xF4F0EA, { shine: 140 }), Math.cos(i * 1.6) * 0.4, 0.08, Math.sin(i * 1.6) * 0.4, g);
}
else if (el === "earth") {
mmEll(g, mmMat(0x5A5248, { shine: 8 }), 0.8, 0.6, 0.7, 0, 0.3, 0, 10);
for (var j = 0; j < 4; j++)
mmMesh(new THREE.OctahedronGeometry(0.1, 0), mmMat(0x5ABF7A, { shine: 120, e: 0x1A6A3A, ei: 0.6 }), Math.cos(j * 1.5) * 0.55, 0.45, Math.sin(j * 1.5) * 0.5, g);
}
else if (el === "air") {
mmCyl(g, mmMat(0xC8C4D8, { shine: 30 }), 0.12, 0.35, 2.6, 0, 1.3, 0, 0.1, 0, 0.05, 8);
for (var k = 0; k < 3; k++)
mmMesh(new THREE.PlaneGeometry(0.06, 0.3), new THREE.MeshLambertMaterial({ color: 0xF4F8FA, side: THREE.DoubleSide }), 0.2, 1.6 + k * 0.3, 0, g);
}
else if (el === "storm") {
mmCone(g, mmMat(0x8A7AE8, { shine: 150, op: 0.8, e: 0x3A2A8A, ei: 0.6 }), 0.3, 1.4, 0, 0.7, 0, 0.1, 0, 0.15, 5);
mmCone(g, mmMat(0xB8A8FF, { shine: 150, op: 0.8, e: 0x3A2A8A, ei: 0.6 }), 0.18, 0.9, 0.35, 0.45, 0.1, -0.2, 0, -0.3, 5);
}
else if (el === "life") {
for (var l = 0; l < 5; l++)
mmEll(g, mmMat(0x3A8A2A, { shine: 6 }), 0.35, 0.3, 0.35, Math.cos(l * 1.3) * 0.4, 0.3, Math.sin(l * 1.3) * 0.4, 8);
for (var b = 0; b < 5; b++)
mmMesh(new THREE.SphereGeometry(0.08, 6, 5), mmMat(0xF2C8E8, { shine: 20, e: 0x4A2A3A, ei: 0.4 }), Math.cos(b * 1.3) * 0.35, 0.6, Math.sin(b * 1.3) * 0.35, g);
}
if (typeof wGlow === "function") {
var gl = wGlow(E.glow, 1.6, 0.35);
gl.position.y = 0.7;
g.add(gl);
}
return g;
},
function (k) {
var g = new THREE.Group(), R = wRand(k.length * 37 + 11);
function rock(col, s, x, z) { var m = mmMesh(new THREE.DodecahedronGeometry(s, 0), mmMat(col, { shine: 8 }), x || 0, s * 0.5, z || 0, g); m.rotation.set(R() * 3, R() * 3, 0); m.scale.y = 0.6; return m; }
if (k === "pyrestaff")
rock(0x1A1614, 0.45);
else if (k === "evercoal") {
rock(0x141210, 0.22);
mmMesh(new THREE.SphereGeometry(0.06, 6, 5), mmMat(0x6A1A0A, { e: 0x8A2A0A, ei: 0.5 }), 0, 0.16, 0.12, g);
}
else if (k === "tidefang") {
mmCone(g, mmMat(0xE8DCC8, { shine: 40 }), 0.22, 0.7, 0, 0.12, 0, Math.PI / 2.2, 0.6, 0, 8);
mmTorus(g, mmMat(0xD8C8B0, { shine: 40 }), 0.2, 0.06, 0.25, 0.12, 0.12, 0, 0.6, 0);
}
else if (k === "deepmantle") {
var p = mmMesh(new THREE.CircleGeometry(1.1, 16), mmMat(0xB8D0E0, { shine: 120, op: 0.85 }), 0, 0.04, 0, g);
p.rotation.x = -Math.PI / 2;
}
else if (k === "mountainheart") {
mmMesh(new THREE.BoxGeometry(1.6, 0.03, 0.07), mmMat(0x0E0C0A, { shine: 2 }), 0, 0.02, 0, g);
}
else if (k === "granitecrown") {
for (var i = 0; i < 7; i++) {
var a = i / 7 * Math.PI * 2;
rock(0xC8C4BC, 0.14, Math.cos(a) * 0.8, Math.sin(a) * 0.8);
}
}
else if (k === "galewing") {
mmCone(g, mmMat(0xC8A8FF, { shine: 120, e: 0x4A2A7A, ei: 0.4, op: 0.9 }), 0.5, 4.2, 0, 2.1, 0, 0.06, 0, 0.04, 6);
}
else if (k === "highwind") {
rock(0x6A6460, 0.5);
var f = mmMesh(new THREE.PlaneGeometry(0.08, 0.5), new THREE.MeshLambertMaterial({ color: 0x9A9A98, side: THREE.DoubleSide }), 0.1, 0.55, 0.25, g);
f.rotation.set(0.4, 0.3, 0.9);
}
else if (k === "stormcaller") {
mmCyl(g, mmMat(0x5A4A3A, { shine: 120, op: 0.85 }), 0.06, 0.09, 1.1, 0, 0.5, 0, 0.12, 0, 0.08, 8);
}
else if (k === "stormcrown")
rock(0x0E0C10, 0.5);
else if (k === "evergreen") {
mmCyl(g, mmMat(0x5A3A22), 0.03, 0.04, 0.45, 0, 0.22, 0, 0, 0, 0, 6);
mmEll(g, mmMat(0x3AC83A, { shine: 10 }), 0.2, 0.16, 0.2, 0, 0.5, 0, 8);
}
else if (k === "greenmantle") {
var m2 = mmMesh(new THREE.CircleGeometry(0.9, 12), mmMat(0x4A9A3A, { shine: 4 }), 0, 0.04, 0, g);
m2.rotation.x = -Math.PI / 2;
}
return g;
},
function (place) {
elPlaceDrop();
EL.place = place;
EL.sol = [];
EL.spots = [];
EL.people = [];
EL.marks = {};
EL.wells = [];
EL.shrines = [];
EL.flows = [];
EL.spin = [];
var b = elBase();
if (!b)
return;
var root = new THREE.Group();
root.userData.noCull = 1;
scene.add(root);
EL.root = root;
if (place === EL_HALL.at) {
try {
var H = elHallSpot(), G = new THREE.Group(), sol = [], spots = [], people = [];
G.userData.drop = H.y - H.lo;
elHallBuild(G, sol, spots, people);
G.position.set(b.x + H.x, H.y, b.z + H.z);
G.rotation.y = H.yaw;
G.userData.noCull = 1;
root.add(G);
EL.hall = { x: H.x, z: H.z, y: H.y, yaw: H.yaw, g: G };
var c = Math.cos(H.yaw), s = Math.sin(H.yaw);
function tw(x, z) { return { x: H.x + x * c + z * s, z: H.z - x * s + z * c }; }
sol.forEach(function (o) { var q = tw(o.x, o.z); q.b = H.y; if (o.h !== undefined)
q.h = o.h; if (o.r !== undefined)
q.r = o.r;
else {
q.hw = o.hw;
q.hd = o.hd;
q.rot = H.yaw + (o.rot || 0);
} EL.sol.push(q); });
spots.forEach(function (p) { var q = tw(p.x, p.z); p.x = q.x; p.z = q.z; p.y = H.y; EL.spots.push(p); });
people.forEach(function (p) {
var q = tw(p.x, p.z), g = null;
try {
g = wPerson(p.seed, p.o);
}
catch (e) { }
if (g) {
g.position.set(b.x + q.x, H.y, b.z + q.z);
g.rotation.y = (p.ry || 0) + H.yaw;
root.add(g);
if (p.wander)
g.userData.wan = { hx: g.position.x, hz: g.position.z, tx: g.position.x, tz: g.position.z, wait: 2, r: p.wander, sp: 1.0 };
}
EL.people.push({ g: g, x: q.x, z: q.z, y: H.y, t: p.t, master: p.master, smith: p.smith, wander: p.wander });
});
}
catch (e) {
if (window.console)
console.warn("[elemental] hall", e);
}
}
EL_ELEMENTS.forEach(function (E) {
var S = EL_SHRINE[E.k];
if (S.at !== place)
return;
try {
var P = elSpot("shrine_" + E.k, place, S.seed, 5, 2.4), G = new THREE.Group(), sol = [];
elShrineBuild(G, E, sol);
G.position.set(b.x + P.x, P.y, b.z + P.z);
G.rotation.y = P.yaw;
root.add(G);
var c = Math.cos(P.yaw), s = Math.sin(P.yaw);
sol.forEach(function (o) { EL.sol.push({ x: P.x + o.x * c + o.z * s, z: P.z - o.x * s + o.z * c, r: o.r, h: o.h, b: P.y }); });
EL.shrines.push({ el: E.k, x: P.x, z: P.z, y: P.y });
}
catch (e) {
if (window.console)
console.warn("[elemental] shrine", E.k, e);
}
});
EL_WELLS.forEach(function (w) { if (w[2] !== place)
return; var P = elSpot(w[0], place, w[3], 1.5, 1.6), m = elWellMesh(w[1]); m.position.set(b.x + P.x, P.y, b.z + P.z); root.add(m); EL.wells.push({ spot: w[0], el: w[1], x: P.x, z: P.z, y: P.y, g: m }); });
EL.rowsAt = -99;
EL.rows = {};
EL.rowsOk = false;
},
function () {
if (EL.root) {
if (EL.root.parent)
EL.root.parent.remove(EL.root);
EL.root.traverse(function (o) { if (o.geometry && o.geometry.dispose && !o.userData.keepGeo)
o.geometry.dispose(); });
}
Object.keys(EL.marks || {}).forEach(function (k) { var M = EL.marks[k]; if (M.g && M.g.parent)
M.g.parent.remove(M.g); });
EL.root = null;
EL.hall = null;
EL.sol = [];
EL.spots = [];
EL.people = [];
EL.marks = {};
EL.wells = [];
EL.shrines = [];
EL.place = null;
EL.flows = [];
EL.spin = [];
},
function () {
var b = elBase();
if (!b || !EL.place)
return;
var want = {};
Object.keys(EL_HIDE).forEach(function (k) {
var r = EL.rows[k], here = r ? r.place === EL.place : EL_HIDE[k].at === EL.place;
if (!here)
return;
if (r && r.claimed && !elKeeper())
return;
if (!EL.rowsOk && elSigned() && !elKeeper())
return;
want[k] = 1;
});
Object.keys(EL.marks).forEach(function (k) { if (!want[k]) {
var M = EL.marks[k];
if (M.g.parent)
M.g.parent.remove(M.g);
delete EL.marks[k];
} });
Object.keys(want).forEach(function (k) {
var S = elHideAt(k), M = EL.marks[k];
if (!M) {
var g = elMarkMesh(k);
if (elKeeper()) {
var gl = wGlow(EL_BY[EL_R[k].el].glow, 1.4, 0.35);
gl.position.y = 1.2;
g.add(gl);
}
scene.add(g);
M = EL.marks[k] = { g: g };
}
M.x = S.x;
M.z = S.z;
M.y = S.y;
M.g.position.set(b.x + S.x, S.y, b.z + S.z);
});
},
function (place) {
EL.rowsAt = EL.t;
if (!elSigned()) {
EL.rowsOk = false;
elMarksSync();
return;
}
elRpc("elemental_hidden_here", { p_place: place }).then(function (o) {
if (!o || o.ok === false || EL.place !== place)
return;
var rows = {};
(o.rows || []).forEach(function (r) { rows[r.k] = r; });
EL.rows = rows;
EL.rowsOk = true;
EL.missing = false;
elMarksSync();
}).catch(function (e) { if (elMissing(e)) {
EL.missing = true;
EL.rowsOk = false;
elMarksSync();
} });
if (EL.t - (EL.stateAt || -99) > 90)
elState();
},
function () {
if (!elSigned())
return Promise.resolve(EL.stock);
return elRpc("my_stock", {}).then(function (rows) {
var S = {};
(rows || []).forEach(function (r) { S[r.kind] = +r.amount || 0; });
EL.stock = S;
EL.stockAt = EL.t;
if (typeof FG !== "undefined" && FG)
FG.stock = S;
return S;
}).catch(function () { return EL.stock; });
},
function (k) {
var H = EL_HIDE[k], R = EL_R[k];
if (!H || !R)
return;
var html = worldFacts(H.what.charAt(0).toUpperCase() + H.what.slice(1), EL_PLACE[EL.place] || "", [], [H.look]), fns = {};
if (elKeeper()) {
var r = EL.rows[k];
html += "<div style='opacity:.8;margin-top:6px'>Keeper: this is where <b>" + elEsc(R.name) + "</b> lies" + (r && r.claimed ? " (found by " + elEsc(r.owner_name || "a dreamer") + ")" : ", waiting to be found") + ". Only you see its glow.</div>";
html += worldBtn("move", "Move it", "Go where you want it, then press Here beside it in the Backpack") + worldBtn("hide", "Send it back into hiding", r && r.claimed ? "It is taken from whoever holds it" : "");
fns.move = function () { worldCard(null); EL.kmove = k; elSay("<b>Moving " + elEsc(R.name) + ".</b> Go where you want it (outdoors), then open the Backpack and press <b>Here</b> beside it."); };
fns.hide = function () { worldCard(null); elKeeperReset(k); };
}
else {
html += worldBtn("act", elEsc(H.act), "");
fns.act = function () { elFind(k); };
}
worldCard(html, fns);
},
function (k) {
var R = EL_R[k], H = EL_HIDE[k];
if (!elSigned()) {
worldCard(worldFacts(H.what, "", [], ["Something is here. Sign in first: what you find is kept against your name."]));
return;
}
elRpc("elemental_find", { p_key: k, p_place: EL.place }).then(function (o) {
if (!o || !o.ok) {
worldCard(worldFacts(H.what, "", [], [(o && o.say) || "Nothing comes of it."]));
return;
}
elTone(392, 0.25);
setTimeout(function () { elTone(523, 0.35); }, 220);
var M = EL.marks[k];
if (M) {
if (M.g.parent)
M.g.parent.remove(M.g);
delete EL.marks[k];
}
if (EL.rows[k])
EL.rows[k].claimed = true;
else
EL.rows[k] = { k: k, claimed: true, place: EL.place };
var b = elBase();
if (b && M)
elBurst(R.el, b.x + M.x, M.y + 0.6, b.z + M.z, 2.2, "mend");
var html = worldFacts(R.name, "found, and yours: " + EL_BY[R.el].name, [], [o.say || "It is yours.", R.does, "It is in your Backpack. There is only one in all the universe."]);
html += worldBtn("use", R.slot === "weapon" ? "Take it up" : "Put it on", "");
worldCard(html, { use: function () { worldCard(null); setTimeout(function () { rlTake(k); }, 400); } });
elAfterGot();
EL.stateAt = -99;
}).catch(function (e) { worldCard(worldFacts(H.what, "", [], [elMissing(e) ? elNotOpen() : "Couldn't reach the city."])); });
},
function (k) {
var R = EL_R[k], H = EL_HIDE[k], L = elLost(k);
var html = worldFacts(R.name, "lost long ago: " + EL_BY[R.el].name, [["The riddle", H.hint]], [R.does, L && L.found ? "Found by " + (L.by || "a dreamer") + ". The case is empty, but the relic is in the world again." : "Still lost. There is only one."]);
worldCard(html, {});
},
function (el) {
var E = EL_BY[el], S = EL_SHRINE[el], done = elAttuned(el), gift = EL_KEYS.filter(function (k) { return EL_R[k].el === el && EL_R[k].how === "gift"; })[0];
var html = worldFacts(S.name, E.icon + " " + E.name, [], [S.about, E.about, done ? "You have laid your hand on it. Master Varenne, in the Hall of the Six Forges on Mercury, will know." : "Lay a hand on it, and Master Varenne will give you " + elShort(EL_R[gift]) + ", once."]);
var fns = {};
if (!done) {
html += worldBtn("touch", "Lay a hand on the shrine", "");
fns.touch = function () { elAttune(el); };
}
worldCard(html, fns);
},
function (el) {
var E = EL_BY[el];
if (!elSigned()) {
worldCard(worldFacts(EL_SHRINE[el].name, "", [], ["Sign in first: the shrine remembers names."]));
return;
}
elRpc("elemental_attune", { p_element: el, p_place: EL.place }).then(function (o) {
var s = EL.shrines.filter(function (q) { return q.el === el; })[0], b = elBase();
if (o && o.ok) {
elTone(330, 0.4);
if (s && b)
elBurst(el, b.x + s.x, s.y + 1.4, b.z + s.z, 3, "mend");
EL.stateAt = -99;
elState();
}
worldCard(worldFacts(EL_SHRINE[el].name, E.icon + " " + E.name, [], [(o && o.say) || "Nothing happens."]));
}).catch(function (e) { worldCard(worldFacts(EL_SHRINE[el].name, "", [], [elMissing(e) ? elNotOpen() : "Couldn't reach the city."])); });
},
function (w) {
if (!elSigned()) {
elSay("Sign in first: what you gather is kept against your name.");
return;
}
elRpc("craft_gather", { p_spot: w.spot }).then(function (o) { elSay(elEsc((o && o.say) || "Nothing to be had.")); if (o && o.ok) {
elTone(660, 0.15);
EL.stock[o.kind] = (EL.stock[o.kind] || 0) + (+o.got || 0);
} })
.catch(function (e) { elSay(elMissing(e) ? elNotOpen() : "Couldn't reach the city."); });
},
function () {
elState().then(function () {
var html = worldFacts(EL_MASTER_NAME, "Master of the Six Forges", [], ["“" + EL_MASTER.greet + "”"]), fns = {};
html += worldBtn("talk", "Talk with her", "");
fns.talk = function () { worldCard(null); wTalk(EL_MASTER); };
EL_ELEMENTS.forEach(function (E) {
var gift = EL_KEYS.filter(function (k) { return EL_R[k].el === E.k && EL_R[k].how === "gift"; })[0], R = EL_R[gift];
if (elKeeper())
return;
if (elGifted(E.k))
return;
if (elAttuned(E.k)) {
html += worldBtn("gift_" + E.k, E.icon + " Ask for the gift of " + E.name, elEsc(elShort(R)) + ": " + elEsc(R.does));
fns["gift_" + E.k] = function () { elGift(E.k); };
}
});
var waiting = EL_ELEMENTS.filter(function (E) { return !elAttuned(E.k); });
if (waiting.length && !elKeeper())
html += "<div style='opacity:.8;font-size:12.5px;margin:6px 0'>She gives each element's gift once, to one who has laid a hand on its shrine. Still to visit: " + waiting.map(function (E) { return E.icon + " " + elEsc(EL_SHRINE[E.k].name.replace(/^The /, "")) + " (" + elEsc(EL_PLACE[EL_SHRINE[E.k].at]) + ")"; }).join(", ") + ".</div>";
html += worldBtn("riddles", "The twelve lost relics", "Her riddles, and which are found");
fns.riddles = elRiddlesCard;
html += worldBtn("forges", "The six forges", "What each makes, and what it takes");
fns.forges = elAnvilCard;
if (elKeeper()) {
html += worldBtn("kforge", "Forge a copy to give (Keeper)", "Any of the 48; it goes into your things");
fns.kforge = elKeeperForgeCard;
}
worldCard(html, fns);
});
},
function (el) {
var E = EL_BY[el];
elRpc("elemental_gift", { p_element: el }).then(function (o) {
if (o && o.ok) {
elTone(440, 0.3);
setTimeout(function () { elTone(587, 0.4); }, 260);
var M = EL.people.filter(function (p) { return p.master; })[0], b = elBase();
if (M && b)
elBurst(el, b.x + M.x, M.y + 1.4, b.z + M.z, 1.8, "mend");
EL.stateAt = -99;
elState();
elAfterGot();
}
var k = o && o.key, html = worldFacts(EL_MASTER_NAME, E.icon + " the gift of " + E.name, [], [(o && o.say) || "She shakes her head."].concat(k && EL_R[k] ? [EL_R[k].does] : [])), fns = {};
if (o && o.ok && k) {
html += worldBtn("use", EL_R[k].slot === "weapon" ? "Take it up" : "Put it on", "");
fns.use = function () { worldCard(null); setTimeout(function () { rlTake(k); }, 400); };
}
worldCard(html, fns);
}).catch(function (e) { worldCard(worldFacts(EL_MASTER_NAME, "", [], [elMissing(e) ? elNotOpen() : "Couldn't reach the city."])); });
},
function () {
elState().then(function () {
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The twelve lost relics</div><div style='opacity:.8;margin-bottom:6px'>One of each in all the universe. The first to find one keeps it.</div>";
Object.keys(EL_HIDE).forEach(function (k) {
var R = EL_R[k], L = elLost(k);
h += "<div style='margin:6px 0;padding-bottom:5px;border-bottom:1px solid rgba(255,255,255,.08)'><b>" + EL_BY[R.el].icon + " " + elEsc(R.name) + "</b> <span style='opacity:.7'>" + (L && L.found ? "found by " + elEsc(L.by || "a dreamer") : "still lost") + "</span><div style='font-size:12.5px;opacity:.85;font-style:italic'>“" + elEsc(EL_HIDE[k].hint) + "”</div></div>";
});
worldCard(h, {});
});
},
function (el) {
var S = EL_SMITHS[el], E = EL_BY[el];
var html = worldFacts(S.name, E.icon + " " + E.forge, [], ["“" + S.greet + "”"]);
html += worldBtn("talk", "Talk", "") + worldBtn("forge", "Work at " + elEsc(E.forge), "Forge a relic of " + E.name);
worldCard(html, { talk: function () { worldCard(null); wTalk({ name: S.name, persona: EL_CTX + " " + S.persona, greet: S.greet }); }, forge: function () { elForgeCard(el); } });
},
function () {
var h = worldFacts("The Great Anvil", "the heart of the Six Forges", [], ["Six forges, one for each element. Each makes five of its element's relics from its rare essence, with steel, crystal, leather and wood. One more of each is the Master's gift, and two of each were lost long ago."]), fns = {};
EL_ELEMENTS.forEach(function (E) { h += worldBtn("f_" + E.k, E.icon + " " + elEsc(E.forge.replace(/^the /, "The ")), elEsc(elMatName(E.ess)) + ": you have " + elHas(E.ess)); fns["f_" + E.k] = function () { elForgeCard(E.k); }; });
h += worldBtn("buy", "The counter", "Buy steel's ore and coal, leather, cloth, wood and crystal; smelt steel");
fns.buy = function () { worldCard(null); if (typeof craftOpen === "function")
craftOpen("sixforges"); };
elStock();
worldCard(h, fns);
},
function (el) {
var E = EL_BY[el];
EL.forgeEl = el;
Promise.all([elStock(), elState()]).then(function () {
if (EL.forgeEl !== el)
return;
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + E.icon + " " + elEsc(E.forge.replace(/^the /, "The ")) + "</div><div style='opacity:.8;margin-bottom:6px'>" + elEsc(E.about) + "</div>", fns = {};
h += "<div style='font-size:12.5px;opacity:.85'>" + elMatIcon(E.ess) + " <b>" + elEsc(elMatName(E.ess)) + "</b>: you have " + elHas(E.ess) + ". " + elEsc((EL_MATS.filter(function (m) { return m[0] === E.ess; })[0] || [])[4] || "") + ".</div>";
var left = EL.state && EL.state.crafts_left != null ? EL.state.crafts_left : null;
if (left != null && !elKeeper())
h += "<div style='font-size:12.5px;opacity:.75'>The forges will make " + left + " more for you today.</div>";
EL_KEYS.filter(function (k) { return EL_R[k].el === el; }).forEach(function (k) {
var R = EL_R[k], own = rlOwned(k) && !elKeeper();
h += "<div style='margin:7px 0 2px;padding-top:5px;border-top:1px solid rgba(255,255,255,.08)'><b>" + elEsc(R.name) + "</b>" + (own ? " <span style='color:#9FE29F'>yours</span>" : "") + "<div style='font-size:12px;opacity:.8'>" + elEsc(R.does) + "</div>";
if (R.how === "craft") {
var ok = elKeeper();
if (!ok) {
ok = true;
Object.keys(R.need).forEach(function (m) { if (elHas(m) < R.need[m])
ok = false; });
}
h += "<div style='font-size:12px;margin:2px 0'>" + Object.keys(R.need).map(function (m) { var got = elHas(m), enough = elKeeper() || got >= R.need[m]; return "<span style='white-space:nowrap;" + (enough ? "" : "color:#F0A0A0") + "'>" + elMatIcon(m) + " " + R.need[m] + " " + elEsc(elMatName(m).toLowerCase()) + (elKeeper() ? "" : " (" + got + ")") + "</span>"; }).join(", ") + "</div></div>";
if (!own) {
h += worldBtn("make_" + k, ok ? "Forge it" : "Forge it (you are short)", "");
fns["make_" + k] = function () { elCraft(k); };
}
}
else
h += "<div style='font-size:12px;opacity:.7'>" + (R.how === "gift" ? "The Master's gift, once you have laid a hand on the " + elEsc(EL_SHRINE[el].name.replace(/^The /, "")) + " (" + elEsc(EL_PLACE[EL_SHRINE[el].at]) + ")" : "Lost long ago: one of the twelve. Ask the Master for its riddle") + ".</div></div>";
if (own) {
h += worldBtn("use_" + k, R.slot === "weapon" ? "Take it up" : (RL.worn[k] ? "Take it off" : "Put it on"), "");
fns["use_" + k] = function () { worldCard(null); rlTake(k); };
}
});
h += worldBtn("buy", "The counter", "Buy the common materials, smelt steel");
fns.buy = function () { worldCard(null); if (typeof craftOpen === "function")
craftOpen("sixforges"); };
worldCard(h, fns);
});
},
function (k) {
var R = EL_R[k], E = EL_BY[R.el];
if (!elSigned()) {
elSay("Sign in first: what you forge is kept against your name.");
return;
}
elRpc("elemental_craft", { p_key: k }).then(function (o) {
if (o && o.ok) {
elTone(220, 0.12);
setTimeout(function () { elTone(330, 0.12); }, 160);
setTimeout(function () { elTone(494, 0.3); }, 320);
var s = EL.spots.filter(function (p) { return p.fn && p.name === E.forge.replace(/^the /, "The "); })[0], b = elBase();
if (s && b)
elBurst(R.el, b.x + s.x, s.y + 1.2, b.z + s.z, 2, "mend");
EL.stateAt = -99;
elState();
elStock();
elAfterGot();
}
var html = worldFacts(R.name, E.icon + " " + E.forge, [], [(o && o.say) || "The forge is cold."]), fns = {};
if (o && o.ok) {
html += worldBtn("use", R.slot === "weapon" ? "Take it up" : "Put it on", "");
fns.use = function () { worldCard(null); setTimeout(function () { rlTake(k); }, 400); };
}
html += worldBtn("back", "Back to the forge", "");
fns.back = function () { elForgeCard(R.el); };
worldCard(html, fns);
}).catch(function (e) { worldCard(worldFacts(R.name, "", [], [elMissing(e) ? elNotOpen() : "Couldn't reach the city."])); });
},
function (el) {
var E = EL_BY[el], h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + E.icon + " " + elEsc(E.name) + ": its relics</div><div style='opacity:.8;margin-bottom:6px'>" + elEsc(E.about) + "</div>";
EL_KEYS.filter(function (k) { return EL_R[k].el === el; }).forEach(function (k) {
var R = EL_R[k];
h += "<div style='margin:5px 0'><b>" + elEsc(R.name) + "</b> <span style='opacity:.65;font-size:12px'>" + (R.how === "craft" ? "forged here" : R.how === "gift" ? "the Master's gift" : "lost, one of the twelve") + "</span><div style='font-size:12px;opacity:.85'>" + elEsc(R.does) + "</div></div>";
});
worldCard(h, {});
},
function () {
if (!elKeeper())
return;
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>Forge a copy to give</div><div style='opacity:.8;margin-bottom:6px'>It goes into your things; give it to anyone from the Street's trade window, or from admin.html.</div>", fns = {};
EL_ELEMENTS.forEach(function (E) {
h += "<div style='margin-top:6px;opacity:.85'>" + E.icon + " " + elEsc(E.name) + "</div>";
EL_KEYS.filter(function (k) { return EL_R[k].el === E.k; }).forEach(function (k) { h += worldBtn("kf_" + k, elEsc(EL_R[k].name), ""); fns["kf_" + k] = function () { rlForge(k); }; });
});
worldCard(h, fns);
},
function () {
elState();
elStock();
var mine = EL_KEYS.filter(function (k) { return rlOwned(k); }), K = elKeeper();
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🔥 Elemental relics</div><div style='opacity:.85;margin-bottom:6px'>Fire, Water, Earth, Air, Storm and Life: forty-eight relics beside the North King's ice ones. Five of each element are forged in the Hall of the Six Forges on Mercury, one is Master Varenne's gift, and two of each lie lost somewhere in the universe.</div>", fns = {};
h += "<div style='font-size:12.5px;opacity:.85;margin-bottom:4px'>Their weapons fight in Ironfray; anywhere else F shows the element and harms no one. The armour's powers work everywhere.</div>";
h += worldBtn("way", "Show me the way to the Hall", WLD.on === "surface" && typeof SF !== "undefined" && SF.k === EL_HALL.at ? "An arrow at the top points to it" : "Take a ship from the Spaceport to Mercury");
fns.way = elShowWay;
if (K) {
h += worldBtn("kgo", "Take me to the Hall (Keeper)", "");
fns.kgo = function () { worldCard(null); elKeeperGo("hall"); };
}
if (mine.length && !K) {
h += "<div style='margin-top:8px;opacity:.85'>Yours</div>";
mine.forEach(function (k) { var R = EL_R[k]; h += worldBtn("m_" + k, EL_BY[R.el].icon + " " + elEsc(R.name), R.slot === "weapon" ? "Take it up" : RL.worn[k] ? "Worn: press to take it off" : "Press to put it on"); fns["m_" + k] = function () { worldCard(null); rlTake(k); }; });
}
h += worldBtn("shrines", "The six shrines", "Where each stands, and whether you have touched it");
fns.shrines = function () {
elState().then(function () {
var x = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The six shrines</div>";
EL_ELEMENTS.forEach(function (E) { x += "<div style='margin:5px 0'><b>" + E.icon + " " + elEsc(EL_SHRINE[E.k].name) + "</b> <span style='opacity:.7'>" + elEsc(EL_PLACE[EL_SHRINE[E.k].at]) + (elAttuned(E.k) ? ", touched" : "") + (elGifted(E.k) ? ", gift given" : "") + "</span><div style='font-size:12px;opacity:.8'>" + elEsc(EL_SHRINE[E.k].about) + "</div></div>"; });
x += "<div style='font-size:12px;opacity:.75;margin-top:6px'>The essences are gathered at glowing wells: " + EL_MATS.map(function (m) { return m[2] + " " + elEsc(m[1]) + " (" + elEsc(m[4]) + ")"; }).join("; ") + ".</div>";
worldCard(x, {});
});
};
h += worldBtn("riddles", "The twelve lost relics", "Master Varenne's riddles");
fns.riddles = elRiddlesCard;
worldCard(h, fns);
},
function () {
worldCard(null);
var b = elBase();
if (typeof WLD !== "undefined" && WLD.on === "surface" && typeof SF !== "undefined" && SF.k === EL_HALL.at && b) {
var H = EL.hall || elHallSpot();
guideTo = { key: "The Hall of the Six Forges", x: b.x + H.x, z: b.z + H.z };
elSay("<b>The Hall of the Six Forges</b>: follow the arrow at the top of the screen.");
return;
}
if (typeof WLD !== "undefined" && WLD.on) {
elSay("The Hall of the Six Forges is on <b>Mercury</b>. Head home, then take a ship from the Spaceport.");
return;
}
if (typeof showTheWay === "function" && typeof SPACEPORT_KEY !== "undefined") {
try {
showTheWay(SPACEPORT_KEY);
}
catch (e) { }
}
elSay("The Hall of the Six Forges is on <b>Mercury</b>. Follow the arrow to the Spaceport and take a ship there.");
},
function () {
var K = elKeeper() && EL.klist, st = EL.state, att = st && st.attuned || [];
var ess = EL_MATS.filter(function (m) { return elHas(m[0]) > 0; });
if (!K && !att.length && !ess.length)
return "";
var row = function (inner, btns) { return '<div style="display:flex;align-items:center;gap:6px;padding:3px 0;flex-wrap:wrap"><span style="flex:1 1 180px">' + inner + '</span>' + (btns || "") + '</div>'; };
var b = function (fn, t) { return '<button class="btn" onclick="' + fn + '">' + t + '</button>'; };
var x = '<div style="margin-top:8px"><b>🔥 Elemental relics</b> <span style="opacity:.7">the Six Forges, the shrines, the twelve lost</span></div>';
if (att.length && !elKeeper())
x += row("Shrines touched: " + att.map(function (e) { return EL_BY[e] ? EL_BY[e].icon + " " + EL_BY[e].name : ""; }).join(", "), b("elInfoCard()", "More"));
if (ess.length)
x += row("Essences: " + ess.map(function (m) { return m[2] + " " + elEsc(m[1]) + " × " + elHas(m[0]); }).join(", "));
if (K) {
x += '<div style="opacity:.8;margin-top:6px">The Keeper: the twelve hidden ones</div>';
K.forEach(function (r) {
var R = EL_R[r.k];
if (!R)
return;
x += row(EL_BY[R.el].icon + " " + elEsc(elShort(R)) + ' <span style="opacity:.7">' + elEsc(EL_PLACE[r.place] || r.place) + (r.x == null ? ", its hiding spot" : ", where you put it") + (r.owner_name ? ", found by " + elEsc(r.owner_name) : ", waiting") + '</span>', b("elKeeperGo('" + r.k + "')", "Go there") + b("elKeeperHere('" + r.k + "')", "Here") + b("elKeeperReset('" + r.k + "')", "Hide"));
});
}
return x;
},
function (k) {
if (!elKeeper())
return;
var place = elWhere();
if (!place || place === "battle") {
elSay("Stand outdoors somewhere first (not in Ironfray).");
return;
}
var L = elL(), a = yaw, x = L.x - Math.sin(a) * 3, z = L.z - Math.cos(a) * 3, y = elGround(x, z);
elRpc("keeper_elemental_move", { p_key: k, p_place: place, p_x: +x.toFixed(2), p_y: +y.toFixed(2), p_z: +z.toFixed(2) }).then(function (o) {
elSay(elEsc((o && o.say) || "Moved."));
EL.kmove = null;
EL.rowsAt = -99;
EL_PLACES = null;
EL.extra = (EL.extra || []).concat([place]);
EL.place = null;
elKeeperList().then(function () { if (typeof bkpPaint === "function")
bkpPaint(); });
}).catch(elFail);
},
function (k) {
if (!elKeeper())
return;
var r = (EL.klist || []).filter(function (q) { return q.k === k; })[0], place = k === "hall" ? EL_HALL.at : r ? r.place : EL_HIDE[k] && EL_HIDE[k].at;
if (!place)
return;
if (typeof bkpClose === "function")
try {
bkpClose();
}
catch (e) { }
if (/^land_/.test(place)) {
elSay("It lies in a dream land: go there by the Atlas.");
return;
}
var planet = ["mars", "pluto", "moon", "veyar", "venus", "mercury", "jupiter", "saturn", "uranus", "neptune"].indexOf(place) >= 0;
if (elWhere() !== place) {
if (place === "city") {
if (typeof WLD !== "undefined" && WLD.on && typeof worldHome === "function")
worldHome();
}
else if (planet)
worldGo("surface", { k: place });
else if (/^gr_/.test(place) && typeof GR !== "undefined" && GR.realms && GR.realms[place.slice(3)] && typeof grGo === "function")
grGo(GR.realms[place.slice(3)]);
else if (typeof WORLDS !== "undefined" && WORLDS[place])
worldGo(place, {});
else {
elSay("Can't go there from here.");
return;
}
}
EL.kgo = { k: k, place: place, r: r, t: 0 };
},
function (dt) {
var G = EL.kgo;
if (!G)
return;
G.t += dt;
if (G.t > 20) {
EL.kgo = null;
return;
}
if (EL.place !== G.place || G.t < 0.6)
return;
var b = elBase();
if (!b)
return;
var S, name;
if (G.k === "hall") {
var H = EL.hall || elHallSpot();
S = { x: H.x + Math.sin(H.yaw) * 30, z: H.z + Math.cos(H.yaw) * 30 };
name = "The Hall of the Six Forges";
}
else {
S = G.r && G.r.x != null ? { x: +G.r.x, z: +G.r.z } : elHideAt(G.k);
S = { x: S.x + 3, z: S.z + 3 };
name = EL_HIDE[G.k].what;
}
var y = elGround(S.x, S.z);
camera.position.set(b.x + S.x, y + 1.72, b.z + S.z);
var T = G.k === "hall" ? EL.hall || elHallSpot() : elHideAt(G.k);
yaw = Math.atan2(S.x - T.x, S.z - T.z);
pitch = 0;
if (typeof flyY !== "undefined")
flyY = y;
elSay("<b>" + elEsc(name) + "</b> is just ahead.");
EL.kgo = null;
}
];
});
