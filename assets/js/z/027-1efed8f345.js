/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(27, function () {
"use strict";
return [
function () {
if (DRG.tex.scale)
return DRG.tex.scale;
var c = document.createElement("canvas");
c.width = c.height = 128;
var x = c.getContext("2d");
x.fillStyle = "#d8d8d8";
x.fillRect(0, 0, 128, 128);
for (var row = -1; row < 9; row++)
for (var col = -1; col < 9; col++) {
var cx = col * 16 + (row % 2 ? 8 : 0), cy = row * 14;
var gr = x.createRadialGradient(cx, cy - 4, 1, cx, cy, 11);
gr.addColorStop(0, "#ffffff");
gr.addColorStop(0.72, "#ececec");
gr.addColorStop(1, "#b0b0b0");
x.fillStyle = gr;
x.beginPath();
x.arc(cx, cy, 10, 0, Math.PI);
x.lineTo(cx - 10, cy);
x.fill();
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.anisotropy = 2;
DRG.tex.scale = t;
return t;
},
function (pts, rad, o) {
o = o || {};
var RS = o.radial || (drgLite() ? 10 : 16), n = pts.length, curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
var S = o.samples || Math.max(24, Math.min(drgLite() ? 70 : 140, Math.round(curve.getLength() * 2.2)));
var P = [], T = [], B = [], N = [], up = new THREE.Vector3(0, 1, 0), prevB = new THREE.Vector3(1, 0, 0);
for (var i = 0; i <= S; i++) {
var s = i / S, p = curve.getPointAt(s), t = curve.getTangentAt(s).normalize();
var b = new THREE.Vector3().crossVectors(up, t);
if (b.lengthSq() < 1e-4)
b.copy(prevB);
else {
b.normalize();
if (b.dot(prevB) < 0 && i > 0 && Math.abs(t.y) > 0.8)
b.negate();
}
var nn = new THREE.Vector3().crossVectors(t, b).normalize();
P.push(p);
T.push(t);
B.push(b);
N.push(nn);
prevB.copy(b);
}
var pos = new Float32Array((S + 1) * (RS + 1) * 3), nor = new Float32Array(pos.length), uv = new Float32Array((S + 1) * (RS + 1) * 2), colr = new Float32Array(pos.length);
var cBack = new THREE.Color(o.back || 0x3F7A3A), cBelly = new THREE.Color(o.belly || 0xC8C090), cRidge = new THREE.Color(o.ridge || 0x22301E), tmp = new THREE.Color();
var fy = o.flat || 0.86, len = curve.getLength(), k = 0;
for (i = 0; i <= S; i++) {
var s2 = i / S, r = rad(s2);
for (var j = 0; j <= RS; j++) {
var th = j / RS * Math.PI * 2, cs = Math.cos(th), sn = Math.sin(th);
var ny = cs * fy * (cs < 0 ? 0.92 : 1);
var vx = N[i].x * ny + B[i].x * sn, vy = N[i].y * ny + B[i].y * sn, vz = N[i].z * ny + B[i].z * sn;
pos[k * 3] = P[i].x + vx * r;
pos[k * 3 + 1] = P[i].y + vy * r;
pos[k * 3 + 2] = P[i].z + vz * r;
var nl = Math.sqrt(vx * vx + vy * vy + vz * vz) || 1;
nor[k * 3] = vx / nl;
nor[k * 3 + 1] = vy / nl;
nor[k * 3 + 2] = vz / nl;
uv[k * 2] = s2 * len / (o.scaleLen || 2.4);
uv[k * 2 + 1] = j / RS * (o.scaleAround || 2.5);
var bel = Math.max(0, Math.min(1, (-cs - 0.25) / 0.45));
tmp.copy(cBack).lerp(cBelly, bel);
if (cs > 0.82)
tmp.lerp(cRidge, (cs - 0.82) / 0.18 * 0.7);
if (bel > 0.5 && o.plates !== false) {
var band = (s2 * len / (o.plate || 0.45)) % 1;
if (band < 0.12)
tmp.multiplyScalar(0.8);
}
colr[k * 3] = tmp.r;
colr[k * 3 + 1] = tmp.g;
colr[k * 3 + 2] = tmp.b;
k++;
}
}
var idx = [];
for (i = 0; i < S; i++)
for (j = 0; j < RS; j++) {
var a = i * (RS + 1) + j, b2 = a + RS + 1;
idx.push(a, b2, a + 1, b2, b2 + 1, a + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
g.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
g.setAttribute("color", new THREE.BufferAttribute(colr, 3));
g.setIndex(idx);
return { geo: g, curve: curve, P: P, T: T, B: B, N: N, S: S, RS: RS, base: o.sway ? pos.slice() : null };
},
function (o) {
var h = new THREE.Group(), skin = o.skin, dark = o.dark, bone = o.bone;
var skull = P(sph(0.78, 16, 12), skin, 0, 0.05, 0);
skull.scale.set(1, 0.78, 1.12);
h.add(skull);
var snout = P(cyl(0.34, 0.58, 1.6, 12), skin, 0, -0.02, 1.15, Math.PI / 2);
snout.scale.set(1, 1, 0.72);
h.add(snout);
var tip = P(sph(0.36, 12, 8), skin, 0, 0, 1.92);
tip.scale.set(1, 0.66, 0.9);
h.add(tip);
[-1, 1].forEach(function (sd) {
var ns = P(sph(0.05, 6, 5), mL(0x2A1A16), sd * 0.15, 0.1, 2.2);
ns.scale.set(1.4, 0.5, 0.8);
h.add(ns);
var brow = P(box(0.34, 0.14, 0.62), dark, sd * 0.42, 0.42, 0.42, -0.25, sd * 0.25, sd * 0.2);
h.add(brow);
var eye = P(sph(0.15, 12, 10), new THREE.MeshBasicMaterial({ color: o.eye || 0xF2C14E }), sd * 0.5, 0.24, 0.5);
eye.scale.set(0.7, 1, 1);
h.add(eye);
h.add(P(box(0.02, 0.2, 0.05), new THREE.MeshBasicMaterial({ color: 0x0A0805 }), sd * 0.6, 0.24, 0.56));
var fr = P(cone(0.16, 0.7, 4), dark, sd * 0.72, -0.05, -0.35, 0, 0, sd * 1.9);
h.add(fr);
});
var jaw = new THREE.Group();
jaw.position.set(0, -0.3, 0.15);
jaw.rotation.x = o.gape === undefined ? 0.28 : o.gape;
var lj = P(cyl(0.26, 0.46, 1.75, 10), skin, 0, -0.08, 0.95, Math.PI / 2);
lj.scale.set(1, 1, 0.45);
jaw.add(lj);
var teeth = new THREE.MeshLambertMaterial({ color: 0xF2EBD8 });
for (var q = 0; q < 5; q++) {
[-1, 1].forEach(function (sd) {
h.add(P(cone(0.045, 0.18, 4), teeth, sd * (0.3 - q * 0.035), -0.3, 0.85 + q * 0.24, Math.PI));
jaw.add(P(cone(0.04, 0.15, 4), teeth, sd * (0.24 - q * 0.03), 0.02, 0.7 + q * 0.24));
});
}
if (o.tongue) {
var tg = new THREE.MeshLambertMaterial({ color: 0xB02A3A });
jaw.add(P(box(0.05, 0.02, 0.55), tg, 0, 0.05, 1.55));
jaw.add(P(box(0.03, 0.02, 0.22), tg, -0.035, 0.05, 1.9, 0, -0.35, 0));
jaw.add(P(box(0.03, 0.02, 0.22), tg, 0.035, 0.05, 1.9, 0, 0.35, 0));
}
h.add(jaw);
h.userData.jaw = jaw;
if (o.horns !== false) {
[-1, 1].forEach(function (sd) {
var hn = drgSpike(o.east ? 1.0 : 1.6, 0.13, o.east ? 0.6 : 1.2, bone);
hn.position.set(sd * 0.4, 0.45, -0.25);
hn.rotation.set(-0.35, Math.PI + sd * 0.35, 0);
h.add(hn);
if (!o.east) {
var h2 = drgSpike(0.7, 0.07, 0.5, bone);
h2.position.set(sd * 0.62, 0.15, -0.2);
h2.rotation.set(-0.1, Math.PI + sd * 0.7, 0);
h.add(h2);
}
});
}
if (o.east) {
[-1, 1].forEach(function (sd) {
var an = new THREE.Group();
an.position.set(sd * 0.35, 0.5, -0.2);
an.rotation.set(-0.7, sd * 0.3, 0);
an.add(drgSpike(1.6, 0.08, 0.4, bone));
var t1 = drgSpike(0.6, 0.05, 0.3, bone);
t1.position.set(0, 0.1, 0.6);
t1.rotation.set(-0.8, sd * 0.5, 0);
an.add(t1);
var t2 = drgSpike(0.5, 0.05, 0.3, bone);
t2.position.set(0, 0.15, 1.05);
t2.rotation.set(-0.8, -sd * 0.4, 0);
an.add(t2);
h.add(an);
var wh = drgSpike(2.6, 0.035, -0.8, o.whisker || bone);
wh.position.set(sd * 0.22, -0.02, 2.05);
wh.rotation.set(0.25, sd * 1.25, 0);
h.add(wh);
});
var mane = new THREE.MeshLambertMaterial({ color: o.mane || 0xC8462A });
for (var mq = 0; mq < 9; mq++) {
var a = (mq / 8 - 0.5) * 2.4;
h.add(P(cone(0.12, 0.9, 5), mane, Math.sin(a) * 0.65, Math.cos(a) * 0.55 + 0.1, -0.75 - Math.abs(a) * 0.08, -1.9, 0, -a * 0.6));
}
for (var bq = 0; bq < 4; bq++)
jaw.add(P(cone(0.07, 0.6, 5), mane, (bq - 1.5) * 0.12, -0.35, 0.25, Math.PI - 0.4, 0, 0));
}
if (o.hood) {
var sh = new THREE.Shape();
sh.moveTo(0, -0.6);
sh.bezierCurveTo(1.7, -0.2, 1.5, 1.9, 0, 2.2);
sh.bezierCurveTo(-1.5, 1.9, -1.7, -0.2, 0, -0.6);
var hd = new THREE.Mesh(new THREE.ShapeGeometry(sh, 16), new THREE.MeshLambertMaterial({ color: o.hoodCol, side: THREE.DoubleSide }));
hd.position.set(0, -0.6, -0.7);
hd.rotation.x = -0.25;
h.add(hd);
}
if (o.feathers) {
var fc = [0x1E8C5A, 0x2EA86A, 0xC0392B, 0xD8A53A, 0x1E6E9A];
for (var fq = 0; fq < 14; fq++) {
var fa = fq / 14 * Math.PI * 2;
var fe = P(sph(0.22, 8, 6), new THREE.MeshLambertMaterial({ color: fc[fq % fc.length] }), Math.cos(fa) * 0.9, Math.sin(fa) * 0.8 + 0.1, -0.45);
fe.scale.set(0.45, 0.45, 3.2);
fe.lookAt(new THREE.Vector3(Math.cos(fa) * 3, Math.sin(fa) * 3, -1.8));
h.add(fe);
}
}
return h;
},
function (skin, bone, sd, tuck) {
var g = new THREE.Group();
var th = P(cyl(0.34, 0.24, 1.5, 8), skin, 0, -0.6, 0);
th.rotation.z = sd * 0.35;
g.add(th);
var shin = new THREE.Group();
shin.position.set(sd * 0.25, -1.3, 0);
shin.rotation.x = tuck ? 1.2 : -0.35;
g.add(shin);
shin.add(P(cyl(0.22, 0.16, 1.3, 8), skin, 0, -0.6, 0));
var foot = new THREE.Group();
foot.position.set(0, -1.25, 0.1);
shin.add(foot);
var pad = P(sph(0.26, 8, 6), skin, 0, 0, 0.1);
pad.scale.set(1, 0.5, 1.2);
foot.add(pad);
for (var c = -1; c <= 1; c++) {
var cl = drgSpike(0.55, 0.06, -0.8, bone);
cl.position.set(c * 0.14, -0.02, 0.2);
cl.rotation.set(0.25, c * 0.3, 0);
foot.add(cl);
}
return g;
},
function (col, dark, sd) {
var shp = new THREE.Shape();
shp.moveTo(0, 0);
shp.lineTo(3, 4.6);
shp.lineTo(11.5, 3.4);
shp.quadraticCurveTo(9.8, 1.2, 9.3, -0.8);
shp.quadraticCurveTo(7.2, 0.3, 6.2, -1.6);
shp.quadraticCurveTo(4.1, -0.3, 2.9, -2);
shp.quadraticCurveTo(1.5, -0.7, 0, -1.3);
shp.lineTo(0, 0);
var w = new THREE.Group();
var mem = new THREE.Mesh(new THREE.ShapeGeometry(shp, 8), new THREE.MeshLambertMaterial({ color: shade(col, -0.25), side: THREE.DoubleSide, transparent: true, opacity: 0.93 }));
mem.rotation.x = Math.PI / 2;
mem.scale.set(sd, 1, 1);
w.add(mem);
[[3, 4.6, 0.22], [11.5, 3.4, 0.16], [9.3, -0.8, 0.12], [6.2, -1.6, 0.12], [2.9, -2, 0.12]].forEach(function (pt) {
var len = Math.sqrt(pt[0] * pt[0] + pt[1] * pt[1]);
var b = new THREE.Mesh(new THREE.CylinderGeometry(pt[2] * 0.6, pt[2], len, 6), dark);
b.position.set(pt[0] / 2, pt[1] / 2, 0);
b.rotation.z = Math.atan2(pt[1], pt[0]) - Math.PI / 2;
mem.add(b);
});
var cl = drgSpike(0.6, 0.08, 0.6, dark);
cl.position.set(3, 4.6, 0);
mem.add(cl);
return w;
},
function (kind, o) {
var V = function (x, y, z) { return new THREE.Vector3(x, y, z); }, pts = [], i;
if (kind === "flyer") {
return [V(0, -1.2, -13), V(0.9, -0.6, -10.5), V(-0.6, -0.2, -8), V(0.2, 0, -5.5), V(0, 0.1, -3), V(0, 0.2, -0.5), V(0, 0.6, 1.8), V(0, 1.6, 3.6), V(0, 2.3, 5.2), V(0, 2.2, 6.4)];
}
if (kind === "east") {
for (i = 0; i <= 12; i++) {
var t = i / 12;
pts.push(V(Math.sin(t * Math.PI * 2.4) * 2.6 * (1 - t * 0.4), 1.6 + Math.sin(t * Math.PI * 1.6) * 0.9 + t * 1.4, (t - 0.55) * 24));
}
return pts;
}
if (kind === "ring") {
for (i = 0; i <= 24; i++) {
var a = i / 24 * Math.PI * 1.9 + 0.25;
pts.push(V(Math.cos(a) * 6, 0.9 + Math.sin(a * 3) * 0.25, Math.sin(a) * 6));
}
return pts;
}
var turns = o.turns || 2, R0 = o.R0 || 4.6, R1 = o.R1 || 1.9, NS = 32;
for (i = 0; i <= NS; i++) {
var u = i / NS, a2 = u * turns * Math.PI * 2, r = R0 + (R1 - R0) * u;
pts.push(V(Math.cos(a2) * r, 0.7 + u * 0.6, Math.sin(a2) * r));
}
var last = pts[pts.length - 1], aEnd = turns * Math.PI * 2;
pts.push(V(Math.cos(aEnd) * R1 * 0.4, 2.4, Math.sin(aEnd) * R1 * 0.4 + 0.6));
pts.push(V(0, 4.0, 1.0));
pts.push(V(0, 5.4, 1.5));
pts.push(V(0, 6.2, 2.6));
pts.push(V(0, 6.3, 3.7));
return pts;
},
function (spec, f, icons) {
var d = spec.deity ? DEITY[spec.deity] : null;
var ic = icons || (d ? d.icons : ["color:green", "size:2", "wings", "legs"]);
function val(k, def) { var v = def; ic.forEach(function (t) { var p = String(t).split(":"); if (p[0] === k)
v = p.length > 1 ? p[1] : true; }); return v; }
var col = ICONCOL[val("color", "green")] || 0x3F7A3A, size = parseFloat(val("size", 2)) || 2, heads = Math.max(1, parseInt(val("heads", 1), 10) || 1);
var wings = !!val("wings", false), legs = !!val("legs", false), hood = !!val("hood", false), feathered = !!val("feathered", false), sea = !!val("sea", false);
var east = !!(d && DRG_EAST[d.trad] && legs && !wings), ring = !!(d && d.key === "jormungandr");
var kind = ring ? "ring" : (wings && !sea) ? "flyer" : legs ? "east" : "coil";
if (spec.templerow || spec.city)
size = Math.min(size, kind === "flyer" ? 3 : kind === "east" ? 2.2 : 2.6);
var bellyCol = shade(col, 0.42), back = col, ridge = shade(col, -0.45);
if (col === ICONCOL.black) {
back = 0x26262C;
bellyCol = 0x5A4A3A;
ridge = 0x0E0E10;
}
if (col === ICONCOL.white) {
bellyCol = 0xD8CDB0;
ridge = 0xA8A090;
}
var skinM = drgSkin(), headM = new THREE.MeshLambertMaterial({ color: shade(back, 0.04) }), darkM = new THREE.MeshLambertMaterial({ color: ridge }), boneM = new THREE.MeshLambertMaterial({ color: col === ICONCOL.gold ? 0xF2E3B8 : 0xE6DCC2 });
var g = new THREE.Group(), body = new THREE.Group();
g.add(body);
var profile = kind === "flyer" ? function (s) { return s < 0.55 ? 0.06 + 1.25 * Math.pow(s / 0.55, 0.8) : s < 0.72 ? 1.31 - (s - 0.55) * 3.2 : 0.77 - (s - 0.72) * 0.9; }
: kind === "east" ? function (s) { return s < 0.25 ? 0.05 + 0.75 * (s / 0.25) : s < 0.85 ? 0.8 : 0.8 - (s - 0.85) * 1.2; }
: function (s) { return s < 0.22 ? 0.06 + 0.94 * (s / 0.22) : s < 0.8 ? 1 : 1 - (s - 0.8) * 0.9; };
var spine = drgSpine(kind, {});
var T = drgTube(spine, profile, { back: back, belly: bellyCol, ridge: ridge, sway: kind !== "flyer" });
var trunk = new THREE.Mesh(T.geo, skinM);
body.add(trunk);
var spineN = drgLite() ? 12 : 24;
if (sea && kind !== "flyer") {
var fin = [];
for (var fi = 0; fi <= 30; fi++) {
var s3 = 0.12 + fi / 30 * 0.7, F3 = drgFrame(T, s3), rr = profile(s3);
fin.push(F3.p.clone().add(F3.N.clone().multiplyScalar(rr * 0.9)), F3.p.clone().add(F3.N.clone().multiplyScalar(rr * 0.9 + 0.45 + 0.35 * Math.sin(fi * 0.9) * Math.sin(fi * 0.9))));
}
var fg2 = new THREE.BufferGeometry(), fp = [];
for (fi = 0; fi < 30; fi++) {
var a0 = fin[fi * 2], a1 = fin[fi * 2 + 1], b0 = fin[fi * 2 + 2], b1 = fin[fi * 2 + 3];
fp.push(a0.x, a0.y, a0.z, b0.x, b0.y, b0.z, a1.x, a1.y, a1.z, a1.x, a1.y, a1.z, b0.x, b0.y, b0.z, b1.x, b1.y, b1.z);
}
fg2.setAttribute("position", new THREE.Float32BufferAttribute(fp, 3));
fg2.computeVertexNormals();
body.add(new THREE.Mesh(fg2, new THREE.MeshLambertMaterial({ color: shade(col, 0.15), side: THREE.DoubleSide, transparent: true, opacity: 0.9 })));
}
else
for (var si = 1; si < spineN; si++) {
var s4 = 0.06 + si / spineN * 0.86, F4 = drgFrame(T, s4), r4 = profile(s4), hgt = (0.25 + 0.5 * Math.sin(Math.min(1, s4 * 1.4) * Math.PI)) * (kind === "east" ? 0.6 : 1);
var sp = new THREE.Mesh(fg("drg_spine", function () { return cone(0.16, 1, 5); }), darkM);
drgAt(sp, F4, 0, r4 * 0.84 + hgt * 0.45, 0);
sp.scale.set(r4 * 1.1, hgt, r4 * 1.6);
sp.rotateX(-0.45);
body.add(sp);
}
if (feathered) {
var fcol = [0x1E8C5A, 0xC0392B, 0xD8A53A, 0x2EA86A];
for (var fq = 0; fq < 28; fq++) {
var s5 = 0.08 + fq / 28 * 0.84, F5 = drgFrame(T, s5), r5 = profile(s5);
[-1, 1].forEach(function (sd) {
var fe = new THREE.Mesh(fg("drg_feather", function () { return sph(0.2, 8, 6); }), new THREE.MeshLambertMaterial({ color: fcol[(fq + (sd > 0 ? 1 : 0)) % 4] }));
drgAt(fe, F5, sd * r5 * 0.95, r5 * 0.35, 0);
fe.scale.set(0.5, 0.35, 3.4);
fe.rotateY(sd * 0.5);
fe.rotateZ(sd * 0.6);
body.add(fe);
});
}
}
var heads3 = [], end = drgFrame(T, 1), hcol = shade(col, -0.2);
var hopts = { skin: headM, dark: darkM, bone: boneM, east: east, hood: hood, hoodCol: shade(col, -0.1), feathers: feathered, tongue: !legs && !wings,
eye: col === ICONCOL.black ? 0xE04A2A : 0xF2C14E, mane: east ? (col === ICONCOL.gold ? 0xC8462A : 0xD8A53A) : 0, gape: kind === "ring" ? 0.9 : undefined, horns: !hood && !feathered };
if (heads === 1) {
var hd = drgHead(hopts);
var rEnd = profile(1) * 1.0;
drgAt(hd, end, 0, 0, -0.2);
hd.scale.setScalar(Math.max(0.9, rEnd * 1.35));
body.add(hd);
heads3.push(hd);
}
else {
var base = drgFrame(T, 0.9);
for (var hi = 0; hi < heads; hi++) {
var spread = (hi / (heads - 1) - 0.5) * 2.2, lift = 2.4 + Math.cos(spread * 1.2) * 1.8;
var nb = [], o3 = base.p;
for (var nk = 0; nk <= 4; nk++) {
var kk = nk / 4;
nb.push(new THREE.Vector3(o3.x + Math.sin(spread) * 4 * kk + base.T.x * kk * 1.5, o3.y + lift * Math.sin(kk * Math.PI * 0.6) + kk * 0.8, o3.z + Math.cos(spread) * 4 * kk * 0.8 + base.T.z * kk * 1.5));
}
var NT = drgTube(nb, function (s) { return 0.5 - s * 0.2; }, { back: back, belly: bellyCol, ridge: ridge, radial: 10, samples: 24 });
body.add(new THREE.Mesh(NT.geo, skinM));
var hd2 = drgHead(hopts);
drgAt(hd2, drgFrame(NT, 1), 0, 0, -0.1);
hd2.scale.setScalar(0.62);
body.add(hd2);
heads3.push(hd2);
}
}
if (legs) {
var at = kind === "flyer" ? [0.42, 0.62] : kind === "east" ? [0.3, 0.72] : [0.35, 0.65];
at.forEach(function (s6, li) {
var F6 = drgFrame(T, s6), r6 = profile(s6);
[-1, 1].forEach(function (sd) {
var lg = drgLeg(headM, boneM, sd, kind === "flyer");
drgAt(lg, F6, sd * r6 * 0.85, -r6 * 0.25, 0);
lg.scale.setScalar(kind === "flyer" ? 0.9 + li * 0.3 : Math.max(0.7, r6 * 1.0));
body.add(lg);
});
});
}
var wingG = [];
if (wings) {
var F7 = drgFrame(T, kind === "flyer" ? 0.6 : 0.7), r7 = profile(kind === "flyer" ? 0.6 : 0.7);
[-1, 1].forEach(function (sd) {
var w = drgWing(col, darkM, sd);
var wp = new THREE.Group();
drgAt(wp, F7, sd * r7 * 0.6, r7 * 0.6, 0.4);
wp.add(w);
w.rotation.y = sd > 0 ? 0 : 0;
body.add(wp);
wingG.push({ g: w, sd: sd });
});
}
if (val("stars", false) && typeof particles === "function") {
var stp = particles(120, [4, 4, 12], 0xF2F4FF, 1.4, .9);
stp.position.y = 3;
body.add(stp);
}
body.scale.multiplyScalar(size * (kind === "flyer" ? 1.05 : 1));
var row = !!(spec.templerow || spec.city), fit = 1;
if (row) {
body.updateMatrixWorld(true);
var bb = new THREE.Box3().setFromObject(body), bs = bb.getSize(new THREE.Vector3());
var cap = kind === "flyer" ? 15 : kind === "east" ? 16 : 13, ext = Math.max(bs.x, bs.z);
if (ext > cap) {
fit = cap / ext;
body.scale.multiplyScalar(fit);
size *= fit;
}
}
var fly = kind === "flyer", flyR = row ? 5 : 14, flyH = row ? 13 : 16;
if (!fly && typeof contactShadow === "function")
g.add(contactShadow((kind === "east" ? 9 : kind === "ring" ? 7.5 : 5.5) * size));
var posA = T.geo.attributes.position, baseA = T.base, swayAt = 0, sx = spec.x || 0, sz = spec.z || 0;
g.userData.anim = function (t, dt) {
wingG.forEach(function (w) { w.g.rotation.z = w.sd * (0.25 + Math.sin(t * 1.5) * 0.45); });
heads3.forEach(function (h, k) { var jw = h.userData.jaw; if (jw)
jw.rotation.x = (hopts.gape === undefined ? 0.22 : hopts.gape) + Math.max(0, Math.sin(t * 0.7 + k)) * 0.18; });
if (fly) {
body.position.set(Math.cos(t * .07) * flyR, flyH + Math.sin(t * .6) * 1.4, Math.sin(t * .07) * flyR);
body.rotation.y = -t * .07;
return;
}
body.position.y = Math.sin(t * 0.9) * 0.06 * size;
if (!baseA || t - swayAt < 0.06)
return;
var C = typeof camera !== "undefined" && camera ? camera.position : null;
if (C && Math.abs(C.x - sx) + Math.abs(C.z - sz) > 260)
return;
swayAt = t;
var A = posA.array, RS1 = T.RS + 1;
for (var i = 0; i <= T.S; i++) {
var s = i / T.S, w = Math.sin(t * 1.1 - s * 9) * 0.22 * Math.min(1, s * 3) * (1 - s * 0.6), bx = T.B[i].x * w, bz = T.B[i].z * w;
for (var j = 0; j < RS1; j++) {
var q = (i * RS1 + j) * 3;
A[q] = baseA[q] + bx;
A[q + 2] = baseA[q + 2] + bz;
}
}
posA.needsUpdate = true;
};
return g;
}
];
});
