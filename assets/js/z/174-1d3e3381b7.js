/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(174, function () {
return [
function (x, w, h, pat, col) {
var r = function (n) { var s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); };
x.save();
if (pat === "scales") {
var st = Math.max(6, Math.round(w / 64)), rr = st * 0.62;
for (var row = 0, y = 0; y < h + st; y += st * 0.62, row++) {
for (var cx = (row % 2) * st / 2; cx < w + st; cx += st) {
x.beginPath();
x.arc(cx, y, rr, 0.1 * Math.PI, 0.9 * Math.PI);
x.strokeStyle = "rgba(0,0,0,0.34)";
x.lineWidth = Math.max(1, st / 7);
x.stroke();
x.beginPath();
x.arc(cx, y - rr * 0.18, rr * 0.7, 1.15 * Math.PI, 1.85 * Math.PI);
x.strokeStyle = "rgba(255,255,255,0.13)";
x.lineWidth = Math.max(1, st / 9);
x.stroke();
}
}
var g = x.createLinearGradient(0, 0, 0, h);
g.addColorStop(0, "rgba(0,0,0,0.10)");
g.addColorStop(1, "rgba(255,240,200,0.06)");
x.fillStyle = g;
x.fillRect(0, 0, w, h);
}
else if (pat === "rough") {
for (var i = 0; i < w * h / 90; i++) {
var px = r(i) * w, py = r(i + 0.5) * h, s = 1 + r(i + 0.3) * 3;
x.fillStyle = r(i + 0.7) > 0.5 ? "rgba(0,0,0,0.10)" : "rgba(255,255,220,0.06)";
x.fillRect(px, py, s, s);
}
}
else if (pat === "spots") {
for (var j = 0; j < w * h / 1400; j++) {
var sx = r(j) * w, sy = r(j + 0.21) * h, sr = 1.5 + r(j + 0.4) * 4;
x.beginPath();
x.arc(sx, sy, sr, 0, 7);
x.fillStyle = "rgba(40,60,10,0.16)";
x.fill();
}
}
else if (pat === "shimmer") {
for (var k = 0; k < w * h / 260; k++) {
var qx = r(k) * w, qy = r(k + 0.33) * h;
x.fillStyle = "rgba(255,255,255," + (0.12 + r(k + 0.9) * 0.25) + ")";
x.fillRect(qx, qy, 1.2, 1.2);
}
}
else if (pat === "shade") {
var g2 = x.createRadialGradient(w * 0.18, h * 0.16, 2, w * 0.18, h * 0.16, w * 0.3);
g2.addColorStop(0, "rgba(0,0,0,0)");
g2.addColorStop(1, "rgba(30,0,20,0.12)");
x.fillStyle = g2;
x.fillRect(0, 0, w, h);
}
x.restore();
},
function (pts, r0, seg) {
seg = seg || 24;
var curve = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }));
var G = new THREE.TubeGeometry(curve, seg, r0, 8, false), pos = G.attributes.position, rad = 9, c = new THREE.Vector3(), v = new THREE.Vector3();
for (var i = 0; i <= seg; i++) {
curve.getPointAt(i / seg, c);
var t = i / seg, k = Math.max(0.04, 1 - t * 0.96) * (1 + 0.12 * Math.max(0, Math.sin(i * 1.7)) * (1 - t));
for (var j = 0; j < rad; j++) {
var n = i * rad + j;
v.fromBufferAttribute(pos, n).sub(c).multiplyScalar(k).add(c);
pos.setXYZ(n, v.x, v.y, v.z);
}
}
pos.needsUpdate = true;
G.computeVertexNormals();
return G;
},
function (sd, len, wide, skin, hy, droop) {
var g = new THREE.Group(), sh = new THREE.Shape();
sh.moveTo(0, 0);
sh.quadraticCurveTo(wide, len * 0.35, wide * 0.25, len);
sh.quadraticCurveTo(-wide * 0.2, len * 0.45, -wide * 0.15, 0);
sh.lineTo(0, 0);
var geo = new THREE.ExtrudeGeometry(sh, { depth: 0.012, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 2, curveSegments: 10 });
var e = new THREE.Mesh(geo, spMat(skin, { r: 0.7 }));
g.add(e);
var inner = new THREE.Mesh(new THREE.ShapeGeometry(sh, 8), spMat(shade(skin, -0.25), { r: 0.8, side: 1 }));
inner.scale.set(0.6, 0.75, 1);
inner.position.set(0.004, len * 0.08, 0.02);
g.add(inner);
g.position.set(sd * 0.1, hy - 0.01, -0.01);
g.rotation.set(-0.75 - (droop || 0), sd * -1.35, sd * -(1.2 + (droop || 0) * 0.8));
if (sd < 0) {
g.scale.x = -1;
}
return g;
},
function (sd, col) {
var g = new THREE.Group(), sh = new THREE.Shape(), tips = [[1.55, 0.15], [1.38, -0.42], [1.0, -0.78], [0.48, -0.8]];
sh.moveTo(0, 0);
sh.lineTo(0.55, 0.5);
sh.lineTo(1.05, 0.62);
sh.lineTo(tips[0][0], tips[0][1]);
for (var i = 1; i < tips.length; i++) {
var a = tips[i - 1], b = tips[i];
sh.quadraticCurveTo((a[0] + b[0]) / 2 - 0.16, (a[1] + b[1]) / 2 + 0.12, b[0], b[1]);
}
sh.quadraticCurveTo(0.2, -0.42, 0, -0.12);
sh.lineTo(0, 0);
var mem = spMat(shade(col, -0.18), { r: 0.8, side: 1 });
mem.transparent = true;
mem.opacity = 0.93;
var m = new THREE.Mesh(new THREE.ShapeGeometry(sh, 14), mem);
g.add(m);
var bm = spMat(shade(col, -0.45), { r: 0.5 });
function bone(a, b, r) {
var A = new THREE.Vector3(a[0], a[1], 0.01), B = new THREE.Vector3(b[0], b[1], 0.01), d = B.clone().sub(A), c = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.6, r, d.length(), 6), bm);
c.position.copy(A).add(B).multiplyScalar(0.5);
c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
g.add(c);
}
bone([0, 0], [0.55, 0.5], 0.035);
bone([0.55, 0.5], [1.05, 0.62], 0.028);
tips.forEach(function (t) { bone([1.05, 0.62], t, 0.018); });
var claw = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.09, 6), spMat(0x2A2420));
claw.position.set(1.08, 0.68, 0.01);
claw.rotation.z = -0.5;
g.add(claw);
g.scale.set(sd * 0.62, 0.62, 0.62);
return g;
},
function () {
return SP_LIVE.ftex || (SP_LIVE.ftex = (function () {
var cv = document.createElement("canvas");
cv.width = 64;
cv.height = 256;
var x = cv.getContext("2d");
var g = x.createLinearGradient(0, 0, 64, 0);
g.addColorStop(0, "#E8E2D8");
g.addColorStop(0.5, "#FFFFFF");
g.addColorStop(1, "#DCD6CC");
x.fillStyle = g;
x.beginPath();
x.moveTo(32, 0);
x.quadraticCurveTo(64, 40, 58, 200);
x.quadraticCurveTo(48, 250, 32, 256);
x.quadraticCurveTo(16, 250, 6, 200);
x.quadraticCurveTo(0, 40, 32, 0);
x.fill();
x.strokeStyle = "rgba(150,140,125,0.7)";
x.lineWidth = 2;
x.beginPath();
x.moveTo(32, 6);
x.lineTo(32, 252);
x.stroke();
x.strokeStyle = "rgba(170,160,145,0.35)";
x.lineWidth = 1;
for (var i = 0; i < 26; i++) {
var y = 20 + i * 9;
x.beginPath();
x.moveTo(32, y);
x.lineTo(8, y + 16);
x.moveTo(32, y);
x.lineTo(56, y + 16);
x.stroke();
}
var T = new THREE.CanvasTexture(cv);
return T;
})());
},
function (sd, col) {
var g = new THREE.Group(), mat = new THREE.MeshLambertMaterial({ map: spFeatherTex(), color: col, emissive: 0x3A3630, side: THREE.DoubleSide, alphaTest: 0.45 });
var fg = SP_LIVE.fgeo || (SP_LIVE.fgeo = (function () { var q = new THREE.PlaneGeometry(0.17, 1); q.translate(0, -0.5, 0); return q; })());
var arm = function (t) { return new THREE.Vector3(Math.sin(t * 1.35) * 1.0, 0.08 + Math.sin(t * Math.PI * 0.62) * 0.55 - t * 0.12, 0); };
var rows = [[12, 0, 1, function (t) { return 0.18 + t * 0.12; }, 0.012], [10, 0, 0.62, function (t) { return 0.42 + t * 0.22; }, 0.006], [8, 0.5, 1, function (t) { return 0.62 + t * 0.5; }, 0]];
rows.forEach(function (R) {
for (var i = 0; i < R[0]; i++) {
var t = R[1] + (R[2] - R[1]) * i / (R[0] - 1), a = arm(t), f = new THREE.Mesh(fg, mat), len = R[3]((t - R[1]) / (R[2] - R[1] || 1));
f.scale.set(1, len, 1);
f.position.set(a.x, a.y, R[4]);
f.rotation.z = 0.05 + t * 0.95;
g.add(f);
}
});
g.scale.set(sd * 0.9, 0.9, 0.9);
return g;
},
function () {
return SP_LIVE.ytex || (SP_LIVE.ytex = (function () {
var cv = document.createElement("canvas");
cv.width = 256;
cv.height = 256;
var x = cv.getContext("2d");
var g = x.createLinearGradient(0, 256, 256, 0);
["#9AF0FF", "#C8A8FF", "#FFB8E8", "#FFF0A8", "#A8FFD0"].forEach(function (c, i) { g.addColorStop(i / 4, c); });
x.fillStyle = g;
x.fillRect(0, 0, 256, 256);
x.strokeStyle = "rgba(255,255,255,0.85)";
x.lineWidth = 2.5;
for (var i = 0; i < 7; i++) {
x.beginPath();
x.moveTo(0, 256);
x.quadraticCurveTo(60 + i * 20, 200 - i * 14, 40 + i * 32, 0 + i * 12);
x.stroke();
}
x.lineWidth = 1;
x.strokeStyle = "rgba(255,255,255,0.5)";
for (var j = 0; j < 40; j++) {
var a = j * 0.61, r = 40 + j * 5;
x.beginPath();
x.arc(0, 256, r, -Math.PI / 2 + 0.05, -0.05);
x.stroke();
}
return new THREE.CanvasTexture(cv);
})());
},
function (sd) {
var g = new THREE.Group(), mat = new THREE.MeshBasicMaterial({ map: spFairyTex(), transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
function lobe(w, h, rot, y) {
var sh = new THREE.Shape();
sh.moveTo(0, 0);
sh.bezierCurveTo(w * 0.3, h * 0.9, w * 1.1, h * 1.05, w, h * 0.55);
sh.bezierCurveTo(w * 0.95, h * 0.15, w * 0.4, 0, 0, 0);
var geo = new THREE.ShapeGeometry(sh, 16), uv = geo.attributes.uv, ps = geo.attributes.position;
for (var i = 0; i < uv.count; i++)
uv.setXY(i, ps.getX(i) / w, ps.getY(i) / h);
var m = new THREE.Mesh(geo, mat);
m.rotation.z = rot;
m.position.y = y;
var rim = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: false, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false }));
rim.scale.setScalar(1.02);
rim.rotation.z = rot;
rim.position.y = y;
g.add(rim);
g.add(m);
}
lobe(0.62, 0.7, 0.05, 0.02);
lobe(0.42, 0.42, -1.35, 0.0);
g.scale.set(sd, 1, 1);
return g;
},
function (col) {
var g = new THREE.Group(), pts = [[0, 0.95, -0.12], [0, 0.7, -0.42], [0.08, 0.32, -0.72], [0.22, 0.08, -1.02], [0.42, 0.04, -1.3]];
var m = new THREE.Mesh(spHornGeo(pts, 0.11, 28), spMat(col, { r: 0.6 }));
g.add(m);
var curve = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); })), sm = spMat(shade(col, -0.35), { r: 0.5 });
for (var i = 1; i < 9; i++) {
var t = i / 10, p = curve.getPointAt(t), s = new THREE.Mesh(new THREE.ConeGeometry(0.03 * (1 - t) + 0.01, 0.1 * (1 - t) + 0.04, 4), sm);
s.position.copy(p);
s.position.y += 0.1 * (1 - t) + 0.01;
g.add(s);
}
return g;
},
function (col) {
var g = new THREE.Group(), pts = [[0, 0.92, -0.12], [0, 0.62, -0.38], [-0.12, 0.32, -0.5], [0.04, 0.12, -0.68], [0.2, 0.3, -0.86]];
g.add(new THREE.Mesh(spHornGeo(pts, 0.024, 24), spMat(col, { r: 0.6 })));
var sh = new THREE.Shape();
sh.moveTo(0, 0.1);
sh.bezierCurveTo(0.09, 0.02, 0.07, -0.06, 0, -0.02);
sh.bezierCurveTo(-0.07, -0.06, -0.09, 0.02, 0, 0.1);
var sp = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.012, bevelEnabled: false }), spMat(shade(col, -0.15), { r: 0.5 }));
sp.position.set(0.2, 0.31, -0.86);
sp.rotation.set(-0.6, 0.4, Math.PI);
g.add(sp);
return g;
},
function (g, spec, o, sp) {
var body = g.children[0], L = lookOf(spec), hy = g.userData.csHy || 1.72, skin = L.skin != null ? L.skin : 0xC89878, grp = new THREE.Group(), live = { g: g, wings: [], tail: null, kind: sp, seed: hdfHash ? hdfHash(spec.id) % 100 / 100 : Math.random() };
grp.name = "race features";
grp.userData.spFeat = 1;
var back = new THREE.Group();
back.name = "race wings and tail";
back.userData.spFeat = 1;
live.head = grp;
live.back = back;
if (sp === "elf")
[-1, 1].forEach(function (sd) { grp.add(spEar(sd, 0.14, 0.045, skin, hy)); });
if (sp === "fairy" || sp === "halfling")
[-1, 1].forEach(function (sd) { grp.add(spEar(sd, 0.1, 0.04, skin, hy)); });
if (sp === "gnome")
[-1, 1].forEach(function (sd) { grp.add(spEar(sd, 0.12, 0.05, skin, hy, 0.1)); });
if (sp === "goblin")
[-1, 1].forEach(function (sd) { var e = spEar(sd, 0.24, 0.11, skin, hy, 0.35); e.position.y -= 0.02; grp.add(e); });
if (sp === "tiefling") {
var hm = spMat(0x2A1A22, { r: 0.35, m: 0.1 });
[-1, 1].forEach(function (sd) { var h = new THREE.Mesh(spHornGeo([[0, 0, 0], [sd * 0.04, 0.07, -0.04], [sd * 0.1, 0.09, -0.11], [sd * 0.14, 0.03, -0.16], [sd * 0.145, -0.05, -0.12], [sd * 0.125, -0.07, -0.05], [sd * 0.11, -0.04, 0.0]], 0.04, 30), hm); h.position.set(sd * 0.075, hy + 0.08, 0.0); grp.add(h); });
}
if (sp === "dragonborn") {
var dm = spMat(0xE8DCC0, { r: 0.45 });
[-1, 1].forEach(function (sd) {
var h1 = new THREE.Mesh(spHornGeo([[0, 0, 0], [sd * 0.035, 0.06, -0.08], [sd * 0.07, 0.1, -0.22], [sd * 0.1, 0.13, -0.38]], 0.045), dm);
h1.position.set(sd * 0.065, hy + 0.09, -0.03);
grp.add(h1);
var h2 = new THREE.Mesh(spHornGeo([[0, 0, 0], [sd * 0.04, 0.02, -0.06], [sd * 0.07, 0.03, -0.14]], 0.018), dm);
h2.position.set(sd * 0.1, hy + 0.05, -0.02);
grp.add(h2);
});
var cm = spMat(shade(skin, -0.3), { r: 0.5 });
for (var c = 0; c < 6; c++) {
var sp1 = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.07 - c * 0.006, 4), cm);
sp1.position.set(0, hy + 0.07 - c * 0.05, -0.11 - c * 0.015);
sp1.rotation.x = -0.9;
grp.add(sp1);
}
}
if (sp === "orc" || sp === "goblin") {
var tm = spMat(0xEFE6D0, { r: 0.4 }), sz = sp === "orc" ? 1 : 0.6;
[-1, 1].forEach(function (sd) { var t = new THREE.Mesh(spHornGeo([[0, 0, 0], [sd * 0.004, 0.03 * sz, 0.012], [sd * 0.012, 0.055 * sz, 0.004]], 0.012 * sz, 10), tm); t.position.set(sd * 0.034, hy - 0.15, 0.1); grp.add(t); });
}
if (sp === "angel") {
var halo = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.014, 10, 40), new THREE.MeshBasicMaterial({ color: 0xFFE8A0 }));
halo.rotation.x = Math.PI / 2;
halo.position.set(0, hy + 0.26, -0.02);
grp.add(halo);
var hg = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.045, 8, 40), new THREE.MeshBasicMaterial({ color: 0xFFE8A0, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending }));
hg.rotation.x = Math.PI / 2;
hg.position.copy(halo.position);
grp.add(hg);
live.halo = halo;
}
var wk = sp === "dragonborn" ? "dragon" : sp === "angel" ? "feather" : sp === "fairy" ? "fairy" : null;
if (wk)
[-1, 1].forEach(function (sd) {
var w = wk === "dragon" ? spDragonWing(sd, skin) : wk === "feather" ? spFeatherWing(sd, 0xFFFFFF) : spFairyWing(sd);
var piv = new THREE.Group();
piv.position.set(sd * 0.07, wk === "fairy" ? 1.36 : 1.4, -0.17);
piv.rotation.y = sd * (wk === "fairy" ? -0.5 : -0.42);
piv.rotation.z = wk === "feather" ? sd * 0.05 : 0;
piv.add(w);
piv.userData.sd = sd;
back.add(piv);
live.wings.push(piv);
});
if (sp === "dragonborn") {
live.tail = spDragonTail(skin);
back.add(live.tail);
}
if (sp === "tiefling") {
live.tail = spDevilTail(shade(skin, -0.2));
back.add(live.tail);
}
[grp, back].forEach(function (G) { G.traverse(function (m) { if (m.isMesh) {
m.castShadow = true;
m.raycast = function () { };
} }); body.add(G); });
live.wk = wk;
SP_LIVE.push(live);
},
function (E) {
for (var i = 0; i < SP_LIVE.length; i++) {
var live = SP_LIVE[i];
if (live.g !== E.g || !live.seated)
continue;
var body = E.g.children[0];
live.seated = false;
if (!body || !live.save)
return;
body.add(live.head);
live.head.position.copy(live.save.hp);
live.head.quaternion.copy(live.save.hq);
live.head.scale.copy(live.save.hs);
body.add(live.back);
live.back.position.copy(live.save.bp);
live.back.quaternion.copy(live.save.bq);
live.back.scale.copy(live.save.bs);
}
}
];
});
