/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(453, function () {
return [
function (L, o) {
var r = L._nv || "", W = NVB_WEAR[r] || NVB_WEAR[r.replace(/\d+$/, "")], i = +(String(r).match(/\d+$/) || [0])[0];
if (!W || typeof ozwFromLook !== "function")
return null;
var x = Object.assign({}, W.x);
if (/^boy/.test(r)) {
x.coatCol = NVB_FUR[i % NVB_FUR.length];
x.trou = ozwDark(x.coatCol, 0.25);
}
if (/^pirate/.test(r)) {
var P = NVB_PIR[i % NVB_PIR.length];
x.shirt = P[0];
x.trou = [0x3A3428, 0x2A2A3A, 0x4A3A2A][i % 3];
x.sash = P[1];
x.tieCol = P[1];
}
var R = ozwFromLook(L, { f: !!W.f, kid: !!W.kid, lk: "nv" }, x);
if (R && R.col) {
if (x.sash != null)
R.col.sash = x.sash;
else if (!R.col.sash)
R.col.sash = 0x8A2A2A;
if (x.trim != null)
R.col.trim = x.trim;
}
return R;
},
function (add, c, E) {
var L = (E && E.spec && E.spec.look) || {}, r = String(L._nv || ""), k = r.replace(/\d+$/, ""), i = +(r.match(/\d+$/) || [0])[0], g, m;
if (k === "john") {
g = new THREE.Group();
m = nvbM(0x16161A, { r: 0.6 });
g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.016, 24), m));
var cr = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.12, 0.24, 22), m);
cr.position.y = 0.12;
g.add(cr);
var bd = new THREE.Mesh(new THREE.CylinderGeometry(0.122, 0.122, 0.035, 22, 1, true), nvbM(0x3A3A44, { r: 0.4 }));
bd.position.y = 0.03;
g.add(bd);
add("Head", [0, 0.15, -0.01], g);
return;
}
if (k === "peter") {
g = new THREE.Group();
var cap = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.22, 10), nvbM(0x3E7A2A, { r: 0.9 }));
cap.position.y = 0.06;
cap.rotation.x = -0.5;
cap.position.z = -0.04;
g.add(cap);
var fe = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), nvbM(0xC82A1E, { r: 0.7 }));
fe.scale.set(0.5, 0.4, 4);
fe.position.set(0.08, 0.06, -0.08);
fe.rotation.x = 0.6;
g.add(fe);
add("Head", [0, 0.13, 0], g);
var dg = new THREE.Group(), bl = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.2, 0.04), nvbM(0xC8CCD4, { r: 0.3, m: 0.8 }));
bl.position.y = -0.1;
dg.add(bl);
dg.add(new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.1), nvbM(0x6A4A2A)));
add("pelvis", [0.15, 0, 0.05], dg);
return;
}
if (k === "boy") {
var fur = nvbM(NVB_FUR[i % NVB_FUR.length], { r: 1 });
g = new THREE.Group();
var hd = new THREE.Mesh(new THREE.SphereGeometry(0.135, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.6), fur);
hd.material.side = THREE.DoubleSide;
g.add(hd);
[-1, 1].forEach(function (s) { var e = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 8), fur); e.position.set(s * 0.09, 0.1, -0.01); g.add(e); });
add("Head", [0, 0.04, -0.01], g);
if (i % 3 === 0) {
var bow = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.01, 4, 16, Math.PI), nvbM(0x6A4A2A));
bow.rotation.z = Math.PI / 2;
add("spine_03", [0, 0, -0.14], bow);
}
return;
}
if (k === "hook") {
g = new THREE.Group();
m = nvbM(0x141016, { r: 0.85 });
var br = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.31, 0.018, 26), m);
br.rotation.x = 0.12;
g.add(br);
var cw = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.13, 0.14, 20), m);
cw.position.y = 0.07;
g.add(cw);
[0x1A1A1A, 0xC8202A, 0xF0ECE0].forEach(function (col, j) { var pl = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 6), nvbM(col, { r: 0.9 })); pl.scale.set(0.8, 0.5, 4.2); pl.position.set(-0.12 + j * 0.05, 0.1, -0.06); pl.rotation.y = 0.5; pl.rotation.x = -0.25; g.add(pl); });
add("Head", [0, 0.15, -0.01], g);
var hk = new THREE.Group(), st = nvbM(0xC8CCD4, { r: 0.25, m: 0.9 });
var arc = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 8, 14, Math.PI * 1.3), st);
arc.position.y = -0.16;
arc.rotation.z = -0.4;
hk.add(arc);
var sh = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.12, 8), st);
sh.position.y = -0.08;
hk.add(sh);
hk.add(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.045, 0.06, 12), nvbM(0x2A1A0E, { r: 0.7 })));
add("hand_r", [0, 0, 0], hk);
return;
}
if (k === "smee") {
g = new THREE.Group();
var cp = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.28, 14), nvbM(0xB82A2A, { r: 1 }));
cp.position.y = 0.08;
cp.rotation.x = -0.7;
cp.position.z = -0.06;
g.add(cp);
add("Head", [0, 0.12, 0], g);
var sp = new THREE.Group(), wm = nvbM(0x8A7A5A, { r: 0.3, m: 0.8 });
[-1, 1].forEach(function (s) { var rg = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.004, 6, 16), wm); rg.position.x = s * 0.036; sp.add(rg); });
add("Head", [0, 0.07, 0.11], sp);
return;
}
if (k === "pirate") {
var P = NVB_PIR[i % NVB_PIR.length];
g = new THREE.Group();
var kf = new THREE.Mesh(new THREE.SphereGeometry(0.135, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.5), nvbM(P[1], { r: 0.95 }));
kf.material.side = THREE.DoubleSide;
g.add(kf);
var kn = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), kf.material);
kn.position.set(0, 0.02, -0.145);
g.add(kn);
g.scale.set(1.08, 1.05, 1.14);
add("Head", [0, 0.112, -0.022], g);
var ear = new THREE.Mesh(new THREE.TorusGeometry(0.014, 0.003, 6, 12), nvbM(0xE8C040, { r: 0.2, m: 0.9 }));
add("Head", [0.075, 0.0, 0.01], ear);
if (i % 2) {
var cut = new THREE.Group(), b2 = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.5, 0.04), nvbM(0xC8CCD4, { r: 0.3, m: 0.8 }));
b2.position.y = -0.3;
cut.add(b2);
add("pelvis", [-0.16, 0, 0], cut);
}
return;
}
if (k === "tiger" || k === "bluffm" || k === "blufff") {
g = new THREE.Group();
var band = new THREE.Mesh(new THREE.TorusGeometry(0.118, 0.012, 6, 24), nvbM(0xC83A2A, { r: 0.8 }));
band.rotation.x = Math.PI / 2;
g.add(band);
for (var b = 0; b < 10; b++) {
var a = b / 10 * Math.PI * 2, bd2 = new THREE.Mesh(new THREE.SphereGeometry(0.008, 6, 4), nvbM([0xF0F0E8, 0x2A6A8A, 0xE8C040][b % 3], { r: 0.4 }));
bd2.position.set(Math.cos(a) * 0.12, 0, Math.sin(a) * 0.12);
g.add(bd2);
}
var nf = k === "tiger" ? 3 : (k === "bluffm" ? 1 : 0);
for (var f = 0; f < nf; f++) {
var fe2 = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), nvbM(f % 2 ? 0x2A2A2A : 0xF0ECE0, { r: 0.9 }));
fe2.scale.set(0.5, 4, 0.25);
fe2.position.set(-0.03 + f * 0.03, 0.1, -0.11);
fe2.rotation.z = -0.2 + f * 0.2;
g.add(fe2);
}
add("Head", [0, 0.07, -0.005], g);
return;
}
if (k === "liza") {
var lc = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.05, 16), nvbM(0xF8F6F0, { r: 0.9 }));
add("Head", [0, 0.15, -0.03], lc);
return;
}
if (k === "mrsdarling") {
var pr = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.008, 6, 24), nvbM(0xF4F0E8, { r: 0.2, m: 0.3 }));
pr.rotation.x = Math.PI / 2;
add("neck_01", [0, -0.03, 0.01], pr);
return;
}
if (k === "wendyold") {
var cm = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.006, 14), nvbM(0xE8D8C0, { r: 0.4 }));
cm.rotation.x = Math.PI / 2;
add("neck_01", [0, -0.06, 0.07], cm);
return;
}
},
function (seed, role, o) {
o = o || {};
var W = NVB_WEAR[role.replace(/\d+$/, "")] || {}, look = Object.assign({}, o.look || {});
look._nv = role;
look.sex = W.f ? "f" : "m";
if (o.age)
look.age = o.age;
var g;
try {
g = wPerson("nvb_" + seed, { child: !!W.kid, sex: look.sex, ozCos: "oz_nvb", look: look });
}
catch (e) {
g = new THREE.Group();
var b = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.6, 0.3), wM(0x8A7A6A));
b.position.y = 0.8;
g.add(b);
}
if (o.s)
g.scale.multiplyScalar(o.s);
g.userData.nvb = role;
return g;
},
function () {
return nvbTex("paper", 256, 256, function (x, W, H) {
x.fillStyle = "#E8DCC8";
x.fillRect(0, 0, W, H);
for (var i = 0; i < W; i += 64) {
x.fillStyle = "rgba(150,170,140,.35)";
x.fillRect(i + 28, 0, 8, H);
}
for (var j = 0; j < 6; j++)
for (var k = 0; k < 4; k++) {
var cx = k * 64 + (j % 2 ? 32 : 0), cy = j * 44 + 20;
x.fillStyle = "rgba(200,120,130,.55)";
x.beginPath();
x.arc(cx, cy, 6, 0, 7);
x.fill();
x.fillStyle = "rgba(110,150,100,.6)";
x.beginPath();
x.ellipse(cx + 8, cy + 6, 6, 2.5, 0.6, 0, 7);
x.fill();
x.beginPath();
x.ellipse(cx - 8, cy + 6, 6, 2.5, -0.6, 0, 7);
x.fill();
}
}, [3, 1]);
},
function () {
return nvbTex("boards", 256, 256, function (x, W, H) {
for (var i = 0; i < 8; i++) {
var c = 110 + ((i * 37) % 30);
x.fillStyle = "rgb(" + c + "," + (c * 0.7 | 0) + "," + (c * 0.45 | 0) + ")";
x.fillRect(0, i * 32, W, 32);
x.fillStyle = "rgba(0,0,0,.25)";
x.fillRect(0, i * 32, W, 2);
for (var g = 0; g < 14; g++) {
x.fillStyle = "rgba(60,30,10,.12)";
x.fillRect((g * 53 + i * 29) % W, i * 32 + 4 + (g % 5) * 5, 40, 1);
}
x.fillStyle = "rgba(0,0,0,.3)";
x.fillRect((i * 97) % W, i * 32, 2, 32);
}
}, [3, 3]);
},
function () {
return nvbTex("lonnight", 1024, 512, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#070A1C");
g.addColorStop(0.7, "#1A2240");
g.addColorStop(1, "#2A2A3A");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
for (var s = 0; s < 260; s++) {
x.fillStyle = "rgba(255,255,240," + (0.3 + Math.random() * 0.7) + ")";
x.fillRect(Math.random() * W, Math.random() * H * 0.6, 1.5, 1.5);
}
[[700, 90, 5], [760, 110, 7]].forEach(function (q) { var r = x.createRadialGradient(q[0], q[1], 0, q[0], q[1], q[2] * 5); r.addColorStop(0, "#FFFFFF"); r.addColorStop(0.2, "rgba(255,250,220,.8)"); r.addColorStop(1, "rgba(255,250,220,0)"); x.fillStyle = r; x.fillRect(q[0] - 40, q[1] - 40, 80, 80); });
var R = wRand(14);
x.fillStyle = "#0E0E16";
var px = 0;
while (px < W) {
var w = 40 + R() * 90, h = H * 0.55 + R() * H * 0.2;
x.fillRect(px, h, w, H - h);
x.beginPath();
x.moveTo(px, h);
x.lineTo(px + w / 2, h - 20 - R() * 25);
x.lineTo(px + w, h);
x.fill();
for (var c = 0; c < 2 + R() * 3; c++) {
var cx = px + 8 + R() * (w - 16);
x.fillRect(cx, h - 32 - R() * 14, 9, 34);
x.fillStyle = "#1A1A22";
x.fillRect(cx - 2, h - 36 - R() * 10, 13, 5);
x.fillStyle = "#0E0E16";
}
for (var wi = 0; wi < 4; wi++) {
if (R() < 0.35) {
x.fillStyle = "rgba(255,210,120,.85)";
x.fillRect(px + 6 + R() * (w - 16), h + 20 + R() * 60, 7, 10);
x.fillStyle = "#0E0E16";
}
}
px += w - 4;
}
});
},
function (k) {
var R = NVB_ROOM[k], G = WORLDS.neverland && WORLDS.neverland.g;
if (!R || !G)
return null;
if (NVB.rooms[k])
return NVB.rooms[k];
var g = new THREE.Group();
g.position.set(R.x, R.y, R.z);
G.add(g);
g.visible = false;
var Q = { k: k, R: R, g: g, solids: [], doors: [], lights: [] };
NVB.rooms[k] = Q;
try {
({ nursery: nvbNursery, yard: nvbYard, hold: nvbHold, cabin: nvbCabin })[k](Q);
}
catch (e) {
if (window.console)
console.warn("[nvb] room", k, e);
}
return Q;
},
function (Q, wallMat, floorMat, ceilCol) {
var R = Q.R, g = Q.g, w = R.w, d = R.d, h = R.h;
var fl = wBox(w, 0.1, d, floorMat, 0, -0.05, 0, g);
if (!R.sky)
wBox(w, 0.1, d, wM(ceilCol || 0xF2EEE6), 0, h + 0.05, 0, g);
[[0, -d / 2, w, 0], [0, d / 2, w, 0], [-w / 2, 0, d, 1], [w / 2, 0, d, 1]].forEach(function (s) { var m = wMesh(new THREE.PlaneGeometry(s[2], h), wallMat, s[0], h / 2, s[1], g); if (s[3])
m.rotation.y = s[0] < 0 ? Math.PI / 2 : -Math.PI / 2;
else
m.rotation.y = s[1] < 0 ? 0 : Math.PI; });
return fl;
},
function (g, x, z, col, small) {
var L = small ? 1.5 : 1.9, W = small ? 0.8 : 0.95, wood = wM(0xD8D0C4);
wBox(W, 0.35, L, wood, x, 0.35, z, g);
wBox(W * 0.96, 0.16, L * 0.96, wM(0xF6F2EA), x, 0.6, z, g);
var q = wBox(W * 1.02, 0.06, L * 0.66, wM(col), x, 0.7, z + L * 0.15, g);
wBox(W * 0.6, 0.12, 0.36, wM(0xFAF8F2), x, 0.72, z - L * 0.36, g);
wBox(W, 0.9, 0.06, wood, x, 0.45, z - L / 2, g);
wBox(W, 0.6, 0.06, wood, x, 0.3, z + L / 2, g);
[-1, 1].forEach(function (s) { wCyl(0.03, 0.03, 1.0, wM(0xC8B890), x + s * W / 2, 0.5, z - L / 2, g, 8); var kn = wSph(0.05, wM(0xE8C860), x + s * W / 2, 1.02, z - L / 2, g, 8); });
return q;
},
function (Q) {
var R = Q.R, g = Q.g, w = R.w, d = R.d, h = R.h, wood = wM(0x8A5A34), dark = wM(0x4A2E1A), white = wM(0xF2EEE4);
var paper = new THREE.MeshLambertMaterial({ map: nvbWallpaper() }), floor = new THREE.MeshLambertMaterial({ map: nvbBoards() });
nvbShell(Q, paper, floor, 0xEEE8DC);
[[0, -d / 2 + 0.02, w, 0], [0, d / 2 - 0.02, w, 0], [-w / 2 + 0.02, 0, d, 1], [w / 2 - 0.02, 0, d, 1]].forEach(function (s) { wBox(s[3] ? 0.04 : s[2], 0.18, s[3] ? s[2] : 0.04, white, s[0], 0.09, s[1], g); wBox(s[3] ? 0.03 : s[2], 0.05, s[3] ? s[2] : 0.03, wood, s[0], 2.6, s[1], g); });
var rug = wTex(256, 160, function (x, W, H) {
x.fillStyle = "#7A2A2A";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#D8B870";
x.lineWidth = 8;
x.strokeRect(12, 12, W - 24, H - 24);
x.fillStyle = "#2A3A5A";
x.fillRect(30, 30, W - 60, H - 60);
for (var i = 0; i < 6; i++) {
x.fillStyle = i % 2 ? "#D8B870" : "#8A3A2A";
x.beginPath();
x.arc(50 + i * 31, H / 2, 9, 0, 7);
x.fill();
}
});
wMesh(new THREE.PlaneGeometry(4.6, 3), new THREE.MeshLambertMaterial({ map: rug }), 0, 0.012, 0.2, g).rotation.x = -Math.PI / 2;
var W0 = NVB_N.window, frame = wM(0xF4F0E8);
var ww = 2.0, wh = 1.9, wy = 0.95, wx = W0[0];
wBox(0.1, wh + 0.2, 0.16, frame, wx - ww / 2, wy + wh / 2, -d / 2 + 0.04, g);
wBox(0.1, wh + 0.2, 0.16, frame, wx + ww / 2, wy + wh / 2, -d / 2 + 0.04, g);
wBox(ww + 0.2, 0.1, 0.16, frame, wx, wy, -d / 2 + 0.04, g);
wBox(ww + 0.2, 0.1, 0.16, frame, wx, wy + wh, -d / 2 + 0.04, g);
wBox(ww + 0.4, 0.06, 0.34, frame, wx, wy - 0.03, -d / 2 + 0.12, g);
wMesh(new THREE.PlaneGeometry(ww, wh), new THREE.MeshBasicMaterial({ map: nvbNight(), fog: false }), wx, wy + wh / 2, -d / 2 + 0.01, g);
Q.casement = [];
[-1, 1].forEach(function (s) {
var p = new THREE.Group();
p.position.set(wx + s * ww / 2, wy, -d / 2 + 0.06);
g.add(p);
wBox(ww / 2, wh, 0.04, wB(0x9AB0D0, { op: 0.18 }), -s * ww / 4, wh / 2, 0, p);
[0.02, ww / 2 - 0.02].forEach(function (q) { wBox(0.04, wh, 0.05, frame, -s * q, wh / 2, 0, p); });
[0.02, wh / 2, wh - 0.02].forEach(function (q) { wBox(ww / 2, 0.04, 0.05, frame, -s * ww / 4, q, 0, p); });
Q.casement.push({ p: p, s: s });
});
[-1, 1].forEach(function (s) { var c = wBox(0.5, 2.4, 0.08, wM(0x6A8AB0), wx + s * (ww / 2 + 0.3), 1.4, -d / 2 + 0.18, g); });
wCyl(0.025, 0.025, ww + 1.4, wM(0xC8A050), wx, 2.65, -d / 2 + 0.2, g, 8).rotation.z = Math.PI / 2;
var F = NVB_N.fire;
wBox(1.9, 1.25, 0.4, wM(0xE8E0D2), F[0], 0.62, F[1] + 0.2 - 0.6, g);
wBox(1.0, 0.75, 0.42, wB(0x140C08), F[0], 0.4, F[1] - 0.39, g);
wBox(2.1, 0.08, 0.5, wood, F[0], 1.28, F[1] - 0.36, g);
Q.fire = wCone(0.22, 0.45, wB(0xFF9A3A, { fog: false }), F[0], 0.3, F[1] - 0.36, g, 7);
var fl = new THREE.PointLight(0xFF9A50, 1.0, 9);
fl.position.set(F[0], 0.8, F[1] + 0.4);
g.add(fl);
Q.fireLight = fl;
wBox(1.4, 0.12, 0.04, wM(0xC8A050), F[0], 0.06, F[1] + 0.15, g);
wBox(0.22, 0.28, 0.12, wM(0x3A2414), F[0], 1.46, F[1] - 0.4, g);
var face = wCyl(0.08, 0.08, 0.01, wM(0xF4F0E0), F[0], 1.48, F[1] - 0.33, g, 16);
face.rotation.x = Math.PI / 2;
var C = NVB_N.chair;
wBox(0.7, 0.45, 0.7, wM(0x7A3A3A), C[0], 0.23, C[1], g);
wBox(0.7, 0.7, 0.14, wM(0x7A3A3A), C[0], 0.8, C[1] + 0.3, g);
[-1, 1].forEach(function (s) { wBox(0.12, 0.3, 0.7, wM(0x6A2E2E), C[0] + s * 0.35, 0.6, C[1], g); });
wCyl(0.18, 0.14, 0.16, wM(0xC8A870), C[0] + 0.6, 0.08, C[1] - 0.2, g, 12);
Q.solids.push({ x: F[0], z: F[1] - 0.2, hw: 1.1, hd: 0.5 }, { x: C[0], z: C[1], r: 0.45 });
[[0xC8D8F0, 0], [0x9AB0D8, 0], [0xE8C8D0, 1]].forEach(function (b, i) { var B = NVB_N.beds[i]; nvbBed(g, B[0], B[1], b[0], !!b[1]); Q.solids.push({ x: B[0], z: B[1], hw: 0.5, hd: b[1] ? 0.75 : 0.95 }); });
NVB_N.lights.forEach(function (p) { wBox(0.45, 0.55, 0.4, wood, p[0], 0.27, p[1], g); nvbNightLight(Q, p[0], p[1]); });
var K = NVB_N.kennel, kg = new THREE.Group();
kg.position.set(K[0], 0, K[1]);
kg.rotation.y = -Math.PI / 2;
g.add(kg);
wBox(1.3, 0.9, 1.0, wM(0xA87A48), 0, 0.45, 0, kg);
var kr = wMesh(new THREE.CylinderGeometry(0.01, 0.75, 0.55, 4), wM(0x6A3A2A), 0, 1.17, 0, kg);
kr.rotation.y = Math.PI / 4;
kr.scale.set(1.2, 1, 1);
wBox(0.5, 0.6, 0.05, wB(0x1A0E08), 0, 0.35, 0.51, kg);
Q.solids.push({ x: K[0], z: K[1], hw: 0.6, hd: 0.75 });
var bw = NVB_N.bowl;
wCyl(0.16, 0.12, 0.08, wM(0xC83A2A), bw[0], 0.04, bw[1], g, 14);
Q.bowl = wCyl(0.13, 0.13, 0.01, wM(0xE8E0C8), bw[0], 0.085, bw[1], g, 14);
var D = NVB_N.drawers;
wBox(0.6, 1.1, 1.2, wood, D[0], 0.55, D[1], g);
for (var dr = 0; dr < 3; dr++) {
wBox(0.02, 0.3, 1.1, dark, D[0] - 0.31, 0.22 + dr * 0.34, D[1], g);
[-0.3, 0.3].forEach(function (q) { wSph(0.025, wM(0xC8A050), D[0] - 0.33, 0.22 + dr * 0.34, D[1] + q, g, 6); });
}
Q.drawer = wBox(0.5, 0.26, 1.06, wood, D[0] - 0.06, 0.9, D[1], g);
Q.solids.push({ x: D[0], z: D[1], hw: 0.35, hd: 0.65 });
var Wd = NVB_N.wardrobe;
wBox(0.7, 2.2, 1.3, dark, Wd[0], 1.1, Wd[1], g);
wBox(0.75, 0.1, 1.4, wood, Wd[0], 2.25, Wd[1], g);
Q.solids.push({ x: Wd[0], z: Wd[1], hw: 0.4, hd: 0.7 });
Q.medicine = wCyl(0.04, 0.05, 0.16, wM(0x3A6A3A, { e: 0x1A3A1A, ei: 0.2 }), Wd[0], 2.38, Wd[1] + 0.2, g, 10);
var J = NVB_N.jug;
wBox(0.55, 0.8, 0.9, wM(0xE8E0D0), J[0], 0.4, J[1], g);
wBox(0.6, 0.05, 0.95, wM(0xD8D0C8), J[0], 0.82, J[1], g);
var bs = wCyl(0.24, 0.14, 0.12, wM(0xF4F2F0), J[0], 0.9, J[1], g, 16);
Q.jug = wCyl(0.07, 0.1, 0.3, wM(0xF4F2F0), J[0], 1.0, J[1] + 0.1, g, 14);
Q.solids.push({ x: J[0], z: J[1], hw: 0.35, hd: 0.5 });
var rh = new THREE.Group();
rh.position.set(2.6, 0, -2.6);
rh.rotation.y = 0.6;
g.add(rh);
var rk = wMesh(new THREE.TorusGeometry(0.7, 0.04, 6, 20, Math.PI * 0.5), wM(0x8A3A2A), 0, 0.7, 0, rh);
rk.rotation.z = Math.PI * 0.75;
rk.rotation.y = Math.PI / 2;
var hb = wSph(0.28, wM(0xF0EAE0), 0, 0.62, 0, rh, 12);
hb.scale.set(0.6, 0.6, 1.3);
var hn = wCyl(0.08, 0.1, 0.4, wM(0xF0EAE0), 0, 0.85, 0.3, rh, 8);
hn.rotation.x = 0.6;
wBox(0.14, 0.16, 0.28, wM(0xF0EAE0), 0, 1.0, 0.48, rh);
[[-0.12, 0.24], [0.12, 0.24], [-0.12, -0.24], [0.12, -0.24]].forEach(function (q) { var lg = wCyl(0.03, 0.03, 0.42, wM(0xF0EAE0), q[0], 0.38, q[1], rh, 6); });
wBox(0.05, 0.2, 0.4, wM(0x3A2414), 0, 0.95, 0.3, rh);
Q.solids.push({ x: 2.6, z: -2.6, r: 0.5 });
wBox(1.6, 0.06, 0.3, wood, -2.2, 1.6, 3.85, g);
var ark = new THREE.Group();
ark.position.set(-2.6, 1.63, 3.82);
g.add(ark);
wBox(0.55, 0.14, 0.2, wM(0x8A5A2A), 0, 0.07, 0, ark);
var ah = wMesh(new THREE.CylinderGeometry(0.01, 0.16, 0.14, 4), wM(0xC83A2A), 0, 0.21, 0, ark);
ah.rotation.y = Math.PI / 4;
ah.scale.z = 0.55;
[0xE8C040, 0x3A6AB8, 0xC83A2A, 0x3A9A4A].forEach(function (c, i) { wBox(0.1, 0.1, 0.1, wM(c), -1.6 + i * 0.13, 1.68, 3.82, g); });
var hp = wMesh(new THREE.TorusGeometry(0.3, 0.015, 6, 24), wM(0xC8A050), 3.2, 0.31, 0.4, g);
hp.rotation.x = 0.2;
var Pn = NVB_N.piano;
wBox(1.4, 1.2, 0.55, wM(0x2A1A10), Pn[0] + 0.4, 0.6, Pn[1], g);
wBox(1.2, 0.04, 0.2, wM(0xF6F4EE), Pn[0] + 0.4, 0.75, Pn[1] - 0.36, g);
wBox(0.5, 0.45, 0.35, wM(0x2A1A10), Pn[0] + 0.4, 0.22, Pn[1] - 0.75, g);
Q.solids.push({ x: Pn[0] + 0.4, z: Pn[1], hw: 0.75, hd: 0.35 });
[[2.0, -d / 2 + 0.03, 0], [-w / 2 + 0.03, -0.6, 1], [w / 2 - 0.03, 1.0, 1]].forEach(function (p, i) {
var pic = wTex(96, 120, function (x, W, H) {
x.fillStyle = "#C8A050";
x.fillRect(0, 0, W, H);
x.fillStyle = ["#9AB8D8", "#D8C8A0", "#A8C8A0"][i];
x.fillRect(8, 8, W - 16, H - 16);
x.fillStyle = ["#3A5A2A", "#8A4A2A", "#4A6A8A"][i];
x.beginPath();
x.arc(W / 2, H * 0.62, W * 0.28, Math.PI, 0);
x.fill();
x.fillStyle = "#F4F0E0";
x.beginPath();
x.arc(W * 0.7, H * 0.3, 8, 0, 7);
x.fill();
});
var m = wMesh(new THREE.PlaneGeometry(0.5, 0.62), new THREE.MeshLambertMaterial({ map: pic }), p[0], 1.9, p[1], g);
if (p[2])
m.rotation.y = p[0] < 0 ? Math.PI / 2 : -Math.PI / 2;
});
wBox(0.06, 2.1, 0.95, wM(0xF0ECE2), w / 2 - 0.04, 1.05, NVB_N.door[1], g);
wSph(0.04, wM(0xC8A050), w / 2 - 0.1, 1.0, NVB_N.door[1] - 0.35, g, 8);
Q.doors.push({ lx: NVB_N.door[0], lz: NVB_N.door[1], r: 1.1, name: "the door to the landing (down to the yard)", to: "yard", at: [-5.6, 3.6, Math.PI / 2] });
var amb = new THREE.PointLight(0x8AA0D0, 0.5, 14);
amb.position.set(wx, 2.6, -d / 2 + 1.2);
g.add(amb);
},
function (Q) {
var R = Q.R, g = Q.g, w = R.w, d = R.d;
var sky = wMesh(new THREE.SphereGeometry(30, 24, 12), new THREE.MeshBasicMaterial({ map: nvbNight(), side: THREE.BackSide, fog: false }), 0, 0, 0, g);
var flags = wTex(256, 256, function (x, W, H) { x.fillStyle = "#4A4A44"; x.fillRect(0, 0, W, H); for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
var c = 70 + ((i * 7 + j * 13) % 30);
x.fillStyle = "rgb(" + c + "," + c + "," + (c - 6) + ")";
x.fillRect(i * 64 + 2, j * 64 + 2, 60, 60);
} }, [3, 2]);
wBox(w, 0.1, d, new THREE.MeshLambertMaterial({ map: flags }), 0, -0.05, 0, g);
var brick = wTex(256, 128, function (x, W, H) { x.fillStyle = "#5A3428"; x.fillRect(0, 0, W, H); for (var r = 0; r < 8; r++)
for (var c = 0; c < 9; c++) {
var o = r % 2 ? 16 : 0, v = 80 + ((r * 31 + c * 17) % 40);
x.fillStyle = "rgb(" + v + "," + (v * 0.5 | 0) + "," + (v * 0.38 | 0) + ")";
x.fillRect(c * 32 + o - 14, r * 16 + 1, 30, 14);
} }, [4, 1]);
var bm = new THREE.MeshLambertMaterial({ map: brick });
[[0, -d / 2, w, 0], [0, d / 2, w, 0], [-w / 2, 0, d, 1], [w / 2, 0, d, 1]].forEach(function (s) { var m = wMesh(new THREE.PlaneGeometry(s[2], 2.6), bm, s[0], 1.3, s[1], g); if (s[3])
m.rotation.y = s[0] < 0 ? Math.PI / 2 : -Math.PI / 2;
else
m.rotation.y = s[1] < 0 ? 0 : Math.PI; });
var hs = wTex(512, 512, function (x, W, H) { x.fillStyle = "#3A2A24"; x.fillRect(0, 0, W, H); for (var r = 0; r < 3; r++)
for (var c = 0; c < 3; c++) {
var lit = (r === 0 && c === 0) || (r === 1 && c === 2);
x.fillStyle = lit ? "#F8C878" : "#1A1A26";
x.fillRect(60 + c * 160, 60 + r * 160, 90, 120);
x.fillStyle = "#E8E0D0";
x.fillRect(58 + c * 160, 180 + r * 160, 94, 8);
} });
wMesh(new THREE.PlaneGeometry(w, 12), new THREE.MeshBasicMaterial({ map: hs, fog: false }), 0, 6, -d / 2 + 0.02, g);
var kg = new THREE.Group();
kg.position.set(3, 0, 1);
g.add(kg);
wBox(1.3, 0.9, 1.0, wM(0xA87A48), 0, 0.45, 0, kg);
var kr = wMesh(new THREE.CylinderGeometry(0.01, 0.75, 0.55, 4), wM(0x6A3A2A), 0, 1.17, 0, kg);
kr.rotation.y = Math.PI / 4;
kr.scale.set(1.2, 1, 1);
wBox(0.5, 0.6, 0.05, wB(0x1A0E08), 0, 0.35, 0.51, kg);
for (var c = 0; c < 10; c++) {
var l = wMesh(new THREE.TorusGeometry(0.035, 0.01, 4, 8), wM(0x8A8A90), 3 + c * 0.12, 0.04, 1.6 + c * 0.05, g);
l.rotation.y = c % 2 ? Math.PI / 2 : 0;
}
Q.solids.push({ x: 3, z: 1, hw: 0.75, hd: 0.6 });
for (var s = 0; s < 5; s++)
wBox(2, 0.18, 0.4, wM(0x6A6A64), -5.6, 0.09 + s * 0.18, -d / 2 + 0.4 + s * 0.4, g);
wCyl(0.06, 0.08, 3.6, wM(0x1A1A1A), 5.8, 1.8, 4.2, g, 8);
var lp = wBox(0.4, 0.5, 0.4, wB(0xFFE0A0), 5.8, 3.8, 4.2, g);
var pl = new THREE.PointLight(0xFFD8A0, 0.9, 16);
pl.position.set(5.8, 3.6, 4.2);
g.add(pl);
Q.doors.push({ lx: -5.6, lz: 3.6, r: 1.2, name: "the back door (up to the nursery)", to: "nursery", at: [NVB_N.door[0] - 0.9, NVB_N.door[1], -Math.PI / 2] });
},
function (Q, lamp) {
var R = Q.R, g = Q.g, plank = wTex(256, 256, function (x, W, H) { for (var i = 0; i < 10; i++) {
var c = 70 + ((i * 23) % 26);
x.fillStyle = "rgb(" + c + "," + (c * 0.68 | 0) + "," + (c * 0.45 | 0) + ")";
x.fillRect(0, i * 26, W, 26);
x.fillStyle = "rgba(0,0,0,.4)";
x.fillRect(0, i * 26, W, 2);
} }, [2, 2]);
var pm = new THREE.MeshLambertMaterial({ map: plank });
nvbShell(Q, pm, pm, 0x3A2A1A);
for (var b = 0; b < 5; b++)
wBox(R.w, 0.18, 0.18, wM(0x3A2414), 0, R.h - 0.1, -R.d / 2 + 0.5 + b * (R.d - 1) / 4, g);
var lt = new THREE.PointLight(0xFFB060, 1.0, 14);
lt.position.set(lamp[0], R.h - 0.6, lamp[1]);
g.add(lt);
var ln = wBox(0.22, 0.3, 0.22, wB(0xFFD080), lamp[0], R.h - 0.55, lamp[1], g);
Q.lamp = ln;
},
function (Q) {
var R = Q.R, g = Q.g;
nvbShipRoomShell(Q, [0, 0]);
var Rr = wRand(77);
for (var i = 0; i < 14; i++) {
var x = (i % 2 ? 1 : -1) * (2.6 - Rr() * 0.4), z = -R.d / 2 + 1 + i * 0.9;
var ck = wCyl(0.4, 0.4, 0.9, wM(0x6A4A2A), x, 0.45, z, g, 12);
wCyl(0.42, 0.42, 0.06, wM(0x3A3A3A), x, 0.2, z, g, 12);
wCyl(0.42, 0.42, 0.06, wM(0x3A3A3A), x, 0.7, z, g, 12);
Q.solids.push({ x: x, z: z, r: 0.45 });
}
for (var s = 0; s < 5; s++) {
var sk = wSph(0.35, wM(0xB8A070), -1.2 + s * 0.6, 0.25, R.d / 2 - 1.2, g, 8);
sk.scale.y = 0.7;
}
for (var hm = 0; hm < 4; hm++) {
var hx = (hm % 2 ? 1 : -1) * 2.1, hz = -3.2 + hm * 1.9, h = wSph(0.5, wM(0xD8CCAA, { ds: 1 }), hx, 2.2, hz, g, 12);
h.scale.set(0.42, 0.16, 1.6);
[-1, 1].forEach(function (e) { var rp = wCyl(0.012, 0.012, 0.7, wM(0x8A7A5A), hx, 2.45, hz + e * 0.95, g, 4); rp.rotation.x = e * 0.6; });
}
for (var l = 0; l < 6; l++)
wBox(0.6, 0.05, 0.12, wM(0x5A3A1E), 0, 0.3 + l * 0.4, R.d / 2 - 0.3, g);
Q.doors.push({ lx: 0, lz: R.d / 2 - 0.6, r: 1.2, name: "the ladder up to the deck", to: "deck", at: [0, 4] });
},
function (Q) {
var R = Q.R, g = Q.g;
nvbShipRoomShell(Q, [0, 0.4]);
for (var w = 0; w < 4; w++) {
var wm = wBox(1.2, 0.9, 0.05, wB(0x1A2A48, { fog: false }), -2.4 + w * 1.6, 1.5, -R.d / 2 + 0.03, g);
wBox(1.3, 0.08, 0.08, wM(0xC8A050), -2.4 + w * 1.6, 1.0, -R.d / 2 + 0.06, g);
}
wBox(2.2, 0.08, 1.1, wM(0x5A3418), 0, 0.78, -0.6, g);
[[-1, -0.5], [1, -0.5], [-1, 0.5], [1, 0.5]].forEach(function (q) { wCyl(0.05, 0.05, 0.78, wM(0x3A2414), q[0], 0.39, -0.6 + q[1] * 0.9, g, 6); });
var chart = wTex(128, 96, function (x, W, H) { x.fillStyle = "#E8D8A8"; x.fillRect(0, 0, W, H); x.strokeStyle = "#6A4A2A"; x.lineWidth = 2; x.beginPath(); x.ellipse(64, 50, 40, 26, 0.3, 0, 7); x.stroke(); x.fillStyle = "#8A2A1A"; x.fillText("X", 70, 52); });
var ch = wMesh(new THREE.PlaneGeometry(0.9, 0.65), new THREE.MeshLambertMaterial({ map: chart }), 0, 0.83, -0.6, g);
ch.rotation.x = -Math.PI / 2;
wCyl(0.03, 0.03, 0.18, wM(0xF4F0E0), 0.7, 0.92, -0.8, g, 8);
var cf = wGlow(0xFFC860, 0.25, 0.9);
cf.position.set(0.7, 1.05, -0.8);
g.add(cf);
wBox(0.7, 0.5, 0.6, wM(0x7A1A2A), 0, 0.25, 0.4, g);
wBox(0.7, 0.8, 0.12, wM(0x7A1A2A), 0, 0.85, 0.7, g);
for (var b = 0; b < 18; b++)
wBox(0.06, 0.28 + ((b * 7) % 5) * 0.03, 0.2, wM([0x6A2A2A, 0x2A3A5A, 0x3A5A2A, 0x5A4A2A][b % 4]), -R.w / 2 + 0.25, 1.3, -1.6 + b * 0.12, g);
wBox(0.3, 0.06, 2.4, wM(0x5A3418), -R.w / 2 + 0.2, 1.14, -0.6, g);
Q.keys = new THREE.Group();
Q.keys.position.set(R.w / 2 - 0.4, 1.4, 1.2);
g.add(Q.keys);
var km = wM(0xC8A050, { e: 0x3A2A08, ei: 0.4 });
for (var k = 0; k < 3; k++) {
var ky = wCyl(0.012, 0.012, 0.18, km, k * 0.06, -0.1, 0, Q.keys, 6);
wMesh(new THREE.TorusGeometry(0.03, 0.008, 4, 10), km, k * 0.06, 0.01, 0, Q.keys);
}
Q.solids.push({ x: 0, z: -0.6, hw: 1.2, hd: 0.65 }, { x: 0, z: 0.5, hw: 0.4, hd: 0.4 });
Q.doors.push({ lx: 0, lz: R.d / 2 - 0.5, r: 1.1, name: "the cabin door (out on deck)", to: "deck", at: [0, -8.5] });
},
function (G) {
if (NVB.islandBuilt)
return;
NVB.islandBuilt = 1;
var gg = new THREE.Group();
G.add(gg);
NVB.isle = gg;
var M = NVB_AT.mush, h = nvHeight(M.x, M.z);
var st = wCyl(0.5, 0.7, 1.1, wM(0xF0E8D8), M.x, h + 0.55, M.z, gg, 14);
var cap = wSph(1.5, wM(0xC83A2A), M.x, h + 1.15, M.z, gg, 18);
cap.scale.y = 0.45;
for (var s = 0; s < 12; s++) {
var a = s / 12 * Math.PI * 2, d = wSph(0.16, wM(0xF8F4EC), M.x + Math.cos(a) * (0.6 + (s % 3) * 0.3), h + 1.55 - (s % 3) * 0.08, M.z + Math.sin(a) * (0.6 + (s % 3) * 0.3), gg, 6);
d.scale.y = 0.4;
}
NVB.mushSmoke = [];
for (var p = 0; p < 4; p++) {
var sm = wSph(0.25, wB(0xDDDDDD, { op: 0.35 }), M.x, h + 1.9 + p * 0.5, M.z, gg, 6);
NVB.mushSmoke.push(sm);
}
NV.solids.push({ x: M.x, z: M.z, r: 0.8 });
var R = wRand(1911);
for (var t = 0; t < 16; t++) {
var a2 = R() * Math.PI * 2, r2 = 6 + R() * 18, x = -120 + Math.cos(a2) * r2, z = 250 + Math.sin(a2) * r2, h2 = nvHeight(x, z), k = 0.3 + R() * 0.5;
wCyl(0.12 * k * 3, 0.16 * k * 3, 0.6 * k * 2, wM(0xEEE6D6), x, h2 + 0.3 * k * 2, z, gg, 8);
var c2 = wSph(0.55 * k * 2, wM([0xC83A2A, 0xD86A2A, 0xB82A2A][t % 3]), x, h2 + 0.62 * k * 2, z, gg, 10);
c2.scale.y = 0.45;
}
if (NV.smoke && NV.smoke[0])
NVB.wHouse = NV.smoke[0].parent;
var W = NVB_AT.fall, hw = nvHeight(W.x, W.z);
var moss = wMesh(new THREE.CircleGeometry(2.2, 18), wM(0x4A7A34), W.x, hw + 0.05, W.z, gg);
moss.rotation.x = -Math.PI / 2;
for (var f = 0; f < 10; f++) {
var fa = f / 10 * Math.PI * 2, fr = wCone(0.25, 0.9, wM(0x3E7A2A), W.x + Math.cos(fa) * 2.4, hw + 0.45, W.z + Math.sin(fa) * 2.4, gg, 5);
fr.rotation.z = Math.cos(fa) * 0.4;
fr.rotation.x = -Math.sin(fa) * 0.4;
}
var dg = new THREE.Group();
var hull = wMesh(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), wM(0x5A3A22), 0, 0.35, 0, dg);
hull.scale.set(0.9, 0.5, 2.2);
wBox(1.4, 0.06, 0.3, wM(0x6A4A2A), 0, 0.32, 0.4, dg);
dg.position.set(NVB_AT.rock.x - 14, 0.2, NVB_AT.rock.z + 6);
dg.rotation.y = 0.8;
dg.visible = false;
gg.add(dg);
NVB.dinghy = dg;
var kt = new THREE.Group();
var kp = wMesh(new THREE.CircleGeometry(1.2, 4), wM(0xE8C040, { ds: 1 }), 0, 0, 0, kt);
kp.scale.y = 1.4;
var kx = wMesh(new THREE.CircleGeometry(1.0, 4), wM(0xC83A2A, { ds: 1 }), 0, 0, 0.01, kt);
kx.scale.y = 1.4;
kt.position.set(NVB_AT.rock.x + 4, 6, NVB_AT.rock.z - 4);
kt.visible = false;
gg.add(kt);
NVB.kite = kt;
NVB.rings = [];
NVB_FLIGHT.forEach(function (p, i) { var rg = new THREE.Group(); var tor = wMesh(new THREE.TorusGeometry(9, 1.6, 8, 26), wM(0xFFF4F8, { e: 0xFFD8E8, ei: 0.45, op: 0.7 }), 0, 0, 0, rg); rg.position.set(p[0], p[1], p[2]); rg.lookAt(new THREE.Vector3(0, p[1], 0).add(new THREE.Vector3(G.position.x, 0, 0))); rg.visible = false; gg.add(rg); NVB.rings.push(rg); });
var pk = nvbShipAt(4.6, 2);
var plank = wBox(0.5, 0.08, 3.6, wM(0x8A6A42), pk.x, pk.y - 0.05, pk.z, gg);
plank.rotation.y = (NV.ship ? NV.ship.rotation.y : 0.45) + Math.PI / 2;
NVB.plank = plank;
var Gd = NVB_AT.guard, hg = nvHeight(Gd.x, Gd.z);
NVB.guardFire = wCone(0.35, 0.8, wB(0xFF8A2A, { fog: false }), Gd.x, hg + 0.4, Gd.z, gg, 6);
for (var b = 0; b < 4; b++) {
var bl = wBox(1.2, 0.08, 0.8, wM([0xC83A2A, 0x2A6A8A, 0xE8C040, 0x3A2A1A][b]), Gd.x + Math.cos(b * 1.6) * 2.2, hg + 0.05, Gd.z + Math.sin(b * 1.6) * 2.2, gg);
bl.rotation.y = b * 1.6;
}
},
function () {
if (NVB.homeDressed || !NV.under)
return;
NVB.homeDressed = 1;
var hg = NV.under;
wBox(7, 0.5, 3.2, wM(0x8A6238), -6, 0.25, -6, hg);
wBox(6.8, 0.2, 3.0, wM(0xE8DCC0), -6, 0.6, -6, hg);
for (var p = 0; p < 6; p++)
wBox(0.8, 0.16, 0.5, wM(0xF4ECDC), -8.8 + p * 1.1, 0.78, -7.2, hg);
var ch = new THREE.Group();
ch.position.set(2.4, 0, -9.5);
hg.add(ch);
wBox(0.7, 0.08, 0.7, wM(0x7A4A2A), 0, 0.45, 0, ch);
wBox(0.7, 0.9, 0.08, wM(0x7A4A2A), 0, 0.9, 0.32, ch);
[-1, 1].forEach(function (s) { var rk = wMesh(new THREE.TorusGeometry(0.6, 0.03, 4, 12, Math.PI * 0.4), wM(0x5A3418), s * 0.32, 0.6, 0, ch); rk.rotation.y = Math.PI / 2; rk.rotation.z = -Math.PI * 0.7; });
wCyl(0.3, 0.24, 0.25, wM(0xC8A870), 3.3, 0.13, -9.2, hg, 12);
for (var s = 0; s < 5; s++) {
var sk = wBox(0.1, 0.04, 0.4, wM([0xC83A2A, 0x3A6AB8, 0xE8E0D0, 0x3A8A3A, 0xE8C040][s]), 3.3 + (s - 2) * 0.08, 0.28, -9.2, hg);
sk.rotation.y = s;
}
var tk = new THREE.Group();
tk.position.set(10.5, 1.4, -4);
tk.rotation.y = -1.0;
hg.add(tk);
wBox(0.9, 0.6, 0.4, wB(0x1A1008), 0, 0, -0.1, tk);
wBox(0.5, 0.08, 0.3, wM(0xE8C8D8), 0, -0.2, 0, tk);
var tl = wGlow(0xFFE8A0, 0.35, 0.8);
tl.position.set(0, 0, 0.05);
tk.add(tl);
wBox(0.12, 0.3, 0.12, wM(0xC8A050), 0.3, -0.1, 0, tk);
var cur = wBox(0.95, 0.62, 0.02, wM(0xD86A9A, { op: 0.75 }), 0, 0, 0.12, tk);
NVB.tinkCurtain = cur;
for (var w = 0; w < 8; w++) {
var cl = wBox(0.35, 0.5, 0.02, wM([0xF4F0E8, 0xC8D8F0, 0xE8C8C8, 0xD8E8C8][w % 4], { ds: 1 }), -3 + w * 0.8, 3.1, 3, hg);
}
wCyl(0.01, 0.01, 7, wM(0x8A7A5A), 0, 3.4, 3, hg, 4).rotation.z = Math.PI / 2;
for (var t = 0; t < 7; t++) {
var a = t / 7 * Math.PI * 2 + 0.3, tr = wCyl(0.55, 0.65, 4, wM(0x5A3E26), Math.cos(a) * 12.6, 2, Math.sin(a) * 12.6, hg, 8);
}
NVB.tea = [];
for (var c = 0; c < 8; c++) {
var a2 = c / 8 * Math.PI * 2, cup = wCyl(0.07, 0.05, 0.09, wM(0xF4F0E8), Math.cos(a2) * 1.7, 1.08, Math.sin(a2) * 1.7, hg, 10);
cup.visible = false;
NVB.tea.push(cup);
}
},
function (G) {
if (NVB.castMade)
return;
NVB.castMade = 1;
var n = 0;
Object.keys(NVB_CAST).forEach(function (k) {
var C = NVB_CAST[k];
var seed = 4100 + (n++);
NVB.cast[k] = { k: k, g: null, name: C.name, t: { name: C.name, persona: NVB_BOOK + C.persona, greet: C.greet }, make: function () { var g = nvbPerson(seed, C.role, { look: C.look, s: C.s }); g.visible = false; g.userData.keep = 1; G.add(g); return g; } };
});
var nana = null;
try {
if (typeof ctuOne === "function")
nana = ctuOne("dog", { k: 1.5 }, 11);
}
catch (e) { }
if (!nana) {
nana = new THREE.Group();
var b = wSph(0.45, wM(0x1A1614), 0, 0.55, 0, nana, 10);
b.scale.set(0.9, 0.8, 1.6);
wSph(0.25, wM(0x1A1614), 0, 0.85, 0.7, nana, 10);
}
nana.visible = false;
G.add(nana);
NVB.cast.nana = { k: "nana", g: nana, name: "Nana", animal: 1, t: { name: "Nana", persona: NVB_BOOK + "You are Nana, the Darlings' nurse, a prim Newfoundland dog who belonged to no one in particular until the Darlings found you in Kensington Gardens. You answer only in dog: woofs, growls, wags, and what you do (written in brackets). You are devoted, proper and very good at baths.", greet: "(Nana looks you over, and wags once, properly.)" } };
var tk = new THREE.Group();
tk.add(wGlow(0xFFE89A, 0.7, 0.6));
tk.add(wGlow(0xFFFFFF, 0.22, 0.85));
tk.visible = false;
G.add(tk);
NVB.cast.tink = { k: "tink", g: tk, name: "Tinker Bell", light: 1, t: { name: "Tinker Bell", persona: NVB_BOOK + "You are Tinker Bell, a common fairy who mends pots and kettles: tiny, jealous, fiercely loyal to Peter, quick-tempered and quick to forgive. Fairies are so small they have room for only one feeling at a time. You speak in the fairy language, a tinkle of golden bells; write what you do and, in brackets, what the bells mean (often rude: 'You silly ass').", greet: "(A tinkle of golden bells.)" } };
NVB.cast.bird = { k: "bird", g: NV.nest || new THREE.Group(), name: "The Never bird", animal: 1, fixed: 1, t: { name: "The Never bird", persona: NVB_BOOK + "You are the Never bird, sitting on your floating nest on the lagoon. You and Peter cannot understand a word of each other's language, and both of you lose your tempers. You are a good mother and brave.", greet: "(She ruffles her feathers and glares.)" } };
},
function (k, at, o) {
var C = nvbC(k);
if (!C || !C.g || C.fixed)
return;
o = o || {};
var g = C.g;
var x, y, z;
if (at.room) {
var Q = nvbRoom(at.room);
if (!Q)
return;
x = Q.R.x + at.lx;
z = Q.R.z + at.lz;
y = Q.R.y + (at.y || 0);
}
else if (at.home) {
x = -120 + at.home[0];
z = 250 + at.home[1];
y = -40 + (at.y || 0);
}
else if (at.ship) {
var S = nvbShipAt(at.ship[0], at.ship[1]);
x = S.x;
z = S.z;
y = S.y + (at.y || 0);
}
else {
x = at.x;
z = at.z;
y = at.y !== undefined ? at.y : Math.max(nvHeight(x, z), 0) + (at.dy || 0);
}
g.position.set(x, y, z);
g.rotation.set(o.fly ? -1.2 : 0, at.ry || 0, 0);
g.visible = true;
C.at = at;
C.on = 1;
if (g.userData) {
g.userData.pose = o.sit ? "sit" : null;
g.userData.seated = !!o.sit;
}
if (o.lie && !C.light) {
g.rotation.set(-Math.PI / 2, at.ry || 0, 0, "YXZ");
}
if (C.light) {
g.position.y += 1.3;
}
},
function (keys) {
NVB.follow = (keys || []).map(function (k, i) { return { k: k, gap: 2 + i * 1.1, side: i % 2 ? 1 : -1 }; }).filter(function (F) { var C = nvbC(F.k); return !!(C && C.g); });
NVB.follow.forEach(function (F) { var C = NVB.cast[F.k], L = worldLocal(); C.g.visible = true; C.on = 1; C.at = null; C.g.position.set(L.x + F.side * 1.5, L.y - 1.72, L.z + F.gap); });
},
function (dt, L) {
var fly = L.y - 1.72 > nvbFloor(L.x, L.z) + 1.2, ry = yaw, bx = Math.sin(ry), bz = Math.cos(ry);
NVB.follow.forEach(function (F, i) {
var C = NVB.cast[F.k];
if (!C)
return;
var g = C.g;
var tx = L.x + bx * F.gap + Math.cos(ry) * F.side * 1.4, tz = L.z + bz * F.gap - Math.sin(ry) * F.side * 1.4, dx = tx - g.position.x, dz = tz - g.position.z, d = Math.hypot(dx, dz);
if (d > 40) {
g.position.set(tx, L.y - 1.72, tz);
return;
}
var sp = Math.min(d, (fly ? 16 : 4.5 + d * 0.8) * dt);
if (d > 0.2) {
g.position.x += dx / d * sp;
g.position.z += dz / d * sp;
g.rotation.y = Math.atan2(dx, dz);
}
var gy = fly ? L.y - 1.72 + (C.light ? 0.6 : 0) + Math.sin(WLD.t * 1.3 + i) * 0.4 : nvbFloor(g.position.x, g.position.z) + (C.light ? 1.3 : 0);
g.position.y += (gy - g.position.y) * Math.min(1, dt * 3);
if (!C.light && !C.animal)
g.rotation.x = fly ? -1.1 : 0;
});
},
function (at) {
if (typeof at === "function")
at = at();
if (!at)
return null;
if (at.room) {
var R = NVB_ROOM[at.room];
return { x: R.x + at.lx, y: R.y + (at.y || 0), z: R.z + at.lz, area: "room:" + at.room };
}
if (at.home) {
return { x: -120 + at.home[0], y: -40 + (at.y || 0), z: 250 + at.home[1], area: "home" };
}
if (at.ship) {
var S = nvbShipAt(at.ship[0], at.ship[1]);
return { x: S.x, y: S.y + (at.y || 0), z: S.z, area: "out" };
}
if (at.who) {
var C = NVB.cast[at.who];
if (C && C.g && C.g.visible) {
var P = C.g.position;
return { x: P.x, y: P.y, z: P.z, area: nvbArea() };
}
return null;
}
if (at.ring !== undefined) {
var p = NVB_FLIGHT[at.ring];
return { x: p[0], y: p[1], z: p[2], area: "out", sky: 1 };
}
var y = at.y !== undefined ? at.y : Math.max(nvHeight(at.x, at.z), 0);
return { x: at.x, y: y, z: at.z, area: "out" };
},
function (P, L) {
var dx = P.x - L.x, dz = P.z - L.z, d = Math.hypot(dx, dz);
if (d < 2)
return "right here";
var a = Math.atan2(-dx, -dz) - yaw;
while (a > Math.PI)
a -= Math.PI * 2;
while (a < -Math.PI)
a += Math.PI * 2;
var w = Math.abs(a) < 0.4 ? "ahead" : Math.abs(a) > 2.6 ? "behind you" : a > 0 ? (a < 1.6 ? "ahead, to your left" : "to your left, behind") : (a > -1.6 ? "ahead, to your right" : "to your right, behind");
var dy = P.y - (L.y - 1.72);
return Math.round(d) + " m " + w + (dy > 8 ? ", up above" : dy < -8 ? ", below" : "");
},
function () {
if (NVB.beam)
return NVB.beam;
var G = WORLDS.neverland.g, g = new THREE.Group();
var m = new THREE.MeshBasicMaterial({ color: 0xFFE8A8, transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
var c = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.6, 1, 16, 1, true), m);
c.position.y = 0.5;
g.add(c);
g.userData.col = c;
var rm = new THREE.MeshBasicMaterial({ color: 0xFFD878, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, side: THREE.DoubleSide });
var r = new THREE.Mesh(new THREE.RingGeometry(0.75, 0.9, 32), rm);
r.rotation.x = -Math.PI / 2;
r.position.y = 0.04;
g.add(r);
g.userData.ring = r;
var s = wGlow(0xFFF0C0, 0.35, 0.6);
s.position.y = 1.2;
g.add(s);
g.userData.spark = s;
G.add(g);
NVB.beam = g;
return g;
},
function (kind) {
var g = new THREE.Group(), m;
switch (kind) {
case "leaf":
m = wMesh(new THREE.CircleGeometry(0.16, 7), wM(0xC8B87A, { ds: 1 }), 0, 0.03, 0, g);
m.rotation.x = -Math.PI / 2;
m.scale.y = 0.55;
break;
case "stitch":
m = wMesh(new THREE.TorusGeometry(0.08, 0.012, 6, 12), wM(0xE8C860, { e: 0x6A5020, ei: 0.4 }), 0, 0.1, 0, g);
break;
case "branch":
m = wCyl(0.05, 0.07, 1.4, wM(0x6A4A2A), 0, 0.08, 0, g, 6);
m.rotation.z = Math.PI / 2;
wSph(0.25, wM(0x4A8A34), 0.6, 0.2, 0, g, 6);
break;
case "moss":
m = wSph(0.3, wM(0x4A7A2E), 0, 0.1, 0, g, 8);
m.scale.y = 0.4;
break;
case "rose":
m = wSph(0.12, wM(0xD82A3A), 0, 0.5, 0, g, 10);
wCyl(0.012, 0.012, 0.45, wM(0x3A6A2A), 0, 0.22, 0, g, 4);
break;
case "sock":
m = wBox(0.12, 0.05, 0.4, wM(0xC83A2A), 0, 0.04, 0, g);
break;
case "cup":
m = wCyl(0.08, 0.06, 0.1, wM(0xF4F0E8), 0, 0.06, 0, g, 10);
break;
case "shadow":
m = wMesh(new THREE.CircleGeometry(0.6, 12), wB(0x0A0A12, { op: 0.7 }), 0, 0.02, 0, g);
m.rotation.x = -Math.PI / 2;
m.scale.y = 1.6;
break;
case "acorn":
m = wSph(0.07, wM(0x8A5A2A), 0, 0.08, 0, g, 8);
m.scale.y = 1.3;
wSph(0.075, wM(0x5A3A1E), 0, 0.13, 0, g, 8).scale.y = 0.5;
break;
case "arrow":
m = wCyl(0.012, 0.012, 0.8, wM(0x8A6A3A), 0, 0.06, 0, g, 4);
m.rotation.z = Math.PI / 2;
break;
case "egg":
m = wSph(0.13, wM(0xE8E0C8), 0, 0.14, 0, g, 10);
m.scale.y = 1.3;
break;
case "glass":
m = wCyl(0.05, 0.04, 0.12, wB(0x9AD8C8, { op: 0.6 }), 0, 0.06, 0, g, 10);
break;
case "hat":
m = wCyl(0.16, 0.16, 0.32, wM(0x16161A), 0, 0.17, 0, g, 14);
wCyl(0.26, 0.26, 0.02, wM(0x16161A), 0, 0.01, 0, g, 16);
break;
case "key":
m = wCyl(0.012, 0.012, 0.18, wM(0xC8A050), 0, 0.1, 0, g, 6);
break;
case "thimble":
m = wCyl(0.03, 0.035, 0.05, wM(0xC8CCD4, { e: 0x404040, ei: 0.3 }), 0, 0.05, 0, g, 10);
break;
default: m = wSph(0.12, wM(0xE8D8A8, { e: 0x5A4A20, ei: 0.4 }), 0, 0.15, 0, g, 10);
}
var gl = wGlow(0xFFF0B0, 0.6, 0.55);
gl.position.y = 0.3;
g.add(gl);
g.userData.glow = gl;
return g;
},
function (k) {
if (NVB.tuneKey === k)
return;
NVB.tuneKey = k;
var old = NVB.tune;
NVB.tune = null;
if (old) {
var o = old, f = setInterval(function () { try {
o.volume = Math.max(0, o.volume - 0.04);
if (o.volume <= 0.01) {
o.pause();
clearInterval(f);
}
}
catch (e) {
clearInterval(f);
} }, 80);
}
if (!k || !NVB_TUNES[k])
return;
try {
var A = new Audio("assets/neverland/" + NVB_TUNES[k] + ".mp3");
A.loop = true;
A.volume = 0;
var p = A.play();
if (p && p.catch)
p.catch(function () { });
NVB.tune = A;
var v = window.NVB_VOL != null ? window.NVB_VOL : 0.3, fi = setInterval(function () { try {
if (NVB.tune !== A) {
clearInterval(fi);
return;
}
A.volume = Math.min(v, A.volume + 0.03);
if (A.volume >= v)
clearInterval(fi);
}
catch (e) {
clearInterval(fi);
} }, 90);
}
catch (e) { }
},
function (k, at) {
var Q = nvbRoom(k);
if (!Q)
return;
if (NV.home)
NV.home = false;
Object.keys(NVB.rooms).forEach(function (r) { NVB.rooms[r].g.visible = (r === k); });
NVB.room = k;
var R = Q.R, a = at || [0, 0, 0];
camera.position.set(WORLDS.neverland.base + R.x + a[0], R.y + 1.72, R.z + a[1]);
yaw = a[2] || 0;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
NVB.follow.forEach(function (F, i) { var C = NVB.cast[F.k]; if (C && C.g)
C.g.position.set(R.x + a[0] + (i % 2 ? 1 : -1) * 1.2, R.y, R.z + a[1] + 1 + i * 0.4); });
nvbSay("<b>" + nvbEsc(R.name.charAt(0).toUpperCase() + R.name.slice(1)) + ".</b>");
},
function (where) {
var k = NVB.room;
if (k && NVB.rooms[k])
NVB.rooms[k].g.visible = false;
NVB.room = null;
var P = where || { x: -110, z: 262 }, y = P.y !== undefined ? P.y : Math.max(nvHeight(P.x, P.z), 0);
camera.position.set(WORLDS.neverland.base + P.x, y + 1.72, P.z);
if (P.ry !== undefined)
yaw = P.ry;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = P.fly ? y : 0;
},
function (fn) {
if (NVB.text) {
fn(NVB.text);
return;
}
if (NVB.textLoading) {
NVB.textWait = (NVB.textWait || []).concat(fn);
return;
}
NVB.textLoading = 1;
NVB.textWait = [fn];
fetch("data/neverland/peter-and-wendy.json").then(function (r) { return r.json(); }).then(function (j) { NVB.text = j; (NVB.textWait || []).forEach(function (f) { try {
f(j);
}
catch (e) { } }); NVB.textWait = null; }).catch(function () { NVB.textLoading = 0; (NVB.textWait || []).forEach(function (f) { try {
f(null);
}
catch (e) { } }); NVB.textWait = null; });
},
function () {
var S = nvbS(), C = NVB_CH[S.ch];
if (!C)
return;
NVB.readAsk = 1;
nvbBookText(function (J) {
NVB.readAsk = 0;
NVB.readOpen = 1;
var ch = J && J.ch && J.ch[S.ch], open = ch ? ch.p.slice(0, 2).map(function (p) { return "<p style='margin:6px 0;font-style:italic'>" + nvbEsc(p) + "</p>"; }).join("") : "";
var b = "<div style='font-size:12px;opacity:.7'>J. M. Barrie, Peter and Wendy (1911)</div><h3 style='margin:4px 0'>Chapter " + (S.ch + 1) + ": " + nvbEsc(C.t) + "</h3>" + open;
var fns = { go: function () { worldCard(null); NVB.readOpen = 0; nvbStepDone(); }, all: function () { nvbWhole(S.ch); } };
b += worldBtn("go", "▶ Begin the chapter", C.intro || "Step into the book");
if (ch)
b += worldBtn("all", "📖 Read the whole chapter", "Barrie's own words, all of them");
b += nvbKeeperBtns(fns);
worldCard(b, fns);
});
},
function (i) {
nvbBookText(function (J) {
var ch = J && J.ch && J.ch[i];
if (!ch)
return;
var b = "<h3 style='margin:4px 0'>Chapter " + (i + 1) + ": " + nvbEsc(ch.t) + "</h3><div style='max-height:56vh;overflow:auto;padding-right:6px'>" + ch.p.map(function (p) { return "<p style='margin:6px 0'>" + nvbEsc(p) + "</p>"; }).join("") + "</div>";
var fns = { back: function () { if (NVB.readOpen)
nvbChapterCard();
else
worldCard(null); } };
b += worldBtn("back", "Back to the book", "");
worldCard(b, fns);
});
},
function (fns) {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return "";
var b = "<div style='margin-top:8px;font-size:12px;opacity:.8'>Keeper: go to any chapter</div><div>";
NVB_CH.forEach(function (C, i) { b += "<span data-w='kj" + i + "' role='button' style='display:inline-block;margin:2px;padding:3px 7px;border:1px solid rgba(143,180,232,.5);border-radius:3px'>" + (i + 1) + "</span>"; fns["kj" + i] = function () { worldCard(null); nvbJump(i); }; });
return b + "</div>";
},
function (place) {
var S = nvbS(), C = NVB_CH[S.ch];
if (!C)
return;
nvbItemsClear();
NVB.hold = 0;
NVB.duel = null;
NVB.clap = null;
nvbHideAll();
NVB.night = null;
if (NVB.rings)
NVB.rings.forEach(function (r) { r.visible = false; });
if (place && C.start)
nvbPlaceAt(C.start);
try {
if (C.setup)
C.setup(S.f);
}
catch (e) {
if (window.console)
console.warn("[nvb] setup", S.ch, e);
}
nvbTune(C.tune || null);
nvbStepBegin();
},
function (st) {
if (st.room)
nvbGoRoom(st.room, st.at);
else if (st.home) {
if (NVB.room)
nvbOutRoom();
if (typeof nvIntoHome === "function")
nvIntoHome();
}
else if (st.ring !== undefined) {
if (NVB.room)
nvbOutRoom();
var p = NVB_FLIGHT[st.ring];
camera.position.set(WORLDS.neverland.base + p[0] + 60, p[1] + 1.72, p[2] + 60);
yaw = Math.atan2(p[0], p[2]);
pitch = 0;
if (typeof flyY !== "undefined")
flyY = p[1];
NV.home = false;
}
else {
if (NVB.room)
nvbOutRoom(st);
else {
NV.home = false;
nvbOutRoom(st);
}
}
},
function () {
var b = nvbStep();
nvbItemsClear();
NVB.hold = 0;
NVB.duel = null;
NVB.clap = null;
if (!b)
return;
try {
if (b.on)
b.on(nvbS().f);
}
catch (e) {
if (window.console)
console.warn("[nvb] on", e);
}
if (b.k === "read") {
nvbChapterCard();
return;
}
if (b.k === "find" || b.k === "use")
nvbItemAdd(b.item || (b.k === "use" ? "spark" : "spark"), b.at, b.name);
if (b.k === "gather") {
var P = b.at, n = b.n || 3, sp = b.spread || 6, R = wRand(nvbS().ch * 97 + nvbS().s * 13 + 7);
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2 + R() * 0.7, r = sp * (0.45 + R() * 0.55), at;
if (P.room)
at = { room: P.room, lx: Math.max(-NVB_ROOM[P.room].w / 2 + 0.6, Math.min(NVB_ROOM[P.room].w / 2 - 0.6, P.lx + Math.cos(a) * r)), lz: Math.max(-NVB_ROOM[P.room].d / 2 + 0.6, Math.min(NVB_ROOM[P.room].d / 2 - 0.6, P.lz + Math.sin(a) * r)), y: P.y };
else if (P.home)
at = { home: [P.home[0] + Math.cos(a) * r, P.home[1] + Math.sin(a) * r], y: P.y };
else
at = { x: P.x + Math.cos(a) * r, z: P.z + Math.sin(a) * r };
nvbItemAdd(b.item || "spark", at, b.name);
}
NVB.got = 0;
}
if (b.k === "fly" && NVB.rings && b.at.ring !== undefined)
NVB.rings[b.at.ring].visible = true;
if (b.h)
nvbSay("<b>Chapter " + (nvbS().ch + 1) + ".</b> " + b.h);
},
function () {
var S = nvbS(), C = NVB_CH[S.ch], b = nvbStep();
if (!b)
return;
try {
if (b.done)
b.done(S.f);
}
catch (e) {
if (window.console)
console.warn("[nvb] done", e);
}
if (b.say)
nvbSay(b.say);
if (b.k === "fly" && NVB.rings && b.at.ring !== undefined)
NVB.rings[b.at.ring].visible = false;
S.s++;
if (window.NVB_LOG)
NVB_LOG.push(S.ch + 1 + "." + S.s);
if (S.s >= C.steps.length) {
if (C.keep && !S.keeps.some(function (k) { return k.k === C.keep[0]; }))
S.keeps.push({ k: C.keep[0], n: C.keep[1], i: C.keep[2], at: Date.now() });
var last = S.ch >= NVB_CH.length - 1;
if (last) {
S.done = 1;
S.s = 0;
nvbSave();
nvbItemsClear();
nvbFinish();
return;
}
S.ch++;
S.s = 0;
S.f = {};
nvbSave();
var nx = NVB_CH[S.ch];
setTimeout(function () { try {
nvbChapterBegin(!!nx.jump);
}
catch (e) {
if (window.console)
console.warn("[nvb]", e);
} }, window.NVB_FAST ? 10 : 2600);
return;
}
nvbSave();
nvbStepBegin();
},
function () {
nvbHideAll();
nvbTune("green");
NVB.ambientBack = 1;
var S = nvbS(), b = "<h3 style='margin:4px 0'>The End</h3><p style='font-style:italic'>\"...and thus it will go on, so long as children are gay and innocent and heartless.\"</p><p>You have played the whole of Peter and Wendy. Your keepsakes, one from every chapter:</p><div style='font-size:22px'>" + S.keeps.map(function (k) { return "<span title='" + nvbEsc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</div>";
var fns = { again: function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; nvbSave(); nvbChapterBegin(true); } };
b += worldBtn("again", "Read it again from the start", "The nursery, one night in London");
worldCard(b, fns);
},
function () {
var S = nvbS(), C = NVB_CH[S.ch], fns = {}, b = "<div style='font-size:12px;opacity:.7'>J. M. Barrie, 1911, with F. D. Bedford's pictures</div><h3 style='margin:4px 0'>🧚 Peter and Wendy</h3>";
if (S.done)
b += "<p>You have read it to the end. Your keepsakes: " + S.keeps.map(function (k) { return k.i; }).join(" ") + "</p>";
else if (S.started)
b += "<p>You are in <b>Chapter " + (S.ch + 1) + ": " + nvbEsc(C.t) + "</b>, step " + (S.s + 1) + " of " + C.steps.length + ".</p><p style='opacity:.85'>" + nvbEsc((nvbStep() || {}).h || "") + "</p>";
else
b += "<p>All seventeen chapters, played: the nursery in London, the flight, the island, the lagoon, the home under the ground, and the Jolly Roger. About three hours or more, at your own pace. Your place is kept.</p>";
if (!S.done) {
b += worldBtn("go", S.started ? "▶ Carry on" : "▶ Begin: the night nursery", S.started ? "Back to where you were" : "London, long ago");
fns.go = function () { worldCard(null); nvbBegin(); };
}
else {
b += worldBtn("again", "Read it again from the start", "");
fns.again = function () { worldCard(null); S.ch = 0; S.s = 0; S.f = {}; S.done = 0; S.started = 1; nvbSave(); nvbBegin(); };
}
b += worldBtn("read", "📖 Read the book", "Every chapter, Barrie's own words");
fns.read = function () { NVB.readOpen = 0; nvbWhole(S.ch); };
if (S.keeps.length)
b += "<div style='margin-top:6px'>Keepsakes: <span style='font-size:20px'>" + S.keeps.map(function (k) { return "<span title='" + nvbEsc(k.n) + "'>" + k.i + "</span>"; }).join(" ") + "</span></div>";
b += nvbKeeperBtns(fns);
worldCard(b, fns);
},
function () {
NVB.night = 0.1;
nvbPut("hook", { ship: [0, -11] }, { ry: Math.PI });
nvbPut("smee", { ship: [2.2, -4] }, { sit: 1 });
NVB_CREW.forEach(function (k, i) { nvbPut(k, { ship: [(i % 2 ? 1 : -1) * 2.4, -6 + i * 2.2] }, { ry: i }); });
nvbPut("wendy", { ship: [0.8, 2] }, { ry: Math.PI });
nvbPut("john", { room: "hold", lx: -1, lz: 0 }, {});
nvbPut("michael", { room: "hold", lx: 0, lz: 0.6 }, {});
NVB_BOYS.forEach(function (k, i) { nvbPut(k, { room: "hold", lx: -1.2 + (i % 3) * 1.2, lz: -2 - Math.floor(i / 3) * 1.4 }, { sit: 1 }); });
},
function () {
NVB.night = 0.15;
nvbPut("hook", { ship: [0, -1] }, { ry: Math.PI });
nvbPut("smee", { ship: [2.2, -4] });
NVB_CREW.forEach(function (k, i) { nvbPut(k, { ship: [(i % 2 ? 1 : -1) * 2.6, -5 + i * 2] }); });
nvbPut("wendy", { ship: [0.8, 2] }, { ry: Math.PI });
NVB_BOYS.forEach(function (k, i) { nvbPut(k, { room: "hold", lx: -1.2 + (i % 3) * 1.2, lz: -2 - Math.floor(i / 3) * 1.4 }, { sit: 1 }); });
nvbPut("john", { room: "hold", lx: -1, lz: 0 });
nvbPut("michael", { room: "hold", lx: 0, lz: 0.6 });
},
function (back) {
if (!NV.people)
return;
if (back) {
if (!NVB.ambHid)
return;
NVB.ambHid = 0;
NV.people.forEach(function (P) { if (P.nvbHid) {
P.g.visible = true;
P.nvbHid = 0;
} });
if (NVB.talk0) {
NV.talkers = NVB.talk0;
NVB.talk0 = null;
}
if (NV.tink)
NV.tink.visible = true;
return;
}
if (!NVB.ambHid) {
NVB.ambHid = 1;
NVB.talk0 = NV.talkers;
NV.talkers = NV.talkers.filter(function (T) { return !(T.name && NVB_AMB.test(T.name)); });
}
NV.people.forEach(function (P) { var n = P.talk && P.talk.name; if (n && NVB_AMB.test(n)) {
P.g.visible = false;
P.nvbHid = 1;
} });
if (NV.tink)
NV.tink.visible = false;
},
function (dt) {
var Q = NVB.rooms[NVB.room];
if (!Q)
return;
var t = WLD.t;
if (Q.fire)
Q.fire.scale.set(1, 0.92 + Math.sin(t * 1.4) * 0.08, 1);
if (Q.fireLight)
Q.fireLight.intensity = 0.95 + Math.sin(t * 0.9) * 0.05;
var L = worldLocal(), R = Q.R;
if (L.y > R.y + R.h - 0.25) {
camera.position.y = R.y + R.h - 0.25;
if (typeof flyY !== "undefined")
flyY = R.h - 1.97;
}
},
function (dt) {
var S = nvbS(), L = worldLocal(), t = WLD.t;
if (NVB.wHouse)
NVB.wHouse.visible = !(S.started && !S.done && (S.ch < 5 || (S.ch === 5 && !S.f.built)));
if (NVB.mushSmoke)
NVB.mushSmoke.forEach(function (s, i) { var u = (t * 0.5 + i * 0.75) % 3; s.position.y = nvHeight(NVB_AT.mush.x, NVB_AT.mush.z) + 1.9 + u; s.material.opacity = 0.35 * Math.sin(Math.PI * u / 3); });
if (!nvbActive()) {
nvbAmbient(true);
if (NVB.beam)
NVB.beam.visible = false;
if (!WLD.promptFn && !NV.home && !(WLD.card && WLD.card.style.display === "block"))
worldPrompt("🧚 <b>Peter and Wendy</b> · <b>press E</b> to open the book", nvbOpen);
return;
}
nvbAmbient(false);
nvbFollowTick(dt, L);
var tk = NVB.cast.tink;
if (tk && tk.g && tk.on && tk.at) {
var P0 = nvbPos(tk.at);
if (P0)
tk.g.position.set(P0.x + Math.sin(t * 1.7) * 0.4, P0.y + 1.3 + Math.sin(t * 2.3) * 0.2, P0.z + Math.cos(t * 1.3) * 0.4);
}
NVB.items.forEach(function (I, i) { if (I.g.userData.glow)
I.g.userData.glow.material.opacity = 0.35 + 0.25 * Math.sin(t * 3 + i); I.g.rotation.y += dt * 0.6; });
var b = nvbStep(), area = nvbArea(), near = null, sk = S.ch + "." + S.s, same = function () { var T = nvbS(); return T.ch + "." + T.s === sk && !T.done; };
var bm = nvbBeam(), P = b && b.at && b.k !== "read" && b.k !== "clap" && b.k !== "duel" ? nvbPos(b.at) : null, way = "";
if (P && (P.area === area || (P.area === "out" && area === "out"))) {
bm.visible = true;
var hh = area === "out" && !P.sky ? 60 : 2.6;
bm.position.set(P.x, P.y, P.z);
bm.userData.col.scale.set(1, hh, 1);
bm.userData.col.position.y = hh / 2;
var cd = nvbDist(P, L, true);
bm.userData.col.visible = area === "out" && !P.sky && cd > 14;
bm.userData.ring.material.opacity = 0.4 + 0.2 * Math.sin(t * 3);
bm.userData.spark.position.y = (b.k === "talk" ? 2.3 : 1.2) + Math.sin(t * 2) * 0.12;
way = nvbWay(P, L);
}
else {
bm.visible = false;
if (P)
way = P.area === "home" ? "down the hollow tree, in the home under the ground" : P.area.indexOf("room:") === 0 ? "in " + NVB_ROOM[P.area.slice(5)].name : area === "home" ? "up the hollow tree and out" : "outside";
}
if (b && !(WLD.card && WLD.card.style.display === "block")) {
var inArea = P && (P.area === area || (P.area === "out" && area === "out")), fd = P ? nvbDist(P, L, true) : 1e9;
switch (b.k) {
case "read":
if (NVB.readAsk)
break;
if (!NVB.readOpen)
nvbChapterCard();
else {
NVB.readOpen = 0;
nvbStepDone();
return;
}
break;
case "go":
if (inArea && (P.sky ? nvbDist(P, L) < (b.r || 14) : fd < (b.r || 4))) {
nvbStepDone();
return;
}
break;
case "fly":
if (inArea && nvbDist(P, L) < (b.r || 16)) {
nvbStepDone();
return;
}
break;
case "hold":
if (inArea && fd < (b.r || 6)) {
NVB.hold += dt;
if (NVB.hold >= (b.sec || 8)) {
nvbStepDone();
return;
}
}
break;
case "talk": {
var C = NVB.cast[b.who];
if (C && C.g && C.g.visible && inArea) {
var gp = C.g.position, dd = Math.hypot(gp.x - L.x, gp.z - L.z), dy = Math.abs(gp.y - (L.y - 1.72));
if (dd < (b.r || 3.4) && dy < 3)
near = { h: "<b>" + nvbEsc(C.name) + "</b> · <b>press E</b> to " + (b.verb || "talk"), fn: function () { if (same())
nvbStepDone(); } };
}
break;
}
case "find":
case "use":
case "gather": {
var best = null, bd = 1e9;
NVB.items.forEach(function (I) { var q = I.g.position, d = Math.hypot(q.x - L.x, q.z - L.z), dy = Math.abs(q.y - (L.y - 1.72)); if (dy < (b.k === "use" ? 3.5 : 2.6) && d < (b.r || 2.4) && d < bd) {
bd = d;
best = I;
} });
if (best)
near = { h: "<b>" + nvbEsc(best.name) + "</b> · <b>press E</b> to " + (b.verb || (b.k === "gather" ? "pick it up" : b.k === "use" ? "do it" : "take it")), fn: function () {
var I = best;
if (!same() || NVB.items.indexOf(I) < 0)
return;
if (I.g.parent)
I.g.parent.remove(I.g);
NVB.items = NVB.items.filter(function (x) { return x !== I; });
if (b.k === "gather") {
NVB.got = (NVB.got || 0) + 1;
if (NVB.items.length) {
nvbSay((b.each || "Got one.") + " " + NVB.got + " of " + (b.n || 3) + ".");
return;
}
}
nvbStepDone();
} };
break;
}
case "clap": {
var c = NVB.clap || (NVB.clap = { n: 0, t: 0, t0: performance.now() });
c.t = (performance.now() - c.t0) / 1000;
if (c.t > (b.sec || 14) && c.n < (b.n || 15)) {
c.n = 0;
c.t0 = performance.now();
nvbSay("Faster! Clap, if you believe!");
}
near = { h: "👏 <b>Clap, if you believe in fairies!</b> · <b>press E</b> (" + c.n + " of " + (b.n || 15) + ")", fn: function () { if (!same())
return; c.n++; if (typeof playTone === "function")
playTone(1800 + c.n * 40, 0.04); if (c.n >= (b.n || 15)) {
nvbStepDone();
} } };
if (tk && tk.g)
tk.g.scale.setScalar(0.4 + 0.6 * c.n / (b.n || 15));
break;
}
case "duel": {
var D = NVB.duel || (NVB.duel = { n: 0, t: 0, t0: performance.now(), next: 1.5, open: 0, miss: 0 });
D.t = (performance.now() - D.t0) / 1000;
if (!D.open && D.t >= D.next) {
D.open = 1;
D.until = D.t + (b.win || 1.3);
if (typeof playTone === "function")
playTone(520, 0.06);
}
if (D.open && D.t > D.until) {
D.open = 0;
D.miss++;
D.next = D.t + 1.2 + Math.random() * 1.4;
nvbSay(b.miss || "The blade whistles past. Ready yourself!");
}
if (D.open)
near = { h: "⚔️ <b>" + (b.cue || "Parry!") + "</b> · <b>press E</b> (" + D.n + " of " + (b.n || 6) + ")", fn: function () {
if (!D.open || !same())
return;
D.open = 0;
D.n++;
D.next = D.t + 1.0 + Math.random() * 1.6;
if (typeof playTone === "function")
playTone(1320, 0.05);
if (D.n >= (b.n || 6))
nvbStepDone();
else
nvbSay((b.hit || "Clash! Well parried.") + " " + D.n + " of " + (b.n || 6) + ".");
} };
break;
}
}
}
if (!near && NVB.room) {
var Q = NVB.rooms[NVB.room];
if (Q)
Q.doors.forEach(function (D) { var R = Q.R; if (!near && Math.hypot(R.x + D.lx - L.x, R.z + D.lz - L.z) < D.r)
near = { h: "<b>" + nvbEsc(D.name) + "</b> · <b>press E</b>", fn: function () { nvbDoor(D); } }; });
}
if (!near && !NVB.room && NV.ship && S.ch >= 13) {
[[0, 4, "hold", "the hatch (down to the hold)", [0, 5.8, Math.PI]], [0, -9.2, "cabin", "Hook's cabin door", [0, 2.2, Math.PI]]].forEach(function (h) { var q = nvbShipAt(h[0], h[1]); if (!near && Math.hypot(q.x - L.x, q.z - L.z) < 1.8 && Math.abs(q.y - (L.y - 1.72)) < 2)
near = { h: "<b>" + h[3] + "</b> · <b>press E</b>", fn: function () { nvbGoRoom(h[2], h[4]); } }; });
}
if (!near) {
var bc = null, bd2 = 3;
Object.keys(NVB.cast).forEach(function (k) { var C = NVB.cast[k]; if (!C.g || !C.g.visible || !C.on || C.fixed)
return; var q = C.g.position, d = Math.hypot(q.x - L.x, q.z - L.z); if (d < bd2 && Math.abs(q.y - (L.y - 1.72)) < 3) {
bd2 = d;
bc = C;
} });
if (bc)
near = { h: "<b>" + nvbEsc(bc.name) + "</b> · <b>press E</b> to talk", fn: function () { worldPrompt(null); wTalk(bc.t); } };
}
if (near)
worldPrompt(near.h, near.fn);
else if (!WLD.promptFn || NVB.room)
worldPrompt("🧚 <b>Peter and Wendy</b> · <b>press E</b> for the book", nvbOpen);
var C2 = NVB_CH[S.ch], hint = b && b.h ? b.h : "", prog = b && b.k === "hold" && NVB.hold > 0 ? " (" + Math.max(0, Math.ceil((b.sec || 8) - NVB.hold)) + " s)" : b && b.k === "gather" ? " (" + (NVB.got || 0) + " of " + (b.n || 3) + ")" : "";
worldBanner("🧚 <b>Chapter " + (S.ch + 1) + ": " + nvbEsc(C2 ? C2.t : "") + "</b> · " + hint + prog + (way ? " · <i>" + way + "</i>" : ""));
}
];
});
