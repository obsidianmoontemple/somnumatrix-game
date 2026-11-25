/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(170, function () {
"use strict";
return [
function (p) {
var d = acStore(), dreamt = {};
(d.abilities || []).forEach(function (a) { dreamt[a.name] = a; });
var h = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">' +
'<b style="color:var(--bone,#ddd);font-weight:500">What you can do in dreams</b>' +
'<button class="btn" id="pw-close">Done</button></div>' +
'<p style="font-size:12px;color:var(--dim,#999);margin:0 0 10px;line-height:1.5">Every power and every magic is learned at the <b style="color:#C8B0FF">Academy of the Arcane</b> on Temple Row. Once learned, switch it on or off here.' +
(acKeeper() ? ' <b style="color:var(--gold,#C9A868)">Keeper: you know them all.</b>' : ' You know ' + acCount() + ' of ' + AC_SUBJECTS.length + '.') + '</p>';
function row(n, isPower) {
var know = acLearned(n), room = acRoomOf(n), on = know && !acOff(n), tag = dreamt[n] && dreamt[n].src === "stated" ? ' <span style="color:var(--gold,#C9A868);font-size:11px">dreamt</span>' : "";
return '<div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--line,#333)">' +
(know ? '<input type="checkbox" data-acpw="' + esc(n) + '"' + (on ? " checked" : "") + ' style="width:auto"' + (isPower ? '' : ' disabled') + '>' : '<span style="width:13px;display:inline-block;color:#7A6A9A">✦</span>') +
'<span style="flex:1;font-size:14px;' + (know ? '' : 'color:var(--dim,#999)') + '">' + esc(n) + tag +
(know ? '' : '<br><span style="font-size:11.5px;color:#9A88C8">learn it in ' + esc(room ? room.name : "the Academy") + '</span>') + '</span></div>';
}
h += '<div style="font-size:12px;color:#C8B0FF;margin:6px 0 2px">Powers</div>' + AC_POWERS.map(function (n) { return row(n, true); }).join("");
h += '<div style="font-size:12px;color:#C8B0FF;margin:10px 0 2px">Magic</div>' + AC_SUBJECTS.filter(function (s) { return AC_POWERS.indexOf(s) < 0; }).map(function (n) { return row(n, false); }).join("");
h += '<div style="margin-top:10px"><button class="btn" data-acgo="1">Take me to the Academy</button></div>';
p.innerHTML = h;
document.getElementById("pw-close").onclick = function () { p.style.display = "none"; };
Array.prototype.forEach.call(p.querySelectorAll("[data-acpw]"), function (c) {
c.onchange = function () {
var nm = c.getAttribute("data-acpw"), d2 = acStore();
d2.powersOff = d2.powersOff.filter(function (x) { return x !== nm; });
if (!c.checked)
d2.powersOff.push(nm);
acApply();
if (typeof save === "function")
save();
};
});
},
function () {
var s = cityPlaceOf(AC_KEY);
if (!s) {
setStatus("The Academy of the Arcane stands on Temple Row of Somnucor.");
return;
}
if (typeof INT !== "undefined" && INT && INT.academy) {
setStatus("<b>You are in the Academy.</b> Each classroom is named over its door; the panel says what is taught where.");
return;
}
if (typeof guideTo !== "undefined") {
var D = (typeof doorWorld === "function") ? doorWorld(s) : { x: s.x, z: s.z };
guideTo = { key: AC_KEY, x: D.x, z: D.z };
}
setStatus("<b>The Academy of the Arcane.</b> Follow the pointer to its great doors on Temple Row.");
},
function (spec) {
var C = tlCtx(spec, AC_W, AC_D, AC_H), A = [];
var stone = tlm(0x8C857A), stoneD = tlm(0x6E675C), flag = tlm(0x5E574C), ceil = tlm(0x3A342E), oak = tlm(0x5A3A22), oakD = tlm(0x3E2814), red = tlm(0x7A1E22), gold = tlm(0xC9A040), iron = tlm(0x3A3A3E), cream = tlm(0xE8E0CC);
tlShell(C, stone, flag, ceil, { door: 0x3A2614 });
var T = 0.5;
function wallX(z, x0, x1, gaps, mat, h) {
h = h || AC_H;
var cuts = [x0];
(gaps || []).slice().sort(function (a, b) { return a[0] - b[0]; }).forEach(function (g) { cuts.push(g[0] - g[1] / 2, g[0] + g[1] / 2); });
cuts.push(x1);
for (var i = 0; i < cuts.length; i += 2) {
var a = cuts[i], b = cuts[i + 1];
if (b - a < 0.05)
continue;
C.add(gB(b - a, h, T), mat || stone, (a + b) / 2, h / 2, z);
C.solid((a + b) / 2, z, (b - a) / 2, T / 2, h);
}
(gaps || []).forEach(function (g) {
var lt = Math.max(3.6, g[1] * 0.9 + 1.4);
if (lt < h)
C.add(gB(g[1], h - lt, T), mat || stone, g[0], lt + (h - lt) / 2, z);
C.add(gT(g[1] / 2, 0.12, Math.PI), stoneD, g[0], lt - g[1] / 2 * 0.02, z + (T / 2 + 0.02));
});
}
function wallZ(x, z0, z1, gaps, mat, h) {
h = h || AC_H;
var cuts = [z0];
(gaps || []).slice().sort(function (a, b) { return a[0] - b[0]; }).forEach(function (g) { cuts.push(g[0] - g[1] / 2, g[0] + g[1] / 2); });
cuts.push(z1);
for (var i = 0; i < cuts.length; i += 2) {
var a = cuts[i], b = cuts[i + 1];
if (b - a < 0.05)
continue;
C.add(gB(T, h, b - a), mat || stone, x, h / 2, (a + b) / 2);
C.solid(x, (a + b) / 2, T / 2, (b - a) / 2, h);
}
(gaps || []).forEach(function (g) { var lt = Math.max(3.6, g[1] * 0.9 + 1.4); if (lt < h)
C.add(gB(T, h - lt, g[1]), mat || stone, x, lt + (h - lt) / 2, g[0]); });
}
function sign(txt, x, y, z, ry, col, w) {
w = w || 4.4;
var sc = hallCanvas(512, 96, function (g, cw, ch) {
g.fillStyle = "#1E1630";
g.fillRect(0, 0, cw, ch);
g.strokeStyle = "#C9A040";
g.lineWidth = 5;
g.strokeRect(4, 4, cw - 8, ch - 8);
hallText(g, txt, cw / 2, ch / 2 + 2, cw - 30, "bold 38px Georgia,serif", col || "#F4E6C0");
});
var m = C.add(gP(w, w * 96 / 512), new THREE.MeshBasicMaterial({ map: sc.tex }), x, y, z);
m.rotation.y = ry || 0;
return m;
}
function torch(x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 2.6, z);
g.rotation.y = ry || 0;
var b = new THREE.Mesh(gB(0.12, 0.12, 0.4), iron);
b.position.z = 0.2;
g.add(b);
var s = new THREE.Mesh(gC(0.06, 0.04, 0.5, 6), oakD);
s.position.set(0, 0.2, 0.38);
g.add(s);
var f = new THREE.Mesh(gK(0.09, 0.26, 6), tlm(0xFFB23A, "glow"));
f.position.set(0, 0.56, 0.38);
g.add(f);
C.flames.push(f);
C.root.add(g);
C.light(x + Math.sin(ry || 0) * 0.6, z + Math.cos(ry || 0) * 0.6);
}
function rug(x, z, w, d, col) { C.add(gB(w, 0.03, d), tlm(col || 0x6A1A22), x, 0.02, z); C.add(gB(w - 0.4, 0.035, d - 0.4), tlm(0xC9A040), x, 0.021, z); C.add(gB(w - 0.6, 0.04, d - 0.6), tlm(col || 0x6A1A22), x, 0.022, z); }
function lectern(x, z, ry) {
var m = C.add(gB(0.7, 1.1, 0.5), oak, x, 0.55, z, ry);
m.userData.furn = "lectern";
C.add(gB(0.8, 0.06, 0.6), oakD, x, 1.12, z, ry, -0.3);
C.solid(x, z, 0.4, 0.4, 1.2);
}
function banner(x, z, ry, col, sym) {
var g = new THREE.Group();
g.position.set(x, AC_H - 1.2, z);
g.rotation.y = ry || 0;
var cl = new THREE.Mesh(gP(1.6, 4.2), tlm(col, "ds"));
cl.position.y = -2.1;
g.add(cl);
var bar = new THREE.Mesh(gC(0.05, 0.05, 1.9, 6), gold);
bar.rotation.z = Math.PI / 2;
g.add(bar);
if (sym) {
var e = new THREE.Mesh(gS(0.36), tlm(0xC9A040));
e.position.set(0, -1.8, 0.03);
e.scale.z = 0.15;
g.add(e);
}
C.root.add(g);
return g;
}
function portrait(x, y, z, ry, seed) {
var cv = hallCanvas(128, 160, function (g, w, h) {
var hue = (seed * 47) % 360;
g.fillStyle = "hsl(" + hue + ",30%,22%)";
g.fillRect(0, 0, w, h);
g.fillStyle = "hsl(" + ((hue + 180) % 360) + ",25%,30%)";
g.beginPath();
g.ellipse(w / 2, h * 0.95, w * 0.42, h * 0.42, 0, Math.PI, 0);
g.fill();
g.fillStyle = "#E8C8A8";
g.beginPath();
g.arc(w / 2, h * 0.42, w * 0.18, 0, Math.PI * 2);
g.fill();
g.fillStyle = ["#2A1A10", "#C8C0B0", "#8A5A2A", "#1A1A1A", "#D8A040"][seed % 5];
g.beginPath();
g.arc(w / 2, h * 0.36, w * 0.19, Math.PI, 0);
g.fill();
if (seed % 3 === 0) {
g.fillStyle = "#2A2A6A";
g.beginPath();
g.moveTo(w * 0.3, h * 0.3);
g.lineTo(w / 2, h * 0.02);
g.lineTo(w * 0.7, h * 0.3);
g.fill();
}
g.fillStyle = "#1A1210";
g.fillRect(w * 0.42, h * 0.4, 4, 4);
g.fillRect(w * 0.55, h * 0.4, 4, 4);
});
C.add(gB(1.5, 1.85, 0.1), gold, x, y, z, ry);
var m = C.add(gP(1.28, 1.6), new THREE.MeshLambertMaterial({ map: cv.tex }), x + Math.sin(ry || 0) * 0.06, y, z + Math.cos(ry || 0) * 0.06);
m.rotation.y = ry || 0;
m.userData.acPortrait = seed;
return m;
}
function armour(x, z, ry) {
var g = new THREE.Group();
g.position.set(x, 0, z);
g.rotation.y = ry || 0;
var st = tlm(0xB8BCC4);
[[0.5, 0.35, 0.5, 0, 0.18], [0.16, 0.8, 0.16, -0.12, 0.75], [0.16, 0.8, 0.16, 0.12, 0.75], [0.5, 0.7, 0.3, 0, 1.5], [0.14, 0.65, 0.14, -0.36, 1.45], [0.14, 0.65, 0.14, 0.36, 1.45]].forEach(function (q) { var m = new THREE.Mesh(gB(q[0], q[1], q[2]), q[1] === 0.35 ? stoneD : st); m.position.set(q[3], q[4], 0); g.add(m); });
var h = new THREE.Mesh(gS(0.2), st);
h.position.y = 2.05;
h.scale.set(1, 1.2, 1);
g.add(h);
var hb = new THREE.Mesh(gC(0.025, 0.025, 2.6, 6), oakD);
hb.position.set(0.48, 1.3, 0);
g.add(hb);
var ax = new THREE.Mesh(gB(0.04, 0.35, 0.3), st);
ax.position.set(0.48, 2.5, 0.12);
g.add(ax);
C.root.add(g);
C.solid(x, z, 0.4, 0.4, 2.2);
}
wallX(30, -16, 16, [[0, 6]]);
wallZ(-16, -20, 30, [[5, 3]]);
wallZ(16, -20, 30, [[5, 3]]);
wallX(-20, -16, 16, [[0, 3.2]]);
wallX(-27, -16, 16, [[0, 3.2]]);
wallX(-27, -22, -16, null);
wallX(-27, 16, 22, null);
wallZ(-16, -46, -27, [[-42.5, 2.6]], stone);
wallZ(16, -46, -27, null);
wallX(-40, -22, -16, null);
wallX(-40, 16, 22, [[19, 1.6]]);
wallZ(-22, -46, 46, AC_ROOMS.filter(function (r) { return r.x1 === -22; }).reduce(function (a, r) { return a.concat(r.doors.map(function (z) { return [z, 2.6]; })); }, []));
wallZ(22, -46, 46, AC_ROOMS.filter(function (r) { return r.x0 === 22; }).reduce(function (a, r) { return a.concat(r.doors.map(function (z) { return [z, 2.6]; })); }, []));
[-9.2, 9.2, 27.6].forEach(function (z) { wallX(z, -50, -22, null); wallX(z, 22, 50, null); });
AC_ROOMS.forEach(function (r) {
if (r.up || r.down || !r.doors)
return;
var west = r.x1 === -22;
r.doors.forEach(function (z, k) { if (k > 0)
return; sign(r.name, west ? -21.7 : 21.7, 4.6, z, west ? Math.PI / 2 : -Math.PI / 2, null, 3.6); });
});
sign("THE GREAT HALL", 0, 6.2, 30.3, 0, "#F4E6C0", 6);
sign("THE LIBRARY", 0, 4.6, -26.7, 0, null, 3.4);
rug(0, 38, 8, 12, 0x5A1A2A);
[-14, 14].forEach(function (x) { [33, 43].forEach(function (z) { C.column(x > 0 ? x - 0.6 : x + 0.6, z, 0.6, AC_H, stoneD, stone); }); });
for (var st = 0; st < 9; st++) {
C.add(gB(3.2, 0.22, 0.6), stoneD, -12, 0.11 + st * 0.22, 40 - st * 0.6);
}
C.add(gB(3.4, 0.3, 2.2), stone, -12, 2.0, 33.6);
sign("UP TO THE TOWERS", -12, 4.4, 36.2, 0, "#C8E0FF", 3.4);
C.add(gB(3.2, 0.04, 3), tlm(0x0A0810), 12, 0.02, 37);
for (var sd = 0; sd < 5; sd++)
C.add(gB(3.2, 0.08, 0.5), stoneD, 12, 0.03 - sd * 0.01, 35.8 + sd * 0.55);
[10.4, 13.6].forEach(function (x) { C.add(gB(0.2, 1, 3.4), iron, x, 0.5, 37); });
sign("DOWN TO THE DUNGEONS", 12, 4.4, 36.2, 0, "#B8FFC8", 3.4);
AC_PADS.forEach(function (p) { var r = C.add(gT(0.9, 0.05), tlm(0x9A88FF, "glow"), p.x, 0.06, p.z); r.rotation.x = Math.PI / 2; r.userData.acPad = 1; });
var mov = new THREE.Group();
mov.position.set(0, 7.2, 38);
C.root.add(mov);
for (var ms = 0; ms < 3; ms++) {
var fl = new THREE.Group();
fl.rotation.y = ms * 2.1;
for (var q = 0; q < 7; q++) {
var s = new THREE.Mesh(gB(1.6, 0.18, 0.45), stoneD);
s.position.set(2.5, q * 0.22 - 0.7, q * 0.45 - 1.5);
fl.add(s);
}
var rail = new THREE.Mesh(gB(0.06, 0.6, 3.2), iron);
rail.position.set(3.3, 0.2, 0);
rail.rotation.x = -0.45;
fl.add(rail);
mov.add(fl);
}
A.push(function (t) { mov.children.forEach(function (f, i) { f.rotation.y = i * 2.1 + Math.sin(t * 0.12 + i) * 0.9; f.position.y = Math.sin(t * 0.3 + i * 1.7) * 0.4; }); });
[[-9.5, 0x9A2A2A], [-6.5, 0x2A6A3A], [6.5, 0x2A3A8A], [9.5, 0xC9A040]].forEach(function (h) {
C.add(gC(0.5, 0.5, 0.15, 10), gold, h[0], 0.08, 31.6);
C.add(gC(0.5, 0.5, 0.15, 10), gold, h[0], 3.4, 31.6);
C.add(gK(0.42, 1.5, 10), tlm(0xDCEBF4, "glow"), h[0], 2.55, 31.6, 0, Math.PI);
C.add(gK(0.42, 1.5, 10), tlm(0xDCEBF4, "glow"), h[0], 0.95, 31.6);
C.add(gK(0.36, 1.0, 10), tlm(h[1]), h[0], 0.66, 31.6);
C.solid(h[0], 31.6, 0.5, 0.5, 3.5);
});
portrait(-5, 4.2, 45.7, Math.PI, 1);
portrait(5, 4.2, 45.7, Math.PI, 2);
portrait(-11, 4.2, 45.7, Math.PI, 3);
portrait(11, 4.2, 45.7, Math.PI, 4);
torch(-8, 45.7, Math.PI);
torch(8, 45.7, Math.PI);
C.spots.push({ x: 9.5, z: 44, room: "entrance", level: 0 });
var sky = C.add(gB(31.6, 0.05, 49.6), tlm(0x0A1028), 0, AC_H - 0.08, 5);
var sp = [];
for (var si = 0; si < 420; si++) {
var hh = (si * 2654435761) >>> 0;
sp.push(-15.5 + ((hh % 10000) / 10000) * 31, AC_H - 0.2, -19.5 + (((hh >>> 8) % 10000) / 10000) * 49);
}
var sg = new THREE.BufferGeometry();
sg.setAttribute("position", new THREE.Float32BufferAttribute(sp, 3));
var stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xF4F0FF, size: 0.14, transparent: true, opacity: 0.95, depthWrite: false }));
C.root.add(stars);
A.push(function (t) { stars.material.opacity = 0.75 + 0.25 * Math.sin(t * 1.3); });
[-10.5, -3.5, 3.5, 10.5].forEach(function (x, i) {
C.block(1.6, 0.8, 34, oak, x, 0, 8);
C.add(gB(0.5, 0.45, 34), oakD, x - 1.25, 0.22, 8);
C.add(gB(0.5, 0.45, 34), oakD, x + 1.25, 0.22, 8);
C.solid(x - 1.25, 8, 0.25, 17, 0.5);
C.solid(x + 1.25, 8, 0.25, 17, 0.5);
for (var g2 = 0; g2 < 11; g2++) {
C.add(gC(0.14, 0.1, 0.06, 8), gold, x + (g2 % 2 ? 0.4 : -0.4), 0.83, -7 + g2 * 3);
C.add(gC(0.07, 0.05, 0.18, 6), tlm(0xC0C8D0), x + (g2 % 2 ? -0.4 : 0.4), 0.9, -6 + g2 * 3);
}
banner(x, -19.6, 0, [0x8A2A2A, 0x2A6A3A, 0x2A3A8A, 0xB08A2A][i], true);
});
C.add(gB(26, 0.6, 6), stoneD, 0, 0.3, -16);
C.solid(0, -16, 13, 3, 0.6);
C.add(gB(20, 0.85, 1.4), oak, 0, 1.02, -15.6);
C.solid(0, -15.6, 10, 0.7, 1.5);
var th = C.add(gB(1.6, 3.4, 0.4), tlm(0x5A2A7A), 0, 2.3, -17.6);
C.add(gB(1.8, 0.3, 1.4), gold, 0, 1.3, -17);
lectern(0, -11.8, 0);
var nC = 120, cand = new THREE.InstancedMesh(gC(0.05, 0.05, 0.4, 6), cream, nC), flm = new THREE.InstancedMesh(gK(0.05, 0.14, 5), tlm(0xFFB23A, "glow"), nC), o3 = new THREE.Object3D(), cp = [];
for (var ci = 0; ci < nC; ci++) {
var h3 = (ci * 2246822519) >>> 0;
cp.push({ x: -14 + ((h3 % 1000) / 1000) * 28, z: -17 + (((h3 >>> 10) % 1000) / 1000) * 45, y: 5.2 + (((h3 >>> 20) % 100) / 100) * 2.2, p: (h3 % 628) / 100 });
}
cand.frustumCulled = false;
flm.frustumCulled = false;
C.root.add(cand);
C.root.add(flm);
A.push(function (t) {
for (var i = 0; i < nC; i++) {
var c = cp[i], y = c.y + Math.sin(t * 0.8 + c.p) * 0.15;
o3.position.set(c.x, y, c.z);
o3.rotation.set(0, 0, 0);
o3.scale.set(1, 1, 1);
o3.updateMatrix();
cand.setMatrixAt(i, o3.matrix);
o3.position.y = y + 0.27;
o3.scale.setScalar(0.85 + 0.3 * Math.abs(Math.sin(t * 7 + i)));
o3.updateMatrix();
flm.setMatrixAt(i, o3.matrix);
}
cand.instanceMatrix.needsUpdate = true;
flm.instanceMatrix.needsUpdate = true;
});
[-1, 1].forEach(function (s) { for (var k = 0; k < 5; k++) {
var z = -14 + k * 9;
C.add(gB(0.06, 4.6, 2), tlm([0x4A3A8A, 0x8A2A3A, 0x2A6A5A, 0xA88A2A, 0x3A5A9A][(k + (s > 0 ? 2 : 0)) % 5], "glow"), s * 15.7, 5.2, z);
C.add(gT(1, 0.08, Math.PI), stoneD, s * 15.7, 7.5, z, Math.PI / 2);
} });
for (var lk = 0; lk < 6; lk++) {
C.light(-8, -14 + lk * 8);
C.light(8, -14 + lk * 8);
}
C.spots.push({ x: 0, z: -12.7, room: "hall", level: 0 }, { x: -7, z: 4, room: "hall", level: 0 }, { x: 7, z: 12, room: "hall", level: 0 });
[-19, 19].forEach(function (x, si) {
var s = si ? 1 : -1;
for (var z = -36; z <= 44; z += 6) {
if (z < 28)
torch(x - s * 2.7, z, s * Math.PI / 2);
if ((z / 6 | 0) % 2 === 0)
torch(x + s * 2.7, z + 3, -s * Math.PI / 2);
}
rug(x, 3, 2.4, 80, 0x4A1A2A);
for (var zz = -32; zz <= 34; zz += 12) {
armour(x + s * 2.4, zz + 6, -s * Math.PI / 2);
}
for (var k2 = 0; k2 < 5; k2++) {
portrait(x - s * 2.72, 3.8, -30 + k2 * 11, s * Math.PI / 2, 10 + k2 + si * 7);
}
for (var ar = -38; ar <= 44; ar += 8) {
C.add(gT(3, 0.25, Math.PI), stoneD, x, AC_H - 3.2, ar);
}
C.spots.push({ x: x, z: -10, room: si ? "egal" : "wgal", level: 0 });
});
A.push(function (t) { C.root.children.forEach(function (m) { if (m.userData.acPortrait !== undefined && typeof camera !== "undefined") {
var s = m.userData.acPortrait;
m.position.y = 3.8 + Math.sin(t * 0.6 + s) * 0.01;
} }); });
(function () {
var bookPos = [], cols = [0x7A2E2E, 0x2F4A6A, 0x2F5A3A, 0x6A5A2A, 0x4A2A5A, 0x8A6A3A, 0x1F2F3F, 0x9A3A2A, 0x3A5A5A];
function stack(x, z, len, rot) {
var w = rot ? 0.7 : len, d = rot ? len : 0.7;
C.add(gB(w, 4.6, d), oakD, x, 2.3, z);
C.solid(x, z, w / 2, d / 2, 4.6);
for (var sh = 0; sh < 6; sh++)
for (var f = -1; f <= 1; f += 2) {
var n = 0, a = -len / 2 + 0.1;
while (a < len / 2 - 0.1 && n < 60) {
var bw = 0.05 + ((n * 13 + sh * 7) % 5) * 0.012;
bookPos.push(rot ? [x + f * 0.36, 0.3 + sh * 0.72, z + a + bw / 2, bw, 0.36 + ((n + sh) % 4) * 0.05, (n * 7 + sh) % 9, 1] : [x + a + bw / 2, 0.3 + sh * 0.72, z + f * 0.36, bw, 0.36 + ((n + sh) % 4) * 0.05, (n * 7 + sh) % 9, 0]);
a += bw + 0.005;
n++;
}
}
}
[-11, -5.5, 5.5, 11].forEach(function (x) { stack(x, -34, 4.5, true); stack(x, -41.5, 4.5, true); });
stack(-15.4, -38, 6, true);
stack(-15.4, -31.5, 5, true);
var fake = new THREE.Group();
fake.position.set(-15.75, 0, -42.5);
C.root.add(fake);
var ff = new THREE.Mesh(gB(0.1, 4.6, 2.6), oakD);
ff.position.y = 2.3;
fake.add(ff);
for (var fs = 0; fs < 6; fs++) {
var bb = new THREE.Mesh(gB(0.12, 0.4, 2.4), tlm(cols[fs % 9]));
bb.position.set(0.06, 0.5 + fs * 0.72, 0);
fake.add(bb);
}
fake.traverse(function (m) { m.userData.acFake = 1; });
var IB = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), bookPos.length), ob = new THREE.Object3D(), col = new THREE.Color();
bookPos.forEach(function (q, j) { ob.position.set(q[0], q[1] + q[4] / 2, q[2]); if (q[6])
ob.scale.set(0.24, q[4], q[3]);
else
ob.scale.set(q[3], q[4], 0.24); ob.updateMatrix(); IB.setMatrixAt(j, ob.matrix); col.setHex(cols[q[5]]); IB.setColorAt(j, col); });
IB.instanceMatrix.needsUpdate = true;
if (IB.instanceColor)
IB.instanceColor.needsUpdate = true;
C.root.add(IB);
[[-3, -30.5], [3, -30.5], [0, -44]].forEach(function (t) { C.block(2.6, 0.78, 1.2, oak, t[0], 0, t[1]); C.add(gC(0.08, 0.2, 0.16, 10), tlm(0x3FA05A, "glow"), t[0] + 0.8, 1.0, t[1]); C.light(t[0], t[1]); });
lectern(0, -37.8, 0);
var fb = [];
for (var b = 0; b < 9; b++) {
var m = C.add(gB(0.5, 0.08, 0.36), tlm(cols[b]), -8 + b * 2, 3 + ((b * 7) % 5) * 0.3, -37.8);
fb.push(m);
}
A.push(function (t) { fb.forEach(function (m, i) { m.position.y = 3.2 + Math.sin(t * 0.7 + i) * 0.35; m.rotation.y = t * 0.2 + i; m.rotation.z = Math.sin(t + i) * 0.2; }); });
C.light(0, -36);
C.light(-8, -42);
C.light(8, -42);
C.spots.push({ x: 0, z: -36.8, room: "library", level: 0 });
})();
(function () {
C.add(gB(5.4, 0.03, 5.4), tlm(0x2A1A3A), -19, 0.02, -43);
var mir = C.add(gB(1.6, 2.6, 0.08), tlm(0xC8D8F0, "glow"), -19, 1.9, -45.6);
C.add(gB(1.9, 2.9, 0.06), gold, -19, 1.9, -45.68);
C.block(1.2, 0.7, 0.7, oakD, -21, 0, -41.2);
C.add(gB(1.25, 0.1, 0.75), gold, -21, 0.72, -41.2);
var mote = C.smoke(-19, 0.5, -44, 18, 0xC8B0FF);
A.push(function (t) { mir.material.opacity = 0.6 + 0.3 * Math.sin(t * 1.7); });
C.light(-19, -43);
})();
C.block(1.6, 0.9, 0.7, oak, 19, 0, -45.2);
C.add(gB(0.06, 1.6, 0.06), oakD, 17, 0.8, -44);
C.add(gC(0.25, 0.15, 0.4, 8), tlm(0xA89060), 17, 0.2, -44);
C.light(19, -43);
lectern(19, -43.5, Math.PI);
AC_ROOMS.forEach(function (r) { if (r.subj && !r.up && !r.down)
acRoomDress(C, r, A, { wallX: wallX, wallZ: wallZ, sign: sign, torch: torch, rug: rug, lectern: lectern, banner: banner, portrait: portrait, armour: armour }); });
(function () {
var r = AC_ROOM.common, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
rug(cx, cz, 12, 9, 0x5A1A2A);
C.add(gB(5, 4, 1.2), stoneD, r.x1 - 0.8, 2, cz, Math.PI / 2);
C.add(gB(3, 2, 1), tlm(0x140A06), r.x1 - 0.9, 1, cz, Math.PI / 2);
C.solid(r.x1 - 0.8, cz, 0.6, 2.5, 4);
for (var fi = 0; fi < 5; fi++)
C.flame(r.x1 - 1.2, 0.3, cz - 0.8 + fi * 0.4, 3);
C.smoke(r.x1 - 1.2, 3.4, cz, 10, 0x8A8070);
[[-3, 0], [3, 0]].forEach(function (o) { C.block(1.2, 0.5, 4, red, cx + 2 + o[0] * 0.0 + (o[0] < 0 ? -2 : 2), 0, cz); C.add(gB(0.4, 0.9, 4), red, cx + 2 + (o[0] < 0 ? -2.6 : 2.6), 0.9, cz); });
C.block(2.4, 0.5, 1.2, oak, cx + 2, 0, cz);
[0x8A2A2A, 0x2A6A3A, 0x2A3A8A, 0xB08A2A].forEach(function (c, i) { banner(r.x0 + 4 + i * 6, r.z0 + 0.4, 0, c, true); });
C.light(cx, cz);
C.light(r.x1 - 3, cz);
C.spots.push({ x: cx, z: cz + 3, room: "common", level: 0 });
sign("THE COMMON ROOM", 21.7, 4.6, 36.8, -Math.PI / 2, null, 3.6);
})();
(function () {
var X0 = 105, X1 = 165, Z0 = -30, Z1 = 30;
C.add(gB(X1 - X0, 0.1, Z1 - Z0), flag, (X0 + X1) / 2, -0.05, 0);
C.add(gB(X1 - X0 + 0.6, 0.3, Z1 - Z0 + 0.6), ceil, (X0 + X1) / 2, AC_H + 0.15, 0);
wallX(Z1, X0, X1, null);
wallX(Z0, X0, X1, null);
wallZ(X0, Z0, Z1, null);
wallZ(X1, Z0, Z1, null);
wallX(14, X0, 125, null);
wallX(14, 145, X1, null);
wallZ(125, 14, 30, null);
wallZ(145, 14, 30, null);
wallX(6, X0, X1, [[116, 2.6], [136, 2.6], [155, 2.6]]);
wallZ(127, Z0, 6, null);
wallZ(145, Z0, 6, null);
for (var st = 0; st < 9; st++)
C.add(gB(3.2, 0.22, 0.6), stoneD, 135, 0.11 + st * 0.22, 25 + st * 0.6);
sign("DOWN TO THE ENTRANCE HALL", 135, 4.4, 29.7, Math.PI, "#C8E0FF", 3.8);
rug(135, 10, 56, 4, 0x3A1A4A);
[116, 136, 155].forEach(function (x, i) { sign(["THE ASTRONOMY TOWER", "THE CLOCK TOWER", "THE ARCHMAGE'S STUDY"][i], x, 4.6, 6.3, 0, null, 3.8); });
for (var tz = 108; tz <= 162; tz += 6)
torch(tz, 13.7, Math.PI);
for (var ux = 128; ux <= 142; ux += 7)
C.light(ux, 20);
})();
acRoomDress(C, AC_ROOM.astro, A, { wallX: wallX, wallZ: wallZ, sign: sign, torch: torch, rug: rug, lectern: lectern, banner: banner });
acRoomDress(C, AC_ROOM.clock, A, { wallX: wallX, wallZ: wallZ, sign: sign, torch: torch, rug: rug, lectern: lectern, banner: banner });
(function () {
var r = AC_ROOM.study, cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2;
rug(cx, cz, 10, 14, 0x3A1A4A);
C.block(3.6, 0.85, 1.6, oakD, cx, 0, r.z0 + 6);
var dk = C.add(gB(0.7, 1.1, 0.5), oak, cx, 0.55, r.z0 + 4.4);
dk.userData.furn = "desk";
C.add(gB(1.2, 2.6, 0.6), tlm(0x5A2A7A), cx, 1.3, r.z0 + 3.4);
C.add(gC(0.04, 0.04, 1.8, 6), gold, cx + 4, 0.9, r.z0 + 5);
C.add(gC(0.03, 0.03, 0.8, 6), gold, cx + 4, 1.8, r.z0 + 5, 0, 0, Math.PI / 2);
var bird = new THREE.Group();
bird.position.set(cx + 4, 2.05, r.z0 + 5);
C.root.add(bird);
var body = new THREE.Mesh(gS(0.22), tlm(0xD8401A));
body.scale.set(0.8, 1, 1.3);
bird.add(body);
var head = new THREE.Mesh(gS(0.12), tlm(0xE8701A));
head.position.set(0, 0.22, 0.2);
bird.add(head);
var tail = new THREE.Mesh(gK(0.12, 0.7, 6), tlm(0xF0A020, "glow"));
tail.position.set(0, -0.1, -0.45);
tail.rotation.x = -1.9;
bird.add(tail);
A.push(function (t) { bird.rotation.y = Math.sin(t * 0.4) * 0.6; head.rotation.x = Math.sin(t * 1.3) * 0.2; });
for (var k = 0; k < 4; k++) {
C.add(gB(0.6, 3.2, 4), oakD, r.x1 - 0.5, 1.6, r.z0 + 5 + k * 5);
var ins = C.add(gT(0.3, 0.03), gold, r.x1 - 1.1, 2.2 + (k % 2) * 0.6, r.z0 + 5 + k * 5);
(function (m, k) { A.push(function (t) { m.rotation.y = t * (0.5 + k * 0.2); m.rotation.x = t * 0.3; }); })(ins, k);
}
C.light(cx, cz);
C.light(cx, r.z0 + 5);
C.spots.push({ x: cx, z: r.z0 + 4, room: "study", level: 0 });
})();
(function () {
var X0 = -165, X1 = -105, Z0 = -30, Z1 = 30, dark = tlm(0x4A453E);
C.add(gB(X1 - X0, 0.1, Z1 - Z0), tlm(0x3A352E), (X0 + X1) / 2, -0.05, 0);
C.add(gB(X1 - X0 + 0.6, 0.3, Z1 - Z0 + 0.6), tlm(0x1E1A16), (X0 + X1) / 2, AC_H * 0.6 + 0.15, 0);
var H2 = AC_H * 0.6;
wallX(Z1, X0, X1, null, dark, H2);
wallX(Z0, X0, X1, null, dark, H2);
wallZ(X0, Z0, Z1, null, dark, H2);
wallZ(X1, Z0, Z1, null, dark, H2);
wallX(14, X0, -145, null, dark, H2);
wallX(14, -125, X1, null, dark, H2);
wallZ(-145, 14, 30, null, dark, H2);
wallZ(-125, 14, 30, null, dark, H2);
wallX(6, X0, X1, [[-151, 2.6], [-121, 2.6]], dark, H2);
wallZ(-137, Z0, 6, null, dark, H2);
for (var st = 0; st < 9; st++)
C.add(gB(3.2, 0.22, 0.6), dark, -135, 0.11 + st * 0.22, 25 + st * 0.6);
sign("UP TO THE ENTRANCE HALL", -135, 4.0, 29.7, Math.PI, "#B8FFC8", 3.6);
sign("THE CRYPT OF VOICES", -151, 4.2, 6.3, 0, "#B8D0FF", 3.6);
sign("THE SUNKEN POOL", -121, 4.2, 6.3, 0, "#B8F0FF", 3.6);
for (var tz = -162; tz <= -108; tz += 6) {
torch(tz, 13.7, Math.PI);
}
for (var ux = -142; ux <= -128; ux += 7)
C.light(ux, 20);
for (var ch = 0; ch < 6; ch++) {
C.add(gC(0.03, 0.03, 2.2, 4), iron, -160 + ch * 10, H2 - 1.1, 9);
}
})();
acRoomDress(C, AC_ROOM.crypt, A, { wallX: wallX, wallZ: wallZ, sign: sign, torch: torch, rug: rug, lectern: lectern, banner: banner });
acRoomDress(C, AC_ROOM.pool, A, { wallX: wallX, wallZ: wallZ, sign: sign, torch: torch, rug: rug, lectern: lectern, banner: banner });
var lightPool = [];
for (var li = 0; li < 10; li++) {
var pl = new THREE.PointLight(0xFFE0B8, 0, 18, 1.6);
C.root.add(pl);
lightPool.push(pl);
}
var fill = new THREE.PointLight(0xFFF0DC, 0, 70, 1.0);
C.root.add(fill);
var amb = new THREE.HemisphereLight(0xFFF0E0, 0x4A4030, 0.62);
amb.position.set(0, C.H, 0);
C.root.add(amb);
return { spec: spec, root: C.root, walls: C.walls, spots: C.spots, ox: C.ox, oz: 0, exit: { x: C.ox, z: C.D / 2 - 1.0 }, start: { x: C.ox, z: C.D / 2 - 2.4 },
winMats: [], winGlints: [], W: C.W, D: C.D, levels: 1, floor: C.H + 0.5, stairs: [], lifts: [], level: 0, holes: [], locked: null, unlocked: false,
floorNames: [AC_KEY], asBuilt: [], wpKey: AC_KEY, wpSaved: false,
lightSpots: C.lights, lightPool: lightPool, lightFill: fill, ceilH: C.H, lightAt: -1, lightLevel: -1,
academy: { anim: A, flames: C.flames, staff: {}, t: 0 } };
},
function (C, r, A, F) {
var cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2, west = r.x1 <= -22 && !r.down, east = r.x0 >= 22 && !r.up;
var far = west ? r.x0 + 3 : east ? r.x1 - 3 : cx, ry = west ? Math.PI / 2 : east ? -Math.PI / 2 : 0;
var lx = west || east ? far : cx, lz = west || east ? cz : r.z0 + 4;
var glowC = tlm(r.col, "glow"), oak = tlm(0x5A3A22), oakD = tlm(0x3E2814), gold = tlm(0xC9A040), iron = tlm(0x3A3A3E), stoneD = tlm(0x6E675C);
F.lectern(lx, lz, ry);
var bc = hallCanvas(512, 256, function (g, w, h) {
g.fillStyle = "#1A2218";
g.fillRect(0, 0, w, h);
g.strokeStyle = "#8A6A3A";
g.lineWidth = 10;
g.strokeRect(5, 5, w - 10, h - 10);
hallText(g, r.name, w / 2, 46, w - 40, "bold 34px Georgia,serif", "#F4ECD8");
(r.subj || []).forEach(function (s, i) { hallText(g, "✦ " + acTitle(s), w / 2, 100 + i * 36, w - 40, "28px Georgia,serif", "#DCE8D0"); });
});
var board = C.add(gP(4.2, 2.1), new THREE.MeshBasicMaterial({ map: bc.tex }), west ? r.x0 + 0.3 : east ? r.x1 - 0.3 : cx, 3.2, west || east ? cz : r.z0 + 0.3);
board.rotation.y = ry;
if (r.id !== "pool" && r.id !== "flight" && r.id !== "duel") {
for (var a = 0; a < 3; a++)
for (var b = 0; b < 3; b++) {
var dx, dz;
if (west || east) {
dx = far + (west ? 1 : -1) * (4.5 + a * 2.4);
dz = cz - 3 + b * 3;
}
else {
dx = cx - 4 + b * 4;
dz = lz + 4 + a * 2.6;
}
C.block(west || east ? 0.8 : 1.6, 0.75, west || east ? 1.6 : 0.8, oak, dx, 0, dz);
}
}
C.light(cx, cz);
C.light(lx + (west ? 2 : east ? -2 : 0), lz + (west || east ? 0 : 2));
var mote = C.smoke(lx + (west ? 1.5 : east ? -1.5 : 0), 0.6, lz + (west || east ? 0 : 1.5), 16, r.col);
F.torch(west ? r.x0 + 0.3 : east ? r.x1 - 0.3 : r.x0 + 0.3, cz - 5, west ? Math.PI / 2 : east ? -Math.PI / 2 : Math.PI / 2);
F.torch(west ? r.x0 + 0.3 : east ? r.x1 - 0.3 : r.x1 - 0.3, cz + 5, west ? Math.PI / 2 : east ? -Math.PI / 2 : -Math.PI / 2);
C.spots.push({ x: lx + (west ? -0.9 : east ? 0.9 : 0), z: lz + (west || east ? 0 : -0.9), room: r.id, level: 0 });
var g, i;
switch (r.id) {
case "flight":
var hoops = [];
for (i = 0; i < 5; i++) {
var hp = C.add(gT(1.4, 0.08), gold, cx - 6 + i * 3, 3.5 + (i % 2) * 2.4, cz - 8 + i * 4);
hp.rotation.y = Math.PI / 2;
hoops.push(hp);
}
A.push(function (t) { hoops.forEach(function (h, k) { h.position.y = 3.6 + (k % 2) * 2.4 + Math.sin(t * 0.9 + k) * 0.4; h.rotation.x = Math.sin(t * 0.5 + k) * 0.2; }); });
for (i = 0; i < 6; i++) {
var br = new THREE.Group();
br.position.set(r.x1 - 1.2, 0, r.z0 + 3 + i * 1.1);
var hd = new THREE.Mesh(gC(0.03, 0.03, 1.8, 6), oakD);
hd.position.y = 1.0;
br.add(hd);
var bs = new THREE.Mesh(gK(0.14, 0.5, 8), tlm(0xC8A050));
bs.position.y = 0.2;
bs.rotation.x = Math.PI;
br.add(bs);
br.rotation.z = 0.15;
C.root.add(br);
}
var carpets = [];
[[cx + 2, cz + 10, 0x8A2A3A], [cx - 4, cz + 12, 0x2A4A8A]].forEach(function (q) { var cp = C.add(gB(1.6, 0.05, 2.4), tlm(q[2]), q[0], 1.1, q[1]); C.add(gB(1.7, 0.055, 0.12), gold, q[0], 1.1, q[1] - 1.2); carpets.push(cp); });
A.push(function (t) { carpets.forEach(function (c, k) { c.position.y = 1.1 + Math.sin(t * 1.1 + k * 2) * 0.15; c.rotation.z = Math.sin(t * 0.9 + k) * 0.05; }); });
var fea = C.add(gK(0.05, 0.5, 4), tlm(0xF4F0E6), cx, 2, cz);
A.push(function (t) { fea.position.y = 2 + Math.sin(t * 0.6) * 0.8; fea.rotation.z = Math.sin(t * 1.2) * 0.8; fea.position.x = cx + Math.sin(t * 0.3) * 2; });
C.add(gC(3, 3, 0.03, 32), tlm(0xB8A070), cx, 0.02, cz, 0);
C.add(gT(3, 0.06), glowC, cx, 0.04, cz, 0, Math.PI / 2);
break;
case "passage":
for (i = 0; i < 3; i++) {
var px = cx - 6 + i * 6;
[-1, 1].forEach(function (s) { C.add(gB(0.3, 3.2, 0.3), stoneD, px, 1.6, cz - 6 + s * 0.9); });
var sh = C.add(gB(0.06, 2.8, 1.5), glowC, px, 1.4, cz - 6);
(function (m, k) { A.push(function (t) { m.material.opacity = 0.35 + 0.3 * Math.sin(t * 2 + k); }); })(sh, i);
}
var wall = C.add(gB(6, 3, 0.4), tlm(0x8C857A), cx, 1.5, cz + 5);
C.add(gB(6.1, 0.06, 0.42), glowC, cx, 3.02, cz + 5);
break;
case "veils":
for (i = 0; i < 4; i++) {
var mz = r.z0 + 2.5 + i * 4.4;
C.add(gB(0.1, 2.6, 1.4), gold, r.x1 - 0.4, 1.6, mz);
var mr = C.add(gB(0.05, 2.3, 1.15), tlm(0xD8E8F8, "glow"), r.x1 - 0.47, 1.6, mz);
(function (m, k) { A.push(function (t) { m.material.opacity = 0.55 + 0.35 * Math.sin(t * 0.8 + k); }); })(mr, i);
}
for (i = 0; i < 3; i++) {
var bx = cx - 4 + i * 4, cl = C.add(gC(0.6, 0.15, 1.6, 10), tlm(0x3A2A5A, "glow"), bx, 0.9, r.z0 + 2.2);
C.add(gS(0.18), tlm(0xE8D8B8), bx, 1.85, r.z0 + 2.2);
(function (m, k) { A.push(function (t) { m.material.opacity = 0.15 + 0.8 * Math.max(0, Math.sin(t * 0.5 + k * 2)); }); })(cl, i);
}
[[cx - 2, cz], [cx + 2, cz + 2]].forEach(function (q) { C.add(gS(0.3), tlm(0xB8C8FF, "glow"), q[0], 1.1, q[1]); C.add(gC(0.2, 0.25, 0.2, 8), gold, q[0], 0.85, q[1]); });
break;
case "transfig":
for (i = 0; i < 5; i++) {
var tx = cx - 6 + i * 3;
C.add(gC(0.3, 0.35, 1, 8), stoneD, tx, 0.5, r.z0 + 2.5);
C.solid(tx, r.z0 + 2.5, 0.35, 0.35, 1);
var cup = C.add(gC(0.12, 0.08, 0.14, 10), tlm(0xF2EEE6), tx, 1.08, r.z0 + 2.5), sp = C.add(gS(0.12), tlm(0x8A6A4A), tx, 1.2, r.z0 + 2.5);
(function (c, s, k) { A.push(function (t) { var on = Math.sin(t * 0.6 + k * 1.3) > 0; c.visible = !on; s.visible = on; s.position.y = 1.25 + (on ? Math.abs(Math.sin(t * 4 + k)) * 0.25 : 0); }); })(cup, sp, i);
}
var cage = C.add(gC(0.6, 0.6, 1.4, 10, true), iron, r.x1 - 2, 0.7, r.z1 - 2);
cage.material = tlm(0x3A3A3E, "ds");
break;
case "duel":
C.add(gB(16, 0.4, 3), stoneD, cx, 0.2, cz);
C.add(gB(16.2, 0.04, 0.12), gold, cx, 0.42, cz - 1.5);
C.add(gB(16.2, 0.04, 0.12), gold, cx, 0.42, cz + 1.5);
for (i = 0; i < 4; i++) {
var tz = r.z0 + 3 + i * 2.6, tg = new THREE.Group();
tg.position.set(r.x1 - 2, 0, tz);
var post = new THREE.Mesh(gC(0.08, 0.08, 1.6, 6), oakD);
post.position.y = 0.8;
tg.add(post);
[0.6, 0.42, 0.24].forEach(function (rr, k) { var dsk = new THREE.Mesh(gC(rr, rr, 0.06, 20), tlm(k % 2 ? 0xF2EEE6 : 0xA82A2A)); dsk.rotation.z = Math.PI / 2; dsk.position.set(0, 1.8, 0.02 * k); tg.add(dsk); });
tg.rotation.y = -Math.PI / 2;
C.root.add(tg);
C.solid(r.x1 - 2, tz, 0.3, 0.6, 2.4);
}
[[0xD84A1A, "FIRE"], [0xC8E0FF, "STORM"], [0x8AD8F0, "FROST"], [0xF0D890, "LIGHT"]].forEach(function (q, k) {
F.banner(r.x0 + 4 + k * 5.5, r.z1 - 0.4, Math.PI, q[0], true);
var orb = C.add(gS(0.3), tlm(q[0], "glow"), r.x0 + 4 + k * 5.5, 1.3, r.z1 - 1.6);
C.add(gC(0.15, 0.25, 1, 8), stoneD, r.x0 + 4 + k * 5.5, 0.5, r.z1 - 1.6);
C.solid(r.x0 + 4 + k * 5.5, r.z1 - 1.6, 0.3, 0.3, 1.4);
(function (m, k) { A.push(function (t) { m.position.y = 1.3 + Math.sin(t * 1.5 + k) * 0.1; m.scale.setScalar(0.9 + 0.2 * Math.sin(t * 3 + k)); }); })(orb, k);
});
for (i = 0; i < 8; i++) {
var w = C.add(gC(0.015, 0.02, 0.45, 5), oakD, r.x0 + 1.2, 1.4, r.z0 + 3 + i * 0.3, 0, 0, 0.3);
}
C.block(0.6, 1.2, 3, oak, r.x0 + 1.2, 0, r.z0 + 4);
break;
case "healing":
for (i = 0; i < 4; i++) {
var bz = r.z0 + 2.5 + i * 4.4;
C.block(2, 0.6, 1, tlm(0xE8EEF2), r.x1 - 2, 0, bz);
C.add(gB(0.4, 0.15, 0.8), tlm(0xF8F8F8), r.x1 - 1.2, 0.68, bz);
C.add(gB(0.1, 1.2, 1.1), tlm(0xD8D8E0), r.x1 - 0.95, 0.6, bz);
}
C.add(gB(3, 2.4, 0.5), oakD, cx, 1.2, r.z0 + 0.5);
for (i = 0; i < 12; i++) {
C.add(gC(0.08, 0.08, 0.24, 6), tlm([0x7AE8A0, 0xE87AA0, 0xA07AE8, 0xE8D87A][i % 4], "glow"), cx - 1.2 + (i % 6) * 0.48, 0.9 + Math.floor(i / 6) * 0.8, r.z0 + 0.85);
}
var herbs = C.add(gS(0.4), tlm(0x7AE8A0, "glow"), cx, 0.6, cz + 3);
A.push(function (t) { herbs.material.opacity = 0.5 + 0.4 * Math.sin(t * 1.2); });
break;
case "conj":
var ring = C.add(gT(3, 0.07), glowC, cx, 0.05, cz, 0, Math.PI / 2), inner = C.add(gT(2.2, 0.05), glowC, cx, 0.05, cz, 0, Math.PI / 2);
var tri = C.add(gT(2.6, 0.04, Math.PI * 2), glowC, cx, 0.05, cz, 0, Math.PI / 2);
tri.scale.set(1, 1, 1);
for (i = 0; i < 5; i++) {
var aa = i / 5 * Math.PI * 2;
C.add(gC(0.07, 0.07, 0.4, 6), tlm(0xF2EEE6), cx + Math.cos(aa) * 3.2, 0.2, cz + Math.sin(aa) * 3.2);
C.flame(cx + Math.cos(aa) * 3.2, 0.48, cz + Math.sin(aa) * 3.2, 1.4);
}
var wisp = C.add(gS(0.25), glowC, cx, 1, cz);
A.push(function (t) { inner.rotation.z = t * 0.5; ring.rotation.z = -t * 0.2; wisp.position.y = 1.2 + Math.sin(t * 1.5) * 0.5; wisp.position.x = cx + Math.cos(t * 0.8) * 1.2; wisp.position.z = cz + Math.sin(t * 0.8) * 1.2; });
break;
case "astro":
var sp2 = [];
for (i = 0; i < 300; i++) {
var h = (i * 2654435761) >>> 0;
sp2.push(r.x0 + ((h % 1000) / 1000) * (r.x1 - r.x0), AC_H - 0.25, r.z0 + (((h >>> 10) % 1000) / 1000) * (r.z1 - r.z0));
}
C.add(gB(r.x1 - r.x0 - 0.4, 0.05, r.z1 - r.z0 - 0.4), tlm(0x060A1E), cx, AC_H - 0.1, cz);
var sgm = new THREE.BufferGeometry();
sgm.setAttribute("position", new THREE.Float32BufferAttribute(sp2, 3));
C.root.add(new THREE.Points(sgm, new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.16, depthWrite: false })));
var tel = new THREE.Group();
tel.position.set(cx + 5, 0, cz - 6);
C.root.add(tel);
var tri2 = new THREE.Mesh(gC(0.08, 0.12, 1.6, 6), oakD);
tri2.position.y = 0.8;
tel.add(tri2);
var tube = new THREE.Mesh(gC(0.22, 0.32, 3.2, 12), gold);
tube.position.set(0, 1.9, 0.4);
tube.rotation.x = -0.8;
tel.add(tube);
C.solid(cx + 5, cz - 6, 0.8, 0.8, 3);
var orr = new THREE.Group();
orr.position.set(cx - 4, 1.6, cz - 2);
C.root.add(orr);
orr.add(new THREE.Mesh(gS(0.35), tlm(0xFFD040, "glow")));
[[0.9, 0.08, 0x9A8A7A], [1.4, 0.12, 0xE8C88A], [1.9, 0.13, 0x3A7AD8], [2.4, 0.1, 0xD85A3A], [3.0, 0.25, 0xD8B88A]].forEach(function (q) { var arm = new THREE.Group(); var pl = new THREE.Mesh(gS(q[1]), tlm(q[2])); pl.position.x = q[0]; arm.add(pl); var rg = new THREE.Mesh(gT(q[0], 0.01), gold); rg.rotation.x = Math.PI / 2; orr.add(rg); orr.add(arm); });
C.add(gC(0.08, 0.3, 1.2, 8), gold, cx - 4, 0.6, cz - 2);
C.solid(cx - 4, cz - 2, 0.5, 0.5, 1.5);
A.push(function (t) { orr.children.forEach(function (c, k) { if (c.type === "Group")
c.rotation.y = t * (1.4 / (k * 0.5 + 1)); }); });
for (i = 0; i < 6; i++) {
C.add(gB(1.6, 0.25, 0.9), tlm(0x2A2A4A), cx - 5 + i * 2, 0.15, cz + 5);
}
break;
case "clock":
var gears = [];
[[cx - 3, 4, cz - 9, 2.2, 1], [cx + 1.4, 6, cz - 9, 1.5, -1.5], [cx + 4, 3.5, cz - 9, 1.1, 2.2], [cx - 1, 1.8, cz - 9, 0.9, -2.8]].forEach(function (q) {
var gg = new THREE.Group();
gg.position.set(q[0], q[1], q[2]);
C.root.add(gg);
var disc = new THREE.Mesh(gC(q[3], q[3], 0.2, 24), tlm(0xB8902A));
disc.rotation.x = Math.PI / 2;
gg.add(disc);
var hub = new THREE.Mesh(gC(q[3] * 0.25, q[3] * 0.25, 0.3, 12), tlm(0x5A4A2A));
hub.rotation.x = Math.PI / 2;
gg.add(hub);
for (var tt = 0; tt < 16; tt++) {
var tooth = new THREE.Mesh(gB(0.25, 0.3, 0.2), tlm(0xB8902A));
var ta = tt / 16 * Math.PI * 2;
tooth.position.set(Math.cos(ta) * (q[3] + 0.1), Math.sin(ta) * (q[3] + 0.1), 0);
tooth.rotation.z = ta;
gg.add(tooth);
}
gears.push([gg, q[4]]);
});
var face = hallCanvas(256, 256, function (g, w, h) {
g.fillStyle = "#F4ECD8";
g.beginPath();
g.arc(128, 128, 124, 0, Math.PI * 2);
g.fill();
g.strokeStyle = "#3A2A1A";
g.lineWidth = 6;
g.stroke();
g.fillStyle = "#3A2A1A";
g.font = "bold 26px Georgia,serif";
g.textAlign = "center";
g.textBaseline = "middle";
["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"].forEach(function (n, k) { var a = k / 12 * Math.PI * 2 - Math.PI / 2; g.fillText(n, 128 + Math.cos(a) * 96, 128 + Math.sin(a) * 96); });
});
var fc = C.add(gC(2.4, 2.4, 0.1, 32), new THREE.MeshBasicMaterial({ map: face.tex }), cx, 5.5, r.z1 - 0.4);
fc.rotation.x = Math.PI / 2;
fc.rotation.y = Math.PI;
var hand = C.add(gB(0.12, 1.8, 0.05), tlm(0x1A1A1A), cx, 5.5, r.z1 - 0.5), hand2 = C.add(gB(0.16, 1.2, 0.05), tlm(0x1A1A1A), cx, 5.5, r.z1 - 0.52);
var pend = new THREE.Group();
pend.position.set(cx, 8, cz - 6);
C.root.add(pend);
var rod = new THREE.Mesh(gB(0.08, 5, 0.08), tlm(0xB8902A));
rod.position.y = -2.5;
pend.add(rod);
var bob = new THREE.Mesh(gC(0.6, 0.6, 0.15, 20), tlm(0xD8B040));
bob.rotation.x = Math.PI / 2;
bob.position.y = -5.2;
pend.add(bob);
A.push(function (t) {
gears.forEach(function (q) { q[0].rotation.z = t * 0.3 * q[1]; });
pend.rotation.z = Math.sin(t * 1.6) * 0.35;
var d = new Date(), hr = (d.getHours() % 12 + d.getMinutes() / 60) / 12 * Math.PI * 2, mn = d.getMinutes() / 60 * Math.PI * 2;
hand.rotation.z = -mn;
hand.position.set(cx + Math.sin(mn) * 0.9, 5.5 + Math.cos(mn) * 0.9, r.z1 - 0.5);
hand2.rotation.z = -hr;
hand2.position.set(cx + Math.sin(hr) * 0.6, 5.5 + Math.cos(hr) * 0.6, r.z1 - 0.52);
});
break;
case "crypt":
for (i = 0; i < 6; i++) {
var tx2 = r.x0 + 4 + (i % 3) * 8, tz2 = r.z0 + 6 + Math.floor(i / 3) * 10;
C.block(2.2, 0.9, 1.1, tlm(0x5A5650), tx2, 0, tz2);
C.add(gB(2.3, 0.12, 1.2), tlm(0x6E6A62), tx2, 0.96, tz2);
C.add(gC(0.05, 0.05, 0.25, 6), tlm(0xD8E0F0), tx2 + 0.8, 1.15, tz2);
C.flame(tx2 + 0.8, 1.36, tz2, 1);
}
var wisps = [];
for (i = 0; i < 7; i++) {
wisps.push(C.add(gS(0.18), tlm(0x9AC0FF, "glow"), cx, 1.5, cz));
}
A.push(function (t) { wisps.forEach(function (w, k) { w.position.set(cx + Math.sin(t * 0.3 + k * 0.9) * 8, 1.4 + Math.sin(t * 0.7 + k) * 0.6, cz + Math.cos(t * 0.25 + k * 1.3) * 10); w.material.opacity = 0.4 + 0.4 * Math.sin(t + k); }); });
break;
case "pool":
var water = C.add(gB(r.x1 - r.x0 - 6, 0.05, r.z1 - r.z0 - 8), tlm(0x2A7AA8, "water"), cx, 0.03, cz - 1);
C.add(gB(r.x1 - r.x0 - 5.4, 0.2, 0.3), stoneD, cx, 0.1, r.z0 + 2.7);
C.add(gB(r.x1 - r.x0 - 5.4, 0.2, 0.3), stoneD, cx, 0.1, r.z1 - 4.7);
var fish = [];
for (i = 0; i < 9; i++) {
fish.push(C.add(gS(0.14), tlm([0xF0A040, 0x7AE8F0, 0xE87AC8][i % 3], "glow"), cx, 0.01, cz));
}
A.push(function (t) { fish.forEach(function (f, k) { f.position.set(cx + Math.sin(t * 0.4 + k) * (4 + k % 3 * 2), 0.0, cz - 1 + Math.cos(t * 0.35 + k * 1.7) * (5 + k % 2 * 3)); f.scale.set(1.6, 0.4, 0.7); f.rotation.y = t * 0.4 + k; }); water.material.opacity = 0.78 + 0.06 * Math.sin(t); });
for (i = 0; i < 5; i++)
C.add(gC(0.6, 0.7, 0.2, 10), stoneD, cx - 6 + i * 3, 0.08, cz + 3);
break;
}
},
function () {
var el = hallPanel("ac-panel", "#8A6AE8");
if (!el)
return;
var r = acWhere();
if (!r || !walkMode || AC.lesson) {
el.style.display = "none";
return;
}
el.style.display = "block";
var h = '<h4 style="color:#D8C8FF">' + esc(r.name) + '</h4>';
if (r.subj) {
var tch = acTeacher(r);
h += '<div class="dim">' + (tch ? esc(tch) + ' is teaching (' + esc(AC_STAFF[r.job][0]) + ').' : 'The professor is off duty; the lesson book on the lectern teaches in their place.') + '</div>';
r.subj.forEach(function (s) {
var know = acLearned(s);
h += '<div class="item"><b>' + esc(acTitle(s)) + '</b> ' + (know ? '<span style="color:#9AE8A0">learned ✓</span>' : '<span class="dim">not yet learned</span>') +
'<div class="row"><button class="btn" data-acl="' + esc(s) + '">' + (know ? 'Take the lesson again' : 'Take the lesson') + '</button></div></div>';
});
}
else if (r.id === "hall" || r.id === "entrance") {
h += '<div class="dim">Welcome to the Academy of the Arcane. Every power and magic is taught here, free, to anyone who will learn. ' +
(acKeeper() ? '<b style="color:var(--gold,#C9A868)">Keeper: you know everything already.</b>' : 'You know <b style="color:var(--bone)">' + acCount() + ' of ' + AC_SUBJECTS.length + '</b>.') + '</div>';
h += '<div class="item"><b>Where each is taught</b>';
AC_ROOMS.filter(function (q) { return q.subj; }).forEach(function (q) {
var where = q.up ? "up the grand staircase" : q.down ? "down the dungeon steps" : (q.x1 <= -22 ? "off the West Gallery" : "off the East Gallery");
h += '<div style="margin-top:3px"><span style="color:#D8C8FF">' + esc(q.name) + '</span> <span class="dim">(' + where + ')</span><br><span class="dim" style="font-size:12px">' + q.subj.map(function (s) { return (acLearned(s) ? "✓ " : "") + esc(s); }).join(" · ") + '</span></div>';
});
h += '</div>';
}
else if (r.id === "library") {
h += '<div class="dim">Spellbooks, histories of magic, and a great many books that would rather not be read. The Public Library in the Civic Ring has books you can read in full.</div>';
}
else if (r.id === "secret") {
h += '<div><b>You found the Room of Echoes.</b> <span class="dim">Few dreamers ever do. The mirror shows what you wish for, which is not always the same as what you need.</span></div>';
}
else if (r.id === "common") {
h += '<div class="dim">Sit by the fire. Students of every house are welcome here.</div>';
}
else if (r.id === "study") {
var tch2 = acTeacher(r);
h += '<div class="dim">' + (tch2 ? esc(tch2) + ', the Archmage, is at the desk.' : 'The Archmage is away. The phoenix keeps an eye on things.') + '</div>';
}
else {
h += '<div class="dim">' + (r.up ? "The towers: the Astronomy Tower, the Clock Tower and the Archmage's study." : r.down ? "The dungeons: the Crypt of Voices and the Sunken Pool." : "Torches, portraits and armour. Every classroom is named over its door.") + '</div>';
}
el.innerHTML = h;
},
function (subject) {
var L = AC_LORE[subject];
if (!L)
return;
var r = acRoomOf(subject);
AC.lesson = { subject: subject, stage: 0, t0: Date.now(), runes: null, next: 1, miss: 0 };
if (typeof signedIn === "function" && signedIn())
cityRpc("academy_begin", { p_subject: subject }).then(function (o) { if (o && o.ok && AC.lesson)
AC.lesson.prof = o.professor || null; }).catch(function () { });
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
acLessonPaint();
},
function () {
var el = document.getElementById("ac-lesson");
if (!el) {
el = document.createElement("div");
el.id = "ac-lesson";
el.style.cssText = "position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;background:rgba(6,4,14,.72);padding:16px";
document.body.appendChild(el);
}
return el;
},
function () {
var Ls = AC.lesson, el = acLessonEl();
if (!Ls) {
el.style.display = "none";
acPaint();
return;
}
el.style.display = "flex";
var L = AC_LORE[Ls.subject], r = acRoomOf(Ls.subject), col = "#" + (r.col || 0x8A6AE8).toString(16).padStart(6, "0");
var tch = acTeacher(r) || Ls.prof;
var h = '<div style="width:min(520px,100%);max-height:90vh;overflow:auto;background:#120E1E;border:1px solid ' + col + ';border-radius:6px;padding:18px 20px;color:var(--bone,#eee);font:14px var(--sans,sans-serif);line-height:1.55;box-shadow:0 0 60px rgba(140,100,255,.25)">' +
'<div style="display:flex;justify-content:space-between;align-items:center"><span style="font:12px var(--sans);color:' + col + ';letter-spacing:.08em;text-transform:uppercase">' + esc(r.name) + ' · ' + esc(L[0]) + '</span><button class="btn" data-acx="1">Leave the lesson</button></div>' +
'<h3 style="margin:8px 0 2px;font:600 22px Georgia,serif;color:#F4ECD8">' + esc(acTitle(Ls.subject)) + '</h3>' +
'<div style="color:var(--dim,#999);font-size:12.5px;margin-bottom:10px">' + (tch ? 'Taught by ' + esc(tch) : 'Taught by the lesson book on the lectern') + '</div>';
if (Ls.stage < 3) {
h += '<div style="display:flex;gap:6px;margin-bottom:10px">' + [0, 1, 2].map(function (k) { return '<span style="flex:1;height:3px;background:' + (k <= Ls.stage ? col : "#2A2440") + '"></span>'; }).join("") + '</div>' +
'<p style="font-size:15.5px;margin:0 0 14px">' + esc(L[1][Ls.stage]) + '</p>' +
'<button class="btn" data-acn="1">' + (Ls.stage < 2 ? "Go on" : "Now, the practice") + '</button>';
}
else if (Ls.stage === 3) {
h += '<p style="margin:0 0 8px">The practice: touch the glowing runes <b>in order, one to five</b>.' + (Ls.miss ? ' <span style="color:#E8A07A">Begin again from one.</span>' : '') + '</p>' +
'<div id="ac-runes" style="position:relative;height:220px;background:radial-gradient(circle at 50% 50%,#22183A,#0C0816);border-radius:4px;overflow:hidden"></div>';
}
else if (Ls.stage === 4) {
var q = L[2], opts = [q[1], q[2], q[3]], order = [0, 1, 2].sort(function (a, b) { return ((Ls.t0 >> a) & 7) - ((Ls.t0 >> b) & 7); });
h += '<p style="margin:0 0 10px"><b>The question.</b> ' + esc(q[0]) + '</p>' + order.map(function (k) { return '<div style="margin:6px 0"><button class="btn" style="width:100%;text-align:left" data-acq="' + k + '">' + esc(opts[k]) + '</button></div>'; }).join("") +
(Ls.wrong ? '<div style="color:#E8A07A;margin-top:6px">Not quite. Think back to the teaching, and try again.</div>' : '');
}
else if (Ls.stage === 5) {
h += '<p style="font-size:16px;margin:4px 0 10px;color:#C8FFD0"><b>' + esc(Ls.say || ("You have learned " + Ls.subject + ".")) + '</b></p>' +
'<p class="dim" style="color:var(--dim,#999);margin:0 0 12px">' + esc(acUseHint(Ls.subject)) + '</p><button class="btn" data-acx="1">Thank the professor</button>';
}
else if (Ls.stage === 6) {
h += '<p style="margin:4px 0 12px">The professor smiles: <i>"Patience. A lesson needs a little longer than that."</i> ' + esc(Ls.say || "") + '</p><button class="btn" data-acw="1">Wait, then try again</button>';
}
h += '</div>';
el.innerHTML = h;
if (Ls.stage === 3)
acRunes();
},
function (s) {
if (s === "flying" || s === "floating")
return "Space to rise and C to come down, outdoors. Switch it off and on under “What you can do in dreams”.";
if (s === "riding enchanted things")
return "Step onto a broom, a carpet, a sleigh or a fire chariot, and it rises for you.";
if (/casting/.test(s))
return "Pick up the wand, staff, staff of frost or orb that goes with it, and use it with F.";
if (s === "passing through walls")
return "It works anywhere in the dreamscape except the city streets, where the Dragon Corp keeps the walls solid for everyone.";
return "It is on your power bar at the bottom left now (number keys use them), and under “What you can do in dreams”.";
},
function () {
var box = document.getElementById("ac-runes");
if (!box)
return;
var Ls = AC.lesson;
var r = acRoomOf(Ls.subject), col = "#" + (r.col || 0x8A6AE8).toString(16).padStart(6, "0");
if (!Ls.runes) {
Ls.runes = [];
var seed = (Ls.t0 & 0xffff) + Ls.miss * 977;
for (var i = 0; i < 5; i++) {
seed = (seed * 1103515245 + 12345) & 0x7fffffff;
var x = 8 + (seed % 84);
seed = (seed * 1103515245 + 12345) & 0x7fffffff;
var y = 10 + (seed % 74);
for (var k = 0; k < Ls.runes.length; k++) {
if (Math.abs(Ls.runes[k].x - x) < 14 && Math.abs(Ls.runes[k].y - y) < 18) {
x = (x + 31) % 84 + 8;
y = (y + 29) % 74 + 10;
}
}
Ls.runes.push({ x: x, y: y });
}
Ls.next = 1;
}
var glyph = ["ᚠ", "ᚱ", "ᛉ", "ᛟ", "ᛗ"], h = '<svg width="100%" height="100%" style="position:absolute;inset:0;pointer-events:none">';
for (var j = 1; j < Ls.next - 1; j++) {
var a = Ls.runes[j - 1], b = Ls.runes[j];
h += '<line x1="' + a.x + '%" y1="' + a.y + '%" x2="' + b.x + '%" y2="' + b.y + '%" stroke="' + col + '" stroke-width="2" opacity=".9"/>';
}
h += '</svg>';
Ls.runes.forEach(function (p, i) {
var done = i + 1 < Ls.next;
h += '<button data-acr="' + (i + 1) + '" style="position:absolute;left:calc(' + p.x + '% - 21px);top:calc(' + p.y + '% - 21px);width:42px;height:42px;border-radius:50%;border:2px solid ' + col + ';background:' + (done ? col : "rgba(20,14,36,.9)") + ';color:' + (done ? "#120E1E" : "#F4ECD8") + ';font:16px Georgia,serif;cursor:pointer;box-shadow:0 0 ' + (done ? 18 : 10) + 'px ' + col + '">' + glyph[i] + '<span style="position:absolute;right:-2px;bottom:-4px;font:10px var(--sans);color:' + col + '">' + (i + 1) + '</span></button>';
});
box.innerHTML = h;
},
function () {
var Ls = AC.lesson;
if (!Ls)
return;
var s = Ls.subject, d = acStore();
function done(say, teacher) {
d.learned[s] = d.learned[s] || { at: new Date().toISOString(), teacher: teacher || null };
d.powersOff = d.powersOff.filter(function (x) { return x !== s; });
if (typeof save === "function")
save();
acApply();
Ls.stage = 5;
Ls.say = say;
acLessonPaint();
setStatus("<b>" + esc(say) + "</b>");
if (typeof pwBurst === "function") {
var P = camera.position, r = acRoomOf(s);
pwBurst(P.x, P.y - 1, P.z, r.col, 60, [0.8, 1.4, 0.8], 1.4, "swirl", 0.18);
}
}
if (typeof signedIn === "function" && signedIn()) {
if (Date.now() - Ls.t0 < 31000) {
Ls.stage = 6;
Ls.say = "";
acLessonPaint();
setTimeout(function () { if (AC.lesson === Ls && Ls.stage === 6) {
Ls.say = "(It has been long enough now.)";
acLessonPaint();
} }, Math.max(0, 31500 - (Date.now() - Ls.t0)));
return;
}
cityRpc("academy_learn", { p_subject: s }).then(function (o) {
if (o && o.ok)
done(o.say || ("You have learned " + s + "."), o.teacher);
else if (o && /not over/.test(o.say || "")) {
Ls.stage = 6;
Ls.say = o.say;
acLessonPaint();
}
else if (o && /Take the lesson/.test(o.say || "")) {
cityRpc("academy_begin", { p_subject: s }).catch(function () { });
Ls.t0 = Date.now();
Ls.stage = 6;
Ls.say = "The professor starts the lesson over.";
acLessonPaint();
}
else if (o && o.tuition) {
AC.lesson = null;
acLessonPaint();
if (typeof actLoad === "function")
actLoad(true).then(function () { actCard(s, o.say); });
else
setStatus(esc(o.say || ""));
}
else
done("You have learned " + s + ".");
}).catch(function () { done("You have learned " + s + "."); });
}
else
done("You have learned " + s + ".");
},
function () {
if (!INT || !INT.academy || !INT.root)
return;
var Ad = INT.academy, h = (typeof cityHourNow === "function") ? cityHourNow() : 12;
var list = (typeof TEMPS !== "undefined" && TEMPS.list) ? TEMPS.list.filter(function (t) { return t.post && t.post.workplace === AC_KEY; }) : [];
var want = {};
if (list.length) {
list.forEach(function (t) { var job = t.post.job; if (!AC_STAFF[job])
return; if (typeof tempOnShift === "function" ? tempOnShift(t) : acOnShift(job, h))
want[job] = want[job] || { id: t.id, name: t.name, f: t.f, job: job }; });
}
else {
Object.keys(AC_STAFF).forEach(function (job) {
if (acOnShift(+job, h)) {
var id = "tw" + job + "_0", hs = (typeof hash === "function") ? hash(id) : job * 7, f = (hs >>> 3) % 2 === 0;
var nm = (typeof TEMP_GIVEN_F !== "undefined") ? ((f ? TEMP_GIVEN_F : TEMP_GIVEN_M)[(hs >>> 5) % 20] + " " + SURNAME[(hs >>> 10) % SURNAME.length]) : "The professor";
want[job] = { id: id, name: nm, f: f, job: +job };
}
});
}
Object.keys(Ad.staff).forEach(function (job) { if (!want[job]) {
var g = Ad.staff[job].g;
if (g && g.parent)
g.parent.remove(g);
delete Ad.staff[job];
} });
Object.keys(want).forEach(function (job) {
if (Ad.staff[job])
return;
var w = want[job], S = AC_STAFF[job], r = AC_ROOM[S[1]];
var t = { id: w.id, f: w.f, post: { title: S[0], workplace: AC_KEY, job: +job }, mode: "desk", seed: 0 };
var L = (typeof tempLook === "function") ? tempLook(t) : {};
if (typeof jobDress === "function")
jobDress(L, S[0], AC_KEY);
var g = buildFigure({ id: "__ac_" + job, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
var sp = (INT.spots || []).filter(function (q) { return q.room === r.id; })[0] || { x: (r.x0 + r.x1) / 2, z: (r.z0 + r.z1) / 2 };
var west = r.x1 <= -22 && !r.down, east = r.x0 >= 22 && !r.up;
g.position.set(sp.x, 0, sp.z);
g.rotation.y = west ? Math.PI / 2 : east ? -Math.PI / 2 : 0;
var tag = makeTag(w.name + " · " + S[0], false);
tag.position.y = 2.2;
g.add(tag);
g.traverse(function (m) { m.raycast = function () { }; });
INT.root.add(g);
Ad.staff[job] = { g: g, name: w.name };
});
}
];
});
