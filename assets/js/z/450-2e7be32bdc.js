/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(450, function () {
return [
function (k, fn, rep) {
if (RLF_TEX[k])
return RLF_TEX[k];
var t = wTex(256, 256, fn);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
if (rep)
t.repeat.set(rep, rep);
if (typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
if (typeof renderer !== "undefined" && renderer && renderer.capabilities)
t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
return (RLF_TEX[k] = t);
},
function (k) {
return rlfTex("g" + k, function (x, W, H) {
if (k === "terrace") {
x.fillStyle = "#CDBFA6";
x.fillRect(0, 0, W, H);
for (var r = 0; r < 4; r++)
for (var c = 0; c < 4; c++) {
x.fillStyle = ["#D6C8AE", "#C8B89C", "#D0C2A8", "#C2B496"][(r * 3 + c) % 4];
x.fillRect(c * 64 + 1, r * 64 + 1, 62, 62);
}
rlfSpeck(x, W, H, 500, ["rgba(255,255,255,.2)", "rgba(80,60,40,.15)"], 0.5, 1.4, 3);
}
else if (k === "tiles") {
x.fillStyle = "#EEF2F2";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C6D2D4";
x.lineWidth = 2;
for (var i = 0; i <= 8; i++) {
x.beginPath();
x.moveTo(0, i * 32);
x.lineTo(W, i * 32);
x.stroke();
x.beginPath();
x.moveTo(i * 32, 0);
x.lineTo(i * 32, H);
x.stroke();
}
rlfSpeck(x, W, H, 200, ["rgba(160,180,190,.25)"], 0.5, 1.2, 5);
}
else if (k === "pool") {
var g = x.createLinearGradient(0, 0, W, H);
g.addColorStop(0, "#3FA9D8");
g.addColorStop(1, "#2B8CC4");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(255,255,255,.35)";
x.lineWidth = 2;
var R = wRand(9);
for (var s = 0; s < 46; s++) {
var px = R() * W, py = R() * H;
x.beginPath();
x.moveTo(px, py);
x.bezierCurveTo(px + 12, py - 8, px + 26, py + 8, px + 40, py);
x.stroke();
}
x.strokeStyle = "rgba(20,60,110,.25)";
x.lineWidth = 6;
for (var j = 1; j < 4; j++) {
x.beginPath();
x.moveTo(0, j * 64);
x.lineTo(W, j * 64);
x.stroke();
}
}
else if (k === "lawn") {
x.fillStyle = "#5A9E3C";
x.fillRect(0, 0, W, H);
for (var b = 0; b < 8; b++) {
x.fillStyle = b % 2 ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.04)";
x.fillRect(0, b * 32, W, 32);
}
rlfSpeck(x, W, H, 1600, ["#4E9232", "#62AA44", "#56A03A", "#4A8C2E"], 0.8, 2.2, 7);
rlfSpeck(x, W, H, 24, ["#F8F0A0", "#FFFFFF"], 1, 1.6, 8);
}
else if (k === "gravel") {
x.fillStyle = "#C9B894";
x.fillRect(0, 0, W, H);
rlfSpeck(x, W, H, 2600, ["#B8A680", "#D8CAA6", "#A8987A", "#E2D6B8"], 0.7, 1.8, 11);
}
else if (k === "paving") {
x.fillStyle = "#BDB3A2";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(80,70,60,.35)";
x.lineWidth = 2;
for (var rr = 0; rr < 8; rr++) {
x.beginPath();
x.moveTo(0, rr * 32);
x.lineTo(W, rr * 32);
x.stroke();
for (var cc = 0; cc <= 4; cc++) {
var px2 = cc * 64 + (rr % 2 ? 32 : 0);
x.beginPath();
x.moveTo(px2, rr * 32);
x.lineTo(px2, rr * 32 + 32);
x.stroke();
}
}
rlfSpeck(x, W, H, 500, ["rgba(255,255,255,.22)", "rgba(60,50,40,.16)"], 0.6, 1.5, 13);
}
else if (k === "mosaic") {
x.fillStyle = "#D8CFC0";
x.fillRect(0, 0, W, H);
var cx = W / 2, cy = H / 2;
for (var q = 7; q > 0; q--) {
x.fillStyle = q % 2 ? "#B8A48A" : "#E4DCCE";
x.beginPath();
x.arc(cx, cy, q * 18, 0, 7);
x.fill();
}
x.strokeStyle = "#8A6A4A";
x.lineWidth = 3;
for (var a = 0; a < 16; a++) {
x.beginPath();
x.moveTo(cx, cy);
x.lineTo(cx + Math.cos(a * Math.PI / 8) * 126, cy + Math.sin(a * Math.PI / 8) * 126);
x.stroke();
}
}
else if (k === "rubber") {
x.fillStyle = "#3E8A6A";
x.fillRect(0, 0, W, H);
rlfSpeck(x, W, H, 1800, ["#357A5C", "#4A9A78", "#2E6E52", "#5AAA88"], 0.6, 1.6, 17);
}
else if (k === "splash") {
x.fillStyle = "#6AB4D8";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#F0F6F8";
x.lineWidth = 5;
for (var z2 = 0; z2 < 5; z2++) {
x.beginPath();
x.arc(W / 2, H / 2, 20 + z2 * 24, 0, 7);
x.stroke();
}
}
else if (k === "cloud") {
var gc = x.createRadialGradient(W / 2, H / 2, 8, W / 2, H / 2, W / 2);
gc.addColorStop(0, "#FFFFFF");
gc.addColorStop(1, "#E8ECF6");
x.fillStyle = gc;
x.fillRect(0, 0, W, H);
rlfSpeck(x, W, H, 300, ["rgba(255,240,200,.35)", "rgba(255,255,255,.6)"], 2, 6, 19);
}
});
},
function (k, col, o) {
var key = k + "|" + col + "|" + (o ? JSON.stringify(o) : "");
if (RLF_MAT[key])
return RLF_MAT[key];
var m;
if (k === "tex") {
m = new THREE.MeshLambertMaterial({ map: rlfGroundTex(col), polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
}
else if (k === "water") {
var t = rlfGroundTex("pool");
m = new THREE.MeshPhongMaterial({ map: t, color: 0xFFFFFF, shininess: 110, specular: 0xCCE8F8, transparent: true, opacity: 0.88, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
}
else if (k === "glow") {
m = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: (o && o.op) || 0.6, depthWrite: false });
}
else if (k === "phong") {
m = new THREE.MeshPhongMaterial({ color: col, shininess: (o && o.sh) || 40 });
}
else {
m = new THREE.MeshLambertMaterial({ color: col });
if (o && o.ds)
m.side = THREE.DoubleSide;
}
m.userData.rlfShared = true;
return (RLF_MAT[key] = m);
},
function (k) {
if (RLF_GEO[k])
return RLF_GEO[k];
var g;
if (k === "box")
g = new THREE.BoxGeometry(1, 1, 1);
else if (k === "cyl")
g = new THREE.CylinderGeometry(0.5, 0.5, 1, 12);
else if (k === "cyl6")
g = new THREE.CylinderGeometry(0.5, 0.5, 1, 6);
else if (k === "parasol")
g = new THREE.ConeGeometry(1, 0.55, 12, 1, true);
else if (k === "jet")
g = new THREE.CylinderGeometry(0.03, 0.12, 1, 6, 1, true);
else if (k === "ball")
g = new THREE.SphereGeometry(0.5, 10, 8);
else if (k === "cloud")
g = new THREE.SphereGeometry(1, 10, 8);
g.userData.shared = true;
return (RLF_GEO[k] = g);
},
function (a, b) {
var key = "stripe" + a + b;
if (RLF_MAT[key])
return RLF_MAT[key];
var t = rlfTex(key, function (x, W, H) { for (var i = 0; i < 12; i++) {
x.fillStyle = i % 2 ? a : b;
x.beginPath();
x.moveTo(W / 2, H / 2);
x.arc(W / 2, H / 2, W, i * Math.PI / 6, (i + 1) * Math.PI / 6);
x.fill();
} });
var m = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide });
m.userData.rlfShared = true;
return (RLF_MAT[key] = m);
},
function (P, u0, u1, v0, v1, mat, tile, dy) {
var L = P.L, nu = Math.max(2, Math.ceil((u1 - u0) / 4)), nv = Math.max(1, Math.ceil((v1 - v0) / 6)), pos = [], uv = [], idx = [];
for (var j = 0; j <= nv; j++)
for (var i = 0; i <= nu; i++) {
var u = u0 + (u1 - u0) * i / nu, v = v0 + (v1 - v0) * j / nv, p = rlfW(L, u, v);
pos.push(p.x - P.ox, rlfY(p.x, p.z) + 0.2 + (dy || 0.05), p.z - P.oz);
uv.push(u / (tile || 8), v / (tile || 8));
}
for (var j2 = 0; j2 < nv; j2++)
for (var i2 = 0; i2 < nu; i2++) {
var a = j2 * (nu + 1) + i2, b = a + 1, c = a + nu + 1, d = c + 1;
if (L.side > 0)
idx.push(a, c, b, b, c, d);
else
idx.push(a, b, c, b, d, c);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
rlfUp(g);
var m = new THREE.Mesh(g, mat);
m.userData.rlfMine = true;
m.receiveShadow = true;
P.G.add(m);
return m;
},
function (P) {
var o = new THREE.Object3D();
Object.keys(P.batch).forEach(function (k) {
var B = P.batch[k];
if (!B.list.length)
return;
var im = new THREE.InstancedMesh(B.geo, B.mat, B.list.length);
im.userData.rlfOwn = true;
im.castShadow = !P.small;
B.list.forEach(function (q, i) { o.position.set(q[0], q[1], q[2]); o.rotation.set(0, q[3], 0); o.scale.set(q[4], q[5], q[6]); o.updateMatrix(); im.setMatrixAt(i, o.matrix); });
im.instanceMatrix.needsUpdate = true;
P.G.add(im);
});
P.batch = {};
},
function (P, u, v, sm, parasol) {
var wood = rlfMat("lam", 0x6A4A30), iron = rlfMat("phong", 0x2A2A2E, { sh: 60 }), top = rlfMat("lam", 0xF2EEE6);
rlfPiece(P, "tleg", "cyl", iron, u, v, 0.36, 0.08, 0.72, 0.08);
rlfPiece(P, "ttop", "cyl", top, u, v, 0.74, 0.9, 0.04, 0.9);
[[0.75, 0], [-0.75, 0], [0, 0.75], [0, -0.75]].forEach(function (c, i) {
var cu = u + c[0], cv = v + c[1];
rlfPiece(P, "cseat", "box", wood, cu, cv, 0.45, 0.42, 0.05, 0.42);
rlfPiece(P, "cback", "box", wood, cu + c[0] * 0.28, cv + c[1] * 0.28, 0.72, c[0] ? 0.05 : 0.42, 0.5, c[0] ? 0.42 : 0.05);
rlfPiece(P, "cleg", "box", iron, cu, cv, 0.22, 0.36, 0.44, 0.36);
});
if (parasol) {
rlfPiece(P, "ppole", "cyl", rlfMat("lam", 0xE8E2D6), u, v, 1.3, 0.06, 2.6, 0.06);
rlfPiece(P, "pcan" + sm.uuid, "parasol", sm, u, v, 2.45, 1.45, 1, 1.45);
}
rlfSolid(P, u, v, 0.55);
},
function (P, seed, u, v, o) {
o = o || {};
if (P.people.length >= P.maxPeople)
return null;
var g = null;
try {
g = wPerson("rl" + P.L.i + "_" + seed, o);
}
catch (e) {
g = null;
}
if (!g)
return null;
var p = rlfW(P.L, u, v);
g.position.set(p.x - P.ox, rlfY(p.x, p.z) + (o.dy || 0), p.z - P.oz);
g.rotation.y = rlfRot(P.L, u) + (o.rot || 0);
g.userData.rlfFig = true;
P.G.add(g);
var M = { g: g, u: u, v: v, o: o, t: seed * 1.7 };
P.people.push(M);
if (o.walk)
P.walkers.push(M);
return M;
},
function (L) {
var small = rlfLite(), G = new THREE.Group();
G.name = "row life " + L.kind + " " + L.i;
var c0 = rlfW(L, 0, L.D / 2);
G.position.set(c0.x, 0, c0.z);
var P = { L: L, G: G, ox: c0.x, oz: c0.z, small: small, cc: [], cb: [], acts: [], anim: [], people: [], walkers: [], batch: {}, maxPeople: small ? 3 : 8 };
scene.add(G);
var W = L.W, D = L.D, h = W / 2, k = L.kind;
try {
(RLF_DRESS[k] || function () { })(P, W, D, h, small);
}
catch (e) {
if (window.console)
console.warn("[row-life] dress", k, e);
}
rlfFlush(P);
G.traverse(function (o) { if (o.isMesh && !o.userData.rlfFig && !(o.parent && o.parent.userData && o.parent.userData.rlfFig))
o.raycast = function () { }; });
ROWL.builds++;
return P;
},
function (P) {
if (!P)
return;
var G = P.G;
if (G.parent)
G.parent.remove(G);
G.traverse(function (m) {
try {
if (m.isInstancedMesh && m.userData.rlfOwn && m.dispose)
m.dispose();
if (m.userData.rlfMine && m.geometry)
m.geometry.dispose();
}
catch (e) { }
});
P.people.forEach(function (M) { try {
M.g.traverse(function (m) { var g = m.geometry; if (!g || !g.dispose || (g.userData && g.userData.shared))
return; if (typeof FIGGEO !== "undefined" && typeof ldShared === "function" && ldShared(g))
return; g.dispose(); });
}
catch (e) { } });
if (ROWL.swim && ROWL.swim.P === P)
ROWL.swim = null;
ROWL.drops++;
},
function (P, W, D, h, small) {
rlfPatch(P, -h + 1, h - 1, 0.4, D - 1, rlfMat("tex", "cloud"), 10, 0.06);
var gold = rlfMat("phong", 0xD8B048, { sh: 90 }), white = rlfMat("phong", 0xF4F0E6, { sh: 30 });
[-5, 5].forEach(function (u) { rlfBox(P, u, 10, 2.6, 1.2, 5.2, 1.2, white); rlfBox(P, u, 10, 5.4, 1.6, 0.5, 1.6, gold); rlfSolid(P, u, 10, 0.9); });
var ar = new THREE.Mesh(new THREE.TorusGeometry(5, 0.45, 10, 28, Math.PI), gold);
ar.userData.rlfMine = true;
var p = rlfW(P.L, 0, 10);
ar.position.set(p.x - P.ox, rlfY(p.x, p.z) + 5.6, p.z - P.oz);
ar.rotation.y = rlfRot(P.L, 0);
P.G.add(ar);
for (var s = 0; s < 18; s++) {
var v = 12 + s * 1.1;
if (v > D - 2)
break;
rlfBox(P, 0, v, 0.12 + s * 0.42, 7 - s * 0.12, 0.24, 1.1, white);
rlfPiece(P, "cl", "cloud", rlfMat("lam", 0xFFFFFF), -4.2 + s * 0.05, v, 0.2 + s * 0.42, 1.4, 0.7, 1.2);
rlfPiece(P, "cl", "cloud", rlfMat("lam", 0xFFFFFF), 4.2 - s * 0.05, v, 0.2 + s * 0.42, 1.4, 0.7, 1.2);
}
rlfSolidBox(P, -4.6, 4.6, 12, D - 1);
var beam = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 4.2, 160, 20, 1, true), rlfMat("glow", 0xFFF0C0, { op: 0.18 }));
beam.userData.rlfMine = true;
var bp = rlfW(P.L, 0, D - 6);
beam.position.set(bp.x - P.ox, rlfY(bp.x, bp.z) + 80, bp.z - P.oz);
P.G.add(beam);
P.anim.push(function (t) { beam.material.opacity = 0.14 + 0.05 * Math.sin(t * 0.6); });
P.acts.push({ u: 0, v: 11, r: 4, txt: "☁️ <b>The Stair to the Heavens</b> · <b>press E</b> to climb up to the palaces of the powers", fn: function () { if (typeof hvnGo === "function")
hvnGo({}); },
only: function () { return typeof hvnMay !== "function" || hvnMay(); } });
},
function (P, W, D, h, small) {
var st = RLF_STRIPES[P.L.n % RLF_STRIPES.length], sm = rlfStripeMat(st[0], st[1]);
rlfPatch(P, 0.5, h - 0.5, 0.4, 15, rlfMat("tex", "terrace"), 4);
[[3.5, 4], [8.5, 4], [3.5, 9.5], [8.5, 9.5]].forEach(function (q) { rlfTable(P, q[0], q[1], sm, true); });
[[1, 1.4], [12, 1.4]].forEach(function (q) { rlfBox(P, q[0], q[1], 0.35, 1.2, 0.7, 0.6, rlfMat("lam", 0x8A6A4A)); });
rlfPerson(P, 1, 4.2, 4, { rot: Math.PI / 2 });
rlfPerson(P, 2, 8.5, 10.3, { rot: Math.PI });
rlfPerson(P, 3, 7.6, 4.4, { rot: -Math.PI / 2, title: "Waiter", place: "café" });
P.acts.push({ u: 6, v: 7, r: 5, txt: "☕ <b>" + esc(P.L.name) + "</b> · <b>press E</b> to take a table on the terrace", fn: function () { setStatus("☕ You take a table on the terrace of <b>" + esc(P.L.name) + "</b>. The waiter brings the menu: " + esc((RLF_CAFES.filter(function (c) { return c[0] === P.L.name; })[0] || ["", ""])[1]) + ". Go in through the door for the café itself."); } });
},
function (P, W, D, h, small) {
rlfPatch(P, -h + 0.5, h - 0.5, 0.4, D - 0.5, rlfMat("tex", "lawn"), 6, 0.04);
rlfPatch(P, -2, 2, 0.4, D - 1, rlfMat("tex", "gravel"), 4, 0.07);
rlfPatch(P, -h + 1, h - 1, D / 2 - 0.5, D / 2 + 4.5, rlfMat("tex", "gravel"), 4, 0.075);
rlfPerson(P, 1, -6, D / 2 + 2, { walk: 1 });
rlfPerson(P, 2, 12, D / 2 + 2, { walk: 1 });
rlfPerson(P, 3, -14, 9, { rot: 0.6 });
rlfPerson(P, 4, -13, 10, { rot: -2.4, child: true });
},
function (P, W, D, h, small) {
rlfPatch(P, -h + 0.5, h - 0.5, 0.4, D - 0.5, rlfMat("tex", "paving"), 5, 0.05);
rlfPatch(P, -9, 9, D / 2 - 8, D / 2 + 10, rlfMat("tex", "mosaic"), 18, 0.07);
rlfPerson(P, 1, -6, D / 2 + 7, { walk: 1 });
rlfPerson(P, 2, 6, 8, { walk: 1 });
rlfPerson(P, 3, -15, 7, { rot: -Math.PI / 2 });
rlfPerson(P, 4, 15, D - 8, { rot: Math.PI / 2 });
rlfPerson(P, 5, 9, D / 2 + 7, { title: "Street musician", place: "square" });
P.acts.push({ u: 9, v: D / 2 + 7, r: 3, txt: "🎻 <b>The busker</b> · <b>press E</b> to listen", fn: function () { setStatus("🎻 The busker plays an old waltz on the fiddle, then a reel; a few people stop to listen and drop a coin in the open case."); } });
},
function (P, W, D, h, small) {
rlfPatch(P, -h + 0.5, h - 0.5, 0.4, D - 0.5, rlfMat("tex", "lawn"), 6, 0.04);
rlfPatch(P, -20, -2, 4, D - 3, rlfMat("tex", "rubber"), 5, 0.07);
rlfPatch(P, 6, 20, 6, 20, rlfMat("tex", "splash"), 14, 0.07);
var jets = [];
for (var i = 0; i < (small ? 6 : 12); i++) {
var a = i / (small ? 6 : 12) * Math.PI * 2, ju = 13 + Math.cos(a) * 4, jv = 13 + Math.sin(a) * 4, m = rlfBox(P, ju, jv, 0.1, 1, 1, 1, rlfMat("glow", 0xE8F6FF, { op: 0.55 }), 0, "jet");
m.userData.rlfJet = 1;
jets.push({ m: m, ph: i * 0.7, y: m.position.y });
}
P.anim.push(function (t) { jets.forEach(function (J) { var s = 0.4 + 1.6 * Math.max(0, Math.sin(t * 1.3 + J.ph)); J.m.scale.set(1, s, 1); J.m.position.y = J.y + s / 2; }); });
rlfPerson(P, 1, 12, 10, { child: true, walk: 1 });
rlfPerson(P, 2, 15, 15, { child: true, walk: 1 });
rlfPerson(P, 3, 2, 5, { rot: Math.PI });
rlfPerson(P, 4, -12, 9, { child: true });
P.acts.push({ u: 13, v: 13, r: 5, txt: "💦 <b>The splash pad</b> · <b>press E</b> to run through the fountains", fn: function () { setStatus("💦 You run through the fountains: cold, then colder. The children shriek with laughter."); } });
},
function (P, W, D, h, small) {
var deckU0 = -h + 0.5, deckU1 = h - 16;
rlfPatch(P, deckU0, deckU1, 0.4, D - 0.5, rlfMat("tex", "tiles"), 3, 0.05);
rlfPatch(P, deckU1, h - 0.5, 0.4, 4, rlfMat("tex", "terrace"), 4, 0.05);
var pu0 = -h + 5, pu1 = pu0 + 50, pv0 = 8, pv1 = 22, pm = (pu0 + pu1) / 2;
var water = rlfPatch(P, pu0, pu1, pv0, pv1, rlfMat("water"), 6, 0.12);
P.water = water;
var cop = rlfMat("phong", 0xF6F4EE, { sh: 20 });
rlfBox(P, pm, pv0 - 0.3, 0.2, 50.6, 0.3, 0.6, cop);
rlfBox(P, pm, pv1 + 0.3, 0.2, 50.6, 0.3, 0.6, cop);
rlfBox(P, pu0 - 0.3, (pv0 + pv1) / 2, 0.2, 0.6, 0.3, pv1 - pv0 + 1.2, cop, 0);
rlfBox(P, pu1 + 0.3, (pv0 + pv1) / 2, 0.2, 0.6, 0.3, pv1 - pv0 + 1.2, cop, 0);
var red = rlfMat("lam", 0xD83A3A), wht = rlfMat("lam", 0xF4F4F4), blu = rlfMat("lam", 0x1E5EB8);
for (var ln = 1; ln < 6; ln++) {
var lv = pv0 + ln * (pv1 - pv0) / 6;
for (var b = 0; b < 50; b += 1)
rlfPiece(P, "buoy" + ((b % 6 < 3) ? "r" : "w"), "ball", (b % 6 < 3) ? red : wht, pu0 + 0.5 + b, lv, 0.14, 0.18, 0.18, 0.18);
}
[[pu0 + 2, pv0], [pu0 + 2, pv1], [pu1 - 2, pv0], [pu1 - 2, pv1]].forEach(function (q) { var dv = q[1] === pv0 ? 0.4 : -0.4; rlfPiece(P, "ladder", "cyl", rlfMat("phong", 0xD8D8DC, { sh: 90 }), q[0] - 0.3, q[1] + dv, 0.6, 0.05, 1.0, 0.05); rlfPiece(P, "ladder", "cyl", rlfMat("phong", 0xD8D8DC, { sh: 90 }), q[0] + 0.3, q[1] + dv, 0.6, 0.05, 1.0, 0.05); });
rlfBox(P, pu1 - 1, (pv0 + pv1) / 2, 0.9, 1.2, 1.8, 1.2, cop);
rlfBox(P, pu1 - 2.6, (pv0 + pv1) / 2, 1.85, 3.6, 0.12, 0.6, blu);
rlfSolid(P, pu1 - 1, (pv0 + pv1) / 2, 0.9);
var lgv = pv0 - 2.4;
[[-0.5, -0.4], [0.5, -0.4], [-0.5, 0.4], [0.5, 0.4]].forEach(function (q) { rlfPiece(P, "lgleg", "box", wht, pm + q[0], lgv + q[1], 1.1, 0.1, 2.2, 0.1); });
rlfBox(P, pm, lgv, 2.3, 1.2, 0.12, 1.0, red);
rlfBox(P, pm, lgv - 0.5, 2.8, 1.2, 1.0, 0.1, red);
rlfSolid(P, pm, lgv, 0.8);
var cols = [0x1E6EB8, 0xF2C230, 0xE85A4A, 0x3AA87A], sm = rlfStripeMat("#1F5E8A", "#F6EFE2");
for (var i = 0; i < (small ? 6 : 10); i++) {
var lu = pu0 + 3 + i * 4.6;
rlfLounger(P, lu, pv1 + 3.2, cols[i % 4], 0);
if (i % 2 === 0) {
rlfPiece(P, "ppole", "cyl", rlfMat("lam", 0xE8E2D6), lu + 2.3, pv1 + 3.6, 1.3, 0.06, 2.6, 0.06);
rlfPiece(P, "pcanl", "parasol", sm, lu + 2.3, pv1 + 3.6, 2.45, 1.5, 1, 1.5);
rlfSolid(P, lu + 2.3, pv1 + 3.6, 0.12);
}
if (i < (small ? 4 : 7))
rlfLounger(P, lu + 1.5, 3.0, cols[(i + 2) % 4], Math.PI);
}
rlfTable(P, h - 11, 2.2, sm, true);
rlfTable(P, h - 5, 2.2, sm, true);
rlfSolidBox(P, pu0 - 0.6, pu1 + 0.6, pv0 - 0.6, pv1 + 0.6);
var fen = rlfMat("lam", 0xF0F0EC);
for (var fu = -h + 0.6; fu <= h - 16; fu += 2.5) {
if (Math.abs(fu - (-h + 14)) < 3)
continue;
rlfPiece(P, "fence", "box", fen, fu, 0.6, 0.55, 2.5, 1.1, 0.08);
}
for (var fv = 0.6; fv <= D - 0.6; fv += 2.5) {
rlfPiece(P, "fence", "box", fen, -h + 0.6, fv, 0.55, 0.08, 1.1, 2.5);
}
for (var fu2 = -h + 0.6; fu2 <= h - 0.6; fu2 += 2.5)
rlfPiece(P, "fence", "box", fen, fu2, D - 0.6, 0.55, 2.5, 1.1, 0.08);
rlfSolidBox(P, -h + 0.3, -h + 11, 0.3, 0.9);
rlfSolidBox(P, -h + 17, h - 16, 0.3, 0.9);
rlfSolidBox(P, -h + 0.3, -h + 0.9, 0.3, D - 0.3);
rlfSolidBox(P, -h + 0.3, h - 0.3, D - 0.9, D - 0.3);
var sw = small ? 2 : 4;
for (var s = 0; s < sw; s++) {
var M = rlfPerson(P, 10 + s, pu0 + 8 + s * 11, pv0 + 2.2 + s * 2.4, { dy: -1.25, rot: Math.PI / 2 * (s % 2 ? 1 : -1), look: { topKind: "vest", bottomKind: "shorts" } });
if (M) {
M.swim = { u0: pu0 + 3, u1: pu1 - 3, dir: s % 2 ? 1 : -1, speed: 0.9 + s * 0.15 };
P.walkers.push(M);
}
}
rlfPerson(P, 20, pm, lgv, { dy: 1.75, title: "Lifeguard", place: "lido", rot: 0 });
rlfPerson(P, 21, pu0 + 8, pv1 + 2.4, { rot: Math.PI });
rlfPerson(P, 22, pu0 + 20, 3.6, { child: true, walk: 1 });
P.pool = { u0: pu0, u1: pu1, v0: pv0, v1: pv1 };
P.acts.push({ u: pu0 + 1.5, v: pv1 + 1.6, r: 2.6, txt: "🏊 <b>" + esc(P.L.name) + "</b> · <b>press E</b> to swim a length", fn: function () { rlfSwimStart(P); } });
P.acts.push({ u: pu1 + 1.5, v: (pv0 + pv1) / 2, r: 2, txt: "🤸 <b>The diving board</b> · <b>press E</b> to dive in and swim back", fn: function () { rlfSwimStart(P, true); } });
P.anim.push(function (t) { var tx = water.material.map; if (tx) {
tx.offset.x = (t * 0.02) % 1;
tx.offset.y = (Math.sin(t * 0.3) * 0.02);
} });
},
function (P, dive) {
var Q = P.pool;
if (!Q)
return;
var lane = Q.v0 + (Q.v1 - Q.v0) * (dive ? 0.5 : 0.25), from = dive ? Q.u1 - 1.5 : Q.u0 + 1, to = dive ? Q.u0 + 1.5 : Q.u1 - 1;
ROWL.swim = { P: P, u: from, to: to, v: lane, t: 0, dive: !!dive };
rlfPrompt(null);
setStatus(dive ? "🤸 You spring off the board and dive in, and come up swimming." : "🏊 You climb down the ladder into the warm water and push off.");
},
function (dt) {
var S = ROWL.swim;
if (!S)
return;
var P = S.P, L = P.L;
S.t += dt;
var dir = S.to > S.u ? 1 : -1;
S.u += dir * dt * 2.6;
var done = dir > 0 ? S.u >= S.to : S.u <= S.to;
if (done)
S.u = S.to;
var p = rlfW(L, S.u, S.v), y = rlfY(p.x, p.z) + 0.55 + Math.sin(S.t * 3.2) * 0.06;
var ah = rlfW(L, S.u + dir * 3, S.v);
camera.position.set(p.x, y, p.z);
yaw = Math.atan2(-(ah.x - p.x), -(ah.z - p.z));
pitch = -0.05;
if (done) {
var out = rlfW(L, S.u, P.pool.v1 + 1.6);
camera.position.set(out.x, rlfY(out.x, out.z) + 1.72, out.z);
ROWL.swim = null;
setStatus("🏊 Fifty metres. You climb out at the " + (S.dive ? "shallow" : "deep") + " end, dripping, and the sun warms you on the tiles.");
}
},
function (P, x, z) {
var q = rlfUV(P.L, x, z), R = 0.35, u = q.u, v = q.v, i;
if (Math.abs(u) > P.L.W / 2 + 2 || v < -2 || v > P.L.D + 2)
return false;
for (i = 0; i < P.cc.length; i++) {
var c = P.cc[i], du = c.u - u, dv = c.v - v;
if (du * du + dv * dv < (c.r + R) * (c.r + R))
return true;
}
for (i = 0; i < P.cb.length; i++) {
var b = P.cb[i];
if (u > b.u0 - R && u < b.u1 + R && v > b.v0 - R && v < b.v1 + R)
return true;
}
return false;
},
function (P, M, dt) {
var L = P.L, g = M.g;
if (!g)
return;
if (M.swim) {
var S = M.swim;
M.u += S.dir * S.speed * dt;
if (M.u > S.u1) {
M.u = S.u1;
S.dir = -1;
}
if (M.u < S.u0) {
M.u = S.u0;
S.dir = 1;
}
var p = rlfW(L, M.u, M.v), a2 = rlfW(L, M.u + S.dir, M.v);
g.position.set(p.x - P.ox, rlfY(p.x, p.z) - 1.25 + Math.sin(ROWL.t * 2.4 + M.t) * 0.05, p.z - P.oz);
g.rotation.y = Math.atan2(a2.x - p.x, a2.z - p.z);
return;
}
if (!M.path) {
var h = L.W / 2 - 3;
M.path = { u0: Math.max(-h, M.u - 8), u1: Math.min(h, M.u + 8), dir: 1, pause: 0 };
}
var W = M.path;
if (W.pause > 0) {
W.pause -= dt;
return;
}
M.u += W.dir * dt * 1.1;
if (M.u > W.u1 || M.u < W.u0) {
M.u = Math.max(W.u0, Math.min(W.u1, M.u));
W.dir *= -1;
W.pause = 2 + ((M.t * 7) % 3);
}
var q = rlfW(L, M.u, M.v), ah = rlfW(L, M.u + W.dir, M.v);
g.position.set(q.x - P.ox, rlfY(q.x, q.z), q.z - P.oz);
g.rotation.y = Math.atan2(ah.x - q.x, ah.z - q.z);
},
function () {
var by = {};
ROWL.lots.forEach(function (L) { by[L.kind] = (by[L.kind] || 0) + 1; });
var built = Object.keys(ROWL.cur).map(function (k) { var P = ROWL.cur[k], m = 0; P.G.traverse(function (o) { if (o.isMesh)
m++; }); return { kind: P.L.kind, name: P.L.name, meshes: m, people: P.people.length, walls: P.cc.length + P.cb.length, acts: P.acts.length }; });
var specs = 0, ins = 0;
if (typeof store !== "undefined")
store.objects.forEach(function (o) { if (o.rowlife) {
specs++;
if (KIT[o.archetype] && KIT[o.archetype].cat === "structure" && enterable(o))
ins++;
} });
return { lots: ROWL.lots.length, by: by, built: built, builds: ROWL.builds, drops: ROWL.drops, specs: specs, enterable: ins, gate: ROWL.gate ? { x: ROWL.gate.cx, z: ROWL.gate.cz } : null };
}
];
});
