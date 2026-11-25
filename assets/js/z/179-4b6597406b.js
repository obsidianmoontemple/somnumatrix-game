/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(179, function () {
"use strict";
return [
function (lines, fg, bg, w, h) {
var c = document.createElement("canvas");
c.width = w || 512;
c.height = h || 128;
var x = c.getContext("2d");
x.fillStyle = bg;
x.fillRect(0, 0, c.width, c.height);
x.fillStyle = fg;
x.textAlign = "center";
x.textBaseline = "middle";
lines.forEach(function (L, i) {
var sz = i ? Math.round(c.height * 0.2) : Math.round(c.height * 0.36);
x.font = (i ? "400 " : "700 ") + sz + "px Georgia, serif";
var y = lines.length === 1 ? c.height / 2 : (i ? c.height * 0.74 : c.height * 0.36);
x.fillText(String(L).slice(0, 40), c.width / 2, y, c.width - 24);
});
var t = new THREE.CanvasTexture(c);
t.anisotropy = 4;
return t;
},
function () {
if (TS.arc)
return;
var A = TS_ARC, G = new THREE.Group();
G.position.set(A.cx, 0, A.cz);
function M(c, o) { var m = new THREE.MeshLambertMaterial({ color: c }); if (o && o.e != null) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
} if (o && o.ds)
m.side = THREE.DoubleSide; return m; }
function box(w, h, d, m, x, y, z, p) { var b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); (p || G).add(b); b.receiveShadow = true; return b; }
var L = A.L, W = A.W;
var fl = new THREE.Mesh(new THREE.PlaneGeometry(L, W), new THREE.MeshLambertMaterial({ map: (function () { var c = document.createElement("canvas"); c.width = c.height = 64; var x = c.getContext("2d"); x.fillStyle = "#E8E0D0"; x.fillRect(0, 0, 64, 64); x.fillStyle = "#3A3A44"; x.fillRect(0, 0, 32, 32); x.fillRect(32, 32, 32, 32); var t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(L / 4, W / 4); return t; })() }));
fl.rotation.x = -Math.PI / 2;
fl.position.y = 0.02;
G.add(fl);
box(L - 8, 0.03, 4, M(0x7E1E2A), 0, 0.04, 0);
var vault = new THREE.Mesh(new THREE.CylinderGeometry(W / 2, W / 2, L, 32, 1, true, 0, Math.PI), new THREE.MeshLambertMaterial({ color: 0xBFD8EE, transparent: true, opacity: 0.2, side: THREE.DoubleSide, depthWrite: false }));
vault.rotation.z = Math.PI / 2;
vault.rotation.y = Math.PI / 2;
vault.rotation.order = "YZX";
vault.position.y = 12;
G.add(vault);
for (var r = 0; r <= 12; r++) {
var rib = new THREE.Mesh(new THREE.TorusGeometry(W / 2, 0.12, 6, 24, Math.PI), M(0x2E3238));
rib.position.set(-L / 2 + r * L / 12, 12, 0);
rib.rotation.y = Math.PI / 2;
G.add(rib);
}
box(L, 12, 0.6, M(0xD8D0C2), 0, 6, -W / 2);
box(L, 12, 0.6, M(0xD8D0C2), 0, 6, W / 2);
box(0.6, 24, W, M(0xD8D0C2), -L / 2, 6, 0);
box(0.6, 24, W, M(0xD8D0C2), L / 2, 6, 0);
box(6, 7, 0.4, M(0x2A2420), -L / 2 + 0.4, 3.5, 0).rotation.y = Math.PI / 2;
var back = new THREE.Mesh(new THREE.PlaneGeometry(7, 1.4), new THREE.MeshBasicMaterial({ map: tsTex(["← The World Mall"], "#F4EEDC", "#24335E", 512, 96) }));
back.position.set(-L / 2 + 0.7, 8, 0);
back.rotation.y = Math.PI / 2;
G.add(back);
var name = new THREE.Mesh(new THREE.PlaneGeometry(16, 2.6), new THREE.MeshBasicMaterial({ map: tsTex(["The Grand Arcade", "Picture houses, banks and the Pixel Palace"], "#F4E6C0", "#2A1A12", 768, 128) }));
name.position.set(L / 2 - 0.7, 9, 0);
name.rotation.y = -Math.PI / 2;
G.add(name);
for (var l = 0; l < 6; l++) {
var x = -L / 2 + 12 + l * 22;
box(0.16, 4.2, 0.16, M(0x2E3238), x, 2.1, 3.6);
var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 8), new THREE.MeshBasicMaterial({ color: 0xFFF0C8 }));
lamp.position.set(x, 4.4, 3.6);
G.add(lamp);
box(0.16, 4.2, 0.16, M(0x2E3238), x, 2.1, -3.6);
var lamp2 = lamp.clone();
lamp2.position.z = -3.6;
G.add(lamp2);
if (l % 2) {
box(2.6, 0.15, 0.8, M(0x6A4A30), x, 0.6, 6.2);
box(1.6, 0.9, 1.6, M(0xB8935A), x + 5, 0.45, 0);
var pt = new THREE.Mesh(new THREE.SphereGeometry(1.5, 10, 8), M(0x3E7A3A));
pt.position.set(x + 5, 2.2, 0);
pt.scale.y = 1.2;
G.add(pt);
}
}
var hl = new THREE.HemisphereLight(0xFFF6E6, 0x5A5048, 0.6);
hl.position.set(0, 30, 0);
G.add(hl);
TS.units = [];
for (var u = 0; u < 8; u++) {
var kind = u < 4 ? "cinema" : "bank", slot = (u % 4) + 1, side = u < 4 ? -1 : 1, ux = -L / 2 + 20 + (slot - 1) * 31;
var g = new THREE.Group();
g.position.set(ux, 0, side * (W / 2 - 0.4));
g.rotation.y = side < 0 ? 0 : Math.PI;
G.add(g);
TS.units.push({ kind: kind, slot: slot, g: g, x: A.cx + ux, z: A.cz + side * (W / 2 - 3.2), wx: A.cx + ux, wz: A.cz + side * (W / 2 - 0.4), ry: side < 0 ? 0 : Math.PI, key: null });
}
tsPalace(G);
scene.add(G);
G.visible = false;
TS.arc = G;
tsApplyArcade();
},
function (G) {
if (typeof ARC_GAMES === "undefined")
return;
var A = TS_ARC, x0 = A.L / 2 - 44, P = new THREE.Group();
P.position.set(x0, 0, 0);
G.add(P);
function M(c, e, ei) { var m = new THREE.MeshLambertMaterial({ color: c }); if (e != null) {
m.emissive = new THREE.Color(e);
m.emissiveIntensity = ei || 1;
} return m; }
function box(w, h, d, m, x, y, z, p) { var b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); (p || P).add(b); return b; }
var cv = document.createElement("canvas");
cv.width = cv.height = 128;
var cx = cv.getContext("2d");
cx.fillStyle = "#140A2A";
cx.fillRect(0, 0, 128, 128);
for (var i = 0; i < 40; i++) {
cx.fillStyle = ["#F4F", "#4FF", "#FF4", "#4F4"][i % 4];
cx.fillRect(Math.random() * 128, Math.random() * 128, 2 + Math.random() * 3, 2);
}
var ct = new THREE.CanvasTexture(cv);
ct.wrapS = ct.wrapT = THREE.RepeatWrapping;
ct.repeat.set(10, 8);
var fl = new THREE.Mesh(new THREE.PlaneGeometry(42, A.W - 1), new THREE.MeshLambertMaterial({ map: ct }));
fl.rotation.x = -Math.PI / 2;
fl.position.set(22, 0.05, 0);
P.add(fl);
[[-A.W / 2 + 0.7], [A.W / 2 - 0.7]].forEach(function (q) { box(42, 0.25, 0.15, new THREE.MeshBasicMaterial({ color: 0xFF40E0 }), 22, 9.4, q[0]); box(42, 0.25, 0.15, new THREE.MeshBasicMaterial({ color: 0x40E8FF }), 22, 8.8, q[0]); });
var sg = new THREE.Mesh(new THREE.PlaneGeometry(16, 3), new THREE.MeshBasicMaterial({ map: tsTex(["PIXEL PALACE", "old-school arcade games · free to play"], "#FF60F0", "#120820", 768, 144) }));
sg.position.set(-0.2, 9.6, 0);
sg.rotation.y = -Math.PI / 2;
P.add(sg);
box(0.3, 4, A.W - 14, M(0x2A1A40), -0.2, 9.6, 0).visible = false;
var pl = new THREE.PointLight(0xC080FF, 1.1, 60, 1.4);
pl.position.set(22, 7, 0);
P.add(pl);
TS.cabs = [];
var spots = [];
for (var r = 0; r < 7; r++)
spots.push([6 + r * 5.2, -4.2, 0]);
for (var r2 = 0; r2 < 7; r2++)
spots.push([6 + r2 * 5.2, 4.2, Math.PI]);
for (var r3 = 0; r3 < 6; r3++)
spots.push([8 + r3 * 5.6, -A.W / 2 + 2.2, Math.PI]);
for (var r4 = 0; r4 < 6; r4++)
spots.push([8 + r4 * 5.6, A.W / 2 - 2.2, 0]);
var cols = [0xC02040, 0x2050C0, 0x20A050, 0xC08020, 0x8030C0, 0x208090, 0xB04090];
spots.forEach(function (q, i) {
var id = ARC_ORDER[i % ARC_ORDER.length], g = ARC_GAMES[id], c = new THREE.Group();
c.position.set(q[0], 0, q[1]);
c.rotation.y = q[2];
P.add(c);
var body = M(cols[i % cols.length]);
box(1.6, 2.1, 1.1, body, 0, 1.05, 0, c);
box(1.6, 0.5, 0.8, body, 0, 2.35, -0.15, c);
box(1.5, 0.12, 0.55, M(0x141414), 0, 1.2, 0.75, c).rotation.x = -0.2;
var st = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.18, 6), M(0x141414));
st.position.set(-0.35, 1.35, 0.78, c);
c.add(st);
var ball = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), new THREE.MeshBasicMaterial({ color: 0xE02020 }));
ball.position.set(-0.35, 1.45, 0.78);
c.add(ball);
[0.1, 0.3, 0.5].forEach(function (bx, k) { var bt = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.04, 10), new THREE.MeshBasicMaterial({ color: [0xF0E040, 0x40C0F0, 0xF04080][k] })); bt.position.set(bx, 1.29, 0.8); c.add(bt); });
var scr = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.9), new THREE.MeshBasicMaterial({ map: arcAttract(id) }));
scr.position.set(0, 1.75, 0.56);
scr.rotation.x = -0.12;
c.add(scr);
var mq = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.4), new THREE.MeshBasicMaterial({ map: tsTex([g.name.toUpperCase()], g.col, "#111", 512, 128) }));
mq.position.set(0, 2.42, 0.26);
c.add(mq);
var wx = A.cx + x0 + q[0] + Math.sin(q[2]) * 1.4, wz = A.cz + q[1] + Math.cos(q[2]) * 1.4;
TS.cabs.push({ id: id, x: wx, z: wz, mx: A.cx + x0 + q[0], mz: A.cz + q[1], g: scr });
});
box(6, 1.1, 1.2, M(0x3A2A5A), 3, 0.55, A.W / 2 - 3);
var pr = new THREE.Mesh(new THREE.PlaneGeometry(6, 1), new THREE.MeshBasicMaterial({ map: tsTex(["HIGH SCORES", "your best on this device"], "#FFE060", "#1A0A2A", 512, 96) }));
pr.position.set(3, 2.6, A.W / 2 - 2.8);
pr.rotation.y = Math.PI;
P.add(pr);
},
function (U, s) {
var g = U.g;
while (g.children.length)
g.remove(g.children[0]);
var open = !!(s && s.open), name = open ? String(s.name) : "", cin = U.kind === "cinema";
function M(c, e, ei) { var m = new THREE.MeshLambertMaterial({ color: c }); if (e != null) {
m.emissive = new THREE.Color(e);
m.emissiveIntensity = ei || 1;
} return m; }
function box(w, h, d, m, x, y, z) { var b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); g.add(b); return b; }
var face = cin ? (open ? 0x7A2E2E : 0x3A2A2A) : (open ? 0xE4DCCC : 0x6A665E);
box(24, 11, 0.6, M(face), 0, 5.5, 0.3);
if (cin) {
box(16, 0.8, 3, M(open ? 0x2A2622 : 0x1A1818), 0, 4.6, 1.8);
box(16.2, 0.9, 0.3, M(open ? 0xF4E6C0 : 0x4A4440, open ? 0xF4E6C0 : null, open ? 0.6 : 0), 0, 5.1, 3.2);
if (open)
for (var b = 0; b < 18; b++) {
var bl = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), new THREE.MeshBasicMaterial({ color: 0xFFD27A }));
bl.position.set(-7.6 + b * 0.9, 4.55, 3.35);
g.add(bl);
}
box(1.4, 7, 0.5, M(open ? 0xFFC040 : 0x4A4038, open ? 0xFFC040 : null, 0.8), -9.6, 7.6, 0.9);
}
else {
for (var c = 0; c < 4; c++) {
var col = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 7.5, 12), M(open ? 0xF4F0E8 : 0x8A867E));
col.position.set(-6 + c * 4, 3.75, 1.2);
g.add(col);
}
box(18, 1.2, 2.4, M(open ? 0xF4F0E8 : 0x8A867E), 0, 8.1, 1.2);
var ped = new THREE.Mesh(new THREE.CylinderGeometry(0, 10, 2.2, 3, 1), M(open ? 0xF4F0E8 : 0x8A867E));
ped.rotation.z = 0;
ped.rotation.y = Math.PI / 2;
ped.scale.set(1, 1, 0.12);
ped.position.set(0, 9.8, 1.2);
g.add(ped);
}
if (open) {
box(4.4, 3.2, 0.2, new THREE.MeshBasicMaterial({ color: 0xFFE6A8 }), 0, 1.6, 0.65);
box(5, 0.3, 0.3, M(0xC9A040), 0, 3.35, 0.7);
}
else {
box(5, 3.4, 0.25, M(0x55585E), 0, 1.7, 0.7);
for (var sl = 0; sl < 10; sl++)
box(5, 0.05, 0.3, M(0x3A3C40), 0, 0.2 + sl * 0.33, 0.75);
}
var sg = new THREE.Mesh(new THREE.PlaneGeometry(12, 1.9), new THREE.MeshBasicMaterial({ map: open ? tsTex([name, cin ? "Picture House" : "Bank"], cin ? "#FFF0C8" : "#24335E", cin ? "#2A1A12" : "#F4F0E8", 768, 128) :
tsTex(["Space reserved", (cin ? "for a picture house" : "for a bank") + " · the Tower"], "#C8C0B0", "#2A2A2E", 768, 128) }));
sg.position.set(0, cin ? 9.3 : 6.2, cin ? 0.65 : 2.45);
g.add(sg);
if (open) {
var pl = new THREE.PointLight(cin ? 0xFFC888 : 0xFFF0D8, 0.9, 22, 1.5);
pl.position.set(0, 5, 5);
g.add(pl);
}
},
function () {
tsArcBuild();
tsLoad(true);
TS.arcOn = true;
TS.arc.visible = true;
if (MALL.g)
MALL.g.visible = false;
camera.position.set(TS_ARC.cx - TS_ARC.L / 2 + 5, 1.72, TS_ARC.cz);
yaw = -Math.PI / 2;
pitch = 0;
setStatus("<b>The Grand Arcade.</b> The World Mall's picture houses and banks. A dark front is a space the Tower has yet to grant; a lit one is open. The way back to the hall is at the west end.");
},
function () {
if (!MALL.g || MALL.g.userData.tsArch)
return;
MALL.g.userData.tsArch = 1;
var x = MALL.A - 4.5, g = new THREE.Group();
g.position.set(x, 0, 0);
g.rotation.y = -Math.PI / 2;
MALL.g.add(g);
var sh = new THREE.Shape();
sh.moveTo(-2.6, 0);
sh.lineTo(2.6, 0);
sh.lineTo(2.6, 3.2);
sh.absarc(0, 3.2, 2.6, 0, Math.PI, false);
sh.lineTo(-2.6, 0);
var glow = new THREE.Mesh(new THREE.ShapeGeometry(sh, 20), new THREE.MeshBasicMaterial({ color: 0xFFE6B0 }));
glow.position.set(0, 0, 0.05);
g.add(glow);
var gold = new THREE.MeshLambertMaterial({ color: 0xC9A868 });
var arch = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.3, 8, 24, Math.PI), gold);
arch.position.set(0, 3.2, 0.2);
g.add(arch);
[-1, 1].forEach(function (s) {
var p = new THREE.Mesh(new THREE.BoxGeometry(0.8, 3.2, 0.8), gold);
p.position.set(s * 2.95, 1.6, 0.2);
g.add(p);
var cap = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 9), new THREE.MeshBasicMaterial({ color: 0xFFF0C8 }));
cap.position.set(s * 2.95, 3.5, 0.5);
g.add(cap);
});
var sg = new THREE.Mesh(new THREE.PlaneGeometry(7.6, 1.0), new THREE.MeshBasicMaterial({ map: tsTex(["The Grand Arcade", "cinemas · banks · Pixel Palace games"], "#F4E6C0", "#2A1A12", 768, 128) }));
sg.position.set(0, 6.6, 0.3);
g.add(sg);
}
];
});
