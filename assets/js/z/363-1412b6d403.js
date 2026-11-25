/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(363, function () {
return [
function (x, W, H) {
shnNoiseFill(x, W, H, "#6A665E", 70, 2600, 3);
x.strokeStyle = "rgba(20,18,16,.55)";
x.lineWidth = 2;
for (var row = 0; row < 8; row++) {
var y = row * H / 8, off = (row % 2) * W / 8;
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
for (var c = 0; c < 5; c++) {
var cx = off + c * W / 4;
x.beginPath();
x.moveTo(cx, y);
x.lineTo(cx, y + H / 8);
x.stroke();
}
}
x.fillStyle = "rgba(40,70,30,.25)";
for (var m = 0; m < 40; m++)
x.fillRect((m * 53) % W, (m * 97) % H, 6, 3);
},
function (x, W, H) {
shnNoiseFill(x, W, H, "#5A2E24", 60, 1800, 5);
x.strokeStyle = "rgba(30,26,22,.8)";
x.lineWidth = 3;
for (var row = 0; row < 16; row++) {
var y = row * H / 16, off = (row % 2) * W / 16;
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
for (var c = 0; c < 9; c++) {
var cx = off + c * W / 8;
x.beginPath();
x.moveTo(cx, y);
x.lineTo(cx, y + H / 16);
x.stroke();
}
}
x.fillStyle = "rgba(10,20,10,.35)";
x.fillRect(0, H * 0.82, W, H * 0.18);
},
function (x, W, H) {
x.fillStyle = "#3A2618";
x.fillRect(0, 0, W, H);
var r = wRand(11);
for (var i = 0; i < 8; i++) {
var y = i * H / 8, c = 40 + Math.round(r() * 24);
x.fillStyle = "rgb(" + (c + 18) + "," + (c) + "," + (c - 14) + ")";
x.fillRect(0, y + 1, W, H / 8 - 2);
x.strokeStyle = "rgba(0,0,0,.25)";
for (var g = 0; g < 6; g++) {
x.beginPath();
x.moveTo(0, y + 4 + g * 7);
x.bezierCurveTo(W / 3, y + 2 + g * 7 + r() * 4, W * 2 / 3, y + 6 + g * 7, W, y + 4 + g * 7);
x.stroke();
}
x.fillStyle = "rgba(0,0,0,.6)";
x.fillRect((r() * W) | 0, y, 3, H / 8);
}
},
function (x, W, H) {
x.fillStyle = "#1A1A1C";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
x.fillStyle = (i + j) % 2 ? "#2A2826" : "#B8B2A6";
x.fillRect(i * W / 4, j * H / 4, W / 4, H / 4);
}
x.strokeStyle = "rgba(120,110,100,.35)";
var r = wRand(19);
for (var v = 0; v < 14; v++) {
x.beginPath();
x.moveTo(r() * W, r() * H);
x.quadraticCurveTo(r() * W, r() * H, r() * W, r() * H);
x.stroke();
}
x.fillStyle = "rgba(0,0,0,.25)";
x.fillRect(0, 0, W, H);
},
function (x, W, H) {
x.fillStyle = "#2A1A12";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#140C08";
x.lineWidth = 6;
for (var i = 0; i < 2; i++)
for (var j = 0; j < 2; j++)
x.strokeRect(i * W / 2 + 14, j * H / 2 + 14, W / 2 - 28, H / 2 - 28);
x.strokeStyle = "rgba(200,150,90,.18)";
x.lineWidth = 2;
for (i = 0; i < 2; i++)
for (j = 0; j < 2; j++)
x.strokeRect(i * W / 2 + 20, j * H / 2 + 20, W / 2 - 40, H / 2 - 40);
},
function (x, W, H) {
x.fillStyle = "#3A2E2A";
x.fillRect(0, 0, W, H);
x.fillStyle = "#4A3A34";
for (var i = 0; i < 8; i++)
x.fillRect(i * W / 8, 0, W / 16, H);
x.fillStyle = "rgba(140,110,80,.35)";
for (var j = 0; j < 6; j++)
for (i = 0; i < 4; i++) {
x.beginPath();
x.arc(i * W / 4 + W / 8, j * H / 6 + H / 12, 9, 0, 7);
x.fill();
}
x.fillStyle = "rgba(0,0,0,.35)";
for (i = 0; i < 12; i++)
x.fillRect((i * 41) % W, (i * 73) % H, 30, 60);
},
function (x, W, H) {
x.fillStyle = "#B8A040";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#7A6A20";
x.lineWidth = 5;
for (var i = -2; i < 6; i++) {
x.beginPath();
x.moveTo(i * W / 4, 0);
for (var y = 0; y <= H; y += 16)
x.lineTo(i * W / 4 + Math.sin(y / 22 + i) * 30, y);
x.stroke();
}
x.fillStyle = "rgba(90,70,10,.5)";
for (i = 0; i < 20; i++) {
x.beginPath();
x.arc((i * 61) % W, (i * 113) % H, 6 + (i % 4) * 3, 0, 7);
x.fill();
}
},
function (x, W, H) {
x.fillStyle = "#6A7A8A";
x.fillRect(0, 0, W, H);
x.fillStyle = "#7E8E9C";
for (var i = 0; i < 8; i++)
x.fillRect(i * W / 8, 0, W / 16, H);
x.font = "bold 40px Georgia";
x.fillStyle = "rgba(240,230,210,.35)";
["A", "B", "C", "D"].forEach(function (l, i) { x.fillText(l, 30 + i * 120, H * 0.82); });
x.fillStyle = "rgba(0,0,0,.3)";
x.fillRect(0, 0, W, H);
},
function (x, W, H) {
x.fillStyle = "#17130F";
x.fillRect(0, 0, W, H);
var r = wRand(41), row, i, y;
for (row = 0; row < 8; row++) {
y = row * H / 8 + H / 16;
if (row % 3 === 1) {
for (i = 0; i < 8; i++) {
var cx = i * W / 8 + W / 16 + (r() - 0.5) * 4, sh = 150 + r() * 40 | 0;
x.fillStyle = "rgb(" + sh + "," + (sh - 12) + "," + (sh - 40) + ")";
x.beginPath();
x.ellipse(cx, y, 12, 13, 0, 0, 7);
x.fill();
x.fillStyle = "#0C0A08";
x.beginPath();
x.ellipse(cx - 5, y - 1, 3.6, 4.4, 0, 0, 7);
x.ellipse(cx + 5, y - 1, 3.6, 4.4, 0, 0, 7);
x.fill();
x.fillRect(cx - 1, y + 4, 2, 3);
x.fillStyle = "rgba(0,0,0,.35)";
x.fillRect(cx - 7, y + 9, 14, 3);
}
}
else {
for (i = 0; i < 22; i++) {
var bx = i * W / 22 + W / 44 + (r() - 0.5) * 3, by = y + (r() - 0.5) * 6, s2 = 120 + r() * 50 | 0;
x.fillStyle = "rgb(" + s2 + "," + (s2 - 10) + "," + (s2 - 35) + ")";
x.beginPath();
x.arc(bx - 2, by, 4.2, 0, 7);
x.arc(bx + 2, by + 1, 4.2, 0, 7);
x.fill();
x.fillStyle = "rgba(0,0,0,.4)";
x.beginPath();
x.arc(bx, by + 2, 1.6, 0, 7);
x.fill();
}
}
}
x.fillStyle = "rgba(0,0,0,.25)";
for (i = 0; i < 500; i++)
x.fillRect(r() * W, r() * H, 2, 2);
},
function (x, W, H) {
x.fillStyle = "#1E120C";
x.fillRect(0, 0, W, H);
var cols = ["#5A1A1A", "#1A2A4A", "#2A4A2A", "#5A4A1A", "#3A1A4A", "#6A5A4A", "#2A2A2A"], r = wRand(43);
for (var row = 0; row < 6; row++) {
var y = row * H / 6, px = 0;
while (px < W) {
var bw = 8 + r() * 14, bh = H / 6 - 10 - r() * 14;
x.fillStyle = cols[(r() * cols.length) | 0];
x.fillRect(px, y + H / 6 - 6 - bh, bw - 1, bh);
x.fillStyle = "rgba(200,160,80,.5)";
x.fillRect(px + 2, y + H / 6 - bh + 4, bw - 5, 2);
px += bw;
}
x.fillStyle = "#3A2416";
x.fillRect(0, y + H / 6 - 6, W, 6);
}
},
function (x, W, H) { x.fillStyle = "#24262A"; x.fillRect(0, 0, W, H); x.strokeStyle = "#121316"; x.lineWidth = 2; for (var row = 0; row < 10; row++) {
var y = row * H / 10;
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y);
x.stroke();
for (var c = 0; c < 8; c++) {
var cx = (row % 2) * W / 16 + c * W / 8;
x.beginPath();
x.moveTo(cx, y);
x.lineTo(cx, y + H / 10);
x.stroke();
}
} },
function (col, o) {
o = o || {};
var key = "l" + col + "|" + (o.map || "") + "|" + (o.e || "") + "|" + (o.rx || 1) + "|" + (o.ry || 1) + "|" + (o.ds ? 1 : 0);
return shnM(key, function () { var m = new THREE.MeshLambertMaterial({ color: col }); if (o.map)
m.map = shnT(o.map, o.rx, o.ry); if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
} if (o.ds)
m.side = THREE.DoubleSide; return m; });
},
function (dt) {
SHN.lights.forEach(function (F) {
if (!F.L.parent || F.dead)
return;
F.ph += dt;
var p = F.ph;
var w = 0.82 + 0.1 * Math.sin(p * 7.3) + 0.06 * Math.sin(p * 11.1 + 1.3) + 0.05 * Math.sin(p * 3.1 + F.k);
F.L.intensity = (F.out ? 0 : F.k) * w * (F.dim === undefined ? 1 : F.dim);
});
SHN.flames.forEach(function (f) { f.ph += dt; var s = 1 + 0.12 * Math.sin(f.ph * 9.1) + 0.08 * Math.sin(f.ph * 5.7); f.m.scale.set(f.s * (2 - s) * 0.5 + f.s * 0.5, f.s * s, f.s * (2 - s) * 0.5 + f.s * 0.5); f.m.visible = !f.out; });
},
function (g, x, y, z, s, carved, col) {
s = s || 1;
var p = new THREE.Mesh(new THREE.SphereGeometry(0.5 * s, 14, 10), shnPh(col || 0xE86A10, 20));
p.scale.y = 0.72;
p.position.set(x, y + 0.36 * s, z);
g.add(p);
var pos = p.geometry.attributes.position;
for (var i = 0; i < pos.count; i++) {
var vx = pos.getX(i), vz = pos.getZ(i), a = Math.atan2(vz, vx), k = 1 - 0.07 * Math.pow(Math.abs(Math.cos(a * 4)), 0.5);
pos.setX(i, vx * k);
pos.setZ(i, vz * k);
}
p.geometry.computeVertexNormals();
wCyl(0.04 * s, 0.06 * s, 0.18 * s, shnLam(0x3A5A1A), x, y + 0.78 * s, z, g, 6);
if (carved) {
var m = shnGlowM(0xFFC040);
[-0.17, 0.17].forEach(function (o) { var e = wCone(0.08 * s, 0.1 * s, m, x + o * s, y + 0.46 * s, z + 0.42 * s, g, 3); e.rotation.x = Math.PI / 2; });
wBox(0.34 * s, 0.07 * s, 0.04, m, x, y + 0.24 * s, z + 0.44 * s, g);
}
return p;
},
function (g, x, y, z, s, big) {
var logM = shnLam(0x2A1A10, { map: "bark" });
for (var i = 0; i < (big ? 14 : 6); i++) {
var a = i / (big ? 14 : 6) * Math.PI * 2, L = wCyl(0.12 * s, 0.16 * s, 2.6 * s, logM, x + Math.cos(a) * 0.5 * s, y + 0.9 * s, z + Math.sin(a) * 0.5 * s, g, 6);
L.rotation.z = Math.cos(a) * 0.55;
L.rotation.x = -Math.sin(a) * 0.55;
}
var cols = [0xFF4A10, 0xFF8A20, 0xFFC040];
for (var j = 0; j < (big ? 9 : 4); j++) {
var c = cols[j % 3], fl = wCone((0.7 - j * 0.04) * s, (2.2 + (j % 3) * 0.8) * s, new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }), x + (j % 3 - 1) * 0.3 * s, y + (1.4 + (j % 3) * 0.3) * s, z + ((j >> 1) % 3 - 1) * 0.3 * s, g, 8);
SHN.flames.push({ m: fl, s: 1, ph: j * 1.7 });
}
var gl = wGlow(0xFF8A30, (big ? 18 : 6) * s, 0.55);
gl.position.set(x, y + 2 * s, z);
g.add(gl);
var light = shnFlameLight(0xFF8A40, big ? 3.2 : 1.6, big ? 90 : 24, x, y + 3 * s, z, g, big);
SHN.fx.push({ k: "embers", x: x, y: y + 1.5 * s, z: z, s: s, t: 0, list: [] });
return light;
},
function (g, x, z, rot, y, seed) {
var c = new THREE.Group();
c.position.set(x, y, z);
c.rotation.y = rot;
g.add(c);
var w = 9 + (seed % 3), d = 6;
wBox(w, 3.2, d, shnLam(0xFFFFFF, { map: "whitewash", rx: 2, ry: 1 }), 0, 1.6, 0, c);
var roof = new THREE.Mesh(new THREE.CylinderGeometry(0.01, d * 0.78, w + 0.8, 3, 1, false), shnLam(0xFFFFFF, { map: "thatch", rx: 3, ry: 2 }));
roof.rotation.z = Math.PI / 2;
roof.rotation.y = 0;
roof.scale.set(1, 1, 0.8);
roof.position.set(0, 4.2, 0);
c.add(roof);
wBox(0.9, 1.4, 0.8, shnLam(0x8A8070, { map: "stone" }), w * 0.32, 5.0, 0, c);
wBox(1.1, 2.1, 0.12, shnLam(0x2A3A2A), 0, 1.05, d / 2 + 0.02, c);
[-w * 0.3, w * 0.3].forEach(function (o) { wBox(1.0, 0.9, 0.1, shnGlowM(0xC8601A), o, 1.9, d / 2 + 0.01, c); shnTurnip(c, o, 1.45, d / 2 + 0.12, 1.1); });
wBox(0.12, 2.1, 1.1, shnLam(0x2A3A2A), w / 2 + 0.02, 1.05, 0, c);
wBox(0.16, 0.08, 1.2, shnLam(0x1A2A1A), w / 2 + 0.04, 1.1, 0, c);
shnSolid(x, z, w + 0.4, d + 0.4, -2, 6, rot);
if (typeof evbWorldDoor === "function") {
var D = seed < SHN_DOORS.length ? SHN_DOORS[seed] : null;
evbWorldDoor(SHN_KEY, x, z, rot + Math.PI / 2, w / 2, "cottageie", D ? D.n + "'s cottage" : "A cottage", { doors: "the half door at the gable", y: y });
}
return c;
},
function (g, x, z, y, s, seed) {
var r = wRand(seed || 1), m = shnLam(0x1C1612, { map: "bark" }), t = new THREE.Group();
t.position.set(x, y, z);
g.add(t);
var trunk = wCyl(0.18 * s, 0.42 * s, 6 * s, m, 0, 3 * s, 0, t, 6);
trunk.rotation.z = (r() - 0.5) * 0.15;
for (var i = 0; i < (SHN.lite ? 4 : 7); i++) {
var b = wCyl(0.04 * s, 0.12 * s, (2.4 + r() * 2.2) * s, m, 0, 0, 0, t, 4), a = r() * Math.PI * 2, up = 0.5 + r() * 0.7;
b.position.set(Math.cos(a) * 0.8 * s, (3.5 + r() * 2.5) * s, Math.sin(a) * 0.8 * s);
b.rotation.z = Math.cos(a) * up;
b.rotation.x = -Math.sin(a) * up;
}
if (SHN.lite)
shnSolid(x, z, 0.8 * s, 0.8 * s, -2, 8 * s);
else
shnSolid(x, z, 0.8 * s, 0.8 * s, -2, 8 * s);
return t;
},
function (g, x, z, y, rot, seed) {
var r = wRand(seed), m = shnLam(0x8A8A82, { map: "stone" }), kind = seed % 3, s;
if (kind === 0) {
s = wBox(0.7, 1.1, 0.16, m, x, y + 0.5, z, g);
var top = wCyl(0.35, 0.35, 0.16, m, x, y + 1.05, z, g, 10);
top.rotation.x = Math.PI / 2;
top.rotation.z = rot;
}
else if (kind === 1) {
s = wBox(0.16, 1.4, 0.16, m, x, y + 0.7, z, g);
wBox(0.8, 0.16, 0.16, m, x, y + 1.05, z, g).rotation.y = rot;
}
else
s = wBox(0.9, 0.7, 0.2, m, x, y + 0.35, z, g);
s.rotation.y = rot;
s.rotation.z = (r() - 0.5) * 0.2;
return s;
},
function (x, z) {
var A = SHN_AT, h = wFbm(x * 0.006 + 40, z * 0.006 + 40, 5, 3) * 5 - 2;
h += A.hill.h * shnSmooth(Math.hypot(x - A.hill.x, z - A.hill.z), A.hill.r);
h += A.manor.h * shnSmooth(Math.hypot(x - A.manor.x, z - A.manor.z), A.manor.r);
var edge = Math.max(0, Math.hypot(x / 880, (z + 140) / 720) - 0.9);
h += edge * edge * 900;
var g = shnSmooth(Math.hypot(x, z), 110);
h = h * (1 - g) + 0.2 * g;
var ph = shnSmooth(Math.hypot(x - A.hollow.x, z - A.hollow.z), A.hollow.r + 40);
h = h * (1 - ph) + 0.4 * ph;
var bd = shnPathD(x, z, A.brook);
if (bd < 10)
h -= 2.6 * shnSmooth(bd, 10);
var my = shnSmooth(Math.hypot(x - A.manor.x, z - A.manor.z), 60);
h = h * (1 - my) + (A.manor.h - 1.5) * my;
var hy = shnSmooth(Math.hypot(x - A.hill.x, z - A.hill.z), 30);
h = h * (1 - hy) + (A.hill.h - 1) * hy;
return h;
},
function (G) {
var n = SHN.lite ? 150 : 260, S = 1900, oz = -140, A = SHN_AT;
var m = new THREE.MeshLambertMaterial({ map: shnT("grass", 220, 220), vertexColors: true });
var mesh = wGround(S, n, function (x, z) {
var wz = z + oz, h = shnLand(x, wz), c = 0x5A6A48;
var ph = Math.hypot(x - A.hollow.x, wz - A.hollow.z);
if (ph < A.hollow.r + 20)
c = ph < A.hollow.r - 30 ? 0x6ACB3A : 0x5AA84A;
if (shnPathD(x, wz, SHN_ROAD) < 4 || shnPathD(x, wz, [[0, 0], [-150, -150], [-300, -240]]) < 3 || shnPathD(x, wz, [[0, 0], [10, -300], [20, -500]]) < 3.5 || shnPathD(x, wz, [[0, 0], [200, -120], [200, -205]]) < 3 || shnPathD(x, wz, [[0, 0], [250, 60], [330, 110]]) < 3)
c = 0x6A5A44;
if (Math.hypot(x, wz) < 64)
c = 0x4A6A3A;
if (shnPathD(x, wz, A.brook) < 6)
c = 0x2A3A3A;
return [h, c];
}, m);
mesh.position.z = oz;
G.add(mesh);
var wm = new THREE.MeshPhongMaterial({ color: 0x10202A, shininess: 90, specular: 0x8090B0, transparent: true, opacity: 0.85 });
for (var i = 0; i < A.brook.length - 1; i++) {
var a = A.brook[i], b = A.brook[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
var w = new THREE.Mesh(new THREE.PlaneGeometry(L + 8, 11), wm);
w.rotation.x = -Math.PI / 2;
w.rotation.z = -Math.atan2(b[1] - a[1], b[0] - a[0]);
w.position.set((a[0] + b[0]) / 2, -1.4, (a[1] + b[1]) / 2);
G.add(w);
}
},
function (dt) {
var z = SHN.zone, R = SHN.room, base;
if (z === "inside")
base = R && R.kids ? SHN_ENV.kids : SHN_ENV.house;
else if (z === "manor")
base = SHN_ENV.manor;
else if (z === "hollow")
base = SHN_ENV.hollow;
else
base = SHN_ENV.night;
var E = {};
for (var k in base)
E[k] = base[k];
var f = SHN.storm.f || 0;
if (f > 0 && (z === "manor" || (z === "inside" && R && !R.kids && R.windows))) {
E.hemi += f * (z === "inside" ? 1.4 : 1.8);
E.sun += f * 1.2;
E.hemiCol = 0xC8D8FF;
E.fog = z === "inside" ? 0x10141C : 0x404A60;
}
if (z === "inside" && R && R.dark)
E.hemi *= R.dark;
return E;
},
function (dt) {
var S = SHN.storm, z = SHN.zone, R = SHN.room, near = z === "manor" || (z === "inside" && R && !R.kids);
S.t -= dt;
if (S.t <= 0) {
if (!near)
S.t = 3;
else if (S.n === 1) {
S.f = Math.max(S.f, 0.55);
S.n = 0;
S.t = 7 + Math.random() * 12;
}
else {
S.f = 1;
S.n = Math.random() < 0.4 ? 1 : 0;
S.t = S.n ? 0.8 : 7 + Math.random() * 12;
shnSfx("thunder", { delay: 0.5 + Math.random() * 2 });
if (SHN.onStrike)
try {
SHN.onStrike();
}
catch (e) { }
}
}
if (S.f > 0)
S.f = Math.max(0, S.f - dt * 1.6);
if (SHN.skyFlash)
SHN.skyFlash.material.opacity = Math.min(0.85, S.f * 0.9);
},
function (G) {
var moon = new THREE.Mesh(new THREE.SphereGeometry(40, 24, 16), new THREE.MeshBasicMaterial({ color: 0xF2EEDA, fog: false }));
moon.position.set(-1400, 900, -2400);
G.add(moon);
var halo = wGlow(0xC8D0F0, 420, 0.35);
halo.position.copy(moon.position);
G.add(halo);
var soft = shnTex("cloudlid", 256, 256, function (x, W, H) {
var r = wRand(77), i;
x.fillStyle = "#000";
x.fillRect(0, 0, W, H);
for (i = 0; i < 70; i++) {
var a = r() * 6.283, d = r() * W * 0.3, cx = W / 2 + Math.cos(a) * d, cy = H / 2 + Math.sin(a) * d, rr = 20 + r() * 40, gr = x.createRadialGradient(cx, cy, 0, cx, cy, rr);
gr.addColorStop(0, "rgba(255,255,255,.35)");
gr.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = gr;
x.fillRect(cx - rr, cy - rr, rr * 2, rr * 2);
}
});
var cl = new THREE.Mesh(new THREE.CircleGeometry(520, 40), new THREE.MeshBasicMaterial({ color: 0x0A0C10, transparent: true, opacity: 0.9, alphaMap: soft, side: THREE.DoubleSide, depthWrite: false }));
cl.rotation.x = Math.PI / 2;
cl.position.set(SHN_AT.manor.x, 260, SHN_AT.manor.z);
G.add(cl);
var fl = new THREE.Mesh(new THREE.CircleGeometry(500, 40), new THREE.MeshBasicMaterial({ color: 0xC8D8FF, transparent: true, opacity: 0, alphaMap: soft, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
fl.rotation.x = Math.PI / 2;
fl.position.set(SHN_AT.manor.x, 255, SHN_AT.manor.z);
G.add(fl);
SHN.skyFlash = fl;
var mist = wPoints(SHN.lite ? 220 : 600, function (i) { var r = wRand(900 + i), a = r() * 6.283, d = r() * 780; return [Math.cos(a) * d, shnLand(Math.cos(a) * d, Math.sin(a) * d - 140) + 1 + r() * 3, Math.sin(a) * d - 140]; }, 0x8A90A8, 18, true);
mist.material.opacity = 0.12;
mist.material.map = (typeof dotTexture === "function") ? dotTexture() : null;
G.add(mist);
},
function (G) {
var g = new THREE.Group();
G.add(g);
SHN.districts.push({ g: g, x: 0, z: 0, r: 120 });
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2 + 0.3, r = 88, x = Math.cos(a) * r, z = Math.sin(a) * r, rot = Math.atan2(-x, -z);
if (Math.abs(x) < 10 && z < 0)
continue;
shnCottage(g, x, z, rot, shnLand(x, z), i);
if (i < SHN_DOORS.length) {
(function (D, x, z, rot, i) {
var fx = x + Math.sin(rot) * 4.4, fz = z + Math.cos(rot) * 4.4;
shnSpot(fx, fz, 2.4, D.n + "'s door", "knock and say your rhyme", function () { shnGuise(i); });
})(SHN_DOORS[i], x, z, rot, i);
}
}
shnFire(g, 0, 0.2, 0, 0.8, false);
shnFlameLight(0xFF9A50, 1.2, 40, 0, 3, 0, g, true);
var stall = function (x, z, rot, name, col) {
var s = new THREE.Group();
s.position.set(x, shnLand(x, z), z);
s.rotation.y = rot;
g.add(s);
var wood = shnLam(0x4A3420, { map: "boards" });
[-1.6, 1.6].forEach(function (o) { wBox(0.15, 2.6, 0.15, wood, o, 1.3, -1, s); wBox(0.15, 2.6, 0.15, wood, o, 1.3, 1, s); });
wBox(3.6, 1, 2.2, wood, 0, 0.5, 0, s);
var roof = wBox(3.9, 0.12, 2.8, shnLam(col), 0, 2.65, 0, s);
roof.rotation.x = 0.18;
shnTurnip(s, -1.2, 1, 0.9, 0.9);
shnTurnip(s, 1.2, 1, 0.9, 0.9);
shnSolid(x, z, 3.8, 2.4, -2, 3, rot);
return s;
};
stall(-24, -18, 0.6, "", 0x6A1A1A);
stall(24, -18, -0.6, "", 0x1A3A5A);
stall(-30, 10, 1.4, "", 0x3A5A1A);
stall(30, 10, -1.4, "", 0x5A3A6A);
var bx = -12, bz = 16, by = shnLand(bx, bz);
wCyl(0.8, 0.7, 1.1, shnLam(0x5A3A1E, { map: "boards" }), bx, by + 0.55, bz, g, 14);
var wtr = wCyl(0.74, 0.74, 0.04, shnPh(0x203040, 90), bx, by + 1.0, bz, g, 14);
for (var ap = 0; ap < 6; ap++)
wSph(0.09, shnPh(0xB0201A, 40), bx + Math.cos(ap) * 0.4, by + 1.05, bz + Math.sin(ap) * 0.4, g, 8);
shnSolid(bx, bz, 1.6, 1.6, -2, 1.2);
shnSpot(bx, bz, 2.4, "The apple barrel", "bob for an apple", function () { shnBobStart(); });
var nx = 12, nz = 16, ny = shnLand(nx, nz);
wCyl(0.7, 0.8, 0.4, shnLam(0x6A6A62, { map: "stone" }), nx, ny + 0.2, nz, g, 10);
shnFire(g, nx, ny + 0.3, nz, 0.3, false);
shnSpot(nx, nz, 2.4, "The nut fire", "put two hazelnuts to the coals", function () { shnNuts(); });
var who = [["Bride Malone", -6, 30], ["a guiser in a straw mask", 14, -26], ["a guiser in a white sheet", -20, -30], ["Tadhg the smith", 26, 22], ["a girl with a turnip lantern", -30, 26]];
who.forEach(function (w, i) {
var P = shnPerson(i + 1, w[1], w[2], shnLand(w[1], w[2]), { title: i === 3 ? "smith" : "villager" });
P.wander = { r: 6, sp: 0.7 };
SHN.talk.push({ p: P, r: 3, name: w[0], t: { name: w[0], persona: "A villager of Hollowmere on Samhain night, 1820s Ireland: talks of the fire on the Hill of Tlachtga, guising, soul cakes, the Dumb Supper, the Dullahan who rides the road from the mill, and Ravensmoor House up the hill that no one goes near. Speaks plainly, warmly, a little afraid.", greet: "Samhain night, the night the door between the worlds stands open. Mind yourself." } });
});
var sg = wSign(["HOLLOWMERE", "on Samhain night · the fire on the hill · the house above"], 5, 1.1, "#1A120C", "#E8C890");
sg.position.set(0, 2.6, 58);
sg.rotation.y = Math.PI;
g.add(sg);
wBox(0.15, 2.2, 0.15, shnLam(0x3A2A1A), -2.3, 1.1, 58.1, g);
wBox(0.15, 2.2, 0.15, shnLam(0x3A2A1A), 2.3, 1.1, 58.1, g);
},
function (G) {
var A = SHN_AT.hill, y = shnLand(A.x, A.z), g = new THREE.Group();
G.add(g);
SHN.districts.push({ g: g, x: A.x, z: A.z, r: 80, far: 1 });
[16, 22, 28].forEach(function (r) { var t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.9, 6, 48), shnLam(0x3A4A2A)); t.rotation.x = Math.PI / 2; t.scale.z = 0.45; t.position.set(A.x, y - 0.05, A.z); g.add(t); });
shnFire(g, A.x, y, A.z, 2.6, true);
for (var s = 0; s < 9; s++) {
var a = s / 9 * Math.PI * 2, x = A.x + Math.cos(a) * 11, z = A.z + Math.sin(a) * 11;
var st = wBox(1, 3.4, 0.6, shnLam(0x7A786E, { map: "stone" }), x, y + 1.7, z, g);
st.rotation.y = -a;
shnSolid(x, z, 1.2, 1.2, -2, 4);
}
shnSolid(A.x, A.z, 5, 5, -2, 6);
var K = shnPerson(40, A.x + 6, A.z + 5, y, { title: "priest" });
SHN.talk.push({ p: K, r: 3.4, name: "The fire keeper", fn: function () { shnFireKeeper(); } });
shnSpot(A.x + 3.5, A.z + 3.5, 3.5, "The Samhain fire", "light your turnip lantern from it", function () { shnLightLantern(); });
},
function (G) {
var C = SHN_AT.church, y = shnLand(C.x, C.z), g = new THREE.Group();
g.position.set(C.x, y, C.z);
g.rotation.y = 0.4;
G.add(g);
SHN.districts.push({ g: g, x: C.x, z: C.z, r: 60 });
var st = shnLam(0xFFFFFF, { map: "stone", rx: 4, ry: 2 });
wBox(12, 8, 24, st, 0, 4, 0, g);
var roof = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 8.6, 24.6, 3), shnLam(0xFFFFFF, { map: "slate", rx: 4, ry: 3 }));
roof.rotation.x = Math.PI / 2;
roof.rotation.y = Math.PI / 2;
roof.scale.set(1, 1, 0.55);
roof.position.set(0, 10.2, 0);
g.add(roof);
wBox(6, 18, 6, st, 0, 9, 14, g);
wCone(4.6, 7, shnLam(0xFFFFFF, { map: "slate" }), 0, 21.5, 14, g, 4).rotation.y = Math.PI / 4;
for (var w = 0; w < 4; w++) {
wBox(0.1, 3, 1.4, shnGlowM(0x3A2A50), 6.02, 4, -8 + w * 5, g);
wBox(0.1, 3, 1.4, shnGlowM(0x3A2A50), -6.02, 4, -8 + w * 5, g);
}
wBox(1.8, 3.2, 0.14, shnLam(0x2A1E14, { map: "boards" }), 0, 1.6, 17.04, g);
shnSolid(C.x, C.z, 20, 28, -2, 20, 0.4);
if (typeof evbWorldDoor === "function")
evbWorldDoor(SHN_KEY, C.x, C.z, 0.4, 17, "oldchurchie", "The old church", { doors: "the tower door", y: y });
for (var i = 0; i < (SHN.lite ? 16 : 34); i++) {
var r = wRand(300 + i), gx = C.x - 28 + r() * 56, gz = C.z - 36 + r() * 20;
if (Math.hypot(gx - C.x, gz - C.z) < 16)
continue;
shnGrave(G, gx, gz, shnLand(gx, gz), r() * 0.4 - 0.2, i);
}
[[-26, -24], [30, -30], [-34, 4]].forEach(function (p, i) { shnDeadTree(G, C.x + p[0], C.z + p[1], shnLand(C.x + p[0], C.z + p[1]), 1.1, 70 + i); });
var B = SHN_AT.bridge, by = 0.6, wood = shnLam(0x4A3420, { map: "boards" }), br = new THREE.Group();
br.position.set(B.x, by, B.z);
br.rotation.y = -0.5;
G.add(br);
wBox(4, 0.3, 16, wood, 0, 0, 0, br);
[-1.9, 1.9].forEach(function (o) { wBox(0.15, 1.1, 16, wood, o, 0.6, 0, br); });
shnFloor(B.x, B.z, 12, 12, by + 0.15);
},
function (G) {
var M = SHN_AT.mill, y = shnLand(M.x, M.z), g = new THREE.Group();
g.position.set(M.x, y, M.z);
g.rotation.y = -0.6;
G.add(g);
SHN.districts.push({ g: g, x: M.x, z: M.z, r: 50 });
wBox(10, 7, 9, shnLam(0xFFFFFF, { map: "stone", rx: 3, ry: 2 }), 0, 3.5, 0, g);
var roof = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 7, 10.6, 3), shnLam(0xFFFFFF, { map: "thatch", rx: 3, ry: 2 }));
roof.rotation.z = Math.PI / 2;
roof.scale.set(1, 1, 0.75);
roof.position.set(0, 9, 0);
g.add(roof);
var wheel = new THREE.Group();
wheel.position.set(5.6, 3.6, 0);
wheel.userData.keep = 1;
g.add(wheel);
var wd = shnLam(0x3A2818, { map: "boards" });
var rim = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.25, 6, 24), wd);
rim.rotation.y = Math.PI / 2;
wheel.add(rim);
for (var s = 0; s < 12; s++) {
var sp = wBox(0.25, 6.8, 0.6, wd, 0, 0, 0, wheel);
sp.rotation.x = s / 12 * Math.PI;
}
SHN.fx.push({ k: "spinx", m: wheel, sp: 0.4 });
shnSolid(M.x, M.z, 12, 11, -2, 9, -0.6);
wBox(1.4, 2.4, 0.12, shnLam(0x3A2818, { map: "boards" }), 3, 1.2, 4.52, g);
if (typeof evbWorldDoor === "function")
evbWorldDoor(SHN_KEY, M.x, M.z, -0.6, 4.5, "oldmillie", "The old mill", { lx: 3, doors: "the mill door", y: y });
shnSpot(M.x - 6, M.z + 6, 4, "The old mill", "start the ride to the church bridge (the Headless Horseman rides tonight)", function () { shnRideStart(); });
var sg = wSign(["THE DULLAHAN'S ROAD", "from the old mill to the church bridge · he cannot cross the water"], 5, 1.1, "#140C08", "#E8C890");
sg.position.set(M.x - 8, y + 2.5, M.z + 8);
sg.rotation.y = -0.9;
G.add(sg);
var o = SHN_ROAD[3];
shnDeadTree(G, o[0] + 8, o[1] - 6, shnLand(o[0] + 8, o[1] - 6), 2.2, 91);
for (var t = 0; t < (SHN.lite ? 14 : 30); t++) {
var r = wRand(500 + t), i = (r() * (SHN_ROAD.length - 1)) | 0, a = SHN_ROAD[i], b = SHN_ROAD[i + 1], u = r(), px = a[0] + (b[0] - a[0]) * u, pz = a[1] + (b[1] - a[1]) * u, side = r() < 0.5 ? -1 : 1, off = 12 + r() * 30;
var nx = -(b[1] - a[1]), nz = b[0] - a[0], nl = Math.hypot(nx, nz) || 1;
px += nx / nl * off * side;
pz += nz / nl * off * side;
shnDeadTree(G, px, pz, shnLand(px, pz), 0.8 + r() * 0.8, 600 + t);
}
},
function (G) {
var A = SHN_AT.manor, y = A.h - 1.5, g = new THREE.Group();
g.position.set(A.x, y, A.z);
G.add(g);
SHN.districts.push({ g: g, x: A.x, z: A.z, r: 140, far: 1 });
var st = shnLam(0x6A6660, { map: "stone", rx: 6, ry: 3 }), sl = shnLam(0xFFFFFF, { map: "slate", rx: 6, ry: 3 }), dark = shnGlowM(0x06080C), trim = shnLam(0x2A2622);
wBox(46, 20, 20, st, 0, 10, 0, g);
wBox(14, 16, 30, st, -28, 8, -4, g);
wBox(14, 16, 30, st, 28, 8, -4, g);
function gable(x, z, w, d, h, yy, rot) { var r = new THREE.Mesh(new THREE.CylinderGeometry(0.01, d * 0.75, w + 1, 3), sl); r.rotation.z = Math.PI / 2; r.scale.set(1, 1, h / (d * 0.75)); r.position.set(x, yy, z); r.rotation.y = rot || 0; g.add(r); return r; }
gable(0, 0, 46, 20, 9, 23.5);
gable(-28, -4, 30, 14, 8, 19.5, Math.PI / 2);
gable(28, -4, 30, 14, 8, 19.5, Math.PI / 2);
[[-16, 0], [-6, 0], [8, 0], [18, 0], [-30, -14], [30, -14]].forEach(function (c) { wBox(2, 8, 2, st, c[0], 27, c[1], g); wBox(2.4, 0.5, 2.4, trim, c[0], 31.2, c[1], g); });
wCyl(6, 6.4, 34, st, 23, 17, 12, g, 20);
var cap = wCone(7.2, 12, sl, 23, 40, 12, g, 20);
wBox(4, 4, 0.3, dark, 23, 30, 18.1, g);
SHN.bellOut = { x: A.x + 23, z: A.z + 12, y: y + 30 };
var lit = shnGlowM(0x6A2A10), attic = shnGlowM(0xC8A060);
for (var row = 0; row < 3; row++)
for (var i = 0; i < 9; i++) {
var x = -20 + i * 5, yy = 4 + row * 6, m = (row === 1 && (i === 2 || i === 7)) ? lit : dark;
wBox(1.8, 3.6, 0.2, m, x, yy, 10.05, g);
wBox(2.4, 0.35, 0.5, trim, x, yy - 2, 10.2, g);
wBox(2.4, 0.4, 0.5, trim, x, yy + 2, 10.2, g);
}
wBox(2.2, 2.2, 0.3, attic, 0, 22, 8.2, g);
var fig = new THREE.Group();
fig.position.set(0, 21.3, 8.1);
g.add(fig);
fig.userData.keep = 1;
wBox(0.7, 1.6, 0.05, shnGlowM(0x0A0A0A), 0, 0, 0, fig);
wSph(0.3, shnGlowM(0x0A0A0A), 0, 1.0, 0, fig, 8);
fig.visible = false;
SHN.atticFig = fig;
wBox(14, 0.8, 6, st, 0, 0.4, 13, g);
[-5.5, -2, 2, 5.5].forEach(function (o) { wCyl(0.6, 0.7, 8, st, o, 4.6, 15, g, 10); });
wBox(14, 1, 6.4, st, 0, 9, 13, g);
var door = wBox(3.6, 6, 0.3, shnLam(0x1A0E08, { map: "boards" }), 0, 3.8, 10.2, g);
shnTurnip(g, -2.6, 0.8, 15.4, 1.5, 0xFF5A10);
shnTurnip(g, 2.6, 0.8, 15.4, 1.5, 0xFF5A10);
shnFlameLight(0xFF6A30, 1.2, 26, 0, 3, 15, g, true);
shnSolid(A.x, A.z - 2, 74, 36, -2, 40);
shnSolid(A.x + 23, A.z + 12, 13, 13, -2, 40);
shnFloor(A.x, A.z + 13, 14, 6, y + 0.8);
shnSpot(A.x, A.z + 14.5, 3.4, "Ravensmoor House", "go in (13 and up: it is very frightening)", function () { shnHouseAsk(); }, y + 0.8);
var sg = wSign(["RAVENSMOOR", "thirteen rooms · enter at your own risk"], 4.4, 1, "#0A0606", "#C8B080");
sg.position.set(A.x, y + 2.4, A.z + 40);
sg.rotation.y = Math.PI;
G.add(sg);
var iron = shnPh(0x141414, 40);
for (var f = -30; f <= 30; f += 1.2) {
if (Math.abs(f) < 3)
continue;
wBox(0.06, 2.2, 0.06, iron, A.x + f, y + 1.1, A.z + 36, G);
wCone(0.07, 0.25, iron, A.x + f, y + 2.3, A.z + 36, G, 4);
}
wBox(60, 0.08, 0.08, iron, A.x, y + 2.0, A.z + 36, G);
wBox(60, 0.08, 0.08, iron, A.x, y + 0.4, A.z + 36, G);
shnSolid(A.x - 16.5, A.z + 36, 27, 0.4, -2, 3);
shnSolid(A.x + 16.5, A.z + 36, 27, 0.4, -2, 3);
for (var t = 0; t < (SHN.lite ? 6 : 12); t++) {
var r = wRand(800 + t), tx = A.x - 50 + r() * 100, tz = A.z + 22 + r() * 30;
if (Math.abs(tx - A.x) < 8)
continue;
shnDeadTree(G, tx, tz, shnLand(tx, tz), 1.2 + r() * 0.8, 820 + t);
}
for (var tb = 0; tb < 6; tb++) {
var tx2 = A.x - 48 + tb * 4, tz2 = A.z + 26;
var tomb = wBox(2.4, 2.2, 3.4, shnLam(0x5A5852, { map: "stone" }), tx2, shnLand(tx2, tz2) + 1.1, tz2, G);
shnSolid(tx2, tz2, 2.6, 3.6, -2, 3);
}
var crows = new THREE.Group();
crows.position.set(A.x + 23, y + 44, A.z + 12);
G.add(crows);
for (var c = 0; c < (SHN.lite ? 5 : 10); c++) {
var bird = new THREE.Group();
var wing = wBox(1.1, 0.05, 0.3, shnGlowM(0x050505), 0, 0, 0, bird);
wBox(0.2, 0.2, 0.5, shnGlowM(0x050505), 0, 0, 0, bird);
bird.userData = { a: c / 10 * 6.28, r: 10 + c % 4 * 4, h: (c % 3) * 3, w: wing };
crows.add(bird);
}
SHN.fx.push({ k: "crows", g: crows });
SHN.onStrike = function () { if (SHN.atticFig) {
SHN.atticFig.visible = true;
SHN.figT = 0.9;
} };
},
function (G) {
var H = SHN_HOLLOW, g = new THREE.Group();
G.add(g);
SHN.districts.push({ g: g, x: SHN_AT.hollow.x, z: SHN_AT.hollow.z, r: 200 });
var cols = [0xFF6A00, 0x9A2AE8, 0x2AE84A, 0xFFD21A, 0xFF3A9A, 0x1AB8FF];
for (var i = 0; i < (SHN.lite ? 18 : 40); i++) {
var r = wRand(1000 + i), a = r() * 6.283, d = 30 + r() * 120, x = SHN_AT.hollow.x + Math.cos(a) * d, z = SHN_AT.hollow.z + Math.sin(a) * d;
if (Math.hypot(x - H.house.x, z - H.house.z) < 20 || Math.hypot(x - H.tent.x, z - H.tent.z) < 26 || (Math.abs(x - H.maze.x - 16) < 22 && Math.abs(z - H.maze.z - 16) < 22))
continue;
var s = 1 + r() * 3;
shnPumpkin(g, x, 0.4, z, s, r() < 0.5, r() < 0.15 ? 0xFFFFFF : undefined);
shnSolid(x, z, s * 0.9, s * 0.9, -2, s);
}
for (var p = 0; p < (SHN.lite ? 8 : 16); p++) {
var pa = p / 16 * 6.283, px = SHN_AT.hollow.x + Math.cos(pa) * 70, pz = SHN_AT.hollow.z + Math.sin(pa) * 70;
var pole = wCyl(0.12, 0.12, 4, shnLam(cols[p % 6]), px, 2.4, pz, g, 8);
var bulb = wSph(0.35, shnGlowM(cols[(p + 2) % 6]), px, 4.6, pz, g, 10);
}
var hg = new THREE.Group();
hg.position.set(H.house.x, 0.4, H.house.z);
hg.rotation.y = -Math.PI / 2;
g.add(hg);
var b1 = wBox(14, 8, 12, shnLam(0x8A2AD8), 0, 4, 0, hg);
b1.rotation.z = 0.04;
var b2 = wBox(10, 6, 9, shnLam(0xA84AF0), 1, 10.5, 0, hg);
b2.rotation.z = -0.07;
var r1 = wCone(9, 6, shnLam(0x2AE84A), 1.5, 16, 0, hg, 4);
r1.rotation.y = Math.PI / 4;
r1.rotation.z = 0.12;
wBox(2.4, 4, 0.3, shnLam(0x2AE84A), 0, 2, 6.1, hg);
wSph(0.25, shnGlowM(0xFFD21A), 0.8, 2, 6.3, hg, 8);
[[-4.5, 5], [4.5, 5], [-3, 10.5], [3.5, 10.8]].forEach(function (w) { wBox(2, 2, 0.2, shnGlowM(0xFFE84A), w[0], w[1], 6.05, hg); });
shnSolid(H.house.x, H.house.z, 13, 15, -2, 16);
shnSpot(H.house.x - 7, H.house.z, 3.2, "The Giggling House", "go in and find the five friendly ghosts", function () { shnEnterRoom("giggle"); });
var sg = wSign(["THE GIGGLING HOUSE", "five friendly ghosts are hiding · can you find them?"], 5, 1.2, "#6A1AB8", "#FFE84A");
sg.position.set(H.house.x - 10, 3, H.house.z + 6);
sg.rotation.y = -Math.PI / 2;
g.add(sg);
var tg = new THREE.Group();
tg.position.set(H.tent.x, 0.4, H.tent.z);
g.add(tg);
for (var s2 = 0; s2 < 16; s2++) {
var seg = new THREE.Mesh(new THREE.CylinderGeometry(18, 18, 9, 2, 1, true, s2 / 16 * Math.PI * 2, Math.PI * 2 / 16), shnLam(s2 % 2 ? 0xFF6A00 : 0x7A1AD8, { ds: true }));
seg.position.y = 4.5;
tg.add(seg);
var top = new THREE.Mesh(new THREE.ConeGeometry(19, 10, 2, 1, true, s2 / 16 * Math.PI * 2, Math.PI * 2 / 16), shnLam(s2 % 2 ? 0x7A1AD8 : 0xFF6A00, { ds: true }));
top.position.y = 14;
tg.add(top);
}
wCyl(0.3, 0.3, 6, shnLam(0xFFD21A), 0, 21, 0, tg, 8);
var fl = wBox(2.4, 1.4, 0.05, shnLam(0x2AE84A, { ds: true }), 1.3, 23, 0, tg);
wBox(5, 5, 0.3, shnGlowM(0xFFE84A), 0, 2.5, 18.05, tg);
shnSolid(H.tent.x, H.tent.z, 36, 36, -2, 20);
shnSpot(H.tent.x, H.tent.z + 20, 3.6, "The Pumpkin Playhouse", "go in (soft play and the theatre)", function () { shnEnterRoom("playhouse"); });
var sg2 = wSign(["THE PUMPKIN PLAYHOUSE", "soft play · slides · the ball pit · the theatre"], 5.4, 1.2, "#FF6A00", "#2A0A4A");
sg2.position.set(H.tent.x, 6.6, H.tent.z + 19);
g.add(sg2);
shnMazeBuild(g);
SHN_SWEETS.forEach(function (S, i) {
var c = cols[i % 6], sw = new THREE.Group();
sw.position.set(S[0], 1.4, S[1]);
g.add(sw);
sw.userData.keep = 1;
var body = wSph(0.55, shnPh(c, 80), 0, 0, 0, sw, 12);
body.scale.x = 1.4;
[-1, 1].forEach(function (k) { var tw = wCone(0.35, 0.5, shnPh(cols[(i + 3) % 6], 60), k * 0.95, 0, 0, sw, 8); tw.rotation.z = -k * Math.PI / 2; });
SHN.sweets[i] = { g: sw, got: false };
SHN.fx.push({ k: "spin", m: sw, sp: 1.2, y: 1 });
shnSpot(S[0], S[1], 2.2, "A giant sweet", "pick it up", function () { shnSweet(i); });
});
var ct = new THREE.Group();
ct.position.set(H.carve.x, 0.4, H.carve.z);
g.add(ct);
wBox(4, 0.2, 2, shnLam(0xFF3A9A), 0, 1, 0, ct);
[-1.8, 1.8].forEach(function (o) { wBox(0.2, 1, 1.8, shnLam(0x1AB8FF), o, 0.5, 0, ct); });
shnPumpkin(ct, -0.8, 1.1, 0, 0.9, false);
shnPumpkin(ct, 0.9, 1.1, 0, 0.8, true);
shnSolid(H.carve.x, H.carve.z, 4.2, 2.2, -2, 1.2);
shnSpot(H.carve.x, H.carve.z + 2, 2.6, "The carving table", "carve a pumpkin", function () { shnCarve(); });
var P = shnPerson(60, H.carve.x + 3, H.carve.z + 1, 0.4, { title: "villager" });
SHN.talk.push({ p: P, r: 3, name: "Pumpkin Polly", t: { name: "Pumpkin Polly", persona: "The cheerful keeper of Pumpkin Hollow, for children: tells about the candy trail (13 sweets), the hay maze and its corn dolly, carving pumpkins, the five friendly ghosts in the Giggling House and the films in the Pumpkin Playhouse. Kind, bright, never scary. Explains that long ago in Ireland people carved turnips, and pumpkins came later in America.", greet: "Welcome to Pumpkin Hollow! Nothing here bites, I promise." } });
},
function (g) {
var M = SHN_HOLLOW.maze, n = M.n, c = M.c, r = wRand(4242), seen = {}, walls = {};
for (var i = 0; i <= n; i++)
for (var j = 0; j <= n; j++) {
walls["h" + i + "_" + j] = 1;
walls["v" + i + "_" + j] = 1;
}
var stack = [[0, 0]];
seen["0_0"] = 1;
while (stack.length) {
var cur = stack[stack.length - 1], x = cur[0], z = cur[1], nb = [];
[[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) { var nx = x + d[0], nz = z + d[1]; if (nx >= 0 && nz >= 0 && nx < n && nz < n && !seen[nx + "_" + nz])
nb.push([nx, nz, d]); });
if (!nb.length) {
stack.pop();
continue;
}
var pick = nb[(r() * nb.length) | 0], d = pick[2];
if (d[0] === 1)
delete walls["v" + (x + 1) + "_" + z];
if (d[0] === -1)
delete walls["v" + x + "_" + z];
if (d[1] === 1)
delete walls["h" + x + "_" + (z + 1)];
if (d[1] === -1)
delete walls["h" + x + "_" + z];
seen[pick[0] + "_" + pick[1]] = 1;
stack.push([pick[0], pick[1]]);
}
delete walls["v0_0"];
var list = [];
Object.keys(walls).forEach(function (k) {
var t = k[0], p = k.slice(1).split("_"), a = +p[0], b = +p[1];
if (t === "h" && a < n)
list.push([M.x + a * c + c / 2, M.z + b * c, c + 0.6, 1.2]);
if (t === "v" && b < n)
list.push([M.x + a * c, M.z + b * c + c / 2, 1.2, c + 0.6]);
});
var geo = new THREE.BoxGeometry(1, 1.8, 1), inst = new THREE.InstancedMesh(geo, shnLam(0xFFFFFF, { map: "thatch" }), list.length), o = new THREE.Object3D();
list.forEach(function (L, i) { o.position.set(L[0], 1.3, L[1]); o.scale.set(L[2], 1, L[3]); o.updateMatrix(); inst.setMatrixAt(i, o.matrix); shnSolid(L[0], L[1], L[2], L[3], -2, 2.2); });
inst.userData.noCull = true;
inst.userData.keep = 1;
g.add(inst);
var ex = M.x + (n - 0.5) * c, ez = M.z + (n - 0.5) * c;
var doll = wCone(0.3, 1.2, shnLam(0xFFD21A), ex, 1, ez, g, 6);
wSph(0.2, shnLam(0xFFD21A), ex, 1.75, ez, g, 8);
shnSpot(ex, ez, 1.8, "The corn dolly", "take the corn dolly (you've solved the maze!)", function () { shnReward("maze", "🌾 <b>You found the middle of the hay maze!</b>"); });
var sg = wSign(["THE HAY MAZE", "the way in is here · the corn dolly waits inside"], 4, 1, "#FFD21A", "#6A1AB8");
sg.position.set(M.x - 3, 2.2, M.z + 2);
sg.rotation.y = -Math.PI / 2;
g.add(sg);
},
function (R, g) {
var w = R.w, d = R.d, h = R.h, wallMap = R.wall === "masque" ? null : R.wall, fl = R.floor === "wet" ? "wet" : R.floor;
var floor = new THREE.Mesh(new THREE.PlaneGeometry(w, d), R.floorCol !== undefined ? shnLam(R.floorCol) : shnLam(0xFFFFFF, { map: fl, rx: w / 4, ry: d / 4 }));
floor.rotation.x = -Math.PI / 2;
g.add(floor);
var ceil = new THREE.Mesh(new THREE.PlaneGeometry(w, d), R.ceilCol !== undefined ? shnLam(R.ceilCol) : shnLam(R.wall === "rafters" ? 0x3A3028 : 0x3A3430, { map: R.wall === "rafters" ? "rafters" : "plaster", rx: w / 6, ry: d / 6 }));
ceil.rotation.x = Math.PI / 2;
ceil.position.y = h;
g.add(ceil);
var wm = R.wallCol !== undefined ? shnLam(R.wallCol) : wallMap ? shnLam(0xFFFFFF, { map: wallMap, rx: Math.max(1, w / 5), ry: Math.max(1, h / 5) }) : shnLam(0x222222), wd = (wallMap && R.wallCol === undefined) ? shnLam(0xFFFFFF, { map: wallMap, rx: Math.max(1, d / 5), ry: Math.max(1, h / 5) }) : wm;
function wall(W, x, z, ry, m) { var p = new THREE.Mesh(new THREE.PlaneGeometry(W, h), m); p.position.set(x, h / 2, z); p.rotation.y = ry; g.add(p); return p; }
wall(w, 0, d / 2, Math.PI, wm);
if (R.k !== "mirror")
wall(w, 0, -d / 2, 0, wm);
wall(d, -w / 2, 0, Math.PI / 2, wd);
wall(d, w / 2, 0, -Math.PI / 2, wd);
var sk = shnLam(0x1A100A);
wBox(w, 0.3, 0.06, sk, 0, 0.15, d / 2 - 0.03, g);
wBox(w, 0.3, 0.06, sk, 0, 0.15, -d / 2 + 0.03, g);
wBox(0.06, 0.3, d, sk, -w / 2 + 0.03, 0.15, 0, g);
wBox(0.06, 0.3, d, sk, w / 2 - 0.03, 0.15, 0, g);
function door(z, face) {
var dg = new THREE.Group();
dg.position.set(0, 0, z);
dg.rotation.y = face;
g.add(dg);
wBox(2.6, 3.4, 0.25, shnLam(0x4A4440, { map: "stone" }), 0, 1.7, 0, dg);
var leaf = wBox(1.9, 2.9, 0.12, shnLam(0x2A160C, { map: "boards" }), 0, 1.45, 0.12, dg);
leaf.userData.keep = 1;
for (var i = 0; i < 6; i++)
wSph(0.035, shnPh(0x1A1A1A, 30), -0.7 + (i % 2) * 1.4, 0.5 + ((i / 2) | 0) * 0.9, 0.2, dg, 5);
wSph(0.06, shnPh(0x8A7A4A, 60), 0.7, 1.3, 0.22, dg, 6);
return leaf;
}
R.inDoor = door(d / 2 - 0.13, Math.PI);
if (R.k !== "mirror")
R.outDoor = door(-d / 2 + 0.13, 0);
if (R.windows) {
var win = shnM("winGlass", function () { return new THREE.MeshBasicMaterial({ color: 0x1A2238 }); });
for (var k = 0; k < Math.max(1, Math.round(d / 10)); k++) {
var z = -d / 2 + (k + 0.5) * d / Math.max(1, Math.round(d / 10));
var p = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 3), win);
p.position.set(w / 2 - 0.02, Math.min(h - 1.2, 3.2), z);
p.rotation.y = -Math.PI / 2;
g.add(p);
wBox(0.12, 3.2, 0.12, shnLam(0x1A100A), w / 2 - 0.06, Math.min(h - 1.2, 3.2), z, g);
wBox(0.12, 0.12, 1.7, shnLam(0x1A100A), w / 2 - 0.06, Math.min(h - 1.2, 3.2), z, g);
}
}
shnFloor(R.x, 0, w - 1, d - 1, 0, true);
},
function (R, g, x, z, rot) {
var m = shnLam(0x2A180E, { map: "boards" }), wg = new THREE.Group();
wg.position.set(x, 0, z);
wg.rotation.y = rot || 0;
g.add(wg);
wBox(1.6, 2.6, 0.8, m, 0, 1.3, 0, wg);
wBox(1.7, 0.15, 0.9, shnLam(0x1A0E08), 0, 2.65, 0, wg);
wBox(0.02, 2.2, 0.02, shnLam(0x0A0604), 0, 1.3, 0.41, wg);
shnSolid(R.x + x, z, 1.8, 1.8, -2, 3, rot);
var fx = R.x + x + Math.sin(rot || 0) * 1.4, fz = z + Math.cos(rot || 0) * 1.4;
shnSpot(fx, fz, 1.6, "A wardrobe", "hide inside", function () { shnHideIn({ x: R.x + x, z: z, ox: fx, oz: fz, rot: rot || 0 }); }, 0);
},
function (R, g, x, z, task) {
var br = shnPh(0x6A5A3A, 60), cg = new THREE.Group();
cg.position.set(x, 0, z);
g.add(cg);
wCyl(0.25, 0.35, 0.1, br, 0, 0.05, 0, cg, 10);
wCyl(0.04, 0.06, 1.4, br, 0, 0.75, 0, cg, 8);
wBox(0.9, 0.05, 0.05, br, 0, 1.45, 0, cg);
var F = [shnCandle(cg, -0.42, 1.45, 0, 0.22, false), shnCandle(cg, 0, 1.5, 0, 0.26, false), shnCandle(cg, 0.42, 1.45, 0, 0.22, false)];
var L = shnFlameLight(0xFFA040, 1.6, 22, 0, 2.2, 0, cg, true);
L.out = true;
R.candle = { F: F, L: L };
shnSolid(R.x + x, z, 0.8, 0.8, -2, 2);
shnSpot(R.x + x, z, 2, "The candelabrum", "light its candles from yours", function () { shnLightCandle(R, task !== false); }, 0);
},
function (R, done) {
if (!R.candle || !R.candle.L.out) {
setStatus("🕯️ Its candles are burning.");
return;
}
R.candle.F.forEach(function (f) { f.out = false; });
R.candle.L.out = false;
shnSfx("strike");
if (done)
shnRoomDone(R, "🕯️ <b>The candles take the flame.</b> Somewhere ahead a lock turns over, slowly, by itself.");
if (R.onLit)
try {
R.onLit();
}
catch (e) { }
},
function (R, g, x, y, z, ry, seed, w, h) {
var t = wTex(128, 160, function (c, W, H) {
var r = wRand(seed);
c.fillStyle = "#1A120C";
c.fillRect(0, 0, W, H);
c.fillStyle = "#3A2A1E";
c.fillRect(8, 8, W - 16, H - 16);
c.fillStyle = "rgb(" + (150 + r() * 30 | 0) + "," + (120 + r() * 20 | 0) + ",100)";
c.beginPath();
c.ellipse(W / 2, H * 0.42, 24, 32, 0, 0, 7);
c.fill();
c.fillStyle = ["#1A1410", "#3A2A1A", "#6A6A6A"][seed % 3];
c.beginPath();
c.ellipse(W / 2, H * 0.3, 28, 20, 0, Math.PI, 0);
c.fill();
c.fillStyle = "#140E0A";
c.fillRect(W / 2 - 34, H * 0.68, 68, H * 0.3);
c.fillStyle = "#2A1A12";
c.fillRect(W / 2 - 6, H * 0.58, 12, 6);
});
var pg = new THREE.Group();
pg.position.set(x, y, z);
pg.rotation.y = ry;
g.add(pg);
wBox((w || 1.2) + 0.2, (h || 1.5) + 0.2, 0.08, shnPh(0x8A6A2A, 50), 0, 0, 0, pg);
var pic = new THREE.Mesh(new THREE.PlaneGeometry(w || 1.2, h || 1.5), new THREE.MeshLambertMaterial({ map: t }));
pic.position.z = 0.05;
pg.add(pic);
var eyes = [];
[-0.1, 0.1].forEach(function (o) { var e = wSph(0.03, shnGlowM(0xE8E0D0), o * (w || 1.2) / 1.2, 0.12 * (h || 1.5) / 1.5, 0.07, pg, 6); var p = wSph(0.014, shnGlowM(0x050505), 0, 0, 0.022, e, 5); eyes.push(p); });
SHN.fx.push({ k: "eyes", eyes: eyes, g: pg, R: R });
return pg;
},
function (k) {
var R = SHN_RX[k] || SHN_KR[k];
if (!R)
return null;
if (!R.g) {
var g = new THREE.Group();
g.position.set(R.x, 0, 0);
SHN.G.add(g);
R.g = g;
R.trig = [];
try {
shnShell(R, g);
var B = (R.kids ? SHN_KB : SHN_RB)[k];
if (B)
B(R, g);
shnDoorSpots(R);
}
catch (e) {
if (window.console)
console.warn("[samhain] room " + k, e);
}
}
return R;
},
function (k, fromBack) {
var R = shnRoomGet(k);
if (!R)
return;
shnVeil(0.35, function () {
SHN.room = R;
SHN.zone = "inside";
R.trig.forEach(function (T) { T.done = false; });
R.t = 0;
for (var q in SHN_RX) {
if (SHN_RX[q].g)
SHN_RX[q].g.visible = SHN_RX[q] === R;
}
for (var q2 in SHN_KR) {
if (SHN_KR[q2].g)
SHN_KR[q2].g.visible = SHN_KR[q2] === R;
}
if (SHN.outside)
SHN.outside.forEach(function (o) { o.visible = false; });
var z = fromBack ? -R.d / 2 + 2.2 : R.d / 2 - 2.2;
camera.position.set(SHN.base + R.x, 1.72, z);
yaw = fromBack ? Math.PI : 0;
pitch = 0;
shnSfx(R.kids ? "pop" : "door");
if (R.enter)
try {
R.enter(fromBack);
}
catch (e) { }
if (!R.kids && SHN.houseRun)
SHN.houseRun.at = R.i;
shnLadyReset(R);
setStatus((R.kids ? "🎃 " : "🕯️ ") + "<b>" + esc(R.n) + ".</b> " + esc(R.tale || ""));
});
},
function () {
var R = SHN.room;
SHN.room = null;
SHN.hide = null;
shnLadyGone();
shnVeil(0.4, function () {
if (R && R.g)
R.g.visible = false;
if (SHN.outside)
SHN.outside.forEach(function (o) { o.visible = true; });
var out = R && R.kids ? (R.k === "giggle" ? { x: SHN_HOLLOW.house.x - 9, z: SHN_HOLLOW.house.z, yaw: Math.PI / 2 } : { x: SHN_HOLLOW.tent.x, z: SHN_HOLLOW.tent.z + 23, yaw: Math.PI }) : { x: SHN_AT.manor.x, z: SHN_AT.manor.z + 19, yaw: Math.PI };
SHN.zone = R && R.kids ? "hollow" : "manor";
camera.position.set(SHN.base + out.x, shnGround(out.x, out.z, 1e4) + 1.72, out.z);
yaw = out.yaw;
pitch = 0;
shnSfx("door");
});
},
function (sec, mid) {
var v = SHN.veil;
if (!v) {
v = SHN.veil = document.createElement("div");
v.style.cssText = "position:fixed;inset:0;background:#000;opacity:0;pointer-events:none;z-index:43;transition:opacity .35s";
document.body.appendChild(v);
}
SHN.moving = true;
v.style.transition = "opacity " + sec + "s";
v.style.opacity = "1";
setTimeout(function () { try {
mid();
}
catch (e) {
if (window.console)
console.warn("[samhain] door", e);
} setTimeout(function () { v.style.opacity = "0"; SHN.moving = false; }, 120); }, sec * 1000 + 40);
},
function (R) {
shnSpot(R.x, R.d / 2 - 1.1, 1.8, R.i === 0 ? "The front door" : "The door you came in by", R.i === 0 ? "leave Ravensmoor House" : "go back", function () {
if (R.kids || R.i === 0)
shnLeaveInside();
else
shnEnterRoom(SHN_ROOMS[R.i - 1].k, true);
}, 0);
if (R.kids)
return;
shnSpot(R.x, -R.d / 2 + 1.1, 1.8, "The far door", R.k === "attic" ? "climb out onto the roof" : "go on", function () {
if (!R.open && !shnKeeper()) {
shnSfx("rattle");
setStatus("🔒 <b>The door will not move.</b> " + esc(R.hint || "Something in this room must be done first."));
return;
}
if (R.k === "attic")
return shnRoof();
shnEnterRoom(SHN_ROOMS[R.i + 1].k, false);
}, 0);
},
function () {
if (SHN.lady)
return SHN.lady;
var g = new THREE.Group(), robe = new THREE.MeshLambertMaterial({ color: 0x8A8C90, transparent: true, opacity: 0.82, emissive: 0x1A1C22 });
var body = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.7, 2.1, 10, 4, true), robe);
body.position.y = 1.15;
g.add(body);
var head = wSph(0.17, new THREE.MeshLambertMaterial({ color: 0xC8C8C0, emissive: 0x2A2A2A }), 0, 2.32, 0, g, 10);
var hair = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.32, 1.3, 8, 1, true), new THREE.MeshLambertMaterial({ color: 0x0A0A0A, side: THREE.DoubleSide }));
hair.position.set(0, 1.85, -0.03);
g.add(hair);
[-0.06, 0.06].forEach(function (o) { wSph(0.025, shnGlowM(0x050505), o, 2.34, 0.15, g, 5); });
var mouth = wBox(0.06, 0.11, 0.02, shnGlowM(0x050505), 0, 2.22, 0.16, g);
[-1, 1].forEach(function (s) { var a = wCyl(0.03, 0.04, 0.95, robe, s * 0.32, 1.75, 0.25, g, 5); a.rotation.x = -1.1; });
var gl = wGlow(0x8AA0C8, 3.2, 0.25);
gl.position.y = 1.5;
g.add(gl);
g.visible = false;
SHN.G.add(g);
SHN.lady = { g: g, on: false, t: 0, wait: 12, gone: 0 };
return SHN.lady;
},
function (dt) {
var R = SHN.room, L = SHN.lady;
if (!R || !L || !R.lady || SHN.moving)
return;
var P = camera.position, lx = P.x - SHN.base, lz = P.z;
if (!L.on) {
L.wait -= dt;
if (L.wait > 0)
return;
var behind = Math.random() < 0.5, fx = -Math.sin(yaw), fz = -Math.cos(yaw), d = behind ? -9 : 14;
var x = Math.max(R.x - R.w / 2 + 1, Math.min(R.x + R.w / 2 - 1, lx + fx * d)), z = Math.max(-R.d / 2 + 1.5, Math.min(R.d / 2 - 1.5, lz + fz * d));
if (Math.hypot(x - lx, z - lz) < 6) {
x = Math.max(R.x - R.w / 2 + 1, Math.min(R.x + R.w / 2 - 1, lx + fx * 14));
z = Math.max(-R.d / 2 + 1.5, Math.min(R.d / 2 - 1.5, lz + fz * 14));
if (Math.hypot(x - lx, z - lz) < 6) {
z = lz > 0 ? -R.d / 2 + 1.5 : R.d / 2 - 1.5;
x = R.x;
}
}
L.g.position.set(x, 0, z);
L.g.visible = true;
L.on = true;
L.t = 0;
shnSfx("keen");
setStatus("👻 <b>A keening, high and terrible.</b> The Grey Lady is in the room. Run for the next door, or hide.");
return;
}
L.t += dt;
var g = L.g, dx = lx - g.position.x, dz = lz - g.position.z, dist = Math.hypot(dx, dz);
if (SHN.hide) {
g.position.x += Math.sin(L.t * 0.4) * dt;
if (L.t > 9) {
shnLadyReset(R);
L.wait = 14 + Math.random() * 10;
shnSfx("keen", { stop: 1 });
setStatus("🫥 She has passed. Step out when you dare.");
}
return;
}
var sp = 2.0 + R.i * 0.07;
g.position.x += dx / dist * sp * dt;
g.position.z += dz / dist * sp * dt;
g.position.y = 0.1 + Math.sin(L.t * 1.6) * 0.08;
g.rotation.y = Math.atan2(dx, dz);
if (dist < 1.25 && !shnKeeper())
return shnCaught(R);
if (L.t > 28) {
shnLadyReset(R);
L.wait = 10 + Math.random() * 12;
shnSfx("keen", { stop: 1 });
}
},
function (R) {
shnSfx("scream");
shnLadyGone();
if (SHN.houseRun)
SHN.houseRun.caught = (SHN.houseRun.caught || 0) + 1;
shnVeil(0.9, function () {
camera.position.set(SHN.base + R.x, 1.72, R.d / 2 - 2.2);
yaw = 0;
pitch = 0;
shnLadyReset(R);
setStatus("💀 <b>Her cold hands close on you.</b> You wake at the door of " + esc(R.n) + ", your candle guttering. Again.");
});
},
function (H) {
if (SHN.hide) {
shnHideOut();
return;
}
SHN.hide = H;
camera.position.set(SHN.base + H.x + Math.sin(H.rot) * 0.1, 1.6, H.z + Math.cos(H.rot) * 0.1);
yaw = H.rot + Math.PI;
pitch = 0;
var v = SHN.veil;
if (v) {
v.style.transition = "opacity .3s";
v.style.opacity = "0.82";
}
shnSfx("creak");
setStatus("🫥 <b>You are in the wardrobe.</b> Hold your breath. <b>Press E</b> to step out.");
SHN.hideFn = shnHideOut;
},
function (col, op) {
var g = new THREE.Group(), m = new THREE.MeshLambertMaterial({ color: col || 0x0A0A0A, transparent: op !== undefined, opacity: op === undefined ? 1 : op });
var b = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.32, 1.25, 8), m);
b.position.y = 0.9;
g.add(b);
wSph(0.15, m, 0, 1.68, 0, g, 8);
[-0.11, 0.11].forEach(function (o) { wCyl(0.06, 0.06, 0.62, m, o, 0.3, 0, g, 5); });
return g;
},
function (R, g) {
var st = shnLam(0x3A2A20, { map: "boards" });
for (var i = 0; i < 14; i++) {
wBox(6, 0.4 * (i + 1), 0.8, st, -11, 0.2 * (i + 1), -6 - i * 0.8 + 6, g);
}
shnSolid(R.x - 11, -5.5, 6.4, 11.5, -2, 7);
wBox(12, 0.4, 4, st, -11, 5.8, -12, g);
wBox(12, 1, 0.15, shnLam(0x1A0E08), -11, 6.5, -10, g);
[[-16.9, 5, -6, Math.PI / 2], [-16.9, 5, 2, Math.PI / 2], [-16.9, 5, 9, Math.PI / 2], [16.9, 5, -8, -Math.PI / 2], [16.9, 5, 0, -Math.PI / 2], [16.9, 5, 8, -Math.PI / 2]].forEach(function (p, i) { shnPortrait(R, g, p[0], p[1], p[2], p[3], 90 + i, 1.6, 2.1); });
var cg = new THREE.Group();
cg.position.set(14, 0, -11);
g.add(cg);
var wd = shnLam(0x1A0E08, { map: "boards" });
wBox(1.1, 3.2, 0.6, wd, 0, 1.6, 0, cg);
wCyl(0.42, 0.42, 0.06, shnLam(0xE8E0C8), 0, 2.7, 0.32, cg, 20).rotation.x = Math.PI / 2;
var pend = wBox(0.05, 0.9, 0.03, shnPh(0x8A7A3A, 60), 0, 1.4, 0.31, cg);
pend.userData.keep = 1;
SHN.fx.push({ k: "pend", m: pend });
shnSolid(R.x + 14, -11, 1.4, 1, -2, 3.5);
var ch = new THREE.Group();
ch.position.set(0, R.h, 0);
ch.userData.keep = 1;
g.add(ch);
wCyl(0.02, 0.02, 4, shnPh(0x2A2A2A, 30), 0, -2, 0, ch, 4);
var ring = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.06, 6, 20), shnPh(0x6A5A3A, 60));
ring.rotation.x = Math.PI / 2;
ring.position.y = -4;
ch.add(ring);
for (var c = 0; c < 8; c++)
shnCandle(ch, Math.cos(c / 8 * 6.28) * 1.4, -4, Math.sin(c / 8 * 6.28) * 1.4, 0.2, true);
SHN.fx.push({ k: "swing", m: ch, amp: 0.05 });
wBox(0.8, 3, 4, shnLam(0x6A665E, { map: "stone" }), -16.6, 1.5, 6, g);
wBox(0.3, 1.4, 2.4, shnGlowM(0x1A0804), -16.2, 0.8, 6, g);
shnFlameLight(0xFF4A10, 0.9, 14, -15.6, 0.8, 6, g, true);
shnCandelabrum(R, g, 4, -8);
R.hint = "Light the candelabrum.";
R.onLit = function () { for (var i = 0; i < 13; i++)
shnSfx("bell", { delay: 1.2 + i * 1.5, f: 196 }); setStatus("🕰️ The long-case clock begins to strike. You count. <b>Eleven. Twelve. Thirteen.</b> A clock with no thirteen on its face."); };
R.enter = function (back) { if (!back) {
shnSfx("slam", { delay: 0.8 });
setTimeout(function () { if (SHN.room === R)
setStatus("🚪 <b>BANG.</b> The front door slams behind you. You did not touch it. Silas Ravensmoor laid a supper for the dead on Samhain, 1789, and locked them in. Light the candelabrum."); }, 900);
} };
shnTrig(R, -8, 4, 4, function () { shnSfx("whisper"); });
},
function (R, g) {
for (var i = 0; i < 12; i++) {
var z = 40 - i * 8;
[-1, 1].forEach(function (s) { wBox(0.1, 0.3, 0.2, shnPh(0x6A5A3A, 40), s * 3.4, 2.3, z, g); var F = shnCandle(g, s * 3.3, 2.4, z, 0.15, true); (R.sconce || (R.sconce = [])).push({ F: F, z: z }); });
}
R.lit = [shnFlameLight(0xFFA050, 0.8, 12, 0, 2.6, 30, g), shnFlameLight(0xFFA050, 0.8, 12, 0, 2.6, 6, g)];
for (var p = 0; p < 8; p++)
shnPortrait(R, g, p % 2 ? 3.45 : -3.45, 2.2, 36 - p * 10, p % 2 ? -Math.PI / 2 : Math.PI / 2, 120 + p, 0.8, 1.0);
var fw = new THREE.Group();
fw.position.set(0, 0, -14);
fw.userData.keep = 1;
g.add(fw);
wBox(7, R.h, 0.3, shnLam(0xFFFFFF, { map: "paper", rx: 2, ry: 1 }), 0, R.h / 2, 0, fw);
wBox(1.9, 2.9, 0.12, shnLam(0x2A160C, { map: "boards" }), 0, 1.45, 0.2, fw);
var S = shnSolid(R.x, -14, 7, 0.6, -2, 6);
R.fake = { g: fw, S: S, z: -14, go: false };
shnTrig(R, 0, -8, 3, function () { R.fake.go = true; shnSfx("groan"); setStatus("😨 The door ahead is <b>moving away from you</b>. The walls groan. The corridor is getting longer."); });
shnTrig(R, 0, -30, 4, function () { var c = shnFig(0x1A1A20); c.scale.setScalar(0.6); c.position.set(0, 0, -44); g.add(c); shnSfx("giggle"); SHN.fx.push({ k: "run", m: c, vx: 2.6, t: 0 }); setStatus("👧 At the far end a small figure turns and runs, laughing, through the wall."); });
R.walk = true;
shnCandelabrum(R, g, 2.2, -44);
R.hint = "Light the candelabrum at the far end.";
},
function (R, g) {
var sh = shnLam(0xFFFFFF, { map: "books", rx: 6, ry: 2 });
[[-14.6, 0, 1, 22], [14.6, 0, 1, 22]].forEach(function (b) { wBox(b[2], 8, b[3], sh, b[0], 4, b[1], g); shnSolid(R.x + b[0], b[1], b[2] + 0.6, b[3], -2, 9); });
for (var k = 0; k < 4; k++) {
wBox(8, 5, 1, sh, -6 + ((k % 2) * 12), 2.5, -6 + ((k / 2) | 0) * 10, g);
shnSolid(R.x - 6 + ((k % 2) * 12), -6 + ((k / 2) | 0) * 10, 8.4, 1.4, -2, 6);
}
wCyl(0.25, 0.35, 0.6, shnLam(0xD8D4C8), 0, 3.9, -11.6, g, 10);
wSph(0.28, shnLam(0xD8D4C8), 0, 4.45, -11.6, g, 10);
var rv = new THREE.Group();
rv.position.set(0, 4.8, -11.5);
g.add(rv);
rv.userData.keep = 1;
var bk = shnPh(0x050508, 90);
var bd = wSph(0.22, bk, 0, 0, 0, rv, 10);
bd.scale.set(0.8, 0.9, 1.4);
var hd = wSph(0.12, bk, 0, 0.18, 0.2, rv, 8);
var bill = wCone(0.04, 0.18, bk, 0, 0.17, 0.36, rv, 5);
bill.rotation.x = Math.PI / 2;
wSph(0.02, shnGlowM(0xC8A020), 0.06, 0.21, 0.28, rv, 5);
wSph(0.02, shnGlowM(0xC8A020), -0.06, 0.21, 0.28, rv, 5);
SHN.fx.push({ k: "watch", m: rv, R: R });
var chair = new THREE.Group();
chair.position.set(-9, 0, 6);
chair.rotation.y = 0.6;
g.add(chair);
wBox(1.2, 1, 1.1, shnLam(0x4A1A1A), 0, 0.5, 0, chair);
wBox(1.2, 1.6, 0.3, shnLam(0x4A1A1A), 0, 1.3, -0.45, chair);
var reader = shnFig(0x0A0A0A);
reader.position.set(0, 0.35, -0.1);
reader.scale.setScalar(0.9);
reader.userData.keep = 1;
chair.add(reader);
R.reader = reader;
shnSolid(R.x - 9, 6, 1.6, 1.6, -2, 2);
R.onStrike = function () { R.reader.visible = false; setTimeout(function () { R.reader.visible = true; }, 2600); };
var books = [["Lenore, 1843", "'Ah, broken is the golden bowl!' Not this one."], ["The Bells, 1849", "'Keeping time, time, time, in a sort of Runic rhyme.' Not this one."], ["Annabel Lee, 1849", "'In a kingdom by the sea.' Not this one."], ["The Raven, 1845", "'Quoth the Raven, Nevermore.' The bird on the bust spreads its wings, and the far door swings open."], ["Ulalume, 1847", "'It was night in the lonesome October.' Not this one."]];
books.forEach(function (B, i) {
var x = -10 + i * 5, z = i % 2 ? -2 : 2;
var lg = new THREE.Group();
lg.position.set(x, 0, z);
g.add(lg);
wBox(0.15, 1.2, 0.15, shnLam(0x2A1A10), 0, 0.6, 0, lg);
var top = wBox(0.8, 0.06, 0.6, shnLam(0x2A1A10), 0, 1.25, 0, lg);
top.rotation.x = -0.4;
shnBook(lg, 0, 1.32, 0.02).rotation.x = -0.4;
shnSolid(R.x + x, z, 0.8, 0.8, -2, 1.5);
shnSpot(R.x + x, z + 1, 1.6, "A book on a lectern: " + B[0], "read it", function () { if (i === 3) {
shnSfx("caw");
shnRoomDone(R, "📖 <b>" + B[0] + ".</b> " + B[1]);
}
else {
shnSfx("caw");
shnSfx("thud", { delay: 0.4 });
setStatus("🐦‍⬛ <b>" + B[0] + ".</b> " + B[1] + " The Raven croaks: <b>Nevermore.</b> A book falls from a high shelf behind you.");
} }, 0);
});
shnCandelabrum(R, g, 10, 8, false);
R.hint = "The Raven watches the door. Find his book among the lecterns.";
shnTrig(R, 0, 0, 5, function () { shnSfx("whisper"); setStatus("📚 A dry voice from nowhere: <i>'Once upon a midnight dreary, while I pondered, weak and weary...'</i>"); });
},
function (R, g) {
var bed = new THREE.Group();
bed.position.set(-4, 0, -4);
g.add(bed);
var ir = shnPh(0x2A2A2A, 40);
wBox(2, 0.5, 3, shnLam(0xC8C0A0), 0, 0.6, 0, bed);
[-1, 1].forEach(function (s) { wBox(0.08, 1.4, 0.08, ir, s * 0.95, 0.7, 1.45, bed); wBox(0.08, 1.4, 0.08, ir, s * 0.95, 0.7, -1.45, bed); });
shnSolid(R.x - 4, -4, 2.2, 3.2, -2, 1.5);
var cr = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.7), new THREE.MeshBasicMaterial({ color: 0x0A0806, transparent: true, opacity: 0.75, depthWrite: false }));
cr.position.set(-7.9, 0.5, 2);
cr.rotation.y = Math.PI / 2;
g.add(cr);
cr.userData.keep = 1;
wSph(0.18, new THREE.MeshBasicMaterial({ color: 0x0A0806, transparent: true, opacity: 0.75 }), 0.5, 0.2, 0, cr, 8);
R.creep = { m: cr, a: 0 };
SHN.fx.push({ k: "creep", R: R });
var bulge = wSph(0.6, shnLam(0xB8A040), 7.8, 1.4, 3, g, 10);
bulge.scale.x = 0.25;
shnSpot(R.x + 7, 3, 1.8, "The paper bulges here", "tear the wallpaper", function () { bulge.visible = false; R.creep.m.visible = false; shnSfx("tear"); shnRoomDone(R, "🟨 You tear the paper in long strips. Behind it, the shape of a woman, and a whisper: <i>'I've got out at last, and I've pulled off most of the paper, so you can't put me back!'</i>"); }, 0);
shnWardrobe(R, g, 5, -6, -Math.PI / 2);
shnCandelabrum(R, g, 0, -6, false);
R.hint = "Something is behind the paper. Find where it bulges.";
},
function (R, g) {
var hz = new THREE.Group();
hz.position.set(-5, 0, 2);
hz.userData.keep = 1;
g.add(hz);
var hm = shnLam(0xC8B8A0);
var rock = new THREE.Mesh(new THREE.TorusGeometry(1, 0.06, 4, 16, Math.PI * 0.6), shnLam(0x5A3A1E));
rock.rotation.z = Math.PI * 1.2;
rock.position.y = 1;
hz.add(rock);
wBox(0.5, 0.5, 1.2, hm, 0, 0.85, 0, hz);
var hh = wBox(0.3, 0.5, 0.4, hm, 0, 1.3, 0.6, hz);
[-0.2, 0.2].forEach(function (o) { wBox(0.08, 0.5, 0.08, hm, o, 0.4, 0.4, hz); wBox(0.08, 0.5, 0.08, hm, o, 0.4, -0.4, hz); });
SHN.fx.push({ k: "rockh", m: hz });
shnSolid(R.x - 5, 2, 1, 1.6, -2, 1.5);
var crib = new THREE.Group();
crib.position.set(5, 0, -4);
g.add(crib);
wBox(1.4, 0.1, 2, shnLam(0xE8E0D0), 0, 0.6, 0, crib);
for (var b = 0; b < 9; b++) {
wBox(0.04, 0.8, 0.04, shnLam(0xE8E0D0), -0.7 + b * 0.175, 0.9, 1, crib);
wBox(0.04, 0.8, 0.04, shnLam(0xE8E0D0), -0.7 + b * 0.175, 0.9, -1, crib);
}
shnSolid(R.x + 5, -4, 1.6, 2.2, -2, 1.4);
var shelf = wBox(6, 0.1, 0.5, shnLam(0x5A3A1E), 0, 1.8, -7.6, g);
R.dolls = [];
for (var d = 0; d < 6; d++) {
var dg = new THREE.Group();
dg.position.set(-2.5 + d, 1.85, -7.5);
g.add(dg);
dg.userData.keep = 1;
wCyl(0.08, 0.14, 0.35, shnLam([0xE8B8C8, 0xB8C8E8, 0xF2F2E8][d % 3]), 0, 0.18, 0, dg, 6);
var head = new THREE.Group();
head.position.y = 0.45;
dg.add(head);
wSph(0.1, shnLam(0xF2E8E0), 0, 0, 0, head, 8);
wSph(0.018, shnGlowM(0x050505), -0.035, 0.02, 0.09, head, 4);
wSph(0.018, shnGlowM(0x050505), 0.035, 0.02, 0.09, head, 4);
R.dolls.push(head);
}
SHN.fx.push({ k: "dolls", R: R });
var mb = new THREE.Group();
mb.position.set(0, 0, 0);
g.add(mb);
wBox(0.8, 0.75, 0.8, shnLam(0x3A2416), 0, 0.375, 0, mb);
wBox(0.4, 0.2, 0.3, shnPh(0x8A6A3A, 50), 0, 0.85, 0, mb);
var lid = wBox(0.4, 0.02, 0.3, shnPh(0x8A6A3A, 50), 0, 1.05, -0.13, mb);
lid.rotation.x = -1.2;
lid.userData.keep = 1;
var bal = wCyl(0.01, 0.03, 0.12, shnLam(0xF2E8F0), 0, 1.0, 0, mb, 5);
bal.userData.keep = 1;
SHN.fx.push({ k: "spin", m: bal, sp: 2, y: 1 });
shnSolid(R.x, 0, 1, 1, -2, 1.2);
R.enter = function () { if (!R.open)
shnSfx("musicbox"); };
shnSpot(R.x, 1.2, 1.8, "The music box, playing by itself", "close its lid", function () { if (R.open)
return; lid.rotation.x = 0; bal.visible = false; shnSfx("musicbox", { stop: 1 }); shnSfx("giggle", { delay: 1.4 }); shnRoomDone(R, "🎶 The tune stops. In the silence a child laughs, right behind you. When you turn, the rocking horse is still rocking."); }, 0);
shnWardrobe(R, g, -7.5, -5, Math.PI / 2);
shnWardrobe(R, g, 7.5, 4, -Math.PI / 2);
R.hint = "Make the music stop.";
},
function (R, g) {
var wd = shnLam(0x2A160C, { map: "boards" });
wBox(3, 0.12, 22, wd, 0, 0.95, 0, g);
for (var l = 0; l < 4; l++)
wBox(0.15, 0.9, 0.15, wd, (l % 2 ? 1 : -1) * 1.3, 0.45, (l < 2 ? 1 : -1) * 10.5, g);
wBox(3.1, 0.02, 22.2, shnLam(0xD8D0C0), 0, 1.02, 0, g);
shnSolid(R.x, 0, 3.4, 22.4, -2, 1.2);
R.chairs = [];
R.guests = [];
R.tc = [];
for (var c = 0; c < 12; c++) {
var s = c % 2 ? 1 : -1, z = -9 + ((c / 2) | 0) * 3.6, cg = new THREE.Group();
cg.position.set(s * 2.3, 0, z);
g.add(cg);
cg.userData.keep = 1;
wBox(0.6, 0.08, 0.6, wd, 0, 0.55, 0, cg);
wBox(0.6, 1.1, 0.08, wd, 0, 1.1, s * 0.28, cg);
[-1, 1].forEach(function (a) { [-1, 1].forEach(function (b) { wBox(0.06, 0.55, 0.06, wd, a * 0.26, 0.27, b * 0.26, cg); }); });
var away = c % 3 === 0;
cg.rotation.y = away ? Math.PI : 0;
R.chairs.push({ g: cg, away: away });
wCyl(0.18, 0.16, 0.02, shnLam(0xE8E4DC), s * 1.05, 1.04, z, g, 12);
wCyl(0.04, 0.03, 0.2, shnPh(0x8A8A8A, 80), s * 1.05 + 0.25 * s * -1, 1.14, z + 0.3, g, 6);
var gu = shnFig(0x050508, 0.0);
gu.position.set(s * 2.3, 0.1, z);
gu.rotation.y = s > 0 ? -Math.PI / 2 : Math.PI / 2;
gu.visible = false;
g.add(gu);
gu.userData.keep = 1;
R.guests.push(gu);
if (away)
(function (ch, c) { shnSpot(R.x + s * 2.6, z, 1.4, "A chair turned away from the table", "turn it to the table", function () { if (!ch.away)
return; ch.away = false; ch.g.rotation.y = 0; shnSfx("scrape"); shnSupperCheck(R); }, 0); })(R.chairs[c], c);
}
for (var t = 0; t < 7; t++) {
R.tc.push(shnCandle(g, 0, 1.02, -9 + t * 3, 0.3, false));
}
R.tl = shnFlameLight(0xFFA040, 1.4, 30, 0, 3, 0, g, true);
R.tl.out = true;
shnWardrobe(R, g, -13, -6, Math.PI / 2);
shnWardrobe(R, g, 13, 5, -Math.PI / 2);
R.hint = "At a Dumb Supper every chair faces the table. Some here have been turned away.";
},
function (R) {
if (R.chairs.some(function (c) { return c.away; })) {
setStatus("🪑 The chair grinds round to face the table. " + R.chairs.filter(function (c) { return c.away; }).length + " still turned away.");
return;
}
setStatus("🕯️ The last chair turns. Down the table, the candles begin to light, one by one, by themselves...");
R.tc.forEach(function (F, i) {
setTimeout(function () {
F.out = false;
shnSfx("strike");
if (i === R.tc.length - 1) {
R.tl.out = false;
R.guests.forEach(function (gu) { gu.visible = true; gu.traverse(function (m) { if (m.material) {
m.material.opacity = 0.8;
} }); });
shnSfx("whisper");
setStatus("👥 <b>Every chair is taken.</b> Dark guests sit in silence, heads bowed over their plates. Not one of them breathes. The far door stands open.");
setTimeout(function () { R.guests.forEach(function (gu) { gu.visible = false; }); }, 6000);
shnRoomDone(R);
}
}, 700 * i);
});
},
function (R, g) {
var w = R.w, d = R.d, h = R.h, frame = shnPh(0x8A6A2A, 60), wall = shnLam(0xFFFFFF, { map: "mirror", rx: 2, ry: 1 });
var xs = [-8, -4, 0, 4, 8];
[[-10, -9], [-7, -5], [-3, -1], [1, 3], [5, 7], [9, 10]].forEach(function (s) { var W = s[1] - s[0]; if (W <= 0)
return; var p = new THREE.Mesh(new THREE.PlaneGeometry(W, h), wall); p.position.set((s[0] + s[1]) / 2, h / 2, -d / 2); g.add(p); });
xs.forEach(function (x) {
var top = new THREE.Mesh(new THREE.PlaneGeometry(2, h - 3.6), wall);
top.position.set(x, 3.6 + (h - 3.6) / 2, -d / 2);
g.add(top);
var bot = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.3), wall);
bot.position.set(x, 0.15, -d / 2);
g.add(bot);
wBox(2.2, 0.12, 0.12, frame, x, 3.6, -d / 2 + 0.05, g);
wBox(2.2, 0.12, 0.12, frame, x, 0.3, -d / 2 + 0.05, g);
wBox(0.12, 3.4, 0.12, frame, x - 1.05, 1.95, -d / 2 + 0.05, g);
wBox(0.12, 3.4, 0.12, frame, x + 1.05, 1.95, -d / 2 + 0.05, g);
var gl = new THREE.Mesh(new THREE.PlaneGeometry(2, 3.3), new THREE.MeshPhongMaterial({ color: 0x8A9AA8, transparent: true, opacity: 0.22, shininess: 120, specular: 0xFFFFFF, depthWrite: false }));
gl.position.set(x, 1.95, -d / 2 + 0.02);
g.add(gl);
});
var back = new THREE.Group();
back.position.z = -d;
g.add(back);
var bf = new THREE.Mesh(new THREE.PlaneGeometry(w, d), shnLam(0xFFFFFF, { map: "marble", rx: w / 4, ry: d / 4 }));
bf.rotation.x = -Math.PI / 2;
back.add(bf);
[[w, 0, -d / 2, 0], [d, -w / 2, 0, Math.PI / 2], [d, w / 2, 0, -Math.PI / 2]].forEach(function (p) { var m = new THREE.Mesh(new THREE.PlaneGeometry(p[0], h), wall); m.position.set(p[1], h / 2, p[2]); m.rotation.y = p[3]; back.add(m); });
var bc = new THREE.Mesh(new THREE.PlaneGeometry(w, d), shnLam(0x2A2622));
bc.rotation.x = Math.PI / 2;
bc.position.y = h;
back.add(bc);
var me = shnFig(0x5A5A62);
me.userData.keep = 1;
g.add(me);
var other = shnFig(0x2A2A30);
other.position.set(0, 0, -d / 2 - 2.6);
other.rotation.y = 0;
other.userData.keep = 1;
g.add(other);
wSph(0.02, shnGlowM(0xE8E0D0), -0.05, 1.7, 0.14, other, 5);
wSph(0.02, shnGlowM(0xE8E0D0), 0.05, 1.7, 0.14, other, 5);
R.me = { m: me, hist: [] };
SHN.fx.push({ k: "mirror", R: R });
shnSolid(R.x, -d / 2 - 0.3, w, 0.6, -2, 9);
shnTrig(R, 0, -d / 2 + 2, 2.2, function () { if (R.open)
return; shnSfx("whisper"); shnRoomDone(R, "🪞 In the middle mirror, the one who is not you <b>smiles</b>, and lifts a hand, and beckons. The glass is cold as water. You can step through it (the far door)."); });
shnTrig(R, 0, 4, 3, function () { setStatus("🪞 Five mirrors. Your reflection follows you in each, a moment late. Look closely at all of them."); });
shnCandelabrum(R, g, -7, 6, false);
shnWardrobe(R, g, -9, -2, Math.PI / 2);
shnWardrobe(R, g, 9, 3, -Math.PI / 2);
R.hint = "One of the mirrors is not showing you.";
},
function (R, g) {
var bed = new THREE.Group();
bed.position.set(-5, 0, -4);
g.add(bed);
wBox(2.2, 0.6, 3.2, shnLam(0x6A5A4A), 0, 0.5, 0, bed);
wBox(2.4, 2.2, 0.15, shnLam(0x2A1A10), 0, 1.1, -1.6, bed);
var cur = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 2.6, 12, 1, true, 0, Math.PI), shnLam(0x3A1A1A, { ds: true }));
cur.position.set(0, 1.6, 0);
bed.add(cur);
shnSolid(R.x - 5, -4, 2.6, 3.6, -2, 2.5);
var lt = new THREE.Group();
lt.position.set(3, 0, 3);
g.add(lt);
wBox(0.5, 0.7, 0.5, shnPh(0x2A2A2A, 40), 0, 0.35, 0, lt);
var boards = [[-3, 2], [2, -3], [5, 1], [-1, -1], [0, 4], [4, -5]], hit = 3;
R.heartAt = { x: R.x + boards[hit][0], z: boards[hit][1] };
R.heartOn = true;
boards.forEach(function (b, i) {
var bd = wBox(0.6, 0.03, 1.8, shnLam(0x3A2618, { map: "boards" }), b[0], 0.02, b[1], g);
bd.rotation.y = 0.02 * i;
shnSpot(R.x + b[0], b[1], 1.2, "A loose floorboard", "prise it up", function () {
if (R.open)
return;
if (i === hit) {
R.heartOn = false;
bd.position.y = 0.2;
bd.rotation.z = 0.6;
shnSfx("heart", { loud: 1 });
shnRoomDone(R, "❤️ <b>Under the board, wrapped in sacking, something still beats.</b> Once, very loudly. Then never again. <i>'Villains! dissemble no more! I admit the deed! tear up the planks! here, here! It is the beating of his hideous heart!'</i>");
}
else {
shnSfx("creak");
setStatus("🪵 Dust and old nails. The beating is <b>louder somewhere else</b>.");
}
}, 0);
});
shnCandelabrum(R, g, 6, 5, false);
shnWardrobe(R, g, 7.2, -3, -Math.PI / 2);
R.hint = "Listen. Follow the beating heart, and lift the board it is under.";
},
function (R, g) {
var bd = wBox(0.2, 3, 10, shnLam(0x3A2416, { map: "boards" }), -5.8, 3, 0, g);
R.bellM = [];
SHN_BELLS.forEach(function (n, i) {
var z = -4.5 + (i % 6) * 1.8, y = i < 6 ? 3.9 : 2.4, bg = new THREE.Group();
bg.position.set(-5.5, y, z);
g.add(bg);
bg.userData.keep = 1;
var b = wCone(0.14, 0.22, shnPh(0xB89A3A, 90), 0, -0.15, 0, bg, 10);
var lab = wSign([n], 0.9, 0.18, "#1A0E08", "#E8D8A8");
lab.position.set(0.05, -0.42, 0);
lab.rotation.y = Math.PI / 2;
bg.add(lab);
R.bellM.push({ g: bg, n: n, t: 0 });
});
R.ring = 0;
R.fourteen = 0;
SHN.fx.push({ k: "bells", R: R });
shnSpot(R.x - 4.6, 4.5, 1.8, "The bell for the Fourteenth Room", "pull its cord", function () {
if (R.open)
return;
if (!R.fourteen) {
shnSfx("bell", { f: 880 });
setStatus("🔔 It swings, but nothing answers. <b>Wait until it rings by itself.</b>");
return;
}
shnSfx("unlock");
shnRoomDone(R, "🔔 You pull the cord of the bell that rang for a room that isn't there. Far below, a door opens: the servants' stair, down into the cellars. Something is coming up it. No: only the cold.");
}, 0);
for (var s = 0; s < 10; s++) {
var st = wBox(1.8, 0.2, 0.7, shnLam(0x5A5650, { map: "stone" }), 2.8, 0.1 + s * 0.0, -9 - s * 0.0, g);
st.position.set(2 + Math.cos(s * 0.6) * 1.2, 0.1, -10 + Math.sin(s * 0.6) * 1.2);
st.rotation.y = -s * 0.6;
}
wCyl(0.2, 0.2, R.h, shnLam(0x5A5650, { map: "stone" }), 2, R.h / 2, -10, g, 8);
shnSolid(R.x + 2, -10, 1, 1, -2, 8);
shnCandelabrum(R, g, 4.5, 6, false);
shnWardrobe(R, g, 5, 0, -Math.PI / 2);
R.hint = "Watch the board. One bell rings for a room that is not in the house.";
},
function (R, g) {
var ck = shnLam(0x4A3420, { map: "boards" });
for (var r = 0; r < 3; r++)
for (var c = 0; c < 5; c++) {
var x = -8 + r * 8, z = -12 + c * 6;
var k = wCyl(1, 1, 1.8, ck, x, 1.05, z, g, 12);
k.rotation.z = Math.PI / 2;
wCyl(1, 1, 1.8, ck, x, 3.0, z, g, 12).rotation.z = Math.PI / 2;
shnSolid(R.x + x, z, 2.2, 2.2, -2, 4);
}
SHN.fx.push({ k: "drip", R: R, t: 0 });
R.rats = [];
for (var q = 0; q < (SHN.lite ? 3 : 6); q++) {
var rt = wBox(0.25, 0.12, 0.12, shnGlowM(0x1A1410), 0, 0.08, 0, g);
rt.userData.keep = 1;
R.rats.push({ m: rt, a: q, r: 3 + q, cx: -4 + q, cz: 4 - q });
}
SHN.fx.push({ k: "rats", R: R });
var nx = -12.6, nz = -17, bricks = new THREE.Group();
bricks.position.set(nx, 0, nz);
g.add(bricks);
bricks.userData.keep = 1;
for (var y = 0; y < 8; y++)
for (var b = 0; b < 4; b++)
wBox(0.2, 0.24, 0.55, shnLam(0x5A2E24), 0, 0.15 + y * 0.26, -0.9 + b * 0.6 + (y % 2) * 0.3, bricks);
R.enter = function () { if (!R.open)
shnSfx("jingle", { loop: 1 }); };
shnTrig(R, -10, -15, 4, function () { setStatus("🔔 A faint <b>jingle of little bells</b>, from inside the wall."); });
shnSpot(R.x + nx + 1, nz, 1.8, "A niche, bricked up not long ago", "pull out the loose brick", function () {
if (R.open)
return;
bricks.visible = false;
shnSfx("jingle", { stop: 1 });
shnSfx("thud");
var sk = shnFig(0xD8D0B8);
sk.position.set(nx - 0.4, 0, nz);
sk.rotation.y = Math.PI / 2;
g.add(sk);
var cap = wCone(0.2, 0.35, shnLam(0xC82A2A), 0, 1.95, 0, sk, 6);
wSph(0.05, shnPh(0xE8C83A, 80), 0, 2.15, 0, sk, 6);
shnRoomDone(R, "🃏 The bricks come away. In the niche, chained to the wall, sits a skeleton in a jester's cap of bells. Under it, scratched in the stone: <i>'For the love of God, Montresor!'</i> And then, as Poe wrote: <i>'In pace requiescat!'</i>");
}, 0);
shnCandelabrum(R, g, 10, 14, false);
shnWardrobe(R, g, 12, -6, -Math.PI / 2);
R.hint = "Listen for the bells in the wall.";
},
function (R, g) {
var st = shnLam(0x6A665E, { map: "stone" });
R.lids = [];
for (var i = 0; i < 8; i++) {
var x = i % 2 ? 5 : -5, z = -10 + ((i / 2) | 0) * 6;
wBox(1.4, 0.9, 2.6, st, x, 0.45, z, g);
var lid = wBox(1.5, 0.15, 2.7, st, x, 0.98, z, g);
lid.userData.keep = 1;
R.lids.push(lid);
var ef = shnFig(0x8A867E);
ef.rotation.x = -Math.PI / 2;
ef.position.set(x, 1.06, z + 0.9);
ef.scale.setScalar(0.8);
lid.add(ef);
ef.position.set(0, 0.08, 0.9);
ef.userData.keep = 1;
shnSolid(R.x + x, z, 1.6, 2.8, -2, 1.2);
}
shnTrig(R, -5, 2, 3, function () { var L = R.lids[4]; SHN.fx.push({ k: "slide", m: L, dx: 0.6, t: 0 }); shnSfx("grind"); setStatus("⚰️ Stone grinds on stone. Beside you, a coffin lid is <b>sliding open</b>, from the inside."); });
wBox(4, 1.2, 1.4, st, 0, 0.6, -13, g);
shnSolid(R.x, -13, 4.2, 1.6, -2, 1.4);
R.skull = wSph(0.18, shnLam(0xD8D0B8), -R.w / 2 + 0.2, 1.1, -12.5, g, 10);
shnCandelabrum(R, g, 0, -11.5);
shnWardrobe(R, g, 9, 8, -Math.PI / 2);
shnWardrobe(R, g, -9, 6, Math.PI / 2);
R.hint = "Light the candles on the altar.";
},
function (R, g) {
var n = 7, L = R.d / n;
R.cl = null;
R.ch = [];
SHN_MASQUE.forEach(function (c, i) {
var z = R.d / 2 - L * (i + 0.5), col = c[0], wm = shnLam(col === 0x0A0808 ? 0x0A0808 : col);
[-1, 1].forEach(function (s) { var p = new THREE.Mesh(new THREE.PlaneGeometry(L, R.h), wm); p.position.set(s * (R.w / 2 - 0.05), R.h / 2, z); p.rotation.y = -s * Math.PI / 2; g.add(p); });
if (i < n - 1) {
var zz = z - L / 2;
wBox(R.w / 2 - 2, R.h, 0.4, wm, -(R.w / 4 + 1), R.h / 2, zz, g);
wBox(R.w / 2 - 2, R.h, 0.4, wm, (R.w / 4 + 1), R.h / 2, zz, g);
wBox(4, R.h - 4, 0.4, wm, 0, R.h - (R.h - 4) / 2, zz, g);
shnSolid(R.x - (R.w / 4 + 1), zz, R.w / 2 - 2, 0.6, -2, 10);
shnSolid(R.x + (R.w / 4 + 1), zz, R.w / 2 - 2, 0.6, -2, 10);
}
var gc = i === 6 ? 0xA00A0A : col;
wBox(0.1, 3, 1.6, shnGlowM(gc), R.w / 2 - 0.1, 3.5, z, g);
wBox(0.1, 3, 1.6, shnGlowM(gc), -R.w / 2 + 0.1, 3.5, z, g);
for (var dn = 0; dn < (SHN.lite ? 1 : 3); dn++) {
var dc = shnFig(0x1A1A1A);
dc.position.set(-4 + dn * 4, 0, z + (dn - 1) * 2);
dc.rotation.y = dn * 2;
g.add(dc);
}
R.ch.push({ z: z, col: gc });
});
R.cl = shnFlameLight(0xFFFFFF, 1.8, 26, 0, 4, R.d / 2 - L / 2, g, true);
var ck = new THREE.Group();
ck.position.set(0, 0, -R.d / 2 + 1.2);
g.add(ck);
var eb = shnPh(0x0A0606, 80);
wBox(1.4, 4.2, 0.8, eb, 0, 2.1, 0, ck);
wCyl(0.55, 0.55, 0.06, shnLam(0xD8C8A0), 0, 3.4, 0.42, ck, 20).rotation.x = Math.PI / 2;
var pe = wBox(0.06, 1.4, 0.04, shnPh(0xB89A3A, 90), 0, 1.7, 0.41, ck);
pe.userData.keep = 1;
SHN.fx.push({ k: "pend", m: pe });
R.pend = pe;
shnSolid(R.x, -R.d / 2 + 1.2, 1.8, 1.2, -2, 5);
R.hint = "Reach the ebony clock in the black room, and stop it before the hour strikes.";
R.enter = function (back) { R.clock = back || R.open ? 0 : 75; if (!back && !R.open)
setStatus("🕰️ <b>The Seven Chambers.</b> Far ahead, in the black room, the ebony clock ticks. When it strikes the hour, the dancers freeze, and <b>something masked walks among them</b>. You have about a minute."); };
SHN.fx.push({ k: "masque", R: R });
shnSpot(R.x, -R.d / 2 + 2.4, 1.8, "The ebony clock", "stop its pendulum", function () { if (R.open)
return; R.clock = 0; R.pend.visible = false; shnSfx("bell", { f: 110 }); shnRoomDone(R, "🕰️ You catch the great brass pendulum. The clock stops, one tick before the hour. In the scarlet light, all through the seven rooms, the dancers turn their heads to look at you."); }, 0);
},
function (R) {
shnSfx("bell", { f: 98 });
shnSfx("bell", { f: 98, delay: 1.6 });
shnSfx("bell", { f: 98, delay: 3.2 });
var M = shnFig(0xE8E4DC);
M.scale.setScalar(1.15);
var P = camera.position;
M.position.set(P.x - SHN.base - R.x, 0, P.z - 3);
R.g.add(M);
setStatus("🎭 <b>The clock strikes.</b> A tall figure in a shroud, masked like a corpse, stands right in front of you. <i>'And Darkness and Decay and the Red Death held illimitable dominion over all.'</i>");
setTimeout(function () { shnVeil(0.8, function () { if (M.parent)
M.parent.remove(M); camera.position.set(SHN.base + R.x, 1.72, R.d / 2 - 2.2); yaw = 0; R.clock = 75; setStatus("🔵 You are back in the blue room. The clock ticks again. Run."); }); }, 2200);
},
function (R, g) {
for (var i = 0; i < (SHN.lite ? 6 : 12); i++) {
var r = wRand(1300 + i), x = -5 + r() * 10, z = -14 + i * 2.4;
if (Math.abs(x) < 1.4)
x += x < 0 ? -1.6 : 1.6;
var sh = new THREE.Mesh(new THREE.SphereGeometry(0.8, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), shnLam(0xB8B4A8));
sh.scale.set(1, 1.4 + r(), 1);
sh.position.set(x, 0, z);
g.add(sh);
sh.userData.keep = 1;
if (i % 4 === 1)
SHN.fx.push({ k: "breathe", m: sh, t: r() * 6 });
shnSolid(R.x + x, z, 1.6, 1.6, -2, 2);
}
for (var f = 0; f < 4; f++) {
var fm = shnFig(0x3A3430);
fm.position.set(f % 2 ? 5.5 : -5.5, 0, 10 - f * 5);
g.add(fm);
}
var rc = new THREE.Group();
rc.position.set(4, 0, 13);
rc.userData.keep = 1;
g.add(rc);
wBox(0.7, 0.08, 0.7, shnLam(0x3A2416), 0, 0.5, 0, rc);
wBox(0.7, 1.1, 0.08, shnLam(0x3A2416), 0, 1, -0.32, rc);
SHN.fx.push({ k: "rockh", m: rc });
var rope = wCyl(0.04, 0.04, R.h - 1.2, shnLam(0x8A7A5A), 0, R.h / 2 + 0.6, -R.d / 2 + 2.4, g, 5);
rope.userData.keep = 1;
shnSpot(R.x, -R.d / 2 + 2.6, 1.8, "The bell rope", "pull it, hard", function () {
if (R.open)
return;
shnSfx("bell", { f: 82 });
shnSfx("bell", { f: 82, delay: 2.4 });
shnSfx("bell", { f: 82, delay: 4.8 });
shnLadyGone();
shnRoomDone(R, "🔔 <b>BONG.</b> Over your head the great bell of Ravensmoor tolls, and tolls, and tolls. The Grey Lady's keening breaks off. The roof hatch at the end swings open on the storm.");
}, 0);
shnCandelabrum(R, g, -3, 6, false);
shnWardrobe(R, g, -6, -4, Math.PI / 2);
shnWardrobe(R, g, 6, 2, -Math.PI / 2);
R.hint = "Ring the bell. The rope hangs at the far end.";
},
function () {
var H = SHN.houseRun, ms = H ? Date.now() - H.t0 : 0;
shnVeil(1.2, function () {
var R = SHN.room;
if (R && R.g)
R.g.visible = false;
SHN.room = null;
shnLadyGone();
if (SHN.outside)
SHN.outside.forEach(function (o) { o.visible = true; });
SHN.zone = "manor";
var A = SHN_AT.manor;
camera.position.set(SHN.base + A.x, shnGround(A.x, A.z + 19, 1e4) + 1.72, A.z + 19);
yaw = Math.PI;
pitch = 0;
SHN.storm.t = 0.5;
shnSfx("bell", { f: 82, delay: 0.4 });
SHN.houseRun = null;
var m = Math.floor(ms / 60000), s = Math.floor(ms / 1000) % 60;
shnReward("house", "🏚️ <b>You escaped Ravensmoor House</b> in " + m + " min " + s + " s" + (H && H.caught ? ", caught " + H.caught + " time" + (H.caught === 1 ? "" : "s") : ", never caught") + ". Behind you every window is dark, but one, in the attic.");
if (ms > 60000 && typeof cityRpc === "function" && typeof signedIn === "function" && signedIn())
cityRpc("samhain_escape", { p_ms: Math.round(ms) }).then(function () { }, function () { });
});
},
function (g, x, y, z, s) {
var gh = new THREE.Group();
gh.position.set(x, y, z);
gh.scale.setScalar(s || 1);
g.add(gh);
gh.userData.keep = 1;
var wm = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, emissive: 0x3A3A4A });
wSph(0.45, wm, 0, 0.5, 0, gh, 14);
var sk = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 0.6, 14, 1, true), wm);
sk.position.y = 0.2;
gh.add(sk);
[-0.15, 0.15].forEach(function (o) { var e = wSph(0.09, shnGlowM(0x101018), o, 0.6, 0.38, gh, 8); e.scale.y = 1.3; wSph(0.03, shnGlowM(0xFFFFFF), o + 0.03, 0.65, 0.46, gh, 5); });
var m = wSph(0.08, shnGlowM(0xFF6A9A), 0, 0.38, 0.42, gh, 8);
m.scale.set(1.6, 0.7, 0.5);
[-1, 1].forEach(function (k) { wSph(0.12, wm, k * 0.5, 0.35, 0.1, gh, 8); });
SHN.fx.push({ k: "bob", m: gh });
return gh;
},
function (R, g) {
var sofa = new THREE.Group();
sofa.position.set(-10, 0, 6);
sofa.rotation.y = 0.15;
g.add(sofa);
wBox(5, 1, 2, shnLam(0xFF3AB8), 0, 0.5, 0, sofa);
wBox(5, 1.4, 0.5, shnLam(0xFF3AB8), 0, 1.2, -0.8, sofa);
shnSolid(R.x - 10, 6, 5.4, 2.4, -2, 1.5);
var tub = new THREE.Group();
tub.position.set(10, 0, -8);
g.add(tub);
var tb = wCyl(1.1, 0.9, 1.1, shnPh(0xFFFFFF, 90), 0, 0.75, 0, tub, 16);
tb.scale.z = 1.9;
wCyl(1, 1, 0.05, shnPh(0x5AD8FF, 90), 0, 1.2, 0, tub, 16).scale.z = 1.85;
shnSolid(R.x + 10, -8, 2.4, 4.2, -2, 1.4);
var cup = new THREE.Group();
cup.position.set(-13.2, 0, -10);
g.add(cup);
wBox(2.4, 4.6, 1.2, shnLam(0x2AE84A), 0, 2.3, 0, cup);
wBox(0.05, 4, 0.05, shnLam(0x1A1A1A), 0, 2.3, 0.62, cup);
shnSolid(R.x - 13.2, -10, 2.6, 1.6, -2, 5);
for (var s = 0; s < 10; s++) {
wBox(4, 0.4 * (s + 1), 0.8, shnLam(SHN_BRIGHT[s % 7]), 9, 0.2 * (s + 1), 10 - s * 0.8, g);
}
shnSolid(R.x + 9, 6.4, 4.4, 8.4, -2, 5);
var pot = new THREE.Group();
pot.position.set(0, 0, -4);
g.add(pot);
wSph(1.4, shnPh(0x1AB8FF, 80), 0, 1.4, 0, pot, 16);
var sp = wCyl(0.15, 0.3, 1.6, shnPh(0x1AB8FF, 80), 1.6, 1.8, 0, pot, 8);
sp.rotation.z = -0.9;
wCyl(0.2, 0.6, 0.4, shnPh(0xFFE01A, 80), 0, 2.9, 0, pot, 10);
shnSolid(R.x, -4, 3, 3, -2, 3);
var sk = shnFig(0xFFFFFF);
sk.position.set(-4, 0, 10);
sk.userData.keep = 1;
g.add(sk);
SHN.fx.push({ k: "dance", m: sk });
var ch = new THREE.Group();
ch.position.set(0, R.h - 0.6, 4);
g.add(ch);
for (var b = 0; b < 10; b++)
wSph(0.2, shnGlowM(SHN_BRIGHT[b % 7]), Math.cos(b / 10 * 6.28) * 1.5, 0, Math.sin(b / 10 * 6.28) * 1.5, ch, 8);
if (!SHN.lite)
[[-8, 5, 6, 0xFF3AB8], [8, 5, -6, 0x1AB8FF]].forEach(function (p) { var L = new THREE.PointLight(p[3], 1.2, 30, 2); L.position.set(p[0], p[1], p[2]); g.add(L); });
var at = [["behind the pink sofa", -10, 0.5, 4.2], ["in the bathtub", 10, 1.1, -8], ["on top of the green cupboard", -13.2, 4.7, -10], ["under the rainbow stairs", 9, 0.3, 13.4], ["on the chandelier", 0, R.h - 1.4, 4]];
at.forEach(function (A, i) {
var G = shnFriendGhost(g, A[1], A[2], A[3], 0.8);
SHN.kidsGhosts[i] = { g: G, got: false, where: A[0] };
shnSpot(R.x + A[1], A[3] + (i === 3 ? -2.2 : i === 2 ? 1.4 : i === 4 ? 0 : 0), i === 4 ? 2.6 : 2.2, "A friendly ghost " + A[0], "say BOO! (you found me!)", function () { shnGhostFound(i); }, 0);
});
var sg = wSign(["THE GIGGLING HOUSE", "find all five friendly ghosts!"], 5, 1.2, "#FFE01A", "#6A1AB8");
sg.position.set(0, 4.5, R.d / 2 - 0.2);
sg.rotation.y = Math.PI;
g.add(sg);
},
function (R, g) {
var steps = [[-14, 10, 0.5], [-14, 7.6, 1.0], [-14, 5.2, 1.5], [-14, 2.8, 2.0], [-14, 0, 2.5], [-14, -2.6, 3.0]];
steps.forEach(function (S, i) { wBox(4, S[2], 2.4, shnLam(SHN_BRIGHT[i % 7]), S[0], S[2] / 2, S[1], g); shnFloor(R.x + S[0], S[1], 4, 2.4, S[2]); });
wBox(10, 0.4, 6, shnLam(0xFFE01A), -14, 2.8, -7, g);
shnFloor(R.x - 14, -7, 10, 6, 3.0);
[-1, 1].forEach(function (k) { wBox(10, 1, 0.2, shnLam(0xFF3A3A), -14, 3.5, -7 + k * 3, g); });
var sl = wBox(2.2, 0.2, 12, shnPh(0xFF3AB8, 90), -6, 1.7, -7, g);
sl.rotation.x = 0;
sl.rotation.z = 0.26;
sl.position.set(-6.5, 1.6, -7);
sl.rotation.set(0, Math.PI / 2, 0.26);
shnSpot(R.x - 10, -7, 2, "The top of the slide", "whizz down the slide", function () { shnSlide(R); }, 3.0);
var bp = { x: -8, z: 10, w: 9, d: 7 };
wBox(bp.w + 0.6, 0.8, 0.3, shnLam(0x2AE84A), bp.x, 0.4, bp.z - bp.d / 2, g);
wBox(bp.w + 0.6, 0.8, 0.3, shnLam(0x2AE84A), bp.x, 0.4, bp.z + bp.d / 2, g);
wBox(0.3, 0.8, bp.d, shnLam(0x2AE84A), bp.x + bp.w / 2, 0.4, bp.z, g);
var nb = SHN.lite ? 260 : 700, geo = new THREE.SphereGeometry(0.14, 8, 6), inst = new THREE.InstancedMesh(geo, new THREE.MeshPhongMaterial({ shininess: 80 }), nb), o = new THREE.Object3D(), c = new THREE.Color(), r = wRand(77);
for (var i = 0; i < nb; i++) {
o.position.set(bp.x - bp.w / 2 + r() * bp.w, 0.1 + r() * 0.55, bp.z - bp.d / 2 + r() * bp.d);
o.updateMatrix();
inst.setMatrixAt(i, o.matrix);
c.setHex(SHN_BRIGHT[i % 7]);
inst.setColorAt(i, c);
}
inst.userData.noCull = true;
inst.userData.keep = 1;
g.add(inst);
var T = R.theatre = { x: 10, z: -6 };
var sc = new THREE.Mesh(new THREE.PlaneGeometry(14, 7.9), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
sc.position.set(T.x, 5.2, -R.d / 2 + 0.3);
g.add(sc);
sc.userData.keep = 1;
wBox(15, 8.8, 0.3, shnLam(0x7A1AD8), T.x, 5.2, -R.d / 2 + 0.12, g);
[-1, 1].forEach(function (k) { wBox(1.2, 10, 0.6, shnLam(0xE8203A), T.x + k * 8, 5, -R.d / 2 + 0.5, g); });
R.screen = shnScreenMake("kids", sc, "The Pumpkin Playhouse");
for (var row = 0; row < 4; row++)
for (var s = 0; s < 5; s++) {
var bb = wSph(0.6, shnLam(SHN_BRIGHT[(row + s) % 7]), T.x - 6 + s * 3, 0.35, -8 + row * 3.2, g, 10);
bb.scale.y = 0.55;
}
shnSpot(R.x + T.x, -4, 5.5, "The theatre", "sit down and watch (sound on)", function () { shnScreenSit("kids"); }, 0);
var sg = wSign(["THE PUMPKIN PLAYHOUSE", "soft play · the ball pit · the slide · the theatre"], 6, 1.3, "#7A1AD8", "#FFE01A");
sg.position.set(0, 7, R.d / 2 - 0.2);
sg.rotation.y = Math.PI;
g.add(sg);
if (!SHN.lite)
[[-12, 8, 0, 0xFFE01A], [10, 9, 0, 0xFF3AB8]].forEach(function (p) { var L = new THREE.PointLight(p[3], 1, 40, 2); L.position.set(p[0], p[1], p[2]); g.add(L); });
},
function (i) {
var G = SHN.kidsGhosts[i];
if (!G || G.got)
return;
G.got = true;
G.g.visible = false;
shnSfx("giggle");
shnSfx("pop");
var n = Object.keys(SHN.kidsGhosts).filter(function (k) { return SHN.kidsGhosts[k].got; }).length;
if (n >= 5) {
shnReward("ghosts", "👻 <b>You found all five friendly ghosts!</b> They come out to dance round you, giggling.");
setTimeout(function () { Object.keys(SHN.kidsGhosts).forEach(function (k) { SHN.kidsGhosts[k].got = false; SHN.kidsGhosts[k].g.visible = true; }); }, 20000);
}
else
setStatus("👻 <b>Boo! You found me!</b> giggles the ghost " + esc(G.where) + ". That's " + n + " of 5.");
},
function (i) {
var S = SHN.sweets[i];
if (!S || S.got)
return;
S.got = true;
S.g.visible = false;
shnSfx("pop");
var n = Object.keys(SHN.sweets).filter(function (k) { return SHN.sweets[k].got; }).length;
if (n >= SHN_SWEETS.length) {
shnReward("sweets", "🍬 <b>All thirteen sweets!</b> The candy trail is yours.");
setTimeout(function () { Object.keys(SHN.sweets).forEach(function (k) { SHN.sweets[k].got = false; SHN.sweets[k].g.visible = true; }); }, 60000);
}
else
setStatus("🍬 A giant sweet! " + n + " of " + SHN_SWEETS.length + " on the candy trail.");
},
function () {
var faces = [["😀", "A happy face"], ["😱", "A scary face"], ["😜", "A silly face"], ["🐱", "A cat face"], ["⭐", "Stars and a moon"]], b = "", fns = {};
faces.forEach(function (f, i) { b += worldBtn("f" + i, f[0] + " " + f[1], ""); fns["f" + i] = function () { worldCard(null); shnSfx("carve"); var d = shnData(); d.carved = f[1]; shnSave(); shnReward("carve", "🎃 You scoop out the seeds and carve <b>" + f[1].toLowerCase() + "</b>. Polly pops a candle inside and it glows!"); }; });
worldCard(worldFacts("🎃 The carving table", "Choose a face for your pumpkin", [], ["Long ago in Ireland and Scotland, people carved turnips and swedes into lanterns for Samhain. When families took the custom to America, they found pumpkins were bigger and easier to carve."]) + b, fns);
},
function (which) {
var S = SHN.state, own = S && S[which === "kids" ? "kids_films" : "drive_films"];
if (Array.isArray(own) && own.length)
return own.map(function (f) { return { src: String(f.src || f.url || ""), mins: Math.max(1, +f.mins || 22), t: String(f.t || f.title || "") }; }).filter(function (f) { return f.src; });
return (which === "kids" ? SHN_KIDS_FILMS : SHN_DRIVE_FILMS).map(function (f) { var c = typeof CIN_FILMS !== "undefined" && CIN_FILMS[f[0]]; return { src: f[0], mins: f[1], t: c ? c[0] + " (" + c[1] + ")" : f[0] }; });
},
function (S, a, b) {
var t = wTex(512, 288, function (x, W, H) {
x.fillStyle = "#140A1E";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#FF8A20";
x.lineWidth = 6;
x.strokeRect(10, 10, W - 20, H - 20);
x.fillStyle = "#FFB040";
x.textAlign = "center";
var fs = 30;
x.font = "bold 30px Georgia";
while (fs > 14 && x.measureText(a).width > W - 60) {
fs -= 2;
x.font = "bold " + fs + "px Georgia";
}
x.fillText(a, W / 2, H * 0.45);
x.font = "20px Georgia";
x.fillStyle = "#E8D8C8";
x.fillText(b, W / 2, H * 0.62);
});
if (S.idle && S.idle.dispose)
S.idle.dispose();
S.idle = t;
if (SHN_SCR.on !== S.which || !SHN_SCR.tex) {
S.mesh.material.map = t;
S.mesh.material.needsUpdate = true;
}
},
function () {
var V = SHN_SCR;
clearTimeout(V.wait);
V.ask = null;
if (V.vid) {
try {
V.vid.pause();
V.vid.removeAttribute("src");
V.vid.load();
}
catch (e) { }
}
if (V.tex)
V.tex.dispose();
var S = V.list[V.on];
if (S && S.idle) {
S.mesh.material.map = S.idle;
S.mesh.material.needsUpdate = true;
}
V.vid = null;
V.tex = null;
V.key = null;
V.on = null;
},
function (src) {
src = String(src || "").trim();
if (!src)
return { none: true };
if (/^https?:\/\//i.test(src)) {
var yt = src.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([\w-]{6,20})/i);
if (yt)
return { embed: "yt", id: yt[1], name: "YouTube" };
var vm = src.match(/vimeo\.com\/(?:video\/|channels\/[^/]+\/)?(\d{5,})/i);
if (vm)
return { embed: "vimeo", id: vm[1], name: "Vimeo" };
var ar = src.match(/archive\.org\/(?:details|embed)\/([^/?#]+)/i);
if (ar)
return { archive: decodeURIComponent(ar[1]) };
if (/^https?:\/\/(www\.)?dropbox\.com\//i.test(src))
return { file: src.replace(/^http:/i, "https:").replace(/([?&])dl=0/, "$1raw=1").replace(/^([^?]*)$/, "$1?raw=1") };
return { file: src.replace(/^http:/i, "https:") };
}
return { archive: src };
},
function (K, into) {
var s = Math.max(0, Math.floor(into || 0));
if (K.embed === "yt")
return typeof hytEmbed === "function" ? hytEmbed(K.id, null, s) : "https://www.youtube-nocookie.com/embed/" + K.id + "?autoplay=1&playsinline=1&rel=0" + (s ? "&start=" + s : "");
if (K.embed === "vimeo")
return "https://player.vimeo.com/video/" + K.id + "?autoplay=1" + (s ? "#t=" + s + "s" : "");
if (K.archive)
return "https://archive.org/embed/" + encodeURIComponent(K.archive) + "?autoplay=1" + (s ? "&start=" + s : "");
if (K.file)
return K.file;
return null;
},
function (which) {
var n = shnNowOn(which), K = n ? shnKind(n.f.src) : null;
if (n && K && (K.embed || SHN_SCR.ask === which) && typeof hallViewer === "function") {
var url = shnPlayerUrl(K, n.into), page = shnPageUrl(K);
if (url) {
if (SHN_SCR.vid)
SHN_SCR.vid.muted = true;
shnMusicDuck(true);
hallViewer("🎬 " + (n.f.t || "Tonight's film") + " · " + (which === "drive" ? "the Samhain Drive-In" : "the Pumpkin Playhouse"), url, "Playing in step with the screen. Close (or Esc) to go back" + (K.embed === "yt" ? ". If YouTube says it can't play here (a film bought on YouTube, for one), the Keeper needs a different copy." : "."), { link: page, onClose: function () { shnMusicDuck(false); } });
return;
}
}
SHN_SCR.sound = !SHN_SCR.sound;
if (SHN_SCR.vid)
SHN_SCR.vid.muted = !SHN_SCR.sound;
setStatus(SHN_SCR.sound ? "🔊 <b>Sound on.</b> Now showing: <b>" + esc(n ? n.f.t : "") + "</b>. (Press E here again for quiet.)" : "🔈 Sound off.");
if (SHN_SCR.sound)
shnMusicDuck(true);
else
shnMusicDuck(false);
},
function () {
if (SHND.at)
return SHND.at;
if (typeof ATLC === "undefined" || !ATLC || typeof atlGaps !== "function")
return null;
var G = atlGaps(1920, 60, 8), gap = G[15] || G[14] || G[11];
if (!gap)
return null;
var a = (gap.a0 + gap.a1) / 2, r = 1975, x = ATLC.x + Math.cos(a) * r, z = ATLC.z + Math.sin(a) * r, y = (typeof terrainY === "function") ? terrainY(x, z) : 0;
return (SHND.at = { x: x, z: z, y: y, a: a });
},
function () {
var A = shnDriveSpot();
if (!A)
return;
var g = new THREE.Group();
g.position.set(A.x, A.y, A.z);
g.rotation.y = -A.a + Math.PI / 2;
scene.add(g);
SHND.g = g;
var tar = new THREE.Mesh(new THREE.PlaneGeometry(90, 80), new THREE.MeshLambertMaterial({ color: 0x1A1A1E }));
tar.rotation.x = -Math.PI / 2;
tar.position.set(0, 0.06, 0);
g.add(tar);
for (var row = 0; row < 5; row++) {
var z = -18 + row * 12;
wBox(80, 0.12, 0.4, new THREE.MeshLambertMaterial({ color: 0xE8E0C8 }), 0, 0.1, z - 4, g);
for (var p = 0; p < 9; p++) {
var px = -36 + p * 9;
wBox(0.14, 1.2, 0.14, new THREE.MeshLambertMaterial({ color: 0x5A5A5A }), px, 0.6, z, g);
wBox(0.4, 0.3, 0.2, new THREE.MeshPhongMaterial({ color: 0x8A8A8A, shininess: 60 }), px, 1.3, z, g);
}
}
var steel = new THREE.MeshPhongMaterial({ color: 0x3A3A3A, shininess: 30 });
[-17, -8, 8, 17].forEach(function (o) { wBox(0.8, 22, 0.8, steel, o, 11, -36, g); });
wBox(36, 17, 0.6, new THREE.MeshLambertMaterial({ color: 0x2A2A2A }), 0, 13, -36.6, g);
var sc = new THREE.Mesh(new THREE.PlaneGeometry(32, 18), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
sc.position.set(0, 13, -36.2);
g.add(sc);
SHN_SCR.list.drive = null;
shnScreenMake("drive", sc, "the Samhain Drive-In");
wBox(16, 4.5, 8, new THREE.MeshLambertMaterial({ color: 0x2A1A3A }), 0, 2.25, 30, g);
wBox(16.4, 0.4, 8.4, new THREE.MeshLambertMaterial({ color: 0xFF6A00 }), 0, 4.6, 30, g);
wBox(10, 2, 0.1, new THREE.MeshBasicMaterial({ color: 0xFFE8A0 }), 0, 2, 25.95, g);
var sign = wSign(["SAMHAIN DRIVE-IN", "horror under the stars · grown-ups · tune in at your post"], 14, 3.4, "#1A0A2A", "#FF9A2A");
sign.position.set(0, 9, 30);
sign.rotation.y = Math.PI;
g.add(sign);
wBox(0.5, 7, 0.5, steel, -5, 3.5, 30.4, g);
wBox(0.5, 7, 0.5, steel, 5, 3.5, 30.4, g);
SHND.bulbs = [];
for (var b = 0; b < 28; b++) {
var bm = new THREE.MeshBasicMaterial({ color: 0xFFB040 });
var bu = wSph(0.16, bm, -7 + (b % 14) * 1.08, b < 14 ? 11 : 7, 29.7, g, 6);
SHND.bulbs.push(bm);
}
var gl = wGlow(0x8AA0FF, 40, 0.12);
gl.position.set(0, 13, -34);
g.add(gl);
if (typeof nightGlowSpot === "function") {
var w = new THREE.Vector3(0, 9, 28);
g.localToWorld(w);
try {
nightGlowSpot("samhain-drivein", { x: w.x, y: w.y, z: w.z, col: 0xFF9A40, k: 2, r: 30, pri: 0.6 });
}
catch (e) { }
}
},
function () {
var A = SHN_AU;
if (A.ctx) {
if (A.ctx.state === "suspended")
A.ctx.resume().catch(function () { });
return A.ctx;
}
try {
var C = window.AudioContext || window.webkitAudioContext;
if (!C)
return null;
A.ctx = new C();
}
catch (e) {
return null;
}
var c = A.ctx;
A.out = c.createGain();
A.out.gain.value = 0.9;
A.out.connect(c.destination);
try {
var n = Math.round(c.sampleRate * 2.6), ir = c.createBuffer(2, n, c.sampleRate);
for (var ch = 0; ch < 2; ch++) {
var d = ir.getChannelData(ch);
for (var i = 0; i < n; i++)
d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.6);
}
A.rev = c.createConvolver();
A.rev.buffer = ir;
var rg = c.createGain();
rg.gain.value = 0.35;
A.rev.connect(rg);
rg.connect(A.out);
}
catch (e) {
A.rev = null;
}
A.music = c.createGain();
A.music.gain.value = 0;
A.music.connect(A.out);
if (A.rev)
A.music.connect(A.rev);
var wake = function () { if (A.ctx && A.ctx.state === "suspended")
A.ctx.resume().catch(function () { }); };
addEventListener("pointerdown", wake, { passive: true });
addEventListener("keydown", wake);
return c;
},
function (kind, o) {
o = o || {};
var c = shnAc();
if (!c)
return;
var A = SHN_AU, t = c.currentTime + (o.delay || 0), D = A.out, R = A.rev || A.out;
if (o.stop) {
var L = A.loops[kind];
if (L) {
try {
L.stop();
}
catch (e) { }
delete A.loops[kind];
}
return;
}
try {
switch (kind) {
case "thunder":
var h = shnNoiseHit(c, D, t, 3.4, "lowpass", 260, 0.7, 0.9, 0.08);
h.f.frequency.exponentialRampToValueAtTime(70, t + 3.4);
shnNoiseHit(c, R, t + 0.05, 1.2, "lowpass", 900, 0.5, 0.35, 0.02);
break;
case "strike":
shnNoiseHit(c, D, t, 0.25, "highpass", 2500, 0.7, 0.25, 0.005);
shnTone(c, D, "sine", 320, t + 0.05, 0.05, 0.05, 0.4, 180);
break;
case "unlock":
shnNoiseHit(c, R, t, 0.08, "bandpass", 1800, 3, 0.4);
shnNoiseHit(c, R, t + 0.22, 0.12, "bandpass", 900, 3, 0.5);
shnTone(c, R, "triangle", 140, t + 0.22, 0.01, 0.2, 0.3, 90);
break;
case "door":
shnNoiseHit(c, R, t, 0.9, "bandpass", 420, 6, 0.25, 0.2);
shnTone(c, R, "sawtooth", 95, t, 0.3, 0.05, 0.8, 140);
break;
case "slam":
shnNoiseHit(c, R, t, 0.6, "lowpass", 500, 0.8, 1.0, 0.003);
shnTone(c, R, "sine", 60, t, 0.003, 0.8, 0.5, 40);
break;
case "rattle":
for (var r = 0; r < 5; r++)
shnNoiseHit(c, R, t + r * 0.07, 0.05, "bandpass", 1200, 4, 0.3);
break;
case "creak":
shnTone(c, R, "sawtooth", 180, t, 0.2, 0.06, 0.9, 120, 0.2);
break;
case "groan":
shnTone(c, R, "sawtooth", 55, t, 1.2, 0.15, 3, 38, 1.2);
shnTone(c, R, "sawtooth", 58, t + 0.3, 1.2, 0.1, 3, 40, 1);
break;
case "whisper":
for (var w = 0; w < 6; w++) {
var x = shnNoiseHit(c, R, t + w * 0.33 + Math.random() * 0.1, 0.3, "bandpass", 1400 + Math.random() * 1600, 8, 0.12, 0.08);
}
break;
case "keen":
if (A.loops.keen)
break;
var ko = c.createOscillator(), kg = c.createGain(), kv = c.createOscillator(), kvg = c.createGain();
ko.type = "sine";
ko.frequency.value = 880;
kv.frequency.value = 5.5;
kvg.gain.value = 22;
kv.connect(kvg);
kvg.connect(ko.frequency);
ko.connect(kg);
kg.connect(R);
kg.connect(D);
kg.gain.setValueAtTime(0.0001, t);
kg.gain.exponentialRampToValueAtTime(0.12, t + 1.5);
var kl = c.createOscillator();
kl.frequency.value = 0.18;
var klg = c.createGain();
klg.gain.value = 260;
kl.connect(klg);
klg.connect(ko.frequency);
ko.start(t);
kv.start(t);
kl.start(t);
A.loops.keen = { stop: function () { var n = c.currentTime; kg.gain.cancelScheduledValues(n); kg.gain.setValueAtTime(kg.gain.value, n); kg.gain.exponentialRampToValueAtTime(0.0001, n + 1.2); ko.stop(n + 1.3); kv.stop(n + 1.3); kl.stop(n + 1.3); } };
break;
case "scream":
shnTone(c, R, "sawtooth", 900, t, 0.05, 0.25, 1.4, 500, 0.3);
shnTone(c, R, "square", 1320, t, 0.05, 0.08, 1.2, 760, 0.3);
shnNoiseHit(c, D, t, 1.2, "bandpass", 2200, 2, 0.3, 0.03);
break;
case "giggle":
for (var gg = 0; gg < 6; gg++)
shnTone(c, R, "triangle", 620 + gg % 2 * 140, t + gg * 0.12, 0.01, 0.12, 0.09, 500);
break;
case "bell":
var bf = o.f || 220;
[1, 2.4, 3, 4.2, 5.4].forEach(function (k, i) { shnTone(c, R, "sine", bf * k, t, 0.004, 0.3 / (i + 1), 4.5 / (1 + i * 0.5)); });
break;
case "caw":
[0, 0.28].forEach(function (dd) { var cw = shnNoiseHit(c, R, t + dd, 0.22, "bandpass", 1100, 5, 0.5, 0.02); shnTone(c, R, "sawtooth", 620, t + dd, 0.02, 0.1, 0.2, 420); });
break;
case "thud":
shnTone(c, R, "sine", 90, t, 0.005, 0.6, 0.35, 50);
shnNoiseHit(c, R, t, 0.15, "lowpass", 600, 1, 0.4);
break;
case "tear":
shnNoiseHit(c, R, t, 0.7, "highpass", 1600, 0.8, 0.4, 0.03);
break;
case "grind":
shnNoiseHit(c, R, t, 2.6, "lowpass", 300, 3, 0.5, 0.4);
shnTone(c, R, "sawtooth", 42, t, 0.5, 0.1, 2, 36, 0.5);
break;
case "scrape":
shnNoiseHit(c, R, t, 0.6, "bandpass", 700, 4, 0.4, 0.05);
break;
case "pop":
shnTone(c, D, "sine", 520, t, 0.005, 0.3, 0.15, 980);
break;
case "whee":
shnTone(c, D, "triangle", 400, t, 0.05, 0.2, 1.1, 1200, 0.2);
break;
case "carve":
for (var cv = 0; cv < 4; cv++)
shnNoiseHit(c, D, t + cv * 0.2, 0.15, "bandpass", 900, 2, 0.25);
break;
case "heart":
var hb = function (tt, k) { shnTone(c, R, "sine", 58, tt, 0.01, 0.55 * k, 0.18, 40); shnTone(c, R, "sine", 52, tt + 0.22, 0.01, 0.4 * k, 0.2, 36); };
hb(t, o.loud ? 1.6 : (o.k || 1));
break;
case "drip":
shnTone(c, R, "sine", 1900, t, 0.002, 0.05 * (o.k || 1), 0.12, 900);
break;
case "gallop":
[0, 0.11, 0.24].forEach(function (dd) { shnTone(c, D, "sine", 70, t + dd, 0.003, 0.4 * (o.k || 1), 0.12, 45); shnNoiseHit(c, D, t + dd, 0.06, "lowpass", 500, 1, 0.2 * (o.k || 1)); });
break;
case "smash":
shnNoiseHit(c, R, t, 0.5, "lowpass", 900, 0.8, 0.9, 0.003);
shnTone(c, R, "sine", 80, t, 0.003, 0.7, 0.4, 40);
break;
case "musicbox":
if (A.loops.musicbox)
break;
A.loops.musicbox = shnLoopPiece("box", 0.07);
break;
case "jingle":
if (A.loops.jingle)
break;
var jt = { on: true };
(function ring() { if (!jt.on)
return; var n = c.currentTime; for (var j = 0; j < 4; j++)
shnTone(c, R, "sine", 2400 + Math.random() * 900, n + j * 0.06, 0.002, 0.02, 0.25); setTimeout(ring, 1800 + Math.random() * 2500); })();
A.loops.jingle = { stop: function () { jt.on = false; } };
break;
case "step":
shnNoiseHit(c, R, t, 0.12, "lowpass", 420, 1, o.loud ? 0.35 : 0.18);
break;
}
}
catch (e) {
if (!A.warned) {
A.warned = true;
if (window.console)
console.warn("[samhain] sound", e);
}
}
},
function (c, dest, v, f, t, dur, vel) {
vel = vel || 1;
if (v === "organ") {
[1, 2, 3, 4, 6].forEach(function (k, i) { shnTone(c, dest, "sine", f * k, t, 0.03, 0.07 * vel / (i + 1), 0.25, null, Math.max(0.05, dur - 0.1)); });
}
else if (v === "reed") {
var o = shnTone(c, dest, "sawtooth", f, t, 0.02, 0.05 * vel, 0.12, null, Math.max(0.03, dur * 0.55));
}
else if (v === "choir") {
[0, -12].forEach(function (o2) { var ff = f * Math.pow(2, o2 / 12); shnTone(c, dest, "triangle", ff, t, 0.25, 0.06 * vel, 0.6, null, Math.max(0.1, dur - 0.3)); shnTone(c, dest, "sine", ff * 1.003, t, 0.3, 0.04 * vel, 0.6, null, Math.max(0.1, dur - 0.3)); });
}
else if (v === "whistle") {
shnTone(c, dest, "sine", f, t, 0.015, 0.08 * vel, 0.08, null, Math.max(0.03, dur * 0.8));
shnTone(c, dest, "sine", f * 2, t, 0.015, 0.01 * vel, 0.08, null, Math.max(0.03, dur * 0.8));
}
else if (v === "box") {
shnTone(c, dest, "sine", f * 1.004, t, 0.003, 0.12 * vel, 1.4);
shnTone(c, dest, "sine", f * 3.01, t, 0.002, 0.02 * vel, 0.5);
}
},
function (c, dest, P, t, speed) {
var u = 60 / P.bpm * P.unit / (speed || 1), T = t;
P.notes.forEach(function (n) { var d = n[1] * u; if (n[0] !== null) {
var ms = Array.isArray(n[0]) ? n[0] : [n[0]];
ms.forEach(function (m) { shnVoice(c, dest, P.voice, shnMidi(m), T, d, Array.isArray(n[0]) ? 0.7 : 1); });
} T += d; });
var len = T - t;
if (P.drone)
shnTone(c, dest, "sawtooth", shnMidi(P.drone), t, 0.5, 0.018, 1, null, Math.max(0.5, len - 1));
if (P.drone)
shnTone(c, dest, "sine", shnMidi(P.drone + 7), t, 0.5, 0.02, 1, null, Math.max(0.5, len - 1));
if (P.bass)
for (var b = 0; b < len / (u * 2); b++)
shnTone(c, dest, "triangle", shnMidi(P.bass), t + b * u * 2, 0.01, 0.07, u * 1.2);
if (P.drum)
for (var k = 0; k < len / (u * 3); k++) {
shnNoiseHit(c, dest, t + k * u * 3, 0.18, "lowpass", 160, 1, 0.25);
shnNoiseHit(c, dest, t + k * u * 3 + u * 2, 0.1, "lowpass", 300, 1, 0.1);
}
return T;
},
function (key, vol) {
var c = shnAc();
if (!c)
return { stop: function () { } };
var P = SHN_PIECES[key], g = c.createGain();
g.gain.value = vol;
g.connect(SHN_AU.rev || SHN_AU.out);
g.connect(SHN_AU.out);
var on = true, end = c.currentTime + 0.1;
(function go() { if (!on)
return; if (end - c.currentTime < 2)
end = shnPieceAt(c, g, P, end, 1); setTimeout(go, 800); })();
return { stop: function () { on = false; var n = c.currentTime; g.gain.setValueAtTime(g.gain.value, n); g.gain.exponentialRampToValueAtTime(0.0001, n + 0.6); setTimeout(function () { try {
g.disconnect();
}
catch (e) { } }, 900); } };
},
function (kind, say) {
var K = SHN_KEEP[kind], R = SHN.rules && SHN.rules[kind];
if (R && R.on === false) {
setStatus(say + " (The Keeper has paused rewards for this just now.)");
return;
}
shnKeep(kind);
var d = shnData();
d.done[kind] = (d.done[kind] || 0) + 1;
shnSave();
shnSfx("bell", { f: 660 });
var tail = K ? " <b>" + esc(K[2] + " " + K[1]) + "</b> is in your 🎒 Backpack." : "";
if (SHN.busy) {
setStatus(say + tail);
return;
}
SHN.busy = true;
var p = (typeof cityRpc === "function" && typeof signedIn === "function" && signedIn()) ? cityRpc("samhain_done", { p_kind: kind }) : Promise.resolve(null);
p.then(function (o) { SHN.busy = false; setStatus(say + tail + (o && o.gold ? " <b>+" + o.gold + " gold</b> from the Treasury." : "")); }).catch(function () { SHN.busy = false; setStatus(say + tail); });
},
function (i) {
var D = SHN_DOORS[i], d = shnData();
d.guised = d.guised || {};
var b = "", fns = {};
SHN_RHYMES.forEach(function (r, k) {
b += worldBtn("r" + k, "🎭 \"" + esc(r) + "\"", "");
fns["r" + k] = function () {
worldCard(null);
shnSfx("rattle");
d.guised[i] = 1;
shnSave();
var n = Object.keys(d.guised).length;
var say = "🚪 <b>" + esc(D.n) + "</b> opens the door a crack, then wide. " + esc(D.say) + " You get " + esc(D.give) + ".";
if (n >= SHN_DOORS.length && !d.guiseDone) {
d.guiseDone = 1;
shnSave();
shnReward("guise", say + " <b>You've guised at every door in Hollowmere!</b>");
}
else
setStatus(say + " (" + n + " of " + SHN_DOORS.length + " doors.)");
};
});
worldCard(worldFacts("🎭 Guising at " + D.n + "'s door", "On Samhain night children went door to door in masks and blackened faces (so the wandering dead would not know them), and sang or said a rhyme for a soul cake, nuts or apples.", [], []) + b, fns);
},
function () {
var B = SHN.bob = { x: 0, v: 1, tries: 3, t: 0, iv: null };
function html() {
return worldFacts("🍎 Bobbing for apples", "Hands behind your back! Bite when the apple floats into the gap.", [], []) +
"<div style='position:relative;height:34px;margin:10px 0;border-radius:17px;background:linear-gradient(90deg,#10202a,#20405a,#10202a)'>" +
"<div style='position:absolute;left:44%;width:12%;top:0;bottom:0;border:2px dashed #FFE08A;border-radius:12px'></div>" +
"<div id='shn-apple' style='position:absolute;top:5px;width:24px;height:24px;border-radius:50%;background:#C8201A;left:0'></div></div>" +
worldBtn("bite", "😬 Bite! (" + B.tries + " goes left)", "");
}
worldCard(html(), { bite: bite });
B.iv = setInterval(function () { var el = document.getElementById("shn-apple"); if (!el) {
clearInterval(B.iv);
return;
} B.t += 0.03; B.x = 0.5 + 0.46 * Math.sin(B.t * 2.6) * Math.cos(B.t * 0.7); el.style.left = "calc(" + (B.x * 100) + "% - 12px)"; }, 30);
function bite() {
var ok = Math.abs(B.x - 0.5) < 0.07;
shnSfx(ok ? "pop" : "scrape");
if (ok) {
clearInterval(B.iv);
worldCard(null);
shnReward("bob", "🍎 <b>Got it!</b> You come up soaked to the ears, a red apple in your teeth. They say if you sleep with it under your pillow, you'll dream of your true love.");
return;
}
B.tries--;
if (B.tries <= 0) {
clearInterval(B.iv);
worldCard(null);
setStatus("💦 Only a mouthful of cold water. Try again!");
return;
}
worldCard(html(), { bite: bite });
}
},
function () {
var b = worldBtn("light", "🏮 Light my turnip lantern from the fire", "") + worldBtn("talk", "💬 Talk with the fire keeper", "");
worldCard(worldFacts("🔥 The fire keeper of Tlachtga", "On Samhain every hearth in the land was put out, and lit again from the great fire on the Hill of Tlachtga.", [], [
"Samhain (say it SOW-in) is the old Gaelic feast at the end of harvest, from sunset on 31 October: the night the door between this world and the Otherworld stands open.",
"People left food out for the dead, laid a Dumb Supper in silence, and went guising in masks so the wandering spirits would pass them by.",
"Stingy Jack, they say, tricked the Devil and was turned away from heaven and hell both, with one ember of hellfire in a turnip to light his way. His lantern went into the ground with the Ravensmoors, under their chapel, 'behind the eyes of the dead'.",
"Halloween's pumpkins came later, in America, where pumpkins were easier to carve than turnips."
]) + b, { light: function () { worldCard(null); shnLightLantern(); }, talk: function () { worldCard(null); wTalk({ name: "The fire keeper of Tlachtga", persona: "The old keeper of the Samhain fire on the Hill of Tlachtga (a real hill in County Meath, Ireland, where the great Samhain fire was lit). Knows Samhain lore: the hearths relit from this fire, guising, soul cakes, the Dumb Supper, barmbrack, the púca, the Dullahan (the headless rider who carries his own head), the bean sidhe, Stingy Jack and his turnip lantern. Speaks slowly, warmly, a little eerily. If asked about Ravensmoor, warns of the Grey Lady and says Stingy Jack's lantern lies under the chapel 'behind the eyes of the dead', but not exactly where.", greet: "Sit by the fire a while, traveller. The dead are walking tonight." }); } });
},
function () {
if (SHN.lantern) {
setStatus("🏮 Your turnip lantern is already burning with the Samhain fire.");
return;
}
SHN.lantern = true;
shnSfx("strike");
shnReward("fire", "🏮 You hold your carved turnip to the great fire, and it takes the flame. <b>Your lantern burns with the Samhain fire</b>: it lights your way all night, and the dead let it pass.");
},
function () {
if (SHN.horse)
return SHN.horse;
var g = new THREE.Group(), blk = shnPh(0x0A0A0C, 40), cloak = shnLam(0x0A0A10, { ds: true });
var body = wCyl(0.55, 0.55, 2.2, blk, 0, 1.6, 0, g, 10);
body.rotation.x = Math.PI / 2;
var neck = wCyl(0.25, 0.35, 1.2, blk, 0, 2.3, 1.1, g, 8);
neck.rotation.x = -0.7;
var hd = wBox(0.35, 0.4, 0.9, blk, 0, 2.7, 1.6, g);
hd.rotation.x = 0.5;
var legs = [];
[[-0.35, 0.8], [0.35, 0.8], [-0.35, -0.8], [0.35, -0.8]].forEach(function (p) { var l = new THREE.Group(); l.position.set(p[0], 1.2, p[1]); g.add(l); wCyl(0.1, 0.08, 1.2, blk, 0, -0.6, 0, l, 6); legs.push(l); });
var rider = new THREE.Group();
rider.position.set(0, 2.3, -0.2);
g.add(rider);
wCyl(0.25, 0.4, 1.1, cloak, 0, 0.55, 0, rider, 8);
var cl = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.6, 10, 1, true), cloak);
cl.position.set(0, 0.4, -0.3);
rider.add(cl);
wBox(0.5, 0.1, 0.3, shnLam(0x2A0A0A), 0, 1.1, 0, rider);
var head = new THREE.Group();
head.position.set(0.5, 0.6, 0.4);
rider.add(head);
shnPumpkin(head, 0, 0, 0, 0.5, true, 0xD86A10);
var gl = wGlow(0xFF8A20, 1.6, 0.6);
gl.position.y = 0.2;
head.add(gl);
var light = new THREE.PointLight(0xFF7A20, 1.4, 18, 2);
light.position.set(0.5, 3.2, 0.6);
g.add(light);
SHN.G.add(g);
g.visible = false;
SHN.horse = { g: g, legs: legs, head: head };
return SHN.horse;
},
function () {
if (SHN.run)
return;
var H = shnHorseMake(), M = SHN_AT.mill, st = SHN_ROAD[1];
camera.position.set(SHN.base + st[0], shnGround(st[0], st[1], 1e4) + 1.72, st[1]);
yaw = Math.atan2(-(SHN_ROAD[2][0] - st[0]), -(SHN_ROAD[2][1] - st[1]));
H.g.position.set(M.x + 20, shnLand(M.x + 20, M.z - 20), M.z - 20);
H.g.visible = true;
SHN.run = { t: 0, sp: 4.4, trail: [], cd: 3, gal: 0 };
shnSfx("groan");
setStatus("🐴 <b>Hoofbeats, behind you.</b> A great black horse, and on it a rider with no head, his own head blazing in his hand. <b>Run for the church bridge!</b> He cannot cross the water.");
},
function (dt) {
var R = SHN.run;
if (!R)
return;
var H = SHN.horse, P = camera.position, lx = P.x - SHN.base, lz = P.z;
R.t += dt;
R.trail.push([R.t, lx, lz]);
while (R.trail.length && R.t - R.trail[0][0] > 3)
R.trail.shift();
if (R.cd > 0) {
R.cd -= dt;
return;
}
var a = R.trail[0], yourSp = a ? Math.hypot(lx - a[1], lz - a[2]) / Math.max(0.5, R.t - a[0]) : 4;
R.sp = Math.max(4.2, Math.min(11, yourSp * 0.9 + R.t * 0.02));
var g = H.g, dx = lx - g.position.x, dz = lz - g.position.z, d = Math.hypot(dx, dz);
g.position.x += dx / d * R.sp * dt;
g.position.z += dz / d * R.sp * dt;
g.position.y = shnLand(g.position.x, g.position.z);
g.rotation.y = Math.atan2(dx, dz);
H.legs.forEach(function (l, i) { l.rotation.x = Math.sin(R.t * 12 + i * 1.6) * 0.6; });
R.gal += dt;
if (R.gal > 0.42) {
R.gal = 0;
shnSfx("gallop", { k: Math.max(0.2, 1 - d / 60) });
}
var B = SHN_AT.bridge;
if (Math.hypot(lx - B.x, lz - B.z) < 9) {
SHN.run = null;
shnSfx("smash", { delay: 0.4 });
setTimeout(function () { if (SHN.horse)
SHN.horse.g.visible = false; }, 700);
shnReward("ride", "🎃 <b>You're over the bridge!</b> The Horseman rears at the water's edge, and hurls his blazing head. It smashes on the boards behind you: only a pumpkin. When you look back, horse and rider are gone.");
return;
}
if (d < 2.6 && !shnKeeper()) {
SHN.run = null;
shnSfx("smash");
shnVeil(0.9, function () {
if (SHN.horse)
SHN.horse.g.visible = false;
var M = SHN_AT.mill;
camera.position.set(SHN.base + M.x - 7, shnGround(M.x - 7, M.z + 7, 1e4) + 1.72, M.z + 7);
setStatus("💥 <b>The blazing head strikes you.</b> You wake in the road by the old mill, your hat gone, and a smashed pumpkin beside you. Try again: run straight for the church bridge.");
});
return;
}
if (R.t > 150) {
SHN.run = null;
H.g.visible = false;
setStatus("🌫️ The hoofbeats fade into the mist. He'll ride again.");
}
},
function () {
if (SHN.state && SHN.state.off && SHN.state.off.indexOf("house") >= 0 && !shnKeeper()) {
setStatus("🔒 <b>Ravensmoor House is shut</b> for now, by the Keeper.");
return;
}
worldCard(worldFacts("🏚️ Ravensmoor House", "Thirteen rooms. The freakiest house in Samhain Night.", [["Who for", "13 and up. It is very frightening: real darkness, sudden noises, lightning, things that follow you and things that chase you. (No strobe.)"], ["How", "Carry your candle through every room. Each far door opens only when you've done what that room asks. From the Nursery on, the Grey Lady hunts you: run for the next door, or hide in a wardrobe."], ["Younger dreamers", "Pumpkin Hollow, east of the village, is bright and friendly."]], []) +
worldBtn("go", "🕯️ Go in", "") + worldBtn("no", "Not tonight", ""), { go: function () { worldCard(null); SHN.houseRun = { t0: Date.now(), done: {}, at: 0, caught: 0 }; shnEnterRoom("hall"); }, no: function () { worldCard(null); } });
},
function (dt) {
var P = camera.position, lx = P.x - SHN.base, t = SHN.t, R = SHN.room;
SHN.fx.forEach(function (f) {
switch (f.k) {
case "spin":
f.m.rotation.y += dt * (f.sp || 0.4);
break;
case "spinx":
f.m.rotation.x += dt * (f.sp || 0.4);
break;
case "pend":
f.m.rotation.z = Math.sin(t * 2.4) * 0.28;
break;
case "swing":
f.m.rotation.z = Math.sin(t * 0.7) * f.amp;
f.m.rotation.x = Math.cos(t * 0.53) * f.amp * 0.6;
break;
case "rockh":
f.m.rotation.x = Math.sin(t * 1.9) * 0.16;
break;
case "breathe":
f.t += dt;
f.m.scale.y = f.m.scale.y * 0.98 + (1.5 + Math.sin(f.t * 0.9) * 0.12) * 0.02;
break;
case "bob":
f.ph = (f.ph || Math.random() * 6) + dt;
if (f.y0 === undefined)
f.y0 = f.m.position.y;
f.m.position.y = f.y0 + Math.sin(f.ph * 1.6) * 0.15;
f.m.rotation.y = Math.sin(f.ph * 0.5) * 0.5;
break;
case "dance":
f.m.rotation.y += dt * 2.2;
f.m.position.y = Math.abs(Math.sin(t * 4)) * 0.3;
break;
case "crows":
f.g.children.forEach(function (b) { var u = b.userData; u.a += dt * 0.35; b.position.set(Math.cos(u.a) * u.r, u.h + Math.sin(u.a * 2) * 1.5, Math.sin(u.a) * u.r); b.rotation.y = -u.a; if (u.w)
u.w.rotation.z = Math.sin(t * 7 + u.r) * 0.5; });
break;
case "run":
f.t += dt;
f.m.position.x += f.vx * dt;
if (f.t > 2.2 && f.m.parent) {
f.m.parent.remove(f.m);
f.dead = 1;
}
break;
case "slide":
f.t += dt;
if (f.t < 2.5)
f.m.position.x += f.dx * dt / 2.5;
break;
case "embers":
if (!f.pts) {
var n = SHN.lite ? 20 : 60;
f.pts = wPoints(n, function (i) { return [f.x, f.y, f.z]; }, 0xFFA040, 0.25 * f.s, true);
f.pts.material.blending = THREE.AdditiveBlending;
f.v = [];
for (var i = 0; i < n; i++)
f.v.push(Math.random() * 4);
SHN.G.add(f.pts);
}
var pa = f.pts.geometry.attributes.position;
for (var j = 0; j < pa.count; j++) {
f.v[j] += dt;
var ph = f.v[j] % 4;
pa.setXYZ(j, f.x + Math.sin(j * 1.7 + ph) * 0.9 * f.s, f.y + ph * 2.2 * f.s, f.z + Math.cos(j * 2.3 + ph) * 0.9 * f.s);
}
pa.needsUpdate = true;
break;
}
if (!R || f.R !== R)
return;
switch (f.k) {
case "eyes":
var w = new THREE.Vector3();
f.g.getWorldPosition(w);
var dxe = P.x - w.x, dze = P.z - w.z, a = Math.atan2(dxe, dze) - f.g.rotation.y;
f.eyes.forEach(function (e) { e.position.x = Math.max(-0.012, Math.min(0.012, Math.sin(a) * 0.02)); });
break;
case "watch":
f.m.rotation.y = Math.atan2(lx - R.x - f.m.position.x, P.z - f.m.position.z);
break;
case "dolls":
R.dolls.forEach(function (h) { var hw = new THREE.Vector3(); h.getWorldPosition(hw); h.rotation.y = Math.atan2(P.x - hw.x, P.z - hw.z); });
break;
case "creep":
var C = R.creep;
if (!C.m.visible)
break;
var cw = new THREE.Vector3();
C.m.getWorldPosition(cw);
var vx = cw.x - P.x, vz = cw.z - P.z, vl = Math.hypot(vx, vz) || 1, look = (-Math.sin(yaw) * vx - Math.cos(yaw) * vz) / vl;
if (look < 0.4) {
C.a += dt * 0.6;
C.m.position.z = Math.sin(C.a) * 6.5;
C.m.position.y = 0.4 + Math.abs(Math.sin(C.a * 1.7)) * 1.2;
}
break;
case "drip":
f.t -= dt;
if (f.t <= 0) {
f.t = 0.8 + Math.random() * 2;
shnSfx("drip", { k: 0.6 });
}
break;
case "rats":
R.rats.forEach(function (r) { r.a += dt * (0.8 + r.r * 0.1); r.m.position.set(r.cx + Math.cos(r.a) * r.r, 0.08, r.cz + Math.sin(r.a) * r.r * 0.6); r.m.rotation.y = -r.a; });
break;
case "bells":
R.ring -= dt;
R.bellM.forEach(function (b) { if (b.t > 0) {
b.t -= dt;
b.g.rotation.z = Math.sin(b.t * 14) * 0.35 * b.t / 2;
} });
if (R.fourteen)
R.fourteen = Math.max(0, R.fourteen - dt);
if (R.ring <= 0) {
R.ring = 2.5 + Math.random() * 3;
R.cnt = (R.cnt || 0) + 1;
var bi = R.cnt % 4 === 0 ? 11 : Math.floor(Math.random() * 11), B = R.bellM[bi];
B.t = 2;
shnSfx("bell", { f: 1300 + bi * 40 });
if (bi === 11) {
R.fourteen = 6;
if (!R.open)
setStatus("🔔 A bell is ringing on the board: the one marked <b>The Fourteenth Room</b>. Ravensmoor has thirteen.");
}
}
break;
case "mirror":
var M = R.me;
M.hist.push([t, lx - R.x, P.z, yaw]);
while (M.hist.length && t - M.hist[0][0] > 0.5)
M.hist.shift();
var h0 = M.hist[0];
if (h0) {
M.m.position.set(h0[1], 0, -R.d - h0[2]);
M.m.rotation.y = -h0[3];
}
break;
case "masque":
var Rm = R;
if (!Rm.open && Rm.clock > 0) {
Rm.clock -= dt;
if (Rm.clock <= 0) {
Rm.clock = -1;
shnMasqueChime(Rm);
}
}
var ci = Math.max(0, Math.min(6, Math.floor((Rm.d / 2 - P.z) / (Rm.d / 7)))), ch = Rm.ch[ci];
if (Rm.cl && ch) {
Rm.cl.L.position.z = ch.z;
Rm.cl.L.color.setHex(ch.col === 0x0A0808 ? 0xA00A0A : ch.col);
}
break;
}
});
SHN.fx = SHN.fx.filter(function (f) { return !f.dead; });
if (SHN.atticFig && SHN.figT !== undefined) {
SHN.figT -= dt;
if (SHN.figT <= 0) {
SHN.atticFig.visible = false;
SHN.figT = undefined;
}
}
},
function (dt) {
var R = SHN.room;
if (!R)
return;
var P = camera.position, lx = P.x - SHN.base;
if (R.k === "heart" && R.heartOn) {
var d = Math.hypot(lx - R.heartAt.x, P.z - R.heartAt.z);
R.hb = (R.hb || 0) - dt;
if (R.hb <= 0) {
R.hb = 0.55 + Math.min(1, d / 14) * 0.5;
shnSfx("heart", { k: Math.max(0.12, 1.3 - d / 9) });
}
}
if (R.walk) {
var S = R.stp || (R.stp = { x: lx, z: P.z });
if (Math.hypot(lx - S.x, P.z - S.z) > 1.5) {
S.x = lx;
S.z = P.z;
shnSfx("step", { delay: 0.32, loud: 1 });
}
}
if (R.trig)
R.trig.forEach(function (T) { if (!T.done && Math.hypot(lx - T.x, P.z - T.z) < T.r) {
T.done = true;
try {
T.fn();
}
catch (e) { }
} });
if (R.fake && R.fake.go && R.fake.z > -46) {
R.fake.z = Math.max(-46, R.fake.z - dt * 5);
R.fake.g.position.z = R.fake.z;
R.fake.S.z = R.fake.z;
}
if (R.sconce)
R.sconce.forEach(function (s) { s.F.out = P.z < s.z - 3; });
if (R.lit && R.lit[0]) {
R.lit[0].L.position.z = Math.min(40, P.z + 5);
R.lit[1].L.position.z = P.z - 12;
}
},
function (G) {
SHN.G = G;
SHN.lite = typeof LITE !== "undefined" && !!LITE;
SHN.solids = [];
SHN.floors = [];
SHN.spots = [];
SHN.talk = [];
SHN.people = [];
SHN.fx = [];
SHN.lights = [];
SHN.flames = [];
SHN.districts = [];
SHN.kidsGhosts = {};
SHN.sweets = {};
SHN.room = null;
SHN.lady = null;
SHN.horse = null;
SHN.run = null;
SHN.hide = null;
for (var k in SHN_RX) {
SHN_RX[k].g = null;
SHN_RX[k].open = false;
}
for (var k2 in SHN_KR) {
SHN_KR[k2].g = null;
}
function step(name, fn) { try {
fn();
}
catch (e) {
if (window.console)
console.warn("[samhain] " + name, e);
} }
step("terrain", function () { shnTerrain(G); });
step("sky", function () { shnSky(G); });
step("village", function () { shnVillage(G); });
step("hill", function () { shnHill(G); });
step("church", function () { shnChurch(G); });
step("road", function () { shnRoadAndMill(G); });
step("manor", function () { shnManorOut(G); });
step("hollow", function () { shnHollow(G); });
step("bake", function () { if (typeof gwBake === "function")
SHN.districts.forEach(function (D) { D.g.children.slice().forEach(function (c) { if (c.isGroup && !c.userData.keep) {
var live = false;
c.traverse(function (o) { if (o.userData.keep || o.userData.limbs || o.isLight)
live = true; });
if (!live)
try {
gwBake(c);
}
catch (e) { }
} }); }); });
var my = new THREE.PointLight(0xFFB060, 1.1, 16, 2);
G.add(my);
SHN.my = { L: my, k: 1.1, ph: 0 };
SHN.lights.push(SHN.my);
SHN.outside = G.children.slice();
SHN.built = true;
},
function (opt) {
opt = opt || {};
var A = SHN_AT.arrive;
SHN.zone = "green";
SHN.room = null;
SHN.moving = false;
SHN.hide = null;
if (SHN.outside)
SHN.outside.forEach(function (o) { o.visible = true; });
for (var k in SHN_RX)
if (SHN_RX[k].g)
SHN_RX[k].g.visible = false;
for (var k2 in SHN_KR)
if (SHN_KR[k2].g)
SHN_KR[k2].g.visible = false;
camera.position.set(SHN.base + A.x, shnGround(A.x, A.z, 1e4) + 1.72, A.z);
yaw = 0;
pitch = 0;
shnStateFetch();
if (opt.at === "playhouse") {
setTimeout(function () { shnEnterRoom("playhouse"); }, 200);
return;
}
if (opt.at === "hollow") {
var H = SHN_HOLLOW.tent;
camera.position.set(SHN.base + H.x, shnGround(H.x, H.z + 30, 1e4) + 1.72, H.z + 30);
yaw = 0;
}
setStatus("🎃 <b>" + SHN_NAME + ".</b> Hollowmere on Samhain night: turnip lanterns in every window, guisers in masks on the green, and the great fire burning on the <b>Hill of Tlachtga</b> (north-west). Knock on the cottage doors, bob for apples, read the nuts. Up the hill to the north, under its own storm, stands <b>Ravensmoor House</b> (13 and up). East: the <b>Dullahan's Road</b> from the old mill, and bright <b>Pumpkin Hollow</b> for everyone. The 🎃 Samhain menu has the rest.");
},
function (dt) {
var L = worldLocal();
SHN.t += dt;
if (!SHN.built)
return;
shnFlickerTick(dt);
shnStormTick(dt);
shnFxTick(dt);
shnSlideTick(dt);
if (SHN.moving)
return;
var zone = shnZoneAt(L.x, L.z);
if (zone !== SHN.zone && !(zone === "inside" && !SHN.room)) {
SHN.zone = zone;
if (zone === "manor")
setStatus("⛈️ <b>Ravensmoor.</b> The storm never leaves this hill.");
else if (zone === "hollow")
setStatus("🎃 <b>Pumpkin Hollow!</b> The Giggling House, the hay maze, the candy trail, the carving table and the Pumpkin Playhouse.");
}
if (WLD.arrive && (WLD.arrive.x !== SHN_AT.arrive.x || WLD.arrive.z !== SHN_AT.arrive.z))
WLD.arrive = { x: SHN_AT.arrive.x, z: SHN_AT.arrive.z };
var M = SHN.my;
if (M) {
var inHouse = SHN.room && !SHN.room.kids;
M.out = !(inHouse || SHN.lantern && SHN.zone !== "hollow" && !(SHN.room && SHN.room.kids));
M.k = inHouse ? 1.25 : 0.9;
M.L.distance = inHouse ? 14 : 20;
M.L.position.set(L.x - Math.sin(yaw) * 0.6 + Math.cos(yaw) * 0.3, camera.position.y - 0.25, L.z - Math.cos(yaw) * 0.6 - Math.sin(yaw) * 0.3);
}
shnLadyTick(dt);
shnRoomSoundTick(dt);
shnRideTick(dt);
SHN.vt += dt;
if (SHN.vt > 0.5) {
SHN.vt = 0;
shnScreensTick();
shnMusicTick();
var far = SHN.lite ? 700 : 1300;
if (!SHN.room)
SHN.districts.forEach(function (D) { var on = Math.hypot(L.x - D.x, L.z - D.z) < D.r + far; if (D.g.visible !== on)
D.g.visible = on; });
}
var R = SHN.room, where = R ? R.n : ({ manor: "Ravensmoor", hollow: "Pumpkin Hollow", green: "Hollowmere" }[SHN.zone] || SHN_NAME);
worldBanner("<b>🎃 " + SHN_NAME + "</b> · " + esc(where) + (SHN.houseRun && R && !R.kids ? " · room " + (R.i + 1) + " of 13" : "") + (SHN.run ? " · RUN for the church bridge!" : "") + (SHN.lantern && !R ? " · 🏮" : ""));
SHN.pt += dt;
if (SHN.pt < 0.15)
return;
SHN.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
worldPrompt(null);
return;
}
if (SHN.hide) {
worldPrompt("<b>In the wardrobe</b> · <b>press E</b> to step out", function () { shnHideOut(); });
return;
}
if (SHN.slide) {
worldPrompt(null);
return;
}
var feet = camera.position.y - 1.72, best = null, bd = 1e9;
function cand(x, z, r, fn, html) { var d = Math.hypot(L.x - x, L.z - z); if (d < r && d / r < bd) {
bd = d / r;
best = { fn: fn, html: html };
} }
SHN.talk.forEach(function (T) { var p = T.p.g.position; if (!T.p.g.visible)
return; cand(p.x, p.z, T.r, T.fn || function () { wTalk(T.t); }, "<b>" + esc(T.name) + "</b> · <b>press E</b> to talk"); });
SHN.spots.forEach(function (s) {
if (Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1)
return;
var sy = s.y !== undefined && s.y !== null ? s.y : shnLand(s.x, s.z);
if (Math.abs(sy - feet) > 3.2)
return;
cand(s.x, s.z, s.r, s.fn, "<b>" + esc(s.name) + "</b> · <b>press E</b> to " + esc(s.verb));
});
if (typeof raNear === "function") {
var rn = null;
try {
rn = raNear();
}
catch (e) { }
if (rn) {
best = { fn: rn.fn, html: rn.html };
}
}
if (best)
worldPrompt(best.html, best.fn);
else
worldPrompt(null);
SHN.people.forEach(function (P) { if (!P.wander)
return; var p = P.g.position; if (Math.abs(p.x - L.x) > 120 || Math.abs(p.z - L.z) > 120)
return; wWander(P.g, 0.15, function (x, z) { return shnLand(x, z); }, P.wander); });
},
function () {
for (var k in SHN.mats) {
var m = SHN.mats[k];
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var t in SHN.tex) {
var x = SHN.tex[t];
if (x && x.dispose)
try {
x.dispose();
}
catch (e) { }
}
SHN.mats = {};
SHN.tex = {};
SHN.built = false;
SHN.G = null;
SHN.outside = null;
SHN.skyFlash = null;
SHN.atticFig = null;
SHN.lady = null;
SHN.horse = null;
for (var r in SHN_RX)
SHN_RX[r].g = null;
for (var r2 in SHN_KR)
SHN_KR[r2].g = null;
},
function (S) {
var st = new THREE.MeshLambertMaterial({ color: 0x7A766C }), g = new THREE.Group(), y = typeof terrainY === "function" ? terrainY(S.gate.x, S.gate.z) : 0;
g.position.set(S.gate.x, y, S.gate.z);
g.rotation.y = -S.gate.a - Math.PI / 2;
scene.add(g);
SHNC.gate = g;
var l = wBox(1.6, 6, 1.2, st, -2.4, 3, 0, g), r = wBox(1.6, 6.4, 1.2, st, 2.4, 3.2, 0, g);
l.rotation.z = 0.03;
r.rotation.z = -0.04;
var lin = wBox(6.8, 1.2, 1.4, st, 0, 6.6, 0, g);
lin.rotation.z = 0.03;
var veil = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 5.6), new THREE.MeshBasicMaterial({ color: 0x6A4AA8, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
veil.position.set(0, 3, 0);
g.add(veil);
SHNC.veil = veil;
for (var i = 0; i < 6; i++) {
var tx = -3.6 + i * 1.44;
shnTurnipCity(g, tx, 0, 2.2);
}
var sg = wSign(["SAMHAIN NIGHT", "the Thin Place · press E to step through"], 4.2, 1, "#1A0E20", "#FFB050");
sg.position.set(0, 8, 0.2);
g.add(sg);
var gl = wGlow(0x9A6AF0, 9, 0.3);
gl.position.set(0, 3, 0);
g.add(gl);
var y2 = typeof terrainY === "function" ? terrainY(S.tent.x, S.tent.z) : 0, t = new THREE.Group();
t.position.set(S.tent.x, y2, S.tent.z);
scene.add(t);
SHNC.tent = t;
for (var s = 0; s < 12; s++) {
var seg = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 3.4, 2, 1, true, s / 12 * Math.PI * 2, Math.PI * 2 / 12), new THREE.MeshLambertMaterial({ color: s % 2 ? 0xFF6A00 : 0x7A1AD8, side: THREE.DoubleSide }));
seg.position.y = 1.7;
t.add(seg);
var top = new THREE.Mesh(new THREE.ConeGeometry(4.3, 3.4, 2, 1, true, s / 12 * Math.PI * 2, Math.PI * 2 / 12), new THREE.MeshLambertMaterial({ color: s % 2 ? 0x7A1AD8 : 0xFF6A00, side: THREE.DoubleSide }));
top.position.y = 5.1;
t.add(top);
}
var sg2 = wSign(["THE PUMPKIN PLAYHOUSE", "for children · soft play and the theatre · press E"], 3.8, 0.9, "#FF6A00", "#2A0A4A");
sg2.position.set(0, 7.4, 0);
sg2.rotation.y = -S.tent.a - Math.PI / 2;
t.add(sg2);
},
function () {
if (typeof hallRealm !== "function" || typeof blockOrigin !== "function")
return null;
var r = hallRealm();
if (!r || !r.grid || (store.here || 0) !== r.id)
return null;
var h = blockOrigin(r.grid.bx, r.grid.bz), n = 1;
try {
n = hubDoorList().filter(function (d) { return d.to !== "hall"; }).length || 1;
}
catch (e) { }
var gaps = [];
for (var i = 0; i < n; i++) {
var a = ((i + 0.5) / n) * Math.PI * 2;
gaps.push({ a: a, d: Math.abs(Math.atan2(Math.sin(a + Math.PI / 2), Math.cos(a + Math.PI / 2))) });
}
gaps.sort(function (p, q) { return p.d - q.d; });
var a2 = (gaps[4] || gaps[3] || gaps[0]).a;
return { x: h.x + Math.cos(a2) * 29.5, z: h.z + Math.sin(a2) * 29.5, a: a2 };
},
function () {
var keeper = shnKeeper(), b = "", fns = {}, d = shnData(), on = shnOn(), S = SHN.state;
var ends = S && S.ends ? new Date(S.ends) : new Date(shnDefaultDates().ends);
var rows = [["When", on ? "On now, until " + ends.toLocaleDateString(undefined, { day: "numeric", month: "long" }) : "Not open just now" + (keeper ? " (you can always go, Keeper)" : "")],
["Ways in", "The old church door in the Hall of Doors, and this menu."],
["In Samhain Night", "Hollowmere: guising door to door, bobbing for apples, the nut fire. The Samhain fire on the Hill of Tlachtga. The Headless Horseman's road. Ravensmoor House (13 and up). Pumpkin Hollow for everyone: the Giggling House, the hay maze, the candy trail, carving, the Pumpkin Playhouse."],
["In Somnucor", "The Samhain Drive-In, out in the Harvest Ring (grown-ups): horror classics on a giant screen."],
["Yours so far", d.keeps.length + " keepsake" + (d.keeps.length === 1 ? "" : "s") + (d.done.house ? ", escaped Ravensmoor " + d.done.house + " time" + (d.done.house === 1 ? "" : "s") : "")]];
b += worldBtn("mus", shnMusicOff() ? "🎵 Music: off (turn on)" : "🎵 Music: on (turn off)", "The night's music, in Somnucor and in Samhain Night");
fns.mus = function () { shnMusicSet(!shnMusicOff()); shnMenu(); };
if (WLD.on === SHN_KEY) {
if (SHN.room) {
b += worldBtn("out", "🚪 Leave " + esc(SHN.room.kids ? SHN.room.n : "Ravensmoor House"), "Straight back outside");
fns.out = function () { worldCard(null); SHN.houseRun = null; shnLeaveInside(); };
}
else {
b += worldBtn("hh", "🏚️ To Ravensmoor's door", "The house on the hill");
fns.hh = function () { worldCard(null); var A = SHN_AT.manor; shnVeil(0.4, function () { SHN.zone = "manor"; camera.position.set(SHN.base + A.x, shnGround(A.x, A.z + 22, 1e4) + 1.72, A.z + 22); yaw = 0; }); };
b += worldBtn("ph", "🎃 To Pumpkin Hollow", "For everyone");
fns.ph = function () { worldCard(null); var H = SHN_HOLLOW.tent; shnVeil(0.4, function () { SHN.zone = "hollow"; camera.position.set(SHN.base + H.x, shnGround(H.x, H.z + 30, 1e4) + 1.72, H.z + 30); yaw = 0; }); };
b += worldBtn("fi", "🔥 To the Samhain fire", "The Hill of Tlachtga");
fns.fi = function () { worldCard(null); var A = SHN_AT.hill; shnVeil(0.4, function () { camera.position.set(SHN.base + A.x + 8, shnGround(A.x + 8, A.z + 14, 1e4) + 1.72, A.z + 14); yaw = 0.5; }); };
}
b += worldBtn("home", "Leave " + SHN_NAME, "Back to where you came from");
fns.home = function () { worldCard(null); shnHome(); };
}
else if (!WLD.on && (on || keeper)) {
b += worldBtn("go", "🎃 Go to " + SHN_NAME, "Arrive on Hollowmere green");
fns.go = function () { worldCard(null); shnGo({}); };
b += worldBtn("kids", "🎪 The Pumpkin Playhouse", "For children: soft play and the theatre");
fns.kids = function () { worldCard(null); shnGo({ at: "playhouse" }); };
if (typeof toHall === "function") {
b += worldBtn("hall", "Take me to the Hall of Doors", "Its door is an old church door under a turnip lantern");
fns.hall = function () { worldCard(null); toHall(); };
}
}
worldCard(worldFacts("🎃 " + SHN_NAME, "The Halloween and Samhain Spooktacular", rows, []) + b, fns);
},
function (x, z, r) {
var y = shnLand(x, z);
if (shnWaterAt(x, z) !== null)
return false;
if (typeof SHN_ROAD !== "undefined" && shnPathD(x, z, SHN_ROAD) < 5 + r)
return false;
for (var a = 0; a < 6; a++) {
var px = x + Math.cos(a * 1.047) * r, pz = z + Math.sin(a * 1.047) * r;
if (shnSolidAt(px, pz, y + 0.3))
return false;
if (shnFloorAt(px, pz, y + 2) !== null)
return false;
if (Math.abs(shnLand(px, pz) - y) > 1.2)
return false;
if (shnWaterAt(px, pz) !== null)
return false;
}
return !shnSolidAt(x, z, y + 0.3);
},
function () {
if (SHN_SW.straw)
return SHN_SW.straw;
var t = wTex(128, 128, function (x, W, H) {
var R = wRand(77);
x.fillStyle = "#B89A50";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 900; i++) {
var px = R() * W, py = R() * H, l = 4 + R() * 14, a = (R() - 0.5) * 0.8;
x.strokeStyle = R() < 0.5 ? "rgba(240,214,130,0.6)" : "rgba(120,92,40,0.5)";
x.lineWidth = 1;
x.beginPath();
x.moveTo(px, py);
x.lineTo(px + Math.cos(a) * l, py + Math.sin(a) * l);
x.stroke();
}
});
t.wrapS = t.wrapT = THREE.RepeatWrapping;
return (SHN_SW.straw = new THREE.MeshLambertMaterial({ color: 0xD8C8A0, map: t }));
},
function (P, x, z, ry, lit) {
var y = shnLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
P.add(g);
var straw = shnSwStraw();
wBox(1.2, 0.5, 0.55, straw, 0, 0.25, 0, g);
wBox(1.2, 0.5, 0.55, straw, 0.15, 0.75, 0.05, g).rotation.y = 0.1;
[0.3, -0.3].forEach(function (o) { wBox(0.02, 0.52, 0.57, shnLam(0x8A6A2A), o, 0.25, 0, g); });
if (lit)
shnPumpkin(g, -0.2, 1.0, 0, 0.55, true);
shnSolid(x, z, 1.4, 0.8, y - 1, y + 1.2, ry);
},
function (P, x, z) {
var y = shnLand(x, z), m = shnSwStraw();
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2, c = wCone(0.22, 1.8, m, x + Math.cos(a) * 0.25, y + 0.9, z + Math.sin(a) * 0.25, P, 5);
c.rotation.z = Math.cos(a) * 0.18;
c.rotation.x = -Math.sin(a) * 0.18;
}
wCyl(0.32, 0.3, 0.08, shnLam(0x6A5A2A), x, y + 1.1, z, P, 8);
shnSolid(x, z, 0.9, 0.9, y - 1, y + 2);
},
function (P, x, z, ry) {
var y = shnLand(x, z), g = new THREE.Group();
g.position.set(x, y, z);
g.rotation.y = ry;
P.add(g);
var wd = shnLam(0x5A4430);
wBox(1.3, 0.1, 2.2, wd, 0, 0.7, 0, g);
[-1, 1].forEach(function (s) { wBox(0.06, 0.35, 2.2, wd, s * 0.62, 0.9, 0, g); var w = wCyl(0.55, 0.55, 0.08, wd, s * 0.75, 0.55, 0.2, g, 14); w.rotation.z = Math.PI / 2; wBox(0.07, 0.07, 2, wd, s * 0.4, 0.55, -2, g); });
var R = wRand((x * 5 + z) | 0);
for (var i = 0; i < 14; i++)
shnTurnip(g, (R() - 0.5) * 1.0, 0.75 + R() * 0.15, (R() - 0.5) * 1.8, 1.2, 0x000000);
shnSolid(x, z, 1.6, 2.6, y - 1, y + 1.4, ry);
},
function (P, cx, cz, r0, r1, n, seed) {
var R = wRand(seed);
n = SHN.lite ? Math.ceil(n / 2) : n;
for (var i = 0, t = 0; i < n && t < n * 15; t++) {
var a = R() * 6.283, d = r0 + R() * (r1 - r0), x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
if (!shnSwFree(x, z, 0.5))
continue;
var kid = R() < 0.4, f = R() < 0.5;
var p = shnPerson("sw" + seed + "_" + i, x, z, shnLand(x, z), { child: kid, sex: f ? "f" : "m", look: { topKind: R() < 0.5 ? "robe" : null, top: [0x3A2A2A, 0x2A3A2A, 0x4A3A22, 0xE8E0D0][i % 4], bottom: 0x2A2420, hat: R() < 0.5 ? "hood" : "cap", hatColor: 0x1E1A18 } });
p.g.rotation.y = Math.atan2(cx - x, cz - z);
if (R() < 0.5)
shnTurnip(p.g, 0.32, 0.85, 0.15, 1.1);
i++;
}
},
function (G, cx, cz, o, seed) {
var P = new THREE.Group();
P.userData.keep = 1;
G.add(P);
var R = wRand(seed), list = o.things, lite = SHN.lite, want = lite ? list.length : list.length * 2;
for (var i = 0, t = 0; i < want && t < want * 30; t++) {
var kind = list[i % list.length], a = R() * 6.283, d = o.r0 + R() * (o.r1 - o.r0), x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
if (!shnSwFree(x, z, kind === "cart" ? 2 : 1.1))
continue;
var face = Math.atan2(cx - x, cz - z);
if (kind === "post")
shnSwLanternPost(P, x, z);
else if (kind === "bale")
shnSwBale(P, x, z, face, true);
else if (kind === "bale0")
shnSwBale(P, x, z, face, false);
else if (kind === "stook")
shnSwStook(P, x, z);
else if (kind === "cart")
shnSwCart(P, x, z, face + 1.3);
else if (kind === "bench")
shnSwBench(P, x, z, face);
i++;
}
shnSwGuisers(P, cx, cz, o.r0, o.r1, o.folk || 5, seed + 3);
},
function (G) {
var B = SHN.base;
var P = [[-33, 33, ["post", "bale", "bench", "post", "stook", "bale", "post", "cart", "bench"], 8], [30, -536, ["post", "bale", "post", "stook", "bale0"], 5], [208, -268, ["post", "bench", "post", "bale", "stook"], 5],
[364, 104, ["bale", "post", "stook", "bale", "post", "bench"], 5], [-327, -247, ["post", "stook", "bale", "post", "stook", "bale0", "cart"], 5], [359, -279, ["post", "bale", "stook", "post"], 4],
[537, 197, ["post", "bale", "bench", "stook", "post"], 5], [522, -433, ["post", "stook", "bale", "post"], 4]];
P.forEach(function (q, i) { shnSwPlace(G, q[0], q[1], { r0: 8, r1: 40, things: q[2], folk: q[3] }, 1500 + i * 17); });
}
];
});
